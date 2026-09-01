import { positioningCopy } from '@/generated-locales/positioning_recovery'
import type { WebsiteLocale } from '@/lib/i18n'
import { getPositioningCopy } from '@/lib/positioningCopy'

export type RecoveryStage = {
  step: string
  name: string
  line: string
}

type WidenCopy<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly WidenCopy<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: WidenCopy<T[Key]> }
      : T

export type RecoveryCopy = WidenCopy<(typeof positioningCopy.en)['recovery']>

/**
 * Recovery is a flagship positioning page, so every supported website locale
 * is explicit. It must never silently fall back to English.
 */
export function getRecoveryCopy(locale: WebsiteLocale): RecoveryCopy {
  return getPositioningCopy(locale).recovery
}
