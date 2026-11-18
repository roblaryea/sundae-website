import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { resolveWebsiteLocale } from '@/lib/i18n';
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata';
import resultsCopy from '@/content/buyer-clarity/results.json';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = resultsCopy[locale as keyof typeof resultsCopy];
  return {
    ...buildResolvedPageMetadata({ locale, pathname: '/results', title: copy.metaTitle, description: copy.metaDescription }),
    title: { absolute: copy.metaTitle },
  };
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
