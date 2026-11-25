"use client";

import { motion, type Variants } from "motion/react";
import { asset } from "@/lib/asset";

const defaultAlt = "The trO band: a maroon wristband with three status lights, the trO logo and a button";

/** The trO band render from our HackSC Figma. Its backdrop matches --color-paper, and its edges fade out. */
export function BandRender({ className = "", variants, alt = defaultAlt }: { className?: string; variants?: Variants; alt?: string }) {
  return <motion.img src={asset("/renders/tro-band.png")} alt={alt} draggable={false} variants={variants} className={`pointer-events-none select-none ${className}`} />;
}
