Mon Nov 9, 2026, 2:39 AM PST. Book Eight, Chapter 4, "The Pilgrims' Camp" (`src/144_b8_ch4.js`, art `src/144b_b8_ch4_art.js`, test `tools/b8ch4_test.mjs`), against the Book Eight engine on `book8` (v11.0.0, not shipped). Written on branch `book8-ch4`, beside Ch 2 and Ch 3 being written at the same time: their flags are read with defaults.

# Chapter 4 notes: The Pilgrims' Camp

The camp round the barrow outside Black Coral, at its **first** turning (tth-canon correction 1, fix (A); R6 S5–S7): the sweet stuff spreading down the rows, the children kept apart at the barrow end, the guards who walked the rows no longer coming, the pilgrims frightened. The Fourth keeps the camp's far edge for Mossa, a priestess of the Redeemer, while Calder's wagons load in the city, holds it (or burns its kelyk) on one bad night, and is gone west before the real turning.

## Shape

- **Areas (3):** `b8_c4_edge` (the far edge: Mossa's tent `T`, the water line `w`, the Fourth's fire `F`; `^` the yard, `<` the rows, `v` the city road), `b8_c4_rows` (the inner rows: Hurrin, the end tent, the rope `r` across the barrow end, `^` toward the barrow, `>` back), `b8_c4_yard` (the store-yard behind the edge: lean-tos of jugs `x`, `v` back). All on the chapter's own ground `TILEX.b8_c4_camp` (Book Three's camp at night plus the camp's pieces; edge arrows drawn). Rings on triggers, arrows on edges only.
- **Nodes:** 66 `b8_c4_*` (the reading's two included).
- **Phases** (`S.f.b8_c4_ph`): 1 the edge at evening by the city's bells (set at `b8_c4_start`); 2 the next "day" under the same night (set by the fire's "Sleep", once the water line is done); 3 the bad night (set at the key); 4 the morning by the bells (set at `b8_c4_morning`).
- **Order:** the edge and the reading; Mossa (the camp, the guards and the fire-hook, the Redeemer, a prayer, the jug); the water line (talk them off or fight) and the carriers' song (the trick, the ash-rag); sleep; the rows (Hurrin and the grey scale, the rope, the barrow far off, the end tent); the yard (the jugs, the keepers); the fire, the dark coming on, the key; then `hold` (set the edge, the far edge fight) or `burn` (the yard fight, the burning, news of the edge); the morning (Mossa, Hurrin, the carrier); the wagons west.
- **First halt** `b8_c4_start`, with `b8ReadChoice(4)`; the reading also at the fire in phase 1. `B8READ[4]`: scene `b8_camp_night`, where "a pilgrim's mat at the camp's edge", back `b8_c4_fire`, a line for Tuft, Sohra and Benna.
- **The fire** `b8_c4_fire` (id kept for the games pass; `ROSTER_FIRES.tth[4]`): `contractHTML()`, a rest once a phase (`b8_c4_rest<ph>`; phase 1 after the water line), the talk (two lines each, early and late, for every soldier the Fourth can field and for Vasso and Edrem), the way on by phase, "Not now" last.

## The key `b8_c4_key` (the bad night)

Offered at `b8_c4_dusk` (from the fire, once Hurrin is met and the yard seen), with `contractHTML()`; "Not yet" steps back.

- **`hold`**: Brisk +1, Edrem +1, Ohl −1. The hold check `b8_c4_hold` (wits 16; Ch 3's `stand` gives every roller +2, "the camp's guards trust the squad"); success sets `b8_c4_edgeSet` and starts `b8_c4_edge` with surprise (none on a "yes, but"); failure starts it plain; "No time to set it" skips the check. Won: `b8_c4_held = 1`, Edrem +1.
- **`burn`**: Ohl +1, Kettle +1, Brisk −1. The yard fight `b8_c4_stores`, then the burning (`b8_c4_stores_after`, wits 15: success burns it tidily, failure lets it reach an empty tent, `b8_c4_yardSpread`); either way `b8_c4_burned = 1`. Never the camp, never anybody's hut. The edge that night (`b8_c4_edgeCost`): on Ch 3 `stand`, the guards from the barrow road hold it (`held`); otherwise Mossa and the carriers hold it and two tents go down (`tents`).
- **Read later (the brief):** Ch 5 (on `burn` the peddler's is the last kelyk on the road), Ch 7.

## The Contract

Only the engine's −1 at the chapter's start ("weeks out of the city", `b8_away4`). No fight here is `guild:true`; no check carries `contract:true`; no scene of this chapter moves it. A fresh Ch 4 from 3 ends at 2.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b8_c4_key` | `hold` / `burn` | the key (default `hold`, `B8KEY0`) |
| `b8_c4_held` | 1 | `hold`: the far edge held through the night |
| `b8_c4_edgeSet` | 1 | `hold`: the carts went across before dark |
| `b8_c4_burned` | 1 | `burn`: every jug in the yard burned |
| `b8_c4_storesDone` | 1 | `burn`: the yard and the sheds won |
| `b8_c4_yardSpread` | 1 | `burn`: the fire reached an empty tent |
| `b8_c4_edgeCost` | `held` / `tents` | `burn`: who held the edge (guards on Ch 3 `stand`) / two tents went down |
| `b8_c4_scale` | 1 | Hurrin gave up his brother's grey scale |
| `b8_c4_hook` | 1 | Mossa lent the camp's fire-hook (always, at "Where are the guards?") |
| `b8_c4_rag` / `b8_c4_songSeen` | 1 | the ash-rag; the carriers' song seen (always) |
| `b8_c4_hymnTried` / `b8_c4_hymnOk` | 1 | the trick rolled / learned |
| `b8_c4_waterDone` / `b8_c4_waterFought` / `b8_c4_waterTalked` | 1 | the water line cleared / by a fight / by talking |
| `b8_c4_drunkDone` / `b8_c4_drunkSent` | 1 | the end tent cleared (optional) / without a fight |
| `b8_c4_sealSeen` | 1 | a Daru merchant's seal on jugs in the yard (Ch 2 `passed`) |
| `b8_c4_ropeSeen` | 1 | the rope across the barrow end and the children's tents seen |
| `b8_c4_knelt` | 1 | knelt with Mossa facing the barrow (peace, no boon, no mechanic) |
| `b8_c4_jug` | `poured` / `kept` | the jug of kelyk, if carried: poured into the gutter (removed from the kit) or kept |
| `b8_c4_mossaMet` / `b8_c4_hurrinMet` / `b8_c4_yardSeen` / `b8_c4_rowsSeen` | 1 | met, seen |
| `b8_c4_drawn` / `b8_c4_reader` / `b8_c4_noCard` | | the reading (140c) |

## Flags from Ch 2 and Ch 3 this chapter reads (with defaults)

- **Ch 2:** `b8_c2_kelyk` (`burned`/`passed`); unset, it follows `b8Key(2)` (`fields` → `burned`), else `B8KEY0[2]` `pass` → `passed`. On `passed`: one more wave in `b8_c4_edge` (round 5, three pilgrims, "jugs with a Daru merchant's seal") and the seal on the yard's jugs, with an Ohl line on the twenty silver of pay. The brief fixes the pay at 20.
- **Ch 3:** `b8Key(3)` (default `stand`). `stand`: +2 on the hold check; Mossa has heard of the squad from the barrow's guards; on `burn` the guards come to hold the edge. `kneel`: Mossa saw the squad lay something on the barrow.
- **Edrem:** `b8_edremDone`. If he waits (2), or this save never met him (unset), he stands where the pilgrims' road comes in to the edge (`b8_c4_edrem`) and joins (`b8Join('edrem')`); sent away (0) he is not there. He is never called "Seerdomin" here; "wore the grey once" once, at his join.
- **The jug:** `b8_kelykjug` in the kit (Ch 2's). Mossa smells it; it can be poured out.

## The trick: The Water-Song (`b8_c4_hymn`)

At the water line, after the drinkers are dealt with: the carriers' song over the sick (an old Domin carrying-song, a cup, a rag, a hand on the neck; "It isn't a prayer"). ✦ wits 17, "Learn the song: the words, the cup, the hand on the neck." The check names what the squad knows: the Rhivi singing over their dead on the plain (Book Three). Edges: Edrem +3, the bearer of Book Three's `song` +2, Ohl +2, Sohra +2, Ressa +2, Tuft +1, the sergeant +1; Brisk −1, Kettle −1, Vasso −1. "Yes, but": rattled. **Mechanic:** Rhivi Spirit-Song's (`song`): every squadmate within 4 heals 1d6+2 (+1 a level past the first), wakes from a daze, steps out of fire. **It uses the action** (v10.3: group heals keep the turn), plain `heal()` (no ward), not sorcery, never the Redeemer's. Not free, not passive.

## Items (each with its own art in 144b, on Book Eight's ground)

- `b8_c4_camphook` (weapon, `role:'reach'`, `atk:1, rng:1, reach:true, dmg:[1,10,2]`): the camp's fire-hook, from Mossa. On `burn`, its bearer gives Brisk +1 on the burning check, and it pulls the burning tent down on a failure. Mossa lets the squad keep it.
- `b8_c4_greyscale` (armour, `role:'mail'`, `ac:3, hp:2`): Hurrin's brother's grey scale, marks filed off.
- `b8_c4_ashrag` (trinket, `role:'any'`, `hp:2, stat:{wits:1}`): a carrier's ash-rag, from the song scene.

## Fights (numbers for the balance step; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b8_c4_water` | the water line | `b8_pilgrim` ×3, `b8_cultist` | 180 (108) | always unless talked off (guile 15) |
| `b8_c4_drunk` | the end tent | `b8_pilgrim` ×3, `b8_cultist` ×2 | 200 (120) | optional; can be faced down (might 16) |
| `b8_c4_edge` | the far edge | `b8_pilgrim` ×3, `b8_cultist`; waves r2 pilgrim ×2, r3 cultist + pilgrim, r4 pilgrim ×2, **r5 pilgrim ×3 on `passed`** | 360 | `hold`; survive 5 rounds (`get waves()`); surprise if the edge was set |
| · stage 2 *The men behind them* | | `b8_cultist` ×2, `b8_pilgrim` | +120 (480, 288 paid) | |
| `b8_c4_stores` | the store-yard | `b8_cultist` ×2, `b8_kelykpriest` | 260 | `burn`; main |
| · stage 2 *The sheds* | | `b8_cultist`, `b8_pilgrim` ×2 | +130 (390, 234 paid) | |

Paid xp: `hold` 516 with the end tent, 396 without; `burn` 462 / 342. All dark, `open:true`, style `b8_c4_camp`. Death checks as the engine runs them. Balance numbers: see Tests.

## Canon used, and limits held

- The first turning only (R6 S5–S7): no Salind, no Gradithan or his hut, no Spindle or Monkrat, no children's escape, no dragon, no fire from the sky (rules 71, 78; brief §Ch 4). The children are seen behind a rope at a distance; Mossa, Hurrin and Edrem say "someone should / will bring them out": characters' hopes, never the narrator's.
- **The Redeemer** (correction 8): Mossa says he takes the weight, listens, "sometimes he speaks, to someone", and has never done what anybody asked. The prayer (`b8_c4_kneel`) gives peace, nothing mechanical. No talk with the Redeemer; the barrow is seen only from the rows.
- "The guards who walked the rows stopped coming", plural and unnamed, for the canon Seerdomin's absence (R6). No canon name from §4's never-speak list appears; no Andii named; no Bastion, no Dying God's body.
- Kelyk: a sweet smell, then what it does (no fear, no feeling cuts, dancing, giving water away), headline only; never made to look good.
- No year, no count of weeks or months, no never-use names; the test greps every node for those, the camp's canon names, "hut" and "dragon", and for "!" in narration.
- **Invented, unnamed:** the carriers (the oldest, a young one), the drinkers, the men in good coats, the keepers and their priest, the family from the coast road, the guards from the barrow road (five, on `burn`/`stand`), the boy with Calder's word. Named from tth-canon §6 only: **Mossa** (she), **Hurrin** (he), and Calder (offstage).

## Claude's calls (David may overturn any)

1. Two fights of the chapter's own beside the brief's: `b8_c4_water` (the first sight of the drinkers) and `b8_c4_drunk` (optional). Three fights on each road with the optional one.
2. `b8_c4_edge` gets a second ground ("the men behind them"), so both main fights have a `stage2`, as the brief's size rules ask. The brief's Ch 4 section names stage 2 only for the stores.
3. The extra Ch 2 wave is round 5, three pilgrims, with the Daru seal named in its line.
4. Ch 3's `stand` +2 applies to every roller on the hold check (the guards help whoever sets the edge).
5. On `burn` the edge is held by others: the guards from the barrow road on `stand`, else Mossa and the carriers with two tents lost.
6. The ash-rag is given at the song scene whether or not the trick is learned; the hook at "Where are the guards?"; the grey scale by Hurrin, if asked.
7. The jug can be poured out at Mossa's tent (it leaves the kit); nothing later needs it.
8. The water line can be talked off (guile 15) instead of fought; the end tent faced down (might 16).
9. The camp keeps time by the city's bells under a night that does not lift (the barrow and camp under Black Coral's dark).
10. Mossa lets the squad keep the fire-hook.

## Engine notes

- Nothing the engine lacked; no wraps. The trick reuses Spirit-Song's shape in the chapter's own `AB.t_b8_c4_hymn`.
- `lint` warns "battle b8_c4_*: style b8_c4_camp" (its style list knows `b3`/`b5` prefixes only, as it warns for Book Seven's `b7_` grounds). The ground is drawn (`TILEX.b8_c4_camp`). A one-line lint change (`/^b[3578]/`) would quiet it; not made, it is outside this chapter.
- `b8_c4_water_start` shows as an orphan: it is reached through `b8_c4_water` (`DLG.b8_c4_water_start()`), as Ch 1's alley start is.
- Glossary: "The camp's edge", "The water-carriers", "The store-yard" pushed onto `GLOSSX.tth`.
- Art (144b): figures `b8_c4_mossa`, `b8_c4_hurrin`, `b8_c4_carrier`; ground `TILEX.b8_c4_camp`; backdrops `b8_camp_night` (140's, replaced), `b8_c4_rows`, `b8_c4_yard` (a burned version on `burn`), `b8_c4_tent`; the three items. Helpers `b84Sky`, `b84City`, `b84Barrow`, `b84Tin`, `b84Jugs` are free for Ch 5's artist if the road west looks back.

## Tests

`tools/b8ch4_test.mjs` (16 checks): a fresh start brought to Ch 4 with the earlier keys unset (the defaults), every node rendering with no never-name, no camp canon name, no "hut", no "dragon", no printed year and no "!" in narration; the audit under every phase and key; the reading; the fire (a line each); Mossa, the hook, the prayer (no boon), the jug; Edrem waiting and joining; the water line and its "yes, but"; the trick (✦ wits 17, not free, a group heal with no ward, Edrem the bearer); the rest and sleep; the rows, Hurrin, the scale, the rope; the end tent; the yard and the seal; the key; `hold` (the `stand` edge and not on `kneel`, 4 waves on `passed` and 3 on `burned`, both grounds, the morning, the end at the Contract 2); `burn` from the same moment (both grounds, the burning, the guards, the end); a `--from=4` style save (Tuft dead, Sohra and Vasso walking, Edrem waiting, `fields`/`kneel`).

Results (Mon Nov 9, 2026, 2:39 AM PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (4 new warnings, the unknown-style ones above, and the two orphans by design); `b8ch4_test` 16/16; `b8ch1_test` 18/18; `b8engine_test`, `trope_test` (B8 19,084 words, inside every budget; this chapter has no hits), `yesbut_test`, `onward_test`, `recruit_test` pass (`recruit_scan --file=144`: Vasso 10/66 and Edrem 24/66 nodes against a core average of 8; one head-count fixed). Not run here: `run_all`, `play.mjs`, and `balance.mjs` (left to the balance step, as asked; the browser slots were shared with Ch 2 and Ch 3).

**Art:** looked at in a 390×844 browser: the far edge, Mossa's tent, the rows, the yard, the edge map, and the far edge fight.
