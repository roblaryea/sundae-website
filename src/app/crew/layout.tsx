import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from '@/lib/i18n';
import { operatorNavigationCopy } from '@/content/operator-workflows/navigation';
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const brand = operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].brand;
  return {
    ...buildResolvedPageMetadata({ locale, pathname: '/crew', title: brand.crewMetaTitle, description: brand.crewDescription }),
    title: { absolute: brand.crewMetaTitle },
  };
}

export default function CrewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
