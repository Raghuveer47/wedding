export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Google Maps search link built from the venue's real name + address (no invented coordinates). */
export function mapsLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function pad(n) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function timeLeft(targetISO, now = Date.now()) {
  const diff = new Date(targetISO).getTime() - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const gcalStamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Google Calendar "add event" link. startISO must include its UTC offset. */
export function calendarLink({ title, startISO, hours = 2, location, details = "" }) {
  const start = new Date(startISO);
  const end = new Date(start.getTime() + hours * 3600000);
  const p = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${gcalStamp(start)}/${gcalStamp(end)}`, location, details, ctz: "Asia/Kolkata" });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
