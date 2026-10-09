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
const personalContext = { name: '', email: '', company: 'QA Host', displayName: 'QA Host', headline: 'Sundae team', bio: 'A conversation about your business.',
  slug: 'qa-host', durationMinutes: 60, durationOptions: [30, 60, 90], offering: 'Introduction', teamTimezone: 'UTC', eventTypeId: 'intro',
  events: [{ id: 'intro', name: 'Introduction', durationMinutes: 60, durationOptions: [30, 60, 90] }, { id: 'demo', name: 'Demo', durationMinutes: 30, durationOptions: [30] }],
  formToken: 'fixture-form', locale: null, activeBooking: null };
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const token = url.searchParams.get('token');
  const json = (body, status = 200) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };
  if (url.pathname === '/health') return json({ ok: true });
  if (url.pathname === '/captured') return json(captured);
  if (url.pathname.startsWith('/api/v1/public/scheduling/')) {
    const parts = url.pathname.split('/').slice(5);
    const managed = parts[0] === 'manage';
    const action = parts.at(-1);
    if (parts[0] === 'paused') return json({ error: 'page_unavailable' }, 404);
    if (managed && (parts[1] !== personalId || token !== 'fixture-private' || !personalBooking)) return json({ error: 'invalid_link' }, 401);
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
      if (action === 'verification') { personalBooking = null; personalEmail = captured.body.email; return json({ verificationId }, 202); }
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
