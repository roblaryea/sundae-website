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
    title: "Workforce Operations, Scheduling, HR and Payroll - Sundae Crew",
    description:
      "Crew runs the people side of the operation: demand-aware scheduling, time and attendance, HR records, people intelligence and native multi-country payroll - or connects to the HR system you already run.",
    openGraphTitle: "Sundae Crew - The workforce substrate",
    openGraphDescription:
      "Scheduling, time and attendance, HR and payroll on one workforce record. Every shift planned becomes signal the intelligence layer reasons over.",
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

export default function CrewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
