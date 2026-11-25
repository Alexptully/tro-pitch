"use client";

import { motion } from "motion/react";
import { team } from "@/content/config";
import { closing, title } from "@/content/content";
import { listNames } from "@/lib/format";
import { Network } from "../Network";
import { fadeReveal, MaskedLines } from "../primitives";
import { Wordmark } from "../Wordmark";
import { EmberGlow } from "./TitleSlide";

export function ClosingSlide() {
  return (
    <div className="absolute inset-0">
      <EmberGlow className="top-[200px] left-[460px] h-[800px] w-[1000px] opacity-60" />
      <div className="absolute inset-0 opacity-70">
        <Network width={1920} height={1080} nodes={110} lit={1} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_44%_42%_at_50%_50%,var(--color-paper)_55%,transparent)]" />
        <motion.div variants={fadeReveal(0.4, 20)} className="relative px-20 py-14">
          <Wordmark width={420} className="mx-auto" />
          <p className="mt-10 text-title font-medium text-ink">
            <MaskedLines lines={title.visionLines} delay={0.7} />
          </p>
          <motion.p variants={fadeReveal(1.3)} className="mt-8 text-lede font-semibold text-accent">
            {closing.signoff}
          </motion.p>
          <motion.p variants={fadeReveal(1.6)} className="mt-8 text-caption text-ink-muted">
            {listNames(team.members)}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
