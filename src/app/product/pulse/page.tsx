'use client';

import { Button } from "@/components/ui/Button";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { galleryHeading } from "@/components/home/sections/galleryHeadingsCopy";
import { SectionShiftMoment } from "@/components/home/sections/SectionShiftMoment";
import {
  MockupFrame,
  MockupKPI,
  MockupPaceBar,
  MockupBarChart,
  MockupTable,
  MockupAlert,
} from "@/components/ui/MockupFrame";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_product_pulse_page'
import { CreamBreak } from "@/components/ui/CreamBreak";
import { pulseCreamCopy } from "./pulseCreamCopy";
import { CoreMobileShowcase } from "@/components/core/CoreMobileShowcase";
import { CorePulseFloorMobile } from "@/components/core/CorePulseFloorMobile";
import { CoreHomeMobile } from "@/components/core/CoreHomeMobile";
import { balanceSentences } from '@/lib/balanceSentences';

const localizedPulseCopy = {
  en: {
    hero: {
      badge: "Pulse - Intraday Operations",
      title: "A Bad Shift Cannot Be Re-Run. Pulse Catches It Live.",
      description:
        "Revenue pacing, labor cost, server performance, and leakage detection - updating every 5 minutes. Adaptive targets that learn your patterns, seasonality, and local events. Act before it costs you.",
      primary: "Book a Demo",
      secondary: "See Pulse in Action",
      note: "Available on Sundae Core plans.",
    },
    quickGrid: {
      heading: "10 Capabilities. One Operational Nerve Center.",
      description: "Pulse monitors your operation in real time and coaches your team when things go off-track - then routes each fix to an accountable owner and measures the recovered margin back against baseline.",
      capabilities: [
        "Adaptive Targets",
        "Sales Pacing",
        "Labor Productivity",
        "Server Analytics",
        "Leakage Monitor",
        "Sundae Coach",
        "Alerts & Playbooks",
        "Shift Scorecard",
        "Leaderboard",
        "Wallboard",
      ],
    },
    featuresIntro: {
      eyebrow: "DEEP DIVE",
      heading: "Every Feature, In Detail",
    },
    blocks: [
      {
        title: "Adaptive Intelligence Targets",
        headline: "Targets That Learn Your Business",
        description:
          "Pulse analyzes your sales history, detects anomalies, maps year-over-year patterns, and adjusts for calendar events like Ramadan, public holidays, and local seasonality - automatically. Set a growth ambition. The system calculates daily targets for every outlet.",
        capabilities: [
          "Year-over-year weekly target mapping",
          "Configurable growth modifiers",
          "Anomaly detection with one-click tagging",
          "Calendar event awareness (Ramadan, Eid, NYE)",
          "Trend shift detection with proactive alerts",
          "Forward target simulation and preview",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Sales & Pace Tracking",
        headline: "Know Where You Stand - Every Hour",
        description:
          "Real-time sales pacing against your targets, broken down by daypart. Expected revenue by this point in the shift, the gap to target, recovery pace needed, and whether you're trending to beat or miss the day.",
        capabilities: [
          "Intraday pacing with configurable dayparts",
          "Real-time gap-to-target calculations",
          "Hourly revenue trend visualization",
          "Multi-outlet portfolio view with RAG status",
        ],
        icon: "chart" as SundaeIconName,
      },
      {
        title: "Labor Productivity",
        headline: "From Headcount to Productivity",
        description:
          "Labor performance shows up in output, not just hours. Track Sales per Labor Hour, Covers per Labor Hour, and a composite Productivity Index in real time so teams can see which shifts are overstaffed, which produce the strongest revenue per hour, and what each shift actually costs.",
        capabilities: [
          "SPLH and CPLH in real time",
          "Labor Cost Ratio vs. target",
          "Per-shift cost with staff-level detail",
          "Productivity trend tracking over 14 days",
          "Configurable hourly rates by role",
        ],
        icon: "benchmarking" as SundaeIconName,
      },
      {
        title: "Server Performance",
        headline: "See Who's Driving Revenue",
        description:
          "A live leaderboard ranking servers by revenue, average check, covers, upsell rate, and a composite productivity score. Filter by hour, service phase, or comparison period. Use it for coaching, incentives, and staffing decisions.",
        capabilities: [
          "Filter by hour, phase, or custom range",
          "Compare vs. yesterday or 4-week average",
          "Composite productivity score (0-100)",
          "Individual server detail with charts",
          "Strengths and improvement areas auto-detected",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Leakage Monitoring",
        headline: "Voids, Comps and Discounts, Against Your Own Baseline",
        description:
          "Voids, discounts, comps, and refunds - tracked in real time against your baselines. Pulse flags when leakage rates spike, identifies the servers, items, and time windows involved, and alerts you before small issues become expensive patterns - then routes the fix to an accountable owner and measures the recovered margin back against baseline.",
        capabilities: [
          "Real-time void, discount, and comp tracking",
          "Server-level leakage attribution",
          "Spike detection against rolling baselines",
          "Automated alerts for anomalous patterns",
        ],
        icon: "cost" as SundaeIconName,
      },
      {
        title: "Sundae Coach",
        headline: "Prioritized Actions, Not Dashboards",
        description:
          "Sundae Coach monitors all signals in real time and surfaces prioritized, actionable recommendations based on live data. Not generic tips - specific actions tied to what's happening on your floor right now, each routed to the owner on shift with the recovery measured back against baseline.",
        capabilities: [
          "Real-time contextual recommendations",
          "Prioritized by revenue impact",
          "Based on live Pulse data",
          "Configurable playbooks per scenario",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Alerts & Playbooks",
        headline: "Automated Responses When It Matters",
        description:
          "Define thresholds. Get notified. Act fast. Automated response workflows triggered by exceptions - from void anomalies to labor cost spikes - with escalation paths built in.",
        capabilities: [
          "Custom threshold-based alert triggers",
          "Automated notification workflows",
          "Configurable playbooks per exception",
          "Real-time escalation paths",
        ],
        icon: "forecasting" as SundaeIconName,
      },
      {
        title: "Shift Scorecard",
        headline: "End-of-Shift Performance Summary",
        description:
          "Every shift gets graded. Revenue, covers, average check, labor cost, leakage, and server highlights - summarized in one view. Share it with your team or review it the next morning.",
        capabilities: [
          "KPI summary across all outlets",
          "Shift grade with highlights and lowlights",
          "Improvement areas auto-detected",
          "Shareable shift report",
        ],
        icon: "report" as SundaeIconName,
      },
      {
        title: "Portfolio Leaderboard",
        headline: "Compare Every Outlet, Live",
        description:
          "Multi-outlet performance comparison with streak tracking and competitive ranking. See which outlets are on fire and which need attention - before end-of-day.",
        capabilities: [
          "Cross-outlet performance ranking",
          "Streak tracking and trend indicators",
          "Drill-down into individual outlet metrics",
          "At-risk outlet flagging",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Wallboard Mode",
        headline: "Put Pulse on the Big Screen",
        description:
          "A TV-optimized display designed for kitchen pass-throughs, manager offices, and staff areas. Auto-rotates through outlets, prioritizes at-risk locations, and gives the team a shared view of the shift.",
        capabilities: [
          "TV-optimized 16:9 display",
          "Auto-rotate across outlets",
          "Priority ordering (at-risk first)",
          "Configurable refresh rate and metrics",
        ],
        icon: "canvas" as SundaeIconName,
      },
    ],
    deepDives: {
      targets: {
        eyebrow: "INTELLIGENCE THAT LEARNS",
        heading: "Targets That Get Smarter Every Week",
        description:
          "Most platforms make you set targets manually - or copy last week. Sundae's Adaptive Intelligence Engine scans your full sales history, detects anomalies and seasonality, maps calendar events to their actual revenue impact, and generates forward-looking targets that reflect your real business rhythm. Tag a one-off event and it's excluded. Tag a recurring event and the system adjusts next year, automatically.",
      },
      server: {
        eyebrow: "SERVER INTELLIGENCE",
        heading: "From Leaderboard to Coaching Tool",
        description:
          "See who's driving your revenue and who needs support - in real time. Filter by hour, by service phase, or compare against last week. Every server gets a productivity score, an hourly breakdown, and auto-detected strengths and improvement areas. The best operators do not just track servers - they develop them.",
      },
      cost: {
        eyebrow: "SHIFT COSTING",
        heading: "Know What Every Shift Costs",
        description:
          "Your morning shift runs 4 staff for 8 hours. Your evening runs 8 for 5 hours. Which one is actually profitable? Pulse breaks down the cost of every shift - by role, by individual - and maps it against the revenue that shift generates. See your labor cost ratio by shift, identify overstaffing, and make smarter scheduling decisions.",
      },
    },
    cta: {
      title: "Stop Managing Shifts Blind",
      description: "Pulse is on every Sundae Core plan. See what's happening now - not at end-of-day.",
      primary: "Book a Working Session",
      secondary: "See plans",
    },
    heroMockup: {
      label: "Pulse - Sales Pacing",
      live: "LIVE",
      updatedAt: "Tuesday, 7:42 PM",
      kpis: [
        { label: "Revenue", value: "$14,280", trend: "+12% vs target", trendUp: true },
        { label: "Covers", value: "287", trend: "+12 vs plan", trendUp: true, color: "#22C55E" },
        { label: "Avg Check", value: "$49.50", trend: "-2.1%", trendUp: false, color: "#FBBF24" },
        { label: "Labor %", value: "28.4%", trend: "Under 30% target", trendUp: true, color: "#22C55E" },
      ],
      paceLabel: "Revenue Pace",
      tableHeaders: ["Server", "Sales", "Upsell %", "Avg Check"],
      tableRows: [
        ["Sarah M.", "$2,840", "32%", "$52.10"],
        ["Marcus J.", "$2,410", "28%", "$48.20"],
        ["James K.", "$1,960", "18%", "$44.50"],
      ],
      coachAlert: "James K. upsell rate is 14% below shift average. Consider pairing with Sarah for the next 2 tables.",
    },
  },
  ar: {
    hero: {
      badge: "Pulse - عمليات داخل اليوم",
      title: "الوردية السيئة لا تُعاد. Pulse يلتقطها مباشرة.",
      description:
        "وتيرة الايرادات وتكلفة العمالة واداء الموظفين ومراقبة التسرب - تتحدث كل 5 دقائق. اهداف تكيفية تتعلم من انماطك والموسمية والاحداث المحلية. تحرك قبل ان تدفع الثمن.",
      primary: "احجز عرضاً",
      secondary: "شاهد Pulse عملياً",
      note: "متاح على خطط Sundae Core.",
    },
    quickGrid: {
      heading: "10 قدرات. مركز اعصاب تشغيلي واحد.",
      description: "يراقب Pulse عملياتك لحظة بلحظة ويدرب فريقك عندما تخرج الامور عن المسار - ثم يوجّه كل إصلاح إلى مالك مسؤول ويقيس الهامش المُستَرد مقابل خط الأساس.",
      capabilities: [
        "الاهداف التكيفية",
        "وتيرة المبيعات",
        "انتاجية العمالة",
        "تحليلات الموظفين",
        "مراقبة التسرب",
        "Sundae Coach",
        "التنبيهات وخطط التشغيل",
        "بطاقة تقييم الوردية",
        "لوحة الترتيب",
        "الوضع الجدارية",
      ],
    },
    featuresIntro: {
      eyebrow: "تفصيل عميق",
      heading: "كل ميزة بالتفصيل",
    },
    blocks: [
      {
        title: "الاهداف الذكية التكيفية",
        headline: "اهداف تتعلم عملك",
        description:
          "يحلل Pulse تاريخ مبيعاتك، ويكشف الشذوذات، ويرسم الانماط السنوية، ويعدل تلقائياً لاحداث التقويم مثل رمضان والعطل الرسمية والموسمية المحلية. حدّد طموح النمو وسيحسب النظام اهدافاً يومية لكل موقع.",
        capabilities: [
          "رسم اهداف اسبوعية سنة بعد سنة",
          "مضاعفات نمو قابلة للضبط",
          "كشف الشذوذ مع وسم بنقرة واحدة",
          "وعي باحداث التقويم (رمضان، العيد، رأس السنة)",
          "كشف تحول الاتجاه مع تنبيهات استباقية",
          "محاكاة الاهداف المستقبلية ومعاينتها",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "تتبع المبيعات والوتيرة",
        headline: "اعرف موقعك كل ساعة",
        description:
          "وتيرة المبيعات في الوقت الحقيقي مقابل اهدافك، مقسمة بحسب جزء اليوم. الايراد المتوقع حتى هذه اللحظة، الفجوة للهدف، معدل التعافي المطلوب، وهل انت على المسار لتتجاوز اليوم ام لا.",
        capabilities: [
          "وتيرة داخل اليوم مع اجزاء يوم قابلة للضبط",
          "حسابات الفجوة الى الهدف في الوقت الحقيقي",
          "عرض الاتجاه بالساعة",
          "رؤية محفظة متعددة المواقع مع حالة RAG",
        ],
        icon: "chart" as SundaeIconName,
      },
      {
        title: "انتاجية العمالة",
        headline: "من عدد الموظفين الى الانتاجية",
        description:
          "العمالة ليست ساعات فقط - انها مخرجات. المبيعات لكل ساعة عمل، والضيوف لكل ساعة عمل، ومؤشر انتاجية مركب - في الوقت الحقيقي. شاهد الوردية المزدحمة اكثر من اللازم، والتى تحقق اعلى ايراد لكل ساعة، وما تكلفه كل وردية فعلاً.",
        capabilities: [
          "SPLH وCPLH في الوقت الحقيقي",
          "نسبة تكلفة العمالة مقابل الهدف",
          "تكلفة لكل وردية مع تفاصيل على مستوى الموظف",
          "تتبع اتجاه الانتاجية على مدى 14 يوماً",
          "معدلات ساعات قابلة للضبط حسب الدور",
        ],
        icon: "benchmarking" as SundaeIconName,
      },
      {
        title: "اداء الموظفين",
        headline: "اعرف من يقود الايراد",
        description:
          "لوحة ترتيب حية تصنف الموظفين حسب الايراد ومتوسط الفاتورة والضيوف ومعدل البيع الاضافي ودرجة انتاجية مركبة. صفّ بحسب الساعة او مرحلة الخدمة او فترة المقارنة. استخدمها للتدريب والحوافز وقرارات التوظيف.",
        capabilities: [
          "تصفية حسب الساعة او المرحلة او نطاق مخصص",
          "مقارنة مع الامس او متوسط 4 اسابيع",
          "درجة انتاجية مركبة (0-100)",
          "تفاصيل فردية مع مخططات",
          "كشف تلقائي لنقاط القوة ومجالات التحسين",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "مراقبة التسرب",
        headline: "الإلغاءات والمجانيات والخصومات، مقابل خط أساسك أنت",
        description:
          "الإلغاءات والخصومات والهدايا والاستردادات - تتبع في الوقت الحقيقي مقابل خطوطك الاساسية. يحدد Pulse عندما ترتفع معدلات التسرب، ويعرف الموظفين والاصناف والنافذات الزمنية المرتبطة، وينبهك قبل ان تتحول المشكلات الصغيرة الى انماط مكلفة - ثم يوجّه الإصلاح إلى مالك مسؤول ويقيس الهامش المُستَرد مقابل خط الأساس.",
        capabilities: [
          "تتبع الوقت الحقيقي للإلغاء والخصم والهدايا",
          "نسبة التسرب على مستوى الموظف",
          "كشف الارتفاعات مقابل خطوط اساس متحركة",
          "تنبيهات مؤتمتة للأنماط الشاذة",
        ],
        icon: "cost" as SundaeIconName,
      },
      {
        title: "Sundae Coach",
        headline: "اجراءات مرتبة حسب الاولوية، لا لوحات",
        description:
          "يراقب Sundae Coach جميع الاشارات في الوقت الحقيقي ويعرض توصيات قابلة للتنفيذ ومرتبة حسب الاولويات استناداً الى البيانات الحية. ليست نصائح عامة - بل اجراءات محددة مرتبطة بما يحدث على الارض الان، مع توجيه كل إجراء إلى المالك المسؤول في الوردية وقياس التعافي مقابل خط الأساس.",
        capabilities: [
          "توصيات سياقية في الوقت الحقيقي",
          "مرتبة بحسب اثر الايراد",
          "مبنية على بيانات Pulse الحية",
          "خطط تشغيل قابلة للضبط لكل سيناريو",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "التنبيهات وخطط التشغيل",
        headline: "استجابات مؤتمتة عندما يهم الامر",
        description:
          "عرّف الحدود. احصل على التنبيه. تحرك بسرعة. سير عمل استجابة مؤتمتة يتم تشغيله بواسطة الاستثناءات - من شذوذات الإلغاء الى ارتفاع تكاليف العمالة - مع مسارات تصعيد مدمجة.",
        capabilities: [
          "مشغلات تنبيه حسب عتبات مخصصة",
          "سير عمل تنبيه مؤتمت",
          "خطط تشغيل قابلة للضبط لكل استثناء",
          "مسارات تصعيد في الوقت الحقيقي",
        ],
        icon: "forecasting" as SundaeIconName,
      },
      {
        title: "بطاقة الوردية",
        headline: "ملخص اداء نهاية الوردية",
        description:
          "كل وردية تحصل على درجة. الايراد والضيوف ومتوسط الفاتورة وتكلفة العمالة والتسرب وابرز نقاط الموظفين - كلها في عرض واحد. شاركها مع فريقك او راجعها صباح اليوم التالي.",
        capabilities: [
          "ملخص KPI عبر كل المواقع",
          "درجة وردية مع النقاط البارزة والمنخفضة",
          "كشف تلقائي لمجالات التحسين",
          "تقرير وردية قابل للمشاركة",
        ],
        icon: "report" as SundaeIconName,
      },
      {
        title: "لوحة المحفظة",
        headline: "قارن كل موقع مباشرة",
        description:
          "مقارنة اداء متعددة المواقع مع تتبع السلاسل والترتيب التنافسي. اعرف المواقع المتألقة وتلك التي تحتاج الى انتباه - قبل نهاية اليوم.",
        capabilities: [
          "ترتيب اداء عبر المواقع",
          "تتبع السلاسل ومؤشرات الاتجاه",
          "الغوص في مقاييس كل موقع",
          "وسم المواقع المعرضة للخطر",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "وضع اللوحة الجدارية",
        headline: "ضع Pulse على الشاشة الكبيرة",
        description:
          "عرض مهيأ للتلفاز مصمم لممرات المطبخ ومكاتب المدراء ومساحات الفريق. يتنقل تلقائياً بين المواقع، ويعطي الاولوية للمواقع المعرضة للخطر، ويمنح الفريق رؤية مشتركة للوردية.",
        capabilities: [
          "عرض 16:9 مهيأ للتلفاز",
          "تبديل تلقائي بين المواقع",
          "ترتيب اولوية - المواقع المعرضة للخطر اولاً",
          "معدل تحديث ومقاييس قابلة للضبط",
        ],
        icon: "canvas" as SundaeIconName,
      },
    ],
    deepDives: {
      targets: {
        eyebrow: "ذكاء يتعلم",
        heading: "اهداف تصبح اذكى كل اسبوع",
        description:
          "معظم المنصات تجعلك تحدد الاهداف يدوياً - او تنسخ الاسبوع الماضي. يفحص محرك الذكاء التكيفي في Sundae تاريخ مبيعاتك بالكامل، ويكشف الشذوذات والموسمية، ويربط احداث التقويم بتأثيرها الفعلي على الايراد، وينتج اهدافاً مستقبلية تعكس ايقاع عملك الحقيقي. وسم حدثاً عابراً وسيُستبعد. وسم حدثاً متكرراً وسيعدل النظام السنة المقبلة تلقائياً.",
      },
      server: {
        eyebrow: "ذكاء الموظفين",
        heading: "من لوحة الترتيب الى اداة تدريب",
        description:
          "اعرف من يقود الايراد ومن يحتاج دعماً - في الوقت الحقيقي. صفّ حسب الساعة او مرحلة الخدمة او قارن مع الاسبوع الماضي. يحصل كل موظف على درجة انتاجية وتفصيل بالساعة ونقاط قوة ومجالات تحسين يتم كشفها تلقائياً. افضل المطاعم لا تكتفي بتتبع الموظفين - بل تطورهم.",
      },
      cost: {
        eyebrow: "تكلفة الوردية",
        heading: "اعرف تكلفة كل وردية",
        description:
          "وردية الصباح تعمل بأربعة موظفين لمدة 8 ساعات. ووردية المساء تعمل بثمانية لمدة 5 ساعات. ايهما مربح فعلاً؟ يفصل Pulse تكلفة كل وردية - بحسب الدور وبحسب الفرد - ويقارنها بالايراد الذي تولده. شاهد نسبة تكلفة العمالة لكل وردية، وحدد فرط التوظيف، واتخذ قرارات جدولة اذكى.",
      },
    },
    cta: {
      title: "توقف عن ادارة الورديات بلا رؤية",
      description: "Pulse موجود في كل خطة Sundae Core. شاهد ما يحدث الان - لا في نهاية اليوم.",
      primary: "احجز عرضاً",
      secondary: "ابدأ مجاناً",
    },
    heroMockup: {
      label: "Pulse - وتيرة المبيعات",
      live: "مباشر",
      updatedAt: "الثلاثاء، 7:42 مساءً",
      kpis: [
        { label: "الايراد", value: "$14,280", trend: "+12% مقابل الهدف", trendUp: true },
        { label: "الضيوف", value: "287", trend: "+12 مقابل الخطة", trendUp: true, color: "#22C55E" },
        { label: "متوسط الفاتورة", value: "$49.50", trend: "-2.1%", trendUp: false, color: "#FBBF24" },
        { label: "العمالة %", value: "28.4%", trend: "اقل من هدف 30%", trendUp: true, color: "#22C55E" },
      ],
      paceLabel: "وتيرة الايراد",
      tableHeaders: ["موظف", "المبيعات", "البيع الاضافي %", "متوسط الفاتورة"],
      tableRows: [
        ["Sarah M.", "$2,840", "32%", "$52.10"],
        ["Marcus J.", "$2,410", "28%", "$48.20"],
        ["James K.", "$1,960", "18%", "$44.50"],
      ],
      coachAlert: "معدل البيع الاضافي لدى James K. اقل بـ 14% من متوسط الوردية. فكر في إقرانه مع Sarah للطلبتين القادمتين.",
    },
  },
  fr: {
    hero: {
      badge: "Pulse - Opérations intra-journée",
      title: "2K$ perdus par mauvais service. Pulse les détecte en direct.",
      description:
        "Rythme du revenu, coût de main-d'œuvre, performance des serveurs et détection des fuites - mis à jour toutes les 5 minutes. Des objectifs adaptatifs qui apprennent vos habitudes, la saisonnalité et les événements locaux. Agissez avant que cela ne coûte.",
      primary: "Réserver une démo",
      secondary: "Voir Pulse en action",
      note: "Disponible dans les plans Sundae Core.",
    },
    quickGrid: {
      heading: "10 capacités. Un seul centre nerveux opérationnel.",
      description: "Pulse surveille votre opération en temps réel et coache votre équipe quand quelque chose déraille - puis achemine chaque correctif vers un responsable désigné et mesure la marge récupérée par rapport à la référence.",
      capabilities: [
        "Objectifs adaptatifs",
        "Rythme des ventes",
        "Productivité de la main-d'œuvre",
        "Analyses des serveurs",
        "Suivi des fuites",
        "Sundae Coach",
        "Alertes et playbooks",
        "Scorecard de service",
        "Classement",
        "Wallboard",
      ],
    },
    featuresIntro: {
      eyebrow: "DÉTAIL",
      heading: "Chaque fonctionnalité, en détail",
    },
    blocks: [
      {
        title: "Objectifs d'intelligence adaptative",
        headline: "Des objectifs qui apprennent votre activité",
        description:
          "Pulse analyse votre historique de ventes, détecte les anomalies, cartographie les tendances d'une année sur l'autre et ajuste automatiquement les événements du calendrier comme le Ramadan, les jours fériés et la saisonnalité locale. Définissez une ambition de croissance. Le système calcule des objectifs quotidiens pour chaque site.",
        capabilities: [
          "Cartographie des objectifs hebdomadaires d'une année sur l'autre",
          "Multiplicateurs de croissance configurables",
          "Détection d'anomalies avec marquage en un clic",
          "Conscience des événements du calendrier (Ramadan, Eid, NYE)",
          "Détection des changements de tendance avec alertes proactives",
          "Simulation et aperçu des objectifs futurs",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Suivi des ventes et du rythme",
        headline: "Savoir où vous en êtes, chaque heure",
        description:
          "Cadence des ventes en temps réel par rapport à vos objectifs, découpée par tranche horaire. Revenu attendu à ce stade du service, écart à l'objectif, rythme de rattrapage nécessaire et tendance du jour.",
        capabilities: [
          "Cadence intrajournée par tranches configurables",
          "Calculs temps réel de l'écart à l'objectif",
          "Visualisation horaire des tendances de revenu",
          "Vue portefeuille multi-sites avec statut RAG",
        ],
        icon: "chart" as SundaeIconName,
      },
      {
        title: "Productivité de la main-d'œuvre",
        headline: "Du headcount à la productivité",
        description:
          "La main-d'œuvre n'est pas qu'une question d'heures - c'est un résultat. Ventes par heure de travail, couverts par heure de travail et indice de productivité composé - en temps réel. Voyez quels services sont surstaffés, lesquels génèrent le plus de revenu par heure et ce que coûte vraiment chaque service.",
        capabilities: [
          "SPLH et CPLH en temps réel",
          "Ratio de coût de main-d'œuvre vs objectif",
          "Coût par service avec détail par employé",
          "Suivi des tendances de productivité sur 14 jours",
          "Taux horaires configurables par rôle",
        ],
        icon: "benchmarking" as SundaeIconName,
      },
      {
        title: "Performance des serveurs",
        headline: "Voir qui génère le revenu",
        description:
          "Un classement en direct des serveurs selon le revenu, le ticket moyen, les couverts, le taux de vente additionnelle et un score de productivité composé. Filtrez par heure, phase de service ou période de comparaison. Utilisez-le pour le coaching, les incentives et les décisions de staffing.",
        capabilities: [
          "Filtrer par heure, phase ou plage personnalisée",
          "Comparer à hier ou à la moyenne 4 semaines",
          "Score de productivité composé (0-100)",
          "Détail serveur individuel avec graphiques",
          "Points forts et axes d'amélioration détectés automatiquement",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Suivi des fuites",
        headline: "2 à 5% du revenu fuit chaque mois",
        description:
          "Voids, remises, comps et remboursements - suivis en temps réel par rapport à vos bases. Pulse signale les pics de fuite, identifie les serveurs, articles et plages horaires impliquées et vous alerte avant que de petits écarts deviennent des habitudes coûteuses - puis achemine le correctif vers un responsable désigné et mesure la marge récupérée par rapport à la référence.",
        capabilities: [
          "Suivi en temps réel des voids, remises et comps",
          "Attribution des fuites au niveau serveur",
          "Détection des pics par rapport aux lignes de base",
          "Alertes automatisées pour les schémas anormaux",
        ],
        icon: "cost" as SundaeIconName,
      },
      {
        title: "Sundae Coach",
        headline: "Actions priorisées, pas des tableaux",
        description:
          "Sundae Coach surveille tous les signaux en temps réel et fait remonter des recommandations prioritaires et actionnables basées sur les données en direct. Pas des conseils génériques - des actions précises liées à ce qui se passe sur le terrain maintenant, chacune confiée au responsable en poste, avec la récupération mesurée par rapport à la référence.",
        capabilities: [
          "Recommandations contextuelles en temps réel",
          "Priorisées par impact revenu",
          "Basées sur les données Pulse live",
          "Playbooks configurables par scénario",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Alertes et playbooks",
        headline: "Des réponses automatisées quand c'est important",
        description:
          "Définissez des seuils. Recevez une alerte. Agissez vite. Les workflows automatisées déclenchent des exceptions - des anomalies de void aux pics de coût de main-d'œuvre - avec des chemins d'escalation intégrés.",
        capabilities: [
          "Déclencheurs d'alertes basées sur des seuils",
          "Workflows de notification automatisé",
          "Playbooks configurables par exception",
          "Chemins d'escalation en temps réel",
        ],
        icon: "forecasting" as SundaeIconName,
      },
      {
        title: "Scorecard de service",
        headline: "Résumé de performance de fin de service",
        description:
          "Chaque service est noté. Revenu, couverts, ticket moyen, coût de main-d'œuvre, fuites et faits marquants des serveurs - le tout résumé dans une seule vue. Partagez-le avec votre équipe ou consultez-le le lendemain matin.",
        capabilities: [
          "Résumé KPI sur tous les sites",
          "Note de service avec points forts et faibles",
          "Axes d'amélioration détectés automatiquement",
          "Rapport de service partageable",
        ],
        icon: "report" as SundaeIconName,
      },
      {
        title: "Classement du portefeuille",
        headline: "Comparez chaque site en direct",
        description:
          "Comparaison de performance multi-sites avec suivi des séries et classement concurrentiel. Voyez quels sites performent et lesquels demandent de l'attention - avant la fin de la journée.",
        capabilities: [
          "Classement cross-site",
          "Suivi des séries et indicateurs de tendance",
          "Détail par site",
          "Signalement des sites à risque",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Mode wallboard",
        headline: "Mettez Pulse sur grand écran",
        description:
          "Un affichage optimisé TV pour les pass-through cuisine, les bureaux de direction et les espaces équipe. Rotation automatique entre les sites, priorisation des sites à risque, et vue partagée du service.",
        capabilities: [
          "Affichage 16:9 optimisé TV",
          "Rotation automatique entre sites",
          "Priorisation des sites à risque",
          "Fréquence de rafraîchissement et métriques configurables",
        ],
        icon: "canvas" as SundaeIconName,
      },
    ],
    deepDives: {
      targets: {
        eyebrow: "INTELLIGENCE QUI APPREND",
        heading: "Des objectifs plus intelligents chaque semaine",
        description:
          "La plupart des plateformes vous forcent à définir les objectifs manuellement - ou à copier la semaine précédente. Le moteur d'intelligence adaptative de Sundae analyse l'ensemble de votre historique de ventes, détecte les anomalies et la saisonnalité, associe les événements du calendrier à leur impact réel sur le revenu et génère des objectifs prospectifs qui reflètent votre rythme réel. Marquez un événement ponctuel et il sera exclu. Marquez un événement récurrent et le système s'ajustera l'année suivante automatiquement.",
      },
      server: {
        eyebrow: "INTELLIGENCE SERVEUR",
        heading: "Du classement à l'outil de coaching",
        description:
          "Voyez qui génère le revenu et qui a besoin de soutien - en temps réel. Filtrez par heure, par phase de service ou comparez à la semaine précédente. Chaque serveur reçoit un score de productivité, un détail horaire et des points forts/axes d'amélioration détectés automatiquement. Les meilleurs restaurants ne se contentent pas de suivre les serveurs - ils les développent.",
      },
      cost: {
        eyebrow: "COÛT DE SERVICE",
        heading: "Savoir ce que coûte chaque service",
        description:
          "Votre service du matin tourne avec 4 personnes pendant 8 heures. Votre service du soir avec 8 personnes pendant 5 heures. Lequel est vraiment rentable ? Pulse détaille le coût de chaque service - par rôle, par personne - et le compare au revenu généré. Voyez votre ratio de coût de main-d'œuvre par service, identifiez le surstaffing et prenez de meilleures décisions de planning.",
      },
    },
    cta: {
      title: "Arrêtez de gérer les services à l'aveugle",
      description: "Pulse est inclus dans chaque plan Sundae Core. Voyez ce qui se passe maintenant - pas à la fin de la journée.",
      primary: "Réserver une démo",
      secondary: "Commencer gratuitement",
    },
    heroMockup: {
      label: "Pulse - Rythme des ventes",
      live: "EN DIRECT",
      updatedAt: "Mardi, 7:42 PM",
      kpis: [
        { label: "Revenu", value: "$14,280", trend: "+12% vs objectif", trendUp: true },
        { label: "Couverts", value: "287", trend: "+12 vs plan", trendUp: true, color: "#22C55E" },
        { label: "Ticket moyen", value: "$49.50", trend: "-2.1%", trendUp: false, color: "#FBBF24" },
        { label: "Main-d'œuvre %", value: "28.4%", trend: "Sous l'objectif de 30%", trendUp: true, color: "#22C55E" },
      ],
      paceLabel: "Rythme du revenu",
      tableHeaders: ["Serveur", "Ventes", "Ventes additionnelles %", "Ticket moyen"],
      tableRows: [
        ["Sarah M.", "$2,840", "32%", "$52.10"],
        ["Marcus J.", "$2,410", "28%", "$48.20"],
        ["James K.", "$1,960", "18%", "$44.50"],
      ],
      coachAlert: "Le taux de vente additionnelle de James K. est 14% sous la moyenne du service. Envisagez de le faire travailler avec Sarah pour les 2 prochaines tables.",
    },
  },
  es: {
    hero: {
      badge: "Pulse - Operaciones intradía",
      title: "El margen se pierde durante el turno. Pulse lo detecta en vivo.",
      description:
        "Ritmo de ingresos, costo laboral, rendimiento de servidores y detección de fugas - actualizándose cada 5 minutos. Objetivos adaptativos que aprenden tus patrones, estacionalidad y eventos locales. Actúa antes de que te cueste.",
      primary: "Reservar demo",
      secondary: "Ver Pulse en acción",
      note: "Disponible en los planes Sundae Core.",
    },
    quickGrid: {
      heading: "10 capacidades. Un solo centro nervioso operativo.",
      description: "Pulse monitorea tu operación en tiempo real y entrena a tu equipo cuando algo se sale del rumbo - luego dirige cada corrección a un responsable asignado y mide el margen recuperado frente a la línea de base.",
      capabilities: [
        "Objetivos adaptativos",
        "Ritmo de ventas",
        "Productividad laboral",
        "Análisis de servidores",
        "Monitoreo de fugas",
        "Sundae Coach",
        "Alertas y playbooks",
        "Scorecard de turno",
        "Leaderboard",
        "Wallboard",
      ],
    },
    featuresIntro: {
      eyebrow: "DEEP DIVE",
      heading: "Cada funcionalidad, en detalle",
    },
    blocks: [
      {
        title: "Objetivos de inteligencia adaptativa",
        headline: "Objetivos que aprenden tu negocio",
        description:
          "Pulse analiza tu histórico de ventas, detecta anomalías, mapea patrones año contra año y ajusta eventos de calendario como Ramadan, feriados y estacionalidad local - automáticamente. Define una ambición de crecimiento. El sistema calcula objetivos diarios para cada local.",
        capabilities: [
          "Mapeo semanal de objetivos año contra año",
          "Multiplicadores de crecimiento configurables",
          "Detección de anomalías con etiquetado de un clic",
          "Conciencia de eventos de calendario (Ramadan, Eid, NYE)",
          "Detección de cambios de tendencia con alertas proactivas",
          "Simulación y vista previa de objetivos futuros",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Seguimiento de ventas y ritmo",
        headline: "Sabe dónde estás, cada hora",
        description:
          "Ritmo de ventas en tiempo real contra tus objetivos, dividido por parte del día. Ingreso esperado hasta este punto del turno, brecha al objetivo, ritmo de recuperación necesario y si vas a superar o quedar por debajo del día.",
        capabilities: [
          "Ritmo intradía con partes del día configurables",
          "Cálculos de brecha al objetivo en tiempo real",
          "Visualización horaria de tendencias de ingresos",
          "Vista de cartera multi-local con estado RAG",
        ],
        icon: "chart" as SundaeIconName,
      },
      {
        title: "Productividad laboral",
        headline: "De headcount a productividad",
        description:
          "La mano de obra no son solo horas - es output. Ventas por hora laboral, cubiertos por hora laboral e índice compuesto de productividad - en tiempo real. Mira qué turnos están sobredimensionados, cuáles generan más ingresos por hora y cuánto cuesta realmente cada turno.",
        capabilities: [
          "SPLH y CPLH en tiempo real",
          "Ratio de costo laboral vs objetivo",
          "Costo por turno con detalle por empleado",
          "Seguimiento de tendencia de productividad por 14 días",
          "Tarifas por hora configurables por rol",
        ],
        icon: "benchmarking" as SundaeIconName,
      },
      {
        title: "Rendimiento de servidores",
        headline: "Ve quién impulsa ingresos",
        description:
          "Leaderboard en vivo que clasifica servidores por ingresos, ticket promedio, cubiertos, venta adicional y una puntuación compuesta de productividad. Filtra por hora, fase de servicio o periodo de comparación. Úsalo para coaching, incentivos y decisiones de staffing.",
        capabilities: [
          "Filtrar por hora, fase o rango personalizado",
          "Comparar vs ayer o promedio de 4 semanas",
          "Puntuación compuesta de productividad (0-100)",
          "Detalle individual con gráficos",
          "Fortalezas y áreas de mejora detectadas automáticamente",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Monitoreo de fugas",
        headline: "Anulaciones, invitaciones y descuentos, frente a tu propia referencia",
        description:
          "Void, descuentos, comps y reembolsos - rastreados en tiempo real contra tus bases. Pulse marca cuando suben las fugas, identifica los servidores, items y ventanas de tiempo involucradas, y te alerta antes de que los pequeños problemas se vuelvan patrones costosos - luego dirige la corrección a un responsable asignado y mide el margen recuperado frente a la línea de base.",
        capabilities: [
          "Seguimiento en tiempo real de voids, descuentos y comps",
          "Atribución de fugas a nivel servidor",
          "Detección de picos contra bases móviles",
          "Alertas automatizadas para patrones anómalos",
        ],
        icon: "cost" as SundaeIconName,
      },
      {
        title: "Sundae Coach",
        headline: "Acciones priorizadas, no dashboards",
        description:
          "Sundae Coach monitorea todas las señales en tiempo real y muestra recomendaciones priorizadas y accionables basadas en datos vivos. No consejos genéricos - acciones específicas ligadas a lo que pasa en tu piso ahora mismo, cada una asignada al responsable de turno, con la recuperación medida frente a la línea de base.",
        capabilities: [
          "Recomendaciones contextuales en tiempo real",
          "Priorizadas por impacto en ingresos",
          "Basadas en datos Pulse en vivo",
          "Playbooks configurables por escenario",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Alertas y playbooks",
        headline: "Respuestas automatizadas cuando importa",
        description:
          "Define umbrales. Recibe una alerta. Actúa rápido. Workflows de respuesta automatizados disparados por excepciones - desde anomalías de void hasta picos de costo laboral - con rutas de escalamiento integradas.",
        capabilities: [
          "Disparadores de alerta basados en umbrales",
          "Workflows de notificación automatizados",
          "Playbooks configurables por excepción",
          "Rutas de escalamiento en tiempo real",
        ],
        icon: "forecasting" as SundaeIconName,
      },
      {
        title: "Scorecard de turno",
        headline: "Resumen de rendimiento al final del turno",
        description:
          "Cada turno recibe una nota. Ingresos, cubiertos, ticket promedio, costo laboral, fugas y destacados del servidor - resumidos en una sola vista. Compártelo con tu equipo o revísalo a la mañana siguiente.",
        capabilities: [
          "Resumen KPI en todos los locales",
          "Nota de turno con positivos y negativos",
          "Áreas de mejora detectadas automáticamente",
          "Reporte de turno compartible",
        ],
        icon: "report" as SundaeIconName,
      },
      {
        title: "Leaderboard de cartera",
        headline: "Compara cada local, en vivo",
        description:
          "Comparación de rendimiento multi-local con seguimiento de rachas y ranking competitivo. Mira qué locales van con todo y cuáles necesitan atención - antes del cierre.",
        capabilities: [
          "Ranking de rendimiento entre locales",
          "Seguimiento de rachas e indicadores de tendencia",
          "Drill-down a métricas individuales por local",
          "Marcado de locales en riesgo",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Modo wallboard",
        headline: "Pon Pulse en la pantalla grande",
        description:
          "Una pantalla optimizada para TV, pensada para pass-through de cocina, oficinas de gerencia y áreas de staff. Rota automáticamente entre locales, prioriza ubicaciones en riesgo y le da al equipo una vista compartida del turno.",
        capabilities: [
          "Pantalla 16:9 optimizada para TV",
          "Rotación automática entre locales",
          "Orden de prioridad (riesgo primero)",
          "Frecuencia de actualización y métricas configurables",
        ],
        icon: "canvas" as SundaeIconName,
      },
    ],
    deepDives: {
      targets: {
        eyebrow: "INTELIGENCIA QUE APRENDE",
        heading: "Objetivos más inteligentes cada semana",
        description:
          "La mayoría de las plataformas te obligan a fijar objetivos manualmente - o copiar la semana pasada. El motor de inteligencia adaptativa de Sundae escanea todo tu histórico de ventas, detecta anomalías y estacionalidad, vincula eventos de calendario con su impacto real en ingresos y genera objetivos prospectivos que reflejan tu ritmo real de negocio. Marca un evento único y se excluye. Marca un evento recurrente y el sistema se ajusta automáticamente el año siguiente.",
      },
      server: {
        eyebrow: "INTELIGENCIA DE SERVIDORES",
        heading: "Del leaderboard a la herramienta de coaching",
        description:
          "Ve quién impulsa ingresos y quién necesita apoyo en tiempo real. Filtra por hora, por fase de servicio o compara contra la semana pasada. Cada servidor obtiene una puntuación de productividad, un desglose por hora y fortalezas y áreas de mejora detectadas automáticamente. Los mejores restaurantes usan estos datos para formar mejor al equipo.",
      },
      cost: {
        eyebrow: "COSTO DE TURNO",
        heading: "Sabe cuánto cuesta cada turno",
        description:
          "Tu turno de mañana opera con 4 personas durante 8 horas. Tu turno de noche con 8 durante 5 horas. ¿Cuál es realmente rentable? Pulse desglosa el costo de cada turno - por rol y por persona - y lo compara con los ingresos que genera. Ve tu ratio de costo laboral por turno, identifica el exceso de personal y toma decisiones de scheduling más inteligentes.",
      },
    },
    cta: {
      title: "Deja de gestionar turnos a ciegas",
      description: "Pulse está incluido en cada plan Sundae Core. Ve lo que pasa ahora - no al final del día.",
      primary: "Reservar demo",
      secondary: "Empezar gratis",
    },
    heroMockup: {
      label: "Pulse - Ritmo de ventas",
      live: "EN VIVO",
      updatedAt: "Martes, 7:42 PM",
      kpis: [
        { label: "Ingresos", value: "$14,280", trend: "+12% vs objetivo", trendUp: true },
        { label: "Cubiertos", value: "287", trend: "+12 vs plan", trendUp: true, color: "#22C55E" },
        { label: "Ticket medio", value: "$49.50", trend: "-2.1%", trendUp: false, color: "#FBBF24" },
        { label: "% Labor", value: "28.4%", trend: "Por debajo del objetivo 30%", trendUp: true, color: "#22C55E" },
      ],
      paceLabel: "Ritmo de ingresos",
      tableHeaders: ["Mesero", "Ventas", "Venta adicional %", "Ticket medio"],
      tableRows: [
        ["Sarah M.", "$2,840", "32%", "$52.10"],
        ["Marcus J.", "$2,410", "28%", "$48.20"],
        ["James K.", "$1,960", "18%", "$44.50"],
      ],
      coachAlert: "La tasa de venta adicional de James K. está 14% por debajo del promedio del turno. Considera emparejarlo con Sarah para las próximas 2 mesas.",
    },
  },
} as const;

/* ─── Inline Mockup Compositions ─── */

function AdaptiveTargetsMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - الاهداف التكيفية" : locale === "fr" ? "Pulse - Objectifs adaptatifs" : locale === "es" ? "Pulse - Objetivos adaptativos" : "Pulse - Adaptive Targets";
  const todayTarget = locale === "ar" ? "الهدف اليومي" : locale === "fr" ? "Objectif du jour" : locale === "es" ? "Objetivo de hoy" : "Today's Target";
  const growthModifier = locale === "ar" ? "مضاعف النمو" : locale === "fr" ? "Multiplicateur de croissance" : locale === "es" ? "Multiplicador de crecimiento" : "Growth Modifier";
  const confidence = locale === "ar" ? "الثقة" : locale === "fr" ? "Confiance" : locale === "es" ? "Confianza" : "Confidence";
  const days = locale === "ar" ? ["الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت", "الاحد"] : locale === "fr" ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] : locale === "es" ? ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const alert = locale === "ar"
    ? "تعديل رمضان: تم تطبيق -12% على اهداف ايام الاسبوع. تم رفع اهداف الجمعة +18% لخدمة الافطار."
    : locale === "fr"
      ? "Ajustement Ramadan : -12% appliqués aux objectifs en semaine. Les objectifs du vendredi augmentent de +18% pour le service d'iftar."
      : locale === "es"
        ? "Ajuste de Ramadan: se aplicó -12% a los objetivos de días laborales. Los objetivos del viernes suben +18% para el servicio de iftar."
        : "Ramadan adjustment: -12% applied to weekday targets. Friday targets boosted +18% for iftar service.";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label={todayTarget} value="$18,200" color="#FF5C4D" />
          <MockupKPI label={growthModifier} value="+8%" trend={locale === "ar" ? "مقابل الاساس" : locale === "fr" ? "vs base" : locale === "es" ? "vs base" : "vs base"} trendUp color="#22C55E" />
          <MockupKPI label={confidence} value="94%" color="#22C55E" />
        </div>
        <MockupBarChart
          data={[
            { label: days[0], value: 15200, color: "#FF5C4D" },
            { label: days[1], value: 16800, color: "#FF5C4D" },
            { label: days[2], value: 14900, color: "#FBBF24" },
            { label: days[3], value: 17600, color: "#FF5C4D" },
            { label: days[4], value: 21400, color: "#22C55E" },
            { label: days[5], value: 23100, color: "#22C55E" },
            { label: days[6], value: 18900, color: "#FF5C4D" },
          ]}
        />
        <MockupAlert type="info">
          {alert}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function SalesPacingMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - وتيرة المبيعات" : locale === "fr" ? "Pulse - Rythme des ventes" : locale === "es" ? "Pulse - Ritmo de ventas" : "Pulse - Sales Pacing";
  const live = locale === "ar" ? "الثلاثاء، 7:42 مساءً" : locale === "fr" ? "Mardi, 19:42" : locale === "es" ? "Martes, 7:42 PM" : "Tuesday, 7:42 PM";
  const actual = locale === "ar" ? "الفعلي" : locale === "fr" ? "Réel" : locale === "es" ? "Real" : "Actual";
  const expected = locale === "ar" ? "المتوقع" : locale === "fr" ? "Attendu" : locale === "es" ? "Esperado" : "Expected";
  const dayTarget = locale === "ar" ? "هدف اليوم" : locale === "fr" ? "Objectif du jour" : locale === "es" ? "Objetivo del día" : "Day Target";
  const revenuePace = locale === "ar" ? "وتيرة الايراد" : locale === "fr" ? "Rythme du revenu" : locale === "es" ? "Ritmo de ingresos" : "Revenue Pace";
  const coversPace = locale === "ar" ? "وتيرة الضيوف" : locale === "fr" ? "Rythme des couverts" : locale === "es" ? "Ritmo de cubiertos" : "Covers Pace";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]"><span className="animate-live-dot" />{locale === "ar" ? "مباشر" : locale === "fr" ? "EN DIRECT" : locale === "es" ? "EN VIVO" : "LIVE"}</span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">{live}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label={actual} value="$14,280" trend={locale === "ar" ? "+12% مقابل الهدف" : locale === "fr" ? "+12% vs objectif" : locale === "es" ? "+12% vs objetivo" : "+12% vs target"} trendUp color="#22C55E" />
          <MockupKPI label={expected} value="$12,740" color="#FF5C4D" />
          <MockupKPI label={dayTarget} value="$18,200" color="#FF5C4D" />
        </div>
        <MockupPaceBar label={revenuePace} current={14280} target={18200} unit="$" />
        <MockupPaceBar label={coversPace} current={287} target={340} />
        <MockupBarChart
          data={[
            { label: "11a", value: 1200 },
            { label: "12p", value: 2800 },
            { label: "1p", value: 3100 },
            { label: "2p", value: 1400 },
            { label: "5p", value: 2100 },
            { label: "6p", value: 2400 },
            { label: "7p", value: 1280 },
          ]}
        />
      </div>
    </MockupFrame>
  );
}

function LaborMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - انتاجية العمالة" : locale === "fr" ? "Pulse - Productivité de la main-d'œuvre" : locale === "es" ? "Pulse - Productividad laboral" : "Pulse - Labor Productivity";
  const headers = locale === "ar" ? ["الدور", "الطاقم", "الساعات", "التكلفة", "SPLH"] : locale === "fr" ? ["Rôle", "Équipe", "Heures", "Coût", "SPLH"] : locale === "es" ? ["Rol", "Equipo", "Horas", "Costo", "SPLH"] : ["Role", "Staff", "Hours", "Cost", "SPLH"];
  const rows = locale === "ar"
    ? [["النادلون", "4", "24h", "$720", "$79.50"], ["المطبخ", "3", "21h", "$630", "$54.30"], ["البار", "2", "12h", "$360", "$71.20"], ["الاستقبال", "1", "8h", "$130", "-"]]
    : locale === "fr"
      ? [["Serveurs", "4", "24h", "$720", "$79.50"], ["Cuisine", "3", "21h", "$630", "$54.30"], ["Bar", "2", "12h", "$360", "$71.20"], ["Accueil", "1", "8h", "$130", "-"]]
      : locale === "es"
        ? [["Meseros", "4", "24h", "$720", "$79.50"], ["Cocina", "3", "21h", "$630", "$54.30"], ["Barra", "2", "12h", "$360", "$71.20"], ["Host", "1", "8h", "$130", "-"]]
        : [["Servers", "4", "24h", "$720", "$79.50"], ["Kitchen", "3", "21h", "$630", "$54.30"], ["Bar", "2", "12h", "$360", "$71.20"], ["Host", "1", "8h", "$130", "-"]];
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label="SPLH" value="$62.40" trend={locale === "ar" ? "+8% مقابل المتوسط" : locale === "fr" ? "+8% vs moyenne" : locale === "es" ? "+8% vs promedio" : "+8% vs avg"} trendUp color="#22C55E" />
          <MockupKPI label="CPLH" value="4.2" color="#FF5C4D" />
          <MockupKPI label={locale === "ar" ? "نسبة العمالة" : locale === "fr" ? "Main-d'œuvre %" : locale === "es" ? "% Labor" : "Labor %"} value="28.1%" trend={locale === "ar" ? "اقل من 30%" : locale === "fr" ? "Sous 30%" : locale === "es" ? "Bajo 30%" : "Under 30%"} trendUp color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "تكلفة الوردية" : locale === "fr" ? "Coût de service" : locale === "es" ? "Costo de turno" : "Shift Cost"} value="$1,840" color="#FBBF24" />
        </div>
        <MockupTable
          headers={headers}
          rows={rows}
        />
      </div>
    </MockupFrame>
  );
}

function ServerPerformanceMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - لوحة ترتيب الموظفين" : locale === "fr" ? "Pulse - Classement des serveurs" : locale === "es" ? "Pulse - Ranking de servidores" : "Pulse - Server Leaderboard";
  const headers = locale === "ar" ? ["#", "الموظف", "الايراد", "متوسط الفاتورة", "نسبة البيع الاضافي", "الدرجة"] : locale === "fr" ? ["#", "Serveur", "Revenu", "Ticket moyen", "Ventes additionnelles %", "Score"] : locale === "es" ? ["#", "Mesero", "Ingresos", "Ticket medio", "Venta adicional %", "Score"] : ["#", "Server", "Revenue", "Avg Check", "Upsell %", "Score"];
  const alert = locale === "ar"
    ? "معدل البيع الاضافي لدى James K. اقل بـ 14 نقطة عن متوسط الوردية. فكر في إقرانه مع Sarah للطلبتين القادمتين."
    : locale === "fr"
      ? "Le taux de vente additionnelle de James K. est 14 points sous la moyenne du service. Pensez à le faire travailler avec Sarah pour les 2 prochaines tables."
      : locale === "es"
        ? "La tasa de venta adicional de James K. está 14 puntos por debajo del promedio del turno. Considera emparejarlo con Sarah para las próximas 2 mesas."
        : "James K. upsell rate is 14pp below shift average. Consider pairing with Sarah for the next 2 tables.";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <MockupTable
          headers={headers}
          rows={[
            ["1", "Sarah M.", "$2,840", "$52.10", "32%", "94"],
            ["2", "Marcus J.", "$2,410", "$48.20", "28%", "87"],
            ["3", "Priya K.", "$2,180", "$51.40", "26%", "82"],
            ["4", "James K.", "$1,960", "$44.50", "18%", "68"],
          ]}
        />
        <MockupAlert type="coach">
          {alert}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function LeakageMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - مراقبة التسرب" : locale === "fr" ? "Pulse - Suivi des fuites" : locale === "es" ? "Pulse - Monitoreo de fugas" : "Pulse - Leakage Monitor";
  const totalLeakage = locale === "ar" ? "اجمالي التسرب" : locale === "fr" ? "Fuite totale" : locale === "es" ? "Fuga total" : "Total Leakage";
  const voidRate = locale === "ar" ? "معدل الإلغاء" : locale === "fr" ? "Taux de void" : locale === "es" ? "Tasa de void" : "Void Rate";
  const exceptions = locale === "ar" ? "الاستثناءات" : locale === "fr" ? "Exceptions" : locale === "es" ? "Excepciones" : "Exceptions";
  const headers = locale === "ar" ? ["النوع", "العدد", "المبلغ", "الموظف"] : locale === "fr" ? ["Type", "Nombre", "Montant", "Serveur"] : locale === "es" ? ["Tipo", "Cantidad", "Monto", "Mesero"] : ["Type", "Count", "Amount", "Server"];
  const alert = locale === "ar"
    ? "لدى James K. خمس استثناءات في هذه الوردية - 3x متوسط الفريق. يوصى بالمراجعة."
    : locale === "fr"
      ? "James K. a 5 exceptions sur ce service - 3x la moyenne de l'équipe. Revue recommandée."
      : locale === "es"
        ? "James K. tiene 5 excepciones en este turno - 3x el promedio del equipo. Se recomienda revisión."
        : "James K. has 5 exceptions this shift - 3x the team average. Review recommended.";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label={totalLeakage} value="$2,630" color="#FF5450" />
          <MockupKPI label={voidRate} value="3.2%" trend={locale === "ar" ? "+0.8% مقابل المتوسط" : locale === "fr" ? "+0.8% vs moyenne" : locale === "es" ? "+0.8% vs promedio" : "+0.8% vs avg"} trendUp={false} color="#FBBF24" />
          <MockupKPI label={exceptions} value="14" color="#FF5450" />
        </div>
        <MockupTable
          headers={headers}
          rows={[
            ["Void after print", "6", "$840", "Multiple"],
            ["Unauthorized disc.", "4", "$620", "James K."],
            ["Price override", "3", "$480", "Marcus J."],
            ["Comp no approval", "1", "$690", "James K."],
          ]}
        />
        <MockupAlert type="critical">
          {alert}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function CoachMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Sundae Coach - اشارات الوردية" : locale === "fr" ? "Sundae Coach - Signaux de service" : locale === "es" ? "Sundae Coach - Señales de turno" : "Sundae Coach - Shift Signals";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-3">
        <MockupAlert type="coach">
          {locale === "ar" ? "وتيرة الايراد متقدمة 12% عن الهدف. حافظ على التوظيف الحالي - لا تخفض مبكراً." : locale === "fr" ? "Le rythme du revenu est 12% au-dessus de l'objectif. Maintenez le staff actuel - ne réduisez pas trop tôt." : locale === "es" ? "El ritmo de ingresos va 12% por delante del objetivo. Mantiene el personal actual - no recortes temprano." : "Revenue pace is 12% ahead of target. Maintain current staffing - do not cut early."}
        </MockupAlert>
        <MockupAlert type="warning">
          {locale === "ar" ? "انخفض متوسط الفاتورة 4.20 دولار في الساعة الاخيرة. يمثل James K. 60% من التراجع. يحتاج الى تدريب على البيع الاضافي." : locale === "fr" ? "Le ticket moyen a baissé de 4,20$ durant la dernière heure. James K. représente 60% de la baisse. Coaching de vente additionnelle nécessaire." : locale === "es" ? "El ticket medio cayó $4.20 en la última hora. James K. representa el 60% de la caída. Hace falta coaching de venta adicional." : "Avg check dropped $4.20 in the last hour. Server James K. accounts for 60% of the decline. Upsell coaching needed."}
        </MockupAlert>
        <MockupAlert type="critical">
          {locale === "ar" ? "ارتفع معدل الإلغاء الى 3.2% (الاساس: 1.8%). 4 حالات في 45 دقيقة من الطرفية #3. يوصى بمراجعة المدير." : locale === "fr" ? "Le taux de void est monté à 3,2% (base: 1,8%). 4 voids en 45 min depuis le terminal #3. Revue manager recommandée." : locale === "es" ? "La tasa de void subió a 3.2% (base: 1.8%). 4 voids en 45 min desde el terminal #3. Se recomienda revisión del gerente." : "Void rate spiked to 3.2% (baseline: 1.8%). 4 voids in 45 min from terminal #3. Manager review recommended."}
        </MockupAlert>
        <MockupAlert type="info">
          {locale === "ar" ? "توقع السبت: +22% ضيوف استناداً الى حدث محلي (ماراثون). جهز الاصناف عالية الدوران بحلول الجمعة 4 مساءً." : locale === "fr" ? "Prévision samedi: +22% de couverts grâce à un événement local (marathon). Pre-stockez les articles à forte rotation avant vendredi 16h." : locale === "es" ? "Pronóstico sábado: +22% cubiertos por evento local (maratón). Pre-stock de items de alta rotación antes del viernes 4 PM." : "Saturday forecast: +22% covers based on local event (marathon). Pre-stock high-turnover items by Friday 4 PM."}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function AlertsMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - التنبيهات وخطط التشغيل" : locale === "fr" ? "Pulse - Alertes et playbooks" : locale === "es" ? "Pulse - Alertas y playbooks" : "Pulse - Alerts & Playbooks";
  const headers = locale === "ar" ? ["التنبيه", "المحفز", "الحالة", "الاجراء"] : locale === "fr" ? ["Alerte", "Déclencheur", "Statut", "Action"] : locale === "es" ? ["Alerta", "Disparador", "Estado", "Acción"] : ["Alert", "Trigger", "Status", "Action"];
  const alert = locale === "ar" ? "تم تشغيل الخطة: \"بروتوكول البيع الاضافي\" - تم إشعار الموظفين تلقائياً عبر Sundae Coach بأفضل 3 عناصر هامشاً." : locale === "fr" ? "Playbook déclenché:\"Protocole de vente additionnelle\" - serveurs auto-notifiés via Sundae Coach avec les 3 meilleurs articles marge." : locale === "es" ? "Playbook activado: \"Protocolo de venta adicional\" - servidores notificados automáticamente vía Sundae Coach con los 3 items de mejor margen." : "Playbook triggered: \"Upsell Protocol\" - auto-notified servers via Sundae Coach with top 3 margin items.";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <MockupTable
          headers={headers}
          rows={[
            [locale === "ar" ? "الايراد متأخر" : locale === "fr" ? "Revenu en retard" : locale === "es" ? "Ingresos atrás" : "Revenue behind pace", locale === "ar" ? "فجوة >15% عند 2 مساءً" : locale === "fr" ? "Écart >15% à 14h" : locale === "es" ? "Brecha >15% a las 2PM" : ">15% gap at 2PM", "🔴 Active", locale === "ar" ? "فعّل بروتوكول البيع الاضافي" : locale === "fr" ? "Lancer le protocole de vente additionnelle" : locale === "es" ? "Disparar protocolo de venta adicional" : "Push upsell protocol"],
            [locale === "ar" ? "ارتفاع تكلفة العمالة" : locale === "fr" ? "Pic de coût main-d'œuvre" : locale === "es" ? "Pico de costo laboral" : "Labor cost spike", locale === "ar" ? ">32% نسبة" : locale === "fr" ? ">32% ratio" : locale === "es" ? ">32% ratio" : ">32% ratio", "🟡 Warning", locale === "ar" ? "راجع staffing المسائي" : locale === "fr" ? "Revoir le staff du soir" : locale === "es" ? "Revisar staffing de la tarde" : "Review evening staffing"],
            [locale === "ar" ? "شذوذ الإلغاء" : locale === "fr" ? "Anomalie de void" : locale === "es" ? "Anomalía de void" : "Void anomaly", locale === "ar" ? ">2x الخط الاساسي" : locale === "fr" ? ">2x base" : locale === "es" ? ">2x base" : ">2x baseline", "🔴 Active", locale === "ar" ? "مراجعة المدير" : locale === "fr" ? "Revue manager" : locale === "es" ? "Revisión del gerente" : "Manager review"],
            [locale === "ar" ? "الضيوف متقدمون" : locale === "fr" ? "Couverts en avance" : locale === "es" ? "Cubiertos por delante" : "Covers ahead", locale === "ar" ? ">20% فوق الخطة" : locale === "fr" ? ">20% au-dessus du plan" : locale === "es" ? ">20% sobre el plan" : ">20% over plan", "🟢 Positive", locale === "ar" ? "جهز محطات الاحتياط" : locale === "fr" ? "Préparer les stations de secours" : locale === "es" ? "Preparar estaciones de respaldo" : "Prep backup stations"],
          ]}
        />
        <MockupAlert type="info">
          {alert}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function ScorecardMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - بطاقة الوردية" : locale === "fr" ? "Pulse - Scorecard de service" : locale === "es" ? "Pulse - Scorecard de turno" : "Pulse - Shift Scorecard";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{locale === "ar" ? "ملخص وردية الغداء" : locale === "fr" ? "Résumé du service de midi" : locale === "es" ? "Resumen del turno de almuerzo" : "Lunch Shift Summary"}</div>
          <div className="text-3xl font-bold font-mono text-[#22C55E] mt-1">A−</div>
          <div className="text-[11px] text-[var(--text-muted)]">{locale === "ar" ? "الدرجة الاجمالية للوردية" : locale === "fr" ? "Note globale du service" : locale === "es" ? "Nota general del turno" : "Overall Shift Grade"}</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label={locale === "ar" ? "الايراد" : locale === "fr" ? "Revenu" : locale === "es" ? "Ingresos" : "Revenue"} value="$9,840" trend="+6%" trendUp />
          <MockupKPI label={locale === "ar" ? "الضيوف" : locale === "fr" ? "Couverts" : locale === "es" ? "Cubiertos" : "Covers"} value="187" trend="+12" trendUp color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "متوسط الفاتورة" : locale === "fr" ? "Ticket moyen" : locale === "es" ? "Ticket medio" : "Avg Check"} value="$52.60" trend="+$1.40" trendUp color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "العمالة %" : locale === "fr" ? "Main-d'œuvre %" : locale === "es" ? "% Labor" : "Labor %"} value="27.8%" trend={locale === "ar" ? "اقل من 30%" : locale === "fr" ? "Sous 30%" : locale === "es" ? "Bajo 30%" : "Under 30%"} trendUp color="#22C55E" />
        </div>
        <MockupAlert type="coach">
          {locale === "ar" ? "ابرز النقاط: وصل معدل البيع الاضافي الى 28% (الافضل هذا الشهر). مجال التحسين: متوسط زمن تذكرة المطبخ 14 دقيقة (الهدف: 12)." : locale === "fr" ? "Points forts: taux de vente additionnelle à 28% (meilleur du mois). À améliorer: ticket cuisine moyen de 14 min (objectif: 12)." : locale === "es" ? "Puntos fuertes: venta adicional al 28% (mejor del mes). A mejorar: ticket de cocina promedio 14 min (objetivo: 12)." : "Highlights: Upsell rate hit 28% (best this month). Area to improve: Kitchen ticket time averaged 14 min (target: 12 min)."}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function LeaderboardMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - لوحة ترتيب المحفظة" : locale === "fr" ? "Pulse - Classement du portefeuille" : locale === "es" ? "Pulse - Ranking de cartera" : "Pulse - Portfolio Leaderboard";
  const headers = locale === "ar" ? ["#", "الموقع", "الايراد", "مقابل الهدف", "السلسلة"] : locale === "fr" ? ["#", "Site", "Revenu", "vs objectif", "Serie"] : locale === "es" ? ["#", "Local", "Ingresos", "vs objetivo", "Racha"] : ["#", "Outlet", "Revenue", "vs Target", "Streak"];
  const alert = locale === "ar" ? "المطار متأخر 8% عن الهدف ليومين متتاليين. اكبر مشكلة: انخفاض الضيوف في فترة 2-5 مساءً (38% اقل من الخطة)." : locale === "fr" ? "L'aéroport est 8% sous l'objectif depuis 2 jours. Problème principal: faibles couverts sur le créneau 14h-17h (38% sous le plan)." : locale === "es" ? "El aeropuerto va 8% por debajo del objetivo por 2 días seguidos. Problema principal: cubiertos bajos entre 2-5 PM (38% por debajo del plan)." : "Airport is 8% behind target for 2 consecutive days. Top issue: low covers during 2-5 PM daypart (38% below plan).";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <MockupTable
          headers={headers}
          rows={[
            ["1", "Downtown", "$14,280", "+12%", "🔥 5 days"],
            ["2", "Marina", "$11,940", "+4%", "🔥 3 days"],
            ["3", "Mall Branch", "$9,620", "−2%", "-"],
            ["4", "Airport", "$8,410", "−8%", "⚠ 2 days"],
          ]}
        />
        <MockupAlert type="warning">
          {alert}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function WallboardMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - وضع اللوحة الجدارية" : locale === "fr" ? "Pulse - Mode wallboard" : locale === "es" ? "Pulse - Modo wallboard" : "Pulse - Wallboard Mode (TV Display)";
  return (
    <MockupFrame label={label} glow>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]"><span className="animate-live-dot" />{locale === "ar" ? "مباشر" : locale === "fr" ? "EN DIRECT" : locale === "es" ? "EN VIVO" : "LIVE"}</span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">{locale === "ar" ? "وسط المدينة - تدوير تلقائي" : locale === "fr" ? "Downtown - Rotation automatique" : locale === "es" ? "Downtown - Rotación automática" : "Downtown - Auto-rotating"}</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label={locale === "ar" ? "الايراد" : locale === "fr" ? "Revenu" : locale === "es" ? "Ingresos" : "Revenue"} value="$14,280" trend="+12%" trendUp />
          <MockupKPI label={locale === "ar" ? "الضيوف" : locale === "fr" ? "Couverts" : locale === "es" ? "Cubiertos" : "Covers"} value="287" trend="+12" trendUp color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "متوسط الفاتورة" : locale === "fr" ? "Ticket moyen" : locale === "es" ? "Ticket medio" : "Avg Check"} value="$49.50" color="#FBBF24" />
          <MockupKPI label={locale === "ar" ? "العمالة %" : locale === "fr" ? "Main-d'œuvre %" : locale === "es" ? "% Labor" : "Labor %"} value="28.4%" trend={locale === "ar" ? "على الهدف" : locale === "fr" ? "Dans l'objectif" : locale === "es" ? "En objetivo" : "On target"} trendUp color="#22C55E" />
        </div>
        <MockupPaceBar label={locale === "ar" ? "وتيرة الايراد" : locale === "fr" ? "Rythme du revenu" : locale === "es" ? "Ritmo de ingresos" : "Revenue Pace"} current={14280} target={18200} unit="$" />
        <div className="text-center text-[10px] text-[var(--text-muted)]">
          {locale === "ar" ? "الموقع التالي: مارينا - التبديل خلال 30 ثانية" : locale === "fr" ? "Site suivant: Marina - rotation dans 30s" : locale === "es" ? "Siguiente local: Marina - rota en 30s" : "Next outlet: Marina - rotating in 30s"}
        </div>
      </div>
    </MockupFrame>
  );
}

function ShiftCostMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse - اقتصاديات الوردية" : locale === "fr" ? "Pulse - Économie du service" : locale === "es" ? "Pulse - Economía de turno" : "Pulse - Shift Economics";
  const headers = locale === "ar" ? ["الوردية", "الطاقم", "الساعات", "التكلفة", "الايراد", "العمالة %"] : locale === "fr" ? ["Service", "Équipe", "Heures", "Coût", "Revenu", "Main-d'œuvre %"] : locale === "es" ? ["Turno", "Equipo", "Horas", "Costo", "Ingresos", "% Labor"] : ["Shift", "Staff", "Hours", "Cost", "Revenue", "Labor %"];
  const alert = locale === "ar" ? "نسبة العمالة في وردية الصباح اعلى بـ 10 نقاط من المساء. فكر في تقليل العدد الى 3 موظفين قبل 10:30 صباحاً." : locale === "fr" ? "Le ratio main-d'œuvre du service du matin est 10 points au-dessus du soir. Pensez à réduire à 3 personnes avant 10h30." : locale === "es" ? "El porcentaje de labor del turno de mañana es 10 puntos más alto que el de la noche. Considera bajar a 3 personas antes de las 10:30 AM." : "Morning shift labor % is 10pp higher than evening. Consider reducing to 3 staff before 10:30 AM.";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label={locale === "ar" ? "ايراد الوردية" : locale === "fr" ? "Revenu du service" : locale === "es" ? "Ingresos del turno" : "Shift Revenue"} value="$9,840" color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "تكلفة الوردية" : locale === "fr" ? "Coût du service" : locale === "es" ? "Costo del turno" : "Shift Cost"} value="$2,760" color="#FF5450" />
          <MockupKPI label={locale === "ar" ? "هامش الوردية" : locale === "fr" ? "Marge du service" : locale === "es" ? "Margen del turno" : "Shift Margin"} value="72%" color="#22C55E" />
        </div>
        <MockupTable
          headers={headers}
          rows={[
            [locale === "ar" ? "الصباح" : locale === "fr" ? "Matin" : locale === "es" ? "Mañana" : "Morning", "4", "32h", "$960", "$3,200", "30.0%"],
            [locale === "ar" ? "الغداء" : locale === "fr" ? "Midi" : locale === "es" ? "Almuerzo" : "Lunch", "6", "36h", "$1,080", "$5,400", "20.0%"],
            [locale === "ar" ? "المساء" : locale === "fr" ? "Soir" : locale === "es" ? "Noche" : "Evening", "8", "40h", "$1,600", "$8,200", "19.5%"],
          ]}
        />
        <MockupAlert type="coach">
          {alert}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function LocalizedPulseDashboardMockup() {
  const { locale } = useWebsiteI18n();
  const ui = localizedPulseCopy[locale as keyof typeof localizedPulseCopy] ?? getGeneratedLocalCopy(localizedPulseCopy, generatedLocalCopy.localizedPulseCopy, locale) ?? localizedPulseCopy.en;
  const mockup = ui.heroMockup;

  return (
    <MockupFrame label={mockup.label} glow>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
            <span className="animate-live-dot" />
            {mockup.live}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">{mockup.updatedAt}</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {mockup.kpis.map((kpi) => (
            <MockupKPI
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              trend={kpi.trend}
              trendUp={kpi.trendUp}
              color={"color" in kpi ? kpi.color : undefined}
            />
          ))}
        </div>
        <MockupPaceBar label={mockup.paceLabel} current={14280} target={18200} unit="$" />
        <MockupTable headers={[...mockup.tableHeaders]} rows={mockup.tableRows.map((row) => [...row])} />
        <MockupAlert type="coach">{mockup.coachAlert}</MockupAlert>
      </div>
    </MockupFrame>
  );
}

export default function PulsePage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = localizedPulseCopy[locale as keyof typeof localizedPulseCopy] ?? getGeneratedLocalCopy(localizedPulseCopy, generatedLocalCopy.localizedPulseCopy, locale) ?? localizedPulseCopy.en;
  const cream = pulseCreamCopy[locale as keyof typeof pulseCreamCopy] ?? pulseCreamCopy.en;
  const featureMockups = [
    AdaptiveTargetsMockup,
    SalesPacingMockup,
    LaborMockup,
    ServerPerformanceMockup,
    LeakageMockup,
    CoachMockup,
    AlertsMockup,
    ScorecardMockup,
    LeaderboardMockup,
    WallboardMockup,
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge={ui.hero.badge}
        title={ui.hero.title}
        description={ui.hero.description}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="cta"
            size="lg"
            onClick={() => cta("/demo", "book_demo_pulse_hero", { page: "/product/pulse" })}
          >
            {ui.hero.primary}
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            href="#features"
          >
            {ui.hero.secondary}
          </Button>
        </div>
        <p className="text-sm text-[var(--text-muted)] mt-4">{ui.hero.note}</p>
      </PageHero>

      {/* Hero Mockup */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        <div className="max-w-4xl mx-auto">
          <LocalizedPulseDashboardMockup />
        </div>
      </section>

      {/* SIGNATURE INTERACTION - the same "watch the night turn" moment from the
          homepage, reused here where it is most literally true: Pulse catches the
          bad shift live, at 7:15, while it is still yours to change. */}
      <SectionShiftMoment />

      {/* What Pulse Monitors - Quick Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{balanceSentences(ui.quickGrid.heading)}</h2>
            <p className="body-lg text-[var(--text-supporting)] mb-12">{ui.quickGrid.description}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {ui.quickGrid.capabilities.map((label, index) => (
              <StaggerItem key={label}>
                <div className="p-4 bg-[rgba(220,38,38,0.06)] rounded-xl text-center border border-[rgba(220,38,38,0.1)]">
                  <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={[
                      "intelligence",
                      "chart",
                      "benchmarking",
                      "multiLocation",
                      "cost",
                      "intelligence",
                      "forecasting",
                      "report",
                      "multiLocation",
                      "canvas",
                    ][index] as SundaeIconName} size="md" className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Cream relief - warm break before the long dark feature-block run (the volume system) */}
      <CreamBreak eyebrow={cream.eyebrow} statement={cream.statement} lede={cream.lede} />

      {/* Feature Blocks - Detailed */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="eyebrow text-red-400 mb-4">{ui.featuresIntro.eyebrow}</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.featuresIntro.heading}</h2>
            </div>
          </FadeUp>

          <div className="space-y-20">
            {ui.blocks.map((block, index) => {
              const Mockup = featureMockups[index];
              return (
                <FadeUp key={block.title} delay={index * 0.03}>
                  <div className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    {/* Mockup */}
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                      <Mockup />
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <SundaeIcon name={block.icon} size="md" className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">{block.title}</p>
                          <h3 className="text-xl font-bold text-[var(--text-display)]">{block.headline}</h3>
                        </div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-4">{block.description}</p>
                      <ul className="space-y-1.5">
                        {block.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-red-400 mt-0.5 flex-shrink-0">&#10003;</span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep Dive: Targets That Get Smarter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="eyebrow text-red-400 mb-4">{ui.deepDives.targets.eyebrow}</p>
                <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.deepDives.targets.heading}</h2>
                <p className="body-lg text-[var(--text-supporting)]">{ui.deepDives.targets.description}</p>
              </div>
              <div>
                <AdaptiveTargetsMockup />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Deep Dive: Server Intelligence */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <p className="eyebrow text-red-400 mb-4">{ui.deepDives.server.eyebrow}</p>
                <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.deepDives.server.heading}</h2>
                <p className="body-lg text-[var(--text-supporting)]">{ui.deepDives.server.description}</p>
              </div>
              <div className="md:order-1">
                <ServerPerformanceMockup />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Deep Dive: Shift Economics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="eyebrow text-red-400 mb-4">{ui.deepDives.cost.eyebrow}</p>
                <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.deepDives.cost.heading}</h2>
                <p className="body-lg text-[var(--text-supporting)]">{ui.deepDives.cost.description}</p>
              </div>
              <div>
                <ShiftCostMockup />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <CoreMobileShowcase screens={[<CorePulseFloorMobile key="floor" />, <CoreHomeMobile key="home" />]} />

      {/* Product gallery - every Pulse surface in detail */}
      <SectionProductGallery
        productFilter="/product/pulse"
        hideFilter
        headingOverride={galleryHeading("pulse", locale)}
      />

      {/* CTA */}
      <PageCTA
        title={ui.cta.title}
        description={ui.cta.description}
      >
        <Button
          variant="cta"
          size="lg"
          onClick={() => cta("/demo", "book_demo_pulse_cta", { page: "/product/pulse" })}
        >
          {ui.cta.primary}
        </Button>
        <Button
          variant="outline-ink"
          size="lg"
          onClick={() => cta(REPORT_APP_URL, "start_free_pulse_cta", { page: "/product/pulse" })}
        >
          {ui.cta.secondary} →
        </Button>
      </PageCTA>
    </div>
  );
}
