"use client";

import { AnimatePresence, motion } from "motion/react";
import { problem } from "@/content/content";
import { count } from "@/lib/format";
import { Crowd, PersonShape } from "../Crowd";
import { Network } from "../Network";
import { Caption, CountUp, fadeReveal, Headline, StepView, useProgress } from "../primitives";
import { TapPulse } from "../TapPulse";
import type { SlideProps } from "../slides";

function Story() {
  return (
    <StepView className="flex flex-col items-center justify-center">
      <div className="relative">
        <Crowd width={1300} height={460} />
        <motion.div variants={fadeReveal(1, 16)} className="absolute top-[40px] left-[700px] w-[520px] rounded-card bg-ink px-8 py-6 shadow-lift">
          <p className="text-point font-medium text-paper">{problem.story.thought}</p>
        </motion.div>
      </div>
      <motion.div variants={fadeReveal(1.4)}>
        <Caption className="mt-10 text-center">{problem.story.caption}</Caption>
      </motion.div>
    </StepView>
  );
}

function BigPercent({ value, caption }: { value: number; caption: string }) {
  const progress = useProgress(1.4, 0.3);
  return (
    <div className="max-w-[760px]">
      <p className="text-poster font-semibold text-accent figures-tabular">
        <CountUp progress={progress} total={value} format={(v) => `${Math.round(v)}%`} />
      </p>
      <motion.p variants={fadeReveal(0.5)} className="mt-6 text-point text-ink">
        {caption}
      </motion.p>
    </div>
  );
}

function Hired() {
  return (
    <StepView className="flex flex-col">
      <Headline text={problem.hired.headline} />
      <div className="mt-20 flex items-start justify-between">
        <BigPercent value={problem.hired.value} caption={problem.hired.caption} />
        <div className="relative -mt-24 mr-24 h-[620px] w-[620px]">
          <TapPulse size={620} ripples={2} nodeRadius={0} rings={[0.45, 0.72, 1]} />
          <svg aria-hidden viewBox="-100 -100 200 200" className="absolute inset-0 m-auto h-[300px] w-[300px] overflow-visible">
            <PersonShape fill="var(--color-accent)" x={0} y={70} scale={1.5} />
          </svg>
        </div>
      </div>
    </StepView>
  );
}

function Fading() {
  return (
    <StepView className="flex flex-col">
      <Headline text={problem.fading.headline} />
      <div className="mt-16 flex items-start justify-between">
        <div className="flex flex-col gap-16">
          <BigPercent value={problem.fading.value} caption={problem.fading.caption} />
          <motion.div variants={fadeReveal(0.9)} className="flex items-baseline gap-5">
            <p className="text-title font-semibold text-ink figures-tabular">{count(problem.fading.alumni)}</p>
            <Caption>{problem.fading.alumniCaption}</Caption>
          </motion.div>
        </div>
        <Network width={820} height={600} nodes={70} lit={1 - problem.fading.value / 100} delay={0.2} className="-mt-10" />
      </div>
    </StepView>
  );
}

const views = [Story, Hired, Fading];

export function ProblemSlide({ step }: SlideProps) {
  const View = views[step];
  return (
    <AnimatePresence mode="wait">
      <View key={step} />
    </AnimatePresence>
  );
}
