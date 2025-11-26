import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function TermsPage() {
  const lastUpdated = "November 23, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>📋</span>
              <span>Legal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important:</strong> By accessing or using Sundae's services, you agree to be bound by these Terms of Service. Please read them carefully.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using Sundae's website, services, and applications (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
                </p>
                <p className="text-gray-700">
                  These Terms apply to all visitors, users, and others who access or use the Services. By using the Services, you agree to be bound by these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
                <p className="text-gray-700 mb-4">
                  Sundae provides AI-powered decision intelligence software for restaurants and hospitality businesses. Our Services include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Data integration and analytics platform</li>
                  <li>AI-powered insights and recommendations</li>
                  <li>Benchmarking and performance analytics</li>
                  <li>Multi-agent AI system for restaurant operations</li>
                  <li>Real-time monitoring and alerting</li>
                  <li>Custom dashboards and reporting</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Account Creation</h3>
                <p className="text-gray-700 mb-4">
                  To access certain features of the Services, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Account Security</h3>
                <p className="text-gray-700 mb-4">
                  You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Use of Services</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Permitted Use</h3>
                <p className="text-gray-700 mb-4">
                  You may use the Services only in compliance with these Terms and all applicable laws and regulations. You agree not to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use the Services for any unlawful purpose</li>
                  <li>Interfere with or disrupt the Services or servers</li>
                  <li>Attempt to gain unauthorized access to any portion of the Services</li>
                  <li>Upload or transmit any viruses, malware, or harmful code</li>
                  <li>Use the Services to compete with Sundae or for competitive analysis</li>
                  <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Data Usage</h3>
                <p className="text-gray-700 mb-4">
                  You retain all rights to your data. By using the Services, you grant Sundae a non-exclusive, worldwide, royalty-free license to use, store, process, and display your data solely for the purpose of providing the Services to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  The Services and their original content, features, and functionality are owned by Sundae and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-gray-700">
                  Sundae retains all rights, title, and interest in and to the Services, including all related intellectual property rights. You may not remove, alter, or obscure any proprietary notices from the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment and Billing</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Fees</h3>
                <p className="text-gray-700 mb-4">
                  Access to certain features of the Services may require payment of fees. All fees are quoted in U.S. Dollars unless otherwise specified. You are responsible for paying all fees and applicable taxes associated with your use of the Services.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Billing Cycle</h3>
                <p className="text-gray-700 mb-4">
                  The Services are billed on a subscription basis. Billing cycles are typically monthly or annual, depending on your selected plan. Your subscription will automatically renew at the end of each billing cycle unless you cancel your subscription.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Cancellation</h3>
                <p className="text-gray-700">
                  You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing cycle. No refunds will be provided for partial billing cycles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
                <p className="text-gray-700 mb-4">
                  Your use of the Services is also governed by our Privacy Policy. Please review our Privacy Policy, which explains our practices concerning the collection, use, and disclosure of your information.
                </p>
                <p className="text-gray-700">
                  We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-gray-700 mb-4">
                  THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. SUNDAE EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-gray-700">
                  SUNDAE MAKES NO WARRANTY THAT (I) THE SERVICES WILL MEET YOUR REQUIREMENTS, (II) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SUNDAE, ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Your access to or use of or inability to access or use the Services</li>
                  <li>Any conduct or content of any third party on the Services</li>
                  <li>Any content obtained from the Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  In no event shall the aggregate liability of Sundae exceed the greater of (i) the amount you paid to Sundae in the 12 months prior to the action giving rise to the liability, or (ii) $100.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
                <p className="text-gray-700">
                  You agree to defend, indemnify, and hold harmless Sundae and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of: (a) your use and access of the Services, by you or any person using your account and password; (b) a breach of these Terms, or (c) Content posted on the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
                <p className="text-gray-700">
                  If you wish to terminate your account, you may simply discontinue using the Services. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-gray-700 mt-4">
                  By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Sundae, Inc.</strong><br />
                    Email: <a href="mailto:legal@sundae.ai" className="text-blue-600 hover:underline">legal@sundae.ai</a><br />
                    Address: 123 Innovation Drive, Suite 400, Wilmington, DE 19801<br />
                    Phone: +1 (555) 123-4567
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
                <p className="text-gray-700">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect and enforceable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Entire Agreement</h2>
                <p className="text-gray-700">
                  These Terms constitute the entire agreement between you and Sundae regarding the use of the Services, and supersede and replace any prior agreements we might have between us regarding the Services.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            If you have any questions or concerns about these Terms of Service, please don't hesitate to contact us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <a href="mailto:legal@sundae.ai" className="text-blue-600 hover:underline">
                  legal@sundae.ai
                </a>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <a href="tel:+15551234567" className="text-blue-600 hover:underline">
                  +1 (555) 123-4567
                </a>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm">
                  123 Innovation Drive<br />
                  Suite 400<br />
                  Wilmington, DE 19801
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/privacy">
              <Button variant="outline">
                Privacy Policy
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="primary">
                Contact Legal Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
