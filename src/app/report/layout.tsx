import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale, type WebsiteLocale } from "@/lib/i18n";

const reportMetadataByLocale: Record<
  WebsiteLocale,
  {
    title: string;
    description: string;
  }
> = {
  en: {
    title: "Sundae Report — Free Restaurant Benchmarking & POS Analytics",
    description:
      "Upload your POS data and get instant benchmarking against similar restaurants. Start free with Report Lite — no credit card required. See where you stand in minutes.",
  },
  ar: {
    title: "تقرير Sundae — مقارنة مرجعية مجانية وتحليلات POS للمطاعم",
    description:
      "ارفع بيانات POS الخاصة بك واحصل على مقارنة مرجعية فورية مع مطاعم مشابهة. ابدأ مجانًا مع Report Lite واعرف موقعك خلال دقائق.",
  },
  fr: {
    title: "Sundae Report — Benchmarking gratuit et analytics POS pour restaurants",
    description:
      "Importez vos données POS et obtenez un benchmark immédiat face à des restaurants comparables. Commencez gratuitement avec Report Lite et voyez où vous vous situez en quelques minutes.",
  },
  es: {
    title: "Sundae Report — Benchmarking gratuito y analítica POS para restaurantes",
    description:
      "Sube tus datos POS y obtén benchmarking inmediato frente a restaurantes similares. Empieza gratis con Report Lite y entiende tu posición en cuestión de minutos.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const metadata = reportMetadataByLocale[locale] ?? reportMetadataByLocale.en;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
