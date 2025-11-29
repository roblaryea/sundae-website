import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';

export default function DemoPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🎯</span>
              <span>Personalized Demo</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              See Sundae in
              <br />
              <span className="text-blue-600">Action</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get a personalized demo tailored to your restaurant group's specific needs. 
              See how Sundae can help you make smarter, faster decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Form */}
      <section id="demo-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Book Your Demo
            </h2>
            <p className="text-lg text-gray-600">
              Tell us about your restaurant group and we'll customize a demo just for you
            </p>
          </div>
          
          <LeadCaptureForm 
            ctaLabel="Book a Demo"
            defaultMessage="I'm interested in seeing how Sundae can help my restaurant operations."
          />
        </div>
      </section>

      {/* Demo Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What to Expect
            </h2>
            <p className="text-xl text-gray-600">
              Your personalized demo will include
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Live Product Walkthrough",
                description: "See all 6 AI modules in action with real restaurant data",
                icon: "🎬",
                details: ["Scout integration demo", "Canvas visualization", "Pulse anomaly detection", "Forge conversational AI"]
              },
              {
                title: "Custom Use Cases",
                description: "We'll show you exactly how Sundae solves your specific challenges",
                icon: "🎯",
                details: ["Your operational pain points", "Relevant success stories", "ROI projections", "Implementation roadmap"]
              },
              {
                title: "Q&A Session",
                description: "Get all your questions answered by our restaurant intelligence experts",
                icon: "💬",
                details: ["Technical questions", "Pricing and plans", "Integration process", "Support and training"]
              }
            ].map((benefit, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{benefit.icon}</div>
                    <CardTitle className="text-gray-900">{benefit.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-center">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefit.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-600 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Operators Say
            </h2>
            <p className="text-xl text-gray-600">
              About their Sundae demo experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "COO, 85-location group",
                quote: "The demo showed us exactly how we could reduce labor costs by 18%. We implemented Sundae across all locations and saw results within the first month.",
                company: "Multi-concept Restaurant Group"
              },
              {
                name: "Marcus Rodriguez",
                role: "Operations Director",
                quote: "I was skeptical about AI, but the demo convinced me. Seeing our data come to life and getting actionable insights was game-changing.",
                company: "Regional Restaurant Chain"
              },
              {
                name: "Jennifer Kim",
                role: "VP of Operations",
                quote: "The personalized demo addressed our specific challenges. The team really understood the restaurant industry and our pain points.",
                company: "Fast-Casual Franchise"
              }
            ].map((testimonial, index) => (
              <Card key={index} variant="elevated">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to See Sundae in Action?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a personalized demo and see how restaurant intelligence can transform your operations. 
            No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#demo-form" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                Book Your Demo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
          
          <p className="text-sm opacity-75 mt-6">
            Demos typically last 30-45 minutes • Available within 24 hours • No sales pressure
          </p>
        </div>
      </section>
    </div>
  );
}
