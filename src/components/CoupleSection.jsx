"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { groom, bride, couplePhotos } from "@/data/weddingDetails";
import { Corner, Lotus } from "./decor/Ornaments";
import PhotoFrame from "./ui/PhotoFrame";
import Reveal from "./ui/Reveal";
import GoldDust from "./ui/GoldDust";

function Portrait({ photo, name, sub, delay, tilt }) {
  return (
    <Reveal delay={delay} className="w-full max-w-[19rem]">
      <figure className="group">
        <div className={`relative bg-ivory p-2.5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:rotate-0 ${tilt}`}>
          <div className="pointer-events-none absolute inset-1 z-10 border border-gold/60" />
          <PhotoFrame src={photo.src} alt={photo.alt} label={photo.label} ratio="portrait" imgClassName="group-hover:scale-105" />
          <Corner className="absolute -left-3 -top-3 z-10 h-10 w-10 text-gold-light" />
          <Corner className="absolute -bottom-3 -right-3 z-10 h-10 w-10 -scale-100 text-gold-light" />
        </div>
        <figcaption className="mt-5 text-center">
          <span className="block font-script text-4xl text-gold-light">{name}</span>
          <span className="font-royal text-[10px] uppercase tracking-[0.3em] text-cream/70">{sub}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

/** One large framed couple photo with a slow cinematic zoom, names either side. */
function FeaturedCouple() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const photo = couplePhotos.featured;
  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-5xl px-6 sm:mt-20">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,24rem)_1fr]">
        <Reveal className="order-2 text-center md:order-1 md:text-right">
          <p className="whitespace-nowrap font-script text-4xl text-gold-light lg:text-[2.6rem]">{groom.name}</p>
          <p className="mt-1 font-royal text-[10px] uppercase tracking-[0.3em] text-cream/70">{groom.qualification} · The Groom</p>
        </Reveal>
        <motion.figure className="order-1 mx-auto w-full max-w-[22rem] md:order-2"
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative rounded-t-[999px] bg-ivory p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <div className="pointer-events-none absolute inset-1 z-10 rounded-t-[999px] border border-gold/70" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px]">
              {photo?.src ? (
                <motion.div style={{ scale }} className="absolute inset-0">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 90vw, 360px" className="object-cover object-[50%_35%]" />
                </motion.div>
              ) : (
                <PhotoFrame ratio="aspect-[3/4]" label="Couple photo" />
              )}
            </div>
            <Corner className="absolute -bottom-3 -left-3 z-10 h-10 w-10 -scale-y-100 text-gold-light" />
            <Corner className="absolute -bottom-3 -right-3 z-10 h-10 w-10 -scale-100 text-gold-light" />
          </div>
        </motion.figure>
        <Reveal delay={0.15} className="order-3 text-center md:text-left">
          <p className="whitespace-nowrap font-script text-4xl text-gold-light lg:text-[2.6rem]">{bride.displayName}</p>
          <p className="mt-1 font-royal text-[10px] uppercase tracking-[0.3em] text-cream/70">{bride.qualification} · The Bride</p>
        </Reveal>
      </div>
    </div>
  );
}

function Lightbox({ items, index, onClose, onNav }) {
  useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose, onNav]);
  const item = items[index];
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={item.caption || "Photo"}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-maroon-ink/95 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button className="absolute right-4 top-4 rounded-full p-3 text-gold-light hover:bg-white/10" aria-label="Close photo" onClick={onClose} autoFocus>
        <X className="h-6 w-6" />
      </button>
      <button className="absolute left-2 rounded-full p-3 text-gold-light hover:bg-white/10" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); onNav(-1); }}>
        <ChevronLeft className="h-7 w-7" />
      </button>
      <motion.figure key={index} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="relative h-[78vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <Image src={item.src} alt={item.alt} fill sizes="90vw" className="object-contain" />
        {item.caption && <figcaption className="absolute -bottom-9 left-0 right-0 text-center font-display text-xl italic text-cream">{item.caption}</figcaption>}
      </motion.figure>
      <button className="absolute right-2 rounded-full p-3 text-gold-light hover:bg-white/10" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); onNav(1); }}>
        <ChevronRight className="h-7 w-7" />
      </button>
    </motion.div>
  );
}

function Gallery() {
  const scroller = useRef(null);
  const [lb, setLb] = useState(null);
  const real = couplePhotos.gallery.filter((g) => g.src);
  const nav = useCallback((d) => setLb((i) => (i + d + real.length) % real.length), [real.length]);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 420), behavior: "smooth" });
  };

  return (
    <div className="relative mt-24">
      <Reveal className="text-center">
        <p className="font-royal text-[11px] uppercase tracking-regal text-gold-light">Our Moments</p>
        <p className="mt-2 font-display text-2xl italic text-cream/85">A few frames from a lifetime of love</p>
      </Reveal>
      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Photo gallery — use arrow keys or the buttons to scroll"
        onKeyDown={(e) => { if (e.key === "ArrowRight") scrollBy(1); if (e.key === "ArrowLeft") scrollBy(-1); }}
        className="no-scrollbar mt-10 flex lg:justify-center snap-x snap-mandatory gap-5 overflow-x-auto px-[10vw] pb-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 sm:gap-8"
      >
        {couplePhotos.gallery.map((g, i) => {
          const realIndex = real.indexOf(g);
          const w = g.ratio === "landscape" ? "w-[78vw] sm:w-[30rem]" : g.ratio === "square" ? "w-[66vw] sm:w-[22rem]" : "w-[62vw] sm:w-[19rem]";
          return (
            <motion.figure key={i}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08 }}
              className={`group min-w-0 shrink-0 snap-center self-center bg-ivory p-2.5 pb-3 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.85)] ${w}`}>
              <button type="button" disabled={!g.src} onClick={() => setLb(realIndex)} className="block w-full overflow-hidden disabled:cursor-default"
                aria-label={g.src ? `Open photo: ${g.caption}` : `${g.caption} — photo coming soon`}>
                <PhotoFrame src={g.src} alt={g.alt} ratio={g.ratio} imgClassName="group-hover:scale-105" />
              </button>
              <figcaption className="mt-2.5 text-center font-display text-lg italic text-maroon">{g.caption}</figcaption>
            </motion.figure>
          );
        })}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => scrollBy(-1)} aria-label="Previous photos" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold-light transition hover:bg-gold/10"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => scrollBy(1)} aria-label="Next photos" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold-light transition hover:bg-gold/10"><ChevronRight className="h-5 w-5" /></button>
      </div>
      <AnimatePresence>{lb !== null && real.length > 0 && <Lightbox items={real} index={lb} onClose={() => setLb(null)} onNav={nav} />}</AnimatePresence>
    </div>
  );
}

export default function CoupleSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);
  const spread = useTransform(scrollYProgress, [0, 1], ["0.6em", "0.12em"]);

  return (
    <section ref={ref} id="couple" aria-labelledby="couple-title" className="relative overflow-hidden bg-maroon-ink py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(140,42,56,0.55),transparent_60%)]" />
      <GoldDust count={22} className="opacity-60" />

      <h2 id="couple-title" className="relative px-2 text-center font-royal font-semibold uppercase leading-[1.05]">
        <motion.span style={{ x: xLeft, letterSpacing: spread }} className="text-foil-light block whitespace-nowrap text-[clamp(1.9rem,8.5vw,6.5rem)]">
          Sai Phaneendra
        </motion.span>
        <span className="my-3 flex items-center justify-center gap-4 font-display text-lg italic normal-case tracking-[0.3em] text-cream/80 sm:text-2xl">
          <span className="h-px w-10 bg-gold/60 sm:w-20" /> with <span className="h-px w-10 bg-gold/60 sm:w-20" />
        </span>
        <motion.span style={{ x: xRight, letterSpacing: spread }} className="text-foil-light block whitespace-nowrap text-[clamp(1.9rem,8.5vw,6.5rem)]">
          Vyshnavi
        </motion.span>
      </h2>

      {couplePhotos.groomPortrait.src && couplePhotos.bridePortrait.src ? (
        <div className="relative mx-auto mt-16 grid max-w-4xl grid-cols-1 justify-items-center gap-14 px-6 sm:mt-20 sm:grid-cols-2 sm:gap-10">
          <Portrait photo={couplePhotos.groomPortrait} name={groom.name} sub={`${groom.qualification} · The Groom`} delay={0} tilt="-rotate-2" />
          <Portrait photo={couplePhotos.bridePortrait} name={bride.displayName} sub={`${bride.qualification} · The Bride`} delay={0.15} tilt="rotate-2" />
        </div>
      ) : (
        <FeaturedCouple />
      )}

      <Reveal className="mt-16 flex justify-center"><Lotus className="h-10 w-16 text-gold/70" /></Reveal>
      <Gallery />
    </section>
  );
}
