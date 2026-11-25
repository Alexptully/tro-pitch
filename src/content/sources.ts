export type Source = {
  cite: string;
  title: string;
  url?: string;
};

export const sources = {
  linkedinSurvey: {
    cite: "LinkedIn survey of 15,905 members, 2017",
    title: "LinkedIn: Eighty percent of professionals consider networking important to career success (June 2017)",
    url: "https://news.linkedin.com/2017/6/eighty-percent-of-professionals-consider-networking-important-to-career-success",
  },
  eicStudy: {
    cite: "Events Industry Council and Oxford Economics, 2026",
    title: "Events Industry Council and Oxford Economics: 2026 Global Economic Significance of Business Events, executive summary (May 2026). 1.645 billion participants and $1.292 trillion direct spending worldwide; 336 million participants in North America",
    url: "https://www.poslovniturizam.com/resources/files/poslovniturizam.com/documents/articles/ESS_2026_Exec_Summary_18_May.pdf",
  },
  plaudNotePin: {
    cite: "Plaud store, 2026",
    title: "Plaud NotePin product page",
    url: "https://www.plaud.ai/collections/plaud-notepin",
  },
  poplPricing: {
    cite: "Capterra (Popl)",
    title: "Capterra: Popl pricing (Popl Pro $7.99 per month)",
    url: "https://www.capterra.co.uk/software/1030842/popl",
  },
  klikBadges: {
    cite: "Bizzabo (Klik)",
    title: "Bizzabo: Klik smart event badges",
    url: "https://www.bizzabo.com/product/klik-smart-event-badges",
  },
  klikReview: {
    cite: "Skift Meetings (Klik)",
    title: "Skift Meetings: Klik wearables and ecosystem review",
    url: "https://meetings.skift.com/?p=29096",
  },
  linkedinQr: {
    cite: "LinkedIn, 2018",
    title: "LinkedIn: Turn your offline conversations into online connections with LinkedIn QR code",
    url: "https://blog.linkedin.com/2018/june/27/turn-your-offline-conversations-into-online-connections-with-linkedin",
  },
  captagRental: {
    cite: "Skift Meetings (Captag)",
    title: "Skift Meetings: Captag smart badges, rental from $22 to $33 per device",
    url: "https://meetings.skift.com/?p=75016",
  },
  calPenal632: {
    cite: "Cal. Penal Code § 632",
    title: "California Penal Code section 632: recording a confidential communication requires the consent of all parties",
    url: "https://law.justia.com/codes/california/code-pen/part-1/title-15/chapter-1-5/section-632",
  },
  hacksc: {
    cite: "trO HackSC prototype, 2026",
    title: "Our HackSC 2026 Figma deck: the working prototype and its parts",
    url: "https://www.figma.com/design/MoUjPy1XtogYnkaN2SbguU/Hack-SC?node-id=282-314",
  },
  eventbriteFees: {
    cite: "Eventbrite, 2026",
    title: "Eventbrite: Ticketing fees per country (United States: 3.7% + $1.79 per paid ticket, plus 2.9% payment processing)",
    url: "https://www.eventbrite.com/help/en-us/articles/755615/",
  },
  leadRetrieval: {
    cite: "Vendelux, 2026",
    title: "Vendelux: How much does lead retrieval cost? ($255 to $685 per show for the first licence on 2026 order forms)",
    url: "https://vendelux.com/?p=950430",
  },
  badgePrinting: {
    cite: "vFairs",
    title: "vFairs: Check-in and badge printing hardware options explained (card badges cost about $1 to $3 each)",
    url: "https://www.vfairs.com/?p=45603",
  },
  plaudPlans: {
    cite: "Sacra (Plaud), 2026",
    title: "Sacra: Plaud revenue and plans (Pro at $99.99 a year, Unlimited at $239.99 a year)",
    url: "https://sacra.com/research/plaud",
  },
  plaudAttach: {
    cite: "AI Weekly, June 2026",
    title: "AI Weekly: Plaud hits $100M ARR on 2M AI notetaker devices (nearly 50% of buyers upgrade to a paid plan)",
    url: "https://aiweekly.co/alerts/plaud-hits-100m-arr-on-2m-ai-notetaker-devices",
  },
  proForma: {
    cite: "trO pro forma (team estimates)",
    title: "trO pro forma financial model, 36 months, built from the ACAD 183 simplified template (trO-pro-forma.xlsx)",
  },
  kimMauborgne: {
    cite: "Kim and Mauborgne, 2005",
    title: "Kim, W.C. and Mauborgne, R. (2005). Blue Ocean Strategy: From Theory to Practice. California Management Review 47(3).",
    url: "https://cmr.berkeley.edu/2005/05/47-3-blue-ocean-strategy-from-theory-to-practice/",
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;
