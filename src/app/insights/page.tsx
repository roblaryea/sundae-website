'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

const localizedInsightsUi = {
  en: {
    badge: 'SUNDAE INSIGHTS',
    title: 'Go Deeper Into Every Part of Your Operation',
    description:
      'Fourteen specialized modules cover revenue, labor, inventory, purchasing, marketing, reservations, profit, delivery, guest experience, CRM, revenue assurance, cross-intelligence, foresight intelligence, and executive summary. Each module is built for one operating domain.',
    bookDemo: 'Book a Demo',
    seeModules: 'See Module Pricing',
    categories: ['Revenue', 'Labor', 'Inventory', 'Purchasing', 'Marketing', 'Reservations', 'Profit', 'Rev. Assurance', 'Delivery', 'Guest Experience', 'Guest CRM', 'Cross-Intel'],
    valueProps: ['Add modules as you need them', 'AI-powered analytics per domain', 'Available on Core tiers'],
    whoItsForTitle: "Who It's For",
    whoItsForDescription: 'Teams that need domain-level detail they can use in the field',
    whoItsFor: [
      { title: 'Ops Leaders', description: 'Deep-dive into specific operational domains without building custom reports' },
      { title: 'Finance & FP&A', description: 'Profit intelligence, cost analysis, and revenue assurance in real time' },
      { title: 'Regional Managers', description: 'Module-level performance visibility across every location in your territory' },
    ],
    modulesTitle: '12 Modules. One Platform.',
    modulesDescription: 'Each module delivers AI-powered analytics for a specific operational domain',
    howTitle: 'How It Works',
    howDescription: 'Add modules to your Core subscription as your needs grow',
    fitEyebrow: 'HOW INSIGHTS FITS',
    fitTitle: 'The Analytical Layer',
    fitDescription:
      'Pulse helps teams manage the shift in front of them. Watchtower tracks the outside market. Insights modules give each function a deeper working view of labor, inventory, purchasing, marketing, and more.',
    fitItems: [
      { name: 'Pulse', desc: 'Real-time shift monitoring' },
      { name: 'Watchtower', desc: 'External market intelligence' },
      { name: 'Insights', desc: 'Domain-specific analytical intelligence' },
    ],
    ctaTitle: 'Start With What Matters Most',
    ctaDescription: 'Add the modules your operation needs. Scale as you grow. Every module available on Core tiers.',
    ctaDemo: 'Book a Demo',
    ctaPricing: 'See Module Pricing',
  },
  ar: {
    badge: 'وحدات الذكاء من Sundae',
    title: 'تعمق أكثر في كل جزء من عملياتك',
    description:
      '14 وحدة متخصصة تشمل الإيرادات والعمالة والمخزون والمشتريات والتسويق والحجوزات والربحية والتوصيل وتجربة الضيف وCRM وضمان الإيرادات والذكاء المتقاطع وذكاء التوقعات والملخص التنفيذي.',
    bookDemo: 'احجز عرضًا',
    seeModules: 'عرض تسعير الوحدات',
    categories: ['الإيرادات', 'العمالة', 'المخزون', 'المشتريات', 'التسويق', 'الحجوزات', 'الربحية', 'ضمان الإيرادات', 'التوصيل', 'تجربة الضيف', 'CRM الضيوف', 'الذكاء المتقاطع'],
    valueProps: ['أضف الوحدات حسب الحاجة', 'تحليلات مدعومة بالذكاء الاصطناعي لكل مجال', 'متاحة ضمن خطط Core'],
    whoItsForTitle: 'لمن هذا؟',
    whoItsForDescription: 'للفرق التي تحتاج قراءة تحليلية أعمق داخل كل مجال تشغيلي.',
    whoItsFor: [
      { title: 'قادة العمليات', description: 'تعمق في مجالات تشغيل محددة دون إنشاء تقارير مخصصة' },
      { title: 'المالية والتخطيط', description: 'ذكاء الربحية وتحليل التكاليف وضمان الإيرادات في الوقت الحقيقي' },
      { title: 'المديرون الإقليميون', description: 'رؤية الأداء على مستوى كل وحدة في كامل نطاقك' },
    ],
    modulesTitle: '12 وحدة. منصة واحدة.',
    modulesDescription: 'كل وحدة تقدم تحليلات مدعومة بالذكاء الاصطناعي لمجال تشغيلي محدد',
    howTitle: 'كيف يعمل',
    howDescription: 'أضف الوحدات إلى اشتراك Core مع نمو احتياجاتك',
    fitEyebrow: 'كيف تتكامل Insights',
    fitTitle: 'الطبقة التحليلية',
    fitDescription:
      'Pulse يراقب الوردية لحظيًا، وWatchtower يتابع ما يحدث خارج الجدران. أما وحدات Insights فتعطي كل فريق قراءة أعمق داخل مجاله، من العمالة والمخزون إلى المشتريات والتسويق.',
    fitItems: [
      { name: 'Pulse', desc: 'مراقبة لحظية للوردية' },
      { name: 'Watchtower', desc: 'ذكاء سوق خارجي' },
      { name: 'Insights', desc: 'ذكاء تحليلي خاص بالمجالات' },
    ],
    ctaTitle: 'ابدأ بما يهمك أكثر',
    ctaDescription: 'أضف الوحدات التي تحتاجها عملياتك. توسع مع النمو. كل الوحدات متاحة ضمن Core.',
    ctaDemo: 'احجز عرضًا',
    ctaPricing: 'عرض تسعير الوحدات',
  },
  fr: {
    badge: 'MODULES SUNDAE',
    title: 'Allez plus loin dans chaque partie de votre activité',
    description:
      '14 modules spécialisés couvrant le revenu, la main-d&apos;œuvre, les stocks, les achats, le marketing, les réservations, la profitabilité, la livraison, l&apos;expérience client, le CRM, la garantie du revenu, l&apos;intelligence croisée, la prévision et le résumé exécutif.',
    bookDemo: 'Réserver une démo',
    seeModules: 'Voir les tarifs des modules',
    categories: ['Revenu', 'Main-d&apos;œuvre', 'Stocks', 'Achats', 'Marketing', 'Réservations', 'Profit', 'Garantie du revenu', 'Livraison', 'Expérience client', 'CRM clients', 'Cross-Intel'],
    valueProps: ['Ajoutez des modules selon vos besoins', 'Analytique IA par domaine', 'Disponible sur les offres Core'],
    whoItsForTitle: 'À qui cela s’adresse',
    whoItsForDescription: 'Aux equipes qui ont besoin d une lecture plus fine de chaque domaine operationnel.',
    whoItsFor: [
      { title: 'Leaders opérations', description: 'Approfondissez des domaines précis sans rapports sur mesure' },
      { title: 'Finance & FP&A', description: 'Profitabilité, coûts et garantie du revenu en temps réel' },
      { title: 'Responsables régionaux', description: 'Visibilité par module sur chaque site de votre territoire' },
    ],
    modulesTitle: '12 modules. Une plateforme.',
    modulesDescription: 'Chaque module fournit des analyses IA pour un domaine opérationnel précis',
    howTitle: 'Comment ça marche',
    howDescription: 'Ajoutez des modules à votre abonnement Core au fur et à mesure de vos besoins',
    fitEyebrow: 'COMMENT INSIGHTS S’INTÈGRE',
    fitTitle: 'La couche analytique',
    fitDescription:
      'Pulse surveille le service en temps reel et Watchtower suit ce qui se passe a l exterieur. Les modules Insights donnent ensuite a chaque equipe une lecture plus precise de son domaine, de la main-d oeuvre au marketing.',
    fitItems: [
      { name: 'Pulse', desc: 'Surveillance en temps réel' },
      { name: 'Watchtower', desc: 'Intelligence de marché externe' },
      { name: 'Insights', desc: 'Analytique spécialisée par domaine' },
    ],
    ctaTitle: 'Commencez par ce qui compte le plus',
    ctaDescription: 'Ajoutez les modules dont votre activité a besoin. Adaptez-vous à la croissance.',
    ctaDemo: 'Réserver une démo',
    ctaPricing: 'Voir les tarifs des modules',
  },
  es: {
    badge: 'MODULOS SUNDAE',
    title: 'Profundiza en cada parte de tu operacion',
    description:
      '14 modulos especializados: ingresos, personal, inventario, compras, marketing, reservas, beneficio, delivery, experiencia de clientes, CRM, aseguramiento de ingresos, inteligencia cruzada, previsiones y resumen ejecutivo.',
    bookDemo: 'Reservar una demo',
    seeModules: 'Ver precios de modulos',
    categories: ['Ingresos', 'Personal', 'Inventario', 'Compras', 'Marketing', 'Reservas', 'Beneficio', 'Aseguramiento', 'Delivery', 'Experiencia', 'CRM', 'Cross-Intel'],
    valueProps: ['Anade modulos segun los necesites', 'Analitica con IA por dominio', 'Disponible en planes Core'],
    whoItsForTitle: 'Para quien es',
    whoItsForDescription: 'Equipos que necesitan una lectura mas fina de cada dominio operativo.',
    whoItsFor: [
      { title: 'Lideres de operacion', description: 'Profundiza en areas operativas concretas sin informes personalizados' },
      { title: 'Finanzas y FP&A', description: 'Inteligencia de beneficio, costes y aseguramiento de ingresos en tiempo real' },
      { title: 'Gerentes regionales', description: 'Visibilidad por modulo en cada local de tu territorio' },
    ],
    modulesTitle: '12 modulos. Una plataforma.',
    modulesDescription: 'Cada modulo ofrece analitica con IA para un dominio operativo concreto',
    howTitle: 'Como funciona',
    howDescription: 'Anade modulos a tu suscripcion Core a medida que crecen tus necesidades',
    fitEyebrow: 'COMO ENCAJA INSIGHTS',
    fitTitle: 'La capa analitica',
    fitDescription:
      'Pulse vigila el turno en tiempo real y Watchtower sigue lo que ocurre fuera del local. Los modulos Insights dan a cada equipo una lectura mas precisa de su dominio, desde personal e inventario hasta compras y marketing.',
    fitItems: [
      { name: 'Pulse', desc: 'Monitorizacion en tiempo real' },
      { name: 'Watchtower', desc: 'Inteligencia de mercado externa' },
      { name: 'Insights', desc: 'Inteligencia analitica por dominio' },
    ],
    ctaTitle: 'Empieza por lo que mas importa',
    ctaDescription: 'Anade los modulos que tu operacion necesita. Escala con tu crecimiento.',
    ctaDemo: 'Reservar una demo',
    ctaPricing: 'Ver precios de modulos',
  },
} as const;

type InsightModuleCard = {
  name: string;
  icon: SundaeIconName;
  headline: string;
  description: string;
  capabilities: string[];
  category: string;
  color: string;
};

const localizedModulesCopy: Record<'en' | 'ar' | 'fr' | 'es', InsightModuleCard[]> = {
  en: [
    {
      name: "Revenue Intelligence",
      icon: "chart",
      headline: "Deep-Dive Into Sales. By Daypart. By Channel. By Item.",
      description: "Break revenue down by menu mix, daypart, channel, and trend so teams can see where growth is coming from and where sales are slipping.",
      capabilities: [
        "Menu mix and item-level analysis",
        "Daypart timing optimization",
        "Channel segment breakdown",
        "Revenue trend forecasting"
      ],
      category: "Core Operations",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "Labor Intelligence",
      icon: "labor",
      headline: "Optimize Scheduling. Reduce Overtime. Forecast Demand.",
      description: "Use scheduling guidance, overtime visibility, and demand forecasts to run labor with less guesswork.",
      capabilities: [
        "AI-recommended schedules",
        "Real-time labor cost tracking",
        "14-30 day demand forecasting",
        "Shift performance analysis",
        "Overtime early warnings"
      ],
      category: "Core Operations",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Inventory Intelligence",
      icon: "insights",
      headline: "Track Waste. Automate Par Levels. Optimize Costs.",
      description: "Track waste, adjust par levels, and tighten recipe costs with a clearer daily view of inventory movement.",
      capabilities: [
        "Real-time waste tracking",
        "Automated par level adjustments",
        "Recipe-level costing",
        "Vendor performance monitoring",
        "Inventory turn optimization"
      ],
      category: "Core Operations",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Purchasing Intelligence",
      icon: "cost",
      headline: "Compare Vendors. Optimize Prices. Manage Contracts.",
      description: "Stop overpaying. Purchasing Intelligence compares pricing across vendors, tracks contract compliance, and identifies savings opportunities.",
      capabilities: [
        "Vendor price comparison",
        "Contract compliance tracking",
        "Purchase pattern analysis",
        "Savings opportunity alerts"
      ],
      category: "Support",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Marketing Performance",
      icon: "marketing",
      headline: "Measure Campaigns. Attribute Revenue. Optimize Spend.",
      description: "Connect marketing spend to actual revenue impact. See which campaigns drive covers, which channels convert, and where to double down.",
      capabilities: [
        "Campaign-to-revenue attribution",
        "Channel performance tracking",
        "ROI analysis by campaign",
        "Promotional impact measurement"
      ],
      category: "Growth",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Reservations Intelligence",
      icon: "reservations",
      headline: "Predict No-Shows. Optimize Seating. Maximize Turns.",
      description: "Go beyond booking management. Predict no-shows, optimize table turns, and align front-of-house capacity with demand patterns.",
      capabilities: [
        "No-show prediction with AI scoring",
        "Table turn optimization",
        "Demand-based seating recommendations",
        "Walk-in vs. reservation analytics"
      ],
      category: "Support",
      color: "from-teal-500 to-teal-600"
    },
    {
      name: "Profit Intelligence",
      icon: "finance",
      headline: "See True Profitability. By Shift. By Menu Item. By Location.",
      description: "Combine revenue, labor, inventory, and overhead into a real-time profitability view. See which shifts, items, and locations actually make money.",
      capabilities: [
        "Real-time profit margin tracking",
        "Shift-level profitability analysis",
        "Menu item contribution analysis",
        "Location-level P&L intelligence"
      ],
      category: "Super Premium",
      color: "from-amber-500 to-amber-600"
    },
    {
      name: "Revenue Assurance",
      icon: "risk",
      headline: "Catch Leakage. Protect Margins. Prevent Loss.",
      description: "Spot voids, discounts, refunds, and pricing anomalies across the portfolio before they turn into recurring margin loss.",
      capabilities: [
        "Automated leakage pattern detection",
        "Pricing anomaly alerts",
        "Discount abuse identification",
        "Revenue protection scoring"
      ],
      category: "Protection",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Delivery Intelligence",
      icon: "delivery",
      headline: "Track Platform Costs. Optimize Margins. Compare Channels.",
      description: "Understand the true economics of delivery across platforms. Track commissions, compare channel profitability, and optimize your delivery mix.",
      capabilities: [
        "Per-platform cost tracking",
        "Channel profitability comparison",
        "Commission impact analysis",
        "Delivery menu optimization"
      ],
      category: "Channel",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "Guest Experience",
      icon: "success",
      headline: "Listen to Guests. Spot Trends. Act Fast.",
      description: "Aggregate guest feedback from reviews, surveys, and social mentions into a unified sentiment view with AI-powered trend detection.",
      capabilities: [
        "Multi-source review aggregation",
        "AI sentiment analysis",
        "Service quality trend tracking",
        "Guest satisfaction scoring"
      ],
      category: "Insight",
      color: "from-pink-500 to-pink-600"
    },
    {
      name: "Guest CRM Intelligence",
      icon: "operators",
      headline: "Know Your Guests. Retain Your Best. Win Back the Rest.",
      description: "Segment guests by value, track lifetime spend, watch loyalty behavior, and catch churn risk early.",
      capabilities: [
        "Guest segmentation and lifetime value",
        "Loyalty program analytics",
        "Churn risk detection and alerts",
        "Retention campaign triggers"
      ],
      category: "Insight",
      color: "from-rose-500 to-rose-600"
    },
    {
      name: "Cross-Intelligence",
      icon: "integration",
      headline: "Connect the Dots Across Every Domain.",
      description: "Highlight the operating relationships across active modules, including labor versus revenue, inventory versus waste, and marketing versus covers. Turns on when three or more modules are active.",
      capabilities: [
        "Cross-domain correlation analysis",
        "Automated insight surfacing",
        "Attribution and cannibalization detection",
        "Multi-module health scoring"
      ],
      category: "Platform",
      color: "from-cyan-500 to-cyan-600"
    }
  ],
  ar: [
    {
      name: "ذكاء الإيرادات",
      icon: "chart",
      headline: "تعمق في المبيعات حسب الفترات والقنوات والعناصر.",
      description: "تجاوز أرقام الإيرادات العامة وافهم مزيج القائمة وتوقيت الفترات والقنوات واتجاهات النمو لتعرف أين يتحقق الأداء وأين يتسرب.",
      capabilities: ["تحليل المزيج وعناصر القائمة", "تحسين توقيت الفترات", "تفصيل القنوات", "توقع اتجاهات الإيرادات"],
      category: "العمليات الأساسية",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "ذكاء العمالة",
      icon: "labor",
      headline: "حسّن الجداول وقلل العمل الإضافي وتوقع الطلب.",
      description: "حوّل العمالة من أكبر تكلفة إلى أصل أكثر كفاءة مع توصيات الجدولة والتنبؤ بالطلب المدعومة بالذكاء الاصطناعي.",
      capabilities: ["جداول موصى بها بالذكاء الاصطناعي", "تتبع تكلفة العمالة لحظياً", "توقع الطلب لـ 14 إلى 30 يوماً", "تحليل أداء الورديات", "إنذارات مبكرة للعمل الإضافي"],
      category: "العمليات الأساسية",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "ذكاء المخزون",
      icon: "insights",
      headline: "تتبّع الهدر وأتمت مستويات الحد وقلل التكاليف.",
      description: "حوّل إدارة المخزون من عبء يومي إلى نظام محسّن عبر التتبع اللحظي والتوصيات الآلية.",
      capabilities: ["تتبع الهدر لحظياً", "تعديل تلقائي لمستويات الحد", "تسعير الوصفات", "مراقبة أداء الموردين", "تحسين دوران المخزون"],
      category: "العمليات الأساسية",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "ذكاء المشتريات",
      icon: "cost",
      headline: "قارن الموردين وحسّن الأسعار وأدر العقود.",
      description: "توقف عن الدفع الزائد عبر مقارنة الأسعار ومتابعة الالتزام بالعقود واكتشاف فرص التوفير.",
      capabilities: ["مقارنة أسعار الموردين", "تتبع الالتزام بالعقود", "تحليل أنماط الشراء", "تنبيهات فرص التوفير"],
      category: "الدعم",
      color: "from-green-500 to-green-600"
    },
    {
      name: "أداء التسويق",
      icon: "marketing",
      headline: "قِس الحملات وانسب الإيرادات وحسّن الإنفاق.",
      description: "اربط الإنفاق التسويقي بالأثر الفعلي على الإيرادات لمعرفة الحملات والقنوات التي تستحق التوسع.",
      capabilities: ["ربط الحملة بالإيرادات", "تتبع أداء القنوات", "تحليل العائد على الاستثمار", "قياس أثر العروض"],
      category: "النمو",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "ذكاء الحجوزات",
      icon: "reservations",
      headline: "توقع عدم الحضور وحسّن الجلسات وزِد الدوران.",
      description: "تجاوز إدارة الحجوزات التقليدية عبر توقع عدم الحضور وتحسين دوران الطاولات ومواءمة السعة مع الطلب.",
      capabilities: ["توقع عدم الحضور", "تحسين دوران الطاولات", "توصيات جلوس حسب الطلب", "تحليلات الحضور المباشر مقابل الحجوزات"],
      category: "الدعم",
      color: "from-teal-500 to-teal-600"
    },
    {
      name: "ذكاء الربحية",
      icon: "finance",
      headline: "اعرف الربحية الحقيقية حسب الوردية والعنصر والموقع.",
      description: "ادمج الإيرادات والعمالة والمخزون والنفقات في رؤية ربحية لحظية توضح ما الذي يحقق المال فعلاً.",
      capabilities: ["تتبع هامش الربح لحظياً", "تحليل الربحية حسب الوردية", "تحليل مساهمة العناصر", "ذكاء الأرباح والخسائر حسب الموقع"],
      category: "متميز",
      color: "from-amber-500 to-amber-600"
    },
    {
      name: "ضمان الإيرادات",
      icon: "risk",
      headline: "اكشف التسرب واحمِ الهوامش وامنع الخسارة.",
      description: "اكتشاف آلي لأنماط تسرب الإيرادات مثل الإلغاءات والخصومات والاستردادات والشذوذات السعرية عبر محفظتك بالكامل.",
      capabilities: ["اكتشاف أنماط التسرب", "تنبيهات الشذوذ السعري", "رصد إساءة استخدام الخصومات", "تقييم حماية الإيرادات"],
      category: "الحماية",
      color: "from-red-500 to-red-600"
    },
    {
      name: "ذكاء التوصيل",
      icon: "delivery",
      headline: "تتبّع تكاليف المنصات وحسّن الهوامش وقارن القنوات.",
      description: "افهم اقتصاديات التوصيل الحقيقية عبر المنصات وتتبّع العمولات وربحية القنوات وحسّن مزيج التوصيل.",
      capabilities: ["تتبع التكلفة لكل منصة", "مقارنة ربحية القنوات", "تحليل أثر العمولات", "تحسين قائمة التوصيل"],
      category: "القنوات",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "تجربة الضيف",
      icon: "success",
      headline: "استمع للضيوف واكتشف الاتجاهات وتصرف بسرعة.",
      description: "اجمع آراء الضيوف من التقييمات والاستبيانات والذكر الاجتماعي في رؤية موحدة للمشاعر مع اكتشاف الاتجاهات بالذكاء الاصطناعي.",
      capabilities: ["تجميع التقييمات من مصادر متعددة", "تحليل المشاعر بالذكاء الاصطناعي", "تتبع اتجاهات الجودة", "تقييم رضا الضيوف"],
      category: "الرؤى",
      color: "from-pink-500 to-pink-600"
    },
    {
      name: "ذكاء CRM للضيوف",
      icon: "operators",
      headline: "اعرف ضيوفك واحتفظ بالأفضل واستعد الآخرين.",
      description: "قسّم الضيوف حسب القيمة وتتبّع الإنفاق مدى الحياة وراقب الولاء واكشف مخاطر التسرب لبناء علاقات مستدامة.",
      capabilities: ["تقسيم الضيوف والقيمة مدى الحياة", "تحليلات برامج الولاء", "كشف مخاطر التسرب", "إطلاق حملات الاحتفاظ"],
      category: "الرؤى",
      color: "from-rose-500 to-rose-600"
    },
    {
      name: "الذكاء المتقاطع",
      icon: "integration",
      headline: "اربط النقاط عبر كل مجال تشغيلي.",
      description: "يكشف تلقائياً الارتباطات المخفية بين الوحدات النشطة مثل العمالة والإيرادات أو المخزون والهدر أو التسويق والزيارات.",
      capabilities: ["تحليل الارتباطات بين المجالات", "إظهار الرؤى تلقائياً", "كشف الإسناد والتآكل", "تقييم صحة متعدد الوحدات"],
      category: "المنصة",
      color: "from-cyan-500 to-cyan-600"
    }
  ],
  fr: [
    {
      name: "Intelligence revenu",
      icon: "chart",
      headline: "Analysez les ventes par moment, canal et article.",
      description: "Allez au-dela du chiffre d'affaires global pour comprendre le mix produit, les moments forts, les canaux et les tendances de revenu.",
      capabilities: ["Analyse du mix et des articles", "Optimisation des dayparts", "Ventilation par canal", "Prevision des tendances de revenu"],
      category: "Operations coeur",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "Intelligence main-d oeuvre",
      icon: "labor",
      headline: "Optimisez les plannings, reduisez les heures sup, anticipez la demande.",
      description: "Transformez la main-d oeuvre, souvent votre plus grand cout, en un levier optimise grace aux recommandations IA.",
      capabilities: ["Plannings recommandes par IA", "Suivi du cout main-d oeuvre en temps reel", "Prevision de la demande sur 14 a 30 jours", "Analyse de performance par shift", "Alertes precoces sur les heures sup"],
      category: "Operations coeur",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Intelligence stock",
      icon: "insights",
      headline: "Suivez le gaspillage, automatisez les niveaux, optimisez les couts.",
      description: "Faites passer la gestion des stocks d'un casse-tete quotidien a un systeme optimise avec suivi temps reel et recommandations automatiques.",
      capabilities: ["Suivi du gaspillage en temps reel", "Ajustement automatique des niveaux", "Cout recette par recette", "Suivi de performance fournisseur", "Optimisation de la rotation"],
      category: "Operations coeur",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Intelligence achats",
      icon: "cost",
      headline: "Comparez les fournisseurs, optimisez les prix, pilotez les contrats.",
      description: "Evitez les surcouts en comparant les prix, en suivant la conformite contractuelle et en detectant les economies possibles.",
      capabilities: ["Comparaison de prix fournisseurs", "Suivi de conformite des contrats", "Analyse des achats", "Alertes d'economies"],
      category: "Support",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Performance marketing",
      icon: "marketing",
      headline: "Mesurez les campagnes, attribuez le revenu, optimisez le spend.",
      description: "Reliez le budget marketing a l'impact reel sur le revenu pour savoir quelles campagnes et quels canaux meritent plus d'investissement.",
      capabilities: ["Attribution campagne-revenu", "Suivi de performance des canaux", "Analyse du ROI par campagne", "Mesure de l'impact promo"],
      category: "Croissance",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Intelligence reservations",
      icon: "reservations",
      headline: "Predisez les no-shows, optimisez le seating, maximisez les rotations.",
      description: "Allez au-dela de la gestion des reservations en anticipant les no-shows et en alignant la capacite front-of-house avec la demande.",
      capabilities: ["Prediction des no-shows", "Optimisation des rotations de table", "Recommandations de placement selon la demande", "Analytique walk-in vs reservation"],
      category: "Support",
      color: "from-teal-500 to-teal-600"
    },
    {
      name: "Intelligence profit",
      icon: "finance",
      headline: "Voyez la vraie rentabilite par shift, article et site.",
      description: "Combinez revenu, main-d'oeuvre, stock et frais fixes dans une vue de rentabilite temps reel.",
      capabilities: ["Suivi temps reel de la marge", "Analyse de rentabilite par shift", "Analyse de contribution des articles", "Vue P&L par site"],
      category: "Premium",
      color: "from-amber-500 to-amber-600"
    },
    {
      name: "Garantie revenu",
      icon: "risk",
      headline: "Reperez les fuites, protegeez vos marges, evitez les pertes.",
      description: "Detection automatisee des fuites de revenu comme les annulations, remises, remboursements et anomalies tarifaires.",
      capabilities: ["Detection des fuites", "Alertes sur les anomalies tarifaires", "Identification des abus de remise", "Score de protection du revenu"],
      category: "Protection",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Intelligence livraison",
      icon: "delivery",
      headline: "Suivez les couts plateformes, optimisez les marges, comparez les canaux.",
      description: "Comprenez l'economie reelle de la livraison selon les plateformes et optimisez votre mix.",
      capabilities: ["Suivi des couts par plateforme", "Comparaison de rentabilite des canaux", "Analyse de l'impact des commissions", "Optimisation du menu livraison"],
      category: "Canal",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "Experience client",
      icon: "success",
      headline: "Ecoutez les clients, detectez les tendances, agissez vite.",
      description: "Agregez avis, sondages et signaux sociaux dans une vue unifiee du sentiment avec detection de tendances par IA.",
      capabilities: ["Aggregation multi-source des avis", "Analyse de sentiment par IA", "Suivi des tendances qualite", "Score de satisfaction client"],
      category: "Insight",
      color: "from-pink-500 to-pink-600"
    },
    {
      name: "Intelligence CRM client",
      icon: "operators",
      headline: "Connaissez vos clients, retenez les meilleurs, reengagez les autres.",
      description: "Segmentez vos clients par valeur, suivez la valeur vie, la fidelite et les risques de churn.",
      capabilities: ["Segmentation et valeur vie client", "Analytique du programme de fidelite", "Detection du risque de churn", "Declencheurs de campagnes de retention"],
      category: "Insight",
      color: "from-rose-500 to-rose-600"
    },
    {
      name: "Cross-Intelligence",
      icon: "integration",
      headline: "Reliez les signaux entre tous les domaines.",
      description: "Fait ressortir automatiquement les correlations cachees entre modules actifs comme la main-d'oeuvre et le revenu ou le stock et le gaspillage.",
      capabilities: ["Analyse de correlation inter-domaines", "Remontee automatique des insights", "Detection d'attribution et de cannibalisation", "Score de sante multi-modules"],
      category: "Plateforme",
      color: "from-cyan-500 to-cyan-600"
    }
  ],
  es: [
    {
      name: "Inteligencia de ingresos",
      icon: "chart",
      headline: "Profundiza en ventas por franja, canal y producto.",
      description: "Ve mas alla del ingreso total para entender el mix de menu, el timing por franja, los canales y las tendencias de crecimiento.",
      capabilities: ["Analisis de mix y productos", "Optimizacion de franjas horarias", "Desglose por canal", "Pronostico de ingresos"],
      category: "Operaciones clave",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "Inteligencia laboral",
      icon: "labor",
      headline: "Optimiza horarios, reduce horas extra y anticipa la demanda.",
      description: "Convierte la mano de obra en un activo optimizado con recomendaciones de horarios y pronostico de demanda con IA.",
      capabilities: ["Horarios recomendados por IA", "Seguimiento del coste laboral en tiempo real", "Pronostico de demanda de 14 a 30 dias", "Analisis de rendimiento por turno", "Alertas tempranas de horas extra"],
      category: "Operaciones clave",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Inteligencia de inventario",
      icon: "insights",
      headline: "Controla mermas, automatiza niveles y optimiza costes.",
      description: "Convierte la gestion diaria de inventario en un sistema optimizado con seguimiento en tiempo real y recomendaciones automaticas.",
      capabilities: ["Seguimiento de mermas en tiempo real", "Ajustes automaticos de niveles", "Costeo por receta", "Monitoreo de proveedores", "Optimizacion de rotacion"],
      category: "Operaciones clave",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Inteligencia de compras",
      icon: "cost",
      headline: "Compara proveedores, optimiza precios y gestiona contratos.",
      description: "Evita pagar de mas comparando precios, siguiendo el cumplimiento contractual e identificando ahorros.",
      capabilities: ["Comparacion de precios de proveedores", "Seguimiento de cumplimiento de contratos", "Analisis de patrones de compra", "Alertas de ahorro"],
      category: "Soporte",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Rendimiento de marketing",
      icon: "marketing",
      headline: "Mide campanas, atribuye ingresos y optimiza gasto.",
      description: "Conecta el gasto de marketing con el impacto real en ingresos para saber que campañas y canales merecen mas inversion.",
      capabilities: ["Atribucion campaña-ingresos", "Seguimiento de canales", "Analisis ROI por campaña", "Medicion del impacto promocional"],
      category: "Crecimiento",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Inteligencia de reservas",
      icon: "reservations",
      headline: "Predice no-shows, optimiza mesas y maximiza rotacion.",
      description: "Ve mas alla de la gestion de reservas prediciendo ausencias y alineando la capacidad del front con la demanda.",
      capabilities: ["Prediccion de no-shows", "Optimizacion de rotacion de mesas", "Recomendaciones de seating segun demanda", "Analitica de walk-ins vs reservas"],
      category: "Soporte",
      color: "from-teal-500 to-teal-600"
    },
    {
      name: "Inteligencia de beneficio",
      icon: "finance",
      headline: "Ve la rentabilidad real por turno, producto y local.",
      description: "Combina ingresos, mano de obra, inventario y gastos para obtener una vista de rentabilidad en tiempo real.",
      capabilities: ["Seguimiento del margen en tiempo real", "Analisis de rentabilidad por turno", "Analisis de contribucion por producto", "Vista P&L por local"],
      category: "Premium",
      color: "from-amber-500 to-amber-600"
    },
    {
      name: "Aseguramiento de ingresos",
      icon: "risk",
      headline: "Detecta fugas, protege margenes y evita perdidas.",
      description: "Deteccion automatizada de fugas de ingresos como anulaciones, descuentos, reembolsos y anomalias de precio.",
      capabilities: ["Deteccion automatica de fugas", "Alertas de anomalias de precio", "Identificacion de abuso de descuentos", "Puntuacion de proteccion de ingresos"],
      category: "Proteccion",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Inteligencia de delivery",
      icon: "delivery",
      headline: "Controla costes de plataformas, optimiza margenes y compara canales.",
      description: "Entiende la economia real del delivery entre plataformas y optimiza tu mezcla de canales.",
      capabilities: ["Seguimiento de costes por plataforma", "Comparacion de rentabilidad por canal", "Analisis del impacto de comisiones", "Optimizacion del menu delivery"],
      category: "Canal",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "Experiencia del cliente",
      icon: "success",
      headline: "Escucha a tus clientes, detecta tendencias y actua rapido.",
      description: "Agrupa reseñas, encuestas y señales sociales en una vista unificada del sentimiento con deteccion de tendencias por IA.",
      capabilities: ["Agregacion de reseñas multifuente", "Analisis de sentimiento con IA", "Seguimiento de calidad del servicio", "Puntuacion de satisfaccion"],
      category: "Insight",
      color: "from-pink-500 to-pink-600"
    },
    {
      name: "Inteligencia CRM de clientes",
      icon: "operators",
      headline: "Conoce a tus clientes, reten a los mejores y recupera al resto.",
      description: "Segmenta a tus clientes por valor, sigue su gasto de vida, la fidelidad y el riesgo de churn para construir relaciones duraderas.",
      capabilities: ["Segmentacion y valor de vida", "Analitica de fidelizacion", "Deteccion y alertas de churn", "Disparadores de campañas de retencion"],
      category: "Insight",
      color: "from-rose-500 to-rose-600"
    },
    {
      name: "Cross-Intelligence",
      icon: "integration",
      headline: "Conecta las señales entre todos los dominios.",
      description: "Saca automaticamente correlaciones ocultas entre modulos activos como mano de obra e ingresos o inventario y merma.",
      capabilities: ["Analisis de correlacion entre dominios", "Deteccion automatica de insights", "Atribucion y deteccion de canibalizacion", "Puntuacion de salud multi-modulo"],
      category: "Plataforma",
      color: "from-cyan-500 to-cyan-600"
    }
  ]
};

export default function InsightsPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = localizedInsightsUi[locale] ?? localizedInsightsUi.en;
  const modules = localizedModulesCopy[locale] ?? localizedModulesCopy.en;

  const whoItsFor: { icon: SundaeIconName; title: string; description: string }[] = [
    { icon: "owners", title: ui.whoItsFor[0].title, description: ui.whoItsFor[0].description },
    { icon: "finance", title: ui.whoItsFor[1].title, description: ui.whoItsFor[1].description },
    { icon: "regional", title: ui.whoItsFor[2].title, description: ui.whoItsFor[2].description },
  ];

  const howItWorks: { step: number; title: string; description: string; icon: SundaeIconName }[] = [
    { step: 1, title: ui.modulesTitle, description: ui.modulesDescription, icon: "modules" },
    { step: 2, title: ui.howTitle, description: ui.howDescription, icon: "integration" },
    { step: 3, title: ui.fitTitle, description: ui.fitDescription, icon: "intelligence" },
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <section className="theme-hero-surface pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-4">{ui.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-h1 text-[var(--text-primary)] mb-6"
          >
            {ui.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-xl text-[var(--text-supporting)] mb-8 max-w-3xl mx-auto"
          >
            {ui.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => cta("/demo", "book_demo_insights_hero", { page: "/insights" })}
            >
              {ui.bookDemo}
            </Button>
            <Link href="/modules">
              <Button variant="outline" size="lg">
                {ui.seeModules}
              </Button>
            </Link>
          </motion.div>

          {/* Module Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
              {[
                { icon: "chart" as SundaeIconName, label: ui.categories[0] },
                { icon: "labor" as SundaeIconName, label: ui.categories[1] },
                { icon: "insights" as SundaeIconName, label: ui.categories[2] },
                { icon: "cost" as SundaeIconName, label: ui.categories[3] },
                { icon: "marketing" as SundaeIconName, label: ui.categories[4] },
                { icon: "reservations" as SundaeIconName, label: ui.categories[5] },
                { icon: "finance" as SundaeIconName, label: ui.categories[6] },
                { icon: "risk" as SundaeIconName, label: ui.categories[7] },
                { icon: "delivery" as SundaeIconName, label: ui.categories[8] },
                { icon: "success" as SundaeIconName, label: ui.categories[9] },
                { icon: "operators" as SundaeIconName, label: ui.categories[10] },
                { icon: "integration" as SundaeIconName, label: ui.categories[11] }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
                  className="bg-[var(--navy-deep)] rounded-xl p-3 text-center border border-[var(--border-default)] hover:border-white/[0.1] transition-colors"
                >
                  <div className="w-9 h-9 mx-auto mb-1.5 bg-slate-900 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={item.icon} size="sm" className="text-[var(--text-primary)]" />
                  </div>
                  <p className="text-[11px] font-medium text-[var(--text-supporting)]">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--text-muted)]">
            <span className="font-medium">{ui.valueProps[0]}</span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="font-medium">{ui.valueProps[1]}</span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="font-medium">{ui.valueProps[2]}</span>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-2">{ui.whoItsForTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)]">{ui.whoItsForDescription}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoItsFor.map((persona, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                <div className="w-11 h-11 mx-auto mb-3 bg-slate-900 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={persona.icon} size="md" className="text-[var(--text-primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{persona.title}</h3>
                <p className="text-sm text-[var(--text-supporting)]">{persona.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Modules Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {ui.modulesTitle}
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              {ui.modulesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="h-full bg-[var(--navy-deep)] rounded-2xl border border-[var(--border-default)] p-6 hover:border-white/[0.1] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name={module.icon} size="md" className="text-[var(--text-primary)]" />
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--surface-subtle)] text-[var(--text-supporting)] uppercase tracking-wide">
                    {module.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{module.name}</h3>
                <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">{module.headline}</p>
                <p className="text-sm text-[var(--text-supporting)] leading-relaxed mb-4">
                  {module.description}
                </p>
                <ul className="space-y-1.5">
                  {module.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-sm text-[var(--text-supporting)]">
                      <span className="text-[var(--text-muted)] mt-0.5 flex-shrink-0 text-xs">&#10003;</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {ui.howTitle}
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              {ui.howDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-supporting)] text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-supporting)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fits the Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)] border-y border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-4 block">{ui.fitEyebrow}</span>
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                {ui.fitTitle}
              </h2>
              <p className="body-lg text-[var(--text-supporting)]">
                {ui.fitDescription}
              </p>
            </div>
            <div className="space-y-3">
              {ui.fitItems.map((item, index) => (
                <div key={item.name} className="flex items-center gap-4 p-4 bg-[var(--navy-deep)] rounded-xl border border-[var(--border-default)]">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name={index === 0 ? "pulse" : index === 1 ? "watchtower" : "insights"} size="md" className="text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm">{item.name}</h4>
                    <p className="text-xs text-[var(--text-supporting)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            {ui.ctaTitle}
          </h2>
          <p className="body-xl mb-8 text-[var(--text-muted)]">
            {ui.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-[var(--navy-deep)] text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"
              onClick={() => cta("/demo", "book_demo_insights_cta", { page: "/insights" })}
            >
              {ui.ctaDemo}
            </Button>
            <Link href="/modules">
              <Button variant="outline-light" size="lg">
                {ui.ctaPricing}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
