CREATE POLICY "Anyone can update predictions"
ON public.rsvps
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);