'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';

const localized4DCopy = {
  en: {
    heroBadge: 'Decision Intelligence',
    heroTitle: <>From Reports to <span className="text-gradient">Real Intelligence</span></>,
    heroDescription: 'Four dimensions of insight. One complete picture of your business.',
    problemTitle: 'The Problem with Traditional BI',
    problemDescription: 'Most tools show you what happened. Not why. Not how you compare. Not what to do next.',
    problemItems: [
      { title: 'Reactive, Not Proactive', description: "You discover problems at month-end when they're already expensive to fix. No early warnings, no predictive signals.", icon: 'warning' },
      { title: 'No Market Context', description: "You don't know how you compare to competitors, what the market is doing, or whether your performance is good or bad relative to peers.", icon: 'visibility' },
      { title: 'No Recommended Actions', description: "Even when you see a problem, the system doesn't tell you what to do about it. You're left to figure out the next steps on your own.", icon: 'document' },
    ],
    dimensionsTitle: 'Four Dimensions. One Complete View.',
    dimensionsDescription: 'Each dimension builds on the last. Together, they tell the whole story.',
    dimensions: [
      {
        id: '1D',
        title: 'Internal Actuals',
        subtitle: 'What Happened?',
        description: 'This is where most tools stop. Traditional BI platforms show you sales, labor, covers, voids, and waste from your POS, payroll, and inventory systems. But they only tell you what happened in the past, with no context, no comparison, and no prediction.',
        examples: ['Daily sales by location and daypart', 'Labor hours and costs from payroll', 'Inventory usage and waste reports', 'Cover counts and average check', 'Void and comp tracking'],
        icon: 'benchmarking',
        color: 'from-blue-500 to-blue-600',
        textColor: 'text-[#60A5FA]',
        bgColor: 'bg-[rgba(28,71,255,0.1)]',
      },
      {
        id: '2D',
        title: 'Actual vs Plan',
        subtitle: 'What Should Have Happened?',
        description: 'Layer in your budgets, forecasts, and targets. Now you can see variance - are you ahead or behind plan? This adds planning context, but still no market intelligence or predictive power.',
        examples: ['Budget vs actual sales variance', 'Labor cost % against targets', 'Food cost variance by period', 'Location-level performance to plan', 'Forecast accuracy tracking'],
        icon: 'marketing',
        color: 'from-purple-500 to-purple-600',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
      },
      {
        id: '3D',
        title: 'Market & Competitors',
        subtitle: 'How Do We Compare?',
        description: 'Add benchmarks, peer groups, and competitive intelligence. See how your performance stacks up against similar restaurants in your category and region. Understand market context, not just internal metrics.',
        examples: ['Sales per square foot vs peer group', 'Labor cost % compared to benchmarks', 'Competitor pricing and promotions', 'Category and territory trends', 'Market share and positioning'],
        icon: 'watchtower',
        color: 'from-green-500 to-green-600',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
      },
      {
        id: '4D',
        title: 'AI Foresight & Actions',
        subtitle: 'What Will Happen Next, and What Should We Do?',
        description: "The final dimension: predictions, alerts, and AI-generated recommendations. Sundae's multi-agent AI forecasts outcomes, flags anomalies before they escalate, and tells you exactly what action to take.",
        examples: ['Predicted sales and demand forecasts', 'Proactive alerts for labor cost spikes', 'AI-recommended menu pricing changes', 'Staffing optimization suggestions', 'Anomaly detection and root cause analysis'],
        icon: 'forecasting',
        color: 'from-orange-500 to-orange-600',
        textColor: 'text-orange-600',
        bgColor: 'bg-orange-50',
      },
    ],
    alertsTitle: 'What 4D Intelligence Looks Like',
    alertsDescription: 'Proactive alerts. Clear recommendations. Actions you can take today.',
    alerts: [
      { type: 'Labor Cost Alert', location: 'Downtown Location', message: 'Labor cost is 12% above benchmark for similar restaurants. Recommended action: Review scheduling efficiency and consider staffing adjustment.', severity: 'warning', action: 'Review Schedule', icon: 'warning' },
      { type: 'Sales Opportunity', location: 'Airport Location', message: 'Sales trending 8% above forecast. Weather and local events suggest continued strong demand. Recommended action: Increase inventory orders.', severity: 'success', action: 'Adjust Inventory', icon: 'growth' },
      { type: 'Competitor Alert', location: 'Market Area', message: 'Major competitor launched 20% off promotion. Your traffic is down 5% this week. Recommended action: Consider limited-time offer or targeted marketing.', severity: 'info', action: 'Review Promotions', icon: 'watchtower' },
    ],
    impactTitle: 'The Impact on Your Business',
    impactDescription: 'Outcomes that actually move the needle',
    outcomes: [
      { title: 'Higher Margins and Revenue Quality', description: 'Catch margin erosion early, optimize pricing, and reduce waste before it impacts the P&L.', icon: 'finance' },
      { title: 'Faster, More Confident Decisions', description: 'No more waiting for monthly reports. Get real-time intelligence and act on issues as they emerge.', icon: 'speed' },
      { title: 'Less Firefighting, More Proactive Leadership', description: 'Move from reactive management to strategic planning with predictive signals and early warnings.', icon: 'marketing' },
      { title: 'Stronger Competitive Position', description: 'Understand your market context, benchmark against peers, and respond to competitor moves in real-time.', icon: 'growth' },
    ],
    howTitle: 'How It Works',
    howDescription: 'AI-powered analysis at every layer of your operations',
    howItems: [
      { title: 'Unified Data Layer', description: 'Scout integrates 25+ systems - POS, labor, inventory, budgets, and external sources - into one intelligent foundation.', icon: 'integration' },
      { title: 'Multi-Agent AI Engine', description: 'Specialized AI agents analyze patterns, detect anomalies, forecast outcomes, and generate recommendations across all four dimensions.', icon: 'intelligence' },
      { title: 'Actionable Intelligence', description: 'Canvas dashboards, Nexus natural language queries, and proactive alerts deliver insights when and where you need them.', icon: 'insights' },
    ],
    ctaTitle: 'Ready for the Full Picture?',
    ctaDescription: 'See 4D Intelligence with your data. Past, plan, peers, and predictions - all in one view.',
    ctaPrimary: 'Book a Demo',
    ctaSecondary: 'Explore the Architecture',
  },
  ar: {
    heroBadge: 'ذكاء القرار',
    heroTitle: <>من التقارير إلى <span className="text-gradient">الذكاء الحقيقي</span></>,
    heroDescription: 'أربعة أبعاد من الرؤية. صورة واحدة كاملة لعملك.',
    problemTitle: 'مشكلة BI التقليدي',
    problemDescription: 'معظم الأدوات تُريك ما حدث. لا تُريك لماذا. ولا كيف تقارن. ولا ما الذي يجب فعله بعد ذلك.',
    problemItems: [
      { title: 'تفاعلي لا استباقي', description: 'تكتشف المشاكل في نهاية الشهر عندما تكون مكلفة بالفعل. لا إنذارات مبكرة ولا إشارات تنبؤية.', icon: 'warning' },
      { title: 'بلا سياق سوقي', description: 'لا تعرف كيف تقارن بالمنافسين أو ماذا يفعل السوق أو هل أداءك جيد أم سيئ مقارنة بالنظراء.', icon: 'visibility' },
      { title: 'بلا إجراءات موصى بها', description: 'حتى عندما ترى مشكلة، لا يخبرك النظام بما يجب فعله. وتبقى مضطرًا لتحديد الخطوات التالية بنفسك.', icon: 'document' },
    ],
    dimensionsTitle: 'أربعة أبعاد. رؤية كاملة واحدة.',
    dimensionsDescription: 'كل بُعد يبني على الذي قبله. معًا، يروون القصة كاملة.',
    dimensions: [
      { id: '1D', title: 'النتائج الداخلية', subtitle: 'ماذا حدث؟', description: 'هنا تتوقف معظم الأدوات. تعرض منصات BI التقليدية المبيعات والعمالة والحجوزات والهدر من أنظمة POS والرواتب والمخزون. لكنها تخبرك فقط بما حدث في الماضي، من دون سياق أو مقارنة أو توقع.', examples: ['المبيعات اليومية حسب الموقع وفترة اليوم', 'ساعات وتكاليف العمالة من الرواتب', 'استخدام المخزون وتقارير الهدر', 'عدد الضيوف ومتوسط الفاتورة', 'تتبع الإلغاءات والإكراميات'], icon: 'benchmarking', color: 'from-blue-500 to-blue-600', textColor: 'text-[#60A5FA]', bgColor: 'bg-[rgba(28,71,255,0.1)]' },
      { id: '2D', title: 'الفعل مقابل الخطة', subtitle: 'ما الذي كان يجب أن يحدث؟', description: 'أدخل الميزانيات والتوقعات والأهداف. الآن يمكنك رؤية الانحراف - هل أنت متقدم أم متأخر عن الخطة؟ هذا يضيف سياقًا تخطيطيًا، لكنه لا يزال بلا ذكاء سوقي أو قوة تنبؤية.', examples: ['انحراف المبيعات الفعلية عن الميزانية', 'تكلفة العمالة مقابل الأهداف', 'انحراف تكلفة الطعام حسب الفترة', 'الأداء على مستوى الموقع مقابل الخطة', 'تتبع دقة التوقعات'], icon: 'marketing', color: 'from-purple-500 to-purple-600', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
      { id: '3D', title: 'السوق والمنافسون', subtitle: 'كيف نقارن؟', description: 'أضف المقاييس المرجعية ومجموعات النظراء والذكاء التنافسي. شاهد كيف يتماشى أداؤك مع مطاعم مشابهة في فئتك ومنطقتك. افهم سياق السوق، لا المقاييس الداخلية فقط.', examples: ['المبيعات لكل قدم مربع مقابل مجموعة النظراء', 'تكلفة العمالة % مقارنة بالمقاييس المرجعية', 'تسعير المنافسين وعروضهم', 'اتجاهات الفئات والمناطق', 'الحصة السوقية والتموضع'], icon: 'watchtower', color: 'from-green-500 to-green-600', textColor: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '4D', title: 'رؤية الذكاء الاصطناعي والإجراءات', subtitle: 'ماذا سيحدث بعد ذلك، وماذا يجب أن نفعل؟', description: 'البعد الأخير: التوقعات والتنبيهات والتوصيات المولدة بالذكاء الاصطناعي. يتنبأ الذكاء متعدد الوكلاء في Sundae بالنتائج، ويكشف الشذوذ قبل أن يتصاعد، ويخبرك بالإجراء الصحيح.', examples: ['توقعات المبيعات والطلب', 'تنبيهات استباقية لارتفاع تكاليف العمالة', 'تعديلات تسعير القائمة الموصى بها بالذكاء', 'اقتراحات تحسين التوظيف', 'اكتشاف الشذوذ وتحليل السبب الجذري'], icon: 'forecasting', color: 'from-orange-500 to-orange-600', textColor: 'text-orange-600', bgColor: 'bg-orange-50' },
    ],
    alertsTitle: 'كيف يبدو ذكاء 4D',
    alertsDescription: 'تنبيهات استباقية. توصيات واضحة. إجراءات يمكنك اتخاذها اليوم.',
    alerts: [
      { type: 'تنبيه تكلفة العمالة', location: 'موقع وسط المدينة', message: 'تكلفة العمالة أعلى بنسبة 12% من المعيار المرجعي للمطاعم المشابهة. الإجراء الموصى به: مراجعة كفاءة الجدولة والنظر في تعديل التوظيف.', severity: 'warning', action: 'مراجعة الجدول', icon: 'warning' },
      { type: 'فرصة مبيعات', location: 'موقع المطار', message: 'المبيعات أعلى من التوقعات بنسبة 8%. يشير الطقس والأحداث المحلية إلى استمرار الطلب القوي. الإجراء الموصى به: زيادة طلبات المخزون.', severity: 'success', action: 'تعديل المخزون', icon: 'growth' },
      { type: 'تنبيه منافس', location: 'منطقة السوق', message: 'أطلق منافس رئيسي عرضًا بخصم 20%. حركة الزوار لديك منخفضة 5% هذا الأسبوع. الإجراء الموصى به: عرض محدود المدة أو تسويق موجّه.', severity: 'info', action: 'مراجعة العروض', icon: 'watchtower' },
    ],
    impactTitle: 'الأثر على عملك',
    impactDescription: 'نتائج تحرك المؤشر فعليًا',
    outcomes: [
      { title: 'هوامش أعلى وجودة إيرادات أفضل', description: 'اكتشف تآكل الهامش مبكرًا، وحسّن التسعير، وقلل الهدر قبل أن يؤثر على الأرباح والخسائر.', icon: 'finance' },
      { title: 'قرارات أسرع وأكثر ثقة', description: 'لا مزيد من انتظار التقارير الشهرية. احصل على ذكاء لحظي وتصرف مع المشاكل فور ظهورها.', icon: 'speed' },
      { title: 'إدارة استباقية بدلًا من إطفاء الحرائق', description: 'انتقل من الإدارة التفاعلية إلى التخطيط الاستراتيجي عبر إشارات تنبؤية وإنذارات مبكرة.', icon: 'marketing' },
      { title: 'موقع تنافسي أقوى', description: 'افهم سياق السوق، وقارن نفسك بالنظراء، واستجب لتحركات المنافسين لحظيًا.', icon: 'growth' },
    ],
    howTitle: 'كيف يعمل',
    howDescription: 'تحليل مدعوم بالذكاء الاصطناعي في كل طبقة من عملياتك',
    howItems: [
      { title: 'طبقة بيانات موحدة', description: 'يربط Scout أكثر من 25 نظامًا - POS والعمالة والمخزون والميزانيات والمصادر الخارجية - في أساس ذكي واحد.', icon: 'integration' },
      { title: 'محرك ذكاء متعدد الوكلاء', description: 'تحلل الوكلاء المتخصصون الأنماط وتكتشف الشذوذ وتتوقع النتائج وتولّد التوصيات عبر الأبعاد الأربعة.', icon: 'intelligence' },
      { title: 'ذكاء قابل للتنفيذ', description: 'لوحات Canvas واستعلامات Nexus باللغة الطبيعية والتنبيهات الاستباقية تقدّم الرؤى عندما وأين تحتاجها.', icon: 'insights' },
    ],
    ctaTitle: 'هل أنت مستعد للصورة الكاملة؟',
    ctaDescription: 'شاهد ذكاء 4D مع بياناتك. الماضي والخطة والنظراء والتوقعات - كلها في عرض واحد.',
    ctaPrimary: 'احجز عرضًا',
    ctaSecondary: 'استكشف المعمارية',
  },
  fr: {
    heroBadge: 'Intelligence décisionnelle',
    heroTitle: <>Des rapports à <span className="text-gradient">la vraie intelligence</span></>,
    heroDescription: 'Quatre dimensions de compréhension. Une vue complète de votre activité.',
    problemTitle: 'Le problème du BI traditionnel',
    problemDescription: 'La plupart des outils montrent ce qui s’est passé. Pas pourquoi. Pas comment vous vous situez. Pas quoi faire ensuite.',
    problemItems: [
      { title: 'Réactif, pas proactif', description: 'Vous découvrez les problèmes en fin de mois, lorsqu’ils sont déjà coûteux à corriger. Pas d’alerte précoce, pas de signal prédictif.', icon: 'warning' },
      { title: 'Sans contexte marché', description: 'Vous ne savez pas comment vous comparez à vos concurrents, ce que fait le marché ou si votre performance est bonne ou mauvaise.', icon: 'visibility' },
      { title: 'Sans actions recommandées', description: 'Même lorsqu’un problème apparaît, le système ne vous dit pas quoi faire. Vous devez trouver la suite par vous-même.', icon: 'document' },
    ],
    dimensionsTitle: 'Quatre dimensions. Une vue complète.',
    dimensionsDescription: 'Chaque dimension s’appuie sur la précédente. Ensemble, elles racontent toute l’histoire.',
    dimensions: [
      { id: '1D', title: 'Constats internes', subtitle: 'Que s’est-il passé ?', description: 'C’est là que la plupart des outils s’arrêtent. Les BI traditionnels montrent ventes, main-d’oeuvre, couverts, annulations et gaspillage depuis le POS, la paie et l’inventaire. Mais ils ne donnent que le passé, sans contexte ni comparaison.', examples: ['Ventes journalières par site et tranche horaire', 'Heures et coûts de main-d’oeuvre', 'Usage stock et gaspillage', 'Nombre de couverts et ticket moyen', 'Suivi des annulations et offs'], icon: 'benchmarking', color: 'from-blue-500 to-blue-600', textColor: 'text-[#60A5FA]', bgColor: 'bg-[rgba(28,71,255,0.1)]' },
      { id: '2D', title: 'Réel vs plan', subtitle: 'Que devait-il se passer ?', description: 'Ajoutez budgets, prévisions et objectifs. Vous voyez alors l’écart - êtes-vous en avance ou en retard ? Cela ajoute du contexte de planification, mais pas encore d’intelligence marché.', examples: ['Écart ventes budget vs réel', 'Coût main-d’oeuvre vs objectifs', 'Écart coût matière par période', 'Performance par site vs plan', 'Suivi de précision des prévisions'], icon: 'marketing', color: 'from-purple-500 to-purple-600', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
      { id: '3D', title: 'Marché & concurrents', subtitle: 'Comment nous situons-nous ?', description: 'Ajoutez des benchmarks, des groupes de pairs et de l’intelligence concurrentielle. Comparez votre performance à des restaurants similaires dans votre catégorie et votre région.', examples: ['Ventes au m² vs groupe de pairs', 'Coût main-d’oeuvre vs benchmarks', 'Tarifs et promotions concurrents', 'Tendances de catégorie et de territoire', 'Part de marché et positionnement'], icon: 'watchtower', color: 'from-green-500 to-green-600', textColor: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '4D', title: 'Prévision IA & actions', subtitle: 'Que va-t-il se passer ensuite, et que devons-nous faire ?', description: 'La dimension finale : prévisions, alertes et recommandations générées par l’IA. L’IA multi-agents de Sundae prévoit les résultats, détecte les anomalies avant qu’elles ne s’aggravent et indique l’action exacte à prendre.', examples: ['Prévisions de ventes et de demande', 'Alertes proactives sur les pics de coût main-d’oeuvre', 'Recommandations de prix menu', 'Suggestions d’optimisation du staffing', 'Détection d’anomalies et analyse racine'], icon: 'forecasting', color: 'from-orange-500 to-orange-600', textColor: 'text-orange-600', bgColor: 'bg-orange-50' },
    ],
    alertsTitle: 'À quoi ressemble la 4D Intelligence',
    alertsDescription: 'Alertes proactives. Recommandations claires. Actions que vous pouvez prendre aujourd’hui.',
    alerts: [
      { type: 'Alerte coût main-d’oeuvre', location: 'Site centre-ville', message: 'Le coût main-d’oeuvre est 12% au-dessus du benchmark pour des restaurants similaires. Action recommandée : revoir l’efficacité du planning et ajuster les effectifs.', severity: 'warning', action: 'Revoir le planning', icon: 'warning' },
      { type: 'Opportunité de vente', location: 'Site aéroport', message: 'Les ventes sont 8% au-dessus des prévisions. La météo et les événements locaux suggèrent une demande durable. Action recommandée : augmenter les commandes stock.', severity: 'success', action: 'Ajuster le stock', icon: 'growth' },
      { type: 'Alerte concurrent', location: 'Zone marché', message: 'Un concurrent majeur a lancé une promo à -20%. Votre trafic est en baisse de 5% cette semaine. Action recommandée : proposer une offre limitée ou un marketing ciblé.', severity: 'info', action: 'Revoir les promos', icon: 'watchtower' },
    ],
    impactTitle: 'L’impact sur votre activité',
    impactDescription: 'Des résultats qui font vraiment bouger les lignes',
    outcomes: [
      { title: 'Marges plus élevées et revenus de meilleure qualité', description: 'Détectez tôt l’érosion de marge, optimisez les prix et réduisez le gaspillage avant qu’il n’impacte le compte de résultat.', icon: 'finance' },
      { title: 'Décisions plus rapides et plus sûres', description: 'Plus besoin d’attendre les rapports mensuels. Obtenez une intelligence temps réel et agissez dès que les problèmes émergent.', icon: 'speed' },
      { title: 'Moins d’incendies, plus de leadership proactif', description: 'Passez d’une gestion réactive à une planification stratégique grâce aux signaux prédictifs et aux alertes précoces.', icon: 'marketing' },
      { title: 'Position concurrentielle renforcée', description: 'Comprenez votre contexte marché, benchmarkez-vous et répondez aux mouvements concurrents en temps réel.', icon: 'growth' },
    ],
    howTitle: 'Comment ça marche',
    howDescription: 'Une analyse pilotée par l’IA à chaque couche de vos opérations',
    howItems: [
      { title: 'Couche de données unifiée', description: 'Scout intègre plus de 25 systèmes - POS, main-d’oeuvre, inventaire, budgets et sources externes - dans une base intelligente unique.', icon: 'integration' },
      { title: 'Moteur IA multi-agents', description: 'Des agents spécialisés analysent les motifs, détectent les anomalies, prévoient les résultats et génèrent des recommandations sur les quatre dimensions.', icon: 'intelligence' },
      { title: 'Intelligence actionnable', description: 'Les dashboards Canvas, les requêtes en langage naturel de Nexus et les alertes proactives livrent les insights quand et où vous en avez besoin.', icon: 'insights' },
    ],
    ctaTitle: 'Prêt pour la vue complète ?',
    ctaDescription: 'Découvrez la 4D Intelligence avec vos données. Passé, plan, pairs et prévisions - tout dans une seule vue.',
    ctaPrimary: 'Reserver une demo',
    ctaSecondary: 'Explorer l’architecture',
  },
  es: {
    heroBadge: 'Inteligencia de decisiones',
    heroTitle: <>De informes a <span className="text-gradient">inteligencia real</span></>,
    heroDescription: 'Cuatro dimensiones de insight. Una imagen completa de tu negocio.',
    problemTitle: 'El problema del BI tradicional',
    problemDescription: 'La mayoría de las herramientas te muestran qué pasó. No por qué. No cómo comparas. No qué hacer después.',
    problemItems: [
      { title: 'Reactivo, no proactivo', description: 'Descubres los problemas al cierre del mes, cuando ya son caros de corregir. Sin alertas tempranas ni señales predictivas.', icon: 'warning' },
      { title: 'Sin contexto de mercado', description: 'No sabes cómo te comparas con la competencia, qué está haciendo el mercado o si tu rendimiento es bueno o malo frente a pares.', icon: 'visibility' },
      { title: 'Sin acciones recomendadas', description: 'Incluso cuando ves un problema, el sistema no te dice qué hacer. Te toca decidir los siguientes pasos por tu cuenta.', icon: 'document' },
    ],
    dimensionsTitle: 'Cuatro dimensiones. Una vista completa.',
    dimensionsDescription: 'Cada dimensión construye sobre la anterior. Juntas cuentan la historia completa.',
    dimensions: [
      { id: '1D', title: 'Resultados internos', subtitle: '¿Qué pasó?', description: 'Aquí es donde la mayoría de las herramientas se detienen. Las plataformas BI tradicionales muestran ventas, personal, cubiertos, anulaciones y desperdicio desde POS, nómina e inventario. Pero solo cuentan el pasado, sin contexto ni comparación.', examples: ['Ventas diarias por ubicación y franja', 'Horas y costes laborales', 'Uso de inventario y desperdicio', 'Número de cubiertos y ticket medio', 'Seguimiento de anulaciones y cortesías'], icon: 'benchmarking', color: 'from-blue-500 to-blue-600', textColor: 'text-[#60A5FA]', bgColor: 'bg-[rgba(28,71,255,0.1)]' },
      { id: '2D', title: 'Real vs plan', subtitle: '¿Qué debería haber pasado?', description: 'Añade presupuestos, previsiones y objetivos. Ahora ves la variación: ¿vas por delante o por detrás del plan? Esto añade contexto de planificación, pero aún sin inteligencia de mercado ni poder predictivo.', examples: ['Variación de ventas presupuesto vs real', 'Coste laboral frente a objetivos', 'Variación de coste de comida por periodo', 'Rendimiento por ubicación vs plan', 'Seguimiento de precisión de pronósticos'], icon: 'marketing', color: 'from-purple-500 to-purple-600', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
      { id: '3D', title: 'Mercado y competidores', subtitle: '¿Cómo nos comparamos?', description: 'Añade benchmarks, grupos de pares e inteligencia competitiva. Ve cómo se posiciona tu rendimiento frente a restaurantes similares en tu categoría y región.', examples: ['Ventas por metro cuadrado vs grupo par', 'Coste laboral % comparado con benchmarks', 'Precios y promociones de competidores', 'Tendencias de categoría y territorio', 'Cuota de mercado y posicionamiento'], icon: 'watchtower', color: 'from-green-500 to-green-600', textColor: 'text-green-600', bgColor: 'bg-green-50' },
      { id: '4D', title: 'Visión IA y acciones', subtitle: '¿Qué pasará después y qué debemos hacer?', description: 'La dimensión final: predicciones, alertas y recomendaciones generadas por IA. La IA multiagente de Sundae pronostica resultados, marca anomalías antes de que escalen y te dice exactamente qué hacer.', examples: ['Pronósticos de ventas y demanda', 'Alertas proactivas de picos de coste laboral', 'Cambios de precio recomendados por IA', 'Sugerencias de optimización de personal', 'Detección de anomalías y análisis de causa raíz'], icon: 'forecasting', color: 'from-orange-500 to-orange-600', textColor: 'text-orange-600', bgColor: 'bg-orange-50' },
    ],
    alertsTitle: 'Cómo se ve la inteligencia 4D',
    alertsDescription: 'Alertas proactivas. Recomendaciones claras. Acciones que puedes tomar hoy.',
    alerts: [
      { type: 'Alerta de coste laboral', location: 'Ubicación centro', message: 'El coste laboral está un 12% por encima del benchmark para restaurantes similares. Acción recomendada: revisar la eficiencia de horarios y ajustar personal.', severity: 'warning', action: 'Revisar horario', icon: 'warning' },
      { type: 'Oportunidad de ventas', location: 'Ubicación aeropuerto', message: 'Las ventas van un 8% por encima del pronóstico. El clima y los eventos locales sugieren demanda sostenida. Acción recomendada: aumentar pedidos de inventario.', severity: 'success', action: 'Ajustar inventario', icon: 'growth' },
      { type: 'Alerta de competidor', location: 'Zona de mercado', message: 'Un competidor principal lanzó una promoción del 20%. Tu tráfico baja un 5% esta semana. Acción recomendada: considerar una oferta limitada o marketing segmentado.', severity: 'info', action: 'Revisar promociones', icon: 'watchtower' },
    ],
    impactTitle: 'El impacto en tu negocio',
    impactDescription: 'Resultados que realmente mueven la aguja',
    outcomes: [
      { title: 'Mayores márgenes y mejor calidad de ingresos', description: 'Detecta pronto la erosión del margen, optimiza precios y reduce desperdicio antes de que afecte al P&L.', icon: 'finance' },
      { title: 'Decisiones más rápidas y seguras', description: 'Se acabó esperar a informes mensuales. Obtén inteligencia en tiempo real y actúa cuando surjan problemas.', icon: 'speed' },
      { title: 'Menos incendios, más liderazgo proactivo', description: 'Pasa de una gestión reactiva a una planificación estratégica con señales predictivas y alertas tempranas.', icon: 'marketing' },
      { title: 'Posición competitiva más fuerte', description: 'Entiende tu contexto de mercado, compárate con pares y responde a movimientos de competidores en tiempo real.', icon: 'growth' },
    ],
    howTitle: 'Cómo funciona',
    howDescription: 'Análisis impulsado por IA en cada capa de tus operaciones',
    howItems: [
      { title: 'Capa de datos unificada', description: 'Scout integra más de 25 sistemas - POS, personal, inventario, presupuestos y fuentes externas - en una base inteligente única.', icon: 'integration' },
      { title: 'Motor de IA multiagente', description: 'Agentes especializados analizan patrones, detectan anomalías, pronostican resultados y generan recomendaciones en las cuatro dimensiones.', icon: 'intelligence' },
      { title: 'Inteligencia accionable', description: 'Dashboards de Canvas, consultas en lenguaje natural de Nexus y alertas proactivas entregan insights cuando y donde los necesitas.', icon: 'insights' },
    ],
    ctaTitle: '¿Listo para la imagen completa?',
    ctaDescription: 'Ve 4D Intelligence con tus datos. Pasado, plan, pares y predicciones - todo en una sola vista.',
    ctaPrimary: 'Reservar una demo',
    ctaSecondary: 'Explorar la arquitectura',
  },
} as const;

export default function FourDIntelligencePage() {
  const { locale } = useWebsiteI18n();
  const ui = localized4DCopy[locale] ?? localized4DCopy.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="growth" size="md" />
              <span>{ui.heroBadge}</span>
            </div>
            <h1 className="hero-h1 text-[var(--text-primary)] mb-6">{ui.heroTitle}</h1>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto leading-relaxed">{ui.heroDescription}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.problemTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.problemDescription}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card variant="elevated" className="bg-gradient-to-br from-slate-50 to-slate-100">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {ui.problemItems.map((item) => (
                    <div key={item.title} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[var(--surface-faint)]0 rounded-lg flex items-center justify-center text-[var(--text-primary)] flex-shrink-0">
                        <SundaeIcon name={item.icon as SundaeIconName} size="lg" className="text-[var(--text-primary)]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                        <p className="text-[var(--text-supporting)] leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.dimensionsTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.dimensionsDescription}</p>
          </div>

          <div className="space-y-16">
            {ui.dimensions.map((dim, index) => (
              <motion.div key={dim.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card variant="elevated" className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className={`h-2 bg-gradient-to-r ${dim.color}`} />
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-5 gap-8 items-start">
                      <div className="md:col-span-2">
                        <div className={`inline-flex w-20 h-20 bg-gradient-to-br ${dim.color} rounded-2xl items-center justify-center text-white mb-4 shadow-lg`}>
                          <SundaeIcon name={dim.icon as SundaeIconName} size="xl" className="text-[var(--text-primary)]" />
                        </div>
                        <div className={`text-4xl font-bold ${dim.textColor} mb-2`}>{dim.id}</div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{dim.title}</h3>
                        <p className="text-lg font-semibold text-[var(--text-supporting)] mb-4">{dim.subtitle}</p>
                        <p className="text-[var(--text-supporting)] leading-relaxed">{dim.description}</p>
                      </div>

                      <div className="md:col-span-3">
                        <div className={`${dim.bgColor} rounded-xl p-6`}>
                          <h4 className="font-bold text-[var(--text-primary)] mb-4">{locale === 'ar' ? 'أمثلة:' : locale === 'fr' ? 'Exemples :' : locale === 'es' ? 'Ejemplos:' : 'Examples:'}</h4>
                          <ul className="space-y-3">
                            {dim.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <span className={`${dim.textColor} text-xl mt-0.5`}>•</span>
                                <span className="text-[var(--text-secondary)] leading-relaxed">{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.alertsTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.alertsDescription}</p>
          </div>

          <div className="grid gap-8 max-w-5xl mx-auto">
            {ui.alerts.map((alert, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card variant="elevated" className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mt-1 ${
                        alert.severity === 'warning' ? 'bg-yellow-100' : alert.severity === 'success' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <SundaeIcon name={alert.icon as SundaeIconName} size="lg" className={
                          alert.severity === 'warning' ? 'text-yellow-600' : alert.severity === 'success' ? 'text-green-600' : 'text-[#60A5FA]'
                        } />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-[var(--text-primary)]">{alert.type}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' : alert.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.location}
                          </span>
                        </div>
                        <p className="text-[var(--text-supporting)] mb-4 leading-relaxed">{alert.message}</p>
                        <Button variant="outline" size="sm">{alert.action} →</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.impactTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.impactDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ui.outcomes.map((outcome, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                        <SundaeIcon name={outcome.icon as SundaeIconName} size="lg" className="text-[var(--text-primary)]" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-[var(--text-primary)] mb-3">{outcome.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)] leading-relaxed">{outcome.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.howTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.howDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ui.howItems.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card variant="elevated" className="h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                      <SundaeIcon name={item.icon as SundaeIconName} size="xl" className="text-[var(--text-primary)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
                    <p className="text-[var(--text-supporting)] leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="section-h2 mb-6">{ui.ctaTitle}</h2>
            <p className="body-xl mb-8 opacity-90 leading-relaxed">{ui.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="secondary" size="lg" className="bg-[var(--navy-deep)] text-[#60A5FA] hover:bg-[var(--surface-subtle)]">{ui.ctaPrimary}</Button>
              </Link>
              <Link href="/architecture">
                <Button variant="outline-light" size="lg">{ui.ctaSecondary}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
