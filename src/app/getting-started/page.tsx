"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_getting_started_page'
import { generatedUiLabels } from "@/lib/generatedUiLabels";
import {
  BANDED_UNIT_CEILING,
  CORE_PACKAGES_BY_ID,
  IMPLEMENTATION_CLASSES,
  bandedMonthlyTotal,
  usd,
} from "@/lib/pricing/priceBook";

/**
 * The journey this page used to describe was "start free on Report Lite, prove
 * the value, upgrade to Report Plus/Pro or Core Lite/Pro". Price book v1.7
 * retires every SKU in that sentence, and with them the free entry point, so
 * the page is re-cut around what a v1.7 rollout actually looks like: size a
 * Core package, connect the data, add the substrates you need.
 *
 * Prices are read from the price book — this page hand-types no number, and it
 * never renders a flat per-location rate for a banded SKU.
 */

/** Worked example used in the hero: the smallest realistic multi-site footprint. */
const EXAMPLE_LOCATIONS = 5;
const EXAMPLE_PACKAGE = CORE_PACKAGES_BY_ID.core_foundation;
const EXAMPLE_QUOTE = bandedMonthlyTotal(EXAMPLE_PACKAGE, EXAMPLE_LOCATIONS);

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
  implementationTitle: string;
  implementationDescription: string;
  implementationNote: string;
  implementationFromLabel: string;
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
    description: "Five steps from a first conversation to acting on your own numbers. Start at the depth you need, add the rest when it earns its place.",
    supporting: `Every package is paid from your first location, then priced per additional location on a rate that steps down as you grow. ${EXAMPLE_LOCATIONS} ${EXAMPLE_PACKAGE.name} locations is ${usd(EXAMPLE_PACKAGE.firstUnitMonthly)} + ${EXAMPLE_LOCATIONS - 1} × ${usd(EXAMPLE_PACKAGE.bands[0].monthlyPerUnit)} = ${usd(EXAMPLE_QUOTE.monthlyTotal)}/mo.`,
    startFree: "Run the Diagnostic",
    calculatePath: "Size Your Package",
    journeyTitle: "The Sundae Journey: 5 Steps",
    journeyDescription: "From sizing the package to running the business on it",
    steps: [
      {
        number: 1,
        title: "Size It Against Your Operation",
        subtitle: "Ten minutes, your numbers, no commitment.",
        description: "The diagnostic asks what you can and cannot see today, then comes back with the package that answers those gaps, an indicative monthly range, and where your margin is most likely leaking.",
        actions: ["Answer the operating questions", "Get a package fit tied to your gaps", "See an indicative monthly range", "Take the leak hypotheses to your team"],
        timeline: "About 10 minutes",
        cta: "Run the Diagnostic",
        ctaLink: "/diagnostic",
        icon: "insights",
        color: "from-[#FF5C4D] to-[#C2410C]",
      },
      {
        number: 2,
        title: "Choose Your Core Package",
        subtitle: "Depth is the choice, not location count.",
        description: "All four packages carry the same eleven domain modules. What changes is how deep each one goes - so you choose on the gap you are trying to close, not on how many sites you run.",
        actions: ["Foundation - the operating baseline", "Margin - cost, waste and leakage depth", "Growth - guests, promos and channel margin", "Performance - multi-brand, multi-region consolidation"],
        timeline: "One working session",
        cta: "Compare Packages",
        ctaLink: "/core",
        icon: "balance",
        color: "from-[#F2B45C] to-[#C2410C]",
      },
      {
        number: 3,
        title: "Connect Your Systems",
        subtitle: "POS first, then labor and cost.",
        description: "Sundae sits on top of what you already run. POS goes in first because it anchors everything else, then labor, inventory and purchasing fill in the rest of the picture.",
        actions: ["Connect your POS", "Add labor and scheduling sources", "Add inventory and purchasing", "Confirm the numbers against your own close"],
        timeline: "Implementation class sets the scope",
        cta: "See Integrations",
        ctaLink: "/integrations",
        icon: "network",
        color: "from-green-500 to-green-600",
      },
      {
        number: 4,
        title: "Add the Substrates You Need",
        subtitle: "Workforce, foresight, and your operating models.",
        description: "Crew is the workforce substrate - scheduling, time, pay and people. Foresight & Action adds forecasting, scenarios and the approve-in-the-loop action layer. Concept SKUs switch on the operating models your group actually runs.",
        actions: ["Crew for scheduling, time, pay and people", "Foresight & Action for forecasting and scenarios", "Concepts for franchise, hotel F&B, cloud kitchen, catering, production or rental commissary", "Watchtower for external market intelligence, scoped with you"],
        timeline: "Add whenever it earns its place",
        cta: "Explore Crew",
        ctaLink: "/crew",
        icon: "growth",
        color: "from-orange-500 to-orange-600",
      },
      {
        number: 5,
        title: "Run the Business On It",
        subtitle: "Then keep scaling.",
        description: `Locations are priced marginally as you add them, so growth never reprices what you already run. Past ${BANDED_UNIT_CEILING} locations the published bands give way to an Enterprise agreement scoped with you.`,
        actions: ["Act during the shift, not after the close", "Volume discounts start at 50 locations", "Annual and 2-year terms cost less", `Past ${BANDED_UNIT_CEILING} locations, Enterprise`],
        timeline: "Ongoing",
        cta: "Talk to Sales",
        ctaLink: "/contact",
        icon: "multiLocation",
        color: "from-[#E9A24A] to-[#FF5C4D]",
      },
    ],
    noForcedTitle: "No Forced Timelines",
    noForcedDescription: "Start on the package that answers today's gap. Add Crew when scheduling is the constraint. Add Foresight & Action when you start planning further out. Every package is month to month - annual and 2-year terms exist because they cost less, not because they are required.",
    commonJourneysTitle: "Common Journeys",
    commonJourneysDescription: "Where operators of different sizes typically land",
    journeys: [
      {
        title: "1-5 Location Operator",
        icon: "labor",
        items: ["Start on Core Foundation for one operating picture", "Add Crew Schedule if planning is still manual", "Step up to Core Margin when cost is the constraint"],
      },
      {
        title: "10-50 Location Operator",
        icon: "multiLocation",
        items: ["Core Margin or Core Growth, depending on where the gap is", "Crew Operating once payroll and time are in scope", "Foresight & Action for forecasting and scenarios"],
      },
      {
        title: "100+ Location Group",
        icon: "growth",
        items: ["Core Performance for multi-brand, multi-region consolidation", `Past ${BANDED_UNIT_CEILING} locations the bands give way to an Enterprise agreement`, "Watchtower and concept SKUs scoped alongside"],
      },
    ],
    implementationTitle: "Implementation",
    implementationDescription: "A one-off charge that reflects how much integration work your rollout actually needs.",
    implementationNote: "Charged once, at the highest class in your selection - never summed across the SKUs you buy.",
    implementationFromLabel: "From",
    finalTitle: "Ready to Start Your Journey?",
    finalDescription: "Size it against your own operation in about ten minutes, or bring us your numbers and we will do it with you.",
    cards: [
      { title: "Run the Diagnostic", description: "Package fit and an indicative range", button: "Start →", icon: "insights", color: "bg-green-600", href: "/diagnostic" },
      { title: "Size Your Package", description: "Interactive pricing calculator", button: "Calculate Pricing →", icon: "calculator", color: "bg-[#FF5C4D]" },
      { title: "Talk to an Expert", description: "A working session against your data", button: "Book Demo →", icon: "conversation", color: "bg-[#FF5C4D]", href: "/demo" },
    ],
  },
  ar: {
    badge: "دليل البدء",
    title: "رحلتك مع Sundae",
    description: "خمس خطوات من المحادثة الأولى إلى التصرف بناءً على أرقامك. ابدأ بالعمق الذي تحتاجه، وأضف الباقي حين يستحق مكانه.",
    supporting: `كل باقة مدفوعة ابتداءً من موقعك الأول، ثم تُسعَّر لكل موقع إضافي بسعر يتناقص مع النمو. ${EXAMPLE_LOCATIONS} مواقع ${EXAMPLE_PACKAGE.name} = ${usd(EXAMPLE_PACKAGE.firstUnitMonthly)} + ${EXAMPLE_LOCATIONS - 1} × ${usd(EXAMPLE_PACKAGE.bands[0].monthlyPerUnit)} = ${usd(EXAMPLE_QUOTE.monthlyTotal)} شهريًا.`,
    startFree: "ابدأ التشخيص",
    calculatePath: "احسب باقتك",
    journeyTitle: "رحلة Sundae: 5 خطوات",
    journeyDescription: "من تحديد حجم الباقة إلى إدارة الأعمال عليها",
    steps: [
      { number: 1, title: "قِس الأمر على عملياتك", subtitle: "عشر دقائق، بأرقامك، دون التزام.", description: "يسألك التشخيص عمّا تراه وما لا تراه اليوم، ثم يعود بالباقة التي تعالج تلك الفجوات، ونطاق شهري استرشادي، وأين يتسرب هامشك على الأرجح.", actions: ["أجب عن أسئلة التشغيل", "احصل على باقة مرتبطة بفجواتك", "اطّلع على نطاق شهري استرشادي", "انقل فرضيات التسرب إلى فريقك"], timeline: "نحو 10 دقائق", cta: "ابدأ التشخيص", ctaLink: "/diagnostic", icon: "insights", color: "from-[#FF5C4D] to-[#C2410C]" },
      { number: 2, title: "اختر باقة Core", subtitle: "العمق هو الخيار، لا عدد المواقع.", description: "تحمل الباقات الأربع الوحدات الإحدى عشرة نفسها. ما يتغير هو عمق كل واحدة، فتختار حسب الفجوة التي تريد إغلاقها لا حسب عدد مواقعك.", actions: ["Foundation - الأساس التشغيلي", "Margin - عمق التكلفة والهدر والتسرب", "Growth - الضيوف والعروض وهامش القنوات", "Performance - توحيد متعدد العلامات والأسواق"], timeline: "جلسة عمل واحدة", cta: "قارن الباقات", ctaLink: "/core", icon: "balance", color: "from-[#F2B45C] to-[#C2410C]" },
      { number: 3, title: "اربط أنظمتك", subtitle: "نقاط البيع أولاً، ثم العمالة والتكلفة.", description: "يعمل Sundae فوق ما تشغّله بالفعل. تُربط نقاط البيع أولاً لأنها تثبّت كل ما عداها، ثم تكمل العمالة والمخزون والمشتريات الصورة.", actions: ["اربط نظام نقاط البيع", "أضف مصادر العمالة والجدولة", "أضف المخزون والمشتريات", "طابق الأرقام مع إقفالك"], timeline: "فئة التنفيذ تحدد النطاق", cta: "استعرض التكاملات", ctaLink: "/integrations", icon: "network", color: "from-green-500 to-green-600" },
      { number: 4, title: "أضف الطبقات التي تحتاجها", subtitle: "القوى العاملة، الاستشراف، ونماذج تشغيلك.", description: "Crew هي طبقة القوى العاملة - الجدولة والوقت والرواتب والأفراد. ويضيف Foresight & Action التنبؤ والسيناريوهات وطبقة التنفيذ بموافقة بشرية. أما باقات المفاهيم فتشغّل نماذج التشغيل التي تديرها فعلاً.", actions: ["Crew للجدولة والوقت والرواتب والأفراد", "Foresight & Action للتنبؤ والسيناريوهات", "المفاهيم: الامتياز، ضيافة الفنادق، المطابخ السحابية، التموين، الإنتاج، أو المطابخ المؤجرة", "Watchtower لذكاء السوق الخارجي، يُحدَّد نطاقه معك"], timeline: "أضفها حين تستحق مكانها", cta: "استعرض Crew", ctaLink: "/crew", icon: "growth", color: "from-orange-500 to-orange-600" },
      { number: 5, title: "أدر أعمالك عليه", subtitle: "ثم واصل التوسع.", description: `تُسعَّر المواقع تدريجيًا كلما أضفتها، فلا يعيد النمو تسعير ما تشغّله بالفعل. وبعد ${BANDED_UNIT_CEILING} موقعًا تفسح النطاقات المنشورة المجال لاتفاقية Enterprise تُحدَّد معك.`, actions: ["تصرّف أثناء الوردية لا بعد الإقفال", "خصومات الحجم تبدأ من 50 موقعًا", "الاشتراك السنوي ولمدة سنتين أقل تكلفة", `بعد ${BANDED_UNIT_CEILING} موقعًا: Enterprise`], timeline: "مستمر", cta: "تواصل مع المبيعات", ctaLink: "/contact", icon: "multiLocation", color: "from-[#E9A24A] to-[#FF5C4D]" },
    ],
    noForcedTitle: "لا جداول زمنية مفروضة",
    noForcedDescription: "ابدأ بالباقة التي تعالج فجوة اليوم. أضف Crew حين تصبح الجدولة هي القيد، وأضف Foresight & Action حين تبدأ التخطيط لمدى أبعد. كل باقة شهرية؛ والاشتراك السنوي ولمدة سنتين موجود لأنه أقل تكلفة، لا لأنه إلزامي.",
    commonJourneysTitle: "مسارات شائعة",
    commonJourneysDescription: "أين يستقر المشغلون بأحجامهم المختلفة عادةً",
    journeys: [
      { title: "مشغل 1-5 مواقع", icon: "labor", items: ["ابدأ بـ Core Foundation لصورة تشغيلية واحدة", "أضف Crew Schedule إن كان التخطيط ما زال يدويًا", "انتقل إلى Core Margin حين تصبح التكلفة هي القيد"] },
      { title: "مشغل 10-50 موقعًا", icon: "multiLocation", items: ["Core Margin أو Core Growth حسب موضع الفجوة", "Crew Operating حين تدخل الرواتب والوقت في النطاق", "Foresight & Action للتنبؤ والسيناريوهات"] },
      { title: "مجموعة 100+ موقع", icon: "growth", items: ["Core Performance للتوحيد متعدد العلامات والأسواق", `بعد ${BANDED_UNIT_CEILING} موقعًا تفسح النطاقات المجال لاتفاقية Enterprise`, "Watchtower وباقات المفاهيم تُحدَّد بالتوازي"] },
    ],
    implementationTitle: "التنفيذ",
    implementationDescription: "رسم يُدفع مرة واحدة ويعكس حجم أعمال التكامل التي يحتاجها تطبيقك فعلاً.",
    implementationNote: "يُحتسب مرة واحدة، عند أعلى فئة في اختيارك - ولا يُجمع أبدًا عبر الباقات التي تشتريها.",
    implementationFromLabel: "ابتداءً من",
    finalTitle: "هل أنت مستعد لبدء رحلتك؟",
    finalDescription: "قِس الأمر على عملياتك في نحو عشر دقائق، أو أحضر أرقامك ونقوم بذلك معك.",
    cards: [
      { title: "ابدأ التشخيص", description: "باقة مناسبة ونطاق استرشادي", button: "ابدأ →", icon: "insights", color: "bg-green-600", href: "/diagnostic" },
      { title: "احسب باقتك", description: "حاسبة تسعير تفاعلية", button: "احسب التسعير →", icon: "calculator", color: "bg-[#FF5C4D]" },
      { title: "تحدث مع خبير", description: "جلسة عمل على بياناتك", button: "احجز عرضًا →", icon: "conversation", color: "bg-[#FF5C4D]", href: "/demo" },
    ],
  },
  fr: {
    badge: "Guide de démarrage",
    title: "Votre parcours avec Sundae",
    description: "Cinq étapes, de la première conversation à l'action sur vos propres chiffres. Commencez à la profondeur qu'il vous faut, ajoutez le reste quand il le mérite.",
    supporting: `Chaque package est payant dès votre premier site, puis facturé par site additionnel à un tarif qui diminue à mesure que vous grandissez. ${EXAMPLE_LOCATIONS} sites ${EXAMPLE_PACKAGE.name} = ${usd(EXAMPLE_PACKAGE.firstUnitMonthly)} + ${EXAMPLE_LOCATIONS - 1} × ${usd(EXAMPLE_PACKAGE.bands[0].monthlyPerUnit)} = ${usd(EXAMPLE_QUOTE.monthlyTotal)}/mois.`,
    startFree: "Lancer le diagnostic",
    calculatePath: "Dimensionner votre package",
    journeyTitle: "Le parcours Sundae : 5 étapes",
    journeyDescription: "Du dimensionnement du package au pilotage quotidien",
    steps: [
      { number: 1, title: "Dimensionnez selon votre exploitation", subtitle: "Dix minutes, vos chiffres, sans engagement.", description: "Le diagnostic vous demande ce que vous voyez et ne voyez pas aujourd'hui, puis renvoie le package qui répond à ces manques, une fourchette mensuelle indicative et les fuites de marge les plus probables.", actions: ["Répondre aux questions d'exploitation", "Obtenir un package aligné sur vos manques", "Voir une fourchette mensuelle indicative", "Apporter les hypothèses de fuite à votre équipe"], timeline: "Environ 10 minutes", cta: "Lancer le diagnostic", ctaLink: "/diagnostic", icon: "insights", color: "from-[#FF5C4D] to-[#C2410C]" },
      { number: 2, title: "Choisissez votre package Core", subtitle: "La profondeur est le choix, pas le nombre de sites.", description: "Les quatre packages portent les mêmes onze modules métier. Ce qui change, c'est la profondeur de chacun : vous choisissez donc sur l'écart à combler, pas sur le nombre de sites.", actions: ["Foundation - la base opérationnelle", "Margin - profondeur coût, gaspillage et fuites", "Growth - clients, promos et marge par canal", "Performance - consolidation multi-marques et multi-marchés"], timeline: "Une session de travail", cta: "Comparer les packages", ctaLink: "/core", icon: "balance", color: "from-[#F2B45C] to-[#C2410C]" },
      { number: 3, title: "Connectez vos systèmes", subtitle: "Le POS d'abord, puis main-d'oeuvre et coûts.", description: "Sundae se pose au-dessus de ce que vous exploitez déjà. Le POS entre en premier car il ancre tout le reste, puis main-d'oeuvre, stocks et achats complètent le tableau.", actions: ["Connecter votre POS", "Ajouter les sources main-d'oeuvre et planning", "Ajouter stocks et achats", "Vérifier les chiffres face à votre clôture"], timeline: "La classe d'implémentation fixe le périmètre", cta: "Voir les intégrations", ctaLink: "/integrations", icon: "network", color: "from-green-500 to-green-600" },
      { number: 4, title: "Ajoutez les couches utiles", subtitle: "Main-d'oeuvre, prévision et vos modèles d'exploitation.", description: "Crew est la couche workforce - planning, temps, paie et personnes. Foresight & Action ajoute la prévision, les scénarios et la couche d'action avec validation humaine. Les SKUs concepts activent les modèles d'exploitation que votre groupe opère réellement.", actions: ["Crew pour planning, temps, paie et personnes", "Foresight & Action pour prévision et scénarios", "Concepts : franchise, hôtellerie F&B, cloud kitchen, traiteur, production ou commissary locatif", "Watchtower pour l'intelligence marché, cadré avec vous"], timeline: "À ajouter quand cela le mérite", cta: "Découvrir Crew", ctaLink: "/crew", icon: "growth", color: "from-orange-500 to-orange-600" },
      { number: 5, title: "Pilotez l'activité dessus", subtitle: "Puis continuez à grandir.", description: `Les sites sont facturés au tarif marginal au fur et à mesure : la croissance ne retarife jamais ce que vous exploitez déjà. Au-delà de ${BANDED_UNIT_CEILING} sites, les paliers publiés laissent place à un accord Enterprise cadré avec vous.`, actions: ["Agir pendant le service, pas après la clôture", "Les remises volume commencent à 50 sites", "Les engagements annuels et 2 ans coûtent moins cher", `Au-delà de ${BANDED_UNIT_CEILING} sites : Enterprise`], timeline: "En continu", cta: "Contacter les ventes", ctaLink: "/contact", icon: "multiLocation", color: "from-[#E9A24A] to-[#FF5C4D]" },
    ],
    noForcedTitle: "Aucun calendrier imposé",
    noForcedDescription: "Commencez par le package qui répond au manque du moment. Ajoutez Crew quand le planning devient la contrainte, Foresight & Action quand vous planifiez plus loin. Tout est mensuel : les engagements annuels et 2 ans existent parce qu'ils coûtent moins cher, pas parce qu'ils sont obligatoires.",
    commonJourneysTitle: "Parcours fréquents",
    commonJourneysDescription: "Où atterrissent généralement les opérateurs selon leur taille",
    journeys: [
      { title: "Opérateur 1-5 sites", icon: "labor", items: ["Démarrer sur Core Foundation pour une vue unique", "Ajouter Crew Schedule si le planning est encore manuel", "Passer à Core Margin quand le coût devient la contrainte"] },
      { title: "Opérateur 10-50 sites", icon: "multiLocation", items: ["Core Margin ou Core Growth selon l'écart", "Crew Operating quand paie et temps entrent dans le périmètre", "Foresight & Action pour prévision et scénarios"] },
      { title: "Groupe 100+ sites", icon: "growth", items: ["Core Performance pour la consolidation multi-marques et multi-marchés", `Au-delà de ${BANDED_UNIT_CEILING} sites, les paliers laissent place à un accord Enterprise`, "Watchtower et SKUs concepts cadrés en parallèle"] },
    ],
    implementationTitle: "Implémentation",
    implementationDescription: "Un frais unique qui reflète la charge d'intégration réellement nécessaire à votre déploiement.",
    implementationNote: "Facturé une seule fois, à la classe la plus élevée de votre sélection - jamais cumulé sur les SKUs achetés.",
    implementationFromLabel: "À partir de",
    finalTitle: "Prêt à commencer votre parcours ?",
    finalDescription: "Dimensionnez-le sur votre exploitation en une dizaine de minutes, ou apportez vos chiffres et nous le faisons avec vous.",
    cards: [
      { title: "Lancer le diagnostic", description: "Package adapté et fourchette indicative", button: "Démarrer →", icon: "insights", color: "bg-green-600", href: "/diagnostic" },
      { title: "Dimensionner votre package", description: "Calculateur de prix interactif", button: "Calculer le prix →", icon: "calculator", color: "bg-[#FF5C4D]" },
      { title: "Parler à un expert", description: "Une session de travail sur vos données", button: "Réserver une démo →", icon: "conversation", color: "bg-[#FF5C4D]", href: "/demo" },
    ],
  },
  es: {
    badge: "Guía de inicio",
    title: "Tu viaje con Sundae",
    description: "Cinco pasos desde la primera conversación hasta actuar sobre tus propios números. Empieza con la profundidad que necesitas y añade el resto cuando se lo gane.",
    supporting: `Cada paquete se paga desde tu primer local y luego se cobra por local adicional a una tarifa que baja a medida que creces. ${EXAMPLE_LOCATIONS} locales de ${EXAMPLE_PACKAGE.name} = ${usd(EXAMPLE_PACKAGE.firstUnitMonthly)} + ${EXAMPLE_LOCATIONS - 1} × ${usd(EXAMPLE_PACKAGE.bands[0].monthlyPerUnit)} = ${usd(EXAMPLE_QUOTE.monthlyTotal)}/mes.`,
    startFree: "Ejecutar el diagnóstico",
    calculatePath: "Dimensiona tu paquete",
    journeyTitle: "El viaje Sundae: 5 pasos",
    journeyDescription: "Desde dimensionar el paquete hasta operar el negocio con él",
    steps: [
      { number: 1, title: "Dimensiónalo sobre tu operación", subtitle: "Diez minutos, tus números, sin compromiso.", description: "El diagnóstico pregunta qué ves y qué no ves hoy, y devuelve el paquete que cubre esos huecos, un rango mensual indicativo y por dónde se está yendo tu margen.", actions: ["Responder las preguntas de operación", "Obtener un paquete ligado a tus huecos", "Ver un rango mensual indicativo", "Llevar las hipótesis de fuga a tu equipo"], timeline: "Unos 10 minutos", cta: "Ejecutar el diagnóstico", ctaLink: "/diagnostic", icon: "insights", color: "from-[#FF5C4D] to-[#C2410C]" },
      { number: 2, title: "Elige tu paquete Core", subtitle: "La profundidad es la elección, no el número de locales.", description: "Los cuatro paquetes llevan los mismos once módulos de dominio. Lo que cambia es cuánto profundiza cada uno, así que eliges por el hueco que quieres cerrar, no por cuántos locales operas.", actions: ["Foundation - la base operativa", "Margin - profundidad en coste, merma y fugas", "Growth - clientes, promociones y margen por canal", "Performance - consolidación multimarca y multimercado"], timeline: "Una sesión de trabajo", cta: "Comparar paquetes", ctaLink: "/core", icon: "balance", color: "from-[#F2B45C] to-[#C2410C]" },
      { number: 3, title: "Conecta tus sistemas", subtitle: "Primero el POS, luego personal y coste.", description: "Sundae se apoya sobre lo que ya operas. El POS entra primero porque ancla todo lo demás; después personal, inventario y compras completan el cuadro.", actions: ["Conectar tu POS", "Añadir fuentes de personal y turnos", "Añadir inventario y compras", "Cuadrar los números con tu propio cierre"], timeline: "La clase de implantación fija el alcance", cta: "Ver integraciones", ctaLink: "/integrations", icon: "network", color: "from-green-500 to-green-600" },
      { number: 4, title: "Añade las capas que necesites", subtitle: "Personal, previsión y tus modelos de operación.", description: "Crew es la capa de personal: turnos, fichaje, nómina y personas. Foresight & Action añade previsión, escenarios y la capa de acción con aprobación humana. Los SKUs de concepto activan los modelos de operación que tu grupo realmente ejecuta.", actions: ["Crew para turnos, fichaje, nómina y personas", "Foresight & Action para previsión y escenarios", "Conceptos: franquicia, F&B hotelero, cocina cloud, catering, producción o comisariato en alquiler", "Watchtower para inteligencia de mercado, dimensionado contigo"], timeline: "Añádelo cuando se lo gane", cta: "Explorar Crew", ctaLink: "/crew", icon: "growth", color: "from-orange-500 to-orange-600" },
      { number: 5, title: "Opera el negocio con él", subtitle: "Y sigue creciendo.", description: `Los locales se cobran de forma marginal según los añades, así que crecer nunca reprecia lo que ya operas. Pasados los ${BANDED_UNIT_CEILING} locales, los tramos publicados dan paso a un acuerdo Enterprise dimensionado contigo.`, actions: ["Actuar durante el turno, no tras el cierre", "Los descuentos por volumen empiezan en 50 locales", "Los compromisos anual y a 2 años cuestan menos", `Pasados ${BANDED_UNIT_CEILING} locales: Enterprise`], timeline: "Continuo", cta: "Hablar con ventas", ctaLink: "/contact", icon: "multiLocation", color: "from-[#E9A24A] to-[#FF5C4D]" },
    ],
    noForcedTitle: "Sin calendarios forzados",
    noForcedDescription: "Empieza por el paquete que cubre el hueco de hoy. Añade Crew cuando los turnos sean la restricción y Foresight & Action cuando empieces a planificar más lejos. Todo es mes a mes: los compromisos anual y a 2 años existen porque cuestan menos, no porque sean obligatorios.",
    commonJourneysTitle: "Recorridos habituales",
    commonJourneysDescription: "Dónde suelen aterrizar los operadores según su tamaño",
    journeys: [
      { title: "Operador 1-5 locales", icon: "labor", items: ["Empezar en Core Foundation para una sola foto operativa", "Añadir Crew Schedule si la planificación sigue siendo manual", "Subir a Core Margin cuando el coste sea la restricción"] },
      { title: "Operador 10-50 locales", icon: "multiLocation", items: ["Core Margin o Core Growth según dónde esté el hueco", "Crew Operating cuando entren nómina y fichaje", "Foresight & Action para previsión y escenarios"] },
      { title: "Grupo de 100+ locales", icon: "growth", items: ["Core Performance para consolidación multimarca y multimercado", `Pasados ${BANDED_UNIT_CEILING} locales los tramos dan paso a un acuerdo Enterprise`, "Watchtower y SKUs de concepto dimensionados en paralelo"] },
    ],
    implementationTitle: "Implantación",
    implementationDescription: "Un cargo único que refleja cuánto trabajo de integración necesita realmente tu despliegue.",
    implementationNote: "Se cobra una sola vez, en la clase más alta de tu selección; nunca se suma entre los SKUs que compras.",
    implementationFromLabel: "Desde",
    finalTitle: "¿Listo para empezar tu viaje?",
    finalDescription: "Dimensiónalo sobre tu operación en unos diez minutos, o tráenos tus números y lo hacemos contigo.",
    cards: [
      { title: "Ejecutar el diagnóstico", description: "Paquete adecuado y rango indicativo", button: "Empezar →", icon: "insights", color: "bg-green-600", href: "/diagnostic" },
      { title: "Dimensiona tu paquete", description: "Calculadora de precios interactiva", button: "Calcular precio →", icon: "calculator", color: "bg-[#FF5C4D]" },
      { title: "Hablar con un experto", description: "Una sesión de trabajo sobre tus datos", button: "Reservar demo →", icon: "conversation", color: "bg-[#FF5C4D]", href: "/demo" },
    ],
  },
};

export default function GettingStartedPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const copy = localizedGettingStartedCopy[locale as keyof typeof localizedGettingStartedCopy] ?? getGeneratedLocalCopy(localizedGettingStartedCopy, generatedLocalCopy.localizedGettingStartedCopy, locale) ?? localizedGettingStartedCopy.en;
  const labels = generatedUiLabels[locale as keyof typeof generatedUiLabels] ?? generatedUiLabels.en;

  const handleFinalCardClick = (href?: string) => {
    if (href) {
      cta(href, `final_card_from_getting_started`, { page: "/getting-started" });
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
            onClick={() => cta("/diagnostic", "diagnostic_from_getting_started", { page: "/getting-started" })}
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
                        <p className="text-sm font-semibold text-[var(--text-muted)] uppercase mb-3">{labels.whatYoullDo}</p>
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
                        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-2">{labels.timeline}</p>
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
                    <div className="w-12 h-12 bg-[#FF5C4D] rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={journey.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-xl text-[var(--text-primary)] mb-4">{journey.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {journey.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#FF5C4D]/20 text-[#FF8473] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{idx + 1}</div>
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

      {/* Implementation classes come straight from the price book. The one rule
          that matters commercially is rendered as a note, not per-card copy:
          implementation is charged ONCE at the highest class in the selection,
          never summed across SKUs. */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.implementationTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.implementationDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {IMPLEMENTATION_CLASSES.map((cls) => (
              <StaggerItem key={cls.id}>
                <Card variant="elevated" className="h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-[var(--text-primary)] mb-2">{cls.name}</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#FF8473] to-[#F2B45C] bg-clip-text text-transparent">
                      {cls.from ? `${copy.implementationFromLabel} ${usd(cls.oneOff)}` : usd(cls.oneOff)}
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp className="mt-10">
            <p className="text-center text-sm text-[var(--text-muted)] max-w-3xl mx-auto">
              {copy.implementationNote}
            </p>
          </FadeUp>
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
                    variant={card.color === "bg-green-600" ? "primary" : "outline-ink"}
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
