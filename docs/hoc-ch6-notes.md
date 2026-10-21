Wed Oct 21, 2026, 5:29 AM PDT. Book Four, Chapter 6, "Pan'arak" (`src/76_b4_ch6.js`, art `src/76b_b4_ch6_art.js`), against v7.0.0 on `b4-ch6` (not shipped).

# Chapter 6 notes: Pan'arak

The lines before the oasis (HoC ch 23–24). The Fourteenth faces the Dogslayers' trenches on three ramps across a basin, within sight. One legion, a third of the army, goes round to block the way out, and the Third is lent from the 9th to hold the flank pickets at the end of its line, where it runs out into rock. Dust is 2 throughout (the engine sets it).

## Shape

- **Areas (4):** `b4_c6_lines` (the flank picket at dusk; ground `b4_c6_lines`), `b4_c6_night` (the same picket at night, dark, with a gap in the screen and the way out north), `b4_c6_basin` (the basin between the lines at night; `forward` only), `b4_c6_ramp` (the foot of the ramps at night, ground `b4_c6_ramp`; `forward` only).
- **Nodes:** 78 `b4_c6_*` dialogue nodes (deck and card included).
- **Phases:** `S.f.b4_c6_ph` 1 the picket at dusk, 2 the picket at night (set at nightfall, and again on the way back in), 3 the basin, 4 the foot of the ramps.
- **The first halt** is `b4_c6_start` at the end of the line (the trenches within sight: Nerve −1), with `b4DeckChoice(6)`. `B4DECK[6]` is set from this file; its scene is 70's `b4_picket`, redrawn here at dusk (the reading place "the picket before Pan'arak": an upturned shield in the scrape).
- **The fire** `b4_c6_picketfire` (id kept for the games pass): `again:` line by phase; a rest once a phase (`b4_c6_rest1`, `b4_c6_rest2`); the squad's talk (`b4_c6_picketfire_talk`, one line per squadmate present; recruits and Hackle guarded); the eve (night only); `b4Offers()` swaps; the pipe (`b4PipeChoice`); the way on by phase (the spur, the screen at dusk, nightfall, midnight and Radde, first light) with "Not now".
- **The eve** `b4_c6_eve` (a hub with `again:`): one scene per squadmate present, each guarded by `b4In`, each +1 regard the first time: who they were before (`b4_c6_eve_<id>` for haddat, sathi, tangle, marrow, tallow, hessa, tebbet, darrut, orvas, redblade, warlock). Tallow's grandmother's deck reads the night (the heavy reading): a soldier, a door with a grey figure, and a figure in rags with a bell, the faceless Leper, "not one of hers".
- Every onward step has "Not now" (or "Not yet" / "A moment" / "Give me a moment"); the far edges are "Not that way". The ramps above the outpost are "Not that way" always.

## The key `b4_c6_key`

Asked by Radde at midnight at the gap (`b4_c6_key`; "Give me a moment" declines).

- **`hold`**: the picket as posted, all night. **Nerve +2**; Radde writes "held as posted" and **Hollet signs the book** (`S.f.b4_c6_holletSigned = 1`); Darrut +1, Hessa +1. **`S.f.b4_saw = 'far'`.** The key fight is the Dogslayer patrol after midnight, `b4_c6_patrol` (`company`, stage 2 *The gap in the screen*); the Seti archer fights in it on `b4_setiSaved`.
- **`forward`**: out from the picket in the dark to look at the trenches. **Nerve −1** at once ("the picket was short a squad"); Tebbet +1, Sathi +1. **`S.f.b4_saw = 'close'`.** The gap is a Wits 15 check (Tebbet +2, Sathi +2, Orvas +1, the Long Listen +1, Hessa/Darrut −1, Tallow −1) whose "yes, but" is being seen: `S.f.b4_c6_seen` = `no` (clean) / `near` (a lantern at the foot asks a question; no surprise either side) / `early` (failed: the outpost is waiting, and the fight starts with theirs). The squad sees the trenches full, the Dogslayers' fires back and back up the slope, and the dark over the oasis "wrong", heavier than the night, sitting on it like a hand (`S.f.b4_c6_sawClose = 1`). The key fight is the outpost at the foot of the middle ramp, `b4_c6_outpost`, and its second ground *The run back* across the basin (on the lines ground). **Nerve +1 if nobody in the squad went down** in either ground (`S.f.b4_c6_downed` 0/1). The Seti archer fights in it on `b4_setiSaved`.
- **Read later (Ch7):** `b4_saw` (`far` / `close`): the ghost ride seen nearer and the mortal fight beginning sooner on `close`, as the brief says.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b4_c6_key` | `hold` / `forward` | the key |
| `b4_saw` | `far` / `close` | what the squad saw of the trenches (Ch7) |
| `b4_c6_sawClose` | 1 | `forward`: the trenches full and the dark over the oasis seen from the foot of the ramps |
| `b4_c6_seen` | `no` / `near` / `early` | `forward`: how the crossing of the basin went |
| `b4_c6_downed` | 0 / 1 | `forward`: somebody in the squad went down at the outpost or on the run back |
| `b4_c6_holletSigned` | 1 | `hold`: Hollet signed Radde's book |
| `b4_c6_setiStood` | 1 | the Seti archer stood the picket with the Third (`b4_setiSaved` only) |
| `b4_c6_recTold` | `steady` / `true` | the recruits at dusk (steady: Nerve +1; true: Haddat +1, Sathi +1) |
| `b4_c6_recNight` | `sat` / `gone` | Nerve at its test: the boy who shook (sat with him: Nerve +1, Marrow +1, Tallow +1; let him go: Nerve −1, Hessa +1) |
| `b4_c6_counted` / `b4_c6_countNo` | 1 | the ramps and trenches counted from the lookout rock / lost in the dust |
| `b4_c6_dug` / `b4_c6_digNo` | 1 | the scrapes dug knee deep / not |
| `b4_c6_listenTried` | 1 | the trick's check made at the rock |
| `b4_c6_hornBlown` | 1 | the picket's horn used (once a book) |
| `b4_c6_eve_<id>` | 1 | that squadmate's eve scene heard |
| `b4_c6_nestDone`, `b4_c6_duskDone`, `b4_c6_patrolDone`, `b4_c6_outpostDone` | 1 | fights done |
| `b4_c6_nil`, `b4_c6_horse`, `b4_c6_hollet`, `b4_c6_seti`, `b4_c6_setiNight`, `b4_c6_out`, `b4_c6_slept` | 1 | seen / done |
| `b4_c6_panarak`, `b4_c6_dogs` | 1 | glossary: "Pan'arak", "The Dogslayers" (set at the first halt) |
| `b4_chains` | 1 | a Chains card drawn (the Leper is this chapter's lean card) |

**Flags read from earlier chapters, with defaults** (all optional; unset, the text leaves them out):
- Ch4: `b4_blistigNoticed` (the Fist asked for the Chain squad by name; else Radde put his hand up: intro, Radde, end lines), `b4_setiSaved` (a Seti archer comes to stand the picket, an NPC at dusk and at night, and an ally in both key fights). Ch4 was being written at the same time; these are read only as the brief promises them.
- Ch5: **`b4_seepWater`** = 1: the first fight (the spur, `b4_c6_nest`) begins with +3 health each (max and current) and, for its first round, the dust does not shorten the squad's shots (Ch5's `b45Rng(u, true)`; restored at round 2). `b4_c5_desDone` (Haddat adds the 10th's six to the names).
- Ch1–3: `b4_carried` (Marrow's eve: "we carried them out of the ford"), `b4_fallClimbed` (Haddat's eve: the names on the hill), `b4_orvasDone` (the recruit). Transfer: `b2_ilhar` (`came` / `fell` / `lost`: Haddat's eve; on `lost` she looks along the Dogslayers' faces at the lookout and under the trench, and makes herself stop), `b2_hackleBack`.
- `b4_bone` is not read (the bone at the throat appears in the recruits' scene only).

## Nerve in this chapter

The trenches within sight −1 (always); the recruits at dusk +1 (or 0); the dusk fight with the company, clean, +1 (engine); the boy who shook +1 / −1; the key: `hold` +2 and a clean patrol +1 (engine), `forward` −1 then +1 with nobody down. A middling path: `hold` about +3, `forward` about 0. The test's generous paths: `hold` +5 (Nerve 10 from 5), `forward` +2.

## Inventions (Claude's calls)

- **The end of the line**: the blocking legion's pickets coming along the basin's edge from the west and stopping at red rock; the Third's screen (stakes and thorn-brush), its scrapes, its fire behind a shield on edge, the lookout rock with a notch. The legion is never named (R24's "Keneb's legion" is open, hoc-canon §7.4); Radde: "Not the 9th… which legion, the orders don't say."
- **The spur** and the **Dogslayer post** on it, watching the blocking legion go round, Malazan voices (Quon, Kartool, Aren), a sergeant with a whistle and the badges cut off his sleeves.
- **The Dogslayers' badge**: a red square with a black dog's head and a black bar across its throat, worn where the Empire's badges were cut off. Wholly invented; no source describes a Dogslayer device.
- **The probe at dusk**, **the patrol after midnight**, **the outpost at the foot of the middle ramp**, **the run back**: all margin (no Malazan unit fought the Dogslayers before the night of ch 25, hoc-canon §7.4).
- **The boy who shook**, a Quon recruit of the Second Company; **the Wickan youth at the horse lines** (fourteen, perhaps, a new scar); **the Seti archer** (Ch5's, whose society remembers); **Radde's listening** (the Long Listen) and his "two wars".
- **The eve's pasts**: Haddat (water-seller's daughter, the shield her grandfather's), Sathi (the grey mare with one white foot, stolen at nine), Tangle (blew stumps for farmers in Itko Kan; his mother and the bead), Marrow (a fisherman's daughter, a novice of Soliel in Nap), Tallow (gutted fish in a shed and sang), Hessa (the Grand Temple's east door; why she left, kept for "after"), Tebbet (his father's goats on a hill in Dal Hon; the dream of the ramps), Darrut (the baker's boy of the Old Quarter; "once, when it mattered, he'd stood with us"), Orvas (his mother's third son; Gall's oath, quoted once, here), Ramin (his father a Red Blade of Ehrlitan), Keth (the boy who could hear her). These add to, and do not contradict, `src/70_book4.js` and Book Two's templates.
- **The marching song with the words changed**, sung in the trenches at night.
- Items: `b4_c6_trenchspade` (trinket for Tangle, +1 armour: Malazan sapper issue, found in the post on the spur), `b4_c6_dogslayer` (trinket, its own effect: +1 to hit Dom's soldiers, `b4_c6_dog*`; cut off a skirmisher's sleeve at dusk), `b4_c6_pickethorn` (trinket, its own effect: once a book, an ability `t_b4_c6_horn` brings two `b4_regular`s into the fight beside the bearer; Radde hands it over after the dusk fight).
- The trick **The Long Listen** (`b4_c6_listen`, ✦ wits 15 at the lookout rock at night; Tebbet +3 (the edge), Darrut +1, Sathi +1, Orvas +1, Tallow −1, Hessa −1): once a fight, the first enemy to move after it is marked (+2 to hit for the squad, to the end of the next round) and nobody in the squad can be flanked until the bearer's next turn. Not sorcery.

## Canon as written

- **Pan'arak**: the oasis and the dead city behind the trenches; the Dogslayers hold three ramps with trenches behind (W24, R24); the lines "within sight" ([O], kept as the brief's).
- **The blocking force**: one legion, a third of the army, sent round to block the way out (R24), unnamed. The squad holds its flank pickets, never the force, never a legion's main line (§7.4, §9).
- **The horse held back for lack of room** (R24): Radde says it, and the Wickan youth at the horse lines says it.
- **Nil and Nether walking the lines** at dusk, barefoot, holding hands, saying nothing (the brief's spine; the camp says their spirits are silent, §2). The rite, Gamet's blood, the Adjunct's council: not in the chapter at all. **Gamet is not met or mentioned.**
- **The goddess** is the grandmother's and Marrow's feeling only ("pulling everything in Raraku toward her… the old things in the sand pulling back", the land's spirits resisting, R24), never narration. The dark over the oasis is seen and never explained.
- Never inside the trenches beyond the outpost at their foot; never the Whirlwind's camp; never Leoman, Karsa, Kalam, Sha'ik or anyone named in it; no Burn's Sleep year; no never-use names (Topper and the Talon included); never "Bonehunters", "3rd Company" or "Dancer's Tavern".

## Left open on purpose

- Whether Haddat's brother is in the trenches (`b2_ilhar = 'lost'`).
- What the dark over the oasis is.
- Why Hessa left the temple ("after").
- What the officers made of what the squad saw (`forward`).

## Canon points I was unsure of

- **Which legion blocks the retreat** (R24 "Keneb's", though Gamet had the 8th back): left unnamed.
- **How long the army stood at the lines before the night of ch 25**: written as one night and the day after ("Nothing today… whatever's coming, it's coming at night", Radde), so Ch7's night is the next one.
- **Nil and Nether walking the lines**: the brief's spine; I found no detail of when or why in the canon sheet, so it is a dusk walk with no purpose given.
- **Malazans among the Dogslayers**: Dom's army as renegade Malazans in Malazan kit with Seven Cities men among them (DG/HoC as I understand it); written as what the squad hears and sees, Malazan voices and helms beside desert headcloths.

## Engine additions in this file (all guarded by `b4On()`)

- `mkAlly`: the Seti archer (`FOES.b4_c6_seti`, kind `b4_c6_setiarcher`) levelled as the 9th's regulars are. `battleDef`: adds her to `b4_c6_patrol` and `b4_c6_outpost` (both grounds) on `b4_setiSaved`.
- `startBattle` / `newRound`: the seep's water on the spur (above); `startBattle` resets `b4_c6_downed` at the outpost, and `stageBreak` / `win` set it when a squadmate is down.
- `TRICKS.b4_c6_listen`, `AB.t_b4_c6_listen`, and wraps of `boonFoeTurnStart` (the mark), `flanked` (no flanking the squad), `atkCalc` (+2 on the marked enemy; +1 for the badge against `b4_c6_dog*`), `squadTurnStart` (ends on the bearer's next turn).
- `mkParty` and `AB.t_b4_c6_horn`: the horn.
- In 76b: `drawFeature` draws a fight's low cover on the lines as a length of the picket screen, at the ramps' foot as the trench lip.

## Art (`76b`)

- **Figures:** `b4_c6_dogslayer` (round iron helm, dented, a leather neck-flap; dull mail; a pale square with hanging threads where the Empire's badge was cut off, Dom's red dog's-head badge on the other sleeve; a Malazan round shield with a red slash daubed over the old paint; a short sword or a spear), `b4_c6_dogxbow` (a crossbow and a quiver of bolts), `b4_c6_dogscout` (no mail, a scarf over the mouth and a head-cloth, two long knives), `b4_c6_dogsgt` (bigger, bearded, a whistle on a cord), `b4_c6_setiarcher` (black braids with red cord, a hide jerkin over a long ochre shirt, a horn bow, a quiver fletched red, a society's tail at the belt; defers to `b4_c4_setiarcher` if Chapter 4 drew one).
- **Ground:** `b4_c6_lines` (a cracked rose crust, thorn scrub, angular red rock, the screen's stakes and woven brush, the lookout knob with its notch, the scrapes (deeper once dug), the fire with its shield on edge; firelit at night), `b4_c6_ramp` (the rutted ramp, the trench banks with stakes and the odd helm against the firelight behind, the outpost's half ring of stones, scattered once the fight is done).
- **Backdrops:** `b4_picket` (redrawn: dusk, the trenches far off in red dust with their first fires, the screen and lookout rock, the upturned shield in the scrape, the fire behind its shield), `b4_c6_trenches` (the ramps across the basin at dusk, the dead city's broken towers and the palms behind, the end of the screen and the red rock; at first light, after the night, grey-gold), `b4_c6_eve` (the lines' fires going away west behind their shields, the trenches' string of fires across the basin, dust through the firelight, the squad at the fire), `b4_c6_close` (the ramps close at night, the trench full of fires and helms, the outpost's fire, and over the oasis a darkness heavier than the night with an edge that will not keep still; the squad flat in front).
- **Items:** the cut-off badge, the sapper's spade, the picket's horn, on 71b's sand-and-iron frame.
- Contact sheets at phone width: `/tmp/claude-0/shots/b4/ch6/`.

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b4_c6_nest` | the spur, afternoon | 140 + 70 | the first fight (the seep's water); a wave at round 3; stage 2 *The spur's top* (the sergeant); Tangle's two sharpers; Wits 15 up the far gully (surprise) |
| `b4_c6_dusk` | the screen at dusk | 160 + 80 | `company`; a wave at round 3; stage 2 *The end of the screen*; sharpers; Wits 15 to stand up all at once (surprise; +1 counted, +1 dug) |
| `b4_c6_patrol` (`hold`) | the screen after midnight | 170 + 85 | `company`; the Seti archer on `b4_setiSaved`; stage 2 *The gap in the screen*; sharpers; Wits 15 to hear them (the Long Listen +1) |
| `b4_c6_outpost` (`forward`) | the foot of the middle ramp | 170 + 85 | the Seti archer on `b4_setiSaved`; a light wave at round 3; stage 2 *The run back* (on the lines ground); sharpers; Wits 16 to take them before the shout (only if unseen) |

A playthrough fights three of the four, six grounds: 705 base, 423 paid, plus clean checks; level 13 → 14 (the test reaches 14 on both keys; `play.mjs --from=6` reaches 14 in both runs).

**Balance** (`tools/balance.mjs`, a scratch `--patch` putting each fight in a fresh Book Four state at Chapter 6: level 13, Nerve 5, Dust 2, a card from `B4POOL[6]`, Orvas in the squad; no seep water, no Seti archer, no horn; B4GAP and every rule unchanged):
- First pass (patrol with a sergeant and a wave; outpost with five foes, a wave of a Dogslayer and a sergeant again in the run back): Soldier 100% on all four; Bridgeburner nest 83%, dusk 75%, patrol 63%, outpost 46%. As shipped: the patrol has no wave; the outpost four foes and a light wave (a skirmisher at round 3).
- **Soldier, level 13** (12 smart, 4 naive, as shipped): nest 100% (11% health lost, 0.25 downs), dusk 100% (11%, 0.08), patrol 100% (16%, 0.42), outpost 100% (18%, 0.17). Naive: 100%, 75%, 100%, 75%.
- **Bridgeburner, level 13** (24 smart runs a pass): the harness swung hard between passes on unchanged fights (nest 63–96%, dusk 79–100%, patrol 79–96% across four passes). The last pass as shipped: nest 96%, dusk 79%, patrol 79%, outpost 92%. Read the four passes together: about 80–90%, a little easier than the 75–80% target; the outpost was 46–58% with its first numbers.
- For David (step 14): Soldier comfortable; Bridgeburner near the top of the target. The Seti archer (Ch4's `seti` road) and the horn make the key fight easier on top. Nothing was changed in any rule.

## Tests

- `tools/b4ch6_test.mjs` (17 checks): a fresh start at level 13 with Ch5's seep water (Radde volunteered), the first halt (Nerve −1, the Deck), Radde and the unnamed legion and the horse, the recruits with the Nerve widget, the lookout's "yes, but", Nil and Nether, the horse lines, Hollet, the scrapes, the reading (the Leper sets `b4_chains`), the fire, the spur (both grounds, +3 health and the undusted first round), the dusk fight with the company (both grounds, Nerve +1 clean, the badge and the horn), nightfall and the Barrow line, the eve (one scene a squadmate, each +1, Tallow's bell), the Long Listen, the boy who shook; `hold` (Nerve +2, Hollet signs, `b4_saw` far, the patrol with the company both grounds) to the end at level 14; `forward` from the same moment (Nerve −1, `b4_saw` close, the gap's "yes, but", the basin, the ramps' foot, never up the ramps, the outpost and the run back both grounds, Nerve +1 with nobody down) to the end at level 14; the trick (the mark on the first mover only, no flanking, ends on the bearer's turn), the badge (+1) and the horn (two regulars, once a book) in a fight; then a transfer with Sathi alive, Keth walking and Marrow at the Barrow, on Ch4's `seti` and `picket` roads: every node renders, asked for by name, Keth named in 8 of 9 sampled nodes, Hackle in the fights, no seep water, the swap to Orvas and back, Haddat and her brother (`lost`), Marrow's Barrow line, the eve offers Keth and not Marrow, Tallow reads, the Seti archer stands the picket and fights in both key fights, Sathi gets the squad across unseen, and the end lines name the Seti and Keth.
