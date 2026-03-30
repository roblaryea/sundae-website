"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type UpliftCopy = {
  back: string;
  hero: { badge: string; title: string; description: string };
  form: {
    title: string;
    description: string;
    locationsLabel: string;
    locationsPlaceholder: string;
    revenueLabel: string;
    revenuePlaceholder: string;
    improvementLabel: string;
    improvementPlaceholder: string;
    tip: string;
    button: string;
  };
  results: {
    title: string;
    currentRevenue: string;
    potentialUplift: string;
    upliftPerLocation: string;
    timeframe: string;
    areasTitle: string;
    labor: string;
    menu: string;
    operations: string;
    benchmarking: string;
    note: string;
  };
  timeframe: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  cta: { intro: string; button: string };
  errors: { invalidNumbers: string };
};

const localizedCopy: Record<WebsiteLocale, UpliftCopy> = {
  en: {
    back: "Back to Tools",
    hero: { badge: "Portfolio Intelligence", title: "Multi-Location Revenue Uplift Estimator", description: "Calculate the potential revenue impact of operational improvements across multiple locations." },
    form: {
      title: "Enter Your Multi-Location Data",
      description: "Estimate the revenue impact of performance improvements.",
      locationsLabel: "Number of Locations",
      locationsPlaceholder: "e.g., 10",
      revenueLabel: "Average Monthly Revenue per Location ($)",
      revenuePlaceholder: "e.g., 50000",
      improvementLabel: "Target Improvement (%)",
      improvementPlaceholder: "e.g., 5",
      tip: "Typical improvements range from 2-10% with systematic optimization.",
      button: "Calculate Revenue Uplift",
    },
    results: {
      title: "Estimated Revenue Impact",
      currentRevenue: "Current Annual Revenue",
      potentialUplift: "Potential Annual Uplift",
      upliftPerLocation: "Uplift Per Location",
      timeframe: "Expected Timeframe",
      areasTitle: "Key Improvement Areas",
      labor: "Labor Optimization",
      menu: "Menu Engineering",
      operations: "Operational Excellence",
      benchmarking: "Location Benchmarking",
      note: "These estimates are based on industry benchmarks. Actual results depend on current performance levels, market conditions, and execution quality. Sundae helps identify and track opportunities across all locations.",
    },
    timeframe: { small: "3-6 months with focused operational improvements", medium: "6-12 months with consistent optimization", large: "12-18 months with strategic initiatives", xlarge: "18-24 months with major transformation" },
    cta: { intro: "Want to identify specific improvement opportunities across your locations?", button: "See How Sundae Can Help" },
    errors: { invalidNumbers: "Please enter valid numbers" },
  },
  ar: {
    back: "العودة إلى الأدوات",
    hero: { badge: "ذكاء المحفظة", title: "مقدر الارتفاع في الإيرادات متعدد المواقع", description: "احسب الأثر المحتمل لتحسينات التشغيل عبر عدة مواقع." },
    form: {
      title: "أدخل بيانات المواقع",
      description: "قدّر أثر تحسين الأداء على الإيرادات.",
      locationsLabel: "عدد المواقع",
      locationsPlaceholder: "مثال: 10",
      revenueLabel: "متوسط الإيراد الشهري لكل موقع ($)",
      revenuePlaceholder: "مثال: 50000",
      improvementLabel: "التحسن المستهدف (%)",
      improvementPlaceholder: "مثال: 5",
      tip: "تتراوح التحسينات المعتادة بين 2-10% مع التحسين المنهجي.",
      button: "احسب ارتفاع الإيرادات",
    },
    results: {
      title: "الأثر التقديري على الإيرادات",
      currentRevenue: "الإيراد السنوي الحالي",
      potentialUplift: "الارتفاع السنوي المحتمل",
      upliftPerLocation: "الارتفاع لكل موقع",
      timeframe: "الإطار الزمني المتوقع",
      areasTitle: "مجالات التحسين الرئيسية",
      labor: "تحسين العمالة",
      menu: "هندسة القائمة",
      operations: "التميز التشغيلي",
      benchmarking: "معيارية المواقع",
      note: "تعتمد هذه التقديرات على معايير الصناعة. النتائج الفعلية تعتمد على مستويات الأداء الحالية وظروف السوق وجودة التنفيذ. تساعد Sundae في تحديد الفرص وتتبعها عبر جميع المواقع.",
    },
    timeframe: { small: "3-6 أشهر مع تحسينات تشغيلية مركزة", medium: "6-12 شهراً مع تحسين مستمر", large: "12-18 شهراً مع مبادرات استراتيجية", xlarge: "18-24 شهراً مع تحول كبير" },
    cta: { intro: "هل تريد تحديد فرص تحسين محددة عبر مواقعك؟", button: "شاهد كيف يمكن لـ Sundae المساعدة" },
    errors: { invalidNumbers: "يرجى إدخال أرقام صحيحة" },
  },
  fr: {
    back: "Retour aux outils",
    hero: { badge: "Intelligence de portefeuille", title: "Estimateur de gain de revenus multi-sites", description: "Calculez l'impact potentiel des améliorations opérationnelles sur plusieurs sites." },
    form: {
      title: "Entrez vos données multi-sites",
      description: "Estimez l'impact sur le revenu des améliorations de performance.",
      locationsLabel: "Nombre de sites",
      locationsPlaceholder: "ex. 10",
      revenueLabel: "Revenu mensuel moyen par site ($)",
      revenuePlaceholder: "ex. 50000",
      improvementLabel: "Amélioration cible (%)",
      improvementPlaceholder: "ex. 5",
      tip: "Les améliorations typiques vont de 2 à 10 % avec une optimisation systématique.",
      button: "Calculer le gain de revenus",
    },
    results: {
      title: "Impact de revenu estimé",
      currentRevenue: "Revenu annuel actuel",
      potentialUplift: "Gain annuel potentiel",
      upliftPerLocation: "Gain par site",
      timeframe: "Horizon attendu",
      areasTitle: "Principaux axes d'amélioration",
      labor: "Optimisation de la main-d'œuvre",
      menu: "Menu engineering",
      operations: "Excellence opérationnelle",
      benchmarking: "Benchmarking des sites",
      note: "Ces estimations sont basées sur les benchmarks du secteur. Les résultats réels dépendent du niveau de performance actuel, des conditions du marché et de la qualité d'exécution. Sundae aide à identifier et suivre les opportunités sur tous les sites.",
    },
    timeframe: { small: "3-6 mois avec des améliorations opérationnelles ciblées", medium: "6-12 mois avec une optimisation continue", large: "12-18 mois avec des initiatives stratégiques", xlarge: "18-24 mois avec une transformation majeure" },
    cta: { intro: "Vous voulez identifier des opportunités d'amélioration spécifiques sur vos sites ?", button: "Voir comment Sundae peut aider" },
    errors: { invalidNumbers: "Veuillez saisir des nombres valides" },
  },
  es: {
    back: "Volver a herramientas",
    hero: { badge: "Inteligencia de portafolio", title: "Estimador de uplift de ingresos multiubicación", description: "Calcula el impacto potencial en ingresos de mejoras operativas en varias ubicaciones." },
    form: {
      title: "Ingresa tus datos multiubicación",
      description: "Estima el impacto en ingresos de las mejoras de rendimiento.",
      locationsLabel: "Número de ubicaciones",
      locationsPlaceholder: "ej., 10",
      revenueLabel: "Ingresos mensuales promedio por ubicación ($)",
      revenuePlaceholder: "ej., 50000",
      improvementLabel: "Mejora objetivo (%)",
      improvementPlaceholder: "ej., 5",
      tip: "Las mejoras típicas van del 2 al 10% con optimización sistemática.",
      button: "Calcular uplift de ingresos",
    },
    results: {
      title: "Impacto estimado en ingresos",
      currentRevenue: "Ingresos anuales actuales",
      potentialUplift: "Uplift anual potencial",
      upliftPerLocation: "Uplift por ubicación",
      timeframe: "Plazo esperado",
      areasTitle: "Áreas clave de mejora",
      labor: "Optimización de mano de obra",
      menu: "Ingeniería de menú",
      operations: "Excelencia operativa",
      benchmarking: "Benchmarking de ubicaciones",
      note: "Estas estimaciones se basan en benchmarks del sector. Los resultados reales dependen del nivel actual de rendimiento, las condiciones del mercado y la calidad de ejecución. Sundae ayuda a identificar y rastrear oportunidades en todas las ubicaciones.",
    },
    timeframe: { small: "3-6 meses con mejoras operativas focalizadas", medium: "6-12 meses con optimización constante", large: "12-18 meses con iniciativas estratégicas", xlarge: "18-24 meses con una transformación mayor" },
    cta: { intro: "¿Quieres identificar oportunidades de mejora específicas en tus ubicaciones?", button: "Ver cómo Sundae puede ayudar" },
    errors: { invalidNumbers: "Ingresa números válidos" },
  },
};

export default function MultiLocationUpliftPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;
  const [locations, setLocations] = useState("");
  const [avgRevenue, setAvgRevenue] = useState("");
  const [targetImprovement, setTargetImprovement] = useState("");
  const [result, setResult] = useState<{ totalRevenue: number; upliftRevenue: number; annualImpact: number; perLocation: number; timeframe: string } | null>(null);

  const calculate = () => {
    const numLocations = parseFloat(locations);
    const revenue = parseFloat(avgRevenue);
    const improvement = parseFloat(targetImprovement);

    if (isNaN(numLocations) || isNaN(revenue) || isNaN(improvement) || numLocations === 0) {
      alert(copy.errors.invalidNumbers);
      return;
    }

    const totalRevenue = numLocations * revenue * 12;
    const upliftPercent = improvement / 100;
    const upliftRevenue = totalRevenue * upliftPercent;
    const perLocation = upliftRevenue / numLocations;

    let timeframe = copy.timeframe.xlarge;
    if (improvement <= 3) timeframe = copy.timeframe.small;
    else if (improvement <= 5) timeframe = copy.timeframe.medium;
    else if (improvement <= 10) timeframe = copy.timeframe.large;

    setResult({ totalRevenue, upliftRevenue, annualImpact: upliftRevenue, perLocation, timeframe });
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="inline-flex items-center text-[#60A5FA] hover:text-[#60A5FA] mb-6">
          ← {copy.back}
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <SundaeIcon name="performance" size="md" />
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
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.locationsLabel}</label>
                <input type="number" value={locations} onChange={(e) => setLocations(e.target.value)} placeholder={copy.form.locationsPlaceholder} className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.revenueLabel}</label>
                <input type="number" value={avgRevenue} onChange={(e) => setAvgRevenue(e.target.value)} placeholder={copy.form.revenuePlaceholder} className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.improvementLabel}</label>
                <input type="number" value={targetImprovement} onChange={(e) => setTargetImprovement(e.target.value)} placeholder={copy.form.improvementPlaceholder} step="0.1" className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-[var(--text-muted)] mt-1">{copy.form.tip}</p>
              </div>

              <Button onClick={calculate} variant="primary" size="lg" className="w-full">{copy.form.button}</Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card variant="elevated" className="border-l-4 border-purple-500">
            <CardHeader>
              <CardTitle>{copy.results.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[rgba(28,71,255,0.1)] rounded-lg p-6">
                  <div className="text-sm text-[var(--text-supporting)] mb-2">{copy.results.currentRevenue}</div>
                  <div className="section-h3 text-[var(--text-primary)]">${(result.totalRevenue / 1000000).toFixed(2)}M</div>
                </div>

                <div className="bg-purple-500/10 rounded-lg p-6">
                  <div className="text-sm text-[var(--text-supporting)] mb-2">{copy.results.potentialUplift}</div>
                  <div className="text-3xl font-bold text-purple-400">${(result.upliftRevenue / 1000000).toFixed(2)}M</div>
                </div>

                <div className="bg-green-500/10 rounded-lg p-6">
                  <div className="text-sm text-[var(--text-supporting)] mb-2">{copy.results.upliftPerLocation}</div>
                  <div className="text-3xl font-bold text-green-400">${(result.perLocation / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{copy.results.timeframe}</div>
                </div>

                <div className="bg-orange-500/10 rounded-lg p-6">
                  <div className="text-sm text-[var(--text-supporting)] mb-2">{copy.results.timeframe}</div>
                  <div className="text-lg font-semibold text-orange-400">{result.timeframe}</div>
                </div>
              </div>

              <div className="bg-[var(--surface-faint)] rounded-lg p-6">
                <div className="text-sm font-semibold text-[var(--text-secondary)] mb-3">{copy.results.areasTitle}</div>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2"><span className="text-purple-400 mt-1">•</span><span className="text-[var(--text-supporting)]"><strong>{copy.results.labor}:</strong> Improve scheduling efficiency and reduce overtime (2-4% impact)</span></li>
                  <li className="flex items-start space-x-2"><span className="text-purple-400 mt-1">•</span><span className="text-[var(--text-supporting)]"><strong>{copy.results.menu}:</strong> Optimize pricing and promote high-margin items (1-3% impact)</span></li>
                  <li className="flex items-start space-x-2"><span className="text-purple-400 mt-1">•</span><span className="text-[var(--text-supporting)]"><strong>{copy.results.operations}:</strong> Reduce waste, improve inventory management (1-2% impact)</span></li>
                  <li className="flex items-start space-x-2"><span className="text-purple-400 mt-1">•</span><span className="text-[var(--text-supporting)]"><strong>{copy.results.benchmarking}:</strong> Replicate best practices from top performers (2-5% impact)</span></li>
                </ul>
              </div>

              <div className="bg-[rgba(28,71,255,0.1)] rounded-lg p-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>{copy.results.note}</strong>
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
