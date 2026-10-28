# The squad patches: rules for every book

Each book's squad wears a cloth shoulder patch on the title. A patch shows above the series name and swaps with the book (BOOKS[*].patch).
The patches are a matched set, so these rules hold for every book.

## What every patch shares
- A **stitched border**: a dashed thread line just inside the edge.
- The squad's **number in Roman numerals**, in sand-gold, in IM Fell English SC, at the centre.
- **Five white tally strokes**, four crossed by a fifth: the five soldiers of the squad, and a soldier's way of counting days and dead.
- **The flame**: one embroidered flame (ember-red outer, amber middle, pale core, a dashed thread outline), drawn by the same shape every time. It is the series' fire: Pale burning in Book One, Hissar in Book Two. The same flame is on the From the Ranks icon. (Until v5.0.1 a thin red arc stood here; the flame replaced it.)

## What each book changes
- **The shape** of the patch.
- **The cloth**: its colour and wear.
- **One symbol** that belongs to that book.

| Book | Squad | Shape | Cloth | Its symbol | Flame |
|---|---|---|---|---|---|
| One, Ashes of the Pale | The Fourth, Seventh Company marines | Round | Dark brown, gold stitching | (none beyond the numeral) | Top, above IV |
| Two, The Chain of Dogs | The Third, Hissar garrison, Seventh Army | Heater shield | Sun-faded ochre, sand stitching, scorch mark lower right | Crow Clan feather behind III; chain links across the top | Bottom, below the tally |
| Four, Unblooded | The Third again: Third squad, 9th Legion, the Fourteenth | Lozenge (a square on its point) | Sun-bleached grey linen, sand stitching | A finger bone on a thong across the tally (the bones the Fourteenth wears from Aren) | Left of III |
| Three, The Fair Exchange | The Fourth again | Round (Book One's patch, unchanged) | Dark brown, gold stitching | (none beyond the numeral) | Top, above IV |
| Five, Indebted | The Sixth Company, the Whitefinder Battalion (Letherii army) | A coin: round, with a milled edge | Faded Letherii blue-grey, sand stitching | A coin-sack tied on a rope (the Drownings' weighted coin, the book's debt) | Right of VI |

## Looking ahead
- **Book Three can bring the Fourth's patch back** (David, 2026-10-12): if the Fourth return, their round IV patch returns as it is, as a homecoming.
- **Book Three, The Fair Exchange (v6.0), wears the Fourth's round IV patch exactly as it is** (`BOOKS.moi.patch = 'insignia/patch'`): the Fourth came back, so their patch did.
- A new squad gets a new number, shape, cloth and symbol, and keeps the shared four.

## Where they live
- The Fourth: `docs/art/Insignia.dc.html` (built into `src/19c_artwork.js` by `tools/art_build.py`), key `insignia/patch`.
- The Third: `src/47d_b2_title.js`, key `insignia/dg`; Book Four's, `src/70b_b4_title.js`, key `insignia/hoc`.
- The Sixth Company (Book Five): `src/80b_b5_title.js`, key `insignia/mt`.
- The icon: `icon-*.png`, `apple-touch-icon.png` (the shared four on a round patch with two rank chevrons below).
