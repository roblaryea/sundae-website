/**
 * Locale-matched currency for the Crew phone-screen mockups.
 *
 * The designs are authored in GBP (the DIFC demo tenant). On a localized page we
 * show the locale's own currency with realistic FX-converted amounts — e.g. a
 * £2,498 net pay reads as ~€2,923 / ~AED 11,640 — formatted natively per locale
 * via Intl.NumberFormat. Rates are rough, static, illustrative (marketing mockup,
 * not a billing surface).
 *
 * Sum integrity: convert each part with crewConv() and derive totals from the
 * converted parts (crewFmt) so columns like gross − deductions = net always
 * reconcile after conversion.
 */

export const CREW_CURRENCY: Record<string, string> = {
  en: 'GBP',
  fr: 'EUR', es: 'EUR', de: 'EUR', nl: 'EUR', pt: 'EUR', it: 'EUR',
  ar: 'AED', hi: 'INR', ur: 'PKR', pl: 'PLN', tr: 'TRY',
  'zh-Hans': 'CNY', ja: 'JPY', ko: 'KRW', id: 'IDR', vi: 'VND',
  ro: 'RON', sv: 'SEK', bn: 'BDT', th: 'THB', ms: 'MYR',
};

// 1 GBP = X of currency. Rough mid-2026 illustrative rates.
const FX_FROM_GBP: Record<string, number> = {
  GBP: 1, EUR: 1.17, AED: 4.66, INR: 106, PKR: 355, PLN: 5.0, TRY: 41,
  CNY: 9.2, JPY: 190, KRW: 1720, IDR: 20500, VND: 32000, RON: 5.8,
  SEK: 13.4, BDT: 152, THB: 45, MYR: 5.9,
};

export function crewCurrencyCode(locale: string): string {
  return CREW_CURRENCY[locale as keyof typeof CREW_CURRENCY] ?? 'GBP';
}

/** Convert a GBP integer to the locale's currency (rounded whole units; GBP passes through). */
export function crewConv(locale: string, gbp: number): number {
  const code = crewCurrencyCode(locale);
  return code === 'GBP' ? gbp : Math.round(gbp * (FX_FROM_GBP[code] ?? 1));
}

/** Format an already-converted value in the locale's currency. */
export function crewFmt(locale: string, value: number, decimals = 0): string {
  const code = crewCurrencyCode(locale);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Convert + format a GBP integer in one step.
 * GBP keeps the design's decimals (gbpDecimals); converted currencies show whole units.
 */
export function crewMoney(locale: string, gbp: number, gbpDecimals = 0): string {
  const code = crewCurrencyCode(locale);
  return code === 'GBP'
    ? crewFmt(locale, gbp, gbpDecimals)
    : crewFmt(locale, crewConv(locale, gbp), 0);
}
