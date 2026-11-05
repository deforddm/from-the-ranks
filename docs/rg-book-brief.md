Thu Nov 5, 2026, 3:25 PM PST. Against the Book Seven engine on branch `book7` (v10.0.0, not shipped). The standing work order for every chapter of Book Seven, *Unwitnessed*, beside *Reaper's Gale*.

# Book Seven: *Unwitnessed*, the book brief (Chapters 1–7)

- **Plan:** `docs/book7-rg-plan.md` (David, Nov 5: two squads taking turns; each its own levels; the Rising; the title; the Third lent to Keneb's marines). Its Claude's calls stand until David overturns them.
- **Canon:** `docs/rg-canon.md`. **Its "Plan corrections", §6 (hard limits) and §7 (keep-open rules 55–69) are binding**, with `docs/series-canon.md` §(a).
- **Engine:** `docs/v10.0-notes.md`, and `src/120_book7.js`, `src/120c_b7_read.js`.

**How the chapters are built.** Seven writer-and-artist pairs, one per chapter, possibly at the same time. No writer reads another's chapter. This brief fixes every key, flag, item id, trick, fight id, recruit join point, reading place and fire in advance: honour it exactly.
- Read earlier chapters' flags **always with a sensible default when one is unset** (a `--from=K` save sets keys only).
- Invent nothing a later chapter would need. If you must, put it in your notes.
- If the engine can't do something here, follow the engine, say so in your notes, and tell the lead.

## Shared rules (writers)

**Read first, in order:**
1. `docs/rg-canon.md` whole, then `docs/series-canon.md` §(a). In short:
   - The squad is never in a scene canon gives to named people, never changes a canon outcome, and never speaks with the canon people in rg-canon §6 ("Never speaks with"). They may be seen at a distance or heard through a wall.
   - **The Third is lent to Fist Keneb's column as a squad of heavies** (rg-canon correction 1, fix (A), David). It is **never called marines**: "lent to the Fist's column", "the heavies the column borrowed". It raids its own farms, villages and roads, never a named squad's.
   - **The battle before Letheras is two fights** (correction 2): the killing field (Beak's dome, the marines' circle: the Third hears of "a mage who burned", never stands in the circle) and, days later, the Adjunct's landing on the river, where the Letherii army breaks. Canon tells the second after the fact: free margin for the Letherii.
   - Never print a Burn's Sleep year. Never the never-use names (Kellanved, Dancer, Ammanas, Laseen, Surly, Topper, the Talon, the Eel, the T'orrud Cabal). **Never "Kettle"** (rule 60). **"The new emperor"**, never "Tehol the Only" (§7). Never Mael for Bugg (rule 56). Never Hood receiving Beak (rule 63). Never the K'Chain Che'Malle by name ("demons" in rumour, rule 64).
   - Tavore is never a viewpoint and her thoughts are never given (rule 55). The Errant is Lether's god of chance as the Letherii pray to him (rules 31, 57). Who drained the treasury is never settled by the narrator (rule 69).
   - **The Patriotists' cells, the Barghast massacre and the Awl war are headline only.** Nothing lurid.
2. `docs/v10.0-notes.md`, the engine. **Use only names that exist in `src/120*`.**
3. `docs/bh-book-brief.md` (the two-squad book this one copies) and `docs/mt-book-brief.md` §"Shared rules (writers)" (the Letherii's voices and Lether's words). Everything there holds unless this brief changes it.
4. **Conventions from a shipped chapter:** skim `src/101_b6_ch1.js` (the Third, two-squad patterns) and `src/082_b5_ch2.js` (the Letherii) for nodes, areas, fights, checks, `again:`, "Not now" and "yes, but". A "yes, but" is the check's `near:{t:'Yes, but …', fx}`. A trick check is `check:['wits', 17], trick:'<id>', edges:id=>[…]`.
5. The engine files: `016` (`talk`, `check`, edges), `016b` and `031b` (tricks), `031c` (`stage2`, waves, hold-outs, `mortal`), `014` (`registerChapter`), `038c` (`ROSTER_FIRES`, gear roles).

**Voice.**
- Short paragraphs, dry soldier humour, grimdark restraint, **no exclamation marks in narration**. The sergeant is second person and never gendered; `{sgt}` for the name. Italics are `*asterisks*`.
- **The Third's chapters** sound like Book Six's: Malazan soldiers far from home, munitions, Hood's name in an oath. This year they are a long way from any ship. The column moves at night and sleeps by day ("reversed their sleep", W13).
- **The Letherii's chapters** sound like Book Five's: everything counted, written down and owed, and now everything **watched**. Years under the Edur have made the city careful. Fear of neighbours, not of monsters.
- **The trope budgets bind from the first line** (playbook §6; `docs/mt-book-brief.md` lists the rates). Run `node tools/trope_scan.mjs --files` before reporting; `trope_scan` knows Book Seven as `B7` (files 120–139).

**The squads.**
- **Chapters 1, 3, 5, 7: the Third** (`B7_CH`, thread `'t'`). The sergeant is Book Four's (`TPL.sgt` from `BOOKSNAP.hoc`), Book Two's look, Treach's. Core `haddat`, `sathi`, `tangle`, `marrow`; **Sathi is dead on a fresh start**, and Mirrel walks. A Book Six transfer may bring `mehet`, `ottar` and Book Four's spares and recruits. Book Seven's recruits for this squad: `doss` (Ch1), `wenna` (Ch3).
- **Chapters 2, 4, 6: the Letherii** (thread `'l'`), Book Five's Sixth Company. The sergeant is Book Five's, Book Five's look, the Errant's. Core `tobet`, `thegg`, `perrit`, `ammet`. A Book Five transfer may bring `ruuk`, `brune`, `pessa`, and any core soldier may be dead (Book Five's mortal fight). Book Seven's recruits: `ilsa` (Ch2), `sorvan` (Ch4). Book Five's hands hold: Ammet's surgery, Perrit's sorcery of the Holds, in Lether's words.
- **Write only your squad.** Guard every squadmate with `b7In(id)`. Never count heads in words without checking. The other squad gets **one line of news a chapter at most**, as camp talk or rumour; `b7OtherName()` at most once, never in person. The two squads never meet and never cross blades (plan question 5 and 8, Claude's call).

**Your files.**
- `src/12K_b7_chK.js` exports **`B7CHK`** (Ch1 = `121_b7_ch1.js`/`B7CH1` … Ch7 = `127_b7_ch7.js`/`B7CH7`). `src/990` already registers it. `number:'One'` and so on; titles below.
- Your art goes in `src/12Kb_b7_chK_art.js`.
- **Every id carries `b7_c<K>_`** (nodes, areas, fights, foes, items, scenes, flags, tricks). Shared flags named in this brief have no chapter infix and are set only where this brief says. **Every top-level helper carries `b7<K>`** (`b71Say`, `b74Who`…).
- Never edit `src/120*`, another chapter's files, or Books One to Six's files. Add your fire from your file: `ROSTER_FIRES.rg = ROSTER_FIRES.rg || {}; ROSTER_FIRES.rg[K] = ['b7_cK_fire']`. Give each item its role on the item (`role:'blade'`).
- The visions are `128`/`128b` (the visions pass), the games `129`, any extra kit `130`–`139`. Not yours.

**Size and levels.**
- Book Four's chapter size: 60–80 nodes, three or four areas (16×12), three or four fights, each main fight with a `stage2`.
- **Each squad keeps its own levels** (plan question 3; `lvCap()` reads `S.thread`):
  - **The Third: fresh 16, cap 21.** About 17 after Ch1, 18 after Ch3, 19 after Ch5, finishing 20–21. About 500 xp a chapter at the engine's pay (a level is 330).
  - **The Letherii: fresh 8, cap 12.** About 9 after Ch2, 10 after Ch4, finishing about 11. About 400 xp a chapter. They get veteran picks at 9 and 11.
  - `play.mjs --book=rg --from=K` and `balance.mjs --book=rg` use: the Third 16, 17, 18, 19 at Ch 1, 3, 5, 7; the Letherii 8, 9, 10 at Ch 2, 4, 6.
- Foes: start from the engine's `b7_` foes. **The Third's** (`b7_edur`, `b7_edurspear`, `b7_edurchief`, `b7_krisnan`, `b7_wraith`, `b7_lethsoldier`, `b7_lethxbow`, `b7_lethmage`, `b7_lethofficer`, `b7_factorman`) are sized for 16–21. **The Letherii's** (`b7_agent`, `b7_enforcer`, `b7_agentchief`, `b7_rioter`, `b7_edurl`, `b7_malregular`, `b7_malxbow`, `b7_malsgt`) are sized for 8–12. Allies: `b7_marine` (with the Third), `b7_whitefinder` (with the Letherii); both grow with the squad. Add your own foes with a `kind:` that has a sprite.
- **Balance is a later step that goes to David** (`B7GAP` is empty on purpose). Check your fights with `tools/balance.mjs --book=rg` (a scratch `--patch`); write the numbers in your notes; change no rule. Targets: Soldier, a smart player wins every fight; Bridgeburner about 75–80% before the gods.
- **Letherii crossbows are allowed in this book** (W17's "Letherii crossbowmen"); Book Five's bows-only rule was Book Five's canon. Malazan quarrels are "powerful crossbows" to the Letherii (W15).

**The key choice** is `S.f.b7_cK_key`, with the values in `B7KEYS[K]` (don't change them). Pass it to `chapterEnd(K, key)`, with an `end` entry for each value. Later chapters read `S.f.b7_cK_key` directly. **The other squad's keys are readable** (both live in `S.f`), as rumour only.

**The Rising** (the book's system; `docs/v10.0-notes.md` §The Rising). One number, 0–10, shared by both squads, starting at 2.
- **Move it** with `b7Rise(n, why)` where your section says (the table below), and nowhere else beyond ±1 for a scene of your own (prisoners, a town, a kindness). It notes and tallies itself.
- **Read it** with `b7Rising()`, `b7RiseTier()` (`quiet` 0–2, `stirring` 3–5, `rising` 6–8, `risen` 9–10), `b7Open()` (stirring or more: towns open) and `b7Guides()` (rising or more: guides walk in).
- **Checks among the people** (towns, guides, supplies, the Indebted, informers) carry `rise:true`. The engine then adds a named edge: for the Third "The Rising" +1/+2/+3; for the Letherii "Your file at the Patriotists" −1 watched, −2 wanted.
- **The Letherii's file:** `b7Filed(n, why)` when the squad does something the Patriotists would write down. The heat is `b7Heat()` = file + floor(Rising/3), so a high Rising hunts them. `b7HeatTier()`: `clean`, `noted`, `watched`, `wanted`. `b7Wanted()`: a failed `rise:true` check may become an arrest, your section says where. **An arrest is never the cells**: it is a lockup, a door, a clerk, a way out.
- Show `risingHTML()` in a node's `html` where the squad takes stock (the fire, the key). The HUD shows the Rising, and the file once it is noted.
- **"Yes, but" costs:** the Rising and the file can be one each a chapter at most ("Yes, but someone saw you take the bread": `b7Filed(1, …)`).

**The readings** (`120c`; one API for both squads):
- Fill `B7READ[K]` from your file: `{scene, where, set, back, backT, say:{<reader ids>}}`. Put `b7ReadChoice(K)` among the first halt's choices. Register `b7_cK_read: () => b7ReadOffer(K)` and `b7_cK_card: () => b7ReadCard(K)`.
- **The Third reads the Deck** through Book Four's reader: Marrow while she walks, else Tallow, else the old soldier of the 9th (`marrow`, `tallow`, `oldninth`). **The Letherii cast the Tiles** through Perrit while she walks, else the tile-woman (`perrit`, `tilewoman`). Write a line for each reader who can be there.
- The table is `READTABLE['rg:K']` (drawn), the pool `B7POOL[K]`. `B7READ[1]` and `B7READ[2]` are filled as worked examples; keep their back nodes `b7_c1_fire` and `b7_c2_yard`.
- The vision is the visions pass's (rg-canon §12); a reading only opens it. Don't write it.

**A trick** every chapter, behind an optional ✦ hard check (the Third DC 17–18, the Letherii DC 15–16), defined in your file (`Object.assign(TRICKS, {b7_cK_…})` plus `AB.t_b7_cK_…`). Each copies an existing trick's mechanics, named in your section, in this book's words. Lore-based: the check names what the squad knows.

**Kit.** Two to four items with the ids given (`CH.gear`), each with `slot`, `role` and `line`. At least one has a real number (at the Third's levels an item must matter). **Every item has artwork** (`ART['item/<key>']`); the lint fails one without.

**Squad lines.** Branch by roller, always with a `_` default. Edges favour the right hand:
- the Third: Haddat (shields, holding, Hood), Tangle (munitions, sapping), Marrow (healing, the Deck, Soliel), Mirrel (wounds, herbs), Mehet (streets, cisterns), Ottar (the shield wall, the Perish), Doss (fields, the Indebted, factors), Wenna (the coast, tracks, the Shake, boats);
- the Letherii: as Book Five's brief (Tobet the bow and the Indebted; Thegg strength and standing; Perrit the Holds and sums; Ammet wounds and calm; Ruuk roads; Brune the sea; Pessa canals), plus Ilsa (files, informers, the Patriotists' ways, reading people) and Sorvan (horses, cavalry, Bluerose, officers).
- **The recruit rule** (Book Five's): a recruit walking gets a line at the fire, at the key, at the chapter's end and in their own scenes, behind `b7In(id)`. `recruit_scan` knows Book Seven (files 120–139).

**The fire.** Your fire id is in your section; the games pass wraps it, so keep it exactly. It offers the roster (the engine adds it), a rest (`rest()`), the squad's talk, `risingHTML()`, and the way on with "Not now".

**Recurring inventions** (shared; use them, don't contradict them):
- **The Third's officer** is the lieutenant of the marine company it is lent to, unnamed ("the lieutenant"). Keneb, Faradan Sort and the named sergeants are seen at a distance only. The column calls the Third "the borrowed heavies".
- **The Letherii's officer** is still **Finadd Ravel Ennic** (`B5_FINADD`), older. **The company clerk** and **the tile-woman** (Book Five's, unnamed) are still with the Sixth.
- **The squad's file.** The Letherii sergeant has a file at the Patriotists' headquarters with the squad's names in it. Ilsa has seen it. Nobody in the squad ever sees inside the compound.
- **The factor.** Ch1's coastal **tally-shed** (a factor's outpost, its tally-book burned) and Ch3's **factor's house** inland are two different factors, both unnamed.
- **Money:** the Third counts silver; the Letherii count docks (`b7Coin(n)` says which). **Debt is flavour only** in this book: the Letherii's debts carry from Book Five and their bios read them, but **don't call `b5Owe`, `b5Pay` or `b5Forgive`** and don't build a pay desk.
- **Munitions:** the Third has the column's issue; Lether has none.
- **"Bonehunters"** may be said by soldiers, at most once a chapter, never by the narrator as a name for the army.
- **No new named people** beyond the four recruits. Every other invention is unnamed by role. A writer who truly needs a name runs the series check (`series-canon.md` §(b)) first and records the row.

**Engine changes** go in your own file, guarded by `S.book === 'rg'` (`b7On()`), under a `b7<K>` name, and are reported to the lead. Never edit `src/120*`.

**Continuity.** Write `docs/rg-chK-notes.md`: the key values and what each changes; every flag later chapters may read, with its values; the Rising and file moves, with numbers; the named inventions; anything left open on purpose; canon points you were unsure of; fights' xp and balance numbers.

**Tests** (all must pass): `python3 build.py`; `node --check` on your files; `node tools/lint.mjs` with 0 errors; `node tools/play.mjs 3 --book=rg --from=K` 3/3 and `node tools/play.mjs 1` 1/1; `repeat_scan`, `trope_test`, `recruit_test`, `b7engine_test`, `roster_test`, `reading_test`; and **a chapter test `tools/b7chK_test.mjs`**: halts, both keys (three in Ch7), every fight's start and win, the trick, the fire, the reading, the recruit's join, and the Rising moves your section names, from a fresh state and from the `--from=K` save. One browser at a time.

**Commit to `book7`**, never `main`. Don't touch `sw.js` or `src/010_preamble.js`.

**Report** (under 500 words): areas, nodes, fights and xp, the key and its consequences, the Rising moves, the flags set, file sizes, test numbers, any edits outside your files, the canon points you were unsure of.

## Shared rules (artists)

**Your file:** `src/12Kb_b7_chK_art.js`: figures, ground, backdrops and item art. Match the established art exactly in scale, palette, line weight and light. Study `src/120b_b7_title.js` (this book's palette), Book Six's `100b` and chapter art (the Third), Book Five's `080b` and `080d` (Lether, `sgt_mt`, the Letherii and Edur kinds).

**Book Seven's look.**
- **The Third's Lether** (Ch 1, 3, 5, 7): night. The coast in the light of burning ships; farm country under no moon; plaster-and-thatch villages; the river; Letheras's towers and smoke at the end. The Malazans in grey-green cloaks over mail, the Third heavier than the marines round it.
- **The Letherii's Lether** (Ch 2, 4, 6): Book Five's blue-grey, canal-green, lamp-gold and wet stone, gone shuttered and watchful; the army camp below Kravos Hill; the field before the walls at dawn. Grey Edur at the gates. Item art on **Book Five's canal-slate ground with the dock-gold rim** for the Letherii's items, **Book Six's ground** for the Third's.

**Hooks:** `FIGX[kind]`, `POR[id]`, `TILEX[style]`, `SCENEX[kind]` (with `sceneLayer` caching and `REDUCE()` respected), `ART['item/<key>']`.

**Replace your placeholder backdrops.** Each `b7_` scene in `B7_SCENE_LIKE` (`120`) borrows an earlier drawing until a chapter replaces it: `SCENEX.b7_… = …` in your art file. Your section says which are yours.

**New figures for this book** (everything else is drawn): Ch1 draws `doss`; Ch2 `ilsa` and the kind `b7_agent` (a Patriotist in a grey coat, replacing the borrowed `b5_letherii` for agents); Ch3 `wenna`; Ch4 `sorvan`; Ch6 the kind `b7_malregular` (a Malazan regular seen from the Letherii side). Register a simple placeholder for each name in your first steps, guarded (`FIGX.doss ??= …`), then replace it.

**Look at your work** in Playwright contact sheets in `/tmp/claude-0/shots/b7/chK/` at phone width. **Limits and tone:** keep the file under about 150 KB. The burning ships, Beak's dome and the white fire under the city are drawn at a distance: light on water, a silver hemisphere on the horizon, a glow under a quarter. No bodies in close-up, ever. Finish with `python3 build.py`, `node --check`, `node tools/lint.mjs`; report in under 300 words.

---

## The keys, and who reads them

| Ch | Squad | Key | Values | Read by |
|---|---|---|---|---|
| 1 | Third | `b7_c1_key` (the ships) | `burn` / `strip` | Ch3 (supplies; the lieutenant's look), Ch5 (munitions in the village), Ch7 fate pages |
| 2 | Letherii | `b7_c2_key` (the informer) | `name` / `refuse` | Ch4 (who is watched at the muster; Ilsa), Ch6, Ch7's Letherii pages |
| 3 | Third | `b7_c3_key` (the factor's house) | `ledger` / `loot` | Ch5 (who helps in the village), Ch7 (the crowd), Doss's page |
| 4 | Letherii | `b7_c4_key` (the muster) | `edur` / `letherii` | Ch6 (where the squad stands in the line; who it trusts), Ch7's Letherii pages |
| 5 | Third | `b7_c5_key` (the village) | `hold` (mortal) / `slip` | Ch7 (the fallen, the coda), finale |
| 6 | Letherii | `b7_c6_key` (the battle) | `stand` / `break` | Ch7's Letherii pages, finale |
| 7 | Third | `b7_c7_key` (the roads) | `adjunct` / `letheras` / `home` | finale; Book Nine imports `adjunct` |

**The Letherii's road** is `S.f.b7_lethRoad`: `army` / `palace` / `free` (`B7_LETHROADS`), chosen at Chapter 6's end, read by Ch7's finale. `army` leads to Book Nine (rule 66: Malazan sergeants train it; some of it will march east under Brys; never the Wastes).

## Where the Rising moves (the whole book)

| Ch | Squad | Moves (fixed) | Reads |
|---|---|---|---|
| 1 | Third | the tally-book burned: `b7Rise(1)`; `strip` also takes stores from a farm: `b7Rise(-1)` | — |
| 2 | Letherii | `name`: `b7Rise(-1)`, `b7Filed(-1)`; `refuse`: `b7Rise(1)`, `b7Filed(2)` | `b7HeatTier()` at the bridge |
| 3 | Third | `ledger`: `b7Rise(2)`; `loot`: `b7Rise(-1)`; prisoners let go or not: ±1 | `b7Open()`: a village opens its gate; `rise:true` on the guide check |
| 4 | Letherii | `edur`: `b7Rise(-1)`, `b7Filed(-1)`; `letherii`: `b7Rise(1)`, `b7Filed(1)` | `b7Wanted()`: the arrest branch at the muster |
| 5 | Third | `hold`: `b7Rise(2)`; `slip`: `b7Rise(-2)` | `b7Guides()`: the villagers warn the Third in time (a round's head start) |
| 6 | Letherii | `break`: `b7Rise(1)`; `stand`: none | `b7HeatTier()` in the camp the night before |
| 7 | Third | the crowd: `b7Rise(1)` once | `b7RiseTier()` for the city's mood and the coda |

## The fires and the readings

| Ch | Fire | Reading place (`rg:K`) | Lean card or tile (`B7POOL[K]`) |
|---|---|---|---|
| 1 | `b7_c1_fire` | above the beach the night the ships burned | the Soldier |
| 2 | `b7_c2_fire` | the barracks yard (`B7READ[2]`, back `b7_c2_yard`) | the Watcher |
| 3 | `b7_c3_fire` | a farmhouse floor, no lamp | the Assassin |
| 4 | `b7_c4_fire` | a tent at the muster below Kravos Hill | the Wall |
| 5 | `b7_c5_fire` | the village, the factor's cellar | the Herald |
| 6 | `b7_c6_fire` | the line before the ridge, at dawn | the Gate |
| 7 | `b7_c7_fire` | a Letheras street at the end | the King |

## Chapter 1: "The Burned Ships" (`121`, the Third, key `burn` | `strip`)

- **Spine** (rg-canon §2, ch 13; W13): the fleet follows the Edur; Tavore's "unwitnessed" speech to her officers (unseen, a line through a runner at most); the marines land on the north-west coast; **the transports are burned** so there is no way back; the squads reverse their sleep; mages mask them with Mockra; Keneb orders the march inland; Faradan Sort takes Beak.
- **The squad's story:**
  - The captain's order before the landing: the Third is lent to the Fist's column as heavies, "the way the City Garrison lot were moved into the marines last year" (BH R5).
  - The landing, and the burning seen from the beach. Their own transport among the burning.
  - The first night inland: a factor's **tally-shed** on the coast road, its guards (`b7_c1_tally`, main, `stage2`; `b7_factorman`, `b7_lethsoldier`). The squad burns the tally-book: `b7Rise(1, 'a factor\'s tally-book burned')`.
  - **Doss walks in** the next night and asks what the Malazans pay: `b7Join('doss')`.
  - Letherii riders passing at night on the coast road (`b7_c1_riders`, optional; `b7_lethsoldier`, `b7_lethxbow`).
  - An Edur patrol in the dunes (`b7_c1_dunes`; `b7_edur`, `b7_edurspear`).
- **Key `b7_c1_key`**, at the waterline as the order comes to fire the transports:
  - `burn`: fire your own transport with the rest, on time. The column sees the Third did it.
  - `strip`: save its stores first (+2 sharpers, +2 salves) and be late inland: the riders catch the squad on the road (`b7_c1_riders` becomes required), and the stores come partly from a farm on the way: `b7Rise(-1, 'a farm stripped')`.
- **Trick:** *Finger-Talk* (`b7_c1_fingertalk`), the marines' night signs the Third picks up; copies **Claw Hand-Cant** (`cant`).
- **Items:** `b7_c1_charredcloak` (light, +1 ac), `b7_c1_factorblade` (blade), `b7_c1_tallyash` (trinket: a burnt page of the tally-book, Doss's family line on it).
- **Reading:** `B7READ[1]` is filled (Marrow / Tallow / the old soldier); back `b7_c1_fire`.
- **Fire:** `b7_c1_fire`.
- **Hard limits:** the Froth Wolf; Second Maiden Fort; Boaral Keep's ambush; **the way station** (Sort and Beak's horses); Hellian's rum. Keneb is a voice down the line.
- **Art:** `b7_coast_burning`, `b7_coast_night`; the figure `doss`.

## Chapter 2: "The File" (`122`, the Letherii, key `name` | `refuse`)

- **Spine** (rg-canon §3; W1–W9): Letheras under Rhulad; Karos Invictad's Patriotists, "the loyal and the disloyal"; the Chancellor isolates the Emperor; champions from the fleets (headline); coin short across the empire; the Rat Catchers outlawed (rumour); the great quarrel between the Patriotists and the Edur after the First Concubine's arrest (as the barracks hear it).
- **The squad's story:**
  - The barracks under Edur eyes: grey shapes at the gate. Finadd Ennic signs less, and reads more.
  - A neighbour of the squad's taken in the night, a door left open.
  - **Ilsa**, a clerk at the Patriotists who copied the squad's file, comes to the squad with what she knows: `b7Join('ilsa')`.
  - Agents in an alley off the canal (`b7_c2_alley`, main, `stage2`; `b7_agent`, `b7_enforcer`, `b7_agentchief`).
  - Enforcers at a canal bridge (`b7_c2_bridge`; harder when `b7HeatTier()` is `noted` or worse).
  - The Edur at the barracks gate test the squad's blades (`b7_c2_gate`, optional; `b7_edurl`). Not a fight to the death; an Edur "lesson".
- **Key `b7_c2_key`**, when the Patriotists want a name:
  - `name`: give them a name, any name. `b7Rise(-1)`, `b7Filed(-1)`. Somebody else's door opens at night.
  - `refuse`: no name. `b7Rise(1)`, `b7Filed(2)`, and the file grows.
- **Trick:** *The Clerk's Margin* (`b7_c2_margin`), Ilsa's knowledge of how a file is read; copies **The Line** (`line`). Without Ilsa, Perrit (sums).
- **Items:** `b7_c2_filepage` (trinket: a page of the squad's own file), `b7_c2_agentknife` (blade), `b7_c2_greycoat` (light: a clerk's coat; +1 on `rise:true` Guile checks, Claude's call, a small effect).
- **Reading:** `B7READ[2]` is filled (Perrit / the tile-woman); back `b7_c2_yard`.
- **Fire:** `b7_c2_fire`.
- **Hard limits:** the Patriotist compound, its cells, Karos's office; Tehol's house; Huldo's; the Rat Catchers' tunnels; the throne room; the Champions' Compound and the arena. Karos, Tanal and Gnol are names and a carriage at most.
- **Art:** `b7_barracks`, `b7_letheras`; the figures `ilsa`, `b7_agent`.

## Chapter 3: "Night Raids" (`123`, the Third, key `ledger` | `loot`)

- **Spine** (rg-canon §2, ch 14–18; W17): weeks inland; the marines raid by night; Sort sees the Letherii fighting beside the Edur; ambushes by Letherii crossbowmen and a mage; Fiddler's Drum on a road; the Kenryll'ah at a farmhouse; Thom Tissy counts ten smokes (heard of, not seen); the column mauls a Letherii brigade (name open, never print "Borthen").
- **The squad's story:**
  - Night marches, a cold camp, the column spread over farms.
  - **Wenna**, a Shake fisher who knows the inland roads, guides the squad: `b7Join('wenna')`. Her guiding check is `rise:true`.
  - An ambush at a farm of the squad's own (never the Kenryll'ah farm): `b7_c3_farm`, main, `stage2` (`b7_lethxbow`, `b7_lethmage`, `b7_lethsoldier`).
  - A village that opens its gate if `b7Open()`, else shuts it (a different road, a fight: `b7_c3_road`, `b7_edur`, `b7_krisnan`).
  - **The factor's house** and its guard: `b7_c3_factor` (`b7_factorman`, `b7_lethofficer`).
- **Key `b7_c3_key`**, in the factor's counting room:
  - `ledger`: burn the debt records. `b7Rise(2)`. Doss's line if he walks.
  - `loot`: feed the squad (+20 silver, +2 salves). `b7Rise(-1)`.
- **Prisoners** from the farm fight: let go or kept: ±1 (your call, once).
- **Trick:** *Wenna's Tracks* (`b7_c3_tracks`), the Shake roads the maps leave out; copies **The Rope's Way** (`rope`). Without Wenna, Doss (field paths).
- **Items:** `b7_c3_letherxbow` (ranged, a real number), `b7_c3_edurmail` (mail), `b7_c3_ledgerash` (trinket; only on `ledger`).
- **Reading:** a farmhouse floor, no lamp (`rg:3`); the Assassin.
- **Fire:** `b7_c3_fire`.
- **Hard limits:** the Drum and its road; the Kenryll'ah farmhouse; Uru Hela's and Sands' deaths (heard of); any named squad's fight; Keneb's camp council.
- **Art:** `b7_farm_night`, `b7_march_night`, `b7_camp_night`; the figure `wenna`.

## Chapter 4: "The Muster" (`124`, the Letherii, key `edur` | `letherii`)

- **Spine** (rg-canon §3, corrections 6; W15–W20): news that the Patriotists and the Edur are at war in all but name; Tomad and Uruth jailed (headline); the Awl'dan war a thousand leagues east (news only); the army left at home is thin ("five armies" went east); the home army raised against the invaders; the commanders' camp on Kravos Hill, where Hanradi Khalag's Edur show contempt for the Letherii.
- **The squad's story:**
  - The Sixth mustered as eastward units are gone. The march out to the camp under Kravos Hill (never the commanders' tent).
  - **Sorvan**, a Bluerose lancer left behind, comes to the Sixth at the muster: `b7Join('sorvan')`.
  - Rioters at the muster gates (`b7_c4_riot`; `b7_rioter`), a crowd that does not want to be an army.
  - Edur in the camp who test the Letherii (`b7_c4_edurcamp`; `b7_edurl`).
  - Patriotist agents in the camp come for a name on the squad's list (`b7_c4_patriots`, main, `stage2`). **If `b7Wanted()`**, the arrest branch: the sergeant taken to the camp lockup; out by Ilsa, Sorvan, a check, or Ennic's signature. Never a cell scene.
- **Key `b7_c4_key`**:
  - `edur`: serve under Edur eyes. `b7Rise(-1)`, `b7Filed(-1)`.
  - `letherii`: join the Letherii officers who want the Edur gone. `b7Rise(1)`, `b7Filed(1)`.
- **Trick:** *Bluerose Horse-Sense* (`b7_c4_horse`); copies **Rhivi Spirit-Song** (`song`). Without Sorvan, Ruuk or Tobet.
- **Items:** `b7_c4_bluelance` (reach), `b7_c4_bluescale` (heavy, a real number), `b7_c4_musterbadge` (trinket).
- **Reading:** a tent at the muster (`rg:4`); the Wall.
- **Fire:** `b7_c4_fire`.
- **Hard limits:** the Awl'dan (Bast Fulmar, Redmask's camps); Drene; the commanders' tent on Kravos Hill; Sirryn Kanar, Bivatt, Hanradi in person (a banner, a voice).
- **Art:** `b7_kravos`; the figure `sorvan`.

## Chapter 5: "The Village" (`125`, the Third, key `hold` | `slip`)

- **Spine** (rg-canon §2, ch 21; W21): the squads funnelled between Edur bands to the north and the river to the south; Hellian's villages (officials and money-lenders killed, the people warning the marines; headline); hundreds of Edur close on the tavern village; the 3rd Company comes up the river by stolen boat; Keneb's 671 push for the capital, Sort commanding the rearguard of ten squads of heavies.
- **The squad's story:**
  - A village of the Third's own on the river side of the funnel, the same day as the tavern village (rg-canon §14).
  - The Indebted who hid the squad. If `b7Guides()`, they warn the Third in time (the fight starts with the squad set, a round's head start).
  - Edur scouts on the road in (`b7_c5_road`; `b7_edurspear`, `b7_wraith`).
- **Key `b7_c5_key`**:
  - `hold`: **the mortal fight** `b7_c5_village` (`mortal:true`, `stage2`): an Edur band, `b7_edur`, `b7_edurchief`, `b7_krisnan`, a holding fight until a relief the Third makes for itself (a cusser and a roof, if they have one: read `b7_c1_key` `strip` for the extra munitions). Never Primly's boat. `b7Rise(2)`.
  - `slip`: out by night and leave the Indebted who helped (`b7_c5_slip`, a running fight, not mortal). `b7Rise(-2)`.
- **Trick:** *Hold the Square* (`b7_c5_square`); copies **Blue Fire** (`bluefire`) mechanically (a square of shields, as Book Six's Grey Helms' Wall).
- **Items:** `b7_c5_villageshield` (shield, a real number), `b7_c5_edurblade` (heavyweapon).
- **Reading:** the factor's cellar (`rg:5`); the Herald.
- **Fire:** `b7_c5_fire`. The dead from the mortal fight are named there (`S.dead[id] = {ch:5, where:<ground title>}`).
- **Hard limits:** the tavern village and its mews; Hellian, Urb and the named squads; Bowl, Lutes and Tavos Pond (their deaths are open, §15 Q1: never shown either way); Primly's boat; Keneb's council.
- **Art:** `b7_village`.

## Chapter 6: "Before the Walls" (`126`, the Letherii, key `stand` | `break`)

- **Spine** (rg-canon correction 2, §3; W22, R24.1): the army before Letheras; the mages on the ridge watched by Sirryn and a veteran commander; the week-long ritual loosed on the marines' circle; **a silver dome far off** (Beak's; never named, never his death shown); Hanradi's Edur walk home; then the army marches for the river to meet the Adjunct's landing, which shatters it, and she lets her soldiers kill the broken (headline only).
- **The squad's story:**
  - The camp the night before (read `b7HeatTier()`: a watched squad sleeps badly).
  - The line below the ridge at dawn; the light on the horizon; the Edur leaving (seen).
  - Letherii deserters running from the ridge (`b7_c6_deserters`, optional; `b7_rioter` and your own).
  - The march to the river and the Adjunct's soldiers coming off the ships: `b7_c6_landing`, main, `stage2` (`b7_malregular`, `b7_malxbow`). **These are the Adjunct's regulars, never marines and never the Third.**
- **Key `b7_c6_key`**, as the line wavers:
  - `stand`: hold until a Malazan sergeant's squad breaks on you (`b7_c6_stand`; `b7_malsgt`). Not mortal.
  - `break`: run with the rest; crossbows on the riverbank (`b7_c6_break`, a running fight, not mortal). `b7Rise(1)`.
- **The Letherii's road**, at the chapter's end: `S.f.b7_lethRoad` is `army`, `palace` or `free`.
- **Trick:** *The Cadre's Ward* (`b7_c6_ward`), Perrit's ward of the Holds; copies **A Courtesy of Darkness** (`dark`). Without Perrit, Ammet's smoke of burning bedding.
- **Items:** `b7_c6_ridgecharm` (focus), `b7_c6_fingershield` (shield: the white fingertip, a real number).
- **Reading:** the line at dawn (`rg:6`); the Gate.
- **Fire:** `b7_c6_fire`.
- **This is the Letherii's last chapter:** write their fate pages as `B7CH6.fates`, an object with `page(id) → {title, txt}` and `pages()` (Book Six's corrected shape, bh-continuity "Fixed" 1), which Ch7's finale reads.
- **Hard limits:** the ridge and its mages; the killing field and the dome (seen from afar); Beak; Hanradi, Sirryn and the veteran commander in person; the Adjunct; Kravos Hill's tent.
- **Art:** `b7_field`, `b7_river`; the kind `b7_malregular`.

## Chapter 7: "Letheras" (`127`, the Third, keys `adjunct` | `letheras` | `home`)

- **Spine** (rg-canon §2, ch 24; R24.1, R24.2): Beak's barrow (unseen); refugees flee the city; the mob holds much of it; Keneb takes the gate himself and sends others through the tunnel and to the palace; white fire under Scale House (unexplained, rule 59); a white dragon driven off (rule 60); the garrison surrenders to the Adjunct; the crowd shouts "Saviour" and "Emperor"; an Edur killed in the arena (heard as news, rule 35); the new emperor, three weeks on.
- **The squad's story:**
  - With Keneb at the gate (rg-canon §14), never the tunnel or the palace: `b7_c7_gate`, main, `stage2` (`b7_lethsoldier`, `b7_lethxbow`, `b7_lethofficer`).
  - The streets after: Patriotist holdouts running from the mob (`b7_c7_streets`; `b7_lethsoldier`, your own).
  - A bridge with the crowd on it (`b7_c7_bridge`, optional), and the crowd's mood by `b7RiseTier()`: `b7Rise(1, 'the crowd')` once.
  - The surrender seen from a street; the shout; the earthquake and the white light, unexplained.
  - The other squad: the Letherii's road is news to the Third (one line), and their pages come in the finale.
- **Key `b7_c7_key`** (the road out): `adjunct` (stays with the army; Book Nine), `letheras` (the new emperor's coin and a post in the city), `home` (time served, a berth home).
- **Trick:** *The Crowd's Luck* (`b7_c7_luck`); copies **The Lady's Pull** (`pull`).
- **Items:** `b7_c7_lethcloak` (light), `b7_c7_kingscoin` (trinket: a coin struck before anyone knew whose face to put on it).
- **Reading:** a Letheras street at the end (`rg:7`); the King.
- **Fire:** `b7_c7_fire`.
- **The finale:** a fate page per squadmate of **both** squads (the Letherii's from `B7CH6.fates`), each squad's road (`b7_c7_key`, `S.f.b7_lethRoad`), the Rising at the end, and *Where the books meet*. Then 37's end page (coda, both squads' dead, credit to Steven Erikson and Ian C. Esslemont).
- **Hard limits:** the tunnel and the postern; the palace, the throne room and the Eternal Domicile; the arena; Scale House and the machine; the roofs where Ruin falls; the City Garrison fight; the Patriotist compound; Tehol's house; Settle Lake. Never speaks with Keneb, Fiddler, Quick Ben, Hedge, Tehol, Brys, Janath or Varat Taun.
- **Art:** `b7_city_burning`.

## Machine limits

- One browser at a time for every Playwright test.
- `play.mjs --book=rg` skips cleanly until a chapter registers; the shelf shows Book Seven once one does.
- `index.html` is built, never committed by a chapter.
