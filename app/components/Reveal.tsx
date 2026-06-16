"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** y-offset to animate from (px). Default 24. */
  y?: number;
};

/**
 * Reveal — fades + lifts its children into view on first scroll.
 * Respects prefers-reduced-motion automatically (Framer Motion + the
 * global reduced-motion CSS rule keep it from being disorienting).
 */
export function Reveal({ children, delay = 0, className = "", y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
