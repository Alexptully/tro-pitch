import { assumptions, eventCostPerAttendee, eventMargin, personalMargin, proMargin, totalSpendOverRunway, useOfFunds, years, type Year } from "./proForma";
import { count, dollars, dollarsShort, percent } from "@/lib/format";
import type { SourceId } from "./sources";

const eventPrice = dollars(assumptions.eventPrice);
const personalPrice = dollars(assumptions.personalPrice);
const proPrice = dollars(assumptions.proPrice);
const [y2027, y2028, y2029] = years;

/** Rounds a count for speech and slides: 166,300 reads as "166,000". */
const roughly = (value: number) => count(Math.round(value / 1000) * 1000);

export const title = {
  tagline: "Never lose a connection again.",
  visionLines: ["One band gets you in the door", "and remembers everyone you meet."],
  notes: [
    "Think about the last conference you went to. You stood in line for a badge, met someone great, and by the next morning you couldn't remember their name. We built trO so that never happens again.",
    "Our vision is one band that gets you into every professional event and remembers everyone you meet there.",
  ],
};

export const problem = {
  story: {
    thought: "“Who was the hardware person I met this morning?”",
    caption: "By the end of a conference day, most of the names are already gone.",
  },
  hired: {
    value: 70,
    headline: "Jobs and deals come through people you know",
    caption: "of people hired in 2016 joined a company where they already had a connection",
    source: "linkedinSurvey" as SourceId,
  },
  fading: {
    headline: "Then we lose track of the people we meet",
    value: 38,
    caption: "of professionals find it hard to stay in touch with their network",
    spend: 785,
    spendCaption: "of direct spending per business-event participant in 2025 ($1.29 trillion across 1.65 billion people)",
    source: "linkedinSurvey" as SourceId,
  },
  lost: {
    headline: "Every lost contact is a lost opportunity",
    outcomes: ["A new client", "A co-founder", "A mentor", "A job offer", "A friend"],
  },
  notes: [
    "Here's the moment we designed for. Someone leaves a conference having met a dozen people, and on the way to the airport they're already asking who the hardware person was.",
    "That matters because opportunities come through people. In a LinkedIn survey of almost sixteen thousand members, 70% of people hired in 2016 joined a company where they already had a connection.",
    "Keeping those connections is hard: 38% of professionals in the same survey struggle to stay in touch. Business events cost about 785 dollars per attendee in 2025, and most of what happens there is forgotten by morning.",
    "Each of those forgotten names could have been a client, a co-founder, a mentor or a job offer.",
  ],
};

export const customerProfile = {
  headline: "Who wears it and who pays",
  profiles: [
    {
      id: "attendee",
      who: "The attendee who wears it",
      role: "Professionals at conferences, trade shows, career fairs and meetups",
      jobs: ["Get in fast and meet the right people", "Remember who they met and what they talked about"],
      pains: ["Lines at check-in, then a badge that only shows a name", "Names and details blur by the end of the day"],
      gains: ["Every conversation saved, with notes", "One follow-up list the morning after"],
    },
    {
      id: "organizer",
      who: "The organizer who pays",
      role: "Conference organizers, associations, corporate event teams and career centers",
      jobs: ["Get people through the door quickly", "Show sponsors and exhibitors that the event paid off"],
      pains: ["Separate vendors for badges, door scanners and lead retrieval", "No record of who met whom once the room clears"],
      gains: ["One band replaces the badge, the scanner and the lead app", "Proof that the event created real connections"],
    },
  ],
  columns: { jobs: "Jobs", pains: "Pains", gains: "Gains" },
  notes: [
    "trO has two customers. The attendee wears it. They want to get in, meet the right people and remember those conversations, and today they get a line at check-in and names that blur by evening.",
    "The organizer pays: conference companies, associations, corporate event teams and career centers. Today they buy badges, door scanning and lead retrieval from separate vendors, and they still have no record of who met whom. trO replaces all of it and gives them that record.",
  ],
};

export const solution = {
  headline: "How trO works",
  steps: [
    {
      id: "checkin",
      number: 1,
      name: "Check in",
      line: "Your band is your ticket, so you tap the gate and walk in",
      detail: "The organizer links each band to a registration. A light on the reader turns gold, and there's no badge to print or QR code to find.",
    },
    {
      id: "tap",
      number: 2,
      name: "Tap",
      line: "Tap bands, and you're saved to each other's contacts",
      detail: "Hold bands together for about a second. Both buzz, and each of you is added to the other's follow-up list.",
    },
    {
      id: "notes",
      number: 3,
      name: "Notes",
      line: "If both of you say yes, trO takes the notes",
      detail: "A blinking light shows that trO is taking notes. If either person said no, the tap only swaps contact info.",
    },
    {
      id: "reflect",
      number: 4,
      name: "Reflect",
      line: "Press the button and say a note about anyone",
      detail: "trO files the voice note under the right person and sends it to you after the event.",
    },
  ],
  gate: { label: "Checked in", event: "DevSummit 2027" },
  consent: "Yes",
  reflectCard: { name: "Jordan Lee", note: "Voice note: send her our GPU tooling demo on Monday" },
  after: {
    headline: "One email with everyone you met",
    subject: "Your 12 connections from DevSummit 2027",
    preview: "Contact info, bios and your voice notes, sorted by person.",
    button: "Open my connections",
    card: {
      name: "Jordan Lee",
      role: "Director of Engineering",
      bio: "Leads a GPU tooling team and is hiring two firmware engineers this spring.",
      channels: ["LinkedIn", "Email", "Portfolio", "Phone"],
      notesLabel: "Conversation notes",
      notesDetail: "AI summary, 1 voice note, follow-up idea",
      mockupLabel: "Prototype screens, sample data",
    },
  },
  versions: {
    headline: "Two ways to wear trO",
    options: [
      {
        id: "events",
        name: "trO Events",
        summary: "Handed out at the door and returned at the exit",
        price: eventPrice,
        payer: "per attendee, paid by the organizer",
        points: ["Works as the ticket and the badge", "Exhibitors add lead capture for their booth", "Cleaned, charged and reused for about 40 events"],
      },
      {
        id: "personal",
        name: "trO Personal",
        summary: "Yours to keep and wear every day",
        price: personalPrice,
        payer: `plus ${proPrice} a month for trO Pro`,
        points: ["Your ticket at any event that runs on trO", "Swaps contacts at coffee chats and client meetings", "Pro adds unlimited AI notes and search"],
      },
    ],
  },
  hardware: {
    label: "Under the hood",
    parts: [
      { id: "esp32", name: "ESP32-C3", detail: "Talks to other bands and your phone" },
      { id: "nfc", name: "NFC and LEDs", detail: "Opens the gate and swaps contacts" },
      { id: "mic", name: "Mic and button", detail: "Press to talk" },
    ],
    cost: dollars(assumptions.eventBandCost),
    costCaption: "landed cost per event band at 10,000 units (team estimate)",
  },
  notes: [
    "It starts at the door. Your band is your ticket, so you tap the gate and walk in, with no badge to print and no line at a scanner.",
    "When you meet someone, you tap bands. Both buzz, and you're in each other's follow-up list. Nobody pulls out a phone or spells their name.",
    "If both people agree, trO takes notes and a light blinks so everyone knows. If either says no, the tap only swaps contact info. California requires everyone's consent to record a private conversation, so we built consent into the hardware.",
    "If a thought comes to you after the conversation, press the button and say it out loud. trO files it under the right person.",
    "After the event you get one email: everyone you met, their contact info, the notes and your voice notes, sorted by person.",
    `There are two ways to wear it. trO Events bands come back at the exit, and the organizer pays ${eventPrice} per attendee. trO Personal is a ${personalPrice} band you keep: it's your ticket at any trO event and your contact swap at every coffee chat, and trO Pro adds unlimited notes for ${proPrice} a month.`,
    `Our HackSC prototype runs on an ESP32 with NFC, LEDs and a mic. At ten thousand units we estimate each event band costs ${dollars(assumptions.eventBandCost)}.`,
  ],
};

export const vvp = {
  headline: "Never lose a connection again",
  description:
    "trO is a wristband for professional events. It gets you in the door, swaps contacts with one tap, takes notes when both people agree, and sends one email with everyone you met.",
  callouts: [
    { id: "tap", title: "One tap", detail: "Checks you in and saves both people's contacts" },
    { id: "light", title: "A visible light", detail: "Means both people agreed to notes" },
    { id: "button", title: "One button", detail: "Leaves you a voice note about anyone" },
  ] as const,
  sidebar: {
    title: "The morning after, you have",
    items: ["Contact info each person chose to share", "Notes from conversations you both agreed to", "Your own voice notes, filed by person", "One email with all of it"],
  },
  note: "Nothing is recorded unless both people say yes.",
  notes: [
    "This is trO on one page. One tap checks you in and saves both people's contacts. A light tells everyone notes are on, and that only happens when both people agreed. One button leaves you a voice note. The next morning you have everyone you met in one email.",
  ],
};

export const uvp = {
  template: [
    { kind: "frame", text: "For" },
    { kind: "fill", text: "professionals at conferences, trade shows and career fairs" },
    { kind: "frame", text: "who" },
    { kind: "fill", text: "lose track of the people they meet," },
    { kind: "frame", text: "trO is a" },
    { kind: "fill", text: "wristband that doubles as the event ticket" },
    { kind: "frame", text: "that" },
    { kind: "benefit", text: "saves every contact with one tap and remembers what you talked about." },
    { kind: "frame", text: "Unlike" },
    { kind: "fill", text: "printed badges, QR codes and note-taking pins," },
    { kind: "frame", text: "trO" },
    { kind: "difference", text: "takes notes only when both people agree and sends one follow-up list after the event." },
  ] as const,
  label: "Geoffrey Moore's value proposition template",
  notes: [
    "In one sentence: for professionals at conferences, trade shows and career fairs who lose track of the people they meet, trO is a wristband that doubles as the event ticket and saves every contact with one tap. Unlike printed badges, QR codes and note-taking pins, trO takes notes only when both people agree and sends one follow-up list after the event.",
  ],
};

export type CanvasPlayer = { id: string; name: string; ours?: boolean; scores: number[] };

export const strategy = {
  headline: "trO competes on memory and consent",
  factors: [
    { label: "Cost to the attendee", action: "Reduce" },
    { label: "Phone out mid-conversation", action: "Eliminate" },
    { label: "Speed at the door", action: "Raise" },
    { label: "Speed of the swap", action: "Raise" },
    { label: "Everyone at the event has one", action: "Raise" },
    { label: "Remembers what was said", action: "Create" },
    { label: "Consent built in", action: "Create" },
    { label: "Follow-up done for you", action: "Create" },
  ],
  players: [
    { id: "qr", name: "LinkedIn QR code", scores: [0, 10, 0, 4, 5, 0, 0, 2] },
    { id: "nfc", name: "NFC cards (Popl)", scores: [5, 4, 0, 8, 2, 1, 0, 4] },
    { id: "ticket", name: "Ticketing apps (Eventbrite)", scores: [4, 0, 6, 0, 8, 0, 0, 0] },
    { id: "badge", name: "Smart badges (Klik)", scores: [0, 0, 7, 9, 9, 1, 0, 6] },
    { id: "pin", name: "AI note pins (Plaud)", scores: [9, 0, 0, 0, 0, 9, 1, 4] },
    { id: "tro", name: "trO", ours: true, scores: [0, 0, 9, 9, 9, 8, 10, 9] },
  ] satisfies CanvasPlayer[],
  scaleLabel: "Offering level, team estimate (0 to 10)",
  legendHint: "Click a name to hide or show its line",
  notes: [
    "This is our Blue Ocean strategy canvas. Today's tools each do one job: a ticket app gets you in, and a QR code gets a name across.",
    "trO eliminates the phone mid-conversation, takes the cost off the attendee, and creates what nobody offers together: memory of what was said, built-in consent and follow-up done for you. The scores are our team's estimates.",
  ],
};

export type Mark = "full" | "half" | "none";

export const competition = {
  headline: "Only trO asks both people before it takes notes",
  columns: [
    { id: "qr", name: "LinkedIn QR", price: "Free" },
    { id: "nfc", name: "Popl", price: "$7.99 a month" },
    { id: "ticket", name: "Eventbrite", price: "$1.79 + 3.7% per paid ticket" },
    { id: "badge", name: "Klik by Bizzabo", price: "Sold to organizers" },
    { id: "pin", name: "Plaud NotePin", price: "$159 plus plans" },
    { id: "tro", name: "trO", price: `${eventPrice} per attendee, or ${personalPrice} to own`, ours: true },
  ],
  rows: [
    { label: "Both people opt in before notes are taken", marks: ["none", "none", "none", "none", "none", "full"] },
    { label: "Works as the ticket at the door", marks: ["none", "none", "full", "half", "none", "full"] },
    { label: "Saves notes on what was said", marks: ["none", "half", "none", "half", "full", "full"] },
    { label: "Swap contacts without a phone", marks: ["none", "half", "none", "full", "none", "full"] },
    { label: "Everyone at the event has one", marks: ["half", "none", "full", "full", "none", "full"] },
    { label: "One follow-up list after the event", marks: ["half", "half", "none", "full", "half", "full"] },
  ] satisfies { label: string; marks: Mark[] }[],
  priceLabel: "Price",
  legend: { full: "Yes", half: "Partly", none: "No" },
  assessment: "Marks are our team's assessment of each product's public pages.",
  notes: [
    "QR codes and Popl swap a name, and you type your own notes. Eventbrite gets everyone through the door and stops there. Bizzabo's Klik smart badges are our closest competitor. Plaud's NotePin records conversations, but only the wearer decides.",
    "The top row is the one that matters to us: trO is the only option where both people opt in before any notes are taken, and it's also the ticket.",
  ],
};

const tam = 1_645_000_000 * assumptions.eventPrice;
const sam = 336_000_000 * assumptions.eventPrice;
const som = y2029.eventsRevenue;

export const market = {
  headline: "Every business event needs a way in",
  priceNote: `${eventPrice} per attendee, per event`,
  rings: [
    { id: "tam", label: "TAM", value: tam, line: "1.65 billion business-event participants worldwide, 2025", source: "eicStudy" as SourceId },
    { id: "sam", label: "SAM", value: sam, line: "336 million business-event participants in North America, 2025", source: "eicStudy" as SourceId },
    {
      id: "som",
      label: "SOM",
      value: som,
      line: `${roughly(y2029.attendeeEvents)} attendee-events and their exhibitors in our 2029 plan, ${(som / sam * 100).toFixed(2)}% of SAM`,
      source: "proForma" as SourceId,
    },
  ],
  footnote: `Every ring is priced at ${eventPrice} per attendee, per event, and counts trO Events only. Rings are not drawn to scale.`,
  notes: [
    `At ${eventPrice} per attendee, our total addressable market is every business event in the world: 1.65 billion participants in 2025, about ${dollarsShort(tam)} a year.`,
    `Our serviceable market is North America, where we can ship and support a band fleet: 336 million participants, about ${dollarsShort(sam)}.`,
    `Our obtainable market is what our plan reaches in 2029: about ${roughly(y2029.attendeeEvents)} attendee-events plus exhibitor lead capture, ${dollarsShort(som)}. That's under a fifth of one percent of North America. trO Personal sales come on top of these rings.`,
  ],
};

export const businessModel = {
  headline: "Organizers pay per attendee, and professionals buy their own",
  events: {
    name: "trO Events",
    price: eventPrice,
    priceCaption: "per attendee, per event, paid by the organizer",
    cost: dollars(eventCostPerAttendee, 2),
    costCaption: "our cost: band wear, shipping and cleaning, AI notes and an onsite tech",
    margin: percent(eventMargin),
    marginCaption: "gross margin",
    costShare: eventCostPerAttendee / assumptions.eventPrice,
    booth: { value: dollars(assumptions.boothPrice), caption: "per exhibitor booth, per event, for lead capture" },
  },
  personal: {
    name: "trO Personal",
    items: [
      { value: personalPrice, caption: `per band, at ${percent(personalMargin)} gross margin` },
      { value: `${proPrice} a month`, caption: `for trO Pro, at ${percent(proMargin)} gross margin` },
      { value: percent(assumptions.proAttach), caption: "of band buyers who subscribe (Plaud reports nearly 50%)" },
    ],
    source: "plaudAttach" as SourceId,
  },
  chart: {
    revenueLabel: "Revenue",
    expensesLabel: "Costs",
    profitableLabel: "Revenue covers every cost",
    caption: "Monthly, 2027 to 2029. Conferences slow down in summer and December.",
    cashLine: (lowest: number) => `With the ${dollarsShort(assumptions.raise)} seed, cash never drops below ${dollarsShort(lowest)}.`,
  },
  yearLabel: (year: Year) => `${dollarsShort(year.revenue)} revenue`,
  notes: [
    `trO earns money two ways. Organizers pay ${eventPrice} per attendee, per event, less than renting a smart badge, and it replaces the printed badge and the door scan. Each use costs us about ${dollars(eventCostPerAttendee, 2)}, a ${percent(eventMargin)} gross margin. Exhibitors add lead capture for ${dollars(assumptions.boothPrice)} a booth. Professionals buy trO Personal for ${personalPrice}, and we plan on ${percent(assumptions.proAttach)} paying ${proPrice} a month for Pro, since Plaud reports nearly half its buyers pay for a plan.`,
    `Revenue grows from ${dollarsShort(y2027.revenue)} in 2027 to ${dollarsShort(y2028.revenue)} in 2028 and ${dollarsShort(y2029.revenue)} in 2029, with gross margin near ${percent(y2029.grossMargin)}. EBITDA turns positive in 2029 at ${dollarsShort(y2029.ebitda)}. The thin line is our costs, and you can see the summer dip when conferences go quiet.`,
  ],
};

export const funds = {
  headline: `We're raising a ${dollarsShort(useOfFunds.raise)} seed for the next 24 months`,
  askCaption: `It covers ${dollarsShort(totalSpendOverRunway)} of spending alongside ${dollarsShort(useOfFunds.revenueOverRunway)} of revenue earned on the way.`,
  milestonesLabel: "In 2028",
  milestones: [
    { value: dollarsShort(y2028.revenue), caption: "revenue" },
    { value: roughly(y2028.attendeeEvents), caption: "attendee-events" },
    { value: count(Math.round((y2027.personalUnits + y2028.personalUnits) / 100) * 100), caption: "Personal bands sold to date" },
    { value: count(Math.round(y2028.subscribersAtEnd / 100) * 100), caption: "trO Pro subscribers" },
  ],
  reserveLine: (cash: number) => `We reach December 2028 with ${dollarsShort(cash)} in the bank, and the plan turns EBITDA-positive in 2029.`,
  notes: [
    `We're raising a ${dollarsShort(useOfFunds.raise)} seed round to cover 24 months. Just under half goes to the team, growing to about sixteen people, and the rest pays for the band fleet, sales, tooling, certification and a privacy review.`,
    `In 2028 that gets us to ${dollarsShort(y2028.revenue)} in revenue, about ${roughly(y2028.attendeeEvents)} attendee-events and ${count(Math.round(y2028.subscribersAtEnd / 100) * 100)} Pro subscribers. We reach December 2028 with about ${dollarsShort(useOfFunds.cashAtMilestone)} in the bank, and the plan turns profitable at the EBITDA line in 2029.`,
  ],
};

export const closing = {
  signoff: "Thank you.",
  notes: [
    "We're building one band that gets you in the door and remembers everyone you meet, so the people you meet at events turn into clients, co-founders and careers. Thank you. We're happy to take questions.",
  ],
};

export const canvas = {
  headline: "Business Model Canvas",
  blocks: {
    partners: { title: "Key partners", items: ["Registration platforms we sync with", "A contract band manufacturer", "Speech-to-text and AI model providers", "Venues and production companies"] },
    activities: { title: "Key activities", items: ["Firmware and app development", "Shipping, cleaning and charging the band fleet", "Event sales and onsite support"] },
    resources: { title: "Key resources", items: ["Band hardware design", "Consent-first recording system", "The event band fleet"] },
    value: {
      title: "Value propositions",
      items: ["Attendees: in the door with a tap, every contact saved, notes when both agree", "Organizers: one band replaces the badge, the scanner and the lead app"],
    },
    relationships: { title: "Customer relationships", items: ["Pilot event first, then an annual contract", "Event-day support", "Self-serve app for Personal owners"] },
    channels: { title: "Channels", items: ["Direct sales to conference organizers", "Exhibitors who see trO at shows", "Online store for trO Personal"] },
    segments: { title: "Customer segments", items: ["Payers: conference organizers, associations, corporate event teams, career centers", "Wearers: attendees, exhibitors and Personal owners"] },
    costs: { title: "Cost structure", items: ["Team pay", "Band fleet and event operations", "Cloud and AI notes", "Certification, privacy and legal"] },
    revenue: {
      title: "Revenue streams",
      items: [`${eventPrice} per attendee, per event`, `${dollars(assumptions.boothPrice)} per booth for lead capture`, `${personalPrice} per Personal band`, `${proPrice} a month for trO Pro`],
    },
  },
  notes: ["Our Business Model Canvas, for the appendix and for questions."],
};

export const proFormaDetail = {
  headline: "Pro forma, by year",
  rows: [
    { label: "Attendee-events", value: (year: Year) => count(year.attendeeEvents) },
    { label: "Personal bands sold", value: (year: Year) => count(year.personalUnits) },
    { label: "Revenue", value: (year: Year) => dollarsShort(year.revenue), key: true },
    { label: "Gross margin", value: (year: Year) => percent(year.grossMargin) },
    { label: "EBITDA", value: (year: Year) => (year.ebitda < 0 ? `(${dollarsShort(-year.ebitda)})` : dollarsShort(year.ebitda)) },
    { label: "Cash at year end", value: (year: Year) => dollarsShort(year.cashAtEnd) },
  ],
  assumptions: [
    `${eventPrice} per attendee, per event, at ${percent(eventMargin)} gross margin`,
    `${dollars(assumptions.boothPrice)} per exhibitor booth for lead capture`,
    `${dollars(assumptions.eventBandCost)} per event band, reused for ${assumptions.eventBandUses} events`,
    `${personalPrice} Personal band, ${proPrice} a month Pro, ${percent(assumptions.proAttach)} attach`,
    `${dollarsShort(useOfFunds.raise)} seed raised in January 2027`,
  ],
  assumptionsLabel: "Key assumptions (team estimates)",
  linkLabel: "Open the full pro forma spreadsheet",
  notes: ["The full monthly model is in our spreadsheet. Every assumption is written out under the cash rows, with the comparable it came from."],
};

export const appendix = {
  headline: "Sources",
  notes: ["Every number in the deck traces to one of these sources or to our pro forma."],
};
