Thu Nov 5, 2026 · v9.1.0 (the games pass for Book Six, *Bones in the Walls*)

# Book Six: the games at the fires

All five live in `src/109_b6_games.js`. Like Books Four (79) and Five (89), that file wraps the chapters' fire nodes, so the chapter files `101`–`107` stay untouched. Each game:

- is offered at its chapter's fire, straight after "Talk with the squad." The fire keeps its own choices (the rest, the fever, the roster, the way on, "Not now"), so a game can always be passed by;
- opens on the tables' frame from 36 (`mgOpen`, `mgPanel`, `mgKeys`, `MG.anim`). It is one screen, phone width, played by tapping, with keys as well;
- has one check inside it, made with Book Five's in-game roller (`b5gRoll`, through `b6gRoll`). A made check helps. A "yes, but" (near) helps and costs something that fits the scene. A failed check helps nothing;
- is played once a book. The fire stops offering it once it has finished, win or lose. Leaving early pays nothing, and the game can be come back to. The one exception is Bones: leaving partway through a game loses that game's stake, and the blanket is then done;
- pays once, as the table closes, through its `b6*Pay` hook and a `S.f.b6_*Paid` guard;
- keeps its deeds on `S.deeds` (`b6BonesWon/Lost`, `b6TideWon/Lost`, `b6NextWon/Lost`, `b6JettyWon/Lost`, `b6SignsWon/Lost/All`). The Deeds page shows them under Fever in an "At the fires" block (a wrap of `b6DeedsExtra`). Each game also gets an after-node (`b6_cK_<game>_after`) and a journal line.

New names: none. Everyone is unnamed ("the recruit", "the recruits' corporal", "the Falari", "the corporal", "the next squad's sergeant", "a Grey Helm") or a character already in the book (Brannoc, Sweetcreek by name only, Ottar, the squads).

## 1. Bones, with the new draft (Ch1, the Third, `b6_c1_fire`)

- **What it is.** A draft of recruits out of Aren has joined the 9th on the march, and the recruits have brought bones. The rules are Book One's: two bones, throw as often as you like and bank when you are scared. A skull wipes the throw. Two skulls ("Hood's eyes") wipe your bank. A pair that isn't skulls counts double. First to 25 takes the stake, 1 to 3 silver, and you can play another game while you have silver. The backdrop shows the Odhan in phase 1, Y'Ghatan's walls from phase 3.
- **The check.** Once a sitting, after a single skull that cost 6 or more, you may call the bone cocked (Guile 13; Sathi +2, Tangle +1, the sergeant +1). Made: the lost points come back and you throw again. "Yes, but": they come back, and the recruits' corporal takes a silver for the argument.
- **Pays.** Silver, net capped at 10 over the book, settled as the blanket is rolled up. A loss costs what was staked.
- **Offered.** At any phase while the squad has a silver (`!S.f.b6_bones`).
- **Claude's call:** silver, because a dice blanket is the one place in the Fourteenth where money is the scene. The cap is lower than Book Five's 15 because Book Six spends very little silver.

## 2. Falari Tide (Ch2, the Fourth, `b6_c2_fire`)

- **What it is.** A red-bearded corporal of Sweetcreek's Falari has three dice and a tide-table scratched on a plank. He throws three (and throws his lowest again once if he is under ten). Then you throw three, and you may bail one die (throw it again) once a round. Higher total takes the round. Three alike is a full tide and beats any total. A tie is the sea's, "and the sea is Falari". First to three rounds.
- **The check.** Once a game you may throw the Falari way, off the wrist (Guile 13; Brannoc +2, Kettle +1, the sergeant +1). Made: all three of your dice go again. "Yes, but": all three go again, and the Falari takes a point on his total for the cheek. Failed: the dice go into the dark and the round is his.
- **Pays.** Once a book, on a match win: Brannoc +1 loyalty if he walks; otherwise a pot of Falari seal fat "for the rain" (+1 salve). A loss costs nothing.
- **Offered.** Phase 1 only (the camp above the sea), and not once the match is done.
- **Claude's call:** no silver. The Falari play for pride, and the game says Sweetcreek has ordered that they don't dice for money with the Seventh. Brannoc is loaned from her command, so his regard is the natural coin.

## 3. Who's Next (Ch4, the Fourth, `b6_c4_fire`)

- **What it is.** Under the oiled canvas the Seventh keeps a chalk board: the company's six squads down the side, a tally of the details each has drawn, and WHO'S NEXT across the top. The corporal draws each detail by lot from a helmet. A squad with fewer tallies has more stones in it ("that's fair, the captain says"). There are three draws: the water detail, the bedding pits, the night picket on the city side. Before each draw you chalk a mark against a squad. Two of three right and the corporal owes you.
- **Tone.** Headline only, and dry. It is a board of details, never of names, and nobody on it is sick. The narration says "It is not about the fever. Everybody agrees about that, loudly." When Ressa walks, her line is about the dyers drawing lots for the vats, nothing worse.
- **The check.** Once a game you may count the stones by their clatter (Wits 13; Kettle +2, Ressa +1, the sergeant +1). Made: the board shows each squad's stones for the rest of the game. "Yes, but": they show, and the corporal drops two more stones for the Fourth into the helmet, "since you're so interested".
- **Pays.** Once a book, on a win: one fevered squadmate's fever breaks, from "a surgeon's draught the corporal was owed" (through `b6Cure`). If nobody has the fever, +1 salve.
- **Offered.** Phase 1 only (the camp in the rain, before the picket).
- **Claude's call:** an easing of Fever, because Fever is Book Six's own engine and this chapter is the plague camp. It is a single cure, and Chapter 4's morning cures everyone anyway, so it changes little except in an unlucky run.

## 4. The Jetty Race (Ch5, the Third, `b6_c5_fire`)

- **What it is.** The engineers have run timber jetties out past the surf, and the 9th loads its own longboats for Nok's transports. The next squad down has bet the Third a clay sharper that it fills its boat with eight crates first. The longboat rises and falls against the jetty, and the gunwale lights up when it is level. Swing a crate down then (tap the button or the boat) and it goes in. Too soon or too late and it goes in the sea, and the line takes a moment to come back. The other squad loads at a steady pace.
- **The check.** Before the race you may rig the yard for two (Wits 13; Tangle +2, Haddat +1, the sergeant +1). Made: your first three lifts carry two crates. "Yes, but": the same, but the test lift snaps a lashing and a crate goes in the sea.
- **Pays.** Once a book, on a win: +1 sharper, the wager.
- **Offered.** At the dune fire until the morning the Third goes aboard (`!S.f.b6_c5_survivors`).
- **Claude's call:** a munition, because the wager is in clay and munitions are the Third's currency.

## 5. The Grey Helms' Signs (Ch7, the Third at sea, `b6_c7_fire`)

- **What it is.** At the cook's sandbox the Grey Helms show the hand-signs their shield-line uses when the noise is too great for orders: Shield (a fist raised), Wolf (two fingers hooked), Close (the flat hand drawn in) and Hold (the open palm out). A Grey Helm gives a run of signs and you give it back in order. There are four runs, of three, four, five and six signs. One wrong sign and he lowers his hands. The shape is Book Three's Moranth Hand-Talk.
- **The check.** Once a game you may ask for a run again, slower (Wits 13; Ottar +2, Mehet +1, the sergeant +1). Made: he gives it again. "Yes, but": he gives it again with one more sign on the end, "the Perish do not repeat themselves for nothing".
- **Pays.** Once a book, for three runs or more given back: Ottar +1 loyalty if he walks; otherwise a jar of Perish salve with a wolf pressed into the wax (+1 salve).
- **Offered.** At sea only: after the grey ships come (`S.f.b6_c7_perish`), phases 2 and 3, not ashore at Malaz.
- **Claude's calls:** the four signs and their meanings are invented for the game and make no canon claim beyond the Grey Helms being a disciplined shield-line. Ottar's regard is the coin because the game is the Perish teaching the squad their ways.

## Art

Everything is drawn on the canvas in the same file, using the shelf's figures: `b2soldier` for the recruits and the corporal, `brannoc` for the Falari, `ottar` for the Grey Helms, and the squad's own figures on the jetty. Book One's `drawBone` draws the bones, and a red-pipped die (`b6gDie`) the Falari dice. Every table holds still under `REDUCE()`.

## Tests

`tools/b6games_test.mjs` covers, for each game:

- the offer at its fire, beside the squad's talk, with the rest and "Not now" still there, and "Not now" taken back to the map;
- a full win through the panel and keys, with its pay and after-node;
- the check, whatever tier it rolls;
- a forced "yes, but" and its cost;
- a loss that pays nothing;
- not being offered again once finished, and the pay hook not paying twice;
- the coin used when the recruit isn't walking;
- the phases where the game isn't there;
- leaving early (Bones);
- fitting a 412px screen, the Deeds rows, the journal lines, and the after-nodes rendering cleanly both ways.

Screenshots go to `/tmp/claude-0/shots/b6/games/`.
