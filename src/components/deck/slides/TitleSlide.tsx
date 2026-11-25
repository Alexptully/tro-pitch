"use client";

import { motion } from "motion/react";
import { team } from "@/content/config";
import { title } from "@/content/content";
import { listNames } from "@/lib/format";
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

export function TitleSlide({ step }: SlideProps) {
  return (
    <div className="absolute inset-0">
      <EmberGlow className="-top-40 right-[-220px] h-[1100px] w-[1300px]" />
      <div aria-hidden className="ribbed-glass absolute inset-0" />
      <div className="absolute top-[150px] right-[180px]">
        <TapPulse size={760} ripples={3} nodeRadius={step === 0 ? 12 : 0} />
      </div>
      {step >= 1 && (
        <motion.div initial="enter" animate="present" variants={fadeReveal(0.1, 30)} className="absolute top-[300px] right-[40px] w-[820px]">
          <BandRender className="w-full" />
        </motion.div>
      )}
      <div className="stage-gutter absolute inset-0 flex flex-col justify-center">
        <motion.div variants={fadeReveal(0.1, 20)}>
          <Wordmark width={720} />
        </motion.div>
        <p className="mt-12 text-lede text-ink">
          <MaskedLines lines={[title.tagline]} delay={0.4} />
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
        <motion.p variants={fadeReveal(0.8)} className="mt-10 text-caption text-ink-muted">
          {listNames(team.members)}
        </motion.p>
      </div>
    </div>
  );
}
