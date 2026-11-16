import copy from '@/content/commercial-copy.json';
import type { WebsiteLocale } from '@/lib/i18n';

export function getCommercialCopy(locale: WebsiteLocale) {
  return copy[locale as keyof typeof copy] ?? copy.en;
}
