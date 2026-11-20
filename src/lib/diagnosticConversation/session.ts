/**
 * The few guided-diagnostic constants and helpers the /diagnostic page needs
 * without loading the conversation itself, so classic visitors download
 * nothing new.
 */

/** The lead `source` for guided diagnostic leads (classic leads send none). */
export const GUIDED_DIAGNOSTIC_SOURCE = 'guided-diagnostic';

/** sessionStorage key for refresh-resume. Versioned; answers only, never tokens. */
export const DIAGNOSTIC_CONVO_STORAGE_KEY = 'sundae_diag_convo_v1';

export function readGuidedSession(): string | null {
  try {
    return window.sessionStorage.getItem(DIAGNOSTIC_CONVO_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeGuidedSession(value: string | null): void {
  try {
    if (value === null) window.sessionStorage.removeItem(DIAGNOSTIC_CONVO_STORAGE_KEY);
    else window.sessionStorage.setItem(DIAGNOSTIC_CONVO_STORAGE_KEY, value);
  } catch {
    // Storage is optional; the conversation still works without resume.
  }
}
