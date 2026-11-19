# Supporting-page pricing presentation

Application head: `b71c7bd13def149eed789688b8bd4a1890079306`, on main through PR #263. Local production receiver: http://localhost:3152. This is the immediate pricing correction, separate from the later support-page redesign.

Getting Started removes its fixed five-location worked quote and implementation-fee grid. It retains the existing Core/Crew scope, five approved operating steps, sample-operation option and Implementation heading. The setup paragraph now uses the shared commercial copy with one localized View estimate link. Existing step/final actions have real localized hrefs and retain their tracking labels.

Foresight removes only the duplicate subscription anchor/band-price section. The single package-coverage note, workflow section, eight illustrated component examples and all other content remain. Its estimate action opens the simulator without a preset Foundation package, location count or optional extension.

The cost FAQ now explains product, location and implementation scope, then gives the shared setup paragraph and an actual localized simulator link. The same canonical answer feeds visible disclosure and FAQ JSON-LD. The Accordion change supports only authored HTTPS links at the configured pricing origin, limited to the root or simulator path; existing bold/list semantics are retained.

All new estimate destinations use `/simulator?lang=<locale>` without `cfg` or a fixed selection. Calculator economics and the pricing catalogue are unchanged. The authoritative live catalogue was checked during scoping; the problem corrected here is duplicated marketing presentation.

## Verification

- Final production build, localization, translation, positioning, runtime trace and deployed-runtime gates passed.
- 222 SEO/brand/navigation/coverage tests passed; scoped lint passed without warnings; diff whitespace check passed.
- 66 browser route/language cases passed: the three routes across all 22 website locales. The actual cost answer was opened in each language and its real anchor inspected. Normalized visible answer and FAQ JSON-LD match. Foresight retains one exact entitlement note and all eight component examples.
- Independent server-rendered FAQ/schema readback across all 22 locales is in [data/faq-ssr.json](data/faq-ssr.json).
- Settled EN, AR and NL views at 1440 and 390 pixels, both themes, plus DE at 320 pixels, passed horizontal-containment checks. 46 screenshots include the changed sections and the EN opening. Actual themes are read from the rendered root class after settling. The Arabic views retain RTL. The longer German estimate label fits at 320 pixels.
- The separate SEO/GEO reviewer independently checked nine EN/NL/AR routes and clicked the Arabic FAQ anchor through to the public Arabic pricing simulator.

[Browser checks](data/browser-checks.json), [build](data/build.log), [SEO tests](data/seo.log), [lint](data/lint.log), and actual geometry/text/color records in `data/visual-*.json`.

The local Vercel Analytics script's 404/MIME console messages are excluded from application page-error claims. This finite change does not claim the whole legacy support-page presentation or every pre-existing UI label is fully localized. For example, the older NL/DE Implementation heading remains as required by the accepted immediate scope; the support-page cut addresses the wider composition and copy separately.

## Visual evidence

| Language | Implementation | Foresight coverage | Open cost FAQ |
| --- | --- | --- | --- |
| EN | [comparison](evidence/en-implementation-sheet.jpg) | [comparison](evidence/en-foresight-coverage-sheet.jpg) | [comparison](evidence/en-faq-cost-sheet.jpg) |
| AR | [comparison](evidence/ar-implementation-sheet.jpg) | [comparison](evidence/ar-foresight-coverage-sheet.jpg) | [comparison](evidence/ar-faq-cost-sheet.jpg) |
| NL | [comparison](evidence/nl-implementation-sheet.jpg) | [comparison](evidence/nl-foresight-coverage-sheet.jpg) | [comparison](evidence/nl-faq-cost-sheet.jpg) |

Full section captures and DE 320px checks are in `evidence/`. No footer or media changes are included. Independent review and publication remain with the authorized SEO/GEO chat.
