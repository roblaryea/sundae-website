"use client";

import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type SolutionCard = { title: string; description: string; icon: SundaeIconName };

type HospitalityCopy = {
  hero: {
    badge: string;
    title: [string, string];
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  problems: { heading: string; description: string; items: SolutionCard[] };
  solutions: { heading: string; description: string; items: Array<SolutionCard & { product: string }> };
  outcomes: { heading: string; description: string; items: SolutionCard[] };
  cta: { title: string; description: string; button: string };
};

const localizedCopy: Record<WebsiteLocale, HospitalityCopy> = {
  en: {
    hero: {
      badge: "Hospitality Operators",
      title: ["Every Touchpoint.", "One Platform."],
      description:
        "Restaurants, banquets, room service, catering — unified. Optimize every guest experience with one intelligence platform.",
      primaryCta: "See How Sundae Helps Hospitality",
      secondaryCta: "Get F&B Benchmark Report",
    },
    problems: {
      heading: "The Problems You Know",
      description: "Multi-concept complexity. Seasonal swings. Disconnected systems.",
      items: [
        { title: "Complex Multi-Concept Operations", description: "Managing restaurants, bars, hotels, and catering under one roof with different metrics and KPIs for each.", icon: "multiLocation" },
        { title: "Seasonality & Demand Fluctuations", description: "Revenue swings based on tourism, events, and seasons make forecasting and staffing difficult.", icon: "benchmarking" },
        { title: "Guest Experience Consistency", description: "Maintaining service quality across multiple touchpoints - dining, room service, events, and more.", icon: "success" },
        { title: "Integrated F&B and Rooms Operations", description: "Coordinating between restaurant operations, banquets, and hotel services without unified visibility.", icon: "integration" },
      ],
    },
    solutions: {
      heading: "How Sundae Changes That",
      description: "Unified F&B and rooms visibility. Demand-intelligent staffing.",
      items: [
        { title: "Unified Hospitality Dashboard", description: "Sundae Core consolidates F&B, rooms, events, and catering into one real-time view. Pulse monitors every shift with adaptive targets, labor productivity tracking, and server performance.", product: "Sundae Core + Pulse", icon: "chart" },
        { title: "Event & Calendar Intelligence", description: "Watchtower discovers local events, public holidays, and religious observances, including Ramadan-aware planning for MENA operations, with staffing and prep recommendations tailored to each property.", product: "Watchtower (Core tier)", icon: "watchtower" },
        { title: "Competitive & Market Context", description: "Track named competitors via Google Places, monitor rating trends, and get daily briefings that combine internal performance with weather forecasts, competitor activity, and market signals.", product: "Watchtower (Core tier)", icon: "balance" },
        { title: "Hospitality Benchmarking", description: "Sundae Report compares your F&B and hospitality metrics against similar properties and market leaders, with auto-generated analysis and recommendations.", product: "Sundae Report", icon: "report" },
      ],
    },
    outcomes: {
      heading: "What Changes",
      description: "Better forecasting. Higher margins. Consistent guest experience.",
      items: [
        { title: "Better demand forecasting", description: "Predict high-demand periods and optimize staffing and inventory accordingly.", icon: "forecasting" },
        { title: "10-15% improvement in F&B margins", description: "Reduce waste and optimize pricing across restaurant, banquet, and room service.", icon: "finance" },
        { title: "Enhanced guest experience", description: "Ensure consistent service quality across all touchpoints with real-time visibility.", icon: "performance" },
        { title: "Unified multi-property view", description: "Manage multiple hotels or resorts from one intelligence platform.", icon: "multiLocation" },
      ],
    },
    cta: {
      title: "Ready to Unify Your Operations?",
      description: "See how hospitality groups optimize every guest touchpoint.",
      button: "Book a Hospitality Demo",
    },
  },
  ar: {
    hero: {
      badge: "مشغلو الضيافة",
      title: ["كل نقطة تفاعل.", "منصة واحدة."],
      description:
        "المطاعم والحفلات وخدمة الغرف والتموين - كلها موحّدة. حسّن كل تجربة ضيف عبر منصة ذكاء واحدة.",
      primaryCta: "شاهد كيف تساعد Sundae قطاع الضيافة",
      secondaryCta: "احصل على تقرير معيارية الأغذية والمشروبات",
    },
    problems: {
      heading: "المشكلات التي تعرفها",
      description: "تعقيد المفاهيم المتعددة. تقلبات موسمية. أنظمة غير مترابطة.",
      items: [
        { title: "عمليات معقدة متعددة المفاهيم", description: "إدارة المطاعم والبارات والفنادق والتموين تحت سقف واحد مع مقاييس ومؤشرات مختلفة لكل منها.", icon: "multiLocation" },
        { title: "موسمية وتقلبات في الطلب", description: "تغير الإيرادات بسبب السياحة والفعاليات والفصول يجعل التنبؤ والتوظيف صعباً.", icon: "benchmarking" },
        { title: "اتساق تجربة الضيف", description: "الحفاظ على جودة الخدمة عبر نقاط تفاعل متعددة - المطعم وخدمة الغرف والفعاليات وغيرها.", icon: "success" },
        { title: "عمليات الأغذية والمشروبات والغرف المدمجة", description: "تنسيق العمليات بين المطاعم والحفلات وخدمات الفندق من دون رؤية موحدة.", icon: "integration" },
      ],
    },
    solutions: {
      heading: "كيف تغيّر Sundae ذلك",
      description: "رؤية موحّدة للأغذية والمشروبات والغرف. توظيف ذكي وفق الطلب.",
      items: [
        { title: "لوحة ضيافة موحّدة", description: "يجمع Sundae Core الأغذية والمشروبات والغرف والفعاليات والتموين في عرض لحظي واحد. يراقب Pulse كل وردية بأهداف متكيفة وتتبع إنتاجية العمالة وأداء الموظفين.", product: "Sundae Core + Pulse", icon: "chart" },
        { title: "ذكاء الفعاليات والتقويم", description: "يكتشف Watchtower الفعاليات المحلية والعطل الرسمية والمناسبات الدينية، بما في ذلك التخطيط الواعي لرمضان في عمليات منطقة الشرق الأوسط وشمال أفريقيا، مع توصيات مخصصة لكل منشأة.", product: "Watchtower (Core tier)", icon: "watchtower" },
        { title: "السياق التنافسي والسوقي", description: "تتبّع المنافسين المحددين عبر Google Places، وراقب اتجاهات التقييم، واحصل على موجزات يومية تجمع الأداء الداخلي مع الطقس ونشاط المنافسين وإشارات السوق.", product: "Watchtower (Core tier)", icon: "balance" },
        { title: "معيارية الضيافة", description: "يقارن Sundae Report مقاييس الأغذية والمشروبات والضيافة لديك مع المنشآت المماثلة وقادة السوق مع تحليل وتوصيات تلقائية.", product: "Sundae Report", icon: "report" },
      ],
    },
    outcomes: {
      heading: "ما الذي يتغير",
      description: "تنبؤ أفضل. هوامش أعلى. تجربة ضيف متسقة.",
      items: [
        { title: "تنبؤ أفضل بالطلب", description: "توقع فترات الذروة وحسّن التوظيف والمخزون وفقاً لذلك.", icon: "forecasting" },
        { title: "تحسن 10-15% في هوامش الأغذية والمشروبات", description: "قلل الهدر وحسّن التسعير عبر المطعم والحفلات وخدمة الغرف.", icon: "finance" },
        { title: "تجربة ضيف أفضل", description: "ضمن جودة خدمة متسقة عبر جميع نقاط التفاعل مع رؤية لحظية.", icon: "performance" },
        { title: "رؤية موحدة متعددة المنشآت", description: "أدر عدة فنادق أو منتجعات من منصة ذكاء واحدة.", icon: "multiLocation" },
      ],
    },
    cta: {
      title: "هل أنت مستعد لتوحيد عملياتك؟",
      description: "شاهد كيف تحسّن مجموعات الضيافة كل نقطة تفاعل مع الضيف.",
      button: "احجز عرض ضيافة",
    },
  },
  fr: {
    hero: {
      badge: "Opérateurs hôteliers",
      title: ["Chaque point de contact.", "Une seule plateforme."],
      description:
        "Restaurants, banquets, room service, catering - unifiés. Optimisez chaque expérience client avec une seule plateforme d'intelligence.",
      primaryCta: "Voir comment Sundae aide l'hôtellerie",
      secondaryCta: "Obtenir le benchmark F&B",
    },
    problems: {
      heading: "Les problèmes que vous connaissez",
      description: "Complexité multi-concepts. Variations saisonnières. Systèmes déconnectés.",
      items: [
        { title: "Opérations multi-concepts complexes", description: "Gérer restaurants, bars, hôtels et catering sous un même toit avec des métriques différentes pour chacun.", icon: "multiLocation" },
        { title: "Saisonnalité et variations de demande", description: "Les fluctuations de revenu liées au tourisme, aux événements et aux saisons compliquent les prévisions et le staffing.", icon: "benchmarking" },
        { title: "Cohérence de l'expérience client", description: "Maintenir la qualité de service sur de multiples points de contact - salle, room service, événements, etc.", icon: "success" },
        { title: "Opérations F&B et chambres intégrées", description: "Coordonner la restauration, les banquets et les services hôteliers sans visibilité unifiée.", icon: "integration" },
      ],
    },
    solutions: {
      heading: "Comment Sundae change la donne",
      description: "Visibilité unifiée F&B et chambres. Staffing piloté par la demande.",
      items: [
        { title: "Tableau de bord hôtelier unifié", description: "Sundae Core consolide F&B, chambres, événements et catering dans une vue temps réel. Pulse surveille chaque service avec des objectifs adaptatifs, la productivité et la performance du personnel.", product: "Sundae Core + Pulse", icon: "chart" },
        { title: "Intelligence événements et calendrier", description: "Watchtower détecte les événements locaux, jours fériés et observances religieuses, y compris une planification attentive au Ramadan pour les opérations MENA, avec des recommandations adaptées à chaque propriété.", product: "Watchtower (Core tier)", icon: "watchtower" },
        { title: "Contexte concurrentiel et marché", description: "Suivez les concurrents via Google Places, surveillez les tendances de notation et recevez des briefings quotidiens combinant performance interne, météo, activité concurrentielle et signaux de marché.", product: "Watchtower (Core tier)", icon: "balance" },
        { title: "Benchmarking hôtelier", description: "Sundae Report compare vos métriques F&B et hôtelières à celles de propriétés similaires et de leaders du marché, avec analyses et recommandations automatiques.", product: "Sundae Report", icon: "report" },
      ],
    },
    outcomes: {
      heading: "Ce qui change",
      description: "Meilleures prévisions. Marges plus élevées. Expérience client constante.",
      items: [
        { title: "Meilleure prévision de la demande", description: "Anticipez les périodes de forte demande et optimisez staffing et stock.", icon: "forecasting" },
        { title: "Amélioration de 10-15 % des marges F&B", description: "Réduisez le gaspillage et optimisez les prix sur restaurant, banquet et room service.", icon: "finance" },
        { title: "Expérience client améliorée", description: "Assurez une qualité de service constante sur tous les points de contact avec visibilité temps réel.", icon: "performance" },
        { title: "Vue unifiée multi-propriétés", description: "Gérez plusieurs hôtels ou resorts depuis une seule plateforme d'intelligence.", icon: "multiLocation" },
      ],
    },
    cta: {
      title: "Prêt à unifier vos opérations ?",
      description: "Voyez comment les groupes hôteliers optimisent chaque point de contact client.",
      button: "Réserver une démo hôtelière",
    },
  },
  es: {
    hero: {
      badge: "Operadores de hospitalidad",
      title: ["Cada punto de contacto.", "Una sola plataforma."],
      description:
        "Restaurantes, banquetes, room service, catering: todo unificado. Optimiza cada experiencia del huésped con una sola plataforma de inteligencia.",
      primaryCta: "Ver cómo Sundae ayuda a la hospitalidad",
      secondaryCta: "Obtener benchmark F&B",
    },
    problems: {
      heading: "Los problemas que conoces",
      description: "Complejidad multiconcepto. Cambios estacionales. Sistemas desconectados.",
      items: [
        { title: "Operaciones complejas de múltiples conceptos", description: "Gestionar restaurantes, bares, hoteles y catering bajo un mismo techo con métricas distintas para cada uno.", icon: "multiLocation" },
        { title: "Estacionalidad y fluctuaciones de demanda", description: "Los cambios de ingresos por turismo, eventos y temporadas complican el pronóstico y la dotación.", icon: "benchmarking" },
        { title: "Consistencia de la experiencia del huésped", description: "Mantener la calidad de servicio en múltiples puntos de contacto: restaurante, room service, eventos y más.", icon: "success" },
        { title: "Operaciones integradas de F&B y habitaciones", description: "Coordinar operaciones de restaurante, banquetes y servicios hoteleros sin visibilidad unificada.", icon: "integration" },
      ],
    },
    solutions: {
      heading: "Cómo lo cambia Sundae",
      description: "Visibilidad unificada de F&B y habitaciones. Dotación inteligente según la demanda.",
      items: [
        { title: "Panel unificado de hospitalidad", description: "Sundae Core consolida F&B, habitaciones, eventos y catering en una sola vista en tiempo real. Pulse monitorea cada turno con objetivos adaptativos, productividad laboral y rendimiento del personal.", product: "Sundae Core + Pulse", icon: "chart" },
        { title: "Inteligencia de eventos y calendario", description: "Watchtower detecta eventos locales, feriados públicos y observancias religiosas, incluida la planificación consciente de Ramadán para operaciones MENA, con recomendaciones para cada propiedad.", product: "Watchtower (Core tier)", icon: "watchtower" },
        { title: "Contexto competitivo y de mercado", description: "Sigue a competidores mediante Google Places, monitorea tendencias de calificación y recibe resúmenes diarios que combinan rendimiento interno, clima, actividad de competidores y señales de mercado.", product: "Watchtower (Core tier)", icon: "balance" },
        { title: "Benchmarking de hospitalidad", description: "Sundae Report compara tus métricas F&B y de hospitalidad con propiedades similares y líderes del mercado, con análisis y recomendaciones automáticas.", product: "Sundae Report", icon: "report" },
      ],
    },
    outcomes: {
      heading: "Qué cambia",
      description: "Mejor pronóstico. Mayores márgenes. Experiencia consistente del huésped.",
      items: [
        { title: "Mejor pronóstico de la demanda", description: "Predice periodos de alta demanda y optimiza dotación e inventario.", icon: "forecasting" },
        { title: "Mejora del 10-15% en márgenes F&B", description: "Reduce desperdicio y optimiza precios en restaurante, banquetes y room service.", icon: "finance" },
        { title: "Experiencia del huésped mejorada", description: "Asegura calidad de servicio constante con visibilidad en tiempo real.", icon: "performance" },
        { title: "Vista unificada de múltiples propiedades", description: "Gestiona varios hoteles o resorts desde una sola plataforma de inteligencia.", icon: "multiLocation" },
      ],
    },
    cta: {
      title: "¿Listo para unificar tus operaciones?",
      description: "Mira cómo los grupos de hospitalidad optimizan cada punto de contacto del huésped.",
      button: "Reservar demo de hospitalidad",
    },
  },
};

export default function HospitalityOperatorsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge={copy.hero.badge}
        title={
          <>
            {copy.hero.title[0]}
            <br />
            {copy.hero.title[1]}
          </>
        }
        description={copy.hero.description}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              {copy.hero.primaryCta}
            </Button>
          </Link>
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">
              {copy.hero.secondaryCta}
            </Button>
          </a>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.problems.heading}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.problems.description}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.problems.items.map((challenge, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={challenge.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{challenge.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{challenge.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.solutions.heading}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.solutions.description}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.solutions.items.map((item, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={item.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-[#60A5FA] font-semibold mb-1">{item.product}</div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.outcomes.heading}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.outcomes.description}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.outcomes.items.map((outcome, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={outcome.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{outcome.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{outcome.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={copy.cta.title} description={copy.cta.description}>
        <Link href="/demo">
          <Button variant="primary" size="lg">
            {copy.cta.button}
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
