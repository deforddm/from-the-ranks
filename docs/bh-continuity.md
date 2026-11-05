Thu Nov 5, 2026, 3:35 AM PST. Book Six continuity, against branch `book6` (v9.0.0, not shipped; `VERSION` still 8.2.6), with the continuity read's fixes in (branch `b6-continuity`).

# Book Six: *Bones in the Walls* (beside *The Bonehunters*): continuity

What each chapter set up, for the finale and for Book Seven. Later books read this doc, not the source. Written by a fresh reader from `src/101`–`108` against `docs/bh-book-brief.md`, `docs/bh-canon.md`, `docs/v9.0-notes.md` and the chapter notes. Where a chapter note and the code disagree, the code is what is described here. The read's fixes and the items left for the lead are at the end.

**Two squads, one save.** `B6_CH = {1:'r', 2:'h', 3:'r', 4:'h', 5:'r', 6:'h', 7:'r'}`. The Third (thread `r`, Book Two's and Four's squad, Blistig's 9th Legion of the Fourteenth) plays 1, 3, 5, 7; the Fourth (thread `h`, Books One and Three's, the Seventh Company of Onearm's Host) plays 2, 4, 6. `S.f` is shared, so every key below is readable by both; the other squad's keys are used only as rumour. The two squads never meet and no text says they do (Ch7's road page: "It never met the Third. It never will.").

**Shared helpers.** Each chapter has its own `b6K…` helpers (K = 1–7), file-local in name, global in scope. Engine (100): `b6On, b6In, b6Use, b6Thread, b6Join, b6CanRecruit, B6_DONE, B6_HOME, b6Catch, b6Cure, b6CanCure, b6Fevered, b6FeverList, feverHTML, b6OtherName, b6SgtFor, B6KEYS`; 100c: `B6DECK, B6POOL, b6DeckChoice/Offer/Card`. Ch6 adds `B6CH6.fates`; Ch7 adds `B67FIN` (the finale) and `b67Onward(s)`.

**Fever.** Caught from `feverRisk` fights (the engine gives it once per fight, first ground only: 100's `endBeat` skips `isStage2`), from one "yes, but" a chapter, and from Ch2's `pass`. Cured from scenes only: surgeons and Denul hands before Ch4's end, a carrier's touch after (`S.f.b6_soliel`). Ressa never catches it. Never lurid anywhere: sweat, shaking, water that will not stay down.

## The recurring cast (inventions, all chapters)

- **The Third's captain is Captain Hollet** of the 9th Legion's Second Company, Book Four's (he; a thin man who coughs into his fist; keeps the numbers on a wax tablet). **The continuity read's rule:** he is named in every speaker label and map figure ("Captain Hollet"; Ch5's "Captain Hollet · Second Company") and once in Ch1's prose ("Captain Hollet of the 9th's Second Company is still a thin man…"); prose otherwise says "the captain". The brief's "unnamed, as in Book Four" was wrong: Book Four names him in all seven chapters, and the name is cleared in `series-canon.md` §(b). Sergeant Radde (Book Four) is not used in Book Six and is not contradicted.
- **The Fourth's captain** is the Seventh Company's, unnamed (he), as in Book Three. Captain Sweetcreek's Falari are next in the lines (Ch2, Ch4, Ch6), seen and heard, never spoken with.
- **The old soldier of the 9th** (`oldninth`, Book Four's Deck reader): Ch1's cairn and the well's warning, Ch3's rumour of the Host and "the First Sword fell here, that time. So they say", Ch5's road, Ch7 (Deck reader). Never named.
- **Old Benna** (Book Three's reader): the Fourth's third Deck reader; the surgeons' linen at G'danisban (Ch4), the column (Ch6).
- **The finger bone** (`S.f.b6_bone`): offered in Ch5 by a heavy of the 10th who walked out of the fire, from bones taken "off the dead under the city, out of the old pits". The Fourth never wears it. "Bonehunters" is printed once in the game text, in Ch7, as the marines' own name in a soldier's mouth (keep-open §7). Tallow's older bone is from Aren (Book Four).
- **Mehet's keys**: the doors of his family's houses, pulled down by the Falah'd's men twenty years ago to widen the wall road. His grandfather was a well-digger before he was a potter (the map).
- **Brannoc's whistle**: tin, played badly (Ch2, Ch4, Ch6, the fates). Kettle and Brannoc are both Falari, from rival islands.
- **Ressa's blue fingers**: a dyer's daughter from a G'danisban dye-yard; the blue never washes out.
- **Ottar**: a Perish Grey Helm sent across to learn how Malazans fight. The Destriant is never named.
- **No other new named people.** Everyone else is unnamed by role (checked: a capitalised-word sweep of 101–108 against Books One to Five and the canon docs finds only canon names and Aragan, p. 665).

## Chapter 1: The Lato Odhan (`src/101_b6_ch1.js`, the Third)

The pursuit across the Lato Odhan weeks after Raraku; the well; the rebel rearguard in a wash; the camp before Y'Ghatan (Faradan Sort's column seen walking in; the Fists' quarrel through a runner); Mehet at the camp's edge; the barrow road under the walls at night. Phases `b6_c1_ph` 1–4.

**Key `b6_c1_key`:** `bury` (the old dead put back, a night's work; the patrol off the walls, `b6_c1_patrol`, not mortal; Haddat +2, Marrow +1, Mehet +1, Tangle −1) or `leave` (the picket and a rest, `rest()` once; Haddat −1, Tangle +1; the barrows stay open). **Read later:** Ch3 (the barrow field, the old soldier), Ch5 (the heavy's one line on `bury`), Ch7 (the fate pages, the sergeant's page, the fallen's page).

**Flags:** `b6_c1_patrolDone`; `b6_mehetDone` 1/2/0; `b6_c1_mapOk`, `b6_c1_mapTried`; `b6_c1_wellDone`, `b6_c1_wellClean`; `b6_c1_rearDone`; `b6_c1_prisoner` `kept`/`left`; `b6_c1_news` (Leoman killed the Falah'd, sent the city to Lothal, took the oil from the presses: a foreshadow nobody acts on); `b6_c1_edgeDone`; `b6_c1_sortSeen`, `b6_c1_rumour`, `b6_c1_dug`, `b6_c1_names`, `b6_c1_wellWarned`.

**Fever:** `b6_c1_well` (`feverRisk:'the well water'`); the well's "yes, but". Cured by the squad's healer at the fire or the 9th's surgeon.

**Recruit:** Mehet, at the camp's west edge (`b6Join('mehet')`), or waiting with the townsfolk, or sent to Lothal (Haddat −1). **Trick:** The Potter's Map `b6_c1_map` (✦ Wits 17; The Line). **Items:** `b6_c1_odhanveil` (light, +1 armour, +1 more against shots), `b6_c1_wellrope` (+1 Might), `b6_c1_rebeltulwar` (heavyweapon, +1 hit, 1d10+3).

**Fights:** `b6_c1_well` 160, `b6_c1_rearguard` 220+110, `b6_c1_edge` 150, `b6_c1_patrol` 180 (`bury`). Paid ≈ 490 / 385. Level 12 → 13.

## Chapter 2: The North Coast (`src/102_b6_ch2.js`, the Fourth)

Onearm's Host camped above the sea near Ehrlitan (never inside the city); the D'rek priests found slaughtered (camp talk) and a dead shrine on the headland; Dujek's spirit broken as the ranks feel it ("since Coral"); the march inland through empty villages; the village where the dead were left. Phases `b6_c2_ph` 1–5.

**Key `b6_c2_key`:** `burn` (the family goes up the hill first, the squad fires the village; nobody catches it there; Brisk +1, Ohl −1, Brannoc −1; `b6_c2_family = 'fled'`) or `pass` (round the village; the water-carrier catches it, Brannoc first; Ohl +1, Brannoc +1, Brisk −1; `b6_c2_family = 'roofs'`, `b6_c2_passWho`). **Read later:** Ch3 (the old soldier's rumour of the Host), Ch4 (the intro's fever line), Ch6 (Kettle's or Brisk's memory), Ch7 (the Fourth's road page).

**Flags:** `b6_brannocDone` 1/2/0; `b6_c2_cured`; `b6_c2_shrineDone`; `b6_c2_villageDone`, `b6_c2_roadDone`; `b6_c2_weatherOk`; `b6_c2_drekHeard`, `b6_c2_dujek`; `b6_c2_wellOk` / `b6_c2_wellSick`; `b6_c2_whistle`, `b6_c2_ohlCity`.

**Fever:** `b6_c2_village` (feverRisk); the hamlet well's "yes, but"; `pass`. Cured only by Ohl at the fire (not himself; the warren is sick). Without Ohl it carries to Ch4.

**Recruit:** Brannoc, at the horse lines. **Trick:** Falari Weather-Sense `b6_c2_weather` (✦ Wits 17; Rhivi Spirit-Song). **Items:** `b6_c2_oilskin` (light, +1 armour, +2 health), `b6_c2_drekcharm` (fever costs 3 health, not 4), `b6_c2_falariaxe` (heavyweapon, +1 hit, 1d12+3).

**Fights:** `b6_c2_shrine` 200 (optional), `b6_c2_village` 260+130, `b6_c2_road` 240. Paid ≈ 500. Level 12 → 13.

## Chapter 3: Y'Ghatan (`src/103_b6_ch3.js`, the Third)

The 9th on the reserve line at dusk under Blistig's banner (never nearer); the sally at the wagons; the wall going down; the city lit from inside; the order to hold the way out open; the barrow field the night after; the march for Sotka. Phases `b6_c3_ph` 1–3.

**Key `b6_c3_key`:** `in` (the mortal fight `b6_c3_streets`, the fire spreading tile by tile from round 2; Mehet +1, Haddat +1, Marrow −1) or `line` (`b6_c3_gate`, survive 4, not mortal; Marrow +1, Mirrel +1, Mehet −1). **Read later:** Ch5 (the intro, the heavy, the walk-in look for the dead), Ch7 (fate pages, the fallen, the coda).

**The dead:** `S.dead[id] = {ch:3, where:<the ground's title>}` with no `from` (`in` only). Ch5 and Ch7 read exactly that shape.

**What it reads:** `b6_c1_key` (`bury`: the old barrows whole, "the Third did it"; `leave`: one old barrow may be put back, `b6_c3_mended`; unset: neutral); `b6_c2_key` (rumour only; unset: none); Mehet throughout (every line has a default).

**Flags:** `b6_c3_streetsDone` / `b6_c3_gateDone`; `b6_c3_sallyDone`; `b6_c3_oil` (Mehet names the maethgara's oil, after the jar breaks, never as a warning); `b6_c3_breathOk`; `b6_c3_strays` / `b6_c3_strayLeft`; `b6_c3_mended`; `b6_c3_burnedOk`.

**Fever:** the water wagon's "yes, but" only (no feverRisk fight). Cured by the healer at the fire (Denul, rattled).

**Trick:** The Sapper's Breath `b6_c3_breath` (✦ Wits 17; The Rope's Way). **Items:** `b6_c3_scorchedmail` (mail, +2 armour, +4 health), `b6_c3_fanaticknife` (blade, +2 hit, 1d6+3).

**Fights:** `b6_c3_sally` 190+100, `b6_c3_streets` 260+130 (mortal, `in`), `b6_c3_gate` 240+120 (`line`), `b6_c3_strays` 150 (optional). Paid ≈ 480–500. Level 13 → about 14½.

**Canon kept:** dusk; marines first, then Keneb's and Baralta's; Blistig the reserve; nearly three thousand inside; 791 out by the way through the fire (pp. 261–262); "the girl" made it (Sinn is named only by soldiers and in the finale's coda). Never the palace gate, Truth, the temple, the tunnels.

## Chapter 4: G'danisban (`src/104_b6_ch4.js`, the Fourth)

The camp before G'danisban in the rain; "Captain Kindly" (the squad never hears the name Paran); Dujek dying in the field hospital, seen from the mud outside; the shapes in the camp (the squad stands still; no Hound dies); the cult at the ditch; the streets outside the walls; the morning the fever breaks; the bell; the vote; the armour; the tomb from the lines. Phases `b6_c4_ph` 1–3.

**Key `b6_c4_key`:** `vote` (from the back of the Seventh; Brisk +1, Ohl +1, Brannoc −1) or `out` (on picket while the Host votes; Tuft +1, Brannoc +1, Ohl −1; `b6_c4_letThrough` 1/0). The vote is unanimous either way. **Read later:** Ch6 (the High Fist's eye, `b6_c6_eye`), Ch7 (the Fourth's road page).

**Flags:** `b6_soliel` 1 (set at the morning; `b6CanCure()` true from here on); `b6_ressaDone` 1/2; `b6_c4_letThrough`; `b6_c4_hounds` `still`/`shaken`; `b6_c4_cultDone`, `b6_c4_streetsDone`, `b6_c4_cartsDone`; `b6_c4_kindly`; `b6_c4_bell`, `b6_c4_word`; `b6_c4_carried` (a number).

**Reads:** `b6_c2_key` (`pass`, `burn`, unset: neutral).

**Fever:** `b6_c4_cult` and `b6_c4_streets` (both feverRisk; the second is Claude's call); the water detail's "yes, but". Cured at the captain's cot (once), by Ohl at the fire, and by the carriers at the morning (all).

**Recruit:** Ressa, out of the city at the picket. **Trick:** The Surgeons' Vinegar `b6_c4_vinegar` (A Courtesy of Darkness, not sorcery). **Items:** `b6_c4_raincloak`, `b6_c4_dyerknives`.

**Fights:** `b6_c4_carts` 140 (optional), `b6_c4_cult` 220+120, `b6_c4_streets` 200. Paid ≈ 410 + checks. Level 13 → about 14½.

## Chapter 5: The Kokakal Shore (`src/105_b6_ch5.js`, the Third)

The Sotka road with the plague behind; a plague village (optional); deserters at a way-station; the shore camp and Nok's transports; Coltaine's cairn; the Wickans' shame (a young rider; Temul never met); the word along the beach that Fist Keneb pulled his soldiers off the ships on a boy's warning; the walk-in, faceless; the black ship as sailors' talk; the finger bone; looters at the boats. Phases `b6_c5_ph` 1–3.

**Key `b6_c5_key`:** `wait` (ashore a day with the company's last boat, as Keneb's 8th do; Tallow +1, Mehet +1, Marrow +1, Tebbet −1) or `sail` (aboard at first light at anchor; Tebbet +1, Darrut +1, Tallow −1). The text never says when the fleet sailed. **Read later:** Ch6 (`wait`: one line of rumour), Ch7 (the intro, the ambush, the journal).

**Flags:** `b6_bone` 1 (unset if declined, `b6_c5_boneNo`); `b6_c5_survivors`; `b6_c5_missing` (on `in`, the first of the Ch3 dead, looked for and not there, said once); `b6_c5_desMercy` `back`/`go`; `b6_c5_desDone`, `b6_c5_boatsDone`, `b6_c5_villageDone`; `b6_c5_horseOk`; `b6_c5_shrine`, `b6_c5_left`; `b6_c5_word`, `b6_c5_ship`; `b6_c5_mehet`, `b6_c5_mehetSaid`; `b6_c5_rope`, `b6_c5_ropeGot`.

**Reads:** `b6_c3_key` (`in`, else `line`), `S.dead[*].ch === 3`, `b6_c1_key` (`bury`: one line; else none), Mehet.

**Fever:** the village well's "yes, but" and `b6_c5_village` (feverRisk), both optional. Cured at the surgeons' tents (all) or by the healer at the fire.

**Trick:** Wickan Horse-Talk `b6_c5_horsetalk` (✦ Wits 17; the Claw Hand-Cant). **Items:** `b6_c5_fingerbone` (+4 health; sets `b6_bone`), `b6_c5_nokrope` (+1 Might).

**Fights:** `b6_c5_village` 130 (optional), `b6_c5_deserters` 180+90, `b6_c5_boats` 180+90. Paid ≈ 400 + checks. Level 15 → 16.

## Chapter 6: The Falling Sky (`src/106_b6_ch6.js`, the Fourth; its last chapter)

The night march north-east of G'danisban under the High Fist; twelve lights in a curve below the moon; the column halts and the High Fist rides off with a handful (never the gate); bandits and cultists at the baggage; the day camp; Sweetcreek and Rythe Bude through a tent wall; Hanar Ara: Mathok's surrender seen from the line, "Let them go"; the cult at the city's edge, never past the outer shrines. Phases `b6_c6_ph` 1–4.

**Key `b6_c6_key`:** `letgo` (Ohl +1, Ressa +1, Brisk −1) or `report` (Brisk +1, Kettle +1, Ohl −1; `b6_c6_reported`; nothing comes of it in this book).

**The Fourth's road `S.f.b6_fourthRoad`:** `highfist` (on with the Host; Brisk +1, Brannoc +1), `hanarara` (the picket the High Fist leaves on the Hanar Ara road, a few days, short of the outer shrines, back when sent for; Ohl +1, Ressa −1), `home` (the time-served list, the coast and a ship west; Ohl +1, Kettle +1, Brisk −1). Default `highfist` everywhere it is read.

**`B6CH6.fates`** is an object: `half()`, `road()`, `key()`, `roadPage()`, `page(id) → {title, txt}` (brisk, kettle, tuft, ohl, brannoc, ressa, sohra, greysword, ellis, vell, `sgt`; anyone else a short default) and `pages()`. Each page reads the road, the key and the soldier's loyalty in the Fourth's half. **Ch7 reads `page(id)` with the Fourth swapped in** (fixed in this read; see below).

**Flags:** `b6_c6_reported`, `b6_c6_lights`, `b6_c6_surr`, `b6_c6_eye`; `b6_c6_nightDone`, `b6_c6_wellsDone`, `b6_c6_cultDone`; `b6_c6_foldOk`, `b6_c6_foldBy` `tuft`/`ohl`.

**Reads:** `b6_c2_key`, `b6_c4_key`, `b6_c5_key` (rumour), `b6_soliel`.

**Fever:** `b6_c6_cult` (feverRisk) and the edge's "yes, but". Cured by a carrier on every map, or Ohl.

**Trick:** The Fold Remembered `b6_c6_fold` (✦ Wits 17, Tuft, else Ohl; Tattersail's Fold, card screen only). **Items:** `b6_c6_starstone` (+1 Wits; never said to be from the lights), `b6_c6_hanararobe` (light, +1 armour).

**Fights:** `b6_c6_night` 230+110, `b6_c6_wells` 160 (optional), `b6_c6_cult` 210+100. Paid ≈ 486.

## Chapter 7: Malaz City, and the end of Book Six (`src/107_b6_ch7.js`, the Third)

On a transport of Nok's fleet: the Edur ambush from the rail (the wall of water and the wall of earth, "the High Mage's work" as the next ship shouts); Sepik wrecked and empty; the Perish alongside, Ottar sent across; the Nemil ships running; the cold realm (ice, roaring water, wolves far off); the Jakatakan fleet; Malaz City from a jetty along from the marines' (Keneb's words reach the squad as shouts; a runner's paraphrase only); the pogrom against the city's Wickans; the mob; the City Guard; the horns; three roads. Phases `b6_c7_ph` 1–5.

**Key `b6_c7_key`:** `adjunct` (out with the fleet; Book Seven imports it: `b67Onward(s)`), `jetty` (left in Malaz City), `wickans` (into the lanes after a Wickan family, `b6_c7_streets`, out by the landward gate).

**Reads:** `b6_c1_key` (`bury` / `leave` / unset: no line), `b6_c3_key` (`in`, else the gate), `b6_c5_key` (`sail`, else a day ashore), `b6_bone`, the Ch3 dead; the Fourth's keys and `b6_fourthRoad` on the Fourth's pages.

**Flags (for Book Seven):** `b6_c7_key`; `b6_ottarDone` 1/2/0; `S.tricks.b6_c7_wall.who`; `b6_c7_mobDone`; `b6_c7_guardDone` `talked`/`fought`; `b6_c7_alleyDone`; `b6_c7_streetsDone`, `b6_c7_gone`; `b6_c7_shouts`; `b6_c7_ambushDone`, `b6_c7_sepik`, `b6_c7_perish`, `b6_c7_realm`, `b6_c7_wolvesHeard`, `b6_c7_jak`.

**Fever:** no fight spreads it; the fire and the hold cure it (healer, else a carrier, else the surgeons).

**Recruit:** Ottar at sea. **Trick:** The Grey Helms' Wall `b6_c7_wall` (✦ Might 17; Blue Fire's mechanics, not a throw). **Items:** `b6_c7_greyhelmshield` (shield, +2 armour), `b6_c7_malazcloak` (light, +1 armour, +3 health).

**Fights:** `b6_c7_alley` 220 (optional), `b6_c7_jetty` 400+220, `b6_c7_guard` 320 (or talked off, Wits 17), `b6_c7_streets` 320+140 (`wickans`). Paid 564 base, 696 with the alley. Level 16 → 18 (17 if the Guard is talked off and the alley skipped).

## The finale (`B6CH7.finale`, `B67FIN`)

The Third's road, a page per Third squadmate (the key, a memory, the barrows and the fire, the bone, a trick, loyalty), the Third's fallen and waiting, the Third's sergeant; then the Fourth's road page (`B67FIN.fourthRoad`, with Ch2/4/6's keys in one paragraph), a page per Fourth squadmate (Ch6's text and titles), the Fourth's fallen and waiting, the Fourth's sergeant (Book One's look); then *Where the books meet*; then 37's end page (coda, roll of both squads' dead, credit to Steven Erikson and Ian C. Esslemont). Ottar's page carries no barrows, fire or bone line.

## The visions (`src/108_b6_visions.js`)

`b6v1`–`b6v7`, one per chapter, through each squad's reader: Leoman at the Lato well; Apsalar in Ehrlitan; Corabb in the Queen of Dreams' temple (he refuses the way out, finds the children, and the vision stops as the Malazans come in, which agrees with the wiki's *Corabb*, checked Nov 5); Hurlochel by Dujek's cot; Keneb with Grub's warning; Noto Boil as the lights fall; Keneb on the jetty. Words-only flags `b6vK_*`. No chapter reads them.

## Left open on purpose (for Book Seven and after)

- Where the family went on Ch2 `burn`; whether anyone asks about Ch2 `pass`.
- Whether Brannoc goes back to Sweetcreek (Ch6's `highfist` page says he does, and visits).
- What the shapes at G'danisban were; what died in the city; who the painter is.
- Whether the walk-ins already wore bones; when the fleet sailed.
- Kettle on `home`: whether she gets off at Falar. Where the time-served land.
- The bandit captain's black stone.
- Kalam's and Quick Ben's fates, Leoman and Dunsparrow, Felisin Younger, Mallick Rel and Korbolo Dom, Tene Baralta and Gethol, the Perish's purpose, what Paran promised Hood: bh-canon §7, all kept.
- Mehet's dawn line ("I will remember which"), unused.

## The continuity read (Thu Nov 5, 2026)

**Clean checks (no finding):**
- Banned strings across 101–108: Kellanved, Dancer, Ammanas, Laseen, Surly, Topper, Talon, Eel, T'orrud, Burn's Sleep, any `11xx` year: zero. "Paran" only in code comments. "Bonehunters" once in play text (Ch7, a soldier's mouth), as §7 allows.
- Hard limits (bh-canon §6): the named places and canon characters appear in Ch1–7 only in code comments, as seen-at-a-distance, or through a runner or a tent wall. No word with any canon character.
- Squad separation: no Third id is guarded or named in 102/104/106, and no Fourth id in 101/103/105; Ch7 reaches the Fourth only through `b67AsH` and `NAME()`.
- Every key is read with a default: `b6_c1_key` (Ch3, Ch5, Ch7), `b6_c2_key` (Ch3, Ch4, Ch6, Ch7), `b6_c3_key` (Ch5, Ch7), `b6_c4_key` (Ch6, Ch7), `b6_c5_key` (Ch6, Ch7), `b6_c6_key` and `b6_fourthRoad` (Ch6's fates, Ch7), `b6_bone` (Ch7), `b6_soliel` (through `b6CanCure()`). Values match `B6KEYS` and every `chapterEnd(K, key)`.
- Recruits: `b6Join` with the right id in the right chapter; join flags are 100's `B6_DONE`.
- Fever with `stage2`: 100's hook skips `isStage2`, so Ch2's village and Ch4's cult catch once (Ch6's `feverRisk:null` is harmless).
- No exclamation marks in narration (only in battle-cry choices). The sergeant is never gendered ("sir" is the sergeant to the captain).
- The Corabb vision checked against the wiki (above).

**Fixed in the continuity read:**
1. **`B6CH6.fates` shape (continuity, the big one).** Ch7 looked up `B6CH6.fates[id]` (a string or function per soldier); Ch6 shipped an object with `page(id)`. Every Fourth page fell back to Ch7's generic line. Ch7's `B67FIN.fourthText` now reads `page(id).txt` when `page` exists (then the per-id shape, then the fallback), and a new `B67FIN.fourthTitle` takes Ch6's page titles.
2. **The Hanar Ara road (continuity).** Ch7's road page and fallback had the Fourth staying "at the City of the Fallen … among the plague-marked"; Ch6 has a picket on the road, short of the outer shrines, back when sent for. Rewritten to Ch6's. Title "At Hanar Ara" → "The Hanar Ara road" (Ch6's).
3. **The road home (continuity).** Ch7: "on the first boats that would take soldiers, with the High Fist's leave or without it"; Ch6: the time-served list. Rewritten to the list.
4. **The Third's captain (continuity).** Named Captain Hollet, Book Four's, in every label and map figure of 101/103/105/107 and once in Ch1's prose (rule above).
5. **Ottar at Y'Ghatan (continuity).** Ch7's fate page gave Ottar the barrows, the fire and the finger bone. Now none for him.
6. **Ch1 `leave` asserted on an unset key (continuity).** Ch7's barrows line said "the barrows stayed open" when Ch1 was never played; now only on `leave`.
7. **"A day longer at sea" (canon).** Ch7 had a `sail` squad at sea a day before the fleet; Ch5 keeps it at anchor and the fleet sailed together. Now "a day longer on its transport", "at anchor while the 8th sat a day on the shore".
8. **"Three thousand" in the coda (canon):** now "nearly three thousand" (W7, as Ch3 has it).
9. **Tuesday and Friday (style):** real weekday names in a Malaz City widow's line. Now "at the start of the week … by the end of it".
10. **Repeated new phrases (style):** "The camp says a great many things" in four chapters (Ch2, Ch3, Ch4, Ch5): kept in Ch3, reworded in the other three. "The night before the siege" 12 times across 1/3/7: three reworded in Ch3 and Ch7 (now 7, mostly Ch1's own journal and deeds lines).
11. **Kettle "found out" to be Falari (continuity):** Ch6's fate page; Ch2 has her Falari and known as such. Now "know she is Falari".

**Repeated phrases left (scan, five or more across three or more files):** "seven hundred and ninety-one" (≈8 in prose, Ch3/5/7: the canon count, kept); "a long way off" (19, 11 of them Ch7, partly Rasp's habit "I'd rather be a long way off"); "the camp says" as a rumour device (23 across Ch2–6, now without the "great many things" tag); "out of the smoke" (8), "the road goes on" (10), "scarves over their faces" (5). `trope_scan --files`: Book Six inside every budget. `repeat_scan`: Book Six hubs all fold in play; the one paragraph repeat (`b6_c5_start` / `b6_c5_deck_back`) is an alias node, which `talk()` folds.

**Open for the lead (no combat numbers, fight definitions, item stats or key values changed):**
1. **Levels for the Fourth.** Ch4's notes end a run at about 14½; Ch6's notes and `play.mjs --from=6` start it at 15 (4540). The brief says Ch6 ends at about 16. Check the Fourth's xp track in the balance pass.
2. **Warrens in combat.** Ch4 (0.85–0.9) and Ch5 (0.85) cut Denul and Meanas in fights for the plague; Ch2, Ch3, Ch6 and Ch7 do not. One rule for the book is David's call.
3. **Ch7's xp:** talking the Guard off costs 192 paid xp and can leave the Third at 17. The writer's suggestion: pay the talk.
4. **VET_LVLS has a level 17 but `PICKS.vet` six picks** (Ch7's guarded workaround skips it). A seventh veteran pick in 014 is the real fix.
5. **The lights: day or night** (bh-canon §15 / Q21): Ch6 is a night march; Reactor's ch 20 reads as daytime. The vision fits either. A page check of BH ch 20 for David's copy.
6. **The Fourth's sergeant page is second person** ("You march on…") inside the Third's finale. It reads as a letter to that sergeant; re-voice only if David wants it third person.
7. **Mehet waiting at "the camp's edge"** (`B6_HOME`): if he waits in Ch1 and is fetched later at Ch5's or Ch7's fire, the home text is stale. 100 is the lead's file.
8. **Sergeant Radde** is not in Book Six; a line placing him (or his absence) would sit well beside Hollet in Ch1 if David wants it.
