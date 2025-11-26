'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    restaurantCount: '',
    locations: '',
    challenges: '',
    goals: '',
    timeline: '',
    budget: ''
  });

  const totalSteps = 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Demo request submitted successfully! We\'ll contact you within 24 hours.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company/Restaurant Group *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Title/Role *</label>
              <select
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your role</option>
                <option value="owner">Owner</option>
                <option value="ceo">CEO/President</option>
                <option value="coo">COO</option>
                <option value="cfo">CFO</option>
                <option value="operations">Operations Director</option>
                <option value="it">IT Director</option>
                <option value="manager">General Manager</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Restaurant Concepts *</label>
              <select
                name="restaurantCount"
                value={formData.restaurantCount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select number</option>
                <option value="1">1 concept</option>
                <option value="2-5">2-5 concepts</option>
                <option value="6-10">6-10 concepts</option>
                <option value="11-25">11-25 concepts</option>
                <option value="25+">25+ concepts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Number of Locations *</label>
              <select
                name="locations"
                value={formData.locations}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select number</option>
                <option value="1">1 location</option>
                <option value="2-5">2-5 locations</option>
                <option value="6-10">6-10 locations</option>
                <option value="11-25">11-25 locations</option>
                <option value="26-50">26-50 locations</option>
                <option value="51-100">51-100 locations</option>
                <option value="100+">100+ locations</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Challenges</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What are your biggest operational challenges? *</label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., High labor costs, inconsistent training, lack of real-time insights..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What are your primary goals for implementing restaurant intelligence? *</label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Reduce costs, improve efficiency, better decision making..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Implementation Timeline</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select timeline</option>
                <option value="immediate">Immediately</option>
                <option value="1-3months">1-3 months</option>
                <option value="3-6months">3-6 months</option>
                <option value="6-12months">6-12 months</option>
                <option value="just-looking">Just looking</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Final Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (Optional)</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="under-1k">Under $1,000/month</option>
                <option value="1k-5k">$1,000 - $5,000/month</option>
                <option value="5k-10k">$5,000 - $10,000/month</option>
                <option value="10k-25k">$10,000 - $25,000/month</option>
                <option value="25k+">$25,000+/month</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• We'll review your information within 24 hours</li>
                <li>• Schedule a personalized demo based on your needs</li>
                <li>• Provide a custom implementation plan</li>
                <li>• Answer any questions you have about Sundae</li>
              </ul>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                I'd like to receive updates about restaurant intelligence and industry trends
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Book Your Demo
              </CardTitle>
              <CardDescription className="text-gray-600">
                Tell us about your restaurant group and we'll customize a demo just for you
              </CardDescription>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
                  <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderStep()}
                
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6"
                  >
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={nextStep}
                      className="px-6"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      className="px-6"
                    >
                      Submit Demo Request
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
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
