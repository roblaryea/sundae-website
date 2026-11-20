// Local stand-in for the Sundae backend's public marketing endpoints used by
// the Operations Diagnostic. Never sends mail and never reaches production.
//
//   POST /api/v1/public/marketing/leads               -> 201, records the lead
//   GET  /api/v1/public/marketing/leads/report?token= -> 200 / 410 / 404
//   POST /api/v1/public/marketing/leads/report/resend -> 202, records the token
//   GET  /leads, /resends, /reset, /health            -> assertions
import { createServer } from 'node:http';

const PORT = Number(process.env.DIAGNOSTIC_FIXTURE_PORT || 4321);
let leads = [];
let resends = [];

const readBody = (req) => new Promise((resolve) => {
  let data = '';
  req.on('data', (chunk) => { data += chunk; });
  req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch { resolve({}); } });
});

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const json = (body, status = 200) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };

  if (url.pathname === '/health') return json({ ok: true });
  if (url.pathname === '/leads') return json({ leads });
  if (url.pathname === '/resends') return json({ resends });
  if (url.pathname === '/reset') { leads = []; resends = []; return json({ ok: true }); }

  if (url.pathname === '/api/v1/public/marketing/leads' && req.method === 'POST') {
    const body = await readBody(req);
    leads.push(body);
    return json({ ok: true, leadId: `lead-${leads.length}`, leadNumber: `L-${1000 + leads.length}` }, 201);
  }

  if (url.pathname === '/api/v1/public/marketing/leads/report' && req.method === 'GET') {
    const token = url.searchParams.get('token') ?? '';
    if (token === 'expired-report-token-0001') return json({ error: 'report_link_expired' }, 410);
    if (token === 'valid-report-token-0001') {
      const lead = [...leads].reverse().find((item) => item?.metadata?.report);
      if (!lead) return json({ error: 'no_report' }, 404);
      return json({ report: lead.metadata.report, company: lead.company, name: lead.fullName, locale: lead.metadata.locale ?? null });
    }
    return json({ error: 'not_found' }, 404);
  }

  if (url.pathname === '/api/v1/public/marketing/leads/report/resend' && req.method === 'POST') {
    const body = await readBody(req);
    resends.push(body);
    return json({ ok: true }, 202);
  }

  return json({ error: 'not_found' }, 404);
});

server.listen(PORT, '127.0.0.1', () => console.log(`diagnostic fixture on ${PORT}`));
