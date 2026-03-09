DROP POLICY "Allow anon read for sync" ON public.booking_com_settings;
DROP POLICY "Allow authenticated full access" ON public.booking_com_settings;

CREATE POLICY "Allow anon read for sync" ON public.booking_com_settings
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow authenticated full access" ON public.booking_com_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY "Allow anonymous read for iCal feed" ON public.reservations;
DROP POLICY "Allow authenticated delete" ON public.reservations;
DROP POLICY "Allow authenticated insert" ON public.reservations;
DROP POLICY "Allow authenticated read" ON public.reservations;
DROP POLICY "Allow authenticated update" ON public.reservations;

CREATE POLICY "Allow anonymous read for iCal feed" ON public.reservations
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow authenticated full access" ON public.reservations
  FOR ALL TO authenticated USING (true) WITH CHECK (true);