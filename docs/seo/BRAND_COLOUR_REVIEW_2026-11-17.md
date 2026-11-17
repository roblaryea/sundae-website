# Search-page colour and brand review — 17 November 2026

## Design direction

Visual thesis: retain Sundae's warm espresso/cream editorial identity, with clear ink-to-caramel headline hierarchy, purposeful coral actions and restrained olive evidence surfaces.

Content structure: preserve the existing hero, native product evidence, operating detail, outcomes, questions and conversion path. Core and Crew remain the two peer offerings. This is presentation refinement, not a positioning or copy rewrite.

Interaction: retain the established hero entrance, scroll reveals and link/CTA hover responses. Reduced-motion content remains visible. No new decorative animation or fake product UI is added.

## Reviewed scope

| Surface | Colour treatment |
| --- | --- |
| Restaurant management, tasks, logbook and tips pages, all 22 languages | Authored warm headline phrases, warm hero foundation, readable rhythm numbering, raised outcomes surface and olive connected-operation section. Removed blue/pink decorative gradients. |
| Restaurant365 evaluation, all 22 languages | Warm headline phrase, clear hierarchy, olive capability/evidence areas and theme-aware table surfaces. Existing competitor/source/claim boundaries remain intact. |
| Home/product/Why Sundae shared offering sections | Caramel emphasis within Core/Crew benefit headings; coral overview actions; a restrained warm editorial wash. No third offering, new cards or extra content. |
| Why Sundae hero and reason links | Localized warm emphasis and coral action links, retaining exact wording and proof destinations. |
| Native task/logbook/tip evidence blocks | Warm framing and editorial background, clearer action links. Product screenshot pixels and demo-data disclosures unchanged. |
| Earlier search-authority articles | Scoped warm subject emphasis, section hierarchy, coral prose links and olive evidence quotations. Covers demand forecasting, real-time operations, competitor intelligence, benchmarking methodology and the earlier revenue/profit article where published. Other blog owners' articles keep their styling. |
| Authority-guide callouts on Pulse/Foresight/Watchtower and workflow indexes | Ink-on-cream editorial callouts, deeper readable action colour and warm accents. Existing links and language availability preserved. |

## Colour rules

- `docs/COLOR_SYSTEM.md` remains authoritative. Coral marks action; caramel/amber warms selected headline phrases; olive is confined to evidence, integration and capability surfaces. Section labels remain muted except the first hero category signal.
- `--text-warm` is butter/caramel on espresso and deep caramel on warm paper. Pale amber is not reused on the light background. The guide callout uses the existing deep brand colour on cream.
- The custom workflow/comparison closing headings now explicitly use ink on cream in both themes. Their old inherited display token could render pale headings on cream in dark mode.
- Headlines wrap authored phrases without changing visible wording, punctuation, metadata or accessible names. A regression check verifies every phrase against the existing copy in all 22 languages. Arabic and other non-Latin scripts retain upright native lettering.
- New article rules are scoped to the authority programme and prose; they do not recolour CTA buttons or every blog article. Product/data taxonomy colours and screenshot content are unchanged.

## Release gates and evidence

Run the existing 110-route workflow/comparison browser gate, SEO/locale tests, production build/type checks and reduced-motion/fixed-position checks. Inspect representative English, Arabic, French and German desktop/mobile views in both themes. Check new accent contrast and ink-on-cream closing headings; this does not claim full-site WCAG certification.

Evidence is retained in ignored `output/seo/colour-*-2026-11-17.*` and `output/playwright/colour-*-2026-11-17.png`. The focused release PR records exact final checks, merge and live verification. Existing search/lead measurement and the 23 November/30 November follow-up cadence are unchanged.

## Validation receipt

- SEO, locale-emphasis and attribution regression checks: 55 passed; targeted lint: zero errors; Next 16.4.6 production build and type checks passed.
- Local rendered acceptance: 110 workflow/comparison routes across all 22 languages; 132 portfolio routes and 22 desktop/mobile navigation journeys passed.
- Focused browser colour review covers 48 page/theme pairs (96 desktop/mobile views), including English, Arabic, French and German. New headline-emphasis contrast is at least 4.5:1, cream closing headings remain ink, and no horizontal overflow or uncaught page errors were detected. Authority-guide callouts were inspected in both themes. This is a scoped review rather than full-site accessibility certification.
- Build validation exposed the Next 16.4.3 cache disclosure advisory GHSA-mfr8-8qww-v76h. The bounded maintenance patch updates only Next and its matching environment/compiler packages to 16.4.6; no unrelated dependency refresh is bundled. Runtime dependency audit: eight moderate findings remain, zero high/critical, and Next is no longer listed.
- The release PR carries the final hosted-check, merge and production-verification receipt.
