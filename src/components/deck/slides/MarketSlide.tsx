"use client";

import { motion } from "motion/react";
import { market } from "@/content/content";
import { dollarsShort } from "@/lib/format";
import { easeDrawn } from "@/lib/motion";
import { Caption, fadeReveal, Headline } from "../primitives";
import type { SlideProps } from "../slides";

/** Nested rings resting on one baseline, like the tap pulse. Radii are for legibility, not to scale. */
const RING = { baseline: 905, cx: 500, radii: [320, 190, 80] };

function Ring({ index, active }: { index: number; active: boolean }) {
  const r = RING.radii[index];
  const ours = index === 2;
  return (
    <motion.circle
      cx={RING.cx}
      cy={RING.baseline - r}
      r={r}
      fill="var(--color-accent)"
      fillOpacity={ours ? 0.9 : 0.06 + index * 0.06}
      stroke="var(--color-accent)"
      strokeOpacity={active ? 0.9 : 0.35}
      strokeWidth={ours ? 0 : 2}
      initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 1.1, ease: easeDrawn } }}
      style={{ transformOrigin: `${RING.cx}px ${RING.baseline}px` }}
    />
  );
}

function RingLabel({ index }: { index: number }) {
  const ring = market.rings[index];
  const top = RING.baseline - RING.radii[index] * 2;
  return (
    <motion.div initial="enter" animate="present" variants={fadeReveal(0.4, 12)} className="absolute left-[1060px] flex items-baseline gap-8" style={{ top: top + 10 }}>
      <p className="w-[110px] text-point font-semibold text-ink-muted">{ring.label}</p>
      <div>
        <p className={`text-headline font-semibold figures-tabular ${index === 2 ? "text-accent" : "text-ink"}`}>{dollarsShort(ring.value)}</p>
        <Caption className="mt-2 max-w-[640px]">{ring.line}</Caption>
      </div>
    </motion.div>
  );
}

export function MarketSlide({ step }: SlideProps) {
  const shown = [0, 1, 2].filter((index) => index <= step);
  return (
    <div className="absolute inset-0">
      <div className="absolute top-[88px] left-[112px]">
        <Headline text={market.headline} />
      </div>
      <svg aria-hidden viewBox="0 0 1920 1080" className="absolute inset-0 h-full w-full">
        {shown.map((index) => (
          <Ring key={index} index={index} active={index === step} />
        ))}
      </svg>
      {shown.map((index) => (
        <RingLabel key={index} index={index} />
      ))}
      <motion.div variants={fadeReveal(0.6)} className="absolute top-[935px] left-[112px]">
        <Caption>{market.footnote}</Caption>
      </motion.div>
    </div>
  );
}
