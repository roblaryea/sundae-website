import type { DiagnosticResponses, LeakHypothesis } from "./engine";

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export function buildEvidenceSafeFallbackFindings(
  responses: DiagnosticResponses,
): LeakHypothesis[] {
  const findings: LeakHypothesis[] = [];
  const priority = typeof responses.priority === "string" ? responses.priority.trim() : "";
  if (priority) {
    findings.push({
      id: "priority_baseline",
      title: "Priority lacks a measured baseline",
      detail: `You said: “${priority.slice(0, 160)}${priority.length > 160 ? "…" : ""}” The first gap to close is a shared starting measure, source coverage, and an accountable owner so progress can be proved rather than assumed.`,
      impactBand: "low",
      impactCopy: "No financial impact is claimed until the baseline and source data are validated.",
    });
  }

  const selectedSystems = values(responses.ops_tools).length
    + values(responses.pos).length
    + values(responses.scheduling_tool).length;
  findings.push({
    id: "cross_system_view",
    title: "Cross-system decision gap",
    detail: selectedSystems > 1
      ? `Your answers reference ${selectedSystems} operating-system categories. The diagnostic cannot yet confirm that POS, workforce, and cost data reconcile into one outlet-level view; that is the first integration check.`
      : "Your answers do not yet establish a reconciled outlet-level view across POS, workforce, and cost data. That data-health check should happen before any return claim.",
    impactBand: "low",
    impactCopy: "Validate source coverage and reconciliation first; quantify an opportunity only from the resulting baseline.",
  });

  return findings;
}
