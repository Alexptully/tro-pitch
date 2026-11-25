import { annualRunRate, assumptions, costPerAttendeeEvent, grossMargin, totalSpendOverRunway, useOfFunds, years } from "./proForma";
import { dollars, dollarsShort, percent } from "@/lib/format";
import type { SourceId } from "./sources";

const price = dollars(assumptions.pricePerAttendeeEvent);
const unitRange = `$${assumptions.bandUnitCostRange[0]} to $${assumptions.bandUnitCostRange[1]}`;

export const title = {
  tagline: "So Trojans never miss a connection.",
  vision: "The best networking assistant for the strongest network in the world.",
  visionLines: ["The best networking assistant", "for the strongest network in the world."],
  notes: [
    "Think about the last career fair or alumni mixer you went to. You met someone great, and by the next morning you couldn't remember their name or what you talked about. We built trO so that never happens to a Trojan again.",
    "Our vision is the best networking assistant for the strongest network in the world. We start at USC and grow to every campus that runs professional events.",
  ],
};

export const problem = {
  story: {
    thought: "“Who was the hardware guy I met today?”",
    caption: "By the end of a mixer, most of the names are already gone.",
  },
  hired: {
    value: 70,
    headline: "Jobs come through people you know",
    caption: "of people hired in 2016 joined a company where they already had a connection",
    source: "linkedinSurvey" as SourceId,
  },
  fading: {
    headline: "Then we lose track of the people we meet",
    value: 38,
    caption: "of professionals find it hard to stay in touch with their network",
    alumni: 500_000,
    alumniCaption: "living USC alumni",
    source: "linkedinSurvey" as SourceId,
  },
  notes: [
    "Here's the moment we designed for. A student leaves a mixer having met a dozen people, and on the way home she's already asking herself who the hardware guy was.",
    "That matters because jobs come through people. In a LinkedIn survey of almost sixteen thousand members, 70% of people hired in 2016 joined a company where they already had a connection.",
    "And keeping those connections is hard: 38% of professionals in the same survey say they struggle to stay in touch. USC has half a million living alumni, the strongest network a student could ask for, and most of what happens at our events is forgotten by morning.",
  ],
};

export const customerProfile = {
  headline: "Who wears it and who pays",
  profiles: [
    {
      id: "student",
      who: "The student who wears it",
      role: "USC students and young alumni at career fairs, mixers and club nights",
      jobs: ["Meet people who can open doors", "Remember who they met and what they talked about"],
      pains: ["Names and details blur by the end of the night", "Following up means piecing together cards, QR scans and memory"],
      gains: ["Every conversation saved, with notes", "One follow-up list the morning after"],
    },
    {
      id: "organizer",
      who: "The organizer who pays",
      role: "Career centers, alumni associations and student organizations",
      jobs: ["Run events that turn into jobs and mentors"],
      pains: ["No record of who met whom once the room clears"],
      gains: ["Proof that the event created real connections"],
    },
  ],
  columns: { jobs: "Jobs", pains: "Pains", gains: "Gains" },
  notes: [
    "trO has two customers. The student wears it. Their job is to meet people who can open doors and to remember those conversations. Their pain is that names blur and follow-up means stitching together business cards, QR scans and memory.",
    "The organizer pays: the career center, the alumni association, the student org. They run events so students land jobs and mentors, but once the room clears they have no record of who met whom. trO gives them that proof.",
  ],
};

export const solution = {
  headline: "How trO works",
  steps: [
    {
      id: "tap",
      number: 1,
      name: "Tap",
      line: "Tap bracelets, and you're saved to each other's contacts",
      detail: "Hold bands together for about a second. Both buzz, and each of you is added to the other's follow-up list.",
    },
    {
      id: "insights",
      number: 2,
      name: "Insights",
      line: "If both of you say yes, trO takes the notes",
      detail: "A blinking light shows that trO is taking notes. If either person said no, the tap only swaps contact info.",
    },
    {
      id: "reflect",
      number: 3,
      name: "Reflect",
      line: "Press the button and say a note about anyone",
      detail: "trO files the voice note under the right person and sends it to you after the event.",
    },
  ],
  consent: "Yes",
  reflectCard: { name: "Jordan Lee", note: "Voice note: ask about summer internships on the GPU tooling team" },
  after: {
    label: "After the event",
    headline: "One email with everyone you met",
    subject: "Your 12 Trojan connections from Viterbi Homecoming",
    preview: "Contact info, bios and your voice notes, sorted by person.",
    button: "Open my connections",
    card: {
      name: "Jordan Lee",
      role: "Director of Engineering",
      bio: "Leads a GPU tooling team. Viterbi alum who mentors through the Trojan Network.",
      channels: ["LinkedIn", "Email", "Portfolio", "Phone"],
      notesLabel: "Conversation notes",
      notesDetail: "AI summary, 1 voice note, follow-up idea",
      mockupLabel: "Prototype screens, sample data",
    },
  },
  hardware: {
    label: "Under the hood",
    parts: [
      { id: "esp32", name: "Seeed ESP32", detail: "Talks to other bands and your phone" },
      { id: "nfc", name: "NFC and LEDs", detail: "Tap to connect, and a light while notes are on" },
      { id: "mic", name: "Mic and button", detail: "Press to talk" },
    ],
    cost: unitRange,
    costCaption: "per reusable band, our HackSC estimate",
  },
  notes: [
    "When you meet someone, you tap bracelets. Both bands buzz, and you're in each other's follow-up list. Nobody pulls out a phone or spells their name.",
    "If both people agree, trO takes notes on the conversation and a light blinks so everyone knows. If either person says no, the tap only swaps contact info. California law requires everyone's consent to record a private conversation, so we built consent into the hardware.",
    "If a thought comes to you after the conversation, press the button and say it out loud. trO files it under the right person.",
    "After the event you get one email: everyone you met, their contact info, the notes and your voice notes, sorted by person.",
    "Our working prototype from HackSC uses a Seeed ESP32, NFC, LEDs and a microphone. We estimate each reusable band costs four to seven dollars to make.",
  ],
};

export const vvp = {
  headline: "Never lose a connection again",
  description:
    "trO is a wristband for professional events. Tap bands to swap contacts, let it take notes when you both agree, and wake up to one email with everyone you met.",
  callouts: [
    { id: "tap", title: "One tap", detail: "Saves both people's contacts" },
    { id: "light", title: "A visible light", detail: "Means both people agreed to notes" },
    { id: "button", title: "One button", detail: "Leaves you a voice note about anyone" },
  ] as const,
  sidebar: {
    title: "The morning after, you have",
    items: [
      "Contact info each person chose to share",
      "Notes from conversations you both agreed to",
      "Your own voice notes, filed by person",
      "One email with all of it",
    ],
  },
  note: "Nothing is recorded unless both people say yes.",
  notes: [
    "This is trO on one page. One tap saves both people's contacts. A light tells everyone notes are on, and that only happens when both people agreed. One button leaves you a voice note. The next morning you have everyone you met in one email.",
  ],
};

export const uvp = {
  template: [
    { kind: "frame", text: "For" },
    { kind: "fill", text: "USC students and alumni at professional events" },
    { kind: "frame", text: "who" },
    { kind: "fill", text: "lose track of the people they meet," },
    { kind: "frame", text: "trO is a" },
    { kind: "fill", text: "networking wristband" },
    { kind: "frame", text: "that" },
    { kind: "benefit", text: "saves every contact with one tap and remembers what you talked about." },
    { kind: "frame", text: "Unlike" },
    { kind: "fill", text: "business cards, QR codes and smart badges," },
    { kind: "frame", text: "trO" },
    { kind: "difference", text: "takes notes only when both people agree and sends one follow-up list after the event." },
  ] as const,
  label: "Geoffrey Moore's value proposition template",
  notes: [
    "In one sentence: for USC students and alumni at professional events who lose track of the people they meet, trO is a networking wristband that saves every contact with one tap and remembers what you talked about. Unlike business cards, QR codes and smart badges, trO takes notes only when both people agree and sends one follow-up list after the event.",
  ],
};

export type CanvasPlayer = { id: string; name: string; ours?: boolean; scores: number[] };

export const strategy = {
  headline: "trO competes on memory and consent",
  factors: [
    { label: "Cost to the attendee", action: "Reduce" },
    { label: "Setup for the organizer", action: "Reduce" },
    { label: "Phone out mid-conversation", action: "Eliminate" },
    { label: "Speed of the swap", action: "Raise" },
    { label: "Everyone at the event has one", action: "Raise" },
    { label: "Remembers what was said", action: "Create" },
    { label: "Consent built in", action: "Create" },
    { label: "Follow-up done for you", action: "Create" },
  ],
  players: [
    { id: "cards", name: "Paper business cards", scores: [3, 2, 0, 5, 4, 0, 0, 0] },
    { id: "qr", name: "LinkedIn QR code", scores: [0, 0, 10, 4, 5, 0, 0, 2] },
    { id: "nfc", name: "NFC cards (Popl)", scores: [5, 3, 4, 8, 2, 1, 0, 4] },
    { id: "badge", name: "Smart badges (Klik)", scores: [0, 8, 0, 9, 9, 1, 0, 6] },
    { id: "pin", name: "AI note pins (Plaud)", scores: [9, 0, 0, 0, 0, 9, 1, 4] },
    { id: "tro", name: "trO", ours: true, scores: [0, 3, 0, 9, 9, 8, 10, 9] },
  ] satisfies CanvasPlayer[],
  scaleLabel: "Offering level, team estimate (0 to 10)",
  legendHint: "Click a name to hide or show its line",
  notes: [
    "This is our Blue Ocean strategy canvas. Every way people swap contacts today competes on the same thing: getting a name from one person to another. Their curves look alike.",
    "trO eliminates the phone in the middle of the conversation, reduces the cost to students to zero, and creates three things nobody offers together: it remembers what was said, consent is built in, and the follow-up is done for you. These scores are our team's estimates.",
  ],
};

export type Mark = "full" | "half" | "none";

export const competition = {
  headline: "Only trO asks both people before it takes notes",
  columns: [
    { id: "cards", name: "Paper cards", price: "Printing" },
    { id: "qr", name: "LinkedIn QR", price: "Free" },
    { id: "nfc", name: "Popl", price: "$7.99 a month" },
    { id: "badge", name: "Klik by Bizzabo", price: "Sold to organizers" },
    { id: "pin", name: "Plaud NotePin", price: "$159 plus plans" },
    { id: "tro", name: "trO", price: `${price} per attendee`, ours: true },
  ],
  rows: [
    { label: "Both people opt in before notes are taken", marks: ["none", "none", "none", "none", "none", "full"] },
    { label: "Saves notes on what was said", marks: ["none", "none", "half", "half", "full", "full"] },
    { label: "Swap contacts without a phone", marks: ["full", "none", "half", "full", "none", "full"] },
    { label: "Everyone at the event has one", marks: ["half", "half", "none", "full", "none", "full"] },
    { label: "One follow-up list after the event", marks: ["none", "half", "half", "full", "half", "full"] },
  ] satisfies { label: string; marks: Mark[] }[],
  priceLabel: "Price",
  legend: { full: "Yes", half: "Partly", none: "No" },
  assessment: "Marks are our team's assessment of each product's public pages.",
  notes: [
    "Paper cards and LinkedIn QR codes swap a name and nothing else. Popl is faster, but you type your own notes. Bizzabo's Klik badges are our closest competitor: organizers hand out smart badges that swap contacts. Plaud's NotePin records conversations for $159, but only the wearer decides.",
    "The top row is the one that matters to us: trO is the only option where both people opt in before any notes are taken.",
  ],
};

const tam = 1_650_000_000 * assumptions.pricePerAttendeeEvent;
const sam = 2691 * assumptions.attendeeEventsPerCampusYear * assumptions.pricePerAttendeeEvent;
const som = annualRunRate(years[2].campusesAtEnd);

export const market = {
  headline: "From Trojans to every business event",
  priceNote: `${price} per attendee, per event`,
  rings: [
    { id: "tam", label: "TAM", value: tam, line: "1.65 billion business-event participants worldwide, 2025", source: "eicStudy" as SourceId },
    {
      id: "sam",
      label: "SAM",
      value: sam,
      line: `2,691 U.S. four-year colleges, ${assumptions.attendeeEventsPerCampusYear.toLocaleString("en-US")} attendee-events each (team estimate)`,
      source: "ncesInstitutions" as SourceId,
    },
    { id: "som", label: "SOM", value: som, line: `${years[2].campusesAtEnd} paying campuses by the end of 2029 (our plan)`, source: "proForma" as SourceId },
  ],
  notes: [
    `We price per attendee: organizers pay ${price} for every person who wears a band at their event. Our total addressable market is every business event: 1.65 billion participants worldwide in 2025, which is about ${dollarsShort(tam)} a year.`,
    `Our serviceable market is U.S. four-year colleges. There are 2,691 of them. At our estimate of 8,000 attendee-events a campus each year, that's about ${dollarsShort(sam)}.`,
    `Our obtainable market is the ${years[2].campusesAtEnd} campuses in our plan by the end of 2029, about ${dollarsShort(som)} a year. That's under 2% of the serviceable market.`,
  ],
};

export const businessModel = {
  headline: `Organizers pay ${price} per attendee`,
  unit: [
    { id: "price", value: price, caption: "per attendee, per event, paid by the organizer" },
    { id: "cost", value: dollars(costPerAttendeeEvent, 2), caption: "our cost: band wear, AI notes, cleaning and support" },
    { id: "margin", value: percent(grossMargin), caption: "gross margin" },
  ],
  campus: {
    value: dollarsShort(annualRunRate(1)),
    caption: `revenue from one campus in a year, at ${assumptions.attendeeEventsPerCampusYear.toLocaleString("en-US")} attendee-events (team estimate)`,
  },
  chart: {
    revenueLabel: "Revenue",
    expensesLabel: "Costs",
    profitableLabel: "Revenue covers every cost",
    caption: "Monthly, 2027 to 2029. Events stop each summer.",
    cashLine: (lowest: number) => `With the ${dollarsShort(assumptions.raise)} raise, cash never drops below ${dollarsShort(lowest)}.`,
  },
  yearLabel: (year: (typeof years)[number]) => `${dollarsShort(year.revenue)} revenue`,
  notes: [
    `Students never pay. Organizers pay ${price} per attendee, per event. Each use costs us about ${dollars(costPerAttendeeEvent, 2)}, mostly cleaning and charging bands, so the gross margin is ${percent(grossMargin)}.`,
    `Our pro forma grows from a free USC pilot in spring 2027 to ${years[0].campusesAtEnd} paying campuses by the end of 2027, ${years[1].campusesAtEnd} by the end of 2028 and ${years[2].campusesAtEnd} by the end of 2029. Revenue reaches ${dollarsShort(years[2].revenue)} in 2029, and EBITDA is close to breakeven that year. The thin line is our costs, and you can see the summer dip when campuses go quiet.`,
  ],
};

const runRate = annualRunRate(useOfFunds.milestoneCampuses);

export const funds = {
  headline: `We're raising ${dollarsShort(useOfFunds.raise)} to reach ${useOfFunds.milestoneCampuses} campuses`,
  ask: dollarsShort(useOfFunds.raise),
  askCaption: `A pre-seed round that covers ${dollarsShort(totalSpendOverRunway)} of spending over the next 24 months.`,
  milestonesLabel: "By December 2028",
  milestones: [
    { value: `${useOfFunds.milestoneCampuses}`, caption: "paying campuses" },
    { value: dollarsShort(runRate), caption: "annual revenue run rate" },
    { value: `${(Math.floor(useOfFunds.bandsInField / 100) * 100).toLocaleString("en-US")}`, caption: "FCC-certified bands in the field" },
  ],
  reserveLine: (cash: number) => `Revenue over the two years leaves ${dollarsShort(cash)} in the bank for a 2029 seed round.`,
  notes: [
    `We're raising ${dollarsShort(useOfFunds.raise)} in pre-seed funding to cover 24 months. Half goes to the team: three founders, and our first engineer in 2028. The rest pays for firmware and FCC certification, the band fleet for each campus we sign, campus sales, and a legal review of consent law.`,
    `By December 2028 that gets us ${useOfFunds.milestoneCampuses} paying campuses and a ${dollarsShort(runRate)} annual run rate, and the revenue we earn along the way leaves about ${dollarsShort(useOfFunds.cashAtMilestone)} in the bank going into a seed round.`,
  ],
};

export const closing = {
  line: title.vision,
  signoff: "Fight on.",
  notes: [
    "We're making the best networking assistant for the strongest network in the world, so USC students can reach their biggest career goals through the Trojan family. Fight on, and thank you. We're happy to take questions.",
  ],
};

export const canvas = {
  headline: "Business Model Canvas",
  blocks: {
    partners: { title: "Key partners", items: ["USC Career Center and alumni association", "A contract band manufacturer", "Speech-to-text and AI model providers"] },
    activities: { title: "Key activities", items: ["Firmware and app development", "Shipping, cleaning and charging band fleets", "Campus sales"] },
    resources: { title: "Key resources", items: ["Band hardware design", "Consent-first recording system", "Founders inside the Trojan network"] },
    value: {
      title: "Value propositions",
      items: ["Students: every contact saved with one tap, notes when both agree, one follow-up email", "Organizers: proof that events create connections"],
    },
    relationships: { title: "Customer relationships", items: ["Pilot first, then a semester plan", "Event-day support"] },
    channels: { title: "Channels", items: ["Career center and alumni event teams", "Student org leaders", "Demos at mixers"] },
    segments: { title: "Customer segments", items: ["Wearers: students and young alumni", "Payers: career centers, alumni groups, student orgs"] },
    costs: { title: "Cost structure", items: ["Team pay", "Band fleet and event operations", "Cloud and AI notes", "Certification and legal"] },
    revenue: { title: "Revenue streams", items: [`${price} per attendee, per event, paid by the organizer`, "Students never pay"] },
  },
  notes: ["Our Business Model Canvas, for the appendix and for questions."],
};

export const proFormaDetail = {
  headline: "Pro forma, by year",
  rows: ["Paying campuses at year end", "Revenue", "Costs", "EBITDA", "Cash at year end"],
  assumptions: [
    `${price} per attendee, per event`,
    `${assumptions.attendeeEventsPerCampusYear.toLocaleString("en-US")} attendee-events per campus, per year`,
    `$${assumptions.bandUnitCost.toFixed(2)} per band, used for ${assumptions.eventsPerBand} events`,
    `${dollars(costPerAttendeeEvent, 2)} cost per attendee-event`,
    `${dollarsShort(useOfFunds.raise)} raised in January 2027`,
  ],
  assumptionsLabel: "Key assumptions (team estimates)",
  linkLabel: "Open the full pro forma spreadsheet",
  notes: ["The full monthly model is in our spreadsheet. Every assumption is written out under the EBITDA line."],
};

export const appendix = {
  headline: "Sources",
  notes: ["Every number in the deck traces to one of these sources or to our pro forma."],
};
