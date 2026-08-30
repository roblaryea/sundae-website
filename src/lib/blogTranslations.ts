import { blogPosts, type BlogPost } from '@/lib/blogData';
import { websiteLocales, type WebsiteLocale } from '@/lib/i18n';
import {
  blogLocaleTranslations,
  type BlogLocaleTranslation,
  type BlogTranslationStatus,
} from '@/content/blog/locales';
import type { NonEnglishBlogLocale } from '@/content/blog/types';

export type BlogTranslation = BlogLocaleTranslation;

export type LocalizedBlogPost = BlogPost & {
  translationAvailable: boolean;
  translationStatus: BlogTranslationStatus;
};

export const blogTranslations = blogLocaleTranslations;

export function getSourceBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getSourceBlogPost(slug: string): BlogPost | null {
  return blogPosts.find((entry) => entry.slug === slug) ?? null;
}

function getTranslation(
  locale: Exclude<WebsiteLocale, 'en'>,
  slug: string,
): BlogLocaleTranslation | undefined {
  return blogLocaleTranslations[locale]?.[slug];
}

function mergeLocalizedPost(
  post: BlogPost,
  translation: BlogLocaleTranslation,
): BlogPost {
  const localizedFields = Object.fromEntries(
    Object.entries(translation).filter(([key]) => key !== 'status'),
  ) as Partial<BlogPost>;
  return {
    ...post,
    ...localizedFields,
  };
}

export function getLocalizedBlogPosts(
  locale: WebsiteLocale,
): LocalizedBlogPost[] {
  if (locale === 'en') {
    return blogPosts.map((post) => ({
      ...post,
      translationAvailable: true,
      translationStatus: 'source',
    }));
  }

  const localizedPosts: LocalizedBlogPost[] = [];

  for (const post of blogPosts) {
    const translation = getTranslation(locale, post.slug);
    if (translation?.status !== 'translated') {
      continue;
    }

    localizedPosts.push({
      ...mergeLocalizedPost(post, translation),
      translationAvailable: true,
      translationStatus: translation.status,
    });
  }

  return localizedPosts;
}

export function getLocalizedBlogPost(
  slug: string,
  locale: WebsiteLocale,
): LocalizedBlogPost | null {
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) return null;

  if (locale === 'en') {
    return {
      ...post,
      translationAvailable: true,
      translationStatus: 'source',
    };
  }

  const translation = getTranslation(locale, slug);
  if (!translation) {
    return {
      ...post,
      translationAvailable: false,
      translationStatus: 'missing',
    };
  }

  if (translation.status !== 'translated') {
    return {
      ...post,
      translationAvailable: false,
      translationStatus: translation.status,
    };
  }

  return {
    ...mergeLocalizedPost(post, translation),
    translationAvailable: true,
    translationStatus: translation.status,
  };
}

export function getBlogTranslationStatus(
  slug: string,
  locale: WebsiteLocale,
): BlogTranslationStatus {
  if (locale === 'en') return 'source';
  return getTranslation(locale, slug)?.status ?? 'missing';
}

/**
 * Return only the locales that contain a publishable version of an article.
 * English is the source and is always available; non-English locales must be
 * explicitly marked as translated before they are advertised to crawlers.
 */
export function getAvailableBlogPostLocales(slug: string): WebsiteLocale[] {
  if (!getSourceBlogPost(slug)) return [];

  return websiteLocales.filter(
    (locale) => locale === 'en' || getBlogTranslationStatus(slug, locale) === 'translated',
  );
}

export type BlogTranslationCoverageRow = {
  slug: string;
  sourceTitle: string;
  statuses: Partial<Record<NonEnglishBlogLocale, BlogTranslationStatus>>;
};

export function getBlogTranslationCoverage(): BlogTranslationCoverageRow[] {
  return blogPosts.map((post) => ({
    slug: post.slug,
    sourceTitle: post.title,
    statuses: {
      ar: getBlogTranslationStatus(post.slug, 'ar'),
      fr: getBlogTranslationStatus(post.slug, 'fr'),
      es: getBlogTranslationStatus(post.slug, 'es'),
    },
  }));
}
