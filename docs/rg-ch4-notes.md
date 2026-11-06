Thu Nov 5, 2026, PST. Book Seven, Chapter 4, "The Muster" (`src/124_b7_ch4.js`, art `src/124b_b7_ch4_art.js`, test `tools/b7ch4_test.mjs`), against the Book Seven engine on `book7` (v10.0.0, not shipped).

# Chapter 4 notes: The Muster

The Letherii: Book Five's squad of the Sixth Company, Whitefinder Battalion, marched out of Letheras with what is left of the home army to the camp below Kravos Hill (RG ch 15–20 as the lines hear it; rg-canon §3, correction 6; W15–W20). The squad lives in the gaps: the Whitefinders' lines on the lower slopes, the muster gate at the camp's foot, the horse lines. It never goes up the hill road to the commanders' tent, and never into the Edur's camp on the shoulder.

## Shape

- **Areas (4):** `b7_c4_lines` (the Whitefinders' lines at dusk/night, ground `b7_c4_lines`, dark; 'F' the fire, '^' the hill road, '>' east to the horse lines), `b7_c4_gate` (the muster gate by day, `b5_c6_dissent`; 'G' the gate and the crowd, 't' the tables, 's' a sutler's cart, '<' back), `b7_c4_horse` (the horse lines at night, `b7_c4_lines`, dark; 'H' the pickets, 'w' the provost's wagon, '<' back), `b7_c4_dawn` (the lines at dawn, `b7_c4_lines`).
- **Ground `b7_c4_lines`** (124b) is Book Five's `b5_c6_lines` with three marks added: 'H' a horse on its picket rope, 'w' the provost's wagon, '^' the hill road between two posts. The fights use `b5_c6_lines` and `b5_c6_dissent` (lint's style list).
- **Nodes:** 61 `b7_c4_*` dialogue nodes (the reading's two included).
- **Phases:** `S.f.b7_c4_ph` 1 dusk in the lines (set at `b7_c4_tent`), 2 the muster gate by day (set at `b7_c4_sleep`), 3 night: the lines, the horse lines, the key (set at `b7_c4_gate_back`), 4 dawn (set at the key).
- **The order a player meets things:** the Finadd opens sleep; sleep opens the gate; the riot and Sorvan open dusk; dusk opens the horse lines; the patriots open the way back and the two visitors; the key opens dawn; the Finadd at dawn opens the end.
- **The first halt** is `b7_c4_tent` (the Sixth's tent, the reading place), with `b7ReadChoice(4)`; the reading is also at the tile-woman and the fire in phases 1 and 3.
- **The fire** `b7_c4_fire` (id kept for the games pass): phase 1 (the Tiles, a rest `b7_c4_rest1`, the talk, `risingHTML()`, "Sleep" once the Finadd has spoken); phase 2 "no fire at the muster gate" (talk only); phase 3 (the Tiles, a rest `b7_c4_rest3`, the talk, `risingHTML()`, "The two visitors" once the patriots are dealt with); phase 4 (the talk, `risingHTML()`, "The night is over" once the Finadd has spoken). Every list ends "Not now". `ROSTER_FIRES.rg[4] = ['b7_c4_fire']`. The talk has a line for every soldier the Letherii can field, two sets (before and after the muster) for the core, Ilsa and Sorvan: Tobet, Thegg, Perrit, Ammet, Ruuk, Brune, Pessa, Ilsa, Sorvan.

## The key `b7_c4_key` (the muster)

Chosen at the Sixth's fire in phase 3 (`b7_c4_key`), after the patriots, between two visitors who came because the camp heard what happened at the provost's wagon: **an Edur from the hill** (the eldest of the four who tested the squad, if that fight was fought) and **a Letherii captain of one of the levy battalions** (older, badges off his coat, from a tent at the horse lines where officers meet). `risingHTML()` shown; "Not yet" steps back (the visitors stay as an NPC at the fire). Guarded (`!S.f.b7_c4_key`) so the moves happen once.

- **`edur`** ("The Sixth will stand on your picket"): `b7Rise(-1)`, `b7Filed(-1)`. Thegg +1, Perrit +1, Ilsa +1, Tobet −1, Sorvan −1. The Edur say the Patriotists leave alone a squad the Edur have asked for by name. At dawn a squad-wide gap waits in the Edur picket; the Sixth marches up to it under every Letherii eye. The captain: "Edur always leave."
- **`letherii`** ("The Sixth is Lether's"): `b7Rise(1)`, `b7Filed(1)`. Tobet +1, Sorvan +1, Pessa +1, Thegg −1, Ilsa −1. The officers "think the Edur should be the first to meet the foreigners, and the last to leave the field"; the Sixth "will be asked nothing yet. When they do, you will know it is us." At dawn the tent is struck; an officer touches his hat to the Sixth's fire.
- **Read later (the brief):** Ch6 (where the squad stands in the line; who it trusts), Ch7's Letherii pages. Ch6 may use: on `edur`, the Sixth is on the Edur's picket when the Edur walk home (canon, W22) and is left standing; on `letherii`, the officers' asking (a later writer decides what they ask; this chapter promises nothing about the ridge's mages, the ritual, or who it was meant for, rg-canon correction 2).

## The Rising and the file (moves in this chapter)

| Where | Move | When |
|---|---|---|
| `b7_c4_riot_after` → cut the rope | `b7Rise(1, 'levies let go at the muster gate')` | once (guard: `b7_c4_crowd` unset), the chapter's own ±1 |
| `b7_c4_riot_after` → hand it back | `b7Rise(-1, 'levies handed back to the press-gang')` | once |
| `b7_c4_key` → `edur` | `b7Rise(-1, …)`, `b7Filed(-1, 'asked for by the Edur')` | the key |
| `b7_c4_key` → `letherii` | `b7Rise(1, …)`, `b7Filed(1, 'seen in a horse-lines tent')` | the key |
| `b7_c4_grooms` "yes, but" | `b7Filed(1, 'a groom will say who asked')` | the chapter's one file "yes, but" |

**`rise:true` checks:** the crowd at the gate (guile 15; its "yes, but" is a bruise, not the file) and the Indebted groom at the horse lines (wits 14). At `watched` or worse they carry the file's −1/−2.

**`b7Wanted()` read at the patriots** (`b7_c4_patriots`): if wanted, the node is the arrest (`b7_c4_arrest`) before any fight. The sergeant is put in the provost's wagon on a warrant (a wagon, a bench, a bar; never a cell). Out by: **Ilsa** (if she walks: the warrant is to bring in, not to hold; "it's your name on the hold, provost"), **Sorvan** (walking or waiting: the provost's second is a lancer's son; "the lockup's needed for a drunk"), **a guile 15 talk** through the bars (its "yes, but" costs a salve; a fail goes to the Finadd), or **the Finadd's signature** (always offered: "released into my keeping", his name in the provost's book). Then the agents draw knives at the wagon and the main fight follows. With a fresh or `--from=4` save the file is rarely wanted; the test forces it.

## The name on the list (Chapter 2's key)

`b74List()`, stored as `S.f.b7_c4_listName` when the clerk's list is read or the patriots speak: on `refuse` **or unset**, the sergeant (a hook and a ring); on `name`, **Ilsa** if she walks (the Patriotists like their clerks to come home), else the first of Thegg, Tobet, Ammet, Perrit, Pessa, Ruuk, Brune, Sorvan who walks (**the eel-seller, taken, gave names back**). The arrest always puts the sergeant's name there.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b7_c4_key` | `edur` / `letherii` | the key |
| `b7_sorvanDone` | 1 / 2 / 0 | the engine's flag: Sorvan walks / waits at the Bluerose horse lines / went to look for a company that rides. **With Ilsa walking the squad is already six on a fresh path**, so "walk with us" sends him to wait unless someone is benched (engine behaviour; the roster can bring him in) |
| `b7_c4_listName` | `sgt` / a squadmate id | whose name the Patriotists' list had for the Sixth |
| `b7_c4_crowd` | `let` / `kept` | the roped levies at the gate: cut loose / handed back |
| `b7_c4_riotDone` / `b7_c4_patriotsDone` | 1 | the gate cleared; the patriots beaten (always) |
| `b7_c4_edurDone` / `b7_c4_edurDeclined` | 1 | the Edur from the hill gave their lesson (optional) / it was declined |
| `b7_c4_arrest` / `b7_c4_out` | 1 / `ilsa`, `sorvan`, `talk`, `ennic` | the sergeant spent an hour in the provost's wagon, and who got them out |
| `b7_c4_ennicSigned` | 1 | the Finadd signed the release: his name is in the provost's book for the Invigilator |
| `b7_c4_horseOk` / `b7_c4_horseTried` | 1 | the trick learned / rolled |
| `b7_c4_groomsOk` | 1 | the grooms told the way between the horses (the patriots fight's first move) |
| `b7_c4_badge` | 1 | the squad was badged at the muster (always, at the tables) |
| `b7_c4_news` | 1 | the Finadd's news (the quarrel, the Emperor's parents, the Awl'dan, five armies) |
| `b7_c4_clerkOk` | 1 | the clerk's copy of the list read |
| `b7_c4_drawn` / `b7_c4_reader` / `b7_c4_noCard` | | the reading (120c) |

Defaults: this chapter reads `b7_c2_key` (the list; unset reads as `refuse`), `b7_ilsaDone` via `b7In('ilsa')`, `b7_c2_ennicEve` (the Finadd's hand going to the page in his coat), `b7_c2_gateDone` (the Edur from the hill heard of the Sixth from the two on the barracks gate), and `b7_c3_key` once as rumour (the sutler's cousin: `ledger` "burned every debt-roll in a factor's house … the Indebted came from three valleys round to look at the smoke"; `loot` "emptied a factor's strongbox and left his debt-rolls on the shelf"; unset, "never take anything but food"). `b7OtherName()` is not used.

## Sorvan (the recruit)

- By the empty Bluerose horse pickets inside the muster gate, on a saddle with no horse, a stack of lances sawn short beside him; turned away by three battalion tables. He stood up while the Sixth cleared the gate with blades flat. **He gives the squad a cut-down lance** (`b7_c4_bluelance`) whatever is chosen.
- His story is the engine's bio: the company rode east with the Preda in the spring; a lame horse, an officer's report; the horse died. **What the report says** (Claude's call): he hit an officer who was beating a horse. Ilsa has seen the report ("it doesn't say why").
- "Then walk with us" → `b7Join('sorvan')` (six walking: he waits). "Wait at the horse lines" → 2 (the NPC stays with "Walk with us"; he also stands at the horse-line pickets in phase 3 and teaches the trick from there). "Find a company that rides" → 0, Thegg −1.
- His lines: his scenes, the fire (two sets), the Finadd's news, the Edur, the trick, the gate's end, the arrest, the patriots' end (he knew the Bluerose officer whose scale was in the wagon), the key, the end node.
- **Rule 37 held:** Bluerose is a conquered horse country whose officers nobody trusts; nothing more.

## The trick: Bluerose Horse-Sense (`b7_c4_horse`)

✦ wits 16 at the horse pickets (`b7_c4_horses` → `b7_c4_horse_trick`), phase 3. Taught by **Sorvan** (walking, or waiting at the pickets), else **Ruuk** (Faraed ponies), else **Tobet** (the factor's plough-horse), else **an old Indebted groom** (the Bluerose grooms taught the Letherii ones). Edges: Sorvan +3, Ruuk +2, Tobet +1, Ammet +1, the sergeant +1, Thegg −1, Perrit −1, Pessa −1. **Mechanic: the Rhivi Spirit-Song** (`song`), as Book Five's Quartermaster's Mark: once a fight, every squadmate within 4 heals 1d6+2 and 1 more per squad level past the first, wakes from any daze, steps out of any fire. Words: walk in slow, a hand flat on the neck, the horse-masters' low count with no words in it, water, the leech's salve, and never look frightened. Not sorcery.

## Items

- `b7_c4_bluelance` (weapon, `role:'reach'`, `reach:true, atk:1, rng:1, dmg:[1,10,1]`): from Sorvan's stack of spares.
- `b7_c4_bluescale` (armour, `role:'heavy'`, `ac:3, hp:4`): the chapter's real number. Out of the provost's wagon after the patriots: a Bluerose officer's scale, its owner taken to Letheras in that wagon in the spring (headline; Sorvan knew him).
- `b7_c4_musterbadge` (trinket, `role:'any'`, `stat:{guile:1}`): a lead tag stamped at the muster tables, the Whitefinders' fingertip with the Edur's mark struck over it.
- All three drawn in 124b on Book Five's canal-slate ground with the dock-gold rim (240×130); borrowed placeholders with `??=` in the chapter file.

## Fights (numbers for the balance pass; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b7_c4_edurcamp` | the lines, dusk | `b7_edurl` ×4 | 200 (120) | optional; the Edur's lesson, "to the first who cannot stand" (the text; the engine fights it out) |
| `b7_c4_riot` | the muster gate, day | `b7_rioter` ×7 (×5 after the talk); ally `b7_whitefinder` | 180 (108) | required; "blades flat" (the text) |
| `b7_c4_patriots` | the horse lines, night | `b7_agent` ×3, `b7_enforcer` ×2 | 250 | main; `dark`; the grooms' way gives the first move |
| · stage 2 *The provost's wagon* | | `b7_agentchief`, `b7_agent` ×2, `b7_enforcer` ×2 | +150 (400 total, 240 paid) | |

Paid xp: 468 with the Edur, 348 without. A `--from=4` save at 9 (2230) ends at 10 either way (the test saw 2738 with every fight). Foes are the engine's `b7_` numbers under 31c's chapter curve; no own foe.

**Balance** (`balance.mjs --book=rg`, smart, 12 runs, level 9): Soldier — riot 100% (3 rounds, 2% HP lost), Edur 100% (3, 3%), patriots 100% (6 over both grounds, 8%). Bridgeburner — riot 100% (3, 2%), Edur 100% (4, 8%, a down in 8% of fights), patriots 100% (8, 14%, a down in 8%, 0.3 salves). **Under the 75–80% Bridgeburner target**, like Chapters 1–3: `B7GAP` (or the foes' base numbers) is the balance pass's, with David. No rule changed here.

## Canon used, and calls

- **The Patriotists and the Edur at war in all but name** (W9, W15): the Finadd's news, "since the business with the First Concubine". Nisall's death and Bruthen Trana are not given.
- **Tomad and Uruth jailed** (W15), headline: "the Emperor's own father and mother are in the Chancellor's keeping, and the Edur are not permitted to ask after them". Their deaths (W18) are not given; no cells shown.
- **The Awl'dan war** (W6, W12; correction 6), news only: "the Awl have risen in the east, a thousand leagues off, and Preda Bivatt's army is out there with half the cavalry in the kingdom". No Redmask, Toc, Bast Fulmar or the K'Chain Che'Malle (the test checks the names).
- **"Five armies" went east** (R24.1 S24): said, without the Bolkando (rule 65's caution; the test checks "Bolkando" never prints).
- **The home army raised against the invaders; the commanders' camp on Kravos Hill** (W20; T p. 616): the camp on the slopes; the commanders' tent on the top, never visited (the Preda's order). **Which Preda** (§15 Q5) is not named: "the Preda".
- **Hanradi Khalag's Edur show contempt for the Letherii** (W20): their fires on the shoulder, never looking down "on purpose"; "Hanradi Khalag's banner, the clerk says". Hanradi is never seen. The four Edur who come down and the eldest who speaks are inventions.
- **Sirryn Kanar** is "the Chancellor's man, people say", a carriage up the hill road; never named (the test checks), never seen.
- **The invaders** as the Letherii hear them: raiding by night, burning factors' houses (W17, W21), "never where the cavalry is sent".
- **The Letherii officers who want the Edur gone**: an invention that sits under canon's killing field (the ritual meant for the marines and the Edur together, W22) without naming or promising it. Ch6's writer decides what the officers ask, if anything.
- **Hard limits held:** not the Awl'dan, Drene, the commanders' tent, Sirryn, Bivatt or Hanradi in person; not the Patriotist compound or a cell (the provost's wagon is a wagon). No Burn's Sleep year; never Kettle, Mael, "Tehol the Only", the K'Chain Che'Malle, a never-use name. "Bonehunters" is not said. No exclamation marks in narration (the test checks every node). Debt is flavour only (no `b5Owe`/`b5Pay`/`b5Forgive`); docks through `S.silver` (the sutler).
- **Invented and unnamed:** the four Edur from the hill and their eldest; the press-gang's sergeant (big, tired, a rope); the old eel-wife with the stave; the levies and the families; the battalion clerks and the boy with the stamping block; the grey coat at the muster table (Ilsa knows him; he spells Whitefinder with two Fs); the sutler and his cousin; the Indebted groom (sixteen, a split lip) and the old groom; the provost (fifty, a bad knee) and his second (a lancer's son); the agent with the paper and the man in the better grey coat; the Bluerose officer whose scale was in the wagon (taken in the spring, unnamed); the Letherii captain of a levy battalion (badges off, a tent at the horse lines). **Finadd Ennic** is Book Five's; this chapter has him sign a release he read first, if the arrest happens.
- **Not invented:** no new named person beyond Sorvan.

## Unsure, or left open

- **Where Kravos Hill is** relative to Letheras is not given in what I had (W20; T p. 616). The chapter says "out of Letheras … to a camp on the slopes below a hill called Kravos" and the Finadd says the army "moves for Letheras when the hill says": a day's march or more, unstated. Ch6's writer should keep it vague.
- **Who commands at Kravos** (§15 Q5): "the Preda", unnamed.
- **The Whitefinders as four companies** of what used to be a battalion: Claude's call (the battalion is free margin, rg-canon §3).
- **Sorvan's report** (he hit an officer beating a horse) is Claude's call; the engine's bio says only "a bad report".

## Engine notes (outside the chapter's own nodes; all in this file or 124b)

- Nothing the engine lacked. No wraps.
- `b7_c4_patriots` returns `DLG.b7_c4_arrest()` while `b7Wanted()` and the arrest has not happened. Because 16's `talk` runs a node's `fx` once per id, the arrest flag is also set by every way out of the wagon (`b7_c4_arrest_ilsa`, `_sorvan`, `_talk`, `_ennic`, `_out`). Lint lists `b7_c4_arrest` as an orphan for that reason (reached through the redirect), beside `b7_c4_card` like every chapter's card node.
- Three scenes in `CH.scenes` (`b7_c4_tent`, `b7_c4_gate`, `b7_c4_horselines`), drawn in 124b, borrowed placeholders in the chapter file. 124b also draws 120's `b7_kravos` (dusk, and dawn once `b7_c4_ph` is 4), the figure `sorvan`, the bust `POR.sorvan`, and the ground `TILEX.b7_c4_lines`.
- Glossary: "The levies", "A muster badge", "The provost's wagon" pushed onto `GLOSSX.rg`.
- `B7READ[4]` filled from this file (the tent; Perrit and the tile-woman).

## Tests

`tools/b7ch4_test.mjs` (19 checks): a `--from=4` start (level 9; every node renders in all four phases, both keys and before/after the patriots, no leak, no exclamation mark, no Bolkando/Redmask/K'Chain; items, Sorvan, the ground and four backdrops drawn; `B7READ[4]`), the first night (the Finadd's news, the clerk's list with the sergeant's name, the tile-woman, the hill with Hanradi's banner and no Sirryn), the reading (Perrit, back `b7_c4_fire`), the Edur (four, a forced win), the fire (rest, a line each, the Rising and file box, the roster, sleep, Not now), the gate (no fire, the badge, the sutler's rumour on `ledger`, salve at 7), the riot (rise:true; the "yes, but" a bruise; five rioters after the talk with a Whitefinder ally; the levies let go +1 once or handed back −1), Sorvan (the lance; wait then join; go; join at once with a fire line), dusk (the gates on the way back), the grooms (rise:true; the "yes, but" files +1), the trick and its battle half (a heal), the patriots (the sergeant's name; the way between the horses; both grounds; the scale), the key's three choices, `edur` (−1/−1) and `letherii` (+1/+1) from the same moment, the end (level 10), the arrest (wanted: the wagon, no cell; out by the Finadd after a failed talk, by Sorvan, by the talk; then the fight), and a synthetic save (Perrit and Tobet dead; Ruuk, Brune, Ilsa walking; Chapter 2 `name`: the tile-woman reads, Ruuk teaches, the list names Ilsa; Sorvan waits and teaches from the pickets; Ilsa reads the warrant).

Results (Thu Nov 5, 2026, PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (35 warnings; this chapter's are `b7_c4_card` and `b7_c4_arrest` in the orphan list, see Engine notes); `b7ch4_test` 19/19 three times; `play.mjs 2 --book=rg --from=4` 2/2 (`edur` and `letherii`, both end at level 10, no fight lost); `b7engine_test`, `roster_test`, `reading_test`, `trope_test`, `recruit_test`, `audio_test` pass; `trope_scan` B7 inside budget (this file: nobody 2).

**Tool edits outside my files:** none. Contact sheets: `/tmp/claude-0/shots/b7/ch4/` (the four backdrops, Kravos at dawn, the figures, the bust, the items, the three maps, at 390 px).
