DROP POLICY IF EXISTS "Allow authenticated full access" ON public.reservations;

CREATE POLICY "Allow authenticated full access"
ON public.reservations
FOR ALL
TO authenticated
USING (cottage_number BETWEEN 0 AND 7)
WITH CHECK (
  cottage_number BETWEEN 0 AND 7
  AND check_out >= check_in
  AND char_length(trim(guest_name)) > 0
);