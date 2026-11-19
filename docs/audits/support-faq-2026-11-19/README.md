# FAQ refinement, 19 November 2026

Application commit: `eed6ed8a7ae8456c597a83ddbbdaaa00a9a6c814`.
Base: post-PR266 main, `f6edb98dbeacc8e5462bc2eb66eba64dc6020b2a`.
Local production receiver: http://localhost:3155/faq.

## What changed

The FAQ now follows the accepted support-page identity: espresso and cream, Fraunces headings, caramel emphasis, quiet dividers and one primary closing walkthrough. Real category links preserve the existing fragments and order. The desktop index stays alongside the questions; mobile presents a compact, wrapping topic index. The hero keeps the explicit FAQ title rather than introducing another slogan.

The interaction uses the existing support reveal with visible server styles and a scoped editorial Accordion variant. Question buttons have associated answer IDs, visible focus, at least 44px targets, logical alignment and inert closed answers. Native anchors have a header offset; the FAQ disables smooth scrolling for reduced-motion preferences. The existing default Accordion rendering remains unchanged.

The finite answer correction covers source requirements, POS availability, mixed POS, rollout, support, training, comparisons, the first useful module, Crew and complex deployment. Crew describes People Intelligence as well as daily operations, workforce and payroll; its capability answer reuses the exact four canonical coverage paragraphs. Payroll remains inside Crew. Crew pricing links open the current simulator in the visitor’s language without a preset selection. The 4D answer now explains PAST / PLAN / PEERS / PREDICTED using the accepted support-system copy and existing eligibility paragraphs.

All 53 rendered questions and the existing first-two-per-category selection of 26 FAQ JSON-LD entries are preserved. Visible answers and schema continue to share the same getter. The opening and normal/social descriptions use the same localized copy across all 22 languages. Category continuations lead to real localized routes with existing campaign and CTA tracking; the closing sample-data note sits directly beneath the primary walkthrough action.

## Commercial authority

`data/catalogue-authority.json` is the read-only public catalogue response from https://pricing.sundae.io/api/pricing/catalog/active, fetched 19 November 2026. Its raw SHA-256 is `30d7d3ef6296646b989398d5e4c1fd9441a487db759d899f9d967351b1fb422f`. It reports active authoritative version `v1.8.2-policy-20261009` and four standard Core tiers: Foundation, Margin, Growth and Performance. Complex deployment answers discuss requirements and written scope rather than promising a fifth standard feature bundle. No catalogue or calculator data is changed.

## Verification

- Focused ESLint and `git diff --check`: pass.
- Required production build, including i18n, translation, diagnostic and positioning prebuild checks, runtime tests, production trace and deployed-runtime audit: pass. Runtime audit reports no advisories.
- Existing SEO suite: 222 tests passed.
- Actual production browser across all 22 locales: 53 UI questions and 26 schema entries per locale; 374 expanded changed-answer readbacks; 572 selected schema comparisons; matching opening/normal/Open Graph/Twitter descriptions; correct canonicals and 23 language alternates; localized continuation and simulator links. See `data/runtime-locales.json`.
- Author browser: English at 1440px and 390px in light and dark themes. Keyboard category jump lands below the header; Space opens and closes answers; closed panels become inert; category and question controls meet 44px height; reduced-motion anchors use auto scrolling; no document overflow. See `data/visual-en.json` and the contact sheet in `evidence/`.
- Independent SEO/GEO reviewer accepted five further cases: EN1440 dark and light, NL320 light, DE320 light, AR390 dark. It checked 105 expanded answers (53 EN, 26 NL, 26 AR), metadata/schema and links, visible keyboard focus, the actual localized walkthrough destination and six settled screenshots. No further copy or design changes were requested. The reviewer verified all six committed application files match the accepted receiver by SHA-256. Independent receipts and representative images are preserved beside the author evidence. The source author does not self-publish this cut.

Local-only Vercel analytics script 404/MIME messages occur because the hosted analytics endpoint is absent on the local server. They do not affect the FAQ. This change does not rewrite the existing JavaScript-dependent streaming page shell or claim full no-JavaScript support. Unchanged answers outside the agreed correction set retain their existing scope.

## Design intent

Visual thesis: a calm, premium reference page in the established Sundae support identity.
Content plan: explicit FAQ opening, category navigation, focused answers with relevant continuations, then one walkthrough close.
Interaction thesis: restrained support reveals, quick expand/collapse, and clear category navigation with reduced-motion support.
