# Brief: trO final venture pitch

This is the master brief for the deck. It sets what the deck must cover, the numbers and where each one comes from, and what the team still has to fill in. `CLAUDE.md` sets the design and writing rules.

## The assignment

ACAD 183, Product Management for Challenge-Based Innovation (Professor Michael Kanazawa), Fall 2026. Brightspace assignment "Final Venture Pitch", due December 1, 2026 at 5:00 PM. The specification is in the lecture slides (W11S22, "Assignment: Final Venture Idea Pitch"), because the syllabus says the latest slides hold assignment specs.

Goal: an end-to-end pitch for a disruptive business concept, by a team of 2 to 4. Our team has five members (Alex, Cara, Grace, Alana and Shin), so confirm the team size with the professor.

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

trO comes from our HackSC 2026 Figma deck ("Hack SC"). It is a wristband for professional events of every kind (conferences, trade shows, career fairs, association and corporate events), not only USC events. The band is also the event ticket: the organizer links it to a registration and you tap the gate to check in. You tap bands to swap contact info, the band takes notes on the conversation only when both people agree, and you can press a button to leave yourself a voice note. After the event you get one email with everyone you met, their contact info, the notes and your voice notes, sorted by person. The prototype uses a Seeed ESP32, NFC, LEDs, a microphone and a button. Vision line for the pitch: "One band gets you in the door and remembers everyone you meet."

Business model (team decision for this pitch, built to be profitable as a company rather than a hackathon project):

- trO Events: organizers pay $9 per attendee, per event. The band replaces the printed badge and the door scan, and it comes back at the exit to be cleaned, charged and reused. Exhibitors can add lead capture for $295 a booth.
- trO Personal: a $99 band people buy and keep. It is their ticket at any trO event and an everyday contact and notes band. trO Pro adds unlimited AI notes for $8 a month.

## Slide plan and rubric map

| # | Slide | Footer tag |
| --- | --- | --- |
| 1 | Title and vision | Vision |
| 2 | The problem: opportunities come through people, we lose track of them, and each lost contact is a lost opportunity (network zoom) | Vision and strategy |
| 3 | Customer profile: the attendee who wears it, the organizer who pays | Customer profile |
| 4 | Solution: check in, tap, notes, reflect, the email after, the two versions (Events and Personal) and the prototype | Solution description |
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
- 1.645 billion business-event participants and $1.292 trillion in direct spending worldwide in 2025, and 336 million participants in North America. Events Industry Council and Oxford Economics, 2026 Global Economic Significance of Business Events. The $785 per participant on the problem slide is our division of those two totals.
- Comparables: Plaud NotePin $159 (Plaud store); Plaud Pro $99.99 a year (Sacra); nearly 50% of Plaud buyers pay for a plan (AI Weekly, June 2026); Popl Pro $7.99 a month (Capterra); Klik smart badges sold to event organizers by Bizzabo (Bizzabo product page); LinkedIn QR code is free in the LinkedIn app (LinkedIn blog, 2018); Captag rents event wearables for $22 to $33 per device (Skift Meetings); Eventbrite charges 3.7% + $1.79 per paid ticket in the US (Eventbrite help center); printed card badges cost about $1 to $3 each (vFairs); lead retrieval costs $255 to $685 per show for the first licence (Vendelux, 2026).
- California requires the consent of all parties to record a confidential conversation. California Penal Code section 632.

Team estimates, labeled as estimates wherever they appear:

All of these live in `scripts/pro-forma/model.py`, the one source for the spreadsheet and the slides.

- $9 per attendee, per event; $16 landed cost per event band at 10,000 units, reused for 40 events; $2.75 cost per attendee-event (69% gross margin).
- $295 per exhibitor booth; 6 booths per 1,000 attendees.
- trO Personal at $99 with a $40 landed cost; trO Pro at $8 a month, 45% attach, 3% monthly churn.
- Sales plan: about 58,000 attendee-events in 2027, 166,000 in 2028 and 478,000 in 2029; Personal launches September 2027 and sells about 55,000 bands in 2029.
- Team of about 8 in 2027, 16 in 2028 and 24 in 2029.
- $4M seed in January 2027. Revenue is $1.0M, $4.2M and $12.2M; EBITDA turns positive in 2029 at about $1.0M; cash never drops below about $600K.

The hackathon deck's "60 to 75% of people got their job through their network" and "50%+ of professionals don't follow up after events" had no sources, so the deck uses the LinkedIn figures instead.

## Placeholders the team fills in (`src/content/config.ts`)

- Who presents which slides (a first guess is in place: Alex 1 to 2, Cara 3 to 4, Grace 5 to 7, Alana 8 to 9, Shin 10 to 12)
- Links to the Google Sheet copy of the pro forma and the Figma file
