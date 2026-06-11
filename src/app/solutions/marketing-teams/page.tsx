"use client";

import { ThemedShot } from "@/components/ui/ThemedShot";
import { SolutionPageLayout, type SolutionCopy } from "@/components/solutions/SolutionPageLayout";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_solutions_marketing_teams_page'

const localizedCopy: Record<"en" | "ar" | "fr" | "es", SolutionCopy> = {
  en: {
    badge: "For Marketing Leads",
    titleLine1: "Reallocate the spend.",
    titleLine2: "Before the budget closes.",
    description: "Campaign ROI tied to covers and net margin within 24 hours. Channel mix, attribution, and what to do next - not a monthly recap.",
    primaryCta: "Book a Marketing Walk-through",
    secondaryCta: "See Marketing Demo",
    problemsEyebrow: "WHERE THE BUDGET LEAKS",
    problemsTitle: "Where the marketing budget leaks",
    problemsDescription: "ROI lands a week late. Next month's plan goes in before this month's data does.",
    challenges: [
      { title: "ROI arrives after the spend", description: "Attribution lands the week after the campaign. You're already planning the next one.", icon: "marketing" },
      { title: "Net margin missing from the math", description: "You see covers and revenue. You don't see whether the campaign cost more than it earned.", icon: "balance" },
      { title: "Channel mix decided on instinct", description: "Loyalty, paid social, search, email - last week's mix continues by default, not by analysis.", icon: "performance" },
      { title: "Local market signal ignored", description: "Competitor pricing, weather, events - none of it shows up in the brand brief.", icon: "watchtower" },
    ],
    howTitle: "How Sundae works for marketing leads",
    howDescription: "Live attribution to net margin, channel-by-channel ROI, market-aware planning.",
    howSundaeHelps: [
      { title: "Attribution to net margin, not just covers", description: "Every campaign ties to attributed covers, average check, and the margin those covers actually earned. Spend per acquired dollar of margin - not per click.", product: "Insights · Marketing Performance", icon: "marketing" },
      { title: "Channel mix you can reallocate live", description: "Loyalty, paid, search, email - each with live ROAS, attributed covers, and cost-per-cover. Move budget while the campaign is still running.", product: "Insights · Marketing", icon: "performance" },
      { title: "Cross-Intelligence finds the synergy", description: "Loyalty + lunch combo converts at 2.3× search alone. Cross-Intelligence surfaces these pairings so you stack channels, not run them in parallel.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Market signal in the brief", description: "Competitor promos, local events, weather - all in the morning brief so the campaign plan reflects the market, not just the calendar.", product: "Watchtower", icon: "watchtower" },
    ],
    outcomesTitle: "What changes for marketing",
    outcomesDescription: "Reallocate while it matters, prove margin not just covers.",
    outcomes: [
      { title: "Reallocate budget in-campaign", description: "Move spend off the underperforming channel before the month closes - not after.", icon: "speed" },
      { title: "Prove campaigns paid for themselves", description: "Margin-attributed ROI defends marketing spend to finance with the same numbers they live in.", icon: "owners" },
      { title: "Stack channels that compound", description: "Cross-Intelligence shows which channel combinations multiply each other - not just which work alone.", icon: "performance" },
      { title: "Brand briefs grounded in market signal", description: "Plans built knowing what competitors and the local market are doing - not just last month's spend.", icon: "support" },
    ],
    ctaTitle: "See your channel mix in motion.",
    ctaDescription: "30 minutes. Your campaigns. The budget you would have reallocated last week.",
    ctaButton: "Book a Marketing Walk-through",
  },
  ar: {
    badge: "لقادة التسويق",
    titleLine1: "أعد توزيع الإنفاق.",
    titleLine2: "قبل أن تُغلق الميزانية.",
    description: "ROI الحملة مرتبط بالضيوف وصافي الهامش خلال 24 ساعة. مزيج القنوات، الإسناد، والخطوة التالية - لا تقرير شهري.",
    primaryCta: "احجز جولة تسويقية",
    secondaryCta: "شاهد عرض التسويق",
    problemsEyebrow: "أين تتسرب الميزانية",
    problemsTitle: "أين تتسرب ميزانية التسويق",
    problemsDescription: "ROI يصل متأخراً أسبوعاً. خطة الشهر التالي تنطلق قبل بيانات هذا الشهر.",
    challenges: [
      { title: "ROI يأتي بعد الإنفاق", description: "الإسناد يصل بعد الحملة بأسبوع. أنت تخطط للتالية بالفعل.", icon: "marketing" },
      { title: "صافي الهامش غائب عن المعادلة", description: "ترى الضيوف والإيرادات. لا ترى إن كانت الحملة كلفت أكثر مما كسبت.", icon: "balance" },
      { title: "مزيج القنوات بالحدس", description: "ولاء، اجتماعي مدفوع، بحث، بريد - مزيج الأسبوع الماضي يستمر افتراضياً لا بالتحليل.", icon: "performance" },
      { title: "إشارة السوق المحلي مهملة", description: "تسعير المنافسين، الطقس، الأحداث - لا شيء منها في موجز العلامة.", icon: "watchtower" },
    ],
    howTitle: "كيف يعمل Sundae للتسويق",
    howDescription: "إسناد حي لصافي الهامش، ROI لكل قناة، تخطيط واعٍ بالسوق.",
    howSundaeHelps: [
      { title: "إسناد لصافي الهامش لا للضيوف فقط", description: "كل حملة ترتبط بضيوف ومتوسط فاتورة والهامش الذي كسبه أولئك الضيوف فعلاً.", product: "Insights · Marketing Performance", icon: "marketing" },
      { title: "مزيج قنوات قابل للإعادة الحية", description: "كل قناة بـ ROAS حي وضيوف منسوبين وتكلفة لكل ضيف. حرّك الميزانية بينما الحملة تعمل.", product: "Insights · Marketing", icon: "performance" },
      { title: "Cross-Intelligence يكشف التآزر", description: "ولاء + كومبو غداء يحول بمعدل 2.3× بحث فقط. Cross-Intelligence يكشف هذه الاقترانات.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "إشارة السوق في الموجز", description: "عروض المنافسين والأحداث المحلية والطقس - في الموجز الصباحي فتعكس الخطة السوق لا التقويم فقط.", product: "Watchtower", icon: "watchtower" },
    ],
    outcomesTitle: "ما يتغير للتسويق",
    outcomesDescription: "أعد التوزيع وهو مؤثر، أثبت الهامش لا الضيوف فقط.",
    outcomes: [
      { title: "أعد توزيع الميزانية أثناء الحملة", description: "حرّك الإنفاق من القناة الضعيفة قبل إغلاق الشهر - لا بعده.", icon: "speed" },
      { title: "أثبت أن الحملات سددت نفسها", description: "ROI مُسند للهامش يدافع عن إنفاق التسويق أمام المالية بنفس أرقامها.", icon: "owners" },
      { title: "كدّس قنوات تتضاعف", description: "Cross-Intelligence يظهر تركيبات القنوات التي تضاعف بعضها - لا التي تعمل وحيدة فقط.", icon: "performance" },
      { title: "موجزات علامة مبنية على إشارة السوق", description: "خطط تعرف ما يفعله المنافسون والسوق المحلي - لا فقط إنفاق الشهر الماضي.", icon: "support" },
    ],
    ctaTitle: "شاهد مزيج قنواتك يتحرك.",
    ctaDescription: "30 دقيقة. حملاتك. الميزانية التي كنت ستعيد توزيعها الأسبوع الماضي.",
    ctaButton: "احجز جولة تسويقية",
  },
  fr: {
    badge: "Pour responsables marketing",
    titleLine1: "Réallouez le budget.",
    titleLine2: "Avant la clôture.",
    description: "ROI campagne lié aux couverts et à la marge nette en 24h. Mix canal, attribution, prochaine action - pas un récap mensuel.",
    primaryCta: "Réserver une visite marketing",
    secondaryCta: "Voir la démo marketing",
    problemsEyebrow: "OÙ FUIT LE BUDGET",
    problemsTitle: "Où fuit le budget marketing",
    problemsDescription: "Le ROI arrive en retard d'une semaine. Le plan du mois suivant part avant les données du courant.",
    challenges: [
      { title: "ROI après la dépense", description: "L'attribution arrive la semaine d'après. Vous planifiez déjà la prochaine.", icon: "marketing" },
      { title: "Marge nette absente du calcul", description: "Vous voyez couverts et revenu. Pas si la campagne a coûté plus qu'elle n'a rapporté.", icon: "balance" },
      { title: "Mix canal à l'instinct", description: "Fidélité, social payant, search, email - le mix de la semaine passée continue par défaut.", icon: "performance" },
      { title: "Signal marché local ignoré", description: "Promos concurrents, météo, événements - rien dans le brief marque.", icon: "watchtower" },
    ],
    howTitle: "Comment Sundae sert le marketing",
    howDescription: "Attribution live à la marge nette, ROI par canal, planning aware du marché.",
    howSundaeHelps: [
      { title: "Attribution à la marge nette", description: "Chaque campagne reliée aux couverts attribués, ticket moyen et marge réelle. Coût par dollar de marge - pas par clic.", product: "Insights · Marketing Performance", icon: "marketing" },
      { title: "Mix canal réallouable live", description: "Chaque canal avec ROAS live, couverts attribués, coût par couvert. Déplacez le budget pendant la campagne.", product: "Insights · Marketing", icon: "performance" },
      { title: "Cross-Intelligence trouve la synergie", description: "Fidélité + combo lunch convertit à 2,3× search seul. Cross-Intelligence remonte ces combinaisons.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Signal marché dans le brief", description: "Promos concurrents, événements locaux, météo - dans le brief matinal pour que le plan reflète le marché.", product: "Watchtower", icon: "watchtower" },
    ],
    outcomesTitle: "Ce qui change pour le marketing",
    outcomesDescription: "Réallouez pendant que ça compte, prouvez la marge pas seulement les couverts.",
    outcomes: [
      { title: "Réallouez en cours de campagne", description: "Déplacez le budget du canal faible avant la clôture du mois - pas après.", icon: "speed" },
      { title: "Prouvez que les campagnes se sont payées", description: "ROI attribué à la marge défend le budget marketing devant la finance.", icon: "owners" },
      { title: "Stack-ez les canaux qui composent", description: "Cross-Intelligence montre quelles combinaisons multiplient l'effet.", icon: "performance" },
      { title: "Briefs marque ancrés dans le marché", description: "Plans qui savent ce que font les concurrents et le marché local.", icon: "support" },
    ],
    ctaTitle: "Votre mix canal en mouvement.",
    ctaDescription: "30 minutes. Vos campagnes. Le budget que vous auriez réalloué la semaine dernière.",
    ctaButton: "Réserver une visite marketing",
  },
  es: {
    badge: "Para responsables de marketing",
    titleLine1: "Reasigna el gasto.",
    titleLine2: "Antes del cierre.",
    description: "ROI de campaña ligado a cubiertos y margen neto en 24 horas. Mix de canal, atribución y siguiente paso - no un recap mensual.",
    primaryCta: "Reservar recorrido de marketing",
    secondaryCta: "Ver demo de marketing",
    problemsEyebrow: "DÓNDE SE FUGA EL PRESUPUESTO",
    problemsTitle: "Dónde se fuga el presupuesto de marketing",
    problemsDescription: "El ROI llega una semana tarde. El plan del mes siguiente arranca antes de los datos del actual.",
    challenges: [
      { title: "ROI llega después del gasto", description: "La atribución llega a la semana siguiente. Ya estás planificando la siguiente campaña.", icon: "marketing" },
      { title: "Margen neto ausente del cálculo", description: "Ves cubiertos e ingresos. No si la campaña costó más de lo que ganó.", icon: "balance" },
      { title: "Mix de canal por intuición", description: "Lealtad, social pagado, search, email - el mix de la semana pasada continúa por defecto.", icon: "performance" },
      { title: "Señal de mercado local ignorada", description: "Precios competidores, clima, eventos - nada en el brief de marca.", icon: "watchtower" },
    ],
    howTitle: "Cómo trabaja Sundae para marketing",
    howDescription: "Atribución en vivo al margen neto, ROI por canal, planificación con conciencia de mercado.",
    howSundaeHelps: [
      { title: "Atribución al margen neto", description: "Cada campaña ligada a cubiertos atribuidos, ticket medio y margen real. Gasto por dólar de margen - no por clic.", product: "Insights · Marketing Performance", icon: "marketing" },
      { title: "Mix de canal reasignable en vivo", description: "Cada canal con ROAS en vivo, cubiertos atribuidos, coste por cubierto. Mueve el presupuesto durante la campaña.", product: "Insights · Marketing", icon: "performance" },
      { title: "Cross-Intelligence encuentra la sinergia", description: "Lealtad + combo lunch convierte a 2,3× search solo. Cross-Intelligence saca estas combinaciones.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Señal de mercado en el brief", description: "Promos competidores, eventos locales, clima - en el brief matinal para que el plan refleje el mercado.", product: "Watchtower", icon: "watchtower" },
    ],
    outcomesTitle: "Qué cambia para marketing",
    outcomesDescription: "Reasigna mientras importa, demuestra margen no solo cubiertos.",
    outcomes: [
      { title: "Reasigna presupuesto durante la campaña", description: "Mueve el gasto del canal débil antes del cierre del mes - no después.", icon: "speed" },
      { title: "Demuestra que las campañas se pagaron", description: "ROI atribuido al margen defiende el gasto de marketing ante finanzas.", icon: "owners" },
      { title: "Apila canales que componen", description: "Cross-Intelligence muestra qué combinaciones multiplican el efecto.", icon: "performance" },
      { title: "Briefs de marca anclados en el mercado", description: "Planes que saben qué hacen los competidores y el mercado local.", icon: "support" },
    ],
    ctaTitle: "Tu mix de canal en movimiento.",
    ctaDescription: "30 minutos. Tus campañas. El presupuesto que habrías reasignado la semana pasada.",
    ctaButton: "Reservar recorrido de marketing",
  },
};

export default function MarketingTeamsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  return <SolutionPageLayout copy={copy} mockup={<ThemedShot framed priority width={1600} height={1000} dark="/images/product/2026-fresh/marketing-channels-dark.png" light="/images/product/2026-fresh/marketing-channels.png" alt="Marketing Intelligence - channel ROAS, spend efficiency frontier, and per-channel performance" />} gallery={<SectionProductGallery defaultPersona="marketing" />} />;
}
