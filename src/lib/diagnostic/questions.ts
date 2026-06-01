/**
 * Sundae Operations Diagnostic — question framework.
 *
 * 15 chip-based questions across 5 dimensions (Operation profile, Crew,
 * Core, Foresight, Tech stack). Designed for ~10-minute completion. Two
 * free-text fields max — everything else is chip selection (single or
 * multi).
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
  options?: { value: string; label: string }[];
  /** For free text only — placeholder + max length */
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
    kind: "single",
    prompt: "What's your primary segment?",
    helper: "Segment affects what Sundae prioritizes — fine dining behaves differently from QSR.",
    options: [
      { value: "qsr",          label: "QSR / Fast food" },
      { value: "fast_casual",  label: "Fast-casual" },
      { value: "casual",       label: "Casual dining" },
      { value: "fine_dining",  label: "Fine dining" },
      { value: "cloud",        label: "Cloud kitchen / Dark kitchen" },
      { value: "hotel_fb",     label: "Hotel F&B" },
      { value: "multi",        label: "Multi-concept group" },
      { value: "cafe_bakery",  label: "Café / Bakery" },
    ],
  },
  {
    id: "outlets",
    dimension: "profile",
    kind: "single",
    prompt: "How many outlets do you operate?",
    options: [
      { value: "1",       label: "1 outlet" },
      { value: "2_5",     label: "2–5 outlets" },
      { value: "6_15",    label: "6–15 outlets" },
      { value: "16_50",   label: "16–50 outlets" },
      { value: "51_150",  label: "51–150 outlets" },
      { value: "150_plus", label: "150+ outlets" },
    ],
  },
  {
    id: "region",
    dimension: "profile",
    kind: "single",
    prompt: "Where do you operate?",
    helper: "Determines currency, country pack relevance, and benchmark cohort fit.",
    options: [
      { value: "us",      label: "United States" },
      { value: "canada",  label: "Canada" },
      { value: "europe",  label: "Europe" },
      { value: "uk",      label: "United Kingdom" },
      { value: "mea",     label: "Middle East / GCC" },
      { value: "apac",    label: "Asia-Pacific" },
      { value: "latam",   label: "Latin America" },
      { value: "africa",  label: "Africa" },
      { value: "multi",   label: "Multi-region" },
    ],
  },

  // ─── Crew / Workforce (3) ───────────────────────────────────────────
  {
    id: "scheduling_tool",
    dimension: "crew",
    kind: "single",
    prompt: "How do you schedule today?",
    options: [
      { value: "manual",      label: "Manual / Spreadsheets" },
      { value: "deputy",      label: "Deputy / Homebase" },
      { value: "7shifts",     label: "7shifts" },
      { value: "humanity",    label: "Humanity / Workforce.com" },
      { value: "bayzat",      label: "Bayzat (MEA)" },
      { value: "internal",    label: "Internal tool" },
      { value: "none",        label: "Nothing systematic" },
      { value: "other",       label: "Other / Multiple" },
    ],
  },
  {
    id: "labor_pain",
    dimension: "crew",
    kind: "multi",
    prompt: "Where does labor cost leak most?",
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
    prompt: "Which countries does payroll touch?",
    helper: "Select all that apply — affects which country packs would be relevant.",
    options: [
      { value: "us",          label: "United States" },
      { value: "canada",      label: "Canada" },
      { value: "uk",          label: "United Kingdom" },
      { value: "eu",          label: "European Union" },
      { value: "uae",         label: "UAE" },
      { value: "ksa",         label: "Saudi Arabia" },
      { value: "qatar",       label: "Qatar / Bahrain / Oman" },
      { value: "other",       label: "Other (write below)" },
    ],
  },

  // ─── Core / Insights (3) ────────────────────────────────────────────
  {
    id: "kpis_measured",
    dimension: "core",
    kind: "multi",
    prompt: "Which KPIs do you actively track today?",
    helper: "Select all that apply.",
    options: [
      { value: "labor_pct",       label: "Labor cost %" },
      { value: "food_cost",       label: "Food cost %" },
      { value: "void_comp",       label: "Voids / Comps" },
      { value: "avg_check",       label: "Average check" },
      { value: "upsell",          label: "Upsell / Attach rate" },
      { value: "guest_retention", label: "Guest retention" },
      { value: "ebitda",          label: "EBITDA per outlet" },
      { value: "forecast_acc",    label: "Forecast accuracy" },
      { value: "compset",         label: "Competitive position" },
    ],
  },
  {
    id: "kpis_wished",
    dimension: "core",
    kind: "multi",
    prompt: "Which KPIs do you wish you could measure but can't today?",
    helper: "This is the gap Sundae fills — be honest, multi-select.",
    options: [
      { value: "real_time_margin",   label: "Real-time margin per shift" },
      { value: "daypart_leak",       label: "Daypart-level labor leak" },
      { value: "item_profitability", label: "True item-level profitability" },
      { value: "guest_ltv",          label: "Guest lifetime value" },
      { value: "peer_benchmark",     label: "Anonymous peer benchmark" },
      { value: "competitor_pricing", label: "Competitor pricing tracking" },
      { value: "forecast_per_outlet",label: "Forecast per outlet, daily" },
      { value: "scheduling_eff",     label: "Scheduling efficiency vs demand" },
      { value: "compliance_drift",   label: "Compliance / brand-standard drift" },
    ],
  },
  {
    id: "decision_data",
    dimension: "core",
    kind: "single",
    prompt: "Last major operations decision — what data did you use?",
    options: [
      { value: "gut",           label: "Gut / Experience" },
      { value: "spreadsheet",   label: "Spreadsheet pulled by analyst" },
      { value: "pos_report",    label: "POS standard report" },
      { value: "bi_dashboard",  label: "BI dashboard (Power BI / Tableau / Looker)" },
      { value: "external",      label: "External consultant / advisor" },
      { value: "mix",           label: "Mix of the above" },
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
    prompt: "Which what-if scenarios do you wish you could model?",
    helper: "Select all that apply.",
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
    helper: "Select all that apply.",
    options: [
      { value: "toast",       label: "Toast" },
      { value: "square",      label: "Square" },
      { value: "lightspeed",  label: "Lightspeed" },
      { value: "micros",      label: "Oracle Micros" },
      { value: "foodics",     label: "Foodics" },
      { value: "untill",      label: "Untill" },
      { value: "mpluskassa",  label: "MplusKASSA" },
      { value: "odoo",        label: "Odoo POS" },
      { value: "other",       label: "Other" },
    ],
  },
  {
    id: "ops_tools",
    dimension: "tech",
    kind: "multi",
    prompt: "What other ops tools do you currently run?",
    helper: "Select all that apply.",
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
];
