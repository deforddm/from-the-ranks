Tue Nov 10, 2026, 4:43 PM PST · against the Book Ten engine (v13.0.0, not shipped; branch `book10`)

# Book Ten: the games at the fires

All five live in `src/189_b10_games.js`. Like Books Six to Nine (`109`, `129`, `149`, `169`), the file wraps the chapters' fire nodes, so the chapter files `181`–`187` are untouched. Each game:

- is offered at its chapter's fire, straight after "Talk with the squad", **for the squad that chapter belongs to** (the Third in Ch 1, 3, 7; the Letherii in Ch 2, 4). The fire keeps its own choices (the reading, the rest, the beat, the way on, "Not now" last), so a game can always be passed by;
- opens on the tables' frame from 36 (`mgOpen`, `mgPanel`, `mgKeys`, `MG.anim`): one screen, phone width, played by tapping, with keys as well;
- has one check inside it, made with Book Five's in-game roller (`b5gRoll`, through `b10gRoll`): **DC 17 for the Third** (levels 24–28), **DC 15 for the Letherii** (16–20), two over Book Nine's (Claude's call). Made helps; "yes, but" (near) helps and costs something in the game that fits the scene; failed helps nothing;
- is played once a book. The fire stops offering it once it has finished, win or lose. Leaving early pays nothing and the game is offered again;
- **pays once, in the book's own coin, at most +1:** **+1 regard** to whichever squadmate walking has the lowest regard ("the one who needed it most"; `b10gRegard`, +1 Witness instead only if nobody else walks) for three games, or **+1 Witness** (`b10Witness(1, why)`; `b10gWit`) for two, each behind its own `S.f.b10_*Paid` flag. A lost game pays nothing and costs nothing;
- **touches nothing else:** no thirst, no coin, no gear, no xp, no beat, and never the other coin (the test checks every win and loss);
- keeps its deeds on `S.deeds` (`b10LadderWon/Lost`, `b10MeasWon/Lost`, `b10StrawsWon/Lost`, `b10FistsWon/Lost`, `b10ShieldWon/Lost`). The Deeds page shows them under Witness in an "At the fires" block (a wrap of `b10DeedsExtra`, which the engine only asks for Book Ten's saves). Each game also gets an after-node (`b10_cK_<game>_after`, with `witnessHTML()`) and a journal line.

New names: none. Thallo, Yelt and Orla are the brief's own; everyone else is unnamed by role ("a regular of the company", "a carter at the column's tail", "a Letherii spearman"). No canon character is at any table. The Third and the Letherii never share a fire.

## 1. The Corporal's Ladder (Ch 1, the Third, `b10_c1_fire`)

- **What it is.** Thallo, big as a door and not eating, has a soldier's pack of plain cards, pips one to twelve, four of each. A card is up; call the next higher or lower. Right, a rung; wrong, or the same, off. Five rungs is the top. Three climbs each, the most rungs over the three; level is no one's. Thallo calls the even way (higher under seven); the panel shows the last twelve cards gone by, so a sergeant who counts can do better.
- **The check.** Once a game, before a call, count the pack (Wits 17; Tangle +2, Pruss +1, Haddat +1, the sergeant +1). Made: one slip this climb (a wrong call does not drop you). "Yes, but": the slip, and Thallo takes one on his next climb too.
- **Pays.** Won: **+1 regard** (`S.f.b10_ladderPaid` = who).
- **Offered.** Phases 1 and 2 (the camp by day; the first night). Not phase 3, after the key, the beat and the march to the glass.

## 2. Yelt's Measures (Ch 2, the Letherii, `b10_c2_fire`)

- **What it is.** Yelt's clerk's test with a skin, a jug and a barrel: measure exactly what he asks, in so many pours. Fill from the barrel, empty back into it, or pour one into the other until the one is empty or the other full. Three measures: 5 and 3 for 4, 7 and 4 for 6, 9 and 4 for 7. The pours allowed are the fewest it can be done in (`b10gMeasMin`, a breadth-first count) and two over. Two of three take it.
- **The check.** Once a game, at the start of a measure (before its first pour), do the sums (Wits 15; Perrit +2, Brennet +1, Tobet +1, the sergeant +1). Made: two more pours this measure. "Yes, but": two more pours, and the jug goes over and both go back to empty.
- **Pays.** Won: **+1 regard** (`S.f.b10_measPaid`); the squad's name goes into Yelt's book in the honest column.
- **Offered.** Phase 1 (the rise by day, both roads, before the parting) and phase 3 (the halt that night) on `escort` only: on `adjunct` the squad is on the glass and Yelt went south. Not phase 2 (the train loading at dusk).

## 3. Straws (Ch 3, the Third, `b10_c3_fire`, the circle under the cloaks)

- **What it is.** No fire in the glass and no table, so no dice by firelight: a quiet game in the shade, for the hours when talking costs water. Thallo knaps eleven slivers off the glass (on `south`, splinters off a dead wagon's spoke) and lets them fall on a cloak. Take one that nothing lies across (drawn brighter the higher it lies, each numbered, a button each); touch one with another across it and the heap shifts, and it is Thallo's go. Thallo takes a free one four times in five. Most taken wins; level is no one's. The heap is dealt with two to five free slivers at the start.
- **The check.** Once a game, on your go, read the heap (Wits 17; Tangle +2, Mirrel +1, Pruss +1, the sergeant +1). Made: the free slivers catch the light this go. "Yes, but": they catch it, and Thallo sees them too, and his next is sure.
- **Pays.** Won: **+1 regard** (`S.f.b10_strawsPaid`).
- **Offered.** Phases 1 and 4 (the two lie-ups by day). Never on the march by night (the fire node has no circle then).

## 4. Fists (Ch 4, the Letherii, `b10_c4_fire`)

- **What it is.** The carters' game, every yard in Lether knows it: each hides nought to three docks in a fist and calls the total of both. The one who calls it right takes the hand; both right, or neither, and it is no one's. First to three. Orla of the water-carts (on `adjunct`, a carter at the column's tail) calls her own and a guess at yours from what you hid before.
- **The check.** Once a game, before a hand, read the knuckles (Guile 15; Tirren +2, Kaedra +1, Tobet +1, the sergeant +1). Made: you see what she holds this hand. "Yes, but": you see hers, and she sees yours (her call is right this hand).
- **Pays.** Won: **Witness +1** ("a game at the horse-lines": the first laugh there since the river) (`S.f.b10_fistsPaid`).
- **Offered.** Phase 1 (dusk at the horse-lines) and phase 3 (after the key). Never phase 2 (the road by night, no fire).

## 5. Coins on the Shield (Ch 7, the Third, `b10_c7_fire`, the night before)

- **What it is.** At the next fire a regular of the company the Third is lent to (on `south`, a Letherii spearman of the brigades) lays his shield flat and chalks three rings round the boss: shove a coin from the near rim with the heel of the hand. The push grows and falls back; shove when it is right. Short, nothing; the outer ring one; the inner two; the boss three; off the far rim, nothing. Five coins each; most wins; level is no one's.
- **The check.** Once a game, before a coin, read the shield (Wits 17; Haddat +2, Tegra +1, Pruss +1, the sergeant +1). Made: the push comes slower next coin. "Yes, but": slower, and he takes the same line and his next coin sits on the boss.
- **Pays.** Won: **Witness +1** ("the regulars will remember": he tells it at his fire, the file-closers who could shove) (`S.f.b10_shieldPaid`).
- **Offered.** Phase 1 only (the night before). Never on the line (no fire) or at the barrows.

## No game in Chapters 5 and 6

Claude's call. Ch 5's fire is the fire with no fire, with the water gone; Ch 6 is the battle's day (the beach before it, the dusk after the dead). Five fires over both squads: three for the Third (1, 3, 7), two for the Letherii (2, 4), as Book Nine. Ch 3's is the fireless circle, so its game is a quiet one in the shade.

## The coin

At most +1 a game: regard three times (Ch 1, 2, 3), Witness twice (Ch 4 for the Letherii, Ch 7 for the Third). Each squad can gain at most +1 Witness from the tables over the book, on top of the brief's anchors ("Where Witness moves"), so its ranges move up by at most one at Ch 4 (the Letherii) and Ch 7 (the Third). Ch 7's +1 comes the night before the mortal fight; it moves the fight only if it crosses into `witnessed` (`B10_WITFIGHT` +1 to hit), which needs 8 or more before it.

## Art

Drawn on the canvas in the same file: the camp by day or night with Thallo's ladder chalked on a board and the card up; the water wagon's tailboard with the skin and the jug filling as they stand; the shade under the cloaks with the glare beyond and the numbered slivers on a cloak; the horse-lines at dusk with the picket and two fists; the first fields at night with the shield flat, its rings and the coins where they stopped. Figures: `b9_c1_thallo`, `b5_c1_clerk` (Yelt), `b9_c2_orla`, `b5_letherii` (the carter, the spearman), `b2soldier` (the regular), `sgt`, and whichever squadmate walks. Book Six's `b6gNight` draws the skies, Book Seven's `b7gFire` the fires, Book Four's horse the picket. Motion is held to the game.

## Tests

`tools/b10games_test.mjs`, for each game: the right squad playing that chapter; the offer right after the squad's talk with "Not now" last, and "Not now" back to the map; a full win, its pay (exactly +1 regard or +1 Witness, nothing else moved) and after-node; the check as it rolls; a forced "yes, but" and its cost; a loss that pays nothing; leaving early; not offered again; the pay not paying twice; the phases where it is not offered; both roads where the game changes (Yelt on the glass, the spoke on `south`, the carter on `adjunct`, the spearman on `south`); phone width (412); no game at Ch 5's or Ch 6's fires; the Deeds rows, the journal lines, and the after-nodes rendering cleanly on both roads every way (no leaks, no never-names, no "!" in narration, no rounds or turns, no sentence opening on Nobody/Somebody, each with its scene and the Witness box). Screenshots go to `/tmp/claude-0/shots/b10/games/`.
