import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_solutions_page";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildSolutionPageMetadata } from "@/lib/solutionPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSolutionPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/solutions",
    englishTitle: "Solutions",
    englishDescription:
      "Sundae for every role and every restaurant shape - operations, finance, marketing, c-suite, technology, HR, multi-location, franchises, cloud kitchens, and hospitality groups.",
    generatedLocalCopy: generatedLocalCopy.localizedCopy,
  });
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
