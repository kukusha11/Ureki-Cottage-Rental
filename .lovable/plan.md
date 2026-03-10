

## Problem

The main iCal feed URL (`/ical-feed`) exports **all** reservations across all cottages. When Booking.com imports this, it sees all dates as blocked for **every** unit — because it can't distinguish which cottage each reservation belongs to.

## Solution

You need to use **per-cottage feed URLs** — one for each Booking.com room/unit. The backend already supports this via `?cottage=N`, but the admin UI doesn't make this clear enough.

### Changes to `src/pages/Admin.tsx`

Replace the single export URL card with a list of **7 individual cottage URLs**, each with its own Copy button:

- Show a table/list: Cottage 1 → `…/ical-feed?cottage=1`, Cottage 2 → `…/ical-feed?cottage=2`, etc.
- Each row gets a Copy button
- Remove or de-emphasize the "all cottages" URL (it should only be used for a combined overview, not linked to Booking.com)
- Add clear instructions: "In Booking.com, go to each room → Calendar → Sync → paste the matching cottage URL"

No database or edge function changes needed — the `ical-feed` function already filters by `?cottage=N`.

