import type { SolutionPageData } from "./SolutionPageTemplate";
import type { RequiredEnglishLocalizedRecord } from "@/lib/i18n";

/**
 * Solutions page content - locale-keyed, pure data.
 *
 * Each page (10 personas - 6 roles + 4 segments) uses string keys for icons
 * and mockups. The template (SolutionPageTemplate) looks up the actual React
 * components from registries based on those keys, keeping the data file safe
 * to render in any client component without crossing the server/client React
 * component-reference boundary.
 *
 * Voice mirrors the upgraded homepage:
 *   pain headline → outcome subhead → "Today vs With Sundae" pacing-contrast →
 *   three capability cards with intel-layer chips → italic closing line.
 */

export type SolutionsContent = {
  operationsLeaders: SolutionPageData;
  financeTeams: SolutionPageData;
  cSuite: SolutionPageData;
  marketingTeams: SolutionPageData;
  hrTeams: SolutionPageData;
  techTeams: SolutionPageData;
  multiLocation: SolutionPageData;
  franchises: SolutionPageData;
  cloudKitchens: SolutionPageData;
  hospitalityGroups: SolutionPageData;
};

/* ─── EN ───────────────────────────────────────────────────────── */

const en: SolutionsContent = {
  operationsLeaders: {
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
        body: "Pacing, labor, leakage, comps, voids, and service exceptions - updated through the shift, not after the recap.",
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
        body: "Weather, local events, competitor pricing, daily AI briefings - so teams know the market context before it hits the numbers.",
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
  },

  financeTeams: {
    eyebrow: "FOR FINANCE & FP&A",
    headline: "Three days to understand margin is three days too late.",
    subhead:
      "Sundae shows margin variance the day it happens - not at the next month-end review - with cause attribution across labor, food cost, and pricing.",
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
        body: "Net margin by channel - dine-in, delivery, catering, retail - with platform commission reconciliation in line.",
        intelLayer: "Insights · Revenue Assurance",
      },
      {
        iconKey: "chartArea",
        title: "Forward-looking forecasts",
        body: "14-90 day forecasts for revenue, labor, and profit with confidence bands and what-if scenarios.",
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
  },

  cSuite: {
    eyebrow: "FOR CEOS AND OWNERS",
    headline: "Your worst location is invisible until Thursday's recap.",
    subhead:
      "Ask Sundae delivers daily AI briefings across every brand and location - so portfolio truth lands in the morning, not at the weekly review.",
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
        intelLayer: "Ask Sundae",
      },
      {
        iconKey: "briefcase",
        title: "Peer-anchored benchmarks",
        body: "Where your portfolio stands against anonymized peers - RevPASH, average check, labor productivity, and more.",
        intelLayer: "Benchmarks",
      },
      {
        iconKey: "scanSearch",
        title: "Market and competitor intelligence",
        body: "Watchtower tracks weather, events, competitor moves, and footfall signals - daily, not quarterly.",
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
  },

  marketingTeams: {
    eyebrow: "FOR MARKETING LEADS",
    headline: "By the time you measure the campaign, the budget is already spent.",
    subhead:
      "Sundae surfaces campaign performance signals - covers, check size, channel mix, attribution - within 24 hours of activation, so you can re-allocate while the campaign is still running.",
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
        body: "Spend tied to covers, average check, and channel mix - performance signals available within 24 hours of activation.",
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
        body: "Ask Sundae which campaign drove your best Saturday - get a sourced answer in seconds, not a deck in a week.",
        intelLayer: "Ask Sundae",
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
  },

  hrTeams: {
    eyebrow: "FOR HR AND PEOPLE LEADS",
    headline: "Labor variance shows up too late.",
    subhead:
      "Pulse shows live labor% by location, server productivity, and overtime risk - by shift, not by month - so schedule decisions stop happening on instinct.",
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
        body: "Covers per labor hour, upsell rate, void rate per server - surfaced as patterns to coach, not just numbers.",
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
  },

  techTeams: {
    eyebrow: "FOR TECH AND DATA LEADS",
    headline: "Twelve vendor APIs. Five data formats. Zero unified schema.",
    subhead:
      "Sundae unifies POS, labor, inventory, delivery, accounting, reservations, and CRM into 500+ governed data models - with a public API, webhooks, RBAC, and audit trails out of the box.",
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
        body: "POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting, and more - modeled into 500+ governed schemas.",
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
        body: "Multi-tenant role-based access, full audit logging, governed metrics - out of the box, not on a roadmap.",
        intelLayer: "Governance",
      },
    ],
    mockupKey: "integrationsHub",
    connectedSystemsEyebrow: "WHAT YOU PLUG INTO",
    connectedSystems: [
      "12 unified data domains",
      "500+ governed models",
      "Public API + webhooks",
      "RBAC + audit trails",
      "Warehouse exports",
      "OAuth & API key auth",
    ],
    closingLine: "Stop building plumbing. Start shipping intelligence.",
  },

  multiLocation: {
    eyebrow: "FOR MULTI-LOCATION OPERATORS",
    headline: "Visibility into one location is easy. Visibility across five, ten, or fifty is the problem.",
    subhead:
      "One platform, every location, real-time - with cross-location patterns surfaced automatically and best-practice transfer that scales.",
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
        body: "Every location ranked by RevPASH, labor productivity, margin, and exception rate - refreshing through the shift.",
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
  },

  franchises: {
    eyebrow: "FOR FRANCHISE OPERATORS",
    headline: "Brand standards are easy to set. Brand standards at scale are the problem.",
    subhead:
      "Franchisee performance and brand consistency in one view - so the strongest franchisees become a template, not an exception.",
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
        body: "Live P&L roll-ups by franchisee, region, and brand. Spot the top quartile early - and the bottom quartile earlier.",
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
        body: "Cross-Intelligence finds what the top franchisees do differently - and packages it as plays the rest can run.",
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
  },

  cloudKitchens: {
    eyebrow: "FOR CLOUD KITCHEN OPERATORS",
    headline: "Delivery margin is razor-thin. Platform commissions eat what's left.",
    subhead:
      "Real margin per virtual brand, per platform, per kitchen - with platform-health monitoring built in.",
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
        body: "DoorDash, UberEats, Deliveroo, Talabat - with commission, packaging, refunds, and adjustments reconciled per order.",
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
        body: "Rating drift, dispatch latency, refund spikes, platform-side outages - surfaced via Watchtower in time to escalate.",
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
  },

  hospitalityGroups: {
    eyebrow: "FOR HOSPITALITY OPERATORS",
    headline: "F&B, rooms, events, and catering each have their own report.",
    subhead:
      "One decision view across every revenue stream - with adaptive targets per service type and forecasting that respects the difference between a banquet and a brunch.",
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
        body: "F&B, rooms, events, banquet, and catering unified - with attribution across guest journeys and service types.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "zap",
        title: "Adaptive targets",
        body: "Separate targets and pacing logic for restaurant, brunch, banquet, conference, and event service - each with its own rhythm.",
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
  },
};

/* ─── AR ───────────────────────────────────────────────────────── */

const ar: SolutionsContent = {
  operationsLeaders: {
    eyebrow: "لقادة العمليات",
    headline: "لا يمكنك التواجد في كل مطعم في الوقت ذاته.",
    subhead:
      "Pulse و Watchtower يمنحانك رؤية حية لكل وردية في كل موقع، مع سياق السوق الذي يحتاجه فريقك للتصرف قبل انتهاء الوردية.",
    todayTitle: "اليوم",
    todayPoints: [
      "انتظار الملخص الأسبوعي.",
      "الاعتماد على قرار المدير العام.",
      "مراجعة الإلغاءات يوم الجمعة.",
      "ردة الفعل بعد انتهاء الأسبوع.",
    ],
    todayFooter: "في اجتماع المراجعة الأسبوعي.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "إيقاع حي عبر كل المواقع.",
      "إشارات إرشادية أثناء الوردية الجارية.",
      "تنبيه فوري للإلغاءات والاستثناءات لكل وردية.",
      "تصرف قبل أن تنتهي ذروة الغداء.",
    ],
    withSundaeFooter: "في 11:14 من يوم الثلاثاء.",
    capabilitiesEyebrow: "ما الذي ستراه",
    capabilitiesHeadline: "رؤية أرضية الخدمة، في كل موقع وكل وردية.",
    capabilities: [
      {
        iconKey: "activity",
        title: "ذكاء حي للورديات",
        body: "الإيقاع، العمالة، التسرب، الخصومات، الإلغاءات، واستثناءات الخدمة - محدثة خلال الوردية، لا بعدها.",
        intelLayer: "Pulse",
      },
      {
        iconKey: "eye",
        title: "أنماط متعددة المواقع",
        body: "لوحات أداء المحفظة. إشارات إرشادية تتوسع عبر المجموعة. كشف ضعاف الأداء وردية بعد وردية.",
        intelLayer: "Insights",
      },
      {
        iconKey: "network",
        title: "إشارات السوق الخارجية",
        body: "الطقس، الأحداث المحلية، تسعير المنافسين، إيجازات يومية بالذكاء الاصطناعي - لتعرف الفرق سياق السوق قبل أن يصل إلى الأرقام.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "نقاط البيع (Toast, Square, Lightspeed, Oracle)",
      "جدولة العمالة",
      "المخزون",
      "منصات التوصيل",
      "الحجوزات",
      "شاشة المطبخ",
    ],
    closingLine: "قيادة العمليات تتوقف عن كونها ملخصاً. تصبح بثاً مباشراً.",
  },

  financeTeams: {
    eyebrow: "للمالية والتخطيط المالي",
    headline: "ثلاثة أيام لفهم الهامش هي ثلاثة أيام بعد فوات الأوان.",
    subhead:
      "Sundae يظهر انحراف الهامش يوم حدوثه - لا في مراجعة نهاية الشهر - مع إسناد الأسباب بين العمالة وتكلفة الطعام والتسعير.",
    todayTitle: "اليوم",
    todayPoints: [
      "الانحراف يظهر في حساب الشهر الماضي.",
      "تسوية عمولات التوصيل تستغرق أسبوعاً.",
      "ارتفاع التكلفة يُفسَّر بعد قيدها.",
      "التنبؤ ممارسة فصلية.",
    ],
    todayFooter: "في مراجعة نهاية الشهر.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "انحراف الهامش، يوم حدوثه.",
      "تسوية حية للعمولات لكل قناة.",
      "تنبيه ارتفاعات التكلفة داخل الوردية نفسها.",
      "Foresight يعمل في كل دورة، لا في كل ربع.",
    ],
    withSundaeFooter: "وردية بوردية، لا شهراً بشهر.",
    capabilitiesEyebrow: "ما الذي ستراه",
    capabilitiesHeadline: "ذكاء الهامش بسرعة العملية.",
    capabilities: [
      {
        iconKey: "lineChart",
        title: "انحراف الهامش الحي",
        body: "الهامش اليومي مقابل التوقع، مع إسناد على مستوى الوردية للعمالة وتكلفة الطعام والإلغاءات والخصومات والتسعير.",
        intelLayer: "Insights",
      },
      {
        iconKey: "coins",
        title: "تسوية القنوات والمنصات",
        body: "صافي الهامش حسب القناة - تناول داخلي، توصيل، تموين، تجزئة - مع تسوية مباشرة لعمولات المنصات.",
        intelLayer: "Insights · Revenue Assurance",
      },
      {
        iconKey: "chartArea",
        title: "تنبؤات استشرافية",
        body: "تنبؤات لـ14-90 يوماً للإيرادات والعمالة والربح، مع نطاقات ثقة وسيناريوهات افتراضية.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "revenueIntelligence",
    connectedSystems: [
      "نقاط البيع",
      "المحاسبة (QuickBooks, Xero, NetSuite)",
      "كشوف المرتبات",
      "عمولات التوصيل",
      "البنوك والمدفوعات",
      "تكلفة المخزون",
    ],
    closingLine: "أغلق أسرع. اشرح أكثر. خطّط أبعد.",
  },

  cSuite: {
    eyebrow: "للمدراء التنفيذيين والملاك",
    headline: "أسوأ موقع لديك غير مرئي حتى ملخص الخميس.",
    subhead:
      "Ask Sundae يقدم إيجازات يومية بالذكاء الاصطناعي عبر كل علامة وكل موقع - لتصل حقيقة المحفظة في الصباح، لا في المراجعة الأسبوعية.",
    todayTitle: "اليوم",
    todayPoints: [
      "ملخص المحفظة الأسبوعي يصل يوم الأربعاء.",
      "أنماط الهامش تُفسَّر يوم الجمعة.",
      "السياق التنافسي يُبنى عند الطلب.",
      "القرارات الاستراتيجية تنتظر الحساب القادم.",
    ],
    todayFooter: "ثلاثة أيام خلف العملية.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "إيجاز يومي بالذكاء الاصطناعي كل صباح.",
      "حقيقة المحفظة في الزمن الحقيقي.",
      "سياق تنافسي يومي عبر Watchtower.",
      "قرارات استراتيجية مبنية على بيانات اليوم.",
    ],
    withSundaeFooter: "بريدك في 6 صباحاً. القرار في 9.",
    capabilitiesEyebrow: "ما الذي ستراه",
    capabilitiesHeadline: "رؤية القيادة عبر كل علامة وسوق ومقياس.",
    capabilities: [
      {
        iconKey: "compass",
        title: "إيجازات تنفيذية يومية",
        body: "ملخصات يكتبها الذكاء الاصطناعي عبر كل علامة وموقع. ما الذي تغير، ولماذا، وما الذي يجب فعله.",
        intelLayer: "Ask Sundae",
      },
      {
        iconKey: "briefcase",
        title: "معايير مرجعية بين الأقران",
        body: "موقع محفظتك مقارنة بأقران مجهولي الهوية - RevPASH، متوسط الفاتورة، إنتاجية العمالة، والمزيد.",
        intelLayer: "Benchmarks",
      },
      {
        iconKey: "scanSearch",
        title: "ذكاء السوق والمنافسين",
        body: "Watchtower يتتبع الطقس والأحداث وتحركات المنافسين وإشارات الحركة - يومياً، لا فصلياً.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "intelligenceChat",
    connectedSystems: [
      "كل النطاقات الـ12 للبيانات",
      "تجميعات حسب العلامة والمنطقة",
      "متعدد العملات والضرائب",
      "ويب · Slack · Teams · Telegram",
      "إيجازات بالبريد و PDF",
    ],
    closingLine: "قُد المحفظة. توقف عن مطاردة الملخص.",
  },

  marketingTeams: {
    eyebrow: "لقادة التسويق",
    headline: "بحلول وقت قياسك للحملة، تكون الميزانية قد أُنفقت بالفعل.",
    subhead:
      "Sundae يكشف إشارات أداء الحملة - العملاء، حجم الفاتورة، مزيج القنوات، الإسناد - خلال 24 ساعة من التفعيل، لتعيد توزيع الإنفاق والحملة لا تزال جارية.",
    todayTitle: "اليوم",
    todayPoints: [
      "عائد الحملة يصل بعد أسبوع من انتهائها.",
      "قرارات مزيج القنوات تنتظر تقرير الوكالة.",
      "بيانات الولاء تعيش داخل تطبيق الولاء.",
      "أثر الترويج روائي.",
    ],
    todayFooter: "الحملة التالية تنطلق قبل وصول بيانات هذه.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "عائد الحملة، يوماً بيوم.",
      "تحديثات مزيج القنوات مع كل دورة.",
      "الولاء موحد مع نقاط البيع والتوصيل والحجوزات.",
      "أثر الترويج مُسند للعملاء والهامش.",
    ],
    withSundaeFooter: "أعد التوزيع وهي لا تزال جارية.",
    capabilitiesEyebrow: "ما الذي ستراه",
    capabilitiesHeadline: "ذكاء حملات يتفوق على تقرير الوكالة.",
    capabilities: [
      {
        iconKey: "megaphone",
        title: "إشارات أداء الحملة",
        body: "إنفاق مرتبط بالعملاء ومتوسط الفاتورة ومزيج القنوات - إشارات أداء متاحة خلال 24 ساعة من التفعيل.",
        intelLayer: "Insights · Marketing",
      },
      {
        iconKey: "repeat",
        title: "إسناد متعدد القنوات",
        body: "ولاء + مدفوع + عضوي + بريد + رسائل، موحدة. تعرف القنوات التي تحرك العملاء وحجم الفاتورة فعلاً.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "target",
        title: "أسئلة وأجوبة محادثة عن الحملات",
        body: "اسأل Sundae أي حملة قادت أفضل سبت - اقرأ إجابة موثقة في ثوانٍ، لا عرضاً في أسبوع.",
        intelLayer: "Ask Sundae",
      },
    ],
    mockupKey: "marketingPerformance",
    connectedSystems: [
      "نقاط البيع (عملاء، فاتورة، مزيج)",
      "منصات الولاء",
      "الإعلانات المدفوعة (Meta, Google)",
      "البريد والرسائل",
      "الحجوزات ومنصات التوصيل",
      "إدارة علاقات العملاء",
    ],
    closingLine: "الحملات تصبح أذكى وهي لا تزال جارية.",
  },

  hrTeams: {
    eyebrow: "للموارد البشرية",
    headline: "انحراف العمالة يظهر متأخراً.",
    subhead:
      "Pulse يعرض نسبة العمالة الحية لكل موقع، وإنتاجية النادل، ومخاطر الإضافي - وردية بوردية، لا شهراً بشهر - لتتوقف قرارات الجدول عن أن تكون بالحدس.",
    todayTitle: "اليوم",
    todayPoints: [
      "تغييرات الجدول تتم بالحدس.",
      "الإضافي يُدفع قبل أن يُكشف.",
      "الإنتاجية تُقاس شهرياً.",
      "أنماط العمالة تُراجع في نهاية الشهر.",
    ],
    todayFooter: "بعد صرف شيك الإضافي.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "تغييرات الجدول مبنية على الطلب الحي.",
      "مخاطر الإضافي تُكشف قبل الوردية.",
      "إنتاجية لكل وردية ولكل نادل.",
      "أنماط العمالة مرئية وردية بوردية، لا شهراً بشهر.",
    ],
    withSundaeFooter: "قبل أن يصل الانحراف إلى الرواتب.",
    capabilitiesEyebrow: "ما الذي ستراه",
    capabilitiesHeadline: "ذكاء العمالة بسرعة الجدول.",
    capabilities: [
      {
        iconKey: "users",
        title: "انحراف العمالة الحي",
        body: "نسبة العمالة لكل موقع ونادل ووردية. مخاطر الإضافي تُكشف قبل صرف الشيك.",
        intelLayer: "Pulse · Insights",
      },
      {
        iconKey: "activity",
        title: "إنتاجية على مستوى النادل",
        body: "عدد العملاء لكل ساعة عمل، معدل البيع الإضافي، معدل الإلغاء لكل نادل - مكشوفة كأنماط للتدريب، لا أرقاماً فقط.",
        intelLayer: "Insights · Labor",
      },
      {
        iconKey: "calendar",
        title: "جدولة مدفوعة بالتنبؤ",
        body: "Foresight يغذي الجدول بالطلب المتوقع لتطابق التغطية الليلة التي ستحدث فعلاً.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "laborOps",
    connectedSystems: [
      "نقاط البيع (عملاء، مبيعات لكل ساعة عمل)",
      "جدولة العمالة (7shifts, Deputy)",
      "تتبع الوقت",
      "كشوف المرتبات",
      "نظام الموارد البشرية",
    ],
    closingLine: "قرارات العمالة تُتخذ حين لا تزال مهمة.",
  },

  techTeams: {
    eyebrow: "لقادة التقنية والبيانات",
    headline: "اثنا عشر واجهة برمجية. خمسة تنسيقات بيانات. لا مخطط موحد.",
    subhead:
      "Sundae يوحد نقاط البيع والعمالة والمخزون والتوصيل والمحاسبة والحجوزات وإدارة العملاء في أكثر من 500 نموذج بيانات محكوم - مع واجهة برمجة عامة وWebhooks وRBAC وسجلات تدقيق جاهزة.",
    todayTitle: "اليوم",
    todayPoints: [
      "كل طلب لوحة جديدة هو مشروع تكامل لستة أسابيع.",
      "نقاط البيع والعمالة والمخزون والتوصيل لا تتحدث اللغة نفسها.",
      "RBAC يُبنى مخصصاً لكل طلب.",
      "تدقيقات الامتثال مبنية على جداول.",
    ],
    todayFooter: "ستة أسابيع لكل لوحة.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "لوحات جديدة تُشحن خلال أيام.",
      "12 نطاقاً موحدة جاهزة.",
      "RBAC وسجلات التدقيق مدمجة.",
      "امتثال عبر مقاييس محكومة.",
    ],
    withSundaeFooter: "أيام، لا أرباع سنة.",
    capabilitiesEyebrow: "ما الذي ستحصل عليه",
    capabilitiesHeadline: "بنية بيانات أصلية للمطاعم، محكومة وجاهزة.",
    capabilities: [
      {
        iconKey: "database",
        title: "12 نطاق بيانات موحد",
        body: "نقاط البيع، العمالة، المخزون، المشتريات، الحجوزات، التوصيل، التسويق، تجربة الضيف، إدارة العملاء، المحاسبة، والمزيد - ضمن أكثر من 500 مخططاً محكوماً.",
        intelLayer: "Architecture",
      },
      {
        iconKey: "code",
        title: "واجهة برمجة عامة + Webhooks",
        body: "اسحب بيانات Sundae المُعيرة إلى مستودعك عبر الواجهة العامة. ادفع تغييرات الحالة عبر اشتراكات Webhook. ETL مخصص أقل لكل لوحة جديدة.",
        intelLayer: "Platform",
      },
      {
        iconKey: "lock",
        title: "RBAC، سجلات تدقيق، حوكمة",
        body: "وصول قائم على الأدوار متعدد المستأجرين، تسجيل تدقيق كامل، مقاييس محكومة - جاهزة، لا في خارطة الطريق.",
        intelLayer: "Governance",
      },
    ],
    mockupKey: "integrationsHub",
    connectedSystemsEyebrow: "ما الذي تتصل به",
    connectedSystems: [
      "12 نطاق بيانات موحد",
      "أكثر من 500 نموذجاً محكوماً",
      "واجهة برمجة عامة + Webhooks",
      "RBAC + سجلات تدقيق",
      "تصدير للمستودع",
      "OAuth ومفاتيح API",
    ],
    closingLine: "توقف عن بناء السباكة. ابدأ بشحن الذكاء.",
  },

  multiLocation: {
    eyebrow: "لمشغلي المواقع المتعددة",
    headline: "الرؤية في موقع واحد سهلة. الرؤية عبر خمسة أو عشرة أو خمسين هي المشكلة.",
    subhead:
      "منصة واحدة، كل المواقع، في الزمن الحقيقي - مع كشف تلقائي لأنماط متعددة المواقع ونقل لأفضل الممارسات يتسع.",
    todayTitle: "اليوم",
    todayPoints: [
      "كل مدير عام لديه تقاريره الخاصة من نقاط البيع.",
      "المقارنات بين المواقع تتم في Excel.",
      "نقل أفضل الممارسات روائي.",
      "ضعاف الأداء يُكتشفون في المراجعة الشهرية.",
    ],
    todayFooter: "طاقة اجتماع شهري.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "لوحة محفظة حية.",
      "أنماط متعددة المواقع تظهر تلقائياً.",
      "إشارات إرشادية تتسع عبر المجموعة.",
      "ضعاف الأداء يُكشفون وردية بوردية.",
    ],
    withSundaeFooter: "حقيقة محفظة في الزمن الحقيقي.",
    capabilitiesEyebrow: "مبني للمحفظة",
    capabilitiesHeadline: "رؤية واحدة عبر كل موقع وعلامة ومفهوم.",
    capabilities: [
      {
        iconKey: "building2",
        title: "لوحة محفظة الأداء",
        body: "كل موقع مُرتب حسب RevPASH، إنتاجية العمالة، الهامش، ومعدل الاستثناءات - يتحدث خلال الوردية.",
        intelLayer: "Pulse · Benchmarks",
      },
      {
        iconKey: "layers",
        title: "ذكاء متعدد المواقع",
        body: "أنماط تنجح في موقع واحد، تظهر كخطط للبقية. نقل أفضل الممارسات يصبح ميزة، لا اجتماعاً.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "briefcase",
        title: "تجميعات على مستوى العلامة والمنطقة",
        body: "تجميعات متعددة العلامات والمناطق والعملات جاهزة. تغوّر من المجموعة → العلامة → المنطقة → الموقع → الوردية.",
        intelLayer: "Architecture",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "نقاط البيع (متعدد العلامات والمناطق)",
      "جدولة العمالة",
      "المخزون",
      "منصات التوصيل",
      "المحاسبة",
      "الحجوزات",
    ],
    closingLine: "أدر المجموعة وكأنها عملية واحدة.",
  },

  franchises: {
    eyebrow: "لمشغلي الامتياز التجاري",
    headline: "وضع معايير العلامة سهل. الحفاظ عليها على نطاق واسع هو المشكلة.",
    subhead:
      "أداء أصحاب الامتياز واتساق العلامة في رؤية واحدة - لتصبح أقوى الفروع قالباً، لا استثناءً.",
    todayTitle: "اليوم",
    todayPoints: [
      "حسابات أصحاب الامتياز تُجمع شهرياً.",
      "تدقيقات الامتثال زيارات ميدانية فصلية.",
      "أفضل أصحاب الامتياز ليسوا قابلين للتكرار بسهولة.",
      "انحراف العلامة يظهر في ملاحظات الضيوف وإشارات المراجعات.",
    ],
    todayFooter: "دورة امتثال فصلية.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "أداء أصحاب الامتياز، حي.",
      "امتثال عبر مقاييس محكومة.",
      "أنماط أفضل الممارسات قابلة للنقل.",
      "انحراف العلامة يُكشف عبر إشارات تجربة الضيف.",
    ],
    withSundaeFooter: "الامتثال يصبح مستمراً.",
    capabilitiesEyebrow: "مبني لشبكات الامتياز",
    capabilitiesHeadline: "الأداء والاتساق، في الرؤية ذاتها.",
    capabilities: [
      {
        iconKey: "gitBranch",
        title: "أداء أصحاب الامتياز",
        body: "تجميعات حسابات حية حسب صاحب الامتياز والمنطقة والعلامة. اكشف الربع الأعلى مبكراً - والربع الأدنى أبكر.",
        intelLayer: "Insights · Benchmarks",
      },
      {
        iconKey: "workflow",
        title: "اتساق العلامة على نطاق واسع",
        body: "إشارات تجربة الضيف، امتثال القائمة، سرعة الخدمة، ومعدلات الاستثناء، مراقبة عبر كل وحدة.",
        intelLayer: "Insights",
      },
      {
        iconKey: "network",
        title: "نقل أفضل الممارسات",
        body: "Cross-Intelligence يكتشف ما يفعله أفضل أصحاب الامتياز بشكل مختلف - ويحزمه كخطط ينفذها البقية.",
        intelLayer: "Cross-Intelligence",
      },
    ],
    mockupKey: "benchmark",
    connectedSystems: [
      "تجميعات نقاط بيع أصحاب الامتياز",
      "تدقيقات امتثال العلامة",
      "ملاحظات الضيوف وإشارات المراجعات",
      "تتبع الإتاوات والعمولات",
      "الحجوزات",
    ],
    closingLine: "اجعل الشبكة بقوة أقوى وحدة فيها.",
  },

  cloudKitchens: {
    eyebrow: "لمشغلي المطابخ السحابية",
    headline: "هامش التوصيل ضئيل. وعمولات المنصات تأكل ما تبقى.",
    subhead:
      "هامش حقيقي لكل علامة افتراضية، لكل منصة، لكل مطبخ - مع رصد مدمج لصحة المنصات.",
    todayTitle: "اليوم",
    todayPoints: [
      "عمولات المنصات تُسوى أسبوعياً.",
      "إسناد العلامات الافتراضية يدوي.",
      "هامش الاستلام مقابل التوصيل ضائع في الضوضاء.",
      "تراجع التقييم يظهر متأخراً.",
    ],
    todayFooter: "تسوية عبر جدول.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "تسوية عمولات حية.",
      "إسناد علامات موحد.",
      "هامش القنوات مفصول ومكشوف.",
      "صحة المنصات مرصودة عبر Watchtower.",
    ],
    withSundaeFooter: "هامش يمكنك الدفاع عنه فعلاً.",
    capabilitiesEyebrow: "مبني للمطابخ السحابية",
    capabilitiesHeadline: "اقتصاديات التوصيل، شفافة وحية.",
    capabilities: [
      {
        iconKey: "truck",
        title: "هامش حقيقي لكل منصة",
        body: "DoorDash, UberEats, Deliveroo, Talabat - مع تسوية العمولات والتغليف والاستردادات والتعديلات لكل طلب.",
        intelLayer: "Insights · Revenue Assurance",
      },
      {
        iconKey: "layers",
        title: "إسناد العلامات الافتراضية",
        body: "إسناد متعدد العلامات والمنصات موحد. اعرف أي مفهوم افتراضي يساهم بهامش فعلي لكل مطبخ.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "wifi",
        title: "رصد صحة المنصات",
        body: "انجراف التقييم، تأخر الإرسال، ارتفاع الاستردادات، انقطاعات المنصات - مكشوفة عبر Watchtower في الوقت المناسب للتصعيد.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "نقاط البيع (متعدد العلامات)",
      "DoorDash",
      "UberEats",
      "Deliveroo",
      "Talabat",
      "التغليف والمخزون",
    ],
    closingLine: "دافع عن الهامش الذي تأكله المنصات باستمرار.",
  },

  hospitalityGroups: {
    eyebrow: "لمشغلي الضيافة",
    headline: "الأطعمة والمشروبات والغرف والفعاليات والتموين - كل منها له تقريره الخاص.",
    subhead:
      "رؤية قرار واحدة عبر كل مصدر إيراد - مع أهداف متكيفة لكل نوع خدمة وتنبؤ يحترم الفرق بين حفل عشاء وفطور متأخر.",
    todayTitle: "اليوم",
    todayPoints: [
      "تقارير الأطعمة والمشروبات منفصلة عن نظام إدارة الفنادق.",
      "الفعاليات تُحلل في جداول.",
      "هامش التموين يُتتبع في نظام المحاسبة.",
      "الذكاء عبر الإيرادات عند الطلب.",
    ],
    todayFooter: "ثلاثة أنظمة، عملية واحدة.",
    withSundaeTitle: "مع Sundae",
    withSundaePoints: [
      "أطعمة ومشروبات + غرف + فعاليات + تموين، موحدة.",
      "إسناد عبر الإيرادات.",
      "أهداف متكيفة لكل نوع خدمة.",
      "تنبؤ لكل مصدر إيراد.",
    ],
    withSundaeFooter: "رؤية قرار واحدة.",
    capabilitiesEyebrow: "مبني لمجموعات الضيافة",
    capabilitiesHeadline: "كل مصدر إيراد في رؤية قرار واحدة.",
    capabilities: [
      {
        iconKey: "hotel",
        title: "ذكاء عبر الإيرادات",
        body: "الأطعمة والمشروبات، الغرف، الفعاليات، الولائم، والتموين موحدة - مع إسناد عبر رحلات الضيوف وأنواع الخدمة.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "zap",
        title: "أهداف متكيفة",
        body: "أهداف ومنطق إيقاع مستقلة لخدمة المطعم، الفطور المتأخر، الولائم، المؤتمرات، والفعاليات - لكل منها إيقاعها.",
        intelLayer: "Insights",
      },
      {
        iconKey: "chartArea",
        title: "تنبؤ خاص بكل مصدر",
        body: "تنبؤات تحترم الفرق بين عشاء جمعة لـ200 ضيف وحفل عرس لـ600 شخص.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "foresight",
    connectedSystems: [
      "نقاط البيع (منافذ الأطعمة والمشروبات)",
      "نظام إدارة الفنادق (الغرف)",
      "أنظمة الفعاليات والولائم",
      "إدارة التموين",
      "الحجوزات",
      "المحاسبة / ERP",
    ],
    closingLine: "أدر المنشأة كالنظام الذي هي عليه فعلاً.",
  },
};

/* ─── FR ───────────────────────────────────────────────────────── */

const fr: SolutionsContent = {
  operationsLeaders: {
    eyebrow: "POUR LES DIRECTEURS DES OPÉRATIONS",
    headline: "Vous ne pouvez pas être dans chaque restaurant en même temps.",
    subhead:
      "Pulse et Watchtower donnent une visibilité live sur chaque service et chaque établissement, avec le contexte marché dont les équipes ont besoin pour agir avant la fin du service.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Attendre le récap hebdomadaire.",
      "Faire confiance au directeur sur place.",
      "Auditer les annulations le vendredi.",
      "Réagir une fois la semaine terminée.",
    ],
    todayFooter: "Au point hebdo du vendredi.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "Cadence en direct sur chaque établissement.",
      "Signaux de coaching pendant le service.",
      "Annulations et exceptions remontées par service.",
      "Agir avant la fin du pic du déjeuner.",
    ],
    withSundaeFooter: "Mardi, 11h14.",
    capabilitiesEyebrow: "CE QUE VOUS VERREZ",
    capabilitiesHeadline: "Le terrain de service, sur chaque site, chaque service.",
    capabilities: [
      {
        iconKey: "activity",
        title: "Intelligence de service en direct",
        body: "Cadence, masse salariale, fuites, gestes commerciaux, annulations et exceptions de service, mis à jour pendant le service, pas après.",
        intelLayer: "Pulse",
      },
      {
        iconKey: "eye",
        title: "Patterns multi-sites",
        body: "Classements de portefeuille. Signaux de coaching qui passent à l'échelle. Sites en sous-performance remontés service par service.",
        intelLayer: "Insights",
      },
      {
        iconKey: "network",
        title: "Signaux de marché externes",
        body: "Météo, événements locaux, prix concurrents, briefings IA quotidiens - pour que les équipes connaissent le contexte avant qu'il ne touche les chiffres.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "Caisses (Toast, Square, Lightspeed, Oracle)",
      "Planification du personnel",
      "Stocks",
      "Plateformes de livraison",
      "Réservations",
      "Affichage cuisine",
    ],
    closingLine: "Le management des opérations cesse d'être un récap. Il devient un flux.",
  },

  financeTeams: {
    eyebrow: "POUR LES ÉQUIPES FINANCE & FP&A",
    headline: "Trois jours pour comprendre la marge, c'est trois jours de trop.",
    subhead:
      "Sundae montre l'écart de marge le jour même - pas à la clôture du mois - avec attribution des causes entre masse salariale, food cost et prix.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Les écarts apparaissent dans le P&L du mois passé.",
      "Le rapprochement des commissions de livraison prend une semaine.",
      "Les pics de coût s'expliquent après comptabilisation.",
      "Le forecast est un exercice trimestriel.",
    ],
    todayFooter: "À la clôture mensuelle.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "Écart de marge le jour même.",
      "Rapprochement live des commissions par canal.",
      "Pics de coût signalés pendant le service.",
      "Foresight tourne à chaque cycle, pas à chaque trimestre.",
    ],
    withSundaeFooter: "Service par service, pas mois par mois.",
    capabilitiesEyebrow: "CE QUE VOUS VERREZ",
    capabilitiesHeadline: "Intelligence de marge à la vitesse de l'opération.",
    capabilities: [
      {
        iconKey: "lineChart",
        title: "Écart de marge en direct",
        body: "Marge quotidienne vs forecast, avec attribution par service entre masse salariale, food cost, annulations, gestes commerciaux et prix.",
        intelLayer: "Insights",
      },
      {
        iconKey: "coins",
        title: "Rapprochement canaux et plateformes",
        body: "Marge nette par canal - sur place, livraison, traiteur, retail - avec rapprochement des commissions plateformes en ligne.",
        intelLayer: "Insights · Revenue Assurance",
      },
      {
        iconKey: "chartArea",
        title: "Forecasts prospectifs",
        body: "Forecasts à 14-90 jours pour chiffre d'affaires, masse salariale et profit, avec intervalles de confiance et scénarios.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "revenueIntelligence",
    connectedSystems: [
      "Caisses",
      "Comptabilité (QuickBooks, Xero, NetSuite)",
      "Paie",
      "Commissions de livraison",
      "Banque et paiements",
      "Coût de stock",
    ],
    closingLine: "Clôturer plus vite. Expliquer plus. Planifier plus loin.",
  },

  cSuite: {
    eyebrow: "POUR LES CEO ET PROPRIÉTAIRES",
    headline: "Votre pire site est invisible jusqu'au récap du jeudi.",
    subhead:
      "Ask Sundae délivre des briefings IA quotidiens sur chaque marque et chaque établissement - la vérité du portefeuille arrive le matin, pas à la revue hebdo.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Le récap portefeuille arrive le mercredi.",
      "Les patterns de marge s'expliquent le vendredi.",
      "Le contexte concurrentiel se construit à la demande.",
      "Les décisions stratégiques attendent le prochain P&L.",
    ],
    todayFooter: "Trois jours derrière l'opération.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "Briefing IA quotidien chaque matin.",
      "Vérité portefeuille en temps réel.",
      "Contexte concurrentiel quotidien via Watchtower.",
      "Décisions stratégiques basées sur la donnée du jour.",
    ],
    withSundaeFooter: "Boîte mail à 6h. Décision à 9h.",
    capabilitiesEyebrow: "CE QUE VOUS VERREZ",
    capabilitiesHeadline: "La vue C-suite sur chaque marque, marché et métrique.",
    capabilities: [
      {
        iconKey: "compass",
        title: "Briefings exécutifs quotidiens",
        body: "Synthèses écrites par IA sur chaque marque et chaque site. Ce qui a changé, pourquoi, et quoi en faire.",
        intelLayer: "Ask Sundae",
      },
      {
        iconKey: "briefcase",
        title: "Benchmarks ancrés pairs",
        body: "Où se situe votre portefeuille face à des pairs anonymisés - RevPASH, ticket moyen, productivité du personnel, et plus.",
        intelLayer: "Benchmarks",
      },
      {
        iconKey: "scanSearch",
        title: "Intelligence marché et concurrents",
        body: "Watchtower suit météo, événements, mouvements concurrents et signaux de fréquentation - au quotidien, pas au trimestre.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "intelligenceChat",
    connectedSystems: [
      "Les 12 domaines de données",
      "Consolidation marque et région",
      "Multi-devise, multi-taxe",
      "Web · Slack · Teams · Telegram",
      "Briefings email et PDF",
    ],
    closingLine: "Pilotez le portefeuille. Arrêtez de courir après le récap.",
  },

  marketingTeams: {
    eyebrow: "POUR LES ÉQUIPES MARKETING",
    headline: "Le temps de mesurer la campagne, le budget est déjà dépensé.",
    subhead:
      "Sundae remonte les signaux de performance des campagnes - couverts, ticket moyen, mix canaux, attribution - sous 24 heures, pour réallouer pendant que la campagne tourne encore.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Le ROI campagne arrive une semaine après la fin.",
      "Les décisions de mix canaux attendent le rapport agence.",
      "Les données fidélité vivent dans l'app fidélité.",
      "L'impact des promotions est anecdotique.",
    ],
    todayFooter: "La campagne suivante part avant la donnée de la précédente.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "ROI campagne, jour par jour.",
      "Mix canaux mis à jour à chaque cycle.",
      "Fidélité unifiée avec caisse, livraison, réservations.",
      "Impact promo attribué aux couverts et à la marge.",
    ],
    withSundaeFooter: "Réallouer pendant que ça tourne.",
    capabilitiesEyebrow: "CE QUE VOUS VERREZ",
    capabilitiesHeadline: "Une intelligence campagnes qui devance le rapport agence.",
    capabilities: [
      {
        iconKey: "megaphone",
        title: "Signaux de performance campagnes",
        body: "Dépenses liées aux couverts, ticket moyen et mix canaux - signaux disponibles sous 24 heures.",
        intelLayer: "Insights · Marketing",
      },
      {
        iconKey: "repeat",
        title: "Attribution multi-canaux",
        body: "Fidélité + paid + organique + email + SMS unifiés. Trouvez les canaux qui bougent vraiment couverts et ticket.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "target",
        title: "Q&R conversationnel sur les campagnes",
        body: "Demandez à Sundae quelle campagne a porté votre meilleur samedi - réponse sourcée en secondes, pas un deck en une semaine.",
        intelLayer: "Ask Sundae",
      },
    ],
    mockupKey: "marketingPerformance",
    connectedSystems: [
      "Caisses (couverts, ticket, mix)",
      "Plateformes de fidélité",
      "Média payant (Meta, Google)",
      "Email et SMS",
      "Réservations et plateformes de livraison",
      "CRM",
    ],
    closingLine: "Les campagnes deviennent plus intelligentes pendant qu'elles tournent.",
  },

  hrTeams: {
    eyebrow: "POUR LES RH ET RESPONSABLES PEOPLE",
    headline: "L'écart de masse salariale arrive trop tard.",
    subhead:
      "Pulse montre le %masse salariale en direct par site, la productivité par serveur et le risque d'heures sup - service par service - pour que les décisions de planning ne se prennent plus à l'instinct.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Les changements de planning se font à l'instinct.",
      "Les heures sup sont payées avant d'être signalées.",
      "La productivité est mesurée au mois.",
      "Les patterns RH sont revus en clôture.",
    ],
    todayFooter: "Après le chèque d'heures sup.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "Planning ajusté à la demande live.",
      "Risque heures sup signalé avant le service.",
      "Productivité par service, par serveur.",
      "Patterns RH visibles par service, pas au mois.",
    ],
    withSundaeFooter: "Avant que l'écart ne touche la paie.",
    capabilitiesEyebrow: "CE QUE VOUS VERREZ",
    capabilitiesHeadline: "Intelligence RH à la vitesse du planning.",
    capabilities: [
      {
        iconKey: "users",
        title: "Écart masse salariale en direct",
        body: "%masse salariale par site, par serveur, par service. Risque d'heures sup signalé avant le chèque.",
        intelLayer: "Pulse · Insights",
      },
      {
        iconKey: "activity",
        title: "Productivité au niveau du serveur",
        body: "Couverts par heure, taux d'upsell, taux d'annulation par serveur - remontés comme patterns à coacher, pas juste des chiffres.",
        intelLayer: "Insights · Labor",
      },
      {
        iconKey: "calendar",
        title: "Planning piloté par le forecast",
        body: "Foresight nourrit le planning avec la demande attendue, pour que la couverture colle à la soirée que vous allez vraiment avoir.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "laborOps",
    connectedSystems: [
      "Caisses (couverts, ventes par heure)",
      "Planification (7shifts, Deputy)",
      "Pointage",
      "Paie",
      "SIRH",
    ],
    closingLine: "Les décisions RH se prennent quand elles comptent encore.",
  },

  techTeams: {
    eyebrow: "POUR LES ÉQUIPES TECH ET DATA",
    headline: "Douze APIs vendeurs. Cinq formats de données. Aucun schéma unifié.",
    subhead:
      "Sundae unifie caisse, RH, stocks, livraison, comptabilité, réservations et CRM dans plus de 500 modèles de données gouvernés - avec API publique, webhooks, RBAC et audit trails inclus.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Chaque nouveau dashboard est un projet d'intégration de six semaines.",
      "Caisse, RH, stocks, livraison ne parlent pas la même langue.",
      "Le RBAC se construit à la demande.",
      "Les audits compliance se font sous Excel.",
    ],
    todayFooter: "Six semaines par dashboard.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "Nouvelles vues livrées en jours.",
      "12 domaines unifiés, prêts à l'emploi.",
      "RBAC et audit trails embarqués.",
      "Compliance via métriques gouvernées.",
    ],
    withSundaeFooter: "Des jours, pas des trimestres.",
    capabilitiesEyebrow: "CE QUE VOUS OBTIENDREZ",
    capabilitiesHeadline: "Plomberie de données native restaurant, gouvernée, prête.",
    capabilities: [
      {
        iconKey: "database",
        title: "12 domaines de données unifiés",
        body: "Caisse, RH, stocks, achats, réservations, livraison, marketing, expérience client, CRM, comptabilité et plus - modélisés en 500+ schémas gouvernés.",
        intelLayer: "Architecture",
      },
      {
        iconKey: "code",
        title: "API publique + webhooks",
        body: "Tirez les données normalisées de Sundae dans votre warehouse via l'API publique. Push des changements via webhooks. Moins d'ETL custom par dashboard.",
        intelLayer: "Platform",
      },
      {
        iconKey: "lock",
        title: "RBAC, audit trails, gouvernance",
        body: "Accès par rôle multi-tenant, logging d'audit complet, métriques gouvernées - prêts, pas sur la roadmap.",
        intelLayer: "Governance",
      },
    ],
    mockupKey: "integrationsHub",
    connectedSystemsEyebrow: "CE À QUOI VOUS VOUS BRANCHEZ",
    connectedSystems: [
      "12 domaines de données unifiés",
      "500+ modèles gouvernés",
      "API publique + webhooks",
      "RBAC + audit trails",
      "Exports warehouse",
      "Auth OAuth et clé API",
    ],
    closingLine: "Arrêtez de construire la plomberie. Livrez de l'intelligence.",
  },

  multiLocation: {
    eyebrow: "POUR LES OPÉRATEURS MULTI-SITES",
    headline: "La visibilité sur un site est facile. Sur cinq, dix ou cinquante, c'est le problème.",
    subhead:
      "Une plateforme, chaque site, en temps réel - avec patterns multi-sites remontés automatiquement et transfert des bonnes pratiques qui passe à l'échelle.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Chaque GM a ses propres rapports caisse.",
      "Les comparaisons multi-sites se font sous Excel.",
      "Le transfert des bonnes pratiques est anecdotique.",
      "Les sites en sous-performance se trouvent en revue mensuelle.",
    ],
    todayFooter: "Énergie réunion mensuelle.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "Classement portefeuille en direct.",
      "Patterns multi-sites remontés automatiquement.",
      "Signaux de coaching qui passent à l'échelle.",
      "Sites en sous-performance signalés par service.",
    ],
    withSundaeFooter: "Vérité portefeuille en temps réel.",
    capabilitiesEyebrow: "CONÇU POUR LE PORTEFEUILLE",
    capabilitiesHeadline: "Une vue sur chaque site, marque et concept.",
    capabilities: [
      {
        iconKey: "building2",
        title: "Classement portefeuille",
        body: "Chaque site classé par RevPASH, productivité RH, marge et taux d'exception - refresh pendant le service.",
        intelLayer: "Pulse · Benchmarks",
      },
      {
        iconKey: "layers",
        title: "Intelligence multi-sites",
        body: "Les patterns qui marchent sur un site deviennent des plays pour les autres. Le transfert devient une feature, pas une réunion.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "briefcase",
        title: "Consolidation marque et région",
        body: "Multi-marque, multi-région, multi-devise prêts à l'emploi. Drill du groupe → marque → région → site → service.",
        intelLayer: "Architecture",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "Caisses (multi-marque, multi-région)",
      "Planification du personnel",
      "Stocks",
      "Plateformes de livraison",
      "Comptabilité",
      "Réservations",
    ],
    closingLine: "Pilotez le groupe comme une seule opération.",
  },

  franchises: {
    eyebrow: "POUR LES OPÉRATEURS FRANCHISES",
    headline: "Poser des standards de marque est facile. Les tenir à l'échelle, c'est le problème.",
    subhead:
      "Performance des franchises et cohérence de marque dans une même vue - pour que les meilleures franchises deviennent un modèle, pas une exception.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Les P&L franchises remontent au mois.",
      "Les audits compliance sont des visites trimestrielles.",
      "Les meilleures franchises ne sont pas faciles à répliquer.",
      "Le drift de marque apparaît dans les retours clients.",
    ],
    todayFooter: "Cycle compliance trimestriel.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "Performance franchises, en direct.",
      "Compliance via métriques gouvernées.",
      "Patterns de bonnes pratiques transférables.",
      "Drift de marque signalé via signaux expérience client.",
    ],
    withSundaeFooter: "La compliance devient continue.",
    capabilitiesEyebrow: "CONÇU POUR LES RÉSEAUX DE FRANCHISES",
    capabilitiesHeadline: "Performance et cohérence, dans la même vue.",
    capabilities: [
      {
        iconKey: "gitBranch",
        title: "Performance franchises",
        body: "Consolidations de P&L en direct par franchise, région et marque. Repérez le quartile haut tôt - et le quartile bas plus tôt encore.",
        intelLayer: "Insights · Benchmarks",
      },
      {
        iconKey: "workflow",
        title: "Cohérence de marque à l'échelle",
        body: "Signaux expérience client, conformité menu, vitesse de service et taux d'exception suivis sur chaque unité.",
        intelLayer: "Insights",
      },
      {
        iconKey: "network",
        title: "Transfert des bonnes pratiques",
        body: "Cross-Intelligence trouve ce que les meilleures franchises font différemment - et le packagise en plays que les autres peuvent jouer.",
        intelLayer: "Cross-Intelligence",
      },
    ],
    mockupKey: "benchmark",
    connectedSystems: [
      "Consolidations caisses franchises",
      "Audits compliance marque",
      "Retours clients et signaux d'avis",
      "Suivi royalties et commissions",
      "Réservations",
    ],
    closingLine: "Rendez le réseau aussi fort que votre meilleure unité.",
  },

  cloudKitchens: {
    eyebrow: "POUR LES CLOUD KITCHENS",
    headline: "La marge livraison est mince. Les commissions plateformes mangent ce qui reste.",
    subhead:
      "Marge réelle par marque virtuelle, par plateforme, par cuisine - avec monitoring santé des plateformes inclus.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Les commissions plateformes se rapprochent au pas hebdo.",
      "L'attribution marque virtuelle se bricole à la main.",
      "Marge pickup vs livraison perdue dans le bruit.",
      "Les chutes de note plateforme apparaissent tard.",
    ],
    todayFooter: "Rapprochement par tableur.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "Rapprochement live des commissions.",
      "Attribution marques unifiée.",
      "Marge canaux séparée et exposée.",
      "Santé plateformes monitorée via Watchtower.",
    ],
    withSundaeFooter: "Une marge que vous pouvez vraiment défendre.",
    capabilitiesEyebrow: "CONÇU POUR LES CLOUD KITCHENS",
    capabilitiesHeadline: "Économie livraison, transparente, en direct.",
    capabilities: [
      {
        iconKey: "truck",
        title: "Marge réelle par plateforme",
        body: "DoorDash, UberEats, Deliveroo, Talabat - avec commission, packaging, remboursements et ajustements rapprochés par commande.",
        intelLayer: "Insights · Revenue Assurance",
      },
      {
        iconKey: "layers",
        title: "Attribution marques virtuelles",
        body: "Attribution multi-marque, multi-plateforme unifiée. Sachez quel concept virtuel contribue vraiment à la marge par cuisine.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "wifi",
        title: "Monitoring santé plateformes",
        body: "Drift de note, latence dispatch, pics de remboursements, pannes plateformes - remontés via Watchtower à temps pour escalader.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "Caisses (multi-marque)",
      "DoorDash",
      "UberEats",
      "Deliveroo",
      "Talabat",
      "Packaging et stocks",
    ],
    closingLine: "Défendez la marge que les plateformes mangent en continu.",
  },

  hospitalityGroups: {
    eyebrow: "POUR LES GROUPES D'HOSPITALITÉ",
    headline: "F&B, chambres, événements et traiteur ont chacun leur propre rapport.",
    subhead:
      "Une seule vue de décision sur chaque flux de revenu - avec objectifs adaptatifs par type de service et forecasts qui respectent la différence entre un banquet et un brunch.",
    todayTitle: "Aujourd'hui",
    todayPoints: [
      "Rapports F&B séparés du PMS.",
      "Événements analysés sous Excel.",
      "Marge traiteur suivie dans la compta.",
      "L'intelligence cross-revenu se fait à la demande.",
    ],
    todayFooter: "Trois systèmes, une opération.",
    withSundaeTitle: "Avec Sundae",
    withSundaePoints: [
      "F&B + chambres + événements + traiteur, unifiés.",
      "Attribution cross-revenu.",
      "Objectifs adaptatifs par type de service.",
      "Forecasts par flux de revenu.",
    ],
    withSundaeFooter: "Une vue de décision.",
    capabilitiesEyebrow: "CONÇU POUR L'HOSPITALITÉ",
    capabilitiesHeadline: "Chaque flux de revenu dans une seule vue de décision.",
    capabilities: [
      {
        iconKey: "hotel",
        title: "Intelligence cross-revenu",
        body: "F&B, chambres, événements, banquets et traiteur unifiés - avec attribution sur les parcours clients et types de service.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "zap",
        title: "Objectifs adaptatifs",
        body: "Objectifs et logique de cadence distincts pour restaurant, brunch, banquet, conférence et événement - chacun avec son rythme.",
        intelLayer: "Insights",
      },
      {
        iconKey: "chartArea",
        title: "Forecasts par flux",
        body: "Forecasts qui respectent la différence entre un dîner du vendredi à 200 couverts et un banquet de mariage à 600.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "foresight",
    connectedSystems: [
      "Caisses (points de vente F&B)",
      "PMS (chambres)",
      "Systèmes événements et banquets",
      "Gestion traiteur",
      "Réservations",
      "Comptabilité / ERP",
    ],
    closingLine: "Pilotez l'établissement comme le système qu'il est vraiment.",
  },
};

/* ─── ES ───────────────────────────────────────────────────────── */

const es: SolutionsContent = {
  operationsLeaders: {
    eyebrow: "PARA LÍDERES DE OPERACIONES",
    headline: "No puedes estar en cada restaurante a la vez.",
    subhead:
      "Pulse y Watchtower te dan visibilidad en vivo de cada turno y cada local, con el contexto de mercado que los equipos necesitan para actuar antes de que el turno termine.",
    todayTitle: "Hoy",
    todayPoints: [
      "Esperar el resumen semanal.",
      "Confiar en la decisión del gerente.",
      "Auditar anulaciones el viernes.",
      "Reaccionar después de que la semana acabe.",
    ],
    todayFooter: "En la reunión del viernes.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "Ritmo en vivo en cada local.",
      "Señales de coaching durante el turno.",
      "Anulaciones y excepciones por turno.",
      "Actuar antes de que termine el pico de almuerzo.",
    ],
    withSundaeFooter: "Martes, 11:14.",
    capabilitiesEyebrow: "LO QUE VERÁS",
    capabilitiesHeadline: "La vista del turno, en cada local y cada servicio.",
    capabilities: [
      {
        iconKey: "activity",
        title: "Inteligencia de turno en vivo",
        body: "Ritmo, mano de obra, fugas, cortesías, anulaciones y excepciones de servicio - actualizadas durante el turno, no después.",
        intelLayer: "Pulse",
      },
      {
        iconKey: "eye",
        title: "Patrones multi-local",
        body: "Rankings de portafolio. Señales de coaching que escalan en el grupo. Bajos rendimientos detectados turno a turno.",
        intelLayer: "Insights",
      },
      {
        iconKey: "network",
        title: "Señales externas de mercado",
        body: "Clima, eventos locales, precios de competidores, briefings IA diarios - para que los equipos conozcan el contexto antes de que afecte los números.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "POS (Toast, Square, Lightspeed, Oracle)",
      "Programación de personal",
      "Inventario",
      "Plataformas de delivery",
      "Reservas",
      "Pantalla de cocina",
    ],
    closingLine: "El liderazgo de operaciones deja de ser un resumen. Se convierte en un feed.",
  },

  financeTeams: {
    eyebrow: "PARA FINANZAS Y FP&A",
    headline: "Tres días para entender el margen son tres días tarde.",
    subhead:
      "Sundae muestra la varianza de margen el día que ocurre - no en el cierre del mes - con atribución por mano de obra, costo de comida y precios.",
    todayTitle: "Hoy",
    todayPoints: [
      "La varianza aparece en el P&L del mes pasado.",
      "Conciliar comisiones de delivery toma una semana.",
      "Los picos de costo se explican después de registrarse.",
      "El forecast es un ejercicio trimestral.",
    ],
    todayFooter: "En el cierre mensual.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "Varianza de margen, el día que ocurre.",
      "Conciliación en vivo de comisiones por canal.",
      "Picos de costo señalados durante el turno.",
      "Foresight corre cada ciclo, no cada trimestre.",
    ],
    withSundaeFooter: "Turno por turno, no mes por mes.",
    capabilitiesEyebrow: "LO QUE VERÁS",
    capabilitiesHeadline: "Inteligencia de margen al ritmo de la operación.",
    capabilities: [
      {
        iconKey: "lineChart",
        title: "Varianza de margen en vivo",
        body: "Margen diario contra forecast, con atribución por turno a mano de obra, costo de comida, anulaciones, cortesías y precios.",
        intelLayer: "Insights",
      },
      {
        iconKey: "coins",
        title: "Conciliación de canales y plataformas",
        body: "Margen neto por canal - salón, delivery, catering, retail - con conciliación de comisiones de plataforma en línea.",
        intelLayer: "Insights · Revenue Assurance",
      },
      {
        iconKey: "chartArea",
        title: "Forecasts a futuro",
        body: "Forecasts a 14-90 días para ingresos, mano de obra y utilidad, con bandas de confianza y escenarios.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "revenueIntelligence",
    connectedSystems: [
      "POS",
      "Contabilidad (QuickBooks, Xero, NetSuite)",
      "Nómina",
      "Comisiones de delivery",
      "Banca y pagos",
      "Costo de inventario",
    ],
    closingLine: "Cierra más rápido. Explica más. Planifica más lejos.",
  },

  cSuite: {
    eyebrow: "PARA CEOS Y DUEÑOS",
    headline: "Tu peor local es invisible hasta el resumen del jueves.",
    subhead:
      "Ask Sundae entrega briefings diarios con IA en cada marca y cada local - la verdad del portafolio llega en la mañana, no en la revisión semanal.",
    todayTitle: "Hoy",
    todayPoints: [
      "El resumen semanal del portafolio llega el miércoles.",
      "Los patrones de margen se explican el viernes.",
      "El contexto competitivo se arma a pedido.",
      "Las decisiones estratégicas esperan el siguiente P&L.",
    ],
    todayFooter: "Tres días detrás de la operación.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "Briefing diario con IA cada mañana.",
      "Verdad del portafolio en tiempo real.",
      "Contexto competitivo diario vía Watchtower.",
      "Decisiones estratégicas con datos del día.",
    ],
    withSundaeFooter: "Bandeja a las 6. Decisión a las 9.",
    capabilitiesEyebrow: "LO QUE VERÁS",
    capabilitiesHeadline: "La vista C-suite en cada marca, mercado y métrica.",
    capabilities: [
      {
        iconKey: "compass",
        title: "Briefings ejecutivos diarios",
        body: "Resúmenes escritos por IA en cada marca y cada local. Qué cambió, por qué, y qué hacer al respecto.",
        intelLayer: "Ask Sundae",
      },
      {
        iconKey: "briefcase",
        title: "Benchmarks anclados en pares",
        body: "Dónde se ubica tu portafolio frente a pares anónimos - RevPASH, ticket promedio, productividad, y más.",
        intelLayer: "Benchmarks",
      },
      {
        iconKey: "scanSearch",
        title: "Inteligencia de mercado y competencia",
        body: "Watchtower sigue clima, eventos, movimientos de competidores y señales de afluencia - diario, no trimestral.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "intelligenceChat",
    connectedSystems: [
      "Los 12 dominios de datos",
      "Consolidación por marca y región",
      "Multi-divisa, multi-impuesto",
      "Web · Slack · Teams · Telegram",
      "Briefings por email y PDF",
    ],
    closingLine: "Lidera el portafolio. Deja de perseguir el resumen.",
  },

  marketingTeams: {
    eyebrow: "PARA LÍDERES DE MARKETING",
    headline: "Cuando mides la campaña, el presupuesto ya está gastado.",
    subhead:
      "Sundae expone señales de desempeño de la campaña - comensales, ticket, mix de canales, atribución - en menos de 24 horas, para reasignar mientras la campaña sigue corriendo.",
    todayTitle: "Hoy",
    todayPoints: [
      "El ROI de la campaña llega una semana después del cierre.",
      "Las decisiones de mix de canales esperan el reporte de la agencia.",
      "Los datos de fidelidad viven en la app de fidelidad.",
      "El impacto de las promos es anecdótico.",
    ],
    todayFooter: "La siguiente campaña sale antes que los datos de la actual.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "ROI de campaña, día a día.",
      "Mix de canales actualizado cada ciclo.",
      "Fidelidad unificada con POS, delivery y reservas.",
      "Impacto promo atribuido a comensales y margen.",
    ],
    withSundaeFooter: "Reasigna mientras corre.",
    capabilitiesEyebrow: "LO QUE VERÁS",
    capabilitiesHeadline: "Inteligencia de campañas que vence al reporte de agencia.",
    capabilities: [
      {
        iconKey: "megaphone",
        title: "Señales de desempeño de campaña",
        body: "Gasto vinculado a comensales, ticket promedio y mix de canales - señales disponibles en menos de 24 horas.",
        intelLayer: "Insights · Marketing",
      },
      {
        iconKey: "repeat",
        title: "Atribución multi-canal",
        body: "Fidelidad + paid + orgánico + email + SMS unificados. Encuentra los canales que de verdad mueven comensales y ticket.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "target",
        title: "Q&A conversacional sobre campañas",
        body: "Pregúntale a Sundae qué campaña impulsó tu mejor sábado - respuesta con fuente en segundos, no un deck en una semana.",
        intelLayer: "Ask Sundae",
      },
    ],
    mockupKey: "marketingPerformance",
    connectedSystems: [
      "POS (comensales, ticket, mix)",
      "Plataformas de fidelidad",
      "Medios pagos (Meta, Google)",
      "Email y SMS",
      "Reservas y plataformas de delivery",
      "CRM",
    ],
    closingLine: "Las campañas se vuelven más inteligentes mientras corren.",
  },

  hrTeams: {
    eyebrow: "PARA RRHH Y LÍDERES DE PEOPLE",
    headline: "La varianza de mano de obra aparece tarde.",
    subhead:
      "Pulse muestra el %mano de obra en vivo por local, productividad por mesero y riesgo de horas extra - turno a turno, no mes a mes - para que las decisiones de horario dejen de ser por instinto.",
    todayTitle: "Hoy",
    todayPoints: [
      "Los cambios de horario se hacen por instinto.",
      "Las horas extra se pagan antes de detectarse.",
      "La productividad se mide al mes.",
      "Los patrones de mano de obra se revisan al cierre.",
    ],
    todayFooter: "Después del cheque de horas extra.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "Horarios ajustados a la demanda en vivo.",
      "Riesgo de horas extra señalado antes del turno.",
      "Productividad por turno, por mesero.",
      "Patrones de mano de obra visibles por turno, no por mes.",
    ],
    withSundaeFooter: "Antes de que la varianza llegue a nómina.",
    capabilitiesEyebrow: "LO QUE VERÁS",
    capabilitiesHeadline: "Inteligencia de mano de obra al ritmo del horario.",
    capabilities: [
      {
        iconKey: "users",
        title: "Varianza de mano de obra en vivo",
        body: "%mano de obra por local, mesero y turno. Riesgo de horas extra señalado antes del cheque.",
        intelLayer: "Pulse · Insights",
      },
      {
        iconKey: "activity",
        title: "Productividad por mesero",
        body: "Comensales por hora, tasa de upsell, tasa de anulación por mesero - expuestos como patrones para coachear, no solo números.",
        intelLayer: "Insights · Labor",
      },
      {
        iconKey: "calendar",
        title: "Horarios guiados por forecast",
        body: "Foresight alimenta el horario con la demanda esperada para que la cobertura coincida con la noche que realmente vas a tener.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "laborOps",
    connectedSystems: [
      "POS (comensales, ventas por hora)",
      "Programación (7shifts, Deputy)",
      "Reloj checador",
      "Nómina",
      "HRIS",
    ],
    closingLine: "Las decisiones de mano de obra se toman cuando aún importan.",
  },

  techTeams: {
    eyebrow: "PARA EQUIPOS DE TECH Y DATA",
    headline: "Doce APIs de proveedores. Cinco formatos de datos. Cero esquema unificado.",
    subhead:
      "Sundae unifica POS, mano de obra, inventario, delivery, contabilidad, reservas y CRM en más de 500 modelos de datos gobernados - con API pública, webhooks, RBAC y audit trails listos.",
    todayTitle: "Hoy",
    todayPoints: [
      "Cada nuevo dashboard es un proyecto de integración de seis semanas.",
      "POS, mano de obra, inventario y delivery no hablan el mismo idioma.",
      "El RBAC se construye a la medida en cada pedido.",
      "Las auditorías de compliance se hacen en hojas de cálculo.",
    ],
    todayFooter: "Seis semanas por dashboard.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "Vistas nuevas en días.",
      "12 dominios unificados, listos para usar.",
      "RBAC y audit trails embebidos.",
      "Compliance vía métricas gobernadas.",
    ],
    withSundaeFooter: "Días, no trimestres.",
    capabilitiesEyebrow: "LO QUE OBTENDRÁS",
    capabilitiesHeadline: "Plomería de datos nativa para restaurantes, gobernada y lista.",
    capabilities: [
      {
        iconKey: "database",
        title: "12 dominios de datos unificados",
        body: "POS, mano de obra, inventario, compras, reservas, delivery, marketing, experiencia del cliente, CRM, contabilidad y más - modelados en 500+ esquemas gobernados.",
        intelLayer: "Architecture",
      },
      {
        iconKey: "code",
        title: "API pública + webhooks",
        body: "Lleva los datos normalizados de Sundae a tu warehouse vía la API pública. Empuja cambios de estado vía webhooks. Menos ETL custom por dashboard.",
        intelLayer: "Platform",
      },
      {
        iconKey: "lock",
        title: "RBAC, audit trails, gobierno",
        body: "Acceso por rol multi-tenant, logging de auditoría completo, métricas gobernadas - listas, no en el roadmap.",
        intelLayer: "Governance",
      },
    ],
    mockupKey: "integrationsHub",
    connectedSystemsEyebrow: "A LO QUE TE CONECTAS",
    connectedSystems: [
      "12 dominios de datos unificados",
      "500+ modelos gobernados",
      "API pública + webhooks",
      "RBAC + audit trails",
      "Exportes a warehouse",
      "Auth OAuth y API key",
    ],
    closingLine: "Deja de construir plomería. Empieza a entregar inteligencia.",
  },

  multiLocation: {
    eyebrow: "PARA OPERADORES MULTI-LOCAL",
    headline: "Ver un local es fácil. Ver cinco, diez o cincuenta es el problema.",
    subhead:
      "Una plataforma, cada local, en tiempo real - con patrones multi-local emergiendo automáticamente y transferencia de mejores prácticas que escala.",
    todayTitle: "Hoy",
    todayPoints: [
      "Cada gerente tiene sus propios reportes de POS.",
      "Las comparaciones multi-local se hacen en Excel.",
      "La transferencia de mejores prácticas es anecdótica.",
      "Los locales rezagados se descubren en la revisión mensual.",
    ],
    todayFooter: "Energía de junta mensual.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "Ranking de portafolio en vivo.",
      "Patrones multi-local emergen automáticamente.",
      "Señales de coaching escalan en el grupo.",
      "Locales rezagados señalados turno a turno.",
    ],
    withSundaeFooter: "Verdad del portafolio en tiempo real.",
    capabilitiesEyebrow: "PENSADO PARA EL PORTAFOLIO",
    capabilitiesHeadline: "Una vista en cada sitio, marca y concepto.",
    capabilities: [
      {
        iconKey: "building2",
        title: "Ranking de portafolio",
        body: "Cada local rankeado por RevPASH, productividad, margen y tasa de excepciones - refrescando durante el turno.",
        intelLayer: "Pulse · Benchmarks",
      },
      {
        iconKey: "layers",
        title: "Inteligencia multi-local",
        body: "Patrones que ganan en un local emergen como jugadas para el resto. La transferencia de mejores prácticas se vuelve feature, no junta.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "briefcase",
        title: "Consolidaciones por marca y región",
        body: "Multi-marca, multi-región, multi-divisa listo para usar. Drill desde grupo → marca → región → sitio → turno.",
        intelLayer: "Architecture",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "POS (multi-marca, multi-región)",
      "Programación de personal",
      "Inventario",
      "Plataformas de delivery",
      "Contabilidad",
      "Reservas",
    ],
    closingLine: "Maneja el grupo como una sola operación.",
  },

  franchises: {
    eyebrow: "PARA OPERADORES DE FRANQUICIAS",
    headline: "Fijar estándares de marca es fácil. Mantenerlos a escala es el problema.",
    subhead:
      "Desempeño de franquiciados y consistencia de marca en una sola vista - para que los mejores franquiciados sean plantilla, no excepción.",
    todayTitle: "Hoy",
    todayPoints: [
      "Los P&L de franquiciados se consolidan al mes.",
      "Las auditorías de compliance son visitas trimestrales.",
      "Los mejores franquiciados no son fáciles de replicar.",
      "El drift de marca aparece en feedback de clientes y reseñas.",
    ],
    todayFooter: "Ciclo trimestral de compliance.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "Desempeño de franquiciados, en vivo.",
      "Compliance vía métricas gobernadas.",
      "Patrones de mejores prácticas transferibles.",
      "Drift de marca señalado vía señales de experiencia del cliente.",
    ],
    withSundaeFooter: "El compliance se vuelve continuo.",
    capabilitiesEyebrow: "PENSADO PARA REDES DE FRANQUICIAS",
    capabilitiesHeadline: "Desempeño y consistencia, en la misma vista.",
    capabilities: [
      {
        iconKey: "gitBranch",
        title: "Desempeño de franquiciados",
        body: "Consolidaciones de P&L en vivo por franquiciado, región y marca. Detecta el cuartil alto temprano - y el bajo aún antes.",
        intelLayer: "Insights · Benchmarks",
      },
      {
        iconKey: "workflow",
        title: "Consistencia de marca a escala",
        body: "Señales de experiencia del cliente, cumplimiento de menú, velocidad de servicio y tasas de excepción monitoreadas en cada unidad.",
        intelLayer: "Insights",
      },
      {
        iconKey: "network",
        title: "Transferencia de mejores prácticas",
        body: "Cross-Intelligence encuentra qué hacen distinto los mejores franquiciados - y lo empaqueta como jugadas que el resto puede correr.",
        intelLayer: "Cross-Intelligence",
      },
    ],
    mockupKey: "benchmark",
    connectedSystems: [
      "Consolidaciones POS de franquiciados",
      "Auditorías de compliance de marca",
      "Feedback de clientes y señales de reseñas",
      "Seguimiento de regalías y comisiones",
      "Reservas",
    ],
    closingLine: "Haz que la red sea tan fuerte como tu mejor unidad.",
  },

  cloudKitchens: {
    eyebrow: "PARA CLOUD KITCHENS",
    headline: "El margen de delivery es ajustado. Las comisiones de plataforma se comen el resto.",
    subhead:
      "Margen real por marca virtual, por plataforma, por cocina - con monitoreo de salud de plataformas integrado.",
    todayTitle: "Hoy",
    todayPoints: [
      "Las comisiones se concilian semanalmente.",
      "La atribución de marca virtual se hace a mano.",
      "El margen pickup vs delivery se pierde en el ruido.",
      "Las caídas de rating de plataforma aparecen tarde.",
    ],
    todayFooter: "Conciliación en hoja de cálculo.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "Conciliación en vivo de comisiones.",
      "Atribución de marcas unificada.",
      "Margen por canal separado y expuesto.",
      "Salud de plataformas monitoreada vía Watchtower.",
    ],
    withSundaeFooter: "Margen que de verdad puedes defender.",
    capabilitiesEyebrow: "PENSADO PARA CLOUD KITCHENS",
    capabilitiesHeadline: "Economía de delivery, transparente y en vivo.",
    capabilities: [
      {
        iconKey: "truck",
        title: "Margen real por plataforma",
        body: "DoorDash, UberEats, Deliveroo, Talabat - con comisión, empaque, reembolsos y ajustes conciliados por orden.",
        intelLayer: "Insights · Revenue Assurance",
      },
      {
        iconKey: "layers",
        title: "Atribución de marcas virtuales",
        body: "Atribución multi-marca, multi-plataforma unificada. Conoce qué concepto virtual realmente aporta margen por cocina.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "wifi",
        title: "Monitoreo de salud de plataformas",
        body: "Drift de rating, latencia de despacho, picos de reembolso, caídas de plataforma - emergidos vía Watchtower a tiempo para escalar.",
        intelLayer: "Watchtower",
      },
    ],
    mockupKey: "pulse",
    connectedSystems: [
      "POS (multi-marca)",
      "DoorDash",
      "UberEats",
      "Deliveroo",
      "Talabat",
      "Empaque e inventario",
    ],
    closingLine: "Defiende el margen que las plataformas se siguen comiendo.",
  },

  hospitalityGroups: {
    eyebrow: "PARA OPERADORES DE HOSPITALITY",
    headline: "F&B, habitaciones, eventos y catering tienen cada uno su propio reporte.",
    subhead:
      "Una sola vista de decisión en cada flujo de ingreso - con objetivos adaptativos por tipo de servicio y forecasting que respeta la diferencia entre un banquete y un brunch.",
    todayTitle: "Hoy",
    todayPoints: [
      "Reportes de F&B separados del PMS.",
      "Eventos analizados en hojas de cálculo.",
      "Margen de catering rastreado en contabilidad.",
      "La inteligencia cross-revenue se arma a pedido.",
    ],
    todayFooter: "Tres sistemas, una operación.",
    withSundaeTitle: "Con Sundae",
    withSundaePoints: [
      "F&B + habitaciones + eventos + catering, unificados.",
      "Atribución cross-revenue.",
      "Objetivos adaptativos por tipo de servicio.",
      "Forecasts por flujo de ingreso.",
    ],
    withSundaeFooter: "Una vista de decisión.",
    capabilitiesEyebrow: "PENSADO PARA HOSPITALITY",
    capabilitiesHeadline: "Cada flujo de ingreso en una vista de decisión.",
    capabilities: [
      {
        iconKey: "hotel",
        title: "Inteligencia cross-revenue",
        body: "F&B, habitaciones, eventos, banquetes y catering unificados - con atribución en jornadas de huésped y tipos de servicio.",
        intelLayer: "Cross-Intelligence",
      },
      {
        iconKey: "zap",
        title: "Objetivos adaptativos",
        body: "Objetivos y lógica de ritmo por separado para restaurante, brunch, banquete, conferencia y evento - cada uno con su cadencia.",
        intelLayer: "Insights",
      },
      {
        iconKey: "chartArea",
        title: "Forecast por flujo",
        body: "Forecasts que respetan la diferencia entre una cena de viernes de 200 cubiertos y un banquete de boda de 600.",
        intelLayer: "Foresight",
      },
    ],
    mockupKey: "foresight",
    connectedSystems: [
      "POS (puntos F&B)",
      "PMS (habitaciones)",
      "Sistemas de eventos y banquetes",
      "Gestión de catering",
      "Reservas",
      "Contabilidad / ERP",
    ],
    closingLine: "Maneja la propiedad como el sistema que en realidad es.",
  },
};

// Polish branch built solutions content for en/ar/fr/es before main expanded
// the locale list to 22. Using RequiredEnglishLocalizedRecord (Partial + en
// required) keeps the v2 preview compiling without needing 18 stub locales.
// New translations get layered in via the translation pipeline workstream.
export const solutionsContent: RequiredEnglishLocalizedRecord<SolutionsContent> = {
  en,
  ar,
  fr,
  es,
};

/* Backward-compat single-locale exports - kept for any non-i18n consumer
   (e.g. the /solutions hub page meta or a future static export). Page
   wrappers should resolve localized records through getLocalizedCopy. */
export const operationsLeaders = en.operationsLeaders;
export const financeTeams = en.financeTeams;
export const cSuite = en.cSuite;
export const marketingTeams = en.marketingTeams;
export const hrTeams = en.hrTeams;
export const techTeams = en.techTeams;
export const multiLocation = en.multiLocation;
export const franchises = en.franchises;
export const cloudKitchens = en.cloudKitchens;
export const hospitalityGroups = en.hospitalityGroups;
