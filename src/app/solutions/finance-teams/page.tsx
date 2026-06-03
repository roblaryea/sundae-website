"use client";

import { ThemedShot } from "@/components/ui/ThemedShot";
import { SolutionPageLayout, type SolutionCopy } from "@/components/solutions/SolutionPageLayout";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_solutions_finance_teams_page'

const localizedCopy: Record<"en" | "ar" | "fr" | "es", SolutionCopy> = {
  en: {
    badge: "For Finance & FP&A",
    titleLine1: "Close faster.",
    titleLine2: "Explain everything.",
    description: "Margin variance the day it happens. Shift-level labor cost. Every dollar traced to the event that moved it.",
    primaryCta: "Book a Finance Walk-through",
    secondaryCta: "See Finance Demo",
    problemsEyebrow: "WHERE THE FUNCTION LOSES TIME",
    problemsTitle: "Where the finance function loses time",
    problemsDescription: "Three-day closes, manual reconciliations, variance that's already booked.",
    challenges: [
      { title: "Close cycles measured in days", description: "By the time the books close, the cost has already been paid. Decisions arrive late.", icon: "benchmarking" },
      { title: "Variance with no root cause", description: "You can see margin moved. You can't see whether it was discounts, labor, mix, or waste.", icon: "balance" },
      { title: "Hand-stitched POS exports", description: "Half the close cycle is people gluing spreadsheets together — not analysis.", icon: "integration" },
      { title: "No forward visibility on EBITDA", description: "The forecast is built on last quarter's data. The board asks about next quarter.", icon: "forecasting" },
    ],
    howTitle: "How Sundae works for the finance function",
    howDescription: "Live margins, root-cause variance, defendable forecasts.",
    howSundaeHelps: [
      { title: "Live margin intelligence", description: "Net revenue, food cost %, labor %, and contribution margin update by shift — not by month. Variance flagged the moment it opens.", product: "Insights · Revenue + Profit", icon: "chart" },
      { title: "Variance with attribution", description: "Click a margin gap → see the event that caused it: a void run, a labor over-coverage, a price test, a delivery commission spike.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Automated POS reconciliation", description: "POS, labor, inventory, accounting — unified into one ledger so close cycles run in hours, not days.", product: "Sundae Core", icon: "integration" },
      { title: "Forecasts the board can defend", description: "14–90 day EBITDA projections layered with market signal, self-correcting on weekly delivery.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "What changes for finance",
    outcomesDescription: "Faster close, sharper variance, defendable forecasts.",
    outcomes: [
      { title: "Cut close-cycle from days to hours", description: "Books reconcile continuously. Month-end becomes a review, not a rebuild.", icon: "speed" },
      { title: "Catch margin leak in the shift", description: "Voids, comps, over-coverage — flagged at the location while there's still time to act.", icon: "owners" },
      { title: "Audit-grade traceability", description: "Every metric back to source. Every variance back to event. No black-box numbers.", icon: "performance" },
      { title: "Forecasts you sign your name to", description: "Foresight reasons over operating data + market signal — and tells you its confidence band.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "BACKED BY SUNDAE CREW",
      title: "Multi-region payroll readiness for month-end close.",
      description: "Crew's payroll engine runs the same readiness check across US, Canada, UK, EU, and GCC — statutory exports (NACHA · EFT · HMRC RTI · SEPA · WPS) and year-end forms generated per jurisdiction, with AI-explained cycle previews and proof packs per close. Finance closes the books on the same evidence the payroll team submits — no per-region scramble, no spreadsheet bridges between countries.",
      ctaText: "Explore Sundae Crew",
    },
    ctaTitle: "See your margin in motion.",
    ctaDescription: "30 minutes. Your data. What Sundae would actually change for the finance function.",
    ctaButton: "Book a Finance Walk-through",
  },
  ar: {
    badge: "للمالية و FP&A",
    titleLine1: "أقفل أسرع.",
    titleLine2: "اشرح كل شيء.",
    description: "تباين الهامش لحظياً. تكلفة عمالة على مستوى الوردية. كل دولار يُتتبع إلى الحدث الذي حركه.",
    primaryCta: "احجز جولة مالية",
    secondaryCta: "شاهد عرض المالية",
    problemsEyebrow: "أين تخسر الإدارة المالية الوقت",
    problemsTitle: "أين تخسر الإدارة المالية الوقت",
    problemsDescription: "إقفالات بثلاثة أيام، تسويات يدوية، تباين تم تسجيله بالفعل.",
    challenges: [
      { title: "دورات إقفال بأيام", description: "حين تُقفل الكتب، التكلفة سُددت. القرارات تصل متأخرة.", icon: "benchmarking" },
      { title: "تباين بلا سبب جذري", description: "ترى الهامش تحرك. لا ترى إن كان الخصم أم العمالة أم المزيج أم الهدر.", icon: "balance" },
      { title: "تصديرات POS مرقعة يدوياً", description: "نصف دورة الإقفال أناس يلصقون جداول بيانات — لا تحليل.", icon: "integration" },
      { title: "لا رؤية مستقبلية لـ EBITDA", description: "التوقع مبني على ربع مضى. المجلس يسأل عن الربع التالي.", icon: "forecasting" },
    ],
    howTitle: "كيف يعمل Sundae للإدارة المالية",
    howDescription: "هوامش حية، تباين بأسباب جذرية، توقعات قابلة للدفاع.",
    howSundaeHelps: [
      { title: "ذكاء هامش حي", description: "صافي الإيرادات، نسبة تكلفة الطعام والعمالة، وهامش المساهمة تتحدث بالوردية — لا بالشهر.", product: "Insights · Revenue + Profit", icon: "chart" },
      { title: "تباين مع إسناد", description: "انقر على فجوة هامش → شاهد الحدث الذي سببها: تجاوزات، أو تكلفة عمالة زائدة، أو اختبار تسعير.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "تسوية POS تلقائية", description: "POS وعمالة ومخزون ومحاسبة — موحدة في دفتر واحد لتجري دورات الإقفال بساعات لا أيام.", product: "Sundae Core", icon: "integration" },
      { title: "توقعات يدافع عنها المجلس", description: "إسقاطات EBITDA لـ 14–90 يوماً مع إشارات السوق، تصحح ذاتها أسبوعياً.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "ما يتغير للمالية",
    outcomesDescription: "إقفال أسرع، تباين أحدّ، توقعات قابلة للدفاع.",
    outcomes: [
      { title: "اختصر دورة الإقفال إلى ساعات", description: "الكتب تُسوّى باستمرار. نهاية الشهر تصبح مراجعة، لا إعادة بناء.", icon: "speed" },
      { title: "اكتشف تسرب الهامش في الوردية", description: "تجاوزات وتعويضات وعمالة زائدة — تظهر في الموقع وهناك وقت للتصرف.", icon: "owners" },
      { title: "تتبع بدرجة مدقق حسابات", description: "كل مقياس إلى المصدر. كل تباين إلى حدث. لا أرقام صندوق أسود.", icon: "performance" },
      { title: "توقعات توقّع عليها باسمك", description: "Foresight يستدل من البيانات التشغيلية وإشارات السوق ويعطيك نطاق الثقة.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "مدعوم بـ Sundae Crew",
      title: "جاهزية رواتب متعددة المناطق لإغلاق نهاية الشهر.",
      description: "محرك رواتب Crew يجري نفس فحص الجاهزية عبر الولايات المتحدة وكندا والمملكة المتحدة والاتحاد الأوروبي ودول الخليج — التصديرات القانونية (NACHA · EFT · HMRC RTI · SEPA · WPS) ونماذج نهاية السنة تُولَّد لكل ولاية قضائية، مع معاينة دورة بشرح ذكي وحزم إثبات لكل إغلاق. المالية تُغلق الكتب على نفس الدليل الذي يقدّمه فريق الرواتب — بدون تسرّع إقليمي، بدون جسور Excel بين الدول.",
      ctaText: "اكتشف Sundae Crew",
    },
    ctaTitle: "شاهد هامشك يتحرك.",
    ctaDescription: "30 دقيقة. بياناتك. ما الذي سيتغير فعلياً للإدارة المالية.",
    ctaButton: "احجز جولة مالية",
  },
  fr: {
    badge: "Pour la finance & FP&A",
    titleLine1: "Clôturez plus vite.",
    titleLine2: "Expliquez tout.",
    description: "Variance de marge en temps réel. Coût main-d'œuvre par service. Chaque euro tracé à l'événement qui l'a déplacé.",
    primaryCta: "Réserver une visite finance",
    secondaryCta: "Voir la démo finance",
    problemsEyebrow: "OÙ LA FONCTION PERD DU TEMPS",
    problemsTitle: "Où la fonction finance perd du temps",
    problemsDescription: "Clôtures de trois jours, rapprochements manuels, variances déjà passées.",
    challenges: [
      { title: "Cycles de clôture en jours", description: "Quand les livres ferment, la dépense est déjà payée. Les décisions arrivent en retard.", icon: "benchmarking" },
      { title: "Variance sans cause racine", description: "Vous voyez la marge bouger. Pas si c'est remises, main-d'œuvre, mix ou pertes.", icon: "balance" },
      { title: "Exports POS bricolés", description: "La moitié du cycle de clôture, ce sont des gens qui collent des tableurs.", icon: "integration" },
      { title: "Aucune visibilité sur l'EBITDA à venir", description: "La prévision repose sur le trimestre passé. Le conseil pose les questions du suivant.", icon: "forecasting" },
    ],
    howTitle: "Comment Sundae sert la finance",
    howDescription: "Marges live, variance avec cause racine, prévisions défendables.",
    howSundaeHelps: [
      { title: "Marge live", description: "Revenu net, coût matière %, main-d'œuvre %, marge de contribution — par service, pas par mois.", product: "Insights · Revenue + Profit", icon: "chart" },
      { title: "Variance attribuée", description: "Cliquez un écart → voyez l'événement qui l'a causé : annulations, sur-effectif, test de prix, pic de commission delivery.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Rapprochement POS automatisé", description: "POS, main-d'œuvre, stocks, comptabilité — un seul livre, clôtures en heures plutôt qu'en jours.", product: "Sundae Core", icon: "integration" },
      { title: "Prévisions que le conseil accepte", description: "Projections EBITDA 14–90 jours avec signal marché, auto-corrigées chaque semaine.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "Ce qui change pour la finance",
    outcomesDescription: "Clôture plus rapide, variance plus nette, prévisions défendables.",
    outcomes: [
      { title: "Cycle de clôture : jours → heures", description: "Les livres se rapprochent en continu. La fin de mois devient une revue, pas une reconstruction.", icon: "speed" },
      { title: "Détectez la fuite de marge dans le service", description: "Annulations, comps, sur-couverture — signalés au site quand il reste du temps pour agir.", icon: "owners" },
      { title: "Traçabilité de niveau audit", description: "Chaque métrique à la source. Chaque variance à l'événement. Pas de boîte noire.", icon: "performance" },
      { title: "Prévisions que vous signez", description: "Foresight raisonne sur vos données + signal marché — avec son intervalle de confiance.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "ALIMENTÉ PAR SUNDAE CREW",
      title: "Readiness paie multi-régions pour la clôture mensuelle.",
      description: "Le moteur paie Crew fait passer le même check de readiness sur États-Unis, Canada, Royaume-Uni, UE et GCC — exports statutaires (NACHA · EFT · HMRC RTI · SEPA · WPS) et formulaires fin d'année générés par juridiction, avec aperçu cycle expliqué par IA et proof packs par close. La finance ferme les livres sur les mêmes preuves que l'équipe paie soumet — pas de bousculade par région, pas de ponts tableurs entre pays.",
      ctaText: "Découvrir Sundae Crew",
    },
    ctaTitle: "Voyez votre marge en mouvement.",
    ctaDescription: "30 minutes. Vos données. Ce que Sundae changerait concrètement pour la finance.",
    ctaButton: "Réserver une visite finance",
  },
  es: {
    badge: "Para finanzas & FP&A",
    titleLine1: "Cierra más rápido.",
    titleLine2: "Explica todo.",
    description: "Variación de margen el día que ocurre. Coste de personal por turno. Cada dólar trazado al evento que lo movió.",
    primaryCta: "Reservar recorrido financiero",
    secondaryCta: "Ver demo de finanzas",
    problemsEyebrow: "DÓNDE SE PIERDE EL TIEMPO",
    problemsTitle: "Dónde pierde tiempo la función financiera",
    problemsDescription: "Cierres de tres días, conciliaciones manuales, varianza que ya quedó registrada.",
    challenges: [
      { title: "Ciclos de cierre en días", description: "Cuando los libros cierran, el coste ya se pagó. Las decisiones llegan tarde.", icon: "benchmarking" },
      { title: "Varianza sin causa raíz", description: "Ves que el margen se movió. No si fueron descuentos, personal, mix o merma.", icon: "balance" },
      { title: "Exportes POS cosidos a mano", description: "Medio ciclo de cierre son personas pegando hojas — no análisis.", icon: "integration" },
      { title: "Sin visibilidad de EBITDA por delante", description: "El forecast se basa en el trimestre pasado. El consejo pregunta por el siguiente.", icon: "forecasting" },
    ],
    howTitle: "Cómo trabaja Sundae para finanzas",
    howDescription: "Márgenes en vivo, varianza con causa raíz, pronósticos defendibles.",
    howSundaeHelps: [
      { title: "Margen en vivo", description: "Ingreso neto, coste alimentos %, personal %, margen de contribución — por turno, no por mes.", product: "Insights · Revenue + Profit", icon: "chart" },
      { title: "Varianza atribuida", description: "Haz clic en una brecha → ve el evento que la causó: anulaciones, sobreasignación, prueba de precio, comisión de delivery.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Conciliación POS automatizada", description: "POS, personal, inventario, contabilidad — un solo libro, cierres en horas en vez de días.", product: "Sundae Core", icon: "integration" },
      { title: "Pronósticos que el consejo acepta", description: "Proyecciones EBITDA 14–90 días con señal de mercado, autocorregidas semanalmente.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "Qué cambia para finanzas",
    outcomesDescription: "Cierre más rápido, varianza más nítida, pronósticos defendibles.",
    outcomes: [
      { title: "Ciclo de cierre: días → horas", description: "Los libros se reconcilian en continuo. Fin de mes pasa a ser revisión, no reconstrucción.", icon: "speed" },
      { title: "Detecta la fuga en el turno", description: "Anulaciones, comps, sobreasignación — señalados en el local mientras hay tiempo.", icon: "owners" },
      { title: "Trazabilidad nivel auditoría", description: "Cada métrica a la fuente. Cada varianza al evento. Sin caja negra.", icon: "performance" },
      { title: "Pronósticos que firmas", description: "Foresight razona sobre tus datos + señal de mercado — con su banda de confianza.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "RESPALDADO POR SUNDAE CREW",
      title: "Readiness de nómina multi-región para el cierre de mes.",
      description: "El motor de nómina de Crew corre el mismo check de readiness en Estados Unidos, Canadá, Reino Unido, UE y GCC — exportes estatutarios (NACHA · EFT · HMRC RTI · SEPA · WPS) y formularios fin de año generados por jurisdicción, con preview de ciclo explicado por IA y proof packs por close. Finanzas cierra los libros sobre la misma evidencia que el equipo de nómina presenta — sin carrera regional, sin puentes Excel entre países.",
      ctaText: "Explorar Sundae Crew",
    },
    ctaTitle: "Ve tu margen en movimiento.",
    ctaDescription: "30 minutos. Tus datos. Lo que Sundae cambiaría realmente para finanzas.",
    ctaButton: "Reservar recorrido financiero",
  },
};

export default function FinanceTeamsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  return <SolutionPageLayout copy={copy} mockup={<ThemedShot framed priority width={1600} height={1000} dark="/images/product/2026-fresh/insights-revenue-dark.png" light="/images/product/2026-fresh/insights-revenue.png" alt="Revenue Intelligence — net revenue, average check, RevPASH, and total covers with period-over-period variance" />} gallery={<SectionProductGallery defaultPersona="cfo" />} />;
}
