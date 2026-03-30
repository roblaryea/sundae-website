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

const localizedFinanceCopy: Record<"en" | "ar" | "fr" | "es", RoleSolutionCopy> = {
  en: {
    badge: "Finance & FP&A Teams",
    titleLine1: "One Dashboard.",
    titleLine2: "All Your Numbers.",
    description: "P&L, labor, COGS - unified in real time. Stop chasing spreadsheets. Start driving profitability.",
    primaryCta: "See Financial Dashboard",
    secondaryCta: "View Sample Financial Report",
    problemsTitle: "The Problems You Know",
    problemsDescription: "Fragmented data. Manual reports. Delayed insights.",
    challenges: [
      { title: "Fragmented Data Sources", description: "Financial data scattered across multiple systems - POS, payroll, inventory - making it difficult to get a complete picture.", icon: "benchmarking" },
      { title: "Manual Data Compilation", description: "Hours spent pulling reports from different platforms and reconciling numbers in spreadsheets.", icon: "time" },
      { title: "Delayed Insights", description: "By the time you compile the data, it's already outdated - limiting your ability to make proactive decisions.", icon: "decrease" },
      { title: "Limited Forecasting Accuracy", description: "Without real-time data and predictive intelligence, forecasting remains guesswork rather than science.", icon: "forecasting" },
    ],
    howTitle: "How Sundae Changes That",
    howDescription: "Accuracy, speed, and one source of truth.",
    howSundaeHelps: [
      { title: "Unified Financial Dashboard", description: "Sundae Core consolidates P&L, labor costs, COGS, and key financial metrics into one real-time view - no more spreadsheet juggling.", product: "Sundae Core", icon: "finance" },
      { title: "Automated Variance Analysis", description: "Sundae Core automatically flags budget variances, margin compression, and cost anomalies before they impact the bottom line.", product: "Sundae Core", icon: "search" },
      { title: "Instant Financial Queries", description: "Ask Sundae what is driving labor variance this month or show me locations with declining margins and get immediate answers.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Benchmark-Driven Forecasting", description: "Sundae Report provides industry benchmarks and historical trends to build more accurate forecasts and budgets.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "What Changes",
    outcomesDescription: "Less time on data. More time on strategy.",
    outcomes: [
      { title: "Automate report compilation", description: "Integrated data from 12 operational domains eliminates manual spreadsheet assembly and reconciliation.", icon: "speed" },
      { title: "Catch cost issues early", description: "Real-time alerts surface margin compression before it compounds.", icon: "marketing" },
      { title: "More accurate forecasts", description: "Predictive intelligence and benchmarks improve budget accuracy and planning.", icon: "benchmarking" },
      { title: "Better strategic focus", description: "Spend less time on data and more time on analysis and strategic planning.", icon: "growth" },
    ],
    ctaTitle: "Ready to Unify Your Numbers?",
    ctaDescription: "See how finance teams eliminate manual reporting and drive profitability.",
    ctaButton: "Book a Finance Team Demo",
  },
  ar: {
    badge: "فرق المالية والتخطيط",
    titleLine1: "لوحة واحدة.",
    titleLine2: "كل الأرقام.",
    description: "قائمة الربح والخسارة والعمالة وتكلفة البضاعة - موحدة في الوقت الحقيقي. توقف عن مطاردة الجداول وابدأ في دفع الربحية.",
    primaryCta: "عرض اللوحة المالية",
    secondaryCta: "عرض تقرير مالي تجريبي",
    problemsTitle: "المشكلات التي تعرفها",
    problemsDescription: "بيانات مجزأة. تقارير يدوية. رؤى متأخرة.",
    challenges: [
      { title: "مصادر بيانات مجزأة", description: "البيانات المالية موزعة على أنظمة متعددة - نقاط البيع، الرواتب، المخزون - مما يصعب الحصول على صورة كاملة.", icon: "benchmarking" },
      { title: "تجميع يدوي للبيانات", description: "ساعات تُهدر في سحب التقارير من منصات مختلفة ومطابقة الأرقام في الجداول.", icon: "time" },
      { title: "رؤى متأخرة", description: "عندما تنتهي من تجميع البيانات تكون قد أصبحت قديمة بالفعل، ما يحد من قراراتك الاستباقية.", icon: "decrease" },
      { title: "دقة توقعات محدودة", description: "من دون بيانات لحظية وذكاء تنبؤي، تبقى التوقعات تخمينًا أكثر من كونها علمًا.", icon: "forecasting" },
    ],
    howTitle: "كيف يغير Sundae ذلك",
    howDescription: "الدقة والسرعة ومصدر الحقيقة الواحد.",
    howSundaeHelps: [
      { title: "لوحة مالية موحدة", description: "يجمع Sundae Core الربح والخسارة وتكاليف العمالة وتكلفة البضاعة والمقاييس المالية الأساسية في عرض لحظي واحد.", product: "Sundae Core", icon: "finance" },
      { title: "تحليل الانحرافات تلقائيًا", description: "يكتشف Sundae Core تلقائيًا انحرافات الميزانية وتقلص الهوامش والشذوذات قبل أن تؤثر على النتيجة النهائية.", product: "Sundae Core", icon: "search" },
      { title: "استفسارات مالية فورية", description: "اسأل Sundae ما الذي يدفع انحراف العمالة هذا الشهر أو اعرض المواقع ذات الهوامش المتراجعة واحصل على إجابات فورية.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "توقعات مدفوعة بالمعايير", description: "يوفر Sundae Report معايير الصناعة والاتجاهات التاريخية لبناء توقعات وميزانيات أدق.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "ما الذي يتغير",
    outcomesDescription: "وقت أقل على البيانات. وقت أكثر على الاستراتيجية.",
    outcomes: [
      { title: "أتمتة تجميع التقارير", description: "البيانات المدمجة من 12 مجالًا تشغيليًا تلغي التجميع اليدوي ومطابقة الأرقام.", icon: "speed" },
      { title: "اكتشاف مشكلات التكلفة مبكرًا", description: "تظهر التنبيهات اللحظية تقلص الهوامش قبل أن يتفاقم.", icon: "marketing" },
      { title: "توقعات أدق", description: "الذكاء التنبؤي والمعايير يحسنان دقة الميزانيات والتخطيط.", icon: "benchmarking" },
      { title: "تركيز استراتيجي أفضل", description: "اقضِ وقتًا أقل مع البيانات ووقتًا أكثر في التحليل والتخطيط.", icon: "growth" },
    ],
    ctaTitle: "هل أنت مستعد لتوحيد أرقامك؟",
    ctaDescription: "شاهد كيف تلغي فرق المالية التقارير اليدوية وتدفع الربحية.",
    ctaButton: "احجز عرضًا لفريق المالية",
  },
  fr: {
    badge: "Équipes finance et FP&A",
    titleLine1: "Un tableau de bord.",
    titleLine2: "Tous vos chiffres.",
    description: "P&L, main-d'oeuvre, COGS - unifiés en temps réel. Finis les tableurs. Place à la rentabilité.",
    primaryCta: "Voir le tableau de bord financier",
    secondaryCta: "Voir un rapport financier d'exemple",
    problemsTitle: "Les problèmes que vous connaissez",
    problemsDescription: "Données fragmentées. Rapports manuels. Informations tardives.",
    challenges: [
      { title: "Sources de données fragmentées", description: "Les données financières sont dispersées entre plusieurs systèmes - POS, paie, stocks - ce qui rend la vision complète difficile.", icon: "benchmarking" },
      { title: "Compilation manuelle", description: "Des heures passées à extraire des rapports et à rapprocher les chiffres dans des tableurs.", icon: "time" },
      { title: "Informations tardives", description: "Quand les données sont compilées, elles sont déjà obsolètes.", icon: "decrease" },
      { title: "Prévisions limitées", description: "Sans données en temps réel ni intelligence prédictive, les prévisions restent approximatives.", icon: "forecasting" },
    ],
    howTitle: "Comment Sundae change cela",
    howDescription: "Exactitude, rapidité et source unique de vérité.",
    howSundaeHelps: [
      { title: "Tableau de bord financier unifié", description: "Sundae Core rassemble P&L, coûts de main-d'oeuvre, COGS et métriques financières clés dans une vue temps réel unique.", product: "Sundae Core", icon: "finance" },
      { title: "Analyse automatisée des écarts", description: "Sundae Core signale automatiquement les écarts budgétaires, les compressions de marge et les anomalies de coût.", product: "Sundae Core", icon: "search" },
      { title: "Questions financières instantanées", description: "Demandez à Sundae ce qui provoque l'écart de main-d'oeuvre ce mois-ci ou quels sites voient leurs marges baisser.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Prévisions guidées par les références", description: "Sundae Report fournit des benchmarks sectoriels et des tendances historiques pour bâtir des budgets plus précis.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Ce qui change",
    outcomesDescription: "Moins de temps sur les données. Plus de temps sur la stratégie.",
    outcomes: [
      { title: "Automatiser les rapports", description: "Les données intégrées de 12 domaines opérationnels suppriment le travail manuel.", icon: "speed" },
      { title: "Détecter les problèmes tôt", description: "Des alertes en temps réel révèlent la compression des marges avant qu'elle ne s'aggrave.", icon: "marketing" },
      { title: "Des prévisions plus justes", description: "L'intelligence prédictive et les benchmarks améliorent la précision des budgets.", icon: "benchmarking" },
      { title: "Un meilleur focus stratégique", description: "Moins de temps sur la donnée, plus de temps sur l'analyse et la planification.", icon: "growth" },
    ],
    ctaTitle: "Prêt à unifier vos chiffres ?",
    ctaDescription: "Voyez comment les équipes finance éliminent les rapports manuels et améliorent la rentabilité.",
    ctaButton: "Réserver une démo finance",
  },
  es: {
    badge: "Equipos de finanzas y FP&A",
    titleLine1: "Un solo panel.",
    titleLine2: "Todos tus números.",
    description: "P&L, personal y COGS - unificados en tiempo real. Deja de perseguir hojas de cálculo. Empieza a impulsar la rentabilidad.",
    primaryCta: "Ver panel financiero",
    secondaryCta: "Ver informe financiero de ejemplo",
    problemsTitle: "Los problemas que ya conoces",
    problemsDescription: "Datos fragmentados. Informes manuales. Información tardía.",
    challenges: [
      { title: "Fuentes de datos fragmentadas", description: "Los datos financieros están repartidos en varios sistemas - POS, nómina, inventario - así que cuesta tener una visión completa.", icon: "benchmarking" },
      { title: "Compilación manual", description: "Horas extrayendo informes de distintas plataformas y conciliando números en hojas de cálculo.", icon: "time" },
      { title: "Información tardía", description: "Cuando terminas de compilar los datos, ya están desactualizados.", icon: "decrease" },
      { title: "Precisión limitada en previsiones", description: "Sin datos en tiempo real ni inteligencia predictiva, prever sigue siendo una apuesta.", icon: "forecasting" },
    ],
    howTitle: "Cómo cambia esto Sundae",
    howDescription: "Precisión, velocidad y una sola fuente de verdad.",
    howSundaeHelps: [
      { title: "Panel financiero unificado", description: "Sundae Core consolida P&L, costes de personal, COGS y métricas financieras clave en una vista en tiempo real.", product: "Sundae Core", icon: "finance" },
      { title: "Análisis automático de desviaciones", description: "Sundae Core detecta automáticamente variaciones presupuestarias, compresión de margen y anomalías de coste.", product: "Sundae Core", icon: "search" },
      { title: "Preguntas financieras al instante", description: "Pregunta a Sundae qué impulsa la variación de personal este mes o qué ubicaciones están viendo caer sus márgenes.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Previsiones guiadas por benchmarks", description: "Sundae Report ofrece referencias sectoriales y tendencias históricas para crear presupuestos más precisos.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Qué cambia",
    outcomesDescription: "Menos tiempo con datos. Más tiempo en estrategia.",
    outcomes: [
      { title: "Automatizar informes", description: "Los datos integrados de 12 dominios operativos eliminan el trabajo manual.", icon: "speed" },
      { title: "Detectar problemas de coste antes", description: "Las alertas en tiempo real muestran la compresión de margen antes de que empeore.", icon: "marketing" },
      { title: "Previsiones más precisas", description: "La inteligencia predictiva y los benchmarks mejoran la exactitud de presupuestos.", icon: "benchmarking" },
      { title: "Más foco estratégico", description: "Menos tiempo en datos y más en análisis y planificación.", icon: "growth" },
    ],
    ctaTitle: "¿Listo para unificar tus números?",
    ctaDescription: "Ve cómo los equipos de finanzas eliminan los informes manuales y mejoran la rentabilidad.",
    ctaButton: "Reservar demo financiera",
  },
};

export default function FinanceTeamsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedFinanceCopy[locale] ?? localizedFinanceCopy.en;

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
