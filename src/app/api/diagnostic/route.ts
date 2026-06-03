// AI-powered Diagnostic API
//
// POST /api/diagnostic
//   Body: { responses: DiagnosticResponses, leadData: { name, role, country, company } }
//   Returns: DiagnosticReport (same shape as the heuristic engine — UI-compatible)
//
// Resolution chain (direct provider keys first; gateway is a residual fallback):
//   1. Direct Anthropic  (ANTHROPIC_API_KEY)  → claude-sonnet-4-6  [primary voice]
//   2. Direct OpenAI     (OPENAI_API_KEY)      → gpt-5             [cross-provider resilience]
//   3. Vercel AI Gateway (AI_GATEWAY_API_KEY / VERCEL_OIDC_TOKEN) → bare "provider/model"
//      strings via ai-gateway.vercel.sh. Residual only — used when no direct key is set.
//      (Gateway model access is plan-gated; the free tier 403s anthropic/claude-sonnet-4-6.)
//   4. Deterministic heuristic engine — guarantees a report is ALWAYS produced.
//
// Env vars (set per environment in the Vercel project):
//   ANTHROPIC_API_KEY  — direct Anthropic key (sk-ant-…). Primary path.
//   OPENAI_API_KEY     — direct OpenAI key (sk-…). Fallback path.
//   AI_GATEWAY_API_KEY — optional Vercel AI Gateway key (residual path only).

import { NextResponse } from 'next/server';
import { generateObject, type LanguageModel } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { checkBotId } from 'botid/server';
import { DiagnosticReportSchema } from '@/lib/diagnostic/schema';
import { SYSTEM_PROMPT, buildUserMessage } from '@/lib/diagnostic/promptBuilder';
import { runDiagnostic, type DiagnosticResponses } from '@/lib/diagnostic/engine';
import { getClientIp, isSameOrigin, checkRateLimit } from '@/lib/diagnostic/abuse-guard';
import { normalizeWebsiteLocale, type WebsiteLocale } from '@/lib/i18n';

export const runtime = 'nodejs';
// The residual gateway path can spend up to ~60s on a plan-blocked model before
// erroring; the direct paths are far faster. Keep generous headroom so the
// function is never killed mid-flight (Vercel allows up to 300s). Without this
// a slow chain would 504 and the client-side heuristic would fire after a long spin.
export const maxDuration = 180;

const ANTHROPIC_MODEL = 'claude-sonnet-4-6';
const OPENAI_MODEL = 'gpt-5';

type LeadData = {
  name: string;
  role: string;
  country: string;
  company: string;
};

type Attempt = { source: string; model: LanguageModel; temperature?: number };

function hasKey(name: string): boolean {
  const v = process.env[name];
  return typeof v === 'string' && v.trim().length > 0;
}

// Build the ordered list of model attempts based on which credentials are present.
// Direct provider keys come first; the gateway is appended last as a residual.
function buildChain(): Attempt[] {
  const chain: Attempt[] = [];

  if (hasKey('ANTHROPIC_API_KEY')) {
    chain.push({ source: 'sonnet-4.6', model: anthropic(ANTHROPIC_MODEL), temperature: 0.6 });
  }
  if (hasKey('OPENAI_API_KEY')) {
    // gpt-5 is a reasoning model — omit temperature (it can reject non-default values).
    chain.push({ source: 'gpt-5', model: openai(OPENAI_MODEL) });
  }

  // Residual: only reached if the direct keys are absent or both fail.
  if (hasKey('AI_GATEWAY_API_KEY') || hasKey('VERCEL_OIDC_TOKEN')) {
    chain.push({ source: 'gateway:sonnet-4.6', model: `anthropic/${ANTHROPIC_MODEL}`, temperature: 0.6 });
    chain.push({ source: 'gateway:gpt-5', model: `openai/${OPENAI_MODEL}` });
  }

  return chain;
}

async function generateWithModel(
  attempt: Attempt,
  responses: DiagnosticResponses,
  leadData: LeadData,
  locale: WebsiteLocale,
) {
  const userMessage = buildUserMessage(responses, leadData, locale);

  // Vercel AI SDK with structured output. A LanguageModel instance from
  // @ai-sdk/anthropic / @ai-sdk/openai uses the direct provider key
  // (ANTHROPIC_API_KEY / OPENAI_API_KEY). A bare "provider/model" string is
  // instead resolved by the SDK's default Gateway provider and routed through
  // the Vercel AI Gateway — that is the residual path only.
  const result = await generateObject({
    model: attempt.model,
    schema: DiagnosticReportSchema,
    system: SYSTEM_PROMPT,
    prompt: userMessage,
    temperature: attempt.temperature,
    maxRetries: 1,
  });

  return result.object;
}

export async function POST(req: Request) {
  // ─── Anti-abuse guards (run BEFORE any paid model call) ───────
  // 1) Same-origin: block direct/cross-site POSTs (most scripted abuse).
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 2) Rate limit: per-IP cap + global hourly circuit-breaker on spend.
  const rate = checkRateLimit(getClientIp(req), Date.now());
  if (!rate.ok) {
    return NextResponse.json(
      {
        error:
          rate.scope === 'global'
            ? 'The diagnostic is experiencing high demand. Please try again later.'
            : 'Too many diagnostics from your network. Please try again later.',
      },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } },
    );
  }

  // 3) Vercel BotID: classify and block bots/crawlers that spoof a same-origin
  //    header. Fail-open (never let a classifier outage break real prospects);
  //    bypass in development so local runs are never blocked.
  try {
    const verdict = await checkBotId({ developmentOptions: { bypass: 'HUMAN' } });
    if (verdict.isBot) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  } catch (botErr) {
    console.error('[diagnostic] BotID check errored (failing open):', botErr);
  }

  let body: { responses: DiagnosticResponses; leadData: LeadData; locale?: string | null };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { responses, leadData } = body;
  const locale = normalizeWebsiteLocale(body.locale);
  if (!responses || !leadData) {
    return NextResponse.json({ error: 'Missing responses or leadData' }, { status: 400 });
  }

  // ─── Walk the resolution chain: direct providers → gateway → heuristic ───
  const chain = buildChain();
  for (const attempt of chain) {
    try {
      const report = await generateWithModel(attempt, responses, leadData, locale);
      return NextResponse.json({ report, source: attempt.source });
    } catch (err) {
      console.error(`[diagnostic] ${attempt.source} failed:`, err);
    }
  }

  if (locale !== 'en') {
    return NextResponse.json(
      { error: 'Localized diagnostic generation is temporarily unavailable' },
      { status: 503 },
    );
  }

  // ─── Final safety net: deterministic English heuristic engine ─────────
  // The heuristic engine is intentionally English-only. Non-English locales
  // fail cleanly above rather than receiving an English report.
  try {
    const report = runDiagnostic(responses, locale);
    return NextResponse.json({
      report,
      source: 'heuristic-fallback',
      warning: 'AI providers unavailable — using deterministic engine. Quality may be lower.',
    });
  } catch (heuristicErr) {
    console.error('[diagnostic] Heuristic engine also failed:', heuristicErr);
    return NextResponse.json(
      { error: 'Diagnostic generation failed across all engines' },
      { status: 500 },
    );
  }
}
