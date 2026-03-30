'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';

type ForgeCopy = {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimary: string;
  heroSecondary: string;
  featuresTitle: string;
  featuresDescription: string;
  buildTitle: string;
  buildDescription: string;
  useCasesTitle: string;
  useCasesDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  featureItems: Array<{ title: string; description: string; icon: SundaeIconName }>;
  examples: Array<{ question: string; response: string; context: string }>;
  categories: Array<{ category: string; questions: string[] }>;
  askLabel: string;
  respondsLabel: string;
  sourceLabel: string;
  benefits: Array<{ benefit: string; icon: SundaeIconName }>;
  ctaPrimary: string;
  ctaSecondary: string;
};

const localizedForgeCopy: Record<'en' | 'ar' | 'fr' | 'es', ForgeCopy> = {
  en: {
    heroBadge: 'Forge — Custom Intelligence',
    heroTitle: 'Custom Models. Your Data. Your Rules.',
    heroDescription: 'Forge builds custom models trained on your data. Forecasts, recommendations, and automations built specifically for how your business operates.',
    heroPrimary: 'Try Forge Chat',
    heroSecondary: 'View Architecture',
    featuresTitle: 'Intelligence That Knows Your Business',
    featuresDescription: 'Custom models trained on your patterns, your locations, your operations',
    buildTitle: 'What Forge Can Build',
    buildDescription: 'Custom intelligence for your specific challenges',
    useCasesTitle: 'Custom Intelligence Use Cases',
    useCasesDescription: 'From demand forecasting to automated recommendations',
    ctaTitle: 'Ready for Custom Intelligence?',
    ctaDescription: "Tell us what you need. We'll build the model to make it happen.",
    featureItems: [
      { title: 'Natural Language Queries', description: 'Ask questions in plain English and get instant insights from your restaurant data.', icon: 'nexus' },
      { title: 'Contextual Understanding', description: 'Understands restaurant terminology and business context for accurate responses.', icon: 'intelligence' },
      { title: 'Multi-Source Integration', description: 'Pulls insights from all connected systems to provide comprehensive answers.', icon: 'integration' },
      { title: 'Actionable Recommendations', description: 'Get specific, numbers-backed recommendations to improve performance.', icon: 'marketing' },
    ],
    examples: [
      { question: 'Why did sales drop at Location #5 last Tuesday?', response: 'Sales dropped 18% due to: 1) 23% decrease in lunch traffic, 2) Kitchen equipment issue causing 15min delays, 3) Missing popular menu item. Recommend: review staffing, fix equipment, restock item.', context: 'Historical data + real-time metrics' },
      { question: 'How can I reduce labor costs without affecting service?', response: 'Based on your patterns: 1) Reduce 2 servers during 2-4pm weekdays (saves $340/week), 2) Cross-train 3 staff for multiple roles, 3) Optimize break schedules. Projected savings: $1,200/month.', context: 'Labor intelligence + performance data' },
      { question: 'Which menu items should I promote this weekend?', response: 'Promote: 1) Margherita Pizza (73% profit margin, trending +32%), 2) Seasonal Salad (low waste, high satisfaction), 3) Craft Cocktails (45% margin, weather-dependent). Expected revenue boost: $2,100.', context: 'Sales trends + inventory + weather' },
    ],
    categories: [
      { category: 'Operations', questions: ['Why is my labor cost higher this week?', 'Which shifts are most profitable?', "What's causing service delays?", 'How can I reduce waste?'] },
      { category: 'Financial', questions: ["What's my most profitable menu item?", 'Where am I losing money?', 'How can I increase average check?', "What's my break-even point?"] },
      { category: 'Strategic', questions: ['Should I open another location?', 'Which markets should I target?', "What's my competition doing?", 'When should I expand hours?'] },
    ],
    askLabel: 'Try asking:',
    respondsLabel: 'Forge responds with:',
    sourceLabel: 'Data sources:',
    benefits: [
      { benefit: 'No technical skills required', icon: 'success' },
      { benefit: 'Instant answers from all your data', icon: 'speed' },
      { benefit: 'Natural conversation interface', icon: 'nexus' },
      { benefit: 'Actionable recommendations', icon: 'marketing' },
    ],
    ctaPrimary: 'Book Forge Demo',
    ctaSecondary: 'View All Modules',
  },
  ar: {
    heroBadge: 'Forge — ذكاء مخصص',
    heroTitle: 'نماذج مخصصة. بياناتك. قواعدك.',
    heroDescription: 'يبني Forge نماذج مخصصة مدرَّبة على بياناتك. توقعات وتوصيات وأتمتة مصممة وفق طريقة عملك.',
    heroPrimary: 'جرّب Forge Chat',
    heroSecondary: 'عرض البنية',
    featuresTitle: 'ذكاء يعرف عملك',
    featuresDescription: 'نماذج مخصصة مدرَّبة على أنماطك ومواقعك وعملياتك',
    buildTitle: 'ما الذي يمكن أن يبنيه Forge',
    buildDescription: 'ذكاء مخصص لتحدياتك الخاصة',
    useCasesTitle: 'حالات استخدام للذكاء المخصص',
    useCasesDescription: 'من توقع الطلب إلى التوصيات المؤتمتة',
    ctaTitle: 'هل أنت مستعد لذكاء مخصص؟',
    ctaDescription: 'أخبرنا بما تحتاجه. وسنبني النموذج الذي يحقق ذلك.',
    featureItems: [
      { title: 'استعلامات باللغة الطبيعية', description: 'اطرح الأسئلة بالعربية البسيطة واحصل على رؤى فورية من بيانات مطعمك.', icon: 'nexus' },
      { title: 'فهم سياقي', description: 'يفهم مصطلحات المطاعم والسياق التشغيلي للحصول على إجابات دقيقة.', icon: 'intelligence' },
      { title: 'تكامل متعدد المصادر', description: 'يسحب الرؤى من كل الأنظمة المتصلة لتقديم إجابات شاملة.', icon: 'integration' },
      { title: 'توصيات عملية', description: 'احصل على توصيات محددة ومدعومة بالأرقام لتحسين الأداء.', icon: 'marketing' },
    ],
    examples: [
      { question: 'لماذا انخفضت المبيعات في الموقع رقم 5 الثلاثاء الماضي؟', response: 'انخفضت المبيعات 18% بسبب: 1) انخفاض حركة الغداء 23%، 2) مشكلة في معدات المطبخ سببت تأخير 15 دقيقة، 3) نفاد عنصر شعبي من القائمة. التوصية: راجع الجدولة، أصلح المعدات، وأعد التخزين.', context: 'البيانات التاريخية + المقاييس اللحظية' },
      { question: 'كيف أخفض تكلفة العمالة دون التأثير على الخدمة؟', response: 'بناءً على أنماطك: 1) خفّض خادمين في أيام الأسبوع بين 2-4 مساءً (يوفر $340 أسبوعياً)، 2) درّب 3 موظفين على أكثر من دور، 3) حسّن جداول الاستراحات. التوفير المتوقع: $1,200 شهرياً.', context: 'ذكاء العمالة + بيانات الأداء' },
      { question: 'أي عناصر القائمة يجب أن أروّج لها هذا الأسبوع؟', response: 'روّج لـ: 1) Margherita Pizza (هامش ربح 73%، اتجاه +32%)، 2) Seasonal Salad (هدر منخفض، رضا مرتفع)، 3) Craft Cocktails (هامش 45%، يعتمد على الطقس). الزيادة المتوقعة في الإيرادات: $2,100.', context: 'اتجاهات المبيعات + المخزون + الطقس' },
    ],
    categories: [
      { category: 'العمليات', questions: ['لماذا تكلفة العمالة أعلى هذا الأسبوع؟', 'أي الورديات أكثر ربحية؟', 'ما سبب تأخير الخدمة؟', 'كيف أخفض الهدر؟'] },
      { category: 'المالية', questions: ['ما هو أكثر عنصر قائمة ربحية؟', 'أين أخسر المال؟', 'كيف أزيد متوسط الفاتورة؟', 'ما نقطة التعادل؟'] },
      { category: 'الاستراتيجية', questions: ['هل أفتح موقعاً آخر؟', 'أي أسواق يجب أن أستهدف؟', 'ماذا يفعل المنافسون؟', 'متى أوسع ساعات العمل؟'] },
    ],
    askLabel: 'جرّب أن تسأل:',
    respondsLabel: 'يرد Forge بـ:',
    sourceLabel: 'مصادر البيانات:',
    benefits: [
      { benefit: 'لا حاجة لمهارات تقنية', icon: 'success' },
      { benefit: 'إجابات فورية من كل بياناتك', icon: 'speed' },
      { benefit: 'واجهة محادثة طبيعية', icon: 'nexus' },
      { benefit: 'توصيات قابلة للتنفيذ', icon: 'marketing' },
    ],
    ctaPrimary: 'احجز عرض Forge',
    ctaSecondary: 'عرض كل الوحدات',
  },
  fr: {
    heroBadge: 'Forge — intelligence sur mesure',
    heroTitle: 'Modeles personnalises. Vos donnees. Vos regles.',
    heroDescription: 'Forge cree des modeles sur mesure entraines sur vos donnees. Previsions, recommandations et automatisations adaptees a votre fonctionnement.',
    heroPrimary: 'Essayer Forge Chat',
    heroSecondary: 'Voir l architecture',
    featuresTitle: 'Une intelligence qui connait votre business',
    featuresDescription: 'Modeles sur mesure entraines sur vos usages, vos sites et vos operations',
    buildTitle: 'Ce que Forge peut construire',
    buildDescription: 'Une intelligence sur mesure pour vos defis specifiques',
    useCasesTitle: "Cas d usage de l intelligence sur mesure",
    useCasesDescription: 'De la prevision de la demande aux recommandations automatisees',
    ctaTitle: 'Pret pour une intelligence sur mesure ?',
    ctaDescription: 'Dites-nous ce qu il vous faut. Nous construirons le modele pour le realiser.',
    featureItems: [
      { title: 'Requetes en langage naturel', description: 'Posez vos questions en francais simple et obtenez des insights instantanés a partir de vos donnees.', icon: 'nexus' },
      { title: 'Compréhension contextuelle', description: 'Comprend le vocabulaire restaurant et le contexte business pour des reponses exactes.', icon: 'intelligence' },
      { title: 'Integration multi-sources', description: 'Recupere les insights de tous les systemes connectes pour des reponses completes.', icon: 'integration' },
      { title: 'Recommandations actionnables', description: 'Obtenez des recommandations precis et chiffrees pour ameliorer la performance.', icon: 'marketing' },
    ],
    examples: [
      { question: 'Pourquoi les ventes ont-elles baisse au site #5 mardi dernier ?', response: 'Les ventes ont baisse de 18 % a cause de : 1) -23 % de trafic au dejeuner, 2) un probleme d equipement cuisine ayant cause 15 min de retard, 3) la rupture d un article populaire. Recommandation : revoir le staffing, reparer l equipement, reapprovisionner l article.', context: 'Donnees historiques + metriques temps reel' },
      { question: 'Comment reduire le cout main-d oeuvre sans impacter le service ?', response: 'Selon vos tendances : 1) reduire 2 serveurs entre 14h et 16h en semaine (economie 340 $/semaine), 2) former 3 employes a plusieurs roles, 3) optimiser les pauses. Economie projetee : 1 200 $/mois.', context: 'Intelligence main-d oeuvre + donnees de performance' },
      { question: 'Quels plats promouvoir ce week-end ?', response: 'Promouvoir : 1) Margherita Pizza (marge 73 %, tendance +32 %), 2) Seasonal Salad (peu de gaspillage, forte satisfaction), 3) Craft Cocktails (marge 45 %, depend de la meteo). Hausse de revenu attendue : 2 100 $.', context: 'Tendances ventes + stock + meteo' },
    ],
    categories: [
      { category: 'Operations', questions: ['Pourquoi mon cout main-d oeuvre est-il plus eleve cette semaine ?', 'Quels services sont les plus rentables ?', 'Qu est-ce qui cause les retards de service ?', 'Comment reduire le gaspillage ?'] },
      { category: 'Financier', questions: ['Quel est mon plat le plus rentable ?', 'Ou est-ce que je perds de l argent ?', 'Comment augmenter le ticket moyen ?', 'Quel est mon point mort ?'] },
      { category: 'Strategique', questions: ['Dois-je ouvrir un autre site ?', 'Quels marches cibler ?', 'Que font mes concurrents ?', 'Quand dois-je etendre les horaires ?'] },
    ],
    askLabel: 'Essayez de demander :',
    respondsLabel: 'Forge repond :',
    sourceLabel: 'Sources de donnees :',
    benefits: [
      { benefit: 'Aucune competence technique requise', icon: 'success' },
      { benefit: 'Reponses instantanees depuis toutes vos donnees', icon: 'speed' },
      { benefit: 'Interface de conversation naturelle', icon: 'nexus' },
      { benefit: 'Recommandations actionnables', icon: 'marketing' },
    ],
    ctaPrimary: 'Reserver une demo Forge',
    ctaSecondary: 'Voir tous les modules',
  },
  es: {
    heroBadge: 'Forge — inteligencia a medida',
    heroTitle: 'Modelos personalizados. Tus datos. Tus reglas.',
    heroDescription: 'Forge crea modelos personalizados entrenados con tus datos. Previsiones, recomendaciones y automatizaciones hechas para tu operacion.',
    heroPrimary: 'Probar Forge Chat',
    heroSecondary: 'Ver arquitectura',
    featuresTitle: 'Una inteligencia que conoce tu negocio',
    featuresDescription: 'Modelos a medida entrenados con tus patrones, tus locales y tus operaciones',
    buildTitle: 'Que puede construir Forge',
    buildDescription: 'Inteligencia personalizada para tus retos concretos',
    useCasesTitle: 'Casos de uso de inteligencia a medida',
    useCasesDescription: 'Desde previsiones de demanda hasta recomendaciones automaticas',
    ctaTitle: 'Listo para inteligencia a medida?',
    ctaDescription: 'Dinos lo que necesitas. Construiremos el modelo para hacerlo realidad.',
    featureItems: [
      { title: 'Consultas en lenguaje natural', description: 'Haz preguntas en ingles sencillo y obtén insights inmediatos de tus datos.', icon: 'nexus' },
      { title: 'Comprension contextual', description: 'Entiende terminologia de restaurantes y contexto de negocio para respuestas precisas.', icon: 'intelligence' },
      { title: 'Integracion multifuente', description: 'Toma insights de todos los sistemas conectados para dar respuestas completas.', icon: 'integration' },
      { title: 'Recomendaciones accionables', description: 'Recibe recomendaciones concretas y respaldadas por numeros para mejorar el rendimiento.', icon: 'marketing' },
    ],
    examples: [
      { question: '¿Por que bajaron las ventas en el Local #5 el martes pasado?', response: 'Las ventas bajaron 18% por: 1) una caida del 23% en el trafico de almuerzo, 2) un problema en la cocina que genero 15 min de retraso, 3) la falta de un plato popular. Recomendacion: revisar staffing, arreglar el equipo y reponer el articulo.', context: 'Datos historicos + metricas en tiempo real' },
      { question: '¿Como reduzco costes laborales sin afectar el servicio?', response: 'Segun tus patrones: 1) reduce 2 camareros entre 2 y 4pm entre semana (ahorra $340/semana), 2) cruza formación a 3 empleados para varios roles, 3) optimiza los descansos. Ahorro proyectado: $1,200/mes.', context: 'Inteligencia laboral + datos de rendimiento' },
      { question: '¿Que platos deberia promocionar este fin de semana?', response: 'Promociona: 1) Margherita Pizza (73% de margen, tendencia +32%), 2) Seasonal Salad (bajo desperdicio, alta satisfaccion), 3) Craft Cocktails (45% de margen, depende del clima). Aumento esperado de ingresos: $2,100.', context: 'Tendencias de ventas + inventario + clima' },
    ],
    categories: [
      { category: 'Operaciones', questions: ['¿Por que mi coste laboral es mas alto esta semana?', '¿Que turnos son mas rentables?', '¿Que causa los retrasos de servicio?', '¿Como puedo reducir el desperdicio?'] },
      { category: 'Finanzas', questions: ['¿Cual es mi articulo mas rentable?', '¿Donde pierdo dinero?', '¿Como aumento el ticket medio?', '¿Cual es mi punto de equilibrio?'] },
      { category: 'Estrategia', questions: ['¿Deberia abrir otro local?', '¿Que mercados deberia atacar?', '¿Que hace la competencia?', '¿Cuando deberia ampliar horarios?'] },
    ],
    askLabel: 'Prueba a preguntar:',
    respondsLabel: 'Forge responde con:',
    sourceLabel: 'Fuentes de datos:',
    benefits: [
      { benefit: 'No se requieren habilidades tecnicas', icon: 'success' },
      { benefit: 'Respuestas instantaneas desde todos tus datos', icon: 'speed' },
      { benefit: 'Interfaz de conversacion natural', icon: 'nexus' },
      { benefit: 'Recomendaciones accionables', icon: 'marketing' },
    ],
    ctaPrimary: 'Reservar demo de Forge',
    ctaSecondary: 'Ver todos los modulos',
  },
};

export default function ForgePage() {
  const { locale } = useWebsiteI18n();
  const ui = localizedForgeCopy[locale] ?? localizedForgeCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.heroBadge} title={ui.heroTitle} description={ui.heroDescription}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">{ui.heroPrimary}</Button>
          </Link>
          <Link href="/architecture">
            <Button variant="outline-light" size="lg">{ui.heroSecondary}</Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.featuresTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)]">{ui.featuresDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ui.featureItems.map((feature, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <SundaeIcon name={feature.icon} size="lg" className="text-white" />
                      </div>
                      <CardTitle className="text-[var(--text-primary)]">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)]">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.buildTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)]">{ui.buildDescription}</p>
          </FadeUp>
          <div className="space-y-8">
            {ui.examples.map((example, index) => (
              <FadeUp key={index} delay={index * 0.1}>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#1C47FF] rounded-full flex items-center justify-center text-white text-sm font-bold">?</div>
                        <div className="flex-1 bg-[rgba(28,71,255,0.1)] rounded-lg p-4">
                          <p className="text-[var(--text-primary)] font-medium">{example.question}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">S</div>
                        <div className="flex-1 bg-[var(--surface-subtle)] rounded-lg p-4">
                          <p className="text-[var(--text-primary)]">{example.response}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[var(--surface-faint)] rounded-lg p-3">
                      <p className="text-xs text-[var(--text-supporting)]"><span className="font-medium">{ui.sourceLabel}</span> {example.context}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.useCasesTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)]">{ui.useCasesDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ui.categories.map((category, index) => (
              <StaggerItem key={index}>
                <Card variant="default">
                  <CardHeader>
                    <CardTitle className="text-[var(--text-primary)]">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.questions.map((question, questionIndex) => (
                        <li key={questionIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                          <span className="text-[var(--text-supporting)] text-sm">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.ctaTitle}</h2>
              <p className="body-xl text-[var(--text-supporting)] mb-8">{ui.ctaDescription}</p>
              <div className="space-y-4">
                {ui.benefits.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <SundaeIcon name={item.icon} size="sm" className="text-green-400" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{item.benefit}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="bg-[var(--navy-deep)] rounded-2xl p-8 border border-[var(--border-default)]">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <SundaeIcon name="forge" size="xl" className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">{locale === 'en' ? 'Forge Chat Interface' : locale === 'ar' ? 'واجهة Forge Chat' : locale === 'fr' ? 'Interface Forge Chat' : 'Interfaz de Forge Chat'}</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-[var(--surface-faint)] rounded-lg p-4">
                    <p className="text-sm text-[var(--text-supporting)] mb-2">{ui.askLabel}</p>
                    <div className="space-y-2">
                      {ui.examples.map((example) => (
                        <div key={example.question} className="bg-[rgba(28,71,255,0.1)] rounded p-2 text-sm text-[var(--text-secondary)]">&quot;{example.question}&quot;</div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[var(--surface-subtle)] rounded-lg p-4">
                    <p className="text-sm text-[var(--text-supporting)] mb-2">{ui.respondsLabel}</p>
                    <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                      <div>• {locale === 'en' ? 'Numbers-backed insights' : locale === 'ar' ? 'رؤى مدعومة بالأرقام' : locale === 'fr' ? 'Insights appuyes par des chiffres' : 'Insights respaldados por numeros'}</div>
                      <div>• {locale === 'en' ? 'Specific recommendations' : locale === 'ar' ? 'توصيات محددة' : locale === 'fr' ? 'Recommandations specifiques' : 'Recomendaciones especificas'}</div>
                      <div>• {locale === 'en' ? 'Actionable next steps' : locale === 'ar' ? 'خطوات تالية قابلة للتنفيذ' : locale === 'fr' ? 'Prochaines etapes actionnables' : 'Siguientes pasos accionables'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Link href="/demo">
          <Button variant="primary" size="lg">{ui.ctaPrimary}</Button>
        </Link>
        <Link href="/product">
          <Button variant="outline-light" size="lg">{ui.ctaSecondary}</Button>
        </Link>
      </PageCTA>
    </div>
  );
}
