import type { WebsiteLocale } from '@/lib/i18n';
import { getWebsiteMessages } from '@/lib/i18n';
import { generatedLocalCopy as productCopy } from '@/generated-locales/app_product_page';
import { generatedLocalCopy as foresightCopy } from '@/generated-locales/app_product_foresight_page';
import { generatedLocalCopy as insightsCopy } from '@/generated-locales/app_insights_page';
import { generatedLocalCopy as benchmarkingCopy } from '@/generated-locales/app_benchmarking_page';
import { generatedLocalCopy as coreCopy } from '@/generated-locales/app_core_page';
import { generatedLocalCopy as intelligence4dCopy } from '@/generated-locales/app_4d_intelligence_page';
import { generatedLocalCopy as architectureCopy } from '@/generated-locales/app_architecture_page';
import { generatedLocalCopy as modulesCopy } from '@/generated-locales/app_modules_page';
import { generatedLocalCopy as securityCopy } from '@/generated-locales/app_security_page';
import { generatedLocalCopy as docsCopy } from '@/generated-locales/app_docs_page';

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as UnknownRecord
    : null;
}

function stringAt(value: unknown, ...keys: string[]): string | null {
  let current: unknown = value;
  for (const key of keys) {
    current = record(current)?.[key];
  }
  return typeof current === 'string' && current.trim() ? current : null;
}

const generatedDescriptions: Record<string, (locale: WebsiteLocale) => string | null> = {
  '/product': (locale) => stringAt(productCopy, 'copyMap', locale, 'heroDescription'),
  '/product/foresight': (locale) => stringAt(foresightCopy, 'localizedForesightCopy', locale, 'heroDescription'),
  '/product/insights': (locale) => stringAt(insightsCopy, 'localizedInsightsUi', locale, 'description'),
  '/product/benchmarking': (locale) => stringAt(benchmarkingCopy, 'localizedBenchmarkCopy', locale, 'description'),
  '/core': (locale) => stringAt(coreCopy, 'localizedCoreCopy', locale, 'hero', 'description'),
  '/4d-intelligence': (locale) => stringAt(intelligence4dCopy, 'localized4DCopy', locale, 'heroDescription'),
  '/architecture': (locale) => stringAt(architectureCopy, 'localizedArchitectureCopy', locale, 'description'),
  '/modules': (locale) => stringAt(modulesCopy, 'localizedModulesCopy', locale, 'description'),
  '/security': (locale) => stringAt(securityCopy, 'securityCopy', locale, 'description'),
  '/docs': (locale) => stringAt(docsCopy, 'localizedDocsCopy', locale, 'description'),
  '/resources': (locale) => getWebsiteMessages(locale).pages.resources.description,
};

export function resolveLocalizedPageDescription(
  path: string,
  locale: WebsiteLocale,
): string | null {
  return generatedDescriptions[path]?.(locale) ?? null;
}
