-- Add Unilorin membership flag to registrations
ALTER TABLE public.registrations
  ADD COLUMN jci_unilorin_member BOOLEAN NOT NULL DEFAULT false;
