import { MapPin, ArrowUpRight } from "lucide-react";
import { mapsLink, cn } from "@/lib/utils";

export default function MapButton({ query, label = "Open in Google Maps", tone = "gold", className = "" }) {
  const styles = {
    gold: "bg-gradient-to-b from-gold-light to-gold text-maroon-ink shadow-[0_10px_30px_-10px_rgba(184,137,59,0.8)] hover:brightness-105",
    maroon: "bg-maroon text-ivory shadow-[0_10px_30px_-12px_rgba(110,20,35,0.9)] hover:bg-maroon-soft",
  };
  return (
    <a
      href={mapsLink(query)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 font-royal text-[12px] tracking-[0.18em] uppercase transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2",
        styles[tone],
        className
      )}
    >
      <MapPin className="h-4 w-4" aria-hidden="true" />
      {label}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
