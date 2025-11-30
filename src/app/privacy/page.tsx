import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function PrivacyPage() {
  const lastUpdated = "November 23, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🔒</span>
              <span>Privacy</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
+                  </svg>
+                </div>
+                <div className="ml-3">
+                  <p className="text-sm text-blue-700">
+                    <strong>Your Privacy Matters:</strong> We're committed to protecting your personal information and being transparent about how we collect, use, and share your data.
+                  </p>
+                </div>
+              </div>
+            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Sundae.io. ("Sundae," "we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered decision intelligence platform for restaurants and hospitality businesses.
                </p>
                <p className="text-gray-700">
                  By using our Services, you agree to the collection and use of information in accordance with this Privacy Policy. This policy applies to all information collected through our website, mobile applications, and any related services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide to Us</h3>
                <p className="text-gray-700 mb-4">
                  We collect information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Create an account or register for our services</li>
                  <li>Contact us directly or request customer support</li>
                  <li>Participate in surveys, promotions, or events</li>
                  <li>Provide feedback or testimonials</li>
                  <li>Connect third-party services to our platform</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  This information may include your name, email address, phone number, company information, job title, and any other information you choose to provide.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Restaurant and Business Data</h3>
                <p className="text-gray-700 mb-4">
                  As part of our services, we collect and process business data from your restaurant operations, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Sales and transaction data from POS systems</li>
                  <li>Employee and payroll information</li>
                  <li>Inventory and supply chain data</li>
                  <li>Customer feedback and reviews</li>
                  <li>Operational metrics and performance indicators</li>
                  <li>Financial and accounting data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Automatically Collected Information</h3>
                <p className="text-gray-700 mb-4">
                  When you access or use our Services, we automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, features used, time spent)</li>
                  <li>Log data (access times, error reports, diagnostic data)</li>
                  <li>Location information (with your consent)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Process and analyze your restaurant data to generate insights</li>
                  <li>Deliver AI-powered recommendations and predictions</li>
                  <li>Create benchmarking reports and analytics</li>
                  <li>Personalize your experience and customize features</li>
                  <li>Communicate with you about updates, features, and services</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues or security threats</li>
                  <li>Comply with legal obligations and enforce our agreements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell your personal information to third parties. We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 With Your Consent</h3>
                <p className="text-gray-700 mb-4">
                  We may share your information when you explicitly consent to such sharing, such as when you authorize us to connect with third-party services or share insights with business partners.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Service Providers</h3>
                <p className="text-gray-700 mb-4">
                  We may share your information with trusted third-party service providers who assist us in operating our business, such as:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Cloud hosting and infrastructure providers</li>
                  <li>Payment processing services</li>
                  <li>Customer support and communication tools</li>
                  <li>Analytics and data processing services</li>
                  <li>Security and fraud prevention services</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  These providers are contractually obligated to protect your information and use it only for the purposes for which it was disclosed.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.3 Legal Requirements</h3>
                <p className="text-gray-700 mb-4">
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities, such as to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Comply with a subpoena, court order, or other legal process</li>
                  <li>Protect our rights, property, or safety, or that of our users</li>
                  <li>Investigate or prevent fraud or illegal activities</li>
                  <li>Respond to government or regulatory requests</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.4 Business Transfers</h3>
                <p className="text-gray-700">
                  If Sundae is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure data storage and backup procedures</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Regular security assessments and monitoring</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Despite our efforts, no security measures are perfect or impenetrable. We cannot guarantee the absolute security of your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  We retain your information for as long as necessary to provide our Services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
                <p className="text-gray-700 mb-4">
                  When you close your account, we will delete or anonymize your personal information within 90 days, except where retention is necessary for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Compliance with legal obligations</li>
                  <li>Resolution of disputes or enforcement of agreements</li>
                  <li>Fraud prevention and security purposes</li>
                  <li>Backup and disaster recovery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
                <p className="text-gray-700 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your information to another service</li>
                  <li><strong>Opt-out:</strong> Opt out of certain uses of your information</li>
                  <li><strong>Restriction:</strong> Restrict processing of your information</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, please contact us at privacy@sundae.ai. We will respond to your request within the timeframes required by applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information may be transferred to and maintained on servers located outside of your jurisdiction. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
                <p className="text-gray-700">
                  If you are located in the European Economic Area (EEA) or other regions with data protection laws, we will ensure that your information receives an adequate level of protection through:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Standard contractual clauses approved by the European Commission</li>
                  <li>Adequacy decisions for certain countries</li>
                  <li>Binding corporate rules where applicable</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
                </p>
                <p className="text-gray-700 mb-4">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
                </p>
                <p className="text-gray-700">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies to deliver relevant content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links and Services</h2>
                <p className="text-gray-700 mb-4">
                  Our Services may contain links to third-party websites or services that are not owned or controlled by Sundae. We are not responsible for the privacy practices of these third parties.
                </p>
                <p className="text-gray-700">
                  We recommend that you review the privacy policies of any third-party services you access through our platform. This Privacy Policy applies only to information collected by Sundae.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
                <p className="text-gray-700">
                  If we become aware that we have collected personal information from children under 13 without verification of parental consent, we will take steps to remove that information from our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
                </p>
                <p className="text-gray-700">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Sundae, Inc.</strong><br />
                    Email: <a href="mailto:privacy@sundae.ai" className="text-blue-600 hover:underline">privacy@sundae.ai</a><br />
                    Address: 123 Innovation Drive, Suite 400, Wilmington, DE 19801<br />
                    Phone: +1 (555) 123-4567
                  </p>
                </div>
                <p className="text-gray-700 mt-4">
                  You may also contact our Data Protection Officer at dpo@sundae.ai for privacy-related inquiries.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. California Privacy Rights</h2>
                <p className="text-gray-700 mb-4">
                  California residents have additional rights under the California Consumer Privacy Act (CCPA), including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The right to know what personal information is collected</li>
                  <li>The right to know whether personal information is sold or disclosed</li>
                  <li>The right to say no to the sale of personal information</li>
                  <li>The right to access their personal information</li>
                  <li>The right to equal service and price</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, California residents can contact us at privacy@sundae.ai or call +1 (555) 123-4567.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. GDPR Compliance</h2>
                <p className="text-gray-700 mb-4">
                  For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). This includes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Lawful basis for processing personal data</li>
                  <li>Data subject rights (access, rectification, erasure, restriction, portability)</li>
                  <li>Data protection by design and by default</li>
                  <li>Appointment of a Data Protection Officer</li>
                  <li>Record of processing activities</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Our lawful bases for processing include consent, contract performance, legitimate interests, and legal obligations.
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
            Questions About Your Privacy?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            If you have any questions or concerns about this Privacy Policy, please don't hesitate to contact us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <a href="mailto:privacy@sundae.ai" className="text-blue-600 hover:underline">
                  privacy@sundae.ai
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
            <Link href="/terms">
              <Button variant="outline">
                Terms of Service
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="primary">
                Contact Privacy Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
