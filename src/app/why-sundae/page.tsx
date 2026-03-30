"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

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

const localizedCopy: Record<WebsiteLocale, WhySundaeCopy> = {
  en: {
    hero: {
      badge: "Why Sundae",
      title: "The Intelligence Layer Restaurants Never Had",
      description:
        "Your data lives in disconnected silos. Your team makes million-dollar decisions by gut feel. We built the platform that changes that.",
    },
    problems: {
      eyebrow: "THE PROBLEM",
      title: "Three gaps costing you money every day",
      description: "Every restaurant group we've worked with faces the same three challenges.",
    },
    differentiators: [
      { title: "12-Domain Data Ingestion", description: "POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting - all unified. No more disconnected systems.", icon: "integration", color: "bg-[#1C47FF]" },
      { title: "4D Intelligence Model", description: "What happened. How it compares to plan. Where you stand in the market. What to do next. Four dimensions of every decision.", icon: "intelligence", color: "bg-purple-600" },
      { title: "Real-Time Operations via Pulse", description: "Intraday sales pacing, labor productivity, leakage detection, and coaching - before the shift is over.", icon: "speed", color: "bg-green-600" },
      { title: "External Intelligence via Watchtower", description: "New competitor? Weather tanking covers? Concert announced? You’ll know before it hits your numbers.", icon: "watchtower", color: "bg-red-600" },
      { title: "Conversational Access", description: "Natural language queries via web, Telegram, Slack, or Teams - answers in seconds, not days.", icon: "forge", color: "bg-orange-600" },
      { title: "Built for Multi-Location Operators", description: "Multi-tenant RBAC, portfolio leaderboards, cross-location benchmarking, multi-currency, and region-level drill-downs.", icon: "multiLocation", color: "bg-teal-600" },
    ],
    comparison: {
      eyebrow: "COMPARISON",
      title: "Beyond traditional dashboards",
      description: "Most platforms show you what happened. We show you what's happening, what it means, and what to do about it.",
      columns: [
        { title: "Traditional BI", items: ["Historical reporting", "Manual data pulls", "Siloed metrics", "Reactive management"], icon: "warning", highlight: false },
        { title: "Generic Dashboards", items: ["Multi-source dashboards", "Scheduled reports", "Basic alerting", "No industry context"], icon: "sync", highlight: false },
        { title: "Sundae", items: ["4D Intelligence Model", "Real-time Pulse monitoring", "Market context via Watchtower", "Intelligent recommendations"], icon: "speed", highlight: true, cta: "No one owns the full stack. Until now." },
      ],
    },
    roles: {
      eyebrow: "BUILT FOR",
      title: "Built for every role in the organization",
      items: [
        { title: "Operations Leaders", pain: "You can't be in every restaurant at once.", description: "Real-time visibility into every location via Pulse and Portfolio - know who needs help before they ask.", icon: "multiLocation", color: "bg-[#1C47FF]" },
        { title: "Finance & FP&A", pain: "3 days to close the books? That's 3 days too many.", description: "Real-time margin intelligence, shift-level labor costs, and variance analysis connected to root causes.", icon: "benchmarking", color: "bg-green-600" },
        { title: "C-Suite & Owners", pain: "Your worst-performing outlet is invisible until Thursday.", description: "Portfolio dashboards, daily briefings, competitive intelligence, and strategic decision views.", icon: "intelligence", color: "bg-purple-600" },
        { title: "Technology Teams", pain: "12 vendor APIs. 5 data formats. Zero unified schema.", description: "Public API, webhooks, 12-domain integrations, governed metrics, and RBAC controls out of the box.", icon: "integration", color: "bg-orange-600" },
      ],
    },
    cta: {
      title: "Stop running your restaurant on gut feel.",
      description: "30 minutes to review your data together and see whether Sundae would genuinely help your team.",
      primary: "Book a Demo",
      secondary: "Explore Products",
    },
  },
  ar: {
    hero: {
      badge: "لماذا Sundae",
      title: "طبقة الذكاء التي لم تكن لدى المطاعم من قبل",
      description: "بياناتك تعيش في جزر معزولة. فريقك يتخذ قرارات بملايين الدولارات اعتماداً على الحدس. بنينا المنصة التي تغيّر ذلك.",
    },
    problems: {
      eyebrow: "المشكلة",
      title: "ثلاث فجوات تكلفك المال كل يوم",
      description: "كل مجموعة مطاعم عملنا معها تواجه التحديات الثلاث نفسها.",
    },
    differentiators: [
      { title: "إدخال البيانات عبر 12 مجالاً", description: "POS والعمالة والمخزون والشراء والحجوزات والتوصيل والتسويق وتجربة الضيف وCRM والمحاسبة - كلها موحّدة.", icon: "integration", color: "bg-[#1C47FF]" },
      { title: "نموذج ذكاء رباعي الأبعاد", description: "ماذا حدث. كيف يقارن بالخطة. أين تقف في السوق. ماذا تفعل بعد ذلك.", icon: "intelligence", color: "bg-purple-600" },
      { title: "عمليات لحظية عبر Pulse", description: "وتيرة المبيعات خلال اليوم، إنتاجية العمالة، كشف التسرب، والتوجيه - قبل انتهاء الوردية.", icon: "speed", color: "bg-green-600" },
      { title: "ذكاء خارجي عبر Watchtower", description: "منافس جديد؟ الطقس يهبط بالمبيعات؟ حفل أُعلن؟ ستعرف قبل أن يؤثر على أرقامك.", icon: "watchtower", color: "bg-red-600" },
      { title: "وصول حواري", description: "استفسارات باللغة الطبيعية عبر الويب أو Telegram أو Slack أو Teams - إجابات خلال ثوانٍ.", icon: "forge", color: "bg-orange-600" },
      { title: "مبني للمشغّلين متعددي المواقع", description: "RBAC متعدد المستأجرين، لوحات قيادة للمحفظة، معيارية عبر المواقع، تعدد العملات، وتعمق على مستوى المنطقة.", icon: "multiLocation", color: "bg-teal-600" },
    ],
    comparison: {
      eyebrow: "المقارنة",
      title: "ما وراء لوحات المعلومات التقليدية",
      description: "معظم المنصات تعرض ما حدث. نحن نعرض ما يحدث، وما يعنيه، وما الذي يجب فعله بشأنه.",
      columns: [
        { title: "BI التقليدي", items: ["تقارير تاريخية", "سحب يدوي للبيانات", "مقاييس معزولة", "إدارة تفاعلية"], icon: "warning", highlight: false },
        { title: "لوحات عامة", items: ["لوحات من مصادر متعددة", "تقارير مجدولة", "تنبيهات أساسية", "لا سياق صناعي"], icon: "sync", highlight: false },
        { title: "Sundae", items: ["نموذج ذكاء 4D", "مراقبة Pulse لحظياً", "سياق سوقي عبر Watchtower", "توصيات ذكية"], icon: "speed", highlight: true, cta: "لا أحد يملك الحزمة كاملة. حتى الآن." },
      ],
    },
    roles: {
      eyebrow: "مبني لـ",
      title: "مبني لكل دور في المؤسسة",
      items: [
        { title: "قادة العمليات", pain: "لا يمكنك أن تكون في كل مطعم في الوقت نفسه.", description: "رؤية لحظية لكل موقع عبر Pulse وPortfolio - تعرف من يحتاج المساعدة قبل أن يطلبها.", icon: "multiLocation", color: "bg-[#1C47FF]" },
        { title: "المالية وFP&A", pain: "ثلاثة أيام لإغلاق الدفاتر؟ هذا كثير جداً.", description: "ذكاء فوري للهامش، تكاليف العمالة على مستوى الوردية، وتحليل التباين مرتبط بالأسباب الجذرية.", icon: "benchmarking", color: "bg-green-600" },
        { title: "القيادة العليا والملّاك", pain: "أسوأ موقع أداءً يظل مخفياً حتى الخميس.", description: "لوحات محفظة، موجزات يومية، ذكاء تنافسي، ومنظورات قرار استراتيجية.", icon: "intelligence", color: "bg-purple-600" },
        { title: "فرق التقنية", pain: "12 واجهة API للموردين. 5 صيغ بيانات. لا مخطط موحد.", description: "واجهة عامة، webhooks، تكاملات عبر 12 مجالاً، مقاييس محكومة، وضوابط RBAC جاهزة.", icon: "integration", color: "bg-orange-600" },
      ],
    },
    cta: {
      title: "توقّف عن إدارة مطعمك بالحدس.",
      description: "30 دقيقة مع بياناتك. رؤى حقيقية. بدون عرض تسويقي.",
      primary: "احجز عرضاً",
      secondary: "استكشف المنتجات",
    },
  },
  fr: {
    hero: {
      badge: "Pourquoi Sundae",
      title: "Une plateforme de decision claire pour les restaurants",
      description: "Vos donnees restent eparpillees dans des silos de travail, alors que vos equipes doivent decider vite. Nous avons construit Sundae pour remettre cette vision au meme endroit.",
    },
    problems: {
      eyebrow: "LE PROBLÈME",
      title: "Trois écarts qui vous coûtent de l'argent chaque jour",
      description: "Tous les groupes de restaurants avec lesquels nous avons travaillé rencontrent les mêmes trois défis.",
    },
    differentiators: [
      { title: "Ingestion de données sur 12 domaines", description: "POS, main-d'œuvre, stock, achats, réservations, livraison, marketing, expérience client, CRM, comptabilité - tout unifié.", icon: "integration", color: "bg-[#1C47FF]" },
      { title: "Modèle d'intelligence 4D", description: "Ce qui s'est passé. Comment cela se compare au plan. Où vous vous situez sur le marché. Que faire ensuite.", icon: "intelligence", color: "bg-purple-600" },
      { title: "Opérations en temps réel via Pulse", description: "Pacing des ventes dans la journée, productivité de la main-d'œuvre, détection des fuites et coaching - avant la fin du service.", icon: "speed", color: "bg-green-600" },
      { title: "Intelligence externe via Watchtower", description: "Nouveau concurrent ? Météo qui fait chuter les couverts ? Concert annoncé ? Vous le saurez avant l'impact.", icon: "watchtower", color: "bg-red-600" },
      { title: "Accès conversationnel", description: "Questions en langage naturel via le web, Telegram, Slack ou Teams - réponses en quelques secondes.", icon: "forge", color: "bg-orange-600" },
      { title: "Conçu pour les opérateurs multi-sites", description: "RBAC multi-tenant, leaderboards portefeuille, benchmarking inter-sites, multi-devises et drill-down par région.", icon: "multiLocation", color: "bg-teal-600" },
    ],
    comparison: {
      eyebrow: "COMPARAISON",
      title: "Au-delà des tableaux de bord traditionnels",
      description: "La plupart des plateformes montrent ce qui s'est passé. Nous montrons ce qui se passe, ce que cela signifie et quoi faire.",
      columns: [
        { title: "BI traditionnel", items: ["Reporting historique", "Extraction manuelle", "Métriques en silos", "Gestion réactive"], icon: "warning", highlight: false },
        { title: "Tableaux génériques", items: ["Dashboards multi-sources", "Rapports planifiés", "Alertes basiques", "Pas de contexte sectoriel"], icon: "sync", highlight: false },
        { title: "Sundae", items: ["Modèle d'intelligence 4D", "Surveillance Pulse en temps réel", "Contexte marché via Watchtower", "Recommandations intelligentes"], icon: "speed", highlight: true, cta: "Personne ne possédait la pile complète. Jusqu'ici." },
      ],
    },
    roles: {
      eyebrow: "CONÇU POUR",
      title: "Conçu pour chaque rôle de l'organisation",
      items: [
        { title: "Leaders Ops", pain: "Vous ne pouvez pas être dans chaque restaurant à la fois.", description: "Visibilité en temps réel sur chaque site via Pulse et Portfolio - sachez qui a besoin d'aide avant qu'il ne la demande.", icon: "multiLocation", color: "bg-[#1C47FF]" },
        { title: "Finance & FP&A", pain: "3 jours pour clôturer les comptes ? C'est 3 jours de trop.", description: "Intelligence de marge en temps réel, coûts de main-d'œuvre par service et analyse des écarts reliée aux causes racines.", icon: "benchmarking", color: "bg-green-600" },
        { title: "Direction & propriétaires", pain: "Votre pire site reste invisible jusqu'au jeudi.", description: "Dashboards portefeuille, briefings quotidiens, intelligence concurrentielle et vues stratégiques.", icon: "intelligence", color: "bg-purple-600" },
        { title: "Équipes techniques", pain: "12 API fournisseurs. 5 formats de données. Aucun schéma unifié.", description: "API publique, webhooks, intégrations sur 12 domaines, métriques gouvernées et contrôles RBAC prêts à l'emploi.", icon: "integration", color: "bg-orange-600" },
      ],
    },
    cta: {
      title: "Arrêtez de gérer votre restaurant à l'intuition.",
      description: "Trente minutes pour regarder vos donnees ensemble et voir si Sundae peut vraiment aider votre equipe.",
      primary: "Réserver une démo",
      secondary: "Explorer les produits",
    },
  },
  es: {
    hero: {
      badge: "Por qué Sundae",
      title: "Una plataforma de decision clara para restaurantes",
      description: "Tus datos siguen repartidos en silos, mientras tu equipo necesita decidir rapido. Construimos Sundae para reunir esa vision en un solo lugar.",
    },
    problems: {
      eyebrow: "EL PROBLEMA",
      title: "Tres brechas que te cuestan dinero cada día",
      description: "Todos los grupos de restaurantes con los que hemos trabajado enfrentan los mismos tres desafíos.",
    },
    differentiators: [
      { title: "Ingesta de datos de 12 dominios", description: "POS, mano de obra, inventario, compras, reservas, delivery, marketing, experiencia del huésped, CRM, contabilidad: todo unificado.", icon: "integration", color: "bg-[#1C47FF]" },
      { title: "Modelo de inteligencia 4D", description: "Qué pasó. Cómo se compara con el plan. Dónde estás en el mercado. Qué hacer después.", icon: "intelligence", color: "bg-purple-600" },
      { title: "Operaciones en tiempo real via Pulse", description: "Pacing de ventas intradía, productividad laboral, detección de fugas y coaching, antes de que termine el turno.", icon: "speed", color: "bg-green-600" },
      { title: "Inteligencia externa via Watchtower", description: "¿Nuevo competidor? ¿El clima hunde cubiertos? ¿Se anunció un concierto? Lo sabrás antes de que afecte tus números.", icon: "watchtower", color: "bg-red-600" },
      { title: "Acceso conversacional", description: "Consultas en lenguaje natural por web, Telegram, Slack o Teams: respuestas en segundos, no en días.", icon: "forge", color: "bg-orange-600" },
      { title: "Diseñado para operadores multiubicación", description: "RBAC multi-tenant, leaderboards de portafolio, benchmarking entre ubicaciones, multi-moneda y drill-down por región.", icon: "multiLocation", color: "bg-teal-600" },
    ],
    comparison: {
      eyebrow: "COMPARACIÓN",
      title: "Más allá de los dashboards tradicionales",
      description: "La mayoría de las plataformas te muestran qué pasó. Nosotros te mostramos qué está pasando, qué significa y qué hacer al respecto.",
      columns: [
        { title: "BI tradicional", items: ["Reportes históricos", "Extracciones manuales", "Métricas en silos", "Gestión reactiva"], icon: "warning", highlight: false },
        { title: "Dashboards genéricos", items: ["Dashboards multi-fuente", "Reportes programados", "Alertas básicas", "Sin contexto sectorial"], icon: "sync", highlight: false },
        { title: "Sundae", items: ["Modelo de inteligencia 4D", "Monitoreo Pulse en tiempo real", "Contexto de mercado via Watchtower", "Recomendaciones inteligentes"], icon: "speed", highlight: true, cta: "Nadie había tenido la pila completa. Hasta ahora." },
      ],
    },
    roles: {
      eyebrow: "DISEÑADO PARA",
      title: "Diseñado para cada rol de la organización",
      items: [
        { title: "Líderes de operaciones", pain: "No puedes estar en todos los restaurantes al mismo tiempo.", description: "Visibilidad en tiempo real de cada ubicación via Pulse y Portfolio: sabe quién necesita ayuda antes de que la pida.", icon: "multiLocation", color: "bg-[#1C47FF]" },
        { title: "Finanzas y FP&A", pain: "¿3 días para cerrar los libros? Son 3 días de más.", description: "Inteligencia de margen en tiempo real, costos laborales por turno y análisis de variaciones conectados a causas raíz.", icon: "benchmarking", color: "bg-green-600" },
        { title: "C-Suite y propietarios", pain: "Tu peor ubicación pasa desapercibida hasta el jueves.", description: "Dashboards de portafolio, briefings diarios, inteligencia competitiva y vistas de decisión estratégica.", icon: "intelligence", color: "bg-purple-600" },
        { title: "Equipos de tecnología", pain: "12 APIs de proveedores. 5 formatos de datos. Cero esquema unificado.", description: "API pública, webhooks, integraciones de 12 dominios, métricas gobernadas y controles RBAC listos.", icon: "integration", color: "bg-orange-600" },
      ],
    },
    cta: {
      title: "Deja de gestionar tu restaurante por intuición.",
      description: "Treinta minutos para revisar tus datos contigo y ver si Sundae puede ayudar de verdad a tu equipo.",
      primary: "Reservar demo",
      secondary: "Explorar productos",
    },
  },
};

export default function WhySundaePage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.hero.badge} title={copy.hero.title} description={copy.hero.description} />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="eyebrow text-[#60A5FA] mb-4">{copy.problems.eyebrow}</p>
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
            <p className="eyebrow text-[#60A5FA] mb-4">DIFFERENTIATORS</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.comparison.title}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.comparison.description}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.comparison.columns.map((section) => (
              <StaggerItem key={section.title}>
                <div className={`rounded-2xl p-8 text-center h-full ${section.highlight ? "bg-[#1C47FF]/20 border border-blue-500/30 ring-1 ring-blue-500/20" : "bg-[var(--surface-faint)] border border-[var(--border-default)]"}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${section.highlight ? "bg-[#1C47FF]/30" : "bg-[var(--surface-subtle)]"}`}>
                    <SundaeIcon name={section.icon} size="xl" className={section.highlight ? "text-blue-300" : "text-[var(--text-muted)]"} />
                  </div>
                  <h3 className={`font-bold text-lg mb-6 ${section.highlight ? "text-blue-200" : "text-[var(--text-secondary)]"}`}>{section.title}</h3>
                  <ul className="space-y-3 text-left">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className={`mt-0.5 ${section.highlight ? "text-blue-400" : "text-[var(--text-muted)]"}`}>{section.highlight ? "✓" : "•"}</span>
                        <span className={section.highlight ? "text-white/90" : "text-[var(--text-muted)]"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {section.highlight && section.cta && (
                    <div className="mt-6 pt-4 border-t border-blue-500/20">
                      <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">{section.cta}</p>
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
            <p className="eyebrow text-[#60A5FA] mb-4">{copy.roles.eyebrow}</p>
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
        <Button variant="outline-light" size="lg" href="/product">{copy.cta.secondary}</Button>
      </PageCTA>
    </div>
  );
}
