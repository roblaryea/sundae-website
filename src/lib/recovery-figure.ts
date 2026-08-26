import { getWebsiteCurrency, getWebsiteIntlLocale, type WebsiteLocale } from "./i18n";

/**
 * Resolves the illustrative "recovered this week" figure shown in the homepage
 * hero-1 recovery loop. Currency follows the visitor's LOCATION first (Vercel
 * geo header), then falls back to their selected LANGUAGE's currency. The amount
 * is a rounded, representative weekly figure per currency - a demo value, never a
 * claimed customer result, and deliberately not a live FX conversion.
 *
 * Formatting always uses the visitor's language locale (grouping, digits), so a
 * German speaker in the UAE sees AED grouped the German way.
 */

export type RecoveryFigure = {
  currency: string; // ISO 4217
  amount: number; // illustrative, in `currency`
  intlLocale: string; // BCP-47, for Intl grouping/digits (from the language locale)
};

// ISO 3166-1 alpha-2 country -> ISO 4217 currency. Focused on Sundae's markets
// (GCC first) plus the major economies; unmapped countries fall back to the
// language-locale currency. Every currency here has an amount in CURRENCY_AMOUNT.
const COUNTRY_CURRENCY: Record<string, string> = {
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  NZ: "NZD",
  // GCC
  AE: "AED", SA: "SAR", QA: "QAR", KW: "KWD", BH: "BHD", OM: "OMR",
  // Eurozone
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", PT: "EUR", IE: "EUR",
  BE: "EUR", AT: "EUR", FI: "EUR", GR: "EUR", LU: "EUR", SK: "EUR", SI: "EUR",
  // Wider Europe
  PL: "PLN", RO: "RON", SE: "SEK", DK: "DKK", NO: "NOK", CH: "CHF", CZ: "CZK", HU: "HUF",
  // MENA / Africa
  EG: "EGP", MA: "MAD", ZA: "ZAR", NG: "NGN", KE: "KES", GH: "GHS",
  // Asia-Pacific
  TR: "TRY", ID: "IDR", MY: "MYR", SG: "SGD", VN: "VND", TH: "THB", PH: "PHP",
  IN: "INR", PK: "PKR", BD: "BDT", LK: "LKR",
  CN: "CNY", HK: "HKD", TW: "TWD", JP: "JPY", KR: "KRW",
  // Americas
  BR: "BRL", MX: "MXN",
};

// Illustrative weekly recovered figure per currency (rounded, ~a mid-single-
// thousands-USD-equivalent; NOT an FX conversion). Whole units.
const CURRENCY_AMOUNT: Record<string, number> = {
  USD: 5120, EUR: 4800, GBP: 4200, CAD: 7000, AUD: 7800, NZD: 8400,
  AED: 18800, SAR: 19200, QAR: 18600, KWD: 1560, BHD: 1930, OMR: 1970,
  PLN: 20500, RON: 23800, SEK: 54000, DKK: 35000, NOK: 54000, CHF: 4600, CZK: 118000, HUF: 1850000,
  EGP: 248000, MAD: 51000, ZAR: 95000, NGN: 7900000, KES: 660000, GHS: 76000,
  TRY: 168000, IDR: 82000000, MYR: 24000, SGD: 6900, VND: 128000000, THB: 184000, PHP: 290000,
  INR: 428000, PKR: 1420000, BDT: 610000, LKR: 1550000,
  CNY: 37000, HKD: 40000, TWD: 164000, JPY: 760000, KRW: 6900000,
  BRL: 26000, MXN: 92000,
};

const BASE_AMOUNT = 5120;

export function resolveRecoveryFigure(locale: WebsiteLocale, country?: string | null): RecoveryFigure {
  const cc = country?.trim().toUpperCase();
  const geoCurrency = cc ? COUNTRY_CURRENCY[cc] : undefined;
  const currency = geoCurrency ?? getWebsiteCurrency(locale);
  const amount = CURRENCY_AMOUNT[currency] ?? BASE_AMOUNT;
  return { currency, amount, intlLocale: getWebsiteIntlLocale(locale) };
}
