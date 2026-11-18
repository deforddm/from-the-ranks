Wed Nov 18, 2026, 1:54 AM PST. Measured on v13.48.0 (9d2ac74), nothing changed. Books One to Five with the taught bot (the first time since v13.5.1 taught it),
`tools/balance.mjs --runs=10 --noellis=0 --naive=0`, both difficulties, the browser's own dice (FTR_SEED=off). Then the 18 lowest fights again at 30 runs (`c-*.md`).
Books Six to Ten: the Nov 14 numbers in `docs/v13.5-bot3/` stand (no combat rule has changed since).

Targets (David, Nov 6): Soldier about 90% (85–97), Bridgeburner 75–80% (65–85), no Bridgeburner fight under 60%.

| Book | Soldier mean | Bridgeburner mean | typical fight (rounds) | source |
|---|---|---|---|---|
| One | 93% | 85% | 11–12 | this run |
| Two | 91% | 83% | 11.5–13 | this run |
| Three | 96% | 87% | 13 | this run |
| Four | 97% | 84% | 11–11.5 | this run |
| Five | 97% | 75% | 6–7 | this run |
| Six | 96% | 85% | 11–12 | Nov 14 |
| Seven | 98% | 87% | 10–12 | Nov 14 |
| Eight | 99% | 91% | 9–12 | Nov 14 |
| Nine | 97% | 92% | 10–11 | Nov 14 |
| Ten | 96% | 91% | 8–11 | Nov 14 |

Fights outside the floors, pooled over 40 runs (10 + 30):
- Bridgeburner under 60%: Book One `c3_toughs` 50%, `reprisal` 55%; Book Five `b5_c1_lowwalk` 53%, `b5_c2_hulk` 50%. On the line: Book Two `b2_postern` 58%, Book Five `b5_c6_channel` 58%.
- Soldier under 85%: Book Two `b2_batrol` 55%; `b2_raid`, `b2_dojal` 78%, `b2_envoy` 80%; Book One `accounting` 80%.
- The other eight that looked low at 10 runs were noise (63–83% at 40).

Nothing here is a change. Any table change goes to David first.
