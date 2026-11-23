"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin, Sunrise } from "lucide-react";
import { wedding, groom, bride } from "@/data/weddingDetails";
import { Mandapam, Torana, Marigold, Lotus } from "./decor/Ornaments";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import MapButton from "./ui/MapButton";
import CalendarButton from "./ui/CalendarButton";

export default function WeddingEventSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yArt = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} id="wedding" aria-labelledby="wedding-title" className="bg-parchment relative overflow-hidden px-4 pb-24 pt-28 sm:pb-32 sm:pt-36">
      <Torana className="absolute inset-x-0 top-0 h-14 w-full sm:h-20" count={17} />

      <SectionHeading eyebrow="The Sacred Ceremony" title={<span id="wedding-title">{wedding.title}</span>} />

      <div className="mx-auto mt-14 grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* mandapam illustration */}
        <motion.div style={{ y: yArt }} className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-x-10 bottom-6 top-16 rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.25),transparent_65%)] blur-2xl" aria-hidden="true" />
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2 }}>
            <Mandapam className="relative w-full text-maroon" />
          </motion.div>
          {[["left-[8%] top-[34%]", 0], ["right-[8%] top-[34%]", 0.4], ["left-[30%] top-[46%]", 0.8], ["right-[30%] top-[46%]", 1.2]].map(([pos, d], i) => (
            <motion.span key={i} className={`absolute ${pos}`} animate={{ y: [0, -4, 0], rotate: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: d }} aria-hidden="true">
              <Marigold className="h-5 w-5" />
            </motion.span>
          ))}
          <p className="mt-2 text-center font-script text-3xl text-maroon/80">{groom.shortName} &amp; {bride.displayName}</p>
        </motion.div>

        {/* event card */}
        <Reveal className="relative">
          <div className="gold-frame relative bg-ivory px-6 py-10 text-center shadow-[0_30px_60px_-30px_rgba(110,20,35,0.45)] sm:px-10">
            <Lotus className="mx-auto h-8 w-14 text-gold" />
            <p className="mt-3 font-royal text-[11px] uppercase tracking-[0.3em] text-gold-deep">{wedding.weekday}</p>
            <div className="mt-2 flex items-end justify-center gap-3 text-maroon">
              <span className="font-display text-7xl font-semibold leading-none sm:text-8xl">{wedding.day}</span>
              <span className="pb-2 text-left font-royal text-sm uppercase leading-tight tracking-[0.25em]">{wedding.month}<br />{wedding.year}</span>
            </div>

            <div className="mx-auto mt-7 max-w-xs rounded-sm border border-gold/50 bg-cream/60 px-4 py-4">
              <p className="flex items-center justify-center gap-2 font-royal text-[11px] uppercase tracking-[0.25em] text-gold-deep">
                <Sunrise className="h-4 w-4" aria-hidden="true" /> Sumuhurtham
              </p>
              <p className="mt-1 flex items-center justify-center gap-2 font-display text-4xl font-semibold text-maroon">
                <Clock className="h-6 w-6 text-gold" aria-hidden="true" /> {wedding.muhurtham}
              </p>
              <p className="mt-1 font-display text-base italic text-maroon-soft">{wedding.muhurthamNote}</p>
            </div>

            <div className="mt-7 flex flex-col items-center">
              <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
              <address className="mt-2 not-italic">
                <span className="block font-display text-[1.35rem] font-semibold leading-snug text-maroon-ink">{wedding.venue.name}</span>
                {wedding.venue.lines.map((l) => <span key={l} className="block font-display text-lg text-maroon-soft">{l}</span>)}
              </address>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MapButton query={wedding.venue.mapsQuery} label="Get directions" tone="maroon" />
              <CalendarButton event={{ title: `Wedding of ${groom.name} & ${bride.displayName}`, startISO: wedding.muhurthamISO, hours: 3,
                location: wedding.venue.mapsQuery, details: `Muhurtham ${wedding.muhurtham} (${wedding.muhurthamNote.toLowerCase()}), ${wedding.dateLabel}.` }} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
