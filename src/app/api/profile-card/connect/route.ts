import { createHash, randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { normalizeWebsiteLocale } from '@/lib/i18n'
import { isLeadFormEnabled } from '@/lib/profileFeatures'
import { PROFILE_HANDLES } from '@/lib/profileHandles'
import { buildLeadPayload, parseConnectSubmission } from '@/lib/profileConnect'
import { getProfile } from '@/lib/profiles'
import { isSundaeBackendConfigured, submitLeadToSundae } from '@/lib/sundaeLeadClient'

/**
 * Receives "Share your details" from a profile card and forwards it to the Sundae
 * marketing-leads store (the same signed intake the website forms use), where it shows up
 * in the CRM lead list. Deliberately lean: name and email are the only required fields.
 * Abuse controls: honeypot and minimum fill time (both accepted silently), same-origin check,
 * per-IP rate limit, payload limits. Personal data is never written to logs.
 */
export const runtime = 'nodejs'

const RATE_WINDOW_MS = 60 * 60 * 1000
const RATE_MAX = 5
const attempts = new Map<string, number[]>()

function rateLimited(ip: string, now: number): boolean {
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX) {
    attempts.set(ip, recent)
    return true
  }
  recent.push(now)
  attempts.set(ip, recent)
  return false
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === request.headers.get('host')
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  // Off until the consent wording and privacy coverage are approved (see profileFeatures.ts).
  if (!isLeadFormEnabled()) {
    return NextResponse.json({ ok: false, error: 'disabled' }, { status: 404 })
  }

  const requestId = randomUUID()
  const now = Date.now()

  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  if (rateLimited(ip, now)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429, headers: { 'Retry-After': '3600' } })
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 16_000) {
    return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 })
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = parseConnectSubmission(raw, { now, knownHandles: PROFILE_HANDLES })
  if (parsed.kind === 'ignored') {
    // Looks automated. Report success so a bot learns nothing, and forward nothing.
    return NextResponse.json({ ok: true })
  }
  if (parsed.kind === 'invalid') {
    return NextResponse.json({ ok: false, error: 'invalid', fields: parsed.fields }, { status: 400 })
  }

  const profile = getProfile(parsed.data.handle)
  if (!profile) return NextResponse.json({ ok: false, error: 'invalid', fields: ['handle'] }, { status: 400 })

  if (!isSundaeBackendConfigured()) {
    console.error(`[profile-card ${requestId}] lead backend not configured (SUNDAE_BACKEND_URL + MARKETING_LEAD_HMAC_SECRET)`)
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 })
  }

  const locale = normalizeWebsiteLocale((raw as { locale?: string }).locale)
  const payload = buildLeadPayload(profile, parsed.data, {
    locale,
    referrer: request.headers.get('referer'),
    at: new Date(now),
  })

  // One lead per person per card per day: a double tap or a retry never creates a duplicate.
  const day = new Date(now).toISOString().slice(0, 10)
  const idempotencyKey = `profile-card:${profile.handle}:${createHash('sha256')
    .update(`${parsed.data.email}|${parsed.data.name}|${day}`)
    .digest('hex')
    .slice(0, 40)}`

  const result = await submitLeadToSundae(payload, idempotencyKey)
  console.log(`[profile-card ${requestId}] handle=${profile.handle} ok=${result.ok} status=${result.status}`)
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
