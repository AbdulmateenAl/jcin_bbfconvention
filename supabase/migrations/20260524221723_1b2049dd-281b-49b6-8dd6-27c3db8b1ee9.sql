
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Verification status enum
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'flagged');

-- Registrations
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  family_group TEXT,
  jci_member BOOLEAN NOT NULL DEFAULT false,
  purchasing_aso_oke BOOLEAN NOT NULL DEFAULT false,
  attending_after_party BOOLEAN NOT NULL DEFAULT false,
  attending_picnic BOOLEAN NOT NULL DEFAULT false,
  receipt_path TEXT NOT NULL,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a registration" ON public.registrations
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view registrations" ON public.registrations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update registrations" ON public.registrations
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete registrations" ON public.registrations
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER registrations_touch
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Storage bucket for receipts (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('receipts', 'receipts', false);

CREATE POLICY "Anyone can upload receipts" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'receipts');
CREATE POLICY "Admins can read receipts" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'receipts' AND public.has_role(auth.uid(), 'admin'));
