Wed Oct 21, 2026, 6:39 AM PDT. Book Four, the seven "Through the Deck" visions (`src/78_b4_visions.js`, art `src/78b_b4_visions_art.js`, test `tools/b4visions_test.mjs`), against v7.0.0 on `b4-vis` (not shipped).

# Book Four visions notes

Built on Book Three's pattern (68, 68b, b3visions_test): `VISIONS.b4v1`…`b4v7`, `book:'hoc', ch:n`, one per chapter for any card but the blank (the two Chains cards included). 36b picks them up by book; nothing needs registering in 90. Each ends on the reader's step (`b4vEnd`: `sp`/`fig` getters and a `txt` function of `visReader()`), so 36b's replay line still matches.

## The seven (hoc-canon §12)

| Ch | id | Viewpoint, where | Stops before | Words-only flags |
|---|---|---|---|---|
| 1 | b4v1 | Trull Sengar, the Nascent: chained in the wall, the sea at his waist; Onrack, passing, stops; Trull: "I was once among enemies"; Onrack cuts the chains and carries him along the wall | why he was Shorned (the cut hair is shown; "a word for that" is never said) | `b4v1_call` call/still, `b4v1_said` plain/light |
| 2 | b4v2 | Lostara Yil, the Imperial Warren: ash, the pit, the crucified dragon, otataral (Pearl's warren dies), the eye opens; Olar Shayn's head on a ledge in a patch of sun | the dragon's name and story (Pearl has no answer); anything of Pearl's or the Claw's business (he names the head and says nothing more) | `b4v2_ask` ask/look, `b4v2_stay` go/stay |
| 3 | b4v3 | Karsa Orlong, the Jhag Odhan: the herd answers the blood-oil; the young dun stallion with the white mane; "Havok" | his destiny; Icarium (not even a presence: none) | `b4v3_stand` stand/sword, `b4v3_speak` speak/silent |
| 4 | b4v4 | Leoman, outside the Malazan camp: the ring of wagons, two hundred riders, lamps on cords, a dozen wagons burning, half the column's horse drawn off "as he meant", dawn | Y'Ghatan; Corabb is not named | `b4v4_order` back/heard, `b4v4_lead` far/scatter |
| 5 | b4v5 | Heboric, Raraku: given something to smoke; the jade giants "perfect and sexless", "screaming terrified mouths", following "a god that fell"; Treach; wakes with stripes and jade hands | his road out; the fallen god is never named | `b4v5_reach` reach/turn, `b4v5_tiger` younger/want |
| 6 | b4v6 | Sha'ik, her tent on the last night: the predecessor's armour and the visored helm with chain over the slits; "her sister", once, as a face in a doorway; she puts it on, light as it was made; asks whether she has a choice | the walk down the hill. Never "Felisin", never the Adjunct, nothing ties the sister to the army (rule 22; the test checks it) | `b4v6_touch` touch/leave, `b4v6_visor` down/up |
| 7 | b4v7 | Gamet, the ramps: wakes armoured among the dead (old Malazan armour, Wickans, desert people); the Burned Tears' riders and the dark-skinned, blue-eyed woman; Grub: "Up the main ramp, Fist"; goodbye to the Adjunct (her lamp); sound a league off; butterflies over the trenches; they ride down | what the dead do (one line: it "belongs to the dead"); the Dogslayers are not named; Grub is a small boy and nothing more | `b4v7_ask` how/go, `b4v7_bye` aloud/quiet |

## Readers

Marrow ("Marrow lets the card go", calls the sergeant "child"), Tallow ("Tallow puts the card face down", his grandmother's sayings), the old soldier of the 9th ("The old soldier lets the card go", his rum cup). Each closer is set at that chapter's reading place (the yard, the Way, the feast, the Seti fire, the Wall, the picket, the coral). Ch 5's closers tie the tiger to the sergeant's god (Treach, hoc-canon §13). No reader lays or names a Chains card.

## Art (78b)

- Reused: `lostara`, `leoman`, `toblakai`, `heboric`, `shaik` (56), `marrow` (47b), `tallow` (70d), `b4_c3_khundryl` (73b), `b4_c4_grub` (74b), `b2soldier`.
- New figures: `b4v_trull`, `b4v_onrack`, `b4v_pearl`, `b4v_havok`, `b4v_heboric_jade` (stripes and jade hands, the waking step), `b4v_shaik_armour` (the last two steps of b4v6), `b4v_gamet`, `b4v_tearswoman`, `b4v_oldninth` (the third reader).
- Backdrops: `b4v_nascent`, `b4v_impwarren` (new, not Book Two's, which draws Kalam's party), `b4v_jhag`, `b4v_camp`, `b4v_raraku_dream`, `b4v_tent`, `b4v_ramps`, and `b4deck` (the reader, by chapter).
- b4v1's narrative steps and b4v3's last step draw their figures in the backdrop (`fig:''`), so the sea can come up over Trull and Karsa can sit on Havok.
- Contact sheets: `/tmp/claude-0/shots/b4/visions/b4v1.png`…`b4v7.png`, phone pages `b4v3_phone.png`, `b4v7_phone.png`.

## Claude's calls

- **Onrack "about to pass"** is read as about to walk past along the wall, not as about to fall to dust.
- **Trull's line.** Both choices keep "I was once among enemies"; Onrack answers "And now among stones. I too." Nothing of who cut his hair or why.
- **Otataral.** Lostara recognises it by what it does to Pearl's warren, not from any past of her own.
- **Gamet's dead.** The sheet's "Wickans and Malazans" are shown as old Malazan armour and Wickan braids; Pormqual's crucified soldiers (W *Gamet*) are left out, as too dark for a headline.
- **Icarium** is left out of b4v3 entirely ("at most a presence").
- **The Chapter 7 reading.** The vision is reached from `b4_c7_deck` / `b4_c7_card`. Until Chapter 7 is merged, the test stands those nodes in with 70c's `b4DeckOffer(7)` / `b4DeckCard(7)`. Once it lands, the stand-in is skipped.

## Open, for David's copy

- Ch 6 (W6): Trull's exact words to Onrack, and whether Onrack cuts or breaks the chains.
- Ch 12 (W12): whether Pearl says Olar Shayn's name aloud.
- Ch 17 (W17): Havok's coat colour (written as dun, with the white mane the sheet gives).
- Ch 25 (R25): whether Gamet says his goodbye aloud. The choice covers both.
