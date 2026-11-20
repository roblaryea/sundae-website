/**
 * Locale packs for the Operations Diagnostic. One pack per website locale,
 * each with exactly the keys of `en.ts`. Non-English packs are machine
 * drafted (20 Nov 2026) and need native review before they are final.
 */
import { normalizeWebsiteLocale, type WebsiteLocale } from "../../i18n";
import type { DiagnosticPack } from "./types";
import { en } from "./en";
import { ar } from "./ar";
import { fr } from "./fr";
import { es } from "./es";
import { de } from "./de";
import { nl } from "./nl";
import { pt } from "./pt";
import { hi } from "./hi";
import { ur } from "./ur";
import { it } from "./it";
import { pl } from "./pl";
import { tr } from "./tr";
import { zhHans } from "./zh-Hans";
import { ja } from "./ja";
import { ko } from "./ko";
import { id } from "./id";
import { vi } from "./vi";
import { ro } from "./ro";
import { sv } from "./sv";
import { bn } from "./bn";
import { th } from "./th";
import { ms } from "./ms";

export type { DiagnosticPack };

export const DIAGNOSTIC_PACKS: Record<WebsiteLocale, DiagnosticPack> = {
  en,
  ar,
  fr,
  es,
  de,
  nl,
  pt,
  hi,
  ur,
  it,
  pl,
  tr,
  "zh-Hans": zhHans,
  ja,
  ko,
  id,
  vi,
  ro,
  sv,
  bn,
  th,
  ms,
};

export function getDiagnosticPack(locale?: string | null): DiagnosticPack {
  return DIAGNOSTIC_PACKS[normalizeWebsiteLocale(locale)] ?? en;
}

/** Fills `{name}` placeholders. Unknown placeholders are left as written. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}
