Sun Nov 8, 2026, 11:16 PM PST. Against the Book Eight engine on branch `book8` (v10.3.0 merged in; v11.0.0 not shipped). The standing work order for every chapter of Book Eight, *Time Served*, beside *Toll the Hounds*.

# Book Eight: *Time Served*, the book brief (Chapters 1–7)

- **Plan:** `docs/book8-tth-plan.md`. **Every "Settled" block binds** (David, Nov 8: the Fourth only; Darujhistan, out to Black Coral and back; 16, cap 21; the Contract; the calendar fix (A); kelyk through the book, with the jug; Neffarias Bredd; Rumjugs and Sweetlard; the eight callbacks). Its "Claude's calls" stand until David overturns them.
- **Canon:** `docs/tth-canon.md`. **Its plan corrections 1–8, §4 (hard limits), §5 and `docs/series-canon.md` §(a) rules 1–83 are binding.** Rules 70–83 are Book Eight's own (summarised where they bite, below).
- **Engine:** `docs/v11.0-notes.md`, and `src/140_book8.js`, `src/140b_b8_title.js`, `src/140c_b8_read.js`. **The v10.2 and v10.3 rules hold** (`docs/v10.2-notes.md`, `docs/v10.3-notes.md`).

**How the chapters are built.** One writer-and-artist agent per chapter, **one at a time** (David, Nov 4), in order. No writer needs another's chapter: this brief fixes every key, flag, item id, trick, fight id, recruit join point, reading place, fire and callback in advance. Honour it exactly.
- Read earlier chapters' flags **always with a sensible default when one is unset** (a `--from=K` save sets keys only; `B8KEY0` holds the defaults).
- Invent nothing a later chapter would need. If you must, put it in your notes.
- If the engine can't do something here, follow the engine, say so in your notes, and tell the lead.

## The owner's standing wishes (David; every chapter, no exceptions)

- **A Deck reading** with a vision through canon eyes (the reading is yours; the vision is the visions pass's, tth-canon §9).
- **A trick** behind an optional ✦ hard check (DC 17–18 at these levels), lore-based: the check names what the squad knows.
- **Two to four new items, each with artwork.**
- **A key choice** with consequences later (the keys below).
- **Every onward step declinable** ("Not now").
- **A scene-fitting "yes, but"** on every check (`near:{t:'Yes, but …', fx}`); silver only where money is the scene.
- **Short paragraphs, dry soldier humour, no exclamation marks in narration**; the sergeant in second person, never gendered (`{sgt}` for the name).
- **Nothing lurid; the darkest canon is headline only.** Kelyk is never made to look good.
- **No combat rounds or turns in story text.**
- **Backgrounds match the dialogue** (place, time, who is present).
- **Recruits acknowledged** when present (the fire, the key, the chapter's end and their own scenes, behind `b8In(id)`).

## Shared rules (writers)

**Read first, in order:**
1. `docs/tth-canon.md` whole (corrections 1–8, §3, §4, §5, §7, §9), then `docs/series-canon.md` §(a). In short:
   - **The calendar (fix A).** Ch 1 is the winter **before** the Fete. Ch 2 is the road east at winter's end. Ch 3–4 are Black Coral and the camp's **first** turning (never its real turning: Salind, Gradithan's hut, Spindle and Monkrat's children, Silanah's fire are later rumour). Ch 5 is the road west during the Fete, reaching the city on its **last day**. Ch 6 is the last night; Ch 7 the morning after.
   - The squad is never in a scene canon gives to named people and **never speaks with** anyone on tth-canon §4's list. They may be seen at a distance or heard through a wall. A Guild knife, a Redeemer priestess and a camp pilgrim are the game's own people.
   - Never print a Burn's Sleep year, or a count of weeks or months ("weeks", "years"). Never the never-use names.
   - **The Fourth is never "Bridgeburners"** (rule 12). The K'rul's Bridgeburners are a closed group (rule 71).
2. `docs/v11.0-notes.md`, the engine. **Use only names that exist in `src/140*`.**
3. `docs/rg-book-brief.md` and `docs/bh-book-brief.md` §"Shared rules (writers)": everything there holds unless this brief changes it (two-squad rules don't apply: Book Eight is one squad).
4. **Conventions from a shipped chapter:** skim `src/063_b3_ch3.js` (the Fourth's voices) and `src/121_b7_ch1.js` (the newest patterns) for nodes, areas, fights, checks, `again:`, "Not now" and "yes, but". A trick check is `check:['wits', 17], trick:'<id>', edges:id=>[…]`.
5. The engine files: `016` (`talk`, `check`, edges, the backing-up edge), `016b` and `031b` (tricks), `031c` (`stage2`, waves, hold-outs, `mortal`, soak, wards, death checks), `989` (v10.3 free and passive tricks), `014` (`registerChapter`), `038c` (`ROSTER_FIRES`, gear roles).

**Voice.**
- **The Fourth, years on.** Book One's and Book Three's soldiers, older, out of the army and not out of the habit: they bar the door, count the exits, keep a ledger. The humour is drier and quieter. They have lived in Darujhistan long enough to know the price of bread and the name of the street, and not long enough to stop sleeping light.
- **Darujhistan** sounds like Book One's: blue gas-light, the Gadrobi District's tanneries and dyers, rooftops, the lake. **The old Domin** sounds like Book Three's dead country coming back wrong. **Black Coral** is night at noon, lamps, tall shapes on the walls, never a named Andii.
- **The trope budgets bind from the first line** (playbook §6; `docs/mt-book-brief.md` lists the rates). Run `node tools/trope_scan.mjs --files` before reporting; `trope_scan` knows Book Eight as `B8` (files 140–159).

**The squad.**
- **The Fourth** (one squad, `S.book === 'tth'`): the sergeant (Book One's look, Treach's; Book Eight's own history, "Time served") and `brisk`, `kettle`, `tuft`, `ohl` on a fresh start, **all alive**, at **level 16**.
- **A transfer may change the Fourth** (`S.imported`): a Book Three `daru` or `standdown` save (lifted to 16) or a Book Six `highfist`, `hanarara` or `home` save (keeps 16–18). Any of the four may be dead; `sohra`, `greysword` (Dannet), `ellis`, `vell`, `brannoc`, `ressa` may walk or wait. **Guard every squadmate with `b8In(id)`**; never count heads in words without checking.
- **Where they came from** (`b8Story()`): `daru` (fresh start and Book Three's `daru`: they stayed in the city after Coral), `standdown` (scattered, and the city put most of them back together), `highfist` / `hanarara` (back across the ocean on the Host's time-served list, years on; **the Host itself never appears**), `home` (went home, found it gone, came west again). One line of it at most a chapter. `b8ArriveWords()` says it for you.
- **The Fourth's door** is up the street from the Phoenix, **never named**. A Book Three save's line: "the Phoenix had other ideas", and Brisk still glares at it. The squad never goes inside the Phoenix.
- **Recruits:** **Vasso** (Guild journeyman, he; Ch 1 on `hunt`, Ch 2 on `quiet`) and **Edrem** (former Seerdomin, he; Ch 3). `b8Join(id)`. Edrem is always "Edrem"; "wore the grey once"; the word "Seerdomin" for him at most once in the book (Ch 3).

**Your files.**
- `src/14K_b8_chK.js` exports **`B8CHK`** (Ch1 = `141_b8_ch1.js`/`B8CH1` … Ch7 = `147_b8_ch7.js`/`B8CH7`). `src/990` already registers it. `number:'One'` and so on; titles from `B8CH` (*Before the Fete*, *The Black Coral Road*, *Black Coral*, *The Pilgrims' Camp*, *The Road Back*, *The Night of the Hounds*, *The Toll*). **"Fete" without the accent on screen**, as the series spells it (Claude's call).
- Your art goes in `src/14Kb_b8_chK_art.js`.
- **Every id carries `b8_c<K>_`** (nodes, areas, fights, foes, items, scenes, flags, tricks). Shared flags named in this brief have no chapter infix and are set only where this brief says. **Every top-level helper carries `b8<K>`** (`b81Say`, `b84Who`…).
- Never edit `src/140*`, another chapter's files, or Books One to Seven's files. Add your fire from your file: `ROSTER_FIRES.tth = ROSTER_FIRES.tth || {}; ROSTER_FIRES.tth[K] = ['b8_cK_fire']`. Give each item its role on the item.
- The visions are `148`/`148b`, the games `149`, any extra kit `150`–`159`. Not yours.

**Size and levels.**
- 60–80 nodes, three or four areas (16×12), three or four fights, each main fight with a `stage2`.
- **Fresh 16, cap 21.** About 450 xp a chapter (a level is 330). `play.mjs --book=tth --from=K` and `balance.mjs --book=tth` use **16, 16, 17, 17, 18, 19, 19** at Ch 1–7.
- **Foes:** the engine's `b8_` foes (v11.0-notes §Foes): the Guild (`b8_knife`, `b8_guildbow`, `b8_veteran`, `b8_gmknife`), the Dying God's people (`b8_cultist`, `b8_kelykpriest`, `b8_fieldtender`), `b8_pilgrim`, `b8_bravo`, `b8_bravocaptain`, `b8_raider`, and **`b8_hound`, which can never be dropped and leaves after two rounds** (rule 14). Add your own with a `kind:` that has a sprite.
- **Design fights with v10.2 from the start:** heavies soak (Brisk, Edrem, Dannet 1; the veteran 1, the Grand Master's knife 2): give the squad crossbows, sorcery, munitions and flanks as answers. The Guild crossbow pierces. The kelyk priest's blow is sorcery. **Death checks run in every fight but the mortal one.**
- **Balance is a later step that goes to David** (`B8GAP`, `B8SOLDIER` are empty on purpose). Check your fights with `tools/balance.mjs --book=tth` (a scratch `--patch`); write the numbers in your notes. Targets: Soldier about 90% first try (the first fight of the book and every survive fight near 100%); Bridgeburner 75–80%, none under 60%.

**Tricks (v10.3, David, Nov 8).**
- **A trick that doesn't strike or take a foe's turn is free** (`free:true` on its `AB`, and its words end "It does not use the action (one free trick a turn)."). The engine allows one free trick per squadmate per turn.
- **Group heals stay a full turn.**
- **A passive** (`passive:true`: no button, runs at fight start) must be listed in `V103_PASSIVE` in `src/989_v103_tricks.js`; Ch 5's is already there (`b8_c5_grass`).
- **Wards:** only a heal aimed at one squadmate leaves a ward: call `healW(u, n)`. Plain `heal()` leaves none (group heals, trickles).

**The key choice** is `S.f.b8_cK_key`, with the values in `B8KEYS[K]` (don't change them). Pass it to `chapterEnd(K, key)`, with an `end` entry for each value.

**The Contract** (the book's system; v11.0-notes §The Contract). One number, 0–10, starting at 3.
- **Move it** with `b8Con(n, why)` only where your section says, plus at most ±1 for a scene of your own (blood in the city, a name asked, a friend on the Council's edges, a thing kept quiet). **The engine moves it too:** a won `guild:true` fight +1; the start of Ch 3 and Ch 4 −1 each.
- **Read it** with `b8Contract()`, `b8ConTier()`, `b8Roofs(ch)` (who waits on the roofs), `b8WayOut()` (Ch 6 only).
- **Checks where the Guild's interest matters** carry `contract:true` (the engine adds "The Guild's paper", 0 to −3).
- Show `contractHTML()` at the fire and the key. "Yes, but" may cost one Contract point a chapter ("Yes, but someone on a roof saw it").
- **Rule 70:** never who paid, for the Fourth's knives or K'rul's. Never that the Fourth's names were on the K'rul's contract. The Grand Master is faceless: never Seba Krafar or Krute on the page. The Fourth's is "a second paper"; Vasso may say "Malazans, the paper said. The Guild doesn't ask which."

**The readings** (`140c`): fill `B8READ[K]` `{scene, where, set, back, backT, say:{tuft, sohra, benna}}`; put `b8ReadChoice(K)` among the first halt's choices; register `b8_cK_read: () => b8ReadOffer(K)` and `b8_cK_card: () => b8ReadCard(K)`. The reader is Tuft, else Sohra (bones), else **old Benna, a Daru washerwoman now**, who travels with the caravan in Ch 2–5 because it pays. Write a `say` line for each. The card lines are done (`B8SAY`).

**Kit.** The item ids given (`CH.gear`), each with `slot`, `role`, `line` (no numbers in a line). At least one with a real number. **Every item has artwork** (`ART['item/<key>']`) on **Book Eight's ground: night slate-blue (#2a3038 → #0a0c10), gas-blue rim light**, 200×150, as `140b`'s charm and jug.

**Squad lines.** Branch by roller, always with a `_` default. Edges favour the right hand: Brisk (holding, shields, Hood, salutes), Kettle (munitions, sapping, counting), Tuft (the Deck, Meanas, shadows, cats), Ohl (healing, Soliel, the list, kelyk's cost), Sohra (bones, spirits, horses), Dannet (shields, the Wolves), Ellis (scouting, Claw ways), Vell (ropes, roofs, the Guild), Brannoc (Falari noise, boats), Ressa (fever, temples), **Vasso** (the Guild's signs and roofs, Daru streets, bells), **Edrem** (the old Domin, the barrow road, pilgrims, holding a line).

**The fire.** Your fire id is in your section; keep it exactly (the games pass wraps it). It offers the roster (the engine adds it), a rest (`rest()`: it clears wounds and the kelyk-sickness), the squad's talk, `contractHTML()`, and the way on with "Not now".

**Recurring inventions** (shared; use them, don't contradict them):
- **The Fourth's door** (above). **The caravan:** one merchant's venture, never the Council's; its master **Calder** (the merchant's man). The merchant himself is unnamed ("the merchant").
- **Minor names** (tth-canon §6, the only ones): **Orsa** (she, the Gadrobi dice-den keeper), **Benlo** (a Gadrobi street vendor), **Calder** (caravan master), **Thessaly** (she, an Andii-sworn human clerk in Black Coral), **Hurrin** (a pilgrim from the north), **Mossa** (she, a Redeemer priestess at the camp's edge). Everyone else unnamed by role. A writer who truly needs a name runs the series check first and records it.
- **The tavern** (Ch 1, and seen again in Ch 6): a Gadrobi tavern, not K'rul's, not the Phoenix, unnamed ("the tavern with the painted sign"). **Its sign is Rumjugs and Sweetlard**, two painted women nobody can explain (rule 16; their meeting is Book Nine's). **A retired Malazan drinks there** ("from the Seven Cities lot"): he tells the Bredd story (Ch 1) and is the old soldier who sells the charm.
- **Neffarias Bredd** (canon spelling): one rumour a book, bigger each time, always secondhand, never seen. Book Eight's (Ch 1, the retired Malazan): the largest yet. Books Four (`b4_c5_bredd`), Six (`b6_c5_bredd`) and Seven (`b7_c3_bredd`) are the scale to beat.
- **Kelyk** (plan, 9:03 PM PST): Ch 2 the merchant is smuggling it east; Ch 3–4 pilgrims drink it; Ch 5 a peddler heading west. **It never reaches the city** (canon). **The jug** (`b8_kelykjug`) is placed in Ch 2. Never glamorised: a sweet smell, then what it does, headline only.
- **The Hood-touched charm** (`b8_hoodcharm`) is placed in Ch 1. **The Kurald Galain shroud** (`b8_shroud`) is Ch 3's trick.
- **Money:** silver. **Munitions:** what the Fourth kept, and the Moranth's in Darujhistan if Kettle can find a buyer's price (Ch 1, optional).

**Engine changes** go in your own file, guarded by `b8On()`, under a `b8<K>` name, and are reported to the lead. Never edit `src/140*`.

**Continuity.** Write `docs/tth-chK-notes.md`: the key values and what each changes; every flag later chapters may read, with its values; the Contract moves, with numbers; the callbacks you wrote and what they read; the named inventions; anything left open on purpose; canon points you were unsure of; fights' xp and balance numbers.

**Tests** (all must pass): `python3 build.py`; `node --check` on your files; `node tools/lint.mjs` with 0 errors; `node tools/play.mjs 3 --book=tth --from=K` 3/3 and `node tools/play.mjs 1` 1/1; `repeat_scan`, `trope_test`, `recruit_test`, `b8engine_test`, `roster_test`, `reading_test`; and **a chapter test `tools/b8chK_test.mjs`**: halts, every key (three in Ch 7), every fight's start and win, the trick, the fire, the reading, the recruit's join, the callbacks, and the Contract moves your section names, from a fresh state and from the `--from=K` save. One browser at a time.

**Commit to `book8`**, never `main`. Don't touch `sw.js` or `src/010_preamble.js`.

**Report** (under 500 words): areas, nodes, fights and xp, the key and its consequences, the Contract moves, the flags set, the callbacks, file sizes, test numbers, any edits outside your files, the canon points you were unsure of.

## Shared rules (artists)

**Your file:** `src/14Kb_b8_chK_art.js`: figures, ground, backdrops and item art. Match the established art in scale, palette, line weight and light. Study `src/140b_b8_title.js` (this book's palette: night slate-blue, Darujhistan's gas-blue fire, lamp gold, the moon's bone white), Book One's Darujhistan and Book Three's Coral and the Domin (`06Kb`).

**Book Eight's look.**
- **Darujhistan** (Ch 1, 6, 7): blue gas-light on wet stone, Gadrobi roofs and tanneries, the lake. Winter in Ch 1; the Fete's masks and lanterns in Ch 6; a broken wall, smoke, and the moon in pieces on the last night; a grey morning of bells in Ch 7.
- **The road and Black Coral** (Ch 2–5): the old Domin grey and flat, green rows and rag-wrapped shapes on poles at a distance; Black Coral under a night that does not lift, lamps at noon; the barrow heaped with gifts; the camp's tents and shacks; the Lamatath's long grass at dusk.

**Hooks:** `FIGX[kind]`, `POR[id]`, `TILEX[style]`, `SCENEX[kind]` (with `sceneLayer` caching and `REDUCE()` respected), `ART['item/<key>']`.

**Replace your placeholder backdrops** (`B8_SCENE_LIKE` in `140`): `SCENEX.b8_… = …` in your art file. Your section says which are yours.

**Figures:** `vasso` and `edrem` have simple sprites in `140` and busts in `140b`: Ch 1's artist replaces `FIGX.vasso`, Ch 3's `FIGX.edrem` (keep the busts' kit: Vasso's dark quilted jack, a knife's hilt over the shoulder, the knotted cord; Edrem's grey scale with the marks filed off, the pilgrim's cloak, the mace slung, the coral token). Ch 6 draws `b8_hound`'s passing (the `hound` kind is drawn; a darker, larger variant if you like, never killed). **Bust rules:** each its own neckline by kit, a short natural neck, the garment blending up into the shoulders, every prop held, slung or belted.

**Look at your work** at phone width (390×844). **Limits and tone:** under about 150 KB. The broken wall, the moon, the Hounds, the scarecrow fields and the camp are drawn at a distance. No bodies in close-up, ever. Finish with `python3 build.py`, `node --check`, `node tools/lint.mjs`.

---

## The keys, and who reads them

| Ch | Key | Values (default first in `B8KEY0`) | What it changes | Read by |
|---|---|---|---|---|
| 1 | `b8_c1_key` (the paper) | `hunt` / `quiet` (default `quiet`) | `hunt`: go after who is paying (never found, rule 70): `b8Con(2)`, Vasso joins in Ch 1. `quiet`: lie low: `b8Con(-1)`, Vasso comes in Ch 2 | Ch 2 (Vasso), Ch 6 (the way out), Ch 7 |
| 2 | `b8_c2_key` (the wagons) | `fields` / `pass` (default `pass`) | `fields`: burn the merchant's hidden kelyk and the scarecrow field beside the road: the caravan fee is lost (−20 silver), `S.f.b8_c2_kelyk = 'burned'`. `pass`: say nothing, take the pay (+20): `'passed'` | Ch 4 (one more wave of kelyk-mad pilgrims on `passed`), Ch 5 (the peddler) |
| 3 | `b8_c3_key` (the barrow) | `kneel` / `stand` (default `stand`) | `kneel`: lay something on the barrow (the Redeemer takes a weight: **peace, never a boon**); Edrem's loyalty +1. `stand`: stand witness at the edge with Edrem; the camp's guards trust the squad | Ch 4 (`stand`: +2 edge on the hold check), Ch 7 (the `coral` road, fate pages) |
| 4 | `b8_c4_key` (the bad night) | `hold` / `burn` (default `hold`) | `hold`: keep the camp's far edge through the night (the survive fight). `burn`: burn the edge's kelyk stores (`b8_c4_stores`); never Gradithan's hut, never the camp | Ch 5 (on `burn` the peddler's is the last kelyk on the road), Ch 7 |
| 5 | `b8_c5_key` (the road) | `fast` / `wary` (default `wary`) | `fast`: reach the city before the gates close, no road fight: `b8Con(1, 'they slipped the knives')`. `wary`: find the road knives first (`b8_c5_knives`, `guild:true`) and arrive at dusk of the last day; `S.f.b8_c5_scouted = 1` | Ch 6 (`scouted`: the knives fight opens with surprise for the squad) |
| 6 | `b8_c6_key` (the last night) | `wall` / `street` (default `street`) | `wall`: hold an unnamed stretch of the broken wall with the watch (`b8_c6_wall`). `street`: the Gadrobi streets behind the wall, the Fourth's door (`b8_c6_street`, the Hound passes) | Ch 7 (who saw what; fate pages) |
| 7 | `b8_c7_key` (the roads) | `daru` / `coral` / `east` | `daru`: stay in the city, the door kept. `coral`: back to Black Coral, in the Andii's pay or the Redeemer's road (with Edrem if he walks). `east`: a ship toward the Malazans abroad | finale; Book Nine may import `east` |

**Shared flags** (set only where named): `b8_c2_kelyk` (`burned`/`passed`), `b8_c5_scouted`, `b8_c6_wayOut` (`quiet`/`roofs`/`word`/`fought`), `b8_c6_knivesDown` (the Ch 6 fight won), the callbacks' flags below. Engine: `b8_vassoDone`, `b8_edremDone`, `b8_away3`, `b8_away4`.

## Where the Contract moves (the whole book)

| Ch | Moves (fixed) | Reads |
|---|---|---|
| 1 | start 3; `hunt` +2, `quiet` −1; the alley fight (`guild:true`) +1 (engine) | `contract:true` on the go-between check |
| 2 | none (weeks away begin) | — |
| 3 | −1 at the chapter's start (engine) | — |
| 4 | −1 at the chapter's start (engine) | — |
| 5 | `fast` +1; `wary`: the road knives (`guild:true`) +1 (engine) | `b8Roofs(5)` sizes the road knives |
| 6 | none fixed | `b8WayOut()` (one way out), `b8Roofs(6)` (the mortal fight) |
| 7 | the morning: −2 if `b8_c6_knivesDown` ("the Guild has counted enough") | `b8Roofs(7)` (who is left on the roofs) |

So a `hunt` road reaches Ch 6 at about 5 (three knives; `word` if Vasso walks, else none), a `quiet` road at about 2 (two knives; `roofs`).

## The fires and the readings

| Ch | Fire | Reading place (`tth:K`) | Lean card (`B8POOL[K]`) |
|---|---|---|---|
| 1 | `b8_c1_fire` (the Fourth's door) | the table by the fire, between the cups (`B8READ[1]` filled) | the Assassin |
| 2 | `b8_c2_fire` (the caravan's fire) | a wagon's tailboard | the Leper |
| 3 | `b8_c3_fire` (a lodging in Black Coral) | a stone sill under the lamps | the Knight of High House Dark |
| 4 | `b8_c4_fire` (the camp's edge) | a pilgrim's mat | the Soldier of High House Life |
| 5 | `b8_c5_fire` (the Lamatath) | the grass at dusk | the Hounds |
| 6 | `b8_c6_fire` (the Fourth's door, the last night) | a doorstep in the Gadrobi streets | the Gate |
| 7 | `b8_c7_fire` (the lake shore) | the shingle by the lake | the King of High House Death |

## The callbacks (plan, David, 9:13 PM PST; each fixed to a chapter)

| # | Callback | Ch | Reads | Flag |
|---|---|---|---|---|
| 1 | **The Fete, full circle.** Masks in the streets on the last night; someone remembers the last Fete (Book One's); a line for the sergeant. Echoed once in Ch 7's coda | 6 (and 7) | always; a Book Three save from Book One may add `S.imported` words | `b8_c6_fete` |
| 2 | **The barrow and the Shield Anvil's Weight.** Whoever carries the Book Three trick (`trickBy('b3_c7_anvil')`) gets their own scene at the barrow; if nobody, the sergeant does the remembering. Never Itkovian's end | 3 | `trickBy('b3_c7_anvil')` | `b8_c3_anvil` (the bearer's id, or `'sgt'`) |
| 3 | **Mallet.** The news from K'rul's at the gate lands as the death of a man the Fourth knew: "two of the K'rul's Malazans dead" (W: Mallet and Bluepearl), and the sergeant remembers Mallet wanting a week of Whiskeyjack flat on his back (Book Three). Never the raid, Blend or Picker (rule 71) | 5 | always (Ohl's line if he walks) | `b8_c5_mallet` |
| 4 | **Vell and the Guild.** If Vell walks, the paper makes him face what the Guild wrote against his name (Vasso knows the mark). Never tied to K'rul's contract (rule 70) | 1 (and a line in 6) | `b8In('vell')` | `b8_c1_vell` |
| 5 | **Tuft and Tufty.** A rumour the morning after: the Jaghut in the old house has taken in a dead white cat called Tufty. Tuft is not amused. Never in one scene; the house stays shut (rule 6, §(b)) | 7 | `b8In('tuft')` | `b8_c7_tufty` |
| 6 | **The old historian at K'rul's.** The retired Malazan in the tavern mentions an old man up at K'rul's who walked the Chain and wrote it down. Never his name, never how he lives (rule 17) | 1 | always | `b8_c1_historian` |
| 7 | **The wreck in the bay** at Black Coral: from the harbour wall, a broken black shape out in the water, what's left of the fortress the Fourth saw over Pale. Tuft knows it. Never named (rule 80: never "the Spawns") | 3 | `b8In('tuft')` | `b8_c3_wreck` |
| 8 | **The Guardians of the Gate.** At the back of the crowd behind the ox cart, a soldier who answers for the dead says something only Whiskeyjack would have said to the Fourth (take it from Books One or Three's text). Never his name (rule 75) | 7 | always | `b8_c7_guardian` |

**Running threads:** Bredd (Ch 1; the tavern), Rumjugs and Sweetlard (Ch 1 the sign; seen again in Ch 6), kelyk (Ch 2–5). **For later books** (don't write): Kettle's name and the Azath child; Hedge's return.

---

## Chapter 1: "Before the Fete" (`141`, key `hunt` | `quiet`)

- **Spine** (correction 1, fix A): winter in Darujhistan, **weeks before the Fete**. K'rul's isn't touched yet. The Guild's first knife for the Fourth comes on **a paper of its own** (correction 3). Gorlas, Lim and Orr are names in the city's gossip only.
- **The squad's story:**
  - A winter night at the Fourth's door; something on the roof that is not the wind. The first knife (`b8_c1_alley`, main, `stage2`, `guild:true`; `b8_knife` ×2, `b8_guildbow`; stage 2 the roofs).
  - **The tavern with the painted sign** (Rumjugs and Sweetlard; flag `b8_c1_sign`): **the retired Malazan** tells the **Bredd** story (`b8_c1_bredd`, the biggest yet: "from the Seven Cities lot") and mentions **the old historian at K'rul's** (callback 6). He has a **Hood-touched charm** he will sell or give (`gain('b8_hoodcharm')`).
  - **Orsa's dice den** (optional brawl, `b8_c1_den`; `b8_bravo`).
  - **The key:** go after who's paying, or lie low. On `hunt`: a go-between's house (`b8_c1_hunt`; `b8_bravo` ×2, `b8_bravocaptain`) and **Vasso** in the Fourth's door afterwards (`b8Join('vasso')`); the trail ends at a closed door: never who paid.
  - **Vell** (callback 4) if he walks.
- **Key `b8_c1_key`:** `hunt` `b8Con(2, 'names asked')`; `quiet` `b8Con(-1, 'kept quiet')`.
- **Trick:** *The Roof-Line* (`b8_c1_roofline`), the Guild's lines strung between chimneys; copies **the Rope's Way** (`rope`): free.
- **Items:** `b8_hoodcharm` (engine; placed here), `b8_c1_guildknife` (weapon, blade), `b8_c1_roofboots` (trinket: +1 move).
- **Reading:** `B8READ[1]` is filled; back `b8_c1_fire`. **Fire:** `b8_c1_fire`.
- **Hard limits:** K'rul's Bar (inside, its door, its fights); the Phoenix; the Vidikas estate; Murillio; Picker, Antsy, Blend, Mallet, Bluepearl; who paid (rule 70). Never "Seba Krafar" or "Krute".
- **Vision:** Picker walking back to K'rul's, followed, deciding (tth-canon §9.1; a vision of what is coming).
- **Art:** `b8_daru_night`, `b8_gadrobi`, `b8_door`; the figure `vasso`; the tavern sign (two painted women, nobody's faces in particular).

## Chapter 2: "The Black Coral Road" (`142`, key `fields` | `pass`)

- **Spine** (correction 4): east over the old Domin at winter's end, with **one merchant's caravan** (never the Council's), master **Calder**. "Weeks", never a count. The scarecrow fields and the risen towns are canon (R4 S2, R6 S3).
- **The squad's story:**
  - **Vasso** joins on `quiet` (Ch 2's first halt).
  - **The merchant is smuggling kelyk east** in a hidden wagon (plan); the squad finds out. **The jug** is in it (`gain('b8_kelykjug')`).
  - The scarecrow fields (`b8_c2_fields`, `pollen:true`; `b8_fieldtender`, `b8_cultist`): the pollen pulls at the mind; **the scarecrows sing and never fight**.
  - A risen Pannion town and its priest (`b8_c2_town`, main, `stage2`; `b8_cultist` ×3, `b8_kelykpriest`).
  - Raiders on the road (`b8_c2_raid`, optional; `b8_raider`).
- **Key `b8_c2_key`:** see the keys table (`S.f.b8_c2_kelyk`).
- **Trick:** *The Carter's Brake* (`b8_c2_brake`), wagons chained in a line; copies **The Line** (`line`): free.
- **Items:** `b8_kelykjug` (engine; placed here), `b8_c2_caravanmail` (armour, mail, ac 3: +1 soak), `b8_c2_drovergoad` (weapon, reach).
- **Reading:** a wagon's tailboard by the caravan fire. **Fire:** `b8_c2_fire`.
- **Hard limits:** never Nimander's party, a wagon with a comatose boy, or Kallor; never Bastion or the Dying God's body; never Heath or Gothos's tower.
- **Vision:** Nimander at the scarecrow fields (§9.2).
- **Art:** `b8_road_east`, `b8_fields`, `b8_caravan_night`.

## Chapter 3: "Black Coral" (`143`, key `kneel` | `stand`)

- **Spine:** Coral renamed, under a night that does not lift; the Great Barrow just outside, the pilgrim camp round it (W *Spindle*, R4, R6). The Andii hold the city; none is named (rule 77).
- **The squad's story:**
  - The city: **Thessaly**, an Andii-sworn clerk; lamps at noon. **The wreck in the bay** from the harbour wall (callback 7).
  - **The barrow** the Fourth saw raised in Book Three. **The Shield Anvil's Weight** callback (2).
  - **Edrem** on the pilgrims' road; raiders on it (`b8_c3_road`, main, `stage2`; `b8_raider` ×3, `b8_bravo`); `b8Join('edrem')`.
  - Kelyk-sellers in the outer camp (`b8_c3_sellers`, optional; `b8_cultist` ×2, `b8_pilgrim` ×2).
  - A tavern where an Andii plays a game with a man in grey, another night (the squad is in the same tavern, never at their table).
- **Key `b8_c3_key`:** see the keys table. **The Redeemer never acts for a petitioner** (correction 8): kneeling brings peace, never a boon.
- **Trick:** **the Kurald Galain shroud** (`b8_shroud`, engine: free, a full 15% ward at once): the check names what the squad knows of Kurald Galain (Tuft's Meanas, the Courtesy of Darkness if anyone carries `dark`, Book One's terrace). Earn it with `earnTrick('b8_shroud', who)`.
- **Items:** `b8_c3_coralknife` (weapon, blade), `b8_c3_pilgrimtoken` (trinket: +1 wits), `b8_c3_lamp` (trinket: an Andii lamp).
- **Reading:** a stone sill under the lamps. **Fire:** `b8_c3_fire`.
- **Hard limits:** inside the barrow; any talk with the Redeemer; the High Priestess; the New Andiian Palace; the deep cavern; Spinnock and the Seerdomin's game; the Liberators; Gradithan, Salind; **"Seerdomin" for Edrem at most once**.
- **Vision:** the Seerdomin at his prayer before the barrow (§9.3).
- **Art:** `b8_blackcoral`, `b8_barrow`; the figure `edrem`.

## Chapter 4: "The Pilgrims' Camp" (`144`, key `hold` | `burn`)

- **Spine** (fix A): the camp's **first** turning: kelyk spreading, the children kept apart, the guards no longer coming, the pilgrims frightened (R6 S5–S7). The squad holds its edge on one bad night and is gone before the real turning.
- **The squad's story:**
  - **Hurrin**, a pilgrim from the north; **Mossa**, a Redeemer priestess at the camp's edge.
  - The bad night: **hold the far edge** (`b8_c4_edge`, survive, `objective:{type:'survive', rounds:5}`; `b8_pilgrim` waves, `b8_cultist`; **one more pilgrim wave** if `b8_c2_kelyk === 'passed'`).
  - On `burn`: **the kelyk stores** at the edge and their keepers (`b8_c4_stores`, main, `stage2`; `b8_cultist` ×2, `b8_kelykpriest`). Never Gradithan's hut; never the camp.
  - Others (never shown) take the children; the squad hears it after, as rumour.
- **Key `b8_c4_key`:** see the keys table. `stand` from Ch 3: +2 edge on the hold check.
- **Trick:** *The Water-Song* (`b8_c4_hymn`), what the camp's water-carriers sing over the sick (people's craft, never the Redeemer's power); copies **Rhivi Spirit-Song** (`song`): a group heal, **a full turn**, no wards.
- **Items:** `b8_c4_camphook` (weapon), `b8_c4_greyscale` (armour, mail), `b8_c4_ashrag` (trinket).
- **Reading:** a pilgrim's mat at the camp's edge. **Fire:** `b8_c4_fire`.
- **Hard limits:** Salind; Gradithan's hut; Spindle and Monkrat; the children's rescue; Silanah's fire (later rumour, "fire from the sky", rule 78); the Seerdomin.
- **Vision:** Spinnock at the tavern game, and Salind (§9.4).
- **Art:** `b8_camp_night`.

## Chapter 5: "The Road Back" (`145`, key `fast` | `wary`)

- **Spine:** west over the Lamatath **during** the Fete, reaching the city on its last day (correction 6). The Hounds run **toward the city**. At dusk, far off, **four torches on tall poles** at a crossroads and one figure waiting: never closer.
- **The squad's story:**
  - **The kelyk peddler** heading west, whom the squad can stop (`b8_c5_peddler`; `b8_raider` ×2, `b8_pilgrim`). On `burn` (Ch 4) his is the last kelyk on the road.
  - Raiders in the grass (`b8_c5_grass`, optional; `b8_raider`).
  - On `wary`: **the road knives** (`b8_c5_knives`, `guild:true`, `contract:[[x,y],…]` for `b8Roofs(5)`).
  - **At the gate:** the news from K'rul's: two of its Malazans dead. **Mallet** (callback 3).
- **Key `b8_c5_key`:** see the keys table.
- **Trick:** *Grass-Running* (`b8_c5_grass`), how the plains people read the grass for what runs through it; copies **the Long Listen** (`b4_c6_listen`): **passive** (`passive:true`; already in `V103_PASSIVE`).
- **Items:** `b8_c5_peddlerpack` (trinket), `b8_c5_grasscloak` (armour, light), `b8_c5_raidersword` (weapon).
- **Reading:** the grass at dusk. **Fire:** `b8_c5_fire`.
- **Hard limits:** **the crossroads fight**; Spinnock, Kallor, Korlat, Orfantal; Traveller, Karsa, Samar Dev (at most "a giant and a swordsman on the road, far off"); the Kindaru and Skathandi; the Captain's carriage.
- **Vision:** Spinnock at the crossroads (§9.5).
- **Art:** `b8_lamatath`.

## Chapter 6: "The Night of the Hounds" (`146`, key `wall` | `street`; the mortal fight)

- **Spine** (correction 5): the Fete's last night. The Hounds have wrecked the wall; **the moon has shattered**; the Gadrobi District burns. The Fourth hold **a different breach** or the **Gadrobi streets** behind the wall: never Traveller's breach, never Cotillion, never the gaol.
- **The squad's story:**
  - **The Fete, full circle** (callback 1): masks in the streets, the last Fete remembered. The painted sign again.
  - `wall`: an unnamed stretch of the wall with the watch (`b8_c6_wall`; `b8_bravo` looters, `b8_raider`). `street`: the Gadrobi streets and the Fourth's door (`b8_c6_street`, survive 4 rounds; **a Hound passes the end of the street**: `b8_hound` in a wave, never dropped, gone after two rounds).
  - **The knives** (`b8_c6_knives`, **the mortal fight**: `mortal:true`, `guild:true`, `contract:[[x,y],…]` four tiles; base foes one `b8_knife`): the Contract decides how many (`b8Roofs(6)`). **The one way out** (`b8WayOut()`, offered before the fight, "Not now" on it as ever): `quiet` nobody comes; `roofs` a ✦-free hard check (DC 18, `contract:true`) to slip them over the roofs, a failure starts the fight; `word` Vasso's word to a journeyman he knows (his loyalty ≥ 1), never a guarantee; `null` no way out. Set `S.f.b8_c6_wayOut`; on a win `S.f.b8_c6_knivesDown = 1`. `S.f.b8_c5_scouted` gives the squad surprise.
  - **Vell** if he walks: one knife knows his mark (callback 4).
  - **Hood falls** this night: Brisk's god is **the dead**; the charm is cold. Death "didn't answer" (rule 74).
- **Key `b8_c6_key`:** see the keys table.
- **Trick:** *The Knife-Sign* (`b8_c6_knifesign`), the Guild's hand-signs Vasso (or Vell) can read; copies **Claw Hand-Cant** (`cant`): free.
- **Items:** `b8_c6_guildbow` (weapon, ranged, a crossbow: add it to `SOAK_PIERCE_ITEMS` from your file), `b8_c6_wallstone` (trinket).
- **Reading:** a doorstep in the Gadrobi streets. **Fire:** `b8_c6_fire`.
- **Hard limits:** the street of Rake's death; the Ravens; the Dassembrae; the Hounds' fight over the body; Envy and Spite; the gaol; the Temple of Shadow; the Noms' roofs; Coll's estate and the Finnest House; Challice's tower (headline: "a councillor's widow fell"); Hood's beheading; Dragnipur; **no Hound dies at the Fourth's hands** (rule 14). The moon: never why (rule 81).
- **Vision:** Karsa at the broken wall (§9.6).
- **Art:** `b8_wall_night`; the Hound's passing.

## Chapter 7: "The Toll" (`147`, keys `daru` | `coral` | `east`)

- **Spine** (correction 2): the morning after. **Darujhistan stops.** Brood carries Rake on an ox cart to a barrow outside the city, tens of thousands following; **the Fourth walk at the far back**, never see the barrow sealed, see no Andii. **The city's bells toll for Rake**, and under them the plan's **bell for every soldier**.
- **The squad's story:**
  - The Contract cools if the knives went down (`b8Con(-2, 'the Guild has counted enough')` when `b8_c6_knivesDown`); whoever is left on the roofs (`b8Roofs(7)`; `b8_c7_roofs`, optional, `guild:true`) and looters (`b8_c7_looters`; `b8_bravo`).
  - **Tufty** rumour (callback 5). **The Guardian** at the crowd's back (callback 8). Brisk's god is **the Guardians of the Gate**.
  - The bell for every soldier: the Fourth's own toll, Ohl's list read or not.
- **Keys `b8_c7_key`:** `daru`, `coral` (reads `b8_c3_key`; Edrem), `east`.
- **The finale:** a fate page per squadmate, the road, the Contract at the end, *Where the books meet*. Then 37's end page (coda with the Fete echo, the dead, credit to Steven Erikson and Ian C. Esslemont).
- **Trick:** *The Toll Count* (`b8_c7_toll`), counting the bells the way soldiers count; copies **the Lady's Pull** (`pull`): chapter charges.
- **Items:** `b8_c7_bell` (trinket: a small bell), `b8_c7_mourningband` (trinket).
- **Reading:** the shingle by the lake. **Fire:** `b8_c7_fire`.
- **Hard limits:** Rake's barrow (the crowd's back only), Brood's hammer, Dragnipur ("the black sword is gone" at most, rule 76); never Whiskeyjack's name (rule 75); never Nimander, the Gate of Darkness, Mother Dark by name (Tuft: "a cold that turns warm", rule 11); Cutter's destination (rule 82); Kallor's road (rule 83); OST's ground (rule 80).
- **Vision:** Iskar Jarak at the head of the dead (§9.7).
- **Art:** `b8_morning`, `b8_lakeshore`.

## Machine limits

- One browser at a time for every Playwright test.
- `play.mjs --book=tth` skips cleanly until a chapter registers; the shelf shows Book Eight once one does.
- `index.html` is built, never committed by a chapter.
- The Contract's numbers, the engine's own moves and the roofs table are the engine's; a chapter moves the Contract only where this brief says.
