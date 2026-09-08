export const LEGAL_POLICY_VERSION = "2026-09-08";
export const LEGAL_POLICY_EFFECTIVE_DATE = "8 September 2026";

export type ApprovedPolicySection = {
  title: string;
  paragraphs: readonly string[];
};

export const APPROVED_TERMS_SECTIONS: readonly ApprovedPolicySection[] = [
  {
    title: "1. Parties, acceptance and order of precedence",
    paragraphs: [
      "These Terms are between Sundae Technologies Inc., a Delaware corporation (“Sundae”, “we”, “us”), and the person or legal entity accepting them (“Customer”, “you”). If you accept for an organization, you represent that you have authority to bind it. Authorized users, employees and other persons invited by Customer may use the Services only within Customer’s account and permissions.",
      "An order form, quote, checkout record or reseller agreement identifies the package, modules, locations, users, term, fees, currency and any service levels. If there is a conflict, the order form controls commercial terms; the DPA controls personal-data processing; these Terms control platform use, intellectual property, acceptable use and general service rules. A reseller may supply local billing or support, but cannot change Sundae’s platform, IP or data obligations unless expressly agreed in writing.",
    ],
  },
  {
    title: "2. Definitions",
    paragraphs: [
      "“Services” means Sundae Core, Sundae Crew and related websites, apps, APIs, partner/embed surfaces, support and documentation, including only the modules enabled for Customer’s package and region. Core may include Pulse, Benchmark, Watchtower, Insights, Ask Sundae, Foresight, Profit Recovery, automations, reports and connected-data analytics. Crew may include People/HR, recruiting, scheduling, time and attendance, leave, documents, benefits, compensation, workforce intelligence, employee self-service, payroll readiness, payslips, statutory/export workflows and partner syncs.",
      "“Customer Data” means data submitted, uploaded, generated or connected by or for Customer, including POS, delivery, inventory, purchasing, reservations, accounting, marketing, guest, employee, applicant, contractor, attendance, compensation, payroll, document and integration data. “Usage Data” means technical, diagnostic, security, device, feature and account activity data. “Aggregated Data” means data processed so it does not identify Customer or a natural person and cannot reasonably be re-identified using the methods Sundae applies. “Outputs” means analytics, forecasts, reports, recommendations, generated text, files and other results returned by the Services.",
    ],
  },
  {
    title: "3. Access, permissions and customer responsibilities",
    paragraphs: [
      "Customer must provide accurate account, organization, legal-entity, billing, country, currency and contact information; maintain credential security; assign least-privilege roles; and promptly remove departed users. Customer is responsible for its organization hierarchy, outlet/site scope, employment relationships, payroll configuration, source-system permissions and all actions taken by its users.",
      "Customer must provide all notices and lawful bases required for people whose data it submits, including employees, applicants, contractors, guests, beneficiaries, emergency contacts and event/delivery contacts. Customer must minimize sensitive data, configure retention and access appropriately, and respond to data-subject requests that concern Customer’s own processing. Customer must not use the Services to make a solely automated decision that produces legal or similarly significant effects on a person without required human review and safeguards.",
    ],
  },
  {
    title: "4. Acceptable use",
    paragraphs: [
      "Customer and its users must not: break the law; infringe rights; bypass tenancy, scope or security controls; probe or disrupt systems; upload malware; scrape or bulk-download without written permission; reverse engineer except where non-waivable law permits; attempt to re-identify benchmark data; use Outputs to train a competing service without permission; transmit credentials or full payment secrets in support channels; or use the Services for emergency, safety-critical or unlawful employment decisions.",
      "Sundae may suspend access proportionately where necessary to protect users, data, systems, a provider, or legal compliance. Where practicable, Sundae will give notice and an opportunity to cure.",
    ],
  },
  {
    title: "5. Customer Data, privacy and data roles",
    paragraphs: [
      "Customer owns or controls Customer Data and grants Sundae a limited, worldwide, non-exclusive license to host, copy, transmit, organize, analyze and otherwise process it only to provide, secure, support, bill for and improve the Services as described in the Privacy Policy, DPA and Customer’s instructions. Sundae may use Usage Data and properly Aggregated Data for operations, product development, research, benchmarking and market insights.",
      "For Customer Data, Customer generally determines the purposes and means of processing and Sundae acts as processor/service provider. Sundae acts as an independent controller for its own account, website, marketing, support, security, fraud prevention, billing, legal records and product-usage purposes. The DPA and Privacy Policy describe the parties’ responsibilities, subprocessors, transfers, retention and rights process.",
    ],
  },
  {
    title: "6. AI features and Outputs",
    paragraphs: [
      "Ask Sundae and Crew AI features are assistive systems. Requests may be transformed, scoped, redacted, logged and sent through Sundae’s controlled AI gateway to approved model providers. AI usage may consume plan credits or usage allowances. Sundae does not represent that an Output is accurate, complete, current, unbiased, legally compliant or unique.",
      "Customer must review Outputs before relying on them, especially for staffing, pay, leave, performance, recruiting, benefits, compliance, pricing, purchasing, marketing, customer treatment or external communications. Outbound actions require the approval controls shown in the Services. Customer remains responsible for employment decisions, payroll instructions and published content. Sundae will not knowingly use identifiable Customer Data to train a general-purpose model except as expressly agreed in writing; Aggregated/De-identified data may be used as described in the Privacy Policy.",
    ],
  },
  {
    title: "7. Crew, payroll and statutory workflows",
    paragraphs: [
      "Crew is workforce-management software, not an employer, professional employer organization, payroll provider, tax adviser, law firm, benefits fiduciary or government filing authority. Payroll features support readiness, calculations based on configured inputs, payslips, exports, partner rails and evidence; availability and accuracy vary by country pack, entity, provider and package.",
      "Customer and its payroll provider remain responsible for worker classification, wage/hour rules, tax treatment, deductions, garnishments, leave, benefits, pension/social-security obligations, filings, payment instructions, deadlines, employee notices and correcting source data. A generated file, “ready” status, export, transmission or provider response is not a representation that wages were paid or a filing was accepted. Customer must independently review and approve every payroll run and statutory output.",
    ],
  },
  {
    title: "8. Integrations, imports and partners",
    paragraphs: [
      "Customer may connect POS, HRIS, payroll, accounting, delivery, reservations, CRM, marketing, banking and other systems through supported connectors, APIs, webhooks, SFTP or uploads. Customer authorizes Sundae to access and exchange the selected data and is responsible for the third party’s terms, permissions, accuracy, outages and charges. Syncs may be delayed or eventually consistent; disabling a connector stops future access but does not automatically delete historical data. Partner and reseller access is limited to the scopes authorized by Customer and the applicable agreement.",
    ],
  },
  {
    title: "9. Benchmark and Aggregated Data",
    paragraphs: [
      "Sundae may combine Customer Data and Usage Data into Aggregated Data and benchmarking outputs. Sundae applies reasonable de-identification, suppression and peer-group thresholds designed to prevent a customer, employee or guest from being identified. Customer must not attempt re-identification or infer another participant’s confidential information. Sundae owns Aggregated Data that no longer identifies Customer or a person and may retain it after termination. No anonymization method is perfect; Sundae will not make an absolute “anonymous” guarantee.",
    ],
  },
  {
    title: "10. Intellectual property and feedback",
    paragraphs: [
      "Sundae and its licensors retain all rights in the Services, software, models, documentation, interfaces, trademarks and improvements. Subject to payment and these Terms, Customer receives a limited, non-exclusive, non-transferable, non-sublicensable right to use the enabled Services internally during the term. Customer retains its marks and Customer Data. Feedback may be used by Sundae without compensation, provided it does not disclose Customer Confidential Information.",
    ],
  },
  {
    title: "11. Confidentiality and security",
    paragraphs: [
      "Each party will protect the other’s non-public information using reasonable care and use it only for the relationship. Confidentiality does not apply to information that is public, independently developed, lawfully received or required by law. Sundae maintains technical and organizational safeguards including encryption in transit and at rest where supported, tenant/scoped access controls, authentication, audit logging, monitoring, backups, incident response and provider controls. No system is completely secure. Sundae’s public security materials describe readiness and controls and do not create a certification or uptime warranty.",
    ],
  },
  {
    title: "12. Fees, packages, AI credits and taxes",
    paragraphs: [
      "Fees, included locations/users, Crew SKUs or bundles, entitlements, usage limits, AI credits, overages, commitment terms and renewal cadence are those in the applicable order form or checkout. Unless stated otherwise, subscriptions renew for the same period at then-current rates. Customer must pay invoices and applicable VAT, GST, sales, use, withholding and similar taxes (excluding taxes on Sundae’s net income). Stripe or an authorized reseller may process payment; card data is handled under that provider’s terms.",
      "Sundae may suspend paid features for overdue undisputed amounts after reasonable notice. Refunds, credits, cancellations and early termination are governed by the order form; mandatory local consumer or commercial law is not waived.",
    ],
  },
  {
    title: "13. Availability, changes and beta features",
    paragraphs: [
      "Sundae targets reliable service but does not promise uninterrupted or error-free operation unless an order form contains an SLA. Sundae may maintain, modify, replace or retire features and may offer beta features “as is”. Material changes that reduce core functionality will be communicated where required. Customer is responsible for maintaining supported browsers, source integrations and exports.",
    ],
  },
  {
    title: "14. Termination and data return",
    paragraphs: [
      "Either party may terminate for material uncured breach; Customer may cancel as stated in its order form. Sundae may suspend or terminate for non-payment, unlawful use, security risk or legal requirement. At termination, access ends according to the order form, and Customer may request a reasonable export of available Customer Data during the stated export window. Sundae then deletes or anonymizes data according to the DPA, Privacy Policy, statutory obligations, backup cycles, legal claims and append-only audit requirements. Aggregated Data remains with Sundae.",
    ],
  },
  {
    title: "15. Disclaimers",
    paragraphs: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES AND OUTPUTS ARE PROVIDED “AS IS” AND “AS AVAILABLE”. SUNDAE DISCLAIMS IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS, TITLE, NON-INFRINGEMENT, ACCURACY, COMPLETENESS, AVAILABILITY AND RESULTS. SUNDAE DOES NOT GUARANTEE PAYROLL, TAX, EMPLOYMENT, BENEFIT, FILING, PAYMENT, COMPLIANCE OR BUSINESS OUTCOMES. CUSTOMER MUST APPLY HUMAN REVIEW AND PROFESSIONAL ADVICE WHERE APPROPRIATE.",
    ],
  },
  {
    title: "16. Indemnity and liability",
    paragraphs: [
      "Customer will defend and indemnify Sundae for claims arising from Customer Data, Customer’s unlawful use, instructions, employment/payroll decisions, third-party integrations or breach of these Terms, except to the extent caused by Sundae’s own breach. To the maximum extent permitted by law, neither party is liable for indirect, incidental, special, consequential, punitive or loss-of-profit damages. Sundae’s aggregate liability is limited to the greater of fees paid for the affected Services in the preceding 12 months or US$100, except for liabilities that cannot legally be limited. An order form may provide a different negotiated cap.",
    ],
  },
  {
    title: "17. Governing law, local rights and general terms",
    paragraphs: [
      "Unless an order form or mandatory local law provides otherwise, Delaware law governs and courts in Delaware have exclusive jurisdiction. Nothing limits non-waivable data-protection, employment, consumer or other mandatory rights. The parties are independent contractors. These Terms, the Privacy Policy, DPA and order forms are the entire agreement; invalid provisions are narrowed, not allowed to defeat the remainder. Assignment is restricted for Customer and permitted for Sundae in a reorganization, merger or sale. Notices may be sent by email, in-app message or the legal address below.",
    ],
  },
  {
    title: "18. Contact",
    paragraphs: [
      "Sundae Technologies Inc. · 1007 N Orange St, 4th Floor, Suite 1382 · Wilmington, DE 19801, United States",
      "Legal: legal@sundae.io · Privacy: privacy@sundae.io · Security: security@sundae.io",
    ],
  },
];

export const APPROVED_PRIVACY_SECTIONS: readonly ApprovedPolicySection[] = [
  {
    title: "1. Roles: who decides how data is used",
    paragraphs: [
      "For website visitors, account contacts, prospects, support contacts, billing contacts and Sundae workforce users, Sundae is generally the controller/business deciding the purposes of processing.",
      "For data an organization uploads or connects to operate its account (“Customer Data”), the organization generally decides the purposes and means. It may be the controller/business (including employer, venue operator or service provider), and Sundae generally acts as its processor/service provider. The organization is responsible for notices, lawful basis, permissions and responding to its employees’, applicants’, guests’ and customers’ requests. A DPA, order form or reseller agreement may allocate roles differently for a particular service.",
    ],
  },
  {
    title: "2. Categories of information",
    paragraphs: [
      "Account and identity: name, username, email, phone, password credentials, MFA/SSO/WebAuthn metadata, role, organization, language, timezone and preferences.",
      "Organization and commercial: legal entity, business address, tax/VAT identifiers, locations/outlets, billing contacts, subscription/SKU, invoices, payment status, support entitlements and reseller relationship. Payment-card numbers are handled by payment providers; Sundae does not intentionally store full card numbers.",
      "Core business data: POS orders and line items, revenue, tenders, discounts, refunds, delivery economics, inventory, purchasing, suppliers, reservations, accounting/P&L, marketing campaigns, reviews, guest interactions, forecasts, benchmarks, reports and operational notes. These may contain names, emails, phone numbers, addresses or free-text personal information supplied by the Customer.",
      "Crew workforce data: employee/member profiles, legal/preferred names, contact and emergency contacts, employee numbers, job roles, departments, managers, outlet/site assignments, employment status/type, hire/termination dates, work authorization, availability, schedules, shift swaps, time and attendance, breaks, corrections, leave and balances, performance/workforce signals, compensation/rates, tips, expenses, loans, deductions, garnishments, benefits, dependents, recruiting applications, e-signatures, contracts, policies, certifications and employee self-service activity.",
      "Sensitive or special-category data where enabled by the Customer: government ID/passport/residency and tax identifiers, bank/payment details, biometric or kiosk tokens, geolocation associated with attendance, demographic/DEI attributes, health or leave documents, benefit/dependent information and other data protected by local law. These fields are optional or permission-gated where supported and should be collected only where the Customer has a lawful basis and necessity.",
      "Guest, customer and event data: CRM profiles, loyalty/visit history, reservations, reviews, feedback, cases, catering delivery contacts and marketing preferences.",
      "Communications and content: support tickets, chat messages, Ask Sundae questions, uploaded files, call/email/calendar information where connected, survey responses, feedback and e-signature evidence.",
      "AI and derived information: prompts, query text, selected context, generated answers, classifications, confidence/provenance, action approvals, prompt hashes, model/route, token/credit usage, decision/replay records and redacted diagnostics. We design the AI path to scope tenant access and redact or minimize personal information, but Customers must not submit unnecessary sensitive data.",
      "Integration and security data: connector identifiers, OAuth/API metadata, webhook events, sync cursors, file names, health status, masked credential metadata, IP address, device/browser, logs, audit events, session data, approximate location, fraud/security signals and incident records.",
      "Cookies and similar technologies: essential session/authentication identifiers, preferences, analytics and (where separately consented) marketing measurement identifiers.",
    ],
  },
  {
    title: "3. Sources",
    paragraphs: [
      "We receive information from you; your organization or its administrators; employees, applicants, guests and customers through Customer Data; connected systems and partners; payment, hosting, analytics, email, security and support providers; publicly available sources; and your browser/device.",
    ],
  },
  {
    title: "4. Purposes and legal bases",
    paragraphs: [
      "We use information to provide and secure the Services, authenticate users, enforce organization scope and permissions, synchronize integrations, generate reports/benchmarks/forecasts, operate Crew workflows, produce payroll readiness and exports, deliver payslips and support documents, provide support, communicate service notices, process billing, prevent fraud and abuse, monitor reliability, investigate incidents, improve products, create Aggregated Data, comply with law and handle disputes. Where required, bases include contract, legitimate interests balanced against rights, consent, legal obligations and vital/public-interest grounds recognized by local law. Customers choose the basis for their Customer Data.",
      "We do not use Customer Data for a purpose incompatible with the Customer’s instructions. We do not knowingly sell personal information for money. Any “sharing” or targeted-advertising opt-out available under local law is honored through the applicable preference mechanism.",
    ],
  },
  {
    title: "5. AI processing",
    paragraphs: [
      "AI requests pass through Sundae’s controlled gateway to approved providers and are subject to tenant scope, route controls, safety checks, credit metering and audit. We may retain prompts/outputs or hashes for the periods in Section 9 to provide the feature, prevent abuse, resolve disputes, measure cost and improve reliability. We do not knowingly send identifiable Customer Data to a general model-training program except as expressly agreed; Aggregated or de-identified data may be used for product improvement and research. AI output is probabilistic and must not be used as the sole basis for employment, pay, benefit, credit, safety or similarly significant decisions.",
    ],
  },
  {
    title: "6. Sharing and recipients",
    paragraphs: [
      "We share only what is necessary and permitted with: cloud hosting/database/backup providers; authentication, email, SMS and support providers; security, logging, monitoring and analytics providers; payment processors; AI model providers through the gateway; payroll/HRIS, POS, accounting, delivery, reservations, CRM and other integrations selected by the Customer; authorized resellers and regional partners; professional advisers and insurers; authorities or other persons where law, safety or legal claims require it; and a buyer or successor in a merger, financing or asset transfer. A current subprocessor list and DPA describe provider names, purposes, locations and safeguards.",
    ],
  },
  {
    title: "7. Payroll, HR and special-category safeguards",
    paragraphs: [
      "Customer is normally the employer/controller for employee, applicant, dependent and payroll data. Access is role, organization, legal-entity, outlet and confidential-field scoped. Payroll and statutory records may be retained for mandatory periods even after an account closes. Bank and government identifiers may be hashed or encrypted; they are not placed in ordinary observability logs. Biometric/geolocation, demographics, health and dependent data require Customer-controlled lawful basis, necessity, access and retention. Sundae is not the employer, tax authority, payroll provider or legal adviser and does not decide the Customer’s wage, classification or filing obligations.",
    ],
  },
  {
    title: "8. International transfers and data residency",
    paragraphs: [
      "Sundae is headquartered in the United States and may process data in countries where Sundae or providers operate. We use adequacy decisions, Standard Contractual Clauses, the UK IDTA/Addendum or another lawful mechanism where required, together with contractual, technical and organizational safeguards. Customer residency choices are resolved by the most-specific approved organization/partner setting; changing a setting does not automatically migrate existing data. Contact privacy@sundae.io for the safeguards relevant to your account.",
    ],
  },
  {
    title: "9. Retention",
    paragraphs: [
      "We retain information only as long as needed for the stated purpose, the account relationship, legal obligations, disputes, security and audit. The operational schedule is maintained in our data-governance registry and may vary by jurisdiction and Customer policy. Current target windows include: attendance and guest/reservation data generally up to 24 months; AI/chat/usage records generally up to 18 months; notifications/invites generally up to 12/3 months; employee identity and commercial signature evidence generally up to six years or the applicable legal-claims period; payroll, bank, tax, statutory and employee documents for the applicable statutory floor; marketing suppression records indefinitely to honor opt-outs; and append-only audit evidence for statutory/SOC-control purposes. Backups age out under controlled cycles. Properly Aggregated Data may be retained indefinitely because it no longer identifies a person or Customer.",
    ],
  },
  {
    title: "10. Rights and choices",
    paragraphs: [
      "Subject to local law, individuals may request access, correction, deletion, restriction, portability, objection, withdrawal of consent, and marketing/cookie opt-out. California residents may have rights to know, access, delete, correct, opt out of sale/sharing or targeted advertising, limit certain sensitive-information uses, and receive equal treatment. EEA/UK, UAE (including DIFC/ADGM) and other jurisdictions may provide additional rights, representatives or complaint routes.",
      "Send requests to privacy@sundae.io. We may verify identity, ask for the relevant organization/account, and route Customer Data requests to the Customer where it is the controller. We respond within the time required by applicable law and explain any lawful exception, including statutory retention, legal claims, security logs, suppression records or third-party/public data. Authorized agents may act where local law permits.",
    ],
  },
  {
    title: "11. Cookies and preferences",
    paragraphs: [
      "Essential cookies support authentication, security and session continuity. Preference cookies remember language/theme/settings. Analytics cookies help measure reliability and product use. Marketing cookies or pixels are used only where permitted and, where required, after consent. You can withdraw consent through the cookie-preference tool or browser controls; disabling essential cookies may break sign-in or security features.",
    ],
  },
  {
    title: "12. Security and incidents",
    paragraphs: [
      "We use encryption in transit and at rest where supported, least-privilege and scoped access, MFA/SSO options, tenant isolation, logging, monitoring, backups, vulnerability management, provider due diligence and incident-response procedures. No method is perfect. If we confirm a personal-data incident, we notify affected Customers and authorities as required by law and the DPA. Our security materials describe readiness and controls and do not imply that Sundae holds a SOC 2 Type II certification unless expressly stated on the current security page.",
    ],
  },
  {
    title: "13. Children",
    paragraphs: [
      "The Services are business services intended for adults acting for an organization. We do not knowingly collect children’s personal information through our own services where prohibited. A Customer must not upload children’s data unless it has a lawful basis, required notices/consents and appropriate safeguards.",
    ],
  },
  {
    title: "14. Changes",
    paragraphs: [
      "We may revise this Policy for product, legal or operational changes. We publish the new version and date, provide additional notice for material changes where required, and obtain renewed consent when law or our registration flow requires it. Translations are provided for convenience unless a local agreement says otherwise; the controlling-language version will be identified at acceptance.",
    ],
  },
  {
    title: "15. Contact",
    paragraphs: [
      "Sundae Technologies Inc. · 1007 N Orange St, 4th Floor, Suite 1382 · Wilmington, DE 19801, United States",
      "Privacy team: privacy@sundae.io · Legal: legal@sundae.io · Security: security@sundae.io",
    ],
  },
];
