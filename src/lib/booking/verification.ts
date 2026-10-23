/**
 * Pure helpers for the personal booking e-mail verification step: how the page
 * reads the same-origin proxy's answer, the resend cooldown, wait formatting and
 * the "email the host" fallback. No React and no network, so they are unit
 * tested under `npm run test:booking`.
 */

/** Fallback when the backend predates `cooldownSeconds`. Matches the backend's 45s. */
export const DEFAULT_RESEND_COOLDOWN_SECONDS = 45;
const MAX_WAIT_SECONDS = 24 * 3600;

export type VerificationOutcome =
  | { kind: 'sent'; verificationId: string; cooldownSeconds: number }
  /** Too many code requests for this address/IP/page: wait out the real window. */
  | { kind: 'rate_limited'; retryAfterSeconds: number | null }
  /** A resend arrived inside the 45s cooldown (clock skew or double click). */
  | { kind: 'cooldown'; retryAfterSeconds: number }
  /** Graph or the scheduler could not send: offer the email-the-host fallback. */
  | { kind: 'email_unavailable' }
  /** The challenge no longer exists or was already used: start a fresh request. */
  | { kind: 'expired' }
  | { kind: 'failed' };

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

/** Seconds to wait from the JSON body, else the Retry-After header; null if neither is usable. */
export function readRetryAfterSeconds(body: unknown, header?: string | null): number | null {
  const fromBody = asRecord(body).retryAfterSeconds;
  const candidates = [typeof fromBody === 'number' ? fromBody : Number.NaN, Number(header ?? Number.NaN)];
  for (const value of candidates) {
    if (Number.isFinite(value) && value > 0) return Math.min(Math.ceil(value), MAX_WAIT_SECONDS);
  }
  return null;
}

/**
 * Interpret the proxy's response to a code request or a resend. Unknown shapes
 * degrade to `failed` (never to a success), and a backend without the newer
 * fields still yields the right branch.
 */
export function classifyVerificationResponse(
  status: number,
  body: unknown,
  retryAfterHeader?: string | null,
): VerificationOutcome {
  const data = asRecord(body);
  const error = typeof data.error === 'string' ? data.error : '';
  if (status === 202 && typeof data.verificationId === 'string' && data.verificationId) {
    const cooldown = typeof data.cooldownSeconds === 'number' && data.cooldownSeconds > 0
      ? Math.ceil(data.cooldownSeconds) : DEFAULT_RESEND_COOLDOWN_SECONDS;
    return { kind: 'sent', verificationId: data.verificationId, cooldownSeconds: cooldown };
  }
  if (status === 429) {
    const wait = readRetryAfterSeconds(body, retryAfterHeader);
    return error === 'resend_too_soon' && wait !== null
      ? { kind: 'cooldown', retryAfterSeconds: wait }
      : { kind: 'rate_limited', retryAfterSeconds: wait };
  }
  if (status === 503) return { kind: 'email_unavailable' };
  if (status === 404 && error === 'verification_not_found') return { kind: 'expired' };
  return { kind: 'failed' };
}

/** Seconds left of a cooldown that ends at `endsAt` (epoch ms). */
export function cooldownSecondsLeft(endsAt: number | null, now: number): number {
  return endsAt === null ? 0 : Math.max(0, Math.ceil((endsAt - now) / 1000));
}

/**
 * "45 s" / "5 min" from the locale's own unit patterns (`waitSeconds`,
 * `waitMinutes`, each containing `{n}`), so no language depends on browser
 * unit data. Digits follow the locale's number system.
 */
export function formatWait(
  seconds: number,
  patterns: { waitSeconds: string; waitMinutes: string },
  intlLocale: string,
): string {
  const total = Math.max(1, Math.ceil(seconds));
  let formatter: Intl.NumberFormat;
  try { formatter = new Intl.NumberFormat(intlLocale); } catch { formatter = new Intl.NumberFormat('en'); }
  return total <= 90
    ? patterns.waitSeconds.replace('{n}', formatter.format(total))
    : patterns.waitMinutes.replace('{n}', formatter.format(Math.ceil(total / 60)));
}

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? values[key] : match));
}

/** Split on the first `{token}` so a caller can put an element (e.g. a bdi) in its place. */
export function splitAtToken(template: string, token: string): [string, string] {
  const marker = `{${token}}`;
  const index = template.indexOf(marker);
  return index < 0 ? [template, ''] : [template.slice(0, index), template.slice(index + marker.length)];
}

const SAFE_MAILBOX = /^[A-Za-z0-9._+-]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;

/**
 * The host's address comes from the backend. Only a plain mailbox is ever used
 * in a `mailto:` (no `?`, `&`, `%`, commas or display-name tricks that could add
 * recipients or headers).
 */
export function safeSenderEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim();
  return email.length <= 254 && SAFE_MAILBOX.test(email) ? email : null;
}

export function buildContactMailto(input: {
  to: string;
  subject: string;
  body: string;
}): string {
  return `mailto:${input.to}?subject=${encodeURIComponent(input.subject)}&body=${encodeURIComponent(input.body)}`;
}
