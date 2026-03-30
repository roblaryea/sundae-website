import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Cross-Intelligence — AI That Connects Every Part of Your Restaurant",
    description:
      "Sundae Cross-Intelligence links revenue, labor, marketing, and inventory signals to surface hidden correlations and actionable recommendations across your entire operation.",
  },
  ar: {
    title: "Cross-Intelligence — ذكاء اصطناعي يربط كل جزء من مطعمك",
    description:
      "يربط Sundae Cross-Intelligence إشارات الإيرادات والعمالة والتسويق والمخزون لإظهار الارتباطات الخفية والتوصيات القابلة للتنفيذ عبر كامل عملياتك.",
  },
  fr: {
    title: "Cross-Intelligence — L'IA qui relie chaque partie de votre restaurant",
    description:
      "Sundae Cross-Intelligence relie les signaux de revenus, de main-d'œuvre, de marketing et d'inventaire pour faire émerger des corrélations cachées et des recommandations actionnables dans toute votre opération.",
  },
  es: {
    title: "Cross-Intelligence — La IA que conecta cada parte de tu restaurante",
    description:
      "Sundae Cross-Intelligence conecta señales de ingresos, mano de obra, marketing e inventario para revelar correlaciones ocultas y recomendaciones accionables en toda tu operación.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  return copy[locale];
}

export default function CrossIntelligenceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
