# Sundae — Public Changelog

> Last refreshed: 2026-02-18 | Source: git log of `sundae-app` and `sundae-backend` repositories
> Entries are derived from commit messages and grouped by approximate release period.
> Only customer-facing changes are listed. Internal fixes, admin-only features, and infrastructure changes are excluded.

---

## February 2026

### Pricing & Plans
- **Pricing catalog overhaul** — New tier comparison matrix for side-by-side plan comparison; versioned pricing catalog with database-driven pricing.
- **Promo code validation** — Public endpoint for validating promotional codes during checkout.

### Watchtower Module (New)
- **Command Center** — Real-time signal feed with KPI cards showing competitor activity, weather forecasts, and event impacts.
- **Competitor tracking** — Monitor competitor Google ratings, review counts, delivery platform ratings, and menu pricing changes.
- **Weather impact forecasting** — 7-day weather forecast with predicted revenue and cover impact percentages per restaurant.
- **Event calendar** — Track public holidays, religious events, sports events, school breaks, and nearby happenings with historical revenue impact data.
- **AI briefings** — Auto-generated daily, weekly competitive, event prep, and Ramadan briefings.

### Chat with Data V2
- **Three-panel layout** — Redesigned interface with conversation list, chat panel, and response cards.
- **Chat folders** — Organize conversations into custom folders.
- **Scheduled queries** — Set recurring data queries on a schedule.
- **Voice input** — Voice-to-text input for natural language queries.
- **Scope lens** — Select specific outlet or organization-wide scope for queries.
- **Telegram, Slack, and Teams bots** — Chat with your data directly from messaging platforms.
- **Custom org bots** — Connect your own Telegram/Slack/Teams bot credentials for branded experience.

### Benchmark Overhaul
- **Forecast module** — Revenue and cover forecasts with confidence intervals.
- **Market Intel** — City and district-level market statistics.
- **Compset management** — Create and manage competitive sets with configurable filters.
- **Trend analysis** — Time-series comparison of your metrics vs competitive set.

### Pulse Enhancements
- **Menu Intelligence** — Item catalog, classification matrix (Stars/Plowhorses/Puzzles/Dogs), watchlists, and trend analysis.
- **Server Performance** — Individual server metrics and engagement scoring.
- **Scorecard improvements** — Multi-currency support with live forex conversion.
- **Stockout & Critical Inventory** — Out-of-stock items, low-stock alerts, and menu impact tracking.
- **History Reports** — Daily snapshots, trend analysis, and exportable reports.
- **Coach** — Shift-level coaching signals for Sales, Leakage, and Flow.

### Integrations
- **Webhook system** — Customer-configurable webhooks with HMAC-SHA256 signature verification, test payloads, and delivery tracking.
- **Public API v1** — API key-authenticated endpoints for sales summary, exceptions, and pulse status.
- **API key management** — Generate, list, and revoke API keys with configurable rate limits and scopes.

### Crew & Organization
- **Role-based access control (RBAC)** — Custom role definitions with granular permission assignments.
- **Organization invite system** — Link-based invitations with public metadata preview.
- **Transfer ownership** — Transfer organization ownership to another member.

### Notifications
- **Multi-channel notification engine** — In-app, email, Telegram, Slack, and Teams notifications.
- **Per-user notification preferences** — Choose which events trigger notifications and via which channel.
- **Event registry** — Categorized platform and operational events with configurable defaults.

---

## January 2026

### Pulse Operations Platform
- **Sales & Pace** — Intraday sales pacing with KPIs and hourly trend visualization.
- **Labor Live** — Intraday labor pacing, overtime risk tracking, and break compliance.
- **Leakage monitoring** — Real-time void, comp, and discount monitoring per shift.
- **Service Speed & Flow** — Throughput bottlenecks, backlog, and kitchen pacing metrics.
- **Alerts (Exceptions)** — Active alert management with acknowledge/dismiss workflow.
- **Portfolio Leaderboard** — Multi-outlet performance comparison with streak tracking.
- **Goals** — Set targets and track progress with coaching nudges.
- **Playbooks** — Automated response workflows triggered by exceptions.
- **Templates** — Pre-built Pulse configurations for quick setup.
- **Wallboard mode** — Full-screen display mode for kitchen or front-of-house screens.
- **Data Health** — Data quality monitoring with freshness checks and staleness alerts.
- **Demo mode** — Realistic demo data generation for training and evaluation.

### AI & Analytics
- **AI credit system** — Per-organization credit wallet with usage tracking and top-up add-ons.
- **Chat with Data V1** — Natural language queries against restaurant data via web interface.
- **Daily Insights** — AI-generated daily summary with weather data integration.

### POS Integrations
- **Oracle MICROS Simphony** — Enterprise POS live sales, menu items, employees, checks.
- **Square** — POS and payments integration.
- **Toast** — Restaurant POS live sales, menu items, employees.
- **Clover** — POS and payment integration.
- **Database connectors** — Direct PostgreSQL and SQL Server/Azure SQL connections.

### Billing & Pricing
- **Self-serve checkout** — In-app plan selection with billing cycle options (monthly, annual, 2-year).
- **AI credit top-ups** — Purchase additional AI credits as add-ons.
- **Billing documents** — Invoice generation for checkout sessions.

### Insights
- **Performance Report** — Sales data visualization with revenue, guest activity, and channel mix analysis.

### Authentication
- **Email/password registration** with email verification flow.
- **Organization registration wizard** — 4-step process: Account, Email Verify, Org Setup, Tax Info.
- **Password reset** via email.

### Dark Mode
- **System-wide dark mode** — Full dark mode support across all pages with theme toggle.

---

## Notes

- Features marked as "Coming Soon" in the Insights module (Revenue Intelligence, Labor Intelligence, etc.) are not yet available but are planned.
- Integration vendors marked as "Upcoming" in the catalog have UI placeholders but no live adapter implementation yet.
- The public API (v1) is read-only; write operations are handled through the authenticated organization API.
