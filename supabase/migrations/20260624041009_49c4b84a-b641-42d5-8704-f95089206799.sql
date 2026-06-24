
-- 1) Restrict receipts bucket uploads
DROP POLICY IF EXISTS "Anyone can upload receipts" ON storage.objects;

CREATE POLICY "Anyone can upload valid receipts"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'receipts'
  AND name ~ '^[0-9]{4}/[0-9]+-[a-z0-9-]{1,40}\.(jpg|jpeg|png|pdf)$'
  AND length(name) <= 120
);

-- 2) Revoke EXECUTE on SECURITY DEFINER functions from public roles
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.registration_email_exists(text) FROM PUBLIC, anon, authenticated;

-- service_role retains execute for trusted server-side calls
GRANT EXECUTE ON FUNCTION public.registration_email_exists(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
