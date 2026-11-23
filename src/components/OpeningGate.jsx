"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blessings, groom, bride, wedding } from "@/data/weddingDetails";
import { Ganesha, Corner, Torana, Muggu, Diya } from "./decor/Ornaments";
import Petals from "./ui/Petals";
import GoldDust from "./ui/GoldDust";

const ease = [0.22, 1, 0.36, 1];

function Door({ side, opening }) {
  const left = side === "left";
  return (
    <motion.div
      className="absolute top-0 h-full w-1/2 bg-velvet"
      style={{ [left ? "left" : "right"]: 0, transformOrigin: left ? "left center" : "right center" }}
      initial={false}
      animate={opening ? { rotateY: left ? -105 : 105, opacity: 0.2 } : { rotateY: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className={`absolute inset-y-3 ${left ? "left-3 right-1.5" : "right-3 left-1.5"} border border-gold/60`} />
      <div className={`absolute inset-y-6 ${left ? "left-6 right-4" : "right-6 left-4"} border border-gold/25`} />
      <Muggu className={`absolute top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-y-1/2 text-gold/[0.13] ${left ? "-right-[min(35vw,260px)]" : "-left-[min(35vw,260px)]"}`} />
      <Corner className={`absolute top-4 h-14 w-14 text-gold/70 ${left ? "left-4" : "right-4 -scale-x-100"}`} />
      <Corner className={`absolute bottom-4 h-14 w-14 text-gold/70 ${left ? "left-4 -scale-y-100" : "right-4 -scale-100"}`} />
      {/* door edge highlight */}
      <div className={`absolute inset-y-0 w-[3px] ${left ? "right-0" : "left-0"} bg-gradient-to-b from-gold-deep via-gold-light to-gold-deep opacity-80`} />
    </motion.div>
  );
}

export default function OpeningGate({ opened, onOpen }) {
  const [opening, setOpening] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!opened) {
      const t = setTimeout(() => btnRef.current?.focus({ preventScroll: true }), 1200);
      return () => clearTimeout(t);
    }
  }, [opened]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.scrollTo(0, 0);
    setTimeout(onOpen, 1250);
  };

  const line = (delay) => ({
    initial: { opacity: 0, y: 14, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          key="gate"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation of Sai Phaneendra and Vyshnavi"
          className="fixed inset-0 z-[60] overflow-hidden"
          style={{ perspective: 1800 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Door side="left" opening={opening} />
          <Door side="right" opening={opening} />

          <motion.div
            className="relative z-10 flex h-full flex-col items-center overflow-y-auto px-6 text-center no-scrollbar"
            animate={opening ? { opacity: 0, scale: 1.08, filter: "blur(8px)" } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
          >
            <Torana className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full sm:h-16" count={15} />
            <Petals count={12} />
            <GoldDust count={30} />

            <div className="my-auto flex w-full max-w-md flex-col items-center py-14">
              <motion.div {...line(0.1)}>
                <div className="rounded-full border border-gold/60 bg-[radial-gradient(circle,#6e1423_0%,#3d0811_75%)] p-2 shadow-[0_0_0_5px_rgba(74,11,22,0.9),0_0_0_6px_rgba(217,181,108,0.35),0_0_40px_rgba(217,181,108,0.25)]">
                  <Ganesha className="h-24 w-24 text-gold-light sm:h-28 sm:w-28" />
                </div>
              </motion.div>

              <motion.p {...line(0.35)} lang="te" className="mt-3 font-telugu text-[15px] text-gold-pale/90">
                {blessings.te}
              </motion.p>
              <div className="mt-2 flex gap-3 font-royal text-[10.5px] uppercase tracking-[0.22em] text-gold-light sm:text-xs">
                {blessings.en.map((w, i) => (
                  <motion.span key={w} {...line(0.5 + i * 0.15)}>{w}</motion.span>
                ))}
              </div>

              <motion.p {...line(1)} className="mt-7 font-display text-lg italic text-cream/85">
                With the blessings of our elders
              </motion.p>
              <motion.p {...line(1.15)} className="mt-1 font-royal text-[11px] uppercase tracking-regal text-gold-light">
                You&rsquo;re Cordially Invited
              </motion.p>

              <motion.h1 {...line(1.35)} className="mt-5 leading-none">
                <span className="text-foil-light block font-script text-[3.4rem] sm:text-7xl">{groom.name}</span>
                <span className="my-1 block font-display text-3xl italic text-gold-light">&amp;</span>
                <span className="text-foil-light block font-script text-[3.4rem] sm:text-7xl">{bride.displayName}</span>
              </motion.h1>

              <motion.div {...line(1.6)} className="mt-6 flex items-center gap-3 font-royal text-sm tracking-[0.3em] text-ivory">
                <span className="h-px w-8 bg-gold/70" />
                {wedding.dateShort.toUpperCase()}
                <span className="h-px w-8 bg-gold/70" />
              </motion.div>

              <motion.div {...line(1.8)} className="mt-9 flex items-end gap-4">
                <Diya className="mb-1 h-12 w-9 text-gold" />
                <button
                  ref={btnRef}
                  onClick={handleOpen}
                  className="group relative min-h-[52px] overflow-hidden rounded-full border border-gold-light/80 bg-gradient-to-b from-gold-light to-gold px-7 py-3.5 font-royal text-[12px] font-semibold uppercase tracking-[0.2em] text-maroon-ink shadow-[0_0_0_6px_rgba(217,181,108,0.15),0_18px_40px_-12px_rgba(0,0,0,0.6)] transition hover:shadow-[0_0_0_9px_rgba(217,181,108,0.2),0_18px_40px_-12px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
                >
                  <span className="relative z-10">Open Wedding Invitation</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <Diya className="mb-1 h-12 w-9 text-gold" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
