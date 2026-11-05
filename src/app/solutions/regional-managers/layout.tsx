import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_solutions_regional_managers_page";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildSolutionPageMetadata } from "@/lib/solutionPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSolutionPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/solutions/regional-managers",
    englishTitle: "Sundae for Operations Leaders - Live Shift Visibility Across Every Location",
    englishDescription:
      "Pulse and Watchtower give operations leaders live shift visibility across every restaurant, with the market context teams need to act before the shift is over.",
    generatedLocalCopy: generatedLocalCopy.localizedCopy,
  });
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
