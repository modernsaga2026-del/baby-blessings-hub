
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  attending TEXT NOT NULL CHECK (attending IN ('yes', 'no', 'maybe')),
  message TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (no auth required for guest RSVP)
CREATE POLICY "Anyone can submit RSVP"
  ON public.rsvps FOR INSERT
  WITH CHECK (true);

-- No public SELECT - only service role / edge functions can read
CREATE POLICY "No public read"
  ON public.rsvps FOR SELECT
  USING (false);
