
CREATE OR REPLACE FUNCTION public.registration_email_exists(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.registrations
    WHERE lower(email) = lower(trim(_email))
  )
$$;

REVOKE EXECUTE ON FUNCTION public.registration_email_exists(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.registration_email_exists(text) TO anon, authenticated;
