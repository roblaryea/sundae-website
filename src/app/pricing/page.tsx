'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import type { WebsiteLocale } from '@/lib/i18n';
import { PRICING_URL, SIGNUP_URL } from '@/lib/urls';
import { PageHero, FadeUp, StaggerContainer, StaggerItem, PageCTA } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';

type Tier = {
  id: string;
  name: string;
  badge?: string;
  badgeClass?: string;
  basePrice: string;
  perLocation: string;
  aiCredits: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlight?: boolean;
};

type LiveCatalog = {
  tiers?: Array<{
    id: string;
    basePrice?: number;
    perLocationPrice?: number;
    aiCreditsBase?: number;
  }>;
};

const reportTiers: Tier[] = [
  {
    id: 'report_lite',
    name: "Report Lite",
    badge: "FREE FOREVER",
    badgeClass: "bg-green-500/20 text-green-400",
    basePrice: "$0",
    perLocation: "$0",
    aiCredits: "250",
    description: "Upload your POS data and get instant benchmarking. No credit card required.",
    features: [
      "Manual CSV upload",
      "5 core performance metrics",
      "Anonymous peer benchmarking",
      "90-day historical access",
      "Email support (72-hour response)"
    ],
    cta: "Start Free",
    ctaLink: "/report"
  },
  {
    id: 'report_plus',
    name: "Report Plus",
    badge: "POPULAR",
    badgeClass: "bg-orange-500/20 text-orange-400",
    basePrice: "$79",
    perLocation: "$39",
    aiCredits: "1,200",
    description: "Smart-parsed data ingestion with deeper analysis and monthly intelligence summaries.",
    features: [
      "Smart-parsed uploads (PDF, Excel, screenshots)",
      "Around 30 ready-to-use visuals",
      "Monthly intelligence summaries",
      "Comparable period views (WoW/MoM/YoY)",
      "1-year historical access",
      "Email + Chat support (24-hour response)"
    ],
    cta: "Get Started",
    ctaLink: "/demo",
    highlight: true
  },
  {
    id: 'report_pro',
    name: "Report Pro",
    basePrice: "$159",
    perLocation: "$59",
    aiCredits: "3,500",
    description: "Automated daily ingestion with advanced intelligence and team collaboration.",
    features: [
      "Daily automated data sync",
      "Around 80 ready-to-use visuals",
      "Weekly intelligence summaries",
      "Shareable charts + team collaboration",
      "2-year historical access",
      "Priority support (12-hour response)"
    ],
    cta: "Get Started",
    ctaLink: "/demo"
  }
];

const coreTiers: Tier[] = [
  {
    id: 'core_lite',
    name: "Core Lite",
    basePrice: "$279",
    perLocation: "$79",
    aiCredits: "8,000",
    description: "Real-time operational intelligence with 15-minute data refresh cycles.",
    features: [
      "Everything in Report Pro",
      "15-minute data refresh",
      "POS API integration",
      "Pulse intraday monitoring",
      "Smart alerts & anomaly detection",
      "Sundae Intelligence (Chat + Monitor)",
      "Watchtower external intelligence",
      "Chat support (4-hour response)"
    ],
    cta: "Get Started",
    ctaLink: "/demo"
  },
  {
    id: 'core_pro',
    name: "Core Pro",
    badge: "MOST POPULAR",
    badgeClass: "bg-blue-500/20 text-blue-400",
    basePrice: "$449",
    perLocation: "$89",
    aiCredits: "14,000",
    description: "Full intelligence stack with 5-minute refresh, multi-POS support, and advanced modules.",
    features: [
      "Everything in Core Lite",
      "5-minute data refresh",
      "Multi-POS support across locations",
      "Intelligent playbooks & automated workflows",
      "Sundae Intelligence (all modes)",
      "Benchmarks & market intelligence",
      "Watchtower external intelligence",
      "Priority phone support (2-hour response)"
    ],
    cta: "Get Started",
    ctaLink: "/demo",
    highlight: true
  }
];

type PricingAddon = {
  name: string;
  description: string;
  note: string;
  icon: SundaeIconName;
  color: string;
};

type PricingFaq = {
  title: string;
  content: string;
};

const enterpriseFeatures = [
  "Everything in Core Pro",
  "Custom data refresh (real-time available)",
  "Multi-brand rollups & cross-region benchmarking",
  "SSO/SAML integration",
  "White-label & partner solutions",
  "Role-based access with audit trails",
  "Dedicated Customer Success Manager",
  "24/7 support with contractual SLAs",
  "Custom historical access (5+ years)",
  "Unlimited intelligence credits & custom dashboards",
];

const pricingAddOns: PricingAddon[] = [
  {
    name: "Watchtower",
    description: "External intelligence for competitor tracking, weather impact, event calendars, and AI briefings.",
    note: "Requires Core tier",
    icon: "watchtower",
    color: "from-red-500 to-red-600",
  },
  {
    name: "Specialized Modules",
    description:
      "14 specialized modules including Revenue, Labor, Inventory, Purchasing, Marketing, Reservations, Profit, Revenue Assurance, Delivery, Guest Experience, Guest CRM, Cross-Intelligence, Foresight Intelligence, and Executive Summary.",
    note: "Requires Core tier. Priced per module.",
    icon: "data",
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Cross-Intelligence",
    description:
      "A correlation layer that starts working once you activate three or more modules. Base covers core correlations; Pro adds attribution and cannibalization detection.",
    note: "Requires Core tier with 3+ modules. Pro: $199/mo + $19/loc",
    icon: "crossIntelligence",
    color: "from-purple-500 to-cyan-600",
  },
  {
    name: "Credit Top-Ups",
    description: "Need more intelligence queries? Purchase additional credits as add-ons to any plan.",
    note: "Available on all tiers",
    icon: "intelligence",
    color: "from-blue-500 to-blue-600",
  },
];

const pricingFaqs: PricingFaq[] = [
  {
    title: "What happens after the free period?",
    content:
      "Report Lite stays free. There is no trial clock and no forced upgrade. If you need more depth later, you can move to any paid tier and cancel when you want.",
  },
  {
    title: "How do you count a location?",
    content:
      "A location is one physical restaurant address. Multiple brands under the same roof still count as one location.",
  },
  {
    title: "What's the difference between Report and Core?",
    content:
      "Report is built for uploaded historical POS analysis. Core connects directly to your systems and keeps the operating picture current with Pulse monitoring, alerts, playbooks, and forward-looking intelligence.",
  },
  {
    title: "Do you support multi-brand and multi-location groups?",
    content:
      "Yes. Core Pro handles multi-POS environments, and Enterprise adds cross-brand rollups, regional benchmarking, RBAC, and governance features.",
  },
  {
    title: "Is there a discount for annual billing?",
    content:
      "Yes. Annual billing saves 10% on all paid tiers. Use the billing toggle above to see the annual price.",
  },
  {
    title: "Is my data private and secure?",
    content:
      "Your data stays yours. We secure data in transit and at rest using industry-standard protections, enforce strict access controls, and use anonymized, aggregated benchmarking where applicable. Enterprise includes SOC 2 Type II compliance.",
  },
  {
    title: "Can I change plans later?",
    content:
      "Yes. Many teams start with Report and move up as the operation grows. When you switch plans, your historical data stays with you.",
  },
];

const localizedPricingPageContent: Partial<
  Record<
    Exclude<WebsiteLocale, 'en'>,
    {
      reportTiers: Tier[];
      coreTiers: Tier[];
      enterpriseFeatures: string[];
      addOns: PricingAddon[];
      faqs: PricingFaq[];
      perMonthLabel: string;
      perLocationLabel: string;
      creditsLabel: string;
    }
  >
> = {
  ar: {
    reportTiers: [
      {
        ...reportTiers[0],
        badge: "مجاني دائمًا",
        description: "حمّل بيانات نقطة البيع واحصل على مقارنة مرجعية فورية. لا حاجة إلى بطاقة ائتمان.",
        features: [
          "رفع CSV يدوي",
          "5 مقاييس أداء أساسية",
          "مقارنة مرجعية مجهولة مع الأقران",
          "وصول تاريخي لمدة 90 يومًا",
          "دعم عبر البريد الإلكتروني خلال 72 ساعة",
        ],
        cta: "ابدأ مجانًا",
      },
      {
        ...reportTiers[1],
        badge: "الأكثر شيوعًا",
        description: "استيعاب ذكي للبيانات مع تحليل أعمق وملخصات شهرية للذكاء.",
        features: [
          "رفع ذكي للملفات (PDF وExcel ولقطات الشاشة)",
          "نحو 30 مرئية شاملة",
          "ملخصات ذكاء شهرية",
          "مقارنات أسبوعية/شهرية/سنوية",
          "وصول تاريخي لمدة سنة",
          "دعم البريد والدردشة خلال 24 ساعة",
        ],
        cta: "ابدأ الآن",
      },
      {
        ...reportTiers[2],
        description: "استيعاب يومي مؤتمت مع ذكاء متقدم وتعاون للفريق.",
        features: [
          "مزامنة بيانات يومية مؤتمتة",
          "نحو 80 مرئية شاملة",
          "ملخصات ذكاء أسبوعية",
          "مشاركة الرسوم البيانية وتعاون الفريق",
          "وصول تاريخي لمدة سنتين",
          "دعم أولوية خلال 12 ساعة",
        ],
        cta: "ابدأ الآن",
      },
    ],
    coreTiers: [
      {
        ...coreTiers[0],
        description: "ذكاء تشغيلي لحظي مع تحديث للبيانات كل 15 دقيقة.",
        features: [
          "كل ما في Report Pro",
          "تحديث كل 15 دقيقة",
          "تكامل POS عبر API",
          "مراقبة Pulse خلال اليوم",
          "تنبيهات ذكية واكتشاف الشذوذ",
          "Sundae Intelligence (الدردشة + المراقبة)",
          "ذكاء Watchtower الخارجي",
          "دعم دردشة خلال 4 ساعات",
        ],
        cta: "ابدأ الآن",
      },
      {
        ...coreTiers[1],
        badge: "الأكثر شيوعًا",
        description: "حزمة الذكاء الكاملة مع تحديث كل 5 دقائق ودعم متعدد POS ووحدات متقدمة.",
        features: [
          "كل ما في Core Lite",
          "تحديث كل 5 دقائق",
          "دعم متعدد POS عبر المواقع",
          "خطط تشغيل ذكية وتدفقات عمل مؤتمتة",
          "Sundae Intelligence (كل الأوضاع)",
          "المقارنات المرجعية وذكاء السوق",
          "ذكاء Watchtower الخارجي",
          "دعم هاتفي بأولوية خلال ساعتين",
        ],
        cta: "ابدأ الآن",
      },
    ],
    enterpriseFeatures: [
      "كل ما في Core Pro",
      "تحديث بيانات مخصص (والوقت الحقيقي متاح)",
      "تجميع متعدد العلامات ومقارنات إقليمية",
      "تكامل SSO/SAML",
      "حلول white-label وشركاء",
      "تحكم بالأدوار مع سجلات تدقيق",
      "مدير نجاح عملاء مخصص",
      "دعم 24/7 مع اتفاقيات خدمة تعاقدية",
      "وصول تاريخي مخصص (أكثر من 5 سنوات)",
      "أرصدة ذكاء ولوحات مخصصة غير محدودة",
    ],
    addOns: [
      { ...pricingAddOns[0], description: "ذكاء خارجي يشمل تتبع المنافسين وتأثير الطقس وتقويم الفعاليات وإحاطات الذكاء الاصطناعي.", note: "يتطلب Core" },
      { ...pricingAddOns[1], name: "وحدات متخصصة", description: "14 وحدة متخصصة تشمل الإيرادات والعمالة والمخزون والمشتريات والتسويق والحجوزات والربح وضمان الإيرادات والتوصيل وتجربة الضيف وGuest CRM وCross-Intelligence وForesight Intelligence وExecutive Summary.", note: "يتطلب Core. التسعير لكل وحدة." },
      { ...pricingAddOns[2], description: "محرك ترابط يُفعَّل تلقائيًا ويكشف العلاقات المخفية بين الوحدات. النسخة الأساسية مجانية مع 3+ وحدات، وPro تضيف الإسناد الكامل واكتشاف التآكل.", note: "يتطلب Core مع 3+ وحدات. Pro: 199$/شهر + 19$/موقع" },
      { ...pricingAddOns[3], name: "إضافات الأرصدة", description: "هل تحتاج إلى استفسارات ذكاء أكثر؟ اشترِ أرصدة إضافية لأي خطة.", note: "متاحة في جميع الخطط" },
    ],
    faqs: [
      { title: "ماذا يحدث بعد الفترة المجانية؟", content: "Report Lite مجانية دائمًا، بلا تجربة وبلا انتهاء. وعندما تحتاج المزيد، يمكنك الترقية إلى أي خطة مدفوعة. بلا التزام ويمكن الإلغاء في أي وقت." },
      { title: "كيف تحتسبون الموقع؟", content: "الموقع هو عنوان مطعم فعلي واحد. حتى إذا وُجدت عدة علامات تحت السقف نفسه، فإنه يُحتسب كموقع واحد." },
      { title: "ما الفرق بين Report وCore؟", content: "تقوم Report بتحليل بيانات POS التاريخية التي ترفعها، وهي مناسبة لفهم ما حدث. أما Core فتتصل عبر API لتقديم ذكاء قريب من الوقت الحقيقي مع مراقبة Pulse والتنبيهات وخطط التشغيل والذكاء التنبؤي." },
      { title: "هل تدعمون المجموعات متعددة العلامات ومتعددة المواقع؟", content: "نعم. Core Pro يدعم بيئات متعددة POS، بينما تضيف Enterprise تجميعات متعددة العلامات ومقارنات إقليمية وRBAC وميزات الحوكمة." },
      { title: "هل يوجد خصم على الفوترة السنوية؟", content: "نعم. وفّر 10% مع الفوترة السنوية في جميع الخطط المدفوعة. استخدم مفتاح التبديل أعلاه لرؤية السعر السنوي." },
      { title: "هل بياناتي خاصة وآمنة؟", content: "بياناتك ملك لك. نحن نؤمّن البيانات أثناء النقل والتخزين، ونفرض ضوابط وصول صارمة، ونستخدم مقارنات مرجعية مجهولة ومجمعة عند الحاجة. كما تتضمن Enterprise امتثال SOC 2 Type II." },
      { title: "هل يمكنني تغيير الخطط لاحقًا؟", content: "بالتأكيد. تبدأ كثير من الفرق بـ Report ثم تترقى مع النمو. الانتقال بين الخطط مباشر، وتظل جميع البيانات التاريخية محفوظة." },
    ],
    perMonthLabel: "/شهريًا",
    perLocationLabel: "/موقع/شهريًا",
    creditsLabel: "رصيد ذكاء/شهريًا",
  },
  fr: {
    reportTiers: [
      {
        ...reportTiers[0],
        badge: "GRATUIT A VIE",
        description: "Importez vos donnees POS et obtenez un benchmarking instantane. Aucune carte bancaire requise.",
        features: [
          "Import CSV manuel",
          "5 indicateurs de performance principaux",
          "Benchmarking anonyme entre pairs",
          "Acces historique sur 90 jours",
          "Support e-mail (reponse sous 72 h)",
        ],
        cta: "Commencer gratuitement",
      },
      {
        ...reportTiers[1],
        badge: "LE PLUS POPULAIRE",
        description: "Ingestion intelligente des donnees avec analyses plus profondes et resumes mensuels.",
        features: [
          "Imports intelligents (PDF, Excel, captures)",
          "Environ 30 visuels complets",
          "Resumes d intelligence mensuels",
          "Vues comparatives hebdo/mois/annee",
          "Acces historique sur 1 an",
          "Support e-mail + chat (24 h)",
        ],
        cta: "Commencer",
      },
      {
        ...reportTiers[2],
        description: "Ingestion quotidienne automatisee avec intelligence avancee et collaboration d equipe.",
        features: [
          "Synchronisation automatique quotidienne",
          "Environ 80 visuels complets",
          "Resumes d intelligence hebdomadaires",
          "Graphiques partageables et collaboration",
          "Acces historique sur 2 ans",
          "Support prioritaire (12 h)",
        ],
        cta: "Commencer",
      },
    ],
    coreTiers: [
      {
        ...coreTiers[0],
        description: "Intelligence operationnelle en temps reel avec rafraichissement toutes les 15 minutes.",
        features: [
          "Tout ce qui est inclus dans Report Pro",
          "Rafraichissement toutes les 15 minutes",
          "Integration POS par API",
          "Suivi Pulse intra-journee",
          "Alertes intelligentes et detection d anomalies",
          "Sundae Intelligence (chat + monitoring)",
          "Intelligence externe Watchtower",
          "Support chat (4 h)",
        ],
        cta: "Commencer",
      },
      {
        ...coreTiers[1],
        badge: "LE PLUS POPULAIRE",
        description: "Stack d intelligence complet avec rafraichissement 5 minutes, support multi-POS et modules avances.",
        features: [
          "Tout ce qui est inclus dans Core Lite",
          "Rafraichissement toutes les 5 minutes",
          "Support multi-POS entre sites",
          "Playbooks intelligents et workflows automatises",
          "Sundae Intelligence (tous les modes)",
          "Benchmarks et intelligence de marche",
          "Intelligence externe Watchtower",
          "Support telephonique prioritaire (2 h)",
        ],
        cta: "Commencer",
      },
    ],
    enterpriseFeatures: [
      "Tout ce qui est inclus dans Core Pro",
      "Rafraichissement personnalise (temps reel disponible)",
      "Rollups multi-marques et benchmarking inter-regions",
      "Integration SSO/SAML",
      "Solutions white-label et partenaires",
      "Acces base sur les roles avec pistes d audit",
      "Customer Success Manager dedie",
      "Support 24/7 avec SLA contractuels",
      "Acces historique personnalise (5 ans et plus)",
      "Credits d intelligence et tableaux de bord personnalises illimites",
    ],
    addOns: [
      { ...pricingAddOns[0], description: "Intelligence externe avec suivi concurrentiel, impact meteo, calendrier d evenements et briefings IA.", note: "Necessite Core" },
      { ...pricingAddOns[1], name: "Modules specialises", description: "14 modules specialises incluant revenu, main-d oeuvre, stock, achats, marketing, reservations, profit, assurance revenu, livraison, experience client, Guest CRM, Cross-Intelligence, Foresight Intelligence et Executive Summary.", note: "Necessite Core. Tarif par module." },
      { ...pricingAddOns[2], description: "Moteur de correlation auto-active qui revele les connexions cachees entre modules. La base est gratuite a partir de 3 modules ; Pro ajoute attribution complete et detection de cannibalisation.", note: "Necessite Core avec 3+ modules. Pro : 199$/mois + 19$/site" },
      { ...pricingAddOns[3], name: "Recharges de credits", description: "Besoin de plus de requetes d intelligence ? Achetez des credits supplementaires pour n importe quelle offre.", note: "Disponible sur toutes les offres" },
    ],
    faqs: [
      { title: "Que se passe-t-il apres la periode gratuite ?", content: "Report Lite est gratuit a vie - pas d essai, pas d expiration. Quand vous etes pret a passer a l etape suivante, vous pouvez passer a une offre payante. Sans engagement et resiliable a tout moment." },
      { title: "Comment comptez-vous un site ?", content: "Un site correspond a une adresse physique de restaurant. Plusieurs marques sous le meme toit comptent toujours comme un seul site." },
      { title: "Quelle est la difference entre Report et Core ?", content: "Report analyse les donnees POS historiques que vous importez pour comprendre ce qui s est passe. Core se connecte par API pour fournir une intelligence quasi temps reel avec Pulse, alertes, playbooks et intelligence predictive." },
      { title: "Prenez-vous en charge les groupes multi-marques et multi-sites ?", content: "Oui. Core Pro gere les environnements multi-POS et Enterprise ajoute des rollups inter-marques, du benchmarking regional, le RBAC et des fonctions de gouvernance." },
      { title: "Y a-t-il une remise pour la facturation annuelle ?", content: "Oui - economisez 10 % avec la facturation annuelle sur toutes les offres payantes. Utilisez l interrupteur ci-dessus pour voir les tarifs annuels." },
      { title: "Mes donnees sont-elles privees et securisees ?", content: "Vos donnees vous appartiennent. Nous securisons les donnees en transit et au repos, appliquons des controles d acces stricts et utilisons des benchmarks anonymises et agreges lorsque cela s applique. Enterprise inclut la conformite SOC 2 Type II." },
      { title: "Puis-je changer d offre plus tard ?", content: "Absolument. Beaucoup d equipes commencent avec Report puis montent en gamme avec la croissance. Le changement d offre est simple et toutes les donnees historiques sont conservees." },
    ],
    perMonthLabel: "/mois",
    perLocationLabel: "/site/mois",
    creditsLabel: "credits d intelligence/mois",
  },
  es: {
    reportTiers: [
      {
        ...reportTiers[0],
        badge: "GRATIS PARA SIEMPRE",
        description: "Carga tus datos de POS y obtén benchmarking instantáneo. No se requiere tarjeta.",
        features: [
          "Carga manual de CSV",
          "5 métricas clave de rendimiento",
          "Benchmarking anónimo entre pares",
          "Acceso histórico de 90 días",
          "Soporte por correo (72 horas)",
        ],
        cta: "Empezar gratis",
      },
      {
        ...reportTiers[1],
        badge: "MÁS POPULAR",
        description: "Ingesta inteligente de datos con análisis más profundos y resúmenes mensuales.",
        features: [
          "Cargas inteligentes (PDF, Excel y capturas)",
          "Aproximadamente 30 visuales completos",
          "Resúmenes mensuales de inteligencia",
          "Vistas comparativas semana/mes/año",
          "Acceso histórico de 1 año",
          "Soporte por correo + chat (24 horas)",
        ],
        cta: "Empezar",
      },
      {
        ...reportTiers[2],
        description: "Ingesta diaria automatizada con inteligencia avanzada y colaboración del equipo.",
        features: [
          "Sincronización diaria automatizada",
          "Aproximadamente 80 visuales completos",
          "Resúmenes semanales de inteligencia",
          "Gráficos compartibles y colaboración",
          "Acceso histórico de 2 años",
          "Soporte prioritario (12 horas)",
        ],
        cta: "Empezar",
      },
    ],
    coreTiers: [
      {
        ...coreTiers[0],
        description: "Inteligencia operativa en tiempo real con refresco de datos cada 15 minutos.",
        features: [
          "Todo lo incluido en Report Pro",
          "Refresco cada 15 minutos",
          "Integración POS por API",
          "Monitoreo intradía de Pulse",
          "Alertas inteligentes y detección de anomalías",
          "Sundae Intelligence (chat + monitor)",
          "Inteligencia externa de Watchtower",
          "Soporte por chat (4 horas)",
        ],
        cta: "Empezar",
      },
      {
        ...coreTiers[1],
        badge: "MÁS POPULAR",
        description: "Stack completo de inteligencia con refresco cada 5 minutos, soporte multi-POS y módulos avanzados.",
        features: [
          "Todo lo incluido en Core Lite",
          "Refresco cada 5 minutos",
          "Soporte multi-POS entre ubicaciones",
          "Playbooks inteligentes y flujos automatizados",
          "Sundae Intelligence (todos los modos)",
          "Benchmarks e inteligencia de mercado",
          "Inteligencia externa de Watchtower",
          "Soporte telefónico prioritario (2 horas)",
        ],
        cta: "Empezar",
      },
    ],
    enterpriseFeatures: [
      "Todo lo incluido en Core Pro",
      "Refresco de datos personalizado (tiempo real disponible)",
      "Rollups multi-marca y benchmarking entre regiones",
      "Integración SSO/SAML",
      "Soluciones white-label y para partners",
      "Acceso basado en roles con auditoría",
      "Customer Success Manager dedicado",
      "Soporte 24/7 con SLA contractuales",
      "Acceso histórico personalizado (5+ años)",
      "Créditos de inteligencia y dashboards personalizados ilimitados",
    ],
    addOns: [
      { ...pricingAddOns[0], description: "Inteligencia externa con seguimiento de competidores, impacto del clima, calendario de eventos y briefings de IA.", note: "Requiere Core" },
      { ...pricingAddOns[1], name: "Módulos especializados", description: "14 módulos especializados que incluyen ingresos, mano de obra, inventario, compras, marketing, reservas, beneficio, revenue assurance, delivery, experiencia del cliente, Guest CRM, Cross-Intelligence, Foresight Intelligence y Executive Summary.", note: "Requiere Core. Precio por módulo." },
      { ...pricingAddOns[2], description: "Motor de correlación que se desbloquea automáticamente y revela conexiones ocultas entre módulos. La base es gratis con 3+ módulos; Pro añade atribución completa y detección de canibalización.", note: "Requiere Core con 3+ módulos. Pro: 199$/mes + 19$/local" },
      { ...pricingAddOns[3], name: "Recargas de créditos", description: "¿Necesitas más consultas de inteligencia? Compra créditos adicionales para cualquier plan.", note: "Disponible en todos los planes" },
    ],
    faqs: [
      { title: "¿Qué pasa después del periodo gratuito?", content: "Report Lite es gratis para siempre, sin prueba ni vencimiento. Cuando necesites más, puedes pasar a cualquier plan de pago. Sin permanencia y cancelable en cualquier momento." },
      { title: "¿Cómo cuentan una ubicación?", content: "Una ubicación es una dirección física de restaurante. Varias marcas bajo el mismo techo siguen contando como una sola ubicación." },
      { title: "¿Cuál es la diferencia entre Report y Core?", content: "Report analiza los datos históricos de POS que subes, ideal para entender qué ocurrió. Core se conecta por API para ofrecer inteligencia casi en tiempo real con Pulse, alertas, playbooks e inteligencia predictiva." },
      { title: "¿Soportan grupos multi-marca y multi-ubicación?", content: "Sí. Core Pro soporta entornos multi-POS y Enterprise añade rollups entre marcas, benchmarking regional, RBAC y funciones de gobernanza." },
      { title: "¿Hay descuento por facturación anual?", content: "Sí: ahorra un 10% con facturación anual en todos los planes de pago. Usa el selector superior para ver el precio anual." },
      { title: "¿Mis datos son privados y seguros?", content: "Tus datos siguen siendo tuyos. Protegemos los datos en tránsito y en reposo, aplicamos controles estrictos de acceso y usamos benchmarking anonimizado y agregado cuando corresponde. Enterprise incluye cumplimiento SOC 2 Type II." },
      { title: "¿Puedo cambiar de plan más adelante?", content: "Claro. Muchos equipos comienzan con Report y evolucionan a medida que crecen. Cambiar de plan es sencillo y todos los datos históricos se conservan." },
    ],
    perMonthLabel: "/mes",
    perLocationLabel: "/ubicación/mes",
    creditsLabel: "créditos de inteligencia/mes",
  },
};

function formatCurrency(value: number): string {
  return value === 0 ? '$0' : `$${Math.round(value)}`
}

function formatCredits(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

function mergeLiveTierPricing(tiers: Tier[], liveCatalog: LiveCatalog | null): Tier[] {
  if (!liveCatalog?.tiers?.length) {
    return tiers
  }

  const liveById = new Map(liveCatalog.tiers.map((tier) => [tier.id, tier]))

  return tiers.map((tier) => {
    const live = liveById.get(tier.id)
    if (!live) return tier

    return {
      ...tier,
      basePrice:
        typeof live.basePrice === 'number' ? formatCurrency(live.basePrice) : tier.basePrice,
      perLocation:
        typeof live.perLocationPrice === 'number'
          ? formatCurrency(live.perLocationPrice)
          : tier.perLocation,
      aiCredits:
        typeof live.aiCreditsBase === 'number' ? formatCredits(live.aiCreditsBase) : tier.aiCredits,
    }
  })
}

function PricingCard({
  tier,
  annual,
  perMonthLabel,
  perLocationLabel,
  creditsLabel,
}: {
  tier: Tier;
  annual: boolean;
  perMonthLabel: string;
  perLocationLabel: string;
  creditsLabel: string;
}) {
  const baseNum = parseInt(tier.basePrice.replace(/\$|,/g, ''));
  const locNum = parseInt(tier.perLocation.replace(/\$|,/g, ''));
  const displayBase = baseNum === 0 ? "$0" : annual ? `$${Math.round(baseNum * 0.9)}` : tier.basePrice;
  const displayLoc = locNum === 0 ? "$0" : annual ? `$${Math.round(locNum * 0.9)}` : tier.perLocation;

  return (
    <Card className={`h-full ${tier.highlight ? 'border-2 border-blue-500/50 shadow-2xl' : 'border border-[var(--border-default)] shadow-lg'} hover:shadow-xl transition-all`}>
      <CardHeader className="pb-4">
        {tier.badge && (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit ${tier.badgeClass}`}>
            {tier.badge}
          </div>
        )}
        <CardTitle className="text-xl text-[var(--text-primary)] mb-2">{tier.name}</CardTitle>
        <div className="mb-3">
          <span className="text-4xl font-bold text-[var(--text-primary)]">{displayBase}</span>
          {baseNum > 0 && <span className="text-[var(--text-muted)] text-sm">{perMonthLabel}</span>}
        </div>
        {locNum > 0 && (
          <p className="text-sm text-[var(--text-supporting)]">
            + {displayLoc}{perLocationLabel}
          </p>
        )}
        <CardDescription className="text-[var(--text-supporting)] mt-3 text-sm">
          {tier.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 pb-4 border-b border-[var(--border-default)]">
          <p className="text-xs text-[var(--text-muted)]">
            {tier.aiCredits} {creditsLabel}
          </p>
        </div>
        <ul className="space-y-2.5 mb-6">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2.5">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={tier.ctaLink}>
          <Button
            variant={tier.highlight ? "primary" : "outline"}
            size="lg"
            className="w-full"
          >
            {tier.cta}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function PricingPage() {
  const { locale, messages } = useWebsiteI18n();
  const copy = messages.pages.pricing;
  const [annual, setAnnual] = useState(false);
  const [liveCatalog, setLiveCatalog] = useState<LiveCatalog | null>(null);
  const localizedContent = localizedPricingPageContent[locale as Exclude<WebsiteLocale, 'en'>];
  const activeReportTiers = localizedContent?.reportTiers ?? reportTiers;
  const activeCoreTiers = localizedContent?.coreTiers ?? coreTiers;
  const activeEnterpriseFeatures = localizedContent?.enterpriseFeatures ?? enterpriseFeatures;
  const activeAddOns = localizedContent?.addOns ?? pricingAddOns;
  const activeFaqs = localizedContent?.faqs ?? pricingFaqs;
  const perMonthLabel = localizedContent?.perMonthLabel ?? '/month';
  const perLocationLabel = localizedContent?.perLocationLabel ?? '/location/month';
  const creditsLabel = localizedContent?.creditsLabel ?? 'intelligence credits/month';

  useEffect(() => {
    let cancelled = false

    const fetchLiveCatalog = async () => {
      try {
        const response = await fetch('/api/pricing/catalog', { cache: 'no-store' })
        if (!response.ok) return

        const data = await response.json()
        if (!cancelled) {
          setLiveCatalog(data)
        }
      } catch (error) {
        console.error('[WebsitePricing] Failed to load live pricing catalog:', error)
      }
    }

    fetchLiveCatalog()
    return () => {
      cancelled = true
    }
  }, [])

  const liveReportTiers = useMemo(
    () => mergeLiveTierPricing(activeReportTiers, liveCatalog),
    [activeReportTiers, liveCatalog]
  )
  const liveCoreTiers = useMemo(
    () => mergeLiveTierPricing(activeCoreTiers, liveCatalog),
    [activeCoreTiers, liveCatalog]
  )

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <PageHero
        badge={copy.badge}
        title={copy.title}
        description={copy.description}
      >
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm font-medium ${!annual ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>{copy.monthly}</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${annual ? 'bg-[var(--navy-deep)]' : 'bg-[var(--navy-deep)]/30'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-[var(--navy-deep)] shadow-none transition-transform ${annual ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
            {copy.annual} <span className="text-green-400 font-semibold">({copy.savePercent})</span>
          </span>
        </div>
      </PageHero>

      {/* Sundae Report Tiers */}
      <section className="pb-16 pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-5 py-2 rounded-full text-sm font-semibold">
                <SundaeIcon name="report" size="md" />
                <span>{copy.reportBadge}</span>
              </div>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {liveReportTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <PricingCard
                  tier={tier}
                  annual={annual}
                  perMonthLabel={perMonthLabel}
                  perLocationLabel={perLocationLabel}
                  creditsLabel={creditsLabel}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Sundae Core Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-5 py-2 rounded-full text-sm font-semibold">
                <SundaeIcon name="core" size="md" />
                <span>{copy.coreBadge}</span>
              </div>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {liveCoreTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <PricingCard
                  tier={tier}
                  annual={annual}
                  perMonthLabel={perMonthLabel}
                  perLocationLabel={perLocationLabel}
                  creditsLabel={creditsLabel}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Enterprise */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <Card className="border-2 border-blue-500/50 shadow-2xl bg-[var(--surface-faint)]">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <SundaeIcon name="franchise" size="md" />
                      <span>{copy.enterpriseBadge}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                      {copy.enterpriseTitle}
                    </h3>
                    <p className="text-[var(--text-supporting)] mb-6">
                      {copy.enterpriseDescription}
                    </p>
                    <Link href="/demo">
                      <Button variant="primary" size="lg" className="px-8">
                        {copy.bookDemo}
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      {activeEnterpriseFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2.5">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.addOnsTitle}</h2>
              <p className="body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
                {copy.addOnsDescription}
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {activeAddOns.map((addon, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-br ${addon.color} rounded-lg flex items-center justify-center mb-4`}>
                      <SundaeIcon name={addon.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-lg text-[var(--text-primary)] mb-2">{addon.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-supporting)] mb-3">{addon.description}</p>
                    <p className="text-xs text-[var(--text-muted)] font-medium">{addon.note}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.3}>
            <div className="text-center mt-8">
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  {copy.detailedPricingCalculator}
                </Button>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
                <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                {copy.faqTitle}
              </h2>
              <p className="body-lg text-[var(--text-secondary)]">
                {copy.faqDescription}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Accordion
              items={activeFaqs}
              defaultOpenIndex={0}
            />
          </FadeUp>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA
        title={copy.ctaTitle}
        description={copy.ctaDescription}
      >
        <Button
          variant="cta"
          size="lg"
          href="/demo"
        >
          {copy.bookDemo}
        </Button>
        <Button
          variant="outline-light"
          size="lg"
          href={SIGNUP_URL}
        >
          {copy.startFree}
        </Button>
      </PageCTA>
    </div>
  );
}
