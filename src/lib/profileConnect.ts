/**
 * "Share your details" on a profile card: validation and the lead payload, kept pure
 * (type imports only) so it can be unit-tested. The route handler in
 * src/app/api/profile-card/connect/route.ts does the I/O.
 *
 * A visitor who scanned a Sundae card shares their name, email and phone number (company and message are optional) and
 * agrees to be contacted. The lead lands in the Sundae marketing-leads store, which is the
 * CRM list staff already work from, tagged with the card it came from.
 */
import type { PersonProfile } from './profileData'
import { MIN_FILL_MS, MAX_FORM_AGE_MS } from './profileConnectTiming.ts'
import { checkPhone } from './profilePhone.ts'

// Re-exported for the server code and tests that already import them from here. Browser code imports
// the small modules directly so it never loads the full phone metadata.
export { MIN_FILL_MS, MAX_FORM_AGE_MS }
export { splitTemplate } from './profileTemplate.ts'

/** Bump when the consent wording changes; stored with every lead as evidence of what was agreed. */
export const CONSENT_VERSION = '2026-10-17'
export const CONSENT_TEXT_EN = 'I agree that Sundae may contact me about this.'

export const LIMITS = { name: 120, email: 254, phone: 30, company: 120, note: 1000 } as const

/** A client-generated id for one submission attempt; retries of the same attempt reuse it. */
const SUBMISSION_ID = /^[A-Za-z0-9-]{8,64}$/

export type ConnectData = {
  handle: string
  /** Identifies this submission so a transport retry is deduplicated but a second message is not. */
  submissionId: string | null
  name: string
  email: string
  /** E.164 (for example +971501234567) once validated for {@link ConnectData.phoneCountry}. */
  phone: string
  /** ISO 3166-1 alpha-2 country of the phone number. */
  phoneCountry: string
  company: string
  note: string
}

export type ConnectParse =
  | { kind: 'ok'; data: ConnectData }
  /** Strong evidence of automation (honeypot filled, no usable timestamp): accept silently, forward nothing. */
  | { kind: 'ignored' }
  /** Suspicious timing only: do not store, and tell the client to retry (never report success). */
  | { kind: 'retry' }
  | { kind: 'invalid'; fields: string[] }

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARS = /^[0-9+()\-.\s]+$/

function clean(value: unknown): string {
  return typeof value === 'string' ? value.replace(CONTROL_CHARS, '').trim() : ''
}

export function parseConnectSubmission(
  raw: unknown,
  options: { now: number; knownHandles: readonly string[] },
): ConnectParse {
  if (!raw || typeof raw !== 'object') return { kind: 'invalid', fields: ['body'] }
  const input = raw as Record<string, unknown>

  const startedAt = typeof input.startedAt === 'number' ? input.startedAt : NaN
  const elapsed = options.now - startedAt
  if (clean(input.website) !== '' || !Number.isFinite(elapsed)) return { kind: 'ignored' }
  if (elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) return { kind: 'retry' }

  const submissionId = typeof input.submissionId === 'string' && SUBMISSION_ID.test(input.submissionId) ? input.submissionId : null
  // The phone number is required and is checked on the server whatever the browser did: it must be a
  // valid number for the chosen country (national or international input) and is kept as E.164.
  const rawPhone = clean(input.phone)
  const phone = rawPhone && rawPhone.length <= LIMITS.phone && PHONE_CHARS.test(rawPhone) ? checkPhone(rawPhone, input.phoneCountry) : null
  const data: ConnectData = {
    handle: clean(input.handle).toLowerCase(),
    submissionId,
    name: clean(input.name),
    email: clean(input.email).toLowerCase(),
    phone: phone?.ok ? phone.e164 : rawPhone,
    phoneCountry: phone?.ok ? phone.country : '',
    company: clean(input.company),
    note: typeof input.note === 'string' ? input.note.replace(CONTROL_CHARS, '').replace(/\r\n?/g, '\n').trim() : '',
  }

  const fields: string[] = []
  if (!options.knownHandles.includes(data.handle)) fields.push('handle')
  if (data.name.length < 2 || data.name.length > LIMITS.name) fields.push('name')
  if (!EMAIL.test(data.email) || data.email.length > LIMITS.email) fields.push('email')
  // A call or WhatsApp message is how most visitors prefer to be reached, so the number must be real.
  if (!phone?.ok) fields.push('phone')
  if (data.company.length > LIMITS.company) fields.push('company')
  if (data.note.length > LIMITS.note) fields.push('note')
  if (input.consent !== true) fields.push('consent')

  return fields.length ? { kind: 'invalid', fields } : { kind: 'ok', data }
}

export type LeadPayload = {
  fullName: string
  email: string
  company: string | null
  role: string | null
  phone: string | null
  message: string | null
  ctaLabel: string
  sourcePage: string
  referrerUrl: string | null
  locale: string | null
  metadata: Record<string, unknown>
}

export function buildLeadPayload(
  profile: Pick<PersonProfile, 'handle' | 'givenName' | 'familyName' | 'email'>,
  data: ConnectData,
  context: {
    /** The card language the visitor used (already normalized to a supported locale). */
    locale: string | null
    /** The consent sentence exactly as shown to the visitor in that language. */
    consentText: string
    referrer: string | null
    at: Date
  },
): LeadPayload {
  const ownerName = `${profile.givenName} ${profile.familyName}`
  // Record the wording the visitor actually saw, in the language they saw it, plus the English
  // reference text so staff can read it.
  return {
    fullName: data.name,
    email: data.email,
    company: data.company || null,
    role: null,
    // E.164, validated against the visitor's country on the server.
    phone: data.phone || null,
    message: data.note || null,
    // Shown in the lead list, so a human can see which card it came from.
    ctaLabel: `Profile card: ${ownerName}`,
    sourcePage: `/${profile.handle}`,
    referrerUrl: context.referrer,
    locale: context.locale,
    metadata: {
      channel: 'qr_card',
      profile_handle: profile.handle,
      profile_owner_name: ownerName,
      profile_owner_email: profile.email,
      phone_country: data.phoneCountry || null,
      consent: {
        given: true,
        version: CONSENT_VERSION,
        locale: context.locale,
        text: context.consentText,
        text_en: CONSENT_TEXT_EN,
        privacy_url: 'https://www.sundae.io/privacy',
        at: context.at.toISOString(),
      },
    },
  }
}
