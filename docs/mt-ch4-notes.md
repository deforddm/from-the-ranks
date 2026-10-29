Thu Oct 29, 2026, PDT. Book Five, Chapter 4, "High Fort" (`src/84_b5_ch4.js`, art `src/84b_b5_ch4_art.js`), against v8.0.0 on `book5` (not shipped).

# Chapter 4 notes: High Fort

The Sixth goes north from Kraig's Landing through the forest to High Fort, the Whitefinders' own station, to wait there for its battalion, which never comes (MT ch 16–18; `mt-canon.md` §1.4, §5, §17c). It has left the river before Trate falls, and hears of the fall only from a straggler. The march (the ford, the river carry, the hill); High Fort, the evening and night before (the posting on the westernmost rampart, the reading, the brand-pots, the cadre-master, the view, the Grass Jacket, the gully patrol); the battle from the west rampart (the eleven die, the wraiths, the break, the key); then the surrender as word down the line, and the road south, disarmed or armed.

## Shape

- **Areas (4):** `b5_c4_road` (the forest road, day; ground `b5_c4_road`), `b5_c4_rampart` (the west rampart under the bastion tower; ground `b5_c4_rampart`), `b5_c4_gully` (Dry Gully at night, dark, the optional patrol; ground `b5_c4_gully`), `b5_c4_wood` (the wood west of the fort, failing light, dark, `run` only; ground `b5_c4_wood`). The fights use the rampart, gully and wood grounds (`t` is a wicker-and-turf breastwork, a boulder or a fallen trunk; `#` wall, tower or bank).
- **Nodes:** 66 `b5_c4_*` dialogue nodes (the tiles, the card and the tiles' way back included).
- **Phases:** `S.f.b5_c4_ph` 1 the march (set at `b5_c4_start`), 2 High Fort, the evening and night before (set at `b5_c4_north` on arriving), 3 the battle (set at `b5_c4_dawn`).
- **The first halt** for the reading is the arrival on the west rampart (`b5_c4_arrive`), because the brief puts the reading there ("the western rampart … the night before the battle"); `b5TileChoice(4)` is also at the fire and the tile-woman (when Perrit is not walking). `B5READ[4]`: scene `b5_highfort`, "the turf by the fire, beside a helm set down crown-first" (the table `mt:4`), back `b5_c4_tiles_done` ("Back to the rampart."). `say` is a getter so Ruuk's line appears only when he walks. The vision (Nekal Bara, mt-canon §12) is the visions pass's; the reading only opens it.
- **The fire** `b5_c4_fire` (the west rampart's fire; no game, by the brief): `again:` by phase; `b5TileChoice(4)`; a rest once a phase (`b5_c4_rest1..3`, phase 2 in practice); the pay desk; the squad's talk (`b5_c4_fire_talk`, one line per squadmate present, by phase, and by the Ch3 key for Perrit); the way on by phase (the gully, sleep, dawn, the crest, and after the wraiths "On, along the rampart", which resumes the battle wherever a "Not now" left it: `b54Next()`); "Not now." last (the roster choice goes before it). `ROSTER_FIRES.mt[4] = ['b5_c4_fire']`.
- **The pay desk** `b5_c4_pay`: `debtHTML('The Sixth Company · High Fort')` and `b5PayChoices('b5_c4_fire')`; the clerk says nothing is for sale at High Fort and paying still works, "even here", with some surprise. **No quartermaster's salves** in this chapter (the brief).

## The key `b5_c4_key` (the rampart)

Chosen at `b5_c4_key`, after the wraiths (`b5_c4_wraiths_after`): the charge at the far end, and the Grass Jackets coming back off the gully ramparts running, past the end of the line and through the Sixth. "Not yet" steps away; the fire brings it back.

- **`hold`**: Thegg +1, Ammet +1, Ruuk −1 if walking ("We could have been in the trees"). A bound demon appears inside the rampart out of nothing (`b5_c4_hold`). **The key fight is `b5_c4_demon`**; then the horns, the demon gone, the Jheck's wolves among the wounded on the field (one line), and a wolf's tooth at the rampart's foot. The squad carries its wounded, the garrison's and three Grass Jackets' in through the gate (`b5_c4_wounded`, a Might 13 check; on a fail it is slower and costs a salve, but it is always done): **`S.f.b5_c4_wounded = 1`**. The word down the line (`b5_c4_word`, `S.f.b5_c4_word = 1`): the fort has surrendered, "And the whole frontier with it", the Queen and the Prince taken, the terms. The pile (`b5_c4_pile`): **`b5Disarm()`** (`S.f.b5_disarmed = 1`); knives, shields and the clerk's case stay. The long file south (`b5_c4_south`), the Sixth in the middle of it, never with the royals' end. `chapterEnd(4, 'hold')`.
- **`run`**: Ruuk +2 if walking, Tobet +1, Thegg −1 ("I stand behind. I do not run. I ran."). West with the Grass Jackets into the wood (`b5_c4_run`, the `b5_c4_wood` area), armed, no `b5Disarm`. The wolves are at the wounded behind, on the field (one line, heard). **The key fight is `b5_c4_wolves`** in failing light; the tooth on the moss after. Out on the road south (`b5_c4_road_out`) ahead of the column of the disarmed, who bring the word. `chapterEnd(4, 'run')`.
- **Read later** (by the brief): Ch5 reads `b5_c4_key` and `b5_disarmed` (the disarmed column and the rearming on `hold`; the press-gang check +2 on `run`); Ch6 reads the key (the front of the crossing on `hold`, the second rank on `run`); the finale reads it for every fate page.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b5_c4_key` | `hold` / `run` | the key |
| `b5_disarmed` | 1 | `hold`: set by `b5Disarm()` at the pile (`S.f.b5_stash`, `S.f.b5_stashWho` with it) |
| `b5_c4_wounded` | 1 | `hold`: the wounded carried in through the gate |
| `b5_c4_moroch` | 1 | Moroch seen far off on the royals' rampart (the view, phase 2) |
| `b5_ruukCarried` | 1 | Thegg carried Ruuk over the stream (both walking at the ford) |
| `b5_c4_stone` / `b5_c4_herb` | 1 | Ruuk's stone for Perrit / herb for Ammet (Ruuk walking, and the other) |
| `b5_c4_mages` | 1 | the eleven died (at dawn, always) |
| `b5_c4_unlinked` | 1 | the cadre-master came along the line and did not link Perrit (or found no mage) |
| `b5_c4_trate` | 1 | the straggler's talk of Trate's fall heard |
| `b5_c4_brandOk` | 1 | the trick was learned (`b5_c4_brandTried` 1 once tried) |
| `b5_c4_gullyDone` | 1 | the optional patrol fought (`b5_c4_patrol` 1 once ordered, `b5_c4_paid` 1 once paid) |
| `b5_c4_wraithsDone` / `b5_c4_demonDone` / `b5_c4_wolvesDone` | 1 | the fights won |
| `b5_c4_word` | 1 | the surrender's word heard (both keys) |
| `b5_c4_rations` | 1 | the garrison's bread and a salve (the posting's Guile 13) |
| `b5_c4_grassWord`, `b5_c4_view`, `b5_c4_posted`, `b5_c4_arrived`, `b5_c4_night`, `b5_c4_ford`, `b5_c4_crossed`, `b5_c4_hill`, `b5_c4_helmGot`, `b5_c4_toothGot` | 1 | scenes seen |

Items read later: `b5_c4_helm` and `b5_c4_wolftooth` and `b5_c4_pitchpot` are trinkets, so `b5Disarm` leaves them; a Ch5 writer may name the brand-pot once on the road (line only).

## Docks and debts

- **The brief's Ch4 debt row is "No money."** No fixed debt moves are made.
- **Docks in:** the garrison's patrol rate +8 (`b5_c4_reported`, only after the optional gully). The brief's "about 25–40 docks a chapter" is not met here on purpose, since Ch4's own row says no money; 0–8 docks.
- **"Yes, but" costs** (eight): skin (the ford, a knee on a stone), debt (the garrison's rations against the roller, 6, or a lost rest), skin (the brand-pot's pitch on the fingers), rest (carrying the Grass Jacket's barrel), debt (a garrison lantern broken in the gully, 8, or thorn), skin (a sleeve alight at the crest), a wrench (the last of the wounded), skin (the thorn-brake in the wood). Two of eight are debt, each only with room (`b54Owe`, as `b53Owe`: never into `pressed`).

## The recruits

- **Ruuk** (if walking): guides the march ("Not that way. The map lies. Come."); is carried over the stream by Thegg (if Thegg walks); brings Perrit the stone and Ammet the herb on the hill (if they walk); the reading (he goes to look at the gully); the fire (the birds gone off the pass; "He carried me … Nobody asked him."); the key (the trees); `hold` ("We could have been in the trees", then on the road south, "you carried them in … I will remember it"); `run` (his wood, grinning); the end lines. Without him, an unnamed Faraed scout from the Landing guides (`b5_c3_faraed`'s figure) and there is no carry and no gifts. Waiting (a `--from=4` save), he is in the roster at the fire.
- **Brune** (if walking): the forest roof, the ford ("Even this goes to the sea"), the straggler (she was in Trate), the fire and its talk (facing south, the sea), the key, the pile (her fish-spear on it), the road south, the end lines.
- **Pessa** has a fire line for synthetic saves only (she joins in Ch5).

## Inventions (Claude's calls)

- **The garrison's Finadd** (unnamed): short, square, two pencils, a list; "Keep the wolves off it." **The old hand** (unnamed): nineteen years on the rampart, three Finadds and a well; the brand-pots; he is the one who names "Moroch Nevath … the Prince's Finadd" once.
- **The fort's cadre-master** (unnamed, one of the eleven: he is going east to the stone fort): "I do not link a junior I have not tested to eleven who have." Perrit is never linked, never one of the eleven, and never called the last of anything.
- **A Grass Jacket** (unnamed) back for water: "Wraiths first … And wolves. Wolves at the back. For after."
- **A soldier off the coast road** (unnamed, the Trate Legion flash): "Trate. Gone. From the sea, in a night … They didn't kill the townsfolk. Just us." Never the lighthouse, the tavern, the crossroads, Rhulad or the Crimson Guard. On Ch2 `dead` he knows the Sixth as the company that carried the dead out.
- **The brand-pot crate**, chalked *NOT FOR THE QUEEN*.
- **The march's stream** took the bridge the map promised; the ford.
- **The rations**: the garrison's bread and a salve from the bastion's chest.
- No new named people.

## Canon as written

- High Fort on pasture, the forest to the south (the road comes out of it); corner bastions with engines; earth ramparts; the largest bastion tower at the west end. Dry Gully about a thousand paces north, three ramparts along it (the Grass Jackets forward on them), the small stone fort on the easternmost, the royals' rampart with the Dresh ballistae nearer the fort. The Queen's Battalion and the Quillas Brigade came in "yesterday … falling back on the fort from the pass, which the Edur crossed first". The garrison on the walls. No Preda.
- The Whitefinders: the Sixth is ahead of its battalion, which "should" be five days from First Reach; it does not come, and nobody on the page knows why (the novel's ch 20 burning of the ground comes in Ch5).
- The battle, headline only from the west rampart: the sorcery goes out from the royals' end and is turned back along the links; **every one of the eleven dies**; a column of white lightning far east, and hundreds before it stop; the wraiths lead, a bound thing goes out like a lamp and is among the Grass Jackets, the garrison's ballistae on the bastions; the charge at the far end taken apart by sorcery ("Later the count will be thousands"); the Grass Jackets break and run; the Jheck's wolves among the wounded (one line each road); the fort's horns; the word ("The fort has surrendered. *And the whole frontier with it.* The Queen is taken, and the Prince."), never the delegation; the terms, disarmed and let go.
- Never the Queen's rampart, the stone fort, the capture, Moroch's fall or the messenger, Trull, Lilac, Fear's tent, the river scene, Hanradi; never a named Edur; never Moroch's group on the road (the hold file is "among people it does not know … The Sixth is not with them, and does not try to be"); never the basin or B'nagga (the wood is "the edge of the Jheck's country").

## Engine additions in this file (all guarded or scoped)

- `TRICKS.b5_c4_brand` and `AB.t_b5_c4_brand`: Book Four's Oil Bola (`b4_c4_bola`), copied: once a fight, range 4, `scatter` and `throwArc`, a 1d6 blast on the mark, a 3×3 of `B.fires` for 2 rounds (`txt:'the burning pitch'`, `b5pitch:true`). Not sorcery. The level step on the burn is added as 74 adds it: a `blog` wrap sees "is caught in the burning pitch." and a `hurt` wrap adds `lvT()` to the next hurt, both only while `b5On()`.
- `mkAlly` wrapped (guarded by `b5On()`) so `b5_c4_garrison` grows with the squad exactly as 80's `b5_regular` does.
- `drawFeature` wrapped (84b) for `b5_c4_road`, `b5_c4_rampart`, `b5_c4_gully`, `b5_c4_wood` only (battle `t`). Other styles pass through.
- `GLOSSX.mt` gains two rows (the Grass Jackets, Dry Gully).
- **13 (audio):** `PLACE` rows for the chapter's grounds and scenes: the road and the forest backdrop to the forest, the wood to the forest at night, the rampart and the battle to the siege, the field to the hills, the gully to the night, the surrender to the plain. `audio_test` checks seven of them.
- `tools/b5ch4_test.mjs` (new; `run_all` picks up every `*_test.mjs` by itself).

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b5_c4_gully` (optional) | Dry Gully at night | 120 | `dark`; `b5_unblooded` ×3 + `b5_edur`; Wits 14 through the brush (surprise) |
| `b5_c4_wraiths` (main) | the west rampart | 170 + 90 | allies `b5_c4_garrison` ×2 (grown with the squad); `b5_wraith` ×3, a wave of 2 at round 2; `stage2` *The bastion's foot* (`keepAllies`): `b5_wraith` ×2 + `b5_unblooded` ×2 at the tower door; Wits 13 brand-pots along the crest (surprise) |
| `b5_c4_demon` (hold) | inside the rampart | 110 + 70 | `b5_demon` (boss) + `b5_wraith` ×3; `stage2` *The back slope*: `b5_demon` again + `b5_unblooded` ×2, **survive 4 rounds** "until the horns sound and the Edur stop" |
| `b5_c4_wolves` (run) | the wood, failing light | 180 | `dark`; `b5_jheck` ×3, a wave of 1 at round 2; Wits 14 downwind (surprise) |

A playthrough fights two or three: 440–560 base, 264–336 xp, level 5 → 6 (the brief's curve; the chapter test ends at level 6 both ways).

BALANCE_TABLE

## Left open on purpose

- Why the battalion never came (Ch5 has the novel's answer: it burned the ground on its retreat).
- What the Grass Jackets who ran became, and the three the Sixth carried in.
- What the demon was, and whether it was hurt.
- The old hand and the garrison's Finadd after the surrender.

## Canon points I was unsure of

- **The demons' "vanish and reappear"** is shown in text (a demon goes out like a lamp and is among the Letherii; the Sixth's demon steps back, is not there, and is there again on the back slope as the second area). The engine has no hide-and-reappear mechanic (80's notes list "hide 2" for `b5_demon`, but no such skill exists in the battle engine): **an engine need, reported**.
- The cadre-master is one of the eleven (he says he is going to the stone fort, where four stand); the sources give none of the eleven a name or a role, so he stays unnamed.
- The royals "came in yesterday" falling back on the fort: the canon sheet has the Queen's force falling back on the fort after the Edur crossed the pass first, but not on which day.
- The garrison soldiers' shield rim (red-brown, no fingertip) is the artist's call: no source describes the garrison's kit.

## Deviations from the brief

- **"`b5_wraith` ×5, a wave of 2"** is read as five in all (three, and a wave of two); **"`b5_jheck` ×4, a wave of 1"** as four in all (three, and a wave of one). The balance numbers below are for that reading.
- The reading's halt is the arrival at High Fort, not the chapter's first node (the road), because the brief puts the reading on the rampart the night before; the road has no tile choice.
- `b5_c4_garrison` uses its own figure (the artist's) rather than the `b5_letherii` kind, as Chapters 1–3 did with their writer foes.
- Extra trigger letters beyond the brief's ground keys: the road's `h` (the hill) and `^` (on to High Fort); the rampart's `v` (the firing step) and `^` (the sally-steps); the gully's `e` (the tracks) and `v` (back); the wood's `w` (the wolf sign) and `v` (the road south). A fifth backdrop, `b5_c4_forest`, for the forest road and the wood, so the march and the run have backgrounds that match.
- Docks: 0–8 in this chapter, against the shared "25–40", because the chapter's own row is "No money" (above).

## Tests

- `tools/b5ch4_test.mjs` (19 checks): a fresh Chapter Four after a `watch` Chapter Three with Ruuk walking, through the march (Ruuk guides; the north shut until the ford; the carry; the hill's gifts), the arrival and the reading (the Wall), the posting and the rations, the trick and the brand-pot, the cadre-master, the Grass Jacket, the straggler (and the hard limits on his words), the view (Moroch far off), the gate, the fire (no game) and its talk, the pay desk, the gully patrol and its pay, the night, dawn and the eleven (Perrit's grief after `watch`; never "last"), the wraiths with the garrison (both grounds forced, the Brand-Pot thrown and burning inside), the break and the helm; `hold` (the loyalties, the demon both grounds and the survive objective, the tooth, the wolves' line, "Not now" and the fire's resume, the wounded, the word, `b5Disarm` with a spear on the pile and the trinkets kept, the file south, the end at level 6) and `run` from the same moment (the loyalties, the wood, the edge locked, the wolves, the tooth, the road armed, the word, the end at level 6); after a `warn` Chapter Three without Ruuk (the scout, the noted company, Perrit's warmer line); and a `--from=4` style save (Brune walks, Ruuk waits) where every node renders in every phase and both keys and the roster swaps Ruuk in.
- The session's checks: TESTS_LINE
