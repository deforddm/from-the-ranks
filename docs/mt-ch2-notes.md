Wed Oct 28, 2026, PDT. Book Five, Chapter 2, "Trate" (`src/82_b5_ch2.js`, art `src/82b_b5_ch2_art.js`, Harbour Tiles in `src/89_b5_games.js`), against v8.0.0 on `book5` (not shipped).

# Chapter 2 notes: Trate

Trate, Lether's northernmost city, some days after the wave (MT ch 6; the Sixth stays into ch 13; `mt-canon.md` §1.2, §17c). The wave came "with the last spears of sunlight", read as a summer evening (§17c, Claude's call). The Sixth is lent to the Trate Legion to clear the harbour. The first evening on the quays; the first hulk at dusk (the squad's first sight of Edur sorcery); the strand by the Shake boats, where the Sixth's lines are and Brune joins; weeks of the harbour; the harbour master's bounty (the key); the key fight; the war declared; the barges up the river.

## Shape

- **Areas (3):** `b5_c2_quay` (the harbour front, evening; ground `b5_c2_quay`), `b5_c2_hulk` (the first harvest ship on her side, dusk, dark; ground `b5_c2_hulk`), `b5_c2_strand` (the strand south of the quays, night, dark; ground `b5_c2_strand`). A fourth ground, `b5_c2_wharf`, is for the two fights on the quay's edge (the harbour is the `#` along one side), as Chapter 1's `b5_c1_walk`.
- **Nodes:** 64 `b5_c2_*` dialogue nodes (the tiles, the card, the tiles' way back, and Harbour Tiles' after-node in 89 included).
- **Phases:** `S.f.b5_c2_ph` 1 the first evening on the quays (set at `b5_c2_start`), 2 after the first hulk (set at `b5_c2_hulk_after`: the strand, Brune, the fish-hook), 3 weeks on (set at `b5_c2_weeks`: the bounty and the key), 4 after the key fight (set at `b5_c2_wreckers_after` or `b5_c2_tide_after`: the war, the barges). The strand is shut until the first hulk is cleared ("the harbour master wants the first hulk cleared before anybody pitches a tent").
- **The first halt** is the quay (`b5_c2_start`; `b5TileChoice(2)` there, at the fire, and at the tile-woman when Perrit is not walking). `B5READ[2]`: scene `b5_trate_harbour`, "the wet planking of the quay, beside a coil of rope", a summer evening with the mist coming in (the table `mt:2`); `back` is a small node, `b5_c2_tiles_done` ("Back to the work."), which returns to whichever map the squad is on, so a reading taken on the strand does not jump to the quay.
- **The fire** `b5_c2_fire` (id kept for the games pass): `again:` by phase; `b5TileChoice(2)`; a rest once a phase (`b5_c2_rest2`, `b5_c2_rest3`, `b5_c2_rest4`); the pay desk; the squad's talk (`b5_c2_fire_talk`, one line per squadmate present, by phase and key; Ruuk and Pessa have a line each for synthetic saves); the fish-hook; Harbour Tiles (89); the way on by phase and key; "Not now." last (the roster choice goes before it). `ROSTER_FIRES.mt[2] = ['b5_c2_fire']`.
- **The pay desk** `b5_c2_pay`: at the clerk's tent on the strand and from the fire, `debtHTML('The Sixth Company · Trate')` and `b5PayChoices('b5_c2_fire')`, with an `again:` line. The clerk's tent (`b5_c2_clerk`) reads the Ch1 key (the five lines, or the rope's forty).
- **The quartermaster** sells salves at 6 docks on the strand (`b5_c2_qm`).

## The key `b5_c2_key` (the wreck)

Chosen at the harbour master's board on the quay, weeks on (`b5_c2_bounty`): the bounty on the second hulk's cargo, with her dead still aboard, and one tide to do one or the other. "Not yet" steps away, and the harbour master's figure brings the board back.

- **`salvage`**: +40 docks to the squad (at the key). If Brune walks or waits, `b5Forgive('brune', 30, 'The harbour master's salvage bounty')` (`S.f.b5_c2_forgiven = 30`; her 60 halves, so the engine's `easing` gives her +1 loyalty once). Tobet +1, Perrit +1, Brune −1 (walking only), Ammet −1. The dive into the hold (`b5_c2_dive`, either outcome) lands the cargo (`b5_c2_hauled`: `S.f.b5_c2_hauled = 1`, gain `b5_c2_sealcoat`, "salvor's right", a custom the harbour master makes up on the spot). The dead stay in the hold. **The key fight is `b5_c2_wreckers`** that night, from the fire.
- **`dead`**: no docks. Brune +2 (walking or waiting; she sees it), Ammet +1, Thegg +1. The dive brings out the crew; `b5_c2_laid`: `S.f.b5_c2_laid = 1`, the harbour's dead and the poachers laid side by side on the quay for their people; the Shake come and lay shells; gain `b5_c2_shells` (from Brune if she walks, else from the Shake woman). **The key fight is `b5_c2_tide`** at the evening tide.
- **Read from Chapter 1:** on `swim`, Thegg goes down into the hold ("I have been under once this year already"), at the bounty and at the dive, and has +2 on the dive (the brief's +2 on any check to dive: there is one, `b5_c2_dive`, Might 14). On `pay`, Perrit's sums make the salvage tempting: "eight a line … the first eight anybody's taken off since Letheras", one line at the bounty.
- **"Yes, but" debts never press anyone.** `b52Owe` (this file) puts a 5–20 dock "yes, but" on the roller only if it leaves them at or under `pressed`; otherwise the scene takes another cost (rattled). Two of the chapter's seven "yes, but"s are debt: a Legion net (10) and a Legion tarpaulin (8). The others are skin (the pilot's swells, the boat's rope, the dive), nerve (the lamp lost in the hold) and lost rest (the night watch). After a Ch1 `pay` most of the squad is a few docks short of pressed, so most of those fall to the other cost, which is the point.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b5_c2_key` | `salvage` / `dead` | the key |
| `b5_bruneDone` | 1 / 2 / 0 | Brune walks / waits with the Shake boats / was turned away (set at `b5_c2_brune`; unset if never asked) |
| `b5_bruneHook` | 1 | the fish-hook scene (Brune and Ammet both walking) |
| `b5_wraithSeen` | 1 | the shapes in the first hulk's rigging (set boarding her, always passed) |
| `b5_trate` | 1 | set again at the start (Chapter 1 sets it) |
| `b5_c2_hulkDone` | 1 | the first hulk cleared (always) |
| `b5_c2_hauled` | 1 | salvage: the cargo landed |
| `b5_c2_laid` | 1 | dead: the dead laid on the quay |
| `b5_c2_forgiven` | 30 | salvage with Brune walking or waiting: the bounty paid down her boat |
| `b5_c2_wreckDone` / `b5_c2_tideDone` | 1 | the key fight won (salvage / dead) |
| `b5_c2_war` | 1 | the war news (always, before the end) |
| `b5_c2_weeks` | 1 | the weeks of the harbour (the delegation's rumour) |
| `b5_c2_pilotOk` | 1 | the trick was learned |
| `b5_c2_lootDone`, `b5_c2_watchOk`, `b5_c2_boatOk`, `b5_c2_wave`, `b5_c2_cart` | 1 | the optional scenes |
| `b5_tiles` | `{net, won, lost, done}` | Harbour Tiles was played (89); `b5_tilesNet` the tiles' net pay so far (cap 12); `b5_tilesLast` the last result |

Items read later: none by the brief. `b5_c2_shells` and `b5_c2_sealcoat` say which key was taken if a later chapter wants a line.

## Docks and debts in this chapter

- **Docks in:** the looters' shed-owners +8 (optional fight), the Legion's rate for the first hulk +10 (always), the weeks' harbour money +6 (always), the night watch's purse +5 (Wits 13), the salvage bounty +40 (salvage only). Harbour Tiles: net capped at +12 once a book. A `dead` playthrough finds 16–29 docks plus the tiles; `salvage` 56–69.
- **Docks out:** a tooth, 1; salves at 6.
- **Debt moves:** Brune joins (walking or waiting) with her own 60; salvage −30 on Brune's if she walks or waits. "Yes, but" debts 8 and 10, on the roller, only with room.
- **Salves in:** the Shake woman's, for a boat up the shingle (Might 13).

## The recruit: Brune

- She asks the Sixth for work at the Shake boats on the strand (`b5_c2_brune`, from phase 2): "Walk with us" (`b5Join('brune')`), "Stay with your boats for now" (`b52Wait()`: what `b5Join` does with no room, on purpose: `S.f.b5_bruneDone = 2`, at camp, her debt in the paybooks), "The Sixth can't take you" (`S.f.b5_bruneDone = 0`), or "Not now". If six already walk, "Walk with us" leaves her waiting (the engine's note) and the node says so.
- Waiting, she stays at the boats (`b5_c2_brune_again`: "Walk with us now" through `b5SwapIn`), and the roster at any fire can bring her in. The salvage bounty still pays her boat, the dead still move her (+2), and the end shows her lifting the spear from the strand.
- Walking, she has a line at the fire (by phase), at the key, at the dive, at the dead laid out and the tide, at the war news, at the road and in the end lines, and her own scenes (the join, the fish-hook). Her line: "The Shore takes everything back. I would just like it to wait." No queen, no witch, no royal line: the Shake on the page are fishing families.

## Inventions (Claude's calls)

- **The harbour master** (unnamed): his board, his ledger, his gaff; the harbour pays the Legion by the wreck and the Legion pays the Sixth. He sells the second hulk's cargo twice (a chit before the notice, the bounty after); the wreckers' boss has the first chit.
- **The old harbour pilot** (unnamed, never the pilot scow's crew) at the end of the long quay: forty years over the bar; saw the water "lean" before the bell. The Pilot's Eye.
- **The Legion's cart for the drowned**; the Legion's rate for a cleared hulk; "salvor's right" for the sealskin coat.
- **The Shake on the strand** come up the coast for the drowned and the salvage; a Shake woman with a boat; the shells (white, one black here and there, never explained).
- **The second hulk** keeps its dead on `salvage`; on `dead` the Shake take the poachers' dead out to sea on the morning tide, the harbour's go to the Legion's burial.
- **The dockers' counting-tiles** (Harbour Tiles): plain bone squares with pips, two of each from one to nine; nothing of the Holds on them.
- No new named people.

## Canon as written

- Trate: the lighthouse on the harbour front and the Tarancede Tower on its rocks in the south of the harbour, both only seen; the Tower black and doorless. The market's Fent and Nerek curios and a jar of teeth nobody can name. The flower dancers, one line ("they have gone on dancing since the wave"). The Trate Legion holds the town. Its sorceress is a robed figure on the sea wall above the harbour mouth, "the Legion's sorceress, a docker tells you", never named, never met, never at the lighthouse.
- The wave, told by the harbour master: evening, summer, the last of the sun; three sail; the pilot scow went out and came back faster; the alarm bell; "the sea stood up"; the ships riding on top of the water. No toll ("the Legion's still counting; I've stopped"), no damage list, nothing of what carried them, never a spirit, never worship.
- The harvest ships with their dead crews and the shapes in the rigging. A few wraiths stayed aboard (the brief's call): unexplained; Perrit says it was held "from a long way off". The one in the drowned man's coat is a shadow wearing a coat, never a raised corpse.
- Weeks on, rumour only: the King's delegation (the Prince, the First Eunuch, Finadd Moroch Nevath, Finadd Gerun Eberict) has sailed north to talk about the seals. At the end the war: "From the Preda, through the Legion: the Edur have declared war on Lether"; the Edur's answer to the talk about the seals, "the runner says". The Sixth goes up the river by barge to Kraig's Landing to guard a regiment's barges. The river is never named; the barge-stage is "by the river mouth". Trate is still the Legion's when the squad leaves; nothing foreshadows its fall.
- Never the pilot scow, the Ceda's chamber, the Dolmen, inside the Tower or the lighthouse, the riverside warehouses' street, Seren, Buruk, Nekal Bara, any named Edur, or Edur lands.

## Engine additions in this file (all guarded or scoped)

- `TRICKS.b5_c2_pilot` and `AB.t_b5_c2_pilot`: the Long Listen (`b4_c6_listen`), copied: once a fight, the bearer watches; the first enemy to move is marked (+2 to hit it for the squad to the end of the next round); no flanking the squad until the bearer's next turn. Its battle halves wrap `boonFoeTurnStart`, `flanked`, `atkCalc` and `squadTurnStart`, each guarded by `b5On()` and keeping its own state (`B.b52eye`, `u.b52markUntil`), as Book Four's are guarded by `b4On()`.
- `drawFeature` is wrapped (82b) so battle cover `t` on `b5_c2_quay`, `b5_c2_wharf` and `b5_c2_hulk` is a crate and nets, salvage chests under a tarpaulin, or bales and an oar-bench; other styles pass through.
- `GLOSSX.mt` gains three rows (the Trate Legion, the harvest ships, Tarancede Tower).
- **89:** Harbour Tiles (`playHarbourTiles`, `b5TilesPay`, `B5G_TILESCAP`), and the wrap of `b5_c2_fire` beside the Wager Board's.
- **13 (audio, the lead's to-do):** `PLACE` rows for both chapters' scenes and grounds: Letheras's (`b5_c1_*`) to the city (the court indoors), Trate's (`b5_c2_*`) to the sea (the hold indoors). `audio_test` checks seven of them.

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b5_c2_looters` (optional) | the flooded sheds | 110 | `b5_c2_looter` ×3 (kind `b5_c2_looter`, hit and run), `b5_c2_looterbow` (kind `b5_letherii_bow`, a sling); Guile 13 round the back (surprise) |
| `b5_c2_hulk` (main) | the first hulk at dusk | 170 + 80 | `dark`; the hold: `b5_wraith` ×3, a wave at round 2 (one more out of the dark); `stage2` *The deck*: `b5_c2_drowned` (boss, drain) + `b5_wraith` ×4; Wits 14 down the hatch quiet (surprise) |
| `b5_c2_wreckers` (salvage) | the quay at night | 170 | `b5_c2_wreckboss` (boss) + `b5_c2_wrecker` ×3 + `b5_deserterbow`; Wits 14 round the sheds |
| `b5_c2_tide` (dead) | the quay at the evening tide | 170 | objective: survive 4 rounds, the brief's words; `b5_wraith` ×4, a wave of 2 at round 2 |

A playthrough fights two or three: 420–530 base, 252–318 xp, level 3 → 4 (the brief's curve).

The brief gave the writer foes `thug` and `bruiser` kinds; this chapter's artist drew `b5_c2_looter`, `b5_c2_wrecker` and `b5_c2_wreckboss`, so those foes use their own figures, as Chapter 1's did.

**Balance** (`tools/balance.mjs`, a scratch `--patch` setting each fight in a fresh Book Five state at level 3, the four, a tile from `B5POOL[2]`, two salves; no rule changed; the harness's smart policy under-uses Ammet):

| Fight | Soldier, level 3 (win · health lost · downs) | Bridgeburner, level 3 |
|---|---|---|
| `b5_c2_looters` | 100% · 7% · 0.00 | 100% · 10% · 0.00 |
| `b5_c2_hulk` (both grounds) | 100% · 15% · 0.06 | 81% · 41% · 1.38 |
| `b5_c2_wreckers` | 100% · 12% · 0.06 | 100% · 18% · 0.06 |
| `b5_c2_tide` | 100% · 12% · 0.06 | 100% · 17% · 0.00 |

16 smart runs each (the harness prints ch 0 and level 1 in its own columns; the patch sets Chapter 2 and level 3). Soldier meets the target (a smart player wins every fight). The hulk, the main fight, is about Bridgeburner's target (81%); the other three are easier than 75–80% on Bridgeburner. That is a balance question for David, not changed here.

## Left open on purpose

- What was holding the shapes, and from where (Perrit: "from a long way off").
- The black shell on the Shake cords.
- Whether the harbour master sold the cargo twice on purpose.
- What came out of the jar of teeth.

## Canon points I was unsure of

- Whether the Legion's own soldiers would refuse a hulk after dark: written as the Legion's men finding work elsewhere, never as cowardice.
- The barge-stage "by the river mouth": Trate is a port with barges coming downriver (W15); the stage is placed so it is never the riverside warehouses' street.
- The delegation as rumour "weeks on": the novel has it sail between ch 6 and ch 11; the chapter never dates it.

## Deviations from the brief

- **Harbour Tiles is built here, in `src/89_b5_games.js`**, as Chapter 1 built the Wager Board: the session's order asked for the fire's game, its test and its screenshot. It wraps the fire from 89, so the chapter file only keeps the id.
- `B5READ[2].back` is a small node of its own (`b5_c2_tiles_done`), not the fire, because the first halt (the quay) and the fire (the strand) are on different maps.
- The quay's `D`, `M`, `H` and `<` and the hulk's `<` are extra trigger letters beyond the brief's ground keys, as Chapter 1 added its own.
- Writer foes' kinds, above.

## Tests

- `tools/b5ch2_test.mjs` (19 checks): a fresh Chapter Two after a `swim` Chapter One through the quay (the reading, the Finadd, the harbour master and the wave, the market and the tooth, the cart, the looters, the trick), the first hulk (both grounds forced, the Pilot's Eye run inside it: no flanking, the mark, +2, done at the bearer's turn), the report and the gaff, the strand (the fire, Brune's join, the fish-hook, the squad's talk, the pay desk, the quartermaster, the Shake woman's boat), Harbour Tiles played through its DOM, the weeks and the night watch, the bounty; `salvage` (the docks, Brune's boat, the loyalties, the dive, the coat, the wreckers, the war, the road, the end) and `dead` from the same moment (the loyalties, Thegg's +2 on the dive, the dead laid, the shells, the tide fight, the end); Brune waiting (the roster offers her; the bounty still pays her boat; the dead still move her) and turned away; and a --from=2 style save after `pay` where every node renders in every phase, with Brune and without.
