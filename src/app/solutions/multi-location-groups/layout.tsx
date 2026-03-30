import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Multi-Location Restaurant Groups — Unified Intelligence Across Every Site",
    description:
      "Sundae gives multi-location restaurant operators a single view of performance across all sites — benchmark locations, spot outliers, and standardize what works.",
  },
  ar: {
    title: "مجموعات المطاعم متعددة المواقع — ذكاء موحد عبر كل موقع",
    description:
      "يمنح Sundae مشغلي المطاعم متعددة المواقع رؤية واحدة للأداء عبر جميع المواقع، مع مقارنة الفروع، واكتشاف الشذوذ، وتوحيد ما ينجح.",
  },
  fr: {
    title: "Groupes de restaurants multi-sites — Intelligence unifiée sur chaque site",
    description:
      "Sundae offre aux opérateurs multi-sites une vue unique des performances sur tous les établissements : benchmark des sites, détection des anomalies et standardisation de ce qui fonctionne.",
  },
  es: {
    title: "Grupos de restaurantes multiubicación — Inteligencia unificada en cada local",
    description:
      "Sundae ofrece a los operadores multiubicación una visión única del rendimiento en todos los locales: benchmarking entre ubicaciones, detección de anomalías y estandarización de lo que funciona.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  return copy[locale];
}

export default function MultiLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
