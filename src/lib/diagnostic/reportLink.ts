/**
 * Shared helpers for the emailed report link (spec section 7).
 *
 * The backend signs report links. New links expire after 90 days; the
 * backend then answers 410 {"error":"report_link_expired"} and offers a
 * re-send. The website feature-detects that answer: until the backend ships
 * it, an invalid or unknown link still answers 404 and the page keeps its
 * not-found view.
 */

export const REPORT_TOKEN_PATTERN = /^[A-Za-z0-9._-]{10,2048}$/;

export function isPlausibleReportToken(token: unknown): token is string {
  return typeof token === "string" && REPORT_TOKEN_PATTERN.test(token);
}

export function reportBackendUrl(): string {
  return (process.env.SUNDAE_BACKEND_URL || "https://api.sundaetech.ai").replace(/\/$/, "");
}

export type ReportLookup<T> =
  | { status: "ok"; data: T }
  | { status: "expired" }
  | { status: "not_found" };

/** Reads the backend's answer for a report link without throwing. */
export async function classifyReportResponse<T>(
  response: Pick<Response, "status" | "ok" | "json">,
  isReport: (data: unknown) => data is T,
): Promise<ReportLookup<T>> {
  if (response.status === 410) {
    const body = (await response.json().catch(() => null)) as { error?: unknown } | null;
    return body?.error === "report_link_expired" ? { status: "expired" } : { status: "not_found" };
  }
  if (!response.ok) return { status: "not_found" };
  const data = await response.json().catch(() => null);
  return isReport(data) ? { status: "ok", data } : { status: "not_found" };
}

/**
 * A stored report the shareable page can render: v2 reports and the older
 * shape both carry a summary, hypotheses and a plan. Lives outside the
 * client view so the server page can call it.
 */
export function isRenderableReport(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const report = value as Record<string, unknown>;
  return typeof report.summary === "string" && Array.isArray(report.topLeaks) && Array.isArray(report.quickWins);
}
