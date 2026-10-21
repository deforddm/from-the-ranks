Wed Oct 21, 2026, 3:31 AM PDT. Book Four, Chapter 5, "The Wall" (`src/75_b4_ch5.js`, art `src/75b_b4_ch5_art.js`), against v7.0.0 on `b4-ch5` (not shipped).

# Chapter 5 notes: The Wall

The Fourteenth at the Whirlwind Wall and into Raraku (HoC ch 21–22): the camp a mile short of the Wall; the picket at its edge at first light; the Wall going back, seen from a mile off; the old sea floor; Blistig's bandage the next morning; water short and the wells foul (the key); the ruined canal city at dusk. Dust is 1 throughout (the engine sets it at `startChapter`); the picket fight is in Dust 2.

## Shape

- **Areas (4):** `b4_c5_camp` (the 9th's camp short of the Wall, night, ground `b4_c5_wall`, dark), `b4_c5_edge` (the picket at the Wall's edge, first light, `b4_c5_wall`; the Wall itself is the `S` rows), `b4_c5_seabed` (the old sea floor, morning, `b4_c5_seabed`), `b4_c5_canal` (the canal city, dusk, `b4_c5_canal`, dark).
- **Nodes:** 73 `b4_c5_*` dialogue nodes (deck and card included).
- **Phases:** `S.f.b4_c5_ph` 1 the camp, 2 the Wall's edge (set at first light), 3 the sea floor (set walking in), 4 the canal city.
- **The first halt and the fire** are the camp (`b4_c5_start`, with `b4DeckChoice(5)`), because the reading place is "a fire short of the Wall" (`READTABLE['hoc:5']`). `B4DECK[5]` is set from this file; its scene is 70's `b4_wall_fire`, redrawn in 75b.
- **The fire** `b4_c5_wallfire` (id kept for the games pass): `again:` line; a rest (once); the squad's talk (`b4_c5_wallfire_talk`, one line per squadmate present; Haddat's reads her mood, below; Orvas, Ramin, Keth and Hackle guarded); `b4Offers()` swaps; the pipe (`b4PipeChoice`); the way on ("Sleep. The Wall's edge at first light", after Radde) with "Not now".
- Every onward step has "Not now" (or "Not yet" / "A moment" / "Give me a moment"); the far edges are "Not that way".

## The key `b4_c5_key`

Asked by Radde on the old road at the halt (`b4_c5_key`; "Give me a moment" declines). The water is seven days at the march's rate; every well the scouts find is foul.

- **`seep`**: a water party off the column to a seep in the old sea bed, half a day north and west under a coral reef. Nerve −1 at once ("the company saw the Chain squad go off the line"), Haddat +2, Tebbet +1 (and Orvas +1 if he is the finder). The walk is a ✦-less Wits 15 check, "yes, but" the long way round (every squadmate a little down; a fail is later and worse, `S.f.b4_c5_found` = `ok`/`late`). Riders of the Whirlwind are watering there; the key fight is `b4_c5_seep` (Dust 1, stage 2 *The seep's lip*, the water-master). Back in the column with the skins: **Nerve +2**. Sets **`S.f.b4_seepWater = 1`**.
- **`column`**: stay in the column under the dust, as ordered. Radde writes "steady": **Nerve +1**; Haddat −1. The key fight is the rearguard, `b4_c5_rearguard` (`company`, stage 2 *The last wagons*), riders out of the sand for the water barrels. Sets **`S.f.b4_seepWater = 0`**.
- **Read later (Ch6):** `b4_seepWater` 1: the first Ch6 fight begins with the squad's skins full, +3 health each, and the dust's range penalty does not apply to its first round (the brief's consequence; Ch6 builds it).

**Who knows the seep** (`S.f.b4_c5_finder`, set at the key): `haddat` (her mother's people sold water in Hissar and walked into Raraku every year; she calls the seep *the Widow*, "never dry and never sweet"), else `orvas` if he walks with the squad (a Khundryl scout's word), else `seti` if Ch4 set `b4_setiSaved` (the Seti archer whose society remembers the Third), else `darrut` (a water-sellers' map on the Aren Guard-house wall), else `scout` (a Seti scout of the column's screen). The last one is **Claude's call**: the brief's chain ends at Darrut, who may not be in the squad, so the key needed a finder in every game.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b4_c5_key` | `seep` / `column` | the key |
| `b4_seepWater` | 1 / 0 | came back from the seep with water (Ch6's first fight) |
| `b4_c5_finder` | `haddat` / `orvas` / `seti` / `darrut` / `scout` | who led the water party (set at the key either way) |
| `b4_c5_found` | `ok` / `late` | `seep` only: the walk to the seep made or failed |
| `b4_c5_bandage` | `told` / `kept` | Blistig's nose: the story told to the recruits (Nerve +1, Darrut −1) or kept (Darrut +1, Hessa +1) |
| `b4_c5_recTold` | `steady` / `true` | the recruits in the camp (steady: Nerve +1; true: Haddat +1, Marrow +1) |
| `b4_c5_lone` / `b4_c5_loneNo` | 1 | the officer who walked to the Wall in the night seen from the lookout / lost in the dark |
| `b4_c5_seven` | 1 | Radde's seven shaky recruits stood the picket with the Third |
| `b4_c5_withdrawn` | 1 | the Wall went back (always) |
| `b4_c5_inside` | 1 | walked into Raraku (glossary "The old sea") |
| `b4_c5_wallSeen` | 1 | glossary "The Whirlwind Wall" |
| `b4_c5_glass` / `b4_c5_glassNo` | 1 | the sea-glass prised out of the stone ship / would not come |
| `b4_c5_conch` | 1 | the conch taken off the shell bank |
| `b4_c5_roadTried` | 1 | the trick's check made at the marker stone |
| `b4_c5_ridersDone`, `b4_c5_seepDone`, `b4_c5_rearDone`, `b4_c5_desDone` | 1 | fights done |
| `b4_c5_reshuffle`, `b4_c5_bredd`, `b4_c5_dolls`, `b4_c5_scouts`, `b4_c5_ghosts`, `b4_c5_seti`, `b4_c5_found10`, `b4_c5_waterIn` | 1 | seen / done |
| `b4_blistig` | 1 | set again at the bandage (glossary) |
| `b4_chains` | 1 | a Chains card drawn (the Leper is in this chapter's pool) |

**Flags read from earlier chapters, with defaults:**
- Ch4: `b4_setiSaved` (a Seti archer on the road, and a finder), `b4_blistigNoticed` (Blistig's long look at the sergeant over the bandage), `b4_leoman` (one clause in the intro: the raids have stopped since the Wall). All three are optional; unset, the text simply leaves them out. Ch4 was being written at the same time; these are read only as the brief promises them.
- Ch2/Ch3: **Haddat's mood** (`b45HMood()`): her loyalty, +1 for `b4_carried` (Ch3 `carry`), +1 for `b4_fallClimbed` (Ch2 `fall`); 3+ is "easy" (she means to find the water), 0 or less "hard" (Hissar is ash; "do not ask me how I am"). It colours her line at the fire.
- Ch3: `b4_orvasDone` (Orvas walking, near, or gone). From the transfer: `b2_ilhar` (`lost`: at the seep she looks at every rider's face and makes herself look again), `b2_hackleBack`.

## Nerve in this chapter

The Wall −1 (always); the recruits told to sleep +1 (or 0); the picket's company fight, clean, +1 (engine); the Wall going back +1 (always); Blistig's story told +1 (or 0); the key: `seep` −1 then +2, `column` +1 and a clean rearguard +1 (engine); the 10th's dead in the canal city −1 (always). A middling path is about +1; the test's generous paths end at Nerve 8 (`seep`) and 9 (`column`) from 5.

## Inventions (Claude's calls)

- **The camp in a hollow of red rocks a mile short of the Wall**, the Third's fire in the lee of one; the **lookout cairn** on the north drift and its sentry.
- **The officer who walks to the Wall** in the night, seen from the cairn at half a mile: "an old one, by the walk", stands at the foot of the Wall an hour and walks back. Never named; no one with him is seen; the squad does not guess out loud (canon: Gamet, with Grub, R22; hard limit §9).
- **The picket at the Wall's edge**, a quarter-mile short, and the **riders out of the sand**: deep-desert tribesmen who ride inside the Wall (never Leoman's, never the Dogslayers). Radde's **seven** shaky recruits.
- **The water**: Hollet's nine days, then seven; the foul wells "with dead goats in them" (Gamet's suspicion of Dom, R22 commentary, as the 8th's camp talk only).
- **The Widow**, the seep under a coral reef; its **water-master** in a grey veil with a staff of black sea-wood. No canon spring is named inside Raraku before the flood (hoc-canon §7.4): this is wholly invented.
- **The water-sellers' marks** on the old road's marker stones (Haddat's mother cut marks like them).
- **The stone ship** with its green stern-light; the **shell bank** and the conch; the **old road** of fitted stone across the sea floor.
- **The canal city's people**: the 10th's forage party (six, dead before the squad comes; never drawn), its grey-faced **corporal**, and the **deserters** of Sha'ik's army stripping them, led by **the sash with no badges**. Deserters from the Whirlwind are an invention.
- **The road of standing stones** going west out of the canal city: canon's "road lined with ghosts" (R20, Kalam's crossing) kept as stones that lean toward the road, and are sometimes more and sometimes fewer, and one that stands straight and cannot be found again.
- **The freckled recruit** has never seen the sea or a desert; she keeps two shells for her mother.
- Items: `b4_c5_conch` (trinket, +1 wits; Tallow's grandmother kept one by the door to blow when a boat was late), `b4_c5_seaglass` (trinket, its own effect: in the dust the bearer's first shot in a fight reaches +1), `b4_c5_veil` (trinket, its own effect: half the dust's range penalty on the wearer's shots, half its sputter on the wearer's sorcery). The veil is taken off the stakes after the picket fight; the glass is a Might 14 check at the stone ship ("yes, but" a cut palm); the conch is free.
- The trick **The Sea-Bed Road** (`b4_c5_seabed`, ✦ wits 16 at the marker stone; Haddat +3, Orvas +1, Tebbet +1, Darrut +1, Tallow −1, Hessa −1): once a fight, until the bearer's next turn every squadmate ignores the dust's range penalty and moves +1. Not sorcery.

## Canon as written

- **The Wall**: a sandstorm more than a mile deep round Raraku (W *Raraku*, R20, R22), a river of sand going sideways at its foot.
- **The reshuffle** is seen across the hollow at the 8th's fires: a captain under a lantern (Keneb, "the camp says") reading medium squads onto the marines' rolls; "Greymane's way", the sergeants unhappy, a young officer of good family doing the sums (Ranal, unnamed). Radde: "not the 9th." The Third is never joined to marines; no canon squad is named (R22; hoc-canon §7.4).
- **Bottle's divining** is camp talk in the water queue ("their mage... sits by the fire with a little grass man") and in the old soldier's reading; never seen, never named.
- **Neffarias Bredd** is a regular of the 10th's rumour, "never seen" (R22).
- **The Wall goes back** a mile off at the army's head, before "a grey shape on a grey horse" that rode out alone: "whether it is her, nobody on the picket can swear to". No sword is seen or mentioned. Temul's scouts go in after, with Khundryl among them (R22: Temul sends scouts).
- **Blistig's nose** is a bandage and bruising the next morning; the story ("Fist Gamet's taken the 8th back... and the old man broke his nose for him") is the column's, in three versions and a song. The blow is never shown (R22, W *Blistig*, W *Gamet*).
- **Inside**: an old sea floor, shell banks, the bones of great fish, a stone ship, an old road, a ruined city on dry canals, a road lined with standing stones (W *Raraku*, R20).
- Marrow at the Wall: "like the warren at the Vathar, child. Only older"; on the sea floor: "Whatever died here, died before anybody had a name"; the warren "a piece of one, torn off something and kept" (the warren fragment of W *Raraku*, as her feeling only).
- Never: Gamet or Grub named or seen at the Wall, the Adjunct close, the blow to Blistig, Bottle's fire, Balm's or the marines' fire, anything inside the Whirlwind's camp. No Burn's Sleep year, no never-use names, never "Bonehunters", "3rd Company" or "Dancer's Tavern".

## Left open on purpose

- Who the officer at the Wall was.
- Whether the riders who watered at the Widow were the same as the ones at the Wall.
- Where the deserters went, and whether the Whirlwind has more of them.
- What the standing stones are.

## Canon points I was unsure of

- **Whether the army knew of Gamet's walk to the Wall.** Written as unseen by name: the squad sees an officer, and nobody names him then or later.
- **The order of the day**: the reshuffle at the Wall's fire the night before the withdrawal; the withdrawal and the walk in the next day; Blistig's bandage the morning after that. R22 gives the events, not the hours.
- **"Greymane's way"**: R22's "using Greymane's arrangements" is kept as Radde's phrase, with no place attached.
- **The Seti as scouts inside Raraku**: W *Seti* has them as the army's scouts and skirmishers; their scouting inside the Wall here is the game's.
- **Ranal's rank** at the reshuffle: written as "a young officer of good family", since R22 has his captaincy given and then revoked.

## Engine additions in this file (all guarded by `b4On()`)

- `mkParty`: works out each squadmate's range without the dust (`u.b4rng0`, by calling the inner `mkParty` with the dust held at 0 for that call), then applies the shortening itself, halved for the veil, +1 for the sea-glass (`u.b4glass`).
- `attack`: the sea-glass's +1 is spent on the bearer's first shot.
- `useAb`: the veil halves the dust's sputter on the wearer.
- `AB.t_b4_c5_seabed` and a `squadTurnStart` wrap: the trick's range and move, ended on the bearer's next turn.
- In 75b: `drawFeature` draws a fight's low cover at the Wall as a red rock with sand to its shoulder, on the sea floor as a great fish's ribs, in the canal city as fallen masonry, and the canal city's drop (`'o'`) as the dry canal.

## Art (`75b`)

- **Figures:** `b4_c5_rider` (veiled to the eyes, robe and veil-tail blown back, a sash, a tulwar or a lance, a studded hide shield on some), `b4_c5_riderbow` (a horn bow and a quiver), `b4_c5_waterman` (grey veil, grey beard escaping it, a marked staff of black sea-wood), `b4_c5_deserter` (a robe to the knee in tatters, the green cloth a rag, pale squares where the badges were cut off, a sack), `b4_c5_desbow` (a whirling sling), `b4_c5_desleader` (bigger, bearded, a red officer's sash with the badges gone). Sand streaks go by them low and fast unless motion is reduced.
- **Ground:** `b4_c5_wall` (rippled sand, blown streaks, red rock with drifts at its foot, drift flanks, the Wall itself where the `S` lies two deep, a red cairn, the picket's stakes; the Odhan's fires, tents and wagons), `b4_c5_seabed` (white shell crust, whole shells, pitted coral heads, the stone ship read from its neighbours, the seep, the old road's fitted stones, the shell bank with its conch, the marked stone), `b4_c5_canal` (paving with a carved fish now and then, ruin walls broken at the top, dry canals with their walls read from their neighbours, broken bridges, standing stones; rose and violet at dusk).
- **Backdrops:** `b4_wall_fire` (redrawn: the Wall as dull brass across the north, tents, the red rock, the flames leaning north, sand over the rock), `b4_c5_wall` (the Wall over a brass sky, the column small), `b4_c5_withdraw` (the Wall drawing back, lower and paler over a loop, the army in its legions, one dot far out), `b4_c5_seabed` (shell plain, fish bones, the stone ship, the road and the column), `b4_c5_seep` (the coral jaw, the black water with a ring on it, the horse picket until the fight is won), `b4_c5_canal` (the city at dusk, the dry canal and its half bridge, the road of stones west, the column's fires).
- **Items:** the conch, the sea-glass, the veil, on 71b's sand-and-iron frame.
- Contact sheets at phone width: `/tmp/claude-0/shots/b4/ch5/`.

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b4_c5_wallriders` | the picket at the Wall | 160 + 80 | `company`; Dust 2; a wave at round 3; stage 2 *The Wall's foot*; Tangle's two sharpers; Wits 15 to be where they come through (surprise) |
| `b4_c5_seep` (`seep`) | the seep | 160 + 80 | Dust 1; a wave at round 2; stage 2 *The seep's lip* (the water-master); Tangle's burner in the weed; Wits 15 along the reef (surprise) |
| `b4_c5_rearguard` (`column`) | the last wagons | 160 + 80 | `company`; a wave at rounds 2 and 3; stage 2 *The last wagons*; Tangle's two sharpers; Wits 15 to turn the wagons (surprise) |
| `b4_c5_deserters` | the canal city at dusk | 150 + 75 | a wave at round 2; stage 2 *The broken bridge* (the sash with no badges); Tangle's burner; Guile 15 to send half of them running (surprise) |

A playthrough fights three of the four, six grounds: 705 base, 423 paid, plus clean checks; level 12 → 13 (the test reaches 13 on both keys; `play.mjs --from=5` reaches 13 in both runs).

**Balance** (`tools/balance.mjs`, a scratch `--patch` putting each fight in a fresh Book Four state at Chapter 5: level 12, Nerve 5, Dust 1, a card from `B4POOL[5]`, Orvas in the squad; B4GAP and every rule unchanged):
- The first pass (riders and deserters 22 health, deserters to hit 7, bosses 40, two waves at the seep and in the canal city) was right for Soldier except the seep (92%, 1.6 downs) and too hard on Bridgeburner at the seep and the deserters (33% each, 12 runs). The foes as shipped: riders 20 health, deserters 20 health and to hit 6, the water-master and the sash 36, one wave each at the seep and in the canal city.
- **Soldier, level 12** (12 smart runs, 4 naive): wallriders 100% (35% health lost, 1.25 downs), seep 100% (25%, 0.6), rearguard 100% (17%, 0.3), deserters 100% (13%, 0.1). Naive: 75%, 75%, 25%, 75%.
- **Bridgeburner, level 12** (24 smart runs): wallriders 75% (67% lost), seep 83% (72%), rearguard 79% (69%), deserters 79% (68%). The 12-run passes swung by 40 points on the same fight; the 24-run numbers are the ones to trust.
- For David (step 14): Soldier is comfortable, the picket in Dust 2 the hardest of the four; Bridgeburner sits on the 75–80% target. Nothing was changed in any rule.

## Tests

- `tools/b4ch5_test.mjs`: a fresh start at level 12 through the camp (the Wall's Nerve −1, the Deck, Radde's Nerve widget, the recruits, the reshuffle across the hollow, Bredd, the dolls, the lone officer), the reading (the Leper sets `b4_chains`), the fire (again, rest, a line each, the way on, Not now), the picket fight in Dust 2 (company, both grounds, Nerve +1 clean, the veil), the withdrawal (Nerve +1, a mile off, no sword), the scouts, the walk in, the Barrow line, Marrow's Vathar line, Blistig's bandage (told, Nerve +1), the sea-glass's "yes, but", the conch, the trick, Hollet, the key (Haddat's Widow); `seep` (Nerve −1, Haddat +2, the walk's cost, the fight in Dust 1 both grounds, `b4_seepWater` 1, Nerve +2), the canal city, the stones, the 10th's dead (Nerve −1), the deserters (both grounds) to the end at level 13; `column` from the same moment (Nerve +1, Haddat −1, `b4_seepWater` 0, the rearguard with the company both grounds, the deserters talked to a fight with the advantage) to the end at level 13; the trick, the veil and the sea-glass on Tebbet's bow in Dust 2; then a transfer with Haddat dead and Sathi alive and Ramin walking: every node renders, Ramin named in 8 of 9 sampled nodes, Hackle in the fights, the swap to Orvas at the fire, Haddat's Barrow line, Blistig's look (Ch4's `b4_blistigNoticed`), and the seep's finders in turn (Orvas, a Seti scout of the screen, the Seti who remember with the archer on the road, Darrut), with Darrut leading the party to the seep fight.
