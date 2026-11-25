"use client";

import { motion } from "motion/react";
import { competition, type Mark } from "@/content/content";
import { Caption, fadeReveal, Headline } from "../primitives";

function MarkIcon({ mark, ours }: { mark: Mark; ours: boolean }) {
  const fill = ours ? "var(--color-accent)" : "var(--color-ink-muted)";
  return (
    <svg viewBox="-20 -20 40 40" width={36} height={36} role="img" aria-label={competition.legend[mark]}>
      <circle r={15} fill="none" stroke={mark === "none" ? "var(--color-ink-faint)" : fill} strokeWidth={2.5} />
      {mark === "full" && <circle r={15} fill={fill} />}
      {mark === "half" && <path d="M 0 -15 A 15 15 0 0 0 0 15 Z" fill={fill} />}
    </svg>
  );
}

const GRID = "grid grid-cols-[540px_repeat(6,1fr)] items-center";

function HeaderRow() {
  return (
    <div className={`${GRID} pb-4`}>
      <span />
      {competition.columns.map((column) => (
        <p key={column.id} className={`px-2 text-center ${column.ours ? "text-title font-semibold text-accent" : "text-caption font-semibold text-ink"}`}>
          {column.name}
        </p>
      ))}
    </div>
  );
}

function FeatureRow({ row, index }: { row: (typeof competition.rows)[number]; index: number }) {
  const isKey = index === 0;
  return (
    <motion.div variants={fadeReveal(0.2 + index * 0.08, 12)} className={`${GRID} border-t border-rule py-5`}>
      <p className={isKey ? "text-point font-semibold text-ink" : "text-body text-ink-muted"}>{row.label}</p>
      {row.marks.map((mark, column) => (
        <div key={competition.columns[column].id} className="flex justify-center">
          <MarkIcon mark={mark} ours={competition.columns[column].ours === true} />
        </div>
      ))}
    </motion.div>
  );
}

function PriceRow() {
  return (
    <motion.div variants={fadeReveal(0.7, 12)} className={`${GRID} border-t border-rule py-5`}>
      <p className="text-body text-ink-muted">{competition.priceLabel}</p>
      {competition.columns.map((column) => (
        <p key={column.id} className={`px-3 text-center text-fineprint ${column.ours ? "font-semibold text-accent" : "text-ink-muted"}`}>
          {column.price}
        </p>
      ))}
    </motion.div>
  );
}

export function CompetitionSlide() {
  return (
    <div className="stage-gutter absolute inset-0 flex flex-col">
      <Headline text={competition.headline} />
      <div className="relative mt-14">
        <div aria-hidden className="absolute top-[-16px] right-0 bottom-[-12px] w-[calc((100%-540px)/6)] rounded-card bg-accent-wash/60" />
        <div className="relative">
          <HeaderRow />
          {competition.rows.map((row, index) => (
            <FeatureRow key={row.label} row={row} index={index} />
          ))}
          <PriceRow />
        </div>
      </div>
      <motion.div variants={fadeReveal(1)} className="mt-auto flex items-center gap-8">
        {(["full", "half", "none"] as const).map((mark) => (
          <span key={mark} className="flex items-center gap-2 text-fineprint text-ink-muted">
            <MarkIcon mark={mark} ours={false} />
            {competition.legend[mark]}
          </span>
        ))}
        <Caption className="text-fineprint">{competition.assessment}</Caption>
      </motion.div>
    </div>
  );
}
