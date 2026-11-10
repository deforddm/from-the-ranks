Mon Nov 9, 2026, 11:09 PM PST. Book Nine, the seven visions of *Dust on the Boots* (`src/168_b9_visions.js`, art `src/168b_b9_visions_art.js`, test `tools/b9visions_test.mjs`), on `book9` against the Book Nine engine (v12.0, not shipped; VERSION untouched).

# Book Nine visions notes

Built on Book Seven's two-squad pattern (128/128b) and Book Eight's house style (148/148b): `VISIONS.b9v1` to `b9v7`, `book:'dod', ch:n`, one per chapter, for any card or tile. 36b picks them up by book; 21's card screen offers "✦ Look into the card" (or the tile, for the Letherii) whenever `visionFor` finds one. Each vision comes back to `b9_c<n>_card` (36b's `cardNodeName`, `b9_c` for `dod`), whose one button goes to `B9READ[n].back` (Ch 7's is `b9_c7_lull`). No chapter or engine file changed.

**The readers.** 160c's `b9As` gives each squad its own chain: the Third (1, 3, 5, 7) Marrow, else Tallow, else the old marine; the Letherii (2, 4, 6) Perrit, else the tile-woman. The closing step (`b9vEnd`) has a line for each, plus an `other` fallback, and opens the house way: "Marrow lets the card go", "Tallow puts the card face down", "The old marine lets the card go", "Perrit turns the tile face down", "The tile-woman puts her hand over the tile". Figures: `marrow`, `tallow`, `b4v_oldninth`, `perrit`, `b5_c1_tilewoman`. The readers speak from the chapter's reading place (B9READ[n]).

**The old marine's name.** Book Four's `oldninth` is "The old soldier" (70). 168 wraps `VISREADER` so that in Book Nine only he is "The old marine" (`mid` "the old marine"). This change touches only words: the closing step's speaker, 36b's replay line and the journal. 160c already special-cases him the same way. Book Four's own name is unchanged, and the test checks it.

**"Her hands are cold"** closes only each squad's first and last vision, and only for the women readers: Marrow on 1 and 7, Perrit and the tile-woman on 2 and 6. That makes six in the book, against a cap of eight. Five readers × two would be ten, over the cap.

## The seven (dod-canon §9)

| Ch | id | Eyes, moment | Canon in it (source) | Stops before | Words-only flags |
|---|---|---|---|---|---|
| 1 | b9v1 | Fiddler dealing the Deck in Letheras, the night the barracks emptied | The barracks emptied ahead of it; Fiddler deals; Quick Ben gets the Magus of Dark; the Adjunct gets no card; the city overflows (dead things stir) (WC3) [1]; the King's brother present (WC3) [1] | The King's brother's card (never "King of Life", rule 92); the Errant; the inn and what burst out of it (a roof goes in, unexplained, as in Ch 1); Sinn and her card (91); Tavore's thoughts (55) | `b9v1_deal` deal/shuffle, `b9v1_stop` keep/try |
| 2 | b9v2 | Brys alone in his tent the night before the march | He has reshaped the army; he hopes rivalry with the Malazans will make it one; he fears a hard march (R11 S8) [1]; Malazans mock the Letherii in drill (R5 S1, S3) [1] | Any word of his death or waking (92); "something growing in him" is "further from people", no more | `b9v2_list` again/away, `b9v2_out` out/in |
| 3 | b9v3 | Koryk in a fever-cart on the road east | Koryk's fever, "like many Malazans"; the Letherii water cure works (R11 S13) [1]; Bottle says Fiddler expects a bad fight (§9.3, R11 S13) [1] | Koryk's later thoughts (R19.1); Bottle's fate (86); the Commander is "the Commander's order" | `b9v3_smiles` away/water, `b9v3_when` when/good |
| 4 | b9v4 | Aranict walking the camp beside Brys | "A stone of loyalty"; the soldiers nervous because "the Malazan mages have fallen" (R19.2 S6–S7) [1]; she keeps her feeling to herself (§9.4) | Her name in a reader's mouth (readers say "the Atri-Ceda"); anything in the battle (97) | `b9v4_ask` ask/listen, `b9v4_say` say/not |
| 5 | b9v5 | Keneb riding out alone to look at the Wastes | Worrying at Blistig and himself; the Adjunct recalls him (R22 S6) [1]; Grub's loss as "the boy has gone off on his own" (R11 S17; rule 91) [1]; bhederin on the plain (R10 S1) [1] | What the Adjunct wants (55, 84); the charge and his death (86: known later, never seen); Grub by name | `b9v5_ride` on/stop, `b9v5_back` coming/look |
| 6 | b9v6 | Henar Vygulf, the tallest soldier in the escort, called to the Commander's tent | Brys asking soldiers for Wastes legends; Henar promoted (R22 S9–S10) [1] | Ahkrast Korvalain and anything that names a people (87); the rank (not found) | `b9v6_tale` wind/none, `b9v6_sir` sir/why |
| 7 | b9v7 | Gu'Rull high over the field after the short-tails have gone | The pile of bones, the crater, a cavalry charge destroyed, a retreat trail; Gu'Rull admiring the humans (R24.1 S5–S7) [1]; "Short-Tails" (RT4 S7) [1] | Who sent him; the Che'Malle, Matron, Kalyth, the second battle (88); anyone on the field found or named (86); the Khundryl by name (94) | `b9v7_low` low/high (the art reads it), `b9v7_trail` follow/hold |

The spare (Sinter, §9) is not used: Keneb's ride stands apart from the Third's ground.

## Art (168b)

- **New figures:**
  - `b9v_brys`: a tall man, a plain dark coat, the sword hilt-up.
  - `b9v_koryk`: shaven, finger bones on cords; `o.sick` lies him in the cart, shaking, under a blanket, through steps 0–2.
  - `b9v_aranict`: a cadre robe under a coat, hair pinned up, a lit rustleaf stick with its smoke.
  - `b9v_henar`: very tall, a padded jerkin, a grey-green cloak, bending at the neck.
  - `b9v_gurull`: a winged hunter seen from below, beating slowly; drawn in the air.
- **Reused:** `b7v_fiddler`, `keneb`, `b7_malregular` (Smiles), `b2soldier` (Bottle), `b5_letherii`, `b9_c3_healer`.
- **Backdrops:**
  - `b9v_reading`: the lamp leans; card backs only; the faces in shadow; a roof falls far off through the shutters.
  - `b9v_tent`: Brys's tent; the lamp goes down at the end.
  - `b9v_carts`: by day, then dusk, then dawn.
  - `b9v_lines`: the escort's rows at night.
  - `b9v_rise`: a white sky, the army's dust, bhederin, the runner.
  - `b9v_stories`: Henar's tent, then the night outside.
  - `b9v_field`: the plain from very high up.
  - `b9deck`: the seven reading places; a card for the Third, a tile for the Letherii.
- **Headline only:** no card face is drawn; the sick are blanket shapes; the field is a white heap, a dark ring, a fan of dark marks and a scuffed trail, with no faces.

## Claude's calls

- **Vision 1 deals one named card**, the Magus of Dark to Quick Ben, and shows the Adjunct getting none (WC3). It stops with Fiddler's hand on the King's brother's card. Sinn and her card are left out, under rule 91.
- **Brys's change is "further from people … not colder"**, never said why.
- **The healer is a grey Letherii woman** with salt and "something bitter" in boiled water, to match Ch 3's *Letherii Cure*. Smiles teases Koryk (R11 doesn't say she does).
- **Aranict tries to say it and talks about water barrels instead.** Either choice ends the same way.
- **Keneb gets down on the rise** to rest the horse. The summons comes by a young woman runner.
- **Henar's three stories are invented folk-tale:** the wind that calls your name, feet never to the east, "the land was something else once". No people is named.
- **The promotion's rank is unheard**, because it was not found. Henar hits the ridge-pole twice.
- **Gu'Rull came "a long way to look"**, with no sender. The trail has no direction. The short-tails' dust has "moved on and away".
- **The tile-woman in Ch 6** says her mother told the wind story.

## Open, for David's copy

- DoD (the Reading): which cards Fiddler dealt beyond the three on WC3, and in what order. Only the Magus of Dark is used.
- DoD ch 11: what Brys's water cure is.
- DoD ch 22: what Henar told Brys, and the rank he was given.
- DoD ch 24: what exactly the "pile of bones" on the field is, and the trail's direction.
