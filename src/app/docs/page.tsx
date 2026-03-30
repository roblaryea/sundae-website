import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import type { WebsiteLocale } from "@/lib/i18n";

type DocSection = {
  title: string;
  description: string;
  icon: SundaeIconName;
  color: string;
  topics: string[];
};

type QuickStartStep = {
  step: string;
  title: string;
  description: string;
  icon: SundaeIconName;
};

type DocumentationCopy = {
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  topicsLabel: string;
  quickStartTitle: string;
  quickStartDescription: string;
  stepLabel: string;
  comingSoonTitle: string;
  comingSoonDescription: string;
  contactPrompt: string;
  contactLinkLabel: string;
  supportTitle: string;
  supportDescription: string;
  supportCta: string;
  trainingCta: string;
  sections: DocSection[];
  quickStartSteps: QuickStartStep[];
};

const localizedDocsCopy: Record<WebsiteLocale, DocumentationCopy> = {
  en: {
    badge: "Documentation",
    title: "Everything You Need to Know",
    description: "Guides, API references, and best practices to help you get the most from Sundae.",
    primaryCta: "Book a Demo",
    secondaryCta: "Try Sundae Report (Free)",
    topicsLabel: "Topics:",
    quickStartTitle: "Quick Start Guide",
    quickStartDescription: "Get up and running with Sundae in four simple steps",
    stepLabel: "Step",
    comingSoonTitle: "More Documentation Coming Soon",
    comingSoonDescription:
      "We're continuously expanding our documentation. Check back soon for API references, video tutorials, and advanced guides.",
    contactPrompt: "Questions in the meantime?",
    contactLinkLabel: "Get in touch with our team",
    supportTitle: "Need Help?",
    supportDescription: "Our team is here to help you get the most out of Sundae.",
    supportCta: "Contact Support",
    trainingCta: "Schedule Training",
    sections: [
      {
        title: "Getting Started",
        description: "Learn how to onboard to Sundae and connect your data sources",
        icon: "growth",
        color: "bg-[#1C47FF]",
        topics: [
          "Creating your Sundae account",
          "Connecting your POS system",
          "Integrating payroll and HR data",
          "Linking budgets and forecasts",
          "Initial setup checklist",
        ],
      },
      {
        title: "Using Sundae Report",
        description: "Get the most out of free benchmarking and performance reports",
        icon: "benchmarking",
        color: "bg-green-600",
        topics: [
          "Uploading your data for benchmarking",
          "Understanding your benchmark report",
          "Comparing performance across locations",
          "Industry standards and peer groups",
          "Using insights to drive decisions",
        ],
      },
      {
        title: "Sundae Core Guide",
        description: "Master conversational business intelligence with natural language queries",
        icon: "intelligence",
        color: "bg-purple-600",
        topics: [
          "Asking questions in plain English",
          "Exploring dashboards and charts",
          "Creating custom views",
          "Saving and sharing insights",
          "Advanced query techniques",
        ],
      },
      {
        title: "Pulse & Watchtower",
        description: "Set up real-time alerts and external market intelligence",
        icon: "insights",
        color: "bg-orange-600",
        topics: [
          "Setting up proactive alerts",
          "Understanding anomaly detection",
          "Connecting external data (weather, events)",
          "Configuring notification preferences",
          "Acting on intelligent recommendations",
        ],
      },
      {
        title: "Insights & Dashboards",
        description: "Build and customize dashboards for every team",
        icon: "chart",
        color: "bg-indigo-600",
        topics: [
          "Creating custom dashboards",
          "Configuring widgets and KPIs",
          "Setting up role-based views",
          "Scheduling automated reports",
          "Sharing dashboards with teams",
        ],
      },
      {
        title: "Security & Data Privacy",
        description: "Understand how Sundae protects your data",
        icon: "owners",
        color: "bg-teal-600",
        topics: [
          "Data encryption and security standards",
          "User access controls and permissions",
          "GDPR and compliance",
          "Data retention policies",
          "Privacy best practices",
        ],
      },
    ],
    quickStartSteps: [
      {
        step: "1",
        title: "Connect Data Sources",
        description: "Link your POS, payroll, inventory, and budget systems to Sundae Scout",
        icon: "integration",
      },
      {
        step: "2",
        title: "Run Your First Benchmark",
        description: "Upload data to Sundae Report and see how you compare to similar restaurants",
        icon: "benchmarking",
      },
      {
        step: "3",
        title: "Ask Questions",
        description: "Use Sundae Core to query your data in plain English and get instant answers",
        icon: "intelligence",
      },
      {
        step: "4",
        title: "Set Up Alerts",
        description: "Configure Sundae Core to monitor key metrics and notify you of anomalies",
        icon: "warning",
      },
    ],
  },
  ar: {
    badge: "التوثيق",
    title: "كل ما تحتاج إلى معرفته",
    description: "أدلة ومراجع API وأفضل الممارسات لمساعدتك على تحقيق أقصى استفادة من Sundae.",
    primaryCta: "احجز عرضاً",
    secondaryCta: "جرّب Sundae Report مجاناً",
    topicsLabel: "الموضوعات:",
    quickStartTitle: "دليل البدء السريع",
    quickStartDescription: "ابدأ مع Sundae في أربع خطوات بسيطة",
    stepLabel: "الخطوة",
    comingSoonTitle: "مزيد من التوثيق قريباً",
    comingSoonDescription:
      "نواصل توسيع التوثيق باستمرار. عد قريباً لمراجع API ودروس الفيديو والأدلة المتقدمة.",
    contactPrompt: "هل لديك أسئلة في هذه الأثناء؟",
    contactLinkLabel: "تواصل مع فريقنا",
    supportTitle: "هل تحتاج إلى مساعدة؟",
    supportDescription: "فريقنا هنا لمساعدتك على تحقيق أقصى استفادة من Sundae.",
    supportCta: "تواصل مع الدعم",
    trainingCta: "جدولة تدريب",
    sections: [
      {
        title: "البدء",
        description: "تعرّف على كيفية الانضمام إلى Sundae وربط مصادر بياناتك",
        icon: "growth",
        color: "bg-[#1C47FF]",
        topics: [
          "إنشاء حساب Sundae الخاص بك",
          "ربط نظام نقاط البيع",
          "دمج بيانات الرواتب والموارد البشرية",
          "ربط الميزانيات والتوقعات",
          "قائمة التحقق للإعداد الأولي",
        ],
      },
      {
        title: "استخدام Sundae Report",
        description: "احصل على أقصى استفادة من المقارنات المرجعية وتقارير الأداء المجانية",
        icon: "benchmarking",
        color: "bg-green-600",
        topics: [
          "رفع بياناتك للمقارنة المرجعية",
          "فهم تقرير المقارنة المرجعية",
          "مقارنة الأداء بين المواقع",
          "معايير الصناعة ومجموعات الأقران",
          "استخدام الرؤى لاتخاذ القرارات",
        ],
      },
      {
        title: "دليل Sundae Core",
        description: "أتقن ذكاء الأعمال الحواري باستخدام أسئلة باللغة الطبيعية",
        icon: "intelligence",
        color: "bg-purple-600",
        topics: [
          "طرح الأسئلة بلغة طبيعية",
          "استكشاف اللوحات والرسوم",
          "إنشاء عروض مخصصة",
          "حفظ الرؤى ومشاركتها",
          "تقنيات الاستعلام المتقدمة",
        ],
      },
      {
        title: "Pulse و Watchtower",
        description: "قم بإعداد التنبيهات الفورية وذكاء السوق الخارجي",
        icon: "insights",
        color: "bg-orange-600",
        topics: [
          "إعداد التنبيهات الاستباقية",
          "فهم اكتشاف الشذوذ",
          "ربط البيانات الخارجية مثل الطقس والأحداث",
          "ضبط تفضيلات الإشعارات",
          "التحرك وفق التوصيات الذكية",
        ],
      },
      {
        title: "الرؤى ولوحات المعلومات",
        description: "أنشئ لوحات معلومات قابلة للتخصيص لكل فريق",
        icon: "chart",
        color: "bg-indigo-600",
        topics: [
          "إنشاء لوحات معلومات مخصصة",
          "تهيئة الأدوات ومؤشرات الأداء",
          "إعداد عروض حسب الدور",
          "جدولة التقارير الآلية",
          "مشاركة اللوحات مع الفرق",
        ],
      },
      {
        title: "الأمان وخصوصية البيانات",
        description: "افهم كيف تحمي Sundae بياناتك",
        icon: "owners",
        color: "bg-teal-600",
        topics: [
          "تشفير البيانات ومعايير الأمان",
          "ضوابط الوصول والصلاحيات",
          "الامتثال و GDPR",
          "سياسات الاحتفاظ بالبيانات",
          "أفضل ممارسات الخصوصية",
        ],
      },
    ],
    quickStartSteps: [
      {
        step: "1",
        title: "اربط مصادر البيانات",
        description: "اربط أنظمة نقاط البيع والرواتب والمخزون والميزانيات مع Sundae Scout",
        icon: "integration",
      },
      {
        step: "2",
        title: "شغّل أول مقارنة مرجعية",
        description: "ارفع البيانات إلى Sundae Report واعرف كيف تقارن بمطاعم مشابهة",
        icon: "benchmarking",
      },
      {
        step: "3",
        title: "اطرح الأسئلة",
        description: "استخدم Sundae Core للاستعلام عن بياناتك بلغة طبيعية والحصول على إجابات فورية",
        icon: "intelligence",
      },
      {
        step: "4",
        title: "فعّل التنبيهات",
        description: "اضبط Sundae Core لمراقبة المقاييس الرئيسية وإخطارك عند وجود شذوذ",
        icon: "warning",
      },
    ],
  },
  fr: {
    badge: "Documentation",
    title: "Tout ce qu'il faut savoir",
    description: "Guides, references API et bonnes pratiques pour tirer le meilleur de Sundae.",
    primaryCta: "Reserver une demo",
    secondaryCta: "Essayer Sundae Report gratuitement",
    topicsLabel: "Sujets :",
    quickStartTitle: "Guide de demarrage rapide",
    quickStartDescription: "Mettez Sundae en route en quatre etapes simples",
    stepLabel: "Etape",
    comingSoonTitle: "Plus de documentation bientot",
    comingSoonDescription:
      "Nous enrichissons continuellement la documentation. Revenez bientot pour les references API, les tutoriels video et les guides avances.",
    contactPrompt: "Des questions d'ici la ?",
    contactLinkLabel: "Contacter notre equipe",
    supportTitle: "Besoin d'aide ?",
    supportDescription: "Notre equipe est la pour vous aider a tirer le meilleur parti de Sundae.",
    supportCta: "Contacter le support",
    trainingCta: "Planifier une formation",
    sections: [
      {
        title: "Premiers pas",
        description: "Apprenez a demarrer sur Sundae et a connecter vos sources de donnees",
        icon: "growth",
        color: "bg-[#1C47FF]",
        topics: [
          "Creer votre compte Sundae",
          "Connecter votre systeme POS",
          "Integrer les donnees paie et RH",
          "Relier budgets et previsions",
          "Checklist de configuration initiale",
        ],
      },
      {
        title: "Utiliser Sundae Report",
        description: "Profitez au maximum du benchmark gratuit et des rapports de performance",
        icon: "benchmarking",
        color: "bg-green-600",
        topics: [
          "Importer vos donnees pour le benchmark",
          "Comprendre votre rapport de benchmark",
          "Comparer la performance entre sites",
          "Standards du secteur et groupes de pairs",
          "Utiliser les insights pour agir",
        ],
      },
      {
        title: "Guide Sundae Core",
        description: "Maitrisez l'intelligence decisionnelle conversationnelle en langage naturel",
        icon: "intelligence",
        color: "bg-purple-600",
        topics: [
          "Poser des questions en langage simple",
          "Explorer tableaux de bord et graphiques",
          "Creer des vues personnalisees",
          "Enregistrer et partager des insights",
          "Techniques de requete avancees",
        ],
      },
      {
        title: "Pulse et Watchtower",
        description: "Configurez les alertes en temps reel et l'intelligence de marche externe",
        icon: "insights",
        color: "bg-orange-600",
        topics: [
          "Configurer des alertes proactives",
          "Comprendre la detection d'anomalies",
          "Connecter les donnees externes comme la meteo et les evenements",
          "Configurer les preferences de notification",
          "Agir sur les recommandations intelligentes",
        ],
      },
      {
        title: "Insights et tableaux de bord",
        description: "Construisez et adaptez des tableaux de bord pour chaque equipe",
        icon: "chart",
        color: "bg-indigo-600",
        topics: [
          "Creer des tableaux de bord personnalises",
          "Configurer widgets et KPI",
          "Mettre en place des vues par role",
          "Planifier des rapports automatiques",
          "Partager les tableaux de bord avec les equipes",
        ],
      },
      {
        title: "Securite et confidentialite des donnees",
        description: "Comprenez comment Sundae protege vos donnees",
        icon: "owners",
        color: "bg-teal-600",
        topics: [
          "Chiffrement des donnees et standards de securite",
          "Controle d'acces et permissions",
          "RGPD et conformite",
          "Politiques de retention des donnees",
          "Bonnes pratiques de confidentialite",
        ],
      },
    ],
    quickStartSteps: [
      {
        step: "1",
        title: "Connecter les sources de donnees",
        description: "Reliez vos systemes POS, paie, inventaire et budget a Sundae Scout",
        icon: "integration",
      },
      {
        step: "2",
        title: "Lancer votre premier benchmark",
        description: "Importez vos donnees dans Sundae Report et comparez-vous a des restaurants similaires",
        icon: "benchmarking",
      },
      {
        step: "3",
        title: "Poser des questions",
        description: "Utilisez Sundae Core pour interroger vos donnees en langage naturel et obtenir des reponses immediates",
        icon: "intelligence",
      },
      {
        step: "4",
        title: "Configurer les alertes",
        description: "Configurez Sundae Core pour surveiller les indicateurs clefs et vous alerter en cas d'anomalie",
        icon: "warning",
      },
    ],
  },
  es: {
    badge: "Documentacion",
    title: "Todo lo que necesitas saber",
    description: "Guias, referencias de API y buenas practicas para sacar el maximo partido de Sundae.",
    primaryCta: "Reservar una demo",
    secondaryCta: "Probar Sundae Report gratis",
    topicsLabel: "Temas:",
    quickStartTitle: "Guia de inicio rapido",
    quickStartDescription: "Pon en marcha Sundae en cuatro pasos simples",
    stepLabel: "Paso",
    comingSoonTitle: "Mas documentacion muy pronto",
    comingSoonDescription:
      "Seguimos ampliando la documentacion. Vuelve pronto para ver referencias de API, tutoriales en video y guias avanzadas.",
    contactPrompt: "Tienes preguntas mientras tanto?",
    contactLinkLabel: "Habla con nuestro equipo",
    supportTitle: "Necesitas ayuda?",
    supportDescription: "Nuestro equipo esta aqui para ayudarte a sacar el maximo partido de Sundae.",
    supportCta: "Contactar soporte",
    trainingCta: "Programar formacion",
    sections: [
      {
        title: "Primeros pasos",
        description: "Aprende a incorporarte a Sundae y conectar tus fuentes de datos",
        icon: "growth",
        color: "bg-[#1C47FF]",
        topics: [
          "Crear tu cuenta de Sundae",
          "Conectar tu sistema POS",
          "Integrar datos de nomina y RR. HH.",
          "Vincular presupuestos y previsiones",
          "Lista de verificacion de configuracion inicial",
        ],
      },
      {
        title: "Uso de Sundae Report",
        description: "Aprovecha al maximo el benchmarking gratuito y los informes de rendimiento",
        icon: "benchmarking",
        color: "bg-green-600",
        topics: [
          "Subir tus datos para benchmarking",
          "Entender tu informe comparativo",
          "Comparar el rendimiento entre ubicaciones",
          "Estandares del sector y grupos de pares",
          "Usar insights para impulsar decisiones",
        ],
      },
      {
        title: "Guia de Sundae Core",
        description: "Domina la inteligencia conversacional de negocio con preguntas en lenguaje natural",
        icon: "intelligence",
        color: "bg-purple-600",
        topics: [
          "Hacer preguntas en lenguaje claro",
          "Explorar paneles y graficos",
          "Crear vistas personalizadas",
          "Guardar y compartir insights",
          "Tecnicas avanzadas de consulta",
        ],
      },
      {
        title: "Pulse y Watchtower",
        description: "Configura alertas en tiempo real e inteligencia de mercado externa",
        icon: "insights",
        color: "bg-orange-600",
        topics: [
          "Configurar alertas proactivas",
          "Entender la deteccion de anomalias",
          "Conectar datos externos como clima y eventos",
          "Configurar preferencias de notificacion",
          "Actuar sobre recomendaciones inteligentes",
        ],
      },
      {
        title: "Insights y paneles",
        description: "Crea y personaliza paneles para cada equipo",
        icon: "chart",
        color: "bg-indigo-600",
        topics: [
          "Crear paneles personalizados",
          "Configurar widgets y KPI",
          "Crear vistas por rol",
          "Programar informes automaticos",
          "Compartir paneles con los equipos",
        ],
      },
      {
        title: "Seguridad y privacidad de datos",
        description: "Entiende como Sundae protege tus datos",
        icon: "owners",
        color: "bg-teal-600",
        topics: [
          "Cifrado de datos y estandares de seguridad",
          "Controles de acceso y permisos",
          "RGPD y cumplimiento",
          "Politicas de retencion de datos",
          "Buenas practicas de privacidad",
        ],
      },
    ],
    quickStartSteps: [
      {
        step: "1",
        title: "Conectar fuentes de datos",
        description: "Vincula tus sistemas POS, nomina, inventario y presupuesto a Sundae Scout",
        icon: "integration",
      },
      {
        step: "2",
        title: "Ejecutar tu primer benchmark",
        description: "Sube tus datos a Sundae Report y compara tu rendimiento con restaurantes similares",
        icon: "benchmarking",
      },
      {
        step: "3",
        title: "Hacer preguntas",
        description: "Usa Sundae Core para consultar tus datos en lenguaje natural y obtener respuestas inmediatas",
        icon: "intelligence",
      },
      {
        step: "4",
        title: "Configurar alertas",
        description: "Configura Sundae Core para vigilar metricas clave y avisarte sobre anomalias",
        icon: "warning",
      },
    ],
  },
};

export default function DocumentationPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedDocsCopy[locale] ?? localizedDocsCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.badge} title={copy.title} description={copy.description}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/demo">
            <Button variant="cta" size="lg">
              {copy.primaryCta}
            </Button>
          </Link>
          <Link href="/report">
            <Button variant="outline-light" size="lg">
              {copy.secondaryCta}
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copy.sections.map((section, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center text-[var(--text-primary)] group-hover:scale-110 transition-transform duration-300`}>
                        <SundaeIcon name={section.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-[var(--text-primary)] group-hover:text-[#60A5FA] transition-colors duration-300">
                          {section.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)] leading-relaxed mb-4">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">{copy.topicsLabel}</p>
                      <ul className="space-y-2">
                        {section.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-[var(--text-supporting)]">
                            <span className="text-[#60A5FA] mt-0.5">&rarr;</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                {copy.quickStartTitle}
              </h2>
              <p className="text-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
                {copy.quickStartDescription}
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {copy.quickStartSteps.map((item, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name={item.icon} size="xl" className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#60A5FA] mb-4">
                      {copy.stepLabel} {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
                    <p className="text-[var(--text-supporting)] leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <div className="bg-[var(--surface-faint)] rounded-2xl p-12 border border-[var(--border-default)]">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <SundaeIcon name="warning" size="xl" className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                {copy.comingSoonTitle}
              </h3>
              <p className="text-lg text-[var(--text-supporting)] mb-8">
                {copy.comingSoonDescription}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                {copy.contactPrompt}{" "}
                <Link href="/contact" className="text-[#60A5FA] font-medium hover:underline">
                  {copy.contactLinkLabel} &rarr;
                </Link>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <PageCTA title={copy.supportTitle} description={copy.supportDescription}>
        <Link href="/contact">
          <Button variant="cta" size="lg">
            {copy.supportCta}
          </Button>
        </Link>
        <Link href="/demo">
          <Button variant="outline-light" size="lg">
            {copy.trainingCta}
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
