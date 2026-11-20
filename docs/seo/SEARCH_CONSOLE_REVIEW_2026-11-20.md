# Google access and search-discovery follow-through — 20 November 2026

## Verified account and property

The owner asked this chat to complete the ownership setup shown in the in-app browser, rather than delegate it back. Google identified the signed-in business account as `marketing@sundaetech.ai` and requested `google230704367ecac88b.html` for the existing `https://www.sundae.io/` property.

[PR277](https://github.com/roblaryea/sundae-website/pull/277) added only that standard public verification response. Its eight hosted checks passed, independent review accepted the exact source, and main `a2f7b8c19aa20236a183008871e56a4b9b58f240` deployed successfully (deployment `7932632049`). Both this file and the earlier `google0067bd7a92342860.html` returned HTTP 200 with their exact expected bodies. The earlier owner's file remains intact.

The actual signed-in Google portal subsequently displayed **Ownership auto verified**, method **HTML file**. Opening **Go to property** displayed the existing Overview and historical reports. This closes the account-access and ownership-verification gap; it is not merely a successful public-file check. No password, ownership transfer, DNS change or duplicate Search Console property was required. Keep both files in future releases.

## Google indexing readback and actions

| Page | Observed Google state | Canonical / crawl evidence | Action completed |
| --- | --- | --- | --- |
| `/restaurant-management-platform` | **URL is on Google; Page is indexed** | User-declared canonical is the same public URL; Google-selected canonical is **Inspected URL**. Last stored crawl: 16 November 2026, 5:42:31 PM as displayed by Google, smartphone crawler. Fetch successful; crawling and indexing allowed. | Requested a refresh because the stored crawl predates the later refinements. Google confirmed **Indexing requested** and addition to the priority crawl queue. |
| `/restaurant365-alternative` | **URL is on Google; Page is indexed** on the subsequent 20 November follow-through | Successful Googlebot smartphone crawl: 20 November 2026, 7:57:53 AM as displayed by Google. User canonical is the exact production URL; Google-selected canonical is **Inspected URL**. Crawl and indexing allowed. | The earlier observation was **Discovered — currently not indexed**, followed by an accepted request. The later stored inspection now closes that indexing gap. No repeat request was made. This does not establish rank or traffic. |
| `/product/intelligence` | **URL is on Google; Page is indexed** | User-declared canonical is the same public URL; Google-selected canonical is **Inspected URL**. Last stored crawl: 19 November 2026, 8:02:19 AM as displayed by Google, smartphone crawler. Fetch successful; crawling and indexing allowed. | The fresh inspection is complete. Google accepted a refresh into the priority crawl queue because the stored crawl predates the later 19 November refinements. |

Google's Overview showed **795 indexed** and **1,359 not indexed** known URLs. This includes Google's broader known inventory, including historical paths; it is not a count of the current sitemap's index coverage. The sitemap has 1,583 unique URLs across 22 website locales. Do not divide these unlike cohorts to claim a coverage rate. The Overview's 142 search clicks had no verified date boundary in this readback, so they are not a new 7-day or 28-day comparison.

The management inspection's Discovery section showed a temporary sitemap processing error while that page was indexed with the correct selected canonical. Do not convert that isolated Google processing label into a proven live sitemap defect. The comparison inspection identified the production sitemap normally. No sitemap removal, mass resubmission or canonical rewrite was made.

The complete 7/14/28-day comparison in [16 November's review](SEARCH_CONSOLE_REVIEW_2026-11-16.md) remains the measured baseline. This follow-through establishes current access and specific indexing outcomes; it does not establish traffic uplift or attribution to the latest releases.

## Bing Webmaster import completed

The same business Google account was used to sign in to Bing's free Webmaster Tools and authorize the official **view-only** Search Console import. Bing found exactly one importable site and one sitemap. Only `https://www.sundae.io/` was selected; the import listed its role as Administrator. No personal Google account was selected and no advertising offer was activated.

After importing and reloading, the authenticated Bing Home report opened for Sundae. Its initial reports are being processed, with Bing stating they may take up to 48 hours to appear. The site's Sitemaps report independently confirmed:

- one known sitemap: `https://www.sundae.io/sitemap.xml`;
- submitted/imported and last crawled **20 November 2026**;
- status **Success**, with **zero errors** and **zero warnings**;
- **1.6K URLs discovered**, as rounded by Bing. This is discovery, not a count of indexed URLs or rankings.

This closes the previously pending Bing Webmaster account import and verification step. The imported property and successful sitemap readback are separate evidence from the existing IndexNow notifications. Keep the Google verification files and the authorized view-only connection available for Bing's periodic ownership/sitemap validation. No Bing meta token or DNS modification was required by this import.

## Website release and free discovery checks

[PR276](https://github.com/roblaryea/sundae-website/pull/276) presents team messaging within the existing Core/Crew story, with a detailed Crew section, compact Core/Product summaries, and matching localized FAQ, JSON-LD and `llms.txt` wording. It covers all 22 website locales and retains subscription, setup, enabled-feature and conversation-permission limits. This website publication does not establish app production rollout or universal account enablement.

The independent reviewer accepted the final source `61d63ee5be371bd9312a0ab2e5ee886ea67204b9`, including a correction so native messaging anchors clear the fixed header. All eight hosted checks passed. Main `8f1e197a19aed4f608ac864780a86191986d7587` deployed successfully (deployment `7932564387`). Public verification passed 10 browser cases, 12 localized HTTP/FAQ/schema cases and three native-hash cases across English, Dutch and Arabic, mobile/desktop, themes, RTL and JavaScript-disabled rendering. The owned browser and local server were closed; other workspaces were preserved.

The exact-merge Search Discovery run `44668567057` passed, including sitemap health, priority-page health, catalogue consistency and the existing IndexNow notification. A separate live check found no failures on the 12 monitored search-entry pages, no sitemap inventory failures, and HTTP 200 for `robots.txt`, `llms.txt` and the IndexNow key. Public crawling is allowed. IndexNow acceptance is separate from Bing Webmaster account verification and does not establish Google indexing.

No paid campaign, paid listing, new dashboard or new automation was introduced. Existing official-profile and editorial-distribution handoff criteria remain with the content owners; no outreach or third-party profile publication is claimed.

## Remaining decisions and existing checkpoints

1. On **23 November**, review current stored crawls, selected canonicals and sitemap/indexing cohorts. Management, Ask Sundae and the comparison are all confirmed indexed; the later comparison inspection closes its earlier waiting state. Do not reopen these as missing account access or repeatedly request the same URL: Google explicitly says this does not improve queue position or priority.
2. Review the newly imported Bing property after its initial processing window. Confirm the successful sitemap remains healthy, then inspect indexing, relevant queries and AI-performance data where Bing supplies them. Do not treat initial processing or unavailable early metrics as failure or invent a baseline.
3. Review qualified non-branded discovery, canonical commercial-page visits and useful CTA progression using finalized Google dates and the existing scoped PostHog dashboard. Assess relevant external evidence/distribution with the existing content owner, preserving claim limits and campaign attribution.

Keep the existing decision reviews on **30 November**, **7 December** and **21 December** for complete seven-, fourteen- and twenty-eight-day post-release periods. Preserve the earlier release cohorts, QA exclusions and original PostHog annotation marker. Search availability, actual indexing, query ranking, AI citations and qualified enquiries remain distinct outcomes.

Raw portal readbacks, release receipts and browser captures are retained in the local ignored `output/seo` and `output/playwright` directories for this chat. The main records include `google-ownership-confirmed-20261120.jsonl`, `google-management-index-20261120.jsonl`, `google-management-request-20261120.jsonl`, `google-comparison-index-20261120.jsonl`, `google-comparison-request-20261120.jsonl`, `bing-selected-site-20261120.jsonl`, `bing-home-confirmed-20261120.jsonl`, `bing-sitemap-confirmed-20261120.jsonl` and `messaging-delivery-receipt-20261120.json`. These were obtained through the signed-in visible interface and public website checks; no hidden account APIs or copied authentication data were used.

## Additional free website corrections — 20 November 2026

A current public route audit found `/get-started` (the access-request utility, distinct from the buyer guide `/getting-started`) and `/tiktok-review` eligible for indexing. The four design-preview routes, sign-in, diagnostic report and booking utilities already had the intended exclusions. The correction adds `noindex, nofollow` to the two missed utilities while retaining their availability and existing workflows. The access page reuses the approved localized title for metadata and breadcrumbs, removing a duplicate brand suffix and the English-only breadcrumb. No form, invitation, quote, connector login or publishing operation is changed or submitted.

The retired `/chat-with-data` entry previously sent a temporary redirect to another alias. It now uses the existing explicit-successor policy to return a single permanent redirect to localized `/product/intelligence`, preserving query parameters. All 22 locale receivers were checked; malformed/unknown paths retain their existing behavior.

The existing Search Discovery health check expands from 12 to **18 buyer pages**, including Product, Core, Crew, Results, Getting Started and the product-walkthrough hub. It also verifies **11 intentionally excluded utility/preview pages** remain available and carry `noindex`. Fixture checks prove the monitor rejects both an accidentally hidden buyer page and an accidentally indexable review screen. This extends the existing workflow; it adds no timer, dashboard, price or public claim.

Validation receipts: production build/localization/runtime gates, 228 SEO tests, the focused access-URL tests, a 66-case localized HTTP matrix, 22 exact canonical checks, 22 visible-heading/breadcrumb-schema matches and six browser cases covering English/Dutch/Arabic, themes, mobile and retained validated pricing configuration. Source and production acceptance remain distinct: the focused release requires independent review, passing hosted checks and a public retake. Receipts are retained as `output/seo/discovery-*20261120*`; the final release record is attached to this chat.

External authority and distribution remain continuing work with the existing content owners. The website supplies native product films with captions/transcripts, canonical workflow answers, a qualified comparison and disclosed customer stories. Do not invent story baselines, directory eligibility, profile ownership, rankings or AI citations. No third-party profile or outreach was published by these corrections.

## Later hands-on follow-through — 20 November 2026

The owner asked to proceed with indexing, performance, external authority and demand measurement. A fresh stored Google inspection confirms the comparison is indexed with the correct selected canonical, successful smartphone fetch and one valid breadcrumb item. The Discovery panel currently labels its sitemap a temporary processing error while the page is indexed; this is not evidence of a broken production sitemap. The exact readbacks are `output/seo/followthrough-google-comparison-20261120.jsonl` and `followthrough-google-comparison-detail-20261120.jsonl`. No duplicate indexing request was submitted.

The existing PostHog scope correction and current complete-day comparisons are recorded in [measurement authority](MEASUREMENT_AUTHORITY_AND_MONITORING_2026-08-30.md). Its six saved reports and dashboard now include the existing `/resources/product-walkthroughs` hub; all other event, host, QA and funnel boundaries are retained. This is a reporting correction, not a demand gain.

Three fresh production mobile Lighthouse 13.6 checks of the homepage had no warnings: LCP 1.285 / 1.249 / 1.265 seconds, CLS zero, performance 99 / 99 / 100. These are laboratory results; current field data and a causal attribution to any individual earlier release remain unproven. The matched production pricing samples remained slower: LCP 4.410 / 4.409 / 4.391 seconds, CLS zero, score 85 in each. The bounded pricing SDK-loading correction is separately authored at `0766029e3525b4f7063cbfe7c5abc7c0a9e1c6b8` and requires independent review, passing hosted checks and public verification before being called live. Its three matched local before/after pairs reduce initial script transfer 22.2% and median LCP 11.6%, with zero CLS; that improvement does not close all loading work or establish a production/field gain. Full applicable build, 1,486 unit checks, 37 browser regressions and three built-browser consent/failure/quote cases pass. The separate app consumer's already-existing Crew Lite contract difference remains recorded; no pricing/handoff policy is changed to pass the SDK cut.

The existing ExploreTECH work was found and reused. Its owner recorded the company copy saved and public in English and Arabic on 18 November. A fresh signed-out public check confirms the English company profile explains both Core and Crew, links to both product profiles and links directly to `https://www.sundae.io/`. The provider labels the profile partially verified and reports zero of two products verified; this is not an independently certified endorsement or proof of ranking. The provider's title/description still emphasize AI analytics, although the visible company opening reflects the approved operations-first category. That remaining provider-controlled presentation is an input for the existing listing owner, not a reason to create duplicate profiles or send unsolicited outreach.

Bing's earlier successful import/sitemap receipt remains valid. This continuation could not retain control of the signed-in browser long enough to obtain a fresh Bing report; no new metrics or processing completion are claimed. Preserve the initial up-to-48-hour processing window and check on 23 November. The scheduled full-period demand reviews remain unchanged.
