import capabilityCopy from '@/content/customer-story-capabilities.json';

import type { SundaeIconName } from '@/components/icons';
import type { WebsiteLocale } from '@/lib/i18n';
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy';
import { generatedLocalCopy } from '@/generated-locales/app_resources_page';

export type CaseStudy = {
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
    { segment: "Multi-Brand Restaurant Group · GCC", challenge: "Labor Cost Variance", description: "35-location restaurant group struggled with 18% labor cost variance across locations with no visibility into root causes or scheduling efficiency.", solution: ["Sundae Core for real-time labor dashboards", "Sundae Core for turnover and scheduling alerts", "Sundae Benchmarking for labor benchmarking"], outcomes: [{ metric: "Labor cost reduction", value: "5%" }, { metric: "Scheduling efficiency", value: "+12%" }, { metric: "Decision speed", value: "3x faster" }], icon: "franchise", color: "bg-[#FF5C4D]" },
    { segment: "Global Franchise · 150+ Locations", challenge: "Menu Pricing & Margin Erosion", description: "International franchise operator facing 8% food cost variance across regions with delayed insights on pricing effectiveness and discount abuse.", solution: ["Sundae Core for instant pricing analysis", "Sundae Core for margin tracking", "Sundae Benchmarking for category benchmarks"], outcomes: [{ metric: "Margin improvement", value: "+3.2%" }, { metric: "Discount abuse detected", value: "Early" }, { metric: "Pricing decisions", value: "Real-time" }], icon: "multiLocation", color: "bg-green-600" },
    { segment: "Cloud Kitchen Operator · Multi-City", challenge: "Operational Blind Spots", description: "Fast-growing cloud kitchen network with fragmented data across 8 delivery platforms, unable to unify performance metrics or detect vendor issues.", solution: ["Sundae Core for data integration", "Sundae Core for delivery performance tracking", "Sundae Core for unified decision views"], outcomes: [{ metric: "Data unification", value: "8 platforms" }, { metric: "Issue detection", value: "48hrs faster" }, { metric: "Revenue optimization", value: "+6%" }], icon: "kitchen", color: "bg-orange-600" },
    { segment: "Enterprise Hospitality Group · Regional", challenge: "Market Positioning", description: "Hospitality operator with limited visibility into competitor pricing, category trends, and market share across 22 locations in competitive markets.", solution: ["Sundae Watchtower for market intelligence", "Sundae Benchmarking for competitive benchmarking", "Sundae Core for market analysis"], outcomes: [{ metric: "Market share growth", value: "+2.3%" }, { metric: "Competitive response time", value: "Days → Hours" }, { metric: "Pricing optimization", value: "+4%" }], icon: "benchmarking", color: "bg-[#FF5C4D]" },
  ],
  ar: [
    { segment: "مجموعة مطاعم متعددة العلامات · الخليج", challenge: "تباين تكلفة العمالة", description: "مجموعة من 35 موقعاً كانت تعاني من تباين 18% في تكلفة العمالة دون رؤية واضحة للأسباب أو كفاءة الجدولة.", solution: ["Sundae Core للوحات عمالة لحظية", "Sundae Core لتنبيهات التغيير والجدولة", "Sundae Benchmarking للمقارنات المرجعية"], outcomes: [{ metric: "خفض تكلفة العمالة", value: "5%" }, { metric: "كفاءة الجدولة", value: "+12%" }, { metric: "سرعة القرار", value: "أسرع 3 مرات" }], icon: "franchise", color: "bg-[#FF5C4D]" },
    { segment: "امتياز عالمي · 150+ موقع", challenge: "تسعير القائمة وتآكل الهامش", description: "امتياز دولي يواجه تباين 8% في تكلفة الغذاء عبر المناطق مع تأخر في فهم فعالية التسعير والاستغلال.", solution: ["Sundae Core لتحليل التسعير الفوري", "Sundae Core لتتبع الهامش", "Sundae Benchmarking لمقارنات الفئات"], outcomes: [{ metric: "تحسن الهامش", value: "+3.2%" }, { metric: "كشف استغلال الخصومات", value: "مبكر" }, { metric: "قرارات التسعير", value: "لحظية" }], icon: "multiLocation", color: "bg-green-600" },
    { segment: "مشغل مطابخ سحابية · عدة مدن", challenge: "نقاط عمياء تشغيلية", description: "شبكة سريعة النمو من المطابخ السحابية ببيانات مجزأة عبر 8 منصات توصيل.", solution: ["Sundae Core لدمج البيانات", "Sundae Core لتتبع الأداء", "Sundae Core للوحات موحدة"], outcomes: [{ metric: "توحيد البيانات", value: "8 منصات" }, { metric: "كشف المشكلات", value: "أسرع 48 ساعة" }, { metric: "تحسين الإيرادات", value: "+6%" }], icon: "kitchen", color: "bg-orange-600" },
    { segment: "مجموعة ضيافة مؤسسية · إقليمية", challenge: "تموضع السوق", description: "مشغل ضيافة برؤية محدودة لتسعير المنافسين واتجاهات الفئات والحصة السوقية عبر 22 موقعًا.", solution: ["Sundae Watchtower لذكاء السوق", "Sundae Benchmarking للمقارنة", "Sundae Core لتحليل السوق"], outcomes: [{ metric: "نمو الحصة السوقية", value: "+2.3%" }, { metric: "زمن الاستجابة التنافسي", value: "من أيام إلى ساعات" }, { metric: "تحسين التسعير", value: "+4%" }], icon: "benchmarking", color: "bg-[#FF5C4D]" },
  ],
  fr: [
    { segment: "Groupe multi-marques · GCC", challenge: "Écarts de coût main-d'œuvre", description: "Un groupe de 35 sites subissait 18 % d'écart de coût main-d'œuvre sans visibilité sur les causes racines.", solution: ["Sundae Core pour des tableaux de bord main-d'œuvre en temps réel", "Sundae Core pour les alertes de planification", "Sundae Benchmarking pour le benchmarking"], outcomes: [{ metric: "Réduction du coût main-d'œuvre", value: "5%" }, { metric: "Efficacité de planification", value: "+12%" }, { metric: "Vitesse de décision", value: "3x plus rapide" }], icon: "franchise", color: "bg-[#FF5C4D]" },
    { segment: "Franchise mondiale · 150+ sites", challenge: "Tarification et érosion de marge", description: "Un opérateur international faisait face à 8 % d'écart de coût alimentaire par région.", solution: ["Sundae Core pour l'analyse de tarification", "Sundae Core pour le suivi de marge", "Sundae Benchmarking pour les benchmarks"], outcomes: [{ metric: "Amélioration de marge", value: "+3.2%" }, { metric: "Abus de remise détecté", value: "Tôt" }, { metric: "Décisions de prix", value: "Temps réel" }], icon: "multiLocation", color: "bg-green-600" },
    { segment: "Cloud kitchen · multi-ville", challenge: "Angles morts opérationnels", description: "Une réseau de dark kitchens en forte croissance avec des données fragmentées sur 8 plateformes.", solution: ["Sundae Core pour l'intégration", "Sundae Core pour le suivi de performance", "Sundae Core pour des dashboards unifiés"], outcomes: [{ metric: "Unification des données", value: "8 plateformes" }, { metric: "Détection des problèmes", value: "48h plus vite" }, { metric: "Optimisation du revenu", value: "+6%" }], icon: "kitchen", color: "bg-orange-600" },
    { segment: "Groupe hospitality enterprise · régional", challenge: "Positionnement marché", description: "Visibilité limitée sur les prix concurrents, les tendances de catégorie et la part de marché.", solution: ["Sundae Watchtower pour l'intelligence marché", "Sundae Benchmarking pour le benchmarking", "Sundae Core pour l'analyse de marché"], outcomes: [{ metric: "Croissance de part de marché", value: "+2.3%" }, { metric: "Temps de réponse concurrentiel", value: "Jours → Heures" }, { metric: "Optimisation de prix", value: "+4%" }], icon: "benchmarking", color: "bg-[#FF5C4D]" },
  ],
  es: [
    { segment: "Grupo multimarca · GCC", challenge: "Variación de costo laboral", description: "Un grupo de 35 locales sufría una variación del 18% en costo laboral sin visibilidad sobre las causas raíz.", solution: ["Sundae Core para dashboards laborales en tiempo real", "Sundae Core para alertas de programación", "Sundae Benchmarking para benchmarking"], outcomes: [{ metric: "Reducción de costo laboral", value: "5%" }, { metric: "Eficiencia de programación", value: "+12%" }, { metric: "Velocidad de decisión", value: "3x más rápida" }], icon: "franchise", color: "bg-[#FF5C4D]" },
    { segment: "Franquicia global · 150+ locales", challenge: "Precios de menú y erosión de margen", description: "Operador internacional con variación del 8% en costo de alimentos entre regiones.", solution: ["Sundae Core para análisis de precios", "Sundae Core para seguimiento de margen", "Sundae Benchmarking para benchmarks"], outcomes: [{ metric: "Mejora de margen", value: "+3.2%" }, { metric: "Abuso de descuentos detectado", value: "Temprano" }, { metric: "Decisiones de precio", value: "Tiempo real" }], icon: "multiLocation", color: "bg-green-600" },
    { segment: "Cocina cloud · multi-ciudad", challenge: "Puntos ciegos operativos", description: "Red de cloud kitchens con datos fragmentados en 8 plataformas de delivery.", solution: ["Sundae Core para integración", "Sundae Core para seguimiento de rendimiento", "Sundae Core para dashboards unificados"], outcomes: [{ metric: "Unificación de datos", value: "8 plataformas" }, { metric: "Detección de problemas", value: "48h más rápido" }, { metric: "Optimización de ingresos", value: "+6%" }], icon: "kitchen", color: "bg-orange-600" },
    { segment: "Grupo hospitality enterprise · regional", challenge: "Posicionamiento de mercado", description: "Visibilidad limitada de precios de competidores, tendencias y cuota de mercado.", solution: ["Sundae Watchtower para inteligencia de mercado", "Sundae Benchmarking para benchmarking", "Sundae Core para análisis"], outcomes: [{ metric: "Crecimiento de cuota", value: "+2.3%" }, { metric: "Tiempo de respuesta", value: "Días → Horas" }, { metric: "Optimización de precios", value: "+4%" }], icon: "benchmarking", color: "bg-[#FF5C4D]" },
  ],
} as const;

export const customerStoryIds = ['gcc-labor-variance', 'franchise-menu-margin', 'cloud-kitchen-delivery', 'hospitality-market-context'] as const;

export function getCustomerStories(locale: WebsiteLocale) {
  const stories = localizedCaseStudies[locale as keyof typeof localizedCaseStudies]
    ?? getGeneratedLocalCopy(localizedCaseStudies, generatedLocalCopy.localizedCaseStudies, locale)
    ?? localizedCaseStudies.en;
  // These labels describe the capabilities named in each original story, not package eligibility.
  // Keep the reported results and evidence limitations separate from product naming.
  const labels = capabilityCopy[locale as keyof typeof capabilityCopy];
  const products = [
    ['Sundae Core', 'Sundae Core', 'Benchmarks'],
    ['Sundae Core', 'Sundae Core', 'Benchmarks'],
    ['Sundae Core', 'Sundae Core', 'Sundae Core'],
    ['Watchtower', 'Benchmarks', 'Sundae Core'],
  ];
  return stories.map((story, index) => ({ ...story, id: customerStoryIds[index],
    solution: products[index].map((product, line) => `${product} · ${labels[index * 3 + line]}`),
  }));
}
