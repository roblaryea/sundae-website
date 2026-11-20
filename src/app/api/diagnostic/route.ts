// Operations Diagnostic API
//
// POST /api/diagnostic
//   Body: { responses, leadData: { name, role, company }, locale }
//   Returns: { report, source } - the same DiagnosticReport shape whichever path ran.
//
// The rules engine decides everything first (package, Crew, add-ons, price,
// hypotheses). A model then writes only the summary, leak explanations,
// 30/60/90 text and one Crew sentence, and the guard checks every one of those
// fields. Resolution chain for the narrative:
//   1. Direct OpenAI     (OPENAI_API_KEY)      -> gpt-5-mini
//   2. Direct Anthropic  (ANTHROPIC_API_KEY)   -> claude-haiku-4-5
//   3. Vercel AI Gateway (AI_GATEWAY_API_KEY / VERCEL_OIDC_TOKEN), residual only
//   4. The rules report on its own - localized for every website locale.

import { NextResponse } from 'next/server';
import { generateObject, type LanguageModel } from 'ai';
import type { SharedV3ProviderOptions } from '@ai-sdk/provider';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { checkBotId } from 'botid/server';
import { DiagnosticNarrativeSchema } from '@/lib/diagnostic/schema';
import { SYSTEM_PROMPT, buildUserMessage } from '@/lib/diagnostic/promptBuilder';
import { runDiagnostic, runDiagnosticWithRules, type DiagnosticReport, type DiagnosticResponses } from '@/lib/diagnostic/engine';
import { guardContextFor, guardNarrative } from '@/lib/diagnostic/reportGuard';
import { sanitizeDiagnosticResponses } from '@/lib/diagnostic/sanitize';
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
  reference: ReturnType<typeof runDiagnosticWithRules>,
  envelope: DiagnosticReport,
  abortSignal: AbortSignal,
) {
  const userMessage = buildUserMessage(responses, leadData, locale, envelope, reference.recommendation);

  // A LanguageModel instance uses the direct provider key; a bare
  // "provider/model" string is resolved through the Vercel AI Gateway.
  const result = await generateObject({
    model: attempt.model,
    schema: DiagnosticNarrativeSchema,
    system: SYSTEM_PROMPT,
    prompt: userMessage,
    temperature: attempt.temperature,
    maxRetries: 0,
    maxOutputTokens: 1_600,
    providerOptions: attempt.providerOptions,
    abortSignal,
  });

  const outcome = guardNarrative(result.object, reference.report, guardContextFor(reference.report, leadData.name));
  if (outcome.replaced.length) {
    // Field names and rule ids only - never the text, which may hold personal data.
    console.warn('[diagnostic] guard replaced fields', outcome.replaced.map((item) => `${item.field}:${item.rules.join('+')}`).join(', '));
  }
  return outcome.report;
}

function readLeadData(value: unknown): LeadData | null {
  if (!value || typeof value !== 'object') return null;
  const lead = value as Record<string, unknown>;
  const text = (input: unknown, max: number) => (typeof input === 'string' ? input.trim().slice(0, max) : '');
  return { name: text(lead.name, 80), role: text(lead.role, 40), company: text(lead.company, 120) };
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

  let body: { responses?: unknown; leadData?: unknown; locale?: string | null };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const responses = sanitizeDiagnosticResponses(body.responses);
  const leadData = readLeadData(body.leadData);
  const locale = normalizeWebsiteLocale(body.locale);
  if (!responses || !leadData) {
    return NextResponse.json({ error: 'Missing responses or leadData' }, { status: 400 });
  }

  let reference: ReturnType<typeof runDiagnosticWithRules>;
  try {
    reference = runDiagnosticWithRules(responses, locale);
  } catch (rulesErr) {
    console.error('[diagnostic] Rules engine failed:', rulesErr);
    return NextResponse.json({ error: 'Diagnostic generation failed' }, { status: 500 });
  }
  // The model reads the envelope in English whatever language it writes in.
  const envelope = locale === 'en' ? reference.report : runDiagnostic(responses, 'en');

  // ─── Narrative: direct providers -> gateway -> rules report ───
  const chain = buildChain();
  const generationStartedAt = Date.now();
  for (const attempt of chain) {
    const remainingMs = TOTAL_GENERATION_BUDGET_MS - (Date.now() - generationStartedAt);
    // A provider cannot reliably produce and validate this structured narrative
    // in only a few residual seconds. Return the rules report instead.
    if (remainingMs < MIN_FALLBACK_ATTEMPT_MS) break;
    try {
      const attemptTimeoutMs = Math.min(MODEL_ATTEMPT_TIMEOUT_MS, remainingMs);
      const report = await generateWithModel(
        attempt,
        responses,
        leadData,
        locale,
        reference,
        envelope,
        AbortSignal.timeout(attemptTimeoutMs),
      );
      return NextResponse.json({ report, source: attempt.source });
    } catch (err) {
      console.error(`[diagnostic] ${attempt.source} failed:`, err);
    }
  }

  // ─── Rules report: complete and localized for every locale ───
  return NextResponse.json({ report: reference.report, source: 'rules' });
}
