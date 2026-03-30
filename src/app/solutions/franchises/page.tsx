"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type SolutionCard = { title: string; description: string; icon: SundaeIconName };

type FranchiseCopy = {
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

const localizedCopy: Record<WebsiteLocale, FranchiseCopy> = {
  en: {
    hero: {
      badge: "Franchises",
      title: ["Your Network.", "One Dashboard."],
      description:
        "Visibility into every franchisee. Alerts before issues escalate. Intelligence-backed support that actually works.",
      primaryCta: "See How Sundae Helps Franchises",
      secondaryCta: "Start Free",
    },
    problems: {
      heading: "The Problems You Know",
      description: "Performance gaps. Fragmented data. Support blind spots.",
      items: [
        {
          title: "Franchisee Performance Variability",
          description:
            "Wide performance gaps between franchisees with no clear way to identify and address underperformance early.",
          icon: "benchmarking",
        },
        {
          title: "Brand Consistency Challenges",
          description:
            "Ensuring quality, service standards, and operational compliance across independently owned locations.",
          icon: "owners",
        },
        {
          title: "Data Fragmentation",
          description:
            "Each franchisee may use different systems, making network-wide insights nearly impossible.",
          icon: "integration",
        },
        {
          title: "Support & Training Gaps",
          description:
            "Identifying which franchisees need help and what kind of support will actually move the needle.",
          icon: "marketing",
        },
      ],
    },
    solutions: {
      heading: "How Sundae Changes That",
      description: "Support, not micromanage. Data, not assumptions.",
      items: [
        {
          title: "Network-Wide Visibility",
          description:
            "Sundae Core unifies data from all franchisees into one dashboard, giving you real-time visibility into every location's performance.",
          product: "Sundae Core",
          icon: "chart",
        },
        {
          title: "Automated Performance Alerts",
          description:
            "Sundae Core flags underperforming franchisees and identifies the specific areas needing attention before issues escalate.",
          product: "Sundae Core",
          icon: "alerts",
        },
        {
          title: "Benchmarking & Best Practices",
          description:
            "Sundae Report shows each franchisee how they compare to network leaders, creating healthy competition and clear improvement targets.",
          product: "Sundae Report",
          icon: "report",
        },
        {
          title: "Conversational Support",
          description:
            "Ask Sundae 'Which franchisees have the highest labor variance?' and get instant answers to guide your support efforts.",
          product: "Sundae Core",
          icon: "intelligence",
        },
      ],
    },
    outcomes: {
      heading: "What Changes",
      description: "Better franchisee relationships. Faster network growth.",
      items: [
        {
          title: "15-20% improvement in underperforming franchisees",
          description:
            "Identify issues early and provide targeted support to lift lagging locations.",
          icon: "growth",
        },
        {
          title: "Better franchisee relationships",
          description:
            "Use data to have constructive conversations and provide value-added support.",
          icon: "support",
        },
        {
          title: "Faster network growth",
          description:
            "Attract new franchisees by demonstrating your intelligence-backed support system.",
          icon: "speed",
        },
        {
          title: "Reduced brand risk",
          description:
            "Catch compliance and quality issues before they impact your reputation.",
          icon: "success",
        },
      ],
    },
    cta: {
      title: "Ready to Support Your Network?",
      description: "See how franchise brands drive consistency with data.",
      button: "Book a Franchise Demo",
    },
  },
  ar: {
    hero: {
      badge: "الامتيازات",
      title: ["شبكتك.", "لوحة واحدة."],
      description:
        "رؤية لكل صاحب امتياز. تنبيهات قبل تفاقم المشكلات. دعم مدعوم بالذكاء يعمل فعلاً.",
      primaryCta: "شاهد كيف تساعد Sundae الامتيازات",
      secondaryCta: "ابدأ مجانًا",
    },
    problems: {
      heading: "المشكلات التي تعرفها",
      description: "فجوات في الأداء. بيانات متفرقة. نقاط عمياء في الدعم.",
      items: [
        {
          title: "تباين أداء أصحاب الامتياز",
          description:
            "فجوات كبيرة بين أصحاب الامتياز من دون طريقة واضحة لاكتشاف الضعف والتعامل معه مبكراً.",
          icon: "benchmarking",
        },
        {
          title: "تحديات اتساق العلامة التجارية",
          description:
            "ضمان الجودة ومعايير الخدمة والالتزام التشغيلي عبر مواقع مملوكة بشكل مستقل.",
          icon: "owners",
        },
        {
          title: "تجزؤ البيانات",
          description:
            "قد يستخدم كل صاحب امتياز أنظمة مختلفة، مما يجعل الرؤية على مستوى الشبكة شبه مستحيلة.",
          icon: "integration",
        },
        {
          title: "فجوات الدعم والتدريب",
          description:
            "تحديد أصحاب الامتياز الذين يحتاجون إلى مساعدة ونوع الدعم الذي سيحدث فرقاً حقيقياً.",
          icon: "marketing",
        },
      ],
    },
    solutions: {
      heading: "كيف تغيّر Sundae ذلك",
      description: "دعم لا رقابة مفرطة. بيانات لا افتراضات.",
      items: [
        {
          title: "رؤية على مستوى الشبكة",
          description:
            "تجمع Sundae Core بيانات جميع أصحاب الامتياز في لوحة واحدة تمنحك رؤية لحظية لكل موقع.",
          product: "Sundae Core",
          icon: "chart",
        },
        {
          title: "تنبيهات أداء تلقائية",
          description:
            "تحدد Sundae Core أصحاب الامتياز المتراجعين والمجالات التي تحتاج إلى تدخل قبل تفاقم المشكلة.",
          product: "Sundae Core",
          icon: "alerts",
        },
        {
          title: "المعيارية وأفضل الممارسات",
          description:
            "يوضح Sundae Report لكل صاحب امتياز موقعه مقارنة بقادة الشبكة، ويخلق منافسة صحية وأهداف تحسين واضحة.",
          product: "Sundae Report",
          icon: "report",
        },
        {
          title: "دعم حواري",
          description:
            "اسأل Sundae: «أي أصحاب الامتياز لديهم أعلى تباين في العمالة؟» واحصل على إجابات فورية ترشد دعمك.",
          product: "Sundae Core",
          icon: "intelligence",
        },
      ],
    },
    outcomes: {
      heading: "ما الذي يتغير",
      description: "علاقات أفضل مع أصحاب الامتياز. نمو أسرع للشبكة.",
      items: [
        {
          title: "تحسن 15-20% لدى أصحاب الامتياز المتراجعين",
          description:
            "اكتشف المشكلات مبكراً وقدّم دعماً موجهاً لرفع المواقع الضعيفة.",
          icon: "growth",
        },
        {
          title: "علاقات أفضل مع أصحاب الامتياز",
          description:
            "استخدم البيانات لإجراء محادثات بناءة وتقديم دعم ذي قيمة مضافة.",
          icon: "support",
        },
        {
          title: "نمو أسرع للشبكة",
          description:
            "اجذب أصحاب امتياز جدد من خلال إظهار نظام دعم مدعوم بالذكاء.",
          icon: "speed",
        },
        {
          title: "خفض مخاطر العلامة التجارية",
          description:
            "اكتشف مشكلات الامتثال والجودة قبل أن تؤثر على سمعتك.",
          icon: "success",
        },
      ],
    },
    cta: {
      title: "هل أنت مستعد لدعم شبكتك؟",
      description: "شاهد كيف تدفع علامات الامتياز الاتساق بالاعتماد على البيانات.",
      button: "احجز عرضاً للامتيازات",
    },
  },
  fr: {
    hero: {
      badge: "Franchises",
      title: ["Votre réseau.", "Un seul tableau de bord."],
      description:
        "Visibilité sur chaque franchisé. Alertes avant que les problèmes ne s'aggravent. Un support guidé par l'intelligence qui fonctionne vraiment.",
      primaryCta: "Voir comment Sundae aide les franchises",
      secondaryCta: "Commencer gratuitement",
    },
    problems: {
      heading: "Les problèmes que vous connaissez",
      description: "Écarts de performance. Données fragmentées. Angles morts du support.",
      items: [
        {
          title: "Variabilité de performance des franchisés",
          description:
            "De grands écarts entre franchisés sans moyen clair de repérer et traiter rapidement les sous-performances.",
          icon: "benchmarking",
        },
        {
          title: "Défis de cohérence de marque",
          description:
            "Garantir la qualité, les standards de service et la conformité opérationnelle sur des sites indépendants.",
          icon: "owners",
        },
        {
          title: "Fragmentation des données",
          description:
            "Chaque franchisé peut utiliser des systèmes différents, rendant les insights réseau presque impossibles.",
          icon: "integration",
        },
        {
          title: "Lacunes de support et de formation",
          description:
            "Identifier quels franchisés ont besoin d'aide et quel type de support aura vraiment un impact.",
          icon: "marketing",
        },
      ],
    },
    solutions: {
      heading: "Comment Sundae change la donne",
      description: "Du support, pas de microgestion. Des données, pas des suppositions.",
      items: [
        {
          title: "Visibilité à l'échelle du réseau",
          description:
            "Sundae Core unifie les données de tous les franchisés dans un seul tableau de bord et offre une visibilité temps réel sur chaque site.",
          product: "Sundae Core",
          icon: "chart",
        },
        {
          title: "Alertes de performance automatisées",
          description:
            "Sundae Core signale les franchisés sous-performants et les zones à surveiller avant que les problèmes ne s'aggravent.",
          product: "Sundae Core",
          icon: "alerts",
        },
        {
          title: "Benchmarking et bonnes pratiques",
          description:
            "Sundae Report montre à chaque franchisé comment il se situe face aux leaders du réseau, avec une concurrence saine et des cibles claires.",
          product: "Sundae Report",
          icon: "report",
        },
        {
          title: "Support conversationnel",
          description:
            "Demandez à Sundae : « Quels franchisés ont la plus forte variance de main-d'œuvre ? » et obtenez des réponses instantanées.",
          product: "Sundae Core",
          icon: "intelligence",
        },
      ],
    },
    outcomes: {
      heading: "Ce qui change",
      description: "De meilleures relations franchisés. Une croissance réseau plus rapide.",
      items: [
        {
          title: "Amélioration de 15-20 % des franchisés sous-performants",
          description:
            "Repérez les problèmes tôt et apportez un support ciblé aux sites en difficulté.",
          icon: "growth",
        },
        {
          title: "Meilleures relations franchisés",
          description:
            "Utilisez les données pour mener des échanges constructifs et offrir un support à valeur ajoutée.",
          icon: "support",
        },
        {
          title: "Croissance réseau plus rapide",
          description:
            "Attirez de nouveaux franchisés en démontrant votre système de support guidé par l'intelligence.",
          icon: "speed",
        },
        {
          title: "Réduction du risque de marque",
          description:
            "Détectez les problèmes de conformité et de qualité avant qu'ils n'affectent votre réputation.",
          icon: "success",
        },
      ],
    },
    cta: {
      title: "Prêt à soutenir votre réseau ?",
      description: "Voyez comment les marques franchisées renforcent la cohérence grâce aux données.",
      button: "Réserver une démo franchise",
    },
  },
  es: {
    hero: {
      badge: "Franquicias",
      title: ["Tu red.", "Un solo panel."],
      description:
        "Visibilidad en cada franquiciado. Alertas antes de que los problemas escalen. Soporte guiado por inteligencia que realmente funciona.",
      primaryCta: "Ver cómo Sundae ayuda a las franquicias",
      secondaryCta: "Empezar gratis",
    },
    problems: {
      heading: "Los problemas que conoces",
      description: "Brechas de rendimiento. Datos fragmentados. Puntos ciegos de soporte.",
      items: [
        {
          title: "Variabilidad en el rendimiento de los franquiciados",
          description:
            "Grandes diferencias entre franquiciados sin una forma clara de detectar y abordar el bajo rendimiento a tiempo.",
          icon: "benchmarking",
        },
        {
          title: "Desafíos de consistencia de marca",
          description:
            "Asegurar calidad, estándares de servicio y cumplimiento operativo en ubicaciones de propiedad independiente.",
          icon: "owners",
        },
        {
          title: "Fragmentación de datos",
          description:
            "Cada franquiciado puede usar sistemas distintos, haciendo casi imposible obtener insights de toda la red.",
          icon: "integration",
        },
        {
          title: "Brechas de soporte y capacitación",
          description:
            "Identificar qué franquiciados necesitan ayuda y qué tipo de soporte realmente moverá la aguja.",
          icon: "marketing",
        },
      ],
    },
    solutions: {
      heading: "Cómo Sundae lo cambia",
      description: "Soporte, no microgestión. Datos, no supuestos.",
      items: [
        {
          title: "Visibilidad de toda la red",
          description:
            "Sundae Core unifica los datos de todos los franquiciados en un solo panel y te da visibilidad en tiempo real de cada ubicación.",
          product: "Sundae Core",
          icon: "chart",
        },
        {
          title: "Alertas automáticas de rendimiento",
          description:
            "Sundae Core señala a los franquiciados con bajo rendimiento y las áreas que requieren atención antes de que el problema escale.",
          product: "Sundae Core",
          icon: "alerts",
        },
        {
          title: "Benchmarking y mejores prácticas",
          description:
            "Sundae Report muestra a cada franquiciado cómo se compara con los líderes de la red, generando competencia sana y metas claras.",
          product: "Sundae Report",
          icon: "report",
        },
        {
          title: "Soporte conversacional",
          description:
            "Pregunta a Sundae: «¿Qué franquiciados tienen la mayor variación laboral?» y obtén respuestas instantáneas.",
          product: "Sundae Core",
          icon: "intelligence",
        },
      ],
    },
    outcomes: {
      heading: "Qué cambia",
      description: "Mejores relaciones con franquiciados. Crecimiento de red más rápido.",
      items: [
        {
          title: "Mejora del 15-20% en franquiciados con bajo rendimiento",
          description:
            "Detecta problemas a tiempo y brinda soporte dirigido a ubicaciones rezagadas.",
          icon: "growth",
        },
        {
          title: "Mejores relaciones con franquiciados",
          description:
            "Usa datos para tener conversaciones constructivas y ofrecer soporte de valor.",
          icon: "support",
        },
        {
          title: "Crecimiento de red más rápido",
          description:
            "Atrae nuevos franquiciados demostrando tu sistema de soporte impulsado por inteligencia.",
          icon: "speed",
        },
        {
          title: "Menor riesgo de marca",
          description:
            "Detecta problemas de cumplimiento y calidad antes de que afecten tu reputación.",
          icon: "success",
        },
      ],
    },
    cta: {
      title: "¿Listo para apoyar tu red?",
      description: "Mira cómo las marcas de franquicia impulsan la consistencia con datos.",
      button: "Reservar demo de franquicia",
    },
  },
};

export default function FranchisesPage() {
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
