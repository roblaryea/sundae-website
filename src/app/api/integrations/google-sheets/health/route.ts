import { NextResponse } from 'next/server';
import { testGoogleSheetsConnection } from '@/lib/googleSheetsClient';

// Force Node.js runtime (required for Google Auth crypto operations)
export const runtime = 'nodejs';

// Force dynamic rendering (no caching)
export const dynamic = 'force-dynamic';

export async function GET() {
  // Test Google Sheets connection
  try {
    const healthCheck = await testGoogleSheetsConnection();

    const response = {
      ok: healthCheck.ok,
      timestamp: new Date().toISOString(),
      sheetId: healthCheck.sheetId,
      rowCount: healthCheck.rowCount,
      error: healthCheck.error,
      // Safe debug info (no secrets)
      debug: healthCheck.debug ? {
        startsWithBegin: healthCheck.debug.keyStartsCorrectly,
        hasEnd: healthCheck.debug.keyEndsCorrectly,
        keyLength: healthCheck.debug.keyLength,
      } : undefined,
      statusCode: healthCheck.ok ? 200 : 503,
    };

    return NextResponse.json(response, { 
      status: healthCheck.ok ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    const response = {
      ok: false,
      timestamp: new Date().toISOString(),
      error: 'Health check failed: ' + (error.message || 'Unknown error'),
      statusCode: 500,
    };

    return NextResponse.json(response, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}
