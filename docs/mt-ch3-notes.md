Wed Oct 28, 2026, PDT. Book Five, Chapter 3, "Kraig's Landing" (`src/83_b5_ch3.js`, art `src/83b_b5_ch3_art.js`, Knucklebones in `src/89_b5_games.js`), against v8.0.0 on `book5` (not shipped).

# Chapter 3 notes: Kraig's Landing

Kraig's Landing, three buildings and a dock up the river from Trate near the Edur border (MT ch 13–15; `mt-canon.md` §1.3, §17c). The Cold Clay Battalion is camped round it, the Snakebelt Battalion's mage cadre has come up from Awl, and two ships at the dock fly the King's banner and the Ceda's. The Sixth guards the regiment's barges. The first evening and night (the news, Ruuk, the trick, the river thieves); the next day (the deserters, the evening's orders, the key); the night of the green fire; dawn (the ash, Fent Reach, the road to High Fort).

## Shape

- **Areas (3):** `b5_c3_dock` (the Landing and the camp, evening; ground `b5_c3_dock`), `b5_c3_barges` (the three barges tied three deep, night, dark; ground `b5_c3_barges`), `b5_c3_bank` (the upriver bank at night, dark, `warn` only; ground `b5_c3_bank`). The fights use the same three grounds (the cheer and the deserters on the dock ground, with `o` the river and `t` crates and barrels).
- **Nodes:** 61 `b5_c3_*` dialogue nodes (the tiles, the card, the tiles' way back, and Knucklebones' after-node in 89 included).
- **Phases:** `S.f.b5_c3_ph` 1 the first evening and night (set at `b5_c3_start`), 2 the next day (set at `b5_c3_morning`, after the river thieves), 3 dawn after the fire (set at `b5_c3_cheer_after` on `watch`, `b5_c3_noted` on `warn`, or `b5_c3_dawn`). The barges are the regiment's by day until the Sixth's first watch (`b5_c3_watch`).
- **The first halt** is the dock (`b5_c3_start`; `b5TileChoice(3)` there, at the fire, and at the tile-woman when Perrit is not walking). `B5READ[3]`: scene `b5_landing`, "the planking of the outer barge, by a hooded lantern", night, the barges three deep and the mist off the river (the table `mt:3`); `back` is a small node, `b5_c3_tiles_done` ("Back to the barges."), as Chapter 2's. Perrit's line is a getter (80c reads it as a string) so Ruuk's not looking can be added when he walks.
- **The fire** `b5_c3_fire` (the barge crews' fire on the dock; id kept for the games pass): `again:` by phase and key; `b5TileChoice(3)`; a rest once a phase (`b5_c3_rest1..3`); the pay desk; the squad's talk (`b5_c3_fire_talk`, one line per squadmate present, by phase and key; Pessa has a line for synthetic saves); Knucklebones (89); the way on by phase and key; "Not now." last (the roster choice goes before it). It reads the Ch2 key: the crews know the Sixth as the company that carried the dead out (`dead`) or that took the harbour master's forty (`salvage`). `ROSTER_FIRES.mt[3] = ['b5_c3_fire']`.
- **The pay desk** `b5_c3_pay`: at the clerk's crate and from the fire, `debtHTML('The Sixth Company · Kraig\'s Landing')` and `b5PayChoices('b5_c3_fire')`, with an `again:` line. The clerk (`b5_c3_clerk`) reads Ruuk's new line and, if it has grown, the sergeant's.
- **The quartermaster** sells salves at 6 docks on the dock (`b5_c3_qm`).

## The key `b5_c3_key` (the fire)

Chosen at `b5_c3_key`, the evening of the second day, after the night's orders (`b5_c3_orders`: the regiment stays in its lines, the Sixth is at the barges all night, and the cadre, the three in the tents and the Ceda strike the Edur villages across the mountains tonight) and the old Nerek hauler's "There were Nerek up there" (`S.f.b5_c3_nerekWord = 1`). "Not yet" steps away; the fire brings the orders back.

- **`watch`**: Perrit +1, Ammet −1. No docks. The fire goes up over the mountains past midnight and the camp cheers (`b5_c3_thefire`, `S.f.b5_c3_fireSeen`); the backlash brings down the outlying shed by the water (`b5_c3_collapse`, `S.f.b5_c3_collapse`): two or three bargemen and a Cold Clay soldier inside, Ammet in the rubble, nobody killed, two who will not walk for a while. **The key fight is `b5_c3_cheer`**: the celebrating comes down to the barge-line for the Nerek haulers; survive 4 rounds, "Fists and boots, nobody killed. Keep them off the haulers until the provosts come." (`S.f.b5_c3_cheerDone`).
- **`warn`**: the runner is Ruuk if he walks, else Tobet: `S.f.b5_c3_runner` (`'ruuk'` / `'tobet'`). Ammet +2, Thegg +1, Perrit −1. The fire comes before the runner is a league up the bank (`b5_c3_runner`, `S.f.b5_c3_ranOut`). The squad goes up the bank after him (the `b5_c3_bank` area; a mark on a dead tree, `S.f.b5_c3_mark`), finds him flat in the reeds, and something on this side watching the villages too. **The key fight is `b5_c3_bank`** (`S.f.b5_c3_bankDone`). The runner "didn't get there… a league short" and does not know whether anybody was there to tell; the narrator says nothing more. At dawn a Cold Clay officer notes the Sixth: `S.f.b5_noted = 1`, `b5Owe('sgt', 30, 'A runner sent without leave, the regiment\'s book')` (`b5_c3_noted`). Ennic signs under it, and says he would have sent him too.
- **Read later** (by the brief): Ch4 reads `b5_noted` (the far western rampart) and, on `watch`, Perrit's grief for the mages she knew; Ch4 writes Perrit's `warn` sheet line. Ch5 reads `warn` (the Nerek family). The finale reads the key for Ammet.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b5_c3_key` | `watch` / `warn` | the key |
| `b5_c3_runner` | `ruuk` / `tobet` | `warn`: who ran |
| `b5_noted` | 1 | `warn`: the regiment noted the Sixth (and fined the sergeant 30) |
| `b5_fentReach` | 1 | Fent Reach's surrender heard (at `b5_c3_dawn`, always before the end) |
| `b5_ruukDone` | 1 / 2 / 0 | Ruuk walks / waits with the scouts / was turned away (unset if never asked) |
| `b5_bruneDone` | 2 | set by the engine if Ruuk walks in Brune's place |
| `b5_c3_trader` | `paid` / `ride` / `talked` | the trader's man (only if Ruuk walks or waits); `b5_c3_traderDone` 1 |
| `b5_c3_nameTaken` | an id | the trader's "yes, but": whose name went in his book (nobody reads it yet) |
| `b5_c3_haulers` | 1 | Ammet saw to the Nerek haulers' rope sores (the cheer reads it) |
| `b5_c3_riverDone` | 1 | the river thieves (always) |
| `b5_c3_cheerDone` / `b5_c3_bankDone` | 1 | the key fight won (`watch` / `warn`) |
| `b5_c3_collapse` | 1 | `watch`: the shed seen falling (on `warn` it is heard) |
| `b5_c3_linkOk` | 1 | the trick was learned |
| `b5_c3_desDone` | 1 | the deserters at the scouts' fire (optional) |
| `b5_c3_nerekWord`, `b5_c3_news`, `b5_c3_orders`, `b5_c3_fireSeen`, `b5_c3_ranOut`, `b5_c3_mark`, `b5_c3_rise`, `b5_c3_ships`, `b5_c3_ennicDay`, `b5_c3_dawn` | 1 | scenes seen |
| `b5_bones` | `{net, games, won, lost, pay}` | Knucklebones was played (89); `b5_bonesNet` the bones' paid net so far (cap 15); `b5_bonesLast` the last result |

Items read later: `b5_c3_ash` (the brief: Chapter 7 may name it once at the fire). `b5_c3_spear` says Ruuk walked (or a scout's trade).

## Docks and debts in this chapter

- **Docks in:** the barge-master's bounty for three barges kept +12 and the regiment's rate for the night +6 (both at `b5_c3_morning`, always), the scouts' thanks +8 (the optional deserters). 18–26 docks plus the game. Knucklebones: net paid as the table closes, capped at +15 once a book.
- **Docks out:** salves at 6; the scout's spear, 2 (only if Ruuk does not walk or wait); the trader's twenty (`b5Pay('ruuk', 20, …)`, if chosen).
- **Debt moves:** Ruuk joins (walking or waiting) with his own 40. The trader's man: pay 20 off it (`b5Pay`), let it ride (`b5Owe('ruuk', 15, …)`: 55 against a start of 40 is over 1.25×, so **Ruuk is pressed**, −1 loyalty and the collectors counted, by the engine), or a Guile 14 to talk the man down to nothing (a "yes, but" of a name taken). `warn`: `b5Owe('sgt', 30, …)`; after a Ch1 `pay` the sergeant owes 420 of a 340 start, and 450 is past 425, so **`warn` after `pay` presses the sergeant** (the collectors counted; the sergeant has no loyalty to move). Both are the brief's fixed moves, so they stand; the brief's own Ch1 call left everyone just short of pressed on purpose.
- **"Yes, but" costs** (seven): nerve (the cadre's link: a nosebleed, rattled), debt (a Cold Clay tent-rope, 8, or a bruise if it would press the roller), supplies (Ammet's salve on the haulers, or rattled if there is none), debt (a regiment lantern in the river, 6, or rattled if it would press), a name taken (the trader), skin (the reeds, cold water to the chest). Two of seven are debt, each only with room (`b53Owe`, as `b52Owe`).

## The recruit: Ruuk

- He comes down from the Faraed scouts' fire to meet the squad (`b5_c3_ruuk`, from the first evening). With room: "Walk with us" (`b5Join('ruuk')`, his spare spear `b5_c3_spear` to the kit). **With Brune walking** (six on the roster): "Walk with us, instead of Brune" (`b5Join` leaves him waiting with the engine's note, then `b5SwapIn('ruuk')` swaps Brune out to wait with the followers; `b5_bruneDone` 2). "Stay with the scouts for now" (`b53Wait()`, or `b5Join` when there is no room: `b5_ruukDone` 2), "The Sixth can't take you" (`b5_ruukDone` 0), or "Not now".
- Waiting, he stays at the scouts' fire (`b5_c3_ruuk_again`: "Walk with us now" through `b5SwapIn`), and the roster at any fire can bring him in. The trader's man still comes for him.
- Walking, he has a line at the reading (he will not look at the tiles), at the fire (by phase), at the key (he offers to run), at the trader's, at the rise, at the scouts' fire, at the knucklebones, at the fire (the birds went up first), on the bank (if he ran), at dawn ("Not that way. The map lies. Come.") and in the end lines.
- **Never the canon scout** (a Faraed boy of about fifteen whom Trull's party kills): Ruuk is seventeen and a guide. One line in the whole chapter (`b5_c3_scouts`, phase 3): a place left empty at the scouts' fire, a scout up the north road not come back; never who or how. **Claude's call: Ruuk is not written as having known the boy.** Nothing in the chapter ties him to it.

## Inventions (Claude's calls)

- **The ships' sailor** (unnamed) on the King's ship: the Ceda's crates carried up to the tents, sealed; "after tonight"; the ash on the deck. **Ennic by day** (`b5_c3_ennic_day`): the officers cheerful and telling him nothing.
- **The Cold Clay soldier** on his bucket (unnamed): the camp's talk by phase: the rumour that a Letherii went over ("No name"), "the sorceress from Trate, and two others" and "tonight", and after the fire "Best thing I ever saw … Nothing came down off them after."
- **The young Snakebelt cadre mage** (unnamed, never one of the three, never in the ritual circle): an apple, ink on her fingers, sent for at sundown; the cadre's link and the practice tile.
- **The trader's man** (unnamed) for the Trate grain trader Ruuk's bio names.
- **The old Nerek hauler** (unnamed): "There were Nerek up there … The ones who would not come down to the river when the traders came." Her sister's people went up long ago. The Nerek in the villages are headline only; no number, no fate, no scene.
- **The barge-master** (unnamed) and his bounty for barges kept; **the river thieves** out of the hills and their boss with a cargo-hook.
- **The outlying shed** is the one that falls; men in it, nobody killed (the canon sheet's "a few men hurt at most").
- **Knucklebones** (89): the bargemen's bones with a lead sinker let into one face ("the Drownings' weight"); a sinker wipes the throw, two (a Drowning) wipe the bank; once a sitting the sergeant may throw a single sinker again for the Errant (Book One's Oponn's coin, as Lether prays). A figure `b5_c3_bargeman` for it (beyond the brief's list, decor only).
- **The Sixth's posting after the Landing:** released to the battalion; north to High Fort, its station, to wait for it, with a guide (Ruuk, or a Faraed scout from the fire). The battalion never comes; nobody knows yet.
- No new named people.

## Canon as written

- The Landing: "three buildings, none of them proud of it": a storehouse, the shed the river leans on, and the hostel, solidly built, two storeys, a tavern below, "officers and merchants". **The squad never goes into the hostel or its tavern**; it is seen from the dock. The Cold Clay Battalion's rows; the Snakebelt cadre's tents with grey piping; the three large tents with guards facing outward, seen from the rise and the barges, never entered; the two ships with the King's banner and the Ceda's ("The Ceda is in Letheras. His banner is here.").
- The news: the council in Letheras as barracks talk from the officers' table (the King wants the Ceda's mages to strike first); the Preda has called the Whitefinders back north from their exercises ("The battalion is coming"); a Letherii went over to the Edur and swore to their king, rumour only, never who.
- The fire: a light on the slope above the tents, then a curtain of green fire over the mountains from one end of the sky to the other, going down on the far side "onto whatever is there"; no sound; the camp cheers; a song. The backlash puts out the lamps and brings down the shed. At dawn a grey-green ash on everything. "Nothing came down off them after" (the soldier). The narrator never says the villages were empty.
- On the bank (`warn`): three wraiths and one Edur unblooded (tall, grey-skinned, a long knife) crouched at the water watching the villages burn; no name, no K'risnan; the grey one goes back across the river.
- Dawn: "Fent Reach has surrendered. The Atri-Preda, and her garrison, and the town, to the Edur, who came by sea." News only; Yan Tovis is never named in text (the glossary row unlocks on `b5_fentReach`).
- One line: on the road out, "a merchant's wagons go past the other way, toward the dock, heavy, iron-banded". Never Buruk or Seren.
- The river is "the river" throughout; the barges "came up the river from Trate".
- Never the ritual circle, the tavern, Buruk's barge, Trull's party or the scout, Yan Tovis's council or the surrender, First Maiden Fort, the war council, or Edur lands.

## Engine additions in this file (all guarded or scoped)

- `TRICKS.b5_c3_link` and `AB.t_b5_c3_link`: the Claw Hand-Cant (`cant`, `t_cant`), copied: once a fight, free (no action), `sorcery:true` (it rides the Hold, so a `nomagic` fight refuses it), an enemy within 6 that the bearer can see; it sets the same marks the hand-cant does (`cantRound`, `cantLeft = 1 + lvT()`), and `31_battle`'s existing check makes the next hits this round criticals. No wrap of any engine function.
- `drawFeature` is wrapped (83b) for `b5_c3_dock`, `b5_c3_barges` and `b5_c3_bank` only: battle `t` is cargo under tarpaulin, a crate and a barrel, or a stand of reeds; `o` is the river (the fights' `pitTxt` is "the river": a shove into it is the edge rule). Other styles pass through.
- `GLOSSX.mt` gains two rows (the Cold Clay Battalion, the Snakebelt Battalion).
- **89:** Knucklebones (`playKnuckles`, `b5gBone`, `b5BonesPay`, `B5G_BONESCAP` 15, `B5G_BARGE`, `B5G_CHAT`) and the wrap of `b5_c3_fire` beside the other two (offered in phases 1–2, once).
- **13 (audio):** `PLACE` rows for the chapter's grounds and scenes: the dock and the tents to the river, the barges, the bank, the green fire and the collapse to the river at night. `audio_test` checks four of them.

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b5_c3_rivermen` (main) | the barges at night | 150 + 70 | `dark`, `pitTxt` the river; `b5_c3_riverman` ×3 (hit and run) + `b5_c3_pole` (reach, shove); a wave from the water at round 2 (three more); `stage2` *The drifting barge*: `b5_c3_riverboss` (boss, rally, shove) + `b5_c3_riverman` ×2, the river on every side; Wits 14 along the cargo in the dark (surprise) |
| `b5_c3_deserters` (optional) | the scouts' fire, day 2 | 100 | `b5_deserter` ×2 + `b5_deserterbow`; Guile 13 behind the bowman (surprise) |
| `b5_c3_cheer` (watch) | the barge-line, after the fire | 150 | objective: survive 4 rounds, the brief's words; `b5_c3_drunk` ×4, a wave of two at round 2; the river along the bottom |
| `b5_c3_bank` (warn) | the reeds upriver, night | 150 | `dark`; `b5_wraith` ×3 + `b5_unblooded`; the river along the west; Wits 14 through the reeds (surprise) |

A playthrough fights two or three: 370–470 base, 222–282 xp, level 4 → 5 (the brief's curve; the chapter test ends at level 5 both ways).

The brief gave the writer foes `thug` and `bruiser` kinds; this chapter's artist drew `b5_c3_riverman`, `b5_c3_pole`, `b5_c3_riverboss` and `b5_c3_drunk`, so those foes use their own figures, as Chapters 1 and 2 did.

**Balance** (`tools/balance.mjs`, a scratch `--patch` setting each fight in a fresh Book Five state at level 4, the four, a tile from `B5POOL[3]`, two salves; no rule changed; the harness's smart policy under-uses Ammet):

| Fight | Soldier, level 4 (win · health lost · downs) | Bridgeburner, level 4 |
|---|---|---|
| `b5_c3_rivermen` (both grounds) | 100% · 24% · 0.44 | 94% · 37% · 1.50 |
| `b5_c3_deserters` | 100% · 6% · 0.00 | 100% · 9% · 0.06 |
| `b5_c3_cheer` | 100% · 14% · 0.00 | 100% · 18% · 0.06 |
| `b5_c3_bank` | 100% · 9% · 0.00 | 100% · 8% · 0.00 |

16 smart runs each (the harness prints ch 0 and level 1 in its own columns; the patch sets Chapter 3 and level 4). Soldier meets the target (a smart player wins every fight). The river thieves, the main fight, were first drafted lighter (Bridgeburner 100%, 0.56 downs); the chapter's own numbers were raised once before this table (a thief 11 → 12 health, the boss 26 → 30, the wave from the water two → three): with a fourth foe on the drifting barge as well, Soldier fell to 83% over 24 runs, so that was not taken. It is still easier than Bridgeburner's 75–80%, and the other three are easy on both; the key fights are the brief's fixed foes (four drunks, three wraiths and an unblooded). That is a balance question for David, not changed further here.

## Left open on purpose

- Whether anybody was in the villages to tell, on `warn`; what the runner would have found.
- The scout who did not come back.
- The trader's man's book with a soldier's name in it (`b5_c3_nameTaken`).
- What the young cadre mage was sent for at sundown.

## Canon points I was unsure of

- The ships' banners are drawn as plain cloth (a gold one, a dark one), because no source describes either.
- The fire "from a hundred leagues apart" is Perrit's guess at the Ceda working from Letheras with the three at the Landing; the canon sheet has them "working with the Ceda" and nothing on the distance.
- The officers at the hostel: the tavern is seen from outside as "officers and merchants", which keeps Seren and Buruk possible there without the squad going in.

## Deviations from the brief

- **Knucklebones is built here, in `src/89_b5_games.js`**, as Chapters 1 and 2 built theirs: the session's order asked for the fire's game, its test and its screenshot. It follows Book One's `playBones` rules but is its own function, because `playBones` speaks in silver and in Hood and Oponn; Book Five's has docks, the sinker and the Errant.
- `B5READ[3].back` is a small node (`b5_c3_tiles_done`), as Chapter 2's.
- The dock's `S`, `T` and `B`, the barges' `^` and the bank's `^` and `v` are extra trigger letters beyond the brief's ground keys, as Chapters 1 and 2 added theirs.
- **The runner is in the bank fight.** The squad finds him in the reeds before the fight, and he comes back at dawn with it; the engine has no way to leave a soldier out of a fight, and this keeps the brief's "the runner comes back at dawn".
- Writer foes' kinds, above.

## Tests

- `tools/b5ch3_test.mjs` (19 checks): a fresh Chapter Three after a `dead` Chapter Two with Brune walking, through the dock (the reading, the Finadd's news, the Cold Clay soldier's rumour, the rise and the tents, the trick and the practice tile), Ruuk walking in Brune's place, the trader's man three ways (paid, let ride and pressed, talked down), the haulers, the fire (the crews read the Ch2 key), the pay desk, the quartermaster, Knucklebones played through its DOM, the first watch and the river thieves (both grounds forced, the Cadre's Link run inside: offered, a mark, the hand-cant's count), the morning's docks, the deserters, the orders and the key; `watch` (the loyalties, the fire, the collapse, the cheer fight, dawn, Fent Reach, the ash, the end) and `warn` from the same moment (Ruuk runs, the loyalties, the bank, the dead tree's mark, the reeds fight, the regiment's 30, the end); without Brune (Ruuk with room, waiting, turned away and the scout's spear; Tobet runs; the crews know the salvage company); and a --from=3 style save (Brune walks) where every node renders in every phase and both keys, and Ruuk waits when six walk.
- The session's checks: `python3 build.py`; `node --check` on the four files; `lint` 0 errors; `repeat_scan` (every Ch3 hub reads `again`); `trope_scan --files` (83: silence 2, nobody 7, the way 1, long 1, man-who 1 in 9,086 words); `recruit_scan` and `recruit_test` pass; `b5ch1`, `b5ch2`, `b5ch3`, `b5engine`, `reading`, `audio`, `gear_roles`, `roster`, `shelf`, `access`, `series`, `onward`, `back`, `fit`, `recheck`, `yesbut`, `trope` pass; `play.mjs 1 --book=mt` plays Chapters 1 to 3 through, and `play.mjs 3 --book=mt --from=3` 3/3 (both keys). `run_all --play=3`: 80/81, the one FAIL `fire_test` (known dice-flaky), which passes alone three times.
