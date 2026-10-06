// Local contract fixture. Never sends mail or reaches Microsoft Graph.
import { createServer } from 'node:http';
let captured = null;
const startAt = '2026-10-27T10:00:00.000Z';
const endAt = '2026-10-27T11:00:00.000Z';
const booking = { id: 'fixture-booking', status: 'scheduled', startAt, endAt, timezone: 'UTC', joinUrl: 'https://teams.example/call' };
const calendar = { googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20261027T100000Z%2F20261027T110000Z',
  outlookCalendarUrl: 'https://outlook.office.com/calendar/0/deeplink/compose?startdt=2026-10-27T10%3A00%3A00.000Z', ics: 'BEGIN:VCALENDAR\r\nEND:VCALENDAR' };
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const token = url.searchParams.get('token');
  const json = (body, status = 200) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };
  if (url.pathname === '/health') return json({ ok: true });
  if (url.pathname === '/captured') return json(captured);
  if (url.pathname.endsWith('/context') && token === 'expired') return json({ error: 'invalid_or_expired_token' }, 401);
  if (url.pathname.endsWith('/context')) return json({ name: 'Juan', company: 'Example', email: 'juan@example.com', durationMinutes: 60, teamTimezone: 'UTC',
    locale: token === 'arabic' ? 'ar' : 'en', offering: 'Sundae discovery call', eventTypeId: url.searchParams.get('eventType') || 'discovery', activeBooking: null,
    bookingQuestion: { label: 'What would you like to discuss?', enabled: true, required: token === 'required' } });
  if (url.pathname.endsWith('/slots')) {
    captured = { slotQuery: Object.fromEntries(url.searchParams) };
    if (token === 'unavailable') return json({ days: [], slots: [], graphDegraded: true });
    const tz = url.searchParams.get('tz') || 'UTC';
    const slot = { startUtc: startAt, endUtc: endAt, startLocal: startAt, label: '10:00 AM', dayKey: '2026-10-27' };
    return json({ slots: [slot], days: [{ date: slot.dayKey, weekdayLabel: 'Tue', slots: [slot] }], visitorTimezone: tz, teamTimezone: 'UTC', durationMinutes: 60 });
  }
  if (req.method === 'POST') {
    let raw = ''; for await (const chunk of req) raw += chunk;
    captured = { body: JSON.parse(raw), query: Object.fromEntries(url.searchParams) };
    if (url.pathname.endsWith('/reschedule')) return json({ booking: { ...booking, status: 'rescheduled' }, ...calendar });
    if (url.pathname.endsWith('/cancel')) return json({ booking: { ...booking, status: 'canceled' } });
    return json({ booking, joinUrl: booking.joinUrl, manageToken: 'fixture-management', ...calendar }, 201);
  }
  json({ error: 'not_found' }, 404);
});
server.listen(4311, '127.0.0.1');
process.on('SIGTERM', () => server.close());
