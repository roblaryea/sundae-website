"use client";

import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

type RoleSolutionCopy = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  problemsTitle: string;
  problemsDescription: string;
  challenges: { title: string; description: string; icon: SundaeIconName }[];
  howTitle: string;
  howDescription: string;
  howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[];
  outcomesTitle: string;
  outcomesDescription: string;
  outcomes: { title: string; description: string; icon: SundaeIconName }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
};

const localizedMarketingCopy: Record<"en" | "ar" | "fr" | "es", RoleSolutionCopy> = {
  en: {
    badge: "Marketing Teams",
    titleLine1: "See What's Working.",
    titleLine2: "Cut What Isn't.",
    description: "Connect campaigns to revenue. Get location-level attribution. Prove ROI with real data.",
    primaryCta: "See Marketing Dashboard",
    secondaryCta: "View Campaign Intelligence",
    problemsTitle: "The Problems You Know",
    problemsDescription: "Attribution blind spots. Siloed data. Slow feedback loops.",
    challenges: [
      {
        title: "Attribution Blind Spots",
        description: "Struggling to connect marketing spend to actual restaurant performance and revenue impact.",
        icon: "marketing",
      },
      {
        title: "Fragmented Campaign Data",
        description: "Marketing data lives in one system, sales data in another - making it impossible to see the full picture.",
        icon: "benchmarking",
      },
      {
        title: "Generic Insights",
        description: "National-level metrics don't reveal which locations respond best to campaigns or why.",
        icon: "multiLocation",
      },
      {
        title: "Slow Response Times",
        description: "By the time you get performance data, the campaign window has already closed.",
        icon: "time",
      },
    ],
    howTitle: "How Sundae Changes That",
    howDescription: "Real-time attribution and location-level performance.",
    howSundaeHelps: [
      {
        title: "Real-Time Campaign Attribution",
        description: "Sundae Core connects marketing spend to sales lift at every location - see which campaigns are driving revenue in real time.",
        product: "Sundae Core",
        icon: "performance",
      },
      {
        title: "Location-Level Insights",
        description: "Sundae Core shows which locations are responding to campaigns and which need different messaging or channels.",
        product: "Sundae Core",
        icon: "insights",
      },
      {
        title: "Ask Marketing Questions",
        description: "Ask Sundae which locations had the best ROI from your last promo or what the average check lift is from loyalty members and get instant answers.",
        product: "Sundae Core",
        icon: "intelligence",
      },
      {
        title: "Benchmark Performance",
        description: "Sundae Report shows how your marketing-driven metrics compare to industry standards and top performers.",
        product: "Sundae Report",
        icon: "report",
      },
    ],
    outcomesTitle: "What Changes",
    outcomesDescription: "Smarter spend. Faster optimization. Provable ROI.",
    outcomes: [
      { title: "Optimize campaign spend", description: "Identify high-performing locations and channels to allocate budget more effectively.", icon: "finance" },
      { title: "Prove marketing ROI", description: "Connect campaigns directly to revenue impact with location-level attribution.", icon: "performance" },
      { title: "React faster to campaigns", description: "Real-time data lets you adjust campaigns mid-flight based on performance.", icon: "speed" },
      { title: "Personalize by location", description: "Understand which locations respond to different messages and offers.", icon: "chart" },
    ],
    ctaTitle: "Ready to Prove ROI?",
    ctaDescription: "See how marketing teams connect campaigns to revenue.",
    ctaButton: "Book a Marketing Team Demo",
  },
  ar: {
    badge: "فرق التسويق",
    titleLine1: "اعرف ما يعمل.",
    titleLine2: "وتوقف عمّا لا يعمل.",
    description: "اربط الحملات بالإيرادات. احصل على إسناد على مستوى الموقع. أثبت العائد بأرقام حقيقية.",
    primaryCta: "عرض لوحة التسويق",
    secondaryCta: "عرض ذكاء الحملات",
    problemsTitle: "المشكلات التي تعرفها",
    problemsDescription: "فجوات الإسناد. بيانات معزولة. حلقات تغذية راجعة بطيئة.",
    challenges: [
      { title: "فجوات الإسناد", description: "صعوبة ربط إنفاق التسويق بالأداء الفعلي للمطعم وتأثيره على الإيرادات.", icon: "marketing" },
      { title: "تشتت بيانات الحملات", description: "توجد بيانات التسويق في نظام وبيانات المبيعات في نظام آخر، لذلك من المستحيل رؤية الصورة الكاملة.", icon: "benchmarking" },
      { title: "رؤى عامة", description: "المقاييس على مستوى الدولة لا تكشف أي المواقع تستجيب أفضل للحملات أو لماذا.", icon: "multiLocation" },
      { title: "بطء الاستجابة", description: "عندما تصل بيانات الأداء، تكون نافذة الحملة قد أُغلقت بالفعل.", icon: "time" },
    ],
    howTitle: "كيف يغير Sundae ذلك",
    howDescription: "إسناد لحظي وأداء على مستوى الموقع.",
    howSundaeHelps: [
      { title: "إسناد الحملات في الوقت الحقيقي", description: "يربط Sundae Core إنفاق التسويق بارتفاع المبيعات في كل موقع، لتعرف أي الحملات تقود الإيرادات لحظيًا.", product: "Sundae Core", icon: "performance" },
      { title: "رؤى على مستوى الموقع", description: "يُظهر Sundae Core أي المواقع تستجيب للحملات وأيها تحتاج رسائل أو قنوات مختلفة.", product: "Sundae Core", icon: "insights" },
      { title: "اسأل أسئلة التسويق", description: "اسأل Sundae عن المواقع ذات أفضل عائد من آخر حملة أو عن متوسط الزيادة في الفاتورة من أعضاء الولاء واحصل على إجابات فورية.", product: "Sundae Core", icon: "intelligence" },
      { title: "قارن الأداء بالمعايير", description: "يُظهر Sundae Report كيف تقارن المقاييس المرتبطة بالتسويق بالمعايير الصناعية وأفضل المؤدين.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "ما الذي يتغير",
    outcomesDescription: "إنفاق أذكى. تحسين أسرع. عائد مثبت.",
    outcomes: [
      { title: "تحسين إنفاق الحملات", description: "حدد المواقع والقنوات الأعلى أداءً لتوزيع الميزانية بفعالية أكبر.", icon: "finance" },
      { title: "إثبات عائد التسويق", description: "اربط الحملات مباشرة بتأثيرها على الإيرادات عبر إسناد على مستوى الموقع.", icon: "performance" },
      { title: "التحرك أسرع أثناء الحملة", description: "تسمح لك البيانات اللحظية بتعديل الحملات أثناء التنفيذ.", icon: "speed" },
      { title: "التخصيص حسب الموقع", description: "افهم أي المواقع تستجيب لرسائل وعروض مختلفة.", icon: "chart" },
    ],
    ctaTitle: "هل أنت مستعد لإثبات العائد؟",
    ctaDescription: "شاهد كيف تربط فرق التسويق الحملات بالإيرادات.",
    ctaButton: "احجز عرضًا لفريق التسويق",
  },
  fr: {
    badge: "Équipes marketing",
    titleLine1: "Voyez ce qui fonctionne.",
    titleLine2: "Coupez ce qui ne fonctionne pas.",
    description: "Reliez les campagnes au revenu. Obtenez une attribution par site. Prouvez le ROI avec des données réelles.",
    primaryCta: "Voir le tableau de bord marketing",
    secondaryCta: "Voir l'intelligence de campagne",
    problemsTitle: "Les problèmes que vous connaissez",
    problemsDescription: "Angles morts d'attribution. Données en silos. Boucles de retour lentes.",
    challenges: [
      { title: "Angles morts d'attribution", description: "Difficile de relier les dépenses marketing à la performance réelle du restaurant et à l'impact sur le revenu.", icon: "marketing" },
      { title: "Données de campagne fragmentées", description: "Les données marketing vivent dans un système et les ventes dans un autre, ce qui empêche de voir l'ensemble.", icon: "benchmarking" },
      { title: "Informations génériques", description: "Les métriques nationales ne montrent pas quels sites répondent le mieux aux campagnes, ni pourquoi.", icon: "multiLocation" },
      { title: "Temps de réaction trop lents", description: "Au moment où les données arrivent, la fenêtre de campagne est déjà fermée.", icon: "time" },
    ],
    howTitle: "Comment Sundae change cela",
    howDescription: "Attribution en temps réel et performance par site.",
    howSundaeHelps: [
      { title: "Attribution des campagnes en temps réel", description: "Sundae Core relie les dépenses marketing à la hausse des ventes sur chaque site - voyez quelles campagnes génèrent du revenu en temps réel.", product: "Sundae Core", icon: "performance" },
      { title: "Informations par site", description: "Sundae Core montre quels sites répondent aux campagnes et lesquels ont besoin d'un autre message ou d'un autre canal.", product: "Sundae Core", icon: "insights" },
      { title: "Posez vos questions marketing", description: "Demandez à Sundae quels sites ont le meilleur ROI sur votre dernière promo ou quelle est la hausse moyenne du ticket des membres fidélité, et obtenez une réponse immédiate.", product: "Sundae Core", icon: "intelligence" },
      { title: "Comparez aux références", description: "Sundae Report montre comment vos métriques marketing se comparent aux standards du secteur et aux meilleurs acteurs.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Ce qui change",
    outcomesDescription: "Des dépenses plus intelligentes. Une optimisation plus rapide. Un ROI démontré.",
    outcomes: [
      { title: "Optimiser les dépenses de campagne", description: "Identifiez les sites et canaux les plus performants pour mieux allouer le budget.", icon: "finance" },
      { title: "Prouver le ROI marketing", description: "Reliez directement les campagnes à leur impact sur le revenu avec une attribution par site.", icon: "performance" },
      { title: "Réagir plus vite aux campagnes", description: "Les données en temps réel vous permettent d'ajuster les campagnes en cours de route.", icon: "speed" },
      { title: "Personnaliser par site", description: "Comprenez quels sites répondent à quels messages et offres.", icon: "chart" },
    ],
    ctaTitle: "Prêt à prouver le ROI ?",
    ctaDescription: "Découvrez comment les équipes marketing relient les campagnes au revenu.",
    ctaButton: "Réserver une démo marketing",
  },
  es: {
    badge: "Equipos de marketing",
    titleLine1: "Ve lo que funciona.",
    titleLine2: "Corta lo que no.",
    description: "Conecta las campañas con los ingresos. Obtén atribución por ubicación. Demuestra el ROI con datos reales.",
    primaryCta: "Ver panel de marketing",
    secondaryCta: "Ver inteligencia de campañas",
    problemsTitle: "Los problemas que ya conoces",
    problemsDescription: "Puntos ciegos de atribución. Datos en silos. Bucles de respuesta lentos.",
    challenges: [
      { title: "Puntos ciegos de atribución", description: "Cuesta conectar el gasto de marketing con el rendimiento real del restaurante y su impacto en ingresos.", icon: "marketing" },
      { title: "Datos de campaña fragmentados", description: "Los datos de marketing viven en un sistema y los de ventas en otro, así que es imposible ver el panorama completo.", icon: "benchmarking" },
      { title: "Información genérica", description: "Las métricas nacionales no muestran qué ubicaciones responden mejor a las campañas ni por qué.", icon: "multiLocation" },
      { title: "Respuesta lenta", description: "Cuando llegan los datos de rendimiento, la ventana de la campaña ya se cerró.", icon: "time" },
    ],
    howTitle: "Cómo cambia esto Sundae",
    howDescription: "Atribución en tiempo real y rendimiento por ubicación.",
    howSundaeHelps: [
      { title: "Atribución de campañas en tiempo real", description: "Sundae Core conecta el gasto de marketing con el aumento de ventas en cada ubicación, para ver qué campañas impulsan ingresos al instante.", product: "Sundae Core", icon: "performance" },
      { title: "Información por ubicación", description: "Sundae Core muestra qué ubicaciones responden a las campañas y cuáles necesitan otro mensaje o canal.", product: "Sundae Core", icon: "insights" },
      { title: "Haz preguntas de marketing", description: "Pregunta a Sundae qué ubicaciones lograron el mejor ROI de tu última promo o cuál es el aumento medio del ticket entre miembros de fidelidad y obtén respuestas al momento.", product: "Sundae Core", icon: "intelligence" },
      { title: "Compara el rendimiento", description: "Sundae Report muestra cómo se comparan tus métricas de marketing con los estándares del sector y los mejores competidores.", product: "Sundae Report", icon: "report" },
    ],
    outcomesTitle: "Qué cambia",
    outcomesDescription: "Gasto más inteligente. Optimización más rápida. ROI demostrable.",
    outcomes: [
      { title: "Optimiza el gasto en campañas", description: "Identifica las ubicaciones y canales con mejor rendimiento para asignar presupuesto mejor.", icon: "finance" },
      { title: "Demuestra el ROI de marketing", description: "Conecta las campañas directamente con el impacto en ingresos gracias a la atribución por ubicación.", icon: "performance" },
      { title: "Reacciona más rápido a las campañas", description: "Los datos en tiempo real te permiten ajustar campañas sobre la marcha.", icon: "speed" },
      { title: "Personaliza por ubicación", description: "Entiende qué ubicaciones responden a distintos mensajes y ofertas.", icon: "chart" },
    ],
    ctaTitle: "¿Listo para demostrar el ROI?",
    ctaDescription: "Ve cómo los equipos de marketing conectan campañas con ingresos.",
    ctaButton: "Reservar demo para marketing",
  },
};

export default function MarketingTeamsPage() {
  const { locale } = useWebsiteI18n();
  const copy = localizedMarketingCopy[locale] ?? localizedMarketingCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge={copy.badge}
        title={<>
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </>}
        description={copy.description}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              {copy.primaryCta}
            </Button>
          </Link>
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">
              {copy.secondaryCta}
            </Button>
          </a>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.problemsTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.problemsDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.challenges.map((challenge, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={challenge.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{challenge.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{challenge.description}</CardDescription>
                      </div>
                    </div>
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
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.howTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.howDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.howSundaeHelps.map((item, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={item.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-[#60A5FA] font-semibold mb-1">{item.product}</div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.outcomesTitle}</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.outcomesDescription}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.outcomes.map((outcome, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={outcome.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{outcome.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{outcome.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <Link href="/demo">
          <Button variant="primary" size="lg">
            {copy.ctaButton}
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
