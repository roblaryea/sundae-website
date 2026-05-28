"use client";

import { ExecutiveBriefingMockup } from "@/components/ui/MockupFrame";
import { SolutionPageLayout, type SolutionCopy } from "@/components/solutions/SolutionPageLayout";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_solutions_c_suite_executives_page'

const localizedCopy: Record<"en" | "ar" | "fr" | "es", SolutionCopy> = {
  en: {
    badge: "For C-Suite & Owners",
    titleLine1: "Run the portfolio.",
    titleLine2: "Not the spreadsheet.",
    description: "Daily AI briefings across every brand. Margin variance the day it happens. Market signal before it hits your numbers.",
    primaryCta: "Book an Executive Briefing",
    secondaryCta: "See Executive Demo",
    problemsEyebrow: "WHAT SLOWS EXECUTIVES DOWN",
    problemsTitle: "What slows executives down today",
    problemsDescription: "Three days late, three meetings deep, and no single source of truth.",
    challenges: [
      { title: "Decisions on stale numbers", description: "The Thursday recap arrives Friday. By then the margin is already booked.", icon: "benchmarking" },
      { title: "12 vendor systems, zero alignment", description: "POS, labor, inventory, delivery — every system speaks a different dialect.", icon: "integration" },
      { title: "No view past last quarter", description: "You see what happened. Not what's coming. Not what to do about it.", icon: "forecasting" },
      { title: "Strategy lost to firefighting", description: "The portfolio needs steering. Operations needs putting out. Both lose.", icon: "balance" },
    ],
    howTitle: "How Sundae works for the executive office",
    howDescription: "One source of truth across every brand, every location, every shift.",
    howSundaeHelps: [
      { title: "Portfolio command in real time", description: "Live revenue, margin, and labor across every outlet. Pacing flags the location that needs your attention before the shift ends.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Market signal before it hits", description: "Competitors, weather, events, footfall — synthesized into a morning brief so you act before the impact lands in your P&L.", product: "Watchtower", icon: "watchtower" },
      { title: "Source-cited answers in seconds", description: "Ask why Brand C compressed margin or which outlets lose to competitor promos. Get a numbered answer with the data it's drawn from.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "14–90 day forecasts you can defend", description: "Foresight projects revenue, labor, and EBITDA. Run what-if on a new market, a price move, or a cost program — before you commit capital.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "What changes for the executive office",
    outcomesDescription: "Faster decisions, sharper portfolio, defendable forecasts.",
    outcomes: [
      { title: "Decide in hours, not weeks", description: "Move from monthly close to live margin. The decision lands while it still matters.", icon: "speed" },
      { title: "Tighter portfolio, fewer surprises", description: "Underperforming locations surface in the morning brief — not the quarterly review.", icon: "performance" },
      { title: "Forecasts your board trusts", description: "14–90 day projections grounded in your own operating data plus market signal.", icon: "owners" },
      { title: "Leadership aligned around one number", description: "Ops, finance, marketing, and the board read the same live dashboard.", icon: "support" },
    ],
    ctaTitle: "See your portfolio in one view.",
    ctaDescription: "30 minutes. Your data. What Sundae would actually change for the executive office.",
    ctaButton: "Book an Executive Briefing",
  },
  ar: {
    badge: "للقيادة التنفيذية والمالكين",
    titleLine1: "أدر المحفظة.",
    titleLine2: "لا الجدول.",
    description: "إحاطات يومية بالذكاء الاصطناعي عبر كل علامة. هوامش لحظية. إشارات السوق قبل أن تصل إلى أرقامك.",
    primaryCta: "احجز إحاطة تنفيذية",
    secondaryCta: "شاهد عرضاً تنفيذياً",
    problemsEyebrow: "ما يبطئ المدراء التنفيذيين",
    problemsTitle: "ما يبطئ المدراء التنفيذيين اليوم",
    problemsDescription: "ثلاثة أيام تأخر، ثلاث اجتماعات، ولا مصدر واحد للحقيقة.",
    challenges: [
      { title: "قرارات على أرقام قديمة", description: "تقرير الخميس يصل الجمعة. الهامش حُجز بالفعل.", icon: "benchmarking" },
      { title: "12 نظام، صفر توافق", description: "نقاط البيع، العمالة، المخزون، التوصيل — كل نظام يتحدث لغة مختلفة.", icon: "integration" },
      { title: "لا رؤية وراء الربع الماضي", description: "ترى ما حدث. لا ترى القادم. ولا ما تفعله حياله.", icon: "forecasting" },
      { title: "استراتيجية تضيع في إطفاء الحرائق", description: "المحفظة تحتاج توجيهاً. العمليات تحتاج إصلاحاً. كلاهما يخسر.", icon: "balance" },
    ],
    howTitle: "كيف يعمل Sundae للمكتب التنفيذي",
    howDescription: "مصدر حقيقة واحد عبر كل علامة، كل موقع، كل وردية.",
    howSundaeHelps: [
      { title: "قيادة المحفظة لحظياً", description: "إيرادات وهامش وعمالة حية عبر كل موقع. الوتيرة تنبه للمكان الذي يحتاج انتباهك قبل نهاية الوردية.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "إشارات السوق قبل التأثير", description: "المنافسون، الطقس، الأحداث، حركة المرور — مجمعة في إحاطة صباحية، فتتحرك قبل أن يهبط الأثر في الـ P&L.", product: "Watchtower", icon: "watchtower" },
      { title: "إجابات بمصادر في ثوانٍ", description: "اسأل لماذا تقلص هامش العلامة C أو أي مواقع تخسر أمام عروض المنافسين. احصل على إجابة مرقمة مع البيانات.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "توقعات 14–90 يوماً يمكنك الدفاع عنها", description: "Foresight يتوقع الإيرادات والعمالة وEBITDA. شغّل سيناريوهات قبل التزام رأس المال.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "ما يتغير للمكتب التنفيذي",
    outcomesDescription: "قرارات أسرع، محفظة أحدّ، توقعات قابلة للدفاع عنها.",
    outcomes: [
      { title: "قرر في ساعات لا أسابيع", description: "انتقل من الإقفال الشهري إلى الهامش الحي. القرار يصل وهو لا يزال مؤثراً.", icon: "speed" },
      { title: "محفظة أحكم، مفاجآت أقل", description: "المواقع ضعيفة الأداء تظهر في الإحاطة الصباحية — لا في مراجعة الربع.", icon: "performance" },
      { title: "توقعات يثق بها المجلس", description: "توقعات 14–90 يوماً مرتكزة على بياناتك التشغيلية وإشارات السوق.", icon: "owners" },
      { title: "قيادة موحدة حول رقم واحد", description: "العمليات والمالية والتسويق والمجلس يقرؤون نفس اللوحة الحية.", icon: "support" },
    ],
    ctaTitle: "شاهد محفظتك في عرض واحد.",
    ctaDescription: "30 دقيقة. بياناتك. ما الذي سيتغير فعلياً للمكتب التنفيذي.",
    ctaButton: "احجز إحاطة تنفيذية",
  },
  fr: {
    badge: "Pour dirigeants et propriétaires",
    titleLine1: "Pilotez le portefeuille.",
    titleLine2: "Pas le tableur.",
    description: "Briefings IA quotidiens sur chaque marque. Marge en temps réel. Signal marché avant qu'il ne touche vos chiffres.",
    primaryCta: "Réserver un briefing exécutif",
    secondaryCta: "Voir la démo dirigeants",
    problemsEyebrow: "CE QUI RALENTIT LES DIRIGEANTS",
    problemsTitle: "Ce qui ralentit les dirigeants aujourd'hui",
    problemsDescription: "Trois jours de retard, trois réunions, aucune source unique de vérité.",
    challenges: [
      { title: "Décisions sur des chiffres périmés", description: "Le récap du jeudi arrive vendredi. La marge est déjà comptabilisée.", icon: "benchmarking" },
      { title: "12 systèmes, zéro alignement", description: "POS, RH, stocks, livraison — chaque système parle un dialecte différent.", icon: "integration" },
      { title: "Aucune vue au-delà du dernier trimestre", description: "Vous voyez ce qui est arrivé. Pas ce qui vient. Ni quoi en faire.", icon: "forecasting" },
      { title: "Stratégie perdue dans la gestion d'urgences", description: "Le portefeuille demande du cap. L'opérationnel demande de l'attention. Les deux perdent.", icon: "balance" },
    ],
    howTitle: "Comment Sundae sert l'équipe dirigeante",
    howDescription: "Une seule source de vérité — toutes marques, tous sites, tous services.",
    howSundaeHelps: [
      { title: "Pilotage portefeuille en temps réel", description: "Revenu, marge et main-d'œuvre sur chaque site. Le rythme signale le lieu qui a besoin de vous avant la fin du service.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Signal marché avant l'impact", description: "Concurrents, météo, événements, fréquentation — synthétisés dans un briefing matinal pour agir avant l'effet sur le P&L.", product: "Watchtower", icon: "watchtower" },
      { title: "Réponses sourcées en secondes", description: "Demandez pourquoi la marge B compresse ou quels sites perdent face aux promos rivales. Réponse chiffrée avec les données citées.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Prévisions 14–90 jours défendables", description: "Foresight projette revenu, main-d'œuvre et EBITDA. Testez un scénario avant d'engager du capital.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "Ce qui change pour la direction",
    outcomesDescription: "Décisions plus rapides, portefeuille plus net, prévisions défendables.",
    outcomes: [
      { title: "Décider en heures, pas en semaines", description: "Passez de la clôture mensuelle à la marge live. La décision arrive pendant qu'elle compte.", icon: "speed" },
      { title: "Portefeuille plus net, moins de surprises", description: "Les sites en sous-performance apparaissent dans le briefing matinal — pas dans la revue trimestrielle.", icon: "performance" },
      { title: "Prévisions que le conseil accepte", description: "Projections 14–90 jours assises sur vos données et le signal marché.", icon: "owners" },
      { title: "Direction alignée sur un seul chiffre", description: "Ops, finance, marketing, conseil — même tableau de bord live.", icon: "support" },
    ],
    ctaTitle: "Votre portefeuille en une vue.",
    ctaDescription: "30 minutes. Vos données. Ce que Sundae changerait concrètement pour la direction.",
    ctaButton: "Réserver un briefing exécutif",
  },
  es: {
    badge: "Para alta dirección y propietarios",
    titleLine1: "Lidera el portafolio.",
    titleLine2: "No la hoja de cálculo.",
    description: "Briefings de IA diarios sobre cada marca. Margen en tiempo real. Señal de mercado antes de que toque tus números.",
    primaryCta: "Reservar briefing ejecutivo",
    secondaryCta: "Ver demo ejecutiva",
    problemsEyebrow: "QUÉ FRENA A LA DIRECCIÓN",
    problemsTitle: "Qué frena a la alta dirección hoy",
    problemsDescription: "Tres días tarde, tres reuniones, sin una sola fuente de verdad.",
    challenges: [
      { title: "Decisiones con números viejos", description: "El reporte del jueves llega el viernes. El margen ya quedó contabilizado.", icon: "benchmarking" },
      { title: "12 sistemas, cero alineación", description: "POS, personal, inventario, delivery — cada uno habla un dialecto distinto.", icon: "integration" },
      { title: "Sin visión más allá del trimestre", description: "Ves lo que pasó. No lo que viene. Ni qué hacer con ello.", icon: "forecasting" },
      { title: "Estrategia perdida apagando incendios", description: "El portafolio necesita rumbo. Operaciones necesita atención. Pierden los dos.", icon: "balance" },
    ],
    howTitle: "Cómo trabaja Sundae para la dirección",
    howDescription: "Una fuente de verdad — todas las marcas, todas las ubicaciones, todos los turnos.",
    howSundaeHelps: [
      { title: "Comando de portafolio en tiempo real", description: "Ingresos, margen y personal en vivo por ubicación. El ritmo señala el local que necesita tu atención antes del cierre.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Señal de mercado antes del impacto", description: "Competidores, clima, eventos, tráfico — sintetizados en un briefing matinal para actuar antes de que el P&L lo registre.", product: "Watchtower", icon: "watchtower" },
      { title: "Respuestas con fuente en segundos", description: "Pregunta por qué la marca C comprimió margen o qué locales pierden frente a promos rivales. Respuesta numérica con sus fuentes.", product: "Sundae Intelligence", icon: "intelligence" },
      { title: "Pronósticos 14–90 días defendibles", description: "Foresight proyecta ingresos, personal y EBITDA. Modela un escenario antes de comprometer capital.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "Qué cambia para la dirección",
    outcomesDescription: "Decisiones más rápidas, portafolio más afinado, pronósticos defendibles.",
    outcomes: [
      { title: "Decide en horas, no en semanas", description: "Pasa del cierre mensual al margen en vivo. La decisión llega mientras importa.", icon: "speed" },
      { title: "Portafolio afinado, menos sorpresas", description: "Los locales débiles aparecen en el briefing matinal — no en la revisión trimestral.", icon: "performance" },
      { title: "Pronósticos que el consejo acepta", description: "Proyecciones 14–90 días basadas en tus datos operativos y la señal de mercado.", icon: "owners" },
      { title: "Liderazgo alineado en un solo número", description: "Operaciones, finanzas, marketing y consejo — el mismo panel en vivo.", icon: "support" },
    ],
    ctaTitle: "Tu portafolio en una sola vista.",
    ctaDescription: "30 minutos. Tus datos. Lo que Sundae cambiaría realmente para la dirección.",
    ctaButton: "Reservar briefing ejecutivo",
  },
};

export default function CSuiteExecutivesPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  return <SolutionPageLayout copy={copy} mockup={<ExecutiveBriefingMockup />} />;
}
