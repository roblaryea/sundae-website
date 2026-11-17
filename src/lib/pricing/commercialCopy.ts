import copy from '@/content/commercial-copy.json';
import type { WebsiteLocale } from '@/lib/i18n';

export function getCommercialCopy(locale: WebsiteLocale) {
  return copy[locale as keyof typeof copy] ?? copy.en;
}

export function getCoreCoverageSummary(locale: WebsiteLocale) {
  const c = getCommercialCopy(locale)
  return [
    c.coreUniversalBody,
    `Core Foundation: ${c.coreFoundationCoverage}`,
    `Core Margin: ${c.coreMarginCoverage}`,
    `Core Growth: ${c.coreGrowthCoverage}`,
    `Core Performance: ${c.corePerformanceCoverage}`,
    c.coreUsageNote,
  ].join('\n\n')
}
