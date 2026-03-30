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

const localizedRegionalCopy: Record<"en" | "ar" | "fr" | "es", RoleSolutionCopy> = {
  en: {
    badge: "Regional Managers",
    titleLine1: "Every Location.",
    titleLine2: "One View.",
    description: "Real-time visibility. Proactive alerts. Numbers-backed coaching. Manage your region without living on the road.",
    primaryCta: "See How Sundae Works for RMs",
    secondaryCta: "Get Regional Benchmark Report",
    problemsTitle: "The Problems You Know",
    problemsDescription: "Firefighting. Limited visibility. Too much travel.",
    challenges: [
      { title: "Limited Visibility Across Locations", description: "You're responsible for multiple sites but lack real-time visibility into what's happening at each one.", icon: "watchtower" },
      { title: "Firefighting Mode", description: "Spending more time reacting to problems than preventing them or driving strategic improvements.", icon: "alerts" },
      { title: "Inconsistent Performance", description: "Some locations excel while others lag, but you don't have clear data on why or how to fix it.", icon: "benchmarking" },
      { title: "Time-Consuming Site Visits", description: "Physical visits are the only way to understand what's really happening, leaving little time for strategy.", icon: "time" },
    ],
    howTitle: "How Sundae Changes That",
    howDescription: "Clarity across every location. Alerts before problems escalate.",
    howSundaeHelps: [
      { title: "Real-Time Regional Dashboard", description: "Sundae Core gives you a single view of all your locations - sales, labor, margins, and operations - updated in real time.", product: "Sundae Core", icon: "chart" },
      { title: "Proactive Alerts", description: "Sundae Core flags issues before they become problems, letting you intervene early and coach more effectively.", product: "Sundae Core", icon: "insights" },
      { title: "Instant Answers", description: "Ask Sundae which locations are trending up this week or where labor variance is highest and get immediate, numbers-backed answers.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Performance Benchmarking", description: "Sundae Report shows how each location compares to your regional average and top performers, making coaching conversations specific and actionable.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "What Changes",
    outcomesDescription: "Less firefighting. More impact.",
    outcomes: [
      { title: "Spend less time firefighting", description: "Catch issues early with automated alerts and focus on strategic improvement.", icon: "speed" },
      { title: "More effective site visits", description: "Arrive with numbers-backed insights and have more productive conversations with GMs.", icon: "marketing" },
      { title: "Lift underperforming locations faster", description: "Identify gaps quickly and replicate best practices across your region.", icon: "growth" },
      { title: "Better work-life balance", description: "Manage your region from anywhere with mobile access to all key metrics.", icon: "balance" },
    ],
    ctaTitle: "Ready to Manage Smarter?",
    ctaDescription: "See how regional managers get visibility across every location.",
    ctaButton: "Book a Regional Manager Demo",
  },
  ar: {
    badge: "المديرون الإقليميون",
    titleLine1: "كل موقع.",
    titleLine2: "رؤية واحدة.",
    description: "رؤية لحظية. تنبيهات استباقية. تدريب مدعوم بالأرقام. أدِر منطقتك دون أن تعيش على الطريق.",
    primaryCta: "شاهد كيف يعمل Sundae للمديرين الإقليميين",
    secondaryCta: "احصل على تقرير معياري إقليمي",
    problemsTitle: "المشكلات التي تعرفها",
    problemsDescription: "إطفاء حرائق. رؤية محدودة. سفر كثير.",
    challenges: [
      { title: "رؤية محدودة عبر المواقع", description: "أنت مسؤول عن عدة مواقع لكنك تفتقر إلى رؤية لحظية لما يحدث في كل واحد منها.", icon: "watchtower" },
      { title: "وضع إطفاء الحرائق", description: "تقضي وقتًا أطول في الرد على المشكلات بدلًا من منعها أو دفع التحسينات الاستراتيجية.", icon: "alerts" },
      { title: "أداء غير متسق", description: "بعض المواقع تتفوق وأخرى تتأخر، لكن لا توجد لديك بيانات واضحة عن السبب أو طريقة الإصلاح.", icon: "benchmarking" },
      { title: "زيارات المواقع تستغرق وقتًا", description: "الزيارات الميدانية هي الطريقة الوحيدة لفهم ما يحدث فعلًا، ما يترك وقتًا قليلاً للاستراتيجية.", icon: "time" },
    ],
    howTitle: "كيف يغير Sundae ذلك",
    howDescription: "وضوح عبر كل موقع. تنبيهات قبل تفاقم المشكلات.",
    howSundaeHelps: [
      { title: "لوحة إقليمية لحظية", description: "يمنحك Sundae Core رؤية موحدة لكل المواقع - المبيعات والعمالة والهوامش والعمليات - محدثة لحظيًا.", product: "Sundae Core", icon: "chart" },
      { title: "تنبيهات استباقية", description: "يحدد Sundae Core المشكلات قبل أن تصبح أزمات، ما يتيح لك التدخل المبكر والتوجيه بفعالية أكبر.", product: "Sundae Core", icon: "insights" },
      { title: "إجابات فورية", description: "اسأل Sundae عن المواقع الأعلى نموًا هذا الأسبوع أو أعلى انحراف في العمالة واحصل على إجابات فورية مدعومة بالأرقام.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "معايير الأداء", description: "يُظهر Sundae Report كيف يقارن كل موقع بمتوسط الإقليم وأفضل المؤدين، لتصبح المحادثات أكثر دقة وقابلية للتنفيذ.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "ما الذي يتغير",
    outcomesDescription: "إطفاء حرائق أقل. أثر أكبر.",
    outcomes: [
      { title: "وقت أقل في الإطفاء", description: "التقط المشكلات مبكرًا مع التنبيهات التلقائية وركز على التحسين الاستراتيجي.", icon: "speed" },
      { title: "زيارات مواقع أكثر فاعلية", description: "تعال برؤى مدعومة بالأرقام وادخل محادثات أكثر إنتاجية مع المديرين.", icon: "marketing" },
      { title: "رفع المواقع الضعيفة أسرع", description: "حدد الفجوات بسرعة وكرر أفضل الممارسات عبر منطقتك.", icon: "growth" },
      { title: "توازن أفضل بين العمل والحياة", description: "أدر منطقتك من أي مكان مع وصول هاتفي إلى المقاييس الأساسية.", icon: "balance" },
    ],
    ctaTitle: "هل أنت مستعد للإدارة بذكاء؟",
    ctaDescription: "شاهد كيف يحصل المديرون الإقليميون على رؤية عبر كل موقع.",
    ctaButton: "احجز عرضًا للمديرين الإقليميين",
  },
  fr: {
    badge: "Responsables régionaux",
    titleLine1: "Chaque site.",
    titleLine2: "Une seule vue.",
    description: "Visibilité en temps réel. Alertes proactives. Coaching fondé sur les chiffres. Gérez votre région sans vivre sur la route.",
    primaryCta: "Voir comment Sundae aide les responsables régionaux",
    secondaryCta: "Obtenir le rapport de benchmark régional",
    problemsTitle: "Les problèmes que vous connaissez",
    problemsDescription: "Gestion en mode pompier. Visibilité limitée. Trop de déplacements.",
    challenges: [
      { title: "Visibilité limitée sur les sites", description: "Vous gérez plusieurs sites mais sans visibilité temps réel sur ce qui s'y passe.", icon: "watchtower" },
      { title: "Mode pompier", description: "Vous passez plus de temps à réagir qu'à prévenir ou à améliorer stratégiquement.", icon: "alerts" },
      { title: "Performance inégale", description: "Certains sites excellent, d'autres décrochent, sans données claires pour comprendre pourquoi.", icon: "benchmarking" },
      { title: "Visites chronophages", description: "Les visites terrain sont le seul moyen de comprendre la réalité, au détriment de la stratégie.", icon: "time" },
    ],
    howTitle: "Comment Sundae change cela",
    howDescription: "Clarté sur chaque site. Alertes avant l'escalade.",
    howSundaeHelps: [
      { title: "Tableau régional temps réel", description: "Sundae Core vous donne une vue unique de tous vos sites - ventes, main-d'oeuvre, marges et opérations - mise à jour en temps réel.", product: "Sundae Core", icon: "chart" },
      { title: "Alertes proactives", description: "Sundae Core signale les problèmes avant qu'ils ne deviennent critiques, vous laissant agir plus tôt.", product: "Sundae Core", icon: "insights" },
      { title: "Réponses instantanées", description: "Demandez à Sundae quels sites montent cette semaine ou où l'écart de main-d'oeuvre est le plus élevé et obtenez une réponse immédiate.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Benchmark de performance", description: "Sundae Report compare chaque site à votre moyenne régionale et aux meilleurs, pour un coaching plus concret.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Ce qui change",
    outcomesDescription: "Moins d'incendies. Plus d'impact.",
    outcomes: [
      { title: "Moins de gestion d'urgence", description: "Repérez les problèmes plus tôt avec des alertes automatiques.", icon: "speed" },
      { title: "Visites plus efficaces", description: "Arrivez avec des insights chiffrés et des échanges plus productifs avec les managers.", icon: "marketing" },
      { title: "Redresser les sites plus vite", description: "Identifiez rapidement les écarts et répliquez les bonnes pratiques.", icon: "growth" },
      { title: "Meilleur équilibre vie pro/vie perso", description: "Gérez votre région partout avec un accès mobile aux métriques clés.", icon: "balance" },
    ],
    ctaTitle: "Prêt à mieux piloter ?",
    ctaDescription: "Voyez comment les responsables régionaux gagnent en visibilité sur chaque site.",
    ctaButton: "Réserver une démo responsable régional",
  },
  es: {
    badge: "Gerentes regionales",
    titleLine1: "Cada ubicación.",
    titleLine2: "Una sola vista.",
    description: "Visibilidad en tiempo real. Alertas proactivas. Coaching respaldado por números. Gestiona tu región sin vivir en la carretera.",
    primaryCta: "Ver cómo funciona Sundae para gerentes regionales",
    secondaryCta: "Obtener informe de benchmark regional",
    problemsTitle: "Los problemas que ya conoces",
    problemsDescription: "Modo apagar incendios. Visibilidad limitada. Demasiados desplazamientos.",
    challenges: [
      { title: "Visibilidad limitada entre ubicaciones", description: "Eres responsable de varios locales, pero no ves en tiempo real qué ocurre en cada uno.", icon: "watchtower" },
      { title: "Modo apagar incendios", description: "Pasas más tiempo reaccionando a problemas que previniéndolos o impulsando mejoras.", icon: "alerts" },
      { title: "Rendimiento desigual", description: "Algunas ubicaciones destacan y otras se quedan atrás, pero no tienes datos claros para entender por qué.", icon: "benchmarking" },
      { title: "Visitas que consumen tiempo", description: "Las visitas físicas son la única forma de entender lo que pasa de verdad, dejando poco tiempo para estrategia.", icon: "time" },
    ],
    howTitle: "Cómo cambia esto Sundae",
    howDescription: "Claridad en cada ubicación. Alertas antes de que escale el problema.",
    howSundaeHelps: [
      { title: "Panel regional en tiempo real", description: "Sundae Core te da una vista única de todas tus ubicaciones - ventas, personal, márgenes y operaciones - actualizada en tiempo real.", product: "Sundae Core", icon: "chart" },
      { title: "Alertas proactivas", description: "Sundae Core marca los problemas antes de que se conviertan en crisis, para intervenir a tiempo.", product: "Sundae Core", icon: "insights" },
      { title: "Respuestas instantáneas", description: "Pregunta a Sundae qué ubicaciones están subiendo esta semana o dónde la variación de personal es mayor y obtén respuestas al momento.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Benchmark de rendimiento", description: "Sundae Report muestra cómo se compara cada ubicación con la media regional y los mejores resultados.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Qué cambia",
    outcomesDescription: "Menos incendios. Más impacto.",
    outcomes: [
      { title: "Menos tiempo apagando incendios", description: "Detecta problemas antes con alertas automáticas.", icon: "speed" },
      { title: "Visitas más efectivas", description: "Llega con datos claros y conversa mejor con los gerentes.", icon: "marketing" },
      { title: "Mejorar ubicaciones más rápido", description: "Detecta brechas y replica buenas prácticas en toda la región.", icon: "growth" },
      { title: "Mejor equilibrio vida-trabajo", description: "Gestiona tu región desde cualquier lugar con acceso móvil a métricas clave.", icon: "balance" },
    ],
    ctaTitle: "¿Listo para gestionar mejor?",
    ctaDescription: "Ve cómo los gerentes regionales obtienen visibilidad en cada ubicación.",
    ctaButton: "Reservar demo regional",
  },
};

export default function RegionalManagersPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedRegionalCopy[locale] ?? localizedRegionalCopy.en;

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
