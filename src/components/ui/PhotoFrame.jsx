import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const RATIOS = { portrait: "aspect-[4/5]", landscape: "aspect-[3/2]", square: "aspect-square", tall: "aspect-[3/4]", wide: "aspect-[16/9]" };

/**
 * Shows a real photo when `src` is set; otherwise a clearly-labelled placeholder
 * (never a stock image or AI face).
 */
export default function PhotoFrame({ src, alt = "", ratio = "portrait", label, className = "", imgClassName = "", sizes = "(max-width: 768px) 90vw, 40vw", priority = false, dark = false }) {
  return (
    <div className={cn("relative overflow-hidden", RATIOS[ratio] || ratio, className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : "lazy"}
          className={cn("object-cover transition-transform duration-[1600ms] ease-out", imgClassName)} />
      ) : (
        <div className={cn("absolute inset-0 flex flex-col items-center justify-center gap-2 text-center",
          dark ? "bg-[radial-gradient(circle_at_50%_40%,#3a0a14,#1c0408)] text-gold-light/70" : "bg-[radial-gradient(circle_at_50%_40%,#fbf3e2,#ecdcbc)] text-gold-deep/80")}>
          <div className="absolute inset-3 border border-dashed border-current opacity-40" />
          <ImageIcon className="h-7 w-7 opacity-70" aria-hidden="true" />
          <span className="px-6 font-royal text-[10px] tracking-[0.25em] uppercase">Photo coming soon</span>
          {label && <span className="px-6 font-sans text-[11px] opacity-70">{label}</span>}
        </div>
      )}
    </div>
  );
}
