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
    description: "Portfolio rollup across brands, regions, and concepts. Brand-vs-brand benchmarks. Find a margin leak in any brand, route the fix to an accountable owner, and measure the recovery across the group - the closed loop no single POS can run.",
    primaryCta: "Book a Group Walk-through",
    secondaryCta: "See Group Demo",
    problemsEyebrow: "WHERE THE GROUP LOSES LEVERAGE",
    problemsTitle: "Where the group loses its scale advantage",
    problemsDescription: "Brand-by-brand reporting, no peer comparison, decisions made at the brand level instead of the portfolio level.",
    challenges: [
      { title: "Each brand reports its own way", description: "Brand A on Toast, Brand B on Square, Brand C on Lightspeed. The group office reconciles by hand - or doesn't.", icon: "integration" },
      { title: "No brand-vs-brand comparison", description: "You can't tell if Brand B's labor % is good or bad without context. Internal benchmarks would change the conversation.", icon: "balance" },
      { title: "Best operating practice stays in one brand", description: "Brand A figured out lunch turnover. Brand B is still struggling. The know-how never crosses the brand line.", icon: "support" },
      { title: "Group strategy reacts to monthly P&L", description: "Brand investment, market entry, format decisions - driven by last quarter's P&L, and no one measures whether the fix actually recovered the margin.", icon: "performance" },
    ],
    howTitle: "How Sundae works for multi-brand groups",
    howDescription: "Portfolio truth, brand-vs-brand benchmarks, group-level strategic signal.",
    howSundaeHelps: [
      { title: "Portfolio rollup, brand-by-brand", description: "Live revenue, margin, labor across every brand, region, and concept - with consistent definitions so the comparison actually means something.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Internal benchmarks across your brands", description: "Brand B vs Brand A on labor productivity. Brand C vs market peers on RevPASH. The conversations the group office should be having.", product: "Benchmarks", icon: "benchmarking" },
      { title: "Cross-brand practice transfer", description: "What's working at Brand A propagates to Brand B in days, not quarterly off-sites. Cross-Intelligence finds the pattern, Sundae routes it to the accountable brand - and measures the recovered margin against baseline.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Strategic forecasting at group level", description: "Foresight projects EBITDA per brand and across the portfolio - the baseline every recovered-margin claim is measured against. Run what-if on a new market, a concept, or a CapEx commitment.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "What changes for the group office",
    outcomesDescription: "Portfolio leverage realized, brand silos broken, every fix measured back to margin.",
    outcomes: [
      { title: "Manage as a portfolio, not a portfolio of brands", description: "Same metrics across every brand. Capital, talent, and attention go where they earn the highest return.", icon: "speed" },
      { title: "Brand-vs-brand comparison that holds", description: "Internal peer benchmarks turn brand reviews from anecdote to evidence.", icon: "performance" },
      { title: "Group-wide best practice", description: "Cross-Intelligence routes what works across brand lines and measures the margin each brand recovers - instead of quarterly knowledge transfer.", icon: "owners" },
      { title: "Capital allocation grounded in forecast", description: "EBITDA projections by brand inform where to invest, where to slow, where to exit.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "BACKED BY SUNDAE CREW",
      title: "Multi-region payroll on one engine, as you expand across borders.",
      description: "Multi-location groups inherit a single payroll calculation engine across US, Canada, UK, EU, and GCC - same readiness check, same proof packs, same statutory exports (NACHA · EFT · HMRC RTI · SEPA · WPS) and year-end forms per jurisdiction. Standardize as you scale instead of stitching one payroll provider per country. Optional - bring your own HR (Bayzat, Personio, Gusto) and Sundae still consolidates the signal.",
      ctaText: "Explore Sundae Crew",
    },
    ctaTitle: "Find the leak in any brand. Recover it across the group.",
    ctaDescription: "30 minutes. Your group. A margin leak routed to an owner and the recovery measured across brands - the loop no single P&L can close.",
    ctaButton: "Book a Group Walk-through",
  },
  ar: {
    badge: "للمجموعات متعددة المواقع",
    titleLine1: "منصة واحدة.",
    titleLine2: "كل علامة. كل سوق.",
    description: "تجميع المحفظة عبر العلامات والمناطق والمفاهيم. مقارنات علامة بعلامة. اكتشف تسرّب هامش في أي علامة، ووجّه الإصلاح إلى مالك مسؤول، وقِس الاسترداد عبر المجموعة كلها - الحلقة المغلقة التي لا يستطيع أي POS وحده تشغيلها.",
    primaryCta: "احجز جولة المجموعة",
    secondaryCta: "شاهد عرض المجموعة",
    problemsEyebrow: "أين تخسر المجموعة نفوذها",
    problemsTitle: "أين تخسر المجموعة ميزة الحجم",
    problemsDescription: "تقارير علامة بعلامة، لا مقارنة نظراء، قرارات على مستوى العلامة لا المحفظة.",
    challenges: [
      { title: "كل علامة تبلّغ بطريقتها", description: "العلامة A على Toast، B على Square، C على Lightspeed. مكتب المجموعة يسوي يدوياً - أو لا.", icon: "integration" },
      { title: "لا مقارنة علامة بعلامة", description: "لا يمكنك تحديد ما إذا كانت نسبة عمالة B جيدة بدون سياق. المعايير الداخلية ستغير المحادثة.", icon: "balance" },
      { title: "أفضل ممارسة تشغيلية تبقى في علامة واحدة", description: "العلامة A اكتشفت دوران الغداء. B تعاني. المعرفة لا تعبر الخط.", icon: "support" },
      { title: "استراتيجية المجموعة تتفاعل مع P&L شهري", description: "استثمار العلامة، ودخول السوق، وقرارات الصيغة - مدفوعة بـ P&L الربع الماضي، ولا أحد يقيس ما إذا كان الإصلاح قد استرد الهامش فعلاً.", icon: "performance" },
    ],
    howTitle: "كيف يعمل Sundae للمجموعات متعددة العلامات",
    howDescription: "حقيقة محفظة، معايير علامة بعلامة، إشارة استراتيجية على مستوى المجموعة.",
    howSundaeHelps: [
      { title: "تجميع محفظة، علامة بعلامة", description: "إيرادات وهامش وعمالة حية عبر كل علامة ومنطقة ومفهوم - بتعريفات متسقة.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "معايير داخلية عبر علاماتك", description: "العلامة B مقابل A على إنتاجية العمالة. C مقابل نظراء السوق على RevPASH.", product: "Benchmarks", icon: "benchmarking" },
      { title: "نقل ممارسات بين العلامات", description: "ما ينجح في العلامة A ينتشر إلى العلامة B خلال أيام، لا في اجتماعات ربع سنوية. تجد Cross-Intelligence النمط، ويوجّهه Sundae إلى العلامة المسؤولة - ويقيس الهامش المسترد مقابل خط أساس.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "توقعات استراتيجية على مستوى المجموعة", description: "يتوقع Foresight قيمة EBITDA لكل علامة وعبر المحفظة - خط الأساس الذي يُقاس عليه كل هامش مسترد. شغّل سيناريوهات لسوق جديدة أو مفهوم أو التزام CapEx.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "ما يتغير لمكتب المجموعة",
    outcomesDescription: "نفوذ المحفظة محقق، صوامع العلامات مكسورة، وكل إصلاح مُقاس عائداً إلى الهامش.",
    outcomes: [
      { title: "أدر كمحفظة لا كمحفظة علامات", description: "نفس المقاييس عبر كل علامة. رأس المال والمواهب والانتباه يذهبون حيث يكسبون أكثر.", icon: "speed" },
      { title: "مقارنة علامة بعلامة صامدة", description: "معايير نظراء داخلية تحول مراجعات العلامة من حكاية إلى دليل.", icon: "performance" },
      { title: "أفضل ممارسة على مستوى المجموعة", description: "توجّه Cross-Intelligence ما ينجح عبر خطوط العلامات وتقيس الهامش الذي تستردّه كل علامة - بدل نقل المعرفة ربع السنوي.", icon: "owners" },
      { title: "تخصيص رأس مال مرتكز على التوقع", description: "إسقاطات EBITDA لكل علامة تُعلم أين تستثمر وأين تتباطأ.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "مدعوم بـ Sundae Crew",
      title: "رواتب متعددة المناطق على محرك واحد، مع توسعك عبر الحدود.",
      description: "المجموعات متعددة المواقع ترث محرك حساب رواتب واحداً عبر الولايات المتحدة وكندا والمملكة المتحدة والاتحاد الأوروبي ودول الخليج - نفس فحص الجاهزية، نفس حزم الإثبات، نفس التصديرات القانونية (NACHA · EFT · HMRC RTI · SEPA · WPS) ونماذج نهاية السنة لكل ولاية قضائية. وحّد كما تتوسع بدلاً من خياطة مزود رواتب لكل دولة. اختياري - أحضر HR الخاص بك (Bayzat، Personio، Gusto) ويبقى Sundae يدمج الإشارة.",
      ctaText: "اكتشف Sundae Crew",
    },
    ctaTitle: "اكتشف التسرّب في أي علامة. استردّه عبر المجموعة كلها.",
    ctaDescription: "30 دقيقة. مجموعتك. تسرّب هامش موجّه إلى مالك والاسترداد مُقاس عبر العلامات - الحلقة التي لا يستطيع أي P&L وحده إغلاقها.",
    ctaButton: "احجز جولة المجموعة",
  },
  fr: {
    badge: "Pour groupes multi-marques",
    titleLine1: "Une plateforme.",
    titleLine2: "Chaque marque. Chaque marché.",
    description: "Consolidation du portefeuille sur les marques, régions et concepts. Benchmarks d'une marque à l'autre. Repérez une fuite de marge dans n'importe quelle marque, confiez la correction à un responsable désigné et mesurez la récupération sur tout le groupe - la boucle fermée qu'aucun POS seul ne peut faire tourner.",
    primaryCta: "Réserver une visite groupe",
    secondaryCta: "Voir la démo groupe",
    problemsEyebrow: "OÙ LE GROUPE PERD SON LEVIER",
    problemsTitle: "Où le groupe perd son avantage d'échelle",
    problemsDescription: "Reporting marque par marque, pas de comparaison de pairs, décisions au niveau marque au lieu du portefeuille.",
    challenges: [
      { title: "Chaque marque reporte à sa façon", description: "Marque A sur Toast, B sur Square, C sur Lightspeed. Le siège réconcilie à la main - ou pas.", icon: "integration" },
      { title: "Pas de comparaison marque-vs-marque", description: "Vous ne pouvez pas dire si le % main-d'œuvre B est bon ou non sans contexte.", icon: "balance" },
      { title: "Bonne pratique opérationnelle dans une seule marque", description: "Marque A a résolu le turnover lunch. Marque B peine encore. Le savoir-faire ne traverse pas la marque.", icon: "support" },
      { title: "Stratégie groupe en réaction au P&L mensuel", description: "Investissement dans la marque, entrée sur le marché, décisions de format - pilotés par le P&L du trimestre dernier, et personne ne mesure si la correction a réellement récupéré la marge.", icon: "performance" },
    ],
    howTitle: "Comment Sundae sert les groupes multi-marques",
    howDescription: "Vérité portefeuille, benchmarks marque-vs-marque, signal stratégique groupe.",
    howSundaeHelps: [
      { title: "Rollup portefeuille, marque par marque", description: "Revenu, marge, main-d'œuvre live sur chaque marque, région, concept - avec définitions cohérentes.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Benchmarks internes entre marques", description: "Marque B vs A sur productivité. Marque C vs pairs marché sur RevPASH.", product: "Benchmarks", icon: "benchmarking" },
      { title: "Transfert de pratique entre marques", description: "Ce qui fonctionne chez la marque A se propage à la marque B en quelques jours, pas lors de séminaires trimestriels. Cross-Intelligence repère le schéma, Sundae l'achemine vers la marque responsable - et mesure la marge récupérée par rapport à une référence.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Prévision stratégique groupe", description: "Foresight projette l'EBITDA par marque et sur l'ensemble du portefeuille - la référence à laquelle chaque marge récupérée est comparée. Simulez un nouveau marché, un concept ou un engagement CapEx.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "Ce qui change pour le siège",
    outcomesDescription: "Effet de levier du portefeuille réalisé, silos de marque brisés, chaque correction mesurée jusqu'à la marge.",
    outcomes: [
      { title: "Gérez comme un portefeuille, pas un portefeuille de marques", description: "Mêmes métriques. Capital, talent et attention vont où ils rapportent le plus.", icon: "speed" },
      { title: "Comparaison marque-vs-marque qui tient", description: "Benchmarks internes transforment les revues marque de l'anecdote à la preuve.", icon: "performance" },
      { title: "Bonne pratique à l'échelle groupe", description: "Cross-Intelligence achemine ce qui fonctionne entre les marques et mesure la marge que chacune récupère - au lieu d'un transfert de connaissances trimestriel.", icon: "owners" },
      { title: "Allocation de capital fondée sur la prévision", description: "Projections EBITDA par marque informent où investir, ralentir, sortir.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "ALIMENTÉ PAR SUNDAE CREW",
      title: "Paie multi-régions sur un moteur, à mesure que vous traversez les frontières.",
      description: "Les groupes multi-sites héritent d'un seul moteur de calcul paie sur États-Unis, Canada, Royaume-Uni, UE et GCC - même check de readiness, mêmes proof packs, mêmes exports statutaires (NACHA · EFT · HMRC RTI · SEPA · WPS) et formulaires fin d'année par juridiction. Standardisez en grandissant plutôt que de coller un prestataire paie par pays. Optionnel - BYO-HR (Bayzat, Personio, Gusto) et Sundae consolide quand même le signal.",
      ctaText: "Découvrir Sundae Crew",
    },
    ctaTitle: "Repérez la fuite dans n'importe quelle marque. Récupérez-la sur tout le groupe.",
    ctaDescription: "30 minutes. Votre groupe. Une fuite de marge confiée à un responsable et la récupération mesurée d'une marque à l'autre - la boucle qu'aucun P&L seul ne peut fermer.",
    ctaButton: "Réserver une visite groupe",
  },
  es: {
    badge: "Para grupos multi-marca",
    titleLine1: "Una plataforma.",
    titleLine2: "Cada marca. Cada mercado.",
    description: "Consolidación de la cartera por marcas, regiones y conceptos. Comparativas de marca contra marca. Detecta una fuga de margen en cualquier marca, dirige la solución a un responsable con nombre y mide la recuperación en todo el grupo - el ciclo cerrado que ningún POS por sí solo puede ejecutar.",
    primaryCta: "Reservar recorrido de grupo",
    secondaryCta: "Ver demo de grupo",
    problemsEyebrow: "DÓNDE EL GRUPO PIERDE PALANCA",
    problemsTitle: "Dónde el grupo pierde su ventaja de escala",
    problemsDescription: "Reporting marca por marca, sin comparación de pares, decisiones a nivel marca en vez de portafolio.",
    challenges: [
      { title: "Cada marca reporta a su manera", description: "Marca A en Toast, B en Square, C en Lightspeed. La sede reconcilia a mano - o no.", icon: "integration" },
      { title: "Sin comparación marca contra marca", description: "No puedes decir si el % personal de B es bueno sin contexto.", icon: "balance" },
      { title: "Mejor práctica operativa en una sola marca", description: "Marca A resolvió el turnover de lunch. Marca B sigue luchando.", icon: "support" },
      { title: "Estrategia de grupo reacciona al P&L mensual", description: "Inversión en marca, entrada a mercado y decisiones de formato - guiadas por el P&L del trimestre pasado, y nadie mide si la solución realmente recuperó el margen.", icon: "performance" },
    ],
    howTitle: "Cómo trabaja Sundae para grupos multi-marca",
    howDescription: "Verdad de portafolio, benchmarks marca contra marca, señal estratégica de grupo.",
    howSundaeHelps: [
      { title: "Rollup de portafolio, marca por marca", description: "Ingresos, margen, personal en vivo en cada marca, región, concepto - con definiciones consistentes.", product: "Sundae Core + Pulse", icon: "chart" },
      { title: "Benchmarks internos entre tus marcas", description: "Marca B vs A en productividad. Marca C vs pares de mercado en RevPASH.", product: "Benchmarks", icon: "benchmarking" },
      { title: "Transferencia de prácticas entre marcas", description: "Lo que funciona en la Marca A llega a la Marca B en días, no en encuentros trimestrales. Cross-Intelligence encuentra el patrón, Sundae lo dirige a la marca responsable - y mide el margen recuperado contra una línea base.", product: "Cross-Intelligence", icon: "intelligence" },
      { title: "Pronóstico estratégico a nivel grupo", description: "Foresight proyecta el EBITDA por marca y en toda la cartera - la línea base contra la que se mide cada margen recuperado. Modela escenarios para un nuevo mercado, un concepto o un compromiso de CapEx.", product: "Foresight", icon: "forecasting" },
    ],
    outcomesTitle: "Qué cambia para la sede",
    outcomesDescription: "Palanca de cartera realizada, silos de marca rotos, cada solución medida de vuelta al margen.",
    outcomes: [
      { title: "Gestiona como portafolio, no como portafolio de marcas", description: "Mismas métricas. Capital, talento y atención van donde rinden más.", icon: "speed" },
      { title: "Comparación marca contra marca que se sostiene", description: "Benchmarks internos convierten las revisiones de marca de anécdota a evidencia.", icon: "performance" },
      { title: "Mejor práctica a nivel grupo", description: "Cross-Intelligence dirige lo que funciona entre marcas y mide el margen que recupera cada una - en vez de una transferencia trimestral de conocimiento.", icon: "owners" },
      { title: "Asignación de capital anclada en pronóstico", description: "Proyecciones EBITDA por marca informan dónde invertir, frenar, salir.", icon: "support" },
    ],
    crewCallout: {
      eyebrow: "RESPALDADO POR SUNDAE CREW",
      title: "Nómina multi-región sobre un motor, al expandirte por fronteras.",
      description: "Los grupos multi-local heredan un solo motor de cálculo de nómina sobre Estados Unidos, Canadá, Reino Unido, UE y GCC - mismo check de readiness, mismos proof packs, mismos exportes estatutarios (NACHA · EFT · HMRC RTI · SEPA · WPS) y formularios fin de año por jurisdicción. Estandariza al crecer en vez de pegar un proveedor de nómina por país. Opcional - BYO-HR (Bayzat, Personio, Gusto) y Sundae sigue consolidando la señal.",
      ctaText: "Explorar Sundae Crew",
    },
    ctaTitle: "Detecta la fuga en cualquier marca. Recupérala en todo el grupo.",
    ctaDescription: "30 minutos. Tu grupo. Una fuga de margen dirigida a un responsable y la recuperación medida entre marcas - el ciclo que ningún P&L por sí solo puede cerrar.",
    ctaButton: "Reservar recorrido de grupo",
  },
};

export default function MultiLocationGroupsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  return <SolutionPageLayout copy={copy} mockup={<ThemedShot framed priority width={1600} height={1000} dark="/images/product/2026-fresh/benchmark-overview-dark.png" light="/images/product/2026-fresh/benchmark-overview.png" alt="Benchmark - RevPASH index and peer-cohort comparison across every brand and market" />} gallery={<SectionProductGallery defaultPersona="multi_loc" />} />;
}
