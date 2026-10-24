// Local contract fixture. Never sends mail or reaches Microsoft Graph.
import { createServer } from 'node:http';
let captured = null;
let bookedDuration = 60;
const startAt = '2026-10-27T10:00:00.000Z';
const endAt = '2026-10-27T11:00:00.000Z';
const booking = { id: 'fixture-booking', status: 'scheduled', startAt, endAt, timezone: 'UTC', joinUrl: 'https://teams.example/call' };
const calendar = { googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20261027T100000Z%2F20261027T110000Z',
  outlookCalendarUrl: 'https://outlook.office.com/calendar/0/deeplink/compose?startdt=2026-10-27T10%3A00%3A00.000Z', ics: 'BEGIN:VCALENDAR\r\nEND:VCALENDAR' };
const personalId = '11111111-1111-4111-8111-111111111111';
const verificationId = '22222222-2222-4222-8222-222222222222';
let personalBooking = null;
let personalDuration = 60;
let personalEmail = '';
let resends = 0;
const requestBodies = [];
const decisions = [];
const personalContext = { name: '', email: '', company: 'QA Host', displayName: 'QA Host', headline: 'Sundae team', bio: 'A conversation about your business.',
  slug: 'qa-host', durationMinutes: 60, durationOptions: [30, 60, 90], offering: 'Introduction', teamTimezone: 'UTC', eventTypeId: 'intro',
  events: [{ id: 'intro', name: 'Introduction', durationMinutes: 60, durationOptions: [30, 60, 90] }, { id: 'demo', name: 'Demo', durationMinutes: 30, durationOptions: [30] }],
  formToken: 'fixture-form', senderEmail: 'host@example.com', locale: null, activeBooking: null };
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const token = url.searchParams.get('token');
  const json = (body, status = 200) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };
  if (url.pathname === '/health') return json({ ok: true });
  if (url.pathname === '/captured') return json(captured);
  if (url.pathname === '/resends') return json({ resends });
  if (url.pathname === '/requests') return json({ requests: requestBodies, decisions });
  if (url.pathname.startsWith('/api/v1/public/scheduling/')) {
    const parts = url.pathname.split('/').slice(5);
    const managed = parts[0] === 'manage';
    const action = parts.at(-1);
    if (parts[0] === 'paused') return json({ error: 'page_unavailable' }, 404);
    if (managed && (parts[1] !== personalId || token !== 'fixture-private' || !personalBooking)) return json({ error: 'invalid_link' }, 401);
    if (parts[0] === 'requests' && req.method === 'GET') {
      // Host approval page. The token selects the scenario; anything else is an invalid link.
      const view = { displayName: 'QA Host', timezone: 'UTC' };
      if (token === 'fixture-expired') return json({ ...view, status: 'expired' });
      if (token === 'fixture-used') return json({ ...view, status: 'approved' });
      if (token === 'fixture-approve' || token === 'fixture-taken')
        return json({ ...view, status: 'pending', visitor: { name: 'Ada Visitor', email: 'ada@example.com' },
          slot: { startUtc: startAt, label: 'Tue 27 Oct 2026, 10:00 UTC' }, eventTypeName: 'Introduction', durationMinutes: 30,
          discussion: 'About scheduling', expiresAt: '2026-10-29T10:00:00.000Z' });
      return json({ error: 'invalid_link' }, 401);
    }
    if (req.method === 'GET' && action === 'context') {
      if (managed) return json({ ...personalContext, events: undefined, email: personalEmail, durationMinutes: personalDuration, durationOptions: [personalDuration],
        activeBooking: personalBooking, confirmation: { booking: personalBooking, manageToken: 'fixture-private', joinUrl: booking.joinUrl, ...calendar } });
      return json({ ...personalContext, slug: parts[0], eventTypeId: url.searchParams.get('eventType') || 'intro' });
    }
    if (req.method === 'GET' && action === 'slots') {
      captured = { slotQuery: Object.fromEntries(url.searchParams), path: url.pathname };
      const duration = managed ? personalDuration : Number(url.searchParams.get('durationMinutes') || 60);
      const slot = { startUtc: startAt, endUtc: new Date(Date.parse(startAt) + duration * 60000).toISOString(), startLocal: startAt, label: '10:00 AM', dayKey: '2026-10-27' };
      const days = parts[0] === 'qa-layout' ? [27, 28, 29].map((date) => {
        const dayKey = `2026-10-${date}`;
        const slots = Array.from({ length: 16 }, (_, i) => {
          const startUtc = new Date(Date.parse(`${dayKey}T06:00:00Z`) + i * 1800000).toISOString();
          return { ...slot, startUtc, endUtc: new Date(Date.parse(startUtc) + duration * 60000).toISOString(), dayKey };
        });
        return { date: dayKey, weekdayLabel: 'Tue', slots };
      }) : [{ date: slot.dayKey, weekdayLabel: 'Tue', slots: [slot] }];
      return json({ slots: days.flatMap((day) => day.slots), days, visitorTimezone: url.searchParams.get('tz') || 'UTC', teamTimezone: 'UTC', durationMinutes: duration });
    }
    if (req.method === 'POST') {
      let raw = ''; for await (const chunk of req) raw += chunk;
      captured = { body: JSON.parse(raw), path: url.pathname };
      // Addresses select contract scenarios; the cooldown is short so specs can wait it out.
      if (action === 'verification') {
        if (captured.body.email === 'rate@example.com') return json({ error: 'rate_limited', retryAfterSeconds: 1800 }, 429);
        if (captured.body.email === 'down@example.com') return json({ error: 'verification_email_unavailable' }, 503);
        personalBooking = null; personalEmail = captured.body.email; return json({ verificationId, cooldownSeconds: Number(process.env.FIXTURE_COOLDOWN || 3) }, 202);
      }
      if (parts[0] === 'requests') {
        decisions.push({ action, body: captured.body });
        const sent = captured.body.token;
        if (sent !== 'fixture-approve' && sent !== 'fixture-taken') return json({ error: sent === 'fixture-used' ? 'request_already_decided' : 'invalid_link' }, sent === 'fixture-used' ? 409 : 401);
        if (action === 'decline') return json({ status: 'declined' });
        if (sent === 'fixture-taken' && !captured.body.slotStart)
          return json({ error: 'slot_taken', alternatives: [
            { startUtc: '2026-10-27T12:00:00.000Z', label: 'Tue 27 Oct 2026, 12:00 UTC' },
            { startUtc: '2026-10-27T13:30:00.000Z', label: 'Tue 27 Oct 2026, 13:30 UTC' }] }, 409);
        return json({ status: 'approved', booking: { id: personalId, startAt: captured.body.slotStart || startAt, endAt: endAt }, visitorEmail: 'ada@example.com', managementEmailSent: true });
      }
      if (action === 'request') {
        requestBodies.push(captured.body);
        if (captured.body.email === 'rrate@example.com') return json({ error: 'too_many_pending_requests', retryAfterSeconds: 5400 }, 429);
        if (captured.body.email === 'rdown@example.com') return json({ error: 'request_unavailable' }, 503);
        if (captured.body.email === 'rtaken@example.com') return json({ error: 'slot_unavailable' }, 409);
        if (captured.body.email === 'rold@example.com') return json({ error: 'not_found' }, 404);
        return json({ requestId: '33333333-3333-4333-8333-333333333333', expiresAt: '2026-10-29T10:00:00.000Z' }, 202);
      }
      if (action === 'resend') {
        if (captured.body.verificationId !== verificationId || personalEmail === 'gone@example.com') return json({ error: 'verification_not_found' }, 404);
        if (personalEmail === 'soon@example.com') return json({ error: 'resend_too_soon', retryAfterSeconds: 2 }, 429);
        resends++; return json({ verificationId, cooldownSeconds: Number(process.env.FIXTURE_COOLDOWN || 3) }, 202);
      }
      if (action === 'book') {
        if (captured.body.code !== '123456') return json({ error: 'invalid_or_expired_code' }, 401);
        personalDuration = captured.body.durationMinutes;
        personalBooking = { ...booking, id: personalId, endAt: new Date(Date.parse(startAt) + personalDuration * 60000).toISOString() };
        return json({ booking: personalBooking, manageToken: 'fixture-private', managementEmailSent: false, joinUrl: booking.joinUrl, ...calendar }, 201);
      }
      if (action === 'reschedule') { personalBooking.status = 'rescheduled'; return json({ booking: personalBooking, joinUrl: booking.joinUrl, ...calendar }); }
      if (action === 'cancel') { personalBooking.status = 'canceled'; return json({ booking: personalBooking }); }
    }
    return json({ error: 'not_found' }, 404);
  }
  if (url.pathname.endsWith('/context') && token === 'expired') return json({ error: 'invalid_or_expired_token' }, 401);
  if (url.pathname.endsWith('/context')) return json({ name: 'Juan', company: 'Example', email: 'juan@example.com', durationMinutes: 60, teamTimezone: 'UTC',
    durationOptions: token === 'multiple' ? [30, 60, 75] : [60],
    locale: token === 'arabic' ? 'ar' : 'en', offering: 'Sundae discovery call', eventTypeId: url.searchParams.get('eventType') || 'discovery', activeBooking: null,
    bookingQuestion: { label: 'What would you like to discuss?', enabled: true, required: token === 'required' } });
  if (url.pathname.endsWith('/slots')) {
    captured = { slotQuery: Object.fromEntries(url.searchParams) };
    if (token === 'unavailable') return json({ days: [], slots: [], graphDegraded: true });
    const tz = url.searchParams.get('tz') || 'UTC';
    const duration = url.searchParams.has('bookingId') ? bookedDuration : Number(url.searchParams.get('durationMinutes') || 60);
    const slot = { startUtc: startAt, endUtc: new Date(Date.parse(startAt) + duration * 60000).toISOString(), startLocal: startAt, label: '10:00 AM', dayKey: '2026-10-27' };
    return json({ slots: [slot], days: [{ date: slot.dayKey, weekdayLabel: 'Tue', slots: [slot] }], visitorTimezone: tz, teamTimezone: 'UTC', durationMinutes: duration });
  }
  if (req.method === 'POST') {
    let raw = ''; for await (const chunk of req) raw += chunk;
    captured = { body: JSON.parse(raw), query: Object.fromEntries(url.searchParams) };
    if (url.pathname.endsWith('/reschedule')) return json({ booking: { ...booking, endAt: new Date(Date.parse(startAt) + bookedDuration * 60000).toISOString(), status: 'rescheduled' }, ...calendar });
    if (url.pathname.endsWith('/cancel')) return json({ booking: { ...booking, status: 'canceled' } });
    bookedDuration = captured.body.durationMinutes || 60;
    return json({ booking: { ...booking, endAt: new Date(Date.parse(startAt) + bookedDuration * 60000).toISOString() }, joinUrl: booking.joinUrl, manageToken: 'fixture-management', ...calendar }, 201);
  }
  json({ error: 'not_found' }, 404);
});
server.listen(4311, '127.0.0.1');
process.on('SIGTERM', () => server.close());
