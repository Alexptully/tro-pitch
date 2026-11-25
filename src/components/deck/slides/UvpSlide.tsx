"use client";

import { motion } from "motion/react";
import { uvp } from "@/content/content";
import { Caption, fadeReveal } from "../primitives";

const partStyle = {
  frame: "text-point text-ink-faint",
  fill: "text-lede text-ink",
  benefit: "text-title font-semibold text-accent",
  difference: "text-title font-semibold text-accent",
} as const;

export function UvpSlide() {
  return (
    <div className="stage-gutter absolute inset-0 flex flex-col justify-center">
      <h2 className="sr-only">Unique value proposition</h2>
      <p className="max-w-[1640px] leading-[1.35]">
        {uvp.template.map((part, index) => (
          <motion.span key={part.text} variants={fadeReveal(0.08 * index, 10)} className={`${partStyle[part.kind]} inline`}>
            {part.text}{" "}
          </motion.span>
        ))}
      </p>
      <motion.div variants={fadeReveal(1.4)}>
        <Caption className="mt-14">{uvp.label}</Caption>
      </motion.div>
    </div>
  );
}
