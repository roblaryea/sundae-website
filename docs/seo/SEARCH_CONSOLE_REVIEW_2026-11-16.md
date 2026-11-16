# Search Console review — 16 November 2026

Verified property: `https://www.sundae.io/`. Read through the signed-in Google Search Console account. Search type: Web (text), all countries/devices. Date boundaries below are Search Console report dates, not PostHog UTC periods. Latest available report date: 14 November. These periods precede the 16 November releases.

## Complete-period comparisons

| Period | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| 8–14 November | 12 | 381 | 3.1% | 9.3 |
| 1–7 November | 14 | 406 | 3.4% | 9.4 |
| 18 October–14 November | 41 | 1,632 | 2.5% | 10.4 |
| 20 September–17 October | 65 | 2,900 | 2.2% | 8.6 |
| 1–14 November | 26 | 787 | 3.3% | 9.4 |
| 18–31 October | 15 | 845 | 1.8% | 11.4 |

The 28-day view declined in clicks and impressions; the latest fortnight improved in clicks, CTR and average position. Do not flatten this into an across-the-board improvement or decline, or attribute either movement to today's releases. Totals include careers, sign-in and other non-commercial pages; they are not counts of qualified operator demand.

## Branded discovery and operator opportunities

The complete visible query table contained 150 rows. A lexical split on `sundae|sundaetech` gives branded rows 11 clicks / 159 impressions versus 11 / 133 in the prior period, and non-branded rows zero clicks / 323 impressions versus zero / 288. These are **visible-query subtotals**: they do not sum to property totals because Search Console omits some query data. Do not call all 41 property clicks branded or assign the omitted clicks to a category.

Commercial queries currently in positions 4–20 include:

| Query | Latest 28-day impressions | Average position | Clicks |
| --- | ---: | ---: | ---: |
| multi location restaurant analytics | 56 | 13.8 | 0 |
| restaurant labor costs calculator | 17 | 8.2 | 0 |
| restaurant marketing software for multi-location groups | 7 | 6.6 | 0 |
| what are the best tools to benchmark profitability across restaurant locations? | 6 | 5.5 | 0 |
| restaurant benchmarking software | 3 | 7.3 | 0 |

The first query improved from position 76.5 with 10 impressions. This is an opportunity to strengthen the existing multi-location and benchmarking journeys, not evidence of sales or grounds for an overlapping landing page. Titles already address the relevant analytics/calculator intent; measure response to the clearer category journey before repeatedly changing them.

## Pages and AI-feature evidence

- Homepage: 15 clicks / 273 impressions, versus 25 / 560; average position 7.8 versus 5.4.
- `/product/benchmarking`: one click / 69 impressions, versus zero / 27.
- `/solutions/multi-location-groups`: zero clicks / 85 impressions, versus zero / 50; average position 20.9 versus 38.4.
- `/product/pulse`: 27 impressions versus 167, no clicks in either period.
- `/demo`: five impressions versus 117, no clicks in either period.
- `/crew`: one click / 31 impressions, versus one / 61.

Google's **Generative AI features (Beta)** report records 231 impressions versus 447 over the same 28-day periods. The homepage accounts for 64 versus 164; benchmarking 21 versus six; the multi-location solution 16 versus zero. The broader available 29 August–14 November report has 802 impressions across 82 page rows. This is Google's reported feature exposure, not a verified citation count across ChatGPT, Claude, Perplexity or all answer engines, and it does not establish qualified traffic.

## Indexing, sitemap and technical findings

- All-known-URL indexing report: 820 indexed; 1,335 not indexed. Reasons: crawled-not-indexed 861, discovered-not-indexed 331, noindex 84, 404 52, redirect three, robots-blocked one, different Google canonical three. These include non-marketing URLs and retired/static paths; do not compare this total directly with an older submitted-only cohort.
- All 52 404 examples were read: **40 localized retired product aliases**, ten obsolete deployment assets, and two malformed paths (`/$`, `/&`). The aliases have explicit equivalents already used by the English redirects. Correct their localized successors while retaining the locale and query. Do not redirect missing deployment assets or malformed URLs to unrelated marketing pages.
- Before resubmission, `/sitemap.xml` was Success, last read 6 November, with 1,437 discovered pages. The live sitemap inventory now contains 1,539 unique URLs. Resubmitted successfully on 16 November; this is a processing request, not proof Google has read or indexed the new inventory.
- `/tools/labor-cost` is indexed. The stored 26 September crawl declares `https://www.sundae.io/tools/labor-cost`, and Google selects the inspected URL. The earlier old-host canonical concern is resolved. Discovery showed a temporary sitemap processing error; the accepted resubmission is recorded separately.
- `/restaurant-management-platform` was unknown to Google. Its indexing request was accepted into the priority crawl queue. Live availability and the accepted request do not mean it is indexed yet. The remaining workflow URLs remain submitted through the live sitemap; individual index status is not inferred.
- Core Web Vitals: insufficient real-user usage data for both mobile and desktop over the last 90 days. This is not a pass or a measured performance failure.

## Next decisions and content handoff

1. Verify the 40 legacy aliases after release and monitor the same exclusion cohort as Google recrawls. Preserve canonical destinations and avoid creating duplicate pages.
2. Use the new task/logbook/tip navigation and the existing multi-location/benchmarking pages for qualified distribution. Ask the content owner for one practical multi-location comparison workflow and one shift-handover example, each linking to one canonical page with consistent campaign tags. Use documented steps and evidence, not invented recovery percentages.
3. Review new-page discovery and non-branded CTR after a complete post-release period. Separate internal QA from customer demand. Continue the existing Monday cadence; the next checkpoint is 23 November and the first full fortnight after this release ends 30 November.

The signed-in browser blocked the CSV export attempt. Evidence was instead saved from the complete visible query/page tables, date dialogs and report snapshots in ignored `output/seo` files. No hidden account APIs or inferred figures were used.

Post-release verification: PR 214 is merged and all 40 affected localized legacy URLs returned 308 with successor locations on production. The remaining 12 missing examples are ten obsolete deployment assets and two malformed URLs. The later production sitemap audit again found 1,539 unique URLs and no inventory health failures. Complete delivery and follow-through status is in [completion matrix](COMPLETION_MATRIX_2026-11-16.md).
