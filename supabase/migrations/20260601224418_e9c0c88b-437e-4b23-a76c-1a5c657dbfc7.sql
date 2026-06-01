
-- 1. Lock down user_roles: only admins can manage role assignments
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Lock down receipts storage bucket: admins can update/delete; anyone can upload to receipts (registration flow)
CREATE POLICY "Admins can update receipts"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'receipts' AND public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'receipts' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete receipts"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'receipts' AND public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Tighten the public registration insert policy: replace WITH CHECK (true) with basic field validation
DROP POLICY IF EXISTS "Anyone can submit a registration" ON public.registrations;

CREATE POLICY "Anyone can submit a registration"
ON public.registrations FOR INSERT TO anon, authenticated
WITH CHECK (
  length(full_name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320
  AND email LIKE '%_@_%'
  AND length(phone) BETWEEN 3 AND 40
  AND length(receipt_path) BETWEEN 1 AND 500
  AND verification_status = 'pending'::verification_status
  AND admin_notes IS NULL
);

-- 4. Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated so they
-- are not callable via the Data API. They remain callable internally by RLS policies.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
