## Changes

### 1. New route `src/routes/program.tsx`
- TanStack file route at `/program`.
- Adds `head()` with title "Program of Events — BBFCONVENTION" and matching description/og tags.
- Renders `<CornerLogos />`, a page header ("Program of Events", "11:00 AM – 6:00 PM, Saturday July 18, 2026"), the updated `<Timeline />`, a back-to-home link, and `<Footer />`.

### 2. `src/components/site/Timeline.tsx`
- Replace the `events` array with the full 19-entry list from the user, keeping the existing time + title structure (`time` shown as start time, `title` as the activity label).
- Keep current visual styling (left rail, gradient time text, cards). No behavior change beyond the new data and heading tweak so it works standalone on the new page.

### 3. `src/components/site/Hero.tsx` (line 55)
- Change the "View Program" anchor from `<a href="#program">` to a TanStack `<Link to="/program">` so the button navigates to the new page instead of scrolling to the on-page Programs section.

## Out of scope
- `Programs.tsx` (the 3-day overview cards) stays on the home page unchanged.
- No changes to routing config — `src/routeTree.gen.ts` regenerates automatically from the new route file.
