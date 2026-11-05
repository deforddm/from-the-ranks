Thu Nov 5, 2026, 5:35 AM PST. Book Six balance, against book6 (v9.0.0, not shipped).

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
