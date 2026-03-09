DROP POLICY IF EXISTS "Allow anon read for sync" ON public.booking_com_settings;
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.booking_com_settings;

CREATE POLICY "Allow anon read for sync"
ON public.booking_com_settings
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anon insert for settings"
ON public.booking_com_settings
FOR INSERT
TO anon
WITH CHECK (ical_url ~* '^https?://');

CREATE POLICY "Allow anon update for settings"
ON public.booking_com_settings
FOR UPDATE
TO anon
USING (char_length(ical_url) > 0)
WITH CHECK (ical_url ~* '^https?://');

CREATE POLICY "Allow authenticated full access"
ON public.booking_com_settings
FOR ALL
TO authenticated
USING (char_length(ical_url) > 0)
WITH CHECK (ical_url ~* '^https?://');