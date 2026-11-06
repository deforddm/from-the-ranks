Thu Nov 5, 2026, 5:57 PM PST. Book Seven, Chapter 3, "Night Raids" (`src/123_b7_ch3.js`, art `src/123b_b7_ch3_art.js`, test `tools/b7ch3_test.mjs`), against the Book Seven engine on `book7` (v10.0.0, not shipped).

# Chapter 3 notes: Night Raids

The Third, lent to Fist Keneb's column as a squad of heavies, weeks inland (RG ch 14–18; rg-canon §2, W17). The column raids by night and lies up by day; the Letherii are not rising and fight beside the Edur (Sort's word, passed down); crossbowmen and a mage have been killing marines. The squad lives in the gaps: an empty farmhouse at a wood's edge, a farm of its own in a valley, a village, a factor's house a day from anywhere. None of them is named.

## Shape

- **Areas (3):** `b7_c3_wood` (the column's lie-up in a wood at dusk, ground `b5_c4_wood`, dark; 'H' the farmhouse = the fire, 's' a spring, '>' out), `b7_c3_fields` (the farm valley at night, `plain_night`, dark; 'C' the farm, 'V' the village, 'k' the Shake track, 'F' the halt), `b7_c3_house` (the factor's yard, `b5_c5_farm`, dark; 'B' the house door, 'b' the barn = the fire, 'w' the well, 'e' the gate). All grounds are existing tiles.
- **Nodes:** 60 `b7_c3_*` dialogue nodes (the reading's two included).
- **Phases:** `S.f.b7_c3_ph` 1 dusk in the wood (set at `b7_c3_start`), 2 the fields at night (set at `b7_c3_out`), 3 the factor's house (set at `b7_c3_fields_east` and `b7_c3_factor_after`), 4 dawn after the key (set at the key and `b7_c3_dawn`).
- **The order a player meets things:** the lieutenant and a settled guide (Wenna walks, waits or goes) open the valley; the lieutenant at the hedge opens the farm; the farm opens the prisoners; the prisoners open the village; the village (open, or shut and the old road fought) opens the lane east; the yard fight opens the counting room; the key opens dawn and the end.
- **The first halt** is `b7_c3_start` (the farmhouse floor at dusk), with `b7ReadChoice(3)`; the reading is also at the fire in phase 1.
- **The fire** `b7_c3_fire` (id kept for the games pass): phase 1 the farmhouse floor, no lamp (the Deck, a rest `b7_c3_rest1`, the talk, `risingHTML()`, "Out with the column" once the orders are given and Wenna is settled); phase 2 "no fire on the march" (talk only); phase 3 the factor's barn before the key (talk only); phase 4 the barn by day (a rest `b7_c3_rest4`, the talk, `risingHTML()`, "Dusk. On with the column"). Every list ends "Not now". `ROSTER_FIRES.rg[3] = ['b7_c3_fire']`. The talk has a line for every soldier the Third can field, two sets (before and after the house) where it matters: Haddat, Sathi, Tangle, Marrow, Mirrel, Tallow, Hessa, Tebbet, Darrut, Yorin, Rasp, Orvas, Ramin, Keth, Mehet, Ottar, Doss, Wenna.

## The key `b7_c3_key` (the factor's house)

Chosen in the counting room (`b7_c3_counting`), with `risingHTML()` shown and Doss, Wenna, Tangle and Mirrel speaking if they walk. "Not yet" steps back. Guarded (`!S.f.b7_c3_key`) so the moves happen once.

- **`ledger`**: burn every roll and the great roll. `b7Rise(2, 'a factor's debt-rolls burned')`; `b7_c3_ledgerash` (the corner of the roll) into the kit. Doss +2, Haddat +1, Marrow +1, Wenna −1, Mirrel −1. Doss's line: "Twenty-six harvests. Not mine, this one. Somebody's." A smoke stands over the valley all morning (drawn on `b7_c3_house` once the key is `ledger`).
- **`loot`**: the strongbox and the factor's medicine chest. +20 silver, +2 salves, `b7Rise(-1, 'a factor's house looted, his rolls left')`. Mirrel +1, Wenna +1, Tangle +1, Doss −2, Haddat −1. The house's Indebted "know which shelf their rolls are on".
- **Read later (the brief):** Ch5 (who helps in the village), Ch7 (the crowd), Doss's page.

## The Rising (moves in this chapter)

| Where | Move | When |
|---|---|---|
| `b7_c3_prisoners` → let go | `b7Rise(1, 'Letherii prisoners sent home')` | once (guard: `b7_c3_prisoners` unset) |
| `b7_c3_prisoners` → kept | `b7Rise(-1, 'Letherii prisoners kept')` | once |
| `b7_c3_counting` → `ledger` | `b7Rise(2, …)` | the key |
| `b7_c3_counting` → `loot` | `b7Rise(-1, …)` | the key |

**`b7Open()` read at the village**, after the prisoners: stirring (3+) opens the gate (the old woman, bread, the way in by the orchard wall's loose stones, which gives the orchard-wall check +2); quiet shuts it, and the old road round it has an Edur camp (`b7_c3_road`, required then). From a Ch1 `burn` (3): let go → 4, open; kept → 2, shut. From `strip` (2): let go → 3, open; kept → 1, shut.

So a fresh path ends at: `burn` + let go + `ledger` **6 (rising)**; `burn` + let go + `loot` 3; `burn` + kept + `ledger` 4; `strip` + kept + `loot` 0.

**`rise:true` checks:** the guide's way into the farm (wits 15; Wenna +3, Doss +2 and +1 more on `b7_c1_dossRoads`, the sergeant +2 with the trick learned). The Third's edge "The Rising" applies (+1 stirring, +2 rising).

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b7_c3_key` | `ledger` / `loot` | the key |
| `b7_wennaDone` | 1 / 2 / 0 | the engine's flag: Wenna walks / waits with the Shake fishers at the column's edge / went back to the sea. **With Doss walking the squad is already six on a fresh path**, so "walk with us" sends her to wait unless someone is benched (engine behaviour; the roster can bring her in) |
| `b7_c3_prisoners` | `freed` / `kept` | the three Letherii crossbowmen from the farm: sent home three valleys east / marched with the column on a cord |
| `b7_c3_village` | `open` / `shut` | the village in the valley opened its gate / stayed shut |
| `b7_c3_villageIn` | 1 | the squad went into the open village (bread, the orchard wall) |
| `b7_c3_roadDone` | 1 | the Edur camp on the old road was beaten (only when the village shut) |
| `b7_c3_farmDone` / `b7_c3_factorDone` | 1 | the farm and the factor's house were taken (always) |
| `b7_c3_guided` | 1 | the guide's way into the farm was tried |
| `b7_c3_tracksOk` / `b7_c3_tracksTried` | 1 | the trick learned / rolled |
| `b7_c3_steward` | `freed` / `locked` | the factor's steward walked to the city / was locked in his pantry |
| `b7_c3_drum` | 1 | the squad heard the far blow on the road north |
| `b7_c3_searched` | 1 | the farmhouse searched (the Edur-marked order, a salve) |
| `b7_c3_dossDawn` / `b7_c3_wennaDawn` | 1 | their dawn scenes |
| `b7_c3_drawn` / `b7_c3_reader` / `b7_c3_noCard` | | the reading (120c) |

Defaults: this chapter reads `b7_c1_key` (the lieutenant's look; the squad's stores in the counting room; the intro), `b7_c1_dossRoads` (the guide check's edge, Wenna's map), `b7_dossDone` via `b7In('doss')`, and `b7_c2_key` once as rumour (the prisoner's news of Letheras: `refuse` "a squad of the city's own soldiers told the Patriotists no, to their faces, and lived the week"; `name` "they had a name off a squad of the city's own soldiers"; unset, neither). Unset `b7_c1_key` reads as `burn`'s lines.

## Wenna (the recruit)

- One of a handful of Shake fishers who have followed the column inland since the beach selling smoked fish, because the Edur took their boats (her TPL bio). She is at the wood's edge with her feet in the one spring. She **reads the lieutenant's map and draws the real one**: the field-drains, the eel-ditch under the farm track, the dry ditch behind the barn. "The Letherii call that the Factor's Road. We call it the road the gulls don't use." (Claude's call: no Shake place-names printed.)
- Her brother's boat taken by the Edur, and the Shake's queen "said out loud" (rule 61: nothing more).
- "Then walk with us" → `b7Join('wenna')` (six walking: she waits). "Wait with the fishers" → 2 (the NPC stays with "Walk with us"). "Go back to the sea" → 0, Haddat −1.
- Her lines: the map, the fire (two sets), the trick, the guide's way, the village, the key, the ledger or the loot, dawn at the trough (the Shore hears through water), the end ("Two days to the river, the Shake way").

## The trick: Wenna's Tracks (`b7_c3_tracks`)

✦ wits 17 at the Shake track ('k' in the fields). Taught by **Wenna** (walking, or come up from the fishers when she waits), else **Doss** (field-drains on the holding, getting from row to row unseen), else **an old Shake fisher** of the column's edge (so the trick is always offered). Edges: Wenna +3, Doss +2, Mehet +1, Sathi +1, the sergeant +1, Ottar −2, Haddat −1, Darrut −1. "Yes, but": soaked to the waist, bruised. **Mechanic: The Rope's Way** (`rope`): once a fight, free, swap places with any squadmate within 5 + `lvT()`; no free swings. Its edge appears on the guide's way (+2) and the old road's bank (+2).

## Items

- `b7_c3_letherxbow` (weapon, `role:'ranged'`, `rng:1, atk:2, dmg:[1,10,4]`): the farm's best crossbow, notched for every hit. The chapter's real number.
- `b7_c3_edurmail` (armour, `role:'mail'`, `ac:3, hp:2`): the Finadd's Edur-made mail, cut down for a Letherii, "a gift for loyalty" (the Letherii fighting beside the Edur, made a thing).
- `b7_c3_ledgerash` (trinket, `role:'any'`, `stat:{guile:1}`): a corner of the great roll; **only on `ledger`**.
- All three drawn in 123b on Book Six's smoke-umber ground (200×150); borrowed placeholders with `??=` in the chapter file.

## Fights (numbers for the balance pass; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b7_c3_farm` | a farm in the valley | `b7_lethxbow` ×3, `b7_lethsoldier` ×2 | 280 | main; `dark`; the guide's way gives the first move |
| · stage 2 *The barn* | | `b7_lethmage`, `b7_lethxbow` ×2, `b7_lethsoldier` | +130 (410 total, 246 paid) | |
| `b7_c3_road` | the old road round the shut village | `b7_edur` ×2, `b7_edurspear`, `b7_krisnan` | 160 (96) | only when the village shuts; `dark`; +6 silver after |
| `b7_c3_factor` | the factor's yard | `b7_factorman` ×5; ally `b7_marine` | 240 | main; `dark` |
| · stage 2 *The counting-room door* | | `b7_lethofficer` (the Finadd), `b7_factorman` ×2, `b7_lethxbow` | +130 (370 total, 222 paid) | the brief's foes plus one crossbow on the stair |

Paid xp: 468 with the village open, 564 with the old road. A `--from=3` save at 17 (5200) ends at 18 either way. Foes are the engine's `b7_` numbers under 31c's chapter curve; no own foe.

**Balance** (`balance.mjs --book=rg`, smart, 12 runs, level 17): Soldier — farm 100% (8.5 rounds over both grounds, 11% HP lost), road 100% (5 rounds, 4%), factor 100% (8 rounds, 11%). Bridgeburner — farm 100% (10 rounds, 13%), road 100% (6, 8%), factor 100% (10, 14%), no downs. **Well under the 75–80% Bridgeburner target**, like Chapters 1 and 2: `B7GAP` (or the foes' base numbers) is the balance pass's, with David. The tool notes the K'risnan idle 28% of turns on the old road (its range-4 daze/drain AI; the engine's foe).

## Canon used, and calls

- **The night raids** (W17): the column raids by night and lies up by day; "smokes" are the marines' count (Claude's word for the raids' fires, glossary). **Thom Tissy counts ten smokes** from a tree: heard in the marines' camp talk ("Tissy went up a tree at dawn"), never seen.
- **Sort's word** (W17) that the Letherii fight beside the Edur: the lieutenant passes it down; the farmhouse holds a garrison order with the Edur mark above the Finadd's signature (an invention that shows it).
- **Crossbowmen and a mage** (W17): the farm's ambushers; **Sands** killed by them "up the line" two nights back (the lieutenant). His squad is not named.
- **Fiddler's Drum** (W17): a single enormous blow on "the road north", the marines grinning, "Ask your sapper what a drum sounds like"; Tangle or Rasp: "stacked". **Never named the Drum, never Fiddler, never the road.** (The test checks the ditch scene never prints "the Drum".)
- **The Kenryll'ah farmhouse and Uru Hela** (W17): at dawn, "a mage of the Letherii called something at a farmhouse… demons, they say, things out of a warren, and a marine named Uru Hela did not come back". **Kenryll'ah is not printed** (the test checks). Marrow felt it "in her teeth" (fire talk, phase 3).
- **The Letherii brigade** (W18): the lieutenant's "the Fist means to catch one of their brigades on a road before the month's out" (ahead of ch 18, as intent). **"Borthen" is never printed** (the test checks).
- **The Shake's queen** (W17, rule 61): Wenna says it is said out loud on the coast. Nothing more.
- **Hard limits held:** not the Drum or its road; not the Kenryll'ah farmhouse; not any named squad's fight; not Keneb's camp council (Keneb is not in this chapter at all; Sort is named as a source of word, never met). No Burn's Sleep year; never Kettle, Mael, "Tehol the Only", the K'Chain Che'Malle, a never-use name. "Bonehunters" is not said. No exclamation marks (the test checks every node). The Third is never called marines.
- **Invented and unnamed:** the lieutenant (Ch1's, a she); a marine squad under the trees; marines in a ditch; the old marine who reads the Deck when neither Marrow nor Tallow walks ("the 9th's went home on a pinnace"; see below); the Shake fishers at the column's edge and an old one among them; the crossbowmen and their mage; **three Letherii prisoners** (Indebted boys from three valleys east); the village's old woman and her grandson; a man behind the shut gate; the Edur camp and its K'risnan; **the factor** (in Letheras a month, with the horses and the plate: a different factor from Ch1's, as the brief says), **his steward** (thin, a good coat, in the rolls himself), **his Finadd** in Edur mail, the house's Indebted (a cook and six others).
- **Not invented:** no new named person beyond Wenna.

## Unsure, or left open

- **The old soldier of the 9th** went back with the last pinnace in Chapter 1 (rg-ch1-notes), but Book Four's reader chain (70) still falls back to `oldninth` when neither Marrow nor Tallow walks. `B7READ[3].say.oldninth` makes him "an old marine of the column… The 9th's went home on a pinnace. I never had a pinnace." The engine's one-time description line (`B4RD_DECK.oldninth`, "of the 9th") still shows the first time he reads in the book. A later chapter's writer should keep the same fudge, or the lead may want a Book Seven reader line in 120c.
- **Sands' squad and Uru Hela's company** are not given (W17 names them; the squads were not checked).
- **The order of ch 17's events** (Sands, the Drum, the Kenryll'ah) against "weeks inland" is not page-checked; they are heard in one night here, which the canon allows as rumour.
- **Wenna can rarely walk on a fresh path:** with Doss joined in Ch1 the Third is six. That is the engine's cap; the join text handles it ("six already walk with the Third, and a fisher can count a crew"), and the roster's swap brings her in.

## Engine notes (outside the chapter's own nodes; all in this file)

- Nothing the engine lacked. No wraps. The trick reuses the Rope's Way's swap.
- Three scenes added in `CH.scenes` (`b7_c3_floor`, `b7_c3_gate`, `b7_c3_house`), drawn in 123b, borrowed placeholders in the chapter file. 123b also draws 120's `b7_farm_night`, `b7_march_night` and `b7_camp_night` (all three were borrowed until now; Ch1's coast road and lie-up use them and still fit), the figure `wenna` and the bust `POR.wenna`. `b7_c3_gate` reads `S.f.b7_c3_village` (the lamp goes out when the village shuts); `b7_c3_house` reads `S.f.b7_c3_key` (dawn, the lamps out; the smoke on `ledger`).
- Glossary: "Field-drains", "A smoke", "A factor's house" pushed onto `GLOSSX.rg`.
- `B7READ[3]` filled from this file.

## Tests

`tools/b7ch3_test.mjs` (19 checks): a `--from=3` start (level 17, Doss walking, the Rising 3; every node renders in all four phases and both keys with no leak, no exclamation mark, no "Kenryll" or "Borthen"; items, Wenna, six backdrops drawn; `B7READ[3]`), the reading (Marrow, back `b7_c3_fire`), the lieutenant (Sands, Sort, the guide; the way out gated), the fire (rest, a line each, the Rising box, the roster, Not now, onward only once the guide is settled), Wenna (fish; with six walking she waits; with room she waits then joins, goes home, or joins at once with her fire line), the valley (no fire; the farm, the village and the lane gated), the trick and its battle half (a swap), the guide's rise:true check (Wenna +3, "The Rising" +1), the farm's two grounds and the crossbow, prisoners let go (+1 once, the village opens) and kept (−1, the village shuts, the old road forced, +6 silver) from the same moment, the factor's house's two grounds and the mail, the steward, the servants, the key's three choices, `loot` (+20 silver, +2 salves, −1, no ash, Doss −2) and `ledger` (+2 once, the ash, Doss +2) from the same moment, the end (level 18, the Rising 6), a synthetic save (Sathi, Tallow, Ottar, Mehet, no Marrow, no Doss: Tallow reads, an old Shake fisher teaches, the ditch without a guide), and a Doss-without-Wenna save (Doss teaches and guides, +2 and +1).

Results (Thu Nov 5, 2026, PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (35 warnings, none in this chapter; `b7_c3_card` in the orphan list like every chapter's card node); `b7ch3_test` 19/19 three times; `play.mjs 2 --book=rg --from=3` 2/2 (both `loot`, ends at level 18, no fight lost, 3–5 rounds a ground); `b7engine_test`, `roster_test`, `reading_test`, `trope_test`, `recruit_test` (after one head-count fix: "two of us" → "I'm Indebted. So's he."), `audio_test` pass; `trope_scan` B7 inside budget (this file: nobody 7). `recruit_scan` lists one ABSENT for review: `b7_c3_wenna_wait` names Wenna while she waits (as Ch1's Doss).

**Tool edits outside my files:** none. Contact sheets: `/tmp/claude-0/shots/b7/ch3/` (the six backdrops, the house at dawn with smoke, the shut gate, the figures, the busts, the items, at 390 px).
