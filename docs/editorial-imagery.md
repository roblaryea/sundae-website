# Editorial Imagery System

Premium, documentary restaurant photography for the marketing site — the answer to
the reviewer note _"a restaurant product with zero restaurant photos, it looks
AI-made."_ The goal is **natural and premium**, not heavily-filtered stock, and the
photography must respect the site's two first-class themes (dark default + light)
**without conflating them**.

## Principles

1. **Real, documentary, human.** Hands on the pass, a room mid-service, plating with
   tweezers — operator-world frames, not glossy hero food. Curate for craft and
   warmth, reject snapshot/cluttered frames.
2. **Blend, don't paste.** A photo must never sit as a hard rectangle on the page.
   The treatment feathers every edge into the page background so it reads as part of
   the surface, in both themes.
3. **Two modes stay separate.** Dark and light each keep their own first-class look.
   Where it improves the result, supply a per-mode image (warm room for light, moody
   room for dark) via the `light` twin — the swap is pure CSS, zero hydration flash.
4. **Restrained grade.** A whisper of electric-blue brand wash + faint film grain for
   cohesion. Never so much that the photo looks filtered or loses its premium feel.

## Component — `<EditorialImage>`

`src/components/ui/EditorialImage.tsx`. Wraps `next/image` (fill, object-cover) in a
brand-graded frame. Mirrors `<ThemedShot>`'s `[html.light_&]:` theme-swap mechanism.

```tsx
<EditorialImage
  src="/images/editorial/atmosphere.jpg"   // dark-theme (or both) image
  light="/images/editorial/dining-room.jpg" // optional light-theme twin
  alt="An operator's dining room mid-service"
  ratio="aspect-[21/9]"
  overlay="blend"      // blend | text | duotone | none
  rounded="rounded-[24px]"
  priority             // above-the-fold only
/>
```

### Overlay variants

| variant   | use                                   | treatment                                                        |
|-----------|---------------------------------------|------------------------------------------------------------------|
| `blend`   | default — image as a page surface     | top+bottom gradient from `var(--navy-deep)` → transparent        |
| `text`    | copy overlaid on the image            | heavier bottom scrim for legibility on both themes               |
| `duotone` | busy frames needing more cohesion     | navy→blue multiply wash                                          |
| `none`    | raw image inside the frame            | frame + grain only                                              |

### How theme-blend works

The edge gradients are built from `color-mix(in srgb, var(--navy-deep) N%, transparent)`.
`--navy-deep` flips `#0D1520` (dark) ↔ `#FFFFFF` (light) in `tokens.css`, so the same
markup feathers into a navy page in dark mode and a white page in light mode — no
`dark:`/`light:` branches needed for the blend. Mode-specific tweaks (ring, shadow,
grain opacity) use the `[html.light_&]:` variant.

## Placement map (homepage)

Five deliberate moments, one consistent art direction, each blended into the page.
**Orientation drives layout**: wide cinematic bands take LANDSCAPE frames only;
PORTRAIT frames go in splits or portrait-tolerant ratios (a portrait force-cropped
into a 21/9 band collapses to a dead slice).

| location                          | image(s)                                            | layout                | why                                                     |
|-----------------------------------|-----------------------------------------------------|-----------------------|---------------------------------------------------------|
| **Hero backdrop** (behind dash)   | `dining-candlelit.jpg` (landscape)                  | raw blur + vignette   | grounds the product hero; dashboard floats over it      |
| **Band** — after hero             | `chef-sauce.jpg` (landscape)                        | wide band, `text`     | first full-bleed human moment; "from the pass to the P&L" |
| **Band** — mid-page               | `kitchen-pass.jpg` (landscape)                      | wide band, `text`     | breaks the text-dense middle; the line. Wordmark headline |
| **Proof** — stats → claims        | `dining-night.jpg` (dark) / `dining-room.jpg` (light) | centered 3/2, `blend` | a real room, mode-matched (both portrait → 3/2 frame)   |
| **Closer** — before final CTA     | `service-warm.jpg` (dark) / `service-plates.jpg` (light) | **split** 4/5 + copy | portrait service shot beside copy on the page bg        |

Two layout primitives:
- **`<SectionEditorialBand>`** — wide/landscape, copy overlaid on the photo (always
  a fixed DARK `text` scrim so white copy is legible in both themes).
- **`<SectionEditorialSplit>`** — portrait photo beside a text column on the page bg
  (copy inherits theme-aware colors; no white-on-photo).

The hero backdrop is a raw `next/image` (not `<EditorialImage>`) because it wants
heavier blur + a radial vignette into the page rather than a framed card.

### Wordmark in headlines

Where **Sundae is the subject** of a headline/emphasis, the text "Sundae" is swapped
for the inline `<SundaeWordmark>` (currentColor typeface + red dot). Applied to the
hero emphasis ("the tradeoff **Sundae** removes") and the mid band ("**Sundae** moves
with them") via `withWordmark()`, which is locale-safe (the brand name is constant
across all 22 locales) and leaves the "Sundae Intelligence" product lockup as text.

## Asset library — `public/images/editorial/` (12 frames)

All free commercial-license (Pexels), curated one-by-one by visual review. The
tattooed-chef frames are a single shoot — reuse them together for cohesion.

| file                   | frame                                              | role / best for          |
|------------------------|----------------------------------------------------|--------------------------|
| `kitchen-pass.jpg`     | tattooed chef hands plating a steak on the pass     | hero/library (both)      |
| `chef-sauce.jpg`       | chef finishing a plate w/ sauce, neg-space (series) | **band** (text overlay)  |
| `plating.jpg`          | chef garnishing with tweezers (series)              | library (both)           |
| `chef-detail.jpg`      | tight tweezers + soup detail (series)               | detail accent            |
| `kitchen-brigade.jpg`  | three cooks on the line, big window, steam          | **mid band** (team)      |
| `kitchen-flame.jpg`    | cook flambéing, drama/energy                        | library (energy accent)  |
| `dining-candlelit.jpg` | refined warm dining room, candle + depth            | **hero backdrop** / warm |
| `dining-room.jpg`      | warm amber bistro interior, set table               | **proof — light**        |
| `dining-night.jpg`     | blue night table, glowing lamp (legible under scrim)| **proof — dark**         |
| `atmosphere.jpg`       | moody upscale room, staff in white, blue tones      | library (dark)           |
| `service-warm.jpg`     | host attending guests under a warm pendant          | **closer — dark**        |
| `service-plates.jpg`   | waiter carrying plates, airy window-lit room        | **closer — light**       |

## Pending follow-ups

- **Localization.** The band copy is inline English pending sign-off on the visual
  direction; lift into `messages.home` and localize once approved.
- **Hero proper.** The hero remains product-UI (dashboard mockup); humanization
  currently lives in the band directly below it. Revisit whether to ground the hero
  itself once this direction is judged on preview.
- **Licensing record.** Pexels assets are commercial-free; if a specific operator
  agrees to attribution, swap in their real venue and credit them.
