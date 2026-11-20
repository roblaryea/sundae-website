# Google access and search-discovery follow-through — 20 November 2026

## Verified account and property

The owner asked this chat to complete the ownership setup shown in the in-app browser, rather than delegate it back. Google identified the signed-in business account as `marketing@sundaetech.ai` and requested `google230704367ecac88b.html` for the existing `https://www.sundae.io/` property.

[PR277](https://github.com/roblaryea/sundae-website/pull/277) added only that standard public verification response. Its eight hosted checks passed, independent review accepted the exact source, and main `a2f7b8c19aa20236a183008871e56a4b9b58f240` deployed successfully (deployment `7932632049`). Both this file and the earlier `google0067bd7a92342860.html` returned HTTP 200 with their exact expected bodies. The earlier owner's file remains intact.

The actual signed-in Google portal subsequently displayed **Ownership auto verified**, method **HTML file**. Opening **Go to property** displayed the existing Overview and historical reports. This closes the account-access and ownership-verification gap; it is not merely a successful public-file check. No password, ownership transfer, DNS change or duplicate Search Console property was required. Keep both files in future releases.

## Google indexing readback and actions

| Page | Observed Google state | Canonical / crawl evidence | Action completed |
| --- | --- | --- | --- |
| `/restaurant-management-platform` | **URL is on Google; Page is indexed** | User-declared canonical is the same public URL; Google-selected canonical is **Inspected URL**. Last stored crawl: 16 November 2026, 5:42:31 PM as displayed by Google, smartphone crawler. Fetch successful; crawling and indexing allowed. | Requested a refresh because the stored crawl predates the later refinements. Google confirmed **Indexing requested** and addition to the priority crawl queue. |
| `/restaurant365-alternative` | **URL is not on Google; Discovered — currently not indexed** | Google knows it through `https://www.sundae.io/sitemap.xml`; stored crawl and selected canonical are N/A. | A live eligibility check completed and Google confirmed **Indexing requested**, with addition to the priority crawl queue. This is not an indexing completion or ranking guarantee. |
| `/product/intelligence` | Fresh per-page inspection not completed in this follow-through | Current public technical checks pass; a Google-selected canonical is not inferred from the website's declaration. | Retain for the next account inspection. |

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

1. On **23 November**, inspect the comparison page after Google's accepted request, complete the Ask Sundae per-page inspection, and review current sitemap/indexing cohorts. Do not repeatedly request the same URL: Google explicitly says this does not improve queue position or priority.
2. Review the newly imported Bing property after its initial processing window. Confirm the successful sitemap remains healthy, then inspect indexing, relevant queries and AI-performance data where Bing supplies them. Do not treat initial processing or unavailable early metrics as failure or invent a baseline.
3. Review qualified non-branded discovery, canonical commercial-page visits and useful CTA progression using finalized Google dates and the existing scoped PostHog dashboard. Assess relevant external evidence/distribution with the existing content owner, preserving claim limits and campaign attribution.

Keep the existing decision reviews on **30 November**, **7 December** and **21 December** for complete seven-, fourteen- and twenty-eight-day post-release periods. Preserve the earlier release cohorts, QA exclusions and original PostHog annotation marker. Search availability, actual indexing, query ranking, AI citations and qualified enquiries remain distinct outcomes.

Raw portal readbacks, release receipts and browser captures are retained in the local ignored `output/seo` and `output/playwright` directories for this chat. The main records include `google-ownership-confirmed-20261120.jsonl`, `google-management-index-20261120.jsonl`, `google-management-request-20261120.jsonl`, `google-comparison-index-20261120.jsonl`, `google-comparison-request-20261120.jsonl`, `bing-selected-site-20261120.jsonl`, `bing-home-confirmed-20261120.jsonl`, `bing-sitemap-confirmed-20261120.jsonl` and `messaging-delivery-receipt-20261120.json`. These were obtained through the signed-in visible interface and public website checks; no hidden account APIs or copied authentication data were used.
