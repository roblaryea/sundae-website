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
      title: 'Find the Leak. Recover the Profit.',
      description:
        "Connected to your POS, labor, inventory, and every system that matters. Core finds the profit leak, routes the fix to an accountable owner, and measures the recovered margin against a baseline.",
      primary: "Explore Core Tiers",
      secondary: "Book a Demo",
    },
    realTime: {
      heading: "The Closed-Loop Intelligence Layer",
      description:
        "Built for operators who need the money back, not another dashboard. Whether you manage 10 locations or 100+, Core finds what's leaking, routes the fix to a named owner, and measures the recovered margin against a baseline - so every decision closes the loop.",
      cards: [
        { title: "Measured, Not Just Flagged", desc: "Sundae Coach routes each leak to an accountable owner, then measures the recovered margin against a baseline - not a dashboard that only updates.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { title: "Every Location, One View", desc: "Unified visibility across all locations. Portfolio-level patterns and location-level detail in a single pane.", icon: "multiLocation" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { title: "Grows With You", desc: "From one location to a thousand. The package sets the depth; the location bands set the price as you add sites.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    proof: {
      eyebrow: "HOW YOU KNOW IT'S REAL",
      heading: "Anyone can claim recovery. Sundae lets you check.",
      description: "A recovered number is only worth trusting if you can see whether it truly happened. Sundae answers the three questions a careful operator - or their CFO - always asks.",
      items: [
        { question: "Is the loop actually closing?", title: "Loop Health", desc: "See how many detected leaks actually reach a measured result - the real close-rate, not a vanity count. It is the one number that tells you the loop is working, and it stays honest when that number is low.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { question: "Would that have happened anyway?", title: "Like-for-like baselines", desc: "Every recovered number is measured against a matching, full-week baseline - same days, same rhythm - so a real gain is never mistaken for an ordinary busy week.", icon: "benchmarking" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { question: "Did it pay for itself?", title: "Return on Sundae", desc: "See the value you recovered set against what you pay, period by period - the proof, in measured money, that Sundae more than covers its cost.", icon: "finance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
      honesty: "And when the evidence isn't there, Sundae says so. Every result stays directional until a human confirms it, and a detector stays silent rather than invent a number.",
    },
    tiers: {
      eyebrow: "CHOOSE YOUR PACKAGE",
      heading: "Four Core packages",
      description: "Same eleven domain modules in every package. What changes is how deep each one goes.",
      bestForLabel: "Best for:",
      viewPrefix: "See",
      priceLabel: "first location / month",
      bandsLabel: "Then, per additional location",
      walletLabel: "AI credits / month",
      includesModules: "All eleven Core domain modules, included",
      items: [
        {
          packageId: "core_foundation" as CorePackageId,
          name: "Core Foundation",
          badge: "Start here",
          subtitle: "The operating baseline",
          description: "One decision substrate over POS, labor, cost and operations, refreshed while the shift is still running.",
          bestFor: "Groups getting off spreadsheets and disconnected dashboards",
          color: "from-[#FF7E6F] to-[#FF5C4D]",
        },
        {
          packageId: "core_margin" as CorePackageId,
          name: "Core Margin",
          badge: "Most Popular",
          subtitle: "Depth on cost and leakage",
          description: "Theoretical vs. actual usage, waste, shrinkage, voids and comps, and item-level contribution.",
          bestFor: "Operators whose margin is leaking faster than they can see it",
          color: "from-[#F2B45C] to-[#C2410C]",
        },
        {
          packageId: "core_growth" as CorePackageId,
          name: "Core Growth",
          badge: "Demand side",
          subtitle: "Depth on demand",
          description: "Guest cohorts and lifetime value, promo attribution by channel, delivery margin after commission.",
          bestFor: "Groups pushing on repeat revenue and channel mix",
          color: "from-[#E9A24A] to-[#F2C078]",
        },
        {
          packageId: "core_performance" as CorePackageId,
          name: "Core Performance",
          badge: "Full depth",
          subtitle: "Multi-brand, multi-region",
          description: "Consolidation across brands and regions, cross-module correlation, governed access with audit trails.",
          bestFor: "Large groups running several brands or several markets",
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    dimensions: {
      heading: "The 4D Intelligence Model",
      description: "Core delivers all four dimensions - expanded.",
      items: [
        { dimension: "1D", title: "What Happened", status: "Real-Time", description: "Complete operational truth, updated every 2-4 hours. Near real-time visibility for same-shift interventions.", icon: "report" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { dimension: "2D", title: "Plan vs. Actual", status: "Real-Time", description: "Real-time budget variance tracking. Flash reporting for finance teams. Week-to-date and month-to-date visibility.", icon: "marketing" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { dimension: "3D", title: "Market Context", status: "Expanded", description: "Full benchmarking suite (30+ metrics). Portfolio comparisons. Competitive context via Watchtower.", icon: "multiLocation" as SundaeIconName, color: "from-green-500 to-green-600" },
        { dimension: "4D", title: "What's Next", status: "Expanded", description: "14-30 day forecasting. Proactive alerts before problems escalate. Sundae Coach recommendations with confidence scores.", icon: "growth" as SundaeIconName, color: "from-orange-500 to-orange-600" },
      ],
    },
    pulse: {
      badge: "Included with Core",
      heading: "Pulse: Your Shift Command Center",
      description: "See anomalies the moment they happen. Route the fix to the manager on shift. Then measure the margin you recovered against the baseline.",
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
        { q: "How do the four Core packages differ?", a: "Every package carries the same eleven domain modules and differs in how deep each one goes. Foundation is the operating baseline; Margin adds cost and leakage depth; Growth adds guest, promo and channel depth; Performance adds multi-brand and multi-region consolidation with governed access." },
        { q: "Can I upgrade from Report to Core?", a: "Yes. All historical data is preserved. Transition with no data loss." },
        { q: "Do I need Core if I only have 5 locations?", a: "Not required, but recommended if you need operational speed (2-4 hour refresh). Report works great for 1-10 locations if daily reports are sufficient." },
        { q: "Can Core handle multiple POS systems?", a: "Yes. Core connects across mixed POS estates, and Core Performance adds consolidation across brands and regions on top." },
        { q: "Can I use Core with Watchtower?", a: "Highly recommended. Core provides internal intelligence, Watchtower adds external market intelligence for complete visibility." },
        { q: "Can I use Core with Modules?", a: "Yes. All 5 specialized modules work with Core to deepen intelligence in specific operational areas." },
      ],
    },
    cta: {
      title: "Stop Reporting the Leak. Recover It.",
      description: "Watch Core find the leak, route the fix, and measure the recovered margin against your baseline - on your actual data.",
      primary: "Explore Core Tiers",
      secondary: "Book a Demo",
    },
  },
  ar: {
    hero: {
      badge: "Sundae Core",
      title: "اكشف التسرب. استرجع الربح.",
      description:
        "متصل بنقاط البيع والعمالة والمخزون وكل نظام مهم. يكشف Core تسرّب الربح، ويوجّه الإصلاح إلى مسؤول محدّد، ويقيس الهامش المسترجع مقابل خط أساس.",
      primary: "استعرض مستويات Core",
      secondary: "احجز عرضاً",
    },
    realTime: {
      heading: "طبقة الذكاء ذات الحلقة المغلقة",
      description:
        "مصمم للمشغلين الذين يريدون استرجاع المال، لا لوحة تحكم أخرى. سواء كنت تدير 10 مواقع او 100+، يكشف Core ما يتسرّب، ويوجّه الإصلاح إلى مسؤول محدّد، ويقيس الهامش المسترجع مقابل خط أساس - فيغلق كل قرار الحلقة.",
      cards: [
        { title: "مقيس، لا مجرّد تنبيه", desc: "يوجّه Sundae Coach كل تسرّب إلى مسؤول محدّد، ثم يقيس الهامش المسترجع مقابل خط أساس - لا لوحة تحكم تكتفي بالتحديث.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { title: "كل موقع في عرض واحد", desc: "رؤية موحدة عبر كل المواقع. أنماط على مستوى المحفظة وتفاصيل على مستوى الموقع في لوحة واحدة.", icon: "multiLocation" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { title: "ينمو معك", desc: "من موقع واحد إلى ألف. الباقة تحدد العمق، وشرائح المواقع تحدد السعر كلما أضفت موقعًا.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    proof: {
      eyebrow: "كيف تعرف أنه حقيقي",
      heading: "أي أحد يستطيع ادّعاء الاسترجاع. Sundae يتيح لك التحقّق.",
      description: "الرقم المسترجع لا يستحق الثقة إلا إذا كان بإمكانك رؤية ما إذا كان قد حدث فعلاً. يجيب Sundae عن الأسئلة الثلاثة التي يطرحها دائماً مشغّل حصيف - أو مديره المالي (CFO).",
      items: [
        { question: "هل تُغلَق الحلقة فعلاً؟", title: "صحة الحلقة", desc: "اطّلع على كم من التسرّبات المكتشفة تصل فعلاً إلى نتيجة مقيسة - معدّل الإغلاق الحقيقي، لا عدّ استعراضي. إنه الرقم الوحيد الذي يخبرك أن الحلقة تعمل، ويبقى صادقاً حين يكون ذلك الرقم منخفضاً.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { question: "هل كان ذلك ليحدث على أي حال؟", title: "خطوط أساس مكافئة", desc: "كل رقم مسترجع يُقاس مقابل خط أساس مطابق لأسبوع كامل - الأيام نفسها والإيقاع نفسه - كي لا يُخلَط مكسب حقيقي بأسبوع مزدحم عادي.", icon: "benchmarking" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { question: "هل غطّى تكلفته؟", title: "العائد على Sundae", desc: "انظر إلى القيمة التي استرجعتها مقابل ما تدفعه، فترةً بفترة - الدليل، بالمال المقيس، على أن Sundae يغطّي تكلفته وأكثر.", icon: "finance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
      honesty: "وحين لا يتوفّر الدليل، يقولها Sundae صراحةً. تبقى كل نتيجة توجيهية حتى يؤكّدها إنسان، ويظل الكاشف صامتاً بدل أن يختلق رقماً.",
    },
    tiers: {
      eyebrow: "اختر باقتك",
      heading: "أربع باقات Core",
      description: "الوحدات الإحدى عشرة نفسها في كل باقة. ما يتغير هو عمق كل وحدة.",
      bestForLabel: "الانسب لـ:",
      viewPrefix: "عرض",
      priceLabel: "للموقع الأول شهريًا",
      bandsLabel: "ثم لكل موقع إضافي",
      walletLabel: "رصيد ذكاء شهريًا",
      includesModules: "كل وحدات Core الإحدى عشرة مضمّنة",
      items: [
        {
          packageId: "core_foundation" as CorePackageId,
          name: "Core Foundation",
          badge: "ابدأ هنا",
          subtitle: "الأساس التشغيلي",
          description: "ركيزة قرار واحدة فوق نقاط البيع والعمالة والتكلفة والعمليات، تتحدّث والوردية ما زالت قائمة.",
          bestFor: "المجموعات المنتقلة من الجداول ولوحات المعلومات المتفرقة",
          color: "from-[#FF7E6F] to-[#FF5C4D]",
        },
        {
          packageId: "core_margin" as CorePackageId,
          name: "Core Margin",
          badge: "الأكثر شيوعًا",
          subtitle: "عمق في التكلفة والتسرب",
          description: "الاستهلاك النظري مقابل الفعلي، والهدر، والفاقد، والإلغاءات والمجانيات، ومساهمة كل صنف.",
          bestFor: "المشغلون الذين يتسرب هامشهم أسرع مما يرون",
          color: "from-[#F2B45C] to-[#C2410C]",
        },
        {
          packageId: "core_growth" as CorePackageId,
          name: "Core Growth",
          badge: "جانب الطلب",
          subtitle: "عمق في الطلب",
          description: "شرائح الضيوف وقيمتهم مدى الحياة، وإسناد العروض حسب القناة، وهامش التوصيل بعد العمولة.",
          bestFor: "المجموعات التي تركز على الإيراد المتكرر ومزيج القنوات",
          color: "from-[#E9A24A] to-[#F2C078]",
        },
        {
          packageId: "core_performance" as CorePackageId,
          name: "Core Performance",
          badge: "العمق الكامل",
          subtitle: "متعدد العلامات والأسواق",
          description: "التجميع عبر العلامات والمناطق، والترابط بين الوحدات، ووصول محوكم بسجل تدقيق.",
          bestFor: "المجموعات الكبيرة التي تدير عدة علامات أو عدة أسواق",
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    dimensions: {
      heading: "نموذج الذكاء الرباعي",
      description: "Core يقدم جميع الابعاد الاربعة - وبشكل موسع.",
      items: [
        { dimension: "1D", title: "ماذا حدث", status: "فوري", description: "حقيقة تشغيلية كاملة تحدث كل 2-4 ساعات. رؤية شبه فورية للتدخل داخل الوردية.", icon: "report" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { dimension: "2D", title: "الخطة مقابل الفعلي", status: "فوري", description: "تتبع فوري لانحرافات الميزانية. تقارير سريعة لفرق المالية. رؤية من بداية الاسبوع حتى اليوم ومن بداية الشهر حتى اليوم.", icon: "marketing" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { dimension: "3D", title: "سياق السوق", status: "موسع", description: "مجموعة مقارنات كاملة (30+ مقياس). مقارنات المحفظة. سياق تنافسي عبر Watchtower.", icon: "multiLocation" as SundaeIconName, color: "from-green-500 to-green-600" },
        { dimension: "4D", title: "ما التالي", status: "موسع", description: "توقعات 14-30 يوماً. تنبيهات استباقية قبل تفاقم المشكلات. توصيات Sundae Coach مع درجات ثقة.", icon: "growth" as SundaeIconName, color: "from-orange-500 to-orange-600" },
      ],
    },
    pulse: {
      badge: "مضمن مع Core",
      heading: "Pulse: مركز قيادة الوردية",
      description: "شاهد الشذوذات لحظة حدوثها. وجّه الإصلاح إلى مدير الوردية. ثم قِس الهامش الذي استرجعته مقابل خط الأساس.",
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
        { q: "ما الفرق بين باقات Core الأربع؟", a: "كل باقة تضم الوحدات الإحدى عشرة نفسها، والفرق في عمق كل وحدة. Foundation هي الأساس التشغيلي، وMargin تضيف عمق التكلفة والتسرب، وGrowth تضيف عمق الضيوف والعروض والقنوات، وPerformance تضيف التجميع متعدد العلامات والمناطق مع وصول محوكم." },
        { q: "هل يمكنني الترقية من Report الى Core؟", a: "نعم. يتم الحفاظ على كل البيانات التاريخية. الانتقال دون فقدان للبيانات." },
        { q: "هل احتاج Core اذا كان لدي 5 مواقع فقط؟", a: "ليس ضرورياً، لكنه موصى به اذا كنت تحتاج سرعة تشغيلية (تحديث كل 2-4 ساعات). Report يعمل جيداً لـ 1-10 مواقع اذا كانت التقارير اليومية كافية." },
        { q: "هل يستطيع Core التعامل مع عدة انظمة POS؟", a: "نعم. يتصل Core بأنظمة POS المختلطة، وتضيف Core Performance فوق ذلك التجميع عبر العلامات والمناطق." },
        { q: "هل يمكنني استخدام Core مع Watchtower؟", a: "موصى به بشدة. Core يوفر الذكاء الداخلي، وWatchtower يضيف ذكاء السوق الخارجي لرؤية كاملة." },
        { q: "هل يمكنني استخدام Core مع Modules؟", a: "نعم. جميع الوحدات المتخصصة الخمس تعمل مع Core لتعميق الذكاء في المجالات التشغيلية المحددة." },
      ],
    },
    cta: {
      title: "توقف عن الإبلاغ عن التسرب. استرجعه.",
      description: "شاهد Core يكشف التسرّب، ويوجّه الإصلاح، ويقيس الهامش المسترجع مقابل خط أساسك - على بياناتك الفعلية.",
      primary: "استعرض مستويات Core",
      secondary: "احجز عرضاً",
    },
  },
  fr: {
    hero: {
      badge: "Sundae Core",
      title: "Trouvez la fuite. Récupérez la marge.",
      description:
        "Connecté à votre POS, à la main-d'œuvre, aux stocks et à tous les systèmes qui comptent. Core repère la fuite de marge, confie la correction à un responsable identifié et mesure la marge récupérée par rapport à une référence.",
      primary: "Explorer les niveaux Core",
      secondary: "Réserver une démo",
    },
    realTime: {
      heading: "La couche d'intelligence en boucle fermée",
      description:
        "Conçu pour les exploitants qui veulent récupérer l'argent, pas un tableau de bord de plus. Que vous gériez 10 sites ou 100+, Core repère ce qui fuit, confie la correction à un responsable nommé et mesure la marge récupérée par rapport à une référence - chaque décision boucle la boucle.",
      cards: [
        { title: "Mesuré, pas seulement signalé", desc: "Sundae Coach confie chaque fuite à un responsable identifié, puis mesure la marge récupérée par rapport à une référence - pas un tableau qui se contente de s'actualiser.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { title: "Chaque site, une seule vue", desc: "Visibilité unifiée sur tous les sites. Tendances au niveau du portefeuille et détail au niveau du site dans un seul panneau.", icon: "multiLocation" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { title: "Grandit avec vous", desc: "D'un site à un millier. L'offre fixe la profondeur, les tranches de sites fixent le prix à mesure que vous ajoutez.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    proof: {
      eyebrow: "COMMENT SAVOIR QUE C'EST RÉEL",
      heading: "N'importe qui peut revendiquer une récupération. Sundae vous laisse vérifier.",
      description: "Un montant récupéré ne mérite votre confiance que si vous pouvez voir s'il a vraiment eu lieu. Sundae répond aux trois questions qu'un exploitant rigoureux - ou son CFO - se pose toujours.",
      items: [
        { question: "La boucle se referme-t-elle vraiment ?", title: "Santé de la boucle", desc: "Voyez combien de fuites détectées aboutissent réellement à un résultat mesuré - le vrai taux de bouclage, pas un chiffre de façade. C'est le seul indicateur qui prouve que la boucle fonctionne, et il reste honnête même quand ce chiffre est bas.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { question: "Cela serait-il arrivé de toute façon ?", title: "Références comparables", desc: "Chaque montant récupéré est mesuré face à une référence équivalente sur une semaine entière - mêmes jours, même rythme - pour qu'un vrai gain ne soit jamais confondu avec une semaine simplement chargée.", icon: "benchmarking" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { question: "Est-ce que ça s'est rentabilisé ?", title: "Retour sur Sundae", desc: "Voyez la valeur récupérée mise en regard de ce que vous payez, période après période - la preuve, en argent mesuré, que Sundae couvre largement son coût.", icon: "finance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
      honesty: "Et quand la preuve manque, Sundae le dit. Chaque résultat reste indicatif jusqu'à ce qu'un humain le confirme, et un détecteur préfère se taire plutôt que d'inventer un chiffre.",
    },
    tiers: {
      eyebrow: "CHOISISSEZ VOTRE OFFRE",
      heading: "Quatre offres Core",
      description: "Les mêmes onze modules métier dans chaque offre. Ce qui change, c'est la profondeur de chacun.",
      bestForLabel: "Idéal pour :",
      viewPrefix: "Voir",
      priceLabel: "premier site / mois",
      bandsLabel: "Puis, par site additionnel",
      walletLabel: "crédits IA / mois",
      includesModules: "Les onze modules métier Core, inclus",
      items: [
        {
          packageId: "core_foundation" as CorePackageId,
          name: "Core Foundation",
          badge: "Commencez ici",
          subtitle: "Le socle opérationnel",
          description: "Une seule base de décision sur le POS, la main-d'œuvre, les coûts et l'exploitation, rafraîchie pendant le service.",
          bestFor: "Les groupes qui quittent les tableurs et les dashboards éparpillés",
          color: "from-[#FF7E6F] to-[#FF5C4D]",
        },
        {
          packageId: "core_margin" as CorePackageId,
          name: "Core Margin",
          badge: "Le plus populaire",
          subtitle: "Profondeur sur les coûts et les pertes",
          description: "Théorique contre réel, gaspillage, démarque, annulations et offerts, contribution par article.",
          bestFor: "Les exploitants dont la marge fuit plus vite qu'ils ne la voient",
          color: "from-[#F2B45C] to-[#C2410C]",
        },
        {
          packageId: "core_growth" as CorePackageId,
          name: "Core Growth",
          badge: "Côté demande",
          subtitle: "Profondeur sur la demande",
          description: "Cohortes clients et valeur vie, attribution des promos par canal, marge livraison après commission.",
          bestFor: "Les groupes qui poussent le revenu récurrent et le mix de canaux",
          color: "from-[#E9A24A] to-[#F2C078]",
        },
        {
          packageId: "core_performance" as CorePackageId,
          name: "Core Performance",
          badge: "Profondeur complète",
          subtitle: "Multi-marques, multi-régions",
          description: "Consolidation entre marques et régions, corrélation inter-modules, accès gouverné avec pistes d'audit.",
          bestFor: "Les grands groupes qui opèrent plusieurs marques ou plusieurs marchés",
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    dimensions: {
      heading: "Le modèle d'intelligence 4D",
      description: "Core livre les quatre dimensions - en version étendue.",
      items: [
        { dimension: "1D", title: "Ce qui s'est passé", status: "Temps réel", description: "Vérité opérationnelle complète, mise à jour toutes les 2 à 4 heures. Visibilité quasi temps réel pour intervenir pendant le service.", icon: "report" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { dimension: "2D", title: "Plan vs réel", status: "Temps réel", description: "Suivi en temps réel des écarts de budget. Flash reporting pour les équipes finance. Visibilité semaine à date et mois à date.", icon: "marketing" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { dimension: "3D", title: "Contexte marché", status: "Étendu", description: "Suite complète de benchmarking (30+ indicateurs). Comparaisons de portefeuille. Contexte concurrentiel via Watchtower.", icon: "multiLocation" as SundaeIconName, color: "from-green-500 to-green-600" },
        { dimension: "4D", title: "Et ensuite ?", status: "Étendu", description: "Prévisions 14 à 30 jours. Alertes proactives avant que les problèmes ne s'aggravent. Recommandations Sundae Coach avec scores de confiance.", icon: "growth" as SundaeIconName, color: "from-orange-500 to-orange-600" },
      ],
    },
    pulse: {
      badge: "Inclus avec Core",
      heading: "Pulse : votre centre de commande de service",
      description: "Repérez les anomalies au moment où elles se produisent. Confiez la correction au manager en service. Puis mesurez la marge récupérée par rapport à la référence.",
      features: [
        { name: "Ventes et cadence", description: "Rythme des ventes intrajournée, KPI et visualisation des tendances horaires", icon: "chart" as SundaeIconName },
        { name: "Main-d'œuvre live", description: "Rythme de la main-d'œuvre, suivi du risque d'heures sup et conformité des pauses", icon: "benchmarking" as SundaeIconName },
        { name: "Suivi des fuites", description: "Suivi en temps réel des voids, comps et remises par service", icon: "cost" as SundaeIconName },
        { name: "Vitesse de service et flux", description: "Goulots d'étranglement, backlog et mesures de cadence cuisine", icon: "speed" as SundaeIconName },
        { name: "Intelligence menu", description: "Catalogue d'articles, matrice de classification (Stars/Plowhorses/Puzzles/Dogs)", icon: "insights" as SundaeIconName },
        { name: "Alertes et playbooks", description: "Workflows de réponse automatisés déclenchés par exception", icon: "forecasting" as SundaeIconName },
        { name: "Sundae Coach", description: "Signaux de coaching au niveau du service pour ventes, fuites et flux", icon: "intelligence" as SundaeIconName },
        { name: "Classement du portefeuille", description: "Comparaison multi-sites avec suivi des séries", icon: "multiLocation" as SundaeIconName },
        { name: "Mode wallboard", description: "Affichage plein écran pour cuisine ou salle", icon: "canvas" as SundaeIconName },
      ],
    },
    integrations: {
      heading: "Connectez tous vos systèmes",
      description: "Core se connecte à 12 domaines de données avec plus de 80 intégrations fournisseurs.",
      items: [
        { category: "Systèmes POS", examples: "Oracle MICROS Simphony, Square, Toast, Clover et connecteurs de base de données directs", icon: "integration" as SundaeIconName },
        { category: "Main-d'œuvre et personnel", examples: "7shifts, HotSchedules, Deputy", icon: "benchmarking" as SundaeIconName },
        { category: "Stocks et achats", examples: "MarketMan, Craftable, BinWise", icon: "insights" as SundaeIconName },
        { category: "Comptabilité", examples: "QuickBooks, Xero, Sage, FreshBooks", icon: "finance" as SundaeIconName },
        { category: "Réservations", examples: "OpenTable, Resy, SevenRooms, Tock", icon: "operators" as SundaeIconName },
        { category: "Livraison et marketing", examples: "Deliverect, Uber Eats, DoorDash, Meta, Google Ads, Mailchimp", icon: "marketing" as SundaeIconName },
      ],
    },
    modules: {
      heading: "Ajoutez des modules pour une intelligence spécialisée",
      description: "Approfondissez Core avec des modules ciblés pour vos défis opérationnels spécifique.",
      items: [
        { name: "Intelligence de la main-d'œuvre", description: "Optimisation des plannings en temps réel, demande prévisionnelle de main-d'œuvre", icon: "benchmarking" as SundaeIconName },
        { name: "Intelligence des stocks", description: "Suivi des pertes en temps réel, niveaux par automatiques", icon: "insights" as SundaeIconName },
        { name: "Intelligence des achats", description: "Optimisation des prix en temps réel, comparaison des fournisseurs", icon: "marketing" as SundaeIconName },
        { name: "Intelligence marketing", description: "Suivi des campagnes en temps réel, suivi du CAC", icon: "growth" as SundaeIconName },
        { name: "Intelligence des réservations", description: "Schémas de réservation en temps réel, optimisation des tables", icon: "operators" as SundaeIconName },
      ],
      button: "Explorer tous les modules",
    },
    watchtower: {
      heading: "Core + Watchtower = intelligence complète",
      description: "Core vous dit comment vous performez maintenant. Watchtower vous dit ce qui se passe autour de vous. Ensemble, ils donnent la vue complète - opérations internes et contexte marché externe dans une seule couche d'intelligence.",
      button: "En savoir plus sur Watchtower",
    },
    faq: {
      heading: "Questions fréquentes",
      items: [
        { q: "Quelle est la différence entre les quatre offres Core ?", a: "Chaque offre embarque les mêmes onze modules métier et se distingue par la profondeur de chacun. Foundation est le socle opérationnel, Margin ajoute la profondeur coûts et pertes, Growth la profondeur client, promo et canal, Performance la consolidation multi-marques et multi-régions avec accès gouverné." },
        { q: "Puis-je passer de Report à Core ?", a: "Oui. Toutes les données historiques sont conservées. La transition se fait sans perte de données." },
        { q: "Ai-je besoin de Core si je n'ai que 5 sites ?", a: "Pas obligatoire, mais recommandé si vous avez besoin de vitesse opérationnelle (rafraîchissement toutes les 2 à 4 heures). Report fonctionne très bien pour 1 à 10 sites si les rapports quotidiens suffisent." },
        { q: "Core peut-il gérer plusieurs systèmes POS ?", a: "Oui. Core se connecte à des parcs POS hétérogènes, et Core Performance ajoute par-dessus la consolidation entre marques et régions." },
        { q: "Puis-je utiliser Core avec Watchtower ?", a: "Fortement recommandé. Core fournit l'intelligence interne, Watchtower ajoute l'intelligence marché externe pour une visibilité complète." },
        { q: "Puis-je utiliser Core avec les Modules ?", a: "Oui. Les 5 modules spécialisés fonctionnent avec Core pour approfondir l'intelligence dans des zones opérationnelles spécifiques." },
      ],
    },
    cta: {
      title: "Arrêtez de signaler la fuite. Récupérez-la.",
      description: "Voyez Core repérer la fuite, confier la correction et mesurer la marge récupérée par rapport à votre référence - sur vos vraies données.",
      primary: "Explorer les niveaux Core",
      secondary: "Réserver une démo",
    },
  },
  es: {
    hero: {
      badge: "Sundae Core",
      title: "Encuentra la fuga. Recupera el margen.",
      description:
        "Conectado a tu POS, personal, inventario y cada sistema importante. Core encuentra la fuga de margen, asigna la solución a un responsable con nombre y mide el margen recuperado frente a una línea base.",
      primary: "Explorar niveles de Core",
      secondary: "Reservar demo",
    },
    realTime: {
      heading: "La vista operativa de ciclo cerrado",
      description:
        "Hecho para operadores que quieren recuperar el dinero, no otro panel. Tanto si gestionas 10 locales como 100+, Core encuentra lo que se fuga, asigna la solución a un responsable con nombre y mide el margen recuperado frente a una línea base - y así cada decisión cierra el ciclo.",
      cards: [
        { title: "Medido, no solo señalado", desc: "Sundae Coach asigna cada fuga a un responsable con nombre y luego mide el margen recuperado frente a una línea base - no un panel que solo se actualiza.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { title: "Cada local, una sola vista", desc: "Visibilidad unificada en todos los locales. Patrones a nivel cartera y detalle a nivel local en un solo panel.", icon: "multiLocation" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { title: "Crece contigo", desc: "De un local a mil. El paquete marca la profundidad y los tramos de locales marcan el precio según añades sitios.", icon: "performance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
    },
    proof: {
      eyebrow: "CÓMO SABES QUE ES REAL",
      heading: "Cualquiera puede afirmar que recuperó. Sundae te deja comprobarlo.",
      description: "Una cifra recuperada solo merece confianza si puedes ver si de verdad ocurrió. Sundae responde a las tres preguntas que un operador cuidadoso - o su CFO - siempre hace.",
      items: [
        { question: "¿De verdad se está cerrando el ciclo?", title: "Salud del ciclo", desc: "Mira cuántas fugas detectadas llegan de verdad a un resultado medido - la tasa de cierre real, no un número de vanidad. Es la única cifra que te dice que el ciclo funciona, y sigue siendo honesta cuando esa cifra es baja.", icon: "forecasting" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { question: "¿No habría pasado de todos modos?", title: "Bases comparables", desc: "Cada cifra recuperada se mide contra una base equivalente de una semana completa - los mismos días, el mismo ritmo - para que una ganancia real nunca se confunda con una semana simplemente ajetreada.", icon: "benchmarking" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { question: "¿Se pagó a sí mismo?", title: "Retorno sobre Sundae", desc: "Mira el valor que recuperaste frente a lo que pagas, periodo a periodo - la prueba, en dinero medido, de que Sundae cubre de sobra su coste.", icon: "finance" as SundaeIconName, color: "from-green-500 to-green-600" },
      ],
      honesty: "Y cuando la evidencia no está, Sundae lo dice. Cada resultado queda como indicativo hasta que una persona lo confirma, y un detector prefiere callar antes que inventar una cifra.",
    },
    tiers: {
      eyebrow: "ELIGE TU PAQUETE",
      heading: "Cuatro paquetes Core",
      description: "Los mismos once módulos de dominio en cada paquete. Lo que cambia es cuánto profundiza cada uno.",
      bestForLabel: "Ideal para:",
      viewPrefix: "Ver",
      priceLabel: "primer local / mes",
      bandsLabel: "Después, por local adicional",
      walletLabel: "créditos de IA / mes",
      includesModules: "Los once módulos de dominio de Core, incluidos",
      items: [
        {
          packageId: "core_foundation" as CorePackageId,
          name: "Core Foundation",
          badge: "Empieza aquí",
          subtitle: "La base operativa",
          description: "Un único sustrato de decisión sobre POS, personal, costes y operación, actualizado con el turno todavía en marcha.",
          bestFor: "Grupos que dejan atrás hojas de cálculo y paneles sueltos",
          color: "from-[#FF7E6F] to-[#FF5C4D]",
        },
        {
          packageId: "core_margin" as CorePackageId,
          name: "Core Margin",
          badge: "Más popular",
          subtitle: "Profundidad en coste y fuga",
          description: "Teórico frente a real, merma, desperdicio, anulaciones e invitaciones, contribución por artículo.",
          bestFor: "Operadores cuyo margen se fuga más rápido de lo que pueden ver",
          color: "from-[#F2B45C] to-[#C2410C]",
        },
        {
          packageId: "core_growth" as CorePackageId,
          name: "Core Growth",
          badge: "Lado demanda",
          subtitle: "Profundidad en demanda",
          description: "Cohortes de clientes y valor de vida, atribución de promociones por canal, margen de delivery tras comisión.",
          bestFor: "Grupos que empujan el ingreso recurrente y el mix de canales",
          color: "from-[#E9A24A] to-[#F2C078]",
        },
        {
          packageId: "core_performance" as CorePackageId,
          name: "Core Performance",
          badge: "Profundidad completa",
          subtitle: "Multimarca, multirregión",
          description: "Consolidación entre marcas y regiones, correlación entre módulos, acceso gobernado con auditoría.",
          bestFor: "Grupos grandes que operan varias marcas o varios mercados",
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    dimensions: {
      heading: "El modelo de inteligencia 4D",
      description: "Core entrega las cuatro dimensiones - ampliadas.",
      items: [
        { dimension: "1D", title: "Qué pasó", status: "Tiempo real", description: "Verdad operativa completa, actualizada cada 2 a 4 horas. Visibilidad casi en tiempo real para intervenir durante el turno.", icon: "report" as SundaeIconName, color: "from-[#FF7E6F] to-[#FF5C4D]" },
        { dimension: "2D", title: "Plan vs real", status: "Tiempo real", description: "Seguimiento en tiempo real de la variación presupuestaria. Flash reporting para equipos financieros. Visibilidad semana a la fecha y mes a la fecha.", icon: "marketing" as SundaeIconName, color: "from-[#F2B45C] to-[#C2410C]" },
        { dimension: "3D", title: "Contexto de mercado", status: "Ampliado", description: "Suite completa de benchmarking (30+ métricas). Comparaciones de cartera. Contexto competitivo vía Watchtower.", icon: "multiLocation" as SundaeIconName, color: "from-green-500 to-green-600" },
        { dimension: "4D", title: "Qué sigue", status: "Ampliado", description: "Pronósticos de 14 a 30 días. Alertas proactivas antes de que los problemas escalen. Recomendaciones de Sundae Coach con puntuaciones de confianza.", icon: "growth" as SundaeIconName, color: "from-orange-500 to-orange-600" },
      ],
    },
    pulse: {
      badge: "Incluido con Core",
      heading: "Pulse: tu centro de comando del turno",
      description: "Ve las anomalías en el momento en que suceden. Asigna la solución al gerente del turno. Luego mide el margen que recuperaste frente a la línea base.",
      features: [
        { name: "Ventas e ritmo", description: "Ritmo de ventas intradía, KPI y visualización de tendencias por hora", icon: "chart" as SundaeIconName },
        { name: "Labor en vivo", description: "Ritmo laboral intradía, seguimiento del riesgo de horas extra y cumplimiento de descansos", icon: "benchmarking" as SundaeIconName },
        { name: "Monitoreo de fugas", description: "Monitoreo en tiempo real de voids, comps y descuentos por turno", icon: "cost" as SundaeIconName },
        { name: "Velocidad de servicio y flujo", description: "Cuellos de botella, backlog y métricas de ritmo de cocina", icon: "speed" as SundaeIconName },
        { name: "Inteligencia de menú", description: "Catálogo de artículos, matriz de clasificación (Stars/Plowhorses/Puzzles/Dogs)", icon: "insights" as SundaeIconName },
        { name: "Alertas y playbooks", description: "Workflows de respuesta automatizados activados por excepciones", icon: "forecasting" as SundaeIconName },
        { name: "Sundae Coach", description: "Señales de coaching por turno para ventas, fugas y flujo", icon: "intelligence" as SundaeIconName },
        { name: "Tabla de posiciones de cartera", description: "Comparación de rendimiento multi-local con seguimiento de rachas", icon: "multiLocation" as SundaeIconName },
        { name: "Modo wallboard", description: "Pantalla completa para cocina o sala", icon: "canvas" as SundaeIconName },
      ],
    },
    integrations: {
      heading: "Conecta todos tus sistemas",
      description: "Core se conecta a 12 dominios de datos con más de 80 integraciones de proveedores.",
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
      heading: "Agrega módulos para inteligencia especializada",
      description: "Profundiza Core con módulos enfocados para tus desafíos operativos específicos.",
      items: [
        { name: "Inteligencia laboral", description: "Optimización de horarios en tiempo real y demanda laboral predictiva", icon: "benchmarking" as SundaeIconName },
        { name: "Inteligencia de inventario", description: "Seguimiento de desperdicio en tiempo real y niveles par automatizados", icon: "insights" as SundaeIconName },
        { name: "Inteligencia de compras", description: "Optimización de precios en tiempo real y comparación de proveedores", icon: "marketing" as SundaeIconName },
        { name: "Inteligencia de marketing", description: "Seguimiento de campañas en tiempo real y monitoreo de CAC", icon: "growth" as SundaeIconName },
        { name: "Inteligencia de reservas", description: "Patrones de reserva en tiempo real y optimización de mesas", icon: "operators" as SundaeIconName },
      ],
      button: "Explorar todos los módulos",
    },
    watchtower: {
      heading: "Core + Watchtower = inteligencia completa",
      description: "Core te muestra cómo va la operación ahora. Watchtower te da el contexto del mercado que la rodea. Juntos te dan una lectura completa para decidir con más criterio.",
      button: "Saber más sobre Watchtower",
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        { q: "¿En qué se diferencian los cuatro paquetes Core?", a: "Todos llevan los mismos once módulos de dominio y se diferencian en cuánto profundiza cada uno. Foundation es la base operativa, Margin añade profundidad de coste y fuga, Growth añade profundidad de cliente, promoción y canal, y Performance añade consolidación multimarca y multirregión con acceso gobernado." },
        { q: "¿Puedo pasar de Report a Core?", a: "Sí. Se conservan todos los datos históricos. La transición ocurre sin pérdida de datos." },
        { q: "¿Necesito Core si solo tengo 5 locales?", a: "No es obligatorio, pero se recomienda si necesitas velocidad operativa (actualización cada 2 a 4 horas). Report funciona muy bien para 1 a 10 locales si los reportes diarios son suficientes." },
        { q: "¿Core puede manejar varios sistemas POS?", a: "Sí. Core se conecta a parques POS mixtos, y Core Performance añade encima la consolidación entre marcas y regiones." },
        { q: "¿Puedo usar Core con Watchtower?", a: "Muy recomendable. Core aporta inteligencia interna y Watchtower añade inteligencia externa de mercado para visibilidad completa." },
        { q: "¿Puedo usar Core con Modules?", a: "Sí. Los 5 módulos especializados funcionan con Core para profundizar la inteligencia en áreas operativas específicas." },
      ],
    },
    cta: {
      title: "Deja de reportar la fuga. Recupérala.",
      description: "Mira a Core encontrar la fuga, asignar la solución y medir el margen recuperado frente a tu línea base - con tus datos reales.",
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

      {/* How you know it's real - the instrumented-honesty proof beat (question-led). */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="eyebrow mb-4">{ui.proof.eyebrow}</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4 text-balance">{ui.proof.heading}</h2>
              <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.proof.description}</p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.proof.items.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full flex flex-col p-7 bg-[var(--surface-raised)] rounded-2xl border border-[var(--border-default)] shadow-sm">
                  <div className={`w-11 h-11 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-5`}>
                    <SundaeIcon name={item.icon} size="md" className="text-white" />
                  </div>
                  <h3 className="card-title text-[var(--text-primary)] mb-2">{item.question}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--coral)] mb-3">{item.title}</p>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp>
            <p className="mt-10 text-center body-sm text-[var(--text-muted)] max-w-3xl mx-auto italic">
              {ui.proof.honesty}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Cream relief - early warm break BEFORE the long dark tiers/4D/Pulse stretch (the volume system) */}
      <CreamBreak eyebrow={cream.eyebrow} statement={cream.statement} lede={cream.lede} />

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
                          <span className="text-sm text-[var(--text-supporting)]">{ui.tiers.includesModules}</span>
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
