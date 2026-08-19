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
    title: "Profit Recovery and Decision Intelligence for Multi-Location Operators - Sundae Core",
    description:
      "Core reads POS, labour, cost and guest as one governed model, finds the margin leaking across them, gives each opportunity a named owner, and measures what actually came back.",
    openGraphTitle: "Sundae Core - The decision substrate",
    openGraphDescription:
      "One operating picture over the systems you already run. Find the money, give the work an owner, and prove what came back.",
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

export default function CoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
