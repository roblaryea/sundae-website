'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { galleryHeading } from "@/components/home/sections/galleryHeadingsCopy";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import {
  CORE_PACKAGES_BY_ID,
  describeBands,
  usd,
  type CorePackageId,
} from '@/lib/pricing/priceBook'
import { generatedLocalCopy } from '@/generated-locales/app_core_page'
import { CreamBreak } from "@/components/ui/CreamBreak";
import { coreCreamCopy } from "./coreCreamCopy";

const localizedCoreCopy = {
  en: {
    hero: {
      badge: "Sundae Core",
      title: 'Same-Shift Operations. Not End-of-Day Reports.',
      description:
        "Connected to your POS, labor, inventory, and every system that matters. Core refreshes through the trading day - typically every 2-4 hours, and faster where a source supports it - so you act during the shift, not after the damage is done.",
      primary: "Explore Core Tiers",
      secondary: "Book a Demo",
    },
    realTime: {
      heading: "The Same-Shift Intelligence Layer",
      description:
        "Built for operators who can't wait for end-of-day reports. Whether you manage 10 locations or 100+, Core gives you the speed to see what's happening now, understand why it matters, and get recommended actions before problems escalate.",
      cards: [
        { title: "Predictive, Not Reactive", desc: "Get alerts before problems become expensive. Sundae Coach recommendations for immediate action - not dashboards that update.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { title: "Every Location, One View", desc: "Unified visibility across all locations. Portfolio-level patterns and location-level detail in a single pane.", icon: "multiLocation" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { title: "Grows With You", desc: "From one location to a thousand. The package sets the depth; the location bands set the price as you add sites.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    solves: {
      eyebrow: "WHERE THE MARGIN GOES",
      heading: "Four places profit leaks. Your package decides which ones you close.",
      description: "Start from the loss, not the licence. Each package covers a different set of the four - Core Performance covers all of them.",
      areas: [
        { title: "Revenue & Profit", loss: "Voids, comps, discounts and mispriced items that never show up as a line you can question.", covered: "Revenue and profit intelligence, revenue assurance, item-level contribution.", icon: "cost" as SundaeIconName },
        { title: "Food & Supply", loss: "The gap between what you ordered, what you used and what you sold - waste, variance and vendor price drift.", covered: "Inventory and purchasing intelligence, theoretical versus actual usage, supplier movement.", icon: "insights" as SundaeIconName },
        { title: "Guest & Market", loss: "Covers that never arrive, guests who do not return, and channel margin eaten after commission.", covered: "Guest experience and CRM, reservations, delivery economics, marketing attribution, peer benchmarks.", icon: "operators" as SundaeIconName },
        { title: "Foresight & Action", loss: "Decisions taken late, on last month's numbers, with no way to tell afterwards whether they worked.", covered: "Forecasting, scenario modelling and the approve-in-the-loop action layer. An expansion on top of Core.", icon: "forecasting" as SundaeIconName },
      ],
    },
    tiers: {
      eyebrow: "CHOOSE YOUR PACKAGE",
      heading: "Four Core packages",
      description: "Each package covers a different set of the four areas. Pick the one that matches where your margin is going.",
      bestForLabel: "Best for:",
      viewPrefix: "See",
      priceLabel: "first location / month",
      bandsLabel: "Then, per additional location",
      walletLabel: "AI credits / month",
      items: [
        {
          packageId: "core_foundation" as CorePackageId,
          areas: "Covers Revenue & Profit",
          name: "Core Foundation",
          badge: "Start here",
          subtitle: "The operating baseline",
          description: "One place to decide from, over POS, labor, cost and operations, refreshed while the shift is still running.",
          bestFor: "Groups getting off spreadsheets and disconnected dashboards",
          color: "from-[#FF7E6F] to-[#FF5C4D]",
        },
        {
          packageId: "core_margin" as CorePackageId,
          areas: "Covers Revenue & Profit, Food & Supply",
          name: "Core Margin",
          badge: "Most Popular",
          subtitle: "Depth on cost and leakage",
          description: "Theoretical vs. actual usage, waste, shrinkage, voids and comps, and item-level contribution.",
          bestFor: "Operators whose margin is leaking faster than they can see it",
          color: "from-[#F2B45C] to-[#C2410C]",
        },
        {
          packageId: "core_growth" as CorePackageId,
          areas: "Covers Revenue & Profit, Guest & Market",
          name: "Core Growth",
          badge: "Demand side",
          subtitle: "Depth on demand",
          description: "Guest cohorts and lifetime value, promo attribution by channel, delivery margin after commission.",
          bestFor: "Groups pushing on repeat revenue and channel mix",
          color: "from-[#E9A24A] to-[#F2C078]",
        },
        {
          packageId: "core_performance" as CorePackageId,
          areas: "Covers all four areas, incl. Foresight & Action",
          name: "Core Performance",
          badge: "Full depth",
          subtitle: "Multi-brand, multi-region",
          description: "Consolidation across brands and regions, cross-module correlation, governed access with audit trails.",
          bestFor: "Large groups running several brands or several markets",
          color: "from-orange-500 to-orange-600",
        },
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
        { name: "Flow", description: "Throughput bottlenecks, backlog, and kitchen pacing metrics", icon: "speed" as SundaeIconName },
        { name: "Menu Intelligence", description: "Item catalog, classification matrix (Stars/Plowhorses/Puzzles/Dogs)", icon: "insights" as SundaeIconName },
        { name: "Alerts & Playbooks", description: "Automated response workflows triggered by exceptions", icon: "forecasting" as SundaeIconName },
        { name: "Sundae Coach", description: "Shift-level coaching signals for Sales, Leakage, and Flow", icon: "intelligence" as SundaeIconName },
        { name: "Portfolio Leaderboard", description: "Multi-outlet performance comparison with streak tracking", icon: "multiLocation" as SundaeIconName },
        { name: "Wallboard Mode", description: "Full-screen display for kitchen or front-of-house screens", icon: "canvas" as SundaeIconName },
      ],
    },
    integrations: {
      heading: "Connect All Your Systems",
      description: "Core connects across 12 data domains with 200+ vendor integrations.",
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
        { name: "Labor Intelligence", description: "Same-shift schedule optimization, predictive labor demand", icon: "benchmarking" as SundaeIconName },
        { name: "Inventory Intelligence", description: "Same-shift waste tracking, automated par levels", icon: "insights" as SundaeIconName },
        { name: "Purchasing Intelligence", description: "Price movement tracking, vendor comparison", icon: "marketing" as SundaeIconName },
        { name: "Marketing Intelligence", description: "Same-shift campaign tracking, CAC monitoring", icon: "growth" as SundaeIconName },
        { name: "Reservations Intelligence", description: "Same-shift booking patterns, table optimization", icon: "operators" as SundaeIconName },
      ],
      button: "Explore All Modules",
    },
    watchtower: {
      heading: "Watchtower brings the outside world into Core",
      description: "Core tells you how you're performing right now. Watchtower tells you what's happening around you. Together, they give you the complete picture - internal operations and external market context in one intelligence layer.",
      button: "Learn About Watchtower",
    },
    faq: {
      heading: "Frequently Asked Questions",
      items: [
        { q: "How do the four Core packages differ?", a: "They cover different areas, not the same ground at different depths. Foundation is the operating baseline; Margin adds cost and leakage depth; Growth adds guest, promo and channel depth; Performance adds multi-brand and multi-region consolidation with governed access." },
        { q: "Can I move up a package later?", a: "Yes. Your full connected history is preserved and nothing is re-onboarded - you change the depth, not the data." },
        { q: "Is Core worth it at five locations?", a: "Yes. Five locations carry the package anchor and the first band, and get the same coverage a fifty-location group gets. The location bands only start to matter as you add sites." },
        { q: "Can Core handle multiple POS systems?", a: "Yes. Core connects across mixed POS estates, and Core Performance adds consolidation across brands and regions on top." },
        { q: "Can I use Core with Watchtower?", a: "Highly recommended. Core provides internal intelligence, Watchtower adds external market intelligence for complete visibility." },
        { q: "Can I use Core with Modules?", a: "Yes. All 5 specialized modules work with Core to deepen intelligence in specific operational areas." },
      ],
    },
    cta: {
      title: "Stop Managing Yesterday's Numbers",
      description: "See what same-shift operational intelligence looks like against your actual data.",
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
        { title: "استباقي لا تفاعلي", desc: "تنبيهات قبل ان تتحول المشكلات الى تكلفة. توصيات Sundae Coach للعمل الفوري - لا لوحات تحكم تتحدث متأخرة.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { title: "كل موقع في عرض واحد", desc: "رؤية موحدة عبر كل المواقع. أنماط على مستوى المحفظة وتفاصيل على مستوى الموقع في لوحة واحدة.", icon: "multiLocation" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { title: "ينمو معك", desc: "من موقع واحد إلى ألف. الباقة تحدد العمق، وشرائح المواقع تحدد السعر كلما أضفت موقعًا.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    solves: {
      eyebrow: "أين يذهب الهامش",
      heading: "أربعة مواضع يتسرب منها الربح. وباقتك تحدد أيها تُغلق.",
      description: "ابدأ من الخسارة لا من الترخيص. كل باقة تغطي مجموعة مختلفة من المواضع الأربعة، وCore Performance يغطيها جميعاً.",
      areas: [
        { title: "الإيراد والربح", loss: "إلغاءات ومجانيات وخصومات وأصناف مسعّرة خطأً لا تظهر أبداً كبند يمكنك مساءلته.", covered: "ذكاء الإيراد والربح، وضمان الإيراد، ومساهمة كل صنف.", icon: "cost" as SundaeIconName },
        { title: "الطعام والتوريد", loss: "الفجوة بين ما طلبته وما استُهلك وما بِيع - هدر وانحراف وتغيّر أسعار المورّدين.", covered: "ذكاء المخزون والمشتريات، والاستهلاك النظري مقابل الفعلي، وحركة المورّدين.", icon: "insights" as SundaeIconName },
        { title: "الضيف والسوق", loss: "حجوزات لا تصل، وضيوف لا يعودون، وهامش قناة يلتهمه العمولة.", covered: "تجربة الضيف وCRM، والحجوزات، واقتصاديات التوصيل، وإسناد التسويق، ومقارنات النظراء.", icon: "operators" as SundaeIconName },
        { title: "الاستشراف والتنفيذ", loss: "قرارات تُتخذ متأخرة، بأرقام الشهر الماضي، دون طريقة لمعرفة إن كانت قد نجحت.", covered: "التوقّع ونمذجة السيناريوهات وطبقة التنفيذ باعتماد بشري. توسعة فوق Core.", icon: "forecasting" as SundaeIconName },
      ],
    },
    tiers: {
      eyebrow: "اختر باقتك",
      heading: "أربع باقات Core",
      description: "كل باقة تغطي مجموعة مختلفة من المجالات الأربعة. اختر ما يناسب المكان الذي يتسرب منه هامشك.",
      bestForLabel: "الانسب لـ:",
      viewPrefix: "عرض",
      priceLabel: "للموقع الأول شهريًا",
      bandsLabel: "ثم لكل موقع إضافي",
      walletLabel: "رصيد ذكاء شهريًا",
      items: [
        {
          packageId: "core_foundation" as CorePackageId,
          areas: "يغطي الإيراد والربح",
          name: "Core Foundation",
          badge: "ابدأ هنا",
          subtitle: "الأساس التشغيلي",
          description: "ركيزة قرار واحدة فوق نقاط البيع والعمالة والتكلفة والعمليات، تتحدّث والوردية ما زالت قائمة.",
          bestFor: "المجموعات المنتقلة من الجداول ولوحات المعلومات المتفرقة",
          color: "from-[#FF7E6F] to-[#FF5C4D]",
        },
        {
          packageId: "core_margin" as CorePackageId,
          areas: "يغطي الإيراد والربح، والطعام والتوريد",
          name: "Core Margin",
          badge: "الأكثر شيوعًا",
          subtitle: "عمق في التكلفة والتسرب",
          description: "الاستهلاك النظري مقابل الفعلي، والهدر، والفاقد، والإلغاءات والمجانيات، ومساهمة كل صنف.",
          bestFor: "المشغلون الذين يتسرب هامشهم أسرع مما يرون",
          color: "from-[#F2B45C] to-[#C2410C]",
        },
        {
          packageId: "core_growth" as CorePackageId,
          areas: "يغطي الإيراد والربح، والضيف والسوق",
          name: "Core Growth",
          badge: "جانب الطلب",
          subtitle: "عمق في الطلب",
          description: "شرائح الضيوف وقيمتهم مدى الحياة، وإسناد العروض حسب القناة، وهامش التوصيل بعد العمولة.",
          bestFor: "المجموعات التي تركز على الإيراد المتكرر ومزيج القنوات",
          color: "from-[#E9A24A] to-[#F2C078]",
        },
        {
          packageId: "core_performance" as CorePackageId,
          areas: "يغطي المجالات الأربعة، بما فيها الاستشراف والتنفيذ",
          name: "Core Performance",
          badge: "العمق الكامل",
          subtitle: "متعدد العلامات والأسواق",
          description: "التجميع عبر العلامات والمناطق، والترابط بين الوحدات، ووصول محوكم بسجل تدقيق.",
          bestFor: "المجموعات الكبيرة التي تدير عدة علامات أو عدة أسواق",
          color: "from-orange-500 to-orange-600",
        },
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
      heading: "Watchtower يُدخل العالم الخارجي إلى Core",
      description: "Core يخبرك بادائك الان. Watchtower يخبرك بما يحدث حولك. معاً يمنحانك الصورة الكاملة - العمليات الداخلية وسياق السوق الخارجي في طبقة ذكاء واحدة.",
      button: "تعرف على Watchtower",
    },
    faq: {
      heading: "الاسئلة الشائعة",
      items: [
        { q: "ما الفرق بين باقات Core الأربع؟", a: "الباقات تغطي مجالات مختلفة، لا المجال نفسه بأعماق مختلفة. Foundation هي الأساس التشغيلي، وMargin تضيف عمق التكلفة والتسرب، وGrowth تضيف عمق الضيوف والعروض والقنوات، وPerformance تضيف التجميع متعدد العلامات والمناطق مع وصول محوكم." },
        { q: "هل يمكنني الانتقال إلى باقة أعلى لاحقاً؟", a: "نعم. يُحفَظ تاريخك المتصل بالكامل ولا يُعاد أي إعداد - أنت تغيّر العمق لا البيانات." },
        { q: "هل تستحق Core العناء عند خمسة مواقع؟", a: "نعم. الخمسة مواقع تحمل مرتكز الباقة والنطاق الأول، وتحصل على التغطية نفسها التي تحصل عليها مجموعة من خمسين موقعاً. ونطاقات المواقع لا تبدأ في التأثير إلا مع إضافة مواقع." },
        { q: "هل يستطيع Core التعامل مع عدة انظمة POS؟", a: "نعم. يتصل Core بأنظمة POS المختلطة، وتضيف Core Performance فوق ذلك التجميع عبر العلامات والمناطق." },
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
        { title: "Predictif, pas reactif", desc: "Recevez des alertes avant que les problemes ne deviennent couteux. Les recommandations de Sundae Coach passent a l action - pas des tableaux qui se mettent a jour plus tard.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { title: "Chaque site, une seule vue", desc: "Visibilite unifiee sur tous les sites. Tendances au niveau du portefeuille et detail au niveau du site dans un seul panneau.", icon: "multiLocation" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { title: "Grandit avec vous", desc: "D un site a un millier. L offre fixe la profondeur, les tranches de sites fixent le prix a mesure que vous ajoutez.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    solves: {
      eyebrow: "OU PART LA MARGE",
      heading: "Quatre endroits où le profit fuit. Votre offre décide lesquels vous fermez.",
      description: "Partez de la perte, pas de la licence. Chaque offre couvre un ensemble différent des quatre - Core Performance les couvre tous.",
      areas: [
        { title: "Revenu & Profit", loss: "Annulations, offerts, remises et articles mal tarifes qui n'apparaissent jamais comme une ligne que vous pouvez interroger.", covered: "Intelligence revenu et profit, revenue assurance, contribution par article.", icon: "cost" as SundaeIconName },
        { title: "Nourriture & Approvisionnement", loss: "L'ecart entre ce que vous avez commande, consomme et vendu - gaspillage, ecarts et derive des prix fournisseurs.", covered: "Intelligence stocks et achats, consommation theorique contre reelle, mouvements fournisseurs.", icon: "insights" as SundaeIconName },
        { title: "Client & Marche", loss: "Des couverts qui n'arrivent jamais, des clients qui ne reviennent pas, et une marge de canal mangee par la commission.", covered: "Experience client et CRM, reservations, economie de la livraison, attribution marketing, benchmarks pairs.", icon: "operators" as SundaeIconName },
        { title: "Foresight & Action", loss: "Des decisions prises tard, sur les chiffres du mois dernier, sans moyen de savoir ensuite si elles ont marche.", covered: "Prevision, modelisation de scenarios et couche d'action avec validation humaine. Une expansion au-dessus de Core.", icon: "forecasting" as SundaeIconName },
      ],
    },
    tiers: {
      eyebrow: "CHOISISSEZ VOTRE OFFRE",
      heading: "Quatre offres Core",
      description: "Chaque offre couvre un ensemble différent des quatre domaines. Choisissez celle qui correspond à l'endroit où part votre marge.",
      bestForLabel: "Ideal pour :",
      viewPrefix: "Voir",
      priceLabel: "premier site / mois",
      bandsLabel: "Puis, par site additionnel",
      walletLabel: "credits IA / mois",
      items: [
        {
          packageId: "core_foundation" as CorePackageId,
          areas: "Couvre Revenu & Profit",
          name: "Core Foundation",
          badge: "Commencez ici",
          subtitle: "Le socle operationnel",
          description: "Une seule base de decision sur le POS, la main-d oeuvre, les couts et l exploitation, rafraichie pendant le service.",
          bestFor: "Les groupes qui quittent les tableurs et les dashboards eparpilles",
          color: "from-[#FF7E6F] to-[#FF5C4D]",
        },
        {
          packageId: "core_margin" as CorePackageId,
          areas: "Couvre Revenu & Profit, Nourriture & Approvisionnement",
          name: "Core Margin",
          badge: "Le plus populaire",
          subtitle: "Profondeur sur les couts et les pertes",
          description: "Theorique contre reel, gaspillage, demarque, annulations et offerts, contribution par article.",
          bestFor: "Les exploitants dont la marge fuit plus vite qu ils ne la voient",
          color: "from-[#F2B45C] to-[#C2410C]",
        },
        {
          packageId: "core_growth" as CorePackageId,
          areas: "Couvre Revenu & Profit, Client & Marché",
          name: "Core Growth",
          badge: "Cote demande",
          subtitle: "Profondeur sur la demande",
          description: "Cohortes clients et valeur vie, attribution des promos par canal, marge livraison apres commission.",
          bestFor: "Les groupes qui poussent le revenu recurrent et le mix de canaux",
          color: "from-[#E9A24A] to-[#F2C078]",
        },
        {
          packageId: "core_performance" as CorePackageId,
          areas: "Couvre les quatre domaines, dont Foresight & Action",
          name: "Core Performance",
          badge: "Profondeur complete",
          subtitle: "Multi-marques, multi-regions",
          description: "Consolidation entre marques et regions, correlation inter-modules, acces gouverne avec pistes d audit.",
          bestFor: "Les grands groupes qui operent plusieurs marques ou plusieurs marches",
          color: "from-orange-500 to-orange-600",
        },
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
      heading: "Watchtower fait entrer le monde exterieur dans Core",
      description: "Core vous dit comment vous performez maintenant. Watchtower vous dit ce qui se passe autour de vous. Ensemble, ils donnent la vue complete - operations internes et contexte marche externe dans une seule couche d intelligence.",
      button: "En savoir plus sur Watchtower",
    },
    faq: {
      heading: "Questions frequentes",
      items: [
        { q: "Quelle est la difference entre les quatre offres Core ?", a: "Les offres couvrent des domaines differents, et non le meme perimetre a des profondeurs differentes. Foundation est le socle operationnel, Margin ajoute la profondeur couts et pertes, Growth la profondeur client, promo et canal, Performance la consolidation multi-marques et multi-regions avec acces gouverne." },
        { q: "Puis-je passer a une offre superieure plus tard ?", a: "Oui. Tout votre historique connecte est conserve et rien n est re-onboarde : vous changez la profondeur, pas les donnees." },
        { q: "Core vaut-il le coup a cinq sites ?", a: "Oui. Cinq sites portent l ancrage de l offre et le premier palier, et recoivent la meme couverture qu un groupe de cinquante. Les paliers par site ne comptent qu a partir du moment ou vous en ajoutez." },
        { q: "Core peut-il gerer plusieurs systemes POS ?", a: "Oui. Core se connecte a des parcs POS heterogenes, et Core Performance ajoute par-dessus la consolidation entre marques et regions." },
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
        { title: "Predictivo, no reactivo", desc: "Recibe alertas antes de que los problemas se vuelvan costosos. Recomendaciones de Sundae Coach para actuar al momento - no paneles que se actualizan tarde.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { title: "Cada local, una sola vista", desc: "Visibilidad unificada en todos los locales. Patrones a nivel cartera y detalle a nivel local en un solo panel.", icon: "multiLocation" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { title: "Crece contigo", desc: "De un local a mil. El paquete marca la profundidad y los tramos de locales marcan el precio segun anades sitios.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    solves: {
      eyebrow: "DONDE SE VA EL MARGEN",
      heading: "Cuatro sitios por donde se fuga el beneficio. Tu paquete decide cuáles cierras.",
      description: "Empieza por la pérdida, no por la licencia. Cada paquete cubre un conjunto distinto de los cuatro; Core Performance los cubre todos.",
      areas: [
        { title: "Ingresos y Beneficio", loss: "Anulaciones, invitaciones, descuentos y articulos mal tarifados que nunca aparecen como una linea que puedas cuestionar.", covered: "Inteligencia de ingresos y beneficio, revenue assurance, contribucion por articulo.", icon: "cost" as SundaeIconName },
        { title: "Comida y Suministro", loss: "La brecha entre lo que pediste, lo que usaste y lo que vendiste: merma, desviacion y deriva de precios de proveedor.", covered: "Inteligencia de inventario y compras, consumo teorico frente a real, movimiento de proveedores.", icon: "insights" as SundaeIconName },
        { title: "Cliente y Mercado", loss: "Comensales que no llegan, clientes que no vuelven y margen de canal comido por la comision.", covered: "Experiencia de cliente y CRM, reservas, economia del delivery, atribucion de marketing, benchmarks de pares.", icon: "operators" as SundaeIconName },
        { title: "Foresight & Action", loss: "Decisiones tomadas tarde, con las cifras del mes pasado, sin forma de saber despues si funcionaron.", covered: "Prevision, modelado de escenarios y la capa de accion con aprobacion humana. Una expansion sobre Core.", icon: "forecasting" as SundaeIconName },
      ],
    },
    tiers: {
      eyebrow: "ELIGE TU PAQUETE",
      heading: "Cuatro paquetes Core",
      description: "Cada paquete cubre un conjunto distinto de las cuatro áreas. Elige el que se ajuste a por dónde se va tu margen.",
      bestForLabel: "Ideal para:",
      viewPrefix: "Ver",
      priceLabel: "primer local / mes",
      bandsLabel: "Despues, por local adicional",
      walletLabel: "creditos de IA / mes",
      items: [
        {
          packageId: "core_foundation" as CorePackageId,
          areas: "Cubre Ingresos y Beneficio",
          name: "Core Foundation",
          badge: "Empieza aqui",
          subtitle: "La base operativa",
          description: "Un unico sustrato de decision sobre POS, personal, costes y operacion, actualizado con el turno todavia en marcha.",
          bestFor: "Grupos que dejan atras hojas de calculo y paneles sueltos",
          color: "from-[#FF7E6F] to-[#FF5C4D]",
        },
        {
          packageId: "core_margin" as CorePackageId,
          areas: "Cubre Ingresos y Beneficio, Comida y Suministro",
          name: "Core Margin",
          badge: "Mas popular",
          subtitle: "Profundidad en coste y fuga",
          description: "Teorico frente a real, merma, desperdicio, anulaciones e invitaciones, contribucion por articulo.",
          bestFor: "Operadores cuyo margen se fuga mas rapido de lo que pueden ver",
          color: "from-[#F2B45C] to-[#C2410C]",
        },
        {
          packageId: "core_growth" as CorePackageId,
          areas: "Cubre Ingresos y Beneficio, Cliente y Mercado",
          name: "Core Growth",
          badge: "Lado demanda",
          subtitle: "Profundidad en demanda",
          description: "Cohortes de clientes y valor de vida, atribucion de promociones por canal, margen de delivery tras comision.",
          bestFor: "Grupos que empujan el ingreso recurrente y el mix de canales",
          color: "from-[#E9A24A] to-[#F2C078]",
        },
        {
          packageId: "core_performance" as CorePackageId,
          areas: "Cubre las cuatro áreas, incl. Foresight & Action",
          name: "Core Performance",
          badge: "Profundidad completa",
          subtitle: "Multimarca, multirregion",
          description: "Consolidacion entre marcas y regiones, correlacion entre modulos, acceso gobernado con auditoria.",
          bestFor: "Grupos grandes que operan varias marcas o varios mercados",
          color: "from-orange-500 to-orange-600",
        },
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
      heading: "Watchtower trae el mundo exterior a Core",
      description: "Core te muestra como va la operacion ahora. Watchtower te da el contexto del mercado que la rodea. Juntos te dan una lectura completa para decidir con mas criterio.",
      button: "Saber mas sobre Watchtower",
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { q: "En que se diferencian los cuatro paquetes Core?", a: "Cubren areas distintas, no el mismo terreno a distintas profundidades. Foundation es la base operativa, Margin anade profundidad de coste y fuga, Growth anade profundidad de cliente, promocion y canal, y Performance anade consolidacion multimarca y multirregion con acceso gobernado." },
        { q: "Puedo subir de paquete mas adelante?", a: "Si. Se conserva todo tu historico conectado y no se vuelve a incorporar nada: cambias la profundidad, no los datos." },
        { q: "Merece la pena Core con cinco locales?", a: "Si. Cinco locales soportan el anclaje del paquete y el primer tramo, y reciben la misma cobertura que un grupo de cincuenta. Los tramos por local solo empiezan a importar cuando anades sitios." },
        { q: "Core puede manejar varios sistemas POS?", a: "Si. Core se conecta a parques POS mixtos, y Core Performance anade encima la consolidacion entre marcas y regiones." },
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
  const ui = localizedCoreCopy[locale as keyof typeof localizedCoreCopy] ?? getGeneratedLocalCopy(localizedCoreCopy, generatedLocalCopy.localizedCoreCopy, locale) ?? localizedCoreCopy.en;
  const cream = coreCreamCopy[locale as keyof typeof coreCreamCopy] ?? coreCreamCopy.en;
  const coreTiers = ui.tiers.items;
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

      {/* My Sundae - what an operator actually opens. Placed directly after the
          hero because it is the first screen of the product, not a feature of it. */}
      <section className="pt-14 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <ThemedShot
              framed
              width={1600}
              height={1000}
              dark="/images/product/2026-fresh/my-sundae-dark.png"
              light="/images/product/2026-fresh/my-sundae.png"
              alt="My Sundae: the personalised daily home, showing what needs attention today, the shift spine with what is open and what is still to come, and the estate broken down by concept"
            />
          </FadeUp>
        </div>
      </section>

      {/* The Same-Shift Intelligence Layer */}
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

      {/* Cream relief - early warm break before the long dark capability stretch (the volume system) */}
      <CreamBreak eyebrow={cream.eyebrow} statement={cream.statement} lede={cream.lede} />

      {/* What Core solves - the four places margin leaks. Leads the page so a
          buyer meets the economic problem before the package architecture. */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="eyebrow mb-4">{ui.solves.eyebrow}</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.solves.heading}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.solves.description}</p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ui.solves.areas.map((area, index) => (
              <FadeUp key={area.title} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF7E6F] to-[#FF5C4D] flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name={area.icon} size="md" className="text-white" />
                    </div>
                    <h3 className="section-h3 text-[var(--text-display)]">{area.title}</h3>
                  </div>
                  <p className="body-base text-[var(--text-supporting)] mb-4">{area.loss}</p>
                  <p className="body-sm text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--text-primary)]">Core covers it with </span>
                    {area.covered}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


      {/* Pulse - Included with Core */}
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
            <ThemedShot
              framed
              width={1600}
              height={1000}
              dark="/images/product/2026-fresh/pulse-sales-dark.png"
              light="/images/product/2026-fresh/pulse-sales.png"
              alt="Pulse - live shift command center: actual vs target pacing, end-of-day projection, and net sales, covers, and average check"
            />
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ui.pulse.features.map((feature) => (
              <StaggerItem key={feature.name}>
                <div className="flex items-start gap-3 p-4 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-default)] h-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F2B45C] to-[#C2410C] rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF7E6F] to-purple-600 rounded-lg flex items-center justify-center">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF7E6F] to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
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


      {/* Three Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="eyebrow mb-4">{ui.tiers.eyebrow}</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.tiers.heading}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.tiers.description}</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {coreTiers.map((tier, index) => {
              // Prices are read from the v1.7 price book, never from copy.
              // Core packages are marginal-band SKUs: a first-location anchor
              // plus a stepped rate per additional location. There is no flat
              // per-location rate and no included-locations allowance.
              const pkg = CORE_PACKAGES_BY_ID[tier.packageId as CorePackageId];
              return (
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
                      <div className="mb-3">
                        <span className="text-3xl font-bold text-[var(--text-primary)] tabular-nums">
                          {usd(pkg.firstUnitMonthly)}
                        </span>
                        <p className="text-xs text-[var(--text-muted)]">{ui.tiers.priceLabel}</p>
                      </div>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 rounded-lg border border-[var(--border-default)] p-3">
                        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                          {ui.tiers.bandsLabel}
                        </p>
                        <p className="text-sm text-[var(--text-secondary)] tabular-nums">
                          {describeBands(pkg)}
                        </p>
                      </div>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">&#10003;</span>
                          <span className="text-sm text-[var(--text-supporting)]">
                            {pkg.aiCreditWallet.toLocaleString('en-US')} {ui.tiers.walletLabel}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">&#10003;</span>
                          <span className="text-sm text-[var(--text-supporting)]">{tier.areas}</span>
                        </li>
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
              );
            })}
          </div>
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

      {/* Product gallery - Core surfaces in detail */}
      <SectionProductGallery
        productFilter="/core"
        hideFilter
        headingOverride={galleryHeading("core", locale)}
      />

      {/* CTA */}
      <PageCTA
        title={ui.cta.title}
        description={ui.cta.description}
      >
        <Button variant="cta" size="lg" href={PRICING_URL} target="_blank" rel="noopener noreferrer">
          {ui.cta.primary}
        </Button>
        <Button
          variant="outline-ink"
          size="lg"
          onClick={() => cta("/demo", "book_demo_from_core", { page: "/core" })}
        >
          {ui.cta.secondary}
        </Button>
      </PageCTA>
    </div>
  );
}
