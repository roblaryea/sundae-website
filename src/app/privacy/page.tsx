import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { SundaeIcon } from '@/components/icons';

export default function PrivacyPage() {
  const lastUpdated = "December 10, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="owners" size="md" />
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
                  <strong>Sundae Technologies Inc.</strong>, a company incorporated in Delaware, United States, trading as &ldquo;Sundae&rdquo; and operating the domains sundae.io, sundaetech.ai, sundaetech.io, and sundaetechnologies.com (&ldquo;Sundae&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), is committed to protecting your privacy and ensuring the security of your personal information. Sundae Technologies Inc. may provide services directly or through authorized affiliates, resellers, or regional partners.
                </p>
                <p className="text-gray-700 mb-4">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Visit or use our websites,</li>
                  <li>Use our AI-powered decision-intelligence platform and related products (including Sundae Report), and</li>
                  <li>Interact with us in connection with those services (together, the "Services").</li>
                </ul>
                <p className="text-gray-700 mt-4 mb-4">
                  By using the Services, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree, you should not use the Services.
                </p>
                <p className="text-gray-700">
                  This Privacy Policy should be read together with our Terms of Service, which describe the contractual relationship between you and Sundae and define concepts such as Customer Data, Aggregated Data, and Benchmark Data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect different types of information depending on how you interact with us and which parts of the Services you use.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide to Us</h3>
                <p className="text-gray-700 mb-4">
                  We collect information that you voluntarily provide to us, for example when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Create an account or register for our Services</li>
                  <li>Complete an onboarding or integration process</li>
                  <li>Contact us directly or request customer support</li>
                  <li>Participate in surveys, promotions, or events</li>
                  <li>Provide feedback, testimonials, or respond to product research</li>
                  <li>Connect third-party services (such as POS, HR, payroll, accounting, or CRM systems) to our platform</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  This information may include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Contact details:</strong> name, email address, phone number</li>
                  <li><strong>Professional details:</strong> company name, job title, role, industry segment</li>
                  <li><strong>Account details:</strong> username, password, preferences, communication settings</li>
                  <li><strong>Communications:</strong> messages you send us, feedback, support requests</li>
                  <li>Any other information you choose to provide.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Restaurant and Business Data (Customer Data)</h3>
                <p className="text-gray-700 mb-4">
                  As part of our Services for restaurants and hospitality businesses, we collect and process business and operational data that you or your organization provide or connect to the platform ("Customer Data").
                </p>
                <p className="text-gray-700 mb-4">
                  This may include, without limitation:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Sales and transaction data from POS systems (e.g., items sold, transaction amounts, timestamps, payment methods, discounts, promotions)</li>
                  <li>Operational metrics (e.g., covers, table turns, occupancy, average check, service times)</li>
                  <li>Inventory and supply chain data (e.g., stock levels, ordering data, cost of goods sold)</li>
                  <li>Employee and workforce data (e.g., shift schedules, roles, performance metrics, anonymized identifiers; we advise you not to upload unnecessary sensitive personal data)</li>
                  <li>Financial and accounting data (e.g., revenue figures, high-level P&L metrics)</li>
                  <li>Customer interaction data (e.g., feedback, ratings, reviews, loyalty behavior, where provided or integrated by you).</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Much of this data will relate to your business, but some may contain personal information about your employees, contractors, or customers. Where you provide such data, you are responsible for ensuring that you have an appropriate legal basis to do so and that any required notices have been given.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Automatically Collected Information</h3>
                <p className="text-gray-700 mb-4">
                  When you access or use the Services, we automatically collect certain information about your device and usage ("Usage Data"), such as:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Device information:</strong> IP address, browser type, device type, operating system</li>
                  <li><strong>Usage data:</strong> pages or screens viewed, features used, time and date of visits, time spent, clicks and interactions</li>
                  <li><strong>Log data:</strong> access logs, error reports, performance and diagnostic data</li>
                  <li><strong>Approximate location information:</strong> derived from your IP address or device settings (where permitted by law and with your consent where required)</li>
                  <li><strong>Cookies and similar technologies:</strong> identifiers, session information, and preferences (see Section 9 below).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>To provide and operate the Services</strong><br />Setting up and managing accounts<br />Providing dashboards, analytics, and AI-powered insights<br />Integrating with your POS and other systems</li>
                  <li><strong>To process and analyze your data</strong><br />Processing Customer Data to generate reports, KPIs, alerts, and recommendations<br />Creating comparative and benchmarking analytics (including Sundae Report) using Aggregated Data and Benchmark Data</li>
                  <li><strong>To improve and develop the Services</strong><br />Monitoring performance and usage patterns<br />Debugging, troubleshooting, and enhancing features<br />Training and tuning our models using Aggregated Data that does not identify individuals or your business</li>
                  <li><strong>To personalize your experience</strong><br />Remembering your settings and preferences<br />Tailoring content, features, and communications to your context</li>
                  <li><strong>To communicate with you</strong><br />Sending service-related announcements, updates, and security alerts<br />Responding to your requests and inquiries<br />Providing onboarding and customer success support<br />Sending you information about new features, offers, and events (you can opt out of marketing at any time)</li>
                  <li><strong>To ensure security and prevent misuse</strong><br />Detecting, investigating, and preventing fraud, abuse, and security incidents<br />Enforcing our Terms of Service and other policies</li>
                  <li><strong>To comply with legal obligations</strong><br />Responding to lawful requests and legal processes<br />Maintaining records as required by law<br />Complying with data protection, tax, and other regulatory requirements</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  For users in the EEA/UK or other regions requiring a lawful basis, we generally rely on:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Performance of a contract (to provide and support the Services),</li>
                  <li>Legitimate interests (to improve and secure the Services, perform analytics, and communicate with you about relevant features),</li>
                  <li>Consent (for certain marketing communications, cookies, and where required for specific processing), and</li>
                  <li>Legal obligations (where we must retain or disclose data).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell your personal information to third parties.
                </p>
                <p className="text-gray-700 mb-4">
                  We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 With Your Consent or Direction</h3>
                <p className="text-gray-700 mb-4">
                  We may share your information when you explicitly consent to it or direct us to do so, for example when:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>You authorize us to connect with third-party services (POS, HR, accounting, or other integrations), or</li>
                  <li>You share specific reports or outputs with third parties (e.g., business partners, advisors).</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Service Providers (Processors)</h3>
                <p className="text-gray-700 mb-4">
                  We use trusted third-party service providers who perform services on our behalf, such as:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Cloud hosting and infrastructure</li>
                  <li>Data storage and backup</li>
                  <li>Payment processing</li>
                  <li>Customer support and communication tooling</li>
                  <li>Analytics, logging, and monitoring</li>
                  <li>Security and fraud prevention services</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  These providers are contractually obligated to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use the information only to provide services to us, and</li>
                  <li>Protect your information with appropriate technical and organizational measures.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.3 Aggregated and Benchmark Data</h3>
                <p className="text-gray-700 mb-4">
                  We may share Aggregated Data and Benchmark Data derived from Customer Data and Usage Data in a form that does not identify you or any individual. This may include industry reports, anonymized benchmarks, and performance insights across segments or geographies.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.4 Legal Requirements and Protection of Rights</h3>
                <p className="text-gray-700 mb-4">
                  We may disclose your information if we believe it is necessary to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Comply with applicable law, regulation, legal process, or governmental request</li>
                  <li>Protect the rights, property, or safety of Sundae, our users, or the public</li>
                  <li>Enforce our agreements, including the Terms of Service</li>
                  <li>Detect, prevent, or address fraud, security, or technical issues</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.5 Business Transfers</h3>
                <p className="text-gray-700">
                  If Sundae Technologies Inc. or any of its affiliates is involved in a merger, acquisition, financing, reorganization, or sale of all or part of its business or assets, your information may be transferred as part of that transaction. We will take reasonable steps to ensure that the recipient honors this Privacy Policy or a substantially similar policy and, where required by law, we will notify you of such changes.
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
                  We retain your information for as long as reasonably necessary to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide and support the Services</li>
                  <li>Fulfill the purposes described in this Privacy Policy</li>
                  <li>Comply with our legal and regulatory obligations</li>
                  <li>Resolve disputes and enforce our agreements</li>
                  <li>Maintain appropriate business and financial records</li>
                </ul>
                <p className="text-gray-700 mt-4 mb-4">
                  When you close your account, we will delete or anonymize your personal information within a reasonable period (typically within 90 days), except where retention is necessary for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Compliance with legal or regulatory obligations</li>
                  <li>Fraud prevention and security incident logs</li>
                  <li>Pending or potential disputes</li>
                  <li>Backup and disaster recovery (where data will be securely stored and then deleted in line with our retention cycles)</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Aggregated Data and Benchmark Data that no longer identifies you or any individual may be retained and used indefinitely for legitimate business purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
                <p className="text-gray-700 mb-4">
                  Depending on your location and applicable law, you may have some or all of the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> Request that we correct or update inaccurate or incomplete information.</li>
                  <li><strong>Deletion:</strong> Request that we delete your personal information, subject to certain exceptions.</li>
                  <li><strong>Restriction:</strong> Request that we restrict our processing of your information in certain circumstances.</li>
                  <li><strong>Portability:</strong> Request a structured, commonly used, machine-readable copy of certain information and request that we transfer it to another controller where technically feasible.</li>
                  <li><strong>Objection:</strong> Object to certain processing based on our legitimate interests, including profiling.</li>
                  <li><strong>Marketing:</strong> Opt out of direct marketing communications at any time (for example, via the "unsubscribe" link in our emails).</li>
                </ul>
                <p className="text-gray-700 mt-4 mb-4">
                  To exercise these rights, please contact us at <a href="mailto:privacy@sundae.io" className="text-blue-600 hover:underline">privacy@sundae.io</a>. We will respond in accordance with applicable data protection laws and may need to verify your identity before fulfilling your request.
                </p>
                <p className="text-gray-700">
                  You may also have the right to lodge a complaint with your local data protection authority. We encourage you to contact us first so we can attempt to resolve your concerns.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Sundae is headquartered in the United States and may process information in the US and in other countries where we or our service providers operate. This means your information may be transferred to, stored, and processed outside your country of residence, including in countries that may not provide the same level of data protection as your home jurisdiction.
                </p>
                <p className="text-gray-700 mb-4">
                  Where required by law (for example, for users in the European Economic Area (EEA), United Kingdom, or other regions with data transfer restrictions), we implement appropriate safeguards for cross-border transfers, such as:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Standard Contractual Clauses approved by the European Commission or other competent authorities;</li>
                  <li>Reliance on adequacy decisions where available; and/or</li>
                  <li>Other lawful transfer mechanisms permitted under applicable data protection laws.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can contact us for more information about the safeguards we use for international transfers relevant to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies (such as web beacons and pixels) to collect and store certain information when you use our Services.
                </p>
                <p className="text-gray-700 mb-4">
                  Cookies may be:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Essential cookies:</strong> Required for core site functionality, authentication, and security.</li>
                  <li><strong>Analytics cookies:</strong> Helping us understand how the Services are used so we can improve them.</li>
                  <li><strong>Preference cookies:</strong> Remembering your settings and choices.</li>
                  <li><strong>Marketing cookies:</strong> Used to deliver relevant content and measure the effectiveness of campaigns.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can control cookies through your browser settings, and some jurisdictions may require or allow you to manage cookie preferences via a dedicated consent banner. If you choose to disable certain cookies, some features of the Services may not function properly.
                </p>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Region-Specific Information</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">12.1 California Privacy Rights (CCPA/CPRA)</h3>
                <p className="text-gray-700 mb-4">
                  If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), as amended by the CPRA, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The right to know the categories of personal information collected and the purposes for which it is used;</li>
                  <li>The right to know whether personal information is sold or shared;</li>
                  <li>The right to access and, in some cases, request deletion of your personal information;</li>
                  <li>The right to opt out of certain "sales" or "sharing" of personal information (where applicable);</li>
                  <li>The right to non-discrimination for exercising your privacy rights.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Sundae does not sell personal information as that term is generally defined under the CCPA. To exercise your California rights, you may contact us at <a href="mailto:privacy@sundae.io" className="text-blue-600 hover:underline">privacy@sundae.io</a>.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">12.2 EEA/UK – GDPR</h3>
                <p className="text-gray-700 mb-4">
                  If you are in the EEA or UK, the General Data Protection Regulation (GDPR) and UK GDPR give you the rights described in Section 7, and require us to describe our lawful bases for processing, which we have summarized in Section 3 (contract, legitimate interests, consent, legal obligations).
                </p>
                <p className="text-gray-700">
                  If you believe our processing of your personal information infringes applicable law, you have the right to lodge a complaint with your local supervisory authority. We would, however, appreciate the chance to deal with your concerns first.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">12.3 Other Regions</h3>
                <p className="text-gray-700">
                  For users located in other regions, Sundae Technologies Inc. may provide services through authorized affiliates or regional partners. We process personal information in accordance with applicable local data protection laws. Our primary contact point for privacy matters is listed in Section 14.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or for other operational reasons.
                </p>
                <p className="text-gray-700 mb-4">
                  When we make material changes, we will take reasonable steps to notify you, such as by:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Posting the updated Privacy Policy on this page, and/or</li>
                  <li>Providing notice within the Services or by email.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  The "Last updated" date at the top of this Privacy Policy indicates when it was last revised. Your continued use of the Services after any changes become effective will signify your acceptance of the updated Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Sundae Technologies Inc.</strong><br />
                    1007 N Orange St, 4th Floor, Suite 1382<br />
                    Wilmington, DE 19801, United States<br />
                    Email: <a href="mailto:privacy@sundae.io" className="text-blue-600 hover:underline">privacy@sundae.io</a>
                  </p>
                </div>
                <p className="text-gray-700 mt-4">
                  If you contact us with a privacy request or concern, we will take reasonable steps to respond within the timeframes required by applicable law.
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
                <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"><SundaeIcon name="support" size="lg" className="text-white" /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <a href="mailto:privacy@sundae.io" className="text-blue-600 hover:underline">
                  privacy@sundae.io
                </a>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"><SundaeIcon name="support" size="lg" className="text-white" /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <a href="tel:+97145017308" className="text-blue-600 hover:underline">
                  +971 (4) 501-7308
                </a>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"><SundaeIcon name="multiLocation" size="lg" className="text-white" /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm">
                  1007 N Orange St<br />
                  4th Floor, Suite 1382<br />
                  Wilmington, DE 19801<br />
                  United States
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
