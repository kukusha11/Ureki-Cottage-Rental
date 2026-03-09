import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseICalEvents(icalText: string) {
  const events: Array<{
    uid: string;
    summary: string;
    dtstart: string;
    dtend: string;
    description?: string;
  }> = [];

  const eventBlocks = icalText.split("BEGIN:VEVENT");
  for (let i = 1; i < eventBlocks.length; i++) {
    const block = eventBlocks[i].split("END:VEVENT")[0];
    const getField = (name: string) => {
      // Handle fields with parameters like DTSTART;VALUE=DATE:20240101
      const regex = new RegExp(`${name}[^:]*:(.+)`, "m");
      const match = block.match(regex);
      return match ? match[1].trim() : "";
    };

    const uid = getField("UID");
    const summary = getField("SUMMARY");
    const dtstart = getField("DTSTART");
    const dtend = getField("DTEND");
    const description = getField("DESCRIPTION");

    if (uid && dtstart && dtend) {
      // Convert YYYYMMDD to YYYY-MM-DD
      const formatDate = (d: string) => {
        const clean = d.replace(/[^0-9]/g, "").substring(0, 8);
        if (clean.length === 8) {
          return `${clean.substring(0, 4)}-${clean.substring(4, 6)}-${clean.substring(6, 8)}`;
        }
        return d;
      };

      events.push({
        uid,
        summary: summary || "Booking.com Guest",
        dtstart: formatDate(dtstart),
        dtend: formatDate(dtend),
        description: description || undefined,
      });
    }
  }
  return events;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the Booking.com iCal URL from settings
    const { data: settings, error: settingsError } = await supabase
      .from("booking_com_settings")
      .select("*")
      .limit(1)
      .single();

    if (settingsError || !settings?.ical_url) {
      return new Response(
        JSON.stringify({ error: "No Booking.com iCal URL configured" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch the iCal feed from Booking.com
    const icalResponse = await fetch(settings.ical_url);
    if (!icalResponse.ok) {
      throw new Error(`Failed to fetch iCal feed: ${icalResponse.status}`);
    }
    const icalText = await icalResponse.text();

    // Parse events
    const events = parseICalEvents(icalText);

    let imported = 0;
    let skipped = 0;

    for (const event of events) {
      // Check if already imported
      const { data: existing } = await supabase
        .from("reservations")
        .select("id")
        .eq("external_uid", event.uid)
        .maybeSingle();

      if (existing) {
        // Update dates if changed
        await supabase
          .from("reservations")
          .update({
            check_in: event.dtstart,
            check_out: event.dtend,
            guest_name: event.summary,
            notes: event.description || null,
          })
          .eq("id", existing.id);
        skipped++;
      } else {
        // Insert new reservation as unassigned (cottage_number = 0)
        await supabase.from("reservations").insert({
          guest_name: event.summary,
          check_in: event.dtstart,
          check_out: event.dtend,
          cottage_number: 0,
          source: "booking_com",
          external_uid: event.uid,
          notes: event.description || null,
        });
        imported++;
      }
    }

    // Update last_synced_at
    await supabase
      .from("booking_com_settings")
      .update({ last_synced_at: new Date().toISOString() })
      .eq("id", settings.id);

    return new Response(
      JSON.stringify({ success: true, imported, updated: skipped, total: events.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
