Wed Oct 21, 2026. Book Four, Chapter 3, "The Burned Tears" (`src/73_b4_ch3.js`, art `src/73b_b4_ch3_art.js`), against v7.0.0 on `book4` (not shipped).

# Chapter 3 notes: The Burned Tears

Days north of Aren in the Vathar Hills (HoC ch 15): the dust and riders on the ridges, the raiders driven onto the 9th's flank picket, the Khundryl coming in, the feast, Vathar Crossing at dusk, the night (carried or slept), the blast and the crossing at dawn, the far bank (on `blow`), the butte over Ubaryd.

## Shape

- **Areas (4):** `b4_c3_hills` (the 9th's halt by day, ground `b4_c3_hills`), `b4_c3_camp` (the Khundryl fires at night, `b4_c3_hills`, dark), `b4_c3_ford` (the near bank at dusk, `b4_c3_ford`), `b4_c3_farbank` (the far bank at night, `b4_c3_ford`, dark; the `blow` road only). The butte is a backdrop node.
- **Nodes:** 74 `b4_c3_*` dialogue nodes (deck and card included).
- **Phases:** `S.f.b4_c3_ph` 1 the hills, 2 the feast (set leaving the hills), 3 the ford (set on the road down), 4 dawn and after (set by `b4_c3_dawn`), 5 the butte.
- **The first halt and the fire** are the feast (`b4_c3_feast_arrive`; `b4DeckChoice(3)` there and at the fire), because the reading place is the feast (`READTABLE['hoc:3']`). The halt in the hills by day is a march halt, not a camp.
- **The fire** `b4_c3_feast` (id kept for the games pass): `again:` line; a rest (once); the squad's talk (`b4_c3_feast_talk`, one line per squadmate present, two variants: before and after the brawl, Orvas, Ramin, Keth and Hackle guarded); `b4Offers()` swaps; the pipe (`b4PipeChoice`); the way on (the brawl first, then "Sleep. The river tomorrow.") with "Not now".
- Every onward step has "Not now" (or "Not yet"/"Give me a moment"); the way back from each area's far edge is "Not that way".

## The key `b4_c3_key` (= `S.f.b4_carried`)

Chosen with Radde on the 9th's stretch of the bank at dusk (`b4_c3_key`; "Give me a moment" declines).

- **`carry`**: the squad wades its own stretch that night and carries out what it can reach, to bury on the south bank. Nerve +1 ("the company carried too": the Second Company takes its boots off and comes in); Haddat +2, Marrow +2, Tangle −1 ("They'll blow it anyway, Sergeant. And it'll be clean"); Orvas +2 if he walks or waits near, and if he waits near and no other recruit walks, `b4Join('orvas')` (he comes down off the bank into the water). `S.f.b4_carried = 1`.
  - The wade is a ✦-less Might 14 check, "yes, but" on the cold water: every squadmate starts the next fight down (2 + level step); a fail still carries, fewer (`S.f.b4_c3_carriedHow = 'few'`), and everyone down 3 + level step. Clean/ok: `'many'`.
  - **No rest that night** (`S.f.b4_c3_noRest = 1`): no rest is offered on this road between the key and the chapter's end; the butte follows the crossing directly.
  - Key fight `b4_c3_scavengers`: river scavengers stripping the iron off the dead, at night in the shallows; stage 2 *The bone-bank* (the old ferryman in his boat). The engine has no water penalty (`def.terrain` does not exist), so the ford is plain ground with the deep channel as `'o'` (anybody shoved in goes "into the deep channel", `pitTxt`).
- **`blow`**: let the munitions take the ford. Nerve +1 ("the army crossed dry"); Tangle +2 (he watches the marines' sapper lay the crates from the slope, never with them), Haddat −1. The squad sleeps (`b4Rest`). `S.f.b4_carried = 0`.
  - Key fight `b4_c3_poles`: on the far bank that night a river band comes to the offering poles for the blasting (Baralta warned the tribes would be insulted; Gall sent word; this band came anyway). Stage 2 *The headman's poles*. A Guile 15 check (Haddat +2: the tongue and the names) takes the front off them.
- **Either way:** at dawn the marines of the 8th blow the ford, the marine squad that blew it crosses first (Keneb's gift, camp talk), then the 8th, then the 9th: the Third crosses after the marines and after the 8th, never first.
- **Read later:** Ch7 (the dead: `b4_carried`), Ch5 (Haddat's mood: her loyalty and `b4_carried`), Ch4 (Orvas's regard: `S.loy.orvas`, +2 on `carry`).

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b4_c3_key`, `b4_carried` | `carry` 1 / `blow` 0 | the key |
| `b4_khundryl` | 1 | the Khundryl came in (glossary), set at `b4_c3_come_in` |
| `b4_whirlwindSeen` | 1 | the Whirlwind seen from the butte |
| `b4_chains` | 1 | a Chains card drawn (the reading at the feast; any later reading may set it too) |
| `b4_orvasDone` | 1 walks / 2 near / 0 sent away | Orvas, asked at the feast (`b4_c3_orvas`); 2 if another recruit walks or the squad is full; on `carry` a near Orvas joins if there is room and no other recruit |
| `b4_c3_knife` | `orvas` / `feast` | who gave the Khundryl knife (Orvas on join or near; otherwise a Khundryl youth after the brawl) |
| `b4_c3_bead` | `carried` / `poles` | where the bead came from (Haddat, out of the river, on `carry` with Haddat; else the far bank's offering) |
| `b4_c3_carriedHow` | `many` / `few` | `carry` only: the wade made or failed |
| `b4_c3_noRest` | 1 | `carry`: no rest that night |
| `b4_c3_shamanTold` | `bless` / `true` | what the sergeant told the recruits of the shamans' foretelling (bless: Nerve +1, Haddat −1; true: Haddat +1, Marrow +1) |
| `b4_c3_recTold` | `steady` / `true` | the recruits at the halt (steady: Nerve +1; true: Haddat +1) |
| `b4_c3_gall` | 1 | the war chief poured for the Chain squad (the cup) |
| `b4_c3_rope` / `b4_c3_ropeNo` | 1 | the ferry rope cut free / would not part |
| `b4_c3_counted` | 1 | the riders read from the cairn (an edge on the picket's flank check) |
| `b4_c3_picket`, `b4_c3_raidersDone`, `b4_c3_brawlDone`, `b4_c3_scavDone`, `b4_c3_bandDone`, `b4_c3_waded`, `b4_c3_blast`, `b4_c3_ford`, `b4_c3_shaman`, `b4_c3_tearsTried`, `b4_c3_sappers`, `b4_c3_youths`, `b4_c3_slept` | 1 | done / seen |
| `b4_rope<n>` | 1 | the ferry rope's +1 spent in chapter n |

**Flags read from earlier chapters, with defaults:** `b4_news` (Ch2; the intro's line about the recruits' questions, either way), `b4_fallClimbed` (Ch2; one clause for Haddat when the Khundryl come in, only if set), `b4_bone` and `b4_c1_token` (Ch1; the mourner, the war chief and the bone-banks read what is tied to the bones). `b4_barrowSeen` is not read (the Barrow line here is the chapter's own). From the transfer: `b2_vatharLost` (the count), `b2_c7_key` (the guard and wickans roads), `b2_hackleBack`.

## Nerve in this chapter

The dust and the raids −1 (always); the recruits at the halt "eat" +1 (or 0); the raiders' company fight, clean, +1 (engine); the Khundryl come in +1 (always); the shamans told as a blessing +1 (or 0); the bones in the ford −1 (always); the key +1 (either). A middling path is +1 to +2; the most generous +4 is reached only with both optional +1s and a clean company fight (the test's path ends at Nerve 8 from 5 with two of them). The least is 0.

## Inventions (Claude's calls)

- **The flank picket** on the wash east of the 9th's halt, and the raiders driven down it by the Khundryl before they show themselves (canon: they had already destroyed the raiders harrying the column; this is one piece of that, from the 9th's side).
- **The cairn** with a horse skull on the rise above the halt.
- **The feast's people:** three shamans at the blue fire (their words are canon; the blue fire is not), an **old Khundryl woman** who teaches the mourning-cry as "a debt", a **Khundryl youth** who gives the knife after the brawl, the **loudmouth of the 10th** whose "rode away" starts it. The war chief who pours for the squad is **Gall** (seen, one speech, one cup): grief worn as pride. His wife and sons are never named.
- **Orvas's offer:** he held the horses when his clan rode away before Coltaine's end, and wants to stand with those who did not. Gall lends him (his template's bio). He never explains the tears ("they are the reason" is his template's line; this chapter adds none). He does not quote Gall's oath.
- **Hollet at the ford:** he copied the Vathar's number into Genabaris's books from the Chain's dispatches.
- **The old ferry post** and its black rope (the item); **the old ferryman** who has been picking the ford's iron since the Chain crossed; the scavengers (unnamed river people).
- **The river band** and its **headman** on the far bank (a bank tribe, unnamed; never Semk or any canon tribe).
- **The bead** of bone from the ford, a woman of the Chain's.
- Items: `b4_c3_khundrylknife` (weapon, +1 to hit), `b4_c3_bonebead` (trinket, +3 health), `b4_c3_cup` (trinket, +1 guile), `b4_c3_ferryrope` (trinket, its own effect: once a chapter +1 on a check, named on the roll, spent when the dice go; `b4_rope<n>`).
- The trick **The Black Tears** (`b4_c3_tears`, ✦ guile 16 at the old woman's fire; Orvas +3, Sathi +1, Haddat +1, Keth +1, Hessa −1, Tebbet −1; `spirit:true`): once a fight, every enemy within 2 of the bearer is −2 to hit for the rest of the round, and the next squadmate to strike one of them hits +2 (spent on that blow). Spirit-craft: it never sputters.

## Canon as written

- About 3,000 riders shadow the army; a marine squad of the 8th goes out to look (camp talk; they come back unseen by the squad). They are Gall's Khundryl Burned Tears; they have destroyed the raiders harrying the column; Gall kneels to Temul and the Khundryl become Crow Clan (heard, half a league off); the broken sword is carried past across a Wickan youth's saddle (seen; W *Temul* has Gall give Temul his broken sword).
- The feast: the army drunk; the shamans' "a long but restless life… a life of searching" (heard); Gall calls the crossing a place of death (camp talk via Radde). Keneb's rumoured desertion for his family: Hollet's rumour, never settled.
- Vathar Crossing choked with the Day of Pure Blood's dead and the tribes' carcasses on poles (dark banks under the water; shapes on poles; no detail). The marines' sappers blow it with crackers and cussers; a long-faced sapper checks for holes (Maybe, unnamed); the marine squad that blew it crosses first, Keneb's honour (Fiddler, Cuttle and Strings are never named or met). The Third crosses after the 8th.
- From the butte: Ubaryd taken back, Nok's ships in the harbour (food, water, arrows), and the Whirlwind on the horizon.
- Never: the Khundryl scouted by the squad, the kneeling seen close, Keneb and Gamet's talk, the butterflies, the first crossing. No Burn's Sleep year, no never-use names, never "Bonehunters", "3rd Company" or "Dancer's Tavern". The tears are never explained. Imra does not appear. Temul's youths are "some forty".

## Left open on purpose

- Whether the raiders were anyone's (the Red Blades' scouts "thought they might be Leoman's"; belief only).
- Who the river band were, and whether they come back.
- How many the Third carried out (`many`/`few` only).

## Canon points I was unsure of

- **Where the Khundryl were on the Day of Pure Blood.** Book Two meets them after the river, at Sanimon; this chapter says so (Orvas: "We met the Chain after the river, at Sanimon"). If the novel puts them at the Vathar, his ford lines need changing.
- **The broken sword:** only W *Temul* has it (supported); written as seen at a distance, carried by a youth, with no story of how it broke.
- **Whether the feast was the night before the crossing:** written as the feast in the hills, a day's march, then the ford at dusk and the blast at dawn. The canon sheet gives the order, not the days.
- **Baralta's warning about the tribes** is the brief's (canon per the brief); it is passed on as Ramin's camp talk only.
- **Temul's age** is left out here (Ch1 says "fourteen" in Radde's mouth).

## Engine additions in this file (all guarded by `b4On()`)

- The Black Tears: `atkCalc` (−2 to an enemy within 2 of the bearer this round; +2 to the squad's next blow on a marked enemy), `attack` (spends the +2), `AB.t_b4_c3_tears`.
- The ferry rope: `edgesFor` (the +1 named on the check) and `check` (spent on the roll).
- `mkAlly` for `b4_c3_rider` (the Burned Tear riders in the raiders' second ground fight at the squad's level, as the 9th's regulars do).
- In 73b: `drawFeature` draws a fight's low cover in `b4_c3_hills` as red boulders, and in `b4_c3_ford` the deep channel (`'o'`) as water and low cover (`'t'`) as a bone-bank in the river or a pole on the bank.

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b4_c3_raiders` | the flank picket | 160 + 80 | `company`; a wave at round 3; stage 2 *The wash's mouth* with two Burned Tear riders as allies; Tangle's two sharpers; a Wits 15 flank (surprise; the cairn +1) |
| `b4_c3_brawl` | the 10th's fires | 140 | objective: survive 4 rounds, "before any Fist looks this way"; a wave of two at round 2; Guile 15 talks some of them apart (Orvas +2) |
| `b4_c3_scavengers` (`carry`) | the shallows | 160 + 80 | stage 2 *The bone-bank* (the old ferryman); waves at rounds 2 and 3; Wits 15 to come along the bone-bank in the dark |
| `b4_c3_poles` (`blow`) | the far bank | 160 + 80 | stage 2 *The headman's poles*; waves at rounds 2 and 3; Guile 15 to grieve back |

A playthrough fights three (raiders, brawl, one key fight): 620 base, 372 paid, plus clean checks; level 10 → 11 (the test reaches 11 on both keys).

**Balance** (`tools/balance.mjs`, a scratch `--patch` putting each fight in a fresh Book Four state at Chapter 3: level 10 unless noted, Nerve 5, a card from `B4POOL[3]`, Orvas in the squad for every fight after the raiders; B4GAP and every rule unchanged; 12 smart runs, 4 naive):
- The first pass (base foes like Ch1's) was far too easy: Soldier 100% with 7–11% health lost, Bridgeburner 100% with 15–24%. A second pass (+1 foe on each ground and stronger foes) overshot: Bridgeburner 17–25%. The foes as shipped sit between: health about +25%, to hit +1, damage +1 over the first pass, Ch1's counts, and a second wave foe in the two key fights.
- **Soldier, level 10:** raiders 100% (11% lost, 0.33 downs), brawl 100% (17%), scavengers 100% (16%), poles 100% (16%). Naive: 100% each (37–49% lost).
- **Soldier, level 11** (the key fights as they fall): brawl, scavengers, poles 100% (20–22% lost).
- **Bridgeburner, level 10:** raiders 75% (71% lost), brawl 100% (33%), scavengers 75% (71%), poles 83% (59%).
- For David (step 14): Soldier is comfortable rather than tight here; nothing was changed in any rule to make it so.

## Tests

- `tools/b4ch3_test.mjs`: a fresh start at level 10 through the halt (Nerve widget, picket, recruits, cairn), the raiders' fight (company, both grounds, the Khundryl allies, Nerve +1), the Khundryl coming in, the Deck at the feast (a Chains card sets `b4_chains`), the fire (again, rest, talk a line each, the way on, Not now), the shamans, the trick, the cup, Orvas's join (picks, the knife, his line), the brawl, the ford (Nerve −1, the count, the one Barrow line), the ferry rope's +1 spent, both keys and both key fights (both grounds each) to the chapter's end; Orvas near (and joining on `carry`) and sent away; the trick in a fight; then a transfer on the Aren Guard road with Sathi alive (Hackle in the fights) and Ramin walking: Orvas waits near, the swap at the fire, the transfer's count, no Barrow line.
