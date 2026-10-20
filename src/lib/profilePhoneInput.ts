/**
 * Browser-side helpers for the phone field on the contact exchange: the country list, the default
 * country, and detection of a full international number typed, pasted or AutoFilled into the
 * national-number box. Uses libphonenumber's smaller ("min") metadata (about 19 KB gzipped) because
 * this only drives the interface; the server re-validates everything with the full metadata
 * (see profilePhone.ts), so a difference between the two can only ever make the server stricter.
 *
 * Imports only the library and types so the unit tests can load it directly.
 */
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/min'
import type { CardLocale } from './profileCardLocale'

const SUPPORTED = new Set<string>(getCountries())

export function isPhoneCountry(code: unknown): code is CountryCode {
  return typeof code === 'string' && SUPPORTED.has(code)
}

/** ISO code upper-cased when it is a supported phone country, else null (header values can be "XX", "T1" or junk). */
export function asPhoneCountry(value: unknown): CountryCode | null {
  if (typeof value !== 'string') return null
  const code = value.trim().toUpperCase()
  return isPhoneCountry(code) ? code : null
}

/**
 * The country a card language points to, for languages tied to one country. Deliberately absent for
 * languages spoken across many (English, Arabic, French, Spanish, Portuguese): guessing from those
 * would be wrong more often than falling back to the card owner's own country.
 */
export const LOCALE_PHONE_COUNTRY: Partial<Record<CardLocale, string>> = {
  de: 'DE', nl: 'NL', hi: 'IN', ur: 'PK', it: 'IT', pl: 'PL', tr: 'TR', 'zh-Hans': 'CN', ja: 'JP', ko: 'KR',
  id: 'ID', vi: 'VN', ro: 'RO', sv: 'SE', bn: 'BD', th: 'TH', ms: 'MY', ru: 'RU', az: 'AZ',
  // Papiamento is written here in the Aruban spelling.
  pap: 'AW',
}

export const PHONE_FALLBACK_COUNTRY = 'US'

/**
 * The country the selector starts on: the visitor's own country (from the hosting platform's IP
 * country header), else the country their card language implies, else the card owner's country.
 */
export function resolveDefaultPhoneCountry(input: {
  /** Raw `x-vercel-ip-country` value. */
  ipCountry?: string | null
  locale: CardLocale
  ownerCountry?: string | null
}): CountryCode {
  return (
    asPhoneCountry(input.ipCountry) ??
    asPhoneCountry(LOCALE_PHONE_COUNTRY[input.locale]) ??
    asPhoneCountry(input.ownerCountry) ??
    (PHONE_FALLBACK_COUNTRY as CountryCode)
  )
}

/** The country most people mean by a calling code that several countries share (searching "+44" lists the United Kingdom first). */
export const MAIN_COUNTRY_FOR_DIAL: Record<string, string> = {
  '1': 'US', '7': 'RU', '39': 'IT', '44': 'GB', '47': 'NO', '61': 'AU', '212': 'MA', '262': 'RE', '290': 'SH', '358': 'FI', '590': 'GP', '599': 'CW',
}

export type PhoneCountry = { code: CountryCode; dial: string }

let cached: PhoneCountry[] | undefined
/** Every supported country with its calling code (digits only, no plus). */
export function phoneCountries(): PhoneCountry[] {
  cached ??= getCountries().map((code) => ({ code, dial: getCountryCallingCode(code) }))
  return cached
}

export function dialCode(code: string): string {
  return isPhoneCountry(code) ? getCountryCallingCode(code) : ''
}

/** The flag emoji for an ISO code (regional-indicator letters). Platforms without flag glyphs show the two letters. */
export function flagEmoji(code: string): string {
  return /^[A-Z]{2}$/.test(code) ? String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : ''
}

/** Lower-cased, accent-folded text for matching what a visitor types against names. */
export function foldForSearch(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
}

export type PhoneCountryOption = { code: CountryCode; dial: string; name: string; english: string; folded: string; foldedEnglish: string }

/** Matches a typed query against the localized name, the English name, the ISO code and the calling code. */
export function filterPhoneCountries(options: PhoneCountryOption[], query: string): PhoneCountryOption[] {
  const q = foldForSearch(query)
  if (!q) return options
  const digits = q.replace(/^\+/, '')
  const dialQuery = /^\d+$/.test(digits) ? digits : ''
  const ranked: { option: PhoneCountryOption; rank: number }[] = []
  for (const option of options) {
    let rank = -1
    if (option.folded === q || option.foldedEnglish === q || (dialQuery && option.dial === dialQuery && MAIN_COUNTRY_FOR_DIAL[option.dial] === option.code)) rank = 0
    else if (option.code.toLowerCase() === q || (dialQuery && option.dial === dialQuery)) rank = 1
    else if (option.folded.startsWith(q) || option.foldedEnglish.startsWith(q)) rank = 2
    else if (dialQuery && option.dial.startsWith(dialQuery)) rank = 3
    else if (option.folded.includes(q) || option.foldedEnglish.includes(q)) rank = 4
    if (rank >= 0) ranked.push({ option, rank })
  }
  // Array.prototype.sort is stable, so equal ranks keep the language's alphabetical order.
  return ranked.sort((a, b) => a.rank - b.rank).map((entry) => entry.option)
}

export type PhoneSplit = { country: CountryCode; text: string; switched: boolean }

/**
 * Makes a number from a phone's own contact card safe to parse and to send. Contact cards and
 * AutoFill can hand over invisible direction marks (left-to-right marks around a number, common for
 * Arabic and Urdu contacts), non-breaking spaces, a full-width plus sign or Arabic-Indic digits. None
 * of those pass the server's character check, so they are normalised here to plain digits, spaces
 * and punctuation.
 */
export function cleanPhoneInput(raw: string): string {
  return raw
    .normalize('NFKC')
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\uFEFF]/g, '')
    .replace(/[\u0660-\u0669]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
}

/**
 * If `raw` is a full international number ("+971 50 123 4567" or "00971..."), returns its country and
 * its national form; otherwise returns the selected country and the text unchanged. Browsers AutoFill
 * `tel` with a whole international number, and the Contact Picker returns numbers in whatever form
 * the contact stores them, so both pass through here.
 *
 * Not for keystrokes: "+971 50" already parses, so run it on paste, AutoFill, blur and submit.
 */
export function splitInternationalNumber(raw: string, selected: CountryCode): PhoneSplit {
  const cleaned = cleanPhoneInput(raw)
  const unchanged: PhoneSplit = { country: selected, text: cleaned, switched: false }
  const trimmed = cleaned.trim()
  if (!/^(\+|00)/.test(trimmed)) return unchanged
  const international = trimmed.startsWith('00') ? `+${trimmed.slice(2)}` : trimmed
  const number = parsePhoneNumberFromString(international)
  if (!number) return unchanged
  // A calling code can serve several countries (+1, +44). Keep the visitor's choice when the number
  // does not say otherwise, and follow the number when it does.
  const detected = number.country && isPhoneCountry(number.country) ? number.country : null
  const shares = number.countryCallingCode === getCountryCallingCode(selected)
  const country = detected && !(shares && detected !== selected && !number.isValid()) ? detected : shares ? selected : null
  if (!country) return unchanged
  return { country, text: number.formatNational(), switched: country !== selected }
}
