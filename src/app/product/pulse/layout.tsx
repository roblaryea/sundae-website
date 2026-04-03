import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Sundae Pulse — Real-Time Intraday Operations Monitor for Restaurants",
    description:
      "Live sales pacing with adaptive AI targets, labor productivity tracking, server performance analytics, leakage monitoring, and AI shift coaching. The command center for every shift.",
    openGraphTitle: "Sundae Pulse — Real-Time Intraday Operations Monitor",
    openGraphDescription:
      "Live sales pacing with adaptive AI targets, labor productivity tracking, server performance analytics, leakage monitoring, and AI shift coaching.",
  },
  ar: {
    title: "Sundae Pulse — مراقبة تشغيلية لحظية داخل اليوم للمطاعم",
    description:
      "متابعة فورية لإيقاع المبيعات مع أهداف ذكاء اصطناعي تكيفية، وتتبع إنتاجية العمالة، وتحليلات أداء الطاقم، ومراقبة التسرب، وتوجيهات ذكية لكل وردية.",
    openGraphTitle: "Sundae Pulse — مراقبة تشغيلية لحظية داخل اليوم",
    openGraphDescription:
      "متابعة فورية لإيقاع المبيعات مع أهداف ذكاء اصطناعي تكيفية، وتتبع إنتاجية العمالة، وتحليلات أداء الطاقم، ومراقبة التسرب، وتوجيهات ذكية.",
  },
  fr: {
    title: "Sundae Pulse — Moniteur opérationnel intrajournalier en temps réel pour les restaurants",
    description:
      "Suivi live du rythme des ventes avec objectifs IA adaptatifs, productivité du travail, performance des serveurs, surveillance des pertes et coaching IA par shift. Le centre de commande de chaque service.",
    openGraphTitle: "Sundae Pulse — Moniteur opérationnel intrajournalier en temps réel",
    openGraphDescription:
      "Suivi live du rythme des ventes avec objectifs IA adaptatifs, productivité du travail, performance des serveurs, surveillance des pertes et coaching IA.",
  },
  es: {
    title: "Sundae Pulse — Monitor operativo intradía en tiempo real para restaurantes",
    description:
      "Seguimiento en vivo del ritmo de ventas con objetivos de IA adaptativos, productividad laboral, rendimiento del personal, monitorización de fugas y coaching de IA por turno. El centro de mando de cada servicio.",
    openGraphTitle: "Sundae Pulse — Monitor operativo intradía en tiempo real",
    openGraphDescription:
      "Seguimiento en vivo del ritmo de ventas con objetivos de IA adaptativos, productividad laboral, rendimiento del personal, monitorización de fugas y coaching de IA.",
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

export default function PulseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
