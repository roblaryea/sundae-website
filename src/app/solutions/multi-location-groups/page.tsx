"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type SolutionCard = { title: string; description: string; icon: SundaeIconName };

type MultiLocationCopy = {
  hero: {
    badge: string;
    title: [string, string];
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  problems: {
    heading: string;
    description: string;
    items: SolutionCard[];
  };
  solutions: {
    heading: string;
    description: string;
    items: Array<SolutionCard & { product: string }>;
  };
  outcomes: {
    heading: string;
    description: string;
    items: SolutionCard[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

const localizedCopy: Record<WebsiteLocale, MultiLocationCopy> = {
  en: {
    hero: {
      badge: "Multi-Location Groups",
      title: ["Unify. Optimize.", "Scale."],
      description:
        "Every location. One platform. Real-time visibility and intelligent insights to replicate success everywhere.",
      primaryCta: "See How Sundae Helps Multi-Location Groups",
      secondaryCta: "Start Free",
    },
    problems: {
      heading: "The Problems You Know",
      description: "Fragmented data. Inconsistent performance. Slow decisions.",
      items: [
        {
          title: "Fragmented Data Across Locations",
          description:
            "Each location uses different systems, making it impossible to see a unified view of performance.",
          icon: "benchmarking",
        },
        {
          title: "Inconsistent Performance",
          description:
            "Some locations thrive while others underperform, but you don't know why or how to replicate success.",
          icon: "decrease",
        },
        {
          title: "Slow Decision-Making",
          description:
            "By the time you collect and analyze data from all locations, the opportunity to act has passed.",
          icon: "time",
        },
        {
          title: "Labor & Cost Control Issues",
          description:
            "Labor costs and food waste vary wildly across locations with no clear visibility into the root causes.",
          icon: "finance",
        },
      ],
    },
    solutions: {
      heading: "How Sundae Changes That",
      description: "One dashboard. Real-time insights. Portfolio-wide benchmarking.",
      items: [
        {
          title: "Unified Real-Time Dashboard",
          description:
            "Sundae Core brings all your locations into one view. Pulse monitors every shift with adaptive targets, labor productivity (SPLH, CPLH), server performance, and leakage detection across every site.",
          product: "Sundae Core + Pulse",
          icon: "chart",
        },
        {
          title: "Competitive & Market Intelligence",
          description:
            "Watchtower tracks named competitors at each location, monitors local events and market trends, and delivers synthesized daily briefings so you know what's happening inside and outside every site.",
          product: "Watchtower (Core tier)",
          icon: "watchtower",
        },
        {
          title: "Conversational Intelligence",
          description:
            "Ask Sundae 'Which locations are underperforming on labor cost?' or 'Where are competitors gaining ground?' and get instant answers combining internal performance with external market context.",
          product: "Sundae Intelligence",
          icon: "intelligence",
        },
        {
          title: "Benchmark Performance",
          description:
            "Sundae Report compares each location against your top performers and industry benchmarks, showing you exactly where to improve with auto-generated analysis and recommendations.",
          product: "Sundae Report",
          icon: "report",
        },
      ],
    },
    outcomes: {
      heading: "What Changes",
      description: "Lift underperformers. Reduce costs. Scale faster.",
      items: [
        {
          title: "10-15% improvement in underperforming locations",
          description: "Identify and replicate best practices from your top sites.",
          icon: "growth",
        },
        {
          title: "5-8% reduction in labor costs",
          description:
            "Optimize staffing across all locations based on real demand patterns.",
          icon: "speed",
        },
        {
          title: "Faster decision-making",
          description: "Act on opportunities and issues in hours, not days or weeks.",
          icon: "performance",
        },
        {
          title: "Consistent operational excellence",
          description:
            "Standardize processes while adapting to local market conditions.",
          icon: "success",
        },
      ],
    },
    cta: {
      title: "Ready to Unify Your Portfolio?",
      description: "See how multi-location groups replicate success everywhere.",
      button: "Book a Strategy Session",
    },
  },
  ar: {
    hero: {
      badge: "مجموعات متعددة المواقع",
      title: ["وحّد. حسّن.", "توسع."],
      description:
        "كل موقع. منصة واحدة. رؤية لحظية ورؤى ذكية لتكرار النجاح في كل مكان.",
      primaryCta: "شاهد كيف تساعد Sundae المجموعات متعددة المواقع",
      secondaryCta: "ابدأ مجانًا",
    },
    problems: {
      heading: "المشكلات التي تعرفها",
      description: "بيانات متفرقة. أداء غير متسق. قرارات بطيئة.",
      items: [
        {
          title: "بيانات متفرقة بين المواقع",
          description:
            "كل موقع يستخدم أنظمة مختلفة، مما يجعل من الصعب رؤية الأداء بشكل موحد.",
          icon: "benchmarking",
        },
        {
          title: "أداء غير متسق",
          description:
            "بعض المواقع تتفوق وأخرى تتراجع، لكن من دون معرفة السبب أو طريقة تكرار النجاح.",
          icon: "decrease",
        },
        {
          title: "بطء في اتخاذ القرار",
          description:
            "بحلول جمع البيانات وتحليلها من كل المواقع، تكون فرصة التحرك قد فاتت.",
          icon: "time",
        },
        {
          title: "مشكلات ضبط العمالة والتكاليف",
          description:
            "تتباين تكاليف العمالة وهدر الطعام بين المواقع من دون رؤية واضحة للأسباب الجذرية.",
          icon: "finance",
        },
      ],
    },
    solutions: {
      heading: "كيف تغيّر Sundae ذلك",
      description: "لوحة واحدة. رؤى لحظية. قياس أداء على مستوى المحفظة.",
      items: [
        {
          title: "لوحة موحّدة لحظية",
          description:
            "تجمع Sundae Core كل مواقعك في عرض واحد. يراقب Pulse كل وردية بأهداف متكيفة وإنتاجية العمالة وأداء الموظفين واكتشاف التسرب عبر كل موقع.",
          product: "Sundae Core + Pulse",
          icon: "chart",
        },
        {
          title: "ذكاء تنافسي وسوقي",
          description:
            "يتتبع Watchtower المنافسين المحددين في كل موقع، ويراقب الفعاليات المحلية واتجاهات السوق، ويرسل موجزات يومية ملخّصة.",
          product: "Watchtower (Core tier)",
          icon: "watchtower",
        },
        {
          title: "ذكاء حواري",
          description:
            "اسأل Sundae: «أي المواقع تتراجع في تكلفة العمالة؟» أو «أين يحقق المنافسون تقدماً؟» واحصل على إجابات فورية تجمع الأداء الداخلي بالسياق السوقي الخارجي.",
          product: "Sundae Intelligence",
          icon: "intelligence",
        },
        {
          title: "أداء معياري",
          description:
            "يقارن Sundae Report كل موقع بأفضل مواقعك ومعايير الصناعة، ويعرض بدقة أين تتحسن مع تحليل وتوصيات تلقائية.",
          product: "Sundae Report",
          icon: "report",
        },
      ],
    },
    outcomes: {
      heading: "ما الذي يتغير",
      description: "ارفع أداء المتأخرين. خفّض التكاليف. انمُ بسرعة أكبر.",
      items: [
        {
          title: "تحسن 10-15% في المواقع المتراجعة",
          description: "حدّد أفضل الممارسات وكررها عبر المواقع الأقوى.",
          icon: "growth",
        },
        {
          title: "خفض 5-8% في تكاليف العمالة",
          description: "حسّن التوظيف عبر المواقع وفق أنماط الطلب الفعلية.",
          icon: "speed",
        },
        {
          title: "قرارات أسرع",
          description: "تحرك خلال ساعات لا أيام أو أسابيع.",
          icon: "performance",
        },
        {
          title: "تميز تشغيلي متسق",
          description: "وحّد العمليات مع التكيّف مع ظروف السوق المحلية.",
          icon: "success",
        },
      ],
    },
    cta: {
      title: "هل أنت مستعد لتوحيد محفظتك؟",
      description: "شاهد كيف تكرر المجموعات متعددة المواقع النجاح في كل مكان.",
      button: "احجز جلسة استراتيجية",
    },
  },
  fr: {
    hero: {
      badge: "Groupes multi-sites",
      title: ["Unifier. Optimiser.", "Passer à l'échelle."],
      description:
        "Chaque site. Une seule plateforme. Une visibilité temps réel et des insights intelligents pour reproduire le succès partout.",
      primaryCta: "Voir comment Sundae aide les groupes multi-sites",
      secondaryCta: "Commencer gratuitement",
    },
    problems: {
      heading: "Les problèmes que vous connaissez",
      description: "Données fragmentées. Performance inégale. Décisions lentes.",
      items: [
        {
          title: "Données fragmentées entre les sites",
          description:
            "Chaque site utilise des systèmes différents, ce qui empêche une vision unifiée de la performance.",
          icon: "benchmarking",
        },
        {
          title: "Performance inégale",
          description:
            "Certains sites excellent pendant que d'autres sous-performent, sans savoir pourquoi ni comment reproduire le succès.",
          icon: "decrease",
        },
        {
          title: "Décisions lentes",
          description:
            "Le temps de collecter et d'analyser les données de tous les sites, l'opportunité est passée.",
          icon: "time",
        },
        {
          title: "Problèmes de coûts et de main-d'œuvre",
          description:
            "Les coûts de main-d'œuvre et le gaspillage alimentaire varient fortement sans visibilité sur les causes.",
          icon: "finance",
        },
      ],
    },
    solutions: {
      heading: "Comment Sundae change la donne",
      description: "Un tableau de bord. Des insights en temps réel. Un benchmark à l'échelle du portefeuille.",
      items: [
        {
          title: "Tableau de bord unifié en temps réel",
          description:
            "Sundae Core regroupe tous vos sites dans une vue unique. Pulse surveille chaque service avec des objectifs adaptatifs, la productivité de la main-d'œuvre et la détection des fuites.",
          product: "Sundae Core + Pulse",
          icon: "chart",
        },
        {
          title: "Intelligence concurrentielle et marché",
          description:
            "Watchtower suit les concurrents nommés sur chaque site, surveille les événements locaux et les tendances du marché, et livre des briefings quotidiens synthétisés.",
          product: "Watchtower (Core tier)",
          icon: "watchtower",
        },
        {
          title: "Intelligence conversationnelle",
          description:
            "Demandez à Sundae : « Quels sites sous-performent sur le coût de la main-d'œuvre ? » ou « Où les concurrents gagnent-ils du terrain ? » et obtenez des réponses instantanées.",
          product: "Sundae Intelligence",
          icon: "intelligence",
        },
        {
          title: "Performance benchmarkée",
          description:
            "Sundae Report compare chaque site à vos meilleurs performeurs et aux benchmarks du secteur, avec analyses et recommandations automatiques.",
          product: "Sundae Report",
          icon: "report",
        },
      ],
    },
    outcomes: {
      heading: "Ce qui change",
      description: "Faites remonter les sites faibles. Réduisez les coûts. Accélérez l'échelle.",
      items: [
        {
          title: "Amélioration de 10-15 % des sites sous-performants",
          description: "Identifiez et reproduisez les meilleures pratiques de vos meilleurs sites.",
          icon: "growth",
        },
        {
          title: "Réduction de 5-8 % des coûts de main-d'œuvre",
          description:
            "Optimisez le staffing selon la demande réelle sur tous les sites.",
          icon: "speed",
        },
        {
          title: "Décisions plus rapides",
          description: "Agissez en quelques heures, pas en jours ou semaines.",
          icon: "performance",
        },
        {
          title: "Excellence opérationnelle constante",
          description:
            "Standardisez les processus tout en vous adaptant aux conditions locales.",
          icon: "success",
        },
      ],
    },
    cta: {
      title: "Prêt à unifier votre portefeuille ?",
      description: "Voyez comment les groupes multi-sites reproduisent le succès partout.",
      button: "Réserver une session stratégique",
    },
  },
  es: {
    hero: {
      badge: "Grupos multiubicación",
      title: ["Unifica. Optimiza.", "Escala."],
      description:
        "Cada ubicación. Una sola plataforma. Visibilidad en tiempo real e insights inteligentes para replicar el éxito en todos lados.",
      primaryCta: "Ver cómo Sundae ayuda a grupos multiubicación",
      secondaryCta: "Empezar gratis",
    },
    problems: {
      heading: "Los problemas que conoces",
      description: "Datos fragmentados. Rendimiento inconsistente. Decisiones lentas.",
      items: [
        {
          title: "Datos fragmentados entre ubicaciones",
          description:
            "Cada ubicación usa sistemas distintos, lo que hace imposible ver una visión unificada del rendimiento.",
          icon: "benchmarking",
        },
        {
          title: "Rendimiento inconsistente",
          description:
            "Algunas ubicaciones prosperan mientras otras quedan rezagadas, pero no sabes por qué ni cómo repetir el éxito.",
          icon: "decrease",
        },
        {
          title: "Toma de decisiones lenta",
          description:
            "Cuando recoges y analizas los datos de todas las ubicaciones, la oportunidad ya pasó.",
          icon: "time",
        },
        {
          title: "Problemas de control de mano de obra y costos",
          description:
            "Los costos laborales y el desperdicio de alimentos varían mucho entre ubicaciones sin visibilidad clara sobre las causas.",
          icon: "finance",
        },
      ],
    },
    solutions: {
      heading: "Cómo lo cambia Sundae",
      description: "Un panel. Insights en tiempo real. Benchmarking a nivel de portafolio.",
      items: [
        {
          title: "Panel unificado en tiempo real",
          description:
            "Sundae Core reúne todas tus ubicaciones en una sola vista. Pulse monitorea cada turno con objetivos adaptativos, productividad laboral y detección de fugas.",
          product: "Sundae Core + Pulse",
          icon: "chart",
        },
        {
          title: "Inteligencia competitiva y de mercado",
          description:
            "Watchtower sigue a los competidores en cada ubicación, monitorea eventos locales y tendencias del mercado, y entrega resúmenes diarios sintetizados.",
          product: "Watchtower (Core tier)",
          icon: "watchtower",
        },
        {
          title: "Inteligencia conversacional",
          description:
            "Pregunta a Sundae: «¿Qué ubicaciones están rindiendo por debajo en costo laboral?» o «¿Dónde están ganando terreno los competidores?» y recibe respuestas instantáneas.",
          product: "Sundae Intelligence",
          icon: "intelligence",
        },
        {
          title: "Rendimiento de referencia",
          description:
            "Sundae Report compara cada ubicación con tus mejores operaciones y con los benchmarks del sector, mostrando exactamente dónde mejorar.",
          product: "Sundae Report",
          icon: "report",
        },
      ],
    },
    outcomes: {
      heading: "Qué cambia",
      description: "Impulsa a las ubicaciones rezagadas. Reduce costos. Escala más rápido.",
      items: [
        {
          title: "Mejora del 10-15% en ubicaciones con bajo rendimiento",
          description: "Identifica y replica las mejores prácticas de tus mejores sitios.",
          icon: "growth",
        },
        {
          title: "Reducción del 5-8% en costos laborales",
          description: "Optimiza la dotación en todas las ubicaciones según la demanda real.",
          icon: "speed",
        },
        {
          title: "Decisiones más rápidas",
          description: "Actúa en horas, no en días o semanas.",
          icon: "performance",
        },
        {
          title: "Excelencia operativa consistente",
          description:
            "Estandariza procesos y adapta según las condiciones del mercado local.",
          icon: "success",
        },
      ],
    },
    cta: {
      title: "¿Listo para unificar tu portafolio?",
      description: "Mira cómo los grupos multiubicación replican el éxito en todos lados.",
      button: "Reservar una sesión estratégica",
    },
  },
};

export default function MultiLocationGroupsPage() {
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
          <Link href="/demo">
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
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              {copy.problems.description}
            </p>
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
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              {copy.solutions.description}
            </p>
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
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              {copy.outcomes.description}
            </p>
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
