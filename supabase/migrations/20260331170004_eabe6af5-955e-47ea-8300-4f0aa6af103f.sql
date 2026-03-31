ALTER TABLE public.rsvps
  ADD COLUMN prediction_gender text,
  ADD COLUMN prediction_looks text,
  ADD COLUMN prediction_trait text,
  ADD COLUMN prediction_name text,
  ADD COLUMN prediction_wish text;