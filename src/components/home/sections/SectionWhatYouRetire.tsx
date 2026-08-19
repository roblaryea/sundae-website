"use client";

import { motion } from "framer-motion";
import { useSettledReducedMotion as useReducedMotion } from "@/lib/useSettledReducedMotion";
import { FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_home_sections_SectionWhatYouRetire'

type LocalizedCopy = {
  eyebrow: string;
  headline: string;
  description: string;
  todaysStackLabel: string;
  withSundaeLabel: string;
  todaysStack: string[];
  withSundae: string[];
  closing: string;
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedCopy> = {
  en: {
    eyebrow: "WHAT YOU RETIRE",
    headline: "Your systems capture. BI explains. Neither decides.",
    description: "Generic BI was built for analysts. Sundae was built for the people accountable for the P&L.",
    todaysStackLabel: "Today's stack",
    withSundaeLabel: "With Sundae",
    todaysStack: [
      "Power BI / Tableau / Looker dashboards on POS exports",
      "Hand-built spreadsheets the team won't open",
      "Custom analyst queue for daily questions",
      "Six vendor portals open at once",
      "Weekly recap meetings instead of live action",
    ],
    withSundae: [
      "Six intelligence layers, operator-native",
      "500+ governed food-service data models",
      "Source-cited answers in seconds",
      "12 data domains unified in one ledger",
      "Live shift intelligence, not Friday recaps",
    ],
    closing: "One platform. Operator-native from day one.",
  },
  ar: {
    eyebrow: "ما تتقاعد عنه",
    headline: "أنظمتك تسجّل. وأدوات التحليل تشرح. ولا شيء منها يقرّر.",
    description: "BI العام صُمم للمحللين. Sundae صُمم لمن يتحمّل مسؤولية الأرباح والخسائر.",
    todaysStackLabel: "مكدس اليوم",
    withSundaeLabel: "مع Sundae",
    todaysStack: [
      "لوحات Power BI / Tableau / Looker على تصديرات POS",
      "جداول بيانات يدوية لا يفتحها الفريق",
      "طابور محلل لأسئلة يومية",
      "ستة بوابات موردين مفتوحة في آن",
      "اجتماعات أسبوعية بدل فعل حي",
    ],
    withSundae: [
      "ست طبقات ذكاء، مبنية لمشغّلي خدمات الطعام",
      "أكثر من 500 نموذج بيانات مطعم محكوم",
      "إجابات بمصادر في ثوانٍ",
      "12 مجال بيانات موحد في دفتر واحد",
      "ذكاء وردية حي لا تقارير الجمعة",
    ],
    closing: "منصة واحدة. مبنية للتشغيل من اليوم الأول.",
  },
  fr: {
    eyebrow: "CE QUE VOUS RETIREZ",
    headline: "Vos systemes enregistrent. La BI explique. Aucun ne decide.",
    description: "La BI generique a ete construite pour les analystes. Sundae a ete construit pour ceux qui repondent du compte de resultat.",
    todaysStackLabel: "La stack d'aujourd'hui",
    withSundaeLabel: "Avec Sundae",
    todaysStack: [
      "Dashboards Power BI / Tableau / Looker sur exports POS",
      "Tableurs faits à la main que l'équipe n'ouvre pas",
      "File d'attente analyste pour questions quotidiennes",
      "Six portails fournisseurs ouverts en même temps",
      "Réunions hebdo au lieu d'action live",
    ],
    withSundae: [
      "Six couches d'intelligence, natives exploitation",
      "500+ modeles de donnees restauration gouvernes",
      "Réponses sourcées en secondes",
      "12 domaines de données dans un seul livre",
      "Intelligence de service live, pas récap vendredi",
    ],
    closing: "Une plateforme. Native exploitation des le premier jour.",
  },
  es: {
    eyebrow: "QUÉ RETIRAS",
    headline: "Tus sistemas registran. El BI explica. Ninguno decide.",
    description: "La BI generica se construyo para analistas. Sundae se construyo para quienes responden por la cuenta de resultados.",
    todaysStackLabel: "Stack actual",
    withSundaeLabel: "Con Sundae",
    todaysStack: [
      "Dashboards Power BI / Tableau / Looker sobre exportes POS",
      "Hojas hechas a mano que el equipo no abre",
      "Cola de analistas para preguntas diarias",
      "Seis portales de proveedor abiertos a la vez",
      "Reuniones semanales en lugar de acción en vivo",
    ],
    withSundae: [
      "Seis capas de inteligencia, nativas para la operacion",
      "500+ modelos de datos de restauracion gobernados",
      "Respuestas con fuente en segundos",
      "12 dominios de datos unificados en un libro",
      "Inteligencia de turno en vivo, no recap del viernes",
    ],
    closing: "Una plataforma. Nativa para la operacion desde el dia uno.",
  },
};

export function SectionWhatYouRetire() {
  const reduceMotion = useReducedMotion();
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;

  return (
    <section aria-labelledby="retire-headline" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,92,77,0.04),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow mb-4">{copy.eyebrow}</p>
          <h2 id="retire-headline" className="section-h2 text-balance mb-5">{copy.headline}</h2>
          <p className="body-lg max-w-2xl mx-auto">{copy.description}</p>
        </FadeUp>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-7 sm:p-8"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-5">
              {copy.todaysStackLabel}
            </div>
            <ul className="space-y-3.5">
              {copy.todaysStack.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="inline-block w-1 h-1 rounded-full bg-[var(--text-faint)] flex-shrink-0 mt-2.5" />
                  <span className="text-[15px] text-[var(--text-muted)] line-through decoration-[var(--text-faint)] decoration-1 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center px-2">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF5C4D] to-[#E9A24A] flex items-center justify-center shadow-[0_0_30px_rgba(255,92,77,0.4)]"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--warm-coral)]/30 bg-gradient-to-br from-[var(--warm-coral)]/[0.10] to-[var(--warm-coral)]/[0.02] p-7 sm:p-8 shadow-[0_0_40px_rgba(255,92,77,0.10)]"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--warm-coral)] font-bold mb-5">
              {copy.withSundaeLabel}
            </div>
            <ul className="space-y-3.5">
              {copy.withSundae.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-[15px] text-[var(--text-primary)] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <p className="mt-12 sm:mt-14 text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light max-w-2xl mx-auto">
          {copy.closing}
        </p>
      </div>
    </section>
  );
}
