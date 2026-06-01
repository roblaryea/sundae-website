'use client';

import { Button } from "@/components/ui/Button";
import { motion, useInView, MotionConfig } from "framer-motion";
import { useRef } from "react";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { SIGNUP_URL } from "@/lib/urls";
import { ElegantShape } from "@/components/ui/ElegantShape";
import { KPICard } from "@/components/ui/KPICard";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { HeroLiveDashboard } from "./HeroLiveDashboard";
import { SectionOldWaySundaeWay } from "./sections/SectionOldWaySundaeWay";
import { SectionSpeedQualityCost } from "./sections/SectionSpeedQualityCost";
import { SectionWhatYouRetire } from "./sections/SectionWhatYouRetire";
import { SectionThreeMoats } from "./sections/SectionThreeMoats";
import { Section4DScene } from "./sections/Section4DScene";
import { SectionPersonaSwitcher } from "./sections/SectionPersonaSwitcher";
import { SectionProof } from "./sections/SectionProof";
import { SectionTrustStrip } from "./sections/SectionTrustStrip";
import { SectionProductPreview } from "./sections/SectionProductPreview";
// SectionProductGallery (the full 18-card persona-filtered version) is
// preserved at its original path for reuse on product + solutions pages.
// Homepage shows only the slim 4-card teaser per Option B from review.
// SectionCommercialHubs moved to /about page (presence section).

/* ─── Data ─────────────────────────────────────────────────────── */

/* ─── Component ────────────────────────────────────────────────── */

export default function HomeContent() {
  const { messages } = useWebsiteI18n();
  const home = messages.home;
  const problem = home.problem;
  const platform = home.platform;
  const modules = home.modules;
  const mockup = home.mockup;
  const cta = useCta();
  const painRef = useRef<HTMLDivElement>(null);
  const painInView = useInView(painRef, { once: true, margin: "-80px" });

  const layerIcons: Record<string, SundaeIconName> = {
    Pulse: "pulse",
    Benchmarks: "benchmarking",
    Watchtower: "watchtower",
    Insights: "insights",
    "Sundae Intelligence": "intelligence",
    Foresight: "forecasting",
  };

  const layerAccents: Record<string, string> = {
    Pulse: "from-[#1C47FF] to-[#3B82F6]",
    Benchmarks: "from-[#22C55E] to-[#16A34A]",
    Watchtower: "from-[#F59E0B] to-[#D97706]",
    Insights: "from-[#A855F7] to-[#7C3AED]",
    "Sundae Intelligence": "from-[#EC4899] to-[#BE185D]",
    Foresight: "from-[#0EA5E9] to-[#0284C7]",
  };

  const moduleIcons: SundaeIconName[] = [
    "revenue",
    "labor",
    "quality",
    "inventory",
    "purchasing",
    "marketing",
    "delivery",
    "reservations",
    "risk",
    "cost",
    "data",
    "sync",
  ];

  return (
    <MotionConfig reducedMotion="user">
      <>
        {/* ════════════════════════════════════════════════
            1. HERO — Dark, category-defining
        ════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,71,255,0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid-texture" />

          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-white/[0.03]" className="left-[-10%] top-[15%]" />
            <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-white/[0.02]" className="right-[-5%] top-[70%]" />
            <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-white/[0.025]" className="left-[5%] bottom-[5%]" />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-20">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex justify-center mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-[rgba(28,71,255,0.12)] border border-[rgba(28,71,255,0.2)] text-[#60A5FA]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
                {home.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <h1 className="hero-h1 mb-6 max-w-4xl mx-auto">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-primary)]/80">
                  {home.titleTop}
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[var(--text-primary)] to-[#93C5FD]">
                  {home.titleBottom}
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="body-xl max-w-2xl mx-auto mb-10">
                {home.description}
                <span className="text-[var(--text-primary)] font-medium"> {home.descriptionEmphasis}</span>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Button
                variant="cta"
                size="lg"
                href={SIGNUP_URL}
                onClick={(e) => { e.preventDefault(); cta(SIGNUP_URL, "start_free_hero", { page: "/home" }); }}
              >
                {home.startFree}
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => cta("/demo", "book_demo_hero", { page: "/home" })}
              >
                {home.bookDemo}
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-xs text-[var(--text-muted)]"
            >
              {home.noCard}
            </motion.p>
          </div>

          {/* Hero CSS Mockup — Pulse Dashboard */}
          <motion.div
            className="max-w-5xl mx-auto mt-16 relative z-20 px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{ perspective: '1200px' }}
          >
            <div className="absolute -inset-x-10 bottom-0 h-48 bg-gradient-to-t from-[rgba(28,71,255,0.08)] via-[rgba(28,71,255,0.04)] to-transparent blur-2xl pointer-events-none rounded-full" />

            <motion.div
              initial={{ rotateX: 8, scale: 0.95, opacity: 0 }}
              animate={{ rotateX: 1.5, scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MockupFrame label={mockup.frameLabel} glow>
                <HeroLiveDashboard
                  kpis={mockup.kpis.map((kpi) => ({
                    label: kpi.label,
                    value: kpi.value,
                    trend: kpi.trend,
                    trendUp: kpi.trendUp,
                    color: "color" in kpi ? kpi.color : undefined,
                  }))}
                  paceLabel={mockup.paceLabel}
                  tableHeaders={[...mockup.tableHeaders]}
                  tableRows={mockup.tableRows.map((row) => [...row])}
                  coachAlert={mockup.coachAlert}
                  updatedAt={mockup.updatedAt}
                />
              </MockupFrame>
            </motion.div>
          </motion.div>

          {/* Proof bar */}
          <motion.div
            className="max-w-4xl mx-auto mt-16 relative z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {home.proofStats.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-[var(--text-secondary)] tabular-nums">{item.number}</div>
                  <div className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════
            2. THE PROBLEM — Pain KPIs with animated numbers
        ════════════════════════════════════════════════ */}
        <section ref={painRef} aria-labelledby="problem-heading" className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,84,80,0.04),transparent_60%)]" />

          <div className="max-w-6xl mx-auto relative z-10">
            <FadeUp className="text-center mb-14">
              <p className="eyebrow mb-4">{problem.eyebrow}</p>
              <h2 id="problem-heading" className="section-h2 mb-5">
                {problem.heading}
              </h2>
              <p className="body-lg max-w-2xl mx-auto">
                {problem.description}
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {problem.kpis.map((kpi) => (
                <KPICard
                  key={kpi.label}
                  value={kpi.value}
                  label={kpi.label}
                  supporting={kpi.supporting}
                  color={kpi.color as "blue" | "green" | "amber" | "red" | "purple" | "white" | undefined}
                  animate={painInView}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            2b. FROM REPORTING LAG TO OPS SPEED — Old Way vs Sundae Way
        ════════════════════════════════════════════════ */}
        <SectionOldWaySundaeWay />

        {/* ════════════════════════════════════════════════
            2c. THE OLD TRADEOFF IS DEAD — Speed · Quality · Cost
        ════════════════════════════════════════════════ */}
        <SectionSpeedQualityCost />

        {/* ════════════════════════════════════════════════
            2d. WHAT YOU RETIRE — Explicit BI-replacement positioning
        ════════════════════════════════════════════════ */}
        <SectionWhatYouRetire />

        {/* ════════════════════════════════════════════════
            3. SIX LAYERS — Platform pillars
        ════════════════════════════════════════════════ */}
        <section aria-labelledby="platform-heading" className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-mesh" />

          <div className="max-w-7xl mx-auto relative z-10">
            <FadeUp className="text-center mb-14">
              <p className="eyebrow mb-4">{platform.eyebrow}</p>
              <h2 id="platform-heading" className="section-h2 mb-5">
                {platform.heading}
              </h2>
              <p className="body-lg max-w-2xl mx-auto">
                {platform.description}
              </p>
            </FadeUp>

            {/* Top row: 3 pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              {platform.layers.slice(0, 3).map((layer, i) => (
                <div key={layer.name}>
                  <LayerCard
                    layer={layer}
                    icon={layerIcons[layer.name]}
                    accent={layerAccents[layer.name]}
                    learnMoreLabel={platform.learnMore}
                    indexLabel={`0${i + 1}`}
                    countLabel={platform.countLabel}
                    cta={cta}
                  />
                </div>
              ))}
            </div>

            {/* Bottom row: 3 pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {platform.layers.slice(3).map((layer, i) => (
                <div key={layer.name}>
                  <LayerCard
                    layer={layer}
                    icon={layerIcons[layer.name]}
                    accent={layerAccents[layer.name]}
                    learnMoreLabel={platform.learnMore}
                    indexLabel={`0${i + 4}`}
                    countLabel={platform.countLabel}
                    cta={cta}
                  />
                </div>
              ))}
            </div>

            <FadeUp delay={0.2} className="text-center mt-14">
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => cta("/insights", "explore_modules", { page: "/home", section: "platform" })}
              >
                {platform.exploreModules}
              </Button>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            3b. BEYOND DASHBOARDS — Three Moats (Pulse / Watchtower / Benchmarks)
        ════════════════════════════════════════════════ */}
        <SectionThreeMoats />

        {/* ════════════════════════════════════════════════
            3c. 4D INTELLIGENCE MODEL — scenario walk-through
        ════════════════════════════════════════════════ */}
        <Section4DScene />

        {/* ════════════════════════════════════════════════
            4. MODULE GRID — 12 intelligence domains
        ════════════════════════════════════════════════ */}
        <section aria-labelledby="modules-heading" className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.04),transparent_60%)]" />

          <div className="max-w-6xl mx-auto relative z-10">
            <FadeUp className="text-center mb-12">
              <p className="eyebrow mb-4">{modules.eyebrow}</p>
              <h2 id="modules-heading" className="section-h2 mb-5">
                {modules.heading}
              </h2>
              <p className="body-lg max-w-2xl mx-auto">
                {modules.description}
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {modules.categories.map((mod, index: number) => (
                <div key={mod.name}>
                  <div className="group p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(28,71,255,0.2)] transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center mb-3">
                      <SundaeIcon name={moduleIcons[index] || "sync"} size="sm" className="text-[var(--text-supporting)] group-hover:text-[#60A5FA] transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{mod.name}</h3>
                    <p className="text-[11px] text-[var(--text-muted)]">{mod.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            5. PERSONA SWITCHER — One Platform. Every Role. (6 personas, tabbed)
        ════════════════════════════════════════════════ */}
        <SectionPersonaSwitcher />

        {/* ════════════════════════════════════════════════
            6. PROOF — Industry vs Sundae + capability stats
        ════════════════════════════════════════════════ */}
        <SectionProof />

        {/* ════════════════════════════════════════════════
            6b. TRUST STRIP — Enterprise-grade signal before CTA
        ════════════════════════════════════════════════ */}
        <SectionTrustStrip />

        {/* ════════════════════════════════════════════════
            6c. PRODUCT PREVIEW — Slim 4-card teaser with lightbox
            (full per-product galleries live on the product pages)
        ════════════════════════════════════════════════ */}
        <SectionProductPreview />

        {/* ════════════════════════════════════════════════
            7. CLOSING CTA
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grad-deep">
          <div className="absolute inset-0 bg-grid-texture" />

          <ElegantShape delay={0} width={400} height={100} rotate={-12} gradient="from-white/[0.03]" className="left-[-8%] top-[20%]" />
          <ElegantShape delay={0.2} width={300} height={80} rotate={15} gradient="from-white/[0.02]" className="right-[-5%] bottom-[10%]" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.06),transparent_70%)]" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <FadeUp>
              <h2 className="section-h2 mb-4">
                {home.closingTitle}
              </h2>
              <p className="body-lg mb-10 max-w-xl mx-auto">
                {home.closingDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="cta"
                  size="lg"
                  onClick={() => cta("/demo", "book_demo_footer_cta", { page: "/home" })}
                >
                  {home.bookDemo}
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={() => cta(SIGNUP_URL, "get_report_footer_cta", { page: "/home" })}
                >
                  {home.startFree}
                </Button>
              </div>
            </FadeUp>
          </div>
        </section>
      </>
    </MotionConfig>
  );
}

/* ─── Layer Card Component ────────────────────────────────────── */

function LayerCard({ layer, icon, accent, learnMoreLabel, indexLabel, countLabel, cta }: {
  layer: { name: string; subtitle: string; description: string; href: string };
  icon: SundaeIconName;
  accent: string;
  learnMoreLabel: string;
  indexLabel: string;
  countLabel: string;
  cta: ReturnType<typeof useCta>;
}) {
  return (
    <div
      className="group cursor-pointer h-full"
      role="button"
      tabIndex={0}
      onClick={() => cta(layer.href, `view_${layer.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "platform" })}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cta(layer.href, `view_${layer.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "platform" }); } }}
    >
      <div className="relative h-full p-6 rounded-2xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(28,71,255,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(28,71,255,0.08)]">
        {/* Layer count indicator — top right */}
        <div className="absolute top-4 right-5 text-[10px] font-mono tracking-wider text-[var(--text-muted)]/70">
          <span className="text-[var(--text-secondary)]">{indexLabel}</span>
          <span className="opacity-50"> {countLabel}</span>
        </div>

        <div className="flex items-center gap-3 mb-4 pr-12">
          <div className={`w-10 h-10 bg-gradient-to-br ${accent} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
            <SundaeIcon name={icon} size="sm" className="text-[var(--text-primary)]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] leading-tight">{layer.name}</h3>
            <p className="text-xs text-[var(--text-muted)] font-medium">{layer.subtitle}</p>
          </div>
        </div>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{layer.description}</p>

        <span className="text-sm font-medium text-[#60A5FA] group-hover:text-[var(--text-primary)] transition-colors">
          {learnMoreLabel} <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </div>
  );
}
