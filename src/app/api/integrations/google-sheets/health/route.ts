import { NextResponse } from 'next/server';
import { testGoogleSheetsConnection } from '@/lib/googleSheetsClient';

// Force Node.js runtime (required for Google Auth crypto operations)
export const runtime = 'nodejs';

// Cache health check results for 60 seconds
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

  // Test Google Sheets connection
  try {
    const healthCheck = await testGoogleSheetsConnection();

    const response = {
      ok: healthCheck.ok,
      timestamp: new Date().toISOString(),
      sheetId: healthCheck.sheetId,
      rowCount: healthCheck.rowCount,
      error: healthCheck.error,
      debug: healthCheck.debug,
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
