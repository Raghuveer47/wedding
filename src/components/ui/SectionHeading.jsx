import Reveal from "./Reveal";
import { Divider } from "../decor/Ornaments";
import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, subtitle, tone = "light", className = "" }) {
  const dark = tone === "dark";
  return (
    <div className={cn("text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className={cn("font-royal text-[11px] sm:text-xs tracking-regal uppercase", dark ? "text-gold-light" : "text-gold-deep")}>
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className={cn("mt-3 font-display font-semibold leading-[1.05] text-[2.4rem] sm:text-6xl", dark ? "text-ivory" : "text-maroon")}>
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <Divider className={cn("mx-auto mt-5 w-48 sm:w-64", dark ? "text-gold-light" : "text-gold")} />
      </Reveal>
      {subtitle && (
        <Reveal delay={0.22}>
          <p className={cn("mx-auto mt-5 max-w-xl font-display italic text-xl sm:text-2xl", dark ? "text-cream/85" : "text-maroon-soft")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
