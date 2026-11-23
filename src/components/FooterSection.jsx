"use client";
import { motion } from "framer-motion";
import { closing, groom, bride, elders, blessings, wedding, site } from "@/data/weddingDetails";
import { Torana, Diya, Divider, Ganesha, Corner } from "./decor/Ornaments";
import Reveal from "./ui/Reveal";
import Petals from "./ui/Petals";
import GoldDust from "./ui/GoldDust";

function Family({ title, names }) {
  return (
    <div className="text-center">
      <p className="font-royal text-[10px] uppercase tracking-[0.3em] text-gold-light/80">{title}</p>
      <ul className="mt-2 font-display text-xl leading-snug text-ivory">
        {names.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer id="blessings" aria-labelledby="blessings-title" className="bg-velvet relative overflow-hidden px-5 pb-28 pt-32 text-ivory sm:pt-40">
      <Torana className="absolute inset-x-0 top-0 h-14 w-full sm:h-20" count={17} />
      <Petals count={10} />
      <GoldDust count={24} />

      <div className="relative mx-auto max-w-3xl">
        <Corner className="absolute -left-1 -top-6 h-16 w-16 text-gold/60 sm:h-24 sm:w-24" />
        <Corner className="absolute -right-1 -top-6 h-16 w-16 -scale-x-100 text-gold/60 sm:h-24 sm:w-24" />

        <div className="text-center">
          <Reveal><Ganesha className="mx-auto h-16 w-16 text-gold-light/90" /></Reveal>
          <Reveal delay={0.1}>
            <h2 id="blessings-title" className="mt-4 font-script text-[3.2rem] leading-none text-gold-pale sm:text-7xl">With Your Blessings</h2>
          </Reveal>
          <Reveal delay={0.15}><Divider className="mx-auto mt-6 w-52 text-gold-light" /></Reveal>

          <div className="mx-auto mt-8 max-w-xl space-y-4">
            {closing.message.map((m, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className={`font-display leading-relaxed ${i === 0 ? "text-2xl italic text-gold-pale sm:text-3xl" : "text-xl text-cream/90"}`}>{m}</p>
              </Reveal>
            ))}
            {closing.te && <Reveal><p lang="te" className="font-telugu text-lg text-cream/90">{closing.te}</p></Reveal>}
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="grid gap-8 border-y border-gold/30 py-10 sm:grid-cols-2">
            <Family title={`Parents of ${groom.name}`} names={groom.parents} />
            <Family title={`Parents of ${bride.name}`} names={bride.parents} />
            <div className="sm:col-span-2">
              <Family title={elders.intro} names={elders.names} />
            </div>
          </div>
        </Reveal>

        <div className="mt-12 text-center">
          <Reveal>
            <div className="flex items-end justify-center gap-5 sm:gap-8" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i }}>
                  <Diya className={`text-gold ${i === 2 ? "h-16 w-12" : "h-12 w-9"}`} />
                </motion.div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-display text-xl italic text-cream/85">{closing.signoff}</p>
            <p className="mt-2 font-script text-5xl text-gold-pale sm:text-6xl">{closing.from}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p lang="te" className="mt-10 font-telugu text-base text-gold-light/80">{blessings.te}</p>
            <p className="mt-6 font-royal text-[11px] uppercase tracking-[0.3em] text-gold-light/70">
              {groom.name} &amp; {bride.displayName} · {wedding.dateShort}
            </p>
            {site.hashtag && <p className="mt-2 font-royal text-xs tracking-widest text-gold-light">{site.hashtag}</p>}
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
