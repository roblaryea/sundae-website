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

const countryFlags = ["🇦🇪", "🇸🇦", "🇶🇦", "🇧🇭", "🇴🇲", "🇰🇼"];

/* ─── i18n copy ─── */

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
  payrollCountriesLabel: string;
  payrollCountriesNames: string[];
  payrollStatutoryLabel: string;
  payrollStatutoryItems: string[];
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
      { title: "Payroll Engine", body: "Provider-neutral calculation engine. Six GCC country packs legally validated. Statutory exports (UAE WPS, GOSI, PIFSS, GPSSA, SIO), gratuity accrual, leave encashment, final settlement. AI assist for adjustments. Not a tax engine — a parameterized pack-driven engine.", chips: ["6 GCC packs", "WPS export", "Gratuity", "AI assist"] },
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

    payrollEyebrow: "GCC PAYROLL · SHIPPED + LEGALLY VALIDATED",
    payrollTitle: "Six country packs. One calculation engine.",
    payrollDescription: "Provider-neutral. Pack-driven. Legally validated. Each pack is a versioned, parameterized rule set — not hardcoded — so annual statutory updates are pack edits, not code rewrites.",
    payrollCountriesLabel: "Shipped country packs",
    payrollCountriesNames: ["UAE", "Saudi Arabia", "Qatar", "Bahrain", "Oman", "Kuwait"],
    payrollStatutoryLabel: "Statutory components",
    payrollStatutoryItems: ["WPS export (UAE)", "GOSI · KSA", "GPSSA · UAE", "PIFSS · Kuwait", "SIO · Bahrain + Oman", "Gratuity · all packs", "Leave encashment", "Final settlement"],
    payrollRoadmapLabel: "On the roadmap",
    payrollRoadmapItems: ["UK · PAYE RTI", "US · federal + first state (FLSA)", "Framework supports all ISO-3166 countries — new pack = author + validate, not rewrite the engine."],
    payrollClosing: "BYO-payroll? Crew exports clean files and drives partner APIs (Bayzat MEA, Personio EU, Pento UK, Gusto US).",

    modulesEyebrow: "MODULES",
    modulesTitle: "Three modules. One bundle. Free portal for every employee.",
    modulesDescription: "Buy what you need. Bundle discount applies automatically when all three are attached.",
    modules: [
      { name: "Crew Operations", tagline: "People, scheduling, HR records.", included: ["Scheduling + AI Builder", "60+ HR surfaces", "Onboarding → offboarding", "Org tree + permissions", "Workflow + approvals builders"] },
      { name: "Crew T&A", tagline: "Clock-in, attendance, variance.", included: ["Mobile PWA clock-in", "Geo-fence + biometric", "Break tracking", "Variance + trust scores", "Manager approvals"] },
      { name: "Crew Payroll", tagline: "Calculation engine + 6 GCC packs.", included: ["Provider-neutral engine", "6 legally-validated packs", "WPS · GOSI · PIFSS · SIO", "Gratuity + final settlement", "Statutory exports + AI assist"] },
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
      { title: "Payroll Admin", outcome: "Close payroll without manual exports. WPS-ready. GOSI-ready. Final-settlement workflows for offboarding. AI assist for adjustments and edge cases.", metric: "WPS · GOSI · PIFSS · SIO" },
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
      { title: "محرك الرواتب", body: "محرك حساب محايد. ست حزم دول خليجية موثقة قانونياً. تصديرات قانونية (WPS الإمارات، GOSI، PIFSS، GPSSA، SIO)، استحقاق المكافأة، استبدال الإجازات، التسوية النهائية. مساعد AI للتعديلات.", chips: ["6 حزم خليجية", "تصدير WPS", "مكافأة", "مساعد AI"] },
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

    payrollEyebrow: "رواتب الخليج · مُشحنة + موثقة قانونياً",
    payrollTitle: "ست حزم دول. محرك حساب واحد.",
    payrollDescription: "محايد. مدفوع بحزم. موثق قانونياً. كل حزمة مجموعة قواعد ذات إصدارات ومعاملات — لا كود مُشفّر — فالتحديثات السنوية تعديل حزمة لا إعادة كتابة.",
    payrollCountriesLabel: "حزم الدول المُشحنة",
    payrollCountriesNames: ["الإمارات", "السعودية", "قطر", "البحرين", "عُمان", "الكويت"],
    payrollStatutoryLabel: "المكونات القانونية",
    payrollStatutoryItems: ["تصدير WPS (الإمارات)", "GOSI · السعودية", "GPSSA · الإمارات", "PIFSS · الكويت", "SIO · البحرين + عُمان", "مكافأة · كل الحزم", "استبدال الإجازات", "التسوية النهائية"],
    payrollRoadmapLabel: "على خارطة الطريق",
    payrollRoadmapItems: ["UK · PAYE RTI", "US · فيدرالي + ولاية أولى (FLSA)", "الإطار يدعم كل دول ISO-3166 — حزمة جديدة = تأليف + توثيق، لا إعادة كتابة المحرك."],
    payrollClosing: "تجلب رواتبك؟ Crew يصدّر ملفات نظيفة ويشغّل APIs الشركاء (Bayzat، Personio، Pento، Gusto).",

    modulesEyebrow: "الوحدات",
    modulesTitle: "ثلاث وحدات. حزمة واحدة. بوابة مجانية لكل موظف.",
    modulesDescription: "اشترِ ما تحتاج. خصم الحزمة يُطبق آلياً عند ضم الثلاثة.",
    modules: [
      { name: "Crew Operations", tagline: "موظفون، جدولة، سجلات HR.", included: ["جدولة + AI Builder", "+60 واجهة HR", "تعيين → إنهاء", "شجرة منظمة + صلاحيات", "منشئو الموافقات وسير العمل"] },
      { name: "Crew T&A", tagline: "تسجيل، حضور، تباين.", included: ["PWA جوال للتسجيل", "Geo-fence + بيومتري", "تتبع الاستراحات", "تباين + درجات ثقة", "موافقات المدير"] },
      { name: "Crew Payroll", tagline: "محرك حساب + 6 حزم خليجية.", included: ["محرك محايد", "6 حزم موثقة", "WPS · GOSI · PIFSS · SIO", "مكافأة + تسوية نهائية", "تصديرات قانونية + مساعد AI"] },
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
      { title: "مسؤول الرواتب", outcome: "أقفل الرواتب بلا تصديرات يدوية. WPS جاهز. GOSI جاهز. سير عمل تسوية نهائية. مساعد AI للتعديلات والحالات الحرجة.", metric: "WPS · GOSI · PIFSS · SIO" },
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
      { title: "Moteur de paie", body: "Moteur de calcul neutre. Six packs pays GCC validés juridiquement. Exports statutaires (WPS UAE, GOSI, PIFSS, GPSSA, SIO), accumulation gratuity, encaissement congés, règlement final. Assist IA pour ajustements.", chips: ["6 packs GCC", "Export WPS", "Gratuity", "Assist IA"] },
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

    payrollEyebrow: "PAIE GCC · EXPÉDIÉ + VALIDÉ JURIDIQUEMENT",
    payrollTitle: "Six packs pays. Un seul moteur de calcul.",
    payrollDescription: "Neutre fournisseur. Pack-driven. Validé juridiquement. Chaque pack est un ensemble de règles paramétré et versionné — non hardcodé — donc les mises à jour annuelles sont des modifications de pack, pas de réécritures.",
    payrollCountriesLabel: "Packs pays expédiés",
    payrollCountriesNames: ["UAE", "Arabie saoudite", "Qatar", "Bahreïn", "Oman", "Koweït"],
    payrollStatutoryLabel: "Composants statutaires",
    payrollStatutoryItems: ["Export WPS (UAE)", "GOSI · KSA", "GPSSA · UAE", "PIFSS · Koweït", "SIO · Bahreïn + Oman", "Gratuity · tous packs", "Encaissement congés", "Règlement final"],
    payrollRoadmapLabel: "Sur la roadmap",
    payrollRoadmapItems: ["UK · PAYE RTI", "US · fédéral + premier état (FLSA)", "Le framework supporte tous les pays ISO-3166 — nouveau pack = écrire + valider, pas réécrire le moteur."],
    payrollClosing: "BYO-paie ? Crew exporte fichiers propres et pilote APIs partenaires (Bayzat MEA, Personio EU, Pento UK, Gusto US).",

    modulesEyebrow: "MODULES",
    modulesTitle: "Trois modules. Un bundle. Portail gratuit pour chaque employé.",
    modulesDescription: "Achetez ce dont vous avez besoin. La remise bundle s'applique automatiquement quand les trois sont attachés.",
    modules: [
      { name: "Crew Operations", tagline: "Personnes, planning, dossiers RH.", included: ["Planning + AI Builder", "60+ surfaces RH", "Onboarding → offboarding", "Org tree + permissions", "Builders workflow + approvals"] },
      { name: "Crew T&A", tagline: "Pointage, présence, variance.", included: ["Pointage PWA mobile", "Géo-fence + biométrie", "Pauses", "Variance + scores", "Approbations manager"] },
      { name: "Crew Payroll", tagline: "Moteur de calcul + 6 packs GCC.", included: ["Moteur neutre fournisseur", "6 packs validés", "WPS · GOSI · PIFSS · SIO", "Gratuity + règlement final", "Exports + assist IA"] },
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
      { title: "Admin paie", outcome: "Clore la paie sans exports manuels. WPS-ready. GOSI-ready. Workflows règlement final. Assist IA pour ajustements et cas limites.", metric: "WPS · GOSI · PIFSS · SIO" },
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
      { title: "Motor de nómina", body: "Motor de cálculo neutral. Seis paquetes país GCC validados legalmente. Exportes estatutarios (WPS UAE, GOSI, PIFSS, GPSSA, SIO), acumulación gratuity, encaje vacaciones, liquidación final. Asistente IA.", chips: ["6 paquetes GCC", "Export WPS", "Gratuity", "Asist IA"] },
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

    payrollEyebrow: "NÓMINA GCC · ENVIADO + VALIDADO LEGALMENTE",
    payrollTitle: "Seis paquetes país. Un motor de cálculo.",
    payrollDescription: "Neutral. Driven por paquetes. Validado legalmente. Cada paquete es un conjunto de reglas parametrizado y versionado — no hardcodeado — así que las actualizaciones anuales son ediciones de paquete, no reescrituras.",
    payrollCountriesLabel: "Paquetes país enviados",
    payrollCountriesNames: ["UAE", "Arabia Saudí", "Qatar", "Baréin", "Omán", "Kuwait"],
    payrollStatutoryLabel: "Componentes estatutarios",
    payrollStatutoryItems: ["Exporte WPS (UAE)", "GOSI · KSA", "GPSSA · UAE", "PIFSS · Kuwait", "SIO · Baréin + Omán", "Gratuity · todos los packs", "Encaje vacaciones", "Liquidación final"],
    payrollRoadmapLabel: "En la roadmap",
    payrollRoadmapItems: ["UK · PAYE RTI", "US · federal + primer estado (FLSA)", "El framework soporta todos los países ISO-3166 — nuevo paquete = escribir + validar, no reescribir el motor."],
    payrollClosing: "¿BYO-nómina? Crew exporta archivos limpios y maneja APIs partners (Bayzat MEA, Personio EU, Pento UK, Gusto US).",

    modulesEyebrow: "MÓDULOS",
    modulesTitle: "Tres módulos. Un bundle. Portal gratis para cada empleado.",
    modulesDescription: "Compra lo que necesitas. El descuento bundle aplica automáticamente cuando los tres están conectados.",
    modules: [
      { name: "Crew Operations", tagline: "Personal, horarios, registros RR.HH.", included: ["Horarios + AI Builder", "60+ superficies RR.HH.", "Onboarding → offboarding", "Org tree + permisos", "Builders workflow + aprobaciones"] },
      { name: "Crew T&A", tagline: "Fichar, asistencia, varianza.", included: ["Fichar PWA móvil", "Geo-cerca + biometría", "Descansos", "Varianza + scores", "Aprobaciones manager"] },
      { name: "Crew Payroll", tagline: "Motor de cálculo + 6 paquetes GCC.", included: ["Motor neutral", "6 paquetes validados", "WPS · GOSI · PIFSS · SIO", "Gratuity + liquidación final", "Exportes + asist IA"] },
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
      { title: "Admin nómina", outcome: "Cerrar nómina sin exportes manuales. WPS-ready. GOSI-ready. Workflows de liquidación final. Asist IA para ajustes y casos límite.", metric: "WPS · GOSI · PIFSS · SIO" },
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
            PAYROLL MOAT — GCC country packs
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.05),transparent_60%)]" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-4">{copy.payrollEyebrow}</p>
              <h2 className="section-h2 text-balance mb-5">{copy.payrollTitle}</h2>
              <p className="body-lg max-w-2xl mx-auto">{copy.payrollDescription}</p>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
              <div className="rounded-2xl p-6 sm:p-7 bg-[var(--surface-subtle)] border border-[var(--border-default)]">
                <div className="text-[11px] uppercase tracking-wider text-[#22C55E] font-bold mb-4">{copy.payrollCountriesLabel}</div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {countryFlags.map((flag, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-white/[0.03] border border-[var(--border-default)]">
                      <div className="text-2xl mb-1">{flag}</div>
                      <div className="text-[11px] text-[var(--text-supporting)] font-medium leading-tight">{copy.payrollCountriesNames[i]}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">{copy.payrollStatutoryLabel}</div>
                <ul className="space-y-1.5">
                  {copy.payrollStatutoryItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                      <span className="text-[13px] text-[var(--text-secondary)] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-6 sm:p-7 border border-[var(--electric-blue)]/30 bg-gradient-to-br from-[var(--electric-blue)]/[0.08] to-[var(--electric-blue)]/[0.02]">
                <div className="text-[11px] uppercase tracking-wider text-[#60A5FA] font-bold mb-4">{copy.payrollRoadmapLabel}</div>
                <ul className="space-y-3">
                  {copy.payrollRoadmapItems.map((item, i) => (
                    <li key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="text-[#60A5FA] mr-2 font-mono">→</span>{item}
                    </li>
                  ))}
                </ul>
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
