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

    // Get all per-cottage iCal URLs
    const { data: cottageUrls, error: urlsError } = await supabase
      .from("booking_com_cottage_urls")
      .select("*")
      .neq("ical_url", "");

    if (urlsError) {
      throw new Error(`Failed to fetch cottage URLs: ${urlsError.message}`);
    }

    if (!cottageUrls || cottageUrls.length === 0) {
      return new Response(
        JSON.stringify({ error: "No Booking.com iCal URLs configured" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let totalImported = 0;
    let totalUpdated = 0;
    let totalEvents = 0;
    const errors: string[] = [];

    for (const cottage of cottageUrls) {
      try {
        const icalResponse = await fetch(cottage.ical_url);
        if (!icalResponse.ok) {
          errors.push(`Cottage ${cottage.cottage_number}: HTTP ${icalResponse.status}`);
          continue;
        }
        const icalText = await icalResponse.text();
        const events = parseICalEvents(icalText);
        totalEvents += events.length;

        for (const event of events) {
          const { data: existing } = await supabase
            .from("reservations")
            .select("id")
            .eq("external_uid", event.uid)
            .maybeSingle();

          if (existing) {
            await supabase
              .from("reservations")
              .update({
                check_in: event.dtstart,
                check_out: event.dtend,
                guest_name: event.summary,
                cottage_number: cottage.cottage_number,
                notes: event.description || null,
              })
              .eq("id", existing.id);
            totalUpdated++;
          } else {
            await supabase.from("reservations").insert({
              guest_name: event.summary,
              check_in: event.dtstart,
              check_out: event.dtend,
              cottage_number: cottage.cottage_number,
              source: "booking_com",
              external_uid: event.uid,
              notes: event.description || null,
            });
            totalImported++;
          }
        }

        // Update last_synced_at for this cottage
        await supabase
          .from("booking_com_cottage_urls")
          .update({ last_synced_at: new Date().toISOString() })
          .eq("id", cottage.id);
      } catch (err) {
        errors.push(`Cottage ${cottage.cottage_number}: ${err.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        imported: totalImported,
        updated: totalUpdated,
        total: totalEvents,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
