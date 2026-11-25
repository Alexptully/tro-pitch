import { wordmarkPath, wordmarkViewBox } from "./wordmarkPath";

export function Wordmark({ width, className = "", label = "trO" }: { width: number; className?: string; label?: string }) {
  return (
    <svg role="img" aria-label={label} viewBox={wordmarkViewBox} width={width} className={`text-accent ${className}`}>
      <path fill="currentColor" fillRule="evenodd" d={wordmarkPath} />
    </svg>
  );
}
