"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { reception, groom, bride } from "@/data/weddingDetails";
import { Marigold } from "./decor/Ornaments";
import Reveal from "./ui/Reveal";
import MapButton from "./ui/MapButton";
import CalendarButton from "./ui/CalendarButton";

/** A sagging strand of warm fairy lights. */
function LightStrand({ top, sag = 40, count = 16, delay = 0 }) {
  return (
    <div className="pointer-events-none absolute inset-x-0" style={{ top }} aria-hidden="true">
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-x-0 h-24 w-full">
        <path d={`M0 0 Q500 ${sag * 2} 1000 0`} stroke="rgba(217,181,108,0.35)" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: count }).map((_, i) => {
        const t = (i + 0.5) / count;
        const y = sag * 4 * t * (1 - t) * 0.96; // quadratic sag in px (approx of the svg curve, 96px tall box)
        return <span key={i} className="bulb" style={{ left: `${t * 100}%`, top: y, animationDelay: `${delay + (i % 4) * 0.5}s` }} />;
      })}
    </div>
  );
}

function Bokeh() {
  const [dots, setDots] = useState([]);
  useEffect(() => {
    setDots(Array.from({ length: 14 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: 20 + Math.random() * 75, s: 30 + Math.random() * 90, o: 0.06 + Math.random() * 0.12, d: 6 + Math.random() * 6,
    })));
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {dots.map((d) => (
        <motion.span key={d.id} className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,206,130,1),rgba(255,170,70,0)_70%)]"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, opacity: d.o }}
          animate={{ y: [0, -18, 0], opacity: [d.o, d.o * 1.8, d.o] }} transition={{ duration: d.d, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

export default function ReceptionSection() {
  return (
    <section id="reception" aria-labelledby="reception-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#1a0409_0%,#2e060d_45%,#3d0a14_100%)] px-4 pb-24 pt-36 text-ivory sm:pb-32 sm:pt-44">
      <LightStrand top="0px" sag={36} count={18} />
      <LightStrand top="38px" sag={48} count={14} delay={0.8} />
      <Bokeh />
      {/* warm stage glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[60%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(217,150,60,0.32),transparent_65%)]" aria-hidden="true" />

      <div className="relative text-center">
        <Reveal><p className="inline-flex items-center gap-2 font-royal text-[11px] uppercase tracking-regal text-gold-light"><Sparkles className="h-4 w-4" aria-hidden="true" /> An evening of celebration <Sparkles className="h-4 w-4" aria-hidden="true" /></p></Reveal>
        <Reveal delay={0.1}>
          <h2 id="reception-title" className="mt-4 font-script text-[3.3rem] leading-[1] text-gold-pale [text-shadow:0_0_40px_rgba(255,190,100,0.45)] sm:text-8xl">
            {reception.title}
          </h2>
        </Reveal>
      </div>

      {/* stage-style card: arched backdrop with garlands */}
      <Reveal delay={0.15} className="relative mx-auto mt-14 max-w-2xl">
        <div className="relative rounded-t-[999px] border border-gold/50 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-6 pb-12 pt-24 text-center shadow-[0_0_80px_-20px_rgba(255,180,90,0.35)] backdrop-blur-[2px] sm:px-14 sm:pt-28">
          <div className="pointer-events-none absolute inset-3 rounded-t-[999px] border border-gold/20" aria-hidden="true" />
          {/* garland swag */}
          <div className="absolute left-1/2 top-10 flex -translate-x-1/2 gap-1 sm:top-12" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <Marigold key={i} className="h-5 w-5" style={{ transform: `translateY(${Math.sin((i / 8) * Math.PI) * 14}px)` }} />
            ))}
          </div>

          <p className="font-script text-4xl text-gold-light">{groom.shortName} &amp; {bride.displayName}</p>
          <p className="mt-6 font-royal text-[11px] uppercase tracking-[0.3em] text-gold-light/80">{reception.weekday}</p>
          <p className="mt-1 font-display text-5xl font-semibold text-ivory sm:text-6xl">
            {reception.day} <span className="font-royal text-xl uppercase tracking-[0.25em] text-gold-pale">{reception.month} {reception.year}</span>
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2 font-display text-xl text-gold-pale">
            <Clock className="h-5 w-5" aria-hidden="true" /> {reception.time}
          </p>

          <div className="mt-8 flex flex-col items-center">
            <MapPin className="h-5 w-5 text-gold-light" aria-hidden="true" />
            <address className="mt-2 not-italic">
              <span className="block font-display text-2xl font-semibold text-ivory">{reception.venue.name}</span>
              {reception.venue.lines.map((l) => <span key={l} className="block font-display text-lg text-cream/80">{l}</span>)}
            </address>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MapButton query={reception.venue.mapsQuery} label="Get directions" tone="gold" />
            <CalendarButton tone="dark" event={{ title: `Reception · ${groom.name} & ${bride.displayName}`, startISO: reception.startISO, hours: 3,
              location: `${reception.venue.name}, ${reception.venue.lines.join(" ")}`, details: `${reception.dateLabel}, ${reception.time}.` }} />
          </div>
        </div>
        {/* stage steps */}
        <div className="mx-auto h-3 w-[92%] bg-gradient-to-b from-gold/40 to-gold/10" aria-hidden="true" />
        <div className="mx-auto h-3 w-full bg-gradient-to-b from-gold/25 to-transparent" aria-hidden="true" />
      </Reveal>
    </section>
  );
}
