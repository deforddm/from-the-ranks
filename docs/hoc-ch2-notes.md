Wed Oct 21, 2026. Book Four, Chapter 2, "Coltaine's Fall" (`src/72_b4_ch2.js`, art `src/72b_b4_ch2_art.js`), against v7.0.0 on `book4` (not shipped).

# Chapter 2 notes: Coltaine's Fall

The first day out of Aren on the Aren Way (HoC ch 11). The column goes north between the empty trees; the standard goes up far ahead; the army camps at dusk barely past the hill, with Aren's walls still in sight; the squad drives men off the hill who are stripping it for the relic markets; the night (the key); the news by morning; the road north.

## Shape

- **Areas (4):** `b4_c2_road` (the Aren Way by day, ground `b4_c2_way`), `b4_c2_camp` (the 9th's camp below the hill, dusk and night, `b4_c2_way`, dark), `b4_c2_hill` (Coltaine's Fall, dusk and night, `b4_c2_fall`, dark), `b4_c2_morning` (the same camp at dawn, not dark). The standard, the trees and the hill's first sight are backdrop nodes.
- **Nodes:** 74 `b4_c2_*` dialogue nodes (deck and card included).
- **Phases:** `S.f.b4_c2_ph` 1 the road, 2 the camp at dusk (set on reaching camp), 3 the night (set when the robbers are off the hill), 4 the key taken, 5 the morning.
- **The first halt** is the camp at dusk (`b4_c2_camp_arrive`; `b4DeckChoice(2)` there and at the fire), the reading place being "a fire off the Aren Way below the Fall" (`READTABLE['hoc:2']`). `B4DECK[2]` is set from this file; its `back` is the fire. The lean card `b2c_king` is in 70c's `B4POOL[2]` already.
- **The fire** `b4_c2_fire` (id kept for the games pass): `again:` line (by phase); `b4Offers()` swaps; a rest once a phase (not after `fall`: the rest is lost); a rest before the march at dawn on `march` only; the squad's talk (`b4_c2_fire_talk`, one line per squadmate present, two sets: before and after the news; Orvas guarded); the pipe (`b4PipeChoice`); the way on (up the hill / find Radde / the line / fall in) with "Not now". The fire is in both the night camp and the morning camp.

## The key `b4_c2_key`

Asked by Radde at night (`b4_c2_key`, from Radde or the fire; "Give me a moment" declines; each side has a "Not yet" confirm).

- **`fall`**: up the hill at night with the pilgrims. `S.f.b4_fallClimbed = 1`; Nerve +1 ("some went after": a handful of the Second Company's recruits, two regulars and the freckled recruit follow the squad up); Haddat +2, Marrow +1; Tangle "the dead don't need the cusser" and keeps it. The names are said (`b4_c2_names`); the market's "Coltaine's finger" (`b4_c1_relic`, if still in the kit) can be left there (`S.f.b4_c2_relicLeft`); on a transfer one Book Two keepsake can be left (`S.f.b4_c2_keepLeft` = its item id; Haddat and Marrow +1); on `b4_bone = 'chain'` the old Crow woman gives a feather (`b4_c2_crowfeather`, Sathi +1). The key fight is the robbers' second try (`b4_c2_hill`, `company`, stage 2 the summit). The Third's place in the column and its rest are lost: it marches at the back next day (`S.f.b4_c2_rear = 1`) and the morning fire offers no rest. The probe on the camp line happens without them (heard from the hill; "the next squad along held the Third's stretch").
- **`march`**: the Third keeps its place, as ordered. `S.f.b4_fallClimbed = 0`; Radde approves (Nerve +1); Haddat −1. The key fight is the night probe (`b4_c2_probe`, `company`), whose second ground "In the column" (the 9th's wagons) is the key fight proper. A rest before the march at dawn.
- **Read later:** Ch7 (with `fall`, the Barrow dead's face is clearer) and Ch5 (Haddat's mood). Both read `S.f.b4_fallClimbed` or `S.f.b4_c2_key`.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b4_c2_key` | `fall` / `march` | the key |
| `b4_fallClimbed` | 1 / 0 | climbed the Fall at night (`fall`) |
| `b4_barrowSeen` | 1 | the hill seen from the road (always, at the cairn) |
| `b4_news` | 1 | the Genabackis news has run through the camp (always, at dawn; Nerve −1) |
| `b4_temulPast` | 1 | Temul walked past the fire (Book Two's `wickans` road only) |
| `b4_c2_rear` | 1 | the Third marched at the back next day (`fall`) |
| `b4_c2_relicLeft` | 1 | the market's finger left on the hill |
| `b4_c2_keepLeft` | item id | a Book Two keepsake left on the hill |
| `b4_c2_feather` | 1 | the old woman's crow feather taken (`fall` on a `chain` bone) |
| `b4_c2_crowTaught` | 1 | the trick learned |
| `b4_c2_axes` | `stopped` / `cut` / `left` | the 10th's axe at a tree (`stopped` Nerve +1; `cut` Haddat −1) |
| `b4_c2_tenthName` | 1 | the 10th's corporal has the sergeant's name ("yes, but") |
| `b4_c2_front` | 1 / 0 | the Third walked at the front of the company past the trees (1: Nerve +1, Haddat and Marrow −1; 0: Marrow +1) |
| `b4_c2_called` | `barrow` / `fall` | what the sergeant told Radde the hill is called |
| `b4_c2_ask` | `all` / `names` / `walk` | what the new soldiers were told (all: Nerve −1, Haddat and Marrow +1; names: Haddat +2; walk: Nerve +1, Haddat −1) |
| `b4_c2_fear` | `fire` / `quiet` | the morning: to the whole company (Nerve +1, Tallow −1) or Tallow (or the freckled recruit) aside (Tallow +1, Marrow +1) |
| `b4_c2_doubt` | 1 / 0 | told Hollet the Chain was believed dead too (Haddat +1) |
| `b4_c2_cart` | `ok` / `no` | the 10th's boy down with the heat at the water cart |
| `b4_c2_robbersDone`, `b4_c2_probeDone`, `b4_c2_hillDone` | 1 | fights done |
| `b4_c2_standard`, `b4_c2_tree`, `b4_c2_duiker`, `b4_c2_crowsRefuse`, `b4_c2_fetish`, `b4_c2_chip` | 1 | seen / done |

## Nerve in this chapter

The 10th's axe stopped +1; the front of the company +1; the new soldiers told everything −1 / "keep walking" +1; the key +1 (either); the news −1 (always); the morning fear, to the whole company, +1; a clean company fight +1 (engine). A middling path is about +1 (key +1, news −1, one clean fight +1); the test's generous `fall` path ends at Nerve 9 from 5, `march` at 8.

## Inventions (Claude's calls)

- **The hill is the Barrow.** Book Two's "Barrow" (the mound within sight of Aren's walls where the Fist's last four hundred held and the Fist was taken) is the hill canon calls Coltaine's Fall; the army uses canon's name, the squad Book Two's. The day's march is so short that Aren's walls are still in sight at dusk ("the shortest day's march in the history of the Empire", Radde), which reconciles "a day's march north" (W *Topper*) with Book Two's "within sight of the walls".
- **The robbers on the Fall**: Seven Cities men from Aren's poor quarters, stripping braids, feathers, dog skulls and tokens for the relic markets (Ch1's stalls), led by "the braid-cutter", a man in a good headcloth. Never Semk (the Semk leave their own tokens on the hill).
- **The old woman of the Crow**, a pilgrim on the hill, who teaches the Crow's word (the trick) and on `chain` gives the feather. Unnamed.
- **The 10th's corporal with an axe**, the **sick boy of the 10th** at the water cart, the **marine sergeant of the 8th** at the water barrels (Gesler is never named; the Duiker story is his canon belief, said as camp talk), the **raiders' leader** (unnamed hill clans; never Leoman's).
- **The cairn** on the verge, and **the last milestone** of the Aren Way ("one stone out", the Aren Guard's patrol count).
- **Radde's book** now has "the Fall" and "its place" against the Third's names.
- Items: `b4_c2_fetish` (a braid with a painted soldier, fallen from a tree into the road: picked up, not cut; +1 armour), `b4_c2_milestone` (whetstone: the first blow that lands in a fight +1 damage), `b4_c2_crowfeather` (+1 wits; `fall` on a `chain` bone only).
- The trick **The Pilgrim's Crow** (`b4_c2_crow`, ✦ guile 15 with the old woman; Sathi and Keth +2, Haddat +1, Tangle and Hessa −1; spirit-craft): once a fight, until the bearer's next turn every enemy blow that would land on the bearer is struck again and only the second counts (from level 11 also on squadmates beside the bearer). Implemented as an `attack` wrap (the re-roll) and a `squadTurnStart` wrap (it ends).

## Canon as written

- The trees are empty: spike holes (a dark dot) and stains, braids and painted soldier figures (R11, W11). The Adjunct's order: nobody cuts them, nothing taken off them (Radde, and the 10th's axe). No bodies anywhere.
- The standard: "a thin figure holding up a bone before a sandstorm", seen far up the column (R11, W11); Fist Gamet's, of the bones (Ch1).
- The Crow elders refuse Temul (camp talk twice; "Fist Gamet stood there while they said it"). On the `wickans` road, Temul walks past the fire alone and does not stop (`b4_temulPast`); never his talk with Fiddler.
- Duiker's tree: the marines of the 8th found the last tree on the Way empty; "nobody knows"; the marine sergeant thinks the markets (Gesler's belief, W *Duiker*). Never who, never that he lives.
- The hill: ants, braids, dog skulls, crow feathers, tokens (R11, W11); a bare place the pilgrims keep back from; no body, no cross.
- The news: a Claw came out of a warren at the Adjunct's tents in the night (Topper, never named: he is on the never-use list, series-canon rule 13); by morning the camp says Whiskeyjack, the Bridgeburners and Captain Paran are dead and Dujek's Host broken. Always "the camp is saying", "they say", a character's belief or doubt; the narrator never confirms it. How it got out of the tent is not said (Bottle's eavesdropping is a hard limit). The Adjunct says nobody leaves the column; the camp says there will be desertions (Radde).
- Never a Burn's Sleep year, the never-use names, "Bonehunters", "3rd Company" or "Dancer's Tavern". "Fourth squad" is avoided too (rule 12's Fourth): Radde gives the Third's stretch to "the next squad along".

## Engine additions in this file (all guarded by `b4On()`)

- `attack` wraps: the crow re-roll (an enemy's blow at the bearer, decided before the blow and fed to the original roll), and the whetstone's first blow.
- `squadTurnStart`: the crows end on the bearer's turn.
- In 72b: `drawFeature` draws a battle's low cover on `b4_c2_way` as a cart and on `b4_c2_fall` as a heap of tokens.

## Art (`72b`)

- **Figures:** `b4_c2_scavenger` (a thin Seven Cities man in a dirty head-cloth with a sack, red thread and a crow feather out of its mouth), `b4_c2_raider` (bare-chested, ochre and white bars, hide shield, spear or curved blade by phase), `b4_c2_pilgrim` (bent, grey-black robe, white braids, stick and a lit clay lamp), `b4_c2_temul` (Book Two's Temul a year on, on foot, a Malazan sword too long for him).
- **Ground:** `b4_c2_way` (Book Two's Odhan hardpan; ruts only along the Way's own rows; empty trees with crossbar, holes, braid and painted figure; 71b's cart and fire ring; cairn, milestone, tents), `b4_c2_fall` (blue-dark earth, the ants' path, braids on stakes, feathers, dog skulls, token-heaped anthills, stones, clay lamps, all firelit by the lamps). A battle's `t`: a cart on the Way, a token heap on the hill.
- **Backdrops:** `b4_c2_trees`, `b4_c2_fall` (dusk with the robbers at the crest until they are gone; night from phase 3), `b4_c2_standard`, and 70's `b4_road_fire` and `b4_march` redrawn (`b4_march` is every later chapter's fallback road, so it has no trees and no hill).
- **Items:** the crow feather, the fetish, the milestone chip, on 71b's sand-and-iron frame.
- Contact sheets at phone width: `/tmp/claude-0/shots/b4/ch2/` (scenes.png beside Book Two's `b2_aren_way` and Ch1's review, figures.png beside 71b's thief, Book Two's hissari_m, wickan and temul, items.png beside Ch1's finger bone, the four areas, the battles).

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b4_c2_robbers` | the Fall at dusk (both keys) | 170 + 85 | `stage2` *The crest* (the braid-cutter); a wave at round 2; Tangle's sharper; guile 14 to come round (surprise) |
| `b4_c2_probe` (`march`) | the 9th's line, night | 200 + 100 | `company` (1 regular, more by Nerve; kept into stage 2); `stage2` *In the column* (the raiders' leader, a torch); a wave at round 3; wits 14 to hold still (surprise) |
| `b4_c2_hill` (`fall`) | the Fall at night | 200 + 100 | `company` (the regulars who went up after); `stage2` *The summit* (the braid-cutter again, two hired men); a wave at round 2; wits 14 with the pilgrims' lamps out (surprise) |

A playthrough fights two of the three, four grounds: 555 base, 333 paid, level 9 → 10 (2230 → 2563 plus clean-check xp; the test reaches 2593; `play.mjs --from=2` reaches 10 in every run).

**Balance** (`tools/balance.mjs`, a scratch `--patch` putting each fight in a fresh Book Four state at level 9, Nerve 5, a card from `B4POOL[2]`, the finger bone, the fetish and the whetstone worn; B4GAP and every rule unchanged; 12 smart runs, 4 naive):
- Soldier, level 9: robbers 100% (16% health lost, 0 downs), probe 100% (15%), hill 100% (16%). Naive: 100% each (49–61% lost, 1–2.5 downs).
- Bridgeburner, level 9 (12 smart runs): robbers 83% (56% lost, 2.1 downs), hill 75% (50%, 2.2 downs), probe 67% (57%, 2.4 downs) with the raiders' leader at 24 health; eased to 21, the probe was 100% in 20 runs (24% lost, 0.5 downs). The two runs straddle the target; the spread at 12–20 runs is wide. The probe is the one to watch in step 14.

## Left open on purpose

- Who the old woman of the Crow is; the braid-cutter's name and who he sells to.
- Whose the raiders were ("Seven Cities hill clans, poor ones": Ramin).
- What the Third's names in Radde's book are marked with now.

## Canon points I was unsure of

- **The Fall and the Barrow as one hill** (above): Book Two says the Fist's last stand was "on a barrow within sight of the walls"; HoC's sheet says the Fall is "about a day north". The chapter has both by making the first day's march very short. David may want to check the novel for how far the first camp is from Aren.
- Where the trees end and where Duiker's tree is: Book Two puts the historian "at the far north end"; ch 11 has Gesler show it on the first evening. Written as camp talk with no distance ("the last tree on the Way").
- Whether the Crow pilgrims are old Crow of the city or the Crow off the ships: written as old Crow who did not come by the ships, going out daily from Aren.
- Whether anything stands on the hill (§6 Q6): written as stakes, braids, a bare place, no cross.

## Tests

- `tools/b4ch2_test.mjs` (20 checks): a fresh start through the road (the fetish, the axe check, Hollet, Radde, the Crow, the Barrow line, the new soldiers' question, the milestone, the water cart, the standard), the first halt and the Deck, the fire, Duiker's tree, the trick, the robbers (both grounds), both keys and both key fights (both grounds each) to the chapter's end at level 10, the morning (the news as belief, Hollet, the fear with the Nerve widget, no rest on `fall`); then a Book Two transfer on the Wickan road with Sathi alive and nobody at the Barrow, Ramin walking (named in 8 of 8 sampled nodes), Hackle in the fight, Temul past the fire, the swap to Keth, the feather and a keepsake left on the hill, the crows re-rolling blows in a fight and ending on the bearer's turn, and the whetstone.
- `lint.mjs` warns (not errors) on the battle styles `b4_c2_way` and `b4_c2_fall` (its style list knows `/^b3/`, not `/^b4/`, as Ch1 found).
