# Website alignment and visibility review — 16 November 2026

## Implemented scope

- Complete body, metadata, FAQ, CTA, comparison and related-link dictionaries for the four restaurant workflow pages and the Restaurant365 evaluation page, across 22 website languages.
- Shared FAQ schema resolves from the same copy as the visible answers. Locale links retain the visitor's language. Right-to-left spacing follows logical start/end properties.
- Main category: operations management for hospitality and food-service groups. Crew runs workforce and daily execution; Core connects operating data, evidence, decisions and measured outcomes. AI remains a capability inside the platform.
- Homepage category copy, platform introduction, Core description, Crew introduction, footer description and global software/organization definitions align with that hierarchy. Restaurant wording remains on intent-specific entry pages.
- Homepage, platform, Core and Crew expose a restrained editorial workflow index. Footer task, logbook and tip links provide discovery from other pages.
- Long translated actions wrap on mobile. Comparison criteria use stacked rows on phones and a table on larger screens. The existing typography, warm cream sections and restrained motion are preserved.
- CTA instrumentation uses semantic anchors for the new workflow pages. The shared Button also records labeled native-button actions, correcting missed Crew and solution clicks. Consent and the existing non-PII event contract are unchanged.
- The homepage illustrative recovery amount is explicitly labeled as an example, not a customer result, in every language.

## Validation and release gates

- SEO tests cover all 22 locale shapes, localized headings, metadata, FAQs, functional link labels and comparison sources.
- CTA regression tests execute both link and native-button handlers and verify one labeled event plus preservation of the existing click handler.
- Browser smoke covers all 110 workflow/comparison locale routes: HTTP status, body heading, title, canonical, language/direction, matching FAQ schema, semantic actions, mobile action text overflow and browser errors.
- Visual review covers English desktop, French mobile comparison, Arabic mobile, the main homepage and Crew workflow index. Reduced-motion behavior is included.
- Main-route probes distinguish real public routes from test-only guessed routes. The legacy link checker flags dynamic article routes as missing even though they return 200, and guesses `/help`, `/status`, `/changelog`; those are not published links. `/404` correctly returns 404.
- Required hosted checks must pass before merge. Run the same browser smoke on production after deployment settles, then check production sitemap health and IndexNow notification.

## Measurement status

Fresh complete 7-day, 28-day and 14-day account comparisons are now recorded in [Search Console review](SEARCH_CONSOLE_REVIEW_2026-11-16.md) and [corrected PostHog baseline](POSTHOG_MARKETING_BASELINE_2026-11-16.md). Search Console ends 14 November; the analytics baseline ends 15 November UTC. Signed-in account access was exercised directly; these are refreshed readings, not ambient-tab assumptions.

Use complete periods when access is restored: Search Console's most recent finalized date should determine its comparison boundaries; exclude the current partial day from analytics comparisons. Record both exact dates and selected filters. Separate branded from non-branded queries and qualified completions from consented visitors, crawler-heavy traffic or CTA clicks. Existing historical baselines remain historical, not new weekly measurements.

The CTA correction changes measurement coverage. Annotate the deployment date before comparing pre/post click rates; an increase in recorded events alone does not prove increased visitor intent. Validate ingestion and event properties in PostHog separately from the offline handler tests.

## Content and distribution handoff

The existing content/LinkedIn owner retains publishing ownership. This website slice does not change their worktree or send posts.

- Lead with a practical operator problem: missed opening tasks, handover context, payroll-review exceptions, staffing or attendance.
- Use the wider hospitality and food-service category in the company description; restaurant language can identify the specific search problem.
- Give one concrete workflow example: issue, accountable owner, next action, completion and measurement.
- Link each item to one canonical workflow or product page in the audience's language. Keep campaign/source labels consistent for attribution.
- Support any outcome claim with a traceable source and clear scope. Do not present illustrative figures as customer results, copy competitor wording or assert that Restaurant365 is unavailable in a region without evidence.
- Prefer a cited operator evidence article or documented workflow example over more overlapping category pages. New material should support an existing intent page rather than compete with it.

## Verified follow-through

1. Search Console performance, indexing, sitemap and Core Web Vitals were refreshed; the 7/14/28-day comparisons, visible-query limitations and positions 4–20 opportunities are recorded. CSV export was blocked, so complete visible tables and dated report snapshots provide the evidence.
2. All six PostHog insights use production marketing scope and exclude tagged internal QA. Actual form acceptance, diagnostic generation, acknowledged lead delivery and recipient-email receipt were verified through the two authorised tests.
3. PR 213 clarified the visible first-screen hierarchy and direct workflow navigation; PR 214 repaired localized retired aliases; PR 215 removed unsupported diagnostic outcome claims and added acknowledged-delivery tracking. See [completion matrix](COMPLETION_MATRIX_2026-11-16.md) for production validation and the next checkpoint. Qualified distribution, Google recrawling and post-release commercial response remain operational follow-through.
