import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ApprovedPolicyPage } from "@/components/legal/ApprovedPolicyPage";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { getLocalizedPolicy } from "@/lib/legal/localized-policy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const policy = getLocalizedPolicy(locale, "privacy");
  return { title: `${policy.title} | Sundae`, description: policy.description, robots: { index: true, follow: true } };
}

export default async function PrivacyPage() {
  const locale = resolveWebsiteLocale(await cookies());
  const policy = getLocalizedPolicy(locale, "privacy");
  return <ApprovedPolicyPage {...policy} alternateHref="/terms" contactEmail="privacy@sundae.io" />;
}
