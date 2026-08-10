import type { Metadata } from "next";
import { cookies } from "next/headers";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_getting_started_layout'

const copy = {
  en: {
    title: "Getting Started",
    description:
      "How a Sundae rollout actually runs: size a Core package against your locations, connect your POS and labor systems, and start acting on the numbers within the first month.",
  },
  ar: {
    title: "البدء",
    description:
      "كيف يسير تطبيق Sundae فعليًا: اختر باقة Core المناسبة لعدد مواقعك، اربط أنظمة نقاط البيع والعمالة، وابدأ التصرف بناءً على الأرقام خلال الشهر الأول.",
  },
  fr: {
    title: "Bien démarrer",
    description:
      "Comment se déroule réellement un déploiement Sundae : dimensionnez un package Core selon vos sites, connectez vos systèmes POS et main-d'oeuvre, et agissez sur les chiffres dès le premier mois.",
  },
  es: {
    title: "Primeros pasos",
    description:
      "Cómo funciona realmente una implantación de Sundae: dimensiona un paquete Core según tus locales, conecta tus sistemas de POS y personal, y empieza a actuar sobre los números en el primer mes.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  return copy[locale as keyof typeof copy] ?? getGeneratedLocalCopy(copy, generatedLocalCopy.copy, locale) ?? copy.en;
}

export default function GettingStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
