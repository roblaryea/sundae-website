'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";

type LocalizedModuleCopy = {
  badge: string;
  title: string;
  description: string;
  mixAndMatch: string;
  exploreAllModules: string;
  calculateModuleRoi: string;
  whatAreModules: string;
  whatAreModulesDescription: string;
  pillars: Array<{ title: string; description: string }>;
  fiveModules: string;
  chooseStack: string;
  chooseStackDescription: string;
  coreCapabilities: string;
  roi: string;
  bestFor: string;
  faqTitle: string;
  faqDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  bookDemo: string;
  contactSales: string;
  modules: Array<{
    name: string;
    icon: SundaeIconName;
    headline: string;
    description: string;
    capabilities: string[];
    roi: string;
    bestFor: string;
    color: string;
  }>;
  faqs: Array<{ q: string; a: string }>;
  howItWorks: Array<{ step: string; title: string; description: string }>;
  categories: Array<{ name: string; count: string }>;
  crossModuleTitle: string;
  crossModuleDescription: string;
  crossModuleCards: Array<{ title: string; description: string }>;
  selectionTitle: string;
  selectionDescription: string;
  selectionCards: Array<{ pain: string; solution: string; benefit: string }>;
  wantItAll: string;
  fullSuite: string;
  fullSuiteDescription: string;
};

type LocalizedModuleUi = {
  overviewNote: string;
  addModuleLabel: (name: string) => string;
  examplesLabel: string;
  exampleLines: string[];
  refreshLabels: string[];
  stackLabels: string[];
  faqButtonLabel: string;
};

const localizedModulesCopy: Record<string, LocalizedModuleCopy> = {
  en: {
    badge: "Specialized Modules",
    title: "Go Deeper Where It Matters Most",
    description:
      "Add specialized modules to Sundae Core. Get deep operational intelligence in labor, inventory, purchasing, marketing, and reservations.",
    mixAndMatch: "Mix and match based on your priorities.",
    exploreAllModules: "Explore All Modules",
    calculateModuleRoi: "Calculate Module ROI",
    whatAreModules: "What Are Sundae Modules?",
    whatAreModulesDescription:
      "Modules are specialized intelligence add-ons that deepen your insights in specific operational areas.",
    pillars: [
      { title: "Specialized by Function", description: "Each module is built for a specific operating area instead of trying to cover everything at once." },
      { title: "Add What You Need", description: "Start with your biggest pain point. Add modules as priorities shift. No forced bundles." },
      { title: "Integrated With Core", description: "Modules share data with Core, so teams can work from one connected operating picture." },
    ],
    fiveModules: "FIVE SPECIALIZED MODULES",
    chooseStack: "Choose Your Intelligence Stack",
    chooseStackDescription: "Add one module or all five. Build the intelligence your operation needs.",
    coreCapabilities: "Core Capabilities:",
    roi: "ROI",
    bestFor: "Best for:",
    faqTitle: "Frequently Asked Questions",
    faqDescription: "Common questions about Modules, upgrades, pricing, and implementation.",
    ctaTitle: "Ready to Add Specialized Intelligence?",
    ctaDescription: "Start with the module that solves your biggest pain point.",
    bookDemo: "Book a Demo",
    contactSales: "Contact Sales",
    modules: [
      {
        name: "Labor Intelligence",
        icon: "benchmarking",
        headline: "Optimize scheduling, reduce overtime, and forecast demand.",
        description:
          "Use scheduling guidance, overtime visibility, and demand forecasts to run labor with less guesswork.",
        capabilities: ["AI-recommended schedules", "Real-time labor cost tracking", "14-30 day demand forecasting", "Shift performance analysis", "Overtime early warnings"],
        roi: "Typical ROI: 8-12% labor cost reduction",
        bestFor: "High-volume operations with complex scheduling",
        color: "from-blue-500 to-blue-600",
      },
      {
        name: "Inventory Intelligence",
        icon: "insights",
        headline: "Track waste, automate par levels, and optimize costs.",
        description:
          "Track waste, adjust par levels, and tighten recipe costs with a clearer daily view of inventory movement.",
        capabilities: ["Real-time waste tracking", "Automated par level adjustments", "Recipe-level costing", "Vendor performance monitoring", "Inventory turn optimization"],
        roi: "Typical ROI: 5-7% food cost reduction",
        bestFor: "High COGS operations with complex menus",
        color: "from-purple-500 to-purple-600",
      },
      {
        name: "Purchasing Intelligence",
        icon: "marketing",
        headline: "Compare vendors, optimize prices, and manage contracts.",
        description:
          "Transform purchasing from reactive ordering into strategic sourcing with vendor comparison and price optimization.",
        capabilities: ["Multi-vendor price comparison", "Historical price tracking", "Contract term management", "Automated PO generation", "Supply chain visibility"],
        roi: "Typical ROI: 3-5% procurement cost reduction",
        bestFor: "Multi-location groups with purchasing power",
        color: "from-green-500 to-green-600",
      },
      {
        name: "Marketing Intelligence",
        icon: "growth",
        headline: "Track campaign ROI, optimize spend, and understand attribution.",
        description:
          "Turn marketing from a cost center into a measurable growth driver with campaign tracking and multi-channel attribution.",
        capabilities: ["Campaign ROI tracking", "Multi-touch attribution", "Customer acquisition cost analysis", "Promotion effectiveness", "Guest segmentation"],
        roi: "Typical ROI: 15-25% marketing efficiency gain",
        bestFor: "Marketing-driven concepts with multi-channel presence",
        color: "from-orange-500 to-orange-600",
      },
      {
        name: "Reservations Intelligence",
        icon: "operators",
        headline: "Optimize tables, predict no-shows, and forecast demand.",
        description:
          "Transform reservations from a booking system into a revenue optimization tool with predictive analytics.",
        capabilities: ["Table optimization recommendations", "AI-powered no-show prediction", "Demand forecasting (7-30 days)", "Waitlist management optimization", "Dynamic pricing suggestions"],
        roi: "Typical ROI: 10-15% covers increase",
        bestFor: "Reservation-driven restaurants and fine dining",
        color: "from-indigo-500 to-indigo-600",
      },
    ],
    faqs: [
      { q: "Do I need Core tier to use Modules?", a: "Yes. Modules are exclusive to Core tier (Lite, Pro, or Enterprise)." },
      { q: "Can I add modules later?", a: "Yes. Start with Core tier, then add modules as needed." },
      { q: "What if I only need a module at some locations?", a: "Organization license covers your first 5 locations. Contact us for custom pricing." },
      { q: "How long does module implementation take?", a: "Most modules take 1-2 weeks." },
      { q: "Can modules work together?", a: "Yes. Modules share data and provide cross-module insights." },
      { q: "Can I try a module before committing?", a: "Yes. Contact us for module trial programs." },
    ],
    howItWorks: [
      { step: "1", title: "Organization License Model", description: "Each module covers your first 5 locations. Additional locations scale per location." },
      { step: "2", title: "Requires Core Tier", description: "Modules are exclusive to Core tier for real-time specialized intelligence." },
    ],
    categories: [
      { name: "Revenue Intelligence", count: "4 modules" },
      { name: "Labor Intelligence", count: "5 modules" },
      { name: "Guest Experience", count: "3 modules" },
      { name: "Inventory & Waste", count: "3 modules" },
      { name: "Purchasing", count: "3 modules" },
      { name: "Marketing Performance", count: "3 modules" },
      { name: "Delivery & Platforms", count: "2 modules" },
      { name: "Reservations", count: "2 modules" },
      { name: "Revenue Assurance", count: "2 modules" },
      { name: "Profit Intelligence", count: "3 modules" },
      { name: "Guest CRM", count: "3 modules" },
      { name: "Cross-Intelligence", count: "Correlation engine" },
    ],
    crossModuleTitle: "Cross-Module Intelligence",
    crossModuleDescription: "Modules share data and provide integrated insights",
    crossModuleCards: [
      { title: "Labor + Inventory", description: "Correlate prep labor with waste patterns" },
      { title: "Labor + Marketing", description: "Forecast staffing needs for campaigns" },
      { title: "Inventory + Purchasing", description: "Seamless PO generation from inventory" },
    ],
    selectionTitle: "Which Modules Do You Need?",
    selectionDescription: "Start with your biggest pain point",
    selectionCards: [
      { pain: "High Labor Cost?", solution: "Labor Intelligence", benefit: "Reduce overtime, optimize scheduling" },
      { pain: "High Food Cost or Waste?", solution: "Inventory Intelligence", benefit: "Track waste, optimize par levels" },
      { pain: "Complex Vendor Relationships?", solution: "Purchasing Intelligence", benefit: "Compare pricing, manage contracts" },
      { pain: "Heavy Marketing Spend?", solution: "Marketing Intelligence", benefit: "Track ROI, reduce CAC" },
      { pain: "Reservation-Driven Business?", solution: "Reservations Intelligence", benefit: "Reduce no-shows, optimize tables" },
    ],
    wantItAll: "Want It All?",
    fullSuite: "Full Module Suite",
    fullSuiteDescription: "Complete operational intelligence across all areas",
  },
  ar: {
    badge: "وحدات متخصصة",
    title: "تعمق في ما يهمك أكثر",
    description: "أضف وحدات متخصصة إلى Sundae Core للحصول على ذكاء تشغيلي عميق.",
    mixAndMatch: "اختر وامزج حسب أولوياتك.",
    exploreAllModules: "استعرض جميع الوحدات",
    calculateModuleRoi: "احسب عائد الوحدة",
    whatAreModules: "ما هي وحدات Sundae؟",
    whatAreModulesDescription: "الوحدات هي إضافات ذكاء متخصصة تعمّق رؤيتك في مجالات تشغيلية محددة.",
    pillars: [
      { title: "متخصصة وليست مبعثرة", description: "ميزات عميقة مصممة لكل مجال تشغيلي." },
      { title: "أضف ما تحتاجه", description: "ابدأ بأكبر نقطة ألم لديك وأضف الوحدات مع تغيّر الأولويات." },
      { title: "متكاملة وليست معزولة", description: "تتشارك الوحدات البيانات مع Core في منصة موحدة." },
    ],
    fiveModules: "خمس وحدات متخصصة",
    chooseStack: "اختر حزمة الذكاء الخاصة بك",
    chooseStackDescription: "أضف وحدة واحدة أو الخمس كلها. ابنِ الذكاء الذي تحتاجه عمليتك.",
    coreCapabilities: "القدرات الأساسية:",
    roi: "عائد الاستثمار",
    bestFor: "الأفضل لـ:",
    faqTitle: "أسئلة متكررة",
    faqDescription: "أسئلة شائعة حول الوحدات والترقية والتسعير والتنفيذ.",
    ctaTitle: "هل أنت مستعد لإضافة ذكاء متخصص؟",
    ctaDescription: "ابدأ بالوحدة التي تحل أكبر مشكلة لديك.",
    bookDemo: "احجز عرضًا",
    contactSales: "تواصل مع المبيعات",
    modules: [
      { name: "ذكاء العمالة", icon: "benchmarking", headline: "حسّن الجدولة، وقلل العمل الإضافي، وتنبأ بالطلب.", description: "حوّل العمالة من أكبر مصاريفك إلى أكثر أصولك تحسينًا.", capabilities: ["جداول موصى بها بالذكاء الاصطناعي", "تتبع تكلفة العمالة لحظيًا", "تنبؤ 14-30 يومًا", "تحليل أداء الورديات", "تنبيهات مبكرة للعمل الإضافي"], roi: "عائد نموذجي: خفض 8-12% في تكلفة العمالة", bestFor: "العمليات عالية الحجم ذات الجدولة المعقدة", color: "from-blue-500 to-blue-600" },
      { name: "ذكاء المخزون", icon: "insights", headline: "تتبع الهدر، أتمتة المستويات المثلى، وخفض التكاليف.", description: "حوّل إدارة المخزون إلى نظام محسّن مع تتبع لحظي وتوصيات آلية.", capabilities: ["تتبع الهدر لحظيًا", "تعديل تلقائي للمستويات المثلى", "تكلفة على مستوى الوصفة", "مراقبة أداء الموردين", "تحسين دوران المخزون"], roi: "عائد نموذجي: خفض 5-7% في تكلفة الغذاء", bestFor: "عمليات عالية التكلفة وقوائم معقدة", color: "from-purple-500 to-purple-600" },
      { name: "ذكاء المشتريات", icon: "marketing", headline: "قارن الموردين، حسّن الأسعار، وأدر العقود.", description: "حوّل الشراء من طلب تفاعلي إلى توريد استراتيجي.", capabilities: ["مقارنة أسعار متعددة الموردين", "تتبع الأسعار التاريخية", "إدارة شروط العقود", "إنشاء أوامر شراء آليًا", "رؤية سلسلة الإمداد"], roi: "عائد نموذجي: خفض 3-5% في تكاليف الشراء", bestFor: "المجموعات متعددة المواقع ذات قوة الشراء", color: "from-green-500 to-green-600" },
      { name: "أداء التسويق", icon: "growth", headline: "تتبع عائد الحملات، حسّن الإنفاق، وافهم الإسناد.", description: "حوّل التسويق إلى محرك نمو قابل للقياس.", capabilities: ["تتبع عائد الحملات", "إسناد متعدد اللمسات", "تحليل تكلفة الاكتساب", "فعالية العروض الترويجية", "تقسيم الضيوف"], roi: "عائد نموذجي: تحسن 15-25% في كفاءة التسويق", bestFor: "العلامات التي تعتمد على التسويق متعدد القنوات", color: "from-orange-500 to-orange-600" },
      { name: "ذكاء الحجوزات", icon: "operators", headline: "حسّن الطاولات، تنبأ بعدم الحضور، وتنبأ بالطلب.", description: "حوّل الحجوزات إلى أداة لتحسين الإيرادات.", capabilities: ["توصيات تحسين الطاولات", "تنبؤ بعدم الحضور بالذكاء الاصطناعي", "تنبؤ بالطلب 7-30 يومًا", "تحسين إدارة الانتظار", "اقتراحات تسعير ديناميكية"], roi: "عائد نموذجي: زيادة 10-15% في إشغال الطاولات", bestFor: "المطاعم التي تعتمد على الحجوزات والمطاعم الراقية", color: "from-indigo-500 to-indigo-600" },
    ],
    faqs: [
      { q: "هل أحتاج Core لاستخدام الوحدات؟", a: "نعم، الوحدات متاحة فقط في Core." },
      { q: "هل يمكنني إضافة الوحدات لاحقًا؟", a: "نعم، ابدأ بـ Core ثم أضف ما تحتاجه." },
      { q: "ماذا لو احتجت الوحدة في بعض المواقع فقط؟", a: "يغطي الترخيص المؤسسي أول 5 مواقع. تواصل معنا للتسعير المخصص." },
      { q: "كم يستغرق التنفيذ؟", a: "معظم الوحدات تحتاج 1-2 أسبوع." },
      { q: "هل تعمل الوحدات معًا؟", a: "نعم، تتشارك البيانات وتوفر رؤى متقاطعة." },
      { q: "هل يمكنني تجربة الوحدة قبل الالتزام؟", a: "نعم، تواصل معنا لبرامج التجربة." },
    ],
    howItWorks: [
      { step: "1", title: "نموذج الترخيص المؤسسي", description: "يغطي أول 5 مواقع ثم يتوسع لكل موقع إضافي." },
      { step: "2", title: "يتطلب Core", description: "الوحدات حصرية لـ Core لتقديم ذكاء متخصص لحظي." },
    ],
    categories: [
      { name: "ذكاء الإيرادات", count: "4 وحدات" },
      { name: "ذكاء العمالة", count: "5 وحدات" },
      { name: "تجربة الضيف", count: "3 وحدات" },
      { name: "المخزون والهدر", count: "3 وحدات" },
      { name: "المشتريات", count: "3 وحدات" },
      { name: "أداء التسويق", count: "3 وحدات" },
      { name: "التوصيل والمنصات", count: "وحدتان" },
      { name: "الحجوزات", count: "وحدتان" },
      { name: "ضمان الإيرادات", count: "وحدتان" },
      { name: "ذكاء الربحية", count: "3 وحدات" },
      { name: "إدارة بيانات الضيوف", count: "3 وحدات" },
      { name: "الذكاء المتقاطع", count: "محرك ترابط" },
    ],
    crossModuleTitle: "الذكاء عبر الوحدات",
    crossModuleDescription: "تتشارك الوحدات البيانات وتوفر رؤى متكاملة",
    crossModuleCards: [
      { title: "العمالة + المخزون", description: "اربط عمالة التحضير بأنماط الهدر" },
      { title: "العمالة + التسويق", description: "تنبأ باحتياجات التوظيف للحملات" },
      { title: "المخزون + المشتريات", description: "إنشاء أوامر شراء سلسة من المخزون" },
    ],
    selectionTitle: "ما الوحدات التي تحتاجها؟",
    selectionDescription: "ابدأ بأكبر مشكلة لديك",
    selectionCards: [
      { pain: "تكلفة عمالة مرتفعة؟", solution: "ذكاء العمالة", benefit: "قلل العمل الإضافي وحسّن الجدولة" },
      { pain: "تكلفة غذاء أو هدر مرتفع؟", solution: "ذكاء المخزون", benefit: "تتبع الهدر وحسّن المستويات" },
      { pain: "علاقات معقدة مع الموردين؟", solution: "ذكاء المشتريات", benefit: "قارن الأسعار وأدر العقود" },
      { pain: "إنفاق تسويقي مرتفع؟", solution: "أداء التسويق", benefit: "تتبع العائد وخفض CAC" },
      { pain: "عمل يعتمد على الحجوزات؟", solution: "ذكاء الحجوزات", benefit: "قلل عدم الحضور وحسّن الطاولات" },
    ],
    wantItAll: "تريد الكل؟",
    fullSuite: "الحزمة الكاملة للوحدات",
    fullSuiteDescription: "ذكاء تشغيلي كامل عبر كل المجالات",
  },
  fr: {
    badge: "Modules specialises",
    title: "Allez plus loin là où cela compte le plus",
    description: "Ajoutez des modules specialises à Sundae Core pour une intelligence operationnelle plus profonde.",
    mixAndMatch: "Composez selon vos priorites.",
    exploreAllModules: "Explorer tous les modules",
    calculateModuleRoi: "Calculer le ROI du module",
    whatAreModules: "Que sont les modules Sundae ?",
    whatAreModulesDescription: "Les modules sont des extensions d intelligence specialisees qui approfondissent vos analyses dans des domaines précis.",
    pillars: [
      { title: "Specialise, pas dispersé", description: "Des fonctionnalites profondes pensees pour chaque domaine operationnel." },
      { title: "Ajoutez ce dont vous avez besoin", description: "Commencez par votre plus gros point de douleur et ajoutez des modules au fil des priorites." },
      { title: "Integre, pas en silos", description: "Les modules partagent les donnees avec Core dans une plateforme unifiee." },
    ],
    fiveModules: "Cinq modules specialises",
    chooseStack: "Choisissez votre pile d intelligence",
    chooseStackDescription: "Ajoutez un module ou les cinq. Construisez l intelligence dont votre operation a besoin.",
    coreCapabilities: "Capacites principales :",
    roi: "ROI",
    bestFor: "Ideal pour :",
    faqTitle: "Questions frequentes",
    faqDescription: "Questions courantes sur les modules, la mise à niveau, le tarif et le deploiement.",
    ctaTitle: "Pret à ajouter une intelligence specialisee ?",
    ctaDescription: "Commencez par le module qui resout votre plus grand probleme.",
    bookDemo: "Reserver une demo",
    contactSales: "Contacter les ventes",
    modules: [
      { name: "Intelligence de la main-d oeuvre", icon: "benchmarking", headline: "Optimisez la planification et reduisez les heures sup.", description: "Transformez la main-d oeuvre en actif optimise avec planification et previsions IA.", capabilities: ["Plannings recommandes par IA", "Suivi des couts en temps reel", "Previsions 14-30 jours", "Analyse de performance des services", "Alertes heures sup"], roi: "ROI typique : reduction de 8 à 12 % du cout main-d oeuvre", bestFor: "Operations à fort volume avec planification complexe", color: "from-blue-500 to-blue-600" },
      { name: "Intelligence inventaire", icon: "insights", headline: "Suivez le gaspillage, automatisez les niveaux et optimisez les couts.", description: "Transformez la gestion des stocks en systeme optimise.", capabilities: ["Suivi du gaspillage en temps reel", "Ajustements automatiques des niveaux", "Cout par recette", "Suivi des performances fournisseurs", "Optimisation de la rotation"], roi: "ROI typique : reduction de 5 à 7 % du cout nourriture", bestFor: "Operations à cout matiere eleve", color: "from-purple-500 to-purple-600" },
      { name: "Intelligence achats", icon: "marketing", headline: "Comparez les fournisseurs, optimisez les prix et gerez les contrats.", description: "Passez des commandes reactives à l approvisionnement strategique.", capabilities: ["Comparaison multi-fournisseurs", "Suivi historique des prix", "Gestion des contrats", "Generation automatique des commandes", "Visibilite supply chain"], roi: "ROI typique : reduction de 3 à 5 % des couts d achat", bestFor: "Groupes multi-sites avec pouvoir d achat", color: "from-green-500 to-green-600" },
      { name: "Performance marketing", icon: "growth", headline: "Suivez le ROI des campagnes et optimisez les depenses.", description: "Transformez le marketing en moteur de croissance mesurable.", capabilities: ["Suivi du ROI des campagnes", "Attribution multi-touch", "Analyse du CAC", "Efficacite des promotions", "Segmentation clients"], roi: "ROI typique : gain d efficacite de 15 à 25 %", bestFor: "Concepts multi-canaux", color: "from-orange-500 to-orange-600" },
      { name: "Intelligence reservations", icon: "operators", headline: "Optimisez les tables, predisez les no-shows et la demande.", description: "Transformez les reservations en outil d optimisation du revenu.", capabilities: ["Recommandations d optimisation des tables", "Prediction IA des no-shows", "Prevision de la demande (7-30 jours)", "Optimisation de la liste d attente", "Suggestions de tarification"], roi: "ROI typique : hausse de 10 à 15 % du taux d occupation", bestFor: "Restaurants reserves et gastronomiques", color: "from-indigo-500 to-indigo-600" },
    ],
    faqs: [
      { q: "Ai-je besoin de Core pour utiliser les modules ?", a: "Oui, les modules sont reserves à Core." },
      { q: "Puis-je ajouter des modules plus tard ?", a: "Oui, commencez avec Core puis ajoutez selon vos besoins." },
      { q: "Et si je n ai besoin du module que sur certains sites ?", a: "Le contrat couvre les 5 premiers sites. Contactez-nous pour un tarif personnalise." },
      { q: "Combien de temps dure l implementation ?", a: "La plupart des modules prennent 1 à 2 semaines." },
      { q: "Les modules peuvent-ils fonctionner ensemble ?", a: "Oui, ils partagent les donnees et offrent des insights croises." },
      { q: "Puis-je tester un module avant de m engager ?", a: "Oui, contactez-nous pour des programmes d essai." },
    ],
    howItWorks: [
      { step: "1", title: "Modele de licence", description: "Couvre les 5 premiers sites puis evolue par site supplementaire." },
      { step: "2", title: "Necessite Core", description: "Les modules sont reserves à Core pour une intelligence specialisee en temps reel." },
    ],
    categories: [
      { name: "Intelligence du revenu", count: "4 modules" },
      { name: "Intelligence de la main-d oeuvre", count: "5 modules" },
      { name: "Experience client", count: "3 modules" },
      { name: "Stock et pertes", count: "3 modules" },
      { name: "Achats", count: "3 modules" },
      { name: "Performance marketing", count: "3 modules" },
      { name: "Livraison et plateformes", count: "2 modules" },
      { name: "Reservations", count: "2 modules" },
      { name: "Garantie du revenu", count: "2 modules" },
      { name: "Intelligence de profit", count: "3 modules" },
      { name: "CRM clients", count: "3 modules" },
      { name: "Cross-Intelligence", count: "Moteur de correlation" },
    ],
    crossModuleTitle: "Intelligence croisee",
    crossModuleDescription: "Les modules partagent les donnees et fournissent des insights integres",
    crossModuleCards: [
      { title: "Main-d oeuvre + stock", description: "Corrélez la main-d oeuvre de preparation avec les modeles de gaspillage" },
      { title: "Main-d oeuvre + marketing", description: "Prevoyez les besoins de personnel pour les campagnes" },
      { title: "Stock + achats", description: "Generer des commandes directement depuis le stock" },
    ],
    selectionTitle: "De quels modules avez-vous besoin ?",
    selectionDescription: "Commencez par votre plus grand point de douleur",
    selectionCards: [
      { pain: "Cout main-d oeuvre eleve ?", solution: "Intelligence de la main-d oeuvre", benefit: "Reduire les heures sup et optimiser la planification" },
      { pain: "Cout nourriture ou gaspillage eleve ?", solution: "Intelligence inventaire", benefit: "Suivre le gaspillage et optimiser les niveaux" },
      { pain: "Relations fournisseurs complexes ?", solution: "Intelligence achats", benefit: "Comparer les prix et gerer les contrats" },
      { pain: "Depenses marketing elevees ?", solution: "Performance marketing", benefit: "Suivre le ROI et reduire le CAC" },
      { pain: "Activite basee sur les reservations ?", solution: "Intelligence reservations", benefit: "Reduire les no-shows et optimiser les tables" },
    ],
    wantItAll: "Tout prendre ?",
    fullSuite: "Suite complete de modules",
    fullSuiteDescription: "Intelligence operationnelle complete sur tous les domaines",
  },
  es: {
    badge: "Modulos especializados",
    title: "Ve mas profundo donde mas importa",
    description: "Anade modulos especializados a Sundae Core para una inteligencia operativa mas profunda.",
    mixAndMatch: "Combinalos segun tus prioridades.",
    exploreAllModules: "Explorar todos los modulos",
    calculateModuleRoi: "Calcular ROI del modulo",
    whatAreModules: "¿Que son los modulos Sundae?",
    whatAreModulesDescription: "Los modulos son extensiones de inteligencia especializadas que profundizan tus analisis en areas operativas concretas.",
    pillars: [
      { title: "Especializado, no disperso", description: "Funciones profundas creadas para cada area operativa." },
      { title: "Anade lo que necesitas", description: "Empieza por tu mayor problema y anade modulos cuando cambien las prioridades." },
      { title: "Integrado, no aislado", description: "Los modulos comparten datos con Core en una plataforma unificada." },
    ],
    fiveModules: "Cinco modulos especializados",
    chooseStack: "Elige tu pila de inteligencia",
    chooseStackDescription: "Anade un modulo o los cinco. Construye la inteligencia que necesita tu operacion.",
    coreCapabilities: "Capacidades principales:",
    roi: "ROI",
    bestFor: "Ideal para:",
    faqTitle: "Preguntas frecuentes",
    faqDescription: "Preguntas comunes sobre modulos, actualizaciones, precios e implementacion.",
    ctaTitle: "¿Listo para anadir inteligencia especializada?",
    ctaDescription: "Empieza con el modulo que resuelve tu mayor dolor.",
    bookDemo: "Reservar una demo",
    contactSales: "Contactar ventas",
    modules: [
      { name: "Inteligencia laboral", icon: "benchmarking", headline: "Optimiza la planificacion, reduce el overtime y pronostica la demanda.", description: "Convierte la mano de obra en tu activo mejor optimizado con planificacion y pronosticos de IA.", capabilities: ["Horarios recomendados por IA", "Seguimiento de costos laborales en tiempo real", "Pronostico de demanda 14-30 dias", "Analisis de rendimiento de turnos", "Alertas tempranas de overtime"], roi: "ROI tipico: reduccion del 8-12% en costos laborales", bestFor: "Operaciones de alto volumen con planificacion compleja", color: "from-blue-500 to-blue-600" },
      { name: "Inteligencia de inventario", icon: "insights", headline: "Seguimiento de desperdicio, niveles automáticos y costos optimizados.", description: "Convierte la gestion de inventario en un sistema optimizado.", capabilities: ["Seguimiento de desperdicio en tiempo real", "Ajustes automaticos de niveles", "Costo por receta", "Monitoreo de proveedores", "Optimizacion de rotacion"], roi: "ROI tipico: reduccion del 5-7% en costo de alimentos", bestFor: "Operaciones con alto costo de inventario", color: "from-purple-500 to-purple-600" },
      { name: "Inteligencia de compras", icon: "marketing", headline: "Compara proveedores, optimiza precios y gestiona contratos.", description: "Pasa de pedidos reactivos a abastecimiento estrategico.", capabilities: ["Comparacion de precios multi-proveedor", "Seguimiento historico de precios", "Gestion de contratos", "Generacion automatica de pedidos", "Visibilidad de la cadena de suministro"], roi: "ROI tipico: reduccion del 3-5% en compras", bestFor: "Grupos multiubicacion con poder de compra", color: "from-green-500 to-green-600" },
      { name: "Rendimiento de marketing", icon: "growth", headline: "Seguimiento del ROI de campañas y optimizacion del gasto.", description: "Convierte el marketing en un motor de crecimiento medible.", capabilities: ["Seguimiento del ROI de campañas", "Atribucion multi-touch", "Analisis de CAC", "Efectividad de promociones", "Segmentacion de clientes"], roi: "ROI tipico: mejora del 15-25% en eficiencia de marketing", bestFor: "Conceptos con presencia multicanal", color: "from-orange-500 to-orange-600" },
      { name: "Inteligencia de reservas", icon: "operators", headline: "Optimiza mesas, predice no-shows y pronostica la demanda.", description: "Convierte las reservas en una herramienta de optimizacion de ingresos.", capabilities: ["Recomendaciones de optimizacion de mesas", "Prediccion de no-shows con IA", "Pronostico de demanda (7-30 dias)", "Optimizacion de lista de espera", "Sugerencias de precios dinamicos"], roi: "ROI tipico: aumento del 10-15% en ocupacion", bestFor: "Restaurantes con reservas y alta cocina", color: "from-indigo-500 to-indigo-600" },
    ],
    faqs: [
      { q: "¿Necesito Core para usar los modulos?", a: "Si, los modulos estan disponibles solo en Core." },
      { q: "¿Puedo anadir modulos mas tarde?", a: "Si, empieza con Core y anade lo que necesites." },
      { q: "¿Y si solo necesito el modulo en algunos locales?", a: "La licencia cubre los primeros 5 locales. Consulta precios personalizados." },
      { q: "¿Cuanto tarda la implementacion?", a: "La mayoria de los modulos tarda 1-2 semanas." },
      { q: "¿Los modulos pueden trabajar juntos?", a: "Si, comparten datos y ofrecen insights cruzados." },
      { q: "¿Puedo probar un modulo antes de comprometerme?", a: "Si, contactanos para programas de prueba." },
    ],
    howItWorks: [
      { step: "1", title: "Modelo de licencia", description: "Cubre los primeros 5 locales y luego escala por local." },
      { step: "2", title: "Requiere Core", description: "Los modulos son exclusivos de Core para inteligencia especializada en tiempo real." },
    ],
    categories: [
      { name: "Inteligencia de ingresos", count: "4 modulos" },
      { name: "Inteligencia laboral", count: "5 modulos" },
      { name: "Experiencia del cliente", count: "3 modulos" },
      { name: "Inventario y desperdicio", count: "3 modulos" },
      { name: "Compras", count: "3 modulos" },
      { name: "Rendimiento de marketing", count: "3 modulos" },
      { name: "Delivery y plataformas", count: "2 modulos" },
      { name: "Reservas", count: "2 modulos" },
      { name: "Aseguramiento de ingresos", count: "2 modulos" },
      { name: "Inteligencia de beneficio", count: "3 modulos" },
      { name: "CRM de clientes", count: "3 modulos" },
      { name: "Cross-Intelligence", count: "Motor de correlacion" },
    ],
    crossModuleTitle: "Inteligencia cruzada",
    crossModuleDescription: "Los modulos comparten datos y ofrecen insights integrados",
    crossModuleCards: [
      { title: "Labor + inventario", description: "Correlaciona la preparacion laboral con patrones de desperdicio" },
      { title: "Labor + marketing", description: "Pronostica necesidades de personal para campañas" },
      { title: "Inventario + compras", description: "Generacion fluida de pedidos desde inventario" },
    ],
    selectionTitle: "¿Que modulos necesitas?",
    selectionDescription: "Empieza por tu mayor problema",
    selectionCards: [
      { pain: "¿Costo laboral alto?", solution: "Inteligencia laboral", benefit: "Reduce overtime y optimiza horarios" },
      { pain: "¿Costo de comida o desperdicio alto?", solution: "Inteligencia de inventario", benefit: "Seguimiento de desperdicio y niveles" },
      { pain: "¿Relaciones complejas con proveedores?", solution: "Inteligencia de compras", benefit: "Compara precios y gestiona contratos" },
      { pain: "¿Gasto de marketing alto?", solution: "Rendimiento de marketing", benefit: "Seguimiento del ROI y reduccion de CAC" },
      { pain: "¿Negocio basado en reservas?", solution: "Inteligencia de reservas", benefit: "Reduce no-shows y optimiza mesas" },
    ],
    wantItAll: "¿Lo quieres todo?",
    fullSuite: "Suite completa de modulos",
    fullSuiteDescription: "Inteligencia operativa completa en todas las areas",
  },
};

const localizedModulesUi: Record<string, LocalizedModuleUi> = {
  en: {
    overviewNote: 'Organization license covers your first 5 locations, then scales per location.',
    addModuleLabel: (name) => `Add ${name} →`,
    examplesLabel: 'Examples:',
    exampleLines: [
      '• 3 locations: Organization license covers all',
      '• 12 locations: Org license + 7 add-on locations',
      '• Mix & match at different locations',
    ],
    refreshLabels: [
      '4-hour refresh with specialized operational intelligence',
      '2-hour refresh with deep specialized intelligence',
      'Custom refresh with unlimited specialized intelligence',
    ],
    stackLabels: ['Core Lite + Modules', 'Core Pro + Modules', 'Enterprise + Modules'],
    faqButtonLabel: 'Frequently Asked Questions',
  },
  ar: {
    overviewNote: 'يغطي الترخيص المؤسسي أول 5 مواقع ثم يتوسع حسب كل موقع.',
    addModuleLabel: (name) => `إضافة ${name} →`,
    examplesLabel: 'أمثلة:',
    exampleLines: [
      '• 3 مواقع: التغطية الكاملة',
      '• 12 موقعًا: الترخيص المؤسسي + 7 مواقع إضافية',
      '• امزج بين المواقع المختلفة',
    ],
    refreshLabels: [
      'تحديث خلال 4 ساعات مع ذكاء تشغيلي متخصص',
      'تحديث خلال ساعتين مع ذكاء متخصص عميق',
      'تحديث مخصص مع ذكاء متخصص غير محدود',
    ],
    stackLabels: ['Core Lite + الوحدات', 'Core Pro + الوحدات', 'Enterprise + الوحدات'],
    faqButtonLabel: 'الأسئلة المتكررة',
  },
  fr: {
    overviewNote: 'La licence organisation couvre vos 5 premiers sites, puis évolue par site.',
    addModuleLabel: (name) => `Ajouter ${name} →`,
    examplesLabel: 'Exemples :',
    exampleLines: [
      '• 3 sites : la licence couvre tout',
      '• 12 sites : licence org + 7 sites additionnels',
      '• Combinez les modules selon les sites',
    ],
    refreshLabels: [
      'Actualisation 4 h avec intelligence opérationnelle spécialisée',
      'Actualisation 2 h avec intelligence spécialisée avancée',
      'Actualisation personnalisée avec intelligence spécialisée illimitée',
    ],
    stackLabels: ['Core Lite + modules', 'Core Pro + modules', 'Enterprise + modules'],
    faqButtonLabel: 'Questions fréquentes',
  },
  es: {
    overviewNote: 'La licencia organizativa cubre tus primeros 5 locales y luego escala por local.',
    addModuleLabel: (name) => `Anadir ${name} →`,
    examplesLabel: 'Ejemplos:',
    exampleLines: [
      '• 3 locales: la licencia cubre todos',
      '• 12 locales: licencia org + 7 locales adicionales',
      '• Combina modulos en distintos locales',
    ],
    refreshLabels: [
      'Actualizacion de 4 horas con inteligencia operativa especializada',
      'Actualizacion de 2 horas con inteligencia especializada profunda',
      'Actualizacion personalizada con inteligencia especializada ilimitada',
    ],
    stackLabels: ['Core Lite + modulos', 'Core Pro + modulos', 'Enterprise + modulos'],
    faqButtonLabel: 'Preguntas frecuentes',
  },
};

export default function ModulesPage() {
  const cta = useCta();
  const { locale, messages } = useWebsiteI18n();
  const copy = messages.pages.modules;
  const page = localizedModulesCopy[locale] ?? localizedModulesCopy.en;
  const ui = localizedModulesUi[locale] ?? localizedModulesUi.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/80 via-purple-50/30 to-blue-50/60">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-5 py-2.5 rounded-full text-base font-semibold mb-6">
              <SundaeIcon name="network" size="md" />
              <span>{page.badge}</span>
            </div>
            <h1 className="hero-h1 text-[var(--text-primary)] mb-6">
              {page.title}
            </h1>
            <p className="body-xl text-[var(--text-supporting)] mb-4 max-w-4xl mx-auto">
              {page.description}
            </p>
            <p className="body-lg text-[var(--text-muted)] mb-8 max-w-3xl mx-auto">
              <strong>{page.mixAndMatch}</strong> {ui.overviewNote}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  {page.exploreAllModules}
                </Button>
              </a>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  {page.calculateModuleRoi}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What are Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {page.whatAreModules}
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              {page.whatAreModulesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-[rgba(28,71,255,0.1)] rounded-xl">
              <div className="w-12 h-12 bg-[#1C47FF] rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="intelligence" size="lg" className="text-[var(--text-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{page.pillars[0].title}</h3>
              <p className="text-sm text-[var(--text-supporting)]">{page.pillars[0].description}</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="network" size="lg" className="text-[var(--text-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{page.pillars[1].title}</h3>
              <p className="text-sm text-[var(--text-supporting)]">{page.pillars[1].description}</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="integration" size="lg" className="text-[var(--text-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{page.pillars[2].title}</h3>
              <p className="text-sm text-[var(--text-supporting)]">{page.pillars[2].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              {page.fiveModules}
            </p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {page.chooseStack}
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              {page.chooseStackDescription}
            </p>
          </div>

          <div className="space-y-8">
            {page.modules.map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={module.icon} size="xl" className="text-[var(--text-primary)]" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-[var(--text-primary)] mb-1">{module.name}</CardTitle>
                          <p className="text-sm font-semibold text-[var(--text-muted)]">{module.headline}</p>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)] text-lg mb-6">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-3">{copy.coreCapabilities}</h4>
                        <ul className="space-y-2">
                          {module.capabilities.map((capability, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span className="text-sm text-[var(--text-supporting)]">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-[var(--text-primary)] mb-2">{copy.roi}</h4>
                          <p className="text-sm text-[var(--text-secondary)]">{module.roi}</p>
                        </div>
                        <div className="bg-[var(--surface-faint)] rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-[var(--text-primary)] mb-2">{copy.bestFor}</h4>
                          <p className="text-sm text-[var(--text-secondary)]">{module.bestFor}</p>
                        </div>
                        <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="md" className="w-full">
                            {ui.addModuleLabel(module.name)}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Modules Work */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {page.howItWorks[0].title}
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              {page.howItWorks[0].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{page.howItWorks[0].title}</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                {page.howItWorks[0].description}
              </p>
              <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                <p className="text-sm text-[var(--text-supporting)] mb-2"><strong>{ui.examplesLabel}</strong></p>
                <ul className="text-sm text-[var(--text-supporting)] space-y-1">
                  {ui.exampleLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{page.howItWorks[1].title}</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                {page.howItWorks[1].description}
              </p>
              <div className="space-y-3">
                <div className="bg-[var(--navy-deep)] rounded-lg p-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{ui.stackLabels[0]}</p>
                  <p className="text-xs text-[var(--text-supporting)]">{ui.refreshLabels[0]}</p>
                </div>
                <div className="bg-[var(--navy-deep)] rounded-lg p-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{ui.stackLabels[1]}</p>
                  <p className="text-xs text-[var(--text-supporting)]">{ui.refreshLabels[1]}</p>
                </div>
                <div className="bg-[var(--navy-deep)] rounded-lg p-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{ui.stackLabels[2]}</p>
                  <p className="text-xs text-[var(--text-supporting)]">{ui.refreshLabels[2]}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 text-center">{page.crossModuleTitle}</h3>
            <p className="text-[var(--text-secondary)] text-center mb-6">{page.crossModuleDescription}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                <p className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{page.crossModuleCards[0].title}</p>
                <p className="text-xs text-[var(--text-supporting)]">{page.crossModuleCards[0].description}</p>
              </div>
              <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                <p className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{page.crossModuleCards[1].title}</p>
                <p className="text-xs text-[var(--text-supporting)]">{page.crossModuleCards[1].description}</p>
              </div>
              <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                <p className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{page.crossModuleCards[2].title}</p>
                <p className="text-xs text-[var(--text-supporting)]">{page.crossModuleCards[2].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Selection Guide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {page.selectionTitle}
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              {page.selectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.selectionCards.map((item, index) => (
              <motion.div
                key={item.solution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="bg-[var(--navy-deep)] rounded-xl p-6 shadow-none hover:shadow-md transition-all duration-300 h-full">
              <p className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.pain}</p>
              <p className="text-[#60A5FA] font-semibold mb-2">→ {item.solution}</p>
              <p className="text-sm text-[var(--text-supporting)]">{item.benefit}</p>
            </div>
          </motion.div>
            ))}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
              <p className="text-lg font-bold mb-2">{page.wantItAll}</p>
              <p className="font-semibold mb-2">→ {page.fullSuite}</p>
              <p className="text-sm opacity-90">{page.fullSuiteDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
            {page.faqTitle}
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
            {page.faqDescription}
            </p>
          </div>

          <div className="space-y-6">
            {page.faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-[var(--surface-faint)] rounded-xl">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">{faq.q}</h3>
                <p className="text-[var(--text-supporting)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => cta("/faq", "see_more_faqs", { page: "/modules" })}
            >
              {ui.faqButtonLabel} →
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-[var(--text-primary)] mb-6">
            {page.ctaTitle}
          </h2>
          <p className="body-lg text-[var(--text-supporting)] mb-8 max-w-3xl mx-auto">
            {page.ctaDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[var(--navy-deep)] rounded-xl shadow-none">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="calculator" size="lg" className="text-[var(--text-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{page.calculateModuleRoi}</h3>
              <p className="text-sm text-[var(--text-supporting)] mb-4">{page.description}</p>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" size="md" className="w-full">
                  {page.calculateModuleRoi} →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-[var(--navy-deep)] rounded-xl shadow-none">
              <div className="w-12 h-12 bg-[#1C47FF] rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="document" size="lg" className="text-[var(--text-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{page.chooseStack}</h3>
              <p className="text-sm text-[var(--text-supporting)] mb-4">{page.chooseStackDescription}</p>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" size="md" className="w-full">
                  {page.exploreAllModules} →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-[var(--navy-deep)] rounded-xl shadow-none">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="conversation" size="lg" className="text-[var(--text-primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{page.contactSales}</h3>
              <p className="text-sm text-[var(--text-supporting)] mb-4">{page.ctaDescription}</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta("/contact", "contact_modules_expert", { page: "/modules" })}
              >
                {page.contactSales} →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
