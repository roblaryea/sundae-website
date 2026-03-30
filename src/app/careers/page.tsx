import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { resolveWebsiteLocale } from "@/lib/i18n";

const careersCopy = {
  en: {
    badge: "Join Our Team",
    title: "Build the Future of Decision Intelligence",
    description: "We're a small team working on a stubborn hospitality problem: fragmented data and slow decisions. Join us.",
    heroPrimary: "View Open Positions",
    heroSecondary: "Learn About Our Product",
    openTitle: "Current Openings",
    openDescription: "Help us build better operating intelligence for restaurant teams.",
    whyTitle: "Why Join Sundae?",
    whyDescription: "You will work on a real operating problem with a team that cares about building something useful.",
    valuesTitle: "Our Values",
    valuesDescription: "The principles that guide everything we do at Sundae.",
    ctaTitle: "Ready to Make an Impact?",
    ctaDescription: "Join us in building software that helps restaurant teams make faster, clearer decisions.",
    ctaPrimary: "Send Your Resume",
    ctaSecondary: "Learn About Our Product",
    positions: [
      { title: "Senior Software Engineer - Intelligence", department: "Engineering", location: "Dubai, UAE / Remote", type: "Full-time", description: "Build advanced intelligence models for restaurant decision-making. Work with large-scale data and machine learning algorithms.", icon: "intelligence", color: "bg-[#1C47FF]" },
      { title: "Product Manager - Restaurant Tech", department: "Product", location: "Toronto, Canada / Remote", type: "Full-time", description: "Define product strategy for our decision intelligence platform. Work closely with restaurant operators and engineering teams.", icon: "benchmarking", color: "bg-green-600" },
      { title: "Sales Executive - Enterprise", department: "Sales", location: "Multiple Locations", type: "Full-time", description: "Drive adoption of Sundae's decision intelligence platform among enterprise restaurant groups and hospitality companies.", icon: "owners", color: "bg-purple-600" },
      { title: "Customer Success Manager", department: "Customer Success", location: "Remote", type: "Full-time", description: "Help restaurant operators maximize value from Sundae's platform. Provide training, support, and strategic guidance.", icon: "success", color: "bg-orange-600" },
      { title: "Data Scientist - Restaurant Intelligence", department: "Data Science", location: "Dubai, UAE / Remote", type: "Full-time", description: "Develop predictive models and anomaly detection systems for restaurant operations data.", icon: "growth", color: "bg-teal-600" },
      { title: "UX/UI Designer - SaaS Products", department: "Design", location: "Toronto, Canada / Remote", type: "Full-time", description: "Design intuitive interfaces for our decision intelligence platform. Create beautiful, operator-friendly experiences.", icon: "canvas", color: "bg-indigo-600" },
    ],
    benefits: [
      { title: "Competitive Compensation", description: "Market-leading salaries plus equity in a fast-growing company.", icon: "finance" },
      { title: "Flexible Work", description: "Remote-first culture with flexible hours and locations.", icon: "multiLocation" },
      { title: "Health & Wellness", description: "Comprehensive health insurance and wellness stipends.", icon: "success" },
      { title: "Learning & Development", description: "Annual learning budget and access to the latest tools and technologies.", icon: "insights" },
      { title: "Global Team", description: "Work with talented people across Dubai, Toronto, and remote locations.", icon: "multiLocation" },
      { title: "Impact", description: "Work on tools restaurant teams can use in real operating decisions.", icon: "growth" },
    ],
    values: [
      { title: "Operator First", description: "We exist to help restaurant operators succeed with better decisions.", icon: "marketing" },
      { title: "Numbers-Backed", description: "We let data guide our decisions and help our customers do the same.", icon: "benchmarking" },
      { title: "Continuous Learning", description: "We constantly improve ourselves, our products, and our processes.", icon: "growth" },
      { title: "Global Perspective", description: "We think globally and build intelligence that works across markets.", icon: "multiLocation" },
    ],
  },
  ar: {
    badge: "انضم إلى فريقنا",
    title: "ابنِ مستقبل ذكاء القرار",
    description: "نحن فريق صغير وطموح نحل واحدة من أكبر مشاكل الضيافة - البيانات المجزأة. انضم إلينا.",
    heroPrimary: "عرض الوظائف المفتوحة",
    heroSecondary: "تعرف على منتجنا",
    openTitle: "الوظائف الحالية",
    openDescription: "ساعدنا في تحويل قطاع المطاعم عبر ذكاء القرار.",
    whyTitle: "لماذا تنضم إلى Sundae؟",
    whyDescription: "نحن نقدم أكثر من وظيفة - نقدم مهمة لتحويل صناعة.",
    valuesTitle: "قيمنا",
    valuesDescription: "المبادئ التي توجه كل ما نفعله في Sundae.",
    ctaTitle: "هل أنت مستعد لإحداث أثر؟",
    ctaDescription: "انضم إلينا في بناء مستقبل ذكاء القرار للمطاعم. ساعد المشغلين حول العالم على اتخاذ قرارات أذكى وأكثر ربحية.",
    ctaPrimary: "أرسل سيرتك الذاتية",
    ctaSecondary: "تعرف على منتجنا",
    positions: [
      { title: "مهندس برمجيات أول - الذكاء", department: "الهندسة", location: "دبي، الإمارات / عن بُعد", type: "دوام كامل", description: "ابنِ نماذج ذكاء متقدمة لقرارات المطاعم. اعمل مع بيانات ضخمة وخوارزميات تعلم آلي.", icon: "intelligence", color: "bg-[#1C47FF]" },
      { title: "مدير منتج - تقنية المطاعم", department: "المنتج", location: "تورونتو، كندا / عن بُعد", type: "دوام كامل", description: "حدّد استراتيجية المنتج لمنصة ذكاء القرار. اعمل عن قرب مع المشغلين وفريق الهندسة.", icon: "benchmarking", color: "bg-green-600" },
      { title: "تنفيذي مبيعات - المؤسسات", department: "المبيعات", location: "مواقع متعددة", type: "دوام كامل", description: "ادفع اعتماد منصة Sundae بين مجموعات المطاعم والشركات الفندقية المؤسسية.", icon: "owners", color: "bg-purple-600" },
      { title: "مدير نجاح العملاء", department: "نجاح العملاء", location: "عن بُعد", type: "دوام كامل", description: "ساعد المشغلين على تعظيم قيمة المنصة. قدّم التدريب والدعم والإرشاد الاستراتيجي.", icon: "success", color: "bg-orange-600" },
      { title: "عالم بيانات - ذكاء المطاعم", department: "علم البيانات", location: "دبي، الإمارات / عن بُعد", type: "دوام كامل", description: "طوّر نماذج تنبؤية وأنظمة اكتشاف الشذوذ لبيانات العمليات.", icon: "growth", color: "bg-teal-600" },
      { title: "مصمم UX/UI - منتجات SaaS", department: "التصميم", location: "تورونتو، كندا / عن بُعد", type: "دوام كامل", description: "صمم واجهات بديهية لمنصة ذكاء القرار. أنشئ تجارب جميلة وسهلة للمشغلين.", icon: "canvas", color: "bg-indigo-600" },
    ],
    benefits: [
      { title: "تعويضات تنافسية", description: "رواتب رائدة في السوق مع أسهم في شركة سريعة النمو.", icon: "finance" },
      { title: "عمل مرن", description: "ثقافة العمل عن بعد أولًا مع ساعات ومواقع مرنة.", icon: "multiLocation" },
      { title: "الصحة والعافية", description: "تأمين صحي شامل ومخصصات للعافية.", icon: "success" },
      { title: "التعلم والتطوير", description: "ميزانية تعليم سنوية والوصول لأحدث الأدوات والتقنيات.", icon: "insights" },
      { title: "فريق عالمي", description: "اعمل مع أشخاص موهوبين في دبي وتورونتو والعمل عن بعد.", icon: "multiLocation" },
      { title: "الأثر", description: "ساعد في تحويل صناعة المطاعم عبر ذكاء القرار.", icon: "growth" },
    ],
    values: [
      { title: "المشغل أولاً", description: "نحن موجودون لمساعدة مشغلي المطاعم على النجاح بقرارات أفضل.", icon: "marketing" },
      { title: "مدعوم بالأرقام", description: "نستخدم البيانات لتوجيه قراراتنا ومساعدة عملائنا على فعل الشيء نفسه.", icon: "benchmarking" },
      { title: "تعلم مستمر", description: "نحسن أنفسنا ومنتجاتنا وعملياتنا باستمرار.", icon: "growth" },
      { title: "منظور عالمي", description: "نفكر عالميًا ونبني ذكاءً يعمل عبر الأسواق.", icon: "multiLocation" },
    ],
  },
  fr: {
    badge: "Rejoignez l'équipe",
    title: "Construisez l'avenir de l'intelligence décisionnelle",
    description: "Nous sommes une petite équipe ambitieuse qui résout l'un des plus grands problèmes de l'hospitality - les données fragmentées. Rejoignez-nous.",
    heroPrimary: "Voir les postes ouverts",
    heroSecondary: "Découvrir le produit",
    openTitle: "Postes ouverts",
    openDescription: "Aidez-nous à construire de meilleurs outils de décision pour les équipes restaurant.",
    whyTitle: "Pourquoi rejoindre Sundae ?",
    whyDescription: "Vous rejoignez une équipe qui travaille au contact des vrais problèmes opérationnels et construit des outils utiles.",
    valuesTitle: "Nos valeurs",
    valuesDescription: "Les principes qui guident tout ce que nous faisons chez Sundae.",
    ctaTitle: "Prêt à avoir un impact ?",
    ctaDescription: "Rejoignez une équipe qui aide les groupes restaurant à travailler plus clairement, plus vite et avec moins d'angles morts.",
    ctaPrimary: "Envoyer votre CV",
    ctaSecondary: "Découvrir le produit",
    positions: [
      { title: "Ingénieur logiciel senior - Intelligence", department: "Ingénierie", location: "Dubaï, EAU / Remote", type: "Temps plein", description: "Construire des modèles d'intelligence avancés pour les décisions restaurant. Travailler avec de grandes données et du ML.", icon: "intelligence", color: "bg-[#1C47FF]" },
      { title: "Chef de produit - Tech restaurant", department: "Produit", location: "Toronto, Canada / Remote", type: "Temps plein", description: "Définir la stratégie produit de notre plateforme d'intelligence décisionnelle. Travailler avec opérateurs et ingénieurs.", icon: "benchmarking", color: "bg-green-600" },
      { title: "Commercial Enterprise", department: "Ventes", location: "Plusieurs lieux", type: "Temps plein", description: "Accélérer l'adoption de Sundae auprès des groupes restaurant enterprise et des groupes hospitality.", icon: "owners", color: "bg-purple-600" },
      { title: "Customer Success Manager", department: "Succès client", location: "Remote", type: "Temps plein", description: "Aider les opérateurs à maximiser la valeur de Sundae. Former, accompagner et guider stratégiquement.", icon: "success", color: "bg-orange-600" },
      { title: "Data Scientist - Intelligence restaurant", department: "Data Science", location: "Dubaï, EAU / Remote", type: "Temps plein", description: "Développer des modèles prédictifs et des systèmes de détection d'anomalies pour les données opérationnelles.", icon: "growth", color: "bg-teal-600" },
      { title: "Designer UX/UI - Produits SaaS", department: "Design", location: "Toronto, Canada / Remote", type: "Temps plein", description: "Concevoir des interfaces intuitives pour notre plateforme d'intelligence décisionnelle. Créer des expériences élégantes pour les opérateurs.", icon: "canvas", color: "bg-indigo-600" },
    ],
    benefits: [
      { title: "Rémunération compétitive", description: "Salaires leaders du marché avec equity dans une entreprise en forte croissance.", icon: "finance" },
      { title: "Travail flexible", description: "Culture remote-first avec horaires et lieux flexibles.", icon: "multiLocation" },
      { title: "Santé & bien-être", description: "Assurance santé complète et allocations bien-être.", icon: "success" },
      { title: "Apprentissage & développement", description: "Budget annuel de formation et accès aux derniers outils.", icon: "insights" },
      { title: "Équipe mondiale", description: "Travaillez avec des talents à Dubaï, Toronto et à distance.", icon: "multiLocation" },
      { title: "Impact", description: "Travaillez sur des produits qui aident les équipes restaurant à prendre de meilleures décisions au quotidien.", icon: "growth" },
    ],
    values: [
      { title: "Opérateur d'abord", description: "Nous existons pour aider les opérateurs à réussir avec de meilleures décisions.", icon: "marketing" },
      { title: "Appuyé par les chiffres", description: "Nous laissons les données guider nos décisions et aidons nos clients à faire de même.", icon: "benchmarking" },
      { title: "Apprentissage continu", description: "Nous améliorons sans cesse nos produits, nos processus et nous-mêmes.", icon: "growth" },
      { title: "Perspective globale", description: "Nous pensons globalement et construisons une intelligence qui fonctionne sur plusieurs marchés.", icon: "multiLocation" },
    ],
  },
  es: {
    badge: "Únete al equipo",
    title: "Construye el futuro de la inteligencia de decisiones",
    description: "Somos un equipo pequeño y ambicioso resolviendo uno de los mayores problemas de la hospitalidad - los datos fragmentados. Únete a nosotros.",
    heroPrimary: "Ver vacantes",
    heroSecondary: "Conocer el producto",
    openTitle: "Vacantes actuales",
    openDescription: "Ayúdanos a crear mejores herramientas de decisión para los equipos de restaurantes.",
    whyTitle: "¿Por qué unirte a Sundae?",
    whyDescription: "Te unes a un equipo que trabaja sobre problemas operativos reales y construye herramientas útiles.",
    valuesTitle: "Nuestros valores",
    valuesDescription: "Los principios que guían todo lo que hacemos en Sundae.",
    ctaTitle: "¿Listo para causar impacto?",
    ctaDescription: "Únete a un equipo que ayuda a los grupos de restaurantes a operar con más claridad, más rapidez y menos puntos ciegos.",
    ctaPrimary: "Enviar tu CV",
    ctaSecondary: "Conocer el producto",
    positions: [
      { title: "Ingeniero de software senior - Inteligencia", department: "Ingeniería", location: "Dubái, EAU / Remoto", type: "Tiempo completo", description: "Construye modelos avanzados de inteligencia para decisiones de restaurante. Trabaja con big data y machine learning.", icon: "intelligence", color: "bg-[#1C47FF]" },
      { title: "Product Manager - Tech de restaurantes", department: "Producto", location: "Toronto, Canadá / Remoto", type: "Tiempo completo", description: "Define la estrategia de producto de nuestra plataforma de inteligencia de decisiones. Trabaja con operadores e ingeniería.", icon: "benchmarking", color: "bg-green-600" },
      { title: "Ejecutivo de ventas - Enterprise", department: "Ventas", location: "Varios lugares", type: "Tiempo completo", description: "Impulsa la adopción de Sundae entre grupos de restaurantes enterprise y empresas de hospitalidad.", icon: "owners", color: "bg-purple-600" },
      { title: "Customer Success Manager", department: "Éxito del cliente", location: "Remoto", type: "Tiempo completo", description: "Ayuda a los operadores a sacar el máximo valor de la plataforma. Ofrece formación, soporte y guía estratégica.", icon: "success", color: "bg-orange-600" },
      { title: "Data Scientist - Inteligencia de restaurantes", department: "Ciencia de datos", location: "Dubái, EAU / Remoto", type: "Tiempo completo", description: "Desarrolla modelos predictivos y sistemas de detección de anomalías para datos operativos.", icon: "growth", color: "bg-teal-600" },
      { title: "UX/UI Designer - Productos SaaS", department: "Diseño", location: "Toronto, Canadá / Remoto", type: "Tiempo completo", description: "Diseña interfaces intuitivas para nuestra plataforma de inteligencia de decisiones. Crea experiencias bonitas para operadores.", icon: "canvas", color: "bg-indigo-600" },
    ],
    benefits: [
      { title: "Compensación competitiva", description: "Salarios líderes de mercado más equity en una empresa de rápido crecimiento.", icon: "finance" },
      { title: "Trabajo flexible", description: "Cultura remote-first con horarios y ubicaciones flexibles.", icon: "multiLocation" },
      { title: "Salud y bienestar", description: "Seguro médico completo y ayudas para bienestar.", icon: "success" },
      { title: "Aprendizaje y desarrollo", description: "Presupuesto anual de formación y acceso a las últimas herramientas.", icon: "insights" },
      { title: "Equipo global", description: "Trabaja con personas talentosas en Dubái, Toronto y remoto.", icon: "multiLocation" },
      { title: "Impacto", description: "Trabaja en productos que ayudan a los equipos de restaurantes a tomar mejores decisiones cada día.", icon: "growth" },
    ],
    values: [
      { title: "Operador primero", description: "Existimos para ayudar a los operadores a tener éxito con mejores decisiones.", icon: "marketing" },
      { title: "Basado en datos", description: "Dejamos que los datos guíen nuestras decisiones y ayudamos a nuestros clientes a hacer lo mismo.", icon: "benchmarking" },
      { title: "Aprendizaje continuo", description: "Mejoramos constantemente nuestros productos, procesos y habilidades.", icon: "growth" },
      { title: "Perspectiva global", description: "Pensamos globalmente y construimos inteligencia que funciona en distintos mercados.", icon: "multiLocation" },
    ],
  },
} as const;

export default async function CareersPage() {
  const locale = resolveWebsiteLocale(await cookies());
  const ui = careersCopy[locale] ?? careersCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.badge} title={ui.title} description={ui.description}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#open-positions">
            <Button variant="primary" size="lg">{ui.heroPrimary}</Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline-light" size="lg">{ui.heroSecondary}</Button>
          </Link>
        </div>
      </PageHero>

      <section id="open-positions" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.openTitle}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.openDescription}</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ui.positions.map((position, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-lg transition-all duration-300 group h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${position.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <SundaeIcon name={position.icon as SundaeIconName} size="lg" className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-[#60A5FA] font-medium uppercase tracking-wide">{position.department}</div>
                        <CardTitle className="text-[var(--text-primary)] group-hover:text-[#60A5FA] transition-colors duration-300">{position.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-[var(--text-supporting)]">
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)] leading-relaxed">{position.description}</CardDescription>
                    <Link href={`mailto:careers@sundae.io?subject=${encodeURIComponent(`Application for ${position.title}`)}`}>
                      <Button variant="outline" size="sm" className="w-full">Apply Now</Button>
                    </Link>
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
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.whyTitle}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.whyDescription}</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ui.benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={benefit.icon as SundaeIconName} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-[var(--text-primary)]">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent><CardDescription className="text-[var(--text-supporting)]">{benefit.description}</CardDescription></CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.valuesTitle}</h2>
              <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.valuesDescription}</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ui.values.map((value) => (
              <StaggerItem key={value.title}>
                <Card variant="elevated" className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={value.icon as SundaeIconName} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-[var(--text-primary)]">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent><CardDescription className="text-[var(--text-supporting)]">{value.description}</CardDescription></CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Link href="mailto:careers@sundae.io"><Button variant="primary" size="lg">{ui.ctaPrimary}</Button></Link>
        <Link href="/demo"><Button variant="outline-light" size="lg">{ui.ctaSecondary}</Button></Link>
      </PageCTA>
    </div>
  );
}
