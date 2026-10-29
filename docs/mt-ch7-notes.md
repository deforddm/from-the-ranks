Thu Oct 29, 2026, 11:05 AM PDT. Book Five, Chapter 7, "The Seventh Closure", and the end of Book Five (`src/87_b5_ch7.js`, art `src/87b_b5_ch7_art.js`), against v8.0.0 on `book5` (not shipped).

# Chapter 7 notes: The Seventh Closure

Letheras falls (MT ch 22, 24–25; `mt-canon.md` §7.3, §8, §9, §10, §17c). The night after Brans Keep in the Drownings District: the broken army coming in at the main gate, the city in disorder (headline), the word that the King has been crowned Emperor by his court, the starlings round a dark tower, the City Garrison's bells calling whoever is left. Finadd Ennic, wounded, puts the Sixth at a footbridge over the Quillas Canal by the Low Walk, two streets from where the sergeant was born. The night at the barricade: the brazier, the tiles, the fallen named once, the court's men if a debt is drowning. The day: the citizens on the white walls, wolves loose in the streets, the word of the main bridge, the Edur at the barricade, the sorcery coming down the street and the squad going into the canal under the arch; then the Emperor's word, the killing stopped and a day of suffering decreed. The evening: the canal children's holed dock, the rumours, an Edur patrol at the end of the street, and the three roads. Then the finale.

## Shape

- **Areas (4):** `b5_c7_streets` (the Drownings District at night, dark; ground `b5_c7_streets`), `b5_c7_canal` (the footbridge at night, dark; ground `b5_c7_canalnight`, an alias of `b5_c7_canal` so the audio gets its night bed), `b5_c7_day` (the same footbridge by day; ground `b5_c7_canal`), `b5_c7_walk` (the Low Walk at evening; ground `b5_c7_walk`). The brief's three grounds, with the footbridge drawn twice (night and day) because an area's darkness is fixed when it registers, as Chapter 1 did. Battle grounds: `b5_c7_streets`, `b5_c7_lowwalk` (the Low Walk, `#` the canal), `b5_c7_barricade` (the street, `#` burned walls).
- **Nodes:** 61 `b5_c7_*` dialogue nodes (the tiles, the card and the tiles' way back included).
- **Phases:** `S.f.b5_c7_ph` 1 the night in the streets (set at `b5_c7_start`), 2 the footbridge at night (set going down to it), 3 the day (set at the night's "Morning."), 4 the evening (set climbing out of the canal). **The day's steps:** `S.f.b5_c7_day` 1 the wolves beaten, 2 the barricade fought, 3 under the arch and out. `b57Next()` says where the chapter goes on from after any "Not now", and Ennic by day sends the player there.
- **The first halt** is `b5_c7_start` (the night). **The reading is at the footbridge** (see Deviations): `b5TileChoice(7)` is on `b5_c7_bridge`, the first halt at the barricade, and on the tile-woman at the Low Walk when Perrit is not walking. `B5READ[7]`: scene `b5_letheras`, "a cracked flagstone behind the barricade, by a torch jammed in a cart's wheel, with a dock and a knife laid on it" (the table `mt:7`), back `b5_c7_tiles_done` ("Back to the barricade."); `say` is a getter (Pessa sits on the cart's shaft if she walks). The vision (Moroch on the bridge, mt-canon §12) is the visions pass's; the reading only opens it.
- **The fire** `b5_c7_fire` (the brazier at the footbridge barricade; no game): an `again:` line by phase; a rest once (phase 2); the pay desk, its button saying it matters on the paid road; the squad's talk (one line each, night and evening versions); "Say the names" (once, when anybody fell at Brans Keep); the roster (38c adds it); "Sleep, behind the carts" (phase 2), "The patrol is coming. The roads." (phase 4), "The last of it." (after the key); "Not now." last. By day the brazier is cold and offers only the desk and "Not now". `ROSTER_FIRES.mt[7] = ['b5_c7_fire']`.
- **The pay desk** `b5_c7_pay`: `debtHTML('The Sixth Company · Letheras')`, `b5PayChoices('b5_c7_fire')`; reached from the fire, the clerk in the doorway and the clerk at evening. The clerk says the paid road's arithmetic.
- **No quartermaster's salves**: the quartermaster is at the footbridge with an empty crate (the brief: never in Letheras's last day).

## The key `b5_c7_key` (the road)

Chosen at `b5_c7_roads` (the patrol tile `P` on the Low Walk, the fire, or Ennic at evening), in phase 4, with the Edur patrol coming down the street. "Not yet" steps away. All three are open to every squad.

- **`emperor`**: lay down arms to the patrol and be taken back into the army, which is the Emperor's now. **The paybooks don't change** (`S.f.b5_c7_sealed = 1`; no debt moves). Ennic swears with the rest. Perrit +1, Thegg +1, Tobet −1, Pessa −2, Brune −1. The finale's road page has the one line of rumour the keep-open rules allow (ships across the sea, for reasons nobody knows) and says Book Seven, when it is written, will offer this save. `b57Onward(s)` is true only for a finished `emperor` save.
- **`paid`**: lay down arms and take discharge (`b57PaidOut`, once): every dock in hand on the debts of the discharged (the sergeant and the squad walking), **smallest first** (`b5Pay` in order), so the most go free; then everyone whose standing is `easing` or `free` gets the army's release (`b5Forgive` of the rest). `S.f.b5_c7_spent` (docks spent), `S.f.b5_c7_released` (ids). Everyone else walks out of uniform owing, in Letheras. Pessa +1, Ruuk +1, Brune +1, Perrit −1. No road onward.
- **`ledger`**: out of the ledger (`b57Listed`, once): Ennic writes the squad into the dead roll of the fall; each walking soldier's line (and the sergeant's) passes to the heirs: `S.f.b5_c7_listed = {id: docks}` and `S.debt[id] = 0`. Kept apart from the true dead's `S.f.b5_heirs`, so the finale tells the two apart, and the freed-tally and loyalty steps do not fire. The clerk tears out the Sixth's page (`b5_c7_ledgerpage`). Tobet +2, Pessa +1, Thegg −1, Perrit −1, Ruuk −1, Brune −1. No road onward. Desertion is never named.
- Each road's node shows `debtHTML`, then `b5_c7_last` and `chapterEnd(7, key)`. The book is finished (`bookDone`: `S.chapters[7]` set) and the end screen opens the epilogue.

## The finale (`B5CH7.finale`, read by 37's `showFinale`)

- **`ids()`**: the four and the three recruits. A squadmate walking at the end gets a fate page; anyone else gets a `gone` page: **fallen at Brans Keep** (head "Fallen at Brans Keep": the crossing or the field, the Emperor's barrow, the debt to the heirs from `S.f.b5_heirs` with the house's interest on Ch5 `sign` or the clerk's without, and the name said at the brazier); a recruit **waiting** (head "Waiting", with the company's followers through the fall; the line in the Sixth's book, and that the dead roll or the discharge did not reach them); **sent away** (head "Sent away": the scouts, the strand, the road south); **never met** (head "Another road").
- **Every fate page** says what that soldier's debt became (`B57FIN.debt`: on `emperor` the number, the start, the standing and the holder, the house or the army; on `paid` released or still owing, to whom, in Letheras; on `ledger` the heir from the brief's table) and the strongroom's quarter on `sign`; one line of the book's road (High Fort by Ch4's key, the channel by Ch6's, the canal); Thegg reads Ch1's key (the swim), Brune Ch2's (the drowned or the salvage), Ammet Ch3's (the runner to the Nerek or the watched fire); and a closing line by loyalty.
- **The sergeant's page**: the road; the debt; High Fort, the channel and the canal; the holed dock if carried; the white fingertip.
- **The coda**: the Seventh Closure as everybody in the city says it (rule 40); the Edur in the streets and the day of suffering, never described; the Sixth's small part; the canal under the footbridge; the paybooks; `debtHTML` as the count. Then 37's road list, the dead, the count (`statsHTML`: docks paid down, owed on top, soldiers paid up), "The End of *Indebted*", and the credit to Steven Erikson and Ian C. Esslemont.
- **`labels`**: Epilogue, The squad, Fallen at Brans Keep, Not on the Low Walk, the sergeant's role "Sergeant · Sixth Company, the Whitefinder Battalion", The squad's road, no prologue or paper.
- **Deeds**: Book Five is on the shelf (80's `b5DeedsExtra`: least owed, paid down, soldiers paid up, "Finished in Letheras"). Nothing added there.

## Flags (for Book Seven, if it ever reads a Book Five save)

| Flag | Values | Meaning |
|---|---|---|
| `b5_c7_key` | `emperor` / `paid` / `ledger` | the road |
| `b5_c7_sealed` | 1 | `emperor`: the books under the Emperor's seal |
| `b5_c7_spent`, `b5_c7_released` | docks / ids | `paid`: what the discharge spent, and who was released |
| `b5_c7_listed` | `{id: docks}` | `ledger`: each line that went to the heirs with the dead roll |
| `b5_c7_burned` | 1 | Ch5 `sign`: the house's strongroom burned, a quarter of every debt with it |
| `b5_c7_canal` | 1 | the squad went into the canal under the footbridge (always, before the evening) |
| `b5_c7_stopped` | 1 | the Emperor's word heard: the killing stopped, a day of suffering decreed |
| `b5_c7_word` | 1 | the main bridge's word heard (after the wolves) |
| `b5_c7_courtDone` | `receipt` / `swam` / `fought` | the court's men turned away (only on the canal threat) |
| `b5_c7_threat` | 1 / 0 | `b5DrowningThreat()` as the squad went down to the footbridge |
| `b5_c7_named` | 1 | the fallen named at the brazier |
| `b5_c7_dockOk` | 1 | the trick learned (`b5_c7_dockTried` once tried); the dock is given either way (`b5_c7_dockGot`) |
| `b5_c7_ash` | 1 | the green ash (`b5_c3_ash`) went into the canal |
| `b5_c7_wolvesDone`, `b5_c7_barricadeDone`, `b5_c7_lootDone` | 1 | the fights won |
| `b5_c7_orders`, `b5_c7_bell`, `b5_c7_brazier`, `b5_c7_street`, `b5_c7_purse`, `b5_c7_walls`, `b5_c7_wager`, `b5_c7_news`, `b5_c7_qm`, `b5_c7_garrison*`, `b5_c7_ennic*`, `b5_c7_clerk*` | 1 | scenes seen |

Items read later: `b5_c7_dock` (the trick's token; "carried to Book Seven"), `b5_c7_ledgerpage` (on `ledger` only).

## Earlier flags this chapter reads (each with a default)

`b5_c1_key` / `b5_c1_swam` (Thegg's face to the court's men; Thegg leads into the canal +2; Thegg's page), `b5_c1_receipt` and `b5_c1_weightbag` (the court's men; the brazier and the canal), `b5_c2_key` (Brune's page), `b5_c3_key` (Ammet's page), `b5_c3_ash` (into the canal), `b5_c4_key` (High Fort on every page), `b5_c5_key` / `b5_holder` (the strongroom or the clerk in the doorway; the holder on every page), `b5_c6_key` (the channel on every page), `b5_c6_fallen` (or `S.dead` from Chapter 6), `b5_heirs`, `b5_c6_heirsWritten` (the fallen's pages), `b5_c6_stitched` (Ammet checks Ennic's stitches), `b5_c6_fingerOk` (the brace check; the sergeant's page), `b5_c6_paint` (the brazier's rest), the recruits' `b5_*Done` and `S.camp`.

## Docks and debts

- **The brief's Ch7 row.** On Ch5 `sign` the house's strongroom in the Counters' Quarter burns in the night's looting: `b5Forgive(id, ceil(debt / 4), 'the house's ledgers burned')` on every debtor (walking or waiting), once (`b57Burn`, at the clerk's glow, the start's choice or the way down to the footbridge, whichever comes first). On `refuse` the clerk sits in a doorway all night with the case on his knees. The canal threat: if `b5DrowningThreat()` as the squad goes down to the footbridge, the Drownings court's men come along the Low Walk with a list (`b5_c7_courtmen`): on Ch1 `pay` the receipt (Wits 13, the sergeant +2) turns them away; on `swim` they know Thegg's face and go; else the fight `b5_c7_court`. The roads, above.
- **Docks in:** the cooper's sock (12 after the fight, or 8 if the looters are talked out), the purse in the rubble (10, Wits 13), the slate-man's winnings after the wolves (8). So 18–30, which the `paid` road spends.
- **"Yes, but" costs** (seven): rattled (a deserter knows your name), bruised (the rubble's shutter), debt 5 or rattled (the court's fee for reading its own receipt; money is the scene), bruised (a wolf's tooth on the tiers), bruised (a cart's shaft at the barricade), debt 15 or rattled (a shield lost in the canal; the brief's), a dock gone (the canal children make you drop one first). Two of seven are debt, each only with room (`b57Owe`, as `b56Owe`: never past `pressed`); a failed canal check costs the same 15 (with room) and a rattle, and nobody dies.

## The recruits

- **Pessa** (walking): the brazier's canal ("He's got the odds wrong on the Low Walk"), the fire (the cart's shaft, her line read to the canal; the evening's ledge), the reading, the tiers (+2; "Not on my canal"), the arch's ledge, the canal (+2; finds the ledge first time), the court's list torn up, the children (+2), the key ("I'm not a soldier. Whatever you write, write that."), the emperor road (her boathook back), her page.
- **Brune** (walking): the fire (feet in the canal), the wolves' footbridge ("It will not swim"), the canal (+2; "like a seal"), under the arch ("It held us. It did not take us."), the evening talk, the trick (+1), the key ("This is the waiting. Choose."), her page.
- **Ruuk** (walking): the brazier ("This is not roads. This is a knot."), the fire (naming streets), the morning (wolves: "They hate up. There is no up here."), the rubble (+1), the tiers (+1), the key ("There's always a road"), his page.
- From Chapter 7 a dead core soldier makes room for two recruits (the roster's cap of six); the test walks Pessa and Brune together after Tobet's death. Lines between two recruits stay at the fire.

## Inventions (Claude's calls)

- **The bell-station at the old fish market**, its count "any soldier, here", and the garrison sergeant under it writing down whoever comes; the old garrison sergeant at the barricade (his wife on the walls with a slate).
- **The ledge under the footbridge's arch**, a hand wide and a hand under the water, that every child in the Drownings District knows; the sergeant hung off it as a child. The swimmers put the squad on it.
- **The sergeant's street**: the fourth house on the left, two streets back from the Quillas, the family tally cut on the lintel; the heir of the brief's table is the mother's cousin who has it now.
- **The canal children's holed dock**: drop one into the Quillas for the drowned, keep its twin on a cord; you spin it and do not look. The children give the twin whether the squad learns it or not.
- **The citizen with the slate** (odds on the district's bridges), the cooper whose barrels the looters took, a purse under a shutter.
- **How the day of suffering is heard**: a voice on the bridge in Letherii "with a strange edge to it", calling along the canal. Never what it means.
- **The Edur count the soldiers** in the morning (the `emperor` road's page); the officer with a new band on his arm. Nothing named; no RG ground.
- No new named people.

## Canon as written

- The night: burned houses, looting, the dead in the streets (headline, never drawn); the King crowned Emperor by his court in the new palace (heard; everybody says the Seventh Closure has come, and the narrator never says otherwise); tens of thousands of starlings round a dark tower apart (never named); the City Garrison's bells.
- The day: citizens on the white walls watching the west road and wagering ("Spectators. That's a Letherii talent"); the Edur come down the west road (word by runners); the Jheck loose in the streets as wolves (fought; "some of them are not" wolves; never B'nagga, never the Pack's temple); a Finadd held the main bridge with seventy or so, and fought the Emperor, both fell, and the Emperor got up (a runner's word; nobody along the canal saw it; the bridge and the canal never named); Settle Lake's thump (one line; never why).
- The sorcery: a darkness down the street with the lamps going out ahead of it; a woman at a window, and then the window is dark (suggested, never shown); the squad survives by going into the canal, and the narrator gives no god the credit. The Emperor's word: the killing stopped, a day of suffering decreed, never described.
- The evening: no formal surrender is recorded, so laying down arms is the squad's own; rumours only: Eberict dead in a street near the river, nobody knows who; the King's Champion dead in the throne room, said by people who say they were there (never a hint he returns); the Chancellor sworn to the Emperor.
- Never Moroch's bridge, Main Canal or Soulan Bridge; never a meeting with any canon character; nothing of Rhulad's sword (the brazier's rumourmonger was cut back to Edur eating what they kill).

## Engine additions in this file (all guarded or scoped)

- `TRICKS.b5_c7_dock` and `AB.t_b5_c7_dock`: the Lady's Pull (`pull`, `t_pull`), copied: a chapter trick, twice a chapter (one more from level 5); in a fight the bearer's attack rolls twice and keeps the better (`u.luckyTurn`), free; the next check is −2 (`S.push`).
- **The Pull's check half is hard-wired in 16's `rollDice` to the trick id `pull`.** In Book Five only, and only while the squad carries the Holed Dock and not the Pull, this file answers `pull` with the dock: `trickLeft` and `spendTrick` are wrapped to map `pull` to `b5_c7_dock`; `spendTrick` lends `S.tricks.pull` the dock's bearer for the one line 16 writes next (16 names the spinner with `trickBy('pull')`, which would throw on null), and the wrapped `rollDice` takes the loan back on the re-roll; `note` and `blog` reword "spins the coin. The Lady pulls…" and "<em>The Lady pulls.</em>" in Lether's words; a `MutationObserver` on the sheet rewords the button "Spin the dock · The Holed Dock (n left)". Tested in the DOM. **Reported as an engine need**: a `pull`-like key on the trick (`TRICKS[k].pull = true`) read by 16 would retire all of it.
- `GLOSSX.mt` gains three rows (the City Garrison; the day of suffering, once heard; the dead roll, on `ledger`).
- `B57FIN` and `B5CH7.finale` (the ending, fates, gone pages, the sergeant, the coda); `b57Onward(s)` for a future Book Seven import.
- `drawFeature` wrapped (87b) for the five `b5_c7_*` styles only (battle `t`). The art reuses Chapter 1's `b51Setts`, `b51Water`, `b51Wall`, `b51Skyline`, `TILEX.b5_c1_canal` and Chapter 5's `b55Cart` (loaded first).
- `SCENEX.b5_letheras` redrawn (80's placeholder: the footbridge and its barricade, night, day or dusk by the phase); new backdrops `b5_c7_night`, `b5_c7_walls`, `b5_c7_sorcery`, `b5_c7_under`, `b5_c7_finale`.
- Guarded figure placeholders (`??=`) for the shared figures, and for `b5_c5_quartermaster`.
- **13 (audio):** `PLACE` rows: the streets at night (`city_night`), the night backdrop (`burning`), the footbridge by night (`city_night`) and by day (`city`), the Low Walk fight (`city`), the barricade (`siege`), the walls (`city`), the sorcery (`dark`), under the arch (`lake`), the Low Walk after (`city_night`). `audio_test` checks nine.
- `tools/b5ch7_test.mjs` (new; `run_all` picks up every `*_test.mjs` by itself).

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b5_c7_looters` (optional, the night) | the broken shopfront | 120 | `b5_deserter` ×3, `b5_deserterbow`, `b5_c7_looter` (a writer foe, boss, kind `b5_c7_looter`); Guile 14 talks them out instead (8 docks, no fight) |
| `b5_c7_court` (optional, only on the canal threat) | the Low Walk at night | 120 | `b5_collector` (boss) and `b5_bully` ×3; `objective` survive 4 rounds, non-lethal |
| `b5_c7_wolves` (main, the day) | the tiers | 170 + 80 | `b5_jheck` ×4, a wave of 2 at round 2; `stage2` *The footbridge*: `b5_jheck` ×2 and `b5_c7_greatwolf` (the pack's biggest: boss, kind `b5_c7_greatwolf`). Wits 15 along the Low Walk (surprise) |
| `b5_c7_barricade` (main, the day; not mortal) | the barricade's street | 180 + 90 | `b5_edur` ×3, `b5_unblooded` ×3, `b5_wraith` ×2, a garrison regular (`b5_regular`) beside; `stage2` *The Low Walk*: `b5_edur`, `b5_unblooded` ×2, `b5_wraith`, a wave of 1, until the lamps start going out. Might 15 to brace the carts (+1 with the White Finger) |

The mains give 520 base (312 xp); with both optional fights 760 (456). From level 7 that reaches 8 (the cap) on any road that fights the mains.

**Balance**: see the table below (`tools/balance.mjs`, a scratch `--patch` setting each fight in a fresh Book Five state at level 7, Chapter 7, the four, a tile from `B5POOL[7]`, two salves, no gear; both grounds played; no rule changed; 12 smart runs each).

| Fight | Soldier, level 7 (win · health lost · downs) | Bridgeburner, level 7 |
|---|---|---|
| `b5_c7_looters` | 100% · 8% · 0.00 | 100% · 8% · 0.08 |
| `b5_c7_court` (survive 4) | 100% · 5% · 0.00 | 100% · 7% · 0.00 |
| `b5_c7_wolves` (both grounds) | 100% · 21% · 0.25 | 100% · 27% · 0.58 |
| `b5_c7_barricade` (both grounds) | **92%** · 28% · 1.33 | 100% · 26% · 1.50 |

The barricade is the hardest fight in the book (eight foes, then the Low Walk): **one Soldier run in twelve was lost**, against the target of a smart Soldier winning every fight, and four in five fights see a squadmate down. Bridgeburner is easier than its 75–80% on all four (the same 12-run noise as Chapters 4–6; Book Two's curve against a level-7 squad). No number was tuned (balance goes to David). Levers, if wanted: one wraith fewer at the barricade, or a second garrison regular; the wolves' wave at round 3.

## Left open on purpose

- Whether anybody got the court's list after the fight beyond the squad's own name (eleven names on it; torn up).
- Who, of the garrison soldiers at the barricade, came up out of the canal; the old sergeant came up two arches down.
- What the Edur's count in the morning means for the Sixth (`emperor`), and where the squad goes west along the canal (`ledger`).
- What the day of suffering held (canon never says).
- Where the squad goes after discharge (`paid`) beyond each page's line.

## Canon points I was unsure of

- **Where the Drownings' footbridge is.** The novel's map has the Quillas Canal and the Drownings District; no footbridge by the Low Walk is named. The chapter's is an invention, never Moroch's and never Soulan Bridge.
- **"The main bridge, seventy or so"**: the novel's seventy-three, rounded in a runner's mouth.
- **When the wolves came and when the sorcery came** relative to each other on the day: the chapter puts the wolves in the morning and the sorcery after the Edur reach the barricade; canon has both on the day of the fall.
- **The citizens on the walls "wagering"** is R24 quoting the text; the slate and the odds on bridges are the chapter's.

## Deviations from the brief

- **The reading is at the footbridge, not at the first halt.** The first halt is the streets on the night; the reading's place is "a barricade by a canal … on the night before the Edur come", so `b5TileChoice(7)` is on `b5_c7_bridge` (the barricade's first halt) and on the tile-woman from phase 2 when Perrit is not walking. As Chapter 6 did with its dawn.
- **Extra trigger letters**: the streets' `b` (bell-station), `x` (the shopfront), `h` (your street), `p` (the fallen shutter), `v` (the way down); the canal's `F` (the brazier: the brief's fire is "the brazier at the footbridge barricade"), `^` (back to the streets), `E` (the street the Edur come down), `J` (the tiers); the walk's `P` (the patrol). The footbridge at night uses `b5_c7_canalnight`, an alias of the brief's `b5_c7_canal`, so the audio can tell night from day.
- **Two extra figures**: `b5_c7_child` (the canal children, the trick's place) and `b5_c7_citizen` (the slate-man).
- **The dock is given on a failed trick check too** (the children give the twin anyway), so the item is always obtainable; the trick is only learned on a pass.
- **The `ledger` road's debts are recorded in `S.f.b5_c7_listed`, not added to `S.f.b5_heirs`**, which is the true dead's; both "pass to the heirs" on the page.
- **The `paid` and `ledger` roads touch only the sergeant and the squad walking.** A recruit waiting with the followers is not on the Low Walk; their line stays in the Sixth's book, and their page says so.
- **The canal check's fail path** (the brief gives only the "yes, but"): everybody still gets under, for the same lost shield (15 with room) and a rattle. Nobody dies.
- **Perrit −1 on the canal check** (she never stands with her back to water) beside the brief's four edges.
- **The main fights' foes are the brief's**; the barricade has a garrison regular beside the squad (the City Garrison is at the barricade in the story).

## Tests

- `tools/b5ch7_test.mjs` (27 checks): a fresh Chapter Seven after `pay`/`dead`/`warn`/`hold`/`sign`/`stand` with Tobet fallen at Brans Keep, Pessa and Brune walking and Ruuk waiting: every node renders with a visible choice, no hard-limit word and no exclamation mark in narration; the night (the bell, the starlings, Ennic's orders, the brazier's news, your street); the strongroom (a quarter of every debt, once, on every debtor); the looters' fight (12 docks) and the rubble (10); the footbridge and the threat; the reading (the Gate leans ×3); the fire (rest, the pay desk and its words, a line each, the roster, sleep, Not now; Tobet named once with his heirs); the court's men (the receipt check, and the fight from a copy); the day (the walls, the slate); the wolves (both grounds, the pack's biggest; the main bridge's word; Settle Lake); the barricade (both grounds; the lamps); the canal (Might 14 and its edges; nobody dies; the lamp; the ash into the water; the decree); the evening (the rumours, Ennic, the clerk); **the trick** (✦ Guile 16 and its edges; the dock; **its check half played in the DOM**: a failed roll offers "Spin the dock", spends a charge, pushes the next check, rolls again, and the note is in Lether's words; its battle half); the roads node; **each road from the same moment**: the debts (emperor unchanged; paid all docks on the smallest first and the release; ledger every walking line listed to the heirs, the waiting recruit not, the page torn out), the end screen and the book finished, the onward flag (emperor only), and **the finale page by page** (ten pages: the road, five fates, Tobet fallen and his heirs with the house's interest, Ruuk waiting, the sergeant, the end page with the credit, the count, the Closure, the canal, the paybooks; the fleets' rumour once, on emperor only). Deeds (finished in Letheras). A `swim`/`salvage`/`watch`/`run`/`refuse`/`fallback` road with nobody fallen, Ruuk sent away, Pessa waiting and Brune never met: no strongroom (the clerk in the doorway), the court's men know Thegg's face, Thegg leads into the canal (+2), a failed canal check's cost, the paid road's arithmetic, and the finale's recruit pages (Sent away, Waiting, Another road). A `--from=7` style save: every node renders in ten states (each phase and step, each road), the roster offers both waiting recruits.
- The session's checks: see the report.
- Screenshots at 390px: `/tmp/claude-0/-home-claude/a618115a-4a1c-549c-b1f5-85dc892eec82/scratchpad/mt/shots/ch7/`.

## The session's results (Thu Oct 29, 2026)

`run_all --play=3`: 83/85. **fire_test** (known dice-flaky) passed alone. **los_test**: the barricade's Low Walk had an Edur starting on cover (fixed: 4,1); the same test still fails on Chapters 4–6's maps (`b5_c4_gully`, `b5_c4_demon`, `b5_c5_farm` ×2, `b5_c5_wagons`, `b5_c5_factor`, `b5_c6_channel`, `b5_c6_hills`, `b5_c6_flight`: a foe on a `t`), which this session does not edit. `b5engine_test`'s title check now accepts the blurb with all seven chapters (80 drops the progress line at seven; the test only knew "so far").
