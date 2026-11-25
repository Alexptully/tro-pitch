"use client";

import { ArrowSquareOut } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { isPlaceholder, team } from "@/content/config";
import { proFormaDetail } from "@/content/content";
import { years } from "@/content/proForma";
import { Caption, fadeReveal, Headline } from "../primitives";

function SheetLink() {
  if (isPlaceholder(team.proFormaLink)) return <Caption className="text-fineprint">{proFormaDetail.linkLabel}: {team.proFormaLink}</Caption>;
  return (
    <a href={team.proFormaLink} target="_blank" rel="noreferrer" data-interactive className="flex items-center gap-2 text-caption font-semibold text-accent underline underline-offset-4">
      {proFormaDetail.linkLabel}
      <ArrowSquareOut size={24} weight="bold" aria-hidden />
    </a>
  );
}

export function ProFormaSlide() {
  return (
    <div className="stage-gutter absolute inset-0 flex flex-col">
      <Headline text={proFormaDetail.headline} />
      <div className="mt-14 flex gap-24">
        <motion.table variants={fadeReveal(0.2, 12)} className="w-[1000px] text-body">
          <thead>
            <tr className="border-b border-rule text-left">
              <th className="pb-4 font-normal text-ink-muted" />
              {years.map((year) => (
                <th key={year.year} className="pb-4 text-right text-point font-semibold">
                  {year.year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {proFormaDetail.rows.map((row) => (
              <tr key={row.label} className="border-b border-rule">
                <td className="py-4 text-ink-muted">{row.label}</td>
                {years.map((year) => (
                  <td key={year.year} className={`py-4 text-right figures-tabular ${row.key ? "font-semibold text-accent" : "text-ink"}`}>
                    {row.value(year)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </motion.table>
        <motion.div variants={fadeReveal(0.5, 12)} className="flex-1">
          <h3 className="text-point font-semibold text-accent">{proFormaDetail.assumptionsLabel}</h3>
          <ul className="mt-6 space-y-4">
            {proFormaDetail.assumptions.map((item) => (
              <li key={item} className="text-caption text-ink">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="mt-auto">
        <SheetLink />
      </div>
    </div>
  );
}
