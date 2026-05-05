---
title: Sundae Homepage — Spec v1.1
branch: design-polish
status: SECTIONS 1, 2, 3, 4, 7, 8 APPROVED FOR BUILD · Sections 5, 6 require further language review
last-updated: 2026-05-05
---

# Sundae Homepage — Spec v1.1

A single source of truth for the new homepage build. Every section below has wireframe, final copy, animation job + reduced-motion fallback, components used, mockup spec, and claims tagging. No section ships until the spec for that section is approved.

## Changelog v1 → v1.1

- **Section 1 (Hero)**: proof strip "5-min refresh on Core" → "Live Core refresh" to avoid tier-specific stat without visible footnote.
- **Section 3 (Speed/Quality/Cost)**: COST vertex copy softened — "Less than your analyst queue" → "Without adding to your analyst queue"; "Core replaces a stack… without the headcount" → "Core reduces dependence on custom BI dashboards, manual reports, and analyst backlogs."
- **Section 5 (Moats)**: eyebrow / headline / moat phrasing softened from absolutes to defensible steel-man — "structurally can't copy" → "generic BI tools struggle to retrofit"; "no later entrant can recreate" → "hard to copy from a cold start"; "won't solve" → "rarely solve."
- **Section 6 (4D Scene)**: removed specific dollar projection; softened operator language — "cut one line cook" → "adjust one line-cook shift from 11–2 if coverage allows"; "Expected recovery: ~$2,400" → "Projected impact: recover part of the gap if executed before lunch peak." Scene now visibly labeled as illustrative.
- **Section 7 (Proof)**: removed fictional pilot quote entirely. Section degrades to capability stats + logo wall (logo wall hidden if zero approved at launch).
- **Section 8 (CTA)**: trust line replaced with operationally realistic version — "No deck. We open Sundae against your real data" → "No generic demo. We work from your data where available, or from a representative restaurant scenario."
- **Appendix A — HR persona**: pain headline "Your labor cost is 4 points high" → "Labor variance shows up too late" (removed unsubstantiated quantified claim).

---

## 0. Foundation Reference

### Locked Taxonomy

- **Intelligence layers** (product experience spine): Pulse · Benchmarks · Watchtower · Insights · Sundae Intelligence · Foresight
- **Product lines**: Sundae Report · Sundae Core
- **Tiers**: Report Lite (free), Report Plus, Report Pro · Core Lite, Core Pro, Enterprise
- **Retired public names** (architecture-only, never in copy): Scout · Forge · Canvas · Nexus

### CTA Hierarchy

- **Primary (high-intent)**: `Book a Working Session`
- **Secondary (acquisition)**: `Get Your Free Benchmark`
- Tertiary inline: `Compare Report and Core` · `Start with Report Lite`

### Approved CTA copy

> Allowed: "Report Lite is free" · "Start with Report Lite" · "Get your free benchmark" · "Book a working session" · "Compare Report and Core"
>
> Banned: "Sundae Report is free forever" · "Free Report" · "Free tier = Sundae Report"

### Animation Discipline Rule

> **No animation without a conversion job.** Every motion moment must (a) explain the product, (b) dramatize urgency, (c) personalize by role, or (d) prove differentiation. Decorative motion is cut. Every animated section ships with a `prefers-reduced-motion` static fallback that communicates the full idea on first paint.

### Claims Tagging Legend

- **APPROVED PUBLIC** — verified, sourced, can ship today
- **NEEDS VALIDATION** — plausible but requires pilot data or legal sign-off before publication
- **CAPABILITY CLAIM ONLY** — describes architectural capability, not customer outcome (safe but lower-impact)

### Page Structure (8 sections)

| # | Section | Animation Job | Components |
|---|---|---|---|
| 1 | Hero | Explain product (subtle live data tick) | MockupFrame, KPICard, Button |
| 2 | Persona Switcher | Personalize by role | Tabs, MockupFrame, Card |
| 3 | Speed / Quality / Cost Triangle | Prove differentiation | New SVG component, Card |
| 4 | Old Way vs Sundae Way | Dramatize urgency | New side-by-side component |
| 5 | The Three Moats | Explain product | Card, BrowserFrame |
| 6 | 4D Intelligence Scroll Scene | Explain product + dramatize urgency | New GSAP-pinned component |
| 7 | Proof | None (logos fade-in only) | Logo wall, KPICard |
| 8 | CTA | None | Button, Card |

---

## 1. Hero

### Wireframe

```
DESKTOP (≥1024px) — single viewport, no scroll required to see CTAs
┌───────────────────────────────────────────────────────────┐
│  [eyebrow: DECISION INTELLIGENCE FOR RESTAURANTS]          │
│  [HEADLINE — 56px / -0.025em / 700]                        │
│  [subhead — 600px max width / 21px]                        │
│                                                              │
│  [▶ Book a Working Session]   [Get Your Free Benchmark]    │
│                                                              │
│  [proof strip: 4 stats inline, separated by · ]            │
│                                                              │
│  [hero mockup — 880px max, centered, glow-blue shadow]      │
└───────────────────────────────────────────────────────────┘

MOBILE (<640px)
[eyebrow]
[HEADLINE — wraps to 3 lines max, 36px]
[subhead — full width, 17px]
[CTA primary — full width, 48px tall]
[CTA secondary — full width below]
[proof strip — 2×2 grid, 14px]
[hero mockup — full width, 16:10]
```

### Final Copy

- **Eyebrow**: `DECISION INTELLIGENCE FOR RESTAURANTS`
- **Headline**: `Decisions before the margin disappears.`
- **Subhead**: `Your restaurant data lives across POS, labor, inventory, delivery, finance, and the market around you. Sundae unifies it, benchmarks every location against your peers, and tells each team what to do — while there's still time to act.`
- **Primary CTA**: `Book a Working Session →`
- **Secondary CTA**: `Get Your Free Benchmark`
- **Proof strip** (4 stats):
  - `250+ pilot locations` — **NEEDS VALIDATION** (confirm: are these signed pilots or all interested operators?)
  - `12 data domains unified` — **APPROVED PUBLIC**
  - `Live Core refresh` — **CAPABILITY CLAIM ONLY** (generalized; tier specifics surface in the SQC triangle and pricing page)
  - `179 restaurant data models` — **APPROVED PUBLIC**

### Animation Job: Explain Product

**Job**: Show the buyer in 2 seconds that Sundae is *live*, not a static analytics deck.

**Motion**: Within the hero mockup, **one** KPI tile pulses softly every 6 seconds with a fresh number (e.g., revenue ticker increments by ~$40, accompanied by a 200ms green flash). No global motion. No floating shapes. No parallax.

**Fallback (`prefers-reduced-motion: reduce`)**: Static composite, final-state mockup. The number shown is the most recent state. No tick, no flash. The headline + subhead + CTA are all visible from first paint.

### Components

- `BrowserFrame` (existing) wrapping the mockup
- `KPICard` (existing) for the live-ticker tile
- `Button` variants: `primary-gradient` (Book), `secondary-outline` (Benchmark)
- New: `HeroProofStrip` component (4 stats + dividers)

### Mockup Spec

**Render**: Pulse-style "shift command" view at 11:14am Tuesday, Downtown location.
- Top KPI row (4 tiles): Revenue Today ($14,820, +6% vs target), Labor Cost % (28.4%), Covers (218), Pacing Index (1.04)
- Center chart: Revenue pacing line (today vs same-day-last-week), 0–11am, line crosses target around 10:30am
- Right rail: 2 alerts — "Server #4 upsell rate -22% this shift" and "Watchtower: 2-block office-tower fire drill 11–12, expect dip"
- Bottom: Sundae Coach card — "Cut 1 line cook for 11–2; push the $11.99 lunch combo via loyalty"
- Color anchor: Pulse red (`--color-pulse: #EF4444`) on alerts; brand electric blue elsewhere
- Treatment: Live-ticker tile (Revenue Today) is the animated one in the hero

---

## 2. Persona Switcher

### Wireframe

```
DESKTOP
┌───────────────────────────────────────────────────────────┐
│  [eyebrow: ONE PLATFORM. EVERY ROLE.]                       │
│  [section H2: "See Sundae as a [persona name]"]            │
│                                                              │
│  [tabs: COO | CFO | CEO | Marketing | Head of Tech | HR]   │
│                                                              │
│  ┌──────────────────────┬──────────────────────────────┐  │
│  │ [persona pain h3]     │  [mockup — 720px, framed]    │  │
│  │ [pain copy 2 lines]   │                                │  │
│  │                       │                                │  │
│  │ [outcome h3]          │                                │  │
│  │ [outcome copy 2 lines]│                                │  │
│  │                       │                                │  │
│  │ [intel layer chip]    │                                │  │
│  │ [▶ See [persona] demo]│                                │  │
│  └──────────────────────┴──────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘

MOBILE
- Tabs collapse to a horizontal-scroll pill row
- Stack: pain → outcome → intel chip → mockup → CTA
- Mockup full width, 16:10
```

### Final Copy

Section eyebrow: `ONE PLATFORM. EVERY ROLE.`
Section H2: `See Sundae as a [persona name].` (bracketed name swaps as the user picks tabs.)

Per-persona content lives in **Appendix A** (full matrix).

### Animation Job: Personalize By Role

**Job**: Make the buyer self-identify within 5 seconds and see "their" version of Sundae.

**Motion**: On tab change, a 240ms cross-fade + 8px translate-up on the content card. Mockup uses `framer-motion`'s `AnimatePresence` to swap between persona views. No tab indicator slides — keep it instant.

**Fallback**: Tabs work without transition (instant content swap, instant mockup swap). Function preserved, decoration removed.

### Components

- `Tabs` (Radix-based, hand-built or via existing Accordion pattern)
- `MockupFrame` (existing) for each persona's view
- `Card` for the pain/outcome panel
- New: `IntelLayerChip` (small color-coded badge showing which layer this persona spends most time in)

### Mockup Spec

Six distinct mockups, one per persona. Detailed in **Appendix A**. Each rendered against the same `BrowserFrame` shell so the framing reads consistent; only the content inside swaps.

### Claims Tagging

All persona pain/outcome lines are **CAPABILITY CLAIM ONLY** in v1. Do not insert outcome metrics ("$X recovered," "Y% improvement") until the claims bank has validated entries.

---

## 3. Speed / Quality / Cost Triangle

### Wireframe

```
DESKTOP
┌───────────────────────────────────────────────────────────┐
│  [eyebrow: THE OLD TRADEOFF IS DEAD]                        │
│  [headline: Fast. Right. Affordable. Pick all three.]      │
│  [subhead: 1 line]                                          │
│                                                              │
│  ┌────────────┬─────────────────────┬───────────────────┐  │
│  │            │                       │                    │
│  │   [SVG triangle, 480px tall]      │  [active vertex   │
│  │   3 vertices: Speed, Quality, Cost│   detail panel,   │
│  │   Active vertex glows electric    │   400px wide]      │
│  │   blue. Inactive vertices muted.  │                    │
│  │            │                       │                    │
│  └────────────┴─────────────────────┴───────────────────┘  │
│                                                              │
│  [closing line: "That's not a tradeoff. That's the moat."] │
└───────────────────────────────────────────────────────────┘

MOBILE
- Triangle scales to 320px square, sits above
- Detail panel becomes a 3-card stack below
- User can tap any vertex to highlight that card
```

### Final Copy

- **Eyebrow**: `THE OLD TRADEOFF IS DEAD`
- **Headline**: `Fast. Right. Affordable. Pick all three.`
- **Subhead**: `Restaurants used to choose between speed, quality, and cost. Sundae was built to deliver all three at once — that's the entire point.`

**Three vertices:**

| Vertex | Headline | Body |
|---|---|---|
| **SPEED** | `5-minute refresh. 30-second answers.` | `Live shift signals on Pulse. Instant answers from Sundae Intelligence. Forecasts that update every cycle.` |
| **QUALITY** | `Restaurant-specific. Source-cited.` | `179 restaurant data models. Governed metrics. Peer-anchored benchmarks. Source-cited AI answers — not guesses.` |
| **COST** | `Free benchmark to start. Without adding to your analyst queue.` | `Report Lite is free. Core reduces dependence on custom BI dashboards, manual reports, and analyst backlogs.` |

**Closing line**: `That's not a tradeoff. That's the moat.`

### Animation Job: Prove Differentiation

**Job**: Convert "Sundae is just another BI tool" into "Sundae is structurally different" in one scroll.

**Motion**:
- Triangle is an inline SVG. On scroll-into-view, the three vertices ignite in sequence (Speed → Quality → Cost), 800ms each, electric-blue glow + light scale (1 → 1.02 → 1).
- After the third vertex ignites, all three stay lit and pulse softly together.
- Hovering a vertex highlights its corresponding detail card on the right.
- The detail panel cycles through the three vertices automatically every 5 seconds when the section is in view (auto-rotate). Hover or tap pauses the rotation.

**Fallback**: All three vertices are lit on first paint. All three detail cards are visible (3-column grid replaces the rotating panel). No motion. The contrast (`Old way: pick two. Sundae: pick all three.`) is preserved as text.

### Components

- New: `SpeedQualityCostTriangle` — inline SVG with scroll-trigger via Framer Motion's `useInView`
- `Card` for each vertex detail
- New: `RotatingPanel` (auto-cycle with hover-pause)

### Claims Tagging

- "5-minute refresh" → **CAPABILITY CLAIM ONLY** — true for Core Pro tier specifically. Footnote: "5-min refresh on Core Pro; refresh frequency varies by tier."
- "30-second answers" → **APPROVED PUBLIC** if Sundae Intelligence consistently returns under 30s; mark **NEEDS VALIDATION** otherwise.
- "Free benchmark to start" → **APPROVED PUBLIC**
- "Without adding to your analyst queue" → **CAPABILITY CLAIM ONLY** (operational positioning, no quantified claim)
- "Reduces dependence on custom BI dashboards, manual reports, and analyst backlogs" → **CAPABILITY CLAIM ONLY** (positioning, not outcome promise)

---

## 4. Old Way vs Sundae Way

### Wireframe

```
DESKTOP
┌───────────────────────────────────────────────────────────┐
│  [eyebrow: THE REAL ENEMY IS DASHBOARD BUREAUCRACY]         │
│  [headline: 2 lines, large]                                  │
│                                                              │
│  ┌────────────────────────┬─────────────────────────────┐  │
│  │ THE OLD WAY            │ THE SUNDAE WAY              │  │
│  │ [muted gray styling]   │ [electric blue styling]     │  │
│  │                         │                              │  │
│  │ • Wait for reports     │ • Detect the issue          │  │
│  │ • Debate the numbers   │ • Understand the cause      │  │
│  │ • Ask an analyst       │ • Compare the market        │  │
│  │ • React next week      │ • Act today                  │  │
│  │                         │                              │  │
│  │ [time stamp: by Friday]│ [time stamp: by 11:14am]    │  │
│  └────────────────────────┴─────────────────────────────┘  │
│                                                              │
│  [What Sundae replaces — horizontal logo-ish strip]         │
│  Excel · POS dashboards · BI dashboards · analyst queue     │
│  · weekly review meetings                                    │
│                                                              │
│  [closing line: "Same data. Different verdict."]           │
└───────────────────────────────────────────────────────────┘

MOBILE
- Stack vertically: Old Way card, Sundae Way card, replaces strip
- Old Way card has a faint "fading" effect; Sundae Way card is solid/active
```

### Final Copy

- **Eyebrow**: `THE REAL ENEMY IS DASHBOARD BUREAUCRACY`
- **Headline**: `The old way waits for reports. Sundae acts while there's still time.`
- **Old Way list (4 lines, gray)**: `Wait for reports.` / `Debate the numbers.` / `Ask an analyst.` / `React next week.`
- **Old Way time stamp**: `By Friday's review meeting.`
- **Sundae Way list (4 lines, electric blue)**: `Detect the issue.` / `Understand the cause.` / `Compare the market.` / `Act today.`
- **Sundae Way time stamp**: `By 11:14 Tuesday.`
- **Replaces strip eyebrow**: `WHAT SUNDAE REPLACES`
- **Replaces items**: `Excel exports · POS dashboards · BI dashboards · analyst queue · weekly review meetings`
- **Closing line**: `Same data. Different verdict.`

### Animation Job: Dramatize Urgency

**Job**: Make the buyer *feel* the cost of waiting.

**Motion**:
- On scroll-into-view, the **Old Way** column reveals first — each line types in over 250ms with a soft tick sound (no — drop the sound; just the type-in). Total reveal: ~1.2s.
- After the Old Way completes, the **Sundae Way** column animates the same lines but ~3× faster (each line snaps in over 80ms, total ~400ms). The contrast in pacing IS the message.
- The "What Sundae replaces" strip slides in from the right, items appear with a 60ms stagger.

**Fallback**: Both columns and the replaces strip render in their final state on first paint. No motion. The contrast is preserved through styling (Old Way is muted/grayscale; Sundae Way is full-color electric blue).

### Components

- New: `OldWaySundaeWay` — two-column comparison
- New: `ReplacesStrip` — horizontal item list with dot separators

### Claims Tagging

All copy is **CAPABILITY CLAIM ONLY** — describes a behavioral contrast, not a numerical outcome. Safe to ship as drafted.

---

## 5. The Three Moats

### Wireframe

```
DESKTOP
┌───────────────────────────────────────────────────────────┐
│  [eyebrow: WHAT GENERIC BI TOOLS STRUGGLE TO RETROFIT]       │
│  [headline]                                                  │
│  [subhead: 1 line]                                          │
│                                                              │
│  ┌──────────┬──────────┬──────────┐                        │
│  │ MOAT #1  │ MOAT #2  │ MOAT #3  │                        │
│  │ Pulse    │ Watch-   │ Bench-   │                        │
│  │          │ tower    │ mark     │                        │
│  │          │          │ Network  │                        │
│  │          │          │          │                        │
│  │ [icon]   │ [icon]   │ [icon]   │                        │
│  │ [why     │ [why     │ [why     │                        │
│  │ unique]  │ unique]  │ unique]  │                        │
│  │ [proof   │ [proof   │ [proof   │                        │
│  │ artifact]│ artifact]│ artifact]│                        │
│  └──────────┴──────────┴──────────┘                        │
│                                                              │
│  [closing line: full-width, italic]                         │
└───────────────────────────────────────────────────────────┘

MOBILE
- 3 cards stack vertically
- Proof artifact (mini-mockup) sits below the copy in each card
```

### Final Copy

- **Eyebrow**: `WHAT GENERIC BI TOOLS STRUGGLE TO RETROFIT`
- **Headline**: `Three moats dashboards alone don't solve.`
- **Subhead**: `Power BI and Tableau are excellent BI tools. They were not built to run restaurant shifts. Sundae was — and these three layers are hard to retrofit because they combine data, workflow, and network depth.`

**Moat #1 — Pulse (Live Operations)**
- Why unique: `Restaurant-shift-aware logic. Live Core refresh. Speaks "covers, voids, comps, walks" — not generic transaction data.`
- Proof: a thumbnail of the Pulse wallboard view

**Moat #2 — Watchtower (External Intelligence)**
- Why unique: `Weather impact, local events, competitor pricing, daily AI briefings. Not a software problem — a data-partnership and restaurant-domain problem most BI vendors are not built to solve.`
- Proof: a thumbnail of a Watchtower briefing card showing a weather signal + competitor price drop

**Moat #3 — The Benchmark Network**
- Why unique: `Anonymized peer comparisons across operators on the platform. Hard to recreate from a cold start: the comparison engine compounds with every restaurant that joins.`
- Proof: a thumbnail of a RevPASH-vs-peers chart with an anonymized cohort

**Closing line**: `That's not a feature gap. That's a category difference.`

### Animation Job: Explain Product

**Job**: Reframe "Sundae has a lot of features" into "Sundae has a few defensible moats."

**Motion**:
- Each card scroll-fades in with a 100ms stagger (Moat #1 → #2 → #3).
- Hovering a card subtly raises it (`translateY(-4px)` + shadow).
- The proof thumbnail inside each card has a single subtle motion: Pulse's KPI tile blinks once on enter; Watchtower's signal arrow pulses; Benchmark Network's chart line draws once.

**Fallback**: All three cards visible on first paint. No motion. Proof thumbnails are static screenshots.

### Components

- `Card` (existing, with subtle hover lift)
- `BrowserFrame` mini variant (240px wide) for proof thumbnails
- New: `MoatCard` wrapping the existing Card

### Claims Tagging

- "Operators on the platform" (no count) — **APPROVED PUBLIC** (avoids the 250+ exposure here; hero stat handles that and is footnoted)
- "Live Core refresh" — **CAPABILITY CLAIM ONLY**
- "Anonymized peer comparisons" — **APPROVED PUBLIC**
- "Hard to recreate from a cold start… compounds with every restaurant that joins" — **CAPABILITY CLAIM ONLY** (network-effect framing, not a competitor disqualification)

---

## 6. 4D Intelligence Scroll Scene

### Wireframe

```
This section pins for ~3 viewport heights. Scroll progress reveals a single
restaurant scenario unfolding across four dimensions.

[pin start — viewport locked]

  ┌───────────────────────────────────────────────────────────┐
  │ [eyebrow: TUESDAY, 9:14AM]                                  │
  │ [scenario headline updates as scroll progresses]            │
  │                                                              │
  │ ┌──────────────────────────┬───────────────────────────┐  │
  │ │ [animated chart/data      │  [right-rail breakdown    │  │
  │ │  visual that morphs        │   updates with each       │  │
  │ │  through the 4 dimensions]│   dimension]              │  │
  │ │                            │                            │  │
  │ │  1D → 2D → 3D → 4D        │  (text content swaps in)  │  │
  │ └──────────────────────────┴───────────────────────────┘  │
  │                                                              │
  │ [progress dots: ● ○ ○ ○ → ● ● ○ ○ → ● ● ● ○ → ● ● ● ●]    │
  └───────────────────────────────────────────────────────────┘

[pin end]
[final state stays on screen]
[CTA appears: "See it with your data →"]
```

### Final Copy

**Pinned scenario** (visibly labeled `ILLUSTRATIVE SCENARIO — SUNDAE COACH EXAMPLE` at the top of the scene; this label is part of the visual, not a footnote):

> **Eyebrow**: `TUESDAY, 9:14AM. DOWNTOWN LOCATION.`
> **Scenario headline (always visible)**: `Lunch revenue is pacing 14% behind plan. Here's what happens next.`

**Dimension 1 — What Happened** (scroll progress 0–25%):
> `Lunch covers down 22% week-over-week. Average check held flat. So this isn't pricing — it's traffic.`

**Dimension 2 — Plan vs Actual** (25–50%):
> `Down $3,800 against today's forecast. Labor still on baseline — overstaffed for this volume. Margin eroding by the hour.`

**Dimension 3 — Market Context** (50–75%):
> `Watchtower flag: three competitors within 2km dropped lunch combos to $9.99 yesterday. Two-block office tower has a fire drill scheduled 11–12.`

**Dimension 4 — What's Next** (75–100%):
> `Sundae Coach: adjust one line-cook shift from 11–2 if coverage allows. Push the $11.99 lunch combo via your loyalty app. Projected impact: recover part of the gap if executed before lunch peak.`

**Closing line (post-scene)**: `Few dashboards connect the four dimensions. Sundae does it before the shift ends.`
**CTA below scene**: `See it with your data →` (links to Book a Working Session)

### Animation Job: Explain Product + Dramatize Urgency

**Job**: Show what Sundae actually *does* via a single concrete scene. This is the showpiece of the page.

**Motion**:
- GSAP ScrollTrigger pins the section for ~3× viewport heights.
- A single composite visual (chart + alert panel + recommendation card) morphs through 4 states keyed to scroll progress.
- Each dimension's text fades in/out with a 200ms cross-fade.
- Progress dots fill as the user scrolls.
- After dimension 4 plays, the pin releases naturally and the CTA snaps into view.

**Fallback**: A single static section showing all four dimensions stacked vertically as 4 cards (no scroll-pinning, no morphing). The narrative is preserved through reading order. The composite visual collapses to a single static screenshot of the final state. The closing line + CTA are immediately visible.

### Components

- New: `FourDimensionScene` — GSAP ScrollTrigger pinned, dynamic-imported (only loads on homepage)
- New: `DimensionProgressDots` — small indicator
- `BrowserFrame` for the morphing visual container

### GSAP Implementation Constraints

- Dynamic import: `const { gsap } = await import('gsap'); const { ScrollTrigger } = await import('gsap/ScrollTrigger');`
- ScrollTrigger only registers client-side (`'use client'` directive)
- All copy and the static fallback ship server-rendered — JS is enhancement, not load-bearing
- Cleanup on unmount: every ScrollTrigger instance must be `.kill()`-ed

### Claims Tagging

- The entire scenario is **CAPABILITY CLAIM ONLY** — explicitly labeled as illustrative on the visual itself ("ILLUSTRATIVE SCENARIO — SUNDAE COACH EXAMPLE" badge at the top of the scene).
- "Projected impact: recover part of the gap if executed before lunch peak" — **CAPABILITY CLAIM ONLY** (qualitative projection, no quantified outcome).
- All location, time, and competitor specifics are demonstrative and named accordingly. No customer attribution implied.

---

## 7. Proof

### Wireframe

```
DESKTOP
┌───────────────────────────────────────────────────────────┐
│  [eyebrow: WHAT OPERATORS SEE]                              │
│  [headline]                                                  │
│                                                              │
│  ┌─────────┬─────────┬─────────┬─────────┐                │
│  │ stat 1  │ stat 2  │ stat 3  │ stat 4  │                │
│  └─────────┴─────────┴─────────┴─────────┘                │
│                                                              │
│  [logo wall — grayscale, hover-to-color, 4-6 logos]         │
│  (rendered ONLY if at least one logo has explicit           │
│   permission; otherwise the section ends after the stats)   │
└───────────────────────────────────────────────────────────┘

MOBILE
- Stats 2×2
- Logo wall scrolls horizontally if more than 3 logos
- If no approved logos at launch, mobile renders stats only
```

### Final Copy

- **Eyebrow**: `WHAT OPERATORS SEE`
- **Headline**: `Built with operators across QSR, casual, fine dining, cloud kitchens, and hospitality groups.`

**Stat tiles**:
| Stat | Tag |
|---|---|
| `12 data domains` unified per restaurant | **APPROVED PUBLIC** |
| `179` restaurant-specific data models | **APPROVED PUBLIC** |
| `30+` analytics modules across all domains | **APPROVED PUBLIC** (use 30+ everywhere — reconcile pricing/modules pages to match) |
| `Live Core refresh` | **CAPABILITY CLAIM ONLY** |

**Pilot quote**: **Removed from v1.1**. No fictional or composite quote ships, regardless of internal tagging. A pilot quote can be added in a follow-up release once a named operator approves attribution and copy.

**Logo wall** (4–6 logos, grayscale-hover-color):
- **NEEDS VALIDATION** — pull only from operators with explicit logo-use permission. If zero are approved at launch, the section renders capability stats only and the logo wall is hidden entirely (no placeholder, no "logos coming soon").

### Animation Job: None on Stats. Logos Fade-In Only.

**Motion**: Logo row (when present) fades in on scroll-into-view with a 60ms stagger. **Stats do not animate** — animating credibility numbers undermines them. They render in their final state.

**Fallback**: Logos render instantly on first paint. Identical to motion state.

### Components

- `KPICard` (existing) for stats
- New: `LogoWall` (grayscale-to-color hover) — conditionally rendered only when at least one approved logo exists

### Claims Tagging Discipline

This section is the most legally exposed. **Do not ship any stat or logo that is not in the claims bank as APPROVED PUBLIC.** If zero logos are approved at launch, ship with the four capability stats only. Pilot quote ships in a follow-up release after a named operator signs off on attribution and copy.

---

## 8. CTA

### Wireframe

```
DESKTOP
┌───────────────────────────────────────────────────────────┐
│             [centered, max 720px]                            │
│                                                              │
│             [headline — 2 lines]                             │
│             [subhead — 1 line]                               │
│                                                              │
│             [▶ Book a Working Session]                       │
│             [Get Your Free Benchmark]                        │
│                                                              │
│             [trust line: small, muted]                       │
└───────────────────────────────────────────────────────────┘

MOBILE
- All elements stack
- CTAs full-width
```

### Final Copy

- **Headline**: `Stop running your restaurants on yesterday's numbers.`
- **Subhead**: `30 minutes with our team and your data — see whether Sundae would genuinely help your operation.`
- **Primary CTA**: `Book a Working Session →`
- **Secondary CTA**: `Get Your Free Benchmark`
- **Trust line**: `Working session is free. No generic demo. We work from your data where available, or from a representative restaurant scenario.`

### Animation Job: None

Static. Fast. Clear. Hover micro-interaction on buttons (existing). No section-level animation — the user has already decided by this point; don't make them wait.

### Components

- `Button` variants (existing)
- `Card` with gradient background (existing pattern)

### Claims Tagging

`No generic demo. We work from your data where available, or from a representative restaurant scenario.` — **CAPABILITY CLAIM ONLY** + operational commitment. Sales team should confirm this matches what they actually do in working sessions before publish.

---

## Appendix A — Persona Content Matrix

Six personas, full content per persona. Each ships with one mockup spec.

### A1 — COO / Operations Leaders (DEFAULT TAB)

- **Pain headline**: `You can't be in every restaurant at once.`
- **Pain copy**: `By the time the weekly recap lands, the bad shift is over and the margin is gone.`
- **Outcome headline**: `Live visibility into every shift.`
- **Outcome copy**: `Pulse shows you which location needs help right now — pacing, labor, leakage, all updated through the shift.`
- **Intel layer chip**: `Pulse · Watchtower`
- **CTA**: `See the COO view →`
- **Mockup**: Pulse multi-location leaderboard. 8-location grid, three flagged amber, one flagged red. Right rail: live alerts. Bottom: a Sundae Coach card targeted at the red location.

### A2 — CFO / Finance & FP&A

- **Pain headline**: `Three days to close the books is three days too many.`
- **Pain copy**: `Variance shows up in last month's P&L. By then the costs have already been booked.`
- **Outcome headline**: `Margin variance, the day it happens.`
- **Outcome copy**: `Shift-level labor cost, food cost variance, void rates — connected to the events that caused them. Close faster, explain more.`
- **Intel layer chip**: `Insights · Foresight`
- **CTA**: `See the CFO view →`
- **Mockup**: Margin variance dashboard. Center: stacked bar showing daily margin vs forecast for current month. Right: "Top 5 variance drivers this week" list — labor overtime, two food cost spikes, one comp anomaly. Bottom: a Foresight 14-day margin projection.

### A3 — CEO / Owners

- **Pain headline**: `Your worst location is invisible until Thursday's recap.`
- **Pain copy**: `By the time you see it, three more days of margin have leaked.`
- **Outcome headline**: `Portfolio truth, every morning.`
- **Outcome copy**: `Daily AI briefings across every brand and location. Where you're winning, where you're leaking, what the market did to you, what to do today.`
- **Intel layer chip**: `Sundae Intelligence · Benchmarks`
- **CTA**: `See the CEO view →`
- **Mockup**: Daily AI briefing. Top: a 4-line executive summary written by Sundae Intelligence. Below: 4 tiles — Revenue, Margin, Top performer, Concern location. Bottom: a peer-benchmark line showing portfolio RevPASH vs segment.

### A4 — Marketing Teams

- **Pain headline**: `By the time you measure the campaign, the budget is already spent.`
- **Pain copy**: `ROI lands a week late. Next month's plan goes in before this month's data does.`
- **Outcome headline**: `Campaign ROI, day-by-day.`
- **Outcome copy**: `Tie campaign spend to covers, average check, and net margin — within 24 hours of activation. Re-allocate while the campaign is still running.`
- **Intel layer chip**: `Insights · Sundae Intelligence`
- **CTA**: `See the Marketing view →`
- **Mockup**: Campaign attribution view. Left: a campaign card with status, spend, dates. Center: a chart with attributed covers/revenue stacked by day. Right: a "what would happen if we extended this 7 more days" Foresight projection.

### A5 — HR / People Teams

- **Pain headline**: `Labor variance shows up too late.`
- **Pain copy**: `Schedule changes happen on instinct. By the time the report comes back, the OT is already paid.`
- **Outcome headline**: `Labor variance, in the moment.`
- **Outcome copy**: `Pulse shows live labor% by location, server productivity, and overtime risk — by shift, not by month.`
- **Intel layer chip**: `Pulse · Insights`
- **CTA**: `See the HR view →`
- **Mockup**: Labor productivity view. Top KPI: Labor% Today across portfolio. Center: server-level productivity ranking with covers per labor hour. Right: overtime-risk alerts. Bottom: turnover trend.

### A6 — Tech / Data Leaders

- **Pain headline**: `Twelve vendor APIs. Five data formats. Zero unified schema.`
- **Pain copy**: `Every new dashboard request becomes a six-week integration project.`
- **Outcome headline**: `One platform, twelve domains, zero plumbing.`
- **Outcome copy**: `POS, labor, inventory, delivery, accounting, reservations — unified into 179 governed data models. RBAC, audit trails, public API, webhooks. Out of the box.`
- **Intel layer chip**: `(All layers)`
- **CTA**: `See the Tech view →`
- **Mockup**: Integration & data unification view. Center: a domain-by-domain status grid (POS, Labor, Inventory, etc.) with sync status. Right: API key & webhook configuration panel. Bottom: data freshness/quality indicators.

---

## Appendix B — Build Sequence

Sections ship to the design-polish preview URL in this order. Each gets its own commit + a quick review pass before the next is built. **Nothing merges to develop until the full page is approved.**

| Order | Section | Why this order | Estimated effort |
|---|---|---|---|
| 1 | **Section 1 — Hero** | Anchors brand, validates mockup approach | M |
| 2 | **Section 8 — CTA** | Static, fast, sets the closing pattern | S |
| 3 | **Section 7 — Proof** | Static, sets data-credibility pattern | S |
| 4 | **Section 4 — Old Way / Sundae Way** | High-impact narrative, no GSAP risk | M |
| 5 | **Section 5 — The Three Moats** | Validates the Card + mini-mockup pattern | M |
| 6 | **Section 3 — Speed/Quality/Cost Triangle** | First custom SVG component, scoped animation | L |
| 7 | **Section 2 — Persona Switcher** | Six mockups + tab logic — biggest content surface | L |
| 8 | **Section 6 — 4D Scroll Scene** | The showpiece. GSAP. Build last when everything else is solid. | XL |

After Section 8 ships and the page reads end-to-end on the preview URL, run:
1. `web-design-guidelines` audit
2. `sundae-qa-auditor` audit
3. Lighthouse + reduced-motion + keyboard-nav check
4. Stakeholder approval
5. Merge `design-polish` → `develop` → production

---

## Appendix C — Performance + Accessibility Budget

### Performance Targets

| Metric | Target | Notes |
|---|---|---|
| LCP | < 2.0s | Hero mockup is the LCP candidate; preload the image, set `fetchpriority="high"`. |
| CLS | < 0.05 | Reserve mockup dimensions explicitly; no font-swap shift (use `next/font`). |
| INP | < 100ms | Persona switcher tab change must feel instant. |
| JS bundle (homepage) | < 180KB gzipped | GSAP only loads on the 4D section via dynamic import. Framer Motion stays. |

### Accessibility Rules

- **Reduced motion**: every animated section ships with the static fallback documented in this spec. No "lite animation" — full final state, instantly.
- **Keyboard nav**: all CTAs, persona tabs, triangle vertices reachable via Tab. Focus indicators use `--electric-blue` 3px ring (already in `accessibility.css`).
- **Screen reader**: every visual element has an accessible label or fallback text. The 4D scroll scene's narrative is in the DOM as readable text — the GSAP morphing is enhancement.
- **Contrast**: 4.5:1 for body, 3:1 for large text. Triangle vertex inactive state must still hit 3:1 against the dark background.
- **Focus order**: tabs must respect arrow-key navigation per ARIA tabs pattern.

### Image / Asset Discipline

- All mockups exported as WebP + AVIF, served via `next/image`, with explicit `width`/`height` to prevent CLS.
- Logo wall logos: SVG where possible, otherwise WebP at 2× resolution.
- Hero mockup: under 80KB after compression.

---

## Open Items (Track and Resolve Before Each Section Ships)

1. **Claims bank seeding** — confirm/source every "NEEDS VALIDATION" tagged claim. Open the claims bank as `docs/redesign/claims-bank.md` in the next deliverable.
2. **Pilot quote attribution** — at least one named operator with logo permission. Without this, Section 7 ships with stats only.
3. **Mockup data accuracy** — every fictional number in mockups must be plausible per `restaurant-intelligence-domain.md` benchmarks. Validate against that skill before render.
4. **Module count lock** — the homepage uses `30+` modules. Reconcile against pricing page (currently says 14 specialized) and modules page (currently says 30+) so all surfaces match. Track as separate cleanup PR.
5. **Working session CTA wiring** — confirm `Book a Working Session` routes to the existing demo form or a new persona-aware form. If the latter, scope as separate work.
6. **Legacy page retirement** — `/product/scout`, `/product/forge`, `/product/canvas`, `/nexus` deletions + 301 redirects. Separate cleanup PR after homepage approval.
7. **Watchtower stale token** — `--color-watchtower-light/-dark` in `tokens.css` still uses old red. Audit usage and retire before homepage ships.

---

*End of spec v1. No component code begins until this document is approved or marked-up section by section.*
