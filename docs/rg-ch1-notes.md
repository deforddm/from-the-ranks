Thu Nov 5, 2026, 3:58 PM PST. Book Seven, Chapter 1, "The Burned Ships" (`src/121_b7_ch1.js`, art `src/121b_b7_ch1_art.js`, test `tools/b7ch1_test.mjs`), against the Book Seven engine on `book7` (v10.0.0, not shipped).

# Chapter 1 notes: The Burned Ships

The Third, lent to Fist Keneb's column as a squad of heavies (rg-canon correction 1, fix (A)), lands with the marines on the Lether coast (RG ch 13, W13). The transports burn; the column goes inland by night. The squad lives in the gaps: its own transport, its own stretch of dunes, a coast road, a factor's shed nobody in canon names.

## Shape

- **Areas (3):** `b7_c1_beach` (the landing beach and the dunes above it, ground `b5_c2_strand`, dark), `b7_c1_road` (the coast road and, in phase 5, the lie-up, `plain_night`, dark), `b7_c1_shed` (the tally-shed's yard, `b5_c5_farm`, dark). All grounds are existing tiles.
- **Nodes:** 61 `b7_c1_*` dialogue nodes (the reading's two included).
- **Phases:** `S.f.b7_c1_ph` 1 the landing (set at `b7_c1_start`), 2 the first halt above the beach (set at `b7_c1_burning` and `b7_c1_above`), 3 the coast road (set at `b7_c1_inland`), 4 the shed (set at `b7_c1_tally_after`), 5 the lie-up and the next dusk (set at `b7_c1_shed_out`).
- **The order a player meets things:** the lieutenant opens the waterline (the key); the burning opens the first halt; the lieutenant's second word opens the dunes; the dunes open the way inland; the lieutenant on the road opens the shed (on `strip` the farm and the riders too); the shed opens the yard; the burned book opens the gate and the lie-up; Doss settled opens the end.
- **The first halt** is `b7_c1_above` (the column's first halt in the dunes, the night the ships burned), with `b7ReadChoice(1)`; the reading is also at the fire in phase 2. `B7READ[1]` is 120c's worked example, unchanged (back `b7_c1_fire`). The landing node `b7_c1_start` has no reading: the set text is "the night the transports burned… the smoke still lying along the water", which is after the key.
- **The fire** `b7_c1_fire` (id kept for the games pass): phase 1 laid and not lit (talk only); phase 2 lit in a hollow (the Deck, a rest `b7_c1_rest2`, the talk, `risingHTML()`, "Inland" once the dunes are done); phases 3–4 "no fire on the march" (talk only); phase 5 the lie-up, "not a fire" (a rest `b7_c1_rest5`, the talk, `risingHTML()`, "Dusk. On with the column" once Doss is settled). Every choice list ends "Not now". `ROSTER_FIRES.rg[1] = ['b7_c1_fire']`. The talk has a line for every soldier the Third can field: Haddat, Sathi, Tangle, Marrow, Mirrel (two each, by phase), Tallow, Hessa, Tebbet, Darrut, Yorin, Rasp, Orvas, Ramin, Keth, Mehet, Ottar, Doss.

## The key `b7_c1_key` (the ships)

Chosen at the waterline (`b7_c1_boats`, any boat `B`, after the lieutenant's orders) as the lamp goes up. `risingHTML()` is shown there. "Not yet" steps back.

- **`burn`**: the Third fires its transport on the lamp with the line. Haddat +1, Mirrel +1, Tangle −1. The lieutenant makes a mark on her slate. No extra stores.
- **`strip`**: the Third strips her first and is late. +2 sharpers and +1 salve at once (`b7_c1_strip`); `S.f.b7_c1_late = 1`. Tangle +1, Marrow +1, Haddat −1. On the coast road: the farm (`b7_c1_farm`) gives the second salve (goose-grease) and `b7Rise(-1, 'a farm stripped')` (the brief's +2 sharpers, +2 salves, split between the hold and the farm); the riders (`b7_c1_riders`) cannot be let pass; **the shed waits on both**. Leaving five silver at the farm is offered (the Rising still falls: the silver goes to the factor). The lieutenant marks the slate after the riders.
- **Read later (the brief):** Ch3 (supplies; the lieutenant's look), Ch5 (munitions in the village: `strip` carried two more sharpers off the transport), Ch7 fate pages.

## The Rising (moves in this chapter)

| Where | Move | When |
|---|---|---|
| `b7_c1_book_burn` | `b7Rise(1, 'a factor\'s tally-book burned')` | always, once (guard `b7_c1_bookAsh`) |
| `b7_c1_farm` | `b7Rise(-1, 'a farm stripped')` | `strip` only, once |

So a fresh `burn` ends the chapter at **3 (stirring)**, a fresh `strip` at **2 (quiet)**. One check carries `rise:true`: asking Doss about the roads inland (wits 15), which gets "The Rising" +1 once the book has burned. No "yes, but" in this chapter moves the Rising.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b7_c1_key` | `burn` / `strip` | the key |
| `b7_c1_late` | 1 | `strip`: the Third was late off the beach |
| `b7_c1_farmDone` / `b7_c1_farmPaid` | 1 / 0 or 1 | `strip`: the Indebted farm on the coast road was stripped; whether five silver were left |
| `b7_c1_burned` | 1 | the transports have burned (always, at the key) |
| `b7_c1_dunesDone` | 1 | the Edur patrol in the dunes was beaten (always) |
| `b7_c1_ridersDone` / `b7_c1_ridersPassed` | 1 | the riders on the coast road were fought (always on `strip`) / let pass (`burn` only) |
| `b7_c1_tallyDone` | 1 | the tally-shed was taken (always) |
| `b7_c1_bookBurned` | 1 | the tally-book burned (always) |
| `b7_c1_clerk` | `freed` / `tied` | the tally-clerk was sent home / tied in his shed (optional) |
| `b7_dossDone` | 1 / 2 / 0 | the engine's flag: Doss walks / waits with the camp followers / went back to the factor's fields |
| `b7_c1_dossRoads` | 1 | Doss drew the inland field-tracks for the squad (a later guide scene may use it) |
| `b7_c1_dossPage` | 1 | Doss was shown the burnt page with his name on it |
| `b7_c1_fingerOk` / `b7_c1_fingerTried` | 1 | the trick learned / rolled |
| `b7_c1_why` | 1 | the squad heard the runner's "unwitnessed" through the lieutenant |
| `b7_c1_duneWarned` | 1 | the old soldier's word on the Edur and the crest |
| `b7_c1_drawn` / `b7_c1_reader` / `b7_c1_noCard` | | the reading (120c) |

Defaults: this chapter reads no earlier Book Seven flag. A later chapter reading `b7_c1_key` on a save that never played Chapter 1 should treat it as unset, not as either value; `play.mjs --from` sets it at random.

## Doss (the recruit)

- He **watches** the shed burn from the field (a figure seen and gone, `b7_c1_book_burn`), and **walks in the next dusk** to the pickets at the lie-up and asks what the Malazans pay (`b7_c1_doss`, the brief's words). His TPL bio says "the night the squad burned the factor's ledger"; the chapter has him watch that night and come the next, which keeps both the bio and the brief true.
- "Then walk with us" → `b7Join('doss')` (with six walking, the engine sends him to wait). "Wait with the camp followers" → `b7_dossDone = 2` (the NPC stays, with "Walk with us"; the roster can bring him in). "Go home" → `0`, Haddat −1.
- **The burnt page:** the tally-book page saved out of the fire (`b7_c1_tallyash`) has his family's line on it, four generations; the last name is *Doss*. He cannot read; he knows the shape of his name off his quarter-day board. Shown to him: Doss +2. His great-grandmother "came off a ship from somewhere, owing for the passage" (Claude's call, unnamed; a later writer may use or leave it).
- His lines: the fire's talk (phase 5), the join, the page, the end node. He is not present at the key (it comes before him).

## The trick: Finger-Talk (`b7_c1_fingertalk`)

Taught by a marine of the column at the next fire (phase 2), whether or not the dunes are done: ✦ wits 17. Edges: Rasp +3, Tangle +1, Orvas +1, Haddat +1, the sergeant +1, Tallow −1, Ottar −1, Darrut −1. The "yes, but": rattled. **Mechanic: Claw Hand-Cant** (`cant`): once a fight, free, mark an enemy within 6; the next 1 + `lvT()` hits on it this round are criticals (`cantRound`, `cantLeft`). Words: the marines' night signs (a fist for hold, two fingers for there, a flat hand for low, a hooked finger across the palm for "that one, all of you, now"). Not sorcery. Its edge appears on two later checks in the chapter (the ditch ambush, the seaward wall: the sergeant +2).

## Items

- `b7_c1_charredcloak` (armour, `role:'light'`, `ac:1, hp:2`): from the burning, always (`b7_c1_burning`). The brief's "+1 ac"; the `hp:2` is Claude's call so it is not worse than Book Six's late cloaks.
- `b7_c1_factorblade` (weapon, `role:'blade'`, `atk:1, dmg:[1,8,4]`): the shed's sergeant's sword. The chapter's real number.
- `b7_c1_tallyash` (trinket, `role:'any'`, `stat:{wits:1}`): the page out of the burning book (`b7_c1_book_burn`).
- All three are drawn in 121b on Book Six's smoke-umber ground. The chapter file registers borrowed placeholders with `??=` that 121b's plain assignments replace.

## Fights (numbers for the balance pass; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b7_c1_dunes` | the dunes above the beach, night | `b7_edur` ×2, `b7_edurspear` ×2 | 200 (120) | `dark`; surprise either way from the approach (the old soldier's word +2) |
| `b7_c1_riders` | the coast road, night | `b7_lethsoldier` ×3, `b7_lethxbow` ×2 | 180 (108) | `dark`; optional on `burn` (can be let pass), required on `strip` |
| `b7_c1_tally` | the tally-shed's yard | `b7_factorman` ×3, `b7_lethsoldier`, `b7_lethxbow` | 300 | main; `dark` |
| · stage 2 *The shed door* | | `b7_c1_shedsgt` (52 hp, ac 16, atk 12, 1d10+4, boss, `rally`), `b7_lethsoldier` ×2, `b7_factorman` | +150 (450 total, 270 paid) | |

Paid xp: about 498 with the riders, 390 without. A fresh start at 16 (4870) ends at 17 either way (the test saw 5368 on `burn` with the riders). Foes are the engine's `b7_` numbers under 31c's chapter curve (Ch1 `FSCALE`); the one own foe sits at the engine's `b7_lethofficer` scale, smaller. Balance runs: see "Tests" below.

## Canon used, and calls

- **The landing and the burning** (W13; T p. 358, 360 "burned the transports"): marines ashore on the north-west coast, the transports burned so there is no way back. **Who ordered it** is left as "the Fist's order, and his from the Adjunct" in the lieutenant's mouth (rg-canon §15 Q7 open: number and order unchecked). No count of ships is printed except the picket counting "nineteen, twenty" as they go down, which is his count of the ones he can see.
- **"Unwitnessed"** (W13; T p. 357, 361): through a runner, through the lieutenant, never Tavore's words on the page or her thoughts (rule 55). The Froth Wolf is "the flagship" and seen far out only.
- **Reversed sleep, Mockra** (W13): the month at sea sleeping by day (intro); the column's unnamed mages lay Mockra over the files (Marrow and Yorin name it).
- **Keneb**: a voice down the line on the beach ("Inland. Squads, inland"), as the brief's hard limit says; the Third knows the voice from Raraku. Never spoken with.
- **The City Garrison precedent** (BH R5): the captain's words in the intro, Hellian and Urb unnamed.
- **The Edur fleet** the army followed: "the sailors who chased their fleet" (W13's Sepik is not named). The Edur in the dunes are an invented patrol on the coast.
- **The marines in the barley** repeat sailors' talk that the Edur emperor "dies and gets up again" (rumour; Book Five's rule 34 allows Rhulad as the emperor who comes back; no champions, no Karsa).
- **Hard limits held:** no Froth Wolf aboard, no Second Maiden Fort, no Boaral Keep, no way station (Sort and Beak are not mentioned at all), no Hellian's rum, no named marine. "Bonehunters" once, by the lieutenant. The Third is never called marines (the test checks the narration).
- **Invented and unnamed:** the captain (Book Six's, intro only), **the lieutenant** of the marine company (a woman: narrow, sunburned, crossbow, a slate; a later writer keeps her a she), the column's quartermaster (a marine), the old soldier of the 9th (Book Four's Deck reader, going back with the last pinnace before dawn, so he is not with the Third after Chapter 1), a marine who teaches the signs, a marine picket on the crest (his grandfather a Malaz City shipwright), marines in the barley, the Indebted farm family, the factor's men, **the tally-clerk** (thin, inky; in the factor's book himself), the shed's sergeant. **The factor** is unnamed and offstage; his mark is a set of scales; his holding is "a day inland" with "the big house in stone" (Doss's map). The brief says Ch3's factor's house is a *different* factor's: Doss's holding is this coast factor's, not Ch3's, and nothing here says where Ch3's is.
- **The Shake**: not in this chapter (Wenna is Ch3's). The glossary's Shake row is 120's.
- **Not printed:** no Burn's Sleep year; never Kettle, Mael, "Tehol the Only", the K'Chain Che'Malle, any never-use name.

## Engine notes

- Nothing the engine lacked. No wraps. The trick reuses the hand-cant's marks.
- Two scenes added in `CH.scenes` (`b7_c1_landing`, `b7_c1_shed`), drawn in 121b, with borrowed placeholders in the chapter file. 121b also draws 120's `b7_coast_burning` and `b7_coast_night`, the figure `doss` and the bust `POR.doss`.
- Scenes borrowed and left for Ch3's artist: `b7_march_night` (the coast road), `b7_camp_night` (the lie-up), `b7_farm_night` (the farm). If Ch3 draws them as inland farm country they still fit a coast road a day inland.
- Glossary: "The borrowed heavies", "A tally-shed", "Mockra" pushed onto `GLOSSX.rg`.

## Tests

(filled in after the runs; see the final report)
