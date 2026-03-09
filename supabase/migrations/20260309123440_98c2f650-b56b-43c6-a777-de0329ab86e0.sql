
-- Add source and external_uid columns to reservations
ALTER TABLE public.reservations 
  ADD COLUMN source text NOT NULL DEFAULT 'manual',
  ADD COLUMN external_uid text;

-- Create unique index on external_uid to prevent duplicate imports
CREATE UNIQUE INDEX idx_reservations_external_uid ON public.reservations(external_uid) WHERE external_uid IS NOT NULL;

-- Create booking_com_settings table
CREATE TABLE public.booking_com_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ical_url text NOT NULL,
  last_synced_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booking_com_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for booking_com_settings (anon read for edge function, authenticated full access)
CREATE POLICY "Allow anon read for sync" ON public.booking_com_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated full access" ON public.booking_com_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Add updated_at trigger
CREATE TRIGGER update_booking_com_settings_updated_at
  BEFORE UPDATE ON public.booking_com_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
