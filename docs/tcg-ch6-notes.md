Tue Nov 10, 2026, 3:25 PM PST. Book Ten, Chapter 6, "The Feint" (`src/186_b10_ch6.js`, art `src/186b_b10_ch6_art.js`, test `tools/b10ch6_test.mjs`), against the Book Ten engine on `book10` (v13.0.0, not shipped).

# Chapter 6 notes: The Feint

The Letherii's last chapter and **their mortal fight** (David's decisions 3 and 5; tcg-canon correction 1, fix A). The Grey Helms gone east (their dust bent away off the road, WC21); the King's ships at the coast with water, bread, scale, pikes and very large passengers, seen from the shore and never met (WC21); the allied attack before Kolanse City, a feint (WC23; R23.2), on **a stretch of the Letherii line between a dry ditch and a dead tree** that canon never names. Far off and unexplained after the line: the bay going white, something cut in half in the sky over the far tower (rule 107), the dead coming up into a fight at the tower's foot. News at dusk, headline: the Grey Helms turned on their masters, their leaders are dead, the Commander fell and got up. Then the Sixth's road out and the last beat.

## Shape

- **Areas (4):** `b10_c6_coast` (first light on the beach, `escort`; ground `b10_c6_coast`), `b10_c6_camp` (first light at the foreigners' camp out of the glass, `adjunct`; ground `b10_c6_field`), `b10_c6_field` (the Sixth's stretch by day, both roads), `b10_c6_dusk` (behind the line at dusk, dark, both roads). `B10CH6.area` is a getter so `startChapter` puts an `adjunct` squad in the camp.
- **Nodes:** 55 `b10_c6_*` (the reading's two included).
- **Phases** (`S.f.b10_c6_ph`): 1 first light (set at `b10_c6_start`); 2 the stretch before the line (`b10_c6_up`); 3 after the line (`b10_c6_line_after`): the key and its work; 4 dusk (`b10_c6_todusk`): the news, the road, the beat, the end.
- **Order:** first light (the reading on a crate) → Ennic (orders; the column's word: the Grey Helms east, the lizard-folk gone in the night) → Yelt (the scale), the boats (the giants), the drill (the trick, the pike), the horse-lines, Orla, Saffa, the tile-woman, the landing (optional fight) → the fire → up to the line → the order ("Hold them in front of us"; the Grey Helms in the Kolansii centre) → the west end (the Ninth), the east end, the barrels, the back, the stakes (the one check before the line) → **the line (mortal)** → the key → hold or carry → dusk: the news, the tally, the road, the beat → the end.
- **The fire** `b10_c6_fire` (id kept): phase 1 on the sand (or the camp's edge): `witnessHTML()`, a rest, the talk (`B106TALK`, a first-light line for Tobet, Thegg, Perrit, Ammet, Ilsa, Sorvan, Ruuk, Brune, Pessa, Brennet, Kaedra, Tirren), the reading, the way up to the line, "Not now". Phases 2–3: no fire on the line. Phase 4 behind the line: a rest, the dusk lines, the road (if not yet), the beat (once the road is chosen), "The end of it", "Not now".
- **The reading:** `B10READ[6]`: a crate off the King's ships on the sand at dawn (`b10_coast`); on `adjunct` a crate off the last cart at the camp's edge (`b10_kolanse`). Say lines for Perrit (the tiles cold, written down at every halt) and the tile-woman (`escort` only: she went south with the brigades). Offered at the first halt, the crate and the fire in phase 1.

## The mortal fight `b10_c6_line`

`mortal:true` (death checks do not run), `stage2` with `keepAllies:true`, allies `b10_lspear` ×2. Stage 1: `b10_lkolansii` ×3, `b10_lkolpike`, `b10_lkolbow`. Stage 2: `b10_lkofficer`, `b10_lshriven` ×2. **xp 400 + 180** (a full level at `XPK` .6: 18 → 19, tested). Signposted on the one choice into it, `"Sixth. Hold." (a mortal fight: whoever falls here stays down)`, `tag:'mortal'`, with "Not yet"; the line node and both preTexts say "Whoever falls here stays down". Setting the stakes first (`b10_c6_stakes`, might 18) gives surprise. **`S.f.b10_c6_fell`** = the ids who fell (from `S.f.lastFallen`, set once in `b10_c6_line_after`; an empty array when nobody did). The sergeant's scar line once (`b10_c6_scarSaid`). Balance not run (the lead's instruction): it is the Letherii's hardest fight by design, five Kolansii then an officer and two Shriven against a squad with no munitions; the levers are the spears of the line, the stakes' surprise, the square, and the stage-2 Shriven.

## The key `b10_c6_key` (Ennic, after the line)

On `escort` the Kolansii in front stop all at once and run for the far tower, past the Sixth's front (Spax's vision material, seen from the Sixth's own stretch); on `adjunct` they walk back across the open ground to the ridge to form again. The line's wounded lie in the open ground. `witnessHTML()` shown; Thegg, Ammet and Tirren speak; "Not yet".

- **`hold`**: Thegg and Tobet +1. Holding a frightened line while they go past: a might 18 **`witness:true`** check (Thegg +2; the square +1 to anyone who learned it; "yes, but" rattles: one turns into the stretch at the last). `S.f.b10_c6_held` = `firm` / `bent`. No Witness move.
- **`carry`**: Ammet and Tirren +1. Out in pairs: a wits 18 **`witness:true`** check (Ammet +2, Tirren +2; "yes, but" a bruise) for surprise, then **`b10_c6_open`** (survive 4, not mortal; `b10_lkolansii` ×2, waves `b10_lkolansii` at 2, `b10_lkolbow` at 3; xp 160). After it, **`b10Witness(1, 'went back for them')`** once; `S.f.b10_c6_carried = 1`.
- Both end on the far sights (`b106Sights()`), then the order to stand down; "Dusk" (with "Not now").

## The Sixth's road `S.f.b10_lethRoad` (dusk, Ennic: "the Commander's staff is asking every sergeant tonight")

`witnessHTML()` shown; words by tier (low: "Home," testing it; kept/witnessed: the squad looks round at each other first).
- **`letheras`**: home on the King's ships (on `adjunct`: walk to the ships at the coast). Thegg, Sorvan +1.
- **`kolanse`**: stay when the brigades sail. Needs `b10RoadOpen('kolanse')` (holding or better). Closed, it shows as `"We stay in Kolanse." (closed: the squad has not got it in it tonight)`, `tag:'closed'`, to a node that says why and goes back. Ammet, Tirren +1. Ennic stays too ("Somebody will need to keep the book").
- **`free`**: out of the army at the coast, with the King's tally. Pessa, Ruuk +1.
- "Not now" sets nothing. Set once (`b106SetRoad`).

**Tirren closes it** (Ch 2 and Ch 4 left it open): on Ch 4's `horses` the horse she brings home is **Ash**, the grey mare, lame in the near hind; on `pace`, whichever horse is left at the end of the picket ("I'll give it a name on the ship"); on `kolanse` she stays with all of them.

## The beat (c6)

After the road (`b10_c6_road_done` "Ask it", or the fire once the road is chosen): "What was it for?" (Ilsa, else Perrit, else Tobet). "Each other. To the end of it." (`kept`, `S.f.b10_c6_beat = 'each'`), "So it was seen. We were here." (`kept`, `seen`; the foreigners' saying, never Tavore's words), "Nothing. We stood in a line because we were told to." (`doubt`, `told`), "Not now" (records nothing; the chapter can end without it). Words by the road.

## Witness (this chapter)

No wear (the engine's is Ch 3–5). Moves: `carry` **+1** once (`'went back for them'`); the beat **±1**. No own-scene move, no Witness "yes, but" (no thirst either: the King's ships have water). From a fresh 5: **hold 4–6, carry 5–7** (tested: hold + kept ends at 6). The brief's 1–10 holds.

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b10_c6_key` | `hold` / `carry` | the key |
| `b10_c6_fell` (shared) | array of ids (may be empty) | after the line |
| `b10_lethRoad` (shared) | `letheras` / `kolanse` / `free` | the road at dusk |
| `b10_c6_beat` | `each` / `seen` / `told` (also `S.b10.beat.c6`) | the beat |
| `b10_c6_held` | `firm` / `bent` | `hold` |
| `b10_c6_carried` | 1 | `carry`, the open ground won |
| `b10_c6_set` | `set` / `loose` | the stakes |
| `b10_c6_lineDone`, `b10_c6_beachDone` / `b10_c6_beachLeft` | 1 | the fights |
| `b10_c6_squareOk` | 1: the trick learned | the drill |
| `b10_c6_scaleGot`, `b10_c6_scaleLate`, `b10_c6_pikeGot`, `b10_c6_tallyGot` | 1 | the items |
| `b10_c6_news`, `b10_c6_thirdSaid`, `b10_c6_giants`, `b10_c6_word`, `b10_c6_orders`, `b10_c6_fieldOrders` | 1 | the NPCs and sights |

Earlier chapters read, each with a default: `b10_c4_horses` / `b10_c4_pace` (default `horses`), `b10_c2_watched` (default `watch`), `b10Key(5)` (default `give`, for the Third's line), `b10TRoad()`, `b10LRoad()`.

## For Chapter 7's finale: `B10CH6.fates` (Book Nine's `B9CH6.fates` shape)

`CHAPTERS[6].fates` (also `B10CH6.fates`): `half()` (S while the Letherii play, `S.th.l` while the Third does), `road()` (`letheras` default), `key()`, `fell()`, **`roadPage()`** → `[title, paragraph]` for the Sixth's road page (titles are `B10_ENDW.l`'s; words by the Letherii's Witness tier), `line(id)` (one line per squadmate per road, and `'sgt'`), `pages()` → `[{id, k:'fate'|'gone', label, txt}]`: walking, waiting, the fallen in Book Ten (today's first: "fell on the Sixth's stretch … holding it. Whoever fell there stayed down."), the sergeant last. Lines for Tobet, Thegg, Perrit, Ammet, Ilsa, Sorvan, Ruuk, Brune, Pessa, Brennet, Kaedra, Tirren on all three roads, and a default.

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b10_c6_beach` | the landing's far end (`adjunct`: the camp's ditch), first light | `b10_lkolansii` ×2, `b10_lkolbow` ×2 | 120 | **optional** ("Leave them to the ships' guards" / pickets, "Not now"); guile 18 approach; not mortal |
| `b10_c6_line` | the Sixth's stretch | `b10_lkolansii` ×3, `b10_lkolpike`, `b10_lkolbow`; stage 2 `b10_lkofficer`, `b10_lshriven` ×2 | 400 + 180 | **MORTAL**; `b10_lspear` ×2 both grounds |
| `b10_c6_open` | the open ground (`carry`) | `b10_lkolansii` ×2; waves 1 + 1 | 160 | survive 4; not mortal |

No foe starts on cover (tested). Battle `t` is a stack of crates (coast) or a bundle of stakes (field).

## The trick: The Letherii Square (`b10_c6_square`)

The old brigades' square, called by the sergeant, spears out on four faces; on the word all four faces step out together. ✦ wits 20 at the drill on the sand, taught by an old drill-sergeant of the brigades (on `adjunct`, by Ennic, who carried a bundle of the old pikes across the glass). Edges: the sergeant +2 (a brigade soldier first), Sorvan +2, Thegg, Ilsa, Brennet, Tirren +1; Pessa, Ruuk −1. Copies **Hold the Square** (`b7_c5_square`): twice a chapter, range 4, 2d6 (+`lvDmg`) to a 3×3, squad included, reeling −3. It strikes, so it **uses the action** (not free). The pike comes with the drill, made or missed.

## Items (art in 186b, Book Ten's ground)

- `b10_c6_shipscale` (armour, mail, **ac 2, hp 4**): out of a crate off the King's ships. On Ch 4's `pace` Yelt offers it first; on `horses` it ran out at the fourth company, and a guile 18 check talks the purser out of the last one ("yes, but" three docks: money is the scene); missed, Yelt hands it over at dusk off the purser's second boat. On `adjunct` the foreigners' quartermaster gives a dead regular's.
- `b10_c6_pike` (weapon, reach, atk 1, 1d10+3, rng 2): the brigades' old pattern, from the drill.
- `b10_c6_kingstally` (trinket, hp 2, guile +1): the King's pay tally at dusk (Yelt, with the paymaster's chest; on `adjunct` Ennic's own chit).

## Recruits and the Third

- **Tirren** walking: lines at the start, the fire (both), the key, the road, the end, the horse-lines, the back of the stretch, the line, the open ground, the beat. Waiting: absent from every node (tested); the train's old farrier at the horse-lines. Brennet and Kaedra have lines when they walk.
- **The Third's one line** (`b106Third()`, said once): where both squads stand in one battle (Letherii `escort` with Third `south`; both `adjunct`) it is at the stretch's east end, **seen at a distance, three stretches off, never one stretch**: on `south` the Third at the back of **the Twelfth's** line ("The Twelfth is not the Sixth. Their stretch is their own"); on both `adjunct`, foreign heavies as file-closers at the back of a regulars' company, **seen from the west end**, far down the line toward its end ("Their stretch is their own"; the continuity read moved it from the east end so it agrees with Ch 7's far-west stretch). Otherwise at dusk as news: on `escort` with Third `adjunct`, a rider says the foreigners came out of the glass and the ground went wet under them (never how); on Letherii `adjunct` with Third `south`, nobody has heard. Each carries Ch 5's key as rumour (`give`: their last water to another company's youngest; `hold`: kept it). `b10OtherName()` not used.
- Ch 2's `watched`: a line at dusk (Tobet, else Perrit): they watched the foreigners walk into the glass and are glad they came out (on `adjunct`: watched the brigades go south).

## The 'adjunct' road

The foreigners' field, **its morning** (correction 4): the camp out of the glass at first light (thin fields, `b10_kolanse`), a foreign quartermaster's scale, Ennic's square, Kolansii in the camp's ditch, a stretch "far from anybody's banner" between two regulars' companies, the ridge black with Kolansii. The same fight ids and foes. After the line the Kolansii walk back to form again; toward noon a regulars' company takes over the stretch; a low hill far off east with a little smoke (rule 108; never who held it). Dusk news: "a Malazan Host came over the ridge … the Kolansii went down on their knees" (rule 106). No beach, no Grey Helms, no Commander news, no tower.

## Named inventions

None new by name. Ennic, Yelt, Orla, Saffa, the tile-woman (Ch 2's). Unnamed by role: an old drill-sergeant of the brigades, a purser, the Ninth (the next company of the brigades) and its sergeant, a regulars' corporal (she), a foreign quartermaster, the ships' guards, the King's clerks. The Ninth is a company number, like Ch 5's Twelfth.

## Canon points and hard limits

- Never on the page: the commander's ride and the Voice, the forgotten names, the seawater cloud, the Grey Helms' centre and leaders (seen far off as "grey ranks" folding the wrong way, and as news), the Bolkando queen and her old soldier, the giants' fight (the giants are only seen wading ashore), the trenches stormed, the relief, the tower and anything on it (only "the far tower"), Hood and the dead by name (Perrit says "the dead"), the Wolves. "Spire", "Perish", "Teblor", "Che'Malle", "Brys" never printed (tested).
- **Unsure:** whether the brigades marched from the coast to the field in a day (written without a count); whether the Bolkando stood near the Letherii (one far line, "bright coats"); whether the Kolansii at the Letherii's stretch broke for the tower as Spax saw them in the centre (written as all along the line).

## Engine changes

None. `B10READ[6]`, `SCENEX.b10_coast` / `b10_field` / `b10_battle` (180's placeholders, now drawn), `TILEX.b10_c6_coast` / `b10_c6_field`, a guarded `drawFeature` wrapper (those styles only), and **the kinds `b10_kolansii` (with `_pike`, `_bow`, `_officer` variants) and `b10_shriven`**, which the art file puts on `b10_kolansii`, `b10_lkolansii`, `b10_outrider`, `b10_kolpike`, `b10_lkolpike`, `b10_kolbow`, `b10_lkolbow`, `b10_kofficer`, `b10_lkofficer`, `b10_shriven`, `b10_lshriven` (so Ch 5's outriders and Ch 7's line wear them too).

## For Chapter 7's writer and the lead

- **The Sixth's pages:** `CHAPTERS[6].fates.roadPage()` and `.pages()`; `S.f.b10_c6_fell` for the dead of the stretch. Titles agree with `B10_ENDW.l`.
- **Spent here:** "the Commander fell, and got up" and "the Grey Helms' leaders are dead" (on `escort`); the bay going white and the thing cut in half (on `escort`); the Kolansii going to their knees (as `adjunct` news only).
- **On a Third `south`:** the Third is at the back of the Twelfth's line in the same battle, three stretches east of the Sixth; the Sixth saw it from its east end. Keep them apart.
- **On both `adjunct`:** the Sixth held a stretch in the morning and was relieved toward noon; the Third's afternoon stretch is elsewhere.
- **`b10_kolansii`** and **`b10_shriven`** are drawn; Ch 7 draws `b10_assail`.
- Trope budget: this chapter adds 4 Nobody/Somebody openers, 3 silence beats, 0 "the way" similes (B10 within budget, tested).

## Tests (Tue Nov 10, 2026)

`python3 build.py`; `node --check` on both files; `node tools/lint.mjs` (0 errors; warnings for the chapter's own battle styles, as Ch 3–5); `tools/b10ch6_test.mjs` all ok (a `--from=6` start, both keys from the same moment, the mortal fight with a death, the road both open and closed, the beat, the fates, Ch 4 on `pace`, the `adjunct` road, the Third on `south`, a transfer's squad with Perrit dead and Tirren waiting); `b10engine_test`, `b10ch1_test` … `b10ch5_test`, `los_test`, `trope_test`, `recruit_test`. 412×915 dpr-1 screenshots of the first halt and the mortal fight's opening. Not run (the lead's instruction): `run_all`, `balance`.
