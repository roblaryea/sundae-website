/**
 * Localized wording for the question bank, read from the locale packs.
 * Derived from QUESTIONS so a new question id cannot be missed silently;
 * `scripts/qa-diagnostic-i18n.mjs` fails when a question or option has no copy.
 */
import type { WebsiteLocale } from "../i18n";
import { getDiagnosticPack } from "./copy";
import { QUESTIONS } from "./questions";

export type DiagnosticQuestionCopy = {
  prompt: string;
  helper?: string;
  placeholder?: string;
  options?: Record<string, string>;
};

export function getDiagnosticQuestionCopy(locale: WebsiteLocale, questionId: string): DiagnosticQuestionCopy | undefined {
  const questions = getDiagnosticPack(locale).questions as Record<string, DiagnosticQuestionCopy>;
  return questions[questionId];
}

/** Every question's localized copy, in bank order. */
export function getDiagnosticQuestionCatalog(locale: WebsiteLocale): Array<{ id: string; copy: DiagnosticQuestionCopy }> {
  return QUESTIONS.map((question) => ({ id: question.id, copy: getDiagnosticQuestionCopy(locale, question.id)! }));
}
