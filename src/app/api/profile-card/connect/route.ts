import { createHash, randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getProfileCardCopy } from '@/lib/profileCardCopy'
import { normalizeCardLocale } from '@/lib/profileCardLocale'
import { isLeadFormEnabled } from '@/lib/profileFeatures'
import { PROFILE_HANDLES } from '@/lib/profileHandles'
import { buildLeadPayload, parseConnectSubmission } from '@/lib/profileConnect'
import { BodyTooLargeError, readTextLimited } from '@/lib/readBodyLimited'
import { getProfile } from '@/lib/profiles'
import { isSundaeBackendConfigured, submitLeadToSundae } from '@/lib/sundaeLeadClient'

/**
 * Receives "Share your details" from a profile card and forwards it to the Sundae
 * marketing-leads store (the same signed intake the website forms use), where it shows up
 * in the CRM lead list. Deliberately lean: name and email are the only required fields.
 * Abuse controls: honeypot (accepted silently), fill-time signal (asked to retry, never silently
 * dropped), same-origin check, per-IP rate limit (process-local, so a speed bump only), and a
 * byte-counted payload limit. Personal data is never written to logs.
 */
export const runtime = 'nodejs'

const RATE_WINDOW_MS = 60 * 60 * 1000
const RATE_MAX = 5
const attempts = new Map<string, number[]>()

const MAX_BODY_BYTES = 16_000
const PRUNE_ABOVE = 500

function rateLimited(ip: string, now: number): boolean {
  // Drop addresses with no recent attempts so the map cannot grow without bound.
  if (attempts.size > PRUNE_ABOVE) {
    for (const [key, times] of attempts) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) attempts.delete(key)
    }
  }
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

  if (!(request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ ok: false, error: 'unsupported_media_type' }, { status: 415 })
  }

  let raw: unknown
  try {
    raw = JSON.parse(await readTextLimited(request, MAX_BODY_BYTES))
  } catch (error) {
    if (error instanceof BodyTooLargeError) return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 })
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = parseConnectSubmission(raw, { now, knownHandles: PROFILE_HANDLES })
  if (parsed.kind === 'ignored') {
    // Honeypot filled or no usable timestamp. Report success so a bot learns nothing, and forward nothing.
    return NextResponse.json({ ok: true })
  }
  if (parsed.kind === 'retry') {
    // Timing looked unusual. Never claim success for something we did not store: ask the client to retry.
    return NextResponse.json({ ok: false, error: 'retry' }, { status: 409 })
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

  const locale = normalizeCardLocale((raw as { locale?: string }).locale)
  const payload = buildLeadPayload(profile, parsed.data, {
    locale,
    consentText: getProfileCardCopy(locale).consent,
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
