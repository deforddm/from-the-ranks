Mon Nov 9, 2026, 11:30 PM PST. Book Nine, Chapter 6, "Dust on the Horizon" (`src/166_b9_ch6.js`, art `src/166b_b9_ch6_art.js`, test `tools/b9ch6_test.mjs`), against the Book Nine engine on `book9` (v12.0.0, not shipped).

# Chapter 6 notes: Dust on the Horizon

The Letherii's last chapter. The battle's day, seen from the escort's own stretch of the line (dod-canon correction 1, fix A; rule 97). The Sixth Company holds "from the cairn to the dry wash" on a plain in the Wastes that canon does not name. At first light there is what looks like a dust-storm on the northern horizon (WC23). By mid-morning it is a wall to the sky with shapes in it taller than any soldier: the short-tails (rule 88; never "K'Chain" or "Nah'ruk" in this chapter). The line holds. At noon the key. Late in the day the whole line steps back to a rise. At dusk the foreigners' rearguard is still fighting far off east. The Letherii choose their road by the fire, then the Witness beat. Hard, **not mortal**: death checks run in every fight.

## Shape

- **Areas (3, 16×12, ground `b9_c6_field`):**
  - `b9_c6_line`: the Sixth's stretch, from the cairn (west) to the dry wash (east), with the shield line north, the plain in front (no walking) and the train's wagons south. By day. Used in phases 1–4.
  - `b9_c6_train`: the supply wagons at the line's back, with dust coming in from the east. By day. Used only on the `train` road, phase 3.
  - `b9_c6_rise`: the rise the line pulls back to, at dusk. It has the new line on the crest, the Commander's banner at the west end, the east end looking toward the foreigners, and the train drawn in. Phase 5.
- **Nodes:** 60 `b9_c6_*` dialogue nodes, the reading's two included.
- **Phases** (`S.f.b9_c6_ph`):
  1. First light. Set at `b9_c6_start`.
  2. The morning: the line. Set at `b9_c6_toline`.
  3. The key's road, in the afternoon. Set at the key.
  4. The pull-back. Set when the key's road is done (the gap nodes, or the train's after-node, or `b9_c6_pullback`).
  5. Dusk on the rise. Set at `b9_c6_dusk_after`.
- **The order a player meets things:**
  - Phase 1: the start (the reading offered); Ennic's orders (and "is it a storm?"); Yelt's spare scale; the drovers (the trick); the tile-woman at a shield on the plain; Orla's dawn cup; the cairn, the wash, the barrels, the shields; Kaedra at the outriders if she waits. Then the fire, and into the line (once Ennic is heard and the scale is out).
  - Phase 2: the dust comes on; the line check; the line (main, stage 2); the news as headline; the plate; the key from Ennic.
  - Phase 3, `line`: the afternoon. The next company's stretch gives at the wash. Close the gap with it (a might 16 check), or fight in the gap (`b9_c6_gap`). Then the stretch holds; a runner brings the order to pull back.
  - Phase 3, `train`: back to the wagons. Yelt, Saffa, Orla, the oxen, the tile-woman. The short-tails come out of the dust on the east side (a wits 16 `rations:true` check); hold the wagons (`b9_c6_train`).
  - Phase 4: Ennic's order to go back to the rise in step (a wits 16 check); the pull-back (`b9_c6_dusk`, survive 4).
  - Phase 5: the rise at dusk. The rearguard news; the east end (the far fight; horsemen going into the dust far off); the banner; Yelt's count; the tile-woman reading "after"; Ennic's question (the road); the Witness beat; night.
- **The first halt** is `b9_c6_start`, with `b9ReadChoice(6)`. The reading is also at the shield (`b9_c6_shield`) and at the fire, in phase 1 only.
- **`B9READ[6]`:** scene `b9_c6_dawn`; place "a shield laid on the plain at dawn"; back `b9_c6_fire`; say lines for Perrit and the tile-woman. The pool is 160c's (the Wall ×3, the Dolmen, the Gate).
- **The fire** (`b9_c6_fire`, id kept for the games pass):
  - At dawn (phase 1, "before the battle", as the brief has it): a rest, the talk, the reading, the way on ("Into the line").
  - During the day (phases 2–4): it is out, kicked over when the dust came. The talk only.
  - At dusk on the rise (phase 5): a rest, the talk, the Witness question once the road is chosen, and "Night" once the road is chosen.
  - `rationsHTML()` in every phase. "Not now" always. The engine adds the roster.
  - The talk: a dawn line and a dusk line each for Tobet, Thegg, Perrit, Ammet, Ilsa, Sorvan, Ruuk, Brune, Pessa, Brennet and Kaedra.

## The key `b9_c6_key` (the battle's day, at noon)

Given by Ennic after the line, with `rationsHTML()` shown. Brennet, Kaedra and Perrit have lines. It reads Ch 4's `book` (`S.f.b9_c4_book`, else `b9Key(4)`, default `book`): "the train is drawn in where Yelt's book says it is" or "strung out along the track". "Not yet" steps back.

- **`line`:** Thegg and Tobet loyalty +1. The Sixth stays on its stretch. In the afternoon the next company gives at the wash. Close the gap shoulder to shoulder (might 16; on success no fight, `b9_c6_gapClosed`), or fight two short-tails in the gap (`b9_c6_gap`, `b9_c6_gapDone`). No ration move.
- **`train`:** Brennet loyalty +1. The Sixth goes back to the supply wagons, where short-tails have come round in the dust. A wits 16 `rations:true` check draws the last wagons in: Ch 4's `book` gives +2 ("the train is where Yelt's book says it is"), and the plain "Between them and the water" also starts with surprise on `book`. Then hold the wagons (`b9_c6_train`, survive 5). On the win: **`S.f.b9_c6_trainHeld = 1`**, **`b9Ration(2, 'the wagons came through')`**, once. Yelt writes the Sixth into the ration book by name.
- **Read later:** Ch 7 (one line of news).

## The Letherii's road `S.f.b9_lethRoad` (`B9_LETHROADS`)

Asked by Ennic at the Sixth's fire on the rise at dusk ("the Commander's staff asks every sergeant tonight"), with `rationsHTML()`. It reads `b9Faith('l')`:
- On `doubt`: the squad is quiet, then a squadmate says "home" testing it. The home answer reads "Home. Say it plainly: home." and costs no loyalty.
- On `kept`: a squadmate looks round the fire first. Home costs Thegg −1.

The roads:
- **`escort`** (canon's road; where it goes is never said, rule 85): "With the Commander's brigades. Wherever he takes them." Sorvan, Thegg and Brennet +1.
- **`adjunct`:** "East, with the foreigners." Kaedra, Ruuk and Tobet +1; Brennet −1.
- **`home`:** "Home, when there is a way home." Pessa and Brune +1 (Thegg −1 unless `doubt`).
- "Not now" sets nothing.

Read by Ch 7's finale (one line) and Book Ten.

## The Witness beat (`b9Wit`, `S.b9.wit.c6`)

- **Where:** at dusk on the rise, after the road. Ennic: "There is one more thing they ask every sergeant tonight. Not for the slate." He asks why, worded by the road.
- **Reached from:** the road's after-node ("Ask it"), or the fire ("What are we walking it for?") once the road is chosen.
- **The answers:**
  - "Each other…" → `kept` (`S.f.b9_c6_wit = 'each'`)
  - "So somebody saw it. We stood. We'll be the ones who say so." → `kept` (`'seen'`). Ennic says the foreigners' sergeants have a saying about being their own witness; never Tavore's words heard.
  - "Because the column turns, and we turn with it." → `doubt` (`'column'`)
  - "Not now" records nothing. The chapter can end without the beat.
- Replies from Thegg or Tobet, Ilsa or Perrit, Ruuk or Pessa; Kaedra and Brennet if they walk.

## Rations (this chapter)

| Move | Where | Amount |
|---|---|---|
| The march | the engine, at the chapter's start | −1 |
| `train` | the wagons held, once | +2 |

- No own-scene move and no ration "yes, but" (Claude's call: the brief gives the battle no other anchor).
- **Ranges:** a fresh or `--from=6` save at 6 goes to 5, then 5 on `line` or 7 on `train`. From Ch 4's ends (4–10) it goes to 3–9 on `line` and 5–10 on `train`. This is inside the brief's 4–10, except a squad that came in at 4.
- **Hunger:** at 5 (`fed`) nothing. At 3 (`short`) every squadmate starts each fight 5% down. At 1 (`hungry`) 10% down and −1 on every check. This chapter cannot fall below where it starts minus 1.

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b9_c6_key` | `line` / `train` | Ennic, at noon |
| `b9_c6_trainHeld` | 1 on `train` (shared flag) | the wagons held |
| `b9_lethRoad` | `escort` / `adjunct` / `home` (shared flag) | Ennic at the fire, dusk |
| `b9_c6_wit` | `each` / `seen` / `column` (Witness in `S.b9.wit.c6`) | the fire, dusk |
| `b9_c6_lineDone`, `b9_c6_keyDone`, `b9_c6_trainDone`, `b9_c6_duskDone` | 1 | the fights' after-nodes |
| `b9_c6_gapClosed` / `b9_c6_gapDone` | 1: the gap closed without a fight / fought (`line`) | the afternoon |
| `b9_c6_dustOk` | 1: the trick learned | the drovers |
| `b9_c6_scale`, `b9_c6_plateGot` | 1: the item given | Yelt; in front of the line |
| `b9_c6_news` | 1: the rearguard news heard | the rise |
| `b9_c6_orders`, `b9_c6_storm`, `b9_c6_orla`, `b9_c6_trYelt`, `b9_c6_trSaffa`, `b9_c6_eveYelt` | 1 | the NPCs |

Earlier chapters read, each with a default: `S.f.b9_c2_drilled` (or `b9Key(2) === 'drill'`), `S.f.b9_c2_stepOk` (or the trick held), `S.f.b9_c4_book` (or `b9Key(4)`, default `book`), `b9Faith('l')`.

## For Ch 7's finale: `B9CH6.fates` (Claude's call, Book Seven's shape)

The brief puts the finale in Ch 7 ("the Letherii's from `S.th.l` and `S.f.b9_lethRoad`, one line each"). Ch 6 holds the lines so they are in the Letherii's voice. Ch 7 may use them or write its own:
- `CHAPTERS[6].fates.half()` returns the Letherii's half (S while they play, S.th.l while the Third does).
- `.road()` returns the road, with `escort` as the default. `.key()` returns `line` or `train`.
- `.line(id)` returns one line for a squadmate, or the sergeant for `'sgt'`, on the road.
- `.pages()` returns `[{id, k:'fate'|'gone', label, txt}]`: those walking, those waiting, those fallen in Book Nine (not those carried dead from Book Seven), and the sergeant last.
- There are lines for Tobet, Thegg, Perrit, Ammet, Ilsa, Sorvan, Ruuk, Brune, Pessa, Brennet and Kaedra on every road, plus a default.

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b9_c6_line` | the stretch, morning | `b9_lnahruk` ×2, `b9_lnahrukcaster`; stage 2 `b9_lnahrukbrute`, `b9_lnahruk` | 380 + 170 | **main**, both keys; `b9_escort` ×2. Locking the line first (might 16; Ch 2's drill +2, the step +1 for the sergeant) gives surprise |
| `b9_c6_gap` | the stretch, afternoon (`line`, optional) | `b9_lnahruk`, `b9_lnahrukcaster` | 200 | one `b9_escort`. It can be skipped by closing the gap (might 16) |
| `b9_c6_train` | the wagons, afternoon (`train`) | `b9_lnahruk` ×2; a wave at round 3: ×1 | 200 | **survive 5**; one `b9_escort` |
| `b9_c6_dusk` | the stretch, late | `b9_lnahruk`; a wave at round 2: `b9_lnahrukcaster` | 100 | **survive 4**, built to be near certain; `b9_escort` ×2. Going back in step (wits 16; the step +2, the drill +1) gives surprise |

- **Not mortal:** no fight has `mortal`; death checks run (tested: `deathOn()` in both stages of the line, the gap and the train).
- **Foes:** the engine's `b9_l*` short-tails only. No own foe. Combat numbers are the engine's defaults; `B9GAP` and `B9SOLDIER` are untouched.
- **Xp:** at the engine's `XPK` the line alone pays about 330, a full level. A fresh Letherii at 11 ends at 12 (test). A `--from=6` squad at 13 ends at 14.
- **Balance:** `balance.mjs --book=dod` was not run (the caller asked for no long suites). The line fight is the book's hardest Letherii fight by design ("hard, not mortal"): five short-tails across two stages against a squad with no munitions. **It needs a balance pass before David sees it.** The levers are the escort allies, the stage-2 brute, and Raise the Dust against the sorcerer.

## The trick: Raise the Dust (`b9_c6_dust`)

- **What it is:** the train's drovers' way with archers on dry ground. Drag a thornbush on a rope behind a team, drive the oxen round in a short ring, beat the ground with the tilt-poles. It is the carting houses' old trick for getting wagons past the border forts' archers uncounted.
- **The check:** a ✦ wits 18 check at the drovers (`b9_c6_drovers`), phase 1. **Brennet** teaches it if he walks or waits with the train; otherwise an old drover. Its edges:
  - Brennet's carting-house dust +2; the Cadre's Ward already held (a Book Seven transfer, `S.tricks.b7_c6_ward`) +2;
  - Sorvan (a troop's dust), Kaedra (the forts' scouts read riders by their dust), Ruuk (Faraed herders), the sergeant (the Malazans coming up out of the river under smoke) +1;
  - Thegg and Ilsa −1.
- **What it does:** it copies the Cadre's Ward (`b7_c6_ward`). A 3×3 of dust within 5 for 2 rounds (3 from level 5): nothing shoots into it, out of it or through it, and enemies standing in it are −2 to hit. It grows with level. It is not sorcery.
- **Free** (`free:true`); its words end on the one-free-trick line. It is not in `V103_FREE`, which is the shipped list; the flag is on its own `AB`, as Ch 2's and Ch 5's are.

## Items (each with art, 166b)

| Item | Kind | Stats | How it is got |
|---|---|---|---|
| `b9_c6_escortscale` | armour, mail | **ac 2, hp 3** (the real number: Ch 2's and Ch 4's coats are ac 1) | Yelt, from the train's spare stores, at dawn |
| `b9_c6_plate` | trinket, any | hp 3 | a plate off a short-tail, a pace in front of the line, after the line |

Both are got on both keys.

## The recruits

- No recruit joins in this chapter. Brennet (Ch 2) and Kaedra (Ch 4) have lines behind `b9In()`: at the start, the fire (both times), the line's two stages, the key, the key's roads, the rise, the road, the Witness and the end.
- **Brennet** teaches the trick (walking or waiting). If he waits, he is drawn among the drovers.
- **Kaedra**, waiting, is with the outriders at the stretch's east end in phase 1 (talk only; the roster swaps her in at the fire).

## Named inventions

- **No new named people.** Ennic, Yelt, Orla, Saffa and the tile-woman return.
- **Unnamed by role:**
  - an old drover with a face like a boot;
  - the next company's sergeant;
  - the reserve's captain;
  - a runner from the officers' fires.
- **New places, all unnamed:** the stretch "from the cairn to the dry wash", and the rise behind the train.

## Canon points, hard limits, open threads

- **Off the page:** Brys's and Aranict's acts, Henar, Keneb, Ruthan Gudd, Quick Ben, Bottle, Hedge, Lostara and the Adjunct are not named. "The Commander" gives orders through his staff, and his banner is seen far off at dusk ("lives" in soldiers' talk, rule 97). The Third is never seen; the one line of news is "the foreigners' rearguard is still out there".
- **The Khundryl** (rule 94): at dusk, from the east end of the rise, "a long dark line of horsemen goes into the dust at a gallop, very far off". Sorvan's dusk line says the outriders saw "the foreigners' horse" go in. Neither is named. **Unsure:** canon has the charge late (W *Gall*), but its hour and direction are §10 Q12. If a page check puts it after dark, cut the edge node's second paragraph and Sorvan's line.
- **The short-tails** (rule 88): tall, plated, short-tailed, walking, some with pale light in their hands (the sorcerers). Narration never names them. The dead are "dark shapes that do not move" in the grass, seen from the line. Losses are news: "the next company east has lost a file", the surgeons' carts.
- **Day:** the fight is by day (correction 3). Ch 6 ends at dusk with the rearguard still fighting, which leaves Ch 7 its dark.
- **Never said:** "weeks", "months", a Burn's Sleep year, "Bonehunters" (the Letherii say "the foreigners"), "K'Chain", "Nah'ruk", the coast or where the escort goes after.
- **Open on purpose:** what the light in the short-tails' hands is (Perrit does not know); where the escort goes; whether the short-tails come again in the morning (Ennic: "They may. They may not.").
- **Unsure:** the Letherii's part in the battle is §10 Q2 (not found). This chapter keeps it to one unnamed stretch, and the escort as a whole holds and pulls back in order. If a page check shows the Letherii line broke, the pull-back's words ("together, in step") want softening; no flag changes.

## Art (166b)

- **The short-tail, `FIGX.b9_nahruk`:** upright on thick backward-kneed legs, a short thick tail, dark plate in overlapping bands, a long plated head with a pale slit of an eye, a great blade held low in both hands. One body for both scales; the brute is drawn larger by the battle's boss scale.
  - **The engine's short-tails keep `kind:'khell'`.** Barghast Blood-Iron's bonus reads `t.kind === 'khell'`, and `b9engine_test` checks it. So 166b wraps `FIGX.khell` to draw `b9_nahruk` while `S.book === 'dod'`. This is an art-only change, in my file, guarded. Ch 7 gets the body for free.
- **Five backdrops:**
  - `b9_line`: the escort's line seen from behind the shields. In Ch 6 it has three states: first light with the dust low; the wall of dust to the sky with tall shapes in it; the dust drifting back with smoke over the foreigners' fight. Outside Ch 6 it is generic.
  - `b9_battle`: the battle at a distance from a low swell. Lines of shields, tall shapes in the dust, smoke, pale lights.
  - `b9_c6_dawn`: the fire, the line forming, a shield laid flat with the tile-woman (phase 1).
  - `b9_c6_wagons`: the train by day. At dawn the dust is far off; on the `train` road it blows in from the east with two shapes in it.
  - `b9_c6_dusk`: the rise against a red sky, the line on the crest, the banner, the train, the fire, and the brown cloud far east lit from inside.
- **Caption:** `SCENES.b9_line` gets a caption getter for Ch 6 by phase; 160's caption otherwise.
- **Ground `b9_c6_field`:** Ch 4's `b9_c4_wastes` underneath, plus `L` the shield line, `B` its banner, `E` its end stone, `S` a shield laid flat, `;` the plain in front, `d` the wash's lip.
- **Battle cover `t`:** spare shields and spears driven into the ground.
- **Items:** two, on Book Nine's dust-brown ground.
- **Size:** about 26 KB.
- **Uses earlier art helpers by calling them:** `b93aLand`, `b92aWagon`, `b92aBarrels`, `b92aOx`, `b94aCrates`, `b94aFire`.

## Engine

- **No edit outside this chapter's files.**
- **In `166`:** the trick's ability (its own `AB`, the Cadre's Ward's shape); a caption getter on `SCENES.b9_line` (Ch 6 only); `B9READ[6]`; the glossary rows; `B9CH6.fates`.
- **In `166b`:** the `FIGX.khell` wrapper (above), guarded by `S.book === 'dod'`; a `drawFeature` wrapper for `t` on its own style only.

## Tests

See the report; `tools/b9ch6_test.mjs` covers:
- the fresh start (the march −1);
- every node rendering clean;
- the "yes, but" and "Not now" audit under every phase, key and road;
- the reading;
- the orders and the scale;
- the trick (✦ wits 18, free, its 3×3);
- the fire;
- the line check with and without the drill;
- the line (stage 2, not mortal, death checks on);
- the plate;
- both keys from the same moment (the gap closed and fought; the wagons, +2 once, `trainHeld`, Ch 4's book +2);
- the pull-back;
- the rearguard news;
- all three roads to the end, each with its Witness answer;
- "Not now" recording nothing, and `doubt` changing the home answer;
- the fates;
- a `--from=6` style save that reloads.

## Claude's calls (David may overturn any)

1. **Both keys fight the line.** It is the main fight, and the drill's +2 sits on the check before it. The key comes at noon and decides the afternoon: the stretch (the gap) or the train (survive 5, +2 Rations).
2. On `line` the afternoon's gap can be closed with a check instead of fought. There is no ration move on `line`.
3. The fire is lit at dawn behind the line ("before the battle", per the brief), cold through the day, and lit again on the rise at dusk for the road and the Witness.
4. Ennic asks the road "for the Commander's staff, of every sergeant tonight". The Witness question follows, "not for the slate".
5. The `seen` answer lets Ennic mention the foreigners' sergeants' saying about their own witness. It is a soldier's saying, never Tavore's speech.
6. Brennet teaches Raise the Dust, as the carting houses' old border trick. If he is gone, an old drover teaches it.
7. The escort scale (ac 2, hp 3) comes from Yelt's spare stores for the front rank. The plate is picked up a pace in front of the line.
8. The short-tails keep `kind:'khell'`; the art draws `khell` as the short-tail in Book Nine.
9. Ch 6 provides `B9CH6.fates`, one line per Letherii squadmate and road, for Ch 7 to use or ignore.
10. Horsemen going into the dust far off at dusk (the Khundryl, unnamed) are seen once, from the east end of the rise.
