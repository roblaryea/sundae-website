/**
 * vCard 3.0 builder for profile cards. Pure and dependency-free (type import only) so
 * it can be unit-tested with plain node. Output follows RFC 2426: CRLF line endings,
 * escaped text values, lines folded at 75 octets without splitting a UTF-8 character.
 *
 * The structured name (N) carries family and given names separately. A card with an
 * empty N imports as a blank or mis-sorted contact in several address books.
 */
import type { PersonProfile } from './profileData'

const CRLF = '\r\n'
const encoder = new TextEncoder()

export function escapeVCardText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

/** Fold one logical line into physical lines of at most 75 octets (RFC 2426 section 2.6). */
export function foldLine(line: string): string {
  const parts: string[] = []
  let current = ''
  let size = 0
  for (const char of line) {
    const bytes = encoder.encode(char).length
    // Continuation lines start with one space, which counts toward the 75 octets.
    if (size + bytes > 75) {
      parts.push(current)
      current = ' '
      size = 1
    }
    current += char
    size += bytes
  }
  parts.push(current)
  return parts.join(CRLF)
}

export type BuildVCardOptions = {
  /** Job title text for the card (already localized by the caller). */
  title: string
  city: string
  country: string
  /** Base64 PNG embedded as the contact photo. Omit to skip the photo. */
  photoPngBase64?: string
  /** Base64 JPEG contact photo (a person's portrait). Takes precedence over the PNG. */
  photoJpegBase64?: string
}

export function buildVCard(profile: PersonProfile, options: BuildVCardOptions): string {
  const fullName = `${profile.givenName} ${profile.familyName}`
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'PRODID:-//Sundae//Profile card//EN',
    `N:${escapeVCardText(profile.familyName)};${escapeVCardText(profile.givenName)};;;`,
    `FN:${escapeVCardText(fullName)}`,
    `ORG:${escapeVCardText(profile.company)}`,
    `TITLE:${escapeVCardText(options.title)}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.email}`,
    `URL:${profile.website}`,
  ]
  if (profile.linkedin) {
    lines.push(`item1.URL:${profile.linkedin}`, 'item1.X-ABLabel:LinkedIn')
  }
  lines.push(
    `ADR;TYPE=WORK:;;;${escapeVCardText(options.city)};;;${escapeVCardText(options.country)}`,
  )
  if (options.photoJpegBase64) {
    lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${options.photoJpegBase64}`)
  } else if (options.photoPngBase64) {
    lines.push(`PHOTO;ENCODING=b;TYPE=PNG:${options.photoPngBase64}`)
  }
  lines.push('END:VCARD')
  return lines.map(foldLine).join(CRLF) + CRLF
}

/** Safe download filename, e.g. "Robert-Laryea.vcf". */
export function vCardFilename(profile: PersonProfile): string {
  const base = `${profile.givenName}-${profile.familyName}`
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${base || profile.handle}.vcf`
}
