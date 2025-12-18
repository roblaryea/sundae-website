import { NextResponse } from 'next/server';
import { testGoogleSheetsConnection } from '@/lib/googleSheetsClient';

// Force Node.js runtime (required for Google Auth crypto operations)
export const runtime = 'nodejs';

// Force dynamic rendering (no caching)
export const dynamic = 'force-dynamic';

export async function GET() {
  // Gather safe config info (no secrets)
  const configInfo = {
    sheetsEnabled: process.env.GOOGLE_SHEETS_ENABLED === 'true',
    hasSheetId: !!process.env.GOOGLE_SHEET_ID,
    hasServiceEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    hasPrivateKeyB64: !!process.env.GOOGLE_PRIVATE_KEY_B64,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  };

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
      config: configInfo,
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
      config: configInfo,
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
