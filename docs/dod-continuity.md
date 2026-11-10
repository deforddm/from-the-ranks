Tue Nov 10, 2026, 12:16 AM PST. Book Nine continuity, against branch `book9` (v12.0.0 not shipped; VERSION still 11.0.1), with the continuity read's fixes in.

# Book Nine: *Dust on the Boots* (beside *Dust of Dreams*): continuity

What each chapter set up, for the finale and for Book Ten. Later books read this doc, not the source. Written by a fresh reader from `src/160`–`169` against `docs/dod-book-brief.md`, `docs/book9-dod-plan.md`, `docs/dod-canon.md` (corrections 1–8, §3, §4, §7), `docs/series-canon.md` §(a) rules 1–97, `docs/v12.0-notes.md` and the chapter, visions and games notes. Where a note and the code disagree, the code is what is described here. The read's fixes and the items for the lead are at the end.

**Two squads, one save.** The Third (`S.thread === 't'`, Ch 1, 3, 5, 7) with the Bonehunters' heavies: the sergeant (Book Four's, Treach's, `sgt_dg` look), Haddat, Tangle, Marrow, Mirrel (Sathi dead on a fresh start), or a Book Seven `adjunct` transfer (Doss, Wenna, Mehet, Ottar, Book Four's spares possible). Recruits Brask (Ch 1) and Tegra (Ch 5). The Letherii (`'l'`, Ch 2, 4, 6), the Sixth Company in the Commander's escort: the sergeant (Book Five's, the Errant's), Tobet, Thegg, Perrit, Ammet, or a Book Seven `army` transfer (Ilsa, Sorvan, Ruuk, Brune, Pessa possible). Recruits Brennet (Ch 2) and Kaedra (Ch 4). The two squads never meet, never cross blades, and each hears one line of the other a chapter as camp talk (`b9Key(n)` of the other squad's last chapter). Pronouns: Haddat, Sathi, Marrow, Mirrel, Wenna, Hessa, Rasp, Tegra, Perrit, Ammet, Ilsa, Brune, Pessa, Kaedra, Orla, Saffa "she"; the rest "he" (checked by script in every Book Nine file).

**Shared helpers.** Engine (160): `b9On, b9Thread, b9L, b9Third, b9In, b9Key, B9KEYS, B9KEY0, b9Ration, b9Rations, b9RatTier, b9Hungry, rationsHTML, b9Wit, b9Witness, b9Faith, b9Fever, b9SickPick, b9Join, b9OtherName, b9Coin, b9As`. Readers (160c): the Third Marrow, else Tallow, else **the old marine**; the Letherii Perrit, else **the tile-woman** (rides the supply train). Every reader of an earlier key falls back to `B9KEY0` (`stores, wagons, boil, book, share, line, adjunct`); `b9Faith()` is `null` on a bare `--from=K` save, and every reader of it has neutral words for `null`.

**Levels.** The Third 19 → 20 (Ch 1) → 21 (Ch 3) → 22 (Ch 5) → about 23 (Ch 7); cap 24 never reached in one book. The Letherii 11 → 12 (Ch 2) → 13 (Ch 4) → 14 (Ch 6); cap 16 never reached. Each main fight pays about 330 at `XPK` .6, a full level by itself, so every road levels. `B9SOLDIER` and `B9GAP` are empty: balance has not been run.

## The recurring cast (inventions, all chapters)

- **Thallo** (the Third's corporal of the heavies; big as a door, broken nose, always eating): Ch 1, 3, 5, 7. The heavies' **captain** is seen, never speaks to the sergeant. The **old marine** reads the Deck and teaches Ch 5's saying.
- **Finadd Ravel Ennic** (Book Five's), **Yelt** (the ration book), **Orla** (she, the water-cart), **Saffa** (she, the field cook): Ch 2, 4, 6. The Commander is "the Commander", seen far off (Ch 2 riding the front; Ch 6 his banner at dusk); never acting.
- **Harro** the sutler (Ch 3, 5), **Duvo** the Akrynnai horse-trader (Ch 3 only).
- **The quartermaster's runner** (Ch 2 off-stage, open) is Ch 4's "who has been taking", chalking the water wagons for border raiders; he rides off with them (closed).
- **The far dust**: first at Ch 5's last first light (south-east, once); Ch 6's dawn smear on the northern sky (the short-tails; they move); Ch 7 "in front of it all day".
- No other new names in the book (canon sheet §6 rows only).

## Chapter 1: Letheras, Emptied (`src/161_b9_ch1.js`; the Third)

The night the barracks emptied (the Reading, seen from the street: a dead dray-horse stands, a roof goes in far off) and the days after; the muster. Phases `b9_c1_ph` 1–4.

**Key `b9_c1_key`:** `stores` (the night on the heavies' stores; thieves; Tangle and Brask +1; dawn count `b9Ration(2)`) or `street` (the woman's household; Haddat and Marrow +1, `S.f.b9_c1_street = 1`; the boy in the alley; the loaf +1, the alley's "yes, but" −1). **Read:** Ch 2 (the Malazan heavy's rumour), Ch 3 (a line at the start), Ch 7 (each fate page's Book Nine line, `b97Street()`).

**Rations:** 6 → `stores` 8, `street` 6–7; the Short Sack game +1 (phases 3–4) → **6–9**.

**Flags read later:** `b9_c1_key`, `b9_c1_street`, `b9_braskDone` (1 walks / 2 waits). Words only: `counted, boy, horseOut, bread, horse, roof, rollOk, braskSquad, tin, scale`.

**Recruit:** Brask at the first halt (no "go away"). **Trick:** The Roll at the Gate `b9_c1_rollcall` (✦ wits 19; the Line, free). **Items:** `b9_c1_heavyscale` (ac 3, hp 4), `b9_c1_messtin`, `b9_c1_gutterknife`. **Fights:** `b9_c1_looters` 380+170 (main, the book's first; one `b9_heavy`), `b9_c1_stores` 100 (`stores`), `b9_c1_brawl` 90 (opt).

**Left open:** what the household does after the army goes; whether the knackers came; the veterans' "bring back a map".

## Chapter 2: The Escort (`src/162_b9_ch2.js`; the Letherii)

The escort's muster ground outside the landward gate; drilled by an unnamed Malazan sergeant of the heavies (never Tarr, Cuttle or Fiddler); the train's yard at night; out behind the Malazans' dust. Phases 1–5.

**Key `b9_c2_key`:** `wagons` (load honest with Yelt and Orla, `b9Ration(2)`, `b9_c2_loadedTrue`) or `drill` (back to the square; Thegg +1, `S.f.b9_c2_drilled = 1`). **Read:** Ch 3 (the healer's line), Ch 4 (Yelt's opening, with `b9_c2_found`), Ch 6 (`b96Drilled()`: +2 on the line check, +1 on going back in step).

**Rations:** 6 → `wagons` 8, `drill` 6; the ambush "yes, but" −1; the Canal Locks game +1 → **5–9**.

**Flags read later:** `b9_c2_key`, `b9_c2_drilled`, `b9_c2_loadedTrue`, `b9_c2_found` (Ch 4), `b9_c2_orla` (Ch 4, Ch 6), `b9_c2_stepOk` (Ch 6), `b9_brennetDone`.

**Recruit:** Brennet at the wagons, first evening. **Trick:** The Malazan Step `b9_c2_step` (✦ wits 18; the Gate Drill, free). **Items:** `b9_c2_carterscoat`, `b9_c2_tallystick`, `b9_c2_escortspear`. **Fights:** `b9_c2_drill` 120 (survive 4, the Letherii's first), `b9_c2_bout` 100 (opt), `b9_c2_wagons` 380+170 (main).

**Engine-adjacent:** a caption getter on 160's `SCENES.b9_muster` (Ch 2 phase 1 only; 160's caption otherwise). Checked: guarded, falls back.

## Chapter 3: The Road East (`src/163_b9_ch3.js`; the Third)

The army departs; the fever (R11 S13) and the Letherii cure through an unnamed healer "by the Commander's order"; the last farm; the Wastes' edge and Duvo. Phases 1–4.

**The fever:** at the start (`b93Pick`: lowest-loyalty walking non-healer) `S.f.b9_c3_sick = id`, `b9Fever(id)`. 163's `injuryClear` wrapper keeps it through rests and roster fires until the boil (the engine notes are now corrected).

**Key `b9_c3_key`:** `boil` (−1, the fever breaks, the sick one +1 loyalty, two days behind the column) or `press` (+1, the fever carried to the end). **Read:** Ch 4 (the outrider's line), Ch 5 (a line from `b9_c3_sick` and the key), Ch 7 (fate pages, `b97Boil()`).

**Witness (c3):** at the fever-fire after Thallo's secondhand "surviving isn't what this is about" (a marines' sergeant's words, overheard; canon's speaker is Fiddler at his meeting, R11 S10, never shown or named): `squad`/`adjunct` → kept, `column` → doubt.

**Rations:** −2 (march) → the anchor +1 once (the farm's stores or Duvo's horse-meat) → key ∓1. From Ch 1's 6–9: **3–9** (3 = `street` with the alley's cost, no anchor, `boil`).

**Flags read later:** `b9_c3_key`, `b9_c3_sick`. Words only: `feverBroke, found, storesLeft, tended, wit, cureOk, pot, bark, knife, duvo`.

**Trick:** The Letherii Cure `b9_c3_cure` (✦ wits 19; Spirit-Song, full turn, no ward). **Items:** `b9_c3_akrynknife` (atk 2, 1d8+3), `b9_c3_boilingpot`, `b9_c3_feverbark`. **Fights:** `b9_c3_farm` 380+170 (main), `b9_c3_dogs` 100 (opt), `b9_c3_road` 140 (opt). **Inventions:** the cure's salt and honey (page check open).

## Chapter 4: The Ration Book (`src/164_b9_ch4.js`; the Letherii)

The escort's train out on the Wastes; Kaedra; the runner's chalk; the raid; the stampede at noon; the key. Phases 1–5.

**Key `b9_c4_key`:** `book` (the recount, +1, `S.f.b9_c4_book = 1`) or `forage` (Kaedra +1; the dry wash and Barghast hunters, no clan named; +3). **Read:** Ch 5 (Harro's line), Ch 6 (`b96Booked()`: the train drawn in where Yelt's book says; +2 and surprise on the train road).

**Witness (c4):** Yelt at the train's fire, the ledger closed: `each`/`commander` → kept, `pay` → doubt. This is the only Letherii beat before Ch 6's road, so `b9Faith('l')` at the road reads it alone.

**Rations:** −2 → the stampede's "yes, but" −1 → the hunt +1 → key; Yelt's Tally +1. From Ch 2's 5–9: **3–10**.

**Flags read later:** `b9_c4_key`, `b9_c4_book`, `b9_kaedraDone`. Words only: `wit, marks, runner, hunted, spoorOk, outrider`.

**Recruit:** Kaedra at the first halt. **Trick:** Reading the Spoor `b9_c4_spoor` (✦ wits 18; passive Long Listen). **Items:** `b9_c4_bluerosespear` (1d8+3, reach), `b9_c4_scoutcoat`, `b9_c4_bonewhistle`. **Fights:** `b9_c4_raid` 380+170 (main), `b9_c4_herd` 120 (survive 4), `b9_c4_forage` 220 (`forage`).

**Engine-adjacent:** 164b redraws 160's `b9_wastes` and `b9_camp_night` (the brief gives them to Ch 4) with Ch 4 detail behind `S.chapter === 4`; a caption getter on `SCENES.b9_wastes`. Later chapters only borrow `b9_wastes` as a fallback for their own scenes. **Left open:** where the runner went; what the hunters do next.

## Chapter 5: Short Rations (`src/165_b9_ch5.js`; the Third)

Deep in the Wastes. Tegra; the noon halt (the rumour, Keneb far off on a rise, Hedge at the sappers' wagons, both seen only); the bull; the dry wash, the dead Kartool sutler's cache; the dung-fire; the far dust. Phases 1–3.

**Key `b9_c5_key`:** `share` (the company's pot; Brask and Haddat +1, `S.f.b9_c5_shared = 1`) or `keep` (+2; Tegra +1, Haddat −1). **Read:** Ch 6 (no), Ch 7 (fate pages, `b97Shared()`).

**Witness (c5):** the dung-fire, after a soldier at the next fire says "we shall be our own witness": `own`/`each` → kept, `nothing` → doubt. The saying is the soldiers'; "the story is" the Adjunct said it to her officers on a ship before the landing (rg-canon line 48, T p. 357, 361). Tavore is never heard.

**Rations:** −2 → the bull killed +2, or driven with the near roll −1 → key; Under the Helmet +1. From Ch 3's 3–9: **0–10**. **0 is reachable** (Ch 3 at 3, the bull driven on a near roll, `share`): `starving`.

**Flags read later:** `b9_c5_key`, `b9_c5_shared`, `b9_tegraDone`. Words only: `wit, dust, bullDone, dug, dogsDone, cacheDone, found, searched, cairn, wordOk, rise, sappers, orders2, axe, pack, scarf`.

**Recruit:** Tegra at the guides' fire (never names her clan). **Trick:** Our Own Witness `b9_c5_witness` (✦ wits 19, `witness:true`; the Khundryl Paint, free). **Items:** `b9_c5_barghastaxe` (1d8+4), `b9_c5_sutlerspack`, `b9_c5_dustscarf`. **Fights:** `b9_c5_cache` 380+170 (main), `b9_c5_bull` 140 (opt), `b9_c5_dogs` 100 (opt).

**Left open:** the deserters' officer's plan; whether Harro's mouth sent anyone else south.

## Chapter 6: Dust on the Horizon (`src/166_b9_ch6.js`; the Letherii; hard, not mortal)

The battle's day from the escort's stretch "from the cairn to the dry wash" (rule 97). First light, the smear on the northern sky; the line; noon, the key; the afternoon (the gap or the wagons); the pull-back in step to a rise; dusk: the rearguard news ("the foreigners' rearguard is still out there"), horsemen far off east going into the dust (the Khundryl, unnamed), the road, the Witness. Death checks run in every fight. Phases 1–5.

**Key `b9_c6_key`:** `line` (Thegg, Tobet +1; the gap closed by a might check or fought) or `train` (Brennet +1; hold the wagons, survive 5; `S.f.b9_c6_trainHeld = 1`, `b9Ration(2)`). **Read:** Ch 7 (the Letherii's one line at the camp, `b97LKey()`; the Sixth's road page).

**The Letherii's road `S.f.b9_lethRoad`:** `escort` (Sorvan, Thegg, Brennet +1), `adjunct` (Kaedra, Ruuk, Tobet +1; Brennet −1), `home` (Pessa, Brune +1; Thegg −1 unless `doubt`). `b9Faith('l')` colours the words. **Read:** Ch 7's finale; Book Ten (`b97OnwardL`: `escort` by default).

**Witness (c6):** after the road: `each`/`seen` → kept, `column` → doubt. Ennic mentions the foreigners' sergeants' saying; never Tavore's words.

**Rations:** −1 → `train` +2. From Ch 4's 3–10: **2–10**. The line fight can be fought `hungry` (2).

**Flags read later:** `b9_c6_key`, `b9_lethRoad`. **Set but never read:** `b9_c6_trainHeld` (the brief's shared flag; Ch 7 reads the key instead; harmless).

**Trick:** Raise the Dust `b9_c6_dust` (✦ wits 18; the Cadre's Ward, free; Brennet teaches, else an old drover). **Items:** `b9_c6_escortscale` (ac 2, hp 3), `b9_c6_plate`. **Fights:** `b9_c6_line` 380+170 (main), `b9_c6_gap` 200 (`line`, opt), `b9_c6_train` 200 (`train`, survive 5), `b9_c6_dusk` 100 (survive 4).

**For Ch 7:** `B9CH6.fates` (`half, road, key, line, pages`), one line per Letherii soldier per road. **Engine-adjacent:** 166b wraps `FIGX.khell` to draw the short-tail while `S.book === 'dod'`; drawn live each frame (no sprite cache), so no other book's K'ell is touched; nothing else in Book Nine uses `khell`.

**Left open:** what the light in the short-tails' hands is; where the escort goes; whether they come again.

## Chapter 7: The Rearguard, and the end of Book Nine (`src/167_b9_ch7.js`; the Third; the mortal fight)

The same battle's other end: the heavies' stretch "between a cut bank and a line of burned wagons", late in the day after a day of dust in front of it; the mortal rearguard; after dark (the lull, the reading, the trick, the dark fight, the walk back in step); a grey morning on the retreat trail (the news); the retreat camp days after (the pot, the slates, the key, the roll). Phases 1–4.

**The mortal fight `b9_c7_rearguard`** (400+180; `mortal:true`, signposted in every choice into it; two `b9_heavy`; surprise from the lock). `S.f.b9_c7_fell` and `b97Fell()` (deaths in Ch 7 with no `from`). Then `b9_c7_dark` (survive 5, not mortal) and `b9_c7_trail` (opt).

**Key `b9_c7_key`:** `adjunct` (Haddat, Brask, Marrow +1; Mirrel −1), `south` (Tegra, Tangle, Doss +1; Brask −1), `home` (Mirrel, Wenna +1; Haddat −1 unless `doubt`). `b9Faith('t')` colours the slates. **Read:** the finale; Book Ten (`b97OnwardT`: `adjunct` or `south`).

**Witness (c7):** before the dark, in the line: `each`/`own` → kept, `put` → doubt.

**Rations:** −1 → the surgeons' cart "yes, but" −1 → the trail nothing → the camp pot +1. From Ch 5's 0–10: **0–10** (clamped at 0 on the march).

**The news** (rule 86, headline): "The Fist is dead. … The High Mage is missing. … A captain went in alone … The Adjunct was carried off the field." No name said. Marrow: "Missing is not dead." The coda's narration says the Fist died and the High Mage "went missing"; nobody believed dead is confirmed either way.

**Trick:** Fight Them Low `b9_c7_low` (✦ wits 19; Squint's Breath, free; Brask teaches, else a heavy of the next file). **Items:** `b9_c7_rearguardcloak` (ac 3, hp 5), `b9_c7_rollstick` (wits +1). **The finale:** the Third's road page, a page per Third soldier (walking, fallen tonight, fallen before, waiting), the Third's sergeant; the Sixth's road page, a page per Letherii soldier from `B9CH6.fates.pages()` plus their dead from before the book, their sergeant; *Where the books meet*; 37's end page with the credit to Steven Erikson and Ian C. Esslemont.

## The visions (168) and the games (169)

Visions `b9v1`–`b9v7` (Fiddler at the Reading, Brys in his tent, Koryk's fever, Aranict, Keneb's ride, Henar, Gu'Rull over the field); words-only flags, none read by a chapter. Games: the Short Sack (Ch 1), the Canal Locks (Ch 2), Yelt's Tally (Ch 4), Under the Helmet (Ch 5), Knife in the Dirt (Ch 7); each pays at most +1 Rations or +1 regard once; none touches Witness.

## Rations across the book (each squad its own; games included)

| | after Ch 1/2 | Ch 3/4 | Ch 5/6 | Ch 7 |
|---|---|---|---|---|
| **The Third** | 6–9 | 3–9 | **0**–10 | 0–10 |
| **The Letherii** | 5–9 | 3–10 | **2**–10 | — |

The brief's ranges hold at the top, and run lower at the bottom: the brief has 4–8 (Ch 3), 5–10 (Ch 4), 1–8 (Ch 5), 4–10 (Ch 6). The leanest Third fights the mortal rearguard `starving` (−15% health, −1 on every check); the leanest Letherii fight the line `hungry` (−10%, −1). Both need the balance step.

## Left open on purpose (for Book Ten)

- Rules 84–97 stand: Kolanse's purpose, the Glass Desert (never named), Quick Ben, Bottle and Ruthan Gudd "missing", the Adjunct "carried", Gesler and Stormy "taken in the night", Sinn and Grub "gone off on their own", Hedge's company never joined, the Khundryl far off and unnamed, the Letherii's part on unnamed ground, Brys never acting.
- The split of the army is camp word at the retreat camp ("Clerks say the Adjunct means to go east … the Letherii are to go south"). Book Ten must start the split no earlier than canon does (page check below).
- **Both squads with Brys's brigades in Book Ten**: a Third on `south` and a Sixth on `escort` march in the same column. Book Ten decides whether they meet; Book Nine never lets them.
- The Letherii on `adjunct` go east with the Malazans: an invention Book Ten must carry without closing anything of TCG's crossing.
- What the light in the short-tails' hands is; what is heaped on the field (Gu'Rull sees "what it cost them"); where the long way round goes.

## The continuity read (Tue Nov 10, 2026)

**Clean checks (no finding):**
- Every key is read with a `B9KEY0` default (`b9Key(n) || 'default'` in every reader); `b9Faith()` `null` has neutral words in Ch 6 and Ch 7. Every value compared exists where it is set. The shared flags `b9_c1_street`, `b9_c2_drilled`, `b9_c3_sick`, `b9_c4_book`, `b9_c5_shared`, `b9_lethRoad` are each read where the brief says. Lint's "read but never written" list for Book Nine is all dynamic writes (`B9_DONE[id]`, the readers' `b9_c${n}_drawn`/`noCard`).
- Recruits: every unguarded mention of Brask, Tegra, Brennet or Kaedra checked; each is their own scene, a waiting-node, or a role fallback (one fixed, below). Head-counts use `numw()`; no fixed count of the squad in words.
- Hard limits: no never-use name, no Burn's Sleep year, no count of weeks or months; "K'Chain" and "Nah'ruk" only in comments; "Bonehunters" once each in Ch 3 and Ch 7, by soldiers; Kolanse said in Ch 1, 2, 3 and 5 (the clerks' word; twice in Ch 3, the intro and the Witness beat), never what waits there; no Kalam; no Tavore viewpoint; nobody canon kills shown dying; no "believed dead" confirmed.
- The engine-adjacent changes (the caption getters in 162, 164–167; 164b's redraw; 166b's `khell` wrapper) are guarded by book and chapter and fall back to 160's.
- `trope_scan`: B9 inside every budget (73k words; theway 13, silence 18, nobody 56).

**Fixed in the continuity read:**
1. **Gu'Rull's field (canon, vision 7).** "The short-tails who stayed to stop them are the bones" read the bone-heap as the short-tails' dead; R24.1 has the bones as the soldiers' dead. Now "What is heaped in the middle is what it cost them", with "heaped high" (not "where they fell"). Also "a charge … did not come out" → "few came out" (Ch 7 and canon: some came back; W *Khundryl Burned Tears*: 880 of 6000).
2. **The "own witness" speech's place (canon, Ch 5, three places).** "On the other side of the sea, to the marines going over the side" → "to her officers, on a ship, before the landing" (rg-canon: the Froth Wolf, T p. 357, 361). Still "the story is", never Tavore heard.
3. **The herd (canon, Ch 4).** Kaedra's "Forty. Maybe fifty." → "A score. Maybe fewer. More than I thought were left out here." R10 S7 (Cafal): the Wastes were "emptied"; R10 S1's bhederin is Kalyth's memory, not a herd.
4. **Keneb's ride (canon, Ch 5, three lines).** "Rides out most days / at every halt" → "rides out at the halt" (R22 S6 has one ride; no habit found).
5. **"Bonehunters" (canon, Ch 3).** Thallo's "they call us now. Some clerk thought of it" (the name is two books old) → "they call us. Don't ask me who started it."
6. **Days after, not last night (continuity, Ch 7, four lines).** At the retreat camp, Wenna's, Mehet's and the old marine's "last night" → "that night"; Tegra's "the ones who fell last night" → "on the stretch".
7. **The day the short-tails came (continuity, Ch 7's three end texts).** "On the night the short-tails came" → "on the day": Ch 6 has them come in the morning; the coda says "one morning".
8. **The Sixth's dead in the coda (continuity, Ch 7).** The coda's "did not come off it" (the Sixth's stretch) counted a Letherii who died in Ch 2 or 4; now Ch 6's dead only.
9. **A recruit named when absent (Ch 5).** Thallo "finds it as strange as Brask would" → "finds it strange"; the journal's "Tegra says the wind does not raise dust like that" (she may be waiting) → "Not the column's, and not the wind's."
10. **The noon caption at first light (background, Ch 4).** The `b9_wastes` caption getter said "halted at noon" on the dawn onward page; it now reads first light from phase 4, and 164b draws the lamed bull only at the noon halt.
11. **Copied lines (style).** The rest line "… Wounds close, mostly." (Ch 1, 3, 5, 7) now varies in Ch 3, 5 and 7; "taller than any soldier" (11 in Ch 6–7) trimmed twice in Ch 7; Ch 6's "where there was nothing last night" (five times) trimmed once.
12. **The engine notes (doc).** v12.0-notes said a rest at the fire clears the march fever; in Ch 3 it does only after the boil (163's `injuryClear` wrapper). Corrected there; the Ch 3 and Ch 4 notes updated for fixes 3 and 5.

**Repeated phrases left** (five or more across chapters): the map hint "Tap ground to move · tap a figure to talk" (UI); "Back to the camp / the yard / the halt / the fire" (choices); "the old marine" (the reader's one name, by design); "heavies at the next fire" (Ch 5, 7, games: the Third's neighbours, spread over speakers); Ottar's "Today's word … is" (his tic); "half a biscuit" (13, Ch 5's ration, by design); "sits on her heels" (Tegra's way of sitting, Ch 5, 7); "taller than any soldier" (9, the short-tails' one measure); the rest line "The squad sits an hour by …" (Ch 1–5, now varied after it). `repeat_scan`: Book Nine's hubs fold as every book's do; its paragraph pairs (`b9_c2_wagonline`/`brennet`, `b9_c2_sergeant`/`post`, `b9_c4_yelt`/`book`, `b9_c6_ennic5`/`road`) are one node delegating to another, so no player reads them twice.

**Page checks still open** (for `open-questions.md`; the game's lean stands meanwhile):
1. **Q1, day or night** (DoD ch 23): does the fight run into the dark? Leans late day into dark. Reactor ch 23 and the wiki's DD/23 failed this read; GR23 and R24.1 have no time words.
2. **Q2, the Letherii in the battle**: did their line break? Ch 6's pull-back is "together, in step". Not found. If it broke, soften the pull-back's words; no flag changes.
3. **Q12, the Khundryl charge's hour**: Ch 6 (from the rise) and Ch 7 (from the east stone) both have it "as the light goes"; consistent with each other. If after dark, cut Ch 6's edge paragraph and Sorvan's dusk line, and change "as the light goes" in Ch 7 (two places). Not found (W *Khundryl Burned Tears* has numbers, no hour).
4. **Brys's water cure** (DoD ch 11): R11 S13 says only "Brys' water cure has worked". The game's boiling is supported; salt and honey are the game's own (Ch 3, vision 3).
5. **When the split is announced** (TCG ch 1–4): Ch 7's camp has it as clerks' word days after. Reactor TCG ch 4 failed this read.
6. **Keneb's ride and the missing sergeants on one day** (R22 S5–S8): Blistig brings the desertion rumour to Keneb "as he rides through camp" (R22 S8), so the same day is supported, not closed.
7. **The canon sheet's own cite** (`dod-canon.md` correction 2 and §2): "bhederin still walk them (R10 S1)" is Kalyth remembering one bhederin, not a herd on the Wastes. The sheet wants that line corrected (the lead's copy).

**For the lead and David (no fight, item, key value or engine file changed):**
1. **Balance (the next step):** nothing in Book Nine is measured (`B9SOLDIER`, `B9GAP` empty). Hardest: Ch 7's mortal rearguard (five short-tails over two grounds) and Ch 6's line (five short-tails, no munitions). Hunger makes both harder: the leanest Third reaches the rearguard at 0 (`starving`), the leanest Letherii the line at 2 (`hungry`).
2. **Rations below the brief's floor:** Ch 3 can end at 3 (brief 4), Ch 4 at 3 (5), Ch 5 at 0 (1), Ch 6 at 2 (4). If David wants the brief's floor, the cheapest lever is to drop Ch 5's bull "yes, but" when the squad is already `hungry`, or let the march not take the last ration.
3. **`b9_c6_trainHeld`** is set and never read; Ch 7 reads `b9_c6_key`. Either drop it from the brief's shared list or let Ch 7's Letherii line read it.
4. **Book Ten:** the two squads can end in the same column (Third `south`, Sixth `escort`); the brief says they never meet in Book Nine only.
5. **Engine wraps to retire later:** 163's `startChapter` and `injuryClear` wraps (the fever), the five caption getters on 160's scenes, 164b's redraw of `b9_wastes`/`b9_camp_night`, 166b's `FIGX.khell` wrap, 167's `finPages`/`showFinale` wraps.
