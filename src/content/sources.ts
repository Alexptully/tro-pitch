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
  uscAlumni: {
    cite: "USC Today, Autumn 2025",
    title: "USC Trojan Family Magazine, Autumn 2025: Half a Million Strong",
    url: "https://today.usc.edu/trojan-family-magazine-autumn-2025/",
  },
  eicStudy: {
    cite: "Events Industry Council and Oxford Economics, 2026",
    title: "Events Industry Council: 2026 Global Economic Significance of Business Events, executive summary (May 2026)",
    url: "https://www.mpi.org/media/blog/articles/article/new-study-bolsters-case-for-events-as-drivers-of-economic-success",
  },
  ncesInstitutions: {
    cite: "NCES IPEDS, 2023-24",
    title: "NCES: Total number of higher education institutions decreases 2 percent (2,691 four-year Title IV degree-granting institutions)",
    url: "https://ies.ed.gov/learn/press-release/total-number-higher-education-institutions-decreases-2-percent",
  },
  plaudNotePin: {
    cite: "Plaud store, 2026",
    title: "Plaud NotePin product page",
    url: "https://www.plaud.ai/collections/plaud-notepin",
  },
  poplPricing: {
    cite: "Capterra, Popl pricing",
    title: "Capterra: Popl pricing (Popl Pro $7.99 per month)",
    url: "https://www.capterra.co.uk/software/1030842/popl",
  },
  klikBadges: {
    cite: "Bizzabo, Klik smart badges",
    title: "Bizzabo: Klik smart event badges",
    url: "https://www.bizzabo.com/product/klik-smart-event-badges",
  },
  klikReview: {
    cite: "Skift Meetings, Klik review",
    title: "Skift Meetings: Klik wearables and ecosystem review",
    url: "https://meetings.skift.com/?p=29096",
  },
  linkedinQr: {
    cite: "LinkedIn blog, June 2018",
    title: "LinkedIn: Turn your offline conversations into online connections with LinkedIn QR code",
    url: "https://blog.linkedin.com/2018/june/27/turn-your-offline-conversations-into-online-connections-with-linkedin",
  },
  captagRental: {
    cite: "Skift Meetings, Captag",
    title: "Skift Meetings: Captag smart badges, rental from $22 to $33 per device",
    url: "https://meetings.skift.com/?p=75016",
  },
  calPenal632: {
    cite: "Cal. Penal Code § 632",
    title: "California Penal Code section 632: recording a confidential communication requires the consent of all parties",
    url: "https://law.justia.com/codes/california/code-pen/part-1/title-15/chapter-1-5/section-632",
  },
  hacksc: {
    cite: "trO HackSC deck, 2026 (team estimate)",
    title: "Our HackSC 2026 Figma deck: prototype parts and the $4 to $7 per reusable unit estimate",
    url: "https://www.figma.com/design/MoUjPy1XtogYnkaN2SbguU/Hack-SC?node-id=282-314",
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
