/**
 * Save and resume for the Operations Diagnostic.
 *
 * Progress is kept in localStorage under the same key as before, so a
 * refresh or "finish later" never wipes the answers. Each draft carries the
 * question-bank version; a draft saved against an older bank (different ids
 * and options) is discarded cleanly instead of being half-read. Cleared on a
 * successful submission.
 */

import { QUESTION_BANK_VERSION, type DiagnosticResponses } from "./questions";

const KEY = "sundae-diagnostic-progress";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface DiagnosticProgress {
  version: number;
  responses: DiagnosticResponses;
  /** The question the visitor was on; stable across reordering. */
  questionId: string;
  savedAt: number;
}

export function saveProgress(progress: Omit<DiagnosticProgress, "savedAt" | "version">): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ ...progress, version: QUESTION_BANK_VERSION, savedAt: Date.now() }),
    );
  } catch {
    /* quota / private mode - non-fatal */
  }
}

export function parseProgress(raw: string | null, now = Date.now()): DiagnosticProgress | null {
  if (!raw) return null;
  try {
    const progress = JSON.parse(raw) as Partial<DiagnosticProgress> | null;
    if (
      !progress ||
      progress.version !== QUESTION_BANK_VERSION ||
      typeof progress.savedAt !== "number" ||
      now - progress.savedAt > MAX_AGE_MS ||
      typeof progress.questionId !== "string" ||
      !progress.responses ||
      typeof progress.responses !== "object" ||
      Array.isArray(progress.responses)
    ) {
      return null;
    }
    return progress as DiagnosticProgress;
  } catch {
    return null;
  }
}

export function loadProgress(): DiagnosticProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    const progress = parseProgress(raw);
    // Old-bank, expired or malformed drafts are removed, not resumed.
    if (raw && !progress) clearProgress();
    return progress;
  } catch {
    return null;
  }
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* non-fatal */
  }
}

/** Count of answered questions - used to decide when resume is worth offering. */
export function answeredCount(responses: DiagnosticResponses | undefined): number {
  if (!responses) return 0;
  return Object.values(responses).filter((value) =>
    Array.isArray(value) ? value.length > 0 : typeof value === "string" ? value.trim().length > 0 : false,
  ).length;
}
