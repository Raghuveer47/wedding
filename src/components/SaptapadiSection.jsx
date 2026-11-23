"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Wheat, Handshake, Sprout, Infinity as InfinityIcon, Coins, Baby, Flame } from "lucide-react";
import { saptapadi } from "@/data/weddingDetails";
import { Footprint, Diya, Lotus } from "./decor/Ornaments";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const ICONS = { grain: Wheat, hands: Handshake, tree: Sprout, knot: InfinityIcon, kalash: Coins, cradle: Baby, lamp: Flame };
const ORDINAL = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh"];

function Step({ item, index }) {
  const Icon = ICONS[item.motif] || Flame;
  const right = index % 2 === 1;
  return (
    <li className="relative grid grid-cols-[3.5rem_1fr] items-center gap-4 sm:grid-cols-[1fr_6rem_1fr] sm:gap-0">
      {/* footprint on the path */}
      <motion.div
        className={`relative z-10 flex justify-center sm:col-start-2 sm:row-start-1`}
        initial={{ opacity: 0, scale: 0.4, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }} transition={{ type: "spring", stiffness: 220, damping: 16 }}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-ivory shadow-[0_0_0_6px_rgba(243,231,208,1)]">
          <Footprint className={`h-9 w-5 text-maroon ${right ? "scale-x-[-1] rotate-6" : "-rotate-6"}`} />
        </span>
      </motion.div>

      <motion.article
        className={`relative sm:row-start-1 ${right ? "sm:col-start-3 sm:pl-10" : "sm:col-start-1 sm:pr-10 sm:text-right"}`}
        initial={{ opacity: 0, x: right ? 50 : -50, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`group relative overflow-hidden rounded-sm border border-gold/40 bg-ivory/80 px-5 py-6 shadow-[0_20px_40px_-25px_rgba(110,20,35,0.5)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-25px_rgba(110,20,35,0.6)] ${right ? "" : "sm:ml-auto"} max-w-md`}>
          <span className={`pointer-events-none absolute -top-4 font-display text-[7rem] font-semibold leading-none text-gold/15 ${right ? "right-3" : "right-3 sm:left-3 sm:right-auto"}`} aria-hidden="true">
            {item.step}
          </span>
          <div className={`relative flex items-center gap-3 ${right ? "" : "sm:flex-row-reverse"}`}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-gold-light to-gold text-maroon-ink shadow-inner">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="font-royal text-[11px] uppercase tracking-[0.28em] text-gold-deep">{ORDINAL[index]} Step</p>
          </div>
          <h3 className="relative mt-3 font-display text-[1.7rem] font-semibold leading-tight text-maroon sm:text-3xl">{item.meaning}</h3>
          {item.te && <p lang="te" className="relative mt-2 font-telugu text-base text-maroon-soft">{item.te}</p>}
        </div>
      </motion.article>
    </li>
  );
}

export default function SaptapadiSection() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="saptapadi" aria-labelledby="saptapadi-title" className="relative overflow-hidden bg-cream px-4 py-24 sm:py-32">
      <SectionHeading eyebrow="Saptapadi" title={<span id="saptapadi-title">The Seven Sacred Steps</span>}
        subtitle="Seven steps taken together around the sacred fire — seven promises for a lifetime." />

      <Reveal className="mt-10 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 -m-6 rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.35),transparent_65%)] blur-xl" aria-hidden="true" />
          <Diya className="relative h-20 w-14 text-gold-deep" />
        </div>
      </Reveal>

      <div ref={listRef} className="relative mx-auto mt-10 max-w-5xl">
        {/* the path */}
        <div className="absolute bottom-6 left-[1.75rem] top-6 w-[2px] -translate-x-1/2 bg-gold/20 sm:left-1/2" aria-hidden="true">
          <motion.div className="h-full w-full origin-top bg-gradient-to-b from-gold via-maroon-soft to-gold" style={{ scaleY: fill }} />
        </div>
        <ol className="relative space-y-10 sm:space-y-14">
          {saptapadi.map((s, i) => <Step key={s.step} item={s} index={i} />)}
        </ol>
      </div>

      <Reveal className="mt-14 flex flex-col items-center text-center">
        <Lotus className="h-10 w-16 text-gold" />
        <p className="mt-3 max-w-md font-display text-xl italic text-maroon-soft">With the seventh step, two lives walk on as one.</p>
      </Reveal>
    </section>
  );
}
