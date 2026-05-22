"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { ElegantShape } from "@/components/ui/ElegantShape";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { REPORT_APP_URL } from "@/lib/urls";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import {
  ExecutiveBriefingMockup,
  RevenueIntelligenceMockup,
  PulseDashboardMockup,
  LaborOpsMockup,
  IntegrationsHubMockup,
  MarketingPerformanceMockup,
  BenchmarkDashboardMockup,
} from "@/components/ui/MockupFrame";

/* ─── Structure: slugs, icons, accents (no translation) ─── */

type PersonaStructure = {
  slug: string;
  icon: SundaeIconName;
  accent: string;
};

const groupStructure: { personas: PersonaStructure[] }[] = [
  {
    personas: [
      { slug: "c-suite-executives", icon: "owners", accent: "from-[#1C47FF] to-[#3B82F6]" },
      { slug: "finance-teams", icon: "finance", accent: "from-[#0EA5E9] to-[#0284C7]" },
      { slug: "multi-location-groups", icon: "benchmarking", accent: "from-[#6366F1] to-[#4F46E5]" },
    ],
  },
  {
    personas: [
      { slug: "regional-managers", icon: "operators", accent: "from-[#EF4444] to-[#DC2626]" },
      { slug: "hr-teams", icon: "support", accent: "from-[#F59E0B] to-[#D97706]" },
      { slug: "hospitality-operators", icon: "regional", accent: "from-[#A855F7] to-[#7C3AED]" },
    ],
  },
  {
    personas: [
      { slug: "marketing-teams", icon: "marketing", accent: "from-[#EC4899] to-[#BE185D]" },
      { slug: "technology-teams", icon: "data", accent: "from-[#0EA5E9] to-[#3B82F6]" },
    ],
  },
  {
    personas: [
      { slug: "cloud-kitchens", icon: "delivery", accent: "from-[#22C55E] to-[#16A34A]" },
      { slug: "franchises", icon: "network", accent: "from-[#F59E0B] to-[#EF4444]" },
    ],
  },
];

/* ─── i18n copy ─── */

type LocalizedHub = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  nowShowingPrefix: string;
  primaryCta: string;
  secondaryCta: string;
  shapedByLabel: string;
  formats: string[];
  closingEyebrow: string;
  closingTitle: string;
  closingDescription: string;
  closingPrimaryCta: string;
  closingSecondaryCta: string;
  rotatingLabels: string[];
  groups: Array<{
    eyebrow: string;
    title: string;
    description: string;
    seeSolutionPrefix: string;
    personas: Array<{ title: string; tagline: string }>;
  }>;
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedHub> = {
  en: {
    badge: "SOLUTIONS · BY ROLE",
    titleLine1: "One platform.",
    titleLine2: "Every role you run.",
    description: "Decision intelligence built around the person reading it — from the executive office to the floor.",
    nowShowingPrefix: "Now showing:",
    primaryCta: "Book a Working Session",
    secondaryCta: "Start with Report Lite",
    shapedByLabel: "Shaped by restaurant operators across",
    formats: ["QSR", "Casual Dining", "Fine Dining", "Cloud Kitchens", "Hospitality Groups", "Multi-Brand Operators"],
    closingEyebrow: "NOT SURE WHICH ONE",
    closingTitle: "We'll tailor the session to your team.",
    closingDescription: "30 minutes. Your data. The view that would matter most to the people in the room.",
    closingPrimaryCta: "Book a Guided Tour",
    closingSecondaryCta: "See Platform Overview",
    rotatingLabels: ["C-Suite & Owners", "Finance & FP&A", "Operations", "Marketing", "People & HR", "Tech & Data", "Multi-brand groups"],
    groups: [
      {
        eyebrow: "LEADERSHIP & STRATEGY",
        title: "Run the portfolio with one source of truth.",
        description: "Decision intelligence built for the executive office, the finance function, and the group that owns the brands.",
        seeSolutionPrefix: "See",
        personas: [
          { title: "C-Suite & Owners", tagline: "Daily AI briefings across every brand. Margin variance the day it happens." },
          { title: "Finance & FP&A", tagline: "Close in hours. Trace every dollar to the event that moved it." },
          { title: "Multi-Location Groups", tagline: "Portfolio rollup, brand-vs-brand benchmarks, group-level strategic signal." },
        ],
      },
      {
        eyebrow: "OPERATIONS & PEOPLE",
        title: "Steer the floor while the shift is still running.",
        description: "Live operational intelligence for the people closest to the guest, the schedule, and the service.",
        seeSolutionPrefix: "See",
        personas: [
          { title: "Regional & Area Managers", tagline: "Run twelve outlets like you're standing in one. Pacing flags the site that needs you now." },
          { title: "HR & People", tagline: "Live labor variance. OT risk flagged before it lands. Schedules built from demand." },
          { title: "Hospitality Operators", tagline: "Every F&B outlet — restaurant, banquet, IRD, lobby — in one unified live view." },
        ],
      },
      {
        eyebrow: "GROWTH & TECHNOLOGY",
        title: "Build, market, and govern at scale.",
        description: "Tightly-defined intelligence layers for the teams that grow the brand and own the data.",
        seeSolutionPrefix: "See",
        personas: [
          { title: "Marketing Leads", tagline: "Campaign ROI tied to net margin in 24h. Reallocate budget while it still matters." },
          { title: "Technology & Data", tagline: "12 sources, one governed schema. RBAC, audit trails, public API, webhooks." },
        ],
      },
      {
        eyebrow: "SPECIALIZED FORMATS",
        title: "Built for how restaurants actually run today.",
        description: "Format-specific intelligence for cloud kitchens, virtual brands, and franchise networks.",
        seeSolutionPrefix: "See",
        personas: [
          { title: "Cloud Kitchens & Virtual Brands", tagline: "Net margin per platform, per brand. Six dashboards collapsed into one ledger." },
          { title: "Franchises & Franchisors", tagline: "Brand standards measured live. Royalty reconciliation automated. Peer benchmarks anonymous." },
        ],
      },
    ],
  },
  ar: {
    badge: "الحلول · حسب الدور",
    titleLine1: "منصة واحدة.",
    titleLine2: "لكل دور تديره.",
    description: "ذكاء القرار مصمم حول الشخص الذي يقرأه — من المكتب التنفيذي إلى الموقع.",
    nowShowingPrefix: "نعرض الآن:",
    primaryCta: "احجز جلسة عمل",
    secondaryCta: "ابدأ بـ Report Lite",
    shapedByLabel: "صاغته مجموعات مطاعم في",
    formats: ["الوجبات السريعة", "المطاعم العائلية", "المطاعم الراقية", "المطابخ السحابية", "مجموعات الضيافة", "المشغّلين متعددي العلامات"],
    closingEyebrow: "غير متأكد أيها يناسبك",
    closingTitle: "سنصمم الجلسة لفريقك.",
    closingDescription: "30 دقيقة. بياناتك. العرض الأهم للأشخاص في الاجتماع.",
    closingPrimaryCta: "احجز جولة موجهة",
    closingSecondaryCta: "شاهد نظرة عامة على المنصة",
    rotatingLabels: ["القيادة التنفيذية والمالكون", "المالية و FP&A", "العمليات", "التسويق", "الموارد البشرية", "التقنية والبيانات", "المجموعات متعددة العلامات"],
    groups: [
      {
        eyebrow: "القيادة والاستراتيجية",
        title: "أدر المحفظة بمصدر حقيقة واحد.",
        description: "ذكاء قرار مصمم للمكتب التنفيذي والإدارة المالية والمجموعة التي تملك العلامات.",
        seeSolutionPrefix: "شاهد",
        personas: [
          { title: "القيادة التنفيذية والمالكون", tagline: "إحاطات يومية بالذكاء الاصطناعي عبر كل علامة. تباين الهامش لحظياً." },
          { title: "المالية و FP&A", tagline: "أقفل في ساعات. تتبع كل دولار إلى الحدث الذي حركه." },
          { title: "المجموعات متعددة المواقع", tagline: "تجميع محفظة، معايير علامة بعلامة، إشارة استراتيجية على مستوى المجموعة." },
        ],
      },
      {
        eyebrow: "العمليات والكوادر",
        title: "وجّه الموقع وهو لا يزال يعمل.",
        description: "ذكاء تشغيلي حي للأشخاص الأقرب إلى الضيف والجدول والخدمة.",
        seeSolutionPrefix: "شاهد",
        personas: [
          { title: "المدراء الإقليميون", tagline: "أدر اثني عشر موقعاً وكأنك في واحد. الوتيرة تنبه للموقع الذي يحتاجك الآن." },
          { title: "الموارد البشرية", tagline: "تباين عمالة حي. خطر OT يُكتشف قبل تسجيله. جداول مبنية من الطلب." },
          { title: "مشغّلو الضيافة", tagline: "كل منفذ F&B — مطعم، بانكيت، خدمة غرف، لوبي — في عرض حي موحد." },
        ],
      },
      {
        eyebrow: "النمو والتقنية",
        title: "ابنِ وسوّق وأحكم على نطاق واسع.",
        description: "طبقات ذكاء محكمة التعريف للفِرَق التي تنمي العلامة وتملك البيانات.",
        seeSolutionPrefix: "شاهد",
        personas: [
          { title: "قادة التسويق", tagline: "ROI حملة مرتبط بصافي الهامش خلال 24 ساعة. أعد توزيع الميزانية وهي لا تزال تؤثر." },
          { title: "التقنية والبيانات", tagline: "12 مصدراً، مخطط محكوم واحد. RBAC، تتبع، API عامة، webhooks." },
        ],
      },
      {
        eyebrow: "الصيغ المتخصصة",
        title: "مصمم لكيفية تشغيل المطاعم اليوم.",
        description: "ذكاء حسب الصيغة للمطابخ السحابية والعلامات الافتراضية وشبكات الامتياز.",
        seeSolutionPrefix: "شاهد",
        personas: [
          { title: "المطابخ السحابية والعلامات الافتراضية", tagline: "صافي هامش لكل منصة ولكل علامة. ست لوحات تنهار في دفتر واحد." },
          { title: "الامتيازات وأصحاب الامتياز", tagline: "معايير علامة مقاسة حياً. تسوية إتاوة آلية. معايير نظراء مجهولة." },
        ],
      },
    ],
  },
  fr: {
    badge: "SOLUTIONS · PAR RÔLE",
    titleLine1: "Une plateforme.",
    titleLine2: "Chaque rôle que vous pilotez.",
    description: "L'intelligence décisionnelle pensée pour la personne qui la lit — du bureau exécutif jusqu'à la salle.",
    nowShowingPrefix: "Affiché maintenant :",
    primaryCta: "Réserver une session de travail",
    secondaryCta: "Commencer avec Report Lite",
    shapedByLabel: "Façonné par des opérateurs de restauration",
    formats: ["QSR", "Restauration décontractée", "Gastronomie", "Cuisines virtuelles", "Groupes hôteliers", "Opérateurs multi-marques"],
    closingEyebrow: "PAS SÛR DU CHOIX",
    closingTitle: "Nous adaptons la session à votre équipe.",
    closingDescription: "30 minutes. Vos données. La vue qui compte le plus pour les personnes présentes.",
    closingPrimaryCta: "Réserver une visite guidée",
    closingSecondaryCta: "Voir l'aperçu plateforme",
    rotatingLabels: ["Dirigeants & propriétaires", "Finance & FP&A", "Opérations", "Marketing", "RH & People", "Tech & Data", "Groupes multi-marques"],
    groups: [
      {
        eyebrow: "DIRECTION & STRATÉGIE",
        title: "Pilotez le portefeuille avec une seule source de vérité.",
        description: "Intelligence décisionnelle pour la direction, la finance, et le groupe qui possède les marques.",
        seeSolutionPrefix: "Voir",
        personas: [
          { title: "Dirigeants & propriétaires", tagline: "Briefings IA quotidiens sur chaque marque. Variance de marge en temps réel." },
          { title: "Finance & FP&A", tagline: "Clôture en heures. Tracez chaque euro à l'événement qui l'a déplacé." },
          { title: "Groupes multi-sites", tagline: "Rollup portefeuille, benchmarks marque-vs-marque, signal stratégique groupe." },
        ],
      },
      {
        eyebrow: "OPÉRATIONS & PEOPLE",
        title: "Pilotez la salle pendant que le service tourne.",
        description: "Intelligence opérationnelle pour les gens les plus proches du client, du planning et du service.",
        seeSolutionPrefix: "Voir",
        personas: [
          { title: "Managers régionaux", tagline: "Pilotez douze sites comme si vous y étiez. Le rythme signale le site qui a besoin de vous." },
          { title: "RH & People", tagline: "Variance main-d'œuvre live. Risque heures sup' avant la paie. Plannings tirés de la demande." },
          { title: "Opérateurs hôtellerie", tagline: "Chaque point F&B — restaurant, banqueting, room service, lobby — dans une vue unifiée." },
        ],
      },
      {
        eyebrow: "CROISSANCE & TECHNOLOGIE",
        title: "Construisez, marketez, gouvernez à l'échelle.",
        description: "Couches d'intelligence pour les équipes qui font grandir la marque et possèdent les données.",
        seeSolutionPrefix: "Voir",
        personas: [
          { title: "Responsables marketing", tagline: "ROI campagne lié à la marge nette en 24h. Réallouez pendant que ça compte." },
          { title: "Tech & Data", tagline: "12 sources, un schéma gouverné. RBAC, audit, API publique, webhooks." },
        ],
      },
      {
        eyebrow: "FORMATS SPÉCIALISÉS",
        title: "Conçu pour la restauration d'aujourd'hui.",
        description: "Intelligence par format pour cuisines virtuelles, marques virtuelles et réseaux de franchise.",
        seeSolutionPrefix: "Voir",
        personas: [
          { title: "Cuisines virtuelles & dark kitchens", tagline: "Marge nette par plateforme, par marque. Six dashboards en un livre." },
          { title: "Franchises & franchiseurs", tagline: "Standards de marque mesurés live. Royalties automatisées. Benchmarks pairs anonymes." },
        ],
      },
    ],
  },
  es: {
    badge: "SOLUCIONES · POR ROL",
    titleLine1: "Una plataforma.",
    titleLine2: "Cada rol que diriges.",
    description: "Inteligencia de decisión construida alrededor de la persona que la lee — desde la dirección hasta el local.",
    nowShowingPrefix: "Mostrando ahora:",
    primaryCta: "Reservar sesión de trabajo",
    secondaryCta: "Empezar con Report Lite",
    shapedByLabel: "Forjada por operadores de restaurantes en",
    formats: ["QSR", "Casual", "Alta cocina", "Cocinas en la nube", "Grupos de hospitalidad", "Operadores multi-marca"],
    closingEyebrow: "¿NO SABES CUÁL ELEGIR?",
    closingTitle: "Adaptamos la sesión a tu equipo.",
    closingDescription: "30 minutos. Tus datos. La vista que más importa para las personas en la sala.",
    closingPrimaryCta: "Reservar tour guiado",
    closingSecondaryCta: "Ver vista de plataforma",
    rotatingLabels: ["Alta dirección y propietarios", "Finanzas y FP&A", "Operaciones", "Marketing", "RR.HH. y People", "Tech y Data", "Grupos multi-marca"],
    groups: [
      {
        eyebrow: "LIDERAZGO Y ESTRATEGIA",
        title: "Lidera el portafolio con una sola fuente de verdad.",
        description: "Inteligencia de decisión para la dirección, finanzas y el grupo dueño de las marcas.",
        seeSolutionPrefix: "Ver",
        personas: [
          { title: "Alta dirección y propietarios", tagline: "Briefings de IA diarios en cada marca. Varianza de margen el día que ocurre." },
          { title: "Finanzas y FP&A", tagline: "Cierra en horas. Traza cada dólar al evento que lo movió." },
          { title: "Grupos multi-marca", tagline: "Rollup de portafolio, benchmarks marca contra marca, señal estratégica de grupo." },
        ],
      },
      {
        eyebrow: "OPERACIONES Y PEOPLE",
        title: "Dirige el local mientras el turno aún corre.",
        description: "Inteligencia operativa para quienes están más cerca del huésped, del horario y del servicio.",
        seeSolutionPrefix: "Ver",
        personas: [
          { title: "Gerentes regionales", tagline: "Opera doce locales como si estuvieras en uno. El ritmo señala el local que te necesita." },
          { title: "RR.HH. y People", tagline: "Varianza de personal en vivo. Riesgo OT antes del cierre. Horarios desde la demanda." },
          { title: "Operadores de hospitalidad", tagline: "Cada punto A&B — restaurante, banquetes, room service, lobby — en una vista unificada." },
        ],
      },
      {
        eyebrow: "CRECIMIENTO Y TECNOLOGÍA",
        title: "Construye, comercializa y gobierna a escala.",
        description: "Capas de inteligencia para los equipos que hacen crecer la marca y son dueños de los datos.",
        seeSolutionPrefix: "Ver",
        personas: [
          { title: "Responsables de marketing", tagline: "ROI de campaña ligado al margen neto en 24h. Reasigna mientras importa." },
          { title: "Tech y Data", tagline: "12 fuentes, un esquema gobernado. RBAC, auditoría, API pública, webhooks." },
        ],
      },
      {
        eyebrow: "FORMATOS ESPECIALIZADOS",
        title: "Construido para cómo opera la restauración hoy.",
        description: "Inteligencia por formato para cocinas en la nube, marcas virtuales y redes de franquicia.",
        seeSolutionPrefix: "Ver",
        personas: [
          { title: "Cocinas en la nube y marcas virtuales", tagline: "Margen neto por plataforma, por marca. Seis dashboards en un libro." },
          { title: "Franquicias y franquiciadores", tagline: "Estándares de marca medidos en vivo. Conciliación de regalías automatizada. Benchmarks anónimos." },
        ],
      },
    ],
  },
};

/* ─── Rotating hero mockup ─── */

const ROTATING_MOCKUPS = [
  ExecutiveBriefingMockup,
  RevenueIntelligenceMockup,
  PulseDashboardMockup,
  MarketingPerformanceMockup,
  LaborOpsMockup,
  IntegrationsHubMockup,
  BenchmarkDashboardMockup,
];
const ROTATION_MS = 5000;

export default function SolutionsHubPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? localizedCopy.en;
  const [activeIdx, setActiveIdx] = useState(0);
  const ActiveMockup = ROTATING_MOCKUPS[activeIdx];
  const activeLabel = copy.rotatingLabels[activeIdx] ?? "";

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % ROTATING_MOCKUPS.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--navy-deep)] overflow-x-hidden">
        {/* HERO */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,71,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid-texture" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-white/[0.03]" className="left-[-10%] top-[15%]" />
            <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-white/[0.02]" className="right-[-5%] top-[60%]" />
            <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-white/[0.025]" className="left-[5%] bottom-[10%]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-[rgba(28,71,255,0.12)] border border-[rgba(28,71,255,0.2)] text-[#60A5FA]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
                  {copy.badge}
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="hero-h1 mb-6 text-balance">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{copy.titleLine1}</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-white to-[#93C5FD]">{copy.titleLine2}</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="body-xl max-w-xl mb-3">
                {copy.description}
              </motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-sm uppercase tracking-[0.2em] text-[#60A5FA]/80 mb-10 font-semibold">
                {copy.nowShowingPrefix} <span className="text-[#60A5FA]">{activeLabel}</span>
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
                <Link href="/demo"><Button variant="primary" size="lg">{copy.primaryCta}</Button></Link>
                <a href={REPORT_APP_URL}><Button variant="outline-light" size="lg">{copy.secondaryCta}</Button></a>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} className="lg:pl-4" style={{ perspective: "1200px" }}>
              <motion.div initial={{ rotateX: 6 }} animate={{ rotateX: 1.5 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeIdx} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                    <ActiveMockup />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SHAPED BY */}
        <section aria-label="Operator coverage" className="relative border-y border-[var(--border-default)] py-8 px-4 sm:px-6 lg:px-8 bg-white/[0.015]">
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold mb-3">
              {copy.shapedByLabel}
            </p>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:text-base text-[var(--text-secondary)]">
              {copy.formats.map((f, i) => (
                <span key={f} className="flex items-center gap-x-3">
                  <span className="font-medium">{f}</span>
                  {i < copy.formats.length - 1 && <span aria-hidden className="text-[var(--text-faint)]">·</span>}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* GROUPS */}
        {copy.groups.map((group, gi) => {
          const structure = groupStructure[gi];
          return (
            <section key={gi} className="relative py-20 px-4 sm:px-6 lg:px-8">
              <div className={`absolute inset-0 ${gi % 2 === 0 ? "bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.04),transparent_60%)]" : "bg-mesh"}`} />
              <div className="relative z-10 max-w-7xl mx-auto">
                <FadeUp className="text-center max-w-3xl mx-auto mb-12">
                  <p className="eyebrow mb-4">{group.eyebrow}</p>
                  <h2 className="section-h2 text-[var(--text-primary)] mb-4 text-balance">{group.title}</h2>
                  <p className="body-lg text-[var(--text-supporting)]">{group.description}</p>
                </FadeUp>

                <StaggerContainer
                  className={`grid gap-5 ${group.personas.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
                >
                  {group.personas.map((p, pi) => {
                    const s = structure.personas[pi];
                    return (
                      <StaggerItem key={s.slug}>
                        <Link href={`/solutions/${s.slug}`} className="group block h-full">
                          <div className="h-full p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(28,71,255,0.3)] hover:shadow-[0_0_40px_rgba(28,71,255,0.10)] transition-all duration-300 hover:-translate-y-1">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white shadow-lg mb-5`}>
                              <SundaeIcon name={s.icon} size="md" className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 leading-snug">{p.title}</h3>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">{p.tagline}</p>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#60A5FA] group-hover:text-[var(--text-primary)] transition-colors">
                              {group.seeSolutionPrefix} {p.title}
                              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                            </span>
                          </div>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </section>
          );
        })}

        {/* CLOSING CTA */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grad-deep">
          <div className="absolute inset-0 bg-grid-texture" />
          <ElegantShape delay={0} width={400} height={100} rotate={-12} gradient="from-white/[0.03]" className="left-[-8%] top-[20%]" />
          <ElegantShape delay={0.2} width={300} height={80} rotate={15} gradient="from-white/[0.02]" className="right-[-5%] bottom-[10%]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.06),transparent_70%)]" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <FadeUp>
              <p className="eyebrow mb-4">{copy.closingEyebrow}</p>
              <h2 className="section-h2 mb-4">{copy.closingTitle}</h2>
              <p className="body-lg mb-10 max-w-xl mx-auto">{copy.closingDescription}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo"><Button variant="cta" size="lg">{copy.closingPrimaryCta}</Button></Link>
                <Link href="/product"><Button variant="outline-light" size="lg">{copy.closingSecondaryCta}</Button></Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
