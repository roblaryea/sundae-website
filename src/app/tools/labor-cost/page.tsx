"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon } from "@/components/icons";
import { PageCTA } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type LaborCostCopy = {
  back: string;
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  form: {
    title: string;
    description: string;
    laborLabel: string;
    laborHint: string;
    salesLabel: string;
    salesHint: string;
    buttonIdle: string;
    buttonBusy: string;
  };
  results: {
    title: string;
    analysis: string;
    benchmarkTitle: string;
    low: string;
    healthy: string;
    high: string;
    bulletLow: string;
    bulletHealthy: string;
    bulletHigh: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  errors: {
    invalidNumbers: string;
  };
};

const localizedCopy: Record<WebsiteLocale, LaborCostCopy> = {
  en: {
    back: "Back to Tools",
    hero: {
      badge: "Labor Intelligence",
      title: "Labor Cost % Calculator",
      description: "Calculate your labor cost percentage and see if you're on target compared to industry standards.",
    },
    form: {
      title: "Enter Your Numbers",
      description: "Input your total labor cost and sales for the period.",
      laborLabel: "Total Labor Cost",
      laborHint: "Total wages, benefits, and payroll taxes",
      salesLabel: "Total Sales",
      salesHint: "Total revenue for the same period",
      buttonIdle: "Calculate Labor Cost %",
      buttonBusy: "Calculating...",
    },
    results: {
      title: "Your Labor Cost %",
      analysis: "Analysis",
      benchmarkTitle: "Industry Benchmarks:",
      low: "Lean - Your labor cost is below industry average. Ensure you're not understaffed.",
      healthy: "Healthy - Your labor cost is within the industry standard range of 25-32%.",
      high: "High - Your labor cost exceeds 32%. Review staffing levels and scheduling efficiency.",
      bulletLow: "< 25%: Below average (may indicate understaffing)",
      bulletHealthy: "25-32%: Healthy range for most concepts",
      bulletHigh: "> 32%: Above average (review efficiency)",
    },
    cta: {
      title: "Ready for Deeper Insights?",
      description: "These calculators are just the start. See what Sundae can do with your full data.",
      button: "Book a Demo",
    },
    errors: {
      invalidNumbers: "Please enter valid positive numbers",
    },
  },
  ar: {
    back: "العودة إلى الأدوات",
    hero: {
      badge: "ذكاء العمالة",
      title: "حاسبة % تكلفة العمالة",
      description: "احسب نسبة تكلفة العمالة وتحقق مما إذا كنت ضمن الهدف مقارنة بالمعايير.",
    },
    form: {
      title: "أدخل الأرقام",
      description: "أدخل إجمالي تكلفة العمالة والمبيعات للفترة.",
      laborLabel: "إجمالي تكلفة العمالة",
      laborHint: "الأجور الكلية والمزايا والضرائب على الرواتب",
      salesLabel: "إجمالي المبيعات",
      salesHint: "إجمالي الإيرادات للفترة نفسها",
      buttonIdle: "احسب نسبة تكلفة العمالة",
      buttonBusy: "جارٍ الحساب...",
    },
    results: {
      title: "نسبة تكلفة العمالة لديك",
      analysis: "التحليل",
      benchmarkTitle: "معايير الصناعة:",
      low: "مرن - تكلفة العمالة لديك أقل من متوسط الصناعة. تأكد من أنك لا تعاني من نقص في التوظيف.",
      healthy: "صحي - تكلفة العمالة ضمن النطاق القياسي للصناعة 25-32%.",
      high: "مرتفع - تكلفة العمالة تتجاوز 32%. راجع مستويات التوظيف وكفاءة الجدولة.",
      bulletLow: "أقل من 25%: أقل من المتوسط (قد يشير إلى نقص في التوظيف)",
      bulletHealthy: "25-32%: نطاق صحي لمعظم المفاهيم",
      bulletHigh: "أكثر من 32%: أعلى من المتوسط (راجع الكفاءة)",
    },
    cta: {
      title: "هل تريد رؤى أعمق؟",
      description: "هذه الحاسبات مجرد بداية. شاهد ما يمكن أن تفعله Sundae ببياناتك الكاملة.",
      button: "احجز عرضاً",
    },
    errors: {
      invalidNumbers: "يرجى إدخال أرقام موجبة وصحيحة",
    },
  },
  fr: {
    back: "Retour aux outils",
    hero: {
      badge: "Intelligence de la main-d'œuvre",
      title: "Calculateur du % de coût de main-d'œuvre",
      description: "Calculez votre pourcentage de coût de main-d'œuvre et comparez-le aux standards du secteur.",
    },
    form: {
      title: "Entrez vos chiffres",
      description: "Saisissez le coût total de la main-d'œuvre et les ventes pour la période.",
      laborLabel: "Coût total de main-d'œuvre",
      laborHint: "Salaires, avantages et charges sociales",
      salesLabel: "Ventes totales",
      salesHint: "Revenu total sur la même période",
      buttonIdle: "Calculer le % de coût de main-d'œuvre",
      buttonBusy: "Calcul en cours...",
    },
    results: {
      title: "Votre coût de main-d'œuvre",
      analysis: "Analyse",
      benchmarkTitle: "Benchmarks du secteur :",
      low: "Lean - Votre coût de main-d'œuvre est inférieur à la moyenne du secteur. Assurez-vous de ne pas être en sous-effectif.",
      healthy: "Sain - Votre coût de main-d'œuvre se situe dans la plage standard du secteur de 25 à 32 %.",
      high: "Élevé - Votre coût de main-d'œuvre dépasse 32 %. Passez en revue le staffing et l'efficacité de la planification.",
      bulletLow: "< 25 % : Sous la moyenne (peut indiquer un sous-effectif)",
      bulletHealthy: "25-32 % : Plage saine pour la plupart des concepts",
      bulletHigh: "> 32 % : Au-dessus de la moyenne (revoyez l'efficacité)",
    },
    cta: {
      title: "Prêt pour des insights plus profonds ?",
      description: "Ces calculatrices ne sont qu'un début. Voyez ce que Sundae peut faire avec l'ensemble de vos données.",
      button: "Réserver une démo",
    },
    errors: {
      invalidNumbers: "Veuillez saisir des nombres positifs valides",
    },
  },
  es: {
    back: "Volver a herramientas",
    hero: {
      badge: "Inteligencia laboral",
      title: "Calculadora de % de costo laboral",
      description: "Calcula tu porcentaje de costo laboral y compáralo con los estándares del sector.",
    },
    form: {
      title: "Ingresa tus números",
      description: "Introduce el costo total de mano de obra y las ventas del período.",
      laborLabel: "Costo total laboral",
      laborHint: "Salarios, beneficios e impuestos sobre nómina",
      salesLabel: "Ventas totales",
      salesHint: "Ingresos totales del mismo período",
      buttonIdle: "Calcular costo laboral %",
      buttonBusy: "Calculando...",
    },
    results: {
      title: "Tu costo laboral",
      analysis: "Análisis",
      benchmarkTitle: "Benchmarks del sector:",
      low: "Lean - Tu costo laboral está por debajo del promedio del sector. Asegúrate de no estar subcontratado.",
      healthy: "Saludable - Tu costo laboral está dentro del rango estándar del sector de 25-32%.",
      high: "Alto - Tu costo laboral supera el 32%. Revisa los niveles de dotación y la eficiencia de programación.",
      bulletLow: "< 25%: Por debajo del promedio (puede indicar falta de personal)",
      bulletHealthy: "25-32%: Rango saludable para la mayoría de los conceptos",
      bulletHigh: "> 32%: Por encima del promedio (revisa la eficiencia)",
    },
    cta: {
      title: "¿Listo para insights más profundos?",
      description: "Estas calculadoras son solo el comienzo. Mira lo que Sundae puede hacer con tus datos completos.",
      button: "Reservar demo",
    },
    errors: {
      invalidNumbers: "Ingresa números positivos válidos",
    },
  },
};

export default function LaborCostCalculator() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;
  const [laborCost, setLaborCost] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [result, setResult] = useState<{ percentage: number; interpretation: string; color: string } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = () => {
    setIsCalculating(true);
    const labor = parseFloat(laborCost);
    const sales = parseFloat(totalSales);

    if (isNaN(labor) || isNaN(sales) || labor < 0 || sales <= 0) {
      alert(copy.errors.invalidNumbers);
      setIsCalculating(false);
      return;
    }

    const percentage = (labor / sales) * 100;
    let interpretation = "";
    let color = "";

    if (percentage < 25) {
      interpretation = copy.results.low;
      color = "text-green-400";
    } else if (percentage <= 32) {
      interpretation = copy.results.healthy;
      color = "text-[#60A5FA]";
    } else {
      interpretation = copy.results.high;
      color = "text-red-400";
    }

    setTimeout(() => {
      setResult({ percentage, interpretation, color });
      setIsCalculating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools" className="inline-block mb-8">
            <Button variant="ghost" size="sm">
              ← {copy.back}
            </Button>
          </Link>

          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <SundaeIcon name="hr" size="xl" className="text-white" />
            </div>
            <h1 className="hero-h1 text-[var(--text-primary)] mb-4">{copy.hero.title}</h1>
            <p className="body-lg text-[var(--text-supporting)]">{copy.hero.description}</p>
          </div>

          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-[var(--text-primary)]">{copy.form.title}</CardTitle>
              <CardDescription className="text-[var(--text-supporting)]">{copy.form.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="laborCost" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  {copy.form.laborLabel}
                </label>
                <input
                  type="number"
                  id="laborCost"
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  placeholder="e.g., 25000"
                  aria-describedby="laborCost-hint"
                  className="w-full px-4 py-3 rounded-lg border border-white/[0.1] bg-[var(--navy-deep)] text-[var(--text-primary)] focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p id="laborCost-hint" className="text-xs text-[var(--text-muted)] mt-1">
                  {copy.form.laborHint}
                </p>
              </div>

              <div>
                <label htmlFor="totalSales" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  {copy.form.salesLabel}
                </label>
                <input
                  type="number"
                  id="totalSales"
                  value={totalSales}
                  onChange={(e) => setTotalSales(e.target.value)}
                  placeholder="e.g., 100000"
                  aria-describedby="totalSales-hint"
                  className="w-full px-4 py-3 rounded-lg border border-white/[0.1] bg-[var(--navy-deep)] text-[var(--text-primary)] focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p id="totalSales-hint" className="text-xs text-[var(--text-muted)] mt-1">
                  {copy.form.salesHint}
                </p>
              </div>

              <Button onClick={calculate} variant="primary" size="lg" className="w-full" disabled={isCalculating}>
                {isCalculating ? copy.form.buttonBusy : copy.form.buttonIdle}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card variant="elevated">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-2">{copy.results.title}</h3>
                  <div className="text-6xl font-bold text-[var(--text-primary)] mb-4">
                    {result.percentage.toFixed(1)}%
                  </div>
                </div>

                <div className={`p-6 rounded-xl bg-[var(--navy-deep)] shadow-md ${result.color}`}>
                  <h4 className="font-bold text-lg mb-2">{copy.results.analysis}</h4>
                  <p className="leading-relaxed">{result.interpretation}</p>
                </div>

                <div className="mt-6 p-4 bg-[var(--surface-subtle)] rounded-lg">
                  <h5 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{copy.results.benchmarkTitle}</h5>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                    <li>• {copy.results.bulletLow}</li>
                    <li>• {copy.results.bulletHealthy}</li>
                    <li>• {copy.results.bulletHigh}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <PageCTA title={copy.cta.title} description={copy.cta.description}>
        <Button variant="cta" size="lg" href="/demo">
          {copy.cta.button}
        </Button>
      </PageCTA>
    </div>
  );
}
