"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUp, Music2, Pause } from "lucide-react";
import { music } from "@/data/weddingDetails";

const LINKS = [
  { href: "#invitation", label: "Invitation" },
  { href: "#couple", label: "The Couple" },
  { href: "#countdown", label: "Countdown" },
  { href: "#cousins", label: "Cousins Special" },
  { href: "#wedding", label: "Wedding" },
  { href: "#reception", label: "Reception" },
  { href: "#saptapadi", label: "Saptapadi" },
  { href: "#blessings", label: "Blessings" },
];

const fab =
  "flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-maroon-deep/90 text-gold-light shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur transition hover:bg-maroon focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light";

export default function FloatingControls() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleMusic = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (a.paused) { await a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
    } catch { setPlaying(false); }
  };

  return (
    <>
      {music.src && <audio ref={audioRef} src={music.src} loop preload="none" />}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {showTop && (
            <motion.button key="top" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={fab} aria-label="Back to top">
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
        {music.src && (
          <button onClick={toggleMusic} className={fab} aria-pressed={playing} aria-label={playing ? "Pause background music" : "Play background music"}>
            {playing ? <Pause className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
          </button>
        )}
        <button onClick={() => setOpen((o) => !o)} className={fab} aria-expanded={open} aria-controls="site-nav" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="scrim" className="fixed inset-0 z-40 bg-maroon-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.nav
              key="nav" id="site-nav" aria-label="Sections"
              initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4rem)] right-4 z-50 w-60 origin-bottom-right overflow-hidden rounded-2xl border border-gold/50 bg-ivory/95 p-2 shadow-2xl backdrop-blur"
            >
              <ul>
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={() => setOpen(false)}
                      className="flex min-h-[44px] items-center gap-3 rounded-xl px-4 font-display text-lg text-maroon transition hover:bg-cream focus:outline-none focus-visible:bg-cream">
                      <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
