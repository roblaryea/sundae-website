import type { Metadata } from "next";
import { cookies } from "next/headers";
import { generatedLocalCopy } from "@/generated-locales/app_solutions_hospitality_operators_page";
import { resolveWebsiteLocale } from "@/lib/i18n";
import { buildSolutionPageMetadata } from "@/lib/solutionPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSolutionPageMetadata({
    locale: resolveWebsiteLocale(await cookies()),
    pathname: "/solutions/hospitality-operators",
    englishTitle: "Sundae for Hospitality Operators - F&B, Rooms, Events, and Catering in One View",
    englishDescription:
      "One decision view across every revenue stream - F&B, rooms, events, banquet, catering - with adaptive targets per service type and stream-specific forecasting.",
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
