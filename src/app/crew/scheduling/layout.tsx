import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_crew_scheduling_page";
import { buildCrewPageMetadata } from "@/lib/crewPageMetadata";
import { resolveWebsiteLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return buildCrewPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/crew/scheduling",
    englishTitle: "Restaurant and Hospitality Staff Scheduling Software - Sundae Crew",
    englishDescription:
      "Build demand-aware staff schedules with AI, availability and eligibility checks, shift swaps, manager approvals and mobile schedules for restaurant and hospitality teams.",
    generatedLocalCopy: generatedLocalCopy.copy,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
