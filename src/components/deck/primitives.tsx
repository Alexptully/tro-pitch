"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue, type Variants } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { easeDrawn, exitTransition } from "@/lib/motion";

export function lineReveal(delay: number): Variants {
  return {
    enter: { y: "110%" },
    present: { y: "0%", transition: { duration: 1, ease: easeDrawn, delay } },
    exit: { y: "-110%", transition: exitTransition },
  };
}

export function fadeReveal(delay: number, rise = 0): Variants {
  return {
    enter: { opacity: 0, y: rise },
    present: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeDrawn, delay } },
    exit: { opacity: 0, transition: exitTransition },
  };
}

export function strokeDraw(delay: number, duration = 1.2): Variants {
  return {
    enter: { pathLength: 0, opacity: 0 },
    present: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration, ease: easeDrawn, delay }, opacity: { duration: 0.01, delay } },
    },
    exit: { opacity: 0, transition: exitTransition },
  };
}

export function MaskedLines({ lines, delay = 0, stagger = 0.09 }: { lines: readonly string[]; delay?: number; stagger?: number }) {
  return lines.map((line, index) => (
    <span key={line} className="line-mask">
      <motion.span className="block" variants={lineReveal(delay + index * stagger)}>
        {line}
      </motion.span>
    </span>
  ));
}

/** The slide's one heading, revealed line by line. */
export function Headline({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <h2 className={`max-w-[1500px] text-headline font-semibold tracking-normal ${className}`}>
      <MaskedLines lines={[text]} delay={delay} />
    </h2>
  );
}

export function useProgress(duration: number, delay: number) {
  const progress = useMotionValue(0);
  useEffect(() => {
    const controls = animate(progress, 1, { duration, delay, ease: [...easeDrawn] });
    return () => controls.stop();
  }, [progress, duration, delay]);
  return progress;
}

export function CountUp({ progress, total, format }: { progress: MotionValue<number>; total: number; format: (value: number) => string }) {
  const text = useTransform(progress, (value) => format(value * total));
  return (
    <span className="inline-grid">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {format(total)}
      </span>
      <motion.span aria-hidden className="col-start-1 row-start-1">
        {text}
      </motion.span>
      <span className="sr-only">{format(total)}</span>
    </span>
  );
}

const stepViewFrame: Variants = { exit: { opacity: 0, transition: exitTransition } };

/** A full-stage layer that animates in when its step appears. Key it by step to replay. */
export function StepView({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="enter" animate="present" exit="exit" variants={stepViewFrame} className={`stage-gutter absolute inset-0 ${className}`}>
      {children}
    </motion.div>
  );
}

/** Small, sentence-case label that sits under a figure or beside a mark. Never above a heading. */
export function Caption({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-caption text-ink-muted ${className}`}>{children}</p>;
}
