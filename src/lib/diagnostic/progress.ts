/**
 * Save & resume for the Operations Diagnostic.
 *
 * The flow is 20 questions + a contact step — long enough that a refresh, an
 * accidental back-swipe, or a "let me finish this later" used to wipe every
 * answer. We persist progress to localStorage so the visitor can pick up
 * exactly where they left off. Cleared on successful completion.
 */

import type { DiagnosticResponses } from "./engine";

const KEY = "sundae-diagnostic-progress";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface CaptureDraft {
  name: string;
  email: string;
  company: string;
  phone: string;
  role: string;
  country: string;
}

export interface DiagnosticProgress {
  responses: DiagnosticResponses;
  step: number;
  showCapture: boolean;
  capture: CaptureDraft;
  savedAt: number;
}

export function saveProgress(p: Omit<DiagnosticProgress, "savedAt">): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...p, savedAt: Date.now() }));
  } catch {
    /* quota / private mode — non-fatal */
  }
}

export function loadProgress(): DiagnosticProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as DiagnosticProgress;
    if (!p || typeof p.savedAt !== "number" || Date.now() - p.savedAt > MAX_AGE_MS) {
      clearProgress();
      return null;
    }
    return p;
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

/** Cheap existence check for the intro screen (Start vs Resume). */
export function hasProgress(): boolean {
  return loadProgress() !== null;
}

/** Count of answered questions — used to decide when resume is worth offering. */
export function answeredCount(responses: DiagnosticResponses | undefined): number {
  if (!responses) return 0;
  return Object.values(responses).filter((v) =>
    Array.isArray(v) ? v.length > 0 : typeof v === "string" ? v.trim().length > 0 : false,
  ).length;
}
