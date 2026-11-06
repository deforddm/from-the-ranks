Fri Nov 6, 2026, 12:58 PM PST (re-tuned, v10.1.0). First written Thu Nov 5, 2026, 5:35 AM PST, against book6 (v9.0.0, not shipped).

# Book Six balance

Soldier, 10 runs a fight, no change: every fight 100% won (2–21% health lost).

Bridgeburner as built, 10 runs: every fight 100% but Ch2's road (70%). Proposed: a per-fight table B6GAP (Bridgeburner only, foes' armour, to-hit, health and damage, as Book Five's B5GAP), trial in tools/b6gap_trial.js. With it, 20 runs a fight, mean 75% won:

| fight | won | health lost |
|---|---|---|
| b6_c1_well | 90% (20) | 33% / — / — |
| b6_c1_rearguard | 75% (20) | 45% / — / — |
| b6_c1_edge | 70% (20) | 56% / — / — |
| b6_c1_patrol | 90% (20) | 30% / — / — |
| b6_c2_shrine | 80% (20) | 47% / — / — |
| b6_c2_village | 75% (20) | 39% / — / — |
| b6_c2_road | 80% (20) | 44% / — / — |
| b6_c3_sally | 75% (20) | 44% / — / — |
| b6_c3_streets | 65% (20) | 51% / — / — |
| b6_c3_gate | 75% (20) | 34% / — / — |
| b6_c3_strays | 75% (20) | 48% / — / — |
| b6_c4_carts | 75% (20) | 58% / — / — |
| b6_c4_cult | 80% (20) | 33% / — / — |
| b6_c4_streets | 80% (20) | 42% / — / — |
| b6_c5_village | 75% (20) | 55% / — / — |
| b6_c5_deserters | 80% (20) | 33% / — / — |
| b6_c5_boats | 70% (20) | 43% / — / — |
| b6_c6_night | 80% (20) | 43% / — / — |
| b6_c6_wells | 65% (20) | 62% / — / — |
| b6_c6_cult | 25% (20) | 81% / — / — |
| b6_c7_alley | 70% (20) | 52% / — / — |
| b6_c7_jetty | 80% (20) | 34% / — / — |
| b6_c7_guard | 95% (20) | 23% / — / — |
| b6_c7_streets | 75% (20) | 39% / — / — |

Built Thu Nov 5 (David: "Build it") as B6GAP in src/100_book6.js. b6_c6_cult was 25% in the trial; eased to {ac 1, atk 1, hp ×1.3, dmg 1→2}: 90% won (20 runs). b6_c3_streets, the mortal fight, 65%.

David, Nov 5: no seventh veteran pick (levels 16–18 bring stats only); the plague weakens Denul and Meanas in Chapters 4 and 5 only.


## Re-tuned Fri Nov 6, 2026 (v10.1.0)

`tools/balance.mjs` had a bug (fixed in ec21bd5, Book Seven's balance pass): in a fight with a second area it could click a stale "Push on" button and play the wrong second area. The table above was read with that bug. Re-measured clean (Bridgeburner, 20 runs a fight), the mean was still about 80% but uneven: Y'Ghatan's streets 35% (about 4 dead a fight), Y'Ghatan's gate 30%, Ch5's deserters 55%, Ch4's cult 65%, and Ch1's patrol, Ch2's road, Ch3's sally, Ch4's carts and Ch5's boats all 100%.

David (12:15 PM PST): "even it out". Four passes on those nine rows; the other fifteen are unchanged. Final, 20 runs a fight:

| fight | B6GAP row | won | dead a fight |
|---|---|---|---|
| b6_c1_patrol | ac 2, atk 2, hp ×2.05, dmg 3 | 80% | — |
| b6_c2_road | ac 0, atk 0, hp ×1.05, dmg 0 | 75% | — |
| b6_c3_sally | ac 1, atk 1, hp ×1.45, dmg 2 | 75% | — |
| b6_c3_streets (mortal) | ac 2, atk 2, hp ×1.5, dmg 2 | 85–90% | about 2 |
| b6_c3_gate | ac 2, atk 2, hp ×1.9, dmg 3 | 70% | — |
| b6_c4_carts | ac 4, atk 4, hp ×2.6, dmg 5 | 75% | — |
| b6_c4_cult | ac 3, atk 3, hp ×2.45, dmg 4 | 70% | — |
| b6_c5_deserters | ac 2, atk 2, hp ×1.6, dmg 3 | 80% | — |
| b6_c5_boats | ac 1, atk 1, hp ×1.7, dmg 2 | 95% | — |

The rest, from the clean full run: well 75, rearguard 90, edge 85, shrine 95, village (Ch2) 90, strays 75, streets (Ch4) 85, village (Ch5) 85, night 70, wells 75, cult (Ch6) 90, alley 75, jetty 85, guard 95, streets (Ch7) 65. Mean about 81%. Each ac/atk point moves a fight a long way (20–60 points), so the steps are small. Ten runs swing about ±15.
