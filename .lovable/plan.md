

Remove the "Export iCal URLs" card from the admin settings panel in `src/pages/Admin.tsx`. This means deleting the card that displays per-cottage and combined iCal feed URLs, along with the related `icalBaseUrl` variable and `copyToClipboard` helper (if unused elsewhere). Keep only the Booking.com Import card and Sync functionality.

