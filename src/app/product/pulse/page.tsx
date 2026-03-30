'use client';

import { Button } from "@/components/ui/Button";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import {
  MockupFrame,
  MockupKPI,
  MockupPaceBar,
  MockupBarChart,
  MockupTable,
  MockupAlert,
} from "@/components/ui/MockupFrame";

const localizedPulseCopy = {
  en: {
    hero: {
      badge: "Pulse — Intraday Operations",
      title: "$2K Lost Per Bad Shift. Pulse Catches It Live.",
      description:
        "Revenue pacing, labor cost, server performance, and leakage detection - updating every 5 minutes. Adaptive targets that learn your patterns, seasonality, and local events. Act before it costs you.",
      primary: "Book a Demo",
      secondary: "See Pulse in Action",
      note: "Available on Sundae Core plans.",
    },
    quickGrid: {
      heading: "10 Capabilities. One Operational Nerve Center.",
      description: "Pulse monitors your operation in real time and coaches your team when things go off-track.",
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
        headline: "2-5% of Revenue Leaks Every Month",
        description:
          "Voids, discounts, comps, and refunds - tracked in real time against your baselines. Pulse flags when leakage rates spike, identifies the servers, items, and time windows involved, and alerts you before small issues become expensive patterns.",
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
          "Sundae Coach monitors all signals in real time and surfaces prioritized, actionable recommendations based on live data. Not generic tips - specific actions tied to what's happening on your floor right now.",
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
          "See who's driving your revenue and who needs support - in real time. Filter by hour, by service phase, or compare against last week. Every server gets a productivity score, an hourly breakdown, and auto-detected strengths and improvement areas. The best restaurants don't just track servers - they develop them.",
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
      primary: "Book a Demo",
      secondary: "Start Free",
    },
    heroMockup: {
      label: "Pulse — Sales Pacing",
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
      badge: "Pulse — عمليات داخل اليوم",
      title: "خسارة 2,000 دولار لكل وردية سيئة. Pulse يلتقطها مباشرة.",
      description:
        "وتيرة الايرادات وتكلفة العمالة واداء الموظفين ومراقبة التسرب - تتحدث كل 5 دقائق. اهداف تكيفية تتعلم من انماطك والموسمية والاحداث المحلية. تحرك قبل ان تدفع الثمن.",
      primary: "احجز عرضاً",
      secondary: "شاهد Pulse عملياً",
      note: "متاح على خطط Sundae Core.",
    },
    quickGrid: {
      heading: "10 قدرات. مركز اعصاب تشغيلي واحد.",
      description: "يراقب Pulse عملياتك لحظة بلحظة ويدرب فريقك عندما تخرج الامور عن المسار.",
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
        headline: "2-5% من الايرادات تتسرب شهرياً",
        description:
          "الإلغاءات والخصومات والهدايا والاستردادات - تتبع في الوقت الحقيقي مقابل خطوطك الاساسية. يحدد Pulse عندما ترتفع معدلات التسرب، ويعرف الموظفين والاصناف والنافذات الزمنية المرتبطة، وينبهك قبل ان تتحول المشكلات الصغيرة الى انماط مكلفة.",
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
          "يراقب Sundae Coach جميع الاشارات في الوقت الحقيقي ويعرض توصيات قابلة للتنفيذ ومرتبة حسب الاولويات استناداً الى البيانات الحية. ليست نصائح عامة - بل اجراءات محددة مرتبطة بما يحدث على الارض الان.",
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
      label: "Pulse — وتيرة المبيعات",
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
      badge: "Pulse - Operations intra-journee",
      title: "2K$ perdus par mauvais service. Pulse les detecte en direct.",
      description:
        "Rythme du revenu, cout de main-d'oeuvre, performance des serveurs et detection des fuites - mis a jour toutes les 5 minutes. Des objectifs adaptatifs qui apprennent vos habitudes, la saisonnalite et les evenements locaux. Agissez avant que cela ne coute.",
      primary: "Reserver une demo",
      secondary: "Voir Pulse en action",
      note: "Disponible dans les plans Sundae Core.",
    },
    quickGrid: {
      heading: "10 capacites. Un seul centre nerveux operationnel.",
      description: "Pulse surveille votre operation en temps reel et coache votre equipe quand quelque chose deraille.",
      capabilities: [
        "Objectifs adaptatifs",
        "Rythme des ventes",
        "Productivite de la main-d'oeuvre",
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
      eyebrow: "DETAIL",
      heading: "Chaque fonctionnalite, en detail",
    },
    blocks: [
      {
        title: "Objectifs d intelligence adaptative",
        headline: "Des objectifs qui apprennent votre activite",
        description:
          "Pulse analyse votre historique de ventes, detecte les anomalies, cartographie les tendances d une annee sur l autre et ajuste automatiquement les evenements du calendrier comme le Ramadan, les jours feries et la saisonnalite locale. Definissez une ambition de croissance. Le systeme calcule des objectifs quotidiens pour chaque site.",
        capabilities: [
          "Cartographie des objectifs hebdomadaires d une annee sur l autre",
          "Multiplicateurs de croissance configurables",
          "Detection d anomalies avec marquage en un clic",
          "Conscience des evenements du calendrier (Ramadan, Eid, NYE)",
          "Detection des changements de tendance avec alertes proactives",
          "Simulation et apercu des objectifs futurs",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Suivi des ventes et du rythme",
        headline: "Savoir ou vous en etes, chaque heure",
        description:
          "Cadence des ventes en temps reel par rapport a vos objectifs, decoupee par tranche horaire. Revenu attendu a ce stade du service, ecart a l objectif, rythme de rattrapage necessaire et tendance du jour.",
        capabilities: [
          "Cadence intrajournee par tranches configurables",
          "Calculs temps reel de l ecart a l objectif",
          "Visualisation horaire des tendances de revenu",
          "Vue portefeuille multi-sites avec statut RAG",
        ],
        icon: "chart" as SundaeIconName,
      },
      {
        title: "Productivite de la main-d'oeuvre",
        headline: "Du headcount a la productivite",
        description:
          "La main-d'oeuvre n est pas qu une question d heures - c est un resultat. Ventes par heure de travail, couverts par heure de travail et indice de productivite compose - en temps reel. Voyez quels services sont surstaffes, lesquels generent le plus de revenu par heure et ce que coute vraiment chaque service.",
        capabilities: [
          "SPLH et CPLH en temps reel",
          "Ratio de cout de main-d'oeuvre vs objectif",
          "Cout par service avec detail par employe",
          "Suivi des tendances de productivite sur 14 jours",
          "Taux horaires configurables par role",
        ],
        icon: "benchmarking" as SundaeIconName,
      },
      {
        title: "Performance des serveurs",
        headline: "Voir qui genere le revenu",
        description:
          "Un classement en direct des serveurs selon le revenu, le ticket moyen, les couverts, le taux de vente additionnelle et un score de productivite compose. Filtrez par heure, phase de service ou periode de comparaison. Utilisez-le pour le coaching, les incentives et les decisions de staffing.",
        capabilities: [
          "Filtrer par heure, phase ou plage personnalisee",
          "Comparer a hier ou a la moyenne 4 semaines",
          "Score de productivite compose (0-100)",
          "Detail serveur individuel avec graphiques",
          "Points forts et axes d amelioration detectes automatiquement",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Suivi des fuites",
        headline: "2 a 5% du revenu fuit chaque mois",
        description:
          "Voids, remises, comps et remboursements - suivis en temps reel par rapport a vos bases. Pulse signale les pics de fuite, identifie les serveurs, articles et plages horaires impliquees et vous alerte avant que de petits ecarts deviennent des habitudes couteuses.",
        capabilities: [
          "Suivi en temps reel des voids, remises et comps",
          "Attribution des fuites au niveau serveur",
          "Detection des pics par rapport aux lignes de base",
          "Alertes automatisees pour les schémas anormaux",
        ],
        icon: "cost" as SundaeIconName,
      },
      {
        title: "Sundae Coach",
        headline: "Actions priorisees, pas des tableaux",
        description:
          "Sundae Coach surveille tous les signaux en temps reel et fait remonter des recommandations prioritaires et actionnables basees sur les donnees en direct. Pas des conseils generiques - des actions precises liees a ce qui se passe sur le terrain maintenant.",
        capabilities: [
          "Recommandations contextuelles en temps reel",
          "Priorisees par impact revenu",
          "Basees sur les donnees Pulse live",
          "Playbooks configurables par scenario",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Alertes et playbooks",
        headline: "Des reponses automatisees quand c est important",
        description:
          "Definissez des seuils. Recevez une alerte. Agissez vite. Les workflows automatisees declenchent des exceptions - des anomalies de void aux pics de cout de main-d'oeuvre - avec des chemins d escalation integres.",
        capabilities: [
          "Declencheurs d alertes basees sur des seuils",
          "Workflows de notification automatise",
          "Playbooks configurables par exception",
          "Chemins d escalation en temps reel",
        ],
        icon: "forecasting" as SundaeIconName,
      },
      {
        title: "Scorecard de service",
        headline: "Resume de performance de fin de service",
        description:
          "Chaque service est note. Revenu, couverts, ticket moyen, cout de main-d'oeuvre, fuites et faits marquants des serveurs - le tout resume dans une seule vue. Partagez-le avec votre equipe ou consultez-le le lendemain matin.",
        capabilities: [
          "Resume KPI sur tous les sites",
          "Note de service avec points forts et faibles",
          "Axes d amelioration detectes automatiquement",
          "Rapport de service partageable",
        ],
        icon: "report" as SundaeIconName,
      },
      {
        title: "Classement du portefeuille",
        headline: "Comparez chaque site en direct",
        description:
          "Comparaison de performance multi-sites avec suivi des series et classement concurrentiel. Voyez quels sites performent et lesquels demandent de l attention - avant la fin de la journee.",
        capabilities: [
          "Classement cross-site",
          "Suivi des series et indicateurs de tendance",
          "Detail par site",
          "Signalement des sites a risque",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Mode wallboard",
        headline: "Mettez Pulse sur grand ecran",
        description:
          "Un affichage optimise TV pour les pass-through cuisine, les bureaux de direction et les espaces equipe. Rotation automatique entre les sites, priorisation des sites a risque, et vue partagee du service.",
        capabilities: [
          "Affichage 16:9 optimise TV",
          "Rotation automatique entre sites",
          "Priorisation des sites a risque",
          "Frequence de rafraichissement et metriques configurables",
        ],
        icon: "canvas" as SundaeIconName,
      },
    ],
    deepDives: {
      targets: {
        eyebrow: "INTELLIGENCE QUI APPREND",
        heading: "Des objectifs plus intelligents chaque semaine",
        description:
          "La plupart des plateformes vous forcent a definir les objectifs manuellement - ou a copier la semaine precedente. Le moteur d intelligence adaptative de Sundae analyse l ensemble de votre historique de ventes, detecte les anomalies et la saisonnalite, associe les evenements du calendrier a leur impact reel sur le revenu et genere des objectifs prospectifs qui refletent votre rythme reel. Marquez un evenement ponctuel et il sera exclu. Marquez un evenement recurrent et le systeme s ajustera l annee suivante automatiquement.",
      },
      server: {
        eyebrow: "INTELLIGENCE SERVEUR",
        heading: "Du classement a l outil de coaching",
        description:
          "Voyez qui genere le revenu et qui a besoin de soutien - en temps reel. Filtrez par heure, par phase de service ou comparez a la semaine precedente. Chaque serveur recoit un score de productivite, un detail horaire et des points forts/axes d amelioration detectes automatiquement. Les meilleurs restaurants ne se contentent pas de suivre les serveurs - ils les developpent.",
      },
      cost: {
        eyebrow: "COUT DE SERVICE",
        heading: "Savoir ce que coute chaque service",
        description:
          "Votre service du matin tourne avec 4 personnes pendant 8 heures. Votre service du soir avec 8 personnes pendant 5 heures. Lequel est vraiment rentable ? Pulse detaille le cout de chaque service - par role, par personne - et le compare au revenu genere. Voyez votre ratio de cout de main-d'oeuvre par service, identifiez le surstaffing et prenez de meilleures decisions de planning.",
      },
    },
    cta: {
      title: "Arretez de gerer les services a l aveugle",
      description: "Pulse est inclus dans chaque plan Sundae Core. Voyez ce qui se passe maintenant - pas a la fin de la journee.",
      primary: "Reserver une demo",
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
        { label: "Main-d'oeuvre %", value: "28.4%", trend: "Sous l objectif de 30%", trendUp: true, color: "#22C55E" },
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
      badge: "Pulse - Operaciones intradia",
      title: "Perdida de $2K por cada turno malo. Pulse la detecta en vivo.",
      description:
        "Ritmo de ingresos, costo laboral, rendimiento de servidores y deteccion de fugas - actualizandose cada 5 minutos. Objetivos adaptativos que aprenden tus patrones, estacionalidad y eventos locales. Actua antes de que te cueste.",
      primary: "Reservar demo",
      secondary: "Ver Pulse en accion",
      note: "Disponible en los planes Sundae Core.",
    },
    quickGrid: {
      heading: "10 capacidades. Un solo centro nervioso operativo.",
      description: "Pulse monitorea tu operacion en tiempo real y entrena a tu equipo cuando algo se sale del rumbo.",
      capabilities: [
        "Objetivos adaptativos",
        "Ritmo de ventas",
        "Productividad laboral",
        "Analisis de servidores",
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
          "Pulse analiza tu historico de ventas, detecta anomalías, mapea patrones año contra año y ajusta eventos de calendario como Ramadan, feriados y estacionalidad local - automaticamente. Define una ambicion de crecimiento. El sistema calcula objetivos diarios para cada local.",
        capabilities: [
          "Mapeo semanal de objetivos año contra año",
          "Multiplicadores de crecimiento configurables",
          "Deteccion de anomalías con etiquetado de un clic",
          "Conciencia de eventos de calendario (Ramadan, Eid, NYE)",
          "Deteccion de cambios de tendencia con alertas proactivas",
          "Simulacion y vista previa de objetivos futuros",
        ],
        icon: "intelligence" as SundaeIconName,
      },
      {
        title: "Seguimiento de ventas y ritmo",
        headline: "Sabe donde estas, cada hora",
        description:
          "Ritmo de ventas en tiempo real contra tus objetivos, dividido por parte del dia. Ingreso esperado hasta este punto del turno, brecha al objetivo, ritmo de recuperacion necesario y si vas a superar o quedar por debajo del dia.",
        capabilities: [
          "Ritmo intradia con partes del dia configurables",
          "Calculos de brecha al objetivo en tiempo real",
          "Visualizacion horaria de tendencias de ingresos",
          "Vista de cartera multi-local con estado RAG",
        ],
        icon: "chart" as SundaeIconName,
      },
      {
        title: "Productividad laboral",
        headline: "De headcount a productividad",
        description:
          "La mano de obra no son solo horas - es output. Ventas por hora laboral, cubiertos por hora laboral e indice compuesto de productividad - en tiempo real. Mira que turnos estan sobredimensionados, cuales generan mas ingresos por hora y cuanto cuesta realmente cada turno.",
        capabilities: [
          "SPLH y CPLH en tiempo real",
          "Ratio de costo laboral vs objetivo",
          "Costo por turno con detalle por empleado",
          "Seguimiento de tendencia de productividad por 14 dias",
          "Tarifas por hora configurables por rol",
        ],
        icon: "benchmarking" as SundaeIconName,
      },
      {
        title: "Rendimiento de servidores",
        headline: "Ve quien impulsa ingresos",
        description:
          "Leaderboard en vivo que clasifica servidores por ingresos, ticket promedio, cubiertos, venta adicional y una puntuacion compuesta de productividad. Filtra por hora, fase de servicio o periodo de comparacion. Usalo para coaching, incentivos y decisiones de staffing.",
        capabilities: [
          "Filtrar por hora, fase o rango personalizado",
          "Comparar vs ayer o promedio de 4 semanas",
          "Puntuacion compuesta de productividad (0-100)",
          "Detalle individual con graficos",
          "Fortalezas y areas de mejora detectadas automaticamente",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Monitoreo de fugas",
        headline: "2-5% de los ingresos se fugan cada mes",
        description:
          "Void, descuentos, comps y reembolsos - rastreados en tiempo real contra tus bases. Pulse marca cuando suben las fugas, identifica los servidores, items y ventanas de tiempo involucradas, y te alerta antes de que los pequenos problemas se vuelvan patrones costosos.",
        capabilities: [
          "Seguimiento en tiempo real de voids, descuentos y comps",
          "Atribucion de fugas a nivel servidor",
          "Deteccion de picos contra bases moviles",
          "Alertas automatizadas para patrones anómalos",
        ],
        icon: "cost" as SundaeIconName,
      },
      {
        title: "Sundae Coach",
        headline: "Acciones priorizadas, no dashboards",
        description:
          "Sundae Coach monitorea todas las señales en tiempo real y muestra recomendaciones priorizadas y accionables basadas en datos vivos. No consejos genericos - acciones especificas ligadas a lo que pasa en tu piso ahora mismo.",
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
          "Define umbrales. Recibe una alerta. Actua rapido. Workflows de respuesta automatizados disparados por excepciones - desde anomalías de void hasta picos de costo laboral - con rutas de escalamiento integradas.",
        capabilities: [
          "Disparadores de alerta basados en umbrales",
          "Workflows de notificacion automatizados",
          "Playbooks configurables por excepcion",
          "Rutas de escalamiento en tiempo real",
        ],
        icon: "forecasting" as SundaeIconName,
      },
      {
        title: "Scorecard de turno",
        headline: "Resumen de rendimiento al final del turno",
        description:
          "Cada turno recibe una nota. Ingresos, cubiertos, ticket promedio, costo laboral, fugas y destacados del servidor - resumidos en una sola vista. Compartelo con tu equipo o revisalo a la manana siguiente.",
        capabilities: [
          "Resumen KPI en todos los locales",
          "Nota de turno con positivos y negativos",
          "Areas de mejora detectadas automaticamente",
          "Reporte de turno compartible",
        ],
        icon: "report" as SundaeIconName,
      },
      {
        title: "Leaderboard de cartera",
        headline: "Compara cada local, en vivo",
        description:
          "Comparacion de rendimiento multi-local con seguimiento de rachas y ranking competitivo. Mira que locales van con todo y cuales necesitan atencion - antes del cierre.",
        capabilities: [
          "Ranking de rendimiento entre locales",
          "Seguimiento de rachas e indicadores de tendencia",
          "Drill-down a metricas individuales por local",
          "Marcado de locales en riesgo",
        ],
        icon: "multiLocation" as SundaeIconName,
      },
      {
        title: "Modo wallboard",
        headline: "Pon Pulse en la pantalla grande",
        description:
          "Una pantalla optimizada para TV, pensada para pass-through de cocina, oficinas de gerencia y areas de staff. Rota automaticamente entre locales, prioriza ubicaciones en riesgo y le da al equipo una vista compartida del turno.",
        capabilities: [
          "Pantalla 16:9 optimizada para TV",
          "Rotacion automatica entre locales",
          "Orden de prioridad (riesgo primero)",
          "Frecuencia de actualizacion y metricas configurables",
        ],
        icon: "canvas" as SundaeIconName,
      },
    ],
    deepDives: {
      targets: {
        eyebrow: "INTELIGENCIA QUE APRENDE",
        heading: "Objetivos mas inteligentes cada semana",
        description:
          "La mayoria de las plataformas te obligan a fijar objetivos manualmente - o copiar la semana pasada. El motor de inteligencia adaptativa de Sundae escanea todo tu historico de ventas, detecta anomalías y estacionalidad, vincula eventos de calendario con su impacto real en ingresos y genera objetivos prospectivos que reflejan tu ritmo real de negocio. Marca un evento unico y se excluye. Marca un evento recurrente y el sistema se ajusta automaticamente el ano siguiente.",
      },
      server: {
        eyebrow: "INTELIGENCIA DE SERVIDORES",
        heading: "Del leaderboard a la herramienta de coaching",
        description:
          "Ve quien impulsa ingresos y quien necesita apoyo en tiempo real. Filtra por hora, por fase de servicio o compara contra la semana pasada. Cada servidor obtiene una puntuacion de productividad, un desglose por hora y fortalezas y areas de mejora detectadas automaticamente. Los mejores restaurantes usan estos datos para formar mejor al equipo.",
      },
      cost: {
        eyebrow: "COSTO DE TURNO",
        heading: "Sabe cuanto cuesta cada turno",
        description:
          "Tu turno de manana opera con 4 personas durante 8 horas. Tu turno de noche con 8 durante 5 horas. Cual es realmente rentable? Pulse desglosa el costo de cada turno - por rol y por persona - y lo compara con los ingresos que genera. Ve tu ratio de costo laboral por turno, identifica el exceso de personal y toma decisiones de scheduling mas inteligentes.",
      },
    },
    cta: {
      title: "Deja de gestionar turnos a ciegas",
      description: "Pulse esta incluido en cada plan Sundae Core. Ve lo que pasa ahora - no al final del dia.",
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
      coachAlert: "La tasa de venta adicional de James K. esta 14% por debajo del promedio del turno. Considera emparejarlo con Sarah para las proximas 2 mesas.",
    },
  },
} as const;

/* ─── Inline Mockup Compositions ─── */

function AdaptiveTargetsMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse — الاهداف التكيفية" : locale === "fr" ? "Pulse - Objectifs adaptatifs" : locale === "es" ? "Pulse - Objetivos adaptativos" : "Pulse — Adaptive Targets";
  const todayTarget = locale === "ar" ? "الهدف اليومي" : locale === "fr" ? "Objectif du jour" : locale === "es" ? "Objetivo de hoy" : "Today's Target";
  const growthModifier = locale === "ar" ? "مضاعف النمو" : locale === "fr" ? "Multiplicateur de croissance" : locale === "es" ? "Multiplicador de crecimiento" : "Growth Modifier";
  const confidence = locale === "ar" ? "الثقة" : locale === "fr" ? "Confiance" : locale === "es" ? "Confianza" : "Confidence";
  const days = locale === "ar" ? ["الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت", "الاحد"] : locale === "fr" ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] : locale === "es" ? ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const alert = locale === "ar"
    ? "تعديل رمضان: تم تطبيق -12% على اهداف ايام الاسبوع. تم رفع اهداف الجمعة +18% لخدمة الافطار."
    : locale === "fr"
      ? "Ajustement Ramadan : -12% appliques aux objectifs en semaine. Les objectifs du vendredi augmentent de +18% pour le service d iftar."
      : locale === "es"
        ? "Ajuste de Ramadan: se aplico -12% a los objetivos de dias laborales. Los objetivos del viernes suben +18% para el servicio de iftar."
        : "Ramadan adjustment: -12% applied to weekday targets. Friday targets boosted +18% for iftar service.";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label={todayTarget} value="$18,200" color="#1C47FF" />
          <MockupKPI label={growthModifier} value="+8%" trend={locale === "ar" ? "مقابل الاساس" : locale === "fr" ? "vs base" : locale === "es" ? "vs base" : "vs base"} trendUp color="#22C55E" />
          <MockupKPI label={confidence} value="94%" color="#22C55E" />
        </div>
        <MockupBarChart
          data={[
            { label: days[0], value: 15200, color: "#1C47FF" },
            { label: days[1], value: 16800, color: "#1C47FF" },
            { label: days[2], value: 14900, color: "#FBBF24" },
            { label: days[3], value: 17600, color: "#1C47FF" },
            { label: days[4], value: 21400, color: "#22C55E" },
            { label: days[5], value: 23100, color: "#22C55E" },
            { label: days[6], value: 18900, color: "#1C47FF" },
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
  const label = locale === "ar" ? "Pulse — وتيرة المبيعات" : locale === "fr" ? "Pulse - Rythme des ventes" : locale === "es" ? "Pulse - Ritmo de ventas" : "Pulse — Sales Pacing";
  const live = locale === "ar" ? "الثلاثاء، 7:42 مساءً" : locale === "fr" ? "Mardi, 19:42" : locale === "es" ? "Martes, 7:42 PM" : "Tuesday, 7:42 PM";
  const actual = locale === "ar" ? "الفعلي" : locale === "fr" ? "Reel" : locale === "es" ? "Real" : "Actual";
  const expected = locale === "ar" ? "المتوقع" : locale === "fr" ? "Attendu" : locale === "es" ? "Esperado" : "Expected";
  const dayTarget = locale === "ar" ? "هدف اليوم" : locale === "fr" ? "Objectif du jour" : locale === "es" ? "Objetivo del dia" : "Day Target";
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
          <MockupKPI label={expected} value="$12,740" color="#1C47FF" />
          <MockupKPI label={dayTarget} value="$18,200" color="#1C47FF" />
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
  const label = locale === "ar" ? "Pulse — انتاجية العمالة" : locale === "fr" ? "Pulse - Productivite de la main-d'oeuvre" : locale === "es" ? "Pulse - Productividad laboral" : "Pulse — Labor Productivity";
  const headers = locale === "ar" ? ["الدور", "الطاقم", "الساعات", "التكلفة", "SPLH"] : locale === "fr" ? ["Role", "Equipe", "Heures", "Cout", "SPLH"] : locale === "es" ? ["Rol", "Equipo", "Horas", "Costo", "SPLH"] : ["Role", "Staff", "Hours", "Cost", "SPLH"];
  const rows = locale === "ar"
    ? [["النادلون", "4", "24h", "$720", "$79.50"], ["المطبخ", "3", "21h", "$630", "$54.30"], ["البار", "2", "12h", "$360", "$71.20"], ["الاستقبال", "1", "8h", "$130", "—"]]
    : locale === "fr"
      ? [["Serveurs", "4", "24h", "$720", "$79.50"], ["Cuisine", "3", "21h", "$630", "$54.30"], ["Bar", "2", "12h", "$360", "$71.20"], ["Accueil", "1", "8h", "$130", "—"]]
      : locale === "es"
        ? [["Meseros", "4", "24h", "$720", "$79.50"], ["Cocina", "3", "21h", "$630", "$54.30"], ["Barra", "2", "12h", "$360", "$71.20"], ["Host", "1", "8h", "$130", "—"]]
        : [["Servers", "4", "24h", "$720", "$79.50"], ["Kitchen", "3", "21h", "$630", "$54.30"], ["Bar", "2", "12h", "$360", "$71.20"], ["Host", "1", "8h", "$130", "—"]];
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label="SPLH" value="$62.40" trend={locale === "ar" ? "+8% مقابل المتوسط" : locale === "fr" ? "+8% vs moyenne" : locale === "es" ? "+8% vs promedio" : "+8% vs avg"} trendUp color="#22C55E" />
          <MockupKPI label="CPLH" value="4.2" color="#1C47FF" />
          <MockupKPI label={locale === "ar" ? "نسبة العمالة" : locale === "fr" ? "Main-d'oeuvre %" : locale === "es" ? "% Labor" : "Labor %"} value="28.1%" trend={locale === "ar" ? "اقل من 30%" : locale === "fr" ? "Sous 30%" : locale === "es" ? "Bajo 30%" : "Under 30%"} trendUp color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "تكلفة الوردية" : locale === "fr" ? "Cout de service" : locale === "es" ? "Costo de turno" : "Shift Cost"} value="$1,840" color="#FBBF24" />
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
  const label = locale === "ar" ? "Pulse — لوحة ترتيب الموظفين" : locale === "fr" ? "Pulse - Classement des serveurs" : locale === "es" ? "Pulse - Ranking de servidores" : "Pulse — Server Leaderboard";
  const headers = locale === "ar" ? ["#", "الموظف", "الايراد", "متوسط الفاتورة", "نسبة البيع الاضافي", "الدرجة"] : locale === "fr" ? ["#", "Serveur", "Revenu", "Ticket moyen", "Ventes additionnelles %", "Score"] : locale === "es" ? ["#", "Mesero", "Ingresos", "Ticket medio", "Venta adicional %", "Score"] : ["#", "Server", "Revenue", "Avg Check", "Upsell %", "Score"];
  const alert = locale === "ar"
    ? "معدل البيع الاضافي لدى James K. اقل بـ 14 نقطة عن متوسط الوردية. فكر في إقرانه مع Sarah للطلبتين القادمتين."
    : locale === "fr"
      ? "Le taux de vente additionnelle de James K. est 14 points sous la moyenne du service. Pensez a le faire travailler avec Sarah pour les 2 prochaines tables."
      : locale === "es"
        ? "La tasa de venta adicional de James K. esta 14 puntos por debajo del promedio del turno. Considera emparejarlo con Sarah para las proximas 2 mesas."
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
  const label = locale === "ar" ? "Pulse — مراقبة التسرب" : locale === "fr" ? "Pulse - Suivi des fuites" : locale === "es" ? "Pulse - Monitoreo de fugas" : "Pulse — Leakage Monitor";
  const totalLeakage = locale === "ar" ? "اجمالي التسرب" : locale === "fr" ? "Fuite totale" : locale === "es" ? "Fuga total" : "Total Leakage";
  const voidRate = locale === "ar" ? "معدل الإلغاء" : locale === "fr" ? "Taux de void" : locale === "es" ? "Tasa de void" : "Void Rate";
  const exceptions = locale === "ar" ? "الاستثناءات" : locale === "fr" ? "Exceptions" : locale === "es" ? "Excepciones" : "Exceptions";
  const headers = locale === "ar" ? ["النوع", "العدد", "المبلغ", "الموظف"] : locale === "fr" ? ["Type", "Nombre", "Montant", "Serveur"] : locale === "es" ? ["Tipo", "Cantidad", "Monto", "Mesero"] : ["Type", "Count", "Amount", "Server"];
  const alert = locale === "ar"
    ? "لدى James K. خمس استثناءات في هذه الوردية - 3x متوسط الفريق. يوصى بالمراجعة."
    : locale === "fr"
      ? "James K. a 5 exceptions sur ce service - 3x la moyenne de l equipe. Revue recommandee."
      : locale === "es"
        ? "James K. tiene 5 excepciones en este turno - 3x el promedio del equipo. Se recomienda revision."
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
  const label = locale === "ar" ? "Sundae Coach — اشارات الوردية" : locale === "fr" ? "Sundae Coach - Signaux de service" : locale === "es" ? "Sundae Coach - Señales de turno" : "Sundae Coach — Shift Signals";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-3">
        <MockupAlert type="coach">
          {locale === "ar" ? "وتيرة الايراد متقدمة 12% عن الهدف. حافظ على التوظيف الحالي - لا تخفض مبكراً." : locale === "fr" ? "Le rythme du revenu est 12% au-dessus de l objectif. Maintenez le staff actuel - ne reduisez pas trop tot." : locale === "es" ? "El ritmo de ingresos va 12% por delante del objetivo. Mantiene el personal actual - no recortes temprano." : "Revenue pace is 12% ahead of target. Maintain current staffing - do not cut early."}
        </MockupAlert>
        <MockupAlert type="warning">
          {locale === "ar" ? "انخفض متوسط الفاتورة 4.20 دولار في الساعة الاخيرة. يمثل James K. 60% من التراجع. يحتاج الى تدريب على البيع الاضافي." : locale === "fr" ? "Le ticket moyen a baisse de 4,20$ durant la derniere heure. James K. represente 60% de la baisse. Coaching de vente additionnelle necessaire." : locale === "es" ? "El ticket medio cayo $4.20 en la ultima hora. James K. representa el 60% de la caida. Hace falta coaching de venta adicional." : "Avg check dropped $4.20 in the last hour. Server James K. accounts for 60% of the decline. Upsell coaching needed."}
        </MockupAlert>
        <MockupAlert type="critical">
          {locale === "ar" ? "ارتفع معدل الإلغاء الى 3.2% (الاساس: 1.8%). 4 حالات في 45 دقيقة من الطرفية #3. يوصى بمراجعة المدير." : locale === "fr" ? "Le taux de void est monte a 3,2% (base: 1,8%). 4 voids en 45 min depuis le terminal #3. Revue manager recommandee." : locale === "es" ? "La tasa de void subio a 3.2% (base: 1.8%). 4 voids en 45 min desde el terminal #3. Se recomienda revision del gerente." : "Void rate spiked to 3.2% (baseline: 1.8%). 4 voids in 45 min from terminal #3. Manager review recommended."}
        </MockupAlert>
        <MockupAlert type="info">
          {locale === "ar" ? "توقع السبت: +22% ضيوف استناداً الى حدث محلي (ماراثون). جهز الاصناف عالية الدوران بحلول الجمعة 4 مساءً." : locale === "fr" ? "Prevision samedi: +22% de couverts grace a un evenement local (marathon). Pre-stockez les articles a forte rotation avant vendredi 16h." : locale === "es" ? "Pronostico sabado: +22% cubiertos por evento local (maraton). Pre-stock de items de alta rotacion antes del viernes 4 PM." : "Saturday forecast: +22% covers based on local event (marathon). Pre-stock high-turnover items by Friday 4 PM."}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function AlertsMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse — التنبيهات وخطط التشغيل" : locale === "fr" ? "Pulse - Alertes et playbooks" : locale === "es" ? "Pulse - Alertas y playbooks" : "Pulse — Alerts & Playbooks";
  const headers = locale === "ar" ? ["التنبيه", "المحفز", "الحالة", "الاجراء"] : locale === "fr" ? ["Alerte", "Declencheur", "Statut", "Action"] : locale === "es" ? ["Alerta", "Disparador", "Estado", "Accion"] : ["Alert", "Trigger", "Status", "Action"];
  const alert = locale === "ar" ? "تم تشغيل الخطة: \"بروتوكول البيع الاضافي\" - تم إشعار الموظفين تلقائياً عبر Sundae Coach بأفضل 3 عناصر هامشاً." : locale === "fr" ? "Playbook declenche: \"Protocole de vente additionnelle\" - serveurs auto-notifies via Sundae Coach avec les 3 meilleurs articles marge." : locale === "es" ? "Playbook activado: \"Protocolo de venta adicional\" - servidores notificados automaticamente via Sundae Coach con los 3 items de mejor margen." : "Playbook triggered: \"Upsell Protocol\" - auto-notified servers via Sundae Coach with top 3 margin items.";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <MockupTable
          headers={headers}
          rows={[
            [locale === "ar" ? "الايراد متأخر" : locale === "fr" ? "Revenu en retard" : locale === "es" ? "Ingresos atras" : "Revenue behind pace", locale === "ar" ? "فجوة >15% عند 2 مساءً" : locale === "fr" ? "Ecart >15% a 14h" : locale === "es" ? "Brecha >15% a las 2PM" : ">15% gap at 2PM", "🔴 Active", locale === "ar" ? "فعّل بروتوكول البيع الاضافي" : locale === "fr" ? "Lancer le protocole de vente additionnelle" : locale === "es" ? "Disparar protocolo de venta adicional" : "Push upsell protocol"],
            [locale === "ar" ? "ارتفاع تكلفة العمالة" : locale === "fr" ? "Pic de cout main-d'oeuvre" : locale === "es" ? "Pico de costo laboral" : "Labor cost spike", locale === "ar" ? ">32% نسبة" : locale === "fr" ? ">32% ratio" : locale === "es" ? ">32% ratio" : ">32% ratio", "🟡 Warning", locale === "ar" ? "راجع staffing المسائي" : locale === "fr" ? "Revoir le staff du soir" : locale === "es" ? "Revisar staffing de la tarde" : "Review evening staffing"],
            [locale === "ar" ? "شذوذ الإلغاء" : locale === "fr" ? "Anomalie de void" : locale === "es" ? "Anomalia de void" : "Void anomaly", locale === "ar" ? ">2x الخط الاساسي" : locale === "fr" ? ">2x base" : locale === "es" ? ">2x base" : ">2x baseline", "🔴 Active", locale === "ar" ? "مراجعة المدير" : locale === "fr" ? "Revue manager" : locale === "es" ? "Revision del gerente" : "Manager review"],
            [locale === "ar" ? "الضيوف متقدمون" : locale === "fr" ? "Couverts en avance" : locale === "es" ? "Cubiertos por delante" : "Covers ahead", locale === "ar" ? ">20% فوق الخطة" : locale === "fr" ? ">20% au-dessus du plan" : locale === "es" ? ">20% sobre el plan" : ">20% over plan", "🟢 Positive", locale === "ar" ? "جهز محطات الاحتياط" : locale === "fr" ? "Preparer les stations de secours" : locale === "es" ? "Preparar estaciones de respaldo" : "Prep backup stations"],
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
  const label = locale === "ar" ? "Pulse — بطاقة الوردية" : locale === "fr" ? "Pulse - Scorecard de service" : locale === "es" ? "Pulse - Scorecard de turno" : "Pulse — Shift Scorecard";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{locale === "ar" ? "ملخص وردية الغداء" : locale === "fr" ? "Resume du service de midi" : locale === "es" ? "Resumen del turno de almuerzo" : "Lunch Shift Summary"}</div>
          <div className="text-3xl font-bold font-mono text-[#22C55E] mt-1">A−</div>
          <div className="text-[11px] text-[var(--text-muted)]">{locale === "ar" ? "الدرجة الاجمالية للوردية" : locale === "fr" ? "Note globale du service" : locale === "es" ? "Nota general del turno" : "Overall Shift Grade"}</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label={locale === "ar" ? "الايراد" : locale === "fr" ? "Revenu" : locale === "es" ? "Ingresos" : "Revenue"} value="$9,840" trend="+6%" trendUp />
          <MockupKPI label={locale === "ar" ? "الضيوف" : locale === "fr" ? "Couverts" : locale === "es" ? "Cubiertos" : "Covers"} value="187" trend="+12" trendUp color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "متوسط الفاتورة" : locale === "fr" ? "Ticket moyen" : locale === "es" ? "Ticket medio" : "Avg Check"} value="$52.60" trend="+$1.40" trendUp color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "العمالة %" : locale === "fr" ? "Main-d'oeuvre %" : locale === "es" ? "% Labor" : "Labor %"} value="27.8%" trend={locale === "ar" ? "اقل من 30%" : locale === "fr" ? "Sous 30%" : locale === "es" ? "Bajo 30%" : "Under 30%"} trendUp color="#22C55E" />
        </div>
        <MockupAlert type="coach">
          {locale === "ar" ? "ابرز النقاط: وصل معدل البيع الاضافي الى 28% (الافضل هذا الشهر). مجال التحسين: متوسط زمن تذكرة المطبخ 14 دقيقة (الهدف: 12)." : locale === "fr" ? "Points forts: taux de vente additionnelle a 28% (meilleur du mois). A ameliorer: ticket cuisine moyen de 14 min (objectif: 12)." : locale === "es" ? "Puntos fuertes: venta adicional al 28% (mejor del mes). A mejorar: ticket de cocina promedio 14 min (objetivo: 12)." : "Highlights: Upsell rate hit 28% (best this month). Area to improve: Kitchen ticket time averaged 14 min (target: 12 min)."}
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function LeaderboardMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse — لوحة ترتيب المحفظة" : locale === "fr" ? "Pulse - Classement du portefeuille" : locale === "es" ? "Pulse - Ranking de cartera" : "Pulse — Portfolio Leaderboard";
  const headers = locale === "ar" ? ["#", "الموقع", "الايراد", "مقابل الهدف", "السلسلة"] : locale === "fr" ? ["#", "Site", "Revenu", "vs objectif", "Serie"] : locale === "es" ? ["#", "Local", "Ingresos", "vs objetivo", "Racha"] : ["#", "Outlet", "Revenue", "vs Target", "Streak"];
  const alert = locale === "ar" ? "المطار متأخر 8% عن الهدف ليومين متتاليين. اكبر مشكلة: انخفاض الضيوف في فترة 2-5 مساءً (38% اقل من الخطة)." : locale === "fr" ? "L aeroport est 8% sous l objectif depuis 2 jours. Probleme principal: faibles couverts sur le créneau 14h-17h (38% sous le plan)." : locale === "es" ? "El aeropuerto va 8% por debajo del objetivo por 2 dias seguidos. Problema principal: cubiertos bajos entre 2-5 PM (38% por debajo del plan)." : "Airport is 8% behind target for 2 consecutive days. Top issue: low covers during 2-5 PM daypart (38% below plan).";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <MockupTable
          headers={headers}
          rows={[
            ["1", "Downtown", "$14,280", "+12%", "🔥 5 days"],
            ["2", "Marina", "$11,940", "+4%", "🔥 3 days"],
            ["3", "Mall Branch", "$9,620", "−2%", "—"],
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
  const label = locale === "ar" ? "Pulse — وضع اللوحة الجدارية" : locale === "fr" ? "Pulse - Mode wallboard" : locale === "es" ? "Pulse - Modo wallboard" : "Pulse — Wallboard Mode (TV Display)";
  return (
    <MockupFrame label={label} glow>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]"><span className="animate-live-dot" />{locale === "ar" ? "مباشر" : locale === "fr" ? "EN DIRECT" : locale === "es" ? "EN VIVO" : "LIVE"}</span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">{locale === "ar" ? "وسط المدينة — تدوير تلقائي" : locale === "fr" ? "Downtown - Rotation automatique" : locale === "es" ? "Downtown - Rotacion automatica" : "Downtown — Auto-rotating"}</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label={locale === "ar" ? "الايراد" : locale === "fr" ? "Revenu" : locale === "es" ? "Ingresos" : "Revenue"} value="$14,280" trend="+12%" trendUp />
          <MockupKPI label={locale === "ar" ? "الضيوف" : locale === "fr" ? "Couverts" : locale === "es" ? "Cubiertos" : "Covers"} value="287" trend="+12" trendUp color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "متوسط الفاتورة" : locale === "fr" ? "Ticket moyen" : locale === "es" ? "Ticket medio" : "Avg Check"} value="$49.50" color="#FBBF24" />
          <MockupKPI label={locale === "ar" ? "العمالة %" : locale === "fr" ? "Main-d'oeuvre %" : locale === "es" ? "% Labor" : "Labor %"} value="28.4%" trend={locale === "ar" ? "على الهدف" : locale === "fr" ? "Dans l objectif" : locale === "es" ? "En objetivo" : "On target"} trendUp color="#22C55E" />
        </div>
        <MockupPaceBar label={locale === "ar" ? "وتيرة الايراد" : locale === "fr" ? "Rythme du revenu" : locale === "es" ? "Ritmo de ingresos" : "Revenue Pace"} current={14280} target={18200} unit="$" />
        <div className="text-center text-[10px] text-[var(--text-muted)]">
          {locale === "ar" ? "الموقع التالي: مارينا — التبديل خلال 30 ثانية" : locale === "fr" ? "Site suivant: Marina - rotation dans 30s" : locale === "es" ? "Siguiente local: Marina - rota en 30s" : "Next outlet: Marina — rotating in 30s"}
        </div>
      </div>
    </MockupFrame>
  );
}

function ShiftCostMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse — اقتصاديات الوردية" : locale === "fr" ? "Pulse - Economie du service" : locale === "es" ? "Pulse - Economia de turno" : "Pulse — Shift Economics";
  const headers = locale === "ar" ? ["الوردية", "الطاقم", "الساعات", "التكلفة", "الايراد", "العمالة %"] : locale === "fr" ? ["Service", "Equipe", "Heures", "Cout", "Revenu", "Main-d'oeuvre %"] : locale === "es" ? ["Turno", "Equipo", "Horas", "Costo", "Ingresos", "% Labor"] : ["Shift", "Staff", "Hours", "Cost", "Revenue", "Labor %"];
  const alert = locale === "ar" ? "نسبة العمالة في وردية الصباح اعلى بـ 10 نقاط من المساء. فكر في تقليل العدد الى 3 موظفين قبل 10:30 صباحاً." : locale === "fr" ? "Le ratio main-d'oeuvre du service du matin est 10 points au-dessus du soir. Pensez a reduire a 3 personnes avant 10h30." : locale === "es" ? "El porcentaje de labor del turno de manana es 10 puntos mas alto que el de la noche. Considera bajar a 3 personas antes de las 10:30 AM." : "Morning shift labor % is 10pp higher than evening. Consider reducing to 3 staff before 10:30 AM.";
  return (
    <MockupFrame label={label} glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label={locale === "ar" ? "ايراد الوردية" : locale === "fr" ? "Revenu du service" : locale === "es" ? "Ingresos del turno" : "Shift Revenue"} value="$9,840" color="#22C55E" />
          <MockupKPI label={locale === "ar" ? "تكلفة الوردية" : locale === "fr" ? "Cout du service" : locale === "es" ? "Costo del turno" : "Shift Cost"} value="$2,760" color="#FF5450" />
          <MockupKPI label={locale === "ar" ? "هامش الوردية" : locale === "fr" ? "Marge du service" : locale === "es" ? "Margen del turno" : "Shift Margin"} value="72%" color="#22C55E" />
        </div>
        <MockupTable
          headers={headers}
          rows={[
            [locale === "ar" ? "الصباح" : locale === "fr" ? "Matin" : locale === "es" ? "Manana" : "Morning", "4", "32h", "$960", "$3,200", "30.0%"],
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
  const ui = localizedPulseCopy[locale as keyof typeof localizedPulseCopy] ?? localizedPulseCopy.en;
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
  const ui = localizedPulseCopy[locale as keyof typeof localizedPulseCopy] ?? localizedPulseCopy.en;
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

      {/* What Pulse Monitors — Quick Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.quickGrid.heading}</h2>
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

      {/* Feature Blocks — Detailed */}
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
                          <h3 className="text-xl font-bold text-[var(--text-primary)]">{block.headline}</h3>
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
          variant="outline-light"
          size="lg"
          onClick={() => cta(REPORT_APP_URL, "start_free_pulse_cta", { page: "/product/pulse" })}
        >
          {ui.cta.secondary} →
        </Button>
      </PageCTA>
    </div>
  );
}
