import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';
import { SundaeIcon } from '@/components/icons';
import { PRICING_URL } from '@/lib/links';
import { PageHero, FadeUp, PageCTA } from '@/components/ui/PageAnimations';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <PageHero
        badge="Get in Touch"
        title="Let's Talk"
        description="Whether you're exploring Sundae for the first time or ready to scale, we'd love to hear from you."
      />

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <FadeUp>
              <h2 className="section-h3 text-[var(--text-primary)] mb-6">Send us a message</h2>
              <LeadCaptureForm
                ctaLabel="Send Message"
                defaultMessage="I'd like to get in touch about..."
              />
            </FadeUp>

            {/* Contact Information */}
            <FadeUp delay={0.15} className="space-y-8">
              <div>
                <h2 className="section-h3 text-[var(--text-primary)] mb-4">Get in touch</h2>
                <p className="body-base text-[var(--text-supporting)]">
                  Multi-unit operators, franchise owners, hospitality groups — we work with teams who want to see what their data is actually telling them.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name="support" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">Email</h3>
                    <p className="text-[var(--text-secondary)]">info@sundae.io</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">We typically respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name="multiLocation" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">Offices</h3>
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
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">Response Time</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Within 2 hours during business hours</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Monday – Friday, 9 AM – 6 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-5 rounded-xl border border-[var(--border-default)] bg-[var(--navy-deep)]">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)] mb-3">Quick Links</p>
                <div className="space-y-2.5">
                  <Link href="/demo" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Book a Demo &rarr;
                  </Link>
                  <a href={PRICING_URL} className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    View Pricing &rarr;
                  </a>
                  <Link href="/product" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Explore Products &rarr;
                  </Link>
                  <Link href="/about" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    About Sundae &rarr;
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA
        title="Ready to See What You're Missing?"
        description="Book a 30-minute demo with your own data. No slides, no sales pressure."
      >
        <Link href="/demo">
          <Button variant="cta" size="lg">
            Book a Demo
          </Button>
        </Link>
        <Link href="/product">
          <Button variant="outline-light" size="lg">
            Explore Products
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
