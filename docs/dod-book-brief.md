Mon Nov 9, 2026, 6:31 PM PST. Against the Book Nine engine on branch `book9` (from v11.0.1; v12.0.0 not shipped). The standing work order for every chapter of Book Nine, *Dust on the Boots*, beside *Dust of Dreams*.

# Book Nine: *Dust on the Boots*, the book brief (Chapters 1–7)

- **Plan:** `docs/book9-dod-plan.md`. **Every "Settled" block binds** (David, Nov 9: two squads taking turns, the Third in Ch 1/3/5/7 and the Letherii in Ch 2/4/6; Rations with a little Witness; the mortal fight is the Third's Ch 7, the rearguard into the dark; the Letherii's Ch 6 is the battle's day on their own stretch of line, hard but **not** mortal, their road chosen at dusk; the Third 19 cap 24, the Letherii 11 cap 16; the title). Its Claude's calls stand until David overturns them.
- **Canon:** `docs/dod-canon.md`. **Its corrections 1–8, the chapter table ("The seven chapters, fixed"), §3, §4 (hard limits), §7 and `docs/series-canon.md` §(a) rules 1–97 are binding.** Rules 84–97 are Book Nine's own (summarised where they bite, below).
- **Engine:** `docs/v12.0-notes.md`, and `src/160_book9.js`, `src/160b_b9_title.js`, `src/160c_b9_read.js`. **The v10.2 and v10.3 rules hold** (`docs/v10.2-notes.md`, `docs/v10.3-notes.md`).

**How the chapters are built.** One writer-and-artist agent per chapter, **one at a time** (David, Nov 4), in order. No writer needs another's chapter: this brief fixes every key, flag, item id, trick, fight id, recruit join point, reading place, fire, Rations anchor and Witness beat in advance. Honour it exactly.
- Read earlier chapters' flags **always with a sensible default when one is unset** (a `--from=K` save sets keys only; `B9KEY0` holds the defaults).
- Invent nothing a later chapter would need. If you must, put it in your notes.
- If the engine can't do something here, follow the engine, say so in your notes, and tell the lead.

## The owner's standing wishes (David; every chapter, no exceptions)

- **A reading** (the Deck for the Third, the Tiles for the Letherii) with a vision through canon eyes (the reading is yours; the vision is the visions pass's, dod-canon §9).
- **A trick** behind an optional ✦ hard check (DC 19 for the Third, DC 18 for the Letherii), lore-based: the check names what the squad knows.
- **Two to four new items, each with artwork.**
- **A key choice** with consequences later (the keys below).
- **Every onward step declinable** ("Not now").
- **A scene-fitting "yes, but"** on every check (`near:{t:'Yes, but …', fx}`); silver or docks only where money is the scene. In this book a "yes, but" may cost one ration (`b9Ration(-1, '…')`), at most once a chapter.
- **Short paragraphs, dry soldier humour, no exclamation marks in narration**; the sergeant in second person, never gendered (`{sgt}` for the name).
- **Nothing lurid; the darkest canon is headline only.** Hunger is felt, never dwelt on; the dead of the battle are news, never close.
- **No combat rounds or turns in story text.**
- **Backgrounds match the dialogue** (place, time, who is present).
- **Recruits acknowledged** when present (the fire, the key, the chapter's end and their own scenes, behind `b9In(id)`).
- **Never a Burn's Sleep year, never a count of weeks or months** ("weeks", "months"). Never the never-use names (series-canon rule 13).

## Shared rules (writers)

**Read first, in order:**
1. `docs/dod-canon.md` whole, then `docs/series-canon.md` §(a). In short:
   - **The squads live in the gaps.** Never in a scene canon names (§4), never speaking with anyone on §4's "never speaks with" list; any of them may be seen at a distance or heard through a tent wall. A Malazan drill sergeant, a heavy corporal, a sutler, a Letherii clerk and a Bolkando trader are the game's own people.
   - **Rule 84:** "Kolanse" may be said; never what waits there, never Sinter's guess. Tavore is never a viewpoint, and no speech of hers is heard (correction 5): the Witness beats lean on sergeants and officers.
   - **Rule 85: the Glass Desert is TCG's.** Never its name, its crossing, the water running out, drinking blood or urine, Blistig's barrels, Pores stabbed, Bugg's dagger used. **Rations bite as short rations, fever, foul water and hoarding** (correction 2), never death by thirst.
   - **Rule 86:** Keneb's death is known as news. Quick Ben, Bottle and Ruthan Gudd are "missing" at most. Tavore "was carried".
   - **Rule 87:** never the Forkrul Assail, Akhrast Korvalain, the Pures. The east has "a drought".
   - **Rule 88:** narration says **"the short-tails"**. "K'Chain" only in a mage's mouth, once in the book. Never the Che'Malle's side, the Matron, Kalyth, Gu'Rull outside the vision, or the second battle.
   - **Rule 89:** Tool and the Barghast are headline. The Barghast war on the Akryn may be news. **A Barghast in the game never names her clan.**
   - **Rule 90–91:** Gesler and Stormy "taken in the night"; Sinn and Grub "gone off on their own", at most.
   - **Rule 92:** the Reading is seen from the street. **Rule 93:** Hedge's company is never joined; never "Bridgeburners" for either squad (rule 12). **Rule 94:** the Perish, Khundryl and Bolkando march to join; the Khundryl charge is seen far off at most. **Rule 95–96:** never the Elders, Hood's throne, the Shake's road. **Rule 97:** the Letherii's part in the battle is the game's, on ground canon doesn't name; Brys "lives" and is seen far off, never acting.
   - **Kalam is not in Book Nine** (rule 45).
2. `docs/v12.0-notes.md`, the engine. **Use only names that exist in `src/160*`.**
3. `docs/rg-book-brief.md` §"Shared rules (writers)" (the two-squad rules) and `docs/tth-book-brief.md` §"Shared rules (writers)": everything there holds unless this brief changes it.
4. **Conventions from shipped chapters:** skim `src/121_b7_ch1.js` and `src/122_b7_ch2.js` (the two squads' voices and the swap) and `src/141_b8_ch1.js` (the newest patterns) for nodes, areas, fights, checks, `again:`, "Not now" and "yes, but". A trick check is `check:['wits', 19], trick:'<id>', edges:id=>[…]`.
5. The engine files: `016` (`talk`, `check`, edges, the backing-up edge), `016b` and `031b` (tricks), `031c` (`stage2`, waves, hold-outs, `mortal`, soak, wards, death checks), `989` (v10.3 free and passive tricks), `014` (`registerChapter`), `038c` (`ROSTER_FIRES`, gear roles).

**Voice.**
- **The Third's chapters** sound like Book Seven's Third, older and further from home: Malazan heavies on a march nobody has explained, munitions counted, Hood's name in an oath that nobody answers any more. The heavies' own humour is slower and flatter than the marines'. **"Bonehunters"** may be said by soldiers, at most once a chapter; never by the narrator as the army's name.
- **The Letherii's chapters** sound like Book Seven's Letherii, out of the city: everything still counted (the ration book, the wagons, the docks nobody can spend out here), a new freedom nobody quite trusts, and the Wastes as a place Letheras has legends about and no maps for.
- **The Wastes** are dry grass, bare stone, a sky too big for the land, and very little that moves. Dust is in everything.
- **The trope budgets bind from the first line** (table below). Run `node tools/trope_scan.mjs --files` before reporting; `trope_scan` knows Book Nine as `B9` (files 160–179).

**The squads.**
- **Chapters 1, 3, 5, 7: the Third** (`B9_CH`, thread `'t'`), marching with the Bonehunters' marines and heavies. The sergeant is Book Four's with Book Nine's history (`B9_SGT.t`), Book Two's look, Treach's. Core `haddat`, `sathi`, `tangle`, `marrow`; **Sathi is dead on a fresh start**, and Mirrel walks. A Book Seven transfer may bring `doss`, `wenna`, `mehet`, `ottar` and Book Four's spares; any of them may be dead. Book Nine's recruits for this squad: **`brask` (Ch 1), `tegra` (Ch 5)**.
- **Chapters 2, 4, 6: the Letherii** (thread `'l'`), the Sixth Company in Brys's escort. The sergeant is Book Five's with Book Nine's history (`B9_SGT.l`), Book Five's look, the Errant's. Core `tobet`, `thegg`, `perrit`, `ammet`. A transfer may bring `ilsa`, `sorvan`, `ruuk`, `brune`, `pessa`; any may be dead. Recruits: **`brennet` (Ch 2), `kaedra` (Ch 4)**. Book Five's hands hold (Ammet's surgery, Perrit's sorcery of the Holds, in Lether's words). **No munitions.**
- **Write only your squad.** Guard every squadmate with `b9In(id)`. Never count heads in words without checking. The other squad gets **one line of news a chapter at most**, as camp talk; `b9OtherName()` at most once, never in person. **The two squads never meet and never cross blades**; in Ch 6 and 7 they are on different ground of the same battle.

**Your files.**
- `src/16K_b9_chK.js` exports **`B9CHK`** (Ch1 = `161_b9_ch1.js`/`B9CH1` … Ch7 = `167_b9_ch7.js`/`B9CH7`). `src/990` already registers it. `number:'One'` and so on; titles from `B9CH` (*Letheras, Emptied*, *The Escort*, *The Road East*, *The Ration Book*, *Short Rations*, *Dust on the Horizon*, *The Rearguard*).
- Your art goes in `src/16Kb_b9_chK_art.js`.
- **Every id carries `b9_c<K>_`** (nodes, areas, fights, foes, items, scenes, flags, tricks). Shared flags named in this brief have no chapter infix and are set only where this brief says. **Every top-level helper carries `b9<K>`** (`b91Say`, `b94Who`…).
- Never edit `src/160*`, another chapter's files, or Books One to Eight's files. Add your fire from your file: `ROSTER_FIRES.dod = ROSTER_FIRES.dod || {}; ROSTER_FIRES.dod[K] = ['b9_cK_fire']`. Give each item its role on the item.
- The visions are `168`/`168b`, the games `169`, any extra kit `170`–`179`. Not yours.

**Size and levels.**
- 60–80 nodes, three or four areas (16×12), three or four fights, each main fight with a `stage2`.
- **Each squad keeps its own levels** (`lvCap()` reads `S.thread`):
  - **The Third: fresh 19, cap 24.** About 20 after Ch 1, 21 after Ch 3, 22 after Ch 5. About 400 xp a chapter (a level is 330).
  - **The Letherii: fresh 11, cap 16.** About 12 after Ch 2, 13 after Ch 4. About 400 xp a chapter. Veteran picks at 13 and 15.
  - `play.mjs --book=dod --from=K` and `balance.mjs --book=dod` use the Third **19, 20, 21, 22** at Ch 1, 3, 5, 7 and the Letherii **11, 12, 13** at Ch 2, 4, 6.
- **Foes:** the engine's `b9_` foes (v12.0-notes §Foes). **The Third's** (19–24): `b9_deserter`, `b9_deserterbow`, `b9_desertercap`, `b9_raider`, `b9_raiderchief`, `b9_dog`, `b9_bhederin`, `b9_nahruk`, `b9_nahrukcaster`, `b9_nahrukbrute`. **The Letherii's** (11–16): `b9_lraider`, `b9_lraiderbow`, `b9_lraiderchief`, `b9_lbarghast`, `b9_lbarghastchief`, `b9_ldog`, `b9_lnahruk`, `b9_lnahrukcaster`, `b9_lnahrukbrute`. Allies: `b9_heavy` (the Third), `b9_escort`, `b9_bluerose` (the Letherii). Add your own with a `kind:` that has a sprite.
- **The short-tails** appear **only in Ch 6 and Ch 7** (the battle). Before that, the far dust at most. Barghast skirmishers **only in Ch 4** (beside the road, the war with the Akryn).
- **Design fights with v10.2 from the start:** heavies soak (Brask 1; the short-tails 1–2 plus a hide): give the squad crossbows, sorcery, munitions (the Third only: **cussers tear the short-tails open, sharpers and burners are half spent on them**) and flanks as answers. The short-tail sorcerers' blows are sorcery. **Death checks run in every fight but the mortal one.**
- **Hunger is in the fights:** a squad on short rations starts each fight with less health (5/10/15%). Check yours at 5 (`fed`, the harness's default) and say in your notes what 3 and 1 do.
- **Balance is a later step that goes to David** (`B9GAP`, `B9SOLDIER` are empty on purpose). Check your fights with `tools/balance.mjs --book=dod` (a scratch `--patch`); write the numbers in your notes. Targets (Nov 6): Soldier about 90% first try (the first fight of the book and each squad's first, and every survive fight, near 100%); Bridgeburner 75–80%, none under 60%.

**Tricks (v10.3).**
- **A trick that doesn't strike or take a foe's turn is free** (`free:true` on its `AB`, and its words end "It does not use the action (one free trick a turn)."). One free trick per squadmate per turn.
- **Group heals stay a full turn.**
- **A passive** (`passive:true`) must be listed in `V103_PASSIVE` in `src/989_v103_tricks.js`; Ch 4's is already there (`b9_c4_spoor`).
- **Wards:** only a heal aimed at one squadmate leaves a ward (`healW(u, n)`). Plain `heal()` leaves none.
- Earn it with `earnTrick('<id>', who)`; skills and spells grow with level, munitions never do.

**The key choice** is `S.f.b9_cK_key`, with the values in `B9KEYS[K]` (don't change them). Pass it to `chapterEnd(K, key)`, with an `end` entry for each value. **The other squad's keys are readable** (both live in `S.f`), as rumour only.

**Rations** (the book's main system; v12.0-notes §Rations). Each squad's own number, 0–10, starting at 6.
- **Move it** with `b9Ration(n, why)` only where your section says, plus **at most ±1 for a scene of your own** (a find, a theft, a share) and the one "yes, but". **The engine moves it too:** the march, at your chapter's start (−2 in Ch 3–5, −1 in Ch 6–7).
- **Read it** with `b9Rations()`, `b9RatTier()`, `b9Hungry()`.
- **Checks where food and water matter** (foraging, bargaining for stores, keeping the sick going, a long carry) carry `rations:true` (the engine adds "Rations", +1 to −3). The engine already gives "An empty belly" −1 to every check when the squad is hungry: don't add your own.
- Show `rationsHTML()` at the fire and the key. Hunger is said plainly and briefly: thin stew, belts on a new hole, a squadmate giving half a biscuit away. Never starving bodies, never cannibalism, never thirst unto death (rule 85).

**Witness** (light; v12.0-notes §Witness). One beat in your chapter if your section names one (Ch 3–7): a moment at the fire or in the key scene where the squad says what it still marches for. Record it with `b9Wit('kept' | 'doubt', why)`: **one choice, two or three answers, each mapping to one value**; always a "Not now" that records nothing. A check where conviction matters may carry `witness:true` ("Our own witness", ±1). **Never a speech by Tavore the squad hears**; a sergeant's or an officer's words at most, and the RG line ("We shall be our own witness") only as something soldiers repeat. Ch 6 and Ch 7 read `b9Faith()`.

**The readings** (`160c`; one API for both squads): fill `B9READ[K]` `{scene, where, set, back, backT, say:{…}}`; put `b9ReadChoice(K)` among the first halt's choices; register `b9_cK_read: () => b9ReadOffer(K)` and `b9_cK_card: () => b9ReadCard(K)`. The Third's readers are `marrow`, `tallow`, `oldninth` (**the old marine** of the heavies' lines); the Letherii's `perrit`, `tilewoman` (**she rides the escort's supply train**). Write a `say` line for each of your squad's readers. The card and tile lines are done (`B9SAY`, `B9SAY_L`). **The rule from v10.0.2:** if you write any helper that asks which squad is playing, ask before `b9As` switches the book (`b9As(t => …)` hands you the squad).

**Kit.** The item ids given (`CH.gear`), each with `slot`, `role`, `line` (no numbers in a line). At least one with a real number (at the Third's levels an item must matter). **Every item has artwork** (`ART['item/<key>']`) on **Book Nine's ground: dusk dust-brown (#4a3c2c → #140f0a), a low warm rim light**, 200×150, as Book Eight's.

**Squad lines.** Branch by roller, always with a `_` default. Edges favour the right hand:
- the Third: Haddat (shields, holding, the old god nobody answers for), Tangle (munitions, sapping, counting what's left), Marrow (healing, the Deck, Soliel), Mirrel (wounds, herbs, fever), Mehet (streets, cisterns), Ottar (the shield wall), Doss (fields, the Indebted, food), Wenna (tracks, water), **Brask** (the heavies' line, holding, heavy kit), **Tegra** (the plains, water-lore, the Barghast, the ground);
- the Letherii: Tobet (the bow, the Indebted), Thegg (strength, standing), Perrit (the Holds, sums), Ammet (wounds, calm), Ilsa (files, reading people), Sorvan (horses, Bluerose), Ruuk, Brune, Pessa as before, **Brennet** (wagons, oxen, the train, the new freedom), **Kaedra** (spoor, the border, the Bolkando, the bow).
- **The recruit rule** (Book Five's): a recruit walking gets a line at the fire, at the key, at the chapter's end and in their own scenes, behind `b9In(id)`. `recruit_scan` knows Book Nine (files 160–179). **Each recruit joins early in their chapter** (first or second halt), so the chapter can use them.

**The fire.** Your fire id is in your section; the games pass wraps it, so keep it exactly. It offers the roster (the engine adds it), a rest (`rest()`), the squad's talk, `rationsHTML()`, the Witness beat where your section has it, and the way on with "Not now".

**Recurring inventions** (shared; use them, don't contradict them):
- **The Third's officer** is the captain of the heavies' company it marches with, unnamed ("the captain"). **Thallo**, a corporal of the heavies, is the Third's link to the company: the drill-sergeant's man, blunt, hungry, decent. Named Bonehunters (Fiddler, Hedge, Keneb, Blistig, the Adjunct…) are seen at a distance only.
- **The Letherii's officer** is still **Finadd Ravel Ennic** (`B5_FINADD`), older. **Yelt** keeps the brigade's ration book; **Orla** (she) drives a water-cart; **Saffa** (she) is the field cook. Brys is "the Commander", seen far off.
- **Harro** is a Malazan sutler following the column (Ch 3, 5). **Duvo** is an Akrynnai horse-trader met on the road east (Ch 3 only).
- **No other new named people.** Everyone else is unnamed by role. A writer who truly needs a name runs the series check (`series-canon.md` §(b)) first and records the row. Never a new "-dict" name, never a new Henar, never a brigade called "Chancel".
- **Money:** the Third counts silver; the Letherii count docks (`b9Coin(n)` says which). Debt is flavour only (as Book Seven): don't call `b5Owe`, `b5Pay` or `b5Forgive`.
- **Munitions:** the Third has the column's issue, and it is running low (W *Hedge*); Lether has none. Never Bavedict's "kittens".
- **The far dust:** from Ch 5 a soldier may notice dust on the horizon that is not the column's, once. It is the short-tails in Ch 6 and 7. Never earlier than Ch 5.
- **Rumours allowed** (one a chapter at most): "a Malazan ghost is recruiting" (Hedge, Ch 2); "two sergeants gone in the night" (Ch 5); "the girl and the boy have gone off on their own" (Sinn and Grub, Ch 3 at the earliest); the Barghast at war with the Akryn (Ch 3–4); "the Fist is dead" (Ch 7 only).

**Engine changes** go in your own file, guarded by `b9On()` (and `b9L()` / `b9Third()`), under a `b9<K>` name, and are reported to the lead. Never edit `src/160*`.

**Continuity.** Write `docs/dod-chK-notes.md`: the key values and what each changes; every flag later chapters may read, with its values; the Rations moves, with numbers; the Witness beat; the named inventions; anything left open on purpose; canon points you were unsure of; fights' xp and balance numbers.

**Tests** (all must pass): `python3 build.py`; `node --check` on your files; `node tools/lint.mjs` with 0 errors; `node tools/play.mjs 3 --book=dod --from=K` 3/3 and `node tools/play.mjs 1` 1/1; `repeat_scan`, `trope_test`, `recruit_test`, `b9engine_test`, `roster_test`, `reading_test`; and **a chapter test `tools/b9chK_test.mjs`**: halts, every key (three in Ch 7), every fight's start and win, the trick, the fire, the reading, the recruit's join, the Rations moves and the Witness beat your section names, from a fresh state and from the `--from=K` save. One browser at a time.

**Commit to `book9`**, never `main`. Don't touch `sw.js` or `src/010_preamble.js`.

**Report** (under 500 words): areas, nodes, fights and xp, the key and its consequences, the Rations moves, the Witness beat, the flags set, file sizes, test numbers, any edits outside your files, the canon points you were unsure of.

## Shared rules (artists)

**Your file:** `src/16Kb_b9_chK_art.js`: figures, ground, backdrops and item art. Match the established art in scale, palette, line weight and light. Study `src/160b_b9_title.js` (this book's palette: dust-brown land, a pale tired sky, low warm light), Book Seven's chapter art (`121b`–`127b`: the Third and the Letherii, Letheras) and Book Four's desert (`071b`–`077b`) for open dry country.

**Book Nine's look.**
- **Letheras** (Ch 1, 2): Book Seven's city, emptied and quiet: shutters closed, barracks dark, the muster ground and the supply train under lamps.
- **The road and the Wastes** (Ch 3–7): the last farms, then dry grass and bare stone under a sky too big for it; the column as a long thin line with its own dust; camps of tents and drawn-in wagons; dung-fires. **The battle** (Ch 6, 7): dust, smoke, shields, shapes in the dust taller than any soldier; **the short-tails are drawn tall, armoured, tailless or short-tailed, dark plate, never in gory close-up**. Ch 7 ends in the dark, lit by what burns, and a grey morning on the retreat trail.

**Hooks:** `FIGX[kind]`, `POR[id]`, `TILEX[style]`, `SCENEX[kind]` (with `sceneLayer` caching and `REDUCE()` respected), `ART['item/<key>']`.

**Replace your placeholder backdrops** (`B9_SCENE_LIKE` in `160`): `SCENEX.b9_… = …` in your art file. Your section says which are yours.

**Figures:** `brask`, `tegra`, `brennet` and `kaedra` have simple sprites in `160` and busts in `160b`: Ch 1's artist replaces `FIGX.brask`, Ch 2's `FIGX.brennet`, Ch 4's `FIGX.kaedra`, Ch 5's `FIGX.tegra` (keep the busts' kit: Brask's doubled scale, bent cheek-guards, heavy sword over the shoulder; Tegra's two white bars under the eyes, the braid, the bone string, the throwing-axe; Brennet's studded apron, padded cap, wagon-pin; Kaedra's dun coat with grass at the shoulders, the blue bead, the horn bow). **Ch 6's artist draws the kind `b9_nahruk`** (the short-tail body) and Ch 6's foes may switch `kind` to it from their own file; until then they borrow `khell`. **Bust rules:** each its own neckline by kit, a short natural neck, the garment blending up into the shoulders, every prop held, slung or belted.

**Look at your work** at phone width (390×844). **Limits and tone:** under about 150 KB. The battle, the far dust, the Khundryl's charge (Ch 7, far off at most) and the field after are drawn at a distance. No bodies in close-up, ever. Finish with `python3 build.py`, `node --check`, `node tools/lint.mjs`.

## The trope budgets (`tools/trope_scan.mjs`; per 10,000 words of a book's prose, or a hard cap on the book)

| Family | Budget |
|---|---|
| "weather" (as if it were weather…) | cap 3 |
| "the way a man / you'd / one…" simile | 5 per 10k |
| the silence beat (says nothing / doesn't look at / nobody says) | 9 per 10k |
| sentences opening on Nobody / Somebody | 14 per 10k |
| "for a long time / a long moment" | 3 per 10k |
| "which is how you know" | 1 per 10k |
| "as if it were" | 1.5 per 10k |
| "a man who has" / "the face of a man who" | 1.5 per 10k |
| "her / his eyes stay on…" | 0.6 per 10k |
| "shield across her knees", "the edge of the light", "hands are cold" | cap 8 each |
| "the regiment voice", "still counting heads" | cap 4 each |
| "a pause you could fit a knife into", "goes unsaid", "without anything in it" | cap 2 each |

The engine and readers already spend 1 "the way" and 4 "Nobody/Somebody" openings. Run `node tools/trope_scan.mjs --hits=16K_b9_chK.js` for your own hits.

---

## The keys, and who reads them

| Ch | Squad | Key | Values (default first, `B9KEY0`) | What it changes | Read by |
|---|---|---|---|---|---|
| 1 | Third | `b9_c1_key` (the last night) | `stores` / `street` | `stores`: stand the night watch over the heavies' stores in the emptied barracks: `b9Ration(2, 'the stores counted twice')`. `street`: go out into the quarter where the dead stirred and help a household; Haddat and Marrow loyalty +1; `S.f.b9_c1_street = 1` | Ch 3 (a line), Ch 7 (fate pages) |
| 2 | Letherii | `b9_c2_key` (the muster) | `wagons` / `drill` | `wagons`: load the train honestly with Yelt and Orla: `b9Ration(2, 'the wagons loaded true')`. `drill`: go back to the Malazan sergeant for more: Thegg loyalty +1, `S.f.b9_c2_drilled = 1` | Ch 4 (Yelt), Ch 6 (`drilled`: +2 edge on the line check) |
| 3 | Third | `b9_c3_key` (the fever) | `boil` / `press` | `boil`: stop and boil everything, slow: `b9Ration(-1, 'fuel and time')`; the sick squadmate's fever breaks (clear it). `press`: keep the column's pace and trust the cure: `b9Ration(1, 'kept our place at the wagons')`; the sick squadmate carries the fever to the fire | Ch 5 (a line; `S.f.b9_c3_sick`) |
| 4 | Letherii | `b9_c4_key` (the ration book) | `book` / `forage` | `book`: keep the ration book honest with Yelt: `b9Ration(1, 'an honest count')`, `S.f.b9_c4_book = 1`. `forage`: ride out with Kaedra and the Bluerose outriders: `b9Ration(3, 'game, and a little water')`, the forage fight (`b9_c4_forage`), Kaedra loyalty +1 | Ch 6 (`book`: the train holds where it should) |
| 5 | Third | `b9_c5_key` (the cache) | `share` / `keep` | A dead sutler's hidden cache. `share`: into the company's pot: no ration move, Brask and Haddat loyalty +1, `S.f.b9_c5_shared = 1`. `keep`: the squad's own: `b9Ration(2, 'what the squad kept')`, Tegra loyalty +1, Haddat −1 | Ch 7 (a line; fate pages) |
| 6 | Letherii | `b9_c6_key` (the battle's day) | `line` / `train` | `line`: hold the escort's stretch of the line (`b9_c6_line`). `train`: hold the supply wagons at the line's back (`b9_c6_train`): `b9Ration(2, 'the wagons came through')` | Ch 7 (one line of news) |
| 6 | Letherii | `S.f.b9_lethRoad` (at dusk) | `escort` / `adjunct` / `home` (`B9_LETHROADS`) | `escort`: stay with Brys's brigades (canon's road: south along the coast in TCG; never said). `adjunct`: go on with the Malazans into the east. `home`: back to Lether when the escort turns. Reads `b9Faith('l')` (a `doubt` squad finds `home` easier said) | Ch 7's finale (one line), Book Ten |
| 7 | Third | `b9_c7_key` (the roads) | `adjunct` / `south` / `home` | `adjunct`: stay with the army into the east (canon's road for the Bonehunters; never the Glass Desert by name). `south`: go with the Letherii and the allies' column south toward Kolanse's coast. `home`: time served, walk back west. Reads `b9Faith('t')` | the finale; Book Ten |

**Shared flags** (set only where named): `b9_c1_street`, `b9_c2_drilled`, `b9_c3_sick` (the fevered squadmate's id), `b9_c4_book`, `b9_c5_shared`, `b9_c6_trainHeld`, `b9_lethRoad`. Engine: `b9_braskDone`, `b9_tegraDone`, `b9_brennetDone`, `b9_kaedraDone`, `b9_march3`…`b9_march7`; Witness in `S.b9.wit` (`c3`…`c7`).

## Where Rations move (each squad its own, both starting at 6)

| Ch | Squad | Engine | The key | Other anchors (writer, fixed) | Expected after |
|---|---|---|---|---|---|
| 1 | Third | — | `stores` +2 | none | 6–8 |
| 2 | Letherii | — | `wagons` +2 | none | 6–8 |
| 3 | Third | −2 (the march) | `boil` −1 / `press` +1 | the fever; Duvo's horse-meat or a farm's last stores **+1** (a `rations:true` check) | 4–8 |
| 4 | Letherii | −2 | `book` +1 / `forage` +3 | thin game (R10): a hunt check **+1** | 5–10 |
| 5 | Third | −2 | `keep` +2 / `share` 0 | the maddened bhederin, if killed, **+2**; short rations named at the fire | 1–8 |
| 6 | Letherii | −1 | `train` +2 / `line` 0 | none (the battle) | 4–10 |
| 7 | Third | −1 | — | the retreat: nothing found; the days after: the column's pot **+1** before the finale | 0–8 |

So a squad that took every lean road reaches its last fight around 2–4 (`hungry` or `short`), a careful one around 6–8. Never set Rations directly.

## The Witness beats

| Ch | Squad | Where | The question | Answers (each `kept` or `doubt`) |
|---|---|---|---|---|
| 3 | Third | the fever-fire, after Thallo passes on what the sergeants said ("surviving isn't what this is about", secondhand; never Fiddler's meeting) | "What are we marching for?" | the squad (kept) / the Adjunct's word (kept) / "the column's going, so we go" (doubt) |
| 4 | Letherii | the train's fire, Yelt's ledger closed | what Lether sent them out here for | each other (kept) / the Commander, who asked for them (kept) / the pay, if any (doubt) |
| 5 | Third | the dung-fire under the stars, on short rations | the same, harder | "our own witness" (kept) / nothing, and say it (doubt) |
| 6 | Letherii | dusk, the road chosen | before the road | kept / doubt as the road's words fall |
| 7 | Third | before the dark, in the rearguard | the last time | kept / doubt |

## The fires and the readings

| Ch | Squad | Fire | Reading place (`dod:K`) | Lean card or tile (`B9POOL[K]`) |
|---|---|---|---|---|
| 1 | Third | `b9_c1_fire` (the emptied barracks yard) | a kit-crate in the yard (`B9READ[1]` filled) | the Herald |
| 2 | Letherii | `b9_c2_fire` (the escort's muster ground) | a supply wagon's tailboard (`B9READ[2]` filled) | the Walker |
| 3 | Third | `b9_c3_fire` (a fever-fire by the road east) | a stone by the road | the Queen of High House Life |
| 4 | Letherii | `b9_c4_fire` (the train's wagons drawn in) | a ration crate at dusk | the Hunter |
| 5 | Third | `b9_c5_fire` (a dung-fire under the stars) | bare ground | the Obelisk |
| 6 | Letherii | `b9_c6_fire` (the escort's line at dawn) | a shield on the plain | the Wall |
| 7 | Third | `b9_c7_fire` (the retreat camp, days after) | the plain after dark | the Soldier of High House Death |

---

## Chapter 1: "Letheras, Emptied" (`161`, the Third, key `stores` | `street`)

- **Spine** (correction 8; canon sheet chapter table): Letheras, the night of the Reading and the days after; months after RG. Nearly every soldier has left the barracks before the Reading (WC3). The Third stays in, or goes out into the emptied city that night: **a dead thing that gets up** (a dead dray-horse in a stable yard lifting its head and standing, then nothing more: told in two lines, never lurid), **a roof going in far off**. The days after: the heavies muster for the march.
- **The squad's story:**
  - **Brask joins at the first halt** (`b9Join('brask')`): the clerks' list folds him into the Third; his old squad's tally-stick.
  - **Looters** in the emptied quarter (`b9_c1_looters`, main, `stage2`; **the book's first fight: near 100%**; your own looter foe `b9_c1_looter` on a `b5_letherii` body ×3, `b9_deserterbow`; stage 2 `b9_desertercap`).
  - On `stores`: **thieves at the stores** in the night (`b9_c1_stores`; `b9_deserter` ×2, `b9_raider`). Optional: **a tavern brawl** with Letherii veterans (`b9_c1_brawl`, optional, non-lethal in words).
  - **Thallo** introduced; the heavies' captain seen.
- **Key `b9_c1_key`:** see the keys table.
- **Trick:** *The Roll at the Gate* (`b9_c1_rollcall`), the heavies' muster call, every name answered; copies **The Line** (`line`): free. The ✦ check (wits, DC 19) names Book Four's Gate Drill or the Fourteenth's musters.
- **Items:** `b9_c1_heavyscale` (armour, mail, a real number), `b9_c1_messtin` (trinket: a mess-tin stamped with the 9th), `b9_c1_gutterknife` (weapon, blade).
- **Reading:** `B9READ[1]` is filled (back `b9_c1_fire`). **Fire:** `b9_c1_fire`. **Rations:** start 6; `stores` +2.
- **Hard limits:** the Reading's room, the burst inn, the Errant and Brys, Ublala (rule 92); Seren's house and the old gods; the Azath and Sinn and Grub; the palace council; Tarr and Cuttle's drill; Hedge's recruits; Keneb and Blistig's tavern. Kalam never.
- **Vision:** Fiddler dealing the Deck (§9.1).
- **Art:** `b9_letheras_night`, `b9_barracks`; the figure `brask`.

## Chapter 2: "The Escort" (`162`, the Letherii, key `wagons` | `drill`)

- **Spine** (correction 6): Letheras, the same weeks; the escort mustered; Brys's reshaping (R11 S8) headline; drilled by **an unnamed Malazan sergeant of the heavies** (never Tarr or Cuttle, never Fiddler); the supply train loaded; out of the city behind the Bonehunters.
- **The squad's story:**
  - **The drill** (`b9_c2_drill`, survive 4 rounds, **the Letherii's first fight: near 100%**; your own sparring heavies `b9_c2_sparrer` on a `b2soldier` body, wooden swords, low damage): the Malazans needle them about their losses; the squad is marched to exhaustion.
  - **Brennet joins at the wagons** (first or second halt; `b9Join('brennet')`). **Yelt**, **Orla**, **Saffa**.
  - **Thieves in the train's yard** at night (`b9_c2_wagons`, main, `stage2`; `b9_lraider` ×2, `b9_lraiderbow`; stage 2 `b9_lraiderchief`; city thieves in words).
  - A rumour: "a Malazan ghost is recruiting" (Hedge; one line).
- **Key `b9_c2_key`:** see the keys table.
- **Trick:** *The Malazan Step* (`b9_c2_step`), the heavies' drill, every man moving when the man beside him does; copies **The Gate Drill** (`b4_c1_gate`): free. ✦ DC 18.
- **Items:** `b9_c2_carterscoat` (armour, light), `b9_c2_tallystick` (trinket: Yelt's spare tally), `b9_c2_escortspear` (weapon, reach).
- **Reading:** `B9READ[2]` is filled (back `b9_c2_fire`). **Fire:** `b9_c2_fire`. **Rations:** start 6; `wagons` +2.
- **Hard limits:** Tarr and Cuttle's drill; Fiddler; Brys's tent and Henar; Hedge's company and Bavedict; the Akryn envoy; Tehol and the palace.
- **Vision:** Brys alone in his tent (§9.2).
- **Art:** `b9_muster`, `b9_wagons`; the figure `brennet`.

## Chapter 3: "The Road East" (`163`, the Third, key `boil` | `press`)

- **Spine:** the army departs (R11 S5); the road east to the Wastes' edge, "weeks"; **the fever** that has half the Malazans and **the Letherii water cure** (R11 S13: Brys's healers' cure works; the squad meets it through a Letherii healer, never Brys); the last farms; **Duvo** the Akrynnai horse-trader.
- **The squad's story:**
  - **The fever:** early in the chapter a squadmate falls sick: `S.f.b9_c3_sick = id` and `b9Fever(id)` (your choice of who, else `b9SickPick()`); the key decides it.
  - **Deserters in the last farm** (`b9_c3_farm`, main, `stage2`; `b9_deserter` ×3, `b9_deserterbow`; stage 2 `b9_desertercap`).
  - **Wastes dogs** at the fever-carts at night (`b9_c3_dogs`, optional; `b9_dog` ×4).
  - **Duvo** trades horse-meat or a knife (a `rations:true` check, +1 Rations). Raiders on his horses (`b9_c3_road`, optional; `b9_raider` ×3, `b9_raiderchief`).
  - **Harro** the sutler, selling dear.
  - **Witness beat** at the fever-fire (table above).
- **Key `b9_c3_key`:** see the keys table.
- **Trick:** *The Letherii Cure* (`b9_c3_cure`), what a Letherii healer shows the squad about boiling, salt and clean water; copies **Rhivi Spirit-Song** (`song`): a group heal, **a full turn**, no wards. ✦ DC 19 (wits; Mirrel's or Marrow's healing helps).
- **Items:** `b9_c3_akrynknife` (weapon, blade), `b9_c3_boilingpot` (trinket), `b9_c3_feverbark` (trinket).
- **Reading:** a stone by the road at the fever-fire. **Fire:** `b9_c3_fire`. **Rations:** −2 (engine); the key; Duvo +1.
- **Hard limits:** Fiddler's sergeants' meeting (R11 S10); Koryk; Bottle; Hedge's company; Ruthan Gudd going out; Bugg and Tehol's gift; the Akryn envoy; Sinn and Grub (rumour at most).
- **Vision:** Koryk with the fever (§9.3).
- **Art:** `b9_road_east`, `b9_column`.

## Chapter 4: "The Ration Book" (`164`, the Letherii, key `book` | `forage`)

- **Spine:** the escort's column into the Wastes; mages failing (R5; R19.2 S6: the soldiers nervous "because the Malazan mages have fallen", headline); thin game (R10 S1, S7); the Barghast–Akryn war beside the road (R11 S1), headline and one fight on `forage`.
- **The squad's story:**
  - **Kaedra joins** early (first or second halt; `b9Join('kaedra')`), off the Bolkando border.
  - **Yelt's ration book**: the count, the short barrels, the question of who has been taking.
  - **Raiders on the train** (`b9_c4_raid`, main, `stage2`; `b9_lraider` ×3, `b9_lraiderbow` ×2; stage 2 `b9_lraiderchief`): Bolkando-border raiders, never the Bolkando court.
  - On `forage`: **Barghast skirmishers** who claim the herd (`b9_c4_forage`; `b9_lbarghast` ×3, `b9_lbarghastchief`; never a clan name, rule 89).
  - **A bhederin stampede** (`b9_c4_herd`, survive 4 rounds; your own `b9_c4_bull` at Letherii scale; near 100%).
  - A hunt check (`rations:true`) +1. **Witness beat** at the train's fire.
- **Key `b9_c4_key`:** see the keys table.
- **Trick:** *Reading the Spoor* (`b9_c4_spoor`), Kaedra's border craft; copies **the Long Listen** (`b4_c6_listen`): **passive** (`passive:true`; already in `V103_PASSIVE`). ✦ DC 18.
- **Items:** `b9_c4_bluerosespear` (weapon, reach), `b9_c4_scoutcoat` (armour, light), `b9_c4_bonewhistle` (trinket).
- **Reading:** a ration crate at dusk. **Fire:** `b9_c4_fire`. **Rations:** −2 (engine); the key; the hunt +1.
- **Hard limits:** Brys and Aranict walking the camp (R19.2 S6); Henar; the Barghast camps, Tool, Hetan, Stolmen, Sekara; Setoc and the Wolves' child; the Akrynnai envoy; the Snake.
- **Vision:** Aranict (§9.4).
- **Art:** `b9_wastes`, `b9_camp_night`; the figure `kaedra`.

## Chapter 5: "Short Rations" (`165`, the Third, key `share` | `keep`)

- **Spine:** deep in the Wastes; short rations and the hoard (**the game's own: a dead sutler's hidden cache**, never Pores' wagon or the writ); "two sergeants gone in the night" (Gesler and Stormy, rumour only); desertion talk in the column (never Sinter's plan); the far dust once, at the chapter's end.
- **The squad's story:**
  - **Tegra joins** early (first or second halt; `b9Join('tegra')`): a guide who knows where the dry washes hold water.
  - **Deserters after the cache** (`b9_c5_cache`, main, `stage2`; `b9_deserter` ×2, `b9_raider` ×2; stage 2 `b9_desertercap`).
  - **A maddened bhederin** (`b9_c5_bull`, optional; `b9_bhederin`): if killed, +2 Rations.
  - **Wastes dogs** (`b9_c5_dogs`, optional; `b9_dog` ×4).
  - **Witness beat** at the dung-fire (the RG line repeated by a soldier, never by Tavore).
- **Key `b9_c5_key`:** see the keys table.
- **Trick:** *Our Own Witness* (`b9_c5_witness`), the sergeants' saying held to under short rations; copies **the Khundryl Paint** (`b2_paint`): free. The ✦ check (DC 19) carries `witness:true`.
- **Items:** `b9_c5_barghastaxe` (weapon), `b9_c5_sutlerspack` (trinket), `b9_c5_dustscarf` (trinket).
- **Reading:** bare ground under the stars. **Fire:** `b9_c5_fire`. **Rations:** −2 (engine); the key; the bull +2.
- **Hard limits:** Gesler and Stormy's torn tent and the Shi'gal; Keneb's ride; Blistig's talk; Pores' wagon and the "Neffarias Bredd" writ. **No Bredd rumour in Book Nine** (Claude's call: canon uses the name itself in DoD, R22 S14, so the running joke rests a book); Sinter, Kisswhere and Masan Gilani; Throatslitter; Kalyth and the Che'Malle.
- **Vision:** Keneb riding out to look at the Wastes (§9.5), or Sinter (the spare).
- **Art:** `b9_wastes_night`, `b9_dust`; the figure `tegra`.

## Chapter 6: "Dust on the Horizon" (`166`, the Letherii, key `line` | `train`; hard, **not** mortal)

- **Spine** (correction 1, fix A): the battle's day. "What looks like a dust-storm" on the horizon (WC23); the short-tails fall on the Bonehunters and their Letherii escort. **The escort's own stretch of line, by day**, on ground canon doesn't name (rule 97). At dusk the squad chooses its road while the Malazans' rearguard is still fighting far off.
- **The squad's story:**
  - Dawn: the line forms; the far dust comes on.
  - **The line** (`b9_c6_line`, main, `stage2`, **hard, not mortal: death checks run**; `b9_lnahruk` ×2, `b9_lnahrukcaster`; stage 2 `b9_lnahrukbrute`, `b9_lnahruk`; allies `b9_escort` ×2). `S.f.b9_c2_drilled` gives +2 on the line check before it.
  - On `train`: **hold the wagons** (`b9_c6_train`, survive 5; `b9_lnahruk` in waves; `S.f.b9_c6_trainHeld = 1` on a win). On `book` from Ch 4 the train is where it should be (an easier start).
  - **Dusk** (`b9_c6_dusk`, survive 4: the line pulls back; near 100%).
  - **The road** (`S.f.b9_lethRoad`), then the **Witness beat**.
  - One line of news: "the foreigners' rearguard is still out there."
- **Key `b9_c6_key`:** see the keys table.
- **Trick:** *Raise the Dust* (`b9_c6_dust`), the drovers' way of raising a wall of dust off the train; copies **The Cadre's Ward** (`b7_c6_ward`): free. ✦ DC 18.
- **Items:** `b9_c6_escortscale` (armour, mail, a real number), `b9_c6_plate` (trinket: a plate off a short-tail, too heavy for anything but luck).
- **Reading:** a shield on the plain at dawn. **Fire:** `b9_c6_fire` (before the battle). **Rations:** −1 (engine); `train` +2.
- **Hard limits:** Brys's and Aranict's acts (Brys seen far off, "lives"); Henar; the Malazans' part (Keneb, Ruthan Gudd, Quick Ben, Bottle, Hedge, Lostara and the Adjunct); the Khundryl's charge (far off at most, and only at dusk); the field after; the Third (never seen).
- **Vision:** Henar Vygulf called to the Commander's tent (§9.6).
- **Art:** `b9_line`, `b9_battle`; **the kind `b9_nahruk`** (the short-tail body, for both scales).

## Chapter 7: "The Rearguard" (`167`, the Third, keys `adjunct` | `south` | `home`; **the mortal fight**)

- **Spine** (corrections 3, 9): the same battle's end, late in the day into the dark (the "Nah'ruk night"; if a page check shows the fight ends in daylight, it becomes the day with no other change). The marines and heavies hold while the regulars break (RT4 S3); **the Third holds a heavies' stretch of the rearguard canon never names**. Then the retreat trail, the Fist's death as news, the days after, the road, and the finale.
- **The squad's story:**
  - **The rearguard** (`b9_c7_rearguard`, **the mortal fight**: `mortal:true`, `stage2`; `b9_nahruk` ×3, `b9_nahrukcaster`; stage 2 `b9_nahrukbrute`, `b9_nahruk` ×2; allies `b9_heavy` ×2). Deaths are permanent. Hunger counts here.
  - **Into the dark** (`b9_c7_dark`, survive 5; `b9_nahruk` waves thinning).
  - **The retreat trail** (`b9_c7_trail`, optional; `b9_dog` ×3 at the stragglers' edge).
  - **News:** "the Fist is dead" (Keneb, rule 86); "the High Mage is missing"; "a captain went in alone"; "the Adjunct was carried". A cavalry charge broken, far off (the Khundryl, never named closer). Never the field after.
  - **Witness beat** before the dark. The days after: the column's pot +1.
- **Keys `b9_c7_key`:** see the keys table; read `b9Faith('t')`.
- **The finale:** a fate page per squadmate of **both squads** (the Letherii's from `S.th.l` and `S.f.b9_lethRoad`, one line each), the roads, Rations at the end, *Where the books meet*. Then 37's end page (coda, the dead, credit to Steven Erikson and Ian C. Esslemont).
- **Trick:** *Fight Them Low* (`b9_c7_low`), what the heavies learn in the rearguard about where the plate won't give (the marines will call it that after; RT4 S7); copies **Squint's Breath** (`b2_squint`): free. ✦ DC 19.
- **Items:** `b9_c7_rearguardcloak` (armour), `b9_c7_rollstick` (trinket: the squad's roll, notched).
- **Reading:** the plain after dark. **Fire:** `b9_c7_fire` (the retreat camp, days after). **Rations:** −1 (engine); +1 the days after.
- **Hard limits:** Keneb's and Ruthan Gudd's charges; Lostara and the Adjunct (the Shadow Dance); Quick Ben struck; Bottle and the wyval; Hedge's acid salvo; the Khundryl's charge (far off at most); the field after (the bones, the crater); Gesler and Stormy's battle; never the Glass Desert by name (rule 85); never what Deadsmell sees.
- **Vision:** Gu'Rull over the field after (§9.7).
- **Art:** `b9_dark`, `b9_retreat`.

## Machine limits

- One browser at a time for every Playwright test; this machine has 2 CPUs.
- `play.mjs --book=dod` skips cleanly until a chapter registers; the shelf shows Book Nine once one does.
- `index.html` is built, never committed by a chapter.
- Rations' numbers, the march and the tiers are the engine's; a chapter moves Rations only where this brief says.
