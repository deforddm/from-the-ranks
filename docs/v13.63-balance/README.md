Sun Nov 22, 2026, 3:32 PM PST. Shipped in v13.63.0.

# Bridgeburner retune of the seven easy books (v13.63.0)

David, Sat Nov 21, 2026, 10:33 PM PST: "2" (make the seven easy books harder), after the re-measure in `docs/v13.62-balance/`. Sun Nov 22, 1:17 PM PST, shown the proposal: "Yes and yes" (build it; and work out a health or numbers change to bring Eight and Nine lower, shown to him before it is built; that second part is not in this version).

What changed. Only the Bridgeburner step (`b`) of 101 single fights in `TFIGHT` (`src/985_tough.js`). A step is +1 to the enemies' chance to hit, and every third step +1 to their damage. Enemy health, numbers and layouts did not change. Soldier did not change. Books Two, Five and Ten did not change.

Left alone on purpose: each book's first fight, the "survive N rounds" fights, the mortal fights, and any fight still won 95% or more at nine steps (the lever does nothing there).

How it was found. In memory, with `balance.mjs --patch`, the taught bot, Bridgeburner, the squad carrying every trick: each fight won 86% or more was stepped 2 or 3 at a time (12 runs a step, at most +9), stopped at 85% or under, backed off if it fell under 60%, then confirmed at 20 runs. Then every changed fight was run 20 times with NO tricks; the 13 that read under 60% were eased a step or two (one, `knives`, went back to where it was) and run again with and without tricks.

| Book | Before, every trick | Now, every trick | Now, no tricks | Fights changed |
|---|---|---|---|---|
| One | 89% | 82% | 81% | 14 of 30 |
| Three | 90% | 84% | 81% | 20 of 31 |
| Four | 88% | 78% | 80% | 15 of 26 |
| Six | 95% | 84% | 82% | 16 of 24 |
| Seven | 88% | 78% | 73% | 12 of 23 |
| Eight | 93% | 86% | 84% | 14 of 24 |
| Nine | 90% | 84% | 81% | 10 of 22 |

Reading it. David's target is 75 to 80%% (band 65 to 85). A book's figure is the mean over all its fights, the untouched ones measured at 8 runs. At 20 runs a single fight is good to about 11 points, so a fight reading 55 to 65%% is at the floor, not surely under it (`accounting` read 55%% with tricks and 70%% without at the same step).

Claude's calls: Book Seven's bridge (`b7_c7_bridge`) keeps its step, because a no-trick squad won it 12%% of the time at the first proposal; the floor of 60%% is held for a squad with no tricks as well as one with all of them.

Seen and not touched (outside this change): a few untouched fights read under 60%% for a no-trick squad at 8 runs (`knives` 50, `b4_c1_brawl` 38, `b9_c2_drill` 38, `b3_c4_breakout` 50, `b6_c1_edge` 50, `b7_c2_alley` 50). Eight runs is too few to say; they want a 20-run look.

`steps.json` holds the step of every changed fight.

## Book One

| Fight | Step before | Step now | Won before, every trick (8 runs) | Won now, every trick (20 runs) | Won now, no tricks (20 runs) |
|---|---|---|---|---|---|
| accounting | 0 | 1 | 88% | 55% | 70% |
| outriders | 0 | 2 | 88% | 65% | 70% |
| c2_deserters | 0 | 1 | 88% | 85% | 70% |
| cutpurses | 0 | 2 | 100% | 80% | 70% |
| c3_toughs | -1 | 0 | 100% | 65% | 70% |
| guild_roofs_2 | 0 | 2 | 88% | 85% | 85% |
| reprisal | -1 | 0 | 100% | 80% | 70% |
| c4_clan | 0 | 2 | 100% | 85% | 70% |
| c5_dig | -2 | 0 | 88% | 75% | 70% |
| terrace_knives | 0 | 5 | 88% | 75% | 70% |
| terrace_knives_2 | -2 | 2 | 100% | 75% | 60% |
| the_mines | -1 | 1 | 88% | 80% | 80% |
| c6_bonfire | 0 | 2 | 88% | 95% | 85% |
| c7_worrygate | -2 | -1 | 88% | 90% | 75% |

## Book Three

| Fight | Step before | Step now | Won before, every trick (8 runs) | Won now, every trick (20 runs) | Won now, no tricks (20 runs) |
|---|---|---|---|---|---|
| b3_c1_brawl | 0 | 2 | 100% | 75% | 85% |
| b3_c1_herds | 0 | 1 | 88% | 85% | 90% |
| b3_c2_hill | 0 | 3 | 100% | 80% | 95% |
| b3_c2_herdfight | 0 | 2 | 88% | 95% | 75% |
| b3_c2_wagonfight | 0 | 5 | 100% | 95% | 95% |
| b3_c3_picket | 2 | 5 | 100% | 85% | 80% |
| b3_c3_camps | 0 | 5 | 100% | 80% | 80% |
| b3_c3_granary | 0 | 7 | 100% | 80% | 75% |
| b3_c4_brawl | 6 | 10 | 88% | 90% | 90% |
| b3_c5_wellfight | 1 | 5 | 88% | 90% | 70% |
| b3_c6_field | 1 | 4 | 88% | 90% | 70% |
| b3_c6_landing | 0 | 1 | 100% | 70% | 60% |
| b3_c6_condors | 0 | 2 | 88% | 100% | 85% |
| b3_c6_raid | 0 | 3 | 100% | 85% | 65% |
| b3_c6_ambush | -1 | 2 | 100% | 70% | 80% |
| b3_c7_trenchfight | 0 | 6 | 100% | 75% | 70% |
| b3_c7_side | 0 | 2 | 88% | 90% | 75% |
| b3_c7_probe | 0 | 8 | 88% | 90% | 70% |
| b3_c7_gully | 0 | 8 | 100% | 90% | 75% |
| b3_c7_herds | -2 | 1 | 100% | 100% | 95% |

## Book Four

| Fight | Step before | Step now | Won before, every trick (8 runs) | Won now, every trick (20 runs) | Won now, no tricks (20 runs) |
|---|---|---|---|---|---|
| b4_c1_watch | 1 | 2 | 100% | 70% | 70% |
| b4_c2_hill | 0 | 2 | 88% | 90% | 65% |
| b4_c3_raiders | 0 | 4 | 100% | 80% | 75% |
| b4_c3_scavengers | 3 | 6 | 100% | 75% | 65% |
| b4_c3_poles | 2 | 5 | 100% | 60% | 70% |
| b4_c4_picket | 2 | 5 | 88% | 75% | 65% |
| b4_c5_seep | 0 | 5 | 100% | 90% | 85% |
| b4_c5_rearguard | 3 | 6 | 88% | 90% | 75% |
| b4_c5_deserters | 0 | 7 | 100% | 70% | 80% |
| b4_c6_nest | 2 | 5 | 100% | 80% | 80% |
| b4_c6_dusk | 0 | 5 | 100% | 70% | 70% |
| b4_c6_patrol | 2 | 3 | 88% | 90% | 70% |
| b4_c6_outpost | 0 | 8 | 100% | 60% | 70% |
| b4_c7_outriders | 4 | 6 | 88% | 85% | 60% |
| b4_c7_spur | 0 | 3 | 100% | 80% | 80% |

## Book Six

| Fight | Step before | Step now | Won before, every trick (8 runs) | Won now, every trick (20 runs) | Won now, no tricks (20 runs) |
|---|---|---|---|---|---|
| b6_c2_shrine | 0 | 5 | 100% | 80% | 90% |
| b6_c2_village | 0 | 1 | 88% | 80% | 75% |
| b6_c2_road | -3 | -1 | 100% | 80% | 75% |
| b6_c3_sally | -1 | 3 | 100% | 90% | 65% |
| b6_c3_strays | 0 | 5 | 88% | 95% | 90% |
| b6_c4_cult | 0 | 9 | 100% | 90% | 90% |
| b6_c4_streets | -1 | 8 | 100% | 75% | 85% |
| b6_c5_village | 4 | 13 | 100% | 85% | 65% |
| b6_c5_deserters | 0 | 6 | 100% | 70% | 60% |
| b6_c6_night | 2 | 8 | 100% | 80% | 85% |
| b6_c6_cult | 0 | 8 | 100% | 70% | 90% |
| b6_c7_jetty | 0 | 3 | 88% | 85% | 90% |
| b6_c7_guard | 0 | 9 | 100% | 65% | 80% |
| b6_c7_streets | 0 | 7 | 100% | 75% | 95% |
| b6_c5_boats | 0 | 3 | 100% | 100% | 80% |
| b6_c7_alley | 0 | 6 | 100% | 90% | 75% |

## Book Seven

| Fight | Step before | Step now | Won before, every trick (8 runs) | Won now, every trick (20 runs) | Won now, no tricks (20 runs) |
|---|---|---|---|---|---|
| b7_c1_riders | 0 | 3 | 100% | 38% | 65% |
| b7_c2_gate | 2 | 3 | 88% | 100% | 70% |
| b7_c3_road | 2 | 3 | 88% | 62% | 70% |
| b7_c3_factor | 3 | 4 | 100% | 75% | 70% |
| b7_c4_riot | 1 | 4 | 100% | 38% | 65% |
| b7_c4_patriots | 2 | 5 | 100% | 62% | 70% |
| b7_c5_road | 4 | 5 | 88% | 65% | 75% |
| b7_c5_bailiff | 2 | 8 | 88% | 75% | 75% |
| b7_c6_landing | 0 | 1 | 100% | 88% | 60% |
| b7_c6_stand | 0 | 5 | 100% | 100% | 90% |
| b7_c7_gate | 2 | 3 | 100% | 85% | 70% |
| b7_c7_streets | 1 | 3 | 100% | 100% | 70% |

## Book Eight

| Fight | Step before | Step now | Won before, every trick (8 runs) | Won now, every trick (20 runs) | Won now, no tricks (20 runs) |
|---|---|---|---|---|---|
| b8_c1_den | 5 | 7 | 88% | 80% | 65% |
| b8_c1_hunt | 0 | 2 | 88% | 90% | 70% |
| b8_c1_chancers | 3 | 5 | 100% | 90% | 95% |
| b8_c2_raid | 3 | 11 | 100% | 90% | 95% |
| b8_c2_town | 9 | 12 | 100% | 80% | 80% |
| b8_c3_road | 1 | 3 | 88% | 85% | 80% |
| b8_c3_ridge | 2 | 10 | 100% | 75% | 60% |
| b8_c3_sellers | 4 | 7 | 100% | 85% | 85% |
| b8_c4_water | 6 | 10 | 88% | 80% | 80% |
| b8_c4_drunk | -3 | 2 | 100% | 70% | 80% |
| b8_c4_stores | 8 | 11 | 100% | 90% | 85% |
| b8_c5_peddler | 12 | 21 | 100% | 90% | 80% |
| b8_c7_looters | -3 | 2 | 100% | 95% | 85% |
| b8_c7_doorway | 6 | 15 | 100% | 90% | 85% |

## Book Nine

| Fight | Step before | Step now | Won before, every trick (8 runs) | Won now, every trick (20 runs) | Won now, no tricks (20 runs) |
|---|---|---|---|---|---|
| b9_c1_stores | 3 | 5 | 88% | 95% | 95% |
| b9_c2_bout | 2 | 5 | 100% | 70% | 70% |
| b9_c3_farm | 9 | 11 | 88% | 85% | 95% |
| b9_c3_dogs | 8 | 15 | 88% | 80% | 70% |
| b9_c4_raid | 1 | 2 | 88% | 85% | 65% |
| b9_c4_forage | 5 | 10 | 100% | 75% | 65% |
| b9_c5_cache | 11 | 19 | 100% | 70% | 65% |
| b9_c5_bull | 4 | 6 | 100% | 75% | 80% |
| b9_c5_dogs | 3 | 8 | 100% | 85% | 85% |
| b9_c6_gap | 9 | 13 | 88% | 75% | 75% |

## Proposal, not built: enemy health on Bridgeburner for Books Eight and Nine (Sun Nov 22, 2026, 5:09 PM PST)

David's second yes. The to-hit lever is spent on these fights, so the trial used a per-fight Bridgeburner health multiplier (in memory, a `--patch` wrapping `mkFoe`; every trick, 12 runs a fight, so each figure is good to about 14 points). Won % (typical rounds):

| Fight | Now | Health x1.15-1.2 | x1.3 | x1.4-1.5 |
|---|---|---|---|---|
| b8_c1_chancers | 90 | | 92 (14) | 25 at x1.5 (16) |
| b8_c2_raid | 90 | | 75 (15) | |
| b8_c4_stores | 90 | 75 at x1.15 (22) | 50 (24) | |
| b8_c5_grass | 100 | | 92 (15) | 50 at x1.5 (20) |
| b8_c5_peddler | 90 | 75 at x1.2 (21) | 67 (24) | |
| b8_c6_masks | 100 | | 83 (12) | 100 at x1.4 (12) |
| b8_c7_doorway | 90 | | 92 (13) | 67 at x1.5 (13) |
| b8_c7_looters | 95 | 67 at x1.15 (18) | 50 (20) | |
| b9_c1_stores | 95 | | 83 (16) | |
| b9_c3_farm | 85 | 58 at x1.2 (18) | | |
| b9_c4_raid | 85 | 67 at x1.2 (13) | | |
| b9_c5_dogs | 85 | 67 at x1.2 (13) | | |
| b9_c7_trail | 88 | | 92 (12) | |

Reading it. Health moves these fights where to-hit did not, but steeply: one fight goes from 92% to 25% between x1.3 and x1.5. It also lengthens fights (stores and peddler run past 20 rounds, against the 10 to 12 the toughness reset aimed for). A sketch that would put Eight near 81% and Nine near 81%: chancers, grass, doorway x1.4; raid x1.3; peddler x1.2; stores, looters x1.15; Nine's stores x1.3, raid and c5_dogs x1.2, farm x1.1. It needs a new `h` field in `TFIGHT`, 20-run confirmation with and without tricks, and David's yes.
