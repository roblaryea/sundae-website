/**
 * Sundae backend marketing-lead client.
 *
 * Forwards lead-capture payloads from the Vercel edge function to the Sundae
 * AdonisJS backend at `POST /api/v1/public/marketing/leads`, signed with
 * HMAC-SHA256 + timestamp (matches the verifier in
 * sundae-backend/app/services/marketing/lead_hmac_verifier.ts).
 *
 * Two paths in the env contract:
 *   SUNDAE_BACKEND_URL                e.g. https://api.sundaetech.ai
 *   MARKETING_LEAD_HMAC_SECRET        shared secret
 *
 * The submission `/api/cta/submit` route reads `LEAD_BACKEND`:
 *   "sundae"  → forward here (default once cut over)
 *   "clickup" → keep the legacy ClickUp path (rollback only)
 *   "both"    → forward to BOTH for the migration window
 */

import crypto from 'node:crypto';

export interface SundaeLeadPayload {
  fullName: string;
  email: string;
  company?: string | null;
  role?: string | null;
  country?: string | null;
  countryCode?: string | null;
  phone?: string | null;
  primaryPos?: string | null;
  numberOfLocations?: string | null;
  message?: string | null;
  ctaLabel?: string | null;
  sourcePage?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrerUrl?: string | null;
  locale?: string | null;
  metadata?: Record<string, unknown>;
}

export interface SundaeLeadSubmission {
  ok: boolean;
  status: number;
  leadId?: string;
  leadNumber?: string;
  error?: string;
}

const DEFAULT_BACKEND_URL = 'https://api.sundaetech.ai';
const REQUEST_TIMEOUT_MS = 15_000;

function getBackendUrl(): string {
  return (process.env.SUNDAE_BACKEND_URL || DEFAULT_BACKEND_URL).replace(/\/$/, '');
}

function getSecret(): string {
  return process.env.MARKETING_LEAD_HMAC_SECRET || '';
}

export function isSundaeBackendConfigured(): boolean {
  return getBackendUrl().length > 0 && getSecret().length > 0;
}

export async function submitLeadToSundae(
  payload: SundaeLeadPayload
): Promise<SundaeLeadSubmission> {
  const secret = getSecret();
  if (!secret) {
    return { ok: false, status: 0, error: 'MARKETING_LEAD_HMAC_SECRET not configured' };
  }

  const url = `${getBackendUrl()}/api/v1/public/marketing/leads`;
  const rawBody = JSON.stringify(payload);
  const timestamp = String(Date.now());
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Sundae-Lead-Timestamp': timestamp,
        'X-Sundae-Lead-Signature': signature,
      },
      body: rawBody,
      signal: controller.signal,
    });

    let body: { leadId?: string; leadNumber?: string; error?: string } = {};
    try {
      body = await resp.json();
    } catch {
      // empty / non-JSON body — leave defaults
    }

    if (!resp.ok) {
      return {
        ok: false,
        status: resp.status,
        error: body.error ?? `backend_status_${resp.status}`,
      };
    }
    return {
      ok: true,
      status: resp.status,
      leadId: body.leadId,
      leadNumber: body.leadNumber,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : 'unknown_error',
    };
  } finally {
    clearTimeout(timer);
  }
}

export type LeadBackendMode = 'sundae' | 'clickup' | 'both';

export function leadBackendMode(): LeadBackendMode {
  const raw = (process.env.LEAD_BACKEND ?? 'sundae').toLowerCase();
  if (raw === 'clickup' || raw === 'both') return raw;
  return 'sundae';
}
