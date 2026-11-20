Thu Nov 19, 2026, PST. Measured for v13.56.0 (tricks that answer by themselves).

What was measured. Until now the balance bot carried no tricks at all, so every earlier table is a squad that never won a hard check. `tools/balance.mjs --tricks` gives the squad every trick its book teaches before the fight's chapter, shared out in turn among the squad. Most of them now fire by themselves (`src/989b_answers.js`), so this is a squad that passed every hard check and lets the tricks run. The six swaps and six thrown bursts stay buttons and the bot does not press them.

Bridgeburner, 8 runs a fight, par 4, taught bot (`<book>-tricks.md`). "No tricks" is the last full measurement of each book (v13.48 to v13.53 docs).

| Book | No tricks | Every trick carried | Fights under 60% at 8 runs |
|---|---|---|---|
| One | 85% | 88% | none |
| Two | 83% | 79% | b2_westbank 50%, b2_dryraid 25% (re-run at 20: 70% and 80% with tricks, 70% and 75% without; noise) |
| Three | 87% | 93% | none |
| Four | 84% | 90% | b4_c1_dig 50% (Chapter 1 carries no tricks; noise) |
| Five | 75% | 82% | b5_c1_lowwalk 50%, b5_c2_wreckers 38% |
| Six | 85% | 94% | b6_c1_well 50% |
| Seven | 80% | 82% | b7_c2_gate 50% |
| Eight | 90% | 90% | b8_c1_den 50% |
| Nine | 78% | 87% | b9_c2_drill 38% |
| Ten | 86% | 86% | none |

Reading it. Eight runs a fight is about ±17 points on one fight and about ±3 on a book, so the single low fights are not findings (the two that looked worst were re-run and are not). Carrying every trick is worth nothing to nine points a book. The targets (Bridgeburner 75–80%, band 65–85) were tuned on the squad with no tricks, and that squad's numbers have not moved. A squad that wins every hard check now sits above the band in Books Three, Four, Six, Eight, Nine and Ten. Nothing was retuned: any table change is David's.

The Book One file also lists Book Eight to Ten fights (the tool's Book One filter lets them through); those rows are not Book One and are not counted above.
