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

const localizedHrCopy: Record<"en" | "ar" | "fr" | "es", RoleSolutionCopy> = {
  en: {
    badge: "People & HR Teams",
    titleLine1: "Know Your People.",
    titleLine2: "Keep Your People.",
    description: "Turnover alerts. Labor optimization. Workforce insights. See what's happening before it becomes a problem.",
    primaryCta: "See Workforce Dashboard",
    secondaryCta: "View Labor Benchmarks",
    problemsTitle: "The Problems You Know",
    problemsDescription: "Turnover blind spots. Scheduling guesswork. Reactive management.",
    challenges: [
      { title: "Workforce Blind Spots", description: "Labor data is trapped in payroll systems, making it impossible to connect staffing decisions to restaurant performance.", icon: "labor" },
      { title: "Turnover Crisis", description: "High turnover rates but no clear visibility into which locations or roles have the biggest retention issues.", icon: "decrease" },
      { title: "Scheduling Inefficiency", description: "Over-staffing hurts margins, under-staffing hurts service - but you lack real-time data to optimize the balance.", icon: "schedule" },
      { title: "Compliance & Risk", description: "Managing labor compliance across locations is manual and reactive rather than proactive.", icon: "balance" },
    ],
    howTitle: "How Sundae Changes That",
    howDescription: "Unified workforce data and proactive alerts.",
    howSundaeHelps: [
      { title: "Unified Workforce Dashboard", description: "Sundae Core connects labor, payroll, and performance data - see turnover, productivity, and labor costs by location in real time.", product: "Sundae Core", icon: "chart" },
      { title: "Proactive Turnover Alerts", description: "Sundae Core flags locations with rising turnover, overtime spikes, or compliance risks before they become crises.", product: "Sundae Core", icon: "alerts" },
      { title: "Ask HR Questions Instantly", description: "Ask Sundae which locations have the highest turnover or what the average tenure is by role and get instant, numbers-backed answers.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Labor Benchmarking", description: "Sundae Report shows how your labor metrics compare to industry standards and helps you set realistic goals.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "What Changes",
    outcomesDescription: "Lower turnover. Better staffing. Proactive retention.",
    outcomes: [
      { title: "Reduce turnover by 20%", description: "Identify retention issues early and implement targeted interventions.", icon: "decrease" },
      { title: "Optimize labor costs", description: "Balance staffing levels with demand to improve margins without sacrificing service.", icon: "finance" },
      { title: "Improve compliance", description: "Automated monitoring keeps you ahead of labor law changes and violations.", icon: "success" },
      { title: "Numbers-backed staffing", description: "Make hiring and scheduling decisions based on real performance data, not gut feel.", icon: "benchmarking" },
    ],
    ctaTitle: "Ready to Reduce Turnover?",
    ctaDescription: "See how HR teams catch retention issues early.",
    ctaButton: "Book an HR Team Demo",
  },
  ar: {
    badge: "فرق الأفراد والموارد البشرية",
    titleLine1: "اعرف موظفيك.",
    titleLine2: "وحافظ عليهم.",
    description: "تنبيهات عن الاستقالات. تحسين العمالة. رؤى القوى العاملة. شاهد ما يحدث قبل أن يصبح مشكلة.",
    primaryCta: "عرض لوحة القوى العاملة",
    secondaryCta: "عرض معايير العمالة",
    problemsTitle: "المشكلات التي تعرفها",
    problemsDescription: "فجوات في رؤية الاستقالات. تخمين في الجدولة. إدارة تفاعلية.",
    challenges: [
      { title: "فجوات رؤية القوى العاملة", description: "بيانات العمالة محصورة في أنظمة الرواتب، ما يجعل ربط قرارات التوظيف بالأداء أمراً صعباً.", icon: "labor" },
      { title: "أزمة الاستقالات", description: "معدلات استقالة مرتفعة لكن لا توجد رؤية واضحة لأي المواقع أو الأدوار تعاني أكثر.", icon: "decrease" },
      { title: "عدم كفاءة الجدولة", description: "الزيادة في التوظيف تضغط على الهوامش والنقص يضر الخدمة - لكن لا توجد بيانات لحظية لتحسين التوازن.", icon: "schedule" },
      { title: "الامتثال والمخاطر", description: "إدارة الامتثال للعمالة عبر المواقع يدوية وتفاعلية بدلًا من استباقية.", icon: "balance" },
    ],
    howTitle: "كيف يغير Sundae ذلك",
    howDescription: "بيانات موحدة للقوى العاملة وتنبيهات استباقية.",
    howSundaeHelps: [
      { title: "لوحة قوة عاملة موحدة", description: "يربط Sundae Core بيانات العمالة والرواتب والأداء لتشاهد الاستقالات والإنتاجية والتكلفة حسب الموقع في الوقت الحقيقي.", product: "Sundae Core", icon: "chart" },
      { title: "تنبيهات استباقية عن الاستقالات", description: "يحدد Sundae Core المواقع التي يرتفع فيها معدل الاستقالات أو العمل الإضافي أو مخاطر الامتثال قبل أن تتفاقم.", product: "Sundae Core", icon: "alerts" },
      { title: "اسأل أسئلة الموارد البشرية فورًا", description: "اسأل Sundae عن المواقع الأعلى استقالات أو متوسط مدة الخدمة حسب الدور واحصل على إجابات فورية مدعومة بالأرقام.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "معايير العمالة", description: "يُظهر Sundae Report كيف تقارن مقاييس العمالة بالمعايير الصناعية ويساعدك على وضع أهداف واقعية.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "ما الذي يتغير",
    outcomesDescription: "استقالات أقل. جدولة أفضل. احتفاظ استباقي.",
    outcomes: [
      { title: "خفض الاستقالات بنسبة 20%", description: "حدد مشكلات الاحتفاظ مبكرًا ونفذ تدخلات موجهة.", icon: "decrease" },
      { title: "تحسين تكلفة العمالة", description: "وازن مستويات التوظيف مع الطلب لتحسين الهوامش دون التضحية بالخدمة.", icon: "finance" },
      { title: "تحسين الامتثال", description: "المراقبة المؤتمتة تبقيك متقدمًا على تغييرات قوانين العمل والمخالفات.", icon: "success" },
      { title: "توظيف مدعوم بالأرقام", description: "اتخذ قرارات التوظيف والجدولة بناءً على البيانات الحقيقية لا على الحدس.", icon: "benchmarking" },
    ],
    ctaTitle: "هل أنت مستعد لخفض الاستقالات؟",
    ctaDescription: "شاهد كيف تلتقط فرق الموارد البشرية مشاكل الاحتفاظ مبكرًا.",
    ctaButton: "احجز عرضًا لفريق الموارد البشرية",
  },
  fr: {
    badge: "Équipes RH",
    titleLine1: "Connaissez vos équipes.",
    titleLine2: "Gardez vos équipes.",
    description: "Alertes de turnover. Optimisation de la main-d'oeuvre. Insights RH. Voyez ce qui se passe avant que cela devienne un problème.",
    primaryCta: "Voir le tableau de bord workforce",
    secondaryCta: "Voir les benchmarks de main-d'oeuvre",
    problemsTitle: "Les problèmes que vous connaissez",
    problemsDescription: "Angles morts sur le turnover. Planification au jugé. Gestion réactive.",
    challenges: [
      { title: "Angles morts workforce", description: "Les données de main-d'oeuvre sont enfermées dans la paie, rendant le lien avec la performance difficile.", icon: "labor" },
      { title: "Crise du turnover", description: "Taux de turnover élevés mais pas de visibilité claire sur les sites ou rôles les plus touchés.", icon: "decrease" },
      { title: "Planification inefficace", description: "Le sur-effectif réduit les marges et le sous-effectif dégrade le service.", icon: "schedule" },
      { title: "Conformité et risque", description: "La gestion de la conformité est manuelle et réactive plutôt que proactive.", icon: "balance" },
    ],
    howTitle: "Comment Sundae change cela",
    howDescription: "Des données workforce unifiées et des alertes proactives.",
    howSundaeHelps: [
      { title: "Tableau workforce unifié", description: "Sundae Core relie les données de main-d'oeuvre, paie et performance - turnover, productivité et coûts par site en temps réel.", product: "Sundae Core", icon: "chart" },
      { title: "Alertes turnover proactives", description: "Sundae Core signale les sites avec turnover en hausse, pics d'heures sup ou risques de conformité avant la crise.", product: "Sundae Core", icon: "alerts" },
      { title: "Questions RH instantanées", description: "Demandez à Sundae quels sites ont le plus fort turnover ou quelle est la tenure moyenne par rôle, et obtenez une réponse chiffrée.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Benchmark de main-d'oeuvre", description: "Sundae Report compare vos métriques aux standards du secteur et aide à définir des objectifs réalistes.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Ce qui change",
    outcomesDescription: "Moins de turnover. Meilleure planification. Rétention proactive.",
    outcomes: [
      { title: "Réduire le turnover de 20 %", description: "Identifiez tôt les problèmes de rétention et agissez ciblé.", icon: "decrease" },
      { title: "Optimiser les coûts de main-d'oeuvre", description: "Équilibrez staffing et demande pour améliorer les marges.", icon: "finance" },
      { title: "Améliorer la conformité", description: "La surveillance automatisée vous garde en avance sur les changements réglementaires.", icon: "success" },
      { title: "Staffing fondé sur les chiffres", description: "Basez vos décisions RH sur les données réelles et non l'intuition.", icon: "benchmarking" },
    ],
    ctaTitle: "Prêt à réduire le turnover ?",
    ctaDescription: "Voyez comment les équipes RH détectent les problèmes de rétention tôt.",
    ctaButton: "Réserver une démo RH",
  },
  es: {
    badge: "Equipos de personas y RR. HH.",
    titleLine1: "Conoce a tu gente.",
    titleLine2: "Retén a tu gente.",
    description: "Alertas de rotación. Optimización de personal. Insights de la fuerza laboral. Ve qué pasa antes de que se convierta en problema.",
    primaryCta: "Ver panel de fuerza laboral",
    secondaryCta: "Ver benchmarks laborales",
    problemsTitle: "Los problemas que ya conoces",
    problemsDescription: "Puntos ciegos de rotación. Programación a ojo. Gestión reactiva.",
    challenges: [
      { title: "Puntos ciegos de la fuerza laboral", description: "Los datos laborales están atrapados en nómina, así que cuesta conectar decisiones de personal con el rendimiento.", icon: "labor" },
      { title: "Crisis de rotación", description: "Rotación alta pero sin visibilidad clara de qué ubicaciones o roles tienen más problemas de retención.", icon: "decrease" },
      { title: "Ineficiencia en la programación", description: "Sobrecargar personal daña márgenes y dejar poco personal daña el servicio.", icon: "schedule" },
      { title: "Cumplimiento y riesgo", description: "La gestión del cumplimiento laboral es manual y reactiva en lugar de proactiva.", icon: "balance" },
    ],
    howTitle: "Cómo cambia esto Sundae",
    howDescription: "Datos unificados de la fuerza laboral y alertas proactivas.",
    howSundaeHelps: [
      { title: "Panel unificado de personal", description: "Sundae Core conecta datos de personal, nómina y rendimiento - rotación, productividad y costes por ubicación en tiempo real.", product: "Sundae Core", icon: "chart" },
      { title: "Alertas proactivas de rotación", description: "Sundae Core avisa de ubicaciones con rotación al alza, horas extra o riesgos de cumplimiento antes de que se conviertan en crisis.", product: "Sundae Core", icon: "alerts" },
      { title: "Preguntas de RR. HH. al instante", description: "Pregunta a Sundae qué ubicaciones tienen más rotación o cuál es la antigüedad media por rol y obtén respuestas con números.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Benchmark laboral", description: "Sundae Report compara tus métricas con los estándares del sector y ayuda a fijar objetivos realistas.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Qué cambia",
    outcomesDescription: "Menos rotación. Mejor staffing. Retención proactiva.",
    outcomes: [
      { title: "Reducir la rotación un 20%", description: "Detecta pronto problemas de retención y actúa de forma dirigida.", icon: "decrease" },
      { title: "Optimizar costes laborales", description: "Equilibra personal y demanda para mejorar márgenes.", icon: "finance" },
      { title: "Mejorar cumplimiento", description: "La monitorización automática te mantiene al día de cambios y violaciones.", icon: "success" },
      { title: "Personal basado en datos", description: "Toma decisiones de contratación y turnos basadas en datos reales.", icon: "benchmarking" },
    ],
    ctaTitle: "¿Listo para reducir la rotación?",
    ctaDescription: "Ve cómo los equipos de RR. HH. detectan problemas de retención antes.",
    ctaButton: "Reservar demo de RR. HH.",
  },
};

export default function HRTeamsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedHrCopy[locale] ?? localizedHrCopy.en;

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
