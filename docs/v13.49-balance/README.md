Wed Nov 18, 2026, 5:53 AM PST. Shipped as v13.49.0. David, Nov 18, 2:16 AM PST: "fix both" (the fights under the floors, and Bridgeburner in Books Seven to Ten toward 75–80%).
Only `TFIGHT` in `src/985_tough.js` changed (a fight's own step: +1 to hit a step, +1 damage every third). Taught bot, 20 runs a step, three passes
(`tuning-steps.json` has every step tried and its result), then each book in full at 20 runs (`<book>-bridgeburner.md`) and the eased fights at 30.

Bridgeburner, book means: Seven 87 → 80%, Eight 91 → 87%, Nine 92 → 85%, Ten 91 → 80%.
Eight and Nine stay above the 75–80 target: eight of Book Eight's fights and four of Book Nine's are won 95–100% at every step tried
(raid, peddler, masks, roofs, doorway, street; train, gap, dusk, dark: survive fights and fights the bot wins from range), and the mortal fights
were left alone (Claude's call). The fights the step does move sit at about 80%. Soldier in Books Seven to Ten is unchanged.

The fights under the floors, after (30 runs): Bridgeburner `c3_toughs` 50 → 83%, `reprisal` 55 → 80%, `b5_c1_lowwalk` 53 → 77%, `b5_c2_hulk` 50 → 67%,
`b2_postern` 58 → 77%, `b5_c6_channel` 58 → 83%; Soldier `b2_batrol` 55 → 93%. The final pass found three under the floor, corrected before shipping: `b7_c4_riot` 55 → 80% (eased from its Nov 13 step), and two this pass had made too hard, `b7_c7_bridge` 60 → 87% and `b10_c2_deserters` 45 → 70%.
run_all --play=3: 157/157.
