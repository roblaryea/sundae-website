"use client";

import { ThemedShot } from "@/components/ui/ThemedShot";
import { SolutionPageLayout, type SolutionCopy } from "@/components/solutions/SolutionPageLayout";
import { SectionProductGallery } from "@/components/home/sections/SectionProductGallery";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_solutions_technology_teams_page'

const localizedCopy: Record<"en" | "ar" | "fr" | "es", SolutionCopy> = {
  en: {
    badge: "For Technology & Data Teams",
    titleLine1: "Twelve sources.",
    titleLine2: "One governed schema.",
    description: "POS, labor, inventory, delivery, accounting — unified. RBAC, audit trails, public API, webhooks. Not another integration project.",
    primaryCta: "Book a Technical Walk-through",
    secondaryCta: "See API & Schema Docs",
    problemsEyebrow: "WHAT EATS THE BACKLOG",
    problemsTitle: "What eats the data backlog",
    problemsDescription: "Every new dashboard request becomes a six-week integration project.",
    challenges: [
      { title: "12 vendor APIs, 5 data formats", description: "Every report request becomes a custom ETL. Your team is glueing pipes, not building product.", icon: "integration" },
      { title: "No unified restaurant schema", description: "POS vendors model orders differently. Labor systems model shifts differently. You translate forever.", icon: "data" },
      { title: "Governance built in spreadsheets", description: "Metric definitions live in PMs' heads. \"Net revenue\" means three different things in three reports.", icon: "balance" },
      { title: "Real-time is a custom project", description: "Every \"can we get this live?\" question turns into a six-week build.", icon: "speed" },
    ],
    howTitle: "How Sundae works for tech & data teams",
    howDescription: "One platform, twelve domains, zero plumbing.",
    howSundaeHelps: [
      { title: "500+ governed restaurant data models", description: "Unified schema across POS, labor, inventory, delivery, reservations, accounting. Every metric defined once, used everywhere.", product: "Sundae Core", icon: "data" },
      { title: "Public API + webhooks out of the box", description: "REST endpoints for every entity. Webhook events on order, shift, void, comp. RBAC and audit trails built in.", product: "Sundae Core · API", icon: "integration" },
      { title: "Live Core refresh", description: "Pulse runs on a 5-minute refresh on Core Pro. No batch ETL, no nightly job, no \"why is the dashboard 6 hours behind\".", product: "Pulse", icon: "speed" },
      { title: "AI you can govern", description: "Sundae Intelligence answers cite the source row, the metric definition, and the query. Auditable AI, not a black box.", product: "Sundae Intelligence", icon: "intelligence" },
    ],
    outcomesTitle: "What changes for the data team",
    outcomesDescription: "Shorter backlog, cleaner governance, AI you can defend.",
    outcomes: [
      { title: "Stop building integrations", description: "Sundae owns POS/labor/inventory/delivery connectors. Your team builds product, not pipes.", icon: "speed" },
      { title: "One definition of every metric", description: "Net revenue, food cost %, labor productivity — defined once, governed centrally, used by every team.", icon: "performance" },
      { title: "Audit-grade traceability", description: "Every number → source row → query → metric definition. Finance, audit, and AI can all defend it.", icon: "owners" },
      { title: "AI that explains its reasoning", description: "Citations, confidence bands, query inspection. Ship AI features your CISO will sign off on.", icon: "support" },
    ],
    ctaTitle: "See the schema, not the slide.",
    ctaDescription: "30 minutes. Your stack. The integration weeks Sundae would save your team.",
    ctaButton: "Book a Technical Walk-through",
  },
  ar: {
    badge: "لفِرَق التقنية والبيانات",
    titleLine1: "اثنا عشر مصدراً.",
    titleLine2: "مخطط محكوم واحد.",
    description: "POS، عمالة، مخزون، توصيل، محاسبة — موحدة. RBAC، تتبع، API عامة، webhooks. لا مشروع تكامل آخر.",
    primaryCta: "احجز جولة تقنية",
    secondaryCta: "شاهد توثيق API",
    problemsEyebrow: "ما يستهلك الـ backlog",
    problemsTitle: "ما يستهلك backlog البيانات",
    problemsDescription: "كل طلب لوحة جديدة يصبح مشروع تكامل ستة أسابيع.",
    challenges: [
      { title: "12 API من موردين، 5 صيغ", description: "كل طلب تقرير يصبح ETL مخصص. فريقك يلصق الأنابيب لا يبني المنتج.", icon: "integration" },
      { title: "لا مخطط مطعم موحد", description: "موردو POS يمثلون الطلبات بشكل مختلف. أنظمة العمالة تمثل الورديات بشكل مختلف.", icon: "data" },
      { title: "حوكمة في جداول بيانات", description: "تعريفات المقاييس في رؤوس مديري المنتج. \"صافي الإيرادات\" يعني ثلاثة أشياء في ثلاثة تقارير.", icon: "balance" },
      { title: "الزمن الفعلي مشروع مخصص", description: "كل سؤال \"هل يمكننا الحصول على هذا حياً؟\" يتحول إلى بناء ستة أسابيع.", icon: "speed" },
    ],
    howTitle: "كيف يعمل Sundae لفِرَق التقنية والبيانات",
    howDescription: "منصة واحدة، اثنا عشر مجالاً، صفر سباكة.",
    howSundaeHelps: [
      { title: "500+ نموذج بيانات مطعم محكوم", description: "مخطط موحد عبر POS وعمالة ومخزون وتوصيل وحجوزات ومحاسبة. كل مقياس معرف مرة، يُستخدم في كل مكان.", product: "Sundae Core", icon: "data" },
      { title: "API عامة + webhooks جاهزة", description: "نقاط REST لكل كيان. أحداث webhook على الطلب والوردية والتجاوز والتعويض. RBAC وتتبع مدمجان.", product: "Sundae Core · API", icon: "integration" },
      { title: "تحديث Core حي", description: "Pulse يعمل بتحديث كل 5 دقائق على Core Pro. لا ETL دفعي، لا مهمة ليلية، لا \"لماذا اللوحة متأخرة 6 ساعات\".", product: "Pulse", icon: "speed" },
      { title: "ذكاء يمكن حوكمته", description: "إجابات Sundae Intelligence تستشهد بالصف المصدر وتعريف المقياس والاستعلام. ذكاء قابل للتدقيق لا صندوق أسود.", product: "Sundae Intelligence", icon: "intelligence" },
    ],
    outcomesTitle: "ما يتغير لفريق البيانات",
    outcomesDescription: "backlog أقصر، حوكمة أنظف، ذكاء يمكنك الدفاع عنه.",
    outcomes: [
      { title: "توقف عن بناء التكاملات", description: "Sundae يملك موصلات POS/العمالة/المخزون/التوصيل. فريقك يبني المنتج لا الأنابيب.", icon: "speed" },
      { title: "تعريف واحد لكل مقياس", description: "صافي الإيرادات، نسبة تكلفة الطعام، إنتاجية العمالة — معرفة مرة، محكومة مركزياً.", icon: "performance" },
      { title: "تتبع بدرجة تدقيق", description: "كل رقم ← صف المصدر ← الاستعلام ← تعريف المقياس. المالية والتدقيق والذكاء يدافعون عنه.", icon: "owners" },
      { title: "ذكاء يشرح منطقه", description: "استشهادات وفجوات ثقة وفحص استعلام. اشحن ميزات ذكاء سيوقع عليها CISO.", icon: "support" },
    ],
    ctaTitle: "شاهد المخطط لا الشريحة.",
    ctaDescription: "30 دقيقة. تكدسك. أسابيع التكامل التي سيوفرها Sundae.",
    ctaButton: "احجز جولة تقنية",
  },
  fr: {
    badge: "Pour Tech & Data",
    titleLine1: "Douze sources.",
    titleLine2: "Un schéma gouverné.",
    description: "POS, RH, stocks, livraison, comptabilité — unifiés. RBAC, audit, API publique, webhooks. Pas un projet d'intégration de plus.",
    primaryCta: "Réserver une visite technique",
    secondaryCta: "Voir API & docs schéma",
    problemsEyebrow: "CE QUI MANGE LE BACKLOG",
    problemsTitle: "Ce qui mange le backlog data",
    problemsDescription: "Chaque nouvelle demande de dashboard devient un projet d'intégration de six semaines.",
    challenges: [
      { title: "12 API fournisseurs, 5 formats", description: "Chaque requête de rapport devient un ETL custom. Votre équipe colle des tuyaux au lieu de construire.", icon: "integration" },
      { title: "Aucun schéma restaurant unifié", description: "Les vendeurs POS modélisent les commandes différemment. Les SIRH modélisent les shifts différemment.", icon: "data" },
      { title: "Gouvernance dans des tableurs", description: "Les définitions vivent dans la tête des PMs. \"Revenu net\" veut dire trois choses dans trois rapports.", icon: "balance" },
      { title: "Le temps réel est un projet sur-mesure", description: "Chaque \"on peut l'avoir live ?\" devient six semaines de build.", icon: "speed" },
    ],
    howTitle: "Comment Sundae sert Tech & Data",
    howDescription: "Une plateforme, douze domaines, zéro plomberie.",
    howSundaeHelps: [
      { title: "500+ modèles de données restaurant gouvernés", description: "Schéma unifié sur POS, main-d'œuvre, stocks, livraison, réservations, compta. Une définition, partout.", product: "Sundae Core", icon: "data" },
      { title: "API publique + webhooks prêts", description: "REST sur chaque entité. Webhooks sur commande, shift, annulation, comp. RBAC et audit inclus.", product: "Sundae Core · API", icon: "integration" },
      { title: "Refresh Core live", description: "Pulse en 5 min sur Core Pro. Pas d'ETL batch, pas de job nuit, pas de \"pourquoi le dashboard est en retard de 6h\".", product: "Pulse", icon: "speed" },
      { title: "IA gouvernable", description: "Réponses Sundae Intelligence avec source, définition, requête. IA auditable, pas boîte noire.", product: "Sundae Intelligence", icon: "intelligence" },
    ],
    outcomesTitle: "Ce qui change pour l'équipe data",
    outcomesDescription: "Backlog plus court, gouvernance propre, IA défendable.",
    outcomes: [
      { title: "Arrêtez de construire des intégrations", description: "Sundae possède les connecteurs POS/RH/stocks/livraison. Votre équipe construit du produit, pas des tuyaux.", icon: "speed" },
      { title: "Une définition par métrique", description: "Revenu net, coût matière %, productivité — définis une fois, gouvernés centralement.", icon: "performance" },
      { title: "Traçabilité niveau audit", description: "Chaque chiffre → ligne source → requête → définition. Finance, audit et IA peuvent défendre.", icon: "owners" },
      { title: "IA qui explique son raisonnement", description: "Citations, intervalles de confiance, inspection de requête. Livrez de l'IA que votre CISO valide.", icon: "support" },
    ],
    ctaTitle: "Voyez le schéma, pas le slide.",
    ctaDescription: "30 minutes. Votre stack. Les semaines d'intégration que Sundae économise.",
    ctaButton: "Réserver une visite technique",
  },
  es: {
    badge: "Para Tecnología y Data",
    titleLine1: "Doce fuentes.",
    titleLine2: "Un esquema gobernado.",
    description: "POS, personal, inventario, delivery, contabilidad — unificados. RBAC, auditoría, API pública, webhooks. No otro proyecto de integración.",
    primaryCta: "Reservar recorrido técnico",
    secondaryCta: "Ver API y esquema",
    problemsEyebrow: "QUÉ SE COME EL BACKLOG",
    problemsTitle: "Qué se come el backlog de datos",
    problemsDescription: "Cada nuevo dashboard se convierte en un proyecto de integración de seis semanas.",
    challenges: [
      { title: "12 APIs, 5 formatos", description: "Cada reporte se vuelve un ETL custom. Tu equipo pega tuberías en vez de construir producto.", icon: "integration" },
      { title: "Sin esquema restaurante unificado", description: "Los POS modelan pedidos distinto. Los sistemas de personal modelan turnos distinto.", icon: "data" },
      { title: "Gobernanza en hojas de cálculo", description: "Las definiciones viven en la cabeza de los PMs. \"Ingreso neto\" significa tres cosas en tres reportes.", icon: "balance" },
      { title: "Tiempo real es un proyecto a medida", description: "Cada \"¿podemos tener esto en vivo?\" se convierte en seis semanas de build.", icon: "speed" },
    ],
    howTitle: "Cómo trabaja Sundae para Tecnología y Data",
    howDescription: "Una plataforma, doce dominios, cero plomería.",
    howSundaeHelps: [
      { title: "500+ modelos de datos restaurante gobernados", description: "Esquema unificado en POS, personal, inventario, delivery, reservas, contabilidad. Una definición, en todas partes.", product: "Sundae Core", icon: "data" },
      { title: "API pública + webhooks listos", description: "REST en cada entidad. Webhooks en pedido, turno, anulación, comp. RBAC y auditoría incluidos.", product: "Sundae Core · API", icon: "integration" },
      { title: "Refresh Core en vivo", description: "Pulse en 5 min en Core Pro. Sin ETL batch, sin job nocturno, sin \"por qué el dashboard va 6 horas tarde\".", product: "Pulse", icon: "speed" },
      { title: "IA gobernable", description: "Respuestas de Sundae Intelligence con fuente, definición, query. IA auditable, no caja negra.", product: "Sundae Intelligence", icon: "intelligence" },
    ],
    outcomesTitle: "Qué cambia para el equipo data",
    outcomesDescription: "Backlog más corto, gobernanza limpia, IA defendible.",
    outcomes: [
      { title: "Deja de construir integraciones", description: "Sundae es dueño de los conectores POS/personal/inventario/delivery. Tu equipo construye producto.", icon: "speed" },
      { title: "Una definición por métrica", description: "Ingreso neto, coste alimentos %, productividad — definidos una vez, gobernados centralmente.", icon: "performance" },
      { title: "Trazabilidad nivel auditoría", description: "Cada cifra → fila fuente → query → definición. Finanzas, auditoría e IA pueden defender.", icon: "owners" },
      { title: "IA que explica su razonamiento", description: "Citas, intervalos de confianza, inspección de query. Lanza IA que tu CISO valida.", icon: "support" },
    ],
    ctaTitle: "Ve el esquema, no la diapositiva.",
    ctaDescription: "30 minutos. Tu stack. Las semanas de integración que Sundae ahorraría.",
    ctaButton: "Reservar recorrido técnico",
  },
};

export default function TechnologyTeamsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;
  return <SolutionPageLayout copy={copy} mockup={<ThemedShot framed priority width={1600} height={1000} dark="/images/product/2026-fresh/integrations-dark.png" light="/images/product/2026-fresh/integrations.png" alt="Data & Integrations — POS, labor, inventory, and delivery unified across dozens of governed connectors" />} gallery={<SectionProductGallery defaultPersona="tech" />} />;
}
