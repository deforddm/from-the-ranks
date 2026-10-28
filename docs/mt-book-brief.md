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
2. `docs/v8.0-notes.md`, Book Five's engine: every helper, flag and table you will use. Then `src/80_book5.js` and `src/80c_b5_tiles.js`. **Use only names that exist there.** What this brief once listed as missing is under "Done in the engine" at the end, and exists now.
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
- **A pay desk** in every chapter: node `b5_cK_pay`, reached from your fire. It offers to pay on any debtor's debt ("10 docks on Tobet's", "all we can on Ammet's") through `b5Pay`, shows `debtHTML()`, and leaves with "Not now." Build it with the shared `b5PayChoices('b5_cK_fire')` (Done in the engine).
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

**Engine changes** go in your own chapter file, guarded by `S.book === 'mt'`, or are reported to the lead. Never edit `src/80*`. If the engine truly lacks something, add it in your file, guarded, under a `b5<K>` name, and say so in your report.

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

## Chapter 4: "High Fort" (`84`, key `hold` | `run`)

**Spine** (§1.4, novel ch 16–18). The Sixth is ordered from the Landing to High Fort, its battalion's station, to wait for the battalion there.
- **The march** from the Landing, through the forest, with a guide. It leaves before Trate falls (ch 16): the squad never sees the fall.
- **High Fort:** on pasture just south of a forest that hides the Katter River, guarding the route to the pass into Edur lands. Corner bastions with ballistae and mangonels; earthen ramparts. **Dry Gully**, an old drainage course, about 1,000 paces north, with three ramparts parallel to it: a stone-walled small fort on the easternmost and largest, and the largest bastion tower over the westernmost.
- **The Sixth arrives ahead of its battalion** (which never comes) and is put under the fort's garrison on **the westernmost rampart, under the bastion tower** (§1.4, Claude's call): the end of the line furthest from the royals, the stone fort and Moroch.
- The royals come in with the **Queen's Battalion** and the **Quillas Brigade**, and hold their own fortified rampart with the Dresh ballistae: their standards seen from the far rampart. The **Grass Jackets** forward on the gully ramparts, their sorcerers in the stone fort. **Eleven mages** (four with the Queen, three with the Prince, four in the stone fort). Moroch seen far off, the only uneasy man on the royals' rampart (`S.f.b5_c4_moroch = 1`, one line). **No Preda at High Fort.**
- **The battle** (headline, from the west rampart). The Edur cross the pass first, and the Queen's force falls back on the fort. Letherii sorcery opens and the K'risnan turn it back; a lightning column kills hundreds; wraiths lead, demons come in a wedge behind and vanish and reappear among the Letherii, and the garrison's ballistae fire on them. The charge, far off: thousands die by sorcery round Moroch, at the far end. The Letherii flee or fall back. **The Jheck's wolves kill the wounded** (one line, never shown). **Every one of the eleven mages dies.**
- **The surrender:** the fort sends a delegation and the Edur accept. Word runs down the ramparts that the fort has surrendered, "and the whole frontier with it", and that the Queen and the Prince are taken (heard, never seen). The terms: the surviving Letherii are disarmed and let go.

**The squad's story.**
- **The march:** Ruuk guides if he walks; else a Faraed scout from the Landing, unnamed. **The river carry** (Ruuk's bio): if Thegg and Ruuk both walk, at a stream in spate on the march Thegg carries Ruuk over on his shoulders without being asked. Set `S.f.b5_ruukCarried = 1`. Ruuk brings Perrit a stone from a hill and Ammet a herb she knows only half of (their bios), behind `b5In`.
- **Perrit at High Fort** (Claude's call, binding): she is a battalion cadre mage, **not one of the eleven**, and the fort's cadre-master does not link a junior of a battalion that isn't there. When the K'risnan follow the links back and the eleven die, she is unlinked and lives; she feels it go through the Hold like a door slammed in a long corridor. The narration never calls her the last Letherii mage. On Ch3 `watch`, she knew two of the eleven from the school: her grief, in her own dry words. On Ch3 `warn`, her sheet's line warms: she wrote, the night the runner went, that the Sixth was right (one line, read from her sheet or at the fire).
- On Ch3 `warn` (`S.f.b5_noted`): Ennic says the garrison has put the noted company "as far from the royals as the fort has".
- The garrison's **brand-pots** on the west rampart against the Jheck (the trick).
- **Fights** (levels 5–6):
  - **`b5_c4_gully`** (optional): a night patrol into Dry Gully the night before; Edur unblooded scouts in the gully (`b5_unblooded` ×3, `b5_edur` ×1). Never a named Edur. About 120 xp.
  - **`b5_c4_wraiths`** (main): the wraiths come over the west rampart first, ahead of everything. `b5_wraith` ×5, a wave of 2. `stage2` **the bastion's foot**: wraiths and `b5_unblooded` ×2 at the tower's door. With the garrison: two allies, writer foe `b5_c4_garrison` (kind `b5_letherii`) in `allies`. About 160 + 80 xp.
  - **The key fight** (below). About 170 xp.

**Key `b5_c4_key`** (the rampart), when the line in front breaks and the Grass Jackets come back past the west rampart running.
- **`hold`**: hold the west rampart to the surrender. A bound demon appears inside the rampart, out of nothing, as they did all along the line. **The key fight is `b5_c4_demon`**: `b5_demon` (boss) and `b5_wraith` ×3; `stage2` **the rampart's back slope**, the demon again with `b5_unblooded` ×2, until the horns sound the surrender and the Edur stop. Before the surrender the squad carries its own wounded, and the company's, in through the fort's gate, out of the Jheck's reach: `S.f.b5_c4_wounded = 1`. Thegg +1, Ammet +1, Ruuk −1 if walking ("We could have been in the trees"). **Then the squad is disarmed with the rest:** call `b5Disarm()`, which sets `S.f.b5_disarmed = 1`. Swords, spears and bows go on the Edur's pile; knives, shields and paper stay (the paybooks go south in the clerk's case).
- **`run`**: break with the Grass Jackets and go west into the forest, into the Jheck's country, before the surrender. The squad keeps its weapons (no `b5Disarm`). Ruuk +2 if walking (his forest), Tobet +1; Thegg −1 ("I stand behind. I do not run. I ran."). **The key fight is `b5_c4_wolves`**: Jheck in the trees west of the fort (`b5_jheck` ×4, a wave of 1), in failing light. Never B'nagga; never the basin itself; the squad is on its edge. They come out on the road south ahead of the disarmed column.
- **Read later:**
  - **Ch5**: on `hold`, the squad walks in the disarmed column, never in Moroch's group, and is rearmed at the cache and at Brans Keep (`b5Rearm`). On `run`, it walks armed through the burned country first, and the press-gang check is easier (+2; armed soldiers are not pressed).
  - **Ch6**: on `hold`, Ennic's account of the west rampart has reached the battalion, and the Sixth is given the front of the crossing on the dry channel (the stand's place). On `run`, the Sixth stands in the second rank, and Thegg has a line about it.
  - **The finale**: High Fort on every fate page that has room for one line.

**Trick:** *The Brand-Pot* (`b5_c4_brand`), from the High Fort garrison's old hands, who keep pitch-pots and brands on the west rampart because wolves will not cross fire: ✦ wits 16. Ruuk +1, Brune +1, Tobet +1, Thegg −1. **Mechanic: the Oil Bola** (`b4_c4_bola`): once a fight, throw a lit brand-pot within 4; it bursts on the mark (1d6) and burns a 3×3 for 2 rounds (1d6 + level step to anyone who starts a turn there, the squad included). Not sorcery.

**Items** (all of them things a disarmed soldier still keeps: no weapons in this chapter):
- `b5_c4_helm` (*A Grass Jacket's helm*; trinket, `role:'any'`, `ac:1`): picked up off the rampart where its owner dropped it running. Look: an open iron helm with a strip of faded green cloth tied at the crest.
- `b5_c4_wolftooth` (*A tooth too big for a wolf*; trinket, `role:'any'`, `stat:{might:1}`): from the wood (on `run`) or the rampart's foot (on `hold`). The squad doesn't discuss why it is too big. Look: a canine tooth as long as a finger, on a thong.
- `b5_c4_pitchpot` (*A brand-pot from the west rampart*; trinket, `role:'any'`, `atk:1` for whoever carries the trick, or line only): a clay pot sealed with pitch and a rag wick. Look: a squat black-glazed pot, a tarred rag, a scorch mark.

**Tiles:** the lean tile is the Wall (`B5POOL[4]`). **Reading place:** the western rampart at High Fort, on the turf by a fire, with a helm (`mt:4`): the night before the battle.

**The fire:** `b5_c4_fire` (the west rampart's fire; no game). `ROSTER_FIRES.mt[4] = ['b5_c4_fire']`. The pay desk is `b5_c4_pay` (nothing to buy; paying on debts still works, and the clerk says so with some surprise).

**Hard limits (Chapter 4; §5).**
- **Trate's fall**: never the lighthouse, the tavern, the cellar, the crossroads where Iron Bars kills Rhulad, the gathering at the corpse, the North Gate, or the Old Katter coast. The squad has left Trate. No rumour of Rhulad's death and return reaches it in this chapter.
- **Never the Queen's rampart with the Dresh ballistae**, the Prince's and the Queen's capture, the stone fort on the eastern rampart, Moroch's fall and the messenger, Trull's mage kills, the healing of the demon Lilac, Fear's tent, the river scene, or Hanradi's governorship.
- Never Moroch's own group on the road south.
- Never a named Edur, never Fear or Trull seen to be who they are; Edur and wraiths across the field at most.
- The surrender is word down the line, never the delegation.
- Perrit is never one of the eleven and never "the last mage".

**Ground:**
- `b5_c4_road` (the forest road: `.` road, `,` leaf litter, `T` tree (blocks), `~` stream (blocks), `-` ford, `#` rock (blocks));
- `b5_c4_rampart` (the west rampart: `.` turf, `,` trampled earth, `=` rampart crest (blocks), `#` bastion wall (blocks), `F` fire, `p` brand-pot store, `g` the gate);
- `b5_c4_gully` (Dry Gully at night: `.` stones, `,` dry grass, `#` bank (blocks), `x` brush) and, on `run`, `b5_c4_wood` (`.` forest floor, `T` tree (blocks), `,` fern, `#` rock).

**Art (`84b`):**
- **Figures:** `b5_c4_garrison` (a High Fort garrison soldier), `b5_c4_grassjacket` (a Grass Jacket, green cloth at the crest), `b5_c4_cadremaster` (an older cadre mage, far off), plus the shelf's Edur, wraiths, demon and Jheck.
- **Backdrops:** redraw `b5_highfort`; `b5_c4_field` (from the west rampart: the gully, the far ramparts with the royals' standards, the stone fort, the Edur across the field as a dark line); `b5_c4_lightning` (a column of white lightning far along the line, the wraiths and demons as shapes); `b5_c4_surrender` (a pile of swords on the turf, soldiers walking south in a long file, Edur watching).
- **Item art.**

## Chapter 5: "The Retreat" (`85`, key `sign` | `refuse`)

**Spine** (§7.1, novel ch 19–21). South from High Fort, toward Brans Keep.
- "The fort has surrendered, as has the entire frontier." The Edur follow south. **Trate has fallen** (survivors' stories on the road, headline only; never the lighthouse or the crossroads): set `S.f.b5_trateFell = 1`.
- **The burned country** (§17c): fields and farms burned to the root on both sides of the road, by Letherii hands, so the Edur would find nothing. The squad learns as it walks that its own battalion did this on its retreat from First Reach, and is at Brans Keep. The narrator never shows the Whitefinders burning.
- On the road: refugees; **a press-gang at work**; **Bluerose** saddles that fail (a courier's girth-strap goes, and the horse goes on without him); a burned farm with deserters in it (**never** the horse-raising family near Dresh or the grove); the army's **hidden caches** (the first one the squad finds has been emptied by someone who knew exactly where to dig: the squad never learns who); a rumour of **a Finadd upriver who says his garrison answers to nobody now** (never named, never Brous: `S.f.b5_breakaway = 1`); a rumour that Second Maiden's Fort still holds.
- **Brans Keep**, at the end: the last great work on the approach from the north, against a cliff, Lake Brans on one side and **the dry channel** on the other. The **Whitefinders are there**, and the Sixth rejoins its battalion. High Fort's other survivors are being rearmed and attached to the Artisan Battalion (heard, never seen: that is Moroch's scene).

**The squad's story.**
- On Ch4 `hold`: disarmed, in the long column of disarmed men, never in Moroch's group. Knives, shields and paybooks. The first fight is with what they carry. **The cache** (the second one, intact; the trick's place) rearms them partly: call `b5Rearm(['b5_c5_cacheblade', 'b5_c5_cachebow'])`, which gives back what the engine stashed or these in its place. Set `S.f.b5_c5_cache = 1`. On Ch4 `run`: armed, ahead of the column; the cache gives salves and the two items as plain finds.
- **Pessa joins** (the recruit). The press-gang has taken a refugee off a burned canal village's cart and written her name in its ledger, with a debt for the jack and the boots beside it. Node `b5_c5_pessa`, on the road: claim her for the Sixth from the press-gang sergeant (a guile check, DC 14: the sergeant +2, Tobet +1; on Ch2 `dead`, the Trate dockhand's word +2; on Ch4 `run`, +2; "yes, but": the press-gang sergeant takes the sergeant's name and a dock for his trouble), then `fx:()=>b5Join('pessa')` (she joins with her own 120, or waits at "the refugee column" if a recruit already walks, with "Walk with us instead" by `b5SwapIn('pessa')`); or let the press-gang keep her (`S.f.b5_pessaDone = 0`; she is taken to another company, and the narrator says nothing worse); or the fight (below), after which she asks to come anyway. **Whatever happens, the press-gang's debt stands against her name** (her bio).
- Pessa's first night: she holds the lamp for Ammet without being told (behind `b5In` both). Perrit reads for her dead husband and lies about one tile, and never tells anyone (only if both are present; the narrator never says which tile).
- On Ch3 `warn`: a Nerek family among the refugees knows the Sixth's name from the river bank. Ammet's scene, quiet; nothing is settled.
- Thegg carries Pessa's pack the first day without being asked (behind `b5In` both); Chapter 6 gives it back.
- **Fights** (levels 6–7):
  - **`b5_c5_farm`** (optional): deserters looting a burned farm (`b5_deserter` ×3, `b5_deserterbow` ×2). On Ch4 `hold`, the squad fights it with knives and staves (the disarmed fight), and it is the place to say so. `stage2` **the barn**: the deserters' leader (writer foe `b5_c5_deserterboss`, kind `b5_letherii`, boss) and two more. About 130 + 60 xp.
  - **`b5_c5_press`** (main, avoidable by the claim check): the press-gang, over Pessa and the refugees (`b5_presssgt` boss, `b5_pressman` ×4). `objective` non-lethal ("they are Letherii soldiers too; nobody is killed on the King's road"). About 150 xp. On a win, the press-gang's ledger is the squad's to keep or burn; burning it doesn't clear Pessa's line (the army has a copy), but it lets three refugees walk away unwritten.
  - **The key fight** (below). About 160 xp.

**Key `b5_c5_key`** (the ledger), at Brans Keep's rearming. A factor of a Letheras counting-house (unnamed, "the house") is buying soldiers' paybook debts from the army for coin and kit, to rearm High Fort's survivors and the burned-out companies quickly.
- **`sign`**: the Sixth's debts are sold to the house. The squad gets +40 docks advance and the house's kit (the better pieces: `b5_c5_housemail` below), and then the house's first interest on every debtor: `b5Owe(id, Math.ceil(b5Debt(id) / 10), 'the house\'s first interest')`. On Ch1 `pay`, the house also buys the court's fine lines at half: `b5Forgive(id, half that soldier's Ch1 share, 'the house bought the fine at half')`. Set `S.f.b5_holder = 'house'`. Tobet −2 ("I have been sold twice now"), Perrit +1 (the terms are, she says, not bad), Pessa −1 if walking. **The key fight is `b5_c5_wagons`**: that night deserters raid the house's kit wagons outside the Whitefinders' lines, and the squad guards them (`b5_deserter` ×4, `b5_deserterbow` ×2, a wave).
- **`refuse`**: the army keeps the books. The squad rearms from the quartermaster's old stores only (the cache pieces and what's in the battalion's carts; no `b5_c5_housemail`). Set `S.f.b5_holder = 'army'`. Tobet +2, Pessa +1 if walking, Perrit −1. Tobet shows Pessa how to read the ledger line by her name (behind `b5In` both). **The key fight is `b5_c5_factor`**: in the night, the house's hired men come for the Sixth's paybook in the clerk's case, because in Lether a refused offer is an open question. `b5_collector` (boss) and `b5_bully` ×4; `objective` non-lethal, four rounds, until the battalion's provosts come.
- **Read later:**
  - **Ch6**: on `sign`, the house's factor is at the edge of the battalion's lines on the eve with a ledger open, writing who is standing where; after the battle he is at the barrow writing the dead's debts to the heirs, with interest. On `refuse`, the army's clerk does the same, without the interest.
  - **Ch7**: on `sign`, the house's strongroom in Letheras burns in the night's looting (ch 22's disorder, headline): `b5Forgive(id, Math.ceil(b5Debt(id) / 4), 'the house\'s ledgers burned')` on every debtor. On `refuse`, the army's paybook stands, in the clerk's case.
  - **The finale**: what each debt became.

**Trick:** *The Quartermaster's Mark* (`b5_c5_mark`), at the intact cache, from the battalion's old quartermaster or a cache-keeper's cut-sign on a milestone: the army's caches are marked so that any soldier who knows the cut can find the water, the linen and the salves within a few paces of any road: ✦ wits 16. Ammet has the edge (+2), Pessa +1, Ruuk +1, Tobet +1, Thegg −1. **Mechanic: the Rhivi Spirit-Song** (`song`, `t_song`): once a fight, every squadmate within 4 heals 1d6+2 and 1 more for each squad level past the first, wakes from any daze, and steps out of any fire under them. Words: the bearer gets a cache-jar open and the water and linen go round. Not sorcery.

**Items:**
- `b5_c5_cacheblade` (*A cache shortsword, still in grease*; weapon, `role:'blade'`): a Letherii issue shortsword out of a buried jar. Look: a shortsword wrapped in greased cloth, a cache's clay seal on the cord.
- `b5_c5_cachebow` (*A cache bow, unstrung*; weapon, `role:'ranged'`, `atk:1`): a plain yew bow and a waxed string in a tube. Look: an unstrung bow lashed to a bark tube, a cache seal.
- `b5_c5_housemail` (*The house's scale*; armour, `role:'mail'`, `ac:1`; on `sign`): new scale with a counting-house's stamp inside the collar. Look: bright new scale on a padded coat, a small stamp of a scale-balance at the collar.
- `b5_c5_girth` (*A Bluerose girth-strap, cut through*; trinket, `role:'any'`, `stat:{guile:1}`): from the courier's saddle; cut, not worn. Look: a leather strap with a buckle, cut most of the way through on the inside.

**Tiles:** the lean tile is the Walker (`B5POOL[5]`). **Reading place:** the road south through the burned country: ash and coals (`mt:5`).

**The fire:** `b5_c5_fire` (a fire in the lee of a burned wall on the road; the Token Auction goes here in `89`). `ROSTER_FIRES.mt[5] = ['b5_c5_fire']`. The pay desk is `b5_c5_pay`. A second fire node is allowed at Brans Keep (`b5_c5_keepfire`); if you add it, put it in `ROSTER_FIRES.mt[5]` too.

**Hard limits (Chapter 5; §9).**
- **Never Brous**, at any time: not the dig, the barrow, the massacre, or what was freed. The breakaway Finadd is a rumour with no name and no place.
- Never the murdered horse farm near Dresh, the pursuit, or the Tarthenal grove while Seren or Hunch Arbat is there. Thegg may know such groves exist (one line, never this one).
- Never the frontier-road meeting with Seren and the three companies.
- Never the Thetil camp. Never Hull or Udinaas on the road. **Never Moroch's group.**
- **Never Moroch's recruiting scene at Brans Keep** (ebook p. 735) and never the Artisans' standard.
- Never say who emptied the first cache.

**Ground:**
- `b5_c5_road` (the military road: `.` road, `,` ash, `#` burned wall (blocks), `x` burned tree (blocks), `c` cart, `m` milestone);
- `b5_c5_farm` (a burned farm: `.` yard, `,` ash, `#` wall (blocks), `B` barn door, `w` well);
- `b5_c5_keep` (Brans Keep's lines on arrival: `.` grass, `,` trodden earth, `=` tent, `w` wagon (blocks), `~` the dry channel's lip (blocks), `F` fire).

**Art (`85b`):**
- **Figures:** `b5_c5_deserterboss`, `b5_c5_refugee` (refugees with carts, decor), `b5_c5_courier` (a Bluerose-horsed courier, his saddle slipping), `b5_c5_factor` (the house's factor: good coat, a ledger, a clerk with an umbrella), `b5_c5_quartermaster`, `b5_c5_nerek` (a Nerek family, decor; may alias `b5_c3_nerek`).
- **Backdrops:** redraw `b5_road_south`; `b5_c5_burned` (fields burned to the root on both sides of a straight road, smoke on the horizon); `b5_c5_cache` (a milestone in a burned copse, jars dug up); `b5_c5_arrival` (Brans Keep against its cliff, the lake, the army's tents spread in front, from the north road at dusk).
- **Item art.**

## Chapter 6: "Brans Keep" (`86`, key `stand` | `fallback`)

**Spine** (§7.2, novel ch 22–23).
- **The place:** the squat citadel against its cliff, facing north, barren hills behind; the walled front with east and west corner towers, each with fixed mangonels and a mage; **Lake Brans** closing the east; **the dry channel**, a seasonal drainage course, running north-east; lesser hills and old lake beds to the north-east; a ridgeline west of the keep; the Dissent River beyond the hills' western edge; the town of **Dissent** a few leagues south-west.
- **The order of battle** (heard as orders, seen as banners): Preda **Unnutal Hebaz** commands (she). The Ceda is absent. The Crimson Rampant Brigade on the extreme left; the Snakebelt and part of the Riven on the left; the King's Battalion at the walls and the Merchants' before the lake in the centre; **the right, across the dry channel: the Artisan Battalion, the Whitefinder Battalion and the other part of the Riven Brigade.** The Sixth is with its battalion on the right.
- **The eve:** the Edur armies gather. The squad's talk; the drill; the King's bounty.
- **The day.** The K'risnan raise dark streams of dust; the Letherii answer with a wave of white fire. Huge pillars rise; the wraiths go forward as fodder. The sorceries meet: **both corner towers fall, killing their mages**, the Letherii magic runs wild, and **the pillars come down on the left and the centre**. The Preda's standard goes under (seen far off: never how).
- **The right:** Tomad and Binadas Sengar's army comes late across the hills and the old lake beds and meets the right **hand to hand, without sorcery**. The right fights. Then it sees what has happened to the rest of the army, and a pillar begins bearing down on it, and it **breaks**. The Jheck hunt survivors in the hills, with a few score wraiths drifting.
- **After:** the pillars lift, and bones, armour and debris come down out of the sky (headline). The keep burns. From far off, the squad learns that the Emperor has declared the Letherii his subjects and ordered the dead of both armies buried together, in one barrow, ready by midnight: `S.f.b5_barrowSeen = 1` when the squad sees it raised, far off, from the hills or the Dissent road.

**The squad's story.**
- **The eve:** one short scene each: who they were before the paybook, and what they would do paid up. Thegg gives Pessa her pack back (her bio; behind `b5In` both). The fallen of nobody yet; the heavy reading (the tiles at dawn).
- **The King's bounty for the stand** (the Preda's order): `b5Forgive(id, 30, 'the King\'s bounty for the stand')` for the sergeant and every walking soldier, with the clerk at his table and the battalion in a line. Set `S.f.b5_bounty = 1`. Tobet: "Thirty docks to stand in a ditch. I have been offered worse." On Ch5 `sign`, the house's factor is at the end of the line with his ledger open, writing down who is standing where.
- On Ch4 `hold`: the Sixth is given **the front of the crossing** on the dry channel (Ennic's account of the west rampart has reached the battalion). On Ch4 `run`: the second rank, and Thegg has a line about it.
- **Signpost the mortal fight** in the eve and again at the choice: the right will be hand to hand, and whoever falls there stays down.
- **Fights** (level 7):
  - **`b5_c6_shore`** (optional): Jheck outriders on the battalion's foragers by the lake the evening before (`b5_jheck` ×3, a wave of 1). About 130 xp.
  - **The key fight** (below): the mortal fight on `stand`, or the flight on `fallback`.
  - **`b5_c6_hills`** (on `stand`, after the mortal fight, **not mortal**): the break into the hills, with the Jheck hunting (`b5_jheck` ×4, `b5_wraith` ×2). About 160 xp.

**Key `b5_c6_key`** (the channel), when the pillar turns toward the right and the battalion begins to break.
- **`stand`**: hold the crossing on the dry channel while the battalion goes back over it. **The mortal fight is `b5_c6_channel`**: `mortal:true, hurtMost:true`, signposted on the choice the player sees coming (`tag:'mortal'`, text ending "(a mortal fight: whoever falls here stays down)"), as `b4_c7_breakout`. Foes **`b5_edur` and `b5_unblooded` only, no K'risnan, no demon**: the army that fought without sorcery. About five at the start with waves of two; `stage2` **the channel's lip**, the last rush, then the pillar's shadow comes over the field and the Edur themselves fall back from it. About 200 + 100 xp. Then **`b5_c6_hills`**. After it, set `S.f.b5_c6_fallen` to the ids killed in `b5_c6_channel` (empty array if none). Ennic is wounded (Ammet stitches him, or the battalion's surgeons if Ammet fell), and lives. Every survivor +1 loyalty.
- **`fallback`**: go back over the channel with the first who break, toward Dissent. No mortal fight. **The key fight is `b5_c6_flight`** (not mortal): Jheck and wraiths running down the fleeing on the open ground south-west (`b5_jheck` ×3, `b5_wraith` ×3, a wave). About 170 xp. Thegg −1 ("We left the crossing"), Pessa +1 if walking ("We left the crossing. Good."), Tobet +1. Set `S.f.b5_c6_fallen = []`.
- **The dead's debts.** For each soldier killed in `b5_c6_channel`, the engine has already passed the debt to the heirs (`S.f.b5_heirs`). Say it once, plainly, at the barrow or the fire: who carries it now (the finale's table below has each soldier's heirs). On Ch5 `sign`, the house's factor is at the barrow, writing the dead's debts to the heirs with interest. On `refuse`, the army's clerk writes them, without.
- **Read later:**
  - **Ch7**: who walks (the fallen, and a recruit or two in their places), the names at the fire, Ennic's wound.
  - **The finale**: the fallen's pages and the heirs.

**Trick:** *The White Finger* (`b5_c6_finger`), from an old drill-sergeant of the battalion on the eve, who says the fingertip on the boss is a drill nobody remembers is a drill: **touch shields boss to boss, and the line can't be opened**. It is only his guess, and the battalion still doesn't know why the mark: ✦ might 16. Thegg has the edge (+3), Brune +1, the sergeant +1, Tobet −2, Perrit −2. **Mechanic: the Line** (`line`, `t_line`): once a fight, the bearer and every squadmate beside them take +3 + level step armour and cannot be flanked until the bearer's next turn. Not sorcery.

**Items:**
- `b5_c6_edurblade` (*An Edur sword from the channel*; weapon, `role:'blade'`, `atk:1`): picked up in the channel or the hills. Look: a long, slightly curved blade of dark iron, grey leather on the grip.
- `b5_c6_paint` (*A pot of white paint*; trinket, `role:'any'`, `ac:1`): the battalion's own, for the fingertip; whoever carries it repaints the squad's bosses on the eve. Look: a small clay pot, its rim white, a frayed brush tied to it.
- `b5_c6_lakestone` (*A stone from the old lake bed*; trinket, `role:'any'`, `hp:3`): smooth, banded, picked up on the way out of the hills or the Dissent road. Look: a flat banded stone, pale grey with a darker ring.

**Tiles:** the lean tile is the Axe (`B5POOL[6]`). **Reading place:** Brans Keep across the dry channel: a shield on the grass at dawn, dust (`mt:6`): the morning of the battle.

**The fire:** `b5_c6_fire` (the Whitefinders' lines across the dry channel, the eve; the Whitefinders' Drill goes here in `89`). `ROSTER_FIRES.mt[6] = ['b5_c6_fire']`. The pay desk is `b5_c6_pay`.

**Hard limits (Chapter 6; §9 and §17c).**
- **Never the Edur hill** (Udinaas, Feather Witch, Uruth), the corner towers and their mages, **the Preda's command**, the Edur right (the Jheck and demons with Rhulad), Rhulad and Mosag's quarrel, Trull, Ahlrada Ahn or Canarth. **Never Tomad or Binadas in person**, and never by name in narration (the soldiers may say "the Edur who came over the lake beds").
- **Never Moroch's recruiting scene at Brans Keep, and never the Artisans' standard** (taken by Tomad and Binadas: the squad is never near it and never hears of it).
- **Never change:** the army destroyed, the Preda's fall (her standard seen to go under, never how), the towers down, the keep burning, the barrow ordered.
- The squad never sees the Emperor. His declaration is heard.
- No K'risnan and no demon in the mortal fight. No other mortal fight in the book.

**Ground:**
- `b5_c6_lines` (the Whitefinders' lines, the eve: `.` grass, `,` trodden earth, `=` tent, `F` fire, `~` the dry channel (blocks), `-` the crossing);
- `b5_c6_channel` (the dry channel in battle: `.` channel floor, `,` stones, `#` bank (blocks), `-` the crossing, `s` dropped shield (decor));
- `b5_c6_hills` (`.` scrub, `,` scree, `#` rock (blocks), `x` thorn) and `b5_c6_dissent` (the road south-west: `.` road, `,` grass, `#` wall, `c` abandoned cart).

**Art (`86b`):**
- **Figures:** `b5_c6_whitefinder` (a Whitefinder soldier with the fingertip on the boss), `b5_c6_drillsgt` (the old drill-sergeant), plus the shelf's Edur, unblooded, Jheck and wraiths.
- **Backdrops:** redraw `b5_branskeep`; `b5_c6_eve` (the army's fires across the field at night, the keep's towers, the lake); `b5_c6_pillars` (dark pillars rising over the left and centre, seen from across the channel, very far); `b5_c6_break` (the right breaking over the channel, a pillar's shadow on the field); `b5_c6_barrow` (a long mound being raised on the field at night, torches, from the hills).
- **Item art.**

## Chapter 7: "The Seventh Closure" (`87`, key `emperor` | `paid` | `ledger`) and the end of Book Five

**Spine** (§7.3, novel ch 22, 24–25).
- **The night:** the Sixth comes into Letheras after Brans Keep with the broken army. The city is in disorder: burned houses, looting, corpses in the streets (headline). Word: **the King has been declared Emperor** in the Eternal Domicile (heard; rule 40, belief). Tens of thousands of starlings round the Azath (seen over the roofs).
- The City Garrison's bell-stations call the soldiers who are left. Finadd Ennic, wounded, puts what is left of the Sixth at **a footbridge over the Quillas Canal by the Low Walk, in the Drownings District**, two streets from where the sergeant was born (Claude's call; never Main Canal, never Soulan Bridge, never Moroch's bridge).
- **The day:** citizens stand on the walls and wager on it. The Edur come down the west road. **The Jheck run in the streets as wolves** (fought; never B'nagga, never the Pack's temple). Word along the canal that **a Finadd held the main bridge and fought the Emperor, and both fell, and the Emperor rose**: belief, either way. Settle Lake freezes with a thump somebody hears (one line; never why).
- **The sorcery:** the K'risnan's sorcery comes down the streets and kills soldiers and watching civilians, even indoors. The squad sees it tear down a street toward the barricade with the lamps going out ahead of it, and **goes into the canal under the footbridge** (Claude's call): the swimmers take the others down the Low Walk's steps and under the arch, and hold. Then it stops: the Emperor orders the killing stopped, and decrees a day of suffering. **Never describe what that day holds** (canon doesn't).
- **The fall:** no formal surrender is recorded, so the squad's choice is its own: an Edur patrol at the Low Walk in the evening, and the roads. The Chancellor swore fealty (heard afterwards). Eberict was killed in the street (heard afterwards, rumour, never the Sentinel's story).

**The squad's story.**
- The fallen's names at the fire, once each (`S.f.b5_c6_fallen`), and who carries their debts.
- On Ch5 `sign`: in the night's looting the house's strongroom **in the Counters' Quarter** burns (headline): `b5Forgive(id, Math.ceil(b5Debt(id) / 4), 'the house\'s ledgers burned')` on every debtor. On `refuse`, the clerk sits in a doorway with the paybook case on his knees all night.
- **The canal threat.** If `b5DrowningThreat()` is true, the Drownings court's men are still working, even tonight, with a list, and one of the squad's names is on it: **`b5_c7_court`** (below). On Ch1 `pay`, `b5_c1_receipt` shown to them turns them away (a wits check, DC 13, the sergeant +2) without a fight. On Ch1 `swim`, they know Thegg's face: "the one who swam".
- **Into the canal:** a might check (DC 14) for the squad's swimmers to bring the rest under. The sergeant has the edge (+2); on Ch1 `swim`, Thegg leads (+2: four lungs, and he has been under once with 300 docks on him); Brune +2, Pessa +2. No one dies: a "yes, but" loses armour or kit to the canal (the army's ledger will want it back: `b5Owe(b57Who(), 15, 'kit lost in the canal')`), or leaves someone rattled for the next fight. Set `S.f.b5_c7_canal = 1`. If the green ash (`b5_c3_ash`) is carried, it goes in the water here.
- **Fights** (levels 7–8):
  - **`b5_c7_looters`** (optional): looters in the night streets (`b5_deserter` ×3, `b5_deserterbow` ×1, a writer's `b5_c7_looter`, kind `thug`). About 120 xp.
  - **`b5_c7_court`** (only on the canal threat, optional): the court's men (`b5_collector` boss, `b5_bully` ×3), non-lethal. About 120 xp.
  - **`b5_c7_wolves`** (main): Jheck wolves loose in the Drownings District (`b5_jheck` ×4, a wave of 2), on the Low Walk and the tiers. `stage2` **the footbridge**: two more and the pack's biggest (writer foe `b5_c7_greatwolf`, kind `b5_jheck`, boss). About 170 + 80 xp.
  - **`b5_c7_barricade`** (main): the Edur at the barricade before the sorcery (`b5_edur` ×3, `b5_unblooded` ×3, `b5_wraith` ×2). `stage2` **the Low Walk**, until the sorcery comes. About 180 + 90 xp. Not mortal.
- **No fight at the patrol.** The roads are chosen, not fought.

**The ending `b5_c7_key`** (the road), at the Low Walk in the evening, with an Edur patrol at the end of the street and the squad wet to the bone. All three are open to every squad; the fates read the debts.
- **`emperor`**: lay down arms to the patrol in the street and be taken back into the army, which is the Emperor's now. **The paybooks don't change**: the debts stand, in the same books, under new seals. The road to Book Seven. Ennic swears with the rest.
- **`paid`**: lay down arms and take discharge. The squad spends every dock in hand on the debts, smallest first, so the most soldiers go free (`b5Pay` in order). Then every soldier whose standing is `easing` or `free` gets the army's release, which forgives the rest (`b5Forgive(id, b5Debt(id), 'the army\'s release at discharge')`: Claude's call: the army bought the debts cheap and has had its money back). Everyone else walks out of uniform still owing, in Letheras. No road onward.
- **`ledger`**: out of the ledger. The squad slips away along the canal before the patrol reaches it, and Ennic writes them into the dead roll of the fall in his neat hand (the clerk watches, and blots it). **Listed dead, their debts pass to the heirs**, as the army's rule says (each soldier's heirs are in the table below). No road onward. Desertion is never named on the page as anything but "the dead roll".
- **Keep-open, for all three roads' words** (rules 31–44): no RG ground or names; Tehol is a ruined man and never king; Bugg is a builder; Brys is dead to those who saw it; Rhulad is the Emperor who comes back, nothing of his sword; no Patriotists; the Edur fleets abroad are at most one line of rumour, in the finale only, on `emperor`.

**The heirs** (fixed, for Ch6's dead and the `ledger` road):

| Soldier | Whose debt it was | Who carries it on |
|---|---|---|
| the sergeant | the family's, father to mother to you | a cousin two streets back from the Quillas |
| Tobet | his grandfather's plough | his family on the tenant farm, Indebted again |
| Thegg | his mother's tavern tab (she is dead) | nobody living: the tavern writes it to a dead woman's dead son, and the clerk says that is a ledger nobody can collect |
| Perrit | the cadre school's lent fees | her father, a clerk in the Pursers' District |
| Ammet | the cutler's note for her tools | the cutler takes the tools back; the note dies with her name |
| Ruuk | his clan's winter grain | his clan in the Faraed hills |
| Brune | the harbour master's boat | her village on the coast |
| Pessa | the press-gang's chit | nobody: her name is spelled wrong, and her husband is gone |

**The finale** (`B5CH7.finale`): read `src/37_chapters.js` (`finPages`, `showFinale`), Book Two's `src/54_b2_ch7.js` and Book Four's `src/77_b4_ch7.js`.
- The road taken.
- **A fate page for every squadmate and every recruit**: alive and walking, alive and waiting, sent away, or fallen at Brans Keep. Each page says **what that soldier's debt became** (`b5Standing`, the numbers, the holder: the army or the house, and on `ledger` the heirs) and one line of the book's road for them (High Fort, the canal, the channel).
- A page for the fallen at Brans Keep: buried with the Edur dead in the barrow the Emperor ordered (Claude's call, from canon's "buried together"), and who carries their debts.
- The count (`debtHTML`, docks paid down, owed on top, soldiers paid up), and the sergeant's page.
- The coda: the Edur in the city; the belief that the Closure has come (rule 40); the canal running under the footbridge as it always has; the paybooks.
- Credits to Steven Erikson and Ian C. Esslemont.
- "The End of *Indebted*" (the engine's default endline), and the role "Sergeant · Sixth Company, the Whitefinder Battalion".
- `finale.labels` overrides the book words.
- **A finished save on `emperor` is the one Book Seven will offer** (no code now).

**Trick:** *The Holed Dock* (`b5_c7_dock`), at the Low Walk after the sorcery stops: canal children drop a holed dock into the Quillas for the drowned, and keep its twin, and the Errant (as Lether prays to him) is said to remember who keeps one: ✦ guile 16. The sergeant has the edge (+2, canal-born), Pessa +2, Brune +1, Tobet +1, Perrit −1. **Mechanic: the Lady's Pull** (`pull`, `t_pull`): a chapter trick, twice a chapter (one more from level 5): after a failed check, roll it again; or before an attack, roll twice and keep the better; the next check is −2. Words: the dock spins on its edge. Not sorcery. Carried to Book Seven.

**Items:**
- `b5_c7_dock` (*A holed dock from the Low Walk*; trinket, `role:'any'`, `stat:{guile:1}`): the twin of the one that went into the canal. Look: a worn copper dock with a hole bored through it, on a wet cord.
- `b5_c7_lamp` (*A canal lamp off the Low Walk*; trinket, `role:'any'`, `hp:3`): out, and still in the hand afterwards. Look: a small iron lamp with a horn window, green with canal water.
- `b5_c7_ledgerpage` (*The Sixth's page from the paybook*; trinket, `role:'any'`, line only; on `ledger`): torn out by the clerk and handed over without a word. Look: a single ruled page, columns of names and numbers, a line through every one.

**Tiles:** the lean tile is the Gate (`B5POOL[7]`). **Reading place:** Letheras, a barricade by a canal: cracked stone, a torch, a dock and a knife (`mt:7`), on the night before the Edur come. Without Perrit, the tile-woman has come down to the Low Walk with the company's followers.

**The fire:** `b5_c7_fire` (the brazier at the footbridge barricade; no game; the roads). `ROSTER_FIRES.mt[7] = ['b5_c7_fire']`. The pay desk is `b5_c7_pay` (it matters on the `paid` road; say so on the button).

**Hard limits (Chapter 7; §9).**
- **Never Moroch's bridge or the duel.** Never Main Canal, never Soulan Bridge.
- Never the Pack's temple (the Fulcra temple), the swamp bank, the cavern under Settle Lake, or Settle Lake's bench. The demon under Settle Lake is never seen.
- Never Tehol's house and roof, the street outside it, or the warehouse. Never the Eternal Domicile, the hall outside the throne room, or the throne room. Never the Azath or its barrow, the crypt under the river, Seren's house, anywhere Mayen runs, or the wall where Bugg stands.
- **The squad never meets** Brys, the Ceda, Rhulad, Trull, Fear, Mosag, Tehol, Bugg, Eberict, Hull, Udinaas, Seren, the Azath's child or Iron Bars. At most, "a pale giant and a girl seen leaving the city" (rule 38), and only if it is needed at all.
- Never what the day of suffering held. Never the Errant turning the sorcery (R25): the canal saves them, and the narrator gives no god the credit.
- Never RG ground in the roads (rule 43): no western gate, Kravos Hill, Merchant Tolls, the Chamber of Contracts, the Patriotists.

**Ground:**
- `b5_c7_streets` (the Drownings District at night: `.` paving, `,` rubble, `#` burned house (blocks), `c` overturned cart (blocks), `F` brazier);
- `b5_c7_canal` (the footbridge and the Low Walk: `.` paving, `,` steps, `~` canal (blocks), `=` barricade (blocks), `-` the footbridge, `a` the arch (the way under, a trigger));
- `b5_c7_walk` (the Low Walk at evening, for the roads: as `b5_c7_canal`, quieter).

**Art (`87b`):**
- **Figures:** `b5_c7_looter`, `b5_c7_greatwolf` (a Jheck wolf, too big), `b5_c7_courtman` (the Drownings court's man with a list), `b5_c7_patrol` (an Edur patrol at the end of a street, far: silhouettes).
- **Backdrops:** redraw `b5_letheras`; `b5_c7_night` (the city in disorder, fires over the roofs, starlings round a dark tower); `b5_c7_walls` (citizens on the white walls watching the west road); `b5_c7_sorcery` (a darkness coming down a street with the lamps going out ahead of it, the barricade in front: no figures caught in it); `b5_c7_under` (under the footbridge's arch, green water, light on the stones above); `b5_c7_finale` (the Low Walk at dusk after the fall, the canal, the squad small on the steps).
- **Item art.**

## Machine limits

The workspace has 2 CPUs and 7 GB.
- **Every Playwright run goes through one lock:** `flock /tmp/claude-0/pw.lock node tools/play.mjs …`, and the same for any script, contact sheet or test that launches Chromium.
- **Run `tools/run_all.mjs` only at the end of the chapter session**, detached (`setsid nohup … > /tmp/claude-0/runall-b5.log 2>&1 &`), and poll the log.
- Close every browser you open; never leave a server running.

## Done in the engine (Wed Oct 28, 2026, 4:11 PM PDT)

These were the brief's engine needs; they are in `src/80_book5.js` and the tools now, tested in `tools/b5engine_test.mjs`, and listed in `docs/v8.0-notes.md`. **Use them; do not define them in a chapter file.**

1. **`b5Disarm()` and `b5Rearm(fallback)`** (Ch 4 `hold`, Ch 5). `b5Disarm()` moves every `weapon`-slot item off every soldier and out of the kit into `S.f.b5_stash` (ids), and sets `S.f.b5_disarmed = 1`; base attacks still work ("knives and staves"); armour and trinkets stay; a second call changes nothing. `b5Rearm(fallback)` clears `b5_disarmed`, gives back what was stashed (to whoever wore it), or the `fallback` item ids that exist if the stash is empty (a fresh `--from=5` save), and sets `S.f.b5_rearmed = 1`. Nothing else in the kit is touched.
2. **`FOES.b5_regular`**: a Whitefinder regular as an ally (kind `b5_letherii`, 15/13/4, 1d8+1, grown by level as `b4_regular` is), in a fight's `allies:[['b5_regular', x, y]]`, for fights with the battalion in Ch 4–7. A chapter may still add its own (Ch 4's `b5_c4_garrison`).
3. **`b5PayChoices(back)`**: the shared pay-desk choices (for each debtor, "10 docks" and "All we can" through `b5Pay`, back to the desk; then "Not now." to `back`). A chapter's `b5_c<K>_pay` is `() => ({sp, txt, html:debtHTML('…'), ch:b5PayChoices('b5_c<K>_fire')})`.
4. **`SYNTH_MT` in `tools/play.mjs`**: from n ≥ 3, Brune walks; from n ≥ 4, Ruuk waits (in `S.camp`); from n ≥ 6, Pessa waits; on n = 5 after `b5_c4_key = 'hold'`, `S.f.b5_disarmed = 1` (and `b5_rearmed = 1` from 6); from n ≥ 6, `S.f.b5_holder` from `b5_c5_key` (`sign` → `'house'`, else `'army'`); on n = 7, `S.f.b5_c6_fallen = []`.
5. **`tools/recruit_scan.mjs`** `BOOK.mt.rec`: Brune `from:2`, Ruuk `from:3`.
6. **Comments and notes:** 80's `B5_RECRUIWed Oct 28, 2026, 4:11 PM PDT` and recruits comments, the v8.0 notes' recruit rows and `GLOSSX.mt`'s chapter numbers (the Faraed row 3, the Shake row 2) match Brune in Ch 2 and Ruuk in Ch 3. Flags and unlocks are unchanged.
7. **Ruuk's `bio2`**: "a few docks at a time".

## Claude's calls (for David to overturn)

1. **Brune joins in Chapter 2, at Trate; Ruuk in Chapter 3, at Kraig's Landing.** Brune's own bio has her hired on at Trate by the Sixth on loan to the harbour, and the Shake are a coast people: the wreck is her scene. Ruuk's people are the northern hills, the army's Faraed scouts are on the frontier in ch 15, and his work is roads, which is what the march to High Fort needs. The plan had Ruuk Ch 2–3 and Brune Ch 3.
2. **Why the Sixth is in Letheras:** it came south with the battalion's sick and its paybooks for audit and kit, while the battalion went to its summer exercises.
3. **Thegg is the one fined**, for assault without cause after the pit-town brawl over his mother's tab: 300 docks, canon's fine for a man. **His mother is dead**; her tab passed to him as her heir.
4. **`pay` puts 300 docks on five paybooks** (80/60/60/60/40) and leaves everyone just short of pressed, on purpose. **`swim`: Thegg swims and lives**, for a court's fee of 40. He swims; he never walks the bed.
5. **No new named people** in Book Five but Finadd Ennic (already checked). The clerk, the quartermaster, the tile-woman, the factor, the rope-man, the pilot and the drill-sergeant are unnamed.
6. **Ennic lives to the end**, wounded at Brans Keep, and writes the `ledger` road's dead roll.
7. **A few wraiths stayed in Trate's hulks**: the squad's first sight of Edur sorcery.
8. **`warn` is a runner to the Nerek upriver** (Ruuk, or Tobet), too late, never the canon scout; the narrator never says whether anyone got out. The regiment fines the sergeant 30.
9. **Perrit is not one of High Fort's eleven mages.** Unlinked, she lives when the linked die, and is never called the last mage.
10. **`hold` is disarmed, `run` keeps its weapons** (and fights the Jheck in the western wood). Hence the disarm and rearm helpers.
11. **The ledger key is a Letheras counting-house's factor** buying soldiers' paybook debts for kit: +40 docks, better kit, 10% interest, and the Ch1 fine at half on `pay`; on `refuse` the house's men come for the paybook.
12. **The King's bounty for the stand**: 30 docks off every walking soldier's debt on the eve of Brans Keep.
13. **`stand` holds the crossing on the dry channel as the battalion breaks** (the mortal fight, Edur warriors and unblooded only); **`fallback` goes toward Dissent** (Jheck and wraiths, not mortal).
14. **The fallen at Brans Keep are buried in the Emperor's common barrow** (inference from "buried together").
15. **Chapter 7 is at a footbridge over the Quillas Canal by the Low Walk**, and the squad survives the K'risnan sorcery by going into the canal.
16. **The roads' debts:** `emperor` keeps the books; `paid` spends the docks smallest-first and releases the half-paid; `ledger` is the dead roll, and the debts go to the heirs in the table.
17. **The house's strongroom burns in the night's looting** (on `sign`): a quarter of every debt is forgiven.
18. **The tricks** each copy one existing mechanic: the Rope's Way, the Long Listen, the Claw Hand-Cant, the Oil Bola, the Rhivi Spirit-Song, the Line and the Lady's Pull.
19. **The games** and their pay (the table above); the Wager Board is headline only.
20. **The docks economy:** 25–40 docks a chapter plus the game; salves at 6; a "yes, but" debt of 5–20 docks on the roller, never into `drowning`, and no more than a third of a chapter's costs.
21. **Later chapters read the key flags directly** (`S.f.b5_cK_key`): no mirror flags.
22. **Item art on a dark canal-slate ground with a dock-gold rim.**
23. **No separate art brief**: the shared artists' rules here cover Book Five.
