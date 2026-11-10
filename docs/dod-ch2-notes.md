Mon Nov 9, 2026, 7:29 PM PST. Book Nine, Chapter 2, "The Escort" (`src/162_b9_ch2.js`, art `src/162b_b9_ch2_art.js`, test `tools/b9ch2_test.mjs`), against the Book Nine engine on `book9` (v12.0.0, not shipped).

# Chapter 2 notes: The Escort

The Letherii (Book Seven's Sixth Company, the `army` road) in the Commander's escort, mustering on a plain outside the landward gate of Letheras the same days the Malazans muster in the city. Drilled by an unnamed Malazan sergeant of the heavies (dod-canon correction 6: never Tarr's or Cuttle's company; no Malazan of canon stops by). The Commander's reshaping of the brigades is headline (Ennic: the old battalions broken up, "Whitefinder is a word on a banner now"). Brys is "the Commander" throughout and is seen once, far off, riding the front of the brigades on the last day. Out of the city behind the Malazans' dust.

## Shape

- **Areas (4, 16×12, ground `b9_c2_muster`):** `b9_c2_ground` (the muster ground, the first evening, dark), `b9_c2_field` (the drill field by day), `b9_c2_yard` (the supply train's yard at night, dark), `b9_c2_last` (the muster ground on the last day).
- **Nodes:** 56 `b9_c2_*` dialogue nodes (the reading's two included).
- **Phases** (`S.f.b9_c2_ph`): 1 the first evening (set at `b9_c2_start`); 2 the next day on the drill field (turning in at the fire); 3 that night in the train's yard (leaving the field at dusk, after the drill); 4 the last day (after Yelt's count); 5 the key made.
- **Order:** the evening (Ennic's word; Brennet at the wagons, the first halt; Yelt's ration book; Orla's cart; Saffa; the tile-woman and the reading; the fire) → the drill field (the sergeant's needling, the drill, the step, the rumour, the corporal's bout) → the train's yard (the thieves, Yelt's count) → the last day (the key from Ennic; the loading or the square) → the fire → out of the gate at first light.
- **The first halt** is `b9_c2_start`, with `b9ReadChoice(2)`; the reading is also at the tile-woman's tailboard and at the fire in phase 1 only (B9READ[2]'s set text is the first evening). `B9READ[2]` is 160c's, unchanged.
- **The fire** `b9_c2_fire` (id kept): `rationsHTML()`, a rest once by evening and once by day, the talk (a line by evening and a line by day for Tobet, Thegg, Perrit, Ammet, Ilsa, Sorvan, Ruuk, Brune, Pessa, Brennet), the way on (phase 1 turning in once Ennic is heard and Brennet settled; phase 5 the march once the key's scene is done), "Not now". The engine adds the roster.

## The key `b9_c2_key` (the muster's last day)

From Finadd Ennic (`b9_c2_ennic4`), with `rationsHTML()` shown; Brennet, Thegg and Perrit have lines; "Not yet" steps back.
- **`wagons`**: load the brigade's share honestly with Yelt and Orla (a quartermaster's runner had suggested three barrels "found later" for a consideration; Orla answered him). A might 16 `rations:true` check (both outcomes go on; the "yes, but" is skin). At its end **`b9Ration(2, 'the wagons loaded true')`** once (`b9_c2_loadedTrue`). No loyalty move.
- **`drill`**: back to the Malazan sergeant for more. **Thegg +1, `S.f.b9_c2_drilled = 1`** (both at the key). On the empty square his heavies lean on the squad's line (a might 16 check, both outcomes go on; "yes, but" skin): "You'll do. Out there, when it comes, stand like that. And stand together."
- **Read later (the brief):** Ch 4 (Yelt), Ch 6 (`drilled`: +2 edge on the line check).

## Rations

Start 6. `wagons` +2 → 8 (`full`). `drill` → 6. The ambush's "yes, but" at the train's yard is the chapter's one ration cost (`b9Ration(-1, 'a barrel split in the dark')`), so 7 or 5 on a near roll there. No own-scene move. Brief's 6–8 holds except `drill` with the near roll (5).

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b9_c2_key` | `wagons` / `drill` | Ennic, the last day |
| `b9_c2_drilled` | 1 on `drill` | the key (shared flag) |
| `b9_brennetDone` | 1 walks / 2 waits | the wagons (engine flag) |
| `b9_c2_loadedTrue` | 1: the wagons loaded true, +2 given | the loading (`wagons`) |
| `b9_c2_redrillDone` | 1: the last day's shove held | the square (`drill`) |
| `b9_c2_keyDone` | 1: the key's scene done | either |
| `b9_c2_found` | 1: Yelt's three lost barrels found on the first evening | Yelt |
| `b9_c2_orla` | `out` (cart lifted) / `ditch` (tried) | Orla's cart |
| `b9_c2_stepOk` | 1: the step learned (the trick) | the drill field |
| `b9_c2_back` | 1: answered the sergeant back about the river | the drill field |
| `b9_c2_drillDone`, `b9_c2_boutDone`, `b9_c2_wagonsDone`, `b9_c2_counted` | 1 | the fights' after-nodes; Yelt's count |
| `b9_c2_heavy` | 1: the rumour heard | the Malazan heavy |

Ch 4's Yelt may remember the Sixth for the barrels (`b9_c2_found`) and for the honest loading (`b9_c2_loadedTrue`).

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b9_c2_drill` | the drill field, day | `b9_c2_sparrer` ×3; wave at round 2: ×2 | 120 | **survive 4, the Letherii's first fight**; wooden swords (atk 5, 1d4+1) |
| `b9_c2_bout` | the drill field, late | `b9_c2_corporal`, `b9_c2_sparrer` ×2 | 100 | optional; wooden swords in words; death checks still run |
| `b9_c2_wagons` | the train's yard, night | `b9_lraider` ×2, `b9_lraiderbow`; stage 2 `b9_lraiderchief`, `b9_lraider` | 380 + 170 | **main**; one `b9_escort` ally (a sentry of the train). Approach: straight in, or a guile 16 round the oxen (surprise). City thieves in words; the engine's names on screen read "Border raider" / "Raider chief" |

Own foes: `b9_c2_sparrer` (Sparring heavy, `b2soldier` body, hp 22, ac 13, atk 5, 1d4+1), `b9_c2_corporal` (Heavy corporal, `b2soldier`, hp 40, ac 14, atk 6, 1d6+2, boss, shove). Combat numbers otherwise the engine's defaults.

XP: fresh Letherii at 11 (3300 + ...); the main fight alone pays 330 at XPK .6, so **every road reaches level 12** (test: 3402 xp on `wagons` with the bout). Hunger: at 5 (`fed`) nothing; at 3 (`short`) every squadmate −5% health in all three fights, at 1 (`hungry`) −10% and −1 on every check; Ch 2 cannot reach either (it starts at 6). Balance (`balance.mjs --book=dod`) not run here (the caller asked for no long suites); the drill and the bout are built low on purpose (near 100%).

## The trick: The Malazan Step (`b9_c2_step`)

The heavies' step: each soldier steps when the one beside steps, so the line moves and closes as one thing. A ✦ wits 18 check at `b9_c2_sergeant_after`; edges name what the squad knows: Bluerose lancers knee to knee (Sorvan +2), an ox team and its carter (Brennet +2), the Malazans coming up out of the river in a line (Thegg +2), the Whitefinders' parade step, which was not this (the sergeant +1), eel-boat rowers (Pessa +1), a volley's beat (Tobet +1), a pulse (Ammet +1); Perrit, Ruuk, Ilsa −1. It copies **the Gate Drill** (`b4_c1_gate`) under its own guard (`b9On()`, `B.b9step`): the bearer and every squadmate beside them +`lvT()` armour (3 at 11, 4 at 14), and an adjacent enemy cannot step until the bearer's next turn. **Free** (`free:true`; words end on the one-free-trick line). Not sorcery.

## Items (each with art, 162b)

- `b9_c2_carterscoat` (armour, light, **ac 1, hp 3**): Orla's brother's coat, given for lifting her cart out of the ditch (or for trying).
- `b9_c2_tallystick` (trinket, any, hp 2): Yelt's spare tally, after the thieves.
- `b9_c2_escortspear` (weapon, reach, atk 1, 1d8+2, reach): the escort's new issue, unstamped; dropped by the thieves.

## Brennet (the recruit)

Joins at the wagons on the first evening (`b9_c2_wagonline` → `b9_c2_brennet`, `b9Join('brennet')`); waits with the train when six walk and joins from his wagon later (phase 1 and the last day). No "go away" answer. His cancelled debt-chit; he remembers the Sixth helping a wagon out of the mud before the river (Claude's call: Book Seven never shows it, and it closes nothing). Lines behind `b9In('brennet')`: the fire (both phases), the key, the end, the drill field (arrival, after), the step's edge, the bout, the train's yard (he hears the thieves), the second ground, the loading, the last day, the redrill, Orla.

## Named inventions

- **Yelt** (the brief's): narrow, grey, very clean; the ration book "as thick as a brick". **Orla** (she): water-cart, a headscarf, a cudgel; her brother went home to Brevos. **Saffa** (she): field cook for three companies, burn scars, a ladle. All three drawn or reused (Orla and Saffa new figures `b9_c2_orla`, `b9_c2_saffa`; Yelt wears Book Five's clerk).
- Unnamed by role: the Malazan sergeant of the heavies (wears `b7_malsgt`), a Malazan heavy (the rumour), a heavy corporal, the tile-woman (160c's), a quartermaster's runner (off-stage), the thieves' master with a Harbour Yard cart-whip.
- No other new names.

## Canon points, hard limits, open threads

- No Tarr, Cuttle, Fiddler, Hedge (rumour only: "a ghost going round your camps… recruiting Letherii. Don't go. Whatever he's making, it's loud"), Bavedict, Henar, Brys's tent, the Akryn envoy, Tehol or the palace. "Bridgeburners" never said. "Bonehunters" not said at all; "the foreigners", "the Malazans".
- Kolanse said once (Ennic, "a drought"; nothing of what waits there).
- The other squad: one line from the Malazan heavy, as rumour of `b9_c1_key` ("a squad lent to the heavies sat on the stores that night…" / "went out into the quarter with some woman and her lamp"). `b9OtherName()` not used.
- The river: the Malazans needle the squad about it (the Letherii army broke there in Book Seven); Pessa never got to it (Book Seven: pressed the week before).
- Mages failing: Perrit says the cadre can't feel the Holds since the night the dead stirred (headline, R5).
- **Open on purpose:** the quartermaster's runner and his skimming (Ch 4's "who has been taking" may use him, or not); whether Orla's brother reached Brevos.

## Art (162b)

Four backdrops: `b9_muster` (by day the drill: companies in blocks, the Malazan sergeant walking the front rank, the train behind; in Ch 2's phase 1 the evening: tents, lamps at the tailboards, the tile-woman and Yelt, the squad's fire), `b9_wagons` (the train by day; the city drawn only in Ch 1–2, so later Letherii cards can fall back on it), `b9_c2_yardnight`, `b9_c2_road` (the landward gate, the escort's files going out, the foreigners' dust far ahead). Ground `b9_c2_muster` (Book Five's lines with Book Nine's dust; wagons, barrels, oxen, the water-cart, a lamp-lit tailboard, sword racks, the drill post, a rail fence) and battle cover `t` (lashed barrels). Figures: `brennet` (replacing 160's sprite: the studded apron, padded cap, the wagon-pin), `b9_c2_orla`, `b9_c2_saffa`. Three items on Book Nine's dust-brown ground. 34 KB.

## Engine

No engine change. Two things outside the usual shape, both from this file only:
- The shared scene `SCENES.b9_muster` (160) gets a caption getter so its caption follows the backdrop: evening in Ch 2's phase 1, 160's own caption otherwise (a chapter's `scenes:` may not overwrite another file's scene; lint).
- The trick's battle half wraps `atkCalc`, `ai` and `squadTurnStart`, guarded by `b9On()`.

## Tests

`python3 build.py`; `node --check` on both files; `node tools/lint.mjs` (0 errors); `tools/b9ch2_test.mjs` 18/18 (both keys from the same moment, every fight's start and forced win, the trick, the reading, Brennet joins and waits, the Rations moves, "Not now" on every onward step, a "yes, but" on every check, a --from=2 style transfer save that reloads with both halves, no page errors); trope_scan: B9 within every budget.

## Claude's calls (David may overturn any)

1. The chapter opens on the first evening with the first drill already behind the squad (narrated), so the reading's set text ("the drill over") fits the first halt; the drill fight is the next morning, still the Letherii's first fight.
2. The key is given by Ennic on the last day; the drill road plays on the drill field.
3. Thegg +1 and `b9_c2_drilled` set at the key; the +2 Rations at the loading's end (always reached: both outcomes of its check go on).
4. The chapter's one ration "yes, but" is the ambush at the train's yard (a barrel split). No own-scene ±1.
5. One ally (an escort sentry) in the main fight.
6. Brennet remembers the Sixth from before the river (a wagon out of the mud).
7. Orla's coat is given on either outcome of the cart check, so the item is never lost.
8. The step gives +`lvT()` armour (3 at level 11, 4 at 14), the Line-copies' growth, rather than the Gate Drill's flat +2/+3.
9. The Malazan sergeant wears Book Seven's `b7_malsgt`; the sparrers and the corporal Book Two's `b2soldier`.
