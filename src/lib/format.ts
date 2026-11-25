export function dollarsShort(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1e9) return `$${trim(value / 1e9)}B`;
  if (abs >= 1e6) return `$${trim(value / 1e6)}M`;
  if (abs >= 1e3) return `$${Math.round(value / 1e3)}K`;
  return `$${Math.round(value)}`;
}

function trim(value: number) {
  return value >= 100 ? value.toFixed(0) : value.toFixed(value >= 10 ? 1 : 2).replace(/\.?0+$/, "");
}

export function dollars(value: number, digits = 0) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export function count(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

export function percent(fraction: number) {
  return `${Math.round(fraction * 100)}%`;
}

/** "A, B and C", the way names read in a sentence. */
export function listNames(names: readonly string[]) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
