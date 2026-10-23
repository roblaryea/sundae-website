import { cookies } from "next/headers";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { PageHero, PageCTA, FadeUp } from "@/components/ui/PageAnimations";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_security_page'

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
  gdprGuide: string;
  pillars: SecurityPillar[];
  compliance: SecurityComplianceItem[];
};

const securityCopy: Record<"en" | "ar" | "fr" | "es", SecurityCopy> = {
  en: {
    badge: "Security & Compliance",
    title: "Security and data controls",
    description: "Documented controls, an active remediation program and evidence available for review.",
    architectureTitle: "Security Architecture",
    architectureDescription: "Six pillars that protect your data from ingestion to insight.",
    complianceTitle: "Assurance status",
    ctaTitle: "Questions About Security?",
    ctaDescription: "Documented controls, an active remediation program and evidence available for review.",
    ctaPrimary: "Contact Us",
    ctaSecondary: "View Documentation",
    gdprGuide: "Read the restaurant GDPR compliance guide",
    pillars: [
      { icon: "alerts", title: "Encryption at Rest & in Transit", description: "TLS and encryption protect supported services. Key management and provider coverage depend on the deployment." },
      { icon: "integration", title: "Secure Integrations", description: "Integrations use scoped access and encrypted credential storage where supported." },
      { icon: "operators", title: "Role-Based Access Control", description: "Organization, hierarchy and role controls restrict access to customer records." },
      { icon: "data", title: "Data Isolation & Residency", description: "Regional residency and client-owned hosting require a scoped implementation and signed deployment terms." },
      { icon: "performance", title: "Infrastructure & Monitoring", description: "Monitoring and incident procedures exist. Recovery targets require measured restoration tests." },
      { icon: "dashboard", title: "Audit Logging & Transparency", description: "Audit records cover selected actions. Request evidence for the services and period in scope." },
    ],
    compliance: [
      { title: "GDPR", description: "Privacy policies and rights workflows exist. Coverage and exceptions depend on the processing in scope." },
      { title: "SOC 2 Type II", description: "An evidence-based security-readiness program is active. Sundae does not currently hold a SOC 2 report.", note: "In progress" },
      { title: "Data Processing Agreements", description: "Confirm the effective DPA, processing annexes and governed subprocessor version before execution." },
      { title: "Penetration Testing", description: "Independent penetration testing is being sourced. No completed third-party test report is claimed." },
    ],
  },
  ar: {
    badge: "الأمن والامتثال",
    title: "الأمن وضوابط البيانات",
    description: "ضوابط موثقة وبرنامج معالجة نشط وأدلة متاحة للمراجعة.",
    architectureTitle: "معمارية الأمن",
    architectureDescription: "ست دعائم تحمي بياناتك من الاستيعاب إلى الرؤية.",
    complianceTitle: "حالة الضمان الأمني",
    ctaTitle: "هل لديك أسئلة حول الأمن؟",
    ctaDescription: "ضوابط موثقة وبرنامج معالجة نشط وأدلة متاحة للمراجعة.",
    ctaPrimary: "اتصل بنا",
    ctaSecondary: "عرض الوثائق",
    gdprGuide: "اقرأ دليل امتثال المطاعم للائحة GDPR",
    pillars: [
      { icon: "alerts", title: "التشفير أثناء التخزين والنقل", description: "تحمي تقنيات TLS والتشفير الخدمات المدعومة. تختلف إدارة المفاتيح وتغطية المزوّدين بحسب بيئة النشر." },
      { icon: "integration", title: "تكاملات آمنة", description: "تستخدم التكاملات صلاحيات محددة وتخزيناً مشفراً لبيانات الاعتماد حيثما كان ذلك مدعوماً." },
      { icon: "operators", title: "التحكم بالوصول حسب الدور", description: "تقيّد ضوابط المؤسسة والتسلسل التنظيمي والأدوار الوصول إلى سجلات العملاء." },
      { icon: "data", title: "عزل البيانات وإقامتها", description: "تتطلب إقامة البيانات إقليمياً والاستضافة المملوكة للعميل تنفيذاً محدد النطاق وشروط نشر موقّعة." },
      { icon: "performance", title: "البنية التحتية والمراقبة", description: "توجد إجراءات للمراقبة والاستجابة للحوادث. تتطلب أهداف التعافي اختبارات استعادة مقاسة." },
      { icon: "dashboard", title: "سجلات التدقيق والشفافية", description: "تغطي سجلات التدقيق إجراءات محددة. اطلب الأدلة الخاصة بالخدمات والفترة المشمولة." },
    ],
    compliance: [
      { title: "GDPR", description: "توجد سياسات للخصوصية ومسارات لطلبات الحقوق. تعتمد التغطية والاستثناءات على المعالجة المشمولة." },
      { title: "SOC 2 Type II", description: "يوجد برنامج نشط للاستعداد الأمني قائم على الأدلة. لا تملك Sundae حالياً تقرير SOC 2.", note: "قيد التنفيذ" },
      { title: "اتفاقيات معالجة البيانات", description: "تحقّق من اتفاقية معالجة البيانات النافذة وملاحق المعالجة وإصدار سجل المعالجين الفرعيين المعتمد قبل التوقيع." },
      { title: "اختبار الاختراق", description: "يجري البحث عن جهة مستقلة لاختبار الاختراق. لا ندّعي وجود تقرير مكتمل لاختبار أجراه طرف ثالث." },
    ],
  },
  fr: {
    badge: "Sécurité et conformité",
    title: "Sécurité et contrôle des données",
    description: "Des contrôles documentés, un programme de remédiation actif et des preuves consultables.",
    architectureTitle: "Architecture sécurité",
    architectureDescription: "Six piliers qui protègent vos données de l'ingestion à l'insight.",
    complianceTitle: "État des garanties",
    ctaTitle: "Des questions sur la sécurité ?",
    ctaDescription: "Des contrôles documentés, un programme de remédiation actif et des preuves consultables.",
    ctaPrimary: "Nous contacter",
    ctaSecondary: "Voir la documentation",
    gdprGuide: "Lire le guide RGPD pour les groupes de restauration",
    pillars: [
      { icon: "alerts", title: "Chiffrement au repos et en transit", description: "TLS et le chiffrement protègent les services pris en charge. La gestion des clés et la couverture des fournisseurs dépendent du déploiement." },
      { icon: "integration", title: "Intégrations sécurisées", description: "Les intégrations utilisent des accès limités et un stockage chiffré des identifiants lorsque ces mécanismes sont pris en charge." },
      { icon: "operators", title: "Contrôle d'accès basé sur les rôles", description: "Les contrôles par organisation, hiérarchie et rôle limitent l’accès aux dossiers clients." },
      { icon: "data", title: "Isolation et résidence des données", description: "La résidence régionale et l’hébergement chez le client nécessitent un périmètre de mise en œuvre et des conditions de déploiement signées." },
      { icon: "performance", title: "Infrastructure et supervision", description: "Des procédures de surveillance et de gestion des incidents existent. Les objectifs de reprise nécessitent des tests de restauration mesurés." },
      { icon: "dashboard", title: "Journalisation et transparence", description: "Les journaux couvrent certaines actions. Demandez les preuves correspondant aux services et à la période concernés." },
    ],
    compliance: [
      { title: "GDPR", description: "Des politiques de confidentialité et des procédures d’exercice des droits existent. Leur couverture et leurs exceptions dépendent des traitements concernés." },
      { title: "SOC 2 Type II", description: "Un programme de préparation à la sécurité fondé sur des preuves est actif. Sundae ne dispose actuellement d’aucun rapport SOC 2.", note: "En cours" },
      { title: "Accords de traitement des données", description: "Confirmez le DPA en vigueur, les annexes de traitement et la version approuvée du registre des sous-traitants avant signature." },
      { title: "Tests d'intrusion", description: "Un prestataire indépendant de test d’intrusion est en cours de sélection. Aucun rapport de test tiers achevé n’est revendiqué." },
    ],
  },
  es: {
    badge: "Seguridad y cumplimiento",
    title: "Seguridad y controles de datos",
    description: "Controles documentados, un programa activo de corrección y evidencias disponibles para revisión.",
    architectureTitle: "Arquitectura de seguridad",
    architectureDescription: "Seis pilares que protegen tus datos desde la ingesta hasta el insight.",
    complianceTitle: "Estado de las garantías",
    ctaTitle: "¿Preguntas sobre seguridad?",
    ctaDescription: "Controles documentados, un programa activo de corrección y evidencias disponibles para revisión.",
    ctaPrimary: "Contáctanos",
    ctaSecondary: "Ver documentación",
    gdprGuide: "Leer la guía de cumplimiento GDPR para restaurantes",
    pillars: [
      { icon: "alerts", title: "Cifrado en reposo y en tránsito", description: "TLS y el cifrado protegen los servicios compatibles. La gestión de claves y la cobertura de proveedores dependen del despliegue." },
      { icon: "integration", title: "Integraciones seguras", description: "Las integraciones usan accesos delimitados y almacenamiento cifrado de credenciales cuando se admite." },
      { icon: "operators", title: "Control de acceso por roles", description: "Los controles por organización, jerarquía y rol restringen el acceso a los registros del cliente." },
      { icon: "data", title: "Aislamiento y residencia de datos", description: "La residencia regional y el alojamiento del cliente requieren una implementación delimitada y condiciones de despliegue firmadas." },
      { icon: "performance", title: "Infraestructura y monitorización", description: "Existen procedimientos de supervisión e incidentes. Los objetivos de recuperación requieren pruebas de restauración medidas." },
      { icon: "dashboard", title: "Registro y transparencia", description: "Los registros de auditoría cubren acciones específicas. Solicite evidencias de los servicios y el período incluidos." },
    ],
    compliance: [
      { title: "GDPR", description: "Existen políticas de privacidad y procesos de derechos. Su cobertura y excepciones dependen del tratamiento incluido." },
      { title: "SOC 2 Type II", description: "Hay un programa activo de preparación de seguridad basado en evidencias. Sundae no dispone actualmente de un informe SOC 2.", note: "En progreso" },
      { title: "Acuerdos de tratamiento de datos", description: "Confirme el DPA vigente, los anexos de tratamiento y la versión aprobada del registro de subencargados antes de firmar." },
      { title: "Pruebas de penetración", description: "Se está buscando un proveedor independiente de pruebas de penetración. No se afirma disponer de un informe de terceros completado." },
    ],
  },
} as const;

export default async function SecurityPage() {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = securityCopy[locale as keyof typeof securityCopy] ?? getGeneratedLocalCopy(securityCopy, generatedLocalCopy.securityCopy, locale) ?? securityCopy.en;

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
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF5C4D] to-[#E03E48] rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                    <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-display)] mb-2">{pillar.title}</h3>
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
                        <h3 className="text-lg font-semibold text-[var(--text-display)]">{item.title}</h3>
                        {item.note && <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">{item.note}</span>}
                      </div>
                      <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button
                variant="outline-light"
                href="/blog/gdpr-data-privacy-restaurant-groups"
                trackingLabel="security_gdpr_guide"
              >
                {copy.gdprGuide}
              </Button>
            </div>
          </div>
        </section>
      </FadeUp>

      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <Button variant="cta" size="lg" href="/contact">{copy.ctaPrimary}</Button>
        <Button variant="outline-ink" size="lg" href="/docs">{copy.ctaSecondary}</Button>
      </PageCTA>
    </div>
  );
}
