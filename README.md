# trO final venture pitch

This is our team's Final Venture Pitch for ACAD 183 (Product Management for Challenge-Based Innovation). It pitches trO, a wristband that saves every contact at a professional event with one tap and takes notes on the conversation only when both people agree.

The presentation is a website that runs in your browser. The live version is at **https://alexptully.github.io/tro-pitch/** and updates by itself a couple of minutes after any change lands on `main`. You don't need any programming experience to run it, present it, save it as a PDF or change its words.

## What's in this folder

| File | What it is |
| --- | --- |
| `trO-pro-forma.xlsx` | Our 36-month pro forma, laid out like the course's Google Sheets template. Upload it to Brightspace, or import it into a copy of the template. |
| `brief.md` | The assignment requirements, the slide plan and where every number comes from |
| `CLAUDE.md` | Design and writing rules for anyone (or any Claude Code session) editing the deck |
| `src/content/` | Every word, number and source on the slides |

## Edit it on GitHub (no setup)

1. Open the file you want to change on GitHub, for example `src/content/content.ts` for slide text and notes, or `src/content/config.ts` for team names.
2. Click the pencil icon (**Edit this file**), make the change, then click **Commit changes**.
3. Choose **Create a new branch for this commit and start a pull request**, then open the pull request and merge it.
4. The **Actions** tab shows the deploy. When it turns green (about two minutes), the live site has your change. If it turns red, `npm run check` failed: usually an em dash or a typo in the code. Open the failed run to see the line.

## Run the slideshow on your computer

1. Install Node.js (the LTS version) from **https://nodejs.org** and restart your computer.
2. Open Terminal (Mac) or Command Prompt (Windows) in this folder.
3. Type `npm install` and press Enter. This takes a minute the first time.
4. Type `npm run dev` and press Enter.
5. Open **http://localhost:3000** in Chrome.

## Present it

| Key | What it does |
| --- | --- |
| → or Space, or click | Next step or slide |
| ← | Back |
| N | Show or hide the speaker notes, with who presents the slide |
| F | Full screen |
| P | Open the print version |
| Home and End | First and last slide |

The address bar shows the slide number (`/#9`), so you can jump straight to the part you are rehearsing. Slides 1 to 12 are the pitch (about 6 minutes). Slides 13 to 15 are the appendix: the Business Model Canvas, the pro forma by year and the sources.

## Save it as a PDF for Brightspace

1. With the deck running, press P (or open **http://localhost:3000/print**).
2. Press Ctrl+P (Windows) or Cmd+P (Mac) in Chrome.
3. Choose **Save as PDF**, set **Margins** to **None**, and turn on **Background graphics**.
4. Save. Each build step that matters gets its own page.

## Change the words and numbers

- Team names, speakers and links: `src/content/config.ts`. Anything in square brackets, like `[TEAMMATE 2]`, still needs a real value.
- Slide text and speaker notes: `src/content/content.ts`
- Sources: `src/content/sources.ts`
- The pro forma: change an assumption in `scripts/pro-forma/model.py` and the matching number in `src/content/proForma.ts`, then run `python3 scripts/pro-forma/build_xlsx.py` to rebuild the spreadsheet.

Before you share a change, run `npm run check`. It runs the type checker, the linter and a scan for em dashes, and it must pass.

## Before we present

- Fill in teammates' names and who presents what in `src/content/config.ts`.
- Paste the share link of our Google Sheets copy of the pro forma into `proFormaLink`.
- Read `brief.md`: it lists every team estimate in the pitch, so everyone can answer questions about them.
