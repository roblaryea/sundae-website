import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Getting Started",
    description:
      "Get up and running with Sundae in minutes. Start free with Report Lite, connect your POS data, and see instant benchmarking against restaurants like yours.",
  },
  ar: {
    title: "البدء",
    description:
      "ابدأ مع Sundae خلال دقائق. ابدأ مجاناً مع Report Lite، واربط بيانات نقاط البيع لديك، واحصل على مقارنات فورية مع مطاعم مشابهة لمطعمك.",
  },
  fr: {
    title: "Bien démarrer",
    description:
      "Lancez-vous avec Sundae en quelques minutes. Commencez gratuitement avec Report Lite, connectez vos données POS et obtenez instantanément des benchmarks comparés à des restaurants comme le vôtre.",
  },
  es: {
    title: "Primeros pasos",
    description:
      "Empieza con Sundae en minutos. Comienza gratis con Report Lite, conecta tus datos de POS y obtén benchmarking instantáneo frente a restaurantes como el tuyo.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  return copy[locale];
}

export default function GettingStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
