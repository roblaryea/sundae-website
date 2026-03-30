'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BenchmarkDashboardMockup } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL, SIGNUP_URL } from "@/lib/urls";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

const reportPageCopy = {
  en: {
    heroBadge: 'Free restaurant benchmarking',
    heroTitle: 'Sundae Report',
    heroDescription:
      "Get a free benchmarking report comparing your restaurant's performance against industry standards. See exactly where you stand and what to improve.",
    heroPrimary: 'Generate Free Report',
    heroSecondary: 'Learn About Sundae Core',
    sectionCompareTitle: 'See How You Compare',
    sectionCompareDescription: 'Benchmark your restaurant across key performance categories against similar businesses',
    howTitle: 'How It Works',
    howDescription: 'Get your free benchmarking report in minutes, not days',
    insightsTitle: "Sample Insights You'll Get",
    insightsDescription: 'Real examples of actionable insights from our benchmarking reports',
    whyTitle: 'Why Free?',
    whyDescription:
      "We believe every restaurant should understand how they're performing. Our free report gives you a taste of the decision intelligence that powers Sundae Core.",
    ctaTitle: 'Ready to See Your Benchmarks?',
    ctaDescription:
      'Join thousands of restaurant operators who use Sundae Report to understand their performance. No credit card required, no obligations - just insights.',
    finalTitle: 'Start in Under Two Minutes',
    finalDescription: "Upload your data, see your benchmark. That's it.",
    finalTiles: [
      { title: 'Start Free', description: 'Upload CSV, get instant benchmark', cta: 'Start Free →' },
      { title: 'Explore Tiers', description: 'See Plus and Pro capabilities', cta: 'Compare Tiers →' },
      { title: 'Book a Demo', description: 'See Report with your data', cta: 'Book Demo →' },
    ],
    categories: [
      'Sales Performance',
      'Labor Efficiency',
      'Food Cost Management',
      'Operational Metrics',
    ],
    categoryMetrics: [
      ['Revenue per Square Foot', 'Average Check Size', 'Daily Transaction Count', 'Peak Hour Analysis'],
      ['Labor Cost %', 'Sales per Labor Hour', 'Staff Productivity', 'Overtime Trends'],
      ['Food Cost %', 'Waste Percentage', 'Inventory Turnover', 'COGS Analysis'],
      ['Table Turn Time', 'Order Accuracy', 'Customer Satisfaction', 'Speed of Service'],
    ],
    how: [
      {
        title: 'Upload Your Data',
        description: 'Securely connect your POS system or upload sales, labor, and cost data.',
      },
      {
        title: 'Instant Analysis',
        description: 'Our engine compares your performance against similar restaurants automatically.',
      },
      {
        title: 'Get Insights',
        description: 'Receive actionable recommendations to improve your key metrics.',
      },
    ],
    sampleInsights: [
      {
        category: 'Labor Cost Alert',
        insight: 'Your labor cost is 8% above similar restaurants.',
        recommendation: 'Consider optimizing staff scheduling during 2-4 PM.',
        impact: 'Potential savings: $2,400/month',
      },
      {
        category: 'Sales Opportunity',
        insight: 'Weekday lunch revenue 15% below market average.',
        recommendation: 'Target lunch promotions for office workers nearby.',
        impact: 'Potential increase: $1,800/month',
      },
      {
        category: 'Food Cost Variance',
        insight: 'Food waste 3.2% higher than benchmark.',
        recommendation: 'Implement portion control training.',
        impact: 'Potential savings: $950/month',
      },
    ],
    whyCards: [
      { title: 'Identify Opportunities', desc: 'Spot areas where you can improve immediately' },
      { title: 'Benchmark Performance', desc: 'See how you stack up against similar restaurants' },
      { title: 'Get Actionable Insights', desc: 'Receive specific recommendations to improve' },
    ],
  },
  ar: {
    heroBadge: 'مقارنة مرجعية مجانية للمطاعم',
    heroTitle: 'تقرير Sundae',
    heroDescription:
      'احصل على تقرير مقارنة مجاني يوضح أداء مطعمك مقابل معايير القطاع. اعرف موقعك بدقة وما الذي يجب تحسينه.',
    heroPrimary: 'إنشاء تقرير مجاني',
    heroSecondary: 'تعرف على Sundae Core',
    sectionCompareTitle: 'اعرف كيف تقارن',
    sectionCompareDescription: 'قارن مطعمك عبر أهم فئات الأداء مع أعمال مشابهة',
    howTitle: 'كيف يعمل',
    howDescription: 'احصل على تقريرك المرجعي المجاني خلال دقائق، وليس أياماً',
    insightsTitle: 'أمثلة على الرؤى التي ستحصل عليها',
    insightsDescription: 'أمثلة حقيقية على رؤى قابلة للتنفيذ من تقارير المقارنة لدينا',
    whyTitle: 'لماذا مجاناً؟',
    whyDescription:
      'نؤمن أن كل مطعم يجب أن يفهم أداءه. يمنحك تقريرنا المجاني لمحة عن ذكاء القرار الذي يقود Sundae Core.',
    ctaTitle: 'هل أنت مستعد لرؤية المقارنات الخاصة بك؟',
    ctaDescription:
      'انضم إلى آلاف مشغلي المطاعم الذين يستخدمون Sundae Report لفهم أدائهم. لا حاجة لبطاقة ائتمان ولا التزامات - فقط رؤى.',
    finalTitle: 'ابدأ خلال أقل من دقيقتين',
    finalDescription: 'ارفع بياناتك، وشاهد المقارنة. هذا كل شيء.',
    finalTiles: [
      { title: 'ابدأ مجاناً', description: 'ارفع CSV واحصل على مقارنة فورية', cta: 'ابدأ مجاناً →' },
      { title: 'استكشف الخطط', description: 'اطلع على قدرات Plus وPro', cta: 'قارن الخطط →' },
      { title: 'احجز عرضاً', description: 'شاهد Report ببياناتك', cta: 'احجز عرضاً →' },
    ],
    categories: ['أداء المبيعات', 'كفاءة العمالة', 'إدارة تكلفة الطعام', 'المقاييس التشغيلية'],
    categoryMetrics: [
      ['الإيرادات لكل قدم مربع', 'متوسط الفاتورة', 'عدد المعاملات اليومي', 'تحليل ساعات الذروة'],
      ['نسبة تكلفة العمالة', 'المبيعات لكل ساعة عمل', 'إنتاجية الموظفين', 'اتجاهات العمل الإضافي'],
      ['نسبة تكلفة الطعام', 'نسبة الهدر', 'دوران المخزون', 'تحليل COGS'],
      ['زمن دوران الطاولة', 'دقة الطلب', 'رضا العملاء', 'سرعة الخدمة'],
    ],
    how: [
      { title: 'ارفع بياناتك', description: 'صِل نظام POS بأمان أو ارفع بيانات المبيعات والعمالة والتكاليف.' },
      { title: 'تحليل فوري', description: 'يقارن محركنا أداءك تلقائياً مع مطاعم مشابهة.' },
      { title: 'احصل على رؤى', description: 'تلقَّ توصيات عملية لتحسين أهم المقاييس لديك.' },
    ],
    sampleInsights: [
      {
        category: 'تنبيه تكلفة العمالة',
        insight: 'تكلفة العمالة لديك أعلى بنسبة 8% من المطاعم المشابهة.',
        recommendation: 'فكر في تحسين الجدولة بين 2-4 مساءً.',
        impact: 'توفير محتمل: $2,400/شهرياً',
      },
      {
        category: 'فرصة مبيعات',
        insight: 'إيرادات غداء أيام الأسبوع أقل 15% من متوسط السوق.',
        recommendation: 'استهدف عروض الغداء للعاملين في المكاتب القريبة.',
        impact: 'زيادة محتملة: $1,800/شهرياً',
      },
      {
        category: 'انحراف تكلفة الطعام',
        insight: 'الهدر أعلى بنسبة 3.2% من المعيار المرجعي.',
        recommendation: 'طبق تدريباً على التحكم في الحصص.',
        impact: 'توفير محتمل: $950/شهرياً',
      },
    ],
    whyCards: [
      { title: 'اكتشف الفرص', desc: 'اعرف مجالات التحسين فوراً' },
      { title: 'قارن الأداء', desc: 'شاهد موقعك مقابل مطاعم مشابهة' },
      { title: 'احصل على توصيات عملية', desc: 'تلقَّ توصيات محددة للتحسين' },
    ],
  },
  fr: {
    heroBadge: 'Benchmarking restaurant gratuit',
    heroTitle: 'Sundae Report',
    heroDescription:
      'Obtenez un rapport de benchmarking gratuit comparant la performance de votre restaurant aux standards du secteur. Voyez exactement où vous vous situez et quoi améliorer.',
    heroPrimary: 'Generer le rapport gratuit',
    heroSecondary: 'Decouvrir Sundae Core',
    sectionCompareTitle: 'Voyez comment vous vous situez',
    sectionCompareDescription: 'Benchmarkez votre restaurant sur les principales categories de performance face a des entreprises comparables',
    howTitle: 'Comment ca marche',
    howDescription: 'Obtenez votre rapport de benchmarking gratuit en quelques minutes, pas en jours',
    insightsTitle: 'Exemples de insights que vous obtiendrez',
    insightsDescription: 'Exemples concrets de recommandations exploitables issues de nos rapports',
    whyTitle: 'Pourquoi gratuit ?',
    whyDescription:
      'Nous pensons que chaque restaurant doit comprendre sa performance. Notre rapport gratuit vous donne un apercu de l intelligence decisionnelle qui alimente Sundae Core.',
    ctaTitle: 'Pret a voir vos benchmarks ?',
    ctaDescription:
      'Rejoignez des milliers d operateurs qui utilisent Sundae Report pour comprendre leur performance. Aucune carte requise, aucune obligation - juste des insights.',
    finalTitle: 'Commencez en moins de deux minutes',
    finalDescription: 'Importez vos donnees, voyez votre benchmark. C est tout.',
    finalTiles: [
      { title: 'Commencer gratuit', description: 'Importer un CSV, obtenir un benchmark instantane', cta: 'Commencer →' },
      { title: 'Explorer les offres', description: 'Voir les capacites Plus et Pro', cta: 'Comparer →' },
      { title: 'Reserver une demo', description: 'Voir Report avec vos donnees', cta: 'Reserver →' },
    ],
    categories: ['Performance des ventes', 'Efficacite de la main-d oeuvre', 'Gestion du cout alimentaire', 'Indicateurs operationnels'],
    categoryMetrics: [
      ['Revenu par pied carre', 'Taille de cheque moyenne', 'Nombre de transactions quotidiennes', 'Analyse des heures de pointe'],
      ['Cout de main-d oeuvre %', 'Ventes par heure de main-d oeuvre', 'Productivite du personnel', 'Tendances des heures sup'],
      ['Cout alimentaire %', 'Pourcentage de gaspillage', 'Rotation des stocks', 'Analyse COGS'],
      ['Temps de rotation des tables', 'Exactitude des commandes', 'Satisfaction client', 'Vitesse de service'],
    ],
    how: [
      { title: 'Importez vos donnees', description: 'Connectez votre POS en toute securite ou importez ventes, main-d oeuvre et couts.' },
      { title: 'Analyse instantanee', description: 'Notre moteur compare automatiquement vos performances a celles de restaurants similaires.' },
      { title: 'Recevez des insights', description: 'Recevez des recommandations actionnables pour ameliorer vos KPI.' },
    ],
    sampleInsights: [
      {
        category: 'Alerte cout main-d oeuvre',
        insight: 'Votre cout de main-d oeuvre est 8 % au-dessus de restaurants comparables.',
        recommendation: "Optimisez le planning entre 14h et 16h.",
        impact: 'Economies potentielles : 2 400 $/mois',
      },
      {
        category: 'Opportunite de ventes',
        insight: 'Les ventes du dejeuner en semaine sont 15 % sous la moyenne du marche.',
        recommendation: "Ciblez des promotions de midi pour les bureaux proches.",
        impact: 'Hausse potentielle : 1 800 $/mois',
      },
      {
        category: 'Ecart de cout alimentaire',
        insight: 'Le gaspillage alimentaire est 3,2 % au-dessus du benchmark.',
        recommendation: 'Mettez en place une formation sur le portionnement.',
        impact: 'Economies potentielles : 950 $/mois',
      },
    ],
    whyCards: [
      { title: 'Identifier les opportunites', desc: 'Reperez immediatement les axes d amelioration' },
      { title: 'Benchmarker la performance', desc: 'Voyez comment vous vous situez face a des restaurants similaires' },
      { title: 'Obtenir des insights actionnables', desc: 'Recevez des recommandations concretes pour progresser' },
    ],
  },
  es: {
    heroBadge: 'Benchmarking gratuito para restaurantes',
    heroTitle: 'Sundae Report',
    heroDescription:
      'Obtén un informe gratuito de benchmarking comparando el rendimiento de tu restaurante con los estándares del sector. Ve exactamente dónde estás y qué mejorar.',
    heroPrimary: 'Generar informe gratis',
    heroSecondary: 'Conocer Sundae Core',
    sectionCompareTitle: 'Ve cómo te comparas',
    sectionCompareDescription: 'Compara tu restaurante por categorias clave de rendimiento frente a negocios similares',
    howTitle: 'Cómo funciona',
    howDescription: 'Obtén tu informe gratuito en minutos, no en días',
    insightsTitle: 'Ejemplos de insights que obtendrás',
    insightsDescription: 'Ejemplos reales de insights accionables de nuestros informes',
    whyTitle: '¿Por qué gratis?',
    whyDescription:
      'Creemos que todo restaurante debe entender su rendimiento. Nuestro informe gratis te da una muestra de la inteligencia de decisión que impulsa Sundae Core.',
    ctaTitle: '¿Listo para ver tus benchmarks?',
    ctaDescription:
      'Únete a miles de operadores que usan Sundae Report para entender su rendimiento. No se requiere tarjeta ni compromiso - solo insights.',
    finalTitle: 'Empieza en menos de dos minutos',
    finalDescription: 'Sube tus datos, ve tu benchmark. Eso es todo.',
    finalTiles: [
      { title: 'Empieza gratis', description: 'Sube CSV y obtén un benchmark instantáneo', cta: 'Empezar →' },
      { title: 'Explora planes', description: 'Mira las capacidades de Plus y Pro', cta: 'Comparar →' },
      { title: 'Reserva una demo', description: 'Ve Report con tus datos', cta: 'Reservar →' },
    ],
    categories: ['Rendimiento de ventas', 'Eficiencia laboral', 'Gestión del coste de comida', 'Métricas operativas'],
    categoryMetrics: [
      ['Ingresos por pie cuadrado', 'Ticket medio', 'Transacciones diarias', 'Analisis de horas punta'],
      ['Coste laboral %', 'Ventas por hora laboral', 'Productividad del personal', 'Tendencias de horas extra'],
      ['Coste de comida %', 'Porcentaje de desperdicio', 'Rotacion de inventario', 'Analisis COGS'],
      ['Tiempo de rotacion de mesas', 'Exactitud de pedidos', 'Satisfaccion del cliente', 'Velocidad de servicio'],
    ],
    how: [
      { title: 'Sube tus datos', description: 'Conecta tu POS de forma segura o sube ventas, mano de obra y costes.' },
      { title: 'Analisis instantaneo', description: 'Nuestro motor compara automaticamente tu rendimiento con restaurantes similares.' },
      { title: 'Recibe insights', description: 'Recibe recomendaciones accionables para mejorar tus KPI.' },
    ],
    sampleInsights: [
      {
        category: 'Alerta de coste laboral',
        insight: 'Tu coste laboral está un 8% por encima de restaurantes similares.',
        recommendation: 'Optimiza la programación entre las 2 y 4 PM.',
        impact: 'Ahorro potencial: $2,400/mes',
      },
      {
        category: 'Oportunidad de ventas',
        insight: 'Los ingresos del almuerzo entre semana están 15% por debajo del promedio del mercado.',
        recommendation: 'Dirige promociones de almuerzo a oficinas cercanas.',
        impact: 'Aumento potencial: $1,800/mes',
      },
      {
        category: 'Variación de coste de comida',
        insight: 'El desperdicio de comida está 3.2% por encima del benchmark.',
        recommendation: 'Implementa formación de control de porciones.',
        impact: 'Ahorro potencial: $950/mes',
      },
    ],
    whyCards: [
      { title: 'Identifica oportunidades', desc: 'Detecta áreas de mejora al instante' },
      { title: 'Compara rendimiento', desc: 'Ve cómo te comparas con restaurantes similares' },
      { title: 'Obtén insights accionables', desc: 'Recibe recomendaciones concretas para mejorar' },
    ],
  },
} as const

export default function ReportProductPage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = reportPageCopy[locale] ?? reportPageCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge={ui.heroBadge}
        title={<>{ui.heroTitle}</>}
        description={ui.heroDescription}
      >
        <p className="text-[var(--text-muted)] mb-8 max-w-3xl mx-auto body-lg">
          Free forever. No credit card. No commitment. Just clarity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="cta" size="lg" onClick={() => cta(SIGNUP_URL, "start_free_benchmark", { page: "/report-product" })}>
            {ui.heroPrimary}
          </Button>
          <Button variant="outline-light" size="lg" href={PRICING_URL}>
            {ui.heroSecondary}
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <BenchmarkDashboardMockup />
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.sectionCompareTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.sectionCompareDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ui.categories.map((category, idx) => (
              <StaggerItem key={category}>
                <Card variant="elevated" className="hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${['bg-green-500','bg-blue-500','bg-orange-500','bg-purple-500'][idx]} rounded-lg flex items-center justify-center`}>
                        <SundaeIcon name={['finance','labor','decrease','speed'][idx] as SundaeIconName} size="lg" className="text-white" />
                      </div>
                      <CardTitle className="text-[var(--text-primary)]">{category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {ui.categoryMetrics[idx].map((metric, metricIndex) => (
                        <li key={metricIndex} className="text-sm text-[var(--text-supporting)] flex items-center">
                          <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full mr-2"></div>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.howTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.howDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ui.how.map((step, index) => (
              <StaggerItem key={step.title}>
                <Card variant="elevated" className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <SundaeIcon name={["benchmarking","intelligence","insights"][index] as SundaeIconName} size="xl" className="text-white" />
                    </div>
                    <div className="text-sm text-[#60A5FA] font-medium mb-2">Step {index + 1}</div>
                    <CardTitle className="text-[var(--text-primary)]">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[var(--text-supporting)]">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.insightsTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.insightsDescription}</p>
          </FadeUp>
          <div className="space-y-6 max-w-4xl mx-auto">
            {ui.sampleInsights.map((insight, index) => (
              <FadeUp key={index} delay={index * 0.1}>
                <Card variant="elevated">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <CardTitle className="text-[var(--text-primary)] text-lg">{insight.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-[var(--text-secondary)] mb-1">What we found:</div>
                        <p className="text-[var(--text-supporting)]">{insight.insight}</p>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--text-secondary)] mb-1">Recommendation:</div>
                        <p className="text-[var(--text-supporting)]">{insight.recommendation}</p>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-3">
                        <div className="text-sm font-medium text-green-400 mb-1">Potential Impact:</div>
                        <p className="text-green-400 font-medium">{insight.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.whyTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] mb-8">{ui.whyDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {ui.whyCards.map((item, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-[var(--surface-subtle)] rounded-lg flex items-center justify-center">
                    <SundaeIcon name={["marketing","benchmarking","intelligence"][index] as SundaeIconName} size="lg" className="text-white" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Link href="/demo">
          <Button variant="primary" size="lg">{ui.heroPrimary}</Button>
        </Link>
      </PageCTA>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.finalTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] mb-8">{ui.finalDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {ui.finalTiles.map((tile) => (
              <StaggerItem key={tile.title}>
                <div className="text-center">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{tile.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{tile.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" onClick={() => cta(REPORT_APP_URL, "start_free_final_cta", { page: "/report-product" })}>{ui.finalTiles[0].cta}</Button>
            <Button variant="outline" size="lg" href={PRICING_URL}>{ui.finalTiles[1].cta}</Button>
            <Button variant="outline" size="lg" onClick={() => cta("/demo", "book_demo_from_report", { page: "/report-product" })}>{ui.finalTiles[2].cta}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
