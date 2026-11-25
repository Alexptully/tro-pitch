# Brief: trO final venture pitch

This is the master brief for the deck. It sets what the deck must cover, the numbers and where each one comes from, and what the team still has to fill in. `CLAUDE.md` sets the design and writing rules.

## The assignment

ACAD 183, Product Management for Challenge-Based Innovation (Professor Michael Kanazawa), Fall 2026. Brightspace assignment "Final Venture Pitch", due December 1, 2026 at 5:00 PM. The specification is in the lecture slides (W11S22, "Assignment: Final Venture Idea Pitch"), because the syllabus says the latest slides hold assignment specs.

Goal: an end-to-end pitch for a disruptive business concept, by a team of 2 to 4.

Required in the deck (10 to 12 slides):

1. Vision and strategy
2. Visual value proposition (VVP)
3. Customer profile
4. Solution description and unique value proposition (UVP)
5. TAM, SAM and SOM
6. Competitive analysis
7. Financial use of funds (one slide)

Also required with the submission:

- A pro forma financial model made from the course's simplified Google Sheets template (`trO-pro-forma.xlsx` follows its layout: months across, Revenue, COGS, SG&A, EBITDA, then the model assumptions in prose).
- A Business Model Canvas (appendix slide).
- Upload a copy of the slides and a copy of the spreadsheet to Brightspace.

Readout rules from W11S22: 5 to 7 minutes to present, then 2 to 3 minutes of questions. All required elements included. Every team member presents a different part.

An earlier version of the assignment (W10S20) asked for a venture at the intersection of an exponential technology and a global challenge (food, health, energy, mobility or housing). The latest version (W11S22) says "a Venture Idea of your team's choosing", so trO qualifies. If the professor still expects one of those challenges, raise it before presenting.

## The venture

trO comes from our HackSC 2026 Figma deck ("Hack SC"). It is a wristband for professional events. You tap bands to swap contact info, the band takes notes on the conversation only when both people agree, and you can press a button to leave yourself a voice note. After the event you get one email with everyone you met, their contact info, the notes and your voice notes, sorted by person. The prototype uses a Seeed ESP32, NFC, LEDs, a microphone and a button. Vision line from the hackathon deck: "The best networking assistant for the strongest network in the world."

Business model (team decision for this pitch): organizers pay, students never do. Career centers, alumni associations and student orgs pay $4 for each attendee who wears a band at their event. trO ships each campus a fleet of reusable bands.

## Slide plan and rubric map

| # | Slide | Footer tag |
| --- | --- | --- |
| 1 | Title and vision | Vision |
| 2 | The problem: jobs come through people, and we lose track of them | Vision and strategy |
| 3 | Customer profile: the student who wears it, the organizer who pays | Customer profile |
| 4 | Solution: tap, insights, reflect, the email after, and the prototype | Solution description |
| 5 | Visual value proposition (one-page, Librande template) | Visual value proposition |
| 6 | Unique value proposition (Geoffrey Moore template) | Unique value proposition |
| 7 | Blue Ocean strategy canvas | Strategy |
| 8 | Competitive analysis chart | Competitive analysis |
| 9 | TAM, SAM and SOM | TAM, SAM and SOM |
| 10 | Business model and pro forma | Pro forma |
| 11 | Use of funds | Use of funds |
| 12 | Close | Vision |
| A1 | Business Model Canvas | Business Model Canvas |
| A2 | Pro forma detail | Pro forma |
| A3 | Sources | |

## Numbers and sources

Every number on a slide has an entry in `src/content/sources.ts` and appears in that slide's footer.

- 70% of people hired in 2016 joined a company where they already had a connection. LinkedIn survey of 15,905 members in 17 countries, Feb to Mar 2017.
- 38% of professionals find it hard to stay in touch with their network. Same LinkedIn survey.
- 500,000 living USC alumni. USC Today, Trojan Family Magazine, Autumn 2025.
- 1.65 billion business-event participants worldwide in 2025. Events Industry Council and Oxford Economics, 2026 Global Economic Significance of Business Events.
- 2,691 four-year Title IV degree-granting institutions in 2023 to 2024. NCES IPEDS press release.
- Comparables: Plaud NotePin $159 (Plaud store); Popl Pro $7.99 a month (Capterra); Klik smart badges sold to event organizers by Bizzabo (Bizzabo product page); LinkedIn QR code is free in the LinkedIn app (LinkedIn blog, 2018); Captag rents event wearables for $22 to $33 per device (Skift Meetings).
- California requires the consent of all parties to record a confidential conversation. California Penal Code section 632.

Team estimates, labeled as estimates wherever they appear:

- $4 to $7 per reusable band (HackSC estimate); the model uses $5.50.
- $4 per attendee, per event; 8,000 attendee-events per campus per year; 25 events per band; $0.80 cost per attendee-event.
- Sales plan: USC pilot spring 2027, 3 paying campuses at end of 2027, 15 at end of 2028, 40 at end of 2029.
- $750K pre-seed and its split.

The hackathon deck's "60 to 75% of people got their job through their network" and "50%+ of professionals don't follow up after events" had no sources, so the deck uses the LinkedIn figures instead.

## Placeholders the team fills in (`src/content/config.ts`)

- Teammates' names and who presents which slides
- Links to the Google Sheet copy of the pro forma and the Figma file
