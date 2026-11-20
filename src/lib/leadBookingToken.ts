/**
 * Which `/api/cta/submit` callers may receive the backend's short-lived
 * booking token (guided booking spec 6.4, diagnostic spec 6.3). The backend
 * decides whether to issue one (a new lead, a work email, no earlier lead for
 * that address, `metadata.convo` present); the website only decides who sees
 * it. Every other caller's response is unchanged.
 */
export const BOOKING_TOKEN_SOURCES = ['guided-booking', 'guided-diagnostic'] as const;

export function bookingTokenForSource(source: unknown, token: string | undefined): string | undefined {
  if (typeof source !== 'string' || !(BOOKING_TOKEN_SOURCES as readonly string[]).includes(source)) return undefined;
  return typeof token === 'string' && token.length > 0 ? token : undefined;
}
