import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Sundae Core — Unified Restaurant Analytics & Decision Intelligence",
    description:
      "Interactive dashboards, cross-module analytics, and AI-powered insights that unify POS, labor, inventory, and marketing data into one operating layer for restaurants.",
  },
  ar: {
    title: "Sundae Core — تحليلات موحدة وذكاء قرار للمطاعم",
    description:
      "لوحات معلومات تفاعلية، وتحليلات عابرة للوحدات، ورؤى مدعومة بالذكاء الاصطناعي توحد بيانات نقاط البيع والعمالة والمخزون والتسويق في طبقة تشغيلية واحدة للمطاعم.",
  },
  fr: {
    title: "Sundae Core — Analytics unifiés & Decision Intelligence pour les restaurants",
    description:
      "Des tableaux de bord interactifs, des analytics inter-modules et des insights IA qui unifient les données POS, main-d'œuvre, inventaire et marketing dans une seule couche opérationnelle pour les restaurants.",
  },
  es: {
    title: "Sundae Core — Analítica unificada e inteligencia de decisión para restaurantes",
    description:
      "Paneles interactivos, analítica transversal e insights impulsados por IA que unifican datos de POS, mano de obra, inventario y marketing en una sola capa operativa para restaurantes.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  return copy[locale];
}

export default function CanvasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
