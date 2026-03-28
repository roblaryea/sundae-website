import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const error = request.nextUrl.searchParams.get('error')

  const success = !!code && !error
  const title = success ? 'TikTok Connected Successfully' : error ? 'Authorization Denied' : 'Missing Code'
  const message = success
    ? 'Your TikTok account has been connected to Sundae Marketing. You can now publish content and track performance.'
    : error ? 'The user denied the TikTok authorization request.' : 'No authorization code received.'

  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Sundae</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; background: #1A2332; color: #fff; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .card { background: #0f1923; border: 1px solid #2a3a4d; border-radius: 16px; padding: 48px; max-width: 480px; text-align: center; }
    .logo { margin-bottom: 24px; }
    .logo img { height: 40px; }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { font-size: 24px; font-weight: 700; margin-bottom: 12px; color: ${success ? '#2BB5A0' : '#DC2626'}; }
    p { font-size: 16px; color: #9ca3af; line-height: 1.6; margin-bottom: 24px; }
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: 500; background: ${success ? 'rgba(43,181,160,0.15)' : 'rgba(220,38,38,0.15)'}; color: ${success ? '#2BB5A0' : '#DC2626'}; }
    ${success ? `.details { margin-top: 24px; text-align: left; background: #1a2332; border-radius: 8px; padding: 16px 20px; }
    .details h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 12px; }
    .detail-row { display: flex; justify-content: space-between; font-size: 14px; color: #d1d5db; margin-bottom: 8px; }
    .detail-row .val { color: #2BB5A0; font-weight: 500; }` : ''}
  </style>
</head>
<body>
  <div class="card">
    <div class="logo"><img src="/logos/sundae-wordmark.png" alt="Sundae" /></div>
    <div class="icon">${success ? '✓' : '✗'}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <span class="badge">${success ? '● Connected' : '● Failed'}</span>
    ${success ? `<div class="details">
      <h3>Connection details</h3>
      <div class="detail-row"><span>Platform</span><span class="val">TikTok Business</span></div>
      <div class="detail-row"><span>Scopes</span><span class="val">user.info, video.list</span></div>
      <div class="detail-row"><span>Status</span><span class="val">Active</span></div>
    </div>` : ''}
  </div>
</body>
</html>`, { headers: { 'Content-Type': 'text/html' } })
}
