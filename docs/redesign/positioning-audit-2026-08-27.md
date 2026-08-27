# Sundae.io positioning audit — 27 August 2026

## Executive finding

The new site has the right strategic centre: **Find the leak. Recover the profit.** The homepage, Core page and Profit Recovery page are visually premium, operator-friendly and substantially differentiated from generic “AI insights” software.

The site is not yet fully consistent or safe to amplify. Several older pages still lead with AI, module breadth or unverified numerical claims. The strongest product proof now present in code — Loop Health, evidence completeness, source reconciliation, measured-value coverage and the completion-to-measurement countdown — is not yet shown on the public Profit Recovery page.

The category boundary is **multi-location food-service**. Restaurants remain the founding and lead vertical, but should not be used as the platform boundary on umbrella pages or metadata.

## Product truth used for this audit

- **Loop Health** answers: does the recovery process close? It shows the full detected funnel, detected-to-measured close-rate, source close-rates, abstain reasons and cohort trend.
- **Evidence health** answers: can the underlying evidence window be trusted? Connector-backed sources are certified only when ingestion telemetry proves complete coverage; internal, incomplete and unverified states remain explicit.
- **Source reconciliation** answers: does the frozen recovered-value basis still tie to the live source records? Supported sources show reconciled, records changed or unavailable.
- **Value** answers: did measured recovered value cover Sundae's list subscription cost? Estimated identified value is kept separate from measured recovery; open periods are not presented as settled.
- **Completion-to-measurement** answers: what happens after the operator acts? Mark complete moves the decision to measuring, freezes the applicable baseline, schedules measurement and shows when the result is due.

“Recovery Health” should be used only as an explanatory umbrella, not invented as a standalone product label. In the current code, the precise concepts are Loop Health, evidence completeness and value reconciliation.

## Live-site assessment

| Priority | Page or surface | Finding | Required change |
|---|---|---|---|
| P0 | `/product` | Public copy claims “500 Data Models,” “500+ governed restaurant data models,” “$2K recovered per bad shift,” and that every package carries all eleven modules. These conflict with the claims bank and current commercial packaging. | Remove the numerical claims and rewrite the page around one auditable recovery loop. Pull package composition from the canonical price book rather than prose. Update every locale in the same release. |
| P0 | `/architecture` | Claims SOC 2 Type II is certified/compliant, while `/security` correctly says certification is in progress. It is also strongly AI-led and restaurant-narrow. | Replace certification language with the approved in-progress wording in all locales. Reframe the architecture around trusted data → governed decision → owned action → measured recovery. |
| P0 | `/solutions/regional-managers` | “Server performance varies by 30%+” has no approved source in the claims bank and has been propagated into generated locales. | Replace with a non-numerical operator truth and regenerate all locales. |
| P0 | Localization | The Arabic Profit Recovery route switches navigation, direction and footer to Arabic but leaves the entire recovery page and metadata in English. `recoveryCopy.ts` currently contains English only. | Transcreate the approved recovery page and metadata into all 21 non-English locales, beginning with Arabic, French and Spanish; add locale-completeness checks so English fallback cannot silently ship on a flagship page. |
| P1 | `/product/recovery` | Best-positioned product page, but its screenshots and story stop before the newest proof surfaces. | Add a concise “Proof health” section using current product visuals: Loop Health, completeness/reconciliation status, Value coverage and the measuring countdown. Keep the page outcome-led; do not turn it into a feature catalogue. |
| P1 | C-suite metadata | Metadata leads with “Daily AI briefings,” which makes Sundae sound like the category noise it is trying to escape. | Lead with portfolio-level profit recovery and verified value; explain AI later as infrastructure. |
| P1 | `/why-sundae` metadata | The H1 is strong (“Detection Is Table Stakes. Measured Recovery Isn’t.”), but metadata says “leading restaurant groups” and generic unified-data/visibility language. | Align metadata with the H1 and the food-service umbrella; remove the unsupported “leading groups choose” construction. |
| P1 | `/crew` | Long, AI-heavy page can read like a separate product story. | Position Crew as the execution layer that gives every recovery decision one owner, one task and a completion signal. Retain workforce depth lower on the page. |
| P1 | `/integrations` | Generic “connect everything” framing misses why integration quality matters. | Explain that complete evidence windows and source reconciliation are what make recovered-value claims defensible. Keep “200+ systems” only under the approved integration-catalog claim. |
| P1 | `/demo` | The flow is usable, but “real answers” and “your restaurant data” undersell the new proposition. | Turn the session into a recovery working session: identify a leak, inspect the evidence, assign the fix and show how recovery will be measured. Use “food-service operation” at umbrella level. |
| P2 | `/about`, `/resources`, role and segment pages | Generally coherent, but older restaurant-only and generic decision-intelligence language remains. | Refresh around the founder's transformation story, operator proof and recovery playbooks after the P0/P1 pages are locked. |

## Visual and responsive review

- The homepage and Profit Recovery hero are premium and on-brand on desktop and a 390 × 844 mobile viewport.
- Type, colour and hierarchy are distinctive; product visuals are substantially more credible than abstract AI artwork.
- The mobile cookie banner obscures a large part of the first viewport. Reduce its height or use a compact bottom sheet so the recovery visual and secondary CTA remain visible.
- Continue to favour current product screenshots. Use mobile product captures where the real interaction is naturally mobile; do not crop desktop views into unreadable cards.

## Translation release rule

1. Approve the English source copy and claims first.
2. Transcreate, rather than literally translate, the operator outcome and proof language.
3. Regenerate all 21 non-English locale files in the same change as any removed claim; never leave revoked numbers in generated locales.
4. Validate route, metadata, body, image alt text, CTA and RTL layout for Arabic and Urdu.
5. Fail the build when a flagship page such as homepage, Core, Recovery, Why Sundae or Demo falls back to English in a non-English locale.

## Recommended release sequence

1. **Claims and compliance hotfix:** Product, Architecture, Regional Managers and their generated locales.
2. **Profit-recovery proof release:** refresh Recovery visuals/copy with Loop Health, evidence health, reconciliation, Value and measuring timing.
3. **Metadata and conversion release:** C-suite, Why Sundae, Demo and umbrella “food-service” terminology.
4. **Narrative consolidation:** Crew, Integrations, About and Resources.
5. **Full 22-locale QA:** automated completeness plus manual Arabic, French and Spanish review across desktop and mobile.

## Messaging rule for future pages

Lead with the operator outcome, then the governed loop, then the proof. AI is the enabling infrastructure, not the headline:

> Sundae finds where profit is leaking, gives the fix to one accountable owner, measures what came back, and shows whether the evidence and recovery claim can be trusted.
