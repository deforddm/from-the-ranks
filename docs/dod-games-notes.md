Mon Nov 9, 2026, 11:45 PM PST · against the Book Nine engine (v12.0.0, not shipped; branch `book9`)

# Book Nine: the games at the fires

All five live in `src/169_b9_games.js`. Like Books Six to Eight (`109`, `129`, `149`), the file wraps the chapters' fire nodes, so the chapter files `161`–`167` are untouched. Each game:

- is offered at its chapter's fire, straight after "Talk with the squad", **for the squad that chapter belongs to** (the Third in Ch 1, 5, 7; the Letherii in Ch 2, 4). The fire keeps its own choices (the reading, the rest, the roster, the Witness beat, the way on, "Not now" last), so a game can always be passed by;
- opens on the tables' frame from 36 (`mgOpen`, `mgPanel`, `mgKeys`, `MG.anim`): one screen, phone width, played by tapping, with keys as well;
- has one check inside it, made with Book Five's in-game roller (`b5gRoll`, through `b9gRoll`): **DC 15 for the Third** (levels 19–24), **DC 13 for the Letherii** (11–16). Made helps; "yes, but" (near) helps and costs something that fits the scene; failed helps nothing;
- is played once a book. The fire stops offering it once it has finished, win or lose. Leaving early pays nothing and the game is offered again;
- **pays once, at most +1**: Rations +1 through `b9Ration(1, why)` (four games), or +1 regard (Knife in the Dirt), behind a `S.f.b9_*Paid` guard. A lost game pays nothing and costs nothing;
- keeps its deeds on `S.deeds` (`b9SackWon/Lost`, `b9LocksWon/Lost`, `b9TallyWon/Lost`, `b9HelmWon/Lost`, `b9KnifeWon/Lost`). The Deeds page shows them under Rations in an "At the fires" block (a wrap of `b9DeedsExtra`). Each game also gets an after-node (`b9_cK_<game>_after`, with `rationsHTML()`) and a journal line.

**No game touches the Witness**, and none moves Rations except its one +1.

New names: none. Saffa and Yelt are the book's own (brief); everyone else is unnamed by role ("the quartermaster", "the heavy"). No canon character is at any table. The Third and the Letherii never share a fire.

## 1. The Short Sack (Ch1, the Third, `b9_c1_fire`)

- **What it is.** By the quartermaster's wagon in the barracks yard, nine biscuit sacks off a Letherii wagon, one of them short (a clerk's skim). Tap sacks onto the left or right pan, the same number each side, and weigh: the light pan rises. Two weighings, then name the sack. Three lots: nine, nine, then twelve (the clerk's three added; two weighings are not always enough for twelve). Two lots take it.
- **The check.** Once a game, at the start of a lot, heft them by hand (Might 15; Brask +2, Haddat +1, Tangle +1, the sergeant +1). Made: a third weighing this lot. "Yes, but": the third weighing, and a seam goes, and the quartermaster tips three more sacks into the lot.
- **Pays.** Won: a sack of biscuit, **Rations +1** (`S.f.b9_sackPaid`).
- **Offered.** Phases 3 and 4 (the yard by day). Not the first night (an empty yard) or the stores watch.

## 2. The Canal Locks (Ch2, the Letherii, `b9_c2_fire`)

- **What it is.** Saffa, the field cook, has a Letheras canal scratched on a bread-board: twelve locks from the quay to the basin, two boats each (a dock and a horn button). Throw one die, move one boat. Land on the other side's boat and it goes in the canal, back to the quay; locks 4 and 8 are lock-houses, safe. Both boats into the basin wins. Saffa drowns a boat when she can, else heads for the basin, else a lock-house.
- **The check.** Once a game, when one of yours goes in, say it was still in the lock (Guile 13; Brennet +2, Tobet +1, Perrit +1, the sergeant +1). Made: it stays. "Yes, but": it goes back to the last lock-house instead. Failed: in it goes.
- **Pays.** Won: the bottom of Saffa's pot, **Rations +1** (`S.f.b9_locksPaid`).
- **Offered.** Phase 1 (the first evening) and phases 4–5 (the last day). Not the drill day or the night in the train's yard.

## 3. Yelt's Tally (Ch4, the Letherii, `b9_c4_fire`)

- **What it is.** Yelt calls a wagon off his book the way he tests his clerks: what it held, then sacks on and sacks off, one call at a time, each gone when the next comes. Keep the count; pick the total from four. Three wagons, of five, seven and nine calls; two right take it.
- **The check.** Once a game, before a wagon, notch it on a stick (Wits 13; Tobet +2, Perrit +1, Brennet +1, the sergeant +1). Made: Yelt calls twice as slow. "Yes, but": twice as slow, and two more calls.
- **Pays.** Won: a sack the count found, written in honest against the Sixth's name, **Rations +1** (`S.f.b9_tallyPaid`).
- **Offered.** Phase 1 (dusk) and phases 4–5 (evening, after the key). Never phase 2, the night of the raid, which has its own fire (Yelt's closed book and the Witness beat) and is no night for a game.
- **Claude's call:** the honest count fits both keys: on `book` it is the same honesty; on `forage` it is Yelt's night off the hunt.

## 4. Under the Helmet (Ch5, the Third, `b9_c5_fire`)

- **What it is.** At the next fire a heavy plays for the pot's scrapings. Four dice each under a helmet. Bid what is under both ("three fours"): more dice, or the same number of a higher face; ones count as nothing. Or call the last bid a lie: the helmets come up; if there are that many, the bidder takes the hand, else the caller. Best of three hands; the heavy opens the first and third. He knows his own dice, guesses two-thirds of a die per face under yours, calls when a bid outruns that, and raises his best face.
- **The check.** Once a game, when the heavy has bid, read his face (Wits 15; Sathi +2, Brask +1, Haddat +1, the sergeant +1). Made: you know whether his bid stands. "Yes, but": you know, and he saw you looking ("Staring's a bid, at this fire"): this time you must bid.
- **Pays.** Won: the pot's scrapings and a biscuit out of his pack, **Rations +1** (`S.f.b9_helmPaid`).
- **Offered.** Phase 1 and phase 3 (both nights at the dung-fire). Not the day's march.
- **Tone.** Hunger said plainly and briefly (the pot, a biscuit in a rag, belts on the same hole). Nothing lurid.

## 5. Knife in the Dirt (Ch7, the Third, `b9_c7_fire`)

- **What it is.** In the retreat camp, days after, a heavy from the next fire brings a knife and smooths a patch of dirt. Five throws, each harder: off the palm, the back of the hand, the fist, the elbow, over the shoulder. The knife turns; tap as the point comes round to the ground (the window narrows each throw). Stick it and go on; miss and that is your count. Then the heavy throws his (92%, 80%, 66%, 50%, 34%). Most stuck wins; level is no one's.
- **The check.** Once a game, before a throw, find soft ground (Wits 15; Tegra +2, Brask +1, Sathi +1, the sergeant +1). Made: twice the room, next throw. "Yes, but": twice the room, and the heavy throws on the same soft patch, so his next is sure.
- **Pays.** Won: **+1 regard** to whichever squadmate walking has the lowest regard ("the one who needed the evening most"); with nobody else walking, Rations +1 (`S.f.b9_knifePaid` = who, or `'ration'`).
- **Offered.** Phase 4 only (the retreat camp). Never phase 1 (the brew-fire before the mortal fight) or phases 2–3 (no fire in the dark or on the trail).
- **Claude's call:** the "days after" game is a quiet one. The fallen are the gaps in the tents and the wider-spaced fires; the heavy's brother is mentioned and left alone. Nothing in it names who died.

## No game in Chapters 3 and 6

Claude's call. Ch 3's fire is a fever-fire, with the sick in blankets beside it; Ch 6 is the battle's day. Five fires over both squads: three for the Third (1, 5, 7), two for the Letherii (2, 4).

## Rations

At most +1 a game and four of the five pay Rations, so a squad can gain +2 from the tables over the book (the Third from Ch 1 and Ch 5, the Letherii from Ch 2 and Ch 4). This sits outside the chapters' own moves and their one "yes, but" each; the brief's ranges in "Where Rations move" move up by at most one at those chapters.

## Art

Drawn on the canvas in the same file: the yard by day with the beam scale tilting to the last weighing; the muster ground at evening with the bread-board canal; the wagon ring at dusk with Yelt's lamp and the call written large; the dung-fire under the stars with two helmets and the dice; the retreat camp with gaps in the tents and the knife turning over its window. Figures: `b2soldier` (the quartermaster, the heavies), `b9_c2_saffa`, `b5_c1_clerk` (Yelt), `sgt`, and whichever squadmate walks. Book Six's `b6gNight` draws the skies, Book Seven's `b7gFire` and `b7gDie` the fires and dice. Motion is held to the game (the knife, the dice, the calls).

## Tests

`tools/b9games_test.mjs` covers, for each game: the right squad playing that chapter; the offer right after the squad's talk with "Not now" last, and "Not now" back to the map; a full win, its pay and after-node; the check as it rolls; a forced "yes, but" and its cost; a loss that pays nothing; leaving early; not offered again; the pay hook not paying twice; the phases where it is not offered; the Witness unchanged; phone width (412); no game at Ch 3's or Ch 6's fire; the Deeds rows, the journal lines, and the after-nodes rendering cleanly every way (no leaks, no never-names, no "!" in narration, no rounds or turns). Screenshots go to `/tmp/claude-0/shots/b9/games/`.
