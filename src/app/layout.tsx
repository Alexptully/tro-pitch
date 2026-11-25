import type { Metadata } from "next";
import type { ReactNode } from "react";
import { team } from "@/content/config";
import { title } from "@/content/content";
import { instrumentSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${team.productName}: final venture pitch`,
  description: title.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
