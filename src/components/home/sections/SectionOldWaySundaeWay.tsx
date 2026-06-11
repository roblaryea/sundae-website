"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SundaeWordmark } from "./SundaeWordmark";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_home_sections_SectionOldWaySundaeWay'

type LocalizedCopy = {
  eyebrow: string;
  headlinePre: string;
  headlinePost: string;
  oldWayLabel: string;
  sundaeWayLabel: string;
  oldWay: string[];
  sundaeWay: string[];
  oldWayCaption: string;
  sundaeWayCaption: string;
  replacesPrefix: string;
  replaces: string[];
  closing: string;
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedCopy> = {
  en: {
    eyebrow: "FROM REPORTING LAG & GUT FEEL — TO OPERATING SPEED & INFORMED DECISIONS",
    headlinePre: "Reports tell you what happened.",
    headlinePost: "tells you what to do next.",
    oldWayLabel: "The old way",
    sundaeWayLabel: "The Sundae way",
    oldWay: [
      "Export the numbers.",
      "Debate which dashboard is right.",
      "Ask an analyst.",
      "React after the week is gone.",
    ],
    sundaeWay: [
      "Detect the issue.",
      "Explain the cause.",
      "Compare the market.",
      "Act before the shift ends.",
    ],
    oldWayCaption: "By Friday's review meeting.",
    sundaeWayCaption: "By 11:14 Tuesday.",
    replacesPrefix: "Replaces the delay between data and action:",
    replaces: ["Excel exports", "POS dashboards", "BI dashboards", "analyst queue", "weekly review meetings"],
    closing: "Same data. Faster decision. Better action.",
  },
  ar: {
    eyebrow: "من تأخر التقارير إلى سرعة العمليات",
    headlinePre: "التقارير تخبرك بما حدث.",
    headlinePost: "يخبرك بما تفعله تالياً.",
    oldWayLabel: "الطريقة القديمة",
    sundaeWayLabel: "طريقة Sundae",
    oldWay: [
      "صدّر الأرقام.",
      "ناقش أي لوحة هي الصحيحة.",
      "اسأل محللاً.",
      "تفاعل بعد ضياع الأسبوع.",
    ],
    sundaeWay: [
      "اكتشف المشكلة.",
      "اشرح السبب.",
      "قارن السوق.",
      "اعمل قبل نهاية الوردية.",
    ],
    oldWayCaption: "بحلول اجتماع الجمعة.",
    sundaeWayCaption: "بحلول الثلاثاء 11:14.",
    replacesPrefix: "يستبدل التأخير بين البيانات والفعل:",
    replaces: ["تصديرات Excel", "لوحات POS", "لوحات BI", "طابور المحلل", "اجتماعات أسبوعية"],
    closing: "نفس البيانات. قرار أسرع. فعل أفضل.",
  },
  fr: {
    eyebrow: "DU RETARD DE REPORTING À LA VITESSE OPÉRATIONNELLE",
    headlinePre: "Les rapports vous disent ce qui s'est passé.",
    headlinePost: "vous dit quoi faire ensuite.",
    oldWayLabel: "L'ancienne méthode",
    sundaeWayLabel: "La méthode Sundae",
    oldWay: [
      "Exporter les chiffres.",
      "Débattre quel dashboard est juste.",
      "Demander à un analyste.",
      "Réagir après la fin de semaine.",
    ],
    sundaeWay: [
      "Détecter le problème.",
      "Expliquer la cause.",
      "Comparer le marché.",
      "Agir avant la fin du service.",
    ],
    oldWayCaption: "À la revue du vendredi.",
    sundaeWayCaption: "À 11h14 mardi.",
    replacesPrefix: "Remplace le délai entre données et action :",
    replaces: ["exports Excel", "dashboards POS", "dashboards BI", "file analyste", "réunions hebdomadaires"],
    closing: "Mêmes données. Décision plus rapide. Meilleure action.",
  },
  es: {
    eyebrow: "DEL RETRASO DEL REPORTING A LA VELOCIDAD OPERATIVA",
    headlinePre: "Los reportes te dicen lo que pasó.",
    headlinePost: "te dice qué hacer a continuación.",
    oldWayLabel: "La forma antigua",
    sundaeWayLabel: "La forma Sundae",
    oldWay: [
      "Exporta los números.",
      "Debate qué dashboard es el correcto.",
      "Pregunta a un analista.",
      "Reacciona después de que se fue la semana.",
    ],
    sundaeWay: [
      "Detecta el problema.",
      "Explica la causa.",
      "Compara el mercado.",
      "Actúa antes del cierre del turno.",
    ],
    oldWayCaption: "En la revisión del viernes.",
    sundaeWayCaption: "A las 11:14 del martes.",
    replacesPrefix: "Reemplaza el retraso entre datos y acción:",
    replaces: ["exportes Excel", "dashboards POS", "dashboards BI", "cola del analista", "reuniones semanales"],
    closing: "Mismos datos. Decisión más rápida. Mejor acción.",
  },
};

export function SectionOldWaySundaeWay() {
  const reduceMotion = useReducedMotion();
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;

  return (
    <section aria-labelledby="oldway-headline" className="relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="eyebrow mb-4">{copy.eyebrow}</div>
          <h2
            id="oldway-headline"
            className="section-h2 text-balance flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-2.5 gap-y-1.5"
          >
            <span>{copy.headlinePre}</span>
            <SundaeWordmark className="h-[0.72em] w-auto inline-block align-baseline translate-y-[0.02em] text-[var(--text-primary)]" />
            <span>{copy.headlinePost}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-4">
              {copy.oldWayLabel}
            </div>
            <ul className="space-y-2.5">
              {copy.oldWay.map((line, i) => (
                <motion.li
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.25, ease: "easeOut" }}
                  className="text-lg text-[var(--text-supporting)]"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-[var(--border-default)] text-sm text-[var(--text-muted)]">
              {copy.oldWayCaption}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--warm-coral)]/30 bg-gradient-to-br from-[var(--warm-coral)]/[0.10] to-[var(--warm-coral)]/[0.02] p-6 sm:p-8 shadow-[0_0_40px_rgba(255,92,77,0.12)]"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--warm-coral)] font-bold mb-4">
              {copy.sundaeWayLabel}
            </div>
            <ul className="space-y-2.5">
              {copy.sundaeWay.map((line, i) => (
                <motion.li
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.18, delay: 1.4 + i * 0.08, ease: "easeOut" }}
                  className="text-lg text-[var(--text-primary)] font-medium"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-[var(--warm-coral)]/20 text-sm text-[var(--text-secondary)]">
              {copy.sundaeWayCaption}
            </div>
          </motion.div>
        </div>

        <p className="mt-12 sm:mt-14 max-w-4xl mx-auto text-center text-sm sm:text-base text-[var(--text-supporting)]">
          <span className="font-semibold text-[var(--text-primary)]">{copy.replacesPrefix}</span>{" "}
          {copy.replaces.join(" · ")}
        </p>

        <p className="mt-10 sm:mt-12 text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light">
          {copy.closing}
        </p>
      </div>
    </section>
  );
}
