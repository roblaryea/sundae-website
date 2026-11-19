# Sundae SEO, GEO, and Conversion Measurement

Date: 30 August 2026  
Owner: Website / SEO / GEO session

## Measurement stack

- Vercel Analytics: privacy-friendly traffic and Web Vitals overview.
- PostHog: consented page views, product-marketing interactions, and conversion funnels.
- Google Search Console: Google queries, pages, countries, devices, indexation, and sitemap status.
- Bing Webmaster Tools: Bing indexation and search performance; import the verified Search Console property where available.
- Manual GEO citation review: answer-system visibility and source selection.

Google Analytics is not required while Vercel Analytics and PostHog cover the agreed measurement jobs. Adding it without a distinct purpose would duplicate scripts, consent handling, and reporting.

## PostHog event contract

| Event | Meaning | Required properties | Conversion role |
| --- | --- | --- | --- |
| `$pageview` | Consented website page view | `$current_url` | Funnel entry |
| `cta_click` | Tracked navigation or CTA interaction | `event_label`, `destination`, page/location where supplied | Intent signal |
| `lead_form_started` | Visitor focused a real lead-form field for the first time | `cta_label`, `source_page` | Form engagement |
| `lead_form_submit_attempted` | Visitor pressed submit, before validation | `cta_label`, `source_page` | Submission intent |
| `lead_form_validation_failed` | Demo/contact form failed local validation | `cta_label`, `source_page`, `invalid_fields` | Friction |
| `lead_form_submitted` | Lead form accepted by the website API | `cta_label`, `source_page`, UTM fields where present | Primary conversion |
| `lead_form_submission_failed` | Lead form API submission failed | `cta_label`, `source_page` | Reliability |
| `diagnostic_started` | Operations diagnostic started | `locale`, resume state | Diagnostic entry |
| `diagnostic_step` | Diagnostic progressed | `locale`, step, total, dimension | Funnel depth |
| `diagnostic_lead_captured` | Diagnostic contact step completed | Non-PII funnel properties only | Contact step |
| `diagnostic_submitted` | Diagnostic answers submitted | Non-PII diagnostic properties | Core conversion |
| `diagnostic_report_shown` | Report rendered | `locale`, source, tier fit | Value reached |
| `diagnostic_lead_delivered` | Diagnostic outbox request acknowledged by the website API | `locale` | Accepted delivery proxy; not automatically sales-qualified |
| `diagnostic_cta_click` | Post-report CTA selected | CTA name and non-PII context | Sales intent |

No email address, phone number, personal name, company name, free-text message, or raw diagnostic answer should be sent to PostHog.

## Required PostHog insights

1. Website acquisition funnel: `$pageview` -> `cta_click` -> `lead_form_submitted`.
2. Diagnostic funnel: `diagnostic_started` -> `diagnostic_lead_captured` -> `diagnostic_submitted` -> `diagnostic_report_shown` -> `diagnostic_cta_click`.
3. Landing-page conversion table by entry URL and UTM campaign.
4. CTA performance by `event_label` and source page.
5. Form engagement and friction: started -> submit attempted -> submitted, plus invalid field and submission-failure rate.
6. Weekly unique visitors and qualified conversions, separated from total traffic.

## Search Console baseline

Capture the following after property verification and sitemap submission:

- total clicks and impressions for the previous 28 and 90 days;
- branded vs non-branded query groups;
- pages with impressions but low click-through rate;
- queries ranking in positions 4-20;
- indexed, excluded, crawled-not-indexed, and discovered-not-indexed URLs;
- Core Web Vitals status;
- sitemap discovered and indexed URL counts;
- country and device mix.

Do not set arbitrary ranking promises. The first verified export is the baseline.

## Initial baseline status — 31 August 2026

### Google Search Console

- Property: `https://www.sundae.io/` (verified).
- Sitemap: submitted and accepted; Google discovered 1,445 URLs.
- Performance report: still processing, with no query, page, click, or impression data available yet. Search Console reported its latest update approximately 6.5 hours before the check.
- Indexing and Core Web Vitals reports: still awaiting Google's first processing cycle.
- Baseline start date: 30 August 2026. Do not interpret the temporary zero-data state as zero organic visibility.

### PostHog

- Project: US Cloud project `332239`.
- Dashboard: [Sundae Website — SEO, GEO & Conversion](https://us.posthog.com/project/332239/dashboard/2048486).
- Website acquisition funnel, last 30 days: 62 unique `$pageview` entrants; 0 tracked `cta_click` or `lead_form_submitted` completions. The conversion events were newly deployed and had not accumulated yet.
- Diagnostic funnel, last 30 days: 1 `diagnostic_started`; 0 later-step completions.
- Current partial week: 155 total pageviews and 4 unique visitors; 0 lead-form or diagnostic lead conversions. Treat this partial week as directional only.
- CTA, form-friction, and landing-page conversion views currently have no post-deployment results. This is the expected initial state, not an instrumentation failure.

The dashboard contains all six required views:

1. Website acquisition funnel (`vRxuh8xi`).
2. Diagnostic funnel (`ZWfaXw3V`).
3. Landing-page conversion by entry URL and UTM campaign (`w5uzsSVL`).
4. CTA performance by label and source page (`Y22Viw1K`).
5. Form friction by invalid field and submission-failure rate (`T4a1P5bV`).
6. Weekly unique visitors and qualified conversions versus total traffic (`adZkZYzH`).

The first decision-grade comparison should be made after at least 14 complete days of post-deployment event collection. Search Console should be checked again once Google replaces the processing message with performance data.

## Follow-up baseline — 26 September 2026

This is the first decision-grade follow-up after the 30 August launch baseline. Search Console data was available through approximately 24 September; PostHog and Vercel Analytics were read on 26 September.

### Google Search Console

- Overall search performance: 54 clicks, 1.5K impressions, 3.6% click-through rate, and average position 10.4.
- The Search Console AI visibility report showed 192 generative-AI impressions across 45 pages. The leading pages were the homepage (81), careers (30), about (21), sign-in (12), and Watchtower (11).
- The submitted sitemap still contained 1,445 URLs. Of submitted URLs, 718 were indexed and 727 were not indexed: 370 discovered-not-indexed, 354 crawled-not-indexed, two duplicate URLs where Google selected another canonical, and one alternate page with a proper canonical.
- The excluded inventory was dominated by localized URLs. Representative Arabic, Spanish, Vietnamese, Japanese, Korean, Dutch, Polish, and French pages were present in the report. This is a crawl/indexing backlog across the 22-locale launch inventory, not evidence that priority English commercial pages are broadly broken.
- Live inspection confirmed that `/product/recovery`, `/diagnostic`, `/faq`, `/core`, `/getting-started`, and `/solutions/multi-location-groups` were indexed. All reported valid HTTPS and breadcrumb enhancement status.
- `/tools/labor-cost` was the one priority exception. Google's stored crawl from 29 May still declared `https://sundaetech.ai/tools/labor-cost` as canonical. Production now correctly declares `https://www.sundae.io/tools/labor-cost`; a fresh indexing request was accepted into Google's priority crawl queue on 26 September. Do not add another canonical change unless the new crawl still reports the old host.
- Representative localized pages (`/ar/about`, `/es/contact`, `/vi/tools/benchmark-readiness`, and `/ja/faq`) returned translated titles and H1s, self-referencing canonicals, and 39-42 internal links each. These samples do not support a thin-shell or missing-internal-link diagnosis.
- Commercial non-branded discovery has started but is still shallow. Early query themes include multi-location restaurant analytics, restaurant GDPR compliance, food-cost benchmarking, restaurant intelligence, restaurant data platforms, cloud-kitchen software, and restaurant efficiency tools. `restaurant profit recovery software` had not yet appeared as a query.

Interpretation: preserve the existing locale sitemap while Google completes the early crawl cycle. Monitor the submitted-only exclusion cohorts by locale and page type; prioritize content or sitemap changes only if the same cohorts remain stalled after another complete reporting cycle or live inspection exposes a current technical defect.

### PostHog and Vercel Analytics

- PostHog's acquisition funnel recorded 66 unique pageview entrants, two people reaching `cta_click` (3.03%), and no `lead_form_submitted` event. Median pageview-to-CTA time was 33m 32s.
- The diagnostic funnel, landing-page conversion view, and form-friction view had no matching completion or failure events.
- CTA results included one `book_demo_navbar` click from `/` and one from `/demo`. Older CTA rows without `source_page` remain visible, but the deployed centralized tracker currently adds `window.location.pathname`; do not patch this without a new event proving the property is still absent.
- Across the 90-day weekly trend, pageviews ranged from 255 to 1,390 while consented unique visitors ranged from 7 to 27; lead and diagnostic captures were zero throughout.
- Vercel Analytics reported 254 visitors and 454 pageviews for the latest seven-day view, with a 33% bounce rate. Google referred 27 visits, Bing three, ChatGPT three, and Yandex three.
- `/privacy` and `/terms` each showed approximately 148 Vercel visitors. Combined with the much smaller consented PostHog audience, this indicates material crawler or automated traffic. Vercel headline traffic and consent-gated PostHog people are not interchangeable measures.

Interpretation: the current evidence is consistent with low human volume and zero captured leads, not a demonstrated form-instrumentation failure. CTA and form events are consent-gated; the successful lead event fires only after the lead API returns success and contains no PII. Continue to use qualified completions, Search Console clicks, and per-page CTA movement as the decision metrics rather than raw Vercel visits.

### Search-discovery automation — 26 September 2026

- The production site publishes a public IndexNow verification key and submits the canonical priority route set after each merge to `main`, following a production-alias settling period.
- A scheduled GitHub workflow audits the live sitemap every Monday. It fails on duplicate, off-host, non-HTTPS, missing-priority, or incomplete-locale inventory.
- `npm run seo:sitemap-report` provides an on-demand locale and content-type inventory. `npm run seo:indexnow -- --dry-run` previews the URL submission without contacting IndexNow; `--all` is reserved for an intentional full-sitemap notification.
- The first authority article, `/blog/restaurant-benchmarking-methodology`, documents metric contracts, peer cohorts, normalization, privacy, confidence, and decision use. It is listed in `llms.txt` and links directly to the benchmarking product and benchmark-readiness tool.
- A monthly local heartbeat reviews Search Console, PostHog, Vercel Analytics, Core Web Vitals, priority canonical status, GEO citations, and crawler anomalies against this baseline. It stays quiet unless there is a meaningful change or required action.
- Bing Webmaster Tools account import remains an owner-authenticated portal step. Once imported, set `NEXT_PUBLIC_BING_SITE_VERIFICATION` only if Bing supplies a meta-verification token; the root metadata already supports it.

## Commercial outcome hierarchy

1. Qualified demo or working-session request.
2. Completed diagnostic with report shown.
3. High-intent CTA click from a product, solution, tool, or evidence page.
4. Return visit to a commercial page.
5. Non-branded organic impression and click.
6. AI answer mention or citation from a relevant operator question.

Traffic without one of these downstream signals is not the primary success measure.

## Authority programme

The website session owns canonical pages and evidence. The LinkedIn session owns distribution. The Prospect Intelligence session supplies anonymized market-language patterns, not automatic outreach.

Monthly authority actions:

- publish one cited operator evidence article;
- publish or materially improve one high-intent answer page;
- secure relevant company-profile consistency across LinkedIn, X, YouTube, software directories, partner pages, and industry listings;
- request links only where Sundae provides genuine source value, a tool, research, integration documentation, or a useful operator explanation;
- turn accepted podcasts, interviews, webinars, partner announcements, and event appearances into linked website evidence;
- avoid bulk directory submissions, paid link schemes, and unreviewed AI-generated guest posts.

## Reporting cadence

Weekly:

- production errors and form failures;
- organic landing pages and conversions;
- diagnostic and demo funnels;
- newly indexed or excluded priority URLs.

Monthly:

- Search Console query and page movements;
- non-branded qualified traffic;
- backlinks and referring domains that send relevant visitors;
- GEO question-set results and citations;
- content refresh and internal-link opportunities;
- conversion rate by intent cluster.

Quarterly:

- category-message consistency across the website and official profiles;
- content consolidation and pruning;
- structured-data validation;
- competitor and answer-system visibility review;
- roadmap re-prioritization based on qualified demand rather than raw traffic.

## Release acceptance criteria

- production canonical host is consistently `https://www.sundae.io`;
- `/product/recovery`, `/diagnostic`, `/faq`, `/core`, `/getting-started`, and all public tools are in the sitemap;
- untranslated article shells are excluded from the sitemap and use `noindex, follow`;
- Organization, WebSite, SoftwareApplication, Breadcrumb, Article, and FAQ schema render only where applicable;
- `llms.txt`, `robots.txt`, and `sitemap.xml` return HTTP 200;
- CTA and lead events fire only after consent and contain no PII;
- priority pages have distinct titles, descriptions, H1s, and one clear conversion path;
- Search Console property is verified and the production sitemap is submitted;
- the first Search Console and PostHog baselines are recorded.

## Corrected marketing baseline — 16 November 2026

The authenticated PostHog review found that the SEO dashboard included application/development traffic and public digital-card actions. Its six insights and dashboard filters now use production marketing paths only. This supersedes earlier mixed-project headline counts for future marketing comparisons; raw event history remains intact.

For 19 October–15 November 2026 (complete UTC days), the marketing site recorded 52 pageviews, 29 consented unique visitors, three CTA users and no accepted lead forms. The preceding 28 days recorded 74 pageviews, 29 visitors, two CTA users and no accepted lead forms. The most recent complete week recorded six visitors and no marketing CTA users. The first consistently scoped 14-day comparison is also recorded.

Full dates, 7/14/28-day comparisons, scope definitions, source limitations, dashboard corrections and follow-up work are in [PostHog marketing baseline — 16 November](POSTHOG_MARKETING_BASELINE_2026-11-16.md). Treat this as the current marketing baseline. The November 16 native-button tracking correction affects later CTA comparisons. Accepted forms and diagnostic contact steps are event proxies, not automatically qualified leads. Fresh Search Console verification remains separate and pending.

At 12:59 UTC on 16 November, the owner's normal-browser empty-form test on `/demo` delivered one form-start, one submit-attempt and one validation-failure event to production PostHog, with no accepted-form event recorded. Dashboard annotation `590814` identifies this as QA rather than customer demand; annotations do not exclude events automatically. See the baseline's controlled-verification section for timestamps and reporting treatment. Successful accepted-form delivery and the diagnostic funnel remain unverified; engagement/validation event delivery is now confirmed.

## Verified closeout — 16 November 2026

The later owner-authorised demo and diagnostic tests closed those live-delivery gaps: accepted events, the diagnostic acknowledgment and both recipient emails were verified. See [completion matrix](COMPLETION_MATRIX_2026-11-16.md) for exact times, release links, QA exclusions, production checks and remaining operational dependencies. Earlier pending statements describe the state at that earlier check, not the current state.

Fresh Google evidence is in [Search Console review](SEARCH_CONSOLE_REVIEW_2026-11-16.md), including complete 7/14/28-day comparisons ending 14 November, the 40 localized alias repairs, accepted sitemap/crawl requests and Google's resolved labor-calculator canonical. Keep these dates distinct from the PostHog baseline's complete UTC days through 15 November. Review the next weekly checkpoint on 23 November and a complete post-release fortnight at or after 30 November. The existing Monday automation remains active and reads both records.

## 18 November refinement measurement record

The release and validation authority remains `COMPLETION_MATRIX_2026-11-16.md`. Website PR245/main 25fcaa7 and PR246/main cf9b2a7 and pricing PR62/main 140def244 are published; finite public cross-site theme, locale and quote-return checks passed.

Use complete pre-release UTC periods: 11–17 November has 6 acquisition entrants / 0 CTA people / 0 accepted forms; 21 October–17 November has 27/3/0. These six saved event-contract insights are working definitions, not governed business measures or automatic sales qualification. Preserve production-host, private-booking, consent and QA boundaries. All six include `/results`; dashboard scope also includes the existing daypart tool. The exact internal `public_theme_retakes` campaign is excluded alongside `internal_qa`, retaining raw events.

Dashboard 2048486 in project 332239 retains its six insights and annotations 598545, 598559 and 598606. No new dashboard, subscription or scheduler was introduced. The consented public campaign handoff to canonical HTTPS pricing preserves quote/locale parameters and explicit target tags. Absence of earlier URL tags alone does not establish historical first-touch loss.

The existing Monday checkpoint is 23 November. Assess health and discovery then; it is an early checkpoint. Complete post-18 November UTC windows start 19 November: seven days through 25 November, fourteen through 2 December and 28 through 16 December. Corresponding scheduled decision reviews are 30 November, 7 December and 21 December, using finalized Search Console dates and complete analytics days. Keep the earlier 16 November release comparison separate.

Activation belongs to the existing content owner and approval process. The restart packet uses practical operator questions, native demo proof, one canonical tagged workflow destination and clear claim limits. Measure tagged workflow visits, useful CTA progression and accepted enquiries, then establish operator relevance separately. Repeated low traffic without meaningful distribution is not evidence that the form needs redesign.


## 19 November support-release measurement receipt

PR264–267 completed the Getting Started, Docs, Architecture, Integrations, 4D and FAQ refinements. In existing PostHog project `332239`, dashboard `2048486` retains its six saved insights. The read-only 19 November review confirmed all six include the six support routes and retain the `internal_qa` and `public_theme_retakes` exclusions. Release annotation `602780` records this support release at **19 November 2026 13:43:59 UTC**; its readback count is one. No new insight, query, dashboard or schedule was introduced.

Keep this release cohort separate from the 18 November refinement cohort and earlier baselines. Complete post-19 November UTC periods begin 20 November: seven days through 26 November, fourteen through 3 December and 28 through 17 December. Use finalized Search Console dates and the existing review cadence; an early checkpoint is not a complete post-release result. This receipt records release and measurement scope, not a business-uplift claim. Historical pending statements remain evidence of their earlier check.
