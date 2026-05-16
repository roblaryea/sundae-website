"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

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
    headline: "Replace the restaurant BI stack.",
    description: "Generic BI was built for analysts. Sundae was built for the people running restaurants.",
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
      "Six intelligence layers, restaurant-native",
      "179+ governed restaurant data models",
      "Source-cited answers in seconds",
      "12 data domains unified in one ledger",
      "Live shift intelligence, not Friday recaps",
    ],
    closing: "One platform. Restaurant-native from day one.",
  },
  ar: {
    eyebrow: "ما تتقاعد عنه",
    headline: "استبدل مكدس BI للمطاعم.",
    description: "BI العام صُمم للمحللين. Sundae صُمم لمن يدير المطاعم.",
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
      "ست طبقات ذكاء، أصيلة للمطاعم",
      "أكثر من 179 نموذج بيانات مطعم محكوم",
      "إجابات بمصادر في ثوانٍ",
      "12 مجال بيانات موحد في دفتر واحد",
      "ذكاء وردية حي لا تقارير الجمعة",
    ],
    closing: "منصة واحدة. أصيلة للمطاعم من اليوم الأول.",
  },
  fr: {
    eyebrow: "CE QUE VOUS RETIREZ",
    headline: "Remplacez la stack BI restaurant.",
    description: "La BI générique a été construite pour les analystes. Sundae a été construit pour ceux qui font tourner les restaurants.",
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
      "Six couches d'intelligence, natives restaurant",
      "179+ modèles de données restaurant gouvernés",
      "Réponses sourcées en secondes",
      "12 domaines de données dans un seul livre",
      "Intelligence de service live, pas récap vendredi",
    ],
    closing: "Une plateforme. Native restaurant dès le premier jour.",
  },
  es: {
    eyebrow: "QUÉ RETIRAS",
    headline: "Reemplaza la stack BI de restaurantes.",
    description: "La BI genérica se construyó para analistas. Sundae se construyó para quienes operan restaurantes.",
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
      "Seis capas de inteligencia, nativas para restaurantes",
      "179+ modelos de datos de restaurante gobernados",
      "Respuestas con fuente en segundos",
      "12 dominios de datos unificados en un libro",
      "Inteligencia de turno en vivo, no recap del viernes",
    ],
    closing: "Una plataforma. Nativa para restaurantes desde el día uno.",
  },
};

export function SectionWhatYouRetire() {
  const reduceMotion = useReducedMotion();
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;

  return (
    <section aria-labelledby="retire-headline" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.04),transparent_60%)]" />

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
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C47FF] to-[#3B82F6] flex items-center justify-center shadow-[0_0_30px_rgba(28,71,255,0.4)]"
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
            className="rounded-2xl border border-[var(--electric-blue)]/30 bg-gradient-to-br from-[var(--electric-blue)]/[0.10] to-[var(--electric-blue)]/[0.02] p-7 sm:p-8 shadow-[0_0_40px_rgba(28,71,255,0.10)]"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-5">
              {copy.withSundaeLabel}
            </div>
            <ul className="space-y-3.5">
              {copy.withSundae.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
