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

| location                         | image(s)                                  | overlay | why                                              |
|----------------------------------|-------------------------------------------|---------|--------------------------------------------------|
| Editorial band (after hero)      | `plating.jpg`                             | `text`  | first real-world breath; operator-truth headline |
| Proof section (stats → claims)   | `atmosphere.jpg` (dark) / `dining-room.jpg` (light) | `blend` | grounds the proof in a real room, per-theme      |

## Asset library — `public/images/editorial/`

All free commercial-license (Pexels), curated by visual review:

| file              | frame                                         | best for          |
|-------------------|-----------------------------------------------|-------------------|
| `kitchen-pass.jpg`| chef hands plating a steak on the pass         | both themes       |
| `plating.jpg`     | chef garnishing with tweezers, pro kitchen     | both themes (band)|
| `dining-room.jpg` | warm amber bistro interior, set table          | **light** mode    |
| `atmosphere.jpg`  | moody upscale room, staff in white, blue tones | **dark** mode     |

## Pending follow-ups

- **Localization.** The band copy is inline English pending sign-off on the visual
  direction; lift into `messages.home` and localize once approved.
- **Hero proper.** The hero remains product-UI (dashboard mockup); humanization
  currently lives in the band directly below it. Revisit whether to ground the hero
  itself once this direction is judged on preview.
- **Licensing record.** Pexels assets are commercial-free; if a specific operator
  agrees to attribution, swap in their real venue and credit them.
