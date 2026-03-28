import { NextRequest } from 'next/server'

/**
 * TikTok OAuth initiation — redirects user to TikTok authorization page.
 * GET /api/auth/tiktok?client_key=xxx
 */
export async function GET(request: NextRequest) {
  const clientKey = request.nextUrl.searchParams.get('client_key')

  if (clientKey) {
    const redirectUri = encodeURIComponent('https://www.sundae.io/api/auth/tiktok/callback')
    const scope = encodeURIComponent('user.info.basic,user.info.stats,user.info.profile,video.list')
    const state = 'sundae_tiktok_' + Date.now()
    const tiktokUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&scope=${scope}&response_type=code&redirect_uri=${redirectUri}&state=${state}`
    return Response.redirect(tiktokUrl)
  }

  // Show the demo connect page
  return new Response(renderConnectPage(), {
    headers: { 'Content-Type': 'text/html' },
  })
}

function renderConnectPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connect TikTok - Sundae Marketing</title>
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
      max-width: 520px;
      text-align: center;
    }
    .logo { margin-bottom: 32px; }
    .logo img { height: 40px; }
    h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    .subtitle { font-size: 14px; color: #9ca3af; margin-bottom: 32px; }
    .tiktok-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #000;
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 14px 32px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.15s;
    }
    .tiktok-btn:hover { transform: scale(1.02); }
    .tiktok-icon {
      width: 24px; height: 24px;
      background: linear-gradient(135deg, #69C9D0, #EE1D52);
      border-radius: 4px;
    }
    .scopes {
      margin-top: 32px;
      text-align: left;
      background: #1a2332;
      border-radius: 8px;
      padding: 16px 20px;
    }
    .scopes h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 12px; }
    .scope-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #d1d5db;
      margin-bottom: 8px;
    }
    .scope-item .dot { width: 6px; height: 6px; border-radius: 50%; background: #2BB5A0; }
    .input-group { margin-bottom: 24px; text-align: left; }
    .input-group label { display: block; font-size: 13px; color: #9ca3af; margin-bottom: 6px; }
    .input-group input {
      width: 100%;
      padding: 10px 14px;
      background: #1a2332;
      border: 1px solid #2a3a4d;
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
      outline: none;
    }
    .input-group input:focus { border-color: #1C47FF; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <img src="/logos/sundae-wordmark.png" alt="Sundae" />
    </div>
    <h1>Connect TikTok</h1>
    <p class="subtitle">Link your TikTok business account to Sundae Marketing</p>

    <div class="input-group">
      <label>TikTok Client Key</label>
      <input type="text" id="clientKey" placeholder="Enter your TikTok app Client Key" />
    </div>

    <a href="#" class="tiktok-btn" id="connectBtn" onclick="connect(event)">
      <div class="tiktok-icon"></div>
      Connect with TikTok
    </a>

    <div class="scopes">
      <h3>Permissions requested</h3>
      <div class="scope-item"><span class="dot"></span> user.info.basic — Account identity</div>
      <div class="scope-item"><span class="dot"></span> user.info.stats — Follower and video counts</div>
      <div class="scope-item"><span class="dot"></span> user.info.profile — Bio and profile link</div>
      <div class="scope-item"><span class="dot"></span> video.list — Read public videos</div>
    </div>
  </div>

  <script>
    function connect(e) {
      e.preventDefault();
      const key = document.getElementById('clientKey').value.trim();
      if (!key) { alert('Enter your TikTok Client Key first'); return; }
      window.location.href = '/api/auth/tiktok?client_key=' + encodeURIComponent(key);
    }
  </script>
</body>
</html>`
}
