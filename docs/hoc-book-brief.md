# Book Four: *Unblooded*, the book brief (Chapters 1–7)

Tue Oct 20, 2026, 11:05 PM PDT. Against the Book Four engine on branch `book4` (bb1d8ff onward; v7.0.0, not shipped). This is the standing work order for every chapter of Book Four, beside *House of Chains*.

**How the chapters are built.** Book Four is built **one chapter a session**, writer first and artist second, on the `book4` branch (`ashes-of-the-pale/series-build-prompts.md`, sessions 6–12). A writer can read the chapters before theirs, but **this brief fixes every key, flag, item id, trick, reading place and fire in advance, so honour it exactly.**
- Set the flags your section says to set.
- Read the flags earlier sections promise, with a sensible default when one is unset: `play.mjs --from=K` starts and transfers vary.
- Invent nothing a later chapter would have to know about without writing it into your chapter notes.
- If an earlier chapter, as written, differs from this brief, the code is what shipped: follow the code and say so in your notes.

**The owner's standing wishes** (the project instructions):
- Every book plays on its own.
- Every chapter has a Deck reading with a vision through canon eyes (the visions come in their own pass, `78`), a trick behind a hard check, two to four new items each with artwork, and a key choice with consequences later.
- Every onward step is declinable ("Not now").
- Every check carries a scene-fitting "yes, but" cost (silver only where money is the scene).
- The map UI stays clean: rings on trigger tiles and edge arrows only, no floating labels.
- Backgrounds match the dialogue (place, time, who is present).
- "Not a game for kids, … nothing lurid": the darkest canon is headline only.
- Accuracy to canon across the whole series.
- Obtainable squadmates are acknowledged whenever they are with the party (the recruit rule, playbook §6).

## Shared rules (writers)

**Read first, in order:**
1. `docs/hoc-canon.md`, the sourced canon sheet.
   - **§4 and §9 (the hard limits) are binding, and so are §5 and §10 (keep closed).** Also `docs/series-canon.md` §(a), rules 1–30.
   - In short:
     - The squad is never in a scene canon gives to named people. That covers the marines' squads (Strings's 4th, Gesler's 5th, Borduke's 6th, Balm's Ninth), Cuttle's blast, Grub's walk-on, the first crossing of the ford, the barrow trap, Gamet's rescue, the Wall's withdrawal, the rite, the ghost ride, the duel, the sandstorm, and anything inside the Whirlwind's camp.
     - The squad never meets Kalam, Quick Ben, Karsa, Leoman, Corabb, Sha'ik, Heboric, L'oric, Pearl, Lostara or the Liosan.
     - The Adjunct is seen from a distance and never knows who Sha'ik was (David's ruling).
     - Never print a Burn's Sleep year, the never-use names (§(a) rule 13), "Bonehunters", "3rd Company" or "Dancer's Tavern". **Rule 13 includes Topper and the Talon:** write "a Claw out of a warren" and "Dom's killers" (found by Chapter 2's writer).
     - Grub is a small boy and nothing more.
     - Temul's youths are "some forty".
     - Never say why the Khundryl's tears are black.
     - Duiker's tree is empty, and nobody knows why.
     - Topper's news is belief, never narration.
2. `docs/v7.0-notes.md`, Book Four's engine: every helper, flag and table you will use. Then `src/70_book4.js` and `src/70c_b4_deck.js`. The "For chapter writers" section is your toolbox:
   - `b4Nerve`, `nerveHTML`, `b4Mood`;
   - `S.dust`, `def.dust`, `def.company`;
   - `b4Join`, `b4SwapIn`, `b4Offers`, `b4In`, `b4Was`, `b4Fresh`, `b4Fallen`, `b4FallenNames`;
   - `B4DECK`, `b4DeckChoice`;
   - `b4Rest`, `def.away`, `def.hurtMost`, `def.lastStand`, `mortal`;
   - the `b4_regular` ally, and the placeholder backdrops.
3. `docs/moi-book-brief.md` and `docs/dg-book-brief.md`: how Books Two and Three were built (schema, areas, fights with `stage2`, keys, tricks, tests). Everything there holds unless this brief changes it. Translate `b3_` → `b4_`, the Alliance → Nerve, and the Fourth → the Third.
4. **The squad's own voice.**
   - Book Two's chapters `src/48_b2_ch1.js`, `src/53_b2_ch6.js` and `src/54_b2_ch7.js`, and `docs/dg-continuity.md` (each squadmate's arc, and where Book Two left them).
   - Book Three's `src/61_b3_ch1.js`, for a level-8 chapter's shape.
   - The Third are old friends to a player who carried them across. To a fresh player they are veterans of a disaster. Write them as the same people, a season older and quieter.
5. The engine files every chapter leans on:
   - `src/16_skill_checks.js` (`talk`, `check`, edges, tiers);
   - `src/16b_tricks.js` and `src/31b_tricks_in_battle.js` (tricks);
   - `src/31c_stakes.js` (`battleDef`, `stage2`, waves, objectives, hold-outs);
   - `src/14_data.js` (`registerChapter`).

**Voice.**
- Short paragraphs, dry soldier humour, grimdark restraint, and no exclamation marks in narration.
- The sergeant is second person, gender never stated; write `{sgt}` for the sergeant's name. Italics are `*asterisks*`.
- **The trope budgets bind from the first line** (playbook §6). Rates per 10,000 words:
  - "the way a man…" similes: 5
  - silence beats ("says nothing", "doesn't look at you"): 9
  - sentences opening on Nobody/Somebody: 14
  - "a long moment": 3
  - "as if it were" and "a man who has": 1.5 each
  - "which is how you know": 1
  - "her eyes stay on": 0.6
  
  Hard caps per book: "weather" (as a simile) 3; "goes unsaid" 2. **Run `node tools/trope_scan.mjs --files` on your chapter before reporting**, and fix any hit by cutting it, making it concrete, saying it straight or naming who. Never trade one tic for another.
- Canon characters speak in their own voices:
  - Blistig: sour, sure the army is finished.
  - Keneb: careful, tired, a family man under a rumour.
  - Gamet: an old soldier, kind, guilt-ridden.
  - Temul: a boy carrying a man's command.
  - Gall: grief worn as pride.
  - Tene Baralta: hard, Red Blade.
  - The Adjunct: few words, plain, cold iron, always at a distance.
- **The squad's voices:**
  - **Haddat** (Hissari auxiliary; the blue shield): formal, polite in two dialects, says the names of the dead at night. Ilhar's end is `b4Was('b2_ilhar')`.
  - **Tangle** (sapper): superstitious, counts the satchel twice, fuse-cord round both wrists, a Kanese prayer bead. Mincer's man.
  - **Marrow** (Denul healer, older, Napan): "child", a knotted string, dry as bone. The warren is still strange in Seven Cities.
  - **Sathi** (Weasel Clan outrider, filed teeth, Hackle): laughs at funerals, rides. She may be dead: on a fresh start she is.
  - **Tallow** (he, 18, the Quon coast): raw, frightened, brave about it, talks too much. Reads from his grandmother's deck: "she read for fishermen; they mostly came back".
  - **Hessa** (she, 31, Kartool City): a temple door guard of D'rek who left. Square, patient on the outside, not inside. Dry about worms and gods.
  - **Tebbet** (he, 26, Dal Hon): a hill bowman of few words, who "would rather be a long way off when it happens".
  - **Darrut** (he, 34, Aren's Old Quarter): Aren Guard, one of the few who followed Blistig. Seasick, practical. "I was on the wall. That is all I will say about the wall."
  - **Orvas** (he, 23, Khundryl Burned Tear): proud grief. The black tears are tattooed, and he never explains them. "We are not Wickans, but we shall strive to be" is Gall's oath, not his, so let him quote it once at most.
  - **Ramin** (Red Blade) and **Keth** (Wickan warlock and his grandmother's second voice), transfers only, as Book Two wrote them.

**Your files.**
- `src/7K_b4_chK.js` exports **`B4CHK`** (Ch1 = `71_b4_ch1.js`/`B4CH1` … Ch7 = `77_b4_ch7.js`/`B4CH7`). `src/90` already registers it; don't edit 90. Use `number:'One'` and so on.
- Your art goes in `src/7Kb_b4_chK_art.js`.
- **Every id carries `b4_c<K>_`**: nodes, areas, fights, foes, items, scenes. Flags are `S.f.b4_*` as named below; shared flags have no chapter infix.
- Never reuse an engine id (`b4_regular` and the rest).

**Size.**
- About Book Three's chapter size: 60–80 nodes, three or four areas (16×12, `walk`, `triggers`), three or four fights, each main fight with a `stage2`.
- **Levels:** Book Four starts at 8. The squad should be about level 9 after Ch1, 10 after Ch2, 11 after Ch3, 12 after Ch4, 13 after Ch5 and 14 after Ch6, and finish at 14–15 (`play.mjs` starts Chapter K at level K+7).
- Enemies carry `B4GAP` per chapter. Don't change it: balance is step 14 and goes to David.
- Check your fights with `tools/balance.mjs` (a scratch `--patch`; don't change the tool). Smart Soldier play should win every fight, and Bridgeburner should be hard. **Write the numbers in your notes; change no rule.**

**The key choice** is `S.f.b4_cK_key`, with the values in your section (already in `B4KEYS`; don't change them). Pass it to `chapterEnd(K, key)`, with an `end` entry for each value. Each key has a consequence a later chapter reads (named in the sections below).

**Nerve** in every chapter:
- Choices trade Nerve against the squad's own good, through `b4Nerve(d, why)`.
- At least one node shows `nerveHTML()`.
- At least one fight brings the company: `def.company`, regulars of the 9th, who stay or break by Nerve.
- Nerve falls with omens, bad news, raids and the dead, and rises with steadiness, the squad standing by the company, the Khundryl, and rest.
- Keep each chapter's net change between −2 and +3 on a middling path.

**Dust** from Chapter 5 (`B4DUST`; the engine sets it). Write it into every scene: the light, the grit, the shortened sight. Never let it become the weather tic.

**The Deck.**
- Fill `B4DECK[K]` from your file (`{scene, where, set, back, backT, say:{marrow, tallow, oldninth}}`) and put `b4DeckChoice(K)` among the first halt's choices.
- Register `b4_cK_deck` and `b4_cK_card`.
- The reading's words must suit your chapter and all three readers (Marrow, Tallow, the old soldier of the 9th). The table is `READTABLE['hoc:K']`, already drawn (the places are in your section).
- The lean card is in `B4POOL[K]`.
- The vision is the visions pass's; a reading only opens it.

**A trick** every chapter, behind an optional ✦ hard check (DC 15–17), defined in your file (`Object.assign(TRICKS, {b4_cK_…})`, plus an `AB` entry if it has a battle half; Khundryl or Wickan craft gets `spirit:true`). Each section names its trick and its id; you may tune the effect, but keep the id and the name. Lore-based: the check names what the squad knows.

**Kit.**
- Two to four new items (`CH.gear`) with the ids your section gives; at least one has its own small effect.
- **Every item has artwork:** your artist draws `ART['item/<key>']` in the established item style, on a sand-and-iron ground for Book Four. The lint fails any item without it.
- Silver is the money; the 9th's quartermaster sells (unnamed: no canon quartermaster exists in HoC, and Pores is a lieutenant).

**Squad lines.**
- Branch by roller on `haddat`, `sathi`, `tangle`, `marrow`, `tallow`, `hessa`, `tebbet`, `darrut`, `orvas`, `redblade` and `warlock`, always with a `_` default. Any of Book Two's four may be dead (on a fresh start Sathi is), and any of the new soldiers may be absent (a full transfer brings none of them).
- **Text must read right with any squad.** Use `b4In(id)` guards, and never count heads in words without checking.
- Edges favour the right squadmate:
  - Haddat: Seven Cities, its people, tongues and water.
  - Tangle: munitions and sappers.
  - Marrow: wounds, the sick, the warren and the Deck.
  - Sathi: horses, riding, the Wickans and dogs.
  - Tallow: the raw recruits, luck and the Deck.
  - Hessa: the shield line, temples and gods.
  - Tebbet: the bow, the far view and hills.
  - Darrut: Aren, the Guard, gates and drill.
  - Orvas: the Khundryl, horses and grief.
  - Ramin: Red Blades and lances.
  - Keth: spirits and the Wickans.
- **The recruit rule.** A recruit walking with the squad gets a line at the fire, at the key choice, at the chapter's end, and in the scenes that are theirs. Don't repeat one gesture forty times. `tools/recruit_scan.mjs` already knows Book Four.

**The fire.** Every chapter has a fire node, a hub with an `again:` line. Its id is in your section; the games pass (`79`) wraps it, so keep the id exactly. It offers:
- the swap (`b4Offers()`);
- a rest;
- the squad's talk (one line per squadmate present);
- the way on, with "Not now".

**Recurring inventions** (shared by every chapter; use them, don't contradict them):
- **The 9th's company.** The squad's company is the 9th Legion's **Second Company** (never "3rd Company"). Its captain is **Captain Hollet**: a thin Genabackan with a cough who used to keep a garrison's books, decent and frightened of Blistig. Its **Sergeant-of-the-line is Radde**, a bald Falari who has seen two wars and says so. The recruits round the squad are raw Quon boys and girls, and the Second Company's regulars are the `b4_regular`s. **These names (Hollet, Radde, the Second Company) are Claude's call**, checked in step 5: no Malazan match found for Hollet or Radde (supported only; rows in `series-canon.md` §(b)). Radde was rejected as too near Osric, L'oric's father, in this very novel.
- **The bones.** From Chapter 1 every soldier wears a finger bone the same way, by the Adjunct's order. Ours wear one too, whether from the graveyard or from the Chain (the Ch1 key). It is joked about and carried, and **never called by a later name**.
- **The standard.** A thin figure holding up a bone before a sandstorm, raised on the Aren Way (Ch2), seen at a distance at the column's head.
- **Grub** walks beside the wagons in the hottest sun (Ch4, the novel's epigraph), always far off.
- **The relic sellers.** Aren's markets sell Chain "relics", pieces of Coltaine among them (canon). They are the squad's shame and anger in Ch1, and Haddat's above all.
- **Book Two's dead.** Every chapter has one quiet line for one of the Barrow dead (`b4Fallen()`): on a fresh start Sathi, and Hackle's absence. Never more than one a chapter, never maudlin.

**Engine changes** go in your own chapter file, guarded by `S.book === 'hoc'`, or are reported to the lead. Never edit `src/70*`, another chapter's files, or any Book One, Two or Three file. If the engine truly lacks something, add it in your file and say so in your report.

**Continuity.** Write `docs/hoc-chK-notes.md`:
- the key values and what each changes;
- every flag later chapters may read, with its values;
- the named inventions;
- anything left open on purpose;
- the canon points you were unsure of;
- the fights' xp and balance numbers.

**Tests** (all must pass):
- `python3 build.py`;
- `node --check` on your files;
- `node tools/lint.mjs` with 0 errors;
- `node tools/play.mjs 3 --book=hoc --from=K` 3/3, and `node tools/play.mjs 1` (Book One) 1/1;
- `node tools/repeat_scan.mjs` (your hubs read `again` or fold);
- `node tools/trope_test.mjs`, `node tools/recruit_test.mjs`, `node tools/b4carry_test.mjs`;
- **a chapter test, `tools/b4chK_test.mjs`**, that walks the chapter's halts, both keys, every fight's start and win, the trick and the fire, from a fresh start and from a transfer with Sathi alive and Ramin walking.

**Commit to `book4`**, but don't touch `sw.js` or `src/10_preamble.js`.

**Report** (under 500 words): what the chapter contains (areas, nodes, fights and xp, the key and its consequences), the flags set, file sizes, the test numbers, any edits outside your files, and the canon points you were unsure of.

## Shared rules (artists)

**Your file and what to study.** Your file is `src/7Kb_b4_chK_art.js`: figures, ground, backdrops and item art. Study the established art and match it exactly in scale, palette, line weight and light:
- `src/18_figure_sprites.js`, `src/19_portraits.js`, `src/25_tiles.js` and the scene file;
- Book Two's `src/47b_book2_art.js` and `src/5*b_b2_*_art.js` (Seven Cities);
- above all Book Four's own `src/70b_b4_title.js` and `src/70d_b4_cards_art.js`, with its five new soldiers.

**Hooks:**
- `FIGX[kind]`, `POR[id]`
- `TILEX[style]`, or wrap an existing style
- `SCENEX[kind]`, with `sceneLayer` caching and `REDUCE()` respected
- `ART['item/<key>']`

**Replace the placeholder backdrop your chapter owns.** The ones named in your section borrow Book Two and Three drawings until you redraw them.

**Already drawn and free to use:**
- Book Two's Seven Cities sprites and grounds (Wickans, Red Blades, Seven Cities warriors, desert, river, city).
- Book Three's shelf.
- Book Four's `b4_regular` (Book Two's soldier).

**Your names** carry your chapter's infix (`b4_cK_…`). **Register a simple placeholder for every name in your list in your first few steps** so the writer's tests run, then replace each with finished art.

**Look at your work.** Make Playwright contact sheets (`executablePath:'/opt/pw-browsers/chromium'`) in `/tmp/claude-0/shots/b4/chK/`, side by side with the shelf art, at phone width.

**Limits and tone.** Keep the file under about 150 KB. Treat anything grim at a distance, in silhouette: suggest, never linger (the crucified trees are empty, Coltaine's Fall is pilgrims' tokens, the ford's bones are a dark bank under water, the ghost ride is light and dust).

**Finish with** `python3 build.py`, `node --check` and `node tools/lint.mjs`. Report in under 300 words: what you drew, the file size, the contact-sheet paths.

---

## Chapter 1: "The Muster" (`71`, key `grave` | `chain`)

**Spine** (canon §1.1, novel ch 8). Aren, two days before the march.
- The Adjunct reviews a Fourteenth in disorder on the marshaling ground. Cuttle's munition goes off in the cobbles: the squad is in the 9th's line across the ground, and sees the flash and hears it.
- Grub walks out with a thighbone and the army calls it an omen (heard at a distance).
- The squads raid the cemetery for finger bones, and the Adjunct orders them worn uniform and a standard made.
- The Red Blades seize the drink. 300 Crow Wickans come by ship. Lenestro is dead (camp talk).
- Mallick Rel and Pullyk Alar have left the city together (rumour). Pullyk "will remember your face" from Book Two: on a transfer with `b2_nobles7`, a line about the empty house.

**The squad's story.**
- The Third are posted into the 9th Legion's **Second Company**; set `S.f.b4_company = 1`.
- They meet Captain Hollet and Sergeant Radde, and the raw recruits. Darrut and Tallow are among them where the fill brings them, and the fill order explains who is new.
- Blistig, seen grumbling at his officers (`S.f.b4_blistig = 1`).
- The relic market: a stall selling "Coltaine's finger". Haddat (or Darrut), and a choice: buy it to bury it (−silver, Nerve +0, Haddat +1), break the stall (a check; a "yes, but" with the Red Blades), or walk on.
- **Transfers only:**
  - Ramin is among the Red Blades on the drink sweep, if `S.imported.ramin`. Offer `b4Join('redblade')` or "near" (flag 2).
  - Keth is on the quay when the Crow ships come in, with Temul's youths, if `S.imported.keth`. Offer `b4Join('warlock')`.
  - One recruit walks at a time; the other waits.
- **Fights:**
  - **The graveyard at night:** relic thieves digging Chain graves, the squad's own dead among them (fresh start: unnamed Chain dead). Thieves and their hired toughs, a `stage2` in the bone-pits.
  - **The harbour:** durhang runners at the 9th's barracks gate, with the company (`def.company`).
  - **The key fight.**

**Key `b4_c1_key`.**
- **`grave`**: take a bone from the old graveyard like the rest of the Fourteenth. The company takes the squad in as its own (Nerve +2, `S.f.b4_bone = 'grave'`). Marrow and Haddat say nothing kind. The key fight is the graveyard fight's second night, guarding the diggers.
- **`chain`**: wear something of the Chain's dead instead (Haddat's blue thread, Marrow's knotted string, a Crow feather from the Fall's pilgrims, or a keepsake: `b4Was('keepsakes')`). The squad is set apart as Coltaine's, watched, half-resented (Nerve −1; Haddat, Marrow and Sathi +1 loyalty; `S.f.b4_bone = 'chain'`). Radde notes it in his book. The key fight is the Red Blades' sweep turned ugly, when recruits who want the drink back turn on the "Chain dogs": a brawl, non-lethal, and an objective fight.
- **Read later:** Ch2 at the Fall, and Ch7 when the dead ride (on `chain`, the Barrow dead's line knows the token).

**Trick:** *The Gate Drill* (`b4_c1_gate`), the Aren Guard's gate drill from Darrut's old sergeant: ✦ wits 16; Darrut has the edge, Haddat +1. Once a fight, the bearer and the squadmates beside them lock shields: +2 armour, and enemies beside them can't step past until the bearer's next turn.

**Items:**
- `b4_c1_finger` (the squad's finger bone, a trinket, +1 Nerve-shaped "steady" line);
- `b4_c1_relic` (the false "Coltaine's finger" taken from the stall, a trinket: Haddat won't touch it);
- `b4_c1_redsash` (a Red Blade's cast-off sash; with Ramin it means more);
- `b4_c1_durhangpipe` (a confiscated pipe; sells, or a once-a-chapter calm).

**Deck:** the lean card is `b2c_soldier`. **Reading place:** the 9th's barracks yard at night (`READTABLE['hoc:1']`).

**The fire:** `b4_c1_yard` (the barracks yard fire; the Shells game goes here in `79`).

**Ground:**
- `b4_c1_aren` (Aren streets and the marshaling ground's edge: `.` paving, `,` dust, `#` wall (blocks), `D` door, `=` awning, `w` well, `c` cart, `s` stall);
- `b4_c1_graves` (the old cemetery: `.` earth, `,` dug earth, `#` tomb wall (blocks), `o` open grave (blocks), `x` dead tree, `F` lantern);
- `b4_c1_barracks` (the yard: `.` flagstones, `#` wall, `=` barrack roof edge, `F` fire, `b` bunk-house door).

**Art (`71b`):**
- **Figures:** `b4_c1_thief` (a relic thief), `b4_c1_tough`, `b4_c1_runner` (a durhang runner), `b4_c1_hollet` (Captain Hollet), `b4_c1_ossik` (Sergeant Radde), `b4_c1_recruit` (a raw Quon recruit).
- **Backdrops:** redraw `b4_aren_yard`; `b4_c1_review` (the marshaling ground from the 9th's line, dust, a flash far across; distant); `b4_c1_market` (the relic market); `b4_c1_graveyard` (the cemetery at night, lanterns, open earth); `b4_c1_quay` (Crow ships coming in, horses on the gangplanks).
- **Item art.**

## Chapter 2: "Coltaine's Fall" (`72`, key `fall` | `march`)

**Spine** (§1.2, novel ch 11). The first day out of Aren along the Aren Way:
- The empty spiked trees, hung with fetishes and painted soldier figures; the Adjunct forbids cutting them.
- Duiker's tree, the last on the Way, is empty. Gesler shows it, so the squad hears it second-hand, as camp talk.
- The standard is raised. The Crow elders refuse Temul.
- Topper comes by night, and the news runs through the camp by morning, Bottle's doing: Whiskeyjack, the Bridgeburners, Paran, Dujek's Host. It is **belief, never narration**. Set `S.f.b4_news = 1` and Nerve −1.
- The army camps barely past Coltaine's Fall, the hill where he died, now a pilgrims' place.

**The squad's story.**
- They march the road they ran in Book Two, the other way. The squad sees the Barrow ground from the road; set `S.f.b4_barrowSeen = 1`.
- On a transfer, `b4Was('b2_barrowHeld')` and `b4Was('b2_stay')`: who stayed there.
- Haddat says names. Tangle counts the satchel. Marrow touches a knot.
- New soldiers ask what happened here, and the squad decides how much to say (a squad scene with `b4In` guards).
- Tallow's fear after the news; Nerve and the company (`nerveHTML`).
- On the `wickans` road: Temul, refused, walks past the squad's fire without a word. Set `S.f.b4_temulPast = 1`; never his talk with Fiddler.
- **Fights:**
  - **Pilgrims' robbers on the Fall at dusk:** men stripping the memorials. Unnamed Seven Cities scavengers, and not Semk, who leave tokens too (Tene Baralta names the clans in canon).
  - **A night probe on the 9th's camp line:** unnamed tribal raiders (canon: raiders harried the column before the Khundryl; never say they were Leoman's), with `def.company`.
  - **The key fight.**

**Key `b4_c2_key`.**
- **`fall`**: climb the Fall at night with the pilgrims and leave the keepsakes and the names, losing the squad's place in the column and a rest. Haddat +2, Marrow +1, Tangle "the dead don't need the cusser" (and keeps it); `S.f.b4_fallClimbed = 1`; Nerve +1 (the company sees it, and some go up after). A Crow feather taken from the hill (`b4_c2_crowfeather`) if `b4_bone = 'chain'` wants it. The key fight is the robbers' second try, on the hill, in the dark.
- **`march`**: march past as ordered. Radde approves (Nerve +1; `S.f.b4_fallClimbed = 0`); Haddat −1. The key fight is the night probe's `stage2`, in the column.
- **Read later:** Ch7, the ghost ride (with `fall`, the Barrow dead's face is clearer), and Ch5 (Haddat's mood).

**Trick:** *The Pilgrim's Crow* (`b4_c2_crow`): ✦ guile 15 at the Fall, from a Crow pilgrim's word; Sathi and Keth have the edge, Haddat +1; `spirit:true`. Once a fight, an enemy that strikes the bearer must re-roll the blow, and crows cry over the field.

**Items:**
- `b4_c2_crowfeather` (trinket);
- `b4_c2_fetish` (a braided fetish from a tree: Haddat ties it on a shield);
- `b4_c2_milestone` (a chip of Aren Way's last milestone: a whetstone, +1 damage on the first blow).

**Deck:** the lean card is `b2c_king`. **Reading place:** a fire off the Aren Way below the Fall (`hoc:2`).

**The fire:** `b4_c2_fire`.

**Ground:**
- `b4_c2_way` (the Aren Way: `.` road, `,` verge, `T` spiked tree (blocks), `#` rock, `c` cart, `F` fire);
- `b4_c2_fall` (the hill: `.` earth, `,` grass, `a` anthill/tokens (blocks), `#` stone, `F` pilgrim's lamp).

**Art (`72b`):**
- **Figures:** `b4_c2_scavenger`, `b4_c2_raider` (a tribal raider), `b4_c2_pilgrim` (a Crow pilgrim, old), `b4_c2_temul` (Temul, if Book Two's art doesn't serve).
- **Backdrops:** redraw `b4_road_fire` and `b4_march`; `b4_c2_trees` (the empty trees with painted figures on the bark, the column under them); `b4_c2_fall` (the hill at dusk, braids, dog skulls and crow feathers, ants: no body, no cross); `b4_c2_standard` (the standard raised at the column's head, far off).
- **Item art.**

## Chapter 3: "The Burned Tears" (`73`, key `carry` | `blow`)

**Spine** (§1.3, novel ch 15):
- Days north, in the Vathar Hills: a force of about 3,000 shadows the army. Fiddler's squad scouts it; the squad sees dust and riders from the 9th's lines.
- They are Gall's Khundryl Burned Tears. Gall kneels to Temul and they become Crow Clan; the squad hears of it, and sees the broken sword carried past.
- The feast: the army drunk; the shamans' "a long but restless life".
- Vathar Crossing, the ford choked with the bones of the Day of Pure Blood and offerings on poles. Fiddler and Cuttle blow it clear, and Fiddler's squad crosses first.
- From the butte: Ubaryd retaken by Nok, ships in the harbour, and the Whirlwind on the horizon. Set `S.f.b4_whirlwindSeen = 1`.
- Set `S.f.b4_khundryl = 1` (glossary).

**The squad's story.**
- **The Vathar was their worst day.** On a transfer `b4Was('b2_vatharLost')` is the count the ford kept from their stretch; on a fresh start, "a third of the stretch" (Book Two's typical count; never a number on a fresh start).
- **Orvas** (the Khundryl recruit) comes to the squad at the feast: his clan rode away from Coltaine before the end, and he wants to stand with those who didn't. Offer it with `fx:()=>b4Join('orvas')`, or "near" (flag 2), or sent away (`b4_orvasDone = 0`).
- **Imra stays out of this chapter** (the canon Imrahl).
- **Fights:**
  - **The raiders who harried the column**, caught by Khundryl outriders against the 9th's flank before the Khundryl show themselves: a running fight, with Khundryl riders as allies in `stage2`.
  - **The feast's edge:** drunk recruits and a Khundryl insult, a brawl and an objective fight (stop it before the Fists see).
  - **The key fight.**

**Key `b4_c3_key`.**
- **`carry`**: before the sappers' work, the squad wades its own stretch of the ford and carries out what bones it can reach, to bury on the bank. It costs the night's rest (no rest; `b4Rest` refused) and a "yes, but" on the cold water. Haddat +2, Marrow +2, Tangle −1 ("they'll blow it anyway, and it'll be clean"). Orvas, if present or near, +2 and joins if he hasn't. Nerve +1 (the company carries too). The key fight is river scavengers come for the iron in the bones, at night in the shallows (`b4_c3_ford`, the squad knee-deep: a `def.terrain` water penalty if the engine has one, else plain). Set `S.f.b4_carried = 1`.
- **`blow`**: let the munitions take the ford. Tangle +2 (a sapper's clean work: he watches Fiddler's sappers from a distance, never with them), Haddat −1, Nerve +1 ("the army crossed dry"). The key fight is offended river-tribe warriors at the poles that night: Tene Baralta warned the blasting would insult the tribes (canon), and Gall sent word, but one band came anyway. Set `S.f.b4_carried = 0`.
- **Read later:** Ch7 (the dead), Ch5 (Haddat), and Ch4 (Orvas's regard).
- **The crossing:** the squad crosses after Fiddler's squad, never first.

**Trick:** *The Black Tears* (`b4_c3_tears`), a Khundryl mourning-cry learned at the feast: ✦ guile 16; Orvas has the edge, Sathi +1; `spirit:true`. Once a fight, enemies within 2 of the bearer are −2 to hit for the round, and the next squadmate to strike one of them +2.

**Items:**
- `b4_c3_khundrylknife` (a Khundryl knife, the gift of Orvas or the feast);
- `b4_c3_bonebead` (a bead from the ford, a trinket; Haddat's if carried);
- `b4_c3_cup` (the feast's horn cup, a trinket);
- `b4_c3_ferryrope` (a length of the ford's old rope: +1 to a check once).

**Deck:** the lean card is `b4c_knightchains`. Set `S.f.b4_chains = 1` when a Chains card is drawn: "this wasn't in her deck". **Reading place:** the Khundryl feast (`hoc:3`).

**The fire:** `b4_c3_feast` (the Burned Tears' cup game goes here in `79`).

**Ground:**
- `b4_c3_hills` (`.` dry grass, `,` scree, `#` rock (blocks), `=` tent, `F` fire, `h` horse lines (blocks));
- `b4_c3_ford` (`.` bank, `~` deep water (blocks), `-` shallows, `b` bone-bank (blocks), `p` offering pole (blocks), `,` reeds).

**Art (`73b`):**
- **Figures:** `b4_c3_khundryl` (a Burned Tear rider, black tears tattooed), `b4_c3_scavenger` (a river scavenger), `b4_c3_tribesman` (a river-tribe warrior).
- **Backdrops:** redraw `b4_feast`; `b4_c3_shadow` (dust and riders on the hills, far off); `b4_c3_ford` (the ford at dusk: dark banks under the water, carcasses on poles, no detail); `b4_c3_butte` (Ubaryd's harbour with ships, the Whirlwind on the horizon).
- **Item art.**

## Chapter 4: "Leoman's Raids" (`74`, key `seti` | `picket`)

**Spine** (§1.4, novel ch 18–19), the first weeks of the march north:
- Grub walks in the hottest sun (seen).
- **Leoman's oil raid:** two hundred riders, clay lamps of oil thrown like bolas, wagons burning, the horse drawn off. The squad is in that camp.
- **The Seti ambushed:** more than 300 dead and many wounded left for the Malazans (R19, the game's reading). Tavore: "Wounded Malazans are better than dead ones" (heard through officers, once).
- **The barrow night:** the marines' trap after Dassem, and Gamet thrown from his horse in fog, pulled out by Gesler and Pella. All heard of; never seen, never the squad.
- Keneb is made acting Fist (camp talk).
- Set `S.f.b4_leoman = 1` (glossary).

**The squad's story.**
- **The burning wagons:** the night raid. The squad fights fire and riders among the wagons, with the company (`def.company`; Nerve stakes). Tangle's munitions near burning oil is a choice.
- **The Seti wounded:** Marrow (or Hessa, a temple guard who has carried the sick) and the Seti lancers and women archers. Tebbet and a Seti archer, bow to bow.
- **Fights:**
  - **The oil raid's wagons:** a hold-out among fire, `stage2`.
  - **The key fight** (below).
  - **A Seti horse society's grudge:** young lancers who want to ride after Leoman and blame the infantry, a brawl, avoidable by a check.

**Key `b4_c4_key`.**
- **`seti`**: stay with the Seti wounded through the barrow night, Leoman's bait. His riders come back for the wounded camp in the small hours, and the squad holds it (a hold-out, `def.lastStand`-free, 4 rounds then the rush). Marrow +2, Hessa +1. Set `S.f.b4_setiSaved = 1`: Seti remember the squad in Ch6 and Ch7 (a Seti archer stands with the picket). Nerve +1.
- **`picket`**: take a 9th Legion picket on the hills that night: pickets were "set up too far apart" in canon, and this is the far end of the line, nowhere near Gamet's. Raiders slip past the marines' trap and come at the picket in fog (`def.dust = 1` for fog, and say fog, not dust). Radde +, Blistig hears of it: `S.f.b4_blistigNoticed = 1`, which Ch6 reads (the squad is given the flank pickets). Nerve +1; the Seti camp loses wounded in the night (one line).
- **Read later:** Ch6 (where they're posted, and who stands with them) and Ch7.

**Trick:** *The Oil Bola* (`b4_c4_bola`), the trick of Leoman's lamps, learned from a dud picked out of the ashes: ✦ wits 16; Tangle has the edge, Sathi and Orvas +1. Once a fight, throw within 4: a 2×2 burns for 2 rounds (1d6+level step a turn to anyone who starts there). Not sorcery.

**Items:**
- `b4_c4_lampball` (an unbroken oil bola, a once-a-book throw);
- `b4_c4_setibow` (a Seti woman's horn bow, Tebbet's if he lives);
- `b4_c4_helm` (an empty helm from the barrows, a trinket and camp joke: "the marines' spare");
- `b4_c4_salve` (Seti horse-salve, heals +2 once a fight).

**Deck:** the lean card is `b2c_queen`. **Reading place:** the wounded Seti's fire (`hoc:4`).

**The fire:** `b4_c4_setifire` (the hand game goes here in `79`).

**Ground:**
- `b4_c4_camp` (the column's camp: `.` earth, `,` trampled grass, `W` wagon (blocks), `F` burning wagon (blocks), `=` tent, `h` horse lines);
- `b4_c4_hills` (the barrow hills in fog: `.` grass, `#` rock, `B` barrow mound (blocks), `,` scrub).

**Art (`74b`):**
- **Figures:** `b4_c4_rider` (a desert raider of the Whirlwind, veiled, never Leoman), `b4_c4_seti` (a Seti lancer), `b4_c4_setiarcher` (a Seti woman archer), `b4_c4_grub` (a small fair-haired boy far off by the wagons: decor only).
- **Backdrops:** redraw `b4_seti_fire`; `b4_c4_fire` (wagons burning at night, riders as shapes); `b4_c4_fog` (barrows on hills in fog, a picket's lantern).
- **Item art.**

## Chapter 5: "The Wall" (`75`, key `seep` | `column`)

**Spine** (§7.1, novel ch 21–22). Dust from here: `S.dust` = 1.
- **The Whirlwind Wall:** a sandstorm a mile deep round Raraku.
- At the Wall's fire, medium squads are joined to the marines in Keneb's company (not the 9th: the squad watches it happen to others).
- Gamet goes to the Wall, and Grub talks him back (never seen).
- **The Wall withdraws** before the Adjunct bares her sword. The squad sees the Wall go back from a distance, and the army walks in.
- Gamet breaks Blistig's nose. The squad sees Blistig's bandage the next morning, and the story runs.
- Inside: an old sea floor, sea bones and conch shells, roads and wreckage uncovered, petrified ships, a ruined canal city, a road lined with ghosts.

**The squad's story.**
- **Haddat and the desert.** If Haddat lives, this is her chapter: the old ways, the tongues of the Holy Desert, and her grief for Hissar.
- **Water.** No spring is named inside Raraku before the flood (§7.4). The seep is an invention: a hole in the old sea bed Haddat's mother's people knew. If Haddat is dead, Orvas (if walking) or a Seti scout knows it; else the key's `seep` is offered by Darrut's Aren memory of an old map.
- Sputter and dust in the scenes (`b4DustNow`).
- Marrow's warren in Raraku feels "like the warren at the Vathar, only older".
- **Fights:**
  - **Desert warriors in the Wall:** the Whirlwind's riders in blowing sand, `def.dust = 2` for this one.
  - **The key fight.**
  - **The ruined canal city at dusk:** scavengers of the old sea, or shapes that aren't there. Keep it real: Whirlwind deserters stripping the dead.

**Key `b4_c5_key`.**
- **`seep`**: Haddat leads a water party off the column to the seep in the sea bed. They meet a band of the Whirlwind's riders watering there: a fight at the seep (`def.dust = 1`; they come back with water). Set `S.f.b4_seepWater = 1`: the first Ch6 fight begins with the squad's skins full, +3 health each, and the dust's range penalty doesn't apply to its first round. Haddat +2, Tebbet +1. Nerve −1 (the company saw them go off the line), then +2 when the water comes back.
- **`column`**: stay in the column under the dust. Radde approves (Nerve +1); Haddat −1. The key fight is the column's rearguard in the dust: riders come out of the sand at the wagons, `def.company`.
- **Read later:** Ch6.

**Trick:** *The Sea-Bed Road* (`b4_c5_seabed`), Haddat's desert-craft (or the canal city's old road marks): ✦ wits 16; Haddat has the edge, Orvas +1. Once a fight, the squad reads the ground: every squadmate ignores the dust's range penalty and moves +1 until the bearer's next turn. Not sorcery.

**Items:**
- `b4_c5_conch` (a conch from the sea bed, a trinket; Tallow's grandmother would have known what it means);
- `b4_c5_seaglass` (a lens of old sea-glass: +1 range once a fight in dust);
- `b4_c5_veil` (a desert rider's veil: halves dust's effect on the wearer).

**Deck:** the lean card is `assassin` (the Rope). After Bottle's grass doll, camp talk has a marine mage "playing with dolls" (never seen); echo it lightly. **Reading place:** a fire short of the Wall (`hoc:5`).

**The fire:** `b4_c5_wallfire` (the Fuse goes here in `79`).

**Ground:**
- `b4_c5_wall` (the Wall's edge: `.` sand, `,` blown sand, `#` rock, `S` sand-wall (blocks), `F` fire);
- `b4_c5_seabed` (`.` old sea floor, `,` shell, `#` coral rock (blocks), `s` petrified ship (blocks), `w` seep, `r` old road);
- `b4_c5_canal` (`.` paving, `#` ruin (blocks), `~` dry canal (blocks), `-` broken bridge).

**Art (`75b`):**
- **Figures:** `b4_c5_rider` (a Whirlwind rider in sand), `b4_c5_deserter` (a Whirlwind deserter).
- **Backdrops:** redraw `b4_wall_fire`; `b4_c5_wall` (the Wall towering, a dark storm wall over the column); `b4_c5_withdraw` (the Wall drawing back off the plain, very far off, the army small); `b4_c5_seabed` (sea bones, a petrified ship, a road); `b4_c5_canal` (the ruined canal city at dusk).
- **Item art.**

## Chapter 6: "Pan'arak" (`76`, key `hold` | `forward`)

**Spine** (§7.2, novel ch 23–24). Dust 2.
- The lines face the Dogslayers' trenches on three ramps, "within sight".
- A third of the army blocks the retreat (canon: Keneb's legion), and **the squad holds the flank pickets of that blocking force** (Claude's call, §7.4). On `b4_blistigNoticed` they were asked for by name; otherwise Radde volunteered them.
- The Adjunct's rite with Gamet's blood is unseen and unknown. Nil and Nether walking the lines is seen.
- The horse is held back for lack of room.

**The squad's story.**
- **The eve:** the squad's talk, one scene each. Who they were before the Chain. Tallow's grandmother's deck reads the night (the reading here is heavy).
- The Barrow dead remembered.
- Nerve at its test: the recruits around the picket are frightened (`nerveHTML`).
- **On `b4_setiSaved`,** a Seti archer comes to stand the picket with them (an ally in the key fight).
- **Fights:**
  - **Dogslayer skirmishers at dusk** probing the flank, with the company.
  - **The key fight.**

**Key `b4_c6_key`.**
- **`hold`**: hold the picket as posted, all night. Radde, Hollet and Nerve +2. The key fight is a Dogslayer patrol testing the picket after midnight (`def.company`; the regulars stay or break by Nerve). Set `S.f.b4_saw = 'far'`.
- **`forward`**: go forward from the picket in the dark to look at the trenches (Tebbet and Sathi edge it; a "yes, but" of being seen). They see more than they want: the trenches full, the Dogslayers' fires, and something wrong in the dark above the oasis. Set `S.f.b4_saw = 'close'`; Chapter 7 reads it, with the ghost ride seen nearer and the mortal fight beginning sooner. The key fight is a Dogslayer outpost that sees them, a running fight back to the line. Nerve −1 (the picket was short), +1 if no one is down.
- **Read later:** Ch7.

**Trick:** *The Long Listen* (`b4_c6_listen`), an old picket's art taught by Radde (or Darrut's gate nights): ✦ wits 15; Tebbet has the edge, Darrut +1. Once a fight, the bearer hears what's coming: the first enemy to move this round is marked (+2 to hit it for the squad), and the squad can't be flanked until the bearer's next turn.

**Items:**
- `b4_c6_dogslayer` (a Dogslayer's cut-off badge, a trinket; the squad knows what Dom did to the Chain);
- `b4_c6_trenchspade` (a sapper's short spade: Tangle);
- `b4_c6_pickethorn` (the picket's horn: once a book, call two regulars into a fight).

**Deck:** the lean card is `b4c_leper`. **Reading place:** the picket before Pan'arak (`hoc:6`).

**The fire:** `b4_c6_picketfire` (the feather game goes here in `79`, with Temul's youths: on the `wickans` road Keth leads it).

**Ground:**
- `b4_c6_lines` (`.` hard sand, `,` scrub, `#` rock (blocks), `=` picket screen (blocks), `F` shielded fire, `t` trench (blocks));
- `b4_c6_ramp` (the trenches' foot: `.` sand, `r` ramp, `t` trench, `#` rock).

**Art (`76b`):**
- **Figures:** `b4_c6_dogslayer` (a Dogslayer: Dom's soldier, badges cut, Malazan-shaped), `b4_c6_setiarcher` (alias `b4_c4_setiarcher` if present).
- **Backdrops:** redraw `b4_picket`; `b4_c6_trenches` (the Dogslayer trenches on the ramps at dusk, the dead city behind); `b4_c6_eve` (the 9th's lines at night, dust in the fires).
- **Item art.**

## Chapter 7: "The Convergence" (`77`, key `line` | `horse` | `ledger`) and the end of Book Four

**Spine** (§7.3, novel ch 25–26). Dust 3.
- **The night:** everything happens inside or beyond the rebel lines, out of the squad's sight.
  - From the picket: sounds of battle, almost heard; the dark above the oasis changing; butterflies over the trenches; a Wickan standard by the trenches; sound at a league.
  - **Raraku's ghosts and the army's own dead ride down the Dogslayers** (Gamet among them, and the Chain's dead and Pormqual's crucified soldiers with them). The squad sees light and dust and riders, and **one face** (David's yes to the plan's question 9):
    - on a transfer, one of the Barrow dead (`b4Fallen()[0]`, or the one Haddat names);
    - on a fresh start, Sathi;
    - with `b4_saw = 'close'` the face is clear, otherwise a shape they are sure of.
  - They never speak and the narrator never names them: the squad names them. On `b4_bone = 'chain'` the rider wears the token.
  - Headline only: they ride down, and in the morning the trenches are silent. Never the deaths.
- **The mortal fight, before dawn** (`b4_c7_breakout`, `mortal:true`, signposted on a choice the player sees coming). A band of nameless desert warriors scattering out of Raraku past the end of the picket line: never Leoman, Corabb or Mathok, never the Dogslayers' main body, away from every named squad. On `b4_saw = 'close'` it begins a round sooner and harder. Hold the end of the line or let them go by: "letting them go" is offered, costs Nerve −2, and skips the fight.
- **The morning:**
  - Gamet is dead, of a clot in the brain (Keneb says), and Keneb is Fist.
  - **The duel, watched in silence from the line**, as the whole army watched: one thrust. The Adjunct never knows; nobody in the squad ever wonders.
  - Karsa rides past the army, a giant on a horse, saying they are no longer his enemies (one sight).
  - The Dogslayers' trenches are silent. Dom is brought in bound (rumour or a far sight).
  - Ranal is dead in a sandstorm (camp talk, never the squad).
  - Sixteen strangers come in from the flood, a girl among them (one line, never her name).
  - **The sea rises:** Nil and Nether's warning passed down the line, the run to the coral islands, Raraku becoming water.
  - The Adjunct orders the pursuit of Leoman.

**The squad's story.** The night at the picket; the mortal fight; the morning; the flood. Then the coral island (`READTABLE['hoc:7']`): the last reading, and the roads.

**The ending `b4_c7_key`.**
- **`line`**: on after Leoman with the Fourteenth, in the 9th (the road to Book Six). Never Y'Ghatan's end.
- **`horse`**: ride with Temul's Wickans or Gall's Khundryl, who are also with the Fourteenth (to Book Six). Orvas or Keth leads it. Sathi +2 if alive, Tangle "I'll walk".
- **`ledger`**: out of the ledger. The squad walks away from the new sea into Seven Cities; Darrut goes home to Aren. No road onward. Desertion is forbidden in canon, so they are "listed dead in the flood", and the narrator never says how.

**The finale** (`B4CH7.finale`): read `src/37_chapters.js` `finPages`/`showFinale`, Book Two's `src/54_b2_ch7.js` and Book Three's `src/67_b3_ch7.js`.
- The road.
- A fate page for every squadmate at the end: alive, fallen (Book Four's mortal dead), and gone (a recruit back with their people).
- A page for the Barrow dead seen among the riders.
- The Nerve count. The sergeant.
- The coda: the bones, the standard, the new sea, the pursuit ordered.
- Credits to Steven Erikson and Ian C. Esslemont.
- "The End of *Unblooded*".
- `finale.labels` overrides the book words.

**Trick:** *The Dead Ride* (`b4_c7_deadride`), after the night, offered on the coral island to whoever saw the face: ✦ wits 16; `spirit:true`. Once a fight, a rider of dust strikes an enemy within 4 for 2d6 + level step. Carried to Book Six.

**Items:**
- `b4_c7_coral` (a piece of coral stone from the island, a trinket);
- `b4_c7_dogslayerblade` (a Dogslayer's sword from the silent trenches, picked up the next day);
- `b4_c7_tear` (Orvas's gift on the `horse` road: a black bead).

**Deck:** the lean card is `herald`. Echo L'oric's sanctioning only as the reader's cards "settling" without anyone saying why: never the Master. **Reading place:** the coral island after the flood (`hoc:7`).

**The fire:** `b4_c7_isle` (no game; the roads).

**Ground:**
- `b4_c7_picket` (as `b4_c6_lines`, at night);
- `b4_c7_breach` (the end of the line: `.` sand, `#` rock, `,` scrub, `=` screen);
- `b4_c7_isle` (`.` coral, `~` new water (blocks), `,` wet sand, `F` fire).

**Art (`77b`):**
- **Figures:** `b4_c7_fleer` (a desert warrior fleeing), `b4_c7_ghost` (a ghost rider: light and dust, no face but the one), `b4_c7_karsa` (a giant on a horse, far off: silhouette only).
- **Backdrops:** redraw `b4_coral`; `b4_c7_night` (the oasis dark changing, light moving on the ramps, butterflies); `b4_c7_duel` (two small figures on a plain before the army, very far: silence); `b4_c7_flood` (water coming over the old sea bed toward the coral islands); `b4_c7_finale` (the Third on a coral island at dawn, the new sea, the column forming).
- **Item art.**

## Machine limits

The workspace has 2 CPUs and 7 GB.
- **Every Playwright run goes through one lock:** `flock /tmp/claude-0/pw.lock node tools/play.mjs …`, and the same for any script, contact sheet or test that launches Chromium.
- **Run `tools/run_all.mjs` only at the end of the chapter session**, detached (`setsid nohup … > /tmp/claude-0/runall-b4.log 2>&1 &`), and poll the log.
- Close every browser you open; never leave a server running.
