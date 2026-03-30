"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

type RoleSolutionCopy = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  problemsTitle: string;
  problemsDescription: string;
  challenges: { title: string; description: string; icon: SundaeIconName }[];
  howTitle: string;
  howDescription: string;
  howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[];
  outcomesTitle: string;
  outcomesDescription: string;
  outcomes: { title: string; description: string; icon: SundaeIconName }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
};

const localizedTechnologyCopy: Record<"en" | "ar" | "fr" | "es", RoleSolutionCopy> = {
  en: {
    badge: "Data & Technology Teams",
    titleLine1: "Connect Once.",
    titleLine2: "Access Everything.",
    description: "Pre-built connectors. Automated data quality. Operator-facing intelligence. Stop plumbing data and start building value.",
    primaryCta: "See Technical Architecture",
    secondaryCta: "View Integrations",
    problemsTitle: "The Problems You Know",
    problemsDescription: "Custom ETL. Data quality issues. Endless report requests.",
    challenges: [
      { title: "Integration Complexity", description: "Managing data pipelines from dozens of restaurant systems with different APIs and data formats.", icon: "integration" },
      { title: "Data Quality Issues", description: "Inconsistent data, missing fields, and reconciliation nightmares across POS, payroll, and inventory systems.", icon: "alerts" },
      { title: "Scalability Demands", description: "As the restaurant group grows, data infrastructure struggles to keep pace with increasing complexity.", icon: "performance" },
      { title: "Reporting Bottlenecks", description: "Every new report request means custom ETL work, taking time away from strategic initiatives.", icon: "time" },
    ],
    howTitle: "How Sundae Changes That",
    howDescription: "Scalable infrastructure that works out of the box.",
    howSundaeHelps: [
      { title: "Pre-Built Integrations", description: "Sundae Scout connects to 25+ restaurant systems out of the box - POS, labor, inventory, CRM - with automatic data normalization.", product: "Sundae Scout", icon: "scout" },
      { title: "Automated Data Quality", description: "Sundae Pulse monitors data pipelines, flags anomalies, and alerts you to integration issues before they impact reporting.", product: "Sundae Pulse", icon: "pulse" },
      { title: "Operator-Facing Intelligence", description: "Sundae Core lets business operators query data directly with natural language - reducing IT reporting backlog by 75%.", product: "Sundae Core", icon: "intelligence" },
      { title: "API-First Architecture", description: "Sundae's RESTful API lets you build custom integrations, push data to your warehouse, or embed intelligence into existing tools.", product: "Sundae API", icon: "technology" },
    ],
    outcomesTitle: "What Changes",
    outcomesDescription: "Less plumbing. More innovation.",
    outcomes: [
      { title: "80% less integration time", description: "Pre-built connectors eliminate months of custom integration work.", icon: "speed" },
      { title: "Eliminate reporting bottlenecks", description: "Operator-facing intelligence frees your team to focus on strategic projects.", icon: "growth" },
      { title: "Scale data infrastructure", description: "Auto-scaling architecture grows with your restaurant portfolio.", icon: "benchmarking" },
      { title: "Improve data quality", description: "Automated monitoring and validation ensure clean, reliable data.", icon: "success" },
    ],
    ctaTitle: "Ready to Simplify Your Stack?",
    ctaDescription: "See how technology teams eliminate integration complexity.",
    ctaButton: "Book a Technical Deep Dive",
  },
  ar: {
    badge: "فرق البيانات والتقنية",
    titleLine1: "اتصل مرة واحدة.",
    titleLine2: "وافتح كل شيء.",
    description: "موصلات جاهزة. جودة بيانات مؤتمتة. ذكاء موجّه للمشغلين. توقف عن سباكة البيانات وابدأ في بناء القيمة.",
    primaryCta: "عرض البنية التقنية",
    secondaryCta: "عرض التكاملات",
    problemsTitle: "المشكلات التي تعرفها",
    problemsDescription: "ETL مخصص. مشكلات جودة البيانات. طلبات تقارير لا تنتهي.",
    challenges: [
      { title: "تعقيد التكامل", description: "إدارة مسارات البيانات من عشرات أنظمة المطاعم ذات واجهات ونسق بيانات مختلفة.", icon: "integration" },
      { title: "مشكلات جودة البيانات", description: "بيانات غير متسقة وحقول مفقودة وكوابيس المطابقة عبر أنظمة نقاط البيع والرواتب والمخزون.", icon: "alerts" },
      { title: "متطلبات التوسع", description: "مع نمو المجموعة، تكافح البنية التحتية للبيانات لمواكبة التعقيد.", icon: "performance" },
      { title: "اختناقات التقارير", description: "كل طلب تقرير جديد يعني عمل ETL مخصصًا، ما يسرق الوقت من المبادرات الاستراتيجية.", icon: "time" },
    ],
    howTitle: "كيف يغير Sundae ذلك",
    howDescription: "بنية قابلة للتوسع تعمل مباشرة من الصندوق.",
    howSundaeHelps: [
      { title: "تكاملات جاهزة", description: "يتصل Sundae Scout بأكثر من 25 نظامًا مباشرة - POS والعمالة والمخزون وCRM - مع تطبيع تلقائي للبيانات.", product: "Sundae Scout", icon: "scout" },
      { title: "جودة بيانات مؤتمتة", description: "يراقب Sundae Pulse مسارات البيانات ويكشف الشذوذ وينبهك لمشكلات التكامل قبل أن تؤثر على التقارير.", product: "Sundae Pulse", icon: "pulse" },
      { title: "ذكاء موجّه للمشغلين", description: "يتيح Sundae Core للمشغلين الاستعلام عن البيانات مباشرة بلغة طبيعية ويقلل تراكم تقارير التقنية بنسبة 75%.", product: "Sundae Core", icon: "intelligence" },
      { title: "بنية API أولًا", description: "تسمح لك REST API من Sundae ببناء تكاملات مخصصة أو دفع البيانات إلى مستودعك أو تضمين الذكاء في أدواتك الحالية.", product: "Sundae API", icon: "technology" },
    ],
    outcomesTitle: "ما الذي يتغير",
    outcomesDescription: "سباكة أقل. ابتكار أكثر.",
    outcomes: [
      { title: "وقت تكامل أقل بنسبة 80%", description: "الموصلات الجاهزة تلغي شهورًا من أعمال التكامل المخصص.", icon: "speed" },
      { title: "تخفيف اختناقات التقارير", description: "الذكاء الموجه للمشغلين يحرر فريقك للمشاريع الاستراتيجية.", icon: "growth" },
      { title: "توسيع البنية التحتية للبيانات", description: "البنية ذات التوسع التلقائي تنمو مع محفظة مطاعمك.", icon: "benchmarking" },
      { title: "تحسين جودة البيانات", description: "المراقبة والتحقق المؤتمتان يضمنان بيانات نظيفة وموثوقة.", icon: "success" },
    ],
    ctaTitle: "هل أنت مستعد لتبسيط البنية لديك؟",
    ctaDescription: "شاهد كيف تلغي فرق التقنية تعقيد التكامل.",
    ctaButton: "احجز جلسة تقنية معمقة",
  },
  fr: {
    badge: "Équipes data & technologie",
    titleLine1: "Connectez une fois.",
    titleLine2: "Accédez à tout.",
    description: "Connecteurs prêts à l'emploi. Qualité de données automatisée. Intelligence côté opérateur. Arrêtez de faire de la plomberie data, commencez à créer de la valeur.",
    primaryCta: "Voir l'architecture technique",
    secondaryCta: "Voir les intégrations",
    problemsTitle: "Les problèmes que vous connaissez",
    problemsDescription: "ETL sur mesure. Problèmes de qualité. Demandes de rapports sans fin.",
    challenges: [
      { title: "Complexité d'intégration", description: "Gérer des pipelines de données pour des dizaines de systèmes différents.", icon: "integration" },
      { title: "Problèmes de qualité", description: "Données incohérentes, champs manquants et rapprochements pénibles.", icon: "alerts" },
      { title: "Exigences de scalabilité", description: "À mesure que le groupe grandit, l'infrastructure peine à suivre la complexité.", icon: "performance" },
      { title: "Goulots d'étranglement de reporting", description: "Chaque nouveau rapport signifie un ETL sur mesure.", icon: "time" },
    ],
    howTitle: "Comment Sundae change cela",
    howDescription: "Une infrastructure scalable qui fonctionne immédiatement.",
    howSundaeHelps: [
      { title: "Intégrations prêtes à l'emploi", description: "Sundae Scout se connecte à plus de 25 systèmes restaurant - POS, main-d'oeuvre, inventaire, CRM - avec normalisation automatique.", product: "Sundae Scout", icon: "scout" },
      { title: "Qualité des données automatisée", description: "Sundae Pulse surveille les pipelines, signale les anomalies et vous alerte avant que le reporting ne soit impacté.", product: "Sundae Pulse", icon: "pulse" },
      { title: "Intelligence côté opérateur", description: "Sundae Core permet aux opérateurs d'interroger les données en langage naturel et réduit le backlog IT de 75%.", product: "Sundae Core", icon: "intelligence" },
      { title: "Architecture API-first", description: "L'API REST de Sundae vous laisse créer des intégrations, pousser des données vers votre warehouse ou intégrer l'intelligence à vos outils.", product: "Sundae API", icon: "technology" },
    ],
    outcomesTitle: "Ce qui change",
    outcomesDescription: "Moins de plomberie. Plus d'innovation.",
    outcomes: [
      { title: "80 % de temps d'intégration en moins", description: "Les connecteurs prêts à l'emploi éliminent des mois de travail sur mesure.", icon: "speed" },
      { title: "Supprimer les goulots d'étranglement", description: "L'intelligence côté opérateur libère votre équipe pour des projets stratégiques.", icon: "growth" },
      { title: "Scalable data infra", description: "L'architecture auto-scalable grandit avec votre portefeuille.", icon: "benchmarking" },
      { title: "Améliorer la qualité", description: "La surveillance et la validation automatiques assurent des données fiables.", icon: "success" },
    ],
    ctaTitle: "Prêt à simplifier votre stack ?",
    ctaDescription: "Voyez comment les équipes tech éliminent la complexité d'intégration.",
    ctaButton: "Réserver une session technique",
  },
  es: {
    badge: "Equipos de datos y tecnología",
    titleLine1: "Conecta una vez.",
    titleLine2: "Accede a todo.",
    description: "Conectores preconstruidos. Calidad de datos automatizada. Inteligencia para operadores. Deja de hacer fontanería de datos y empieza a crear valor.",
    primaryCta: "Ver arquitectura técnica",
    secondaryCta: "Ver integraciones",
    problemsTitle: "Los problemas que ya conoces",
    problemsDescription: "ETL a medida. Problemas de calidad. Peticiones de informes sin fin.",
    challenges: [
      { title: "Complejidad de integración", description: "Gestionar pipelines de datos para decenas de sistemas con APIs y formatos distintos.", icon: "integration" },
      { title: "Problemas de calidad de datos", description: "Datos inconsistentes, campos faltantes y conciliaciones dolorosas.", icon: "alerts" },
      { title: "Exigencias de escalabilidad", description: "A medida que el grupo crece, la infraestructura no da abasto con la complejidad.", icon: "performance" },
      { title: "Cuellos de botella en reporting", description: "Cada nuevo informe significa trabajo ETL a medida.", icon: "time" },
    ],
    howTitle: "Cómo cambia esto Sundae",
    howDescription: "Infraestructura escalable que funciona desde el primer día.",
    howSundaeHelps: [
      { title: "Integraciones preconstruidas", description: "Sundae Scout se conecta a más de 25 sistemas - POS, personal, inventario, CRM - con normalización automática.", product: "Sundae Scout", icon: "scout" },
      { title: "Calidad de datos automatizada", description: "Sundae Pulse monitoriza los pipelines, detecta anomalías y te avisa antes de que afecten al reporting.", product: "Sundae Pulse", icon: "pulse" },
      { title: "Inteligencia para operadores", description: "Sundae Core permite consultar datos en lenguaje natural y reduce en 75% la cola de reporting de IT.", product: "Sundae Core", icon: "intelligence" },
      { title: "Arquitectura API-first", description: "La API REST de Sundae te permite crear integraciones, enviar datos al warehouse o incrustar inteligencia en herramientas existentes.", product: "Sundae API", icon: "technology" },
    ],
    outcomesTitle: "Qué cambia",
    outcomesDescription: "Menos fontanería. Más innovación.",
    outcomes: [
      { title: "80% menos tiempo de integración", description: "Los conectores listos para usar eliminan meses de trabajo a medida.", icon: "speed" },
      { title: "Eliminar cuellos de botella", description: "La inteligencia para operadores libera a tu equipo para proyectos estratégicos.", icon: "growth" },
      { title: "Escalar la infraestructura", description: "La arquitectura autoescalable crece con tu portafolio.", icon: "benchmarking" },
      { title: "Mejorar la calidad", description: "La monitorización y validación automáticas garantizan datos limpios.", icon: "success" },
    ],
    ctaTitle: "¿Listo para simplificar tu stack?",
    ctaDescription: "Ve cómo los equipos de tecnología eliminan la complejidad de integración.",
    ctaButton: "Reservar sesión técnica",
  },
};

export default function TechnologyTeamsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedTechnologyCopy[locale] ?? localizedTechnologyCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge={copy.badge}
        title={<>
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </>}
        description={copy.description}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">{copy.primaryCta}</Button>
          </Link>
          <Link href="/integrations">
            <Button variant="outline-light" size="lg">{copy.secondaryCta}</Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.problemsTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.problemsDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.challenges.map((challenge, index) => (
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
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.howTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.howDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.howSundaeHelps.map((item, index) => (
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
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.outcomesTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.outcomesDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.outcomes.map((outcome, index) => (
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

      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <Link href="/demo">
          <Button variant="primary" size="lg">{copy.ctaButton}</Button>
        </Link>
      </PageCTA>
    </div>
  );
}
