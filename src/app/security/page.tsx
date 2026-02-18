import type { Metadata } from "next";
import { SundaeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "How Sundae protects your restaurant data. Enterprise-grade security, encryption, access controls, and compliance standards.",
};

const securityPillars = [
  {
    icon: "alerts" as const,
    title: "Encryption at Rest & in Transit",
    description:
      "All data is encrypted using AES-256 at rest and TLS 1.3 in transit. API keys and credentials are stored in isolated, encrypted vaults — never in source code.",
  },
  {
    icon: "integration" as const,
    title: "Secure Integrations",
    description:
      "POS, payroll, and inventory connections use OAuth 2.0 or encrypted API tokens with least-privilege scoping. We never store raw credentials from third-party systems.",
  },
  {
    icon: "operators" as const,
    title: "Role-Based Access Control",
    description:
      "Granular RBAC lets you control who sees what — from location-level operators to portfolio-level executives. Every action is audit-logged.",
  },
  {
    icon: "data" as const,
    title: "Data Isolation & Residency",
    description:
      "Each customer's data is logically isolated. We support regional data residency requirements and can deploy within specific geographies on request.",
  },
  {
    icon: "performance" as const,
    title: "Infrastructure & Monitoring",
    description:
      "Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA, automated failover, real-time monitoring, and incident response protocols.",
  },
  {
    icon: "dashboard" as const,
    title: "Audit Logging & Transparency",
    description:
      "Every data access, export, and configuration change is logged. Customers can request audit trails and compliance documentation at any time.",
  },
];

const complianceItems = [
  {
    title: "GDPR",
    description: "Full compliance with EU General Data Protection Regulation including data subject rights, lawful basis processing, and DPA availability.",
  },
  {
    title: "SOC 2 Type II",
    description: "Pursuing SOC 2 Type II certification covering security, availability, and confidentiality trust service criteria.",
    note: "In progress",
  },
  {
    title: "Data Processing Agreements",
    description: "Standard DPAs available for all enterprise customers. Custom data handling terms negotiable for large deployments.",
  },
  {
    title: "Penetration Testing",
    description: "Regular third-party penetration testing and vulnerability assessments. Findings are remediated within defined SLAs.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge--architecture inline-block mb-4">SECURITY & COMPLIANCE</span>
          <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
            Your Data, Protected at Every Layer
          </h1>
          <p className="body-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            Sundae is built for enterprise restaurant groups that demand rigorous security. We protect your operational, financial, and workforce data with industry-leading practices.
          </p>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Security Architecture
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              Six pillars that protect your data from ingestion to insight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                  <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Compliance & Certifications
            </h2>
          </div>

          <div className="space-y-6">
            {complianceItems.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      {item.note && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          {item.note}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
            Questions About Security?
          </h2>
          <p className="body-lg text-gray-600 dark:text-slate-300 mb-8">
            Our team is available to discuss your specific security and compliance requirements, provide documentation, or schedule a security review.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Our Security Team
          </a>
        </div>
      </section>
    </div>
  );
}
