import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { getPositioningCopy } from '@/lib/positioningCopy';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const positioning = getPositioningCopy(locale).critical;
  return {
    title: positioning.demoMetaTitle,
    description: positioning.demoMetaDescription,
  };
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
