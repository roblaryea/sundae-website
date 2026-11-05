import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getPositioningCopy } from '@/lib/positioningCopy';
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildResolvedPageMetadata } from "@/lib/solutionPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getPositioningCopy(locale).critical;
  return buildResolvedPageMetadata({
    locale,
    pathname: "/solutions/c-suite-executives",
    title: copy.cSuiteMetaTitle,
    description: copy.cSuiteMetaDescription,
  });
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
