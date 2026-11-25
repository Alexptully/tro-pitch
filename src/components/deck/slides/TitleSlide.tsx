"use client";

import { motion } from "motion/react";
import { team } from "@/content/config";
import { title } from "@/content/content";
import { listNames } from "@/lib/format";
import { easeDrawn } from "@/lib/motion";
import { BandRender } from "../BandRender";
import { fadeReveal, MaskedLines } from "../primitives";
import { TapPulse } from "../TapPulse";
import { Wordmark } from "../Wordmark";
import type { SlideProps } from "../slides";

/** The cardinal-to-gold glow and ribbed glass from the HackSC title frames. */
export function EmberGlow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,var(--color-ember),transparent)] opacity-70 blur-3xl" />
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,var(--color-accent-deep),transparent)] opacity-35 blur-3xl" />
    </div>
  );
}

const STRIPS = 12;
/** Strips land out of order, the way panes drop in the Figma intro. */
const dropOrder = [3, 7, 0, 10, 5, 1, 8, 11, 4, 9, 2, 6];

/** Panes of ribbed glass fall from above the stage and settle over the glow. */
function GlassStrips() {
  return (
    <div aria-hidden className="absolute inset-0 flex overflow-hidden">
      {Array.from({ length: STRIPS }, (_, index) => (
        <motion.div
          key={index}
          className="glass-strip h-full flex-1"
          initial={{ y: "-105%" }}
          animate={{ y: "0%", transition: { duration: 1.1, ease: easeDrawn, delay: 0.05 * dropOrder[index] } }}
        />
      ))}
    </div>
  );
}

const riseIn = (delay: number, rise: number) => ({
  initial: { opacity: 0, y: rise },
  animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: easeDrawn, delay } },
});

export function TitleSlide({ step }: SlideProps) {
  return (
    <div className="absolute inset-0">
      <EmberGlow className="-top-40 right-[-220px] h-[1100px] w-[1300px]" />
      <GlassStrips />
      <div className="absolute top-[150px] right-[180px]">
        <TapPulse size={760} ripples={3} nodeRadius={step === 0 ? 12 : 0} delay={0.9} />
      </div>
      {step >= 1 && (
        <motion.div {...riseIn(0.1, 140)} className="absolute top-[300px] right-[40px] w-[820px]">
          <BandRender className="w-full" />
        </motion.div>
      )}
      <div className="stage-gutter absolute inset-0 flex flex-col justify-center">
        <motion.div {...riseIn(0.8, 90)}>
          <Wordmark width={720} />
        </motion.div>
        <p className="mt-12 text-lede text-ink">
          <MaskedLines lines={[title.tagline]} delay={1.1} />
        </p>
        <div className="mt-14 h-[150px] max-w-[1100px]">
          {step >= 1 && (
            <p className="text-title font-medium text-accent">
              <motion.span initial="enter" animate="present" className="block">
                <MaskedLines lines={title.visionLines} />
              </motion.span>
            </p>
          )}
        </div>
        <motion.p variants={fadeReveal(1.4)} className="mt-10 text-caption text-ink-muted">
          {listNames(team.members)}
        </motion.p>
      </div>
    </div>
  );
}
