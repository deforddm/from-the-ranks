Tue Nov 10, 2026, 2:05 PM PST. Book Ten, Chapter 4, "The Long Way Round" (`src/184_b10_ch4.js`, art `src/184b_b10_ch4_art.js`, test `tools/b10ch4_test.mjs`), against the Book Ten engine on `book10` (v13.0.0, not shipped).

# Chapter 4 notes: The Long Way Round

The Sixth Company on the southern march (R13 S1): the Grey Helms pulling ahead, the Bolkando trying to keep up with them, the Letherii last; the horses failing; a hungry country at the road's edge. No mountains, no pass (David's decision 5). Three sunburned strangers at the column's rear, seen far off, taken in by riders from the staff's wagons, never met or named. Rumour (Ennic): "the grey knights' commander rode off into the glass". Lether's luck is quiet (engine); Perrit and the tile-woman feel the tiles gone cold, never told why.

## Shape

- **Areas (4, ground `b10_c4_ground`):** `b10_c4_lines` (dusk at the horse-lines; the first area), `b10_c4_road` (the road south by day, `escort` only), `b10_c4_march` (the night march on the glass, `adjunct` only, dark), `b10_c4_night` (the key's night at the horse-lines, dark, both roads). Two road areas because `registerChapter` copies an area's getters to values.
- **Nodes:** 43 `b10_c4_*` (the reading's two included).
- **Phases** (`S.f.b10_c4_ph`): 1 dusk at the horse-lines (on `adjunct` the lie-up at the day's end), set at `b10_c4_start`; 2 the road by day (the night march), set by the way on from the fire; 3 the key's night, set by the key.
- **Order:** the horse that has lain down (first halt; the reading; the trick) → Ennic (orders; the rumour) → Yelt (the horses' water), Orla (the veil), Saffa (the Third's line), the tile-woman → at the picket's far end, the foragers in the last of the light (main) → the fire, first light → the road: the strangers at the rear, the dogs in the wash (optional), the lookout (the one Witness "yes, but") → Ennic's key → the night at the horse-lines: the key's work; on `horses` the thieves; Yelt's ledger shut; the beat → on south.
- **The fire** `b10_c4_fire` (id kept): `witnessHTML()` in phases 1 and 3; a rest once in each (the second clears the thirst); the talk (`B104TALK`, a dusk and a night line for Tobet, Thegg, Perrit, Ammet, Ilsa, Sorvan, Ruuk, Brune, Pessa, Brennet, Kaedra, Tirren; road-aware); the reading in phase 1; the beat in phase 3 once the key's work is done; the way on (after the foragers in phase 1; after the key's night in phase 3); "Not now". In phase 2 it says there is no fire on the march (not reachable from the road maps).
- **The reading:** `B10READ[4]`, scene `b10_c4_dusk`, "a horse-blanket on the ground by the horse-lines" (on `adjunct` "spread on the glass at the column's tail"); say lines for Perrit (the tiles cold) and the tile-woman. Offered at the first halt, the tile-woman and the fire in phase 1.

## The key `b10_c4_key` (Ennic, on the road, once the strangers are seen and the lookout is done; on `adjunct` the lookout only)

`witnessHTML()` shown; Tirren and Thegg have lines; "Not yet" steps back.

- **`horses`**: `S.f.b10_c4_horses = 1`, **Tirren +1** (walking or at the train). The Sixth falls behind with the horses; at the night halt the last water barrel goes to the horses first: a wits 17 **`witness:true`** check at the horse-lines (the farrier's hand +2 to its bearer); made or missed (`S.f.b10_c4_walked` = `all` / `most`) the horses live, **`b10Witness(1, 'the horses lived')`** once, and **the thirst** (`b10Thirst(b10ThirstPick())`, `S.f.b10_c4_thirst` = the id) **unless `b10_c2_counted`** (`'waived'`: Yelt had the horses' water in the book from the parting and kept a little back). Then thieves at the picket in the dark (`b10_c4_night`).
- **`pace`**: `S.f.b10_c4_pace = 1`, **Thegg +1, Tirren −1** (Tirren walking or at the train). The Sixth makes the Bolkando's camp by dark; three horses lie by the road behind (two on `adjunct`); a might 17 check gets the rest on their feet for the morning (`S.f.b10_c4_kept` = `kept` / `late`). No Witness move, no thirst, no thieves.
- **Read later (the brief):** Ch 6 (`b10_c4_horses`: the Sixth has horses at the coast, a line and a check edge; `b10_c4_pace`: first to the King's ships, offered the scale first).

## Witness (this chapter)

Start 5 (fresh) or 2–8; **the engine's wear −1** at the start. Moves: the lookout's "yes, but" **−1** (the chapter's one Witness cost: "nobody waited for Lether"; on `adjunct` "the column did not wait"); `horses` **+1** once at the horses' water; the beat **±1**. No own-scene move. From a fresh 5: **horses 3–6, pace 2–5** (inside the brief's 2–8). Test: horses with the beat kept ends at 6; pace with the beat doubted ends at 3.

## Thirst

Only on `horses`, once, at the horses' water, to `b10ThirstPick()`; waived by `b10_c2_counted`. Words: the mouthful given to the one beside; split lips and a slowness; shown at the fire; a rest clears it. Never more.

## The beat (c4)

At the fire in phase 3 (`b10_c4_beat`), Yelt's ledger shut (on `adjunct`, Ennic's slate shut), a horse lost that day. "What did Lether send us out here for?" (asked by Ilsa, else Perrit, else Tobet): "Each other." (`kept`, `S.f.b10_c4_beat = 'each'`), "The Commander." (`kept`, `commander`), "Nothing anyone will remember." (`doubt`, `nothing`), "Not now" (records nothing).

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b10_c4_key` | `horses` / `pace` | Ennic on the road |
| `b10_c4_horses`, `b10_c4_pace` | 1 | the key (shared flags) |
| `b10_c4_walked` | `all` / `most` | the horses' water (`horses`) |
| `b10_c4_kept` | `kept` / `late` | the horses got up (`pace`) |
| `b10_c4_thirst` | an id / `waived` / `none` | the horses' water (`horses`) |
| `b10_c4_beat` | `each` / `commander` / `nothing` | the beat (also `S.b10.beat.c4`) |
| `b10_c4_farrierOk` | 1: the trick learned | the horse that lay down |
| `b10_c4_lookDone` | `seen` / `lost` | the lookout |
| `b10_c4_strangers` | 1 | the strangers seen at the rear (`escort`) |
| `b10_c4_forDone`, `b10_c4_nightDone`, `b10_c4_dogsDone` / `b10_c4_dogsLeft` | 1 | the fights |
| `b10_c4_ride` | 1 | the rumour heard |

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b10_c4_foragers` | the picket's far end, last of the light | `b10_lforager` ×4; stage 2 `b10_lforagerchief`, `b10_lforager` · `adjunct`: `b10_lstraggler` ×4; stage 2 `b10_lringleader`, `b10_lstraggler` | 380 + 170 | **main**, ally `b10_lspear`; guile 17 approach ("yes, but" thorn / the cold glass). The headman stays down, his people carry him off; stragglers "stay down" and go "back to his company" |
| `b10_c4_night` | the picket's end in the dark (`horses` only) | `b10_lforager` ×3 (`adjunct`: `b10_lstraggler` ×3) | 120 | dark; non-lethal in words |
| `b10_c4_dogs` | a dry wash off the road (`escort` only) | `b10_ldog` ×4 | 100 | optional; "Leave them to it" declines. Nothing lives in the glass, so none on `adjunct` (Claude's call) |

Battle xp at `XPK` .6: the main fight alone is a level, so every road reaches **18** from 17 (test: 5210 xp after the foragers). **Balance not run** (the lead's instruction). Battle 't' is a pack-saddle; no foe starts on one (tested).

## The trick: The Farrier's Hand (`b10_c4_farrier`)

What Tirren does for a horse that has stopped (a hand flat on the neck, the same few words, the mouth wetted, a foot lifted and set down, then the waiting), done for a soldier. ✦ wits 20 at the horse that has lain down; taught by Tirren, else the train's old farrier (on `adjunct`, the Sixth's old carter). Edges: Tirren +2, Ammet +2, Sorvan, Brennet, Thegg, the sergeant +1; Ilsa, Pessa −1. Copies **the Water-Song** (`b8_c4_hymn`): every squadmate within 4 heals 1d6+2 + `lvB()`, wakes from a daze, steps out of fire. **A full turn, no ward** (not free). The rasp comes with it, made or missed.

## Items (art in 184b, Book Ten's ground)

- `b10_c4_horsebow` (weapon, ranged, **atk 1, rng 1, 1d8+2**): Bolkando make off a dead outrider's saddle (on `adjunct` the plains people's, the Khundryl unnamed), from the main fight.
- `b10_c4_rasp` (trinket, hp 2, might +1): Tirren's spare (or the old farrier's), from the trick.
- `b10_c4_veil` (trinket, hp 2, guile +1): Orla's dust veil (on `adjunct` a foreign water-sergeant's lie-up veil, dark one side, chalked pale the other).

## Tirren

Walking: lines at the fire (both), the key, the end, the horse that lay down, Ennic, Yelt, Saffa, the picket, the foragers, the road, the wash, the horses' water, the night, the thieves, the beat. Waiting (`b10_tirrenDone` 2): absent from every node; the train's old farrier does her work; the squad's lines say "the farrier". Named horses: the grey mare **Ash** (lame near hind; the foragers take her and the squad brings her back). She has still not said which horse she means to bring home (left open, as Ch 2 left it).

## The 'adjunct' road

The middle of the crossing at the column's tail. Yelt, Orla, Saffa and the tile-woman went south with the brigades (Ch 2): `W` is the Sixth's two carts, `c` a foreign water-sergeant (the veil, the Third's line). Phase 1 is the lie-up at the day's end (`b10_c4_dusk` draws the glass at dusk); phase 2 the night march (`b10_c4_march`; no strangers, no dogs); phase 3 the halt before grey light. Riders far off on the glass to the south as the rumour ("the grey knights' commander, riding to find their Adjunct", or heat). `horses` lets the column go ahead and comes in late; `pace` keeps up and leaves two horses on the glass.

## The other squad

One line (Saffa on `escort`, the foreign water-sergeant on `adjunct`): the Third's `b10_c3_key` as rumour: `haul` (the foreigners' heavies in the traces themselves) or `cut` (cutting the wagons loose and carrying the water). On a Third `south`, the Twelfth's supply wagon dragged or left on this road; on a Third `south` with the Letherii on `adjunct`, the heavies went south with the brigades. `b10OtherName()` not used. No sighting.

## Named inventions

None new. Ennic, Yelt, Orla, Saffa, the tile-woman (Ch 2's). Unnamed by role: the train's old farrier, the Sixth's old carter, a Bolkando officer, a Bolkando carter, the foragers' headman (beads), the foreign water-sergeant, the stragglers' corporal and sergeant. The grey mare Ash (a horse).

## Canon points and hard limits

- The strangers (Faint, Amby Bole, Precious Thimble; R13 S1–S3) are three sunburned figures out of the north-west at the rear, "taken in" by two riders from the staff's wagons; never met, named, or close; the staff's wagons are never entered. Aranict and the Empty Hold, Abrastal and Felash, Spax, the Grey Helms' camp: absent. Krughava's ride is rumour only ("the grey knights' commander", never named).
- No count of days or nights; "no mountains", "no pass" (tested). "Che'Malle" not said (Ch 2 spent it). "Bonehunters" not said.
- **Unsure:** where on the southern road R13 S1 puts the strangers' arrival relative to Krughava's ride (written in one chapter, both far off); whether the southern column marched by day (written by day on `escort`, as Ch 2's road; Ch 3's `south` wrote night marches "for the horses"; both can be true at different stretches).

## Engine changes

None. `B10READ[4]`, `SCENEX.b10_c4_dusk`, `SCENEX.b10_south_night` (180's placeholder, now drawn), `TILEX.b10_c4_ground` and a guarded `drawFeature` wrapper (style `b10_c4_ground` only) are this chapter's own.

## For Chapter 5's and Chapter 6's writers, and the lead

- **Ch 5 (the Third):** the Letherii's one line may be `b10_c4_key` as rumour: the Letherii walked their horses and fell behind (`horses`), or kept up and drove them until they dropped (`pace`). On a shared crossing (both `adjunct`), "the few Letherii at the tail came in late with every horse" / "left horses on the glass". `b10_south_night` is drawn now (a camp on the road at night, fires along it, a farrier's lamp).
- **Ch 6 (the Letherii):** `b10_c4_horses` = the Sixth still has the train's horses at the coast (Tirren's line; +2 on one check before the line); `b10_c4_pace` = first to the King's ships (`b10_c6_shipscale` offered first). `b10_c4_beat` and `b10_c4_walked` / `b10_c4_kept` are there for words. Ash, the grey mare, may be at the coast on `horses`. The tiles are cold; Perrit has noticed and written it down.
- Trope budget: B10's Nobody/Somebody openers stand at 26 (about 56 allowed at 40,176 words); this chapter adds about six.

## Tests (Tue Nov 10, 2026)

`python3 build.py`; `node --check` on both files; `node tools/lint.mjs`; `tools/b10ch4_test.mjs` all ok (a `--from=4` start, both keys from the same moment, the thirst waived by `b10_c2_counted`, the `adjunct` road, a transfer's squad with Tirren waiting); `b10engine_test`, `b10ch1_test`, `b10ch2_test`, `b10ch3_test`, `los_test`, `trope_test`, `recruit_test`. A 412×915 screenshot of the first halt. Not run (the lead's instruction): `run_all`, `balance`.
