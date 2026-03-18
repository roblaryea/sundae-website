import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';
import { SundaeIcon } from '@/components/icons';
import { PRICING_URL } from '@/lib/links';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-h1 text-gray-900 mb-6">
            Let&apos;s Talk
          </h1>
          <p className="body-xl text-gray-600 max-w-3xl mx-auto">
            Whether you&apos;re evaluating Sundae for your group, have a technical question, or need help with an existing account — we&apos;re here.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="section-h3 text-gray-900 mb-6">Send us a message</h2>
              <LeadCaptureForm
                ctaLabel="Send Message"
                defaultMessage="I'd like to get in touch about..."
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="section-h3 text-gray-900 mb-4">Get in touch</h2>
                <p className="body-base text-gray-600">
                  Multi-unit operators, franchise owners, hospitality groups — we work with teams who want to see what their data is actually telling them.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name="support" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Email</h3>
                    <p className="text-gray-700">info@sundae.io</p>
                    <p className="text-xs text-gray-500 mt-1">We typically respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name="multiLocation" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Offices</h3>
                    <div className="flex gap-6 mt-1">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Dubai, UAE</p>
                        <p className="text-xs text-gray-500">Dubai Internet City</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Toronto, Canada</p>
                        <p className="text-xs text-gray-500">King Street West</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name="time" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Response Time</h3>
                    <p className="text-sm text-gray-700">Within 2 hours during business hours</p>
                    <p className="text-xs text-gray-500 mt-1">Monday – Friday, 9 AM – 6 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-3">Quick Links</p>
                <div className="space-y-2.5">
                  <Link href="/demo" className="block text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    Book a Demo &rarr;
                  </Link>
                  <a href={PRICING_URL} className="block text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    View Pricing &rarr;
                  </a>
                  <Link href="/report" className="block text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    Get Free Report &rarr;
                  </Link>
                  <Link href="/about" className="block text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    About Sundae &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Ready to See What You&apos;re Missing?
          </h2>
          <p className="body-xl mb-8 text-slate-300">
            Book a 30-minute demo with your own data. No slides, no sales pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Book a Demo
              </Button>
            </Link>
            <Link href="/report">
              <Button variant="outline-light" size="lg">
                Get Free Report
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
