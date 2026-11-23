"use client";
import { useEffect, useState } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import OpeningGate from "./OpeningGate";
import FloatingControls from "./FloatingControls";

/**
 * Wraps the whole page: opening gate, scroll progress, floating nav/music,
 * and reduced-motion handling for every Framer Motion animation.
 */
export default function Experience({ children }) {
  const [opened, setOpened] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    // Deep links (e.g. /#wedding shared on WhatsApp) skip the gate.
    if (window.location.hash && window.location.hash.length > 1) setOpened(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("gate-locked", !opened);
    return () => document.body.classList.remove("gate-locked");
  }, [opened]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded focus:bg-ivory focus:px-4 focus:py-2 focus:text-maroon">
        Skip to invitation
      </a>
      <OpeningGate opened={opened} onOpen={() => setOpened(true)} />
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-gold-deep via-gold-light to-gold"
        style={{ scaleX: progress }}
      />
      <div aria-hidden={!opened} inert={!opened}>{children}</div>
      {opened && <FloatingControls />}
    </MotionConfig>
  );
}
