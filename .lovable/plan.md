
## Plan

### 1. Remove scroll-snapping (`src/index.css`)
- Remove `scroll-snap-type`, `scroll-snap-align`, fixed `height: 100dvh` / `max-height` from `.snap-container` and `.snap-section`
- Keep the classes but make them simple flex column containers with natural flow
- Result: free, continuous, smooth scrolling

### 2. Fix video container (`src/components/PhotoVideoGallery.tsx`)
- Change video element to use `object-fit: contain` instead of `object-cover`
- Ensure `width: 100%` so the full frame is visible without cropping

### 3. Change passcode (`src/components/PasscodeGate.tsx`)
- Change `PASSCODE` from `"baby2026"` to `"rv2026"` (compared lowercase)

### 4. Celebratory entrance animation (`src/components/PasscodeGate.tsx`)
- Install `canvas-confetti` package
- On correct password: fire confetti burst, show animated peacock + parrot flying across screen (CSS/framer-motion SVG animations), then after ~2s fade out the gate and reveal content
- The gate component will call `onUnlock` after the animation completes

### 5. Flying birds assets
- Generate peacock and parrot images (transparent PNGs) to use in the fly-across animation

### Files Modified
| File | Change |
|---|---|
| `src/index.css` | Remove snap-scroll rules |
| `src/components/PhotoVideoGallery.tsx` | `object-contain` on video |
| `src/components/PasscodeGate.tsx` | New passcode + entrance animation |
| `package.json` | Add `canvas-confetti` |
| `src/assets/` | Peacock + parrot images |

### No database changes needed
