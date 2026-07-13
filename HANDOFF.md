# Handoff: Build Luz's AI-projects portfolio website

Date: 2026-07-13
From: Claude Code session in `~/Documents/Zettelkasten` (About Me folder work → portfolio discussion)

## Goal

A simple, static portfolio website showcasing Luz's AI(-assisted) projects — a card grid she can supply with screenshots. Purpose: support job search (AI-assisted developer / forward-deployed / product roles) and, later, AI-literacy consulting credibility.

## Status

Not started. Scope agreed in conversation; no code, no repo, no design yet. This folder (`~/Documents/Active/AI Projects/Portfolio/`) was created to host it.

## Agreed scope

Per-project card fields (the "A list" — Luz approved "most" of these; confirm with her if any feel like fluff before building them all in):

- A1. One-line problem statement (who it's for, what pain it removes)
- A2. Screenshots + a 15–30s GIF/screen recording where the project moves
- A3. Live link or artifact (demo URL; for Onyx, the signed DMG download)
- A4. Her role + collaborators ("solo" / "co-built with X — I did design/frontend/architecture")
- A5. **"How I built it with AI"** note, 2–4 sentences per project (Claude Code, custom skills, subagent workflows; what AI did vs. what she did) — this is the differentiator field
- A6. Status tag: shipped / active / archived
- A7. One outcome number where one exists (downloads, users, hours saved)
- A8. "What I'd do differently" — one sentence, only where natural
- Plus her original three: screenshots, **time-to-MVP** (the headline field — "MVP in X days with AI assistance"), tech stack list

**Explicitly OUT of scope for now (Luz's call, don't add):** about/bio section, testimonials, CTA/booking links, socials footer ("B list" from the prior discussion). Revisit only if she asks.

## Decisions made

- **Luz picks the projects herself** — do NOT preselect. Ask her for the list + assets before building cards. Candidate inventory she may pick from (paths on this machine): Onyx (markdown editor, Tauri/React, signed macOS builds), Small World assets (check what she's comfortable showing — she exited the collaboration Jun 2026), `~/Documents/Active/AI Projects/Music/dashboard.html` (listening-history dashboard), AI Dashboard, BotCharts/litchart outputs, board-game reference sheets, treasure hunt designs.
- Static and simple was suggested (plain HTML/CSS or Astro; deploy Vercel/Netlify/GitHub Pages) — **suggested, not confirmed**. Confirm stack with her; keep it a half-day build, no CMS.
- Site design matters: she's a former technical artist with strong visual taste — expect her to care about typography/layout and to iterate. Consider the `frontend-design` skill when building.

## Constraints & preferences (from her global CLAUDE.md — auto-loaded, but the load-bearing ones)

- **Never use Fraunces** as a font.
- No sycophancy; enumerate lists with identifiers; label choice options (A/B/C); confidence-appropriate language.
- Always commit completed work; **never push without asking**.
- No time estimates in hours/days — use buckets (trivial/small/medium/large).
- She dictates sometimes — watch for transcription artifacts, ask rather than guess.

## Useful context

- **Who she is:** `~/Documents/Zettelkasten/Personal/About me/` — the canonical profile folder. Most relevant here: `Career - Gaming & Tech Art.md` (11y gamedev, Ubisoft/Far Cry 6, AoC skill assessment), `Work - Current & Aspirations.md` (Onyx, Small World chapter + Andre's appreciation quotes, coaching business, career avenues).
- **Positioning language** if needed later: "technical depth + emotional intelligence + facilitation craft"; "a decade in games and a sabbatical building AI-assisted products hands-on" (from her CV work, July 2026).
- A deep-research run on AI-assisted-developer job openings exists (partial, hit rate limits): best titles were Forward Deployed Engineer / AI Product Manager; n8n and Vercel had live matches (July 2026). The portfolio should speak to that audience.

## What's left

- [ ] Luz supplies project list + screenshots/recordings
- [ ] Confirm stack + hosting (and domain? she has no known personal domain — ask)
- [ ] Confirm which A-fields to drop, if any ("most" ≠ all)
- [ ] Scaffold site + card template
- [ ] Fill cards from her assets; she writes/approves the A5 "how I built it with AI" notes (her voice matters there)
- [ ] Deploy preview → her review → iterate → done

## Blockers / questions for Luz

1. Project list + assets (the hard dependency)
2. Stack/hosting/domain confirmation
3. Which A-fields to cut, if any

## Git state (context repo only)

The Zettelkasten vault (`~/Documents/Zettelkasten`) is on `main`, **12 commits ahead of origin, unpushed** (all the About Me folder work from Jul 8–12) — unrelated to this project but worth knowing; she hasn't asked to push. This Portfolio folder has no git repo yet — init one when scaffolding.

## Notes for next session

Start by asking for the project list — everything else follows from what she picks. Don't build placeholder cards with invented content; she reacts better to real assets in a real structure. Keep the first scaffold minimal and let her design taste drive iteration two.
