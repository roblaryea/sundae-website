'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';

const localizedCanvasCopy = {
  en: {
    heroBadge: 'Canvas — Visualization Engine',
    heroTitle: <>Dashboards That<br />Actually Get Used</>,
    heroDescription: 'One source of truth for every team. Canvas delivers live dashboards for execs, ops, and finance - always current, always aligned.',
    heroPrimary: 'Explore Canvas',
    heroSecondary: 'View Architecture',
    featuresHeading: 'Built for How Teams Actually Work',
    featuresDescription: 'Real-time data. Clear visuals. No waiting for reports.',
    features: [
      { title: 'Interactive Dashboards', description: 'Drag-and-drop interface to create custom visualizations that tell your data story.', icon: 'benchmarking' as SundaeIconName },
      { title: 'Natural Language Dashboard Builder', description: 'Describe what you want to see in plain English. Sundae Coach builds it for you instantly.', icon: 'aiOs' as SundaeIconName },
      { title: 'Real-Time Updates', description: 'Live data streaming ensures your visualizations always show the latest metrics.', icon: 'speed' as SundaeIconName },
      { title: 'Multi-Location Views', description: 'Compare performance across locations with unified dashboards and drill-down capabilities.', icon: 'multiLocation' as SundaeIconName },
      { title: 'Predictive Visualizations', description: 'Trend lines and forecasting to see what&apos;s coming before it happens.', icon: 'forecasting' as SundaeIconName },
    ],
    visualizationHeading: 'Ready-Made Views for Every Role',
    visualizationDescription: 'Pre-built dashboards for operations, finance, and executive oversight',
    visualizationTypes: [
      { type: 'Performance Metrics', examples: ['Sales Trends', 'Labor Costs', 'Guest Count', 'Table Turn'] },
      { type: 'Operational KPIs', examples: ['Food Cost %', 'Labor Efficiency', 'Waste Tracking', 'Speed of Service'] },
      { type: 'Market Intelligence', examples: ['Competitor Analysis', 'Market Share', 'Price Benchmarking', 'Trend Analysis'] },
      { type: 'Predictive Intelligence', examples: ['Demand Forecasting', 'Staffing Optimization', 'Inventory Planning', 'Revenue Prediction'] },
    ],
    demoHeading: 'See It in Action',
    demoDescription: 'Live data. Clear insights. Decisions made faster.',
    demoFeatures: [
      { feature: 'Drag-and-drop dashboard builder', icon: 'marketing' as SundaeIconName },
      { feature: "Natural language: 'Show me labor cost by location'", icon: 'aiOs' as SundaeIconName },
      { feature: 'Real-time data updates', icon: 'speed' as SundaeIconName },
      { feature: 'Multi-location comparisons', icon: 'multiLocation' as SundaeIconName },
      { feature: 'Intelligent insights & recommendations', icon: 'intelligence' as SundaeIconName },
    ],
    previewTitle: 'Live Dashboard Preview',
    previewSales: 'Daily Sales',
    previewLabor: 'Labor Cost %',
    previewGuests: 'Guest Count',
    ctaTitle: 'Ready for Dashboards That Work?',
    ctaDescription: 'See your data unified. Book a Canvas demo today.',
    ctaPrimary: 'Book Canvas Demo',
    ctaSecondary: 'View All Modules',
  },
  ar: {
    heroBadge: 'Canvas - محرك التصور',
    heroTitle: <>لوحات تحكم<br />يستخدمها الفريق فعلاً</>,
    heroDescription: 'مصدر واحد للحقيقة لكل فريق. يقدم Canvas لوحات حية للقيادة والعمليات والمالية - محدثة دائماً ومتسقة دائماً.',
    heroPrimary: 'استعرض Canvas',
    heroSecondary: 'عرض البنية',
    featuresHeading: 'مصمم لطريقة عمل الفرق فعلاً',
    featuresDescription: 'بيانات لحظية. صور واضحة. بلا انتظار للتقارير.',
    features: [
      { title: 'لوحات تحكم تفاعلية', description: 'واجهة سحب وإفلات لإنشاء تصورات مخصصة تروي قصة بياناتك.', icon: 'benchmarking' as SundaeIconName },
      { title: 'منشئ لوحات بلغة طبيعية', description: 'صف ما تريد رؤيته بالإنجليزية البسيطة، وسيبنيه Sundae Coach فوراً.', icon: 'aiOs' as SundaeIconName },
      { title: 'تحديثات لحظية', description: 'يضمن بث البيانات الحية أن تعرض التصورات أحدث المقاييس دائماً.', icon: 'speed' as SundaeIconName },
      { title: 'عرض متعدد المواقع', description: 'قارن الأداء بين المواقع عبر لوحات موحدة مع إمكانات التعمق.', icon: 'multiLocation' as SundaeIconName },
      { title: 'تصورات تنبؤية', description: 'خطوط اتجاه وتنبؤات لمعرفة ما هو قادم قبل حدوثه.', icon: 'forecasting' as SundaeIconName },
    ],
    visualizationHeading: 'عروض جاهزة لكل دور',
    visualizationDescription: 'لوحات معدة مسبقاً للعمليات والمالية والإشراف التنفيذي',
    visualizationTypes: [
      { type: 'مقاييس الأداء', examples: ['اتجاهات المبيعات', 'تكاليف العمالة', 'عدد الضيوف', 'دوران الطاولات'] },
      { type: 'مؤشرات تشغيلية', examples: ['نسبة تكلفة الطعام', 'كفاءة العمالة', 'تتبع الهدر', 'سرعة الخدمة'] },
      { type: 'ذكاء السوق', examples: ['تحليل المنافسين', 'الحصة السوقية', 'مقارنة الأسعار', 'تحليل الاتجاهات'] },
      { type: 'ذكاء تنبؤي', examples: ['توقع الطلب', 'تحسين الجدولة', 'تخطيط المخزون', 'توقع الإيرادات'] },
    ],
    demoHeading: 'شاهد ذلك عملياً',
    demoDescription: 'بيانات مباشرة. رؤى واضحة. قرارات أسرع.',
    demoFeatures: [
      { feature: 'منشئ لوحات بالسحب والإفلات', icon: 'marketing' as SundaeIconName },
      { feature: 'لغة طبيعية: "اعرض لي تكلفة العمالة حسب الموقع"', icon: 'aiOs' as SundaeIconName },
      { feature: 'تحديثات بيانات لحظية', icon: 'speed' as SundaeIconName },
      { feature: 'مقارنات متعددة المواقع', icon: 'multiLocation' as SundaeIconName },
      { feature: 'رؤى وتوصيات ذكية', icon: 'intelligence' as SundaeIconName },
    ],
    previewTitle: 'معاينة لوحة مباشرة',
    previewSales: 'مبيعات اليوم',
    previewLabor: 'نسبة تكلفة العمالة',
    previewGuests: 'عدد الضيوف',
    ctaTitle: 'هل أنت مستعد للوحات تعمل فعلاً؟',
    ctaDescription: 'وحّد بياناتك. احجز عرض Canvas اليوم.',
    ctaPrimary: 'احجز عرض Canvas',
    ctaSecondary: 'عرض كل الوحدات',
  },
  fr: {
    heroBadge: 'Canvas - Moteur de visualisation',
    heroTitle: <>Des tableaux de bord<br />vraiment utilisés</>,
    heroDescription: 'Une seule source de vérité pour chaque équipe. Canvas fournit des tableaux de bord en direct pour la direction, les operations et la finance - toujours a jour, toujours alignes.',
    heroPrimary: 'Decouvrir Canvas',
    heroSecondary: 'Voir l architecture',
    featuresHeading: 'Concu pour la facon dont les equipes travaillent vraiment',
    featuresDescription: 'Donnees en temps reel. Visuels clairs. Pas d attente pour les rapports.',
    features: [
      { title: 'Tableaux de bord interactifs', description: 'Interface glisser-deposer pour creer des visualisations sur mesure qui racontent votre histoire.', icon: 'benchmarking' as SundaeIconName },
      { title: 'Constructeur en langage naturel', description: 'Decrivez ce que vous voulez voir en anglais simple. Sundae Coach le construit instantanement.', icon: 'aiOs' as SundaeIconName },
      { title: 'Mises a jour en temps reel', description: 'Le flux de donnees en direct garantit des metriques toujours a jour.', icon: 'speed' as SundaeIconName },
      { title: 'Vues multi-sites', description: 'Comparez les performances entre sites avec des tableaux unifies et des vues detaillees.', icon: 'multiLocation' as SundaeIconName },
      { title: 'Visualisations predictives', description: 'Tendances et previsions pour voir ce qui arrive avant que cela n arrive.', icon: 'forecasting' as SundaeIconName },
    ],
    visualizationHeading: 'Vues pretes a l emploi pour chaque role',
    visualizationDescription: 'Tableaux de bord preconstruits pour les operations, la finance et le pilotage executif',
    visualizationTypes: [
      { type: 'Indicateurs de performance', examples: ['Tendances des ventes', 'Couts de main-d oeuvre', 'Nombre de clients', 'Rotation des tables'] },
      { type: 'KPI operationnels', examples: ['Cout alimentaire %', 'Efficacite de la main-d oeuvre', 'Suivi du gaspillage', 'Vitesse de service'] },
      { type: 'Intelligence de marche', examples: ['Analyse concurrentielle', 'Part de marche', 'Benchmark des prix', 'Analyse des tendances'] },
      { type: 'Intelligence predictive', examples: ['Prevision de la demande', 'Optimisation du planning', 'Planification des stocks', 'Prevision des revenus'] },
    ],
    demoHeading: 'Voir en action',
    demoDescription: 'Donnees en direct. Insights clairs. Decisions plus rapides.',
    demoFeatures: [
      { feature: 'Constructeur de tableau de bord glisser-deposer', icon: 'marketing' as SundaeIconName },
      { feature: 'Langage naturel : "Montre-moi le cout de main-d oeuvre par site"', icon: 'aiOs' as SundaeIconName },
      { feature: 'Mises a jour des donnees en temps reel', icon: 'speed' as SundaeIconName },
      { feature: 'Comparaisons multi-sites', icon: 'multiLocation' as SundaeIconName },
      { feature: 'Insights et recommandations intelligents', icon: 'intelligence' as SundaeIconName },
    ],
    previewTitle: 'Apercu de tableau de bord live',
    previewSales: 'Ventes quotidiennes',
    previewLabor: 'Cout de main-d oeuvre %',
    previewGuests: 'Nombre de clients',
    ctaTitle: 'Pret pour des tableaux de bord qui fonctionnent ?',
    ctaDescription: 'Unifiez vos donnees. Reservez une demo Canvas aujourd hui.',
    ctaPrimary: 'Reserver une demo Canvas',
    ctaSecondary: 'Voir tous les modules',
  },
  es: {
    heroBadge: 'Canvas - Motor de visualizacion',
    heroTitle: <>Paneles de control que<br />de verdad se usan</>,
    heroDescription: 'Una sola fuente de verdad para cada equipo. Canvas entrega paneles en vivo para directivos, operaciones y finanzas - siempre actualizados, siempre alineados.',
    heroPrimary: 'Explorar Canvas',
    heroSecondary: 'Ver arquitectura',
    featuresHeading: 'Construido para la forma real de trabajar de los equipos',
    featuresDescription: 'Datos en tiempo real. Visuales claros. Sin esperar reportes.',
    features: [
      { title: 'Paneles interactivos', description: 'Interfaz de arrastrar y soltar para crear visualizaciones personalizadas que cuenten tu historia de datos.', icon: 'benchmarking' as SundaeIconName },
      { title: 'Creador en lenguaje natural', description: 'Describe lo que quieres ver en ingles sencillo. Sundae Coach lo construye al instante.', icon: 'aiOs' as SundaeIconName },
      { title: 'Actualizaciones en tiempo real', description: 'El streaming de datos en vivo asegura que tus visualizaciones muestren siempre las ultimas metricas.', icon: 'speed' as SundaeIconName },
      { title: 'Vistas multiubicacion', description: 'Compara el rendimiento entre ubicaciones con paneles unificados y vistas detalladas.', icon: 'multiLocation' as SundaeIconName },
      { title: 'Visualizaciones predictivas', description: 'Lineas de tendencia y pronosticos para ver lo que viene antes de que ocurra.', icon: 'forecasting' as SundaeIconName },
    ],
    visualizationHeading: 'Vistas listas para cada rol',
    visualizationDescription: 'Paneles preconstruidos para operaciones, finanzas y supervision ejecutiva',
    visualizationTypes: [
      { type: 'Metricas de rendimiento', examples: ['Tendencias de ventas', 'Costes de mano de obra', 'Conteo de clientes', 'Rotacion de mesas'] },
      { type: 'KPIs operativos', examples: ['Coste de comida %', 'Eficiencia laboral', 'Seguimiento de desperdicio', 'Velocidad de servicio'] },
      { type: 'Inteligencia de mercado', examples: ['Analisis de competidores', 'Cuota de mercado', 'Benchmark de precios', 'Analisis de tendencias'] },
      { type: 'Inteligencia predictiva', examples: ['Pronostico de demanda', 'Optimizacion de personal', 'Planificacion de inventario', 'Prediccion de ingresos'] },
    ],
    demoHeading: 'Verlo en accion',
    demoDescription: 'Datos en vivo. Insights claros. Decisiones mas rapidas.',
    demoFeatures: [
      { feature: 'Constructor de paneles arrastrando y soltando', icon: 'marketing' as SundaeIconName },
      { feature: 'Lenguaje natural: "Muestrame el coste laboral por ubicacion"', icon: 'aiOs' as SundaeIconName },
      { feature: 'Actualizaciones de datos en tiempo real', icon: 'speed' as SundaeIconName },
      { feature: 'Comparaciones multiubicacion', icon: 'multiLocation' as SundaeIconName },
      { feature: 'Insights y recomendaciones inteligentes', icon: 'intelligence' as SundaeIconName },
    ],
    previewTitle: 'Vista previa de panel en vivo',
    previewSales: 'Ventas diarias',
    previewLabor: 'Coste laboral %',
    previewGuests: 'Conteo de clientes',
    ctaTitle: '¿Listo para paneles que funcionan?',
    ctaDescription: 'Unifica tus datos. Reserva una demo de Canvas hoy.',
    ctaPrimary: 'Reservar demo de Canvas',
    ctaSecondary: 'Ver todos los modulos',
  },
} as const;

export default function CanvasPage() {
  const { locale } = useWebsiteI18n();
  const ui = localizedCanvasCopy[locale] ?? localizedCanvasCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.heroBadge} title={ui.heroTitle} description={ui.heroDescription}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              {ui.heroPrimary}
            </Button>
          </Link>
          <Link href="/architecture">
            <Button variant="outline-light" size="lg">
              {ui.heroSecondary}
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.featuresHeading}</h2>
            <p className="body-xl text-[var(--text-supporting)]">{ui.featuresDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ui.features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <SundaeIcon name={feature.icon} size="lg" className="text-white" />
                      </div>
                      <CardTitle className="text-[var(--text-primary)]">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)]">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.visualizationHeading}</h2>
            <p className="body-xl text-[var(--text-supporting)]">{ui.visualizationDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ui.visualizationTypes.map((category, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-[var(--text-primary)]">{category.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {category.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center space-x-2 p-2 bg-purple-500/10 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-[var(--text-secondary)] text-sm font-medium">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.demoHeading}</h2>
              <p className="body-xl text-[var(--text-supporting)] mb-8">{ui.demoDescription}</p>

              <div className="space-y-4">
                {ui.demoFeatures.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <SundaeIcon name={item.icon} size="sm" className="text-purple-400" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{item.feature}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-[var(--surface-faint)] rounded-2xl p-8 border border-[var(--border-default)]">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <SundaeIcon name="canvas" size="xl" className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">{ui.previewTitle}</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">{ui.previewSales}</span>
                      <span className="text-sm text-green-500">+12%</span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded"></div>
                  </div>

                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">{ui.previewLabor}</span>
                      <span className="text-sm text-red-400">-3.2%</span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded"></div>
                  </div>

                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">{ui.previewGuests}</span>
                      <span className="text-sm text-green-500">+8.5%</span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded"></div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Link href="/demo">
          <Button variant="primary" size="lg">
            {ui.ctaPrimary}
          </Button>
        </Link>
        <Link href="/product">
          <Button variant="outline-light" size="lg">
            {ui.ctaSecondary}
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
