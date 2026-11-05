import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_crew_time_attendance_page";
import { buildCrewPageMetadata } from "@/lib/crewPageMetadata";
import { resolveWebsiteLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return buildCrewPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/crew/time-attendance",
    englishTitle: "Hospitality Time and Attendance Software - Sundae Crew",
    englishDescription:
      "Mobile clock-in, on-site verification, break records, manager sign-off and payroll-ready hours for multi-location restaurant and hospitality teams.",
    generatedLocalCopy: generatedLocalCopy.copy,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
