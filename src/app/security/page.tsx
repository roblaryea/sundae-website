'use client';

import { SundaeIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { PageHero, PageCTA, FadeUp } from "@/components/ui/PageAnimations";

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
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Security & Compliance"
        title="Enterprise-Grade Security"
        description="Your data is protected by industry-leading security practices, encryption, and compliance standards."
      />

      {/* Security Pillars */}
      <FadeUp>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                Security Architecture
              </h2>
              <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
                Six pillars that protect your data from ingestion to insight.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                    <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Compliance */}
      <FadeUp>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                Compliance & Certifications
              </h2>
            </div>

            <div className="space-y-6">
              {complianceItems.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border border-[var(--border-default)] bg-[var(--navy-deep)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                        {item.note && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                            {item.note}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-supporting)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* CTA */}
      <PageCTA
        title="Questions About Security?"
        description="Our team is happy to discuss our security practices and compliance certifications."
      >
        <Button variant="cta" size="lg" href="/contact">Contact Us</Button>
        <Button variant="outline-light" size="lg" href="/docs">View Documentation</Button>
      </PageCTA>
    </div>
  );
}
