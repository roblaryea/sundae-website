"use client";

import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
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

const localizedCSuiteCopy: Record<"en" | "ar" | "fr" | "es", RoleSolutionCopy> = {
  en: {
    badge: "C-Suite Executives",
    titleLine1: "Lead with Clarity.",
    titleLine2: "Not Guesswork.",
    description: "Real-time visibility. Predictive intelligence. One platform that unifies everything you need to make confident decisions at scale.",
    primaryCta: "See How Sundae Works for Executives",
    secondaryCta: "Get Executive Benchmark Report",
    problemsTitle: "The Problems You Know",
    problemsDescription: "Silos, stale data, and reactive decision-making.",
    challenges: [
      { title: "Decisions Made on Yesterday's Numbers", description: "Critical calls rely on stale data, leading to missed opportunities and reactive management.", icon: "benchmarking" },
      { title: "Disconnected Data Sources", description: "Finance, operations, and marketing data live in silos, making it impossible to see the complete picture.", icon: "integration" },
      { title: "No Forward-Looking Intelligence", description: "You can see what happened, but not what's about to happen or why it's happening.", icon: "forecasting" },
      { title: "Strategic vs. Operational Trade-off", description: "You're forced to choose between strategic thinking and operational firefighting - there's no time for both.", icon: "balance" },
    ],
    howTitle: "How Sundae Changes That",
    howDescription: "Intelligence built for executive decision-making.",
    howSundaeHelps: [
      { title: "Executive Command Center", description: "Sundae Core delivers a real-time executive dashboard with KPIs that matter - revenue, margins, labor productivity, and performance across your entire portfolio. Pulse monitors every shift with adaptive targets and server performance.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Competitive & Market Intelligence", description: "Watchtower tracks named competitors, monitors local events, and surfaces market trends - synthesized with your internal data into daily briefings so you know what's happening inside and outside your business.", product: "Watchtower (Core tier)", icon: "watchtower" },
      { title: "Instant Strategic Answers", description: "Ask Sundae what is driving margin compression or which locations are losing to competitor promotions and get numbers-backed answers combining internal performance with external market context.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Historical Benchmarking", description: "Sundae Report shows how you compare to industry leaders and identifies gaps in performance, efficiency, and growth - with credits for deeper analysis.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "What Changes",
    outcomesDescription: "Measurable impact on speed, visibility, and growth.",
    outcomes: [
      { title: "Make faster, numbers-backed decisions", description: "Move from monthly reviews to real-time intelligence, enabling agile strategic adjustments.", icon: "speed" },
      { title: "15-20% improvement in key metrics", description: "Optimize margins, reduce costs, and improve operational efficiency across the portfolio.", icon: "performance" },
      { title: "Reduce strategic risk", description: "Identify threats and opportunities early with predictive intelligence and market signals.", icon: "owners" },
      { title: "Unite your leadership team", description: "Give everyone access to the same real-time data and insights, aligning strategy and execution.", icon: "support" },
    ],
    ctaTitle: "Ready to Lead Smarter?",
    ctaDescription: "See how Sundae gives executives the clarity to make confident decisions.",
    ctaButton: "Book an Executive Briefing",
  },
  ar: {
    badge: "القيادة التنفيذية",
    titleLine1: "قد بقيادة واضحة.",
    titleLine2: "وليس بالتخمين.",
    description: "رؤية لحظية. ذكاء تنبؤي. منصة واحدة توحد كل ما تحتاجه لاتخاذ قرارات واثقة على نطاق واسع.",
    primaryCta: "شاهد كيف يعمل Sundae للمديرين التنفيذيين",
    secondaryCta: "احصل على تقرير معياري تنفيذي",
    problemsTitle: "المشكلات التي تعرفها",
    problemsDescription: "جزر معزولة. بيانات قديمة. قرارات رد فعل.",
    challenges: [
      { title: "قرارات مبنية على أرقام الأمس", description: "تعتمد القرارات الحرجة على بيانات قديمة، ما يؤدي إلى فرص ضائعة وإدارة تفاعلية.", icon: "benchmarking" },
      { title: "مصادر بيانات منفصلة", description: "تعيش بيانات المالية والعمليات والتسويق في جزر منفصلة، لذلك من المستحيل رؤية الصورة الكاملة.", icon: "integration" },
      { title: "لا يوجد ذكاء استباقي", description: "ترى ما حدث، لكن لا ترى ما سيحدث أو لماذا يحدث.", icon: "forecasting" },
      { title: "مفاضلة بين الاستراتيجية والتشغيل", description: "تُجبر على الاختيار بين التفكير الاستراتيجي ومطاردة المشكلات التشغيلية.", icon: "balance" },
    ],
    howTitle: "كيف يغير Sundae ذلك",
    howDescription: "ذكاء مصمم لصنع القرار التنفيذي.",
    howSundaeHelps: [
      { title: "مركز قيادة تنفيذي", description: "يوفر Sundae Core لوحة تنفيذية لحظية بالمؤشرات المهمة - الإيرادات والهوامش وإنتاجية العمالة والأداء عبر محفظتك كاملة.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "ذكاء تنافسي وسوقي", description: "يتتبع Watchtower المنافسين ويُراقب الأحداث المحلية ويستخلص اتجاهات السوق مع البيانات الداخلية في موجزات يومية.", product: "Watchtower (Core tier)", icon: "watchtower" },
      { title: "إجابات استراتيجية فورية", description: "اسأل Sundae عن أسباب تقلص الهامش أو المواقع التي تخسر أمام عروض المنافسين واحصل على إجابات مدعومة بالأرقام.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "معايير تاريخية", description: "يُظهر Sundae Report كيف تقارن بالقادة في المجال ويحدد فجوات الأداء والكفاءة والنمو.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "ما الذي يتغير",
    outcomesDescription: "أثر قابل للقياس على السرعة والرؤية والنمو.",
    outcomes: [
      { title: "قرارات أسرع ومدعومة بالأرقام", description: "انتقل من المراجعات الشهرية إلى ذكاء لحظي يتيح تعديلات استراتيجية سريعة.", icon: "speed" },
      { title: "تحسن 15-20% في المقاييس الرئيسية", description: "حسّن الهوامش وقلل التكاليف وارفع الكفاءة التشغيلية.", icon: "performance" },
      { title: "خفض المخاطر الاستراتيجية", description: "حدد التهديدات والفرص مبكرًا باستخدام الذكاء التنبؤي وإشارات السوق.", icon: "owners" },
      { title: "وحدة أفضل لفريق القيادة", description: "أعطِ الجميع وصولًا إلى نفس البيانات والرؤى لحظيًا.", icon: "support" },
    ],
    ctaTitle: "هل أنت مستعد للقيادة بذكاء؟",
    ctaDescription: "شاهد كيف يمنح Sundae المدراء التنفيذيين الوضوح لاتخاذ قرارات واثقة.",
    ctaButton: "احجز إحاطة تنفيذية",
  },
  fr: {
    badge: "Dirigeants",
    titleLine1: "Dirigez avec clarté.",
    titleLine2: "Pas avec des suppositions.",
    description: "Visibilité en temps réel. Intelligence prédictive. Une plateforme qui unifie tout ce qu'il faut pour décider avec assurance à grande échelle.",
    primaryCta: "Voir comment Sundae aide les dirigeants",
    secondaryCta: "Obtenir le rapport de benchmark exécutif",
    problemsTitle: "Les problèmes que vous connaissez",
    problemsDescription: "Silos, données obsolètes et décisions réactives.",
    challenges: [
      { title: "Décisions fondées sur les chiffres d'hier", description: "Les décisions critiques s'appuient sur des données anciennes, ce qui entraîne des occasions manquées.", icon: "benchmarking" },
      { title: "Sources de données déconnectées", description: "Finance, opérations et marketing vivent en silos, empêchant une vision complète.", icon: "integration" },
      { title: "Pas d'intelligence prospective", description: "Vous voyez ce qui s'est passé, mais pas ce qui va se passer ni pourquoi.", icon: "forecasting" },
      { title: "Arbitrage stratégie vs opération", description: "Vous devez choisir entre réflexion stratégique et gestion des urgences.", icon: "balance" },
    ],
    howTitle: "Comment Sundae change cela",
    howDescription: "Une intelligence conçue pour la décision exécutive.",
    howSundaeHelps: [
      { title: "Centre de commande exécutif", description: "Sundae Core fournit un tableau de bord en temps réel avec les KPI clés - revenu, marges, productivité et performance.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Intelligence concurrentielle et marché", description: "Watchtower suit les concurrents, les événements locaux et les tendances du marché, puis synthétise le tout dans des briefings quotidiens.", product: "Watchtower (Core tier)", icon: "watchtower" },
      { title: "Réponses stratégiques instantanées", description: "Demandez à Sundae ce qui comprime les marges ou quels sites perdent face aux promotions concurrentes et obtenez une réponse chiffrée.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Benchmark historique", description: "Sundae Report montre votre position face aux leaders du secteur et identifie les écarts de performance.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Ce qui change",
    outcomesDescription: "Un impact mesurable sur la vitesse, la visibilité et la croissance.",
    outcomes: [
      { title: "Décider plus vite", description: "Passez des revues mensuelles à une intelligence en temps réel.", icon: "speed" },
      { title: "Amélioration de 15-20 % des métriques clés", description: "Optimisez les marges, réduisez les coûts et améliorez l'efficacité.", icon: "performance" },
      { title: "Réduire le risque stratégique", description: "Repérez tôt menaces et opportunités grâce à l'intelligence prédictive.", icon: "owners" },
      { title: "Unifier l'équipe dirigeante", description: "Donnez à tous accès aux mêmes données et insights en temps réel.", icon: "support" },
    ],
    ctaTitle: "Prêt à diriger plus intelligemment ?",
    ctaDescription: "Voyez comment Sundae donne aux dirigeants la clarté nécessaire pour décider avec confiance.",
    ctaButton: "Réserver un briefing exécutif",
  },
  es: {
    badge: "Alta dirección",
    titleLine1: "Lidera con claridad.",
    titleLine2: "No con suposiciones.",
    description: "Visibilidad en tiempo real. Inteligencia predictiva. Una plataforma que unifica todo lo necesario para decidir con confianza a escala.",
    primaryCta: "Ver cómo Sundae ayuda a la alta dirección",
    secondaryCta: "Obtener informe ejecutivo de benchmark",
    problemsTitle: "Los problemas que ya conoces",
    problemsDescription: "Silos, datos obsoletos y decisiones reactivas.",
    challenges: [
      { title: "Decisiones basadas en números de ayer", description: "Las decisiones críticas dependen de datos antiguos, lo que provoca oportunidades perdidas.", icon: "benchmarking" },
      { title: "Fuentes de datos desconectadas", description: "Finanzas, operaciones y marketing viven en silos, así que no se ve el panorama completo.", icon: "integration" },
      { title: "Sin inteligencia a futuro", description: "Ves lo que pasó, pero no lo que está por pasar ni por qué.", icon: "forecasting" },
      { title: "Tensión entre estrategia y operación", description: "Debes elegir entre pensar estratégicamente o apagar incendios.", icon: "balance" },
    ],
    howTitle: "Cómo cambia esto Sundae",
    howDescription: "Inteligencia diseñada para la toma de decisiones ejecutivas.",
    howSundaeHelps: [
      { title: "Centro de mando ejecutivo", description: "Sundae Core ofrece un panel ejecutivo en tiempo real con KPIs clave: ingresos, márgenes, productividad y rendimiento.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Inteligencia competitiva y de mercado", description: "Watchtower sigue competidores, eventos locales y tendencias del mercado, y lo sintetiza en informes diarios.", product: "Watchtower (Core tier)", icon: "watchtower" },
      { title: "Respuestas estratégicas instantáneas", description: "Pregunta a Sundae qué está comprimiendo márgenes o qué ubicaciones pierden frente a promociones rivales y recibe respuestas con números.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Benchmark histórico", description: "Sundae Report muestra cómo te comparas con líderes del sector e identifica brechas de rendimiento.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Qué cambia",
    outcomesDescription: "Impacto medible en velocidad, visibilidad y crecimiento.",
    outcomes: [
      { title: "Decidir más rápido", description: "Pasa de revisiones mensuales a inteligencia en tiempo real.", icon: "speed" },
      { title: "Mejora del 15-20% en métricas clave", description: "Optimiza márgenes, reduce costes y mejora la eficiencia.", icon: "performance" },
      { title: "Reducir el riesgo estratégico", description: "Detecta amenazas y oportunidades temprano con inteligencia predictiva.", icon: "owners" },
      { title: "Unir al equipo directivo", description: "Da a todos acceso a los mismos datos e insights en tiempo real.", icon: "support" },
    ],
    ctaTitle: "¿Listo para liderar mejor?",
    ctaDescription: "Ve cómo Sundae da a la alta dirección la claridad para decidir con confianza.",
    ctaButton: "Reservar briefing ejecutivo",
  },
};

export default function CSuiteExecutivesPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCSuiteCopy[locale] ?? localizedCSuiteCopy.en;

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
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">{copy.secondaryCta}</Button>
          </a>
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
