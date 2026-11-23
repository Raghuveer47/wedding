"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clapperboard, Play, Pause, Film, Star, Heart } from "lucide-react";
import { cousinsSection } from "@/data/cousins";
import { cousinsDemoScenes } from "@/data/cousinsDemo";
import PhotoFrame from "./ui/PhotoFrame";
import Reveal from "./ui/Reveal";

const ease = [0.22, 1, 0.36, 1];

/* ───────────── shared bits ───────────── */

function Marquee({ className = "" }) {
  // ring of theatre bulbs
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {["top-3", "bottom-3"].map((edge) => (
        <div key={edge} className={`absolute left-3 right-3 ${edge} flex justify-between`}>
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="bulb relative h-1.5 w-1.5" style={{ animationDelay: `${(i % 3) * 0.4}s` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function AudioButton({ src, label = "Play dialogue" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  if (!src) return null;
  const toggle = async () => {
    const a = ref.current;
    try {
      if (a.paused) { await a.play(); setOn(true); } else { a.pause(); setOn(false); }
    } catch { setOn(false); }
  };
  return (
    <>
      <audio ref={ref} src={src} preload="none" onEnded={() => setOn(false)} />
      <button onClick={toggle} aria-pressed={on}
        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-amber-300/60 px-5 font-royal text-[11px] uppercase tracking-[0.2em] text-amber-200 transition hover:bg-amber-300/10">
        {on ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {on ? "Pause" : label}
      </button>
    </>
  );
}

const frame = "relative mx-auto w-full max-w-5xl px-5";

/* ───────────── scene renderers ───────────── */

function TitleCard({ s }) {
  return (
    <div className={`${frame} py-20 text-center`}>
      <motion.div initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.4, ease }}>
        {s.eyebrow && <p className="font-royal text-[11px] uppercase tracking-regal text-amber-200/80">{s.eyebrow}</p>}
        <h3 className="mt-4 font-royal text-[clamp(2.2rem,9vw,6rem)] font-semibold uppercase leading-none text-amber-100 [text-shadow:0_0_30px_rgba(255,190,90,0.45)]">{s.title}</h3>
        {s.subtitle && <p className="mt-4 font-display text-2xl italic text-white/80">{s.subtitle}</p>}
        {s.tagline && <p className="mt-6 font-sans text-xs uppercase tracking-[0.35em] text-white/50">{s.tagline}</p>}
      </motion.div>
      <AudioButton src={s.audio} />
    </div>
  );
}

function Intro({ s }) {
  const right = s.align === "right";
  return (
    <div className={`${frame} grid items-center gap-8 py-16 sm:grid-cols-2 sm:gap-12`}>
      <motion.div className={right ? "sm:order-2" : ""}
        initial={{ opacity: 0, x: right ? 80 : -80, rotate: right ? 4 : -4 }} whileInView={{ opacity: 1, x: 0, rotate: right ? 2 : -2 }}
        viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1, ease }}>
        <div className="relative border-[6px] border-white/90 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
          <PhotoFrame src={s.photo?.src} alt={s.photo?.alt || s.name} ratio="tall" dark />
          {s.alias && (
            <motion.span initial={{ scale: 2.2, opacity: 0, rotate: -18 }} whileInView={{ scale: 1, opacity: 1, rotate: -8 }}
              viewport={{ once: true }} transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 14 }}
              className="absolute -bottom-4 left-4 border-2 border-amber-300 bg-black/80 px-3 py-1 font-royal text-sm font-semibold uppercase tracking-widest text-amber-300">
              {s.alias}
            </motion.span>
          )}
        </div>
      </motion.div>
      <div className={right ? "sm:order-1 sm:text-right" : ""}>
        {s.role && <Reveal><p className="font-royal text-[11px] uppercase tracking-regal text-amber-200/70">{s.role}</p></Reveal>}
        <Reveal delay={0.1}>
          <h3 className="mt-2 font-royal text-[clamp(2.4rem,8vw,4.8rem)] font-semibold uppercase leading-[0.95] text-transparent [-webkit-text-stroke:1.5px_#fcd9a0]">{s.name}</h3>
        </Reveal>
        {s.caption && <Reveal delay={0.2}><p className="mt-4 font-display text-2xl italic text-white/85">{s.caption}</p></Reveal>}
        {s.dialogue && (
          <Reveal delay={0.3}>
            <p className={`mt-6 inline-block border-l-4 border-amber-400 bg-white/5 px-4 py-3 text-left font-display text-xl text-amber-100 ${right ? "sm:border-l-0 sm:border-r-4 sm:text-right" : ""}`}>
              &ldquo;{s.dialogue}&rdquo;
            </p>
          </Reveal>
        )}
        <AudioButton src={s.audio} />
      </div>
    </div>
  );
}

function Poster({ s }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  return (
    <div ref={ref} className="relative mx-auto my-10 w-full max-w-5xl overflow-hidden sm:px-5">
      <div className="relative">
        <motion.div style={{ scale }}><PhotoFrame src={s.photo?.src} alt={s.photo?.alt || s.title} ratio="aspect-[3/4] sm:aspect-[16/9]" dark sizes="100vw" /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-10">
          {s.tagline && <Reveal><p className="font-display text-xl italic text-amber-100/90 sm:text-2xl">{s.tagline}</p></Reveal>}
          {s.title && <Reveal delay={0.1}><h3 className="mt-2 font-royal text-[clamp(2.4rem,10vw,6.5rem)] font-semibold uppercase leading-none text-amber-200 [text-shadow:0_4px_30px_rgba(0,0,0,0.8)]">{s.title}</h3></Reveal>}
          {s.credits?.length > 0 && (
            <Reveal delay={0.2}>
              <div className="mx-auto mt-5 max-w-2xl space-y-1 font-sans text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/70 sm:text-xs">
                {s.credits.map((c, i) => <p key={i}>{c}</p>)}
              </div>
            </Reveal>
          )}
          {s.releaseLine && <Reveal delay={0.3}><p className="mt-4 inline-block border-y border-amber-300/60 px-4 py-1 font-royal text-xs uppercase tracking-[0.3em] text-amber-300">{s.releaseLine}</p></Reveal>}
          <AudioButton src={s.audio} />
        </div>
      </div>
    </div>
  );
}

function Collage({ s }) {
  const photos = s.photos || [];
  return (
    <div className={`${frame} py-16 text-center`}>
      {s.title && <Reveal><h3 className="font-royal text-3xl uppercase tracking-widest text-amber-100 sm:text-4xl">{s.title}</h3></Reveal>}
      <div className={`mt-10 grid gap-4 sm:gap-6 ${photos.length > 2 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"}`}>
        {photos.map((p, i) => (
          <motion.figure key={i} initial={{ opacity: 0, y: 50, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: [-3, 2, -2, 3][i % 4] }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: i * 0.08, ease }}
            className="bg-white p-2 pb-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]">
            <PhotoFrame src={p.src} alt={p.alt || p.caption || ""} ratio="square" />
            {p.caption && <figcaption className="mt-2 font-display text-base italic text-neutral-800">{p.caption}</figcaption>}
          </motion.figure>
        ))}
      </div>
      {s.caption && <Reveal><p className="mt-8 font-display text-2xl italic text-white/85">{s.caption}</p></Reveal>}
      <AudioButton src={s.audio} />
    </div>
  );
}

function Dialogue({ s }) {
  const words = (s.line || "").split(" ");
  return (
    <div className={`${frame} py-24 text-center`}>
      <Film className="mx-auto h-6 w-6 text-amber-300/70" aria-hidden="true" />
      <p className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2rem,7vw,4.2rem)] font-semibold leading-[1.1] text-white">
        <span className="text-amber-300">&ldquo;</span>
        {words.map((w, i) => (
          <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.07, duration: 0.5 }}>
            {w}&nbsp;
          </motion.span>
        ))}
        <span className="text-amber-300">&rdquo;</span>
      </p>
      {s.translation && <Reveal delay={0.4}><p className="mx-auto mt-5 max-w-2xl bg-black/60 px-3 py-1 font-sans text-sm text-yellow-100 sm:text-base">{s.translation}</p></Reveal>}
      {s.speaker && <Reveal delay={0.5}><p className="mt-5 font-royal text-xs uppercase tracking-regal text-amber-200/80">— {s.speaker}</p></Reveal>}
      <AudioButton src={s.audio} />
    </div>
  );
}

function Memory({ s }) {
  return (
    <div className={`${frame} grid items-center gap-8 py-16 sm:grid-cols-[1fr_1.1fr]`}>
      <motion.div initial={{ opacity: 0, filter: "sepia(1) blur(4px)" }} whileInView={{ opacity: 1, filter: "sepia(0.55) blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.4 }}
        className="rotate-[-2deg] bg-[#f4ecd8] p-3 pb-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
        <PhotoFrame src={s.photo?.src} alt={s.photo?.alt || s.title || "Memory"} ratio="square" />
        {s.year && <p className="mt-3 text-center font-script text-3xl text-neutral-700">{s.year}</p>}
      </motion.div>
      <div>
        <Reveal><p className="font-royal text-[11px] uppercase tracking-regal text-amber-200/70">Flashback</p></Reveal>
        {s.title && <Reveal delay={0.1}><h3 className="mt-2 font-display text-4xl font-semibold text-amber-50 sm:text-5xl">{s.title}</h3></Reveal>}
        {s.story && <Reveal delay={0.2}><p className="mt-4 font-display text-xl leading-relaxed text-white/80">{s.story}</p></Reveal>}
        <AudioButton src={s.audio} />
      </div>
    </div>
  );
}

function Dedication({ s }) {
  return (
    <div className={`${frame} py-20`}>
      <Reveal className="relative mx-auto max-w-2xl overflow-hidden rounded-sm border border-amber-300/40 bg-gradient-to-b from-amber-200/[0.12] to-transparent px-6 py-14 text-center">
        <Heart className="mx-auto h-7 w-7 fill-rose-400/80 text-rose-400" aria-hidden="true" />
        {s.title && <h3 className="mt-4 font-script text-5xl text-amber-200 sm:text-6xl">{s.title}</h3>}
        <p className="mt-6 whitespace-pre-line font-display text-[1.35rem] leading-relaxed text-white/90">{s.message}</p>
        {s.from && <p className="mt-8 font-royal text-xs uppercase tracking-regal text-amber-200/80">{s.from}</p>}
        <AudioButton src={s.audio} />
      </Reveal>
    </div>
  );
}

const RENDERERS = { titleCard: TitleCard, intro: Intro, poster: Poster, collage: Collage, dialogue: Dialogue, memory: Memory, dedication: Dedication };

/* ───────────── teaser (shown until real content arrives) ───────────── */

function Teaser() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const leftX = useTransform(scrollYProgress, [0.2, 1], ["0%", "-97%"]);
  const rightX = useTransform(scrollYProgress, [0.2, 1], ["0%", "97%"]);
  const t = cousinsSection.teaser;
  return (
    <div ref={ref} className="relative mx-auto mt-12 max-w-4xl px-4">
      <div className="relative overflow-hidden rounded-sm border border-amber-300/30 bg-black">
        <Marquee />
        <div className="relative flex min-h-[26rem] flex-col items-center justify-center px-8 py-16 text-center sm:min-h-[30rem]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,200,120,0.18),transparent_60%)]" />
          <Clapperboard className="relative h-10 w-10 text-amber-300" aria-hidden="true" />
          <p className="relative mt-5 font-royal text-[11px] uppercase tracking-regal text-amber-200/80">A Cousins Production</p>
          <p className="relative mt-3 font-royal text-[clamp(2.4rem,9vw,5rem)] font-semibold uppercase leading-none text-amber-100 [text-shadow:0_0_30px_rgba(255,190,90,0.5)]">
            {t.badge}
          </p>
          <div className="relative mt-4 flex gap-1 text-amber-300" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          </div>
          <p className="relative mx-auto mt-6 max-w-md font-display text-xl italic text-white/80">{t.line}</p>
        </div>
        {/* velvet curtains part as you scroll in */}
        <motion.div aria-hidden="true" style={{ x: leftX }} className="bg-velvet absolute inset-y-0 left-0 w-1/2 border-r-4 border-gold-deep shadow-[10px_0_30px_rgba(0,0,0,0.6)] [background-image:repeating-linear-gradient(90deg,rgba(0,0,0,0.35)_0_6px,transparent_6px_22px)]" />
        <motion.div aria-hidden="true" style={{ x: rightX }} className="bg-velvet absolute inset-y-0 right-0 w-1/2 border-l-4 border-gold-deep shadow-[-10px_0_30px_rgba(0,0,0,0.6)] [background-image:repeating-linear-gradient(90deg,rgba(0,0,0,0.35)_0_6px,transparent_6px_22px)]" />
      </div>
    </div>
  );
}

/* ───────────── section ───────────── */

export default function CousinsSection() {
  const [demo, setDemo] = useState(false);
  useEffect(() => {
    const on = /cousins-demo/.test(window.location.search + window.location.hash);
    setDemo(on);
    if (on) setTimeout(() => document.getElementById("cousins")?.scrollIntoView(), 400);
  }, []);

  const scenes = demo ? cousinsDemoScenes : cousinsSection.scenes;
  const hasScenes = scenes && scenes.length > 0;

  return (
    <section id="cousins" aria-labelledby="cousins-title" className="film-grain relative overflow-hidden bg-[#0b0507] py-24 text-white sm:py-32">
      {/* letterbox bars */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-black sm:h-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-black sm:h-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(120,20,30,0.45),transparent_55%)]" aria-hidden="true" />

      <div className="relative text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 font-royal text-[11px] uppercase tracking-regal text-amber-300">
            <Film className="h-4 w-4" aria-hidden="true" /> {cousinsSection.eyebrow} <Film className="h-4 w-4" aria-hidden="true" />
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="cousins-title" className="mt-4 px-4 font-royal text-[clamp(2.2rem,8vw,5rem)] font-semibold uppercase leading-none text-amber-50">
            {cousinsSection.title}
          </h2>
        </Reveal>
        {cousinsSection.subtitle && <Reveal delay={0.15}><p className="mt-3 font-display text-2xl italic text-white/75">{cousinsSection.subtitle}</p></Reveal>}
        {demo && <p className="mx-auto mt-5 w-fit rounded bg-amber-300 px-3 py-1 font-sans text-xs font-medium uppercase tracking-widest text-black">Layout preview · placeholder content</p>}
      </div>

      {hasScenes ? (
        <div className="relative mt-10">
          {scenes.map((s, i) => {
            const R = RENDERERS[s.type];
            return R ? <R key={i} s={s} /> : null;
          })}
        </div>
      ) : (
        <Teaser />
      )}
    </section>
  );
}
