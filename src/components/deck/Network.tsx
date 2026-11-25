"use client";

import { motion } from "motion/react";
import { easeDrawn } from "@/lib/motion";

/** The Trojan network: gold nodes joined by thin lines. Laid out from a fixed seed so every render matches. */
type NetworkProps = {
  width: number;
  height: number;
  nodes?: number;
  /** Fraction of nodes still lit. The rest fade to embers, the way lost connections do. */
  lit?: number;
  delay?: number;
  className?: string;
};

type Node = { x: number; y: number; size: number; order: number };

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function layout(width: number, height: number, count: number): Node[] {
  const random = seeded(42);
  return Array.from({ length: count }, (_, index) => ({
    x: 40 + random() * (width - 80),
    y: 40 + random() * (height - 80),
    size: 3 + random() * 5,
    order: index,
  }));
}

function links(nodes: Node[], reach: number) {
  const pairs: [Node, Node][] = [];
  nodes.forEach((a, i) => {
    nodes.slice(i + 1).forEach((b) => {
      if (Math.hypot(a.x - b.x, a.y - b.y) < reach) pairs.push([a, b]);
    });
  });
  return pairs;
}

function isLit(node: Node, total: number, lit: number) {
  return (node.order * 37) % total < lit * total;
}

export function Network({ width, height, nodes = 60, lit = 1, delay = 0, className = "" }: NetworkProps) {
  const points = layout(width, height, nodes);
  const pairs = links(points, Math.min(width, height) * 0.26);
  return (
    <svg aria-hidden viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={`overflow-visible ${className}`}>
      {pairs.map(([a, b]) => {
        const both = isLit(a, nodes, lit) && isLit(b, nodes, lit);
        return (
          <motion.line
            key={`${a.order}-${b.order}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={both ? "var(--color-accent)" : "var(--color-rule)"}
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: both ? 0.35 : 0.5, transition: { duration: 1.2, delay: delay + 0.3 } }}
          />
        );
      })}
      {points.map((node) => {
        const on = isLit(node, nodes, lit);
        return (
          <motion.circle
            key={node.order}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill={on ? "var(--color-accent)" : "var(--color-ink-faint)"}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: on ? 1 : 0.35, scale: 1, transition: { duration: 0.9, ease: easeDrawn, delay: delay + (node.order % 12) * 0.04 } }}
            style={{ filter: on ? "drop-shadow(0 0 6px rgb(243 219 124 / 0.7))" : undefined }}
          />
        );
      })}
    </svg>
  );
}
