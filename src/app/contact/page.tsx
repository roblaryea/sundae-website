import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';
import { PRICING_URL } from '@/lib/links';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Contact Sundae
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Ready to transform your restaurant operations? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
              <LeadCaptureForm 
                ctaLabel="Contact Us"
                defaultMessage="I'd like to get in touch about..."
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in touch</h2>
                <p className="text-gray-600 mb-8">
                  Whether you're a multi-unit operator, franchise owner, or hospitality group, 
                  we're here to help you make better decisions with your data.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">info@sundae.io</p>
                    <p className="text-sm text-gray-500">We typically respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Our Offices</h3>
                    <div className="space-y-2 text-gray-600">
                      <div>
                        <p className="font-medium">Dubai, UAE</p>
                        <p className="text-sm">Dubai Internet City</p>
                      </div>
                      <div>
                        <p className="font-medium">Toronto, Canada</p>
                        <p className="text-sm">King Street West</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">🕐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                    <p className="text-gray-600">Within 2 hours during business hours</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-gray-900">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/demo" className="block text-blue-600 hover:text-blue-700">
                    Book a Demo →
                  </Link>
                  <a href={PRICING_URL} className="block text-blue-600 hover:text-blue-700">
                    View Pricing →
                  </a>
                  <Link href="/report" className="block text-blue-600 hover:text-blue-700">
                    Get Free Report →
                  </Link>
                  <Link href="/about" className="block text-blue-600 hover:text-blue-700">
                    About Sundae →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to See Sundae in Action?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            See how restaurant operators use Sundae for Decision Intelligence.
            Book your demo today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="secondary" size="lg">
                Book Demo Now
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
