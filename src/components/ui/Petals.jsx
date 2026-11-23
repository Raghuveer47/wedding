"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Floating marigold / rose petals — pure CSS animation, few DOM nodes. */
export default function Petals({ count = 14, className = "" }) {
  const reduce = useReducedMotion();
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    const colors = ["#E8892B", "#F2B233", "#C2384B", "#E7A3A8", "#F6E3B4"];
    setPetals(Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 10,
      dur: 11 + Math.random() * 10,
      delay: -Math.random() * 20,
      drift: (Math.random() - 0.5) * 120,
      color: colors[i % colors.length],
    })));
  }, [count]);
  if (reduce) return null;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <span key={p.id} className="petal" style={{
          left: `${p.left}%`, width: p.size, height: p.size * 1.3, background: p.color,
          animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, "--drift": `${p.drift}px`,
        }} />
      ))}
    </div>
  );
}
