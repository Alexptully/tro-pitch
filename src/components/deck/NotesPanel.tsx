"use client";

import { Printer, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { speakerFor } from "@/content/config";
import { asset } from "@/lib/asset";
import { easeDrawn } from "@/lib/motion";
import type { SlideDefinition } from "./slides";

const shortcuts = [
  ["Next", "→ or Space"],
  ["Back", "←"],
  ["Notes", "N"],
  ["Full screen", "F"],
  ["Print", "P"],
];

type NotesPanelProps = { open: boolean; slide: SlideDefinition; slideNumber: number; step: number; onClose: () => void };

function notesForStep(slide: SlideDefinition, step: number) {
  return slide.notes.length === slide.steps ? [slide.notes[step]] : slide.notes;
}

export function NotesPanel({ open, slide, slideNumber, step, onClose }: NotesPanelProps) {
  const speaker = speakerFor(slideNumber);
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          aria-label="Presenter notes"
          data-interactive
          className="absolute inset-x-4 bottom-4 z-40 mx-auto flex max-h-[42vh] max-w-4xl cursor-auto flex-col overflow-hidden rounded-2xl bg-paper-raised text-ink shadow-float select-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: easeDrawn } }}
          exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between gap-4 px-6 pt-5">
            <div className="flex items-baseline gap-3">
              <h2 className="text-lg font-bold">
                {slideNumber}. {slide.name}
              </h2>
              {slide.steps > 1 && (
                <p className="text-sm font-semibold text-ink-muted figures-tabular">
                  Step {step + 1} of {slide.steps}
                </p>
              )}
              {speaker && <p className="text-sm font-semibold text-accent">{speaker} presents</p>}
            </div>
            <div className="flex items-center gap-1">
              <a href={asset("/print/")} target="_blank" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-muted hover:bg-paper hover:text-ink">
                <Printer size={18} weight="bold" aria-hidden />
                Print or save as PDF
              </a>
              <button type="button" onClick={onClose} aria-label="Close notes" className="rounded-full p-2 text-ink-muted hover:bg-paper hover:text-ink">
                <X size={18} weight="bold" aria-hidden />
              </button>
            </div>
          </div>
          <div className="space-y-3 overflow-y-auto px-6 pt-3 pb-4 text-base leading-relaxed">
            {notesForStep(slide, step).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="flex flex-wrap gap-x-5 gap-y-1 bg-paper px-6 py-3 text-sm text-ink-muted">
            {shortcuts.map(([action, key]) => (
              <div key={action} className="flex gap-1.5">
                <dt>{action}</dt>
                <dd className="font-semibold text-ink">{key}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
