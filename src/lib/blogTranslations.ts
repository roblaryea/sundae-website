import { blogPosts, type BlogPost } from '@/lib/blogData';
import type { WebsiteLocale } from '@/lib/i18n';

export type BlogTranslation = {
  title: string;
  summary: string;
  content: string;
  readTime?: string;
};

export type LocalizedBlogPost = BlogPost & {
  translationAvailable: boolean;
};

export const blogTranslations: Partial<
  Record<Exclude<WebsiteLocale, 'en'>, Record<string, BlogTranslation>>
> = {
  ar: {},
  fr: {},
  es: {},
};

export function getLocalizedBlogPosts(
  locale: WebsiteLocale,
): LocalizedBlogPost[] {
  if (locale === 'en') {
    return blogPosts.map((post) => ({ ...post, translationAvailable: true }));
  }

  const translations = blogTranslations[locale] ?? {};

  return blogPosts
    .filter((post) => translations[post.slug])
    .map((post) => ({
      ...post,
      ...translations[post.slug],
      translationAvailable: true,
    }));
}

export function getLocalizedBlogPost(
  slug: string,
  locale: WebsiteLocale,
): LocalizedBlogPost | null {
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) return null;

  if (locale === 'en') {
    return { ...post, translationAvailable: true };
  }

  const translation = blogTranslations[locale]?.[slug];
  if (!translation) {
    return { ...post, translationAvailable: false };
  }

  return {
    ...post,
    ...translation,
    translationAvailable: true,
  };
}
