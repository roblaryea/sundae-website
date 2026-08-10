'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { MockupFrame, MockupKPI, MockupBarChart, MockupTable, MockupAlert } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { galleryHeading } from "@/components/home/sections/galleryHeadingsCopy";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_benchmarking_page'
import { CreamBreak } from "@/components/ui/CreamBreak";
import { benchmarkingCreamCopy } from "./benchmarkingCreamCopy";
import { CoreMobileShowcase } from '@/components/core/CoreMobileShowcase';
import { CoreBenchmarkMobile } from '@/components/core/CoreBenchmarkMobile';

const localizedBenchmarkCopy = {
  en: {
    badge: "Competitive Intelligence",
    title: "Stop Guessing. Start Knowing.",
    description: "Compare your numbers against anonymized peer data, including RevPASH Index, seat occupancy, average check, and revenue indexes, with context that shows where you stand.",
    heroPrimary: "See Benchmarks In A Demo",
    heroSecondary: "Book a Demo",
    howTitle: "How Sundae Benchmarks Work",
    howDescription: "Upload your data. Get instant comparisons against restaurants like yours.",
    metricsTitle: "What You Can Benchmark",
    metricsDescription: "30+ metrics across performance, efficiency, and market position.",
    forecastTitle: "Revenue Forecasting",
    forecastDescription: "Revenue forecasting using your trends and market data to project future performance.",
    tiersTitle: "Included In Every Core Package",
    tiersDescription: "Peer benchmarking is not an add-on. It ships with the package, from your first location.",
    ctaTitle: "See Where You Stand",
    ctaDescription: "Connect your data and get your first benchmark in minutes.",
    startFree: "See Your Benchmark",
    metrics: [
      { name: "RevPASH Index", description: "Revenue Per Available Seat Hour - the gold standard for restaurant space efficiency.", icon: "chart" },
      { name: "Seat Occupancy", description: "How effectively you fill your seats compared to similar restaurants in your market.", icon: "restaurant" },
      { name: "Average Check Size", description: "Per-guest spend compared to your competitive set, with trend analysis over time.", icon: "finance" },
      { name: "Revenue Indexes", description: "Multi-dimensional revenue comparison across locations, dayparts, and time periods.", icon: "growth" },
      { name: "Compset Comparisons", description: "Anonymized peer benchmarks from restaurants of similar size, cuisine, and market.", icon: "multiLocation" },
      { name: "Priority Insights", description: "Auto-generated analysis highlighting where you outperform and where to improve.", icon: "intelligence" },
    ],
    steps: [
      { step: "1", title: "Upload Your Data", description: "CSV, PDF, Excel, or connect your POS directly. Normalized automatically." },
      { step: "2", title: "Match Your Compset", description: "Matched against anonymized peers by cuisine, size, market, and service model." },
      { step: "3", title: "Get Insights", description: "See where you outperform, where you lag, and what to do about it." },
    ],
    forecastFeatures: ["14-30 day revenue projections", "Seasonal pattern recognition", "Market-adjusted forecasts", "Confidence intervals"],
    tiers: [
      { label: "COVERAGE", title: "30+ metrics", description: "Performance, efficiency and market position, all normalized for fair comparison." },
      { label: "COHORT", title: "Anonymized peers", description: "Matched by cuisine, size, market and service model. Never identifiable." },
      { label: "HISTORY", title: "Multi-year retention", description: "Connected history stays with you, so trends have something to sit on." },
    ],
  },
  ar: {
    badge: "الذكاء التنافسي",
    title: "توقف عن التخمين. وابدأ بالمعرفة.",
    description: "قارن نفسك ببيانات نظراء مجهولة - RevPASH ومعدل إشغال المقاعد ومتوسط الفاتورة ومؤشرات الإيرادات - مع رؤى توضّح موقعك بدقة.",
    heroPrimary: "جرّب المقارنات مجانًا",
    heroSecondary: "احجز عرضًا",
    howTitle: "كيف تعمل مقارنات Sundae",
    howDescription: "ارفع بياناتك. واحصل على مقارنة فورية مع مطاعم مثل مطعمك.",
    metricsTitle: "ما الذي يمكنك مقارنته",
    metricsDescription: "أكثر من 30 مقياسًا عبر الأداء والكفاءة والموقع السوقي.",
    forecastTitle: "توقع الإيرادات",
    forecastDescription: "توقع الإيرادات باستخدام اتجاهاتك وبيانات السوق لتقدير الأداء المستقبلي.",
    tiersTitle: "مضمّنة في كل باقة Core",
    tiersDescription: "المقارنة المرجعية ليست إضافة. تأتي مع الباقة من موقعك الأول.",
    ctaTitle: "اعرف موقعك",
    ctaDescription: "ارفع بياناتك واحصل على أول مقارنة خلال دقائق. مجاني، ولا حاجة لبطاقة ائتمان.",
    startFree: "ابدأ المقارنة مجانًا",
    metrics: [
      { name: "مؤشر RevPASH", description: "الإيراد لكل ساعة مقعد متاح - المعيار الذهبي لكفاءة المساحة في المطاعم.", icon: "chart" },
      { name: "إشغال المقاعد", description: "مدى فعالية ملء المقاعد مقارنة بمطاعم مشابهة في السوق.", icon: "restaurant" },
      { name: "متوسط حجم الفاتورة", description: "الإنفاق لكل ضيف مقارنة بمجموعتك التنافسية مع تحليل الاتجاهات عبر الزمن.", icon: "finance" },
      { name: "مؤشرات الإيرادات", description: "مقارنة متعددة الأبعاد للإيرادات عبر المواقع وفترات اليوم والفترات الزمنية.", icon: "growth" },
      { name: "مقارنات المجموعات المماثلة", description: "مقاييس نظراء مجهولة لمطاعم ذات حجم ومطبخ وسوق مشابه.", icon: "multiLocation" },
      { name: "رؤى أولوية", description: "تحليل تلقائي يوضح أين تتفوق وأين تحتاج للتحسن.", icon: "intelligence" },
    ],
    steps: [
      { step: "1", title: "ارفع بياناتك", description: "CSV أو PDF أو Excel أو اربط POS مباشرة. يتم التوحيد تلقائيًا." },
      { step: "2", title: "طابق مجموعتك", description: "مطابقة مع نظراء مجهولين حسب المطبخ والحجم والسوق ونموذج الخدمة." },
      { step: "3", title: "احصل على الرؤى", description: "شاهد أين تتفوق، وأين تتأخر، وما الذي يجب فعله." },
    ],
    forecastFeatures: ["توقعات 14-30 يومًا", "التعرف على الأنماط الموسمية", "توقعات معدلة حسب السوق", "نطاقات ثقة"],
    tiers: [
      { label: "التغطية", title: "أكثر من 30 مقياسًا", description: "الأداء والكفاءة وموقعك في السوق، موحّدة لمقارنة عادلة." },
      { label: "الأقران", title: "أقران مجهولون", description: "مطابقون حسب المطبخ والحجم والسوق ونموذج الخدمة، وبلا هوية." },
      { label: "التاريخ", title: "احتفاظ لعدة سنوات", description: "تاريخك المتصل يبقى معك، فتستند الاتجاهات إلى شيء حقيقي." },
    ],
  },
  fr: {
    badge: "Intelligence concurrentielle",
    title: "Arrêtez de deviner. Commencez à savoir.",
    description: "Comparez-vous à des données de pairs anonymes - RevPASH Index, taux d'occupation, ticket moyen et index de revenus - avec des insights qui montrent exactement votre position.",
    heroPrimary: "Essayer les benchmarks gratuits",
    heroSecondary: "Reserver une demo",
    howTitle: "Comment fonctionnent les benchmarks Sundae",
    howDescription: "Importez vos données. Obtenez immédiatement des comparaisons avec des restaurants similaires.",
    metricsTitle: "Ce que vous pouvez benchmarker",
    metricsDescription: "Plus de 30 métriques couvrant la performance, l'efficacité et la position marché.",
    forecastTitle: "Prévision de revenus",
    forecastDescription: "Des prévisions basées sur vos tendances et vos données marché pour projeter les performances futures.",
    tiersTitle: "Inclus dans chaque offre Core",
    tiersDescription: "Le benchmarking n'est pas une option. Il est livre avec l'offre, des votre premier site.",
    ctaTitle: "Voyez où vous vous situez",
    ctaDescription: "Importez vos données et obtenez votre premier benchmark en quelques minutes. Gratuit, sans carte bancaire.",
    startFree: "Lancer le benchmark gratuit",
    metrics: [
      { name: "RevPASH Index", description: "Revenue Per Available Seat Hour - la référence pour l'efficacité des espaces restaurant.", icon: "chart" },
      { name: "Occupation des sièges", description: "Efficacité du remplissage des places comparée à des restaurants similaires.", icon: "restaurant" },
      { name: "Ticket moyen", description: "Dépense par client comparée à votre ensemble concurrentiel, avec analyse de tendance.", icon: "finance" },
      { name: "Index de revenus", description: "Comparaison multidimensionnelle des revenus par site, tranche horaire et période.", icon: "growth" },
      { name: "Comparaisons de groupe", description: "Benchmarks anonymes de pairs pour des restaurants de taille, cuisine et marché similaires.", icon: "multiLocation" },
      { name: "Insights prioritaires", description: "Analyse générée automatiquement mettant en évidence vos forces et axes d'amélioration.", icon: "intelligence" },
    ],
    steps: [
      { step: "1", title: "Importez vos données", description: "CSV, PDF, Excel ou connexion directe au POS. Normalisation automatique." },
      { step: "2", title: "Associez votre groupe", description: "Comparaison avec des pairs anonymes selon la cuisine, la taille, le marché et le modèle de service." },
      { step: "3", title: "Obtenez les insights", description: "Voyez où vous surperforme, où vous êtes en retrait, et quoi faire." },
    ],
    forecastFeatures: ["Prévisions 14-30 jours", "Reconnaissance des saisons", "Prévisions ajustées au marché", "Intervalles de confiance"],
    tiers: [
      { label: "COUVERTURE", title: "30+ métriques", description: "Performance, efficacité et position marché, normalisées pour comparer a perimetre egal." },
      { label: "COHORTE", title: "Pairs anonymisés", description: "Apparies par cuisine, taille, marché et modèle de service. Jamais identifiables." },
      { label: "HISTORIQUE", title: "Rétention pluriannuelle", description: "Votre historique connecté reste avec vous, pour que les tendances aient une base." },
    ],
  },
  es: {
    badge: "Inteligencia competitiva",
    title: "Deja de adivinar. Empieza a saber.",
    description: "Compárate con datos anónimos de pares - RevPASH, ocupación, ticket medio e índices de ingresos - con insights que te dicen exactamente dónde estás.",
    heroPrimary: "Probar benchmarks gratis",
    heroSecondary: "Reservar una demo",
    howTitle: "Cómo funcionan los benchmarks de Sundae",
    howDescription: "Sube tus datos. Obtén comparaciones instantáneas con restaurantes como el tuyo.",
    metricsTitle: "Qué puedes comparar",
    metricsDescription: "Más de 30 métricas de rendimiento, eficiencia y posición de mercado.",
    forecastTitle: "Pronóstico de ingresos",
    forecastDescription: "Pronósticos con tus tendencias y datos de mercado para proyectar el futuro.",
    tiersTitle: "Incluido en cada paquete Core",
    tiersDescription: "El benchmarking no es un complemento. Viene con el paquete desde tu primer local.",
    ctaTitle: "Mira dónde estás",
    ctaDescription: "Sube tus datos y obtén tu primer benchmark en minutos. Gratis y sin tarjeta.",
    startFree: "Empezar benchmark gratis",
    metrics: [
      { name: "Índice RevPASH", description: "Revenue Per Available Seat Hour - el estándar de oro para la eficiencia del espacio.", icon: "chart" },
      { name: "Ocupación de asientos", description: "Qué tan bien llenas tus plazas frente a restaurantes similares de tu mercado.", icon: "restaurant" },
      { name: "Ticket medio", description: "Gasto por comensal comparado con tu grupo competitivo, con análisis de tendencia.", icon: "finance" },
      { name: "Índices de ingresos", description: "Comparación multidimensional de ingresos por ubicaciones, franjas y periodos.", icon: "growth" },
      { name: "Comparación con pares", description: "Benchmarks anónimos de restaurantes de tamaño, cocina y mercado similares.", icon: "multiLocation" },
      { name: "Insights prioritarios", description: "Análisis autogenerado que muestra dónde destacas y dónde mejorar.", icon: "intelligence" },
    ],
    steps: [
      { step: "1", title: "Sube tus datos", description: "CSV, PDF, Excel o conecta tu POS directamente. Normalizado automáticamente." },
      { step: "2", title: "Empareja tu grupo", description: "Comparado con pares anónimos por cocina, tamaño, mercado y modelo de servicio." },
      { step: "3", title: "Obtén insights", description: "Ve dónde superas, dónde vas por detrás y qué hacer." },
    ],
    forecastFeatures: ["Proyecciones de 14-30 días", "Reconocimiento de patrones estacionales", "Pronósticos ajustados al mercado", "Intervalos de confianza"],
    tiers: [
      { label: "COBERTURA", title: "30+ métricas", description: "Rendimiento, eficiencia y posición de mercado, normalizadas para comparar con el mismo criterio." },
      { label: "COHORTE", title: "Pares anonimizados", description: "Emparejados por cocina, tamano, mercado y modelo de servicio. Nunca identificables." },
      { label: "HISTORICO", title: "Retención multianual", description: "Tu histórico conectado se queda contigo, para que las tendencias tengan base." },
    ],
  },
} as const;

export default function BenchmarkingPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = localizedBenchmarkCopy[locale as keyof typeof localizedBenchmarkCopy] ?? getGeneratedLocalCopy(localizedBenchmarkCopy, generatedLocalCopy.localizedBenchmarkCopy, locale) ?? localizedBenchmarkCopy.en;
  const cream = benchmarkingCreamCopy[locale as keyof typeof benchmarkingCreamCopy] ?? benchmarkingCreamCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.badge} title={ui.title} description={ui.description}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" size="lg" href={REPORT_APP_URL} onClick={() => cta(REPORT_APP_URL, "try_benchmarks_hero", { page: "/benchmarking" })}>
            {ui.heroPrimary}
          </Button>
          <Button variant="outline-light" size="lg" onClick={() => cta("/demo", "book_demo_benchmarks", { page: "/benchmarking" })}>
            {ui.heroSecondary}
          </Button>
        </div>
      </PageHero>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.howTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.howDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ui.steps.map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF5C4D] to-[#E9A24A] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Cream relief - early warm break BEFORE the long dark metrics/forecast/tiers stretch (the volume system) */}
      <CreamBreak eyebrow={cream.eyebrow} statement={cream.statement} lede={cream.lede} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.metricsTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)]">{ui.metricsDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ui.metrics.map((metric) => (
              <StaggerItem key={metric.name}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF5C4D] to-[#E9A24A] rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={metric.icon as SundaeIconName} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{metric.name}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{metric.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.forecastTitle}</h2>
              <p className="body-lg text-[var(--text-supporting)] mb-6">{ui.forecastDescription}</p>
              <ul className="space-y-3">
                {ui.forecastFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-green-500">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.2}>
              <MockupFrame label="Benchmarks - Revenue Forecast" glow>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <MockupKPI label="Projected Rev" value="$142K" trend="+8%" trendUp />
                    <MockupKPI label="Confidence" value="87%" trend="High" />
                    <MockupKPI label="vs Compset" value="+12%" trend="Above" trendUp />
                  </div>
                  <MockupBarChart data={[{ label: "Wk 1", value: 72, color: "bg-[#FF5C4D]" }, { label: "Wk 2", value: 78, color: "bg-[#FF5C4D]" }, { label: "Wk 3", value: 65, color: "bg-[#FF8473]/60" }, { label: "Wk 4", value: 82, color: "bg-[#FF8473]/60" }]} />
                  <MockupTable headers={["Period", "Forecast", "Actual", "Variance"]} rows={[["This Week", "$34.2K", "$35.1K", "+2.6%"], ["Next Week", "$36.8K", "-", "-"], ["Wk 3", "$31.4K", "-", "-"]]} />
                  <MockupAlert type="coach">Revenue trending 8% above compset average. Weekend dinner is your strongest daypart - consider extending Friday hours.</MockupAlert>
                </div>
              </MockupFrame>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.tiersTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] mb-12">{ui.tiersDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.tiers.map((tier, index) => (
              <StaggerItem key={tier.title}>
                <div className={`bg-[var(--navy-deep)] rounded-xl p-6 border ${index === 1 ? "border-2 border-[#FF5C4D] shadow-md" : "border-[var(--border-default)]"}`}>
                  <div className={`text-sm font-semibold mb-2 ${index === 0 ? "text-green-500" : index === 1 ? "text-[#FF8473]" : "text-purple-400"}`}>{tier.label}</div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{tier.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{tier.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CoreMobileShowcase screens={[<CoreBenchmarkMobile key="bench" />]} />

      {/* Product gallery - Benchmarking surfaces in detail */}
      <SectionProductGallery
        productFilter="/benchmarking"
        hideFilter
        headingOverride={galleryHeading("benchmarking", locale)}
      />

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Button variant="cta" size="lg" onClick={() => cta(REPORT_APP_URL, "start_free_benchmarks_cta", { page: "/benchmarking" })}>
          {ui.startFree}
        </Button>
        <Button variant="outline-ink" size="lg" onClick={() => cta("/demo", "book_demo_benchmarks_cta", { page: "/benchmarking" })}>
          {ui.heroSecondary}
        </Button>
      </PageCTA>
    </div>
  );
}
