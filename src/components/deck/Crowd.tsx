"use client";

import { motion } from "motion/react";
import { easeDrawn } from "@/lib/motion";

/** A head and shoulders, drawn at the origin, 100 units tall. */
export function PersonShape({ fill, x, y, scale = 1 }: { fill: string; x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx={0} cy={-62} r={20} fill={fill} />
      <path d="M-42 0 C-42 -26 -24 -38 0 -38 C24 -38 42 -26 42 0 Z" fill={fill} />
    </g>
  );
}

const rows = [
  { y: 230, scale: 1.0, count: 9, tone: "var(--color-crowd-far)" },
  { y: 300, scale: 1.25, count: 8, tone: "var(--color-crowd-mid)" },
  { y: 390, scale: 1.55, count: 7, tone: "var(--color-crowd-near)" },
];

/** A crowd at a mixer, with one person lit in gold: the student we follow through the pitch. */
export function Crowd({ width = 1000, height = 420 }: { width?: number; height?: number }) {
  return (
    <svg aria-hidden viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {rows.map((row, rowIndex) =>
        Array.from({ length: row.count }, (_, index) => {
          const spacing = width / row.count;
          const x = spacing * (index + 0.5) + (rowIndex % 2 ? spacing * 0.18 : 0);
          const isHero = rowIndex === 2 && index === 3;
          return (
            <motion.g
              key={`${rowIndex}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: easeDrawn, delay: rowIndex * 0.12 + index * 0.03 } }}
            >
              <PersonShape fill={isHero ? "var(--color-accent)" : row.tone} x={x} y={row.y} scale={row.scale} />
            </motion.g>
          );
        }),
      )}
    </svg>
  );
}
