"use client";

import { motion } from "motion/react";
import { canvas } from "@/content/content";
import { fadeReveal } from "../primitives";

type BlockId = keyof typeof canvas.blocks;

/** The standard Business Model Canvas layout: five columns on top, costs and revenue below. */
const placement: Record<BlockId, string> = {
  partners: "col-start-1 row-span-2",
  activities: "col-start-2",
  resources: "col-start-2 row-start-2",
  value: "col-start-3 row-span-2",
  relationships: "col-start-4",
  channels: "col-start-4 row-start-2",
  segments: "col-start-5 row-span-2",
  costs: "col-span-2 col-start-1 row-start-3",
  revenue: "col-span-3 col-start-3 row-start-3",
};

function Block({ id, index }: { id: BlockId; index: number }) {
  const block = canvas.blocks[id];
  const isValue = id === "value";
  return (
    <motion.section variants={fadeReveal(0.1 + index * 0.05, 10)} className={`flex flex-col gap-3 rounded-card p-6 ${isValue ? "bg-accent-wash" : "bg-paper-raised"} ${placement[id]}`}>
      <h3 className={`text-caption font-semibold ${isValue ? "text-accent" : "text-ink"}`}>{block.title}</h3>
      <ul className="space-y-2">
        {block.items.map((item) => (
          <li key={item} className="text-fineprint text-ink-muted">
            {item}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

export function CanvasSlide() {
  const ids = Object.keys(canvas.blocks) as BlockId[];
  return (
    <div className="absolute inset-0 flex flex-col px-stage-x pt-16 pb-24">
      <h2 className="text-title font-semibold">{canvas.headline}</h2>
      <div className="mt-8 grid flex-1 grid-cols-5 grid-rows-[1fr_1fr_0.8fr] gap-3">
        {ids.map((id, index) => (
          <Block key={id} id={id} index={index} />
        ))}
      </div>
    </div>
  );
}
