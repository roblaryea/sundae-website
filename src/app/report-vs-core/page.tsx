"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL } from "@/lib/urls";

type ComparisonRow = {
  category: string;
  report: string;
  reportDetail: string;
  core: string;
  coreDetail: string;
  icon: SundaeIconName;
};

type FeatureRow = {
  feature: string;
  report: string;
  core: string;
};

type DecisionItem = {
  question: string;
  yesAnswer: string;
  yesReason: string;
  noAnswer: string;
  noReason: string;
};

type ReportVsCoreCopy = {
  badge: string;
  heroPrefix: string;
  heroSuffix: string;
  heroDescription: string;
  heroPrimary: string;
  heroSecondary: string;
  reportSummaryTitle: string;
  reportSummaryDescription: string;
  reportSummaryEyebrow: string;
  reportSummaryBullets: string[];
  reportSummaryNoteTitle: string;
  reportSummaryNoteDescription: string;
  coreSummaryTitle: string;
  coreSummaryDescription: string;
  coreSummaryEyebrow: string;
  coreSummaryBullets: string[];
  coreSummaryNoteTitle: string;
  coreSummaryNoteDescription: string;
  comparisonTitle: string;
  comparisonDescription: string;
  reportLabel: string;
  coreLabel: string;
  featureLabel: string;
  comparisonRows: ComparisonRow[];
  pulseTitle: string;
  pulseDescription: string;
  pulseColumns: {
    report: string;
    core: string;
  };
  pulseRows: FeatureRow[];
  watchtowerTitle: string;
  watchtowerDescription: string;
  watchtowerColumns: {
    report: string;
    core: string;
  };
  watchtowerRows: FeatureRow[];
  decisionTitle: string;
  decisionDescription: string;
  decisionYes: string;
  decisionNo: string;
  decisionItems: DecisionItem[];
  upgradeTitle: string;
  upgradeDescription: string;
  upgradeLabels: {
    reportLite: string;
    reportPlus: string;
    core: string;
  };
  upgradeDescriptions: {
    reportLite: string;
    reportPlus: string;
    core: string;
  };
  upgradeNote: string;
  finalTitle: string;
  finalDescription: string;
  finalPricing: string;
  finalStartFree: string;
  finalBookDemo: string;
};

const localizedReportVsCoreCopy: Record<"en" | "ar" | "fr" | "es", ReportVsCoreCopy> = {
  en: {
    badge: "Product Comparison",
    heroPrefix: "Report vs Core:",
    heroSuffix: "Pick Your Speed",
    heroDescription:
      "Both deliver decision intelligence. Report gives you historical depth. Core gives you real-time operational speed. Choose based on how fast you need to act.",
    heroPrimary: "See Exact Pricing",
    heroSecondary: "Start with Report Lite",
    reportSummaryTitle: "Sundae Report",
    reportSummaryDescription: "Historical analysis & strategic planning",
    reportSummaryEyebrow: "Perfect when:",
    reportSummaryBullets: [
      "Daily or weekly reports are enough",
      "You need historical trends and benchmarking",
      "You want to test Sundae before committing",
      "You are managing 1-5 locations",
    ],
    reportSummaryNoteTitle: "Start Free Forever",
    reportSummaryNoteDescription: "Report Lite costs nothing. Prove the value, then upgrade.",
    coreSummaryTitle: "Sundae Core",
    coreSummaryDescription: "Real-time operations & predictive intelligence",
    coreSummaryEyebrow: "Perfect when:",
    coreSummaryBullets: [
      "You need 2-4 hour refresh cycles",
      "Operational speed is critical",
      "You need system integrations such as Labor and Inventory",
      "You are managing 10+ locations",
    ],
    coreSummaryNoteTitle: "Everything in Report, Plus More",
    coreSummaryNoteDescription: "All Report features, plus real-time speed and system integrations.",
    comparisonTitle: "Side-by-Side Comparison",
    comparisonDescription: "Key differences that matter for your decision",
    reportLabel: "Report",
    coreLabel: "Core",
    featureLabel: "Feature",
    comparisonRows: [
      {
        category: "Data Refresh",
        report: "Daily / Weekly / Monthly",
        reportDetail: "Perfect for strategic planning and historical analysis",
        core: "2-4 Hour Cycles",
        coreDetail: "Near real-time for operational decisions",
        icon: "speed",
      },
      {
        category: "Intelligence Dimensions",
        report: "1D + 2D + 4D (Limited)",
        reportDetail: "Full historical data, budget variance, basic predictions",
        core: "Full 4D (All Expanded)",
        coreDetail: "Real-time data + predictions + market context + recommendations",
        icon: "intelligence",
      },
      {
        category: "Data Sources",
        report: "POS Only",
        reportDetail: "Sales, revenue, covers from the point-of-sale system",
        core: "POS + All Systems",
        coreDetail: "POS + Labor + Inventory + Marketing + Reservations + Purchasing",
        icon: "integration",
      },
      {
        category: "Primary Use Cases",
        report: "Strategic Analysis",
        reportDetail: "Historical trends, benchmarking, long-term planning",
        core: "Operational Decisions",
        coreDetail: "Real-time management, proactive alerts, daily operations",
        icon: "insights",
      },
      {
        category: "Best For",
        report: "1-5 Locations",
        reportDetail: "Proof of concept, testing Sundae, strategic analysis",
        core: "10+ Locations",
        coreDetail: "Operations requiring speed and multi-location portfolios",
        icon: "multiLocation",
      },
    ],
    pulseTitle: "Pulse Features by Tier",
    pulseDescription: "Pulse is the intraday operations monitor, available on Core tiers",
    pulseColumns: { report: "Report (Free)", core: "Core" },
    pulseRows: [
      { feature: "Historical sales reporting", report: "✓", core: "✓" },
      { feature: "Real-time sales pacing", report: "—", core: "✓" },
      { feature: "Basic targets (manual, auto)", report: "—", core: "✓" },
      { feature: "Adaptive Intelligence Targets", report: "—", core: "✓" },
      { feature: "Labor headcount tracking", report: "—", core: "✓" },
      { feature: "Labor Productivity Intelligence (SPLH, CPLH)", report: "—", core: "✓" },
      { feature: "Shift cost breakdown", report: "—", core: "✓" },
      { feature: "Server leaderboard (daily)", report: "—", core: "✓" },
      { feature: "Server leaderboard (hourly, by phase, with compare)", report: "—", core: "✓" },
      { feature: "Leakage monitoring", report: "—", core: "✓" },
      { feature: "Sundae Shift Coach", report: "—", core: "✓" },
      { feature: "Alerts & playbooks", report: "—", core: "✓" },
      { feature: "Wallboard mode", report: "—", core: "✓" },
    ],
    watchtowerTitle: "Watchtower Features by Tier",
    watchtowerDescription: "External intelligence, available on Core tiers",
    watchtowerColumns: { report: "Report (Free)", core: "Core" },
    watchtowerRows: [
      { feature: "Basic market context", report: "Limited", core: "✓" },
      { feature: "Daily intelligence briefing", report: "—", core: "✓" },
      { feature: "Competitor tracking (up to 5)", report: "—", core: "✓" },
      { feature: "Competitor tracking (up to 10+)", report: "—", core: "✓ (tier-dependent)" },
      { feature: "Review sentiment analysis", report: "—", core: "✓" },
      { feature: "Local event discovery", report: "—", core: "✓" },
      { feature: "Event impact assessments", report: "—", core: "✓" },
      { feature: "Religious calendar intelligence", report: "—", core: "✓" },
      { feature: "Market landscape tracking", report: "—", core: "✓" },
      { feature: "Trend and macro signals", report: "—", core: "✓" },
    ],
    decisionTitle: "Decision Tree: Which Tier?",
    decisionDescription: "Answer these questions to find your tier",
    decisionYes: "Yes",
    decisionNo: "No",
    decisionItems: [
      {
        question: "Need operational speed?",
        yesAnswer: "Core",
        yesReason: "2-4 hour refresh for same-shift decisions",
        noAnswer: "Report",
        noReason: "Daily reports are enough for strategic planning",
      },
      {
        question: "Need detailed POS insights plus other systems?",
        yesAnswer: "Core",
        yesReason: "Integrates Labor, Inventory, Marketing, Reservations, and Purchasing",
        noAnswer: "Report",
        noReason: "POS-only data meets your needs",
      },
      {
        question: "Managing 10+ locations?",
        yesAnswer: "Core",
        yesReason: "Multi-location coordination requires real-time visibility",
        noAnswer: "Report",
        noReason: "1-5 locations work well with historical analysis",
      },
      {
        question: "Want to test Sundae first?",
        yesAnswer: "Report",
        yesReason: "Start free with Report Lite, upgrade when ready",
        noAnswer: "Core",
        noReason: "Go real-time from day one",
      },
    ],
    upgradeTitle: "Not Sure? Start with Report",
    upgradeDescription:
      "Many operators start with Report, prove the value with Report Lite, then upgrade to Core when they need operational speed. All historical data is preserved when you upgrade, with zero data loss.",
    upgradeLabels: {
      reportLite: "Report Lite",
      reportPlus: "Report Plus/Pro",
      core: "Core",
    },
    upgradeDescriptions: {
      reportLite: "Free Forever",
      reportPlus: "Automated Analysis",
      core: "Real-Time Intelligence",
    },
    upgradeNote: "Smooth upgrades. Start free, upgrade when it makes sense, scale as you grow.",
    finalTitle: "See Pricing for Your Operation",
    finalDescription: "Interactive calculator shows costs for both tiers based on your location count.",
    finalPricing: "See Pricing",
    finalStartFree: "Start with Report Lite",
    finalBookDemo: "Book a Working Session",
  },
  ar: {
    badge: "مقارنة المنتج",
    heroPrefix: "Report مقابل Core:",
    heroSuffix: "اختر سرعتك",
    heroDescription:
      "كلاهما يوفّر ذكاءً داعمًا للقرار. Report يمنحك عمقًا تاريخيًا، وCore يمنحك سرعة تشغيلية لحظية. اختر بناءً على سرعة التحرك التي تحتاجها.",
    heroPrimary: "عرض التسعير الدقيق",
    heroSecondary: "ابدأ مجانًا مع Report",
    reportSummaryTitle: "Sundae Report",
    reportSummaryDescription: "تحليل تاريخي وتخطيط استراتيجي",
    reportSummaryEyebrow: "مناسب عندما:",
    reportSummaryBullets: [
      "تكفيك التقارير اليومية أو الأسبوعية",
      "تحتاج اتجاهات تاريخية ومقارنة معيارية",
      "تريد تجربة Sundae قبل الالتزام",
      "تدير 1-5 مواقع",
    ],
    reportSummaryNoteTitle: "ابدأ مجانًا دائمًا",
    reportSummaryNoteDescription: "Report Lite مجاني. أثبت القيمة ثم قم بالترقية.",
    coreSummaryTitle: "Sundae Core",
    coreSummaryDescription: "عمليات لحظية وذكاء تنبؤي",
    coreSummaryEyebrow: "مناسب عندما:",
    coreSummaryBullets: [
      "تحتاج تحديثات كل 2-4 ساعات",
      "السرعة التشغيلية أساسية",
      "تحتاج تكاملات مع أنظمة مثل العمالة والمخزون",
      "تدير أكثر من 10 مواقع",
    ],
    coreSummaryNoteTitle: "كل ما في Report وأكثر",
    coreSummaryNoteDescription: "كل ميزات Report مع سرعة لحظية وتكاملات أنظمة.",
    comparisonTitle: "مقارنة جنبًا إلى جنب",
    comparisonDescription: "الفروق الأساسية التي تهم قرارك",
    reportLabel: "Report",
    coreLabel: "Core",
    featureLabel: "الميزة",
    comparisonRows: [
      {
        category: "تحديث البيانات",
        report: "يومي / أسبوعي / شهري",
        reportDetail: "مثالي للتخطيط الاستراتيجي والتحليل التاريخي",
        core: "كل 2-4 ساعات",
        coreDetail: "شبه لحظي للقرارات التشغيلية",
        icon: "speed",
      },
      {
        category: "أبعاد الذكاء",
        report: "1D + 2D + 4D (محدود)",
        reportDetail: "بيانات تاريخية كاملة وانحراف الميزانية وتوقعات أساسية",
        core: "4D كامل (موسع بالكامل)",
        coreDetail: "بيانات لحظية + توقعات + سياق سوقي + توصيات",
        icon: "intelligence",
      },
      {
        category: "مصادر البيانات",
        report: "POS فقط",
        reportDetail: "المبيعات والإيراد والغطاءات من نظام نقاط البيع",
        core: "POS + جميع الأنظمة",
        coreDetail: "POS + العمالة + المخزون + التسويق + الحجوزات + المشتريات",
        icon: "integration",
      },
      {
        category: "حالات الاستخدام الأساسية",
        report: "تحليل استراتيجي",
        reportDetail: "اتجاهات تاريخية وقياس معياري وتخطيط طويل الأجل",
        core: "قرارات تشغيلية",
        coreDetail: "إدارة لحظية وتنبيهات استباقية وعمليات يومية",
        icon: "insights",
      },
      {
        category: "الأفضل لـ",
        report: "1-5 مواقع",
        reportDetail: "إثبات الفكرة وتجربة Sundae والتحليل الاستراتيجي",
        core: "أكثر من 10 مواقع",
        coreDetail: "عمليات تحتاج سرعة ومحافظ متعددة المواقع",
        icon: "multiLocation",
      },
    ],
    pulseTitle: "ميزات Pulse حسب الفئة",
    pulseDescription: "Pulse هو مراقب العمليات خلال اليوم، ومتاح في فئات Core",
    pulseColumns: { report: "Report (مجاني)", core: "Core" },
    pulseRows: [
      { feature: "تقارير المبيعات التاريخية", report: "✓", core: "✓" },
      { feature: "تتبّع المبيعات لحظيًا", report: "—", core: "✓" },
      { feature: "أهداف أساسية (يدوي، تلقائي)", report: "—", core: "✓" },
      { feature: "أهداف ذكية متكيفة", report: "—", core: "✓" },
      { feature: "تتبع عدد الموظفين", report: "—", core: "✓" },
      { feature: "ذكاء إنتاجية العمالة (SPLH، CPLH)", report: "—", core: "✓" },
      { feature: "تفصيل تكلفة الوردية", report: "—", core: "✓" },
      { feature: "ترتيب الخوادم (يومي)", report: "—", core: "✓" },
      { feature: "ترتيب الخوادم (ساعي، حسب المرحلة، مع المقارنة)", report: "—", core: "✓" },
      { feature: "مراقبة التسرب", report: "—", core: "✓" },
      { feature: "Sundae Shift Coach", report: "—", core: "✓" },
      { feature: "التنبيهات ودفاتر الإرشاد", report: "—", core: "✓" },
      { feature: "وضعية اللوحات الجدارية", report: "—", core: "✓" },
    ],
    watchtowerTitle: "ميزات Watchtower حسب الفئة",
    watchtowerDescription: "ذكاء خارجي، متاح في فئات Core",
    watchtowerColumns: { report: "Report (مجاني)", core: "Core" },
    watchtowerRows: [
      { feature: "سياق سوقي أساسي", report: "محدود", core: "✓" },
      { feature: "إحاطة ذكاء يومية", report: "—", core: "✓" },
      { feature: "تتبع المنافسين (حتى 5)", report: "—", core: "✓" },
      { feature: "تتبع المنافسين (حتى 10+)", report: "—", core: "✓ (حسب الفئة)" },
      { feature: "تحليل مشاعر المراجعات", report: "—", core: "✓" },
      { feature: "اكتشاف الفعاليات المحلية", report: "—", core: "✓" },
      { feature: "تقييم أثر الفعاليات", report: "—", core: "✓" },
      { feature: "ذكاء التقويم الديني", report: "—", core: "✓" },
      { feature: "تتبع مشهد السوق", report: "—", core: "✓" },
      { feature: "إشارات الاتجاهات والاقتصاد الكلي", report: "—", core: "✓" },
    ],
    decisionTitle: "شجرة القرار: أي فئة؟",
    decisionDescription: "أجب عن هذه الأسئلة لتحديد الفئة المناسبة",
    decisionYes: "نعم",
    decisionNo: "لا",
    decisionItems: [
      {
        question: "هل تحتاج سرعة تشغيلية؟",
        yesAnswer: "Core",
        yesReason: "تحديث كل 2-4 ساعات لقرارات نفس الوردية",
        noAnswer: "Report",
        noReason: "التقارير اليومية تكفي للتخطيط الاستراتيجي",
      },
      {
        question: "هل تحتاج رؤى POS مفصلة مع أنظمة أخرى؟",
        yesAnswer: "Core",
        yesReason: "يتكامل مع العمالة والمخزون والتسويق والحجوزات والمشتريات",
        noAnswer: "Report",
        noReason: "بيانات POS فقط تكفيك",
      },
      {
        question: "هل تدير أكثر من 10 مواقع؟",
        yesAnswer: "Core",
        yesReason: "التنسيق متعدد المواقع يحتاج رؤية لحظية",
        noAnswer: "Report",
        noReason: "1-5 مواقع تناسبها التحليلات التاريخية",
      },
      {
        question: "هل تريد تجربة Sundae أولًا؟",
        yesAnswer: "Report",
        yesReason: "ابدأ مجانًا مع Report Lite ثم قم بالترقية عندما تكون جاهزًا",
        noAnswer: "Core",
        noReason: "ابدأ لحظيًا من اليوم الأول",
      },
    ],
    upgradeTitle: "غير متأكد؟ ابدأ بـ Report",
    upgradeDescription:
      "يبدأ كثير من المشغلين بـ Report ويثبتون القيمة عبر Report Lite، ثم ينتقلون إلى Core عندما يحتاجون سرعة تشغيلية. تُحافظ كل البيانات التاريخية عند الترقية بدون أي فقدان.",
    upgradeLabels: {
      reportLite: "Report Lite",
      reportPlus: "Report Plus/Pro",
      core: "Core",
    },
    upgradeDescriptions: {
      reportLite: "مجاني دائمًا",
      reportPlus: "تحليل آلي",
      core: "ذكاء لحظي",
    },
    upgradeNote: "ترقيات سلسة. ابدأ مجانًا، ثم ترقَّ عندما يصبح ذلك منطقيًا.",
    finalTitle: "عرض التسعير لعمليتك",
    finalDescription: "الحاسبة التفاعلية تعرض التكلفة لكل فئة بناءً على عدد المواقع.",
    finalPricing: "عرض التسعير",
    finalStartFree: "ابدأ مجانًا",
    finalBookDemo: "احجز عرضًا",
  },
  fr: {
    badge: "Comparaison produit",
    heroPrefix: "Report vs Core :",
    heroSuffix: "Choisissez votre vitesse",
    heroDescription:
      "Les deux fournissent une intelligence décisionnelle. Report apporte la profondeur historique. Core apporte la vitesse opérationnelle en temps réel. Choisissez selon la rapidité d'action dont vous avez besoin.",
    heroPrimary: "Voir le prix exact",
    heroSecondary: "Commencer gratuitement avec Report",
    reportSummaryTitle: "Sundae Report",
    reportSummaryDescription: "Analyse historique et planification stratégique",
    reportSummaryEyebrow: "Idéal lorsque :",
    reportSummaryBullets: [
      "Les rapports quotidiens ou hebdomadaires suffisent",
      "Vous avez besoin de tendances historiques et de benchmarks",
      "Vous voulez tester Sundae avant de vous engager",
      "Vous gérez 1 à 5 sites",
    ],
    reportSummaryNoteTitle: "Commencez gratuitement pour toujours",
    reportSummaryNoteDescription: "Report Lite ne coûte rien. Prouvez la valeur, puis passez à l'offre supérieure.",
    coreSummaryTitle: "Sundae Core",
    coreSummaryDescription: "Opérations en temps réel et intelligence prédictive",
    coreSummaryEyebrow: "Idéal lorsque :",
    coreSummaryBullets: [
      "Vous avez besoin de cycles de mise à jour de 2 à 4 heures",
      "La vitesse opérationnelle est critique",
      "Vous avez besoin d'intégrations système comme la main-d'œuvre et les stocks",
      "Vous gérez 10 sites ou plus",
    ],
    coreSummaryNoteTitle: "Tout ce qu'il y a dans Report, et plus encore",
    coreSummaryNoteDescription: "Toutes les fonctionnalités de Report, plus la vitesse temps réel et les intégrations système.",
    comparisonTitle: "Comparaison côte à côte",
    comparisonDescription: "Les différences clés qui comptent pour votre décision",
    reportLabel: "Report",
    coreLabel: "Core",
    featureLabel: "Fonctionnalité",
    comparisonRows: [
      {
        category: "Actualisation des données",
        report: "Quotidien / Hebdo / Mensuel",
        reportDetail: "Parfait pour la planification stratégique et l'analyse historique",
        core: "Cycles de 2 à 4 heures",
        coreDetail: "Quasi temps réel pour les décisions opérationnelles",
        icon: "speed",
      },
      {
        category: "Dimensions de l'intelligence",
        report: "1D + 2D + 4D (limité)",
        reportDetail: "Données historiques complètes, variance budgétaire, prévisions de base",
        core: "4D complet (tout étendu)",
        coreDetail: "Données en temps réel + prévisions + contexte marché + recommandations",
        icon: "intelligence",
      },
      {
        category: "Sources de données",
        report: "POS uniquement",
        reportDetail: "Ventes, chiffre d'affaires, couverts depuis le système de caisse",
        core: "POS + tous les systèmes",
        coreDetail: "POS + main-d'œuvre + stocks + marketing + réservations + achats",
        icon: "integration",
      },
      {
        category: "Cas d'usage principaux",
        report: "Analyse stratégique",
        reportDetail: "Tendances historiques, benchmarks, planification long terme",
        core: "Décisions opérationnelles",
        coreDetail: "Gestion en temps réel, alertes proactives, opérations quotidiennes",
        icon: "insights",
      },
      {
        category: "Idéal pour",
        report: "1 à 5 sites",
        reportDetail: "Preuve de concept, test de Sundae, analyse stratégique",
        core: "10 sites ou plus",
        coreDetail: "Opérations nécessitant vitesse et portefeuilles multi-sites",
        icon: "multiLocation",
      },
    ],
    pulseTitle: "Fonctionnalités Pulse par offre",
    pulseDescription: "Pulse est le moniteur d'opérations intrajournalières, disponible sur les offres Core",
    pulseColumns: { report: "Report (gratuit)", core: "Core" },
    pulseRows: [
      { feature: "Rapports de ventes historiques", report: "✓", core: "✓" },
      { feature: "Suivi des ventes en temps réel", report: "—", core: "✓" },
      { feature: "Objectifs de base (manuel, auto)", report: "—", core: "✓" },
      { feature: "Objectifs d'intelligence adaptative", report: "—", core: "✓" },
      { feature: "Suivi des effectifs", report: "—", core: "✓" },
      { feature: "Intelligence productivité main-d'œuvre (SPLH, CPLH)", report: "—", core: "✓" },
      { feature: "Ventilation du coût de service", report: "—", core: "✓" },
      { feature: "Classement des serveurs (quotidien)", report: "—", core: "✓" },
      { feature: "Classement des serveurs (horaire, par phase, avec comparaison)", report: "—", core: "✓" },
      { feature: "Suivi des fuites", report: "—", core: "✓" },
      { feature: "Sundae Shift Coach", report: "—", core: "✓" },
      { feature: "Alertes et playbooks", report: "—", core: "✓" },
      { feature: "Mode tableau mural", report: "—", core: "✓" },
    ],
    watchtowerTitle: "Fonctionnalités Watchtower par offre",
    watchtowerDescription: "Intelligence externe, disponible sur les offres Core",
    watchtowerColumns: { report: "Report (gratuit)", core: "Core" },
    watchtowerRows: [
      { feature: "Contexte marché de base", report: "Limité", core: "✓" },
      { feature: "Briefing d'intelligence quotidien", report: "—", core: "✓" },
      { feature: "Suivi des concurrents (jusqu'à 5)", report: "—", core: "✓" },
      { feature: "Suivi des concurrents (jusqu'à 10+)", report: "—", core: "✓ (selon l'offre)" },
      { feature: "Analyse du sentiment des avis", report: "—", core: "✓" },
      { feature: "Découverte d'événements locaux", report: "—", core: "✓" },
      { feature: "Évaluation de l'impact des événements", report: "—", core: "✓" },
      { feature: "Intelligence du calendrier religieux", report: "—", core: "✓" },
      { feature: "Suivi du paysage marché", report: "—", core: "✓" },
      { feature: "Signaux de tendance et macro", report: "—", core: "✓" },
    ],
    decisionTitle: "Arbre de décision : quelle offre ?",
    decisionDescription: "Répondez à ces questions pour trouver l'offre qui vous convient",
    decisionYes: "Oui",
    decisionNo: "Non",
    decisionItems: [
      {
        question: "Besoin de vitesse opérationnelle ?",
        yesAnswer: "Core",
        yesReason: "Actualisation toutes les 2 à 4 heures pour les décisions du même service",
        noAnswer: "Report",
        noReason: "Les rapports quotidiens suffisent pour la planification stratégique",
      },
      {
        question: "Besoin d'insights POS détaillés et d'autres systèmes ?",
        yesAnswer: "Core",
        yesReason: "Intègre la main-d'œuvre, les stocks, le marketing, les réservations et les achats",
        noAnswer: "Report",
        noReason: "Les données POS seules répondent à votre besoin",
      },
      {
        question: "Vous gérez 10 sites ou plus ?",
        yesAnswer: "Core",
        yesReason: "La coordination multi-sites exige une visibilité en temps réel",
        noAnswer: "Report",
        noReason: "1 à 5 sites fonctionnent bien avec l'analyse historique",
      },
      {
        question: "Vous voulez tester Sundae d'abord ?",
        yesAnswer: "Report",
        yesReason: "Commencez gratuitement avec Report Lite, puis passez à une offre supérieure quand vous êtes prêt",
        noAnswer: "Core",
        noReason: "Passez au temps réel dès le premier jour",
      },
    ],
    upgradeTitle: "Pas sûr ? Commencez avec Report",
    upgradeDescription:
      "Beaucoup d'opérateurs commencent avec Report, prouvent la valeur via Report Lite, puis passent à Core lorsqu'ils ont besoin de vitesse opérationnelle. Toutes les données historiques sont conservées lors de la migration, sans perte de données.",
    upgradeLabels: {
      reportLite: "Report Lite",
      reportPlus: "Report Plus/Pro",
      core: "Core",
    },
    upgradeDescriptions: {
      reportLite: "Gratuit à vie",
      reportPlus: "Analyse automatisée",
      core: "Intelligence en temps réel",
    },
    upgradeNote: "Des montées en gamme fluides. Commencez gratuitement, passez à l'offre supérieure quand c'est pertinent.",
    finalTitle: "Voir les tarifs pour votre activité",
    finalDescription: "Le calculateur interactif affiche les coûts des deux offres selon votre nombre de sites.",
    finalPricing: "Voir les tarifs",
    finalStartFree: "Commencer gratuitement",
    finalBookDemo: "Réserver une démo",
  },
  es: {
    badge: "Comparación de producto",
    heroPrefix: "Report vs Core:",
    heroSuffix: "Elige tu velocidad",
    heroDescription:
      "Ambos ofrecen inteligencia para la toma de decisiones. Report aporta profundidad histórica. Core aporta velocidad operativa en tiempo real. Elige según la rapidez con la que necesites actuar.",
    heroPrimary: "Ver precio exacto",
    heroSecondary: "Empieza gratis con Report",
    reportSummaryTitle: "Sundae Report",
    reportSummaryDescription: "Análisis histórico y planificación estratégica",
    reportSummaryEyebrow: "Ideal cuando:",
    reportSummaryBullets: [
      "Te bastan los informes diarios o semanales",
      "Necesitas tendencias históricas y benchmarking",
      "Quieres probar Sundae antes de comprometerte",
      "Gestionas 1 a 5 locales",
    ],
    reportSummaryNoteTitle: "Empieza gratis para siempre",
    reportSummaryNoteDescription: "Report Lite no cuesta nada. Demuestra el valor y luego sube de nivel.",
    coreSummaryTitle: "Sundae Core",
    coreSummaryDescription: "Operaciones en tiempo real e inteligencia predictiva",
    coreSummaryEyebrow: "Ideal cuando:",
    coreSummaryBullets: [
      "Necesitas ciclos de actualización de 2 a 4 horas",
      "La velocidad operativa es crítica",
      "Necesitas integraciones con sistemas como personal e inventario",
      "Gestionas 10 o más locales",
    ],
    coreSummaryNoteTitle: "Todo lo de Report, y mucho más",
    coreSummaryNoteDescription: "Todas las funciones de Report, más velocidad en tiempo real e integraciones de sistema.",
    comparisonTitle: "Comparación lado a lado",
    comparisonDescription: "Las diferencias clave que importan para tu decisión",
    reportLabel: "Report",
    coreLabel: "Core",
    featureLabel: "Función",
    comparisonRows: [
      {
        category: "Actualización de datos",
        report: "Diaria / Semanal / Mensual",
        reportDetail: "Perfecto para planificación estratégica y análisis histórico",
        core: "Ciclos de 2 a 4 horas",
        coreDetail: "Casi en tiempo real para decisiones operativas",
        icon: "speed",
      },
      {
        category: "Dimensiones de inteligencia",
        report: "1D + 2D + 4D (Limitado)",
        reportDetail: "Datos históricos completos, variación de presupuesto y predicciones básicas",
        core: "4D completo (todo ampliado)",
        coreDetail: "Datos en tiempo real + predicciones + contexto de mercado + recomendaciones",
        icon: "intelligence",
      },
      {
        category: "Fuentes de datos",
        report: "Solo POS",
        reportDetail: "Ventas, ingresos y cubiertos desde el sistema de punto de venta",
        core: "POS + todos los sistemas",
        coreDetail: "POS + personal + inventario + marketing + reservas + compras",
        icon: "integration",
      },
      {
        category: "Casos de uso principales",
        report: "Análisis estratégico",
        reportDetail: "Tendencias históricas, benchmarking y planificación a largo plazo",
        core: "Decisiones operativas",
        coreDetail: "Gestión en tiempo real, alertas proactivas y operaciones diarias",
        icon: "insights",
      },
      {
        category: "Ideal para",
        report: "1 a 5 locales",
        reportDetail: "Prueba de concepto, test de Sundae y análisis estratégico",
        core: "10+ locales",
        coreDetail: "Operaciones que requieren velocidad y carteras multi-local",
        icon: "multiLocation",
      },
    ],
    pulseTitle: "Funciones de Pulse por plan",
    pulseDescription: "Pulse es el monitor de operaciones intradía, disponible en los planes Core",
    pulseColumns: { report: "Report (gratis)", core: "Core" },
    pulseRows: [
      { feature: "Informes históricos de ventas", report: "✓", core: "✓" },
      { feature: "Ritmo de ventas en tiempo real", report: "—", core: "✓" },
      { feature: "Objetivos básicos (manual, auto)", report: "—", core: "✓" },
      { feature: "Objetivos de inteligencia adaptativa", report: "—", core: "✓" },
      { feature: "Seguimiento del personal", report: "—", core: "✓" },
      { feature: "Inteligencia de productividad laboral (SPLH, CPLH)", report: "—", core: "✓" },
      { feature: "Desglose del coste por turno", report: "—", core: "✓" },
      { feature: "Ranking de servidores (diario)", report: "—", core: "✓" },
      { feature: "Ranking de servidores (por hora, por fase, con comparación)", report: "—", core: "✓" },
      { feature: "Seguimiento de fugas", report: "—", core: "✓" },
      { feature: "Sundae Shift Coach", report: "—", core: "✓" },
      { feature: "Alertas y playbooks", report: "—", core: "✓" },
      { feature: "Modo wallboard", report: "—", core: "✓" },
    ],
    watchtowerTitle: "Funciones de Watchtower por plan",
    watchtowerDescription: "Inteligencia externa, disponible en los planes Core",
    watchtowerColumns: { report: "Report (gratis)", core: "Core" },
    watchtowerRows: [
      { feature: "Contexto básico del mercado", report: "Limitado", core: "✓" },
      { feature: "Briefing diario de inteligencia", report: "—", core: "✓" },
      { feature: "Seguimiento de competidores (hasta 5)", report: "—", core: "✓" },
      { feature: "Seguimiento de competidores (hasta 10+)", report: "—", core: "✓ (según el plan)" },
      { feature: "Análisis del sentimiento de reseñas", report: "—", core: "✓" },
      { feature: "Descubrimiento de eventos locales", report: "—", core: "✓" },
      { feature: "Evaluación del impacto de eventos", report: "—", core: "✓" },
      { feature: "Inteligencia del calendario religioso", report: "—", core: "✓" },
      { feature: "Seguimiento del panorama de mercado", report: "—", core: "✓" },
      { feature: "Señales de tendencia y macro", report: "—", core: "✓" },
    ],
    decisionTitle: "Árbol de decisión: ¿qué plan?",
    decisionDescription: "Responde estas preguntas para encontrar tu plan",
    decisionYes: "Sí",
    decisionNo: "No",
    decisionItems: [
      {
        question: "¿Necesitas velocidad operativa?",
        yesAnswer: "Core",
        yesReason: "Actualización cada 2 a 4 horas para decisiones del mismo turno",
        noAnswer: "Report",
        noReason: "Los informes diarios bastan para planificación estratégica",
      },
      {
        question: "¿Necesitas insights detallados de POS y otros sistemas?",
        yesAnswer: "Core",
        yesReason: "Integra personal, inventario, marketing, reservas y compras",
        noAnswer: "Report",
        noReason: "Solo los datos POS cubren lo que necesitas",
      },
      {
        question: "¿Gestionas 10 o más locales?",
        yesAnswer: "Core",
        yesReason: "La coordinación multi-local requiere visibilidad en tiempo real",
        noAnswer: "Report",
        noReason: "1 a 5 locales funcionan bien con análisis histórico",
      },
      {
        question: "¿Quieres probar Sundae primero?",
        yesAnswer: "Report",
        yesReason: "Empieza gratis con Report Lite y sube de nivel cuando estés listo",
        noAnswer: "Core",
        noReason: "Pasa al tiempo real desde el primer día",
      },
    ],
    upgradeTitle: "¿No lo tienes claro? Empieza con Report",
    upgradeDescription:
      "Muchos operadores empiezan con Report, demuestran el valor con Report Lite y luego pasan a Core cuando necesitan velocidad operativa. Todos los datos históricos se conservan al subir de nivel, sin pérdida de datos.",
    upgradeLabels: {
      reportLite: "Report Lite",
      reportPlus: "Report Plus/Pro",
      core: "Core",
    },
    upgradeDescriptions: {
      reportLite: "Gratis para siempre",
      reportPlus: "Análisis automatizado",
      core: "Inteligencia en tiempo real",
    },
    upgradeNote: "Subidas de nivel suaves. Empieza gratis y sube cuando tenga sentido.",
    finalTitle: "Ver precios para tu operación",
    finalDescription: "La calculadora interactiva muestra los costes de ambos planes según tu número de locales.",
    finalPricing: "Ver precios",
    finalStartFree: "Empezar gratis",
    finalBookDemo: "Reservar demo",
  },
};

export default function ReportVsCorePage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const copy = localizedReportVsCoreCopy[locale] ?? localizedReportVsCoreCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge={copy.badge}
        title={
          <>
            {copy.heroPrefix}
            <br />
            {copy.heroSuffix}
          </>
        }
        description={copy.heroDescription}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open(PRICING_URL, "_blank", "noopener,noreferrer")}
          >
            {copy.heroPrimary}
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => cta(REPORT_APP_URL, "start_free_from_comparison", { page: "/report-vs-core" })}
          >
            {copy.heroSecondary}
          </Button>
        </div>
      </PageHero>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b border-[var(--border-default)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeUp>
              <Card variant="elevated" className="h-full border-2 border-blue-500/30">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name="report" size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--text-primary)]">{copy.reportSummaryTitle}</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-[var(--text-secondary)] font-semibold mb-4">
                    {copy.reportSummaryDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-muted)] uppercase mb-2">{copy.reportSummaryEyebrow}</p>
                      <ul className="space-y-2 text-[var(--text-supporting)]">
                        {copy.reportSummaryBullets.map((bullet) => (
                          <li key={bullet}>• {bullet}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-4">
                      <p className="text-sm font-semibold text-[#60A5FA] mb-1">{copy.reportSummaryNoteTitle}</p>
                      <p className="text-sm text-blue-300">{copy.reportSummaryNoteDescription}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeUp>

            <FadeUp delay={0.15}>
              <Card variant="elevated" className="h-full border-2 border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name="speed" size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--text-primary)]">{copy.coreSummaryTitle}</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-[var(--text-secondary)] font-semibold mb-4">
                    {copy.coreSummaryDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-muted)] uppercase mb-2">{copy.coreSummaryEyebrow}</p>
                      <ul className="space-y-2 text-[var(--text-supporting)]">
                        {copy.coreSummaryBullets.map((bullet) => (
                          <li key={bullet}>• {bullet}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-400 mb-1">{copy.coreSummaryNoteTitle}</p>
                      <p className="text-sm text-purple-300">{copy.coreSummaryNoteDescription}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.comparisonTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.comparisonDescription}</p>
          </FadeUp>

          <div className="space-y-6">
            {copy.comparisonRows.map((item, index) => (
              <FadeUp key={item.category} delay={index * 0.1}>
                <Card variant="elevated" className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
                    <div className="p-6 bg-[var(--surface-faint)] flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={item.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text-primary)] text-lg">{item.category}</h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <p className="font-bold text-[var(--text-primary)]">{copy.reportLabel}</p>
                      </div>
                      <p className="text-lg font-semibold text-[#60A5FA] mb-2">{item.report}</p>
                      <p className="text-sm text-[var(--text-supporting)]">{item.reportDetail}</p>
                    </div>

                    <div className="p-6 bg-purple-500/5">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full" />
                        <p className="font-bold text-[var(--text-primary)]">{copy.coreLabel}</p>
                      </div>
                      <p className="text-lg font-semibold text-purple-400 mb-2">{item.core}</p>
                      <p className="text-sm text-[var(--text-supporting)]">{item.coreDetail}</p>
                    </div>
                  </div>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.pulseTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.pulseDescription}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--border-default)]">
                    <th className="py-3 pr-4 text-sm font-semibold text-[var(--text-primary)]">{copy.featureLabel}</th>
                    <th className="py-3 px-4 text-sm font-semibold text-[#60A5FA] text-center">{copy.pulseColumns.report}</th>
                    <th className="py-3 pl-4 text-sm font-semibold text-purple-400 text-center">{copy.pulseColumns.core}</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[var(--text-secondary)]">
                  {copy.pulseRows.map((row) => (
                    <tr key={row.feature} className="border-b border-[var(--border-default)]">
                      <td className="py-2.5 pr-4">{row.feature}</td>
                      <td className={`py-2.5 px-4 text-center ${row.report === "✓" ? "text-green-500 font-semibold" : "text-[var(--text-muted)]"}`}>{row.report}</td>
                      <td className={`py-2.5 pl-4 text-center ${row.core === "✓" ? "text-green-500 font-semibold" : "text-[var(--text-muted)]"}`}>{row.core}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.watchtowerTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.watchtowerDescription}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--border-default)]">
                    <th className="py-3 pr-4 text-sm font-semibold text-[var(--text-primary)]">{copy.featureLabel}</th>
                    <th className="py-3 px-4 text-sm font-semibold text-[#60A5FA] text-center">{copy.watchtowerColumns.report}</th>
                    <th className="py-3 pl-4 text-sm font-semibold text-purple-400 text-center">{copy.watchtowerColumns.core}</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[var(--text-secondary)]">
                  {copy.watchtowerRows.map((row) => (
                    <tr key={row.feature} className="border-b border-[var(--border-default)]">
                      <td className="py-2.5 pr-4">{row.feature}</td>
                      <td className={`py-2.5 px-4 text-center ${row.report === "✓" || row.report === "Limited" ? row.report === "Limited" ? "text-[#60A5FA]" : "text-green-500 font-semibold" : "text-[var(--text-muted)]"}`}>{row.report}</td>
                      <td className={`py-2.5 pl-4 text-center ${row.core.includes("✓") ? "text-green-500 font-semibold" : "text-[var(--text-muted)]"}`}>{row.core}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.decisionTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.decisionDescription}</p>
          </FadeUp>

          <div className="space-y-6">
            {copy.decisionItems.map((decision, index) => (
              <FadeUp key={decision.question} delay={index * 0.1}>
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--text-primary)] mb-6">{decision.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-green-500/10 rounded-lg border-2 border-green-500/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">✓</span>
                          <p className="font-bold text-green-400">{copy.decisionYes}</p>
                        </div>
                        <p className="font-bold text-lg text-[var(--text-primary)] mb-2">→ {decision.yesAnswer}</p>
                        <p className="text-sm text-[var(--text-supporting)]">{decision.yesReason}</p>
                      </div>

                      <div className="p-4 bg-blue-500/10 rounded-lg border-2 border-blue-500/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">→</span>
                          <p className="font-bold text-[#60A5FA]">{copy.decisionNo}</p>
                        </div>
                        <p className="font-bold text-lg text-[var(--text-primary)] mb-2">→ {decision.noAnswer}</p>
                        <p className="text-sm text-[var(--text-supporting)]">{decision.noReason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-6">{copy.upgradeTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] mb-8 max-w-3xl mx-auto">{copy.upgradeDescription}</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="bg-[var(--navy-deep)] rounded-xl p-8 border border-[var(--border-default)] max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <SundaeIcon name="report" size="xl" className="text-white" />
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">{copy.upgradeLabels.reportLite}</p>
                  <p className="text-sm text-[var(--text-muted)]">{copy.upgradeDescriptions.reportLite}</p>
                </div>
                <div className="text-3xl text-[var(--text-muted)]">→</div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <SundaeIcon name="report" size="xl" className="text-white" />
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">{copy.upgradeLabels.reportPlus}</p>
                  <p className="text-sm text-[var(--text-muted)]">{copy.upgradeDescriptions.reportPlus}</p>
                </div>
                <div className="text-3xl text-[var(--text-muted)]">→</div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <SundaeIcon name="speed" size="xl" className="text-white" />
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">{copy.upgradeLabels.core}</p>
                  <p className="text-sm text-[var(--text-muted)]">{copy.upgradeDescriptions.core}</p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-supporting)]">
                {copy.upgradeNote}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <PageCTA title={copy.finalTitle} description={copy.finalDescription}>
        <Button
          variant="primary"
          size="lg"
          onClick={() => window.open(PRICING_URL, "_blank", "noopener,noreferrer")}
        >
          {copy.finalPricing}
        </Button>
        <Button
          variant="outline-light"
          size="lg"
          onClick={() => cta(REPORT_APP_URL, "start_free_from_comparison_bottom", { page: "/report-vs-core" })}
        >
          {copy.finalStartFree}
        </Button>
        <Button
          variant="outline-light"
          size="lg"
          onClick={() => cta("/demo", "book_demo_from_comparison", { page: "/report-vs-core" })}
        >
          {copy.finalBookDemo}
        </Button>
      </PageCTA>
    </div>
  );
}
