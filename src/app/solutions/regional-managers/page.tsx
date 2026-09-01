"use client";

import { ThemedShot } from "@/components/ui/ThemedShot";
import { SolutionPageLayout, type SolutionCopy } from "@/components/solutions/SolutionPageLayout";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_solutions_regional_managers_page'
import { getPositioningCopy } from '@/lib/positioningCopy';

const localizedCopy: Record<"en" | "ar" | "fr" | "es", SolutionCopy> = {
  en: {
    badge: "For Regional & Area Managers",
    titleLine1: "Run twelve outlets.",
    titleLine2: "Like you're standing in one.",
    description: "Live shift visibility across every location. Pacing flags the outlet that needs you, routes the fix to the GM, and measures the margin you recover - not just another Friday recap.",
    primaryCta: "Book a Regional Walk-through",
    secondaryCta: "See the Ops Demo",
    problemsEyebrow: "WHAT SLOWS YOU DOWN",
    problemsTitle: "What slows a regional manager down",
    problemsDescription: "Too many sites, not enough time, too much data after the fact.",
    challenges: [
      { title: "You can't be in every restaurant at once", description: "By the time the bad shift is over, you find out from the recap - not the floor.", icon: "operators" },
      { title: "Performance varies more than the weekly report shows", description: "You know the top performers and the laggards. You don't know it in time to pair them up.", icon: "performance" },
      { title: "Leakage hides in the noise", description: "Voids, comps, discounts, over-coverage - small per shift, expensive over a month.", icon: "balance" },
      { title: "Every site asks for help at once", description: "Without pacing visibility, you triage on instinct, not on which location is actually slipping.", icon: "support" },
    ],
    howTitle: "How Sundae works for regional managers",
    howDescription: "One live view of every shift - and every fix routed to an owner, then measured back to margin.",
    howSundaeHelps: [
      { title: "Live pacing across the region", description: "Each location's revenue, covers, and labor - updated through the shift. The site that's slipping gets flagged in your morning brief, not Friday's review.", product: "Pulse", icon: "chart" },
      { title: "Server-level intelligence", description: "Upsell rate, table turn, check size by server. Pair your lagging server with your strongest before the shift ends.", product: "Pulse · Server view", icon: "operators" },
      { title: "Leakage spotted in the shift", description: "Void runs, comp clusters, off-pattern discounts - surfaced at the location, routed to the GM, and the recovered margin measured against baseline.", product: "Insights · Revenue Assurance", icon: "owners" },
      { title: "Sundae Coach gives the next move", description: "When a site is pacing 14% behind, Coach recommends a specific play to the GM - adjusted labor, a loyalty push, a menu swap - then measures the margin it recovers against baseline.", product: "Ask Sundae", icon: "intelligence" },
    ],
    outcomesTitle: "What changes for the region",
    outcomesDescription: "Faster intervention, margin measured back, fewer Friday surprises.",
    outcomes: [
      { title: "Intervene in the shift, not after", description: "The location that needs you sends the signal before the floor knows. The fix routes to the GM, and the margin you recover is measured, not guessed.", icon: "speed" },
      { title: "Coach instead of audit", description: "Stop spending the visit chasing what the report missed. Use the visit to coach the team on what to do next.", icon: "support" },
      { title: "Same playbook, every outlet", description: "What works at Site 4 propagates to Site 7. Region-wide standards stay tight without a memo.", icon: "performance" },
      { title: "Recover leakage you didn't know you had", description: "1-3% of revenue typically hides in voids, comps, and overrides. Sundae surfaces it shift-by-shift, routes it to the GM, and measures what you recover against baseline.", icon: "owners" },
    ],
    ctaTitle: "Find the slip. Route the fix. Measure the margin back.",
    ctaDescription: "30 minutes. Your locations. The slip you'd have caught, routed, and recovered - measured against baseline.",
    ctaButton: "Book a Regional Walk-through",
  },
  ar: {
    badge: "للمدراء الإقليميين",
    titleLine1: "أدر اثني عشر موقعاً.",
    titleLine2: "وكأنك في واحد.",
    description: "رؤية حية للوردية عبر كل موقع. تُبرز الوتيرة الموقع الذي يحتاجك، وتوجّه الإصلاح إلى المدير، وتقيس الهامش الذي تستردّه - لا مجرد تقرير جمعة آخر.",
    primaryCta: "احجز جولة إقليمية",
    secondaryCta: "شاهد عرض العمليات",
    problemsEyebrow: "ما يبطئك",
    problemsTitle: "ما يبطئ المدير الإقليمي",
    problemsDescription: "مواقع كثيرة، وقت قليل، وبيانات تصل بعد فوات الأوان.",
    challenges: [
      { title: "لا يمكنك أن تكون في كل مطعم في آن واحد", description: "حين تنتهي الوردية السيئة، تعرف من التقرير - لا من الموقع.", icon: "operators" },
      { title: "يتفاوت الأداء أكثر مما يظهره التقرير الأسبوعي", description: "تعرف من يتفوق ومن يتأخر. لا تعرفه في الوقت المناسب لإقرانهم.", icon: "performance" },
      { title: "التسرب يختبئ في الضوضاء", description: "تجاوزات وتعويضات وخصومات وعمالة زائدة - صغيرة بالوردية، باهظة بالشهر.", icon: "balance" },
      { title: "كل المواقع تطلب المساعدة معاً", description: "بلا رؤية للوتيرة، تعتمد الحدس لا الموقع الذي ينزلق فعلاً.", icon: "support" },
    ],
    howTitle: "كيف يعمل Sundae للمدراء الإقليميين",
    howDescription: "عرض حي واحد لكل وردية - وكل إصلاح موجّه إلى مالك، ثم مُقاس عائداً إلى الهامش.",
    howSundaeHelps: [
      { title: "وتيرة حية عبر المنطقة", description: "إيرادات وضيوف وعمالة كل موقع - تتحدث عبر الوردية. الموقع الذي ينزلق يظهر في إحاطتك الصباحية.", product: "Pulse", icon: "chart" },
      { title: "ذكاء على مستوى الموظف", description: "معدل البيع الإضافي، دوران الطاولات، حجم الفاتورة لكل موظف. اقرن المتأخر بالأقوى قبل نهاية الوردية.", product: "Pulse · Server view", icon: "operators" },
      { title: "اكتشاف التسرب في الوردية", description: "سلاسل إلغاءات، وتجمعات تعويضات، وخصومات شاذة - تظهر في الموقع، وتوجّه إلى المدير، ويُقاس الهامش المسترد مقابل خط أساس.", product: "Insights · Revenue Assurance", icon: "owners" },
      { title: "Sundae Coach يعطي الخطوة التالية", description: "حين يتأخر موقع 14% عن وتيرته، يوصي Coach المديرَ بخطوة محددة - تعديل العمالة، دفعة ولاء، تبديل صنف في القائمة - ثم يقيس الهامش المسترد مقابل خط أساس.", product: "Ask Sundae", icon: "intelligence" },
    ],
    outcomesTitle: "ما يتغير للمنطقة",
    outcomesDescription: "تدخّل أسرع، وهامش مُقاس عند استرداده، ومفاجآت أقل يوم الجمعة.",
    outcomes: [
      { title: "تدخل في الوردية لا بعدها", description: "الموقع الذي يحتاجك يرسل الإشارة قبل أن تعلم الصالة. يُوجّه الإصلاح إلى المدير، والهامش الذي تستردّه يُقاس لا يُخمَّن.", icon: "speed" },
      { title: "كن مدرباً لا مدققاً", description: "توقف عن مطاردة ما فاته التقرير. استخدم الزيارة للتدريب على الخطوة التالية.", icon: "support" },
      { title: "نفس الكتاب لكل موقع", description: "ما ينجح في الموقع 4 ينتشر إلى الموقع 7. معايير الإقليم تبقى محكمة.", icon: "performance" },
      { title: "استرد تسرباً لم تعرف أنه موجود", description: "عادةً يختبئ 1-3% من الإيرادات في الإلغاءات والتعويضات والتجاوزات. يكشفها Sundae وردية بوردية، ويوجّهها إلى المدير، ويقيس ما تستردّه مقابل خط أساس.", icon: "owners" },
    ],
    ctaTitle: "اكتشف الانزلاق. وجّه الإصلاح. قِس الهامش المسترد.",
    ctaDescription: "30 دقيقة. مواقعك. الانزلاق الذي كنت ستكتشفه وتوجّهه وتستردّه - مُقاساً مقابل خط أساس.",
    ctaButton: "احجز جولة إقليمية",
  },
  fr: {
    badge: "Pour managers régionaux",
    titleLine1: "Pilotez douze sites.",
    titleLine2: "Comme si vous y étiez.",
    description: "Visibilité en direct du service sur chaque site. Le rythme signale le point de vente qui a besoin de vous, confie la correction au directeur et mesure la marge que vous récupérez - pas juste un énième récap du vendredi.",
    primaryCta: "Réserver une visite régionale",
    secondaryCta: "Voir la démo opérations",
    problemsEyebrow: "CE QUI VOUS RALENTIT",
    problemsTitle: "Ce qui ralentit un manager régional",
    problemsDescription: "Trop de sites, pas assez de temps, trop de données après coup.",
    challenges: [
      { title: "Vous ne pouvez pas être partout", description: "Le service raté, vous l'apprenez du récap - pas de la salle.", icon: "operators" },
      { title: "La performance varie plus que ne le montre le rapport hebdomadaire", description: "Vous connaissez les meilleurs et les retardataires. Pas à temps pour les associer.", icon: "performance" },
      { title: "La fuite se cache dans le bruit", description: "Annulations, remises, sur-couverture - petits au service, coûteux au mois.", icon: "balance" },
      { title: "Tous les sites demandent de l'aide", description: "Sans visibilité sur le rythme, vous triez à l'instinct, pas sur qui dévisse vraiment.", icon: "support" },
    ],
    howTitle: "Comment Sundae sert les managers régionaux",
    howDescription: "Une vue live de chaque service - et chaque correction confiée à un responsable, puis mesurée jusqu'à la marge.",
    howSundaeHelps: [
      { title: "Rythme live sur la région", description: "Revenu, couverts, main-d'œuvre de chaque site - pendant le service. Le site qui décroche est dans votre brief matinal.", product: "Pulse", icon: "chart" },
      { title: "Intelligence par serveur", description: "Upsell, rotation table, ticket moyen par serveur. Associez le retardataire au meilleur avant la fin du service.", product: "Pulse · Server view", icon: "operators" },
      { title: "Fuite repérée dans le service", description: "Séries d'annulations, grappes de comps, remises atypiques - remontées sur le site, confiées au directeur, et la marge récupérée mesurée par rapport à une référence.", product: "Insights · Revenue Assurance", icon: "owners" },
      { title: "Sundae Coach donne le coup suivant", description: "Quand un site est 14% en retard sur son rythme, Coach recommande une action précise au directeur - main-d'œuvre ajustée, un coup de fidélité, un changement de carte - puis mesure la marge récupérée par rapport à une référence.", product: "Ask Sundae", icon: "intelligence" },
    ],
    outcomesTitle: "Ce qui change pour la région",
    outcomesDescription: "Intervention plus rapide, marge mesurée jusqu'au bout, moins de surprises le vendredi.",
    outcomes: [
      { title: "Intervenez dans le service, pas après", description: "Le site qui a besoin de vous envoie le signal avant que la salle s'en aperçoive. La correction est confiée au directeur, et la marge que vous récupérez est mesurée, pas devinée.", icon: "speed" },
      { title: "Coacher au lieu d'auditer", description: "Arrêtez de courir derrière ce que le rapport n'a pas vu. Utilisez la visite pour coacher.", icon: "support" },
      { title: "Même playbook, partout", description: "Ce qui marche au Site 4 se propage au Site 7. Standards régionaux sans note de service.", icon: "performance" },
      { title: "Récupérez la fuite que vous ne voyiez pas", description: "1-3% du chiffre d'affaires se cache généralement dans les annulations, comps et overrides. Sundae le remonte service par service, le confie au directeur et mesure ce que vous récupérez par rapport à une référence.", icon: "owners" },
    ],
    ctaTitle: "Repérez le décrochage. Confiez la correction. Mesurez la marge récupérée.",
    ctaDescription: "30 minutes. Vos sites. Le décrochage que vous auriez repéré, acheminé et récupéré - mesuré par rapport à une référence.",
    ctaButton: "Réserver une visite régionale",
  },
  es: {
    badge: "Para gerentes regionales",
    titleLine1: "Opera doce locales.",
    titleLine2: "Como si estuvieras en uno.",
    description: "Visibilidad del turno en vivo en cada local. El ritmo señala el local que te necesita, dirige la solución al gerente y mide el margen que recuperas - no solo otro reporte del viernes.",
    primaryCta: "Reservar recorrido regional",
    secondaryCta: "Ver demo de operaciones",
    problemsEyebrow: "QUÉ TE FRENA",
    problemsTitle: "Qué frena a un gerente regional",
    problemsDescription: "Demasiados locales, poco tiempo, datos que llegan tarde.",
    challenges: [
      { title: "No puedes estar en todos a la vez", description: "El turno malo lo descubres por el reporte - no por el local.", icon: "operators" },
      { title: "El rendimiento varía más de lo que muestra el informe semanal", description: "Conoces a los mejores y a los rezagados. No a tiempo para emparejarlos.", icon: "performance" },
      { title: "La fuga se esconde en el ruido", description: "Anulaciones, comps, descuentos, sobreasignación - pequeños por turno, caros al mes.", icon: "balance" },
      { title: "Todos los locales piden ayuda", description: "Sin visibilidad del ritmo, decides por intuición, no por el que realmente se desliza.", icon: "support" },
    ],
    howTitle: "Cómo trabaja Sundae para gerentes regionales",
    howDescription: "Una vista en vivo de cada turno - y cada solución dirigida a un responsable y luego medida de vuelta al margen.",
    howSundaeHelps: [
      { title: "Ritmo en vivo en toda la región", description: "Ingresos, cubiertos, personal por local - durante el turno. El local que se desliza aparece en tu brief matinal.", product: "Pulse", icon: "chart" },
      { title: "Inteligencia a nivel de mesero", description: "Upsell, rotación de mesa, ticket medio por mesero. Empareja al rezagado con el más fuerte antes del cierre.", product: "Pulse · Server view", icon: "operators" },
      { title: "Fuga detectada en el turno", description: "Rachas de anulaciones, grupos de comps, descuentos atípicos - detectados en el local, dirigidos al gerente, y el margen recuperado medido contra una línea base.", product: "Insights · Revenue Assurance", icon: "owners" },
      { title: "Sundae Coach da el siguiente paso", description: "Cuando un local va 14% por debajo del ritmo, Coach recomienda una jugada concreta al gerente - mano de obra ajustada, un empujón de fidelidad, un cambio de menú - y luego mide el margen recuperado contra una línea base.", product: "Ask Sundae", icon: "intelligence" },
    ],
    outcomesTitle: "Qué cambia para la región",
    outcomesDescription: "Intervención más rápida, margen medido de vuelta, menos sorpresas el viernes.",
    outcomes: [
      { title: "Interviene en el turno, no después", description: "El local que te necesita envía la señal antes de que la sala lo sepa. La solución se dirige al gerente, y el margen que recuperas se mide, no se adivina.", icon: "speed" },
      { title: "Coachear en lugar de auditar", description: "Deja de perseguir lo que el reporte no vio. Usa la visita para coachear lo siguiente.", icon: "support" },
      { title: "El mismo playbook en todos", description: "Lo que funciona en el local 4 se propaga al 7. Estándar regional sin memo.", icon: "performance" },
      { title: "Recupera fuga que no veías", description: "Normalmente 1-3% del ingreso se esconde en anulaciones, comps y overrides. Sundae lo saca turno a turno, lo dirige al gerente y mide lo que recuperas contra una línea base.", icon: "owners" },
    ],
    ctaTitle: "Detecta el bajón. Dirige la solución. Mide el margen recuperado.",
    ctaDescription: "30 minutos. Tus locales. El bajón que habrías detectado, dirigido y recuperado - medido contra una línea base.",
    ctaButton: "Reservar recorrido regional",
  },
};

export default function RegionalManagersPage() {
  const { locale } = useWebsiteI18n();
  const sourceCopy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  const copy = {
    ...sourceCopy,
    challenges: sourceCopy.challenges.map((challenge, index) =>
      index === 1
        ? { ...challenge, title: getPositioningCopy(locale).critical.regionalVariationTitle }
        : challenge,
    ),
  };
  return <SolutionPageLayout copy={copy} mockup={<ThemedShot framed priority width={1600} height={1000} dark="/images/product/2026-fresh/pulse-leaderboard-dark.png" light="/images/product/2026-fresh/pulse-leaderboard.png" alt="Pulse Portfolio Leaderboard - every outlet ranked live by revenue versus target, labor %, and status" />} gallery={<SectionProductGallery defaultPersona="operations" />} />;
}
