"use client";

import { AnimatePresence, motion } from "motion/react";
import { problem } from "@/content/content";
import { dollars } from "@/lib/format";
import { easeDrawn } from "@/lib/motion";
import { Crowd, PersonShape } from "../Crowd";
import { layout, Network } from "../Network";
import { Caption, CountUp, fadeReveal, Headline, StepView, strokeDraw, useProgress } from "../primitives";
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
            <p className="text-title font-semibold text-ink figures-tabular">{dollars(problem.fading.spend)}</p>
            <Caption className="max-w-[560px]">{problem.fading.spendCaption}</Caption>
          </motion.div>
        </div>
        <Network width={820} height={600} nodes={70} lit={1 - problem.fading.value / 100} delay={0.2} className="-mt-10" />
      </div>
    </StepView>
  );
}

const ZOOM = { width: 1920, height: 1080, nodes: 90, scale: 3.2, center: { x: 960, y: 620 } };
const zoomNodes = layout(ZOOM.width, ZOOM.height, ZOOM.nodes);
/** The node nearest the middle of the stage, which the camera flies into. */
const focus = zoomNodes.reduce((best, node) =>
  Math.hypot(node.x - ZOOM.center.x, node.y - ZOOM.center.y) < Math.hypot(best.x - ZOOM.center.x, best.y - ZOOM.center.y) ? node : best,
);

/** Where each outcome sits on an ellipse around the node, in degrees (0 is to the right, 90 is down). */
const outcomeAngles = [200, 340, 20, 160, 90];
const ellipse = { rx: 520, ry: 290 };

function outcomePoint(angle: number, reach = 1) {
  const radians = (angle * Math.PI) / 180;
  return { x: ZOOM.center.x + Math.cos(radians) * ellipse.rx * reach, y: ZOOM.center.y + Math.sin(radians) * ellipse.ry * reach };
}

function anchorFor(angle: number) {
  if (angle === 90) return "middle";
  return Math.cos((angle * Math.PI) / 180) < 0 ? "end" : "start";
}

function Outcome({ label, angle, index }: { label: string; angle: number; index: number }) {
  const start = outcomePoint(angle, 0.22);
  const end = outcomePoint(angle, 0.84);
  const text = outcomePoint(angle, angle === 90 ? 1.02 : 0.9);
  const delay = 2.2 + index * 0.18;
  return (
    <g>
      <motion.line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="var(--color-accent)" strokeWidth={2} strokeOpacity={0.6} variants={strokeDraw(delay, 0.7)} />
      <motion.text x={text.x} y={text.y + 12} textAnchor={anchorFor(angle)} className="fill-ink text-point font-semibold" variants={fadeReveal(delay + 0.4, 10)}>
        {label}
      </motion.text>
    </g>
  );
}

/** The Figma zoom: the network rushes in on one lost node, and what it could have become appears around it. */
function Lost() {
  const fly = { x: ZOOM.center.x - focus.x, y: ZOOM.center.y - focus.y };
  return (
    <StepView className="p-0">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
        animate={{ scale: ZOOM.scale, x: fly.x, y: fly.y, opacity: 0.3, transition: { duration: 2.2, ease: easeDrawn, delay: 0.3 } }}
        style={{ transformOrigin: `${focus.x}px ${focus.y}px` }}
      >
        <Network width={ZOOM.width} height={ZOOM.height} nodes={ZOOM.nodes} lit={0.62} />
      </motion.div>
      <motion.div variants={fadeReveal(1.9)} className="absolute" style={{ left: ZOOM.center.x - 230, top: ZOOM.center.y - 230 }}>
        <TapPulse size={460} ripples={2} nodeRadius={14} rings={[0.3, 0.55, 0.8]} delay={1.9} />
      </motion.div>
      <svg aria-hidden viewBox={`0 0 ${ZOOM.width} ${ZOOM.height}`} className="absolute inset-0 h-full w-full overflow-visible">
        {problem.lost.outcomes.map((label, index) => (
          <Outcome key={label} label={label} angle={outcomeAngles[index]} index={index} />
        ))}
      </svg>
      <p className="sr-only">{problem.lost.outcomes.join(", ")}</p>
      <div className="absolute top-[88px] left-[112px]">
        <Headline text={problem.lost.headline} delay={1.6} />
      </div>
    </StepView>
  );
}

const views = [Story, Hired, Fading, Lost];

export function ProblemSlide({ step }: SlideProps) {
  const View = views[step];
  return (
    <AnimatePresence mode="wait">
      <View key={step} />
    </AnimatePresence>
  );
}
