/** Team placeholders. Anything in square brackets still needs a real value before we present. */
export const team = {
  productName: "trO",
  /** Shown on the title and closing slides, in this order. */
  members: ["Alex", "Cara", "Grace", "Alana", "Shin"],
  /** Opens from the pro forma appendix slide. Paste the share link of our Google Sheets copy. */
  proFormaLink: "[PRO FORMA SHEET LINK]",
  /** Opens from the closing slide's notes. */
  figmaLink: "https://www.figma.com/design/MoUjPy1XtogYnkaN2SbguU/Hack-SC?node-id=282-314",
};

/**
 * Who presents which slides. The course requires every member to present a different part.
 * `from` and `to` are slide numbers, inclusive.
 */
export const speakerSections = [
  { speaker: "Alex", from: 1, to: 2 },
  { speaker: "Cara", from: 3, to: 4 },
  { speaker: "Grace", from: 5, to: 7 },
  { speaker: "Alana", from: 8, to: 9 },
  { speaker: "Shin", from: 10, to: 12 },
];

export function isPlaceholder(value: string) {
  return value.startsWith("[") && value.endsWith("]");
}

export function speakerFor(slideNumber: number) {
  return speakerSections.find((section) => slideNumber >= section.from && slideNumber <= section.to)?.speaker;
}
