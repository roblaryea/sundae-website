import assert from "node:assert/strict";
import test from "node:test";

import { buildEvidenceSafeFallbackFindings } from "../src/lib/diagnostic/fallbackFindings.ts";
import { groundGeneratedDiagnostic } from "../src/lib/diagnostic/reportGuard.ts";

test("model output cannot add ineligible products or override canonical economics", () => {
  const reference = {
    profileLine: "Casual-dining operator · 10 outlets · UAE",
    summary: "Reference summary",
    topLeaks: [
      { id: "priority_baseline", title: "Priority baseline", detail: "Measure it", impactBand: "low", impactCopy: "Validate first" },
      { id: "cross_system_view", title: "Cross-system view", detail: "Reconcile it", impactBand: "low", impactCopy: "No claim yet" },
    ],
    recommendedStack: [
      { layer: "core", label: "Sundae Core", why: "Canonical core", detail: "Core Foundation" },
      { layer: "core", label: "Pulse (real-time ops)", why: "Canonical pulse", detail: "Live pacing" },
      { layer: "crew", label: "Crew Schedule", why: "Canonical crew", detail: "Scheduling" },
    ],
    expectedImpact: [
      { metric: "Baseline readiness", range: "Starting measure agreed in 30 days" },
      { metric: "Integration confidence", range: "Totals reconciled first" },
    ],
    quickWins: [
      { horizon: "30", title: "Reference 30", detail: "Reconcile first" },
      { horizon: "60", title: "Reference 60", detail: "Pilot second" },
      { horizon: "90", title: "Reference 90", detail: "Review third" },
    ],
    tierFit: "Core Foundation + Crew Schedule",
    economics: {
      monthlyCost: { range: "$1K-$2K / mo", basis: "Canonical price book" },
      currentSpend: { range: "$1K-$2K / mo", basis: "Planning assumption", net: "Comparable" },
      ebitdaUplift: { pctRange: "+1-3 points", amountRange: "Add AUV", basis: "Needs revenue" },
      softUplifts: [
        { label: "Faster decisions", detail: "Validated data" },
        { label: "Calmer planning", detail: "Shared baseline" },
      ],
    },
  };
  const generated = {
    ...reference,
    profileLine: "Invented profile",
    tierFit: "Maximal bundle",
    topLeaks: reference.topLeaks.map((item) => ({
      ...item,
      impactBand: "high",
      impactCopy: "99% tomorrow",
    })),
    recommendedStack: [
      { layer: "core", label: "Wrong Core", why: "Useful tailored reason", detail: "Tailored core detail" },
      { layer: "crew", label: "Crew Complete", why: "Useful crew reason", detail: "Tailored crew detail" },
      { layer: "watchtower", label: "Watchtower", why: "No competitor signal", detail: "Should be removed" },
      { layer: "foresight", label: "Foresight & Action", why: "Only one scenario", detail: "Should be removed" },
    ],
    expectedImpact: [{ metric: "Invented", range: "99% tomorrow" }],
    quickWins: [
      { horizon: "30", title: "Connect the pilot", detail: "Reconcile source totals first." },
      { horizon: "60", title: "Expand Crew pilot", detail: "Expand only after validation." },
      { horizon: "90", title: "Turn on Watchtower", detail: "An ineligible product." },
    ],
    economics: {
      monthlyCost: { range: "$1", basis: "Invented" },
      currentSpend: { range: "$2", basis: "Invented", net: "Invented" },
      ebitdaUplift: { pctRange: "+99 points", amountRange: "$99M / mo", basis: "Invented" },
      softUplifts: [],
    },
  };

  const grounded = groundGeneratedDiagnostic(generated, reference);

  assert.equal(grounded.profileLine, reference.profileLine);
  assert.equal(grounded.tierFit, reference.tierFit);
  assert.deepEqual(grounded.expectedImpact, reference.expectedImpact);
  assert.deepEqual(grounded.economics, reference.economics);
  assert.deepEqual(
    grounded.topLeaks.map((item) => ({ band: item.impactBand, impact: item.impactCopy })),
    reference.topLeaks.map((item) => ({ band: item.impactBand, impact: item.impactCopy })),
  );
  assert.deepEqual(grounded.recommendedStack.map((item) => item.layer), ["core", "core", "crew"]);
  assert.equal(grounded.recommendedStack[0].label, reference.recommendedStack[0].detail);
  assert.equal(grounded.recommendedStack[1].label, "Pulse (real-time ops)");
  assert.equal(grounded.recommendedStack[2].label, reference.recommendedStack.find((item) => item.layer === "crew").label);
  assert.equal(grounded.quickWins[2].title, reference.quickWins[2].title);
});

test("sparse but valid answers still produce two evidence-safe findings", () => {
  const findings = buildEvidenceSafeFallbackFindings({
    segment: ["hotel_fb", "casual"],
    outlets: "2_5",
    region: ["uae"],
    scheduling_tool: ["internal"],
    labor_pain: ["none"],
    forecasting: "ai_tool",
    pos: ["micros"],
    priority: "Give managers one reliable daily operating view.",
  });

  assert.equal(findings.length, 2);
  assert.ok(findings.some((item) => item.id === "priority_baseline"));
  assert.ok(findings.some((item) => item.id === "cross_system_view"));
  assert.match(findings[0].detail + findings[1].detail, /reliable daily operating view/i);
  assert.doesNotMatch(findings.map((item) => item.impactCopy).join(" "), /\d+%/);
});
