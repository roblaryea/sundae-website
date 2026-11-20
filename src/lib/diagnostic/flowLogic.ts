/**
 * Pure flow rules for the diagnostic question bank: which questions are
 * asked, when a step can move on, and how multi-select answers behave.
 * Shared by the step-by-step form (and, in Phase B, the conversation).
 */

import {
  COUNTRY_CODE_SET,
  QUESTIONS,
  diagnosticOtherKey,
  type DiagnosticResponses,
  type Question,
  type QuestionOption,
} from "./questions";
import { parseLocationCount } from "./rules";

export { diagnosticOtherKey };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export function isQuestionVisible(question: Question, responses: DiagnosticResponses): boolean {
  return question.showWhen ? question.showWhen(responses) : true;
}

/** The questions this visitor is asked, in order, given the answers so far. */
export function visibleQuestions(responses: DiagnosticResponses): Question[] {
  return QUESTIONS.filter((question) => isQuestionVisible(question, responses));
}

/** Drops answers to questions that are no longer asked (e.g. payroll countries after unticking payroll). */
export function pruneHiddenAnswers(responses: DiagnosticResponses): DiagnosticResponses {
  const next: DiagnosticResponses = { ...responses };
  for (const question of QUESTIONS) {
    if (isQuestionVisible(question, next)) continue;
    delete next[question.id];
    delete next[diagnosticOtherKey(question.id)];
  }
  return next;
}

/** Same check as the guided booking: not an email address and not only digits or symbols. */
export function isPlausibleName(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  if (/[@＠]/.test(trimmed)) return false;
  return !/^[\p{Nd}\s+().\-]+$/u.test(trimmed);
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function toggleDiagnosticMultiValue(
  current: string[],
  value: string,
  options?: readonly QuestionOption[],
): string[] {
  const exclusive = new Set(
    options ? options.filter((option) => option.exclusive).map((option) => option.value) : ["none", "not_sure"],
  );
  if (current.includes(value)) return current.filter((item) => item !== value);
  if (exclusive.has(value)) return [value];
  return [...current.filter((item) => !exclusive.has(item)), value];
}

export function hasDiagnosticAnswer(question: Question, responses: DiagnosticResponses): boolean {
  const value = responses[question.id];
  switch (question.kind) {
    case "name":
      return typeof value === "string" && isPlausibleName(value);
    case "number":
      return parseLocationCount(value) !== null;
    case "longtext":
      return typeof value === "string" && value.trim().length > 0;
    case "contact":
      return isValidEmail(String(responses.email ?? "")) && String(responses.company ?? "").trim().length > 0;
    case "countries":
      return values(value).some((code) => COUNTRY_CODE_SET.has(code));
    case "single":
      return typeof value === "string" && value.length > 0;
    default:
      return values(value).length > 0;
  }
}

export function canAdvanceDiagnosticQuestion(question: Question, responses: DiagnosticResponses): boolean {
  if (values(responses[question.id]).includes("other")) {
    const detail = responses[diagnosticOtherKey(question.id)];
    if (typeof detail !== "string" || detail.trim().length === 0) return false;
  }
  return Boolean(question.optional) || hasDiagnosticAnswer(question, responses);
}

/** Every asked question is answered (optional ones may be skipped). */
export function isDiagnosticComplete(responses: DiagnosticResponses): boolean {
  return visibleQuestions(responses).every((question) => canAdvanceDiagnosticQuestion(question, responses));
}

export function filterDiagnosticOptions<T extends { value: string; searchTerms?: readonly string[] }>(
  options: readonly T[],
  labelFor: (value: string) => string,
  query: string,
): T[] {
  const normalize = (value: string) =>
    value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLocaleLowerCase();
  const needle = normalize(query.trim());
  if (!needle) return [...options];
  return options.filter((option) => {
    const haystack = [labelFor(option.value), option.value.replaceAll("_", " "), ...(option.searchTerms ?? [])].join(" ");
    return normalize(haystack).includes(needle);
  });
}
