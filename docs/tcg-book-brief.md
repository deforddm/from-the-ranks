Tue Nov 10, 2026, 11:33 AM PST. Against the Book Ten engine on branch `book10` (from v12.0.4; v13.0.0 not shipped). The standing work order for every chapter of Book Ten, *Witnessed*, beside *The Crippled God*. The last book of the series.

# Book Ten: *Witnessed*, the book brief (Chapters 1–7)

- **Plan:** `docs/book10-tcg-plan.md`. **Every "Settled" block binds** (David, Nov 10: the Third and the Letherii taking turns, the Third in Ch 1/3/5/7 and the Letherii in Ch 2/4/6; Book Eight's Fourth joins the Third for the last chapter only, coming with Onearm's Host from Aren over the ridge with the relief; **Witness is the main track**, thirst and short rations live in the scenes and their costs; one mortal fight per squad, each squad's last chapter: **the Letherii at the feint battle before Kolanse City (Ch 6)**, **the Third on the regulars' line until the relief (Ch 7)**; the series coda after the finale; the title *Witnessed*). Its Claude's calls stand until David overturns them.
- **Canon:** `docs/tcg-canon.md`. **Its corrections 1–5, the chapter table ("The seven chapters, fixed"), §3, §4 (hard limits), §5 (rules 98–111), §7 and `docs/series-canon.md` §(a) rules 1–97 are binding.** Rules 98–111 are Book Ten's own and live in `tcg-canon.md` §5 until the lead copies them into `series-canon.md`; read them there.
- **Engine:** `docs/v13.0-notes.md`, and `src/180_book10.js`, `src/180b_b10_title.js`, `src/180c_b10_read.js`. **The v10.2 and v10.3 rules hold** (`docs/v10.2-notes.md`, `docs/v10.3-notes.md`).

**How the chapters are built.** One writer-and-artist agent per chapter, **one at a time** (David, Nov 4), in order. No writer needs another's chapter: this brief fixes every key, flag, item id, trick, fight id, recruit join point, reading place, fire, Witness beat and ending in advance. Honour it exactly.
- Read earlier chapters' flags **always with a sensible default when one is unset** (a `--from=K` save sets keys only; `B10KEY0` holds the defaults).
- Invent nothing a later chapter would need. If you must, put it in your notes.
- If the engine can't do something here, follow the engine, say so in your notes, and tell the lead.

**This is the last book.** There is no later book to keep anything open for: the narrator may now say what TCG settles, **but only what the squad could see or hear**. The hard limits (§4) still bind, the darkest canon stays headline (rule 101), and no canon death is shown, prevented or reversed (rule 111).

## The owner's standing wishes (David; every chapter, no exceptions)

- **A reading** (the Deck for the Third, the Tiles for the Letherii) with a vision through canon eyes (the reading is yours; the vision is the visions pass's, tcg-canon §9).
- **A trick** behind an optional ✦ hard check (DC 21 for the Third, DC 20 for the Letherii), lore-based: the check names what the squad knows.
- **Two to four new items, each with artwork.**
- **A key choice** with consequences later (the keys below).
- **Every onward step declinable** ("Not now").
- **A scene-fitting "yes, but"** on every check (`near:{t:'Yes, but …', fx}`); silver or docks only where money is the scene. In this book a "yes, but" may cost **one Witness** (`b10Witness(-1, '…')`) **or give the thirst** (`b10Thirst(b10ThirstPick())`), at most one of the two, once a chapter.
- **Short paragraphs, dry soldier humour, no exclamation marks in narration**; the sergeant in second person, never gendered (`{sgt}` for the name).
- **Nothing lurid; the darkest canon is headline only.** Thirst is felt, never dwelt on (rule 100); the dead of the battles are news, never close; the children of the Snake are one sentence from far off (rule 101).
- **No combat rounds or turns in story text.**
- **Backgrounds match the dialogue** (place, time, who is present).
- **Recruits acknowledged** when present (the fire, the key, the chapter's end and their own scenes, behind `b10In(id)`).
- **Never a Burn's Sleep year, never a count of days, weeks or months** ("nights" for the crossing). Never the never-use names (series-canon rule 13).

## Shared rules (writers)

**Read first, in order:**
1. `docs/tcg-canon.md` whole (above all §4 hard limits and §5 rules 98–111), then `docs/series-canon.md` §(a). In short:
   - **The squads live in the gaps.** Never in a scene canon names (§4), never speaking with anyone on §4's "never speaks with" list; any of them may be seen at a distance or heard through a tent wall.
   - **Rule 98:** soldiers say "the chained god" or "the Fallen One"; a mage or priest may say "the Crippled God" once a chapter. Narration never names him (only vision 7). Never his body, heart, chains breaking, Korabas, Cotillion's knife.
   - **Rule 99:** "the Glass Desert" may be named. Night marches, counted water, dying beasts, heavies in the traces. Never a count of days.
   - **Rule 100:** thirst headline. A soldier may say "it came to that" once; narration never shows or says blood or urine drunk. "A Fist tried to take the water" as rumour at most.
   - **Rule 101:** the Snake: "children in the column, from somewhere east", once, from far off. No names, no deaths, no Shards, nothing they ate.
   - **Rule 102:** the lake: the ground goes wet, the squad sees water and drinks. Never the Adjunct's blood, the knife, Bugg. "A gift from the King" is rumour.
   - **Rule 103:** "the Assail" (soldiers), "Forkrul" (mages). "Pures", "Watered", "the Voice" only in an officer's or mage's mouth. Never a Pure by name. The Kolansii are men and women, starved and driven.
   - **Rule 104:** "the lizard-folk", "the big ones"; "Che'Malle" once, by a Letherii officer. **Rule 105:** the Grey Helms march ahead, later turn; "their leaders are dead" as news. **Rule 106:** "a Malazan Host", "a Fist on the ridge", "the High Fist"; never Paran or Ganoes. **Rule 107:** dragons may be seen; "something cut in half in the sky"; no names. **Rule 108:** the hill from far off: smoke, thunder, a glare, quiet. **Rule 109:** the Fourth's road in one page of its own words. **Rule 110:** the barrows' edge; never the speeches; Nefarias Bredd asked after once. **Rule 111:** no canon death shown, prevented or reversed.
   - **Tavore is never a viewpoint and never heard**, to the end (rule 55/84). Camp word may say "she means to free the chained god".
   - **Kalam** may be "an assassin with the Host" in rumour (Ch 7 only); never his name.
2. `docs/v13.0-notes.md`, the engine. **Use only names that exist in `src/180*`.**
3. `docs/dod-book-brief.md` §"Shared rules (writers)" and `docs/rg-book-brief.md` §"Shared rules (writers)" (the two-squad rules): everything there holds unless this brief changes it.
4. **Conventions from shipped chapters:** skim `src/161_b9_ch1.js` and `src/162_b9_ch2.js` (the two squads' voices and the swap), `src/166_b9_ch6.js` and `src/167_b9_ch7.js` (a battle on unnamed ground, the mortal fight, the two-squad finale) for nodes, areas, fights, checks, `again:`, "Not now" and "yes, but". A trick check is `check:['wits', 21], trick:'<id>', edges:id=>[…]`.
5. The engine files: `016` (`talk`, `check`, edges), `016b` and `031b` (tricks), `031c` (`stage2`, waves, hold-outs, `mortal`, soak, wards, death checks), `989` (v10.3 free and passive tricks), `014` (`registerChapter`), `038c` (`ROSTER_FIRES`, gear roles), `037` (the finale).

**Voice.**
- **The Third's chapters** sound like Book Nine's Third, at the end of it: heavies who have stopped asking, a desert that takes the talk out of everyone, and the old jokes said shorter. **"Bonehunters"** may be said by soldiers, at most once a chapter; never by the narrator as the army's name.
- **The Letherii's chapters** sound like Book Nine's Sixth, on the long way round: counting everything (the water, the horses, the docks nobody out here will take), a god who has stopped answering, and a war at the end of a road they did not choose.
- **The glass** is flat, bright by day, full of stars by night, and quiet; nothing lives in it. **The southern road** is dry country with water in it somewhere, and every horse dying slowly. **Kolanse** is thin fields, empty granaries, dust, and people watching.
- **The trope budgets bind from the first line** (table below). Run `node tools/trope_scan.mjs --files` before reporting; `trope_scan` knows Book Ten as `B10` (files 180–199).

**The squads.**
- **Chapters 1, 3, 5, 7: the Third** (`B10_CH`, thread `'t'`), with the Bonehunters' heavies. The sergeant is Book Four's with Book Ten's lines (`B10_SGT.t`), Book Two's look, Treach's. Fresh: Haddat, Tangle, Marrow, Mirrel walking; **Brask and Tegra at the baggage** (swapped in at any fire); Sathi dead. A Book Nine transfer may bring Brask, Tegra, Doss, Wenna, Mehet, Ottar and Book Four's spares; any may be dead. Book Ten's recruit: **`pruss` (Ch 1)**.
- **Chapters 2, 4, 6: the Letherii** (thread `'l'`), the Sixth Company. The sergeant is Book Five's with Book Ten's lines (`B10_SGT.l`), Book Five's look; the Errant's in Ch 2, quiet after. Fresh: Tobet, Thegg, Perrit, Ammet walking, **Brennet and Kaedra with the train**. A transfer may bring Ilsa, Sorvan, Ruuk, Brune, Pessa; any may be dead. Recruit: **`tirren` (Ch 2)**. Book Five's hands hold. **No munitions.**
- **The roads they march** (from Book Nine): **the Third** `b10TRoad()`: `'adjunct'` (the default: into the glass behind the Adjunct) or `'south'` (with the Commander's column, the long way round). **The Letherii** `b10LRoad()`: `'escort'` (the default: the Commander's brigades, south) or `'adjunct'` (a few Letherii who crossed the glass with the Malazans; never beside Henar). **Every chapter is written for its squad's default road first**, with the other road's changes as the section says. `b10Crossing()` says whether the playing squad is in the glass.
- **Write only your squad.** Guard every squadmate with `b10In(id)`. The other squad gets **one line of news a chapter at most**, as camp talk; `b10OtherName()` at most once. **When both are in one column** (Third `south` with Letherii `escort`, or Third `adjunct` with Letherii `adjunct`) the other squad may be seen at a distance once a chapter ("the Sixth's fire, three fires down"), never in a scene, never on one stretch of a battle, never crossing blades.
- **The Fourth** comes only in Ch 7 (its section).

**Your files.**
- `src/18K_b10_chK.js` exports **`B10CHK`** (Ch1 = `181_b10_ch1.js`/`B10CH1` … Ch7 = `187_b10_ch7.js`/`B10CH7`). `src/990` already registers it. `number:'One'` and so on; titles from `B10CH`.
- Your art goes in `src/18Kb_b10_chK_art.js`.
- **Every id carries `b10_c<K>_`** (nodes, areas, fights, foes, items, scenes, flags, tricks). Shared flags named in this brief have no chapter infix and are set only where this brief says. **Every top-level helper carries `b10<K>`** (`b101Say`, `b104Who`…).
- Never edit `src/180*`, another chapter's files, or Books One to Nine's files. Add your fire from your file: `ROSTER_FIRES.tcg = ROSTER_FIRES.tcg || {}; ROSTER_FIRES.tcg[K] = ['b10_cK_fire']`. Give each item its role on the item.
- The visions are `188`/`188b`, the games `189`, any extra kit `190`–`199`. Not yours.

**Size and levels.**
- 60–80 nodes, three or four areas (16×12), **two to four fights**, each main fight with a `stage2`. The glass chapters (3, 5) may have fewer fights: nothing lives in the glass (Claude's call).
- **Each squad keeps its own levels** (`lvCap()` reads `S.thread`):
  - **The Third: fresh 24, cap 28.** About 25 after Ch 1, 26 after Ch 3, 27 after Ch 5. About 400 xp a chapter (a level is 330).
  - **The Letherii: fresh 16, cap 20.** About 17 after Ch 2, 18 after Ch 4. About 400 xp a chapter.
  - `play.mjs --book=tcg --from=K` and `balance.mjs --book=tcg` use the Third **24, 25, 26, 27** at Ch 1, 3, 5, 7 and the Letherii **16, 17, 18** at Ch 2, 4, 6.
- **Foes:** the engine's `b10_` foes (v13.0-notes §Foes). **The Third's** (24–28): `b10_scav`, `b10_scavbow`, `b10_scavchief`, `b10_straggler`, `b10_ringleader`, `b10_outrider`, `b10_kolansii`, `b10_kolbow`, `b10_kolpike`, `b10_kofficer`, `b10_shriven`, `b10_assail`. **The Letherii's** (16–20): `b10_lbolkando`, `b10_lbolkandobow`, `b10_lbolkandochief`, `b10_ldog`, `b10_lforager`, `b10_lforagerchief`, `b10_lstraggler`, `b10_lringleader`, `b10_lkolansii`, `b10_lkolbow`, `b10_lkolpike`, `b10_lkofficer`, `b10_lshriven` (`b10_lassail` only if David agrees). Allies: `b10_regular` (the Third), `b10_lspear` (the Letherii), the Fourth (`b10FourthAllies`, Ch 7 only). Add your own with a `kind:` that has a sprite.
- **Stragglers are the column's own**, mad with thirst: they are fought down, **never killed in words** ("goes down", "stays down", "is dragged back to his company"). Kolansii, Shriven and the Assail appear **only in Ch 5's end (outriders), Ch 6 and Ch 7**.
- **Design fights with v10.2 from the start:** heavies soak; the Shriven and the Assail have hides; give the squad crossbows, munitions (the Third only) and flanks as answers. **Death checks run in every fight but the mortal ones.**
- **Balance is a later step that goes to David** (`B10SOLDIER`, `B10GAP` empty). Check your fights with `tools/balance.mjs --book=tcg` (a scratch `--patch`); write the numbers in your notes. Targets (Nov 6): Soldier about 90% first try (the first fight of each squad and every survive fight near 100%); Bridgeburner 75–80%, none under 60%. Witness does not change fight numbers (`B10_WITFIGHT` is zero until David rules).

**Tricks (v10.3).**
- **A trick that doesn't strike or take a foe's turn is free** (`free:true` on its `AB`, and its words end "It does not use the action (one free trick a turn)."). **Group heals stay a full turn.** No passive is planned (none is in `V103_PASSIVE`).
- **Wards:** only a heal aimed at one squadmate leaves a ward (`healW(u, n)`).
- Earn it with `earnTrick('<id>', who)`; skills and spells grow with level, munitions never do.

**The key choice** is `S.f.b10_cK_key`, with the values in `B10KEYS[K]` (don't change them). Pass it to `chapterEnd(K, key)`, with an `end` entry for each value. **The other squad's keys are readable** (both live in `S.f`), as rumour only.

**Witness** (the book's main system; v13.0-notes §Witness). Each squad's own number, 0–10; fresh 5, or carried from Book Nine.
- **The beat:** one in **every** chapter (your section says where): a moment at the fire or in the key scene where the squad says what it still marches for. **One choice, two or three answers, each recorded with `b10Beat('kept' | 'doubt', why)`** (kept +1, doubt −1); always a "Not now" that records nothing and leaves the beat for later in the chapter. Never a speech by Tavore; a sergeant's or officer's words at most; the RG line ("We shall be our own witness") only as something soldiers repeat.
- **Move it** with `b10Witness(n, why)` only where your section says, plus **at most ±1 for a scene of your own** and the one "yes, but". **The engine moves it too:** the wear, −1 at the start of Ch 3, 4 and 5.
- **Read it** with `b10Wit()`, `b10WitTier()`, `b10WitOf(t)`, `b10Hollow()`, `b10RoadOpen(r)`.
- **Checks where conviction matters** (holding a frightened line, giving the last of something, speaking for the dead, refusing to leave someone) carry `witness:true` (the engine adds "Witness", +2 to −2). The engine already gives "Nothing to march for" −1 to every other check when hollow: don't add your own.
- **Show `witnessHTML()` at the fire and at the key.** Words follow the tier (`B10_WITW`): a hollow squad's lines are short and flat, a witnessed squad's are each other's.

**Thirst** (no counter; v13.0-notes §Thirst). Say it plainly and briefly: split lips, a mouthful at a halt, a squadmate's water given to another. **`b10Thirst(id)`** (−1 to hit, a wound) only where your section says, or as the one "yes, but". **Short rations** are words only (Book Nine's Rations are not carried: `b10RationLine()` gives one line for a transfer, in Ch 1 and Ch 2 only).

**The readings** (`180c`): fill `B10READ[K]` `{scene, where, set, back, backT, say:{…}}`; put `b10ReadChoice(K)` among the first halt's choices; register `b10_cK_read: () => b10ReadOffer(K)` and `b10_cK_card: () => b10ReadCard(K)`. The Third's readers are `marrow`, `tallow`, `oldninth` (**the old marine**); the Letherii's `perrit`, `tilewoman`. Write a `say` line for each of your squad's readers. The card and tile lines are done (`B10SAY`, `B10SAY_L`). From Ch 3 on, the Letherii readers feel the tiles have gone quiet; never say why.

**Kit.** The item ids given (`CH.gear`), each with `slot`, `role`, `line` (no numbers in a line). At least one with a real number. **Every item has artwork** (`ART['item/<key>']`) on **Book Ten's ground: night glass, blue-black (#2a3a52 → #070a10), a cold starlight rim from the upper left**, 200×150.

**Squad lines.** Branch by roller, always with a `_` default. Edges favour the right hand:
- the Third: Haddat (shields, holding, the old god nobody answers for), Tangle (munitions, sapping, counting), Marrow (healing, the Deck), Mirrel (wounds, herbs, thirst), Mehet, Ottar, Doss, Wenna (water, tracks), Brask (the heavies' line, holding), Tegra (water-lore, the ground), **Pruss** (hauling, weights, wagons, his old squad's names);
- the Letherii: Tobet, Thegg, Perrit (the Holds, sums, the quiet tiles), Ammet (wounds, calm), Ilsa, Sorvan, Ruuk, Brune, Pessa as before, Brennet (wagons, oxen), Kaedra (spoor, the bow), **Tirren** (horses, feet, hooves, what the animals know before the officers).
- **The recruit rule:** a recruit walking gets a line at the fire, at the key, at the chapter's end and in their own scenes, behind `b10In(id)`. `recruit_scan` knows Book Ten (files 180–199). **Each recruit joins at their chapter's first halt.**

**The fire.** Your fire id is in your section; keep it exactly. It offers the roster (the engine adds it), a rest (`rest()`), the squad's talk, `witnessHTML()`, the Witness beat where your section has it, and the way on with "Not now".

**Recurring inventions** (shared; use them, don't contradict them):
- **The Third's corporal: Thallo** (Book Nine's: big as a door, broken nose, always eating, and now not eating). **The heavies' captain** is seen, unnamed. **The old marine** reads the Deck.
- **Sedge** (she), captain of the regulars' company the Third is lent to as file-closers on the last nights of the crossing (Ch 5's end and Ch 7 only; tcg-canon §6).
- **Rolle**, a sergeant of the Host who brings the Fourth in over the ridge (Ch 7 only).
- **The Letherii's officer** is still **Finadd Ravel Ennic**. **Yelt** keeps the brigade's ration book (and is the column's quartermaster); **Orla** (she) drives a water-cart; **Saffa** (she) is the field cook. The **tile-woman** rides the train. Brys is "the Commander", seen far off, never acting.
- **No other new named people.** Everyone else is unnamed by role. A writer who truly needs a name runs the series check (`series-canon.md` §(b), and tcg-canon §6's rejects) first and records the row. Never a Cor- name in the Third (Cord), never Ven-, Hen-, Syn-, Spa-, Gil-, Fes-, Mel-, Hag- or any -dict name.
- **Money:** the Third counts silver; the Letherii count docks (`b10Coin(n)`). Debt is flavour only.
- **Munitions:** the Third has what is left of the column's issue; Lether has none. Never Bavedict's "kittens". In Ch 7 the Host "had munitions, more than it should have, and nobody would say from where" (rule 109; Book Eight's Kettle line answered).
- **Rumours allowed** (one a chapter at most): "the High Mage is alive" (Ch 7 only, from the Fourth); "a Fist tried to take the water" (Ch 5); "the Grey Helms' leaders are dead" (Ch 6 after the battle); "the Commander fell, and got up" (Ch 6's dusk or Ch 7); "two sergeants and a girl died at the tower" (Ch 7, after); "Nefarias Bredd" asked after once, nobody can say (Ch 7, the barrows).

**Engine changes** go in your own file, guarded by `b10On()` (and `b10L()` / `b10Third()`), under a `b10<K>` name, and are reported to the lead. Never edit `src/180*`.

**Continuity.** Write `docs/tcg-chK-notes.md`: the key values and what each changes; every flag later chapters may read, with its values; the Witness moves, with numbers; the thirst; the beat; the named inventions; anything left open on purpose; canon points you were unsure of; fights' xp and balance numbers.

**Tests** (all must pass): `python3 build.py`; `node --check` on your files; `node tools/lint.mjs` with 0 errors; `node tools/play.mjs 3 --book=tcg --from=K` 3/3 and `node tools/play.mjs 1` 1/1; `repeat_scan`, `trope_test`, `recruit_test`, `b10engine_test`, `roster_test`, `reading_test`; and **a chapter test `tools/b10chK_test.mjs`**: halts, every key (three in Ch 7), every fight's start and win, the trick, the fire, the reading, the recruit's join, the Witness moves and the beat your section names, the thirst where it is given, both roads where your section has them, from a fresh state and from the `--from=K` save. One browser at a time.

**Commit to `book10`**, never `main`. Don't touch `sw.js` or `src/010_preamble.js`.

**Report** (under 500 words): areas, nodes, fights and xp, the key and its consequences, the Witness moves and the beat, the flags set, file sizes, test numbers, any edits outside your files, the canon points you were unsure of.

## Shared rules (artists)

**Your file:** `src/18Kb_b10_chK_art.js`: figures, ground, backdrops and item art. Match the established art in scale, palette, line weight and light. Study `src/180b_b10_title.js` (this book's palette: night glass, starlight, blue-black), Book Nine's art (`161b`–`167b`: the Third and the Letherii, the Wastes, the battle) and Book Four's desert (`071b`–`077b`).

**Book Ten's look.**
- **The camp after the short-tails** (Ch 1, 2): Book Nine's camp, emptier; burial trenches; the allies' columns on the horizon.
- **The glass** (Ch 3, 5): a flat bright plain by day (glare, the column under cloaks); by night stars above and the same stars thrown back by the ground. Thin glints. Nothing living. A dead city far off at most, never close. The lake (Ch 5's end): the glass going dark, then wet, then water.
- **The southern road** (Ch 2, 4): dry country, a column in poor shape, horses with their heads down; the Grey Helms' dust ahead.
- **The coast and the field before Kolanse City** (Ch 6): grey beach, ships at anchor, crates; a long allied line on open ground, the Kolansii line and trenches across it, the city and a far tower beyond. The bay going white far off; something cut in half high in the sky (rule 107): draw it far, small, unexplained.
- **The regulars' field** (Ch 7): a stretch of line far from any banner, a ridge behind the enemy, a hill far off with smoke over it (rule 108), dragons small and many in the sky. The barrows: long mounds of new earth.
- **The Kolansii** are drawn thin, hungry, in poor gear; **the Shriven** in pale cloth over mail; **the Assail** tall, pale, long-limbed, bare-handed, drawn at a distance or in silhouette, never in close-up gore.

**Hooks:** `FIGX[kind]`, `POR[id]`, `TILEX[style]`, `SCENEX[kind]` (with `sceneLayer` caching and `REDUCE()` respected), `ART['item/<key>']`.

**Replace your placeholder backdrops** (`B10_SCENE_LIKE` in `180`): `SCENEX.b10_… = …` in your art file. Your section says which are yours.

**Figures:** `pruss` and `tirren` have simple sprites in `180` and busts in `180b`: Ch 1's artist replaces `FIGX.pruss`, Ch 2's `FIGX.tirren` (keep the busts' kit: Pruss's patched scale, the trace-strap across the chest, his old sergeant's helm slung behind; Tirren's farrier's apron, dust scarf, braid over the left shoulder, rasp on a thong, the hammer). Ch 2's artist may refine `POR.tirren` in their own file if it reads poorly at phone size (say so). **Ch 6's artist draws the kinds `b10_kolansii` (the Kolansii body) and `b10_shriven`**, **Ch 7's draws `b10_assail`** and the Fourth's sergeant if wanted; foes may switch `kind` from their own file. **Bust rules:** each its own neckline by kit, a short natural neck, the garment blending up into the shoulders, every prop held, slung or belted.

**Look at your work** at phone width (390×844). **Limits and tone:** under about 150 KB. Battles and the field after at a distance. No bodies in close-up, ever. Finish with `python3 build.py`, `node --check`, `node tools/lint.mjs`.

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

The engine and readers already spend a few: run `node tools/trope_scan.mjs --hits=18K_b10_chK.js` for your own hits.

---

## The keys, and who reads them

| Ch | Squad | Key | Values (default first, `B10KEY0`) | What it changes | Read by |
|---|---|---|---|---|---|
| 1 | Third | `b10_c1_key` (the burial lines) | `names` / `water` | `names`: stand the burial lines and say every name: `b10Witness(1, 'every name said')`, Haddat and Marrow +1, `S.f.b10_c1_names = 1`. `water`: the water detail, filling every skin and barrel for the crossing: Tangle and Pruss +1, `S.f.b10_c1_water = 1` | Ch 3 and Ch 5 (`water` waives that chapter's thirst once), Ch 7 (fate pages) |
| 2 | Letherii | `b10_c2_key` (the parting) | `watch` / `count` | `watch`: go to the edge and watch the Malazans walk into the glass until they are gone: `b10Witness(1, 'saw them go')`, Tobet +1, `S.f.b10_c2_watched = 1`. `count`: stay with Yelt and count the water for the long road: Brennet and Tirren +1, `S.f.b10_c2_counted = 1` | Ch 4 (`counted` waives its thirst once), Ch 6 (`watched`: a line at dusk), Ch 7 (the Sixth's pages) |
| 3 | Third | `b10_c3_key` (the wagon) | `haul` / `cut` | The oxen are dead. `haul`: the Third takes a water wagon's traces: `b10Witness(1, 'the wagon came through')`, Pruss +1, `S.f.b10_c3_hauled = 1`, and the thirst (`b10Thirst(b10ThirstPick())`) unless `b10_c1_water`. `cut`: cut it loose and carry what can be carried: `b10Witness(-1, 'left it in the glass')`, Tangle +1 | Ch 5 (`hauled`: the last water is that wagon's last barrel), Ch 7 (fate pages) |
| 4 | Letherii | `b10_c4_key` (the horses) | `horses` / `pace` | `horses`: walk them, Tirren's way, and fall behind: `b10Witness(1, 'the horses lived')`, Tirren +1, `S.f.b10_c4_horses = 1`, and the thirst unless `b10_c2_counted` (water for the horses). `pace`: keep up with the Bolkando and drive them until they drop: Thegg +1, Tirren −1, `S.f.b10_c4_pace = 1` | Ch 6 (`horses`: the Sixth has horses at the coast, a line and a check edge; `pace`: first to the King's ships, offered the scale first) |
| 5 | Third | `b10_c5_key` (the last water) | `give` / `hold` | `give`: the squad's last water to whoever is failing (the next fire's, or the squad's weakest): `b10Witness(2, 'gave the last of it')`, two loyalty +1 (your choice, guarded), and the thirst unless `b10_c1_water`. `hold`: keep it for the squad: `b10Witness(-1, 'held it back')`, Haddat −1 | Ch 7 (fate pages, the barrows) |
| 6 | Letherii | `b10_c6_key` (the feint) | `hold` / `carry` | `hold`: hold the stretch as ordered while the Kolansii break for the far tower: Thegg and Tobet +1. `carry`: go out for the wounded in the open ground after: `b10Witness(1, 'went back for them')`, Ammet and Tirren +1, the open-ground fight | Ch 7 (the Sixth's road page) |
| 6 | Letherii | `S.f.b10_lethRoad` (at dusk) | `letheras` / `kolanse` / `free` (`B10_LETHROADS`) | **The Sixth's ending.** `letheras`: home with the Commander's brigades on the King's ships. `kolanse`: stay in Kolanse when the brigades sail (needs `b10RoadOpen('kolanse')`; greyed with a line otherwise). `free`: out of the army at the coast. Reads `b10WitTier()` for words | Ch 7's finale; the coda |
| 7 | Third | `b10_c7_key` (the endings) | `colours` / `kolanse` / `home` | **The Third's ending.** `colours`: stay with what is left of the army. `kolanse`: stay and dig wells (needs `b10RoadOpen('kolanse')`). `home`: time served, a ship home. Reads `b10WitTier()` | the finale; the coda |
| 7 | (the Fourth) | `S.f.b10_fourthRoad` (at the barrows) | `host` / `third` / `home` (`B10_FOURTHROADS`) | **The Fourth's ending**, the Fourth's sergeant's choice told to the Third: `host` back to the Host; `third` stays with the Third; `home` home again | the finale; the coda |

**Shared flags** (set only where named): `b10_c1_names`, `b10_c1_water`, `b10_c2_watched`, `b10_c2_counted`, `b10_c3_hauled`, `b10_c4_horses`, `b10_c4_pace`, `b10_c6_fell` (the Letherii's dead in the mortal fight, as an array of ids, set by Ch 6 for Ch 7's pages), `b10_c7_fell` (the Third's, Ch 7), `b10_lethRoad`, `b10_fourthRoad`. Engine: `b10_tRoad`, `b10_lRoad`, `b10_prussDone`, `b10_tirrenDone`, `b10_wear3`…`b10_wear5`; beats in `S.b10.beat` (`c1`…`c7`).

**Endings' words for the coda:** `B10CH7.end` (Ch 7 writes it) must have `[title, paragraph]` for `colours`, `kolanse` and `home`; the engine's `B10_ENDW` holds a one-line fallback for every ending of the three squads. Ch 6 and Ch 7 may write fuller pages; they never contradict `B10_ENDW`'s titles.

## Where Witness moves (each squad its own; fresh 5)

| Ch | Squad | Engine | The key | The beat | Other anchors (writer, fixed) | Expected after |
|---|---|---|---|---|---|---|
| 1 | Third | — | `names` +1 / `water` 0 | ±1 | none | 4–7 |
| 2 | Letherii | — | `watch` +1 / `count` 0 | ±1 | none | 4–7 |
| 3 | Third | −1 (the wear) | `haul` +1 / `cut` −1 | ±1 | the "yes, but" −1 at most | 1–8 |
| 4 | Letherii | −1 | `horses` +1 / `pace` 0 | ±1 | the "yes, but" −1 at most | 2–8 |
| 5 | Third | −1 | `give` +2 / `hold` −1 | ±1 | the lake: **+1** for every squad that reaches it (fixed; "water under the column") | 0–10 |
| 6 | Letherii | — | `hold` 0 / `carry` +1 | ±1 (after the road) | the news at dusk: none | 1–10 |
| 7 | Third | — | — | ±1 (at the barrows, after the ending) | **+1** when the Fourth comes over the ridge ("somebody came") | 0–10 |

So a squad that took every hard road reaches its last fight around 2–3 (`doubt`), a squad that kept faith around 7–9. Book Nine transfers start anywhere from 2 to 8. The `kolanse` ending is open at 4 and up. Never set Witness directly.

## Where thirst is given (at most once a chapter, a wound, `b10Thirst(id)`)

| Ch | Squad | Where | Waived by |
|---|---|---|---|
| 1 | Third | none | — |
| 2 | Letherii | on `adjunct` only: the first night in the glass | — |
| 3 | Third | `haul` (the traces) | `b10_c1_water` |
| 4 | Letherii | `horses` (water given to the horses) | `b10_c2_counted` |
| 5 | Third | `give` (the last water given) | `b10_c1_water` |
| 6 | Letherii | none (the King's ships have water) | — |
| 7 | Third | none before the battle (the lake was days ago) | — |

## The Witness beats (one a chapter)

| Ch | Squad | Where | The question | Answers (each `kept` or `doubt`) |
|---|---|---|---|---|
| 1 | Third | the fire after the burial lines, when camp word says east into the glass | "Why are we still here?" | each other (kept) / the Adjunct's word, whatever it is (kept) / "nobody's said, so nothing" (doubt) |
| 2 | Letherii | the train's fire, the Malazans gone into the glass | "Why are they going?" | "they've a reason we haven't been told" (kept) / "the Commander asked us to follow" (kept) / "foreigners; mad" (doubt) |
| 3 | Third | the lie-up by day, under the cloaks | "What are we marching for?" | each other (kept) / "she knows" (kept) / "the column's walking" (doubt) |
| 4 | Letherii | the train's fire, Yelt's ledger shut, a horse lost that day | what Lether sent them out here for | each other (kept) / the Commander (kept) / "nothing anyone will remember" (doubt) |
| 5 | Third | the fire with no fire, the water gone, before the ground goes wet | the same, harder | "our own witness" (kept) / "nobody will ever know we were here" (doubt) |
| 6 | Letherii | dusk, after the ending is chosen | the last time | kept / doubt as the ending's words fall |
| 7 | Third | the barrows' edge, after the ending is chosen | the last time | kept / doubt |

## The fires and the readings

| Ch | Squad | Fire | Reading place (`tcg:K`) | Lean card or tile (`B10POOL[K]`) |
|---|---|---|---|---|
| 1 | Third | `b10_c1_fire` (the camp, by the burial lines) | an upturned water barrel at the burial lines (`B10READ[1]` filled) | Soldier of High House Life |
| 2 | Letherii | `b10_c2_fire` (the train, the first night south) | a water wagon's tailboard at the parting (`B10READ[2]` filled) | the Seer |
| 3 | Third | `b10_c3_fire` (no fire: a lie-up in the glass; the "fire" is the squad's circle) | the glass under the stars | the Leper |
| 4 | Letherii | `b10_c4_fire` (the train's horse-lines at dusk) | a horse-blanket on the ground | the White Crow |
| 5 | Third | `b10_c5_fire` (the fire with no fire) | the glass at first light | the Queen of High House Life |
| 6 | Letherii | `b10_c6_fire` (the beach by the King's ships, before the battle) | a crate from the ships, at dawn | Heartstone |
| 7 | Third | `b10_c7_fire` (behind the regulars' line, the night before) | a shield on the ground, the light going | the Knight of Chains |

---

## Chapter 1: "Missing Is Not Dead" (`181`, the Third, key `names` | `water`)

- **Spine** (tcg-canon chapter table; §1 ch 1–7): the retreat camp after the short-tails (the Nah'ruk); the allies arrive the next day (the Grey Helms, the Bolkando, the Khundryl who are left; WC3); burying and counting; news: **"the Adjunct is on her feet"** (ch 4), **"two of the missing walked back in, with a handful of the dead Imass"** (Bottle and Ruthan Gudd, ch 7; "the dead Imass" as camp word, never Masan Gilani's scene; never named closer than "the mage and the captain who went in alone"); the officers' parley seen as lamps in a tent; **after it, camp word: east into the glass, the Letherii south** (the plan as the soldiers hear it; never her words; "she means to free the chained god" may be said once); the first night march to the glass's edge.
- **Book Nine's lines:** `b10RationLine()` in the intro; Book Nine's Ch 7 news holds ("missing is not dead": Marrow's line comes true).
- **The squad's story:**
  - **Pruss joins at the first halt** (`b10Join('pruss')`), at the burial lines: the clerk's slate folds him into the Third.
  - **Field-strippers** at the edge of the burial ground (`b10_c1_strippers`, main, `stage2`; **the Third's first fight: near 100%**; `b10_scav` ×3, `b10_scavbow`; stage 2 `b10_scavchief`, `b10_scav`; ally `b10_regular` ×1).
  - On `names`: **robbers at the burial lines by night** (`b10_c1_graves`; `b10_scav` ×2, `b10_scavbow`). Optional: **sparring with the heavies** (`b10_c1_spar`, survive 4, your own `b10_c1_sparrer` on a `b2soldier` body, low damage; near 100%).
  - **Thallo**; the heavies' captain seen; the old marine.
- **Key `b10_c1_key`:** see the keys table. **Beat c1:** see the beats table.
- **`south` road:** the Third is told off to go with the Commander's column (a few heavies lent as drill-sergeants, as Book Seven's `army` road set up); the chapter's last scene is the Third walking over to the Letherii wagons instead of to the glass; the burial lines and fights are the same.
- **Trick:** *Every Name* (`b10_c1_roll`): the heavies' way of calling the roll over a grave, every name answered by the one beside; copies **the Khundryl Paint** (`b2_paint`): free. The ✦ check (wits, DC 21) names Book Nine's Roll at the Gate or the Fourteenth's musters.
- **Items:** `b10_c1_scale` (armour, mail, a real number), `b10_c1_spade` (weapon, heavyweapon: a sapper's spade from the burial lines), `b10_c1_slate` (trinket: a clerk's slate of names).
- **Reading:** `B10READ[1]` is filled (back `b10_c1_fire`). **Fire:** `b10_c1_fire`.
- **Hard limits:** the Adjunct's tent and Deadsmell; Fiddler made captain; Cuttle grieving, Bottle walking in; the parley itself; Masan Gilani and the five Unbound; Krughava's and Stormy's offers; the High Mage (still "missing"); Kalam never.
- **Vision:** Cuttle at a fire (§9.1).
- **Art:** `b10_camp`, `b10_camp_night`, `b10_burial`; the figure `pruss`.

## Chapter 2: "The Parting" (`182`, the Letherii, key `watch` | `count`)

- **Spine:** the parting at the glass's edge; south with the Commander behind the Bolkando and the Grey Helms (R13 S1); **the lizard-folk join the column** (WT ch 10: seen, "the big ones"; "Che'Malle" once from Ennic). Gesler and Stormy are "two foreign sergeants riding with the lizard-folk", seen far off at most.
- **Book Nine's lines:** `b10RationLine()` in the intro. **The Errant answers in this chapter, for the last time** (engine).
- **The squad's story:**
  - **Tirren joins at the first halt** (`b10Join('tirren')`), at the horse-lines.
  - **The drill** (`b10_c2_spar`, survive 4, **the Letherii's first fight: near 100%**; your own `b10_c2_sparrer`).
  - **Bolkando deserters** at the train (`b10_c2_deserters`, main, `stage2`; `b10_lbolkando` ×3, `b10_lbolkandobow`; stage 2 `b10_lbolkandochief`, `b10_lbolkando`; ally `b10_lspear`). Never the Bolkando court.
  - Optional: **half-wild dogs** at the carcasses (`b10_c2_dogs`; `b10_ldog` ×4).
  - **Yelt**, **Orla**, **Saffa**, **Ennic**; the tile-woman.
- **Key `b10_c2_key`:** see the keys table. **Beat c2:** see the beats table.
- **`adjunct` road:** the few Letherii who stayed walk into the glass behind the Malazans' column (never beside Henar). The deserters become **stragglers who will not cross** (same fight id; `b10_lstraggler` ×4; stage 2 `b10_lringleader`, `b10_lstraggler`; non-lethal in words); the dogs stay; `watch` becomes "watch the brigades go south"; the thirst is given once on the first night in the glass.
- **Trick:** *The Water Ledger* (`b10_c2_ledger`): Yelt's way of counting a barrel twice and believing the second count; copies **the Toll Count** (`b8_c7_toll`, the chapter re-roll). ✦ DC 20.
- **Items:** `b10_c2_spear` (weapon, reach), `b10_c2_coat` (armour, light, a real number), `b10_c2_tally` (trinket).
- **Reading:** `B10READ[2]` is filled (back `b10_c2_fire`). **Fire:** `b10_c2_fire`.
- **Hard limits:** Brys meeting the Che'Malle; Gesler, Stormy, Kalyth and Bent; Brys's tent and Tehol's letter; the Grey Helms' councils; Krughava; Abrastal and Felash.
- **Vision:** Aranict on the march (§9.2).
- **Art:** `b10_train`, `b10_south`; the figure `tirren`.

## Chapter 3: "Night Marches" (`183`, the Third, key `haul` | `cut`)

- **Spine** (ch 10–17): the crossing: night marches, lying up by day, the water counted at every halt, the beasts dying, heavies in the traces (W *Tavore Paran*; R17 S1, S7). A dead city far off, never named or entered (Icarias). Dust far off going into the glass (Krughava's ride; never said whose).
- **The squad's story:**
  - **Thirst-mad stragglers** come for the water wagon at a lie-up (`b10_c3_wagon`, main, `stage2`; `b10_straggler` ×4; stage 2 `b10_ringleader`, `b10_straggler`). They are Bonehunters from another company: fought down, never killed in words.
  - On `haul`: **the traces** (`b10_c3_traces`, survive 4: the wagon dragged on while more stragglers come in; near 100%).
  - **Thallo** in the traces beside Pruss; the old marine.
- **Key `b10_c3_key`:** see the keys table. **The wear** (−1) at the chapter's start. **Beat c3:** see the beats table.
- **`south` road:** the southern march as Ch 4's ground (dry, with water somewhere): the oxen die more slowly; `haul` is a supply wagon with a broken team; the stragglers are Bolkando and Letherii carters gone thirsty (same ids, the Third's scale).
- **Trick:** *Into the Traces* (`b10_c3_harness`): how a carter's son leans into a load and takes a squadmate with him; Pruss teaches (else Thallo); copies **the Rope-Man's Haul** (`b5_c1_haul`): free. ✦ DC 21.
- **Items:** `b10_c3_glassknife` (weapon, blade, a real number: knapped from the desert glass), `b10_c3_nightcloak` (armour, light), `b10_c3_tracestrap` (trinket).
- **Reading:** the glass under the stars. **Fire:** `b10_c3_fire`.
- **Hard limits:** Icarias and the Unbound's gate; the Snake (not in this chapter); Blistig and the reserve water; Tarr's water fight; Hedge and Bavedict's beasts; Ruthan Gudd and Banaschar with the Adjunct; Krughava's ride (dust far off at most).
- **Vision:** Shortnose in the traces (§9.3).
- **Art:** `b10_glass`, `b10_glass_night`, `b10_traces`.

## Chapter 4: "The Long Way Round" (`184`, the Letherii, key `horses` | `pace`)

- **Spine:** the southern march (R13 S1); the Grey Helms pulling ahead, the Bolkando trying to keep up with them, the Letherii last; horses failing; foraging in a starving country's edge; **three sunburned strangers at the rear, seen far off, taken in by somebody else** (Faint, Amby Bole, Precious Thimble; never met, never named); "the grey knights' commander rode off into the glass" as rumour.
- **The Errant is quiet from here** (engine); Perrit's tiles feel it.
- **The squad's story:**
  - **Starving foragers** raid the horse-lines (`b10_c4_foragers`, main, `stage2`; `b10_lforager` ×4; stage 2 `b10_lforagerchief`, `b10_lforager`). People of a hungry country, not soldiers.
  - On `horses`: **thieves at the horse-lines by night** (`b10_c4_night`; `b10_lforager` ×3).
  - Optional: **half-wild dogs** (`b10_c4_dogs`; `b10_ldog` ×4).
- **Key `b10_c4_key`:** see the keys table. **The wear** (−1). **Beat c4:** see the beats table.
- **`adjunct` road:** the middle of the crossing, behind the Malazans: the foragers become stragglers (same id; `b10_lstraggler` ×4; stage 2 `b10_lringleader`); `horses` is the last of the Letherii's horses, led into the glass; the night thieves are stragglers too.
- **Trick:** *The Farrier's Hand* (`b10_c4_farrier`): what Tirren does for a horse that has stopped, done for a soldier; copies **the Water-Song** (`b8_c4_hymn`): a group heal, **a full turn**, no wards. ✦ DC 20 (Tirren's or Ammet's hands help).
- **Items:** `b10_c4_horsebow` (weapon, ranged), `b10_c4_rasp` (trinket), `b10_c4_veil` (trinket: a dust veil).
- **Reading:** a horse-blanket on the ground at dusk. **Fire:** `b10_c4_fire`.
- **Hard limits:** Faint, Amby Bole and Precious Thimble taken in (R13 S1–S3); Aranict and the Empty Hold (R13 S3–S4); Abrastal and Felash (R13 S5); Spax; the Grey Helms' camp.
- **Vision:** Gesler waking (§9.4).
- **Art:** `b10_south`, `b10_south_night`.

## Chapter 5: "The Last Water" (`185`, the Third, key `give` | `hold`)

- **Spine** (ch 17–20): the crossing's worst: the water gone (R17 S3; WT ch 20); **children in the column, from somewhere east** (one sentence, far off; rule 101); "a Fist tried to take the water" (rumour, rule 100); the squad's last water; **the ground going wet under the column** at the end (rule 102). After the lake, the first scrub of Kolanse at the glass's far edge, and **Kolansii outriders who see the army and never ride back** (the Assail thought the army dead, GR21).
- **On `b10_c3_hauled`:** the last water is the last barrel of the wagon the Third hauled.
- **The squad's story:**
  - Optional: **one last straggler fight** at the last water (`b10_c5_stragglers`; `b10_straggler` ×2, `b10_ringleader`).
  - After the lake: **Kolansii outriders** (`b10_c5_outriders`, main, `stage2`; `b10_outrider` ×3, `b10_kolbow`; stage 2 `b10_kofficer`, `b10_outrider`).
  - **Sedge** (she), the regulars' captain, asks for file-closers at the chapter's end: the Third is lent to her company (said once, plainly; the order for the hill will never reach it in Ch 7).
- **Key `b10_c5_key`:** see the keys table. **The wear** (−1). **The lake: `b10Witness(1, 'water under the column')`**, fixed. **Beat c5:** see the beats table.
- **`south` road:** the Grey Helms split off east (WC21); the King's ships rumoured at the coast; the last water is the column's water ration cut; no lake; the outriders meet the column at the edge of Kolanse's farmland. The lake's +1 becomes "the first well in Kolanse".
- **Trick:** *The Last Mouthful* (`b10_c5_mouthful`): how the old hands hold one mouthful in the cheek and breathe round it until it matters; copies **Squint's Breath** (`b2_squint`): free. The ✦ check (DC 21) carries `witness:true`.
- **Items:** `b10_c5_kolansiiblade` (weapon), `b10_c5_emptyskin` (trinket), `b10_c5_lakestone` (trinket: a stone from the wet ground).
- **Reading:** the glass at first light. **Fire:** `b10_c5_fire`.
- **Hard limits:** rules 100–102 whole: the Snake by name, Blistig's barrels and mutiny, Pores, the dagger and the Adjunct's blood; Fiddler and the child; the small cairns; crystal mounds over children; Tarr's water fight.
- **Vision:** Bottle and Nom Kala (§9.5), or the spare (Ruthan Gudd).
- **Art:** `b10_lake`, `b10_kolanse`.

## Chapter 6: "The Feint" (`186`, the Letherii, key `hold` | `carry`; **the Letherii's mortal fight**)

- **Spine** (correction 1, fix A; ch 21–23): the Grey Helms gone east (WC21); **the King's ships at the coast** with supplies and very large passengers (Teblor, seen from the shore, never met); the allied attack before Kolanse City, **a feint**, on **a stretch of the Letherii line canon never names**. The bay going white far off; something cut in half in the sky far off (rule 107); far off, the dead turning a fight at the tower (seen, unexplained). News after: "the Grey Helms turned on their masters", "their leaders are dead", "the Commander fell, and got up".
- **The squad's story:**
  - Dawn on the beach: the King's ships unloading (`b10_c6_beach`, optional: Kolansii foragers at the landing; `b10_lkolansii` ×2, `b10_lkolbow` ×2).
  - **The line** (`b10_c6_line`, **the mortal fight**: `mortal:true`, `stage2`; `b10_lkolansii` ×3, `b10_lkolpike`, `b10_lkolbow`; stage 2 `b10_lkofficer`, `b10_lshriven` ×2; allies `b10_lspear` ×2). Deaths are permanent. Set `S.f.b10_c6_fell` (the ids who fell).
  - On `carry`: **the open ground** (`b10_c6_open`, survive 4, not mortal: carrying wounded back; `b10_lkolansii` waves).
  - **Dusk:** the Sixth's ending (`S.f.b10_lethRoad`), then the beat.
- **Key `b10_c6_key`:** see the keys table. **`b10_c4_horses`:** the Sixth has horses (a line, +2 on one check before the line); **`b10_c4_pace`:** first to the ships (`b10_c6_shipscale` offered first).
- **`adjunct` road:** **the regulars' field, its morning** (correction 4): the Sixth holds a stretch of the regulars' line in the morning; the Third's Ch 7 is that afternoon on another stretch. Same fight ids and foes; no beach (the ships are rumour); `carry` is the same. The two squads never stand on one stretch.
- **Trick:** *The Letherii Square* (`b10_c6_square`): the old brigades' square, called by the sergeant, the spears facing out; copies **Hold the Square** (`b7_c5_square`). ✦ DC 20.
- **Items:** `b10_c6_shipscale` (armour, mail, a real number: from the King's ships), `b10_c6_pike` (weapon, reach), `b10_c6_kingstally` (trinket).
- **Reading:** a crate from the ships, at dawn. **Fire:** `b10_c6_fire` (the beach, before the battle).
- **Hard limits:** Brys's ride and the Voice; the forgotten names and the seawater cloud; the Grey Helms' centre, Syndecan, Tanakalian, Setoc, Krughava, the Wolves; Abrastal and Spax; the Saphii at the trenches; the Gilk and the Teblor's fight; Grub's relief; the Spire and everything on it; Hood (never named).
- **Vision:** Spax on the field (§9.6).
- **Art:** `b10_coast`, `b10_field`, `b10_battle`; **the kinds `b10_kolansii` and `b10_shriven`**.

## Chapter 7: "Over the Ridge" (`187`, the Third, keys `colours` | `kolanse` | `home`; **the Third's mortal fight**; the finale)

- **Spine** (correction 2, fix A; correction 3, fix A; ch 21–24, Epilogue I): out of the glass into Kolanse; the last battle. **The Third is lent to Sedge's company as file-closers, at the far end of the regulars' line from the Adjunct, the Khundryl and the hill; the order for the hill never reached it.** Say it once, plainly, never again. The Khundryl's last charge far off; the hill far off (smoke, munitions' thunder, a glare, then quiet; rule 108); dragons in the sky. **The relief comes over the ridge** (a Fist on the ridge, a Malazan Host; never Paran, never the card or Mathok's portal), **with the Fourth** onto the Third's stretch; the Kolansii drop to their knees. The barrows (Epilogue I): the squad at the edge.
- **The squad's story:**
  - Optional: **Kolansii pickets** at the first fields (`b10_c7_picket`; `b10_kolansii` ×2, `b10_kolbow` ×2).
  - **The first rush** (`b10_c7_morning`, survive 4, near 100%; `b10_kolansii` waves; allies `b10_regular` ×2).
  - **The line** (`b10_c7_line`, **the mortal fight**: `mortal:true`, `stage2`; `b10_kolansii` ×3, `b10_kolpike`, `b10_kolbow`; allies `b10_regular` ×2; **stage 2**: `b10_shriven` ×2, `b10_assail`, `b10_kolansii`, **with the Fourth arriving: `allies: b10FourthAllies(x, y)`** in stage 2). Set `S.f.b10_c7_fell`. **`b10Witness(1, 'somebody came')`** when the Fourth comes over the ridge.
  - **The Fourth** comes in with **Rolle**, a sergeant of the Host. **Its road is one page of its own words** (rule 109): out of Darujhistan, a ship, Aren, the old Host taking veterans back, "a keep", "a pass", "the sappers did the rest", "the Host had munitions, more than it should have, and nobody would say from where". Never Kalam's name, Serenity, the Deck or the warehouse; never a count of weeks; no compass word for the voyage. **Kettle** is "Kettle" only inside the Fourth's scenes (the canon child is not on the continent). The Fourth never meets Fiddler (rule 12). "The High Mage is alive" may come from the Fourth.
  - **The barrows:** the squads at the edge; never the speeches; Nefarias Bredd asked after once, nobody can say (rule 110).
  - The ending (`b10_c7_key`), the Fourth's (`S.f.b10_fourthRoad`), then **beat c7**.
- **`south` road:** the Third's mortal fight is **the allied battle before Kolanse City, on its own stretch** (not the Letherii's), the same fight ids with the same foes; the relief is the allies' own; **the Fourth meets the Third at the barrows** (no allies in the fight; the +1 Witness when the Fourth walks up). The hill is never seen.
- **Trick:** *Rim to Rim* (`b10_c7_rim`): the Fourth's old trick, shields locked across a gap, taught on the stretch by the Fourth's sergeant (on `south`, by a regular at the barrows' camp, after); copies **the Line** (`line`): free. ✦ DC 21. Book One's first trick, at the end of the series.
- **Items:** `b10_c7_ridgecloak` (armour), `b10_c7_roll` (trinket: the Third's last roll, every name).
- **The finale (`B10CH7.finale`, 037's pages):** the Third's road page (`B10CH7.end[key]`), a page per Third soldier (walking, fallen today, fallen before, waiting), the Third's sergeant; then, through **`B10FIN.extra = () => [...]`** (never splice at `P.length − 1`), drawn by your own `showFinale` wrapper for kinds starting `b107`: the Sixth's ending page and a page per Letherii soldier (from `S.th.l`, `S.f.b10_lethRoad`, `S.f.b10_c6_fell`), the Fourth's page (its sergeant, its soldiers in one page, `S.f.b10_fourthRoad`), and *Where the books meet*. Then 037's end page (`labels.endline` "The End of <em>Witnessed</em>", the credit to Steven Erikson and Ian C. Esslemont). **The engine then runs the series coda; write nothing for it.**
- **Hard limits:** everything in correction 2's lists: Fiddler's hill, D'rek's ring, the god's body, Korabas, the chaining, Cotillion; Tavore's charge; Aloft's Voice; Badalle and the Shards; the four named regulars; Faradan Sort's charge; Gall and Hanavat; Paran on the ridge, the card, Mathok's portal; Tavore and Paran; the barrow speeches; Fiddler's fiddle; Korlat and Whiskeyjack.
- **Vision:** the Crippled God (§9.7): the series' Witness vision, and the one place narration names him.
- **Art:** `b10_ridge`, `b10_barrows`; **the kind `b10_assail`**.

## Machine limits

- One browser at a time for every Playwright test; this machine has 2 CPUs.
- `play.mjs --book=tcg` skips cleanly until a chapter registers; the shelf shows Book Ten once one does.
- `index.html` is built, never committed by a chapter.
- Witness's numbers, the wear and the tiers are the engine's; a chapter moves Witness only where this brief says.
