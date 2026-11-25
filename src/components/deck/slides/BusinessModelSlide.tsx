"use client";

import { motion } from "motion/react";
import { businessModel } from "@/content/content";
import { months, useOfFunds, years } from "@/content/proForma";
import { easeDrawn } from "@/lib/motion";
import { Caption, fadeReveal, Headline } from "../primitives";
import type { SlideProps } from "../slides";

/** One attendee's event fee, split into what it costs us and what we keep. */
function EventsColumn() {
  const { events } = businessModel;
  return (
    <div className="w-[1000px]">
      <h3 className="text-title font-semibold text-ink">{events.name}</h3>
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-display font-semibold text-accent figures-tabular">{events.price}</p>
          <Caption>{events.priceCaption}</Caption>
        </div>
        <div className="text-right">
          <p className="text-headline font-semibold text-ink figures-tabular">{events.margin}</p>
          <Caption>{events.marginCaption}</Caption>
        </div>
      </div>
      <div className="mt-8 flex h-14 w-full overflow-hidden rounded-chip bg-accent">
        <motion.div className="h-full bg-rival" initial={{ width: 0 }} animate={{ width: `${events.costShare * 100}%`, transition: { duration: 1.2, ease: easeDrawn, delay: 0.5 } }} />
      </div>
      <div className="mt-4 flex items-baseline gap-4">
        <p className="text-point font-semibold text-ink-muted figures-tabular">{events.cost}</p>
        <Caption>{events.costCaption}</Caption>
      </div>
      <div className="mt-14 flex items-baseline gap-6 border-t border-rule pt-10">
        <p className="text-title font-semibold text-ink figures-tabular">{events.booth.value}</p>
        <Caption>{events.booth.caption}</Caption>
      </div>
    </div>
  );
}

function PersonalColumn() {
  const { personal } = businessModel;
  return (
    <motion.div variants={fadeReveal(0.6, 20)} className="flex-1 rounded-card bg-paper-raised p-12 shadow-lift">
      <h3 className="text-title font-semibold text-accent">{personal.name}</h3>
      <ul className="mt-10 space-y-10">
        {personal.items.map((item) => (
          <li key={item.caption}>
            <p className="text-headline font-semibold text-ink figures-tabular">{item.value}</p>
            <Caption className="mt-2">{item.caption}</Caption>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

const CHART = { width: 1600, height: 470 };
const maxValue = Math.max(...months.map((month) => Math.max(month.revenue, month.expenses))) * 1.05;
const px = (index: number) => (index / (months.length - 1)) * CHART.width;
const py = (value: number) => CHART.height - (value / maxValue) * CHART.height;
const line = (key: "revenue" | "expenses") => months.map((month, index) => `${index === 0 ? "M" : "L"} ${px(index).toFixed(1)} ${py(month[key]).toFixed(1)}`).join(" ");

function ProfitShading() {
  return months.map((month, index) => {
    if (month.revenue <= month.expenses || index === 0) return null;
    return <rect key={month.index} x={px(index - 0.5)} y={0} width={CHART.width / (months.length - 1)} height={CHART.height} fill="var(--color-accent)" opacity={0.08} />;
  });
}

function YearAxis() {
  return years.map((year, offset) => (
    <g key={year.year}>
      <line x1={px(offset * 12)} x2={px(offset * 12)} y1={0} y2={CHART.height} stroke="var(--color-rule)" />
      <text x={px(offset * 12) + 16} y={CHART.height + 50} className="fill-ink text-point font-semibold">
        {year.year}
      </text>
      <text x={px(offset * 12) + 16} y={CHART.height + 88} className="fill-ink-muted text-caption">
        {businessModel.yearLabel(year)}
      </text>
    </g>
  ));
}

function Chart() {
  const last = months[months.length - 1];
  return (
    <svg viewBox={`-10 -20 ${CHART.width + 200} ${CHART.height + 120}`} className="h-[600px] w-full overflow-visible">
      <ProfitShading />
      <YearAxis />
      <line x1={0} x2={CHART.width} y1={CHART.height} y2={CHART.height} stroke="var(--color-rule)" />
      <motion.path d={line("expenses")} fill="none" stroke="var(--color-rival)" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { duration: 1.6, ease: easeDrawn } }} />
      <motion.path
        d={line("revenue")}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={7}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 2, ease: easeDrawn, delay: 0.3 } }}
        style={{ filter: "drop-shadow(0 0 10px rgb(243 219 124 / 0.45))" }}
      />
      <text x={px(months.length - 1) + 18} y={py(last.revenue) + 8} className="fill-accent text-point font-semibold">
        {businessModel.chart.revenueLabel}
      </text>
      <text x={px(months.length - 1) + 18} y={py(last.expenses) + 40} className="fill-ink-muted text-caption">
        {businessModel.chart.expensesLabel}
      </text>
    </svg>
  );
}

export function BusinessModelSlide({ step }: SlideProps) {
  return (
    <div className="stage-gutter absolute inset-0 flex flex-col">
      <Headline text={businessModel.headline} />
      {step === 0 ? (
        <motion.div key="unit" initial="enter" animate="present" variants={fadeReveal(0.2, 20)} className="mt-14 flex items-start gap-24">
          <EventsColumn />
          <PersonalColumn />
        </motion.div>
      ) : (
        <motion.div key="chart" initial="enter" animate="present" variants={fadeReveal(0, 0)} className="mt-10">
          <Chart />
          <div className="mt-2 flex items-center gap-8">
            <span className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-md bg-accent/20" />
              <Caption className="text-fineprint">{businessModel.chart.profitableLabel}</Caption>
            </span>
            <Caption className="text-fineprint">{businessModel.chart.caption}</Caption>
            <Caption className="ml-auto text-fineprint">{businessModel.chart.cashLine(useOfFunds.lowestCash)}</Caption>
          </div>
        </motion.div>
      )}
    </div>
  );
}
