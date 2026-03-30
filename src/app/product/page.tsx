'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { REPORT_APP_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import {
  PulseDashboardMockup,
  BenchmarkDashboardMockup,
  WatchtowerMockup,
  InsightsModuleMockup,
  IntelligenceChatMockup,
  ForesightDashboardMockup,
} from "@/components/ui/MockupFrame";

type Pillar = {
  name: string;
  tagline: string;
  description: string;
  icon: SundaeIconName;
  features: string[];
  stat: string;
  statLabel: string;
  mockup: React.ComponentType;
};

type Copy = {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimary: string;
  heroSecondary: string;
  freeLabel: string;
  freeTitle: string;
  freeSubtitle: string;
  freeDescription: string;
  freeIncludes: string;
  freeCta: string;
  coreLabel: string;
  coreTitle: string;
  coreSubtitle: string;
  coreDescription: string;
  coreIncludes: string;
  coreCta: string;
  compareCta: string;
  layersEyebrow: string;
  layersTitle: string;
  layersDescription: string;
  ctaTitle: string;
  ctaDescription: string;
};

const copyMap: Record<'en' | 'ar' | 'fr' | 'es', Copy> = {
  en: {
    heroBadge: "The Sundae Platform",
    heroTitle: "179 Data Models. 12 Domains. One Truth.",
    heroDescription: "Six intelligence layers that turn fragmented restaurant data into decisions that compound - shift by shift, outlet by outlet.",
    heroPrimary: "Start Free with Report",
    heroSecondary: "Book a Demo",
    freeLabel: "FREE FOREVER",
    freeTitle: "Sundae Report",
    freeSubtitle: "Historical Analysis & Benchmarking",
    freeDescription: "Upload your data. See where you stand against peers. Performance benchmarks, margin patterns, and competitive positioning - free, forever.",
    freeIncludes: "Includes:",
    freeCta: "Explore Sundae Report →",
    coreLabel: "MOST POPULAR",
    coreTitle: "Sundae Core",
    coreSubtitle: "Real-Time Operations & Intelligence",
    coreDescription: "Everything in Report, plus live operations. Intraday pacing, market signals, 14 intelligence modules, predictive forecasting, and Sundae Coach recommendations.",
    coreIncludes: "Everything in Report, plus:",
    coreCta: "Explore Sundae Core →",
    compareCta: "Compare Report vs Core →",
    layersEyebrow: "SIX INTELLIGENCE LAYERS",
    layersTitle: "From Shift Floor to Boardroom",
    layersDescription: "Each layer handles a distinct dimension of restaurant performance. Together, they form a closed-loop intelligence system.",
    ctaTitle: "Start Free. Scale When Ready.",
    ctaDescription: "Historical benchmarking at no cost. Real-time operations when you need the edge.",
  },
  ar: {
    heroBadge: "منصة Sundae",
    heroTitle: "179 نموذج بيانات. 12 مجالاً. حقيقة واحدة.",
    heroDescription: "ست طبقات ذكاء تحول بيانات المطعم المتناثرة إلى قرارات تتراكم قيمتها - من الوردية إلى الموقع.",
    heroPrimary: "ابدأ مجاناً مع Report",
    heroSecondary: "احجز عرضاً",
    freeLabel: "مجاني للأبد",
    freeTitle: "Sundae Report",
    freeSubtitle: "تحليل تاريخي ومقارنة مرجعية",
    freeDescription: "ارفع بياناتك. شاهد موقعك مقابل الأقران. مؤشرات الأداء وأنماط الهوامش والموقع التنافسي - مجاناً، للأبد.",
    freeIncludes: "يشمل:",
    freeCta: "استكشاف Sundae Report →",
    coreLabel: "الأكثر شعبية",
    coreTitle: "Sundae Core",
    coreSubtitle: "العمليات والذكاء في الوقت الفعلي",
    coreDescription: "كل ما في Report، بالإضافة إلى العمليات المباشرة. وتيرة داخلية، إشارات السوق، 14 وحدة ذكاء، توقعات مستقبلية، وتوصيات Sundae Coach.",
    coreIncludes: "كل ما في Report، بالإضافة إلى:",
    coreCta: "استكشاف Sundae Core →",
    compareCta: "مقارنة Report مقابل Core →",
    layersEyebrow: "ست طبقات ذكاء",
    layersTitle: "من أرضية الوردية إلى غرفة الإدارة",
    layersDescription: "كل طبقة تعالج بُعداً مختلفاً من أداء المطعم. معاً، يشكلون نظام ذكاء مغلق الحلقة.",
    ctaTitle: "ابدأ مجاناً. وتوسع عندما تكون جاهزاً.",
    ctaDescription: "مقارنة مرجعية تاريخية بلا تكلفة. وعمليات لحظية عندما تحتاج الأفضلية.",
  },
  fr: {
    heroBadge: "La plateforme Sundae",
    heroTitle: "179 modeles de donnees. 12 domaines. Une seule verite.",
    heroDescription: "Six couches d'intelligence qui transforment des donnees restaurant fragmentees en decisions cumulatives - service par service, site par site.",
    heroPrimary: "Commencer gratuitement avec Report",
    heroSecondary: "Reserver une demo",
    freeLabel: "GRATUIT A VIE",
    freeTitle: "Sundae Report",
    freeSubtitle: "Analyse historique et benchmarking",
    freeDescription: "Importez vos donnees. Voyez ou vous vous situez face aux pairs. Benchmarks, marges et positionnement concurrentiel - gratuit, a vie.",
    freeIncludes: "Comprend :",
    freeCta: "Decouvrir Sundae Report →",
    coreLabel: "LE PLUS POPULAIRE",
    coreTitle: "Sundae Core",
    coreSubtitle: "Operations et intelligence en temps reel",
    coreDescription: "Tout ce qu'il y a dans Report, plus les operations live. Pacing intraday, signaux de marche, 14 modules d'intelligence, previsions et recommandations Sundae Coach.",
    coreIncludes: "Tout ce qu'il y a dans Report, plus :",
    coreCta: "Decouvrir Sundae Core →",
    compareCta: "Comparer Report et Core →",
    layersEyebrow: "SIX COUCHES D'INTELLIGENCE",
    layersTitle: "Du service jusqu'au board",
    layersDescription: "Chaque couche couvre une dimension specifique de la performance. Ensemble, elles forment un systeme d'intelligence en boucle fermee.",
    ctaTitle: "Commencez gratuitement. Evoluez quand vous etes pret.",
    ctaDescription: "Benchmarking historique sans cout. Operations en temps reel quand vous avez besoin d'un avantage.",
  },
  es: {
    heroBadge: "La plataforma Sundae",
    heroTitle: "179 modelos de datos. 12 dominios. Una sola verdad.",
    heroDescription: "Seis capas de inteligencia que convierten datos fragmentados de restaurantes en decisiones acumulativas - turno a turno, local a local.",
    heroPrimary: "Empieza gratis con Report",
    heroSecondary: "Reservar una demo",
    freeLabel: "GRATIS PARA SIEMPRE",
    freeTitle: "Sundae Report",
    freeSubtitle: "Analisis historico y benchmarking",
    freeDescription: "Sube tus datos. Mira donde te sitúas frente a tus pares. Benchmarks, patrones de margen y posicionamiento competitivo - gratis, para siempre.",
    freeIncludes: "Incluye:",
    freeCta: "Explorar Sundae Report →",
    coreLabel: "MAS POPULAR",
    coreTitle: "Sundae Core",
    coreSubtitle: "Operaciones e inteligencia en tiempo real",
    coreDescription: "Todo lo de Report, mas operaciones en vivo. Ritmo intradia, señales de mercado, 14 modulos de inteligencia, previsiones y recomendaciones de Sundae Coach.",
    coreIncludes: "Todo lo de Report, mas:",
    coreCta: "Explorar Sundae Core →",
    compareCta: "Comparar Report vs Core →",
    layersEyebrow: "SEIS CAPAS DE INTELIGENCIA",
    layersTitle: "Del turno a la sala directiva",
    layersDescription: "Cada capa cubre una dimension distinta del rendimiento del restaurante. Juntas forman un sistema de inteligencia en bucle cerrado.",
    ctaTitle: "Empieza gratis. Escala cuando estes listo.",
    ctaDescription: "Benchmarking historico sin coste. Operaciones en tiempo real cuando necesites ventaja.",
  },
};

const localizedPillars: Record<'en' | 'ar' | 'fr' | 'es', Pillar[]> = {
  en: [
    { name: "Pulse", tagline: "Intraday Operations", description: "Revenue pacing, labor cost, server performance, and leakage detection - updating every 5 minutes. A shift is a perishable asset. Once it's gone, the margin is gone.", icon: "pulse", features: ["Live sales pacing vs targets", "Server-level upsell tracking", "Leakage & void detection", "Sundae Coach shift signals", "Portfolio leaderboard", "Wallboard mode for the floor"], stat: "$2K", statLabel: "saved per bad shift caught early", mockup: PulseDashboardMockup },
    { name: "Benchmarks", tagline: "Competitive Intelligence", description: "RevPASH Index, seat occupancy, average check, and revenue indexes - compared against anonymized peers in your segment and market.", icon: "benchmarking", features: ["RevPASH & revenue indexes", "Compset peer comparisons", "Performance trend analysis", "Revenue forecasting", "Market positioning", "Priority insights by Sundae Coach"], stat: "112", statLabel: "RevPASH Index - 12% above peers", mockup: BenchmarkDashboardMockup },
    { name: "Watchtower", tagline: "Market Intelligence", description: "Competitor monitoring, weather revenue impact, event intelligence, and daily briefings - before the impact hits your numbers.", icon: "watchtower", features: ["Competitor price & menu tracking", "Weather revenue impact models", "Local event intelligence", "Daily Sundae Coach briefings", "Signal feed & alerts", "Market trend detection"], stat: "72h", statLabel: "early warning before impact", mockup: WatchtowerMockup },
    { name: "Insights", tagline: "12 Intelligence Modules", description: "Revenue, labor, inventory, purchasing, marketing, reservations, delivery, guest experience, and more - each with recommendations from Sundae Coach.", icon: "insights", features: ["Revenue & profit intelligence", "Labor cost optimization", "Inventory waste & variance", "Purchasing & supplier scoring", "Marketing ROI attribution", "Cross-Intelligence correlation engine"], stat: "179+", statLabel: "data models across 12 domains", mockup: InsightsModuleMockup },
    { name: "Sundae Intelligence", tagline: "Conversational Analytics", description: "Ask questions in plain language. Get answers backed by your real data - with sources, not guesses. Available on web, Telegram, Slack, and Microsoft Teams.", icon: "conversation", features: ["Natural language queries", "Monitor mode (real-time alerts)", "Briefing mode (daily summaries)", "Web + Telegram + Slack + Teams", "Conversation history", "Source-cited responses"], stat: "30s", statLabel: "from question to cited answer", mockup: IntelligenceChatMockup },
    { name: "Foresight", tagline: "Predictive Intelligence", description: "Forward-looking forecasts for revenue, labor, food cost, and profit - with confidence bands, what-if scenarios, and weekly executive briefings. Stop reacting. Start anticipating.", icon: "forecasting", features: ["14–365 day multi-metric forecasts", "What-if scenario simulator with Monte Carlo", "Forecast-driven labor scheduling & purchasing", "Cross-module cascade forecasting", "Accuracy self-correction with bias detection", "AI executive briefings with PDF export"], stat: "91%", statLabel: "forecast accuracy with self-correction", mockup: ForesightDashboardMockup },
  ],
  ar: [
    { name: "Pulse", tagline: "العمليات داخل اليوم", description: "وتيرة الإيرادات، تكلفة العمالة، أداء الخادم، وكشف التسرب - تتحدث كل 5 دقائق. الوردية أصل قابل للتلف.", icon: "pulse", features: ["مقارنة مباشرة للمبيعات مقابل الأهداف", "تتبع الارتقاء لكل خادم", "كشف التسرب والإلغاءات", "إشارات Sundae Coach للوردية", "لوحة ترتيب للمواقع", "وضع شاشة للقسم"], stat: "$2K", statLabel: "تم توفيرها من وردية سيئة تم اكتشافها مبكراً", mockup: PulseDashboardMockup },
    { name: "Benchmarks", tagline: "الذكاء التنافسي", description: "مؤشر RevPASH، إشغال المقاعد، متوسط الفاتورة، ومؤشرات الإيرادات - مقارنة مع أقران مجهولين في قطاعك وسوقك.", icon: "benchmarking", features: ["مؤشرات RevPASH والإيرادات", "مقارنات مع مجموعة الأقران", "تحليل اتجاهات الأداء", "توقع الإيرادات", "تموضع السوق", "رؤى ذات أولوية من Sundae Coach"], stat: "112", statLabel: "مؤشر RevPASH - أعلى 12% من الأقران", mockup: BenchmarkDashboardMockup },
    { name: "Watchtower", tagline: "ذكاء السوق", description: "مراقبة المنافسين، أثر الطقس على الإيرادات، ذكاء الفعاليات، والتقارير اليومية - قبل أن يصل الأثر إلى أرقامك.", icon: "watchtower", features: ["تتبع أسعار وقوائم المنافسين", "نماذج أثر الطقس على الإيرادات", "ذكاء الفعاليات المحلية", "تقارير يومية من Sundae Coach", "تغذية إشارات وتنبيهات", "كشف اتجاهات السوق"], stat: "72h", statLabel: "تحذير مبكر قبل الأثر", mockup: WatchtowerMockup },
    { name: "Insights", tagline: "12 وحدة ذكاء", description: "الإيرادات، العمالة، المخزون، المشتريات، التسويق، الحجوزات، التوصيل، تجربة الضيف، وأكثر - كل منها مع توصيات من Sundae Coach.", icon: "insights", features: ["ذكاء الإيرادات والربح", "تحسين تكلفة العمالة", "هدر المخزون والانحراف", "تقييم المشتريات والموردين", "إسناد ROI للتسويق", "محرك الارتباط Cross-Intelligence"], stat: "179+", statLabel: "نموذج بيانات عبر 12 مجالاً", mockup: InsightsModuleMockup },
    { name: "Sundae Intelligence", tagline: "تحليلات محادثية", description: "اسأل بلغة بسيطة. واحصل على إجابات مدعومة ببياناتك الحقيقية - مع المصادر، لا التخمين. متاح على الويب وتليغرام وسلاك وMicrosoft Teams.", icon: "conversation", features: ["استعلامات بلغة طبيعية", "وضع المراقبة (تنبيهات لحظية)", "وضع الملخص (ملخصات يومية)", "الويب + تليغرام + سلاك + Teams", "سجل المحادثات", "ردود معززة بالمصادر"], stat: "30s", statLabel: "من السؤال إلى الإجابة الموثقة", mockup: IntelligenceChatMockup },
    { name: "Foresight", tagline: "ذكاء تنبؤي", description: "توقعات مستقبلية للإيرادات والعمالة وتكلفة الطعام والربح - مع نطاقات ثقة وسيناريوهات ماذا لو وتقارير تنفيذية أسبوعية.", icon: "forecasting", features: ["توقعات متعددة المقاييس لمدد 14–365 يوماً", "محاكي سيناريوهات مع Monte Carlo", "جدولة ومشتريات مبنية على التوقع", "توقعات متسلسلة عبر الوحدات", "تصحيح ذاتي للدقة مع كشف الانحياز", "ملخصات تنفيذية بالذكاء الاصطناعي مع PDF"], stat: "91%", statLabel: "دقة التوقع مع التصحيح الذاتي", mockup: ForesightDashboardMockup },
  ],
  fr: [
    { name: "Pulse", tagline: "Operations intraday", description: "Rythme du revenu, cout de main-d oeuvre, performance serveur et detection des fuites - mise a jour toutes les 5 minutes. Un service est un actif perissable.", icon: "pulse", features: ["Pacing ventes vs objectifs", "Suivi de l'upsell serveur", "Detection des fuites et annulations", "Signaux de shift Sundae Coach", "Classement portefeuille", "Mode wallboard pour la salle"], stat: "$2K", statLabel: "economises par un mauvais service detecte a temps", mockup: PulseDashboardMockup },
    { name: "Benchmarks", tagline: "Intelligence concurrentielle", description: "Index RevPASH, occupation des sieges, ticket moyen et indices de revenu - compares a des pairs anonymises de votre segment et marche.", icon: "benchmarking", features: ["Indices RevPASH et revenu", "Comparaisons avec les pairs", "Analyse des tendances", "Prevision du revenu", "Positionnement marche", "Insights prioritaires de Sundae Coach"], stat: "112", statLabel: "Index RevPASH - 12 % au-dessus des pairs", mockup: BenchmarkDashboardMockup },
    { name: "Watchtower", tagline: "Intelligence marche", description: "Suivi des concurrents, impact meteo sur le revenu, intelligence des evenements et briefings quotidiens - avant que l'impact n'apparaisse dans vos chiffres.", icon: "watchtower", features: ["Suivi des prix et menus concurrents", "Modeles d'impact meteo", "Intelligence des evenements locaux", "Briefings quotidiens Sundae Coach", "Flux de signaux et alertes", "Detection des tendances marche"], stat: "72h", statLabel: "alerte precoce avant impact", mockup: WatchtowerMockup },
    { name: "Insights", tagline: "12 modules d'intelligence", description: "Revenu, main-d'oeuvre, stock, achats, marketing, reservations, livraison, experience client et plus - chacun avec des recommandations Sundae Coach.", icon: "insights", features: ["Intelligence revenu et profit", "Optimisation du cout main-d'oeuvre", "Gaspillage et ecarts de stock", "Notation achats et fournisseurs", "Attribution du ROI marketing", "Moteur de correlation Cross-Intelligence"], stat: "179+", statLabel: "modeles de donnees sur 12 domaines", mockup: InsightsModuleMockup },
    { name: "Sundae Intelligence", tagline: "Analytique conversationnelle", description: "Posez une question en langage simple. Obtenez des reponses basees sur vos vraies donnees - avec sources, pas des suppositions. Disponible sur web, Telegram, Slack et Microsoft Teams.", icon: "conversation", features: ["Requetes en langage naturel", "Mode monitoring (alertes temps reel)", "Mode briefing (resumes quotidiens)", "Web + Telegram + Slack + Teams", "Historique de conversation", "Reponses citees"], stat: "30s", statLabel: "de la question a la reponse citee", mockup: IntelligenceChatMockup },
    { name: "Foresight", tagline: "Intelligence predictive", description: "Previsions prospectives pour le revenu, la main-d'oeuvre, le cout alimentaire et le profit - avec intervalles de confiance, scenarios et briefings executifs hebdomadaires.", icon: "forecasting", features: ["Previsions multi-metrics sur 14-365 jours", "Simulateur de scenarios avec Monte Carlo", "Planification et achats pilotes par la prevision", "Previsions en cascade multi-modules", "Auto-correction de la precision", "Briefings executifs IA avec export PDF"], stat: "91%", statLabel: "precision des previsions avec auto-correction", mockup: ForesightDashboardMockup },
  ],
  es: [
    { name: "Pulse", tagline: "Operaciones intradia", description: "Ritmo de ingresos, coste laboral, rendimiento de servidores y deteccion de fugas - actualizado cada 5 minutos. Un turno es un activo perecedero.", icon: "pulse", features: ["Ritmo de ventas vs objetivos", "Seguimiento de upsell por servidor", "Deteccion de fugas y anulaciones", "Señales de turno de Sundae Coach", "Clasificacion del portafolio", "Modo wallboard para sala"], stat: "$2K", statLabel: "ahorrados al detectar pronto un mal turno", mockup: PulseDashboardMockup },
    { name: "Benchmarks", tagline: "Inteligencia competitiva", description: "Indice RevPASH, ocupacion de asientos, ticket medio e indices de ingresos - comparados con pares anonimizados de tu segmento y mercado.", icon: "benchmarking", features: ["Indices RevPASH e ingresos", "Comparaciones con pares", "Analisis de tendencias", "Prevision de ingresos", "Posicionamiento de mercado", "Insights prioritarios de Sundae Coach"], stat: "112", statLabel: "indice RevPASH - 12% por encima de los pares", mockup: BenchmarkDashboardMockup },
    { name: "Watchtower", tagline: "Inteligencia de mercado", description: "Seguimiento de competidores, impacto del clima en ingresos, inteligencia de eventos y briefings diarios - antes de que el impacto llegue a tus cifras.", icon: "watchtower", features: ["Seguimiento de precios y menus de competidores", "Modelos de impacto del clima", "Inteligencia de eventos locales", "Briefings diarios de Sundae Coach", "Feed de señales y alertas", "Deteccion de tendencias de mercado"], stat: "72h", statLabel: "aviso temprano antes del impacto", mockup: WatchtowerMockup },
    { name: "Insights", tagline: "12 modulos de inteligencia", description: "Ingresos, mano de obra, inventario, compras, marketing, reservas, entrega, experiencia del cliente y mas - cada uno con recomendaciones de Sundae Coach.", icon: "insights", features: ["Inteligencia de ingresos y beneficio", "Optimizacion del coste laboral", "Desperdicio y variacion de inventario", "Valoracion de compras y proveedores", "Atribucion del ROI de marketing", "Motor de correlacion Cross-Intelligence"], stat: "179+", statLabel: "modelos de datos en 12 dominios", mockup: InsightsModuleMockup },
    { name: "Sundae Intelligence", tagline: "Analitica conversacional", description: "Haz preguntas en lenguaje simple. Obtén respuestas respaldadas por tus datos reales - con fuentes, no suposiciones. Disponible en web, Telegram, Slack y Microsoft Teams.", icon: "conversation", features: ["Consultas en lenguaje natural", "Modo monitor (alertas en tiempo real)", "Modo briefing (resúmenes diarios)", "Web + Telegram + Slack + Teams", "Historial de conversaciones", "Respuestas con fuentes"], stat: "30s", statLabel: "de la pregunta a la respuesta citada", mockup: IntelligenceChatMockup },
    { name: "Foresight", tagline: "Inteligencia predictiva", description: "Previsiones para ingresos, mano de obra, coste de comida y beneficio - con bandas de confianza, escenarios y briefings ejecutivos semanales.", icon: "forecasting", features: ["Previsiones multimetricas de 14-365 dias", "Simulador de escenarios con Monte Carlo", "Planificacion de mano de obra y compras guiada por previsiones", "Previsiones en cascada entre modulos", "Autocorreccion de la precision", "Briefings ejecutivos IA con exportacion PDF"], stat: "91%", statLabel: "precision de previsiones con autocorreccion", mockup: ForesightDashboardMockup },
  ],
};

export default function ProductPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = copyMap[locale] ?? copyMap.en;
  const pillars = localizedPillars[locale] ?? localizedPillars.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.heroBadge} title={ui.heroTitle} description={ui.heroDescription}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" size="lg" onClick={() => cta(REPORT_APP_URL, "start_free_product_hero", { page: "/product" })}>{ui.heroPrimary}</Button>
          <Button variant="outline-light" size="lg" onClick={() => cta("/demo", "book_demo_product_hero", { page: "/product" })}>{ui.heroSecondary}</Button>
        </div>
      </PageHero>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp><div className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.freeLabel === 'FREE FOREVER' ? 'Start Free. Scale When Ready.' : ui.freeLabel === 'مجاني للأبد' ? 'ابدأ مجاناً. وتوسع عندما تكون جاهزاً.' : ui.freeLabel === 'GRATUIT A VIE' ? 'Commencez gratuitement. Evoluez quand vous etes pret.' : 'Empieza gratis. Escala cuando estes listo.'}</h2>
            <p className="body-lg text-[var(--text-supporting)]">{ui.ctaDescription}</p>
          </div></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card variant="elevated" className="h-full overflow-hidden border-2 border-blue-500/30">
                <div className="relative h-48 overflow-hidden bg-[var(--surface-subtle)] p-3">
                  <BenchmarkDashboardMockup />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-hover)] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 badge badge--free text-[10px] z-10">{ui.freeLabel}</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{ui.freeTitle}</h3>
                  <p className="text-sm text-[#60A5FA] font-semibold mb-3">{ui.freeSubtitle}</p>
                  <p className="text-[var(--text-supporting)] mb-4 leading-relaxed">{ui.freeDescription}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">{ui.freeIncludes}</p>
                  <ul className="text-sm text-[var(--text-supporting)] space-y-1.5 mb-6">
                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> {locale === 'en' ? 'Benchmarks (competitive intelligence)' : locale === 'ar' ? 'المقارنات (الذكاء التنافسي)' : locale === 'fr' ? 'Benchmarks (intelligence concurrentielle)' : 'Benchmarks (inteligencia competitiva)'}</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> {locale === 'en' ? 'Performance Report' : locale === 'ar' ? 'تقرير الأداء' : locale === 'fr' ? 'Rapport de performance' : 'Informe de rendimiento'}</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> {locale === 'en' ? 'Sundae Intelligence' : locale === 'ar' ? 'Sundae Intelligence' : locale === 'fr' ? 'Sundae Intelligence' : 'Sundae Intelligence'}</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> {locale === 'en' ? 'Integrations Hub' : locale === 'ar' ? 'مركز التكاملات' : locale === 'fr' ? 'Hub des integrations' : 'Centro de integraciones'}</li>
                  </ul>
                  <Button variant="primary" className="w-full" onClick={() => cta("/report", "view_report_product", { page: "/product" })}>{ui.freeCta}</Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card variant="elevated" className="h-full overflow-hidden border-2 border-purple-500/30">
                <div className="relative h-48 overflow-hidden bg-[var(--surface-subtle)] p-3">
                  <PulseDashboardMockup />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-hover)] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 badge badge--popular text-[10px] z-10">{ui.coreLabel}</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{ui.coreTitle}</h3>
                  <p className="text-sm text-purple-400 font-semibold mb-3">{ui.coreSubtitle}</p>
                  <p className="text-[var(--text-supporting)] mb-4 leading-relaxed">{ui.coreDescription}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">{ui.coreIncludes}</p>
                  <ul className="text-sm text-[var(--text-supporting)] space-y-1.5 mb-6">
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Pulse ({locale === 'en' ? 'intraday operations' : locale === 'ar' ? 'العمليات داخل اليوم' : locale === 'fr' ? 'operations intraday' : 'operaciones intradia'})</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Watchtower ({locale === 'en' ? 'market intelligence' : locale === 'ar' ? 'ذكاء السوق' : locale === 'fr' ? 'intelligence marche' : 'inteligencia de mercado'})</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> {locale === 'en' ? '14 Intelligence Modules' : locale === 'ar' ? '14 وحدة ذكاء' : locale === 'fr' ? '14 modules d\'intelligence' : '14 modulos de inteligencia'}</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Foresight ({locale === 'en' ? 'predictive intelligence' : locale === 'ar' ? 'ذكاء تنبؤي' : locale === 'fr' ? 'intelligence predictive' : 'inteligencia predictiva'})</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> {locale === 'en' ? 'Sundae Coach & Playbooks' : locale === 'ar' ? 'Sundae Coach وخطط التشغيل' : locale === 'fr' ? 'Sundae Coach & playbooks' : 'Sundae Coach y playbooks'}</li>
                  </ul>
                  <Button variant="primary" className="w-full" onClick={() => cta("/core", "view_core_product", { page: "/product" })}>{ui.coreCta}</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="sm" onClick={() => cta("/report-vs-core", "compare_tiers_product", { page: "/product" })}>{ui.compareCta}</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp><div className="text-center mb-16">
            <p className="eyebrow text-[#60A5FA] mb-4">{ui.layersEyebrow}</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.layersTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.layersDescription}</p>
          </div></FadeUp>
          <div className="space-y-24">
            {pillars.map((pillar, index) => {
              const Mockup = pillar.mockup;
              return (
                <FadeUp key={pillar.name} delay={index * 0.05}>
                  <div className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}><Mockup /></div>
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${index === 0 ? 'from-red-500 to-rose-600' : index === 1 ? 'from-blue-500 to-blue-600' : index === 2 ? 'from-amber-500 to-orange-600' : index === 3 ? 'from-purple-500 to-purple-600' : index === 4 ? 'from-green-500 to-emerald-600' : 'from-cyan-500 to-blue-600'} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[var(--text-primary)]">{pillar.name}</h3>
                          <p className="text-sm text-[var(--text-muted)] font-medium">{pillar.tagline}</p>
                        </div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-6">{pillar.description}</p>
                      <div className="space-y-2 mb-4">
                        {pillar.features.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-cyan-400 flex-shrink-0 mt-0.5">✓</span>
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        <span className="font-semibold text-[var(--text-primary)]">{pillar.stat}</span> {pillar.statLabel}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Link href="/demo"><Button variant="primary" size="lg">{ui.heroSecondary}</Button></Link>
        <Link href="/product"><Button variant="outline-light" size="lg">{ui.heroPrimary}</Button></Link>
      </PageCTA>
    </div>
  );
}
