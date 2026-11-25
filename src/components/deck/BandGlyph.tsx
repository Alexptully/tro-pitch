"use client";

import { motion } from "motion/react";

type BandGlyphProps = {
  /** Lights blink gold while trO is taking notes. */
  recording?: boolean;
  /** Highlights the button for the voice-note step. */
  buttonActive?: boolean;
  flip?: boolean;
};

/** A band seen from the side, 300 by 120 units: the strap, three status lights and the button. */
export function BandGlyph({ recording = false, buttonActive = false, flip = false }: BandGlyphProps) {
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <rect x={-150} y={-46} width={300} height={92} rx={46} fill="var(--color-band)" />
      <rect x={-150} y={-46} width={300} height={30} rx={15} fill="var(--color-band-light)" opacity={0.55} />
      {[-62, -36, -10].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={-4}
          r={7}
          fill={recording ? "var(--color-accent)" : "var(--color-ink)"}
          animate={recording ? { opacity: [1, 0.25, 1] } : { opacity: 0.9 }}
          transition={recording ? { duration: 1.2, repeat: Infinity, delay: index * 0.2 } : undefined}
        />
      ))}
      <rect x={58} y={-22} width={20} height={44} rx={6} fill={buttonActive ? "var(--color-accent)" : "var(--color-paper-sunken)"} />
    </g>
  );
}
