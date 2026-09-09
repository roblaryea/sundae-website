import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ApprovedPolicyPage } from "@/components/legal/ApprovedPolicyPage";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { getLocalizedPolicy } from "@/lib/legal/localized-policy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const policy = getLocalizedPolicy(locale, "terms");
  return { title: `${policy.title} | Sundae`, description: policy.description, robots: { index: true, follow: true } };
}

export default async function TermsPage() {
  const locale = resolveWebsiteLocale(await cookies());
  const policy = getLocalizedPolicy(locale, "terms");
  return <ApprovedPolicyPage {...policy} alternateHref="/privacy" contactEmail="legal@sundae.io" />;
}
