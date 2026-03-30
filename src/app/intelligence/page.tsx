'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { SIGNUP_URL } from "@/lib/urls";
import { IntelligenceChatMockup } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

const localizedChatCopy = {
  en: {
    heroBadge: "Sundae Intelligence",
    heroTitle: "Ask Your Data Anything. Get Answers in Seconds.",
    heroDescription:
      "Natural language questions, structured visual answers - powered by your POS, inventory, labor, and delivery data in real time.",
    heroPrimary: "Try It Free",
    heroSecondary: "Book a Demo",
    platforms: ["Web App", "Telegram", "Slack", "Microsoft Teams", "Voice Input"],
    modesTitle: "Four Specialized Modes",
    modesDescription: "Each mode changes how intelligence is generated - from quick Q&A to stakeholder-ready reports.",
    askTitle: "Ask Anything About Your Business",
    askDescription: "From quick checks to deep analysis - just type, speak, or use a slash command.",
    commandTitle: "Smart Command Bar",
    commandDescription: "Autocomplete, slash commands, voice input, @mentions, and file attachments.",
    responseTitle: "Rich, Interactive Response Cards",
    responseDescription: "Structured, interactive cards - not plain text. Every response is visual and explorable.",
    anomalyTitle: "Proactive Anomaly Detection",
    anomalyDescription: "Continuously scans your data for unusual patterns - surfacing issues before you even think to ask.",
    briefingTitle: "Smart Welcome Briefing",
    briefingDescription: "Every new session starts with a personalized briefing:",
    collaborationTitle: "Organization & Collaboration",
    collaborationDescription: "Pin, folder, schedule, and share - your intelligence workspace, organized your way.",
    differentiatorsTitle: "Why Sundae Intelligence Is Different",
    differentiatorsDescription: "Not another dashboard. A fundamentally different approach to decision intelligence.",
    marketTitle: "Built for Every Market",
    ctaTitle: "Your Data Has Answers",
    ctaDescription: "Start a conversation with your restaurant data today.",
    modes: [
      { title: "Chat", shortcut: "⌘ 1", description: "Ask anything about your data. Get structured answers with interactive charts and KPI cards.", icon: "conversation", badge: "Default" },
      { title: "Analyst", shortcut: "⌘ 2", description: "Deep analysis with clarifying questions, confidence levels, and cross-referenced data sources.", icon: "insights", badge: "Deep Dive" },
      { title: "Monitor", shortcut: "⌘ 3", description: "Auto-refreshing KPI dashboard. 60-second cycles. Highlights anomalies exceeding 15% deviation.", icon: "pulse", badge: "Real-time" },
      { title: "Report", shortcut: "⌘ 4", description: "Stakeholder-ready reports with executive summary, key metrics, and recommendations.", icon: "document", badge: "Executive" },
    ],
    commandFeatures: [
      { title: "Smart Autocomplete", description: "Suggests recent queries, metric names, and data fields as you type - powered by your connected data sources.", icon: "search" },
      { title: "9 Slash Commands", description: "/compare, /report, /alert, /schedule, /export, /forecast, /benchmark, /explain, /share - each triggers an optimized intelligence prompt.", icon: "speed" },
      { title: "Voice Input & Wake Word", description: "Click the mic to dictate queries, or enable \"Hey Sundae\" always-listening mode for hands-free operation.", icon: "device" },
      { title: "File Attachments", description: "Attach CSV, Excel, images, or screenshots - ask questions about uploaded data with inline preview and parsing.", icon: "data" },
    ],
    responseCards: [
      { title: "KPI Cards", description: "Single metrics with value, period-over-period change, 7-day sparklines, and segment breakdown charts.", icon: "chart" },
      { title: "Interactive Charts", description: "Bar, line, area, pie, and scatter - with type switching, click drill-down, annotations, fullscreen, and CSV export.", icon: "dashboard" },
      { title: "Analysis Cards", description: "Structured insights with sentiment tagging (positive/negative/neutral) and supporting data evidence.", icon: "insights" },
      { title: "Comparison Cards", description: "Side-by-side metric comparisons across locations, time periods, or menu categories with variance highlighting.", icon: "benchmarking" },
    ],
    anomalyTypes: [
      "Revenue anomaly (vs. 30-day average)",
      "Order count spikes or drops",
      "Average ticket size shifts",
      "Off-hours activity detection",
      "Top-selling item changes",
      "Payment method shifts",
    ],
    differentiators: [
      { title: "Conversational, Not Dashboard-Based", description: "No dashboards to configure. No reports to build. Ask a question, get a visual answer in seconds.", icon: "conversation" },
      { title: "Finds Problems Before You Do", description: "Continuously monitors revenue, orders, tickets, and menu performance - surfacing anomalies before they become expensive.", icon: "alerts" },
      { title: "Interactive Charts with Drill-Down", description: "Click any data point to explore deeper. Leave annotations for your team. Toggle chart types on the fly.", icon: "chart" },
      { title: "Scheduled Intelligence Delivery", description: "Daily, weekly, or monthly insights delivered via email, Slack, Telegram, Teams, or webhook.", icon: "schedule" },
      { title: "Connected to Everything", description: "Pulls from every connected source - POS, labor, inventory, reservations, delivery. Fully scoped per organization.", icon: "integration" },
      { title: "Decision Tracking", description: "Track what you did with each insight. Log actions taken, items monitored, or decisions dismissed.", icon: "success" },
    ],
    queries: [
      "What was my best-selling item last Thursday?",
      "Compare labor costs across my downtown locations",
      "Why did revenue drop at Location 5 this week?",
      "Show me locations where labor cost exceeded 32%",
      "/forecast next week's revenue for all outlets",
      "/benchmark my RevPASH against nearby competitors",
    ],
    collaborationSections: [
      { title: "Thread Management", items: ["Pin important conversations", "Create folders and drag to organize", "Cross-folder collections", "Smart date grouping (Today, This Week, etc.)", "Search across all thread content"], icon: "insights" },
      { title: "Scheduled Reports", items: ["Daily, weekly, monthly, or custom cron", "Deliver via email, Slack, Telegram, Teams, webhook", "Toggle active/paused per schedule", "Run Now for instant delivery", "Execution tracking with failure alerts"], icon: "schedule" },
      { title: "Team Features", items: ["Share dialog with permission levels", "@Mention team members in queries", "Decision log (Action Taken / Monitoring / Dismissed)", "Context panel with SQL, sources, and latency", "Feedback per message (thumbs up/down)"], icon: "operators" },
    ],
    marketFeatures: ["RTL / Arabic Support", "Full Keyboard Shortcuts", "Dark Mode", "Mobile Responsive", "ARIA Accessible", "Real-time Streaming", "4 Database Connectors", "Multi-Tenant Isolation"],
  },
  ar: {
    heroBadge: "Sundae Intelligence",
    heroTitle: "اسأل بياناتك أي شيء. واحصل على إجابات خلال ثوانٍ.",
    heroDescription:
      "أسئلة باللغة الطبيعية، وإجابات مرئية منظمة - مدعومة ببيانات نقاط البيع والمخزون والعمالة والتوصيل في الوقت الفعلي.",
    heroPrimary: "جرّبه مجانًا",
    heroSecondary: "احجز عرضًا",
    platforms: ["تطبيق الويب", "Telegram", "Slack", "Microsoft Teams", "الإدخال الصوتي"],
    modesTitle: "أربعة أوضاع متخصصة",
    modesDescription: "كل وضع يغيّر طريقة توليد الذكاء - من أسئلة سريعة إلى تقارير جاهزة للإدارة.",
    askTitle: "اسأل أي شيء عن عملك",
    askDescription: "من الفحوصات السريعة إلى التحليل العميق - اكتب أو تحدث أو استخدم أمرًا سريعًا.",
    commandTitle: "شريط أوامر ذكي",
    commandDescription: "إكمال تلقائي، وأوامر مائلة، وإدخال صوتي، و@الإشارة إلى الزملاء، وإرفاق الملفات.",
    responseTitle: "بطاقات استجابة غنية وتفاعلية",
    responseDescription: "بطاقات منظمة وقابلة للاستكشاف - ليست مجرد نص عادي.",
    anomalyTitle: "اكتشاف استباقي للشذوذ",
    anomalyDescription: "يفحص بياناتك باستمرار بحثًا عن أنماط غير معتادة - ويكشف المشاكل قبل أن تفكر بالسؤال عنها.",
    briefingTitle: "موجز ترحيبي ذكي",
    briefingDescription: "تبدأ كل جلسة جديدة بموجز مخصص:",
    collaborationTitle: "المنظمة والتعاون",
    collaborationDescription: "تثبيت، ومجلدات، وجدولة، ومشاركة - مساحة ذكائك بترتيبك أنت.",
    differentiatorsTitle: "لماذا Sundae Intelligence مختلفة",
    differentiatorsDescription: "ليست لوحة تحكم أخرى. إنها طريقة مختلفة جذريًا لذكاء القرار.",
    marketTitle: "مصمم لكل سوق",
    ctaTitle: "لدى بياناتك إجابات",
    ctaDescription: "ابدأ محادثة مع بيانات مطعمك اليوم.",
    modes: [
      { title: "محادثة", shortcut: "⌘ 1", description: "اسأل أي شيء عن بياناتك. احصل على إجابات منظمة مع رسوم تفاعلية وبطاقات KPI.", icon: "conversation", badge: "افتراضي" },
      { title: "محلل", shortcut: "⌘ 2", description: "تحليل عميق مع أسئلة توضيحية ومستويات ثقة ومصادر بيانات مترابطة.", icon: "insights", badge: "تعمق" },
      { title: "مراقبة", shortcut: "⌘ 3", description: "لوحة KPI تتحدث تلقائيًا. دورات كل 60 ثانية. تبرز الشذوذات التي تتجاوز 15%.", icon: "pulse", badge: "فوري" },
      { title: "تقرير", shortcut: "⌘ 4", description: "تقارير جاهزة لأصحاب المصلحة مع ملخص تنفيذي ومقاييس رئيسية وتوصيات.", icon: "document", badge: "تنفيذي" },
    ],
    commandFeatures: [
      { title: "إكمال ذكي", description: "يقترح الاستعلامات الحديثة وأسماء المقاييس وحقول البيانات أثناء الكتابة - اعتمادًا على مصادر بياناتك المتصلة.", icon: "search" },
      { title: "9 أوامر مائلة", description: "/compare و/report و/alert و/schedule و/export و/forecast و/benchmark و/explain و/share - كل منها يطلق مطالبة ذكاء محسّنة.", icon: "speed" },
      { title: "إدخال صوتي وكلمة تنبيه", description: "انقر على الميكروفون لتملي الاستعلامات، أو فعّل وضع \"Hey Sundae\" للاستماع الدائم.", icon: "device" },
      { title: "مرفقات الملفات", description: "أرفق CSV أو Excel أو صورًا أو لقطات شاشة - واسأل عن البيانات المرفوعة مع معاينة وتحليل داخلية.", icon: "data" },
    ],
    responseCards: [
      { title: "بطاقات KPI", description: "مقاييس مفردة مع القيمة، والتغير مقابل الفترة السابقة، وخطوط 7 أيام، ورسوم تفصيلية للقطاعات.", icon: "chart" },
      { title: "رسوم تفاعلية", description: "أعمدة وخطوط ومساحات ودائرية ومبعثرة - مع تبديل النوع، والتعمق بالنقر، والتعليقات، والتكبير، والتصدير CSV.", icon: "dashboard" },
      { title: "بطاقات تحليل", description: "رؤى منظمة مع وسم للمشاعر (إيجابي/سلبي/محايد) وأدلة داعمة من البيانات.", icon: "insights" },
      { title: "بطاقات مقارنة", description: "مقارنات جنبًا إلى جنب بين المواقع أو الفترات أو فئات القائمة مع إبراز الفروقات.", icon: "benchmarking" },
    ],
    anomalyTypes: [
      "شذوذ الإيرادات (مقارنة بمتوسط 30 يومًا)",
      "ارتفاعات أو انخفاضات في عدد الطلبات",
      "تغيرات في متوسط قيمة الفاتورة",
      "اكتشاف نشاط خارج ساعات العمل",
      "تغيرات في الأصناف الأكثر مبيعًا",
      "تحولات في طريقة الدفع",
    ],
    differentiators: [
      { title: "محادثة وليست لوحات", description: "لا حاجة لإعداد لوحات أو بناء تقارير. اسأل واحصل على إجابة مرئية خلال ثوانٍ.", icon: "conversation" },
      { title: "يكتشف المشاكل قبل أن تفعل", description: "يراقب الإيرادات والطلبات والتذاكر وأداء القائمة باستمرار - ويكشف الشذوذ قبل أن يصبح مكلفًا.", icon: "alerts" },
      { title: "رسوم قابلة للتعمق", description: "انقر على أي نقطة بيانات لاستكشافها أكثر. أضف ملاحظات لفريقك وبدّل أنواع الرسوم بسرعة.", icon: "chart" },
      { title: "توصيل مجدول للذكاء", description: "رؤى يومية أو أسبوعية أو شهرية تصل عبر البريد أو Slack أو Telegram أو Teams أو webhook.", icon: "schedule" },
      { title: "متصل بكل شيء", description: "يسحب من كل مصدر متصل - POS والعمالة والمخزون والحجوزات والتوصيل - ضمن نطاق كل منظمة.", icon: "integration" },
      { title: "تتبع القرار", description: "تابع ما فعلته بكل رؤية: إجراء تم اتخاذه، عنصر قيد المراقبة، أو قرار تم رفضه.", icon: "success" },
    ],
    queries: [
      "ما هو الصنف الأكثر مبيعًا يوم الخميس الماضي؟",
      "قارن تكاليف العمالة بين مواقع وسط المدينة",
      "لماذا انخفضت الإيرادات في الموقع 5 هذا الأسبوع؟",
      "أرني المواقع التي تجاوزت فيها تكلفة العمالة 32%",
      "/forecast توقع الإيرادات للأسبوع القادم لكل الفروع",
      "/benchmark قارن RevPASH مع المنافسين القريبين",
    ],
    collaborationSections: [
      { title: "إدارة المحادثات", items: ["تثبيت المحادثات المهمة", "إنشاء مجلدات وسحبها لتنظيمها", "مجموعات عبر المجلدات", "تجميع ذكي حسب التاريخ (اليوم، هذا الأسبوع...)", "البحث عبر كل محتوى المحادثات"], icon: "insights" },
      { title: "التقارير المجدولة", items: ["يوميًا أو أسبوعيًا أو شهريًا أو cron مخصص", "الإرسال عبر البريد وSlack وTelegram وTeams وwebhook", "تبديل التشغيل/الإيقاف لكل جدول", "Run Now للإرسال الفوري", "تتبع التنفيذ مع تنبيهات الفشل"], icon: "schedule" },
      { title: "ميزات الفريق", items: ["مشاركة مع مستويات صلاحيات", "الإشارة إلى أعضاء الفريق داخل الاستعلامات", "سجل القرار (إجراء / مراقبة / تجاهل)", "لوحة سياق مع SQL والمصادر والزمن", "تقييم لكل رسالة (إعجاب/عدم إعجاب)"], icon: "operators" },
    ],
    marketFeatures: ["دعم RTL / العربية", "اختصارات لوحة مفاتيح كاملة", "الوضع الداكن", "متجاوب على الهاتف", "متوافق مع ARIA", "بث فوري", "4 موصلات قواعد بيانات", "عزل متعدد المستأجرين"],
  },
  fr: {
    heroBadge: "Sundae Intelligence",
    heroTitle: "Posez n'importe quelle question à vos données. Obtenez une réponse en quelques secondes.",
    heroDescription:
      "Questions en langage naturel, réponses visuelles structurées - alimentées en temps réel par vos données POS, stock, main-d'oeuvre et livraison.",
    heroPrimary: "Essayer gratuitement",
    heroSecondary: "Reserver une demo",
    platforms: ["Application web", "Telegram", "Slack", "Microsoft Teams", "Saisie vocale"],
    modesTitle: "Quatre modes specialises",
    modesDescription: "Chaque mode change la manière dont l'intelligence est générée - du Q&A rapide aux rapports prêts pour les parties prenantes.",
    askTitle: "Posez n'importe quoi sur votre activité",
    askDescription: "Du contrôle rapide à l'analyse approfondie - tapez, parlez ou utilisez une commande slash.",
    commandTitle: "Barre de commandes intelligente",
    commandDescription: "Auto-complétion, commandes slash, saisie vocale, @mentions et pièces jointes.",
    responseTitle: "Cartes de réponse riches et interactives",
    responseDescription: "Des cartes structurées et explorables - pas du texte brut.",
    anomalyTitle: "Détection proactive des anomalies",
    anomalyDescription: "Analyse en continu vos données pour repérer des schémas inhabituels avant même que vous ne posiez la question.",
    briefingTitle: "Briefing d'accueil intelligent",
    briefingDescription: "Chaque nouvelle session commence par un briefing personnalisé :",
    collaborationTitle: "Organisation et collaboration",
    collaborationDescription: "Épingler, classer, planifier et partager - votre espace d'intelligence, organisé à votre manière.",
    differentiatorsTitle: "Pourquoi Sundae Intelligence est différent",
    differentiatorsDescription: "Pas un dashboard de plus. Une approche fondamentalement différente de l'intelligence décisionnelle.",
    marketTitle: "Pensé pour tous les marchés",
    ctaTitle: "Vos données ont des réponses",
    ctaDescription: "Commencez une conversation avec vos données restaurant dès aujourd'hui.",
    modes: [
      { title: "Chat", shortcut: "⌘ 1", description: "Posez n'importe quelle question sur vos données. Obtenez des réponses structurées avec graphiques interactifs et cartes KPI.", icon: "conversation", badge: "Par défaut" },
      { title: "Analyste", shortcut: "⌘ 2", description: "Analyse approfondie avec questions de clarification, niveaux de confiance et sources croisées.", icon: "insights", badge: "Approfondi" },
      { title: "Surveillance", shortcut: "⌘ 3", description: "Tableau KPI à rafraîchissement automatique. Cycles de 60 secondes. Met en évidence les anomalies de plus de 15%.", icon: "pulse", badge: "Temps réel" },
      { title: "Rapport", shortcut: "⌘ 4", description: "Rapports prêts à être partagés avec résumé exécutif, métriques clés et recommandations.", icon: "document", badge: "Exécutif" },
    ],
    commandFeatures: [
      { title: "Auto-complétion intelligente", description: "Suggère des requêtes récentes, noms de métriques et champs de données au fil de la saisie - alimenté par vos sources connectées.", icon: "search" },
      { title: "9 commandes slash", description: "/compare, /report, /alert, /schedule, /export, /forecast, /benchmark, /explain, /share - chacune déclenche un prompt optimisé.", icon: "speed" },
      { title: "Voix et mot d'activation", description: "Cliquez sur le micro pour dicter, ou activez le mode toujours à l'écoute \"Hey Sundae\".", icon: "device" },
      { title: "Pièces jointes", description: "Ajoutez CSV, Excel, images ou captures d'écran - posez des questions sur les données importées avec aperçu et parsing intégrés.", icon: "data" },
    ],
    responseCards: [
      { title: "Cartes KPI", description: "Métriques uniques avec valeur, variation, courbes 7 jours et répartition par segment.", icon: "chart" },
      { title: "Graphiques interactifs", description: "Barres, lignes, aires, secteurs et nuages de points - avec changement de type, drill-down, annotations, plein écran et export CSV.", icon: "dashboard" },
      { title: "Cartes d'analyse", description: "Insights structurés avec étiquetage des sentiments et preuves de données à l'appui.", icon: "insights" },
      { title: "Cartes de comparaison", description: "Comparaisons côte à côte entre sites, périodes ou catégories avec mise en évidence des écarts.", icon: "benchmarking" },
    ],
    anomalyTypes: [
      "Anomalie de chiffre d'affaires (vs moyenne 30 jours)",
      "Pics ou baisses du nombre de commandes",
      "Variation du ticket moyen",
      "Détection d'activité hors horaires",
      "Changements des articles les plus vendus",
      "Changements de méthode de paiement",
    ],
    differentiators: [
      { title: "Conversation, pas dashboard", description: "Aucun tableau à configurer. Aucun rapport à construire. Posez une question, obtenez une réponse visuelle en secondes.", icon: "conversation" },
      { title: "Détecte les problèmes avant vous", description: "Surveille en continu revenus, commandes, tickets et performances du menu - et remonte les anomalies avant qu'elles ne coûtent cher.", icon: "alerts" },
      { title: "Graphiques interactifs avec détail", description: "Cliquez sur n'importe quel point pour approfondir. Ajoutez des annotations pour votre équipe. Changez le type de graphique à la volée.", icon: "chart" },
      { title: "Diffusion planifiée", description: "Informations quotidiennes, hebdomadaires ou mensuelles envoyées par e-mail, Slack, Telegram, Teams ou webhook.", icon: "schedule" },
      { title: "Connecté à tout", description: "Se branche sur chaque source connectée - POS, main-d'oeuvre, stock, réservations, livraison. Portée complète par organisation.", icon: "integration" },
      { title: "Suivi des décisions", description: "Suivez ce que vous avez fait pour chaque insight. Journalisez les actions, les éléments surveillés ou les décisions rejetées.", icon: "success" },
    ],
    queries: [
      "Quel article s'est le mieux vendu jeudi dernier ?",
      "Compare les coûts de main-d'oeuvre entre mes sites du centre-ville",
      "Pourquoi le chiffre d'affaires a-t-il baissé au site 5 cette semaine ?",
      "Montre-moi les sites où le coût de main-d'oeuvre a dépassé 32%",
      "/forecast le chiffre d'affaires de la semaine prochaine pour tous les sites",
      "/benchmark mon RevPASH face aux concurrents proches",
    ],
    collaborationSections: [
      { title: "Gestion des fils", items: ["Épingler les conversations importantes", "Créer des dossiers et organiser par glisser-déposer", "Collections multi-dossiers", "Regroupement intelligent par date (Aujourd'hui, Cette semaine...)", "Recherche dans tout le contenu"], icon: "insights" },
      { title: "Rapports planifiés", items: ["Quotidien, hebdomadaire, mensuel ou cron personnalisé", "Envoi par e-mail, Slack, Telegram, Teams, webhook", "Basculer actif/en pause par planning", "Run Now pour un envoi immédiat", "Suivi d'exécution avec alertes d'échec"], icon: "schedule" },
      { title: "Fonctions d'équipe", items: ["Partage avec niveaux d'autorisation", "@Mention des membres dans les requêtes", "Journal des décisions (Action / Surveillance / Ignoré)", "Panneau de contexte avec SQL, sources et latence", "Feedback par message (pouce haut/bas)"], icon: "operators" },
    ],
    marketFeatures: ["Support RTL / arabe", "Raccourcis clavier complets", "Mode sombre", "Responsive mobile", "Accessible ARIA", "Streaming en temps réel", "4 connecteurs de base de données", "Isolation multi-tenant"],
  },
  es: {
    heroBadge: "Sundae Intelligence",
    heroTitle: "Pregunta cualquier cosa a tus datos. Obtén respuestas en segundos.",
    heroDescription:
      "Preguntas en lenguaje natural, respuestas visuales estructuradas - impulsadas por tus datos de POS, inventario, personal y delivery en tiempo real.",
    heroPrimary: "Probar gratis",
    heroSecondary: "Reservar una demo",
    platforms: ["Aplicacion web", "Telegram", "Slack", "Microsoft Teams", "Entrada por voz"],
    modesTitle: "Cuatro modos especializados",
    modesDescription: "Cada modo cambia cómo se genera la inteligencia - desde preguntas rápidas hasta informes listos para dirección.",
    askTitle: "Pregunta cualquier cosa sobre tu negocio",
    askDescription: "Desde comprobaciones rápidas hasta análisis profundo - escribe, habla o usa un comando slash.",
    commandTitle: "Barra de comandos inteligente",
    commandDescription: "Autocompletado, comandos slash, voz, @menciones y adjuntos de archivos.",
    responseTitle: "Tarjetas de respuesta ricas e interactivas",
    responseDescription: "Tarjetas estructuradas y explorables - no texto plano.",
    anomalyTitle: "Detección proactiva de anomalías",
    anomalyDescription: "Escanea continuamente tus datos para encontrar patrones inusuales y mostrar problemas antes de que los busques.",
    briefingTitle: "Resumen de bienvenida inteligente",
    briefingDescription: "Cada sesión nueva empieza con un resumen personalizado:",
    collaborationTitle: "Organizacion y colaboracion",
    collaborationDescription: "Fijar, carpetas, programar y compartir - tu espacio de inteligencia, organizado a tu manera.",
    differentiatorsTitle: "Por qué Sundae Intelligence es diferente",
    differentiatorsDescription: "No es otro dashboard. Es un enfoque radicalmente distinto para la inteligencia de decisiones.",
    marketTitle: "Diseñado para cualquier mercado",
    ctaTitle: "Tus datos tienen respuestas",
    ctaDescription: "Empieza hoy una conversación con los datos de tu restaurante.",
    modes: [
      { title: "Chat", shortcut: "⌘ 1", description: "Pregunta cualquier cosa sobre tus datos. Obtén respuestas estructuradas con gráficos interactivos y tarjetas KPI.", icon: "conversation", badge: "Predeterminado" },
      { title: "Analista", shortcut: "⌘ 2", description: "Análisis profundo con preguntas de aclaración, niveles de confianza y fuentes cruzadas.", icon: "insights", badge: "Profundo" },
      { title: "Monitor", shortcut: "⌘ 3", description: "Panel KPI con auto-refresco. Ciclos de 60 segundos. Resalta anomalías que superan el 15%.", icon: "pulse", badge: "Tiempo real" },
      { title: "Informe", shortcut: "⌘ 4", description: "Informes listos para directivos con resumen ejecutivo, métricas clave y recomendaciones.", icon: "document", badge: "Ejecutivo" },
    ],
    commandFeatures: [
      { title: "Autocompletado inteligente", description: "Sugiere consultas recientes, nombres de métricas y campos de datos mientras escribes - impulsado por tus fuentes conectadas.", icon: "search" },
      { title: "9 comandos slash", description: "/compare, /report, /alert, /schedule, /export, /forecast, /benchmark, /explain, /share - cada uno activa un prompt optimizado.", icon: "speed" },
      { title: "Voz y palabra de activación", description: "Pulsa el micrófono para dictar consultas, o activa el modo siempre escuchando \"Hey Sundae\".", icon: "device" },
      { title: "Adjuntos de archivos", description: "Adjunta CSV, Excel, imágenes o capturas - pregunta sobre los datos subidos con vista previa y parsing integrado.", icon: "data" },
    ],
    responseCards: [
      { title: "Tarjetas KPI", description: "Métricas individuales con valor, variación, sparklines de 7 días y desglose por segmento.", icon: "chart" },
      { title: "Gráficos interactivos", description: "Barras, líneas, áreas, pastel y dispersión - con cambio de tipo, drill-down, anotaciones, pantalla completa y exportación CSV.", icon: "dashboard" },
      { title: "Tarjetas de análisis", description: "Insights estructurados con etiquetado de sentimiento y evidencia de datos de apoyo.", icon: "insights" },
      { title: "Tarjetas comparativas", description: "Comparaciones lado a lado entre ubicaciones, periodos o categorías del menú con resaltado de variaciones.", icon: "benchmarking" },
    ],
    anomalyTypes: [
      "Anomalia de ingresos (vs media de 30 dias)",
      "Picos o caídas en el número de pedidos",
      "Cambios en el ticket medio",
      "Detección de actividad fuera de horario",
      "Cambios en los productos más vendidos",
      "Cambios en el método de pago",
    ],
    differentiators: [
      { title: "Conversacional, no basado en dashboards", description: "No necesitas configurar paneles ni crear informes. Haz una pregunta y obtén una respuesta visual en segundos.", icon: "conversation" },
      { title: "Detecta problemas antes que tú", description: "Supervisa de forma continua ingresos, pedidos, tickets y rendimiento del menú - y muestra anomalías antes de que sean caras.", icon: "alerts" },
      { title: "Gráficos interactivos con detalle", description: "Haz clic en cualquier punto para profundizar. Deja anotaciones para tu equipo. Cambia el tipo de gráfico al vuelo.", icon: "chart" },
      { title: "Entrega programada de inteligencia", description: "Insights diarios, semanales o mensuales enviados por email, Slack, Telegram, Teams o webhook.", icon: "schedule" },
      { title: "Conectado a todo", description: "Extrae datos de cualquier fuente conectada - POS, personal, inventario, reservas, delivery. Alcance completo por organización.", icon: "integration" },
      { title: "Seguimiento de decisiones", description: "Registra lo que hiciste con cada insight: acciones tomadas, elementos monitorizados o decisiones descartadas.", icon: "success" },
    ],
    queries: [
      "¿Cuál fue mi plato más vendido el jueves pasado?",
      "Compara los costes laborales entre mis locales del centro",
      "¿Por qué bajaron los ingresos en la ubicación 5 esta semana?",
      "Muéstrame los locales donde el coste laboral superó el 32%",
      "/forecast los ingresos de la próxima semana para todos los locales",
      "/benchmark mi RevPASH frente a competidores cercanos",
    ],
    collaborationSections: [
      { title: "Gestión de hilos", items: ["Fijar conversaciones importantes", "Crear carpetas y organizar arrastrando", "Colecciones entre carpetas", "Agrupación inteligente por fecha (Hoy, Esta semana...)", "Buscar en todo el contenido"], icon: "insights" },
      { title: "Informes programados", items: ["Diario, semanal, mensual o cron personalizado", "Entrega por email, Slack, Telegram, Teams o webhook", "Alternar activo/pausado por programación", "Run Now para envío inmediato", "Seguimiento con alertas de fallo"], icon: "schedule" },
      { title: "Funciones de equipo", items: ["Compartir con niveles de permiso", "@Mencionar miembros del equipo en consultas", "Registro de decisiones (Acción / Monitoreo / Descartado)", "Panel de contexto con SQL, fuentes y latencia", "Feedback por mensaje (pulgar arriba/abajo)"], icon: "operators" },
    ],
    marketFeatures: ["Soporte RTL / árabe", "Atajos de teclado completos", "Modo oscuro", "Responsive en móvil", "Accesible con ARIA", "Streaming en tiempo real", "4 conectores de base de datos", "Aislamiento multi-tenant"],
  },
} as const;

export default function ChatWithDataPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = localizedChatCopy[locale] ?? localizedChatCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.heroBadge} title={ui.heroTitle} description={ui.heroDescription}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" size="lg" onClick={() => cta(SIGNUP_URL, "try_intelligence_hero", { page: "/intelligence" })}>
            {ui.heroPrimary}
          </Button>
          <Button variant="outline-light" size="lg" onClick={() => cta("/demo", "book_demo_intelligence", { page: "/intelligence" })}>
            {ui.heroSecondary}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {ui.platforms.map((platform) => (
            <span key={platform} className="px-3 py-1.5 bg-[var(--navy-deep)]/10 border border-[var(--border-emphasis)] rounded-full text-xs font-medium text-[var(--text-secondary)]">
              {platform}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
        <FadeUp delay={0.3}>
          <div className="max-w-5xl mx-auto">
            <IntelligenceChatMockup />
          </div>
        </FadeUp>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.modesTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{ui.modesDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ui.modes.map((mode) => (
              <StaggerItem key={mode.title}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                        <SundaeIcon name={mode.icon as SundaeIconName} size="md" className="text-white" />
                      </div>
                      <span className="text-[10px] font-mono bg-[var(--surface-subtle)] text-[var(--text-muted)] px-2 py-1 rounded">{mode.shortcut}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-[var(--text-primary)]">{mode.title}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">{mode.badge}</span>
                    </div>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{mode.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.askTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] mb-12">{ui.askDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ui.queries.map((query) => (
              <StaggerItem key={query} className="bg-[var(--navy-deep)] rounded-xl p-4 text-left border border-[var(--border-default)]">
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  {query.startsWith('/') ? <><span className="text-blue-400 font-semibold">{query.split(' ')[0]}</span> {query.split(' ').slice(1).join(' ')}</> : <>&ldquo;{query}&rdquo;</>}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.commandTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{ui.commandDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ui.commandFeatures.map((feature) => (
              <StaggerItem key={feature.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={feature.icon as SundaeIconName} size="md" className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.responseTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{ui.responseDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ui.responseCards.map((card) => (
              <StaggerItem key={card.title}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={card.icon as SundaeIconName} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{card.title}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.anomalyTitle}</h2>
              <p className="body-lg text-[var(--text-supporting)] mb-6">{ui.anomalyDescription}</p>
              <div className="space-y-3">
                {ui.anomalyTypes.map((anomaly) => (
                  <div key={anomaly} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{anomaly}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-[var(--surface-subtle)] rounded-2xl p-8 border border-[var(--border-default)]">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">{ui.briefingTitle}</h3>
                <p className="text-sm text-[var(--text-supporting)] mb-4">{ui.briefingDescription}</p>
                <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span><span>{locale === "ar" ? "تحية حسب الوقت مع اسمك" : locale === "fr" ? "Accueil selon l'heure avec votre nom" : locale === "es" ? "Saludo según la hora con tu nombre" : "Time-based greeting with your name"}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span><span>{locale === "ar" ? "3 بطاقات KPI حية - الإيرادات اليوم والطلبات وأفضل صنف" : locale === "fr" ? "3 cartes KPI en direct - chiffre d'affaires du jour, commandes et meilleur article" : locale === "es" ? "3 tarjetas KPI en vivo: ingresos de hoy, pedidos y producto top" : "3 live KPI cards - today's revenue, orders, and top item"}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span><span>{locale === "ar" ? "4 اقتراحات ذكية مرتبة حسب الشذوذات النشطة" : locale === "fr" ? "4 suggestions intelligentes priorisées par les anomalies actives" : locale === "es" ? "4 sugerencias inteligentes priorizadas por anomalías activas" : "4 smart suggestions prioritized by active anomalies"}</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span><span>{locale === "ar" ? "مؤشر تغطية البيانات الذي يوضح المصادر المتصلة" : locale === "fr" ? "Indicateur de couverture montrant les sources connectées" : locale === "es" ? "Indicador de cobertura que muestra las fuentes conectadas" : "Data coverage indicator showing connected sources"}</span></li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.collaborationTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{ui.collaborationDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.collaborationSections.map((section) => (
              <StaggerItem key={section.title}>
                <Card variant="elevated" className="h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                      <SundaeIcon name={section.icon as SundaeIconName} size="md" className="text-white" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-supporting)]">
                          <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.differentiatorsTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{ui.differentiatorsDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ui.differentiators.map((diff) => (
              <StaggerItem key={diff.title}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={diff.icon as SundaeIconName} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{diff.title}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{diff.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-8">{ui.marketTitle}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {ui.marketFeatures.map((feature) => (
                <span key={feature} className="px-4 py-2 bg-[var(--surface-subtle)] border border-[var(--border-default)] rounded-full text-sm font-medium text-[var(--text-secondary)]">
                  {feature}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Button variant="cta" size="lg" href={SIGNUP_URL}>{ui.heroPrimary}</Button>
        <Button variant="outline-light" size="lg" href="/demo">{ui.heroSecondary}</Button>
      </PageCTA>
    </div>
  );
}
