import { cookies } from "next/headers";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { PageHero, PageCTA, FadeUp } from "@/components/ui/PageAnimations";
import { resolveWebsiteLocale } from "@/lib/i18n";

type SecurityPillar = {
  icon: SundaeIconName;
  title: string;
  description: string;
};

type SecurityComplianceItem = {
  title: string;
  description: string;
  note?: string;
};

type SecurityCopy = {
  badge: string;
  title: string;
  description: string;
  architectureTitle: string;
  architectureDescription: string;
  complianceTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pillars: SecurityPillar[];
  compliance: SecurityComplianceItem[];
};

const securityCopy: Record<"en" | "ar" | "fr" | "es", SecurityCopy> = {
  en: {
    badge: "Security & Compliance",
    title: "Enterprise-Grade Security",
    description: "Your data is protected by industry-leading security practices, encryption, and compliance standards.",
    architectureTitle: "Security Architecture",
    architectureDescription: "Six pillars that protect your data from ingestion to insight.",
    complianceTitle: "Compliance & Certifications",
    ctaTitle: "Questions About Security?",
    ctaDescription: "Our team is happy to discuss our security practices and compliance certifications.",
    ctaPrimary: "Contact Us",
    ctaSecondary: "View Documentation",
    pillars: [
      { icon: "alerts", title: "Encryption at Rest & in Transit", description: "All data is encrypted using AES-256 at rest and TLS 1.3 in transit. API keys and credentials are stored in isolated, encrypted vaults - never in source code." },
      { icon: "integration", title: "Secure Integrations", description: "POS, payroll, and inventory connections use OAuth 2.0 or encrypted API tokens with least-privilege scoping. We never store raw credentials from third-party systems." },
      { icon: "operators", title: "Role-Based Access Control", description: "Granular RBAC lets you control who sees what - from location-level operators to portfolio-level executives. Every action is audit-logged." },
      { icon: "data", title: "Data Isolation & Residency", description: "Each customer's data is logically isolated. We support regional data residency requirements and can deploy within specific geographies on request." },
      { icon: "performance", title: "Infrastructure & Monitoring", description: "Hosted on enterprise-grade cloud infrastructure with automated failover, active monitoring, and documented incident response practices." },
      { icon: "dashboard", title: "Audit Logging & Transparency", description: "Every data access, export, and configuration change is logged. Customers can request audit trails and compliance documentation at any time." },
    ],
    compliance: [
      { title: "GDPR", description: "Full compliance with EU General Data Protection Regulation including data subject rights, lawful basis processing, and DPA availability." },
      { title: "SOC 2 Type II", description: "Pursuing SOC 2 Type II certification covering security, availability, and confidentiality trust service criteria.", note: "In progress" },
      { title: "Data Processing Agreements", description: "Standard DPAs available for all enterprise customers. Custom data handling terms negotiable for large deployments." },
      { title: "Penetration Testing", description: "Regular third-party penetration testing and vulnerability assessments. Findings are remediated within defined SLAs." },
    ],
  },
  ar: {
    badge: "الأمن والامتثال",
    title: "أمان على مستوى المؤسسات",
    description: "تتم حماية بياناتك بممارسات أمنية رائدة في الصناعة، وتشفير، ومعايير امتثال.",
    architectureTitle: "معمارية الأمن",
    architectureDescription: "ست دعائم تحمي بياناتك من الاستيعاب إلى الرؤية.",
    complianceTitle: "الامتثال والشهادات",
    ctaTitle: "هل لديك أسئلة حول الأمن؟",
    ctaDescription: "يسعد فريقنا مناقشة ممارساتنا الأمنية وشهادات الامتثال.",
    ctaPrimary: "اتصل بنا",
    ctaSecondary: "عرض الوثائق",
    pillars: [
      { icon: "alerts", title: "التشفير أثناء التخزين والنقل", description: "تُشفّر كل البيانات باستخدام AES-256 أثناء التخزين وTLS 1.3 أثناء النقل. تُحفظ مفاتيح API وبيانات الاعتماد في خزائن معزولة ومشفرة - وليس في الشيفرة المصدرية." },
      { icon: "integration", title: "تكاملات آمنة", description: "تستخدم اتصالات POS والرواتب والمخزون OAuth 2.0 أو رموز API مشفرة مع أقل قدر من الصلاحيات. لا نخزن بيانات اعتماد خام من أنظمة خارجية." },
      { icon: "operators", title: "التحكم بالوصول حسب الدور", description: "يسمح RBAC الدقيق بالتحكم فيما يراه كل شخص - من مشغلي المواقع إلى التنفيذيين. وكل إجراء يُسجّل للمراجعة." },
      { icon: "data", title: "عزل البيانات وإقامتها", description: "تُعزل بيانات كل عميل منطقيًا. ندعم متطلبات إقامة البيانات إقليميًا ويمكننا النشر ضمن جغرافيات محددة عند الطلب." },
      { icon: "performance", title: "البنية التحتية والمراقبة", description: "مستضافة على بنية سحابية مؤسسية مع فشل تلقائي، ومراقبة نشطة، وممارسات استجابة للحوادث موثقة." },
      { icon: "dashboard", title: "سجلات التدقيق والشفافية", description: "يتم تسجيل كل وصول للبيانات والتصدير وتغيير الإعدادات. يمكن للعملاء طلب سجلات التدقيق ووثائق الامتثال في أي وقت." },
    ],
    compliance: [
      { title: "GDPR", description: "امتثال كامل للائحة حماية البيانات الأوروبية بما في ذلك حقوق أصحاب البيانات، والأساس القانوني للمعالجة، وتوفر اتفاقية معالجة البيانات." },
      { title: "SOC 2 Type II", description: "نسعى للحصول على شهادة SOC 2 Type II تغطي الأمن والتوافر والسرية.", note: "قيد التنفيذ" },
      { title: "اتفاقيات معالجة البيانات", description: "تتوفر اتفاقيات معيارية لجميع العملاء المؤسسيين. يمكن التفاوض على شروط مخصصة للعمليات الكبيرة." },
      { title: "اختبار الاختراق", description: "اختبارات اختراق وتقييمات ثغرات منتظمة من أطراف ثالثة. يتم إصلاح النتائج ضمن اتفاقيات مستوى خدمة محددة." },
    ],
  },
  fr: {
    badge: "Sécurité et conformité",
    title: "Sécurité de niveau entreprise",
    description: "Vos données sont protégées par des pratiques de sécurité de pointe, du chiffrement et des standards de conformité.",
    architectureTitle: "Architecture sécurité",
    architectureDescription: "Six piliers qui protègent vos données de l'ingestion à l'insight.",
    complianceTitle: "Conformité et certifications",
    ctaTitle: "Des questions sur la sécurité ?",
    ctaDescription: "Notre équipe sera ravie de discuter de nos pratiques de sécurité et de nos certifications.",
    ctaPrimary: "Nous contacter",
    ctaSecondary: "Voir la documentation",
    pillars: [
      { icon: "alerts", title: "Chiffrement au repos et en transit", description: "Toutes les données sont chiffrées avec AES-256 au repos et TLS 1.3 en transit. Les clés API et identifiants sont stockés dans des coffres isolés et chiffrés - jamais dans le code source." },
      { icon: "integration", title: "Intégrations sécurisées", description: "Les connexions POS, paie et stock utilisent OAuth 2.0 ou des jetons API chiffrés avec des permissions minimales. Nous ne stockons jamais les identifiants bruts de systèmes tiers." },
      { icon: "operators", title: "Contrôle d'accès basé sur les rôles", description: "Le RBAC granulaire permet de contrôler qui voit quoi - des opérateurs de site aux dirigeants de portefeuille. Chaque action est journalisée." },
      { icon: "data", title: "Isolation et résidence des données", description: "Les données de chaque client sont isolées logiquement. Nous supportons la résidence régionale et pouvons déployer dans des géographies spécifiques sur demande." },
      { icon: "performance", title: "Infrastructure et supervision", description: "Hébergé sur une infrastructure cloud d'entreprise avec bascule automatique, supervision active et pratiques de réponse aux incidents documentées." },
      { icon: "dashboard", title: "Journalisation et transparence", description: "Chaque accès, export et changement de configuration est journalisé. Les clients peuvent demander des pistes d'audit et de la documentation de conformité à tout moment." },
    ],
    compliance: [
      { title: "GDPR", description: "Conformité complète au règlement européen sur la protection des données, y compris les droits des personnes, la base légale et les DPA." },
      { title: "SOC 2 Type II", description: "Certification SOC 2 Type II en cours couvrant la sécurité, la disponibilité et la confidentialité.", note: "En cours" },
      { title: "Accords de traitement des données", description: "DPA standards disponibles pour tous les clients enterprise. Conditions personnalisées possibles pour les grands déploiements." },
      { title: "Tests d'intrusion", description: "Tests d'intrusion et évaluations de vulnérabilités réguliers par des tiers. Les résultats sont corrigés selon des SLA définis." },
    ],
  },
  es: {
    badge: "Seguridad y cumplimiento",
    title: "Seguridad de nivel empresarial",
    description: "Tus datos están protegidos por prácticas de seguridad líderes, cifrado y estándares de cumplimiento.",
    architectureTitle: "Arquitectura de seguridad",
    architectureDescription: "Seis pilares que protegen tus datos desde la ingesta hasta el insight.",
    complianceTitle: "Cumplimiento y certificaciones",
    ctaTitle: "¿Preguntas sobre seguridad?",
    ctaDescription: "Nuestro equipo estará encantado de hablar sobre nuestras prácticas de seguridad y certificaciones.",
    ctaPrimary: "Contáctanos",
    ctaSecondary: "Ver documentación",
    pillars: [
      { icon: "alerts", title: "Cifrado en reposo y en tránsito", description: "Todos los datos se cifran con AES-256 en reposo y TLS 1.3 en tránsito. Las API keys y credenciales se guardan en bóvedas aisladas y cifradas - nunca en el código fuente." },
      { icon: "integration", title: "Integraciones seguras", description: "Las conexiones de POS, nómina e inventario usan OAuth 2.0 o tokens API cifrados con mínimos privilegios. Nunca almacenamos credenciales en bruto de terceros." },
      { icon: "operators", title: "Control de acceso por roles", description: "RBAC granular para controlar quién ve qué - desde operadores de ubicación hasta ejecutivos de cartera. Cada acción queda auditada." },
      { icon: "data", title: "Aislamiento y residencia de datos", description: "Los datos de cada cliente están lógicamente aislados. Soportamos residencia regional y podemos desplegar en geografías concretas bajo demanda." },
      { icon: "performance", title: "Infraestructura y monitorización", description: "Alojado en infraestructura cloud empresarial con failover automático, monitorización activa y respuesta a incidentes documentada." },
      { icon: "dashboard", title: "Registro y transparencia", description: "Cada acceso, exportación y cambio de configuración queda registrado. Los clientes pueden solicitar auditorías y documentación en cualquier momento." },
    ],
    compliance: [
      { title: "GDPR", description: "Cumplimiento total del reglamento europeo de protección de datos, incluidos derechos de interesados, base legal y DPA." },
      { title: "SOC 2 Type II", description: "Certificación SOC 2 Type II en progreso que cubre seguridad, disponibilidad y confidencialidad.", note: "En progreso" },
      { title: "Acuerdos de tratamiento de datos", description: "DPAs estándar disponibles para todos los clientes enterprise. Términos personalizados para grandes despliegues." },
      { title: "Pruebas de penetración", description: "Pruebas de penetración y evaluaciones de vulnerabilidades periódicas por terceros. Los hallazgos se corrigen según SLA definidos." },
    ],
  },
} as const;

export default async function SecurityPage() {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = securityCopy[locale] ?? securityCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.badge} title={copy.title} description={copy.description} />

      <FadeUp>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.architectureTitle}</h2>
              <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{copy.architectureDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {copy.pillars.map((pillar) => (
                <div key={pillar.title} className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                    <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      <FadeUp>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.complianceTitle}</h2>
            </div>
            <div className="space-y-6">
              {copy.compliance.map((item) => (
                <div key={item.title} className="p-6 rounded-xl border border-[var(--border-default)] bg-[var(--navy-deep)]">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{item.title}</h3>
                        {item.note && <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">{item.note}</span>}
                      </div>
                      <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <Button variant="cta" size="lg" href="/contact">{copy.ctaPrimary}</Button>
        <Button variant="outline-light" size="lg" href="/docs">{copy.ctaSecondary}</Button>
      </PageCTA>
    </div>
  );
}
