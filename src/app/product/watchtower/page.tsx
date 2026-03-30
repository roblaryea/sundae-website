'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { WatchtowerMockup } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

const localizedWatchtowerCopy = {
  en: {
    heroBadge: "Watchtower — External Intelligence Engine",
    heroTitle: <>10+ Competitors Tracked Daily.<br />Zero Manual Research.</>,
    heroDescription:
      "Competitor pricing changes tracked daily. A concert this weekend. Ramadan starts next week. Watchtower synthesizes external signals with your internal data into a daily intelligence briefing - what's happening, why it matters, and what to do about it. Signals automatically cascade into Foresight assumptions.",
    heroNote: "Available on Core tiers. Choose individual intelligence types or the full Watchtower bundle.",
    heroPrimary: "Add Watchtower",
    heroSecondary: "Book a Demo",
    introHeading: "What is Watchtower?",
    introDescription:
      "Your external intelligence layer - visibility into everything outside your four walls that impacts your business. While Pulse tells you what's happening inside your operation, Watchtower covers the competitive landscape, local environment, and broader market.",
    introCards: [
      { icon: "visibility" as SundaeIconName, title: "External Intelligence", text: "Most platforms only show you YOUR data. Watchtower shows you THE MARKET." },
      { icon: "speed" as SundaeIconName, title: "Proactive, Not Reactive", text: "Get alerts when competitors move. Predict demand shifts. See trends before they hit." },
      { icon: "intelligence" as SundaeIconName, title: "Synthesized Briefings", text: "Daily intelligence briefings that combine internal performance with external signals." },
    ],
    internalEyebrow: "INTERNAL + EXTERNAL",
    internalHeading: "The Only Platform That Sees Both Sides",
    internalDescription:
      "Internal platforms show you what happened. Market tools show you what's out there. Sundae is the only decision intelligence platform that synthesizes both - combining your POS, labor, and ops data with live competitor tracking, local event intelligence, weather forecasts, and market trend data - into a single briefing that tells you what it all means for today's shift.",
    featureEyebrow: "FOUR INTELLIGENCE TYPES",
    featureHeading: "External Intelligence, Automated",
    featureDescription: "Choose one, two, or all four intelligence types for complete external visibility",
    features: [
      {
        title: "Command Center & Daily Briefing",
        headline: "Your Morning Intelligence Briefing",
        description:
          "Every morning, Watchtower synthesizes everything - yesterday's revenue and pace from Pulse, today's weather forecast, upcoming events near your restaurant, recent competitor activity, and market signals - into a single, prioritized briefing. Not a dashboard you have to check. Intelligence that comes to you.",
        capabilities: [
          "Daily briefing combining internal + external data",
          "Prioritized recommendations ranked by revenue impact",
          "Delivered via email, Telegram, Slack, or in-app",
          "Signal feed with dismiss and acknowledge actions",
          "Weekly competitive intelligence digest",
        ],
        icon: "intelligence" as SundaeIconName,
        color: "from-red-500 to-red-600",
      },
      {
        title: "Competitive Intelligence",
        headline: "Know What Your Competitors Are Doing",
        description:
          "Track named competitors - not anonymous averages. Watchtower monitors their Google ratings, reviews, opening hours, and public presence daily. Sentiment analysis extracts what customers love and hate about each competitor. Get alerted when a competitor's rating drops or a new restaurant opens nearby.",
        capabilities: [
          "Track up to 10+ named competitors per outlet",
          "Auto-discover competitors by location, cuisine, and price range",
          "Competitor menu price tracking - continuous monitoring of pricing changes with magnitude and timing",
          "Daily rating and review monitoring",
          "Review sentiment analysis by theme",
          "Competitor activity alerts (rating changes, closures, review spikes, price changes)",
          "12-week competitive trend tracking",
        ],
        icon: "balance" as SundaeIconName,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Events & Calendar Intelligence",
        headline: "Local Events That Move Your Numbers",
        description:
          "A concert this weekend means 40% more foot traffic during dinner. Ramadan means a fundamental shift in your daypart mix for 30 days. Watchtower discovers events near your restaurant and generates impact assessments: expected demand shift, staffing recommendations, and prep guidance tailored to your outlet.",
        capabilities: [
          "Local event discovery within configurable radius",
          "Public holidays and religious observance calendar",
          "Ramadan-specific intelligence (Iftar rush, Suhoor service, daytime adjustment)",
          "Impact assessments with staffing and prep recommendations",
          "Integration with Pulse targets for event-aware pacing",
        ],
        icon: "growth" as SundaeIconName,
        color: "from-purple-500 to-purple-600",
      },
      {
        title: "Market & Trends",
        headline: "Your Market at a Glance",
        description:
          "How many restaurants operate within 5km of you? What's the average rating? Who opened last month, who closed? Watchtower builds a living picture of your local restaurant landscape and surfaces signals when something significant changes.",
        capabilities: [
          "District-level restaurant landscape mapping",
          "New opening and closure detection",
          "Average rating and pricing trends by cuisine segment",
          "Macro economic signals (inflation, consumer confidence)",
          "Market intelligence signals surfaced proactively",
          "Cross-intelligence cascade — Watchtower signals feed into Foresight assumptions with confidence scoring",
          "VAT, hotel, and franchise-specific financial visuals",
        ],
        icon: "multiLocation" as SundaeIconName,
        color: "from-orange-500 to-orange-600",
      },
    ],
    pricingHeading: "Watchtower Pricing",
    pricingDescription: "Available on Core tiers. Choose individual components or save ~18% with the full bundle.",
    pricingCards: [
      { name: "Competitive Intelligence", price: "$549", perLoc: "+$69/loc" },
      { name: "Events & Calendar", price: "$249", perLoc: "+$39/loc" },
      { name: "Market Trends", price: "$299", perLoc: "+$29/loc" },
      { name: "Full Bundle", price: "$899", perLoc: "+$109/loc", highlight: true },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
      {
        q: "How many competitors can I track?",
        a: "Up to 10+ competitors per location. Choose the competitors that matter most. Each location can have its own competitor set.",
      },
      {
        q: "Can I track different competitors at different locations?",
        a: "Yes. Each location has its own competitor set. Location A might track different restaurants than Location B based on local competition.",
      },
      {
        q: "How often is competitor data updated?",
        a: "Daily automated monitoring with change detection. Critical changes (like major rating shifts or new competitors) trigger immediate alerts.",
      },
      {
        q: "Does Watchtower require Core tier?",
        a: "Yes. Watchtower is available on Core Lite, Core Pro, and Enterprise tiers. It requires the real-time data infrastructure that Core provides to synthesize internal performance with external signals.",
      },
      {
        q: "Can I use just one intelligence type?",
        a: "Yes. Choose Competitive Intelligence, Events & Calendar Signals, or Market Trends individually - or get the full Watchtower bundle for ~18% savings.",
      },
      {
        q: "How does the daily briefing work?",
        a: "Every morning, Watchtower synthesizes your previous day's Pulse data with today's external signals into a prioritized briefing delivered to email, Slack, or Telegram.",
      },
    ],
    ctaTitle: "Add External Intelligence to Your Platform",
    ctaDescription: "See your business in full market context. Never be caught off guard again.",
    ctaAdd: "Add to Your Plan",
    ctaDemo: "See It in Action",
    ctaSales: "Talk to Sales",
  },
  ar: {
    heroBadge: "Watchtower — محرك الذكاء الخارجي",
    heroTitle: <>أكثر من 10 منافسين تتم متابعتهم يومياً.<br />من دون أي بحث يدوي.</>,
    heroDescription:
      "تُتابَع تغييرات أسعار المنافسين يومياً. حفل هذا الأسبوع. يبدأ رمضان الأسبوع المقبل. يدمج Watchtower الإشارات الخارجية مع بياناتك الداخلية في موجز ذكاء يومي - ما الذي يحدث، ولماذا يهم، وما الذي يجب فعله بشأنه. تنتقل الإشارات تلقائياً إلى افتراضات Foresight.",
    heroNote: "متاح على مستويات Core. اختر أنواع الذكاء الفردية أو حزمة Watchtower الكاملة.",
    heroPrimary: "أضف Watchtower",
    heroSecondary: "احجز عرضاً",
    introHeading: "ما هو Watchtower؟",
    introDescription:
      "طبقة الذكاء الخارجي لديك - رؤية لكل ما خارج جدرانك الأربعة ويؤثر على عملك. بينما يوضح لك Pulse ما يحدث داخل العملية، يغطي Watchtower المشهد التنافسي والبيئة المحلية والسوق الأوسع.",
    introCards: [
      { icon: "visibility" as SundaeIconName, title: "ذكاء خارجي", text: "معظم المنصات تعرض بياناتك فقط. Watchtower يعرض السوق." },
      { icon: "speed" as SundaeIconName, title: "استباقي لا تفاعلي", text: "احصل على تنبيهات عندما يتحرك المنافسون. توقع تحولات الطلب. شاهد الاتجاهات قبل أن تصل." },
      { icon: "intelligence" as SundaeIconName, title: "موجزات مركبة", text: "موجزات ذكاء يومية تجمع الأداء الداخلي مع الإشارات الخارجية." },
    ],
    internalEyebrow: "داخلي + خارجي",
    internalHeading: "المنصة الوحيدة التي ترى الجانبين معاً",
    internalDescription:
      "المنصات الداخلية توضح ما حدث. أدوات السوق توضح ما هو متاح. Sundae هي منصة الذكاء القراري الوحيدة التي تدمج الاثنين - بضم بيانات POS والعمالة والعمليات مع تتبع المنافسين، وذكاء الأحداث المحلية، وتوقعات الطقس، وبيانات اتجاهات السوق - في موجز واحد يشرح ما يعنيه ذلك لوردية اليوم.",
    featureEyebrow: "أربعة أنواع من الذكاء",
    featureHeading: "ذكاء خارجي مؤتمت",
    featureDescription: "اختر نوعاً واحداً أو اثنين أو الأربعة جميعاً للحصول على رؤية خارجية كاملة",
    features: [
      {
        title: "مركز القيادة والموجز اليومي",
        headline: "موجز ذكاء الصباح",
        description:
          "كل صباح يدمج Watchtower كل شيء - إيرادات أمس وإيقاعه من Pulse، وتوقع الطقس اليوم، والأحداث القادمة قرب مطعمك، ونشاط المنافسين الأخير، وإشارات السوق - في موجز واحد مرتّب حسب الأولوية. ليس لوحة تحكم تحتاج لتفقدها. بل ذكاء يأتي إليك.",
        capabilities: [
          "موجز يومي يجمع البيانات الداخلية والخارجية",
          "توصيات مرتبة حسب أثر الإيرادات",
          "تسليم عبر البريد أو Telegram أو Slack أو داخل التطبيق",
          "تغذية إشارات مع إجراءات تجاهل وتأكيد",
          "ملخص تنافسي أسبوعي",
        ],
        icon: "intelligence" as SundaeIconName,
        color: "from-red-500 to-red-600",
      },
      {
        title: "ذكاء المنافسين",
        headline: "اعرف ما يفعله منافسوك",
        description:
          "تابع منافسين محددين - لا متوسطات مجهولة. يراقب Watchtower تقييماتهم ومراجعاتهم وساعات العمل وحضورهم العام يومياً. يستخرج تحليل المشاعر ما يحبّه العملاء وما يكرهونه لدى كل منافس. تصلك تنبيهات عندما ينخفض التقييم أو يفتح مطعم جديد قريب.",
        capabilities: [
          "تتبع أكثر من 10 منافسين محددين لكل موقع",
          "اكتشاف تلقائي للمنافسين حسب الموقع والمطبخ والسعر",
          "متابعة أسعار قوائم المنافسين بشكل مستمر",
          "مراقبة يومية للتقييمات والمراجعات",
          "تحليل مشاعر المراجعات حسب الموضوع",
          "تنبيهات لنشاط المنافسين",
          "تتبع اتجاهات تنافسية لمدة 12 أسبوعاً",
        ],
        icon: "balance" as SundaeIconName,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "ذكاء الأحداث والتقويم",
        headline: "الأحداث المحلية التي تحرك الأرقام",
        description:
          "يعني حفل هذا الأسبوع زيادة 40% في الحركة أثناء العشاء. ويعني رمضان تحولاً جذرياً في توزيع فترات اليوم لمدة 30 يوماً. يكتشف Watchtower الأحداث قرب مطعمك ويولد تقديرات أثر: تغير الطلب المتوقع، وتوصيات التوظيف، وإرشادات التحضير المصممة لموقعك.",
        capabilities: [
          "اكتشاف الأحداث المحلية ضمن نصف قطر قابل للضبط",
          "تقويم الأعياد الرسمية والمناسبات الدينية",
          "ذكاء مخصص لرمضان",
          "تقديرات أثر مع توصيات التوظيف والتحضير",
          "تكامل مع أهداف Pulse للإيقاع الواعي بالأحداث",
        ],
        icon: "growth" as SundaeIconName,
        color: "from-purple-500 to-purple-600",
      },
      {
        title: "السوق والاتجاهات",
        headline: "سوقك في لمحة",
        description:
          "كم مطعماً يعمل ضمن 5 كم منك؟ ما متوسط التقييم؟ من افتتح الشهر الماضي ومن أغلق؟ يبني Watchtower صورة حية لمشهد المطاعم المحلي ويعرض الإشارات عندما يتغير شيء مهم.",
        capabilities: [
          "خرائط لمشهد المطاعم على مستوى المنطقة",
          "كشف الفتحات والإغلاقات الجديدة",
          "اتجاهات التقييم والأسعار حسب فئة المطبخ",
          "إشارات اقتصادية كلية",
          "إظهار ذكاء السوق بشكل استباقي",
          "سلسلة ذكاء متقاطعة إلى Foresight",
          "تصورات مالية خاصة بالضريبة والفنادق والامتيازات",
        ],
        icon: "multiLocation" as SundaeIconName,
        color: "from-orange-500 to-orange-600",
      },
    ],
    pricingHeading: "أسعار Watchtower",
    pricingDescription: "متاح على مستويات Core. اختر مكونات فردية أو وفّر نحو 18% مع الحزمة الكاملة.",
    pricingCards: [
      { name: "ذكاء المنافسين", price: "$549", perLoc: "+$69/موقع" },
      { name: "الأحداث والتقويم", price: "$249", perLoc: "+$39/موقع" },
      { name: "اتجاهات السوق", price: "$299", perLoc: "+$29/موقع" },
      { name: "الحزمة الكاملة", price: "$899", perLoc: "+$109/موقع", highlight: true },
    ],
    faqHeading: "الأسئلة الشائعة",
    faqs: [
      { q: "كم منافساً يمكنني تتبعه؟", a: "حتى أكثر من 10 منافسين لكل موقع." },
      { q: "هل يمكنني تتبع منافسين مختلفين في مواقع مختلفة؟", a: "نعم، لكل موقع مجموعة منافسين خاصة به." },
      { q: "كم مرة تُحدَّث بيانات المنافسين؟", a: "تحديث يومي آلي مع كشف للتغييرات." },
      { q: "هل يتطلب Watchtower مستوى Core؟", a: "نعم، فهو متاح على Core Lite وCore Pro وEnterprise." },
      { q: "هل يمكنني استخدام نوع ذكاء واحد فقط؟", a: "نعم، اختر ما تحتاجه فقط أو احصل على الحزمة الكاملة." },
      { q: "كيف يعمل الموجز اليومي؟", a: "يدمج بيانات Pulse السابقة مع الإشارات الخارجية في موجز مرتّب الأولوية." },
    ],
    ctaTitle: "أضف الذكاء الخارجي إلى منصتك",
    ctaDescription: "شاهد عملك ضمن سياق السوق الكامل. لن تُفاجأ مجدداً.",
    ctaAdd: "أضف إلى خطتك",
    ctaDemo: "شاهد ذلك عملياً",
    ctaSales: "تحدث مع المبيعات",
  },
  fr: {
    heroBadge: "Watchtower - Moteur d intelligence externe",
    heroTitle: <>10+ concurrents suivis chaque jour.<br />Aucune recherche manuelle.</>,
    heroDescription:
      "Les changements de prix des concurrents sont suivis chaque jour. Un concert ce week-end. Ramadan commence la semaine prochaine. Watchtower synthétise les signaux externes avec vos donnees internes dans un briefing quotidien - ce qui se passe, pourquoi c est important et quoi faire. Les signaux alimentent automatiquement les hypotheses de Foresight.",
    heroNote: "Disponible sur les offres Core. Choisissez des types d intelligence individuels ou le bundle Watchtower complet.",
    heroPrimary: "Ajouter Watchtower",
    heroSecondary: "Reserver une demo",
    introHeading: "Qu est-ce que Watchtower ?",
    introDescription:
      "Votre couche d intelligence externe - une visibilite sur tout ce qui se passe hors de vos murs et impacte votre activite. Alors que Pulse vous dit ce qui se passe a l interieur, Watchtower couvre le paysage concurrentiel, l environnement local et le marche au sens large.",
    introCards: [
      { icon: "visibility" as SundaeIconName, title: "Intelligence externe", text: "La plupart des plateformes ne montrent que VOS donnees. Watchtower montre LE MARCHE." },
      { icon: "speed" as SundaeIconName, title: "Proactif, pas reactif", text: "Recevez des alertes quand les concurrents bougent. Anticipez les changements de demande. Voyez les tendances avant qu elles n arrivent." },
      { icon: "intelligence" as SundaeIconName, title: "Briefings synthetises", text: "Des briefings quotidiens qui combinent performance interne et signaux externes." },
    ],
    internalEyebrow: "INTERNE + EXTERNE",
    internalHeading: "La seule plateforme qui voit les deux cotes",
    internalDescription:
      "Les plateformes internes montrent ce qui s est passe. Les outils de marche montrent ce qui existe dehors. Sundae est la seule plateforme d intelligence de decision qui synthese les deux - en combinant vos donnees POS, RH et operations avec le suivi des concurrents, l intelligence des evenements locaux, les previsions meteo et les donnees de tendance du marche - dans un briefing unique qui explique ce que cela signifie pour le service d aujourd hui.",
    featureEyebrow: "QUATRE TYPES D INTELLIGENCE",
    featureHeading: "Intelligence externe, automatisee",
    featureDescription: "Choisissez un, deux ou les quatre types pour une visibilite externe complete",
    features: [
      {
        title: "Centre de commande et briefing quotidien",
        headline: "Votre briefing matinal",
        description:
          "Chaque matin, Watchtower synthese tout - les revenus et le rythme d hier de Pulse, la meteo du jour, les evenements a venir pres de votre restaurant, l activite recente des concurrents et les signaux de marche - dans un briefing priorise. Pas un tableau de bord a consulter. Une intelligence qui vient a vous.",
        capabilities: [
          "Briefing quotidien combinant donnees internes et externes",
          "Recommandations priorisees par impact revenu",
          "Diffusion par email, Telegram, Slack ou dans l app",
          "Flux de signaux avec actions ignorer et accuser reception",
          "Resume hebdomadaire de veille concurrentielle",
        ],
        icon: "intelligence" as SundaeIconName,
        color: "from-red-500 to-red-600",
      },
      {
        title: "Intelligence concurrentielle",
        headline: "Sachez ce que font vos concurrents",
        description:
          "Suivez des concurrents nommes - pas des moyennes anonymes. Watchtower surveille quotidiennement leurs notes Google, avis, horaires d ouverture et presence publique. L analyse de sentiment extrait ce que les clients aiment et detestent chez chaque concurrent. Recevez une alerte lorsqu une note baisse ou qu un nouveau restaurant ouvre a proximite.",
        capabilities: [
          "Suivi de 10+ concurrents nommes par site",
          "Decouverte automatique par lieu, cuisine et prix",
          "Suivi continu des prix de menu des concurrents",
          "Surveillance quotidienne des notes et avis",
          "Analyse de sentiment par theme",
          "Alertes d activite concurrente",
          "Suivi de tendance sur 12 semaines",
        ],
        icon: "balance" as SundaeIconName,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Intelligence evenements et calendrier",
        headline: "Les evenements locaux qui font bouger vos chiffres",
        description:
          "Un concert ce week-end, c est 40 % de trafic en plus au diner. Ramadan signifie un changement fondamental de votre mix de journee pendant 30 jours. Watchtower detecte les evenements pres de votre restaurant et genere des estimations d impact : evolution attendue de la demande, recommandations de staffing et conseils de preparation adaptes a votre site.",
        capabilities: [
          "Decouverte d evenements locaux dans un rayon configurable",
          "Calendrier des jours feries et observances religieuses",
          "Intelligence specifique au Ramadan",
          "Analyses d impact avec recommandations de staffing et preparation",
          "Integration avec Pulse pour un pacing sensible aux evenements",
        ],
        icon: "growth" as SundaeIconName,
        color: "from-purple-500 to-purple-600",
      },
      {
        title: "Marche et tendances",
        headline: "Votre marche en un coup d oeil",
        description:
          "Combien de restaurants fonctionnent dans un rayon de 5 km ? Quelle est la note moyenne ? Qui a ouvert le mois dernier, qui a ferme ? Watchtower construit une image vivante de votre paysage local et remonte les signaux lorsqu un changement important survient.",
        capabilities: [
          "Cartographie du paysage de restaurants par district",
          "Detection des ouvertures et fermetures",
          "Tendances de notation et de prix par segment de cuisine",
          "Signaux macroeconomiques",
          "Signaux de marche remontes proactivement",
          "Cascade cross-intelligence vers Foresight",
          "Visuels financiers specifiques TVA, hotel et franchise",
        ],
        icon: "multiLocation" as SundaeIconName,
        color: "from-orange-500 to-orange-600",
      },
    ],
    pricingHeading: "Tarifs Watchtower",
    pricingDescription: "Disponible sur les offres Core. Choisissez des composants individuels ou economisez environ 18 % avec le bundle complet.",
    pricingCards: [
      { name: "Intelligence concurrentielle", price: "$549", perLoc: "+$69/site" },
      { name: "Evenements & calendrier", price: "$249", perLoc: "+$39/site" },
      { name: "Tendances du marche", price: "$299", perLoc: "+$29/site" },
      { name: "Bundle complet", price: "$899", perLoc: "+$109/site", highlight: true },
    ],
    faqHeading: "Questions frequentes",
    faqs: [
      { q: "Combien de concurrents puis-je suivre ?", a: "Jusqu a 10+ concurrents par site." },
      { q: "Puis-je suivre des concurrents differents selon les sites ?", a: "Oui, chaque site a son propre ensemble de concurrents." },
      { q: "A quelle frequence les donnees sont-elles mises a jour ?", a: "Surveillance quotidienne avec detection de changement." },
      { q: "Watchtower requiert-il Core ?", a: "Oui, il est disponible sur Core Lite, Core Pro et Enterprise." },
      { q: "Puis-je utiliser un seul type d intelligence ?", a: "Oui, choisissez ce dont vous avez besoin ou prenez le bundle complet." },
      { q: "Comment fonctionne le briefing quotidien ?", a: "Il combine les donnees Pulse de la veille avec les signaux externes du jour." },
    ],
    ctaTitle: "Ajouter l intelligence externe a votre plateforme",
    ctaDescription: "Voyez votre activite dans son contexte marche complet. Ne soyez plus jamais pris au depourvu.",
    ctaAdd: "Ajouter a votre offre",
    ctaDemo: "Voir en action",
    ctaSales: "Parler a l equipe commerciale",
  },
  es: {
    heroBadge: "Watchtower - Motor de inteligencia externa",
    heroTitle: <>Mas de 10 competidores seguidos cada dia.<br />Sin investigacion manual.</>,
    heroDescription:
      "Los cambios de precios de los competidores se registran a diario. Un concierto este fin de semana. Ramadan empieza la proxima semana. Watchtower sintetiza las senales externas con tus datos internos en un informe diario de inteligencia - que esta pasando, por que importa y que hacer al respecto. Las senales se incorporan automaticamente a Foresight.",
    heroNote: "Disponible en los planes Core. Elige tipos de inteligencia individuales o el bundle completo de Watchtower.",
    heroPrimary: "Agregar Watchtower",
    heroSecondary: "Reservar una demo",
    introHeading: "Que es Watchtower?",
    introDescription:
      "Una vista clara de todo lo que ocurre fuera de tus cuatro paredes y afecta al negocio. Mientras Pulse te dice lo que pasa dentro, Watchtower sigue el panorama competitivo, el entorno local y el mercado mas amplio.",
    introCards: [
      { icon: "visibility" as SundaeIconName, title: "Inteligencia externa", text: "La mayoria de las plataformas solo muestran TUS datos. Watchtower muestra EL MERCADO." },
      { icon: "speed" as SundaeIconName, title: "Proactivo, no reactivo", text: "Recibe alertas cuando los competidores se mueven. Anticipa cambios en la demanda. Ve tendencias antes de que impacten." },
      { icon: "intelligence" as SundaeIconName, title: "Informes sintetizados", text: "Informes diarios que combinan rendimiento interno y senales externas." },
    ],
    internalEyebrow: "INTERNO + EXTERNO",
    internalHeading: "La unica plataforma que ve ambos lados",
    internalDescription:
      "Las plataformas internas muestran lo que paso. Las herramientas de mercado muestran lo que hay fuera. Sundae es la unica plataforma de inteligencia de decision que sintetiza ambos - combinando tus datos de POS, RR.HH. y operaciones con seguimiento de competidores, inteligencia de eventos locales, pronosticos del clima y datos de tendencias del mercado - en un informe unico que explica lo que significa para el turno de hoy.",
    featureEyebrow: "CUATRO TIPOS DE INTELIGENCIA",
    featureHeading: "Inteligencia externa automatizada",
    featureDescription: "Elige uno, dos o los cuatro tipos para tener visibilidad externa completa",
    features: [
      {
        title: "Centro de comando e informe diario",
        headline: "Tu briefing de la manana",
        description:
          "Cada manana, Watchtower sintetiza todo - ingresos y ritmo de ayer de Pulse, el pronostico del clima de hoy, eventos proximos, actividad reciente de competidores y senales del mercado - en un briefing priorizado. No un tablero que tengas que revisar. Inteligencia que llega a ti.",
        capabilities: [
          "Briefing diario con datos internos y externos",
          "Recomendaciones priorizadas por impacto en ingresos",
          "Entrega por email, Telegram, Slack o dentro de la app",
          "Feed de senales con acciones de descartar y reconocer",
          "Digest semanal de inteligencia competitiva",
        ],
        icon: "intelligence" as SundaeIconName,
        color: "from-red-500 to-red-600",
      },
      {
        title: "Inteligencia competitiva",
        headline: "Sabe lo que estan haciendo tus competidores",
        description:
          "Haz seguimiento de competidores concretos, no de promedios anonimos. Watchtower monitorea a diario sus valoraciones de Google, reseñas, horarios y presencia publica. El analisis de sentimiento extrae lo que los clientes aman y odian de cada competidor. Recibe alertas cuando baja una calificacion o abre un nuevo restaurante cerca.",
        capabilities: [
          "Seguimiento de mas de 10 competidores por ubicacion",
          "Descubrimiento automatico por ubicacion, cocina y rango de precio",
          "Seguimiento continuo de precios de menu de competidores",
          "Monitoreo diario de reseñas y valoraciones",
          "Analisis de sentimiento por tema",
          "Alertas de actividad competitiva",
          "Seguimiento de tendencias durante 12 semanas",
        ],
        icon: "balance" as SundaeIconName,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Inteligencia de eventos y calendario",
        headline: "Eventos locales que mueven tus numeros",
        description:
          "Un concierto este fin de semana significa 40% mas trafico durante la cena. Ramadan implica un cambio fundamental en tu mix diario durante 30 dias. Watchtower descubre eventos cerca de tu restaurante y genera estimaciones de impacto: cambio esperado de demanda, recomendaciones de personal y guias de preparacion adaptadas a tu ubicacion.",
        capabilities: [
          "Descubrimiento de eventos locales dentro de un radio configurable",
          "Calendario de festivos y observancias religiosas",
          "Inteligencia especifica para Ramadan",
          "Analisis de impacto con recomendaciones de personal y preparacion",
          "Integracion con Pulse para ritmo sensible a eventos",
        ],
        icon: "growth" as SundaeIconName,
        color: "from-purple-500 to-purple-600",
      },
      {
        title: "Mercado y tendencias",
        headline: "Tu mercado de un vistazo",
        description:
          "Cuantos restaurantes operan en un radio de 5 km? Cual es la calificacion media? Quien abrio el mes pasado y quien cerro? Watchtower construye una imagen viva de tu panorama local y saca a la superficie senales cuando cambia algo importante.",
        capabilities: [
          "Mapeo del panorama de restaurantes por distrito",
          "Deteccion de nuevas aperturas y cierres",
          "Tendencias de valoracion y precios por segmento",
          "Senales macroeconomicas",
          "Senales de mercado mostradas de forma proactiva",
          "Cadena cross-intelligence hacia Foresight",
          "Visuales financieros especificos para IVA, hoteles y franquicias",
        ],
        icon: "multiLocation" as SundaeIconName,
        color: "from-orange-500 to-orange-600",
      },
    ],
    pricingHeading: "Precios de Watchtower",
    pricingDescription: "Disponible en los planes Core. Elige componentes individuales o ahorra alrededor de 18% con el bundle completo.",
    pricingCards: [
      { name: "Inteligencia competitiva", price: "$549", perLoc: "+$69/ubicacion" },
      { name: "Eventos y calendario", price: "$249", perLoc: "+$39/ubicacion" },
      { name: "Tendencias del mercado", price: "$299", perLoc: "+$29/ubicacion" },
      { name: "Bundle completo", price: "$899", perLoc: "+$109/ubicacion", highlight: true },
    ],
    faqHeading: "Preguntas frecuentes",
    faqs: [
      { q: "Cuantos competidores puedo seguir?", a: "Hasta mas de 10 competidores por ubicacion." },
      { q: "Puedo seguir competidores distintos en cada ubicacion?", a: "Si, cada ubicacion tiene su propio conjunto." },
      { q: "Cada cuanto se actualizan los datos?", a: "Monitoreo diario automatizado con deteccion de cambios." },
      { q: "Watchtower requiere Core?", a: "Si, esta disponible en Core Lite, Core Pro y Enterprise." },
      { q: "Puedo usar solo un tipo de inteligencia?", a: "Si, elige lo que necesites o toma el bundle completo." },
      { q: "Como funciona el informe diario?", a: "Combina los datos de Pulse del dia anterior con las senales externas de hoy." },
    ],
    ctaTitle: "Agrega inteligencia externa a tu plataforma",
    ctaDescription: "Ve tu negocio dentro del contexto completo del mercado. No te vuelvas a sorprender.",
    ctaAdd: "Agregar a tu plan",
    ctaDemo: "Verlo en accion",
    ctaSales: "Hablar con ventas",
  },
} as const;

export default function WatchtowerPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = localizedWatchtowerCopy[locale] ?? localizedWatchtowerCopy.en;
  const pricingCards = [...(ui.pricingCards as readonly { name: string; price: string; perLoc: string; highlight?: boolean }[])];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.heroBadge} title={ui.heroTitle} description={ui.heroDescription}>
        <p className="text-[var(--text-muted)] mb-8 max-w-3xl mx-auto body-lg">
          <strong>{ui.heroNote}</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="cta" size="lg" href={PRICING_URL}>
            {ui.heroPrimary}
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => cta("/demo", "book_demo_watchtower", { page: "/product/watchtower" })}
          >
            {ui.heroSecondary}
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <WatchtowerMockup />
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.introHeading}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.introDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {ui.introCards.map((item) => (
              <StaggerItem key={item.title} className="text-center p-6 bg-[var(--surface-subtle)] rounded-xl">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SundaeIcon name={item.icon} size="lg" className="text-white" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-supporting)]">{item.text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <p className="eyebrow text-red-500 mb-4">{ui.internalEyebrow}</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.internalHeading}</h2>
              <p className="body-lg text-[var(--text-supporting)]">{ui.internalDescription}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <WatchtowerMockup />
            </FadeUp>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              {ui.featureEyebrow}
            </p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.featureHeading}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.featureDescription}</p>
          </FadeUp>

          <div className="space-y-8">
            {ui.features.map((block, index) => (
              <FadeUp key={block.title} delay={index * 0.1}>
                <Card variant="elevated" className="hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${block.color} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={block.icon} size="xl" className="text-white" />
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 bg-gradient-to-r ${block.color} text-white text-xs font-semibold rounded-full mb-2`}>
                            {block.title}
                          </span>
                          <CardTitle className="text-2xl text-[var(--text-primary)]">{block.headline}</CardTitle>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)] text-lg mb-6">{block.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-3">Key capabilities:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {block.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm text-[var(--text-supporting)]">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.pricingHeading}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.pricingDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingCards.map((item) => (
              <StaggerItem key={item.name} className={`p-6 rounded-xl text-center ${item.highlight ? "bg-red-600" : "bg-[var(--navy-deep)] border border-[var(--border-default)]"}`}>
                <h3 className={`font-semibold mb-2 ${item.highlight ? "text-white" : "text-[var(--text-primary)]"}`}>{item.name}</h3>
                <p className={`text-3xl font-bold mb-1 ${item.highlight ? "text-white" : "text-[var(--text-primary)]"}`}>{item.price}</p>
                <p className={`text-sm ${item.highlight ? "text-red-100" : "text-[var(--text-muted)]"}`}>/month {item.perLoc}</p>
                {item.highlight && <p className="text-xs text-red-200 mt-2">Save ~18% vs. individual</p>}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.faqHeading}</h2>
          </FadeUp>

          <div className="space-y-6">
            {ui.faqs.map((faq, index) => (
              <FadeUp key={index} delay={index * 0.05}>
                <div className="p-6 bg-[var(--surface-faint)] rounded-xl">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">{faq.q}</h3>
                  <p className="text-[var(--text-supporting)] leading-relaxed">{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <SundaeIcon name="cost" size="lg" className="text-white" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">{ui.ctaAdd}</h3>
            <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">See Watchtower pricing for your operation</p>
            <Button variant="primary" size="md" className="w-full" href={PRICING_URL}>
              {ui.heroPrimary} →
            </Button>
          </StaggerItem>
          <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
            <div className="w-12 h-12 bg-[#1C47FF] rounded-full flex items-center justify-center mx-auto mb-3">
              <SundaeIcon name="visibility" size="lg" className="text-white" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">{ui.ctaDemo}</h3>
            <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">Watch Watchtower demo</p>
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => cta("/demo", "watch_watchtower_demo", { page: "/product/watchtower" })}
            >
              {ui.ctaDemo} →
            </Button>
          </StaggerItem>
          <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <SundaeIcon name="conversation" size="lg" className="text-white" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">{ui.ctaSales}</h3>
            <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">Custom Watchtower configuration</p>
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => cta("/contact", "contact_watchtower_sales", { page: "/product/watchtower" })}
            >
              {ui.ctaSales} →
            </Button>
          </StaggerItem>
        </StaggerContainer>
      </PageCTA>
    </div>
  );
}
