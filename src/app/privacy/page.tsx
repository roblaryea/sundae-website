import type { Metadata } from "next";
import { ApprovedPolicyPage } from "@/components/legal/ApprovedPolicyPage";
import {
  APPROVED_PRIVACY_SECTIONS,
  LEGAL_POLICY_EFFECTIVE_DATE,
  LEGAL_POLICY_VERSION,
} from "@/lib/legal/approved-policies";

export const metadata: Metadata = {
  title: "Privacy Policy | Sundae",
  description:
    "How Sundae collects, uses, shares, protects and retains personal information across Core, Crew, AI, payroll and connected services.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <ApprovedPolicyPage
      badge="Privacy"
      title="Privacy Policy"
      description="Sundae Technologies Inc. (“Sundae”, “we”, “us”) provides a global business platform for food-service and other shift-based operators. This Policy explains how we process personal information through Sundae websites, apps, Core, Crew, APIs, integrations, support and related services."
      effectiveDate={LEGAL_POLICY_EFFECTIVE_DATE}
      version={LEGAL_POLICY_VERSION}
      sections={APPROVED_PRIVACY_SECTIONS}
      alternateHref="/terms"
      alternateLabel="Read the Terms of Service"
      contactEmail="privacy@sundae.io"
    />
  );
}
