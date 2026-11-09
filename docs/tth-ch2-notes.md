Mon Nov 9, 2026, 1:58 AM PST. Book Eight, Chapter 2, "The Black Coral Road" (`src/142_b8_ch2.js`, art `src/142b_b8_ch2_art.js`, test `tools/b8ch2_test.mjs`), against the Book Eight engine on `book8` (v11.0.0, not shipped).

# Chapter 2 notes: The Black Coral Road

East over the old Domin at winter's end (tth-canon correction 4, fix (A)) with one merchant's caravan, never the Council's: the merchant stays in Darujhistan, unnamed; his man **Calder** runs the road. "Weeks", never a count. The scarecrow fields and the towns coming back are canon (R4 S2, R6 S3). The kelyk thread starts here: the merchant buys kelyk in the old Domin and carries it east in the last wagon, to the pilgrims' camp at the barrow outside Black Coral. Never west, never to the city.

## Shape

- **Areas (4):** `b8_c2_camp` (the caravan's first halt, a ring of wagons at night; ground `b8_c2_camp`, dark), `b8_c2_road` (the Domin road by day; `b8_c2_road`), `b8_c2_town` (a Pannion town coming back, dusk; `b8_c2_town`), `b8_c2_fields` (the halt beside the scarecrow fields, dusk into night; `b8_c2_fields`, dark). Map UI: rings on trigger tiles, edge arrows `<` `>` only.
- **Nodes:** 62 `b8_c2_*` dialogue nodes (the reading's two included).
- **Phases** (`S.f.b8_c2_ph`): 1 the first halt (set at `b8_c2_start`); 2 the road (the fire's "Sleep", once Vasso is settled); 3 the town (`b8_c2_to_town`); 4 the fields halt (`b8_c2_to_fields`, once the town is done); 5 the night (the fire's "Sit up with the watch", once the drover is out); 6 after the key.
- **The order a player meets things:** the ring, the reading, Vasso (on `quiet`), Calder and the merchant's mail, the carters, the last wagon and its smell; morning, the road, the riders on the ridge, the carters' chains (the trick); the town: the woman at the well, the cups, Calder's man at the temple's back door, the priest's tithe and the fight; the fields: they sing, the drover walks in after the song, the fight in the rows, the goad; the night: lanterns in the rows, the tenders at the last wagon, the jug, Calder; the key at the fire; Black Coral's dark on the horizon.
- **The first halt** is `b8_c2_start` (the caravan's fire), with `b8ReadChoice(2)`; the reading is also at the fire in phase 1. `B8READ[2]`: scene `b8_caravan_night`, "a wagon's tailboard by the caravan fire", back `b8_c2_fire`, a `say` line for Tuft, Sohra and Benna.
- **The fire** `b8_c2_fire` (the caravan's fire; id kept for the games pass) is the `F` tile in both the camp and the fields: `contractHTML()`, the talk (a line for every soldier the Fourth can field, two each by half, and Vasso; old Benna at her laundry tubs when she is the reader), a rest once a phase from phase 4 (`b8_c2_rest<ph>`; it clears wounds and the kelyk-sickness), the way on (phase 1 "Sleep", only once Vasso is settled; 4 the watch, once the drover is out; 5 the key, once the kelyk is found and Calder asked; 6 "On east"), and "Not now" last. `ROSTER_FIRES.tth[2] = ['b8_c2_fire']`.

## The key `b8_c2_key` (the wagons)

Chosen at the fire (`b8_c2_key`) once `b8_c2_found` and `b8_c2_calder` are set. `contractHTML()` is shown there and on both outcomes. "Not yet" steps back.

- **`fields`**: the last wagon's load is burned on the verge (Kettle's burner if she walks; a brand otherwise, no munition spent), and a field's width of the rows beside the road with it: the scarecrows in it stop singing; the rest of the fields go on. Calder keeps the fee and takes what the Fourth has, up to 20 silver (`S.f.b8_c2_fee` the amount). `S.f.b8_c2_kelyk = 'burned'`. Ohl +1, Vasso +1, Brisk −1.
- **`pass`**: the tarp lashed down again; Calder pays half now, 20 silver ("half at Black Coral, as agreed": nothing later reads the second half). `S.f.b8_c2_kelyk = 'passed'`. Brisk +1, Ohl −1.
- **Read later (the brief):** Ch 4 (one more wave of kelyk-mad pilgrims on `passed`), Ch 5 (the peddler).

## The Contract

**No moves in this chapter**, as the brief says (weeks away begin). None of the fights is `guild:true`, no check carries `contract:true`, and no "yes, but" costs a point. The test checks it stays where it came in, on both keys.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b8_c2_key` | `fields` / `pass` | the key (default `pass`, `B8KEY0`) |
| `b8_c2_kelyk` | `burned` / `passed` | the shared flag (the brief): the merchant's kelyk burned, or carried on east |
| `b8_c2_fee` | 20, or less | silver lost (`fields`) or paid (`pass`) |
| `b8_vassoDone` | 1 / 2 / 0 | the engine's: set here when Ch 1 left it unset (`quiet`): Vasso joins, rides with the wagons, or goes back west |
| `b8_c2_vassoCame` | 1 | Vasso came to the first halt in this chapter (not on a `hunt` save) |
| `b8_c2_calder` | `told` / `jug` | Calder said it (east, the camp at the barrow, never the city), or blustered and the jugs said it |
| `b8_c2_found` | 1 | the kelyk found in the last wagon; the jug taken (`b8_kelykjug`) |
| `b8_c2_watched` | `unseen` / `seen` | the loading watched from between the wagons (Calder counted the jugs in himself), or walked up to |
| `b8_c2_peek` / `b8_c2_wagonSeen` | 1 | the first night: jugs in straw glimpsed under the tarp / the wagon and its smell noticed |
| `b8_c2_backdoor` | 1 | Calder's man swapped a crate at the town temple's back door (the crate is in the wagon) |
| `b8_c2_townDone` | 1 | the priest's square and steps won (always, to go on) |
| `b8_c2_fieldsDone`, `b8_c2_drover` | 1, `saved` | the drover brought out of the rows (always, to go on) |
| `b8_c2_goad` / `b8_c2_calderMet` | 1 | the drover gave her goad / Calder met (the mail given then) |
| `b8_c2_raidSettled` with `b8_c2_raidDone` / `b8_c2_raidFaced` / `b8_c2_raidPaid` | 1 | the riders fought, faced down, or paid off by Calder out of the merchant's purse; or none (left on the ridge) |
| `b8_c2_brakeOk` / `b8_c2_brakeTried` / `b8_c2_brakeSeen` | 1 | the trick learned / rolled / the chains seen |
| `b8_c2_drawn` / `b8_c2_reader` / `b8_c2_noCard` | | the reading (140c) |

**Defaults read:** `b8_vassoDone` (unset means Vasso has not been settled: on `quiet`, or a save with no Ch 1 flags, he comes to the first halt). Nothing else from Ch 1 is read. A Ch 3 save without Ch 2 should treat `b8_c2_kelyk` as `'passed'` (the `B8KEY0[2]` default).

## Vasso (the recruit, on `quiet`)

- **Where:** at the first halt, by the last tent, hands out and open (`b8_c2_start` → `b8_c2_vasso`). The NPC stays on the camp map until he is settled; the fire's "Sleep" waits on it.
- **His story on this road:** they gave him the Fourth's paper after the alley, second on it; the Fourth burned theirs and barred the door, so the Guild said wait: "They go east at winter's end, with wagons. Do it on the road." He walked out after the caravan in roof-boots. He has never been outside the walls.
- **His words:** "Malazans. The paper said Malazans. The Guild doesn't ask which." / "I asked." On who paid: "The knife never knows who paid... The go-between knows. Only him." (rule 70). "There are other papers this winter. Old soldiers. I don't know whose."
- "Then sit down at the fire" → `b8Join('vasso')` (Ohl +1; with six walking he waits). "Ride with the wagons a while" → `b8_vassoDone = 2` (he sits on the last-but-one wagon; "Come to the fire" from the NPC joins him). "Go back" → `0`, Kettle −1.
- **His lines:** the fire's talk (both halves), the wagon ("He answered a question nobody asked"), the riders, the town, the drover, the tarp, the key ("The Guild would take the pay. I'm not in the Guild."), the burn, the end.

## The trick: The Carter's Brake (`b8_c2_brake`)

At the lead wagon on the road (`L`), while the carters chain the wagons wheel to wheel against the riders: ✦ wits 17, "Learn the brake: the order of the wheels, the hooks, the gap and who stands in it." The check names what the Fourth knows: the same gaps on this same country years ago, beside the Host's quartermaster's wagons (Book Three, the Domin). Edges: Brisk +2, Dannet +2 (Capustan's streets behind carts), whoever carries Book One's `line` +2, the sergeant +1, Kettle +1, Sohra +1; Vasso −1, Vell −1. The "yes, but": a hook skips and the chain comes down on a forearm (a bruise). **Mechanic:** the Line (`line`): `B.line`, so the bearer and everyone beside them take +3 (+`lvT()`) armour and cannot be flanked until the bearer's next turn. `free:true`; its words end "It does not use the action (one free trick a turn)." Not sorcery. It comes back as a +2 edge on facing the riders down.

## Items

- `b8_c2_caravanmail` (armour, `role:'mail'`, `ac:3, hp:2`: +1 soak by v10.2): the merchant's, from Calder's chest on meeting him, always. The chapter's real number.
- `b8_c2_drovergoad` (weapon, `role:'reach'`, `reach:true, atk:1, dmg:[1,8,2]`): the drover's, after the rows, always.
- `b8_kelykjug` (the engine's, placed here): one jug out of the last wagon (`b8_c2_tarp`), "because a jug is a better witness than a guard."
- Both new items drawn in 142b on Book Eight's ground. The chapter file registers borrowed placeholders with `??=` that 142b's plain assignments replace.

## Fights (numbers for the balance step; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b8_c2_raid` | the Domin road | `b8_raider` ×3 | 150 (90) | optional; `open`; can be faced down (might 16) or paid off by Calder |
| `b8_c2_town` | the square | `b8_cultist` ×3 | 300 | main; surprise round the lanes (guile 15) |
| · stage 2 *The temple steps* | | `b8_kelykpriest`, `b8_cultist` | +150 (450, 270 paid) | the priest's blow is sorcery (engine) |
| `b8_c2_fields` | the green rows | `b8_fieldtender` ×3, `b8_cultist` | 200 | main; `pollen:true` (−1 to hit for three rounds, both grounds); `dark`; surprise with ears stopped (wits 15) |
| · stage 2 *Deeper in the rows* | | `b8_fieldtender` ×2, `b8_cultist` | +100 (300, 180 paid) | |

Paid xp: about 540 with the raid, 450 without. A fresh 16 (4540) ends at 17 (the test saw 5120 with the raid). The scarecrows are never foes: they are tile art and words only.

## The callbacks and threads this chapter writes

- **Kelyk** (the brief's thread): the smell under the last wagon's tarp at the first halt; the town's cups and the woman at the well ("You stop being afraid"); the temple's jars and the crate at its back door; the tenders loading jugs at night; Calder: bought in the Domin, sold to the camp round the barrow outside Black Coral, never west ("The merchant isn't a fool"); the jug in the kit. Never made to look good: sweet, then not; headline only.
- **Book Three's Domin:** the country the Fourth crossed with the Host when the Seer's own people burned it; the Host's quartermaster's wagons (the trick); Dannet on Capustan; Brisk "I marched through this country once". Coral ahead under its other name; Tuft wants to see the barrow again.
- **Old Benna** (when she reads): she goes with the caravan because it pays, washing the carters' shirts for a copper apiece; a line at the fire.

## Canon used, and calls

- **The scarecrow fields** (R4 S2, R6 S3): green rows; rag-wrapped shapes on poles; "What feeds the green is wrapped up on those poles. Nobody in the caravan goes near enough to see more than that"; the scarecrows sing and the pollen pulls at the mind; they never fight. The tenders are "the living who tend the fields" (engine's `b8_fieldtender`).
- **The towns coming back** (R4 S2's "rising" Pannion cities): whitewash over the old soot, smiling people, a priest of the Dying God, clean water and sweet cups. The god is "dying", "sleeping", "a piece of one" (Tuft); never his body, never Bastion.
- **Hard limits held:** no Nimander's party, no wagon with a comatose boy (the one who walks into the rows is a grown drover, and comes out awake), no Kallor, Heath, Gothos's tower or Bastion; the caravan is one merchant's, never the Council's ("The Council hasn't made its mind up about Black Coral", after R1 S15–18); "weeks", never a count. The test greps every node for these names, a printed year, a count of weeks or months, and "!" in narration.
- **Invented and unnamed** (no new names; Calder used): the merchant, Calder's man (sleeps under the last wagon with a club), the carters, the drover with the red scarf, the carter boy the priest wants, the woman at the well, the priest, the riders ("deserters from somebody's war, who kept the horse"), the tenders.
- **Claude's calls:**
  1. The merchant buys the kelyk in the old Domin and sells it at the camp round the barrow (Ch 3–4's pilgrims), outside Black Coral, never in it ("the Andii would have the wagon off the road"). Ch 3–4 may show the wagon arriving at the camp's edge or not; nothing here requires it.
  2. `fields` costs what the Fourth has, up to 20 silver ("the fee lost"), so a poor squad is never driven below 0; `pass` pays 20 at once ("half now, half at Black Coral": no later chapter needs to pay the second half).
  3. The mail is the merchant's ("Bring it back at Black Coral. I write everything down."): nothing takes it back; a later writer may have Calder ask, never take.
  4. The raid can be paid off by Calder out of the merchant's purse (money is the scene); the squad's own silver never pays it.
  5. The fields fight is a main fight with a second ground (the brief marks the town as the main fight; both have stages, so each main fight has a `stage2`).
  6. The fields' battle ground is its own style (`b8_c2_rowsb`: `,` the rows, walkable; `#` a wattle hurdle), so the poles never stand on a battle map.
  7. Vasso on `quiet` was sent to do the paper on the road; on a `hunt` save he is already settled and this chapter leaves him alone (`vasso2` only shows when `b8_c2_vassoCame`).
  8. The reading is offered at the first halt only (its set text is that night).

## Engine notes

- Nothing the engine lacked. No wraps. The trick reuses the Line's `B.line`.
- **Lint:** three warnings for the new battle styles (`b8_c2_road`, `b8_c2_town`, `b8_c2_rowsb`), the same warning Books Four and Six carry for theirs (lint knows only `b3*`/`b5*` styles by prefix). One line in `tools/lint.mjs` (`/^b[358]/`) would quiet them; not made.
- Two scenes added in `CH.scenes` (`b8_c2_town`, `b8_c2_rows`), drawn in 142b; 142b also draws 140's `b8_road_east`, `b8_fields`, `b8_caravan_night`, five grounds (`TILEX.b8_c2_camp`, `_road`, `_town`, `_fields`, `_rowsb`, over Book Three's Domin and camp tiles), and the figures `b8_c2_calder`, `b8_c2_carter`, `b8_c2_drover`.
- **For later artists:** `b82Wagon(x, cx, by, s, lit, tarp)` draws a caravan wagon (the last wagon with `tarp`); `b82FarPoles` the far poles; `b82Rows` / `b82Pole` the green rows and a pole as tiles.
- Glossary: "Calder", "The scarecrow fields", "The carters' brake" pushed onto `GLOSSX.tth`.
- **No tool or engine edit outside my files.**

## Tests

`tools/b8ch2_test.mjs` (19 checks): a fresh start after Ch 1 on `quiet` (every node renders with no never-name, year, count of weeks or "!" in narration; the items with art, the figures, five grounds and five backdrops drawn without error), an audit under every phase and key (every check has its own "yes, but"; every onward step has "Not now" or "Not yet"), the first halt and the reading (Tuft; `cardNodeName()` is `b8_c2_card`), the fire before Vasso is settled, Vasso's three answers, Calder and the mail, the last wagon (its "yes, but", the peek), the road and the riders (faced down with its "yes, but"; the raid, not the Guild), the trick (✦ wits 17, free, sets `B.line`), the town (back door, cups, tithe, its "yes, but", both grounds), the fields (pollen on both grounds, the goad), the night (the rest clears the kelyk-sickness; the loading with its "yes, but"; the jug; Calder's answer with its "yes, but"), the key (`fields` −20 and `burned`; `pass` +20 and `passed`, from the same moment; the Contract unmoved), and a `--from=2` style save (Vasso walking off `hunt`, Tuft dead, Ohl at the door, Vell and Ellis: Benna reads, a line each at the fire in both halves).

Results (Mon Nov 9, 2026 2:46 AM PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (38 warnings: Ch 1's 35 and this chapter's three style warnings; `b8_c2_card` is an orphan by design); `b8ch2_test` 19/19; `b8ch1_test`, `b8engine_test`, `trope_test` (B8 18,649 words, inside every budget), `recruit_test`, `onward_test`, `yesbut_test` pass. Not run here: `run_all` (the lead's) and `play.mjs`. Art looked at in a 390×844 browser: the five backdrops, the four maps, the three battle grounds, both items; the mail's mended patches redrawn after looking.

**Balance** (`node tools/balance.mjs --book=tth --only=…`, 12 smart runs each, level 16):

| Fight | Soldier | Bridgeburner | median rounds (S / BB) | HP lost (S / BB) |
|---|---|---|---|---|
| `b8_c2_raid` | 100% | 100% | 3 / 4 | 1% / 2% |
| `b8_c2_town` | 100% | 100% | 6 / 7 | 3% / 4% (the priest idle 34% of turns on BB) |
| `b8_c2_fields` | 100% | 100% | 6 / 7 | 5% / 8% |

All three are far easier than the v10.2 targets (Soldier ~90%, Bridgeburner 75–80%), as Ch 1's are: the engine's Book Eight foes against a level-16 Fourth with `B8GAP` empty. Left as written for the balance step that goes to David. Levers: more cultists or a second wave in the square, the priest placed nearer (he idles at range 4 behind the steps), a `b8_raider` wave in the rows, `B8GAP` rows.
