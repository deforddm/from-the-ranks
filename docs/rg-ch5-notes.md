Thu Nov 5, 2026, 7:07 PM PST. Book Seven, Chapter 5, "The Village" (`src/125_b7_ch5.js`, art `src/125b_b7_ch5_art.js`, test `tools/b7ch5_test.mjs`), against the Book Seven engine on `book7` (v10.0.0, not shipped).

# Chapter 5 notes: The Village

The Third, lent to Fist Keneb's column as a squad of heavies, near the river and a few days short of Letheras (RG ch 21; rg-canon §2, W21). The column has been funnelled between Edur bands to the north and the Lether River to the south, and has broken into squads to hide in the villages. The squad lives in the gaps: a mill village of its own on the river side of the funnel, the same night as the tavern village, never that village and never its squads. **This chapter holds the book's one mortal fight** (plan Q5, Claude's call standing), on `hold`, signposted, with `slip` a real road out.

## Shape

- **Areas (3):** `b7_c5_lane` (the river road at night, ground `plain_night`, dark; `F` the halt, `R` the river's edge, `<` west, `>` east to the village), `b7_c5_street` (the mill village by day, `b5_c5_farm`; `B` the factor's door = the cellar and the fire, `d` the bailiff's door, `h` the meeting house, `q` the square, `w` the well, `m` the mill, `e` the north gate, `>` the mill-race and the river path), `b7_c5_bank` (the riverbank at night, `b5_c3_bank`, dark; `F` the lie-up in the reeds, `x` a mooring stake = the river, `<` back across the fields). All grounds are existing tiles.
- **Nodes:** 62 `b7_c5_*` dialogue nodes (the reading's two included).
- **Phases:** `S.f.b7_c5_ph` 1 the river road (set at `b7_c5_start`), 2 the village by day (set on the choice into the village), 3 dusk: the warning, the key and its fight (set on the fire's "Wait for dusk" choice), 4 the riverbank after (set on the choice down to the bank, either key). Phase changes are on choices.
- **The order a player meets things:** the lieutenant opens the scouts; the scouts open the boy; the boy opens the village; the cellar is the first halt; the mill-woman opens dusk (and tells of the bailiff); dusk opens the key; the key's fight opens the bank; the lieutenant on the bank opens the end.
- **The first halt** is `b7_c5_cellar` (the factor's cellar, the brief's reading place), with `b7ReadChoice(5)`; the reading is also at the cellar fire in phase 2. The night march has no halt (Claude's call, as Ch1 put its reading at its first halt rather than its start node).
- **The fire** `b7_c5_fire` (id kept for the games pass): phase 1 "no fire on the march" (talk only); phase 2 the cellar (the Deck, a rest `b7_c5_rest2`, the talk, `risingHTML()`, "Wait for dusk" once the mill-woman has spoken); phase 3 "no time" (talk only); phase 4 the lie-up in the reeds (a rest `b7_c5_rest4`, the talk, `risingHTML()`, the dead named, "First light. On with the column" once the lieutenant has spoken). Every list ends "Not now". `ROSTER_FIRES.rg[5] = ['b7_c5_fire']`. The talk has a line for every soldier the Third can field, before and after the key, both keys: Haddat, Sathi, Tangle, Marrow, Mirrel, Tallow, Hessa, Tebbet, Darrut, Yorin, Rasp, Orvas, Ramin, Keth, Mehet, Ottar, Doss, Wenna; and on `hold` one more line for the gap in the ring.

## The key `b7_c5_key` (the village)

At dusk an Edur band (forty or fifty, with a K'risnan) turns down the north lane for the village that hid the Malazans. Chosen with the mill-woman in the square (`b7_c5_key`), with `risingHTML()` shown and Haddat, Doss, Mirrel, Tangle and Wenna speaking if they walk. "Not yet" steps back. The fx is guarded (`!S.f.b7_c5_key`), so the moves happen once.

- **`hold`: THE MORTAL FIGHT.** The choice reads *"We hold the village." (a mortal fight: whoever falls here stays down)* with `tag:'mortal'`, as Book Six's Ch3. The warning is repeated on the next two steps (`b7_c5_hold` and `b7_c5_roof_ok`/`_no` offer "The street. (a mortal fight: …)"; `b7_c5_hold_start` says "Whoever falls here stays down." and its go button carries the tag) and the engine adds its own line in the fight log. `b7Rise(2, 'the Third held a village that hid it')`. Haddat +1, Doss +2, Wenna +1, Mirrel −1, Marrow −1.
  - **The relief the Third makes for itself (the brief): the roof.** Before the street, the squad's sapper (Tangle, else Rasp, else the sergeant) can put **a cusser, or on Ch1 `strip` the transport's last two sharpers bound together**, in the factor's gable beam over the square (`b7_c5_hold`, ✦-less wits 15, **`rise:true`**: the village carries it up the loft on Ch3 `ledger`, +2). Spent on success (`b7_c5_roof_ok`); on a fail the beam is rotten and the munitions are kept (`b7_c5_roof_no`); "yes, but": through the factor's ceiling, bruised. `S.f.b7_c5_roof = 1`.
  - **The fight `b7_c5_village`** (`mortal:true`, `stage2`). The street: hold four rounds (`objective:{type:'survive', rounds:4}`) while the village goes down to the river by the mill's race door, with two waves. Stage 2, **"The square by the mill"**: the war-leader's rush. With the roof, it comes down on them: stage 2 is the war-leader and two Edur, and the squad moves first (stage 2's `foes` and `surprise` are getters reading `S.f.b7_c5_roof`). Without it, the war-leader, three Edur and a K'risnan.
  - **The dead:** the engine (`win()`, `kill()`) records anyone down at the end as `S.dead[id] = {ch:5, where:'The square by the mill'}` (the ground's title; a downed soldier in the first ground is dragged up into the second, as 31c does). `S.f.lastFallen` names them in `b7_c5_hold_after`; the village buries them by the mill-race; they are named at the fire, in the fire talk's gap line, in the lieutenant's count, the bank, the journal, the extras and the end node ("shorter by one"). `b75Fell()` reads `S.dead` entries with `ch:5` and no `from`. The sergeant falling gets the engine's scar, never death.
  - After: the village comes back up from the river; the mill-woman ("Heavier than I was told"); the war-leader's blade; bread at the race door; down to the bank.
- **`slip`:** out by the mill's race door and the river path at night, leaving the Indebted who hid the squad. The choice carries no mortal tag. `b7Rise(-2, 'the Third left a village that hid it')`. Mirrel +1, Marrow +1, Tangle +1, Haddat −1, Doss −2, Wenna −1. The village shuts its doors. **The fight `b7_c5_slip`** (not mortal, `stage2`): the river path, keep moving three rounds (`survive`), one wave; stage 2, "The ford", three Edur and a wraith on a gravel bar. The Edur blade from the ford. Then **a light over the trees where the village was, most of the night** (never shown nearer: headline only).
- **`b7Guides()` read at dusk** (the brief): Rising 6 or more, the village's children have watched the lane all afternoon and run in, so `S.f.b7_c5_warned = 1` and **either key's fight starts with `surprise:'p'`** (the squad set, a round's head start). Below 6, a man running in from the fields, no head start.
- **Read later (the brief):** Ch7 (the fallen, the coda), the finale.

## The Rising (moves in this chapter)

| Where | Move | When |
|---|---|---|
| `b7_c5_key` → `hold` | `b7Rise(2, 'the Third held a village that hid it')` | the key, once |
| `b7_c5_key` → `slip` | `b7Rise(-2, 'the Third left a village that hid it')` | the key, once |
| `b7_c5_bailiff_after` → "the village can decide" | `b7Rise(1, 'a bailiff handed to his village')` | the chapter's own ±1 scene, once (the other choice, tie him for the column, moves nothing) |

From the `--from=5` test save (Rising 6): bailiff to the village + `hold` ends at **9 (risen)**; + `slip` at 5; column + `hold` 8; column + `slip` 4. No "yes, but" moves the Rising.

**`rise:true` checks:** asking the women at the well for the short way to the north lane (guile 15; Doss +3, Wenna +1, Marrow +1, the sergeant +2 on Ch3 `ledger`, Ottar −2, Sathi −1; success gives the bailiff fight `surprise:'p'`; "yes, but" nettles, bruised), and the roof (above). The Third's edge "The Rising" applies (+1 stirring, +2 rising, +3 risen).

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b7_c5_key` | `hold` / `slip` | the key |
| `S.dead[id]` | `{ch:5, where:'The square by the mill'}`, no `from` | who fell in the mortal fight (`hold` only). Imported dead carry `from` and are not these. |
| `b7_c5_holdDone` / `b7_c5_slipDone` | 1 | the key's fight won |
| `b7_c5_roof` | 1 | the factor's roof was rigged and brought down on the war-leader's band (`hold` only) |
| `b7_c5_warned` | 1 | the village's children warned the Third in time (`b7Guides()` at dusk) |
| `b7_c5_bailiffDone` | 1 | the bailiff riding to sell the village was caught on the north lane (optional); **also drops one foe from the key's first ground** (the Edur do not know the squad's count) |
| `b7_c5_bailiff` | `village` / `column` | handed to the village (locked in the mill; what they do after is never said) / tied in the factor's stable for the column |
| `b7_c5_shield` | 1 | the mill-woman gave the village's old shield (always offered) |
| `b7_c5_boardDown` | 1 | the quarter-day board went down the well, and floated |
| `b7_c5_squareOk` / `b7_c5_squareTried` | 1 | the trick learned / rolled |
| `b7_c5_desk` | 1 | the factor's desk searched (a salve; his order to the bailiff) |
| `b7_c5_roadDone`, `b7_c5_miller`, `b7_c5_lt3` | 1 | the scouts beaten; the mill-woman spoken with; the Fist's word on the bank |
| `b7_c5_drawn` / `b7_c5_reader` / `b7_c5_noCard` | | the reading (120c) |

**Defaults (what this chapter reads):** `b7_c3_key` (`ledger`: word of the burned rolls came down the valleys, the whole village hides the squad, bread at the doors, the boy asks "Are you the ones that burned the rolls?", the roof check +2 and the well check +2; `loot` or unset: the mill-woman alone, doors shut, the boy comes because the village is afraid); `b7_c1_key` (`strip`: the transport's two sharpers can rig the roof; the lieutenant's look); `b7_c4_key` once, as the lieutenant's rumour on the bank (`letherii`: "its officers and the Edur aren't speaking"; `edur`: "with the Edur watching it from every hill"; unset: "an army out against us"). `b7OtherName()` is not used. Doss and Wenna through `b7In()`.

## Recruits

None join in this chapter. **Doss** has lines at the start, the boy, the cellar, the fire (both sets, both keys), the mill-woman, the bailiff, the quarter-day board (his own scene: he reads the red notches), the factor's rooms, the key, the slip, the hold's end, the bank (his own scene: "I didn't know you could just give a thing" / "I thought the soldiers would be different"), and the end. **Wenna** at the start, the scouts, the river's edge, the fire, the mill-race, the key, the ford, the water, the bank (her own scene) and the end. Nothing here changes either's walking.

## The trick: Hold the Square (`b7_c5_square`)

✦ wits 17 at the square at noon (`q`). Taught by **Haddat** (a Hissar garrison sergeant's drill), else **Ottar** (the Grey Helms' wall that goes forward), else **Darrut** (the Aren Guard's parade ground), else the sergeant's half-memory of the Aren drill-ground (so the trick is always offered). Edges: Haddat +3, Ottar +3, Darrut +2, Hessa +1, Ramin +1, the sergeant +1, Tangle −1, Marrow −1, Wenna −1. "Yes, but": a shield-rim in the ribs, bruised. **Mechanic: Blue Fire** (`bluefire`, as Book Six's Grey Helms' Wall): twice a chapter (one more from level 5), range 4, 2d6+level to everything in a 3×3, squad included, and everything caught is reeling (−3 to hit through the next round). Words: four shields out, corners locked, and on the word the square steps, all four faces, three paces, at once. Not sorcery.

## Items

- `b7_c5_villageshield` (armour, `role:'shield'`, `ac:3, hp:2`): the village's old shield off the meeting-house wall, oak and iron and hide, a heron in faded blue. The chapter's real number (the series' only other shield is Book Six's at ac 2). From the meeting house, always.
- `b7_c5_edurblade` (weapon, `role:'heavyweapon'`, `atk:1, dmg:[1,12,4]`): the war-leader's long blade on `hold`, the ford's Edur's on `slip`.
- Both drawn in 125b on Book Six's smoke-umber ground (200×150); borrowed placeholders with `??=` in the chapter file.

## Fights (numbers for the balance pass; no rule changed, no balance run)

Ch5's `FSCALE` row is health ×1.8, to hit +4, damage +2 (Soldier and Bridgeburner). Paid xp is ×0.6; a second ground pays the first's xp plus its own.

| Fight | Where | Foes | xp raw (paid) | Notes |
|---|---|---|---|---|
| `b7_c5_road` | the river road, night | `b7_edurspear` ×3, `b7_wraith` ×2 | 200 (120) | required; `dark`; ambush check guile 15 (Wenna +2, Doss +2, Sathi +1, the Shake track +2, Ottar −2, Darrut −1) |
| `b7_c5_bailiff` | the north lane, afternoon | `b7_factorman` ×3, `b7_lethxbow` | 150 (90) | optional; `surprise:'p'` by the short way |
| `b7_c5_village` (**mortal**, `hold`) | the village street: survive 4 rounds | `b7_edur` ×2, `b7_edurspear` ×2, `b7_krisnan`, `b7_wraith` (dropped if the bailiff was caught); wave r2 `b7_edur`, `b7_wraith`; wave r3 `b7_edurspear`, `b7_wraith` | 320 | `surprise:'p'` if warned |
| · stage 2 *The square by the mill* | | roof: `b7_edurchief`, `b7_edur` ×2, squad first / no roof: `b7_edurchief`, `b7_edur` ×3, `b7_krisnan` | +160 (480 total, 288 paid) | |
| `b7_c5_slip` (`slip`) | the river path: survive 3 rounds | `b7_edurspear` ×3 (one dropped if the bailiff was caught), `b7_wraith` ×2; wave r2 `b7_wraith` | 260 | not mortal; `dark`; `surprise:'p'` if warned |
| · stage 2 *The ford* | | `b7_edur` ×2, `b7_edurspear`, `b7_wraith` | +130 (390 total, 234 paid) | |

Scaled at Ch5 (base from 120, rounded as the engine does): Edur warrior about 72 health, ac 16, +16, 1d10+6, parries; Edur spearman about 61, ac 15, +16, 1d8+6, reach; Edur war-leader about 140, ac 17, +17, 1d12+7, boss, parries and rallies; K'risnan about 61, ac 14, +15, 1d8+5, range 4, dazes and drains; shadow wraith about 40, ac 15, +15, 1d6+5, drains, move 5; factor's guard about 50, ac 14, +14, 1d8+5; Letherii crossbowman about 47, ac 14, +15, 1d10+5, range 6, pins.

**Paid xp:** `hold` 498 with the bailiff, 408 without; `slip` 444 / 354. A `--from=5` save at 18 ends at 19 on any path (the test saw 5728 on `hold` with the bailiff).

**For the balance pass to watch:** the mortal fight is the book's one place a death is permanent. The street is a survive fight with three waves against Edur who parry, so it will not end early. The roof is the designed relief: without it stage 2 carries a 140-health boss, three Edur and a K'risnan on a squad that has just held four rounds. David's Bridgeburner target (about 75–80% before the gods) should be read here with the roof and without; a smart Soldier player should always have the roof on a fresh path (Ch1's issue includes one cusser).

## Canon used, and calls

- **The funnel** (W21): Edur bands north, the river south, the column broken into squads in the villages. **Hellian and Urb's villages** (W21): headline in the intro and the lieutenant's mouth ("marines up the road… the factor's men, the money-lenders, the officials… the people warn us"), never named.
- **The tavern village** (W21): heard of only, as "the big village with the tavern" up the road where marine squads are holding and the Edur are going in hundreds; on the bank, "the big village held… a cusser took the factor's house and the whole street with it" (W21's cusser), and "some of them didn't come out". **No squad, sergeant or marine is named. Bowl, Lutes and Tavos Pond are never mentioned** (rg-canon §15 Q1 is open; nothing here says who died there). The test fails on Hellian, Urb, Bowl, Lutes, Tavos, Primly, Badan.
- **The 3rd Company's stolen boat** (W21) is never mentioned. The river's boats are "gone from this bank" (a landing with cut ropes, a burned keel); Wenna's "All of them" is her belief. The relief in the village is the Third's own roof, never a boat.
- **Keneb's push for the capital and Sort's rearguard** (W21): the lieutenant passes the Fist's word ("we go for the city, hard, at first light"; "Captain Sort has the back of the column. The Third walks with my lot"). **The Third is not put in the rearguard of ten squads of heavies**; it walks with the lieutenant's company. Keneb is never seen. His council is not entered.
- **Sort's word that the Letherii won't rise** (W14, W17): the lieutenant, once.
- **The killing field** (ch 22) is next and not touched; the tease is the Letherii's Ch6.
- **Hard limits held:** not the tavern village or its mews; not Hellian, Urb or any named squad; not Bowl, Lutes or Tavos Pond; not Primly's boat; not Keneb's council. No Burn's Sleep year; never Kettle, Mael, "Tehol the Only", the K'Chain Che'Malle or a never-use name. "Bonehunters" is not said. No exclamation marks (the test checks every node in every phase and key). The Third is never called marines (checked).
- **Tone:** the Edur's treatment of a village that hid Malazans is said, not shown ("The Edur do not leave a village that has hidden Malazans"). On `slip` the village's fate is a light over the trees seen from a ford and a riverbank. On the bailiff, "what the village means to do with him after, it keeps to itself". Nothing lurid; no bodies in close-up in the art.
- **The Edur in a village** fight with long blades and spears, a K'risnan's dark, and shadow wraiths (Book Five's Edur kinds).

## Inventions (unnamed, by role)

- **The mill-woman** (sixty, floury, "a face like a fist"; her husband's grandfather bought the mill's stones from the factor's father and they are still owed; her grandson's father went to the Letherii army to pay down the family's line and the Edur sent his company east). **Her grandson**, about ten, who brings the Third in (her "Gran says"). The village's women at the well, the boy's mother, the men who carry the roof-cusser up (on `ledger`).
- **The bailiff** (the factor's man, Indebted himself; was at the mill-woman's wedding) and two of the factor's men and a crossbowman. His letter to "the honoured warriors of the Tiste Edur on the ridge", with names. **The factor** (unnamed, in the city a month with his horses and plate; his mark a mill-wheel; a painting of him in a blue coat). He is a third factor, distinct from Ch1's and Ch3's.
- The mill and its race door (the great-grandfather's, "for when the tax-men came"), the quarter-day board, the meeting house and its old shield from a war before anyone's grandmother.
- An Edur war-leader (no name), his band, a K'risnan.
- A marine sergeant on the road ("we've got the one with the pig-farm"), marines in the reeds. The lieutenant (Ch1's, a she). The old marine who reads when neither Marrow nor Tallow walks (Ch3's fudge: "The 9th's went home on a pinnace").
- **No new named people.**

## Unsure, or left open

- **Bowl, Lutes and Tavos Pond** (rg-canon §15 Q1): never named; if David's page check settles it, nothing here needs changing.
- **Whether the tavern village's cusser and "house to house" were the same night** as the Third's: W21 tells them in one chapter; the game puts the Third's village "the same night" and hears the other as rumour, which the canon allows.
- **The Edur band's size** (forty or fifty) is the game's; W21 says "hundreds" for the force at the tavern village, which the lieutenant repeats.
- **The old marine reader** still shows the engine's one-time "of the 9th" line the first time he reads in the book (Ch3's note stands).
- **`b7Guides()` is 6+**: on a fresh path (`burn`, prisoners freed, `ledger`) the Third arrives at 6, so the warning comes; on `strip` or `loot` paths it usually does not.

## Engine notes (outside the chapter's own nodes; all in this file)

- **Stage 2 getters:** `b7_c5_village.stage2` defines `foes`, `surprise` and `text` as getters reading `S.f.b7_c5_roof`. 31c's `battleDef` and `stageBreak` read them through `Object.assign` and `s2.surprise`, so the relief changes the second ground without any wrapper. Nothing else in the engine is touched.
- `opt.drop` on both key fights removes the bailiff's extra foe from the first ground.
- Three scenes added in `CH.scenes` (`b7_c5_lane`, `b7_c5_cellar`, `b7_c5_river`), drawn in 125b, borrowed placeholders in the chapter file. 125b also draws 120's `b7_village` (day, dusk, night; the factor's roof gone and a smoke after `hold` with the roof; a lantern by the race). `b7_c5_river` reads the key (a lantern on `hold`; a red glow and a smoke over the trees on `slip`).
- Glossary: "The funnel", "A bailiff" pushed onto `GLOSSX.rg`.
- `B7READ[5]` filled from this file (the cellar; Marrow, Tallow, the old marine).

## Tests

`tools/b7ch5_test.mjs` (16 checks): a `--from=5` start (level 18, Doss walking, Wenna waiting, the Rising 6; every node renders in every phase × key × roof with no leak, no forbidden canon name, no exclamation mark; two items drawn; four backdrops; `B7READ[5]`; the one mortal fight is `b7_c5_village`), the road (the lieutenant, the tavern village heard of, no fire, the scouts' ambush edge, the scouts forced, the boy's `ledger` line, into the village), the reading in the cellar (Marrow; the Herald leans the pool; back `b7_c5_fire`), the cellar fire (rest, a line each, the Rising box, Not now, dusk gated on the mill-woman), the mill-woman and the bailiff (the well's rise:true check with Doss +3 and "The Rising" +2, the short way's surprise, the fight forced, the village +1 once / the column 0 from the same moment), the board and the shield, the trick (Haddat; its battle half hits a 3×3 and dazes), dusk with the warning (b7Guides at 6), the key (hold signposted with the mortal tag and words, slip, Not yet, the Rising shown), `slip` (−2 once; not mortal; survive; head start; the extra foe dropped; both grounds; the blade; the glow; the bank), `hold` (+2 once; the roof's rise:true check spends the cusser; the street's start warns again; mortal, survive 4), **the mortal fight** (Mirrel down at the end of the square: `S.dead.mirrel = {ch:5, where:'The square by the mill'}`, gone from the squad, named after; three foes in the square with the roof and the squad first), the same moment without the roof (six in the street, five in the square, no head start, nobody dead when nobody is down), the bank (the dead named at the fire and in the talk's gap line, the lieutenant's push and the Letherii rumour, the journal and extras, Doss on the bank, "shorter by one"; the end at level 19), a synthetic save (no Marrow, no Haddat, no sapper; the Rising 2, `strip` and `loot`: Tallow reads, Ottar teaches, no warning, the sergeant rigs the roof with two sharpers and cannot with one), and a save that never played Chapter 3.

Results (Thu Nov 5, 2026, PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (35 warnings, none in this chapter; `b7_c5_card` in the orphan list like every chapter's card node); `b7ch5_test` 16/16 three times; `trope_scan` B7 inside budget (this file: silence 2, asifwere 1, shield 1). The rest are in the report.

**Tool edits outside my files:** none.
