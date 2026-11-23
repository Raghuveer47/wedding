"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { groom, bride, wedding, site } from "@/data/weddingDetails";
import { Torana, Diya, PeacockFeather, Lotus, Marigold } from "./decor/Ornaments";
import Petals from "./ui/Petals";
import GoldDust from "./ui/GoldDust";

const ease = [0.22, 1, 0.36, 1];

/** Temple-arch frame drawn in SVG, stretches to its box. */
function Arch({ className = "" }) {
  return (
    <svg viewBox="0 0 400 600" preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="arch-gold" x1="0" x2="1">
          <stop offset="0" stopColor="#8A6424" />
          <stop offset="0.5" stopColor="#E9CD8A" />
          <stop offset="1" stopColor="#8A6424" />
        </linearGradient>
      </defs>
      <path d="M20 600 V220 C20 120 110 70 170 48 Q200 20 230 48 C290 70 380 120 380 220 V600"
        fill="none" stroke="url(#arch-gold)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      <path d="M34 600 V226 C34 134 116 88 174 64 Q200 40 226 64 C284 88 366 134 366 226 V600"
        fill="none" stroke="#B8893B" strokeOpacity="0.45" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function HangingLamp({ className = "", delay = 0 }) {
  return (
    <motion.div
      className={`absolute top-0 flex flex-col items-center ${className}`}
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay, ease }}
      style={{ transformOrigin: "top center" }}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={{ rotate: [-2.5, 2.5, -2.5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ transformOrigin: "top center" }}
      >
        <span className="h-16 w-px bg-gradient-to-b from-gold/0 via-gold to-gold-deep sm:h-28" />
        <Diya className="h-12 w-9 text-gold sm:h-16 sm:w-12" />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yFeathers = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="welcome" aria-label="Welcome" className="bg-parchment relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-14">
      <Torana className="absolute inset-x-0 top-0 z-20 h-14 w-full sm:h-20" count={17} />
      <Petals count={14} />
      <GoldDust count={18} className="opacity-70" />

      <HangingLamp className="left-[9%] sm:left-[14%]" delay={0.3} />
      <HangingLamp className="right-[9%] sm:right-[14%]" delay={0.5} />

      <motion.div style={{ y: yFeathers }} className="pointer-events-none absolute bottom-0 left-0 right-0 hidden justify-between px-4 sm:flex">
        <PeacockFeather className="h-56 w-16 -rotate-12 opacity-80" />
        <PeacockFeather className="h-56 w-16 rotate-12 opacity-80" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-xl px-6 lg:max-w-2xl">
        <Arch className="absolute inset-x-3 -bottom-8 -top-10 h-[calc(100%+4.5rem)] w-[calc(100%-1.5rem)] sm:inset-x-0 sm:w-full" />
        <motion.div style={{ y: yText, opacity: fade }} className="relative flex flex-col items-center py-16 text-center sm:py-20">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease }}>
            <Lotus className="h-10 w-16 text-gold" />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease }}
            className="mt-4 font-royal text-[11px] uppercase tracking-regal text-gold-deep">
            The Wedding of
          </motion.p>

          <h2 className="mt-4 leading-[0.9]">
            <motion.span initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 1.1, ease }} className="block font-script text-[3.25rem] text-maroon sm:text-7xl lg:text-[5.5rem]">
              {groom.name}
            </motion.span>
            <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.8, ease }}
              className="my-2 flex items-center justify-center gap-3 font-display text-3xl italic text-gold">
              <Marigold className="h-5 w-5" /> &amp; <Marigold className="h-5 w-5" />
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.85, duration: 1.1, ease }} className="block font-script text-[3.25rem] text-maroon sm:text-7xl lg:text-[5.5rem]">
              {bride.displayName}
            </motion.span>
          </h2>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-8 flex flex-col items-center">
            <p className="font-display text-xl italic text-maroon-soft sm:text-2xl">invite you to bless their union</p>
            <div className="mt-6 flex items-stretch gap-4 text-maroon">
              <div className="flex flex-col items-center justify-center border-r border-gold/50 pr-4">
                <span className="font-royal text-[10px] uppercase tracking-[0.25em] text-gold-deep">{wedding.weekday}</span>
                <span className="font-display text-5xl font-semibold leading-none">{wedding.day}</span>
              </div>
              <div className="flex flex-col items-start justify-center text-left">
                <span className="font-royal text-sm uppercase tracking-[0.3em]">{wedding.month}</span>
                <span className="font-royal text-sm tracking-[0.3em]">{wedding.year}</span>
                <span className="mt-1 font-sans text-xs text-maroon-soft">Hanuman Junction · Eluru District</span>
              </div>
            </div>
            {site.hashtag && <p className="mt-5 rounded-full border border-gold/60 px-4 py-1 font-royal text-xs tracking-widest text-maroon">{site.hashtag}</p>}
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#invitation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 font-royal text-[10px] uppercase tracking-[0.25em] text-gold-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Scroll to the invitation">
        Unfold the invitation
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
