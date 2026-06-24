## Goal
Prevent duplicate registrations by email, and mark required fields with asterisks in the registration form.

## Changes

### 1. Duplicate-email check (server function)
Create `src/lib/registrations.functions.ts` exporting `checkEmailExists` as a `createServerFn` that:
- Accepts `{ email: string }` (Zod-validated, lowercased/trimmed).
- Uses the server publishable client (no auth needed) to query `registrations` for a row matching the email.
- Returns `{ exists: boolean }`.

Add a narrow RLS policy via migration so anon can run this existence check safely:
- `CREATE POLICY "Anyone can check email exists" ON public.registrations FOR SELECT TO anon, authenticated USING (true);`

Tradeoff: this exposes that an email is registered. Acceptable for a public event signup, and only the existence check is used; no PII is returned to the client (server fn returns only a boolean).

Alternative (more private): skip the policy and instead create a SECURITY DEFINER SQL function `public.registration_email_exists(_email text) RETURNS boolean` and grant EXECUTE to anon/authenticated. The server fn calls it via `.rpc()`. This keeps row data hidden. **Recommended** — I'll use this approach.

So the migration will:
- Create `public.registration_email_exists(_email text)` SECURITY DEFINER, returns boolean.
- `GRANT EXECUTE` to `anon, authenticated`.

### 2. Wire into Registration submit flow
In `src/components/site/Registration.tsx` `onSubmit`:
- After Zod validation, before uploading the receipt, call `checkEmailExists`.
- If `exists` → `toast.error("This email has already registered for the convention.")`, set a `alreadyRegistered` state, and stop (no upload, no insert).
- Optionally render an inline message under the email field when `alreadyRegistered` is true; clear it when the email value changes.

### 3. Required-field asterisks
The `Field` helper already supports a `required` prop that renders a wine-colored asterisk. Currently set on: full_name, email, phone, food_option. Also add `required` to:
- The "Payment receipt" label (custom, not using `Field`) — add the asterisk inline.
- Both screening question headings ("Are you a JCIN member?" and "Are you a JCIN UNILORIN member?") — append a small required asterisk near the heading or label since the Next button is disabled until answered.

`family_group` stays optional (no asterisk).

## Technical notes
- Server fn lives outside `src/server/`; uses publishable-key client inside the handler.
- No change to `registrations` table schema or existing insert policy.
- Email comparison is case-insensitive (`lower(email) = lower(_email)` inside the SQL function).
