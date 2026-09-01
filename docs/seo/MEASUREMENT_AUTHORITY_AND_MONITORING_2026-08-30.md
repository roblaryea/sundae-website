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
| `lead_form_validation_failed` | Demo/contact form failed local validation | `cta_label`, `source_page`, `invalid_fields` | Friction |
| `lead_form_submitted` | Lead form accepted by the website API | `cta_label`, `source_page`, UTM fields where present | Primary conversion |
| `lead_form_submission_failed` | Lead form API submission failed | `cta_label`, `source_page` | Reliability |
| `diagnostic_started` | Operations diagnostic started | `locale`, resume state | Diagnostic entry |
| `diagnostic_step` | Diagnostic progressed | `locale`, step, total, dimension | Funnel depth |
| `diagnostic_lead_captured` | Diagnostic contact step completed | Non-PII funnel properties only | Lead conversion |
| `diagnostic_submitted` | Diagnostic answers submitted | Non-PII diagnostic properties | Core conversion |
| `diagnostic_report_shown` | Report rendered | `locale`, source, tier fit | Value reached |
| `diagnostic_cta_click` | Post-report CTA selected | CTA name and non-PII context | Sales intent |

No email address, phone number, personal name, company name, free-text message, or raw diagnostic answer should be sent to PostHog.

## Required PostHog insights

1. Website acquisition funnel: `$pageview` -> `cta_click` -> `lead_form_submitted`.
2. Diagnostic funnel: `diagnostic_started` -> `diagnostic_lead_captured` -> `diagnostic_submitted` -> `diagnostic_report_shown` -> `diagnostic_cta_click`.
3. Landing-page conversion table by entry URL and UTM campaign.
4. CTA performance by `event_label` and source page.
5. Form friction by invalid field and submission-failure rate.
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
