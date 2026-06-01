// AI-powered Diagnostic API
//
// POST /api/diagnostic
//   Body: { responses: DiagnosticResponses, leadData: { name, role, country, company } }
//   Returns: DiagnosticReport (same shape as the heuristic engine — UI-compatible)
//
// Chain:
//   1. Try Claude Sonnet 4.6 via Vercel AI Gateway (primary)
//   2. If Anthropic fails → fall to GPT-5 (cross-provider resilience)
//   3. If both AI providers fail → fall to deterministic heuristic engine
//      (so a diagnostic is ALWAYS produced — graceful degradation, never an error)
//
// Env vars (set in Vercel project):
//   AI_GATEWAY_API_KEY        — Vercel AI Gateway key (preferred — unified routing,
//                                observability, automatic fallback policies)
//   OR separately:
//   ANTHROPIC_API_KEY         — direct Anthropic key (used if AI_GATEWAY_API_KEY absent)
//   OPENAI_API_KEY            — direct OpenAI key for GPT-5 fallback

import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { DiagnosticReportSchema } from '@/lib/diagnostic/schema';
import { SYSTEM_PROMPT, buildUserMessage } from '@/lib/diagnostic/promptBuilder';
import { runDiagnostic, type DiagnosticResponses } from '@/lib/diagnostic/engine';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MODEL_PRIMARY = 'anthropic/claude-sonnet-4-6';
const MODEL_FALLBACK = 'openai/gpt-5';

type LeadData = {
  name: string;
  role: string;
  country: string;
  company: string;
};

async function generateWithModel(
  modelId: string,
  responses: DiagnosticResponses,
  leadData: LeadData,
) {
  const userMessage = buildUserMessage(responses, leadData);

  // Vercel AI SDK with structured output. The `model` string is provider/model
  // format that the gateway routes to the right provider. If no gateway
  // key is set, the SDK falls back to direct provider keys (ANTHROPIC_API_KEY
  // for anthropic/*, OPENAI_API_KEY for openai/*).
  const result = await generateObject({
    model: modelId,
    schema: DiagnosticReportSchema,
    system: SYSTEM_PROMPT,
    prompt: userMessage,
    temperature: 0.6,
    maxRetries: 1,
  });

  return result.object;
}

export async function POST(req: Request) {
  let body: { responses: DiagnosticResponses; leadData: LeadData };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { responses, leadData } = body;
  if (!responses || !leadData) {
    return NextResponse.json({ error: 'Missing responses or leadData' }, { status: 400 });
  }

  // ─── Try Sonnet 4.6 first ─────────────────────────────────────
  try {
    const report = await generateWithModel(MODEL_PRIMARY, responses, leadData);
    return NextResponse.json({ report, source: 'sonnet-4.6' });
  } catch (primaryErr) {
    console.error('[diagnostic] Sonnet 4.6 failed:', primaryErr);
  }

  // ─── Fall to GPT-5 (cross-provider resilience) ────────────────
  try {
    const report = await generateWithModel(MODEL_FALLBACK, responses, leadData);
    return NextResponse.json({ report, source: 'gpt-5' });
  } catch (fallbackErr) {
    console.error('[diagnostic] GPT-5 fallback failed:', fallbackErr);
  }

  // ─── Final safety net: deterministic heuristic engine ─────────
  // Diagnostics ALWAYS produce something. The heuristic engine guarantees
  // a usable report even if both AI providers are down — no error pages.
  try {
    const report = runDiagnostic(responses);
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
