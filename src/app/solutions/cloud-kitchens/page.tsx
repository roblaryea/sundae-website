"use client";

import { RevenueIntelligenceMockup } from "@/components/ui/MockupFrame";
import { SolutionPageLayout, type SolutionCopy } from "@/components/solutions/SolutionPageLayout";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_solutions_cloud_kitchens_page'

const localizedCopy: Record<"en" | "ar" | "fr" | "es", SolutionCopy> = {
  en: {
    badge: "For Cloud Kitchens & Virtual Brands",
    titleLine1: "Every platform.",
    titleLine2: "Every brand. One ledger.",
    description: "Live order, channel, and commission data across DoorDash, UberEats, Talabat, and your direct channels. Margin per platform, not just per brand.",
    primaryCta: "Book a Cloud Kitchen Walk-through",
    secondaryCta: "See Delivery Demo",
    problemsEyebrow: "WHERE CLOUD KITCHENS LOSE MARGIN",
    problemsTitle: "Where cloud kitchens lose margin",
    problemsDescription: "Commission stacks, channel chaos, no single view of which virtual brand is actually profitable.",
    challenges: [
      { title: "Commission eats the margin", description: "20–30% per platform per order. Net margin per channel is invisible — you optimize gross and lose money.", icon: "balance" },
      { title: "Six platforms, six dashboards", description: "DoorDash, UberEats, Talabat, Deliveroo, JustEat, your own — each with a different lens, none with the truth.", icon: "delivery" },
      { title: "Virtual brand performance opaque", description: "Five brands out of one kitchen — but which one actually contributes? Hidden by shared cost and shared throughput.", icon: "performance" },
      { title: "No view of platform-level health", description: "Toggle settings on UberEats moved last night. Conversion dropped 18%. You won't see it until next week.", icon: "watchtower" },
    ],
    howTitle: "How Sundae works for cloud kitchens",
    howDescription: "Channel-level margin, brand-level contribution, live operational health.",
    howSundaeHelps: [
      { title: "Net margin per platform, per brand", description: "Orders, commissions, packaging, allocated labor and food cost — to net margin at the channel × brand intersection. The truth no platform dashboard shows.", product: "Insights · Delivery + Profit", icon: "delivery" },
      { title: "Virtual brand contribution", description: "Cost-allocate fairly across virtual brands sharing one kitchen. The brand that looks busy may be subsidizing the one that's profitable.", product: "Insights · Item Profitability", icon: "performance" },
      { title: "Platform health monitoring", description: "Conversion rate, basket size, acceptance rate per platform — flagged when they drift. The toggle change shows up the next morning, not next week.", product: "Watchtower · Platforms", icon: "watchtower" },
      { title: "Live operational pacing", description: "Order volume, prep time, late-orders by hour. The kitchen sees the spike forming — not the post-mortem.", product: "Pulse", icon: "chart" },
    ],
    outcomesTitle: "What changes for the operator",
    outcomesDescription: "Real margin per channel, profitable brand mix, fewer platform surprises.",
    outcomes: [
      { title: "Stop subsidizing unprofitable channels", description: "Cut, renegotiate, or rebalance based on net margin — not order volume.", icon: "speed" },
      { title: "Kill brands that don't earn their kitchen", description: "Drop the virtual brand that looks busy but contributes nothing once cost is allocated.", icon: "owners" },
      { title: "Catch platform changes in 24 hours", description: "Toggle changes, ranking shifts, fee updates — surfaced the morning after, not next week.", icon: "performance" },
      { title: "Run a leaner kitchen", description: "Prep time, throughput, labor productivity per hour — visible while the shift is still running.", icon: "support" },
    ],
    ctaTitle: "See net margin per platform.",
    ctaDescription: "30 minutes. Your kitchens. The channel you might want to drop.",
    ctaButton: "Book a Cloud Kitchen Walk-through",
  },
  ar: {
    badge: "للمطابخ السحابية والعلامات الافتراضية",
    titleLine1: "كل منصة.",
    titleLine2: "كل علامة. دفتر واحد.",
    description: "بيانات طلب وقناة وعمولة حية عبر DoorDash وUberEats وطلبات وقنواتك المباشرة. هامش لكل منصة، لا فقط لكل علامة.",
    primaryCta: "احجز جولة مطبخ سحابي",
    secondaryCta: "شاهد عرض التوصيل",
    problemsEyebrow: "أين تخسر المطابخ السحابية الهامش",
    problemsTitle: "أين تخسر المطابخ السحابية الهامش",
    problemsDescription: "عمولات متراكمة، فوضى قنوات، لا عرض موحد لأي علامة افتراضية ربحية فعلاً.",
    challenges: [
      { title: "العمولة تأكل الهامش", description: "20–30% لكل منصة لكل طلب. صافي الهامش لكل قناة غير مرئي.", icon: "balance" },
      { title: "ست منصات، ست لوحات", description: "DoorDash، UberEats، طلبات، Deliveroo، JustEat، قناتك — كل واحدة بعدسة مختلفة، لا واحدة بالحقيقة.", icon: "delivery" },
      { title: "أداء العلامة الافتراضية غامض", description: "خمس علامات من مطبخ واحد — لكن أيها يساهم فعلاً؟ مخفي بتكلفة مشتركة وإنتاجية مشتركة.", icon: "performance" },
      { title: "لا عرض لصحة المنصة", description: "إعدادات UberEats تغيرت ليلة أمس. التحويل انخفض 18%. لن تراه حتى الأسبوع القادم.", icon: "watchtower" },
    ],
    howTitle: "كيف يعمل Sundae للمطابخ السحابية",
    howDescription: "هامش على مستوى القناة، مساهمة العلامة، صحة تشغيلية حية.",
    howSundaeHelps: [
      { title: "صافي الهامش لكل منصة ولكل علامة", description: "الطلبات والعمولات والتغليف والعمالة وتكلفة الطعام — إلى صافي الهامش عند تقاطع القناة × العلامة.", product: "Insights · Delivery + Profit", icon: "delivery" },
      { title: "مساهمة العلامة الافتراضية", description: "تخصيص تكلفة عادل عبر العلامات الافتراضية التي تشترك في مطبخ واحد.", product: "Insights · Item Profitability", icon: "performance" },
      { title: "مراقبة صحة المنصة", description: "معدل التحويل، حجم السلة، معدل القبول لكل منصة — تظهر عند الانحراف.", product: "Watchtower · Platforms", icon: "watchtower" },
      { title: "وتيرة تشغيلية حية", description: "حجم الطلبات، وقت التحضير، الطلبات المتأخرة بالساعة. المطبخ يرى الموجة تتشكل.", product: "Pulse", icon: "chart" },
    ],
    outcomesTitle: "ما يتغير للمشغّل",
    outcomesDescription: "هامش حقيقي لكل قناة، مزيج علامات ربحي، مفاجآت منصة أقل.",
    outcomes: [
      { title: "توقف عن دعم القنوات غير الربحية", description: "اقطع أو أعد التفاوض أو أعد التوازن بناءً على صافي الهامش لا حجم الطلبات.", icon: "speed" },
      { title: "تخلَّ عن علامات لا تستحق مطبخها", description: "أسقط العلامة الافتراضية التي تبدو مشغولة ولا تساهم بشيء بعد تخصيص التكلفة.", icon: "owners" },
      { title: "اكتشف تغييرات المنصة في 24 ساعة", description: "تغييرات التبديل، التصنيفات، الرسوم — تظهر في صباح اليوم التالي لا الأسبوع القادم.", icon: "performance" },
      { title: "أدر مطبخاً أنحف", description: "وقت التحضير، الإنتاجية، عمالة الساعة — مرئية بينما الوردية تجري.", icon: "support" },
    ],
    ctaTitle: "شاهد صافي الهامش لكل منصة.",
    ctaDescription: "30 دقيقة. مطابخك. القناة التي قد ترغب في إسقاطها.",
    ctaButton: "احجز جولة مطبخ سحابي",
  },
  fr: {
    badge: "Pour cuisines virtuelles et dark kitchens",
    titleLine1: "Chaque plateforme.",
    titleLine2: "Chaque marque. Un seul livre.",
    description: "Commandes, canaux et commissions live sur DoorDash, UberEats, Talabat et vos canaux directs. Marge par plateforme, pas seulement par marque.",
    primaryCta: "Réserver une visite cuisine virtuelle",
    secondaryCta: "Voir la démo delivery",
    problemsEyebrow: "OÙ LES DARK KITCHENS PERDENT LA MARGE",
    problemsTitle: "Où les dark kitchens perdent la marge",
    problemsDescription: "Empilement de commissions, chaos des canaux, aucune vue unifiée de quelle marque est réellement rentable.",
    challenges: [
      { title: "La commission mange la marge", description: "20–30% par plateforme par commande. La marge nette par canal est invisible.", icon: "balance" },
      { title: "Six plateformes, six dashboards", description: "DoorDash, UberEats, Talabat, Deliveroo, JustEat, le vôtre — chacun avec une lentille différente.", icon: "delivery" },
      { title: "Performance des marques virtuelles opaque", description: "Cinq marques d'une seule cuisine — laquelle contribue vraiment ?", icon: "performance" },
      { title: "Aucune vue de la santé plateforme", description: "Un toggle UberEats a bougé hier soir. La conversion a chuté de 18%. Vous le verrez la semaine prochaine.", icon: "watchtower" },
    ],
    howTitle: "Comment Sundae sert les cuisines virtuelles",
    howDescription: "Marge par canal, contribution par marque, santé opérationnelle live.",
    howSundaeHelps: [
      { title: "Marge nette par plateforme, par marque", description: "Commandes, commissions, emballage, coût alloué — à la marge nette canal × marque. La vérité que les dashboards plateforme ne montrent pas.", product: "Insights · Delivery + Profit", icon: "delivery" },
      { title: "Contribution par marque virtuelle", description: "Coût alloué équitablement entre marques virtuelles partageant une cuisine.", product: "Insights · Item Profitability", icon: "performance" },
      { title: "Santé plateforme surveillée", description: "Taux de conversion, panier moyen, taux d'acceptation par plateforme — signalés quand ça dérive.", product: "Watchtower · Platforms", icon: "watchtower" },
      { title: "Rythme opérationnel live", description: "Volume de commandes, temps de prep, retards à l'heure. La cuisine voit la vague se former.", product: "Pulse", icon: "chart" },
    ],
    outcomesTitle: "Ce qui change pour l'opérateur",
    outcomesDescription: "Marge réelle par canal, mix de marques rentable, moins de surprises plateforme.",
    outcomes: [
      { title: "Arrêtez de subventionner les canaux non rentables", description: "Coupez, renégociez ou rééquilibrez basé sur la marge nette — pas le volume.", icon: "speed" },
      { title: "Tuez les marques qui ne paient pas leur cuisine", description: "Lâchez la marque virtuelle qui semble occupée mais ne contribue à rien une fois le coût alloué.", icon: "owners" },
      { title: "Attrapez les changements plateforme en 24h", description: "Changements de toggle, ranking, frais — remontés le matin suivant.", icon: "performance" },
      { title: "Tournez une cuisine plus lean", description: "Temps de prep, débit, productivité main-d'œuvre — visibles pendant le service.", icon: "support" },
    ],
    ctaTitle: "Marge nette par plateforme.",
    ctaDescription: "30 minutes. Vos cuisines. Le canal que vous pourriez vouloir lâcher.",
    ctaButton: "Réserver une visite cuisine virtuelle",
  },
  es: {
    badge: "Para cocinas en la nube y marcas virtuales",
    titleLine1: "Cada plataforma.",
    titleLine2: "Cada marca. Un solo libro.",
    description: "Datos en vivo de pedidos, canal y comisión en DoorDash, UberEats, Rappi y tus canales directos. Margen por plataforma, no solo por marca.",
    primaryCta: "Reservar recorrido cocina en la nube",
    secondaryCta: "Ver demo de delivery",
    problemsEyebrow: "DÓNDE PIERDEN MARGEN",
    problemsTitle: "Dónde pierden margen las cocinas en la nube",
    problemsDescription: "Comisiones apiladas, caos de canales, sin vista unificada de qué marca virtual es realmente rentable.",
    challenges: [
      { title: "La comisión se come el margen", description: "20–30% por plataforma por pedido. El margen neto por canal es invisible.", icon: "balance" },
      { title: "Seis plataformas, seis dashboards", description: "DoorDash, UberEats, Rappi, Glovo, JustEat, el tuyo — cada uno con una lente distinta.", icon: "delivery" },
      { title: "Rendimiento de marca virtual opaco", description: "Cinco marcas de una sola cocina — ¿cuál contribuye realmente?", icon: "performance" },
      { title: "Sin vista de salud de plataforma", description: "Un toggle de UberEats cambió anoche. La conversión cayó 18%. Lo verás la próxima semana.", icon: "watchtower" },
    ],
    howTitle: "Cómo trabaja Sundae para cocinas en la nube",
    howDescription: "Margen por canal, contribución por marca, salud operativa en vivo.",
    howSundaeHelps: [
      { title: "Margen neto por plataforma y por marca", description: "Pedidos, comisiones, empaque, coste asignado — al margen neto en la intersección canal × marca.", product: "Insights · Delivery + Profit", icon: "delivery" },
      { title: "Contribución por marca virtual", description: "Coste asignado justamente entre marcas virtuales que comparten una cocina.", product: "Insights · Item Profitability", icon: "performance" },
      { title: "Salud de plataforma monitoreada", description: "Tasa de conversión, ticket medio, tasa de aceptación por plataforma — señalados al desviarse.", product: "Watchtower · Platforms", icon: "watchtower" },
      { title: "Ritmo operativo en vivo", description: "Volumen de pedidos, tiempo de preparación, atrasos por hora. La cocina ve la ola formándose.", product: "Pulse", icon: "chart" },
    ],
    outcomesTitle: "Qué cambia para el operador",
    outcomesDescription: "Margen real por canal, mix de marcas rentable, menos sorpresas de plataforma.",
    outcomes: [
      { title: "Deja de subsidiar canales no rentables", description: "Corta, renegocia o reequilibra basado en margen neto — no en volumen.", icon: "speed" },
      { title: "Mata marcas que no pagan su cocina", description: "Suelta la marca virtual que parece ocupada pero no contribuye una vez asignado el coste.", icon: "owners" },
      { title: "Atrapa cambios de plataforma en 24 horas", description: "Cambios de toggle, ranking, tarifas — saliendo la mañana siguiente.", icon: "performance" },
      { title: "Opera una cocina más lean", description: "Tiempo de preparación, throughput, productividad por hora — visible mientras el turno corre.", icon: "support" },
    ],
    ctaTitle: "Margen neto por plataforma.",
    ctaDescription: "30 minutos. Tus cocinas. El canal que podrías querer soltar.",
    ctaButton: "Reservar recorrido cocina en la nube",
  },
};

export default function CloudKitchensPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  return <SolutionPageLayout copy={copy} mockup={<RevenueIntelligenceMockup />} />;
}
