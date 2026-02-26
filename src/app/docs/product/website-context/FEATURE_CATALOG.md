# Sundae — Feature Catalog

> Last refreshed: 2026-02-18 | Source: codebase inspection of UI pages, module tiles, and route definitions

---

## Status Legend

| Badge | Meaning |
|---|---|
| **Live** | Feature is implemented and accessible in the current build |
| **Coming Soon** | UI tile exists but page is placeholder or under development |
| **Upcoming** | Referenced in code/catalog but not yet wired |
| **Needs Confirmation** | Could not fully verify from codebase alone |

---

## 1. Pulse — Real-Time Operations Center

> Route: `/core/pulse/*` | Permission: `pulse:view`

### Monitor Group

| Feature | Description | Status | Route |
|---|---|---|---|
| Sales & Pace | Intraday sales pacing, KPIs, and hourly trends | Live | `/core/pulse/sales` |
| Alerts | Active alerts and incident management this shift | Live | `/core/pulse/exceptions` |
| Coach | Shift-level coaching signals for Sales, Leakage, and Flow | Live | `/core/pulse/coach` |
| Wallboard | Full-screen display for kitchen or front-of-house | Live | `/core/pulse/wallboard` |
| History Reports | Daily snapshots, trend analysis, and exportable reports | Live | `/core/pulse/history` |
| Portfolio | Multi-outlet leaderboard, streak tracking, and coaching | Live | `/core/pulse/leaderboard` |

### Act Group

| Feature | Description | Status | Route |
|---|---|---|---|
| Labor Live | Intraday labor pacing, overtime risk, and break compliance | Live | `/core/pulse/labor` |
| Leakage | Void, comp, and discount monitoring this shift | Live | `/core/pulse/leakage` |
| Service Speed & Flow | Throughput bottlenecks, backlog, and kitchen pacing | Live | `/core/pulse/flow` |
| Stockout & Critical Inventory | Out-of-stock items, low-stock alerts, and menu impact | Live | `/core/pulse/stockout` |
| Menu Intelligence | Item catalog, classification matrix, watchlists, and trend analysis | Live | `/core/pulse/menu` |
| Scorecard | Shift-end performance scorecards with AI insights | Live | `/core/pulse/scorecard` |
| Goals | Set targets and track progress with coaching nudges | Live | `/core/pulse/goals` |

### Configure Group

| Feature | Description | Status | Route |
|---|---|---|---|
| Playbooks | Automated response workflows for exceptions | Live | `/core/pulse/playbooks` |
| Templates | Browse and install pre-built Pulse configurations | Live | `/core/pulse/templates` |
| Data Health | Data quality monitoring and freshness checks | Live | `/core/pulse/data-health` |
| Settings | Module configuration and notification preferences | Live | `/core/pulse/settings` |

### Pulse Notification Event Types

| Event | Description |
|---|---|
| `BEHIND_PACE` | Sales behind expected pace |
| `AVG_CHECK_DROP` | Average check dropped below threshold |
| `VOID_SPIKE` | Void rate exceeded threshold |
| `DISCOUNT_SPIKE` | Discount rate exceeded threshold |
| `OVERSTAFFED` | Staff hours above schedule |
| `UNDERSTAFFED` | Staff hours below schedule |
| `KITCHEN_BOTTLENECK` | Kitchen ticket time exceeds alert threshold |
| `EIGHTY_SIX` | Item marked as 86'd (out of stock) |
| `DATA_STALE` | No events received within staleness threshold |

---

## 2. Benchmarks — Competitive Intelligence

> Route: `/core/benchmark/*` | Permission: `dashboards:view`

| Feature | Description | Status | Route |
|---|---|---|---|
| Overview | Index cards, AI insights, and quick metrics | Live | `/core/benchmark/overview` |
| Performance | Detailed metrics across financial, operational, and space dimensions | Live | `/core/benchmark/performance` |
| Trends | Time-series analysis of your metrics vs compset | Live | `/core/benchmark/trends` |
| Forecast | Revenue and cover forecasts with confidence intervals | Live | `/core/benchmark/forecast` |
| Market Intel | City and district-level market statistics | Live | `/core/benchmark/market` |
| Compsets | Manage your competitive sets and filters | Live | `/core/benchmark/compsets` |
| Settings | Benchmark profile, data sharing, and preferences | Live | `/core/benchmark/settings` |

---

## 3. Watchtower — External Signal Monitoring

> Route: `/core/watchtower/*` | Permission: `dashboards:view`

### Signal Types

| Type | What It Tracks |
|---|---|
| Competitor | Rating changes, review volume, menu price shifts |
| Weather | Temperature, precipitation, predicted revenue/cover impact |
| Event | Public holidays, religious events, sports, school breaks, seasonal, nearby, major events |
| Review | Notable guest reviews with sentiment analysis |
| Market | Market-level trends and economic indicators |
| Promo | Promotional activity signals |

### Watchtower Features

| Feature | Description | Status |
|---|---|---|
| Command Center | KPI cards, signal feed, weather forecast strip | Live |
| Competitor Tracking | Google ratings, review counts, delivery ratings, menu pricing | Live |
| Weather Impact | 7-day forecast with predicted revenue/cover impact percentages | Live |
| Event Calendar | Event tracking with historical revenue impact data | Live |
| AI Briefings | Daily, weekly competitive, event prep, and Ramadan briefings | Live |
| Signal Feed | Real-time signal stream with impact levels (positive/neutral/negative) | Live |

---

## 4. Insights — Intelligence Modules

> Route: `/core/insights/*` | Permission: `dashboards:view`

| Module | Description | Status |
|---|---|---|
| Performance Report | Visualize sales data, monitor revenue, guest activity, and channel mix | Live |
| Revenue Intelligence | Revenue drivers, pricing analysis, and optimization opportunities | Coming Soon |
| Labor Intelligence | Workforce analytics, labor cost optimization, and scheduling efficiency | Coming Soon |
| Inventory Intelligence | Stock levels, waste tracking, and inventory turnover analysis | Coming Soon |
| Purchasing Intelligence | Supplier performance, purchase order analysis, and cost benchmarking | Coming Soon |
| Marketing Performance | Campaign ROI, channel effectiveness, and customer acquisition cost | Coming Soon |
| Reservations Intelligence | Booking patterns, no-show rates, and table utilization | Coming Soon |
| Profit Intelligence | Margin analysis, P&L breakdowns, and profitability optimization | Coming Soon |
| Revenue Assurance | Leakage detection, void analysis, discount tracking, revenue protection | Coming Soon |
| Delivery Intelligence | Delivery platform performance, commission analysis, channel comparison | Coming Soon |
| Economic Intelligence | Market trends, economic indicators, and macro-level impact analysis | Coming Soon |
| Guest Experience Intelligence | Review sentiment, satisfaction scores, and guest feedback analysis | Coming Soon |
| Accounting Intelligence | Financial reconciliation, GL mapping, and automated reporting | Coming Soon |
| Guest CRM Intelligence | Customer segmentation, loyalty insights, and lifetime value analysis | Coming Soon |

---

## 5. Sundae Intelligence — AI-Powered Analytics

> Route: `/core/intelligence/*` | Permission: `ai:use`

| Feature | Description | Status |
|---|---|---|
| Web Chat Interface | Three-panel layout with conversation list, chat, and response cards | Live |
| Conversation History | Persistent conversations with threading | Live |
| Chat Folders | Organize conversations into folders | Live |
| Scheduled Queries | Set recurring queries on a schedule | Live |
| Voice Input | Voice-to-text input for queries | Live |
| Multi-outlet Scope | Select specific outlet or organization-wide queries | Live |
| Link Code Sharing | Generate shareable link codes for conversations | Live |
| Telegram Bot | Sundae Intelligence via Telegram (default + custom org bots) | Live |
| Slack Bot | Sundae Intelligence via Slack (default + custom org apps) | Live |
| Microsoft Teams Bot | Sundae Intelligence via Teams (default + custom org apps) | Live |
| Data Sources | Connect custom PostgreSQL, MSSQL, or file-based data sources | Live |
| AI Credit System | Token-based usage metering via AI wallet | Live |

---

## 6. Integrations Hub

> Route: `/core/integrations/*` | Permission: `integrations:view`

| Feature | Description | Status |
|---|---|---|
| Connections View | Manage active connections per domain per restaurant | Live |
| Health Table | Status and health monitoring of all connections | Live |
| Activity Log | Integration event log with timestamps | Live |
| Request Integration | Modal to request integrations not yet available | Live |
| Status Filtering | Filter by connected, issue, available, upcoming | Live |
| Per-Restaurant Filtering | View integrations scoped to specific restaurants | Live |
| Webhook Integrations | Custom webhook connectors available for all non-POS domains | Live |

### Integration Domains & Vendors

See [CUSTOMER_FACING_API_AND_INTEGRATIONS.md](./CUSTOMER_FACING_API_AND_INTEGRATIONS.md) for the full vendor catalog.

---

## 7. Crew — Organization & Team Management

> Route: `/crew/*`

| Feature | Description | Permission | Status |
|---|---|---|---|
| Restaurants | Add, edit, and manage restaurant locations | `restaurants:view` | Live |
| People (Member Profiles) | Employee directory with job roles and department assignments | `users:view` | Live |
| Organization Settings | Org name, logo, timezone, currency, address | `org:settings` | Live |
| Departments | Create and manage organizational departments | `org:settings` | Live |
| Job Roles | Define job titles and positions | `org:settings` | Live |
| Teams | Create teams and assign members | `org:settings` | Live |
| Organization Chart | Visual tree hierarchy of org structure | `org:settings` | Live |
| Roles & Permissions | RBAC with custom role definitions | `roles:manage` | Live |
| Billing & Usage | Credit usage, plan details, AI usage panel | `billing:view` | Live |
| Internal Messages | Team messaging with threads and reactions | Org member | Live |
| Pending Invitations | Track and manage org invite links | `org:settings` | Live |
| Transfer Ownership | Transfer org ownership to another member | Owner only | Live |

---

## 8. Authentication & Onboarding

| Feature | Description | Route | Status |
|---|---|---|---|
| Login | Email/password login | `/login` | Live |
| Register (User) | Account creation for invited users | `/register` | Live |
| Register (Organization) | 4-step wizard: Account, Email Verify, Org Setup, Tax Info | `/register-organization` | Live |
| Onboarding | "Getting Started" — add first restaurant to unlock features | `/onboarding` | Live |
| Forgot Password | Password reset via email | `/reset-password` | Live |
| Invite Accept | Accept org invitation link | `/invite/accept` | Live |
| Email Verification | Verify email with resend capability | (inline flow) | Live |

---

## 9. Data & Reporting

| Feature | Description | Permission | Status |
|---|---|---|---|
| Custom Views | Saved dashboard views with sharing | `data:view` | Live |
| View Sharing | Grant/revoke view access to other users | `data:view` | Live |
| Data Sources | Manage connected data sources | `integrations:view` | Live |
| Sync Dashboard | Monitor data sync status per connection | `data:view` | Live |
| Document Upload | Upload PDFs and files with OCR (Tesseract.js) | `data:view` | Live |
| CSV/Excel Export | Export capabilities across pulse and reporting pages | Various | Live |
| Daily Insights | AI-generated daily summary with weather data | `dashboards:view` | Live |

---

## 10. Billing & Pricing

| Feature | Description | Status |
|---|---|---|
| Tiered Plans | Multiple subscription tiers with module-based pricing | Live |
| Tier Comparison Matrix | Side-by-side tier feature comparison | Live |
| Self-Serve Checkout | In-app checkout flow (simulation mode in dev) | Live |
| Billing Cycles | Monthly, annual, and 2-year billing options | Live |
| AI Credit Wallet | Per-org credit balance with top-up add-ons | Live |
| Promo Codes | Validate and apply promotional codes | Live |
| Usage Tracking | Per-feature and per-day usage metering | Live |
| Add-ons | Supplementary modules and credit top-ups | Live |

---

## 11. Platform Events (Notification Triggers)

| Event Group | Events |
|---|---|
| Auth | `password_reset`, `email_verification`, `platform_welcome` |
| Invite | `platform`, `admin`, `admin_granted` |
| Social | `new_message`, `new_follower` |
| Organization | `permission_update`, `team_addition`, `welcome` |
| Onboarding | `no_restaurant` (2-day reminder), `no_sales_data` |
| Data Health | `weekly_missing`, `chronic_inactivity` (30+ days), `initial_incomplete` (<6 months) |
| Views | `sharing_granted`, `sharing_revoked` |
| Goals | `GOAL_AT_RISK`, `GOAL_ACHIEVED`, `GOAL_MISSED` |
