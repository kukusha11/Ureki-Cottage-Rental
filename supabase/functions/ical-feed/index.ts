import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Support ?cottage=N for per-cottage feeds
    const url = new URL(req.url);
    const cottageParam = url.searchParams.get("cottage");

    let query = supabase
      .from("reservations")
      .select("*")
      .order("check_in", { ascending: true });

    if (cottageParam) {
      query = query.eq("cottage_number", parseInt(cottageParam));
    }

    const { data: reservations, error } = await query;

    if (error) throw error;

    // Build iCal content (RFC 5545)
    const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    let ical = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ureki Beach Cottages//Reservations//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Ureki Reservations",
    ];

    for (const r of reservations || []) {
      const dtStart = r.check_in.replace(/-/g, "");
      const dtEnd = r.check_out.replace(/-/g, "");
      const summary = `Cottage ${r.cottage_number} - ${r.guest_name}`;
      const description = [
        r.guest_phone ? `Phone: ${r.guest_phone}` : "",
        r.notes || "",
      ].filter(Boolean).join("\\n");

      ical.push(
        "BEGIN:VEVENT",
        `DTSTART;VALUE=DATE:${dtStart}`,
        `DTEND;VALUE=DATE:${dtEnd}`,
        `DTSTAMP:${now}`,
        `UID:${r.id}@ureki-cottages`,
        `SUMMARY:${summary}`,
        description ? `DESCRIPTION:${description}` : "",
        "STATUS:CONFIRMED",
        "END:VEVENT"
      );
    }

    ical.push("END:VCALENDAR");

    // Filter empty lines
    const body = ical.filter(Boolean).join("\r\n");

    return new Response(body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="ureki-reservations.ics"',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
