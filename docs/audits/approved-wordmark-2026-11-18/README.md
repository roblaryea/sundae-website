# Approved Sundae wordmark correction

Application source: `18896f50ce7dfd19f7d20b6140aa83450a5f787b` (initial source `63689bf`, followed by the one-line mobile specimen correction). [PR248](https://github.com/roblaryea/sundae-website/pull/248). Base: `5bcf0b9430c6d0427f1a8234da3ea7c211e3f733`.

The main website now uses the two exact approved Fraunces PNGs in active identity surfaces and downloads. The SEO/GEO chat independently reviewed this application source and its finite mobile correction. This report records author validation; publication and live verification remain with that independent owner.

## Scope

- Shared approved artwork replaces typed/reconstructed logos and separate marks in navigation, mobile drawer, footer, Home, booking, profile cards, diagnostic reports, not-found and design previews.
- The public brand kit contains only the two byte-identical originals, with clear light/dark specimens and usage guidance. Retired files are preserved outside the public directory in `brand-archive/retired-identity-2026-11-18`, with an original-path/hash inventory.
- Exactly 26 legacy logo/card/email/icon URLs redirect to corresponding approved artwork. Four retired banner URLs return 404. No blanket banner redirect was added.
- Shared/profile social images, complete-wordmark favicon/apple/manifest icons and the vCard fallback were regenerated. Uploaded portraits and real historical product screenshots/videos were preserved.
- Accepted positioning, Core/Crew taxonomy, prices, commercial behavior, SEO text, navigation destinations, attribution, themes and contact/booking flows were retained. The manifest's stale name/category was aligned with the independently accepted positioning.

## Validation

| Check | Result | Receipt |
| --- | --- | --- |
| Production build, i18n/translation/positioning preflight | Passed on corrected application source | `data/build-final.log` |
| Runtime boundary/audit | 106 traces retain runtime instrumentation; 50 runtime packages, zero advisories | `data/build-final.log` |
| SEO suite | 198 passed, including 6 approved-artwork/hash/ZIP/redirect/ICO checks | `data/seo.log` |
| Lint | Passed | `data/lint.log` |
| Profile/search/Home focused checks | 83 passed before the isolated specimen-grid fix; source acceptance carries | Prior author run |
| Existing booking brand browser checks | 2 passed: desktop/mobile, five public/unavailable routes, both themes | `data/booking-brand.log` |
| Built HTTP readback | 43 passed, including all 26 actual 308-to-200 image redirects and exact target-byte hashes | `data/http-readback.json` |
| Hosted PR checks | All seven passed on `18896f5`, including build, code analysis, dependency scan and Vercel | PR248 checks |
| Independent review | Accepted `18896f5`; no remaining source finding | Existing SEO/GEO chat |

The booking run used the existing local backend fixture and sent no real booking or email. Diagnostic screenshots show the unavailable report state; no signed customer report was fetched or generated. Its fixed dark surface correctly uses the white PNG, while the outer navigation follows the site theme. The report component's own theme state selects the corresponding original artwork explicitly.

## Representative visual evidence

Screenshots are in `evidence/`. Main-site captures use the production build at `http://127.0.0.1:3135`. The `brand-light-1440` desktop and booking fixture captures predate the isolated mobile grid fix; their unchanged accepted surfaces carry to the final application source. Other representative captures use the corrected build.

| Surface | Evidence |
| --- | --- |
| Brand page | `brand-{dark,light}-{1440,390}.png` |
| Mobile drawer | `menu-{dark,light}-390.png` |
| Home/header | `home-{dark,light}-1440.png`, `home-light-390.png` |
| Footer | `footer-light-1440.png` |
| Native profile card, own theme | `profile-{dark,light}-{1440,390}.png` |
| Diagnostic unavailable | `diagnostic-unavailable-{1440,390}.png` |
| Existing booking fixture | `booking-{desktop,mobile}-{light,dark}.png` |
| Internal preview approved specimens | `preview-approved-wordmark-1440.png` |

The regenerated main and profile social images were also visually inspected at their actual 1200x630 size; their source files are `public/logos/og-operations.png` and `public/profile/robert-og.png`.

## Findings and corrections retained

1. The first production build rejected the favicon: Next's file-based icon decoder requires RGBA PNG payloads. The ICO encoding was corrected without changing its opaque pixels or approved artwork. The corrected build passes. The initial failure receipt is retained in `data/build-first-failure.log`.
2. Both author and independent reviewer found the brand specimen grid's implicit mobile track extended to x434 in a 390px viewport. The explicit single mobile column in `18896f5` fixes that. Retakes in both themes show specimen bounds x16 to x374 (358px), with complete logo wrappers x33 to x357 (324px). Outer scroll width alone would have missed this clipping; actual element bounds and images were checked.

The full approved wordmark is necessarily small at 16px favicon size. This is the accepted square-container fallback, not a new monogram. All five icon PNG sizes match the pricing patch byte-for-byte; the main ICO uses the RGBA encoding required by Next.

The only browser console errors during local production-preview inspection were the expected unavailable local Vercel analytics script (404 and MIME refusal). No new artwork-loading error was observed. Below-fold lazy artwork and animated sections were scrolled into view before full-page capture.

## Publication handoff

The source author does not merge or deploy this patch. The existing SEO/GEO owner publishes the independently accepted main-site source first, verifies public artwork/download/redirect behavior, then publishes pricing PR63, which reuses the main site's `/logos/og-operations.png` URL. This evidence does not claim production publication or search-ranking improvement.
