"use client";

import { Check, LinkedinLogo, EnvelopeSimple, Globe, Phone, Microphone, FileText } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { solution } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { BandGlyph } from "../BandGlyph";
import { BandRender } from "../BandRender";
import { Caption, fadeReveal, Headline, StepView, strokeDraw } from "../primitives";
import { TapPulse } from "../TapPulse";
import { VoiceWave } from "../VoiceWave";
import type { SlideProps } from "../slides";

const SCENE = { width: 900, height: 620 };

function SceneFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg aria-hidden viewBox={`${-SCENE.width / 2} ${-SCENE.height / 2} ${SCENE.width} ${SCENE.height}`} width={SCENE.width} height={SCENE.height} className="overflow-visible">
      {children}
    </svg>
  );
}

function SlidingBand({ from, to, flip, recording = false }: { from: number; to: number; flip?: boolean; recording?: boolean }) {
  return (
    <motion.g initial={{ x: from, opacity: 0 }} animate={{ x: to, opacity: 1, transition: { duration: 1.1, ease: easeDrawn, delay: 0.2 } }}>
      <BandGlyph flip={flip} recording={recording} />
    </motion.g>
  );
}

function TapScene() {
  return (
    <div className="relative">
      <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.1 } }}>
        <TapPulse size={560} ripples={3} nodeRadius={9} delay={1.1} />
      </motion.div>
      <SceneFrame>
        <SlidingBand from={-560} to={-152} />
        <SlidingBand from={560} to={152} flip />
      </SceneFrame>
    </div>
  );
}

function ConsentChip({ left }: { left: number }) {
  return (
    <motion.p
      variants={fadeReveal(0.6, 12)}
      className="absolute top-[150px] flex items-center gap-2 rounded-chip bg-accent px-5 py-2 text-caption font-semibold text-paper"
      style={{ left }}
    >
      <Check size={24} weight="bold" aria-hidden />
      {solution.consent}
    </motion.p>
  );
}

function InsightsScene() {
  return (
    <div className="relative">
      <ConsentChip left={190} />
      <ConsentChip left={600} />
      <div className="absolute top-[340px] left-[200px]">
        <VoiceWave width={500} height={120} delay={0.9} />
      </div>
      <SceneFrame>
        <g transform="translate(-152 0)">
          <BandGlyph recording />
        </g>
        <g transform="translate(152 0)">
          <BandGlyph flip recording />
        </g>
      </SceneFrame>
    </div>
  );
}

function ReflectScene() {
  return (
    <div className="relative">
      <div className="absolute top-[250px] left-[280px]">
        <VoiceWave width={260} height={110} delay={0.4} />
      </div>
      <motion.div variants={fadeReveal(1, 16)} className="absolute top-[200px] left-[560px] w-[330px] rounded-card bg-paper-raised p-6 shadow-lift">
        <p className="text-body font-semibold text-ink">{solution.reflectCard.name}</p>
        <p className="mt-2 flex gap-2 text-caption text-ink-muted">
          <Microphone size={26} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
          {solution.reflectCard.note}
        </p>
      </motion.div>
      <SceneFrame>
        <g transform="translate(-250 0)">
          <BandGlyph buttonActive />
        </g>
      </SceneFrame>
    </div>
  );
}

const scenes = [TapScene, InsightsScene, ReflectScene];

function StepList({ active }: { active: number }) {
  return (
    <ol className="flex w-[700px] flex-col gap-10">
      {solution.steps.map((item, index) => {
        const isActive = index === active;
        return (
          <li key={item.id} className={`transition-colors duration-500 ${isActive ? "text-ink" : "text-ink-faint"}`}>
            <p className="flex items-baseline gap-5 text-title font-semibold">
              <span className={isActive ? "text-accent" : ""}>{item.number}</span>
              {item.name}
            </p>
            <p className="mt-3 pl-[58px] text-point">{item.line}</p>
            {isActive && (
              <motion.p initial="enter" animate="present" variants={fadeReveal(0.2)} className="mt-3 pl-[58px] text-caption text-ink-muted">
                {item.detail}
              </motion.p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function HowItWorks({ step }: { step: number }) {
  const Scene = scenes[step];
  return (
    <StepView className="flex flex-col">
      <Headline text={solution.headline} />
      <div className="mt-14 flex items-start justify-between">
        <StepList active={step} />
        <div className="-mt-6 mr-[-20px]">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial="enter" animate="present" exit={{ opacity: 0, transition: { duration: 0.25 } }}>
              <Scene />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </StepView>
  );
}

const channelIcons = { LinkedIn: LinkedinLogo, Email: EnvelopeSimple, Portfolio: Globe, Phone: Phone } as const;

function EmailMock() {
  const { after } = solution;
  return (
    <motion.div variants={fadeReveal(0.3, 24)} className="w-[820px] overflow-hidden rounded-card bg-ink text-paper shadow-float">
      <div className="flex gap-2 bg-ink-muted/25 px-6 py-4">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-3.5 rounded-full bg-paper/25" />
        ))}
      </div>
      <div className="px-12 pt-10 pb-14">
        <p className="text-caption font-semibold text-paper/70">trO</p>
        <p className="mt-4 text-title leading-tight font-semibold">{after.subject}</p>
        <p className="mt-4 text-body text-paper/70">{after.preview}</p>
        <p className="mt-8 inline-block rounded-chip bg-band px-8 py-4 text-body font-semibold text-accent">{after.button}</p>
      </div>
    </motion.div>
  );
}

function ConnectionCard() {
  const { card } = solution.after;
  return (
    <motion.div variants={fadeReveal(0.7, 24)} className="w-[600px] rounded-card bg-paper-raised p-10 shadow-float">
      <p className="text-title font-semibold">{card.name}</p>
      <p className="mt-1 text-body text-ink-muted">{card.role}</p>
      <p className="mt-6 text-body text-ink">{card.bio}</p>
      <ul className="mt-7 flex flex-wrap gap-3">
        {card.channels.map((channel) => {
          const Icon = channelIcons[channel as keyof typeof channelIcons];
          return (
            <li key={channel} className="flex items-center gap-2 rounded-chip bg-paper px-5 py-2.5 text-caption text-ink">
              <Icon size={24} aria-hidden />
              {channel}
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex items-center gap-4 rounded-2xl bg-paper px-6 py-5">
        <FileText size={30} className="text-accent" aria-hidden />
        <div>
          <p className="text-caption font-semibold text-ink">{card.notesLabel}</p>
          <p className="text-fineprint text-ink-muted">{card.notesDetail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function AfterTheEvent() {
  return (
    <StepView className="flex flex-col">
      <Headline text={solution.after.headline} />
      <div className="mt-12 flex items-start gap-16">
        <EmailMock />
        <div className="-mt-4 flex flex-col items-start gap-5">
          <ConnectionCard />
          <Caption className="text-fineprint">{solution.after.card.mockupLabel}</Caption>
        </div>
      </div>
    </StepView>
  );
}

/** Label boxes in the right column, with leader lines to points on the render (render at left 300, top 240, 900 wide). */
const calloutLayout = {
  esp32: { label: "top-[250px] left-[1290px]", line: "M 1270 300 L 1130 300 L 985 585" },
  nfc: { label: "top-[470px] left-[1290px]", line: "M 1270 520 L 760 520 L 545 545" },
  mic: { label: "top-[690px] left-[1290px]", line: "M 1270 740 L 720 650" },
} as const;

function UnderTheHood() {
  const { hardware } = solution;
  return (
    <StepView className="p-0">
      <motion.div variants={fadeReveal(0.1)} className="absolute top-[240px] left-[300px] w-[900px]">
        <BandRender className="w-full" />
      </motion.div>
      <svg aria-hidden viewBox="0 0 1920 1080" className="absolute inset-0 h-full w-full">
        {hardware.parts.map((part, index) => (
          <g key={part.id}>
            <motion.path d={calloutLayout[part.id as keyof typeof calloutLayout].line} stroke="var(--color-accent)" strokeWidth={2} fill="none" variants={strokeDraw(0.6 + index * 0.2, 0.8)} />
          </g>
        ))}
      </svg>
      {hardware.parts.map((part, index) => (
        <motion.div key={part.id} variants={fadeReveal(0.8 + index * 0.2, 10)} className={`absolute ${calloutLayout[part.id as keyof typeof calloutLayout].label}`}>
          <p className="text-title font-medium text-ink">{part.name}</p>
          <p className="mt-1 text-caption text-accent">{part.detail}</p>
        </motion.div>
      ))}
      <motion.div variants={fadeReveal(1.4)} className="absolute bottom-[130px] left-[112px] flex items-baseline gap-5">
        <p className="text-title font-semibold text-accent figures-tabular">{hardware.cost}</p>
        <Caption>{hardware.costCaption}</Caption>
      </motion.div>
      <div className="absolute top-[88px] left-[112px]">
        <Headline text={hardware.label} />
      </div>
    </StepView>
  );
}

function SolutionView({ step }: { step: number }) {
  if (step <= 2) return <HowItWorks step={step} />;
  if (step === 3) return <AfterTheEvent />;
  return <UnderTheHood />;
}

export function SolutionSlide({ step }: SlideProps) {
  const group = step <= 2 ? "how" : `step-${step}`;
  return (
    <AnimatePresence mode="wait">
      <SolutionView key={group} step={step} />
    </AnimatePresence>
  );
}
