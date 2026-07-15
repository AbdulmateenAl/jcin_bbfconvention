## Changes

### 1. `src/lib/convention.ts`
- `venue`: `"Rotana Hotels, Fate Road, Ilorin, Kwara State"` (drop `city` usage if it duplicates; keep `city` field as-is unless it appears alongside venue).
- `startDate`: `"2026-07-18T11:00:00+01:00"`.
- `payment.pricing`: keep only `{ label: "Registration", amount: "₦6,000" }`. Remove Ladies/Men Aso-Oke rows.

### 2. `src/components/site/Registration.tsx`
- Remove the "Purchasing Aso-Oke" field/checkbox and its Zod schema entry.
- Remove the "Attending Recovery Picnic" field/checkbox and its Zod schema entry.
- Remove these from the insert payload sent to the `registrations` table (leave the DB columns intact; simply stop writing to them — existing rows and admin view unaffected).
- Remove any conditional UI (e.g. Aso-Oke size/type selectors) tied to these fields.

### 3. Anywhere pricing/aso-oke/picnic is displayed on the site
- Audit `About.tsx`, `Programs.tsx`, `Timeline.tsx`, `Theme.tsx`, `Footer.tsx` for mentions of Aso-Oke, recovery picnic, or the removed pricing lines and remove/update them so copy stays consistent with the flat ₦6,000 fee.

## Out of scope
- No DB migration — `purchasing_aso_oke` and `attending_picnic` columns remain (harmless, nullable/default false). Admin dashboard continues to render them for historical rows.
