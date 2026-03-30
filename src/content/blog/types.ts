import type { WebsiteLocale } from '@/lib/i18n';

export type BlogCategory =
  | 'Product'
  | 'Industry Insights'
  | 'Playbooks'
  | 'Data & AI'
  | 'Benchmarks'
  | 'Research';

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  summary: string;
  readTime: string;
  content: string;
  heroImage?: string;
  tags?: string[];
}

export type BlogTranslationStatus =
  | 'source'
  | 'translated'
  | 'draft'
  | 'review'
  | 'missing';

export type BlogLocaleEntryStatus = Exclude<
  BlogTranslationStatus,
  'source' | 'missing'
>;

export type NonEnglishBlogLocale = Exclude<WebsiteLocale, 'en'>;

export type BlogLocaleTranslation = {
  status: BlogLocaleEntryStatus;
  title?: string;
  summary?: string;
  content?: string;
  readTime?: string;
  heroImage?: string;
  tags?: string[];
};

export type BlogLocaleTranslations = Partial<
  Record<string, BlogLocaleTranslation>
>;
