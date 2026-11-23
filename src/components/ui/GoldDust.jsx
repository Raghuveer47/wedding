"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Subtle twinkling golden particles. */
export default function GoldDust({ count = 26, className = "" }) {
  const reduce = useReducedMotion();
  const [dots, setDots] = useState([]);
  useEffect(() => {
    setDots(Array.from({ length: count }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100, s: 1 + Math.random() * 2.4,
      d: 3 + Math.random() * 5, delay: -Math.random() * 6,
    })));
  }, [count]);
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((d) => (
        <span key={d.id} className={reduce ? "dust" : "dust dust-anim"} style={{
          left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, animationDuration: `${d.d}s`, animationDelay: `${d.delay}s`,
        }} />
      ))}
    </div>
  );
}
