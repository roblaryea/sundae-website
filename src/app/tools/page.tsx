"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type ToolCard = {
  title: string;
  description: string;
  icon: SundaeIconName;
  href: string;
  features: string[];
  button: string;
};

type ToolsPageCopy = {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  tools: ToolCard[];
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

const localizedCopy: Record<WebsiteLocale, ToolsPageCopy> = {
  en: {
    hero: {
      badge: "Free Tools",
      title: "Restaurant Calculators & Assessments",
      description: "Quick, free tools to analyze your restaurant's performance. No sign-up required.",
    },
    tools: [
      {
        title: "Labor Cost % Calculator",
        description: "Calculate your labor cost percentage and see if you're on target compared to industry standards.",
        icon: "labor",
        href: "/tools/labor-cost",
        features: ["Labor cost %", "Target benchmarks", "Instant analysis"],
        button: "Open Tool",
      },
      {
        title: "Labor Variance Analyzer",
        description: "Compare actual labor costs against targets and get actionable insights on variance.",
        icon: "labor",
        href: "/tools/labor-analyzer",
        features: ["Variance analysis", "Target comparison", "Recommendations"],
        button: "Open Tool",
      },
      {
        title: "Menu Item Margin Calculator",
        description: "Analyze menu item profitability with margin calculations and pricing recommendations.",
        icon: "menu",
        href: "/tools/menu-margin",
        features: ["Gross profit", "Margin %", "Price optimization"],
        button: "Open Tool",
      },
      {
        title: "Break-Even Covers Calculator",
        description: "Calculate how many covers you need to break even based on fixed and variable costs.",
        icon: "balance",
        href: "/tools/breakeven-covers",
        features: ["Break-even point", "Contribution margin", "Profitability insights"],
        button: "Open Tool",
      },
      {
        title: "Benchmark Readiness Assessment",
        description: "Evaluate your organization's readiness for benchmarking and performance tracking.",
        icon: "document",
        href: "/tools/benchmark-readiness",
        features: ["Readiness score", "Gap analysis", "Action plan"],
        button: "Open Tool",
      },
      {
        title: "Multi-Location Uplift Estimator",
        description: "Calculate potential revenue impact of operational improvements across multiple locations.",
        icon: "performance",
        href: "/tools/multi-location-uplift",
        features: ["Revenue projection", "Per-location impact", "Timeline estimate"],
        button: "Open Tool",
      },
    ],
    cta: {
      title: "Ready for Deeper Insights?",
      description: "These calculators are just the start. See what Sundae can do with your full data.",
      primary: "Book a Demo",
      secondary: "Explore Products",
    },
  },
  ar: {
    hero: {
      badge: "أدوات مجانية",
      title: "حاسبات وتقييمات المطاعم",
      description: "أدوات سريعة ومجانية لتحليل أداء مطعمك. لا حاجة للتسجيل.",
    },
    tools: [
      { title: "حاسبة % تكلفة العمالة", description: "احسب نسبة تكلفة العمالة وتحقق مما إذا كنت ضمن الهدف مقارنة بالمعايير.", icon: "labor", href: "/tools/labor-cost", features: ["نسبة تكلفة العمالة", "معايير مستهدفة", "تحليل فوري"], button: "فتح الأداة" },
      { title: "محلل تباين العمالة", description: "قارن تكاليف العمالة الفعلية بالأهداف واحصل على رؤى عملية حول التباين.", icon: "labor", href: "/tools/labor-analyzer", features: ["تحليل التباين", "مقارنة الهدف", "توصيات"], button: "فتح الأداة" },
      { title: "حاسبة هامش صنف القائمة", description: "حلّل ربحية أصناف القائمة عبر حسابات الهامش وتوصيات التسعير.", icon: "menu", href: "/tools/menu-margin", features: ["الربح الإجمالي", "نسبة الهامش", "تحسين السعر"], button: "فتح الأداة" },
      { title: "حاسبة نقطة التعادل", description: "احسب عدد الوجبات/الضيوف اللازمة للوصول إلى نقطة التعادل.", icon: "balance", href: "/tools/breakeven-covers", features: ["نقطة التعادل", "هامش المساهمة", "رؤى الربحية"], button: "فتح الأداة" },
      { title: "تقييم جاهزية المعيارية", description: "قيّم جاهزية مؤسستك للمعيارية وتتبع الأداء.", icon: "document", href: "/tools/benchmark-readiness", features: ["درجة الجاهزية", "تحليل الفجوات", "خطة عمل"], button: "فتح الأداة" },
      { title: "مقدر الارتفاع متعدد المواقع", description: "احسب الأثر المحتمل لتحسينات التشغيل عبر عدة مواقع.", icon: "performance", href: "/tools/multi-location-uplift", features: ["توقع الإيرادات", "الأثر لكل موقع", "تقدير الجدول الزمني"], button: "فتح الأداة" },
    ],
    cta: {
      title: "هل تريد رؤى أعمق؟",
      description: "هذه الحاسبات مجرد بداية. شاهد ما يمكن أن تفعله Sundae ببياناتك الكاملة.",
      primary: "احجز عرضاً",
      secondary: "استكشف المنتجات",
    },
  },
  fr: {
    hero: {
      badge: "Outils gratuits",
      title: "Calculatrices et évaluations pour restaurants",
      description: "Des outils rapides et gratuits pour analyser les performances de votre restaurant. Aucune inscription requise.",
    },
    tools: [
      { title: "Calculateur du % de coût de main-d'œuvre", description: "Calculez votre pourcentage de coût de main-d'œuvre et comparez-le aux standards du secteur.", icon: "labor", href: "/tools/labor-cost", features: ["% coût main-d'œuvre", "Benchmarks cibles", "Analyse instantanée"], button: "Ouvrir l'outil" },
      { title: "Analyseur d'écart de main-d'œuvre", description: "Comparez les coûts de main-d'œuvre réels aux objectifs et obtenez des insights exploitables.", icon: "labor", href: "/tools/labor-analyzer", features: ["Analyse d'écart", "Comparaison aux objectifs", "Recommandations"], button: "Ouvrir l'outil" },
      { title: "Calculateur de marge par plat", description: "Analysez la rentabilité des plats avec les calculs de marge et des recommandations de prix.", icon: "menu", href: "/tools/menu-margin", features: ["Marge brute", "% de marge", "Optimisation prix"], button: "Ouvrir l'outil" },
      { title: "Calculateur du seuil de rentabilité", description: "Calculez combien de couverts sont nécessaires pour atteindre le point mort.", icon: "balance", href: "/tools/breakeven-covers", features: ["Point mort", "Marge de contribution", "Insights rentabilité"], button: "Ouvrir l'outil" },
      { title: "Évaluation de préparation au benchmark", description: "Évaluez la préparation de votre organisation au benchmarking et au suivi de performance.", icon: "document", href: "/tools/benchmark-readiness", features: ["Score de préparation", "Analyse des écarts", "Plan d'action"], button: "Ouvrir l'outil" },
      { title: "Estimateur de gain multi-sites", description: "Calculez l'impact potentiel des améliorations opérationnelles sur plusieurs sites.", icon: "performance", href: "/tools/multi-location-uplift", features: ["Projection de revenus", "Impact par site", "Estimation du délai"], button: "Ouvrir l'outil" },
    ],
    cta: {
      title: "Prêt pour des insights plus profonds ?",
      description: "Ces calculatrices ne sont qu'un début. Voyez ce que Sundae peut faire avec l'ensemble de vos données.",
      primary: "Réserver une démo",
      secondary: "Explorer les produits",
    },
  },
  es: {
    hero: {
      badge: "Herramientas gratuitas",
      title: "Calculadoras y evaluaciones para restaurantes",
      description: "Herramientas rápidas y gratuitas para analizar el rendimiento de tu restaurante. No necesitas registrarte.",
    },
    tools: [
      { title: "Calculadora de % de costo laboral", description: "Calcula tu porcentaje de costo laboral y compáralo con los estándares del sector.", icon: "labor", href: "/tools/labor-cost", features: ["% costo laboral", "Benchmarks objetivo", "Análisis instantáneo"], button: "Abrir herramienta" },
      { title: "Analizador de variación laboral", description: "Compara los costos laborales reales contra los objetivos y obtén insights accionables.", icon: "labor", href: "/tools/labor-analyzer", features: ["Análisis de variación", "Comparación con objetivo", "Recomendaciones"], button: "Abrir herramienta" },
      { title: "Calculadora de margen por plato", description: "Analiza la rentabilidad de los platos con cálculos de margen y recomendaciones de precio.", icon: "menu", href: "/tools/menu-margin", features: ["Beneficio bruto", "% de margen", "Optimización de precio"], button: "Abrir herramienta" },
      { title: "Calculadora de punto de equilibrio", description: "Calcula cuántos cubiertos necesitas para llegar al punto de equilibrio.", icon: "balance", href: "/tools/breakeven-covers", features: ["Punto de equilibrio", "Margen de contribución", "Insights de rentabilidad"], button: "Abrir herramienta" },
      { title: "Evaluación de preparación para benchmarking", description: "Evalúa la preparación de tu organización para benchmarking y seguimiento de desempeño.", icon: "document", href: "/tools/benchmark-readiness", features: ["Puntaje de preparación", "Análisis de brechas", "Plan de acción"], button: "Abrir herramienta" },
      { title: "Estimador de uplift multiubicación", description: "Calcula el impacto potencial de mejoras operativas en varias ubicaciones.", icon: "performance", href: "/tools/multi-location-uplift", features: ["Proyección de ingresos", "Impacto por ubicación", "Estimación de plazo"], button: "Abrir herramienta" },
    ],
    cta: {
      title: "¿Listo para insights más profundos?",
      description: "Estas calculadoras son solo el comienzo. Mira lo que Sundae puede hacer con tus datos completos.",
      primary: "Reservar demo",
      secondary: "Explorar productos",
    },
  },
};

export default function ToolsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.hero.badge} title={copy.hero.title} description={copy.hero.description} />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.tools.map((tool) => (
              <StaggerItem key={tool.title}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <SundaeIcon name={tool.icon} size="xl" className="text-white" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--text-primary)] mb-3">{tool.title}</CardTitle>
                    <CardDescription className="text-[var(--text-supporting)] leading-relaxed mb-4">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
                          <span className="text-green-500">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={tool.href}>
                      <Button variant="primary" size="lg" className="w-full">
                        {tool.button}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={copy.cta.title} description={copy.cta.description}>
        <Button variant="cta" size="lg" href="/demo">
          {copy.cta.primary}
        </Button>
        <Button variant="outline-light" size="lg" href="/product">
          {copy.cta.secondary}
        </Button>
      </PageCTA>
    </div>
  );
}
