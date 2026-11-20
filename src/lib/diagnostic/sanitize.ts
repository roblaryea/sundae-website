/**
 * Keeps only the diagnostic answers the engine reads: known question ids and
 * their "Other" detail, as bounded strings. Contact details (name, email,
 * company) are dropped here - they travel separately and never reach the
 * model, analytics or `metadata.responses`.
 */

import { QUESTIONS, diagnosticOtherKey, type DiagnosticResponses } from "./questions";

const CONTACT_KEYS = new Set(["name", "contact", "email", "company"]);
const MAX_ITEMS = 120;
const MAX_ITEM_LENGTH = 80;

const ALLOWED_KEYS = new Map<string, number>();
for (const question of QUESTIONS) {
  if (CONTACT_KEYS.has(question.id)) continue;
  ALLOWED_KEYS.set(question.id, question.maxLength ?? MAX_ITEM_LENGTH);
  ALLOWED_KEYS.set(diagnosticOtherKey(question.id), 120);
}

export function sanitizeDiagnosticResponses(value: unknown): DiagnosticResponses | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const clean: DiagnosticResponses = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    const max = ALLOWED_KEYS.get(key);
    if (max === undefined) continue;
    if (typeof raw === "string") {
      const text = raw.trim().slice(0, max);
      if (text) clean[key] = text;
    } else if (Array.isArray(raw)) {
      const items = [...new Set(raw.filter((item): item is string => typeof item === "string").map((item) => item.trim().slice(0, MAX_ITEM_LENGTH)))]
        .filter(Boolean)
        .slice(0, MAX_ITEMS);
      if (items.length) clean[key] = items;
    }
  }
  return clean;
}

/** Answers safe to store in lead metadata and send to the model (no contact details). */
export function withoutContactDetails(responses: DiagnosticResponses): DiagnosticResponses {
  return sanitizeDiagnosticResponses(responses) ?? {};
}
