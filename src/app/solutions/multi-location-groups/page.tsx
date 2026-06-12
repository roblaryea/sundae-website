"use client";

import { ThemedShot } from "@/components/ui/ThemedShot";
import { SolutionPageLayout, type SolutionCopy } from "@/components/solutions/SolutionPageLayout";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_solutions_multi_location_groups_page'

const localizedCopy: Record<"en" | "ar" | "fr" | "es", SolutionCopy> = {
  en: {
    badge: "For Multi-Location Groups",
    titleLine1: "One platform.",
    titleLine2: "Every brand. Every market.",
    description: "Portfolio rollup across brands, regions, and concepts. Brand-vs-brand benchmarks. The strategic view your group can't get from any single POS.",
    primaryCta: "Book a Group Walk-through",
    secondaryCta: "See Group Demo",
    problemsEyebrow: "WHERE THE GROUP LOSES LEVERAGE",
    problemsTitle: "Where the group loses its scale advantage",
    problemsDescription: "Brand-by-brand reporting, no peer comparison, decisions made at the brand level instead of the portfolio level.",
    challenges: [
      { title: "Each brand reports its own way", description: "Brand A on Toast, Brand B on Square, Brand C on Lightspeed. The group office reconciles by hand - or doesn't.", icon: "integration" },
      { title: "No brand-vs-brand comparison", description: "You can't tell if Brand B's labor % is good or bad without context. Internal benchmarks would change the conversation.", icon: "balance" },
      { title: "Best operating practice stays in one brand", description: "Brand A figured out lunch turnover. Brand B is still struggling. The know-how never crosses the brand line.", icon: "support" },
      { title: "Group strategy reacts to monthly P&L", description: "Brand investment, market entry, format decisions - all driven by Q+1 data, not live signal.", icon: "performance" },
    ],
    howTitle: "How Sundae works for multi-brand groups",
    howDescription: "Portfolio truth, brand-vs-brand benchmarks, group-level strategic signal.",
    howSundaeHelps: [
      { title: "Portfolio rollup, brand-by-brand", description: "Live revenue, margin, labor across every brand, region, and concept - with consistent definitions so the comparison actually means something.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Internal benchmarks across your brands", description: "Brand B vs Brand A on labor productivity. Brand C vs market peers on RevPASH. The conversations the group office should be having.", product: "Benchmarks", icon: "benchmarking" },
      { title: "Cross-brand practice transfer", description: "What's working at Brand A propagates to Brand B in days, not quarterly off-sites. Cross-Intelligence finds the pattern, Sundae routes it.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Strategic forecasting at group level", description: "Foresight projects EBITDA per brand and across the portfolio. Run what-if on a new market, a concept, or a CapEx commitment.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "What changes for the group office",
    outcomesDescription: "Portfolio leverage realized, brand silos broken, strategy gets live signal.",
    outcomes: [
      { title: "Manage as a portfolio, not a portfolio of brands", description: "Same metrics across every brand. Capital, talent, and attention go where they earn the highest return.", icon: "speed" },
      { title: "Brand-vs-brand comparison that holds", description: "Internal peer benchmarks turn brand reviews from anecdote to evidence.", icon: "performance" },
      { title: "Group-wide best practice", description: "Cross-Intelligence accelerates what works across brand lines - instead of quarterly knowledge transfer.", icon: "owners" },
      { title: "Capital allocation grounded in forecast", description: "EBITDA projections by brand inform where to invest, where to slow, where to exit.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "BACKED BY SUNDAE CREW",
      title: "Multi-region payroll on one engine, as you expand across borders.",
      description: "Multi-location groups inherit a single payroll calculation engine across US, Canada, UK, EU, and GCC - same readiness check, same proof packs, same statutory exports (NACHA · EFT · HMRC RTI · SEPA · WPS) and year-end forms per jurisdiction. Standardize as you scale instead of stitching one payroll provider per country. Optional - bring your own HR (Bayzat, Personio, Gusto) and Sundae still consolidates the signal.",
      ctaText: "Explore Sundae Crew",
    },
    ctaTitle: "See your portfolio across every brand.",
    ctaDescription: "30 minutes. Your group. The brand-vs-brand insight you couldn't get from any one P&L.",
    ctaButton: "Book a Group Walk-through",
  },
  ar: {
    badge: "للمجموعات متعددة المواقع",
    titleLine1: "منصة واحدة.",
    titleLine2: "كل علامة. كل سوق.",
    description: "تجميع محفظة عبر العلامات والمناطق والمفاهيم. مقارنات علامة بعلامة. الرؤية الاستراتيجية التي لا يقدمها أي POS مفرد.",
    primaryCta: "احجز جولة المجموعة",
    secondaryCta: "شاهد عرض المجموعة",
    problemsEyebrow: "أين تخسر المجموعة نفوذها",
    problemsTitle: "أين تخسر المجموعة ميزة الحجم",
    problemsDescription: "تقارير علامة بعلامة، لا مقارنة نظراء، قرارات على مستوى العلامة لا المحفظة.",
    challenges: [
      { title: "كل علامة تبلّغ بطريقتها", description: "العلامة A على Toast، B على Square، C على Lightspeed. مكتب المجموعة يسوي يدوياً - أو لا.", icon: "integration" },
      { title: "لا مقارنة علامة بعلامة", description: "لا يمكنك تحديد ما إذا كانت نسبة عمالة B جيدة بدون سياق. المعايير الداخلية ستغير المحادثة.", icon: "balance" },
      { title: "أفضل ممارسة تشغيلية تبقى في علامة واحدة", description: "العلامة A اكتشفت دوران الغداء. B تعاني. المعرفة لا تعبر الخط.", icon: "support" },
      { title: "استراتيجية المجموعة تتفاعل مع P&L شهري", description: "استثمار العلامة، دخول السوق، قرارات الصيغة - مدفوعة ببيانات الربع التالي.", icon: "performance" },
    ],
    howTitle: "كيف يعمل Sundae للمجموعات متعددة العلامات",
    howDescription: "حقيقة محفظة، معايير علامة بعلامة، إشارة استراتيجية على مستوى المجموعة.",
    howSundaeHelps: [
      { title: "تجميع محفظة، علامة بعلامة", description: "إيرادات وهامش وعمالة حية عبر كل علامة ومنطقة ومفهوم - بتعريفات متسقة.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "معايير داخلية عبر علاماتك", description: "العلامة B مقابل A على إنتاجية العمالة. C مقابل نظراء السوق على RevPASH.", product: "Benchmarks", icon: "benchmarking" },
      { title: "نقل ممارسات بين العلامات", description: "ما يعمل في العلامة A ينتشر إلى B في أيام، لا في تجمعات ربع سنوية.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "توقعات استراتيجية على مستوى المجموعة", description: "Foresight يتوقع EBITDA لكل علامة وعبر المحفظة. شغّل سيناريوهات قبل التزام رأس المال.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "ما يتغير لمكتب المجموعة",
    outcomesDescription: "نفوذ محفظة محقق، صوامع علامات منكسرة، استراتيجية تحصل على إشارة حية.",
    outcomes: [
      { title: "أدر كمحفظة لا كمحفظة علامات", description: "نفس المقاييس عبر كل علامة. رأس المال والمواهب والانتباه يذهبون حيث يكسبون أكثر.", icon: "speed" },
      { title: "مقارنة علامة بعلامة صامدة", description: "معايير نظراء داخلية تحول مراجعات العلامة من حكاية إلى دليل.", icon: "performance" },
      { title: "أفضل ممارسة على مستوى المجموعة", description: "Cross-Intelligence يسرّع ما يعمل عبر خطوط العلامات.", icon: "owners" },
      { title: "تخصيص رأس مال مرتكز على التوقع", description: "إسقاطات EBITDA لكل علامة تُعلم أين تستثمر وأين تتباطأ.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "مدعوم بـ Sundae Crew",
      title: "رواتب متعددة المناطق على محرك واحد، مع توسعك عبر الحدود.",
      description: "المجموعات متعددة المواقع ترث محرك حساب رواتب واحداً عبر الولايات المتحدة وكندا والمملكة المتحدة والاتحاد الأوروبي ودول الخليج - نفس فحص الجاهزية، نفس حزم الإثبات، نفس التصديرات القانونية (NACHA · EFT · HMRC RTI · SEPA · WPS) ونماذج نهاية السنة لكل ولاية قضائية. وحّد كما تتوسع بدلاً من خياطة مزود رواتب لكل دولة. اختياري - أحضر HR الخاص بك (Bayzat، Personio، Gusto) ويبقى Sundae يدمج الإشارة.",
      ctaText: "اكتشف Sundae Crew",
    },
    ctaTitle: "شاهد محفظتك عبر كل علامة.",
    ctaDescription: "30 دقيقة. مجموعتك. رؤية علامة بعلامة لا يقدمها أي P&L وحده.",
    ctaButton: "احجز جولة المجموعة",
  },
  fr: {
    badge: "Pour groupes multi-marques",
    titleLine1: "Une plateforme.",
    titleLine2: "Chaque marque. Chaque marché.",
    description: "Rollup portefeuille sur les marques, régions et concepts. Benchmarks marque-vs-marque. La vue stratégique qu'aucun POS unique ne donne.",
    primaryCta: "Réserver une visite groupe",
    secondaryCta: "Voir la démo groupe",
    problemsEyebrow: "OÙ LE GROUPE PERD SON LEVIER",
    problemsTitle: "Où le groupe perd son avantage d'échelle",
    problemsDescription: "Reporting marque par marque, pas de comparaison de pairs, décisions au niveau marque au lieu du portefeuille.",
    challenges: [
      { title: "Chaque marque reporte à sa façon", description: "Marque A sur Toast, B sur Square, C sur Lightspeed. Le siège réconcilie à la main - ou pas.", icon: "integration" },
      { title: "Pas de comparaison marque-vs-marque", description: "Vous ne pouvez pas dire si le % main-d'œuvre B est bon ou non sans contexte.", icon: "balance" },
      { title: "Bonne pratique opérationnelle dans une seule marque", description: "Marque A a résolu le turnover lunch. Marque B peine encore. Le savoir-faire ne traverse pas la marque.", icon: "support" },
      { title: "Stratégie groupe en réaction au P&L mensuel", description: "Investissement marque, entrée marché, décisions de format - pilotées par les données Q+1.", icon: "performance" },
    ],
    howTitle: "Comment Sundae sert les groupes multi-marques",
    howDescription: "Vérité portefeuille, benchmarks marque-vs-marque, signal stratégique groupe.",
    howSundaeHelps: [
      { title: "Rollup portefeuille, marque par marque", description: "Revenu, marge, main-d'œuvre live sur chaque marque, région, concept - avec définitions cohérentes.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Benchmarks internes entre marques", description: "Marque B vs A sur productivité. Marque C vs pairs marché sur RevPASH.", product: "Benchmarks", icon: "benchmarking" },
      { title: "Transfert de pratique entre marques", description: "Ce qui marche chez Marque A se propage chez B en jours, pas en off-sites trimestriels.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Prévision stratégique groupe", description: "Foresight projette EBITDA par marque et sur le portefeuille. Testez un scénario avant d'engager du capital.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "Ce qui change pour le siège",
    outcomesDescription: "Levier portefeuille réalisé, silos marques cassés, stratégie sur signal live.",
    outcomes: [
      { title: "Gérez comme un portefeuille, pas un portefeuille de marques", description: "Mêmes métriques. Capital, talent et attention vont où ils rapportent le plus.", icon: "speed" },
      { title: "Comparaison marque-vs-marque qui tient", description: "Benchmarks internes transforment les revues marque de l'anecdote à la preuve.", icon: "performance" },
      { title: "Bonne pratique à l'échelle groupe", description: "Cross-Intelligence accélère ce qui marche entre marques.", icon: "owners" },
      { title: "Allocation de capital fondée sur la prévision", description: "Projections EBITDA par marque informent où investir, ralentir, sortir.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "ALIMENTÉ PAR SUNDAE CREW",
      title: "Paie multi-régions sur un moteur, à mesure que vous traversez les frontières.",
      description: "Les groupes multi-sites héritent d'un seul moteur de calcul paie sur États-Unis, Canada, Royaume-Uni, UE et GCC - même check de readiness, mêmes proof packs, mêmes exports statutaires (NACHA · EFT · HMRC RTI · SEPA · WPS) et formulaires fin d'année par juridiction. Standardisez en grandissant plutôt que de coller un prestataire paie par pays. Optionnel - BYO-HR (Bayzat, Personio, Gusto) et Sundae consolide quand même le signal.",
      ctaText: "Découvrir Sundae Crew",
    },
    ctaTitle: "Votre portefeuille sur chaque marque.",
    ctaDescription: "30 minutes. Votre groupe. L'insight marque-vs-marque qu'aucun P&L ne donne.",
    ctaButton: "Réserver une visite groupe",
  },
  es: {
    badge: "Para grupos multi-marca",
    titleLine1: "Una plataforma.",
    titleLine2: "Cada marca. Cada mercado.",
    description: "Rollup de portafolio en marcas, regiones y conceptos. Benchmarks marca contra marca. La vista estratégica que ningún POS único da.",
    primaryCta: "Reservar recorrido de grupo",
    secondaryCta: "Ver demo de grupo",
    problemsEyebrow: "DÓNDE EL GRUPO PIERDE PALANCA",
    problemsTitle: "Dónde el grupo pierde su ventaja de escala",
    problemsDescription: "Reporting marca por marca, sin comparación de pares, decisiones a nivel marca en vez de portafolio.",
    challenges: [
      { title: "Cada marca reporta a su manera", description: "Marca A en Toast, B en Square, C en Lightspeed. La sede reconcilia a mano - o no.", icon: "integration" },
      { title: "Sin comparación marca contra marca", description: "No puedes decir si el % personal de B es bueno sin contexto.", icon: "balance" },
      { title: "Mejor práctica operativa en una sola marca", description: "Marca A resolvió el turnover de lunch. Marca B sigue luchando.", icon: "support" },
      { title: "Estrategia de grupo reacciona al P&L mensual", description: "Inversión, entrada de mercado, decisiones de formato - guiadas por datos Q+1.", icon: "performance" },
    ],
    howTitle: "Cómo trabaja Sundae para grupos multi-marca",
    howDescription: "Verdad de portafolio, benchmarks marca contra marca, señal estratégica de grupo.",
    howSundaeHelps: [
      { title: "Rollup de portafolio, marca por marca", description: "Ingresos, margen, personal en vivo en cada marca, región, concepto - con definiciones consistentes.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Benchmarks internos entre tus marcas", description: "Marca B vs A en productividad. Marca C vs pares de mercado en RevPASH.", product: "Benchmarks", icon: "benchmarking" },
      { title: "Transferencia de prácticas entre marcas", description: "Lo que funciona en Marca A se propaga a B en días, no en off-sites trimestrales.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Pronóstico estratégico a nivel grupo", description: "Foresight proyecta EBITDA por marca y en todo el portafolio. Modela un escenario antes de comprometer capital.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "Qué cambia para la sede",
    outcomesDescription: "Palanca de portafolio realizada, silos de marca rotos, estrategia con señal en vivo.",
    outcomes: [
      { title: "Gestiona como portafolio, no como portafolio de marcas", description: "Mismas métricas. Capital, talento y atención van donde rinden más.", icon: "speed" },
      { title: "Comparación marca contra marca que se sostiene", description: "Benchmarks internos convierten las revisiones de marca de anécdota a evidencia.", icon: "performance" },
      { title: "Mejor práctica a nivel grupo", description: "Cross-Intelligence acelera lo que funciona entre marcas.", icon: "owners" },
      { title: "Asignación de capital anclada en pronóstico", description: "Proyecciones EBITDA por marca informan dónde invertir, frenar, salir.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "RESPALDADO POR SUNDAE CREW",
      title: "Nómina multi-región sobre un motor, al expandirte por fronteras.",
      description: "Los grupos multi-local heredan un solo motor de cálculo de nómina sobre Estados Unidos, Canadá, Reino Unido, UE y GCC - mismo check de readiness, mismos proof packs, mismos exportes estatutarios (NACHA · EFT · HMRC RTI · SEPA · WPS) y formularios fin de año por jurisdicción. Estandariza al crecer en vez de pegar un proveedor de nómina por país. Opcional - BYO-HR (Bayzat, Personio, Gusto) y Sundae sigue consolidando la señal.",
      ctaText: "Explorar Sundae Crew",
    },
    ctaTitle: "Tu portafolio en cada marca.",
    ctaDescription: "30 minutos. Tu grupo. El insight marca contra marca que ningún P&L da.",
    ctaButton: "Reservar recorrido de grupo",
  },
};

export default function MultiLocationGroupsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  return <SolutionPageLayout copy={copy} mockup={<ThemedShot framed priority width={1600} height={1000} dark="/images/product/2026-fresh/benchmark-overview-dark.png" light="/images/product/2026-fresh/benchmark-overview.png" alt="Benchmark - RevPASH index and peer-cohort comparison across every brand and market" />} gallery={<SectionProductGallery defaultPersona="multi_loc" />} />;
}
