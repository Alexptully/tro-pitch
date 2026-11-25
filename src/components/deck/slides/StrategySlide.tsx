"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { strategy, type CanvasPlayer } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { Caption, fadeReveal, Headline } from "../primitives";
import type { SlideProps } from "../slides";

const CHART = { width: 1500, height: 520, left: 0, top: 70 };
const step = CHART.width / (strategy.factors.length - 1);
const x = (index: number) => CHART.left + index * step;
const y = (score: number) => CHART.top + CHART.height - (score / 10) * CHART.height;

function pathFor(player: CanvasPlayer) {
  return player.scores.map((score, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(score)}`).join(" ");
}

/** Groups of factors under one Four Actions verb, for the bracket above the chart. */
function actionGroups() {
  const groups: { action: string; from: number; to: number }[] = [];
  strategy.factors.forEach((factor, index) => {
    const last = groups[groups.length - 1];
    if (last && last.action === factor.action) last.to = index;
    else groups.push({ action: factor.action, from: index, to: index });
  });
  return groups;
}

function ActionBrackets() {
  return actionGroups().map((group, index) => (
    <motion.g key={group.action} initial="enter" animate="present" variants={fadeReveal(0.6 + index * 0.1)}>
      <line x1={x(group.from) - 20} x2={x(group.to) + 20} y1={18} y2={18} stroke="var(--color-accent)" strokeWidth={2} />
      <text x={(x(group.from) + x(group.to)) / 2} y={0} textAnchor="middle" className="fill-accent text-caption font-semibold">
        {group.action}
      </text>
    </motion.g>
  ));
}

function Grid() {
  return strategy.factors.map((factor, index) => (
    <g key={factor.label}>
      <line x1={x(index)} x2={x(index)} y1={CHART.top} y2={CHART.top + CHART.height} stroke="var(--color-rule)" strokeWidth={1} />
      <foreignObject x={x(index) - 95} y={CHART.top + CHART.height + 18} width={190} height={110}>
        <p className="text-center text-fineprint leading-snug text-ink-muted">{factor.label}</p>
      </foreignObject>
    </g>
  ));
}

/** Moves end labels apart where two lines finish at the same score. */
const labelOffset: Record<string, number> = { nfc: -16, pin: 22 };

type LineProps = { player: CanvasPlayer; dimmed: boolean; delay: number; onHover: (id: string | null) => void };

function PlayerLine({ player, dimmed, delay, onHover }: LineProps) {
  const ours = player.ours === true;
  const last = player.scores.length - 1;
  return (
    <g data-interactive onPointerEnter={() => onHover(player.id)} onPointerLeave={() => onHover(null)} style={{ opacity: dimmed ? 0.15 : 1, transition: "opacity 300ms" }}>
      <motion.path
        d={pathFor(player)}
        fill="none"
        stroke={ours ? "var(--color-accent)" : "var(--color-rival)"}
        strokeWidth={ours ? 8 : 2.5}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: ours ? 1.6 : 1.1, ease: easeDrawn, delay } }}
        style={ours ? { filter: "drop-shadow(0 0 10px rgb(243 219 124 / 0.5))" } : undefined}
      />
      <path d={pathFor(player)} fill="none" stroke="transparent" strokeWidth={24} />
      {player.scores.map((score, index) => (
        <circle key={index} cx={x(index)} cy={y(score)} r={ours ? 9 : 5} fill={ours ? "var(--color-accent)" : "var(--color-rival)"} />
      ))}
      <text x={x(last) + 22} y={y(player.scores[last]) + 8 + (labelOffset[player.id] ?? 0)} className={ours ? "fill-accent text-point font-semibold" : "fill-ink-muted text-caption"}>
        {player.name}
      </text>
    </g>
  );
}


function Legend({ hidden, toggle }: { hidden: Set<string>; toggle: (id: string) => void }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {strategy.players.map((player) => (
        <li key={player.id}>
          <button
            type="button"
            data-interactive
            aria-pressed={!hidden.has(player.id)}
            onClick={(event) => {
              event.stopPropagation();
              toggle(player.id);
            }}
            className={`flex items-center gap-2.5 rounded-chip px-3.5 py-1.5 text-fineprint transition-opacity ${hidden.has(player.id) ? "opacity-40" : ""} ${player.ours ? "bg-accent-wash text-accent" : "bg-paper-raised text-ink-muted"}`}
          >
            <span className={`h-1 w-7 rounded-full ${player.ours ? "bg-accent" : "bg-rival"}`} />
            {player.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function StrategySlide({ step: beat }: SlideProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setHidden((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const visible = strategy.players.filter((player) => !hidden.has(player.id) && (beat >= 1 || !player.ours));
  return (
    <div className="stage-gutter absolute inset-0 flex flex-col">
      <Headline text={strategy.headline} />
      <svg viewBox={`-40 -40 ${CHART.width + 420} ${CHART.height + 230}`} className="mt-4 h-[600px] w-full overflow-visible">
        <Grid />
        {beat >= 1 && <ActionBrackets />}
        {visible.map((player, index) => (
          <PlayerLine key={player.id} player={player} dimmed={hovered !== null && hovered !== player.id} delay={player.ours ? 0.2 : index * 0.12} onHover={setHovered} />
        ))}
      </svg>
      <div className="mt-6">
        <Legend hidden={hidden} toggle={toggle} />
      </div>
      <Caption className="mt-3 text-fineprint">
        {strategy.scaleLabel}. {strategy.legendHint}.
      </Caption>
    </div>
  );
}
