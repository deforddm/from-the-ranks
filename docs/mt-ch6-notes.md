Thu Oct 29, 2026, 3:49 AM PDT. Book Five, Chapter 6, "Brans Keep" (`src/86_b5_ch6.js`, art `src/86b_b5_ch6_art.js`, its game in `src/89_b5_games.js`), against v8.0.0 on `book5` (not shipped).

# Chapter 6 notes: Brans Keep

The army of Lether at Brans Keep, and its destruction there (MT ch 22–23; `mt-canon.md` §7.2, §8, §9, §10, §17c). The eve in the Whitefinders' lines on the right, across the dry channel: the order of battle as the Preda's orders, the King's bounty, the drill-sergeant's guess at the white fingertip, the foragers by the lake, the fire. The night. The tiles at dawn. The day, from the dry channel: the sorceries, the towers, the pillars on the left and the centre, the Preda's standard going under far off; the Edur who came over the lake beds, hand to hand and without sorcery; the break. The key: hold the crossing (the book's one mortal fight, then the hills with the Jheck hunting) or go back over with the first who break, toward Dissent. The pillars lift and what they carried comes down; the keep burns; the Emperor's declaration, heard; the barrow, seen far off at night; the fallen named once, and who carries their debts.

## Shape

- **Areas (4):** `b5_c6_lines` (the eve, dusk to night; ground `b5_c6_lines`), `b5_c6_channel` (the dry channel in battle, day), `b5_c6_hills` (the hills behind the keep, on `stand`), `b5_c6_dissent` (the road south-west toward Dissent, on `fallback`). Battle grounds: those four, and `b5_c6_shore` (the lake shore, battle only: `.` shingle, `,` reeds, `#` the lake).
- **Nodes:** 57 `b5_c6_*` dialogue nodes in 86 (the tiles, the card and the tiles' way back included), and `b5_c6_drill_after` in 89. That is three short of the brief's 60–80: the day is told in three long nodes (sorcery, clash, break) rather than spread thinner, which suited a battle the squad watches far more than it fights.
- **Phases:** `S.f.b5_c6_ph` 1 the eve (set at `b5_c6_start`), 2 the day (set at the night's "First light", or the dawn node), 3 after (set going up into the hills or onto the Dissent road), 4 the night of the barrow (set at `b5_c6_barrow`). **The day's steps:** `S.f.b5_c6_day` 0 in the channel, 1 the sorceries seen (`b5_c6_sorcery`), 2 the clash (`b5_c6_clash`), 3 the break (`b5_c6_break`, the key). Ennic in the channel, the far lip (`n`) and the crossing (`-`) all lead to the next step, so "Not now" never strands the player.
- **The first halt** is `b5_c6_start` (the eve). **The reading is at dawn** (see Deviations): `b5TileChoice(6)` is on `b5_c6_dawn`, the first halt of the battle day, and on the tile-woman from phase 2 when Perrit is not walking. `B5READ[6]`: scene `b5_branskeep`, "a shield laid face up on the grass, its white fingertip at the top" (the table `mt:6`), back `b5_c6_tiles_done` ("Back to the lines."); `say` is a getter (Pessa sits in if she walks). The vision (the Preda, mt-canon §12) is the visions pass's; the reading only opens it.
- **The fire** `b5_c6_fire` (the eve): an `again:` line, a rest once (`b5_c6_rest`), the pay desk, the squad's talk (one scene each, before the paybook and paid up), Thegg gives Pessa her pack back (both walking, once), the bounty if not yet paid, the Whitefinders' Drill (from 89, phase 1, once), the roster (38c adds it), "Sleep. The morning comes early." (phase 1, after the bounty) or "To the crossing. It is time." (phase 2), and "Not now." last. `ROSTER_FIRES.mt[6] = ['b5_c6_fire']`.
- **The pay desk** `b5_c6_pay`: `debtHTML('The Sixth Company · Brans Keep')`, `b5PayChoices('b5_c6_fire')`. Reached from the fire, the bounty table and the clerk.
- **The quartermaster** sells salves at 6 docks on the eve (`b5_c6_qm`).

## The key `b5_c6_key` (the channel)

Chosen at `b5_c6_break`, when the right sees what has happened to the rest of the army and a pillar turns toward it. "Not yet" steps away; the far lip, the crossing and Ennic bring it back.

- **`stand`**: "Hold the crossing. Let the battalion go back over." (`tag:'mortal'`, the text ending "(a mortal fight: whoever falls here stays down)"). The mortal fight **`b5_c6_channel`** (`mortal:true, hurtMost:true`), then `b5_c6_channel_after`: **`S.f.b5_c6_fallen` = the ids killed** (from `S.f.lastFallen`; an empty array if none), set here, the moment it is known, rather than after the hills (nothing between can change it). Ennic is wounded (`S.f.b5_c6_ennicHurt = 1`): Ammet stitches him if she walks, else two of the battalion's surgeons (`S.f.b5_c6_stitched` `'ammet'` / `'surgeons'`); he lives. **Every survivor +1 loyalty** (`b56Survived`, once; `S.f.b5_c6_survived`). Then the hills: `b5_c6_hills` (not mortal), the Errant's shrine, the ridge (the declaration), the barrow.
- **`fallback`**: "Back over the channel, with the first of them. Toward Dissent." Thegg −1 ("We left the crossing"), Pessa +1 if walking ("We left the crossing. Good."), Tobet +1. `S.f.b5_c6_fallen = []`. The Dissent road: the sutler's cart, the flight `b5_c6_flight` (not mortal); after it **Ennic is wounded here too** (a wolf past a shield; Claude's call, so that Chapter 7's "Ennic, wounded" holds on both roads), the road at dusk (the declaration), the barrow from the road.
- Both roads end at `b5_c6_end` → `chapterEnd(6, key)`.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b5_c6_key` | `stand` / `fallback` | the key |
| `b5_c6_fallen` | array of ids | squadmates killed in `b5_c6_channel` (empty on `fallback`, or if nobody fell). Each is also in `S.dead` (`ch:6`) and `S.f.b5_heirs` |
| `b5_heirs` | `{id: docks}` | the engine's: each dead soldier's debt, passed to the heirs. **On Ch5 `sign` the house adds its interest at the barrow** (a tenth, rounded up, once): `S.f.b5_c6_heirsWritten = 'house'`; on `refuse` the clerk writes them without (`'army'`) |
| `b5_c6_ennicHurt` | 1 | Ennic was wounded (both roads) |
| `b5_c6_stitched` | `ammet` / `surgeons` | who stitched him |
| `b5_bounty` | 1 | the King's bounty for the stand was paid on the eve |
| `b5_barrowSeen` | 1 | the barrow seen raised, far off (both roads) |
| `b5_c6_pack` | 1 | Thegg gave Pessa her pack back on the eve (both walking) |
| `b5_c6_fingerOk` | 1 | the trick learned (`b5_c6_drillTried` once tried) |
| `b5_c6_shoreDone` | 1 | the optional lake shore fight won |
| `b5_c6_shrine` | `took` / `gave` | `stand` only: the Errant's dish on the hill path, emptied (8 docks) or added to (one dock) |
| `b5_c6_cart` | 1 | `fallback` only: the sutler's cashbox opened (8 docks) |
| `b5_c6_survived` | 1 | the survivors' +1 after the stand |
| `b5_c6_channelDone`, `b5_c6_hillsDone`, `b5_c6_flightDone` | 1 | the fights won |
| `b5_drill`, `b5_drillLast`, `b5_drillPaid`, `b5_drillBest` | object / 1 / % | the Whitefinders' Drill played (held, total, locked); paid once a book |

Items read later: `b5_c6_paint` (whoever carries it repaints the squad's bosses on the eve of a fight: the fire's rest says so here, and a later fire may); `b5_c6_lakestone` "the only thing anybody brought out of that field that nobody owes for".

## Docks and debts

- **The brief's Ch6 row:** the King's bounty for the stand, `b5Forgive(id, 30, 'the King\'s bounty for the stand')` on the sergeant and every walking soldier (not those waiting at camp: "every walking soldier"), never more than is owed, once (`b56Bounty`, `S.f.b5_bounty = 1`). The dead's debts pass to the heirs by themselves (`kill` in 80); never charged to the squad; said once, plainly, at the barrow (`b56Heir`, the brief's heirs table word for word in substance).
- **Docks in:** the quarter's pay, a day early, at the bounty table +15 (always); the foragers' purse +10 (the optional shore fight); the Errant's dish +8 (`stand`, if taken) or the sutler's cashbox +8 (`fallback`, Might 12). So 15–33, plus the drill's 10 (the Finadd's purse, once a book, as the table closes).
- **"Yes, but" costs** (nine): bruised (the drill-sergeant's drill, the trick), debt 8 or rattled (a forager's meal sack into the lake, the reeds; money is the scene), cut and bruised (the line locks late at the crossing), bruised (the scree), debt 10 or rattled (a Riven's dropped kit written to the roller, the field wall), bruised (the cashbox's lid); and the drill's own. Two of nine are debt, each only with room (`b56Owe`, as `b55Owe`: never past `pressed`).
- **The collectors:** at the bounty table, if any soldier is `pressed` or worse, the clerk says the bounty helps and does not help enough (one line).

## The recruits

- **Pessa** (if walking): the bounty ("So the King thinks I'm worth thirty docks dead. Good. I've a figure now."), her pack given back by Thegg (both), the fire's scene (the barge, her husband plainly, "argue with them"), the reading (she sits in), the key ("I'll do what the soldiers do."), the stand ("So this is the soldiering"), the fallback ("Good."), the flight, the barrow, the end lines.
- **Ruuk** (if walking): the fire (counting fires), the key ("Both are roads."), the hills ("Not that way. The map lies. Come."; +3 on the scree), the flight, the barrow ("He does not name any birds tonight."), the end lines.
- **Brune** (if walking): the lake path and the shore fight (still water), the fire, the key ("The Shore takes everything back. I would just like it to wait."), the barrow, the end lines.
- Waiting recruits come in through the roster at the fire, as everywhere.

## Inventions (Claude's calls)

- **The old drill-sergeant** (unnamed; thirty years in the Whitefinders, twenty as drill-sergeant): his guess that the white fingertip is a drill nobody remembers is a drill (boss to boss, finger to finger, rim over rim). It is only his guess, and the narrator never confirms it.
- **The foragers' sergeant** and the battalion's foragers buying meal off the Dissent farmers, bringing it in along the lake.
- **The quarter's pay a day early** at the bounty table, "because the army would rather owe nothing to the dead". The clerk writes out the heirs for every line the night before, as the army asks.
- **The Riven soldier let go to carry word**: the Emperor's declaration reaches the squad through a Letherii the Edur took on the field and released (both roads), so the squad never sees the Emperor or any Edur close after the battle.
- **The house's factor at the barrow** (on Ch5 `sign`): he comes up from the field ("The Edur let the Letherii write their dead. Subjects, it seems, may keep books.") and writes the dead to the heirs with the house's tenth. The squad never goes down to the barrow.
- **A wayside shrine to the Errant** on the hill path, a holed dock carved over its door and a dish of eight docks nobody takes.
- **A sutler's abandoned cart** on the Dissent road.
- **The fallen are left on the crossing** (the shadow is coming; no time to carry them) and go into the barrow with the rest; the squad sees it raised and knows they are in it.
- **"The battalion's commander is dead, or taken; nobody knows which"** (Ennic at the end): left open; Chapter 7 may say either, or nothing.
- No new named people.

## Canon as written

- The order of battle (W *Battle*): the Crimson Rampant Brigade on the far left where the hills meet the Dissent River; the Snakebelt and half the Riven before the ridge; the King's Battalion at the keep's walls; the Merchants' before the lake; the right across the dry channel: the Artisans, the other half of the Riven, the Whitefinders. The Ceda absent ("in Letheras, on his tile", as talk). A mage on each corner tower, unnamed.
- The K'risnan raise dark streams of dust; the Letherii answer with a wave of white fire; the wraiths go forward as fodder; the pillars rise; the sorceries meet; both corner towers fall with their mages and mangonels; the magic runs wild; the pillars come down on the left and the centre. **The Preda's standard goes under** far off, never her name in the scene, never how (the squad says "That was the Preda's" about the standard). Perrit feels every link in the army go (she is unlinked, as at High Fort).
- The right fights hand to hand with the Edur who came over the old lake beds, late, "without sorcery" (R23); then it sees the rest of the army gone and a pillar coming, and breaks. Tomad and Binadas are never named; the soldiers call their army "the ones who came over the lake beds".
- The pillars lift and bones, armour and debris come down (headline: "armour and broken things and what was in the armour"); the keep burns; the Jheck hunt survivors in the hills with a few wraiths; the Emperor declares the Letherii his subjects, refuses to call it a victory, orders both armies' dead into one barrow, ready by midnight (heard). The squad never sees the Emperor.

## Engine additions in this file (all guarded or scoped)

- `TRICKS.b5_c6_finger` and `AB.t_b5_c6_finger`: the Line (`line`, `t_line`), copied: once a fight, the bearer and every squadmate beside them take +3 + level step armour and cannot be flanked until the bearer's next turn (`B.line`, which 31's `lineCovers` already reads). Not sorcery.
- `GLOSSX.mt` gains three rows (the dry channel; the King's bounty, after it is paid; the barrow at Brans Keep, once seen).
- `drawFeature` wrapped (86b) for the five `b5_c6_*` styles only (battle `t`). Other styles pass through. The art reuses Chapter 5's `b55Fire` and `b55Cart` (85b, loaded first).
- `SCENEX.b5_branskeep` redrawn (80's placeholder); new backdrops `b5_c6_eve`, `b5_c6_pillars` (towers standing at day 0, down from day 1), `b5_c6_break`, `b5_c6_barrow`.
- Guarded figure placeholders (`??=`) for the shared figures, as the brief allows.
- **89:** the Whitefinders' Drill (`playDrill`, `b5DrillPay`), the wrap of `b5_c6_fire` that offers it (phase 1, once), `b5_c6_drill_after` and a journal line. Written with the chapter, as Chapters 1–5 wrote theirs; the header comment says so.
- **13 (audio):** `PLACE` rows: the lines and the eve at night (`camp_night`), the lake shore (`lake`), the channel, the pillars and the break (`siege`), the hills (`hills`), the Dissent road (`plain`), the barrow (`barrow`). `audio_test` checks the nine.
- `tools/b5ch6_test.mjs` (new; `run_all` picks up every `*_test.mjs` by itself).

## The Whitefinders' Drill (89, `b5g_drill`)

At the Sixth's fire on the eve, once, in phase 1. Book Three's Shield Wall for the engine: the old drill-sergeant counts, two of the Second Company swing drill-poles at the line, and the shields go boss to boss when a pole reaches the line, not before and not after (a 170 ms window, paced by the speed setting). Three counts (4, 5 and 6 poles, each faster), then the lock on three (a 260 ms window). As the table closes, once a book: **10 docks from the Finadd's purse** for finishing the drill, and **Thegg +1 loyalty** at nine in ten held and a clean lock (if he walks). Leaving early pays nothing. Deeds: `b5Drill`, `b5DrillClean`.

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b5_c6_shore` (optional, the eve) | the lake shore | 130 | `b5_jheck` ×3, a wave of 1 at round 2; Wits 15 through the reeds (surprise) |
| `b5_c6_channel` (`stand`, **mortal**) | the crossing on the dry channel | 200 + 100 | `mortal:true, hurtMost:true`; **`b5_edur` and `b5_unblooded` only** (2 + 3, a wave of 2 unblooded at round 3); a Whitefinder regular (`b5_regular`) beside; `stage2` *The channel's lip*: `b5_edur` ×2 + `b5_unblooded` ×2, a wave of 1, until the pillar's shadow comes and the Edur fall back. Might 15 to lock the line first (+2 if the trick was learned). As the engine has it, those downed in the first ground are dragged up at a quarter health; whoever falls in the second stays down |
| `b5_c6_hills` (`stand`, not mortal) | the hills behind the keep | 160 | `b5_jheck` ×4, `b5_wraith` ×2; Wits 15 over the scree (Ruuk +3) |
| `b5_c6_flight` (`fallback`, not mortal) | the open ground toward Dissent | 170 | `b5_jheck` ×3, `b5_wraith` ×3, a wave of 1 at round 3; Wits 15 along the field wall |

A `stand` road fights two to three (460–590 base, 276–354 xp); a `fallback` road one to two (170–300 base, 102–180 xp). From level 7 (the brief's start for Chapter 6) neither reaches 8; Chapter 7 carries the squad to 8. The fallback road is light on experience by the brief's own fight list (one key fight, no second); a lever if wanted: a second fight on the Dissent road.

**Balance** (`tools/balance.mjs`, a scratch `--patch` setting each fight in a fresh Book Five state at level 7, Chapter 6, the four, a tile from `B5POOL[6]`, two salves, no gear; both grounds of the channel played; no rule changed; 12 smart runs each):

| Fight | Soldier, level 7 (win · health lost · downs) | Bridgeburner, level 7 |
|---|---|---|
| `b5_c6_shore` | 100% · 8% · 0.00 | 100% · 9% · 0.08 |
| `b5_c6_channel` (mortal) | 100% · 17% · 0.17 · **0.00 dead/fight** | 100% · 24% · 0.50 · **0.17 dead/fight** |
| `b5_c6_hills` | 100% · 13% · 0.08 | 92% · 25% · 0.75 |
| `b5_c6_flight` | 100% · 15% · 0.17 | 100% · 19% · 0.25 |

Soldier meets the target (a smart player wins every fight and nobody died in the mortal one). **Bridgeburner is easier than its 75–80%** on the shore, the channel and the flight, as in Chapters 4 and 5 (Book Two's curve against a level-7 squad); the hills come nearest (92%). In the mortal fight Bridgeburner loses a squadmate about one fight in six. No number was tuned (balance goes to David). Levers, if wanted: the channel's first wave at round 2, or without the regular; a third Edur in the lip's ground; a fourth wolf on the shore.

## Left open on purpose

- What became of the battalion's commander ("dead, or taken; nobody knows which").
- Whether anybody else of the Sixth Company (beyond the squad) fell at the crossing; the clerk writes "the company's dead" without a count.
- The drill-sergeant's guess about the finger: a guess.
- Whether the Errant noticed his docks.
- What happened at the crossing after the Sixth left it (`fallback`).

## Canon points I was unsure of

- **Where the lake lies from the right.** The novel's map has Lake Brans closing the east and the Merchants' before it in the centre; the right is across the dry channel. The foragers' shore is "down where the path meets the lake", left vague on purpose.
- **What "the right fought hand to hand" lasted.** The chapter gives it "an hour, for two" before the break; the wiki gives no time.
- **How the declaration reached the Letherii.** Canon has Rhulad declare it on the field; the chapter has the Edur release some prisoners to carry word, which nothing in canon forbids and nothing confirms.
- **The barrow "ready by midnight"** (ebook p. 828) is used as given; the squad sees the torches go out "near midnight".

## Deviations from the brief

- **The reading is at dawn, not at the first halt.** The brief puts `b5TileChoice(K)` among the first halt's choices and the reading's place at "a shield on the grass at dawn … the morning of the battle"; the chapter's first halt is the eve. The choice is on `b5_c6_dawn`, the battle day's first halt, where the place and the light match the table, and on the tile-woman from dawn when Perrit is not walking. The eve's tile-woman says she will come up at first light.
- **`b5_c6_fallen` is set at `b5_c6_channel_after`**, not after the hills: the deaths are known there and nothing between changes them.
- **Ennic is wounded on `fallback` too** (the brief has the wound on `stand`), so that Chapter 7's "Finadd Ennic, wounded" holds on either road.
- **The house's interest on the heirs** is applied to `S.f.b5_heirs` (a tenth, once) on Ch5 `sign`, to make "writing the dead's debts to the heirs, with interest" a number the finale can read. It is never the squad's.
- **57 nodes**, three under the brief's 60–80 (above).
- Extra trigger letters beyond the brief's ground keys: the lines' `L` (the lake path); the channel's `n` (the far lip); the hills' `o` (the shrine), `J` (the wolves' trail) and `v` (the ridge); the Dissent road's `J` (the fleeing) and `v` (on, south-west).
- The chapter's fire game and its after-node live in 89 (as Chapters 1–5 did theirs), since this session wrote the game.

## Engine notes (reported, not patched)

- **`hurtMost` does nothing in Book Five**: Books Two and Three read it in their own after-fight hooks (`b2_hurtMost`, `b3_hurtMost`); 80 has no such hook. The flag is on `b5_c6_channel` as the brief asks, and harmless.

## Tests

- `tools/b5ch6_test.mjs` (19 checks): a fresh Chapter Six after `pay`/`dead`/`warn`/`hold`/`sign` with Pessa walking: every node renders with a visible choice and no hard-limit word; the first halt (the order of battle, no Ceda, the mortal signpost, and Ennic's); the bounty (thirty off six lines, 15 docks, once; Tobet; the factor at the line's end; Pessa); salves at six; the trick (✦ Might 16, the edges, not sorcery, the paint); the foragers and the shore fight (the wave, 10 docks); the crossing on the eve; the fire (rest, pay desk, one scene each, the pack and both loyalties, the roster); **the Drill played through in the DOM** (15 of 15 and the lock; 10 docks once; Thegg +1); the night and dawn; the reading on a shield (the Axe ×3); the day (the dust, the white fire, the towers, the pillars, a standard under; the lake beds, no sorcery; the Edur sword); the break and the key (tagged mortal, the signpost words, both ways, Not yet); **stand with Tobet killed in the second ground**: the fight's foes are Edur and unblooded only, Tobet in `S.dead` and out of the squad, his debt in `S.f.b5_heirs` and off the squad's total, `b5_c6_fallen = ['tobet']`, Ennic stitched by Ammet, the survivors +1; the hills (the fight, the stone, the rain, the shrine, the declaration); the barrow (seen, the house's tenth on the heirs once, Tobet's line to his family on the tenant farm, "not the squad's to pay"); the end; Tobet still dead after. **Fallback** from the same moment: the loyalties, no fallen, the cart, the flight, Ennic, the stone, the barrow from the road, the end. A `run`/`refuse` road with nobody recruited: the second rank and Thegg's line, no factor, nobody fallen, the army's clerk without interest. A `--from=6` style save (Brune walks, Ruuk and Pessa wait): every node in ten states (each phase and day step, both keys, with and without Perrit fallen), the roster offers both, the White Finger locks the line in a fight.
- The session's checks: see the report (the lead's list; `run_all` not run, by the lead's instruction).
- Screenshots at 390px: `/tmp/claude-0/-home-claude/a618115a-4a1c-549c-b1f5-85dc892eec82/scratchpad/mt/shots/ch6/`.
