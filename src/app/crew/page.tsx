"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { ElegantShape } from "@/components/ui/ElegantShape";
import { CrewDashboardMockup } from "@/components/ui/MockupFrame";
import { REPORT_APP_URL } from "@/lib/urls";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

/* ─── Structural data (icons / accents stay constant across locales) ─── */

const featurePillars = [
  { icon: "operators" as SundaeIconName, accent: "from-[#1C47FF] to-[#3B82F6]" },
  { icon: "speed" as SundaeIconName, accent: "from-[#0EA5E9] to-[#0284C7]" },
  { icon: "finance" as SundaeIconName, accent: "from-[#22C55E] to-[#16A34A]" },
  { icon: "support" as SundaeIconName, accent: "from-[#A855F7] to-[#7C3AED]" },
  { icon: "intelligence" as SundaeIconName, accent: "from-[#EC4899] to-[#BE185D]" },
  { icon: "integration" as SundaeIconName, accent: "from-[#F59E0B] to-[#D97706]" },
];

const moduleAccents = [
  "from-[#1C47FF] to-[#3B82F6]",
  "from-[#0EA5E9] to-[#0284C7]",
  "from-[#22C55E] to-[#16A34A]",
] as const;

/* ─── i18n copy ─── */

type PayrollCluster = {
  flags: string[];
  region: string;
  depth: string;
  hooks: string[];
};

type LocalizedCrew = {
  badge: string;
  heroLine1: string;
  heroLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;

  loopEyebrow: string;
  loopTitle: string;
  loopDescription: string;
  loopLeftLabel: string;
  loopLeftBody: string;
  loopRightLabel: string;
  loopRightBody: string;
  loopClosing: string;

  pillarsEyebrow: string;
  pillarsTitle: string;
  pillarsDescription: string;
  pillars: { title: string; body: string; chips: string[] }[];

  coverageLabel: string;
  coverageItems: { title: string; body: string }[];

  payrollEyebrow: string;
  payrollTitle: string;
  payrollDescription: string;
  payrollClusters: PayrollCluster[];
  payrollExportsLabel: string;
  payrollExportsItems: string[];
  payrollFormsLabel: string;
  payrollFormsItems: string[];
  payrollGuaranteesLabel: string;
  payrollGuaranteesItems: string[];
  payrollRoadmapLabel: string;
  payrollRoadmapItems: string[];
  payrollClosing: string;

  modulesEyebrow: string;
  modulesTitle: string;
  modulesDescription: string;
  modules: { name: string; tagline: string; included: string[] }[];
  bundleLabel: string;
  bundleDescription: string;
  freeTierLabel: string;
  freeTierDescription: string;

  personasEyebrow: string;
  personasTitle: string;
  personasDescription: string;
  personas: { title: string; outcome: string; metric: string }[];

  byohrEyebrow: string;
  byohrTitle: string;
  byohrDescription: string;
  byohrItems: string[];

  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedCrew> = {
  en: {
    badge: "CREW · OPERATIONAL SUBSTRATE",
    heroLine1: "Every shift",
    heroLine2: "becomes signal.",
    description: "Crew runs your people, schedules, time, and payroll. Every action becomes operating data that feeds Sundae's decision intelligence — a loop standalone HR or payroll vendors cannot close.",
    primaryCta: "Book a Crew Walkthrough",
    secondaryCta: "See Crew in Action",

    loopEyebrow: "WHY CREW SITS IN SUNDAE",
    loopTitle: "The operational layer that powers the intelligence layer.",
    loopDescription: "Standalone HR vendors see schedules. Standalone analytics tools see POS. Sundae closes the loop — and the moat is the loop.",
    loopLeftLabel: "Standalone HR / payroll",
    loopLeftBody: "Owns schedules, hours, payroll. Reports stop at workforce. Margin, demand context, decision quality — not their job.",
    loopRightLabel: "Crew inside Sundae",
    loopRightBody: "Every shift, hour, swap, attestation, and payroll cycle is signal. Labor Intelligence reads it. Pulse pages it. Foresight forecasts on it. The whole platform gets sharper.",
    loopClosing: "Same workforce data. Compounding intelligence.",

    pillarsEyebrow: "WHAT SHIPS TODAY",
    pillarsTitle: "Six surfaces. One operational substrate.",
    pillarsDescription: "Every Crew page is at depth-5 standard or on the rebuild backlog tracked publicly. No demo-only screens.",
    pillars: [
      { title: "Scheduling", body: "AI Builder composes the schedule from demand forecast, role mix, and eligibility — then the manager edits the four view modes that matter (overview, by-person, by-shift, by-role). Recurrence, eligibility checks, conflict warnings, public-holiday overlays.", chips: ["AI Builder", "4 view modes", "Demand-matched", "Recurrence"] },
      { title: "Time & Attendance", body: "Mobile PWA clock-in with geo-fence and WebAuthn biometric. Break tracking, missed-punch flow, manager approval. Live trust scores feeding Workforce Health.", chips: ["Mobile PWA", "Geo-fence", "Biometric", "Trust scores"] },
      { title: "Payroll Engine", body: "Provider-neutral calculation engine. Multi-region — United States, Canada, United Kingdom, European Union, GCC. Statutory exports (NACHA, EFT, HMRC RTI, SEPA, WPS) and year-end forms per jurisdiction. AI-explained preview, gratuity accrual, leave encashment, final settlement. Pack-driven, not hardcoded — annual updates are pack edits.", chips: ["Multi-region", "Statutory exports", "Year-end forms", "AI assist"] },
      { title: "Hire-to-Retire", body: "Every stage of the workforce lifecycle in one place. Recruiting, background checks, onboarding, performance reviews, compensation, talent 9-box, internal mobility, referrals, training, skills, attestations, helpdesk with SLAs, disciplinary, anonymous whistleblower, expenses, loans, tip pools, offboarding, gratuity, final settlement.", chips: ["Onboarding", "Performance", "Talent 9-box", "Offboarding"] },
      { title: "Crew Coach + Decision Replay", body: "Crew Coach is your AI partner across the workforce domain — natural-language requests, source-cited answers, recommendations a manager can defend. Decision Replay logs every action: who decided, what changed, what the model said. Audit-ready by default.", chips: ["AI assistant", "Source-cited", "Replay log", "Audit-ready"] },
      { title: "Workflow + Approvals Builders", body: "No-code builders for approval chains and multi-step workflows. Span-of-control awareness from the org tree. Photo-card org view with reassign + cascade preview.", chips: ["No-code", "Org-aware", "Cascade preview", "Audit trail"] },
    ],

    coverageLabel: "Also included in every Crew deployment",
    coverageItems: [
      { title: "Employee mobile portal", body: "Every employee gets a free Sundae account — view shifts, request time-off, swap, payslips, attestations, biometric clock-in." },
      { title: "Communications", body: "Briefings with topology audience picker, team feed, kudos, surveys, channel registry." },
      { title: "Documents & e-sign", body: "Document storage, e-signature flow, evidence packs, credential tracking." },
      { title: "Integrations & adapters", body: "BYO-HR adapters (Bayzat, Personio, Pento, Gusto, BambooHR), POS labor sync, public-holiday packs, partner-SDK." },
      { title: "Org tree & permissions", body: "Photo-card org view, reassign with cascade preview, Owner / HR-Admin / Manager / Employee permission tiers." },
      { title: "Admin & governance", body: "SSO, audit feed, RBAC, billing console, imports & bulk edit, multi-outlet management." },
    ],

    payrollEyebrow: "MULTI-REGION PAYROLL",
    payrollTitle: "One engine. Every jurisdiction.",
    payrollDescription: "Provider-neutral. Pack-driven. Every statutory rate is a versioned, source-cited rule — not hardcoded — so annual updates are pack edits, not code rewrites.",
    payrollClusters: [
      { flags: ["🇺🇸"], region: "United States", depth: "Federal + every state + DC + PR + major cities", hooks: ["FICA", "FUTA", "SUTA", "SDI", "NACHA", "W-2", "1099"] },
      { flags: ["🇨🇦"], region: "Canada", depth: "Federal + every province and territory", hooks: ["CPP", "CPP2", "EI", "QPP", "QPIP", "EFT", "T4", "RL-1", "ROE"] },
      { flags: ["🇬🇧"], region: "United Kingdom", depth: "England, Wales, Northern Ireland + Scotland", hooks: ["PAYE", "NI", "Auto-enrolment", "HMRC RTI", "P60", "P11D"] },
      { flags: ["🇪🇺"], region: "European Union", depth: "All 27 member states", hooks: ["Lohnsteuer", "IRPF", "URSSAF", "Loonheffing", "USC", "SEPA", "DSN", "Modelo 190"] },
      { flags: ["🇦🇪", "🇸🇦", "🇶🇦", "🇧🇭", "🇴🇲", "🇰🇼"], region: "GCC", depth: "UAE · KSA · Qatar · Bahrain · Oman · Kuwait", hooks: ["WPS", "GOSI", "GPSSA", "PIFSS", "SIO", "Gratuity", "Leave encashment"] },
    ],
    payrollExportsLabel: "Statutory exports",
    payrollExportsItems: ["NACHA", "EFT 005", "HMRC RTI", "SEPA", "WPS SIF"],
    payrollFormsLabel: "Year-end forms",
    payrollFormsItems: ["W-2", "T4", "P60", "P11D", "Lohnsteuerbescheinigung", "jaaropgaaf", "DSN", "Modelo 190", "GOSI annual"],
    payrollGuaranteesLabel: "Engine guarantees",
    payrollGuaranteesItems: ["Pack-driven", "Rule-versioned", "Source-cited per rate", "AI-explained preview"],
    payrollRoadmapLabel: "On the roadmap",
    payrollRoadmapItems: ["Latin America", "APAC", "Expanded regional coverage"],
    payrollClosing: "BYO-payroll? Crew exports clean files and drives partner APIs (Bayzat MEA, Personio EU, Pento UK, Gusto US).",

    modulesEyebrow: "MODULES",
    modulesTitle: "Three modules. One bundle. Free portal for every employee.",
    modulesDescription: "Buy what you need. Bundle discount applies automatically when all three are attached.",
    modules: [
      { name: "Crew Operations", tagline: "People, scheduling, HR records.", included: ["Scheduling + AI Builder", "60+ HR surfaces", "Onboarding → offboarding", "Org tree + permissions", "Workflow + approvals builders"] },
      { name: "Crew T&A", tagline: "Clock-in, attendance, variance.", included: ["Mobile PWA clock-in", "Geo-fence + biometric", "Break tracking", "Variance + trust scores", "Manager approvals"] },
      { name: "Crew Payroll", tagline: "Multi-region calculation engine.", included: ["Provider-neutral engine", "Multi-region packs", "NACHA · EFT · HMRC RTI · SEPA · WPS", "Year-end forms per jurisdiction", "Gratuity + final settlement"] },
    ],
    bundleLabel: "Crew Operating Suite",
    bundleDescription: "Bundle discount auto-applies when all three modules are attached.",
    freeTierLabel: "Free for every employee",
    freeTierDescription: "Every Crew employee gets a free Sundae self-service account — view shifts, request time-off, view payslips, clock in. Bottom-up workforce identity, included.",

    personasEyebrow: "WHO RUNS CREW",
    personasTitle: "Built for the people who actually run the floor.",
    personasDescription: "Four roles. Four scoped views. One source of truth.",
    personas: [
      { title: "HR & People Lead", outcome: "Hire-to-retire in one platform — onboarding, performance, talent, payroll readiness, offboarding — feeding Labor Intelligence in the same breath.", metric: "60+ HR surfaces" },
      { title: "Operations Manager", outcome: "Schedule for demand, not for last week. AI Builder, eligibility-checked assignment, swap marketplace, manager actions queue.", metric: "AI-built schedules" },
      { title: "Payroll Admin", outcome: "Close payroll without manual exports. Multi-region engine — US, Canada, UK, EU, GCC. Statutory exports and year-end forms built in. AI assist for adjustments and edge cases.", metric: "US · CA · UK · EU · GCC" },
      { title: "Employees", outcome: "Free Sundae self-service portal. View shift, request time-off, swap, see payslip, attest policies, clock in via mobile PWA with biometric.", metric: "Free · always" },
    ],

    byohrEyebrow: "ALREADY ON BAYZAT, PERSONIO, OR GUSTO?",
    byohrTitle: "Crew is optional. The intelligence loop isn't.",
    byohrDescription: "Bring your own HR. Sundae's canonical HR domain contract reads from any compliant adapter — and Labor Intelligence still gets 5–10× richer than competitors who only see POS.",
    byohrItems: ["Bayzat (MEA hospitality)", "Personio (EU)", "Pento / Onfolk (UK)", "Gusto / Rippling (US)", "BambooHR (canonical adapter)", "POS-native HR exports"],

    ctaEyebrow: "RUN YOUR PEOPLE. POWER YOUR INTELLIGENCE.",
    ctaTitle: "See what changes when the loop closes.",
    ctaDescription: "30 minutes. Your operation. We'll walk Crew + how every workforce event reshapes Labor Intelligence in your live dashboards.",
    ctaPrimary: "Book a Crew Walkthrough",
    ctaSecondary: "See Sundae Platform",
  },
  ar: {
    badge: "Crew · الركيزة التشغيلية",
    heroLine1: "كل وردية",
    heroLine2: "تصبح إشارة.",
    description: "Crew يدير موظفيك وجداولك وحضورك ورواتبك. كل فعل يصبح بيانات تشغيلية تغذي ذكاء قرارات Sundae — حلقة لا يستطيع موردو HR أو الرواتب القائمون بذاتهم إغلاقها.",
    primaryCta: "احجز جولة Crew",
    secondaryCta: "شاهد Crew في العمل",

    loopEyebrow: "لماذا Crew داخل Sundae",
    loopTitle: "الطبقة التشغيلية التي تشغل طبقة الذكاء.",
    loopDescription: "موردو HR القائمون بذاتهم يرون الجداول. أدوات التحليل القائمة بذاتها ترى POS. Sundae يغلق الحلقة — والحلقة هي الحصن.",
    loopLeftLabel: "HR / رواتب قائمة بذاتها",
    loopLeftBody: "تملك الجداول والساعات والرواتب. التقارير تتوقف عند القوى العاملة. الهامش وسياق الطلب وجودة القرار — ليست عملها.",
    loopRightLabel: "Crew داخل Sundae",
    loopRightBody: "كل وردية وساعة وتبديل وإقرار ودورة رواتب هي إشارة. Labor Intelligence يقرؤها. Pulse يبلّغها. Foresight يتنبأ بها. المنصة كلها تصبح أحدّ.",
    loopClosing: "نفس بيانات القوى العاملة. ذكاء مركّب.",

    pillarsEyebrow: "ما يُشحن اليوم",
    pillarsTitle: "ست واجهات. ركيزة تشغيلية واحدة.",
    pillarsDescription: "كل صفحة Crew في معيار العمق-5 أو على قائمة إعادة البناء المُتتبعة علناً. لا شاشات للعرض فقط.",
    pillars: [
      { title: "الجدولة", body: "AI Builder يؤلف الجدول من توقع الطلب ومزيج الأدوار والأهلية — ثم يحرر المدير الأنماط الأربعة (نظرة عامة، حسب الشخص، حسب الوردية، حسب الدور). تكرار، فحص أهلية، تحذيرات تعارض، تداخل عطل رسمية.", chips: ["AI Builder", "4 أنماط عرض", "متطابق مع الطلب", "تكرار"] },
      { title: "الوقت والحضور", body: "PWA جوال للتسجيل مع geo-fence وWebAuthn بيومتري. تتبع استراحات، تدفق ضربة فائتة، موافقة المدير. درجات ثقة حية تغذي Workforce Health.", chips: ["PWA جوال", "Geo-fence", "بيومتري", "درجات الثقة"] },
      { title: "محرك الرواتب", body: "محرك حساب محايد. متعدد المناطق — الولايات المتحدة، كندا، المملكة المتحدة، الاتحاد الأوروبي، دول الخليج. تصديرات قانونية (NACHA، EFT، HMRC RTI، SEPA، WPS) ونماذج نهاية السنة لكل ولاية قضائية. معاينة بشرح ذكي، استحقاق المكافأة، استبدال الإجازات، التسوية النهائية. مدفوع بحزم لا مُشفّر — التحديثات السنوية تعديل حزمة.", chips: ["متعدد المناطق", "تصديرات قانونية", "نماذج نهاية السنة", "مساعد AI"] },
      { title: "من التعيين إلى التقاعد", body: "كل مرحلة من دورة حياة القوى العاملة في مكان واحد. توظيف، فحوصات خلفية، تعيين، مراجعات أداء، تعويضات، 9-box للمواهب، تنقل داخلي، إحالات، تدريب، مهارات، إقرارات، helpdesk بـ SLA، تأديب، إبلاغ مجهول، نفقات، قروض، تجمعات بقشيش، إنهاء، مكافأة، تسوية نهائية.", chips: ["تعيين", "أداء", "9-box المواهب", "إنهاء"] },
      { title: "Crew Coach + Decision Replay", body: "Crew Coach شريكك الذكي عبر مجال القوى العاملة — طلبات بلغة طبيعية، إجابات بمصادر، توصيات يمكن للمدير الدفاع عنها. Decision Replay يسجل كل فعل: من قرر، ما تغير، ما قاله النموذج. جاهز للتدقيق تلقائياً.", chips: ["مساعد ذكي", "بمصادر", "سجل إعادة", "جاهز للتدقيق"] },
      { title: "منشئو الموافقات وسير العمل", body: "منشئون بلا كود لسلاسل الموافقات وسير العمل متعدد الخطوات. وعي بنطاق السيطرة من شجرة المنظمة. عرض بطاقة صور مع إعادة تعيين + معاينة سلسلة.", chips: ["بلا كود", "واعٍ بالمنظمة", "معاينة سلسلة", "أثر تدقيق"] },
    ],

    coverageLabel: "مشمول أيضاً في كل نشر Crew",
    coverageItems: [
      { title: "بوابة الجوال للموظفين", body: "كل موظف يحصل على حساب Sundae مجاني — مشاهدة الورديات، طلب الإجازات، التبديل، كشوف الرواتب، الإقرارات، تسجيل بيومتري." },
      { title: "الاتصالات", body: "إحاطات بمنتقي جمهور طوبولوجي، تغذية فريق، تقدير، استبيانات، سجل قنوات." },
      { title: "المستندات والتوقيع الإلكتروني", body: "تخزين مستندات، تدفق توقيع إلكتروني، حزم أدلة، تتبع شهادات." },
      { title: "التكاملات والمحولات", body: "محولات BYO-HR (Bayzat، Personio، Pento، Gusto، BambooHR)، مزامنة POS، حزم العطل الرسمية، Partner-SDK." },
      { title: "شجرة المنظمة والصلاحيات", body: "عرض بطاقة صور، إعادة تعيين بمعاينة سلسلة، طبقات صلاحيات: مالك / مدير HR / مدير / موظف." },
      { title: "الإدارة والحوكمة", body: "SSO، تغذية تدقيق، RBAC، وحدة فوترة، استيراد وتعديل دفعي، إدارة متعددة المواقع." },
    ],

    payrollEyebrow: "رواتب متعددة المناطق",
    payrollTitle: "محرك واحد. كل ولاية قضائية.",
    payrollDescription: "محايد. مدفوع بحزم. كل معدّل قانوني قاعدة ذات إصدارات ومصدر مذكور — لا كود مُشفّر — فالتحديثات السنوية تعديل حزمة لا إعادة كتابة.",
    payrollClusters: [
      { flags: ["🇺🇸"], region: "الولايات المتحدة", depth: "فيدرالي + كل ولاية + DC + PR + المدن الكبرى", hooks: ["FICA", "FUTA", "SUTA", "SDI", "NACHA", "W-2", "1099"] },
      { flags: ["🇨🇦"], region: "كندا", depth: "فيدرالي + كل مقاطعة وإقليم", hooks: ["CPP", "CPP2", "EI", "QPP", "QPIP", "EFT", "T4", "RL-1", "ROE"] },
      { flags: ["🇬🇧"], region: "المملكة المتحدة", depth: "إنجلترا، ويلز، إيرلندا الشمالية + اسكتلندا", hooks: ["PAYE", "NI", "Auto-enrolment", "HMRC RTI", "P60", "P11D"] },
      { flags: ["🇪🇺"], region: "الاتحاد الأوروبي", depth: "كل الدول الـ27 الأعضاء", hooks: ["Lohnsteuer", "IRPF", "URSSAF", "Loonheffing", "USC", "SEPA", "DSN", "Modelo 190"] },
      { flags: ["🇦🇪", "🇸🇦", "🇶🇦", "🇧🇭", "🇴🇲", "🇰🇼"], region: "دول الخليج", depth: "الإمارات · السعودية · قطر · البحرين · عُمان · الكويت", hooks: ["WPS", "GOSI", "GPSSA", "PIFSS", "SIO", "مكافأة", "استبدال إجازات"] },
    ],
    payrollExportsLabel: "تصديرات قانونية",
    payrollExportsItems: ["NACHA", "EFT 005", "HMRC RTI", "SEPA", "WPS SIF"],
    payrollFormsLabel: "نماذج نهاية السنة",
    payrollFormsItems: ["W-2", "T4", "P60", "P11D", "Lohnsteuerbescheinigung", "jaaropgaaf", "DSN", "Modelo 190", "GOSI سنوي"],
    payrollGuaranteesLabel: "ضمانات المحرك",
    payrollGuaranteesItems: ["مدفوع بحزم", "قواعد بإصدارات", "كل معدّل بمصدر", "معاينة بشرح ذكي"],
    payrollRoadmapLabel: "على خارطة الطريق",
    payrollRoadmapItems: ["أمريكا اللاتينية", "آسيا والمحيط الهادئ", "توسيع التغطية الإقليمية"],
    payrollClosing: "تجلب رواتبك؟ Crew يصدّر ملفات نظيفة ويشغّل APIs الشركاء (Bayzat، Personio، Pento، Gusto).",

    modulesEyebrow: "الوحدات",
    modulesTitle: "ثلاث وحدات. حزمة واحدة. بوابة مجانية لكل موظف.",
    modulesDescription: "اشترِ ما تحتاج. خصم الحزمة يُطبق آلياً عند ضم الثلاثة.",
    modules: [
      { name: "Crew Operations", tagline: "موظفون، جدولة، سجلات HR.", included: ["جدولة + AI Builder", "+60 واجهة HR", "تعيين → إنهاء", "شجرة منظمة + صلاحيات", "منشئو الموافقات وسير العمل"] },
      { name: "Crew T&A", tagline: "تسجيل، حضور، تباين.", included: ["PWA جوال للتسجيل", "Geo-fence + بيومتري", "تتبع الاستراحات", "تباين + درجات ثقة", "موافقات المدير"] },
      { name: "Crew Payroll", tagline: "محرك حساب متعدد المناطق.", included: ["محرك محايد", "حزم متعددة المناطق", "NACHA · EFT · HMRC RTI · SEPA · WPS", "نماذج نهاية السنة لكل ولاية قضائية", "مكافأة + تسوية نهائية"] },
    ],
    bundleLabel: "Crew Operating Suite",
    bundleDescription: "خصم الحزمة يُطبق آلياً عند ضم الوحدات الثلاث.",
    freeTierLabel: "مجاناً لكل موظف",
    freeTierDescription: "كل موظف Crew يحصل على حساب Sundae خدمة ذاتية مجاني — مشاهدة الورديات، طلب الإجازات، مشاهدة كشوف الرواتب، تسجيل. هوية قوى عاملة من الأسفل، مشمولة.",

    personasEyebrow: "من يدير Crew",
    personasTitle: "مصمم للأشخاص الذين يديرون الأرضية فعلاً.",
    personasDescription: "أربعة أدوار. أربع نظرات محددة. مصدر حقيقة واحد.",
    personas: [
      { title: "قائد HR", outcome: "من التعيين إلى التقاعد في منصة واحدة — تعيين، أداء، مواهب، جاهزية رواتب، إنهاء — يغذي Labor Intelligence في نفس النفس.", metric: "+60 واجهة HR" },
      { title: "مدير العمليات", outcome: "جدول للطلب لا للأسبوع الماضي. AI Builder، تعيين بفحص أهلية، سوق تبديل، طابور إجراءات المدير.", metric: "جداول AI" },
      { title: "مسؤول الرواتب", outcome: "أقفل الرواتب بلا تصديرات يدوية. محرك متعدد المناطق — الولايات المتحدة، كندا، المملكة المتحدة، الاتحاد الأوروبي، دول الخليج. تصديرات قانونية ونماذج نهاية السنة جاهزة. مساعد AI للتعديلات والحالات الحرجة.", metric: "US · CA · UK · EU · GCC" },
      { title: "الموظفون", outcome: "بوابة Sundae خدمة ذاتية مجانية. مشاهدة وردية، طلب إجازة، تبديل، رؤية كشف راتب، إقرار سياسات، تسجيل عبر PWA جوال ببيومتري.", metric: "مجاناً · دائماً" },
    ],

    byohrEyebrow: "تستخدم بالفعل Bayzat أو Personio أو Gusto؟",
    byohrTitle: "Crew اختياري. حلقة الذكاء ليست.",
    byohrDescription: "أحضر HR الخاص بك. عقد مجال HR الموحد من Sundae يقرأ من أي محول متوافق — ويبقى Labor Intelligence أغنى 5–10× من المنافسين الذين يرون POS فقط.",
    byohrItems: ["Bayzat (ضيافة الشرق الأوسط)", "Personio (أوروبا)", "Pento / Onfolk (المملكة المتحدة)", "Gusto / Rippling (الولايات المتحدة)", "BambooHR (محول موحد)", "تصديرات HR من POS"],

    ctaEyebrow: "أدر موظفيك. شغّل ذكاءك.",
    ctaTitle: "شاهد ما يتغير حين تُغلق الحلقة.",
    ctaDescription: "30 دقيقة. عمليتك. سنستعرض Crew + كيف يعيد كل حدث قوى عاملة تشكيل Labor Intelligence في لوحاتك الحية.",
    ctaPrimary: "احجز جولة Crew",
    ctaSecondary: "شاهد منصة Sundae",
  },
  fr: {
    badge: "CREW · SUBSTRAT OPÉRATIONNEL",
    heroLine1: "Chaque service",
    heroLine2: "devient signal.",
    description: "Crew fait tourner vos équipes, plannings, temps et paie. Chaque action devient donnée opérationnelle qui nourrit l'intelligence décisionnelle de Sundae — une boucle qu'aucun fournisseur RH ou paie autonome ne peut fermer.",
    primaryCta: "Réserver une visite Crew",
    secondaryCta: "Voir Crew en action",

    loopEyebrow: "POURQUOI CREW EST DANS SUNDAE",
    loopTitle: "La couche opérationnelle qui alimente la couche d'intelligence.",
    loopDescription: "Les fournisseurs RH autonomes voient les plannings. Les outils analytiques autonomes voient le POS. Sundae ferme la boucle — et la boucle est le moat.",
    loopLeftLabel: "RH / paie autonome",
    loopLeftBody: "Possède plannings, heures, paie. Les rapports s'arrêtent à la main-d'œuvre. Marge, contexte demande, qualité décisionnelle — pas leur travail.",
    loopRightLabel: "Crew dans Sundae",
    loopRightBody: "Chaque service, heure, swap, attestation et cycle de paie est signal. Labor Intelligence le lit. Pulse l'alerte. Foresight le projette. Toute la plateforme devient plus nette.",
    loopClosing: "Mêmes données main-d'œuvre. Intelligence composée.",

    pillarsEyebrow: "CE QUI EXPÉDIE AUJOURD'HUI",
    pillarsTitle: "Six surfaces. Un seul substrat opérationnel.",
    pillarsDescription: "Chaque page Crew est au standard profondeur-5 ou sur le backlog de refonte tracé publiquement. Pas d'écrans démo uniquement.",
    pillars: [
      { title: "Planification", body: "AI Builder compose le planning depuis prévision demande, mix de rôles et éligibilité — puis le manager édite les quatre modes (vue d'ensemble, par personne, par service, par rôle). Récurrence, contrôles d'éligibilité, alertes conflits, jours fériés.", chips: ["AI Builder", "4 modes", "Demande-adapté", "Récurrence"] },
      { title: "Temps & Présence", body: "PWA mobile pour pointage avec géo-fence et biométrie WebAuthn. Pauses, flux pointage manqué, approbation manager. Scores de confiance live alimentant Workforce Health.", chips: ["PWA mobile", "Géo-fence", "Biométrie", "Scores"] },
      { title: "Moteur de paie", body: "Moteur de calcul neutre. Multi-régions — États-Unis, Canada, Royaume-Uni, Union européenne, GCC. Exports statutaires (NACHA, EFT, HMRC RTI, SEPA, WPS) et formulaires fin d'année par juridiction. Aperçu expliqué par IA, accumulation gratuity, encaissement congés, règlement final. Pack-driven, pas hardcodé — les mises à jour annuelles sont des modifications de pack.", chips: ["Multi-régions", "Exports statutaires", "Formulaires fin d'année", "Assist IA"] },
      { title: "Hire-to-Retire", body: "Chaque étape du cycle de vie main-d'œuvre au même endroit. Recrutement, background checks, onboarding, performance, compensation, 9-box talents, mobilité interne, recommandations, formation, compétences, attestations, helpdesk SLA, disciplinaire, alertes anonymes, dépenses, prêts, pools pourboires, offboarding, gratuity, règlement final.", chips: ["Onboarding", "Performance", "9-box", "Offboarding"] },
      { title: "Crew Coach + Decision Replay", body: "Crew Coach est votre partenaire IA sur le domaine main-d'œuvre — requêtes en langage naturel, réponses sourcées, recommandations qu'un manager peut défendre. Decision Replay journalise chaque action : qui décide, quoi change, ce que dit le modèle. Prêt audit par défaut.", chips: ["Assistant IA", "Sourcé", "Replay log", "Prêt audit"] },
      { title: "Builders Workflow + Approvals", body: "No-code pour chaînes d'approbation et workflows multi-étapes. Conscient du span-of-control depuis l'org tree. Vue carte-photo avec réassignation + aperçu cascade.", chips: ["No-code", "Org-aware", "Cascade", "Audit trail"] },
    ],

    coverageLabel: "Inclus dans chaque déploiement Crew",
    coverageItems: [
      { title: "Portail mobile employé", body: "Chaque employé obtient un compte Sundae gratuit — voir shifts, demander congés, swap, bulletins, attestations, pointage biométrique." },
      { title: "Communications", body: "Briefings avec picker d'audience topologique, fil d'équipe, kudos, sondages, registre de canaux." },
      { title: "Documents & e-sign", body: "Stockage de documents, flux de signature électronique, evidence packs, suivi de credentials." },
      { title: "Intégrations & adapters", body: "Adapters BYO-HR (Bayzat, Personio, Pento, Gusto, BambooHR), sync POS, packs jours fériés, Partner-SDK." },
      { title: "Org tree & permissions", body: "Vue carte-photo, réassignation avec cascade, tiers : Propriétaire / Admin RH / Manager / Employé." },
      { title: "Admin & gouvernance", body: "SSO, feed d'audit, RBAC, console de facturation, imports & édition en masse, multi-site." },
    ],

    payrollEyebrow: "PAIE MULTI-RÉGIONS",
    payrollTitle: "Un moteur. Toutes les juridictions.",
    payrollDescription: "Neutre fournisseur. Pack-driven. Chaque taux statutaire est une règle versionnée et sourcée — non hardcodée — donc les mises à jour annuelles sont des modifications de pack, pas de réécritures.",
    payrollClusters: [
      { flags: ["🇺🇸"], region: "États-Unis", depth: "Fédéral + chaque état + DC + PR + grandes villes", hooks: ["FICA", "FUTA", "SUTA", "SDI", "NACHA", "W-2", "1099"] },
      { flags: ["🇨🇦"], region: "Canada", depth: "Fédéral + chaque province et territoire", hooks: ["CPP", "CPP2", "EI", "QPP", "QPIP", "EFT", "T4", "RL-1", "ROE"] },
      { flags: ["🇬🇧"], region: "Royaume-Uni", depth: "Angleterre, Pays de Galles, Irlande du Nord + Écosse", hooks: ["PAYE", "NI", "Auto-enrolment", "HMRC RTI", "P60", "P11D"] },
      { flags: ["🇪🇺"], region: "Union européenne", depth: "Les 27 états membres", hooks: ["Lohnsteuer", "IRPF", "URSSAF", "Loonheffing", "USC", "SEPA", "DSN", "Modelo 190"] },
      { flags: ["🇦🇪", "🇸🇦", "🇶🇦", "🇧🇭", "🇴🇲", "🇰🇼"], region: "GCC", depth: "UAE · KSA · Qatar · Bahreïn · Oman · Koweït", hooks: ["WPS", "GOSI", "GPSSA", "PIFSS", "SIO", "Gratuity", "Encaissement congés"] },
    ],
    payrollExportsLabel: "Exports statutaires",
    payrollExportsItems: ["NACHA", "EFT 005", "HMRC RTI", "SEPA", "WPS SIF"],
    payrollFormsLabel: "Formulaires fin d'année",
    payrollFormsItems: ["W-2", "T4", "P60", "P11D", "Lohnsteuerbescheinigung", "jaaropgaaf", "DSN", "Modelo 190", "GOSI annuel"],
    payrollGuaranteesLabel: "Garanties moteur",
    payrollGuaranteesItems: ["Pack-driven", "Règles versionnées", "Sources citées par taux", "Aperçu expliqué par IA"],
    payrollRoadmapLabel: "Sur la roadmap",
    payrollRoadmapItems: ["Amérique latine", "APAC", "Couverture régionale étendue"],
    payrollClosing: "BYO-paie ? Crew exporte fichiers propres et pilote APIs partenaires (Bayzat MEA, Personio EU, Pento UK, Gusto US).",

    modulesEyebrow: "MODULES",
    modulesTitle: "Trois modules. Un bundle. Portail gratuit pour chaque employé.",
    modulesDescription: "Achetez ce dont vous avez besoin. La remise bundle s'applique automatiquement quand les trois sont attachés.",
    modules: [
      { name: "Crew Operations", tagline: "Personnes, planning, dossiers RH.", included: ["Planning + AI Builder", "60+ surfaces RH", "Onboarding → offboarding", "Org tree + permissions", "Builders workflow + approvals"] },
      { name: "Crew T&A", tagline: "Pointage, présence, variance.", included: ["Pointage PWA mobile", "Géo-fence + biométrie", "Pauses", "Variance + scores", "Approbations manager"] },
      { name: "Crew Payroll", tagline: "Moteur de calcul multi-régions.", included: ["Moteur neutre fournisseur", "Packs multi-régions", "NACHA · EFT · HMRC RTI · SEPA · WPS", "Formulaires fin d'année par juridiction", "Gratuity + règlement final"] },
    ],
    bundleLabel: "Crew Operating Suite",
    bundleDescription: "La remise bundle s'applique automatiquement quand les trois modules sont attachés.",
    freeTierLabel: "Gratuit pour chaque employé",
    freeTierDescription: "Chaque employé Crew obtient un compte Sundae self-service gratuit — voir shifts, demander congés, voir bulletins, pointer. Identité main-d'œuvre bottom-up, incluse.",

    personasEyebrow: "QUI PILOTE CREW",
    personasTitle: "Conçu pour les gens qui font tourner le sol.",
    personasDescription: "Quatre rôles. Quatre vues scopées. Une seule source de vérité.",
    personas: [
      { title: "Responsable RH", outcome: "Hire-to-retire dans une plateforme — onboarding, performance, talents, paie-ready, offboarding — alimentant Labor Intelligence dans le même souffle.", metric: "60+ surfaces RH" },
      { title: "Manager opérations", outcome: "Planifier pour la demande, pas pour la semaine passée. AI Builder, assignation éligibilité, marketplace de swap, queue d'actions manager.", metric: "Plannings IA" },
      { title: "Admin paie", outcome: "Clore la paie sans exports manuels. Moteur multi-régions — États-Unis, Canada, Royaume-Uni, Union européenne, GCC. Exports statutaires et formulaires fin d'année intégrés. Assist IA pour ajustements et cas limites.", metric: "US · CA · UK · EU · GCC" },
      { title: "Employés", outcome: "Portail Sundae self-service gratuit. Voir shifts, demander congés, swap, voir bulletin, attester policies, pointer via PWA mobile biométrique.", metric: "Gratuit · toujours" },
    ],

    byohrEyebrow: "DÉJÀ SUR BAYZAT, PERSONIO OU GUSTO ?",
    byohrTitle: "Crew est optionnel. La boucle d'intelligence non.",
    byohrDescription: "BYO-HR. Le contrat de domaine RH canonique de Sundae lit depuis tout adapter conforme — et Labor Intelligence reste 5–10× plus riche que les concurrents qui ne voient que le POS.",
    byohrItems: ["Bayzat (hospitality MEA)", "Personio (EU)", "Pento / Onfolk (UK)", "Gusto / Rippling (US)", "BambooHR (adapter canonique)", "Exports RH POS-natifs"],

    ctaEyebrow: "GÉREZ VOS GENS. ALIMENTEZ VOTRE INTELLIGENCE.",
    ctaTitle: "Voyez ce qui change quand la boucle se ferme.",
    ctaDescription: "30 minutes. Votre opération. On parcourt Crew + comment chaque événement main-d'œuvre re-façonne Labor Intelligence dans vos dashboards live.",
    ctaPrimary: "Réserver une visite Crew",
    ctaSecondary: "Voir la plateforme Sundae",
  },
  es: {
    badge: "CREW · SUSTRATO OPERATIVO",
    heroLine1: "Cada turno",
    heroLine2: "se vuelve señal.",
    description: "Crew opera tu personal, horarios, tiempo y nómina. Cada acción se vuelve dato operativo que alimenta la inteligencia de decisión de Sundae — un bucle que ningún proveedor de RR.HH. o nómina por sí solo puede cerrar.",
    primaryCta: "Reservar recorrido Crew",
    secondaryCta: "Ver Crew en acción",

    loopEyebrow: "POR QUÉ CREW VIVE EN SUNDAE",
    loopTitle: "La capa operativa que alimenta la capa de inteligencia.",
    loopDescription: "Los proveedores de RR.HH. por sí solos ven horarios. Las analíticas por sí solas ven POS. Sundae cierra el bucle — y el bucle es el foso.",
    loopLeftLabel: "RR.HH. / nómina por separado",
    loopLeftBody: "Posee horarios, horas, nómina. Los reportes se detienen en la fuerza laboral. Margen, contexto de demanda, calidad de decisión — no es su trabajo.",
    loopRightLabel: "Crew dentro de Sundae",
    loopRightBody: "Cada turno, hora, swap, attestation y ciclo de nómina es señal. Labor Intelligence lo lee. Pulse lo alerta. Foresight lo proyecta. La plataforma entera se vuelve más afilada.",
    loopClosing: "Los mismos datos. Inteligencia compuesta.",

    pillarsEyebrow: "LO QUE SE ENVÍA HOY",
    pillarsTitle: "Seis superficies. Un sustrato operativo.",
    pillarsDescription: "Cada página de Crew está en estándar profundidad-5 o en el backlog de reconstrucción rastreado públicamente. Sin pantallas solo-demo.",
    pillars: [
      { title: "Horarios", body: "AI Builder compone el horario desde pronóstico de demanda, mix de roles y elegibilidad — luego el manager edita los cuatro modos (vista general, por persona, por turno, por rol). Recurrencia, verificación elegibilidad, alertas conflicto, festivos.", chips: ["AI Builder", "4 modos", "Demanda-ajustado", "Recurrencia"] },
      { title: "Tiempo y Asistencia", body: "PWA móvil para fichar con geo-cerca y biometría WebAuthn. Descansos, flujo de fichaje perdido, aprobación manager. Scores de confianza en vivo alimentando Workforce Health.", chips: ["PWA móvil", "Geo-cerca", "Biometría", "Scores"] },
      { title: "Motor de nómina", body: "Motor de cálculo neutral. Multi-región — Estados Unidos, Canadá, Reino Unido, Unión Europea, GCC. Exportes estatutarios (NACHA, EFT, HMRC RTI, SEPA, WPS) y formularios de fin de año por jurisdicción. Vista previa explicada por IA, acumulación gratuity, encaje vacaciones, liquidación final. Driven por paquetes, no hardcodeado — actualizaciones anuales son ediciones de paquete.", chips: ["Multi-región", "Exportes estatutarios", "Formularios fin de año", "Asist IA"] },
      { title: "Hire-to-Retire", body: "Cada etapa del ciclo de vida de la fuerza laboral en un solo lugar. Reclutamiento, background checks, onboarding, performance, compensación, talento 9-box, movilidad interna, referidos, formación, habilidades, attestations, helpdesk con SLA, disciplinarios, denuncias anónimas, gastos, préstamos, pools de propinas, offboarding, gratuity, liquidación final.", chips: ["Onboarding", "Performance", "9-box", "Offboarding"] },
      { title: "Crew Coach + Decision Replay", body: "Crew Coach es tu socio IA en el dominio de fuerza laboral — solicitudes en lenguaje natural, respuestas con fuente, recomendaciones que un manager puede defender. Decision Replay registra cada acción: quién decide, qué cambia, qué dijo el modelo. Listo para auditoría por defecto.", chips: ["Asistente IA", "Con fuente", "Registro replay", "Auditable"] },
      { title: "Builders Workflow + Aprobaciones", body: "Builders no-code para cadenas de aprobación y workflows multi-paso. Conciencia de span-of-control desde el org tree. Vista tarjeta-foto con reasignación + preview cascada.", chips: ["No-code", "Org-aware", "Cascada", "Audit trail"] },
    ],

    coverageLabel: "Incluido en cada despliegue de Crew",
    coverageItems: [
      { title: "Portal móvil para empleados", body: "Cada empleado recibe una cuenta Sundae gratis — ver turnos, pedir vacaciones, swap, nóminas, attestations, fichaje biométrico." },
      { title: "Comunicaciones", body: "Briefings con selector de audiencia topológico, feed de equipo, kudos, encuestas, registro de canales." },
      { title: "Documentos y e-sign", body: "Almacenamiento de documentos, flujo de firma electrónica, evidence packs, seguimiento de credenciales." },
      { title: "Integraciones y adapters", body: "Adapters BYO-HR (Bayzat, Personio, Pento, Gusto, BambooHR), sync POS, paquetes de festivos, Partner-SDK." },
      { title: "Org tree y permisos", body: "Vista tarjeta-foto, reasignación con cascada, niveles: Propietario / Admin RR.HH. / Manager / Empleado." },
      { title: "Admin y gobierno", body: "SSO, feed de auditoría, RBAC, consola de facturación, importes y edición masiva, multi-local." },
    ],

    payrollEyebrow: "NÓMINA MULTI-REGIÓN",
    payrollTitle: "Un motor. Cada jurisdicción.",
    payrollDescription: "Neutral. Driven por paquetes. Cada tasa estatutaria es una regla versionada y con fuente citada — no hardcodeada — así que las actualizaciones anuales son ediciones de paquete, no reescrituras.",
    payrollClusters: [
      { flags: ["🇺🇸"], region: "Estados Unidos", depth: "Federal + cada estado + DC + PR + ciudades principales", hooks: ["FICA", "FUTA", "SUTA", "SDI", "NACHA", "W-2", "1099"] },
      { flags: ["🇨🇦"], region: "Canadá", depth: "Federal + cada provincia y territorio", hooks: ["CPP", "CPP2", "EI", "QPP", "QPIP", "EFT", "T4", "RL-1", "ROE"] },
      { flags: ["🇬🇧"], region: "Reino Unido", depth: "Inglaterra, Gales, Irlanda del Norte + Escocia", hooks: ["PAYE", "NI", "Auto-enrolment", "HMRC RTI", "P60", "P11D"] },
      { flags: ["🇪🇺"], region: "Unión Europea", depth: "Los 27 estados miembros", hooks: ["Lohnsteuer", "IRPF", "URSSAF", "Loonheffing", "USC", "SEPA", "DSN", "Modelo 190"] },
      { flags: ["🇦🇪", "🇸🇦", "🇶🇦", "🇧🇭", "🇴🇲", "🇰🇼"], region: "GCC", depth: "UAE · KSA · Qatar · Baréin · Omán · Kuwait", hooks: ["WPS", "GOSI", "GPSSA", "PIFSS", "SIO", "Gratuity", "Encaje vacaciones"] },
    ],
    payrollExportsLabel: "Exportes estatutarios",
    payrollExportsItems: ["NACHA", "EFT 005", "HMRC RTI", "SEPA", "WPS SIF"],
    payrollFormsLabel: "Formularios fin de año",
    payrollFormsItems: ["W-2", "T4", "P60", "P11D", "Lohnsteuerbescheinigung", "jaaropgaaf", "DSN", "Modelo 190", "GOSI anual"],
    payrollGuaranteesLabel: "Garantías del motor",
    payrollGuaranteesItems: ["Driven por paquetes", "Reglas versionadas", "Fuentes citadas por tasa", "Vista previa explicada por IA"],
    payrollRoadmapLabel: "En la roadmap",
    payrollRoadmapItems: ["América Latina", "APAC", "Cobertura regional ampliada"],
    payrollClosing: "¿BYO-nómina? Crew exporta archivos limpios y maneja APIs partners (Bayzat MEA, Personio EU, Pento UK, Gusto US).",

    modulesEyebrow: "MÓDULOS",
    modulesTitle: "Tres módulos. Un bundle. Portal gratis para cada empleado.",
    modulesDescription: "Compra lo que necesitas. El descuento bundle aplica automáticamente cuando los tres están conectados.",
    modules: [
      { name: "Crew Operations", tagline: "Personal, horarios, registros RR.HH.", included: ["Horarios + AI Builder", "60+ superficies RR.HH.", "Onboarding → offboarding", "Org tree + permisos", "Builders workflow + aprobaciones"] },
      { name: "Crew T&A", tagline: "Fichar, asistencia, varianza.", included: ["Fichar PWA móvil", "Geo-cerca + biometría", "Descansos", "Varianza + scores", "Aprobaciones manager"] },
      { name: "Crew Payroll", tagline: "Motor de cálculo multi-región.", included: ["Motor neutral", "Paquetes multi-región", "NACHA · EFT · HMRC RTI · SEPA · WPS", "Formularios fin de año por jurisdicción", "Gratuity + liquidación final"] },
    ],
    bundleLabel: "Crew Operating Suite",
    bundleDescription: "El descuento bundle aplica automáticamente cuando los tres módulos están conectados.",
    freeTierLabel: "Gratis para cada empleado",
    freeTierDescription: "Cada empleado Crew obtiene cuenta Sundae self-service gratis — ver turnos, pedir vacaciones, ver nómina, fichar. Identidad de fuerza laboral bottom-up, incluida.",

    personasEyebrow: "QUIÉN OPERA CREW",
    personasTitle: "Construido para quienes realmente operan el piso.",
    personasDescription: "Cuatro roles. Cuatro vistas scopeadas. Una fuente de verdad.",
    personas: [
      { title: "Líder RR.HH.", outcome: "Hire-to-retire en una plataforma — onboarding, performance, talento, ready de nómina, offboarding — alimentando Labor Intelligence en el mismo aliento.", metric: "60+ superficies RR.HH." },
      { title: "Manager operaciones", outcome: "Programar para la demanda, no para la semana pasada. AI Builder, asignación con elegibilidad, marketplace de swap, cola de acciones manager.", metric: "Horarios IA" },
      { title: "Admin nómina", outcome: "Cerrar nómina sin exportes manuales. Motor multi-región — Estados Unidos, Canadá, Reino Unido, Unión Europea, GCC. Exportes estatutarios y formularios fin de año integrados. Asist IA para ajustes y casos límite.", metric: "US · CA · UK · EU · GCC" },
      { title: "Empleados", outcome: "Portal Sundae self-service gratis. Ver turno, pedir vacaciones, swap, ver nómina, attest policies, fichar vía PWA móvil biométrico.", metric: "Gratis · siempre" },
    ],

    byohrEyebrow: "¿YA EN BAYZAT, PERSONIO O GUSTO?",
    byohrTitle: "Crew es opcional. El bucle de inteligencia no.",
    byohrDescription: "BYO-HR. El contrato de dominio RR.HH. canónico de Sundae lee desde cualquier adapter compatible — y Labor Intelligence sigue siendo 5–10× más rica que los competidores que solo ven POS.",
    byohrItems: ["Bayzat (hospitality MEA)", "Personio (EU)", "Pento / Onfolk (UK)", "Gusto / Rippling (US)", "BambooHR (adapter canónico)", "Exportes RR.HH. POS-nativos"],

    ctaEyebrow: "OPERA TU GENTE. ENERGIZA TU INTELIGENCIA.",
    ctaTitle: "Ve qué cambia cuando se cierra el bucle.",
    ctaDescription: "30 minutos. Tu operación. Recorremos Crew + cómo cada evento de fuerza laboral reconfigura Labor Intelligence en tus dashboards en vivo.",
    ctaPrimary: "Reservar recorrido Crew",
    ctaSecondary: "Ver plataforma Sundae",
  },
};

export default function CrewPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--navy-deep)] overflow-x-hidden">
        {/* ════════════════════════════════════════════════
            HERO — split column with Crew dashboard mockup
        ════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,71,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid-texture" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-white/[0.03]" className="left-[-10%] top-[15%]" />
            <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-white/[0.02]" className="right-[-5%] top-[60%]" />
            <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-white/[0.025]" className="left-[5%] bottom-[10%]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-[rgba(28,71,255,0.12)] border border-[rgba(28,71,255,0.2)] text-[#60A5FA]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
                  {copy.badge}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="hero-h1 mb-6 text-balance">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{copy.heroLine1}</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-white to-[#93C5FD]">{copy.heroLine2}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="body-xl max-w-xl mb-8">
                {copy.description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
                <Link href="/demo"><Button variant="primary" size="lg">{copy.primaryCta}</Button></Link>
                <a href={REPORT_APP_URL}><Button variant="outline-light" size="lg">{copy.secondaryCta}</Button></a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} className="lg:pl-4" style={{ perspective: "1200px" }}>
              <motion.div initial={{ rotateX: 6 }} animate={{ rotateX: 1.5 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                <CrewDashboardMockup />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            THE LOOP — strategic framing
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-mesh" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-4">{copy.loopEyebrow}</p>
              <h2 className="section-h2 text-balance mb-5">{copy.loopTitle}</h2>
              <p className="body-lg max-w-2xl mx-auto">{copy.loopDescription}</p>
            </FadeUp>

            <div className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-5 sm:gap-6 max-w-5xl mx-auto items-stretch">
              <div className="rounded-2xl p-6 sm:p-7 bg-[var(--surface-subtle)] border border-[var(--border-default)]">
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">{copy.loopLeftLabel}</div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{copy.loopLeftBody}</p>
              </div>
              <div className="hidden md:flex items-center justify-center px-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C47FF] to-[#3B82F6] flex items-center justify-center shadow-[0_0_30px_rgba(28,71,255,0.4)]">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>
                </div>
              </div>
              <div className="rounded-2xl p-6 sm:p-7 border border-[var(--electric-blue)]/30 bg-gradient-to-br from-[var(--electric-blue)]/[0.10] to-[var(--electric-blue)]/[0.02] shadow-[0_0_40px_rgba(28,71,255,0.10)]">
                <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-3">{copy.loopRightLabel}</div>
                <p className="text-sm text-[var(--text-primary)] font-medium leading-relaxed">{copy.loopRightBody}</p>
              </div>
            </div>

            <p className="mt-12 text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light max-w-2xl mx-auto">
              {copy.loopClosing}
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PILLARS — 6 feature surfaces
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.04),transparent_60%)]" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-4">{copy.pillarsEyebrow}</p>
              <h2 className="section-h2 text-balance mb-5">{copy.pillarsTitle}</h2>
              <p className="body-lg max-w-2xl mx-auto">{copy.pillarsDescription}</p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {copy.pillars.map((p, i) => (
                <StaggerItem key={i}>
                  <div className="group h-full p-6 rounded-2xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(28,71,255,0.25)] hover:shadow-[0_0_30px_rgba(28,71,255,0.08)] transition-all duration-300">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${featurePillars[i].accent} flex items-center justify-center text-white shadow-lg mb-5`}>
                      <SundaeIcon name={featurePillars[i].icon} size="md" className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 leading-snug">{p.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{p.body}</p>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                      {p.chips.map((chip) => (
                        <span key={chip} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--electric-blue)]/15 text-[#60A5FA] border border-[var(--electric-blue)]/25">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* COVERAGE STRIP — what else ships with every Crew deployment */}
            <FadeUp delay={0.2} className="mt-12 max-w-6xl mx-auto">
              <div className="rounded-2xl p-6 sm:p-7 bg-white/[0.025] border border-[var(--border-default)]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] font-semibold mb-5 text-center">
                  + {copy.coverageLabel}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {copy.coverageItems.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                      <div>
                        <div className="text-sm font-semibold text-[var(--text-primary)] mb-1 leading-snug">{item.title}</div>
                        <div className="text-[12px] text-[var(--text-muted)] leading-snug">{item.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PAYROLL MOAT — multi-region clusters + capability strips
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.05),transparent_60%)]" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-4">{copy.payrollEyebrow}</p>
              <h2 className="section-h2 text-balance mb-5">{copy.payrollTitle}</h2>
              <p className="body-lg max-w-2xl mx-auto">{copy.payrollDescription}</p>
            </FadeUp>

            {/* Regional clusters — one row per region */}
            <div className="space-y-3 max-w-6xl mx-auto mb-10">
              {copy.payrollClusters.map((cluster, i) => (
                <motion.div
                  key={cluster.region}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-5 sm:p-6 bg-[var(--surface-subtle)] border border-[var(--border-default)] hover:border-[rgba(34,197,94,0.25)] hover:shadow-[0_0_30px_rgba(34,197,94,0.06)] transition-all duration-300"
                >
                  <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_minmax(0,1.3fr)_minmax(0,2.2fr)] gap-3 sm:gap-5 items-center">
                    <div className="flex flex-wrap gap-1 max-w-[120px] sm:max-w-none leading-none">
                      {cluster.flags.map((flag, j) => (
                        <span key={j} className={cluster.flags.length === 1 ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}>{flag}</span>
                      ))}
                    </div>
                    <div className="min-w-0 col-span-2 sm:col-span-1">
                      <div className="text-base font-bold text-[var(--text-primary)] mb-1 leading-snug">{cluster.region}</div>
                      <div className="text-[12px] text-[var(--text-muted)] leading-snug">{cluster.depth}</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:justify-end col-span-2 sm:col-span-1">
                      {cluster.hooks.map((hook) => (
                        <span key={hook} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#22C55E]/12 text-[#22C55E] border border-[#22C55E]/25">
                          {hook}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Three capability strips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
              {[
                { label: copy.payrollExportsLabel, items: copy.payrollExportsItems },
                { label: copy.payrollFormsLabel, items: copy.payrollFormsItems },
                { label: copy.payrollGuaranteesLabel, items: copy.payrollGuaranteesItems },
              ].map((strip) => (
                <div key={strip.label} className="rounded-xl p-5 bg-white/[0.03] border border-[var(--border-default)]">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#60A5FA] mb-3">{strip.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {strip.items.map((item) => (
                      <span key={item} className="text-[11px] font-medium px-2 py-1 rounded-md bg-white/[0.04] text-[var(--text-secondary)] border border-white/[0.06]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Roadmap strip — single row, modest */}
            <div className="max-w-3xl mx-auto rounded-xl p-4 border border-[var(--electric-blue)]/20 bg-[var(--electric-blue)]/[0.04]">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <div className="text-[10px] uppercase tracking-wider font-bold text-[#60A5FA] flex-shrink-0 sm:pt-0.5">{copy.payrollRoadmapLabel}</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {copy.payrollRoadmapItems.map((item) => (
                    <span key={item} className="text-[12px] text-[var(--text-secondary)] leading-snug">
                      <span className="text-[#60A5FA] mr-1.5 font-mono">→</span>{item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-12 text-center text-sm sm:text-base text-[var(--text-muted)] max-w-3xl mx-auto italic">
              {copy.payrollClosing}
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            MODULES — purchasable + bundle + free portal
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-mesh" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-4">{copy.modulesEyebrow}</p>
              <h2 className="section-h2 text-balance mb-5">{copy.modulesTitle}</h2>
              <p className="body-lg max-w-2xl mx-auto">{copy.modulesDescription}</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-10">
              {copy.modules.map((m, i) => (
                <div key={m.name} className="rounded-2xl p-6 sm:p-7 bg-white/[0.03] border border-[var(--border-default)] hover:border-[rgba(28,71,255,0.25)] transition-colors duration-300">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${moduleAccents[i]} flex items-center justify-center text-white shadow-lg mb-4`}>
                    <span className="text-sm font-bold">{(i + 1).toString().padStart(2, "0")}</span>
                  </div>
                  <div className="text-base font-bold text-[var(--text-primary)] mb-1">{m.name}</div>
                  <p className="text-[13px] text-[var(--text-secondary)] mb-4 font-medium">{m.tagline}</p>
                  <ul className="space-y-1.5">
                    {m.included.map((inc) => (
                      <li key={inc} className="flex items-start gap-2">
                        <svg className="w-3.5 h-3.5 text-[#60A5FA] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                        <span className="text-[12px] text-[var(--text-muted)] leading-snug">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bundle + Free portal — side by side */}
            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              <div className="rounded-2xl p-5 sm:p-6 border border-[var(--electric-blue)]/30 bg-gradient-to-br from-[var(--electric-blue)]/[0.10] to-[var(--electric-blue)]/[0.02] shadow-[0_0_30px_rgba(28,71,255,0.10)]">
                <div className="text-[10px] uppercase tracking-wider text-[#60A5FA] font-bold mb-2">★ {copy.bundleLabel}</div>
                <p className="text-sm text-[var(--text-primary)] leading-snug">{copy.bundleDescription}</p>
              </div>
              <div className="rounded-2xl p-5 sm:p-6 border border-[#22C55E]/30 bg-gradient-to-br from-[#22C55E]/[0.08] to-[#22C55E]/[0.02]">
                <div className="text-[10px] uppercase tracking-wider text-[#22C55E] font-bold mb-2">⊕ {copy.freeTierLabel}</div>
                <p className="text-sm text-[var(--text-primary)] leading-snug">{copy.freeTierDescription}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PERSONAS
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.04),transparent_60%)]" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-4">{copy.personasEyebrow}</p>
              <h2 className="section-h2 text-balance mb-5">{copy.personasTitle}</h2>
              <p className="body-lg max-w-2xl mx-auto">{copy.personasDescription}</p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {copy.personas.map((p, i) => (
                <StaggerItem key={i}>
                  <div className="h-full p-6 rounded-2xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-white/[0.12] transition-all duration-300">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 leading-snug">{p.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">{p.outcome}</p>
                    <div className="pt-3 border-t border-white/[0.06]">
                      <span className="text-[11px] uppercase tracking-wider text-[#60A5FA] font-bold">{p.metric}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            BYO-HR — Crew is optional
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.04),transparent_60%)]" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <FadeUp className="text-center max-w-3xl mx-auto mb-12">
              <p className="eyebrow mb-4">{copy.byohrEyebrow}</p>
              <h2 className="section-h2 text-balance mb-5">{copy.byohrTitle}</h2>
              <p className="body-lg max-w-2xl mx-auto">{copy.byohrDescription}</p>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {copy.byohrItems.map((item) => (
                <div key={item} className="text-center p-4 rounded-xl bg-white/[0.025] border border-[var(--border-default)]">
                  <span className="text-[13px] text-[var(--text-secondary)] font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CLOSING CTA
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grad-deep">
          <div className="absolute inset-0 bg-grid-texture" />
          <ElegantShape delay={0} width={400} height={100} rotate={-12} gradient="from-white/[0.03]" className="left-[-8%] top-[20%]" />
          <ElegantShape delay={0.2} width={300} height={80} rotate={15} gradient="from-white/[0.02]" className="right-[-5%] bottom-[10%]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.06),transparent_70%)]" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <FadeUp>
              <p className="eyebrow mb-4">{copy.ctaEyebrow}</p>
              <h2 className="section-h2 mb-4">{copy.ctaTitle}</h2>
              <p className="body-lg mb-10 max-w-xl mx-auto">{copy.ctaDescription}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo"><Button variant="cta" size="lg">{copy.ctaPrimary}</Button></Link>
                <Link href="/"><Button variant="outline-light" size="lg">{copy.ctaSecondary}</Button></Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
