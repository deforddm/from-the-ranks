Mon Nov 9, 2026, 8:19 PM PST. Book Nine, Chapter 3, "The Road East" (`src/163_b9_ch3.js`, art `src/163b_b9_ch3_art.js`, test `tools/b9ch3_test.mjs`), against the Book Nine engine on `book9` (v12.0.0, not shipped).

# Chapter 3 notes: The Road East

The Third, with the heavies, on the road east out of Lether to the Wastes' edge (R11 S5: the army departs). The fever that has half the Malazans (R11 S13) comes into the Third. The squad meets the Letherii water cure through an unnamed Letherii healer of the escort, lent to the Malazan fever-carts "by the Commander's order". The Commander is never seen. The last farm in Lether. Harro the sutler. Duvo the Akrynnai horse-trader at the last water.

## Shape

- **Areas (4, 16×12):**
  - `b9_c3_camp`: the column's camp by the road at night, ground `b9_c3_road`, dark. Used in phases 1 and 3.
  - `b9_c3_road`: the road among the last farms at the noon halt.
  - `b9_c3_farm`: the last farm in the afternoon, ground `b9_c3_farm`.
  - `b9_c3_edge`: the last water before the Wastes, by day.
- **Nodes:** 66 `b9_c3_*` dialogue nodes, the reading's two included.
- **Phases** (`S.f.b9_c3_ph`):
  1. The first night's camp. Set at `b9_c3_start`.
  2. The next day: the road and the last farm. Set when the squad turns in.
  3. The second night's camp: the Witness beat and the key. Set leaving the farm at dusk.
  4. The Wastes' edge. Set after the key's scene.
- **The order a player meets things:**
  - Phase 1: the fever has come into the Third (the start); Thallo's word from the front; Brask carrying water down the carts (his own scene); the fever-carts and the Letherii healer (the trick); keeping the sick one drinking; the stone and the reading; the old marine; Wastes dogs at the carts (optional); the fire; turning in.
  - Phase 2: the noon halt; Thallo's job (deserters at the last farm); Harro selling fever-bark; down the lane to the farm (main fight); the old woman's last stores; back to the column at dusk.
  - Phase 3: the second night; Thallo passes on what a marines' sergeant said, secondhand, and the captain's word on the sick; the Witness beat at the fire; the key at the fever-carts.
  - Then either two days behind the column (`boil`) or two days at its pace (`press`).
  - Phase 4: the last water; Duvo (horse-meat, the Barghast war as news, the knife); raiders on his horses (optional); Harro again; the fire; out onto the Wastes.
- **The first halt** is `b9_c3_start`, with `b9ReadChoice(3)`. The reading is also offered at the stone, at the old marine's fire and at the fire, in phase 1 only.
- **`B9READ[3]`:** scene `b9_c3_fevercamp`; place "a flat stone by the road at the fever-fire"; back `b9_c3_fire`. It has a say line for each reader: Marrow, Tallow and the old marine.
- **The fire** (`b9_c3_fire`, id kept for the games pass):
  - phase 1: the fever-fire by its stone, at night;
  - phase 3: the same fire at night, with the Witness beat and the way to the key;
  - phase 4: a dung-fire at the last water.
  - `rationsHTML()` in every phase. A rest once in phase 1 and once in phase 4; none on the second night.
  - The talk: a line by night and a line at the edge for every soldier the Third can field. A soldier who has the fever gets their own fevered line.
  - The way on (phase 1 turning in, phase 3 the key, phase 4 the Wastes), and "Not now". The engine adds the roster.

## The fever (the engine's `b9Fever`)

- **When:** as the chapter starts, a small wrapper on `startChapter` (guarded by `b9On()`, chapter 3 only) picks the sick squadmate (`b93Pick`).
- **Who:** the walking squadmate with the lowest loyalty and no wound, never the sergeant, and the healers (Marrow, Mirrel) only if nobody else walks.
- **Flags:** it sets `S.f.b9_c3_sick = id` and calls `b9Fever(id)`. Fresh, it is Haddat; with Brask at loyalty 0 it can be Brask.
- **What it does:** the sick one fights the last farm (and anything before the key) at −1 to hit.
- **Engine change (this file only, guarded):** the roster wrapper (38c) clears every wound whenever a fire node opens, and `rest()` does the same. That would throw away the key's choice. So while Chapter 3 plays, `injuryClear` keeps the march fever (`b9fever`) until the squad stops and boils (`S.f.b9_c3_feverBroke`). Every other wound clears as before. On `press` the fever is carried to the chapter's end; the next chapter's start clears it (037).
- **For the lead:** the engine notes say "a rest at the fire clears it, as any wound". In Chapter 3 that is now true only after the boil.

## The key `b9_c3_key` (the fever)

It is chosen at the fever-carts on the second night, once Thallo has given the captain's word: the column keeps its pace, and a squad that falls out loses its place at the ration wagons. The healer sets out both roads. `rationsHTML()` is shown. Mirrel or Marrow, Brask and Tangle have lines. "Not yet" steps back.

- **`boil`:** stop and boil everything.
  - **`b9Ration(-1, 'fuel and time')`** once (`b9_c3_boiled`); the sick squadmate's loyalty +1.
  - The Third sits a day and a night in an empty camp and the fever breaks (`b9_c3_feverBroke = 1`; the wound is cleared at `b9_c3_boil_day`).
  - It marches hard for two days and catches the column at the last water, at the back of every line.
- **`press`:** keep the pace and trust the cure.
  - **`b9Ration(1, 'kept our place at the wagons')`** once (`b9_c3_pressed`).
  - The sick one walks or rides the tail of a fever-cart and drinks the healer's water at every halt.
  - The fever does not break. It is still on at the edge fire (a rest leaves it) and in the end text.
- **Read later (the brief):** Ch 5 (a line, from `S.f.b9_c3_sick` and the key).

## The Witness beat (`b9Wit`, `S.b9.wit.c3`)

- **Where:** at the fever-fire on the second night, after Thallo passes on what a heavy overheard at the marines' sergeants' fire: "surviving isn't what this is about". It is secondhand. The meeting is never shown, and nobody at it is named.
- **The question:** "What are we marching for?" It is reached from Thallo (`b9_c3_thallo3`) or from the fire.
- **The answers:**
  - "For each other. For the Third." → `kept` (`S.f.b9_c3_wit = 'squad'`)
  - "The Adjunct knows why. She gave her word it's worth it." → `kept` (`'adjunct'`)
  - "The column's going. So we go." → `doubt` (`'column'`)
  - "Not now" records nothing.
- **After:** each answer gets the squad's reply (Haddat, Tangle, Marrow, Brask). The first answer stands, as the engine sets.
- No `witness:true` check in this chapter.

## Rations (this chapter)

| Move | Where | Amount |
|---|---|---|
| The march | the engine, at the chapter's start | −2 |
| The key | `boil` / `press` | −1 / +1 |
| The anchor, once only (`S.f.b9_c3_found = 'farm' / 'duvo'`) | the last farm's stores (a `rations:true` wits 17 check, after the deserters), **or**, if the farm gave nothing, Duvo's horse-meat (a `rations:true` guile 17 check) | +1 |

- **No ration "yes, but"** in this chapter.
- **Ranges:**
  - From Ch 1's `stores` (8): 6 after the march, then 7 with the anchor; 6 on `boil`, 8 on `press`.
  - From `street` (6 or 7): 4 or 5 after the march, then 5 or 6; 4–7 at the end.
  - The brief's range of 4–8 holds.
- **Leaving the farm's stores** ("Keep it. You will want it.", Haddat +1) gives no ration. Duvo's horse-meat is then the anchor.

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b9_c3_key` | `boil` / `press` | the fever-carts, the second night |
| `b9_c3_sick` | the fevered squadmate's id (shared flag) | the chapter's start |
| `b9_c3_feverBroke` | 1 on `boil` | the boil day |
| `b9_c3_boiled`, `b9_c3_pressed` | 1: the key's ration move done | the key's scenes |
| `b9_c3_found` | `farm` / `duvo`: where the +1 came from | the farm's stores / Duvo |
| `b9_c3_storesLeft` | 1: the farm's stores left with the old woman | the farm |
| `b9_c3_tended` | `ok` / `tried`: the sick one nursed through the first night | the sick |
| `b9_c3_wit` | `squad` / `adjunct` / `column` (Witness in `S.b9.wit.c3`) | the fire |
| `b9_c3_cureOk` | 1: the cure learned (the trick) | the healer |
| `b9_c3_pot`, `b9_c3_bark` | 1: the boiling-pot, the fever-bark taken | the healer; Harro |
| `b9_c3_knife` | `given` (for the horses) / `bought` (eight silver) | Duvo |
| `b9_c3_farmDone`, `b9_c3_dogsDone` (`fought` / `driven`), `b9_c3_roadDone` | the fights | their after-nodes |
| `b9_c3_duvo` | 1: Duvo met (the Barghast war heard) | Duvo |

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b9_c3_farm` | the last farm, afternoon (`b9_c3_farm`) | `b9_deserter` ×3, `b9_deserterbow`; stage 2 (the barn) `b9_desertercap` | 380 + 170 | **main**; one `b9_heavy` ally (Thallo's heavy). Approach: straight in, or guile 17 round the barn (surprise) |
| `b9_c3_dogs` | the fever-carts, night (`b9_c3_road`, dark) | `b9_dog` ×4 | 100 | optional; or might 17 to drive them off with brands (no fight, no xp) |
| `b9_c3_road` | a dry wash at the Wastes' edge (`b9_c3_road`) | `b9_raider` ×3, `b9_raiderchief` | 140 | optional; straight down the wash, or wits 17 on the tracks (surprise). Duvo's knife on a win |

- **No new foes.** Combat numbers are at the engine's defaults; `B9GAP` and `B9SOLDIER` are untouched.
- **Xp:** paid at the engine's `XPK` (.6). The main fight alone pays 330, a full level. A Third at 20 (after Ch 1) ends at 21. A fresh start at 19 ends at 20 (test: 6044 xp on `boil` with every fight).
- **Hunger:**
  - At 5 (`fed`), nothing.
  - At 3 (`short`), every squadmate starts each fight 5% down on health.
  - At 1 (`hungry`), 10% down and −1 on every check.
  - In play: a Third entering at 6 (Ch 1's leanest road) is at 4 after the march, so `short` (5% down) in the farm fight and the dogs. `boil` with no anchor ends at 3. This chapter cannot reach `hungry`.
- **Balance:** `balance.mjs --book=dod` was not run (the caller asked for no long suites). The two optional fights are built light. The main fight copies Ch 1's main fight's shape, with an ally.

## The trick: The Letherii Cure (`b9_c3_cure`)

- **What it is:** what the Letherii healer shows the Malazan fever-carts. Boil every drop, a count of a hundred. Salt, and a little honey, for the ones who cannot keep it down, a mouthful at a time. Boiled linen. Latrines downhill of the water. Not sorcery.
- **The check:** a ✦ wits 19 check at `b9_c3_healer`. Its edges name what the squad knows:
  - Mirrel's Li Heng fevers +2;
  - Marrow's Soliel +2;
  - Haddat the water-seller's daughter +1;
  - Wenna's water +1;
  - Mehet's Y'Ghatan cisterns +1;
  - Doss's holding in a bad summer +1;
  - the sergeant's camp fevers on the Seven Cities road +1;
  - Brask and Tangle −1.
- **What it does:** it copies the Rhivi Spirit-Song (`song`, `t_song`). Once a fight, every squadmate within 4 heals 1d6+2+`lvB()`; it wakes the dazed and stops bleeding.
- **Its rules:** a group heal, so **a full turn** (not free); its words end "It takes the bearer's action." **No ward** (plain `heal()`).
- **Either way:** the healer's boiling-pot is given on either outcome.

## Items (each with art, 163b)

| Item | Kind | Stats | How it is got |
|---|---|---|---|
| `b9_c3_akrynknife` | weapon, blade | **atk 2, 1d8+3** (the real number) | Duvo's horn-gripped knife: given for his horses, or bought for eight silver |
| `b9_c3_boilingpot` | trinket, any | hp 3 | the healer's small copper pot |
| `b9_c3_feverbark` | trinket, any | hp 2 | Harro's twist of bark |

**What the fever-bark costs:** it is six silver on the road. The guile 17 haggle brings it to three; its "yes, but" makes it five (money is the scene). At the edge Harro sells it for whatever is in the purse, up to two, so it is never lost.

## Brask (the recruit)

- **Where his lines are** (all behind `b9In('brask')`):
  - his own scene (`b9_c3_brask`: water down the fever-carts, two of his had this fever before the river);
  - the start;
  - the fire, both phases, with a fevered line if he is the sick one;
  - the road;
  - the farm's arrival, the barn ground and the after;
  - Thallo's sergeants' word;
  - the Witness replies;
  - the key and both key scenes;
  - the edge, Duvo's horses and the end.
- **Recruit tests:** `recruit_test` passes, and no row of the squad leaves him out.

## Named inventions

- **Harro** (the brief's): a Malazan sutler from the Quon coast, lean, wide hat, a wagon hung with pots. He is drawn (`FIGX.b9_c3_harro`) and appears again in Ch 5.
- **Duvo** (the brief's): an Akrynnai horse-trader going north to his herds. He has a felt coat, a leather cap with its ear-flaps tied up, grey braids, the horn-gripped knife and a quirt. He is drawn (`FIGX.b9_c3_duvo`) and appears in Ch 3 only.
- **Thallo** (Ch 1's) returns in all four phases.
- **Unnamed by role:**
  - the Letherii healer, a woman of fifty in a pale linen coat (drawn: `FIGX.b9_c3_healer`);
  - the old woman of the last farm, a widow;
  - the old marine;
  - the captain (sick, then out of the cart; never seen speaking to the sergeant);
  - the drill sergeant (heard);
  - the deserters and their officer;
  - the raiders.
- No other new names.

## Canon points, hard limits, open threads

- **The fever and the cure** (R11 S13): the squad sees the healers at the carts, never the Commander. "Their Commander's order" is the most said of him. Koryk is never named (his fever is the vision's).
- **The sergeants' meeting** (R11 S10, a hard limit): never shown. One line comes through Thallo, from a heavy who was fetching water nearby.
- **Off the page entirely:** Hedge's company, Ruthan Gudd, Bugg's gift and the Akryn envoy are not mentioned. Sinn and Grub are not mentioned either; this chapter's one rumour is the Barghast war.
- **The one rumour:** Duvo says the Barghast have gone to war with the Akrynnai on the plains to the north (allowed Ch 3–4).
- **"Bonehunters"** is said once, by Thallo ("some clerk thought of it").
- **Kolanse** is said once (the intro, the clerks); nothing of what waits there.
- **The other squad:** one line, from the healer, as camp talk read from `b9Key(2)`:
  - `drill`: "went back to your drill sergeant's square… very proud… mad";
  - `wagons`: "loaded its wagons honest… the clerks talk of nothing else".
  - `b9OtherName()` is not used.
- **Ch 1** is read for a line at the start (`b9Key(1)`):
  - `street`: the household's boy waving;
  - `stores`: the quartermaster's rule, the Third eats first.
- **Rule 85:** no thirst unto death, no Glass Desert. Hunger is short commons and losing a place at the wagons. Duvo's joke is "nothing out there to eat but stones".
- **Open on purpose:** whether the old woman stays at the farm; where Duvo goes; Harro's stock.
- **Unsure:** whether the healers' cure in canon uses salt and honey. The canon sheet has only "Brys's water cure works" (R11 S13 [1]). The game's cure is boiling (supported) plus salt and honey (Claude's invention, plain field medicine). §10 has no page check for it; I suggest adding one.

## Art (163b)

- **Five backdrops:**
  - `b9_road_east`: the last farms behind field walls with gaps, fields gone to dust, the last trees, the column halted on the road ahead with its dust, wagons drawn up; Harro in Ch 3.
  - `b9_column`: the column receding along a dust track under a hard sun, heavies ahead in the file. It is generic, for any Third chapter's card.
  - `b9_c3_farm`: the house with grey thatch, a barn bigger than it, the well with no bucket, and the deserters' cart and two deserters until the yard is cleared, then the old woman at her door.
  - `b9_c3_fevercamp`: night; tents, a wagon, two fever-carts with the sick in rows, the Letherii pots steaming with the healer at them, the column's fires going away east, the Third's fire by a flat stone, the sick one under a blanket by it until the fever breaks.
  - `b9_c3_edge`: the thin stream with thorn trees, stone on the far bank, the column watering along it, Duvo's felt tent and his string of six horses on the picket, Duvo and Harro.
- **Ground:** `b9_c3_road` (dusted dry grass, the rutted road, thorn bushes, drystone field walls, wagons, fever-carts, the sutler's wagon, tents, fire, a flat stone, barrels, a horse picket, a felt tent, bare stone) and `b9_c3_farm` (mud brick for the house `Q`, the barn `b`, their doors `D` and `a`, and the yard wall; the well, a cart, a woodstack). The farmhouse is `Q` because the explore view draws a fire on any `B`.
- **Battle cover `t`:** the end of a drystone wall.
- **Figures:** `b9_c3_healer`, `b9_c3_harro`, `b9_c3_duvo`.
- **Items:** three, on Book Nine's dust-brown ground.
- **Size:** 41 KB. Checked at 412×915 (camp, road, farm before and after, edge, column, three maps, the farm battle).

## Engine

No edit outside this chapter's four files. In `163`, guarded:

1. A `startChapter` wrapper that gives the fever (`b9On()`, chapter 3).
2. An `injuryClear` wrapper that keeps the march fever through rests and fires in Chapter 3 until the boil.

`B9READ[3]` is filled from 163 (as the brief asks).

## Tests

- `python3 build.py`: passes.
- `node --check` on both files: passes.
- `node tools/lint.mjs`: 0 errors (the three style warnings are the same kind Ch 1 and Ch 2 have).
- `tools/b9ch3_test.mjs`: 22/22. It covers:
  - the fresh start (the march −2, the fever falls);
  - every node rendering clean;
  - the "yes, but" and "Not now" audit;
  - the reading;
  - the trick (taught, full turn, heals, no ward);
  - each fight started and won;
  - the anchor once;
  - the Witness, three answers and Not now;
  - both keys from the same moment (boil −1 and the fever broken; press +1 and the fever kept through a rest);
  - Duvo as the anchor;
  - a --from=3 style transfer save that reloads.
- `b9ch1_test`, `b9ch2_test`, `b9engine_test`, `trope_test`, `recruit_test`, `yesbut_test`, `reading_test`: all pass.
- `trope_scan`: B9 inside every budget.

## Claude's calls (David may overturn any)

1. The fever falls as the chapter starts, on the lowest-loyalty walking squadmate who is not a healer.
2. In Chapter 3 a rest or a fire does not clear the march fever until the squad boils; on `press` the fever is carried to the chapter's end.
3. The chapter is two camps and two days: the reading and the trick on the first night; the farm by day; the Witness and the key on the second night; then the Wastes' edge.
4. The key's `boil` costs a day and a place at the wagons (the −1). It also gives the sick squadmate +1 loyalty.
5. The +1 anchor comes once: from the farm if the squad buys her stores, else from Duvo's horse-meat.
6. No ration "yes, but" this chapter.
7. One ally (Thallo's heavy) in the farm fight, as in Ch 1's main fight.
8. The cure is boiling, salt and honey, taught by an unnamed Letherii healer; the trick takes the action, with no ward (the brief).
9. Harro's fever-bark is money's scene, so its "yes, but" costs silver, as does Duvo's horse-meat.
10. The healer gives the other squad's line (Ch 2's key) as camp gossip.
