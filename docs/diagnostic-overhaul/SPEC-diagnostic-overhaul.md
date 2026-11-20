# Spec: Operations Diagnostic overhaul (content, rules and conversation)

**Status:** approved for build, 20 Nov 2026. The owner accepted every recommendation in section 11; the Q9 mappings stand as proposed (menu and item margins → Margin; delivery alone → Margin).
**Grounded in:** website `origin/main` 19ce351; backend `develop` cc2babf62; website catalogue snapshot `v1.8.2-policy-20261009` (verified 2026-11-17); entitlement catalogue `config/entitlement_catalog.ts`; owner answers of 17 Nov (audit README section 0); guided booking branch `claude/guided-booking-3ef742` at 6c87629 (PR #285, not merged).
**Related:** [SPEC-conversational-walkthrough-booking.md](SPEC-conversational-walkthrough-booking.md) (the conversation engine, design board, split mechanism and inline booking this spec reuses).

---

## 1. Summary

The Operations Diagnostic at `/diagnostic` asks 14 questions, then generates a personalised report. Today it:
- recommends the wrong Crew package for many operators;
- never mentions Profit Recovery;
- never shows that Ask Sundae and Benchmarks come with every Core package;
- feeds the AI internal language and two unverified claims;
- lets an invented profit figure reach the report's written summary.

This spec fixes the content and the recommendation rules first, in the existing step-by-step form. It then rebuilds the questionnaire as a Sundae-branded conversation on the same engine as the guided booking. The report ends in the same inline "Choose a time" booking.

### Goals
1. Every recommendation matches what the catalogue and entitlements actually include (Core packages, Crew packages, add-ons, concept modules).
2. The questions cover what Sundae now sells: Core's performance and profit-recovery loop, and Crew's daily operations (tasks, logbook, handover, attendance, people records, payroll, tips, training).
3. No figure the operator hasn't given and the catalogue doesn't hold reaches the report: no savings, no EBITDA uplift, no invented benchmarks.
4. The questionnaire feels like a short conversation, not a form. It is no longer than today on the typical path, and completion is measured against the current form before it replaces it.
5. The report leads to a booked walkthrough inside the page, not only through an email link.

### Non-goals
- Changing prices, packages or entitlements.
- A free trial (there is none).
- Changing the report email template beyond the link changes in section 7.
- Bringing the conversation into the Sundae app (that is Phase 3 of the booking spec).

---

## 2. Current state (verified)

| Piece | Where | What it does today |
|---|---|---|
| Landing | `src/app/diagnostic/page.tsx`, `DemoDiagnosticPromo.tsx` | "AI-guided · about 7 minutes"; the /demo promo says "Answer 14 focused questions". The 7 minutes is not measured anywhere. |
| Questions | `src/lib/diagnostic/questions.ts` | A bank of 20; `PUBLIC_DIAGNOSTIC_QUESTION_IDS` exposes 14: segment, outlets (bands), region, scheduling_tool, labor_pain, payroll_regions, kpis_measured, kpis_wished (32 options), forecasting, scenario_wish, pos (24 options), ops_tools, priority (text). Then a contact step: name, email, company, phone, role. |
| Stepper UI | `src/components/diagnostic/DiagnosticFlow.tsx` | One question per screen, progress bar, resume from localStorage. |
| Rules engine | `src/lib/diagnostic/engine.ts` | Deterministic. Picks a Core package, a Crew package, Watchtower, Foresight & Action; writes up to 3 leak hypotheses, a 30/60/90 plan and an economics block priced from the website catalogue snapshot. |
| AI narrative | `src/app/api/diagnostic/route.ts`, `promptBuilder.ts` | `generateObject` with OpenAI gpt-5-mini, then Anthropic claude-haiku-4-5, then the same models via Vercel AI Gateway; falls back to the rules engine. One model call per report. |
| Guard | `src/lib/diagnostic/reportGuard.ts` | Replaces the AI's stack, package fit, economics, leak severity and impact lines with the engine's. It does **not** check the summary, leak titles or leak details. Quick wins are dropped only if they name Crew, Watchtower or Foresight without them being recommended. |
| Lead | `src/lib/diagnostic/leadOutbox.ts` → `/api/cta/submit` → backend | Queued in localStorage with retries. The backend stores the report in `metadata.report` and sends the report email (report link + 30-day booking link). |
| Report link | backend `report_access_token.ts` | HMAC of the lead id. **No expiry**: the link works for ever. |

### 2.1 Defects

| # | Defect | Evidence | Effect on the operator |
|---|---|---|---|
| D1 | Crew Operating is recommended only for 2+ payroll countries. | `engine.ts` Crew rule. The prompt also says "Crew Operating ... ONLY for multi-region payroll (2+ payroll countries) or 16+ outlets". | A single-country operator who needs payroll, tasks, logbook or tips is told Crew Schedule or Schedule & Time, neither of which includes them. Tasks and logbook are `crew_operations`, tips are `crew_payroll` (owner, 17 Nov). |
| D2 | Crew Complete, Crew Starter, Crew Manage and Crew Pay are never recommended. | Engine has three branches only. | People-intelligence needs (performance, training, recruiting) and small teams are never matched. |
| D3 | No question covers Crew's daily-operations scope. | Question bank. | Tasks, checklists, logbook, handover, staff files, onboarding, tips and training never enter the report. |
| D4 | Profit Recovery is absent. | Questions, engine, prompt and report. | The lead positioning, included in every Core package, is missing from the one tool built to sell it. |
| D5 | Ask Sundae never appears in a real report; Benchmarks never appears at all. | Ask Sundae is added only if `decision_data` has certain answers, but `decision_data` is not in the 14 public questions. | Two capabilities included in every Core package (owner, 17 Nov) are invisible. |
| D6 | Internal language is sent to the AI. | Prompt: "Network-effect data moat", "NodeScope. This is the moat against single-org BI tools", "workforce substrate". | The model can echo it into a customer report. |
| D7 | Unverified claims in the prompt and engine. | Payroll packs listed with Egypt: the 36 are the 6 GCC states, US, Canada, UK and EU 27, and no Egypt pack exists on `develop`. "14-90 day forecasting": the website elsewhere says "14-365 day horizons" and "3-7 days ahead", and the booking brief says "the next 14 days". "30+ metrics" for Benchmarks is unsourced. | Claims the sales team may not be able to stand behind. |
| D8 | Role framing tells the AI to lead with money. | `roleFraming`: finance "lead with EBITDA impact, margin points, and the loaded cost of the current stack"; owner "the EBITDA upside". This contradicts output rule 14, and the guard does not check the summary or leak text. | An invented EBITDA or savings figure can reach the report in prose. |
| D9 | Outcome claims in fixed copy. | Engine leak details ("expose this live, before the threshold is crossed"); soft uplifts ("Fairer, demand-matched scheduling cuts churn", "Signal-to-action drops from weekly close to same-day"). | Promises with no evidence behind them. |
| D10 | The price uses the middle of a location band. | `outletCountValue`: "6-15" is priced as 10 locations, "16-50" as 33. | Conflicts with the 20 Nov decision that a price needs an exact location count. |
| D11 | Crew price ignores team size. | The website snapshot carries location bands only. CLAUDE.md §12a records a live per-location staff allowance (20 staff, then $3 per employee). | The Crew figure can understate cost for large teams. To verify against the live catalogue. |
| D12 | Concept answers are ignored. | Hotel F&B, franchise, cloud kitchen, catering and central kitchen answers never map to the concept modules the calculator sells (Franchise, Hotel F&B, Cloud Kitchen, Catering, Production). | Relevant modules go unmentioned. |
| D13 | Two free-mail lists. | `diagnostic/enrich.ts` and `leadConversation/inference.ts`. | Different company inference between the two flows. |
| D14 | Placeholder money tiles. | "Current spend: Needs your current cost baseline", "EBITDA uplift: Not estimated". | Two of three headline tiles say nothing. |

---

## 3. Experience

### 3.1 Shape

The conversation has five short parts, shown in the progress bar as five segments:
1. Your operation
2. Running the day (Crew)
3. Where profit leaks (Core)
4. Your systems
5. Your report

Sundae's lines are one sentence. Most answers are a tap. Optional turns have a visible **Skip**. Every answer can be edited, as in the booking flow.

Name is asked first (personal, low friction). Email is asked last, as "Where should I send your report?", because the report is the reason to give it (decision Q5).

### 3.2 Script (typical path ≤ 15 turns)

| # | Part | Sundae asks | Input | Shown when | Feeds |
|---|---|---|---|---|---|
| 1 | Operation | "Hi, I'm Sundae. I'll put together a report on your operation. What should I call you?" | text (same name check as booking) | always | greeting, lead |
| 2 | Operation | "What kinds of places do you run?" | multi chips: restaurants (QSR / fast casual / casual / fine dining as sub-chips), café or bakery, bar, hotel F&B, cloud kitchen or virtual brands, catering and events, central kitchen, franchise | always | concept modules, wording |
| 3 | Operation | "How many locations?" | number (1-9999) with quick chips 1 / 5 / 10 / 25 | always | pricing (exact), Starter eligibility, Watchtower |
| 4 | Operation | "Looks like you're in {country}. Where do you operate?" | searchable multi, IP guess preselected | always | payroll availability, region wording, POS list |
| 5 | Operation | "About how many people work at a typical location?" | chips: up to 15 / 16-20 / 21-40 / 41-80 / more (15 is Crew Starter's soft cap, 20 the per-location staff allowance to confirm in D11) | always | Crew Starter eligibility, staff allowance note |
| 6 | Crew | "Which of these still run on paper, group chats or spreadsheets?" | multi chips: schedules · time clock and attendance · opening and closing checklists · shift logbook and handover · staff files and onboarding · payroll prep · tips · training · **none, we have systems** | always | Crew needs |
| 7 | Crew | "Where do you run payroll?" | multi, countries from turn 4 preselected | turn 6 includes payroll prep or tips | payroll availability note |
| 8 | Crew | "Which team costs hurt most?" | multi chips: overtime · no-shows and late swaps · buddy punching · payroll errors · staff turnover · compliance paperwork · **not a big issue** | skip if turn 6 = none | Crew needs, leak hypotheses |
| 9 | Core | "Where do you think money slips away?" | multi chips: staffing vs how busy it is · food cost vs recipe and waste · supplier price creep · voids, discounts and refunds · delivery commissions · menu prices and item margins · items running out · reservations and no-shows · guests not coming back · planning next week's sales and staffing · competitor prices and local events · **not sure yet** | always | Core package, Profit Recovery detectors, Foresight, Watchtower |
| 10 | Core | "When you fix something like that, how do you know it worked?" | single chips: we check next month's P&L · a spreadsheet we keep · we compare against a baseline · we don't really know | always | Profit Recovery narrative |
| 11 | Systems | "Which POS do you use?" | region-aware chips + search + Other + Not sure (booking component) | always | integration notes |
| 12 | Systems | "Anything else running the operation?" | multi, optional: scheduling app · HR or payroll system · inventory and purchasing · accounting · reservations · delivery tablets · loyalty or CRM · BI dashboards or spreadsheets | always (Skip) | integration notes, "keep your HR" note, Ask Sundae wording |
| 13 | Report | "If you could fix one thing in the next 90 days, what would it be?" | text, 280 chars | always | summary, 30/60/90 plan |
| 14 | Report | "Where should I send your report?" then "Are you with {Company}?" | work email; company confirm (booking component) | always | lead |
| 15 | Report | "What's your role?" | chips (booking role keys) | always | narrative emphasis (never money) |

Then: generating state, then the report, which ends in **Choose a time** (section 3.4).

**Removed from today's set:**
- `kpis_measured` and `kpis_wished` (32 options): replaced by turn 9, which maps to what Sundae detects.
- `scenario_wish`: folded into turn 9's planning and competitor chips.
- `forecasting`: folded into turn 9's planning chip.
- `scheduling_tool`: folded into turn 12.
- `region`'s 24 regions: turn 4 uses countries, so payroll and POS lists can use them.

The time claim on the landing page and the /demo promo is removed until a median completion time has been measured; then it states the measured figure.

### 3.3 Report

| Section | Content | Source |
|---|---|---|
| Your operation | Profile line: concepts · N locations · countries · team size | turns 2-5 |
| Where profit is most likely leaking | Up to 3 hypotheses from turns 8-9. Each says what to check, with which data, and that it is a hypothesis until checked against their numbers. No amounts. | rules engine (AI may rewrite the explanation; section 5) |
| How Sundae would close the loop on them | For each hypothesis: which Profit Recovery check watches for it, the data it needs (POS, labour, recipes, invoices), who would own the fix (a named manager, one tracked action), and how the result is measured against a baseline. Results are directional until confirmed. Uses the turn 10 answer, e.g. "Today you check next month's P&L; this measures each fix on its own." | rules engine + fixed copy |
| Running the day | Only if Crew needs exist: the items from turns 6-8, the Crew package that covers them, and what it covers. "Crew is optional - you can keep your HR system" when turn 12 includes an HR or payroll system. Payroll note: "Payroll availability is confirmed for your country before setup." | Crew rule (4.2) |
| Your starting package | The Core package. A fixed "Included with every Core package" row: Pulse, Benchmarks, Ask Sundae, Profit Recovery. The Crew package. Optional add-ons (Foresight & Action, Watchtower scoped separately, relevant concept modules). List price for the exact location count. **Open in the pricing calculator** with the same selection prefilled (`pricingLink.ts`). | rules + catalogue snapshot |
| Your first 90 days | 30 / 60 / 90 steps, keeping today's rules: day 30 is connect, reconcile and pilot; nothing all-outlet in one sprint. | AI or rules |
| Next step | **Choose a time** (inline booking, section 7), or "I'll use the email link". | backend token |

**Removed:**
- the "Current spend" and "EBITDA uplift" tiles (D14);
- the soft-uplift list (D9). Where a team benefit is worth saying, it is phrased as what changes ("schedules built against forecast demand"), not as an outcome ("cuts churn").

### 3.4 Ending and booking
- After the report renders, the lead is delivered through the existing outbox, with source `guided-diagnostic`, `metadata.report` and `metadata.convo`.
- If the response carries a booking token, the report's final card offers **Choose a time** and opens the existing `BookingView` hand-off from the guided booking (same focus handling, same limits).
- Without a token (personal email, repeat email, delivery still retrying), it shows the current wording: the report and a booking link are in the operator's inbox.

### 3.5 Classic form and resume
- During the experiment, the current stepper remains the classic variant. It uses the same question bank (section 6.1), so both variants ask the same things.
- "Use the classic form" carries answers over. Refresh resumes from sessionStorage. Today's localStorage resume key is kept for the classic variant.

---

## 4. Recommendation rules (deterministic)

All rules live in one module and are unit-tested with fixed profiles (section 9). Package contents come from `catalogSnapshot.json`, never from prose.

### 4.1 Core package

Each turn-9 chip maps to modules:

| Chip | Needs | In |
|---|---|---|
| staffing vs how busy it is | labor | all |
| voids, discounts and refunds | revenue_assurance | all |
| food cost vs recipe and waste; items running out | inventory | Margin, Performance |
| supplier price creep | purchasing | Margin, Performance |
| menu prices and item margins | inventory (recipe costing) | Margin, Performance (**confirm**: item profitability is an Insights module, not listed as a catalogue module) |
| delivery commissions | delivery | Margin, Growth, Performance |
| reservations and no-shows | reservations | Growth, Performance |
| guests not coming back | guest_crm, guest_experience | Growth, Performance |
| planning next week's sales and staffing | foresight | Performance, or Foresight & Action with any package |
| competitor prices and local events | Watchtower | with Growth or Performance only |

Pick the smallest package that covers the needs:
- **Foundation:** only Foundation modules needed, or "not sure yet".
- **Margin:** any of inventory or purchasing, and none of marketing, reservations or guest modules.
- **Growth:** any of reservations or guest modules, and none of inventory or purchasing.
- **Performance:** needs from both sides.
- Delivery alone counts as Margin, the cost side (**confirm**).

Add-ons:
- Planning need with Foundation, Margin or Growth: offer **Foresight & Action** as an optional add-on, priced separately. With Performance it is included.
- Competitor need: **Watchtower** only if the package is Growth or Performance and the operator has 6 or more locations. It is listed as "scoped separately" and kept out of the headline price, as today. With Foundation or Margin, the report says "Watchtower is available with Core Growth and Core Performance".

Every report shows the "Included with every Core package" row: Pulse, Benchmarks, Ask Sundae, Profit Recovery (owner, 17 Nov).

### 4.2 Crew package

Needs from turns 6 and 8:

| Signal | Crew module |
|---|---|
| schedules | crew_scheduling (also granted by crew_operations) |
| time clock and attendance; overtime; no-shows and late swaps; buddy punching | crew_tna |
| opening and closing checklists; shift logbook and handover; staff files and onboarding; compliance paperwork | crew_operations |
| payroll prep; payroll errors; tips | crew_payroll |
| training | crew_people_intelligence |

Choose the **lowest list-price option that covers every needed module** for the exact location count, from:
- the website's Crew SKUs: Crew Starter, Crew Schedule, Crew Manage, Crew Time, Crew Pay, Crew People;
- the bundles: Schedule & Time, Crew Operating, Crew Complete.

Rules:
- **Crew Starter** is eligible only with 5 or fewer locations, a team of up to 15 per location (its soft cap), and scheduling as the only need. It can't be combined with other Crew SKUs.
- On equal price, prefer the bundle.
- Staff turnover alone adds no module; it is mentioned in the narrative only.
- No Crew needs: no Crew line. If turn 12 includes an HR or payroll system, the report says Crew is optional and Core works with the existing HR.

These rules reproduce the booking flow's notes: tasks and logbook are in Crew Operating and Crew Complete; tips are in those or with Crew Pay.

### 4.3 Concept modules

Turn 2 answers map to concept modules:
- hotel F&B → Hotel F&B
- franchise → Franchise
- cloud kitchen or virtual brands → Cloud Kitchen
- catering and events → Catering
- central kitchen → Production

They are listed as "relevant to your operation, priced in the calculator", not added to the headline figure (decision Q6).

### 4.4 Price

- Price only from the exact location count (turn 3) and the catalogue snapshot, with marginal bands, as `bandedMonthlyTotal` does today.
- Above the published bands: "Quoted for your estate" plus the calculator link. No extrapolation.
- The calculator link carries the same selection, so the operator sees the same figure there. A test asserts the two match.
- Crew line: if the live staff allowance is confirmed (D11), state "includes up to {n} staff per location; more are priced per employee in the calculator". Until then, state that the Crew figure assumes the standard per-location allowance.
- The snapshot is checked with `npm run pricing:check` before release.

---

## 5. AI narrative

**Decision Q1:** keep the AI-written narrative (recommended) or make the report fully scripted.

| | A. Keep AI for narrative (recommended) | B. Fully scripted |
|---|---|---|
| Tailoring | Reads their 90-day priority and connects their answers in plain language | Template sentences; priority quoted back verbatim |
| Cost | One model call per report (current providers); actual spend from the provider dashboards | None |
| Risk | Prose can drift; needs the stricter guard below | None from the model |
| Work | Prompt rewrite + guard | Templates for every combination in 22 locales |

**If A:**
1. The AI writes only these fields: the summary (2-3 sentences), each leak's explanation, the 30/60/90 step text, and one Crew sentence. Everything else comes from the rules.
2. The prompt's product section is generated from one facts module shared with the booking flow's `packageNotes.ts` and the catalogue snapshot. It includes Profit Recovery and Crew's daily-operations scope. It contains no internal terms, no Egypt and no unverified horizons or metric counts.
3. Role framing changes emphasis only, never money: finance leads with where cost is unexplained and how a fix is measured; operations with the shift; owner with the one move that matters most; people/HR with the team items. The words EBITDA, savings and uplift are removed from the prompt except in the rule forbidding them.
4. **Guard on every AI text field.** A field is replaced with the rules engine's sentence if it contains any of:
   - a currency symbol or code;
   - a percentage;
   - a number followed by k or m;
   - EBITDA, savings, ROI, uplift or payback;
   - a product name not in the recommended stack;
   - the internal terms list (moat, NodeScope, substrate, network effect);
   - a model or vendor name;
   - the first name more than twice in the report.

   This extends `reportGuard.ts`, which today checks only quick wins.
5. Adversarial unit tests: generated objects containing each violation must come out clean.

---

## 6. Technical design

### 6.1 One question bank, two renderers
- Rewrite `src/lib/diagnostic/questions.ts` as the script in section 3.2, with stable ids, `showWhen` conditions and option keys.
- The stepper (classic) and the conversation (guided) both render from it, so the questions and validation are defined once.
- Retire the unused bank questions:
  - `avg_unit_volume`, `budget_band` and `tech_headcount`: no reads in the engine.
  - `decision_data`, `blind_spot`, `timeline` and `decision_lag`: read only by the engine or prompt, and not asked publicly. Remove their reads too.

### 6.2 Conversation engine reuse
- The booking machine (`src/lib/leadConversation/machine.ts`) hard-codes its step list. Rather than generalise it during the booking experiment, extract the presentational pieces into shared components with no behaviour change, guarded by the booking E2E suite:
  - message log, single and multi chips, text and number input;
  - the searchable POS picker;
  - the company confirm;
  - progress, back and edit;
  - the classic switch;
  - the booking hand-off.
- The diagnostic gets its own small machine (`src/lib/diagnosticConversation/`) driven by the question bank.
- Shared inference: one free-mail list (the booking one, which matches the backend's) replaces `enrich.ts`'s (D13); company from domain; country from `x-vercel-ip-country`.

### 6.3 Generation and lead
- `/api/diagnostic` is unchanged in shape. It receives the new answers, runs the rules engine, then the AI narrative (if Q1 = A) and the stricter guard.
- Lead delivery uses the existing outbox to `/api/cta/submit`, with source `guided-diagnostic` (classic keeps its current source) and `metadata.convo` (answers by key, version, variant). No personal data in analytics.
- `/api/cta/submit` returns `bookingToken` to the browser for `guided-diagnostic` as well as `guided-booking`. The backend rule is unchanged: a new lead, a work email, and no earlier lead for that email (PR #2606).

### 6.4 Analytics (PostHog)
- Keep the existing `diagnostic_*` events, adding `variant` and `surface`.
- Add `diagnostic_turn_answered` (turnId, index, skipped, msSinceStart), `diagnostic_turn_edited`, `diagnostic_switched_to_classic`, `diagnostic_booking_opened` and `diagnostic_booking_booked`.
- No names, emails, phone numbers or free text in events.

### 6.5 Experiment
- Same mechanism as the booking (decision D4 there) with its own flag: `NEXT_PUBLIC_GUIDED_DIAGNOSTIC` = off (default when unset) / split / on.
- Its own cookie `sundae_diag_variant` (90 days, functional), so the two experiments stay independent; `?guided=1|0` for QA.
- Read results after at least 2 weeks and at least 40 starts per variant, whichever is later. Read traffic from PostHog; Vercel Web Analytics is not enabled on the project.
- Promote guided only if all hold:
  - start-to-report completion is not lower;
  - report-to-booking is not lower;
  - generation and delivery errors are not higher;
  - there are no open accessibility or localisation defects.
- Switch off at once on a completion drop of 10 points or more.

### 6.6 Localisation and accessibility
- All 22 website locales through the diagnostic's own pipeline: `i18n.ts`, `questionTranslations.ts` and the Asia, Europe and Indic option packs. Native review is required.
- Arabic and Urdu right-to-left; country names localised.
- `scripts/qa-diagnostic-i18n.mjs` plus the website QA gates must pass.
- Accessibility as in the booking spec section 5 (WCAG 2.2 AA), including focus moving into and out of the booking dialog.

---

## 7. Backend

- **None required** for Phases A and B.
- Phase C uses the existing guided booking token: the website already sends `metadata.convo`, and PR #2606 adds the repeat-email rule.
- **Report link expiry (decision Q4: yes).**
  - **New links:** `ReportAccessToken.sign` adds an expiry 90 days ahead.
  - **Old links:** `verify` still accepts the old format with no expiry, so links already emailed keep working.
  - **Expired link:** `GET /api/v1/public/marketing/leads/report?token=` answers `410 {"error":"report_link_expired"}` when the signature is valid but the link has expired, and keeps answering 404 for anything invalid.
  - **Re-send:** new `POST /api/v1/public/marketing/leads/report/resend` with body `{ "token": "<expired token>" }`. It always answers `202 {"ok":true}`, so it can't be used to discover which leads exist. When the signature is valid, it re-sends the report email, with a fresh 90-day link, to the address on file. It is rate-limited per lead (once per hour) and per IP.
  - Add the route to the API inventory. No other behaviour changes.
  - **Website:** the report page shows "This link has expired - email me a new one" on 410, calling the website proxy `POST /api/diagnostic/report/resend`, which forwards to the backend. This ships in the Phase A PR and feature-detects the 410, so it is safe before the backend lands.

---

## 8. Phases

| Phase | Scope | Repo | Can start |
|---|---|---|---|
| A. Content and rules | Sections 2.1, 4 and 5 in the **current stepper**: new question bank, rules engine, prompt and guard, report sections, landing copy, all locales. Ships straight to `main` (it corrects wrong recommendations), no split. | sundae-website | now |
| B. Conversation | Section 3 in the guided renderer, shared components (6.2), analytics, split flag off by default | sundae-website | after PR #285 merges |
| C. Inline booking from the report | Token pass-through for `guided-diagnostic`, report final card | sundae-website | with or after B |
| Report link expiry | Section 7 (backend half; the website half is in Phase A) | sundae-backend | now |

---

## 9. Test plan
- **Rules fixtures** (unit), at least these 12 profiles with the expected Core package, Crew option, add-ons, concept modules and price:
  - 1 café, 8 staff, schedules only → Crew Starter;
  - 3 outlets, payroll + tasks → Crew Operating;
  - 12 outlets, food cost + guests → Performance;
  - 40 outlets with competitors and Growth → Watchtower scoped;
  - 300 outlets → quoted;
  - and so on.
- **Guard** (unit): adversarial AI outputs for every banned pattern in section 5.4.
- **Script** (unit): branching (turn 7 only with payroll or tips; turn 8 skipped on "none"), skip, edit, resume, classic carry-over.
- **Copy grep** (unit): no "Egypt", "14-90", "moat", "NodeScope", "substrate", "EBITDA uplift" or "AI-guided · about 7 minutes" in prompt or rendered copy.
- **E2E** (Playwright): classic and guided happy paths; Core-only operator; Crew-heavy operator; AI failure falling back to the rules report; outbox retry; inline booking with the booking fixture; no-token ending.
- **Visual:** dark and light, 390 and 1440, EN / AR / DE, against the booking design board.
- **Dev end to end:** as done for the booking on 20 Nov, with a `.test` address against the dev backend.

## 10. Acceptance criteria
1. The Crew and Core recommendations match the rule tables in section 4 for every fixture.
2. Every report shows Pulse, Benchmarks, Ask Sundae and Profit Recovery as included with the Core package.
3. Watchtower appears only with Growth or Performance, a competitor signal and 6 or more locations.
4. No AI text field containing a banned pattern reaches the operator.
5. A price appears only from an exact location count, and it equals the calculator's figure for the same selection. Above the bands, the report shows "Quoted".
6. Profit Recovery is explained for each hypothesis without any amount.
7. The typical path is 15 turns or fewer, optional turns can be skipped, and answers survive refresh and the classic switch.
8. All 22 locales pass the diagnostic and website QA scripts, with right-to-left layout correct in Arabic and Urdu.
9. Accessibility meets the booking spec section 5 bar, including dialog focus.
10. The guided variant is off by default, and merging changes nothing for visitors.
11. Leads arrive with `metadata.report` and `metadata.convo`. A new work-email lead gets **Choose a time**; others get the email ending.

## 11. Decisions (settled 20 Nov 2026: all as recommended)

| # | Question | Decision |
|---|---|---|
| Q1 | Keep the AI-written narrative or go fully scripted? | Keep it, with the stricter guard (section 5). |
| Q2 | Price in the report? | Yes, from an exact location count, with the calculator link prefilled. |
| Q3 | Which forecast horizon may Foresight claim? | None until product confirms one figure; the website itself says 14-90, 14-365 and 3-7 days in different places. |
| Q4 | Report links expire? | New links expire after 90 days, with "email me a new link"; old links keep working. |
| Q5 | Email first or last? | Last, as "Where should I send your report?"; name first. |
| Q6 | Concept modules in the report? | Listed as relevant and priced in the calculator, not in the headline figure. |
| Q7 | Ship Phase A (content fix) before the conversation? | Yes. It fixes wrong recommendations now and has no dependency on PR #285. |
| Q8 | Recommend Crew Starter for very small teams? | Yes, under the caps in 4.2. |
| Q9 | Two mappings to confirm with product: menu and item margins → Margin; delivery alone → Margin. | Confirm or correct. |

**Follow-up decisions (20 Nov 2026, after reviewing PR #288):**
- **Crew Manage may be recommended** when it is the cheapest option covering the needs. The shared notes become "Tasks and the logbook are in Crew Manage, Crew Operating and Crew Complete." and "Tip workflows are in Crew Operating and Crew Complete, or with Crew Pay."
- **The backend report email loses its savings / EBITDA "what it's worth" section** and preheader promise (a separate backend PR).
- **Phase A merges only once all 21 non-English locales are native transcreations**, not machine drafts.

## 12. Out of scope
- Fixing the inconsistent Foresight horizons elsewhere on the website (flagged for the website backlog).
- Changing the report email design.
- In-app reuse.

## 13. Build plan (after approval)
- **One website build session** (`guided-diagnostic-web`, own worktree from latest `origin/main`). It delivers:
  - Phase A as one PR to `main`;
  - after PR #285 merges, Phases B and C as a second PR;
  - neither merged without the owner's go-ahead.
- **Backend** (`diagnostic-report-expiry-api`, own worktree from latest `origin/develop`): one small PR to `develop` for section 7.
- **Launch sequence** (owner approves each step):
  1. Merge Phase A.
  2. Verify on production with a `.test` lead, then archive that lead in the admin inbox.
  3. Merge B and C with the flag unset.
  4. Verify on a dev-connected preview.
  5. Set `split`.
  6. Read results.
