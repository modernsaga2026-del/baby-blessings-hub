

## Plan: Admin Panel + Predictions + UI Fixes

### 1. Database Migration: Add prediction columns to `rsvps` table

Add 5 nullable text columns to the existing `rsvps` table for each poll question:

- `prediction_gender` (text, nullable)
- `prediction_looks` (text, nullable)
- `prediction_trait` (text, nullable)
- `prediction_name` (text, nullable)
- `prediction_wish` (text, nullable)

No RLS changes needed -- existing insert policy allows public inserts, and reads go through the edge function with service role key.

### 2. Update `PollsSection.tsx`: Save predictions to Supabase

- Replace localStorage logic with a Supabase `update` call.
- On submit, ask the guest for their name (already collected), then update the matching `rsvps` row (by name) with the prediction columns.
- **Alternative approach** (more reliable): Since the guest may not have RSVP'd yet or names may not match exactly, instead do a direct `insert` of a new row OR use an `upsert`. However, the cleanest approach is to save predictions as a separate Supabase call that updates the most recent RSVP row matching that voter name.
- Keep the existing UI (name entry, questions, results display) exactly the same.
- After submitting, still show aggregated results (fetch from Supabase or keep localStorage for anonymous result display).

**Refined approach**: On poll submit, call `supabase.from('rsvps').update({ prediction_gender, prediction_looks, ... }).eq('name', voterName)`. If no matching RSVP row exists, insert a minimal row with just the name and predictions. This keeps predictions linked to the RSVP.

### 3. Update `AdminPanel.tsx`: Fetch from Supabase via edge function

- Replace localStorage reads with a call to the existing `get-rsvps` edge function (which already uses service role key and returns all rows).
- Display RSVP data (name, attending, guests, message, created_at) plus all prediction columns in each card.
- Remove the "polls" tab that reads from localStorage; instead show predictions inline with each RSVP entry.

### 4. Update `PhotoVideoGallery.tsx`: Consistent image sizing

- Give all three cards (baby shoes, ultrasound, video) the same fixed aspect ratio using `aspect-ratio` CSS.
- Use `object-cover` with consistent container sizing so images aren't awkwardly cropped.
- Keep heartbeat button and video controls exactly as-is.

### 5. Update `EventDetailsSection.tsx`: High-contrast Google Maps button

- Change the "Open in Google Maps" link from `glass` styling to a solid, high-contrast button style (e.g., `bg-white text-primary font-semibold px-8 py-3 rounded-full`).
- Increase font weight and padding. Keep the same `href`, `target="_blank"`, and MapPin icon.

### Files Modified

| File | Change |
|---|---|
| `supabase/migrations/...` | Add 5 prediction columns to `rsvps` |
| `src/components/PollsSection.tsx` | Save predictions to Supabase instead of localStorage |
| `src/components/AdminPanel.tsx` | Fetch from edge function, show RSVP + predictions |
| `src/components/PhotoVideoGallery.tsx` | Consistent aspect ratios for all cards |
| `src/components/EventDetailsSection.tsx` | High-contrast Maps button styling |

### What stays unchanged

- RSVP form submission logic (already writes to Supabase)
- Heartbeat audio, video play/pause behavior
- All routes, passcode gate, edge function logic
- Google Maps link URL and behavior

