import type { DiagnosticResponses } from "./engine";
import type { Question } from "./questions";

const EXCLUSIVE_VALUES = new Set(["none", "unsure"]);

export function diagnosticOtherKey(questionId: string): string {
  return `${questionId}_other`;
}

export function diagnosticOtherDetails(
  responses: DiagnosticResponses,
  questionIds: string[],
): Array<{ questionId: string; detail: string }> {
  return questionIds.flatMap((questionId) => {
    const detail = responses[diagnosticOtherKey(questionId)];
    return typeof detail === "string" && detail.trim()
      ? [{ questionId, detail: detail.trim() }]
      : [];
  });
}

export function toggleDiagnosticMultiValue(current: string[], value: string): string[] {
  if (current.includes(value)) return current.filter((item) => item !== value);
  if (EXCLUSIVE_VALUES.has(value)) return [value];
  return [...current.filter((item) => !EXCLUSIVE_VALUES.has(item)), value];
}

export function hasDiagnosticAnswer(question: Question, responses: DiagnosticResponses): boolean {
  const value = responses[question.id];
  if (question.kind === "text") return typeof value === "string" && value.trim().length > 0;
  if (question.kind === "multi") return Array.isArray(value) && value.length > 0;
  return typeof value === "string" && value.length > 0;
}

export function canAdvanceDiagnosticQuestion(
  question: Question,
  responses: DiagnosticResponses,
): boolean {
  const value = responses[question.id];
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  if (selected.includes("other")) {
    const detail = responses[diagnosticOtherKey(question.id)];
    if (typeof detail !== "string" || detail.trim().length === 0) return false;
  }

  return question.optional || hasDiagnosticAnswer(question, responses);
}

export function filterDiagnosticOptions(
  options: NonNullable<Question["options"]>,
  localizedLabels: Record<string, string> | undefined,
  query: string,
): NonNullable<Question["options"]> {
  const normalize = (value: string) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
  const needle = normalize(query.trim());
  if (!needle) return options;
  return options.filter((option) => {
    const haystack = [
      localizedLabels?.[option.value] ?? option.label,
      option.label,
      option.value.replaceAll("_", " "),
      ...(option.searchTerms ?? []),
    ].join(" ");
    return normalize(haystack).includes(needle);
  });
}
