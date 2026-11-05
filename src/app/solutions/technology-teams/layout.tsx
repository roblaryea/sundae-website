import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_solutions_technology_teams_page";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildSolutionPageMetadata } from "@/lib/solutionPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSolutionPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/solutions/technology-teams",
    englishTitle: "Sundae for Tech and Data Leads - 12 Domains Unified, Out of the Box",
    englishDescription:
      "One governed operating picture across food-service systems, with public API, webhooks, RBAC, audit trails and evidence that stays attached to every recovery decision.",
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
