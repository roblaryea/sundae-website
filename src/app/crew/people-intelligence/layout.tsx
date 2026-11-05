import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_crew_people_intelligence_page";
import { buildCrewPageMetadata } from "@/lib/crewPageMetadata";
import { resolveWebsiteLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return buildCrewPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/crew/people-intelligence",
    englishTitle: "Hospitality Workforce Intelligence Software - Sundae Crew",
    englishDescription:
      "Connect schedules, attendance, payroll and people activity with sales and demand to understand workforce health, no-show risk, overtime and real labor cost.",
    generatedLocalCopy: generatedLocalCopy.copy,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
