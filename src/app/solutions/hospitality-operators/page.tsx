"use client";

import { PulseDashboardMockup } from "@/components/ui/MockupFrame";
import { SolutionPageLayout, type SolutionCopy } from "@/components/solutions/SolutionPageLayout";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_solutions_hospitality_operators_page'

const localizedCopy: Record<"en" | "ar" | "fr" | "es", SolutionCopy> = {
  en: {
    badge: "For Hospitality Operators",
    titleLine1: "One intelligence layer.",
    titleLine2: "Every F&B outlet.",
    description: "Hotel restaurants, banquet, IRD, lobby bar — unified live view across every revenue outlet. Margin, mix, and labor in one frame.",
    primaryCta: "Book a Hospitality Walk-through",
    secondaryCta: "See Hospitality Demo",
    problemsEyebrow: "F&B INSIDE HOSPITALITY",
    problemsTitle: "What F&B leaders face inside hospitality",
    problemsDescription: "Many outlets, mixed PMS/POS stacks, no unified P&L view.",
    challenges: [
      { title: "Outlets reported separately, judged together", description: "F&B P&L rolls up to a single line. The story behind it — banquet vs IRD vs lobby — gets lost.", icon: "operators" },
      { title: "Banquet revenue lives off-system", description: "BEOs in one tool, POS in another, F&B GM tracking margin in a spreadsheet.", icon: "integration" },
      { title: "Labor shared across outlets", description: "One cook supports two outlets. Cost allocation is approximate. Productivity stays opaque.", icon: "balance" },
      { title: "Guest journey crosses outlets", description: "A loyal guest dines at the restaurant, drinks in the lobby, orders IRD. No system sees all three.", icon: "support" },
    ],
    howTitle: "How Sundae works for hospitality F&B",
    howDescription: "Unified live view across every outlet, every channel, every revenue source.",
    howSundaeHelps: [
      { title: "Outlet-by-outlet pacing, rolled to one F&B view", description: "Live revenue and margin for each outlet — restaurant, banquet, IRD, lobby bar, retail — with a unified portfolio rollup.", product: "Pulse", icon: "chart" },
      { title: "Banquet + BEO connected", description: "Banquet revenue, IRD orders, and restaurant POS unified into one ledger. F&B GM stops reconciling, starts steering.", product: "Sundae Core", icon: "integration" },
      { title: "Labor productivity per outlet", description: "Allocated and direct labor by outlet, with covers per FOH hour and productivity comparisons across the property.", product: "Pulse · Labor", icon: "balance" },
      { title: "Guest CRM across outlets", description: "Stitch the loyal guest's spend across restaurant, bar, IRD, and banquet. One guest record, not five.", product: "Guest CRM Intelligence", icon: "support" },
    ],
    outcomesTitle: "What changes for F&B leadership",
    outcomesDescription: "Outlet-level clarity, property-level decisions.",
    outcomes: [
      { title: "Steer F&B at outlet granularity", description: "Restaurant slipping? Lobby bar over plan? You see it by outlet, in the shift.", icon: "speed" },
      { title: "Banquet stops being a black box", description: "BEO revenue, food cost variance, and labor on the same dashboard as the restaurant.", icon: "owners" },
      { title: "Productivity comparable across outlets", description: "Allocated labor done right — covers/hour comparable for an honest performance read.", icon: "performance" },
      { title: "Guest LTV across every outlet", description: "Loyalty programs that reward across F&B, not just per outlet. Guests notice. Repeat rate moves.", icon: "support" },
    ],
    ctaTitle: "See every F&B outlet in one view.",
    ctaDescription: "30 minutes. Your property. The outlet you would have prioritized differently.",
    ctaButton: "Book a Hospitality Walk-through",
  },
  ar: {
    badge: "لمشغّلي الضيافة",
    titleLine1: "طبقة ذكاء واحدة.",
    titleLine2: "كل منفذ مأكولات ومشروبات.",
    description: "مطاعم الفنادق، البانكيت، خدمة الغرف، بار اللوبي — عرض حي موحد عبر كل منفذ إيرادات.",
    primaryCta: "احجز جولة الضيافة",
    secondaryCta: "شاهد عرض الضيافة",
    problemsEyebrow: "F&B داخل الضيافة",
    problemsTitle: "ما يواجهه قادة F&B داخل الضيافة",
    problemsDescription: "منافذ كثيرة، أنظمة PMS/POS مختلطة، لا عرض P&L موحد.",
    challenges: [
      { title: "منافذ تُبلَّغ منفصلة وتُحكَم مجتمعة", description: "P&L F&B يلتف إلى سطر واحد. القصة خلفه تضيع.", icon: "operators" },
      { title: "إيرادات البانكيت خارج النظام", description: "BEOs في أداة، POS في أخرى، مدير F&B يتتبع الهامش في جدول.", icon: "integration" },
      { title: "عمالة مشتركة بين المنافذ", description: "طاهٍ يدعم منفذين. تخصيص التكلفة تقريبي. الإنتاجية تبقى غامضة.", icon: "balance" },
      { title: "رحلة الضيف تعبر المنافذ", description: "ضيف مخلص يتناول الطعام، يشرب في اللوبي، يطلب خدمة غرف. لا نظام يرى الثلاثة.", icon: "support" },
    ],
    howTitle: "كيف يعمل Sundae لـ F&B في الضيافة",
    howDescription: "عرض حي موحد عبر كل منفذ وكل قناة وكل مصدر إيرادات.",
    howSundaeHelps: [
      { title: "وتيرة منفذ بمنفذ، تتجمع في عرض F&B واحد", description: "إيرادات وهامش حية لكل منفذ — مع تجميع محفظة موحد.", product: "Pulse", icon: "chart" },
      { title: "البانكيت + BEO متصلان", description: "إيرادات البانكيت وطلبات خدمة الغرف وPOS المطعم موحدة في دفتر واحد.", product: "Sundae Core", icon: "integration" },
      { title: "إنتاجية العمالة لكل منفذ", description: "عمالة مخصصة ومباشرة لكل منفذ، مع مقارنات إنتاجية عبر العقار.", product: "Pulse · Labor", icon: "balance" },
      { title: "CRM ضيف عبر المنافذ", description: "اربط إنفاق الضيف المخلص عبر المطعم والبار وخدمة الغرف والبانكيت. سجل ضيف واحد لا خمسة.", product: "Guest CRM Intelligence", icon: "support" },
    ],
    outcomesTitle: "ما يتغير لقيادة F&B",
    outcomesDescription: "وضوح على مستوى المنفذ، قرارات على مستوى العقار.",
    outcomes: [
      { title: "وجّه F&B بدقة المنفذ", description: "مطعم ينزلق؟ بار اللوبي متجاوز الخطة؟ تراه بالمنفذ في الوردية.", icon: "speed" },
      { title: "البانكيت يتوقف عن كونه صندوق أسود", description: "إيرادات BEO وتباين تكلفة الطعام والعمالة على نفس اللوحة.", icon: "owners" },
      { title: "إنتاجية قابلة للمقارنة عبر المنافذ", description: "عمالة مخصصة بشكل صحيح — ضيوف/ساعة قابلة للمقارنة.", icon: "performance" },
      { title: "قيمة الضيف عبر كل منفذ", description: "برامج ولاء تكافئ عبر F&B لا فقط لكل منفذ. الضيوف يلاحظون.", icon: "support" },
    ],
    ctaTitle: "شاهد كل منفذ F&B في عرض واحد.",
    ctaDescription: "30 دقيقة. عقارك. المنفذ الذي كنت ستعطيه أولوية مختلفة.",
    ctaButton: "احجز جولة الضيافة",
  },
  fr: {
    badge: "Pour opérateurs hôtellerie",
    titleLine1: "Une couche d'intelligence.",
    titleLine2: "Chaque point F&B.",
    description: "Restaurants, banqueting, room service, bar lobby — vue live unifiée sur chaque point de revenu. Marge, mix, main-d'œuvre dans un seul cadre.",
    primaryCta: "Réserver une visite hôtellerie",
    secondaryCta: "Voir la démo hôtellerie",
    problemsEyebrow: "F&B DANS L'HÔTELLERIE",
    problemsTitle: "Ce que vivent les responsables F&B en hôtellerie",
    problemsDescription: "Beaucoup de points, stacks PMS/POS mélangés, pas de vue P&L unifiée.",
    challenges: [
      { title: "Points reportés séparément, jugés ensemble", description: "Le P&L F&B remonte sur une ligne. L'histoire derrière se perd.", icon: "operators" },
      { title: "Le banqueting vit hors-système", description: "BEOs dans un outil, POS dans un autre, GM F&B suit la marge dans un tableur.", icon: "integration" },
      { title: "Main-d'œuvre partagée entre points", description: "Un cuisinier soutient deux points. Allocation approximative. Productivité opaque.", icon: "balance" },
      { title: "Le parcours client traverse les points", description: "Un client fidèle dîne au restaurant, boit au lobby, commande au room service. Aucun système ne voit les trois.", icon: "support" },
    ],
    howTitle: "Comment Sundae sert le F&B hôtelier",
    howDescription: "Vue live unifiée sur chaque point, chaque canal, chaque source de revenu.",
    howSundaeHelps: [
      { title: "Rythme point par point, vue F&B unifiée", description: "Revenu et marge live pour chaque point — restaurant, banqueting, room service, lobby — avec rollup portefeuille.", product: "Pulse", icon: "chart" },
      { title: "Banqueting + BEO connectés", description: "Revenu banqueting, commandes room service, POS restaurant unifiés dans un livre.", product: "Sundae Core", icon: "integration" },
      { title: "Productivité main-d'œuvre par point", description: "Main-d'œuvre allouée et directe par point, couverts par heure FOH comparables.", product: "Pulse · Labor", icon: "balance" },
      { title: "CRM client entre points", description: "Réconciliez la dépense du client fidèle entre restaurant, bar, room service, banqueting. Un dossier client, pas cinq.", product: "Guest CRM Intelligence", icon: "support" },
    ],
    outcomesTitle: "Ce qui change pour le F&B",
    outcomesDescription: "Clarté point par point, décisions à l'échelle de la propriété.",
    outcomes: [
      { title: "Pilotez F&B à la granularité point", description: "Restaurant qui décroche ? Lobby au-dessus du plan ? Vous le voyez par point, dans le service.", icon: "speed" },
      { title: "Le banqueting cesse d'être une boîte noire", description: "Revenu BEO, variance coût matière, main-d'œuvre sur le même dashboard que le restaurant.", icon: "owners" },
      { title: "Productivité comparable entre points", description: "Main-d'œuvre allouée correctement — couverts/h comparables pour une lecture honnête.", icon: "performance" },
      { title: "LTV client sur chaque point", description: "Loyalty qui récompense sur tout le F&B, pas par point. Les clients le remarquent.", icon: "support" },
    ],
    ctaTitle: "Chaque point F&B en une vue.",
    ctaDescription: "30 minutes. Votre propriété. Le point que vous auriez priorisé autrement.",
    ctaButton: "Réserver une visite hôtellerie",
  },
  es: {
    badge: "Para operadores de hospitalidad",
    titleLine1: "Una capa de inteligencia.",
    titleLine2: "Cada punto de A&B.",
    description: "Restaurantes, banquetes, room service, bar lobby — vista en vivo unificada en cada punto de ingreso. Margen, mix, personal en un solo marco.",
    primaryCta: "Reservar recorrido hospitalidad",
    secondaryCta: "Ver demo hospitalidad",
    problemsEyebrow: "A&B DENTRO DE HOSPITALIDAD",
    problemsTitle: "Lo que enfrentan los líderes A&B en hospitalidad",
    problemsDescription: "Muchos puntos, stacks PMS/POS mixtos, sin vista P&L unificada.",
    challenges: [
      { title: "Puntos reportados separados, juzgados juntos", description: "El P&L A&B sube a una línea. La historia detrás se pierde.", icon: "operators" },
      { title: "Banquetes vive fuera de sistema", description: "BEOs en una herramienta, POS en otra, GM A&B sigue el margen en una hoja.", icon: "integration" },
      { title: "Personal compartido entre puntos", description: "Un cocinero apoya dos puntos. Asignación aproximada. Productividad opaca.", icon: "balance" },
      { title: "El recorrido del huésped cruza puntos", description: "Un huésped fiel cena en restaurante, bebe en lobby, pide room service. Ningún sistema ve los tres.", icon: "support" },
    ],
    howTitle: "Cómo trabaja Sundae para A&B hospitalidad",
    howDescription: "Vista en vivo unificada en cada punto, cada canal, cada fuente de ingreso.",
    howSundaeHelps: [
      { title: "Ritmo punto a punto, vista A&B unificada", description: "Ingreso y margen en vivo por punto — restaurante, banquetes, room service, lobby — con rollup de portafolio.", product: "Pulse", icon: "chart" },
      { title: "Banquetes + BEO conectados", description: "Ingresos banquetes, room service, POS restaurante unificados en un libro.", product: "Sundae Core", icon: "integration" },
      { title: "Productividad de personal por punto", description: "Personal asignado y directo por punto, cubiertos por hora FOH comparables.", product: "Pulse · Labor", icon: "balance" },
      { title: "CRM de huésped entre puntos", description: "Une el gasto del huésped fiel entre restaurante, bar, room service, banquetes. Un registro, no cinco.", product: "Guest CRM Intelligence", icon: "support" },
    ],
    outcomesTitle: "Qué cambia para liderazgo A&B",
    outcomesDescription: "Claridad por punto, decisiones a nivel de propiedad.",
    outcomes: [
      { title: "Dirige A&B con granularidad de punto", description: "¿Restaurante deslizándose? ¿Lobby por encima del plan? Lo ves por punto, en el turno.", icon: "speed" },
      { title: "Banquetes deja de ser caja negra", description: "Ingreso BEO, varianza coste alimentos, personal en el mismo panel que el restaurante.", icon: "owners" },
      { title: "Productividad comparable entre puntos", description: "Personal asignado correctamente — cubiertos/hora comparables para una lectura honesta.", icon: "performance" },
      { title: "LTV de huésped en cada punto", description: "Lealtad que premia en todo A&B, no por punto. Los huéspedes lo notan.", icon: "support" },
    ],
    ctaTitle: "Cada punto A&B en una vista.",
    ctaDescription: "30 minutos. Tu propiedad. El punto que habrías priorizado distinto.",
    ctaButton: "Reservar recorrido hospitalidad",
  },
};

export default function HospitalityOperatorsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  return <SolutionPageLayout copy={copy} mockup={<PulseDashboardMockup />} gallery={<SectionProductGallery defaultPersona="c_suite" />} />;
}
