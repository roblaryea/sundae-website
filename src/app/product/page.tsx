'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
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
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_product_page'
import { CreamBreak } from '@/components/ui/CreamBreak';
import { productCreamCopy, productCreamMidCopy } from './productCreamCopy';

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
  loopEyebrow: string;
  loopTitle: string;
  loopDescription: string;
  loopCta: string;
  ctaTitle: string;
  ctaDescription: string;
};

const copyMap: Record<'en' | 'ar' | 'fr' | 'es', Copy> = {
  en: {
    heroBadge: "The Sundae Platform",
    heroTitle: "Six layers. One governed model. One loop.",
    heroDescription: "Every layer reads the same governed model, so the number in a forecast, a benchmark and last night's shift report is the same number. And every layer feeds one loop: find the money, give the work an owner, measure what came back.",
    heroPrimary: "See Plans",
    heroSecondary: "Book a Working Session",
    freeLabel: "READS THE BUSINESS",
    freeTitle: "Sundae Core",
    freeSubtitle: "Four packages, the whole operation",
    freeDescription: "One operating picture over POS, labor, cost and guest. Every package covers every area of the operation; the package you choose sets how deep each one goes.",
    freeIncludes: "Includes:",
    freeCta: "Explore Sundae Core →",
    coreLabel: "RUNS THE PEOPLE",
    coreTitle: "Sundae Crew",
    coreSubtitle: "People, schedules, time and pay",
    coreDescription: "The operational layer under the intelligence: demand-aware scheduling, clock-in and timesheets, payroll readiness and multi-region statutory exports.",
    coreIncludes: "Includes:",
    coreCta: "Explore Sundae Crew →",
    compareCta: "See pricing →",
    layersEyebrow: "SIX INTELLIGENCE LAYERS",
    layersTitle: "From Shift Floor to Boardroom",
    layersDescription: "Each layer covers a distinct dimension of the operation. They are not six separate products - they read one model, and what one layer finds becomes work another layer measures.",
    loopEyebrow: "THE LOOP ACROSS ALL SIX",
    loopTitle: "A layer that only reports is a layer you still have to act on yourself.",
    loopDescription: "The recovery loop sits under all six. Whatever a layer finds, one person owns it. The before number is locked before the work starts, so what comes back can be measured rather than claimed - and it is not called verified until someone else has checked it.",
    loopCta: "See how the loop works",
    ctaTitle: "Two halves of the same operation.",
    ctaDescription: "Core reads the business. Crew runs the people. Every shift Crew plans becomes signal Core reasons over - and every decision that signal produces is measured against what actually changed.",
  },
  ar: {
    heroBadge: "منصة Sundae",
    heroTitle: "500 نموذج بيانات. 12 مجالاً. حقيقة واحدة.",
    heroDescription: "ست طبقات ذكاء تحول بيانات المطعم المتناثرة إلى قرارات تتراكم قيمتها - من الوردية إلى الموقع.",
    heroPrimary: "اطّلع على الباقات",
    heroSecondary: "احجز عرضاً",
    freeLabel: "يقرأ العمل",
    freeTitle: "Sundae Core",
    freeSubtitle: "أربع باقات، والتشغيل بالكامل",
    freeDescription: "صورة تشغيلية واحدة فوق نقاط البيع والعمالة والتكلفة والضيف. كل باقة تغطي كل مجالات التشغيل، والباقة تحدد عمق كل مجال.",
    freeIncludes: "يشمل:",
    freeCta: "استكشاف Sundae Core →",
    coreLabel: "يدير الناس",
    coreTitle: "Sundae Crew",
    coreSubtitle: "الأفراد والجداول والوقت والرواتب",
    coreDescription: "الطبقة التشغيلية تحت الذكاء: جدولة واعية بالطلب، وتسجيل حضور وكشوف ساعات، وجاهزية رواتب وتصدير نظامي متعدد المناطق.",
    coreIncludes: "يشمل:",
    coreCta: "استكشاف Sundae Crew →",
    compareCta: "عرض الأسعار →",
    layersEyebrow: "ست طبقات ذكاء",
    layersTitle: "من أرضية الوردية إلى غرفة الإدارة",
    layersDescription: "كل طبقة تعالج بُعداً مختلفاً من أداء المطعم. معاً، يشكلون نظام ذكاء مغلق الحلقة.",
    loopEyebrow: "الحلقة التي تمر عبر الطبقات الست",
    loopTitle: "الطبقة التي تكتفي بالتقرير تترك التنفيذ عليك.",
    loopDescription: "تعمل حلقة استرجاع الأرباح في Sundae أسفل الطبقات الست جميعاً. تأخذ ما تكتشفه أي طبقة، وتسنده إلى مسؤول واحد، وتثبّت الرقم الذي سيُحاكم عليه العمل قبل أن يبدأ. وما يعود يُقاس - ويُوسم استرشادياً حتى يؤكده من نفّذ العمل، ولا يُعتمد إلا بعد أن يراجعه شخص ثانٍ مقابل الأدلة.",
    loopCta: "اطّلع على آلية الحلقة",
    ctaTitle: "ركيزتان. وصورة تشغيلية واحدة.",
    ctaDescription: "Core يقرأ العمل، وCrew يدير الناس. وكل وردية يخطط لها Crew تصبح إشارة يستدل بها Core.",
  },
  fr: {
    heroBadge: "La plateforme Sundae",
    heroTitle: "500 modeles de donnees. 12 domaines. Une seule verite.",
    heroDescription: "Six couches d'intelligence qui transforment des donnees restaurant fragmentees en decisions cumulatives - service par service, site par site.",
    heroPrimary: "Voir les offres",
    heroSecondary: "Reserver une demo",
    freeLabel: "BASE DE DECISION",
    freeTitle: "Sundae Core",
    freeSubtitle: "Quatre offres, toute l'exploitation",
    freeDescription: "Une seule image d exploitation sur le POS, la main-d oeuvre, les couts et le client. Chaque offre embarque les onze modules ; l offre choisie fixe leur profondeur.",
    freeIncludes: "Comprend :",
    freeCta: "Decouvrir Sundae Core →",
    coreLabel: "SOCLE RH",
    coreTitle: "Sundae Crew",
    coreSubtitle: "Personnes, plannings, temps et paie",
    coreDescription: "La couche operationnelle sous l intelligence : plannings pilotes par la demande, pointage et feuilles de temps, preparation de la paie et exports statutaires multi-regions.",
    coreIncludes: "Comprend :",
    coreCta: "Decouvrir Sundae Crew →",
    compareCta: "Voir les tarifs →",
    layersEyebrow: "SIX COUCHES D'INTELLIGENCE",
    layersTitle: "Du service jusqu'au board",
    layersDescription: "Chaque couche couvre une dimension specifique de la performance. Ensemble, elles forment un systeme d'intelligence en boucle fermee.",
    loopEyebrow: "La boucle qui traverse les six couches",
    loopTitle: "Une couche qui se contente de rapporter vous laisse le travail.",
    loopDescription: "La boucle de recuperation de marge de Sundae passe sous les six couches. Elle reprend ce qu'une couche detecte, l'attribue a un seul responsable et fige le chiffre sur lequel le travail sera juge avant qu'il ne commence. Ce qui revient est mesure - qualifie de directionnel jusqu'a ce que la personne qui a fait le travail le confirme, et valide seulement lorsqu'un second relecteur le verifie contre des preuves.",
    loopCta: "Voir le fonctionnement de la boucle",
    ctaTitle: "Deux socles. Une seule image d exploitation.",
    ctaDescription: "Core lit l activite, Crew fait tourner les equipes. Chaque service planifie par Crew devient un signal que Core exploite.",
  },
  es: {
    heroBadge: "La plataforma Sundae",
    heroTitle: "500 modelos de datos. 12 dominios. Una sola verdad.",
    heroDescription: "Seis capas de inteligencia que convierten datos fragmentados de restaurantes en decisiones acumulativas - turno a turno, local a local.",
    heroPrimary: "Ver paquetes",
    heroSecondary: "Reservar una demo",
    freeLabel: "SUSTRATO DE DECISION",
    freeTitle: "Sundae Core",
    freeSubtitle: "Cuatro paquetes, toda la operacion",
    freeDescription: "Una sola imagen operativa sobre POS, personal, coste y cliente. Cada paquete lleva los once modulos; el paquete que elijas marca cuanto profundiza cada uno.",
    freeIncludes: "Incluye:",
    freeCta: "Explorar Sundae Core →",
    coreLabel: "SUSTRATO DE PERSONAL",
    coreTitle: "Sundae Crew",
    coreSubtitle: "Personas, horarios, tiempo y nomina",
    coreDescription: "La capa operativa bajo la inteligencia: horarios guiados por demanda, fichaje y hojas de horas, preparacion de nominas y exportes estatutarios multirregion.",
    coreIncludes: "Incluye:",
    coreCta: "Explorar Sundae Crew →",
    compareCta: "Ver precios →",
    layersEyebrow: "SEIS CAPAS DE INTELIGENCIA",
    layersTitle: "Del turno a la sala directiva",
    layersDescription: "Cada capa cubre una dimension distinta del rendimiento del restaurante. Juntas forman un sistema de inteligencia en bucle cerrado.",
    loopEyebrow: "El bucle que atraviesa las seis capas",
    loopTitle: "Una capa que solo informa te deja el trabajo a ti.",
    loopDescription: "El bucle de recuperacion de margen de Sundae corre por debajo de las seis capas. Toma lo que cualquier capa detecta, le asigna un unico responsable y congela la cifra contra la que se juzgara el trabajo antes de empezarlo. Lo que vuelve se mide - marcado como direccional hasta que lo confirma quien hizo el trabajo, y validado solo cuando un segundo revisor lo contrasta con evidencias.",
    loopCta: "Ver como funciona el bucle",
    ctaTitle: "Dos sustratos. Una sola imagen operativa.",
    ctaDescription: "Benchmarking historico sin coste. Operaciones en tiempo real cuando necesites ventaja.",
  },
};

const localizedPillars: Record<'en' | 'ar' | 'fr' | 'es', Pillar[]> = {
  en: [
    { name: "Pulse", tagline: "Intraday Operations", description: "Revenue pacing, labor cost, server performance, and leakage detection - updating every 5 minutes. A shift is a perishable asset. Once it's gone, the margin is gone.", icon: "pulse", features: ["Live sales pacing vs targets", "Server-level upsell tracking", "Leakage & void detection", "Sundae Coach shift signals", "Portfolio leaderboard", "Wallboard mode for the floor"], stat: "5 min", statLabel: "refresh while the shift is still running", mockup: PulseDashboardMockup },
    { name: "Benchmarks", tagline: "Competitive Intelligence", description: "RevPASH Index, seat occupancy, average check, and revenue indexes - compared against anonymized peers in your segment and market.", icon: "benchmarking", features: ["RevPASH & revenue indexes", "Compset peer comparisons", "Performance trend analysis", "Revenue forecasting", "Market positioning", "Priority insights by Sundae Coach"], stat: "112", statLabel: "RevPASH Index - 12% above peers", mockup: BenchmarkDashboardMockup },
    { name: "Watchtower", tagline: "Market Intelligence", description: "Competitor monitoring, weather revenue impact, event intelligence, and daily briefings - before the impact hits your numbers.", icon: "watchtower", features: ["Competitor price & menu tracking", "Weather revenue impact models", "Local event intelligence", "Daily Sundae Coach briefings", "Signal feed & alerts", "Market trend detection"], stat: "72h", statLabel: "early warning before impact", mockup: WatchtowerMockup },
    { name: "Insights", tagline: "Deep Operational Analytics", description: "Revenue, labor, inventory, purchasing, marketing, reservations, delivery, guest experience, and more - each with recommendations from Sundae Coach.", icon: "insights", features: ["Revenue & profit intelligence", "Labor cost optimization", "Inventory waste & variance", "Purchasing & supplier scoring", "Marketing ROI attribution", "Cross-Intelligence correlation engine"], stat: "12", statLabel: "operational areas, correlated against each other", mockup: InsightsModuleMockup },
    { name: "Ask Sundae", tagline: "Conversational Analytics", description: "Ask questions in plain language. Get answers backed by your real data - with sources, not guesses. Available on web, Telegram, Slack, and Microsoft Teams.", icon: "conversation", features: ["Natural language queries", "Monitor mode (real-time alerts)", "Briefing mode (daily summaries)", "Web + Telegram + Slack + Teams", "Conversation history", "Source-cited responses"], stat: "30s", statLabel: "from question to cited answer", mockup: IntelligenceChatMockup },
    { name: "Foresight", tagline: "Predictive Intelligence", description: "Forward-looking forecasts for revenue, labor, food cost, and profit - with confidence bands, what-if scenarios, and weekly executive briefings. Stop reacting. Start anticipating.", icon: "forecasting", features: ["14-365 day multi-metric forecasts", "What-if scenario simulator with Monte Carlo", "Forecast-driven labor scheduling & purchasing", "Cross-module cascade forecasting", "Accuracy self-correction with bias detection", "AI executive briefings with PDF export"], stat: "91%", statLabel: "forecast accuracy with self-correction", mockup: ForesightDashboardMockup },
  ],
  ar: [
    { name: "Pulse", tagline: "العمليات داخل اليوم", description: "وتيرة الإيرادات، تكلفة العمالة، أداء الخادم، وكشف التسرب - تتحدث كل 5 دقائق. الوردية أصل قابل للتلف.", icon: "pulse", features: ["مقارنة مباشرة للمبيعات مقابل الأهداف", "تتبع الارتقاء لكل خادم", "كشف التسرب والإلغاءات", "إشارات Sundae Coach للوردية", "لوحة ترتيب للمواقع", "وضع شاشة للقسم"], stat: "5 دقائق", statLabel: "تحديث والوردية ما زالت جارية", mockup: PulseDashboardMockup },
    { name: "Benchmarks", tagline: "الذكاء التنافسي", description: "مؤشر RevPASH، إشغال المقاعد، متوسط الفاتورة، ومؤشرات الإيرادات - مقارنة مع أقران مجهولين في قطاعك وسوقك.", icon: "benchmarking", features: ["مؤشرات RevPASH والإيرادات", "مقارنات مع مجموعة الأقران", "تحليل اتجاهات الأداء", "توقع الإيرادات", "تموضع السوق", "رؤى ذات أولوية من Sundae Coach"], stat: "112", statLabel: "مؤشر RevPASH - أعلى 12% من الأقران", mockup: BenchmarkDashboardMockup },
    { name: "Watchtower", tagline: "ذكاء السوق", description: "مراقبة المنافسين، أثر الطقس على الإيرادات، ذكاء الفعاليات، والتقارير اليومية - قبل أن يصل الأثر إلى أرقامك.", icon: "watchtower", features: ["تتبع أسعار وقوائم المنافسين", "نماذج أثر الطقس على الإيرادات", "ذكاء الفعاليات المحلية", "تقارير يومية من Sundae Coach", "تغذية إشارات وتنبيهات", "كشف اتجاهات السوق"], stat: "72h", statLabel: "تحذير مبكر قبل الأثر", mockup: WatchtowerMockup },
    { name: "Insights", tagline: "تحليلات تشغيلية عميقة", description: "الإيرادات، العمالة، المخزون، المشتريات، التسويق، الحجوزات، التوصيل، تجربة الضيف، وأكثر - كل منها مع توصيات من Sundae Coach.", icon: "insights", features: ["ذكاء الإيرادات والربح", "تحسين تكلفة العمالة", "هدر المخزون والانحراف", "تقييم المشتريات والموردين", "إسناد ROI للتسويق", "محرك الارتباط Cross-Intelligence"], stat: "12", statLabel: "مجالاً تشغيلياً مترابطة ببعضها", mockup: InsightsModuleMockup },
    { name: "Ask Sundae", tagline: "تحليلات محادثية", description: "اسأل بلغة بسيطة. واحصل على إجابات مدعومة ببياناتك الحقيقية - مع المصادر، لا التخمين. متاح على الويب وتليغرام وسلاك وMicrosoft Teams.", icon: "conversation", features: ["استعلامات بلغة طبيعية", "وضع المراقبة (تنبيهات لحظية)", "وضع الملخص (ملخصات يومية)", "الويب + تليغرام + سلاك + Teams", "سجل المحادثات", "ردود معززة بالمصادر"], stat: "30s", statLabel: "من السؤال إلى الإجابة الموثقة", mockup: IntelligenceChatMockup },
    { name: "Foresight", tagline: "ذكاء تنبؤي", description: "توقعات مستقبلية للإيرادات والعمالة وتكلفة الطعام والربح - مع نطاقات ثقة وسيناريوهات ماذا لو وتقارير تنفيذية أسبوعية.", icon: "forecasting", features: ["توقعات متعددة المقاييس لمدد 14-365 يوماً", "محاكي سيناريوهات مع Monte Carlo", "جدولة ومشتريات مبنية على التوقع", "توقعات متسلسلة عبر الوحدات", "تصحيح ذاتي للدقة مع كشف الانحياز", "ملخصات تنفيذية بالذكاء الاصطناعي مع PDF"], stat: "91%", statLabel: "دقة التوقع مع التصحيح الذاتي", mockup: ForesightDashboardMockup },
  ],
  fr: [
    { name: "Pulse", tagline: "Operations intraday", description: "Rythme du revenu, cout de main-d oeuvre, performance serveur et detection des fuites - mise a jour toutes les 5 minutes. Un service est un actif perissable.", icon: "pulse", features: ["Pacing ventes vs objectifs", "Suivi de l'upsell serveur", "Detection des fuites et annulations", "Signaux de shift Sundae Coach", "Classement portefeuille", "Mode wallboard pour la salle"], stat: "5 min", statLabel: "actualisation pendant que le service tourne", mockup: PulseDashboardMockup },
    { name: "Benchmarks", tagline: "Intelligence concurrentielle", description: "Index RevPASH, occupation des sieges, ticket moyen et indices de revenu - compares a des pairs anonymises de votre segment et marche.", icon: "benchmarking", features: ["Indices RevPASH et revenu", "Comparaisons avec les pairs", "Analyse des tendances", "Prevision du revenu", "Positionnement marche", "Insights prioritaires de Sundae Coach"], stat: "112", statLabel: "Index RevPASH - 12 % au-dessus des pairs", mockup: BenchmarkDashboardMockup },
    { name: "Watchtower", tagline: "Intelligence marche", description: "Suivi des concurrents, impact meteo sur le revenu, intelligence des evenements et briefings quotidiens - avant que l'impact n'apparaisse dans vos chiffres.", icon: "watchtower", features: ["Suivi des prix et menus concurrents", "Modeles d'impact meteo", "Intelligence des evenements locaux", "Briefings quotidiens Sundae Coach", "Flux de signaux et alertes", "Detection des tendances marche"], stat: "72h", statLabel: "alerte precoce avant impact", mockup: WatchtowerMockup },
    { name: "Insights", tagline: "Analytique opérationnelle approfondie", description: "Revenu, main-d'oeuvre, stock, achats, marketing, reservations, livraison, experience client et plus - chacun avec des recommandations Sundae Coach.", icon: "insights", features: ["Intelligence revenu et profit", "Optimisation du cout main-d'oeuvre", "Gaspillage et ecarts de stock", "Notation achats et fournisseurs", "Attribution du ROI marketing", "Moteur de correlation Cross-Intelligence"], stat: "12", statLabel: "domaines operationnels, croises entre eux", mockup: InsightsModuleMockup },
    { name: "Ask Sundae", tagline: "Analytique conversationnelle", description: "Posez une question en langage simple. Obtenez des reponses basees sur vos vraies donnees - avec sources, pas des suppositions. Disponible sur web, Telegram, Slack et Microsoft Teams.", icon: "conversation", features: ["Requetes en langage naturel", "Mode monitoring (alertes temps reel)", "Mode briefing (resumes quotidiens)", "Web + Telegram + Slack + Teams", "Historique de conversation", "Reponses citees"], stat: "30s", statLabel: "de la question a la reponse citee", mockup: IntelligenceChatMockup },
    { name: "Foresight", tagline: "Intelligence predictive", description: "Previsions prospectives pour le revenu, la main-d'oeuvre, le cout alimentaire et le profit - avec intervalles de confiance, scenarios et briefings executifs hebdomadaires.", icon: "forecasting", features: ["Previsions multi-metrics sur 14-365 jours", "Simulateur de scenarios avec Monte Carlo", "Planification et achats pilotes par la prevision", "Previsions en cascade multi-modules", "Auto-correction de la precision", "Briefings executifs IA avec export PDF"], stat: "91%", statLabel: "precision des previsions avec auto-correction", mockup: ForesightDashboardMockup },
  ],
  es: [
    { name: "Pulse", tagline: "Operaciones intradia", description: "Ritmo de ingresos, coste laboral, rendimiento de servidores y deteccion de fugas - actualizado cada 5 minutos. Un turno es un activo perecedero.", icon: "pulse", features: ["Ritmo de ventas vs objetivos", "Seguimiento de upsell por servidor", "Deteccion de fugas y anulaciones", "Señales de turno de Sundae Coach", "Clasificacion del portafolio", "Modo wallboard para sala"], stat: "5 min", statLabel: "actualizacion mientras el turno sigue en marcha", mockup: PulseDashboardMockup },
    { name: "Benchmarks", tagline: "Inteligencia competitiva", description: "Indice RevPASH, ocupacion de asientos, ticket medio e indices de ingresos - comparados con pares anonimizados de tu segmento y mercado.", icon: "benchmarking", features: ["Indices RevPASH e ingresos", "Comparaciones con pares", "Analisis de tendencias", "Prevision de ingresos", "Posicionamiento de mercado", "Insights prioritarios de Sundae Coach"], stat: "112", statLabel: "indice RevPASH - 12% por encima de los pares", mockup: BenchmarkDashboardMockup },
    { name: "Watchtower", tagline: "Inteligencia de mercado", description: "Seguimiento de competidores, impacto del clima en ingresos, inteligencia de eventos y briefings diarios - antes de que el impacto llegue a tus cifras.", icon: "watchtower", features: ["Seguimiento de precios y menus de competidores", "Modelos de impacto del clima", "Inteligencia de eventos locales", "Briefings diarios de Sundae Coach", "Feed de señales y alertas", "Deteccion de tendencias de mercado"], stat: "72h", statLabel: "aviso temprano antes del impacto", mockup: WatchtowerMockup },
    { name: "Insights", tagline: "Analitica operativa profunda", description: "Ingresos, mano de obra, inventario, compras, marketing, reservas, entrega, experiencia del cliente y mas - cada uno con recomendaciones de Sundae Coach.", icon: "insights", features: ["Inteligencia de ingresos y beneficio", "Optimizacion del coste laboral", "Desperdicio y variacion de inventario", "Valoracion de compras y proveedores", "Atribucion del ROI de marketing", "Motor de correlacion Cross-Intelligence"], stat: "12", statLabel: "areas operativas, cruzadas entre si", mockup: InsightsModuleMockup },
    { name: "Ask Sundae", tagline: "Analitica conversacional", description: "Haz preguntas en lenguaje simple. Obtén respuestas respaldadas por tus datos reales - con fuentes, no suposiciones. Disponible en web, Telegram, Slack y Microsoft Teams.", icon: "conversation", features: ["Consultas en lenguaje natural", "Modo monitor (alertas en tiempo real)", "Modo briefing (resúmenes diarios)", "Web + Telegram + Slack + Teams", "Historial de conversaciones", "Respuestas con fuentes"], stat: "30s", statLabel: "de la pregunta a la respuesta citada", mockup: IntelligenceChatMockup },
    { name: "Foresight", tagline: "Inteligencia predictiva", description: "Previsiones para ingresos, mano de obra, coste de comida y beneficio - con bandas de confianza, escenarios y briefings ejecutivos semanales.", icon: "forecasting", features: ["Previsiones multimetricas de 14-365 dias", "Simulador de escenarios con Monte Carlo", "Planificacion de mano de obra y compras guiada por previsiones", "Previsiones en cascada entre modulos", "Autocorreccion de la precision", "Briefings ejecutivos IA con exportacion PDF"], stat: "91%", statLabel: "precision de previsiones con autocorreccion", mockup: ForesightDashboardMockup },
  ],
};

export default function ProductPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = copyMap[locale as keyof typeof copyMap] ?? getGeneratedLocalCopy(copyMap, generatedLocalCopy.copyMap, locale) ?? copyMap.en;
  const pillars = localizedPillars[locale as keyof typeof localizedPillars] ?? getGeneratedLocalCopy(localizedPillars, generatedLocalCopy.localizedPillars, locale) ?? localizedPillars.en;
  const cream = productCreamCopy[locale as keyof typeof productCreamCopy] ?? productCreamCopy.en;
  const creamMid = productCreamMidCopy[locale as keyof typeof productCreamMidCopy] ?? productCreamMidCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.heroBadge} title={ui.heroTitle} description={ui.heroDescription}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" size="lg" onClick={() => cta("/pricing", "see_pricing_product_hero", { page: "/product" })}>{ui.heroPrimary}</Button>
          <Button variant="outline-light" size="lg" onClick={() => cta("/demo", "book_demo_product_hero", { page: "/product" })}>{ui.heroSecondary}</Button>
        </div>
      </PageHero>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp><div className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.ctaTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)]">{ui.ctaDescription}</p>
          </div></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card variant="elevated" className="h-full overflow-hidden border-2 border-[#FF5C4D]/30">
                <div className="relative h-48 overflow-hidden bg-[var(--surface-subtle)] p-3">
                  <BenchmarkDashboardMockup />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-hover)] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 badge badge--free text-[10px] z-10">{ui.freeLabel}</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[var(--text-display)] mb-2">{ui.freeTitle}</h3>
                  <p className="text-sm text-[#FF8473] font-semibold mb-3">{ui.freeSubtitle}</p>
                  <p className="text-[var(--text-supporting)] mb-4 leading-relaxed">{ui.freeDescription}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">{ui.freeIncludes}</p>
                  <ul className="text-sm text-[var(--text-supporting)] space-y-1.5 mb-6">
                    <li className="flex items-center gap-2"><span className="text-[#FF8473]">✓</span> {locale === 'en' ? 'Every area of the operation' : locale === 'ar' ? 'كل مجالات التشغيل' : locale === 'fr' ? "Tous les domaines de l'exploitation" : 'Todas las areas de la operacion'}</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF8473]">✓</span> {locale === 'en' ? 'Pulse (intraday operations)' : locale === 'ar' ? 'Pulse (العمليات داخل اليوم)' : locale === 'fr' ? 'Pulse (operations intraday)' : 'Pulse (operaciones intradia)'}</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF8473]">✓</span> {locale === 'en' ? 'Ask Sundae' : locale === 'ar' ? 'Ask Sundae' : locale === 'fr' ? 'Ask Sundae' : 'Ask Sundae'}</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF8473]">✓</span> {locale === 'en' ? 'Anonymous peer benchmarking' : locale === 'ar' ? 'مقارنة مرجعية مجهولة مع الأقران' : locale === 'fr' ? 'Benchmarking anonyme entre pairs' : 'Benchmarking anonimo entre pares'}</li>
                  </ul>
                  <Button variant="primary" className="w-full" onClick={() => cta("/core", "view_core_product_card", { page: "/product" })}>{ui.freeCta}</Button>
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
                  <h3 className="text-2xl font-bold text-[var(--text-display)] mb-2">{ui.coreTitle}</h3>
                  <p className="text-sm text-purple-400 font-semibold mb-3">{ui.coreSubtitle}</p>
                  <p className="text-[var(--text-supporting)] mb-4 leading-relaxed">{ui.coreDescription}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">{ui.coreIncludes}</p>
                  <ul className="text-sm text-[var(--text-supporting)] space-y-1.5 mb-6">
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> {locale === 'en' ? 'Demand-aware scheduling' : locale === 'ar' ? 'جدولة واعية بالطلب' : locale === 'fr' ? 'Plannings pilotes par la demande' : 'Horarios guiados por demanda'}</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> {locale === 'en' ? 'Time & attendance' : locale === 'ar' ? 'الحضور والانصراف' : locale === 'fr' ? 'Temps et presence' : 'Control horario'}</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> {locale === 'en' ? 'Payroll readiness & statutory exports' : locale === 'ar' ? 'جاهزية الرواتب والتصدير النظامي' : locale === 'fr' ? 'Preparation de la paie et exports statutaires' : 'Preparacion de nominas y exportes estatutarios'}</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> {locale === 'en' ? 'People & HR records' : locale === 'ar' ? 'سجلات الأفراد والموارد البشرية' : locale === 'fr' ? 'Dossiers RH' : 'Registros de personas y RR. HH.'}</li>
                  </ul>
                  <Button variant="primary" className="w-full" onClick={() => cta("/crew", "view_crew_product", { page: "/product" })}>{ui.coreCta}</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="sm" onClick={() => cta("/pricing", "see_pricing_product", { page: "/product" })}>{ui.compareCta}</Button>
          </div>
        </div>
      </section>

      {/* Cream relief - warm break before the long dark Six Intelligence Layers pillar run (the volume system) */}
      <CreamBreak eyebrow={cream.eyebrow} statement={cream.statement} lede={cream.lede} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp><div className="text-center mb-16">
            <p className="eyebrow mb-4">{ui.layersEyebrow}</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.layersTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.layersDescription}</p>
          </div></FadeUp>
          <div className="space-y-24">
            {pillars.slice(0, 3).map((pillar, index) => {
              const Mockup = pillar.mockup;
              return (
                <FadeUp key={pillar.name} delay={index * 0.05}>
                  <div className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}><Mockup /></div>
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${index === 0 ? 'from-red-500 to-rose-600' : index === 1 ? 'from-[#FF7E6F] to-[#FF5C4D]' : index === 2 ? 'from-amber-500 to-orange-600' : index === 3 ? 'from-[#F2B45C] to-[#C2410C]' : index === 4 ? 'from-green-500 to-emerald-600' : 'from-[#E9A24A] to-[#FF5C4D]'} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[var(--text-display)]">{pillar.name}</h3>
                          <p className="text-sm text-[var(--text-muted)] font-medium">{pillar.tagline}</p>
                        </div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-6">{pillar.description}</p>
                      <div className="space-y-2 mb-4">
                        {pillar.features.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-[#FF5C4D] flex-shrink-0 mt-0.5">✓</span>
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

      <CreamBreak eyebrow={creamMid.eyebrow} statement={creamMid.statement} lede={creamMid.lede} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {pillars.slice(3).map((pillar, i) => {
              const index = i + 3;
              const Mockup = pillar.mockup;
              return (
                <FadeUp key={pillar.name} delay={i * 0.05}>
                  <div className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}><Mockup /></div>
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${index === 3 ? 'from-[#F2B45C] to-[#C2410C]' : index === 4 ? 'from-green-500 to-emerald-600' : 'from-[#E9A24A] to-[#FF5C4D]'} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[var(--text-display)]">{pillar.name}</h3>
                          <p className="text-sm text-[var(--text-muted)] font-medium">{pillar.tagline}</p>
                        </div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-6">{pillar.description}</p>
                      <div className="space-y-2 mb-4">
                        {pillar.features.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-[#FF5C4D] flex-shrink-0 mt-0.5">✓</span>
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <p className="eyebrow mb-4">{ui.loopEyebrow}</p>
            <h2 className="section-h2 text-white mb-5 text-balance">{ui.loopTitle}</h2>
            <p className="body-lg text-white/70 mb-8">{ui.loopDescription}</p>
            <Link href="/product/recovery">
              <Button variant="outline-light" size="lg">{ui.loopCta}</Button>
            </Link>
          </FadeUp>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Link href="/demo"><Button variant="primary" size="lg">{ui.heroSecondary}</Button></Link>
        <Link href="/product"><Button variant="outline-ink" size="lg">{ui.heroPrimary}</Button></Link>
      </PageCTA>
    </div>
  );
}
