

## Problem

The current import system (`booking_com_settings` table + `import-ical` edge function) only supports a **single** Booking.com iCal URL. With 7 separate units on Booking.com, each unit will have its own export URL, and imported reservations need to be assigned to the correct cottage automatically.

## Plan

### 1. Database Migration
Create a new table `booking_com_cottage_urls` to store per-cottage import URLs:

```sql
CREATE TABLE public.booking_com_cottage_urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cottage_number INTEGER NOT NULL CHECK (cottage_number BETWEEN 1 AND 7),
  ical_url TEXT NOT NULL DEFAULT '',
  last_synced_at TIMESTAMPTZ,
  UNIQUE (cottage_number)
);
ALTER TABLE public.booking_com_cottage_urls ENABLE ROW LEVEL SECURITY;
```

RLS: allow authenticated users full access (admin-only page already password-gated).

### 2. Update `import-ical` Edge Function
- Instead of reading one URL from `booking_com_settings`, loop through all rows in `booking_com_cottage_urls` where `ical_url` is not empty.
- For each row, fetch the iCal feed and insert/update reservations with the correct `cottage_number` (instead of defaulting to 0).
- Update `last_synced_at` per row.

### 3. Update Admin UI (`src/pages/Admin.tsx`)
Replace the single "Booking.com iCal URL" input in settings with **7 input fields** — one per cottage:
- Label: "კოტეჯი 1 - Booking.com iCal URL", "კოტეჯი 2 - …", etc.
- Each has a Save button
- Show `last_synced_at` per cottage
- Keep the single "სინქრონიზაცია" (Sync) button that triggers the edge function for all cottages at once

### 4. Summary
- **Export (→ Booking.com):** Already works per-cottage — no changes needed
- **Import (← Booking.com):** Will now support 7 separate URLs, auto-assigning the correct cottage number

