'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { formatWebsiteCurrency, formatWebsiteNumber, type WebsiteLocale } from '@/lib/i18n';
import { PRICING_URL } from '@/lib/urls';
import { PageHero, FadeUp, StaggerContainer, StaggerItem, PageCTA } from '@/components/ui/PageAnimations';
import { CreamBreak } from '@/components/ui/CreamBreak';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { pricingCreamCopy } from './pricingCreamCopy';
import {
  BILLING_CYCLE_DISCOUNTS,
  CONCEPT_SKUS,
  CORE_DOMAIN_MODULES,
  CORE_PACKAGES,
  CREW_BUNDLES,
  CREW_SKUS,
  FORESIGHT_AND_ACTION,
  IMPLEMENTATION_CLASSES,
  VOLUME_LADDER,
  type BandedSku,
  type BillingCycle,
  type CorePackageId,
} from '@/lib/pricing/priceBook';

/**
 * Public rate card - Sundae price book v1.7.
 *
 * Every number on this page is read from `@/lib/pricing/priceBook`. Nothing is
 * hand-typed here, and nothing is fetched from the live catalog API: the Core
 * packages are MARGINAL-BAND SKUs (first-location anchor + a stepped marginal
 * rate per additional location) and the catalog endpoint speaks the retired
 * flat `basePrice + perLocationPrice` shape, which would silently reintroduce
 * a per-location rate this price book does not have.
 */

const PACKAGE_INCLUDES: Record<CorePackageId, string[]> = {
  core_foundation: [
    'One decision substrate over POS, labor, cost and operations',
    'All eleven Core domain modules, included',
    'Pulse real-time shift monitoring',
    'Sundae Intelligence - ask your data in plain language',
    'Anonymous peer benchmarking',
  ],
  core_margin: [
    'Everything in Core Foundation',
    'Cost and leakage depth: theoretical vs. actual, waste, shrinkage',
    'Void, comp and discount pattern detection',
    'Item and outlet-level contribution analysis',
    'Faster refresh for same-shift intervention',
  ],
  core_growth: [
    'Everything in Core Margin',
    'Guest cohort retention and lifetime value',
    'Promo and campaign attribution by channel',
    'Delivery channel margin after commission',
    'Reservation pacing and no-show risk',
  ],
  core_performance: [
    'Everything in Core Growth',
    'Multi-brand and multi-region consolidation',
    'Cross-module correlation and attribution',
    'Governance: role-based access with audit trails',
    'Priority support with contractual response times',
  ],
};

type PricingFaq = { title: string; content: string };

type PricingAddon = {
  name: string;
  description: string;
  note: string;
  icon: SundaeIconName;
  color: string;
};

type PricingPageCopy = {
  cyclesLabel: string;
  cycleMonthly: string;
  cycleAnnual: string;
  cycleTwoYear: string;
  coreEyebrow: string;
  coreTitle: string;
  coreDescription: string;
  firstLocationLabel: string;
  thenLabel: string;
  bandHeaderLocations: string;
  bandHeaderRate: string;
  perAdditionalLocation: string;
  creditsLabel: string;
  includesLabel: string;
  bandsTitle: string;
  bandsBody: string;
  bandsExample: string;
  modulesTitle: string;
  modulesBody: string;
  foresightTitle: string;
  foresightDescription: string;
  crewTitle: string;
  crewDescription: string;
  crewBundlesLabel: string;
  conceptsTitle: string;
  conceptsDescription: string;
  implementationTitle: string;
  implementationDescription: string;
  implementationNote: string;
  volumeTitle: string;
  volumeDescription: string;
  volumeEnterprise: string;
  volumeCapNote: string;
  discountNone: string;
  perMonthLabel: string;
  oneOffLabel: string;
  fromLabel: string;
  secondaryCta: string;
  addOns: PricingAddon[];
  faqs: PricingFaq[];
};

const enCopy: PricingPageCopy = {
  cyclesLabel: 'Billing cycle',
  cycleMonthly: 'Monthly',
  cycleAnnual: 'Annual',
  cycleTwoYear: '2-year',
  coreEyebrow: 'Sundae Core',
  coreTitle: 'Four Core packages',
  coreDescription:
    'Pick the package whose depth matches the decisions you are trying to make. Every package carries the same eleven domain modules; they differ in how deep each one goes.',
  firstLocationLabel: 'first location / month',
  thenLabel: 'Then, per additional location',
  bandHeaderLocations: 'Locations',
  bandHeaderRate: 'Per additional location / month',
  perAdditionalLocation: 'per additional location / month',
  creditsLabel: 'AI credits / month',
  includesLabel: 'What it includes',
  bandsTitle: 'How location pricing works',
  bandsBody:
    'Your first location carries the package anchor. Every location after it is charged at the marginal rate for the band it falls in, and the rate steps down as you grow. Crossing into a cheaper band does not reprice the locations below it, so your bill only ever moves in one direction per location added.',
  bandsExample:
    'Five locations on Core Foundation: $1,195 for the first, plus four at $175 = $1,895 per month. That works out to a $379 blended average per location - an average of the total, not a rate you can multiply.',
  modulesTitle: 'The eleven domain modules come with the package',
  modulesBody:
    'They are not sold separately and they do not carry a per-module price. Choosing a Core package is how you get all of them.',
  foresightTitle: 'Foresight & Action',
  foresightDescription:
    'Forward-looking forecasts, scenario modelling, and the approve-in-the-loop action layer that acts on what they surface. Priced on the same location bands as Core.',
  crewTitle: 'Sundae Crew',
  crewDescription:
    'The workforce substrate: people, schedules, time and attendance, payroll readiness. Flat monthly, whatever your location count.',
  crewBundlesLabel: 'Bundles',
  conceptsTitle: 'Concepts',
  conceptsDescription:
    'Switch on the operating models your group actually runs. Each concept adds its own grain to every Core module.',
  implementationTitle: 'Implementation',
  implementationDescription:
    'A one-off onboarding fee, charged once. If your selection spans several classes you pay the highest one, never the sum.',
  implementationNote: 'Charged once. Highest class in your selection.',
  volumeTitle: 'Volume',
  volumeDescription: 'Location count discounts the whole monthly subscription.',
  volumeEnterprise: 'Enterprise agreement',
  volumeCapNote:
    'Volume and billing-cycle discounts stack, up to a combined ceiling of 15%.',
  discountNone: 'No volume discount',
  perMonthLabel: '/month',
  oneOffLabel: 'one-off',
  fromLabel: 'from',
  secondaryCta: 'Size it against your operation',
  addOns: [
    {
      name: 'Watchtower',
      description:
        'External intelligence for competitor tracking, weather impact, event calendars, and market briefings.',
      note: 'Scoped and quoted with your Core package',
      icon: 'watchtower',
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'Credit top-ups',
      description:
        'Every Core package carries a monthly AI credit wallet. If you run through it, buy more.',
      note: 'Available on every package',
      icon: 'intelligence',
      color: 'from-[#FF5C4D] to-[#E9A24A]',
    },
  ],
  faqs: [
    {
      title: 'How do you count a location?',
      content:
        'A location is one physical restaurant address. Multiple brands under the same roof still count as one location.',
    },
    {
      title: 'Does hitting a cheaper band lower the price of my existing locations?',
      content:
        'No, and that is deliberate. The bands are marginal. Location 30 is charged at the 26-50 rate; locations 1 through 25 stay on the rates they were added at. It means growth never triggers a surprise re-rating, in either direction.',
    },
    {
      title: 'How many locations does the base price include?',
      content:
        'None beyond the first. The anchor price is the first location. There is no included-locations allowance and no flat per-location rate - each additional location is charged at the marginal rate for its band.',
    },
    {
      title: 'Can I buy a single domain module?',
      content:
        'No. The eleven domain modules are components of a Core package, not separate products. Choosing a package is how you get all of them.',
    },
    {
      title: 'What happens past 100 locations?',
      content:
        'The published bands run to 100. Above that we scope an Enterprise agreement with you rather than publish a rate. Groups of 250 or more are always Enterprise.',
    },
    {
      title: 'How do the discounts combine?',
      content:
        'Annual billing takes 10% off and a 2-year commitment takes 15%. Volume discounts stack on top, but the combined discount is capped at 15%.',
    },
    {
      title: 'Do I need a long-term contract?',
      content:
        'No. Monthly billing is available on every package. Annual and 2-year commitments exist because they cost less, not because they are required.',
    },
    {
      title: 'Is my data private and secure?',
      content:
        'Your data stays yours. We secure data in transit and at rest, enforce strict access controls, and use anonymized, aggregated benchmarking where applicable.',
    },
  ],
};

/**
 * Non-English label sets. Locales without an entry fall back to English rather
 * than render a stale translation of a retired rate card.
 */
const pricingPageCopy: Partial<Record<Exclude<WebsiteLocale, 'en'>, PricingPageCopy>> = {
  ar: {
    ...enCopy,
    cyclesLabel: 'دورة الفوترة',
    cycleMonthly: 'شهري',
    cycleAnnual: 'سنوي',
    cycleTwoYear: 'سنتان',
    coreEyebrow: 'Sundae Core',
    coreTitle: 'أربع باقات Core',
    coreDescription:
      'اختر الباقة التي يناسب عمقها القرارات التي تحاول اتخاذها. كل باقة تضم الوحدات الإحدى عشرة نفسها، والفرق في عمق كل وحدة.',
    firstLocationLabel: 'للموقع الأول شهريًا',
    thenLabel: 'ثم لكل موقع إضافي',
    bandHeaderLocations: 'المواقع',
    bandHeaderRate: 'لكل موقع إضافي شهريًا',
    perAdditionalLocation: 'لكل موقع إضافي شهريًا',
    creditsLabel: 'رصيد ذكاء شهريًا',
    includesLabel: 'ما تشمله',
    bandsTitle: 'كيف يعمل تسعير المواقع',
    bandsBody:
      'يحمل موقعك الأول سعر الباقة الأساسي. ويُحتسب كل موقع بعده بالسعر الحدي للشريحة التي يقع فيها، وينخفض السعر كلما نميت. الانتقال إلى شريحة أرخص لا يعيد تسعير المواقع السابقة.',
    bandsExample:
      'خمسة مواقع على Core Foundation: 1,195$ للأول، وأربعة بسعر 175$ = 1,895$ شهريًا. أي متوسط مُرجّح 379$ لكل موقع - وهو متوسط للإجمالي وليس سعرًا قابلاً للضرب.',
    modulesTitle: 'الوحدات الإحدى عشرة مضمّنة في الباقة',
    modulesBody: 'لا تُباع منفردة ولا تحمل سعرًا لكل وحدة. اختيار باقة Core هو طريقة الحصول عليها جميعًا.',
    foresightTitle: 'Foresight & Action',
    foresightDescription:
      'توقعات مستقبلية ونمذجة سيناريوهات وطبقة تنفيذ باعتماد بشري. يُسعَّر على شرائح المواقع نفسها المستخدمة في Core.',
    crewTitle: 'Sundae Crew',
    crewDescription: 'الركيزة التشغيلية للقوى العاملة: الأفراد والجداول والحضور وجاهزية الرواتب. سعر شهري ثابت مهما كان عدد مواقعك.',
    crewBundlesLabel: 'الحزم',
    conceptsTitle: 'المفاهيم التشغيلية',
    conceptsDescription: 'فعّل نماذج التشغيل التي تديرها مجموعتك فعليًا. كل مفهوم يضيف تفصيله الخاص لكل وحدة في Core.',
    implementationTitle: 'التنفيذ',
    implementationDescription: 'رسوم تهيئة تُدفع مرة واحدة. وإذا شمل اختيارك عدة فئات فتدفع أعلاها فقط، لا مجموعها.',
    implementationNote: 'تُحتسب مرة واحدة، بأعلى فئة في اختيارك.',
    volumeTitle: 'الحجم',
    volumeDescription: 'عدد المواقع يخصم من إجمالي الاشتراك الشهري.',
    volumeEnterprise: 'اتفاقية Enterprise',
    volumeCapNote: 'تتراكم خصومات الحجم ودورة الفوترة بحد أقصى مجمّع 15%.',
    discountNone: 'بدون خصم حجم',
    perMonthLabel: '/شهريًا',
    oneOffLabel: 'مرة واحدة',
    fromLabel: 'ابتداءً من',
    secondaryCta: 'قِس التكلفة على عمليتك',
  },
  fr: {
    ...enCopy,
    cyclesLabel: 'Cycle de facturation',
    cycleMonthly: 'Mensuel',
    cycleAnnual: 'Annuel',
    cycleTwoYear: '2 ans',
    coreTitle: 'Quatre offres Core',
    coreDescription:
      'Choisissez l offre dont la profondeur correspond aux decisions que vous devez prendre. Chaque offre embarque les memes onze modules metier ; elles different par la profondeur de chacun.',
    firstLocationLabel: 'premier site / mois',
    thenLabel: 'Puis, par site additionnel',
    bandHeaderLocations: 'Sites',
    bandHeaderRate: 'Par site additionnel / mois',
    perAdditionalLocation: 'par site additionnel / mois',
    creditsLabel: 'credits IA / mois',
    includesLabel: 'Ce qui est inclus',
    bandsTitle: 'Comment fonctionne la tarification par site',
    bandsBody:
      'Votre premier site porte le prix d ancrage de l offre. Chaque site suivant est facture au tarif marginal de sa tranche, et ce tarif baisse a mesure que vous grandissez. Franchir une tranche moins chere ne retarife pas les sites deja en place.',
    bandsExample:
      'Cinq sites sur Core Foundation : 1 195 $ pour le premier, plus quatre a 175 $ = 1 895 $ par mois. Soit une moyenne ponderee de 379 $ par site - une moyenne du total, pas un tarif a multiplier.',
    modulesTitle: 'Les onze modules metier sont compris dans l offre',
    modulesBody: 'Ils ne sont pas vendus separement et n ont pas de prix a l unite. Choisir une offre Core, c est les obtenir tous.',
    foresightTitle: 'Foresight & Action',
    foresightDescription:
      'Previsions, modelisation de scenarios et couche d action validee par un humain. Tarifee sur les memes tranches de sites que Core.',
    crewTitle: 'Sundae Crew',
    crewDescription: 'Le socle RH : personnes, plannings, temps et presence, preparation de la paie. Forfait mensuel, quel que soit le nombre de sites.',
    crewBundlesLabel: 'Bundles',
    conceptsTitle: 'Concepts',
    conceptsDescription: 'Activez les modeles d exploitation que votre groupe fait tourner. Chaque concept ajoute sa maille a tous les modules Core.',
    implementationTitle: 'Mise en oeuvre',
    implementationDescription: 'Des frais de demarrage uniques. Si votre selection couvre plusieurs classes, vous payez la plus elevee, jamais la somme.',
    implementationNote: 'Facture une fois, a la classe la plus elevee de votre selection.',
    volumeTitle: 'Volume',
    volumeDescription: 'Le nombre de sites reduit l abonnement mensuel total.',
    volumeEnterprise: 'Accord Enterprise',
    volumeCapNote: 'Les remises volume et cycle se cumulent, dans la limite de 15 %.',
    discountNone: 'Pas de remise volume',
    perMonthLabel: '/mois',
    oneOffLabel: 'unique',
    fromLabel: 'a partir de',
    secondaryCta: 'Chiffrez-le sur votre exploitation',
  },
  es: {
    ...enCopy,
    cyclesLabel: 'Ciclo de facturación',
    cycleMonthly: 'Mensual',
    cycleAnnual: 'Anual',
    cycleTwoYear: '2 años',
    coreTitle: 'Cuatro paquetes Core',
    coreDescription:
      'Elige el paquete cuya profundidad encaje con las decisiones que necesitas tomar. Todos llevan los mismos once módulos de dominio; se diferencian en cuánto profundiza cada uno.',
    firstLocationLabel: 'primer local / mes',
    thenLabel: 'Después, por local adicional',
    bandHeaderLocations: 'Locales',
    bandHeaderRate: 'Por local adicional / mes',
    perAdditionalLocation: 'por local adicional / mes',
    creditsLabel: 'créditos de IA / mes',
    includesLabel: 'Qué incluye',
    bandsTitle: 'Cómo funciona el precio por local',
    bandsBody:
      'Tu primer local lleva el precio ancla del paquete. Cada local posterior se cobra a la tarifa marginal del tramo en el que cae, y esa tarifa baja según creces. Entrar en un tramo más barato no revaloriza los locales anteriores.',
    bandsExample:
      'Cinco locales en Core Foundation: 1.195 $ el primero, más cuatro a 175 $ = 1.895 $ al mes. Eso da una media ponderada de 379 $ por local: una media del total, no una tarifa que puedas multiplicar.',
    modulesTitle: 'Los once módulos de dominio vienen con el paquete',
    modulesBody: 'No se venden por separado ni tienen precio por módulo. Elegir un paquete Core es como los obtienes todos.',
    foresightTitle: 'Foresight & Action',
    foresightDescription:
      'Previsiones, modelado de escenarios y la capa de acción con aprobación humana. Se tarifica con los mismos tramos de locales que Core.',
    crewTitle: 'Sundae Crew',
    crewDescription: 'El sustrato de personal: personas, horarios, control horario y preparación de nóminas. Cuota mensual fija, sean cuantos sean tus locales.',
    crewBundlesLabel: 'Paquetes',
    conceptsTitle: 'Conceptos',
    conceptsDescription: 'Activa los modelos operativos que tu grupo realmente opera. Cada concepto añade su propio grano a todos los módulos de Core.',
    implementationTitle: 'Implantación',
    implementationDescription: 'Una cuota de puesta en marcha, cobrada una sola vez. Si tu selección abarca varias clases, pagas la más alta, nunca la suma.',
    implementationNote: 'Se cobra una vez, por la clase más alta de tu selección.',
    volumeTitle: 'Volumen',
    volumeDescription: 'El número de locales descuenta toda la suscripción mensual.',
    volumeEnterprise: 'Acuerdo Enterprise',
    volumeCapNote: 'Los descuentos por volumen y por ciclo se acumulan, con un tope combinado del 15%.',
    discountNone: 'Sin descuento por volumen',
    perMonthLabel: '/mes',
    oneOffLabel: 'pago único',
    fromLabel: 'desde',
    secondaryCta: 'Calcúlalo sobre tu operación',
  },
};

function money(value: number, locale: WebsiteLocale): string {
  return formatWebsiteCurrency(value, locale, { currency: 'USD', maximumFractionDigits: 0 });
}

function applyCycle(value: number, cycle: BillingCycle): number {
  return Math.round(value * (1 - BILLING_CYCLE_DISCOUNTS[cycle]));
}

function BandTable({
  sku,
  cycle,
  copy,
  locale,
}: {
  sku: BandedSku;
  cycle: BillingCycle;
  copy: PricingPageCopy;
  locale: WebsiteLocale;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-[var(--text-muted)]">
            <th scope="col" className="pb-2 pe-4 font-medium">{copy.bandHeaderLocations}</th>
            <th scope="col" className="pb-2 font-medium">{copy.bandHeaderRate}</th>
          </tr>
        </thead>
        <tbody>
          {sku.bands.map((band) => (
            <tr key={band.fromUnit} className="border-t border-[var(--border-default)]">
              <td className="py-2 pe-4 text-[var(--text-supporting)] tabular-nums">
                {band.fromUnit}-{band.toUnit}
              </td>
              <td className="py-2 text-[var(--text-secondary)] font-medium tabular-nums">
                {money(applyCycle(band.monthlyPerUnit, cycle), locale)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  const { locale, messages } = useWebsiteI18n();
  const heroCopy = messages.pages.pricing;
  const copy = pricingPageCopy[locale as Exclude<WebsiteLocale, 'en'>] ?? enCopy;
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const cream = pricingCreamCopy[locale as keyof typeof pricingCreamCopy] ?? pricingCreamCopy.en;

  const cycleOptions: { id: BillingCycle; label: string }[] = [
    { id: 'monthly', label: copy.cycleMonthly },
    { id: 'annual', label: copy.cycleAnnual },
    { id: 'two_year', label: copy.cycleTwoYear },
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={heroCopy.badge} title={heroCopy.title} description={heroCopy.description}>
        <div
          role="radiogroup"
          aria-label={copy.cyclesLabel}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--border-default)] p-1"
        >
          {cycleOptions.map((option) => {
            const active = cycle === option.id;
            const discount = BILLING_CYCLE_DISCOUNTS[option.id];
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setCycle(option.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#FF5C4D]/20 text-[#FF8473]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {option.label}
                {discount > 0 && (
                  <span className="ms-2 text-green-400">-{Math.round(discount * 100)}%</span>
                )}
              </button>
            );
          })}
        </div>
      </PageHero>

      {/* Core packages */}
      <section className="pb-16 pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <div className="inline-flex items-center space-x-2 bg-[#FF5C4D]/20 text-[#FF8473] px-5 py-2 rounded-full text-sm font-semibold mb-4">
                <SundaeIcon name="core" size="md" />
                <span>{copy.coreEyebrow}</span>
              </div>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.coreTitle}</h2>
              <p className="body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
                {copy.coreDescription}
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {CORE_PACKAGES.map((pkg) => (
              <StaggerItem key={pkg.id}>
                <Card className="h-full border border-[var(--border-default)] shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-[var(--text-primary)] mb-2">{pkg.name}</CardTitle>
                    <div className="mb-1">
                      <span className="text-4xl font-bold text-[var(--text-primary)] tabular-nums">
                        {money(applyCycle(pkg.firstUnitMonthly, cycle), locale)}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-supporting)]">{copy.firstLocationLabel}</p>
                    <CardDescription className="text-[var(--text-supporting)] mt-3 text-sm">
                      {formatWebsiteNumber(pkg.aiCreditWallet, locale)} {copy.creditsLabel}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-5 pb-5 border-b border-[var(--border-default)]">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-3">
                        {copy.thenLabel}
                      </p>
                      <BandTable sku={pkg} cycle={cycle} copy={copy} locale={locale} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-3">
                      {copy.includesLabel}
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {PACKAGE_INCLUDES[pkg.id].map((feature) => (
                        <li key={feature} className="flex items-start space-x-2.5">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/demo">
                      <Button variant="outline" size="lg" className="w-full">
                        {heroCopy.bookDemo}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* How marginal bands work - the mechanic, stated plainly */}
          <FadeUp delay={0.2}>
            <Card className="mt-10 border border-[var(--border-default)] bg-[var(--surface-faint)]">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{copy.bandsTitle}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-3xl">{copy.bandsBody}</p>
                <p className="text-sm text-[var(--text-supporting)] max-w-3xl">
                  {copy.bandsExample}
                </p>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      <CreamBreak eyebrow={cream.eyebrow} statement={cream.statement} lede={cream.lede} />

      {/* The eleven domain modules - components, not offers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.modulesTitle}</h2>
              <p className="body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.modulesBody}</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_DOMAIN_MODULES.map((module) => (
              <StaggerItem key={module.id}>
                <div className="h-full rounded-lg border border-[var(--border-default)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{module.name}</p>
                  <p className="text-sm text-[var(--text-supporting)]">{module.summary}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Foresight & Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <Card className="border border-[var(--border-default)] shadow-lg">
              <CardContent className="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{copy.foresightTitle}</h2>
                  <p className="text-sm text-[var(--text-supporting)] mb-6">{copy.foresightDescription}</p>
                  <div>
                    <span className="text-4xl font-bold text-[var(--text-primary)] tabular-nums">
                      {money(applyCycle(FORESIGHT_AND_ACTION.firstUnitMonthly, cycle), locale)}
                    </span>
                    <p className="text-sm text-[var(--text-supporting)]">{copy.firstLocationLabel}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-3">
                    {copy.thenLabel}
                  </p>
                  <BandTable sku={FORESIGHT_AND_ACTION} cycle={cycle} copy={copy} locale={locale} />
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      {/* Crew */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.crewTitle}</h2>
              <p className="body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.crewDescription}</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {CREW_SKUS.map((sku) => (
              <StaggerItem key={sku.id}>
                <div className="h-full rounded-lg border border-[var(--border-default)] p-5 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{sku.name}</span>
                  <span className="text-lg font-bold text-[var(--text-primary)] tabular-nums whitespace-nowrap">
                    {money(applyCycle(sku.monthly, cycle), locale)}
                    <span className="text-xs font-normal text-[var(--text-muted)]">{copy.perMonthLabel}</span>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeUp delay={0.15}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-3 text-center">
              {copy.crewBundlesLabel}
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {CREW_BUNDLES.map((sku) => (
                <div key={sku.id} className="rounded-lg border border-[#FF5C4D]/40 p-5 text-center">
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">{sku.name}</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                    {money(applyCycle(sku.monthly, cycle), locale)}
                    <span className="text-xs font-normal text-[var(--text-muted)]">{copy.perMonthLabel}</span>
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Concepts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.conceptsTitle}</h2>
              <p className="body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">{copy.conceptsDescription}</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONCEPT_SKUS.map((sku) => (
              <StaggerItem key={sku.id}>
                <div className="h-full rounded-lg border border-[var(--border-default)] p-5 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{sku.name}</span>
                  <span className="text-lg font-bold text-[var(--text-primary)] tabular-nums whitespace-nowrap">
                    {money(applyCycle(sku.monthly, cycle), locale)}
                    <span className="text-xs font-normal text-[var(--text-muted)]">{copy.perMonthLabel}</span>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Implementation + volume */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <FadeUp>
            <Card className="h-full border border-[var(--border-default)]">
              <CardHeader>
                <CardTitle className="text-xl text-[var(--text-primary)]">{copy.implementationTitle}</CardTitle>
                <CardDescription className="text-[var(--text-supporting)] mt-2 text-sm">
                  {copy.implementationDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {IMPLEMENTATION_CLASSES.map((cls) => (
                    <li key={cls.id} className="flex items-baseline justify-between gap-4 border-b border-[var(--border-default)] pb-2 last:border-0">
                      <span className="text-sm text-[var(--text-secondary)]">{cls.name}</span>
                      <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums whitespace-nowrap">
                        {cls.from ? `${copy.fromLabel} ` : ''}
                        {money(cls.oneOff, locale)}
                        <span className="ms-1 text-xs font-normal text-[var(--text-muted)]">{copy.oneOffLabel}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-[var(--text-muted)]">{copy.implementationNote}</p>
              </CardContent>
            </Card>
          </FadeUp>

          <FadeUp delay={0.1}>
            <Card className="h-full border border-[var(--border-default)]">
              <CardHeader>
                <CardTitle className="text-xl text-[var(--text-primary)]">{copy.volumeTitle}</CardTitle>
                <CardDescription className="text-[var(--text-supporting)] mt-2 text-sm">
                  {copy.volumeDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {VOLUME_LADDER.map((band) => (
                    <li key={band.fromUnits} className="flex items-baseline justify-between gap-4 border-b border-[var(--border-default)] pb-2 last:border-0">
                      <span className="text-sm text-[var(--text-secondary)]">{band.label}</span>
                      <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums whitespace-nowrap">
                        {band.rate === null
                          ? copy.volumeEnterprise
                          : band.rate === 0
                            ? copy.discountNone
                            : `-${(band.rate * 100).toFixed(band.rate === 0.025 ? 1 : 0)}%`}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-[var(--text-muted)]">{copy.volumeCapNote}</p>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      {/* Enterprise */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <Card className="border-2 border-[#FF5C4D]/50 shadow-2xl bg-[var(--surface-faint)]">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center space-x-2 bg-[#FF5C4D]/20 text-[#FF8473] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <SundaeIcon name="franchise" size="md" />
                  <span>{heroCopy.enterpriseBadge}</span>
                </div>
                <h3 className="text-3xl font-bold text-[var(--text-display)] mb-4">{heroCopy.enterpriseTitle}</h3>
                <p className="text-[var(--text-supporting)] mb-6 max-w-2xl mx-auto">
                  {heroCopy.enterpriseDescription}
                </p>
                <Link href="/demo">
                  <Button variant="primary" size="lg" className="px-8">
                    {heroCopy.bookDemo}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{heroCopy.addOnsTitle}</h2>
              <p className="body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">{heroCopy.addOnsDescription}</p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {copy.addOns.map((addon) => (
              <StaggerItem key={addon.name}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-br ${addon.color} rounded-lg flex items-center justify-center mb-4`}>
                      <SundaeIcon name={addon.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-lg text-[var(--text-primary)] mb-2">{addon.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-supporting)] mb-3">{addon.description}</p>
                    <p className="text-xs text-[var(--text-muted)] font-medium">{addon.note}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.3}>
            <div className="text-center mt-8">
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  {heroCopy.detailedPricingCalculator}
                </Button>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{heroCopy.faqTitle}</h2>
              <p className="body-lg text-[var(--text-secondary)]">{heroCopy.faqDescription}</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Accordion items={copy.faqs} defaultOpenIndex={0} />
          </FadeUp>
        </div>
      </section>

      <PageCTA title={heroCopy.ctaTitle} description={heroCopy.ctaDescription}>
        <Button variant="cta" size="lg" href="/demo">
          {heroCopy.bookDemo}
        </Button>
        <Button variant="outline-ink" size="lg" href="/diagnostic">
          {copy.secondaryCta}
        </Button>
      </PageCTA>
    </div>
  );
}
