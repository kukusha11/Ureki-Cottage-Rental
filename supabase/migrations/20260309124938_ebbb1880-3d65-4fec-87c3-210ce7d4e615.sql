CREATE POLICY "Allow anon insert reservations"
ON public.reservations
FOR INSERT
TO anon
WITH CHECK (
  cottage_number BETWEEN 0 AND 7
  AND check_out >= check_in
  AND char_length(trim(guest_name)) > 0
  AND source IN ('manual', 'booking_com')
);

CREATE POLICY "Allow anon update reservations"
ON public.reservations
FOR UPDATE
TO anon
USING (
  cottage_number BETWEEN 0 AND 7
  AND source IN ('manual', 'booking_com')
)
WITH CHECK (
  cottage_number BETWEEN 0 AND 7
  AND check_out >= check_in
  AND char_length(trim(guest_name)) > 0
  AND source IN ('manual', 'booking_com')
);

CREATE POLICY "Allow anon delete reservations"
ON public.reservations
FOR DELETE
TO anon
USING (
  cottage_number BETWEEN 0 AND 7
  AND source IN ('manual', 'booking_com')
);