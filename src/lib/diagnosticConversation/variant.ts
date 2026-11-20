/**
 * Classic step-by-step form vs guided diagnostic split (spec 6.5).
 *
 *   NEXT_PUBLIC_GUIDED_DIAGNOSTIC   off (default when unset) | split | on
 *
 * Same mechanism as the guided booking split, with its own variable and its
 * own first-party functional cookie `sundae_diag_variant` (guided | classic,
 * 90 days, SameSite=Lax, path /), so the two experiments stay independent.
 * `?guided=1` / `?guided=0` force a variant for QA without touching the
 * cookie, including when the variable is unset.
 *
 * A sibling of `src/lib/leadConversation/variant.ts`: it reuses that file's
 * pure parsers and leaves the booking's variable, cookie and behaviour as
 * they are.
 */

import {
  parseGuidedBookingMode,
  parseVariantOverride,
  type GuidedBookingMode,
  type LeadVariant,
} from '../leadConversation/variant.ts';

export type DiagnosticVariant = LeadVariant;
export type GuidedDiagnosticMode = GuidedBookingMode;

export const DIAGNOSTIC_VARIANT_COOKIE = 'sundae_diag_variant';
export const DIAGNOSTIC_VARIANT_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;
/** The `surface` property on diagnostic analytics events. */
export const DIAGNOSTIC_SURFACE = 'diagnostic';

export const parseGuidedDiagnosticMode = parseGuidedBookingMode;
export { parseVariantOverride };

/** Build-time configuration. A literal reference so Next can inline it. */
export function guidedDiagnosticMode(): GuidedDiagnosticMode {
  return parseGuidedDiagnosticMode(process.env.NEXT_PUBLIC_GUIDED_DIAGNOSTIC);
}

export function parseDiagnosticVariantCookie(cookieHeader: string): DiagnosticVariant | null {
  for (const part of cookieHeader.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === DIAGNOSTIC_VARIANT_COOKIE) {
      const value = rest.join('=');
      return value === 'guided' || value === 'classic' ? value : null;
    }
  }
  return null;
}

export interface DiagnosticVariantInput {
  mode: GuidedDiagnosticMode;
  override: DiagnosticVariant | null;
  cookie: DiagnosticVariant | null;
  /** 0 <= random < 1, used only for a first assignment in `split`. */
  random: number;
}

export interface DiagnosticVariantDecision {
  variant: DiagnosticVariant;
  /** A new assignment to persist in the cookie. */
  assign: DiagnosticVariant | null;
}

export function decideDiagnosticVariant({ mode, override, cookie, random }: DiagnosticVariantInput): DiagnosticVariantDecision {
  if (override) return { variant: override, assign: null };
  if (mode === 'off') return { variant: 'classic', assign: null };
  if (mode === 'on') return { variant: 'guided', assign: null };
  if (cookie) return { variant: cookie, assign: null };
  const assigned: DiagnosticVariant = random < 0.5 ? 'guided' : 'classic';
  return { variant: assigned, assign: assigned };
}

export function diagnosticVariantCookieString(variant: DiagnosticVariant, secure: boolean): string {
  return `${DIAGNOSTIC_VARIANT_COOKIE}=${variant}; path=/; max-age=${DIAGNOSTIC_VARIANT_COOKIE_MAX_AGE}; samesite=lax${secure ? '; secure' : ''}`;
}

/** Resolve in the browser and persist a first `split` assignment. */
export function resolveDiagnosticVariant(): DiagnosticVariant {
  const decision = decideDiagnosticVariant({
    mode: guidedDiagnosticMode(),
    override: parseVariantOverride(window.location.search),
    cookie: parseDiagnosticVariantCookie(document.cookie),
    random: Math.random(),
  });
  if (decision.assign) document.cookie = diagnosticVariantCookieString(decision.assign, window.location.protocol === 'https:');
  return decision.variant;
}

/** Whether the server can render the classic form without waiting for the client. */
export function diagnosticClassicIsCertainWithoutOverride(): boolean {
  return guidedDiagnosticMode() === 'off';
}
