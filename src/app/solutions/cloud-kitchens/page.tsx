"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { PRICING_URL } from "@/lib/links";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type SolutionCard = { title: string; description: string; icon: SundaeIconName };

type CloudKitchenCopy = {
  hero: {
    badge: string;
    title: [string, string];
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  problems: { heading: string; description: string; items: SolutionCard[] };
  solutions: { heading: string; description: string; items: SolutionCard[] };
  insights: {
    heading: string;
    description: string;
    items: SolutionCard[];
    performanceCardTitle: string;
    averageDeliveryTime: string;
    platformRating: string;
    costPerDelivery: string;
  };
  cta: { title: string; description: string; primaryButton: string; secondaryButton: string };
};

const localizedCopy: Record<WebsiteLocale, CloudKitchenCopy> = {
  en: {
    hero: {
      badge: "Cloud Kitchen Intelligence",
      title: ["Multi-Brand.", "One Kitchen."],
      description: "All your virtual brands. Every delivery platform. One intelligence layer.",
      primaryCta: "See Cloud Kitchen Demo",
      secondaryCta: "View Benchmarking",
    },
    problems: {
      heading: "The Problems You Know",
      description: "Multi-brand complexity. Platform fragmentation. Cost allocation chaos.",
      items: [
        { title: "Multi-Brand Data Complexity", description: "Managing data across multiple virtual brands from a single kitchen location.", icon: "benchmarking" },
        { title: "Delivery Performance Optimization", description: "Understanding delivery metrics and optimizing for multiple delivery platforms.", icon: "speed" },
        { title: "Cost Allocation Across Brands", description: "Accurately tracking costs and profitability for each virtual brand.", icon: "finance" },
      ],
    },
    solutions: {
      heading: "How Sundae Changes That",
      description: "Brand-level intelligence. Platform-wide visibility. Clear P&L per concept.",
      items: [
        { title: "Multi-Brand Intelligence", description: "Separate intelligence and insights for each virtual brand operating from your kitchen.", icon: "search" },
        { title: "Delivery Platform Integration", description: "Unified view of performance across Uber Eats, DoorDash, Grubhub, and other platforms.", icon: "integration" },
        { title: "Brand-Specific Benchmarking", description: "Compare each virtual brand's performance against similar concepts in your market.", icon: "report" },
      ],
    },
    insights: {
      heading: "What Changes",
      description: "Faster decisions. Better delivery times. Higher margins per brand.",
      items: [
        { title: "Delivery Platform Intelligence", description: "Track performance across Uber Eats, DoorDash, Grubhub, and other platforms in one dashboard.", icon: "chart" },
        { title: "Virtual Brand Performance", description: "Monitor KPIs for each brand concept operating from your kitchen with separate intelligence.", icon: "owners" },
        { title: "Delivery Time Optimization", description: "Analyze prep times, delivery times, and customer satisfaction to optimize operations.", icon: "time" },
      ],
      performanceCardTitle: "Multi-Brand Performance",
      averageDeliveryTime: "Average Delivery Time",
      platformRating: "Platform Rating",
      costPerDelivery: "Cost per Delivery",
    },
    cta: {
      title: "Ready to Scale Your Brands?",
      description: "See how cloud kitchens optimize every brand from one dashboard.",
      primaryButton: "Schedule Cloud Kitchen Demo",
      secondaryButton: "View Pricing",
    },
  },
  ar: {
    hero: {
      badge: "ذكاء المطابخ السحابية",
      title: ["متعدد العلامات.", "مطبخ واحد."],
      description: "كل علامتك الافتراضية. كل منصة توصيل. طبقة واحدة من الذكاء.",
      primaryCta: "شاهد عرض المطبخ السحابي",
      secondaryCta: "عرض المعيارية",
    },
    problems: {
      heading: "المشكلات التي تعرفها",
      description: "تعقيد العلامات المتعددة. تجزؤ المنصات. فوضى توزيع التكاليف.",
      items: [
        { title: "تعقيد البيانات عبر علامات متعددة", description: "إدارة البيانات عبر عدة علامات افتراضية من موقع مطبخ واحد.", icon: "benchmarking" },
        { title: "تحسين أداء التوصيل", description: "فهم مقاييس التوصيل وتحسين الأداء عبر منصات متعددة.", icon: "speed" },
        { title: "توزيع التكاليف بين العلامات", description: "تتبّع التكاليف والربحية بدقة لكل علامة افتراضية.", icon: "finance" },
      ],
    },
    solutions: {
      heading: "كيف تغيّر Sundae ذلك",
      description: "ذكاء على مستوى العلامة. رؤية على مستوى المنصات. P&L واضح لكل مفهوم.",
      items: [
        { title: "ذكاء متعدد العلامات", description: "رؤى وذكاء منفصل لكل علامة افتراضية تعمل من مطبخك.", icon: "search" },
        { title: "تكامل منصات التوصيل", description: "عرض موحد للأداء عبر Uber Eats وDoorDash وGrubhub وغيرها.", icon: "integration" },
        { title: "معيارية خاصة بالعلامة", description: "قارن أداء كل علامة افتراضية بمفاهيم مشابهة في سوقك.", icon: "report" },
      ],
    },
    insights: {
      heading: "ما الذي يتغير",
      description: "قرارات أسرع. أوقات توصيل أفضل. هوامش أعلى لكل علامة.",
      items: [
        { title: "ذكاء منصات التوصيل", description: "تتبّع الأداء عبر Uber Eats وDoorDash وGrubhub وغيرها في لوحة واحدة.", icon: "chart" },
        { title: "أداء العلامة الافتراضية", description: "راقب مؤشرات كل مفهوم علامة يعمل من مطبخك بذكاء منفصل.", icon: "owners" },
        { title: "تحسين وقت التوصيل", description: "حلّل وقت التحضير والتوصيل ورضا العملاء لتحسين التشغيل.", icon: "time" },
      ],
      performanceCardTitle: "أداء متعدد العلامات",
      averageDeliveryTime: "متوسط وقت التوصيل",
      platformRating: "تقييم المنصة",
      costPerDelivery: "تكلفة كل عملية توصيل",
    },
    cta: {
      title: "هل أنت مستعد لتوسيع علاماتك؟",
      description: "شاهد كيف تحسّن المطابخ السحابية كل علامة من لوحة واحدة.",
      primaryButton: "جدولة عرض المطبخ السحابي",
      secondaryButton: "عرض الأسعار",
    },
  },
  fr: {
    hero: {
      badge: "Intelligence des cuisines cloud",
      title: ["Multi-marques.", "Une seule cuisine."],
      description: "Toutes vos marques virtuelles et chaque plateforme de livraison dans une seule vue operationnelle.",
      primaryCta: "Voir la démo cuisine cloud",
      secondaryCta: "Voir le benchmark",
    },
    problems: {
      heading: "Les problèmes que vous connaissez",
      description: "Complexité multi-marques. Fragmentation des plateformes. Chaos d'allocation des coûts.",
      items: [
        { title: "Complexité des données multi-marques", description: "Gérer les données de plusieurs marques virtuelles depuis une seule cuisine.", icon: "benchmarking" },
        { title: "Optimisation de la livraison", description: "Comprendre les métriques de livraison et optimiser plusieurs plateformes.", icon: "speed" },
        { title: "Allocation des coûts entre marques", description: "Suivre avec précision les coûts et la rentabilité de chaque marque virtuelle.", icon: "finance" },
      ],
    },
    solutions: {
      heading: "Comment Sundae change la donne",
      description: "Intelligence au niveau de la marque. Visibilité à l'échelle des plateformes. P&L clair par concept.",
      items: [
        { title: "Intelligence multi-marques", description: "Des insights distincts pour chaque marque virtuelle opérant depuis votre cuisine.", icon: "search" },
        { title: "Intégration des plateformes de livraison", description: "Vue unifiée des performances sur Uber Eats, DoorDash, Grubhub et autres plateformes.", icon: "integration" },
        { title: "Benchmarking spécifique à la marque", description: "Comparez chaque marque virtuelle à des concepts similaires sur votre marché.", icon: "report" },
      ],
    },
    insights: {
      heading: "Ce qui change",
      description: "Décisions plus rapides. Délais de livraison plus courts. Marges plus élevées par marque.",
      items: [
        { title: "Intelligence des plateformes de livraison", description: "Suivez les performances sur Uber Eats, DoorDash, Grubhub et autres dans un seul tableau de bord.", icon: "chart" },
        { title: "Performance des marques virtuelles", description: "Surveillez les KPI de chaque concept de marque opérant depuis votre cuisine avec une intelligence séparée.", icon: "owners" },
        { title: "Optimisation des délais de livraison", description: "Analysez les temps de préparation, de livraison et la satisfaction client pour optimiser l'exploitation.", icon: "time" },
      ],
      performanceCardTitle: "Performance multi-marques",
      averageDeliveryTime: "Temps moyen de livraison",
      platformRating: "Note de plateforme",
      costPerDelivery: "Coût par livraison",
    },
    cta: {
      title: "Prêt à faire évoluer vos marques ?",
      description: "Voyez comment les cuisines cloud optimisent chaque marque depuis un seul tableau de bord.",
      primaryButton: "Planifier une démo cuisine cloud",
      secondaryButton: "Voir les tarifs",
    },
  },
  es: {
    hero: {
      badge: "Inteligencia para cocinas cloud",
      title: ["Multimarca.", "Una sola cocina."],
      description: "Todas tus marcas virtuales y todas las plataformas de entrega en una sola vista operativa.",
      primaryCta: "Ver demo de cocina cloud",
      secondaryCta: "Ver benchmarking",
    },
    problems: {
      heading: "Los problemas que conoces",
      description: "Complejidad multimarca. Fragmentación de plataformas. Caos en la asignación de costos.",
      items: [
        { title: "Complejidad de datos multimarca", description: "Gestionar datos de varias marcas virtuales desde una sola cocina.", icon: "benchmarking" },
        { title: "Optimización del rendimiento de entrega", description: "Entender las métricas de entrega y optimizar para múltiples plataformas.", icon: "speed" },
        { title: "Asignación de costos entre marcas", description: "Rastrear con precisión costos y rentabilidad de cada marca virtual.", icon: "finance" },
      ],
    },
    solutions: {
      heading: "Cómo lo cambia Sundae",
      description: "Inteligencia por marca. Visibilidad en todas las plataformas. P&L claro por concepto.",
      items: [
        { title: "Inteligencia multimarca", description: "Insights separados para cada marca virtual que opera desde tu cocina.", icon: "search" },
        { title: "Integración con plataformas de entrega", description: "Vista unificada del rendimiento en Uber Eats, DoorDash, Grubhub y otras plataformas.", icon: "integration" },
        { title: "Benchmarking por marca", description: "Compara cada marca virtual con conceptos similares en tu mercado.", icon: "report" },
      ],
    },
    insights: {
      heading: "Qué cambia",
      description: "Decisiones más rápidas. Tiempos de entrega mejores. Mayores márgenes por marca.",
      items: [
        { title: "Inteligencia de plataformas de entrega", description: "Rastrea el rendimiento en Uber Eats, DoorDash, Grubhub y otras en un solo panel.", icon: "chart" },
        { title: "Rendimiento de marcas virtuales", description: "Monitorea KPI de cada concepto de marca operando desde tu cocina con inteligencia separada.", icon: "owners" },
        { title: "Optimización del tiempo de entrega", description: "Analiza tiempos de preparación, entrega y satisfacción del cliente para optimizar operaciones.", icon: "time" },
      ],
      performanceCardTitle: "Rendimiento multimarca",
      averageDeliveryTime: "Tiempo promedio de entrega",
      platformRating: "Calificación de la plataforma",
      costPerDelivery: "Costo por entrega",
    },
    cta: {
      title: "¿Listo para escalar tus marcas?",
      description: "Mira cómo las cocinas cloud optimizan cada marca desde un solo panel.",
      primaryButton: "Programar demo de cocina cloud",
      secondaryButton: "Ver precios",
    },
  },
};

export default function CloudKitchensPage() {
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
          <Link href="/benchmarking">
            <Button variant="outline-light" size="lg">
              {copy.hero.secondaryCta}
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.problems.heading}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.problems.description}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.problems.items.map((challenge, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={challenge.icon} size="xl" className="text-white" />
                    </div>
                    <CardTitle className="text-[var(--text-primary)]">{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[var(--text-supporting)]">{challenge.description}</CardDescription>
                  </CardContent>
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
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.solutions.items.map((solution, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={solution.icon} size="xl" className="text-white" />
                    </div>
                    <CardTitle className="text-[var(--text-primary)]">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[var(--text-supporting)]">{solution.description}</CardDescription>
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
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.insights.heading}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.insights.description}</p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div className="space-y-8">
                {copy.insights.items.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <SundaeIcon name={feature.icon} size="md" className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                      <p className="text-[var(--text-supporting)]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-[var(--surface-faint)] rounded-2xl p-8 border border-[var(--border-default)]">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <SundaeIcon name="growth" size="xl" className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">{copy.insights.performanceCardTitle}</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">{copy.insights.averageDeliveryTime}</span>
                      <span className="text-lg font-bold text-green-500">↓ 15%</span>
                    </div>
                  </div>
                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">{copy.insights.platformRating}</span>
                      <span className="text-lg font-bold text-[#60A5FA]">4.7★</span>
                    </div>
                  </div>
                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">{copy.insights.costPerDelivery}</span>
                      <span className="text-lg font-bold text-purple-400">↓ 12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <PageCTA title={copy.cta.title} description={copy.cta.description}>
        <Link href="/demo">
          <Button variant="primary" size="lg">
            {copy.cta.primaryButton}
          </Button>
        </Link>
        <a href={PRICING_URL}>
          <Button variant="outline-light" size="lg">
            {copy.cta.secondaryButton}
          </Button>
        </a>
      </PageCTA>
    </div>
  );
}
