# Meetings with the canon: the brief for each book's agent (v13.8 onward)

Sun Nov 15, 2026. David, 12:06 AM PST: "It has always been my intention for the squads to closely interact and intersect with canon characters, I just don't ever want us to control one of them." 12:39 AM PST: "add all stars and everything else that feels right."

The project docs `series-canon.md` §(a0) and `series-meetings-plan.md` are the authority; this is the working copy for the agent building one book's meetings.

## The locks (break none)
1. **Outcomes and deaths.** No canon death prevented, caused by the squad, or reversed. Every battle, siege, duel and decision ends as the novel ends it. The squad may stand in it, fight beside it, carry a message, be given an order: the result is canon's.
2. **Who is where, when.** A canon character appears only where and when the novel puts them (or where nothing in the books says otherwise). Check the chapter's place and time against the book's canon sheet (`docs/<book>-canon.md`) before writing.
3. **No early spoilers.** The narrator never states what a later novel reveals. Characters may hint, guess, or believe wrongly.
4. **Never a viewpoint, never played.** No canon character is controlled by the player or narrated from inside. They speak and act on the page as others see them.

Also binding, unchanged: tone (not for kids, nothing lurid, darkest canon headline only; short paragraphs; dry soldier humour; no exclamation marks in narration; the sergeant in second person, never gendered); the keep-open rules in `series-canon.md` §(a) where they guard an outcome, death, timeline or reveal; the Fourth is never called Bridgeburners; Book Five happens years before *Gardens of the Moon* (no Malazans). Canon characters speak as they speak in the novels: keep their voices recognisable, short, and never give them a line that commits them to anything the books don't.

## Sources
Every canon claim you rely on (where the character is, when, what they know, what they look like) carries a source in your notes: the novel's text if you can find it (Google Books snippets), else W (malazan.fandom.com) or R (Reactor's re-read). Two agreeing sources close an item; one is "supported"; mark anything open. Read the book's canon sheet first (`docs/<book>-canon.md`): most placements are already sourced there.

## What to build, per meeting
- **Where:** the chapter and map area where the canon character really is. Add an NPC to that area's `npcs` (`{id, name, kind, x, y, node, show, fresh}`), on a walkable tile not used by another NPC or trigger, or a choice in an existing node that leads to the meeting if a figure on the map would be wrong.
- **The talk:** one to three DLG nodes in the chapter's file, following that file's own helpers (`bNNSay`, `bNNIf`, `b9In` etc.) for squadmate lines, with `sp`, a `scene` that matches place and time (the backdrop rule), `fx` setting one flag (`S.f.bN_cM_<name>`), `again` text, and a "Back" or "Not now" that returns to the map. At least one or two present squadmates react, through the book's Say helper (recruit-aware).
- **What it gives:** a loyalty beat, a line the game already has a hook for, or a small useful thing where it fits (information that eases a later check, a small item with its own art in the book's item-art style, or a trick only if the chapter has none). Keep combat numbers and saves' shape unchanged; no new mechanics.
- **Records:** an `extras` line (the chapter end/Deeds) and, where the chapter has one, a `journal` line for the meeting.
- **Sprite:** use an existing figure for the character if one exists (grep `FIGX` and the base kinds in `src/018_figure_sprites.js`: `wj`, `qb`, `kalam`, `fiddler`, `hedge`, `paran`, `kruppe`, `coll`, `tool`, `lorn` and many per-book ones such as `b3_c3_itkovian`). If none, add a small `FIGX` figure in the book's art file, in the ~32px frame, matching the novel's description.
- **The chapter test:** if it bans the character's name (a `never`/`NEVER`/`BAN`/`HARD` regex), remove that name from the list with a comment `v13.8 (David, Nov 15): meetings`. Keep spoiler and tone terms.

## Choosing
Build every ★ meeting in `series-meetings-plan.md` for the book, then the others listed, then up to two more of your own that "feel right" (David's words): a canon character the squad would plausibly cross, in their right place and time, in a scene that adds something. Skip any listed meeting that fails a lock on closer reading, and say why.

## Checks before handing back (don't push; don't bump the version)
- `python3 build.py`, `node --check` on every changed file.
- The chapter test of every touched chapter and of the chapter after it; `trope`, `said`, `recruit`; `FTR_BOOKS=<book> node tools/onward_test.mjs`; `node tools/lint.mjs` (0 errors).
- Render each new node once and read it as a player would.

## Hand back
A short report: each meeting (chapter, area, flag, who reacts, what it gives, sources for place and time), every Claude's call, anything skipped and why, and the list of changed files.
