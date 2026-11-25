"use client";

import { motion, useTime, useTransform } from "motion/react";
import { strokeDraw } from "./primitives";

type VoiceWaveProps = { width: number; height: number; delay?: number; strokeWidth?: number; tone?: "accent" | "ink" | "rival" };

const SAMPLE_COUNT = 160;
const toneColor = { accent: "var(--color-accent)", ink: "var(--color-ink)", rival: "var(--color-rival)" };

function wavePath(width: number, height: number, seconds: number) {
  const middle = height / 2;
  const points: string[] = [];
  for (let sample = 0; sample <= SAMPLE_COUNT; sample += 1) {
    const position = sample / SAMPLE_COUNT;
    const taper = Math.sin(position * Math.PI);
    const envelope = Math.max(0.15, 0.55 + 0.45 * Math.sin(position * 9 - seconds * 2.1) * Math.sin(position * 3.7 + seconds * 0.8));
    const carrier = Math.sin(position * 58 - seconds * 7) * 0.7 + Math.sin(position * 21 + seconds * 3) * 0.3;
    points.push(`${(position * width).toFixed(1)} ${(middle + carrier * envelope * taper * middle * 0.9).toFixed(1)}`);
  }
  return `M ${points.join(" L ")}`;
}

/** Speech, drawn as a live waveform. */
export function VoiceWave({ width, height, delay = 0, strokeWidth = 4, tone = "accent" }: VoiceWaveProps) {
  const time = useTime();
  const d = useTransform(time, (milliseconds) => wavePath(width, height, milliseconds / 1000));
  return (
    <svg aria-hidden viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="overflow-visible">
      <motion.path d={d} fill="none" stroke={toneColor[tone]} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" variants={strokeDraw(delay, 1.4)} />
    </svg>
  );
}
