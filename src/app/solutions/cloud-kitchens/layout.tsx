import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_solutions_cloud_kitchens_page";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildSolutionPageMetadata } from "@/lib/solutionPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSolutionPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/solutions/cloud-kitchens",
    englishTitle: "Cloud Kitchen Software for Margin & Operations",
    englishDescription:
      "Cloud kitchen software for real margin by virtual brand, delivery platform, and kitchen, with commission, packaging, refund, and operating-performance intelligence.",
    generatedLocalCopy: generatedLocalCopy.localizedCopy,
  });
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
