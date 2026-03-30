import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Sundae Watchtower — External Intelligence Engine for Restaurants",
    description:
      "AI-powered daily briefings, named competitor tracking, local event impact analysis, and market trend intelligence. The outside world, contextualized for your restaurant.",
    openGraphTitle: "Sundae Watchtower — External Intelligence Engine for Restaurants",
    openGraphDescription:
      "AI-powered daily briefings, named competitor tracking, local event impact analysis, and market trend intelligence.",
  },
  ar: {
    title: "Sundae Watchtower — محرك ذكاء خارجي للمطاعم",
    description:
      "إحاطات يومية مدعومة بالذكاء الاصطناعي، وتتبع منافسين محددين، وتحليل تأثير الفعاليات المحلية، وذكاء اتجاهات السوق. العالم الخارجي موضع في سياق مطعمك.",
    openGraphTitle: "Sundae Watchtower — محرك ذكاء خارجي للمطاعم",
    openGraphDescription:
      "إحاطات يومية مدعومة بالذكاء الاصطناعي، وتتبع منافسين محددين، وتحليل تأثير الفعاليات المحلية، وذكاء اتجاهات السوق.",
  },
  fr: {
    title: "Sundae Watchtower — Moteur d'intelligence externe pour les restaurants",
    description:
      "Briefings quotidiens pilotés par l'IA, suivi nominatif des concurrents, analyse de l'impact des événements locaux et intelligence de marché. Le monde extérieur, contextualisé pour votre restaurant.",
    openGraphTitle: "Sundae Watchtower — Moteur d'intelligence externe pour les restaurants",
    openGraphDescription:
      "Briefings quotidiens pilotés par l'IA, suivi nominatif des concurrents, analyse de l'impact des événements locaux et intelligence de marché.",
  },
  es: {
    title: "Sundae Watchtower — Motor de inteligencia externa para restaurantes",
    description:
      "Briefings diarios impulsados por IA, seguimiento nominal de competidores, análisis del impacto de eventos locales e inteligencia de tendencias del mercado. El mundo exterior, contextualizado para tu restaurante.",
    openGraphTitle: "Sundae Watchtower — Motor de inteligencia externa para restaurantes",
    openGraphDescription:
      "Briefings diarios impulsados por IA, seguimiento nominal de competidores, análisis del impacto de eventos locales e inteligencia de tendencias del mercado.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const page = copy[locale];
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.openGraphTitle,
      description: page.openGraphDescription,
    },
  };
}

export default function WatchtowerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
