"use client";

import { CheckCircle, LockSimple } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { vvp } from "@/content/content";
import { BandRender } from "../BandRender";
import { Caption, fadeReveal, Headline, strokeDraw } from "../primitives";
import { TapPulse } from "../TapPulse";

/** Where each callout sits around the render, and the leader line that points at the band. */
const calloutLayout = {
  tap: { box: "top-[300px] left-[112px] text-right w-[330px]", line: "M 460 345 L 610 500" },
  light: { box: "top-[250px] left-[1100px] w-[300px]", line: "M 1090 300 L 705 466" },
  button: { box: "top-[640px] left-[1100px] w-[300px]", line: "M 1090 680 L 815 562" },
} as const;

function Callouts() {
  return (
    <>
      <svg aria-hidden viewBox="0 0 1920 1080" className="pointer-events-none absolute inset-0 h-full w-full">
        {vvp.callouts.map((callout, index) => (
          <motion.path key={callout.id} d={calloutLayout[callout.id].line} stroke="var(--color-accent)" strokeWidth={2} fill="none" variants={strokeDraw(0.8 + index * 0.15, 0.7)} />
        ))}
      </svg>
      {vvp.callouts.map((callout, index) => (
        <motion.div key={callout.id} variants={fadeReveal(1 + index * 0.15, 10)} className={`absolute ${calloutLayout[callout.id].box}`}>
          <p className="text-point font-semibold text-ink">{callout.title}</p>
          <p className="mt-1 text-caption text-ink-muted">{callout.detail}</p>
        </motion.div>
      ))}
    </>
  );
}

function Sidebar() {
  return (
    <motion.aside variants={fadeReveal(1.3, 20)} className="absolute top-[200px] right-[112px] w-[400px] rounded-card bg-paper-raised p-9">
      <h3 className="text-point font-semibold text-accent">{vvp.sidebar.title}</h3>
      <ul className="mt-6 space-y-5">
        {vvp.sidebar.items.map((item) => (
          <li key={item} className="flex gap-3 text-caption text-ink">
            <CheckCircle size={30} weight="fill" className="shrink-0 text-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}

export function VvpSlide() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-[88px] left-[112px]">
        <Headline text={vvp.headline} />
      </div>
      <div className="absolute top-[260px] left-[520px]">
        <div className="absolute top-[-162px] left-[-40px]">
          <TapPulse size={700} ripples={2} nodeRadius={0} />
        </div>
        <motion.div variants={fadeReveal(0.3, 20)} className="relative w-[620px]">
          <BandRender />
        </motion.div>
      </div>
      <Callouts />
      <motion.p variants={fadeReveal(0.6)} className="absolute top-[700px] left-[470px] w-[600px] text-center text-body text-ink">
        {vvp.description}
      </motion.p>
      <Sidebar />
      <motion.div variants={fadeReveal(1.6)} className="absolute bottom-[110px] left-[112px] flex items-center gap-3">
        <LockSimple size={30} weight="fill" className="text-accent" aria-hidden />
        <Caption className="text-ink">{vvp.note}</Caption>
      </motion.div>
    </div>
  );
}
