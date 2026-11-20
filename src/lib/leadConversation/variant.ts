/**
 * Classic form vs guided booking split (spec 6.6, decision D4).
 *
 *   NEXT_PUBLIC_GUIDED_BOOKING           off (default when unset) | split | on
 *   NEXT_PUBLIC_GUIDED_BOOKING_SURFACES  comma list of demo,contact,get-started (default: all)
 *
 * In `split`, a visitor is assigned once on the client and kept in that
 * variant by the first-party functional cookie `sundae_lead_variant`
 * (guided | classic, 90 days, SameSite=Lax, path /). It carries no personal
 * data and does not depend on analytics consent. `?guided=1` / `?guided=0`
 * force a variant for QA without touching the cookie, including when the
 * variable is unset, so a preview can be checked before launch.
 *
 * Pure decision logic plus tiny browser helpers; no React.
 */

export type LeadVariant = 'guided' | 'classic';
export type GuidedBookingMode = 'off' | 'split' | 'on';
export type LeadSurface = 'demo' | 'contact' | 'get-started';

export const LEAD_SURFACES: readonly LeadSurface[] = ['demo', 'contact', 'get-started'];
export const LEAD_VARIANT_COOKIE = 'sundae_lead_variant';
export const LEAD_VARIANT_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

export function parseGuidedBookingMode(raw: string | undefined | null): GuidedBookingMode {
  const value = (raw ?? '').trim().toLowerCase();
  return value === 'split' || value === 'on' ? value : 'off';
}

export function parseGuidedBookingSurfaces(raw: string | undefined | null): LeadSurface[] {
  if (raw === undefined || raw === null || raw.trim() === '') return [...LEAD_SURFACES];
  const requested = raw.split(',').map((item) => item.trim().toLowerCase());
  return LEAD_SURFACES.filter((surface) => requested.includes(surface));
}

/** Build-time configuration. Literal references so Next can inline them. */
export function guidedBookingConfig() {
  return {
    mode: parseGuidedBookingMode(process.env.NEXT_PUBLIC_GUIDED_BOOKING),
    surfaces: parseGuidedBookingSurfaces(process.env.NEXT_PUBLIC_GUIDED_BOOKING_SURFACES),
  };
}

export function parseVariantOverride(search: string): LeadVariant | null {
  const value = new URLSearchParams(search).get('guided');
  if (value === '1') return 'guided';
  if (value === '0') return 'classic';
  return null;
}

export function parseVariantCookie(cookieHeader: string): LeadVariant | null {
  for (const part of cookieHeader.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === LEAD_VARIANT_COOKIE) {
      const value = rest.join('=');
      return value === 'guided' || value === 'classic' ? value : null;
    }
  }
  return null;
}

export interface VariantInput {
  mode: GuidedBookingMode;
  surfaces: readonly LeadSurface[];
  surface: LeadSurface;
  override: LeadVariant | null;
  cookie: LeadVariant | null;
  /** 0 <= random < 1, used only for a first assignment in `split`. */
  random: number;
}

export interface VariantDecision {
  variant: LeadVariant;
  /** A new assignment to persist in the cookie. */
  assign: LeadVariant | null;
}

export function decideVariant({ mode, surfaces, surface, override, cookie, random }: VariantInput): VariantDecision {
  if (override) return { variant: override, assign: null };
  if (mode === 'off' || !surfaces.includes(surface)) return { variant: 'classic', assign: null };
  if (mode === 'on') return { variant: 'guided', assign: null };
  if (cookie) return { variant: cookie, assign: null };
  const assigned: LeadVariant = random < 0.5 ? 'guided' : 'classic';
  return { variant: assigned, assign: assigned };
}

export function variantCookieString(variant: LeadVariant, secure: boolean): string {
  return `${LEAD_VARIANT_COOKIE}=${variant}; path=/; max-age=${LEAD_VARIANT_COOKIE_MAX_AGE}; samesite=lax${secure ? '; secure' : ''}`;
}

/** Resolve in the browser and persist a first `split` assignment. */
export function resolveLeadVariant(surface: LeadSurface): LeadVariant {
  const { mode, surfaces } = guidedBookingConfig();
  const decision = decideVariant({
    mode,
    surfaces,
    surface,
    override: parseVariantOverride(window.location.search),
    cookie: parseVariantCookie(document.cookie),
    random: Math.random(),
  });
  if (decision.assign) document.cookie = variantCookieString(decision.assign, window.location.protocol === 'https:');
  return decision.variant;
}

/** Whether the server can render the classic form without waiting for the client. */
export function classicIsCertainWithoutOverride(surface: LeadSurface): boolean {
  const { mode, surfaces } = guidedBookingConfig();
  return mode === 'off' || !surfaces.includes(surface);
}
