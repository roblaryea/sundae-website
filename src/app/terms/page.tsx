import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { SundaeIcon } from '@/components/icons';

export default function TermsPage() {
  const lastUpdated = "December 10, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="document" size="md" />
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction & Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  These Terms of Service (the "Terms") govern your access to and use of the Sundae websites, applications, platforms, and related products (collectively, the "Services"), including the Sundae Report benchmarking and analytics module.
                </p>
                <p className="text-gray-700 mb-4">
                  These Terms form a legally binding agreement between <strong>Sundae Technologies Inc.</strong>, a company incorporated in Delaware, United States, trading as &ldquo;Sundae&rdquo; and operating the domains sundae.io, sundaetech.ai, sundaetech.io, and sundaetechnologies.com (referred to as &ldquo;<strong>Sundae</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;, or &ldquo;<strong>our</strong>&rdquo;), and the entity or individual accepting these Terms (the &ldquo;<strong>Customer</strong>&rdquo;, &ldquo;<strong>you</strong>&rdquo;, or &ldquo;<strong>your</strong>&rdquo;). Sundae Technologies Inc. may provide services directly or through authorized affiliates, resellers, or regional partners.
                </p>
                <p className="text-gray-700 mb-4">
                  By accessing or using the Services, or by clicking "I Agree" (or similar), you agree on behalf of yourself and, if applicable, the entity you represent, to be bound by these Terms. If you do not accept these Terms you must not access or use these Services.
                </p>
                <p className="text-gray-700 mb-4">
                  If you are accepting these Terms on behalf of a company or other legal entity, you represent and warrant that you have authority to bind that entity, in which case "<strong>you</strong>" and "<strong>your</strong>" refer to that entity.
                </p>
                <p className="text-gray-700">
                  These Terms apply to all visitors, users, and others who access or use the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
                <p className="text-gray-700 mb-4">For purposes of these Terms:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-3">
                  <li>
                    <strong>&ldquo;Sundae,&rdquo;</strong> <strong>&ldquo;we,&rdquo;</strong> <strong>&ldquo;us,&rdquo;</strong> <strong>&ldquo;our&rdquo;</strong> means Sundae Technologies Inc., a company incorporated in Delaware, United States, together with its affiliates, operating the domains sundae.io, sundaetech.ai, sundaetech.io, and sundaetechnologies.com.
                  </li>
                  <li>
                    <strong>"Services"</strong> means Sundae's AI-powered decision-intelligence and workforce platforms and related products, including Sundae Report, dashboards, APIs, integrations, mobile/desktop apps and website.
                  </li>
                  <li>
                    <strong>"Sundae Report"</strong> means Sundae's restaurant decision-intelligence benchmarking module that aggregates and anonymizes operational data to provide comparative performance insights.
                  </li>
                  <li>
                    <strong>"Customer Data"</strong> means your personal information (including POS data) you or your users submit or upload into the Services.
                  </li>
                  <li>
                    <strong>"Usage Data"</strong> means technical, log, and/or metadata about how you and your users access and use the Services.
                  </li>
                  <li>
                    <strong>"Aggregated Data"</strong> means data resulting from the aggregation and/or anonymization of Customer Data and/or Usage Data such that it does not identify you or any natural person and cannot reasonably be re-identified.
                  </li>
                  <li>
                    <strong>"Benchmark Data"</strong> means Aggregated Data used to generate comparative metrics and industry benchmarks made available to you through the Services (including Sundae Report).
                  </li>
                  <li>
                    <strong>"Subscription Form"</strong> means any online or offline ordering document, sign-up flow, or similar record specifying your subscription plan, fees, and commercial terms.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Description of Services</h2>
                <p className="text-gray-700 mb-4">
                  Sundae provides AI-powered decision-intelligence solutions primarily for restaurants and hospitality businesses. Our Services may include, without limitation:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Data integration and analytics platform</li>
                  <li>AI-powered insights, recommendations, and automation</li>
                  <li>Benchmarking and performance analytics (including Sundae Report)</li>
                  <li>Multi-agent AI system for restaurant operations</li>
                  <li>Real-time monitoring, alerts, and anomaly detection</li>
                  <li>Custom dashboards and reporting</li>
                  <li>APIs and integrations with third-party systems (e.g., POS, HR, accounting)</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  We may add, modify, or discontinue features or modules from time to time (see Section 12).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Eligibility & Account Registration</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Eligibility</h3>
                <p className="text-gray-700 mb-4">
                  You may use the Services only if you (a) are at least 18 years old; and (b) have the legal capacity to enter into a binding contract under applicable law.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Account Creation</h3>
                <p className="text-gray-700 mb-4">
                  To access many features of the Services, you must create an account and provide accurate, current, and complete information. You agree to keep this information up to date.
                </p>
                <p className="text-gray-700 mb-4">
                  If you create an account on behalf of a business, you represent that you are authorized to do so.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Account Security</h3>
                <p className="text-gray-700 mb-4">
                  You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Not share your password or account with any unauthorized person, and</li>
                  <li>Notify us immediately of any unauthorized use of your account or security breach.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Permitted Use & Acceptable Use</h2>
                <p className="text-gray-700 mb-4">
                  You may use the Services only for your internal business purposes and in compliance with these Terms and all applicable laws and regulations. You agree not to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use the Services for any unlawful, fraudulent, or abusive purpose.</li>
                  <li>Interfere with or disrupt the Services or servers, or bypass security measures.</li>
                  <li>Attempt to gain unauthorized access to any portion of the Services or related systems.</li>
                  <li>Upload or transmit viruses, malware, or other harmful code.</li>
                  <li>Use the Services to develop or offer a competing product or for competitive analysis other than legitimate internal benchmarking.</li>
                  <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code or underlying models, except to the limited extent permitted by applicable law.</li>
                  <li>Scrape, harvest, or bulk-download data from the Services via automated tools without our written permission.</li>
                  <li>Attempt to re-identify or de-anonymize any Aggregated Data or Benchmark Data (see Sundae Report terms in Section 13).</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  We may, in our sole discretion, suspend or terminate access for violations of this Section (see Section 18).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Customer Data, Usage Data & Privacy</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Ownership of Customer Data</h3>
                <p className="text-gray-700 mb-4">
                  You retain all rights, title, and interest in and to your Customer Data, subject to the licenses you grant to Sundae under these Terms.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 License to Customer Data</h3>
                <p className="text-gray-700 mb-4">
                  By submitting or uploading Customer Data to the Services, you grant Sundae a non-exclusive, worldwide, royalty-free license to use, store, host, copy, process, analyze, transmit, and display the Customer Data solely:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>To provide, maintain, and support the Services (including AI-powered features), and</li>
                  <li>To prevent or address service, security, or technical issues.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  For Sundae Report, you grant additional rights in respect of Aggregated Data and Benchmark Data as set out in Section 13.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Usage Data, Aggregated Data & Benchmark Data</h3>
                <p className="text-gray-700 mb-4">
                  Sundae may generate Usage Data regarding your use of the Services. We may combine Customer Data and Usage Data to create Aggregated Data and Benchmark Data, which we may use:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>To operate, improve, and develop the Services</li>
                  <li>For benchmarking, analytics, and research</li>
                  <li>To publish industry insights in aggregated and anonymized form</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Sundae exclusively owns all rights, title, and interest in Aggregated Data and Benchmark Data, provided that such data does not identify you or any individual.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.4 Privacy Policy</h3>
                <p className="text-gray-700 mb-4">
                  Your use of the Services is also governed by our Privacy Policy, which explains how we collect, use, and disclose information about you. The Privacy Policy is incorporated into these Terms by reference.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.5 Data Security</h3>
                <p className="text-gray-700 mb-4">
                  We implement industry-standard technical and organizational measures to protect Customer Data, including encryption in transit and at rest, access controls, and monitoring. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Responsibilities & Representations</h2>
                <p className="text-gray-700 mb-4">
                  You represent and warrant that:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>You have all necessary rights, consents, and permissions to upload and share Customer Data through the Services.</li>
                  <li>Your Customer Data and use of the Services do not and will not violate any applicable law or third-party rights (including privacy, employment, and data protection laws).</li>
                  <li>You will not upload to the Services any sensitive personal data except as expressly allowed under applicable law and our Privacy Policy.</li>
                  <li>All Customer Data you provide for analytics and benchmarking is, to the best of your knowledge, accurate, complete, and current.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You are responsible for configuring and using the Services in a manner that complies with applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  The Services and their original content, features, and functionality are owned by Sundae and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-gray-700">
                  Sundae retains all rights, title, and interest in and to the Services, including all related intellectual property rights. You may not remove, alter, or obscure any proprietary notices from the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. License to Use the Services</h2>
                <p className="text-gray-700 mb-4">
                  Subject to your compliance with these Terms and applicable Order Forms, Sundae grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Services during your subscription term for your internal business purposes only.
                </p>
                <p className="text-gray-700">
                  You may not resell, redistribute, white-label, or provide the Services or outputs to third parties as a stand-alone service, unless we agree in writing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Fees, Billing & Taxes</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 Fees</h3>
                <p className="text-gray-700 mb-4">
                  Some parts of the Services are provided free of charge; others require payment of subscription or usage-based fees as described in the applicable Order Form or pricing page. All fees are quoted in U.S. dollars unless otherwise specified. You are responsible for paying all fees and applicable taxes.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 Billing & Renewal</h3>
                <p className="text-gray-700 mb-4">
                  Unless otherwise specified, subscriptions are billed in advance on a monthly or annual basis and automatically renew at the end of each billing period at the then-current rates, unless you cancel prior to renewal.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.3 Cancellations & Refunds</h3>
                <p className="text-gray-700 mb-4">
                  You may cancel your subscription at any time via your account settings or by contacting us. Cancellation takes effect at the end of the current billing cycle. Fees are non-refundable unless otherwise expressly stated in writing.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.4 Late Payments & Suspension</h3>
                <p className="text-gray-700 mb-4">
                  If you fail to pay fees when due, we may suspend or limit your access to the Services until payment is received.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.5 Taxes</h3>
                <p className="text-gray-700">
                  Fees are exclusive of any applicable taxes, duties, or similar charges. You are responsible for all such amounts (excluding taxes based on Sundae's net income).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Feedback</h2>
                <p className="text-gray-700">
                  If you provide suggestions, ideas, or feedback about the Services ("Feedback"), you grant Sundae a worldwide, perpetual, irrevocable, royalty-free license to use, copy, modify, create derivative works of, and otherwise exploit such Feedback for any purpose, without any obligation or compensation to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Service Availability, Changes & Beta Features</h2>
                <p className="text-gray-700 mb-4">
                  We aim to make the Services available on an ongoing basis but do not guarantee uninterrupted or error-free operation.
                </p>
                <p className="text-gray-700 mb-4">
                  We may:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Modify or discontinue features,</li>
                  <li>Launch new modules or plans, or</li>
                  <li>Provide early access or beta features that may be unstable or experimental.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Any beta or pre-release features are provided "as is" without warranties and may be discontinued at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Additional Terms for Sundae Report</h2>
                <p className="text-gray-700 mb-4">
                  This Section applies specifically to your use of Sundae Report and supplements the other sections of these Terms. In case of conflict, this Section prevails for Sundae Report.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.1 Service Description (Sundae Report)</h3>
                <p className="text-gray-700 mb-4">
                  Sundae Report is a restaurant decision-intelligence and benchmarking platform that enables restaurants and food service establishments to compare their performance metrics against anonymized industry peers through the aggregation and analysis of POS and operational data.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.2 Data Provision</h3>
                <p className="text-gray-700 mb-4">
                  You agree to provide accurate and complete POS and operational data by:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Uploading data files; and/or</li>
                  <li>Connecting your POS and related systems to Sundae Report.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  This data may include, without limitation: sales transactions, revenue figures, item-level sales, customer counts, time-stamped transaction data, payment methods, discounts and promotions, and other operational metrics.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.3 Anonymization & Aggregation</h3>
                <p className="text-gray-700 mb-4">
                  Before your data is included in Benchmark Data and shared as part of benchmarking outputs:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>We anonymize and aggregate the data to remove direct identifiers of your restaurant (e.g., name, precise address, ownership details, employee names).</li>
                  <li>We apply reasonable thresholds for peer-group sizes and other techniques intended to reduce the risk of re-identification.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You acknowledge that no anonymization method is perfect, but we will use commercially reasonable efforts to ensure that individual restaurants cannot be identified from the Benchmark Data.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.4 License to Anonymized & Aggregated Data</h3>
                <p className="text-gray-700 mb-4">
                  By uploading data to Sundae Report, you grant Sundae a worldwide, perpetual, irrevocable, royalty-free license to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use, process, anonymize, aggregate, analyze, and display your data for the purposes of operating Sundae Report and providing benchmarking and analytics services; and</li>
                  <li>Create derivative works from anonymized and Aggregated Data, including Benchmark Data, and use such data and derivatives in aggregated form for platform improvement, research, analytics, and market analysis.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  This license survives termination of your account with respect to Aggregated Data and Benchmark Data already created.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.5 License to Use Sundae Report</h3>
                <p className="text-gray-700 mb-4">
                  Subject to your compliance with these Terms and payment of applicable fees, Sundae grants you a limited, non-exclusive, non-transferable license to access and use Sundae Report and the benchmarking outputs for your internal business analytics and decision-making.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.6 Restrictions (Sundae Report)</h3>
                <p className="text-gray-700 mb-4">
                  In addition to the general restrictions in Section 5, you agree that you will not:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Resell, redistribute, or sublicense access to Sundae Report or its Benchmark Data to any third party, except to share reports internally within your organization.</li>
                  <li>Attempt to reverse-engineer or de-anonymize any Benchmark Data or Aggregated Data to identify other restaurants or participants.</li>
                  <li>Use Benchmark Data to create or train a competing benchmarking or analytics service without our prior written consent.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Confidentiality</h2>
                <p className="text-gray-700 mb-4">
                  Each party may receive non-public, confidential information of the other party ("Confidential Information"). Confidential Information includes Customer Data, product roadmaps, pricing, business plans, and any information marked or reasonably understood to be confidential.
                </p>
                <p className="text-gray-700 mb-4">
                  The receiving party will:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use Confidential Information only as necessary to perform its obligations under these Terms; and</li>
                  <li>Protect Confidential Information using at least reasonable care.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Confidential Information does not include information that is (a) publicly available without breach; (b) received from a third party without confidentiality obligation; (c) independently developed; or (d) required to be disclosed by law (with reasonable notice if legally permitted).
                </p>
                <p className="text-gray-700 mt-4">
                  Aggregated Data and Benchmark Data that do not identify you are not your Confidential Information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Disclaimers</h2>
                <p className="text-gray-700 mb-4">
                  THE SERVICES (INCLUDING SUNDAE REPORT, BENCHMARK DATA, AND ALL AI-GENERATED OUTPUTS) ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.
                </p>
                <p className="text-gray-700 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUNDAE EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT;</li>
                  <li>ANY WARRANTY THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE;</li>
                  <li>ANY WARRANTY AS TO THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANALYTICS, BENCHMARK DATA, OR AI-GENERATED INSIGHTS; OR</li>
                  <li>THAT THE RESULTS OF USING THE SERVICES WILL MEET YOUR EXPECTATIONS OR PRODUCE ANY PARTICULAR BUSINESS OUTCOME.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You are solely responsible for how you interpret and use any outputs or insights from the Services (including pricing, staffing, or operational decisions).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Indemnification</h2>
                <p className="text-gray-700">
                  You agree to indemnify, defend, and hold harmless Sundae and its officers, directors, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                  <li>Your use of the Services;</li>
                  <li>Your Customer Data (including allegations that it infringes a third party's rights or violates law);</li>
                  <li>Your breach of these Terms; or</li>
                  <li>Your violation of any third-party rights.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SUNDAE OR ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF (OR INABILITY TO USE) THE SERVICES.
                </p>
                <p className="text-gray-700 mt-4">
                  IN NO EVENT SHALL SUNDAE'S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS EXCEED THE GREATER OF:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                  <li>THE AMOUNTS YOU PAID TO SUNDAE FOR THE SERVICES IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR</li>
                  <li>ONE HUNDRED U.S. DOLLARS (US$100).</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Some jurisdictions do not allow certain exclusions or limitations of liability; in such cases, our liability will be limited to the maximum extent permitted by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Term & Termination</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">18.1 Term</h3>
                <p className="text-gray-700 mb-4">
                  These Terms take effect when you first access or use the Services or agree to them, and continue until terminated as described below.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">18.2 Termination by You</h3>
                <p className="text-gray-700 mb-4">
                  You may terminate your account and stop using the Services at any time through your account settings or by contacting us. Any prepaid fees are non-refundable unless otherwise stated in writing.
                </p>
                <p className="text-gray-700 mb-4">
                  You may request deletion of identifiable Customer Data, subject to our data retention obligations and lawful bases to retain certain records.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">18.3 Termination or Suspension by Sundae</h3>
                <p className="text-gray-700 mb-4">
                  We may suspend or terminate your access to the Services, in whole or in part, immediately and without prior notice if:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>You breach these Terms;</li>
                  <li>You fail to pay fees when due;</li>
                  <li>We are required to do so by law; or</li>
                  <li>Continuing to provide the Services would create material risk for Sundae.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">18.4 Effect of Termination</h3>
                <p className="text-gray-700 mb-4">
                  Upon termination:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Your right to access and use the Services will immediately cease.</li>
                  <li>Sections which by their nature should survive (including, without limitation, Sections 6.3, 8–11, 13.4, 14–18, 20–22) will survive.</li>
                  <li>Aggregated Data and Benchmark Data previously created may be retained and used in accordance with these Terms.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Governing Law & Dispute Resolution</h2>
                <p className="text-gray-700 mb-4">
                  These Terms and any dispute or claim arising out of or in connection with them or their subject matter or formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
                </p>
                <p className="text-gray-700">
                  The parties irrevocably agree that the state and federal courts located in the State of Delaware shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or their subject matter or formation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We may modify these Terms from time to time. If we make material changes, we will provide notice (for example, by email, in-app notification, or by updating the "Last Updated" date).
                </p>
                <p className="text-gray-700">
                  By continuing to access or use the Services after the updated Terms become effective, you agree to be bound by the revised Terms. If you do not agree, you must stop using the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Assignment</h2>
                <p className="text-gray-700">
                  You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. We may assign these Terms (in whole or part) without your consent to an affiliate, or in connection with a merger, acquisition, corporate reorganization, or sale of assets.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">22. Miscellaneous</h2>
                <ul className="space-y-4">
                  <li>
                    <p className="text-gray-700">
                      <strong>Entire Agreement.</strong> These Terms (together with the Privacy Policy and any applicable Order Forms) constitute the entire agreement between you and Sundae regarding the Services and supersede all prior or contemporaneous agreements.
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-700">
                      <strong>Severability.</strong> If any provision of these Terms is held invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the remaining provisions will remain in full force and effect.
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-700">
                      <strong>No Waiver.</strong> Our failure to enforce any right or provision of these Terms is not a waiver of that right or provision.
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-700">
                      <strong>Relationship of Parties.</strong> The parties are independent contractors. Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship.
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-700">
                      <strong>Notices.</strong> We may send notices to you by email to the address associated with your account or via in-app notifications. You may send legal notices to us at the address below.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">23. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms or the Services, please contact:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Sundae Technologies Inc.</strong><br />
                    1007 N Orange St, 4th Floor, Suite 1382<br />
                    Wilmington, DE 19801, United States<br />
                    Email: <a href="mailto:legal@sundae.io" className="text-blue-600 hover:underline">legal@sundae.io</a>
                  </p>
                </div>
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
                <a href="mailto:legal@sundae.io" className="text-blue-600 hover:underline">
                  legal@sundae.io
                </a>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <a href="tel:+97145017308" className="text-blue-600 hover:underline">
                  +971 (4) 501-7308
                </a>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📍</div>
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
