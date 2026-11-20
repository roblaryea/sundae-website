"use client";

/**
 * Shown when the backend says a report link is valid but expired (410).
 * "Email me a new one" asks the website proxy to re-send; the answer is the
 * same confirmation whatever happened, so nothing reveals whether a lead exists.
 */

import { useState } from "react";
import Link from "next/link";
import { Loader2, MailCheck } from "lucide-react";
import { SundaeLogotype } from "@/components/ui/SundaeLogotype";
import { getDiagnosticCopy } from "@/lib/diagnostic/i18n";
import { getLocalizedPathname, type WebsiteLocale } from "@/lib/i18n";

export function ExpiredReportLink({ token, locale }: { token: string; locale: WebsiteLocale }) {
  const copy = getDiagnosticCopy(locale);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const resend = async () => {
    if (state !== "idle") return;
    setState("sending");
    try {
      await fetch("/api/diagnostic/report/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch {
      // Same confirmation either way (spec 7).
    }
    setState("done");
  };

  return (
    <main className="min-h-screen bg-[#020617] text-stone-100 grid place-items-center px-6" dir={copy.dir} lang={locale}>
      <div className="text-center max-w-md">
        <SundaeLogotype tone="cream" className="text-[30px]" />
        <h1 className="text-xl font-bold mt-6">{copy.expired.title}</h1>
        <p className="text-sm text-stone-400 mt-2">{copy.expired.body}</p>
        {state === "done" ? (
          <p role="status" className="mt-6 inline-flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 text-start">
            <MailCheck className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
            {copy.expired.done}
          </p>
        ) : (
          <button
            type="button"
            onClick={resend}
            disabled={state === "sending"}
            className="inline-flex items-center gap-1.5 mt-6 px-5 py-2.5 rounded-xl bg-[#FF5C4D] hover:bg-[#C2410C] disabled:opacity-70 text-white text-sm font-bold transition-colors"
          >
            {state === "sending" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden />}
            {state === "sending" ? copy.expired.sending : copy.expired.cta}
          </button>
        )}
        <p className="mt-6">
          <Link href={getLocalizedPathname("/diagnostic", locale)} className="text-sm font-semibold text-[#FF8473] hover:underline">
            {copy.expired.startNew}
          </Link>
        </p>
      </div>
    </main>
  );
}
