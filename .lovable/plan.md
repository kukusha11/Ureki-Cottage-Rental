

# Two-Way iCal Sync for Single Booking.com Property

## How It Works

Since Booking.com gives one iCal link for all 7 cottages:

**Export (your system → Booking.com):** One combined iCal feed with all reservations across all cottages. Booking.com imports this to block dates when any cottage is booked via phone.

**Import (Booking.com → your system):** A backend function fetches the Booking.com iCal URL periodically, parses events, and stores them in the database. Your mother then assigns each imported reservation to the correct cottage from the admin panel.

## Changes

### 1. Database
- Add `source` column to reservations (`manual` or `booking_com`) to distinguish origin
- Add `external_uid` column to track Booking.com event UIDs and avoid duplicates
- New `booking_com_settings` table to store the single iCal import URL

### 2. Edge Function: `import-ical`
- Fetches the Booking.com iCal URL from settings
- Parses iCal events, upserts reservations with `source = 'booking_com'`
- Imported reservations get `cottage_number = 0` (unassigned) until mother picks one

### 3. Admin Page Updates
- **Settings section**: Input field to save the Booking.com iCal URL
- **"Sync Now" button**: Triggers the import function on demand
- **Unassigned badge**: Highlights imported reservations that need a cottage assignment
- **Per-cottage export URLs**: Display 7 individual iCal export links (one per cottage) plus the combined one
- Source indicator on each reservation (phone vs Booking.com)

### 4. Updated iCal Feed
- Support `?cottage=N` query param for per-cottage feeds
- Without param, returns all reservations (combined feed for Booking.com)

