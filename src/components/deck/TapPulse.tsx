"use client";

import { motion } from "motion/react";
import { easeDrawn } from "@/lib/motion";

/**
 * The deck's motif: a gold node that sends out rings when two bands connect.
 * Static rings are always drawn so the printed PDF keeps the shape; animated rings ripple on top.
 */
type TapPulseProps = {
  size: number;
  /** Faint resting rings, as fractions of the radius. */
  rings?: number[];
  /** How many rippling rings run at once. Zero keeps it still. */
  ripples?: number;
  nodeRadius?: number;
  delay?: number;
  className?: string;
};

export function TapPulse({ size, rings = [0.42, 0.7, 1], ripples = 2, nodeRadius = 10, delay = 0, className = "" }: TapPulseProps) {
  const radius = size / 2 - 2;
  return (
    <svg aria-hidden viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`} width={size} height={size} className={`overflow-visible ${className}`}>
      <defs>
        <radialGradient id="tap-glow">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.circle
        r={nodeRadius * 6}
        fill="url(#tap-glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2, delay } }}
      />
      {rings.map((fraction, index) => (
        <motion.circle
          key={fraction}
          r={radius * fraction}
          fill="none"
          stroke="var(--color-accent)"
          strokeOpacity={0.16 - index * 0.03}
          strokeWidth={1.5}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 1.4, ease: easeDrawn, delay: delay + 0.1 * index } }}
        />
      ))}
      {Array.from({ length: ripples }, (_, index) => (
        <motion.circle
          key={`ripple-${index}`}
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.5}
          initial={{ scale: 0.05, opacity: 0 }}
          animate={{ scale: [0.05, 1], opacity: [0.7, 0] }}
          transition={{ duration: 3.2, ease: "easeOut", repeat: Infinity, delay: delay + 0.4 + (index * 3.2) / ripples }}
        />
      ))}
      <motion.circle
        r={nodeRadius}
        fill="var(--color-accent)"
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.8, ease: easeDrawn, delay } }}
      />
    </svg>
  );
}
