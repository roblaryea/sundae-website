import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

type CaseStudy = {
  segment: string;
  challenge: string;
  description: string;
  solution: string[];
  outcomes: { metric: string; value: string }[];
  icon: SundaeIconName;
  color: string;
};

const localizedCaseStudies: Record<string, CaseStudy[]> = {
  en: [
    { segment: "Multi-Brand Restaurant Group · GCC", challenge: "Labor Cost Variance", description: "35-location restaurant group struggled with 18% labor cost variance across locations with no visibility into root causes or scheduling efficiency.", solution: ["Sundae Core for real-time labor dashboards", "Sundae Core for turnover and scheduling alerts", "Sundae Report for labor benchmarking"], outcomes: [{ metric: "Labor cost reduction", value: "5%" }, { metric: "Scheduling efficiency", value: "+12%" }, { metric: "Decision speed", value: "3x faster" }], icon: "franchise", color: "bg-[#1C47FF]" },
    { segment: "Global Franchise · 150+ Locations", challenge: "Menu Pricing & Margin Erosion", description: "International franchise operator facing 8% food cost variance across regions with delayed insights on pricing effectiveness and discount abuse.", solution: ["Sundae Core for instant pricing analysis", "Sundae Core for margin tracking", "Sundae Report for category benchmarks"], outcomes: [{ metric: "Margin improvement", value: "+3.2%" }, { metric: "Discount abuse detected", value: "Early" }, { metric: "Pricing decisions", value: "Real-time" }], icon: "multiLocation", color: "bg-green-600" },
    { segment: "Cloud Kitchen Operator · Multi-City", challenge: "Operational Blind Spots", description: "Fast-growing cloud kitchen network with fragmented data across 8 delivery platforms, unable to unify performance metrics or detect vendor issues.", solution: ["Sundae Scout for data integration", "Sundae Core for delivery performance tracking", "Sundae Core for unified dashboards"], outcomes: [{ metric: "Data unification", value: "8 platforms" }, { metric: "Issue detection", value: "48hrs faster" }, { metric: "Revenue optimization", value: "+6%" }], icon: "kitchen", color: "bg-orange-600" },
    { segment: "Enterprise Hospitality Group · Regional", challenge: "Market Positioning", description: "Hospitality operator with limited visibility into competitor pricing, category trends, and market share across 22 locations in competitive markets.", solution: ["Sundae Watchtower for market intelligence", "Sundae Report for competitive benchmarking", "Sundae Core for market analysis"], outcomes: [{ metric: "Market share growth", value: "+2.3%" }, { metric: "Competitive response time", value: "Days → Hours" }, { metric: "Pricing optimization", value: "+4%" }], icon: "benchmarking", color: "bg-purple-600" },
  ],
  ar: [
    { segment: "مجموعة مطاعم متعددة العلامات · الخليج", challenge: "تباين تكلفة العمالة", description: "مجموعة من 35 موقعاً كانت تعاني من تباين 18% في تكلفة العمالة دون رؤية واضحة للأسباب أو كفاءة الجدولة.", solution: ["Sundae Core للوحات عمالة لحظية", "Sundae Core لتنبيهات التغيير والجدولة", "Sundae Report للمقارنات المرجعية"], outcomes: [{ metric: "خفض تكلفة العمالة", value: "5%" }, { metric: "كفاءة الجدولة", value: "+12%" }, { metric: "سرعة القرار", value: "أسرع 3 مرات" }], icon: "franchise", color: "bg-[#1C47FF]" },
    { segment: "امتياز عالمي · 150+ موقع", challenge: "تسعير القائمة وتآكل الهامش", description: "امتياز دولي يواجه تباين 8% في تكلفة الغذاء عبر المناطق مع تأخر في فهم فعالية التسعير والاستغلال.", solution: ["Sundae Core لتحليل التسعير الفوري", "Sundae Core لتتبع الهامش", "Sundae Report لمقارنات الفئات"], outcomes: [{ metric: "تحسن الهامش", value: "+3.2%" }, { metric: "كشف استغلال الخصومات", value: "مبكر" }, { metric: "قرارات التسعير", value: "لحظية" }], icon: "multiLocation", color: "bg-green-600" },
    { segment: "مشغل مطابخ سحابية · عدة مدن", challenge: "نقاط عمياء تشغيلية", description: "شبكة سريعة النمو من المطابخ السحابية ببيانات مجزأة عبر 8 منصات توصيل.", solution: ["Sundae Scout لدمج البيانات", "Sundae Core لتتبع الأداء", "Sundae Core للوحات موحدة"], outcomes: [{ metric: "توحيد البيانات", value: "8 منصات" }, { metric: "كشف المشكلات", value: "أسرع 48 ساعة" }, { metric: "تحسين الإيرادات", value: "+6%" }], icon: "kitchen", color: "bg-orange-600" },
    { segment: "مجموعة ضيافة مؤسسية · إقليمية", challenge: "تموضع السوق", description: "مشغل ضيافة برؤية محدودة لتسعير المنافسين واتجاهات الفئات والحصة السوقية عبر 22 موقعًا.", solution: ["Sundae Watchtower لذكاء السوق", "Sundae Report للمقارنة", "Sundae Core لتحليل السوق"], outcomes: [{ metric: "نمو الحصة السوقية", value: "+2.3%" }, { metric: "زمن الاستجابة التنافسي", value: "من أيام إلى ساعات" }, { metric: "تحسين التسعير", value: "+4%" }], icon: "benchmarking", color: "bg-purple-600" },
  ],
  fr: [
    { segment: "Groupe multi-marques · GCC", challenge: "Ecarts de cout main-d'oeuvre", description: "Un groupe de 35 sites subissait 18 % d ecart de cout main-d'oeuvre sans visibilite sur les causes racines.", solution: ["Sundae Core pour des tableaux de bord main-d'oeuvre en temps reel", "Sundae Core pour les alertes de planification", "Sundae Report pour le benchmarking"], outcomes: [{ metric: "Reduction du cout main-d'oeuvre", value: "5%" }, { metric: "Efficacite de planification", value: "+12%" }, { metric: "Vitesse de decision", value: "3x plus rapide" }], icon: "franchise", color: "bg-[#1C47FF]" },
    { segment: "Franchise mondiale · 150+ sites", challenge: "Tarification et erosion de marge", description: "Un operateur international faisait face à 8 % d ecart de cout alimentaire par region.", solution: ["Sundae Core pour l analyse de tarification", "Sundae Core pour le suivi de marge", "Sundae Report pour les benchmarks"], outcomes: [{ metric: "Amelioration de marge", value: "+3.2%" }, { metric: "Abus de remise detecte", value: "Tôt" }, { metric: "Decisions de prix", value: "Temps reel" }], icon: "multiLocation", color: "bg-green-600" },
    { segment: "Cloud kitchen · multi-ville", challenge: "Angles morts operationnels", description: "Une reseau de dark kitchens en forte croissance avec des donnees fragmentees sur 8 plateformes.", solution: ["Sundae Scout pour l integration", "Sundae Core pour le suivi de performance", "Sundae Core pour des dashboards unifies"], outcomes: [{ metric: "Unification des donnees", value: "8 plateformes" }, { metric: "Detection des problemes", value: "48h plus vite" }, { metric: "Optimisation du revenu", value: "+6%" }], icon: "kitchen", color: "bg-orange-600" },
    { segment: "Groupe hospitality enterprise · regional", challenge: "Positionnement marche", description: "Visibilite limitee sur les prix concurrents, les tendances de categorie et la part de marche.", solution: ["Sundae Watchtower pour l intelligence marche", "Sundae Report pour le benchmarking", "Sundae Core pour l analyse de marche"], outcomes: [{ metric: "Croissance de part de marche", value: "+2.3%" }, { metric: "Temps de reponse concurrentiel", value: "Jours → Heures" }, { metric: "Optimisation de prix", value: "+4%" }], icon: "benchmarking", color: "bg-purple-600" },
  ],
  es: [
    { segment: "Grupo multimarca · GCC", challenge: "Variacion de costo laboral", description: "Un grupo de 35 locales sufria una variacion del 18% en costo laboral sin visibilidad sobre las causas raiz.", solution: ["Sundae Core para dashboards laborales en tiempo real", "Sundae Core para alertas de programacion", "Sundae Report para benchmarking"], outcomes: [{ metric: "Reduccion de costo laboral", value: "5%" }, { metric: "Eficiencia de programacion", value: "+12%" }, { metric: "Velocidad de decision", value: "3x mas rapida" }], icon: "franchise", color: "bg-[#1C47FF]" },
    { segment: "Franquicia global · 150+ locales", challenge: "Precios de menu y erosion de margen", description: "Operador internacional con variacion del 8% en costo de alimentos entre regiones.", solution: ["Sundae Core para analisis de precios", "Sundae Core para seguimiento de margen", "Sundae Report para benchmarks"], outcomes: [{ metric: "Mejora de margen", value: "+3.2%" }, { metric: "Abuso de descuentos detectado", value: "Temprano" }, { metric: "Decisiones de precio", value: "Tiempo real" }], icon: "multiLocation", color: "bg-green-600" },
    { segment: "Cocina cloud · multi-ciudad", challenge: "Puntos ciegos operativos", description: "Red de cloud kitchens con datos fragmentados en 8 plataformas de delivery.", solution: ["Sundae Scout para integracion", "Sundae Core para seguimiento de rendimiento", "Sundae Core para dashboards unificados"], outcomes: [{ metric: "Unificacion de datos", value: "8 plataformas" }, { metric: "Deteccion de problemas", value: "48h mas rapido" }, { metric: "Optimizacion de ingresos", value: "+6%" }], icon: "kitchen", color: "bg-orange-600" },
    { segment: "Grupo hospitality enterprise · regional", challenge: "Posicionamiento de mercado", description: "Visibilidad limitada de precios de competidores, tendencias y cuota de mercado.", solution: ["Sundae Watchtower para inteligencia de mercado", "Sundae Report para benchmarking", "Sundae Core para analisis"], outcomes: [{ metric: "Crecimiento de cuota", value: "+2.3%" }, { metric: "Tiempo de respuesta", value: "Dias → Horas" }, { metric: "Optimizacion de precios", value: "+4%" }], icon: "benchmarking", color: "bg-purple-600" },
  ],
} as const;

const localizedResourcesUi = {
  en: {
    productLinks: [
      { name: 'Sundae Report', href: '/report' },
      { name: 'Sundae Core', href: '/nexus' },
      { name: 'Sundae Insights', href: '/insights' },
      { name: 'Sundae Canvas', href: '/canvas' },
    ],
    newsletterPlaceholder: 'Enter your email',
  },
  ar: {
    productLinks: [
      { name: 'Sundae Report', href: '/report' },
      { name: 'Sundae Core', href: '/nexus' },
      { name: 'Sundae Insights', href: '/insights' },
      { name: 'Sundae Canvas', href: '/canvas' },
    ],
    newsletterPlaceholder: 'البريد الإلكتروني',
  },
  fr: {
    productLinks: [
      { name: 'Sundae Report', href: '/report' },
      { name: 'Sundae Core', href: '/nexus' },
      { name: 'Sundae Insights', href: '/insights' },
      { name: 'Sundae Canvas', href: '/canvas' },
    ],
    newsletterPlaceholder: 'Votre email',
  },
  es: {
    productLinks: [
      { name: 'Sundae Report', href: '/report' },
      { name: 'Sundae Core', href: '/nexus' },
      { name: 'Sundae Insights', href: '/insights' },
      { name: 'Sundae Canvas', href: '/canvas' },
    ],
    newsletterPlaceholder: 'Tu correo electrónico',
  },
} as const;

export default function ResourcesPage() {
  const { locale, messages } = useWebsiteI18n();
  const copy = messages.pages.resources;
  const caseStudies = localizedCaseStudies[locale] ?? localizedCaseStudies.en;
  const ui = localizedResourcesUi[locale] ?? localizedResourcesUi.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <SundaeIcon name="document" size="md" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
            {copy.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-supporting)] mb-8 max-w-4xl mx-auto">
            {copy.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                {copy.getStarted}
              </Button>
            </Link>
            <Link href="/report">
              <Button variant="outline-light" size="lg">
                {copy.freeReport}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
              {copy.caseStudies}
            </h2>
            <p className="text-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              {copy.caseStudiesDescription}
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-4">
              {copy.caseStudiesNote}
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 ${study.color} rounded-lg flex items-center justify-center`}>
                          <SundaeIcon name={study.icon} size="lg" className="text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-[var(--text-muted)] font-medium uppercase">{copy.segment}</div>
                          <div className="font-semibold text-[var(--text-primary)]">{study.segment}</div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-bold text-[var(--text-secondary)] mb-2">{copy.challenge}</div>
                        <div className="text-lg font-bold text-[var(--text-primary)] mb-2">{study.challenge}</div>
                        <p className="text-[var(--text-supporting)] leading-relaxed">{study.description}</p>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-[var(--text-secondary)] mb-3">{copy.solution}</div>
                      <ul className="space-y-2">
                        {study.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-[#60A5FA] mt-1">•</span>
                            <span className="text-[var(--text-secondary)]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-[var(--text-secondary)] mb-3">{copy.outcomes}</div>
                      <div className="space-y-3">
                        {study.outcomes.map((outcome, idx) => (
                          <div key={idx} className="bg-green-500/10 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-400 mb-1">{outcome.value}</div>
                            <div className="text-sm text-[var(--text-secondary)]">{outcome.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[var(--text-supporting)] mb-6">{copy.exploreProducts}</p>
          <div className="flex flex-wrap gap-4 justify-center">
              {ui.productLinks.map((product) => (
                <Link key={product.name} href={product.href}>
                  <Button variant="outline-light" size="sm">
                    {product.name} →
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <SundaeIcon name="forge" size="xl" className="text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {copy.toolsTitle}
          </h2>
          <p className="text-xl text-[var(--text-supporting)] mb-8 max-w-2xl mx-auto">
            {copy.toolsDescription}
          </p>
          <Link href="/tools">
            <Button variant="primary" size="lg">
              {copy.exploreTools} →
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {copy.stayUpdated}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {copy.newsletterDescription}
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder={ui.newsletterPlaceholder}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--navy-deep)]/10 border border-[var(--border-emphasis)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--text-muted)]"
              />
              <Button variant="cta" size="lg">
                {copy.subscribe}
              </Button>
            </div>
            <p className="text-xs opacity-75 mt-4">
              {copy.privacyNote}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            {copy.ctaTitle}
          </h2>
          <p className="text-xl text-[var(--text-supporting)] mb-8">
            {copy.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                {copy.bookDemo}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline-light" size="lg">
                {copy.contactSales}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
