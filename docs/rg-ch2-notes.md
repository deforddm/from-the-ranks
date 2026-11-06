Thu Nov 5, 2026, 4:51 PM PST. Book Seven, Chapter 2, "The File" (`src/122_b7_ch2.js`, art `src/122b_b7_ch2_art.js`, test `tools/b7ch2_test.mjs`), against the Book Seven engine on `book7` (v10.0.0, not shipped).

# Chapter 2 notes: The File

The Letherii: Book Five's squad of the Sixth Company, Whitefinder Battalion, still in Letheras some years under the Edur (RG ch 1–9 as the barracks hear it; rg-canon §3, W1–W9). The squad lives in the gaps: its own barracks yard, its own lane and cookshop, an alley and a bridge nobody in canon names. It never enters the Patriotist compound; the file is seen as a page off a captain in an alley and as a folder in a man's hand.

## Shape

- **Areas (4):** `b7_c2_barracks` (the yard at night, ground `b5_c1_barracks`, dark), `b7_c2_street` (the canal street by the barracks, morning, `b5_c1_canal`), `b7_c2_canal` (along the canal at night: the alley mouth north, a bridge south over the water, `b5_c7_canal`, dark), `b7_c2_yardday` (the yard by a grey morning, `b5_c1_barracks`). All grounds are existing tiles.
- **Nodes:** 62 `b7_c2_*` dialogue nodes (the reading's two included).
- **Phases:** `S.f.b7_c2_ph` 1 the first night in the yard (set at `b7_c2_yard`), 2 the canal street next morning (set at the bunk-house), 3 dusk and the alley (set at `b7_c2_to_alley`), 4 the morning after, the key (set at `b7_c2_night2`), 5 the bridge at night and home (set at `b7_c2_yard_gate`).
- **The order a player meets things:** the Finadd opens the bunk-house; the night (a carriage in the lane) opens the street; meeting Ilsa opens dusk; the alley opens the morning after; the key opens the Finadd's errand; the errand opens the gate; the bridge opens home; home opens the end.
- **The first halt** is `b7_c2_yard` (the yard under the lamp: `B7READ[2]`'s worked example, back `b7_c2_yard`, unchanged), with `b7ReadChoice(2)`; the reading is also at the tile-woman and at the fire in phase 1.
- **The fire** `b7_c2_fire` (id kept for the games pass): phase 1 the yard brazier (the Tiles, a rest `b7_c2_rest1`, the talk, `risingHTML()`, "Bed" once the Finadd has spoken); phases 2–3 out in the city, "no fire out here" (talk only); phase 4 the brazier cold in the morning (talk only); phase 5 home (a rest `b7_c2_rest5`, the talk, `risingHTML()`, "The night is over" once the bridge is done). Every list ends "Not now". `ROSTER_FIRES.rg[2] = ['b7_c2_fire']`. The talk has a line for every soldier the Letherii can field, two sets by phase where it matters: Tobet, Thegg, Perrit, Ammet, Ruuk, Brune, Pessa, Ilsa (and a Sorvan line, guarded, in case a later save carries him back).

## The key `b7_c2_key` (the informer)

Chosen in the yard on the morning after the alley (`b7_c2_patriot`, the man in the grey coat), with `risingHTML()` shown. "Not yet" steps back. The fx is guarded (`!S.f.b7_c2_key`) so the moves happen once.

- **`name`**: the sergeant gives a name, not one of the squad's: **the eel-seller at the head of the canal steps** (set up in `b7_c2_eelseller`: he talks, loudly, about everything). `b7Rise(-1)`, `b7Filed(-1)`. Thegg −1, Tobet −1, Perrit +1, Ilsa −1. That dusk his stall is shut and the door of the house behind it stands open (`b7_c2_bridge_dusk`). The squad's page "goes in a drawer".
- **`refuse`**: no name. `b7Rise(1)`, `b7Filed(2)`. Thegg +1, Tobet +1, Perrit −1, Ilsa +1. The man writes a second mark in the margin; the Edur on the gate spit where he stood; by dusk the canal knows the Sixth said no (an old woman gives the squad eels and will not take a dock).
- **Read later (the brief):** Ch4 (who is watched at the muster; Ilsa), Ch6, Ch7's Letherii pages.

## The Rising and the file (moves in this chapter)

| Where | Move | When |
|---|---|---|
| `b7_c2_patriot` → `name` | `b7Rise(-1, 'the Sixth gave the Patriotists a name')`, `b7Filed(-1, 'a name given')` | the key, once |
| `b7_c2_patriot` → `refuse` | `b7Rise(1, 'the Sixth refused the Patriotists a name')`, `b7Filed(2, 'no name given')` | the key, once |
| `b7_c2_neighbours` "yes, but" | `b7Filed(1, 'someone saw you ask')` | the chapter's one file "yes, but" |

From a fresh start (Rising 2, file 0): `name` ends at **Rising 1, file 0 (clean)**; `refuse` at **Rising 3, file 2, heat 3 (noted)**. The neighbours' "yes, but" adds 1 to the file either way (so `name` + "yes, but" is file 1, still clean; `refuse` + "yes, but" is file 3, heat 4, still noted).

**`b7HeatTier()` read at the bridge:** `clean` → four foes (two enforcers, two agents) who don't know the squad's faces but turn out every satchel; `noted` or worse → six (one more of each), the agent with the list has the squad's names on it. Done with `startBattle('b7_c2_bridge', {drop:[4, 5]})` when clean (`b72Bridge`). `S.f.b7_c2_bridgeHot` records which (set when the bridge is approached in phase 5).

**`rise:true` checks (the file's edge, −1 watched, −2 wanted):** the neighbour at the window (guile 14), walking up to the bridge as clerks (guile 15). With a fresh save neither carries the file's edge; a later chapter's hotter save will.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b7_c2_key` | `name` / `refuse` | the key |
| `b7_ilsaDone` | 1 / 2 / 0 | the engine's flag: Ilsa walks / waits in a safe room off the Quillas Canal (the one with the blue shutter: knock twice, then once) / went out of the city, or tried |
| `b7_c2_cook` | 1 | the cook across the lane was taken in the night (always) |
| `b7_c2_alleyDone` | 1 | the agents in the alley were beaten (always); seven grey coats did not come home |
| `b7_c2_filepage` | 1 | the squad has a page of its own file (always, from the alley's captain) |
| `b7_c2_errand` / `b7_c2_bridgeDone` | 1 | the Finadd's copied roll, **a page short (the squad's page)**, went over the bridge to the battalion office (always) |
| `b7_c2_bridgeHot` | 1 / 0 | the bridge's enforcers had the squad's names on their list |
| `b7_c2_gateDone` / `b7_c2_gateDeclined` | 1 | the Edur on the barracks gate gave their lesson (optional) / it was declined |
| `b7_c2_marginOk` / `b7_c2_marginTried` | 1 | the trick learned / rolled |
| `b7_c2_quarrel` | 1 | the squad heard the barracks' news of the great quarrel and the champions |
| `b7_c2_board` | 1 | the squad read the broadsheet (Karos Invictad's name, the chalk rat) |
| `b7_c2_neighOk` | 1 | the neighbour told what he saw (four grey coats, a carriage with no lamps) |
| `b7_c2_slate` | 1 | the squad wiped its tab off the cook's slate |
| `b7_c2_ennicEve` | 1 | the Finadd kept the missing page, inside his coat |
| `b7_c2_drawn` / `b7_c2_reader` / `b7_c2_noCard` | | the reading (120c) |

Defaults: this chapter reads `b7_c1_key` once, as rumour (the lamplighter: on `strip` "one of them burned last"); unset reads as `burn`'s line. A later chapter reading `b7_c2_key` on a save that never played Chapter 2 should treat it as unset; `play.mjs --from` sets it at random.

## Ilsa (the recruit)

- She is on the canal steps on the morning after the cook is taken, watched by two agents by the eel stall, and **reads the sergeant's file back** (born two streets back from the Quillas, swims and never says so, owes the purser, prays to the Errant: Book Five's sergeant bio). She copied the squad's file in the spring (the company clerk's "woman in a grey coat, ink to the wrist" who copied the roll) and wrote the cook's margin. **She gives the squad her spare grey coat** (`b7_c2_greycoat`) whatever is chosen.
- "Then walk with us" → `b7Join('ilsa')` (with six walking, the engine sends her to wait). "There's a safe room off the Quillas" → `b7_ilsaDone = 2` with `S.camp` (the NPC stays on the steps in phase 2 with "Walk with us"; the roster can bring her in). "Get out of the city" → `0`, Thegg −1.
- Her lines: her scenes, the fire's talk (both sets), the alley's end (the page is in her hand), the key (behind the bunk-house door: she knows the man in grey), the Finadd's errand, the bridge, the end node.
- **Never inside the compound.** She describes the copying room in a sentence, no more.

## The trick: The Clerk's Margin (`b7_c2_margin`)

✦ wits 16. Taught by **Ilsa** (if she walks, or while she waits on the steps in phase 2), else **Perrit** over the captured page, else **the company clerk** ("audit marks"). Offered from Ilsa's join and wait nodes, from the Finadd's errand node (with the page), and from the clerk's table in phase 4 (when the clerk is the teacher). Edges: Ilsa +3, Perrit +2, Tobet +1, Pessa +1, the sergeant +1, Thegg −1, Ruuk −1, Brune −1. The "yes, but": rattled. **Mechanic: The Line** (`line`): once a fight, the bearer and every squadmate beside them take +3 + `lvT()` armour and cannot be flanked until the bearer's next turn (`B.line`, `lineCovers`). Words: the margin marks (a stroke for watched, a ring for wanted, a hook for bring in, a tick for the side a man favours; the agents come at that side every time). Its edge appears on the alley's wall check (the sergeant +2).

## Items

- `b7_c2_greycoat` (armour, `role:'light'`, `ac:1`): Ilsa's spare coat. **+1 on a `rise:true` Guile check for whoever wears it** (Claude's call, the brief's small effect): an `edgesFor` wrap in this file, `b7On()` only, named "a clerk's grey coat: a clerk is not looked at".
- `b7_c2_agentknife` (weapon, `role:'blade'`, `atk:2, dmg:[1,6,2]`): the chapter's real number. From the alley.
- `b7_c2_filepage` (trinket, `role:'any'`, `stat:{guile:1}`): a page of the squad's own file, off the alley's captain.
- All three drawn in 122b on Book Five's canal-slate ground with the dock-gold rim (240×130). The chapter file registers borrowed placeholders with `??=` that 122b's assignments replace.

## Fights (numbers for the balance pass; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b7_c2_gate` | the barracks gate, night | `b7_edurl` ×3 | 150 (90) | optional; the Edur's "lesson", to the first who cannot stand (the text; the engine fights it out) |
| `b7_c2_alley` | an alley off the canal, dusk | `b7_agent` ×3, `b7_enforcer` ×2 | 240 | main; `dark` |
| · stage 2 *The alley's end* | | `b7_agentchief`, `b7_agent` ×2, `b7_enforcer` | +130 (370 total, 222 paid) | |
| `b7_c2_bridge` | a canal bridge, night | `b7_enforcer` ×2, `b7_agent` ×2 (+ `b7_enforcer`, `b7_agent` when noted or worse) | 180 (108) | required; `dark`; ground `b5_c1_walk` ('#' is the canal) |

Paid xp: 420 with the gate, 330 without. A fresh start at 8 (1900) ends at 9 either way (2230; the test saw 2360 with every fight). Foes are the engine's `b7_` numbers under 31c's chapter curve (Ch2 `FSCALE`: hp ×1.6, atk +3, dmg +1). Balance runs: see "Tests" below.

## Canon used, and calls

- **The Patriotists** (W1): "the loyal and the disloyal" on a broadsheet signed *Karos Invictad, Invigilator*; agents in grey coats, enforcers with clubs (the coats are the game's, matching the brief's art note). Karos is a name and, once, "the Invigilator's carriage, people say" on the far bank. **Tanal and Gnol are not named**: "the Chancellor" (W3, W5, W7, isolating the Emperor).
- **The great quarrel** (W9), as the barracks hear it from the Finadd: the First Concubine arrested and not seen since; "an Edur, the one the Emperor set to watch the Patriotists" walked into the Invigilator's office and out again; the Chancellor's hand in a sling. The Edur on the gate add, on `b7_c2_gateDone`, that the Chancellor "has one hand to say it with". **Nisall's death and Bruthen Trana's name are not given.**
- **Champions off the Edur fleets** (W3, W7): headline, twice (the Finadd, the eel-seller): "the Emperor dies, and gets up". No Karsa, no Icarium, no arena.
- **Coin short** (W1, W9): the purser's lighter docks, the barrow's six docks for a jar that was four, Perrit's "short by a seventh". **Who drained it is never said** (rule 69).
- **The Rat Catchers outlawed** (W3): the clerk's word, a chalk rat on the wall, Pessa's line. No tunnels.
- **The Edur on the gate:** an invention (two warriors set on the Whitefinders' gate "last spring"). Their contempt for the Patriotists is the canon quarrel seen from a gate.
- **The other squad, one line:** the lamplighter's cousin on a coaster saw "ships burning off the north-west coast, a whole line of them, all at once" (W12, W15; the broadsheets deny it, as the Chancellor silenced the survivors, W15). On `strip`, "one of them burned last". The Third is not named; `b7OtherName()` is not used.
- **Hard limits held:** never the compound, its cells or Karos's office (the file is a page and a folder); not Tehol's house, Huldo's, the Rat Catchers' tunnels, the throne room, the Champions' Compound or the arena; never Karos, Tanal or Gnol in person. No Burn's Sleep year; never Kettle, Mael, "Tehol the Only", the K'Chain Che'Malle or a never-use name. "Bonehunters" is not said. No exclamation marks in narration (the test checks).
- **Debt is flavour only:** Ilsa reads that the sergeant owes the purser "to the dock"; no number printed, no `b5Owe`/`b5Pay`/`b5Forgive`. Docks via `b7Coin`/`S.silver` (the barrow).
- **Invented and unnamed:** the cook across the lane (she; fed the Sixth on credit four years; her book taken), the old man at the window, the eel-seller (he; the name on `name`), the apothecary at the barrow, the lamplighter and his cousin, two agents by the eel stall, the alley's captain in the better coat, **the man in the grey coat** (a Patriotist of middle years who comes for the name: a later writer may bring him back, "he always comes back", Ilsa says), the bridge's agents and enforcers, the battalion office over the canal (a slot in a door), the Edur on the gate (the taller one speaks). **Finadd Ennic** is Book Five's (`B5_FINADD`), older; this chapter has him decide something for the first time: he copies the roll himself and **leaves out the squad's page**, and keeps it inside his coat. The company clerk (keeps a second book of what the Patriotists' clerk copied) and the tile-woman are Book Five's.
- **Not invented:** no new named person beyond Ilsa.

## Engine notes (outside the chapter's own nodes; all in this file)

- `edgesFor` wrap for the grey coat (`b7On()`, `c.rise`, Guile, `wears(id, 'b7_c2_greycoat')`).
- `FOES.b7_agent.kind = 'b7_agent'` (the brief's "the kind `b7_agent` … replacing the borrowed `b5_letherii` for agents"). `b7_agentchief` keeps the engine's `thug` body.
- Three scenes added in `CH.scenes` (`b7_c2_greymorning`, `b7_c2_alley`, `b7_c2_bridge`), drawn in 122b, borrowed placeholders in the chapter file. 122b also draws 120's `b7_barracks` (the yard at night, two Edur in the gate arch) and `b7_letheras` (the shuttered canal street by day), the figures `ilsa` and `b7_agent`, and the bust `POR.ilsa`.
- Glossary: "The loyal and the disloyal", "A margin mark", "Enforcers" pushed onto `GLOSSX.rg`.
- **Note for writers:** a fresh Book Seven save swaps the Letherii in at `startChapter(2)`, and their half carries its own `picksDue` (Book Five's picks at 3, 5, 7); a test that calls `talk()` straight after must clear `S.picksDue` again, or `talk` opens the picks screen instead.

## Tests

`tools/b7ch2_test.mjs` (16 checks): a fresh start (level 8, the Letherii in, the Third waiting, the Rising 2, the file clean, every node renders in all five phases, no exclamation mark outside dialogue, items/figures/backdrops drawn), the first night (the Finadd's news, the clerk, the tile-woman, the bunk-house gated), the reading (Perrit, the Tiles, back `b7_c2_yard`), the gate (three Edur, a forced win), the fire (rest, a line each, the Rising and file box, the roster, bed, Not now), the street (the door, the slate, the broadsheet, the barrow), the neighbours (rise:true; the "yes, but" files +1), Ilsa (wait then join; go; join at once), the grey coat's +1 edge for its wearer only, the trick and its battle half, dusk (the lamplighter's line, the alley's two grounds, the knife and the page), the key's three choices, `name` (Rising −1, file 0, the bridge at four) and `refuse` (Rising +1, file +2, noted, the bridge at six) from the same moment, the end (level 9, Rising 3, file 2), and a synthetic save (Perrit dead; Ruuk, Brune, Pessa walking: the tile-woman reads, the clerk teaches, Ilsa waits when six walk).

Results (Thu Nov 5, 2026, PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (35 warnings, none in this chapter; `b7_c2_card` in the orphan list like every chapter's card node); `b7ch2_test` 16/16 three times; `play.mjs 2 --book=rg --from=2` 2/2 (both `refuse`; ends at level 9, no fight lost, 3–6 rounds each); `b7engine_test`, `roster_test`, `reading_test`, `trope_test`, `recruit_test`, `audio_test` pass; `trope_scan` B7 inside budget (this file: theway 1, silence 2, nobody 2, long 1).

**Balance** (`balance.mjs --book=rg`, smart, 12 runs, level 8; the bridge runs at its six-foe "noted" size): Soldier — gate 100% (3 rounds, 3% HP lost), alley 100% (7 rounds over both grounds, 13%), bridge 100% (4 rounds, 7%). Bridgeburner — gate 100% (6%), alley 100% (13%), bridge 100% (10%), no downs. **Under the 75–80% Bridgeburner target**: the Letherii's foes are soft at 8 with Ch2's curve; `B7GAP` (or the foes' base numbers) is the balance pass's to tune, with David. No rule changed here.

**Tool edits outside my files:** none. Contact sheets: `/tmp/claude-0/shots/b7/ch2/` (the five backdrops and the street map at 390 px).
