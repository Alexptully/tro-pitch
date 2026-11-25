"use client";

import { Briefcase, Smiley, SmileySad } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { customerProfile } from "@/content/content";
import { fadeReveal, Headline } from "../primitives";
import type { SlideProps } from "../slides";

type Profile = (typeof customerProfile.profiles)[number];
type Column = keyof typeof customerProfile.columns;

const columns: { id: Column; Icon: typeof Briefcase }[] = [
  { id: "jobs", Icon: Briefcase },
  { id: "pains", Icon: SmileySad },
  { id: "gains", Icon: Smiley },
];

function ColumnHeads() {
  return (
    <div className="grid grid-cols-[420px_1fr_1fr_1fr] gap-x-10 pb-5">
      <span />
      {columns.map(({ id, Icon }) => (
        <p key={id} className="flex items-center gap-3 text-point font-semibold text-ink">
          <Icon size={34} weight="duotone" className="text-accent" aria-hidden />
          {customerProfile.columns[id]}
        </p>
      ))}
    </div>
  );
}

function ProfileRow({ profile, delay, primary }: { profile: Profile; delay: number; primary: boolean }) {
  return (
    <motion.div
      initial="enter"
      animate="present"
      variants={fadeReveal(delay, 24)}
      className={`grid grid-cols-[420px_1fr_1fr_1fr] gap-x-10 rounded-card px-8 py-8 ${primary ? "bg-paper-raised" : ""}`}
    >
      <div>
        <h3 className={`font-semibold ${primary ? "text-title text-accent" : "text-point text-ink"}`}>{profile.who}</h3>
        <p className="mt-3 text-caption text-ink-muted">{profile.role}</p>
      </div>
      {columns.map(({ id }) => (
        <ul key={id} className="space-y-4">
          {profile[id].map((item) => (
            <li key={item} className={primary ? "text-body text-ink" : "text-caption text-ink-muted"}>
              {item}
            </li>
          ))}
        </ul>
      ))}
    </motion.div>
  );
}

export function CustomerProfileSlide({ step }: SlideProps) {
  const [student, organizer] = customerProfile.profiles;
  return (
    <div className="stage-gutter absolute inset-0 flex flex-col">
      <Headline text={customerProfile.headline} />
      <div className="mt-16 -mx-8">
        <div className="px-8">
          <ColumnHeads />
        </div>
        <ProfileRow profile={student} delay={0.2} primary />
        {step >= 1 && <ProfileRow profile={organizer} delay={0} primary={false} />}
      </div>
    </div>
  );
}
