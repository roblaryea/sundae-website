"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type RequiredEnglishLocalizedRecord } from '@/lib/i18n';
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_tools_multi_location_uplift_page'

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
    laborDetail: string;
    menuDetail: string;
    operationsDetail: string;
    benchmarkingDetail: string;
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

const localizedCopy: RequiredEnglishLocalizedRecord<UpliftCopy> = {
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
      tip: "A typical single site lands near 3-4% in total once the levers below are worked together. Treat anything higher as a stretch case, not a plan.",
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
      laborDetail: "Tighten scheduling against demand and cut avoidable overtime.",
      menuDetail: "Reprice and reposition around the items that actually carry margin.",
      operationsDetail: "Cut controllable waste and close the gap between ordered and used.",
      benchmarkingDetail: "Find what the top site does differently, then run it everywhere.",
      note: "This applies the target you entered to the revenue you entered - it is your assumption, sized, not a Sundae forecast. What it is actually worth depends on where your margin is leaking today and whether the work gets done. Sundae finds the opportunities, gives each one an owner, and measures what came back.",
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
      tip: "الموقع المفرد المعتاد يصل إلى نحو 3-4% إجمالاً عند العمل على الروافع أدناه معاً. وما يزيد عن ذلك حالة طموحة، لا خطة.",
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
      laborDetail: "اضبط الجدولة على الطلب الفعلي وقلّص الوقت الإضافي القابل للتجنب.",
      menuDetail: "أعد التسعير والترتيب حول الأصناف التي تحمل الهامش فعلاً.",
      operationsDetail: "قلّص الهدر القابل للتحكم وأغلق الفجوة بين المطلوب والمستهلك.",
      benchmarkingDetail: "اعرف ما يفعله الموقع الأفضل بشكل مختلف، ثم طبّقه في كل مكان.",
      note: "هذا يطبّق الهدف الذي أدخلته على الإيراد الذي أدخلته - إنه افتراضك محسوباً، وليس توقعاً من Sundae. وقيمته الحقيقية تعتمد على أين يتسرب هامشك اليوم وهل يُنفَّذ العمل. Sundae يجد الفرص، ويسند كل واحدة إلى مسؤول، ويقيس ما عاد.",
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
      tip: "Un site isolé atteint généralement 3 à 4 % au total lorsque les leviers ci-dessous sont travaillés ensemble. Au-delà, considérez-le comme un cas ambitieux, pas comme un plan.",
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
      laborDetail: "Ajustez les plannings a la demande reelle et reduisez les heures supplementaires evitables.",
      menuDetail: "Repositionnez et retarifez autour des plats qui portent vraiment la marge.",
      operationsDetail: "Reduisez le gaspillage maitrisable et refermez l'ecart entre commande et consommation.",
      benchmarkingDetail: "Identifiez ce que fait le meilleur site, puis deployez-le partout.",
      note: "Ceci applique l'objectif que vous avez saisi au chiffre d'affaires que vous avez saisi : c'est votre hypothèse, chiffrée, pas une prévision Sundae. Sa valeur réelle dépend de l'endroit où votre marge fuit aujourd'hui et du fait que le travail soit fait. Sundae repère les opportunités, attribue un responsable à chacune et mesure ce qui est revenu.",
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
      tip: "Un local típico llega a cerca del 3-4% en total cuando se trabajan juntas las palancas de abajo. Por encima de eso, trátalo como un caso ambicioso, no como un plan.",
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
      laborDetail: "Ajusta los turnos a la demanda real y recorta las horas extra evitables.",
      menuDetail: "Reprecia y reordena en torno a los platos que de verdad sostienen el margen.",
      operationsDetail: "Reduce la merma controlable y cierra la brecha entre lo pedido y lo usado.",
      benchmarkingDetail: "Descubre que hace distinto el mejor local y replicalo en todos.",
      note: "Esto aplica el objetivo que introdujiste a los ingresos que introdujiste: es tu supuesto, dimensionado, no un pronóstico de Sundae. Lo que valga de verdad depende de dónde se fuga tu margen hoy y de que el trabajo se haga. Sundae encuentra las oportunidades, asigna un responsable a cada una y mide lo que volvió.",
    },
    timeframe: { small: "3-6 meses con mejoras operativas focalizadas", medium: "6-12 meses con optimización constante", large: "12-18 meses con iniciativas estratégicas", xlarge: "18-24 meses con una transformación mayor" },
    cta: { intro: "¿Quieres identificar oportunidades de mejora específicas en tus ubicaciones?", button: "Ver cómo Sundae puede ayudar" },
    errors: { invalidNumbers: "Ingresa números válidos" },
  },
};

export default function MultiLocationUpliftPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
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
        <Link href="/tools" className="inline-flex items-center text-[#FF8473] hover:text-[#FF8473] mb-6">
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
                <input type="number" value={locations} onChange={(e) => setLocations(e.target.value)} placeholder={copy.form.locationsPlaceholder} className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-[#FF5C4D]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.revenueLabel}</label>
                <input type="number" value={avgRevenue} onChange={(e) => setAvgRevenue(e.target.value)} placeholder={copy.form.revenuePlaceholder} className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-[#FF5C4D]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.improvementLabel}</label>
                <input type="number" value={targetImprovement} onChange={(e) => setTargetImprovement(e.target.value)} placeholder={copy.form.improvementPlaceholder} step="0.1" className="w-full px-4 py-3 border border-white/[0.1] rounded-lg focus:ring-2 focus:ring-[#FF5C4D]" />
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
                <div className="bg-[rgba(255,92,77,0.1)] rounded-lg p-6">
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
                  <li className="flex items-start space-x-2"><span className="text-purple-400 mt-1">•</span><span className="text-[var(--text-supporting)]"><strong>{copy.results.labor}:</strong> {copy.results.laborDetail}</span></li>
                  <li className="flex items-start space-x-2"><span className="text-purple-400 mt-1">•</span><span className="text-[var(--text-supporting)]"><strong>{copy.results.menu}:</strong> {copy.results.menuDetail}</span></li>
                  <li className="flex items-start space-x-2"><span className="text-purple-400 mt-1">•</span><span className="text-[var(--text-supporting)]"><strong>{copy.results.operations}:</strong> {copy.results.operationsDetail}</span></li>
                  <li className="flex items-start space-x-2"><span className="text-purple-400 mt-1">•</span><span className="text-[var(--text-supporting)]"><strong>{copy.results.benchmarking}:</strong> {copy.results.benchmarkingDetail}</span></li>
                </ul>
              </div>

              <div className="bg-[rgba(255,92,77,0.1)] rounded-lg p-4">
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
