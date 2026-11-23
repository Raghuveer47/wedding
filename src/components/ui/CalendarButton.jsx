import { CalendarPlus } from "lucide-react";
import { calendarLink, cn } from "@/lib/utils";

export default function CalendarButton({ event, tone = "light", className = "" }) {
  return (
    <a href={calendarLink(event)} target="_blank" rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border px-6 py-3 font-royal text-[12px] uppercase tracking-[0.18em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light",
        tone === "dark" ? "border-gold-light/60 text-gold-light hover:bg-gold/10" : "border-maroon/40 text-maroon hover:bg-maroon/5",
        className)}>
      <CalendarPlus className="h-4 w-4" aria-hidden="true" /> Save the date
      <span className="sr-only">(Google Calendar, opens in a new tab)</span>
    </a>
  );
}
