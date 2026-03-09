

## Add iCal Export URL Card to Admin Settings

Add a card in the settings panel showing the iCal feed URL that the user can copy and paste into Booking.com's "Add a calendar connection" setting.

### Changes

**`src/pages/Admin.tsx`** — Add a new card below the Booking.com Import card inside the `showSettings` block:
- Display the iCal feed URL: `https://fhbytiijiiprnhfnlqcj.supabase.co/functions/v1/ical-feed`
- Add a "Copy" button that copies the URL to clipboard
- Include brief instructions: "Paste this URL into Booking.com → Calendar → Add a calendar connection to export your manual reservations"
- Also show per-cottage URLs (appending `?cottage=N`) as a helpful note

Single file change, no database changes needed.

