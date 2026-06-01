/**
 * Shared currency catalog — used by the insight calculators and the
 * diagnostic. Covers GCC + Americas + Europe + APAC + LATAM + Africa.
 * Grouped for the dropdown UX so users can find their currency fast.
 */

export type Currency = {
  code: string;
  symbol: string;
  region: string;
};

export const CURRENCIES: Currency[] = [
  // Americas
  { code: "USD", symbol: "$",   region: "Americas" },
  { code: "CAD", symbol: "C$",  region: "Americas" },
  { code: "MXN", symbol: "MX$", region: "Americas" },
  { code: "BRL", symbol: "R$",  region: "Americas" },
  { code: "ARS", symbol: "$",   region: "Americas" },
  { code: "CLP", symbol: "$",   region: "Americas" },
  { code: "COP", symbol: "$",   region: "Americas" },
  // Europe
  { code: "EUR", symbol: "€",   region: "Europe" },
  { code: "GBP", symbol: "£",   region: "Europe" },
  { code: "CHF", symbol: "CHF ", region: "Europe" },
  { code: "NOK", symbol: "kr ", region: "Europe" },
  { code: "SEK", symbol: "kr ", region: "Europe" },
  { code: "DKK", symbol: "kr ", region: "Europe" },
  { code: "PLN", symbol: "zł ", region: "Europe" },
  { code: "TRY", symbol: "₺",   region: "Europe" },
  // GCC + MEA
  { code: "AED", symbol: "AED ", region: "GCC / MEA" },
  { code: "SAR", symbol: "SAR ", region: "GCC / MEA" },
  { code: "QAR", symbol: "QAR ", region: "GCC / MEA" },
  { code: "KWD", symbol: "KWD ", region: "GCC / MEA" },
  { code: "BHD", symbol: "BHD ", region: "GCC / MEA" },
  { code: "OMR", symbol: "OMR ", region: "GCC / MEA" },
  { code: "EGP", symbol: "EGP ", region: "GCC / MEA" },
  { code: "ZAR", symbol: "R ",   region: "GCC / MEA" },
  // APAC
  { code: "SGD", symbol: "S$",  region: "APAC" },
  { code: "JPY", symbol: "¥",   region: "APAC" },
  { code: "AUD", symbol: "A$",  region: "APAC" },
  { code: "NZD", symbol: "NZ$", region: "APAC" },
  { code: "INR", symbol: "₹",   region: "APAC" },
  { code: "IDR", symbol: "Rp ", region: "APAC" },
  { code: "MYR", symbol: "RM ", region: "APAC" },
  { code: "THB", symbol: "฿",   region: "APAC" },
  { code: "VND", symbol: "₫ ",  region: "APAC" },
  { code: "PHP", symbol: "₱",   region: "APAC" },
  { code: "HKD", symbol: "HK$", region: "APAC" },
  { code: "KRW", symbol: "₩",   region: "APAC" },
  { code: "CNY", symbol: "¥",   region: "APAC" },
];

export const CURRENCY_REGIONS = Array.from(new Set(CURRENCIES.map((c) => c.region)));

export function getCurrencySymbol(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? "$";
}
