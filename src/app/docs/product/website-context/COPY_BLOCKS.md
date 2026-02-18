# Sundae — Copy Blocks for Marketing & Product Pages

> Last refreshed: 2026-02-18 | Source: UI component strings, module tile descriptions, and page headers extracted from the codebase
> All copy below is taken verbatim from the code. Use as-is or adapt for marketing pages.

---

## Product Identity

- **App name:** Sundae
- **Package name:** `sundae-app`
- **Category:** Restaurant Decision Intelligence Platform
- **General Product definition:** Sundae is a **Decision Intelligence platform** for restaurant and hospitality operators. 
It ingests internal operational data (POS, labor, inventory, finance) and external signals (benchmarks, delivery aggregators, footfall, weather, pricing, reviews, currency, competitor activity, events), transforming fragmented information into real-time decision views, AI-powered analysis, operational monitoring (Pulse), and conversational access (via Chat with Data).
---

## Module Taglines (Verbatim from Page Headers)

### Pulse
> Source: `src/app/core/pulse/page.tsx:434-437`

**Title:** "Pulse"
**Subtitle:** "Intraday Operations Monitor — detect, act, confirm within the shift."

### Insights
> Source: `src/app/core/insights/page.tsx:176-180`

**Title:** "Insights"
**Subtitle:** "Intelligence modules that turn your restaurant data into actionable insights."

---

## Registration Wizard Copy

> Source: `src/components/auth/Register.Organization.jsx:22-41`

| Step | Title | Subtitle |
|---|---|---|
| 1 | Create Profile | Set up your account to access dashboards and AI-powered insights for your restaurant data. |
| 2 | Verify Email | Confirm your email address so we can secure your account. |
| 3 | Your Organization | Provide details about your organization to get started. |
| 4 | Taxpayer Identification (Optional) | Add your organization's tax identification details now or skip to finish onboarding. |

---

## Pulse — Empty State Copy

> Source: `src/app/core/pulse/page.tsx:393-411`

**Heading:** "Pulse is not configured yet"
**Body:** "Connect a POS integration to start monitoring real-time operations across your restaurants. Once connected, data will begin syncing and Pulse will automatically detect your outlets."
**Helper:** "Already connected a POS system? Data may still be syncing. Try refreshing in a few minutes."
**CTA:** "Go to Integrations"

---

## Benchmark Onboarding Wizard Copy

> Source: `src/components/benchmark/onboarding-wizard.tsx:18-38`

**Header Title:** "Set up Benchmarking"
**Subtitle:** "We've pre-filled your profile from restaurant settings"

**Opt-in disclosure:** "Your anonymized data will be included in compsets. This is a data-for-data network — sharing is required to view benchmarks."

---

## Pricing Tiers (from Frontend Catalog)

> Source: `src/lib/billing/pricing-catalog.ts:37-110`

| Tier | Base Price | Per Location | AI Credits (Base) | AI Credits (Per Location) |
|---|---|---|---|---|
| Report Lite | $0 | $0 | 400 | 80 |
| Report Plus | $59 | $25 | 1,500 | 300 |
| Report Pro | $119 | $45 | 4,000 | 800 |
| Core Lite | $199 | $39 | 8,000 | 1,600 |
| Core Pro | $349 | $35 | 14,000 | 2,800 |
| Enterprise | Custom | Custom | 50,000 | 10,000 |

**Annual discount:** 10%

---

## Onboarding Copy

### Getting Started Page
> Source: `src/components/crew/Onboarding.jsx:103-106`

**Heading:** "Getting Started!"
**Subheading:** "Start by adding your first restaurant to unlock the full Sundae experience."

### Primary Onboarding Task
> Source: `src/components/crew/Onboarding.jsx:56-58`

**Title:** "Add your first restaurant"
**Description:** "Connect your first location to unlock the rest of your onboarding tasks."
**CTA:** "Add Restaurant"

---

## Pulse Module Tile Descriptions

> Source: `src/app/core/pulse/page.tsx:48-210` — All copy verbatim from MODULE_TILES

### Monitor Group
| Tile | Description |
|---|---|
| Sales & Pace | Intraday sales pacing, KPIs, and hourly trends |
| Alerts | Active alerts and incident management this shift |
| Coach | Shift-level coaching signals for Sales, Leakage, and Flow |
| Wallboard | Full-screen display for kitchen or front-of-house |
| History Reports | Daily snapshots, trend analysis, and exportable reports |
| Portfolio | Multi-outlet leaderboard, streak tracking, and coaching |

### Act Group
| Tile | Description |
|---|---|
| Labor Live | Intraday labor pacing, overtime risk, and break compliance |
| Leakage | Void, comp, and discount monitoring this shift |
| Service Speed & Flow | Throughput bottlenecks, backlog, and kitchen pacing |
| Stockout & Critical Inventory | Out-of-stock items, low-stock alerts, and menu impact |
| Menu Intelligence | Item catalog, classification matrix, watchlists, and trend analysis |
| Scorecard | Shift-end performance scorecards with AI insights |
| Goals | Set targets and track progress with coaching nudges |

### Configure Group
| Tile | Description |
|---|---|
| Playbooks | Automated response workflows for exceptions |
| Templates | Browse and install pre-built Pulse configurations |

---

## Benchmark Module Tile Descriptions

> Source: `src/app/core/benchmark/page.tsx:32-103`

| Tile | Description |
|---|---|
| Overview | Index cards, AI insights, and quick metrics |
| Performance | Detailed metrics across financial, operational, and space dimensions |
| Trends | Time-series analysis of your metrics vs compset |
| Forecast | Revenue and cover forecasts with confidence intervals |
| Market Intel | City and district-level market statistics |
| Compsets | Manage your competitive sets and filters |
| Settings | Benchmark profile, data sharing, and preferences |

---

## Insights Module Tile Descriptions

> Source: `src/app/core/insights/page.tsx:35-162`

| Tile | Description | Status |
|---|---|---|
| Performance Report | Visualize sales data, monitor revenue, guest activity, and channel mix across your restaurants. | Enabled |
| Revenue Intelligence | Deep-dive into revenue drivers, pricing analysis, and revenue optimization opportunities. | Coming Soon |
| Labor Intelligence | Workforce analytics, labor cost optimization, and scheduling efficiency insights. | Coming Soon |
| Inventory Intelligence | Stock levels, waste tracking, and inventory turnover analysis. | Coming Soon |
| Purchasing Intelligence | Supplier performance, purchase order analysis, and cost benchmarking. | Coming Soon |
| Marketing Performance Intelligence | Campaign ROI, channel effectiveness, and customer acquisition cost analysis. | Coming Soon |
| Reservations Intelligence | Booking patterns, no-show rates, and table utilization analysis. | Coming Soon |
| Profit Intelligence | Margin analysis, P&L breakdowns, and profitability optimization. | Coming Soon |
| Revenue Assurance | Leakage detection, void analysis, discount tracking, and revenue protection. | Coming Soon |
| Delivery Intelligence | Delivery platform performance, commission analysis, and channel comparison. | Coming Soon |
| Economic Intelligence | Market trends, economic indicators, and macro-level impact analysis. | Coming Soon |
| Guest Experience Intelligence | Review sentiment, satisfaction scores, and guest feedback analysis. | Coming Soon |
| Accounting Intelligence | Financial reconciliation, GL mapping, and automated reporting. | Coming Soon |
| Guest CRM Intelligence | Customer segmentation, loyalty insights, and lifetime value analysis. | Coming Soon |

---

## Integration Domain Labels

> Source: `src/lib/integrations/types.ts:24-41`

| Key | Display Label |
|---|---|
| `pos` | Point of Sale |
| `labor` | Labor & Scheduling |
| `flow` | Service Speed & Flow |
| `availability` | Inventory & Availability |
| `purchasing` | Purchasing & Procurement |
| `reservations` | Reservations & Guest Flow |
| `marketing` | Marketing & Campaigns |
| `guest_experience` | Guest Experience & Feedback |
| `delivery` | Delivery & 3PD |
| `guest_crm` | Guest Profiles & CRM |
| `accounting` | Accounting & Finance |
| `daily_sales_summary` | Daily Sales Summaries |

---

## POS Vendor Descriptions

> Source: `src/lib/integrations/catalog.ts:64-69`

| Vendor | Description |
|---|---|
| Oracle MICROS Simphony | Enterprise POS for hotels and restaurants |
| Square | Payments and POS for small businesses |
| Toast | Restaurant POS and management |
| Clover | POS hardware and software |
| Postgres POS (Database) | Direct database connection to your POS |
| SQL Server POS (Database) | Direct SQL Server / Azure SQL connection to your POS |

---

## Non-POS Vendor Descriptions (Selected)

> Source: `src/lib/integrations/catalog.ts:72-143`

| Vendor | Domain | Description |
|---|---|---|
| 7shifts | Labor | Staff scheduling and labor management |
| HotSchedules | Labor | Employee scheduling |
| Deputy | Labor | Workforce management |
| MarketMan | Purchasing | Restaurant inventory and purchasing |
| MarketMan | Inventory | Inventory management |
| Craftable | Inventory | Bar inventory management |
| BinWise | Inventory | Beverage inventory |
| SevenRooms | Reservations | Guest experience platform |
| OpenTable | Reservations | Restaurant reservations |
| Resy | Reservations | Reservation management |
| Tock | Reservations | Reservation and event management |
| Deliverect | Delivery | Multi-platform delivery aggregator |
| Uber Eats | Delivery | Uber Eats marketplace |
| DoorDash | Delivery | DoorDash marketplace |
| Talabat | Delivery | Talabat delivery platform |
| Meta (Facebook/IG) | Marketing | Facebook and Instagram advertising |
| Google Ads | Marketing | Google search and display ads |
| Mailchimp | Marketing | Email marketing |
| Google Reviews | Guest Experience | Google Business reviews |
| Yelp | Guest Experience | Yelp reviews and ratings |
| Zendesk | Guest Experience | Customer support and feedback |
| SevenRooms | Guest CRM | Guest experience and CRM |
| Toast | Guest CRM | Toast guest profiles |
| Olo | Guest CRM | Digital ordering and CRM |
| QuickBooks | Accounting | Accounting software |
| Xero | Accounting | Cloud accounting |
| Sage | Accounting | Business management |
| FreshBooks | Accounting | Invoicing and accounting |

---

## Watchtower Signal Type Labels

> Source: `src/lib/watchtower/types.ts:126-127`

| Signal Type | Use Context |
|---|---|
| `competitor` | Competitor activity detected |
| `weather` | Weather-driven revenue impact |
| `event` | Local event affecting operations |
| `review` | Notable guest review |
| `market` | Market-level trend signal |
| `promo` | Promotional activity signal |

### Impact Levels
- `positive` — Beneficial signal
- `neutral` — Informational signal
- `negative` — Adverse signal

---

## Watchtower Event Types

> Source: `src/lib/watchtower/types.ts:67`

| Type | Examples |
|---|---|
| `public_holiday` | National Day, Independence Day |
| `religious` | Ramadan, Eid, Christmas |
| `major_event` | Expo, Formula 1, conferences |
| `sports` | World Cup, Champions League, local matches |
| `school` | School breaks, exam periods |
| `seasonal` | Summer peak, winter lull |
| `nearby` | Concerts, festivals near your locations |
| `custom` | User-defined events |

---

## Watchtower Briefing Types

> Source: `src/lib/watchtower/types.ts:147`

| Type | Description |
|---|---|
| `daily` | Morning operational briefing |
| `weekly_competitive` | Weekly competitive landscape summary |
| `event_prep` | Pre-event preparation guide |
| `ramadan` | Ramadan-specific operational briefing |

---

## Permission Labels (User-Facing)

> Source: `src/lib/nav-permissions.js` and `SundaeContext.js`

| Permission | Used For |
|---|---|
| `pulse:view` | Access Pulse real-time operations |
| `dashboards:view` | Access Benchmarks, Watchtower, Insights |
| `integrations:view` | View Data & Integrations |
| `integrations:manage` | Manage integration connections |
| `ai:use` | Access Chat with Data |
| `data:view` | View data sources and sync dashboard |
| `org:settings` | Organization settings, departments, job roles |
| `restaurants:view` | View restaurant list |
| `users:view` | View people/member profiles |
| `roles:manage` | Manage roles and permissions |
| `billing:view` | View billing and usage |

---

## Error Page Copy

### 403 Forbidden
> Source: `src/app/403/page.tsx`

Standard "You don't have permission to access this page" error boundary.

---

## Notes

- All tile descriptions above are extracted verbatim from the codebase and represent the current UI copy.
- "Coming Soon" modules have UI tiles but no functional pages behind them yet.
- Vendor descriptions with status "Upcoming" represent planned integrations that are not yet connectable.
- Needs Confirmation: Exact marketing tagline/hero text for a public-facing landing page was not found in the codebase — the app appears to be a logged-in SaaS product without a separate marketing site in this repo.
