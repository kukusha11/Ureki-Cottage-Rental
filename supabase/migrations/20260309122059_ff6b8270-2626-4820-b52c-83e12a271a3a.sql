
-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  cottage_number INTEGER NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (needed for iCal feed edge function)
CREATE POLICY "Allow anonymous read for iCal feed"
  ON public.reservations
  FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated full CRUD (admin access via service role in edge functions)
CREATE POLICY "Allow authenticated read"
  ON public.reservations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert"
  ON public.reservations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
  ON public.reservations
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete"
  ON public.reservations
  FOR DELETE
  TO authenticated
  USING (true);

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for auto-updating updated_at
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
