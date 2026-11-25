"use client";

import { motion } from "motion/react";
import { funds } from "@/content/content";
import { totalSpendOverRunway, useOfFunds } from "@/content/proForma";
import { dollarsShort, percent } from "@/lib/format";
import { easeDrawn } from "@/lib/motion";
import { Caption, fadeReveal, Headline } from "../primitives";

/** Shades of the accent, strongest for the biggest share, so the bar reads as one gold whole. */
const shade = ["bg-accent", "bg-accent/75", "bg-accent/55", "bg-accent/38", "bg-accent/24"];
const share = (amount: number) => amount / totalSpendOverRunway;

function SpendBar() {
  return (
    <div className="flex h-20 w-full gap-1.5">
      {useOfFunds.categories.map((category, index) => (
        <motion.div
          key={category.id}
          className={`h-full first:rounded-l-2xl last:rounded-r-2xl ${shade[index]}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 0.9, ease: easeDrawn, delay: 0.3 + index * 0.12 } }}
          style={{ width: `${share(category.amount) * 100}%`, transformOrigin: "left" }}
        />
      ))}
    </div>
  );
}

function SpendList() {
  return (
    <ul className="grid grid-cols-2 gap-x-20 gap-y-6">
      {useOfFunds.categories.map((category, index) => (
        <motion.li key={category.id} variants={fadeReveal(0.7 + index * 0.08, 8)} className="flex items-start gap-5">
          <span className={`mt-2 size-6 shrink-0 rounded-md ${shade[index]}`} />
          <p className="w-[150px] shrink-0 text-point font-semibold text-ink figures-tabular">{dollarsShort(category.amount)}</p>
          <div>
            <p className="text-body font-semibold text-ink">
              {category.label} <span className="font-normal text-ink-muted">{percent(share(category.amount))}</span>
            </p>
            <p className="text-caption text-ink-muted">{category.detail}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

function Milestones() {
  return (
    <motion.div variants={fadeReveal(1.2, 16)} className="flex items-start gap-20 border-t border-rule pt-8">
      <h3 className="w-[200px] text-point font-semibold text-accent">{funds.milestonesLabel}</h3>
      {funds.milestones.map((milestone) => (
        <div key={milestone.caption}>
          <p className="text-title font-semibold text-ink figures-tabular">{milestone.value}</p>
          <Caption>{milestone.caption}</Caption>
        </div>
      ))}
    </motion.div>
  );
}

export function UseOfFundsSlide() {
  return (
    <div className="stage-gutter absolute inset-0 flex flex-col">
      <Headline text={funds.headline} />
      <motion.div variants={fadeReveal(0.2)}>
        <Caption className="mt-5">{funds.askCaption}</Caption>
      </motion.div>
      <div className="mt-10 flex flex-col gap-10">
        <SpendBar />
        <SpendList />
      </div>
      <div className="mt-auto flex flex-col gap-4">
        <Milestones />
        <motion.div variants={fadeReveal(1.4)}>
          <Caption className="text-fineprint">{funds.reserveLine(useOfFunds.cashAtMilestone)}</Caption>
        </motion.div>
      </div>
    </div>
  );
}
