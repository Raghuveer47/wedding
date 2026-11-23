"use client";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { blessings, groom, bride, elders, invitationMessage, wedding } from "@/data/weddingDetails";
import { Ganesha, Corner, Kalash, Divider, Muggu } from "./decor/Ornaments";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

function Person({ person, align }) {
  return (
    <div className={`flex flex-col items-center text-center ${align}`}>
      <p className="font-royal text-[10px] uppercase tracking-[0.3em] text-gold-deep">{person === groom ? "Bridegroom" : "Bride"}</p>
      <h3 className="mt-2 font-script text-[2.9rem] leading-none text-maroon sm:text-6xl">{person.name}</h3>
      {person.te.name && <p lang="te" className="mt-2 font-telugu text-lg text-maroon">{person.te.name}</p>}
      <p className="mt-2 font-display text-lg italic text-gold-deep">{person.qualification}</p>
      <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.25em] text-maroon-soft">{person.relation}</p>
      <ul className="mt-1.5 space-y-0.5 font-display text-[1.2rem] font-medium leading-snug text-maroon-ink">
        {person.parents.map((p) => <li key={p}>{p}</li>)}
      </ul>
      {person.te.parents && <p lang="te" className="mt-2 font-telugu text-base text-maroon-soft">{person.te.parents}</p>}
    </div>
  );
}

function Detail({ icon: Icon, label, children }) {
  return (
    <div className="flex flex-col items-center px-3 py-5 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 text-gold-deep">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="mt-3 font-royal text-[10px] uppercase tracking-[0.3em] text-gold-deep">{label}</p>
      <div className="mt-1.5 font-display text-lg leading-snug text-maroon-ink">{children}</div>
    </div>
  );
}

export default function InvitationSection() {
  return (
    <section id="invitation" aria-labelledby="invitation-title" className="relative overflow-hidden bg-cream px-4 py-24 sm:py-32">
      <Muggu className="slow-spin pointer-events-none absolute -left-40 top-10 h-96 w-96 text-gold/10" />
      <Muggu className="slow-spin pointer-events-none absolute -right-40 bottom-10 h-96 w-96 text-maroon/[0.06]" />

      <SectionHeading eyebrow="Subha Lekha" title={<span id="invitation-title">The Invitation</span>}
        subtitle="A traditional card, unfolded for you" />

      {/* Untransformed wrapper drives the in-view trigger; the card "unfolds" inside it. */}
      <motion.div className="mx-auto mt-14 max-w-3xl" style={{ perspective: 1600 }}
        initial="folded" whileInView="open" viewport={{ once: true, amount: 0.05 }}>
        <motion.article
          variants={{ folded: { rotateX: 24, opacity: 0, y: 50, scale: 0.96 }, open: { rotateX: 0, opacity: 1, y: 0, scale: 1 } }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top center" }}
          className="relative rounded-[6px] bg-maroon p-2.5 shadow-[0_40px_80px_-30px_rgba(74,11,22,0.7)] sm:p-4"
        >
          <div className="bg-parchment relative rounded-[3px] border border-gold px-5 py-12 sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute inset-2 border border-gold/40" aria-hidden="true" />
            <Corner className="absolute left-2 top-2 h-16 w-16 text-gold sm:h-24 sm:w-24" />
            <Corner className="absolute right-2 top-2 h-16 w-16 -scale-x-100 text-gold sm:h-24 sm:w-24" />
            <Corner className="absolute bottom-2 left-2 h-16 w-16 -scale-y-100 text-gold sm:h-24 sm:w-24" />
            <Corner className="absolute bottom-2 right-2 h-16 w-16 -scale-100 text-gold sm:h-24 sm:w-24" />

            <div className="relative flex flex-col items-center text-center">
              <Reveal><Ganesha className="h-20 w-20 text-gold-deep sm:h-24 sm:w-24" /></Reveal>
              {blessings.invocationTe && (
                <Reveal delay={0.05}><p lang="te" className="mt-3 font-telugu text-base text-maroon">{blessings.invocationTe}</p></Reveal>
              )}
              <Reveal delay={0.1}>
                <p lang="te" className="mt-3 font-telugu text-lg font-semibold text-maroon">{blessings.te}</p>
                <p className="mt-1 font-royal text-[10.5px] uppercase tracking-[0.25em] text-gold-deep">{blessings.en.join(" · ")}</p>
              </Reveal>

              <Reveal delay={0.15} className="mt-8">
                <p className="font-display text-lg italic text-maroon-soft">{elders.intro}</p>
                <ul className="mt-1 font-display text-xl font-semibold text-maroon-ink">
                  {elders.names.map((n) => <li key={n}>{n}</li>)}
                </ul>
                {elders.te && <p lang="te" className="mt-2 font-telugu text-base text-maroon-soft">{elders.te}</p>}
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mx-auto mt-7 max-w-lg font-display text-[1.25rem] leading-relaxed text-maroon-ink">{invitationMessage.en}</p>
                {invitationMessage.te && <p lang="te" className="mx-auto mt-3 max-w-lg font-telugu text-base leading-loose text-maroon">{invitationMessage.te}</p>}
              </Reveal>

              <Divider className="mt-9 w-56 text-gold" />

              <div className="mt-9 grid w-full grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
                <Reveal><Person person={groom} /></Reveal>
                <Reveal delay={0.15} className="flex flex-col items-center">
                  <Kalash className="h-20 w-16 text-gold" />
                  <span className="mt-1 font-display text-2xl italic text-gold-deep">weds</span>
                </Reveal>
                <Reveal delay={0.25}><Person person={bride} /></Reveal>
              </div>

              <Divider className="mt-10 w-56 text-gold" />

              <Reveal className="mt-6 w-full">
                <div className="grid grid-cols-1 divide-y divide-gold/30 rounded-sm border border-gold/40 bg-ivory/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  <Detail icon={CalendarDays} label="Date">{wedding.dateLabel}</Detail>
                  <Detail icon={Clock} label="Muhurtham">
                    <span className="text-2xl font-semibold text-maroon">{wedding.muhurtham}</span>
                    <span className="block text-sm italic text-maroon-soft">{wedding.muhurthamNote}</span>
                  </Detail>
                  <Detail icon={MapPin} label="Venue">
                    <span className="text-base">{wedding.venue.name}</span>
                    <span className="block text-sm text-maroon-soft">{wedding.venue.lines.join(" ")}</span>
                  </Detail>
                </div>
              </Reveal>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
