Thu Nov 5, 2026 · v10.0.0, not shipped (the games pass for Book Seven, *Unwitnessed*, on branch `book7`)

# Book Seven: the games at the fires

All five live in `src/129_b7_games.js`. Like Book Six's `109`, that file wraps the chapters' fire nodes, so the chapter files `121`–`127` stay untouched. Each game:

- is offered at its chapter's fire, straight after "Talk with the squad." The fire keeps its own choices (the reading, the rest, the roster, the way on, "Not now"), so a game can always be passed by;
- opens on the tables' frame from 36 (`mgOpen`, `mgPanel`, `mgKeys`, `MG.anim`). It is one screen, phone width, played by tapping, with keys as well;
- has one check inside it, made with Book Five's in-game roller (`b5gRoll`, through `b7gRoll`). A made check helps. A "yes, but" (near) helps and costs something that fits the scene. A failed check helps nothing;
- is played once a book. The fire stops offering it once it has finished, win or lose. Leaving early pays nothing, and the game can be come back to. The exception is Ships: leaving partway through a game loses that game's stake, and the dice are then done (Book Six's Bones rule);
- pays once, as the table closes, through its `b7*Pay` hook and a `S.f.b7_*Paid` guard (the two silver games settle at the table, with a net cap in `S.f.b7_shipsNet` / `S.f.b7_wagerNet`);
- keeps its deeds on `S.deeds` (`b7ShipsWon/Lost`, `b7DebtWon/Lost`, `b7FuseWon/Lost`, `b7HorseWon/Lost`, `b7WagerWon/Lost`). The Deeds page shows them under the Rising in an "At the fires" block (a wrap of `b7DeedsExtra`). Each game also gets an after-node (`b7_cK_<game>_after`) and a journal line.

New names: none. Everyone is unnamed by role ("the marine", "the company clerk" (Book Five's), "the sapper", "the coper", "the Rat Catcher") or a character already in the book.

## 1. Ships (Ch1, the Third, `b7_c1_fire`)

- **What it is.** In the lee of the dune a squad of marines has a shield face up on the sand and five dice, while the transports burn at their anchors below. Ship, captain and crew: in three throws set aside a six (the ship), then a five (the captain), then a four (the crew), in that order. The two dice left are the cargo, and with throws left you may throw the cargo again. No crew by the third throw and you are sunk (nothing). The marine throws first; the higher cargo takes the stake, 1 to 3 silver; a tie is a push.
- **The check.** Once a sitting, sunk after the third throw, you may say a die went in the sand (Guile 13; Sathi +2 if she walks, Tangle +1, the sergeant +1). Made: one more throw. "Yes, but": one more throw, and a silver for the marine's rum ("we burned the rum with the boats").
- **Pays.** Silver, net capped at 10 over the book, settled as the shield is picked up. A loss costs what was staked.
- **Offered.** Phase 2 only (the first halt above the beach, the ships burning), while the squad has a silver.
- **Claude's call:** silver, because a dice game among soldiers is where money is the scene. The ships are seen only as distant fires on the water, per the brief's art rule.

## 2. Pass the Debt (Ch2, the Letherii, `b7_c2_fire`)

- **What it is.** The company clerk (Book Five's, Indebted himself) brings a bag of clay debt-tokens and the only dock on the bench (coin is short this year, rg-canon §3). Five debts, one at a time, each starting at 1. Whoever holds a debt takes it onto the tally, or passes it: it doubles and the dock is spun. Face up, the other side has it to take or pass; face down, it comes back and the passer takes it, doubled. A debt of 8 can't be passed. Lowest tally after five wins; a tie is the clerk's.
- **The check.** Once a game, pass and spin the dock yourself (Guile 13; Tobet +2, Ilsa +1, the sergeant +1). Made: face up. "Yes, but": face up, and the clerk puts a token on your tally for the cheek. Failed: it rolls under the bench and comes up face down.
- **Pays.** Once a book, on a win: the clerk "misses a line" on the night roll he copies for the grey coats, `b7Filed(-1)`. If the file is empty, Perrit +1 loyalty if she walks; otherwise a salve. No docks move. Debt stays flavour: no `b5Owe`, `b5Pay` or `b5Forgive`.
- **Offered.** Phase 1 (the yard brazier) and phase 5 on (home again); not in the streets or the grey morning.
- **Claude's calls:** the clerk copying the company roll for the Patriotists is an invention in the margin (the Sixth is watched, the brief says). The file move is the book's own coin. It is one page, the limit the brief sets for a "yes, but", and it only ever lowers the heat.

## 3. The Fuse-Count (Ch3, the Third, `b7_c3_fire`)

- **What it is.** The column lights nothing, so a marine sapper from the next squad lights a length of fuse on the hearthstone and puts a helmet over it. He names the length (a four- to seven-count). You count in your head and call "now" when you think it has burned out; he calls too; the helmet comes up, and the nearer call takes the round. First to two. A count is one second at normal speed, scaled by the speed setting.
- **The check.** Before a fuse is lit, once a game, notch it at the half (Wits 13; Tangle +2, Rasp +1, the sergeant +1). Made: it spits as the burn passes the notch, a wink at the helmet's rim and a click, so you have the half. "Yes, but": it spits, and the sapper knows the Kanese trick and counts by it too (his error is halved that round).
- **Pays.** Once a book, on a win: +1 burner, the sapper's stake ("Marines don't share. Marines pay their bets.").
- **Offered.** Phase 1 (the farmhouse floor) and phase 4 on (the factor's barn by day); not on the march or before the counting room.
- **Claude's call:** a munition, because the stake is the marines' issue, which Chapter 1 says they won't share.

## 4. The Horse-Trade (Ch4, the Letherii, `b7_c4_fire`)

- **What it is.** At the horse lines below Kravos Hill an old Bluerose horse-coper is selling the last remounts the cavalry left. The Finadd has given the squad 60 docks of the company's money for three pack horses. For each horse he names a price; you offer (four offers under his price) or pay it. At or above his hidden floor he takes it. Under it he comes down a third of the gap (never below the floor) and loses one of three patience; out of patience, his price is his last. Three horses within the purse wins.
- **The check.** Once a game, look in a horse's mouth (Wits 13; Sorvan +2, Ruuk +1, Tobet +1, the sergeant +1). Made: his floor on that horse is shown. "Yes, but": shown, and he takes it ill ("they are Bluerose horses"): one patience less.
- **Pays.** Once a book, on a win: Sorvan +1 loyalty if he walks; otherwise a pot of the coper's liniment (+1 salve). No coin moves: the purse is the company's.
- **Offered.** Phase 1 (the tent fire) and phase 3 (the night at the horse lines); not at the muster gate or at dawn.
- **Claude's call:** the horses are the company's errand, so the coin is Sorvan's regard. He joins at this muster, and this is his country's trade.

## 5. The Rat Catchers' Wager (Ch7, the Third, `b7_c7_fire`)

- **What it is.** At the corner brazier on the city's last day a man with a slate says he is a Rat Catcher. The guild is canon (outlawed, W3), he has no name, and he takes no one to the guild's tunnels. His book is not on *who* the new king is ("nobody alive could give you odds on who"). It is on the word the crowd will shout for him. Six words on the slate, with odds: King, Emperor, Liberator, Saviour, Free Lether, the Errant. Three gusts come over the roofs from the crowd two streets off. After each one you hear a piece of a word (truer as the crowd gathers: 40%, 65%, 90%), the odds move (halved for the words it fits, one longer for the rest), and you may chalk one marker, a silver, at the odds of that moment. Then the crowd gives its word, as the Third hears it from this corner, and markers on it pay their odds.
- **Canon.** The crowd's word is always **Saviour** or **Emperor**, the two words the crowd shouts (rg-canon §2; R24.2; Chapter 7's own scene). Which one carries to this corner first is chance. The game never says who the crowd is shouting for, or who pays the shouters. The nearest it comes is that the Rat Catcher "does not look as though the book has hurt him."
- **The check.** Once a game, get up on the wall to listen (Wits 13; Wenna +2, Marrow +1, the sergeant +1). Made: the next gust is heard plain (the fuller piece of the true word). "Yes, but": plain, and the Rat Catcher saw the climb and shortens every word by one.
- **Pays.** Silver, net capped at 8 over the book, settled as the slate is wiped. Leaving before the word: the stakes come back, nothing is paid, and the slate is offered again.
- **Offered.** Phase 3 only, before the surrender is seen (`!S.f.b7_c7_view`), while the squad has a silver.
- **Claude's call:** silver, because it is a wager and money is the scene. The Third pays in Malazan coin ("it will be worth something tomorrow, whoever's face is on ours"), which ties to the blank coin of Chapter 7.

## Art

Everything is drawn on the canvas in the same file, using the shelf's figures: `b2soldier` for the marines and the sapper, `b5_c1_clerk` for the clerk, `b5_c5_refugee` for the coper and the Rat Catcher, and the squad's own (`sgt`, `tangle`, `sorvan`, `wenna`). Book Four's `B4VB.horse` draws the remounts (guarded), a plain die (`b7gDie`) the dice, and Book Six's `b6gNight` the skies. Every table holds still under `REDUCE()`.

## Tests

`tools/b7games_test.mjs` covers, for each game:

- the offer at its fire, beside the squad's talk, with the rest and "Not now" still there, and "Not now" taken back to the map;
- a full win through the panel and keys, with its pay and after-node;
- the check, whatever tier it rolls;
- a forced "yes, but" and its cost;
- a loss that pays nothing;
- not being offered again once finished, and the pay hook not paying twice;
- the other coin (the file, the salve) where it applies;
- the phases where the game isn't there;
- leaving early (Ships, the Wager);
- that the Wager names nobody;
- fitting a 412px screen, the Deeds rows, the journal lines, and the after-nodes rendering cleanly every way.

Screenshots go to `/tmp/claude-0/shots/b7/games/`.
