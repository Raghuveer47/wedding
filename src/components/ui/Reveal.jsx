"use client";
import { motion } from "framer-motion";

/** Scroll-triggered reveal: soft rise + blur-to-sharp. Respects reduced motion via MotionConfig. */
export default function Reveal({ children, delay = 0, y = 28, className = "", as = "div", once = true, amount = 0.25 }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
