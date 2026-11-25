"use client";

import { motion } from "motion/react";
import { appendix } from "@/content/content";
import { sources, type Source } from "@/content/sources";
import { fadeReveal } from "../primitives";

const list = Object.values(sources) as Source[];

export function SourcesSlide() {
  return (
    <div className="absolute inset-0 flex flex-col px-stage-x pt-16 pb-24">
      <h2 className="text-title font-semibold">{appendix.headline}</h2>
      <motion.ol variants={fadeReveal(0.2)} className="mt-10 columns-2 gap-16">
        {list.map((source) => (
          <li key={source.title} className="mb-5 break-inside-avoid text-fineprint text-ink-muted">
            {source.url ? (
              <a href={source.url} target="_blank" rel="noreferrer" data-interactive className="text-ink hover:underline">
                {source.title}
              </a>
            ) : (
              <span className="text-ink">{source.title}</span>
            )}
          </li>
        ))}
      </motion.ol>
    </div>
  );
}
