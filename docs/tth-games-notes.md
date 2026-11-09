Mon Nov 9, 2026, 4:36 AM PST · against the Book Eight engine (v11.0.0, not shipped; branch `book8-games`)

# Book Eight: the games at the fires

All five live in `src/149_b8_games.js`. Like Books Six and Seven (`109`, `129`), the file wraps the chapters' fire nodes, so the chapter files `141`–`147` are untouched. Each game:

- is offered at its chapter's fire, straight after "Talk with the squad". The fire keeps its own choices (the reading, the rest, the roster, the way on, "Not now" last), so a game can always be passed by;
- opens on the tables' frame from 36 (`mgOpen`, `mgPanel`, `mgKeys`, `MG.anim`): one screen, phone width, played by tapping, with keys as well;
- has one check inside it, made with Book Five's in-game roller (`b5gRoll`, through `b8gRoll`) at **DC 15**. Made helps; "yes, but" (near) helps and costs something that fits the scene; failed helps nothing;
- is played once a book. The fire stops offering it once it has finished, win or lose. Leaving early pays nothing and the game is offered again. The exception is Orsa's Cup: leaving with the stake down loses the stake, and the cup is done (Book Seven's Ships rule);
- pays once, as the table closes, through its `b8*Pay` hook and a `S.f.b8_*Paid` guard (the cup settles at the table, net capped in `S.f.b8_cupNet`);
- keeps its deeds on `S.deeds` (`b8CupWon/Lost`, `b8PegWon/Lost`, `b8LampWon/Lost`, `b8FireWon/Lost`, `b8SkipWon/Lost`). The Deeds page shows them under the Contract in an "At the fires" block (a wrap of `b8DeedsExtra`). Each game also gets an after-node (`b8_cK_<game>_after`) and a journal line.

**No game moves the Contract.** Its moves are fixed by the brief's table, and a chapter may already have used its own ±1 (Claude's call).

New names: none. Everyone is a minor name from tth-canon §6 (Orsa, Calder in passing, Thessaly, Hurrin, Benlo) or unnamed by role ("the carter").

## 1. Orsa's Cup (Ch1, `b8_c1_fire`)

- **What it is.** Down the steps under the cobbler's, Orsa's house game: one die in a leather cup. On your turn, throw as often as you like and add it up; bank it whenever you like. A one, and the round's count is gone. First to 20 banked takes the stake (1, 3 or 5 silver). Orsa banks at seven, or more when she is well behind.
- **The check.** Once a game, when a one comes up, say the die hit the wall (Guile 15; Kettle +2, Vasso +1, Vell +1, the sergeant +1). Made: thrown again. "Yes, but": thrown again, and a silver for the house.
- **Pays.** Silver, net capped at 8 over the book, settled as the cup is put away.
- **Offered.** Phase 3 on (once the Gadrobi lanes are open), while the squad has a silver. If the den brawl happened (`b8_c1_denDone`), the table is new and Orsa makes sure you notice.
- **Claude's call:** silver, because a dice den is where money is the scene.

## 2. The Last Peg (Ch2, `b8_c2_fire`)

- **What it is.** Fifteen pegs on a carter's tailboard. Take one, two or three in turn; whoever takes the last peg stands the dog watch. Best of three; you start rounds one and three. The carter plays true most of the time (he leaves you one more than a four).
- **The check.** Once a game, palm a fourth (Guile 15; Brannoc +2, talking about Falar; Vasso +1; Vell +1; the sergeant +1). Made: you take four. "Yes, but": four, and the carter plays every peg true after. Failed: he catches your wrist and you take one.
- **Pays.** Won: the carter's watch-money, 2 silver, once a book (`S.f.b8_pegPaid`). Lost: the Fourth stands the dog watch.
- **Offered.** Phases 1 to 5 (the caravan's fire, before the last wagon is decided).
- **Claude's call:** silver, because Calder pays the dog watch by the night. The kelyk is not in this game.

## 3. Lamp and Stone (Ch3, `b8_c3_fire`)

- **What it is.** Thessaly, the clerk sworn to the Andii, comes up to the lodging with a cloth of sixteen squares, a bag of black stones and a shuttered lamp: a game the Andii play to pass a night that does not pass. She lays the stones; the lamp opens for a breath; then dark, and you touch where the stones lie. One wrong touch is forgiven; a second loses the round. Rounds of three, four and five stones; two rounds take it.
- **The check.** Once a game, before a round, let your eyes go to the dark (Wits 15; Tuft +2, Meanas; Edrem +1; Ellis +1; the sergeant +1). Made: the lamp stays open twice as long. "Yes, but": twice as long, and one more stone.
- **Pays.** Won: Tuft's regard (+1) if she walks, else Edrem's, else a salve (`S.f.b8_lampPaid` = who).
- **Offered.** Once Thessaly has been met at the gate (`b8_c3_thessaly`), any phase.
- **Canon.** No Andii is named or seen. It is **not** the game in the tavern by the harbour (hard limit: the Seerdomin's game and Spinnock's), and the game has no canon name. Tuft feels the dark is "not empty" and does not say what fills it (rule 11; Mother Dark is never named).
- **Claude's call:** regard, because the game is taught, not wagered.

## 4. Keep the Fire (Ch4, `b8_c4_fire`)

- **What it is.** Hurrin and a few frightened pilgrims keep a small fire between the last tents and the open dark. The flame falls on its own, faster when a gust comes off the plain; a stick lifts it (a stick on a roaring fire is wasted). Ten sticks; last thirty counts until the bells say morning. Let it go out and the dark is at the tents.
- **The check.** Once a game, bank it with turf (Wits 15; Edrem +2, the pilgrims' road; Sohra +1; Kettle +1; the sergeant +1). Made: it burns at half the rate and the gusts can't reach it for ten counts. "Yes, but": the same, and a stick to set it.
- **Pays.** Won: Edrem's regard if he walks, else a salve, the pilgrims' willow bark (`S.f.b8_firePaid`).
- **Offered.** Phase 2 once Hurrin is met (`b8_c4_hurrinMet`), and phase 4 (the morning by the bells). Never phase 3, the bad night, which has its own fight.
- **Kelyk** is only the sweet smell from the rows, which Hurrin keeps his face from; Ohl's line notes nobody at this fire drank. Never glamorised.

## 5. Stones on the Water (Ch7, `b8_c7_fire`)

- **What it is.** The night after, on the shingle, Benlo comes down from the street with his barrow and a pocket of flat stones. Three throws each across the lake toward the blue lamps. Each throw is two taps: the angle as the arm swings (flat is best), then the strength (the mark near the top). Most skips over three throws wins; a tie is nobody's.
- **The check.** Once a game, look for a flat stone (Wits 15; Brannoc +2, Falari jetties; Vasso +1; Sohra +1; the sergeant +1). Made: the next throw skips two more. "Yes, but": two more, and Benlo finds a flat one too (one more for him).
- **Pays.** Won: +1 regard to whichever squadmate who walks has the lowest regard ("the one who needed the evening most"), else a salve, Benlo's goose-grease (`S.f.b8_skipPaid` = who).
- **Offered.** Phase 3 (evening on the shore), before the roads are chosen (`!b8_c7_key`).
- **Claude's call:** the "night after" game is a quiet one. The bells for the dead go on over it; nothing in it names who died.

## No game in Chapters 5 and 6

The plan names five places; the road west (Ch 5) and the last night (Ch 6) are left without a table on purpose.

## Art

Drawn on the canvas in the same file, with the book's own figures (`b8_c1_orsa`, `b8_c2_carter`, `b8_c3_thessaly`, `b8_c4_hurrin`, `b8_c1_benlo`) and the squad's (`sgt` and whoever walks). Book Six's `b6gNight` draws the skies, Book Seven's `b7gFire` and `b7gDie` the caravan fire and Orsa's die. The tables hold still under `REDUCE()` except where the motion is the game (the swinging arm, the flame).

## Tests

`tools/b8games_test.mjs` (94 checks) covers, for each game: the offer right after the squad's talk with "Not now" last, and "Not now" back to the map; a full win and its pay and after-node; the check as it rolls; a forced "yes, but" and its cost; a loss that pays nothing; leaving early; not being offered again; the pay hook not paying twice; the other coin (Edrem's regard, the salve); the phases where it is not offered; that the Contract does not move; phone width (390); the Deeds rows, the journal lines, and the after-nodes rendering cleanly every way (no leaks, no never-names, no "!" in narration). Screenshots go to `/tmp/claude-0/shots/b8/games/`.
