# Sundae Brand Assets — Canonical vs Deprecated

**Source of truth for the Sundae logo + wordmark across all repos** (sundae-website, sundae-app, sundae-pricing-site). Unified 2026-07. Use ONLY the canonical assets below; the old blue assets are retired.

## Canonical — use these

### Brand mark (the logo icon)
The coral **layered-S tile + cherry**: a dark rounded tile (`#1C1712`) with caramel→coral→cherry strata cut into an "S", topped by a cherry.

| Form | Location |
|---|---|
| Component (React, inline SVG) | `sundae-website/src/components/ui/SundaeMark.tsx` · `sundae-pricing-site/sundae-pricing/src/components/Brand/SundaeMark.tsx` |
| Canonical SVG | `sundae-website/public/logos/sundae-mark.svg` |
| App icon (512 PNG) | `sundae-website/public/logos/sundae-app-icon.png` |
| Favicon | `favicon.ico` (coral-S, 16/32/48) — on all three sites |
| PWA icons | `sundae-app/public/icons/*` · `sundae-app/public/logos/sundae-icon.svg` |

### Wordmark / logotype
The word **"sundae"** set in **Fraunces** (display face), lowercase.

| Form | Location |
|---|---|
| Component | `sundae-website/src/components/ui/SundaeLogotype.tsx` · `sundae-pricing-site/.../src/components/Brand/SundaeLogotype.tsx` |
| Header lock-up | `[SundaeMark] + [SundaeLogotype]` — see the Navbar / `Brand/Logo.tsx` |

## Deprecated — DO NOT USE
- **Blue "sundae" wordmark SVG:** `sundae-app/src/assets/sundae_logo_full.svg` (+ `_white`), fill `#151ea1` / `#121EA8` + red dot `#FF5450`, and legacy `public/logos/sundae-wordmark*.svg`.
- **Blue orb "e" icon:** `sundae-orb.png` / `sundae-orb-192/512.png`; the old blue `public/logos/sundae-icon.svg` (fill `#1E2FAA` — still present in sundae-website, slated for cleanup).

## Rules
1. **Logo lock-up** (site header, doc cover, footer, favicon, app icon): coral-S **mark** + Fraunces **"sundae"**. Never the blue orb, never the blue wordmark SVG.
2. **In running sentences/headings**, "Sundae" is **plain text** — do not swap in a mark/wordmark SVG mid-sentence (see PR #83).
3. **Favicon gotcha (both Next apps):** `src/app/favicon.ico` is auto-served at `/favicon.ico` by the App Router and **overrides** `metadata.icons`. A stale/default `.ico` there wins in the browser tab even when the PNG metadata is correct — keep `src/app/favicon.ico` = the coral-S `.ico`.

> The global `sundae-brand-design` design skill's color/typography sections predate the warm-signature redesign (coral/caramel + Fraunces/Hanken) and are being refreshed separately; its logo/wordmark guidance now matches this doc.
