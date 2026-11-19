Wed Nov 18, 2026, 11:57 PM PST. Shipped as v13.51.0. David, Nov 18, 2026: rework every standard shield-bash recruit in the later books, keeping the must-walk shields (Brisk, Haddat, Thegg); "Threshing sweep: should not push. and go with hoof-knife. everything else as recommended for now".

Method: the same fights played with the old kits and the new, Bridgeburner, taught bot, 16 runs a fight, four pages at a time (`FTR_SEED=off`, `--par=4`). Only fights whose bot squad holds a reworked recruit were compared (45 of them). Eight pages at a time on this two-core machine pulled every number down, so the first whole-book runs at `--par=8` are not kept.

| Recruit | Fights | Old kits | New kits, as approved | New kits, tuned |
|---|---|---|---|---|
| Brannoc (Book Six, the Fourth) | 6 | 89.6% | 99.0% | 97.0% |
| Doss (Book Seven, the Third) | 10 | 83.1% | 72.5% | 77.6% |
| Brask and Brennet (Book Nine) | 16 | 89.8% | 81.6% | (unchanged) |
| Pruss and Tirren (Book Ten) | 13 | 85.1% | 81.7% | Pruss's seven fights 81.4% with the bot taught to maul only for a free swing |
| Vell (Book One, ten fights he can be in) | 10 | 60.6% | 63.2% | (unchanged) |
| Darrut (Book Four, six in the squad) | 26 | 99.5% | 99.5% | (unchanged) |

Tuning inside the approved designs (Claude's calls): Brannoc's blows 1d6+1 to 1d6 each and the Boarding line's recharge 2 rounds to 3 (he was told the blows would drop if he ran hot); Doss's sweep 1d8+2 to 1d10+3. Brannoc is still a little stronger than he was with the bash. Edrem and Ottar are not in the bot's squads and were not measured.

Floors after tuning: `b9_c7_rearguard` 63% and `b7_c5_slip` 67% (30 runs each), `b10_c3_wagon` and `b10_c5_outriders` 63% (16 runs). Nothing measured under 60% that was not already there: `b10_c4_foragers` is 56% with the old kits and the new. Soldier, the same 45 fights, 8 runs: Book Six 100%, Seven 97.6%, Nine 96.1%, Ten 90.6% (`b10_c5_stragglers` 85% at 20 runs, 100% before).

Found on the way, not changed: with Vell in Ellis's place, several Book One Bridgeburner fights sit under the 60% floor with either kit (`guild_roofs` 44%, `barrow_wards` 44 to 56%, `house_guards` 44 to 56%, `reprisal` 31 to 50%). The standing measurements use Ellis.
