"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { CreamBreak } from "@/components/ui/CreamBreak";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type RequiredEnglishLocalizedRecord } from '@/lib/i18n';
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_why_sundae_page'
import { whySundaeCreamCopy } from './whySundaeCreamCopy'

type WhySundaeCopy = {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  problems: {
    eyebrow: string;
    title: string;
    description: string;
  };
  differentiators: { title: string; description: string; icon: SundaeIconName; color: string }[];
  comparison: {
    eyebrow: string;
    title: string;
    description: string;
    columns: { title: string; items: string[]; icon: SundaeIconName; highlight: boolean; cta?: string }[];
  };
  roles: {
    eyebrow: string;
    title: string;
    items: { title: string; pain: string; description: string; icon: SundaeIconName; color: string }[];
  };
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

const localizedCopy: RequiredEnglishLocalizedRecord<WhySundaeCopy> = {
  en: {
    hero: {
      badge: "Why Sundae",
      title: "Detection Is Table Stakes. Measured Recovery Isn't.",
      description:
        "Every rival can now spot a problem and recommend a fix. Sundae routes it to one accountable owner, tracks it through execution, and measures the recovered margin back against a baseline - the whole loop, proven per decision.",
    },
    problems: {
      eyebrow: "THE PROBLEM",
      title: "Three gaps costing you money every day",
      description: "Every restaurant group we've worked with faces the same three challenges.",
    },
    differentiators: [
      { title: "12-Domain Data Ingestion", description: "POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting - all unified. No more disconnected systems.", icon: "integration", color: "bg-[#FF5C4D]" },
      { title: "4D Intelligence Model", description: "What happened. How it compares to plan. Where you stand in the market. What to do next. Four dimensions of every decision.", icon: "intelligence", color: "bg-[#FF5C4D]" },
      { title: "Intraday Recovery via Pulse", description: "Catch leakage as it happens, route the fix to the shift owner, and measure the recovered margin - before the shift is over.", icon: "speed", color: "bg-green-600" },
      { title: "External Intelligence via Watchtower", description: "New competitor? Weather tanking covers? Concert announced? You’ll know before it hits your numbers.", icon: "watchtower", color: "bg-red-600" },
      { title: "Conversational Access", description: "Natural language queries via web, Telegram, Slack, or Teams - answers in seconds, not days.", icon: "forge", color: "bg-orange-600" },
      { title: "Built for Multi-Location Operators", description: "Multi-tenant RBAC, portfolio leaderboards, cross-location benchmarking, multi-currency, and region-level drill-downs.", icon: "multiLocation", color: "bg-teal-600" },
    ],
    comparison: {
      eyebrow: "COMPARISON",
      title: "Beyond dashboards that stop at the alert",
      description: "Most platforms show you what happened. Sundae routes the fix to an accountable owner, drives it through execution, and measures the recovered margin against a baseline.",
      columns: [
        { title: "Traditional BI", items: ["Historical reporting", "Manual data pulls", "Siloed metrics", "Reactive management"], icon: "warning", highlight: false },
        { title: "Generic Dashboards", items: ["Multi-source dashboards", "Scheduled reports", "Basic alerting", "No industry context"], icon: "sync", highlight: false },
        { title: "Sundae", items: ["4D Intelligence Model", "Real-time Pulse monitoring", "Market context via Watchtower", "Recovery measured vs baseline"], icon: "speed", highlight: true, cta: "No one owns the full stack. Until now." },
      ],
    },
    roles: {
      eyebrow: "BUILT FOR",
      title: "Built for every role in the organization",
      items: [
        { title: "Operations Leaders", pain: "You can't be in every restaurant at once.", description: "Spot the leak in any location via Pulse and Portfolio, route the fix to the manager on shift, and see the recovery land - before they ask for help.", icon: "multiLocation", color: "bg-[#FF5C4D]" },
        { title: "Finance & FP&A", pain: "3 days to close the books? That's 3 days too many.", description: "Margin variance traced to root cause, routed to an owner, and the recovered value measured against a baseline.", icon: "benchmarking", color: "bg-green-600" },
        { title: "C-Suite & Owners", pain: "Your worst-performing outlet is invisible until Thursday.", description: "Portfolio dashboards, daily briefings, competitive intelligence, and strategic decision views.", icon: "intelligence", color: "bg-[#FF5C4D]" },
        { title: "Technology Teams", pain: "12 vendor APIs. 5 data formats. Zero unified schema.", description: "Public API, webhooks, 12-domain integrations, governed metrics, and RBAC controls out of the box.", icon: "integration", color: "bg-orange-600" },
      ],
    },
    cta: {
      title: "Stop watching margin leak. Start measuring the recovery.",
      description: "30 minutes to review your data together and see whether Sundae would genuinely help your team.",
      primary: "Book a Demo",
      secondary: "Explore Products",
    },
  },
  ar: {
    hero: {
      badge: "لماذا Sundae",
      title: "كشف المشكلة أصبح الحد الأدنى. أما الاستعادة المقاسة فلا.",
      description: "بات كل منافس قادراً على رصد مشكلة واقتراح حل. أما Sundae فتوجّه المشكلة إلى مسؤول واحد محاسَب، وتتابعها حتى التنفيذ، وتقيس الهامش المستعاد مقارنةً بخط أساس - الحلقة كاملة، مثبتة قراراً بقرار.",
    },
    problems: {
      eyebrow: "المشكلة",
      title: "ثلاث فجوات تكلفك المال كل يوم",
      description: "كل مجموعة مطاعم عملنا معها تواجه التحديات الثلاث نفسها.",
    },
    differentiators: [
      { title: "إدخال البيانات عبر 12 مجالاً", description: "POS والعمالة والمخزون والشراء والحجوزات والتوصيل والتسويق وتجربة الضيف وCRM والمحاسبة - كلها موحّدة.", icon: "integration", color: "bg-[#FF5C4D]" },
      { title: "نموذج ذكاء رباعي الأبعاد", description: "ماذا حدث. كيف يقارن بالخطة. أين تقف في السوق. ماذا تفعل بعد ذلك.", icon: "intelligence", color: "bg-[#FF5C4D]" },
      { title: "الاستعادة خلال اليوم عبر Pulse", description: "التقط التسرب لحظة حدوثه، ووجّه الإصلاح إلى مسؤول الوردية، وقِس الهامش المستعاد - قبل انتهاء الوردية.", icon: "speed", color: "bg-green-600" },
      { title: "ذكاء خارجي عبر Watchtower", description: "منافس جديد؟ الطقس يهبط بالمبيعات؟ حفل أُعلن؟ ستعرف قبل أن يؤثر على أرقامك.", icon: "watchtower", color: "bg-red-600" },
      { title: "وصول حواري", description: "استفسارات باللغة الطبيعية عبر الويب أو Telegram أو Slack أو Teams - إجابات خلال ثوانٍ.", icon: "forge", color: "bg-orange-600" },
      { title: "مبني للمشغّلين متعددي المواقع", description: "RBAC متعدد المستأجرين، لوحات قيادة للمحفظة، معيارية عبر المواقع، تعدد العملات، وتعمق على مستوى المنطقة.", icon: "multiLocation", color: "bg-teal-600" },
    ],
    comparison: {
      eyebrow: "المقارنة",
      title: "أبعد من لوحات تتوقف عند التنبيه",
      description: "معظم المنصات تعرض ما حدث. أما Sundae فتوجّه الإصلاح إلى مسؤول محاسَب، وتدفعه حتى التنفيذ، وتقيس الهامش المستعاد مقارنةً بخط أساس.",
      columns: [
        { title: "BI التقليدي", items: ["تقارير تاريخية", "سحب يدوي للبيانات", "مقاييس معزولة", "إدارة تفاعلية"], icon: "warning", highlight: false },
        { title: "لوحات عامة", items: ["لوحات من مصادر متعددة", "تقارير مجدولة", "تنبيهات أساسية", "لا سياق صناعي"], icon: "sync", highlight: false },
        { title: "Sundae", items: ["نموذج ذكاء 4D", "مراقبة Pulse لحظياً", "سياق سوقي عبر Watchtower", "الاستعادة مقاسة مقابل خط الأساس"], icon: "speed", highlight: true, cta: "لا أحد يملك الحزمة كاملة. حتى الآن." },
      ],
    },
    roles: {
      eyebrow: "مبني لـ",
      title: "مبني لكل دور في المؤسسة",
      items: [
        { title: "قادة العمليات", pain: "لا يمكنك أن تكون في كل مطعم في الوقت نفسه.", description: "ارصد التسرب في أي موقع عبر Pulse وPortfolio، ووجّه الإصلاح إلى المدير المناوب، وشاهد الاستعادة تتحقق - قبل أن يطلبوا المساعدة.", icon: "multiLocation", color: "bg-[#FF5C4D]" },
        { title: "المالية وFP&A", pain: "ثلاثة أيام لإغلاق الدفاتر؟ هذا كثير جداً.", description: "تباين الهامش يُرجَع إلى سببه الجذري، ويُوجَّه إلى مسؤول، وتُقاس القيمة المستعادة مقارنةً بخط أساس.", icon: "benchmarking", color: "bg-green-600" },
        { title: "القيادة العليا والملّاك", pain: "أسوأ موقع أداءً يظل مخفياً حتى الخميس.", description: "لوحات محفظة، موجزات يومية، ذكاء تنافسي، ومنظورات قرار استراتيجية.", icon: "intelligence", color: "bg-[#FF5C4D]" },
        { title: "فرق التقنية", pain: "12 واجهة API للموردين. 5 صيغ بيانات. لا مخطط موحد.", description: "واجهة عامة، webhooks، تكاملات عبر 12 مجالاً، مقاييس محكومة، وضوابط RBAC جاهزة.", icon: "integration", color: "bg-orange-600" },
      ],
    },
    cta: {
      title: "توقّف عن مشاهدة الهامش يتسرّب. ابدأ بقياس الاستعادة.",
      description: "30 دقيقة مع بياناتك. رؤى حقيقية. بدون عرض تسويقي.",
      primary: "احجز عرضاً",
      secondary: "استكشف المنتجات",
    },
  },
  fr: {
    hero: {
      badge: "Pourquoi Sundae",
      title: "Détecter est devenu la norme. Récupérer, mesures à l'appui, ne l'est pas.",
      description: "Chaque concurrent sait désormais repérer un problème et recommander une correction. Sundae la confie à un responsable unique, la suit jusqu'à l'exécution et mesure la marge récupérée par rapport à une référence - la boucle entière, prouvée décision par décision.",
    },
    problems: {
      eyebrow: "LE PROBLÈME",
      title: "Trois écarts qui vous coûtent de l'argent chaque jour",
      description: "Tous les groupes de restaurants avec lesquels nous avons travaillé rencontrent les mêmes trois défis.",
    },
    differentiators: [
      { title: "Ingestion de données sur 12 domaines", description: "POS, main-d'œuvre, stock, achats, réservations, livraison, marketing, expérience client, CRM, comptabilité - tout unifié.", icon: "integration", color: "bg-[#FF5C4D]" },
      { title: "Modèle d'intelligence 4D", description: "Ce qui s'est passé. Comment cela se compare au plan. Où vous vous situez sur le marché. Que faire ensuite.", icon: "intelligence", color: "bg-[#FF5C4D]" },
      { title: "Récupération en cours de journée via Pulse", description: "Détectez la fuite en temps réel, confiez la correction au responsable de service et mesurez la marge récupérée - avant la fin du service.", icon: "speed", color: "bg-green-600" },
      { title: "Intelligence externe via Watchtower", description: "Nouveau concurrent ? Météo qui fait chuter les couverts ? Concert annoncé ? Vous le saurez avant l'impact.", icon: "watchtower", color: "bg-red-600" },
      { title: "Accès conversationnel", description: "Questions en langage naturel via le web, Telegram, Slack ou Teams - réponses en quelques secondes.", icon: "forge", color: "bg-orange-600" },
      { title: "Conçu pour les opérateurs multi-sites", description: "RBAC multi-tenant, leaderboards portefeuille, benchmarking inter-sites, multi-devises et drill-down par région.", icon: "multiLocation", color: "bg-teal-600" },
    ],
    comparison: {
      eyebrow: "COMPARAISON",
      title: "Au-delà des tableaux de bord qui s'arrêtent à l'alerte",
      description: "La plupart des plateformes montrent ce qui s'est passé. Sundae confie la correction à un responsable identifié, la mène jusqu'à l'exécution et mesure la marge récupérée par rapport à une référence.",
      columns: [
        { title: "BI traditionnel", items: ["Reporting historique", "Extraction manuelle", "Métriques en silos", "Gestion réactive"], icon: "warning", highlight: false },
        { title: "Tableaux génériques", items: ["Dashboards multi-sources", "Rapports planifiés", "Alertes basiques", "Pas de contexte sectoriel"], icon: "sync", highlight: false },
        { title: "Sundae", items: ["Modèle d'intelligence 4D", "Surveillance Pulse en temps réel", "Contexte marché via Watchtower", "Récupération mesurée vs référence"], icon: "speed", highlight: true, cta: "Personne ne possédait la pile complète. Jusqu'ici." },
      ],
    },
    roles: {
      eyebrow: "CONÇU POUR",
      title: "Conçu pour chaque rôle de l'organisation",
      items: [
        { title: "Leaders Ops", pain: "Vous ne pouvez pas être dans chaque restaurant à la fois.", description: "Repérez la fuite dans n'importe quel site via Pulse et Portfolio, confiez la correction au manager de service et voyez la récupération se concrétiser - avant qu'il ne demande de l'aide.", icon: "multiLocation", color: "bg-[#FF5C4D]" },
        { title: "Finance & FP&A", pain: "3 jours pour clôturer les comptes ? C'est 3 jours de trop.", description: "Chaque écart de marge remonté à sa cause racine, confié à un responsable, et la valeur récupérée mesurée par rapport à une référence.", icon: "benchmarking", color: "bg-green-600" },
        { title: "Direction & propriétaires", pain: "Votre pire site reste invisible jusqu'au jeudi.", description: "Dashboards portefeuille, briefings quotidiens, intelligence concurrentielle et vues stratégiques.", icon: "intelligence", color: "bg-[#FF5C4D]" },
        { title: "Équipes techniques", pain: "12 API fournisseurs. 5 formats de données. Aucun schéma unifié.", description: "API publique, webhooks, intégrations sur 12 domaines, métriques gouvernées et contrôles RBAC prêts à l'emploi.", icon: "integration", color: "bg-orange-600" },
      ],
    },
    cta: {
      title: "Arrêtez de regarder la marge fuir. Commencez à mesurer la récupération.",
      description: "Trente minutes pour regarder vos données ensemble et voir si Sundae peut vraiment aider votre équipe.",
      primary: "Réserver une démo",
      secondary: "Explorer les produits",
    },
  },
  es: {
    hero: {
      badge: "Por qué Sundae",
      title: "Detectar ya no distingue a nadie. Recuperar con cifras, sí.",
      description: "Cualquier rival ya sabe detectar un problema y recomendar una solución. Sundae lo asigna a un responsable único, lo sigue hasta la ejecución y mide el margen recuperado frente a una línea base - el ciclo completo, demostrado en cada decisión.",
    },
    problems: {
      eyebrow: "EL PROBLEMA",
      title: "Tres brechas que te cuestan dinero cada día",
      description: "Todos los grupos de restaurantes con los que hemos trabajado enfrentan los mismos tres desafíos.",
    },
    differentiators: [
      { title: "Ingesta de datos de 12 dominios", description: "POS, mano de obra, inventario, compras, reservas, delivery, marketing, experiencia del huésped, CRM, contabilidad: todo unificado.", icon: "integration", color: "bg-[#FF5C4D]" },
      { title: "Modelo de inteligencia 4D", description: "Qué pasó. Cómo se compara con el plan. Dónde estás en el mercado. Qué hacer después.", icon: "intelligence", color: "bg-[#FF5C4D]" },
      { title: "Recuperación intradía via Pulse", description: "Detecta la fuga en el momento, asigna el arreglo al responsable del turno y mide el margen recuperado - antes de que termine el turno.", icon: "speed", color: "bg-green-600" },
      { title: "Inteligencia externa via Watchtower", description: "¿Nuevo competidor? ¿El clima hunde cubiertos? ¿Se anunció un concierto? Lo sabrás antes de que afecte tus números.", icon: "watchtower", color: "bg-red-600" },
      { title: "Acceso conversacional", description: "Consultas en lenguaje natural por web, Telegram, Slack o Teams: respuestas en segundos, no en días.", icon: "forge", color: "bg-orange-600" },
      { title: "Diseñado para operadores multiubicación", description: "RBAC multi-tenant, leaderboards de portafolio, benchmarking entre ubicaciones, multi-moneda y drill-down por región.", icon: "multiLocation", color: "bg-teal-600" },
    ],
    comparison: {
      eyebrow: "COMPARACIÓN",
      title: "Más allá de los dashboards que se quedan en la alerta",
      description: "La mayoría de las plataformas te muestran qué pasó. Sundae asigna el arreglo a un responsable único, lo lleva hasta la ejecución y mide el margen recuperado frente a una línea base.",
      columns: [
        { title: "BI tradicional", items: ["Reportes históricos", "Extracciones manuales", "Métricas en silos", "Gestión reactiva"], icon: "warning", highlight: false },
        { title: "Dashboards genéricos", items: ["Dashboards multi-fuente", "Reportes programados", "Alertas básicas", "Sin contexto sectorial"], icon: "sync", highlight: false },
        { title: "Sundae", items: ["Modelo de inteligencia 4D", "Monitoreo Pulse en tiempo real", "Contexto de mercado via Watchtower", "Recuperación medida frente a línea base"], icon: "speed", highlight: true, cta: "Nadie había tenido la pila completa. Hasta ahora." },
      ],
    },
    roles: {
      eyebrow: "DISEÑADO PARA",
      title: "Diseñado para cada rol de la organización",
      items: [
        { title: "Líderes de operaciones", pain: "No puedes estar en todos los restaurantes al mismo tiempo.", description: "Detecta la fuga en cualquier ubicación via Pulse y Portfolio, asigna el arreglo al gerente de turno y ve cómo se concreta la recuperación - antes de que pidan ayuda.", icon: "multiLocation", color: "bg-[#FF5C4D]" },
        { title: "Finanzas y FP&A", pain: "¿3 días para cerrar los libros? Son 3 días de más.", description: "Cada variación de margen rastreada a su causa raíz, asignada a un responsable, y el valor recuperado medido frente a una línea base.", icon: "benchmarking", color: "bg-green-600" },
        { title: "C-Suite y propietarios", pain: "Tu peor ubicación pasa desapercibida hasta el jueves.", description: "Dashboards de portafolio, briefings diarios, inteligencia competitiva y vistas de decisión estratégica.", icon: "intelligence", color: "bg-[#FF5C4D]" },
        { title: "Equipos de tecnología", pain: "12 APIs de proveedores. 5 formatos de datos. Cero esquema unificado.", description: "API pública, webhooks, integraciones de 12 dominios, métricas gobernadas y controles RBAC listos.", icon: "integration", color: "bg-orange-600" },
      ],
    },
    cta: {
      title: "Deja de ver el margen fugarse. Empieza a medir la recuperación.",
      description: "Treinta minutos para revisar tus datos contigo y ver si Sundae puede ayudar de verdad a tu equipo.",
      primary: "Reservar demo",
      secondary: "Explorar productos",
    },
  },
};

export default function WhySundaePage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  const cream = whySundaeCreamCopy[locale as keyof typeof whySundaeCreamCopy] ?? whySundaeCreamCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.hero.badge} title={copy.hero.title} description={copy.hero.description} />

      {/* Cream relief - early warm break right after the hero, before the long dark problems/comparison/roles stretch (the volume system) */}
      <CreamBreak eyebrow={cream.eyebrow} statement={cream.statement} lede={cream.lede} />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="eyebrow mb-4">{copy.problems.eyebrow}</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.problems.title}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.problems.description}</p>
          </FadeUp>

          <div className="space-y-8">
            {copy.differentiators.map((item, index) => (
              <FadeUp key={item.title} delay={index * 0.1}>
                <div className="bg-[var(--surface-faint)] rounded-2xl border border-[var(--border-default)] overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-5 p-8 bg-red-500/10 border-b lg:border-b-0 lg:border-r border-red-500/20">
                      <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3">{copy.problems.eyebrow}</div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug">{item.title}</h3>
                      <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{item.description}</p>
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-center p-6 bg-[var(--navy-deep)]">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent-gradient">{["12", "4D", "Pulse", "Watchtower", "Q&A", "Multi"][index]}</div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">{index === 0 ? "domains" : index === 1 ? "model" : index === 2 ? "monitoring" : index === 3 ? "intelligence" : index === 4 ? "access" : "operators"}</div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 bg-green-500/10 border-t lg:border-t-0 lg:border-l border-green-500/20">
                      <div className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-3">Sundae</div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{item.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                        <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs">✓</span>
                        {copy.problems.description}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="eyebrow mb-4">DIFFERENTIATORS</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.comparison.title}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.comparison.description}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.comparison.columns.map((section) => (
              <StaggerItem key={section.title}>
                <div className={`rounded-2xl p-8 text-center h-full ${section.highlight ? "bg-[#FF5C4D]/20 border border-[#FF5C4D]/30 ring-1 ring-[#FF5C4D]/20" : "bg-[var(--surface-faint)] border border-[var(--border-default)]"}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${section.highlight ? "bg-[#FF5C4D]/30" : "bg-[var(--surface-subtle)]"}`}>
                    <SundaeIcon name={section.icon} size="xl" className={section.highlight ? "text-[#FFB59E]" : "text-[var(--text-muted)]"} />
                  </div>
                  <h3 className={`font-bold text-lg mb-6 ${section.highlight ? "text-[#FFC9BA]" : "text-[var(--text-secondary)]"}`}>{section.title}</h3>
                  <ul className="space-y-3 text-left">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className={`mt-0.5 ${section.highlight ? "text-[#FF8473]" : "text-[var(--text-muted)]"}`}>{section.highlight ? "✓" : "•"}</span>
                        <span className={section.highlight ? "text-white/90" : "text-[var(--text-muted)]"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {section.highlight && section.cta && (
                    <div className="mt-6 pt-4 border-t border-[#FF5C4D]/20">
                      <p className="text-xs font-semibold text-[#FFB59E] uppercase tracking-wider">{section.cta}</p>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="eyebrow mb-4">{copy.roles.eyebrow}</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.roles.title}</h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.roles.items.map((role) => (
              <StaggerItem key={role.title}>
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <div className="text-center">
                      <div className={`w-14 h-14 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-none`}>
                        <SundaeIcon name={role.icon} size="lg" className="text-white" />
                      </div>
                      <CardTitle className="text-[var(--text-primary)] text-lg mb-2">{role.title}</CardTitle>
                      <p className="text-sm font-medium text-[var(--text-muted)] italic">&ldquo;{role.pain}&rdquo;</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-supporting)] text-center leading-relaxed">{role.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={copy.cta.title} description={copy.cta.description}>
        <Button variant="cta" size="lg" href="/demo">{copy.cta.primary}</Button>
        <Button variant="outline-ink" size="lg" href="/product">{copy.cta.secondary}</Button>
      </PageCTA>
    </div>
  );
}
