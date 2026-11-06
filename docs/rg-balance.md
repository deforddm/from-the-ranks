Fri Nov 6, 2026, 3:57 AM PST. Book Seven balance, against book7 (v9.1.0, not shipped).

# Book Seven balance

## David's decisions

Thu Nov 5, 2026, about 11:20 PM PST, three changes:

1. Build B7GAP, a Book Seven-only Bridgeburner table on Book Six's B6GAP model, each fight toward about 75–80% won by a smart squad; ease the Ch6 landing to about 80%; the mortal fight (Ch5's village) near 75–80% too. Soldier unchanged.
2. Trim the Third's late fight xp so a full run ends near level 20, with 21 a stretch.
3. The Letherii army road's sergeant page: one line of barracks talk that Brys Beddict walked back into the city alive, which nobody can explain. Nothing about how.

## A harness fault, found and fixed

The first Bridgeburner table read Ch4's horse lines at 80% and Ch6's landing at 60%. Both were wrong. `tools/balance.mjs` reuses a page for many fights, and when a fight with a second area reached its break it clicked the first "Push on" button it found. That could be a stale button left hidden in the sheet by an earlier fight's break, which started that earlier fight's second area instead (seen: the Letherii's Ch6 break going on into the Third's Ch5 ford, at level 18). The harness now clicks only a button in a visible sheet. Re-run clean, every Book Seven fight as built was 100% won on Bridgeburner, the landing included. Book Six's table (docs/bh-balance.md) was read with the old harness and its second-area fights may read harder than they are; not re-run here.

## Soldier

10 runs a fight, before and after (B7GAP never runs on Soldier): every fight 100% won, 1–16% health lost. No change.

## Bridgeburner

Before: 10 runs a fight, clean harness. After: 10 runs a fight with the table as built, except the Ch2 alley and Ch7 gate, eased once more and read at 20 runs. Mean after: 81%.

| fight | lvl | before | after | health lost (after) | B7GAP row {ac, atk, hp ×, dmg} |
|---|---|---|---|---|---|
| b7_c1_dunes | 16 | 100% (10%) | 90% | 43% | 3, 3, 2.4, 4 |
| b7_c1_riders | 16 | 100% (8%) | 90% | 26% | 3, 3, 2.0, 4 |
| b7_c1_tally | 16 | 100% (14%) | 80% | 48% | 3, 3, 2.0, 4 |
| b7_c2_gate | 8 | 100% (4%) | 80% | 56% | 4, 4, 2.45, 5 |
| b7_c2_alley | 8 | 100% (14%) | 85% (20) | 69% | 2, 2, 1.5, 3 |
| b7_c2_bridge | 8 | 100% (10%) | 80% | 56% | 2, 3, 1.6, 3 |
| b7_c3_farm | 17 | 100% (13%) | 100% | 25% | 4, 4, 2.25, 4 |
| b7_c3_road | 17 | 100% (8%) | 80% | 37% | 6, 6, 3.0, 6 |
| b7_c3_factor | 17 | 100% (13%) | 90% | 41% | 4, 4, 2.9, 5 |
| b7_c4_riot | 9 | 100% (1%) | 90% | 50% | 4, 4, 2.7, 4 |
| b7_c4_edurcamp | 9 | 100% (7%) | 60% | 68% | 4, 4, 2.2, 4 |
| b7_c4_patriots | 9 | 100% (13%) | 90% | 53% | 3, 3, 1.5, 3 |
| b7_c5_road | 18 | 100% (9%) | 80% | 45% | 5, 5, 2.6, 5 |
| b7_c5_bailiff | 18 | 100% (5%) | 60% | 63% | 8, 8, 4.8, 8 |
| b7_c5_village (mortal) | 18 | 100% (14%) | 70% | 61% | 1, 2, 1.35, 2 |
| b7_c5_slip | 18 | 100% (11%) | 80% | 52% | 5, 5, 2.6, 6, mv +1 |
| b7_c6_deserters | 10 | 100% (4%) | 70% | 69% | 4, 4, 2.2, 4 |
| b7_c6_landing | 10 | 100% (16%) | 80% | 47% | 2, 2, 1.45, 2 |
| b7_c6_stand | 10 | 100% (9%) | 90% | 59% | 3, 3, 1.6, 3 |
| b7_c6_break | 10 | 100% (18%) | 80% | 56% | 3, 3, 1.65, 3 |
| b7_c7_gate | 19 | 100% (12%) | 70% (20) | 57% | 2, 3, 1.7, 4 |
| b7_c7_streets | 19 | 100% (13%) | 90% | 33% | 2, 2, 1.9, 4 |
| b7_c7_bridge | 19 | 100% (9%) | 80% | 44% | 4, 4, 2.6, 5 |

Ten runs a fight is about ±15 points. Where a row had more runs, the pooled reads: edurcamp 80% (50 runs), bailiff 77% (40), village 80% (40), farm 85% (40), stand 75% (20). The rows sit on cliffs: Ch7's gate went 95% at hp ×1.7 and 60% at ×1.75.

The village (mortal): 2.4 dead a fight in the 10-run table above, 1.7 in a 20-run read at 85% won (a loss counts all five squadmates dead). The street (survive 4) is always held. The square after it, with the war-leader, is where it is lost, so its row is small. The harness never rigs the roof, so a player who does is better off than these numbers.

### The table (src/120_book7.js)

- `B7GAP_ROW` {3, 3, 2.0, 4} for any `b7_` fight without its own row. `b7Gap()` is null outside Book Seven and off Bridgeburner.
- Two scales. The Third's fights (levels 16–19) carry big rows, up to the Ch5 bailiff's {8, 8, ×4.8, 8}. The Letherii's (levels 8–10) carry small ones.
- A fight with a second area carries less: the area after is the harder half.
- One new field, `mv`, used only on Ch5's slip (the running fight). Stats alone could not touch it: the squad outran the Edur to the reeds at any armour, to-hit or damage. +1 move lets them catch it. Claude's call, for David to overturn.

## The Third's xp

Every full run ended at 21 before. Chapters 1 and 3 already bring the Third to 18–19 by Chapter 5 (about 1,100 xp), so the trim had to be bigger than "modest" to land at 20. Fight xp, before → after (the game pays 60% of these):

| fight | before | after |
|---|---|---|
| b7_c5_road | 200 | 80 |
| b7_c5_bailiff | 150 | 60 |
| b7_c5_village / the square | 320 / 160 | 130 / 60 |
| b7_c5_slip / the ford | 260 / 130 | 110 / 50 |
| b7_c7_gate / the yard | 300 / 160 | 160 / 70 |
| b7_c7_holdouts / the stair | 240 / 120 | 130 / 55 |
| b7_c7_bridge | 160 | 90 |

Chapter 6 belongs to the Letherii (cap 12) and was not touched. `node tools/play.mjs 3 --book=rg --from=1`: 3/3 to the finale, each ending at level 20, about 6,050–6,150 xp against 6,190 for 21. Twenty-one now needs the extras. The Ch5 and Ch7 tests start at the level floor and now end on it (Ch5 ≥ 18, Ch7 ≥ 19).

## Brys

`B7CH6.fates`, the sergeant's army page (src/126_b7_ch6.js), after "under Brys Beddict, when the foreigners go": "There is barracks talk that he walked back into the city alive, which nobody can explain."

## Tests

`python3 build.py`; `node --check` on the changed files; `node tools/lint.mjs` 0 errors (35 warnings, as before); b7engine_test, b7ch5_test, b7ch6_test, b7ch7_test all ok; `play.mjs 3 --book=rg --from=1` 3/3 OK.
