/**
 * Sundae Operations Diagnostic - report builder.
 *
 * Turns the deterministic `Recommendation` (rules.ts) into a localized
 * report. Every field here is written by rules and fixed copy, so this
 * report is complete on its own: it is the fallback when the AI narrative is
 * unavailable, and the source of every sentence the guard puts back.
 *
 * The AI may rewrite only the summary, each leak explanation, the 30/60/90
 * text and one Crew sentence (spec 5). Everything else - package, Crew
 * option, add-ons, price, Profit Recovery loop - always comes from here.
 *
 * The legacy fields (`profileLine`, `summary`, `topLeaks`, `recommendedStack`,
 * `expectedImpact`, `quickWins`, `tierFit`) keep the shape the backend's
 * report email and admin view read from `metadata.report`.
 */

import { getWebsiteIntlLocale, normalizeWebsiteLocale, type WebsiteLocale } from "../i18n";
import { PRICE_BOOK_VERSION } from "../pricing/priceBook";
import { fill, getDiagnosticPack, type DiagnosticPack } from "./copy";
import { buildPricingSimUrl } from "./pricingLink";
import {
  CONCEPT_MODULE_NAMES,
  CORE_PACKAGE_FACTS,
  CREW_PRODUCT_FACTS,
  CREW_STARTER_MAX_LOCATIONS,
  CREW_STARTER_TEAM_CAP,
  FORESIGHT_ACTION_NAME,
  INCLUDED_CAPABILITY_NAMES,
  INCLUDED_WITH_EVERY_CORE,
  WATCHTOWER_NAME,
  type CoreModuleId,
  type CrewModuleId,
} from "./productFacts";
import { POS_BRAND_NAMES, diagnosticOtherKey, type DiagnosticResponses } from "./questions";
import { pruneHiddenAnswers } from "./flowLogic";
import { recommend, type HypothesisId, type Recommendation } from "./rules";

export type { DiagnosticResponses };

export const REPORT_VERSION = 2;

export interface LeakHypothesis {
  id: string;
  title: string;
  /** The explanation: written by the AI (guarded) or by the rules. */
  detail: string;
  /** Kept for the report email; v2 reports are unranked hypotheses ("medium"). */
  impactBand: "high" | "medium" | "low";
  impactCopy: string;
}

export interface RecoveryItem {
  leakId: string;
  title: string;
  watch: string;
  data: string;
  owner: string;
  measure: string;
}

export interface StackRecommendation {
  layer: "core" | "crew" | "watchtower" | "intelligence" | "foresight";
  label: string;
  why: string;
  detail: string;
}

export interface QuickWin {
  horizon: "30" | "60" | "90";
  title: string;
  detail: string;
}

export interface CrewSection {
  flagged: string[];
  packageName: string;
  covers: string[];
  /** One sentence: AI (guarded) or rules. */
  sentence: string;
  notes: string[];
}

export type ReportPrice =
  | { kind: "list"; locationsLabel: string; lines: Array<{ label: string; amount: string }>; total: string; basis: string }
  | { kind: "quoted"; locationsLabel: string; label: string; basis: string };

export interface StartingPackage {
  core: { name: string; covers: string[] };
  /** Foresight is in Core Performance ("included") or an optional add-on ("optional"). */
  foresight: "included" | "optional" | null;
  included: Array<{ name: string; description: string }>;
  crew: { name: string; covers: string[] } | null;
  addOns: Array<{ name: string; detail: string; price: string | null }>;
  concepts: string[];
  notes: string[];
  price: ReportPrice;
  calculatorUrl: string;
}

export interface DiagnosticReport {
  version: 2;
  locale: WebsiteLocale;
  profileLine: string;
  summary: string;
  topLeaks: LeakHypothesis[];
  recovery: { intro: string; items: RecoveryItem[]; note: string };
  crew: CrewSection | null;
  startingPackage: StartingPackage;
  quickWins: QuickWin[];
  tierFit: string;
  recommendedStack: StackRecommendation[];
  expectedImpact: { metric: string; range: string }[];
}

export interface DiagnosticResult {
  report: DiagnosticReport;
  recommendation: Recommendation;
}

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

function listFormat(locale: WebsiteLocale, items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  try {
    return new Intl.ListFormat(getWebsiteIntlLocale(locale), { style: "long", type: "conjunction" }).format(items);
  } catch {
    return items.join(", ");
  }
}

function money(locale: WebsiteLocale, amount: number): string {
  try {
    return new Intl.NumberFormat(getWebsiteIntlLocale(locale), {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${Math.round(amount).toLocaleString("en-US")}`;
  }
}

function number(locale: WebsiteLocale, value: number): string {
  try {
    return new Intl.NumberFormat(getWebsiteIntlLocale(locale)).format(value);
  } catch {
    return String(value);
  }
}

export function countryName(locale: WebsiteLocale, code: string): string {
  try {
    return new Intl.DisplayNames([getWebsiteIntlLocale(locale)], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

function optionLabel(pack: DiagnosticPack, questionId: string, value: string): string {
  const question = pack.questions[questionId as keyof DiagnosticPack["questions"]] as { options?: Record<string, string> } | undefined;
  return question?.options?.[value] ?? value;
}

function profileLine(pack: DiagnosticPack, locale: WebsiteLocale, responses: DiagnosticResponses, locations: number): string {
  const concepts = values(responses.concepts).map((value) => optionLabel(pack, "concepts", value));
  const countries = values(responses.countries).map((code) => countryName(locale, code));
  const shownCountries = countries.length > 3 ? `${listFormat(locale, countries.slice(0, 3))} +${countries.length - 3}` : listFormat(locale, countries);
  const team = values(responses.team_size)[0];
  return [
    listFormat(locale, concepts),
    fill(pack.rules.profileLocations, { count: number(locale, locations) }),
    shownCountries,
    team ? fill(pack.rules.profileTeam, { size: optionLabel(pack, "team_size", team) }) : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

function posLabel(pack: DiagnosticPack, responses: DiagnosticResponses): string {
  const first = values(responses.pos).find((value) => value !== "not_sure");
  if (!first) return pack.rules.posFallback;
  if (first === "other") {
    const detail = responses[diagnosticOtherKey("pos")];
    return typeof detail === "string" && detail.trim() ? detail.trim().slice(0, 60) : pack.rules.posFallback;
  }
  return POS_BRAND_NAMES[first] ?? pack.rules.posFallback;
}

function quoteText(text: string, max = 160): string {
  // Quoted inside a sentence that has its own punctuation, so drop a final full stop.
  const trimmed = text.trim().replace(/\s+/g, " ").replace(/[.。．!！؟?]+$/u, "");
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

function crewModulesCovered(pack: DiagnosticPack, modules: CrewModuleId[]): string[] {
  const order: CrewModuleId[] = ["crew_lite", "crew_scheduling", "crew_tna", "crew_operations", "crew_payroll", "crew_people_intelligence"];
  return order.filter((crewModule) => modules.includes(crewModule)).map((crewModule) => pack.facts.crewModules[crewModule]);
}

/** Rules sentence for each AI-writable field, keyed the way the guard reads them. */
export interface RulesSentences {
  summary: string;
  leakDetails: Record<string, string>;
  quickWins: QuickWin[];
  crewSentence: string | null;
}

function buildReport(
  responses: DiagnosticResponses,
  locale: WebsiteLocale,
  rec: Recommendation,
): DiagnosticReport {
  const pack = getDiagnosticPack(locale);
  const priority = typeof responses.priority === "string" ? quoteText(responses.priority) : "";
  const core = CORE_PACKAGE_FACTS[rec.corePackage];
  const crewName = rec.crew ? rec.crew.products.map((id) => CREW_PRODUCT_FACTS[id].name).join(" + ") : null;
  const tierFit = [core.name, crewName].filter(Boolean).join(" + ");

  // Hypotheses and the Profit Recovery loop.
  const topLeaks: LeakHypothesis[] = rec.hypotheses.map(({ id, source }) => {
    const copy = pack.rules.leaks[id as HypothesisId];
    return {
      id,
      title: copy.title,
      detail: source === "default" ? `${pack.rules.defaultLeadIn} ${copy.check}` : copy.check,
      impactBand: "medium",
      impactCopy: pack.rules.hypothesisNote,
    };
  });
  const recoveryItems: RecoveryItem[] = rec.hypotheses.map(({ id }) => {
    const copy = pack.rules.leaks[id as HypothesisId];
    return { leakId: id, title: copy.title, watch: copy.watch, data: copy.data, owner: copy.owner, measure: copy.measure };
  });
  const measureAnswer = values(responses.measure_fix)[0] as keyof DiagnosticPack["rules"]["measureIntro"] | undefined;
  const recoveryIntro = (measureAnswer && pack.rules.measureIntro[measureAnswer]) || pack.rules.measureIntro.dont_know;

  // Running the day (Crew).
  let crew: CrewSection | null = null;
  if (rec.crew && crewName) {
    const flagged = rec.crewSignals.map((signal) => optionLabel(pack, values(responses.paper_processes).includes(signal) ? "paper_processes" : "team_costs", signal));
    const notes: string[] = [];
    if (rec.crew.products.includes("crew_starter")) {
      notes.push(fill(pack.rules.starterNote, { locations: CREW_STARTER_MAX_LOCATIONS, people: CREW_STARTER_TEAM_CAP }));
    }
    if (rec.payrollNeeded) notes.push(pack.facts.notes.payroll);
    if (rec.crewSignals.includes("tips")) notes.push(pack.facts.notes.tips);
    if (
      (rec.crewSignals.includes("checklists") || rec.crewSignals.includes("logbook")) &&
      rec.crew.products.some((id) => id === "crew_operating" || id === "crew_complete")
    ) {
      notes.push(pack.facts.notes.tasks_logbook);
    }
    if (rec.hasHrSystem) notes.push(pack.rules.crewOptional);
    // Staff turnover adds no module, so it is flagged but never "covered".
    const covered = rec.crewSignals
      .filter((signal) => signal !== "turnover")
      .map((signal) => optionLabel(pack, values(responses.paper_processes).includes(signal) ? "paper_processes" : "team_costs", signal));
    const sentence = [
      fill(pack.rules.crewSentence, { package: crewName, items: listFormat(locale, covered) }),
      rec.crewSignals.includes("turnover") ? pack.rules.crewTurnover : "",
    ].filter(Boolean).join(" ");
    crew = {
      flagged,
      packageName: crewName,
      covers: crewModulesCovered(pack, rec.crew.entitlements),
      sentence,
      notes,
    };
  }

  // Starting package.
  const coreCovers = core.includedModuleIds
    .filter((id) => id !== "pulse")
    .map((id) => pack.facts.coreModules[id as CoreModuleId] ?? id);
  const addOns: StartingPackage["addOns"] = [];
  if (rec.foresight === "optional") {
    addOns.push(
      rec.foresightPrice?.kind === "list"
        ? { name: FORESIGHT_ACTION_NAME, detail: pack.rules.foresightOptional, price: fill(pack.rules.perMonth, { price: money(locale, rec.foresightPrice.monthly) }) }
        : { name: FORESIGHT_ACTION_NAME, detail: pack.rules.foresightQuoted, price: null },
    );
  }
  if (rec.watchtower === "scoped") addOns.push({ name: WATCHTOWER_NAME, detail: pack.rules.watchtowerScoped, price: null });

  const packageNotes: string[] = [];
  if (rec.foresight === "included") packageNotes.push(`${FORESIGHT_ACTION_NAME}: ${pack.rules.foresightIncluded}`);
  if (rec.watchtower === "unavailable") packageNotes.push(pack.facts.notes.watchtower);
  if (rec.crew) packageNotes.push(pack.rules.staffAllowance);
  if (!rec.crew && rec.hasHrSystem) packageNotes.push(`${pack.rules.crewOptional} ${pack.rules.crewNone}`);

  const locationsLabel = fill(pack.report.priceLocations, { count: number(locale, rec.locations) });
  const price: ReportPrice =
    rec.price.kind === "list"
      ? {
          kind: "list",
          locationsLabel,
          lines: [
            { label: core.name, amount: fill(pack.rules.perMonth, { price: money(locale, rec.price.core) }) },
            ...(rec.price.crew !== null && crewName
              ? [{ label: crewName, amount: fill(pack.rules.perMonth, { price: money(locale, rec.price.crew) }) }]
              : []),
          ],
          total: fill(pack.rules.perMonth, { price: money(locale, rec.price.total) }),
          basis: fill(pack.rules.priceBasis, { version: PRICE_BOOK_VERSION }),
        }
      : { kind: "quoted", locationsLabel, label: pack.report.quoted, basis: pack.rules.quotedBasis };

  const startingPackage: StartingPackage = {
    core: { name: core.name, covers: coreCovers },
    foresight: rec.foresight,
    included: INCLUDED_WITH_EVERY_CORE.map((id) => ({ name: INCLUDED_CAPABILITY_NAMES[id], description: pack.facts.included[id] })),
    crew: rec.crew && crewName ? { name: crewName, covers: crewModulesCovered(pack, rec.crew.entitlements) } : null,
    addOns,
    concepts: rec.concepts.map((id) => CONCEPT_MODULE_NAMES[id]),
    notes: packageNotes,
    price,
    calculatorUrl: buildPricingSimUrl(rec, responses),
  };

  // 30 / 60 / 90 (day 30 connects, reconciles and pilots; nothing estate-wide in one sprint).
  const plan = pack.rules.plan;
  const quickWins: QuickWin[] = [
    {
      horizon: "30",
      title: plan.d30Title,
      detail: [
        fill(plan.d30Detail, { pos: posLabel(pack, responses), leak: topLeaks[0]?.title ?? "" }),
        priority ? fill(plan.d30Priority, { priority }) : "",
      ].filter(Boolean).join(" "),
    },
    {
      horizon: "60",
      title: plan.d60Title,
      detail: [plan.d60Detail, crewName ? fill(plan.d60Crew, { crew: crewName }) : ""].filter(Boolean).join(" "),
    },
    {
      horizon: "90",
      title: plan.d90Title,
      detail: [
        plan.d90Detail,
        rec.foresight ? plan.d90Foresight : "",
        rec.watchtower === "scoped" ? plan.d90Watchtower : "",
      ].filter(Boolean).join(" "),
    },
  ];

  const summary = [
    fill(pack.rules.summaryLeaks, { leaks: listFormat(locale, topLeaks.map((leak) => leak.title)) }),
    priority ? fill(pack.rules.summaryPriority, { priority }) : "",
    fill(pack.rules.summaryPackage, { package: tierFit }),
  ].filter(Boolean).join(" ");

  const recommendedStack: StackRecommendation[] = [
    { layer: "core", label: core.name, detail: coreCovers.join(", "), why: pack.facts.included.profit_recovery },
    ...(crew ? [{ layer: "crew" as const, label: crew.packageName, detail: crew.covers.join(", "), why: crew.sentence }] : []),
    ...addOns.map((addOn) => ({
      layer: addOn.name === WATCHTOWER_NAME ? ("watchtower" as const) : ("foresight" as const),
      label: addOn.name,
      detail: addOn.price ?? "",
      why: addOn.detail,
    })),
  ];

  return {
    version: REPORT_VERSION,
    locale,
    profileLine: profileLine(pack, locale, responses, rec.locations),
    summary,
    topLeaks,
    recovery: { intro: recoveryIntro, items: recoveryItems, note: pack.rules.directional },
    crew,
    startingPackage,
    quickWins,
    tierFit,
    recommendedStack,
    expectedImpact: recoveryItems.map((item) => ({ metric: item.title, range: item.measure })),
  };
}

/** The deterministic report and the recommendation behind it. */
export function runDiagnosticWithRules(
  responses: DiagnosticResponses,
  locale: WebsiteLocale | string = "en",
): DiagnosticResult {
  const resolved = normalizeWebsiteLocale(locale);
  // Answers to questions that are no longer asked never shape the report.
  const answers = pruneHiddenAnswers(responses);
  const recommendation = recommend(answers);
  return { report: buildReport(answers, resolved, recommendation), recommendation };
}

/** The deterministic, fully localized report. */
export function runDiagnostic(responses: DiagnosticResponses, locale: WebsiteLocale | string = "en"): DiagnosticReport {
  return runDiagnosticWithRules(responses, locale).report;
}

/** The rules sentence for each field the AI may write. */
export function rulesSentences(report: DiagnosticReport): RulesSentences {
  return {
    summary: report.summary,
    leakDetails: Object.fromEntries(report.topLeaks.map((leak) => [leak.id, leak.detail])),
    quickWins: report.quickWins,
    crewSentence: report.crew?.sentence ?? null,
  };
}
