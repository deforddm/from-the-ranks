Tue Nov 10, 2026, 4:43 PM PST. Book Ten, the seven visions of *Witnessed* (`src/188_b10_visions.js`, art `src/188b_b10_visions_art.js`, test `tools/b10visions_test.mjs`), on `book10` against the Book Ten engine (v13.0, not shipped; VERSION untouched).

# Book Ten visions notes

Built on Book Nine's pattern (168/168b): `VISIONS.b10v1` to `b10v7`, `book:'tcg', ch:n`, one per chapter, for any card or tile. 36b already knows Book Ten (`visTiles` for the Letherii, `cardNodeName` → `b10_c<n>_card`), so 21's card screen offers "✦ Look into the card" (or the tile) whenever `visionFor` finds one, and the vision comes back to `b10_c<n>_card`, whose one button goes to `B10READ[n].back` (Ch 7: `b10_c7_card` → `b10_c7_fire`). **No chapter or engine file changed.**

**The readers.** 180c's `b10As` gives each squad its own chain: the Third (1, 3, 5, 7) Marrow, else Tallow, else the old marine (180c already names him); the Letherii (2, 4, 6) Perrit, else the tile-woman. The closing step (`b10vEnd`) has a line for each, plus an `other` fallback, and opens the house way. Figures: `marrow`, `tallow`, `b4v_oldninth`, `perrit`, `b5_c1_tilewoman`. The readers speak from the chapter's reading place (`B10READ[n]`: the barrel, the tailboard, the glass, the horse-blanket, the glass at first light, the crate, the shield). Where a road changes the place, the line follows `b10Crossing()` (`b10vGlass`): Ch 3 and 5 on `south`, Ch 4 and 6 on the Letherii's `adjunct`, Ch 7 on `south` (the tower, not the ridge).

**"Her hands are cold"** closes only each squad's first and last vision, for the women readers: Marrow on 1 and 7, Perrit and the tile-woman on 2 and 6. Six in the book, under the cap of eight (Book Ten had none before).

**The Letherii's tiles are quiet from Ch 3** (180c): in visions 4 and 6 the reader says the tile was warm, or showed something, "the first in a while", and never says why.

## The seven (tcg-canon §9)

| Ch | id | Eyes, moment | Canon in it (source) | Stops before / never | Words-only flags |
|---|---|---|---|---|---|
| 1 | b10v1 | Cuttle at a fire across the camp after the short-tails, grieving Bottle, who is only missing | RT4 S14 (§9.1) [1]; Bottle "missing" (ch 7) | Bottle walking in (the last line is the dark between the tents, where people are always walking); the parley; Fiddler made captain (the sergeant is "off with the officers") | `b10v1_name` say/leave, `b10v1_sgt` look/fire |
| 2 | b10v2 | Aranict at the back of the Letherii column on the southern march | The order of march, Grey Helms, Bolkando, Lether last; she wonders at the Grey Helms' pace (R13 S1) [1] | The Empty Hold, the three strangers (R13 S1–S4); any Grey Helm by name; Brys's own words ("the Commander") | `b10v2_dust` ahead/behind, `b10v2_ask` ask/smoke |
| 3 | b10v3 | Shortnose in the traces of a supply wagon at night on the glass, remembering his parents' hungry years | R17 S7 [1] (Reactor: da's scraps, ma's earnings; a woman beside him) | No child in the traces (§9.3): the soldier beside him is a woman, unnamed; his ma's work stays "and none of them asking how" | `b10v3_lean` lean/talk, `b10v3_home` remember/away |
| 4 | b10v4 | Gesler waking from the Aren Way dream to Bent, with the lizard-folk on the southern road | R13 S7 (§9.4) [1] | Krughava's ride (it ends at grey light, no rider); the Aren Way is "the trees, and what the trees held, and the crows", nothing closer; never "Che'Malle" (the big lizards) | `b10v4_dog` hand/up, `b10v4_road` road/nothing |
| 5 | b10v5 | Bottle asking Nom Kala what being dust is like, and asking the Imass to keep walking after the humans die | R17 S13 [1]: no memories to call them back; "severed" from all but what lives within; she agrees; she asks one more march | The gate, Icarias (never named); her answer about the Fallen One's hand (left out: rule 98); the lake | `b10v5_wait` wait/again, `b10v5_ask` ask/sit |
| 6 | b10v6 | Spax of the Gilk, slower than he was, on the allied field, seeing the Kolansii stop and walk to the Spire | R23.2 S17, S19 [1]: stitches and cramps, the young pass him; "large sections" ignoring the battle for the Spire; "we didn't even slow them" | Abrastal's order; his end; the Grey Helms' centre; the lizards as "the big lizards" | `b10v6_wave` wave/run, `b10v6_look` look/hold |
| 7 | b10v7 | The Crippled God hearing soldiers laugh on a hill ("who are we fighting for" / "everyone" / "no wonder we're losing"), resolving to write the Fallen in a book of his own | R24.3 S45, S48 [1] (paraphrased: "a book … written by my hand"; "I never hid my hurts") | His body, the heart, his bonds and their weight; Fiddler, the hill's people by name; Korabas, Cotillion; the god names no one; it ends on the book opened | `b10v7_listen` listen/away, `b10v7_laugh` keep/own, `b10v7_begin` begin/wait |

**Rule 98:** the narration names "the Crippled God" only in vision 7 (who, opener). The readers of vision 7 say "the Fallen One", as soldiers. No reader says the god wrote them down as a fact: Marrow saw "a book … open. I couldn't see what was in it" (§9a: the second half of canon's answer is the coda's, never a soldier's knowledge).

The spare (Ruthan Gudd and the toys, §9) is not used: Bottle's scene stays clear of the Unbound's gate and keeps the Witness line ("so the world knows the desert can be crossed").

## Art (188b)

- **New figures:** `b10v_cuttle` (a heavy-set sapper, leather jerkin, satchel, helm pushed back, a short beard; sits with a bowl through b10v1), `b10v_shortnose` (very big, a flattened nose, a trace-strap across the chest, leaning in), `b10v_bottle` (slight, untidy hair, a frayed sash, a lizard by his boot), `b10v_spax` (Barghast paint, shell plates, axe, a hand to his side).
- **Reused:** `b9v_aranict`, `b9v_brys` (the Commander rides up in vision 2), `gesler`, `bent`, `b7_malregular` (the woman in the traces), and B3VB's `imass` silhouette for Nom Kala.
- **Backdrops:** `b10v_cuttle` (the camp at night, a ring with a gap on the left; far walkers from the last step, none coming near), `b10v_march` (the dry road by day, two dust walls leaning away), `b10v_traces` (the glass by night, stars above and thrown back below), `b10v_night` (Gesler's camp; rows of tall still shapes; Stormy a heap; grey light in the last step), `b10v_dust` (the halt's edge on the glass; dust lifting off Nom Kala), `b10v_field` (the field, the city and the white tower; the grey ranks turn and walk from step 3), `b10v_god` (a dark without walls, a banked light from below, the laughter as far ripples, a book opening by step), `b10deck` (the seven reading places, both roads; a card for the Third, a tile for the Letherii).
- **Headline only:** no card face; the battle is small walkers at a distance; the god has no body drawn at all.

## Claude's calls

- **Cuttle's sergeant is "off with the officers"**, so neither Fiddler's promotion nor its timing is pinned.
- **Aranict's thought about the pace** names no Grey Helm ("someone in their command wants very badly to arrive first").
- **The woman in Shortnose's traces** says "Yes" once; she is unnamed.
- **Gesler's memory of the Aren Way** is one sentence of what Coltaine's army was (walked to a city's gates and left outside them), with no names.
- **Nom Kala's "one more march"** is kept; what it is for (the Fallen One's hand) is left out under rule 98.
- **Spax's "the big lizards will have to hold them now"** keeps canon's thought without the name.
- **The god's resolve** is paraphrased; "every one of them" and "the only holy thing he ever makes" are the game's words for the scrolls and the tome.

## Open, for David's copy

- TCG ch 4: who sits at Cuttle's fire (RT4 S14), and whether Fiddler is a captain yet. The vision names no one else there.
- TCG ch 13: the detail of Gesler's dream (R13 S7) and whether Bent was on the Aren Way itself; written as "the dog knows that road".
- TCG ch 24: the Crippled God's exact words (R24.3 S48). Paraphrased, never quoted.
