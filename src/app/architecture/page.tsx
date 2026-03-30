"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from 'framer-motion';
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

type ArchitectureLayer = {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: SundaeIconName;
  textColor?: string;
};

type ArchitectureStep = {
  step: string;
  title: string;
  description: string;
  icon: SundaeIconName;
};

type ArchitectureAgent = {
  name: string;
  description: string;
  icon: SundaeIconName;
};

type ArchitectureModule = {
  name: string;
  description: string;
  icon: SundaeIconName;
  features: string[];
  colorClass: string;
};

type ArchitectureSecurityBullet = {
  title: string;
  description: string;
  icon: SundaeIconName;
};

type ArchitectureCert = {
  label: string;
  state: string;
  stateClass: string;
};

type ArchitectureEngineeringCard = {
  title: string;
  icon: SundaeIconName;
  color: string;
  features: string[];
};

type ArchitectureCopy = {
  badge: string;
  title: string;
  description: string;
  stackTitle: string;
  stackDescription: string;
  foundation: string;
  flowTitle: string;
  flowDescription: string;
  agentsTitle: string;
  agentsDescription: string;
  modulesTitle: string;
  modulesDescription: string;
  securityTitle: string;
  securityDescription: string;
  engineeringTitle: string;
  engineeringDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
  layers: ArchitectureLayer[];
  steps: ArchitectureStep[];
  agents: ArchitectureAgent[];
  modules: ArchitectureModule[];
  securityBullets: ArchitectureSecurityBullet[];
  certs: ArchitectureCert[];
  engineeringCards: ArchitectureEngineeringCard[];
};

const localizedArchitectureCopy: Record<"en" | "ar" | "fr" | "es", ArchitectureCopy> = {
  en: {
    badge: "Platform Architecture",
    title: "Five-Layer Architecture Stack",
    description: "See how Sundae moves from raw restaurant data to working intelligence across five architectural layers.",
    stackTitle: "The Sundae Intelligence Stack",
    stackDescription: "Five architecture layers that power six intelligence products",
    foundation: "Built on a solid foundation of security, governance, and reliability",
    flowTitle: "From Data to Decisions",
    flowDescription: "How raw data becomes actionable intelligence in milliseconds",
    agentsTitle: "Multi-Agent AI Engine",
    agentsDescription: "Specialized AI agents working together on detection, forecasting, and context.",
    modulesTitle: "Architecture Modules",
    modulesDescription: "Five core modules that power the Sundae Intelligence Stack",
    securityTitle: "Enterprise Security & Compliance",
    securityDescription: "Security and compliance controls built for sensitive restaurant operating data.",
    engineeringTitle: "Built with Premium Engineering",
    engineeringDescription: "A production stack built for reliability, speed, and operational scale.",
    ctaTitle: "See the Architecture in Action",
    ctaDescription: "Book a technical walkthrough with our team.",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Explore Products",
    layers: [
      { title: "Decision Intelligence", subtitle: "Top Layer", description: "Benchmarks, insights, forecasting, automated decisions", color: "bg-gradient-to-r from-pink-500 to-rose-500", icon: "intelligence" },
      { title: "AI Processing", subtitle: "Intelligence Layer", description: "Multi-agent AI, pattern detection, anomaly detection, reasoning", color: "bg-gradient-to-r from-slate-50 to-blue-50", textColor: "text-[var(--text-primary)]", icon: "speed" },
      { title: "Data Processing", subtitle: "Transformation Layer", description: "Cleaning, transformation, metrics logic, enrichment", color: "bg-gradient-to-r from-yellow-400 to-amber-400", icon: "data" },
      { title: "Data Integration", subtitle: "Unification Layer", description: "POS, labor, inventory, reservations, delivery aggregators, raw data unification", color: "bg-gradient-to-r from-orange-500 to-amber-600", icon: "integration" },
      { title: "Foundation / Infrastructure", subtitle: "Base Layer", description: "Secure pipelines, API ingestion, normalization, governance", color: "bg-gradient-to-r from-amber-700 to-orange-800", icon: "network" },
    ],
    steps: [
      { step: "1", title: "Data Collection", description: "Scout connects to 30+ restaurant systems across 12 data domains and external sources", icon: "integration" },
      { step: "2", title: "AI Processing", description: "Multi-agent AI analyzes patterns and generates insights", icon: "intelligence" },
      { step: "3", title: "Intelligence Delivery", description: "Actionable recommendations delivered through language and visualizations", icon: "insights" },
    ],
    agents: [
      { name: "Pattern Agents", description: "Identify recurring operational patterns, seasonal trends, and hidden correlations across locations", icon: "visibility" },
      { name: "Forecasting Agents", description: "Predict sales, labor needs, inventory requirements, and operational demand using ML models", icon: "forecasting" },
      { name: "Context Agents", description: "Understand operational context, location specifics, and business rules to provide relevant insights", icon: "intelligence" },
    ],
    modules: [
      { name: "Scout", description: "Universal data integration layer connecting 30+ restaurant systems across 12 data domains", icon: "scout", features: ["POS Integration", "Labor Systems", "Inventory", "Real-time Sync"], colorClass: "component-icon--scout" },
      { name: "Pulse", description: "AI-powered anomaly detection and real-time alert system", icon: "pulse", features: ["Anomaly Detection", "Real-time Alerts", "Pattern Analysis", "Threshold Monitoring"], colorClass: "component-icon--pulse" },
      { name: "Forge", description: "Conversational AI engine for natural language intelligence", icon: "forge", features: ["Natural Language", "Context Understanding", "Query Engine", "AI Responses"], colorClass: "component-icon--forge" },
      { name: "Canvas", description: "Dynamic visualization and dashboard intelligence layer", icon: "canvas", features: ["Real-time Dashboards", "Custom Views", "Visual Analytics", "Interactive Reports"], colorClass: "component-icon--canvas" },
      { name: "Watchtower", description: "Market intelligence and competitive benchmarking engine", icon: "watchtower", features: ["Market Insights", "Competitor Data", "Trend Analysis", "Geographic Intelligence"], colorClass: "bg-gradient-to-br from-red-400 to-red-600" },
    ],
    securityBullets: [
      { title: "End-to-End Encryption", description: "AES-256 encryption for data in transit and at rest", icon: "alerts" },
      { title: "Access Control", description: "Role-based access with multi-factor authentication", icon: "integration" },
      { title: "Compliance Standards", description: "SOC 2 Type II, GDPR, and CCPA compliant", icon: "success" },
    ],
    certs: [
      { label: "SOC 2 Type II", state: "✓ Certified", stateClass: "text-green-600" },
      { label: "GDPR", state: "✓ Compliant", stateClass: "text-[#60A5FA]" },
      { label: "CCPA", state: "✓ Compliant", stateClass: "text-purple-600" },
      { label: "ISO 27001", state: "In Progress", stateClass: "text-amber-600" },
    ],
    engineeringCards: [
      { title: "Multi-Agent AI", icon: "intelligence", color: "from-purple-500 to-purple-600", features: ["Multi-agent AI engine", "Continuous learning models", "Predictive analytics", "Natural language processing"] },
      { title: "Real-Time Processing", icon: "speed", color: "from-blue-500 to-blue-600", features: ["Real-time data processing", "Sub-second response times", "Active monitoring and resilient infrastructure", "Auto-scaling infrastructure"] },
      { title: "Integration Engine", icon: "integration", color: "from-green-500 to-green-600", features: ["12-domain data connectors", "RESTful API architecture", "Webhook support", "Custom integration tools"] },
      { title: "Intelligence Core", icon: "insights", color: "from-orange-500 to-orange-600", features: ["Advanced algorithms", "Machine learning models", "Pattern recognition", "Anomaly detection"] },
      { title: "Delivery Layer", icon: "canvas", color: "from-cyan-500 to-cyan-600", features: ["Interactive dashboards", "Natural language queries", "Mobile-responsive design", "Real-time alerts"] },
      { title: "Security & Governance", icon: "quality", color: "from-red-500 to-red-600", features: ["SOC 2 Type II compliant", "End-to-end encryption", "Role-based access control", "Regular security audits"] },
    ],
  },
  ar: {
    badge: "معمارية المنصة",
    title: "حزمة معمارية من خمس طبقات",
    description: "من استقبال البيانات الخام إلى توصيات أوضح للفريق، توضّح هذه المعمارية كيف تنظّم Sundae البيانات المتفرقة وتحولها إلى نظام قرار عملي.",
    stackTitle: "حزمة Sundae Intelligence",
    stackDescription: "خمس طبقات مترابطة تشغّل منتجات Sundae الأساسية",
    foundation: "مبني على أساس واضح من الأمن والحوكمة والاعتمادية",
    flowTitle: "من البيانات إلى القرارات",
    flowDescription: "كيف تنتقل البيانات من الاستقبال إلى رؤية قابلة للاستخدام داخل المنتج",
    agentsTitle: "محرك ذكاء اصطناعي متعدد الوكلاء",
    agentsDescription: "وكلاء متخصصون يتقاسمون التحليل حتى تصل الرؤية بصورة أوضح وأسرع",
    modulesTitle: "وحدات المعمارية",
    modulesDescription: "خمس طبقات أساسية تنظّم كيف تتحرك البيانات والتحليلات عبر المنصة",
    securityTitle: "أمن وامتثال على مستوى المؤسسات",
    securityDescription: "معايير أمن وامتثال بمستوى البنوك تحمي بيانات مطعمك",
    engineeringTitle: "مبني بهندسة عملية",
    engineeringDescription: "بنية موثوقة مصممة للتشغيل المستمر، والسرعة، والتوسع الآمن",
    ctaTitle: "شاهد المعمارية أثناء العمل",
    ctaDescription: "احجز جولة تقنية مع فريقنا.",
    ctaPrimary: "احجز عرضًا",
    ctaSecondary: "استعرض المنتجات",
    layers: [
      { title: "ذكاء القرار", subtitle: "الطبقة العليا", description: "مقارنات، رؤى، توقعات، وقرارات آلية", color: "bg-gradient-to-r from-pink-500 to-rose-500", icon: "intelligence" },
      { title: "معالجة الذكاء الاصطناعي", subtitle: "طبقة الذكاء", description: "ذكاء متعدد الوكلاء، واكتشاف الأنماط، واكتشاف الشذوذ، والاستدلال", color: "bg-gradient-to-r from-slate-50 to-blue-50", textColor: "text-[var(--text-primary)]", icon: "speed" },
      { title: "معالجة البيانات", subtitle: "طبقة التحويل", description: "تنظيف، تحويل، منطق المقاييس، وإثراء البيانات", color: "bg-gradient-to-r from-yellow-400 to-amber-400", icon: "data" },
      { title: "تكامل البيانات", subtitle: "طبقة التوحيد", description: "POS والعمالة والمخزون والحجوزات والتوصيل وتوحيد البيانات الخام", color: "bg-gradient-to-r from-orange-500 to-amber-600", icon: "integration" },
      { title: "الأساس / البنية التحتية", subtitle: "طبقة الأساس", description: "مسارات آمنة، واستقبال عبر API، وتوحيد، وحوكمة", color: "bg-gradient-to-r from-amber-700 to-orange-800", icon: "network" },
    ],
    steps: [
      { step: "1", title: "جمع البيانات", description: "يرتبط Scout بأكثر من 30 نظامًا للمطاعم عبر 12 مجال بيانات ومصادر خارجية", icon: "integration" },
      { step: "2", title: "معالجة الذكاء", description: "يحلل الذكاء متعدد الوكلاء الأنماط ويولّد الرؤى", icon: "intelligence" },
      { step: "3", title: "توصيل الذكاء", description: "توصيات قابلة للتنفيذ تُقدَّم عبر اللغة والمرئيات", icon: "insights" },
    ],
    agents: [
      { name: "وكلاء الأنماط", description: "يحددون الأنماط التشغيلية المتكررة والاتجاهات الموسمية والارتباطات الخفية عبر المواقع", icon: "visibility" },
      { name: "وكلاء التوقع", description: "يتنبؤون بالمبيعات والعمالة والمخزون والطلب التشغيلي باستخدام نماذج ML", icon: "forecasting" },
      { name: "وكلاء السياق", description: "يفهمون السياق التشغيلي وتفاصيل الموقع وقواعد العمل لتقديم رؤى مناسبة", icon: "intelligence" },
    ],
    modules: [
      { name: "Scout", description: "طبقة تكامل بيانات موحدة تربط أكثر من 30 نظامًا عبر 12 مجالًا", icon: "scout", features: ["تكامل POS", "أنظمة العمالة", "المخزون", "مزامنة فورية"], colorClass: "component-icon--scout" },
      { name: "Pulse", description: "اكتشاف شذوذ مدعوم بالذكاء الاصطناعي ونظام تنبيهات لحظي", icon: "pulse", features: ["اكتشاف الشذوذ", "تنبيهات لحظية", "تحليل الأنماط", "مراقبة الحدود"], colorClass: "component-icon--pulse" },
      { name: "Forge", description: "محرك ذكاء محادثي باللغة الطبيعية", icon: "forge", features: ["لغة طبيعية", "فهم السياق", "محرك استعلام", "استجابات ذكية"], colorClass: "component-icon--forge" },
      { name: "Canvas", description: "طبقة تصوّر ديناميكية ولوحات ذكاء", icon: "canvas", features: ["لوحات لحظية", "عروض مخصصة", "تحليلات مرئية", "تقارير تفاعلية"], colorClass: "component-icon--canvas" },
      { name: "Watchtower", description: "محرك ذكاء سوقي ومقارنة تنافسية", icon: "watchtower", features: ["رؤى السوق", "بيانات المنافسين", "تحليل الاتجاهات", "ذكاء جغرافي"], colorClass: "bg-gradient-to-br from-red-400 to-red-600" },
    ],
    securityBullets: [
      { title: "تشفير شامل", description: "تشفير AES-256 للبيانات أثناء النقل والتخزين", icon: "alerts" },
      { title: "التحكم بالوصول", description: "وصول قائم على الأدوار مع مصادقة متعددة العوامل", icon: "integration" },
      { title: "معايير الامتثال", description: "متوافق مع SOC 2 Type II وGDPR وCCPA", icon: "success" },
    ],
    certs: [
      { label: "SOC 2 Type II", state: "✓ معتمد", stateClass: "text-green-600" },
      { label: "GDPR", state: "✓ متوافق", stateClass: "text-[#60A5FA]" },
      { label: "CCPA", state: "✓ متوافق", stateClass: "text-purple-600" },
      { label: "ISO 27001", state: "قيد التنفيذ", stateClass: "text-amber-600" },
    ],
    engineeringCards: [
      { title: "ذكاء متعدد الوكلاء", icon: "intelligence", color: "from-purple-500 to-purple-600", features: ["محرك ذكاء متعدد الوكلاء", "نماذج تتعلم باستمرار", "تحليلات تنبؤية", "معالجة لغة طبيعية"] },
      { title: "معالجة فورية", icon: "speed", color: "from-blue-500 to-blue-600", features: ["معالجة بيانات لحظية", "استجابة في أقل من ثانية", "مراقبة نشطة وبنية مرنة", "بنية قابلة للتوسع تلقائيًا"] },
      { title: "محرك التكامل", icon: "integration", color: "from-green-500 to-green-600", features: ["موصلات بيانات عبر 12 مجالًا", "معمارية RESTful", "دعم Webhook", "أدوات تكامل مخصصة"] },
      { title: "نواة الذكاء", icon: "insights", color: "from-orange-500 to-orange-600", features: ["خوارزميات متقدمة", "نماذج تعلم آلي", "التعرف على الأنماط", "اكتشاف الشذوذ"] },
      { title: "طبقة الإخراج", icon: "canvas", color: "from-cyan-500 to-cyan-600", features: ["لوحات تفاعلية", "استعلامات باللغة الطبيعية", "تصميم متجاوب للجوال", "تنبيهات فورية"] },
      { title: "الأمن والحوكمة", icon: "quality", color: "from-red-500 to-red-600", features: ["متوافق مع SOC 2 Type II", "تشفير شامل", "التحكم بالوصول حسب الدور", "مراجعات أمنية منتظمة"] },
    ],
  },
  fr: {
    badge: "Architecture plateforme",
    title: "Pile d'architecture en cinq couches",
    description: "De l'ingestion brute a des recommandations utiles pour l equipe, cette architecture montre comment Sundae organise des donnees eparses en un systeme de decision exploitable.",
    stackTitle: "La pile d'intelligence Sundae",
    stackDescription: "Cinq couches reliees entre elles pour faire tourner les produits essentiels de Sundae",
    foundation: "Construite sur une base claire de securite, de gouvernance et de fiabilite",
    flowTitle: "Des données aux décisions",
    flowDescription: "Comment les donnees passent de l ingestion a une lecture exploitable dans le produit",
    agentsTitle: "Moteur IA multi-agents",
    agentsDescription: "Des agents specialises se repartissent l analyse pour produire une lecture plus utile et plus rapide",
    modulesTitle: "Modules d'architecture",
    modulesDescription: "Cinq couches principales qui structurent la circulation des donnees et des analyses dans la plateforme",
    securityTitle: "Sécurité et conformité d'entreprise",
    securityDescription: "Des standards de sécurité et de conformité de niveau bancaire protègent vos données",
    engineeringTitle: "Concu avec une ingenierie solide",
    engineeringDescription: "Une base technique pensee pour la continuite de service, la vitesse et une croissance fiable",
    ctaTitle: "Voir l'architecture en action",
    ctaDescription: "Réservez une présentation technique avec notre équipe.",
    ctaPrimary: "Reserver une demo",
    ctaSecondary: "Explorer les produits",
    layers: [
      { title: "Intelligence décisionnelle", subtitle: "Couche supérieure", description: "Benchmarks, insights, prévisions, décisions automatisées", color: "bg-gradient-to-r from-pink-500 to-rose-500", icon: "intelligence" },
      { title: "Traitement IA", subtitle: "Couche intelligence", description: "IA multi-agents, détection de motifs, anomalies, raisonnement", color: "bg-gradient-to-r from-slate-50 to-blue-50", textColor: "text-[var(--text-primary)]", icon: "speed" },
      { title: "Traitement des données", subtitle: "Couche transformation", description: "Nettoyage, transformation, logique métrique, enrichissement", color: "bg-gradient-to-r from-yellow-400 to-amber-400", icon: "data" },
      { title: "Intégration des données", subtitle: "Couche unification", description: "POS, main-d'oeuvre, stock, réservations, livraison, unification brute", color: "bg-gradient-to-r from-orange-500 to-amber-600", icon: "integration" },
      { title: "Fondation / infrastructure", subtitle: "Couche de base", description: "Pipelines sécurisés, ingestion API, normalisation, gouvernance", color: "bg-gradient-to-r from-amber-700 to-orange-800", icon: "network" },
    ],
    steps: [
      { step: "1", title: "Collecte des données", description: "Scout se connecte à plus de 30 systèmes sur 12 domaines et sources externes", icon: "integration" },
      { step: "2", title: "Traitement IA", description: "Des agents IA analysent les patterns et génèrent des insights", icon: "intelligence" },
      { step: "3", title: "Diffusion de l'intelligence", description: "Des recommandations actionnables diffusées via langage et visualisations", icon: "insights" },
    ],
    agents: [
      { name: "Agents de motifs", description: "Identifient les patterns récurrents, tendances saisonnières et corrélations cachées", icon: "visibility" },
      { name: "Agents de prévision", description: "Prédissent ventes, besoins en main-d'oeuvre, inventaire et demande opérationnelle", icon: "forecasting" },
      { name: "Agents de contexte", description: "Comprennent le contexte opérationnel, les spécificités de site et les règles métier", icon: "intelligence" },
    ],
    modules: [
      { name: "Scout", description: "Couche d'intégration universelle reliant 30+ systèmes sur 12 domaines", icon: "scout", features: ["Intégration POS", "Systèmes de main-d'oeuvre", "Stock", "Synchronisation temps réel"], colorClass: "component-icon--scout" },
      { name: "Pulse", description: "Détection d'anomalies assistée par IA et alertes en temps réel", icon: "pulse", features: ["Détection d'anomalies", "Alertes temps réel", "Analyse de motifs", "Surveillance des seuils"], colorClass: "component-icon--pulse" },
      { name: "Forge", description: "Moteur d'IA conversationnelle en langage naturel", icon: "forge", features: ["Langage naturel", "Compréhension du contexte", "Moteur de requête", "Réponses IA"], colorClass: "component-icon--forge" },
      { name: "Canvas", description: "Couche de visualisation dynamique et d'intelligence de dashboard", icon: "canvas", features: ["Dashboards temps réel", "Vues personnalisées", "Analytique visuelle", "Rapports interactifs"], colorClass: "component-icon--canvas" },
      { name: "Watchtower", description: "Moteur de veille marché et benchmarking concurrentiel", icon: "watchtower", features: ["Insights marché", "Données concurrents", "Analyse de tendances", "Intelligence géographique"], colorClass: "bg-gradient-to-br from-red-400 to-red-600" },
    ],
    securityBullets: [
      { title: "Chiffrement de bout en bout", description: "AES-256 pour les données en transit et au repos", icon: "alerts" },
      { title: "Contrôle d'accès", description: "Accès basé sur les rôles avec authentification multi-facteur", icon: "integration" },
      { title: "Standards de conformité", description: "Conforme SOC 2 Type II, GDPR et CCPA", icon: "success" },
    ],
    certs: [
      { label: "SOC 2 Type II", state: "✓ Certifié", stateClass: "text-green-600" },
      { label: "GDPR", state: "✓ Conforme", stateClass: "text-[#60A5FA]" },
      { label: "CCPA", state: "✓ Conforme", stateClass: "text-purple-600" },
      { label: "ISO 27001", state: "En cours", stateClass: "text-amber-600" },
    ],
    engineeringCards: [
      { title: "IA multi-agents", icon: "intelligence", color: "from-purple-500 to-purple-600", features: ["Moteur IA multi-agents", "Modèles à apprentissage continu", "Analytique prédictive", "Traitement du langage naturel"] },
      { title: "Traitement temps réel", icon: "speed", color: "from-blue-500 to-blue-600", features: ["Traitement temps réel", "Réponses sub-seconde", "Monitoring actif et infrastructure résiliente", "Auto-scaling"] },
      { title: "Moteur d'intégration", icon: "integration", color: "from-green-500 to-green-600", features: ["Connecteurs 12 domaines", "Architecture API REST", "Support webhook", "Outils d'intégration personnalisés"] },
      { title: "Core intelligence", icon: "insights", color: "from-orange-500 to-orange-600", features: ["Algorithmes avancés", "Modèles ML", "Reconnaissance de motifs", "Détection d'anomalies"] },
      { title: "Couche de diffusion", icon: "canvas", color: "from-cyan-500 to-cyan-600", features: ["Dashboards interactifs", "Requêtes en langage naturel", "Design responsive", "Alertes temps réel"] },
      { title: "Sécurité et gouvernance", icon: "quality", color: "from-red-500 to-red-600", features: ["Conforme SOC 2 Type II", "Chiffrement de bout en bout", "Contrôle d'accès par rôle", "Audits de sécurité réguliers"] },
    ],
  },
  es: {
    badge: "Arquitectura de plataforma",
    title: "Pila de arquitectura de cinco capas",
    description: "Desde la ingesta de datos en bruto hasta recomendaciones utiles para el equipo, esta arquitectura muestra como Sundae ordena datos dispersos y los convierte en un sistema de decision util.",
    stackTitle: "La pila de inteligencia de Sundae",
    stackDescription: "Cinco capas conectadas entre si para sostener los productos principales de Sundae",
    foundation: "Construida sobre una base clara de seguridad, gobernanza y fiabilidad",
    flowTitle: "De datos a decisiones",
    flowDescription: "Como pasan los datos desde la ingesta hasta una lectura util dentro del producto",
    agentsTitle: "Motor de IA multiagente",
    agentsDescription: "Agentes especializados se reparten el analisis para entregar una lectura mas util y mas rapida",
    modulesTitle: "Módulos de arquitectura",
    modulesDescription: "Cinco capas principales que ordenan como circulan los datos y el analisis por la plataforma",
    securityTitle: "Seguridad y cumplimiento empresarial",
    securityDescription: "Estándares de seguridad y cumplimiento de nivel bancario protegen tus datos",
    engineeringTitle: "Construido con ingenieria solida",
    engineeringDescription: "Una base tecnica pensada para continuidad operativa, velocidad y crecimiento fiable",
    ctaTitle: "Ver la arquitectura en acción",
    ctaDescription: "Reserva una visita técnica con nuestro equipo.",
    ctaPrimary: "Reservar una demo",
    ctaSecondary: "Explorar productos",
    layers: [
      { title: "Inteligencia de decisiones", subtitle: "Capa superior", description: "Benchmarks, insights, forecasting, decisiones automatizadas", color: "bg-gradient-to-r from-pink-500 to-rose-500", icon: "intelligence" },
      { title: "Procesamiento de IA", subtitle: "Capa de inteligencia", description: "IA multiagente, detección de patrones, anomalías y razonamiento", color: "bg-gradient-to-r from-slate-50 to-blue-50", textColor: "text-[var(--text-primary)]", icon: "speed" },
      { title: "Procesamiento de datos", subtitle: "Capa de transformación", description: "Limpieza, transformación, lógica de métricas, enriquecimiento", color: "bg-gradient-to-r from-yellow-400 to-amber-400", icon: "data" },
      { title: "Integración de datos", subtitle: "Capa de unificación", description: "POS, personal, inventario, reservas, delivery y unificación de datos", color: "bg-gradient-to-r from-orange-500 to-amber-600", icon: "integration" },
      { title: "Base / infraestructura", subtitle: "Capa base", description: "Pipelines seguros, ingesta API, normalización, gobernanza", color: "bg-gradient-to-r from-amber-700 to-orange-800", icon: "network" },
    ],
    steps: [
      { step: "1", title: "Recopilación de datos", description: "Scout se conecta a más de 30 sistemas en 12 dominios y fuentes externas", icon: "integration" },
      { step: "2", title: "Procesamiento de IA", description: "La IA multiagente analiza patrones y genera insights", icon: "intelligence" },
      { step: "3", title: "Entrega de inteligencia", description: "Recomendaciones accionables entregadas mediante lenguaje y visualizaciones", icon: "insights" },
    ],
    agents: [
      { name: "Agentes de patrones", description: "Identifican patrones recurrentes, tendencias estacionales y correlaciones ocultas", icon: "visibility" },
      { name: "Agentes de pronóstico", description: "Predicen ventas, necesidades de personal, inventario y demanda operativa", icon: "forecasting" },
      { name: "Agentes de contexto", description: "Entienden contexto operativo, detalles de ubicación y reglas de negocio", icon: "intelligence" },
    ],
    modules: [
      { name: "Scout", description: "Capa de integración universal que conecta más de 30 sistemas en 12 dominios", icon: "scout", features: ["Integración POS", "Sistemas de personal", "Inventario", "Sincronización en tiempo real"], colorClass: "component-icon--scout" },
      { name: "Pulse", description: "Detección de anomalías con IA y alertas en tiempo real", icon: "pulse", features: ["Detección de anomalías", "Alertas en tiempo real", "Análisis de patrones", "Monitoreo de umbrales"], colorClass: "component-icon--pulse" },
      { name: "Forge", description: "Motor conversacional de IA para inteligencia en lenguaje natural", icon: "forge", features: ["Lenguaje natural", "Comprensión de contexto", "Motor de consultas", "Respuestas de IA"], colorClass: "component-icon--forge" },
      { name: "Canvas", description: "Capa dinámica de visualización e inteligencia de paneles", icon: "canvas", features: ["Paneles en tiempo real", "Vistas personalizadas", "Analítica visual", "Informes interactivos"], colorClass: "component-icon--canvas" },
      { name: "Watchtower", description: "Motor de inteligencia de mercado y benchmarking competitivo", icon: "watchtower", features: ["Insights de mercado", "Datos de competidores", "Análisis de tendencias", "Inteligencia geográfica"], colorClass: "bg-gradient-to-br from-red-400 to-red-600" },
    ],
    securityBullets: [
      { title: "Cifrado de extremo a extremo", description: "AES-256 para datos en tránsito y en reposo", icon: "alerts" },
      { title: "Control de acceso", description: "Acceso basado en roles con autenticación multifactor", icon: "integration" },
      { title: "Estándares de cumplimiento", description: "Compatible con SOC 2 Type II, GDPR y CCPA", icon: "success" },
    ],
    certs: [
      { label: "SOC 2 Type II", state: "✓ Certificado", stateClass: "text-green-600" },
      { label: "GDPR", state: "✓ Conforme", stateClass: "text-[#60A5FA]" },
      { label: "CCPA", state: "✓ Conforme", stateClass: "text-purple-600" },
      { label: "ISO 27001", state: "En progreso", stateClass: "text-amber-600" },
    ],
    engineeringCards: [
      { title: "IA multiagente", icon: "intelligence", color: "from-purple-500 to-purple-600", features: ["Motor IA multiagente", "Modelos de aprendizaje continuo", "Analítica predictiva", "Procesamiento de lenguaje natural"] },
      { title: "Procesamiento en tiempo real", icon: "speed", color: "from-blue-500 to-blue-600", features: ["Procesamiento en tiempo real", "Respuesta en menos de un segundo", "Monitorización activa e infraestructura resiliente", "Autoescalado"] },
      { title: "Motor de integración", icon: "integration", color: "from-green-500 to-green-600", features: ["Conectores de 12 dominios", "Arquitectura API REST", "Soporte de webhooks", "Herramientas de integración personalizadas"] },
      { title: "Núcleo de inteligencia", icon: "insights", color: "from-orange-500 to-orange-600", features: ["Algoritmos avanzados", "Modelos ML", "Reconocimiento de patrones", "Detección de anomalías"] },
      { title: "Capa de entrega", icon: "canvas", color: "from-cyan-500 to-cyan-600", features: ["Paneles interactivos", "Consultas en lenguaje natural", "Diseño responsive", "Alertas en tiempo real"] },
      { title: "Seguridad y gobernanza", icon: "quality", color: "from-red-500 to-red-600", features: ["Cumple SOC 2 Type II", "Cifrado de extremo a extremo", "Control de acceso por roles", "Auditorías de seguridad regulares"] },
    ],
  },
} as const;

export default function ArchitecturePage() {
  const { locale } = useWebsiteI18n();
  const ui = localizedArchitectureCopy[locale] ?? localizedArchitectureCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.badge} title={ui.title} description={ui.description} />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[30px] md:text-[36px] font-bold text-[var(--text-primary)] mb-6">{ui.stackTitle}</h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">{ui.stackDescription}</p>
          </FadeUp>

          <div className="relative max-w-5xl mx-auto">
            <StaggerContainer className="space-y-6" staggerDelay={0.12}>
              {ui.layers.map((layer) => (
                <StaggerItem key={layer.title}>
                  <div className={`${layer.color} ${layer.textColor || 'text-[var(--text-primary)]'} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]`}>
                    <div className="flex items-start space-x-6">
                      <div className="w-14 h-14 bg-[var(--navy-deep)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={layer.icon as SundaeIconName} size="xl" className={layer.textColor === 'text-[var(--text-primary)]' ? 'text-[#60A5FA]' : 'text-[var(--text-primary)]'} />
                      </div>
                      <div className="flex-grow">
                        <div className={`text-sm font-semibold mb-2 ${layer.textColor === 'text-[var(--text-primary)]' ? 'text-[var(--text-supporting)]' : 'opacity-90'}`}>{layer.subtitle}</div>
                        <h3 className="text-[20px] md:text-[22px] font-bold mb-3">{layer.title}</h3>
                        <p className={`text-[17px] leading-[1.65] ${layer.textColor === 'text-[var(--text-primary)]' ? 'text-[var(--text-secondary)]' : 'opacity-95'}`}>{layer.description}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeUp delay={0.5} className="text-center mt-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center">
                <SundaeIcon name="network" size="xl" className="text-[var(--text-primary)]" />
              </div>
              <p className="text-[15px] text-[var(--text-supporting)] leading-[1.65]">{ui.foundation}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[30px] md:text-[36px] font-bold text-[var(--text-primary)] mb-6">{ui.flowTitle}</h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">{ui.flowDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {ui.steps.map((step) => (
              <StaggerItem key={step.step} className="text-center">
                <motion.div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center text-[var(--text-primary)] mx-auto mb-6 shadow-lg" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                  <SundaeIcon name={step.icon as SundaeIconName} size="xl" className="text-[var(--text-primary)]" />
                </motion.div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{step.title}</h3>
                <p className="text-[16px] text-[var(--text-supporting)] leading-[1.65]">{step.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[30px] md:text-[36px] font-bold text-[var(--text-primary)] mb-6">{ui.agentsTitle}</h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">{ui.agentsDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ui.agents.map((agent) => (
              <StaggerItem key={agent.name}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                      <SundaeIcon name={agent.icon as SundaeIconName} size="xl" className="text-[var(--text-primary)]" />
                    </div>
                    <CardTitle className="text-center text-xl text-[var(--text-primary)] mb-4">{agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[16px] text-[var(--text-supporting)] text-center leading-[1.65]">{agent.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[30px] md:text-[36px] font-bold text-[var(--text-primary)] mb-6">{ui.modulesTitle}</h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">{ui.modulesDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ui.modules.map((module) => (
              <StaggerItem key={module.name}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${module.colorClass} rounded-lg flex items-center justify-center`}>
                        <SundaeIcon name={module.icon as SundaeIconName} size="lg" className="text-[var(--text-primary)]" />
                      </div>
                      <CardTitle className="text-2xl text-[var(--text-primary)]">{module.name}</CardTitle>
                    </div>
                    <CardDescription className="text-[16px] text-[var(--text-supporting)] leading-[1.65]">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                          <span className="text-[15px] text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">{ui.securityTitle}</h2>
              <p className="text-[16px] text-[var(--text-secondary)] mb-8 leading-[1.65]">{ui.securityDescription}</p>
              <div className="space-y-6">
                {ui.securityBullets.map((item) => (
                  <div key={item.title} className="flex items-start space-x-4">
                    <div className="w-10 h-10 mt-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name={item.icon as SundaeIconName} size="md" className="text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                      <p className="text-[16px] text-[var(--text-supporting)] leading-[1.65]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-8 shadow-xl border-2 border-[var(--border-default)]">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <SundaeIcon name="success" size="xl" className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">{locale === "ar" ? "الشهادات" : locale === "fr" ? "Certifications" : locale === "es" ? "Certificaciones" : "Certifications"}</h3>
                </div>
                <div className="space-y-4">
                  {ui.certs.map((cert) => (
                    <div key={cert.label} className="flex items-center justify-between p-4 bg-[var(--navy-deep)] rounded-xl border border-[var(--border-default)]">
                      <span className="font-semibold text-[var(--text-primary)]">{cert.label}</span>
                      <span className={`text-sm font-medium ${cert.stateClass}`}>{cert.state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">{ui.engineeringTitle}</h2>
            <p className="text-[16px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">{ui.engineeringDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ui.engineeringCards.map((item) => (
              <StaggerItem key={item.title}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                        <SundaeIcon name={item.icon as SundaeIconName} size="lg" className="text-[var(--text-primary)]" />
                      </div>
                      <CardTitle className="text-xl text-[var(--text-primary)]">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2" />
                          <span className="text-[15px] text-[var(--text-supporting)] leading-[1.65]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Button variant="cta" size="lg" href="/demo">{ui.ctaPrimary}</Button>
        <Button variant="outline-light" size="lg" href="/product">{ui.ctaSecondary}</Button>
      </PageCTA>
    </div>
  );
}
