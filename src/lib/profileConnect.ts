/**
 * "Share your details" on a profile card: validation and the lead payload, kept pure
 * (type imports only) so it can be unit-tested. The route handler in
 * src/app/api/profile-card/connect/route.ts does the I/O.
 *
 * A visitor who scanned a Sundae card shares their name and email (more is optional) and
 * agrees to be contacted. The lead lands in the Sundae marketing-leads store, which is the
 * CRM list staff already work from, tagged with the card it came from.
 */
import type { PersonProfile } from './profileData'

/** Bump when the consent wording changes; stored with every lead as evidence of what was agreed. */
export const CONSENT_VERSION = '2026-10-17'
export const CONSENT_TEXT_EN = 'I agree that Sundae may contact me about this.'

/** Ignore submissions faster than a person can fill a form (bots), and absurdly old forms. */
export const MIN_FILL_MS = 2000
export const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000

export const LIMITS = { name: 120, email: 254, phone: 30, company: 120, note: 1000 } as const

export type ConnectData = {
  handle: string
  name: string
  email: string
  phone: string
  company: string
  note: string
}

export type ConnectParse =
  | { kind: 'ok'; data: ConnectData }
  /** Looks automated (honeypot filled or submitted too fast): accept silently, forward nothing. */
  | { kind: 'ignored' }
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
  if (clean(input.website) !== '' || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    return { kind: 'ignored' }
  }

  const data: ConnectData = {
    handle: clean(input.handle).toLowerCase(),
    name: clean(input.name),
    email: clean(input.email).toLowerCase(),
    phone: clean(input.phone),
    company: clean(input.company),
    note: typeof input.note === 'string' ? input.note.replace(CONTROL_CHARS, '').replace(/\r\n?/g, '\n').trim() : '',
  }

  const fields: string[] = []
  if (!options.knownHandles.includes(data.handle)) fields.push('handle')
  if (data.name.length < 2 || data.name.length > LIMITS.name) fields.push('name')
  if (!EMAIL.test(data.email) || data.email.length > LIMITS.email) fields.push('email')
  if (data.phone && (data.phone.length > LIMITS.phone || !PHONE_CHARS.test(data.phone) || !/\d{6,}/.test(data.phone.replace(/[\s\-().]/g, '')))) fields.push('phone')
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
  context: { locale: string | null; referrer: string | null; at: Date },
): LeadPayload {
  const ownerName = `${profile.givenName} ${profile.familyName}`
  return {
    fullName: data.name,
    email: data.email,
    company: data.company || null,
    role: null,
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
      consent: {
        given: true,
        version: CONSENT_VERSION,
        text: CONSENT_TEXT_EN,
        at: context.at.toISOString(),
      },
    },
  }
}

/** Replaces {name} in a localized template; returns text parts so the caller can isolate the name for bidi. */
export function splitTemplate(template: string, name: string): { text: string; isName: boolean }[] {
  return template
    .split('{name}')
    .flatMap((part, index, parts) =>
      index < parts.length - 1 ? [{ text: part, isName: false }, { text: name, isName: true }] : [{ text: part, isName: false }],
    )
    .filter((part) => part.text !== '')
}
