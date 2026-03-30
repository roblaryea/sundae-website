"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type LaborAnalyzerCopy = {
  back: string;
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  form: {
    title: string;
    description: string;
    actualLabel: string;
    actualPlaceholder: string;
    revenueLabel: string;
    revenuePlaceholder: string;
    targetLabel: string;
    targetHint: string;
    targetPlaceholder: string;
    buttonIdle: string;
  };
  results: {
    title: string;
    actualLabel: string;
    varianceLabel: string;
    recommendationLabel: string;
    statusOnTarget: string;
    statusHigh: string;
    statusSlightlyHigh: string;
    statusLow: string;
    recOnTarget: string;
    recHigh: string;
    recSlightlyHigh: string;
    recLow: string;
    nextStepTitle: string;
    nextStepOnTarget: string;
    nextStepBelow: string;
  };
  cta: {
    intro: string;
    button: string;
  };
  alerts: {
    invalidNumbers: string;
  };
  tip: string;
};

const localizedCopy: Record<WebsiteLocale, LaborAnalyzerCopy> = {
  en: {
    back: "Back to Tools",
    hero: {
      badge: "Labor Intelligence",
      title: "Labor Cost Variance Analyzer",
      description: "Compare your actual labor costs against targets and get actionable insights.",
    },
    form: {
      title: "Enter Your Labor Data",
      description: "Input your actual labor costs and revenue to analyze variance.",
      actualLabel: "Actual Labor Cost ($)",
      actualPlaceholder: "e.g., 25000",
      revenueLabel: "Total Revenue ($)",
      revenuePlaceholder: "e.g., 100000",
      targetLabel: "Target Labor % (optional)",
      targetHint: "Industry standard is typically 25-35% for full-service restaurants.",
      targetPlaceholder: "e.g., 30",
      buttonIdle: "Analyze Labor Variance",
    },
    results: {
      title: "Analysis Results",
      actualLabel: "Actual Labor Cost %",
      varianceLabel: "Variance vs Target",
      recommendationLabel: "Recommendation",
      statusOnTarget: "on-target",
      statusHigh: "high",
      statusSlightlyHigh: "slightly-high",
      statusLow: "low",
      recOnTarget: "Your labor cost is within acceptable range.",
      recHigh: "Labor costs are significantly above target. Consider reviewing scheduling efficiency, overtime usage, and staffing levels.",
      recSlightlyHigh: "Labor costs are slightly above target. Monitor trends and look for optimization opportunities.",
      recLow: "Labor costs are significantly below target. Ensure adequate staffing levels to maintain service quality.",
      nextStepTitle: "Next Step:",
      nextStepOnTarget: "You're ready to start benchmarking! Consider scheduling a demo to see how Sundae can help.",
      nextStepBelow: "Focus on the recommendations above, then retake this assessment in 3-6 months.",
    },
    cta: {
      intro: "Want more advanced labor analytics across all locations?",
      button: "See Sundae Platform",
    },
    alerts: {
      invalidNumbers: "Please enter valid numbers",
    },
    tip: "Industry standard is typically 25-35% for full-service restaurants.",
  },
  ar: {
    back: "العودة إلى الأدوات",
    hero: {
      badge: "ذكاء العمالة",
      title: "محلل تباين تكلفة العمالة",
      description: "قارن تكاليف العمالة الفعلية بالأهداف واحصل على رؤى عملية.",
    },
    form: {
      title: "أدخل بيانات العمالة",
      description: "أدخل تكاليف العمالة الفعلية والإيرادات لتحليل التباين.",
      actualLabel: "تكلفة العمالة الفعلية ($)",
      actualPlaceholder: "مثال: 25000",
      revenueLabel: "إجمالي الإيرادات ($)",
      revenuePlaceholder: "مثال: 100000",
      targetLabel: "نسبة العمالة المستهدفة (اختياري)",
      targetHint: "المعيار الصناعي عادة بين 25-35% للمطاعم ذات الخدمة الكاملة.",
      targetPlaceholder: "مثال: 30",
      buttonIdle: "حلّل تباين العمالة",
    },
    results: {
      title: "نتائج التحليل",
      actualLabel: "نسبة العمالة الفعلية",
      varianceLabel: "التباين مقابل الهدف",
      recommendationLabel: "التوصية",
      statusOnTarget: "ضمن الهدف",
      statusHigh: "مرتفع",
      statusSlightlyHigh: "مرتفع قليلاً",
      statusLow: "منخفض",
      recOnTarget: "تكلفة العمالة لديك ضمن النطاق المقبول.",
      recHigh: "تكاليف العمالة أعلى بكثير من الهدف. راجع كفاءة الجدولة واستخدام العمل الإضافي ومستويات التوظيف.",
      recSlightlyHigh: "تكاليف العمالة أعلى قليلاً من الهدف. راقب الاتجاهات وابحث عن فرص التحسين.",
      recLow: "تكاليف العمالة أقل بكثير من الهدف. تأكد من توافر مستويات توظيف مناسبة للحفاظ على جودة الخدمة.",
      nextStepTitle: "الخطوة التالية:",
      nextStepOnTarget: "أنت جاهز لبدء المعيارية! فكّر في حجز عرض لتعرف كيف يمكن لـ Sundae المساعدة.",
      nextStepBelow: "ركّز على التوصيات أعلاه ثم أعد التقييم بعد 3-6 أشهر.",
    },
    cta: {
      intro: "هل تريد تحليلات عمالة أكثر تقدماً عبر جميع المواقع؟",
      button: "شاهد منصة Sundae",
    },
    alerts: {
      invalidNumbers: "يرجى إدخال أرقام صحيحة",
    },
    tip: "المعيار الصناعي عادة بين 25-35% للمطاعم ذات الخدمة الكاملة.",
  },
  fr: {
    back: "Retour aux outils",
    hero: {
      badge: "Intelligence de la main-d'œuvre",
      title: "Analyseur d'écart de coût de main-d'œuvre",
      description: "Comparez vos coûts de main-d'œuvre réels aux objectifs et obtenez des insights exploitables.",
    },
    form: {
      title: "Entrez vos données de main-d'œuvre",
      description: "Saisissez vos coûts de main-d'œuvre réels et votre chiffre d'affaires pour analyser l'écart.",
      actualLabel: "Coût de main-d'œuvre réel ($)",
      actualPlaceholder: "ex. 25000",
      revenueLabel: "Revenu total ($)",
      revenuePlaceholder: "ex. 100000",
      targetLabel: "Coût de main-d'œuvre cible % (optionnel)",
      targetHint: "La norme du secteur se situe généralement entre 25 et 35 % pour les restaurants à service complet.",
      targetPlaceholder: "ex. 30",
      buttonIdle: "Analyser l'écart de main-d'œuvre",
    },
    results: {
      title: "Résultats de l'analyse",
      actualLabel: "Pourcentage de main-d'œuvre réel",
      varianceLabel: "Écart par rapport à l'objectif",
      recommendationLabel: "Recommandation",
      statusOnTarget: "dans la cible",
      statusHigh: "élevé",
      statusSlightlyHigh: "légèrement élevé",
      statusLow: "bas",
      recOnTarget: "Votre coût de main-d'œuvre se situe dans une plage acceptable.",
      recHigh: "Les coûts de main-d'œuvre sont nettement supérieurs à l'objectif. Examinez l'efficacité de la planification, les heures supplémentaires et les effectifs.",
      recSlightlyHigh: "Les coûts de main-d'œuvre sont légèrement supérieurs à l'objectif. Surveillez les tendances et cherchez des optimisations.",
      recLow: "Les coûts de main-d'œuvre sont nettement inférieurs à l'objectif. Assurez-vous que le staffing reste suffisant pour maintenir la qualité de service.",
      nextStepTitle: "Prochaine étape :",
      nextStepOnTarget: "Vous êtes prêt à commencer le benchmarking ! Envisagez de réserver une démo pour voir comment Sundae peut aider.",
      nextStepBelow: "Concentrez-vous sur les recommandations ci-dessus, puis refaites cette évaluation dans 3 à 6 mois.",
    },
    cta: {
      intro: "Vous voulez des analyses de main-d'œuvre plus avancées sur tous vos sites ?",
      button: "Voir la plateforme Sundae",
    },
    alerts: {
      invalidNumbers: "Veuillez saisir des nombres valides",
    },
    tip: "La norme du secteur se situe généralement entre 25 et 35 % pour les restaurants à service complet.",
  },
  es: {
    back: "Volver a herramientas",
    hero: {
      badge: "Inteligencia laboral",
      title: "Analizador de variación de costo laboral",
      description: "Compara tus costos laborales reales con los objetivos y obtén insights accionables.",
    },
    form: {
      title: "Ingresa tus datos laborales",
      description: "Introduce tus costos laborales reales e ingresos para analizar la variación.",
      actualLabel: "Costo laboral real ($)",
      actualPlaceholder: "ej., 25000",
      revenueLabel: "Ingresos totales ($)",
      revenuePlaceholder: "ej., 100000",
      targetLabel: "Costo laboral objetivo % (opcional)",
      targetHint: "El estándar del sector suele ser 25-35% para restaurantes de servicio completo.",
      targetPlaceholder: "ej., 30",
      buttonIdle: "Analizar variación laboral",
    },
    results: {
      title: "Resultados del análisis",
      actualLabel: "Porcentaje laboral real",
      varianceLabel: "Variación vs. objetivo",
      recommendationLabel: "Recomendación",
      statusOnTarget: "en objetivo",
      statusHigh: "alto",
      statusSlightlyHigh: "ligeramente alto",
      statusLow: "bajo",
      recOnTarget: "Tu costo laboral está dentro del rango aceptable.",
      recHigh: "Los costos laborales están significativamente por encima del objetivo. Revisa la eficiencia de programación, las horas extra y los niveles de personal.",
      recSlightlyHigh: "Los costos laborales están ligeramente por encima del objetivo. Monitorea tendencias y busca oportunidades de optimización.",
      recLow: "Los costos laborales están significativamente por debajo del objetivo. Asegúrate de tener suficiente personal para mantener la calidad del servicio.",
      nextStepTitle: "Siguiente paso:",
      nextStepOnTarget: "¡Estás listo para empezar con el benchmarking! Considera agendar una demo para ver cómo Sundae puede ayudar.",
      nextStepBelow: "Concéntrate en las recomendaciones anteriores y vuelve a realizar esta evaluación en 3-6 meses.",
    },
    cta: {
      intro: "¿Quieres analíticas laborales más avanzadas en todas tus ubicaciones?",
      button: "Ver plataforma Sundae",
    },
    alerts: {
      invalidNumbers: "Ingresa números válidos",
    },
    tip: "El estándar del sector suele ser 25-35% para restaurantes de servicio completo.",
  },
};

export default function LaborAnalyzerPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;
  const [actualLabor, setActualLabor] = useState("");
  const [revenue, setRevenue] = useState("");
  const [targetLabor, setTargetLabor] = useState("");
  const [result, setResult] = useState<{ laborPercent: number; variance: number; status: string; recommendation: string } | null>(null);

  const calculate = () => {
    const laborCost = parseFloat(actualLabor);
    const totalRevenue = parseFloat(revenue);
    const target = parseFloat(targetLabor);

    if (isNaN(laborCost) || isNaN(totalRevenue) || totalRevenue === 0) {
      alert(copy.alerts.invalidNumbers);
      return;
    }

    const laborPercent = (laborCost / totalRevenue) * 100;
    const variance = target > 0 ? laborPercent - target : 0;

    let status = copy.results.statusOnTarget;
    let recommendation = copy.results.recOnTarget;

    if (variance > 3) {
      status = copy.results.statusHigh;
      recommendation = copy.results.recHigh;
    } else if (variance > 0) {
      status = copy.results.statusSlightlyHigh;
      recommendation = copy.results.recSlightlyHigh;
    } else if (variance < -3) {
      status = copy.results.statusLow;
      recommendation = copy.results.recLow;
    }

    setResult({ laborPercent, variance, status, recommendation });
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="inline-flex items-center text-[#60A5FA] hover:text-[#60A5FA] mb-6">
          ← {copy.back}
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <SundaeIcon name="labor" size="md" />
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
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.actualLabel}</label>
                <input type="number" value={actualLabor} onChange={(e) => setActualLabor(e.target.value)} placeholder={copy.form.actualPlaceholder} className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.revenueLabel}</label>
                <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder={copy.form.revenuePlaceholder} className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.targetLabel}</label>
                <input type="number" value={targetLabor} onChange={(e) => setTargetLabor(e.target.value)} placeholder={copy.form.targetPlaceholder} className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-[var(--text-muted)] mt-1">{copy.form.targetHint}</p>
              </div>

              <Button onClick={calculate} variant="primary" size="lg" className="w-full">
                {copy.form.buttonIdle}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card variant="elevated" className={`border-l-4 ${result.status === copy.results.statusHigh ? "border-red-500" : result.status === copy.results.statusSlightlyHigh ? "border-yellow-500" : result.status === copy.results.statusLow ? "border-blue-500" : "border-green-500"}`}>
            <CardHeader>
              <CardTitle>{copy.results.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[rgba(28,71,255,0.1)] rounded-lg p-6">
                  <div className="text-sm text-[var(--text-supporting)] mb-2">{copy.results.actualLabel}</div>
                  <div className="text-4xl font-bold text-[#60A5FA]">{result.laborPercent.toFixed(1)}%</div>
                </div>

                {parseFloat(targetLabor) > 0 && (
                  <div className={`rounded-lg p-6 ${result.status === copy.results.statusHigh ? "bg-red-500/10" : result.status === copy.results.statusSlightlyHigh ? "bg-yellow-500/10" : result.status === copy.results.statusLow ? "bg-[rgba(28,71,255,0.1)]" : "bg-green-500/10"}`}>
                    <div className="text-sm text-[var(--text-supporting)] mb-2">{copy.results.varianceLabel}</div>
                    <div className={`text-4xl font-bold ${result.status === copy.results.statusHigh ? "text-red-400" : result.status === copy.results.statusSlightlyHigh ? "text-yellow-400" : result.status === copy.results.statusLow ? "text-[#60A5FA]" : "text-green-400"}`}>
                      {result.variance > 0 ? "+" : ""}{result.variance.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[var(--surface-faint)] rounded-lg p-6">
                <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2">{copy.results.recommendationLabel}</div>
                <p className="text-[var(--text-supporting)]">{result.recommendation}</p>
              </div>

              <div className="bg-[rgba(28,71,255,0.1)] rounded-lg p-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>{copy.results.nextStepTitle}</strong>{" "}
                  {result.status === copy.results.statusOnTarget ? copy.results.nextStepOnTarget : copy.results.nextStepBelow}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <p className="text-[var(--text-supporting)] mb-6">{copy.cta.intro}</p>
          <Link href="/demo">
            <Button variant="primary" size="lg">
              {copy.cta.button}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
