import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale, getLocalizedCopy, type RequiredEnglishLocalizedRecord } from "@/lib/i18n";

type PageMeta = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
};

const copy: RequiredEnglishLocalizedRecord<PageMeta> = {
  en: {
    title: "Multi-Country Payroll for Food Service - Sundae Crew Pay",
    description:
      "Crew Pay calculates gross to net across 36+ countries from versioned country packs, then produces the payslips, statutory filings and year-end forms each one expects - reviewed by your team before anyone is paid.",
    openGraphTitle: "Sundae Crew Pay - Payroll across 36+ countries",
    openGraphDescription:
      "Calculate gross to net, produce payslips and statutory filings, and close the month in every country you operate - or keep your provider and export to them.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const c = getLocalizedCopy(copy, locale);
  return {
    title: c.title,
    description: c.description,
    openGraph: { title: c.openGraphTitle, description: c.openGraphDescription },
    twitter: { title: c.openGraphTitle, description: c.openGraphDescription },
  };
}

export default function CrewPayrollLayout({ children }: { children: React.ReactNode }) {
  return children;
}
