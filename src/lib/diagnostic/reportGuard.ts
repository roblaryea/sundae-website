/**
 * Guard for the AI narrative (spec 5.4).
 *
 * The model may write four kinds of field: the summary, each leak
 * explanation, the 30/60/90 steps and one Crew sentence. Each one is checked
 * on its own; a field that breaks any rule is replaced by the rules engine's
 * sentence for that field. Everything else in the report always comes from
 * the rules engine, whatever the model returns.
 *
 * Patterns cover the 22 website languages. Where a currency or magnitude
 * word is also an everyday word (Korean 원 in 직원, Japanese 円 in 円滑,
 * Italian "Lei"), it only counts directly after a digit.
 */

import type { DiagnosticReport } from "./engine";
import { ALL_PRODUCT_NAMES, FORESIGHT_ACTION_NAME, INTERNAL_TERMS, WATCHTOWER_NAME } from "./productFacts";

export type GuardRule =
  | "empty"
  | "too_long"
  | "currency"
  | "percentage"
  | "magnitude"
  | "financial_claim"
  | "product"
  | "internal_term"
  | "vendor"
  | "name_overuse";

const NOT_LETTER_BEFORE = "(?<![\\p{L}\\p{N}])";
const NOT_LETTER_AFTER = "(?![\\p{L}\\p{N}])";
const word = (alternatives: string) => new RegExp(`${NOT_LETTER_BEFORE}(?:${alternatives})${NOT_LETTER_AFTER}`, "iu");

const CURRENCY_PATTERNS: RegExp[] = [
  /[$€£¥₹₩₺₽₫฿₱₦₪₴₸₼﷼]/u,
  // ISO codes are matched in capitals only, so "try" or "cad" in prose never count.
  new RegExp(
    `${NOT_LETTER_BEFORE}(?:USD|EUR|GBP|AED|SAR|QAR|KWD|BHD|OMR|EGP|JOD|INR|PKR|BDT|LKR|JPY|CNY|RMB|KRW|IDR|VND|THB|MYR|SGD|HKD|PHP|AUD|NZD|CAD|CHF|SEK|NOK|DKK|PLN|RON|HUF|CZK|TRY|BRL|MXN|ZAR|NGN|KES)${NOT_LETTER_AFTER}`,
    "u",
  ),
  word("dollars?|euros?|pounds sterling|dirhams?|riyals?|rupees?|dinars?|ringgit|rupiah|zloty|złoty|złotych|reais|liras?|dólares?|dollari|dolarów"),
  new RegExp(`${NOT_LETTER_BEFORE}(?:Dh|Dhs|SR|QR|KD|BD|Rs|zł|kr)${NOT_LETTER_AFTER}`, "u"),
  /\d[\d.,\s]*\s?(?:万|萬|億|亿|千|억|만|천)?\s?(?:lei|元|円|원|บาท|ドル|달러|đồng|đô|টাকা|ডলার|روپے|रुपये|रुपए)/u,
  /درهم|ريال|دينار|دولار|يورو|روپیہ|美元|欧元|歐元|人民币|ドル|달러|ดอลลาร์|đô la|ডলার/u,
];

const PERCENTAGE_PATTERNS: RegExp[] = [
  /[%٪％]/u,
  word("per ?cent|percent(?:age)?s?|pour ?cent|por ?ciento|por ?cento|per ?cento|prozent|procent\\w*|yüzde|persen|peratus"),
  /phần trăm|เปอร์เซ็นต์|प्रतिशत|শতাংশ|فیصد|بالمئة|في المئة|بالمائة|في المائة|百分之|パーセント|퍼센트/u,
];

const MAGNITUDE_PATTERNS: RegExp[] = [
  new RegExp(
    `\\d[\\d.,\\s]*\\s?(?:k|m|mn|bn|thousand|million|billion|lakhs?|crores?|mio|mrd|tsd|mil|millones?|milliards?|millions?|milioni|miliard\\w*|milion\\w*|milhões|milhão|milhares|bin|milyon|milyar|juta|ribu|miliar|triệu|nghìn|ngàn|tỷ|ล้าน|พัน|हज़ार|हजार|लाख|करोड़|মিলিয়ন|লাখ|কোটি|হাজার|ألف|آلاف|مليون|ملايين|مليار|ہزار|لاکھ|کروڑ|ملین)${NOT_LETTER_AFTER}`,
    "iu",
  ),
  /\d\s?(?:万|萬|億|亿|千|억|만|천)/u,
];

const FINANCIAL_PATTERNS: RegExp[] = [
  word("EBITDA|ROI|savings?|uplift|pay-?back|return on investment"),
  /économies?|ahorros?|einsparung|ersparnis|besparing|economias?|poupança|risparmi|oszczędnoś|tasarruf|economii|penghematan|penjimatan|tiết kiệm/iu,
  /ประหยัด|وفورات|توفير التكاليف|بچت|बचत|সাশ্রয়|节省|节约|節約|절약/u,
];

const VENDOR_NAMES = ["OpenAI", "ChatGPT", "GPT", "Anthropic", "Claude", "Gemini", "Bard", "Mistral", "Copilot", "DeepSeek", "Haiku", "Sonnet", "Opus", "LLM", "language model", "AI model", "Vercel"];
const VENDOR = new RegExp(`${NOT_LETTER_BEFORE}(?:${VENDOR_NAMES.join("|")})(?:-?\\d[\\w.-]*)?${NOT_LETTER_AFTER}`, "giu");

const INTERNAL = new RegExp(INTERNAL_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");

const RETIRED_NAMES = ["Report Lite", "Report Plus", "Report Pro", "Core Lite", "Core Pro"];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export interface GuardContext {
  firstName: string;
  /** Product names that may be mentioned: the recommended stack only. */
  allowedProducts: ReadonlySet<string>;
  hasCrew: boolean;
  hasForesight: boolean;
}

/** The names a field may use, read from the rules engine's report. */
export function guardContextFor(report: DiagnosticReport, name: string): GuardContext {
  const allowed = new Set<string>(report.tierFit.split(" + ").map((part) => part.trim()).filter(Boolean));
  for (const addOn of report.startingPackage.addOns) allowed.add(addOn.name);
  if (report.startingPackage.foresight) allowed.add(FORESIGHT_ACTION_NAME);
  return {
    firstName: name.trim().split(/\s+/)[0] ?? "",
    allowedProducts: allowed,
    hasCrew: Boolean(report.crew),
    hasForesight:
      report.startingPackage.foresight === "included" ||
      report.startingPackage.addOns.some((addOn) => addOn.name === FORESIGHT_ACTION_NAME),
  };
}

function mentionsUnrecommendedProduct(text: string, context: GuardContext): boolean {
  let rest = text;
  for (const name of [...RETIRED_NAMES, ...ALL_PRODUCT_NAMES]) {
    const pattern = new RegExp(`${NOT_LETTER_BEFORE}${escapeRegExp(name)}${NOT_LETTER_AFTER}`, "giu");
    if (!pattern.test(rest)) continue;
    if (!context.allowedProducts.has(name)) return true;
    rest = rest.replace(pattern, " ");
  }
  if (!context.hasCrew && new RegExp(`${NOT_LETTER_BEFORE}Crew${NOT_LETTER_AFTER}`, "u").test(rest)) return true;
  if (!context.hasForesight && new RegExp(`${NOT_LETTER_BEFORE}Foresight${NOT_LETTER_AFTER}`, "u").test(rest)) return true;
  if (!context.allowedProducts.has(WATCHTOWER_NAME) && /Watchtower/i.test(rest)) return true;
  return false;
}

function mentionsVendor(text: string, firstName: string): boolean {
  const own = firstName.trim().toLowerCase();
  return [...text.matchAll(VENDOR)].some((match) => match[0].toLowerCase() !== own);
}

export function countName(text: string, firstName: string): number {
  const name = firstName.trim();
  if (name.length < 2) return 0;
  const pattern = new RegExp(`${NOT_LETTER_BEFORE}${escapeRegExp(name)}${NOT_LETTER_AFTER}`, "giu");
  return text.match(pattern)?.length ?? 0;
}

/** Every rule the text breaks (empty when the field is safe to show). */
export function findViolations(text: unknown, context: GuardContext, maxLength = 700): GuardRule[] {
  if (typeof text !== "string" || !text.trim()) return ["empty"];
  const violations: GuardRule[] = [];
  if (text.length > maxLength) violations.push("too_long");
  if (CURRENCY_PATTERNS.some((pattern) => pattern.test(text))) violations.push("currency");
  if (PERCENTAGE_PATTERNS.some((pattern) => pattern.test(text))) violations.push("percentage");
  if (MAGNITUDE_PATTERNS.some((pattern) => pattern.test(text))) violations.push("magnitude");
  if (FINANCIAL_PATTERNS.some((pattern) => pattern.test(text))) violations.push("financial_claim");
  if (mentionsUnrecommendedProduct(text, context)) violations.push("product");
  if (INTERNAL.test(text)) violations.push("internal_term");
  if (mentionsVendor(text, context.firstName)) violations.push("vendor");
  if (countName(text, context.firstName) > MAX_NAME_USES) violations.push("name_overuse");
  return violations;
}

export interface GeneratedNarrative {
  summary?: unknown;
  leaks?: unknown;
  plan?: unknown;
  crewSentence?: unknown;
}

export interface GuardOutcome {
  report: DiagnosticReport;
  /** Fields replaced by the rules sentence, with the rules each one broke. */
  replaced: Array<{ field: string; rules: GuardRule[] }>;
}

const MAX_NAME_USES = 2;

/**
 * Merge the model's narrative into the rules report, field by field.
 * Fields are taken in reading order; once the first name has appeared twice
 * in the report, any later field that uses it again falls back to the rules
 * sentence.
 */
export function guardNarrative(
  generated: GeneratedNarrative | null | undefined,
  reference: DiagnosticReport,
  context: GuardContext,
): GuardOutcome {
  const replaced: GuardOutcome["replaced"] = [];
  let nameUses = 0;

  /** True when the candidate may be shown; records the replacement otherwise. */
  const passes = (field: string, candidate: unknown, fallback: string, maxLength: number): candidate is string => {
    const violations = findViolations(candidate, context, maxLength);
    const uses = violations.length ? 0 : countName(candidate as string, context.firstName);
    if (!violations.length && nameUses + uses > MAX_NAME_USES) violations.push("name_overuse");
    if (violations.length) {
      replaced.push({ field, rules: violations });
      nameUses += countName(fallback, context.firstName);
      return false;
    }
    nameUses += uses;
    return true;
  };

  const summary = passes("summary", generated?.summary, reference.summary, 700)
    ? String(generated!.summary).trim()
    : reference.summary;

  const leaks = Array.isArray(generated?.leaks) ? (generated!.leaks as Array<{ id?: unknown; explanation?: unknown }>) : [];
  const topLeaks = reference.topLeaks.map((leak) => {
    const candidate = leaks.find((item) => item && item.id === leak.id)?.explanation;
    return { ...leak, detail: passes(`leaks.${leak.id}`, candidate, leak.detail, 600) ? String(candidate).trim() : leak.detail };
  });

  const plan = Array.isArray(generated?.plan) ? (generated!.plan as Array<{ horizon?: unknown; title?: unknown; detail?: unknown }>) : [];
  const quickWins = reference.quickWins.map((win) => {
    const candidate = plan.find((item) => item && item.horizon === win.horizon);
    const title = typeof candidate?.title === "string" ? candidate.title.trim() : "";
    const detail = typeof candidate?.detail === "string" ? candidate.detail.trim() : "";
    const combined = title && detail && title.length <= 90 ? `${title}\n${detail}` : "";
    return passes(`plan.${win.horizon}`, combined, `${win.title}\n${win.detail}`, 600)
      ? { horizon: win.horizon, title, detail }
      : win;
  });

  const crew = reference.crew
    ? {
        ...reference.crew,
        sentence: passes("crewSentence", generated?.crewSentence, reference.crew.sentence, 300)
          ? String(generated!.crewSentence).trim()
          : reference.crew.sentence,
      }
    : null;

  return {
    report: { ...reference, summary, topLeaks, quickWins, crew },
    replaced,
  };
}
