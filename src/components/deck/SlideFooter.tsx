import { sources } from "@/content/sources";
import { sourcesForStep, type SlideDefinition } from "./slides";

function Citations({ slide, step }: { slide: SlideDefinition; step: number }) {
  const cited = sourcesForStep(slide, step);
  if (cited.length === 0) return null;
  return (
    <p className="max-w-[1300px] text-fineprint text-ink-faint">
      Source{cited.length > 1 ? "s" : ""}: {cited.map((id) => sources[id].cite).join("; ")}
    </p>
  );
}

export function SlideFooter({ slide, step }: { slide: SlideDefinition; step: number }) {
  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex h-(--spacing-footer) items-center gap-gap px-stage-x pb-2">
      <Citations slide={slide} step={step} />
      {slide.section && <p className="ml-auto shrink-0 text-fineprint text-ink-faint">{slide.section}</p>}
    </footer>
  );
}
