'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { PulseDashboardMockup } from "@/components/ui/MockupFrame";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

const localizedCoreCopy = {
  en: {
    hero: {
      badge: "Sundae Core",
      title: <>Real-Time Operations. Not End-of-Day Reports.</>,
      description:
        "Connected to your POS, labor, inventory, and every system that matters. Core refreshes every 2-4 hours so you can act during the shift - not after the damage is done.",
      primary: "Explore Core Tiers",
      secondary: "Book a Demo",
    },
    realTime: {
      heading: "The Real-Time Intelligence Layer",
      description:
        "Built for operators who can't wait for end-of-day reports. Whether you manage 10 locations or 100+, Core gives you the speed to see what's happening now, understand why it matters, and get recommended actions before problems escalate.",
      cards: [
        { title: "Predictive, Not Reactive", desc: "Get alerts before problems become expensive. Sundae Coach recommendations for immediate action - not dashboards that update.", icon: "forecasting" as SundaeIconName, color: "from-blue-500 to-blue-600" },
        { title: "Every Location, One View", desc: "Unified visibility across all locations. Portfolio-level patterns and location-level detail in a single pane.", icon: "multiLocation" as SundaeIconName, color: "from-purple-500 to-purple-600" },
        { title: "Grows With You", desc: "From 10 to 1,000+ locations. Core Lite, Pro, or Enterprise - the platform scales as you do.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    tiers: {
      eyebrow: "CHOOSE YOUR TIER",
      heading: "Three Tiers for Every Scale",
      description: "From growing operations to global enterprises. Pick your speed.",
      bestForLabel: "Best for:",
      viewPrefix: "See",
      items: [
        {
          name: "Core Lite",
          badge: "Growing Operations",
          subtitle: "Real-Time Intelligence for 1-29 Locations",
          description: "For restaurant groups scaling from single-location to multi-location operations. 4-hour refresh cycles and single POS integration.",
          features: ["4-hour refresh (6x daily)", "600 base credits + 120/location", "30 custom dashboards", "2-year retention", "Single POS integration", "Email + Chat + Phone support"],
          bestFor: "1-10 locations, single-brand portfolios",
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Core Pro",
          badge: "Most Popular",
          subtitle: "Optimized for 30-100 Location Portfolios",
          description: "For established multi-location operators who need faster refresh cycles and advanced forecasting across brands.",
          features: ["2-hour refresh (12x daily)", "1,200 base credits + 240/location", "75 custom dashboards", "3-year retention", "Multi-POS support", "Priority phone support (2hr SLA)"],
          bestFor: "30-100 locations, multi-brand operators",
          color: "from-purple-500 to-purple-600",
        },
        {
          name: "Enterprise",
          badge: "Custom Everything",
          subtitle: "Built for 100+ Locations",
          description: "For large-scale operations requiring custom refresh frequency, unlimited dashboards, white-label, SSO, and dedicated support.",
          features: ["Custom refresh frequency", "Unlimited credits", "Unlimited dashboards", "Custom retention", "White-label, SSO, dedicated CSM", "24/7 support with custom SLAs"],
          bestFor: "100+ locations, multi-brand enterprises",
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    dimensions: {
      heading: "The 4D Intelligence Model",
      description: "Core delivers all four dimensions - expanded.",
      items: [
        { dimension: "1D", title: "What Happened", status: "Real-Time", description: "Complete operational truth, updated every 2-4 hours. Near real-time visibility for same-shift interventions.", icon: "report" as SundaeIconName, color: "from-blue-500 to-blue-600" },
        { dimension: "2D", title: "Plan vs. Actual", status: "Real-Time", description: "Real-time budget variance tracking. Flash reporting for finance teams. Week-to-date and month-to-date visibility.", icon: "marketing" as SundaeIconName, color: "from-purple-500 to-purple-600" },
        { dimension: "3D", title: "Market Context", status: "Expanded", description: "Full benchmarking suite (30+ metrics). Portfolio comparisons. Competitive context via Watchtower.", icon: "multiLocation" as SundaeIconName, color: "from-green-500 to-green-600" },
        { dimension: "4D", title: "What's Next", status: "Expanded", description: "14-30 day forecasting. Proactive alerts before problems escalate. Sundae Coach recommendations with confidence scores.", icon: "growth" as SundaeIconName, color: "from-orange-500 to-orange-600" },
      ],
    },
    pulse: {
      badge: "Included with Core",
      heading: "Pulse: Your Shift Command Center",
      description: "See anomalies the moment they happen. Coach your team in real time. Confirm results before the shift ends.",
      features: [
        { name: "Sales & Pace", description: "Intraday sales pacing, KPIs, and hourly trend visualization", icon: "chart" as SundaeIconName },
        { name: "Labor Live", description: "Intraday labor pacing, overtime risk tracking, and break compliance", icon: "benchmarking" as SundaeIconName },
        { name: "Leakage Monitoring", description: "Real-time void, comp, and discount monitoring per shift", icon: "cost" as SundaeIconName },
        { name: "Service Speed & Flow", description: "Throughput bottlenecks, backlog, and kitchen pacing metrics", icon: "speed" as SundaeIconName },
        { name: "Menu Intelligence", description: "Item catalog, classification matrix (Stars/Plowhorses/Puzzles/Dogs)", icon: "insights" as SundaeIconName },
        { name: "Alerts & Playbooks", description: "Automated response workflows triggered by exceptions", icon: "forecasting" as SundaeIconName },
        { name: "Sundae Coach", description: "Shift-level coaching signals for Sales, Leakage, and Flow", icon: "intelligence" as SundaeIconName },
        { name: "Portfolio Leaderboard", description: "Multi-outlet performance comparison with streak tracking", icon: "multiLocation" as SundaeIconName },
        { name: "Wallboard Mode", description: "Full-screen display for kitchen or front-of-house screens", icon: "canvas" as SundaeIconName },
      ],
    },
    integrations: {
      heading: "Connect All Your Systems",
      description: "Core connects across 12 data domains with 80+ vendor integrations.",
      items: [
        { category: "POS Systems", examples: "Oracle MICROS Simphony, Square, Toast, Clover, plus direct database connectors", icon: "integration" as SundaeIconName },
        { category: "Labor/Workforce", examples: "7shifts, HotSchedules, Deputy", icon: "benchmarking" as SundaeIconName },
        { category: "Inventory & Purchasing", examples: "MarketMan, Craftable, BinWise", icon: "insights" as SundaeIconName },
        { category: "Accounting", examples: "QuickBooks, Xero, Sage, FreshBooks", icon: "finance" as SundaeIconName },
        { category: "Reservations", examples: "OpenTable, Resy, SevenRooms, Tock", icon: "operators" as SundaeIconName },
        { category: "Delivery & Marketing", examples: "Deliverect, Uber Eats, DoorDash, Meta, Google Ads, Mailchimp", icon: "marketing" as SundaeIconName },
      ],
    },
    modules: {
      heading: "Add Modules for Specialized Intelligence",
      description: "Deepen Core with focused modules for your specific operational challenges.",
      items: [
        { name: "Labor Intelligence", description: "Real-time schedule optimization, predictive labor demand", icon: "benchmarking" as SundaeIconName },
        { name: "Inventory Intelligence", description: "Real-time waste tracking, automated par levels", icon: "insights" as SundaeIconName },
        { name: "Purchasing Intelligence", description: "Real-time price optimization, vendor comparison", icon: "marketing" as SundaeIconName },
        { name: "Marketing Intelligence", description: "Real-time campaign tracking, CAC monitoring", icon: "growth" as SundaeIconName },
        { name: "Reservations Intelligence", description: "Real-time booking patterns, table optimization", icon: "operators" as SundaeIconName },
      ],
      button: "Explore All Modules",
    },
    watchtower: {
      heading: "Core + Watchtower = Complete Intelligence",
      description: "Core tells you how you're performing right now. Watchtower tells you what's happening around you. Together, they give you the complete picture - internal operations and external market context in one intelligence layer.",
      button: "Learn About Watchtower",
    },
    faq: {
      heading: "Frequently Asked Questions",
      items: [
        { q: "What's the difference between Core Lite and Core Pro?", a: "Core Lite: 4-hour refresh, 600 base credits, 30 dashboards, single POS. Core Pro: 2-hour refresh, 1,200 base credits, 75 dashboards, multi-POS support." },
        { q: "Can I upgrade from Report to Core?", a: "Yes. All historical data is preserved. Transition with no data loss." },
        { q: "Do I need Core if I only have 5 locations?", a: "Not required, but recommended if you need operational speed (2-4 hour refresh). Report works great for 1-10 locations if daily reports are sufficient." },
        { q: "Can Core handle multiple POS systems?", a: "Core Pro and Enterprise support multi-POS environments. Core Lite supports single POS across all locations." },
        { q: "Can I use Core with Watchtower?", a: "Highly recommended. Core provides internal intelligence, Watchtower adds external market intelligence for complete visibility." },
        { q: "Can I use Core with Modules?", a: "Yes. All 5 specialized modules work with Core to deepen intelligence in specific operational areas." },
      ],
    },
    cta: {
      title: "Stop Managing Yesterday's Numbers",
      description: "See what real-time operational intelligence looks like with your actual data.",
      primary: "Explore Core Tiers",
      secondary: "Book a Demo",
    },
  },
  ar: {
    hero: {
      badge: "Sundae Core",
      title: "العمليات الفورية. لا تقارير نهاية اليوم.",
      description:
        "متصل بنقاط البيع والعمالة والمخزون وكل نظام مهم. يحدث Core كل 2-4 ساعات حتى تتحرك أثناء الوردية - لا بعد انتهاء الضرر.",
      primary: "استعرض مستويات Core",
      secondary: "احجز عرضاً",
    },
    realTime: {
      heading: "طبقة الذكاء الفوري",
      description:
        "مصمم للمشغلين الذين لا يستطيعون انتظار تقارير نهاية اليوم. سواء كنت تدير 10 مواقع او 100+، يمنحك Core السرعة لترى ما يحدث الان، وتفهم لماذا يهم، وتحصل على توصيات قبل تفاقم المشكلات.",
      cards: [
        { title: "استباقي لا تفاعلي", desc: "تنبيهات قبل ان تتحول المشكلات الى تكلفة. توصيات Sundae Coach للعمل الفوري - لا لوحات تحكم تتحدث متأخرة.", icon: "forecasting" as SundaeIconName, color: "from-blue-500 to-blue-600" },
        { title: "كل موقع في عرض واحد", desc: "رؤية موحدة عبر كل المواقع. أنماط على مستوى المحفظة وتفاصيل على مستوى الموقع في لوحة واحدة.", icon: "multiLocation" as SundaeIconName, color: "from-purple-500 to-purple-600" },
        { title: "ينمو معك", desc: "من 10 الى اكثر من 1,000 موقع. Core Lite او Pro او Enterprise - المنصة تتوسع معك.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    tiers: {
      eyebrow: "اختر المستوى",
      heading: "ثلاثة مستويات لكل حجم",
      description: "من العمليات النامية الى المؤسسات العالمية. اختر السرعة المناسبة لك.",
      bestForLabel: "الانسب لـ:",
      viewPrefix: "عرض",
      items: [
        {
          name: "Core Lite",
          badge: "عمليات نامية",
          subtitle: "ذكاء فوري لـ 1-29 موقعاً",
          description: "للمجموعات التي تتوسع من موقع واحد الى عمليات متعددة المواقع. دورات تحديث كل 4 ساعات وتكامل POS واحد.",
          features: ["تحديث كل 4 ساعات (6 مرات يومياً)", "600 رصيد اساسي + 120 لكل موقع", "30 لوحة مخصصة", "احتفاظ لمدة سنتين", "تكامل POS واحد", "دعم عبر البريد والدردشة والهاتف"],
          bestFor: "1-10 مواقع، محافظ بعلامة واحدة",
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Core Pro",
          badge: "الاكثر شيوعاً",
          subtitle: "مصمم لمحافظ 30-100 موقع",
          description: "للمشغلين متعددي المواقع الذين يحتاجون دورات تحديث اسرع وتوقعات متقدمة عبر العلامات.",
          features: ["تحديث كل ساعتين (12 مرة يومياً)", "1,200 رصيد اساسي + 240 لكل موقع", "75 لوحة مخصصة", "احتفاظ لمدة 3 سنوات", "دعم Multi-POS", "دعم هاتفي مميز (SLA ساعتان)"],
          bestFor: "30-100 موقع، مشغلون متعددو العلامات",
          color: "from-purple-500 to-purple-600",
        },
        {
          name: "Enterprise",
          badge: "تخصيص كامل",
          subtitle: "مصمم لـ 100+ موقع",
          description: "للعمليات الكبيرة التي تحتاج وتيرة تحديث مخصصة، ولوحات غير محدودة، وعلامة بيضاء، وSSO، ودعماً مخصصاً.",
          features: ["وتيرة تحديث مخصصة", "رصيد غير محدود", "لوحات غير محدودة", "احتفاظ مخصص", "علامة بيضاء وSSO ومدير نجاح مخصص", "دعم 24/7 مع SLAs مخصصة"],
          bestFor: "100+ موقع، مؤسسات متعددة العلامات",
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    dimensions: {
      heading: "نموذج الذكاء الرباعي",
      description: "Core يقدم جميع الابعاد الاربعة - وبشكل موسع.",
      items: [
        { dimension: "1D", title: "ماذا حدث", status: "فوري", description: "حقيقة تشغيلية كاملة تحدث كل 2-4 ساعات. رؤية شبه فورية للتدخل داخل الوردية.", icon: "report" as SundaeIconName, color: "from-blue-500 to-blue-600" },
        { dimension: "2D", title: "الخطة مقابل الفعلي", status: "فوري", description: "تتبع فوري لانحرافات الميزانية. تقارير سريعة لفرق المالية. رؤية من بداية الاسبوع حتى اليوم ومن بداية الشهر حتى اليوم.", icon: "marketing" as SundaeIconName, color: "from-purple-500 to-purple-600" },
        { dimension: "3D", title: "سياق السوق", status: "موسع", description: "مجموعة مقارنات كاملة (30+ مقياس). مقارنات المحفظة. سياق تنافسي عبر Watchtower.", icon: "multiLocation" as SundaeIconName, color: "from-green-500 to-green-600" },
        { dimension: "4D", title: "ما التالي", status: "موسع", description: "توقعات 14-30 يوماً. تنبيهات استباقية قبل تفاقم المشكلات. توصيات Sundae Coach مع درجات ثقة.", icon: "growth" as SundaeIconName, color: "from-orange-500 to-orange-600" },
      ],
    },
    pulse: {
      badge: "مضمن مع Core",
      heading: "Pulse: مركز قيادة الوردية",
      description: "شاهد الشذوذات لحظة حدوثها. درّب فريقك في الوقت الحقيقي. تأكد من النتائج قبل انتهاء الوردية.",
      features: [
        { name: "المبيعات والإيقاع", description: "وتيرة المبيعات خلال اليوم، ومؤشرات الاداء، وعرض الاتجاه بالساعة", icon: "chart" as SundaeIconName },
        { name: "العمالة المباشرة", description: "وتيرة العمالة خلال اليوم، وتتبع خطر العمل الاضافي، والالتزام بالاستراحات", icon: "benchmarking" as SundaeIconName },
        { name: "مراقبة التسرب", description: "مراقبة الوقت الحقيقي للإلغاء والتعويض والخصم لكل وردية", icon: "cost" as SundaeIconName },
        { name: "سرعة الخدمة والتدفق", description: "اختناقات الإنتاج، والازدحام، ومقاييس تدفق المطبخ", icon: "speed" as SundaeIconName },
        { name: "ذكاء القائمة", description: "كتالوج الاصناف، ومصفوفة التصنيف (Stars/Plowhorses/Puzzles/Dogs)", icon: "insights" as SundaeIconName },
        { name: "التنبيهات وخطط التشغيل", description: "سير عمل استجابة مؤتمتة يتم تشغيله بواسطة الاستثناءات", icon: "forecasting" as SundaeIconName },
        { name: "Sundae Coach", description: "اشارات تدريب على مستوى الوردية للمبيعات والتسرب والتدفق", icon: "intelligence" as SundaeIconName },
        { name: "لوحة المحفظة", description: "مقارنة اداء متعددة المواقع مع تتبع السلاسل", icon: "multiLocation" as SundaeIconName },
        { name: "وضع اللوحة الجدارية", description: "عرض كامل الشاشة لشاشات المطبخ او الواجهة الامامية", icon: "canvas" as SundaeIconName },
      ],
    },
    integrations: {
      heading: "اربط كل انظمتك",
      description: "Core يتصل عبر 12 مجال بيانات مع اكثر من 80 تكاملاً من الموردين.",
      items: [
        { category: "انظمة POS", examples: "Oracle MICROS Simphony وSquare وToast وClover مع موصلات قاعدة بيانات مباشرة", icon: "integration" as SundaeIconName },
        { category: "العمالة والقوى العاملة", examples: "7shifts وHotSchedules وDeputy", icon: "benchmarking" as SundaeIconName },
        { category: "المخزون والمشتريات", examples: "MarketMan وCraftable وBinWise", icon: "insights" as SundaeIconName },
        { category: "المحاسبة", examples: "QuickBooks وXero وSage وFreshBooks", icon: "finance" as SundaeIconName },
        { category: "الحجوزات", examples: "OpenTable وResy وSevenRooms وTock", icon: "operators" as SundaeIconName },
        { category: "التوصيل والتسويق", examples: "Deliverect وUber Eats وDoorDash وMeta وGoogle Ads وMailchimp", icon: "marketing" as SundaeIconName },
      ],
    },
    modules: {
      heading: "اضف وحدات للذكاء المتخصص",
      description: "عزز Core بوحدات مركزة لتحدياتك التشغيلية المحددة.",
      items: [
        { name: "ذكاء العمالة", description: "تحسين الجدولة في الوقت الحقيقي وتوقع الطلب على العمالة", icon: "benchmarking" as SundaeIconName },
        { name: "ذكاء المخزون", description: "تتبع الهدر في الوقت الحقيقي ومستويات par المؤتمتة", icon: "insights" as SundaeIconName },
        { name: "ذكاء المشتريات", description: "تحسين الاسعار في الوقت الحقيقي ومقارنة الموردين", icon: "marketing" as SundaeIconName },
        { name: "ذكاء التسويق", description: "تتبع الحملات في الوقت الحقيقي ومراقبة CAC", icon: "growth" as SundaeIconName },
        { name: "ذكاء الحجوزات", description: "انماط الحجز في الوقت الحقيقي وتحسين الطاولات", icon: "operators" as SundaeIconName },
      ],
      button: "استعرض كل الوحدات",
    },
    watchtower: {
      heading: "Core + Watchtower = ذكاء كامل",
      description: "Core يخبرك بادائك الان. Watchtower يخبرك بما يحدث حولك. معاً يمنحانك الصورة الكاملة - العمليات الداخلية وسياق السوق الخارجي في طبقة ذكاء واحدة.",
      button: "تعرف على Watchtower",
    },
    faq: {
      heading: "الاسئلة الشائعة",
      items: [
        { q: "ما الفرق بين Core Lite وCore Pro؟", a: "Core Lite: تحديث كل 4 ساعات، 600 رصيد اساسي، 30 لوحة، POS واحد. Core Pro: تحديث كل ساعتين، 1,200 رصيد اساسي، 75 لوحة، ودعم Multi-POS." },
        { q: "هل يمكنني الترقية من Report الى Core؟", a: "نعم. يتم الحفاظ على كل البيانات التاريخية. الانتقال دون فقدان للبيانات." },
        { q: "هل احتاج Core اذا كان لدي 5 مواقع فقط؟", a: "ليس ضرورياً، لكنه موصى به اذا كنت تحتاج سرعة تشغيلية (تحديث كل 2-4 ساعات). Report يعمل جيداً لـ 1-10 مواقع اذا كانت التقارير اليومية كافية." },
        { q: "هل يستطيع Core التعامل مع عدة انظمة POS؟", a: "يدعم Core Pro وEnterprise بيئات Multi-POS. Core Lite يدعم POS واحداً عبر كل المواقع." },
        { q: "هل يمكنني استخدام Core مع Watchtower؟", a: "موصى به بشدة. Core يوفر الذكاء الداخلي، وWatchtower يضيف ذكاء السوق الخارجي لرؤية كاملة." },
        { q: "هل يمكنني استخدام Core مع Modules؟", a: "نعم. جميع الوحدات المتخصصة الخمس تعمل مع Core لتعميق الذكاء في المجالات التشغيلية المحددة." },
      ],
    },
    cta: {
      title: "توقف عن إدارة ارقام الامس",
      description: "شاهد كيف يبدو الذكاء التشغيلي الفوري باستخدام بياناتك الفعلية.",
      primary: "استعرض مستويات Core",
      secondary: "احجز عرضاً",
    },
  },
  fr: {
    hero: {
      badge: "Sundae Core",
      title: "Operations en temps reel. Pas de rapports de fin de journee.",
      description:
        "Connecte a votre POS, a la main-d oeuvre, aux stocks et a tous les systemes qui comptent. Core se rafraichit toutes les 2 a 4 heures pour que vous puissiez agir pendant le service - pas une fois le probleme deja cree.",
      primary: "Explorer les niveaux Core",
      secondary: "Reserver une demo",
    },
    realTime: {
      heading: "La couche d intelligence en temps reel",
      description:
        "Concu pour les exploitants qui ne peuvent pas attendre les rapports de fin de journee. Que vous gériez 10 sites ou 100+, Core vous donne la vitesse pour voir ce qui se passe maintenant, comprendre pourquoi c est important et obtenir des actions recommandees avant que les problemes ne s aggravent.",
      cards: [
        { title: "Predictif, pas reactif", desc: "Recevez des alertes avant que les problemes ne deviennent couteux. Les recommandations de Sundae Coach passent a l action - pas des tableaux qui se mettent a jour plus tard.", icon: "forecasting" as SundaeIconName, color: "from-blue-500 to-blue-600" },
        { title: "Chaque site, une seule vue", desc: "Visibilite unifiee sur tous les sites. Tendances au niveau du portefeuille et detail au niveau du site dans un seul panneau.", icon: "multiLocation" as SundaeIconName, color: "from-purple-500 to-purple-600" },
        { title: "Grandit avec vous", desc: "De 10 a plus de 1,000 sites. Core Lite, Pro ou Enterprise - la plateforme evolue avec vous.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    tiers: {
      eyebrow: "CHOISISSEZ VOTRE NIVEAU",
      heading: "Trois niveaux pour chaque echelle",
      description: "Des operations en croissance aux groupes globaux. Choisissez votre vitesse.",
      bestForLabel: "Ideal pour :",
      viewPrefix: "Voir",
      items: [
        {
          name: "Core Lite",
          badge: "Operations en croissance",
          subtitle: "Intelligence en temps reel pour 1 a 29 sites",
          description: "Pour les groupes qui passent d un seul site a des operations multi-sites. Rafraichissement toutes les 4 heures et une seule integration POS.",
          features: ["Rafraichissement toutes les 4 heures (6 fois/jour)", "600 credits de base + 120/site", "30 tableaux de bord personnalises", "Retention 2 ans", "Une seule integration POS", "Support e-mail, chat et telephone"],
          bestFor: "1 a 10 sites, portefeuilles mono-marque",
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Core Pro",
          badge: "Le plus populaire",
          subtitle: "Optimise pour des portefeuilles de 30 a 100 sites",
          description: "Pour les exploitants multi-sites etablis qui ont besoin de cycles plus rapides et de previsions avancees sur plusieurs marques.",
          features: ["Rafraichissement toutes les 2 heures (12 fois/jour)", "1,200 credits de base + 240/site", "75 tableaux de bord personnalises", "Retention 3 ans", "Support Multi-POS", "Support telephone prioritaire (SLA 2 h)"],
          bestFor: "30 a 100 sites, exploitants multi-marques",
          color: "from-purple-500 to-purple-600",
        },
        {
          name: "Enterprise",
          badge: "Tout sur mesure",
          subtitle: "Concu pour 100+ sites",
          description: "Pour les operations a grande echelle qui necessitent une frequence de rafraichissement sur mesure, des tableaux illimites, le white-label, le SSO et un support dedie.",
          features: ["Frequence de rafraichissement sur mesure", "Credits illimites", "Tableaux illimites", "Retention sur mesure", "White-label, SSO, CSM dedie", "Support 24/7 avec SLA personnalises"],
          bestFor: "100+ sites, groupes multi-marques",
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    dimensions: {
      heading: "Le modele d intelligence 4D",
      description: "Core livre les quatre dimensions - en version etendue.",
      items: [
        { dimension: "1D", title: "Ce qui s est passe", status: "Temps reel", description: "Verite operationnelle complete, mise a jour toutes les 2 a 4 heures. Visibilite quasi temps reel pour intervenir pendant le service.", icon: "report" as SundaeIconName, color: "from-blue-500 to-blue-600" },
        { dimension: "2D", title: "Plan vs reel", status: "Temps reel", description: "Suivi en temps reel des ecarts de budget. Flash reporting pour les equipes finance. Visibilite semaine a date et mois a date.", icon: "marketing" as SundaeIconName, color: "from-purple-500 to-purple-600" },
        { dimension: "3D", title: "Contexte marche", status: "Etendu", description: "Suite complete de benchmarking (30+ indicateurs). Comparaisons de portefeuille. Contexte concurrentiel via Watchtower.", icon: "multiLocation" as SundaeIconName, color: "from-green-500 to-green-600" },
        { dimension: "4D", title: "Et ensuite ?", status: "Etendu", description: "Previsions 14 a 30 jours. Alertes proactives avant que les problemes ne s aggravent. Recommandations Sundae Coach avec scores de confiance.", icon: "growth" as SundaeIconName, color: "from-orange-500 to-orange-600" },
      ],
    },
    pulse: {
      badge: "Inclus avec Core",
      heading: "Pulse : votre centre de commande de service",
      description: "Reperez les anomalies au moment ou elles se produisent. Coachez votre equipe en temps reel. Validez les resultats avant la fin du service.",
      features: [
        { name: "Ventes et cadence", description: "Rythme des ventes intrajournee, KPI et visualisation des tendances horaires", icon: "chart" as SundaeIconName },
        { name: "Main-d oeuvre live", description: "Rythme de la main-d oeuvre, suivi du risque d heures sup et conformite des pauses", icon: "benchmarking" as SundaeIconName },
        { name: "Suivi des fuites", description: "Suivi en temps reel des voids, comps et remises par service", icon: "cost" as SundaeIconName },
        { name: "Vitesse de service et flux", description: "Goulots d etranglement, backlog et mesures de cadence cuisine", icon: "speed" as SundaeIconName },
        { name: "Intelligence menu", description: "Catalogue d articles, matrice de classification (Stars/Plowhorses/Puzzles/Dogs)", icon: "insights" as SundaeIconName },
        { name: "Alertes et playbooks", description: "Workflows de reponse automatises declenches par exception", icon: "forecasting" as SundaeIconName },
        { name: "Sundae Coach", description: "Signaux de coaching au niveau du service pour ventes, fuites et flux", icon: "intelligence" as SundaeIconName },
        { name: "Classement du portefeuille", description: "Comparaison multi-sites avec suivi des series", icon: "multiLocation" as SundaeIconName },
        { name: "Mode wallboard", description: "Affichage plein ecran pour cuisine ou salle", icon: "canvas" as SundaeIconName },
      ],
    },
    integrations: {
      heading: "Connectez tous vos systemes",
      description: "Core se connecte a 12 domaines de donnees avec plus de 80 integrations fournisseurs.",
      items: [
        { category: "Systemes POS", examples: "Oracle MICROS Simphony, Square, Toast, Clover et connecteurs de base de donnees directs", icon: "integration" as SundaeIconName },
        { category: "Main-d oeuvre et personnel", examples: "7shifts, HotSchedules, Deputy", icon: "benchmarking" as SundaeIconName },
        { category: "Stocks et achats", examples: "MarketMan, Craftable, BinWise", icon: "insights" as SundaeIconName },
        { category: "Comptabilite", examples: "QuickBooks, Xero, Sage, FreshBooks", icon: "finance" as SundaeIconName },
        { category: "Reservations", examples: "OpenTable, Resy, SevenRooms, Tock", icon: "operators" as SundaeIconName },
        { category: "Livraison et marketing", examples: "Deliverect, Uber Eats, DoorDash, Meta, Google Ads, Mailchimp", icon: "marketing" as SundaeIconName },
      ],
    },
    modules: {
      heading: "Ajoutez des modules pour une intelligence specialisee",
      description: "Approfondissez Core avec des modules cibles pour vos defis operationnels specifique.",
      items: [
        { name: "Intelligence de la main-d oeuvre", description: "Optimisation des plannings en temps reel, demande previsionnelle de main-d oeuvre", icon: "benchmarking" as SundaeIconName },
        { name: "Intelligence des stocks", description: "Suivi des pertes en temps reel, niveaux par automatiques", icon: "insights" as SundaeIconName },
        { name: "Intelligence des achats", description: "Optimisation des prix en temps reel, comparaison des fournisseurs", icon: "marketing" as SundaeIconName },
        { name: "Intelligence marketing", description: "Suivi des campagnes en temps reel, suivi du CAC", icon: "growth" as SundaeIconName },
        { name: "Intelligence des reservations", description: "Schemas de reservation en temps reel, optimisation des tables", icon: "operators" as SundaeIconName },
      ],
      button: "Explorer tous les modules",
    },
    watchtower: {
      heading: "Core + Watchtower = intelligence complete",
      description: "Core vous dit comment vous performez maintenant. Watchtower vous dit ce qui se passe autour de vous. Ensemble, ils donnent la vue complete - operations internes et contexte marche externe dans une seule couche d intelligence.",
      button: "En savoir plus sur Watchtower",
    },
    faq: {
      heading: "Questions frequentes",
      items: [
        { q: "Quelle est la difference entre Core Lite et Core Pro ?", a: "Core Lite : rafraichissement toutes les 4 heures, 600 credits de base, 30 tableaux, un seul POS. Core Pro : rafraichissement toutes les 2 heures, 1,200 credits de base, 75 tableaux, support Multi-POS." },
        { q: "Puis-je passer de Report a Core ?", a: "Oui. Toutes les donnees historiques sont conservees. La transition se fait sans perte de donnees." },
        { q: "Ai-je besoin de Core si je n ai que 5 sites ?", a: "Pas obligatoire, mais recommande si vous avez besoin de vitesse operationnelle (rafraichissement toutes les 2 a 4 heures). Report fonctionne tres bien pour 1 a 10 sites si les rapports quotidiens suffisent." },
        { q: "Core peut-il gerer plusieurs systemes POS ?", a: "Core Pro et Enterprise prennent en charge les environnements Multi-POS. Core Lite prend en charge un seul POS sur tous les sites." },
        { q: "Puis-je utiliser Core avec Watchtower ?", a: "Fortement recommande. Core fournit l intelligence interne, Watchtower ajoute l intelligence marche externe pour une visibilite complete." },
        { q: "Puis-je utiliser Core avec les Modules ?", a: "Oui. Les 5 modules specialises fonctionnent avec Core pour approfondir l intelligence dans des zones operationnelles specifiques." },
      ],
    },
    cta: {
      title: "Arretez de gerer les chiffres d hier",
      description: "Voyez a quoi ressemble l intelligence operationnelle en temps reel avec vos vraies donnees.",
      primary: "Explorer les niveaux Core",
      secondary: "Reserver une demo",
    },
  },
  es: {
    hero: {
      badge: "Sundae Core",
      title: "Operaciones en tiempo real. No reportes de fin de dia.",
      description:
        "Conectado a tu POS, personal, inventario y cada sistema importante. Core se actualiza cada 2 a 4 horas para que puedas actuar durante el turno - no despues de que ya paso el daño.",
      primary: "Explorar niveles de Core",
      secondary: "Reservar demo",
    },
    realTime: {
      heading: "La vista operativa en tiempo real",
      description:
        "Hecho para operadores que no pueden esperar al cierre del dia. Tanto si gestionas 10 locales como 100+, Core te ayuda a ver lo que pasa ahora, entender por que importa y actuar antes de que los problemas se hagan mas caros.",
      cards: [
        { title: "Predictivo, no reactivo", desc: "Recibe alertas antes de que los problemas se vuelvan costosos. Recomendaciones de Sundae Coach para actuar al momento - no paneles que se actualizan tarde.", icon: "forecasting" as SundaeIconName, color: "from-blue-500 to-blue-600" },
        { title: "Cada local, una sola vista", desc: "Visibilidad unificada en todos los locales. Patrones a nivel cartera y detalle a nivel local en un solo panel.", icon: "multiLocation" as SundaeIconName, color: "from-purple-500 to-purple-600" },
        { title: "Crece contigo", desc: "De 10 a mas de 1,000 locales. Core Lite, Pro o Enterprise - la plataforma escala contigo.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    tiers: {
      eyebrow: "ELIGE TU NIVEL",
      heading: "Tres niveles para cada escala",
      description: "Desde operaciones en crecimiento hasta empresas globales. Elige tu ritmo.",
      bestForLabel: "Ideal para:",
      viewPrefix: "Ver",
      items: [
        {
          name: "Core Lite",
          badge: "Operaciones en crecimiento",
          subtitle: "Inteligencia en tiempo real para 1 a 29 locales",
          description: "Para grupos que escalan de un local a operaciones multi-local. Ciclos de actualizacion de 4 horas y una sola integracion POS.",
          features: ["Actualizacion cada 4 horas (6 veces al dia)", "600 creditos base + 120 por local", "30 paneles personalizados", "Retencion de 2 anos", "Una integracion POS", "Soporte por email, chat y telefono"],
          bestFor: "1 a 10 locales, carteras de una sola marca",
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Core Pro",
          badge: "Mas popular",
          subtitle: "Optimizado para carteras de 30 a 100 locales",
          description: "Para operadores multi-local establecidos que necesitan ciclos de actualizacion mas rapidos y pronosticos avanzados entre marcas.",
          features: ["Actualizacion cada 2 horas (12 veces al dia)", "1,200 creditos base + 240 por local", "75 paneles personalizados", "Retencion de 3 anos", "Soporte Multi-POS", "Soporte telefonico prioritario (SLA de 2 h)"],
          bestFor: "30 a 100 locales, operadores multi-marca",
          color: "from-purple-500 to-purple-600",
        },
        {
          name: "Enterprise",
          badge: "Todo a medida",
          subtitle: "Hecho para 100+ locales",
          description: "Para operaciones a gran escala que requieren frecuencia de actualizacion personalizada, paneles ilimitados, white-label, SSO y soporte dedicado.",
          features: ["Frecuencia de actualizacion personalizada", "Creditos ilimitados", "Paneles ilimitados", "Retencion personalizada", "White-label, SSO, CSM dedicado", "Soporte 24/7 con SLAs personalizados"],
          bestFor: "100+ locales, empresas multi-marca",
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    dimensions: {
      heading: "El modelo de inteligencia 4D",
      description: "Core entrega las cuatro dimensiones - ampliadas.",
      items: [
        { dimension: "1D", title: "Que paso", status: "Tiempo real", description: "Verdad operativa completa, actualizada cada 2 a 4 horas. Visibilidad casi en tiempo real para intervenir durante el turno.", icon: "report" as SundaeIconName, color: "from-blue-500 to-blue-600" },
        { dimension: "2D", title: "Plan vs real", status: "Tiempo real", description: "Seguimiento en tiempo real de la variacion presupuestaria. Flash reporting para equipos financieros. Visibilidad semana a la fecha y mes a la fecha.", icon: "marketing" as SundaeIconName, color: "from-purple-500 to-purple-600" },
        { dimension: "3D", title: "Contexto de mercado", status: "Ampliado", description: "Suite completa de benchmarking (30+ metricas). Comparaciones de cartera. Contexto competitivo via Watchtower.", icon: "multiLocation" as SundaeIconName, color: "from-green-500 to-green-600" },
        { dimension: "4D", title: "Que sigue", status: "Ampliado", description: "Pronosticos de 14 a 30 dias. Alertas proactivas antes de que los problemas escalen. Recomendaciones de Sundae Coach con puntuaciones de confianza.", icon: "growth" as SundaeIconName, color: "from-orange-500 to-orange-600" },
      ],
    },
    pulse: {
      badge: "Incluido con Core",
      heading: "Pulse: tu centro de comando del turno",
      description: "Ve las anomalias en el momento en que suceden. Entrena a tu equipo en tiempo real. Confirma resultados antes de que termine el turno.",
      features: [
        { name: "Ventas e ritmo", description: "Ritmo de ventas intradia, KPI y visualizacion de tendencias por hora", icon: "chart" as SundaeIconName },
        { name: "Labor en vivo", description: "Ritmo laboral intradia, seguimiento del riesgo de horas extra y cumplimiento de descansos", icon: "benchmarking" as SundaeIconName },
        { name: "Monitoreo de fugas", description: "Monitoreo en tiempo real de voids, comps y descuentos por turno", icon: "cost" as SundaeIconName },
        { name: "Velocidad de servicio y flujo", description: "Cuellos de botella, backlog y metricas de ritmo de cocina", icon: "speed" as SundaeIconName },
        { name: "Inteligencia de menu", description: "Catalogo de articulos, matriz de clasificacion (Stars/Plowhorses/Puzzles/Dogs)", icon: "insights" as SundaeIconName },
        { name: "Alertas y playbooks", description: "Workflows de respuesta automatizados activados por excepciones", icon: "forecasting" as SundaeIconName },
        { name: "Sundae Coach", description: "Señales de coaching por turno para ventas, fugas y flujo", icon: "intelligence" as SundaeIconName },
        { name: "Tabla de posiciones de cartera", description: "Comparacion de rendimiento multi-local con seguimiento de rachas", icon: "multiLocation" as SundaeIconName },
        { name: "Modo wallboard", description: "Pantalla completa para cocina o sala", icon: "canvas" as SundaeIconName },
      ],
    },
    integrations: {
      heading: "Conecta todos tus sistemas",
      description: "Core se conecta a 12 dominios de datos con mas de 80 integraciones de proveedores.",
      items: [
        { category: "Sistemas POS", examples: "Oracle MICROS Simphony, Square, Toast, Clover y conectores directos a base de datos", icon: "integration" as SundaeIconName },
        { category: "Labor y fuerza laboral", examples: "7shifts, HotSchedules, Deputy", icon: "benchmarking" as SundaeIconName },
        { category: "Inventario y compras", examples: "MarketMan, Craftable, BinWise", icon: "insights" as SundaeIconName },
        { category: "Contabilidad", examples: "QuickBooks, Xero, Sage, FreshBooks", icon: "finance" as SundaeIconName },
        { category: "Reservas", examples: "OpenTable, Resy, SevenRooms, Tock", icon: "operators" as SundaeIconName },
        { category: "Delivery y marketing", examples: "Deliverect, Uber Eats, DoorDash, Meta, Google Ads, Mailchimp", icon: "marketing" as SundaeIconName },
      ],
    },
    modules: {
      heading: "Agrega modulos para inteligencia especializada",
      description: "Profundiza Core con modulos enfocados para tus desafios operativos especificos.",
      items: [
        { name: "Inteligencia laboral", description: "Optimizacion de horarios en tiempo real y demanda laboral predictiva", icon: "benchmarking" as SundaeIconName },
        { name: "Inteligencia de inventario", description: "Seguimiento de desperdicio en tiempo real y niveles par automatizados", icon: "insights" as SundaeIconName },
        { name: "Inteligencia de compras", description: "Optimizacion de precios en tiempo real y comparacion de proveedores", icon: "marketing" as SundaeIconName },
        { name: "Inteligencia de marketing", description: "Seguimiento de campañas en tiempo real y monitoreo de CAC", icon: "growth" as SundaeIconName },
        { name: "Inteligencia de reservas", description: "Patrones de reserva en tiempo real y optimizacion de mesas", icon: "operators" as SundaeIconName },
      ],
      button: "Explorar todos los modulos",
    },
    watchtower: {
      heading: "Core + Watchtower = inteligencia completa",
      description: "Core te muestra como va la operacion ahora. Watchtower te da el contexto del mercado que la rodea. Juntos te dan una lectura completa para decidir con mas criterio.",
      button: "Saber mas sobre Watchtower",
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { q: "Cual es la diferencia entre Core Lite y Core Pro?", a: "Core Lite: actualizacion cada 4 horas, 600 creditos base, 30 paneles, un solo POS. Core Pro: actualizacion cada 2 horas, 1,200 creditos base, 75 paneles, soporte Multi-POS." },
        { q: "Puedo pasar de Report a Core?", a: "Si. Se conservan todos los datos historicos. La transicion ocurre sin perdida de datos." },
        { q: "Necesito Core si solo tengo 5 locales?", a: "No es obligatorio, pero se recomienda si necesitas velocidad operativa (actualizacion cada 2 a 4 horas). Report funciona muy bien para 1 a 10 locales si los reportes diarios son suficientes." },
        { q: "Core puede manejar varios sistemas POS?", a: "Core Pro y Enterprise admiten entornos Multi-POS. Core Lite admite un solo POS en todos los locales." },
        { q: "Puedo usar Core con Watchtower?", a: "Muy recomendable. Core aporta inteligencia interna y Watchtower añade inteligencia externa de mercado para visibilidad completa." },
        { q: "Puedo usar Core con Modules?", a: "Si. Los 5 modulos especializados funcionan con Core para profundizar la inteligencia en areas operativas especificas." },
      ],
    },
    cta: {
      title: "Deja de gestionar los numeros de ayer",
      description: "Mira como se ve la inteligencia operativa en tiempo real con tus datos reales.",
      primary: "Explorar niveles de Core",
      secondary: "Reservar demo",
    },
  },
} as const;

export default function CoreProductPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = localizedCoreCopy[locale as keyof typeof localizedCoreCopy] ?? localizedCoreCopy.en;
  const coreTiers = ui.tiers.items;
  const fourDimensions = ui.dimensions.items;
  const modules = ui.modules.items;
  const integrations = ui.integrations.items;
  const faqs = ui.faq.items;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge={ui.hero.badge}
        title={ui.hero.title}
        description={ui.hero.description}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="cta"
            size="lg"
            href={PRICING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ui.hero.primary}
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => cta("/demo", "book_demo_core_hero", { page: "/core" })}
          >
            {ui.hero.secondary}
          </Button>
        </div>
      </PageHero>

      {/* The Real-Time Intelligence Layer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.realTime.heading}</h2>
              <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.realTime.description}</p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {ui.realTime.cards.map((item) => (
              <StaggerItem key={item.title}>
                <div className="text-center p-6 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-default)]">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <SundaeIcon name={item.icon} size="lg" className="text-white" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Three Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="eyebrow text-[#60A5FA] mb-4">{ui.tiers.eyebrow}</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.tiers.heading}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.tiers.description}</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="elevated" className="h-full relative">
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`px-4 py-1 bg-gradient-to-r ${tier.color} text-white text-xs font-semibold rounded-full shadow-lg`}>
                        {tier.badge}
                      </span>
                    </div>
                  )}
                    <CardHeader className="pt-8">
                      <CardTitle className="text-2xl text-[var(--text-primary)] mb-2">{tier.name}</CardTitle>
                      <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">{tier.subtitle}</p>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">&#10003;</span>
                            <span className="text-sm text-[var(--text-supporting)]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-4 bg-[var(--surface-faint)] rounded-lg mb-6">
                        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">{ui.tiers.bestForLabel}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{tier.bestFor}</p>
                      </div>
                      <Button
                        variant="primary"
                      size="lg"
                      className="w-full"
                        href={PRICING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ui.tiers.viewPrefix} {tier.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* 4D Intelligence Model */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.dimensions.heading}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.dimensions.description}</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourDimensions.map((dim, index) => (
              <motion.div
                key={dim.dimension}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <div className="text-center mb-4">
                      <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${dim.color} rounded-full items-center justify-center mb-3 shadow-lg`}>
                        <SundaeIcon name={dim.icon} size="xl" className="text-white" />
                      </div>
                      <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">{dim.dimension}</div>
                      <CardTitle className="text-lg text-[var(--text-primary)] mb-2">{dim.title}</CardTitle>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(34,197,94,0.15)] text-[#22C55E]">
                        &#10003; {dim.status}
                      </span>
                    </div>
                    <CardDescription className="text-center text-sm">
                      {dim.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse — Included with Core */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-[rgba(168,85,247,0.15)] text-purple-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <SundaeIcon name="pulse" size="md" />
                <span>{ui.pulse.badge}</span>
              </span>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.pulse.heading}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.pulse.description}</p>
            </div>
          </FadeUp>

          <div className="max-w-4xl mx-auto mb-12">
            <PulseDashboardMockup />
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ui.pulse.features.map((feature) => (
              <StaggerItem key={feature.name}>
                <div className="flex items-start gap-3 p-4 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-default)] h-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name={feature.icon} size="md" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{feature.name}</h3>
                    <p className="text-xs text-[var(--text-supporting)] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.integrations.heading}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.integrations.description}</p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <StaggerItem key={integration.category}>
                <div className="p-6 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-default)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={integration.icon} size="md" className="text-white" />
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{integration.category}</h3>
                  </div>
                  <p className="text-sm text-[var(--text-supporting)]">{integration.examples}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Add Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.modules.heading}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.modules.description}</p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {modules.map((mod) => (
              <StaggerItem key={mod.name}>
                <div className="flex items-start gap-3 p-5 bg-[var(--surface-faint)] rounded-xl border border-[var(--border-default)] h-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name={mod.icon} size="md" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{mod.name}</h3>
                    <p className="text-sm text-[var(--text-supporting)]">{mod.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => cta("/insights", "explore_modules_from_core", { page: "/core" })}
            >
              {ui.modules.button} →
            </Button>
          </div>
        </div>
      </section>

      {/* Core + Watchtower */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--surface-subtle)] to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative">
          <FadeUp>
            <div className="w-16 h-16 bg-[var(--surface-emphasis)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <SundaeIcon name="watchtower" size="xl" className="text-[var(--text-primary)]" />
            </div>
            <h2 className="section-h2 mb-6">
              {ui.watchtower.heading}
            </h2>
            <p className="body-xl text-[var(--text-supporting)] mb-8 max-w-3xl mx-auto">{ui.watchtower.description}</p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => cta("/product/watchtower", "learn_watchtower_from_core", { page: "/core" })}
            >
              {ui.watchtower.button} →
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.faq.heading}</h2>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-[var(--surface-faint)] rounded-xl border border-[var(--border-default)]">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">{faq.q}</h3>
                <p className="text-[var(--text-supporting)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title={ui.cta.title}
        description={ui.cta.description}
      >
        <Button variant="cta" size="lg" href={PRICING_URL} target="_blank" rel="noopener noreferrer">
          {ui.cta.primary}
        </Button>
        <Button
          variant="outline-light"
          size="lg"
          onClick={() => cta("/demo", "book_demo_from_core", { page: "/core" })}
        >
          {ui.cta.secondary}
        </Button>
      </PageCTA>
    </div>
  );
}
