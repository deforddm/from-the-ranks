Sun Nov 22, 2026, 5:21 AM PST. A PROPOSAL for David. Nothing here is built; the game is v13.62.17.

# Bridgeburner retune of the seven easy books (proposal)

David, Sat Nov 21, 2026, 10:33 PM PST: "2" (make the seven easy books harder), after the re-measure in `docs/v13.62-balance/`. He sees the changes before anything is built.

What changes. Only the Bridgeburner step (`b`) of single fights in `TFIGHT` (`src/985_tough.js`). A step is +1 to the enemies' chance to hit, and every third step +1 to their damage. Enemy health, numbers and layouts do not change. Soldier does not change. Books Two, Five and Ten do not change. 102 fights change.

Left alone on purpose: each book's first fight, the "survive N rounds" fights, the mortal fights, and any fight still won 95% or more at nine steps (the lever does nothing there).

How it was found. In memory, with `balance.mjs --patch`, the taught bot, Bridgeburner, the squad carrying every trick: each fight won 86% or more was stepped 2 or 3 at a time (12 runs a step, at most +9), stopped at 85% or under, backed off if it fell under 60%, then confirmed at 20 runs. Then every fight of each book was run once more with NO tricks at the proposed steps (8 runs a fight).

| Book | Now, every trick | Proposed, every trick | Proposed, no tricks | Fights changed |
|---|---|---|---|---|
| One | 89% | 80% | 80% | 15 of 30 |
| Three | 90% | 83% | 78% | 20 of 31 |
| Four | 88% | 78% | 78% | 15 of 26 |
| Six | 95% | 83% | 80% | 16 of 24 |
| Seven | 88% | 78% | 73% | 12 of 23 |
| Eight | 93% | 86% | 85% | 14 of 24 |
| Nine | 90% | 84% | 82% | 10 of 22 |

Reading it. David's target is 75 to 80%% (band 65 to 85). With every trick the seven books land at 78 to 86%%; with none at 73 to 85%%. Eight and Nine stay a little high because many of their fights are survive fights or are won whatever the step. At 8 runs a book is good to about 3 points and a single fight to about 17, so the no-tricks column cannot show which single fights are under the 60%% floor; several read 38 to 50%% in one run and not in the next.

Book Seven, softened. The first proposal put a no-trick squad at 65%% there, with the bridge (b7_c7_bridge) at 12%%. Its step is left as it is and two others were halved; Seven then measured 78%% with every trick and 73%% with none (8 runs each).

Not done, and worth doing before it ships: a 20-run confirmation of every changed fight with no tricks, to find any that are under the floor for a squad that failed its checks.

## Book One

| Fight | Step now | Step proposed | Won now, every trick (8 runs) | Won at the proposed step, every trick (20 runs) |
|---|---|---|---|---|
| accounting | 0 | 2 | 88% | 75% |
| outriders | 0 | 2 | 88% | 65% |
| c2_deserters | 0 | 2 | 88% | 70% |
| cutpurses | 0 | 2 | 100% | 80% |
| knives | 0 | 2 | 88% | 60% |
| c3_toughs | -1 | 2 | 100% | 65% |
| guild_roofs_2 | 0 | 2 | 88% | 85% |
| reprisal | -1 | 1 | 100% | 65% |
| c4_clan | 0 | 3 | 100% | 80% |
| c5_dig | -2 | 0 | 88% | 75% |
| terrace_knives | 0 | 5 | 88% | 75% |
| terrace_knives_2 | -2 | 2 | 100% | 75% |
| the_mines | -1 | 1 | 88% | 80% |
| c6_bonfire | 0 | 2 | 88% | 95% |
| c7_worrygate | -2 | 0 | 88% | 70% |

## Book Three

| Fight | Step now | Step proposed | Won now, every trick (8 runs) | Won at the proposed step, every trick (20 runs) |
|---|---|---|---|---|
| b3_c1_brawl | 0 | 2 | 100% | 75% |
| b3_c1_herds | 0 | 2 | 88% | 75% |
| b3_c2_hill | 0 | 3 | 100% | 80% |
| b3_c2_herdfight | 0 | 2 | 88% | 95% |
| b3_c2_wagonfight | 0 | 5 | 100% | 95% |
| b3_c3_picket | 2 | 5 | 100% | 85% |
| b3_c3_camps | 0 | 5 | 100% | 80% |
| b3_c3_granary | 0 | 7 | 100% | 80% |
| b3_c4_brawl | 6 | 10 | 88% | 90% |
| b3_c5_wellfight | 1 | 5 | 88% | 90% |
| b3_c6_field | 1 | 5 | 88% | 75% |
| b3_c6_landing | 0 | 1 | 100% | 70% |
| b3_c6_condors | 0 | 2 | 88% | 100% |
| b3_c6_raid | 0 | 3 | 100% | 85% |
| b3_c6_ambush | -1 | 2 | 100% | 70% |
| b3_c7_trenchfight | 0 | 7 | 100% | 80% |
| b3_c7_side | 0 | 2 | 88% | 90% |
| b3_c7_probe | 0 | 8 | 88% | 90% |
| b3_c7_gully | 0 | 8 | 100% | 90% |
| b3_c7_herds | -2 | 1 | 100% | 100% |

## Book Four

| Fight | Step now | Step proposed | Won now, every trick (8 runs) | Won at the proposed step, every trick (20 runs) |
|---|---|---|---|---|
| b4_c1_watch | 1 | 2 | 100% | 70% |
| b4_c2_hill | 0 | 2 | 88% | 90% |
| b4_c3_raiders | 0 | 4 | 100% | 80% |
| b4_c3_scavengers | 3 | 6 | 100% | 75% |
| b4_c3_poles | 2 | 5 | 100% | 60% |
| b4_c4_picket | 2 | 5 | 88% | 75% |
| b4_c5_seep | 0 | 5 | 100% | 90% |
| b4_c5_rearguard | 3 | 6 | 88% | 90% |
| b4_c5_deserters | 0 | 7 | 100% | 70% |
| b4_c6_nest | 2 | 5 | 100% | 80% |
| b4_c6_dusk | 0 | 5 | 100% | 70% |
| b4_c6_patrol | 2 | 3 | 88% | 90% |
| b4_c6_outpost | 0 | 8 | 100% | 60% |
| b4_c7_outriders | 4 | 6 | 88% | 85% |
| b4_c7_spur | 0 | 3 | 100% | 80% |

## Book Six

| Fight | Step now | Step proposed | Won now, every trick (8 runs) | Won at the proposed step, every trick (20 runs) |
|---|---|---|---|---|
| b6_c2_shrine | 0 | 5 | 100% | 80% |
| b6_c2_village | 0 | 1 | 88% | 80% |
| b6_c2_road | -3 | -1 | 100% | 80% |
| b6_c3_sally | -1 | 5 | 100% | 65% |
| b6_c3_strays | 0 | 5 | 88% | 95% |
| b6_c4_cult | 0 | 9 | 100% | 90% |
| b6_c4_streets | -1 | 8 | 100% | 75% |
| b6_c5_village | 4 | 13 | 100% | 85% |
| b6_c5_deserters | 0 | 6 | 100% | 70% |
| b6_c6_night | 2 | 8 | 100% | 80% |
| b6_c6_cult | 0 | 8 | 100% | 70% |
| b6_c7_jetty | 0 | 3 | 88% | 85% |
| b6_c7_guard | 0 | 9 | 100% | 65% |
| b6_c7_streets | 0 | 7 | 100% | 75% |
| b6_c5_boats | 0 | 3 | 100% | 100% |
| b6_c7_alley | 0 | 6 | 100% | 90% |

## Book Seven

| Fight | Step now | Step proposed | Won now, every trick (8 runs) | Won at the proposed step, every trick (20 runs) |
|---|---|---|---|---|
| b7_c1_riders | 0 | 3 | 100% | 60% |
| b7_c2_gate | 2 | 3 | 88% | softened after; see the note |
| b7_c3_road | 2 | 3 | 88% | 80% |
| b7_c3_factor | 3 | 4 | 100% | softened after; see the note |
| b7_c4_riot | 1 | 4 | 100% | 75% |
| b7_c4_patriots | 2 | 5 | 100% | 75% |
| b7_c5_road | 4 | 6 | 88% | 70% |
| b7_c5_bailiff | 2 | 8 | 88% | 90% |
| b7_c6_landing | 0 | 1 | 100% | 80% |
| b7_c6_stand | 0 | 5 | 100% | 95% |
| b7_c7_gate | 2 | 5 | 100% | 85% |
| b7_c7_streets | 1 | 3 | 100% | 95% |

## Book Eight

| Fight | Step now | Step proposed | Won now, every trick (8 runs) | Won at the proposed step, every trick (20 runs) |
|---|---|---|---|---|
| b8_c1_den | 5 | 7 | 88% | 80% |
| b8_c1_hunt | 0 | 2 | 88% | 90% |
| b8_c1_chancers | 3 | 5 | 100% | 90% |
| b8_c2_raid | 3 | 11 | 100% | 90% |
| b8_c2_town | 9 | 12 | 100% | 80% |
| b8_c3_road | 1 | 3 | 88% | 85% |
| b8_c3_ridge | 2 | 10 | 100% | 75% |
| b8_c3_sellers | 4 | 7 | 100% | 85% |
| b8_c4_water | 6 | 10 | 88% | 80% |
| b8_c4_drunk | -3 | 2 | 100% | 70% |
| b8_c4_stores | 8 | 11 | 100% | 90% |
| b8_c5_peddler | 12 | 21 | 100% | 90% |
| b8_c7_looters | -3 | 2 | 100% | 95% |
| b8_c7_doorway | 6 | 15 | 100% | 90% |

## Book Nine

| Fight | Step now | Step proposed | Won now, every trick (8 runs) | Won at the proposed step, every trick (20 runs) |
|---|---|---|---|---|
| b9_c1_stores | 3 | 5 | 88% | 95% |
| b9_c2_bout | 2 | 5 | 100% | 70% |
| b9_c3_farm | 9 | 11 | 88% | 85% |
| b9_c3_dogs | 8 | 15 | 88% | 80% |
| b9_c4_raid | 1 | 2 | 88% | 85% |
| b9_c4_forage | 5 | 10 | 100% | 75% |
| b9_c5_cache | 11 | 19 | 100% | 70% |
| b9_c5_bull | 4 | 6 | 100% | 75% |
| b9_c5_dogs | 3 | 8 | 100% | 85% |
| b9_c6_gap | 9 | 13 | 88% | 75% |
