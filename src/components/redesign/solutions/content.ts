import type { SolutionPageData } from "./SolutionPageTemplate";

/**
 * Solutions page content — pure data (string keys for icons + mockups).
 *
 * The template (SolutionPageTemplate) looks up the actual React components
 * from registries based on these keys. This keeps the data file safe to
 * pass from server components without crossing the server/client React
 * component-reference boundary.
 *
 * Each page mirrors the new homepage's voice: pain headline, outcome
 * subhead, "Today vs With Sundae" pacing-contrast comparison, three
 * capability cards with intel-layer chips, italic closing line.
 */

/* ─── Roles ────────────────────────────────────────────────────── */

export const operationsLeaders: SolutionPageData = {
  eyebrow: "FOR OPERATIONS LEADERS",
  headline: "You can't be in every restaurant at once.",
  subhead:
    "Pulse and Watchtower give you live shift visibility across every location, with the market context teams need to act before the shift is over.",
  todayTitle: "Today",
  todayPoints: [
    "Wait for the weekly recap.",
    "Trust the GM call.",
    "Audit voids on Friday.",
    "React after the week is gone.",
  ],
  todayFooter: "By Friday's review meeting.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "Live pacing across every location.",
    "Coach signals while the shift is running.",
    "Voids and exceptions flagged per shift.",
    "Act before lunch peak ends.",
  ],
  withSundaeFooter: "By 11:14 Tuesday.",
  capabilitiesEyebrow: "WHAT YOU'LL SEE",
  capabilitiesHeadline: "The shift-floor view, every location, every service.",
  capabilities: [
    {
      iconKey: "activity",
      title: "Live shift intelligence",
      body: "Pacing, labor, leakage, comps, voids, and service exceptions — updated through the shift, not after the recap.",
      intelLayer: "Pulse",
    },
    {
      iconKey: "eye",
      title: "Cross-location patterns",
      body: "Portfolio leaderboards. Coach-signal patterns that scale across the group. Underperformers surfaced shift-by-shift.",
      intelLayer: "Insights",
    },
    {
      iconKey: "network",
      title: "External market signals",
      body: "Weather, local events, competitor pricing, daily AI briefings — so teams know the market context before it hits the numbers.",
      intelLayer: "Watchtower",
    },
  ],
  mockupKey: "pulse",
  connectedSystems: [
    "POS (Toast, Square, Lightspeed, Oracle)",
    "Labor scheduling",
    "Inventory",
    "Delivery platforms",
    "Reservations",
    "Kitchen display",
  ],
  closingLine: "Operations leadership stops being a recap. It becomes a feed.",
};

export const financeTeams: SolutionPageData = {
  eyebrow: "FOR FINANCE & FP&A",
  headline: "Three days to understand margin is three days too late.",
  subhead:
    "Sundae shows margin variance the day it happens — not at the next month-end review — with cause attribution across labor, food cost, and pricing.",
  todayTitle: "Today",
  todayPoints: [
    "Variance shows up in last month's P&L.",
    "Delivery commission reconciliation takes a week.",
    "Cost spikes are explained after the cost is booked.",
    "Forecasting is a quarterly exercise.",
  ],
  todayFooter: "By month-end review.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "Margin variance, the day it happens.",
    "Live commission reconciliation per channel.",
    "Cost spikes flagged within the shift.",
    "Foresight runs every cycle, not every quarter.",
  ],
  withSundaeFooter: "Shift-by-shift, not month-by-month.",
  capabilitiesEyebrow: "WHAT YOU'LL SEE",
  capabilitiesHeadline: "Margin intelligence at the speed of the operation.",
  capabilities: [
    {
      iconKey: "lineChart",
      title: "Live margin variance",
      body: "Daily margin against forecast, with shift-level attribution to labor, food cost, voids, comps, and pricing.",
      intelLayer: "Insights",
    },
    {
      iconKey: "coins",
      title: "Channel and platform reconciliation",
      body: "Net margin by channel — dine-in, delivery, catering, retail — with platform commission reconciliation in line.",
      intelLayer: "Insights · Revenue Assurance",
    },
    {
      iconKey: "chartArea",
      title: "Forward-looking forecasts",
      body: "14–90 day forecasts for revenue, labor, and profit with confidence bands and what-if scenarios.",
      intelLayer: "Foresight",
    },
  ],
  mockupKey: "revenueIntelligence",
  connectedSystems: [
    "POS",
    "Accounting (QuickBooks, Xero, NetSuite)",
    "Payroll",
    "Delivery commissions",
    "Banking & payments",
    "Inventory cost",
  ],
  closingLine: "Close faster. Explain more. Plan further out.",
};

export const cSuite: SolutionPageData = {
  eyebrow: "FOR CEOS AND OWNERS",
  headline: "Your worst location is invisible until Thursday's recap.",
  subhead:
    "Sundae Intelligence delivers daily AI briefings across every brand and location — so portfolio truth lands in the morning, not at the weekly review.",
  todayTitle: "Today",
  todayPoints: [
    "The weekly portfolio recap arrives Wednesday.",
    "Margin patterns get explained on Friday.",
    "Competitive context is built ad-hoc.",
    "Strategic decisions wait for the next P&L.",
  ],
  todayFooter: "Three days behind the operation.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "Daily AI briefing every morning.",
    "Portfolio truth, real-time.",
    "Competitive context daily via Watchtower.",
    "Strategic decisions informed by today's data.",
  ],
  withSundaeFooter: "Inbox at 6 AM. Decision by 9.",
  capabilitiesEyebrow: "WHAT YOU'LL SEE",
  capabilitiesHeadline: "The C-suite view across every brand, market, and metric.",
  capabilities: [
    {
      iconKey: "compass",
      title: "Daily executive briefings",
      body: "AI-written summaries across every brand and location. What changed, why it changed, what to do about it.",
      intelLayer: "Sundae Intelligence",
    },
    {
      iconKey: "briefcase",
      title: "Peer-anchored benchmarks",
      body: "Where your portfolio stands against anonymized peers — RevPASH, average check, labor productivity, and more.",
      intelLayer: "Benchmarks",
    },
    {
      iconKey: "scanSearch",
      title: "Market and competitor intelligence",
      body: "Watchtower tracks weather, events, competitor moves, and footfall signals — daily, not quarterly.",
      intelLayer: "Watchtower",
    },
  ],
  mockupKey: "intelligenceChat",
  connectedSystems: [
    "All 12 data domains",
    "Brand & region rollups",
    "Multi-currency, multi-tax",
    "Web · Slack · Teams · Telegram",
    "Email & PDF briefings",
  ],
  closingLine: "Lead the portfolio. Stop chasing the recap.",
};

export const marketingTeams: SolutionPageData = {
  eyebrow: "FOR MARKETING LEADS",
  headline: "By the time you measure the campaign, the budget is already spent.",
  subhead:
    "Sundae surfaces campaign performance signals — covers, check size, channel mix, attribution — within 24 hours of activation, so you can re-allocate while the campaign is still running.",
  todayTitle: "Today",
  todayPoints: [
    "Campaign ROI lands a week after the campaign ends.",
    "Channel mix decisions wait for the agency report.",
    "Loyalty data lives in the loyalty app.",
    "Promotion impact is anecdotal.",
  ],
  todayFooter: "Next campaign goes in before this one's data does.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "Campaign ROI, day-by-day.",
    "Channel mix updates with each cycle.",
    "Loyalty unified with POS, delivery, reservations.",
    "Promotion impact attributed to covers and margin.",
  ],
  withSundaeFooter: "Re-allocate while it's still running.",
  capabilitiesEyebrow: "WHAT YOU'LL SEE",
  capabilitiesHeadline: "Campaign intelligence that beats the agency report.",
  capabilities: [
    {
      iconKey: "megaphone",
      title: "Campaign performance signals",
      body: "Spend tied to covers, average check, and channel mix — performance signals available within 24 hours of activation.",
      intelLayer: "Insights · Marketing",
    },
    {
      iconKey: "repeat",
      title: "Cross-channel attribution",
      body: "Loyalty + paid + organic + email + SMS unified. Find which channels actually move covers and check size.",
      intelLayer: "Cross-Intelligence",
    },
    {
      iconKey: "target",
      title: "Conversational campaign Q&A",
      body: "Ask Sundae which campaign drove your best Saturday — get a sourced answer in seconds, not a deck in a week.",
      intelLayer: "Sundae Intelligence",
    },
  ],
  mockupKey: "marketingPerformance",
  connectedSystems: [
    "POS (covers, check size, mix)",
    "Loyalty platforms",
    "Paid media (Meta, Google)",
    "Email & SMS",
    "Reservations & delivery platforms",
    "CRM",
  ],
  closingLine: "Campaigns get smarter while they're still running.",
};

export const hrTeams: SolutionPageData = {
  eyebrow: "FOR HR AND PEOPLE LEADS",
  headline: "Labor variance shows up too late.",
  subhead:
    "Pulse shows live labor% by location, server productivity, and overtime risk — by shift, not by month — so schedule decisions stop happening on instinct.",
  todayTitle: "Today",
  todayPoints: [
    "Schedule changes happen on instinct.",
    "OT is paid before it's flagged.",
    "Productivity is measured monthly.",
    "Labor patterns reviewed at month-end.",
  ],
  todayFooter: "After the OT cheque is cut.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "Schedule changes informed by live demand.",
    "OT risk flagged before the shift.",
    "Productivity per shift, per server.",
    "Labor patterns visible by shift, not by month.",
  ],
  withSundaeFooter: "Before the variance hits payroll.",
  capabilitiesEyebrow: "WHAT YOU'LL SEE",
  capabilitiesHeadline: "Labor intelligence at the speed of the schedule.",
  capabilities: [
    {
      iconKey: "users",
      title: "Live labor variance",
      body: "Labor% by location, server, and shift. OT risk flagged before the cheque is cut.",
      intelLayer: "Pulse · Insights",
    },
    {
      iconKey: "activity",
      title: "Server-level productivity",
      body: "Covers per labor hour, upsell rate, void rate per server — surfaced as patterns to coach, not just numbers.",
      intelLayer: "Insights · Labor",
    },
    {
      iconKey: "calendar",
      title: "Forecast-driven scheduling",
      body: "Foresight feeds expected demand into the schedule so coverage matches the night you're actually about to have.",
      intelLayer: "Foresight",
    },
  ],
  mockupKey: "laborOps",
  connectedSystems: [
    "POS (covers, sales per labor hour)",
    "Labor scheduling (7shifts, Deputy)",
    "Time-tracking",
    "Payroll",
    "HRIS",
  ],
  closingLine: "Labor decisions get made when they still matter.",
};

export const techTeams: SolutionPageData = {
  eyebrow: "FOR TECH AND DATA LEADS",
  headline: "Twelve vendor APIs. Five data formats. Zero unified schema.",
  subhead:
    "Sundae unifies POS, labor, inventory, delivery, accounting, reservations, and CRM into 179+ governed data models — with a public API, webhooks, RBAC, and audit trails out of the box.",
  todayTitle: "Today",
  todayPoints: [
    "Every new dashboard request is a six-week integration project.",
    "POS, labor, inventory, delivery don't speak the same language.",
    "RBAC is custom-built per request.",
    "Compliance audits are spreadsheet-driven.",
  ],
  todayFooter: "Six weeks per dashboard.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "New views ship in days.",
    "12 domains unified out of the box.",
    "RBAC and audit trails built in.",
    "Compliance via governed metrics.",
  ],
  withSundaeFooter: "Days, not quarters.",
  capabilitiesEyebrow: "WHAT YOU'LL GET",
  capabilitiesHeadline: "Restaurant-native data plumbing, governed and ready.",
  capabilities: [
    {
      iconKey: "database",
      title: "12 unified data domains",
      body: "POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting, and more — modeled into 179+ governed schemas.",
      intelLayer: "Architecture",
    },
    {
      iconKey: "code",
      title: "Public API + webhooks",
      body: "Pull Sundae's normalized data into your warehouse via the public API. Push state changes via webhook subscriptions. Less custom ETL per new dashboard request.",
      intelLayer: "Platform",
    },
    {
      iconKey: "lock",
      title: "RBAC, audit trails, governance",
      body: "Multi-tenant role-based access, full audit logging, governed metrics — out of the box, not on a roadmap.",
      intelLayer: "Governance",
    },
  ],
  mockupKey: "integrationsHub",
  connectedSystemsEyebrow: "WHAT YOU PLUG INTO",
  connectedSystems: [
    "12 unified data domains",
    "179+ governed models",
    "Public API + webhooks",
    "RBAC + audit trails",
    "Warehouse exports",
    "OAuth & API key auth",
  ],
  closingLine: "Stop building plumbing. Start shipping intelligence.",
};

/* ─── Segments ────────────────────────────────────────────────── */

export const multiLocation: SolutionPageData = {
  eyebrow: "FOR MULTI-LOCATION OPERATORS",
  headline: "Visibility into one location is easy. Visibility across five, ten, or fifty is the problem.",
  subhead:
    "One platform, every location, real-time — with cross-location patterns surfaced automatically and best-practice transfer that scales.",
  todayTitle: "Today",
  todayPoints: [
    "Each GM has their own POS reports.",
    "Cross-location comparisons happen in Excel.",
    "Best-practice transfer is anecdotal.",
    "Underperformers found in monthly review.",
  ],
  todayFooter: "Monthly meeting energy.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "Portfolio leaderboard, live.",
    "Cross-location patterns surfaced automatically.",
    "Coach signals scale across the group.",
    "Underperformers flagged shift-by-shift.",
  ],
  withSundaeFooter: "Real-time portfolio truth.",
  capabilitiesEyebrow: "BUILT FOR THE PORTFOLIO",
  capabilitiesHeadline: "One view across every site, brand, and concept.",
  capabilities: [
    {
      iconKey: "building2",
      title: "Portfolio leaderboard",
      body: "Every location ranked by RevPASH, labor productivity, margin, and exception rate — refreshing through the shift.",
      intelLayer: "Pulse · Benchmarks",
    },
    {
      iconKey: "layers",
      title: "Cross-location intelligence",
      body: "Patterns that win in one site, surfaced as plays for the rest. Best-practice transfer becomes a feature, not a meeting.",
      intelLayer: "Cross-Intelligence",
    },
    {
      iconKey: "briefcase",
      title: "Brand- and region-level rollups",
      body: "Multi-brand, multi-region, multi-currency rollups out of the box. Drill from group → brand → region → site → shift.",
      intelLayer: "Architecture",
    },
  ],
  mockupKey: "pulse",
  connectedSystems: [
    "POS (multi-brand, multi-region)",
    "Labor scheduling",
    "Inventory",
    "Delivery platforms",
    "Accounting",
    "Reservations",
  ],
  closingLine: "Manage the group like it's one operation.",
};

export const franchises: SolutionPageData = {
  eyebrow: "FOR FRANCHISE OPERATORS",
  headline: "Brand standards are easy to set. Brand standards at scale are the problem.",
  subhead:
    "Franchisee performance and brand consistency in one view — so the strongest franchisees become a template, not an exception.",
  todayTitle: "Today",
  todayPoints: [
    "Franchisee P&Ls roll up monthly.",
    "Compliance audits are quarterly site visits.",
    "Best-performing franchisees aren't easily replicable.",
    "Brand drift surfaces in guest feedback and review signals.",
  ],
  todayFooter: "Quarterly compliance cycle.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "Franchisee performance, live.",
    "Compliance via governed metrics.",
    "Best-practice patterns transferable.",
    "Brand drift flagged via guest experience signals.",
  ],
  withSundaeFooter: "Compliance becomes continuous.",
  capabilitiesEyebrow: "BUILT FOR FRANCHISE NETWORKS",
  capabilitiesHeadline: "Performance and consistency, in the same view.",
  capabilities: [
    {
      iconKey: "gitBranch",
      title: "Franchisee performance",
      body: "Live P&L roll-ups by franchisee, region, and brand. Spot the top quartile early — and the bottom quartile earlier.",
      intelLayer: "Insights · Benchmarks",
    },
    {
      iconKey: "workflow",
      title: "Brand consistency at scale",
      body: "Guest experience signals, menu compliance, service speed, and exception rates monitored across every unit.",
      intelLayer: "Insights",
    },
    {
      iconKey: "network",
      title: "Best-practice transfer",
      body: "Cross-Intelligence finds what the top franchisees do differently — and packages it as plays the rest can run.",
      intelLayer: "Cross-Intelligence",
    },
  ],
  mockupKey: "benchmark",
  connectedSystems: [
    "Franchisee POS roll-ups",
    "Brand compliance audits",
    "Guest feedback & review signals",
    "Royalty & commission tracking",
    "Reservations",
  ],
  closingLine: "Make the network as strong as your strongest unit.",
};

export const cloudKitchens: SolutionPageData = {
  eyebrow: "FOR CLOUD KITCHEN OPERATORS",
  headline: "Delivery margin is razor-thin. Platform commissions eat what's left.",
  subhead:
    "Real margin per virtual brand, per platform, per kitchen — with platform-health monitoring built in.",
  todayTitle: "Today",
  todayPoints: [
    "Platform commissions reconciled weekly.",
    "Virtual brand attribution is hand-rolled.",
    "Pickup vs delivery margin lost in the noise.",
    "Platform rating drops surface late.",
  ],
  todayFooter: "Reconciliation by spreadsheet.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "Live commission reconciliation.",
    "Brand attribution unified.",
    "Channel margin separated and surfaced.",
    "Platform health monitored via Watchtower.",
  ],
  withSundaeFooter: "Margin you can actually defend.",
  capabilitiesEyebrow: "BUILT FOR CLOUD KITCHENS",
  capabilitiesHeadline: "Delivery economics, transparent and live.",
  capabilities: [
    {
      iconKey: "truck",
      title: "Real margin per platform",
      body: "DoorDash, UberEats, Deliveroo, Talabat — with commission, packaging, refunds, and adjustments reconciled per order.",
      intelLayer: "Insights · Revenue Assurance",
    },
    {
      iconKey: "layers",
      title: "Virtual brand attribution",
      body: "Multi-brand, multi-platform attribution unified. Know which virtual concept actually contributes margin per kitchen.",
      intelLayer: "Cross-Intelligence",
    },
    {
      iconKey: "wifi",
      title: "Platform health monitoring",
      body: "Rating drift, dispatch latency, refund spikes, platform-side outages — surfaced via Watchtower in time to escalate.",
      intelLayer: "Watchtower",
    },
  ],
  mockupKey: "pulse",
  connectedSystems: [
    "POS (multi-brand)",
    "DoorDash",
    "UberEats",
    "Deliveroo",
    "Talabat",
    "Packaging & inventory",
  ],
  closingLine: "Defend the margin the platforms keep eating.",
};

export const hospitalityGroups: SolutionPageData = {
  eyebrow: "FOR HOSPITALITY OPERATORS",
  headline: "F&B, rooms, events, and catering each have their own report.",
  subhead:
    "One decision view across every revenue stream — with adaptive targets per service type and forecasting that respects the difference between a banquet and a brunch.",
  todayTitle: "Today",
  todayPoints: [
    "F&B reports separate from PMS.",
    "Events analyzed in spreadsheets.",
    "Catering margin tracked in the accounting system.",
    "Cross-revenue intelligence is ad-hoc.",
  ],
  todayFooter: "Three systems, one operation.",
  withSundaeTitle: "With Sundae",
  withSundaePoints: [
    "F&B + rooms + events + catering, unified.",
    "Cross-revenue attribution.",
    "Adaptive targets per service type.",
    "Forecasting per revenue stream.",
  ],
  withSundaeFooter: "One decision view.",
  capabilitiesEyebrow: "BUILT FOR HOSPITALITY GROUPS",
  capabilitiesHeadline: "Every revenue stream in one decision view.",
  capabilities: [
    {
      iconKey: "hotel",
      title: "Cross-revenue intelligence",
      body: "F&B, rooms, events, banquet, and catering unified — with attribution across guest journeys and service types.",
      intelLayer: "Cross-Intelligence",
    },
    {
      iconKey: "zap",
      title: "Adaptive targets",
      body: "Separate targets and pacing logic for restaurant, brunch, banquet, conference, and event service — each with its own rhythm.",
      intelLayer: "Insights",
    },
    {
      iconKey: "chartArea",
      title: "Stream-specific forecasting",
      body: "Forecasts that respect the difference between a 200-cover Friday dinner and a 600-pax wedding banquet.",
      intelLayer: "Foresight",
    },
  ],
  mockupKey: "foresight",
  connectedSystems: [
    "POS (F&B outlets)",
    "PMS (rooms)",
    "Events & banquet systems",
    "Catering management",
    "Reservations",
    "Accounting / ERP",
  ],
  closingLine: "Run the property like the system it actually is.",
};
