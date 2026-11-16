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
| Show practical work and Core/Crew early | Implemented in PR 218; production verification pending | Home heading scan explains operating work before repeated intelligence/recovery exposition; keep existing premium visual language. |
| Positive Restaurant365 shortlist case | Implemented in PR 218; production verification pending | Explain when Sundae fits, R365's native accounting strength, retained POS/accounting boundaries and scoped cost evaluation; link current sources and product proof. No unverified better/cheaper claim. |
| Walkthrough promise continuity | Implemented in PR 218; production verification pending | Workflow → demo offers a product walkthrough without a data prerequisite; diagnostic stays optional and workflow context reaches the request. |
| Product visual evidence | Needs source verification | Reuse existing verified native screens only for the workflows they actually show. Do not call a scheduling screenshot a logbook or tasks screen. Label illustrative examples. |
| Secondary jargon/claims | Implemented in PR 218; production verification pending | Remove universal integration, guaranteed day-one recovery and unsupported price-advantage language. Preserve approved payroll calculation capability. |
| Historical guidance | Implemented in PR 218 | Mark August recovery-first messaging recommendations superseded by the November operations-first direction. Preserve factual evidence/history. |

## Monitoring and external dependencies

Keep the existing Monday checkpoint (23 November) and complete post-release fortnight comparison at/after 30 November. Include pricing parity in every website audit. Search indexing, third-party profile consistency, approved operator proof and authentic enquiries are continuing outcomes, not implementation checkboxes. Existing content/LinkedIn and Prospect Intelligence ownership remains separate.

## Communication follow-through implemented in this branch

- Home: retained the approved hero. The existing premium Core/Crew section and practical workflow links now follow the live product introduction, ahead of recovery exposition. Removed the redundant manifesto/timeline and the unsubstantiated speed/cost tradeoff section from Home; retained deeper intelligence and decision evidence afterward. Replaced the universal-integration/statistical teaser with product-role labels.
- Walkthrough: `/demo` now leads with the localized walkthrough offer and an explicit sample-data option. The request form comes before the optional self-guided diagnostic. Workflow CTAs preserve a bounded workflow identifier so the default request refers to the relevant operating problem; arbitrary query text is not copied into a lead. The existing pricing intent remains supported.
- Restaurant365: added a positive shortlist rationale for operations/workforce plus connected performance while retaining suitable POS/accounting systems. The guide states Restaurant365's native accounting/GL/AP scope and Sundae's ledger boundary. It links practical Sundae workflows, both providers' current pricing paths, and a like-for-like cost checklist. Primary sources reviewed 16 November: https://www.restaurant365.com/pricing/ and https://www.restaurant365.com/accounting/ . No price-superiority or regional-exclusivity claim was inferred.
- Crew: payroll wording restores approved gross-to-net capability and country/provider boundaries. Main product headings use operator language; internal protocol acronyms are removed from the key capability descriptions. Architecture pages may retain necessary technical detail.
- Internal discovery: current navigation/resource links now point directly to canonical product pages; permanent legacy redirects remain for existing external links.
- Process: August recovery-first guidance is explicitly historical. Current commercial authority is recorded in the claims bank. The existing Search Discovery workflow checks catalogue parity each Monday and after main deployments; no duplicate cadence was created.

### Product proof boundary

The existing screenshot manifest was checked. `crew-scheduling.png` is a June capture showing an empty outlet selector and read-only state; it is unsuitable as proof of a working scheduling flow and must not be reused as task/logbook proof. A fresh, populated, permission-safe native capture for tasks/logbook/tips remains an evidence dependency. Existing illustrative product views remain illustrations. This does not block the corrected website journeys, but it prevents signing off a claim that every practical workflow now has native screenshot proof.

## Release and verification ledger

- PR [217](https://github.com/roblaryea/sundae-website/pull/217), merged 16:15:32 UTC: campaign continuity and authoritative commercial scope. All hosted checks passed. Production Search Discovery run `43905495983` passed.
- PR [218](https://github.com/roblaryea/sundae-website/pull/218), merged 16:34:38 UTC: visitor story, direct walkthrough, positive comparison fit, canonical navigation and historical guidance. All hosted checks passed.
- Local browser acceptance: **88 main-page journeys** (Home, platform, Core, Crew × 22 locales); **110 workflow/comparison pages**; **22 walkthrough journeys** with localized context, direct form, title/canonical, RTL, mobile width and no page errors. No form was submitted. Full lint had zero errors; 54 SEO tests, 17 diagnostic tests, type checks and build passed. Local-only Vercel analytics-script 404s were not misreported as production app errors.
- The existing Monday automation now reads this audit and checks pricing parity, retained campaign context and communication acceptance. The next checkpoint remains 23 November; no duplicate schedule was added.
- Robert designated **systems@sundae.io, organisation 33, dev.sundaetech.ai** for fresh product proof. The supplied `dev.sundatech.ai` spelling did not resolve; the established Sundae domain does. Current controllable Chrome opens at sign-in and browser interaction is disconnected. The tab is retained for the user to restore the signed-in organisation 33 session. No credentials, private employee data or empty screens were published as product proof.
