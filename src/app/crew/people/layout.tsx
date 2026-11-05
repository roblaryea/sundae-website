import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_crew_people_page";
import { buildCrewPageMetadata } from "@/lib/crewPageMetadata";
import { resolveWebsiteLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return buildCrewPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/crew/people",
    englishTitle: "Hospitality HR and Workforce Management Software - Sundae Crew",
    englishDescription:
      "Manage recruiting, onboarding, employee records, documents, reviews, leave, HR requests and offboarding on one workforce record for every location.",
    generatedLocalCopy: generatedLocalCopy.copy,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
