import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_crew_page";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildCrewPageMetadata } from "@/lib/crewPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  return buildCrewPageMetadata({
    locale,
    pathname: "/crew",
    englishTitle: "Workforce Operations, Scheduling, HR and Payroll - Sundae Crew",
    englishDescription:
      "Crew runs the people side of the operation: demand-aware scheduling, time and attendance, HR records, people intelligence and multi-country payroll readiness - or connects to the HR system you already run.",
    generatedLocalCopy: generatedLocalCopy.localizedCopy,
  });
}

export default function CrewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
