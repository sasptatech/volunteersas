// calendar.js — "Add to calendar" helpers, shared by cafe.html, event.html, schedule.html.

function pad2(n) { return n < 10 ? '0' + n : '' + n; }

// Parses "8:30am" / "2:00 PM" / "14:00" into {h,min} 24-hour. Defaults to 09:00 if unparseable.
function parseTime(t) {
  if (!t) return { h: 9, min: 0 };
  const m = t.trim().match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (!m) return { h: 9, min: 0 };
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ampm = m[3] ? m[3].toLowerCase() : null;
  if (ampm === 'pm' && h < 12) h += 12;
  if (ampm === 'am' && h === 12) h = 0;
  return { h, min };
}

function icsDateTime(dateStr, timeStr, addHours) {
  const { h, min } = parseTime(timeStr);
  const d = new Date(dateStr + 'T00:00:00');
  d.setHours(h, min, 0, 0);
  if (addHours) d.setHours(d.getHours() + addHours);
  return d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) + 'T' + pad2(d.getHours()) + pad2(d.getMinutes()) + '00';
}
function icsUtcNow() {
  const d = new Date();
  return d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate()) + 'T' + pad2(d.getUTCHours()) + pad2(d.getUTCMinutes()) + pad2(d.getUTCSeconds()) + 'Z';
}

// opts: { title, date, startTime, durationHrs, location, description }
export function googleCalendarUrl(opts) {
  const start = icsDateTime(opts.date, opts.startTime, 0);
  const end = icsDateTime(opts.date, opts.startTime, opts.durationHrs || 2);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: '[VolunteerSAS] ' + opts.title,
    dates: `${start}/${end}`,
    location: opts.location || '',
    details: opts.description || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcs(opts) {
  const start = icsDateTime(opts.date, opts.startTime, 0);
  const end = icsDateTime(opts.date, opts.startTime, opts.durationHrs || 2);
  const uid = 'volunteersas-' + Date.now() + '@sasptavolunteer';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//VolunteerSAS//EN',
    'BEGIN:VEVENT',
    'UID:' + uid,
    'DTSTAMP:' + icsUtcNow(),
    'DTSTART:' + start,
    'DTEND:' + end,
    'SUMMARY:[VolunteerSAS] ' + (opts.title || '').replace(/,/g, '\\,'),
    'LOCATION:' + (opts.location || '').replace(/,/g, '\\,'),
    'DESCRIPTION:' + (opts.description || '').replace(/,/g, '\\,'),
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const dataUri = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
  const a = document.createElement('a');
  a.href = dataUri;
  a.download = (opts.title || 'event').replace(/[^a-z0-9]+/gi, '_') + '.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Renders a small "Add to calendar" widget (two buttons) into the given container id.
export function renderAddToCalendar(containerId, opts) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">
      <a class="btn btn-ghost" style="font-size:12.5px;padding:7px 12px" href="${googleCalendarUrl(opts)}" target="_blank">📅 Google Calendar</a>
      <button class="btn btn-ghost" style="font-size:12.5px;padding:7px 12px" id="${containerId}-ics">🍎 Apple / Outlook (.ics)</button>
    </div>`;
  document.getElementById(`${containerId}-ics`).onclick = () => downloadIcs(opts);
}
