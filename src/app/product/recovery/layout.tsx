import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getPositioningCopy } from '@/lib/positioningCopy';
import { resolveWebsiteLocale } from "@/lib/i18n";

type RecoveryMeta = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getPositioningCopy(locale).recovery;
  const c: RecoveryMeta = {
    title: `${copy.badge} - Sundae`,
    description: copy.description,
    openGraphTitle: `${copy.title} ${copy.titleAccent}`,
    openGraphDescription: copy.ctaDescription,
  };
  return {
    title: c.title,
    description: c.description,
    openGraph: { title: c.openGraphTitle, description: c.openGraphDescription },
  };
}

export default function RecoveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
