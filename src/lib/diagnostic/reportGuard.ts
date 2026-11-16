import type { WebsiteLocale } from '../i18n';
import type {
  DiagnosticReport,
  QuickWin,
  StackRecommendation,
} from "./engine";

const PRODUCT_MENTIONS: Array<{ layer: StackRecommendation["layer"]; pattern: RegExp }> = [
  { layer: "crew", pattern: /\bcrew\b/i },
  { layer: "watchtower", pattern: /\bwatchtower\b/i },
  { layer: "foresight", pattern: /\bforesight\b/i },
];

function referencesUnavailableProduct(
  win: QuickWin,
  allowedLayers: Set<StackRecommendation["layer"]>,
): boolean {
  const copy = `${win.title} ${win.detail}`;
  return PRODUCT_MENTIONS.some(
    ({ layer, pattern }) => !allowedLayers.has(layer) && pattern.test(copy),
  );
}

function groundedStack(
  generated: DiagnosticReport["recommendedStack"],
  reference: DiagnosticReport["recommendedStack"],
  locale: WebsiteLocale,
  localizedStackBasis?: string,
): DiagnosticReport["recommendedStack"] {
  // Model prose must never change the package identity or add entitlements
  // inside a correctly named recommendation. Localized narrative remains in
  // the findings and actions; this list is a grounded product selection.
  void generated;
  const stackBasis = localizedStackBasis ?? 'Confirm scope and prerequisites during your walkthrough.';
  return reference.slice(0, 6).map(canonical => ({
    ...canonical,
    label: canonical.label === 'Sundae Core' ? canonical.detail : canonical.label,
    detail: canonical.label === 'Sundae Core' ? canonical.detail : canonical.label,
    why: locale === 'en' ? canonical.why : stackBasis,
  }));
}

function groundedLeaks(
  generated: DiagnosticReport["topLeaks"],
  reference: DiagnosticReport["topLeaks"],
): DiagnosticReport["topLeaks"] {
  // The model writes the tailored explanation; the deterministic ranked
  // envelope owns how many findings are justified, their severity, and every
  // quantified impact statement.
  return reference.slice(0, 3).map((canonical, index) => {
    const narrative = generated[index];
    if (!narrative) return canonical;
    return {
      ...narrative,
      impactBand: canonical.impactBand,
      impactCopy: canonical.impactCopy,
    };
  });
}

/**
 * Keep the model's useful consultant-style narrative while enforcing every
 * commercial or entitlement-sensitive field from deterministic product data.
 */
export function groundGeneratedDiagnostic(
  generated: DiagnosticReport,
  reference: DiagnosticReport,
  locale: WebsiteLocale = 'en',
  localizedStackBasis?: string,
): DiagnosticReport {
  const recommendedStack = groundedStack(generated.recommendedStack, reference.recommendedStack, locale, localizedStackBasis);
  const allowedLayers = new Set(recommendedStack.map((item) => item.layer));
  const fallbackWins = new Map(reference.quickWins.map((win) => [win.horizon, win]));
  const generatedWins = new Map(generated.quickWins.map((win) => [win.horizon, win]));
  const quickWins = (["30", "60", "90"] as const).map((horizon) => {
    const candidate = generatedWins.get(horizon);
    if (candidate && !referencesUnavailableProduct(candidate, allowedLayers)) return candidate;
    return fallbackWins.get(horizon)!;
  });

  return {
    ...generated,
    profileLine: reference.profileLine,
    topLeaks: groundedLeaks(generated.topLeaks, reference.topLeaks),
    recommendedStack,
    tierFit: reference.tierFit,
    // These fields contain prices or quantified claims. The canonical engine
    // owns them so model arithmetic and invented benchmarks never reach users.
    expectedImpact: reference.expectedImpact,
    economics: reference.economics,
    quickWins,
  };
}
