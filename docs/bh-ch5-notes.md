Wed Nov 4, 2026, 9:14 PM PST. Book Six, Chapter 5, "The Kokakal Shore" (`src/105_b6_ch5.js`, test `tools/b6ch5_test.mjs`; art `src/105b_b6_ch5_art.js` is the artist's), against the Book Six engine on `book6` (v9.0.0, not shipped). The Third's chapter.

# Chapter 5 notes: The Kokakal Shore

The Fourteenth comes down the Sotka road from Y'Ghatan with the plague behind it (W7: the army marches the next night because of the plague), waits on the Kokakal shore for Admiral Nok's transports (W13), loads (W16), hears that Keneb has pulled his soldiers off the ships for a day on Grub's warning about Sepik (W16), and sees the Y'Ghatan marines walk in out of the desert (W16). Temul's Wickans are ashamed (W16). The black ship given to a marine sergeant is the Silanda (W18), as sailors' talk only.

## Shape

- **Areas (3):**
  - `b6_c5_road`, the Sotka road's last miles on the bluffs above the shore (Book Two's `odhan` ground, day). The first halt (`F`), the captain, the old soldier of the 9th, a burial detail, the 9th's carts (`W`), the cairn for Coltaine (`c`), the bluff's edge (`L`), back up the road to the way-station (`<`), the lane to the village (`v`), down to the shore (`>`).
  - `b6_c5_village`, a plague village off the road (optional; `odhan`). Its well (`w`), the houses (`H`), back up the lane (`e`).
  - `b6_c5_shore`, the 9th's lines on the Kokakal shore (Book Five's `b5_c2_strand` ground: `~` sea, `B` boats, `F` fire, `#` dune grass). The fire (`F`), the boats (`B`), the surgeons' tents (`S`); the captain, the Wickan horse lines, the loading master, and (phase 3, `wait` only) the heavy of the 10th.
- **Nodes:** 68 `b6_c5_*` dialogue nodes (the reading's offer, card and way back included).
- **Phases** (`S.f.b6_c5_ph`): 1 the road and the village (set at `b6_c5_start`); 2 the shore (set going down, at `b6_c5_arrive` and the fire); 3 after the key (set at `b6_c5_morning`, or going aboard on `sail`).
- **Scenes:** `b6_kokakal` (100's, the artist's) for the halt and the whole shore. Three scenes of this file's own borrow Book Two's Odhan drawings until redrawn (`SCENEX[k] ??=`): `b6_c5_road` (from `b2_odhan_day`), `b6_c5_dusk` (the way-station, from `b2_odhan_dusk`), `b6_c5_village` (from `b2_well`). No new ground is drawn; the artist's brief names only `b6_kokakal`.
- **The first halt** is `b6_c5_start`, the road's last night on the bluff, with the transports' lanterns below, so the reading is "on the shore by the transports" as the brief places it. `b6DeckChoice(5)` is there and at the fire.
- **The Deck:** `B6DECK[5]`: scene `b6_kokakal`, where "a flat of packed sand at the bluff's edge, with the transports' lanterns below", back `b6_c5_deck_back` ("Back to the halt."), which returns to the halt in phase 1 and the fire after (Claude's call: one back id, two places to draw). Lines for Marrow, Tallow and the old soldier. `READTABLE['bh:5']` and `B6POOL[5]` (the Queen ×3) are the engine's.
- **The fire:** `b6_c5_fire`, in the dunes. `ROSTER_FIRES.bh[5] = ['b6_c5_fire']`. `again:` by phase; the Deck; a rest once (`rest()`, `b6_c5_rest`); the squad's talk; the healer's cure (fevered, `b6CanCure()` and a healer walking); Mehet at the water (once, if he walks); the way on by phase (the boats, the talk along the beach, morning, the last boat); "Find the captain first."; "Not now." last. `feverHTML()` in its `html`.
- **The way on** down to the shore (`b6_c5_road_on`) is shut until the deserters are fetched (`b6_c5_desDone`). The village is optional.

## The key `b6_c5_key` (the loading)

Chosen at `b6_c5_key`, with the captain, after the boats and the word along the beach (`b6_c5_word`): the 9th goes aboard at first light by companies; somebody has to stay with the company's last boat and stores, a day maybe. "Not yet." steps away. Reached from the word, the fire, or the captain on the beach.

- **`wait`**: the Third stays ashore a day with the last boat, "as Keneb's do". Tallow +1, Mehet +1, Marrow +1, Tebbet −1. The walk-in is seen from the beach; the heavy of the 10th comes to the Third's boat; evening, the last boat goes out to the transport with the Third in it.
- **`sail`**: aboard with the company at first light, as ordered: the third transport from the point, the one with the patched foresail. Tebbet +1, Darrut +1, Tallow −1. The walk-in is seen from the rail; the heavy comes up the side with the company's last gear. "Not now" in phase 3 goes to `b6_c5_aboard` (a hub on the transport at anchor), never back to the beach.
- **What the text never says:** when the fleet itself sails, or whether the first day's sailing happened. Only where the Third was.
- **Read later:** Ch7 reads `b6_c5_key` (`sail` as one more line about the ambush, per the brief).

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b6_c5_key` | `wait` / `sail` | the key |
| `b6_bone` | 1 | the Third took the finger bone from the heavy of the 10th (shared flag, as the brief names it). Unset if declined (`b6_c5_boneNo = 1`) or never offered |
| `b6_c5_survivors` | 1 | the walk-in seen (always, before the end) |
| `b6_c5_missing` | a squadmate id | on a Ch3 `in`, the first of the squad's Ch3 dead (`S.dead[id].ch === 3`), looked for among the walk-ins and not there. Said once, at `b6_c5_survivors` |
| `b6_c5_desMercy` | `back` / `go` | the last two deserters marched back to the column (what the army does with them is the army's, never shown) / told to walk away, and the captain told "they ran" |
| `b6_c5_desDone` | 1 | the way-station fight won (always, before the shore) |
| `b6_c5_boatsDone` | 1 | the boats fight won (always, before the key) |
| `b6_c5_villageDone` | 1 | the plague village's looters fought (optional) |
| `b6_c5_horseOk` | 1 | the trick learned (`b6_c5_horseTried` once tried) |
| `b6_c5_shrine`, `b6_c5_left` | 1 | the cairn for Coltaine seen / something left at it |
| `b6_c5_word` | 1 | heard that Keneb pulled his soldiers off the ships on a boy's warning |
| `b6_c5_ship` | 1 | heard about the black ship given to a marine sergeant (never named) |
| `b6_c5_mehet`, `b6_c5_mehetSaid` | 1; `kind` / `true` | Mehet at the water; what the sergeant told him about the other side |
| `b6_c5_rope`, `b6_c5_ropeGot` | 1 | the loading master's rope earned and given |

**Earlier flags read, each with a default:**
- `b6_c3_key`: `in` reads the squad into the burning streets (the intro, the old soldier, the heavy "You went in", the look for the dead); anything else reads as `line` ("You held the gate").
- `S.dead[id].ch === 3`: the squad's dead from Ch3's mortal fight, by the chapter the engine writes on them (`kill`). The intro names them; the walk-in looks for the first of them on `in`.
- `b6_c1_key`: `bury` gives the heavy one line ("you put the old ones back"). Unset or `leave`: nothing.
- `b6_mehetDone` / `b6In('mehet')`: Mehet's lines throughout (the halt, the captain, the way-station drain, the looters, the boats, the fire, his walk to the water, the key, the bone, the end).
- `b6_soliel`: only through `b6CanCure()` (the fire's cure).

## Fever

- **Caught:**
  - the village well's "yes, but" (Wits 15): `b6Catch(roller, 'the village well')`. The chapter's one fever "yes, but".
  - the looters' fight `b6_c5_village` carries `feverRisk:'the plague village'` (the engine gives it to one walking soldier, win or lose).
  - Both optional: a player who skips the village catches nothing here.
- **Treated:**
  - `b6_c5_surgeons`, the Fourteenth's surgeons' tents in the dunes: water, willow bark, a day on a cot, and a Denul hand who opens the sick warren for a breath and comes out grey. `b6Cure` on every fevered soldier. No check, no cost but the day.
  - The fire: a walking healer (`HEALER()`, Marrow or Mirrel for the Third) when `b6CanCure()`: `b6Cure` on every fevered soldier, and the healer is rattled (−1 on the next check), because the warren is sick (bh-canon §8, W16).
- `feverHTML()` shows at the halt, the village after the fight, the surgeons, and the fire.

## Fights, foes and numbers (for the balance pass; change no rule)

The Third is about level 15 here (`play.mjs --book=bh --from=5`). Pay is ×0.6 (`XPK`).

| Fight | Kind | Foes | xp |
|---|---|---|---|
| `b6_c5_village` | optional, `feverRisk` | 3 × `b6_bandit`, `b6_rebelbow`, `b6_c5_looterknife` | 130 |
| `b6_c5_deserters` | main, `stage2` | 3 × `b6_c5_deserter`, 2 × `b6_c5_desxbow`; wave round 3: `b6_c5_deserter`. Stage2 "The way-station's yard": `b6_c5_desleader`, 2 × `b6_c5_deserter`, `b6_c5_desxbow` | 180 + 90 |
| `b6_c5_boats` | main, `stage2`, dark, ally `b6_regular` | 2 × `b6_c5_looter`, 2 × `b6_c5_looterknife`, `b6_rebelbow`; wave round 2: `b6_c5_looter`, `b6_c5_looterknife`. Stage2 "The waterline": `b6_c5_lootboss`, 2 × `b6_c5_looter`, `b6_rebelbow` | 180 + 90 |

Total 670 nominal, about 400 paid, plus clean checks: about one level (15 → 16), as the brief's "16–17 after Ch5".

| Foe | Kind (sprite) | hp | ac | atk | dmg | rng | mv | init | skills |
|---|---|---|---|---|---|---|---|---|---|
| `b6_c5_deserter` (Deserter of the Fourteenth) | `deserter` | 30 | 15 | 10 | 1d8+3 | 1 | 4 | 2 | |
| `b6_c5_desxbow` (Deserter with a crossbow) | `xbow` | 24 | 13 | 10 | 1d10+2 | 6 | 4 | 2 | pin |
| `b6_c5_desleader` (The burned sergeant, boss) | `deserter` | 58 | 16 | 11 | 1d10+4 | 1 | 4 | 2 | rally, shove |
| `b6_c5_looter` (Looter with a club) | `thug` | 26 | 13 | 9 | 1d8+2 | 1 | 4 | 1 | |
| `b6_c5_looterknife` (Looter with a knife) | `cutpurse` | 22 | 14 | 10 | 1d6+3 | 1 | 5 | 3 | bleed |
| `b6_c5_lootboss` (The man with the boathook, boss) | `bruiser` | 52 | 15 | 11 | 1d10+3 | 1 | 4 | 1 | reach, rally, shove |

Warrens are 0.85 in every fight (the plague in the warrens, bh-canon §8). The approaches:
- **Way-station:** shields; Tangle's or Rasp's two sharpers (`pre`); a Guile 16 call ("The captain wants the salves. And you."): a clean call drops both crossbows and gives surprise, a "yes, but" drops one, a failure means the sergeant refuses and the squad goes in; a Wits 16 approach by the north drain (Mehet +3) for surprise.
- **Village:** a Guile 15 way round through the houses for surprise.
- **Boats:** a burner (`pre`); a Wits 16 ambush in the dark for surprise.

## The trick: Wickan Horse-Talk (`b6_c5_horsetalk`)

Copies the Claw Hand-Cant (`cant`): once a fight, free of the action, mark an enemy within 6 that the bearer can see. The next 1 + `lvT()` hits on it this round are criticals (31_battle's `cantRound`/`cantLeft`). Not sorcery.
- Taught by a young Wickan rider at the horse lines, behind a ✦ Wits 17 check.
- Edges: Keth +3, Sathi +3 (both Wickan), Orvas +2, Ramin +1, the sergeant +1 (rode beside the Wickans on the Chain).

## Kit

- **`b6_c5_fingerbone`**: a finger bone on a thong. Trinket, role `any`, **+4 health** (the real number; it also offsets the fever's −4). Given by the heavy of the 10th with `S.f.b6_bone = 1`.
- **`b6_c5_nokrope`**: a hank of Nok's tarred rope. Trinket, role `any`, +1 Might. From the loading master after a Might 15 turn on a fouled lighter's line.

## Every "yes, but" (none in silver)

- The cairn, Guile 15: a headache, rattled.
- The well, Wits 15: **the fever** (the chapter's one fever cost).
- The houses, Guile 15: rattled ("will not forget one of the rooms").
- The way-station call, Guile 16: only one crossbow put down.
- The north drain, Wits 16: no surprise.
- The boats, Wits 16: the lantern rolls, no surprise.
- The rope, Might 15: rope-burn, 3 + `lvT()` health down at the next fight.
- The trick, Wits 17: none (the engine gives trick checks no "yes, but").

## Recurring inventions used, and new unnamed ones

- **Used:** the captain (the 9th's company captain, unnamed, sprite `b4_c1_hollet`); the old soldier of the 9th; Blistig only as "the Fist" riding the waterline at a distance; the finger bone, offered by soldiers who walked out of the fire.
- **New, all unnamed:**
  - a corporal of the 10th's burial detail;
  - an old man of the coast who keeps the cairn;
  - seven deserters of the 10th and the 8th, with their burned sergeant and a boy of the 10th;
  - looters "from the road" (Mehet: men who waited on the road for the city's people when Leoman sent them out);
  - the surgeon in the leather apron and the Denul hand;
  - a young Wickan rider of the Crow clan who braids tails;
  - Nok's loading master;
  - a sergeant of the 8th who carries the word along the beach;
  - a heavy of the 10th who came out through the fire.
- **No new names.**

## The other squad

One line of camp talk at `b6_c5_rumour`: "Onearm's Host is camped before G'danisban in the rain, with the plague in its tents the same as ours." `b6OtherName()` is not used.

## Canon calls (sources)

- **The march:** the army marches for Sotka the next night because of the plague (W7). The survivors use the Sotka Road (W13), so the army's road to the coast is called the Sotka road.
- **The 791:** "Seven hundred and ninety-one… out of three thousand" (pp. 261–262), as soldiers' talk.
- **Sinn's way** is "the girl's way" in soldiers' mouths, never named.
- **Coltaine's cairn:** "Former rebels now honour Coltaine's memory" (W13) [1]. The cairn, the feathers and the old man are invented in that margin. Kamist Reloe pursuing the Chain is canon (DG).
- **The loading:** Nok's fleet loads, two days from sailing (W16). Grub's warning reaches the Third only as rumour, through a sergeant of the 8th; Grub is "a boy in his household. Little, strange" (rule 18: nothing more). Keneb is never spoken with.
- **Temul's Wickans** say most will go home, ashamed at being denied a death (W16), reported by a young rider. Temul is never met.
- **The walk-in:** the Y'Ghatan marines walk in, with Quick Ben, Kalam and Fiddler (W16). Kept faceless here ("Some of them are carrying others"): no names, no fiddle, no child.
- **The bones** came "off the dead under the city, out of the old pits" (Koryk, W10, as the heavy tells it). That the 791 took them up from the walk-ins is the brief's invention. The army's name from the bones is never printed (§7 keep-open: the soldiers' own).
- **The Silanda** is only "the black ship… given to a marine sergeant" (W18), in the loading master's mouth.
- **The Fist** on the waterline: Blistig, seen far off, never named in this scene. The captain's line "the Fist says two days is a sailor's two days" is invented. W13's fear that the fleet would land elsewhere belongs before the fleet arrived, so it is not used.
- **D'rek's priests** found dead (W6) reach Hessa as sailors' talk at the fire.
- **Marrow** came over from Nap twelve years ago (her bio: Nap, twelve years' service). **Tallow** already wears a finger bone from the old Aren graveyard (his kit, Book Four; series rule 29), so the new one hangs beside it.

## Canon points I was unsure of

- **When the fleet sailed:** whether the 9th really boarded on the first day while the 8th waited. The text keeps to where the Third was, never when the fleet left.
- **The coast's direction and the shore's name:** the Kokakal shore's named place is not found (Q21). The text says only "the Kokakal shore".
- **Hissar** as a city where water was sold: from Book Four's Haddat ("her mother's people sold water"). Haddat's line no longer says whether her mother saw the sea.
- **Whether the walk-ins already wore bones when they came in:** W10 says Koryk took them. The heavy says "they brought them in".

## Engine and tests

- **No engine edits.** `ROSTER_FIRES.bh` is created from this file (`ROSTER_FIRES.bh = ROSTER_FIRES.bh || {}`), as the brief says.
- **Two shared tools stop passing once any Book Six chapter registers a fire or a chapter:**
  - `tools/roster_test.mjs` and `tools/b6engine_test.mjs` loop over `ROSTER_FIRES` with a state-maker per book that has no `bh` entry.
  - `b6engine_test` also checks "Book Six stays off the shelf until a chapter exists".
  - These are the lead's to update when the chapters merge. Details are in the report.
- **Lint and the items' art:** the lint needs `ART['item/b6_c5_*']`, which the artist's `105b` draws. The writer's tests ran with an untracked stand-in file that is not committed.

## Test status (writer's session, Wed Nov 4, 2026)

- **Passed:** `python3 build.py`; `node --check` on `src/105_b6_ch5.js` and `tools/b6ch5_test.mjs`; `node tools/lint.mjs` (0 errors, 0 page errors; the only `b6_c5` entry is the orphan `b6_c5_card`, which the engine calls by a built name); `tools/trope_scan.mjs` (this file: theway 1, nobody 1, nothing over budget).
- **Not yet run** (the lead runs them after the merge): `tools/b6ch5_test.mjs`, `play.mjs 3 --book=bh --from=5`, `play.mjs 1`, `repeat_scan`, `trope_test`, `recruit_test`, `b6engine_test`, `roster_test`, `reading_test`.
