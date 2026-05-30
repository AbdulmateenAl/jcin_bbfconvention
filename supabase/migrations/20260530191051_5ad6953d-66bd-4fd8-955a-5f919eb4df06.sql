ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS jci_member boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS food_option text;