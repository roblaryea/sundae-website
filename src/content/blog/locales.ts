import { arBlogTranslations } from './translations/ar';
import { esBlogTranslations } from './translations/es';
import { frBlogTranslations } from './translations/fr';
import type {
  BlogLocaleTranslations,
  BlogLocaleTranslation,
  BlogTranslationStatus,
  NonEnglishBlogLocale,
} from './types';

// Locale-specific overrides stay sparse so posts can be migrated one at a time.
// Missing entries fall back to the English source while still exposing status.
export const blogLocaleTranslations: Record<
  NonEnglishBlogLocale,
  BlogLocaleTranslations
> = {
  ar: arBlogTranslations,
  fr: frBlogTranslations,
  es: esBlogTranslations,
};

export type {
  BlogLocaleTranslations,
  BlogLocaleTranslation,
  BlogTranslationStatus,
};
