"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type BreakEvenCopy = {
  back: string;
  hero: { badge: string; title: string; description: string };
  form: {
    title: string;
    description: string;
    fixedLabel: string;
    fixedHint: string;
    variableLabel: string;
    variableHint: string;
    priceLabel: string;
    priceHint: string;
    buttonIdle: string;
    buttonBusy: string;
  };
  results: {
    title: string;
    coversLabel: string;
    coversSuffix: string;
    analysisTitle: string;
    marginLabel: string;
    perCover: string;
    toProfit: string;
    tipsTitle: string;
    tip1: string;
    tip2: string;
    tip3: string;
    tip4: string;
  };
  cta: { intro: string; button: string };
  errors: { invalidInputs: string; negativeMargin: string };
};

const localizedCopy: Record<WebsiteLocale, BreakEvenCopy> = {
  en: {
    back: "Back to Tools",
    hero: { badge: "Financial Intelligence", title: "Break-Even Covers Calculator", description: "Calculate how many covers you need to break even based on fixed and variable costs." },
    form: {
      title: "Enter Your Costs",
      description: "Input your fixed costs, variable cost per cover, and average selling price.",
      fixedLabel: "Fixed Costs Per Period",
      fixedHint: "Rent, salaries, insurance, etc. (monthly or period total)",
      variableLabel: "Variable Cost Per Cover",
      variableHint: "Food cost, packaging, credit card fees per customer",
      priceLabel: "Average Selling Price Per Cover",
      priceHint: "Average check size per customer",
      buttonIdle: "Calculate Break-Even Point",
      buttonBusy: "Calculating...",
    },
    results: {
      title: "Break-Even Covers Required",
      coversLabel: "covers per period",
      coversSuffix: "covers",
      analysisTitle: "Analysis",
      marginLabel: "Contribution Margin",
      perCover: "per cover",
      toProfit: "To Profit",
      tipsTitle: "Tips to Improve Break-Even:",
      tip1: "Reduce fixed costs (negotiate rent, optimize labor)",
      tip2: "Lower variable costs (better supplier terms, reduce waste)",
      tip3: "Increase average check (upselling, menu engineering)",
      tip4: "Improve contribution margin = faster path to profitability",
    },
    cta: { intro: "Want to identify specific improvement opportunities across your locations?", button: "See How Sundae Can Help" },
    errors: {
      invalidInputs: "Please enter valid numbers (average price must be greater than variable cost)",
      negativeMargin: "Contribution margin must be positive. Increase your average price or reduce variable costs.",
    },
  },
  ar: {
    back: "العودة إلى الأدوات",
    hero: { badge: "ذكاء مالي", title: "حاسبة نقطة التعادل", description: "احسب عدد الوجبات/الضيوف اللازمة للوصول إلى نقطة التعادل بناءً على التكاليف الثابتة والمتغيرة." },
    form: {
      title: "أدخل تكاليفك",
      description: "أدخل التكاليف الثابتة وتكلفة الوجبة المتغيرة ومتوسط سعر البيع.",
      fixedLabel: "التكاليف الثابتة للفترة",
      fixedHint: "الإيجار والرواتب والتأمين وما إلى ذلك (إجمالي شهري أو للفترة)",
      variableLabel: "التكلفة المتغيرة لكل ضيف",
      variableHint: "تكلفة الطعام والتغليف ورسوم البطاقة لكل عميل",
      priceLabel: "متوسط سعر البيع لكل ضيف",
      priceHint: "متوسط قيمة الفاتورة لكل عميل",
      buttonIdle: "احسب نقطة التعادل",
      buttonBusy: "جارٍ الحساب...",
    },
    results: {
      title: "عدد الوجبات/الضيوف المطلوب لنقطة التعادل",
      coversLabel: "وجبة/ضيف لكل فترة",
      coversSuffix: "وجبة/ضيف",
      analysisTitle: "التحليل",
      marginLabel: "هامش المساهمة",
      perCover: "لكل ضيف",
      toProfit: "للربح",
      tipsTitle: "نصائح لتحسين نقطة التعادل:",
      tip1: "خفض التكاليف الثابتة (تفاوض على الإيجار، تحسين العمالة)",
      tip2: "خفض التكاليف المتغيرة (شروط أفضل مع الموردين، تقليل الهدر)",
      tip3: "زيادة متوسط الفاتورة (البيع الإضافي، هندسة القائمة)",
      tip4: "تحسين هامش المساهمة = طريق أسرع للربحية",
    },
    cta: { intro: "هل تريد تحديد فرص التحسين عبر مواقعك؟", button: "شاهد كيف تساعد Sundae" },
    errors: {
      invalidInputs: "يرجى إدخال أرقام صحيحة (يجب أن يكون متوسط السعر أعلى من التكلفة المتغيرة)",
      negativeMargin: "يجب أن يكون هامش المساهمة موجباً. ارفع السعر أو خفّض التكاليف المتغيرة.",
    },
  },
  fr: {
    back: "Retour aux outils",
    hero: { badge: "Intelligence financière", title: "Calculateur du seuil de rentabilité", description: "Calculez combien de couverts sont nécessaires pour atteindre le point mort selon les coûts fixes et variables." },
    form: {
      title: "Entrez vos coûts",
      description: "Saisissez vos coûts fixes, votre coût variable par couvert et votre prix de vente moyen.",
      fixedLabel: "Coûts fixes par période",
      fixedHint: "Loyer, salaires, assurance, etc. (total mensuel ou période)",
      variableLabel: "Coût variable par couvert",
      variableHint: "Coût nourriture, emballage, frais carte bancaire par client",
      priceLabel: "Prix de vente moyen par couvert",
      priceHint: "Panier moyen par client",
      buttonIdle: "Calculer le point mort",
      buttonBusy: "Calcul en cours...",
    },
    results: {
      title: "Couverts nécessaires au point mort",
      coversLabel: "couverts par période",
      coversSuffix: "couverts",
      analysisTitle: "Analyse",
      marginLabel: "Marge de contribution",
      perCover: "par couvert",
      toProfit: "Vers le profit",
      tipsTitle: "Conseils pour améliorer le point mort :",
      tip1: "Réduisez les coûts fixes (négociez le loyer, optimisez la main-d'œuvre)",
      tip2: "Réduisez les coûts variables (meilleures conditions fournisseurs, moins de gaspillage)",
      tip3: "Augmentez le panier moyen (upsell, menu engineering)",
      tip4: "Améliorer la marge de contribution = chemin plus rapide vers la rentabilité",
    },
    cta: { intro: "Vous voulez identifier des opportunités d'amélioration sur vos sites ?", button: "Voir comment Sundae peut aider" },
    errors: {
      invalidInputs: "Veuillez saisir des nombres valides (le prix moyen doit être supérieur au coût variable)",
      negativeMargin: "La marge de contribution doit être positive. Augmentez votre prix moyen ou réduisez les coûts variables.",
    },
  },
  es: {
    back: "Volver a herramientas",
    hero: { badge: "Inteligencia financiera", title: "Calculadora de punto de equilibrio", description: "Calcula cuántos cubiertos necesitas para llegar al punto de equilibrio según costos fijos y variables." },
    form: {
      title: "Ingresa tus costos",
      description: "Introduce tus costos fijos, el costo variable por cubierto y el precio promedio de venta.",
      fixedLabel: "Costos fijos por período",
      fixedHint: "Alquiler, salarios, seguros, etc. (total mensual o por período)",
      variableLabel: "Costo variable por cubierto",
      variableHint: "Costo de alimentos, empaque, tarifas de tarjeta por cliente",
      priceLabel: "Precio promedio de venta por cubierto",
      priceHint: "Ticket promedio por cliente",
      buttonIdle: "Calcular punto de equilibrio",
      buttonBusy: "Calculando...",
    },
    results: {
      title: "Cubiertos requeridos para equilibrio",
      coversLabel: "cubiertos por período",
      coversSuffix: "cubiertos",
      analysisTitle: "Análisis",
      marginLabel: "Margen de contribución",
      perCover: "por cubierto",
      toProfit: "Para ganar",
      tipsTitle: "Consejos para mejorar el equilibrio:",
      tip1: "Reduce los costos fijos (negocia alquiler, optimiza la mano de obra)",
      tip2: "Reduce los costos variables (mejores condiciones con proveedores, menos desperdicio)",
      tip3: "Aumenta el ticket promedio (upselling, ingeniería de menú)",
      tip4: "Mejorar el margen de contribución = camino más rápido a la rentabilidad",
    },
    cta: { intro: "¿Quieres identificar oportunidades de mejora en todas tus ubicaciones?", button: "Ver cómo Sundae puede ayudar" },
    errors: {
      invalidInputs: "Ingresa números válidos (el precio promedio debe ser mayor que el costo variable)",
      negativeMargin: "El margen de contribución debe ser positivo. Aumenta el precio promedio o reduce los costos variables.",
    },
  },
};

export default function BreakEvenCalculator() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [result, setResult] = useState<{ breakEvenCovers: number; contributionMargin: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = () => {
    setIsCalculating(true);
    const fixed = parseFloat(fixedCosts);
    const variable = parseFloat(variableCost);
    const price = parseFloat(avgPrice);

    if (isNaN(fixed) || isNaN(variable) || isNaN(price) || fixed < 0 || variable < 0 || price <= 0 || variable >= price) {
      alert(copy.errors.invalidInputs);
      setIsCalculating(false);
      return;
    }

    const contributionMargin = price - variable;
    if (contributionMargin <= 0) {
      alert(copy.errors.negativeMargin);
      setIsCalculating(false);
      return;
    }

    const breakEvenCovers = Math.ceil(fixed / contributionMargin);

    setTimeout(() => {
      setResult({ breakEvenCovers, contributionMargin });
      setIsCalculating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/tools" className="inline-block mb-8">
          <Button variant="ghost" size="sm">← {copy.back}</Button>
        </Link>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <SundaeIcon name="balance" size="xl" className="text-white" />
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
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.fixedLabel}</label>
              <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} placeholder="e.g., 50000" className="w-full px-4 py-3 rounded-lg border border-white/[0.1] bg-[var(--navy-deep)] text-[var(--text-primary)] focus:ring-2 focus:ring-slate-400 focus:border-transparent" min="0" step="0.01" />
              <p className="text-xs text-[var(--text-muted)] mt-1">{copy.form.fixedHint}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.variableLabel}</label>
              <input type="number" value={variableCost} onChange={(e) => setVariableCost(e.target.value)} placeholder="e.g., 12.50" className="w-full px-4 py-3 rounded-lg border border-white/[0.1] bg-[var(--navy-deep)] text-[var(--text-primary)] focus:ring-2 focus:ring-slate-400 focus:border-transparent" min="0" step="0.01" />
              <p className="text-xs text-[var(--text-muted)] mt-1">{copy.form.variableHint}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.priceLabel}</label>
              <input type="number" value={avgPrice} onChange={(e) => setAvgPrice(e.target.value)} placeholder="e.g., 32.00" className="w-full px-4 py-3 rounded-lg border border-white/[0.1] bg-[var(--navy-deep)] text-[var(--text-primary)] focus:ring-2 focus:ring-slate-400 focus:border-transparent" min="0" step="0.01" />
              <p className="text-xs text-[var(--text-muted)] mt-1">{copy.form.priceHint}</p>
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
                <div className="text-6xl font-bold text-[var(--text-primary)] mb-4">{result.breakEvenCovers.toLocaleString()}</div>
                <p className="text-[var(--text-supporting)] text-lg">{copy.results.coversLabel}</p>
              </div>

              <div className="p-6 rounded-xl bg-[var(--navy-deep)] shadow-md mb-6">
                <h4 className="font-bold text-lg mb-3 text-[var(--text-primary)]">{copy.results.analysisTitle}</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  You need at least <strong>{result.breakEvenCovers.toLocaleString()} {copy.results.coversSuffix}</strong> in this period to cover all costs before profit.
                </p>
                <p className="text-[var(--text-supporting)] text-sm">
                  {copy.results.marginLabel} <strong>${result.contributionMargin.toFixed(2)}</strong> {copy.results.perCover}.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[rgba(28,71,255,0.1)] rounded-lg">
                  <h5 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{copy.results.marginLabel}</h5>
                  <div className="text-2xl font-bold text-[#60A5FA]">${result.contributionMargin.toFixed(2)}</div>
                  <p className="text-xs text-[var(--text-supporting)] mt-1">{copy.results.perCover}</p>
                </div>

                <div className="p-4 bg-green-500/10 rounded-lg">
                  <h5 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{copy.results.toProfit}</h5>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Every cover beyond {result.breakEvenCovers.toLocaleString()} contributes ${result.contributionMargin.toFixed(2)} to profit
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--surface-subtle)] rounded-lg">
                <h5 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{copy.results.tipsTitle}</h5>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• {copy.results.tip1}</li>
                  <li>• {copy.results.tip2}</li>
                  <li>• {copy.results.tip3}</li>
                  <li>• {copy.results.tip4}</li>
                </ul>
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
