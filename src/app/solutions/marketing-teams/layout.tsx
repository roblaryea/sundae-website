import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_solutions_marketing_teams_page";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildSolutionPageMetadata } from "@/lib/solutionPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSolutionPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/solutions/marketing-teams",
    englishTitle: "Sundae for Marketing Leads - Campaign Performance Signals in 24 Hours",
    englishDescription:
      "Campaign performance signals - covers, average check, channel mix, attribution - within 24 hours of activation. Re-allocate spend while the campaign is still running.",
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
