"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type Option = { value: string; label: string };
type Question = { id: keyof Responses; question: string; options: Option[] };
type Responses = {
  dataQuality: string;
  systemIntegration: string;
  reporting: string;
  kpiTracking: string;
  teamAlignment: string;
};

type BenchmarkCopy = {
  back: string;
  hero: { badge: string; title: string; description: string };
  form: { title: string; description: string; button: string };
  questions: Question[];
  results: {
    title: string;
    overall: string;
    recommendations: string;
    nextStep: string;
    nextReady: string;
    nextBuilding: string;
  };
  levels: {
    readyAdvanced: string;
    readyStandard: string;
    preparing: string;
    foundation: string;
  };
  recSets: {
    advanced: string[];
    standard: string[];
    preparing: string[];
    foundation: string[];
  };
  cta: { intro: string; button: string };
  errors: { missing: string };
};

const localizedCopy: Record<WebsiteLocale, BenchmarkCopy> = {
  en: {
    back: "Back to Tools",
    hero: { badge: "Benchmark Intelligence", title: "Benchmark Readiness Assessment", description: "Evaluate your organization's readiness for benchmarking." },
    form: { title: "Assessment Questions", description: "Answer the following questions to evaluate your readiness.", button: "Calculate Readiness Score" },
    questions: [
      { id: "dataQuality", question: "How would you rate your current data quality and accuracy?", options: [{ value: "1", label: "Poor - Inconsistent or unreliable data" }, { value: "2", label: "Fair - Some data gaps or accuracy issues" }, { value: "3", label: "Good - Mostly accurate and reliable" }, { value: "4", label: "Excellent - Highly accurate and validated" }] },
      { id: "systemIntegration", question: "How well integrated are your operational systems (POS, payroll, inventory)?", options: [{ value: "1", label: "Not integrated - Manual data transfer" }, { value: "2", label: "Partially integrated - Some automation" }, { value: "3", label: "Well integrated - Mostly automated" }, { value: "4", label: "Fully integrated - Real-time data sync" }] },
      { id: "reporting", question: "How timely and comprehensive is your current reporting?", options: [{ value: "1", label: "Monthly reports only" }, { value: "2", label: "Weekly reports available" }, { value: "3", label: "Daily reports with key metrics" }, { value: "4", label: "Real-time dashboards and alerts" }] },
      { id: "kpiTracking", question: "Do you actively track and compare KPIs across locations?", options: [{ value: "1", label: "No - Limited KPI tracking" }, { value: "2", label: "Basic - Some metrics tracked" }, { value: "3", label: "Advanced - Multiple KPIs compared" }, { value: "4", label: "Comprehensive - Full benchmarking suite" }] },
      { id: "teamAlignment", question: "How aligned is your team on numbers-backed decision making?", options: [{ value: "1", label: "Limited - Decisions based on intuition" }, { value: "2", label: "Developing - Some data consideration" }, { value: "3", label: "Strong - Data informs most decisions" }, { value: "4", label: "Excellent - Numbers-backed culture" }] },
    ],
    results: { title: "Your Readiness Score", overall: "Overall Readiness", recommendations: "Recommendations", nextStep: "Next Step:", nextReady: "You're ready to start benchmarking! Consider scheduling a demo to see how Sundae can help.", nextBuilding: "Focus on the recommendations above, then retake this assessment in 3-6 months." },
    levels: { readyAdvanced: "Ready for Advanced Benchmarking", readyStandard: "Ready for Standard Benchmarking", preparing: "Preparing for Benchmarking", foundation: "Foundation Building Required" },
    recSets: {
      advanced: ["Your organization is well-positioned for advanced benchmarking", "Consider implementing real-time competitive intelligence", "Explore predictive intelligence and operational insights", "Focus on benchmarking against industry leaders"],
      standard: ["You have a solid foundation for benchmarking", "Work on improving data integration across systems", "Implement more frequent reporting cycles", "Begin comparing KPIs across your locations"],
      preparing: ["Focus on improving data quality and accuracy", "Work towards better system integration", "Establish consistent reporting processes", "Start tracking basic KPIs consistently"],
      foundation: ["Prioritize data quality and system reliability", "Begin integrating your operational systems", "Establish basic reporting cadence", "Create a numbers-backed culture within your team"],
    },
    cta: { intro: "Want more advanced benchmarking and competitive intelligence?", button: "See Sundae Platform" },
    errors: { missing: "Please answer all questions" },
  },
  ar: {
    back: "العودة إلى الأدوات",
    hero: { badge: "ذكاء المعيارية", title: "تقييم جاهزية المعيارية", description: "قيّم جاهزية مؤسستك للمعيارية." },
    form: { title: "أسئلة التقييم", description: "أجب عن الأسئلة التالية لتقييم جاهزيتك.", button: "احسب درجة الجاهزية" },
    questions: [
      { id: "dataQuality", question: "كيف تقيم جودة ودقة البيانات الحالية لديك؟", options: [{ value: "1", label: "ضعيف - بيانات غير متسقة أو غير موثوقة" }, { value: "2", label: "مقبول - بعض الفجوات أو مشكلات الدقة" }, { value: "3", label: "جيد - دقيق وموثوق في الغالب" }, { value: "4", label: "ممتاز - دقيق جداً ومتحقق منه" }] },
      { id: "systemIntegration", question: "ما مدى تكامل أنظمة التشغيل لديك (POS، الرواتب، المخزون)؟", options: [{ value: "1", label: "غير متكامل - نقل يدوي للبيانات" }, { value: "2", label: "متكامل جزئياً - بعض الأتمتة" }, { value: "3", label: "متكامل جيداً - أغلبه مؤتمت" }, { value: "4", label: "متكامل بالكامل - مزامنة لحظية" }] },
      { id: "reporting", question: "ما مدى حداثة وشمولية تقاريرك الحالية؟", options: [{ value: "1", label: "تقارير شهرية فقط" }, { value: "2", label: "تقارير أسبوعية متاحة" }, { value: "3", label: "تقارير يومية مع مؤشرات رئيسية" }, { value: "4", label: "لوحات وتحذيرات لحظية" }] },
      { id: "kpiTracking", question: "هل تتبع وتقارن مؤشرات الأداء عبر المواقع بشكل نشط؟", options: [{ value: "1", label: "لا - تتبع محدود للمؤشرات" }, { value: "2", label: "أساسي - تتبع بعض المقاييس" }, { value: "3", label: "متقدم - مقارنة عدة مؤشرات" }, { value: "4", label: "شامل - حزمة معيارية كاملة" }] },
      { id: "teamAlignment", question: "ما مدى توافق فريقك على اتخاذ القرارات المبنية على الأرقام؟", options: [{ value: "1", label: "محدود - قرارات مبنية على الحدس" }, { value: "2", label: "في طور التطور - بعض الاعتبار للبيانات" }, { value: "3", label: "قوي - البيانات تؤثر في أغلب القرارات" }, { value: "4", label: "ممتاز - ثقافة مبنية على الأرقام" }] },
    ],
    results: { title: "درجة الجاهزية لديك", overall: "الجاهزية العامة", recommendations: "التوصيات", nextStep: "الخطوة التالية:", nextReady: "أنت جاهز للبدء بالمعيارية! فكّر في حجز عرض لتعرف كيف يمكن لـ Sundae المساعدة.", nextBuilding: "ركّز على التوصيات أعلاه ثم أعد هذا التقييم بعد 3-6 أشهر." },
    levels: { readyAdvanced: "جاهز للمعيارية المتقدمة", readyStandard: "جاهز للمعيارية القياسية", preparing: "في طور الاستعداد للمعيارية", foundation: "تحتاج إلى بناء الأساس" },
    recSets: {
      advanced: ["مؤسستك في وضع جيد للمعيارية المتقدمة", "فكّر في تطبيق ذكاء تنافسي لحظي", "استكشف الذكاء التنبؤي والرؤى التشغيلية", "ركّز على المعيارية مقابل قادة الصناعة"],
      standard: ["لديك أساس قوي للمعيارية", "اعمل على تحسين تكامل البيانات بين الأنظمة", "طبّق دورات تقارير أكثر تكراراً", "ابدأ بمقارنة المؤشرات عبر مواقعك"],
      preparing: ["ركّز على تحسين جودة ودقة البيانات", "اعمل على تكامل أفضل للأنظمة", "أنشئ عمليات تقارير منتظمة", "ابدأ بتتبع المؤشرات الأساسية باستمرار"],
      foundation: ["أعطِ الأولوية لجودة البيانات وموثوقية الأنظمة", "ابدأ بدمج أنظمتك التشغيلية", "أنشئ وتيرة تقارير أساسية", "ابنِ ثقافة تعتمد على الأرقام داخل الفريق"],
    },
    cta: { intro: "هل تريد معيارية وذكاء تنافسي أكثر تقدماً؟", button: "شاهد منصة Sundae" },
    errors: { missing: "يرجى الإجابة عن جميع الأسئلة" },
  },
  fr: {
    back: "Retour aux outils",
    hero: { badge: "Intelligence benchmarking", title: "Évaluation de la préparation au benchmark", description: "Évaluez la préparation de votre organisation au benchmarking." },
    form: { title: "Questions d'évaluation", description: "Répondez aux questions suivantes pour évaluer votre préparation.", button: "Calculer le score de préparation" },
    questions: [
      { id: "dataQuality", question: "Comment évaluez-vous la qualité et la précision de vos données actuelles ?", options: [{ value: "1", label: "Faible - Données incohérentes ou peu fiables" }, { value: "2", label: "Moyenne - Quelques lacunes ou problèmes de précision" }, { value: "3", label: "Bonne - Majoritairement exacte et fiable" }, { value: "4", label: "Excellente - Très exacte et validée" }] },
      { id: "systemIntegration", question: "Dans quelle mesure vos systèmes opérationnels (POS, paie, stock) sont-ils intégrés ?", options: [{ value: "1", label: "Non intégrés - Transfert manuel" }, { value: "2", label: "Partiellement intégrés - Un peu d'automatisation" }, { value: "3", label: "Bien intégrés - Majoritairement automatisés" }, { value: "4", label: "Totalement intégrés - Synchronisation temps réel" }] },
      { id: "reporting", question: "À quel point votre reporting actuel est-il rapide et complet ?", options: [{ value: "1", label: "Rapports mensuels uniquement" }, { value: "2", label: "Rapports hebdomadaires disponibles" }, { value: "3", label: "Rapports quotidiens avec indicateurs clés" }, { value: "4", label: "Tableaux de bord et alertes temps réel" }] },
      { id: "kpiTracking", question: "Suivez-vous activement les KPI et les comparez-vous entre sites ?", options: [{ value: "1", label: "Non - Suivi limité des KPI" }, { value: "2", label: "Basique - Quelques métriques suivies" }, { value: "3", label: "Avancé - Comparaison de plusieurs KPI" }, { value: "4", label: "Complet - Suite de benchmarking complète" }] },
      { id: "teamAlignment", question: "À quel point votre équipe est-elle alignée sur la prise de décision basée sur les chiffres ?", options: [{ value: "1", label: "Limité - Décisions fondées sur l'intuition" }, { value: "2", label: "En développement - Quelques données prises en compte" }, { value: "3", label: "Fort - Les données guident la plupart des décisions" }, { value: "4", label: "Excellent - Culture fondée sur les chiffres" }] },
    ],
    results: { title: "Votre score de préparation", overall: "Préparation globale", recommendations: "Recommandations", nextStep: "Prochaine étape :", nextReady: "Vous êtes prêt à commencer le benchmarking ! Envisagez de réserver une démo pour voir comment Sundae peut aider.", nextBuilding: "Concentrez-vous sur les recommandations ci-dessus, puis refaites cette évaluation dans 3 à 6 mois." },
    levels: { readyAdvanced: "Prêt pour un benchmarking avancé", readyStandard: "Prêt pour un benchmarking standard", preparing: "En préparation du benchmarking", foundation: "Un travail de fond est nécessaire" },
    recSets: {
      advanced: ["Votre organisation est bien positionnée pour un benchmarking avancé", "Envisagez d'implémenter une intelligence concurrentielle temps réel", "Explorez l'intelligence prédictive et les insights opérationnels", "Concentrez-vous sur le benchmarking face aux leaders du secteur"],
      standard: ["Vous avez une base solide pour le benchmarking", "Travaillez à améliorer l'intégration des données entre systèmes", "Mettez en place des cycles de reporting plus fréquents", "Commencez à comparer les KPI entre vos sites"],
      preparing: ["Concentrez-vous sur la qualité et la précision des données", "Améliorez l'intégration des systèmes", "Établissez des processus de reporting constants", "Commencez à suivre les KPI de base de manière régulière"],
      foundation: ["Priorisez la qualité des données et la fiabilité des systèmes", "Commencez à intégrer vos systèmes opérationnels", "Établissez un rythme de reporting de base", "Développez une culture décisionnelle basée sur les chiffres"],
    },
    cta: { intro: "Vous voulez un benchmarking et une intelligence concurrentielle plus avancés ?", button: "Voir la plateforme Sundae" },
    errors: { missing: "Veuillez répondre à toutes les questions" },
  },
  es: {
    back: "Volver a herramientas",
    hero: { badge: "Inteligencia de benchmarking", title: "Evaluación de preparación para benchmarking", description: "Evalúa la preparación de tu organización para benchmarking." },
    form: { title: "Preguntas de evaluación", description: "Responde las siguientes preguntas para evaluar tu preparación.", button: "Calcular puntaje de preparación" },
    questions: [
      { id: "dataQuality", question: "¿Cómo calificarías la calidad y precisión de tus datos actuales?", options: [{ value: "1", label: "Mala - Datos inconsistentes o poco fiables" }, { value: "2", label: "Regular - Algunas brechas o problemas de precisión" }, { value: "3", label: "Buena - Mayormente precisa y fiable" }, { value: "4", label: "Excelente - Muy precisa y validada" }] },
      { id: "systemIntegration", question: "¿Qué tan integrados están tus sistemas operativos (POS, nómina, inventario)?", options: [{ value: "1", label: "No integrados - Transferencia manual" }, { value: "2", label: "Parcialmente integrados - Algo de automatización" }, { value: "3", label: "Bien integrados - Mayormente automatizados" }, { value: "4", label: "Totalmente integrados - Sincronización en tiempo real" }] },
      { id: "reporting", question: "¿Qué tan oportuno y completo es tu reporting actual?", options: [{ value: "1", label: "Solo reportes mensuales" }, { value: "2", label: "Reportes semanales disponibles" }, { value: "3", label: "Reportes diarios con métricas clave" }, { value: "4", label: "Dashboards y alertas en tiempo real" }] },
      { id: "kpiTracking", question: "¿Sigues y comparas activamente KPIs entre ubicaciones?", options: [{ value: "1", label: "No - Seguimiento limitado de KPIs" }, { value: "2", label: "Básico - Algunas métricas seguidas" }, { value: "3", label: "Avanzado - Varios KPIs comparados" }, { value: "4", label: "Completo - Suite de benchmarking total" }] },
      { id: "teamAlignment", question: "¿Qué tan alineado está tu equipo en decisiones basadas en números?", options: [{ value: "1", label: "Limitado - Decisiones basadas en intuición" }, { value: "2", label: "En desarrollo - Se considera algo de datos" }, { value: "3", label: "Fuerte - Los datos informan la mayoría de las decisiones" }, { value: "4", label: "Excelente - Cultura basada en números" }] },
    ],
    results: { title: "Tu puntaje de preparación", overall: "Preparación general", recommendations: "Recomendaciones", nextStep: "Siguiente paso:", nextReady: "¡Estás listo para empezar con el benchmarking! Considera agendar una demo para ver cómo Sundae puede ayudar.", nextBuilding: "Concéntrate en las recomendaciones anteriores y vuelve a realizar esta evaluación en 3-6 meses." },
    levels: { readyAdvanced: "Listo para benchmarking avanzado", readyStandard: "Listo para benchmarking estándar", preparing: "Preparándote para benchmarking", foundation: "Se necesita construir la base" },
    recSets: {
      advanced: ["Tu organización está bien posicionada para benchmarking avanzado", "Considera implementar inteligencia competitiva en tiempo real", "Explora inteligencia predictiva e insights operativos", "Concéntrate en benchmarking contra líderes del sector"],
      standard: ["Tienes una base sólida para benchmarking", "Trabaja en mejorar la integración de datos entre sistemas", "Implementa ciclos de reporting más frecuentes", "Empieza a comparar KPIs entre tus ubicaciones"],
      preparing: ["Concéntrate en mejorar la calidad y precisión de los datos", "Trabaja para integrar mejor los sistemas", "Establece procesos de reporting constantes", "Empieza a seguir KPIs básicos de forma consistente"],
      foundation: ["Prioriza la calidad de datos y la fiabilidad de los sistemas", "Empieza a integrar tus sistemas operativos", "Establece una cadencia básica de reporting", "Construye una cultura basada en números dentro del equipo"],
    },
    cta: { intro: "¿Quieres benchmarking e inteligencia competitiva más avanzados?", button: "Ver plataforma Sundae" },
    errors: { missing: "Responde todas las preguntas" },
  },
};

export default function BenchmarkReadinessPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;
  const [responses, setResponses] = useState<Responses>({
    dataQuality: "",
    systemIntegration: "",
    reporting: "",
    kpiTracking: "",
    teamAlignment: "",
  });
  const [result, setResult] = useState<{ score: number; level: string; recommendations: string[] } | null>(null);

  const calculate = () => {
    const values = Object.values(responses).map((v) => parseInt(v));
    if (values.some((v) => isNaN(v))) {
      alert(copy.errors.missing);
      return;
    }

    const totalScore = values.reduce((sum, v) => sum + v, 0);
    const maxScore = copy.questions.length * 4;
    const score = Math.round((totalScore / maxScore) * 100);

    let level = "";
    let recommendations: string[] = [];

    if (score >= 80) {
      level = copy.levels.readyAdvanced;
      recommendations = copy.recSets.advanced;
    } else if (score >= 60) {
      level = copy.levels.readyStandard;
      recommendations = copy.recSets.standard;
    } else if (score >= 40) {
      level = copy.levels.preparing;
      recommendations = copy.recSets.preparing;
    } else {
      level = copy.levels.foundation;
      recommendations = copy.recSets.foundation;
    }

    setResult({ score, level, recommendations });
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="inline-flex items-center text-[#60A5FA] hover:text-[#60A5FA] mb-6">
          ← {copy.back}
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <SundaeIcon name="chart" size="md" />
            <span>{copy.hero.badge}</span>
          </div>
          <h1 className="hero-h1 text-[var(--text-primary)] mb-4">{copy.hero.title}</h1>
          <p className="body-xl text-[var(--text-supporting)]">{copy.hero.description}</p>
        </div>

        <Card variant="elevated" className="mb-8">
          <CardHeader>
            <CardTitle>{copy.form.title}</CardTitle>
            <CardDescription>{copy.form.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {copy.questions.map((q, index) => (
                <div key={q.id}>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    {index + 1}. {q.question}
                  </label>
                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 p-3 border border-[var(--border-default)] rounded-lg hover:bg-[var(--surface-faint)] cursor-pointer">
                        <input
                          type="radio"
                          name={q.id}
                          value={option.value}
                          checked={responses[q.id] === option.value}
                          onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                          className="w-4 h-4 text-[#60A5FA]"
                        />
                        <span className="text-[var(--text-secondary)]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <Button onClick={calculate} variant="primary" size="lg" className="w-full mt-6">
                {copy.form.button}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card variant="elevated" className="border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle>{copy.results.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[rgba(28,71,255,0.1)] rounded-lg p-6 text-center">
                <div className="text-sm text-[var(--text-supporting)] mb-2">{copy.results.overall}</div>
                <div className="text-5xl font-bold text-[#60A5FA] mb-2">{result.score}%</div>
                <div className="text-xl font-semibold text-[var(--text-primary)]">{result.level}</div>
              </div>

              <div className="bg-[var(--surface-faint)] rounded-lg p-6">
                <div className="text-sm font-semibold text-[var(--text-secondary)] mb-3">{copy.results.recommendations}</div>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#60A5FA] mt-1">•</span>
                      <span className="text-[var(--text-supporting)]">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/10 rounded-lg p-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>{copy.results.nextStep}</strong>{" "}
                  {result.score >= 60 ? copy.results.nextReady : copy.results.nextBuilding}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <p className="text-[var(--text-supporting)] mb-6">{copy.cta.intro}</p>
          <Link href="/demo">
            <Button variant="primary" size="lg">{copy.cta.button}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
