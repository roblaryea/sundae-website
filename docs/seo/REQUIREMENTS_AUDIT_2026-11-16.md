# Requirements audit — 16 November 2026

This extends the earlier completion matrix. Technical availability is not messaging signoff or evidence of qualified demand.

## Verified and corrected

- Full production sitemap: all 1,539 URLs returned 200. Every page had a title, description, canonical, correct supported language and parseable JSON-LD; none exposed a detected noindex directive. Root slash/empty-path equivalents were normalized. Arabic direction was checked. This is an HTTP/rendered-HTML audit, not a browser interaction test of every page.
- Campaign continuity: ordinary navigation previously lost landing-page UTMs before demo/diagnostic submission. A consented, tab-scoped last campaign now survives internal navigation. A new campaign replaces prior fields. Only five bounded campaign fields are retained; booking credentials, contact query fields and external-domain forwarding are excluded. Declined/pending consent clears campaign storage. Storage failures do not break navigation or forms.
- Pricing authority: the public active database catalogue, not backend fallback configuration or the website's old v1.7 file, is authoritative. Verified `v1.8.2-policy-20261009`, published 9 October. Website rates and package IDs are now derived from a minimal reviewed snapshot. `npm run pricing:check` compares it with the live public catalogue and fails on drift; it does not silently change commercial policy.
- Commercial accuracy: Core packages have different included module sets. Crew and concepts have first-location prices plus additional-location bands. Performance already includes Foresight, which must not be charged twice. Discounts depend on commitment **and payment schedule**; implementation and tax exclusions remain explicit. The live pricing calculator remains the estimate authority. `/pricing` already redirects to that calculator; correcting its retained page source prevents stale future reuse.
- Supporting content: FAQ/module/getting-started/Crew teasers use shared reviewed commercial copy in all 22 locales, replacing blanket all-module, flat-Crew and no-setup-fee assertions where rendered. Unsupported module-page typical ROI badges are removed. Payroll FAQ now reflects approved native gross-to-net calculation across 36+ ISO countries, with country/provider-dependent filing/payment handoffs.
- Diagnostic grounding: the model cannot add package entitlements in a correctly named stack row. Product identity, stack eligibility and scope-sensitive descriptions come from deterministic data. Localized scope notes remain localized. Findings/actions keep their tailored narrative. List estimates distinguish implementation, taxes, discounts and extensions; they are not quotes or savings claims.

Evidence is retained in ignored `output/seo/`, including full sitemap results, supplementary internal-link checks, test/build logs and screenshots. Prior authorized live email tests remain the only accepted QA leads; no additional leads were created in this audit.

## Communication acceptance — explicit open work

The independent positioning review confirmed that the current first-screen category, hero and direct workflow navigation improved. The following remain open until implemented and reviewed in the browser:

| Requirement | Disposition | Acceptance evidence needed |
| --- | --- | --- |
| Show practical work and Core/Crew early | In progress | Home heading scan explains operating work before repeated intelligence/recovery exposition; keep existing premium visual language. |
| Positive Restaurant365 shortlist case | In progress | Explain when Sundae fits, R365's native accounting strength, retained POS/accounting boundaries and scoped cost evaluation; link current sources and product proof. No unverified better/cheaper claim. |
| Walkthrough promise continuity | In progress | Workflow → demo offers a product walkthrough without a data prerequisite; diagnostic stays optional and workflow context reaches the request. |
| Product visual evidence | Needs source verification | Reuse existing verified native screens only for the workflows they actually show. Do not call a scheduling screenshot a logbook or tasks screen. Label illustrative examples. |
| Secondary jargon/claims | In progress | Remove universal integration, guaranteed day-one recovery and unsupported price-advantage language. Preserve approved payroll calculation capability. |
| Historical guidance | In progress | Mark August recovery-first messaging recommendations superseded by the November operations-first direction. Preserve factual evidence/history. |

## Monitoring and external dependencies

Keep the existing Monday checkpoint (23 November) and complete post-release fortnight comparison at/after 30 November. Include pricing parity in every website audit. Search indexing, third-party profile consistency, approved operator proof and authentic enquiries are continuing outcomes, not implementation checkboxes. Existing content/LinkedIn and Prospect Intelligence ownership remains separate.
