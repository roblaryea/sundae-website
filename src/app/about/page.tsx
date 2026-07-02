import type { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { CreamBreak } from "@/components/ui/CreamBreak";
import { resolveWebsiteLocale, type WebsiteLocale } from "@/lib/i18n";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_about_page'
import { aboutCreamCopy } from './aboutCreamCopy'

const aboutCopy = {
  en: {
    metadataTitle: "About Sundae - The Decision Intelligence Platform for Restaurants",
    metadataDescription: "Sundae unifies 12+ data sources into a single intelligence layer for multi-unit restaurant groups. Built by operators who lived the problem. Active across 3 countries.",
    badge: "About Sundae",
    title: 'The Intelligence Layer Restaurants Never Had',
    description: "Restaurant data usually lives in a dozen disconnected systems. Sundae pulls that operating picture into one place so teams can make decisions with current numbers, market context, and forward-looking signals.",
    stats: [
      { value: "6", label: "Platform Pillars" },
      { value: "12", label: "Intelligence Modules" },
      { value: "12", label: "Data Domains" },
      { value: "3", label: "Countries Active" },
    ],
    builtTitle: "What We've Built",
    builtDescription: "Six connected layers that help operators move from real-time pacing to 90-day forecasts without jumping between systems.",
    missionTitle: "Why Sundae Exists",
    missionDescription: "Multi-unit restaurant operators run complex, high-volume businesses across dozens of disconnected systems. The result: million-dollar decisions made on gut feel, margin leakage invisible until it's too late, and zero market context for benchmarking performance.",
    missionSupport: "We built Sundae because we lived the problem. Our founder scaled restaurant concepts past $10M in annual revenue and kept running into the same issue: too many systems, too little decision clarity.",
    missionSteps: [
      { title: "Unify 12+ Data Sources", description: "POS, labor, inventory, delivery, reservations, purchasing, marketing - one intelligent layer instead of twelve tabs." },
      { title: "Benchmark Against the Market", description: "Is your 31% food cost good or bad? Without peer context, you have no idea. Sundae adds competitive and market intelligence to every metric." },
      { title: "Decide with Confidence", description: "Real-time intelligence, AI-powered recommendations, and predictive forecasts - so every decision is informed, not guessed." },
    ],
    teamTitle: "Built by Operators Who Lived the Problem",
    teamDescription: "Our team brings 60+ years across restaurants, technology, and data. We did not study this problem from the sidelines. We ran operations, scaled concepts, and dealt with the same reporting gaps operators face every week.",
    strengthsTitle: "Team Strengths",
    journeyTitle: "The Sundae Journey",
    journeyDescription: "The company grew out of operator pain, then into a platform used across multiple markets.",
    valuesTitle: "What We Stand For",
    valuesDescription: "Principles that shape product decisions and show up in how we build.",
    presenceTitle: "Where Sundae shows up",
    presenceDescription: "Built across continents, operating where it counts. Active commercial coverage today, with a clear expansion path into the world's busiest hospitality regions.",
    ctaTitle: "See What Unified Intelligence Looks Like",
    ctaDescription: "30 minutes to review your data together and see where Sundae could be genuinely useful.",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "We're Hiring",
    ctaHome: "Back to Home",
    builtCoreLabel: "Decision Intelligence",
    builtCrewLabel: "Operational Suite - Sundae Crew",
    pillars: ["Pulse", "Benchmarks", "Watchtower", "Insights", "Intelligence", "Foresight"],
    pillarsSubtitle: ["Real-Time Operations", "Competitive Intelligence", "Market Intelligence", "12 Analytics Modules", "Conversational AI", "Predictive Intelligence"],
    crewPillars: ["Scheduling", "Time & Attendance", "Payroll", "People & HR", "People Intelligence"],
    crewPillarsSubtitle: ["Demand-aware shift planning", "Clock-in, geofence, timesheets", "Multi-region payroll readiness", "Hire-to-retire records", "Workforce analytics"],
    leadership: [
      { name: "Robert Laryea", role: "Founder & CEO", location: "Dubai", image: "/team/robert-laryea.jpg", bullets: ["Scaled multi-unit restaurant concepts from zero to $10M+ annual revenue", "Saw first-hand how fragmented data costs operators millions in margin leakage", "20+ years leading transformation programs across consulting and F&B", "Built Sundae to give restaurant groups the operating intelligence he wished they had earlier"] },
      { name: "Mark Curfs", role: "Strategic Operating Partner", location: "GCC & Europe", image: "/team/mark-curfs.jpg", bullets: ["Senior operator depth and F&B commercial relationships at the table from day one", "Interim C-level and board-adjacent counsel to multi-unit hospitality operators across the GCC and Europe", "Opens enterprise doors and pressure-tests Pulse, Insights and Foresight against what F&B leadership actually needs", "Principal of Curfs Consult, partnering with founders on go-to-market, fundraise and scale"] },
    ],
    milestones: [
      { year: "2025", title: "Sundae Founded", description: "Built from direct operator pain - fragmented data costing multi-unit groups millions in invisible margin loss." },
      { year: "2025", title: "First Deployments", description: "Partnered with multi-brand restaurant groups across the UAE. Real data, real operators, real decisions from day one." },
      { year: "2026", title: "12 Modules Live", description: "Revenue, labor, inventory, delivery, reservations, purchasing, marketing, and profit intelligence - all unified across 12 operational domains." },
      { year: "2026", title: "GCC & North America", description: "Enterprise hospitality groups adopting Sundae platform-wide across UAE, KSA, Qatar, and North America." },
      { year: "2027+", title: "Global Expansion", description: "Scaling into Europe and Asia Pacific. Enterprise intelligence for multi-country restaurant brands." },
    ],
    values: [
      { title: "Operators First", description: "Every feature exists because an operator needed it. We don't build for demos - we build for shifts.", proof: "Built by a team that scaled restaurants to $10M+ before writing a line of code.", icon: "owners" },
      { title: "Intelligence First", description: "Scattered data is expensive. We turn 12 systems into one intelligent layer that actually drives decisions.", proof: "12 modules across 12 operational domains - from revenue to reservations.", icon: "insights" },
      { title: "Real-Time Decisions", description: "Weekly reports cost you money. The operators who win are the ones who see problems while they can still fix them.", proof: "Pulse refreshes every 5 minutes across every location.", icon: "speed" },
      { title: "Raise the Standard", description: "We want restaurant teams to expect more from their data stack than another static dashboard.", proof: "Active across 3 countries with enterprise groups adopting platform-wide.", icon: "growth" },
    ],
    presenceSubheadings: {
      active: "Active markets",
      expanding: "Expansion markets",
    },
    presenceFootnote: "Active markets include physical operations (Amsterdam, Dubai) and the company's legal home (United States · Delaware C-Corp). North America (New York, Toronto) and other expansion markets are strategic priorities on the roadmap; engagement begins from existing hubs.",
    regions: [
      { region: "Amsterdam",     countries: "Europe hub",      label: "Active",      tier: "active" },
      { region: "Dubai",         countries: "MEA hub",         label: "Active",      tier: "active" },
      { region: "United States", countries: "Delaware C-Corp", label: "Active",      tier: "active" },
      { region: "New York",      countries: "North America",   label: "Coming soon", tier: "expanding" },
      { region: "Toronto",       countries: "North America",   label: "Coming soon", tier: "expanding" },
      { region: "Singapore",     countries: "APAC",            label: "Coming soon", tier: "expanding" },
      { region: "Tokyo",         countries: "APAC",            label: "Coming soon", tier: "expanding" },
      { region: "Mexico City",   countries: "LATAM",           label: "Coming soon", tier: "expanding" },
      { region: "São Paulo",     countries: "LATAM",           label: "Coming soon", tier: "expanding" },
    ],
  },
  ar: {
    metadataTitle: "حول Sundae - منصة ذكاء القرار للمطاعم",
    metadataDescription: "توحّد Sundae أكثر من 12 مصدر بيانات في منصة قرار واحدة لمجموعات المطاعم متعددة الفروع. بُنيت على يد مشغلين عاشوا المشكلة. نشطة في 3 دول.",
    badge: "حول Sundae",
    title: <>منصة قرار موحدة<br />للمطاعم متعددة الفروع</>,
    description: "بياناتك موزعة عبر أكثر من 12 نظامًا منفصلًا، بينما يتخذ فريقك قرارات كبيرة كل يوم. تجمع Sundae هذه الصورة في مكان واحد حتى تعتمد القرارات على بيانات لحظية وسياق سوقي وتوقعات أوضح.",
    stats: [
      { value: "6", label: "دعائم المنصة" },
      { value: "12", label: "وحدات الذكاء" },
      { value: "12", label: "مجالات البيانات" },
      { value: "3", label: "دول نشطة" },
    ],
    builtTitle: "ما الذي بنيناه",
    builtDescription: "ست طبقات مترابطة تنظّم البيانات اليومية وتحوّلها إلى رؤية عملية، من متابعة الأداء اللحظي إلى توقعات التسعين يومًا.",
    missionTitle: "لماذا وُجدت Sundae",
    missionDescription: "يشغّل مشغلو المطاعم متعددة الفروع أعمالًا معقدة وعالية الحجم عبر عشرات الأنظمة المنفصلة. النتيجة: قرارات بملايين الدولارات مبنية على الحدس، وتسرب في الهوامش لا يظهر إلا متأخرًا، وغياب للسياق السوقي للمقارنة.",
    missionSupport: "بنينا Sundae لأننا عشنا هذه الفوضى من الداخل. وسّع مؤسسنا مفاهيم مطاعم إلى أكثر من 10 ملايين دولار سنويًا، ورأى النمط نفسه يتكرر: فرق تعمل وسط صوامع بيانات كثيرة ومن دون طريقة موحدة لاتخاذ القرار.",
    missionSteps: [
      { title: "توحيد 12+ مصدر بيانات", description: "نقطة البيع، العمالة، المخزون، التوصيل، الحجوزات، المشتريات، التسويق - طبقة ذكية واحدة بدلًا من 12 تبويبًا." },
      { title: "المقارنة مع السوق", description: "هل تكلفة الطعام لديك 31% جيدة أم سيئة؟ من دون سياق النظراء لا يمكن معرفة ذلك. تضيف Sundae ذكاءً تنافسيًا وسوقيًا لكل مقياس." },
      { title: "اتخاذ القرار بثقة", description: "ذكاء لحظي، توصيات مدعومة بالذكاء الاصطناعي، وتوقعات تنبؤية - حتى يكون كل قرار مبنيًا على بيانات، لا على التخمين." },
    ],
    teamTitle: "بنى المنصة مشغلون عاشوا المشكلة",
    teamDescription: "أكثر من 60 سنة من الخبرة المجمعة في المطاعم والتقنية والبيانات. لم ندرس المشكلة من الخارج - بل شغلنا المطاعم، ووسعنا المفاهيم، واصطدمنا بنفس الجدران التي يواجهها كل مشغل.",
    strengthsTitle: "نقاط قوة الفريق",
    journeyTitle: "رحلة Sundae",
    journeyDescription: "من ألم المشغل إلى المنصة. من سوق واحد إلى ثلاث دول. من صفر وحدات إلى ثلاثين.",
    valuesTitle: "ما الذي نمثّله",
    valuesDescription: "مبادئ تشكّل كل قرار منتج - ومدعومة بالطريقة التي نبني بها فعليًا.",
    presenceTitle: "أماكن عملنا",
    presenceDescription: "نشطون في الشرق الأوسط وأمريكا الشمالية. ونتوسع في أسواق الضيافة العالمية الكبرى.",
    ctaTitle: "شاهد كيف يبدو الذكاء الموحد",
    ctaDescription: "نجلس مع بياناتك لمدة 30 دقيقة لنرى معًا أين يمكن أن تساعدك Sundae فعليًا.",
    ctaPrimary: "احجز عرضًا",
    ctaSecondary: "نحن نوظف",
    ctaHome: "العودة إلى الرئيسية",
    builtCoreLabel: "ذكاء القرار",
    builtCrewLabel: "الجناح التشغيلي - Sundae Crew",
    pillars: ["Pulse", "Benchmarks", "Watchtower", "Insights", "Intelligence", "Foresight"],
    pillarsSubtitle: ["عمليات لحظية", "ذكاء تنافسي", "ذكاء سوقي", "12 وحدة تحليل", "ذكاء محادثي", "ذكاء تنبؤي"],
    crewPillars: ["الجدولة", "الحضور والانصراف", "الرواتب", "الأفراد والموارد البشرية", "ذكاء الأفراد"],
    crewPillarsSubtitle: ["تخطيط ورديات مدرك للطلب", "تسجيل الحضور والسياج الجغرافي والجداول الزمنية", "جاهزية رواتب متعددة الدول", "سجلات من التوظيف حتى نهاية الخدمة", "تحليلات القوى العاملة"],
    leadership: [
      { name: "Robert Laryea", role: "المؤسس والرئيس التنفيذي", location: "دبي", image: "/team/robert-laryea.jpg", bullets: ["وسّع مفاهيم مطاعم متعددة الفروع من الصفر إلى أكثر من 10 ملايين دولار سنويًا", "رأى كيف تكلف البيانات المجزأة المشغلين ملايين في خسائر هامشية غير مرئية", "أكثر من 20 سنة في برامج التحول العالمية عبر الاستشارات والمأكولات والمشروبات", "بنى Sundae ليمنح مجموعات المطاعم نظام قرار موحدًا كان ينقصها في التشغيل اليومي"] },
      { name: "Mark Curfs", role: "شريك تشغيلي استراتيجي", location: "GCC وأوروبا", image: "/team/mark-curfs.jpg", bullets: ["عمق خبرة تشغيلية رفيعة وعلاقات تجارية في قطاع الأطعمة والمشروبات حاضرة منذ اليوم الأول", "مشورة بمستوى تنفيذي مؤقت وقريبة من مجالس الإدارة لمشغّلي الضيافة متعددي الفروع عبر الخليج وأوروبا", "يفتح أبواب المؤسسات الكبرى ويختبر Pulse وInsights وForesight مقابل ما تحتاجه قيادة الأطعمة والمشروبات فعليًا", "مؤسس Curfs Consult، يعمل مع المؤسسين على دخول السوق وجمع التمويل والتوسع"] },
    ],
    milestones: [
      { year: "2025", title: "تأسيس Sundae", description: "ولدت من ألم مباشر للمشغلين - بيانات مجزأة تكلف المجموعات متعددة الفروع ملايين في خسائر هامشية خفية." },
      { year: "2025", title: "أول عمليات النشر", description: "شراكات مع مجموعات مطاعم متعددة العلامات في الإمارات. بيانات حقيقية ومشغلون حقيقيون وقرارات حقيقية منذ اليوم الأول." },
      { year: "2026", title: "أكثر من 30 وحدة نشطة", description: "ذكاء الإيرادات والعمالة والمخزون والتوصيل والحجوزات والمشتريات والتسويق والربح - كلها موحدة عبر 12 مجالًا تشغيليًا." },
      { year: "2026", title: "الخليج وأمريكا الشمالية", description: "مجموعات ضيافة مؤسسية تعتمد Sundae على مستوى المنصة في الإمارات والسعودية وقطر وأمريكا الشمالية." },
      { year: "2027+", title: "توسع عالمي", description: "التمدد إلى أوروبا وآسيا والمحيط الهادئ. ذكاء مؤسسي لعلامات المطاعم متعددة الدول." },
    ],
    values: [
      { title: "المشغل أولاً", description: "كل ميزة موجودة لأن مشغلًا احتاجها. نحن لا نبني للعروض - نحن نبني للورديات.", proof: "فريق وسّع المطاعم إلى أكثر من 10 ملايين دولار قبل أن يكتب سطرًا واحدًا من الكود.", icon: "owners" },
      { title: "الذكاء أولاً", description: "البيانات المبعثرة مكلفة. نحول 12 نظامًا إلى طبقة ذكية واحدة تدفع القرار فعلًا.", proof: "أكثر من 30 وحدة عبر 12 مجالًا تشغيليًا - من الإيرادات إلى الحجوزات.", icon: "insights" },
      { title: "قرارات لحظية", description: "التقارير الأسبوعية تكلفك مالًا. الفائزون هم من يرون المشاكل قبل أن يصبح إصلاحها مكلفًا.", proof: "Pulse يتحدث كل 5 دقائق عبر كل موقع.", icon: "speed" },
      { title: "رفع المستوى", description: "نضع معيارًا جديدًا لكيف تتخذ مجموعات المطاعم قراراتها التشغيلية حول العالم.", proof: "نشطون في 3 دول مع اعتماد مؤسسي على مستوى المنصة.", icon: "growth" },
    ],
    presenceSubheadings: {
      active: "الأسواق النشطة",
      expanding: "أسواق التوسّع",
    },
    presenceFootnote: "تشمل الأسواق النشطة عمليات فعلية على الأرض (أمستردام، دبي) والموطن القانوني للشركة (الولايات المتحدة · شركة ديلاوير). تمثّل أمريكا الشمالية (نيويورك، تورونتو) وأسواق التوسّع الأخرى أولويات استراتيجية على خارطة الطريق؛ ويبدأ التواصل انطلاقًا من المراكز القائمة.",
    regions: [
      { region: "أمستردام",         countries: "مركز أوروبا",          label: "نشط",   tier: "active" },
      { region: "دبي",              countries: "مركز الشرق الأوسط وأفريقيا", label: "نشط",   tier: "active" },
      { region: "الولايات المتحدة", countries: "شركة ديلاوير",         label: "نشط",   tier: "active" },
      { region: "نيويورك",          countries: "أمريكا الشمالية",      label: "قريبًا", tier: "expanding" },
      { region: "تورونتو",          countries: "أمريكا الشمالية",      label: "قريبًا", tier: "expanding" },
      { region: "سنغافورة",         countries: "آسيا والمحيط الهادئ",  label: "قريبًا", tier: "expanding" },
      { region: "طوكيو",            countries: "آسيا والمحيط الهادئ",  label: "قريبًا", tier: "expanding" },
      { region: "مكسيكو سيتي",      countries: "أمريكا اللاتينية",     label: "قريبًا", tier: "expanding" },
      { region: "ساو باولو",        countries: "أمريكا اللاتينية",     label: "قريبًا", tier: "expanding" },
    ],
  },
  fr: {
    metadataTitle: "À propos de Sundae - La plateforme d'intelligence décisionnelle pour les restaurants",
    metadataDescription: "Sundae unifie plus de 12 sources de données dans une plateforme de décision pour les groupes multi-sites. Construit par des opérateurs qui ont vécu le problème. Actif dans 3 pays.",
    badge: "À propos de Sundae",
    title: <>Une plateforme de décision<br />unifiée pour les restaurants</>,
    description: "Vos données vivent dans plus de 12 systèmes déconnectés, alors que vos équipes prennent des décisions importantes tous les jours. Sundae remet cette vue au même endroit pour que chaque décision s'appuie sur des données temps réel, du contexte marché et une lecture plus claire de la suite.",
    stats: [
      { value: "6", label: "Piliers de la plateforme" },
      { value: "12", label: "Modules d'intelligence" },
      { value: "12", label: "Domaines de données" },
      { value: "3", label: "Pays actifs" },
    ],
    builtTitle: "Ce que nous avons construit",
    builtDescription: "Six couches reliées entre elles pour transformer les données du quotidien en lecture exploitable, du pacing en temps réel jusqu'aux prévisions à 90 jours.",
    missionTitle: "Pourquoi Sundae existe",
    missionDescription: "Les opérateurs multi-sites gèrent des activités complexes et volumineuses à travers des dizaines de systèmes déconnectés. Résultat: des décisions à plusieurs millions prises à l'intuition, des fuites de marge invisibles trop longtemps et aucun contexte marché pour benchmarker.",
    missionSupport: "Nous avons construit Sundae parce que nous avons vécu cette réalité sur le terrain. Notre fondateur a développé des concepts restaurant au-delà de 10 M$ de revenus annuels et a retrouvé le même blocage partout : trop de silos de données, pas assez de clarté pour décider vite et bien.",
    missionSteps: [
      { title: "Unifier 12+ sources", description: "POS, main-d'oeuvre, stock, livraison, réservations, achats, marketing - une couche intelligente au lieu de douze onglets." },
      { title: "Benchmarker le marché", description: "Votre coût matière à 31% est-il bon ou mauvais ? Sans contexte pair, impossible à savoir. Sundae ajoute l'intelligence concurrentielle à chaque métrique." },
      { title: "Décider avec confiance", description: "Intelligence temps réel, recommandations IA et prévisions - pour décider avec des données, pas au hasard." },
    ],
    teamTitle: "Construit par des opérateurs qui ont vécu le problème",
    teamDescription: "Plus de 60 ans d'expérience cumulée en restauration, technologie et données. Nous n'avons pas étudié le problème de l'extérieur - nous avons dirigé les restaurants, développé les concepts et rencontré les mêmes murs que tous les opérateurs.",
    strengthsTitle: "Forces de l'équipe",
    journeyTitle: "Le parcours Sundae",
    journeyDescription: "De la douleur opérateur à la plateforme. D'un marché à trois pays. De zéro module à trente.",
    valuesTitle: "Ce que nous défendons",
    valuesDescription: "Des principes qui guident chaque décision produit - appuyés par notre façon de construire.",
    presenceTitle: "Où nous opérons",
    presenceDescription: "Actifs au Moyen-Orient et en Amérique du Nord. Expansion vers les grands marchés mondiaux de l'hospitalité.",
    ctaTitle: "Voyez à quoi ressemble une intelligence unifiée",
    ctaDescription: "Trente minutes pour regarder vos données ensemble et voir où Sundae peut vraiment aider.",
    ctaPrimary: "Reserver une demo",
    ctaSecondary: "Nous recrutons",
    ctaHome: "Retour à l'accueil",
    builtCoreLabel: "Intelligence décisionnelle",
    builtCrewLabel: "Suite opérationnelle - Sundae Crew",
    pillars: ["Pulse", "Benchmarks", "Watchtower", "Insights", "Intelligence", "Foresight"],
    pillarsSubtitle: ["Opérations temps réel", "Intelligence concurrentielle", "Intelligence marché", "12 modules analytiques", "IA conversationnelle", "Intelligence prédictive"],
    crewPillars: ["Planning", "Temps & présence", "Paie", "RH & personnel", "People Intelligence"],
    crewPillarsSubtitle: ["Planning des équipes selon la demande", "Pointage, géorepérage, feuilles de temps", "Préparation de paie multi-pays", "Dossiers de l'embauche au départ", "Analytique RH"],
    leadership: [
      { name: "Robert Laryea", role: "Fondateur & CEO", location: "Dubaï", image: "/team/robert-laryea.jpg", bullets: ["A développé des concepts restaurant multi-sites de zéro à plus de 10 M$ de revenus annuels", "A constaté combien les données fragmentées coûtent aux opérateurs en marge invisible", "20+ ans à diriger des programmes de transformation mondiaux en conseil et F&B", "A créé Sundae pour donner aux groupes restaurant un système de décision unifié qui manquait dans l'exploitation quotidienne"] },
      { name: "Mark Curfs", role: "Partenaire opérationnel stratégique", location: "GCC & Europe", image: "/team/mark-curfs.jpg", bullets: ["Une expertise d'opérateur senior et des relations commerciales F&B autour de la table dès le premier jour", "Conseil de niveau C par intérim et proche des conseils d'administration pour les opérateurs d'hospitalité multi-sites à travers le GCC et l'Europe", "Ouvre les portes des grands comptes et met Pulse, Insights et Foresight à l'épreuve de ce dont les dirigeants F&B ont réellement besoin", "Dirigeant de Curfs Consult, accompagnant les fondateurs sur le go-to-market, la levée de fonds et la mise à l'échelle"] },
    ],
    milestones: [
      { year: "2025", title: "Fondation de Sundae", description: "Née d'une douleur opérateur directe - des données fragmentées coûtant des millions en marge invisible." },
      { year: "2025", title: "Premiers déploiements", description: "Partenariats avec des groupes multi-marques aux Émirats arabes unis. Vraies données, vrais opérateurs, vraies décisions dès le premier jour." },
      { year: "2026", title: "12 modules en ligne", description: "Intelligence revenus, main-d'oeuvre, stock, livraison, réservations, achats, marketing et profit - unifiée sur 12 domaines." },
      { year: "2026", title: "GCC et Amérique du Nord", description: "Des groupes hospitality adoptent Sundae à l'échelle plateforme aux Émirats, en KSA, au Qatar et en Amérique du Nord." },
      { year: "2027+", title: "Expansion mondiale", description: "Expansion vers l'Europe et l'Asie-Pacifique. Intelligence enterprise pour marques multi-pays." },
    ],
    values: [
      { title: "Opérateurs d'abord", description: "Chaque fonctionnalité existe parce qu'un opérateur en avait besoin. Nous ne construisons pas pour les démos - nous construisons pour les services.", proof: "Construit par une équipe qui a porté des restaurants à plus de 10 M$ avant d'écrire une ligne de code.", icon: "owners" },
      { title: "Intelligence d'abord", description: "Les données dispersées coûtent cher. Nous transformons 12 systèmes en une couche intelligente qui aide vraiment à décider.", proof: "12 modules sur 12 domaines opérationnels - du revenu aux réservations.", icon: "insights" },
      { title: "Décisions temps réel", description: "Les rapports hebdomadaires vous coûtent de l'argent. Les opérateurs qui gagnent voient les problèmes à temps pour les corriger.", proof: "Pulse se rafraîchit toutes les 5 minutes sur chaque site.", icon: "speed" },
      { title: "Relever le standard", description: "Nous définissons la référence de la décision opérationnelle pour les groupes restaurant du monde entier.", proof: "Actifs dans 3 pays avec des groupes enterprise qui adoptent la plateforme.", icon: "growth" },
    ],
    presenceSubheadings: {
      active: "Marchés actifs",
      expanding: "Marchés en expansion",
    },
    presenceFootnote: "Les marchés actifs comprennent des opérations physiques (Amsterdam, Dubaï) et le siège légal de l'entreprise (États-Unis · Delaware C-Corp). L'Amérique du Nord (New York, Toronto) et les autres marchés en expansion sont des priorités stratégiques de la feuille de route ; l'engagement démarre depuis les hubs existants.",
    regions: [
      { region: "Amsterdam",      countries: "Hub Europe",     label: "Actif",              tier: "active" },
      { region: "Dubaï",          countries: "Hub MEA",        label: "Actif",              tier: "active" },
      { region: "États-Unis",     countries: "Delaware C-Corp", label: "Actif",             tier: "active" },
      { region: "New York",       countries: "Amérique du Nord", label: "Bientôt disponible", tier: "expanding" },
      { region: "Toronto",        countries: "Amérique du Nord", label: "Bientôt disponible", tier: "expanding" },
      { region: "Singapour",      countries: "APAC",           label: "Bientôt disponible", tier: "expanding" },
      { region: "Tokyo",          countries: "APAC",           label: "Bientôt disponible", tier: "expanding" },
      { region: "Mexico",         countries: "LATAM",          label: "Bientôt disponible", tier: "expanding" },
      { region: "São Paulo",      countries: "LATAM",          label: "Bientôt disponible", tier: "expanding" },
    ],
  },
  es: {
    metadataTitle: "Acerca de Sundae - La plataforma de inteligencia de decisiones para restaurantes",
    metadataDescription: "Sundae unifica más de 12 fuentes de datos en una plataforma de decisiones para grupos multilocal. Construida por operadores que vivieron el problema. Activa en 3 países.",
    badge: "Acerca de Sundae",
    title: <>Una plataforma de decisiones<br />unificada para restaurantes</>,
    description: "Tus datos viven en más de 12 sistemas desconectados y tu equipo toma decisiones importantes todos los días. Sundae reúne esa visión en un solo lugar para que cada decisión se apoye en datos en tiempo real, contexto de mercado y una lectura más clara de lo que viene.",
    stats: [
      { value: "6", label: "Pilares de la plataforma" },
      { value: "12", label: "Módulos de inteligencia" },
      { value: "12", label: "Dominios de datos" },
      { value: "3", label: "Países activos" },
    ],
    builtTitle: "Lo que hemos construido",
    builtDescription: "Seis capas conectadas entre sí para convertir los datos del día a día en una lectura útil, desde el pacing en tiempo real hasta previsiones a 90 días.",
    missionTitle: "Por qué existe Sundae",
    missionDescription: "Los operadores multi-local gestionan negocios complejos y de alto volumen a través de decenas de sistemas desconectados. El resultado: decisiones de millones tomadas por intuición, fugas de margen invisibles hasta que es tarde y cero contexto de mercado para comparar rendimiento.",
    missionSupport: "Construimos Sundae porque vivimos este problema desde dentro. Nuestro fundador llevó conceptos de restaurante a más de 10 M$ de ingresos anuales y vio el mismo patrón una y otra vez: demasiados silos de datos y muy poca claridad para decidir rápido y bien.",
    missionSteps: [
      { title: "Unificar 12+ fuentes", description: "POS, personal, inventario, delivery, reservas, compras, marketing - una capa inteligente en lugar de doce pestañas." },
      { title: "Comparar con el mercado", description: "¿Tu coste de comida del 31% es bueno o malo? Sin contexto de pares no lo sabes. Sundae añade inteligencia competitiva a cada métrica." },
      { title: "Decidir con confianza", description: "Inteligencia en tiempo real, recomendaciones con IA y previsiones - para que cada decisión se base en datos, no en suposiciones." },
    ],
    teamTitle: "Construido por operadores que vivieron el problema",
    teamDescription: "Más de 60 años de experiencia combinada en restaurantes, tecnología y datos. No estudiamos el problema desde fuera - dirigimos restaurantes, escalamos conceptos y golpeamos las mismas paredes que todos los operadores.",
    strengthsTitle: "Fortalezas del equipo",
    journeyTitle: "El recorrido de Sundae",
    journeyDescription: "Del dolor del operador a la plataforma. De un mercado a tres países. De cero módulos a treinta.",
    valuesTitle: "Lo que defendemos",
    valuesDescription: "Principios que moldean cada decisión de producto - respaldados por cómo construimos de verdad.",
    presenceTitle: "Dónde operamos",
    presenceDescription: "Activos en Oriente Medio y Norteamérica. Expansión hacia los grandes mercados globales de hospitalidad.",
    ctaTitle: "Mira cómo se ve la inteligencia unificada",
    ctaDescription: "Treinta minutos para revisar tus datos contigo y ver dónde Sundae puede ayudar de verdad.",
    ctaPrimary: "Reservar una demo",
    ctaSecondary: "Estamos contratando",
    ctaHome: "Volver al inicio",
    builtCoreLabel: "Inteligencia de decisiones",
    builtCrewLabel: "Suite operativa - Sundae Crew",
    pillars: ["Pulse", "Benchmarks", "Watchtower", "Insights", "Intelligence", "Foresight"],
    pillarsSubtitle: ["Operaciones en tiempo real", "Inteligencia competitiva", "Inteligencia de mercado", "12 módulos analíticos", "IA conversacional", "Inteligencia predictiva"],
    crewPillars: ["Turnos", "Tiempo y asistencia", "Nómina", "Personal y RR. HH.", "People Intelligence"],
    crewPillarsSubtitle: ["Planificación de turnos según demanda", "Fichaje, geovalla, hojas de horas", "Preparación de nómina multipaís", "Registros de principio a fin", "Analítica de personal"],
    leadership: [
      { name: "Robert Laryea", role: "Fundador y CEO", location: "Dubái", image: "/team/robert-laryea.jpg", bullets: ["Escaló conceptos de restaurantes multilocal desde cero hasta más de 10 M$ en ingresos anuales", "Vio cómo los datos fragmentados cuestan a los operadores millones en fuga de margen", "Más de 20 años liderando programas de transformación global en consultoría y F&B", "Creó Sundae para dar a los grupos de restaurantes un sistema de decisiones unificado que faltaba en la operación diaria"] },
      { name: "Mark Curfs", role: "Socio operativo estratégico", location: "GCC y Europa", image: "/team/mark-curfs.jpg", bullets: ["Profundidad de operador sénior y relaciones comerciales de F&B en la mesa desde el primer día", "Asesoría interina de nivel C y cercana al consejo para operadores de hostelería multilocal en el GCC y Europa", "Abre puertas en grandes cuentas y pone a prueba Pulse, Insights y Foresight frente a lo que la dirección de F&B realmente necesita", "Director de Curfs Consult, acompañando a fundadores en go-to-market, captación de fondos y escalado"] },
    ],
    milestones: [
      { year: "2025", title: "Fundación de Sundae", description: "Nacida del dolor directo del operador - datos fragmentados costando millones en margen invisible." },
      { year: "2025", title: "Primeros despliegues", description: "Alianzas con grupos multi-marca en EAU. Datos reales, operadores reales, decisiones reales desde el primer día." },
      { year: "2026", title: "12 módulos en vivo", description: "Inteligencia de ingresos, personal, inventario, delivery, reservas, compras, marketing y beneficio - unificada en 12 dominios." },
      { year: "2026", title: "GCC y Norteamérica", description: "Grupos hospitality adoptan Sundae a nivel de plataforma en EAU, KSA, Qatar y Norteamérica." },
      { year: "2027+", title: "Expansión global", description: "Expansión a Europa y Asia Pacífico. Inteligencia empresarial para marcas multinacionales de restaurantes." },
    ],
    values: [
      { title: "Operadores primero", description: "Cada función existe porque un operador la necesitó. No construimos para demos - construimos para los turnos.", proof: "Construido por un equipo que escaló restaurantes a más de 10 M$ antes de escribir una sola línea de código.", icon: "owners" },
      { title: "Inteligencia primero", description: "Los datos dispersos cuestan dinero. Convertimos 12 sistemas en una sola capa inteligente que realmente impulsa decisiones.", proof: "12 módulos en 12 dominios operativos - de ingresos a reservas.", icon: "insights" },
      { title: "Decisiones en tiempo real", description: "Los informes semanales te cuestan dinero. Los operadores que ganan ven los problemas a tiempo para arreglarlos.", proof: "Pulse se refresca cada 5 minutos en todas las ubicaciones.", icon: "speed" },
      { title: "Subir el estándar", description: "Estamos definiendo cómo los grupos de restaurantes toman decisiones operativas en todo el mundo.", proof: "Activos en 3 países con grupos enterprise adoptando la plataforma completa.", icon: "growth" },
    ],
    presenceSubheadings: {
      active: "Mercados activos",
      expanding: "Mercados en expansión",
    },
    presenceFootnote: "Los mercados activos incluyen operaciones físicas (Ámsterdam, Dubái) y la sede legal de la compañía (Estados Unidos · Delaware C-Corp). Norteamérica (Nueva York, Toronto) y otros mercados en expansión son prioridades estratégicas en la hoja de ruta; la actividad comienza desde los hubs existentes.",
    regions: [
      { region: "Ámsterdam",      countries: "Hub Europa",     label: "Activo",       tier: "active" },
      { region: "Dubái",          countries: "Hub MEA",        label: "Activo",       tier: "active" },
      { region: "Estados Unidos", countries: "Delaware C-Corp", label: "Activo",      tier: "active" },
      { region: "Nueva York",     countries: "Norteamérica",   label: "Próximamente", tier: "expanding" },
      { region: "Toronto",        countries: "Norteamérica",   label: "Próximamente", tier: "expanding" },
      { region: "Singapur",       countries: "APAC",           label: "Próximamente", tier: "expanding" },
      { region: "Tokio",          countries: "APAC",           label: "Próximamente", tier: "expanding" },
      { region: "Ciudad de México", countries: "LATAM",        label: "Próximamente", tier: "expanding" },
      { region: "São Paulo",      countries: "LATAM",          label: "Próximamente", tier: "expanding" },
    ],
  },
} as const;

function getAboutCopy(locale: WebsiteLocale) {
  return aboutCopy[locale as keyof typeof aboutCopy] ?? getGeneratedLocalCopy(aboutCopy, generatedLocalCopy.aboutCopy, locale) ?? aboutCopy.en;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getAboutCopy(locale);
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
  };
}

export default async function AboutPage() {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getAboutCopy(locale);
  const cream = aboutCreamCopy[locale as keyof typeof aboutCreamCopy] ?? aboutCreamCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.badge} title={copy.title} description={copy.description} />

      <section className="relative bg-[var(--navy-deep)] border-y border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</div>
                  <div className="text-sm text-[var(--text-supporting)] font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Cream relief - early warm break after the hero/stats, before the long dark built/mission/team stretch (the volume system) */}
      <CreamBreak eyebrow={cream.eyebrow} statement={cream.statement} lede={cream.lede} />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{copy.builtTitle}</h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.builtDescription}</p>
            </div>
          </FadeUp>
          {/* Row 1 - Decision Intelligence (the six Core pillars) */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[var(--border-default)]" />
            <span className="eyebrow whitespace-nowrap text-[var(--text-muted)]">{copy.builtCoreLabel}</span>
            <span className="h-px flex-1 bg-[var(--border-default)]" />
          </div>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {copy.pillars.map((pillar, idx) => (
              <StaggerItem key={pillar}>
                <Card variant="feature" className="text-center h-full p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#C2410C] to-[#FF5C4D] rounded-xl flex items-center justify-center">
                    <SundaeIcon name={["pulse", "benchmarking", "watchtower", "insights", "intelligence", "forecasting"][idx] as SundaeIconName} size="lg" className="text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-base mb-1">{pillar}</h3>
                  <p className="text-xs text-[var(--text-supporting)]">{copy.pillarsSubtitle[idx]}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Row 2 - Operational Suite (Sundae Crew) - emerald to distinguish from the coral Core pillars */}
          <div className="mt-14 mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[var(--border-default)]" />
            <span className="eyebrow whitespace-nowrap text-[var(--text-muted)]">{copy.builtCrewLabel}</span>
            <span className="h-px flex-1 bg-[var(--border-default)]" />
          </div>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {copy.crewPillars.map((pillar, idx) => (
              <StaggerItem key={pillar}>
                <Card variant="feature" className="text-center h-full p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#0F766E] to-[#10B981] rounded-xl flex items-center justify-center">
                    <SundaeIcon name={["time", "device", "finance", "hr", "labor"][idx] as SundaeIconName} size="lg" className="text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-base mb-1">{pillar}</h3>
                  <p className="text-xs text-[var(--text-supporting)]">{copy.crewPillarsSubtitle[idx]}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <h2 className="section-h2 text-[var(--text-primary)] mb-8">{copy.missionTitle}</h2>
                <p className="body-xl text-[var(--text-secondary)] mb-4">{copy.missionDescription}</p>
                <p className="body-lg text-[var(--text-supporting)] mb-10">{copy.missionSupport}</p>
                <div className="space-y-6">
                  {copy.missionSteps.map((step, index) => (
                    <div key={step.title} className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200">
                      <div className="w-8 h-8 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-primary)] text-sm font-bold mt-1 flex-shrink-0">{index + 1}</div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] text-lg mb-1">{step.title}</h4>
                        <p className="text-[var(--text-supporting)] leading-[1.65]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--navy-deep)] rounded-2xl p-5 shadow-lg">
                  <div className="text-sm font-bold text-[#FF8473] mb-2 uppercase tracking-wide">Team</div>
                  <div className="text-sm text-[var(--text-supporting)] font-medium">{locale === "ar" ? "أمستردام + دبي" : locale === "fr" ? "Amsterdam + Dubaï" : locale === "es" ? "Ámsterdam + Dubái" : "Amsterdam + Dubai offices"}</div>
                </div>
                <div className="bg-[var(--navy-deep)] rounded-2xl p-5 shadow-lg">
                  <div className="text-sm font-bold text-[#FF8473] mb-2 uppercase tracking-wide">Scope</div>
                  <div className="text-sm text-[var(--text-supporting)] font-medium">{locale === "ar" ? "12 مجالًا تشغيليًا" : locale === "fr" ? "12 domaines opérationnels" : locale === "es" ? "12 dominios operativos" : "12 operational domains"}</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.teamTitle}</h2>
              <p className="text-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.teamDescription}</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
            {copy.leadership.map((member: { name: string; role: string; location: string; image: string; bullets: readonly string[] }) => (
              <StaggerItem key={member.name}>
                <div className="text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    {member.image ? (
                      <Image src={member.image} alt={member.name} width={128} height={128} loading="lazy" className="w-full h-full rounded-full object-cover border-4 border-white/[0.1] grayscale" />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center rounded-full border-4 border-white/[0.1] bg-gradient-to-br from-[#FF5C4D] to-[#E9A24A] text-3xl font-bold text-white"
                        aria-label={member.name}
                      >
                        {member.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-xl mb-1">{member.name}</h3>
                  <p className="text-[var(--text-primary)] font-semibold text-sm mb-1">{member.role}</p>
                  <p className="text-[var(--text-muted)] text-sm mb-6">{member.location}</p>
                  <ul className="text-left space-y-3">
                    {member.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start space-x-2 text-sm text-[var(--text-supporting)]">
                        <span className="text-[var(--text-primary)] mt-1 flex-shrink-0">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeUp delay={0.4}>
            <Card variant="elevated">
              <CardContent className="p-8">
                <h3 className="font-bold text-[var(--text-primary)] text-lg mb-6">{copy.strengthsTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C2410C] to-[#FF5C4D] rounded-xl flex items-center justify-center flex-shrink-0"><SundaeIcon name="restaurant" size="lg" className="text-white" /></div>
                    <p className="text-[var(--text-secondary)] font-medium">{locale === "ar" ? "وسّعت مفاهيم المطاعم إلى أكثر من 10 ملايين دولار قبل كتابة سطر واحد من الكود" : locale === "fr" ? "A développé des concepts restaurant à plus de 10 M$ avant d'écrire une ligne de code" : locale === "es" ? "Escaló conceptos de restaurante a más de 10 M$ antes de escribir una línea de código" : "Scaled restaurant concepts to $10M+ before writing a line of code"}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C2410C] to-[#FF5C4D] rounded-xl flex items-center justify-center flex-shrink-0"><SundaeIcon name="growth" size="lg" className="text-white" /></div>
                    <p className="text-[var(--text-secondary)] font-medium">{locale === "ar" ? "خروجات ناجحة متعددة وشركات تجاوزت 100 مليون دولار بُنيت من الصفر" : locale === "fr" ? "Plusieurs sorties réussies et des entreprises à plus de 100 M$ construites from scratch" : locale === "es" ? "Múltiples salidas exitosas y empresas de más de 100 M$ creadas desde cero" : "Multiple successful exits and $100M+ businesses built from scratch"}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C2410C] to-[#FF5C4D] rounded-xl flex items-center justify-center flex-shrink-0"><SundaeIcon name="multiLocation" size="lg" className="text-white" /></div>
                    <p className="text-[var(--text-secondary)] font-medium">{locale === "ar" ? "وجود في أمستردام ودبي يخدم مجموعات مؤسسية عبر 3 دول" : locale === "fr" ? "Présence à Amsterdam et Dubaï au service de groupes enterprise dans 3 pays" : locale === "es" ? "Presencia en Ámsterdam y Dubái al servicio de grupos enterprise en 3 países" : "Amsterdam + Dubai presence serving enterprise groups across 3 countries"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{copy.journeyTitle}</h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.journeyDescription}</p>
            </div>
          </FadeUp>
          <div className="hidden lg:grid lg:grid-cols-5 gap-6 relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-[var(--surface-subtle)] via-[var(--border-default)] to-[var(--surface-subtle)]" />
            {copy.milestones.map((milestone, index) => (
              <FadeUp key={`${milestone.year}-${index}`} delay={index * 0.1}>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C2410C] to-[#FF5C4D] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mx-auto mb-6 relative z-10 border-4 border-[var(--surface-faint)] hover:scale-110 transition-transform duration-300">{milestone.year}</div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">{milestone.title}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="lg:hidden">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {copy.milestones.map((milestone, index) => (
                <FadeUp key={`mobile-${milestone.year}-${index}`} delay={index * 0.1}>
                  <div className="flex-shrink-0 w-80 snap-center">
                    <Card variant="elevated" className="h-full p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#C2410C] to-[#FF5C4D] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mb-4">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{milestone.title}</h3>
                      <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{milestone.description}</p>
                    </Card>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{copy.valuesTitle}</h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.valuesDescription}</p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {copy.values.map((value, index) => (
              <FadeUp key={value.title} delay={index * 0.1}>
                <Card variant="feature" className="text-center h-full p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#C2410C] to-[#FF5C4D] rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <SundaeIcon name={value.icon as SundaeIconName} size="xl" className="text-white" />
                  </div>
                  <h3 className="text-[var(--text-primary)] text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-[var(--text-supporting)] leading-[1.65] mb-4">{value.description}</p>
                  <p className="text-xs text-[var(--text-muted)] italic border-t border-[var(--border-default)] pt-3 mt-auto">{value.proof}</p>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{copy.presenceTitle}</h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.presenceDescription}</p>
            </div>
          </FadeUp>

          {/* Render in 2 tiers when the locale has the tier field, otherwise
              fall back to the flat 4-column layout. EN ships the tier
              structure; other locales pick it up via the translation
              pipeline regeneration. */}
          {(() => {
            type RegionEntry = { region: string; countries: string; label: string; tier?: string };
            const all = copy.regions as unknown as RegionEntry[];
            const hasTiers = all.some((r) => r.tier);
            const activeMarkets = hasTiers ? all.filter((r) => r.tier === 'active') : all;
            const expandingMarkets = hasTiers ? all.filter((r) => r.tier === 'expanding') : [];
            const subheadings = (copy as typeof copy & { presenceSubheadings?: { active: string; expanding: string } }).presenceSubheadings;
            const footnote = (copy as typeof copy & { presenceFootnote?: string }).presenceFootnote;

            const renderRow = (markets: RegionEntry[], title: string | undefined, isExpanding: boolean) => (
              <div className={isExpanding ? 'mb-2' : 'mb-12'}>
                {title && (
                  <p className="eyebrow text-center mb-6 text-[var(--text-muted)]">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${isExpanding ? 'bg-[#FF8473]' : 'bg-emerald-400'} mr-2 align-middle`} />
                    {title}
                  </p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
                  {markets.map((region, index) => {
                    return (
                      <FadeUp key={region.region} delay={index * 0.08}>
                        <div className={`text-center hover:-translate-y-1 transition-transform duration-300 ${isExpanding ? 'opacity-90' : ''}`}>
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: isExpanding ? 'rgba(255,132,115,0.12)' : 'rgba(16,185,129,0.12)', border: isExpanding ? '1px dashed rgba(255,132,115,0.3)' : '1px solid rgba(16,185,129,0.25)' }}
                          >
                            <SundaeIcon name="network" size="md" className={isExpanding ? "text-[#FF8473]/80" : "text-emerald-300"} />
                          </div>
                          <h3 className={`font-bold text-base mb-0.5 leading-tight ${isExpanding ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                            {region.region}
                            {isExpanding && <span className="text-[#FF8473] ml-0.5">*</span>}
                          </h3>
                          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{region.countries}</p>
                        </div>
                      </FadeUp>
                    );
                  })}
                </div>
              </div>
            );

            return (
              <>
                {renderRow(activeMarkets, subheadings?.active, false)}
                {expandingMarkets.length > 0 && renderRow(expandingMarkets, subheadings?.expanding, true)}
                {footnote && (
                  <p className="text-[11px] text-center text-[var(--text-muted)] mt-6 italic max-w-3xl mx-auto leading-relaxed">
                    <span className="text-[#FF8473]">*</span> {footnote}
                  </p>
                )}
              </>
            );
          })()}
        </div>
      </section>

      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <Button variant="cta" size="lg" href="/demo">{copy.ctaPrimary}</Button>
        <Button variant="outline-ink" size="lg" href="/careers">{copy.ctaSecondary}</Button>
        <Button variant="outline-ink" size="lg" href="/">{copy.ctaHome}</Button>
      </PageCTA>
    </div>
  );
}
