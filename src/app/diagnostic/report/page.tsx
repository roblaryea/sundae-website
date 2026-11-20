// Shareable diagnostic web report - the full depth the report email links to.
// Server-fetches the report from the backend by signed token, then hands off
// to the app-styled client view (light/dark, collapsible sections).
//
// New report links expire after 90 days. When the backend answers 410
// {"error":"report_link_expired"} the page offers to email a new link; any
// other failure (including a backend that predates expiry and answers 404)
// keeps the not-found view.

import { SundaeLogotype } from '@/components/ui/SundaeLogotype';
import Link from "next/link";
import type { Metadata } from "next";
import { DiagnosticReportView, type SharedDiagnosticReport } from "./DiagnosticReportView";
import { ExpiredReportLink } from "./ExpiredReportLink";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { classifyReportResponse, isPlausibleReportToken, isRenderableReport, reportBackendUrl, type ReportLookup } from "@/lib/diagnostic/reportLink";
import { getLocalizedPathname, normalizeWebsiteLocale, type WebsiteLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Your Operations Diagnostic · Sundae",
  robots: { index: false, follow: false },
};

type ReportResponse = {
  report: SharedDiagnosticReport;
  company?: string | null;
  name?: string | null;
  locale?: string | null;
};

const isReportResponse = (data: unknown): data is ReportResponse =>
  Boolean(data && typeof data === "object" && isRenderableReport((data as { report?: unknown }).report));

async function fetchReport(token: string): Promise<ReportLookup<ReportResponse>> {
  if (!isPlausibleReportToken(token)) return { status: "not_found" };
  try {
    const res = await fetch(
      `${reportBackendUrl()}/api/v1/public/marketing/leads/report?token=${encodeURIComponent(token)}`,
      { cache: "no-store" },
    );
    return await classifyReportResponse(res, isReportResponse);
  } catch {
    return { status: "not_found" };
  }
}

function NotFound({ locale }: { locale: WebsiteLocale }) {
  const copy = getDiagnosticCopy(locale);
  return (
    <main className="min-h-screen bg-[#020617] text-stone-100 grid place-items-center px-6" dir={copy.dir} lang={locale}>
      <div className="text-center max-w-md">
        <SundaeLogotype tone="cream" className="text-[30px]" />
        <h1 className="text-xl font-bold mt-6">{copy.share.notFoundTitle}</h1>
        <p className="text-sm text-stone-400 mt-2">{copy.share.notFoundBody}</p>
        <Link href={getLocalizedPathname("/diagnostic", locale)} className="inline-flex items-center gap-1.5 mt-6 px-5 py-2.5 rounded-xl bg-[#FF5C4D] hover:bg-[#C2410C] text-white text-sm font-bold transition-colors">
          {copy.share.notFoundCta}
        </Link>
      </div>
    </main>
  );
}

export default async function DiagnosticReportPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; locale?: string }>;
}) {
  const { token = "", locale: queryLocale } = await searchParams;
  const lookup = await fetchReport(token);
  if (lookup.status === "expired") {
    return <ExpiredReportLink token={token} locale={normalizeWebsiteLocale(queryLocale)} />;
  }
  if (lookup.status !== "ok") return <NotFound locale={normalizeWebsiteLocale(queryLocale)} />;
  const locale = normalizeWebsiteLocale(lookup.data.locale ?? queryLocale);
  return <DiagnosticReportView report={lookup.data.report} company={lookup.data.company} locale={locale} />;
}
