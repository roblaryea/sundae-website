import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Why Sundae",
    description:
      "See why leading restaurant groups choose Sundae for Decision Intelligence — unified data, 4D insights, and real-time operational visibility.",
  },
  ar: {
    title: "لماذا Sundae",
    description:
      "اكتشف لماذا تختار مجموعات المطاعم الرائدة Sundae لذكاء القرار: بيانات موحدة، ورؤى رباعية الأبعاد، ووضوح تشغيلي لحظي.",
  },
  fr: {
    title: "Pourquoi Sundae",
    description:
      "Découvrez pourquoi les grands groupes de restauration choisissent Sundae pour la Decision Intelligence : données unifiées, insights 4D et visibilité opérationnelle en temps réel.",
  },
  es: {
    title: "Por qué Sundae",
    description:
      "Descubre por qué los principales grupos de restauración eligen Sundae para Decision Intelligence: datos unificados, insights 4D y visibilidad operativa en tiempo real.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  return copy[locale];
}

export default function WhySundaeLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
