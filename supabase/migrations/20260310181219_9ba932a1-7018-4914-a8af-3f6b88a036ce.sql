
CREATE TABLE public.booking_com_cottage_urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cottage_number INTEGER NOT NULL,
  ical_url TEXT NOT NULL DEFAULT '',
  last_synced_at TIMESTAMPTZ,
  UNIQUE (cottage_number)
);

ALTER TABLE public.booking_com_cottage_urls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon read cottage urls" ON public.booking_com_cottage_urls FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert cottage urls" ON public.booking_com_cottage_urls FOR INSERT TO anon WITH CHECK (cottage_number BETWEEN 1 AND 7);
CREATE POLICY "Allow anon update cottage urls" ON public.booking_com_cottage_urls FOR UPDATE TO anon USING (cottage_number BETWEEN 1 AND 7) WITH CHECK (cottage_number BETWEEN 1 AND 7);

INSERT INTO public.booking_com_cottage_urls (cottage_number) VALUES (1),(2),(3),(4),(5),(6),(7);
