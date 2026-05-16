"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

/**
 * Section 6 — 4D Intelligence Model (homepage-spec-v1.1, polish r4 refactor).
 *
 * Conversion job: explain product. ONE concrete operational scenario unfolds
 * across four dimensions (What happened → Plan vs actual → Market context →
 * What's next), demonstrating Sundae's cross-dimensional reasoning.
 *
 * Polish r4 changes (vs r1 GSAP-pinned implementation):
 *   - Removed GSAP ScrollTrigger and the h-screen pin (was creating dead space
 *     and overstating section weight without adding clarity)
 *   - Added explicit section signposting — buyer now knows it's the "4D
 *     Intelligence Model" and what dimensions to expect before content starts
 *   - Auto-cycle every 5.5s with hover/click pause — section is alive without
 *     scroll dependency
 *   - Dimension eyebrows promoted to global eyebrow class (now 13/14/15px
 *     responsive) for proper hierarchy
 *   - Visibly labeled as illustrative (mandatory CLM-501 disclosure)
 *
 * Hydration: same DOM in all paths. activeIdx starts at 0 server + first
 * client render. The auto-cycle interval only runs after mount.
 */

type LocalizedFourD = {
  eyebrow: string;
  headline: string;
  description: string;
  scenarioTime: string;
  scenarioHook: string;
  illustrativeNote: string;
  closing: string;
  dimensions: { shortLabel: string; eyebrow: string; title: string; body: string }[];
  visualHeader: string;
  visualLabels: {
    coversChart: string;
    coversTrend: string;
    planVsActual: string;
    planVsActualVariance: string;
    forecast: string;
    actualRunRate: string;
    laborNote: string;
    watchtower: string;
    watchtowerItem1: string;
    watchtowerItem2: string;
    coach: string;
    coachBody: string;
    coachProjection: string;
    illustrative: string;
  };
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedFourD> = {
  en: {
    eyebrow: "THE 4D INTELLIGENCE MODEL",
    headline: "Watch one revenue problem become a decision.",
    description: "Sundae connects performance, plan, market context, and next action — so teams can move before the shift is over.",
    scenarioTime: "TUESDAY · 9:14 AM · DOWNTOWN",
    scenarioHook: "Lunch revenue is pacing 14% behind plan.",
    illustrativeNote: "Illustrative scenario based on Sundae capabilities.",
    closing: "From signal to cause to action — before the shift ends.",
    dimensions: [
      { shortLabel: "What happened", eyebrow: "WHAT HAPPENED", title: "Covers are down 22%.", body: "Average check is steady, so the issue is traffic — not pricing." },
      { shortLabel: "Plan vs actual", eyebrow: "PLAN VS ACTUAL", title: "The location is $3,800 behind forecast.", body: "Labor is still staffed to baseline, so margin is eroding by the hour." },
      { shortLabel: "Market context", eyebrow: "MARKET CONTEXT", title: "The market explains the gap.", body: "Nearby competitors dropped lunch combos, and a local office event is reducing foot traffic." },
      { shortLabel: "Next action", eyebrow: "NEXT ACTION", title: "Sundae Coach recommends the next move.", body: "Adjust labor if coverage allows, push the lunch offer, and give the team a chance to recover part of the gap before peak ends." },
    ],
    visualHeader: "Pulse — Downtown · Lunch Service",
    visualLabels: {
      coversChart: "Lunch covers — today vs same day last week",
      coversTrend: "−22% WoW",
      planVsActual: "Plan vs actual",
      planVsActualVariance: "−$3,800 vs forecast",
      forecast: "Forecast",
      actualRunRate: "Actual run-rate",
      laborNote: "Labor still on baseline — overstaffed for this volume.",
      watchtower: "Watchtower",
      watchtowerItem1: "3 competitors within 2km dropped lunch combos to $9.99 yesterday",
      watchtowerItem2: "Office-tower fire drill scheduled 11–12, 2 blocks away",
      coach: "Sundae Coach",
      coachBody: "Adjust one line-cook shift from 11–2 if coverage allows. Push the $11.99 lunch combo via loyalty.",
      coachProjection: "Projected impact: recover part of the gap if executed before lunch peak.",
      illustrative: "Illustrative",
    },
  },
  ar: {
    eyebrow: "نموذج الذكاء رباعي الأبعاد",
    headline: "شاهد مشكلة إيرادات واحدة تتحول إلى قرار.",
    description: "Sundae يربط الأداء والخطة وسياق السوق والخطوة التالية — فتستطيع الفِرَق التحرك قبل نهاية الوردية.",
    scenarioTime: "الثلاثاء · 9:14 صباحاً · وسط المدينة",
    scenarioHook: "إيرادات الغداء تتأخر 14% خلف الخطة.",
    illustrativeNote: "سيناريو توضيحي بناءً على قدرات Sundae.",
    closing: "من إشارة إلى سبب إلى فعل — قبل نهاية الوردية.",
    dimensions: [
      { shortLabel: "ما حدث", eyebrow: "ما حدث", title: "الضيوف انخفضوا 22%.", body: "متوسط الفاتورة ثابت، فالمشكلة في حركة الزبائن — لا التسعير." },
      { shortLabel: "الخطة مقابل الفعلي", eyebrow: "الخطة مقابل الفعلي", title: "الموقع يتأخر 3,800$ عن التوقع.", body: "العمالة ما زالت على الأساس، فالهامش يتآكل بالساعة." },
      { shortLabel: "سياق السوق", eyebrow: "سياق السوق", title: "السوق يفسر الفجوة.", body: "المنافسون القريبون خفضوا كومبو الغداء، وحدث مكتبي محلي يقلل حركة المرور." },
      { shortLabel: "الفعل التالي", eyebrow: "الفعل التالي", title: "Sundae Coach يوصي بالخطوة التالية.", body: "اضبط العمالة إن سمحت التغطية، اعرض الغداء، وامنح الفريق فرصة لاستعادة جزء من الفجوة قبل ذروة الغداء." },
    ],
    visualHeader: "Pulse — وسط المدينة · خدمة الغداء",
    visualLabels: {
      coversChart: "ضيوف الغداء — اليوم مقابل نفس اليوم الأسبوع الماضي",
      coversTrend: "−22% أسبوعياً",
      planVsActual: "الخطة مقابل الفعلي",
      planVsActualVariance: "−3,800$ عن التوقع",
      forecast: "التوقع",
      actualRunRate: "المعدل الفعلي",
      laborNote: "العمالة ما زالت على الأساس — زائدة لهذا الحجم.",
      watchtower: "Watchtower",
      watchtowerItem1: "3 منافسين ضمن 2 كم خفضوا كومبو الغداء إلى 9.99$ أمس",
      watchtowerItem2: "تدريب حريق في برج مكاتب مجدول 11–12، على بُعد كتلتين",
      coach: "Sundae Coach",
      coachBody: "اضبط وردية طاهي خط واحدة من 11–2 إن سمحت التغطية. اعرض كومبو الغداء بـ 11.99$ عبر الولاء.",
      coachProjection: "الأثر المتوقع: استعادة جزء من الفجوة إذا نُفذ قبل ذروة الغداء.",
      illustrative: "توضيحي",
    },
  },
  fr: {
    eyebrow: "LE MODÈLE D'INTELLIGENCE 4D",
    headline: "Regardez un problème de revenu devenir une décision.",
    description: "Sundae connecte performance, plan, contexte marché et action suivante — pour que les équipes bougent avant la fin du service.",
    scenarioTime: "MARDI · 9H14 · CENTRE-VILLE",
    scenarioHook: "Le revenu déjeuner est à 14% en dessous du plan.",
    illustrativeNote: "Scénario illustratif basé sur les capacités Sundae.",
    closing: "Du signal à la cause à l'action — avant la fin du service.",
    dimensions: [
      { shortLabel: "Ce qui s'est passé", eyebrow: "CE QUI S'EST PASSÉ", title: "Les couverts ont baissé de 22%.", body: "Le ticket moyen est stable, le problème c'est le trafic — pas le prix." },
      { shortLabel: "Plan vs réel", eyebrow: "PLAN VS RÉEL", title: "Le site est à 3 800$ derrière la prévision.", body: "La main-d'œuvre est toujours au baseline, la marge s'érode à l'heure." },
      { shortLabel: "Contexte marché", eyebrow: "CONTEXTE MARCHÉ", title: "Le marché explique l'écart.", body: "Les concurrents proches ont baissé les combos déjeuner et un événement bureau local réduit le passage." },
      { shortLabel: "Action suivante", eyebrow: "ACTION SUIVANTE", title: "Sundae Coach recommande le coup suivant.", body: "Ajustez la main-d'œuvre si la couverture le permet, poussez l'offre déjeuner et donnez à l'équipe une chance de récupérer avant la fin du peak." },
    ],
    visualHeader: "Pulse — Centre-ville · Service déjeuner",
    visualLabels: {
      coversChart: "Couverts déjeuner — aujourd'hui vs même jour la semaine dernière",
      coversTrend: "−22% S/S",
      planVsActual: "Plan vs réel",
      planVsActualVariance: "−3 800$ vs prévision",
      forecast: "Prévision",
      actualRunRate: "Run-rate réel",
      laborNote: "Main-d'œuvre au baseline — sur-effectifs pour ce volume.",
      watchtower: "Watchtower",
      watchtowerItem1: "3 concurrents à moins de 2km ont baissé les combos déjeuner à 9,99$ hier",
      watchtowerItem2: "Exercice incendie tour de bureaux prévu 11h–12h, à 2 pâtés",
      coach: "Sundae Coach",
      coachBody: "Ajustez une vacation de cuisinier de 11h–14h si la couverture le permet. Poussez le combo à 11,99$ via loyalty.",
      coachProjection: "Impact projeté : récupération partielle si exécuté avant le pic.",
      illustrative: "Illustratif",
    },
  },
  es: {
    eyebrow: "EL MODELO DE INTELIGENCIA 4D",
    headline: "Mira cómo un problema de ingresos se vuelve una decisión.",
    description: "Sundae conecta rendimiento, plan, contexto de mercado y próxima acción — para que los equipos actúen antes de que termine el turno.",
    scenarioTime: "MARTES · 9:14 AM · CENTRO",
    scenarioHook: "El ingreso del almuerzo va 14% atrás del plan.",
    illustrativeNote: "Escenario ilustrativo basado en capacidades de Sundae.",
    closing: "De señal a causa a acción — antes del fin del turno.",
    dimensions: [
      { shortLabel: "Qué pasó", eyebrow: "QUÉ PASÓ", title: "Los cubiertos bajaron 22%.", body: "El ticket medio está estable, el problema es tráfico — no precio." },
      { shortLabel: "Plan vs real", eyebrow: "PLAN VS REAL", title: "El local va $3,800 atrás del forecast.", body: "El personal sigue en baseline, así que el margen se erosiona por hora." },
      { shortLabel: "Contexto de mercado", eyebrow: "CONTEXTO DE MERCADO", title: "El mercado explica la brecha.", body: "Competidores cercanos bajaron combos de almuerzo y un evento de oficina local reduce el tráfico." },
      { shortLabel: "Próxima acción", eyebrow: "PRÓXIMA ACCIÓN", title: "Sundae Coach recomienda el siguiente movimiento.", body: "Ajusta personal si la cobertura lo permite, empuja la oferta de almuerzo y da al equipo una oportunidad de recuperar parte de la brecha antes del cierre del peak." },
    ],
    visualHeader: "Pulse — Centro · Servicio de almuerzo",
    visualLabels: {
      coversChart: "Cubiertos de almuerzo — hoy vs mismo día la semana pasada",
      coversTrend: "−22% S/S",
      planVsActual: "Plan vs real",
      planVsActualVariance: "−$3,800 vs forecast",
      forecast: "Forecast",
      actualRunRate: "Run-rate real",
      laborNote: "Personal en baseline — sobreasignado para este volumen.",
      watchtower: "Watchtower",
      watchtowerItem1: "3 competidores en 2km bajaron combos de almuerzo a $9.99 ayer",
      watchtowerItem2: "Simulacro de incendio en torre de oficinas 11–12, a 2 cuadras",
      coach: "Sundae Coach",
      coachBody: "Ajusta un turno de cocinero de 11–2 si la cobertura lo permite. Empuja el combo de $11.99 vía loyalty.",
      coachProjection: "Impacto proyectado: recuperación parcial si se ejecuta antes del peak.",
      illustrative: "Ilustrativo",
    },
  },
};

export function Section4DScene() {
  const reduceMotion = useReducedMotion();
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;
  const dimensions = copy.dimensions;
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-cycle through dimensions every 5.5s — pauses on hover/focus
  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % dimensions.length);
    }, 5500);
    return () => clearInterval(id);
  }, [reduceMotion, paused, dimensions.length]);

  return (
    <section
      aria-labelledby="fourD-headline"
      className="relative bg-mesh"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-18 lg:py-20">
        {/* Section signposting */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-7">
          <div className="eyebrow mb-4">{copy.eyebrow}</div>
          <h2 id="fourD-headline" className="section-h2 text-balance mb-5">{copy.headline}</h2>
          <p className="body-lg max-w-2xl mx-auto">{copy.description}</p>
        </div>

        {/* Compact scenario hook */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="text-[12px] sm:text-[13px] uppercase tracking-[0.18em] text-[var(--electric-blue)] font-bold mb-3">
            {copy.scenarioTime}
          </div>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] text-balance leading-tight">
            {copy.scenarioHook}
          </p>
          <p className="mt-3 text-[12px] text-[var(--text-muted)] italic">
            {copy.illustrativeNote}
          </p>
        </div>

        {/* Two-column: dimension content + visual.
            Pills sit ABOVE this row, spanning both columns, so the link
            between pill click → content + visual change is visually obvious. */}
        <div
          className="max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
        >
          {/* Dimension breadcrumb — sentence case, "01 What happened" feel.
              Active pill: blue bg + glow. Inactive: muted surface, easier to read. */}
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-[13px] sm:text-[14px] mb-5 sm:mb-6">
            {dimensions.map((d, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveIdx(i);
                    setPaused(true);
                  }}
                  className={`px-4 py-1.5 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric-blue)] ${
                    isActive
                      ? "bg-[var(--electric-blue)] text-white shadow-[0_0_18px_rgba(28,71,255,0.45)]"
                      : "bg-[var(--surface-subtle)] text-[var(--text-supporting)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label={d.shortLabel}
                  aria-current={isActive}
                >
                  <span className={`font-mono mr-2 ${isActive ? "opacity-80" : "opacity-50"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{d.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Visual indicator: arrow connecting pills to the panel/visual below */}
          <div className="flex justify-center -mt-2 mb-4 text-[var(--electric-blue)]/60" aria-hidden>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M9 14L1 4h16L9 14z" fill="currentColor" />
            </svg>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
            {/* Active dimension content */}
            <div className="min-h-[260px] lg:min-h-[300px] lg:pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="eyebrow mb-4">
                    {dimensions[activeIdx].eyebrow}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[var(--text-primary)] mb-4 leading-tight tracking-tight">
                    {dimensions[activeIdx].title}
                  </h3>
                  <p className="body-lg">{dimensions[activeIdx].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual — morphs with active dimension */}
            <div>
              <SceneVisual activeIdx={activeIdx} header={copy.visualHeader} labels={copy.visualLabels} />
            </div>
          </div>
        </div>

        <p className="text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light max-w-2xl mx-auto mt-14 sm:mt-16">
          {copy.closing}
        </p>
      </div>
    </section>
  );
}

/* ─── Morphing visual ──────────────────────────────────────── */

/**
 * The right-side visual that builds up across dimensions. Each new dimension
 * adds its own panel below the running composition so the buyer literally
 * sees Sundae layering data → plan → market → recommendation.
 */
function SceneVisual({ activeIdx, header, labels }: { activeIdx: number; header: string; labels: LocalizedFourD["visualLabels"] }) {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--navy)] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5),0_0_60px_rgba(28,71,255,0.12)]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-[var(--border-default)]">
        <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] text-[var(--text-muted)] font-medium">{header}</span>
        <span className="ml-auto text-[9px] uppercase tracking-[0.14em] font-bold text-[var(--brand-yellow)]/80">{labels.illustrative}</span>
      </div>

      <div className="p-5 space-y-4">
        <div className="rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-default)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              {labels.coversChart}
            </div>
            <span className="text-[10px] text-[#FF5450] font-mono">{labels.coversTrend}</span>
          </div>
          <svg viewBox="0 0 320 80" className="w-full h-20" preserveAspectRatio="none" aria-hidden>
            <path
              d="M0 30 L40 28 L80 25 L120 22 L160 20 L200 18 L240 17 L280 15 L320 14"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M0 35 L40 38 L80 42 L120 48 L160 55 L200 60 L240 64 L280 67 L320 68"
              stroke="#FF5450"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Dimension 2: forecast variance */}
        <AnimatePresence>
          {activeIdx >= 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-default)] p-4 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                  {labels.planVsActual}
                </div>
                <span className="text-[10px] text-[#FF5450] font-mono">
                  {labels.planVsActualVariance}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">{labels.forecast}</div>
                  <div className="font-mono text-[var(--text-secondary)]">$18,620</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">{labels.actualRunRate}</div>
                  <div className="font-mono text-[#FF5450]">$14,820</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border-default)] text-[11px] text-[var(--text-muted)]">
                {labels.laborNote}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dimension 3: market context */}
        <AnimatePresence>
          {activeIdx >= 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg p-4 overflow-hidden"
              style={{
                background: "rgba(245,158,11,0.08)",
                borderLeft: "3px solid #F59E0B",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#F59E0B]">
                  {labels.watchtower}
                </span>
              </div>
              <ul className="text-[12px] text-[var(--text-secondary)] space-y-1">
                <li>
                  <span className="text-[var(--text-muted)]">·</span> {labels.watchtowerItem1}
                </li>
                <li>
                  <span className="text-[var(--text-muted)]">·</span> {labels.watchtowerItem2}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dimension 4: Sundae Coach recommendation */}
        <AnimatePresence>
          {activeIdx >= 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg p-4 overflow-hidden"
              style={{
                background: "rgba(28,71,255,0.08)",
                borderLeft: "3px solid #1C47FF",
              }}
            >
              <div className="text-[10px] uppercase tracking-wider font-bold text-[var(--electric-blue)] mb-2">
                {labels.coach}
              </div>
              <p className="text-[12px] text-[var(--text-primary)] leading-relaxed">
                {labels.coachBody}{" "}
                <span className="text-[var(--text-secondary)]">
                  {labels.coachProjection}
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
