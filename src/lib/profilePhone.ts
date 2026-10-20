/**
 * Server-side phone validation for the profile card contact exchange. The browser helps (country
 * selector, international-number detection) but this is the check that counts: a number is accepted
 * only when libphonenumber's full ("max") metadata says it is a valid number for the chosen country,
 * and it is stored and forwarded as E.164.
 *
 * Do not import this from a client component: the full metadata is ~157 KB (39 KB gzipped). The
 * browser uses the smaller metadata in profilePhoneInput.ts.
 */
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/max'

const REGIONS = new Set<string>(getCountries())

/** The ISO 3166-1 alpha-2 code upper-cased when libphonenumber supports it, otherwise null. */
export function asPhoneCountry(value: unknown): CountryCode | null {
  if (typeof value !== 'string') return null
  const code = value.trim().toUpperCase()
  return /^[A-Z]{2}$/.test(code) && REGIONS.has(code) ? (code as CountryCode) : null
}

export type PhoneCheck = { ok: true; e164: string; country: string } | { ok: false }

/**
 * Validates {phoneCountry, phone}. `phone` is national ("050 123 4567") or international
 * ("+971 50 123 4567"). Returns the E.164 form and the number's country.
 *
 * - National numbers are read in the chosen country. A named country that does not exist is rejected.
 * - International numbers must be valid and must share the chosen country's calling code
 *   (+1 and +44 cover several countries, so US/CA or GB/JE numbers are interchangeable here).
 *   Without a chosen country only an international number can be checked.
 */
export function checkPhone(phone: string, phoneCountry: unknown): PhoneCheck {
  const country = asPhoneCountry(phoneCountry)
  const text = phone.trim()
  if (!text) return { ok: false }
  // A country that was named but is not a real one is a malformed request, not "no country".
  const named = typeof phoneCountry === 'string' ? phoneCountry.trim() !== '' : phoneCountry != null
  if (named && !country) return { ok: false }
  const number = parsePhoneNumberFromString(text, country ? { defaultCountry: country } : undefined)
  if (!number || !number.isValid() || number.ext) return { ok: false }
  if (country && number.countryCallingCode !== getCountryCallingCode(country)) return { ok: false }
  const resolved = number.country ?? country
  if (!resolved) return { ok: false }
  return { ok: true, e164: number.number, country: resolved }
}
