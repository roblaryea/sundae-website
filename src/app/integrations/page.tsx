import { SundaeIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

const integrationCategoriesByLocale = {
  en: [
    { category: "Point of Sale (POS)", icon: "restaurant" as const, status: "Live" as const, systems: ["Oracle MICROS Simphony", "Square", "Toast", "Clover", "PostgreSQL (Direct DB)", "SQL Server / Azure SQL (Direct DB)"] },
    { category: "Labor & Scheduling", icon: "labor" as const, status: "Upcoming" as const, systems: ["7shifts", "HotSchedules (Fourth)", "Deputy"] },
    { category: "Inventory & Availability", icon: "inventory" as const, status: "Upcoming" as const, systems: ["MarketMan", "Craftable", "BinWise"] },
    { category: "Purchasing & Procurement", icon: "purchasing" as const, status: "Upcoming" as const, systems: ["MarketMan"] },
    { category: "Delivery & 3PD", icon: "speed" as const, status: "Upcoming" as const, systems: ["Deliverect", "Uber Eats", "DoorDash", "Talabat"] },
    { category: "Reservations & Guest Flow", icon: "reservations" as const, status: "Upcoming" as const, systems: ["SevenRooms", "OpenTable", "Resy", "Tock"] },
    { category: "Marketing & Campaigns", icon: "marketing" as const, status: "Upcoming" as const, systems: ["Meta (Facebook / Instagram)", "Google Ads", "Mailchimp"] },
    { category: "Guest Experience & Feedback", icon: "conversation" as const, status: "Upcoming" as const, systems: ["Google Reviews", "Yelp", "Zendesk"] },
    { category: "Guest CRM", icon: "operators" as const, status: "Upcoming" as const, systems: ["SevenRooms", "Toast", "Olo"] },
    { category: "Accounting & Finance", icon: "finance" as const, status: "Upcoming" as const, systems: ["QuickBooks", "Xero", "Sage", "FreshBooks"] },
  ],
  ar: [
    { category: "نقاط البيع (POS)", icon: "restaurant" as const, status: "Live" as const, systems: ["Oracle MICROS Simphony", "Square", "Toast", "Clover", "PostgreSQL (DB مباشرة)", "SQL Server / Azure SQL (DB مباشرة)"] },
    { category: "العمالة والجدولة", icon: "labor" as const, status: "Upcoming" as const, systems: ["7shifts", "HotSchedules (Fourth)", "Deputy"] },
    { category: "المخزون والتوفر", icon: "inventory" as const, status: "Upcoming" as const, systems: ["MarketMan", "Craftable", "BinWise"] },
    { category: "المشتريات والشراء", icon: "purchasing" as const, status: "Upcoming" as const, systems: ["MarketMan"] },
    { category: "التوصيل والمنصات", icon: "speed" as const, status: "Upcoming" as const, systems: ["Deliverect", "Uber Eats", "DoorDash", "Talabat"] },
    { category: "الحجوزات ومسار الضيوف", icon: "reservations" as const, status: "Upcoming" as const, systems: ["SevenRooms", "OpenTable", "Resy", "Tock"] },
    { category: "التسويق والحملات", icon: "marketing" as const, status: "Upcoming" as const, systems: ["Meta (Facebook / Instagram)", "Google Ads", "Mailchimp"] },
    { category: "تجربة الضيف والتقييم", icon: "conversation" as const, status: "Upcoming" as const, systems: ["Google Reviews", "Yelp", "Zendesk"] },
    { category: "CRM الضيوف", icon: "operators" as const, status: "Upcoming" as const, systems: ["SevenRooms", "Toast", "Olo"] },
    { category: "المحاسبة والمالية", icon: "finance" as const, status: "Upcoming" as const, systems: ["QuickBooks", "Xero", "Sage", "FreshBooks"] },
  ],
  fr: [
    { category: "Point de vente (POS)", icon: "restaurant" as const, status: "Live" as const, systems: ["Oracle MICROS Simphony", "Square", "Toast", "Clover", "PostgreSQL (DB directe)", "SQL Server / Azure SQL (DB directe)"] },
    { category: "Main-d'oeuvre et planning", icon: "labor" as const, status: "Upcoming" as const, systems: ["7shifts", "HotSchedules (Fourth)", "Deputy"] },
    { category: "Stock et disponibilite", icon: "inventory" as const, status: "Upcoming" as const, systems: ["MarketMan", "Craftable", "BinWise"] },
    { category: "Achats et approvisionnement", icon: "purchasing" as const, status: "Upcoming" as const, systems: ["MarketMan"] },
    { category: "Livraison et 3PD", icon: "speed" as const, status: "Upcoming" as const, systems: ["Deliverect", "Uber Eats", "DoorDash", "Talabat"] },
    { category: "Reservations et flux clients", icon: "reservations" as const, status: "Upcoming" as const, systems: ["SevenRooms", "OpenTable", "Resy", "Tock"] },
    { category: "Marketing et campagnes", icon: "marketing" as const, status: "Upcoming" as const, systems: ["Meta (Facebook / Instagram)", "Google Ads", "Mailchimp"] },
    { category: "Experience et retours clients", icon: "conversation" as const, status: "Upcoming" as const, systems: ["Google Reviews", "Yelp", "Zendesk"] },
    { category: "CRM clients", icon: "operators" as const, status: "Upcoming" as const, systems: ["SevenRooms", "Toast", "Olo"] },
    { category: "Comptabilite et finance", icon: "finance" as const, status: "Upcoming" as const, systems: ["QuickBooks", "Xero", "Sage", "FreshBooks"] },
  ],
  es: [
    { category: "Punto de venta (POS)", icon: "restaurant" as const, status: "Live" as const, systems: ["Oracle MICROS Simphony", "Square", "Toast", "Clover", "PostgreSQL (DB directa)", "SQL Server / Azure SQL (DB directa)"] },
    { category: "Labor y programacion", icon: "labor" as const, status: "Upcoming" as const, systems: ["7shifts", "HotSchedules (Fourth)", "Deputy"] },
    { category: "Inventario y disponibilidad", icon: "inventory" as const, status: "Upcoming" as const, systems: ["MarketMan", "Craftable", "BinWise"] },
    { category: "Compras y aprovisionamiento", icon: "purchasing" as const, status: "Upcoming" as const, systems: ["MarketMan"] },
    { category: "Delivery y 3PD", icon: "speed" as const, status: "Upcoming" as const, systems: ["Deliverect", "Uber Eats", "DoorDash", "Talabat"] },
    { category: "Reservas y flujo de invitados", icon: "reservations" as const, status: "Upcoming" as const, systems: ["SevenRooms", "OpenTable", "Resy", "Tock"] },
    { category: "Marketing y campañas", icon: "marketing" as const, status: "Upcoming" as const, systems: ["Meta (Facebook / Instagram)", "Google Ads", "Mailchimp"] },
    { category: "Experiencia y feedback", icon: "conversation" as const, status: "Upcoming" as const, systems: ["Google Reviews", "Yelp", "Zendesk"] },
    { category: "CRM de invitados", icon: "operators" as const, status: "Upcoming" as const, systems: ["SevenRooms", "Toast", "Olo"] },
    { category: "Contabilidad y finanzas", icon: "finance" as const, status: "Upcoming" as const, systems: ["QuickBooks", "Xero", "Sage", "FreshBooks"] },
  ],
} as const;

const localizedIntegrationCopy = {
  en: {
    exploreProducts: 'Explore Products',
    publicApiBullets: [
      'Sales summary and exception endpoints',
      'Pulse status and alert data',
      'Configurable rate limits and scoped API keys',
    ],
  },
  ar: {
    exploreProducts: 'استعرض المنتجات',
    publicApiBullets: [
      'نقاط نهاية ملخص المبيعات والاستثناءات',
      'بيانات حالة Pulse والتنبيهات',
      'معدلات قابلة للتخصيص ومفاتيح API محددة النطاق',
    ],
  },
  fr: {
    exploreProducts: 'Découvrir les produits',
    publicApiBullets: [
      'Endpoints de résumé des ventes et des exceptions',
      'Données d’état Pulse et d’alertes',
      'Limites configurables et clés API à portée limitée',
    ],
  },
  es: {
    exploreProducts: 'Explorar productos',
    publicApiBullets: [
      'Endpoints de resumen de ventas y excepciones',
      'Datos de estado y alertas de Pulse',
      'Límites configurables y claves API acotadas',
    ],
  },
} as const;

export default function IntegrationsPage() {
  const { locale, messages } = useWebsiteI18n();
  const copy = messages.pages.integrations;
  const integrationCategories = integrationCategoriesByLocale[locale] ?? integrationCategoriesByLocale.en;
  const ui = localizedIntegrationCopy[locale] ?? localizedIntegrationCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.badge} title={copy.title} description={copy.description} />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {copy.process.map((item) => (
              <StaggerItem key={item.step}>
                <div className="p-6">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.domainsTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{copy.domainsDescription}</p>
          </FadeUp>

          <div className="space-y-12">
            {integrationCategories.map((cat) => (
              <FadeUp key={cat.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow">
                    <SundaeIcon name={cat.icon} size="md" className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">{cat.category}</h3>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      cat.status === "Live"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {cat.status === "Live" ? copy.liveNow : copy.roadmap}
                  </span>
                </div>
                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {cat.systems.map((system) => (
                    <StaggerItem key={system}>
                      <div className="px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--navy-deep)] text-sm font-medium text-[var(--text-secondary)] text-center hover:border-blue-300 transition-colors">
                        {system}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeUp>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[var(--surface-faint)] rounded-xl border border-[var(--border-default)] text-center">
            <div className="flex items-center justify-center gap-6 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">{copy.liveNow}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">{copy.roadmap}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)]">{copy.roadmapDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.webhooksTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{copy.webhooksDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-[var(--navy-deep)] rounded-2xl p-8 border border-[var(--border-default)] shadow-none">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <SundaeIcon name="integration" size="lg" className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{copy.customWebhooks}</h3>
                <p className="text-[var(--text-supporting)] text-sm mb-4">{copy.customWebhooksDescription}</p>
                <ul className="space-y-2 text-sm text-[var(--text-supporting)]">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>{copy.signatureVerification}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>{copy.testPayloads}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>{copy.liveDomains}</span>
                  </li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-[var(--navy-deep)] rounded-2xl p-8 border border-[var(--border-default)] shadow-none">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <SundaeIcon name="data" size="lg" className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{copy.publicApi}</h3>
                <p className="text-[var(--text-supporting)] text-sm mb-4">{copy.publicApiDescription}</p>
                <ul className="space-y-2 text-sm text-[var(--text-supporting)]">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>{ui.publicApiBullets[0]}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>{ui.publicApiBullets[1]}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>{ui.publicApiBullets[2]}</span>
                  </li>
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={copy.title} description={copy.description}>
        <Button variant="cta" size="lg" href="/demo">
          {messages.pages.demo.bookDemo}
        </Button>
          <Button variant="outline-light" size="lg" href="/product">
          {ui.exploreProducts}
          </Button>
      </PageCTA>
    </div>
  );
}
