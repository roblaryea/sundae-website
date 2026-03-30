'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { MockupFrame, MockupKPI, MockupTable, MockupAlert } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

type ForesightMockupCopy = {
  timeline: {
    label: string;
    forecastRev: string;
    confidence: string;
    accuracy: string;
    today: string;
    actual: string;
    forecast: string;
    band: string;
    alert: string;
  };
  scenario: {
    label: string;
    baselineRev: string;
    scenarioRev: string;
    scenarioText: string;
    alert: string;
    headers: [string, string, string, string];
  };
  assumptions: {
    label: string;
    headers: [string, string, string, string];
    rows: string[][];
    badges: [string, string, string];
  };
  dependencies: {
    label: string;
    nodes: [string, string, string, string, string];
    alert: string;
  };
  accuracy: {
    label: string;
    rollingMape: string;
    bias: string;
    corrections: string;
    trend: string;
  };
  briefing: {
    label: string;
    coach: string;
    week: string;
    summary: string;
    actionItems: string;
    opportunity: string;
    risk: string;
  };
  signals: {
    label: string;
    items: Array<{ type: string; signal: string; impact: string; confidence: string; color: string }>;
  };
  monteCarlo: {
    label: string;
    bestCase: string;
    mostLikely: string;
    worstCase: string;
    simulations: string;
    downside: string;
    expectedValue: string;
    alert: string;
  };
};

type ForesightComponent = {
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
  icon: SundaeIconName;
  color: string;
};

type ForesightPageCopy = {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimary: string;
  heroSecondary: string;
  problemTitle: string;
  problemDescription: string;
  stats: Array<{ stat: string; label: string; icon: SundaeIconName }>;
  howEyebrow: string;
  howTitle: string;
  howSteps: Array<{ step: string; title: string; description: string; icon: SundaeIconName }>;
  componentsEyebrow: string;
  componentsTitle: string;
  componentsDescription: string;
  components: ForesightComponent[];
  pricingTitle: string;
  pricingDescription: string;
  pricingTiers: Array<{ tier: string; base: string; perLocation: string; description: string; highlighted?: boolean; enhancements: string[] }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
  mockups: ForesightMockupCopy;
};

const localizedForesightCopy: Record<'en' | 'ar' | 'fr' | 'es', ForesightPageCopy> = {
  en: {
    heroBadge: "Predictive Intelligence",
    heroTitle: "Stop Reacting. Start Anticipating.",
    heroDescription: "Forward-looking forecasts for every metric that matters - revenue, labor, food cost, profit. Confidence bands that tighten over time, what-if scenarios you can test before committing, and weekly executive briefings that tell you where to act.",
    heroPrimary: "Book a Demo",
    heroSecondary: "See Pricing Calculator",
    problemTitle: "Your P&L Tells You What Happened. Not What's Coming.",
    problemDescription: "By the time last month's numbers land, the damage is done. Foresight doesn't just look backward. It projects forward - with the same data you already have.",
    stats: [
      { stat: "91%", label: "Forecast accuracy - improving weekly through self-correction", icon: "performance" },
      { stat: "17", label: "Business metrics forecast simultaneously: revenue, labor, food cost, profit, and more", icon: "data" },
      { stat: "48h", label: "From POS connection to first actionable forecast", icon: "speed" },
    ],
    howEyebrow: "HOW IT WORKS",
    howTitle: "Learn. Project. Correct. Repeat.",
    howSteps: [
      { step: "01", title: "Learns Your Patterns", description: "Foresight ingests your historical data and auto-detects 11 categories of assumptions - seasonality, daypart mix, channel split, pricing trends, staffing patterns.", icon: "intelligence" },
      { step: "02", title: "Projects Forward", description: "Generates forecasts for 17 metrics across 14-90 days with confidence bands. Layers in external signals - weather, local events, competitor activity - and maps cross-module dependencies.", icon: "forecasting" },
      { step: "03", title: "Self-Corrects Weekly", description: "Compares forecast to actual. Detects systematic bias. Adjusts the model automatically. Your forecast gets sharper the longer you use it.", icon: "performance" },
    ],
    componentsEyebrow: "12 SUB-PAGES · 32 FORECAST VISUALS",
    componentsTitle: "Forecast. Simulate. Brief. Act.",
    componentsDescription: "From unified forecast timelines to Monte Carlo risk analysis, forecast-driven scheduling and purchasing, and executive briefings - every tool an operator needs to make forward-looking decisions.",
    components: [
      { title: "Unified Forecast Timeline", headline: "Revenue, Labor, Food Cost - One Forward-Looking View", description: "See the next 14, 30, or 90 days across 17 business metrics in a single timeline. Confidence bands shrink as Foresight learns your patterns.", capabilities: ["22 metrics: revenue, covers, labor cost, food cost, profit, SPLH, RevPASH, and more", "14-365 day horizons with adaptive confidence tiers", "Confidence bands that tighten as accuracy improves", "Actual vs forecast overlay - updated daily", "Granularity from 15-minute slots to monthly aggregates"], icon: "forecasting", color: "from-cyan-500 to-blue-600" },
      { title: "What-If Scenario Builder", headline: "Test Decisions Before You Make Them", description: "Change any assumption - pricing, staffing, capacity, marketing spend - and see the cascading impact across revenue, covers, costs, and profit.", capabilities: ["Adjust pricing, capacity, marketing, staffing, and cost assumptions", "Cascading impact across revenue, labor, food cost, and profit", "Side-by-side comparison of up to 5 scenarios", "Pre-built templates: pricing change, capacity expansion, marketing boost, cost reduction", "Sensitivity analysis with tornado diagrams"], icon: "data", color: "from-purple-500 to-purple-600" },
      { title: "Assumption Registry", headline: "Every Forecast Assumption - Visible, Editable, Auditable", description: "Foresight auto-detects 11 categories of assumptions from your data and lets you override anything while tracking what changed and why.", capabilities: ["Auto-detected assumptions from historical patterns", "Operator overrides with audit trail", "External signal injection (weather, events, competitor activity)", "Impact weight scoring per assumption"], icon: "insights", color: "from-emerald-500 to-teal-600" },
      { title: "Cross-Module Dependencies", headline: "Understand How One Change Ripples Across Your Business", description: "A revenue increase drives labor demand, purchasing volume, inventory turnover, and profit margins. Foresight maps these cascading dependencies and quantifies them with correlation strength.", capabilities: ["Visual dependency graph across modules", "Correlation strength scoring (0-1) between connected metrics", "Cascade timing: revenue change to labor in 2 days, purchasing in 5", "Integrated P&L forecast", "Forecast-driven scheduling and purchasing"], icon: "architecture", color: "from-violet-500 to-purple-600" },
      { title: "Accuracy Self-Correction", headline: "The Forecast That Gets Smarter Every Week", description: "Foresight measures its own accuracy and detects systematic bias. When bias is found, the model self-corrects.", capabilities: ["Rolling MAPE and RMSE tracked per metric", "Bias detection: direction, magnitude, and root cause", "Automatic self-correction when systematic bias is detected", "Correction log with before/after accuracy comparison"], icon: "performance", color: "from-green-500 to-emerald-600" },
      { title: "Executive Briefing", headline: "Your Week Ahead - Summarized With Actions", description: "Every Monday at 6 AM, Foresight generates an executive briefing: forecast summary, key risks, opportunities, and prioritized action items.", capabilities: ["Weekly narrative briefing generated by Sundae Coach", "Prioritized action items: critical, high, medium", "Risk/opportunity identification with estimated financial impact", "Briefing history", "PDF export for stakeholder distribution"], icon: "intelligence", color: "from-blue-500 to-indigo-600" },
      { title: "External Signal Integration", headline: "Weather, Events, Competitors, Holidays - Quantified", description: "Foresight ingests external signals and estimates their revenue impact with confidence scores.", capabilities: ["Weather impact models with hourly granularity", "Local event intelligence", "Competitor activity tracking", "Holiday and seasonal calendar", "Economic indicators"], icon: "watchtower", color: "from-amber-500 to-orange-600" },
      { title: "Monte Carlo Risk Analysis", headline: "1,000 Simulations. One Probability Distribution.", description: "Run Monte Carlo simulations against your forecast to quantify downside risk and identify worst-case scenarios.", capabilities: ["1,000-iteration Monte Carlo simulation", "P10/P50/P90 outcome ranges with probability distributions", "Risk factor decomposition", "Stress testing and scenario isolation"], icon: "risk", color: "from-rose-500 to-pink-600" },
    ],
    pricingTitle: "Add Foresight to Your Core Plan",
    pricingDescription: "Every Foresight plan includes all 12 sub-pages and 32 forecast visuals. Your Core tier determines how fast, how deep, and how much you can run.",
    pricingTiers: [
      { tier: "Core Lite", base: "$279", perLocation: "$27", description: "For single-unit operators getting started with predictive intelligence.", enhancements: ["15-minute data refresh cycles", "8,000 AI credits/mo", "2 years historical training data", "50 forecast queries/day"] },
      { tier: "Core Pro", base: "$249", perLocation: "$24", description: "For multi-unit operators with the full intelligence stack.", highlighted: true, enhancements: ["5-minute data refresh - faster recalibration", "14,000 AI credits/mo - more simulations", "3 years historical data - deeper accuracy", "150 forecast queries/day", "Analyst & Strategist intelligence modes", "Native multi-POS support"] },
      { tier: "Enterprise", base: "Custom", perLocation: "Custom", description: "Dedicated support, SLAs, white-label options, and custom integrations.", enhancements: ["Custom data refresh intervals", "Unlimited AI credits", "Full historical data access", "Unlimited forecast queries", "All intelligence modes", "Dedicated success manager"] },
    ],
    ctaTitle: "Ready for Predictive Intelligence?",
    ctaDescription: "Tell us what you need. We'll build the model to make it happen.",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "View All Modules",
    mockups: {
      timeline: { label: "Unified Forecast Timeline - 30 Day", forecastRev: "Forecast Rev", confidence: "Confidence", accuracy: "Accuracy", today: "Today", actual: "Actual", forecast: "Forecast", band: "90% Band", alert: "Forecast error below 4%. Confidence band tightens as data accrues." },
      scenario: { label: "What-If Scenario Builder", baselineRev: "Baseline Rev", scenarioRev: "Scenario Rev", scenarioText: "Scenario: +10% Pricing + Weekend Promo", alert: "Cover decline offset by 17.6% check increase. Net revenue +$23K.", headers: ["Metric", "Baseline", "Scenario", "Delta"] },
      assumptions: { label: "Assumption Registry", headers: ["Assumption", "Source", "Impact", "Status"], rows: [["Weekend seasonality +18%", "Auto-detected", "High", "Active"], ["Lunch daypart: 35% of rev", "Historic", "High", "Active"], ["Staff capacity: 12 FOH", "Operator", "Med", "Override"], ["Local event: Mar 22 concert", "External", "Med", "New"], ["Food cost: +2.1% trend", "Auto-detected", "Low", "Active"]], badges: ["4 Auto-detected", "1 Operator override", "1 External signal"] },
      dependencies: { label: "Cross-Module Dependency Graph", nodes: ["Revenue", "Labor", "Inventory", "Purchasing", "Profit"], alert: "Revenue change cascades to labor in 2 days, purchasing in 5 days. 82% correlation strength." },
      accuracy: { label: "Forecast Accuracy Self-Correction", rollingMape: "Rolling MAPE", bias: "Bias", corrections: "Corrections", trend: "Rolling 12-week accuracy trend - self-correcting weekly" },
      briefing: { label: "Executive Briefing - Weekly", coach: "Sundae Coach", week: "Week of Mar 17", summary: "Revenue projected at $248K (+6.2% vs prior). Thursday carries 12% downside risk - 2 staff vacations overlap with a sold-out venue event next door. Weekend outlook strong: local food festival expected to drive +15% foot traffic.", actionItems: "Action Items", opportunity: "Opportunity", risk: "Risk" },
      signals: { label: "External Signals Panel", items: [{ type: "Weather", signal: "Rain forecast Fri PM", impact: "-8%", confidence: "72%", color: "bg-sky-400" }, { type: "Event", signal: "Food festival Sat-Sun", impact: "+15%", confidence: "88%", color: "bg-amber-400" }, { type: "Competitor", signal: "New burger joint opened 0.3mi", impact: "-3%", confidence: "45%", color: "bg-rose-400" }, { type: "Holiday", signal: "St Patrick's Day Mon", impact: "+22%", confidence: "94%", color: "bg-green-400" }, { type: "Economic", signal: "CPI +0.3% MoM", impact: "-1%", confidence: "35%", color: "bg-purple-400" }] },
      monteCarlo: { label: "Monte Carlo Risk Analysis", bestCase: "Best Case", mostLikely: "Most Likely", worstCase: "Worst Case", simulations: "1,000 simulations", downside: "12% downside probability", expectedValue: "Expected value: $251K", alert: "12% probability of revenue below $230K. Primary driver: Thursday staffing risk." },
    },
  },
  ar: {
    heroBadge: "ذكاء تنبؤي",
    heroTitle: "توقف عن الرد. وابدأ بالاستباق.",
    heroDescription: "توقعات مستقبلية لكل مؤشر مهم - الإيرادات، العمالة، تكلفة الطعام، والربح. نطاقات ثقة تتضيق مع الوقت، وسيناريوهات ماذا لو، وتقارير تنفيذية أسبوعية.",
    heroPrimary: "احجز عرضاً",
    heroSecondary: "عرض حاسبة الأسعار",
    problemTitle: "تخبرك P&L بما حدث. لا بما سيأتي.",
    problemDescription: "عندما تصل أرقام الشهر الماضي، يكون الضرر قد وقع. Foresight لا ينظر إلى الخلف فقط. بل يتنبأ إلى الأمام - بالبيانات نفسها التي لديك بالفعل.",
    stats: [
      { stat: "91%", label: "دقة التوقع - تتحسن أسبوعياً عبر التصحيح الذاتي", icon: "performance" },
      { stat: "17", label: "مقاييس أعمال متوقعة معاً: الإيرادات والعمالة والطعام والربح وأكثر", icon: "data" },
      { stat: "48h", label: "من ربط POS إلى أول توقع عملي", icon: "speed" },
    ],
    howEyebrow: "كيف يعمل",
    howTitle: "يتعلم. يتوقع. يصحح. يكرر.",
    howSteps: [
      { step: "01", title: "يتعلم أنماطك", description: "يستوعب Foresight بياناتك التاريخية ويكتشف تلقائياً 11 فئة من الافتراضات - الموسمية، مزيج الفترات، قنوات البيع، اتجاهات التسعير، وأنماط العمالة.", icon: "intelligence" },
      { step: "02", title: "يتوقع إلى الأمام", description: "ينشئ توقعات لـ 17 مقياساً عبر 14-90 يوماً مع نطاقات ثقة. يضيف إشارات خارجية - الطقس، الأحداث، نشاط المنافسين - ويربط التبعيات بين الوحدات.", icon: "forecasting" },
      { step: "03", title: "يصحح نفسه أسبوعياً", description: "يقارن التوقع بالواقع. يكتشف الانحياز المنهجي. يعدل النموذج تلقائياً. يصبح التوقع أدق كلما استعملته.", icon: "performance" },
    ],
    componentsEyebrow: "12 صفحة فرعية · 32 مرئية تنبؤية",
    componentsTitle: "توقع. حاكى. لخّص. تحرك.",
    componentsDescription: "من الخط الزمني الموحد إلى تحليل المخاطر Monte Carlo، والجدولة والمشتريات المبنية على التوقع، والتقارير التنفيذية - كل أداة يحتاجها المشغل لاتخاذ قرارات استباقية.",
    components: [
      { title: "الخط الزمني الموحد للتوقع", headline: "الإيرادات والعمالة وتكلفة الطعام - رؤية واحدة مستقبلية", description: "شاهد الأيام 14 أو 30 أو 90 التالية عبر 17 مقياساً في خط زمني واحد. تضيق نطاقات الثقة مع تعلّم Foresight لأنماطك.", capabilities: ["22 مقياساً: الإيرادات، العملاء، العمالة، تكلفة الطعام، الربح، SPLH، RevPASH وأكثر", "آفاق 14-365 يوماً مع مستويات ثقة متدرجة", "نطاقات ثقة تتقارب مع تحسن الدقة", "تراكب الفعلي مقابل المتوقع محدث يومياً", "تفصيل من 15 دقيقة إلى تجميع شهري"], icon: "forecasting", color: "from-cyan-500 to-blue-600" },
      { title: "منشئ السيناريوهات ماذا لو", headline: "اختبر القرارات قبل اتخاذها", description: "غيّر أي افتراض - التسعير، العمالة، السعة، الإنفاق التسويقي - وشاهد الأثر المتسلسل على الإيرادات والربح.", capabilities: ["تعديل افتراضات التسعير والسعة والتسويق والعمالة والتكلفة", "أثر متسلسل على الإيرادات والعمالة والطعام والربح", "مقارنة حتى 5 سيناريوهات", "قوالب جاهزة: تغيير الأسعار، التوسعة، رفع التسويق، خفض التكاليف", "تحليل حساسية بمخططات tornado"], icon: "data", color: "from-purple-500 to-purple-600" },
      { title: "سجل الافتراضات", headline: "كل افتراض متوقع - مرئي وقابل للتعديل والتدقيق", description: "يكتشف Foresight 11 فئة من الافتراضات من بياناتك ويتيح لك تجاوز أي افتراض مع تتبع ما تغيّر ولماذا.", capabilities: ["افتراضات مكتشفة تلقائياً من الأنماط التاريخية", "تجاوزات من المشغل مع سجل تدقيق", "إدخال إشارات خارجية (طقس، أحداث، نشاط منافسين)", "تقييم وزن الأثر لكل افتراض"], icon: "insights", color: "from-emerald-500 to-teal-600" },
      { title: "التبعيات بين الوحدات", headline: "افهم كيف ينتشر تغيير واحد عبر عملك", description: "زيادة الإيرادات ترفع الطلب على العمالة والحجم الشرائي ودوران المخزون وهوامش الربح. يرسم Foresight هذه التبعيات ويقيسها بقوة الارتباط.", capabilities: ["مخطط تبعية مرئي عبر الوحدات", "تقييم قوة الارتباط بين المقاييس", "توقيت الانتشار: تغير الإيراد إلى العمالة في يومين، والمشتريات في 5", "توقع P&L متكامل", "جدولة ومشتريات مبنية على التوقع"], icon: "architecture", color: "from-violet-500 to-purple-600" },
      { title: "تصحيح الدقة الذاتي", headline: "التوقع الذي يصبح أذكى كل أسبوع", description: "يقيس Foresight دقته ويكتشف الانحياز المنهجي. عند وجوده، يصحح النموذج نفسه تلقائياً.", capabilities: ["MAPE و RMSE متتالية لكل مقياس", "كشف الانحياز: الاتجاه والحجم والجذر", "تصحيح تلقائي عند ثبوت الانحياز", "سجل تصحيح قبل/بعد"], icon: "performance", color: "from-green-500 to-emerald-600" },
      { title: "الملخص التنفيذي", headline: "أسبوعك القادم - ملخص بالإجراءات", description: "كل صباح اثنين، ينشئ Foresight ملخصاً تنفيذياً: الملخص التوقعي، المخاطر، الفرص، وخطوات العمل ذات الأولوية.", capabilities: ["ملخص سردي أسبوعي من Sundae Coach", "خطوات عمل مرتبة: حرجة، عالية، متوسطة", "تحديد المخاطر والفرص مع الأثر المالي المتوقع", "سجل الملخصات", "تصدير PDF"], icon: "intelligence", color: "from-blue-500 to-indigo-600" },
      { title: "دمج الإشارات الخارجية", headline: "الطقس والفعاليات والمنافسون والعطل - كلها مقاسة", description: "يستوعب Foresight الإشارات الخارجية ويقدّر أثرها على الإيرادات مع درجات الثقة.", capabilities: ["نماذج أثر الطقس بدقة ساعية", "ذكاء الفعاليات المحلية", "تتبع نشاط المنافسين", "تقويم العطل والموسمية", "مؤشرات اقتصادية"], icon: "watchtower", color: "from-amber-500 to-orange-600" },
      { title: "تحليل مخاطر Monte Carlo", headline: "1000 محاكاة. توزيع احتمال واحد.", description: "شغّل محاكاة Monte Carlo على توقعاتك لقياس المخاطر السلبية وتحديد أسوأ السيناريوهات.", capabilities: ["محاكاة 1000 مرة لكل فترة", "مخرجات P10/P50/P90 مع التوزيعات", "تفكيك عوامل المخاطر", "اختبار ضغط وعزل السيناريو"], icon: "risk", color: "from-rose-500 to-pink-600" },
    ],
    pricingTitle: "أضف Foresight إلى خطتك الأساسية",
    pricingDescription: "كل باقة Foresight تشمل كل الصفحات الفرعية الـ12 والمرئيات التنبؤية الـ32. تحدد باقة Core سرعتك وعمق التشغيل وحجم الاستخدام.",
    pricingTiers: [
      { tier: "Core Lite", base: "$279", perLocation: "$27", description: "للمشغلين الأفراد الذين يبدأون بالذكاء التنبؤي.", enhancements: ["تحديث بيانات كل 15 دقيقة", "8000 رصيد AI شهرياً", "سنتان من بيانات التدريب", "50 استعلام توقع يومياً"] },
      { tier: "Core Pro", base: "$249", perLocation: "$24", description: "للمشغلين متعددي المواقع مع كامل منظومة الذكاء.", highlighted: true, enhancements: ["تحديث بيانات كل 5 دقائق", "14000 رصيد AI شهرياً", "3 سنوات بيانات تاريخية", "150 استعلام توقع يومياً", "أوضاع Analyst و Strategist", "دعم أصيل لعدة أنظمة POS"] },
      { tier: "Enterprise", base: "مخصص", perLocation: "مخصص", description: "دعم مخصص، اتفاقيات SLA، وخيارات white-label وتكاملات مخصصة.", enhancements: ["فواصل تحديث مخصصة", "رصيد AI غير محدود", "وصول كامل للبيانات التاريخية", "استعلامات غير محدودة", "كل أوضاع الذكاء", "مدير نجاح مخصص"] },
    ],
    ctaTitle: "هل أنت جاهز للذكاء التنبؤي؟",
    ctaDescription: "أخبرنا بما تحتاجه. وسنبني النموذج الذي يحقق ذلك.",
    ctaPrimary: "احجز عرضاً",
    ctaSecondary: "عرض كل الوحدات",
    mockups: {
      timeline: { label: "الخط الزمني الموحد للتوقع - 30 يوماً", forecastRev: "الإيراد المتوقع", confidence: "الثقة", accuracy: "الدقة", today: "اليوم", actual: "فعلي", forecast: "متوقع", band: "نطاق 90%", alert: "انخفض خطأ التوقع إلى أقل من 4%. تتضيق الثقة مع تراكم البيانات." },
      scenario: { label: "منشئ السيناريوهات ماذا لو", baselineRev: "الإيراد الأساسي", scenarioRev: "إيراد السيناريو", scenarioText: "السيناريو: +10% تسعير + عرض نهاية الأسبوع", alert: "انخفاض العملاء عوّضته زيادة 17.6% في الفاتورة. صافي الإيراد +$23K.", headers: ["المقياس", "الأساس", "السيناريو", "الفرق"] },
      assumptions: { label: "سجل الافتراضات", headers: ["الافتراض", "المصدر", "الأثر", "الحالة"], rows: [["موسمية نهاية الأسبوع +18%", "مكتشف تلقائياً", "عالٍ", "نشط"], ["وقت الغداء: 35% من الإيراد", "تاريخي", "عالٍ", "نشط"], ["سعة الموظفين: 12 FOH", "المشغل", "متوسط", "تجاوز"], ["فعالية محلية: حفل 22 مارس", "خارجي", "متوسط", "جديد"], ["تكلفة الطعام: +2.1% اتجاه", "مكتشف تلقائياً", "منخفض", "نشط"]], badges: ["4 مكتشفة تلقائياً", "1 تجاوز من المشغل", "1 إشارة خارجية"] },
      dependencies: { label: "مخطط التبعيات بين الوحدات", nodes: ["الإيراد", "العمالة", "المخزون", "المشتريات", "الربح"], alert: "تغير الإيراد ينتقل إلى العمالة خلال يومين، وإلى المشتريات خلال 5 أيام. قوة الارتباط 82%." },
      accuracy: { label: "تصحيح الدقة الذاتي", rollingMape: "MAPE المتكرر", bias: "الانحياز", corrections: "التصحيحات", trend: "اتجاه دقة 12 أسبوعاً - تصحيح ذاتي أسبوعياً" },
      briefing: { label: "الملخص التنفيذي - أسبوعي", coach: "Sundae Coach", week: "أسبوع 17 مارس", summary: "يتوقع الإيراد عند $248K (+6.2% عن السابق). يحمل الخميس 12% مخاطر هبوط - إجازات موظفين تتقاطع مع فعالية مكتملة العدد قرب الموقع. نظرة نهاية الأسبوع قوية: مهرجان طعام محلي يتوقع أن يرفع الحركة +15%.", actionItems: "خطوات العمل", opportunity: "فرصة", risk: "خطر" },
      signals: { label: "لوحة الإشارات الخارجية", items: [{ type: "الطقس", signal: "أمطار متوقعة مساء الجمعة", impact: "-8%", confidence: "72%", color: "bg-sky-400" }, { type: "الفعالية", signal: "مهرجان طعام السبت-الأحد", impact: "+15%", confidence: "88%", color: "bg-amber-400" }, { type: "المنافس", signal: "افتتاح مطعم برغر جديد على بعد 0.3 ميل", impact: "-3%", confidence: "45%", color: "bg-rose-400" }, { type: "العطلة", signal: "عيد القديس باتريك الاثنين", impact: "+22%", confidence: "94%", color: "bg-green-400" }, { type: "اقتصادي", signal: "CPI +0.3% شهرياً", impact: "-1%", confidence: "35%", color: "bg-purple-400" }] },
      monteCarlo: { label: "تحليل مخاطر Monte Carlo", bestCase: "أفضل حالة", mostLikely: "الأكثر احتمالاً", worstCase: "أسوأ حالة", simulations: "1000 محاكاة", downside: "احتمال هبوط 12%", expectedValue: "القيمة المتوقعة: $251K", alert: "احتمال 12% أن يكون الإيراد أقل من $230K. العامل الرئيسي: خطر العمالة يوم الخميس." },
    },
  },
  fr: {
    heroBadge: "Intelligence predictive",
    heroTitle: "Arretez de reagir. Commencez a anticiper.",
    heroDescription: "Previsions prospectives pour toutes les metriques importantes - revenu, main-d'oeuvre, cout alimentaire, profit. Intervalles de confiance qui se resserrent avec le temps, scenarios, et briefings executifs hebdomadaires.",
    heroPrimary: "Reserver une demo",
    heroSecondary: "Voir le calculateur de prix",
    problemTitle: "Votre P&L vous dit ce qui s'est passe. Pas ce qui arrive.",
    problemDescription: "Quand les chiffres du mois precedent arrivent, le dommage est deja fait. Foresight utilise les donnees que vous avez deja pour montrer plus tot ce qui se prepare.",
    stats: [
      { stat: "91%", label: "Precision des previsions - s'ameliorant chaque semaine par auto-correction", icon: "performance" },
      { stat: "17", label: "Metriques de business prevues simultanement : revenu, main-d'oeuvre, cout alimentaire, profit, et plus", icon: "data" },
      { stat: "48h", label: "Du branchement POS au premier forecast exploitable", icon: "speed" },
    ],
    howEyebrow: "COMMENT CA MARCHE",
    howTitle: "Apprendre. Projeter. Corriger. Recommencer.",
    howSteps: [
      { step: "01", title: "Apprend vos patterns", description: "Foresight ingere vos donnees historiques et detecte automatiquement 11 categories d'hypotheses - saisonnalite, mix daypart, split canal, tendances prix, patterns de staffing.", icon: "intelligence" },
      { step: "02", title: "Projette vers l'avant", description: "Genere des forecasts pour 17 metriques sur 14-90 jours avec intervalles de confiance. Ajoute des signaux externes - meteo, evenements, activite concurrente - et mappe les dependances entre modules.", icon: "forecasting" },
      { step: "03", title: "Se corrige chaque semaine", description: "Compare le forecast au reel. Detecte les biais systematiques. Ajuste le modele automatiquement.", icon: "performance" },
    ],
    componentsEyebrow: "12 SOUS-PAGES · 32 VISUELS",
    componentsTitle: "Forecast. Simuler. Brief. Agir.",
    componentsDescription: "Des timelines unifiees au risque Monte Carlo, du scheduling pilote par le forecast aux briefings executives - chaque outil pour prendre de meilleures decisions.",
    components: [
      { title: "Chronologie de forecast unifiee", headline: "Revenu, main-d'oeuvre, cout alimentaire - une vue orientee avenir", description: "Voyez les 14, 30 ou 90 prochains jours sur 17 metriques dans une seule timeline. Les bandes de confiance se resserrent.", capabilities: ["22 metriques : revenu, couverts, cout main-d'oeuvre, cout alimentaire, profit, SPLH, RevPASH et plus", "Horizons 14-365 jours avec niveaux de confiance adaptatifs", "Bandes de confiance qui se resserrent", "Overlay reel vs forecast mis a jour quotidiennement", "Granularite de 15 minutes au mensuel"], icon: "forecasting", color: "from-cyan-500 to-blue-600" },
      { title: "Constructeur de scenarios", headline: "Testez les decisions avant de les prendre", description: "Changez un hypothese - prix, staffing, capacite, marketing - et voyez l'impact en cascade sur revenu, couverts, couts et profit.", capabilities: ["Ajustement des hypotheses de prix, capacite, marketing, staffing et cout", "Impact en cascade sur revenu, main-d'oeuvre, cout alimentaire et profit", "Comparaison de 5 scenarios max", "Templates predefinis", "Analyse de sensibilite"], icon: "data", color: "from-purple-500 to-purple-600" },
      { title: "Registre des hypotheses", headline: "Chaque hypothese - visible, editable, auditable", description: "Foresight detecte 11 categories d'hypotheses a partir de vos donnees et vous permet de remplacer n'importe laquelle.", capabilities: ["Hypotheses detectees automatiquement", "Overrides operateur avec audit trail", "Injection de signaux externes", "Score d'impact par hypothese"], icon: "insights", color: "from-emerald-500 to-teal-600" },
      { title: "Dependances inter-modules", headline: "Comprenez comment un changement se propage", description: "Une hausse de revenu tire la main-d'oeuvre, les achats et les marges. Foresight mappe ces dependances et les quantifie.", capabilities: ["Graphique de dependances", "Score de correlation", "Timing de cascade", "Forecast P&L integre", "Scheduling et achats pilotes par forecast"], icon: "architecture", color: "from-violet-500 to-purple-600" },
      { title: "Auto-correction de precision", headline: "Le forecast qui devient meilleur chaque semaine", description: "Foresight mesure sa precision, detecte les biais systematiques, puis se corrige automatiquement.", capabilities: ["MAPE et RMSE suivis par metrique", "Detection de biais", "Auto-correction", "Journal de correction"], icon: "performance", color: "from-green-500 to-emerald-600" },
      { title: "Briefing executif", headline: "Votre semaine a venir - resumee avec actions", description: "Chaque lundi a 6h, Foresight genere un briefing executif: resume du forecast, risques, opportunites et actions priorisees.", capabilities: ["Briefing narratif hebdomadaire", "Actions critiques/hautes/moyennes", "Identification des risques et opportunites", "Historique de briefing", "Export PDF"], icon: "intelligence", color: "from-blue-500 to-indigo-600" },
      { title: "Integration des signaux externes", headline: "Meteo, evenements, concurrents, jours feries - quantifies", description: "Foresight ingere des signaux externes et estime leur impact sur le revenu avec scores de confiance.", capabilities: ["Impact meteo horaire", "Intelligence des evenements locaux", "Suivi des concurrents", "Calendrier des jours feries", "Indicateurs economiques"], icon: "watchtower", color: "from-amber-500 to-orange-600" },
      { title: "Analyse de risque Monte Carlo", headline: "1000 simulations. Une distribution.", description: "Quantifiez le risque a la baisse et identifiez les pires scenarios.", capabilities: ["Simulation Monte Carlo 1000 iterations", "P10/P50/P90", "Decomposition des facteurs de risque", "Stress test et isolation des scenarios"], icon: "risk", color: "from-rose-500 to-pink-600" },
    ],
    pricingTitle: "Ajoutez Foresight a votre offre Core",
    pricingDescription: "Chaque offre inclut les 12 sous-pages et 32 visuels. Votre niveau Core definit la vitesse et la profondeur.",
    pricingTiers: [
      { tier: "Core Lite", base: "$279", perLocation: "$27", description: "Pour les exploitants qui debutent avec l'intelligence predictive.", enhancements: ["Rafraichissement toutes les 15 min", "8000 credits AI/mois", "2 ans d'historique", "50 requetes forecast/jour"] },
      { tier: "Core Pro", base: "$249", perLocation: "$24", description: "Pour les exploitants multi-sites avec toute la pile.", highlighted: true, enhancements: ["Rafraichissement toutes les 5 min", "14000 credits AI/mois", "3 ans de donnees historiques", "150 requetes forecast/jour", "Modes Analyst & Strategist", "Support multi-POS natif"] },
      { tier: "Enterprise", base: "Sur mesure", perLocation: "Sur mesure", description: "Support dedie, SLA, white-label et integrations custom.", enhancements: ["Intervalles de rafraichissement custom", "Credits AI illimites", "Acces historique complet", "Requetes illimitees", "Tous les modes d'intelligence", "Success manager dedie"] },
    ],
    ctaTitle: "Pret pour l'intelligence predictive ?",
    ctaDescription: "Dites-nous ce qu'il vous faut. Nous construirons le modele pour le realiser.",
    ctaPrimary: "Reserver une demo",
    ctaSecondary: "Voir tous les modules",
    mockups: {
      timeline: { label: "Chronologie de forecast unifiee - 30 jours", forecastRev: "Revenu forecast", confidence: "Confiance", accuracy: "Precision", today: "Aujourd'hui", actual: "Reel", forecast: "Forecast", band: "Bande 90%", alert: "Erreur de forecast sous 4 %. La bande de confiance se resserre." },
      scenario: { label: "Constructeur de scenarios", baselineRev: "Revenu de base", scenarioRev: "Revenu scenario", scenarioText: "Scenario : +10 % de prix + promo week-end", alert: "La baisse de couverts est compensee par +17.6 % sur le ticket. Revenu net +$23K.", headers: ["Metrique", "Base", "Scenario", "Delta"] },
      assumptions: { label: "Registre des hypotheses", headers: ["Hypothese", "Source", "Impact", "Statut"], rows: [["Saisonnalite week-end +18 %", "Auto-detectee", "Fort", "Active"], ["Daypart midi : 35 % du revenu", "Historique", "Fort", "Active"], ["Capacite staff : 12 FOH", "Operateur", "Moyen", "Override"], ["Evenement local : concert 22 mars", "Externe", "Moyen", "Nouveau"], ["Cout alimentaire : tendance +2.1 %", "Auto-detectee", "Faible", "Active"]], badges: ["4 auto-detectees", "1 override operateur", "1 signal externe"] },
      dependencies: { label: "Graphique des dependances inter-modules", nodes: ["Revenu", "Main-d'oeuvre", "Stock", "Achats", "Profit"], alert: "Le changement de revenu se propage a la main-d'oeuvre en 2 jours et aux achats en 5 jours. Correlation 82 %." },
      accuracy: { label: "Auto-correction de precision", rollingMape: "MAPE roulant", bias: "Biais", corrections: "Corrections", trend: "Tendance precision 12 semaines - auto-correction hebdomadaire" },
      briefing: { label: "Briefing executif - hebdo", coach: "Sundae Coach", week: "Semaine du 17 mars", summary: "Revenu projete a $248K (+6.2 % vs precedent). Jeudi porte 12 % de risque a la baisse - 2 vacances staff se chevauchent avec un concert complet juste a cote. Weekend fort : un festival food local devrait apporter +15 % de trafic.", actionItems: "Actions", opportunity: "Opportunite", risk: "Risque" },
      signals: { label: "Panneau de signaux externes", items: [{ type: "Meteo", signal: "Pluie prevue vendredi soir", impact: "-8 %", confidence: "72 %", color: "bg-sky-400" }, { type: "Evenement", signal: "Festival food samedi-dimanche", impact: "+15 %", confidence: "88 %", color: "bg-amber-400" }, { type: "Concurrent", signal: "Nouveau burger a 0.3 mile", impact: "-3 %", confidence: "45 %", color: "bg-rose-400" }, { type: "Jour ferie", signal: "St Patrick lundi", impact: "+22 %", confidence: "94 %", color: "bg-green-400" }, { type: "Economique", signal: "CPI +0.3 % MoM", impact: "-1 %", confidence: "35 %", color: "bg-purple-400" }] },
      monteCarlo: { label: "Analyse de risque Monte Carlo", bestCase: "Meilleur cas", mostLikely: "Plus probable", worstCase: "Pire cas", simulations: "1000 simulations", downside: "12 % de risque baissier", expectedValue: "Valeur attendue : $251K", alert: "12 % de probabilité de revenu sous $230K. Cause principale : risque de staffing jeudi." },
    },
  },
  es: {
    heroBadge: "Inteligencia predictiva",
    heroTitle: "Deja de reaccionar. Empieza a anticipar.",
    heroDescription: "Previsiones hacia delante para todas las metricas que importan - ingresos, mano de obra, coste de comida y beneficio. Bandas de confianza que se estrechan con el tiempo, escenarios what-if y briefings ejecutivos semanales.",
    heroPrimary: "Reservar una demo",
    heroSecondary: "Ver calculadora de precios",
    problemTitle: "Tu P&L te dice lo que paso. No lo que viene.",
    problemDescription: "Cuando llegan las cifras del mes pasado, el dano ya esta hecho. Foresight usa los datos que ya tienes para mostrar antes lo que se esta formando.",
    stats: [
      { stat: "91%", label: "Precision de previsiones - mejorando semanalmente con autocorreccion", icon: "performance" },
      { stat: "17", label: "Metricas de negocio previstas a la vez: ingresos, mano de obra, comida, beneficio y mas", icon: "data" },
      { stat: "48h", label: "Desde conectar el POS hasta la primera previsión accionable", icon: "speed" },
    ],
    howEyebrow: "COMO FUNCIONA",
    howTitle: "Aprende. Proyecta. Corrige. Repite.",
    howSteps: [
      { step: "01", title: "Aprende tus patrones", description: "Foresight ingiere tus datos historicos y detecta automaticamente 11 categorias de supuestos - estacionalidad, mix de franjas, canal, precios y staffing.", icon: "intelligence" },
      { step: "02", title: "Proyecta hacia delante", description: "Genera previsiones para 17 metricas a 14-90 dias con bandas de confianza. Añade señales externas - clima, eventos y competidores - y mapea dependencias.", icon: "forecasting" },
      { step: "03", title: "Se autocorrige cada semana", description: "Compara la previsión con la realidad, detecta sesgo sistematico y ajusta el modelo automaticamente.", icon: "performance" },
    ],
    componentsEyebrow: "12 subpaginas · 32 visuales",
    componentsTitle: "Prever. Simular. Resumir. Actuar.",
    componentsDescription: "Desde la linea temporal unificada hasta el riesgo Monte Carlo, pasando por scheduling y compras guiados por previsiones, y briefings ejecutivos.",
    components: [
      { title: "Linea temporal unificada", headline: "Ingresos, mano de obra y comida - una sola vista hacia delante", description: "Ve los proximos 14, 30 o 90 dias en una sola linea temporal. Las bandas de confianza se estrechan a medida que aprende.", capabilities: ["22 metricas: ingresos, covers, mano de obra, comida, beneficio, SPLH, RevPASH y mas", "Horizontes de 14-365 dias", "Bandas que se estrechan", "Overlay real vs previsión", "Granularidad de 15 minutos a mensual"], icon: "forecasting", color: "from-cyan-500 to-blue-600" },
      { title: "Constructor de escenarios", headline: "Prueba decisiones antes de tomarlas", description: "Cambia cualquier supuesto - precios, staffing, capacidad, marketing - y ve el impacto en cascada.", capabilities: ["Ajusta precios, capacidad, marketing, staffing y costes", "Impacto en cascada", "Comparacion de hasta 5 escenarios", "Plantillas preconstruidas", "Analisis de sensibilidad"], icon: "data", color: "from-purple-500 to-purple-600" },
      { title: "Registro de supuestos", headline: "Cada supuesto - visible, editable y auditable", description: "Foresight detecta 11 categorias de supuestos y te deja sobrescribir cualquiera.", capabilities: ["Supuestos detectados automaticamente", "Overrides con audit trail", "Inyeccion de señales externas", "Puntuacion de impacto"], icon: "insights", color: "from-emerald-500 to-teal-600" },
      { title: "Dependencias entre modulos", headline: "Entiende como un cambio se propaga", description: "Una subida de ingresos empuja mano de obra, compras, inventario y margenes. Foresight lo modela.", capabilities: ["Grafico de dependencias", "Puntuacion de correlacion", "Timing de cascada", "Prevision P&L", "Scheduling y compras guiadas"], icon: "architecture", color: "from-violet-500 to-purple-600" },
      { title: "Autocorreccion de precision", headline: "La previsión que mejora cada semana", description: "Mide su precision, detecta sesgo y se autocorrige.", capabilities: ["MAPE y RMSE por metrica", "Deteccion de sesgo", "Autocorreccion", "Registro de correcciones"], icon: "performance", color: "from-green-500 to-emerald-600" },
      { title: "Briefing ejecutivo", headline: "Tu semana por delante - resumida con acciones", description: "Cada lunes a las 6 AM genera un briefing ejecutivo con resumen, riesgos, oportunidades y acciones priorizadas.", capabilities: ["Briefing semanal de Sundae Coach", "Acciones criticas/altas/medias", "Riesgo y oportunidad con impacto", "Historial de briefings", "Exportacion PDF"], icon: "intelligence", color: "from-blue-500 to-indigo-600" },
      { title: "Integracion de señales externas", headline: "Clima, eventos, competidores y festivos - medidos", description: "Ingiere señales externas y estima su impacto en ingresos con scores de confianza.", capabilities: ["Impacto del clima por hora", "Inteligencia de eventos locales", "Seguimiento de competidores", "Calendario de festivos", "Indicadores economicos"], icon: "watchtower", color: "from-amber-500 to-orange-600" },
      { title: "Riesgo Monte Carlo", headline: "1000 simulaciones. Una distribucion.", description: "Cuantifica el riesgo a la baja e identifica escenarios pesimos.", capabilities: ["Simulacion Monte Carlo 1000 veces", "P10/P50/P90", "Descomposicion de riesgo", "Stress test y aislamiento"], icon: "risk", color: "from-rose-500 to-pink-600" },
    ],
    pricingTitle: "Añade Foresight a tu plan Core",
    pricingDescription: "Cada plan incluye las 12 subpaginas y los 32 visuales. Tu tier Core decide velocidad, profundidad y volumen.",
    pricingTiers: [
      { tier: "Core Lite", base: "$279", perLocation: "$27", description: "Para operadores individuales que empiezan con inteligencia predictiva.", enhancements: ["Actualizacion cada 15 min", "8000 creditos AI/mes", "2 años de datos", "50 consultas/dia"] },
      { tier: "Core Pro", base: "$249", perLocation: "$24", description: "Para multi-local con toda la pila de inteligencia.", highlighted: true, enhancements: ["Actualizacion cada 5 min", "14000 creditos AI/mes", "3 años de historico", "150 consultas/dia", "Modos Analyst & Strategist", "Soporte multi-POS nativo"] },
      { tier: "Enterprise", base: "A medida", perLocation: "A medida", description: "Soporte dedicado, SLAs, white-label e integraciones custom.", enhancements: ["Intervalos custom", "Creditos AI ilimitados", "Acceso historico completo", "Consultas ilimitadas", "Todos los modos", "Success manager dedicado"] },
    ],
    ctaTitle: "Listo para inteligencia predictiva?",
    ctaDescription: "Dinos lo que necesitas. Construiremos el modelo para hacerlo realidad.",
    ctaPrimary: "Reservar demo",
    ctaSecondary: "Ver todos los modulos",
    mockups: {
      timeline: { label: "Linea temporal unificada - 30 dias", forecastRev: "Ingresos previstos", confidence: "Confianza", accuracy: "Precision", today: "Hoy", actual: "Real", forecast: "Prevision", band: "Banda 90%", alert: "El error de previsión esta por debajo del 4%. La confianza se estrecha con mas datos." },
      scenario: { label: "Constructor de escenarios", baselineRev: "Ingresos base", scenarioRev: "Ingresos escenario", scenarioText: "Escenario: +10% precio + promo fin de semana", alert: "La caida de covers se compensa con +17.6% de ticket. Ingreso neto +$23K.", headers: ["Metrica", "Base", "Escenario", "Delta"] },
      assumptions: { label: "Registro de supuestos", headers: ["Supuesto", "Fuente", "Impacto", "Estado"], rows: [["Estacionalidad fin de semana +18%", "Auto-detectado", "Alto", "Activo"], ["Franja de comida: 35% de ingresos", "Historico", "Alto", "Activo"], ["Capacidad staff: 12 FOH", "Operador", "Medio", "Override"], ["Evento local: concierto 22 mar", "Externo", "Medio", "Nuevo"], ["Coste comida: tendencia +2.1%", "Auto-detectado", "Bajo", "Activo"]], badges: ["4 auto-detectados", "1 override operador", "1 señal externa"] },
      dependencies: { label: "Grafico de dependencias entre modulos", nodes: ["Ingresos", "Mano de obra", "Inventario", "Compras", "Beneficio"], alert: "El cambio de ingresos se propaga a mano de obra en 2 dias y a compras en 5 dias. Correlacion 82%." },
      accuracy: { label: "Autocorreccion de precision", rollingMape: "MAPE rodante", bias: "Sesgo", corrections: "Correcciones", trend: "Tendencia de precision 12 semanas - autocorreccion semanal" },
      briefing: { label: "Briefing ejecutivo - semanal", coach: "Sundae Coach", week: "Semana del 17 de marzo", summary: "Ingresos proyectados en $248K (+6.2% vs anterior). El jueves arrastra 12% de riesgo a la baja - 2 vacaciones de staff se cruzan con un evento vendido al completo al lado. Fin de semana fuerte: un festival local de comida deberia generar +15% de trafico.", actionItems: "Acciones", opportunity: "Oportunidad", risk: "Riesgo" },
      signals: { label: "Panel de señales externas", items: [{ type: "Clima", signal: "Lluvia prevista viernes PM", impact: "-8%", confidence: "72%", color: "bg-sky-400" }, { type: "Evento", signal: "Festival de comida sab-dom", impact: "+15%", confidence: "88%", color: "bg-amber-400" }, { type: "Competidor", signal: "Nuevo burger a 0.3 millas", impact: "-3%", confidence: "45%", color: "bg-rose-400" }, { type: "Festivo", signal: "San Patricio lunes", impact: "+22%", confidence: "94%", color: "bg-green-400" }, { type: "Economico", signal: "IPC +0.3% MoM", impact: "-1%", confidence: "35%", color: "bg-purple-400" }] },
      monteCarlo: { label: "Analisis Monte Carlo", bestCase: "Mejor caso", mostLikely: "Mas probable", worstCase: "Peor caso", simulations: "1000 simulaciones", downside: "12% de riesgo a la baja", expectedValue: "Valor esperado: $251K", alert: "12% de probabilidad de ingresos por debajo de $230K. Principal driver: riesgo de staffing el jueves." },
    },
  },
};

function ForecastTimelineMockup({ copy }: { copy: ForesightMockupCopy }) {
  return (
    <MockupFrame label={copy.timeline.label}>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <MockupKPI label={copy.timeline.forecastRev} value="$248K" trend="+6.2%" trendUp />
          <MockupKPI label={copy.timeline.confidence} value="91%" color="#22C55E" />
          <MockupKPI label={copy.timeline.accuracy} value="96.2%" trend="MAPE 3.8%" trendUp color="#22C55E" />
        </div>
        <div className="relative h-24 bg-[var(--surface-faint)] rounded-lg overflow-hidden">
          <svg viewBox="0 0 200 70" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,45 L15,42 L30,38 L45,35 L60,33 L75,30 L90,28 L105,25 L120,22 L135,20 L150,25 L165,28 L180,22 L200,20 L200,55 L180,48 L165,52 L150,50 L135,42 L120,45 L105,48 L90,50 L75,53 L60,55 L45,55 L30,57 L15,57 L0,60 Z" fill="rgba(28,71,255,0.1)" />
            <path d="M0,52 L15,50 L30,47 L45,44 L60,43 L75,41 L90,38" fill="none" stroke="#22C55E" strokeWidth="1.5" />
            <path d="M90,38 L105,36 L120,33 L135,30 L150,37 L165,40 L180,35 L200,30" fill="none" stroke="#1C47FF" strokeWidth="1.5" />
            <line x1="90" y1="0" x2="90" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
            <text x="90" y="8" fill="rgba(255,255,255,0.35)" fontSize="4" textAnchor="middle">{copy.timeline.today}</text>
          </svg>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded-full bg-[#22C55E]" /> {copy.timeline.actual}</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded-full bg-[#1C47FF]" /> {copy.timeline.forecast}</span>
          <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-sm bg-[rgba(28,71,255,0.1)]" /> {copy.timeline.band}</span>
        </div>
        <MockupAlert type="info">{copy.timeline.alert}</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function ScenarioComparisonMockup({ copy }: { copy: ForesightMockupCopy }) {
  return (
    <MockupFrame label={copy.scenario.label}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <MockupKPI label={copy.scenario.baselineRev} value="$248K" color="#1C47FF" />
          <MockupKPI label={copy.scenario.scenarioRev} value="$271K" trend="+$23K" trendUp color="#22C55E" />
        </div>
        <div className="space-y-1.5">
          <div className="text-[10px] font-medium text-[var(--text-secondary)] mb-1">{copy.scenario.scenarioText}</div>
          <MockupTable
            headers={copy.scenario.headers}
            rows={[
              ["Revenue", "$248K", "$271K", "+9.3%"],
              ["Covers", "5,840", "5,420", "-7.2%"],
              ["Avg Check", "$42.50", "$50.00", "+17.6%"],
              ["Labor Cost %", "28.4%", "26.1%", "-2.3pp"],
            ]}
          />
        </div>
        <MockupAlert type="info">{copy.scenario.alert}</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function AssumptionRegistryMockup({ copy }: { copy: ForesightMockupCopy }) {
  return (
    <MockupFrame label={copy.assumptions.label}>
      <div className="space-y-3">
        <MockupTable headers={copy.assumptions.headers} rows={copy.assumptions.rows} />
        <div className="flex items-center gap-2 flex-wrap">
          {copy.assumptions.badges.map((badge) => (
            <span key={badge} className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 font-medium">{badge}</span>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

function DependencyGraphMockup({ copy }: { copy: ForesightMockupCopy }) {
  const [revenue, labor, inventory, purchasing, profit] = copy.dependencies.nodes;
  return (
    <MockupFrame label={copy.dependencies.label}>
      <div className="space-y-3">
        <div className="relative h-32 bg-[var(--surface-faint)] rounded-lg overflow-hidden p-3">
          <svg viewBox="0 0 200 90" className="w-full h-full">
            <rect x="5" y="30" width="35" height="18" rx="4" fill="rgba(28,71,255,0.2)" stroke="#1C47FF" strokeWidth="0.5" />
            <text x="22" y="42" fill="#60A5FA" fontSize="5" textAnchor="middle" fontWeight="600">{revenue}</text>
            <rect x="55" y="10" width="30" height="18" rx="4" fill="rgba(168,85,247,0.2)" stroke="#A855F7" strokeWidth="0.5" />
            <text x="70" y="22" fill="#C084FC" fontSize="5" textAnchor="middle" fontWeight="600">{labor}</text>
            <rect x="55" y="52" width="35" height="18" rx="4" fill="rgba(34,197,94,0.2)" stroke="#22C55E" strokeWidth="0.5" />
            <text x="72" y="64" fill="#4ADE80" fontSize="5" textAnchor="middle" fontWeight="600">{inventory}</text>
            <rect x="110" y="30" width="40" height="18" rx="4" fill="rgba(251,191,36,0.2)" stroke="#FBBF24" strokeWidth="0.5" />
            <text x="130" y="42" fill="#FCD34D" fontSize="5" textAnchor="middle" fontWeight="600">{purchasing}</text>
            <rect x="160" y="30" width="30" height="18" rx="4" fill="rgba(14,165,233,0.2)" stroke="#0EA5E9" strokeWidth="0.5" />
            <text x="175" y="42" fill="#38BDF8" fontSize="5" textAnchor="middle" fontWeight="600">{profit}</text>
          </svg>
        </div>
        <MockupAlert type="info">{copy.dependencies.alert}</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function AccuracyTrendMockup({ copy }: { copy: ForesightMockupCopy }) {
  return (
    <MockupFrame label={copy.accuracy.label}>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <MockupKPI label={copy.accuracy.rollingMape} value="3.8%" trend="↓ from 5.1%" trendUp color="#22C55E" />
          <MockupKPI label={copy.accuracy.bias} value="-0.2%" color="#22C55E" />
          <MockupKPI label={copy.accuracy.corrections} value="7" color="#A855F7" />
        </div>
        <div className="h-16 flex items-end gap-1">
          {[
            { w: 1, h: 82, c: "bg-green-500/60" }, { w: 2, h: 78, c: "bg-green-500/60" }, { w: 3, h: 70, c: "bg-green-500/50" },
            { w: 4, h: 65, c: "bg-yellow-500/50" }, { w: 5, h: 60, c: "bg-yellow-500/50" }, { w: 6, h: 72, c: "bg-green-500/50" },
            { w: 7, h: 80, c: "bg-green-500/60" }, { w: 8, h: 85, c: "bg-green-500/60" }, { w: 9, h: 88, c: "bg-green-500/70" },
            { w: 10, h: 90, c: "bg-green-500/70" }, { w: 11, h: 92, c: "bg-green-500/80" }, { w: 12, h: 96, c: "bg-green-500/80" },
          ].map((bar) => (
            <div key={bar.w} className="flex-1 flex flex-col items-center gap-0.5">
              <div className={`w-full rounded-sm ${bar.c}`} style={{ height: `${bar.h}%` }} />
              <span className="text-[7px] text-[var(--text-muted)]">W{bar.w}</span>
            </div>
          ))}
        </div>
        <div className="text-[9px] text-[var(--text-muted)]">{copy.accuracy.trend}</div>
      </div>
    </MockupFrame>
  );
}

function BriefingCardMockup({ copy }: { copy: ForesightMockupCopy }) {
  return (
    <MockupFrame label={copy.briefing.label}>
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-[rgba(28,71,255,0.06)] border border-[rgba(28,71,255,0.15)]">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-5 h-5 rounded-full bg-[#1C47FF] flex items-center justify-center"><span className="text-[9px] text-white font-bold">S</span></div>
            <span className="text-[10px] font-semibold text-[var(--text-secondary)]">{copy.briefing.coach} — {copy.briefing.week}</span>
          </div>
          <p className="text-[9px] text-[var(--text-supporting)] leading-relaxed mb-2">{copy.briefing.summary}</p>
          <div className="space-y-1">
            <div className="text-[9px] font-semibold text-[var(--text-secondary)] mb-1">{copy.briefing.actionItems}</div>
            {[
              { priority: "critical", action: "Call backup server for Thursday PM shift" },
              { priority: "high", action: "Pre-order +20% produce for weekend surge" },
              { priority: "medium", action: "Review brunch menu pricing - 8% below forecast check" },
            ].map((item) => (
              <div key={item.action} className="flex items-start gap-1.5 text-[9px]">
                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.priority === 'critical' ? 'bg-red-400' : item.priority === 'high' ? 'bg-orange-400' : 'bg-blue-400'}`} />
                <span className="text-[var(--text-supporting)]">{item.action}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
            <div className="text-[8px] uppercase tracking-wider text-green-400 font-semibold mb-0.5">{copy.briefing.opportunity}</div>
            <div className="text-[9px] text-[var(--text-supporting)]">Food festival weekend: +$18K potential</div>
          </div>
          <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
            <div className="text-[8px] uppercase tracking-wider text-red-400 font-semibold mb-0.5">{copy.briefing.risk}</div>
            <div className="text-[9px] text-[var(--text-supporting)]">Thursday staffing gap: -$4K exposure</div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

function ExternalSignalsMockup({ copy }: { copy: ForesightMockupCopy }) {
  return (
    <MockupFrame label={copy.signals.label}>
      <div className="space-y-2">
        {copy.signals.items.map((signal) => (
          <div key={signal.signal} className="flex items-center gap-2 p-2 bg-[var(--surface-faint)] rounded-lg">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${signal.color}`} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-medium text-[var(--text-secondary)]">{signal.signal}</span>
                <span className={`text-[10px] font-bold ${signal.impact.startsWith('+') ? 'text-green-400' : 'text-orange-400'}`}>{signal.impact}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[8px] text-[var(--text-muted)]">{signal.type}</span>
                <div className="flex-1 h-0.5 bg-[var(--surface-subtle)] rounded-full overflow-hidden"><div className="h-full bg-cyan-500/60 rounded-full" style={{ width: signal.confidence }} /></div>
                <span className="text-[8px] text-[var(--text-muted)]">{signal.confidence}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function MonteCarloMockup({ copy }: { copy: ForesightMockupCopy }) {
  return (
    <MockupFrame label={copy.monteCarlo.label}>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <MockupKPI label={copy.monteCarlo.bestCase} value="$285K" color="#22C55E" />
          <MockupKPI label={copy.monteCarlo.mostLikely} value="$248K" color="#1C47FF" />
          <MockupKPI label={copy.monteCarlo.worstCase} value="$218K" color="#FF5450" />
        </div>
        <div className="relative h-16 bg-[var(--surface-faint)] rounded-lg overflow-hidden">
          <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
            <path d="M10,48 C30,48 50,45 70,35 C90,20 100,8 110,8 C120,8 130,20 150,35 C170,45 180,48 200,48" fill="rgba(28,71,255,0.15)" stroke="#1C47FF" strokeWidth="1" />
            <line x1="110" y1="0" x2="110" y2="50" stroke="#1C47FF" strokeWidth="0.5" strokeDasharray="2,2" />
            <text x="110" y="47" fill="rgba(255,255,255,0.4)" fontSize="4" textAnchor="middle">$248K</text>
            <line x1="55" y1="0" x2="55" y2="50" stroke="#FF5450" strokeWidth="0.3" strokeDasharray="1,2" />
            <text x="55" y="47" fill="rgba(255,84,80,0.5)" fontSize="3.5" textAnchor="middle">P10</text>
            <line x1="165" y1="0" x2="165" y2="50" stroke="#22C55E" strokeWidth="0.3" strokeDasharray="1,2" />
            <text x="165" y="47" fill="rgba(34,197,94,0.5)" fontSize="3.5" textAnchor="middle">P90</text>
          </svg>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-[var(--text-muted)]">
          <span>{copy.monteCarlo.simulations}</span>
          <span>·</span>
          <span>{copy.monteCarlo.downside}</span>
          <span>·</span>
          <span>{copy.monteCarlo.expectedValue}</span>
        </div>
        <MockupAlert type="warning">{copy.monteCarlo.alert}</MockupAlert>
      </div>
    </MockupFrame>
  );
}

const mockupRenderers = [
  ForecastTimelineMockup,
  ScenarioComparisonMockup,
  AssumptionRegistryMockup,
  DependencyGraphMockup,
  AccuracyTrendMockup,
  BriefingCardMockup,
  ExternalSignalsMockup,
  MonteCarloMockup,
] as const;

export default function ForesightPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = localizedForesightCopy[locale] ?? localizedForesightCopy.en;
  const mockups = ui.mockups;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.heroBadge} title={ui.heroTitle} description={ui.heroDescription}>
        <p className="text-sm text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">{locale === 'en' ? '22 forecast metrics. 14-365 day horizons. Self-correcting accuracy. 32 forecast visuals.' : locale === 'ar' ? '22 مقياس توقع. أفق 14-365 يوماً. دقة تتصحح ذاتياً. 32 مرئية تنبؤية.' : locale === 'fr' ? '22 metriques, horizons 14-365 jours, precision auto-corrigee, 32 visuels de forecast.' : '22 metricas de previsión. Horizontes de 14-365 dias. Precision con autocorreccion. 32 visuales.'}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" size="lg" onClick={() => cta("/demo", "book_demo_foresight_hero", { page: "/product/foresight" })}>{ui.heroPrimary}</Button>
          <Button variant="outline-light" size="lg" href={PRICING_URL}>{ui.heroSecondary}</Button>
        </div>
      </PageHero>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.problemTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] mb-8">{ui.problemDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.stats.map((item) => (
              <StaggerItem key={item.label}>
                <Card variant="elevated" className="text-center p-6">
                  <CardContent>
                    <SundaeIcon name={item.icon} size="lg" className="text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-[var(--text-primary)] mb-2">{item.stat}</div>
                    <p className="text-sm text-[var(--text-supporting)]">{item.label}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">{ui.howEyebrow}</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.howTitle}</h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ui.howSteps.map((step) => (
              <StaggerItem key={step.step}>
                <div className="text-center p-6 rounded-2xl bg-[var(--navy-deep)] border border-[var(--border-default)]">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <SundaeIcon name={step.icon} size="lg" className="text-white" />
                  </div>
                  <div className="text-xs font-mono text-cyan-400 mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">{ui.componentsEyebrow}</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.componentsTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.componentsDescription}</p>
          </FadeUp>
          <div className="space-y-16">
            {ui.components.map((component, index) => {
              const MockupComponent = mockupRenderers[index];
              return (
                <FadeUp key={component.title} delay={index * 0.05}>
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}><MockupComponent copy={mockups} /></div>
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${component.color} rounded-xl flex items-center justify-center`}><SundaeIcon name={component.icon} size="lg" className="text-white" /></div>
                        <div><h3 className="text-2xl font-bold text-[var(--text-primary)]">{component.title}</h3><p className="text-sm text-[var(--text-muted)] font-medium">{component.headline}</p></div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-6">{component.description}</p>
                      <div className="space-y-2 mb-4">
                        {component.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"><span className="text-cyan-400 flex-shrink-0 mt-0.5">✓</span><span>{cap}</span></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.pricingTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.pricingDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ui.pricingTiers.map((tier) => (
              <StaggerItem key={tier.tier}>
                <Card variant="elevated" className={`p-6 ${tier.highlighted ? 'border border-cyan-500/30' : ''}`}>
                  <CardHeader>
                    <CardTitle className="text-[var(--text-primary)]">{tier.tier}</CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[var(--text-primary)]">{tier.base}</span>
                      <span className="text-sm text-[var(--text-muted)]">{tier.perLocation}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-supporting)] mb-4">{tier.description}</p>
                    <ul className="space-y-2">
                      {tier.enhancements.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"><span className="text-cyan-400 mt-0.5">✓</span><span>{item}</span></li>
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
        <Button variant="cta" size="lg" onClick={() => cta("/demo", "book_demo_foresight_cta", { page: "/product/foresight" })}>{ui.ctaPrimary}</Button>
        <Button variant="outline-light" size="lg" href="/product">{ui.ctaSecondary}</Button>
      </PageCTA>
    </div>
  );
}
