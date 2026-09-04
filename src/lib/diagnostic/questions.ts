/**
 * Sundae Operations Diagnostic - question framework.
 *
 * The complete question bank spans 20 questions across 5 dimensions. The
 * public diagnostic intentionally uses a focused subset (exported below) so
 * a prospect gets a useful report without completing an internal sales-
 * qualification form. The full bank remains available to the report engine
 * and for backwards-compatible saved responses.
 *
 * The responses feed `lib/diagnostic/engine.ts` which maps response
 * patterns to Sundae module recommendations + leak hypotheses. When the
 * AI gateway is wired in (post-MVP), the engine swaps for a live LLM
 * call but the question + response shape stays stable.
 */

export type QuestionKind = "single" | "multi" | "text";

export type Question = {
  id: string;
  dimension: "profile" | "crew" | "core" | "foresight" | "tech";
  kind: QuestionKind;
  prompt: string;
  helper?: string;
  options?: { value: string; label: string; searchTerms?: string[] }[];
  /** For free text only - placeholder + max length */
  placeholder?: string;
  maxLength?: number;
  /** If true, the question is optional */
  optional?: boolean;
};

export const QUESTIONS: Question[] = [
  // ─── Operation profile (3) ──────────────────────────────────────────
  {
    id: "segment",
    dimension: "profile",
    kind: "multi",
    prompt: "Which types of food and hospitality business do you run?",
    helper: "Choose all that apply. Multi-concept groups can select more than one.",
    options: [
      { value: "qsr",          label: "QSR / Fast food" },
      { value: "fast_casual",  label: "Fast-casual" },
      { value: "casual",       label: "Casual dining" },
      { value: "fine_dining",  label: "Fine dining" },
      { value: "cloud",        label: "Cloud kitchen / Dark kitchen" },
      { value: "hotel_fb",     label: "Hotel F&B" },
      { value: "cafe_bakery",  label: "Café / Bakery" },
      { value: "bar_nightlife",label: "Bar / Nightlife" },
      { value: "catering",     label: "Catering / Events" },
      { value: "ghost_brand",  label: "Ghost / Virtual brand" },
      { value: "franchise",    label: "Franchise / Master franchisee" },
    ],
  },
  {
    id: "outlets",
    dimension: "profile",
    kind: "single",
    prompt: "How many outlets do you operate?",
    options: [
      { value: "1",       label: "1 outlet" },
      { value: "2_5",     label: "2-5 outlets" },
      { value: "6_15",    label: "6-15 outlets" },
      { value: "16_50",   label: "16-50 outlets" },
      { value: "51_150",  label: "51-150 outlets" },
      { value: "150_plus", label: "150+ outlets" },
    ],
  },
  {
    id: "avg_unit_volume",
    dimension: "profile",
    kind: "single",
    optional: true,
    prompt: "About how much revenue does each location make in a typical year?",
    helper: "Optional. Use the closest USD equivalent so we can make the financial ranges in your report more useful.",
    options: [
      { value: "under_500k", label: "Under $500K" },
      { value: "500k_1m",    label: "$500K-1M" },
      { value: "1m_2m",      label: "$1-2M" },
      { value: "2m_4m",      label: "$2-4M" },
      { value: "4m_7m",      label: "$4-7M" },
      { value: "7m_plus",    label: "$7M+" },
    ],
  },
  {
    id: "region",
    dimension: "profile",
    kind: "multi",
    prompt: "Where do you operate?",
    helper: "Choose every country or region where you currently operate.",
    options: [
      { value: "us",          label: "United States", searchTerms: ["USA", "US", "America"] },
      { value: "canada",      label: "Canada" },
      { value: "uk",          label: "United Kingdom", searchTerms: ["UK", "Great Britain", "Britain"] },
      { value: "ireland",     label: "Ireland" },
      { value: "europe_west", label: "Europe (Western)" },
      { value: "europe_nord", label: "Europe (Nordic)" },
      { value: "europe_east", label: "Europe (Eastern)" },
      { value: "uae",         label: "UAE", searchTerms: ["United Arab Emirates", "Dubai", "Abu Dhabi"] },
      { value: "ksa",         label: "Saudi Arabia", searchTerms: ["KSA"] },
      { value: "qatar",       label: "Qatar" },
      { value: "kuwait",      label: "Kuwait" },
      { value: "bahrain",     label: "Bahrain" },
      { value: "oman",        label: "Oman" },
      { value: "egypt",       label: "Egypt" },
      { value: "africa",      label: "Africa (other)" },
      { value: "sea",         label: "Southeast Asia", searchTerms: ["SEA"] },
      { value: "india",       label: "India" },
      { value: "japan",       label: "Japan" },
      { value: "korea",       label: "Korea" },
      { value: "china_hk",    label: "China / Hong Kong" },
      { value: "anzac",       label: "Australia / New Zealand", searchTerms: ["ANZ", "ANZAC"] },
      { value: "mexico",      label: "Mexico" },
      { value: "brazil",      label: "Brazil" },
      { value: "latam_other", label: "Latin America (other)" },
    ],
  },

  // ─── Crew / Workforce (3) ───────────────────────────────────────────
  {
    id: "scheduling_tool",
    dimension: "crew",
    kind: "multi",
    prompt: "How do you schedule today?",
    helper: "Select all that apply - many operators run multiple systems across brands or regions.",
    options: [
      { value: "manual",        label: "Manual / Spreadsheets" },
      { value: "7shifts",       label: "7shifts" },
      { value: "deputy",        label: "Deputy" },
      { value: "homebase",      label: "Homebase" },
      { value: "when_i_work",   label: "When I Work" },
      { value: "sling",         label: "Sling" },
      { value: "humanity",      label: "Humanity" },
      { value: "workforce_com", label: "Workforce.com" },
      { value: "hotschedules",  label: "HotSchedules / Fourth" },
      { value: "quinyx",        label: "Quinyx" },
      { value: "connecteam",    label: "Connecteam" },
      { value: "crunchtime",    label: "Crunchtime" },
      { value: "r365_sched",    label: "Restaurant365 (R365)" },
      { value: "push_ops",      label: "Push Operations" },
      { value: "bayzat",        label: "Bayzat (MEA)" },
      { value: "internal",      label: "Internal / Custom tool" },
      { value: "pos_built_in",  label: "Built into POS" },
      { value: "none",          label: "Nothing systematic" },
      { value: "other",         label: "Other" },
    ],
  },
  {
    id: "labor_pain",
    dimension: "crew",
    kind: "multi",
    prompt: "Which workforce problems cost you the most time or money?",
    helper: "Select all that apply.",
    options: [
      { value: "overstaffing",     label: "Overstaffing in slow windows" },
      { value: "no_show",          label: "No-shows / Call-outs" },
      { value: "ot_leakage",       label: "Overtime leakage" },
      { value: "buddy_punching",   label: "Buddy-punching / Time theft" },
      { value: "payroll_errors",   label: "Payroll errors" },
      { value: "compliance",       label: "Compliance / Statutory rules" },
      { value: "turnover",         label: "Turnover / Re-training" },
      { value: "none",             label: "Not a top concern today" },
    ],
  },
  {
    id: "payroll_regions",
    dimension: "crew",
    kind: "multi",
    optional: true,
    prompt: "Where do you run payroll?",
    helper: "Choose every country or region that applies, or skip if payroll is not part of what you want to assess.",
    options: [
      { value: "us",          label: "United States" },
      { value: "canada",      label: "Canada" },
      { value: "uk",          label: "United Kingdom" },
      { value: "eu",          label: "European Union" },
      { value: "uae",         label: "UAE" },
      { value: "ksa",         label: "Saudi Arabia" },
      { value: "qatar",       label: "Qatar / Bahrain / Oman" },
      { value: "other",       label: "Another country or region" },
    ],
  },

  // ─── Core / Insights (3) ────────────────────────────────────────────
  {
    id: "kpis_measured",
    dimension: "core",
    kind: "multi",
    optional: true,
    prompt: "Which performance numbers can you reliably see today?",
    helper: "Choose all that apply, or skip if you are not sure.",
    options: [
      { value: "labor_pct",       label: "Labor cost %" },
      { value: "food_cost",       label: "Food cost %" },
      { value: "void_comp",       label: "Voids / Comps" },
      { value: "avg_check",       label: "Average check" },
      { value: "upsell",          label: "Upsell / Attach rate" },
      { value: "guest_retention", label: "Guest retention" },
      { value: "ebitda",          label: "Operating profit (EBITDA) per location" },
      { value: "forecast_acc",    label: "Forecast accuracy" },
      { value: "compset",         label: "Competitive position" },
    ],
  },
  {
    id: "kpis_wished",
    dimension: "core",
    kind: "multi",
    optional: true,
    prompt: "What would you like to understand better?",
    helper: "Choose the questions you cannot answer reliably today. You can search the list or skip if you are not sure.",
    options: [
      { value: "real_time_margin",      label: "Real-time margin per shift" },
      { value: "daypart_leak",          label: "Daypart-level labor leak" },
      { value: "labor_productivity",    label: "Real-time labor productivity (sales per labor hour)" },
      { value: "live_labor_vs_demand",  label: "Live labor vs demand (real-time staffing pace)" },
      { value: "overtime_leakage",      label: "Overtime risk & leakage, live" },
      { value: "daypart_revpash",       label: "Revenue earned per available seat and hour" },
      { value: "hourly_food_cost",      label: "Hour-level food cost variance" },
      { value: "theoretical_actual",    label: "Expected versus actual ingredient cost" },
      { value: "item_profitability",    label: "True item-level profitability" },
      { value: "menu_engineering",      label: "Which menu items to promote, improve, or remove" },
      { value: "server_upsell",         label: "Server-level upsell attach rate" },
      { value: "cannibalization",       label: "Whether one offer or sales channel reduces another" },
      { value: "promo_roi",             label: "Promo ROI by channel" },
      { value: "delivery_margin",       label: "Delivery channel margin (third-party commission drag)" },
      { value: "guest_ltv",             label: "Guest lifetime value" },
      { value: "cohort_retention",      label: "How often different guest groups return" },
      { value: "noshow_prediction",     label: "Reservation no-show prediction" },
      { value: "inventory_shrinkage",   label: "Inventory shrinkage by item category" },
      { value: "cash_variance",         label: "Cash & revenue-assurance variance (skim detection)" },
      { value: "peer_benchmark",        label: "Anonymous peer benchmark" },
      { value: "competitor_pricing",    label: "Competitor pricing tracking" },
      { value: "forecast_per_outlet",   label: "Forecast per outlet, daily" },
      { value: "scheduling_eff",        label: "Scheduling efficiency vs demand" },
      { value: "decision_replay",       label: "Whether past management actions improved results" },
      { value: "cross_module",          label: "Cross-module correlation insights" },
      { value: "multi_brand_pnl",       label: "Multi-brand consolidated P&L" },
      { value: "compliance_drift",      label: "Compliance / brand-standard drift" },
      { value: "payroll_readiness",     label: "Real-time payroll readiness" },
      { value: "speed_of_service",      label: "Speed of service / ticket times by station" },
      { value: "food_waste",            label: "Food waste & spoilage tracking" },
      { value: "gratuity_distribution", label: "Tip / gratuity distribution & compliance" },
      { value: "guest_sentiment",       label: "Guest sentiment / review-trend tracking" },
    ],
  },
  {
    id: "decision_data",
    dimension: "core",
    kind: "multi",
    prompt: "Last major operations decisions - what data sources did you use?",
    helper: "Select all that applied - operators rarely use just one source for any meaningful decision.",
    options: [
      { value: "gut",           label: "Gut / Experience" },
      { value: "spreadsheet",   label: "Spreadsheet pulled by analyst" },
      { value: "pos_report",    label: "POS standard report" },
      { value: "bi_dashboard",  label: "BI dashboard (Power BI / Tableau / Looker / Domo)" },
      { value: "in_house_data", label: "In-house data warehouse / SQL queries" },
      { value: "external",      label: "External consultant / advisor" },
      { value: "ai_tool",       label: "AI tool (ChatGPT / Claude / Gemini)" },
      { value: "industry_report",label: "Industry report / Benchmark study" },
      { value: "board_packet",  label: "Board / leadership packet" },
    ],
  },

  // ─── Foresight / Strategic (3) ──────────────────────────────────────
  {
    id: "forecasting",
    dimension: "foresight",
    kind: "single",
    prompt: "How do you forecast revenue?",
    options: [
      { value: "lyear_gut",     label: "Last year + gut feel" },
      { value: "spreadsheet",   label: "Spreadsheet model maintained internally" },
      { value: "pos_system",    label: "Built into POS / accounting system" },
      { value: "bi_tool",       label: "BI tool with custom model" },
      { value: "ai_tool",       label: "Dedicated AI / forecasting tool" },
      { value: "none",          label: "We don't forecast formally" },
    ],
  },
  {
    id: "scenario_wish",
    dimension: "foresight",
    kind: "multi",
    optional: true,
    prompt: "Which decisions would you like to test before acting?",
    helper: "Choose all that apply, or skip if this is not a current need.",
    options: [
      { value: "new_location",   label: "Opening a new location" },
      { value: "menu_change",    label: "Menu / pricing change impact" },
      { value: "promo_impact",   label: "Promotion / discount impact" },
      { value: "staffing_model", label: "Staffing model change" },
      { value: "season_event",   label: "Seasonal / event impact" },
      { value: "competitor",     label: "Competitor entry / exit" },
      { value: "macro",          label: "Inflation / wage law / tax change" },
    ],
  },
  {
    id: "blind_spot",
    dimension: "foresight",
    kind: "text",
    prompt: "What's your biggest blind spot today?",
    helper: "One sentence is enough. Sundae will flag this directly in your report.",
    placeholder: "e.g. \"I can't tell if a slow week is competitor-driven or seasonal.\"",
    maxLength: 280,
    optional: true,
  },

  // ─── Tech stack (3) ─────────────────────────────────────────────────
  {
    id: "pos",
    dimension: "tech",
    kind: "multi",
    prompt: "Which POS system(s) do you use?",
    helper: "Choose all that apply. Multi-brand groups can select more than one; search if you do not see yours immediately.",
    options: [
      { value: "toast",       label: "Toast" },
      { value: "square",      label: "Square" },
      { value: "lightspeed",  label: "Lightspeed (K-Series / X-Series)" },
      { value: "micros",      label: "Oracle Micros / Simphony" },
      { value: "aloha",       label: "NCR Aloha" },
      { value: "brink",       label: "Brink (PAR)" },
      { value: "revel",       label: "Revel" },
      { value: "clover",      label: "Clover" },
      { value: "spoton",      label: "SpotOn" },
      { value: "touchbistro", label: "TouchBistro" },
      { value: "foodics",     label: "Foodics" },
      { value: "untill",      label: "Untill" },
      { value: "mpluskassa",  label: "MplusKASSA" },
      { value: "odoo",        label: "Odoo POS" },
      { value: "r365_pos",    label: "Restaurant365 POS" },
      { value: "petpooja",    label: "Petpooja (India)" },
      { value: "posist",      label: "POSist / Restroworks" },
      { value: "maitre_d",    label: "Maitre'D" },
      { value: "heartland",   label: "Heartland Restaurant" },
      { value: "linga",       label: "Linga POS" },
      { value: "shopkeep",    label: "ShopKeep" },
      { value: "loyverse",    label: "Loyverse" },
      { value: "positouch",   label: "POSitouch" },
      { value: "other",       label: "Other" },
    ],
  },
  {
    id: "ops_tools",
    dimension: "tech",
    kind: "multi",
    optional: true,
    prompt: "Which other systems support your day-to-day operation?",
    helper: "Choose all that apply, or skip if none of these are relevant.",
    options: [
      { value: "scheduling",   label: "Workforce scheduling" },
      { value: "payroll",      label: "Payroll provider" },
      { value: "purchasing",   label: "Purchasing / Inventory" },
      { value: "delivery",     label: "Delivery aggregator manager" },
      { value: "reservations", label: "Reservations / Table management" },
      { value: "crm",          label: "Guest CRM / Loyalty" },
      { value: "bi",           label: "BI tool (Power BI / Tableau / Looker)" },
    ],
  },
  {
    id: "priority",
    dimension: "tech",
    kind: "text",
    prompt: "If you could fix one thing in the next 90 days, what would it be?",
    helper: "Your answer shapes the 30/60/90-day plan in your diagnostic.",
    placeholder: "e.g. \"Eliminate overtime leakage across our 8 outlets.\"",
    maxLength: 280,
    optional: false,
  },

  // ─── Decision context (3) ───────────────────────────────────────────
  // Added to deepen insight quality on the multi-select answers above.
  {
    id: "timeline",
    dimension: "tech",
    kind: "single",
    prompt: "When do you want to be live with a new operations stack?",
    helper: "Shapes urgency framing in your diagnostic and routing to the right Sundae motion.",
    options: [
      { value: "asap",          label: "Right now - actively evaluating" },
      { value: "next_quarter",  label: "Next quarter" },
      { value: "next_6_months", label: "Next 6 months" },
      { value: "this_year",     label: "Before end of year" },
      { value: "exploring",     label: "Just exploring · No timeline" },
    ],
  },
  {
    id: "decision_lag",
    dimension: "tech",
    kind: "single",
    prompt: "How long does it take you to make a meaningful operational decision today?",
    helper: "From signal to action - measures the lag Sundae compresses.",
    options: [
      { value: "minutes",  label: "Minutes - we react in-shift" },
      { value: "hours",    label: "Hours - same day" },
      { value: "days",     label: "Days - weekly review cycle" },
      { value: "weeks",    label: "Weeks - monthly close cycle" },
      { value: "months",   label: "Months - quarterly review only" },
    ],
  },
  {
    id: "budget_band",
    dimension: "tech",
    kind: "single",
    prompt: "What's your current annual ops tech investment? (Software/SaaS only)",
    helper: "POS + analytics + scheduling + payroll + BI subscriptions. Answers stay private. People costs come in the next question.",
    optional: true,
    options: [
      { value: "under_10k",     label: "Under $10K" },
      { value: "10_25k",        label: "$10-25K" },
      { value: "25_50k",        label: "$25-50K" },
      { value: "50_100k",       label: "$50-100K" },
      { value: "100_250k",      label: "$100-250K" },
      { value: "250_500k",      label: "$250-500K" },
      { value: "500k_1m",       label: "$500K-1M" },
      { value: "1m_plus",       label: "$1M+" },
      { value: "unsure",        label: "Not sure" },
    ],
  },
  {
    id: "tech_headcount",
    dimension: "tech",
    kind: "single",
    prompt: "How many people in-house run that tech stack?",
    helper: "Analysts, BI / Power BI developers, data engineers, ops analysts - the people pulling reports and maintaining dashboards. Often 2-5× the software cost.",
    optional: true,
    options: [
      { value: "none",          label: "None - we don't have anyone dedicated" },
      { value: "fractional",    label: "Fractional / shared with other functions" },
      { value: "one",           label: "1 person" },
      { value: "two_three",     label: "2-3 people" },
      { value: "four_eight",    label: "4-8 people" },
      { value: "nine_twenty",   label: "9-20 people" },
      { value: "twenty_plus",   label: "20+ people" },
    ],
  },
];

/**
 * Public, conversion-friendly questionnaire.
 *
 * These 14 questions are the minimum set needed to produce a useful operating
 * profile, workforce read, visibility-gap assessment, scenario recommendation,
 * integration view, and a specific 30/60/90-day plan. The six omitted bank
 * questions are either duplicated by the 90-day priority or are internal sales
 * qualification fields that should not stand between a visitor and their
 * promised report.
 */
export const PUBLIC_DIAGNOSTIC_QUESTION_IDS = [
  "segment",
  "outlets",
  "avg_unit_volume",
  "region",
  "scheduling_tool",
  "labor_pain",
  "payroll_regions",
  "kpis_measured",
  "kpis_wished",
  "forecasting",
  "scenario_wish",
  "pos",
  "ops_tools",
  "priority",
] as const;

const publicQuestionIds = new Set<string>(PUBLIC_DIAGNOSTIC_QUESTION_IDS);

export const PUBLIC_DIAGNOSTIC_QUESTIONS: Question[] = QUESTIONS.filter((question) =>
  publicQuestionIds.has(question.id),
);
