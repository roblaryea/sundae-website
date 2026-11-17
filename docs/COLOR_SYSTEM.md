# Sundae Website — Color System & Governance

> The warm-signature palette is a **disciplined role system**, not a mood. Every
> color has ONE job. The whole point is restraint: when coral means "act," it has
> to be rare enough to still mean it. This doc is the source of truth — when a new
> page or section is built, it follows these roles. Tokens live in
> [`src/styles/tokens.css`](../src/styles/tokens.css).

## The five roles

| Role | Token(s) | Use it for | Never use it for |
|------|----------|-----------|-----------------|
| **Foundation** — Espresso Ink | `--navy-deep` `--navy` `--navy-surface` `--ink` | Page/surface backgrounds, serious/enterprise/trust moments | — |
| **Action** — Cherry Coral | `--warm-coral` `--accent-warm` `--warm-cherry` | CTAs, active/selected states, live signals, links/hover, the **single** first hero badge, a one-word headline accent | Section eyebrows, every border/chip/highlight, decorative labels |
| **Trust** — Warm Olive | `--trust` `--trust-bg` `--trust-border` | Enterprise / security / audit / integration / "live & syncing" **surfaces** + iconography | Replacing the live-data green; body text |
| **Warmth** — Caramel / Butter | `--warm-caramel` `--warm-amber` | Hospitality warmth, optimism, "act in time," subtle premium glow, headline accent fragments | A warning color; every header |
| **Canvas** — Sundae Cream | `--cream` `--cream-edge` | Relief sections, quotes, proof blocks, editorial breaks, light-mode raised cards | Text on dark (it's a surface) |

## Text & heading tokens

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--text-display` | `#FBF8F4` warm off-white | `#2A2320` warm ink | **All display headings** (`.hero-h1/h2`, `.section-h2/h3/h4`, `.card-title`). Not clinical `#FFF`. |
| `--text-warm` | `#F6C66B` butter/caramel | `#98501C` deep caramel | Selected headline phrases and editorial accents. The darker light-theme value preserves contrast; do not use pale butter directly on paper. |
| `--text-primary` | `#FFFFFF` | `#2A2320` | Max-contrast body/UI, `.text-contrast-high`, white-on-photo |
| `--eyebrow` | cream @62% | ink @69% | Section eyebrows/kickers via the `.eyebrow` class — **muted, never coral** |

## Hard rules (the governance the whole system depends on)

1. **Coral is the action color, and it is rationed.** CTAs, active states, live dots, links, the *one* first-signal hero badge per page, and at most a one-word headline accent. That's it. A coral eyebrow on every section is the failure mode this system exists to prevent.
2. **Section eyebrows use the `.eyebrow` class** (muted warm). Do not hand-roll `uppercase tracking-… text-[coral]`. The one exception is the page's **first** hero badge/category signal — that may stay coral (`PageHero`'s badge already does this).
3. **Display headings use `--text-display`** (warm off-white on dark / ink on light), via the `.hero-h1`/`.section-h2`/`.card-title` classes or `text-[var(--text-display)]`. Pure `text-white` is only correct **over a photo/image/gradient** (legibility) or inside a deliberately always-dark slab.
4. **Module / product-taxonomy colors are taxonomy, not brand.** Pulse red, Benchmarks green, Watchtower amber, Insights mauve, Intelligence pink/green, Foresight teal — keep them *only* as module identifiers (`--color-*`, chart palette). Never promote them to brand or section-chrome colors.
5. **Data-state colors stay data-state.** `--positive` (green) / `--warning` (amber) / `--critical` (red) live inside product mockups and status only. The Trust olive (`--trust`) is a brand-surface color and must stay visually distinct from the live-data green.
6. **The closing CTA gradient is punctuation, not a palette rule.** `--grad-warm-cta` / `bg-grad-deep` belong at page-ending CTAs only — a drama beat, not a repeated surface treatment.
7. **Light mode is first-class.** Any fixed color must be checked in both themes. A light-butter/cream value on white is illegible; theme-flipping tokens on an always-dark slab need the slab pinned (`.surface-always-dark`).

For search/editorial pages, `BrandEmphasis` wraps an authored phrase without changing the wording. `src/styles/search-presentation.css` supplies warm editorial surfaces, action links and olive evidence areas; it does not replace product/data colors or recolor the whole website. Cream closing sections explicitly pin heading text to ink in both themes. Article styling is scoped to the search-authority guides, preserving other content owners' work.

Supporting and muted light-theme text use warm ink at 74% and 69% respectively. These roles still sit below secondary text (78%); small-copy `--muted-grey` follows the existing muted role in both themes, and light section eyebrows use the same warm-ink strength. Footer links, article metadata and descriptions must remain readable on paper and tinted cards. Do not reduce their opacity to make a layout feel quieter; use spacing and type size to establish hierarchy. Check the actual composited surface, including olive and cream, rather than white alone.

Selected controls with a warm tint use `--action-on-tint`: the action coral on espresso and the deeper `--brand-main` on light paper. Ordinary action text on a plain surface continues to use `--accent-warm`; its plain-surface contrast does not guarantee readability over a coloured tint.

## Legacy tokens (retired 2026-06 — do not reintroduce)

`--electric-blue` (held coral — lied), `--deep-blue` (held caramel → `--warm-deep`), `--brand-yellow` (→ `--warm-amber`). Consumers were repointed to `--accent-warm` / `--warm-amber`. New code must not reference the retired names.

## Quick self-check before merging a page

- [ ] Only ONE coral first-signal at the top; section eyebrows use `.eyebrow`.
- [ ] Headings use the display classes / `--text-display`, not raw `text-white` (unless over a photo).
- [ ] No module/data-state color used as section chrome or brand.
- [ ] Trust surfaces use `--trust`; coral reserved for action.
- [ ] Verified in **both** light and dark.
