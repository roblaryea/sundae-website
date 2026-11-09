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
    englishTitle: "Restaurant Workforce and Operations Management Software - Sundae Crew",
    englishDescription:
      "Sundae Crew connects restaurant scheduling, task and approval workflows, shift communication, time and attendance, HR, tip workflows, payroll readiness and workforce intelligence for multi-location teams.",
    generatedLocalCopy: generatedLocalCopy.localizedCopy,
  });
}

export default function CrewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
