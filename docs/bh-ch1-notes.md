Wed Nov 4, 2026, 9:20 PM PST. Book Six, Chapter 1, "The Lato Odhan" (`src/101_b6_ch1.js`, art `src/101b_b6_ch1_art.js`), against the Book Six engine on `book6` (v9.0.0, not shipped).

# Chapter 1 notes: The Lato Odhan

The Third of Blistig's 9th, with the Fourteenth (BH ch 3–6; `bh-canon.md` §2). Weeks after Raraku, the pursuit across the Lato Odhan; Leoman takes Y'Ghatan; the Fourteenth comes up and digs in; reinforcements under Faradan Sort; the Fists argue. The squad lives in the gaps: a well, a rearguard in a wash, the camp's edge, the barrow road.

## Shape

- **Areas (4):** `b6_c1_odhan` (the first night's camp in a dry wash, ground `b4_c2_way`, dark), `b6_c1_road` (the road by day, `odhan`, with the well as `o`), `b6_c1_camp` (the 9th's lines before Y'Ghatan at dusk, `b4_c4_camp`), `b6_c1_barrows` (the barrow road under the walls at night, `b4_c4_hills`, dark). All grounds are existing tiles; the artist owns none of them.
- **Nodes:** 65 `b6_c1_*` dialogue nodes (the deck and card nodes included).
- **Phases:** `S.f.b6_c1_ph` 1 the first night (set at `b6_c1_start`), 2 the road (set at `b6_c1_march`), 3 the camp before the city (set at `b6_c1_to_city`), 4 the barrow road (set at `b6_c1_to_barrows_go`). `S.f.b6_c1_slept` marks the night between 1 and 2.
- **The first halt** is the camp in the wash (`b6_c1_start`); `b6DeckChoice(1)` there and at the fire. `B6DECK[1]` is 100c's worked example, kept as it is (back node `b6_c1_fire`).
- **The fire** `b6_c1_fire` (id kept for the games pass) is in the wash in phase 1 (`F`) and in the 9th's lines in phase 3 (`f`): `again:` by phase, `feverHTML()` in its `html`, the Deck, a rest once a phase (`b6_c1_rest1`, `b6_c1_rest3`, with `rest()`), the squad's talk (one line per squadmate present, by phase, for every soldier the Third can field: Haddat, Sathi, Tangle, Marrow, Mirrel, Tallow, Hessa, Tebbet, Darrut, Yorin, Rasp, Orvas, Ramin, Keth, Mehet), the fever (`b6_c1_fire_fever`, a cure if `b6CanCure()` and a healer walks, costing that phase's rest), and the way on (phase 1: turn in; phase 3: the barrow road) with "Not now". `ROSTER_FIRES.bh[1] = ['b6_c1_fire']`.
- **The order a player meets things:** the captain's orders (the well) open the night's sleep; the well opens the wash; the wash's prisoner opens the city; the captain's camp orders and the edge fight open the barrow road; the key opens the dawn.

## The key `b6_c1_key` (the barrows)

Chosen at the opened barrows (`b6_c1_barrow`, any `B` on the barrow road; "Not yet" steps back out).

- **`bury`**: put the old dead back, a night's work. Haddat +2, Marrow +1, Mehet +1, Tangle −1. The rebels on the walls see the lantern moving; a patrol comes down a rope (`b6_c1_patrol`, not mortal; the "Shapes coming down from the walls" figure reopens it after "Not now"). On the win `S.f.b6_c1_patrolDone = 1`; the rebels' own dead are laid by the road under their cloaks. No rest that night.
- **`leave`**: hold the picket as ordered and rest: `rest()` once (`S.f.b6_c1_leaveRest`), Haddat −1, Tangle +1. The barrows stay open.
- **Read later:** Ch3's barrow field after the fire (`bury`: the old dead were put back before the new ones joined them); Ch7's fate pages. Mehet's dawn line ("I will remember which") is there for a later writer to use or leave.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b6_c1_key` | `bury` / `leave` | the key |
| `b6_c1_patrolDone` | 1 | `bury`: the patrol off the walls was beaten |
| `b6_mehetDone` | 1 / 2 / 0 | the engine's flag: Mehet walks / waits with the townsfolk at the camp's edge / went his own way (to Lothal, he said) |
| `b6_c1_mapOk` | 1 | the Potter's Map was learned (the trick; `S.tricks.b6_c1_map.who` holds the bearer) |
| `b6_c1_mapTried` | 1 | the map check was rolled (pass or fail) |
| `b6_c1_wellDone` | 1 | the well fight is won (always, before the wash) |
| `b6_c1_wellClean` | 1 | the squad hauled the goat out and the 9th's wagons filled there |
| `b6_c1_rearDone` | 1 | the rearguard is beaten (always) |
| `b6_c1_prisoner` | `kept` / `left` | the wounded rebel went to the captain's wagon / was left by the road with a skin (always set before the city) |
| `b6_c1_news` | 1 | the squad heard from the prisoner that Leoman killed the Falah'd at the gate and sent the city to Lothal (always) |
| `b6_c1_edgeDone` | 1 | the knives from the postern were beaten at the camp's edge (always) |
| `b6_c1_sortSeen` | 1 | the squad watched Faradan Sort's column walk in (optional) |
| `b6_c1_rumour` | 1 | the runner's camp talk: the Fists and the Adjunct, the Host and the High Fist (optional) |
| `b6_c1_dug` | 1 | the squad dug an hour with the 9th's diggers, who owe it (optional) |
| `b6_c1_names` | 1 | the squad sat at the picket's lantern (Haddat's names; Sathi's name if she is dead) |
| `b6_c1_wellWarned` | 1 | the old soldier of the 9th told the squad which way to come at the well |
| `b6_c1_drawn` / `b6_c1_reader` / `b6_c1_noCard` | | the reading (100c) |

Defaults: none of this chapter's flags is read by it with an earlier chapter's flag, since it is the first. A later chapter reading `b6_c1_key` on a save that never finished Chapter 1 should treat it as unset (no line), not as either value.

## Fever

- **Caught:** `b6_c1_well` carries `feverRisk:'the well water'` (the engine gives it to one walking squadmate when the fight ends). The well's own "yes, but" (clearing the well, might 15) is the chapter's one fever cost: `b6Catch(roller, 'the well water')`.
- **Cured:** at the fire by the squad's healer (Marrow or Mirrel on a fresh start: `HEALER()`), costing the phase's rest; or at the 9th's surgeon in the camp (`b6_c1_surgeon`), who keeps a salve for his trouble if the squad has one. With no healer walking, only the surgeon can.
- Words: sweating with no heat to sweat for, shaking, can't keep water down. The surgeon says "talk of worse on the coast" and nothing more: the plague is not named in this chapter.

## Mehet (the recruit)

- Met at the camp's west edge (`b6_c1_edge`, `b6_c1_mehet_meet`), after the knives from the postern (`b6_c1_edge`): `b6Join('mehet')` ("Then walk with us"), or wait with the townsfolk (`b6_mehetDone = 2`; the edge offers "Walk with us" again, and the roster can bring him in), or sent to Lothal (`0`; Haddat −1). With six already walking, `b6Join` sends him to wait.
- His lines: the fire's talk (phase 3), the barrow road, the lantern, the key, the bury and leave scenes, the patrol's after, the dawn.
- **His keys** (Claude's call): the doors of his family's houses, pulled down by the Falah'd's men twenty years ago to widen the wall road. Kept in the brief's words: keys to doors that are no longer there.
- **His grandfather** (Claude's call) was a well-digger before he was a potter; that is where the map comes from. Unnamed.

## The trick: the Potter's Map (`b6_c1_map`)

Taught by Mehet at the camp's edge after the fight, whether or not he joins (not if he was sent away before it): ✦ wits 17. Edges: Mehet +3, Tangle +1, Haddat +1, Rasp +1, Sathi −1, Tallow −1. The "yes, but": rattled. **Mechanic: The Line** (`line`): `B.line` with `lineCovers`, so +3 + level step armour and no flanking for the bearer and every squadmate beside them until the bearer's next turn. Words: backs to the old cut stone of a well-head. Not sorcery.

## Items

- `b6_c1_odhanveil` (armour, `role:'light'`, `ac:1`): from the bandit at the well. **+1 more against shots** (this file's `atkCalc` wrap: a ranged foe, not adjacent). Claude's call: the brief's "+1 against shots" is on top of +1 armour, so the veil is not worse than nothing.
- `b6_c1_wellrope` (trinket, `role:'any'`, `stat:{might:1}`): the well's plaited-hide rope.
- `b6_c1_rebeltulwar` (weapon, `role:'heavyweapon'`, `atk:1, dmg:[1,10,3]`): the rebel captain's on the rise.
- This file registers a borrowed placeholder picture for each (`ART['item/…'] ??=` Book Two's Wickan hide, well rope and auxiliary tulwar) so the lint passes in this worktree; the artist's plain assignment in 101b replaces them. **The lead may drop that line once 101b is merged.**

## Fights (numbers for the balance pass; no rule changed)

| Fight | Where | Foes | xp (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b6_c1_well` | the well, noon | `b6_bandit` ×3, `b6_c1_wellbow` (22 hp, ac 13, atk 9, 1d6+3, rng 5) | 160 (96) | `feverRisk:'the well water'`; surprise either way from the approach |
| `b6_c1_rearguard` | the wash | `b6_rebel` ×3, `b6_rebelbow` ×2 | 220 (132) | main |
| · stage 2 *The rise* | | `b6_rebelchief`, `b6_rebel` ×2, `b6_fanatic` | 110 (66) | |
| `b6_c1_edge` | the camp's edge, night | `b6_c1_knife` ×2 (22 hp, ac 13, atk 10, 1d6+3, `hitrun`), `b6_rebel`, `b6_fanatic` | 150 (90) | `dark` |
| `b6_c1_patrol` | the barrow road, night (`bury` only) | `b6_c1_patrolchief` (44 hp, ac 15, atk 11, 1d10+3, boss, `rally`), `b6_rebel` ×2, `b6_rebelbow` | 180 (108) | `dark`, not mortal |

Paid xp: `bury` about 490, `leave` about 385. A fresh start at 12 (3220) ends at 13 either way (the test saw 3742 on `bury`). The bot's three runs give the fight results (below). Foe numbers are the engine's; this chapter's three own foes sit at the engine's `b6_` scale.

## Canon used, and calls

- **Leoman at Y'Ghatan** (W4, W6): killed the Falah'd at the gate, made himself Falah'd, sent the citizens to Lothal with their goods; heard from a wounded rebel. The prisoner also says Leoman "took the oil from the presses, for the lamps, his men said" (W6, the *maethgara*). **This is a deliberate foreshadow:** no one in the squad makes anything of it, and nothing is changed by it. A later writer must not have the Third act on it.
- **The barrows** (W6): the Malazan dead outside the walls, dug into by the rebels, seen by Keneb, Temul and Gall in canon; the squad's stretch is its own, at night, and none of the three is there.
- **Faradan Sort's reinforcements** (W5, R5): seen walking in, named only in the soldiers' talk; a Kartool sergeant (Hellian) and a very large corporal (Urb) heard and seen, unnamed. Never spoken with.
- **The Fists** (W5, R5): through a runner: Blistig to Keneb on confronting the Adjunct, Keneb says wait. **Dujek's spirit broken** (W6) is the runner's camp talk, as the brief's line of news from the other squad. `b6OtherName()` is not used.
- **The First Sword fell at Y'Ghatan**: the old soldier's tale only ("they say a lot of things about the First Sword"). The narrator never says it.
- **The wall's patches** (Tangle): a sapper's eye on old walls, which canon brings down with munitions in ch 7. He says he doesn't know where the patches are.
- **Hard limits held:** no Imperial Warren, no Gesler's squad, no Adjunct's tent; the Fists' tent is only what a runner heard through its wall. No canon character is spoken with.
- **The captain** is the 9th's company captain, unnamed, as the brief says. **Note for the lead:** Book Four named him (Captain Hollet, with a cough, and Sergeant-of-the-line Radde). This chapter gives "the captain" a cough and a slate, which reads as Hollet to a Book Four player without naming him, and leaves Radde out. If the series wants Hollet named again, it is a one-word change in `b6_c1_captain` and `b6_c1_captain_camp`.
- **Invented and unnamed:** the old soldier of the 9th (the Deck reader `oldninth` from Book Four, here at a cairn), the quartermaster, the surgeon, the diggers' corporal, the runner, the well bandits, the townsfolk who stayed (an old man with a donkey, a woman with two children), the knives from the postern, the patrol. No new names beyond Mehet.
- **Not printed:** no Burn's Sleep year; never "Bonehunters" (the test fails any node that says it).

## Engine notes

- Nothing the engine lacked. Two wraps in this file, both guarded by `b6On()`: `atkCalc` (the veil) and nothing else; the trick reuses `B.line`.
- Three scenes added in `CH.scenes` with borrowed drawings until the artist's (`b6_c1_road` ← `b4_march`, `b6_c1_well` ← `b4_c5_seep`, `b6_c1_barrownight` ← `b4_c4_fog`). The brief gave the artist `b6_odhan_night` and `b6_ghatan_walls`; these three are optional for them.
- Glossary: `The Lato Odhan`, `Lothal`, `The barrows of Y'Ghatan` pushed onto `GLOSSX.bh`.

## Tests

`tools/b6ch1_test.mjs` (17 checks): a fresh start (level 12, Sathi dead, every node renders, no "Bonehunters"), the first halt and Marrow's reading, the fire (again, fever box, rest, a line each, roster, Not now), the captain, the quartermaster, the old soldier's warning, the night and the march, the well (forced win, fever caught, kit, the well cleared), the rearguard (both grounds, the tulwar), the prisoner's news, the camp, the fever broken at the surgeon's and at the fire, the camp's NPCs and a "yes, but", the edge fight, Mehet waiting then joining, and joining at once with his fire line, the trick taught and run in a fight (+armour, no flanking) and the veil against shots, the barrow road (Sathi's name at the lantern), `bury` (loyalty, the patrol, dawn, the end at 13) and `leave` from the same moment (rest, loyalty, no patrol, the end at 13), a synthetic save with Sathi, Tallow and Rasp walking and no Marrow (every node renders, a line each, Tallow reads), and no healer walking.

## Test results (Wed Nov 4, 2026, PST)

- Passed: `python3 build.py`; `node --check`; `node tools/lint.mjs` (0 errors; 4 style warnings of the kind Book Four already has); `tools/b6ch1_test.mjs` 17/17; `b6engine_test`; `play.mjs 3 --book=bh --from=1` 3/3 (two `bury`, one `leave`, no losses, level 13); `play.mjs 1` 1/1; `trope_scan --files` (nothing over budget).
- **Tool edits outside my files:** `tools/recruit_scan.mjs` had no `bh` entry (it would throw on any 10K file): added Book Six's squads and recruits by chapter. `tools/roster_test.mjs` had no `bh` maker (it threw once `ROSTER_FIRES.bh` existed): added one line. Both untested after the edit.
- **Not yet run** (stopped by the lead's wrap-up; the browser slots were full): `roster_test` (after the fix), `reading_test`, `trope_test`, `recruit_test`, `repeat_scan`.
