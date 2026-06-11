"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { SundaeWordmark } from "./SundaeWordmark";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_home_sections_SectionPersonaSwitcher'

/**
 * Section 2 - Persona Switcher (homepage-spec-v1.1).
 *
 * Conversion job: personalize by role. Six personas. Tab switching cross-fades
 * the content card and mockup so the buyer sees "their" view of Sundae within
 * 5 seconds of self-identifying.
 *
 * Reduced-motion fallback: instant content swap on tab change. No transition.
 *
 * Mockup mapping:
 *   COO         → PulseDashboardMockup (existing - live ops)
 *   CFO         → RevenueIntelligenceMockup (bespoke - Insights:Revenue, channel mix, variance)
 *   CEO         → IntelligenceChatMockup (existing - executive briefing)
 *   Marketing   → MarketingPerformanceMockup (bespoke - campaign ROI, channel mix)
 *   HR/People   → LaborOpsMockup (bespoke - labor variance, OT risk)
 *   Tech/Data   → IntegrationsHubMockup (bespoke - data health, sources)
 *
 * Claims used: CLM-401 through CLM-406 (all observational, APPROVED PUBLIC).
 */

/* Structure - stable IDs, real theme-aware screenshots, intel layer refs.
   Each `shot` is the live Sundae surface that matches that persona's outcome. */
const IMG = "/images/product/2026-fresh";
const personaStructure = [
  { id: "coo", intelLayers: ["Pulse", "Watchtower"], shot: { t: "pulse-sales", alt: "Pulse - live sales pacing: actual vs target, end-of-day projection, net sales and covers" } },
  { id: "cfo", intelLayers: ["Insights", "Foresight"], shot: { t: "insights-revenue", alt: "Revenue Intelligence - net revenue, average check, RevPASH, and covers with variance" } },
  { id: "ceo", intelLayers: ["Sundae Intelligence", "Benchmarks"], shot: { t: "intelligence", alt: "Sundae Intelligence - morning briefing with today's revenue, orders, and top-selling item" } },
  { id: "marketing", intelLayers: ["Insights", "Sundae Intelligence"], shot: { t: "marketing-channels", alt: "Marketing Intelligence - channel ROAS and spend efficiency frontier" } },
  { id: "hr", intelLayers: ["Pulse", "Insights"], shot: { t: "pulse-labor", alt: "Pulse - live labor productivity: sales per labor hour, labor cost %, and productivity index" } },
  { id: "tech", intelLayers: ["All layers"], shot: { t: "integrations", alt: "Data & Integrations - POS, labor, inventory, and delivery unified across governed connectors" } },
];

type LocalizedPersonaSwitcher = {
  eyebrow: string;
  headlineSee: string;
  headlineFor: string;
  todayLabel: string;
  withSundaeLabel: string;
  intelligencePrefix: string;
  ctaPrefix: string;
  ctaSuffix: string;
  personas: { shortLabel: string; pluralLabel: string; pain: string; painCopy: string; outcome: string; outcomeCopy: string }[];
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedPersonaSwitcher> = {
  en: {
    eyebrow: "ONE PLATFORM. EVERY ROLE.",
    headlineSee: "See",
    headlineFor: "for",
    todayLabel: "Today",
    withSundaeLabel: "With Sundae",
    intelligencePrefix: "Intelligence:",
    ctaPrefix: "See the",
    ctaSuffix: "demo →",
    personas: [
      { shortLabel: "COO", pluralLabel: "Operations Leaders", pain: "You can't be in every restaurant at once.", painCopy: "By the time the weekly recap lands, the bad shift is over and the margin is gone.", outcome: "Live visibility into every shift.", outcomeCopy: "Whether you're the GM on the floor or the COO over fifty outlets, Pulse shows which location needs help right now - pacing, labor, leakage, all updated through the shift." },
      { shortLabel: "CFO", pluralLabel: "Finance & FP&A Leads", pain: "Three days to close the books is three days too many.", painCopy: "Variance shows up in last month's P&L. By then the costs have already been booked.", outcome: "Margin variance, the day it happens.", outcomeCopy: "Shift-level labor cost, food cost variance, void rates - connected to the events that caused them. Close faster, explain more." },
      { shortLabel: "CEO", pluralLabel: "CEOs and Owners", pain: "Your worst location is invisible until Thursday's recap.", painCopy: "By the time you see it, three more days of margin have leaked.", outcome: "Portfolio truth, every morning.", outcomeCopy: "Daily AI briefings across every brand and location. Where you're winning, where you're leaking, what the market did to you, what to do today." },
      { shortLabel: "Marketing", pluralLabel: "Marketing Leads", pain: "By the time you measure the campaign, the budget is already spent.", painCopy: "ROI lands a week late. Next month's plan goes in before this month's data does.", outcome: "Campaign ROI, day-by-day.", outcomeCopy: "Tie campaign spend to covers, average check, and net margin - within 24 hours of activation. Re-allocate while the campaign is still running." },
      { shortLabel: "HR / People", pluralLabel: "HR and People Leads", pain: "Labor variance shows up too late.", painCopy: "Schedule changes happen on instinct. By the time the report comes back, the OT is already paid.", outcome: "Labor variance, in the moment.", outcomeCopy: "Pulse shows live labor% by location, server productivity, and overtime risk - by shift, not by month." },
      { shortLabel: "Tech", pluralLabel: "Tech and Data Leads", pain: "Twelve vendor APIs. Five data formats. Zero unified schema.", painCopy: "Every new dashboard request becomes a six-week integration project.", outcome: "One platform, twelve domains, zero plumbing.", outcomeCopy: "POS, labor, inventory, delivery, accounting, reservations - unified into 500 governed data models. RBAC, audit trails, public API, webhooks. Out of the box." },
    ],
  },
  ar: {
    eyebrow: "منصة واحدة. لكل دور.",
    headlineSee: "شاهد",
    headlineFor: "لـ",
    todayLabel: "اليوم",
    withSundaeLabel: "مع Sundae",
    intelligencePrefix: "الذكاء:",
    ctaPrefix: "شاهد عرض",
    ctaSuffix: "←",
    personas: [
      { shortLabel: "COO", pluralLabel: "قادة العمليات", pain: "لا يمكنك أن تكون في كل مطعم في آن واحد.", painCopy: "حين يصل ملخص الأسبوع، تكون الوردية السيئة انتهت والهامش ضاع.", outcome: "رؤية حية لكل وردية.", outcomeCopy: "سواء كنت مدير الفرع على الأرض أو الرئيس التنفيذي للعمليات على خمسين فرعاً، Pulse يُظهر أي موقع يحتاج المساعدة الآن - وتيرة، عمالة، تسرب، كل ذلك يتحدث عبر الوردية." },
      { shortLabel: "CFO", pluralLabel: "قادة المالية و FP&A", pain: "ثلاثة أيام لإغلاق الكتب - ثلاثة أيام كثيرة.", painCopy: "التباين يظهر في P&L الشهر الماضي. عندها تكون التكاليف قد سُجلت.", outcome: "تباين الهامش يوم حدوثه.", outcomeCopy: "تكلفة عمالة بمستوى الوردية، تباين تكلفة الطعام، معدلات التجاوز - مرتبطة بالأحداث المسببة." },
      { shortLabel: "CEO", pluralLabel: "الرؤساء التنفيذيون والمالكون", pain: "أسوأ موقع عندك مختفٍ حتى ملخص الخميس.", painCopy: "حين تراه، يكون ثلاثة أيام إضافية من الهامش قد تسرّبت.", outcome: "حقيقة المحفظة كل صباح.", outcomeCopy: "إحاطات يومية بالذكاء الاصطناعي عبر كل علامة وموقع. أين تربح، أين تتسرب، ما فعله السوق، ما تفعله اليوم." },
      { shortLabel: "التسويق", pluralLabel: "قادة التسويق", pain: "حين تقيس الحملة، الميزانية مُنفقة.", painCopy: "ROI يصل متأخراً أسبوعاً. خطة الشهر التالي تنطلق قبل بيانات هذا الشهر.", outcome: "ROI حملة يوماً بيوم.", outcomeCopy: "اربط إنفاق الحملة بالضيوف ومتوسط الفاتورة وصافي الهامش - خلال 24 ساعة من التفعيل. أعد التوزيع وهي تعمل." },
      { shortLabel: "الموارد البشرية", pluralLabel: "قادة الموارد البشرية", pain: "تباين العمالة يظهر متأخراً.", painCopy: "تغييرات الجدول تحدث بالحدس. حين يعود التقرير، تكون OT قد دُفعت.", outcome: "تباين العمالة في اللحظة.", outcomeCopy: "Pulse يُظهر نسبة عمالة حية بالموقع، إنتاجية الموظفين، وخطر OT - بالوردية لا بالشهر." },
      { shortLabel: "التقنية", pluralLabel: "قادة التقنية والبيانات", pain: "اثنا عشر API. خمس صيغ بيانات. صفر مخطط موحد.", painCopy: "كل طلب لوحة جديدة يصبح مشروع تكامل ستة أسابيع.", outcome: "منصة واحدة، اثنا عشر مجالاً، صفر سباكة.", outcomeCopy: "POS، عمالة، مخزون، توصيل، محاسبة، حجوزات - موحدة في 500 نموذج بيانات محكوم. RBAC، تتبع، API عامة، webhooks. جاهزة من الصندوق." },
    ],
  },
  fr: {
    eyebrow: "UNE PLATEFORME. CHAQUE RÔLE.",
    headlineSee: "Voyez",
    headlineFor: "pour",
    todayLabel: "Aujourd'hui",
    withSundaeLabel: "Avec Sundae",
    intelligencePrefix: "Intelligence :",
    ctaPrefix: "Voir la démo",
    ctaSuffix: "→",
    personas: [
      { shortLabel: "COO", pluralLabel: "Responsables opérations", pain: "Vous ne pouvez pas être partout à la fois.", painCopy: "Quand le récap hebdo arrive, le service raté est fini et la marge est partie.", outcome: "Visibilité live sur chaque service.", outcomeCopy: "Que vous soyez le directeur sur le terrain ou le COO de cinquante points de vente, Pulse montre quel site a besoin d'aide en ce moment - cadence, main-d'œuvre, fuites, le tout mis à jour pendant le service." },
      { shortLabel: "CFO", pluralLabel: "Responsables finance & FP&A", pain: "Trois jours pour fermer les livres - trois jours de trop.", painCopy: "La variance apparaît dans le P&L du mois passé. Les coûts sont déjà passés.", outcome: "Variance de marge le jour même.", outcomeCopy: "Coût main-d'œuvre par service, variance coût matière, taux d'annulation - connectés aux événements qui les ont causés." },
      { shortLabel: "CEO", pluralLabel: "Dirigeants et propriétaires", pain: "Votre pire site est invisible jusqu'au récap du jeudi.", painCopy: "Quand vous le voyez, trois jours de marge supplémentaires ont fui.", outcome: "Vérité portefeuille chaque matin.", outcomeCopy: "Briefings IA quotidiens sur chaque marque et site. Où vous gagnez, où vous fuyez, ce que le marché vous a fait, quoi faire aujourd'hui." },
      { shortLabel: "Marketing", pluralLabel: "Responsables marketing", pain: "Quand vous mesurez, le budget est déjà dépensé.", painCopy: "Le ROI arrive en retard d'une semaine. Le plan du mois suivant part avant les données.", outcome: "ROI de campagne au jour le jour.", outcomeCopy: "Reliez la dépense aux couverts, ticket moyen et marge nette - en 24 heures. Réallouez pendant que la campagne tourne." },
      { shortLabel: "RH", pluralLabel: "Responsables RH & People", pain: "La variance main-d'œuvre arrive trop tard.", painCopy: "Les plannings changent à l'instinct. Quand le rapport revient, les heures sup sont déjà payées.", outcome: "Variance main-d'œuvre dans l'instant.", outcomeCopy: "Pulse montre le % main-d'œuvre live par site, productivité serveurs et risque heures sup - par service, pas par mois." },
      { shortLabel: "Tech", pluralLabel: "Responsables Tech & Data", pain: "Douze API. Cinq formats. Aucun schéma unifié.", painCopy: "Chaque nouveau dashboard devient un projet de six semaines.", outcome: "Une plateforme, douze domaines, zéro plomberie.", outcomeCopy: "POS, main-d'œuvre, stocks, livraison, comptabilité, réservations - unifiés dans 500 modèles gouvernés. RBAC, audit, API publique, webhooks. Prêts à l'emploi." },
    ],
  },
  es: {
    eyebrow: "UNA PLATAFORMA. CADA ROL.",
    headlineSee: "Ver",
    headlineFor: "para",
    todayLabel: "Hoy",
    withSundaeLabel: "Con Sundae",
    intelligencePrefix: "Inteligencia:",
    ctaPrefix: "Ver demo de",
    ctaSuffix: "→",
    personas: [
      { shortLabel: "COO", pluralLabel: "Líderes de operaciones", pain: "No puedes estar en todos los restaurantes a la vez.", painCopy: "Cuando llega el recap semanal, el turno malo acabó y el margen se fue.", outcome: "Visibilidad en vivo de cada turno.", outcomeCopy: "Ya seas el gerente en el local o el COO de cincuenta sucursales, Pulse te muestra qué local necesita ayuda ahora mismo - ritmo, personal, fugas, todo actualizado durante el turno." },
      { shortLabel: "CFO", pluralLabel: "Líderes de finanzas y FP&A", pain: "Tres días para cerrar libros - tres días de más.", painCopy: "La varianza aparece en el P&L del mes pasado. Los costes ya están registrados.", outcome: "Varianza de margen el día que ocurre.", outcomeCopy: "Coste de personal por turno, varianza de coste alimentos, tasas de anulación - conectados a los eventos que los causaron." },
      { shortLabel: "CEO", pluralLabel: "CEOs y propietarios", pain: "Tu peor local es invisible hasta el recap del jueves.", painCopy: "Cuando lo ves, tres días más de margen se han fugado.", outcome: "Verdad del portafolio cada mañana.", outcomeCopy: "Briefings de IA diarios en cada marca y local. Dónde ganas, dónde fugas, qué hizo el mercado, qué hacer hoy." },
      { shortLabel: "Marketing", pluralLabel: "Líderes de marketing", pain: "Cuando mides, el presupuesto ya se gastó.", painCopy: "El ROI llega una semana tarde. El plan del próximo mes arranca antes que los datos.", outcome: "ROI de campaña día a día.", outcomeCopy: "Liga el gasto a cubiertos, ticket medio y margen neto - en 24 horas. Reasigna mientras la campaña corre." },
      { shortLabel: "RR.HH.", pluralLabel: "Líderes de RR.HH. & People", pain: "La varianza de personal aparece demasiado tarde.", painCopy: "Los cambios de horario por instinto. Cuando vuelve el reporte, las horas extras ya se pagaron.", outcome: "Varianza de personal en el momento.", outcomeCopy: "Pulse muestra % personal en vivo por local, productividad de meseros y riesgo de horas extras - por turno, no por mes." },
      { shortLabel: "Tech", pluralLabel: "Líderes de Tech y Data", pain: "Doce APIs. Cinco formatos. Cero esquema unificado.", painCopy: "Cada solicitud de dashboard se vuelve un proyecto de seis semanas.", outcome: "Una plataforma, doce dominios, cero plomería.", outcomeCopy: "POS, personal, inventario, delivery, contabilidad, reservas - unificados en 500 modelos gobernados. RBAC, auditoría, API pública, webhooks. Listos." },
    ],
  },
};

export function SectionPersonaSwitcher() {
  const reduceMotion = useReducedMotion();
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const active = copy.personas[activeIdx];
  const activeStructure = personaStructure[activeIdx];

  return (
    <section
      aria-labelledby="persona-headline"
      className="relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="eyebrow mb-4">{copy.eyebrow}</div>
          <h2
            id="persona-headline"
            className="section-h2 text-balance flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1.5"
          >
            <span>{copy.headlineSee}</span>
            <SundaeWordmark className="h-[0.72em] w-auto inline-block align-baseline translate-y-[0.02em] text-[var(--text-primary)]" />
            <span>{copy.headlineFor}</span>
            <span className="text-[var(--warm-coral)]">
              {active.pluralLabel}.
            </span>
          </h2>
        </div>

        {/* Tab list */}
        <div
          role="tablist"
          aria-label="Choose your role"
          className="flex flex-nowrap sm:flex-wrap sm:justify-center gap-2 mb-10 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-pl-4 snap-x snap-mandatory sm:snap-none [&>button]:snap-start"
        >
          {copy.personas.map((p, i) => {
            const s = personaStructure[i];
            const isActive = i === activeIdx;
            return (
              <button
                key={s.id}
                role="tab"
                type="button"
                id={`persona-tab-${s.id}`}
                aria-selected={isActive}
                aria-controls={`persona-panel-${s.id}`}
                onClick={() => setActiveIdx(i)}
                className={`
                  px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold
                  whitespace-nowrap transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warm-coral)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--navy-deep)]
                  ${
                    isActive
                      ? "bg-[var(--warm-coral)] text-white shadow-[0_0_20px_rgba(255,92,77,0.4)]"
                      : "bg-[var(--surface-subtle)] border border-[var(--border-default)] text-[var(--text-supporting)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] hover:border-[var(--border-emphasis)]"
                  }
                `}
              >
                {p.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div
          role="tabpanel"
          id={`persona-panel-${activeStructure.id}`}
          aria-labelledby={`persona-tab-${activeStructure.id}`}
          className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] gap-8 lg:gap-12 items-center max-w-7xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeStructure.id}-card`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8 lg:p-10"
            >
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-2">
                {copy.todayLabel}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight mb-2">
                {active.pain}
              </h3>
              <p className="body-base mb-6">{active.painCopy}</p>

              <div className="pt-5 border-t border-[var(--border-default)]">
                <div className="text-[11px] uppercase tracking-wider text-[var(--warm-coral)] font-bold mb-2">
                  {copy.withSundaeLabel}
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] leading-tight mb-2">
                  {active.outcome}
                </h4>
                <p className="body-base mb-5">{active.outcomeCopy}</p>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                    {copy.intelligencePrefix}
                  </span>
                  {activeStructure.intelLayers.map((layer) => (
                    <span
                      key={layer}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[var(--warm-coral)]/15 text-[var(--warm-coral)] border border-[var(--warm-coral)]/25"
                    >
                      {layer}
                    </span>
                  ))}
                </div>

                <Button href="/demo" variant="primary" size="md">
                  {copy.ctaPrefix} {active.shortLabel} {copy.ctaSuffix}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeStructure.id}-mock`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ThemedShot
                framed
                width={1600}
                height={1000}
                dark={`${IMG}/${activeStructure.shot.t}-dark.png`}
                light={`${IMG}/${activeStructure.shot.t}.png`}
                alt={activeStructure.shot.alt}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
