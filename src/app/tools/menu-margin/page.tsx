"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type MenuMarginCopy = {
  back: string;
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  form: {
    title: string;
    description: string;
    sellingLabel: string;
    sellingHint: string;
    ingredientLabel: string;
    ingredientHint: string;
    buttonIdle: string;
    buttonBusy: string;
  };
  results: {
    grossTitle: string;
    marginTitle: string;
    analysis: string;
    benchTitle: string;
    low: string;
    healthy: string;
    strong: string;
    bulletLow: string;
    bulletHealthy: string;
    bulletStrong: string;
  };
  cta: { intro: string; button: string };
  errors: { invalidNumbers: string };
};

const localizedCopy: Record<WebsiteLocale, MenuMarginCopy> = {
  en: {
    back: "Back to Tools",
    hero: {
      badge: "Menu Intelligence",
      title: "Menu Item Margin Calculator",
      description: "Analyze menu item profitability with margin calculations and pricing recommendations.",
    },
    form: {
      title: "Enter Item Details",
      description: "Input the selling price and ingredient cost for your menu item.",
      sellingLabel: "Selling Price",
      sellingHint: "Menu price charged to customers",
      ingredientLabel: "Ingredient Cost",
      ingredientHint: "Total cost of ingredients per item",
      buttonIdle: "Calculate Margin",
      buttonBusy: "Calculating...",
    },
    results: {
      grossTitle: "Gross Profit Per Item",
      marginTitle: "Margin %",
      analysis: "Analysis",
      benchTitle: "Margin Benchmarks:",
      low: "Low margin - consider re-pricing or re-engineering this item to improve profitability.",
      healthy: "Healthy margin range - this item is profitable and competitively priced.",
      strong: "Strong margin - excellent profitability. Guard against competition and maintain quality.",
      bulletLow: "< 55%: Below target (review pricing or reduce costs)",
      bulletHealthy: "55-70%: Healthy range for most menu items",
      bulletStrong: "> 70%: Strong margin (premium positioning)",
    },
    cta: { intro: "Want more advanced menu analytics across all locations?", button: "See Sundae Platform" },
    errors: { invalidNumbers: "Please enter valid numbers (ingredient cost must be less than selling price)" },
  },
  ar: {
    back: "العودة إلى الأدوات",
    hero: {
      badge: "ذكاء القائمة",
      title: "حاسبة هامش صنف القائمة",
      description: "حلّل ربحية أصناف القائمة عبر حسابات الهامش وتوصيات التسعير.",
    },
    form: {
      title: "أدخل تفاصيل الصنف",
      description: "أدخل سعر البيع وتكلفة المكونات لصنف قائمتك.",
      sellingLabel: "سعر البيع",
      sellingHint: "السعر الذي يدفعه العميل",
      ingredientLabel: "تكلفة المكونات",
      ingredientHint: "إجمالي تكلفة المكونات لكل صنف",
      buttonIdle: "احسب الهامش",
      buttonBusy: "جارٍ الحساب...",
    },
    results: {
      grossTitle: "الربح الإجمالي لكل صنف",
      marginTitle: "نسبة الهامش",
      analysis: "التحليل",
      benchTitle: "معايير الهامش:",
      low: "هامش منخفض - فكّر في إعادة التسعير أو إعادة هندسة الصنف لتحسين الربحية.",
      healthy: "نطاق هامش صحي - هذا الصنف مربح ومُسعّر بشكل تنافسي.",
      strong: "هامش قوي - ربحية ممتازة. حافظ على الجودة واحمِ السعر من المنافسة.",
      bulletLow: "أقل من 55%: أقل من الهدف (راجع التسعير أو خفّض التكاليف)",
      bulletHealthy: "55-70%: نطاق صحي لمعظم الأصناف",
      bulletStrong: "أكثر من 70%: هامش قوي (تموضع مميز)",
    },
    cta: { intro: "هل تريد تحليلات قائمة أكثر تقدماً عبر جميع المواقع؟", button: "شاهد منصة Sundae" },
    errors: { invalidNumbers: "يرجى إدخال أرقام صحيحة (يجب أن تكون تكلفة المكونات أقل من سعر البيع)" },
  },
  fr: {
    back: "Retour aux outils",
    hero: {
      badge: "Intelligence menu",
      title: "Calculateur de marge par plat",
      description: "Analysez la rentabilité des plats avec des calculs de marge et des recommandations tarifaires.",
    },
    form: {
      title: "Entrez les détails du plat",
      description: "Saisissez le prix de vente et le coût des ingrédients pour votre plat.",
      sellingLabel: "Prix de vente",
      sellingHint: "Prix facturé au client",
      ingredientLabel: "Coût des ingrédients",
      ingredientHint: "Coût total des ingrédients par plat",
      buttonIdle: "Calculer la marge",
      buttonBusy: "Calcul en cours...",
    },
    results: {
      grossTitle: "Marge brute par plat",
      marginTitle: "Marge %",
      analysis: "Analyse",
      benchTitle: "Benchmarks de marge :",
      low: "Marge faible - envisagez de revoir le prix ou la composition de ce plat pour améliorer la rentabilité.",
      healthy: "Plage de marge saine - ce plat est rentable et bien positionné.",
      strong: "Marge forte - excellente rentabilité. Protégez-vous de la concurrence et maintenez la qualité.",
      bulletLow: "< 55 % : Sous l'objectif (revoyez le prix ou réduisez les coûts)",
      bulletHealthy: "55-70 % : Plage saine pour la plupart des plats",
      bulletStrong: "> 70 % : Marge forte (positionnement premium)",
    },
    cta: { intro: "Vous voulez des analyses menu plus avancées sur tous vos sites ?", button: "Voir la plateforme Sundae" },
    errors: { invalidNumbers: "Veuillez saisir des nombres valides (le coût des ingrédients doit être inférieur au prix de vente)" },
  },
  es: {
    back: "Volver a herramientas",
    hero: {
      badge: "Inteligencia de menú",
      title: "Calculadora de margen por plato",
      description: "Analiza la rentabilidad de los platos con cálculos de margen y recomendaciones de precio.",
    },
    form: {
      title: "Ingresa los detalles del plato",
      description: "Introduce el precio de venta y el costo de ingredientes de tu plato.",
      sellingLabel: "Precio de venta",
      sellingHint: "Precio cobrado al cliente",
      ingredientLabel: "Costo de ingredientes",
      ingredientHint: "Costo total de ingredientes por plato",
      buttonIdle: "Calcular margen",
      buttonBusy: "Calculando...",
    },
    results: {
      grossTitle: "Beneficio bruto por plato",
      marginTitle: "Margen %",
      analysis: "Análisis",
      benchTitle: "Benchmarks de margen:",
      low: "Margen bajo - considera reajustar el precio o rediseñar este plato para mejorar la rentabilidad.",
      healthy: "Rango de margen saludable - este plato es rentable y está bien posicionado.",
      strong: "Margen fuerte - excelente rentabilidad. Protégelo de la competencia y mantén la calidad.",
      bulletLow: "< 55%: Por debajo del objetivo (revisa precios o reduce costos)",
      bulletHealthy: "55-70%: Rango saludable para la mayoría de los platos",
      bulletStrong: "> 70%: Margen fuerte (posicionamiento premium)",
    },
    cta: { intro: "¿Quieres analíticas de menú más avanzadas en todas tus ubicaciones?", button: "Ver plataforma Sundae" },
    errors: { invalidNumbers: "Ingresa números válidos (el costo de ingredientes debe ser menor que el precio de venta)" },
  },
};

export default function MenuMarginCalculator() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;
  const [sellingPrice, setSellingPrice] = useState("");
  const [ingredientCost, setIngredientCost] = useState("");
  const [result, setResult] = useState<{ grossProfit: number; marginPercent: number; interpretation: string; color: string; bgColor: string } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = () => {
    setIsCalculating(true);
    const price = parseFloat(sellingPrice);
    const cost = parseFloat(ingredientCost);

    if (isNaN(price) || isNaN(cost) || price <= 0 || cost < 0 || cost > price) {
      alert(copy.errors.invalidNumbers);
      setIsCalculating(false);
      return;
    }

    const grossProfit = price - cost;
    const marginPercent = (grossProfit / price) * 100;
    let interpretation = "";
    let color = "";
    let bgColor = "";

    if (marginPercent < 55) {
      interpretation = copy.results.low;
      color = "text-red-400";
      bgColor = "bg-red-500/10";
    } else if (marginPercent <= 70) {
      interpretation = copy.results.healthy;
      color = "text-[#60A5FA]";
      bgColor = "bg-[rgba(28,71,255,0.1)]";
    } else {
      interpretation = copy.results.strong;
      color = "text-green-400";
      bgColor = "bg-green-500/10";
    }

    setTimeout(() => {
      setResult({ grossProfit, marginPercent, interpretation, color, bgColor });
      setIsCalculating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools" className="inline-block mb-8">
            <Button variant="ghost" size="sm">← {copy.back}</Button>
          </Link>

          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <SundaeIcon name="chart" size="xl" className="text-white" />
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
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.sellingLabel}</label>
                <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="e.g., 18.50" className="w-full px-4 py-3 rounded-lg border border-white/[0.1] bg-[var(--navy-deep)] text-[var(--text-primary)] focus:ring-2 focus:ring-slate-400 focus:border-transparent" min="0" step="0.01" />
                <p className="text-xs text-[var(--text-muted)] mt-1">{copy.form.sellingHint}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{copy.form.ingredientLabel}</label>
                <input type="number" value={ingredientCost} onChange={(e) => setIngredientCost(e.target.value)} placeholder="e.g., 6.20" className="w-full px-4 py-3 rounded-lg border border-white/[0.1] bg-[var(--navy-deep)] text-[var(--text-primary)] focus:ring-2 focus:ring-slate-400 focus:border-transparent" min="0" step="0.01" />
                <p className="text-xs text-[var(--text-muted)] mt-1">{copy.form.ingredientHint}</p>
              </div>

              <Button onClick={calculate} variant="primary" size="lg" className="w-full" disabled={isCalculating}>
                {isCalculating ? copy.form.buttonBusy : copy.form.buttonIdle}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card variant="elevated" className={result.bgColor}>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-6 bg-[var(--navy-deep)] rounded-xl shadow-md">
                    <h3 className="text-sm font-semibold text-[var(--text-supporting)] mb-2">{copy.results.grossTitle}</h3>
                    <div className="text-4xl font-bold text-[var(--text-primary)]">${result.grossProfit.toFixed(2)}</div>
                  </div>

                  <div className="text-center p-6 bg-[var(--navy-deep)] rounded-xl shadow-md">
                    <h3 className="text-sm font-semibold text-[var(--text-supporting)] mb-2">{copy.results.marginTitle}</h3>
                    <div className="text-4xl font-bold text-[var(--text-primary)]">{result.marginPercent.toFixed(1)}%</div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl bg-[var(--navy-deep)] shadow-md ${result.color}`}>
                  <h4 className="font-bold text-lg mb-2">{copy.results.analysis}</h4>
                  <p className="leading-relaxed">{result.interpretation}</p>
                </div>

                <div className="mt-6 p-4 bg-[var(--navy-deep)] rounded-lg">
                  <h5 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{copy.results.benchTitle}</h5>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                    <li>• {copy.results.bulletLow}</li>
                    <li>• {copy.results.bulletHealthy}</li>
                    <li>• {copy.results.bulletStrong}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="pt-4 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[var(--text-supporting)] mb-6">{copy.cta.intro}</p>
        <Link href="/demo">
          <Button variant="primary" size="lg">{copy.cta.button}</Button>
        </Link>
      </div>
    </div>
  );
}
