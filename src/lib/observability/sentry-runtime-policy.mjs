const PRODUCTION_HOSTS = new Set(["sundae.io", "www.sundae.io"]);
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/** Keep every error event, while retaining a useful sample of error replays. */
export const PRODUCTION_ERROR_REPLAY_SAMPLE_RATE = 0.2;

function normalize(value) {
  return value?.trim().toLowerCase() ?? "";
}

function hostnameFromUrl(value) {
  if (!value) return "";

  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function resolveHostname(context) {
  return normalize(context.hostname) || hostnameFromUrl(context.publicSiteUrl);
}

export function resolveSentryEnvironment(context) {
  const hostname = resolveHostname(context);

  if (PRODUCTION_HOSTS.has(hostname)) return "production";
  if (LOCAL_HOSTS.has(hostname)) return "local";
  if (hostname.endsWith(".vercel.app")) return "preview";

  const platformEnvironment = normalize(context.vercelEnvironment);
  if (platformEnvironment === "production") return "production";
  if (platformEnvironment === "preview") return "preview";
  if (platformEnvironment === "development") return "development";

  const nodeEnvironment = normalize(context.nodeEnvironment);
  if (nodeEnvironment === "production") return "production";
  if (nodeEnvironment === "development") return "development";
  if (nodeEnvironment === "test") return "test";

  return "unknown";
}

export function getSentryClientReplayPolicy(context) {
  const hostname = resolveHostname(context);

  return {
    environment: resolveSentryEnvironment(context),
    replaysSessionSampleRate: 0,
    // Preview and local diagnostics must not spend the production replay budget.
    replaysOnErrorSampleRate: PRODUCTION_HOSTS.has(hostname)
      ? PRODUCTION_ERROR_REPLAY_SAMPLE_RATE
      : 0,
  };
}
