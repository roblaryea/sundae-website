import type { Metadata } from "next";
import { ApprovedPolicyPage } from "@/components/legal/ApprovedPolicyPage";
import {
  APPROVED_TERMS_SECTIONS,
  LEGAL_POLICY_EFFECTIVE_DATE,
  LEGAL_POLICY_VERSION,
} from "@/lib/legal/approved-policies";

export const metadata: Metadata = {
  title: "Terms of Service | Sundae",
  description:
    "Terms governing Sundae Core, Sundae Crew, AI-assisted workflows, payroll readiness, integrations, subscriptions and customer data.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <ApprovedPolicyPage
      badge="Legal"
      title="Terms of Service"
      description="These Terms govern access to Sundae’s websites, applications, APIs, integrations, mobile/PWA experiences and related services. They are written for a global B2B service and must be paired with the applicable order form and, where Customer Data is processed for the Customer, a Data Processing Addendum (“DPA”)."
      effectiveDate={LEGAL_POLICY_EFFECTIVE_DATE}
      version={LEGAL_POLICY_VERSION}
      sections={APPROVED_TERMS_SECTIONS}
      alternateHref="/privacy"
      alternateLabel="Read the Privacy Policy"
      contactEmail="legal@sundae.io"
    />
  );
}
