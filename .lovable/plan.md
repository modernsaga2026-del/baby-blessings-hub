

## Plan: Combine RSVP + Predictions into One Unified Form

### What changes

**1. Create new combined component: `src/components/RSVPAndPredictions.tsx`**

A single component replacing both `RSVPSection` and `PollsSection` with:
- One heading: "RSVP & Baby Predictions" with subtitle "Let us know if you're joining and have fun guessing all about Baby!"
- One form containing:
  - **Your Name** (required)
  - **Will you be attending?** (required, same Yes/Maybe/No buttons)
  - **Number of People** (required, same dropdown)
  - **Message** (optional textarea)
  - A visual divider, then the prediction questions:
    - Gender prediction (choice, optional)
    - Looks prediction (choice, optional)
    - Trait prediction (choice, optional)
    - Baby name suggestion (text, optional)
    - Wish for baby (text, optional)
  - One submit button
- On submit: single `supabase.from('rsvps').insert(...)` with all RSVP + prediction fields together
- On success: show confirmation "Thank you for RSVPing and casting your predictions!" in-place (no scroll/jump)

**2. Update `src/pages/Index.tsx`**
- Remove imports of `RSVPSection` and `PollsSection`
- Import new `RSVPAndPredictions`
- Replace the two separate `<section>` blocks with one section rendering `<RSVPAndPredictions />`

**3. Delete old files (or leave unused)**
- `src/components/RSVPSection.tsx` — no longer imported
- `src/components/PollsSection.tsx` — no longer imported

### What stays the same
- Supabase `rsvps` table schema, RLS policies, edge functions — untouched
- AdminPanel reads from same table — works as before
- All other sections (Hero, EventDetails, Gallery, Footer) — untouched
- Existing styling patterns (glass cards, glow-gold, emerald-gradient buttons)

### Files modified
| File | Action |
|---|---|
| `src/components/RSVPAndPredictions.tsx` | **Create** — unified form component |
| `src/pages/Index.tsx` | **Edit** — swap RSVPSection + PollsSection for RSVPAndPredictions |

