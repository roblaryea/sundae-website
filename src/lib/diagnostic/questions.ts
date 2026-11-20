/**
 * Sundae Operations Diagnostic - question bank (spec 3.2, Phase A).
 *
 * One bank, rendered today by the step-by-step form and later by the guided
 * conversation. Ids and option values are stable keys: they are stored in
 * saved progress, sent to the rules engine and kept in lead metadata, so
 * never rename one without bumping `QUESTION_BANK_VERSION`.
 *
 * Visible wording lives in the locale packs (`copy/<locale>.ts`), keyed by
 * these ids and values. Product, POS and country names are not translated:
 * countries are named by `Intl.DisplayNames` in the visitor's language.
 */

/** Bump when ids, values or meanings change so old saved answers are dropped. */
export const QUESTION_BANK_VERSION = 2;

export type DiagnosticPart = "operation" | "crew" | "core" | "systems" | "report";
export const DIAGNOSTIC_PARTS: readonly DiagnosticPart[] = ["operation", "crew", "core", "systems", "report"];

export type QuestionKind =
  | "name"
  | "number"
  | "single"
  | "multi"
  | "countries"
  | "pos"
  | "longtext"
  | "contact";

export type DiagnosticResponses = Record<string, string | string[]>;

export interface QuestionOption {
  value: string;
  /** Sub-heading the option sits under (e.g. restaurant formats). */
  group?: string;
  /** Selecting it clears the others, and selecting another clears it. */
  exclusive?: boolean;
  /** Extra search words (brand aliases); never shown. */
  searchTerms?: readonly string[];
}

export interface Question {
  id: string;
  part: DiagnosticPart;
  kind: QuestionKind;
  optional?: boolean;
  options?: readonly QuestionOption[];
  maxLength?: number;
  min?: number;
  max?: number;
  quickPicks?: readonly number[];
  /** Asked only when this returns true for the answers so far. */
  showWhen?: (responses: DiagnosticResponses) => boolean;
}

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export const ROLE_KEYS = ["owner_ceo", "operations", "finance", "hr_people", "tech_data", "other"] as const;
export type RoleKey = (typeof ROLE_KEYS)[number];

/** English labels are what the lead's `role` stores, whatever the visitor's language. */
export const ROLE_LABELS_EN: Record<RoleKey, string> = {
  owner_ceo: "Owner or CEO",
  operations: "Operations",
  finance: "Finance",
  hr_people: "HR and people",
  tech_data: "Tech and data",
  other: "Other",
};

/**
 * ISO 3166-1 alpha-2 codes offered for "Where do you operate?" and "Where do
 * you run payroll?". Names come from Intl.DisplayNames in the visitor's
 * language, so the list itself needs no translation.
 */
export const COUNTRY_CODES = [
  "AE", "SA", "QA", "KW", "BH", "OM", "EG", "JO", "LB", "IQ", "MA", "TN", "DZ", "LY", "PS", "YE",
  "US", "CA", "MX", "BR", "AR", "CL", "CO", "PE", "UY", "PY", "BO", "EC", "VE", "CR", "PA", "GT",
  "DO", "PR", "JM", "TT", "BS", "BB",
  "GB", "IE", "FR", "DE", "NL", "BE", "LU", "ES", "PT", "IT", "MT", "CH", "AT", "DK", "SE", "NO",
  "FI", "IS", "PL", "CZ", "SK", "HU", "RO", "BG", "GR", "CY", "HR", "SI", "RS", "BA", "ME", "MK",
  "AL", "EE", "LV", "LT", "UA", "MD", "GE", "AM", "AZ", "TR", "KZ", "UZ",
  "IN", "PK", "BD", "LK", "NP", "MV",
  "SG", "MY", "ID", "TH", "VN", "PH", "KH", "MM", "BN",
  "CN", "HK", "MO", "TW", "JP", "KR", "MN",
  "AU", "NZ", "FJ",
  "ZA", "NG", "KE", "GH", "ET", "TZ", "UG", "RW", "SN", "CI", "CM", "MU", "BW", "NA", "ZM", "ZW",
  "IL",
] as const;

export const COUNTRY_CODE_SET: ReadonlySet<string> = new Set(COUNTRY_CODES);

/** POS brands (never translated). "other" and "not_sure" are localized. */
export const POS_OPTIONS: readonly QuestionOption[] = [
  { value: "toast" },
  { value: "square" },
  { value: "lightspeed" },
  { value: "micros", searchTerms: ["Oracle", "Simphony"] },
  { value: "aloha", searchTerms: ["NCR", "Voyix"] },
  { value: "foodics" },
  { value: "revel" },
  { value: "clover" },
  { value: "brink", searchTerms: ["PAR"] },
  { value: "spoton" },
  { value: "touchbistro" },
  { value: "untill" },
  { value: "mpluskassa", searchTerms: ["Mplus"] },
  { value: "odoo" },
  { value: "r365_pos", searchTerms: ["Restaurant365"] },
  { value: "petpooja" },
  { value: "posist", searchTerms: ["Restroworks"] },
  { value: "maitre_d" },
  { value: "heartland" },
  { value: "linga" },
  { value: "loyverse" },
  { value: "positouch" },
  { value: "other" },
  { value: "not_sure", exclusive: true },
];

/** Brand names shown for POS values. */
export const POS_BRAND_NAMES: Record<string, string> = {
  toast: "Toast",
  square: "Square",
  lightspeed: "Lightspeed",
  micros: "Oracle MICROS Simphony",
  aloha: "NCR Aloha",
  foodics: "Foodics",
  revel: "Revel",
  clover: "Clover",
  brink: "Brink (PAR)",
  spoton: "SpotOn",
  touchbistro: "TouchBistro",
  untill: "Untill",
  mpluskassa: "MplusKASSA",
  odoo: "Odoo POS",
  r365_pos: "Restaurant365 POS",
  petpooja: "Petpooja",
  posist: "POSist / Restroworks",
  maitre_d: "Maitre'D",
  heartland: "Heartland Restaurant",
  linga: "Linga POS",
  loyverse: "Loyverse",
  positouch: "POSitouch",
};

const GCC_MENA = new Set(["AE", "SA", "QA", "KW", "BH", "OM", "EG", "JO", "LB", "IQ", "MA", "TN", "DZ", "LY", "PS", "YE"]);
const NORTH_AMERICA = new Set(["US", "CA", "MX", "PR"]);
const UK_IE = new Set(["GB", "IE"]);
const SOUTH_ASIA = new Set(["IN", "PK", "BD", "LK", "NP", "MV"]);
const ASIA_PACIFIC = new Set(["SG", "MY", "ID", "TH", "VN", "PH", "KH", "MM", "BN", "CN", "HK", "MO", "TW", "JP", "KR", "MN", "AU", "NZ", "FJ"]);

/** POS brands most relevant to a country, mirroring the guided booking's list. */
function posForCountry(code: string): string[] {
  if (GCC_MENA.has(code)) return ["foodics", "micros", "lightspeed", "revel"];
  if (NORTH_AMERICA.has(code)) return ["toast", "square", "micros", "aloha", "clover", "lightspeed"];
  if (UK_IE.has(code)) return ["lightspeed", "micros", "square", "toast"];
  if (SOUTH_ASIA.has(code)) return ["petpooja", "posist", "micros"];
  if (ASIA_PACIFIC.has(code)) return ["square", "lightspeed", "micros", "loyverse"];
  return ["lightspeed", "micros", "square", "untill"];
}

/** Region-aware order: brands relevant to the visitor's countries come first. */
export function orderPosOptions(countries: readonly string[]): QuestionOption[] {
  const preferred: string[] = [];
  for (const code of countries.length ? countries : [""]) {
    for (const value of posForCountry(code)) if (!preferred.includes(value)) preferred.push(value);
  }
  const brands = POS_OPTIONS.filter((option) => option.value !== "other" && option.value !== "not_sure");
  const ranked = [
    ...preferred.map((value) => brands.find((option) => option.value === value)!).filter(Boolean),
    ...brands.filter((option) => !preferred.includes(option.value)),
  ];
  return [...ranked, ...POS_OPTIONS.filter((option) => option.value === "other" || option.value === "not_sure")];
}

/** Turn 6 answers that bring in the payroll-country question (turn 7). */
export const PAYROLL_TRIGGERS = ["payroll_prep", "tips"] as const;

export const QUESTIONS: Question[] = [
  // ─── 1. Your operation ─────────────────────────────────────────────
  { id: "name", part: "operation", kind: "name", maxLength: 80 },
  {
    id: "concepts",
    part: "operation",
    kind: "multi",
    options: [
      { value: "qsr", group: "restaurants" },
      { value: "fast_casual", group: "restaurants" },
      { value: "casual", group: "restaurants" },
      { value: "fine_dining", group: "restaurants" },
      { value: "cafe_bakery" },
      { value: "bar" },
      { value: "hotel_fb" },
      { value: "cloud_kitchen" },
      { value: "catering" },
      { value: "central_kitchen" },
      { value: "franchise" },
    ],
  },
  { id: "locations", part: "operation", kind: "number", min: 1, max: 9999, quickPicks: [1, 5, 10, 25] },
  { id: "countries", part: "operation", kind: "countries" },
  {
    id: "team_size",
    part: "operation",
    kind: "single",
    options: [
      { value: "up_to_15" },
      { value: "16_20" },
      { value: "21_40" },
      { value: "41_80" },
      { value: "more_80" },
    ],
  },

  // ─── 2. Running the day (Crew) ─────────────────────────────────────
  {
    id: "paper_processes",
    part: "crew",
    kind: "multi",
    options: [
      { value: "schedules" },
      { value: "time_attendance" },
      { value: "checklists" },
      { value: "logbook" },
      { value: "staff_files" },
      { value: "payroll_prep" },
      { value: "tips" },
      { value: "training" },
      { value: "none", exclusive: true },
    ],
  },
  {
    id: "payroll_countries",
    part: "crew",
    kind: "countries",
    showWhen: (responses) => values(responses.paper_processes).some((value) => (PAYROLL_TRIGGERS as readonly string[]).includes(value)),
  },
  {
    id: "team_costs",
    part: "crew",
    kind: "multi",
    options: [
      { value: "overtime" },
      { value: "no_shows" },
      { value: "buddy_punching" },
      { value: "payroll_errors" },
      { value: "turnover" },
      { value: "compliance" },
      { value: "none", exclusive: true },
    ],
    showWhen: (responses) => !values(responses.paper_processes).includes("none"),
  },

  // ─── 3. Where profit leaks (Core) ──────────────────────────────────
  {
    id: "money_leaks",
    part: "core",
    kind: "multi",
    options: [
      { value: "labor_vs_demand" },
      { value: "food_cost" },
      { value: "supplier_prices" },
      { value: "voids_discounts" },
      { value: "delivery_commissions" },
      { value: "menu_margins" },
      { value: "stockouts" },
      { value: "reservations_noshows" },
      { value: "guest_retention" },
      { value: "planning" },
      { value: "competitors" },
      { value: "not_sure", exclusive: true },
    ],
  },
  {
    id: "measure_fix",
    part: "core",
    kind: "single",
    options: [
      { value: "next_pnl" },
      { value: "spreadsheet" },
      { value: "baseline" },
      { value: "dont_know" },
    ],
  },

  // ─── 4. Your systems ───────────────────────────────────────────────
  { id: "pos", part: "systems", kind: "pos", options: POS_OPTIONS },
  {
    id: "other_systems",
    part: "systems",
    kind: "multi",
    optional: true,
    options: [
      { value: "scheduling_app" },
      { value: "hr_payroll" },
      { value: "inventory" },
      { value: "accounting" },
      { value: "reservations" },
      { value: "delivery_tablets" },
      { value: "loyalty_crm" },
      { value: "bi" },
    ],
  },

  // ─── 5. Your report ────────────────────────────────────────────────
  { id: "priority", part: "report", kind: "longtext", maxLength: 280 },
  { id: "contact", part: "report", kind: "contact" },
  {
    id: "role",
    part: "report",
    kind: "single",
    options: ROLE_KEYS.map((value) => ({ value })),
  },
];

export const QUESTIONS_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((question) => [question.id, question]),
);

/** Option values that carry visible, translated labels (excludes POS brands). */
export function localizedOptionValues(question: Question): string[] {
  if (!question.options) return [];
  if (question.kind === "pos") return ["other", "not_sure"];
  return question.options.map((option) => option.value);
}

/** Free-text detail typed next to an "Other" choice. */
export function diagnosticOtherKey(questionId: string): string {
  return `${questionId}_other`;
}

/** Answer keys holding contact details: never sent to the model or analytics. */
export const CONTACT_RESPONSE_KEYS = ["email", "company"] as const;
