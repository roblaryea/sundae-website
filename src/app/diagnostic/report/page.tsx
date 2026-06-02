// Shareable diagnostic web report — the full depth the teaser email links to.
// Server-fetches the report from the backend by signed token, then hands off
// to the app-styled client view (light/dark, collapsible sections).

import Link from "next/link";
import type { Metadata } from "next";
import { DiagnosticReportView, type DiagnosticReport } from "./DiagnosticReportView";

export const metadata: Metadata = {
  title: "Your Operations Diagnostic · Sundae",
  robots: { index: false, follow: false },
};

const BACKEND = (process.env.SUNDAE_BACKEND_URL || "https://api.sundaetech.ai").replace(/\/$/, "");

type ReportResponse = { report: DiagnosticReport; company?: string | null; name?: string | null };

async function fetchReport(token: string): Promise<ReportResponse | null> {
  if (!token) return null;
  try {
    const res = await fetch(
      `${BACKEND}/api/v1/public/marketing/leads/report?token=${encodeURIComponent(token)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as ReportResponse;
    return data?.report?.topLeaks ? data : null;
  } catch {
    return null;
  }
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 grid place-items-center px-6">
      <div className="text-center max-w-md">
        <span className="text-2xl font-extrabold tracking-tight">sundae<span className="text-blue-500">.</span></span>
        <h1 className="text-xl font-bold mt-6">This diagnostic link isn&rsquo;t valid</h1>
        <p className="text-sm text-slate-400 mt-2">
          The link may have expired or been mistyped. Run a fresh Operations Diagnostic to get your report.
        </p>
        <Link href="/diagnostic" className="inline-flex items-center gap-1.5 mt-6 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
          Start your diagnostic
        </Link>
      </div>
    </div>
  );
}

export default async function DiagnosticReportPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const data = await fetchReport(token ?? "");
  if (!data) return <NotFound />;
  return <DiagnosticReportView report={data.report} company={data.company} name={data.name} />;
}
