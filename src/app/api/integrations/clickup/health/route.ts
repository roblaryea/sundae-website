import { NextResponse } from 'next/server';
import { testClickUpHealth } from '@/lib/clickupClient';

// Cache health check results for 60 seconds to avoid hammering ClickUp API
let cachedResult: {
  timestamp: number;
  response: any;
} | null = null;

const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function GET() {
  const now = Date.now();

  // Return cached result if still valid
  if (cachedResult && (now - cachedResult.timestamp) < CACHE_TTL_MS) {
    return NextResponse.json({
      ...cachedResult.response,
      cached: true,
      cacheAge: Math.round((now - cachedResult.timestamp) / 1000),
    });
  }

  // Check if API token is configured
  const apiToken = process.env.CLICKUP_API_TOKEN;
  
  if (!apiToken) {
    const response = {
      ok: false,
      timestamp: new Date().toISOString(),
      error: 'CLICKUP_API_TOKEN not configured',
      statusCode: 503,
    };

    // Cache the error result too
    cachedResult = {
      timestamp: now,
      response,
    };

    return NextResponse.json(response, { status: 503 });
  }

  // Test ClickUp API health
  try {
    const healthCheck = await testClickUpHealth(apiToken, 5000);

    const response = {
      ok: healthCheck.ok,
      timestamp: new Date().toISOString(),
      latencyMs: healthCheck.latencyMs,
      error: healthCheck.error,
      statusCode: healthCheck.ok ? 200 : 503,
    };

    // Cache the result
    cachedResult = {
      timestamp: now,
      response,
    };

    return NextResponse.json(response, { 
      status: healthCheck.ok ? 200 : 503 
    });
  } catch (error: any) {
    const response = {
      ok: false,
      timestamp: new Date().toISOString(),
      error: 'Health check failed: ' + (error.message || 'Unknown error'),
      statusCode: 500,
    };

    // Cache the error result
    cachedResult = {
      timestamp: now,
      response,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
