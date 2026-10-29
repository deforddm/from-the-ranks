Thu Oct 29, 2026, 12:44 PM PDT. Book Five, the seven "Through the Tiles" visions (`src/88_b5_visions.js`, art `src/88b_b5_visions_art.js`, test `tools/b5visions_test.mjs`), on `book5` against v7.4.1 (Book Five, v8.0.0, not shipped).

# Book Five visions notes

Built on Book Four's pattern (78, 78b, b4visions_test): `VISIONS.b5v1` to `b5v7`, `book:'mt', ch:n`, one per chapter for any tile. 36b picks them up by book, and 21's tile screen offers "✦ Look into the tile" whenever `visionFor` finds one, so no chapter file changed. Each vision comes back to `b5_c<n>_card` (36b's `cardNodeName`). Each ends on the reader's step (`b5vEnd`: `sp`/`fig` getters and a `txt` function of `visReader()`), so 36b's replay line still matches.

**One engine fix in 36b:** the journal replay's closing line said "lets the card go" and fell back to "The Deck of Dragons" in every book. In Book Five it now says "lets the tile go" and "The Tiles of the Holds" (guarded by `visTiles()`; the other books are unchanged).

## The seven (mt-canon §12)

| Ch | id | Viewpoint, where | Stops before | Words-only flags |
|---|---|---|---|---|
| 1 | b5v1 | Trull Sengar, in the Warlock King's longboat on Calach Bay, Fear beside him: four longboats, about four hundred warriors, the wraiths; fog and no wind; the seal-hunters' slack sails; Mosag's hand falls, a swell passes under the boat; the screaming, then silence; the burned ships turned south under wraiths | what Mosag summoned: never seen, named or described (a swell under the boat, nothing more) | `b5v1_look` ships/fear, `b5v1_ears` cover/hold |
| 2 | b5v2 | Kuru Qan in the Cedance, through the tile that answers Tarancede Tower: a sunny afternoon in Trate, three ships, the pilot scow backing off, shapes in the rigging, the bell, the sea rising, the wave | any name for the spirit ("something old, and bound, and hungry"); the toll (he will read it in the reports) | `b5v2_look` ships/harbour, `b5v2_reach` reach/still |
| 3 | b5v3 | Yan Tovis on the wall at Fent Reach: First Maiden's garrison with hers; 5,000 landed at First Maiden Fort; the sails; the dark water under them; a third fleet off the coast toward Trate; her sum, three hundred thousand; she strikes the colours | her blood, the Shake, "Twilight" (none of it appears; the test checks) | `b5v3_count` count/send, `b5v3_ask` ask/alone |
| 4 | b5v4 | Nekal Bara at the top of the Trate lighthouse: her theory (a creature bonded to the Edur), Arahathan on the harbour wall to draw it, her strike, the mistake (a spirit Trate once worshipped and forgot), she calls the Ceda's name, the sea comes up, the lamp goes out, the fleet comes in | nothing (her death is canon); shown as the lamp going out | `b5v4_start` now/wait, `b5v4_strike` all/keep |
| 5 | b5v5 | Moroch Nevath on the road south: the torn tendon, the messenger's words ("as had the entire frontier"), the column of the disarmed, the burned farms, men asking him what to do, the gates of Letheras | anything of the Errant (the word never appears; the test checks) | `b5v5_stick` stick/none, `b5v5_tell` report/home |
| 6 | b5v6 | Preda Unnutal Hebaz ("she", taller than most women, fair, her fortieth year) with the King's Battalion at Brans Keep: the corner towers, the wraiths spent first, white fire, the pillars rising, both towers falling, the pillars leaning; she draws her sword and says "Hold"; far out on the right the Whitefinders still fighting | her death (no word of it; the test checks) | `b5v6_order` volley/wait, `b5v6_runner` send/watch |
| 7 | b5v7 | Moroch Nevath, Finadd, on the principal bridge over Main Canal (unnamed), seventy-three soldiers in a shield wall behind him; the Emperor in his coat of coins; the soldiers shout "the King's Champion"; the stories that he comes back; Moroch steps out and gives his challenge; the Emperor comes on | the duel itself and its end; nothing of Rhulad's sword (the test checks); the Emperor is never named | `b5v7_shout` let/quiet, `b5v7_step` alone/order |

## Readers

Perrit ("Perrit turns the tile face down"), the tile-woman ("The tile-woman puts her hand over the tile", and spits to one side, for manners). Each closer is set at that chapter's reading place (`B5READ[n]`): the barracks yard, the quay at Trate, the barge at Kraig's Landing, the rampart at High Fort, the ash road, the shield on the grass at Brans Keep, the barricade by the Quillas Canal (where Perrit puts the dock and the knife back on the tile). Perrit's closers make a small arc: in Chapter 1 the school says the tiles show what is, not what will be; at Brans Keep and on the last night they show what will be.

## Art (88b)

- Reused: `perrit` (80d), `b5_c1_tilewoman` (81b), `b5_edur`, `b5_wraith`, `b5_letherii` (80d), the helpers `B4VB` (78b) and `B3VB` (68b).
- New figures: `b5v_trull` (long hair braided back, a spear: never shorn, rule 35), `b5v_kuruqan`, `b5v_yantovis`, `b5v_nekal`, `b5v_moroch` (a bound leg and a hedge-stick on the road south; sword and helm on the bridge), `b5v_preda` (her sword raised on the last step), `b5v_emperor` (small, far off, coins catching the light, no sword drawn).
- Backdrops: `b5v_calach`, `b5v_cedance` (the harbour inside one lit tile of the floor), `b5v_fent`, `b5v_lighthouse`, `b5v_road`, `b5v_brans`, `b5v_bridge`, and `b5tiles` (the reader, by chapter: black stone tile for Perrit, bone for the tile-woman).
- Headline only: the thing under the longboat is a swell; the wave is a wall of water inside a tile; the sea spirit is the sea rising, faceless; the pillars are turning columns of dark.

## The shelf pieces

- Glossary rows (80 and each chapter), journal lines (each chapter, and the debt line in 80) and the Deeds "Debt" section (80's `b5DeedsExtra`) were already in place; nothing said "coming". No change.
- **Where the books meet** (38b): Book Five's paragraph was there. Added a line that Book Five stands apart, and Lether's place on `worldSVG`: the sketch's left edge widens (only once Book Five is on the shelf) to show a strip of Lether's coast and Letheras, beyond a dotted line marked "oceans away · years before". David's rule from Oct 27 (keep it current with every book).
- **The title credit** (`titleCredit`, 29) is built from the shelf: with five books it reads "Five books so far, each beside one of Erikson's Malazan novels, in order, from Gardens of the Moon to Midnight Tides, with more to come." Checked; no change.

## Claude's calls

- **The time of the wave.** The brief said "at day's end"; the canon sheet has the wave in daylight (W6: the sun warmed the spirit; Q20b) [H]. Written as a sunny afternoon.
- **Trull's place.** In the Warlock King's own longboat, with Fear, as W3 has it (checked Oct 29: "four K'orthan longboats", "about four hundred warriors", the magical fog, no wind, the Edur covering their ears at the screams, the ships "burned out and wallowing", sailed home by wraiths).
- **Kuru Qan's look.** W gives none. Drawn and written as a small old man in a worn robe and skullcap, hands in his sleeves. His lenses (memory) are left out until a page confirms them.
- **The Cedance tile.** W6 says he watches "through the tiles of the Cedance"; W *Tarancede Tower* that the tower's tiles are linked to his chamber. The vision joins the two: one tile of the floor answers the tower.
- **Nekal Bara's last act.** W16: she calls out to the Ceda before she dies. Written as the cadre's "long cold thread" to the Cedance, which is Claude's picture of how a cadre mage reaches the Ceda. Iron Bars's version (the fleet waited for the wraiths to kill the two mages) is left out; the spirit kills her, as the sheet has it. Night is Claude's call (W gives no time).
- **Yan Tovis.** W15 has her "on the coast"; the sheet's wall and counting sails are kept. Her officers and the third fleet's rider are Claude's. "Twilight" is never used.
- **The Emperor's coins.** From memory of MT (his body covered in coins), not on a page read for this sheet [M]. Kept, because it is how the city knows him.
- **The Preda's last step** ends on "Hold" and the Whitefinders still fighting on the right: the squad's battalion seen through canon eyes, and nothing after it.

## Open, for David's copy

- Ch 3 (W3): whether Trull is in Mosag's own boat or another of the four.
- Ch 6 (W6): where the Ceda watches from (the Cedance, or his tower), and whether anyone is with him.
- Ch 16 (W16): the hour of Nekal Bara's attack, and whether she calls the Ceda aloud.
- Ch 24 (HC p. 560): what Moroch says when he challenges, and whether his men's shout is "the King's Champion".
- Any book: Kuru Qan's lenses; Rhulad's coins.
