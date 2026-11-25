import type { ComponentType } from "react";
import { appendix, businessModel, canvas, closing, competition, customerProfile, funds, market, problem, proFormaDetail, solution, strategy, title, uvp, vvp } from "@/content/content";
import type { SourceId } from "@/content/sources";
import { BusinessModelSlide } from "./slides/BusinessModelSlide";
import { CanvasSlide } from "./slides/CanvasSlide";
import { ClosingSlide } from "./slides/ClosingSlide";
import { CompetitionSlide } from "./slides/CompetitionSlide";
import { CustomerProfileSlide } from "./slides/CustomerProfileSlide";
import { MarketSlide } from "./slides/MarketSlide";
import { ProblemSlide } from "./slides/ProblemSlide";
import { ProFormaSlide } from "./slides/ProFormaSlide";
import { SolutionSlide } from "./slides/SolutionSlide";
import { SourcesSlide } from "./slides/SourcesSlide";
import { StrategySlide } from "./slides/StrategySlide";
import { TitleSlide } from "./slides/TitleSlide";
import { UseOfFundsSlide } from "./slides/UseOfFundsSlide";
import { UvpSlide } from "./slides/UvpSlide";
import { VvpSlide } from "./slides/VvpSlide";

export type SlideProps = { step: number };

export type SlideDefinition = {
  id: string;
  /** Read by the notes panel and screen readers. */
  name: string;
  /** The rubric item this slide covers, shown in the footer. */
  section?: string;
  /** Presses before the deck moves to the next slide. */
  steps: number;
  /** Steps that get their own PDF page. Defaults to the last step. */
  printSteps?: number[];
  /** Sources for each step. The last entry carries on for later steps. */
  sourcesByStep: SourceId[][];
  notes: string[];
  Content: ComponentType<SlideProps>;
};

export const slides: SlideDefinition[] = [
  { id: "title", name: "trO", section: "Vision", steps: 2, printSteps: [1], sourcesByStep: [[]], notes: title.notes, Content: TitleSlide },
  {
    id: "problem",
    name: "Jobs come through people, and we lose track of them",
    section: "Vision and strategy",
    steps: 4,
    printSteps: [0, 1, 2, 3],
    sourcesByStep: [[], [problem.hired.source], [problem.fading.source, "eicStudy"], []],
    notes: problem.notes,
    Content: ProblemSlide,
  },
  {
    id: "customer-profile",
    name: "Customer profile",
    section: "Customer profile",
    steps: 2,
    sourcesByStep: [[]],
    notes: customerProfile.notes,
    Content: CustomerProfileSlide,
  },
  {
    id: "solution",
    name: "How trO works",
    section: "Solution description",
    steps: 7,
    printSteps: [0, 1, 2, 3, 4, 5, 6],
    sourcesByStep: [[], [], ["calPenal632"], [], [], ["proForma"], ["hacksc", "proForma"]],
    notes: solution.notes,
    Content: SolutionSlide,
  },
  { id: "vvp", name: "Visual value proposition", section: "Visual value proposition", steps: 1, sourcesByStep: [[]], notes: vvp.notes, Content: VvpSlide },
  { id: "uvp", name: "Unique value proposition", section: "Unique value proposition", steps: 1, sourcesByStep: [[]], notes: uvp.notes, Content: UvpSlide },
  {
    id: "strategy",
    name: "Blue Ocean strategy canvas",
    section: "Strategy",
    steps: 2,
    printSteps: [1],
    sourcesByStep: [["kimMauborgne"]],
    notes: strategy.notes,
    Content: StrategySlide,
  },
  {
    id: "competition",
    name: "Competitive analysis",
    section: "Competitive analysis",
    steps: 1,
    sourcesByStep: [["linkedinQr", "poplPricing", "eventbriteFees", "klikBadges", "klikReview", "plaudNotePin"]],
    notes: competition.notes,
    Content: CompetitionSlide,
  },
  {
    id: "market",
    name: "TAM, SAM and SOM",
    section: "TAM, SAM and SOM",
    steps: 3,
    printSteps: [2],
    sourcesByStep: [["eicStudy"], ["eicStudy"], ["eicStudy", "proForma"]],
    notes: market.notes,
    Content: MarketSlide,
  },
  {
    id: "business-model",
    name: "Business model and pro forma",
    section: "Pro forma",
    steps: 2,
    printSteps: [0, 1],
    sourcesByStep: [["proForma", "badgePrinting", "captagRental", "leadRetrieval", "plaudPlans", "plaudAttach"], ["proForma"]],
    notes: businessModel.notes,
    Content: BusinessModelSlide,
  },
  { id: "use-of-funds", name: "Use of funds", section: "Use of funds", steps: 1, sourcesByStep: [["proForma"]], notes: funds.notes, Content: UseOfFundsSlide },
  { id: "closing", name: "Thank you", section: "Vision", steps: 1, sourcesByStep: [[]], notes: closing.notes, Content: ClosingSlide },
  { id: "canvas", name: "Business Model Canvas", section: "Appendix: Business Model Canvas", steps: 1, sourcesByStep: [[]], notes: canvas.notes, Content: CanvasSlide },
  { id: "pro-forma", name: "Pro forma by year", section: "Appendix: pro forma", steps: 1, sourcesByStep: [["proForma"]], notes: proFormaDetail.notes, Content: ProFormaSlide },
  { id: "sources", name: "Sources", section: "Appendix", steps: 1, sourcesByStep: [[]], notes: appendix.notes, Content: SourcesSlide },
];

export function sourcesForStep(slide: SlideDefinition, step: number) {
  return slide.sourcesByStep[Math.min(step, slide.sourcesByStep.length - 1)];
}
