// AI-powered Diagnostic API
//
// POST /api/diagnostic
//   Body: { responses: DiagnosticResponses, leadData: { name, role, country, company } }
//   Returns: DiagnosticReport (same shape as the heuristic engine - UI-compatible)
//
// Resolution chain (direct provider keys first; gateway is a residual fallback):
//   1. Direct OpenAI     (OPENAI_API_KEY)      → gpt-5-mini        [fast structured report]
//   2. Direct Anthropic  (ANTHROPIC_API_KEY)   → claude-haiku-4-5  [cross-provider resilience]
//   3. Vercel AI Gateway (AI_GATEWAY_API_KEY / VERCEL_OIDC_TOKEN) → bare "provider/model"
//      strings via ai-gateway.vercel.sh. Residual only - used when no direct key is set.
//      (Gateway model access may be plan-gated; direct provider keys remain preferred.)
//   4. Deterministic heuristic engine - guarantees a report is ALWAYS produced.
//
// Env vars (set per environment in the Vercel project):
//   OPENAI_API_KEY     - direct OpenAI key (sk-...). Primary path.
//   ANTHROPIC_API_KEY  - direct Anthropic key (sk-ant-...). Fallback path.
//   AI_GATEWAY_API_KEY - optional Vercel AI Gateway key (residual path only).

import { NextResponse } from 'next/server';
import { generateObject, type LanguageModel } from 'ai';
import type { SharedV3ProviderOptions } from '@ai-sdk/provider';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { checkBotId } from 'botid/server';
import { DiagnosticNarrativeSchema } from '@/lib/diagnostic/schema';
import { SYSTEM_PROMPT, buildUserMessage } from '@/lib/diagnostic/promptBuilder';
import { runDiagnostic, type DiagnosticResponses } from '@/lib/diagnostic/engine';
import { groundGeneratedDiagnostic } from '@/lib/diagnostic/reportGuard';
import { getClientIp, isSameOrigin, checkRateLimit } from '@/lib/diagnostic/abuse-guard';
import { normalizeWebsiteLocale, type WebsiteLocale } from '@/lib/i18n';

export const runtime = 'nodejs';
// Keep the function above the explicit generation budget. The route stops slow
// provider attempts and returns the deterministic report before the browser's
// own safety timeout, so a finished prospect never waits through a long chain.
export const maxDuration = 60;

const ANTHROPIC_MODEL = 'claude-haiku-4-5';
const OPENAI_MODEL = 'gpt-5-mini';
const TOTAL_GENERATION_BUDGET_MS = 32_000;
const MODEL_ATTEMPT_TIMEOUT_MS = 28_000;
const MIN_FALLBACK_ATTEMPT_MS = 6_000;

type LeadData = {
  name: string;
  role: string;
  country: string;
  company: string;
};

type Attempt = {
  source: string;
  model: LanguageModel;
  temperature?: number;
  providerOptions?: SharedV3ProviderOptions;
};

function hasKey(name: string): boolean {
  const v = process.env[name];
  return typeof v === 'string' && v.trim().length > 0;
}

// Build the ordered list of model attempts based on which credentials are present.
// Direct provider keys come first; the gateway is appended last as a residual.
function buildChain(): Attempt[] {
  const chain: Attempt[] = [];

  if (hasKey('OPENAI_API_KEY')) {
    // Keep reasoning minimal: the deterministic layer already owns eligibility,
    // quantified claims, and pricing; the model is writing the narrative.
    chain.push({
      source: 'gpt-5-mini',
      model: openai(OPENAI_MODEL),
      providerOptions: { openai: { reasoningEffort: 'minimal' } },
    });
  }
  if (hasKey('ANTHROPIC_API_KEY')) {
    chain.push({ source: 'haiku-4.5', model: anthropic(ANTHROPIC_MODEL), temperature: 0.4 });
  }

  // Residual: only reached if the direct keys are absent or both fail.
  if (hasKey('AI_GATEWAY_API_KEY') || hasKey('VERCEL_OIDC_TOKEN')) {
    chain.push({
      source: 'gateway:gpt-5-mini',
      model: `openai/${OPENAI_MODEL}`,
      providerOptions: { openai: { reasoningEffort: 'minimal' } },
    });
    chain.push({ source: 'gateway:haiku-4.5', model: `anthropic/${ANTHROPIC_MODEL}`, temperature: 0.4 });
  }

  return chain;
}

async function generateWithModel(
  attempt: Attempt,
  responses: DiagnosticResponses,
  leadData: LeadData,
  locale: WebsiteLocale,
  abortSignal: AbortSignal,
) {
  const referenceReport = runDiagnostic(responses, locale);
  const userMessage = buildUserMessage(responses, leadData, locale, referenceReport);

  // Vercel AI SDK with structured output. A LanguageModel instance from
  // @ai-sdk/anthropic / @ai-sdk/openai uses the direct provider key
  // (ANTHROPIC_API_KEY / OPENAI_API_KEY). A bare "provider/model" string is
  // instead resolved by the SDK's default Gateway provider and routed through
  // the Vercel AI Gateway - that is the residual path only.
  const result = await generateObject({
    model: attempt.model,
    schema: DiagnosticNarrativeSchema,
    system: SYSTEM_PROMPT,
    prompt: userMessage,
    temperature: attempt.temperature,
    maxRetries: 0,
    maxOutputTokens: 2_200,
    providerOptions: attempt.providerOptions,
    abortSignal,
  });

  return groundGeneratedDiagnostic(result.object, referenceReport);
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
  const generationStartedAt = Date.now();
  for (const attempt of chain) {
    const remainingMs = TOTAL_GENERATION_BUDGET_MS - (Date.now() - generationStartedAt);
    // A provider cannot reliably produce and validate this structured report
    // in only a few residual seconds. Return the grounded deterministic report
    // instead of spending that time on a fallback that is certain to time out.
    if (remainingMs < MIN_FALLBACK_ATTEMPT_MS) break;
    try {
      const attemptTimeoutMs = Math.min(MODEL_ATTEMPT_TIMEOUT_MS, remainingMs);
      const report = await generateWithModel(
        attempt,
        responses,
        leadData,
        locale,
        AbortSignal.timeout(attemptTimeoutMs),
      );
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
      warning: 'AI providers unavailable - using deterministic engine. Quality may be lower.',
    });
  } catch (heuristicErr) {
    console.error('[diagnostic] Heuristic engine also failed:', heuristicErr);
    return NextResponse.json(
      { error: 'Diagnostic generation failed across all engines' },
      { status: 500 },
    );
  }
}
