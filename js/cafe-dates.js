// cafe-dates.js — school-day/date helpers for PTA Cafe scheduling.
export const SCHOOL_START = "2026-08-11";
export const SCHOOL_END = "2027-06-04";
export const HOLIDAY_RANGES = [
  ["2026-08-10", "2026-08-10"],
  ["2026-10-19", "2026-10-23"],
  ["2026-11-09", "2026-11-09"],
  ["2026-11-26", "2026-11-27"],
  ["2026-12-21", "2027-01-08"],
  ["2027-02-05", "2027-02-08"],
  ["2027-03-10", "2027-03-10"],
  ["2027-03-22", "2027-03-26"],
  ["2027-05-01", "2027-05-01"],
  ["2027-05-17", "2027-05-17"],
  ["2027-05-20", "2027-05-20"],
];
export const SHIFT_TYPES = [
  { id: "am", label: "Morning shift", startTime: "8:30 AM", endTime: "12:00 PM", hrs: 3.5 },
  { id: "pm", label: "Afternoon shift", startTime: "12:00 PM", endTime: "4:00 PM", hrs: 4 },
];

export function pad(n) { return n < 10 ? "0" + n : "" + n; }
export function dstr(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
export function isHoliday(dateStr) { return HOLIDAY_RANGES.some(([s, e]) => dateStr >= s && dateStr <= e); }

// dayOverrides: map of dateStr -> 'open' | 'closed' set by Store Admins (Firestore: cafeDayOverrides/{date})
export function isSchoolDay(dateStr, dayOverrides = {}) {
  if (dayOverrides[dateStr] === "open") return true;
  if (dayOverrides[dateStr] === "closed") return false;
  if (dateStr < SCHOOL_START || dateStr > SCHOOL_END) return false;
  const dow = new Date(dateStr + "T00:00:00").getDay();
  if (dow === 0 || dow === 6) return false;
  return !isHoliday(dateStr);
}
export function mondayOf(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const dow = d.getDay();
  d.setDate(d.getDate() + (dow === 0 ? -6 : 1 - dow));
  return dstr(d);
}
export function weekDates(mondayStr) {
  const out = []; const d = new Date(mondayStr + "T00:00:00");
  for (let i = 0; i < 5; i++) { out.push(dstr(d)); d.setDate(d.getDate() + 1); }
  return out;
}
export function shiftWeek(mondayStr, dir) {
  const d = new Date(mondayStr + "T00:00:00"); d.setDate(d.getDate() + dir * 7); return dstr(d);
}
export function fmtDayLabel(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}
export function timeToMinutes(t) {
  if (!t) return 0;
  const m = t.trim().match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ampm = m[3] ? m[3].toLowerCase() : null;
  if (ampm === 'pm' && h < 12) h += 12;
  if (ampm === 'am' && h === 12) h = 0;
  return h * 60 + min;
}
// Half-hour time options from 6:00 AM to 6:00 PM, formatted consistently (e.g. "6:00 AM", "6:30 AM").
export function halfHourOptions(startHour = 6, endHour = 18) {
  const out = [];
  for (let mins = startHour * 60; mins <= endHour * 60; mins += 30) {
    let h = Math.floor(mins / 60), m = mins % 60;
    const ampm = h < 12 ? 'AM' : 'PM';
    let h12 = h % 12; if (h12 === 0) h12 = 12;
    out.push(`${h12}:${pad(m)} ${ampm}`);
  }
  return out;
}
