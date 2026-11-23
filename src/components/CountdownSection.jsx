"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding, groom, bride } from "@/data/weddingDetails";
import { timeLeft, pad } from "@/lib/utils";
import { Muggu, Diya, Divider } from "./decor/Ornaments";
import Reveal from "./ui/Reveal";

function Unit({ value, label }) {
  const v = pad(value);
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[5.2rem] w-[4.4rem] items-center justify-center overflow-hidden rounded-t-[2.2rem] rounded-b-md border border-gold/60 bg-temple-deep/70 shadow-[inset_0_0_25px_rgba(217,181,108,0.12)] sm:h-32 sm:w-28 sm:rounded-t-[3.5rem]">
        <span className="pointer-events-none absolute inset-1 rounded-t-[2rem] rounded-b border border-gold/20 sm:rounded-t-[3.2rem]" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={v}
            initial={{ y: "-60%", opacity: 0, filter: "blur(4px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "60%", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-foil-light font-display text-[2.6rem] font-semibold tabular-nums sm:text-6xl">
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 font-royal text-[10px] uppercase tracking-[0.3em] text-gold-light sm:text-xs">{label}</span>
    </div>
  );
}

export default function CountdownSection() {
  const [now, setNow] = useState(null); // null until mounted → no hydration mismatch

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = now === null ? null : timeLeft(wedding.muhurthamISO, now);
  const done = now !== null && left === null;

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="bg-temple relative overflow-hidden px-4 py-24 text-center text-ivory sm:py-32">
      <Muggu className="slow-spin pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-gold/[0.07]" />

      <Reveal>
        <p className="font-royal text-[11px] uppercase tracking-regal text-gold-light">Counting the auspicious moments</p>
        <h2 id="countdown-title" className="mt-3 font-display text-[2.4rem] font-semibold leading-tight sm:text-6xl">
          {done ? "Happily Married" : "Until the Muhurtham"}
        </h2>
        <Divider className="mx-auto mt-5 w-48 text-gold-light" />
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-3xl" aria-live="off">
        {!done ? (
          <>
            <div className="flex justify-center gap-2.5 sm:gap-6" role="timer" aria-label={left ? `${left.days} days, ${left.hours} hours, ${left.minutes} minutes to the muhurtham` : "Loading countdown"}>
              <Unit value={left?.days ?? 0} label="Days" />
              <Unit value={left?.hours ?? 0} label="Hours" />
              <Unit value={left?.minutes ?? 0} label="Minutes" />
              <Unit value={left?.seconds ?? 0} label="Seconds" />
            </div>
            <Reveal delay={0.2}>
              <p className="mt-10 font-display text-xl italic text-cream/85 sm:text-2xl">
                {wedding.dateLabel} · Muhurtham {wedding.muhurtham}
              </p>
              <p className="mt-1 font-sans text-sm text-cream/60">{wedding.muhurthamNote} · Indian Standard Time</p>
            </Reveal>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
            className="mx-auto max-w-xl rounded-sm border border-gold/50 bg-temple-deep/60 px-6 py-10">
            <div className="flex justify-center gap-6"><Diya className="h-14 w-10 text-gold" /><Diya className="h-14 w-10 text-gold" /></div>
            <p className="mt-4 font-script text-5xl text-gold-light sm:text-6xl">{groom.shortName} &amp; {bride.displayName}</p>
            <p className="mt-4 font-display text-xl leading-relaxed text-cream/90 sm:text-2xl">
              The sacred knot has been tied. Thank you for your love and blessings as they begin this beautiful journey together.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
