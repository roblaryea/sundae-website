"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

type Step = {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  actions: string[];
  timeline: string;
  cta: string;
  ctaLink: string;
  icon: SundaeIconName;
  color: string;
};

type GettingStartedCopy = {
  badge: string;
  title: string;
  description: string;
  supporting: string;
  startFree: string;
  calculatePath: string;
  journeyTitle: string;
  journeyDescription: string;
  steps: Step[];
  noForcedTitle: string;
  noForcedDescription: string;
  commonJourneysTitle: string;
  commonJourneysDescription: string;
  journeys: Array<{
    title: string;
    icon: SundaeIconName;
    items: string[];
  }>;
  timelinesTitle: string;
  timelinesDescription: string;
  timelines: Array<{ tier: string; time: string; description: string }>;
  finalTitle: string;
  finalDescription: string;
  cards: Array<{
    title: string;
    description: string;
    button: string;
    icon: SundaeIconName;
    color: string;
    href?: string;
  }>;
};

const localizedGettingStartedCopy: Record<"en" | "ar" | "fr" | "es", GettingStartedCopy> = {
  en: {
    badge: "Getting Started Guide",
    title: "Your Journey with Sundae",
    description: "Six steps from free benchmarking to complete operational intelligence. Start small, scale at your pace.",
    supporting: "Most operators start with Report Lite (free forever), prove the value, then expand. You control the timeline.",
    startFree: "Start Free",
    calculatePath: "Calculate Your Path",
    journeyTitle: "The Sundae Journey: 6 Steps",
    journeyDescription: "From free benchmarking to enterprise intelligence",
    steps: [
      {
        number: 1,
        title: "Start Free (Report Lite)",
        subtitle: "Prove the value. Pay nothing.",
        description: "Upload your POS data and get instant benchmarking. No credit card required. See where you stand against similar restaurants within minutes.",
        actions: ["Upload POS data (CSV format)", "Instant benchmark against peers", "Identify top 3 opportunities", "Build internal business case"],
        timeline: "Instant",
        cta: "Start Free",
        ctaLink: "/report",
        icon: "report",
        color: "from-blue-500 to-blue-600",
      },
      {
        number: 2,
        title: "Understand Your Baseline",
        subtitle: "See where you stand vs peers.",
        description: "Use Report Lite to understand your performance across 5 core metrics. Compare against restaurants like yours. Build the case for deeper intelligence.",
        actions: ["Benchmark sales per square foot", "Compare labor cost % to peers", "Identify margin opportunities", "Share insights with leadership"],
        timeline: "1-2 weeks to build case",
        cta: "Learn About Report",
        ctaLink: "/report",
        icon: "benchmarking",
        color: "from-purple-500 to-purple-600",
      },
      {
        number: 3,
        title: "Decide Upgrade Path",
        subtitle: "Report Plus/Pro or Core?",
        description: "Once you've proven the value with Report Lite, choose your upgrade path based on speed and depth needs.",
        actions: ["Need intelligent insights? → Report Plus/Pro", "Need operational speed? → Core", "Daily reports sufficient? → Report Plus/Pro", "10+ locations? → Core"],
        timeline: "Report Plus/Pro: 1-2 days | Core: 1-2 weeks",
        cta: "Compare Options",
        ctaLink: "/report-vs-core",
        icon: "balance",
        color: "from-green-500 to-green-600",
      },
      {
        number: 4,
        title: "Add Modules (Optional)",
        subtitle: "Go deeper where it matters most.",
        description: "Choose specialized modules based on your biggest operational pain points. Requires Core tier for real-time specialized intelligence.",
        actions: ["High labor cost? → Labor Intelligence", "High food cost/waste? → Inventory Intelligence", "Complex vendors? → Purchasing Intelligence", "Heavy marketing? → Marketing Intelligence", "Reservation-driven? → Reservations Intelligence"],
        timeline: "1-2 weeks per module",
        cta: "Explore Modules",
        ctaLink: "/modules",
        icon: "network",
        color: "from-orange-500 to-orange-600",
      },
      {
        number: 5,
        title: "Consider Watchtower (Optional)",
        subtitle: "Add external intelligence.",
        description: "See what's happening outside your four walls. Track competitors, predict demand from events, and understand market dynamics.",
        actions: ["Track up to 10 competitors per location", "Monitor pricing & promotions", "Predict demand from weather/events", "Strategic market intelligence"],
        timeline: "1 week setup",
        cta: "Learn About Watchtower",
        ctaLink: "/product/watchtower",
        icon: "watchtower",
        color: "from-indigo-500 to-indigo-600",
      },
      {
        number: 6,
        title: "Scale to Enterprise",
        subtitle: "100+ locations or custom needs.",
        description: "Custom refresh frequency, unlimited credits, white-label options, SSO, dedicated CSM, and 24/7 support with custom SLAs.",
        actions: ["Custom refresh frequency", "Unlimited credits & dashboards", "White-label & SSO", "Dedicated customer success manager", "24/7 support with custom SLAs"],
        timeline: "2-4 weeks (custom implementation)",
        cta: "Contact Sales",
        ctaLink: "/contact",
        icon: "multiLocation",
        color: "from-purple-500 to-pink-600",
      },
    ],
    noForcedTitle: "No Forced Timelines",
    noForcedDescription: "Start with Report Lite today. Upgrade to Report Plus/Pro next month. Add Core in Q3. Scale to Enterprise in Q4. You control the pace based on your priorities and budget.",
    commonJourneysTitle: "Common Journeys",
    commonJourneysDescription: "How do operators typically progress through Sundae?",
    journeys: [
      {
        title: "1-5 Location Operator",
        icon: "labor",
        items: ["Start with Report Lite (free)", "Upgrade to Report Plus for deeper insights", "Consider Core when scaling to 10+ locations"],
      },
      {
        title: "10-50 Location Operator",
        icon: "multiLocation",
        items: ["Start with Core Lite for real-time ops", "Add 1-2 modules (Labor, Inventory)", "Add Watchtower for market intelligence"],
      },
      {
        title: "100+ Location Enterprise",
        icon: "growth",
        items: ["Start with Enterprise tier", "Full module suite + Watchtower", "Custom integrations & white-label"],
      },
    ],
    timelinesTitle: "Implementation Timelines",
    timelinesDescription: "How long does each tier take to implement?",
    timelines: [
      { tier: "Report Lite", time: "Instant", description: "Upload CSV, get benchmark immediately" },
      { tier: "Report Plus/Pro", time: "1-2 Days", description: "Parsing setup & integration" },
      { tier: "Core Lite/Pro", time: "1-2 Weeks", description: "POS integration & real-time setup" },
      { tier: "Enterprise", time: "2-4 Weeks", description: "Custom implementation & training" },
    ],
    finalTitle: "Ready to Start Your Journey?",
    finalDescription: "Begin with Report Lite (free forever) or calculate your custom path with the pricing calculator.",
    cards: [
      { title: "Start Free", description: "Report Lite, no credit card", button: "Start Free →", icon: "report", color: "bg-green-600", href: "/report" },
      { title: "Calculate Your Path", description: "Interactive pricing calculator", button: "Calculate Pricing →", icon: "calculator", color: "bg-[#1C47FF]" },
      { title: "Talk to an Expert", description: "Custom recommendations", button: "Book Demo →", icon: "conversation", color: "bg-purple-600", href: "/demo" },
    ],
  },
  ar: {
    badge: "دليل البدء",
    title: "رحلتك مع Sundae",
    description: "ست خطوات من القياس المجاني إلى الذكاء التشغيلي الكامل. ابدأ صغيرًا وتوسع بالوتيرة التي تناسبك.",
    supporting: "يبدأ معظم المشغلين بـ Report Lite (مجانًا دائمًا)، يثبتون القيمة، ثم يتوسعون. أنت تتحكم في الجدول الزمني.",
    startFree: "ابدأ مجانًا",
    calculatePath: "احسب مسارك",
    journeyTitle: "رحلة Sundae: 6 خطوات",
    journeyDescription: "من القياس المجاني إلى ذكاء المؤسسة",
    steps: [
      { number: 1, title: "ابدأ مجانًا (Report Lite)", subtitle: "أثبت القيمة. لا تدفع شيئًا.", description: "ارفع بيانات نقاط البيع واحصل على قياس فوري. لا حاجة لبطاقة ائتمان.", actions: ["رفع بيانات POS بصيغة CSV", "قياس فوري مقابل أقرانك", "تحديد أفضل 3 فرص", "بناء حالة داخلية"], timeline: "فوري", cta: "ابدأ مجانًا", ctaLink: "/report", icon: "report", color: "from-blue-500 to-blue-600" },
      { number: 2, title: "افهم خط الأساس", subtitle: "اعرف موقعك مقابل أقرانك.", description: "استخدم Report Lite لفهم الأداء عبر 5 مقاييس أساسية.", actions: ["قياس المبيعات لكل قدم مربع", "مقارنة نسبة تكلفة العمالة", "تحديد فرص الهامش", "مشاركة الرؤى مع القيادة"], timeline: "1-2 أسبوع لبناء الحالة", cta: "تعرف على Report", ctaLink: "/report", icon: "benchmarking", color: "from-purple-500 to-purple-600" },
      { number: 3, title: "قرر مسار الترقية", subtitle: "Report Plus/Pro أم Core؟", description: "بعد إثبات القيمة، اختر مسار الترقية حسب السرعة والعمق.", actions: ["تحتاج رؤى ذكية؟ → Report Plus/Pro", "تحتاج سرعة تشغيلية؟ → Core", "تقارير يومية تكفي؟ → Report Plus/Pro", "أكثر من 10 مواقع؟ → Core"], timeline: "Report Plus/Pro: 1-2 يوم | Core: 1-2 أسبوع", cta: "قارن الخيارات", ctaLink: "/report-vs-core", icon: "balance", color: "from-green-500 to-green-600" },
      { number: 4, title: "أضف الوحدات (اختياري)", subtitle: "تعمق حيث يهمك أكثر.", description: "اختر وحدات متخصصة حسب أكبر نقاط الألم.", actions: ["تكلفة عمالة مرتفعة؟ → Labor Intelligence", "هدر/تكلفة طعام مرتفعة؟ → Inventory Intelligence", "موردون معقدون؟ → Purchasing Intelligence", "إنفاق تسويقي كبير؟ → Marketing Intelligence", "أعمال تعتمد على الحجوزات؟ → Reservations Intelligence"], timeline: "1-2 أسبوع لكل وحدة", cta: "استعرض الوحدات", ctaLink: "/modules", icon: "network", color: "from-orange-500 to-orange-600" },
      { number: 5, title: "فكّر في Watchtower (اختياري)", subtitle: "أضف ذكاءً خارجيًا.", description: "تتبع المنافسين وتوقع الطلب من الأحداث وافهم ديناميكيات السوق.", actions: ["تتبع حتى 10 منافسين لكل موقع", "مراقبة الأسعار والعروض", "التنبؤ بالطلب من الطقس/الأحداث", "ذكاء سوقي استراتيجي"], timeline: "إعداد أسبوع واحد", cta: "تعرف على Watchtower", ctaLink: "/product/watchtower", icon: "watchtower", color: "from-indigo-500 to-indigo-600" },
      { number: 6, title: "التوسع إلى Enterprise", subtitle: "100+ موقع أو احتياجات خاصة.", description: "تحديثات مخصصة وخيارات white-label وSSO ودعم 24/7.", actions: ["معدل تحديث مخصص", "أرصدة ولوحات غير محدودة", "White-label و SSO", "مدير نجاح عملاء مخصص", "دعم 24/7 باتفاقيات خدمة مخصصة"], timeline: "2-4 أسابيع (تنفيذ مخصص)", cta: "تواصل مع المبيعات", ctaLink: "/contact", icon: "multiLocation", color: "from-purple-500 to-pink-600" },
    ],
    noForcedTitle: "لا جداول زمنية مفروضة",
    noForcedDescription: "ابدأ بـ Report Lite اليوم، ثم ترقَّ إلى Report Plus/Pro في الشهر المقبل. أضف Core لاحقًا. التوسع حسب أولوياتك وميزانيتك.",
    commonJourneysTitle: "مسارات شائعة",
    commonJourneysDescription: "كيف يتدرج المشغلون عادةً داخل Sundae؟",
    journeys: [
      { title: "مشغل 1-5 مواقع", icon: "labor", items: ["ابدأ بـ Report Lite (مجاني)", "ترقَّ إلى Report Plus لرؤى أعمق", "فكّر في Core عند التوسع إلى 10+ مواقع"] },
      { title: "مشغل 10-50 موقعًا", icon: "multiLocation", items: ["ابدأ بـ Core Lite للعمليات اللحظية", "أضف 1-2 وحدة (العمالة، المخزون)", "أضف Watchtower للذكاء السوقي"] },
      { title: "مؤسسة 100+ موقع", icon: "growth", items: ["ابدأ بخطة Enterprise", "حزمة وحدات كاملة + Watchtower", "تكاملات مخصصة وWhite-label"] },
    ],
    timelinesTitle: "الجدول الزمني للتنفيذ",
    timelinesDescription: "كم يستغرق تنفيذ كل فئة؟",
    timelines: [
      { tier: "Report Lite", time: "فوري", description: "ارفع CSV واحصل على القياس فورًا" },
      { tier: "Report Plus/Pro", time: "1-2 يوم", description: "إعداد التحليل والتكامل" },
      { tier: "Core Lite/Pro", time: "1-2 أسبوع", description: "تكامل POS والإعداد اللحظي" },
      { tier: "Enterprise", time: "2-4 أسبوع", description: "تنفيذ وتدريب مخصص" },
    ],
    finalTitle: "هل أنت مستعد لبدء رحلتك؟",
    finalDescription: "ابدأ بـ Report Lite (مجانًا دائمًا) أو احسب مسارك المخصص.",
    cards: [
      { title: "ابدأ مجانًا", description: "Report Lite، بدون بطاقة ائتمان", button: "ابدأ مجانًا →", icon: "report", color: "bg-green-600", href: "/report" },
      { title: "احسب مسارك", description: "حاسبة تسعير تفاعلية", button: "احسب التسعير →", icon: "calculator", color: "bg-[#1C47FF]" },
      { title: "تحدث مع خبير", description: "توصيات مخصصة", button: "احجز عرضًا →", icon: "conversation", color: "bg-purple-600", href: "/demo" },
    ],
  },
  fr: {
    badge: "Guide de démarrage",
    title: "Votre parcours avec Sundae",
    description: "Six étapes du benchmark gratuit à l'intelligence opérationnelle complète. Commencez petit, avancez à votre rythme.",
    supporting: "La plupart des opérateurs commencent avec Report Lite (gratuit à vie), prouvent la valeur puis étendent. Vous contrôlez le rythme.",
    startFree: "Commencer gratuitement",
    calculatePath: "Calculer votre parcours",
    journeyTitle: "Le parcours Sundae : 6 étapes",
    journeyDescription: "Du benchmark gratuit à l'intelligence entreprise",
    steps: [
      { number: 1, title: "Commencer gratuitement (Report Lite)", subtitle: "Prouvez la valeur. Ne payez rien.", description: "Importez vos données POS et obtenez un benchmark immédiat.", actions: ["Importer des données POS (CSV)", "Benchmark immédiat", "Identifier les 3 meilleures opportunités", "Construire un business case"], timeline: "Immédiat", cta: "Commencer gratuitement", ctaLink: "/report", icon: "report", color: "from-blue-500 to-blue-600" },
      { number: 2, title: "Comprendre votre base", subtitle: "Voir votre position vs vos pairs.", description: "Utilisez Report Lite pour comprendre vos performances sur 5 métriques.", actions: ["Comparer les ventes au pied carré", "Comparer le coût de la main-d'oeuvre", "Identifier les opportunités de marge", "Partager avec le leadership"], timeline: "1-2 semaines", cta: "Découvrir Report", ctaLink: "/report", icon: "benchmarking", color: "from-purple-500 to-purple-600" },
      { number: 3, title: "Choisir la montée de gamme", subtitle: "Report Plus/Pro ou Core ?", description: "Après avoir prouvé la valeur avec Report Lite, choisissez selon vos besoins de vitesse et de profondeur.", actions: ["Besoin d'insights ? → Report Plus/Pro", "Besoin de vitesse ? → Core", "Les rapports quotidiens suffisent ? → Report Plus/Pro", "10+ sites ? → Core"], timeline: "Report Plus/Pro : 1-2 jours | Core : 1-2 semaines", cta: "Comparer les options", ctaLink: "/report-vs-core", icon: "balance", color: "from-green-500 to-green-600" },
      { number: 4, title: "Ajouter des modules (optionnel)", subtitle: "Approfondir là où c'est le plus utile.", description: "Choisissez des modules spécialisés selon vos plus gros points de douleur.", actions: ["Main-d'oeuvre élevée ? → Labor Intelligence", "Coût/gaspillage alimentaire ? → Inventory Intelligence", "Fournisseurs complexes ? → Purchasing Intelligence", "Marketing intense ? → Marketing Intelligence", "Basé sur les réservations ? → Reservations Intelligence"], timeline: "1-2 semaines par module", cta: "Explorer les modules", ctaLink: "/modules", icon: "network", color: "from-orange-500 to-orange-600" },
      { number: 5, title: "Considérer Watchtower (optionnel)", subtitle: "Ajouter une intelligence externe.", description: "Voir ce qui se passe hors de vos murs.", actions: ["Jusqu'à 10 concurrents par site", "Suivre prix et promos", "Prédire la demande via météo/événements", "Intelligence marché"], timeline: "1 semaine", cta: "Découvrir Watchtower", ctaLink: "/product/watchtower", icon: "watchtower", color: "from-indigo-500 to-indigo-600" },
      { number: 6, title: "Passer à l'entreprise", subtitle: "100+ sites ou besoins sur mesure.", description: "Fréquence de rafraîchissement, crédits illimités, white-label, SSO, support dédié.", actions: ["Fréquence personnalisée", "Crédits et tableaux illimités", "White-label et SSO", "CSM dédié", "Support 24/7 avec SLA"], timeline: "2-4 semaines", cta: "Contacter les ventes", ctaLink: "/contact", icon: "multiLocation", color: "from-purple-500 to-pink-600" },
    ],
    noForcedTitle: "Aucun calendrier imposé",
    noForcedDescription: "Commencez avec Report Lite aujourd'hui, montez en gamme quand c'est pertinent. Vous gardez le contrôle.",
    commonJourneysTitle: "Parcours fréquents",
    commonJourneysDescription: "Comment les opérateurs progressent-ils généralement ?",
    journeys: [
      { title: "Opérateur 1-5 sites", icon: "labor", items: ["Commencer avec Report Lite (gratuit)", "Monter sur Report Plus pour plus de profondeur", "Passer à Core à partir de 10+ sites"] },
      { title: "Opérateur 10-50 sites", icon: "multiLocation", items: ["Commencer avec Core Lite pour le temps réel", "Ajouter 1-2 modules", "Ajouter Watchtower pour le marché"] },
      { title: "Entreprise 100+ sites", icon: "growth", items: ["Démarrer en Enterprise", "Suite complète + Watchtower", "Intégrations sur mesure et white-label"] },
    ],
    timelinesTitle: "Délais d'implémentation",
    timelinesDescription: "Combien de temps prend chaque offre ?",
    timelines: [
      { tier: "Report Lite", time: "Immédiat", description: "Importer CSV, benchmark instantané" },
      { tier: "Report Plus/Pro", time: "1-2 jours", description: "Configuration et intégration" },
      { tier: "Core Lite/Pro", time: "1-2 semaines", description: "Intégration POS et temps réel" },
      { tier: "Enterprise", time: "2-4 semaines", description: "Implémentation et formation" },
    ],
    finalTitle: "Prêt à commencer votre parcours ?",
    finalDescription: "Commencez avec Report Lite (gratuit à vie) ou calculez votre parcours personnalisé.",
    cards: [
      { title: "Commencer gratuitement", description: "Report Lite, sans carte bancaire", button: "Commencer gratuitement →", icon: "report", color: "bg-green-600", href: "/report" },
      { title: "Calculer votre parcours", description: "Calculateur de prix interactif", button: "Calculer le prix →", icon: "calculator", color: "bg-[#1C47FF]" },
      { title: "Parler à un expert", description: "Recommandations personnalisées", button: "Réserver une démo →", icon: "conversation", color: "bg-purple-600", href: "/demo" },
    ],
  },
  es: {
    badge: "Guía de inicio",
    title: "Tu viaje con Sundae",
    description: "Seis pasos desde el benchmarking gratuito hasta la inteligencia operativa completa. Empieza pequeño y escala a tu ritmo.",
    supporting: "La mayoría empieza con Report Lite (gratis para siempre), demuestra el valor y luego amplía. Tú controlas el ritmo.",
    startFree: "Empezar gratis",
    calculatePath: "Calcular tu ruta",
    journeyTitle: "El viaje Sundae: 6 pasos",
    journeyDescription: "Del benchmarking gratuito a la inteligencia empresarial",
    steps: [
      { number: 1, title: "Empieza gratis (Report Lite)", subtitle: "Demuestra el valor. No pagas nada.", description: "Sube tus datos de POS y obtén benchmarking inmediato.", actions: ["Subir datos POS (CSV)", "Benchmark instantáneo", "Identificar las 3 mejores oportunidades", "Construir caso interno"], timeline: "Inmediato", cta: "Empezar gratis", ctaLink: "/report", icon: "report", color: "from-blue-500 to-blue-600" },
      { number: 2, title: "Entiende tu base", subtitle: "Ve dónde estás frente a tus pares.", description: "Usa Report Lite para entender tu rendimiento en 5 métricas clave.", actions: ["Comparar ventas por pie cuadrado", "Comparar % coste laboral", "Identificar oportunidades de margen", "Compartir insights con liderazgo"], timeline: "1-2 semanas para justificar", cta: "Conocer Report", ctaLink: "/report", icon: "benchmarking", color: "from-purple-500 to-purple-600" },
      { number: 3, title: "Decide la subida", subtitle: "¿Report Plus/Pro o Core?", description: "Cuando hayas demostrado el valor, elige según velocidad y profundidad.", actions: ["¿Necesitas insights? → Report Plus/Pro", "¿Necesitas velocidad? → Core", "¿Informes diarios bastan? → Report Plus/Pro", "¿10+ ubicaciones? → Core"], timeline: "Report Plus/Pro: 1-2 días | Core: 1-2 semanas", cta: "Comparar opciones", ctaLink: "/report-vs-core", icon: "balance", color: "from-green-500 to-green-600" },
      { number: 4, title: "Añade módulos (opcional)", subtitle: "Profundiza donde importa más.", description: "Elige módulos especializados según tus mayores puntos de dolor.", actions: ["¿Coste laboral alto? → Labor Intelligence", "¿Coste/merma de comida alto? → Inventory Intelligence", "¿Proveedores complejos? → Purchasing Intelligence", "¿Marketing pesado? → Marketing Intelligence", "¿Negocio de reservas? → Reservations Intelligence"], timeline: "1-2 semanas por módulo", cta: "Explorar módulos", ctaLink: "/modules", icon: "network", color: "from-orange-500 to-orange-600" },
      { number: 5, title: "Considera Watchtower (opcional)", subtitle: "Añade inteligencia externa.", description: "Ve qué ocurre fuera de tus paredes y comprende la dinámica del mercado.", actions: ["Hasta 10 competidores por ubicación", "Supervisar precios y promociones", "Predecir demanda por clima/eventos", "Inteligencia de mercado"], timeline: "1 semana", cta: "Conocer Watchtower", ctaLink: "/product/watchtower", icon: "watchtower", color: "from-indigo-500 to-indigo-600" },
      { number: 6, title: "Escala a Enterprise", subtitle: "100+ ubicaciones o necesidades personalizadas.", description: "Frecuencia de actualización, créditos ilimitados, white-label, SSO y soporte dedicado.", actions: ["Frecuencia personalizada", "Créditos y dashboards ilimitados", "White-label y SSO", "CSM dedicado", "Soporte 24/7 con SLA"], timeline: "2-4 semanas", cta: "Contactar ventas", ctaLink: "/contact", icon: "multiLocation", color: "from-purple-500 to-pink-600" },
    ],
    noForcedTitle: "Sin calendarios forzados",
    noForcedDescription: "Empieza con Report Lite hoy y sube de nivel cuando te convenga. Tú marcas el ritmo.",
    commonJourneysTitle: "Recorridos habituales",
    commonJourneysDescription: "¿Cómo suelen avanzar los operadores?",
    journeys: [
      { title: "Operador 1-5 ubicaciones", icon: "labor", items: ["Empezar con Report Lite (gratis)", "Pasar a Report Plus para más profundidad", "Moverse a Core al crecer a 10+ ubicaciones"] },
      { title: "Operador 10-50 ubicaciones", icon: "multiLocation", items: ["Empezar con Core Lite para tiempo real", "Añadir 1-2 módulos", "Añadir Watchtower para mercado"] },
      { title: "Empresa 100+ ubicaciones", icon: "growth", items: ["Empezar en Enterprise", "Paquete completo + Watchtower", "Integraciones a medida y white-label"] },
    ],
    timelinesTitle: "Tiempos de implementación",
    timelinesDescription: "¿Cuánto tarda cada nivel?",
    timelines: [
      { tier: "Report Lite", time: "Inmediato", description: "Sube CSV, benchmark al instante" },
      { tier: "Report Plus/Pro", time: "1-2 días", description: "Configuración e integración" },
      { tier: "Core Lite/Pro", time: "1-2 semanas", description: "Integración POS y tiempo real" },
      { tier: "Enterprise", time: "2-4 semanas", description: "Implementación y formación" },
    ],
    finalTitle: "¿Listo para empezar tu viaje?",
    finalDescription: "Empieza con Report Lite (gratis para siempre) o calcula tu ruta personalizada.",
    cards: [
      { title: "Empezar gratis", description: "Report Lite, sin tarjeta", button: "Empezar gratis →", icon: "report", color: "bg-green-600", href: "/report" },
      { title: "Calcular tu ruta", description: "Calculadora de precios interactiva", button: "Calcular precio →", icon: "calculator", color: "bg-[#1C47FF]" },
      { title: "Hablar con un experto", description: "Recomendaciones personalizadas", button: "Reservar demo →", icon: "conversation", color: "bg-purple-600", href: "/demo" },
    ],
  },
};

export default function GettingStartedPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const copy = localizedGettingStartedCopy[locale] ?? localizedGettingStartedCopy.en;

  const handleFinalCardClick = (href?: string) => {
    if (href === "/report") {
      cta(REPORT_APP_URL, "start_free_from_getting_started_bottom", { page: "/getting-started" });
      return;
    }

    if (href === "/demo") {
      cta("/demo", "book_demo_from_getting_started", { page: "/getting-started" });
      return;
    }

    window.open(PRICING_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge={copy.badge}
        title={copy.title}
        description={copy.description}
      >
        <p className="body-lg text-[var(--text-muted)] mb-8 max-w-3xl mx-auto">
          {copy.supporting}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => cta(REPORT_APP_URL, "start_free_from_getting_started", { page: "/getting-started" })}
          >
            {copy.startFree}
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => window.open(PRICING_URL, "_blank", "noopener,noreferrer")}
          >
            {copy.calculatePath}
          </Button>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.journeyTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.journeyDescription}</p>
          </FadeUp>

          <div className="space-y-8">
            {copy.steps.map((step, index) => (
              <FadeUp key={step.number} delay={index * 0.1}>
                <Card variant="elevated" className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-2 bg-[var(--surface-subtle)] p-6 flex flex-col items-center justify-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg`}>{step.number}</div>
                      <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                        <SundaeIcon name={step.icon} size="xl" className="text-white" />
                      </div>
                    </div>
                    <div className="lg:col-span-7 p-6">
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                      <p className="text-lg font-semibold text-[var(--text-supporting)] mb-4">{step.subtitle}</p>
                      <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{step.description}</p>
                      <div className="bg-[var(--surface-faint)] rounded-lg p-4">
                        <p className="text-sm font-semibold text-[var(--text-muted)] uppercase mb-3">What You'll Do:</p>
                        <ul className="space-y-2">
                          {step.actions.map((action, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-green-400 mt-0.5">&#10003;</span>
                              <span className="text-sm text-[var(--text-secondary)]">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="lg:col-span-3 bg-[var(--surface-subtle)] p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-2">Timeline</p>
                        <p className="text-lg font-bold text-[var(--text-primary)] mb-6">{step.timeline}</p>
                      </div>
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => cta(step.ctaLink, `step_${step.number}_cta`, { page: "/getting-started" })}
                      >
                        {step.cta} &rarr;
                      </Button>
                    </div>
                  </div>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.noForcedTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.noForcedDescription}</p>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.commonJourneysTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.commonJourneysDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.journeys.map((journey) => (
              <StaggerItem key={journey.title}>
                <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-[#1C47FF] rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={journey.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-xl text-[var(--text-primary)] mb-4">{journey.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {journey.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{idx + 1}</div>
                          <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.timelinesTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.timelinesDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.timelines.map((timeline) => (
              <StaggerItem key={timeline.tier}>
                <Card variant="elevated" className="h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-[var(--text-primary)] mb-2">{timeline.tier}</CardTitle>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                      {timeline.time}
                    </div>
                    <CardDescription className="text-[var(--text-supporting)]">{timeline.description}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={copy.finalTitle} description={copy.finalDescription}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {copy.cards.map((card) => {
            return (
              <div key={card.title} className="h-full">
                <div className="p-6 bg-[var(--surface-faint)] border border-[var(--border-default)] rounded-xl h-full flex flex-col">
                  <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <SundaeIcon name={card.icon} size="lg" className="text-white" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">{card.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)] mb-4 text-center flex-1">{card.description}</p>
                  <Button
                    variant={card.color === "bg-green-600" ? "primary" : "outline-light"}
                    size="md"
                    className="w-full"
                    onClick={() => handleFinalCardClick(card.href)}
                  >
                    {card.button}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </PageCTA>
    </div>
  );
}
