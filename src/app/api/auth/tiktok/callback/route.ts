import { NextRequest } from 'next/server'

/**
 * TikTok OAuth callback handler.
 * Receives the authorization code after user approves the app.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')
  const error = request.nextUrl.searchParams.get('error')

  if (error) {
    return new Response(renderPage('Authorization Denied', 'The user denied the TikTok authorization request.', false), {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  if (!code) {
    return new Response(renderPage('Missing Code', 'No authorization code received from TikTok.', false), {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  return new Response(
    renderPage(
      'TikTok Connected Successfully',
      `Authorization code received. Your TikTok account has been connected to Sundae Marketing.`,
      true,
      code,
    ),
    { headers: { 'Content-Type': 'text/html' } },
  )
}

function renderPage(title: string, message: string, success: boolean, code?: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Sundae</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
      background: #1A2332;
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: #0f1923;
      border: 1px solid #2a3a4d;
      border-radius: 16px;
      padding: 48px;
      max-width: 480px;
      text-align: center;
    }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { font-size: 24px; font-weight: 700; margin-bottom: 12px; color: ${success ? '#2BB5A0' : '#DC2626'}; }
    p { font-size: 16px; color: #9ca3af; line-height: 1.6; margin-bottom: 24px; }
    .code {
      background: #1a2332;
      border: 1px solid #2a3a4d;
      border-radius: 8px;
      padding: 12px 16px;
      font-family: 'Geist Mono', monospace;
      font-size: 12px;
      color: #6b7280;
      word-break: break-all;
      margin-bottom: 24px;
    }
    .logo { margin-bottom: 24px; }
    .logo img { height: 40px; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 500;
      background: ${success ? 'rgba(43, 181, 160, 0.15)' : 'rgba(220, 38, 38, 0.15)'};
      color: ${success ? '#2BB5A0' : '#DC2626'};
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <img src="/logos/sundae-wordmark.png" alt="Sundae" />
    </div>
    <div class="icon">${success ? '✓' : '✗'}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    ${code ? `<div class="code">Code: ${code.slice(0, 20)}...</div>` : ''}
    <span class="badge">${success ? '● Connected' : '● Failed'}</span>
  </div>
</body>
</html>`
}
