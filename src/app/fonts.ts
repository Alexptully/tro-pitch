import localFont from "next/font/local";

/** Instrument Sans, variable in weight (400 to 700) and width (75 to 100). Self-hosted so the deck runs offline. */
export const instrumentSans = localFont({
  src: "./fonts/InstrumentSans-latin.woff2",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});
