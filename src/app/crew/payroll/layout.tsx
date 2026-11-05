import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_crew_payroll_page";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildCrewPageMetadata } from "@/lib/crewPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  return buildCrewPageMetadata({
    locale,
    pathname: "/crew/payroll",
    englishTitle: "Multi-Country Payroll for Food Service - Sundae Crew Pay",
    englishDescription:
      "Crew Pay calculates gross to net across 36+ countries from versioned country packs, then produces payslips, statutory files and year-end forms for team review before payment or provider handoff.",
    generatedLocalCopy: generatedLocalCopy.copy,
  });
}

export default function CrewPayrollLayout({ children }: { children: React.ReactNode }) {
  return children;
}
