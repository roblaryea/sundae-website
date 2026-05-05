---
title: Claims Bank — Sundae Marketing Site
branch: design-polish
status: SEED — derived from homepage-spec-v1.1; expand as additional surfaces are built
last-updated: 2026-05-05
maintainer: Robert (final approval) · Eng (architectural facts) · Sales (operational commitments)
---

# Claims Bank — Sundae Marketing Site

The single source of truth for every public-facing claim on the Sundae marketing site. Every claim that ships in production must have an entry here marked **APPROVED PUBLIC** or **CAPABILITY CLAIM ONLY**. **NEEDS VALIDATION** claims never ship.

---

## Why This Exists

Aggressive marketing positioning is only credible if every claim survives a 30-second follow-up question. This bank exists to:

1. Force every claim through a verification gate before publication.
2. Distinguish between **architectural facts**, **operational commitments**, and **outcome promises** — each carries different risk.
3. Catch unsubstantiated quantified outcomes before they ship.
4. Give Legal and Sales a single artifact to review when copy changes.

---

## Schema

Each row in the tables below has:

| Field | Meaning |
|---|---|
| **ID** | Stable identifier (CLM-NNN). Once assigned, never reused. |
| **Claim** | Verbatim or near-verbatim text as it appears (or will appear) on the site. |
| **Surface** | Which page/section uses this claim. A single claim may appear on multiple surfaces. |
| **Type** | Stat · Capability · Positioning · Operational · Persona · Illustrative |
| **Status** | APPROVED PUBLIC · NEEDS VALIDATION · CAPABILITY CLAIM ONLY |
| **Source** | Where the truth lives (architecture file, pricing page, telemetry, sales playbook, etc.) |
| **Owner** | Who can sign off (Eng / Robert / Sales / Legal) |
| **Footnote?** | Whether the live page must show a disclaimer/footnote when this claim is rendered |
| **Notes** | Open questions, related claims, history |

### Status Legend

- **APPROVED PUBLIC** — verified, sourced, defensible under scrutiny. Can ship today.
- **NEEDS VALIDATION** — plausible but requires data confirmation, source link, or sign-off before publication. Block ship until resolved.
- **CAPABILITY CLAIM ONLY** — describes architectural capability, not a customer-validated outcome. Safe to ship but lower-impact; never represent as customer-validated.

### Owner Key

- **Eng** — engineering team confirms architectural / telemetry facts (counts, refresh rates, integration coverage)
- **Robert** — founder approval for positioning, brand voice, strategic claims
- **Sales** — confirms operational commitments (working session format, response times)
- **Legal** — confirms competitor references, claim defensibility, disclaimer requirements

### Footnote Registry

Footnotes that must appear on any page where the linked claim renders:

- **FN-1**: "Refresh frequency varies by Core tier. See pricing for details." → applies to any tier-specific refresh stat
- **FN-2** (TBD): definition of "pilot location" once CLM-004 is resolved
- **FN-3**: "Illustrative scenario based on Pulse, Watchtower, and Sundae Coach capabilities. Actual signals vary by configuration." → applies to the entire 4D scroll-scene

---

## A. Statistical Claims (Highest Scrutiny)

| ID | Claim | Surface | Status | Source | Owner | Footnote? | Notes |
|---|---|---|---|---|---|---|---|
| CLM-001 | `12 data domains unified` | Hero, Section 7 stats, Moat #2 implicit | **APPROVED PUBLIC** | Integration catalog (`packages/analytics/src/lib/vertical-config.ts`) | Eng | No | Confirmed: 12 distinct domains. Don't drift to 13 or 11. |
| CLM-002 | `179 restaurant data models` | Hero, SQC Quality, Section 7 stats | **APPROVED PUBLIC** | Architecture inventory | Eng | No | Lock the number. If model count changes, update everywhere atomically. |
| CLM-003 | `30+ analytics modules` | Section 7 stats | **NEEDS VALIDATION** | Module catalog | Eng | No | **OPEN**: pricing page says 14 specialized modules; modules page says 30+. Pick one number, lock all surfaces (homepage, pricing, modules, FAQ). Recommend: keep 30+ (matches modules page; 14 was a subset). |
| CLM-004 | `250+ pilot locations` | Hero | **NEEDS VALIDATION** | Sales pipeline | Robert / Sales | Possibly FN-2 | **OPEN**: define numerator clearly. Signed pilots? Active integrations? Interested operators? Each gives a different defensible number. Resolve before Hero ships. |
| CLM-005 | `5-minute refresh on Core Pro` | SQC Triangle (Speed vertex) | **CAPABILITY CLAIM ONLY** | Tier specification (pricing page) | Eng | **FN-1** required | Tier-specific. Footnote mandatory wherever this rendered. |
| CLM-006 | `Live Core refresh` | Hero proof strip, Moat #1 | **CAPABILITY CLAIM ONLY** | Tier spec (Core product line) | Eng | **FN-1** recommended | Generalized version of CLM-005 for top-of-page surfaces where footnote is awkward. |
| CLM-007 | `30-second answers` | SQC Triangle (Speed vertex) | **NEEDS VALIDATION** | Sundae Intelligence p95 latency | Eng | No | **OPEN**: confirm with telemetry. If true (p95 < 30s), publish. If not, soften to "answers in seconds" — still positioning-effective, defensible. |
| CLM-008 | `Report Lite is free` | SQC Cost vertex, all tier-related CTAs, pricing page | **APPROVED PUBLIC** | Pricing page (Report Lite tier) | Robert | No | Anchor of the freemium positioning. Banned phrasings tracked separately (see Spec Section 0). |

---

## B. Capability Claims (Architecture-Backed)

| ID | Claim | Surface | Status | Source | Owner | Notes |
|---|---|---|---|---|---|---|
| CLM-101 | `Sundae unifies your restaurant data, market signals, and peer benchmarks` | Hero subhead | **APPROVED PUBLIC** | Architecture | Eng | Captures Pulse + Watchtower + Benchmarks composition. |
| CLM-102 | `tells each team what to do — while there's still time to act` | Hero subhead | **CAPABILITY CLAIM ONLY** | Sundae Coach feature | Eng | Capability framing, not outcome promise. |
| CLM-103 | `Restaurant-shift-aware logic. Speaks "covers, voids, comps, walks" — not generic transaction data.` | Moat #1 | **APPROVED PUBLIC** | Restaurant intelligence domain skill, Pulse design | Eng | Reflects domain modeling. |
| CLM-104 | `Weather impact, local events, competitor pricing, daily AI briefings` | Moat #2 | **APPROVED PUBLIC** | Watchtower feature spec | Eng | All four capabilities exist and are documented. |
| CLM-105 | `Anonymized peer comparisons across operators on the platform` | Moat #3, SQC Quality | **APPROVED PUBLIC** | Benchmarks feature spec | Eng | Network framing. |
| CLM-106 | `the comparison engine compounds with every restaurant that joins` | Moat #3 | **CAPABILITY CLAIM ONLY** | Network-effect framing | Robert | Positioning, not measurable outcome. |
| CLM-107 | `Live shift signals on Pulse` | SQC Speed | **APPROVED PUBLIC** | Pulse feature | Eng | |
| CLM-108 | `Instant answers from Sundae Intelligence` | SQC Speed | **CAPABILITY CLAIM ONLY** | Sundae Intelligence | Eng | "Instant" is qualitative; pairs with CLM-007 if quantified. |
| CLM-109 | `Forecasts that update every cycle` | SQC Speed | **APPROVED PUBLIC** | Foresight feature | Eng | |
| CLM-110 | `Governed metrics` | SQC Quality | **APPROVED PUBLIC** | Architecture | Eng | |
| CLM-111 | `Source-cited AI answers — not guesses` | SQC Quality | **APPROVED PUBLIC** | Sundae Intelligence (citations feature) | Eng | |
| CLM-112 | `Core reduces dependence on custom BI dashboards, manual reports, and analyst backlogs` | SQC Cost | **CAPABILITY CLAIM ONLY** | Positioning | Robert | Defensible operating-model claim, no quantification. |
| CLM-113 | `Without adding to your analyst queue` | SQC Cost headline | **CAPABILITY CLAIM ONLY** | Positioning | Robert | |

---

## C. Positioning & Competitor References (Legal-Reviewable)

| ID | Claim | Surface | Status | Source | Owner | Notes |
|---|---|---|---|---|---|---|
| CLM-201 | `Decisions before the margin disappears.` | Hero headline | **APPROVED PUBLIC** | Brand positioning | Robert | The page-defining line. |
| CLM-202 | `The old way waits for reports. Sundae acts while there's still time.` | Site-wide spine, Section 4 headline | **APPROVED PUBLIC** | Brand positioning | Robert | The aggressive thread. |
| CLM-203 | `Power BI and Tableau are excellent BI tools. They were not built to run restaurant shifts. Sundae was — and these three layers are hard to retrofit because they combine data, workflow, and network depth.` | Section 5 subhead | **NEEDS VALIDATION** | Steel-man positioning | Robert + Legal | First named-competitor reference on the site. Concedes competitor strength. Legal review required before publish. If Legal is unavailable before build, omit the named sentence and use the generic BI-tool version. |
| CLM-204 | `What generic BI tools struggle to retrofit` | Section 5 eyebrow | **APPROVED PUBLIC** | Positioning | Robert | Generic, defensible. |
| CLM-205 | `Three moats dashboards alone don't solve.` | Section 5 headline | **APPROVED PUBLIC** | Positioning | Robert | |
| CLM-206 | `most BI vendors are not built to solve` | Moat #2 close | **NEEDS VALIDATION** | Steel-man positioning | Legal | Generalized rather than naming a specific vendor's failure, but still a market-wide competitive claim. Legal review required before publish. |
| CLM-207 | `Hard to recreate from a cold start` | Moat #3 | **APPROVED PUBLIC** | Network-effect framing | Robert | Replaces earlier "no later entrant can recreate" (too absolute). |
| CLM-208 | `That's not a feature gap. That's a category difference.` | Section 5 close | **APPROVED PUBLIC** | Positioning | Robert | |
| CLM-209 | `Fast. Right. Affordable. Pick all three.` | SQC headline | **APPROVED PUBLIC** | Positioning | Robert | The triangle anchor. |
| CLM-210 | `That's not a tradeoff. That's the moat.` | SQC close | **APPROVED PUBLIC** | Positioning | Robert | |
| CLM-211 | `Same data. Different verdict.` | Section 4 close | **APPROVED PUBLIC** | Positioning | Robert | |
| CLM-212 | `THE REAL ENEMY IS DASHBOARD BUREAUCRACY` | Section 4 eyebrow | **APPROVED PUBLIC** | Positioning | Robert | Doesn't name a competitor; targets a behavior. Safe. |
| CLM-213 | `Few dashboards connect the four dimensions. Sundae does it before the shift ends.` | Section 6 close | **APPROVED PUBLIC** | Positioning (softened from absolute) | Robert | |
| CLM-214 | `Stop running your restaurants on yesterday's numbers.` | Section 8 headline | **APPROVED PUBLIC** | Positioning | Robert | Closing CTA anchor. |
| CLM-215 | `Excel exports · POS dashboards · BI dashboards · analyst queue · weekly review meetings` | Section 4 replaces strip | **APPROVED PUBLIC** | Positioning (no specific vendor) | Robert | "BI dashboards" is generic; safe. |

---

## D. Operational Commitments (Sales-Reviewable)

| ID | Claim | Surface | Status | Source | Owner | Notes |
|---|---|---|---|---|---|---|
| CLM-301 | `30 minutes with our team and your data — see whether Sundae would genuinely help your operation.` | Section 8 subhead | **NEEDS VALIDATION** | Sales playbook | Sales | Confirm: is the standard working session 30 min, longer, or scoped per buyer? |
| CLM-302 | `Working session is free.` | Section 8 trust line | **NEEDS VALIDATION** | Sales playbook | Sales | Confirm sales does not bill for first session under any tier. |
| CLM-303 | `No generic demo. We work from your data where available, or from a representative restaurant scenario.` | Section 8 trust line | **NEEDS VALIDATION** | Sales playbook | Sales | Confirm this matches actual session format. |
| CLM-304 | `Get your free benchmark` (CTA action) | Hero, footer, persistent ribbon (TBD) | **APPROVED PUBLIC** | Report Lite product | Robert | The acquisition CTA. Clicking → routes to Report Lite signup. |
| CLM-305 | `Book a working session` (CTA action) | Hero, all sections, footer | **APPROVED PUBLIC** | Sales-led funnel | Robert | The high-intent CTA. Routes to demo form (or persona-aware form if scoped separately). |

---

## E. Persona Pain & Outcome Claims (Appendix A)

All persona pain headlines and outcome lines are positioning/observational — they describe a buyer's reality and Sundae's response, not a specific customer outcome. They ship as **CAPABILITY CLAIM ONLY** unless explicitly upgraded with quantified evidence (which is intentionally absent in v1.1).

| ID | Persona | Pain Headline | Outcome Headline | Status |
|---|---|---|---|---|
| CLM-401 | COO / Operations | `You can't be in every restaurant at once.` | `Live visibility into every shift.` | **APPROVED PUBLIC** (observational) |
| CLM-402 | CFO / Finance | `Three days to close the books is three days too many.` | `Margin variance, the day it happens.` | **APPROVED PUBLIC** (observational) |
| CLM-403 | CEO / Owners | `Your worst location is invisible until Thursday's recap.` | `Portfolio truth, every morning.` | **APPROVED PUBLIC** (observational) |
| CLM-404 | Marketing | `By the time you measure the campaign, the budget is already spent.` | `Campaign ROI, day-by-day.` | **CAPABILITY CLAIM ONLY** ("day-by-day" is operational; confirm Insights ROI module ships at this cadence) |
| CLM-405 | HR / People | `Labor variance shows up too late.` | `Labor variance, in the moment.` | **APPROVED PUBLIC** (observational; v1.1 removed unsubstantiated "4 points high") |
| CLM-406 | Tech / Data | `Twelve vendor APIs. Five data formats. Zero unified schema.` | `One platform, twelve domains, zero plumbing.` | **APPROVED PUBLIC** (the 12 domain count is in CLM-001) |

---

## F. Illustrative Content (Visibly Labeled)

The 4D scroll scene contains illustrative specifics. Every specific in this scene must be readable as "this is an example, not a customer story."

| ID | Element | Surface | Status | Disclaimer | Notes |
|---|---|---|---|---|---|
| CLM-501 | Visual badge: `ILLUSTRATIVE SCENARIO — SUNDAE COACH EXAMPLE` | Section 6 (rendered on the visual itself) | **APPROVED PUBLIC** (mandatory) | — | Non-removable label per v1.1 spec. |
| CLM-502 | Scenario specifics: `Tuesday 9:14am · Downtown · 14% behind plan · 22% covers down · $3,800 vs forecast · three competitors at $9.99 · fire drill 11–12` | Section 6 | **CAPABILITY CLAIM ONLY** | **FN-3** | Acceptable because the scene is labeled illustrative. |
| CLM-503 | `Sundae Coach: adjust one line-cook shift from 11–2 if coverage allows. Push the $11.99 lunch combo via your loyalty app. Projected impact: recover part of the gap if executed before lunch peak.` | Section 6 | **CAPABILITY CLAIM ONLY** | **FN-3** | Qualitative projection, no quantified outcome. |

---

## G. Deferred / Blocked Items

These items are intentionally removed from v1.1 and tracked here to ensure they aren't reintroduced without proper validation.

| ID | Item | Status | Block | Resolution Path |
|---|---|---|---|---|
| CLM-901 | Pilot quote (named operator testimonial) | **DEFERRED** | No named operator with permission to attribute + quote | Sales/Robert obtains quote + permission. Add to bank as APPROVED PUBLIC. Ships in v1.2+ release. |
| CLM-902 | Customer logo wall | **DEFERRED** (conditional) | Zero approved logos at homepage launch | Add each logo as APPROVED PUBLIC entry once permission letter is on file. Section 7 ships logo wall only when ≥1 approved entry exists. |
| CLM-903 | Quantified outcome metrics (`recover $X/location`, `cut Y hours/week`, `Z% margin lift`) | **BLOCKED** | No validated pilot data | Run a pilot-outcome audit. Once 2–3 pilots produce defensible numbers, add as **APPROVED PUBLIC** with named source. Replace capability stats with outcome stats in v1.2+. |
| CLM-904 | "Recover $4,200/location/month" or similar specific dollar outcomes | **BANNED** | Unsubstantiated | Do not introduce until CLM-903 resolves. |

---

## How to Use This Bank

### When writing new copy

1. Draft the claim.
2. Search this bank for an existing entry. If found, reuse the exact wording.
3. If new, add an entry with status **NEEDS VALIDATION** until the source/owner signs off.
4. Do not ship the claim to production until status is **APPROVED PUBLIC** or **CAPABILITY CLAIM ONLY**.

### When reviewing copy

1. Every public string on the marketing site should map to an ID here.
2. If a string in code has no entry, either add it or rewrite to match an existing entry.
3. **NEEDS VALIDATION** items in production are a bug.

### When validation status changes

1. Update the entry's status, source, and last-verified date.
2. If a claim is invalidated (turns out to be untrue or unsupportable), mark it **REVOKED** and remove it from production immediately. Do not silently weaken it.
3. Log the change in the bank's git history (this file is committed and versioned).

---

## Open Items Queue (Action Required)

These are the immediate validation tasks that block specific sections from shipping:

| Priority | Claim | Owner | Action | Blocks |
|---|---|---|---|---|
| P1 | CLM-004 (`250+ pilot locations`) | Robert | Define what counts. Pick the defensible numerator. | Section 1 (Hero) |
| P1 | CLM-003 (`30+ analytics modules`) | Eng | Reconcile module count across pricing/modules/homepage. Lock one number. | Section 7 (Proof) |
| P2 | CLM-007 (`30-second answers`) | Eng | Pull p95 latency from Sundae Intelligence telemetry. Confirm or soften. | Section 3 (SQC) |
| P2 | CLM-301, 302, 303 (working-session commitments) | Sales | Confirm operational reality matches copy. | Section 8 (CTA) |
| P3 | CLM-203 (Power BI + Tableau steel-man reference) | Legal | Review competitor reference for any defamation/fairness exposure. | Section 5 (Moats) |
| P3 | FN-1, FN-2, FN-3 footnote text | Robert | Approve final footnote wording. | Sections 1, 3, 6 |
| Ongoing | CLM-901, 902 (pilot quote + logo wall) | Robert + Sales | Source named operators with attribution permission. | Future v1.2+ release |

---

*Bank version: 1.0 · Derived from homepage-spec-v1.1 · This file ships in repo and is the operational source of truth for marketing-site claims.*
