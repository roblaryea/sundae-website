/**
 * Locale helpers for the Operations Diagnostic.
 *
 * Visible copy lives in the locale packs (`copy/<locale>.ts`); this module
 * adds the direction and language metadata, and the language instruction the
 * AI prompt uses. `scripts/qa-diagnostic-i18n.mjs` checks every pack.
 */
import {
  normalizeWebsiteLocale,
  websiteLocaleDirection,
  websiteLocaleProfiles,
  type WebsiteLocale,
} from "@/lib/i18n";
import { getDiagnosticPack, type DiagnosticPack } from "./copy";

export type DiagnosticCopy = DiagnosticPack & {
  locale: WebsiteLocale;
  dir: "ltr" | "rtl";
  languageName: string;
  nativeLanguageName: string;
  languageInstruction: string;
};

// Protected product names, kept literal in every locale. Retired names
// (Report Lite/Plus/Pro, Core Lite, Core Pro) are deliberately absent.
const productGlossary =
  "Sundae, Core, Crew, Pulse, Benchmarks, Ask Sundae, Profit Recovery, Foresight & Action, Watchtower, POS, Core Foundation, Core Margin, Core Growth, Core Performance, Crew Starter, Crew Schedule, Crew Manage, Crew Time, Crew Pay, Crew People, Schedule & Time, Crew Operating, Crew Complete";

const languageInstructions: Record<WebsiteLocale, string> = {
  en: "English",
  ar: "Arabic (Modern Standard Arabic suitable for GCC operators)",
  fr: "French (native business French)",
  es: "Spanish (native international business Spanish)",
  de: "German (native business German)",
  nl: "Dutch (native Netherlands business Dutch)",
  pt: "Portuguese (native Brazilian Portuguese)",
  hi: "Hindi (native business Hindi)",
  ur: "Urdu (native business Urdu)",
  it: "Italian (native business Italian)",
  pl: "Polish (native business Polish)",
  tr: "Turkish (native business Turkish)",
  "zh-Hans": "Simplified Chinese (native Mainland business Chinese)",
  ja: "Japanese (native business Japanese)",
  ko: "Korean (native business Korean)",
  id: "Indonesian (native business Indonesian)",
  vi: "Vietnamese (native business Vietnamese)",
  ro: "Romanian (native business Romanian)",
  sv: "Swedish (native business Swedish)",
  bn: "Bengali (native business Bengali)",
  th: "Thai (native business Thai)",
  ms: "Malay (native business Malay)",
};

export function getDiagnosticCopy(locale?: string | null): DiagnosticCopy {
  const normalized = normalizeWebsiteLocale(locale);
  const profile = websiteLocaleProfiles[normalized];
  return {
    ...getDiagnosticPack(normalized),
    locale: normalized,
    dir: websiteLocaleDirection[normalized] === "rtl" ? "rtl" : "ltr",
    languageName: profile.name,
    nativeLanguageName: profile.nativeName,
    languageInstruction: languageInstructions[normalized],
  };
}

export function getDiagnosticPromptInstruction(locale?: string | null): string {
  const copy = getDiagnosticCopy(locale);
  return [
    `Target language: ${copy.languageInstruction}.`,
    `Write every user-visible value in the JSON in ${copy.languageInstruction}.`,
    "Keep JSON keys, ids and enum values exactly as the schema defines them.",
    `Preserve these glossary/product names exactly: ${productGlossary}.`,
    "Use native, polished operator-facing language. Do not produce literal or fallback-style translations.",
    "Do not mention the model, provider, translation process, or language instruction.",
  ].join("\n");
}
