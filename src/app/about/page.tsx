import type { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { resolveWebsiteLocale, type WebsiteLocale } from "@/lib/i18n";

const aboutCopy = {
  en: {
    metadataTitle: "About Sundae - The Decision Intelligence Platform for Restaurants",
    metadataDescription: "Sundae unifies 12+ data sources into a single intelligence layer for multi-unit restaurant groups. Built by operators who lived the problem. Active across 3 countries.",
    badge: "About Sundae",
    title: <>The Intelligence Layer<br />Restaurants Never Had</>,
    description: "Restaurant data usually lives in a dozen disconnected systems. Sundae pulls that operating picture into one place so teams can make decisions with current numbers, market context, and forward-looking signals.",
    stats: [
      { value: "6", label: "Platform Pillars" },
      { value: "30+", label: "Intelligence Modules" },
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
    presenceTitle: "Where We Operate",
    presenceDescription: "Active in the Middle East and North America. Expanding into major global hospitality markets.",
    ctaTitle: "See What Unified Intelligence Looks Like",
    ctaDescription: "30 minutes to review your data together and see where Sundae could be genuinely useful.",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "We're Hiring",
    pillars: ["Pulse", "Benchmarks", "Watchtower", "Insights", "Intelligence", "Foresight"],
    pillarsSubtitle: ["Real-Time Operations", "Competitive Intelligence", "Market Intelligence", "30+ Analytics Modules", "Conversational AI", "Predictive Intelligence"],
    leadership: [
      { name: "Robert Laryea", role: "Founder & CEO", location: "Dubai", image: "/team/robert-laryea.jpg", bullets: ["Scaled multi-unit restaurant concepts from zero to $10M+ annual revenue", "Saw first-hand how fragmented data costs operators millions in margin leakage", "20+ years leading transformation programs across consulting and F&B", "Built Sundae to give restaurant groups the operating intelligence he wished they had earlier"] },
      { name: "Daanish Siddiqui", role: "Chief Growth Officer", location: "Dubai", image: "/team/daanish-siddiqui.jpg", bullets: ["5x founder with 2 successful exits and experience building businesses past $100M", "Specialist in 0→1 category creation and product-led growth", "18+ years in product, marketing, and go-to-market execution", "Leads Sundae's market position across restaurant intelligence and growth"] },
      { name: "Alissa Parabani", role: "Head of Product", location: "Toronto", image: "/team/alissa-parabani.jpg", bullets: ["Former Walmart Canada systems engineer - built at enterprise scale", "3 product lines launched, all profitable within 18 months", "Translates operator needs into measurable product ROI", "Ensures every module solves a real problem operators face on shift"] },
      { name: "Naveed Nadir", role: "Head of Technology", location: "Toronto", image: "/team/naveed-nadir.jpg", bullets: ["Built enterprise SaaS platforms handling 10M+ daily transactions", "Seasoned engineer across automotive and enterprise SaaS at global scale", "Expert in secure, compliant systems architecture", "Owns Sundae's infrastructure reliability and real-time data pipeline"] },
    ],
    milestones: [
      { year: "2025", title: "Sundae Founded", description: "Built from direct operator pain - fragmented data costing multi-unit groups millions in invisible margin loss." },
      { year: "2025", title: "First Deployments", description: "Partnered with multi-brand restaurant groups across UAE and Canada. Real data, real operators, real decisions from day one." },
      { year: "2026", title: "30+ Modules Live", description: "Revenue, labor, inventory, delivery, reservations, purchasing, marketing, and profit intelligence - all unified across 12 operational domains." },
      { year: "2026", title: "GCC & North America", description: "Enterprise hospitality groups adopting Sundae platform-wide across UAE, KSA, Qatar, and North America." },
      { year: "2027+", title: "Global Expansion", description: "Scaling into Europe and Asia Pacific. Enterprise intelligence for multi-country restaurant brands." },
    ],
    values: [
      { title: "Operators First", description: "Every feature exists because an operator needed it. We don't build for demos - we build for shifts.", proof: "Built by a team that scaled restaurants to $10M+ before writing a line of code.", icon: "owners" },
      { title: "Intelligence First", description: "Scattered data is expensive. We turn 12 systems into one intelligent layer that actually drives decisions.", proof: "30+ modules across 12 operational domains - from revenue to reservations.", icon: "insights" },
      { title: "Real-Time Decisions", description: "Weekly reports cost you money. The operators who win are the ones who see problems while they can still fix them.", proof: "Pulse refreshes every 5 minutes across every location.", icon: "speed" },
      { title: "Raise the Standard", description: "We want restaurant teams to expect more from their data stack than another static dashboard.", proof: "Active across 3 countries with enterprise groups adopting platform-wide.", icon: "growth" },
    ],
    regions: [
      { region: "Middle East", countries: "UAE, KSA, Qatar", label: "Active" },
      { region: "North America", countries: "USA, Canada", label: "Active" },
      { region: "Europe", countries: "UK, Germany, France", label: "Target" },
      { region: "Asia Pacific", countries: "Australia, Singapore", label: "Target" },
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
      { value: "30+", label: "وحدات الذكاء" },
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
    pillars: ["Pulse", "Benchmarks", "Watchtower", "Insights", "Intelligence", "Foresight"],
    pillarsSubtitle: ["عمليات لحظية", "ذكاء تنافسي", "ذكاء سوقي", "30+ وحدة تحليل", "ذكاء محادثي", "ذكاء تنبؤي"],
    leadership: [
      { name: "Robert Laryea", role: "المؤسس والرئيس التنفيذي", location: "دبي", image: "/team/robert-laryea.jpg", bullets: ["وسّع مفاهيم مطاعم متعددة الفروع من الصفر إلى أكثر من 10 ملايين دولار سنويًا", "رأى كيف تكلف البيانات المجزأة المشغلين ملايين في خسائر هامشية غير مرئية", "أكثر من 20 سنة في برامج التحول العالمية عبر الاستشارات والمأكولات والمشروبات", "بنى Sundae ليمنح مجموعات المطاعم نظام قرار موحدًا كان ينقصها في التشغيل اليومي"] },
      { name: "Daanish Siddiqui", role: "الرئيس التنفيذي للنمو", location: "دبي", image: "/team/daanish-siddiqui.jpg", bullets: ["مؤسس 5 مرات مع خروجين ناجحين - حوّل الأفكار إلى أعمال تتجاوز 100 مليون دولار", "متخصص في بناء الفئات من الصفر والنمو بقيادة المنتج", "18+ سنة في المنتج والتسويق والتنفيذ السوقي", "يقود تموضع Sundae كمنصة مميزة لذكاء المطاعم"] },
      { name: "Alissa Parabani", role: "رئيسة المنتج", location: "تورونتو", image: "/team/alissa-parabani.jpg", bullets: ["مهندسة نظم سابقة في Walmart Canada - خبرة على مستوى المؤسسات", "إطلاق 3 خطوط منتجات جميعها ربحت خلال 18 شهرًا", "تحوّل احتياجات المشغلين إلى عائد منتج قابل للقياس", "تضمن أن كل وحدة تحل مشكلة حقيقية يواجهها المشغل خلال الوردية"] },
      { name: "Naveed Nadir", role: "رئيس التكنولوجيا", location: "تورونتو", image: "/team/naveed-nadir.jpg", bullets: ["بنى منصات SaaS مؤسسية تتعامل مع أكثر من 10 ملايين معاملة يوميًا", "مهندس متمرس عبر السيارات وSaaS المؤسسي على نطاق عالمي", "خبير في معمارية آمنة ومتوافقة", "يدير اعتمادية البنية التحتية وخطوط البيانات اللحظية لـ Sundae"] },
    ],
    milestones: [
      { year: "2025", title: "تأسيس Sundae", description: "ولدت من ألم مباشر للمشغلين - بيانات مجزأة تكلف المجموعات متعددة الفروع ملايين في خسائر هامشية خفية." },
      { year: "2025", title: "أول عمليات النشر", description: "شراكات مع مجموعات مطاعم متعددة العلامات في الإمارات وكندا. بيانات حقيقية ومشغلون حقيقيون وقرارات حقيقية منذ اليوم الأول." },
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
    regions: [
      { region: "الشرق الأوسط", countries: "الإمارات، السعودية، قطر", label: "نشط" },
      { region: "أمريكا الشمالية", countries: "الولايات المتحدة، كندا", label: "نشط" },
      { region: "أوروبا", countries: "المملكة المتحدة، ألمانيا، فرنسا", label: "هدف" },
      { region: "آسيا والمحيط الهادئ", countries: "أستراليا، سنغافورة", label: "هدف" },
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
      { value: "30+", label: "Modules d'intelligence" },
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
    pillars: ["Pulse", "Benchmarks", "Watchtower", "Insights", "Intelligence", "Foresight"],
    pillarsSubtitle: ["Opérations temps réel", "Intelligence concurrentielle", "Intelligence marché", "30+ modules analytiques", "IA conversationnelle", "Intelligence prédictive"],
    leadership: [
      { name: "Robert Laryea", role: "Fondateur & CEO", location: "Dubaï", image: "/team/robert-laryea.jpg", bullets: ["A développé des concepts restaurant multi-sites de zéro à plus de 10 M$ de revenus annuels", "A constaté combien les données fragmentées coûtent aux opérateurs en marge invisible", "20+ ans à diriger des programmes de transformation mondiaux en conseil et F&B", "A créé Sundae pour donner aux groupes restaurant un système de décision unifié qui manquait dans l'exploitation quotidienne"] },
      { name: "Daanish Siddiqui", role: "Chief Growth Officer", location: "Dubaï", image: "/team/daanish-siddiqui.jpg", bullets: ["Fondateur 5 fois avec 2 sorties réussies - a transformé des idées en entreprises à 100 M$+", "Spécialiste de la création de catégories et du product-led growth", "18+ ans en produit, marketing et go-to-market", "Pilote le positionnement de Sundae auprès des groupes qui veulent structurer leurs décisions à grande échelle"] },
      { name: "Alissa Parabani", role: "Head of Product", location: "Toronto", image: "/team/alissa-parabani.jpg", bullets: ["Ancienne ingénieure systèmes chez Walmart Canada - construite à l'échelle entreprise", "3 lignes de produits lancées, toutes rentables en 18 mois", "Transforme les besoins opérateurs en ROI produit mesurable", "S'assure que chaque module résout un vrai problème de shift"] },
      { name: "Naveed Nadir", role: "Head of Technology", location: "Toronto", image: "/team/naveed-nadir.jpg", bullets: ["A construit des plateformes SaaS d'entreprise gérant plus de 10 M de transactions/jour", "Ingénieur expérimenté en automobile et SaaS enterprise", "Expert en architecture sécurisée et conforme", "Responsable de la fiabilité d'infrastructure et des pipelines temps réel"] },
    ],
    milestones: [
      { year: "2025", title: "Fondation de Sundae", description: "Née d'une douleur opérateur directe - des données fragmentées coûtant des millions en marge invisible." },
      { year: "2025", title: "Premiers déploiements", description: "Partenariats avec des groupes multi-marques aux Émirats et au Canada. Vraies données, vrais opérateurs, vraies décisions dès le premier jour." },
      { year: "2026", title: "30+ modules en ligne", description: "Intelligence revenus, main-d'oeuvre, stock, livraison, réservations, achats, marketing et profit - unifiée sur 12 domaines." },
      { year: "2026", title: "GCC et Amérique du Nord", description: "Des groupes hospitality adoptent Sundae à l'échelle plateforme aux Émirats, en KSA, au Qatar et en Amérique du Nord." },
      { year: "2027+", title: "Expansion mondiale", description: "Expansion vers l'Europe et l'Asie-Pacifique. Intelligence enterprise pour marques multi-pays." },
    ],
    values: [
      { title: "Opérateurs d'abord", description: "Chaque fonctionnalité existe parce qu'un opérateur en avait besoin. Nous ne construisons pas pour les démos - nous construisons pour les services.", proof: "Construit par une équipe qui a porté des restaurants à plus de 10 M$ avant d'écrire une ligne de code.", icon: "owners" },
      { title: "Intelligence d'abord", description: "Les données dispersées coûtent cher. Nous transformons 12 systèmes en une couche intelligente qui aide vraiment à décider.", proof: "30+ modules sur 12 domaines opérationnels - du revenu aux réservations.", icon: "insights" },
      { title: "Décisions temps réel", description: "Les rapports hebdomadaires vous coûtent de l'argent. Les opérateurs qui gagnent voient les problèmes à temps pour les corriger.", proof: "Pulse se rafraîchit toutes les 5 minutes sur chaque site.", icon: "speed" },
      { title: "Relever le standard", description: "Nous définissons la référence de la décision opérationnelle pour les groupes restaurant du monde entier.", proof: "Actifs dans 3 pays avec des groupes enterprise qui adoptent la plateforme.", icon: "growth" },
    ],
    regions: [
      { region: "Moyen-Orient", countries: "Émirats, KSA, Qatar", label: "Actif" },
      { region: "Amérique du Nord", countries: "USA, Canada", label: "Actif" },
      { region: "Europe", countries: "Royaume-Uni, Allemagne, France", label: "Cible" },
      { region: "Asie-Pacifique", countries: "Australie, Singapour", label: "Cible" },
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
      { value: "30+", label: "Módulos de inteligencia" },
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
    pillars: ["Pulse", "Benchmarks", "Watchtower", "Insights", "Intelligence", "Foresight"],
    pillarsSubtitle: ["Operaciones en tiempo real", "Inteligencia competitiva", "Inteligencia de mercado", "30+ módulos analíticos", "IA conversacional", "Inteligencia predictiva"],
    leadership: [
      { name: "Robert Laryea", role: "Fundador y CEO", location: "Dubái", image: "/team/robert-laryea.jpg", bullets: ["Escaló conceptos de restaurantes multilocal desde cero hasta más de 10 M$ en ingresos anuales", "Vio cómo los datos fragmentados cuestan a los operadores millones en fuga de margen", "Más de 20 años liderando programas de transformación global en consultoría y F&B", "Creó Sundae para dar a los grupos de restaurantes un sistema de decisiones unificado que faltaba en la operación diaria"] },
      { name: "Daanish Siddiqui", role: "Chief Growth Officer", location: "Dubái", image: "/team/daanish-siddiqui.jpg", bullets: ["Fundador 5 veces con 2 salidas exitosas - convirtió ideas en empresas de más de 100 M$", "Especialista en creación de categorías y crecimiento liderado por producto", "18+ años en producto, marketing y go-to-market", "Lidera el posicionamiento de Sundae para grupos que quieren ordenar sus decisiones a gran escala"] },
      { name: "Alissa Parabani", role: "Head of Product", location: "Toronto", image: "/team/alissa-parabani.jpg", bullets: ["Ex ingeniera de sistemas en Walmart Canada - construyó a escala empresarial", "3 líneas de producto lanzadas, todas rentables en 18 meses", "Convierte necesidades operativas en ROI de producto medible", "Asegura que cada módulo resuelva un problema real del turno"] },
      { name: "Naveed Nadir", role: "Head of Technology", location: "Toronto", image: "/team/naveed-nadir.jpg", bullets: ["Construyó plataformas SaaS empresariales con más de 10 M de transacciones al día", "Ingeniero experimentado en automoción y SaaS empresarial a escala global", "Experto en arquitectura segura y conforme", "Responsable de la fiabilidad de infraestructura y pipelines en tiempo real"] },
    ],
    milestones: [
      { year: "2025", title: "Fundación de Sundae", description: "Nacida del dolor directo del operador - datos fragmentados costando millones en margen invisible." },
      { year: "2025", title: "Primeros despliegues", description: "Alianzas con grupos multi-marca en EAU y Canadá. Datos reales, operadores reales, decisiones reales desde el primer día." },
      { year: "2026", title: "30+ módulos en vivo", description: "Inteligencia de ingresos, personal, inventario, delivery, reservas, compras, marketing y beneficio - unificada en 12 dominios." },
      { year: "2026", title: "GCC y Norteamérica", description: "Grupos hospitality adoptan Sundae a nivel de plataforma en EAU, KSA, Qatar y Norteamérica." },
      { year: "2027+", title: "Expansión global", description: "Expansión a Europa y Asia Pacífico. Inteligencia empresarial para marcas multinacionales de restaurantes." },
    ],
    values: [
      { title: "Operadores primero", description: "Cada función existe porque un operador la necesitó. No construimos para demos - construimos para los turnos.", proof: "Construido por un equipo que escaló restaurantes a más de 10 M$ antes de escribir una sola línea de código.", icon: "owners" },
      { title: "Inteligencia primero", description: "Los datos dispersos cuestan dinero. Convertimos 12 sistemas en una sola capa inteligente que realmente impulsa decisiones.", proof: "30+ módulos en 12 dominios operativos - de ingresos a reservas.", icon: "insights" },
      { title: "Decisiones en tiempo real", description: "Los informes semanales te cuestan dinero. Los operadores que ganan ven los problemas a tiempo para arreglarlos.", proof: "Pulse se refresca cada 5 minutos en todas las ubicaciones.", icon: "speed" },
      { title: "Subir el estándar", description: "Estamos definiendo cómo los grupos de restaurantes toman decisiones operativas en todo el mundo.", proof: "Activos en 3 países con grupos enterprise adoptando la plataforma completa.", icon: "growth" },
    ],
    regions: [
      { region: "Oriente Medio", countries: "EAU, KSA, Qatar", label: "Activo" },
      { region: "Norteamérica", countries: "EE. UU., Canadá", label: "Activo" },
      { region: "Europa", countries: "Reino Unido, Alemania, Francia", label: "Objetivo" },
      { region: "Asia Pacífico", countries: "Australia, Singapur", label: "Objetivo" },
    ],
  },
} as const;

function getAboutCopy(locale: WebsiteLocale) {
  return aboutCopy[locale] ?? aboutCopy.en;
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

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{copy.builtTitle}</h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.builtDescription}</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {copy.pillars.map((pillar, idx) => (
              <StaggerItem key={pillar}>
                <Card variant="feature" className="text-center h-full p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center">
                    <SundaeIcon name={["pulse", "benchmarking", "watchtower", "insights", "intelligence", "forecasting"][idx] as SundaeIconName} size="lg" className="text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-base mb-1">{pillar}</h3>
                  <p className="text-xs text-[var(--text-supporting)]">{copy.pillarsSubtitle[idx]}</p>
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
                  <div className="text-sm font-bold text-[#60A5FA] mb-2 uppercase tracking-wide">Team</div>
                  <div className="text-sm text-[var(--text-supporting)] font-medium">{locale === "ar" ? "دبي + تورونتو" : locale === "fr" ? "Dubaï + Toronto" : locale === "es" ? "Dubái + Toronto" : "Dubai + Toronto offices"}</div>
                </div>
                <div className="bg-[var(--navy-deep)] rounded-2xl p-5 shadow-lg">
                  <div className="text-sm font-bold text-[#60A5FA] mb-2 uppercase tracking-wide">Scope</div>
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
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {copy.leadership.map((member) => (
              <StaggerItem key={member.name}>
                <div className="text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image src={member.image} alt={member.name} width={128} height={128} loading="lazy" className="w-full h-full rounded-full object-cover border-4 border-white/[0.1]" />
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
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center flex-shrink-0"><SundaeIcon name="restaurant" size="lg" className="text-white" /></div>
                    <p className="text-[var(--text-secondary)] font-medium">{locale === "ar" ? "وسّعت مفاهيم المطاعم إلى أكثر من 10 ملايين دولار قبل كتابة سطر واحد من الكود" : locale === "fr" ? "A développé des concepts restaurant à plus de 10 M$ avant d'écrire une ligne de code" : locale === "es" ? "Escaló conceptos de restaurante a más de 10 M$ antes de escribir una línea de código" : "Scaled restaurant concepts to $10M+ before writing a line of code"}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center flex-shrink-0"><SundaeIcon name="growth" size="lg" className="text-white" /></div>
                    <p className="text-[var(--text-secondary)] font-medium">{locale === "ar" ? "خروجات ناجحة متعددة وشركات تجاوزت 100 مليون دولار بُنيت من الصفر" : locale === "fr" ? "Plusieurs sorties réussies et des entreprises à plus de 100 M$ construites from scratch" : locale === "es" ? "Múltiples salidas exitosas y empresas de más de 100 M$ creadas desde cero" : "Multiple successful exits and $100M+ businesses built from scratch"}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center flex-shrink-0"><SundaeIcon name="multiLocation" size="lg" className="text-white" /></div>
                    <p className="text-[var(--text-secondary)] font-medium">{locale === "ar" ? "وجود في دبي وتورونتو يخدم مجموعات مؤسسية عبر 3 دول" : locale === "fr" ? "Présence à Dubaï et Toronto au service de groupes enterprise dans 3 pays" : locale === "es" ? "Presencia en Dubái y Toronto al servicio de grupos enterprise en 3 países" : "Dubai + Toronto presence serving enterprise groups across 3 countries"}</p>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mx-auto mb-6 relative z-10 border-4 border-[var(--surface-faint)] hover:scale-110 transition-transform duration-300">{milestone.year}</div>
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
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mb-4">{milestone.year}</div>
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
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
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
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{copy.presenceTitle}</h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.presenceDescription}</p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {copy.regions.map((region, index) => (
              <FadeUp key={region.region} delay={index * 0.1}>
                <div className="text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className={`w-20 h-20 ${index < 2 ? "bg-green-600" : index === 2 ? "bg-violet-600" : "bg-orange-600"} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <SundaeIcon name="network" size="lg" className="text-white" />
                  </div>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-full ${region.label === (locale === "ar" ? "نشط" : locale === "fr" ? "Actif" : locale === "es" ? "Activo" : "Active") ? "bg-green-500/20 text-green-400" : "bg-[var(--surface-subtle)] text-[var(--text-muted)]"}`}>{region.label}</span>
                  <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">{region.region}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{region.countries}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <Button variant="cta" size="lg" href="/demo">{copy.ctaPrimary}</Button>
        <Button variant="outline-light" size="lg" href="/careers">{copy.ctaSecondary}</Button>
      </PageCTA>
    </div>
  );
}
