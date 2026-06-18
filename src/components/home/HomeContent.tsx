'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion, MotionConfig } from "framer-motion";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { SIGNUP_URL } from "@/lib/urls";
import { ElegantShape } from "@/components/ui/ElegantShape";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { HeroLiveDashboard } from "./HeroLiveDashboard";
import { SectionEditorialBand } from "./sections/SectionEditorialBand";
import { SectionEditorialSplit } from "./sections/SectionEditorialSplit";
import { SectionCreamRelief } from "./sections/SectionCreamRelief";
import { SectionManifesto } from "./sections/SectionManifesto";
import { SectionShiftMoment } from "./sections/SectionShiftMoment";
import { SectionOperatorVoice } from "./sections/SectionOperatorVoice";
import { SectionEcosystemStrip } from "./sections/SectionEcosystemStrip";
import { SundaeWordmark } from "./sections/SundaeWordmark";
import { editorialCopy, type EditorialCopy } from "./sections/editorialCopy";
import { closerLineCopy } from "./closerCopy";
import { heroDashboardCopy } from "./heroDashboardCopy";
import { SectionSpeedQualityCost } from "./sections/SectionSpeedQualityCost";
import { SectionWhatYouRetire } from "./sections/SectionWhatYouRetire";
import { SectionThreeMoats } from "./sections/SectionThreeMoats";
import { Section4DScene } from "./sections/Section4DScene";
import { SectionCrewSubstrate } from "./sections/SectionCrewSubstrate";
import { HomeScrollSpine, type HomeChapter } from "./HomeScrollSpine";

// The homepage's seven chapters, mirroring the hero glass's seven strata. As the
// reader descends, the spine fills with this warm palette - the page becomes the
// glass filling up - and each node jumps to its chapter.
const HOME_CHAPTERS: Omit<HomeChapter, "label">[] = [
  { id: "chapter-overview", color: "#E03E48" },
  { id: "chapter-shift", color: "#FF5C4D" },
  { id: "chapter-platform", color: "#FF7E6F" },
  { id: "chapter-moats", color: "#F7A088" },
  { id: "chapter-crew", color: "#E9A24A" },
  { id: "chapter-proof", color: "#F6C66B" },
  { id: "chapter-cta", color: "#F6F1E8" },
];

// Localized chapter labels (order matches HOME_CHAPTERS). Short, native nav
// labels - "Crew" is the product name, kept literal in every locale.
const CHAPTER_LABELS: Record<string, string[]> = {
  en: ["Every layer", "The shift", "The platform", "The moat", "Crew", "Proof", "Your move"],
  fr: ["Chaque couche", "Le service", "La plateforme", "L'avantage", "Crew", "Preuves", "À vous de jouer"],
  es: ["Cada capa", "El turno", "La plataforma", "La ventaja", "Crew", "Pruebas", "Te toca"],
  de: ["Jede Ebene", "Die Schicht", "Die Plattform", "Der Vorsprung", "Crew", "Belege", "Ihr Zug"],
  nl: ["Elke laag", "De dienst", "Het platform", "De voorsprong", "Crew", "Bewijs", "Jouw beurt"],
  pt: ["Cada camada", "O turno", "A plataforma", "A vantagem", "Crew", "Provas", "É a sua vez"],
  it: ["Ogni livello", "Il turno", "La piattaforma", "Il vantaggio", "Crew", "Prove", "Tocca a te"],
  pl: ["Każda warstwa", "Zmiana", "Platforma", "Przewaga", "Crew", "Dowody", "Twój ruch"],
  ro: ["Fiecare strat", "Tura", "Platforma", "Avantajul", "Crew", "Dovezi", "Rândul tău"],
  sv: ["Varje lager", "Passet", "Plattformen", "Försprånget", "Crew", "Bevis", "Din tur"],
  tr: ["Her katman", "Vardiya", "Platform", "Avantaj", "Crew", "Kanıt", "Sıra sizde"],
  id: ["Setiap lapisan", "Shift", "Platform", "Keunggulan", "Crew", "Bukti", "Giliran Anda"],
  ms: ["Setiap lapisan", "Syif", "Platform", "Kelebihan", "Crew", "Bukti", "Giliran anda"],
  vi: ["Mọi tầng", "Ca làm", "Nền tảng", "Lợi thế", "Crew", "Bằng chứng", "Lượt của bạn"],
  hi: ["हर परत", "शिफ्ट", "प्लेटफ़ॉर्म", "बढ़त", "Crew", "प्रमाण", "आपकी बारी"],
  ur: ["ہر پرت", "شفٹ", "پلیٹ فارم", "برتری", "Crew", "ثبوت", "آپ کی باری"],
  bn: ["প্রতিটি স্তর", "শিফট", "প্ল্যাটফর্ম", "সুবিধা", "Crew", "প্রমাণ", "আপনার পালা"],
  th: ["ทุกชั้น", "กะ", "แพลตฟอร์ม", "ความได้เปรียบ", "Crew", "หลักฐาน", "ตาคุณแล้ว"],
  "zh-Hans": ["每一层", "营业班次", "平台", "护城河", "Crew", "实证", "该你了"],
  ja: ["すべての層", "シフト", "プラットフォーム", "優位性", "Crew", "実証", "あなたの番"],
  ko: ["모든 계층", "시프트", "플랫폼", "우위", "Crew", "증거", "당신 차례"],
};
import { SectionPersonaSwitcher } from "./sections/SectionPersonaSwitcher";
import { SectionProof } from "./sections/SectionProof";
import { SectionTrustStrip } from "./sections/SectionTrustStrip";
// SectionProductGallery (the full 18-card persona-filtered version) is
// preserved at its original path for reuse on product + solutions pages.
// Homepage shows only the slim 4-card teaser per Option B from review.
// SectionCommercialHubs moved to /about page (presence section).

/* ─── Data ─────────────────────────────────────────────────────── */

/**
 * Render copy with the standalone brand name "Sundae" swapped for the wordmark
 * (where Sundae is the subject). Brand name is constant across all 22 locales, so
 * splitting on it is locale-safe; the product lockup "Sundae Intelligence" is left
 * as text so the wordmark never breaks a product name.
 */
function withWordmark(text: string, markClassName: string) {
  return text.split(/(\bSundae\b(?!\s+Intelligence))/g).map((part, i) =>
    part === "Sundae" ? (
      // aria-hidden wordmark + sr-only text so screen readers announce "Sundae"
      // once AND raw textContent (SEO / extraction) still reads the brand name.
      <span key={i} className="inline-flex items-baseline">
        <SundaeWordmark aria-hidden className={markClassName} />
        <span className="sr-only">Sundae</span>
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/* ─── Component ────────────────────────────────────────────────── */

export default function HomeContent() {
  const { messages, locale } = useWebsiteI18n();
  const home = messages.home;
  const editorial: EditorialCopy =
    editorialCopy[locale as keyof typeof editorialCopy] ?? editorialCopy.en;
  const platform = home.platform;
  const heroDash = heroDashboardCopy[locale as keyof typeof heroDashboardCopy] ?? heroDashboardCopy.en;
  const closerLine = closerLineCopy[locale as keyof typeof closerLineCopy] ?? closerLineCopy.en;
  const cta = useCta();
  // Defer reduced-motion to after mount so SSR and the first client render
  // always take the full-motion path (framer's reducedMotion="user" strips
  // transform-initials on a reduced client, which otherwise mismatches the
  // server-rendered HTML and forces a full client regeneration).
  const [motionReady, setMotionReady] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMotionReady(true), []);

  // The six Intelligence Layers, rendered as one stacked operating layer
  // (the glass metaphor). Keyed by layer.name (brand names stay constant
  // across locales, so the icon/accent lookup holds).
  const layerIcons: Record<string, SundaeIconName> = {
    Pulse: "pulse",
    Benchmarks: "benchmarking",
    Watchtower: "watchtower",
    Insights: "insights",
    "Sundae Intelligence": "intelligence",
    Foresight: "forecasting",
  };

  const layerAccents: Record<string, string> = {
    Pulse: "from-[#FF5C4D] to-[#E03E48]",
    Benchmarks: "from-[#84A35C] to-[#5E7E3A]",
    Watchtower: "from-[#F59E0B] to-[#D97706]",
    Insights: "from-[#A8567E] to-[#7E3A5C]",
    "Sundae Intelligence": "from-[#EC6A89] to-[#C9456A]",
    Foresight: "from-[#5E9E96] to-[#3D7A70]",
  };

  return (
    <MotionConfig reducedMotion={motionReady ? "user" : "never"}>
      <>
        <HomeScrollSpine
          chapters={HOME_CHAPTERS.map((c, i) => ({
            ...c,
            label: (CHAPTER_LABELS[locale] ?? CHAPTER_LABELS.en)[i],
          }))}
        />
        {/* ════════════════════════════════════════════════
            1. HERO - Dark, category-defining
        ════════════════════════════════════════════════ */}
        <section id="chapter-overview" className="relative scroll-mt-24 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,92,77,0.13),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_82%_28%,rgba(242,166,90,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-grid-texture" />

          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-white/[0.03]" className="left-[-10%] top-[15%]" />
            <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-white/[0.02]" className="right-[-5%] top-[70%]" />
            <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-white/[0.025]" className="left-[5%] bottom-[5%]" />
          </div>

          {/* Editorial backdrop - grounds the product hero in the restaurant world.
              Heavily darkened, blurred and vignetted into the page bg so it reads as
              atmosphere, never as a stock photo; the dashboard (z-20) floats over it. */}
          <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* light mode: a BRIGHT editorial photo under a warm-cream wash, so the
                hero has real depth + warmth (not a flat cream panel). The central
                white-ish scrim keeps the dark hero copy fully legible. */}
            <Image
              src="/images/editorial/dining-room.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center hidden [html.light_&]:block opacity-[0.55]"
            />
            <div
              className="absolute inset-0 hidden [html.light_&]:block"
              style={{
                background:
                  'radial-gradient(ellipse 75% 55% at 80% 10%, rgba(255,92,77,0.16) 0%, transparent 52%), radial-gradient(ellipse 85% 65% at 14% 4%, rgba(233,162,74,0.22) 0%, transparent 54%), radial-gradient(ellipse 62% 52% at 50% 40%, rgba(255,250,245,0.86) 0%, rgba(255,246,239,0.42) 46%, transparent 72%), linear-gradient(180deg, rgba(255,246,239,0.32) 0%, rgba(255,255,255,0.55) 60%, #FFFFFF 96%)',
              }}
            />
            <Image
              src="/images/editorial/atmosphere.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-105 opacity-[0.7] [html.light_&]:opacity-0"
            />
            {/* warm grade - strong caramel/coral so the room reads unmistakably warm (V2 feel) */}
            <div
              className="absolute inset-0 mix-blend-soft-light opacity-90 [html.light_&]:opacity-0"
              style={{
                background:
                  'radial-gradient(ellipse 85% 75% at 64% 30%, rgba(233,162,74,0.65) 0%, transparent 62%), radial-gradient(ellipse 70% 60% at 18% 88%, rgba(255,92,77,0.5) 0%, transparent 60%)',
              }}
            />
            {/* soft radial scrim ONLY behind the centered copy - keeps the photo visible */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 64% 52% at 50% 36%, color-mix(in srgb, var(--navy-deep) 80%, transparent) 0%, color-mix(in srgb, var(--navy-deep) 30%, transparent) 55%, transparent 75%)',
              }}
            />
            {/* light top + bottom grounding into the page bg */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--navy-deep)] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--navy-deep)] via-[var(--navy-deep)]/80 to-transparent" />
            {/* gentle side feathers */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, var(--navy-deep) 0%, transparent 18%, transparent 82%, var(--navy-deep) 100%)',
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-20">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex justify-center mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-[rgba(255,92,77,0.12)] border border-[rgba(255,92,77,0.28)] text-[#FF8473]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF8473] animate-pulse" />
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
              <h2 className="section-h2 mb-5 max-w-3xl mx-auto" aria-label={`${home.titleTop} ${home.titleBottom}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-primary)]/80">
                  {home.titleTop}
                </span>{" "}
                <br />
                <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#E9A24A] via-[#FF7E6F] to-[#FF5C4D]">
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

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="body-lg max-w-xl mx-auto mb-10 text-[var(--text-supporting)]">
                {home.description}
                <span className="text-[var(--text-primary)] font-medium"> {withWordmark(home.descriptionEmphasis, "h-[0.66em] w-auto inline-block align-baseline mx-[0.08em] translate-y-[0.02em] text-[var(--text-primary)]")}</span>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Button
                variant="cta"
                size="lg"
                href="/demo"
                onClick={(e) => { e.preventDefault(); cta("/demo", "book_walkthrough_hero", { page: "/home" }); }}
              >
                {home.startFree}
              </Button>
            </motion.div>
            {home.noCard ? (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xs text-[var(--text-muted)]"
              >
                {home.noCard}
              </motion.p>
            ) : null}
          </div>

          {/* Hero CSS Mockup - Pulse Dashboard */}
          <motion.div
            id="pulse-live"
            className="max-w-5xl mx-auto mt-16 relative z-20 px-4 scroll-mt-24"
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
              <MockupFrame label={heroDash.frameLabel} glow>
                <HeroLiveDashboard />
              </MockupFrame>
            </motion.div>
          </motion.div>

          {/* Proof bar */}
          <motion.div
            className="max-w-4xl mx-auto mt-16 relative z-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div
              className="mx-auto flex max-w-3xl flex-wrap items-stretch justify-center divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10"
              style={{ backgroundColor: "rgba(13,9,6,0.96)" }}
            >
              {home.proofStats.map((item) => (
                <div key={item.label} className="min-w-[140px] flex-1 px-5 py-5 text-center sm:px-7">
                  <div className="font-display bg-gradient-to-r from-[#F8C96C] to-[#FF7E6F] bg-clip-text text-3xl font-semibold tabular-nums text-transparent sm:text-4xl">{item.number}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] sm:text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════
            1b. MANIFESTO - the belief beat (copy-first, before product earns its place)
        ════════════════════════════════════════════════ */}
        <SectionManifesto />

        {/* ════════════════════════════════════════════════
            2-signature. WATCH THE NIGHT TURN - the signature interaction.
            Scrub a service night; at 7:15 Sundae surfaces the signal you can
            still act on. The interactive proof of the manifesto/operator copy.
        ════════════════════════════════════════════════ */}
        <div id="chapter-shift" className="scroll-mt-24">
          <SectionShiftMoment />
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
        <SectionSpeedQualityCost />

        {/* ════════════════════════════════════════════════
            3. SIX LAYERS - Platform pillars
        ════════════════════════════════════════════════ */}
        <section id="chapter-platform" aria-labelledby="platform-heading" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 relative">
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

            {/* One vessel, six layers - the modules stack like the strata in
                the glass: a single operating system, not a grid of products. */}
            <FadeUp>
              <div className="relative mx-auto max-w-4xl rounded-3xl border border-[var(--border-default)] overflow-hidden divide-y divide-[var(--border-default)] bg-[var(--navy-deep)]/40 backdrop-blur shadow-[0_40px_90px_-50px_rgba(0,0,0,0.7)]">
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
            3a-band. HUMAN MOMENT - the brigade on the line
        ════════════════════════════════════════════════ */}
        <SectionEditorialBand
          src="/images/editorial/kitchen-brigade.jpg"
          objectPosition="center 72%"
          alt={editorial.band2.alt}
          eyebrow={editorial.band2.eyebrow}
          headline={withWordmark(
            editorial.band2.headline,
            "h-[0.72em] w-auto inline-block align-baseline translate-y-[0.02em] text-white"
          )}
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
        <div id="chapter-crew" className="scroll-mt-24">
          <SectionCrewSubstrate />
        </div>

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
          alt={editorial.closer.alt}
          eyebrow={editorial.closer.eyebrow}
          headline={
            <>
              {editorial.closer.headlineLead}{" "}
              <span className="text-[var(--warm-coral)]">{editorial.closer.headlineEmphasis}</span>
            </>
          }
          sub={editorial.closer.sub}
          imageSide="right"
        />

        {/* ════════════════════════════════════════════════
            7. CLOSING CTA
        ════════════════════════════════════════════════ */}
        <section id="chapter-cta" className="relative scroll-mt-24 py-24 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
          {/* photographic base - the floor, warm-graded */}
          <Image
            src="/images/editorial/dining-night.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.5]"
          />
          {/* warm gradient - the bold "punctuation" jolt that closes the page */}
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{ background: 'linear-gradient(135deg, rgba(233,162,74,0.95) 0%, rgba(255,92,77,0.95) 52%, rgba(224,62,72,0.96) 100%)' }}
          />
          <div
            className="absolute inset-0 opacity-75"
            style={{ background: 'linear-gradient(135deg, var(--warm-caramel) 0%, var(--warm-coral) 52%, var(--warm-cherry) 100%)' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(255,255,255,0.22),transparent_60%)]" />

          {/* the mark as a layout device - bleeds into the corner, not a sticker */}
          <div aria-hidden className="absolute -right-16 -bottom-24 w-[420px] sm:w-[520px] opacity-[0.12] text-white pointer-events-none">
            <SundaeWordmark className="w-full h-auto" />
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <FadeUp>
              <h2 className="section-h2 mb-4 !text-white">
                {home.closingTitle}
                <span className="mt-1 block text-[var(--ink)]">{withWordmark(closerLine, "h-[0.66em] w-auto inline-block align-baseline translate-y-[0.04em]")}</span>
              </h2>
              <p className="body-lg mb-10 max-w-xl mx-auto !text-white/90">
                {home.closingDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="ink"
                  size="lg"
                  onClick={() => cta("/demo", "book_demo_footer_cta", { page: "/home" })}
                >
                  {home.bookDemo}
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="!border-white/60 !text-white hover:!bg-white/15"
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
      className="group relative flex items-stretch cursor-pointer bg-white/[0.02] hover:bg-[var(--surface-hover)] transition-colors duration-300"
      role="button"
      tabIndex={0}
      onClick={() => cta(layer.href, `view_${layer.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "platform" })}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cta(layer.href, `view_${layer.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "platform" }); } }}
    >
      {/* Meniscus rail - this layer's colour, the edge of the stratum */}
      <div className={`w-1.5 flex-shrink-0 bg-gradient-to-b ${accent} opacity-70 group-hover:w-2.5 group-hover:opacity-100 transition-all duration-300`} aria-hidden />

      <div className="flex-1 grid grid-cols-[1fr_auto] md:grid-cols-[2.5rem_minmax(11rem,15rem)_1fr_auto] items-center gap-x-5 gap-y-2 px-5 md:px-7 py-5 md:py-6">
        {/* Index - the stratum number */}
        <div className="hidden md:block font-mono text-[11px] tracking-widest text-[var(--text-muted)]/70 tabular-nums">
          {indexLabel}<span className="opacity-40"> {countLabel}</span>
        </div>

        {/* Icon + name + subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 bg-gradient-to-br ${accent} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <SundaeIcon name={icon} size="sm" className="text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-[var(--text-primary)] leading-tight truncate">{layer.name}</h3>
            <p className="text-xs text-[var(--text-muted)] font-medium truncate">{layer.subtitle}</p>
          </div>
        </div>

        {/* Description - hidden on mobile, shown full-width below instead */}
        <p className="hidden md:block text-sm text-[var(--text-muted)] leading-relaxed">{layer.description}</p>

        {/* Learn more */}
        <span className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#FF8473] group-hover:text-[var(--text-primary)] transition-colors whitespace-nowrap justify-self-end">
          {learnMoreLabel} <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>

        {/* Mobile arrow */}
        <span className="md:hidden text-[#FF8473] group-hover:translate-x-1 transition-transform justify-self-end" aria-hidden>&rarr;</span>

        {/* Mobile description - spans full row */}
        <p className="md:hidden col-span-2 text-sm text-[var(--text-muted)] leading-relaxed">{layer.description}</p>
      </div>
    </div>
  );
}
