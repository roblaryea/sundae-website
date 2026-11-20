/**
 * Shared lead-capture field rules for the classic form (`LeadCaptureForm`) and
 * guided booking (`ConversationalLeadCapture`). Both submit to
 * `/api/cta/submit`, so values must be stored identically: the backend and the
 * admin lead inbox never see which form produced a lead (apart from metadata).
 *
 * Pure module - no React, no path aliases - so `node --test` can import it.
 */

/** The eight `numberOfLocations` buckets, stored verbatim. */
export const LOCATION_BUCKETS = ['1', '2-5', '6-10', '11-25', '26-50', '51-100', '101-200', '200+'] as const;
export type LocationBucket = typeof LOCATION_BUCKETS[number];

/** Dial code the classic form preselects before a country is chosen. */
export const DEFAULT_COUNTRY_CODE = '+971';

/** Same pattern `/api/cta/submit` enforces server-side. */
export const LEAD_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidLeadEmail(email: string): boolean {
  return LEAD_EMAIL_PATTERN.test(email.trim());
}

/** Normalise a phone to `+<digits>` the way the classic form always has. */
export function normalizePhoneForStorage(raw: string): string {
  if (!raw) return '';
  let value = raw.replace(/[()[\]\-\s]/g, '');
  if (value.startsWith('00')) value = `+${value.slice(2)}`;
  if (!value.startsWith('+')) value = `+${value.replace(/^\+/g, '')}`;
  value = value.replace(/\+{2,}/g, '+');
  value = value.replace(/[^+\d]/g, '');
  return value;
}

/** Combine a dial code (`+971`, `+1-242`) and a national number. */
export function composeFullPhone(countryCode: string, phone: string): string {
  const local = phone.trim();
  if (!local) return '';
  return local.startsWith('+') ? local : `${countryCode || ''}${local}`;
}

export function isValidLeadPhone(fullPhone: string): boolean {
  return /^\+\d{7,15}$/.test(normalizePhoneForStorage(fullPhone));
}

/** Field values both forms share. */
export interface LeadFormValues {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  countryCode: string;
  phone: string;
  numberOfLocations: string;
  primaryPOS: string;
  message: string;
}

export function emptyLeadValues(message = ''): LeadFormValues {
  return {
    name: '',
    email: '',
    company: '',
    role: '',
    country: '',
    countryCode: DEFAULT_COUNTRY_CODE,
    phone: '',
    numberOfLocations: '',
    primaryPOS: '',
    message,
  };
}
