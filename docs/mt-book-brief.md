# Book Five: *Indebted*, the book brief (Chapters 1–7)

Wed Oct 28, 2026, 3:47 PM PDT. Against the Book Five engine on branch `book5` (8ec5dea onward; v8.0.0, not shipped). This is the standing work order for every chapter of Book Five, beside *Midnight Tides*.

**How the chapters are built.** Book Five is built by **seven writer-and-artist pairs, one per chapter, possibly at the same time** (`ashes-of-the-pale/series-build-prompts.md`). No writer reads another's chapter. **This brief fixes every key, flag, recurring invention, item id, trick, fight id, recruit join point, reading place, fire and game in advance, so honour it exactly.**
- Set the flags your section says to set, with exactly the names and values given.
- Read the flags earlier sections promise, **always with a sensible default when one is unset**: `play.mjs --book=mt --from=K` starts from a synthetic save, and a player may have taken either key.
- Invent nothing a later chapter would have to know about. If you must, write it into your chapter notes and keep it out of every other chapter's way.
- If something here is impossible in the engine, follow the engine, say so in your notes, and tell the lead.

**The owner's standing wishes** (the project instructions):
- Every book plays on its own. Book Five is a new cast: nothing transfers in.
- Every chapter has a **tile reading** with a vision through canon eyes (the visions come in their own pass, `88`), a **trick** behind a hard check, **two to four new items** each with artwork, and a **key choice** with consequences later.
- Every onward step is declinable ("Not now").
- Every check carries a scene-fitting "yes, but" cost. Docks are the cost only where money is the scene, and in Lether money is the scene more often than elsewhere (see Debt).
- The map UI stays clean: rings on trigger tiles and edge arrows only, no floating labels.
- Backgrounds match the dialogue (place, time, who is present).
- "Not a game for kids, … nothing lurid": the darkest canon is headline only (the Drownings, the green fire on the villages, the Jheck and the wounded, the pillars, the sorcery in the streets).
- Accuracy to canon across the whole series, the later books included.
- Obtainable squadmates are acknowledged whenever they are with the party (the recruit rule, playbook §6).

## Shared rules (writers)

**Read first, in order:**
1. `docs/mt-canon.md`, the sourced canon sheet.
   - **§5 and §9 (the hard limits) are binding, and so are §10 (keep-open rules 31–44) and §17c (the novel's text, which overrides earlier lines).** Also `docs/series-canon.md` §(a), rules 1–30.
   - In short:
     - The squad is never in a scene canon gives to named people, never changes a canon outcome, and never meets a canon character it cannot have met. Your chapter section restates its own limits.
     - Never in Edur lands except in a vision. Never on the Crippled God's shore, inside Kurald Galain or in the Refugium.
     - The squad never meets Brys, Tehol, Bugg, Hull, Rhulad, Trull, Fear, Mosag, the Ceda, Eberict, Moroch, Seren, Iron Bars or the Preda. Each may be seen far off where your section allows it.
     - **The Preda is "she"** (HC p. 69). **Moroch's bridge is "the principal bridge crossing Main Canal"**: never named, never the squad's. **Rhulad marches on Letheras the next day** after Brans Keep, but never count the days on screen. **The Whitefinders never come north**: they burn the ground on their retreat from First Reach, and the squad rejoins them **at Brans Keep** at the end of Chapter 5.
     - Never print a Burn's Sleep year or the never-use names (§(a) rule 13: Kellanved, Dancer, Ammanas, Laseen, Surly, Topper, the Talon, the Eel, the T'orrud Cabal). Never "Bonehunters". **Never "Kettle"** (the canon child is in Letheras; Book Five never uses the name). **Never "Green Jackets"**: it is the Grass Jackets.
     - Money is **docks**, always. Never thirds or peaks in a price, and never an exchange rate.
     - **A bow, never a crossbow**, in Letherii hands. **No Letherii healing sorcery**: Ammet is a surgeon.
     - A tile never names the being behind it (rule 41). There is no tile called the Errant, Saddick or the Knight of Shadows.
     - The Errant is Lether's god of chance as the Letherii pray to him, nothing more (rule 31). Court gossip about Turudal Brizad stays gossip, and the narrator never confirms it.
     - Rule 40: characters may believe the King became Emperor and that the Closure came. Never say the count was off.
     - Rule 43: no RG ground or names (the Patriotists, Karos Invictad, Tanal Yathvanar, Bivatt, Letur Anict, the Awl war, Kravos Hill, "Tehol the Only", the Malazans in Lether).
2. `docs/v8.0-notes.md`, Book Five's engine: every helper, flag and table you will use. Then `src/80_book5.js` and `src/80c_b5_tiles.js`. **Use only names that exist there.** Anything this brief needs that is not there is under "Engine needs" at the end, with the name it will have.
   - State: `b5On`, `b5In`, `b5He/b5His/b5Him`, `B5_FINADD`, `b5Coin`, `S.dead`, `b5Rest`.
   - Debt: `b5Debt`, `b5DebtStart`, `b5DebtTotal`, `b5Debtors`, `b5Owe`, `b5Pay`, `b5Forgive`, `b5Standing`, `B5_STANDW`, `b5Collectors`, `b5DrowningThreat`, `debtHTML(road)`; the flags `b5_collectors`, `b5_drownRisk`, `b5_freed_<id>`, `b5_eased_<id>`, `b5_pressed_<id>`, `b5_drown_<id>`, `b5_heirs`.
   - Recruits: `b5CanRecruit`, `b5Join`, `b5SwapIn`, `b5Waiting`, `b5Offers`, `b5Recruit_`, `b5Room`; the flags `b5_ruukDone`, `b5_bruneDone`, `b5_pessaDone` (1 walks, 2 waits, 0 sent away).
   - Tiles: `B5READ[n]`, `b5TileChoice(n)`, `b5TileOffer(n)`, `b5TileCard(n)`, `B5POOL`, `B5TILES`, `B5SAY`, `b5TileSay(id)`, `visReader()`.
   - Foes: `b5_edur`, `b5_unblooded`, `b5_krisnan`, `b5_wraith`, `b5_jheck`, `b5_demon`, `b5_deserter`, `b5_deserterbow`, `b5_bully`, `b5_collector`, `b5_pressman`, `b5_presssgt`.
   - Backdrops: `b5_barracks`, `b5_trate_harbour`, `b5_landing`, `b5_highfort`, `b5_road_south`, `b5_branskeep`, `b5_letheras`, `b5_march`, `b5_march_dusk`.
   - Keys: `B5KEYS` (don't change it).
3. `docs/dg-book-brief.md` and `docs/hoc-book-brief.md`: how Books Two and Four were built (schema, areas, fights with `stage2`, keys, tricks, tests). Everything there holds unless this brief changes it. **Book Five is on Book Two's curve** (a new cast, level 1, cap 8), so take Book Two's sizes and Book Four's conventions.
4. **Conventions from a shipped chapter:** skim `src/71_b4_ch1.js` for the node, area, fight, check, `again:`, "Not now" and "yes, but" patterns. A "yes, but" is the check's `near:{t:'Yes, but …', fx}`. A trick check is `check:['wits', 16], trick:'<id>', edges:id=>[…]`. A hub is `again:()=>…`. An onward step offers `{t:'Not now.', go:()=>startExplore()}`.
5. The engine files every chapter leans on:
   - `src/16_skill_checks.js` (`talk`, `check`, edges, tiers);
   - `src/16b_tricks.js` and `src/31b_tricks_in_battle.js` (tricks, and the battle halves you will copy);
   - `src/31c_stakes.js` (`battleDef`, `stage2`, waves, objectives, hold-outs);
   - `src/14_data.js` (`registerChapter`);
   - `src/38c_roster.js` (`ROSTER_FIRES`, gear roles).

**Voice.**
- Short paragraphs, dry soldier humour, grimdark restraint, and **no exclamation marks in narration**.
- The sergeant is second person, gender never stated; write `{sgt}` for the sergeant's name. Italics are `*asterisks*`.
- Lether's flavour: everything is counted, written down, owed and charged. Use it for the humour. Never let it turn into a lecture.
- **The trope budgets bind from the first line** (playbook §6). Rates per 10,000 words:
  - "the way a man…" similes: 5
  - silence beats ("says nothing", "doesn't look at you"): 9
  - sentences opening on Nobody/Somebody: 14
  - "a long moment": 3
  - "as if it were" and "a man who has": 1.5 each
  - "which is how you know": 1
  - "her eyes stay on": 0.6

  Hard caps per book: "weather" (as a simile) 3; "goes unsaid" 2. **Run `node tools/trope_scan.mjs --files` on your chapter before reporting**, and fix any hit by cutting it, making it concrete, saying it straight or naming who. Never trade one tic for another.
- **Canon voices, seen or heard from a distance only:** the Preda (she: tall, blunt, an army's commander, heard as orders "from the Preda"); Brys (the best sword in Lether, quiet, seen far off); Moroch (a hard Finadd, seen far off at High Fort, heard of on the bridge); the Ceda (a banner, never a man); the King (a feast-day figure on a balcony, at most).
- **The squad's voices** (consistent with the bios and banter in `src/80_book5.js`; read them):
  - **The sergeant** (you): born two streets back from the Quillas Canal, a swimmer who never says so, owes 340 docks and knows it to the dock. Prays to the Errant before everything. Touches the white fingertip on the shield before a fight. Runs the Sixth for a Finadd who signs.
  - **Tobet** (he, 22, the Indebted bowman): quiet, half a step behind, says "Sergeant" softly. Counts arrows, then debts, then arrows. Bitter jokes said flat ("From back here, everything owes me money"). Laughs at the Drownings jokes and doesn't mean it. Owes 900 on a plough he has never seen. Keeps a tally-stick.
  - **Thegg** (he, 29, the Tarthenal half-blood shield): very big, very calm, polite, says "Behind me." Turns sideways for doors and for people. Never raises his voice; when he is angry he stops talking. Talks to his mother's dead at night, low, in her tongue. Never prays to the Seregahl, and the narrator never brings them in as anything but "his mother's people's gods, whom nobody sane prays to".
  - **Perrit** (she, 26, the cadre mage and the squad's tile reader): small, upright, precise, a clerk's daughter. Corrects the company's arithmetic out loud. Reads the tiles like a clerk, never with awe. Dry about the Holds ("not gods: where the gods were"). Never stands with her back to water. Pays the cadre school on the first of the month with a face like a closed door.
  - **Ammet** (she, 41, the army surgeon): "Hold still." Short, blunt, not gentle and not unkind. Needle, gut, splints, hot iron and her half-Nerek grandmother's herbs; no sorcery, ever. Will not drink the night before a fight. "If a god wanted the work, it could come and hold the lamp."
  - **Ruuk** (he, 17, the Faraed guide; recruit): cheerful, always a step ahead, "Not that way. The map lies. Come." Names every bird in Faraed. Won't look at Perrit's tiles. Throws spears the way the Letherii throw dice.
  - **Brune** (she, 24, of the Shake; recruit): long silences, then something exact. Feet in the water whenever there is water. "The Shore takes everything back. I would just like it to wait." Never royal, never a witch, no Tiste blood (rule 36); the Shake on the page have no living queen.
  - **Pessa** (she, 33, the pressed refugee; recruit): canal cant, a boathook held upright like a pole, a grievance worn in plain sight. "I am not a soldier. I am a woman with a boathook and a grievance." Reads her ledger line out loud every pay-day. Her husband is gone, mentioned as weather that has passed. Angry with the army that burned her village and with the Edur, and hasn't decided which more.
  - **Finadd Ravel Ennic** (he, `B5_FINADD`): the Sixth's officer, about forty, a merchant's younger son with a neat hand and a neat book. He signs what you put in front of him, would rather sign than decide, and is brave once there is nothing left to decide. Calls you "Sergeant" and the soldiers by name, which they count as a virtue. **He lives to the end of the book** (Claude's call).
  - **The tile-woman** (she, no name): an old camp follower who reads bone tiles for a dock (80c's words). Sharp, unsentimental, spits to one side for manners.
  - **The company clerk** (he, no name): Indebted himself, ink to the wrist, keeps the Sixth's paybooks in an oilskin case and never lets go of it. Polite, exact, quietly appalled.

**Your files.**
- `src/8K_b5_chK.js` exports **`B5CHK`** (Ch1 = `81_b5_ch1.js`/`B5CH1` … Ch7 = `87_b5_ch7.js`/`B5CH7`). `src/90` already registers it; don't edit 90. Use `number:'One'` and so on, and the titles below.
- Your art goes in `src/8Kb_b5_chK_art.js`.
- **Every id carries `b5_c<K>_`**: nodes, areas, fights, foes, items, scenes, flags. Shared flags named in this brief have no chapter infix and are set only where this brief says.
- **Every top-level helper carries `b5<K>`** (`b51Say`, `b53Rec`…), as Book Four's `b41` did. The files are concatenated: two chapters' `const say = …` would break the build.
- Never reuse an engine id, and never edit `src/80*`, another chapter's files, or any Book One to Four file.
- Add your fire to the roster from your own file: `ROSTER_FIRES.mt[K] = ['b5_cK_…']`.
- Give each item its gear role on the item itself (`role:'blade'`); don't edit `ITEM_ROLE` in 38c.

**Size.**
- About Book Two's chapter size: 60–80 nodes, three or four areas (16×12, `walk`, `triggers`), three or four fights, each main fight with a `stage2`.
- **Levels: Book Two's curve.** Level 1 at the start, cap 8. The squad is about level 3 after Ch1, 4 after Ch2, 5 after Ch3, 6 after Ch4, 6–7 after Ch5 and 7 after Ch6, and finishes at 8 (`play.mjs --book=mt` starts Chapter K at level K+1). A chapter adds about 500–700 experience at the engine's 0.6 pay. Each section gives xp guides per fight.
- Foes grow by chapter through `FSCALE`, and `SOLDIER_LATE.mt` is Book Two's row (David, Oct 28: keep it). Don't add a gap table: balance is a later step and goes to David.
- Check your fights with `tools/balance.mjs` (a scratch `--patch`; don't change the tool). A smart Soldier player should win every fight, and Bridgeburner should be hard (about 75–80% before the gods). **Write the numbers in your notes; change no rule.**

**The key choice** is `S.f.b5_cK_key`, with the values in `B5KEYS[K]` (don't change them). Pass it to `chapterEnd(K, key)`, with an `end` entry for each value. **Later chapters read `S.f.b5_cK_key` directly**: there are no mirror flags. Each key's consequences are written out in your section and in the table below.

**Debt** in every chapter (the book's system):
- **Where debts move** is fixed per chapter (the table below). Do those, at least.
- **"Yes, but" costs in docks of debt.** Lether writes everything down, so a cost can be a line in a paybook: `near:{t:'Yes, but the quartermaster writes the torn net against Brune\'s name.', fx:()=>b5Owe(b5KWho(), 10, 'a torn net')}`, where `b5KWho()` is your helper for the roller (`(ROLL() && ROLL().who) || 'sgt'`).
  - A "yes, but" debt is **5 to 20 docks**, on the soldier who rolled.
  - **It never pushes anyone to `drowning`**: test `b5Standing` and the numbers first, and pick another cost if it would (rattled, lost rest, a name taken, lost kit, loyalty).
  - Vary the costs: no more than a third of a chapter's "yes, buts" should be debt.
  - Healing "yes, but" costs are pain, time, supplies or docks, never a spell.
- **Docks come in** through fights' `after` nodes, finds and the games: about 25–40 docks a chapter plus the game. The squad starts with 12.
- **The quartermaster** (unnamed) sells salves at 6 docks in Chapters 1, 2, 3, 5 and 6, never at High Fort after the battle and never in Letheras's last day.
- **A pay desk** in every chapter: node `b5_cK_pay`, reached from your fire. It offers to pay on any debtor's debt ("10 docks on Tobet's", "all we can on Ammet's") through `b5Pay`, shows `debtHTML()`, and leaves with "Not now." Until the shared helper exists (Engine needs, `b5PayChoices`), build it in your own file.
- **Thresholds:** when a soldier crosses into `pressed`, the engine notes it and counts `S.f.b5_collectors`. Your section says where the collectors turn up. In Letheras (Chapters 1 and 7), `b5DrowningThreat()` is the canal, and those sections say what it does.
- A dead soldier's debt passes to the heirs **by itself** (`kill` in 80). Never charge it to the squad. Say it once, plainly, where the dead are remembered.

**The tiles.**
- Fill `B5READ[K]` from your file (`{scene, where, set, back, backT, say:{perrit, tilewoman}}`), put `b5TileChoice(K)` among the first halt's choices, and register `b5_cK_tiles: () => b5TileOffer(K)` and `b5_cK_card: () => b5TileCard(K)`.
- The reader is Perrit while she walks and lives, else the tile-woman. Write both lines.
- The table is `READTABLE['mt:K']`, already drawn; your section names the place. The lean tile is in `B5POOL[K]`.
- The vision is the visions pass's (mt-canon §12): a reading only opens it. Don't write it.

**A trick** every chapter, behind an optional ✦ hard check (DC 15–17), defined in your file (`Object.assign(TRICKS, {b5_cK_…})`, plus its battle half in `AB` with the id `t_b5_cK_…`). **Every Book Five trick copies an existing trick's mechanics** (named in your section), with Lether's words; you may tune the numbers, but keep the id, the name and the mechanic. Lore-based: the check's text names what the squad knows. Say "Not sorcery" unless it rides the Holds.

**Kit.**
- Two to four new items (`CH.gear`) with the ids your section gives, each with `slot`, `role` and a `line`. At least one has its own small effect (`stat`, `ac`, or a line a later scene reads).
- **Every item has artwork:** your artist draws `ART['item/<key>']` in the established item style, on Book Five's ground (below). The lint fails any item without it.

**Squad lines.**
- Branch by roller on `sgt`, `tobet`, `thegg`, `perrit`, `ammet`, `ruuk`, `brune` and `pessa`, always with a `_` default. Before Chapter 6 the four are always alive and walking. From Chapter 6's mortal fight on, any of them may be dead.
- **Text must read right with any squad.** Use `b5In(id)` guards, and never count heads in words without checking.
- **Only one recruit walks at a time** (the roster's cap is six; the sergeant and the four are five). From Chapter 7 a dead core soldier may make room for two. Lines between two recruits belong on the sheet or at a camp scene where both are present, never on the map.
- Edges favour the right squadmate:
  - the sergeant: Letheras, canals and swimming, debts and paybooks, the company;
  - Tobet: the bow, the far view, birds, being unseen, the Indebted;
  - Thegg: the shield, strength, standing still, the Tarthenal, the pit towns, carrying;
  - Perrit: sorcery, the Holds and tiles, sums, the cadre, schools;
  - Ammet: wounds, the sick, herbs, the Nerek, keeping calm;
  - Ruuk: roads, hills, forests, tracks, the Faraed;
  - Brune: the sea, boats, nets, tides, the Shake, waiting;
  - Pessa: canals, barges, ropes, the road south, refugees, talking back.
- **The recruit rule.** A recruit walking with the squad gets a line at the fire, at the key choice, at the chapter's end, and in the scenes that are theirs, behind `b5In(id)`. Don't repeat one gesture forty times. `tools/recruit_scan.mjs` knows Book Five (files 80–89).

**The fire.** Every chapter has a fire node, a hub with an `again:` line. Its id is in your section; the games pass (`89`) wraps it, so keep the id exactly. It offers:
- the roster (the engine adds it to every `ROSTER_FIRES.mt` node);
- a rest (`b5Rest`);
- the pay desk (`b5_cK_pay`);
- the squad's talk (one line per squadmate present);
- the way on, with "Not now".

**Recurring inventions** (shared by every chapter; use them, don't contradict them):
- **The Sixth Company of the Whitefinder Battalion**, under **Finadd Ravel Ennic**. The battalion's commander is never named and never seen close. "Sergeant" is plain English; no Letherii rank below Finadd is invented.
- **The white fingertip** painted on every Whitefinder's shield-boss (80's call). Nobody in the battalion can say why. The sergeant touches it before a fight, for the Errant. Chapter 6's drill-sergeant gives a guess, and it is only a guess.
- **The paybooks.** Every soldier's debt is a line in the Sixth's paybook, kept by **the company clerk** in an oilskin case. The Edur take swords at High Fort, not paper. In Chapter 7 the paybook is how every road out is written.
- **The sergeant's holed dock**, on a cord (gear). Never the trick's dock (Ch 7), which is another one.
- **The quartermaster** (unnamed): salves at 6 docks; runs Chapter 5's token auction.
- **The tile-woman**: walks with the company's followers all book. She reads whenever Perrit doesn't, and may be seen as decor when Perrit does.
- **Thegg's mother is dead.** Her tavern tab in the pit town passed to him as her heir, which is the army's rule turned the other way (Claude's call). He talks to her people's dead, not to her by name.
- **The Drownings' words:** wagers are laid on Drownings, Strokes, Risings, Flailings, Flounderings and Vanishings (canon). "Guilty as sludge" may be said once in the whole book (Chapter 1 has it).
- **The burned country:** from Chapter 5, fields burned to the root by Letherii hands. The narrator never shows the Whitefinders doing it.
- **No new named people.** Every invention but Ennic is unnamed by role (the clerk, the quartermaster, the tile-woman, the factor, the rope-man, the pilot). A writer who truly needs a name runs the series check (`series-canon.md` §(b)) first and records the row.

**Engine changes** go in your own chapter file, guarded by `S.book === 'mt'`, or are reported to the lead. Never edit `src/80*`. If the engine truly lacks something, add it in your file, guarded, under a `b5<K>` name, and say so in your report. The known gaps are under "Engine needs".

**Continuity.** Write `docs/mt-chK-notes.md`:
- the key values and what each changes;
- every flag later chapters may read, with its values;
- the named inventions;
- anything left open on purpose;
- the canon points you were unsure of;
- the fights' xp and balance numbers;
- the debt moves, with numbers.

**Tests** (all must pass):
- `python3 build.py`;
- `node --check` on your files;
- `node tools/lint.mjs` with 0 errors;
- `node tools/play.mjs 3 --book=mt --from=K` 3/3, and `node tools/play.mjs 1` (Book One) 1/1;
- `node tools/repeat_scan.mjs` (your hubs read `again` or fold);
- `node tools/trope_test.mjs`, `node tools/recruit_test.mjs`, `node tools/b5engine_test.mjs`, `node tools/roster_test.mjs`, `node tools/reading_test.mjs`;
- **a chapter test, `tools/b5chK_test.mjs`**, that walks the chapter's halts, both keys (all three in Ch 7), every fight's start and win, the trick, the fire and the pay desk, the reading, and the recruit's join, from a fresh state and from the `--from=K` synthetic save.

**Commit to `book5`**, never `main`, and don't touch `sw.js` or `src/10_preamble.js`.

**Report** (under 500 words): what the chapter contains (areas, nodes, fights and xp, the key and its consequences, the debt moves), the flags set, file sizes, the test numbers, any edits outside your files, and the canon points you were unsure of.

## Shared rules (artists)

**Your file and what to study.** Your file is `src/8Kb_b5_chK_art.js`: figures, ground, backdrops and item art. Study the established art and match it exactly in scale, palette, line weight and light:
- `src/18_figure_sprites.js`, `src/19_portraits.js`, `src/25_tiles.js` and the scene file;
- Book Two's `src/47b_book2_art.js` and Book Four's `src/7*b_b4_*_art.js` for how a chapter's art is laid out;
- above all Book Five's own `src/80b_b5_title.js` (Letheras at dusk, the palette) and `src/80d_b5_tiles_art.js` (the squad, the sergeant's `sgt_mt`, the foes, the tiles).

**Book Five's look.** Lether is blue-grey, canal-green, lamp-gold and wet stone. The army is blue-grey cloaks, scale over padded coats, round shields with a **white fingertip on the boss**, and bows, **never crossbows**. The Edur are grey-skinned and tall, in dark leather. Item art sits on a **dark canal-slate ground with a thin dock-gold rim** (Claude's call), in the established item style.

**Hooks:**
- `FIGX[kind]`, `POR[id]`
- `TILEX[style]`, or wrap an existing style
- `SCENEX[kind]`, with `sceneLayer` caching and `REDUCE()` respected
- `ART['item/<key>']`

**Replace the placeholder backdrop your chapter owns.** Each of the nine in `B5_SCENE_LIKE` borrows an earlier book's drawing until a chapter redraws it. Your section says which is yours.

**Already drawn and free to use:** the squad (`sgt_mt`, `tobet`, `thegg`, `perrit`, `ammet`, `ruuk`, `brune`, `pessa`), the foes' kinds (`b5_edur`, `b5_unblooded`, `b5_krisnan`, `b5_wraith`, `b5_jheck`, `b5_demon`, `b5_letherii`, `b5_letherii_bow`), Book One's `thug` and `bruiser`, and everything on earlier shelves.

**Shared figures drawn once.** Chapter 1's artist draws `b5_c1_ennic` (the Finadd), `b5_c1_clerk` (the company clerk) and `b5_c1_tilewoman` (the tile-woman). Every later chapter uses those kind names, and a later artist who needs one before Chapter 1's art exists registers a plain placeholder **under the same name, guarded** (`FIGX.b5_c1_ennic ??= …`).

**Your names** carry your chapter's infix (`b5_cK_…`). **Register a simple placeholder for every name in your list in your first few steps** so the writer's tests run, then replace each with finished art.

**Look at your work.** Make Playwright contact sheets (`executablePath:'/opt/pw-browsers/chromium'`) in `/tmp/claude-0/shots/b5/chK/`, side by side with the shelf art, at phone width.

**Limits and tone.** Keep the file under about 150 KB. Treat anything grim at a distance, in silhouette: suggest, never linger. A Drowning is a rope going taut over dark water and a crowd on the tiers. The green fire is a curtain of light over far mountains. The pillars are columns of dark on the horizon. The sorcery in the streets is a darkness moving down a street with the lamps going out ahead of it. No bodies in close-up, ever.

**Finish with** `python3 build.py`, `node --check` and `node tools/lint.mjs`. Report in under 300 words: what you drew, the file size, the contact-sheet paths.

---

## The keys, and who reads them (the whole book at a glance)

| Key | Values | Read by |
|---|---|---|
| `b5_c1_key` (the canal) | `pay` · `swim` | Ch2 (Thegg at the wreck); Ch5 (the factor's offer); Ch7 (the Low Walk, the court's men, Thegg in the canal); finale (Thegg) |
| `b5_c2_key` (the wreck) | `salvage` · `dead` | Ch3 (the barge crews; Brune); Ch5 (a Trate refugee at the press-gang); finale (Brune) |
| `b5_c3_key` (the fire) | `watch` · `warn` | Ch4 (the posting, Perrit's grief); Ch5 (a Nerek family among the refugees); finale (Ammet) |
| `b5_c4_key` (the rampart) | `hold` · `run` | Ch5 (disarmed or armed, the rearming); Ch6 (where the Sixth stands); finale (everyone) |
| `b5_c5_key` (the ledger) | `sign` · `refuse` | Ch6 (the factor at the barrow; the heirs); Ch7 (the house's strongroom in the night); finale (what the debts became) |
| `b5_c6_key` (the channel) | `stand` · `fallback` | Ch7 (who walks, the fire's names, Ennic); finale (the fallen and the heirs) |
| `b5_c7_key` (the road) | `emperor` · `paid` · `ledger` | the finale |

## Where the debts move (the whole book at a glance)

| Ch | The moves (numbers fixed; "yes, but" costs on top) |
|---|---|
| 1 | The canal key. `pay`: the 300-dock fine goes on five paybooks (sergeant 80, Thegg 60, Perrit 60, Tobet 60, Ammet 40), and the clerk's fee takes up to 10 docks in hand: every one of them just short of pressed, on purpose. `swim`: Thegg swims, and the court's fee for the rope and the weights is `b5Owe('thegg', 40)`. The collector's men at the pit-town tavern. The wager game pays docks once. A pay desk. |
| 2 | The wreck key. `salvage`: the harbour master's bounty, +40 docks to the squad, and `b5Forgive('brune', 30, 'the harbour master\'s salvage bounty')` if Brune has joined. `dead`: no docks. Brune joins with her own 60. |
| 3 | Ruuk joins with his own 40 (his clan's grain). Ruuk's trader's man (if Ruuk has joined): pay his day-rate off (`b5Pay('ruuk', 20)`) or let the trader add 15 (`b5Owe`). The fire key. `warn`: the regiment's fine for a runner sent without leave, `b5Owe('sgt', 30, …)`. The knucklebones pay once. |
| 4 | No money. `hold`: disarmed (`b5Disarm()`). `run`: armed; no cost in docks. |
| 5 | Pessa joins with her own 120 (the press-gang's chit). The ledger key at Brans Keep. `sign`: the counting-house buys the paybooks; +40 docks advance and the house's kit, then the house's first interest, `b5Owe(id, ceil(debt / 10))` on every debtor; on Ch1 `pay` the house also buys the court's fine lines at a discount, `b5Forgive(id, half that soldier's Ch1 share)`. `refuse`: the army keeps the books; the old cache kit only; the factor's men come in the night (the collectors). The token auction writes its bids as debt, and pays once. |
| 6 | **The King's bounty for the stand**, the eve: `b5Forgive(id, 30, 'the King\'s bounty for the stand')` on every walking soldier and the sergeant. A dead soldier's debt passes to the heirs (by itself). The drill pays docks once. |
| 7 | The court's men if `b5DrowningThreat()`. On Ch5 `sign`, the house's strongroom burns in the night's looting: `b5Forgive(id, ceil(debt / 4), 'the house\'s ledgers burned')`. The roads: `paid` spends the squad's docks on the debts and releases the half-paid; `ledger` lists the squad dead and sends the debts to the heirs; `emperor` keeps the books as they are. |

## The fires and the games

| Ch | Fire node | Game (89) | Engine to start from | Pays, once a book, as the table closes |
|---|---|---|---|---|
| 1 | `b5_c1_yard` | **The Wager Board** (`b5g_wager`): the barracks bookmaker's chalk board for tomorrow's Special Drownings | new, on the tables' frame (36) | docks, net capped at 12 |
| 2 | `b5_c2_fire` | **Harbour Tiles** (`b5g_tiles`): the dockers' game of plain counting-tiles | new; Book Four's hand game for the shape | docks, net capped at 12 |
| 3 | `b5_c3_fire` | **Knucklebones** (`b5g_bones`): with the barge crews | Book One's bones (`playBones`), Book Three's voices for the shape | docks, net capped at 15 |
| 4 | `b5_c4_fire` | none | — | — |
| 5 | `b5_c5_fire` | **The Token Auction** (`b5g_tokens`): the quartermaster's sealed bids | new; Book Two's haggle for the feel | an item and its bid in debt; 10 docks once if a lot is resold |
| 6 | `b5_c6_fire` | **The Whitefinders' Drill** (`b5g_drill`): shields to the boss on the count | Book Three's Shield Wall (`playShieldWall`) | 10 docks (the Finadd's purse); Thegg +1 loyalty at 90% |
| 7 | `b5_c7_fire` | none (the roads) | — | — |

Each game pays once, as the table closes, never in a node's `fx`, as Books Three and Four's do (`docs/v6.13-notes.md`). The games pass wraps the fire nodes from `89`; chapter writers only keep the fire ids. The Wager Board is **headline only**: a chalked list of categories and odds and one line of result the next morning. Never a named swimmer, never the swim itself.

## Chapter 1: "The Drownings" (`81`, key `pay` | `swim`)

**Spine** (canon §1.1, novel ch 2, 4, 6). Letheras, summer, in the year everyone says is the Seventh Closure.
- Why the Sixth is here (Claude's call): it came down from High Fort with the battalion's sick and its paybooks, to have the books audited by the army's pursers and to draw new kit, while the rest of the Whitefinders left the fort for the summer's exercises. It is billeted in a barracks near the Drownings District.
- Court news as street and barracks talk only: the Preda and the Queen's faction quarrel; Brys Beddict is the new King's Champion; the delegation to the Edur is being chosen (Prince Quillas, Finadd Moroch Nevath, Finadd Gerun Eberict, the First Eunuch). Eberict's kill list and his King's Leave are what every soldier in the city whispers about.
- The Errant's festival, and its **Special Drownings** in the Quillas Canal, watched from the Low Walk and the tiers, with frenzied wagering. **No named swimmer.**
- A builder's board with the name Bugg on scaffolding by the Eternal Domicile, whose clay heave is a city joke: set `S.f.b5_bugg = 1`. Gossip about the Queen's First Consort, Turudal Brizad, in a tavern (gossip only, rule 31): set `S.f.b5_brizad = 1`.
- **The end:** news comes from the north that a wave out of the sea wrecked Trate's harbour, and ghost-crewed ships rode it in. The Sixth is lent to the Trate Legion to clear the harbour. Set `S.f.b5_trate = 1`. The road north.

**The squad's story.**
- The yard: the Finadd, the clerk and the paybooks (`debtHTML('The Sixth Company · Letheras')` at the clerk's table), the quartermaster, the tile-woman. Each of the four in one short scene: who they owe and why.
- **The pit town**, outside the walls, the Tarthenal side. Thegg's mother's tab: the tavern's collector says the army has stopped paying it (a clerk's error, as it turns out) and has added interest. The squad goes to sort it, and it ends in a brawl (the tavern fight). The City Garrison takes the biggest man there, who is Thegg, for **assault without cause: a fine of 300 docks** (the man's fine; canon §1.1). Set `S.f.b5_c1_fine = 300`.
- **The fines court** on the Low Walk: the key (below).
- The festival evening: the yard's wager board (the game), and the Special Drownings the next morning, seen from the tiers in a few lines: a rope going taut, the crowd, the chalk wiped. Tobet laughs at the jokes and doesn't mean it.
- Brys at the festival, far off, on a balcony with the King's party: one line, and only that (optional).
- **Fights** (levels 1–3):
  - **`b5_c1_cutpurses`** (optional): festival cutpurses and their minders in the Down Market crowd. Writer foes `b5_c1_cutpurse` (kind `thug`) and `b5_c1_minder` (kind `bruiser`). About 90 xp, no `stage2`.
  - **`b5_c1_tavern`** (main): the pit-town tavern. `objective:{type:'survive', rounds:4, text:'Fists, stools and cudgels; nobody killed. It is Letheras: the Garrison is coming.'}`. Foes `b5_bully` ×3, plus a writer's `b5_c1_drunk` (kind `bruiser`) in the wave. `stage2` **the back room**: `b5_collector` (the tavern's collector, boss) and two `b5_bully`. About 140 + 70 xp.
  - **The key fight** (below). About 140 xp.

**Key `b5_c1_key`** (the canal), chosen at the fines court on the Low Walk.
- **`pay`**: clear Thegg's fine before the Drownings. The clerk puts the 300 docks on five paybooks with the Finadd's signature: `b5Owe('sgt', 80)`, `b5Owe('thegg', 60)`, `b5Owe('perrit', 60)`, `b5Owe('tobet', 60)`, `b5Owe('ammet', 40)`, each with the why "Thegg's fine". The clerk's fee takes up to 10 docks in hand. Every one of them ends just short of `pressed`, on purpose: the book starts poorer and tighter. Thegg +2 loyalty. Perrit −1 (she has done the sums out loud). Gain `b5_c1_receipt`. **The key fight is `b5_c1_lane`**: that night the tavern's collector comes to the barracks lane with his bullies, because a fine paid to the court is not a tab paid to him (`b5_collector`, `b5_bully` ×3; `objective` survive 4 rounds, non-lethal). On a win, the tab's interest is struck out: `b5Forgive('thegg', 20, 'the collector\'s interest, struck out')`.
- **`swim`**: let him swim it with the coin. The next morning, in an ordinary Drowning before the festival's, Thegg goes into the Quillas Canal weighted with 300 docks on the court's rope, and comes out the far side. Write the swim in four or five lines: the rope, the water closing, the crowd's noise changing, his hand on the far steps. **He swims; he never walks the bed** (that is another man's Drowning). `b5Owe('thegg', 40, 'the court\'s fee for the rope and the weights')`. Tobet −1 (he laughed at the jokes, and now he doesn't). Thegg 0, and the squad owes him: `S.f.b5_c1_swam = 1`. Ammet, on his chest afterwards, says nothing, which is a lot. Gain `b5_c1_weightbag`. **The key fight is `b5_c1_lowwalk`**: on the Low Walk afterwards, the bookmaker's men who laid against a Rising want their losses back from somebody. Writer foe `b5_c1_bookman` (kind `thug`, boss) and `b5_bully` ×3; non-lethal.
- **The canal threat in Chapter 1.** At the chapter's end, if `b5DrowningThreat()` is true, the court's runner has one of the squad's names on his list: one line, and the road north is the way out of it.
- **Read later:**
  - **Ch2**: on `swim`, Thegg is the one who goes down into the flooded hulk ("I have been under once this year already"), +2 on any check to dive. On `pay`, Perrit's sums make the salvage offer tempting: one line at the key.
  - **Ch5**: on `pay`, the factor's offer includes buying the court's fine lines at half (`sign`).
  - **Ch7**: the Low Walk again. On `swim`, Thegg's name is in the Drownings' book and the court's men know him; he leads the squad into the canal under the sorcery (+2 edge). On `pay`, `b5_c1_receipt` shown to the court's men turns them away without a fight.
  - **The finale**: Thegg's fate page.

**Trick:** *The Rope-Man's Haul* (`b5_c1_haul`), from an old rope-man of the Drownings on the Low Walk, who hauls the court's coins back out of the canal and has hauled out a living swimmer or two when nobody was watching: ✦ might 15. The sergeant has the edge (+2, canal-born), Thegg +1, Pessa +1 if ever present, Tobet −1, Perrit −1. **Mechanic: the Rope's Way** (`rope`, `t_rope`): once a fight, and it does not use the bearer's action, swap places with any squadmate within 5 + level step; no free swings. Words: the bearer gets a hand on a strap and hauls. Not sorcery.

**Items:**
- `b5_c1_hookknife` (*A rope-man's hook-knife*; weapon, `role:'blade'`): the short hooked knife the rope-men use to cut a weight-sack free. +1 to hit. Look: a short blade with a back-turned hook, a cord-wrapped grip, the court's brass tag on the pommel.
- `b5_c1_chit` (*A wager-chit from the Low Walk*; trinket, `role:'any'`, `stat:{guile:1}`): a stamped wooden chit for a Rising that never paid. Look: a small oblong of pale wood, a stamp of a rope and a wave, a chalk number.
- `b5_c1_receipt` (*The fines court's receipt*; trinket, `role:'any'`, `stat:{wits:1}`; on `pay`): 300 docks, received, sealed. Chapter 7 reads it. Look: a folded square of heavy paper, a blob of grey wax, a court's cord through it.
- `b5_c1_weightbag` (*The weight-sack*; trinket, `who:['thegg']`, `ac:1`; on `swim`): the empty canvas sack the court tied the coins in. Thegg ties it to his shield's strap. Chapter 7 reads it. Look: a wet-dark canvas sack, its mouth cord knotted, an iron ring.

**Tiles:** the lean tile is the Empty Throne (`B5POOL[1]`). **Reading place:** the Whitefinders' barracks yard in Letheras at night (`READTABLE['mt:1']`; `B5READ[1]` is written in 80c as the example; keep or replace it).

**The fire:** `b5_c1_yard` (the barracks yard; the Wager Board goes here in `89`). `ROSTER_FIRES.mt[1] = ['b5_c1_yard']`. The pay desk is `b5_c1_pay`, at the clerk's table in the yard.

**Hard limits (Chapter 1; mt-canon §5).**
- **Ublala Pung's Drowning and Shurq's**: never. The squad's Drowning is another day, with no named swimmer, and Thegg's swim is his own.
- Never the throne room, the Cedance, the Old Palace, the Eternal Domicile (its scaffolding seen from a street, at most), the Azath and its yard, Tehol's house and roof, Shand's workshop, Huldo's or Rild's, or the Preda's meeting with Brys.
- Never meets Eberict, Brys, Tehol, Bugg, Shurq, Ublala, the canon child of the Azath, or the Rat Catchers. Never the name Kettle.
- Never Soulan Bridge, never Main Canal.
- The poachers' ghost ships are not known in Letheras until the Trate news.

**Ground:**
- `b5_c1_barracks` (the yard: `.` flagstones, `#` wall (blocks), `=` barrack eaves, `F` fire, `b` bunk-house door, `t` the clerk's table);
- `b5_c1_canal` (the Drownings District and the Low Walk: `.` paving, `,` steps, `~` canal (blocks), `#` wall (blocks), `s` stall, `-` the Low Walk's edge, `P` mooring post (blocks));
- `b5_c1_pittown` (the pit town: `.` mud, `,` rubbish, `#` shack wall (blocks), `D` door, `c` cart, `F` brazier).

**Art (`81b`):**
- **Figures:** `b5_c1_ennic` (the Finadd: blue-grey cloak, a good sword never drawn, a ledger under the arm), `b5_c1_clerk` (the company clerk with the oilskin paybook case), `b5_c1_tilewoman` (an old woman in a shawl with a bag of oiled cloth), `b5_c1_ropeman` (an old rope-man in a tarred apron), `b5_c1_bookman` (a bookmaker in a good coat with a chalk board), `b5_c1_cutpurse`, `b5_c1_drunk`.
- **Backdrops:** redraw `b5_barracks`; `b5_c1_lowwalk` (the Quillas Canal from the tiers, a rope over dark water, the crowd as shapes); `b5_c1_pittown` (shacks and smoke outside the white walls, night); `b5_c1_court` (a low stone hall by the canal, a clerk's desk, a scale of coins); `b5_c1_festival` (the Errant's festival at night, lanterns, distant towers).
- **Item art.**

## Chapter 2: "Trate" (`82`, key `salvage` | `dead`)

**Spine** (§1.2, novel ch 6; the Sixth stays on into ch 15). Trate, Lether's northernmost city.
- Some days after the wave. It came "with the last spears of sunlight" (HC pp. 150–151); the game reads it as a summer evening (§17c, Claude's call). The surge threw water, fish and crustaceans into the crowded docks, and the poachers' "harvest ships" are wrecked against the quays with their dead crews aboard.
- **No toll, no damage list.** The squad sees wreckage, and the dead being laid out, in a line each.
- The lighthouse stands over the harbour front, and **Tarancede Tower** stands on its rocks in the south of the harbour: both seen, never entered.
- The market sells Fent and Nerek curios, and bones and teeth nobody recognises (never name them). The city is known for its flower dancers (one line).
- The Trate Legion holds the city; its sorceress is seen at most as a figure on a wall, never named on the page, never met.
- Over the weeks, rumour: the Prince's delegation has sailed north. Then, at the end, **the Edur have declared war** (ch 13). The Sixth is sent up the river by barge to Kraig's Landing, to guard the regiment's barges (Ch 3).

**The squad's story.**
- Set `S.f.b5_trate = 1` if it is unset.
- Clearing the harbour for the Trate Legion: dragging the drowned from the water, cutting loose the wrecks, standing watch on the waterfront at night.
- **First sight of Edur sorcery:** in the first harvest ship's hulk, shapes in the rigging that are not men. A few wraiths stayed aboard the wrecks (Claude's call; canon has "corpses and wraiths" aboard and says nothing of after). Set `S.f.b5_wraithSeen = 1` (glossary: shadow wraiths).
- **Brune joins** (the recruit, here, because her bio has her hired on at Trate by the Sixth on loan to the harbour; Claude's call, below). The Shake boats have come up the coast for the drowned and the salvage and are drawn up on **the strand**, south of the quays. Brune asks the Sixth for work with her own fish-spear. Node `b5_c2_brune`: `fx:()=>b5Join('brune')` (she joins: `S.f.b5_bruneDone = 1`), or "Stay with your boats for now" (`S.f.b5_bruneDone = 2`; she waits at "the Shake boats on the strand", and the roster at any fire can bring her in), or turn her away (`S.f.b5_bruneDone = 0`). Never a Shake queen, witch or royal line: the Shake on the page have no living queen.
- **The fish-hook** (her bio): in the first days Brune comes to Ammet with a fish-hook through her palm and asks her not to make a fuss, and Ammet doesn't. Set `S.f.b5_bruneHook = 1`. Only if both are present.
- **Fights** (levels 3–4):
  - **`b5_c2_looters`** (optional): looters in the flooded harbour-front sheds. Writer foes `b5_c2_looter` (kind `thug`) and `b5_c2_looterbow` (kind `b5_letherii_bow`; a sling or a bow). About 100 xp.
  - **`b5_c2_hulk`** (main): the first wreck at dusk, the hold half flooded. `b5_wraith` ×3, then one more in the rigging (a wave). `dark:true`. `stage2` **the deck**: `b5_wraith` ×4 with a writer's `b5_c2_drowned` (kind `b5_wraith`, "a shape in a drowned man's coat"; never a raised corpse fighting). About 150 + 70 xp.
  - **The key fight** (below). About 150 xp.

**Key `b5_c2_key`** (the wreck). The harbour master posts a bounty on the harvest ships' cargo, with the dead still aboard.
- **`salvage`**: the harbour's coin first. +40 docks to the squad. If Brune has joined or waits, `b5Forgive('brune', 30, 'the harbour master\'s salvage bounty')` (she owes him for a boat). Tobet +1, Perrit +1; Brune −1 if walking ("The Shore will want them back either way"), Ammet −1. Gain `b5_c2_sealcoat`. **The key fight is `b5_c2_wreckers`**: rival wreckers come for the squad's salvage chests at night on the quay. Writer foes `b5_c2_wrecker` (kind `thug`) ×3 and `b5_c2_wreckboss` (kind `bruiser`, boss), with `b5_deserterbow` ×1.
- **`dead`**: the drowned first. The squad brings out the dead, the harbour's and the poachers', and lays them on the quay for their people, with the Shake. No docks. Brune +2 (whether walking or waiting; she sees it), Ammet +1, Thegg +1. On Ch1 `swim`, Thegg goes into the hold ("I have been under once this year already"). Gain `b5_c2_shells` (from Brune, or from a Shake woman on the strand). **The key fight is `b5_c2_tide`**: at the evening tide, with the dead laid on the quay, the wraiths come off the second hulk. `objective:{type:'survive', rounds:4, text:'Keep them off the dead until the Legion\'s lamps come.'}`; `b5_wraith` ×4, a wave of 2.
- **Read later:**
  - **Ch3**: on `salvage`, the barge crews have heard the Sixth has docks (knucklebones line); on `dead`, Brune's line at the Landing.
  - **Ch5**: on `dead`, a Trate dockhand among the refugees remembers the Sixth carried the drowned: +2 on the press-gang check.
  - **The finale**: Brune's fate page.

**Trick:** *The Pilot's Eye* (`b5_c2_pilot`), from an old harbour pilot (unnamed; never the pilot scow's crew) who reads the water off the end of the quay and saw the wave coming before the bell: ✦ wits 16. Brune has the edge (+2), Tobet +1, Ruuk +1 if present, Thegg −1. **Mechanic: the Long Listen** (`b4_c6_listen`): once a fight, the bearer watches the water's shape; the first enemy to move is marked, +2 to hit it for the squad until the end of the next round, and nobody in the squad can be flanked until the bearer's next turn. Not sorcery.

**Items:**
- `b5_c2_sealcoat` (*A poacher's sealskin coat*; armour, `role:'light'`, `ac:1`; on `salvage`): from a chest in the hulk, still smelling of the north. Look: a short coat of grey sealskin, oiled, with bone toggles.
- `b5_c2_tooth` (*A tooth nobody can name*; trinket, `role:'any'`, `hp:3`): bought for a dock at a market stall; the stall-keeper doesn't know what it came out of, and neither does anyone. Never say. Look: a long curved tooth, yellowed, bound with copper wire.
- `b5_c2_gaff` (*A harbour gaff*; weapon, `role:'reach'`): the Legion's long hooked pole for dragging wreckage. +1 range for a reach weapon, or simply a reach weapon (writer's call within the engine's fields). Look: a long ash pole with an iron hook and a spike.
- `b5_c2_shells` (*A cord of Shake burial shells*; trinket, `role:'any'`, `stat:{wits:1}`; on `dead`): the shells the Shake lay on their drowned. Look: small white shells on a knotted cord, one of them black.

**Tiles:** the lean tile is the Barrow (`B5POOL[2]`). **Reading place:** Trate harbour after the wave, a summer evening, on wet planking with mist and a coil of rope (`mt:2`).

**The fire:** `b5_c2_fire` (a fire on the strand by the Shake boats; Harbour Tiles goes here in `89`). `ROSTER_FIRES.mt[2] = ['b5_c2_fire']`. The pay desk is `b5_c2_pay`.

**Hard limits (Chapter 2; §5).**
- Never the pilot scow, the Ceda's tile chamber, or Brys's journey through the Dolmen.
- **Never inside Tarancede Tower or the lighthouse** (the lighthouse falls in ch 16; the squad is long gone).
- Never the street just in from the riverside warehouses where Buruk lives, never Seren or Buruk.
- Never in Edur lands: not Hiroth, Calach Bay, the delegation's landing or the audiences.
- Never name the sea spirit, never say it was worshipped in Trate, and never give a toll.
- The sorceress is never named, never met, and never shown at the lighthouse.

**Ground:**
- `b5_c2_quay` (the harbour front: `.` planking, `,` wet stone, `~` harbour (blocks), `w` wreckage (blocks), `#` shed wall (blocks), `c` cart, `f` fish on the cobbles (decor));
- `b5_c2_hulk` (a wreck's deck and hold: `.` deck, `-` flooded hold, `#` bulkhead (blocks), `m` mast (blocks), `h` hatch);
- `b5_c2_strand` (the strand: `.` sand, `,` shingle, `~` sea (blocks), `B` drawn-up boat (blocks), `F` fire).

**Art (`82b`):**
- **Figures:** `b5_c2_looter`, `b5_c2_wrecker`, `b5_c2_wreckboss`, `b5_c2_drowned` (a wraith in a drowned man's coat: shadow, no face), `b5_c2_pilot` (an old pilot), `b5_c2_harbourmaster`, `b5_c2_shake` (Shake fisherfolk on the strand).
- **Backdrops:** redraw `b5_trate_harbour`; `b5_c2_wrecks` (harvest ships broken on the quays at dusk, the lighthouse and the Tower behind); `b5_c2_hold` (inside a flooded hold, light through a split hull); `b5_c2_strand` (Shake boats drawn up, a fire, the sea).
- **Item art.**

## Chapter 3: "Kraig's Landing" (`83`, key `watch` | `warn`)

**Spine** (§1.3, novel ch 13–15). Up the river from Trate, near the Edur border.
- News first: **the Edur have declared war** (ch 13), and "a Letherii went over to them": a rumour, never who (Hull is never named in that rumour).
- The war council in Letheras (ch 14) as barracks talk: the King wants a strike by the Ceda's mages. The Preda has recalled the Whitefinders north from their exercises (§1.3): the Sixth hears its battalion is coming. **It never comes** (§17c), but nobody knows that yet.
- **Kraig's Landing:** three ramshackle buildings and a dock, one of them a solid hostel with a tavern below. An encamped regiment round it (the **Cold Clay Battalion**), the **Snakebelt Battalion's cadre** come from Awl, and ships at the dock flying the King's and the Ceda's banners. Barges run down the river to Trate. **The river is never named** (§17c).
- **The three mages'** tents are seen at a distance. Never named in narration except as the camp names them ("the sorceress from Trate, and two others"); never met.
- **The green fire:** with the Ceda, they raise an enormous curtain of killing green fire over the mountains against the Edur villages. **The camp cheers.** One of the Landing's outlying buildings collapses in the backlash; a few men are hurt there (Ammet goes).
- The Edur villages were empty. The squad doesn't know that. The Nerek left in them are presumed killed: the squad hears "there were Nerek up there" and nothing more.
- **Fent Reach has surrendered** (news at the chapter's end). Set `S.f.b5_fentReach = 1` (glossary: Yan Tovis is "the Atri-Preda at Fent Reach", nothing more).
- At most one line: a merchant's iron-banded wagons passing on the road (§4). Never Buruk or Seren by name.

**The squad's story.**
- The barges: tied three deep, the Sixth on guard among the regiment.
- **Ruuk joins** (the recruit). The army's Faraed scouts keep their own fire above the dock; Ruuk is one of them, paid by the day, and the Sixth pays on the day. Node `b5_c3_ruuk`, at **the Faraed scouts' fire**: `fx:()=>b5Join('ruuk')`. If a recruit already walks (Brune), b5Join leaves him waiting with a note, so the node also offers "Walk with us instead of Brune" (`b5SwapIn('ruuk')`), or "Stay with the scouts for now" (`S.f.b5_ruukDone = 2`), or turn him away (`S.f.b5_ruukDone = 0`). He is **never** the Faraed boy scout Trull's party kills (canon is fifteen, a scout; Ruuk is seventeen, a guide). One line at most that a scout didn't come back, and never who or how.
- **Ruuk's trader** (if Ruuk has joined or waits): the Trate grain trader's man is at the Landing taking a cut of the scouts' pay. Pay Ruuk's day-rate clear of him (`b5Pay('ruuk', 20, 'the trader\'s cut')`), or let it ride (`b5Owe('ruuk', 15, 'the trader\'s cut')`), or a guile check (DC 14) to talk the man down to nothing, with a "yes, but" of a name taken.
- On Ch2 `dead`, Brune (if present) looks at the river and says the Shore will have the dead from the fire too, sooner or later.
- **Fights** (levels 4–5):
  - **`b5_c3_rivermen`** (main): river thieves cutting barges loose at night, on the barges themselves. Writer foes `b5_c3_riverman` (kind `thug`) ×3 and `b5_c3_pole` (kind `bruiser`: a bargeman's pole); a wave from the water. `stage2` **the drifting barge**, a barge cut loose and going downstream with the thieves' boss on it (`b5_c3_riverboss`, kind `bruiser`, boss). About 150 + 70 xp.
  - **`b5_c3_deserters`** (optional): two regiment men who walked off before the strike, caught robbing the scouts' fire (`b5_deserter` ×2, `b5_deserterbow` ×1). About 100 xp.
  - **The key fight** (below). About 150 xp.

**Key `b5_c3_key`** (the fire), the night before the strike, when the squad learns what the mages mean to do and that there are Nerek in the villages.
- **`watch`**: stay at the barges as ordered. The fire goes up over the mountains; the camp cheers; the squad watches from the dock. Perrit +1 (it is the cadre's work, and it is very fine work, and she hates that she thinks so); Ammet −1. **The key fight is `b5_c3_cheer`**: after the fire, drunk soldiers of the regiment celebrating start on the Nerek haulers at the barge-line. `objective:{type:'survive', rounds:4, text:'Fists and boots, nobody killed. Keep them off the haulers until the provosts come.'}`; writer foes `b5_c3_drunk` (kind `b5_letherii`) ×4.
- **`warn`**: send a runner up the river bank that night to tell the Nerek in the villages to get out. The runner is **Ruuk** if he walks, else **Tobet**. Set `S.f.b5_c3_runner` to that id. The fire comes before the runner is a league up the bank. The strike goes on regardless, and the narrator never says whether anyone got out. The runner comes back at dawn. The regiment's officer notes the Sixth for a runner sent without leave: `S.f.b5_noted = 1`, and the fine is `b5Owe('sgt', 30, 'a runner sent without leave, the regiment\'s book')`. Ammet +2 (her grandmother was half Nerek), Thegg +1, Perrit −1 (to her face; +1 on her sheet's line in Ch 4, written by Ch 4). **The key fight is `b5_c3_bank`**: the squad goes up the bank after the runner, and something on the far bank is watching the villages too: `b5_wraith` ×3 and `b5_unblooded` ×1, at night among the reeds. Never a named Edur; no K'risnan.
- **Read later:**
  - **Ch4**: on `warn` (`b5_noted`), the fort's garrison posts the noted company on the far western rampart, "as far from the royals as the fort has": one line from Ennic. On `watch`, Perrit knew some of High Fort's mages from the school; when they die, that is her grief.
  - **Ch5**: on `warn`, a Nerek family among the refugees knows the Sixth's name from the bank (Ammet's scene).
  - **The finale**: Ammet's fate page.

**Trick:** *The Cadre's Link* (`b5_c3_link`), from a young mage of the Snakebelt cadre (unnamed; never Enedictal, never in the ritual circle) who shows Perrit, or whoever will learn it, the sign the cadre uses to link a unit in an instant: ✦ wits 16. Perrit has the edge (+3), Tobet +1, Thegg −2, Ruuk −1 (he won't look). `sorcery:true`: it rides the Hold, but the bearer needn't be a mage. **Mechanic: Claw Hand-Cant** (`cant`, `t_cant`): once a fight, and it does not use the bearer's action, the bearer marks an enemy within 6, and the next hit on it this round is a critical (more from higher levels, as `cant`). Words: the Hold opens a thread between the bearer and the squad, and for a breath they strike as one.

**Items:**
- `b5_c3_cadretile` (*A cadre's spare tile*; trinket, `role:'focus'`, `stat:{wits:1}`): a plain practice tile of black stone with no face, from the Snakebelt cadre's mage. Look: a small square of black stone, polished, blank, a hairline crack.
- `b5_c3_spear` (*A Faraed throwing-spear*; weapon, `role:'reach'`): light, fire-hardened, Ruuk's spare (if he joins; else a scout's trade for two docks). Look: a slim spear with a leaf-shaped iron head and a bird-feather tuft.
- `b5_c3_ash` (*Green ash in a paper twist*; trinket, `role:'any'`, no effect): ash that came down on the dock after the fire, still faintly green. Chapter 7 may name it once at the fire. Look: a twist of brown paper, a pinch of grey-green ash at the open end.

**Tiles:** the lean tile is the Watcher (`B5POOL[3]`). **Reading place:** the barges at Kraig's Landing at night: planking, a lantern, mist (`mt:3`).

**The fire:** `b5_c3_fire` (the barge crews' fire on the dock; Knucklebones goes here in `89`). `ROSTER_FIRES.mt[3] = ['b5_c3_fire']`. The pay desk is `b5_c3_pay`.

**Hard limits (Chapter 3; §5).**
- Never the mages' ritual circle, and never speaking with the mages.
- **Never the tavern while Seren and Buruk are in it, and never Buruk's barge.** The squad doesn't go into the hostel's tavern in this chapter at all.
- Never Trull's scouting party or the scout it kills; never Yan Tovis's council, the Fent Reach surrender, or First Maiden Fort.
- Never the war council in Letheras.
- Never in Edur lands: the green fire is seen over the mountains, from the dock.
- Never name the river, never "the Brous River".

**Ground:**
- `b5_c3_dock` (the Landing: `.` trampled earth, `,` mud, `#` building wall (blocks), `=` tent, `d` dock planking, `~` river (blocks), `F` fire);
- `b5_c3_barges` (`.` barge deck, `~` water (blocks), `-` gangplank, `c` cargo (blocks), `r` rope coil);
- `b5_c3_bank` (the upriver bank at night: `.` path, `,` reeds, `~` river (blocks), `#` rock (blocks), `x` dead tree).

**Art (`83b`):**
- **Figures:** `b5_c3_riverman`, `b5_c3_pole`, `b5_c3_riverboss`, `b5_c3_drunk` (a celebrating regiment soldier), `b5_c3_nerek` (a Nerek hauler, decor), `b5_c3_faraed` (a Faraed scout at the fire, decor), `b5_c3_cadremage` (a young cadre mage in grey piping), `b5_c3_trader` (the trader's man).
- **Backdrops:** redraw `b5_landing`; `b5_c3_greenfire` (the curtain of green fire over far mountains, the dock and the cheering camp as shapes in front); `b5_c3_tents` (the mages' tents with the banners, seen from the barges); `b5_c3_collapse` (the outlying building fallen in, lanterns, men digging).
- **Item art.**

