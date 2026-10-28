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

