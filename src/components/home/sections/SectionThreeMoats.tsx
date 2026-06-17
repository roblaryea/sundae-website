"use client";

import { motion } from "framer-motion";
import { useSettledReducedMotion as useReducedMotion } from "@/lib/useSettledReducedMotion";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_home_sections_SectionThreeMoats'

/**
 * Mini thumbnails - each is a small visual artifact paired with the moat copy
 * so the section reads as evidence, not just three text cards. Inline SVG
 * keeps these zero-dependency and CLS-free.
 */
function PulseThumb() {
  return (
    <div className="mockup-dark rounded-lg border border-[var(--border-default)] bg-[var(--navy)] p-3 mt-5 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
          Lunch pacing
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] text-[#22C55E] font-semibold">
          <span className="w-1 h-1 rounded-full bg-[#22C55E] animate-pulse" />
          LIVE
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        <div className="bg-white/[0.04] rounded px-2 py-1.5">
          <div className="text-[8px] text-[var(--text-muted)] uppercase">Rev</div>
          <div className="text-xs font-bold font-mono text-[#FF5C4D]">$14.8K</div>
        </div>
        <div className="bg-white/[0.04] rounded px-2 py-1.5">
          <div className="text-[8px] text-[var(--text-muted)] uppercase">Labor</div>
          <div className="text-xs font-bold font-mono text-[#22C55E]">28.4%</div>
        </div>
        <div className="bg-white/[0.04] rounded px-2 py-1.5">
          <div className="text-[8px] text-[var(--text-muted)] uppercase">Pace</div>
          <div className="text-xs font-bold font-mono text-[#22C55E]">+6%</div>
        </div>
      </div>
      <svg viewBox="0 0 200 30" className="w-full h-7" preserveAspectRatio="none" aria-hidden>
        <path d="M0 22 L25 20 L50 18 L75 14 L100 11 L125 8 L150 6 L175 5 L200 4" stroke="#FF5C4D" strokeWidth="1.5" fill="none" />
        <path d="M0 22 L25 20 L50 18 L75 14 L100 11 L125 8 L150 6 L175 5 L200 4 L200 30 L0 30 Z" fill="rgba(255,92,77,0.15)" />
      </svg>
    </div>
  );
}

function WatchtowerThumb() {
  return (
    <div className="mockup-dark rounded-lg border border-[var(--border-default)] bg-[var(--navy)] p-3 mt-5 overflow-hidden space-y-1.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
          Active signals
        </span>
        <span className="text-[9px] font-mono text-[var(--text-muted)]">14</span>
      </div>
      <div className="rounded px-2 py-1.5" style={{ background: "rgba(245,158,11,0.10)", borderLeft: "2px solid #F59E0B" }}>
        <div className="text-[10px] text-[var(--text-secondary)] leading-tight">
          3 competitors dropped lunch combos to $9.99
        </div>
      </div>
      <div className="rounded px-2 py-1.5" style={{ background: "rgba(255,92,77,0.10)", borderLeft: "2px solid #FF5C4D" }}>
        <div className="text-[10px] text-[var(--text-secondary)] leading-tight">
          Office tower fire drill, 2 blocks · 11-12
        </div>
      </div>
      <div className="rounded px-2 py-1.5" style={{ background: "rgba(34,197,94,0.10)", borderLeft: "2px solid #22C55E" }}>
        <div className="text-[10px] text-[var(--text-secondary)] leading-tight">
          Marathon route Sun · +18% est foot traffic
        </div>
      </div>
    </div>
  );
}

function BenchmarkThumb() {
  return (
    <div className="mockup-dark rounded-lg border border-[var(--border-default)] bg-[var(--navy)] p-3 mt-5 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
          RevPASH index
        </span>
        <span className="text-[9px] text-[#22C55E] font-semibold">+12% vs peers</span>
      </div>
      <div className="flex items-end gap-1 h-16 mb-1.5">
        {[55, 62, 70, 75, 78, 82, 88, 92, 100, 112].map((h, i) => {
          const isYou = i === 9;
          return (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: isYou ? "#FF5C4D" : "rgba(255,255,255,0.18)",
                boxShadow: isYou ? "0 0 8px rgba(255,92,77,0.6)" : "none",
              }}
              aria-hidden
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between text-[8px] text-[var(--text-muted)]">
        <span>Peer cohort (anon)</span>
        <span className="text-[#FF5C4D] font-semibold">You</span>
      </div>
    </div>
  );
}

/**
 * Section 5 - Beyond Dashboards (formerly "The Three Moats").
 *
 * Conversion job: explain product. Reframes "Sundae has lots of features"
 * into "Sundae adds three layers BI tools structurally don't ship." Cards
 * stagger-fade on scroll-into-view.
 *
 * r7+1 update: language reframed from investor-flavored ("moats", "category
 * difference") to buyer-facing ("layers", "operating advantage"). The
 * underlying strategic concept is still about defensible advantages - but
 * operators don't buy moats, they buy the things they can finally do.
 *
 * Claims used:
 *   CLM-204 (eyebrow) APPROVED PUBLIC
 *   CLM-205 (headline) APPROVED PUBLIC
 *   CLM-103 (Pulse - shift-aware language) APPROVED PUBLIC
 *   CLM-104 (Watchtower capabilities) APPROVED PUBLIC
 *   CLM-207 (Benchmarks - cohort framing) APPROVED PUBLIC
 *   CLM-208 (closing line - restaurant intelligence layer) APPROVED PUBLIC
 *
 * Excluded (awaiting Legal - CLM-203a/b):
 *   Named Power BI + Tableau competitor sentence reserved for `/compare/*`
 *   pages and will swap into Section 5 subhead after Legal review.
 */

/* Layer structure - badge labels and colors stay product-name (untranslated brand) */
const layerStructure = [
  { badge: "Pulse", badgeColor: "var(--color-pulse)", Thumb: PulseThumb },
  { badge: "Watchtower", badgeColor: "var(--color-watchtower)", Thumb: WatchtowerThumb },
  { badge: "Benchmarks", badgeColor: "var(--color-benchmarks)", Thumb: BenchmarkThumb },
];

type LocalizedMoats = {
  eyebrow: string;
  headline: string;
  description: string;
  layerWord: string;
  layers: { title: string; why: string }[];
  closing: string;
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedMoats> = {
  en: {
    eyebrow: "BEYOND THE REPORT",
    headline: "Three signals that decide what’s next.",
    description: "Reports show what happened. Sundae adds the live operating context, market signals, and peer comparisons you need to decide what to do next.",
    layerWord: "Signal",
    layers: [
      { title: "Live shift intelligence", why: "See pacing, labor, leakage, comps, voids, and service exceptions while the shift is still running - not after the weekly recap." },
      { title: "External market intelligence", why: "Add the market around each restaurant: weather, events, competitor pricing, footfall signals, and daily briefings your BI stack does not naturally know." },
      { title: "Peer benchmarks that compound", why: "Compare locations against anonymized peers by format, market, and performance metric. The network gets more useful as more restaurants join." },
    ],
    closing: "Not another dashboard. A restaurant intelligence layer.",
  },
  ar: {
    eyebrow: "ما وراء التقرير",
    headline: "ثلاث إشارات تُحدد خطوتك التالية.",
    description: "اللوحات تُظهر ما حدث. Sundae يضيف السياق التشغيلي الحي وإشارات السوق ومقارنات النظراء التي تحتاجها المطاعم لتقرر ما تفعله تالياً.",
    layerWord: "إشارة",
    layers: [
      { title: "ذكاء وردية حي", why: "شاهد الوتيرة والعمالة والتسرب والتعويضات والتجاوزات وحالات الخدمة الشاذة وهي تجري - لا بعد الملخص الأسبوعي." },
      { title: "ذكاء سوق خارجي", why: "أضف السوق حول كل مطعم: الطقس والأحداث وتسعير المنافسين وحركة المرور وإحاطات يومية لا يعرفها BI طبيعياً." },
      { title: "معايير نظراء تتراكم", why: "قارن المواقع بنظراء مجهولين بالصيغة والسوق والمقياس. الشبكة تصبح أكثر فائدة كلما انضم المزيد." },
    ],
    closing: "ليست لوحة أخرى. طبقة ذكاء للمطاعم.",
  },
  fr: {
    eyebrow: "AU-DELÀ DU RAPPORT",
    headline: "Trois signaux qui décident de la suite.",
    description: "Les dashboards montrent ce qui s'est passé. Sundae ajoute le contexte opérationnel live, les signaux marché et les comparaisons pairs dont les restaurants ont besoin pour décider quoi faire ensuite.",
    layerWord: "Signal",
    layers: [
      { title: "Intelligence service live", why: "Voyez rythme, main-d'œuvre, fuites, comps, annulations et exceptions pendant que le service tourne - pas après le récap de la semaine." },
      { title: "Intelligence marché externe", why: "Ajoutez le marché autour de chaque restaurant : météo, événements, prix concurrents, signaux fréquentation et briefings quotidiens que votre BI ne connaît pas." },
      { title: "Benchmarks pairs qui se composent", why: "Comparez les sites à des pairs anonymisés par format, marché et métrique. Le réseau devient plus utile à mesure que plus de restaurants rejoignent." },
    ],
    closing: "Pas un autre dashboard. Une couche d'intelligence restaurant.",
  },
  es: {
    eyebrow: "MÁS ALLÁ DEL INFORME",
    headline: "Tres señales que deciden qué sigue.",
    description: "Los dashboards muestran lo que pasó. Sundae añade el contexto operativo en vivo, las señales de mercado y las comparaciones con pares que los restaurantes necesitan para decidir qué hacer a continuación.",
    layerWord: "Señal",
    layers: [
      { title: "Inteligencia de turno en vivo", why: "Ve ritmo, personal, fugas, comps, anulaciones y excepciones de servicio mientras el turno corre - no después del recap semanal." },
      { title: "Inteligencia de mercado externo", why: "Añade el mercado alrededor de cada restaurante: clima, eventos, precios de competencia, señales de tráfico y briefings diarios que tu BI no conoce." },
      { title: "Benchmarks de pares que se componen", why: "Compara locales contra pares anonimizados por formato, mercado y métrica. La red se vuelve más útil mientras más restaurantes se unen." },
    ],
    closing: "No es otro dashboard. Es una capa de inteligencia para restaurantes.",
  },
};

export function SectionThreeMoats() {
  const reduceMotion = useReducedMotion();
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;

  return (
    <section aria-labelledby="moats-headline" className="relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <div className="eyebrow mb-4">{copy.eyebrow}</div>
          <h2 id="moats-headline" className="section-h2 text-balance mb-5">{copy.headline}</h2>
          <p className="body-lg max-w-2xl mx-auto">{copy.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {layerStructure.map((s, i) => {
            const l = copy.layers[i];
            return (
              <motion.article
                key={s.badge}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="group rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-7 hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="text-[10px] uppercase tracking-wider font-bold mb-3 inline-flex px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: `color-mix(in oklab, ${s.badgeColor} 18%, transparent)`,
                    color: s.badgeColor,
                  }}
                >
                  {copy.layerWord} {i + 1} - {s.badge}
                </div>
                <h3 className="section-h3 mb-3">{l.title}</h3>
                <p className="body-base">{l.why}</p>
                <s.Thumb />
              </motion.article>
            );
          })}
        </div>

        <p className="mt-12 sm:mt-14 text-center text-lg sm:text-xl text-[var(--text-secondary)] italic">
          {copy.closing}
        </p>
      </div>
    </section>
  );
}
