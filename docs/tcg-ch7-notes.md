Tue Nov 10, 2026, 4:09 PM PST. Book Ten, Chapter 7, "Over the Ridge", and the book's finale (`src/187_b10_ch7.js`, art `src/187b_b10_ch7_art.js`, test `tools/b10ch7_test.mjs`), against the Book Ten engine on `book10` (v13.0.0, not shipped).

# Chapter 7 notes: Over the Ridge (and the finale)

The Third's last chapter and **its mortal fight** (David's decisions 3, 6, 7, 11; tcg-canon corrections 2 and 3, fix A). Out of the glass into Kolanse. The Third is already lent to Captain Sedge's company as file-closers (Ch 5's `b10_c5_lent`; not said again). Before light an order goes round the heavies' fires and never reaches the Third: **said once, plainly, in `b10_c7_dawn`**, and never where the heavies went (rule 108). The day on Sedge's stretch at the far west end of the regulars' line, far from the Adjunct, the plains-folk and the hill; one Assail; a Malazan Host over the ridge, and with it Book Eight's Fourth onto the Third's stretch; the Kolansii kneel. The barrows; the endings; the finale; the engine's series coda.

## Shape

- **Areas (3, 16×12, decor `b10_c7_field`):** `b10_c7_camp` (the first fields the night before, dark), `b10_c7_line` (the stretch by day, phases 2–3), `b10_c7_barrows` (evening, dark). Titles road-aware.
- **Nodes:** 50 `b10_c7_*` (the reading's two included). Below the brief's 60–80, like Ch 3–6 (43–55); the finale's pages are not nodes (Claude's call).
- **Phases** (`S.f.b10_c7_ph`): 1 the night before (set at `b10_c7_start`); 2 the stretch (set by the fire's "Sleep"); 3 after the line (set in `b10_c7_line_after`); 4 the barrows (set leaving the stretch).
- **Order:** the first fields (the reading) → Sedge (tomorrow; the knots) → Thallo at the heavies' fire (eating again) → the empty granary (watchers; pickets, optional) → the fire → sleep → **first light (the order that never reached the Third)** → Sedge's order (hold the stretch; nobody coming this far west) → the ends of the stretch → the first rush (survive) → the Khundryl far off, the hill's smoke and thunder → the surgeons' cart → the file-closers (a Witness check) → **the line (mortal)** → the kneeling → Rolle (the cloak) → the Fourth's sergeant (its road; the trick) → the glare and quiet, dragons → the barrows: the edge (the names; the roll), Bredd asked after, Sedge, Thallo's slates (the key), the Fourth's road, the beat → the end.
- **The fire** `b10_c7_fire` (id kept): phase 1 on the first fields (`witnessHTML()`, rest, the talk `B107TALK`, the reading, "Sleep… first light" with "Not now"); phases 2–3 no fire; phase 4 at the barrows' camp (rest, the talk's second lines, Thallo's slates / the Fourth's question / the beat as they open, "The end of it" once the key and the Fourth's road are set, "Not now").
- **The reading:** `B10READ[7]`: a shield laid on the ground behind the line, the light going (`b10_c7_eve`). Say lines for Marrow, Tallow, the old marine. Offered at the first halt, the shield (`R`) and the fire in phase 1.
- **Engine-of-the-node note:** 016's `talk()` runs a node's `fx` once per node id. Every node this chapter reaches in more than one phase (Sedge's) sets its flags on **choices**, not on the node.

## The mortal fight `b10_c7_line`

`mortal:true` (death checks do not run). Stage 1: `b10_kolansii` ×3, `b10_kolpike`, `b10_kolbow`; allies `b10_regular` ×2 (on `south`, this chapter's own `b10_c7_twelfth` ×2, the regulars' numbers and growth). **Stage 2:** `b10_assail` (ONE, decision 11), `b10_shriven` ×2, `b10_kolansii`; allies the two again, **plus the Fourth on the regulars' field: `b10FourthAllies(0, 0)`** (a getter, so a Book Eight Fourth is read at fight time). The Fourth starts at the top-left corner, behind the Assail ("into the back of the Assail's knot"). **xp 400 + 180.** Signposted on every choice into it: `"Third. Push." (a mortal fight: whoever falls here stays down)`, `tag:'mortal'`, "Not yet"; the line node, the preText and the stage-2 text end on "Whoever falls here stays down." The file-closers' check first (might 19, **`witness:true`**, "holding a frightened line"; Pruss +2, Brask +2) gives surprise. **`S.f.b10_c7_fell`** = the ids who fell (from `S.f.lastFallen`, once). **`b10Witness(1, 'somebody came')`** once in `b10_c7_line_after` (regulars' field). Balance not run (the lead's instruction); the levers are the two allies, the Fourth's three, the closers' surprise and the stage-2 wall.

## The Fourth

- **Engine:** `b10FourthAllies`, `S.b10f`, `b10FourthName` (escaped in text). A canon-default Fourth (Brisk, Kettle, Tuft, Ohl at 20, sergeant unnamed: "the Fourth's sergeant") or Book Eight's (name, mates, camp, dead). The Fourth's sergeant is never gendered.
- **Arrival:** the stage-2 text (a Malazan Host over the ridge, a Fist on the ridge under a standard nobody knows; "Fourth, on me"). After: **Rolle** (he, the brief's Host sergeant; gives the cloak) brings the Fourth's sergeant along the line. **Book Six said the Fourth and the Third never met** ("It never met the Third. It never will."); the meeting says so once, and Where the books meet says it differently.
- **Its road** (`b10_c7_fourth_road`, rule 109, one page of its own words): Darujhistan, a lake boat, a coast, a ship ("a long time on it"; no count, no compass word), Aren, the old Host taking it back as veterans, "a road that wasn't a road" out of Aren, "a keep", "a pass", "the sappers did the rest", "the Host had munitions, more than it should have, and nobody would say from where" (Kettle pats her satchel), **"Your High Mage is alive"** (the chapter's one rumour), "then that ridge". Never Kalam, Serenity, the Deck, the warehouse.
- **Its ending** `S.f.b10_fourthRoad` (`host` / `third` / `home`): at the barrows, after the Third's key, its sergeant asks the Third's sergeant what to do, and does it. "Not now" sets nothing.

## The key `b10_c7_key` (Thallo's three slates, at the barrows)

`witnessHTML()` shown; words by tier (low: somebody says "home" flatly; kept/witnessed: the squad looks round at each other first). Haddat, Brask, Tegra, Pruss, Mirrel have lines.
- **`colours`**: Haddat, Brask, Marrow +1.
- **`kolanse`**: needs `b10RoadOpen('kolanse')`; closed, it shows `"Kolanse. The wells." (closed: the squad has not got it in it tonight)`, `tag:'closed'`, to a node that says why. Tegra, Pruss, Wenna, Tangle +1.
- **`home`**: Mirrel, Doss, Mehet +1 (low tier: "Home. Say it plainly: home.").
- `chapterEnd(7, key)`. **`B10CH7.end`** titles are `B10_ENDW.t`'s (`With the colours`, `In Kolanse`, `Time served`); the paragraphs read the road (`b107Ends()`), which the coda reads.

## Witness (this chapter)

No wear. Moves: **the Fourth +1, fixed, once** (`'somebody came'`: in the line's after-node on the regulars' field; on `south` when the Fourth walks up at the barrows); the beat **±1**. No own-scene move, no Witness "yes, but", **no thirst** (the brief). Two `witness:true` checks: the file-closers (holding a frightened line) and the names at the barrows' edge (speaking for the dead).

## The beat (c7)

At the barrows' fire, after the key: "What was it for, then?" — "Each other. All the way." (`kept`, `S.f.b10_c7_beat = 'each'`), "So it was seen. We were here. Somebody saw it, even if it was only us." (`kept`, `seen`; the RG saying as soldiers repeat it), "Nothing. We walked because the column walked." (`doubt`, `nothing`), "Not now".

## Flags

| Flag | Values | Set where |
|---|---|---|
| `b10_c7_key` (and `S.chapters[7]`) | `colours` / `kolanse` / `home` | Thallo's slates |
| `b10_c7_fell` (shared) | array of ids (may be empty) | after the line |
| `b10_fourthRoad` (shared) | `host` / `third` / `home` | the Fourth's sergeant |
| `b10_c7_beat` | `each` / `seen` / `nothing` (also `S.b10.beat.c7`) | the beat |
| `b10_c7_came` | 1 | the Fourth's arrival (+1) |
| `b10_c7_fourthMet`, `b10_c7_rolle`, `b10_c7_fourthRoad` | 1 | the meeting; Rolle; the Fourth's road told |
| `b10_c7_rimTried`, `b10_c7_rimOk` | 1 | the trick |
| `b10_c7_closed` | `locked` / `loose` | the file-closers |
| `b10_c7_named` | `said` / `halting` | the names at the edge |
| `b10_c7_lineDone`, `b10_c7_rushDone`, `b10_c7_pickDone` / `b10_c7_pickLeft` | 1 | the fights |
| `b10_c7_boss1`, `b10_c7_orders`, `b10_c7_march` (south), `b10_c7_boss4` | 1 | Sedge (on `south` the Twelfth's finadd) |
| `b10_c7_dawn`, `b10_c7_cart` (`ok`/`no`), `b10_c7_edge`, `b10_c7_bredd`, `b10_c7_thallo`, `b10_c7_sixthSaid` | | as named |

Earlier keys read, each with a default: `b10Key(1)` (`names`), `b10Key(3)` (`haul`), `b10Key(4)` (`horses`, the Sixth's rumour on `south`), `b10Key(5)` (`give`: the young one in Sedge's file is alive at the barrows), `b10Key(6)` (`hold`), `b10_lethRoad`, `b10_c6_fell`, `b10TRoad()`, `b10LRoad()`.

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b10_c7_picket` | behind the empty granary, dusk (dark) | `b10_kolansii` ×2, `b10_kolbow` ×2 | 120 | **optional** (put them off / guile 19 round the granary, "yes, but" the door / leave them / Not now); not mortal |
| `b10_c7_morning` | the stretch, morning | `b10_kolansii` ×2; waves 2 + 1 (`b10_kolbow`) | 160 | **survive 4**, two regulars (Twelfth's spears on `south`); not mortal |
| `b10_c7_line` | the stretch, afternoon | above | 400 + 180 | **MORTAL** |

At `XPK` .6 the Third reaches its cap, 28 (tested from 27). Battle `t` is a low field-wall of dry stones; no foe or ally starts on one (tested).

## The trick: Rim to Rim (`b10_c7_rim`)

The Fourth's oldest trick (Book One's first): shields locked rim to rim across a gap. ✦ **wits 21**, after the line, from the Fourth's sergeant (on `south`, from a grey regular at the barrows' camp who learned it from the Fourth on his own stretch). Edges: Haddat +2 (the Hissari shield-wall), Brask +2, Darrut +1, Pruss +1, the sergeant +2 if Book Nine's Roll at the Gate is held, else +1; Tangle, Tebbet −1. Copies **the Line** (`line`): `B.line`, +3 + trick level armour, no flanking. **Free** (`free:true`; its words end on the one-free-trick line). Learned after the last fight: it is the series' bookend more than a tool (Claude's call; the brief places it there).

## Items (art in 187b, Book Ten's ground)

- `b10_c7_knot` (trinket, hp 2, might +1): a file-closer's knot (red, Sedge's; blue, the Twelfth's on `south`), the night before.
- `b10_c7_ridgecloak` (armour, light, **ac 1, hp 5**): a Host cloak, from Rolle (on `south` the Fourth's sergeant, at the barrows).
- `b10_c7_roll` (trinket, hp 2, wits +1): the Third's last roll, scratched on hide at the barrows' edge, made or missed.
- (The brief named two; the knot is the third, so the chapter has one item before the mortal fight.)

## Pruss

Walking: lines at the start, Sedge (the knot), Thallo's fire, the fire's talk (both), the first rush, the line (both texts), the closers, the line's after (if somebody fell), Rolle's cloak, the names, Sedge at the barrows (south: the Letherii book), the key, the key done, the beat, the end. Waiting: absent from every node (tested); his finale page says so.

## The 'south' road

The night before: the brigades' camp in sight of Kolanse City and the tower; the Twelfth's finadd for Sedge (blue knots); the wagon-master at the full wagons, no Thallo. Dawn: the brigades walk out (no order missed). The Twelfth's stretch: the finadd's order ("Hold them in front of us"); **the Sixth three stretches west** (when the Letherii are on `escort`: the chapter's one Letherii line; "The Twelfth is not the Sixth"); no hill, no Khundryl. The same fights with the Twelfth's spears; **no Fourth in the fight, no Host**; after the line the Kolansii turn away for the far tower. The finadd: north to the foreigners' army (the kneeling as news). The barrows: Thallo finds the Third; **the Fourth walks up (Witness +1)**, hands over the cloak; a regular teaches the trick; the same key, Fourth's road and beat.

## The other squad (one line)

`b107Sixth()`, once: `south` + Letherii `escort`: at the west end (above). Both in the glass (`adjunct`/`adjunct`): at the east end, Sedge's word that a few Letherii held a stretch in the morning. Otherwise at the barrows: a Letherii corporal come up with the brigades says the Sixth held / went out after the wounded (Ch 6's key). `b10OtherName()` not used.

## The finale (wired to the engine's coda)

- **037's pages** through `B10CH7.finale`: the Third's road page (`b10_c7_road`, by the key; Witness words; "There is no Book Eleven…"); a fate page per Third soldier walking (`B107FIN.T`: 21 soldiers, a line per ending, the soldier's Book Ten from the keys, a Book Ten trick, a closing by loyalty); the fallen on the stretch ("in the third row from the west, with Sedge's dead"), the fallen earlier in Book Ten, the fallen before it, the waiting, a recruit sent away; the sergeant. `labels.endline` "The End of <em>Witnessed</em>", the credit to Steven Erikson and Ian C. Esslemont; `labels.list` counts three squads' dead; `coda` (037's end page) gives the book, each squad's part, Witness at the end.
- **`B10FIN.extra`** (180 splices it before 037's end page; never at `P.length − 1`): `b107road` (the Sixth's road page from `CHAPTERS[6].fates.roadPage()`, its sergeant and Witness), `b107leth` × n (from `.pages()`, plus the Sixth's fallen from before the book; the Sixth's sergeant painted in Book Five's look and lent to the portrait cache, as 167 does), `b107fourth` (the Fourth's road, its sergeant, its soldiers, its dead, in one page), `b107meet` (*Where the books meet*: "At the barrows"). Drawn by this file's `showFinale` wrapper (kinds `^b107`), which falls through to 180's for everything else.
- **Then the engine's coda** (`b10copen`, `b10coda` × squads, `b10credits`; "Somebody wrote them down" stays): tested in order after 037's end page, with this save's three squads among the coda pages and the Fourth's road title in its page.
- **Phone width:** every finale and coda page tested at 390px for horizontal overflow (none).

## Named inventions

None new. Sedge (the brief's; a corporal of hers with a burned hand, unnamed); Rolle (the brief's; he; broad, slow, a broken tooth); Thallo; the old marine; the heavies' captain (mentioned). Unnamed by role: the Twelfth's finadd (a careful moustache) and wagon-master, the young regular from the next cloak (`give`), a surgeon, a knot of soldiers at the edge, a grey regular (`south`), a Letherii corporal at the barrows, the people at the field-edge (an old woman with a stick).

## Canon points and hard limits

- **Never on the page:** the hill or who held it (smoke, thunder, a glare, quiet; never the god, the chains, the ring); the Adjunct's charge (her standards far off, once, in Sedge's order and the east end); the Khundryl's warleader seen (the charge far off; "the warleader fell" only as Orvas's camp word at the barrows); the Voice, the Shards, the four named regulars, Faradan Sort; the High Fist (only "a Fist on the ridge under a standard nobody knows"), his card, the portal; the barrow speeches (officers far off, "somebody speaking, very far away"); Fiddler, Korlat. "Bonehunters" not said (only in the ally's engine name). The never-list is tested on every node, battle text and finale page.
- **Thallo goes with the heavies** in the night and is at the barrows after, eating; he does not say where they were (Claude's call: rule 108 holds because nothing places him).
- **Unsure:** whether Kolansii pickets watched the first fields the night before (the game's own); whether the regulars' battle had a quiet middle between rushes (written as "not yet noon … waiting for something"); whether the southern allies reached the barrows before the burial ended (Epilogue I has Brys there; written as "found it burying its dead").

## Engine changes

None in 180. In this file, guarded: a `mkAlly` wrapper for this chapter's own ally (`b10_c7_twelfth`, the same growth as 180's regulars); `SCENES.b10_ridge` caption getters (road- and phase-aware); the finale's `showFinale` wrapper for `b107` kinds (inside `b10On()`), and `B10FIN.extra`. In 187b: `FIGX.b10_assail` (and `FOES.b10_assail` / `b10_lassail` wear it), `SCENEX.b10_ridge` / `b10_barrows` (180's placeholders, now drawn), `b10_c7_eve`, `b10_c7_road` / `_fourth` / `_sixth`, `TILEX.b10_c7_field` (186b's field underneath), a guarded `drawFeature` wrapper (its style only).

## For the visions pass, the continuity read and balance

- **Visions:** the card node is `b10_c7_card` (back `b10_c7_fire`); vision 7 (the Crippled God resolving to write the Fallen down) is the visions pass's; nothing in this chapter names him.
- **Continuity:** the Sixth's line uses Ch 6's key; the Fourth's road page answers Book Eight's Kettle line; Book Six's "never met" is answered once in a node and once (differently) in Where the books meet.
- **Balance:** the mortal fight's stage 2 has the Fourth (`B10_FOURTH_N` = 3) on the regulars' field and **not on `south`** (two spears only): the `south` stage 2 is the harder one and may want its own row.
- **Trope budget:** B10 now 74,747 words, every family inside budget (tested). This chapter cut its Nobody/Somebody openers to fit.

## Tests (Tue Nov 10, 2026)

`python3 build.py`; `node --check` on both files; `node tools/lint.mjs`: 0 errors (warnings are the chapter's own battle style and the orphan-looking card/order nodes, as Ch 3–6); `tools/b10ch7_test.mjs` all ok; `trope_test` ok; `repeat_scan` (only the fire's and the Fourth's again-lines, as every chapter). The rest of the run is in the report. Not run (the lead's instruction): `run_all`, `balance`.
