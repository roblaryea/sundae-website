import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { SundaeIcon } from "@/components/icons";
import { PRICING_URL } from "@/lib/links";
import { PageHero, PageCTA, FadeUp } from "@/components/ui/PageAnimations";
import { resolveWebsiteLocale, type WebsiteLocale } from "@/lib/i18n";

const contactCopy = {
  en: {
    metadataTitle: "Contact Us",
    metadataDescription: "Get in touch with the Sundae team. Whether you're a multi-unit operator, franchise owner, or hospitality group, we'd love to hear about your data challenges.",
    badge: "Get in Touch",
    title: "Let's Talk",
    description: "Whether you're exploring Sundae for the first time or ready to scale, we'd love to hear from you.",
    formTitle: "Send us a message",
    ctaLabel: "Send Message",
    defaultMessage: "I'd like to get in touch about...",
    infoTitle: "Get in touch",
    infoDescription: "Multi-unit operators, franchise owners, hospitality groups - we work with teams who want to see what their data is actually telling them.",
    emailLabel: "Email",
    officesLabel: "Offices",
    responseLabel: "Response Time",
    responseNote: "Within 2 hours during business hours",
    hours: "Monday - Friday, 9 AM - 6 PM EST",
    quickLinksTitle: "Quick Links",
    links: ["Book a Demo", "View Pricing", "Explore Products", "About Sundae"],
    ctaTitle: "Ready to See What You're Missing?",
    ctaDescription: "Book a 30-minute demo with your own data. No slides, no sales pressure.",
    ctaPrimary: "Book a Demo",
    ctaSecondary: "Explore Products",
  },
  ar: {
    metadataTitle: "اتصل بنا",
    metadataDescription: "تواصل مع فريق Sundae. سواء كنت مشغلًا متعدد الفروع أو مالك امتياز أو مجموعة ضيافة، يسعدنا سماع تحديات البيانات لديك.",
    badge: "تواصل معنا",
    title: "لنتحدث",
    description: "سواء كنت تستكشف Sundae لأول مرة أو مستعدًا للتوسع، يسعدنا سماعك.",
    formTitle: "أرسل لنا رسالة",
    ctaLabel: "إرسال الرسالة",
    defaultMessage: "أرغب في التواصل بخصوص...",
    infoTitle: "تواصل معنا",
    infoDescription: "المشغلون متعددو الفروع وأصحاب الامتياز ومجموعات الضيافة - نحن نعمل مع فرق تريد أن ترى ما تقوله بياناتها فعلًا.",
    emailLabel: "البريد الإلكتروني",
    officesLabel: "المكاتب",
    responseLabel: "زمن الاستجابة",
    responseNote: "خلال ساعتين في ساعات العمل",
    hours: "من الاثنين إلى الجمعة، 9 صباحًا - 6 مساءً بتوقيت EST",
    quickLinksTitle: "روابط سريعة",
    links: ["احجز عرضًا", "عرض الأسعار", "استعرض المنتجات", "حول Sundae"],
    ctaTitle: "هل أنت مستعد لرؤية ما فاتك؟",
    ctaDescription: "احجز عرضًا لمدة 30 دقيقة باستخدام بياناتك. بلا شرائح ولا ضغط مبيعات.",
    ctaPrimary: "احجز عرضًا",
    ctaSecondary: "استعرض المنتجات",
  },
  fr: {
    metadataTitle: "Nous contacter",
    metadataDescription: "Contactez l'équipe Sundae. Que vous soyez opérateur multi-sites, franchisé ou groupe hospitality, nous serions ravis d'entendre vos défis data.",
    badge: "Entrer en contact",
    title: "Parlons-en",
    description: "Que vous découvriez Sundae ou que vous soyez prêt à passer à l'échelle, nous serions ravis d'échanger.",
    formTitle: "Envoyez-nous un message",
    ctaLabel: "Envoyer le message",
    defaultMessage: "Je souhaite vous contacter à propos de...",
    infoTitle: "Contactez-nous",
    infoDescription: "Opérateurs multi-sites, franchisés, groupes hospitality - nous travaillons avec des équipes qui veulent comprendre ce que leurs données disent vraiment.",
    emailLabel: "E-mail",
    officesLabel: "Bureaux",
    responseLabel: "Délai de réponse",
    responseNote: "Sous 2 heures pendant les heures ouvrées",
    hours: "Du lundi au vendredi, 9h - 18h EST",
    quickLinksTitle: "Liens rapides",
    links: ["Réserver une demo", "Voir les tarifs", "Explorer les produits", "À propos de Sundae"],
    ctaTitle: "Prêt à voir ce qui vous échappe ?",
    ctaDescription: "Réservez une demo de 30 minutes pour parcourir vos donnees avec notre equipe et voir si Sundae vous serait utile.",
    ctaPrimary: "Reserver une demo",
    ctaSecondary: "Explorer les produits",
  },
  es: {
    metadataTitle: "Contáctanos",
    metadataDescription: "Ponte en contacto con el equipo de Sundae. Tanto si eres operador multi-local, franquiciado o grupo de hospitalidad, nos encantaría escuchar tus retos de datos.",
    badge: "Ponte en contacto",
    title: "Hablemos",
    description: "Tanto si estás descubriendo Sundae por primera vez como si ya estás listo para escalar, nos encantaría saber de ti.",
    formTitle: "Envíanos un mensaje",
    ctaLabel: "Enviar mensaje",
    defaultMessage: "Me gustaría ponerme en contacto sobre...",
    infoTitle: "Ponte en contacto",
    infoDescription: "Operadores multi-local, franquiciados y grupos de hospitalidad - trabajamos con equipos que quieren ver lo que sus datos realmente dicen.",
    emailLabel: "Correo electrónico",
    officesLabel: "Oficinas",
    responseLabel: "Tiempo de respuesta",
    responseNote: "Dentro de 2 horas en horario laboral",
    hours: "Lunes - viernes, 9 AM - 6 PM EST",
    quickLinksTitle: "Enlaces rápidos",
    links: ["Reservar una demo", "Ver precios", "Explorar productos", "Acerca de Sundae"],
    ctaTitle: "¿Listo para ver lo que te estás perdiendo?",
    ctaDescription: "Reserva una demo de 30 minutos para revisar tus datos con nuestro equipo y ver si Sundae puede ayudarte de verdad.",
    ctaPrimary: "Reservar una demo",
    ctaSecondary: "Explorar productos",
  },
} as const;

function getContactCopy(locale: WebsiteLocale) {
  return contactCopy[locale] ?? contactCopy.en;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getContactCopy(locale);
  return { title: copy.metadataTitle, description: copy.metadataDescription };
}

export default async function ContactPage() {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getContactCopy(locale);

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.badge} title={copy.title} description={copy.description} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeUp>
              <h2 className="section-h3 text-[var(--text-primary)] mb-6">{copy.formTitle}</h2>
              <LeadCaptureForm ctaLabel={copy.ctaLabel} defaultMessage={copy.defaultMessage} />
            </FadeUp>

            <FadeUp delay={0.15} className="space-y-8">
              <div>
                <h2 className="section-h3 text-[var(--text-primary)] mb-4">{copy.infoTitle}</h2>
                <p className="body-base text-[var(--text-supporting)]">{copy.infoDescription}</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name="support" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">{copy.emailLabel}</h3>
                    <p className="text-[var(--text-secondary)]">info@sundae.io</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{locale === "ar" ? "نرد عادة خلال ساعتين" : locale === "fr" ? "Réponse généralement sous 2 heures" : locale === "es" ? "Solemos responder en menos de 2 horas" : "We typically respond within 2 hours"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name="multiLocation" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">{copy.officesLabel}</h3>
                    <div className="flex gap-6 mt-1">
                      <div>
                        <p className="text-sm font-medium text-[var(--text-secondary)]">Dubai, UAE</p>
                        <p className="text-xs text-[var(--text-muted)]">Dubai Internet City</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-secondary)]">Toronto, Canada</p>
                        <p className="text-xs text-[var(--text-muted)]">King Street West</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name="time" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">{copy.responseLabel}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{copy.responseNote}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{copy.hours}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-[var(--border-default)] bg-[var(--navy-deep)]">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)] mb-3">{copy.quickLinksTitle}</p>
                <div className="space-y-2.5">
                  <Link href="/demo" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{copy.links[0]} &rarr;</Link>
                  <a href={PRICING_URL} className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{copy.links[1]} &rarr;</a>
                  <Link href="/product" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{copy.links[2]} &rarr;</Link>
                  <Link href="/about" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{copy.links[3]} &rarr;</Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <Link href="/demo"><Button variant="cta" size="lg">{copy.ctaPrimary}</Button></Link>
        <Link href="/product"><Button variant="outline-light" size="lg">{copy.ctaSecondary}</Button></Link>
      </PageCTA>
    </div>
  );
}
