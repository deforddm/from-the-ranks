# From the Ranks: the series playbook

Tue Nov 17, 2026, 10:09 PM PST. Describes v13.48.0. **LIVE: the operating manual for the whole series.** The project instructions point here. Read §0 at the start of every work session and update it at every ship; read any other section only when the work needs it. Slimmed Nov 17, 2026: the version-by-version record that used to fill this line and §0 is in `series-changelog.md`.

---

## 0. Where we are

- **Live:** From the Ranks **v13.48.0** (Tue Nov 17, 2026, 10:09 PM PST, full lane, b96a7f2) at https://deforddm.github.io/from-the-ranks/ (cache `ftr-v13.48.0`). Full suite 156/157: the one miss was `b4ch5_test`, still looking for words the v13.40.0 voice pass had changed (it failed on v13.47.2 too); corrected, 3/3 alone. All ten books are live; the series is complete and in polish. Ashes of the Pale is frozen at v4.10.0.
- **Stage (David, Nov 17, 2026):** alpha. The move to playfromtheranks.com (Cloudflare Pages, repo private) and the itch.io page wait until the game is polished enough to call beta. Nothing for the move is built until he says so. When it comes: saves are browser storage tied to the github.io address, so a hand-over page must ship at the old address before the repo goes private; Cloudflare Pages caps one file at 25 MiB and `index.html` is 17.5 MB.
- **PC copy:** `C:\Users\stone\FromTheRanks`, up to date with v13.48.0 (Tue Nov 17, 2026, 14 files, sizes checked).
- **Repo branches:** `main` (ships) and `view3d` (the unshipped 3D battlefield test, kept on purpose; `/preview/` on the site is that test). `wip/v8.2.4` and `wip/portraits` are harmless leftovers.
- **Polish plan:** `series-polish-plan.md` §0 to §6 are done. Waiting on David: the dusk and before-dawn map tint; the art contact sheets; two figure swaps to check (Book Seven's mill-woman drawn as Benna, Book Ten's Malazan clerk drawn as Yelt); the parked combat ideas (Q25: active defence, fatigue, quirks); the player counter (waits on the move).
- **Difficulty:** targets are David's of Nov 6 (Soldier about 90%, Bridgeburner 75–80%, no fight under 60%). v13.4.0's toughness reset and v13.5's talents are a first pass by the bot. With the taught bot, Books Six to Ten measure easy (Soldier 96–99%, Bridgeburner 85–92%); David, Nov 14: "leave it for now", he plays first. Books One to Five have not been re-measured with the taught bot. Any table change goes to him first.
- **Rules learned, still binding:**
  - The balance bot must play like David (the Whisper for free swings, every talent), or the tuning is wrong. Tune at 20 runs a step and confirm at 30. Per-fight steps are to-hit first. Leave alone the fights the lever can't move (survive fights, the deathless).
  - A book that carries a squad in never reuses another book's save slot; its name-clash check looks at its own book only.
  - Read `b6Thread()` / `b7Thread()` before entering `b6As` / `b7As`.
  - Extend the shelf tests to a new book before its first full run. Run heavy jobs one at a time on the 2-CPU container. `onward_test` opens three maps a page.
  - Build what ships from a clean checkout when anything else is editing the tree.
  - The game is one script scope: lint now fails on a top-level function declared twice (v13.48.0).
- **Known flaky tests:** see §9.
- **History:** every version before this one is in `series-changelog.md`.

---

## 1. The series at a glance

| Book | Novel | Game title | Squad | Status |
|---|---|---|---|---|
| One | Gardens of the Moon | *Ashes of the Pale* | the Fourth (original) | live; also frozen standalone |
| Two | Deadhouse Gates | *The Chain of Dogs* | the Third of the Hissar garrison (original) | live |
| Three | Memories of Ice | *The Fair Exchange* | the Fourth | live |
| Four | House of Chains | *Unblooded* | the Third squad of the 9th (Book Two's squad on a transfer), with the Fourteenth | live |
| Five | Midnight Tides | *Indebted* | the Sixth Company, Whitefinder Battalion (a new Letherii cast) | live (v8.0.0) |
| Six | The Bonehunters | *Bones in the Walls* | both squads, taking turns: the Third with the Fourteenth, the Fourth with Onearm's Host | live (v9.0.0) |
| Seven | Reaper's Gale | *Unwitnessed* | two squads on opposite sides, taking turns: the Third lent to Keneb's marines, Book Five's Letherii | live (v10.0.0) |
| Eight | Toll the Hounds | *Time Served* | the Fourth, years on, in Darujhistan | live (v11.0.0) |
| Nine | Dust of Dreams | *Dust on the Boots* | the Third and Book Seven's Letherii, taking turns | live (v12.0.0) |
| Ten | The Crippled God | *Witnessed* | the Third and the Letherii, taking turns; Book Eight's Fourth over the ridge in the last chapter; then the series coda | live (v13.0.0) |

Rules that hold across the table (David, Oct 11–13): one book per novel, in order, no skipping. Each book plays on its own. Squads return wherever the novel gives them a place. A transfer offers any finished save of the right road and carries level, gear, picks and tricks (from v7.2.0, recruits too). Level caps rise with each returning book (Books One and Two stop at 8, Book Three at 15). Book abbreviations used in file names: `gotm` (Book One has no infix), `dg`, `moi`, `hoc`, `mt`, `bh`, `rg`, `tth`, `dod`, `tcg`.

---

## 2. Where everything lives

### The repo (`deforddm/from-the-ranks`)

- `index.html` is generated. `python3 build.py` concatenates `src/*.js` in file-name order (`00_head.html`, `01_style.css`, `02_body.html`, then the JS, `99_boot2.js` last). Never edit `index.html` or `src/19c_artwork.js` by hand.
- **`src/` numbering is the series' shelf** (three digits from v8.2.6, Nov 4). `000`–`039` engine and shared art; `040`–`046` Book One's chapters; `047`–`058` Book Two; `060`–`069` Book Three; `070`–`079` Book Four; `080`–`089` Book Five (with `089c`–`089g`, the item specials and item art); **`100`–`119` Book Six, `120`–`139` Book Seven, `140`–`159` Book Eight, `160`–`179` Book Nine, `180`–`199` Book Ten**; `990` resume and boot; `999` the service-worker hookup. A book's block: `N00` the book engine (`newState<Book>`, keys, flags, foes), `N00b` title art, `N00c` the Deck, `N00d` card art, `N01`–`N07` chapters with `N01b`–`N07b` their art, `N08` visions, `N08b` visions art, `N09`–`N19` kit, games and anything else (Book Six: `100`–`108b`). `tools/trope_scan.mjs` reads the same shelf to tell the books apart (`bookOf`).
- Ids: a book's nodes, areas, fights, foes, items, scenes and flags carry its prefix (`b2_`, `b3_`, so `b4_`), chapters add an infix (`b4_c3_…`) so seven chapters written at once never collide. Chapter exports `B4CH1`…`B4CH7`, registered in `src/90_resume_boot.js` with the book key (`'dg'`, `'moi'`, so `'hoc'`). Flags `S.f.b4_*`; the chapter key `S.f.b4_cK_key` (the key sting in `src/16_skill_checks.js` `keyFlag()` must know the new prefix).
- **The roster and gear** (`src/38c_roster.js`, from v7.2.0): one roster for every book. A new book declares its recruits and spares (who can be benched) and which fires open the roster; every new item gets a role in `ITEM_ROLE` and every new squadmate template a row in `TPL_ROLES`; `tools/gear_roles_test.mjs` fails on an item or template without one.
- **Items** (v8.1.0, David, Oct 30: "show stats in the same way… give things more variety and usefulness"): every item shows one stat line, `itemStatLine` in `src/14b_items.js`, on the sheet, the item view, the Pack's kit list and every trader (a shop choice names its item with `ware:'id'`). Prose `line`s carry no numbers. Every weapon has its own `dmg` on the scheme in the repo's `docs/items-pass.md` (knives +2 hit and light dice, heavy weapons d10–d12, reach weapons reach and −1 armour, bows range, crossbows hard-hitting) and must not be a downgrade for everyone who can use it. A special effect has its words in `it.special` or `ITEM_SPECIAL`, and asks `wears(id or unit, item)`: never read `S.gear[...].trinket` (lint fails). A soldier has two trinket places (`trinket`, `trinket2`). No flavour-only trinkets except the spawn shard: each new trinket gives a number or a small lore-fit special. `tools/items_test.mjs` and `items_data_test.mjs` hold this. Item art (v8.1.1): 200×150, the book's tinted vignette, lit from the upper left, real materials, a thin dark outline and a ground shadow, long pieces on the lower-left to upper-right diagonal; a bow is drawn strung (or unstrung when its prose says so) with no arrow through or across it, a crossbow with the bolt in the groove; gradient ids prefixed with the item id. A new book's items go in its own late `*_item_art_*.js` or follow the same rules in its chapter art.
- **Saves and backups** (v8.2.0, David, Oct 30): saves are localStorage, one slot per sergeant (`src/15_state.js`), and nothing in a browser survives the player clearing site data by hand. `src/35b_backup.js` holds the backup file (every sergeant + settings + the version seen, plain JSON named `from-the-ranks-saves-<date>.json`), restore (`parseBackup` also takes a single save code or save object; `restoreBackup` merges by name; Ashes's copy takes Book One only), the reminder (`backupLine` + `bindBackupLine` on the title and the chapter end; `backupDue` after three chapters of progress since `BKEY`'s mark) and `askPersist`. A new screen that shows saves or ends a chapter adds `${backupLine()}` and `bindBackupLine()`. Never change the backup file's shape without reading the old one; `tools/backup_test.mjs` holds it.
- **Sound** (`src/13_audio_engine_all_procedural.js`, all WebAudio, no sample files): each book has a voice (`VOICES`: scale, root, instruments, drums, reverb send); every scene backdrop, map decor and battle style resolves to an ambience through the `PLACE` table, with a prefix default per book. **A new book adds its voice, its places and any new ambience beds there**, and `tools/audio_test.mjs` fails on any name that doesn't resolve. Foes need only a `verb` for their blow's sound. Details: `docs/v6.8-notes.md`.
- **Foes** (`FOES`, each book's engine file): beside the usual numbers a foe may have `attacks` (blows a turn), `sk` (`reach`, `parry`, …), `dr` (a hide that takes that much off every ordinary blow; a critical goes through), and `resist` / `weak` by munition name (`{sharper:.5}`, `{cusser:1.5}`) on blasts. Use them for the things canon says mortal arms can't handle (the K'ell Hunter, v6.10.0), and say the rule in the world (Ambrel does, in the yard).
- **The gods** (`src/31c_stakes.js`): `PATRONS` by squadmate id (each book's engine file adds its own; the sergeant's entry follows the book), and `BOONS` by god name, so **a new book's patrons need a `BOONS` row for any new god and a sigil** (`ART['patrons/<id>']`, drawn in the painted-set frame in `src/19e_patron_sigils.js`, or `sig:'<id>'` pointing at an existing one); `tools/boons_test.mjs` fails on a patron without either. The gods' fates per book are in `series-canon.md` §(f). Details: `docs/v6.9-notes.md`.
- **Otataral and the Elder warrens** (David, Oct 27: Q7): otataral never touches Elder sorcery. The squad's Elder tricks (`elder:true`) work in otataral fights, and an Elder caster among the foes (Raest, `ai:'raest'`) is never a target for the dust. A later Jaghut, Tiste Andii or T'lan Imass foe follows the same rule; `tools/answers_test.mjs` holds Raest.
- `tools/`: `run_all.mjs` (build, `node --check`, lint, every `*_test.mjs`, `--play=N` bot runs; 91 steps at v8.2.0 with three plays, about 50 minutes), `lint.mjs` (every node under randomised states, per book), `play.mjs` (`--book=hoc --from=K`), `balance.mjs` (every fight many times; a scratch `--patch` file for tuning; `--squad=a,b,c` for a chosen squad; it measures a fight's first attempt, so the gods' boons don't move its numbers), `shoot.mjs` (screenshot any state; a Book Three state from `newStateMOI` opens on the level picks, so set `S.picksDue = []` and hide `#modal` first), `page.mjs` (the shared headless page), `audio_test.mjs` (every sound, cue and ambience rendered offline; the place plumbing), `trope_scan.mjs` (the prose budgets, §6), `answers_test.mjs` (David's answers to the open questions, Oct 27). A new rule gets a new `*_test.mjs`; a new book gets `<abbr>_test.mjs` and `b<N>visions_test.mjs`.
- `docs/`: the writers' copies (see the table in §4). `docs/art/`: the artwork canvas boards; `tools/art_build.py` turns them into `src/19c_artwork.js`; Book Two and later items are drawn in `tools/art_<abbr>_items.py` (rules in `docs/item-art.md`).
- `about/index.html`: the install page. What's new lives in `src/35_pack_journal_save.js` (the versioned list of notes) and shows every note since the player's last version.

### The project (`ashes-of-the-pale/…`)

The folder prefix is history (the project began as Ashes); keep it. **Live docs** (read them; keep them current):

| Doc | What it is |
|---|---|
| `project-instructions.md` | the text in the project's instructions box |
| `series-playbook.md` | this manual |
| `open-questions.md` | every open question for David, answered in place |
| `series-plan.md` | the ten-book table: where each book happens and who can return |
| `series-canon.md` | keep-open rules §(a), name clashes §(b), what each canon character does next §(c), roads §(d), timeline §(e), the gods' fates §(f) |
| `series-patches.md` | the squad-patch rules |
| `from-the-ranks-split.md` | how FTR and the frozen Ashes share one site; Book Two's water, kit, games and recruits; the shelf |
| `story-bible.md`, `canon-chronology.md` | Book One's bible and the GotM beat chronology; the Fourth's voice |
| `book2-dg-plan.md`, `dg-canon.md`, `dg-continuity.md` | Book Two's plan, canon sheet and continuity |
| `book3-moi.md` | Book Three shipped: what's in it, how it was built, open questions (now in `open-questions.md`) |
| `book4-hoc-plan.md`, `book4-hoc.md`, `hoc-canon.md`, `hoc-continuity.md` | Book Four's plan and David's answers, the shipped summary, the canon sheet and continuity (copied at ship; the repo's `docs/hoc-canon.md` §6 carries the Q19 answers from v7.3.1) |
| `book5-mt-plan.md`, `book5-mt.md`, `mt-canon.md`, `mt-continuity.md` | Book Five's plan and David's answers, the shipped summary, the canon sheet and continuity (copied at ship, Oct 29) |
| `book6-bh-plan.md`, `book6-bh.md`, `bh-canon.md`, `bh-continuity.md` | Book Six's plan and David's answers, the shipped summary, the canon sheet and continuity (copied at ship, Nov 5) |
| `book7-rg-plan.md`, `book7-rg.md`, `rg-canon.md`, `rg-continuity.md` | Book Seven's (copied at ship, Nov 6) |
| `book8-tth-plan.md`, `book8-tth.md`, `tth-canon.md`, `tth-continuity.md` | Book Eight's (copied at ship, Nov 9) |
| `book9-dod-plan.md`, `book9-dod.md`, `dod-canon.md`, `dod-continuity.md` | Book Nine's (copied at ship, Nov 10) |
| `book10-tcg-plan.md`, `book10-tcg.md`, `tcg-canon.md`, `tcg-continuity.md` | Book Ten's (copied at ship, Nov 11) |
| `series-polish-punchlist.md`, `series-meetings-plan.md` (the canon meetings to add, for David's pick, Nov 15) | The polish punch list (Nov 14): choices that mislead, sentences repeated across books, backdrops against their words, the art contact sheets; David picks |
| `series-polish-plan.md` | The series polish plan after the ten books (Nov 12): audits, continuity, art, sound, dialogue, play and itch.io. §0 to §6 done as of v13.47.2 |
| `series-voices.md`, `series-picture-pass.md`, `overnight-review.md` | the voice sheet per squadmate (41); the picture-versus-text list (74 rows, done); Claude's calls of Nov 15–16 for David to overturn |
| `itch-kit.md` | the itch.io store text and files; waits for beta (David, Nov 17) |
| `series-changelog.md` | history: every version, with true dates from the commits |
| `resume.md` | the save point for a build that spans sessions (overwritten each time) |

**History** (kept, not read unless the work is about them): `v3.16-resume.md`, `v3.16-notes.md`, `v3.17-notes.md`, `v3.18-notes.md`, `v3.19-notes.md`, `v4.0-notes.md`, `audit-v3.15.3.md`, `forward-canon-v3.15.3.md`, `polish-pass-script.md`, and `next-session-agenda.md` (its open items moved to `open-questions.md` on Oct 16, 2026).

**Not in the project, repo only:** `docs/moi-canon.md`, `docs/moi-continuity.md`, `docs/moi-book-brief.md`, the per-chapter notes and the version notes from v6.0 (`docs/v6.0-notes.md`, `docs/v6.8-notes.md`, `docs/v6.9-notes.md`, `docs/v7.1-notes.md`, `docs/v7.2-notes.md`), and `docs/v8.0-notes.md`, `docs/mt-book-brief.md`, `docs/mt-balance.md`. The rule from here (§4): a book's canon sheet and continuity doc are copied to the project at ship.

### Other places

- **The Eldritch Ledger** is retired (David deleted it, Nov 9, 2026). No step logs to it; `resume.md`, the plan docs and `series-changelog.md` carry the state.
- **Memory** (`areas/ashes-of-the-pale.md` in this project): David's dated decisions and the status line.
- **itch.io:** the kit doc "From the Ranks — itch.io Page Kit"; a zip is made only when David asks.
- **The frozen Ashes** (`deforddm/ashes-of-the-pale`): no changes except links onward. One exception made by David (Oct 30, 2026): the save backup, shipped there as v4.10.0 so its players don't lose saves either. Its own `tools/run_all.mjs` has 25 steps; the three bot plays crash in this container on any version (see §0), the 22 tests are the gate. It has no PC copy.

---

## 3. How a book is built

The pipeline Book Three proved (all seven chapters in one overnight build). Each step names its input, its output and its gate. Do them in order; don't start writing chapter text before step 4's gate.

**Step 1. The plan** → `ashes-of-the-pale/book<N>-<abbr>-plan.md`.
What the novel gives us (its spine in seven chapters), the squad (returning, new, or both), the recruits and spares (up to six on the roster, swapped at the fires and from the pack, v7.2.0), the book's own system (the Chain's water and column; the Alliance's trust and dread; what is this book's?), the key choice per chapter, permanent deaths, the roads out, what a transfer brings, the level range and cap, the title and flavour line, the patch, and the book's five games at the fires (one per place its people gather, each paying in the book's own coin; Book Three's in `src/69_b3_games.js`, `docs/v6.13-notes.md`). Put David's questions at the top as a short list with a recommendation first. **Gate: David's answers, dated in the doc.** Everything he didn't rule on is "Claude's call", marked so.

**Step 2. The canon sheet** → `docs/<abbr>-canon.md` (repo), copied to the project at ship.
Built from W, R and F with the source rank in the instructions, every claim sourced. Sections: the spine chapter by chapter; who is where and when; who lives and dies (with what the squad may see and may not); a **hard-limits** section (scenes canon lists by name, where the squad can never stand); **keep-open rules** for later books, added to `series-canon.md` §(a); the name-clash check for every proposed name against all ten novels, added to §(b); the gods available as patrons in this book (§(f)); the timeline in Burn's Sleep for writers only; the Visions list (one canon viewpoint per chapter). Where W and R disagree or both are silent, ask David to check his copy; record the page. **The questions for his copy go into `open-questions.md` the same day**, as one numbered question (Book Four's sat in the canon sheet for a week until Q19). **Gate: no hard limit is contradicted by the plan.**

**Step 3. Engine notes and the book brief** → `docs/v<N>.0-notes.md` and `docs/<abbr>-book-brief.md` (+ `<abbr>-art-brief.md` if the art has new needs).
The book engine file (`src/<N>0_book<N>.js`) first: `newState<Book>`, the book's system, its foes, keys, deck, title art, shelf entry (`BOOKS`), transfer, roster entries and gear roles, the book's voice and places in the audio engine, and its patrons (with a boon for any new god). Then the brief, which **fixes in advance every key, flag, recurring invention, item id and trick** so writers who can't read each other's chapters agree anyway. Reuse `docs/moi-book-brief.md` as the template: the owner's standing wishes; shared rules for writers (read-first list, voice, files, size, key, system, Deck, trick, kit, squad lines, engine-change rule, continuity notes, tests, report); shared rules for artists; then one section per chapter (spine, areas, fights, the key, flags set and read, the trick, kit, inventions). **The writers' voice section carries the trope budgets (§6) and tells each writer to run `node tools/trope_scan.mjs --files` on their chapter before reporting.** **Gate: `run_all` PASS with the empty book on the shelf.**

**Step 4. Write it** → seven writer-and-artist pairs, one per chapter, each in its own worktree and branch, all at once from the brief. (When a usage limit is the constraint, one chapter a session on the `book<N>` branch instead: `series-build-prompts.md`.)
Each pair ships its `src/<N>K_b<N>_chK.js`, `src/<N>Kb_…_art.js`, `docs/<abbr>-chK-notes.md` and a report under 500 words. Their own tests must pass in their checkout before they report. The lead merges in chapter order, runs lint after each merge, and fixes only what the merge broke.

**Step 5. Visions and continuity** → `src/<N>8_b<N>_visions.js` (+ art) and `docs/<abbr>-continuity.md`.
A visions pass writes the seven canon-eyed interludes from the canon sheet's list. A continuity read of the whole book (one agent, fresh eyes) checks every flag promised against every flag read, names, distances, days, who is present, and writes the continuity doc from the chapter notes: per chapter, the key and what it changes, every flag later chapters may read, inventions, what is left open on purpose, fights and xp. Later chapters and the next book read this doc, not the source. The same read runs `tools/trope_scan.mjs` on the whole book; seven writers at once converge on the same new phrases, so it also lists any new phrase that recurs five or more times across chapters.

**Step 6. Balance** → `tools/balance.mjs`, numbers in the shipped doc.
Targets (David, Nov 6, 2026): Soldier, the bot wins about 90% of fights first try (85–97%; the first fight of each book and "survive N rounds" fights near 100%), so a wipe and the gods are possible; Bridgeburner about 75–80% before the gods (65–85%, no fight under 60%); the bot plays the book from Chapter 1 to the finale three times with no forced retry above Book Two's level (3–4 a fight). Any change to the difficulty rules themselves goes to David first (standing rule).

**Step 7. Ship** → §5's checklist. A new book is a major version.

**Step 8. After the ship** → `ashes-of-the-pale/book<N>-<abbr>.md` (what's in it, how it was built, the numbers, files), **the Deeds page's Where the books meet** (`whereBooksMeetHTML` and `worldSVG` in `src/38b_series.js`: the book's paragraph, its place and road on the sketch map; David, Oct 27: keep it current with every book; `access_test` checks every shelf book is named there), the title credit (built from the shelf by `titleCredit`, so it needs no edit; check it reads right), the canon sheet and continuity doc copied to the project, `series-plan.md` and `series-canon.md` updated with what the book settled, the book's open questions appended to `open-questions.md`, §0 here, a row in `series-changelog.md`, the memory status line.

**Then David plays.** His notes come back as patch versions (§6). Expect three to six patches in the first week of a book; that is normal, not a failure of the build.

---

## 4. The doc set for a book

| Stage | Repo `docs/` (writers' copy) | Project `ashes-of-the-pale/` (David's copy) |
|---|---|---|
| Plan and David's decisions | — | `book<N>-<abbr>-plan.md` |
| Canon sheet | `<abbr>-canon.md` | copy at ship |
| Engine notes | `v<N>.0-notes.md` | — |
| Book brief (+ art brief) | `<abbr>-book-brief.md` | — |
| Chapter notes | `<abbr>-ch1-notes.md` … `ch7` | — |
| Continuity | `<abbr>-continuity.md` | copy at ship |
| Shipped summary | — | `book<N>-<abbr>.md` |
| Patch notes | What's new in the game; `README.md` Versions, one line per minor | — |
| Open questions | — | `open-questions.md` (one doc for all books) |
| Series-level | copies of `series-plan.md`, `series-canon.md`, `patches.md` at ship | the authority |
| The build in sessions | — | `series-build-prompts.md`: fifteen pastes, one bounded session each, with the resume paste; for any book |

Doc rules:
- First line: the date in Pacific time and the version the doc describes. A doc that describes a shipped version says "shipped as vX.Y.Z".
- One doc per purpose. A new doc is created only when the table has a row for it; anything else goes into the row it belongs to.
- Open questions are written once, in `open-questions.md`, with the book, the source, the options and a recommendation; the answer is written under the question with its date. Nothing is deleted; a settled question stays as the record of why.
- A plan doc is the record of David's decisions for that book: each decision carries its date. Memory carries the same decision in one line.
- Version notes (`vN.M-notes.md`) are for engine work that is not a book; after a book ships, its chapter notes are not promoted to the project.
- Retired docs are moved to the History list in §2, not deleted and not rewritten.
- **Answers that come from the web, not from the page** (David sometimes sends search results; Oct 27): record each as one more source, with what it cites. It closes an item only where it agrees with the canon sheet or quotes the novel's text (the ch 5 legions line did). Where it conflicts, keep what two sources gave and ask once for the page. Anything that looks stitched together (Oct 27: "Fiddler, Strings, Quick Ben" as three men; the song-to-flood chain; Oct 28: a bridge named "depending on translation variant") is not added anywhere. **Page images with page numbers** (Oct 28: Google Books full-page previews, quoted with edition and page) are the novel's text and close an item on their own.

---

## 5. The release checklist

Every version, however small. In order.

**Pick the lane first** (David, Oct 28, 2026: "there is no way we need to test this for an hour before publishing … we need to come up with a better process for pushing small fixes like this").
- **Quick fix (about 5 minutes):** a patch that only changes looks, wording or one screen, with no change to saves, flags, nodes, combat numbers or game state (v7.4.1, the Deck panel's padding, is the model). Step 1 is then: `python3 build.py`; `node --check` on every `src/*.js` and `sw.js`; `node tools/lint.mjs` if any wording changed; the tests that cover the touched screen, found by grepping `tools/*_test.mjs` for the function, id or selector changed (the Deck: `reading_test`; anything that changes width: `fit_test`; the Back button: `back_test`); and a phone-width screenshot (`tools/shoot.mjs` or a one-off Playwright script at 412 px). **Build what ships from a clean checkout** (a `git worktree` at the commit) whenever an agent is editing the same tree: `build.py` takes every file on disk, finished or not (Oct 29, v8.0.7). Then steps 2 to 8. **No full suite for a quick fix, not even in the background** (David, Oct 29, 8:07 PM PDT: "we really need to get more efficient"); the next full-lane ship's `run_all` covers it. Tell David it's live.
- **Full (about 45 minutes):** new books and chapters, combat and balance, saves, game state, anything new in the engine, or anything that isn't plainly a quick fix. Step 1 as written below. When unsure, it's full.
- **Book lane (v13.5, Nov 14, 2026; polish plan §0c.5):** `node tools/run_all.mjs --books=hoc,tth` (or `--changed`, which reads `git diff origin/main` by the src shelf and falls back to the full run on any shared file) runs only those books' own tests beside every shared test, audits only their maps in `onward_test` (29 min → about 2–3 a book), and plays each book once with fights won outright (`play.mjs --cheat`, about 5 min a book; the fights are `balance.mjs`'s job). About 25–30 minutes for one book. Use it for content inside one or two books; engine, shared art, saves across books and balance tables keep the full run. Found on the first trial: `play.mjs`'s simple bot can't win Book Eight's v13.4 fights (Ch 2 loops until the time limit), so a fought play outside Book One isn't a useful check any more.
- **Both lanes:** ask for the repo's push access and the PC folder (step 4 and 6) at the start of the session's first ship, so the approvals come while the work is done and never hold up a push.
- **Running the background suite:** start it with the shell tool's own background mode and a long timeout (up to two hours), not with `&` or `nohup` (a process detached that way is stopped a few minutes after the reply ends). To stop a run, find its pid with `pgrep -f "node tools/run_all"` and `kill` it; `pkill -f run_all` matches the shell that runs it and kills that too (Oct 28, twice). Don't grep the log for "pass" to see if it's done: "passed as positional argument" in a Python warning matches. Wait for the `overall` line. A `Monitor` on the log filtered to `^FAIL|overall|EXIT` reports each miss as it lands (Oct 30).

1. `node tools/run_all.mjs --play=3` → PASS (full lane; the quick lane's checks above otherwise). David, Nov 12, 2026, 5:33 PM PST: for a small content change in one chapter (a new scene, a rerouted button), the touched chapter's test and the next chapter's test passing are enough, with lint, trope and recruit tests, "unless you know otherwise"; the full suite stays for books, combat, saves and engine work. David, Nov 13, 2026, 10:09 AM PST: a small save fix (v13.3.1) shipped on its targeted tests without the full suite, at his word. **Read every FAIL line of the summary before step 4, not only the last line** (Oct 27: v7.3.0 was pushed with `onward_test` unread; it was the known environmental crash, checked afterwards). A new rule has a new test in the same version. A flaky dice test is re-run twice, and if it passes it is noted in §9 as such; a third miss is a bug. If the session's tool link blinks mid-run the background process can die silently: check the log is still growing, and run the remaining `*_test.mjs` and plays in a detached shell (`setsid nohup`). A container restart kills long background runs too (Oct 27, v7.3.1): resume with a runner that writes each step's result to its own file and skips the ones already done, starting from the first step the log doesn't show. A test that fails inside the suite because the test itself was wrong is fixed and run alone three times; the suite need not be re-run for a test-only change (v7.4.1: `b4squad_test`, five runs). A test that fails in 0.0s didn't run at all: it doesn't parse (v6.14.0 found `b2kit_test` so). A test that crashes its renderer on the previous shipped version too, in the same container, is environmental: note it in §9 and re-run it in a fresh session (v7.2.1, v7.3.0 and v7.3.1, `onward_test`).
2. Bump together: `const VERSION` in `src/10_preamble.js` and `CACHE = 'ftr-vX.Y.Z'` in `sw.js`. Numbers: new book → major (Book Four = 7.0.0); chapter, feature or system → minor; fix → patch; a notes-only or asset-only re-ship adds a letter to the cache name only (`ftr-v6.7.2c`), never to VERSION.
3. What's new (`src/35_pack_journal_save.js`): plain lines a player understands; what changed, what didn't, what happens to old saves. README: the book paragraph if a book changed, and one Versions line for every minor or major (patches live in What's new only).
4. `python3 build.py`, commit with a plain one-line message naming the version, `git push`. The push works when `add_repo deforddm/from-the-ranks` with push access says "added" (it did on Oct 18, Oct 20, Oct 27, Oct 28 and Oct 30): clone to the path it names, copy the changed files in, commit there, push. A long build can be snapshotted to a `wip/…` branch and squash-merged to `main` at ship (Oct 20); the session's proxy may refuse to delete the branch afterwards, which is harmless. **If it is refused** ("not in this session's authorized repository set", as on Oct 16, or by the session's safety check, as twice on Oct 27 until David said "request access here" / "you just need to request access", and on Oct 28 until he said "yes"; Nov 13 until he said "push ok"): ask David in chat to approve the request, then retry once. Ask at the start of the session's first ship, so the approval comes while the tests run. Failing that, write the files to the PC first (step 6), stage them back, and upload them through David's Chrome at `github.com/deforddm/from-the-ranks/upload/main` (and `/src`, `/docs`, `/tools`: one commit per folder, named "vX.Y.Z … (n/4, folder)"). Chrome's file upload only accepts paths under the session's uploads folder, which is why the PC copy comes first. The cloud shell can't reach `deforddm.github.io`; WebFetch of `.../from-the-ranks/sw.js` worked on Oct 28 but on Oct 30 wanted a permission David never saw; `gh api repos/deforddm/from-the-ranks/deployments` shows the deployed commit from the shell, which is enough when WebFetch can't be used.
5. Confirm the live `sw.js` serves the new cache name. Pages deploys in about a minute (check `github.com/deforddm/from-the-ranks/deployments`), but the CDN can keep serving the old file under a query string already used; load `sw.js?nocache=<new number>`. If the deployments page doesn't show the new commit, the push didn't land: check `git log origin/main`.
6. PC copy: every changed file to `C:\Users\stone\FromTheRanks` (request folder access first; it isn't the folder a chat starts with when David picks `C:\Users\stone\Ashes`. On Oct 28 the request was refused by the session's safety check three times until David set the app's permission mode to manual; then one request was granted. On Oct 30 it was refused once, then granted when David said "make the requests again". If it is refused, ask David to switch to manual or link the folder himself. With no device shell, `device_commit_files` from `/mnt/user-data/outputs/`, then `device_list_dir` to check the sizes); sizes match the repo.
7. Playbook §0 (rewrite the Live line; don't append to it) and one row in `series-changelog.md`. For a book: the shipped doc and the copies (§3 step 8). A quick fix skips this; the next full ship catches the docs up (David, Nov 9).
8. Tell David in two or three lines: the version, what it changes, what he should look at on the phone.
9. On request only: the itch.io zip (`from-the-ranks-vX.Y.Z-itch.zip`, tested inside a frame on another address) and the covers.

Never: a blanket cache clear (`caches.keys()` deleting everything; each game clears only its own `ftr-v*` or `ashes-v*`); a full-lane push without `run_all` PASS, or a quick-lane push without its targeted checks; a VERSION without a matching CACHE; edits to `src/19c_artwork.js` or `index.html` by hand.

---

## 6. Fixes and playtest notes

David's notes from the phone are the best test the game has. The flow:

1. Reproduce it first: `tools/shoot.mjs` for a state, `play.mjs --from=K` for a chapter, a one-off Playwright script for a fight. Say what you found before fixing (one line in chat).
2. If the fix is a rule (a counting rule, a UI rule, a canon rule), it gets a test so it stays fixed.
3. Patch version, What's new, ship (§5; most phone notes are the quick lane).
4. If his note is a design change rather than a bug (harder fights, a new ability, a new system), it is a plan question: a short list with a recommendation, his answer in the plan doc or `open-questions.md`, then build.

Answers rule from v7.3.0 (David, Oct 27: the open questions answered in one go): when David answers several open questions at once, the ones that change the game ship together as one minor version, each answer written under its question in `open-questions.md` with the "Claude's call" on how it was built, and one test (`tools/answers_test.mjs`) holds them all. Bridgeburner from v7.3.0: a win mends a quarter of what each squadmate lost, on top of the 10% (20% with a healer standing) patch-up; a squadmate who fell starts from a quarter of full health.

Roster access from v7.3.3 (David, Oct 27: the roster was buried under Squad › Pack › Roster): a Roster button on the map beside Whole map whenever there is a choice (someone at camp, or a recruit or spare walking), with the count waiting, and a Roster tab on every squad sheet; never in the header (it squeezed the place name on a phone). `tools/access_test.mjs` holds it.

Roster rule from v7.2.0 (David, Oct 27: more flexibility with recruits, one uniform way to swap, gear that works the same across books): every book uses the one roster (`src/38c_roster.js`), up to six, at the fires and from the pack's Roster tab; only recruits and spares are benched; gear goes by role, with signature items personal; a transfer carries everyone on the roster with gear, loyalty and picks. `tools/roster_test.mjs` and `tools/gear_roles_test.mjs` hold it. A recruit who can be imported into a later book gets talk scenes in every chapter of that book, as Ellis and Vell have in Book Three. From v7.2.2 (David, Oct 27: recruits join at the sergeant's level, with the rank-up rewards): the level is the squad's; a soldier who joins late or comes back from camp gets the veteran picks for the levels passed at once (`vetCatchUp`), and chooses the talent; the level-up screen offers a pick only to those who owe one. Book Four takes any six once the five places are filled.

Recruit rule from v6.15.0 (David, Oct 20: obtainable squadmates acknowledged when they're with the party): `tools/recruit_scan.mjs` plays every node with each recruit present and absent (Book One Ellis and Vell; Book Two Ramin, Keth and the old hand in Aren; Book Three Sohra, Dannet and imported Ellis and Vell; Book Four Mirrel, Yorin and Rasp; a new book adds its recruits to the scan's `BOOK` table) and lists LISTED (a sentence naming three of the squad but not the recruit standing there), COUNT (a head-count in words wrong with them), SEEN (nodes naming them when present, against the average core squadmate) and ABSENT (named when not there; triage, most are deliberate). `tools/recruit_test.mjs` fails on any unreviewed LISTED or COUNT and on a recruit below 40% of the core average in a chapter (25% for Book Three's imports); deliberate ones go in `tools/recruit_ok.json`. Every recruit line is behind the book's presence check. Writers of a new book give each recruit a line at the fires, the key choice, the chapter end and the scenes that are theirs (their people, their trade), and watch for the one gesture repeated forty times.

Opener rule from v8.2.2 (David, Nov 1: "dialogue says burner but it acts like a sharper"): a fight opened with a munition does what that munition does. Every `startBattle(…, {pre…})` from a burner or smoker choice passes `mun:'burner'|'smoker'` (a new opener must too); the 3×3 is aimed at the thickest foes (v8.2.4); a fight's own `preFx` fire or smoke stands for the munition's; the throw is told once. `tools/opener_test.mjs` holds it; add a new opener fight to its list.

Story-text rule from v8.2.3 (David, Nov 1, 6:18 PM PST): narration and dialogue never count a fight in rounds or turns ("four rounds", "three more turns"). Patrol rounds, a round of drinks and the like are fine; battle objectives, rules text, item and ability descriptions and the battle log's rules lines keep "rounds".

Check rule from v7.0.1 (David, Oct 26: the Aren munitions cart looped): a check is rolled once per node per chapter (`S.rolled`, set in `settleRoll`, filtered in `talk()`, cleared in `startChapter`); a check meant to be tried again says `again: true`. `tools/recheck_test.mjs` holds it.

Prose rule from v6.14.0 (David, Oct 20: the same few tropes on every page): `tools/trope_scan.mjs` counts seventeen families of stock moves in each book's prose, and `tools/trope_test.mjs` fails a book over budget. Rate budgets, per 10,000 words of a book's prose: "the way a man / you'd / one…" simile 5; the silence beat ("says nothing", "doesn't look at you", "nobody says") 9; sentences opening on Nobody/Somebody 14; "for a long time / a long moment" 3; "as if it were" and "a man who has" 1.5 each; "which is how you know" 1; "her eyes stay on / keeps his eyes on" 0.6. Hard caps per book: "weather" 3 (literal weather is fine; the simile is the tic); the shield across her knees, the edge of the light, the reader's "hands are cold" 8 each; the regiment voice and Garrow's password 4; "goes unsaid / doesn't need saying" and "without anything in it" 2; the knife pause 2. The way to fix a hit, in order: cut it (most are a second beat after a line that already landed), make it concrete to the scene, say it straight, name who. Never trade one tic for another. A refrain keeps its first use and one echo that earns it. `node tools/trope_scan.mjs --hits=<file>` lists a file's hits by line; `--files` gives per-file counts. The vision tests check the reader's opener ("<Reader> lets the card go"), not the closer.

Engine rule from v7.2.1 (David, Oct 27: tiles impassable or blocking sight for no visible reason): a sharper's `preFx` that changes a tile uses `preTile(x, y, ch, look)`, with a look for anything it turns solid (`cloth`, `rubble`, `spoil`, `roots`, `timber`; a roof's hole needs none, it draws as the drop), so the board shows what blocks the way; `preTile` repaints the board after `preFx`. `tools/pretile_test.mjs` holds it.

Engine rule from v6.12.0: `talk()` shows a node's words once a sitting (`G.said`); a hub the player comes back to wants an `again:` line (one sentence: the place and the moment) or it folds to its first line with Read it again; a topic whose only way out is Back is dropped once heard; the fight log keeps eighty lines in a scrolling box. Run `node tools/repeat_scan.mjs` on a new book before the continuity read: it lists each hub as `again` or `folds`.

Engine rule from v6.11.0: the game is one script scope, so a new global name must be grepped across `src/` before it is used (a second `drawBone` silently replaced the bones game's, and the reading drew squares). A new book's reading needs a row in `READTABLE` for each chapter's place (`src/21b_reading_tables.js`; `tools/reading_test.mjs` checks every place resolves to a table) and, for a new reader, a `DECKBACK`, a `READER_SPREAD` and a `TBL_KIT` entry.

Engine rule from v6.9.1: nothing is keyed by a unit's index in `B.units` (Book Three's stake line removes units mid-fight); a unit's drawing slot is a counter (`ukey`), and `tools/dispkey_test.mjs` keeps it so.

Standing UI rules from his notes, so they aren't re-learned: End turn ignored for 0.7 s at the start of each squad turn; every onward step declinable; no floating labels or button rows on the map; tap an item to see it large with its text; the Back button closes one layer at a time and asks before leaving; focus to the top on every page change; a squadmate shown on the map isn't also drawn in the party line; anything that blocks movement or sight is drawn as what it is; a bar on the sheet never runs past its box; a full-screen overlay's backdrop runs to every edge of the screen, with the safe-area inset as padding inside it, not as a gap around it (v7.4.1, the Deck reading).

Sound notes: a cue too loud or too quiet on the phone is a number, not a rewrite: `AMB_LVL[key]` for a bed, `STYLE[key].lvl` for a music cue, the `v` of the sound in `SFX`. Everything stays procedural (David, Oct 16).

---

## 7. Canon practice

- **Sources and marks.** W = Malazan Wiki (about half the pages return 402; retry once, then mark unreached), R = Reactor's re-read, F = the fan worksheets, FC = an earlier game doc as the only source, *(memory)* = unchecked. Two sources close an item; one source is supported; none is open. David's copy of the novel beats all of them: when it matters, ask him for the page.
- **The spine and the margin** (David, Nov 15, 2026; `series-canon.md` §(a0)). The squads closely interact and intersect with canon characters, in canon scenes as well as the gaps. Locked: no canon outcome or death changed, caused or reversed; a canon character only where and when the books put them; no early spoilers (a character may believe what a later book overturns; the narrator may not say it); no canon character is ever a viewpoint or controlled by the player. The Through the Deck visions are the exception: direct canon reads through the participants' eyes, changing nothing. Ambient folk are invented people only. A canon deed the squad can't witness may still reach it as soldiers' talk.
- **Keep-open rules.** `series-canon.md` §(a) is binding. Each new canon sheet adds the rules its book creates for the books after it (what must stay unsaid, who must stay unnamed, who must not be seen dying, what the Host or the Fourteenth cannot yet know). A character may believe what a later book overturns; the narrator may not.
- **Names.** Every new name is checked against all ten Erikson novels and the Esslemont ones before it's written anywhere. Clashes and the ruling go in §(b). Known: Kettle keeps her name (David, Oct 13), with the Azath child's parents' good taste remarked on when the Fourth hear of her; Book Five never writes the name; Madryn and Madrun stay in different rooms in any Darujhistan book; never Tavore, never Pallick; Bungle is a sapper sergeant (Q18, v7.3.0).
- **Names and years** (David, Nov 15, 2026). The old never-use names (Kellanved, Dancer, Ammanas, Laseen, Surly, Topper and the rest) are allowed where the speakers would use them. Burn's Sleep years may be printed where the series timeline (`series-canon.md` §(e)) gives a sourced year; where Erikson's own years disagree, say so. Still never: the narrator vouching for something a later book overturns; which leg is Whiskeyjack's bad one; "the Vathar Hills" (Q19).
- **Patrons per book** (§(f)): Fener is torn down in DG (Treach from Book Three on); Hood is beheaded in TtH (the Guardians of the Gate answer after Book Eight); Oponn, Shadowthrone, Cotillion and Soliel run through. Each book's engine file sets who answers for whom, and `BOONS` (31c) what each god leaves on the fight.
- **The darkest material** (the Tenescowri, the palace at Coral, what happens in Y'Ghatan and Letheras) is headline only, suggested, never lingered on; "not a game for kids, nothing lurid". This holds for sound too: the Chain's column is wagons, cattle, hooves and one far-off wail at most, never crying children or screams (David, Oct 16).
- **Credits:** Steven Erikson and Ian C. Esslemont, on the title, at every finale, in the README and on the about page.

---

## 8. Working efficiently

- **One brief, many hands.** The book brief is the whole trick: once every key, flag and invention is fixed on paper, seven chapters can be written at once and merged in an evening. Time spent on the brief is paid back sevenfold. A thin brief means a week of continuity fixes. The v6.14.0 pass proved the same for a polish pass: thirteen writers on one style brief with per-file targets, then one fresh-eyes reviewer over the whole diff, then one fixer for what the reviewer found. Give each writer its own scratch subfolder: thirteen at once in one scratchpad overwrote each other's helper scripts.
- **Read what the brief says to read, not the whole repo.** A chapter writer reads the canon sheet, the engine notes, one recent chapter of the same shape, the skill-check and battle engine files, and the bible's voice section. Nothing else.
- **The lead stays the lead.** One session (or one agent) owns the merge, the engine files and the version; writers never touch `sw.js`, `10_preamble.js`, the book engine or another chapter. Engine needs are reported, not patched in place. An engine agent and writers working at once (v7.2.0) merge cleanly when the writers only read the engine's names; expect one conflict where both touched the same offer.
- **Save in steps.** For an overnight build, `ashes-of-the-pale/resume.md` is overwritten after each agent's worth of work: what is merged, what is next, which checkout holds what. A fresh session reads it and carries on. (`v3.16-resume.md` was the first of these.)
- **Two sessions at once** (Oct 28: Book Five's canon sheet beside the v7.4.1 fix): a book branch and a fix on `main` don't collide in the repo, but they do in the project docs. Re-read a project doc before writing it back; merge `main` into the book branch after the fix ships.
- **Chat gets the short version.** What shipped, what's open, what is needed from David. The record is `series-changelog.md` and the plan docs (the Ledger is retired).
- **Ask once, with a recommendation.** Questions to David come as one short list at the plan stage, each with a recommended answer; the build doesn't wait on anything else. Mid-build calls are made and marked "Claude's call".
- **Small fixes ship fast.** A phone note that changes a look or a line is the quick lane (§5): fixed, checked and live in minutes; no full suite behind it. David waits on these; don't hold them for an hour of bot plays.
- **Tests are the memory of the game.** Every rule David has asked for has a test (`onward_test`, `yesbut_test`, `back_test`, `fit_test`, `munitions_test`, `audio_test`, `boons_test`, `trope_test`, `recheck_test`, `roster_test`, `gear_roles_test`, `pretile_test`, `answers_test`, `backup_test`, …). When a new rule is agreed, the test is written with it, so the rule survives the next ten books.
- **Autonomy granted:** research of the Malazan world and its artwork, including browsing the web for Malazan fan art for reference, needs no permission (David, Oct 12).
- **The phone is the target.** `fit_test` (nothing wider than a phone), `back_test`, `ios_test`, and a look at a phone-size screenshot before shipping anything that changes a screen.

---

## 9. Housekeeping

Reviewed Nov 17, 2026 (v13.48.0). Done items from the Oct 16 list are in `series-changelog.md`'s record and the README.

Open, each small enough for any session:
- **Dice in tests: seeded (Nov 17, 2026, `tools/page.mjs`).** Every page a test or tool opens runs on a seeded `Math.random`, and the seed is printed on stderr (`seed N`). A test that fails on the dice is replayed exactly with `FTR_SEED=N node tools/x_test.mjs` (checked: `keth_test` and `b4squad_test` give identical output twice on one seed). With no `FTR_SEED` the seed is new each run. `FTR_SEED=off` gives the browser's own dice. No game code changed. Not replayable: `play.mjs`, which runs several plays at once and rolls the bot's choices on the node side. A dice test that misses is replayed from its seed and fixed, not re-run until it passes.
- **Soft-locks that depend on a state.** Lint and `onward_test` pass, yet about ten were found by play between Nov 11 and Nov 17 (a "Not now" or an early visit that left no way on). When one is found, add its state to lint's random states with the fix.
- **`docs/moi-canon.md` and `docs/moi-continuity.md`** have no project copy; copy them in when Book Three is next touched.
- **`book4-hoc-plan.md`'s "Claude's calls"** still says Bungle gets no rank until Q18; Q18 was answered Oct 27 (sergeant, Book Two only).
- **The push check (Nov 17, 2026, `.github/workflows/check.yml`).** On every push to `main` GitHub builds the page and fails if it differs from the committed `index.html`, parses every file, checks VERSION against CACHE, and runs lint. It does not run the suite. Its result is the tick or cross beside the commit on github.com.
- **The built `index.html` is committed at every ship** (17.5 MB a version in the repo's history). When the site moves to Cloudflare Pages it can run `build.py` itself.
- **A third squad's tile letters:** Book Three's camp draws '&' as a stone well and Book Six's calls it a water butt; Book Six's road comment calls 'b' a thorn bush but the ground draws bones (`overnight-review.md` §7).
