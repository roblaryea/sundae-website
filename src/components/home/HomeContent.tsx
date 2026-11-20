'use client';

import bodyCopy from '@/content/buyer-clarity/home.json';
import depthCopy from '@/content/operator-depth.json';
import audienceCopy from '@/content/operator-audiences.json';


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { motion, MotionConfig } from "framer-motion";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { HeroLiveDashboard } from "./HeroLiveDashboard";
import { ServiceBackdrop } from "./ServiceBackdrop";
import { SectionEditorialBand } from "./sections/SectionEditorialBand";
import { SectionEditorialSplit } from "./sections/SectionEditorialSplit";
import { SectionCreamRelief } from "./sections/SectionCreamRelief";
import { SectionOperatorVoice } from "./sections/SectionOperatorVoice";
import { SectionEcosystemStrip } from "./sections/SectionEcosystemStrip";
import { SundaeWordmark } from "./sections/SundaeWordmark";
import { editorialCopy, type EditorialCopy } from "./sections/editorialCopy";
import { homeClosingCopy } from "./closerCopy";
import { heroDashboardCopy } from "./heroDashboardCopy";
import { SectionWhatYouRetire } from "./sections/SectionWhatYouRetire";
import { SectionThreeMoats } from "./sections/SectionThreeMoats";
import { Section4DScene } from "./sections/Section4DScene";
import { SectionCrewSubstrate } from "./sections/SectionCrewSubstrate";
import { HomeScrollSpine, type HomeChapter } from "./HomeScrollSpine";
import { operatorNavigationCopy } from '@/content/operator-workflows/navigation';
import { getHomeAboutAlignment } from '@/lib/homeAboutAlignment';
import proofCopy from '@/content/workflow-proof.json';
import { getCommercialCopy } from '@/lib/pricing/commercialCopy';

// The homepage's six chapters, using the hero glass's warm palette. As the
// reader descends, the spine fills with this warm palette - the page becomes the
// glass filling up - and each node jumps to its chapter.
const HOME_CHAPTERS: Omit<HomeChapter, "label">[] = [
  { id: "chapter-overview", color: "#E03E48" },
  { id: "chapter-crew", color: "#FF5C4D" },
  { id: "chapter-platform", color: "#FF7E6F" },
  { id: "chapter-moats", color: "#F7A088" },
  { id: "chapter-proof", color: "#F6C66B" },
  { id: "chapter-cta", color: "#F6F1E8" },
];

// Localized chapter labels (order matches HOME_CHAPTERS). Short, native nav
// labels - "Crew" is the product name, kept literal in every locale.
const CHAPTER_LABELS: Record<string, string[]> = {
  en: ["The leak", "The catch", "The platform", "The moat", "Crew", "Proof", "Your move"],
  fr: ["La fuite", "Le rattrapage", "La plateforme", "L'avantage", "Crew", "Preuves", "À vous de jouer"],
  es: ["La fuga", "El rescate", "La plataforma", "La ventaja", "Crew", "Pruebas", "Te toca"],
  de: ["Das Leck", "Das Auffangen", "Die Plattform", "Der Vorsprung", "Crew", "Belege", "Ihr Zug"],
  nl: ["Het lek", "De vangst", "Het platform", "De voorsprong", "Crew", "Bewijs", "Jouw beurt"],
  pt: ["O vazamento", "O resgate", "A plataforma", "A vantagem", "Crew", "Provas", "É a sua vez"],
  it: ["La perdita", "La ripresa", "La piattaforma", "Il vantaggio", "Crew", "Prove", "Tocca a te"],
  pl: ["Wyciek", "Przechwyt", "Platforma", "Przewaga", "Crew", "Dowody", "Twój ruch"],
  ro: ["Scurgerea", "Recuperarea", "Platforma", "Avantajul", "Crew", "Dovezi", "Rândul tău"],
  sv: ["Läckan", "Räddningen", "Plattformen", "Försprånget", "Crew", "Bevis", "Din tur"],
  tr: ["Sızıntı", "Yakalama", "Platform", "Avantaj", "Crew", "Kanıt", "Sıra sizde"],
  id: ["Kebocoran", "Tangkapan", "Platform", "Keunggulan", "Crew", "Bukti", "Giliran Anda"],
  ms: ["Kebocoran", "Tangkapan", "Platform", "Kelebihan", "Crew", "Bukti", "Giliran anda"],
  vi: ["Thất thoát", "Bắt kịp", "Nền tảng", "Lợi thế", "Crew", "Bằng chứng", "Lượt của bạn"],
  hi: ["रिसाव", "पकड़", "प्लेटफ़ॉर्म", "बढ़त", "Crew", "प्रमाण", "आपकी बारी"],
  ur: ["رساؤ", "پکڑ", "پلیٹ فارم", "برتری", "Crew", "ثبوت", "آپ کی باری"],
  bn: ["ফাঁস", "ধরা", "প্ল্যাটফর্ম", "সুবিধা", "Crew", "প্রমাণ", "আপনার পালা"],
  th: ["จุดรั่วไหล", "การกู้คืน", "แพลตฟอร์ม", "ความได้เปรียบ", "Crew", "หลักฐาน", "ตาคุณแล้ว"],
  "zh-Hans": ["漏损", "截住", "平台", "护城河", "Crew", "实证", "该你了"],
  ja: ["漏れ", "捕捉", "プラットフォーム", "優位性", "Crew", "実証", "あなたの番"],
  ko: ["누수", "포착", "플랫폼", "우위", "Crew", "증거", "당신 차례"],
  ar: ["التسرب", "الالتقاط", "المنصة", "الميزة", "Crew", "الإثبات", "دورك"],
};
import { SectionPersonaSwitcher } from "./sections/SectionPersonaSwitcher";
import { SectionProof } from "./sections/SectionProof";
import { SectionTrustStrip } from "./sections/SectionTrustStrip";
// SectionProductGallery (the full 18-card persona-filtered version) is
// preserved at its original path for reuse on product + solutions pages.
// Homepage shows only the slim 4-card teaser per Option B from review.
// SectionCommercialHubs moved to /about page (presence section).

/* ─── Component ────────────────────────────────────────────────── */

export default function HomeContent() {
  const { messages, locale } = useWebsiteI18n();
  const alignment = getHomeAboutAlignment(locale);
  const home = { ...messages.home, titleTop: alignment.liveTitleTop, titleBottom: alignment.liveTitleBottom, subheadline: alignment.liveSupport };
  const sourceEditorial = editorialCopy[locale as keyof typeof editorialCopy] ?? editorialCopy.en;
  const editorial: EditorialCopy = {
    ...sourceEditorial,
    band1: { ...sourceEditorial.band1, headline: alignment.editorialHeadline, sub: alignment.editorialSupport },
  };
  const commercial = getCommercialCopy(locale);
  const deeper = bodyCopy[locale as keyof typeof bodyCopy];
  const depth = depthCopy[locale as keyof typeof depthCopy];
  const layerDescriptions = [depth.pulse, audienceCopy[locale as keyof typeof audienceCopy].benchmarking, `${depth.watchtower} ${commercial.watchtowerEligibility}`, depth.insights, depth.intelligence, depth.foresight];
  const platform = { ...home.platform, eyebrow: deeper.platformEyebrow, heading: deeper.platformTitle, description: deeper.platformDescription, layers: home.platform.layers.map((layer, index) => ({ ...layer, description: layerDescriptions[index] })) };
  const heroDash = heroDashboardCopy[locale as keyof typeof heroDashboardCopy] ?? heroDashboardCopy.en;
  const closing = homeClosingCopy[locale as keyof typeof homeClosingCopy] ?? homeClosingCopy.en;
  const [signoffBefore, signoffAfter] = closing.signoff.split('Sundae');
  const cta = useCta();
  // Defer reduced-motion to after mount so SSR and the first client render
  // always take the full-motion path (framer's reducedMotion="user" strips
  // transform-initials on a reduced client, which otherwise mismatches the
  // server-rendered HTML and forces a full client regeneration).
  const [motionReady, setMotionReady] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMotionReady(true), []);

  // The six Intelligence Layers, rendered as one stacked operating layer
  // across the platform. Keyed by layer.name (brand names stay constant
  // across locales, so the icon/accent lookup holds).
  const layerIcons: Record<string, SundaeIconName> = {
    Pulse: "pulse",
    Benchmarks: "benchmarking",
    Watchtower: "watchtower",
    Insights: "insights",
    "Ask Sundae": "intelligence",
    Foresight: "forecasting",
  };

  const layerAccents: Record<string, string> = {
    Pulse: "from-[#FF5C4D] to-[#E03E48]",
    Benchmarks: "from-[#84A35C] to-[#5E7E3A]",
    Watchtower: "from-[#F59E0B] to-[#D97706]",
    Insights: "from-[#A8567E] to-[#7E3A5C]",
    "Ask Sundae": "from-[#EC6A89] to-[#C9456A]",
    Foresight: "from-[#5E9E96] to-[#3D7A70]",
  };

  return (
    <MotionConfig reducedMotion={motionReady ? "user" : "never"}>
      <>
        <HomeScrollSpine
          chapters={HOME_CHAPTERS.map((c, i) => ({
            ...c,
            label: ["Sundae", "Core + Crew", "Core", proofCopy[locale as keyof typeof proofCopy].whySundae, (CHAPTER_LABELS[locale as keyof typeof CHAPTER_LABELS] ?? CHAPTER_LABELS.en)[5], (CHAPTER_LABELS[locale as keyof typeof CHAPTER_LABELS] ?? CHAPTER_LABELS.en)[6]][i],
          }))}
        />
        {/* ════════════════════════════════════════════════
            1. HERO - Dark, category-defining
        ════════════════════════════════════════════════ */}
        <section id="chapter-overview" className="relative scroll-mt-24 pt-20 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background layers - two soft warm radial washes only. The grid-texture
              overlay and floating "elegant shape" blobs were retired: they read as
              generic SaaS-template scaffolding and fought the editorial photo backdrop
              below. Depth now comes from the real room photo + the product glow. */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,92,77,0.13),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_82%_28%,rgba(242,166,90,0.10),transparent_55%)]" />

          <ServiceBackdrop />

          <div className="max-w-5xl mx-auto text-center relative z-20">
            {/* Eyebrow - the site's own editorial eyebrow (uppercase, tracked),
                matching the cinematic intro. The prior rounded "pill + pulsing dot"
                badge was the single most-cloned AI-SaaS pattern; retired here. A
                small live tick is kept because this hero opens a genuinely live
                Pulse visual - meaning preserved, template dropped. */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex justify-center mb-7"
            >
              <span className="inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                <span className="relative inline-flex h-1.5 w-1.5 flex-shrink-0" aria-hidden>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--warm-coral)] opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--warm-coral)]" />
                </span>
                {home.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {/* Restrained two-part display headline, matching the cinematic
                  intro's treatment: a solid warm-white lead line + a single-color
                  amber italic emphasis. The prior three-stop bg-clip gradient on the
                  italic read as generic "gradient text"; a single warm accent is
                  more confident and keeps coral rationed for action (CTAs). */}
              <h2 className="section-h2 mb-5 max-w-3xl mx-auto" aria-label={`${home.titleTop} ${home.titleBottom}`}>
                <span className="text-[var(--text-primary)]">
                  {home.titleTop}
                </span>{" "}
                <br />
                <span className="italic text-[var(--text-warm)]" data-live-shift-emphasis>
                  {home.titleBottom}
                </span>
              </h2>
            </motion.div>

            {/* Subheadline - the sharp, memorable promise (what / why / act in time) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="font-display mx-auto mb-6 max-w-2xl text-balance text-lg font-medium leading-snug text-[var(--text-primary)] sm:text-2xl">
                {home.subheadline}
              </p>
            </motion.div>

            {/* Description + CTA intentionally omitted here: this section leads
                into the live revenue/pacing visual, so it reads as a normal page,
                not a second full hero (the cinematic intro above carries the CTA). */}
          </div>

          {/* Hero CSS Mockup - Pulse Dashboard */}
          <motion.div
            id="pulse-live"
            className="max-w-5xl mx-auto mt-10 relative z-20 px-4 scroll-mt-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ perspective: '1200px' }}
          >
            <div className="absolute -inset-x-10 bottom-0 h-48 bg-gradient-to-t from-[rgba(255,92,77,0.10)] via-[rgba(242,166,90,0.05)] to-transparent blur-2xl pointer-events-none rounded-full" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MockupFrame label={heroDash.frameLabel} glow className="mockup-dark">
                <HeroLiveDashboard />
              </MockupFrame>
              <p className="mt-4 text-center text-xs leading-relaxed text-[var(--text-supporting)]">
                {operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].brand.illustrationDisclosure}
              </p>
            </motion.div>
          </motion.div>

        </section>

        {/* Explain the operating products and daily workflows before the intelligence detail. */}
        <div id="chapter-crew" className="scroll-mt-24">
          <SectionCrewSubstrate />
        </div>

        {/* ════════════════════════════════════════════════
            2a. HUMANIZED EDITORIAL BAND - the real restaurant world
        ════════════════════════════════════════════════ */}
        <SectionEditorialBand
          src="/images/editorial/chef-warm.jpg"
          alt={editorial.band1.alt}
          eyebrow={editorial.band1.eyebrow}
          headline={editorial.band1.headline}
          sub={editorial.band1.sub}
          priority
        />

        {/* ════════════════════════════════════════════════
            2b-relief. CREAM RELIEF - early warm/light break so the dark run never builds
        ════════════════════════════════════════════════ */}
        <SectionCreamRelief variant="decisions" />

        {/* ════════════════════════════════════════════════
            2c. THE OLD TRADEOFF IS DEAD - Speed · Quality · Cost
        ════════════════════════════════════════════════ */}

        {/* ════════════════════════════════════════════════
            3. SIX LAYERS - Platform pillars
        ════════════════════════════════════════════════ */}
        <section id="chapter-platform" aria-labelledby="platform-heading" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-mesh" />

          <div className="max-w-7xl mx-auto relative z-10">
            <FadeUp className="text-center mb-10 sm:mb-12">
              <p className="eyebrow mb-4">{platform.eyebrow}</p>
              <h2 id="platform-heading" className="section-h2 mb-5">
                {platform.heading}
              </h2>
              <p className="body-lg max-w-2xl mx-auto">
                {platform.description}
              </p>
            </FadeUp>

            <FadeUp>
              <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--border-default)] divide-y divide-[var(--border-default)] bg-[var(--surface-subtle)]">
                {platform.layers.map((layer, i) => (
                  <LayerCard
                    key={layer.name}
                    layer={layer}
                    icon={layerIcons[layer.name]}
                    accent={layerAccents[layer.name]}
                    learnMoreLabel={platform.learnMore}
                    indexLabel={`0${i + 1}`}
                    countLabel={platform.countLabel}
                    cta={cta}
                  />
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className="text-center mt-10">
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => cta("/product/insights", "explore_modules", { page: "/home", section: "platform" })}
              >
                {platform.exploreModules}
              </Button>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            3a-band. HUMAN MOMENT - the brigade on the line
        ════════════════════════════════════════════════ */}
        <SectionEditorialBand
          src="/images/editorial/kitchen-brigade.jpg"
          objectPosition="center 72%"
          alt={editorial.band2.alt}
          eyebrow={editorial.band2.eyebrow}
          headline={editorial.band2.headline}
          sub={editorial.band2.sub}
        />

        {/* ════════════════════════════════════════════════
            3a-retire. WHAT YOU RETIRE - BI-replacement positioning, grouped with the moats
            (moved out of the Speed·Quality·Cost stack to break the dense run + cluster
            the competitive/BI-replacement argument with Three Moats)
        ════════════════════════════════════════════════ */}
        <SectionWhatYouRetire />

        {/* ════════════════════════════════════════════════
            3b. BEYOND DASHBOARDS - Three Moats (Pulse / Watchtower / Benchmarks)
        ════════════════════════════════════════════════ */}
        <div id="chapter-moats" className="scroll-mt-24">
          <SectionThreeMoats />
        </div>

        {/* ════════════════════════════════════════════════
            3c. 4D INTELLIGENCE MODEL - scenario walk-through
        ════════════════════════════════════════════════ */}
        <Section4DScene />

        {/* ════════════════════════════════════════════════
            3d. CREW - the operational substrate that feeds the intelligence
        ════════════════════════════════════════════════ */}


        {/* ════════════════════════════════════════════════
            4b-relief. SECOND CREAM BREAK - keeps warmth alive through the lower half
        ════════════════════════════════════════════════ */}
        <SectionCreamRelief variant="truth" unify />

        {/* ════════════════════════════════════════════════
            5. PERSONA SWITCHER - One Platform. Every Role. (6 personas, tabbed)
        ════════════════════════════════════════════════ */}
        <SectionPersonaSwitcher />

        {/* ════════════════════════════════════════════════
            5b. OPERATOR VOICE - human presence: a real face + the problem we obsess over
        ════════════════════════════════════════════════ */}
        <SectionOperatorVoice />

        {/* ════════════════════════════════════════════════
            6. PROOF - Industry vs Sundae + capability stats
        ════════════════════════════════════════════════ */}
        <div id="chapter-proof" className="scroll-mt-24">
          <SectionProof />
        </div>

        {/* ════════════════════════════════════════════════
            6a-eco. ECOSYSTEM STRIP - honest external-credibility (Live POS + roadmap)
        ════════════════════════════════════════════════ */}
        <SectionEcosystemStrip />

        {/* ════════════════════════════════════════════════
            6b. TRUST STRIP - Enterprise-grade signal before CTA
        ════════════════════════════════════════════════ */}
        <SectionTrustStrip />

        {/* ════════════════════════════════════════════════
            6d. CLOSER - the floor, before we ask for the meeting (split)
        ════════════════════════════════════════════════ */}
        <SectionEditorialSplit
          src="/images/editorial/dining-night.jpg"
          light="/images/editorial/dining-candlelit.jpg"
          video={{
            webm: '/videos/closer-room.webm',
            mp4: '/videos/closer-room.mp4',
            poster: '/videos/closer-room-poster.jpg',
          }}
          alt={editorial.closer.alt}
          eyebrow={editorial.closer.eyebrow}
          headline={
            <>
              {editorial.closer.headlineLead}{" "}
              <span className="text-[#B43829]">{editorial.closer.headlineEmphasis}</span>
            </>
          }
          sub={editorial.closer.sub}
          imageSide="right"
        />

        {/* ════════════════════════════════════════════════
            7. CLOSING CTA
        ════════════════════════════════════════════════ */}
        <section
          id="chapter-cta"
          className="relative scroll-mt-24 py-24 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
          style={{ background: 'var(--cream)', color: 'var(--ink)' }}
        >
          {/* warm caramel glow - the calm cream close, consistent with the page's
              cream relief bands. The coral energy now lives in the primary button. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 75% at 50% 0%, rgba(233,162,74,0.22) 0%, transparent 62%)' }}
          />

          {/* the mark as a layout device - bleeds into the corner, ink at low opacity */}
          <div aria-hidden className="absolute -right-16 -bottom-24 w-[420px] sm:w-[520px] opacity-[0.06] pointer-events-none" style={{ color: 'var(--ink)' }}>
            <SundaeWordmark className="w-full h-auto" />
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <FadeUp>
              <h2 className="section-h2 mb-8 break-words" style={{ color: 'var(--ink)' }}>
                <span className="block">{closing.lead}</span>{' '}
                <span className="mt-2 block">{closing.benefit}</span>{' '}
                <span className="mt-2 block italic">{signoffBefore}<span style={{ color: 'var(--brand-main)' }}>Sundae</span>{signoffAfter}</span>
              </h2>
              <div className="flex flex-col items-center">
                <Button
                  variant="cta"
                  size="lg"
                  onClick={() => cta("/demo", "book_demo_footer_cta", { page: "/home" })}
                >
                  {messages.navbar.bookDemo}
                </Button>
                <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: 'rgba(26,20,15,0.74)' }}>
                  {getCommercialCopy(locale).sampleWalkthrough}
                </p>
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
      className="group relative flex items-stretch cursor-pointer bg-white/[0.02] hover:bg-[var(--surface-hover)] transition-colors duration-300"
      role="button"
      tabIndex={0}
      onClick={() => cta(layer.href, `view_${layer.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "platform" })}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cta(layer.href, `view_${layer.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "platform" }); } }}
    >
      {/* Meniscus rail - this layer's colour, the edge of the stratum */}
      <div className={`w-1.5 flex-shrink-0 bg-gradient-to-b ${accent} opacity-70 group-hover:w-2.5 group-hover:opacity-100 transition-all duration-300`} aria-hidden />

      <div className="flex-1 grid grid-cols-[1fr_auto] lg:grid-cols-[2rem_minmax(11rem,14rem)_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-3 px-5 lg:px-7 py-5 lg:py-6">
        {/* Index - the stratum number */}
        <div className="hidden lg:block font-mono text-[11px] tracking-widest text-[var(--text-muted)]/70 tabular-nums">
          {indexLabel}<span className="opacity-40"> {countLabel}</span>
        </div>

        {/* Icon + name + subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 bg-gradient-to-br ${accent} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <SundaeIcon name={icon} size="sm" className="text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-snug">{layer.name}</h3>
            <p className="mt-0.5 text-sm text-[var(--text-muted)] font-medium leading-snug">{layer.subtitle}</p>
          </div>
        </div>

        {/* Description - hidden on mobile, shown full-width below instead */}
        <p className="hidden lg:block text-[15px] text-[var(--text-supporting)] leading-relaxed">{layer.description}</p>

        {/* Learn more */}
        <span className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-warm)] group-hover:text-[var(--text-primary)] transition-colors whitespace-nowrap justify-self-end">
          {learnMoreLabel} <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>

        {/* Mobile arrow */}
        <span className="lg:hidden text-[var(--text-warm)] group-hover:translate-x-1 transition-transform justify-self-end" aria-hidden>&rarr;</span>

        {/* Mobile description - spans full row */}
        <p className="lg:hidden col-span-2 text-sm text-[var(--text-supporting)] leading-relaxed">{layer.description}</p>
      </div>
    </div>
  );
}
