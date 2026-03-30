'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';

const localizedScoutCopy = {
  en: {
    heroBadge: 'Scout — Data Layer',
    heroTitle: <>Every System Connected.<br />Every Number Trusted.</>,
    heroDescription: 'Scout connects your POS, labor, inventory, reservations, and delivery platforms into one clean data layer - so every dashboard, alert, and recommendation starts with data you can trust.',
    heroPrimary: 'See Scout in Action',
    heroSecondary: 'View All Integrations',
    featuresHeading: 'What Scout Does',
    featuresDescription: 'One data layer that connects, cleans, and unifies everything your restaurant runs on',
    features: [
      { title: '30+ Pre-Built Connectors', description: 'POS, labor, inventory, reservations, delivery, marketing, accounting - Scout speaks to the systems you already use.', icon: 'integration' as SundaeIconName },
      { title: 'Continuous Sync', description: 'Data flows automatically. No nightly dumps, no CSV uploads, no waiting until morning to see yesterday\'s numbers.', icon: 'speed' as SundaeIconName },
      { title: 'Cleaning Built In', description: 'Scout normalizes naming, fills gaps, and flags quality issues before bad data reaches your dashboards.', icon: 'success' as SundaeIconName },
      { title: 'Enterprise Scale', description: '100+ locations, millions of transactions, sub-second queries. Scout is built for restaurant groups that outgrow spreadsheets.', icon: 'growth' as SundaeIconName },
    ],
    integrationsHeading: 'Connected Platforms',
    integrationsDescription: 'Most integrations take under 5 minutes. OAuth or API key - authenticate and go.',
    integrations: [
      { category: 'Point of Sale', systems: ['Oracle MICROS', 'Toast', 'Square', 'Clover'] },
      { category: 'Labor & Scheduling', systems: ['7shifts', 'HotSchedules', 'Deputy'] },
      { category: 'Inventory', systems: ['MarketMan', 'Craftable', 'BinWise'] },
      { category: 'Reservations & CRM', systems: ['SevenRooms', 'OpenTable', 'Resy', 'Tock'] },
    ],
    stepsHeading: 'Connect. Clean. Activate.',
    stepsDescription: 'Three steps from siloed systems to unified intelligence',
    steps: [
      { step: '1', title: 'Authenticate', description: 'Connect your platforms with OAuth or API key. Most integrations take under 5 minutes - no engineering required.' },
      { step: '2', title: 'Normalize', description: 'Scout maps every data source to a consistent schema, cleans inconsistencies, and fills gaps automatically.' },
      { step: '3', title: 'Analyze', description: 'Unified data flows into dashboards, alerts, and recommendations. No exports, no manual entry.' },
    ],
    ctaTitle: 'Stop Exporting. Start Connecting.',
    ctaDescription: 'See how Scout unifies your restaurant data in a single demo.',
    ctaPrimary: 'Book a Demo',
    ctaSecondary: 'View All Products',
  },
  ar: {
    heroBadge: 'Scout — طبقة البيانات',
    heroTitle: <>كل نظام متصل.<br />وكل رقم موثوق.</>,
    heroDescription: 'يوصل Scout منصات POS والعمالة والمخزون والحجوزات والتوصيل في طبقة بيانات نظيفة واحدة - حتى تبدأ كل لوحة وتنبيه وتوصية من بيانات يمكنك الوثوق بها.',
    heroPrimary: 'شاهد Scout عملياً',
    heroSecondary: 'عرض كل التكاملات',
    featuresHeading: 'ما الذي يفعله Scout',
    featuresDescription: 'طبقة بيانات واحدة توصل كل ما يعمل عليه مطعمك وتنظفه وتوحده',
    features: [
      { title: 'أكثر من 30 موصلًا جاهزًا', description: 'POS والعمالة والمخزون والحجوزات والتوصيل والتسويق والمحاسبة - يتحدث Scout إلى الأنظمة التي تستخدمها بالفعل.', icon: 'integration' as SundaeIconName },
      { title: 'مزامنة مستمرة', description: 'تتحرك البيانات تلقائياً. بلا دفعات ليلية ولا رفع CSV ولا انتظار حتى الصباح.', icon: 'speed' as SundaeIconName },
      { title: 'تنظيف مدمج', description: 'يوحد Scout التسميات، ويملأ الثغرات، ويشير إلى مشكلات الجودة قبل أن تصل البيانات السيئة إلى لوحاتك.', icon: 'success' as SundaeIconName },
      { title: 'مقياس مؤسسي', description: 'أكثر من 100 موقع وملايين المعاملات واستعلامات دون الثانية. Scout مصمم للمجموعات التي تتجاوز الجداول.', icon: 'growth' as SundaeIconName },
    ],
    integrationsHeading: 'المنصات المتصلة',
    integrationsDescription: 'معظم التكاملات تستغرق أقل من 5 دقائق. OAuth أو مفتاح API - صادق وابدأ.',
    integrations: [
      { category: 'نقاط البيع', systems: ['Oracle MICROS', 'Toast', 'Square', 'Clover'] },
      { category: 'العمالة والجدولة', systems: ['7shifts', 'HotSchedules', 'Deputy'] },
      { category: 'المخزون', systems: ['MarketMan', 'Craftable', 'BinWise'] },
      { category: 'الحجوزات و CRM', systems: ['SevenRooms', 'OpenTable', 'Resy', 'Tock'] },
    ],
    stepsHeading: 'اتصل. نظف. فعّل.',
    stepsDescription: 'ثلاث خطوات من الأنظمة المعزولة إلى الذكاء الموحد',
    steps: [
      { step: '1', title: 'صادِق', description: 'صِل منصاتك عبر OAuth أو مفتاح API. معظم التكاملات أقل من 5 دقائق - بلا جهد هندسي.' },
      { step: '2', title: 'وحّد', description: 'يعيد Scout رسم كل مصدر بيانات إلى مخطط متسق ويعالج عدم الاتساق والثغرات تلقائياً.' },
      { step: '3', title: 'حلّل', description: 'تتدفق البيانات الموحدة إلى لوحات وتنبيهات وتوصيات. بلا تصدير ولا إدخال يدوي.' },
    ],
    ctaTitle: 'توقف عن التصدير. وابدأ بالاتصال.',
    ctaDescription: 'شاهد كيف يوحد Scout بيانات مطعمك في عرض واحد.',
    ctaPrimary: 'احجز عرضاً',
    ctaSecondary: 'عرض كل المنتجات',
  },
  fr: {
    heroBadge: 'Scout - Couche data',
    heroTitle: <>Chaque systeme connecte.<br />Chaque chiffre fiable.</>,
    heroDescription: 'Scout connecte vos plateformes POS, RH, inventaire, reservations et livraison dans une seule couche de donnees propre - pour que chaque tableau, alerte et recommandation parte de donnees fiables.',
    heroPrimary: 'Voir Scout en action',
    heroSecondary: 'Voir toutes les integrations',
    featuresHeading: 'Ce que fait Scout',
    featuresDescription: 'Une seule couche de donnees qui connecte, nettoie et unifie tout ce que votre restaurant utilise',
    features: [
      { title: '30+ connecteurs preconstruits', description: 'POS, RH, inventaire, reservations, livraison, marketing, comptabilite - Scout parle aux systemes que vous utilisez deja.', icon: 'integration' as SundaeIconName },
      { title: 'Synchronisation continue', description: 'Les donnees circulent automatiquement. Pas de dumps nocturnes, pas de CSV, pas d attente jusqu au matin.', icon: 'speed' as SundaeIconName },
      { title: 'Nettoyage integre', description: 'Scout normalise les noms, comble les lacunes et signale les problemes avant que les mauvaises donnees n atteignent vos tableaux.', icon: 'success' as SundaeIconName },
      { title: 'Echelle enterprise', description: '100+ sites, millions de transactions, requetes sous la seconde. Scout est concu pour les groupes qui depassent les tableurs.', icon: 'growth' as SundaeIconName },
    ],
    integrationsHeading: 'Plateformes connectees',
    integrationsDescription: 'La plupart des integrations prennent moins de 5 minutes. OAuth ou cle API - authentifiez-vous et avancez.',
    integrations: [
      { category: 'Point de vente', systems: ['Oracle MICROS', 'Toast', 'Square', 'Clover'] },
      { category: 'RH et planning', systems: ['7shifts', 'HotSchedules', 'Deputy'] },
      { category: 'Inventaire', systems: ['MarketMan', 'Craftable', 'BinWise'] },
      { category: 'Reservations et CRM', systems: ['SevenRooms', 'OpenTable', 'Resy', 'Tock'] },
    ],
    stepsHeading: 'Connecter. Nettoyer. Activer.',
    stepsDescription: 'Trois etapes des systemes isoles a l intelligence unifiee',
    steps: [
      { step: '1', title: 'Authentifier', description: 'Connectez vos plateformes avec OAuth ou une cle API. La plupart des integrations prennent moins de 5 minutes.' },
      { step: '2', title: 'Normaliser', description: 'Scout mappe chaque source vers un schema coherent, nettoie les incoherences et comble les lacunes automatiquement.' },
      { step: '3', title: 'Analyser', description: 'Les donnees unifiees alimentent tableaux, alertes et recommandations. Pas d export ni de saisie manuelle.' },
    ],
    ctaTitle: 'Arretez d exporter. Commencez a connecter.',
    ctaDescription: 'Voyez comment Scout unifie vos donnees restaurant dans une seule demo.',
    ctaPrimary: 'Reserver une demo',
    ctaSecondary: 'Voir tous les produits',
  },
  es: {
    heroBadge: 'Scout - Capa de datos',
    heroTitle: <>Cada sistema conectado.<br />Cada numero confiable.</>,
    heroDescription: 'Scout conecta tus plataformas de POS, personal, inventario, reservas y delivery en una sola capa de datos limpia - para que cada panel, alerta y recomendacion parta de datos en los que puedes confiar.',
    heroPrimary: 'Ver Scout en accion',
    heroSecondary: 'Ver todas las integraciones',
    featuresHeading: 'Que hace Scout',
    featuresDescription: 'Una capa de datos que conecta, limpia y unifica todo lo que usa tu restaurante',
    features: [
      { title: 'Mas de 30 conectores listos', description: 'POS, personal, inventario, reservas, delivery, marketing, contabilidad - Scout habla con los sistemas que ya usas.', icon: 'integration' as SundaeIconName },
      { title: 'Sincronizacion continua', description: 'Los datos fluyen automaticamente. Sin volcados nocturnos, sin CSV, sin esperar a la manana.', icon: 'speed' as SundaeIconName },
      { title: 'Limpieza integrada', description: 'Scout normaliza nombres, rellena huecos y marca problemas antes de que los datos malos lleguen a tus paneles.', icon: 'success' as SundaeIconName },
      { title: 'Escala empresarial', description: 'Mas de 100 ubicaciones, millones de transacciones y consultas en menos de un segundo. Scout esta hecho para crecer.', icon: 'growth' as SundaeIconName },
    ],
    integrationsHeading: 'Plataformas conectadas',
    integrationsDescription: 'La mayoria de las integraciones tardan menos de 5 minutos. OAuth o clave API - autentica y sigue.',
    integrations: [
      { category: 'Punto de venta', systems: ['Oracle MICROS', 'Toast', 'Square', 'Clover'] },
      { category: 'Personal y turnos', systems: ['7shifts', 'HotSchedules', 'Deputy'] },
      { category: 'Inventario', systems: ['MarketMan', 'Craftable', 'BinWise'] },
      { category: 'Reservas y CRM', systems: ['SevenRooms', 'OpenTable', 'Resy', 'Tock'] },
    ],
    stepsHeading: 'Conecta. Limpia. Activa.',
    stepsDescription: 'Tres pasos de sistemas aislados a inteligencia unificada',
    steps: [
      { step: '1', title: 'Autenticar', description: 'Conecta tus plataformas con OAuth o clave API. La mayoria de las integraciones tardan menos de 5 minutos.' },
      { step: '2', title: 'Normalizar', description: 'Scout mapea cada fuente a un esquema coherente, limpia incoherencias y rellena huecos automaticamente.' },
      { step: '3', title: 'Analizar', description: 'Los datos unificados alimentan paneles, alertas y recomendaciones. Sin exportaciones ni entrada manual.' },
    ],
    ctaTitle: 'Deja de exportar. Empieza a conectar.',
    ctaDescription: 'Ve como Scout unifica los datos de tu restaurante en una sola demo.',
    ctaPrimary: 'Reservar una demo',
    ctaSecondary: 'Ver todos los productos',
  },
} as const;

export default function ScoutPage() {
  const { locale } = useWebsiteI18n();
  const ui = localizedScoutCopy[locale] ?? localizedScoutCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={ui.heroBadge} title={ui.heroTitle} description={ui.heroDescription}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              {ui.heroPrimary}
            </Button>
          </Link>
          <Link href="/integrations">
            <Button variant="outline-light" size="lg">
              {ui.heroSecondary}
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.featuresHeading}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.featuresDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ui.features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] p-6 hover:border-white/[0.1] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-[var(--surface-subtle)] flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name={feature.icon} size="md" className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{feature.title}</h3>
                      <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.integrationsHeading}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.integrationsDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ui.integrations.map((category, index) => (
              <StaggerItem key={index}>
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] p-6">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">{category.category}</h3>
                  <ul className="space-y-2.5">
                    {category.systems.map((system, systemIndex) => (
                      <li key={systemIndex} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full"></span>
                        <span className="text-[var(--text-supporting)] text-sm">{system}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <p className="text-center text-sm text-[var(--text-muted)] mt-8">
            <Link href="/integrations" className="hover:text-[var(--text-secondary)] transition-colors underline underline-offset-2">
              See all 80+ integrations &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.stepsHeading}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.stepsDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ui.steps.map((step, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-supporting)] text-lg font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={ui.ctaTitle} description={ui.ctaDescription}>
        <Link href="/demo">
          <Button variant="primary" size="lg">
            {ui.heroPrimary}
          </Button>
        </Link>
        <Link href="/product">
          <Button variant="outline-light" size="lg">
            {ui.ctaSecondary}
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
