import { positioningCopy } from '@/generated-locales/positioning_recovery'
import type { WebsiteLocale } from '@/lib/i18n'

export function getPositioningCopy(locale: WebsiteLocale) {
  return positioningCopy[locale as keyof typeof positioningCopy]
}
