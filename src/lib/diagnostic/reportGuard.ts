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
): DiagnosticReport["recommendedStack"] {
  const usedGenerated = new Set<number>();

  // Core Foundation and Pulse intentionally share the `core` layer, so layer
  // alone is not a product identity. Match Pulse explicitly and treat the
  // remaining core entry as the package. This prevents a safety guard from
  // accidentally removing an eligible Pulse recommendation.
  const sameProduct = (candidate: StackRecommendation, canonical: StackRecommendation) => {
    if (candidate.layer !== canonical.layer) return false;
    if (canonical.layer !== "core") return true;
    const candidateIsPulse = /\bpulse\b/i.test(`${candidate.label} ${candidate.detail}`);
    const canonicalIsPulse = /\bpulse\b/i.test(`${canonical.label} ${canonical.detail}`);
    return candidateIsPulse === canonicalIsPulse;
  };

  return reference.slice(0, 6).map((canonical) => {
    const generatedIndex = generated.findIndex(
      (candidate, index) => !usedGenerated.has(index) && sameProduct(candidate, canonical),
    );
    if (generatedIndex === -1) return canonical;

    usedGenerated.add(generatedIndex);
    const narrative = generated[generatedIndex];
    return {
      ...narrative,
      // Product/package names come from the price book and eligibility engine,
      // never from the language model.
      label: canonical.label === "Sundae Core" ? canonical.detail : canonical.label,
    };
  });
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
): DiagnosticReport {
  const recommendedStack = groundedStack(generated.recommendedStack, reference.recommendedStack);
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
