"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageCTA } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type WebsiteLocale } from "@/lib/i18n";

type CanvasCopy = {
  hero: {
    badge: string;
    title: string;
    description: string;
    subcopy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  capabilities: { title: string; description: string; icon: SundaeIconName }[];
  whoItsFor: { icon: SundaeIconName; title: string; description: string }[];
  dashboardExamples: {
    title: string;
    description: string;
    benefits: string[];
    metrics: string[];
    icon: SundaeIconName;
    featured: boolean;
  }[];
  dashboardHeader: { title: string; updated: string; export: string; share: string };
  kpis: { label: string; value: string; change: string; positive: boolean }[];
  charts: { revenueTrend: string; locations: string };
  preview: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  darkStrip: {
    title: string;
    subtitle: string;
  };
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

const localizedCopy: Record<WebsiteLocale, CanvasCopy> = {
  en: {
    hero: {
      badge: "Sundae Canvas",
      title: "Your Data, Instantly Visualized",
      description:
        "Turn restaurant data into dashboards your team can read quickly and use in the moment.",
      subcopy:
        "Part of Sundae's operating intelligence stack for restaurants and hospitality teams.",
      primaryCta: "Book a Canvas Walkthrough",
      secondaryCta: "See Dashboard Examples",
    },
    capabilities: [
      { title: "Auto-Generated Dashboards", description: "Canvas detects key metrics and builds dashboards automatically, so teams can get started without heavy setup.", icon: "speed" },
      { title: "Interactive Visuals", description: "Every chart is interactive, allowing you to drill down, filter, and explore your data.", icon: "canvas" },
      { title: "Real-Time Updates", description: "Dashboards refresh continuously as new data flows in, keeping insights always current.", icon: "sync" },
      { title: "Share & Embed", description: "Export, share, or embed dashboards across finance, operations, and marketing teams.", icon: "network" },
    ],
    whoItsFor: [
      { icon: "owners", title: "Ops Leaders", description: "Real-time performance visibility across all locations" },
      { icon: "finance", title: "Finance & FP&A", description: "Cost analysis and variance tracking at a glance" },
      { icon: "regional", title: "Regional Managers", description: "Compare location performance side-by-side" },
    ],
    dashboardExamples: [
      { title: "Executive Overview", description: "High-level KPIs for C-suite and ownership.", benefits: ["See portfolio-wide performance in real-time", "Drill into any location with one click"], metrics: ["Net Revenue by Location & Concept", "EBITDA & Margin Trends", "Labor Cost % vs Target", "Food Cost % by Location", "Location Performance Rankings"], icon: "benchmarking", featured: true },
      { title: "Ops Command Center", description: "Real-time operational metrics for managers.", benefits: ["Monitor service speed and guest satisfaction live"], metrics: ["Hourly Sales by Daypart", "Labor Hours vs Forecast", "Inventory Levels & Reorder Alerts", "Order Accuracy %", "Average Service Time"], icon: "forge", featured: false },
      { title: "Finance & Cost Control", description: "Detailed cost analysis for CFOs and controllers.", benefits: ["Spot cost leakage before it impacts margins"], metrics: ["Food Cost Variance by Category", "Waste % by Menu Item", "Vendor Spend by Location", "Budget vs Actual by Week", "Margin Analysis by Concept"], icon: "finance", featured: false },
      { title: "Marketing & Growth", description: "Customer acquisition and retention metrics.", benefits: ["Track campaign ROI and channel performance instantly"], metrics: ["Guest Count Trends", "Repeat Customer Rate", "Channel Performance (Delivery/Dine-in/Takeout)", "Campaign ROI by Location", "Customer LTV by Segment"], icon: "growth", featured: false },
    ],
    dashboardHeader: {
      title: "Executive Overview",
      updated: "Last updated: 2 minutes ago",
      export: "Export",
      share: "Share",
    },
    kpis: [
      { label: "Total Revenue", value: "AED 2.4M", change: "+12%", positive: true },
      { label: "Labor Cost %", value: "28.5%", change: "-2.1%", positive: true },
      { label: "Food Cost %", value: "31.2%", change: "+0.8%", positive: false },
      { label: "Locations", value: "12", change: "Active", positive: true },
    ],
    charts: { revenueTrend: "Revenue Trend (Last 30 Days)", locations: "Top Locations by Revenue" },
    preview: {
      title: "Dashboard Examples",
      description: "Choose the type of board your team needs most.",
      primary: "Explore the examples",
      secondary: "Start with executive view",
    },
    darkStrip: {
      title: "Canvas turns raw data into team-ready views.",
      subtitle: "Built for finance, operations, and multi-location leadership.",
    },
    cta: {
      title: "Ready for Deeper Insights?",
      description: "These dashboards are just the start. See what Sundae can do with your full data.",
      primary: "Book a Demo",
      secondary: "Explore Products",
    },
  },
  ar: {
    hero: {
      badge: "سنداي كانفس",
      title: "بياناتك، مرئية فوراً",
      description: "حوّل بيانات المطعم إلى لوحات يمكن لفريقك قراءتها سريعاً واستخدامها في اللحظة نفسها.",
      subcopy: "جزء من حزمة الذكاء التشغيلي لـ Sundae للمطاعم وفرق الضيافة.",
      primaryCta: "احجز جولة في Canvas",
      secondaryCta: "شاهد أمثلة اللوحات",
    },
    capabilities: [
      { title: "لوحات يتم إنشاؤها تلقائياً", description: "يكتشف Canvas المقاييس الرئيسية ويبني اللوحات تلقائياً حتى تبدأ الفرق بسرعة.", icon: "speed" },
      { title: "مرئيات تفاعلية", description: "كل مخطط تفاعلي، ما يتيح لك التعمق والتصفية واستكشاف بياناتك.", icon: "canvas" },
      { title: "تحديثات لحظية", description: "تتحدث اللوحات باستمرار مع تدفق البيانات الجديدة.", icon: "sync" },
      { title: "مشاركة وتضمين", description: "صدّر أو شارك أو ضمّن اللوحات عبر فرق المالية والتشغيل والتسويق.", icon: "network" },
    ],
    whoItsFor: [
      { icon: "owners", title: "قادة العمليات", description: "رؤية أداء لحظية عبر جميع المواقع" },
      { icon: "finance", title: "المالية وFP&A", description: "تحليل التكاليف وتتبع التباين بنظرة واحدة" },
      { icon: "regional", title: "المديرون الإقليميون", description: "قارن أداء المواقع جنباً إلى جنب" },
    ],
    dashboardExamples: [
      { title: "نظرة تنفيذية", description: "مؤشرات عليا للقيادة والملّاك.", benefits: ["شاهد أداء المحفظة في الوقت الحقيقي", "تعمّق في أي موقع بنقرة واحدة"], metrics: ["صافي الإيرادات حسب الموقع والمفهوم", "اتجاهات EBITDA والهامش", "نسبة تكلفة العمالة مقابل الهدف", "نسبة تكلفة الطعام حسب الموقع", "ترتيب أداء المواقع"], icon: "benchmarking", featured: true },
      { title: "مركز قيادة العمليات", description: "مقاييس تشغيلية لحظية للمديرين.", benefits: ["راقب سرعة الخدمة ورضا الضيوف مباشرة"], metrics: ["المبيعات بالساعة حسب الفترة", "ساعات العمالة مقابل التوقع", "المخزون وتنبيهات إعادة الطلب", "دقة الطلبات %", "متوسط زمن الخدمة"], icon: "forge", featured: false },
      { title: "المالية وضبط التكاليف", description: "تحليل تفصيلي للتكاليف للمدير المالي والمراقبين.", benefits: ["اكتشف التسرب في التكاليف قبل أن يؤثر على الهوامش"], metrics: ["تباين تكلفة الطعام حسب الفئة", "نسبة الهدر حسب صنف القائمة", "إنفاق الموردين حسب الموقع", "الميزانية مقابل الفعلي حسب الأسبوع", "تحليل الهامش حسب المفهوم"], icon: "finance", featured: false },
      { title: "التسويق والنمو", description: "مقاييس اكتساب العملاء والاحتفاظ بهم.", benefits: ["تتبع عائد الحملات وأداء القنوات فوراً"], metrics: ["اتجاهات عدد الضيوف", "معدل العملاء العائدين", "أداء القنوات (توصيل/جلسات/استلام)", "عائد الحملة حسب الموقع", "قيمة العميل مدى الحياة حسب الشريحة"], icon: "growth", featured: false },
    ],
    dashboardHeader: {
      title: "نظرة تنفيذية",
      updated: "آخر تحديث: قبل دقيقتين",
      export: "تصدير",
      share: "مشاركة",
    },
    kpis: [
      { label: "إجمالي الإيرادات", value: "AED 2.4M", change: "+12%", positive: true },
      { label: "نسبة تكلفة العمالة", value: "28.5%", change: "-2.1%", positive: true },
      { label: "نسبة تكلفة الطعام", value: "31.2%", change: "+0.8%", positive: false },
      { label: "المواقع", value: "12", change: "نشطة", positive: true },
    ],
    charts: { revenueTrend: "اتجاه الإيرادات (آخر 30 يوماً)", locations: "أفضل المواقع حسب الإيراد" },
    preview: {
      title: "أمثلة لوحات",
      description: "اختر نوع اللوحة الذي يحتاجه فريقك أكثر.",
      primary: "استكشف الأمثلة",
      secondary: "ابدأ بالنظرة التنفيذية",
    },
    darkStrip: {
      title: "Canvas يحوّل البيانات الخام إلى لوحات جاهزة للفريق.",
      subtitle: "مبني للمالية والتشغيل والقيادة متعددة المواقع.",
    },
    cta: {
      title: "هل أنت مستعد لرؤى أعمق؟",
      description: "هذه اللوحات مجرد بداية. شاهد ما يمكن أن تفعله Sundae ببياناتك الكاملة.",
      primary: "احجز عرضاً",
      secondary: "استكشف المنتجات",
    },
  },
  fr: {
    hero: {
      badge: "Sundae Canvas",
      title: "Vos données, visualisées instantanément",
      description: "Transformez les données restaurant en tableaux de bord que votre équipe peut lire rapidement et utiliser sur le moment.",
      subcopy: "Une partie de la stack d'intelligence opérationnelle Sundae pour les restaurants et l'hôtellerie.",
      primaryCta: "Réserver une visite Canvas",
      secondaryCta: "Voir des exemples de tableaux de bord",
    },
    capabilities: [
      { title: "Tableaux générés automatiquement", description: "Canvas détecte les métriques clés et construit les tableaux automatiquement pour démarrer sans lourde configuration.", icon: "speed" },
      { title: "Visuels interactifs", description: "Chaque graphique est interactif pour approfondir, filtrer et explorer vos données.", icon: "canvas" },
      { title: "Mises à jour temps réel", description: "Les tableaux se rafraîchissent en continu à mesure que les données arrivent.", icon: "sync" },
      { title: "Partager et intégrer", description: "Exportez, partagez ou intégrez les tableaux entre équipes finance, opérations et marketing.", icon: "network" },
    ],
    whoItsFor: [
      { icon: "owners", title: "Leaders Ops", description: "Visibilité temps réel sur la performance de tous les sites" },
      { icon: "finance", title: "Finance & FP&A", description: "Analyse des coûts et suivi des écarts en un coup d'œil" },
      { icon: "regional", title: "Responsables régionaux", description: "Comparez les performances site par site" },
    ],
    dashboardExamples: [
      { title: "Vue exécutive", description: "KPI de haut niveau pour la direction et les propriétaires.", benefits: ["Voir la performance du portefeuille en temps réel", "Explorer n'importe quel site en un clic"], metrics: ["Revenu net par site et concept", "Tendances EBITDA et marge", "Coût de main-d'œuvre % vs cible", "Coût matière % par site", "Classement des sites"], icon: "benchmarking", featured: true },
      { title: "Centre de pilotage Ops", description: "Métriques opérationnelles en temps réel pour les managers.", benefits: ["Surveiller la vitesse de service et la satisfaction client en direct"], metrics: ["Ventes horaires par période", "Heures de main-d'œuvre vs prévision", "Niveaux de stock & alertes de réapprovisionnement", "Taux de précision des commandes %", "Temps moyen de service"], icon: "forge", featured: false },
      { title: "Finance & contrôle des coûts", description: "Analyse détaillée des coûts pour les CFO et contrôleurs.", benefits: ["Repérer les fuites de coûts avant qu'elles n'impactent les marges"], metrics: ["Écart coût matière par catégorie", "Waste % par plat", "Dépenses fournisseurs par site", "Budget vs réel par semaine", "Analyse de marge par concept"], icon: "finance", featured: false },
      { title: "Marketing & croissance", description: "Métriques d'acquisition et de rétention client.", benefits: ["Suivre instantanément le ROI des campagnes et la performance des canaux"], metrics: ["Tendances du nombre de clients", "Taux de clients récurrents", "Performance des canaux (livraison/sur place/à emporter)", "ROI campagne par site", "LTV client par segment"], icon: "growth", featured: false },
    ],
    dashboardHeader: {
      title: "Vue exécutive",
      updated: "Dernière mise à jour : il y a 2 minutes",
      export: "Exporter",
      share: "Partager",
    },
    kpis: [
      { label: "Revenu total", value: "AED 2.4M", change: "+12%", positive: true },
      { label: "Coût de main-d'œuvre %", value: "28.5%", change: "-2.1%", positive: true },
      { label: "Coût matière %", value: "31.2%", change: "+0.8%", positive: false },
      { label: "Sites", value: "12", change: "Actifs", positive: true },
    ],
    charts: { revenueTrend: "Tendance du revenu (30 derniers jours)", locations: "Meilleurs sites par revenu" },
    preview: {
      title: "Exemples de tableaux de bord",
      description: "Choisissez le type de vue dont votre équipe a le plus besoin.",
      primary: "Explorer les exemples",
      secondary: "Commencer par la vue exécutive",
    },
    darkStrip: {
      title: "Canvas transforme les données brutes en vues prêtes pour l'équipe.",
      subtitle: "Conçu pour la finance, les opérations et les leaders multi-sites.",
    },
    cta: {
      title: "Prêt pour des insights plus profonds ?",
      description: "Ces tableaux de bord ne sont qu'un début. Voyez ce que Sundae peut faire avec l'ensemble de vos données.",
      primary: "Réserver une démo",
      secondary: "Explorer les produits",
    },
  },
  es: {
    hero: {
      badge: "Sundae Canvas",
      title: "Tus datos, visualizados al instante",
      description: "Convierte los datos del restaurante en dashboards que tu equipo pueda leer rápido y usar en el momento.",
      subcopy: "Parte de la stack de inteligencia operativa de Sundae para restaurantes y hospitalidad.",
      primaryCta: "Reservar recorrido por Canvas",
      secondaryCta: "Ver ejemplos de dashboards",
    },
    capabilities: [
      { title: "Dashboards generados automáticamente", description: "Canvas detecta métricas clave y construye dashboards automáticamente, para que los equipos empiecen sin mucha configuración.", icon: "speed" },
      { title: "Visuales interactivos", description: "Cada gráfico es interactivo, permitiendo profundizar, filtrar y explorar los datos.", icon: "canvas" },
      { title: "Actualizaciones en tiempo real", description: "Los dashboards se actualizan continuamente a medida que llegan nuevos datos.", icon: "sync" },
      { title: "Compartir e incrustar", description: "Exporta, comparte o incrusta dashboards entre finanzas, operaciones y marketing.", icon: "network" },
    ],
    whoItsFor: [
      { icon: "owners", title: "Líderes de operaciones", description: "Visibilidad de rendimiento en tiempo real en todas las ubicaciones" },
      { icon: "finance", title: "Finanzas y FP&A", description: "Análisis de costos y seguimiento de variaciones de un vistazo" },
      { icon: "regional", title: "Gerentes regionales", description: "Compara el rendimiento de ubicaciones lado a lado" },
    ],
    dashboardExamples: [
      { title: "Vista ejecutiva", description: "KPIs de alto nivel para la dirección y los propietarios.", benefits: ["Ver el rendimiento del portafolio en tiempo real", "Profundizar en cualquier ubicación con un clic"], metrics: ["Ingresos netos por ubicación y concepto", "Tendencias de EBITDA y margen", "Costo laboral % vs objetivo", "Costo de alimentos % por ubicación", "Ranking de ubicaciones"], icon: "benchmarking", featured: true },
      { title: "Centro de mando de operaciones", description: "Métricas operativas en tiempo real para gerentes.", benefits: ["Monitorea la velocidad del servicio y la satisfacción del huésped en vivo"], metrics: ["Ventas por hora y franja", "Horas laborales vs pronóstico", "Niveles de inventario y alertas de reabastecimiento", "Precisión de pedidos %", "Tiempo promedio de servicio"], icon: "forge", featured: false },
      { title: "Finanzas y control de costos", description: "Análisis detallado de costos para CFOs y controllers.", benefits: ["Detecta fugas de costos antes de que afecten los márgenes"], metrics: ["Variación de costo de alimentos por categoría", "Waste % por plato", "Gasto de proveedores por ubicación", "Presupuesto vs real por semana", "Análisis de margen por concepto"], icon: "finance", featured: false },
      { title: "Marketing y crecimiento", description: "Métricas de adquisición y retención de clientes.", benefits: ["Sigue el ROI de campañas y el rendimiento de canales al instante"], metrics: ["Tendencias de clientes", "Tasa de clientes recurrentes", "Rendimiento de canales (delivery/mesa/para llevar)", "ROI de campaña por ubicación", "LTV por segmento"], icon: "growth", featured: false },
    ],
    dashboardHeader: {
      title: "Vista ejecutiva",
      updated: "Última actualización: hace 2 minutos",
      export: "Exportar",
      share: "Compartir",
    },
    kpis: [
      { label: "Ingresos totales", value: "AED 2.4M", change: "+12%", positive: true },
      { label: "Costo laboral %", value: "28.5%", change: "-2.1%", positive: true },
      { label: "Costo de alimentos %", value: "31.2%", change: "+0.8%", positive: false },
      { label: "Ubicaciones", value: "12", change: "Activas", positive: true },
    ],
    charts: { revenueTrend: "Tendencia de ingresos (últimos 30 días)", locations: "Mejores ubicaciones por ingresos" },
    preview: {
      title: "Ejemplos de dashboards",
      description: "Elige el tipo de tablero que más necesita tu equipo.",
      primary: "Explorar ejemplos",
      secondary: "Empezar con vista ejecutiva",
    },
    darkStrip: {
      title: "Canvas convierte los datos brutos en vistas listas para el equipo.",
      subtitle: "Diseñado para finanzas, operaciones y liderazgo multiubicación.",
    },
    cta: {
      title: "¿Listo para insights más profundos?",
      description: "Estos dashboards son solo el comienzo. Mira lo que Sundae puede hacer con tus datos completos.",
      primary: "Reservar demo",
      secondary: "Explorar productos",
    },
  },
};

export default function CanvasPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale] ?? localizedCopy.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="chart" size="md" />
              <span>{copy.hero.badge}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              {copy.hero.title}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-[var(--text-supporting)] mb-4 max-w-3xl mx-auto">
              {copy.hero.description}
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="text-sm text-[var(--text-muted)] mb-8 max-w-3xl mx-auto">
              {copy.hero.subcopy}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  {copy.hero.primaryCta}
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                {copy.hero.secondaryCta}
              </Button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="max-w-6xl mx-auto">
            <div className="bg-[var(--navy-deep)] rounded-2xl shadow-2xl border border-[var(--border-default)] p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-default)]">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{copy.dashboardHeader.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{copy.dashboardHeader.updated}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs font-medium bg-[var(--surface-subtle)] text-[var(--text-secondary)] rounded hover:bg-slate-200">
                    {copy.dashboardHeader.export}
                  </button>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-[#60A5FA] rounded hover:bg-blue-200">
                    {copy.dashboardHeader.share}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {copy.kpis.map((kpi, i) => (
                  <div key={i} className="bg-[var(--surface-faint)] rounded-lg p-3">
                    <p className="text-xs text-[var(--text-muted)] mb-1">{kpi.label}</p>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
                    <p className={`text-xs font-medium ${kpi.positive ? "text-green-600" : "text-orange-600"}`}>{kpi.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{copy.charts.revenueTrend}</h4>
                  <div className="h-32 flex items-end space-x-1">
                    {[65, 72, 68, 80, 75, 88, 92, 85, 95, 100, 98, 105].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 border border-green-100">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{copy.charts.locations}</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Marina Mall", value: 100 },
                      { name: "Downtown", value: 85 },
                      { name: "JBR Walk", value: 72 },
                      { name: "City Centre", value: 68 },
                    ].map((loc, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-20 text-xs text-[var(--text-supporting)] font-medium truncate">{loc.name}</div>
                        <div className="flex-1 bg-slate-200 rounded-full h-4 overflow-hidden">
                          <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full" style={{ width: `${loc.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-white mb-4">{copy.preview.title}</h2>
            <p className="body-xl text-white/80 max-w-3xl mx-auto">{copy.preview.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.dashboardExamples.map((example) => (
              <Card key={example.title} variant="elevated" className={example.featured ? "border-blue-500/30 bg-white/5" : "bg-white/5"}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <SundaeIcon name={example.icon} size="lg" className="text-white" />
                  </div>
                  <CardTitle className="text-white">{example.title}</CardTitle>
                  <CardDescription className="text-white/70">{example.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-white/80">
                    {example.benefits.map((benefit) => (
                      <li key={benefit}>• {benefit}</li>
                    ))}
                  </ul>
                  <ul className="space-y-2 text-xs text-white/60">
                    {example.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.capabilities.map((capability) => (
              <Card key={capability.title} variant="elevated">
                <CardHeader>
                  <SundaeIcon name={capability.icon} size="xl" className="text-[#60A5FA]" />
                  <CardTitle className="text-[var(--text-primary)]">{capability.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[var(--text-supporting)]">{capability.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.whoItsFor.map((audience) => (
              <Card key={audience.title} variant="elevated">
                <CardHeader>
                  <SundaeIcon name={audience.icon} size="xl" className="text-[#60A5FA]" />
                  <CardTitle className="text-[var(--text-primary)]">{audience.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[var(--text-supporting)]">{audience.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.darkStrip.title}</h2>
          <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.darkStrip.subtitle}</p>
        </div>
      </section>

      <PageCTA title={copy.cta.title} description={copy.cta.description}>
        <Button variant="cta" size="lg" href="/demo">{copy.cta.primary}</Button>
        <Button variant="outline-light" size="lg" href="/product">{copy.cta.secondary}</Button>
      </PageCTA>
    </div>
  );
}
