Thu Nov 5, 2026, 9:16 PM PST. Book Seven, the seven visions of *Unwitnessed* (`src/128_b7_visions.js`, art `src/128b_b7_visions_art.js`, test `tools/b7visions_test.mjs`), on `book7` against v9.1.0 (Book Seven not shipped).

# Book Seven visions notes

Built on Book Six's pattern (108/108b): `VISIONS.b7v1` to `b7v7`, `book:'rg', ch:n`, one per chapter, for any card or tile. 36b picks them up by book; 21's card screen offers "✦ Look into the card" (the tile, for the Letherii, through 120c's `CARDBOOK` wrap) whenever `visionFor` finds one. Each vision comes back to `b7_c<n>_card` (36b's `cardNodeName`, already `b7_c` for `rg`), whose one button goes to `B7READ[n].back`. No chapter file and no engine file changed.

**The readers.** 120c's `b7As` wraps `VISREADER`, so `visReader()` is the squad's own: the Third (Ch 1, 3, 5, 7) Marrow, else Tallow, else the old soldier (`oldninth`); the Letherii (Ch 2, 4, 6) Perrit, else the tile-woman. `visionFor` runs with `S.book = 'rg'` (unwrapped), so it finds `b7v<n>`; 36b's `visTiles()` already says "Through the Tiles" for `rg` with thread `l`. The closing step (`b7vEnd`) has a line for each reader and an `other` fallback, and opens the house way: "Marrow lets the card go", "Tallow puts the card face down", "The old soldier lets the card go", "Perrit turns the tile face down", "The tile-woman puts her hand over the tile … spits to one side, for manners". The `oldninth` closer in Ch 1 is the 9th's old soldier going back with the last pinnace; in Ch 3, 5 and 7 it is the old marine of the column (rg-ch3-notes' fudge, kept). Figures: `marrow`, `tallow`, `b4v_oldninth`, `perrit`, `b5_c1_tilewoman`.

## The seven (rg-canon §12, with its plan corrections)

| Ch | id | Viewpoint, where | Canon in it (source) | Stops before | Words-only flags |
|---|---|---|---|---|---|
| 1 | b7v1 | Keneb on the beach as the transports burn | Tavore's speech to her officers on the Froth Wolf, "unwitnessed" by the Empire but not by themselves (W13; T p. 357, 361) [H]; the transports burned, no way back (W13; T p. 358, 360) [H]; Hellian salvaging rum from a burning ship (W13) [1]; the squads' reversed sleep, a month on the ships, and Mockra camouflage and scent-masking (W13) [1]; Keneb's doubt of the Adjunct, his fear of "months", the order inland (W13) [1]; Faradan Sort takes Beak as her tracker of hidden squads (W13) [1] | Who ordered the burning (open, §15 Q7: written passive, "since the order was given"); the Adjunct's thoughts (rule 55) | `b7v1_rum` blind/count, `b7v1_beak` take/back |
| 2 | b7v2 | Tehol Beddict on his roof under the netting, Bugg naming the troubles | Summer come early (W5) [1]; the roof and the netting (W5, via the sheet) [1]; coin short across the empire (W1, W9) [H]; Patriotist arrests (W1) [1]; the Rat Catchers outlawed, gone below (W3, W11) [H]; champions off the Edur fleets fighting Rhulad and buried by the Azath (W3, W7) [1]; Bugg a builder and manservant (rule 32) | Who drained the treasury (rule 69: Tehol only says "how very strange"); Bugg as anything but a man with news (rule 56); Janath; "the new emperor" | `b7v2_ask` coin/champ, `b7v2_watch` ask/wave |
| 3 | b7v3 | Fiddler setting the Drum, Cuttle praying at the path's end | The Drum, Fiddler's cusser trap on a road (W17) [1]; Cuttle praying (W17, via the sheet) [1]; the night raids, the Letherii fighting beside the Edur, Sort's "will not work" (W17) [1]; Fiddler's "farmers and swineherds" (W14) [1]; Mockra on the squads (W13) [1] | The blast (the vision ends counting); the trap's mechanism (left as "a cord, a stake, a thing he does with his thumbs"); Hedge (rule 62) | `b7v3_pray` ask/leave, `b7v3_think` farm/road |
| 4 | b7v4 | Bruthen Trana walking the sea floor to the pillar with Brys's name | Bruthen turned away by the Chancellor (W3, W5, W7) [H]; Nisall dead in the Patriotists' keeping, Bruthen beats Karos and breaks Gnol's hand, "a war has begun" (W9) [1]; Mosag kills him to sanctify a temple (W15) [1]; the walk on the sea floor and Brys's name (W20; R24.2 S3) [H] | Who sent him (never Mael, rule 56; never the Errant, rule 57); Brys rising (the vision ends on the name; the city sees him back in Ch 7); Mosag's end and the demon (rule 68) | `b7v4_mem` karos/gnol, `b7v4_read` low/hand |
| 5 | b7v5 | Hellian in the tavern, the Edur coming out of the trees | Hellian and Urb's "liberation": officials, money-lenders and advocates killed, the people loot and flee and warn the marines in return (W21) [1]; hundreds of Edur closing on the tavern village (W21) [1]; Hellian and spiders (BH, the series) | The house-to-house fight and the cusser in the street; the darkest canon is "what the villagers wanted done", under a cloth | `b7v5_look` drink/spiders, `b7v5_order` wake/jug |
| 6 | b7v6 | Hanradi Khalag on the killing field: the wave off the ridge, then the silver dome | Hanradi's contempt for the Letherii at Kravos Hill, Sirryn bringing Gnol's orders (W20; T p. 616) [H]; the marines' circle, under a thousand (W22) [1]; the mages' ritual a week in the making, meant to kill the marines and the Edur together (W22) [1]; Beak's dome holds and he dies (W22; R24.1 S1) [H]; the Edur shelter in it; Fiddler's silent truce with Hanradi; the Edur walk home, renouncing empire (W22) [1] | Beak by name, and Hood receiving him (rule 63: "whoever held it is not holding it any more"); Sirryn by name (rule 35's neighbourhood: "the Patriotist lieutenant"); which Preda (open, §15 Q5) | `b7v6_call` back/on, `b7v6_truce` lower/nod |
| 7 | b7v7 | Lostara Yil beside the Adjunct after the river battle | The Letherii army marches to the river to meet the Adjunct's landing and shatters (W22) [1]; she lets her soldiers kill the broken, "she hardens them" (R24.1 S10) [1]; Blistig with the fleet up the river (W20; R24.1 S10) [H]; Banaschar with the Adjunct (W13) [1]; she marches at dawn (R24.1 S10) [1] | The Adjunct's thoughts (rule 55: Lostara's belief, "She thinks she knows"; the Adjunct speaks two lines); where she leads after "the city"; the Perish and Khundryl (rule 65); named Letherii units or a map of the battle (canon tells it after the fact, correction 2) | `b7v7_say` say/keep, `b7v7_ask` city/orders |

## Art (128b)

- New figures: `b7v_tehol` (in a blanket; `o.lie` lying in the roof bed through b7v2), `b7v_fiddler` (`o.kneel` in the road on b7v3's first three steps), `b7v_bruthen` (hair lifting in the water), `b7v_hellian` (a jug), `b7v_hanradi` (grey in his braids, a torc), `b7v_lostara` (Book Two's Pardu face and tattoos, a grey-green cloak, not the Red Blades' red). Reused: `keneb`, `b5_edur`, `b7_malregular`, `b2soldier`, `b5_letherii`.
- Backdrops: `b7v_beach`, `b7v_roof`, `b7v_road`, `b7v_seafloor`, `b7v_tavern`, `b7v_field`, `b7v_river`, and `b7deck` (the reader at each chapter's reading place, B7READ[n]: a card for the Third, a tile for the Letherii, obsidian for Perrit and bone for the tile-woman).
- Headline only: the hulls burn far out on the bay; the end table's cloth is a lump; the wave is a band of grey; Beak is never drawn, only the dome and then its absence; the river field is smoke and small figures. The pillar's names are scratches.
- Sheet: `/tmp/claude-0/-home-claude/c7cefdea-0715-51c5-a1c3-439672d89b23/scratchpad/b7_visions_sheet.png` (scratch, regenerable).

## Claude's calls

- **Keneb's beach is at night**, the squads moving by dark (W13's reversed sleep); the burning's order is passive (§15 Q7).
- **Hellian's companion in the water** is "a big silent corporal" (Urb unnamed at the beach; named in b7v5).
- **Beak** is "a slow-spoken man who can find every mage in the column in the dark". The RG candle image is left out (unchecked).
- **Bugg's list** is the sheet's sourced troubles; the netting's purpose (insects) is Claude's. Tehol never thinks about where the coin went.
- **The Drum's mechanism** is left unsaid; only the cusser, the sharpers and "a cord, a stake" are shown. Bottle is not named (his warren in RG unchecked): "the squad's mage".
- **Bruthen** comes from "the Edur villages in the north" (his tribe unchecked). He "knows the name" of Brys from the conquest, not from a meeting.
- **Hanradi leads his Edur north**, home (W22's "walk home"; the Edur homeland is north of Lether, `mt-canon`). His tribe is not named (unchecked).
- **The Malazan sergeant in the truce** is "grey in his beard", unnamed: Hanradi has no reason to know Fiddler's name.
- **Lostara's last thought** ("Not quite. Not after tomorrow.") is hers, a callback to the title; it closes nothing.

## Open, for David's copy

- RG ch 13: who gave the order to burn the transports (§15 Q7) and whether the beach scene is night.
- RG ch 20 / ch 24: what the pillar is that carries Brys's name, and whether Bruthen is "sent" (the vision never says by whom).
- RG ch 17: how the Drum is triggered, and whether Cuttle's prayer is at the path's end (the sheet's wording).
- RG ch 22: whether Hanradi's warriors were nearest the ring before the ritual (written so).
