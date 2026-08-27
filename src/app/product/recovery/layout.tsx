import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale, getLocalizedCopy, type RequiredEnglishLocalizedRecord } from "@/lib/i18n";

type RecoveryMeta = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
};

const copy: RequiredEnglishLocalizedRecord<RecoveryMeta> = {
  en: {
    title: "Profit Recovery - Find the Margin Leak, Fix It, and Prove the Money Back",
    description:
      "Sundae's closed loop detects margin leaks across labour, procurement, waste, delivery and menu pricing, routes each one to a single named owner, and measures the result against a baseline frozen before the work started. It will not call a saving recovered until it has been measured.",
    openGraphTitle: "Profit Recovery - Sundae",
    openGraphDescription:
      "Detect the leak, give it one owner, and prove what came back. The closed loop that refuses to claim a saving it has not measured.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const c = getLocalizedCopy(copy, locale);
  return {
    title: c.title,
    description: c.description,
    openGraph: { title: c.openGraphTitle, description: c.openGraphDescription },
  };
}

export default function RecoveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
