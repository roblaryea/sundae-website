# Mockup → Real-Screenshot Swap Manifest (theme-aware)

Goal: replace hand-built `MockupFrame` components with real Sundae app
screenshots, served theme-aware (dark on dark / light on light) via
`<ThemedShot dark=… light=… />`. Every screenshot must MATCH the marketing
copy at its insertion point.

Theme primitive: `src/components/ui/ThemedShot.tsx` (CSS dual-render off
`html.light`; dark eager, light lazy — default-dark visitors never download
the light twin).

Asset dir: `public/images/product/2026-fresh/`. We already hold a LIGHT
library (60+ shots, captured 2026-06-01). Theme-aware mostly needs the DARK
twin of each used light shot + a few net-new surfaces. Naming convention for
twins: `<name>.png` (light) + `<name>-dark.png` (dark).

Legend: ✅ reuse existing light + capture dark twin · 🆕 capture both ·
🎨 KEEP as crafted mockup (conceptual diagram — clearer hand-built) ·
🌗 both themes already exist.

---

## TIER 1 — Heroes (highest visibility, swap first)

| Page | Mockup (current) | Copy it must match | Real surface | Light asset | Status |
|---|---|---|---|---|---|
| `/intelligence` | IntelligenceChatMockup | "Ask Your Data Anything. Get Answers in Seconds." | Intelligence chat home | `intelligence.png` | 🌗 dark live; need light wired via ThemedShot |
| `/crew` | CrewDashboardMockup | "Every shift becomes signal." | Crew dashboard / workforce overview | `crew-people.png` or crew home | ✅ dark twin |
| `/product/watchtower` | WatchtowerMockup (hero + inline) | "10+ Competitors Tracked Daily. Zero Manual Research." | Watchtower command center | `watchtower-command-center.png` | ✅ dark twin |
| `/report` | BenchmarkDashboardMockup | "Free benchmarking report vs industry standards." | Report / benchmark overview | `benchmark-overview.png` | ✅ dark twin |
| `/solutions` hub | rotating 7 (Exec/Revenue/Pulse/Marketing/Labor/Integrations/Benchmark) | "One platform. Every role you run." | 7 role surfaces | exec-summary, insights-revenue, pulse-*, marketing-*, insights-labor, (integrations 🆕), benchmark-overview | ✅ + 1 🆕 dark twins |

## TIER 1b — Solutions pages (10 heroes, persona-keyed)

Each passes one mockup into `SolutionPageLayout` hero right column. Match the
persona heading to a real surface:

| Page | Mockup | Hero line | Real surface | Asset |
|---|---|---|---|---|
| c-suite-executives | ExecutiveBriefingMockup | "Run the portfolio." | Executive Summary | `insights-exec-summary.png` ✅ |
| finance-teams | RevenueIntelligenceMockup | "Close faster. Explain everything." | Revenue Intelligence | `insights-revenue.png` ✅ |
| cloud-kitchens | RevenueIntelligenceMockup | "Every platform. Every brand. One ledger." | Revenue Intelligence (delivery mix) | `insights-revenue.png` ✅ |
| franchises | BenchmarkDashboardMockup | "Brand standards. Network-wide truth." | Franchise Health / Benchmark | `topology-franchise-health.png` ✅ |
| multi-location-groups | BenchmarkDashboardMockup | "Every brand. Every market." | Topology org tree / outlet viability | `topology-outlet-viability.png` ✅ |
| hospitality-operators | PulseDashboardMockup | "Every F&B outlet." | Pulse leaderboard | `pulse-leaderboard.png` ✅ |
| regional-managers | PulseDashboardMockup | "Run twelve outlets like one." | Pulse leaderboard / wallboard | `pulse-leaderboard.png` ✅ |
| hr-teams | LaborOpsMockup | "Schedule for the shift." | Crew scheduling / Labor Intelligence | `crew-scheduling.png` / `insights-labor.png` ✅ |
| marketing-teams | MarketingPerformanceMockup | "Reallocate the spend." | Marketing Performance | `marketing-channels.png` ✅ |
| technology-teams | IntegrationsHubMockup | "Twelve sources. One governed schema." | Integrations hub / Data & Integrations | 🆕 capture |

## TIER 2 — Homepage persona switcher (6, inline) + Core/Benchmarking inline

| Slot | Mockup | Outcome heading | Real surface | Asset |
|---|---|---|---|---|
| COO | PulseDashboardMockup | "Live visibility into every shift." | Pulse sales/wallboard | `pulse-sales.png` ✅ |
| CFO | RevenueIntelligenceMockup | "Margin variance, the day it happens." | Revenue Intelligence | `insights-revenue.png` ✅ |
| CEO | IntelligenceChatMockup | "Portfolio truth, every morning." | Morning brief / Intelligence | `morning-brief.png` ✅ |
| Marketing | MarketingPerformanceMockup | "Campaign ROI, day-by-day." | Marketing Performance | `marketing-channels.png` ✅ |
| HR | LaborOpsMockup | "Labor variance, in the moment." | Pulse labor | `pulse-labor.png` ✅ |
| Tech | IntegrationsHubMockup | "12 domains, zero plumbing." | Integrations hub | 🆕 capture |
| `/core` inline | PulseDashboardMockup | "Pulse: Your Shift Command Center" | Pulse | `pulse-sales.png` ✅ |
| `/benchmarking` inline | MockupFrame (Revenue Forecast) | "Revenue forecasting using your trends…" | Benchmark forecast | `benchmark-forecast.png` ✅ |
| `/product` hub (2 cards) | Benchmark + Pulse | Report vs Core | benchmark-overview + pulse-sales | ✅ |

## TIER 3 — NEW SHOWCASE: Spatial Intelligence (data-verified 2026-06)

Net-new premium surface set — strongest visual wow-factor, not yet on the
site outside the gallery. Propose a dedicated showcase row (homepage gallery
"Spatial Floor Intelligence" + a section on `/core` or `/product`).

| Visual | Route | Status |
|---|---|---|
| Live Floor | revenue-intelligence/floor | 🆕 both |
| Table Performance | revenue-intelligence/floor | ✅ `floor-table-performance.png` + dark staged |
| Table Turn & Dwell | revenue-intelligence/floor (rv067) | 🆕 both — now data-verified |
| Server-Section Optimizer | revenue-intelligence/floor (rv068) | 🆕 both — now data-verified |
| Demand Forecast | revenue-intelligence/floor (rv069) | 🆕 both |
| Capacity Simulator | revenue-intelligence/floor | 🆕 both |
| Playback | revenue-intelligence/floor | 🆕 both |
| Labor Coverage Floor | labor-intelligence/floor | 🆕 both (now fixed) |
| Guest Sentiment Floor | guest-experience/floor | ✅ `floor-guest-sentiment.png` |
| Shrink Floor Map + Skim Detection | revenue-assurance/floor | 🆕 both |

## TIER 4 — Pulse feature gallery (12 inline) + Foresight/Cross-Intel

Pulse 12 features: most map to existing pulse-* light shots (sales, labor,
leaderboard, leakage, coach, scorecard, wallboard ✅). Net-new: Adaptive
Targets, Server Performance, Alerts/Playbooks, Shift Economics 🆕.

### KEEP AS CRAFTED MOCKUP 🎨 (conceptual — hand-built reads clearer/more premium than a real screen)
- Foresight: **Monte Carlo Risk Analysis**, **Cross-Module Dependency Graph**, **Assumption Registry**, **Accuracy Self-Correction** (abstract/diagrammatic).
- Cross-Intelligence: **Correlation Matrix**, **Cannibalization Detector**, **What Changed Engine**, **Cause & Effect Cards** (diagrammatic).
- Homepage 4D live hero (`HeroLiveDashboard`) — animated, intentionally a mockup (user-confirmed).

### SWAP where a clean real surface exists
- Foresight: Forecast Timeline → `foresight-forecast-table.png`; Scenario Builder → `foresight-scenarios.png`/`foresight-modeler.png`; Executive Briefing → `foresight-briefing.png`; External Signals → (real foresight signals panel). ✅ dark twins.
- Cross-Intelligence: Marketing Impact Timeline, Revenue Waterfall, Campaign Pulse → `insights-cross.png` + targeted captures.

---

## Capture batch summary (what a token session needs to produce)
1. **Dark twins** of the ~25 light shots used across Tiers 1–2 + 4-swap (re-capture each route in dark theme via `sundae_app_theme`/`.dark`).
2. **Net-new (both themes):** integrations hub, spatial set (Live Floor, Table Turn & Dwell, Server-Section Optimizer, Demand Forecast, Capacity Simulator, Playback, Labor Coverage, Shrink/Skim), Pulse adaptive-targets/server-performance/alerts/shift-economics.
3. Light twins already exist for everything in Tiers 1–2 → no re-capture of light needed there.

Then wire each insertion to `<ThemedShot>` and delete the now-unused Mockup
imports per file.
