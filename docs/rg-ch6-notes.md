Thu Nov 5, 2026, PST. Book Seven, Chapter 6, "Before the Walls" (`src/126_b7_ch6.js`, art `src/126b_b7_ch6_art.js`, test `tools/b7ch6_test.mjs`), against the Book Seven engine on `book7` (v10.0.0, not shipped).

# Chapter 6 notes: Before the Walls

The Letherii's last chapter: Book Five's squad of the Sixth Company, Whitefinder Battalion, in the army of Lether before Letheras (RG ch 22, and the river battle canon tells after the fact; rg-canon correction 2, §3; W22, R24.1 S1, S7, S9, S10). The battle is **two fights**: the killing field (the cadre's ritual off the ridge, meant for the foreigners and the Edur together; a silver dome far off holds it; the Edur walk home), then days later the Adjunct's landing on the river, where the Letherii army breaks. The Sixth stands **in the line below the ridge, never on it**; sees the dome **from the line, as a coin of light on the horizon**; never sees the circle; meets **the Adjunct's regulars** at the river (never marines, never the Third). Beak is never named, never shown; the dome dims "as a coal goes out".

## Shape

- **Areas (4):** `b7_c6_line` (the line below the ridge, night, ground `b7_c6_field`, dark; '^' the ridge path, '>' the plain's edge past the stakes, 'F' the fire), `b7_c6_dawn` (the same line by day), `b7_c6_bank` (the river bank, `b5_c3_bank`; '^' the water's edge), `b7_c6_walls` (under the walls of Letheras at night, `b7_c6_field`; 'G' the gate, 'F' the fire).
- **Nodes:** 61 `b7_c6_*` (the reading's two included).
- **Phases:** `S.f.b7_c6_ph` 1 the night before (set at `b7_c6_line`), 2 dawn (set at `b7_c6_sleep`), 3 the river (set at `b7_c6_march`), 4 the walls (set leaving `b7_c6_stand_after` / `b7_c6_break_after`).
- **Order:** the Finadd and the Chapter 4 visitor open sleep; the Finadd at dawn opens the plain (the wave); the wave opens the Edur going home and the deserters; going home opens the orders; the orders open the march; the landing opens the key; the key's fight opens the walls; the road opens the end.
- **First halt** `b7_c6_line` with `b7ReadChoice(6)`; the reading also at the tile-woman and the fire (phases 1–2, before the wave).
- **The fire** `b7_c6_fire` (id kept): phase 1 (Tiles, rest `b7_c6_rest1`, talk, `risingHTML()`, "Sleep" once the Finadd and the visitor are done), phase 2 (Tiles before the wave, rest `b7_c6_rest2` after it, the ward, "March" once the orders are read), phase 3 "no fire on the riverbank" (talk only), phase 4 (rest `b7_c6_rest4`, talk, `risingHTML()`, "In through the gate" once the road is chosen). Every list ends "Not now". `ROSTER_FIRES.rg[6] = ['b7_c6_fire']`. Talk: two sets (before / after the wave) for Tobet, Thegg, Perrit, Ammet, Ruuk, Brune, Pessa, Ilsa, Sorvan.

## The key `b7_c6_key` (the battle), at the river as the line wavers

With the Finadd by the standard in the reeds, the line gone either side, `risingHTML()` shown, "Not yet" steps back. Guarded (`!S.f.b7_c6_key`).
- **`stand`** ("From the tree to the rock"): no Rising move. Thegg +1, Sorvan +1, Perrit +1, Pessa −1, Tobet −1. The fight `b7_c6_stand`: a Malazan sergeant's squad (not mortal). After: the sergeant points at the ground and the city road: "Walk." The Sixth walks off the field in order, the Finadd carrying the standard; the foreigners do not lift a crossbow at a walking unit (invention). The broken run down on the flats: one headline line, "giving no quarter to the ones who ran" (R24.1 S9–10), never shown.
- **`break`** ("Into the reeds"): `b7Rise(1, 'the Letherii army broke at the river')`. Pessa +1, Tobet +1, Ammet +1, Thegg −1, Sorvan −1. The Finadd hands the standard to a running levy. The fight `b7_c6_break` (survive 3 rounds, then the reeds). The Sixth comes out whole.
- Both reach the walls by night (Ch7: the Letherii inside the walls at the surrender, rg-canon §4).

## The Letherii's road `S.f.b7_lethRoad` (army / palace / free)

At the walls, Finadd Ennic with the roll on his knee: "what the Sixth means to be" when it is over, written while it is still its choice. Guarded; "Not yet".
- **`army`**: Thegg, Sorvan, Ruuk +1, Pessa −1. Ennic keeps the roll.
- **`palace`**: Ilsa, Perrit +1, Ruuk −1. "Guards who came back"; the Palace Guard.
- **`free`**: Tobet, Pessa, Brune +1, Thegg −1. Ennic writes the discharges, and his own name under the Sixth's.

## Chapter 4's key, read here (the officers' ask, decided)

- **`edur`** (unset reads as `edur`): the eldest Edur from Kravos walks back at night: the Sixth holds the Edur's picket at the plain's edge while the Edur go out, "not follow; hold" (he distrusts the cadre: "people who will not look at you are counting something"). At dawn he steps out of the column: "Hold." After the wave, going home, he stops: **"Your ridge was for us as well"**; the Edur go home, "Your emperor is yours… Have them." (`b7_c6_ask='picket'`, `b7_c6_edurWord=1`).
- **`letherii`**: **what the officers ask (Claude's call): when the Edur go out onto the plain, the Sixth stays in the line, whoever comes with an order to follow.** A rider does come; the Finadd folds the order away. After the wave the captain admits **they knew** from the cadre (Letherii mages talk to Letherii officers) that the ritual was meant to reach the plain with the Edur on it; they did not know the foreigners had anything against it; twelve companies were asked to stay. `b7_c6_ask='stay'`, `b7_c6_askedWhy`, `b7_c6_captainKnew` ('asked'/'quiet'). The officers did not build it and are not named; canon's ritual (watched by the Chancellor's man and a veteran commander, W22) is untouched.

## The Rising and the file

| Where | Move | When |
|---|---|---|
| `b7_c6_deserters` → let them go, or talked out of the bag | `b7Rise(1, 'deserters let go before the walls')` | once (guard `b7_c6_deserters`), the chapter's own ±1; fought: none |
| `b7_c6_key` → `break` | `b7Rise(1, 'the Letherii army broke at the river')` | the key |
| `b7_c6_watcher` "yes, but" | `b7Filed(1, 'he wrote down what you said')` | the chapter's one file "yes, but" |

**`b7HeatTier()` read the night before** (the clerk and the sleep): `clean` quiet; `noted` a lantern counts the sleepers; `watched`/`wanted` **the man in the grey coat** (Ch2's, "he always comes back") sits at the next fire (`grey` NPC). Talked away (guile 15, `rise:true`) the Sixth sleeps; left there, the first two squadmates are **rattled** at dawn (`b7_c6_badNight`). On `wanted` he says the warrant "will keep until after the battle". No arrest in this chapter.

**`rise:true` checks:** the levy at the next fire (wits 14), the grey coat (guile 15), the deserters (guile 15).

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b7_c6_key` | `stand` / `break` | the key |
| `b7_lethRoad` | `army` / `palace` / `free` | the Letherii's road (shared) |
| `b7_c6_standDone` / `b7_c6_breakDone` | 1 | the key's fight won |
| `b7_c6_landingDone` | 1 | the landing fought (always) |
| `b7_c6_dome` | 1 | the Sixth saw the wave and the dome (always) |
| `b7_c6_homeDone` | 1 | the Edur walked home past the Sixth (always) |
| `b7_c6_ask` | `picket` / `stay` | what the Chapter 4 visitor asked |
| `b7_c6_edurWord` | 1 | (edur) the eldest said the ridge was for the Edur too |
| `b7_c6_captainKnew` | `asked` / `quiet` | (letherii) the captain admitted the officers knew; the sergeant pressed him / let him go |
| `b7_c6_deserters` | `fought` / `talked` / `let` | the deserters from the ridge |
| `b7_c6_watcherGone` / `b7_c6_badNight` | 1 | the grey coat talked away / a sleepless night |
| `b7_c6_levyOk` | 1 | the levy told what was on the ridge (+1 on the ward) |
| `b7_c6_wardOk` / `b7_c6_wardTried` | 1 | the trick |
| `b7_c6_news`, `b7_c6_ennic`, `b7_c6_dawnEnnic`, `b7_c6_orders`, `b7_c6_bankEnnic`, `b7_c6_refugees`, `b7_c6_fifth`, `b7_c6_fifthDawn` | 1 | scenes seen |
| `b7_c6_drawn` / `b7_c6_reader` / `b7_c6_noCard` | | the reading (120c) |

Also read: `b7_c2_key` (the grey coat; Ilsa's and the sergeant's pages), `b7_c4_key`, `b7_c4_edurDone`, `b7_c2_ennicEve`, `b7_c5_key` (one line). `b7OtherName()` not used.

## `B7CH6.fates`: the shape, for the Ch7 writer

Book Six's corrected shape (bh-continuity "Fixed" 1). `B7CH6.fates` reads **the Letherii's half of the save**: `S` while they play, `S.th.l` while the Third does (Ch7). Keys and the road from the shared `S.f`.

| Member | Returns |
|---|---|
| `half()` | the Letherii half (`S.th.l` in Ch7) or `null` |
| `road()` | `army` / `palace` / `free` (default `army`) |
| `key()` | `stand` / `break` (default `stand`) |
| `roadPage()` | `{title, scene, paras[]}`. Titles "The army", "The palace", "Out"; scenes `b7_field`, `b7_letheras`, `b7_river`. Paras: Ch2/Ch4 keys, the ridge, the river, the road; last "Sergeant <name>, Sixth Company, the Whitefinder Battalion." |
| `page(id)` | `{title, txt}`; written for `tobet`, `thegg`, `perrit`, `ammet`, `ruuk`, `brune`, `pessa`, `ilsa`, `sorvan`, and `'sgt'` (second person); anyone else a short default. Reads road, key, loyalty (in the Letherii half), Ch2 and Ch4 keys. |
| `pages()` | `[{id, k, label, title, txt, loy, name?}]`: walking (`label:'The Sixth'`), waiting (`'Waiting'`: Ilsa off the Quillas, Sorvan at the horse lines), fallen in Book Seven (`k:'gone'`, no `dead.from`), the sergeant last (`name` = the Letherii sergeant). Book Five's dead (`from` set) get no page. |

For the finale: the Letherii sergeant's portrait needs `b7SgtFor('l')` before drawing and `b7SgtFor('t')` after; use each page's `loy`, not `S.loy`. Text has no `{sgt}`. **The pages describe after Ch7** (the new emperor, never named; the Patriotists' compound fallen and its files carted off; "Brys Beddict" once, on the `army` sergeant page, per rule 66: some of the army will march east with the foreigners; never the Wastes). The `free` road never asserts debts forgiven: "nobody can find the ledgers" (the coin collapse, W19), rule 69 kept.

## The trick: The Cadre's Ward (`b7_c6_ward`)

✦ wits 16 at dawn, before the wave: from the fire ("Perrit is looking at the ridge") or the ridge path. Taught by **Perrit** (the Holds' ward), else **Ammet** (the surgeons' smoke of wet bedding), else **the cadre's old escort** (NPC at the path). Edges: Perrit +3, Ammet +2, Tobet +1, Brune +1, the sergeant +1, the levy's word +1, Thegg −1, Ruuk −1, Pessa −1. "Yes, but": rattled (a nosebleed). **Mechanic: A Courtesy of Darkness** (`dark`): a 3×3 of grey within 5, for 2 rounds (3 from level 5), nothing shoots in/out/through, enemies in it −2 to hit. Not marked sorcery (either way of laying it).

## Items

- `b7_c6_fingershield` (armour, `role:'shield'`, `ac:2, hp:4`): the real number; a battalion parade shield, from the Finadd at dawn (always).
- `b7_c6_ridgecharm` (trinket, `role:'focus'`, `stat:{wits:1}, hp:2`): a cadre charm from the deserters' bag (fought or talked; not on "let them go").
- Drawn in 126b on Book Five's canal-slate ground with the dock-gold rim.

## Fights (numbers for the balance pass; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) |
|---|---|---|---|
| `b7_c6_deserters` | the foot of the ridge, dawn (`b5_c6_lines`) | `b7_c6_deserter` ×2 (own: hp 18, ac 13, atk 5, 1d8+1), `b7_rioter` ×4 | 180 (108), optional |
| `b7_c6_landing` | the water's edge (`b5_c3_bank`), ally `b7_whitefinder` | `b7_malregular` ×3, `b7_malxbow` ×2 | 260 |
| · stage 2 *The second boats* | | `b7_malxbow` ×2, `b7_malregular` ×3 | +160 |
| `b7_c6_stand` | the Sixth's stretch, ally `b7_whitefinder` | `b7_malsgt`, `b7_malregular` ×3, `b7_malxbow`; wave rd 3 `b7_malregular` | 260 |
| `b7_c6_break` | the bank, survive 3 rounds | `b7_malxbow` ×3, `b7_malregular` ×2; wave rd 2 `b7_malregular` | 160 |
| · stage 2 *The reeds* | | `b7_malregular` ×3, `b7_malxbow` | +100 |

Required path 680 raw (408 paid): a `--from=6` save at 10 (2560) ends at **11** either way (the test saw 3096 on break with the deserters). Foes are the engine's `b7_` numbers under 31c's curve.

**Balance** (`balance.mjs --book=rg`, smart, 12 runs, level 10): Soldier — deserters 100% (3 rounds, 4% HP), landing 100% (7, 12%), stand 100% (4, 3%), break 100% (7, 9%, a down in 17%). Bridgeburner — deserters 100% (3, 4%), landing 100% (8, 15%, a down in 33%), stand 100% (5, 9%, 8%), break 100% (8, 19%, a down in 67%). **Under the 75–80% Bridgeburner target**, like Chapters 1–5: `B7GAP` or the foes' numbers are the balance pass's, with David.

## Canon used, and calls

- **The killing field** (W22; correction 2): the cadre a week on the ridge; the Chancellor's man (Sirryn, never named; his banner) and "a commander… an old one" (the veteran commander, a grey banner) watching from the crest, never met; a wave off the ridge over the Edur toward the foreign ring; a silver dome on the horizon holds it and dims; the Edur figures on the unburned patch; the Edur walk home through the Letherii line, east, without looking up (W22, R24.1 S7, R24.2 S9). Hanradi is never named or seen (the eldest is Ch4's invention). Beak never named; nobody says who held it ("something of theirs", "some mage of theirs" as rumour).
- **What happened to the cadre** is not settled: lamps out, the crest smoking, the cadre "carried down the path on stretchers… under blankets" (no deaths stated). Perrit's fate page: "so few of the cadre who stood on the ridge came down it fit to" (unsure: canon fate of the mages not checked).
- **The landing** (R24.1 S9, S10, told after the fact): free margin. One big ship far off "flies a standard nobody on the bank can read" (the Adjunct never seen). No quarter for the broken: headline only.
- **The city** (R24.1 S1, S7): refugees out, "more frightened of what is inside the walls"; the mob holds streets "from the canal to the Pursers' District" and is round the Patriotists' compound "shouting a name… not the Emperor's" (Tehol, unnamed; R24.2 S6, S10). The Edur all gone. A postern by the gate is left unbarred for people leaving (not Sirryn's postern, never entered).
- **The other squad, one line:** the levy's uncle on Ch5's key (`hold`: the mill village held a night, the village went down the river with them; `slip`: they slipped out, the Edur found only the villagers; unset: "the villages hide them").
- **Hard limits held:** never on the ridge, in the circle, at the dome, at Beak's barrow, in the commanders' tent; never Hanradi, Sirryn, the veteran commander or the Adjunct in person. No Burn's Sleep year; never Kettle, Mael, "Tehol the Only", the K'Chain Che'Malle or a never-use name; "Bonehunters" not said; "marines" not said. No exclamation marks in narration (the test checks every node, with "Tehol", "Beak", "Hanradi", "Sirryn", "Adjunct", "marine" outside quotes).
- **Invented and unnamed:** the levy water-carrier and his uncle; the Fifth's sergeant (broken nose); the cadre's old escort; the deserters and their soldier with a cut lip; the provost's corporal; the rider from the hill; the Malazan sergeant with the whistle; the family with the handcart; the gate guard. **No new named person.**

## Unsure, or left open

- Distances: the field "a day out from the city"; the march to the river "a day and a night". Kravos Hill not placed.
- Whether any of the ridge's mages died (left as stretchers and blankets).
- Ch7 may want the Letherii "inside the walls at the surrender": this chapter ends with the Sixth going in through the gate at first light, the morning after the river; the foreigners "coming up the road".

## Engine notes (outside the chapter's own nodes; all in this file or 126b)

- `FOES.b7_malregular/b7_malxbow/b7_malsgt.kind` set to their own kinds (drawn in 126b); placeholders `??=` b2soldier in the chapter file.
- One own foe `b7_c6_deserter` (kind `b5_letherii`).
- Scenes `b7_c6_dome`, `b7_c6_walls` in `CH.scenes`; 126b draws 120's `b7_field` (night / dawn / after) and `b7_river` (boats in / after), the ground `TILEX.b7_c6_field`.
- Glossary: "The ridge", "The landing", "Malazan regulars".
- `B7READ[6]` filled (a shield in the line; Perrit, the tile-woman); back `b7_c6_fire`.
- Nothing the engine lacked; no wraps.

## Tests

`tools/b7ch6_test.mjs` (20 checks): a `--from=6` start (level 10; every node renders over 4 phases × both keys × both Ch4 keys × dome × road, no leak; items, figures, ground, four backdrops), the first night, the reading (Perrit, back `b7_c6_fire`), the levy (rise:true, bruise; the Third's line), the visitor both ways, the fire, the grey coat at watched (file edge, "yes, but" files +1, rattled when left, slept when talked away), dawn (shield), the trick and its battle half (nine tiles of grey), the wave, going home both ways, the deserters three ways (+1 once, the charm), the orders, the landing (both grounds, the Malazans' own figures), the key, `stand` (no move; "Walk."), `break` (+1; survive and the reeds), the walls and the road three ways, the end on both keys at level 11, `B7CH6.fates` (every page × road × key × earlier keys; from `S` and from `S.th.l` after `b7Use('t')`), and a synthetic save (Perrit and Tobet dead, Sorvan waiting: Ammet teaches, the tile-woman reads; Ammet gone: the old escort; the fates list the waiting and the fallen).

Results (Thu Nov 5, 2026, PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (35 warnings, unchanged; `b7_c6_card` in the orphan list like every chapter's card node); `b7ch6_test` 20/20 four times; `play.mjs 2 --book=rg --from=6` 2/2 (both `break`, level 11, no fight lost); `b7engine_test`, `roster_test`, `reading_test`, `trope_test`, `recruit_test`, `audio_test` pass; `trope_scan` B7 inside budget (this file: silence 2, nobody 12).

**Tool edits outside my files:** none. Contact sheet: `/tmp/claude-0/shots/b7/ch6/sheet.png` (the four backdrops in every mode, the three Malazan figures, the ground, the items, at 390 px).
