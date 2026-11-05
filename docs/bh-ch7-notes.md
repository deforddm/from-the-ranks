Wed Nov 4, 2026, 9:16 PM PST. Book Six, Chapter 7, "Malaz City", and the end of Book Six (`src/107_b6_ch7.js`, art `src/107b_b6_ch7_art.js` by the artist), against v9.0.0 on `book6` (not shipped). Branch `b6-ch7`.

# Chapter 7 notes: Malaz City

The Third at sea and in Malaz City (BH ch 18–23; `bh-canon.md` §2, §4–§7). On a transport of Nok's fleet: the Edur ambush seen from the rail (the wall of water, the wall of earth), Sepik wrecked and empty, the Perish come alongside and a Grey Helm sent across (Ottar), the Nemil supply ships running for home, the Grey Helms drilling on the waist; the passage through the cold realm (ice, roaring water, wolves far off); the Jakatakan fleet; Malaz City's waterfront on a jetty along from the marines', the city turned on its Wickans, the mob and the City Guard; the fleet's horns and the three roads. Then the finale for **both** squads.

## Shape

- **Areas (4):** `b6_c7_transport` (the deck at sea; ground `b6_c7_deck`), `b6_c7_cold` (the same deck in the cold realm, dark; ground `b6_c7_deckcold`), `b6_c7_jetty` (the waterfront; ground `b6_c7_quay`), `b6_c7_lanes` (the lanes behind the waterfront at dusk, dark; only on the `wickans` road; ground `b6_c7_streets`). Battle grounds `b6_c7_wharf` (`#` the harbour) and `b6_c7_lanefight`. **Every ground borrows Book Five's** (`b5_c2_hulk`, `b5_c2_quay`, `b5_c7_streets`, `b5_c2_wharf`) through a lazy `??=` wrapper in this file until the artist paints `TILEX.b6_c7_*` (a plain assignment in 107b wins).
- **Backdrops:** the engine's `b6_sea` and `b6_malaz`, and this file's `b6_c7_ambush`, `b6_c7_realm`, `b6_c7_jetty`, `b6_c7_lanes`, `b6_c7_finale` (each `SCENEX[k] ??=` a lazy borrow: `b6_sea`, `b3_c4_cold_night`, `b6_malaz`, `b5_c7_night`, `b6_sea`).
- **Nodes:** 63 `b6_c7_*` dialogue nodes (the deck, the card and its way back included).
- **Phases:** `S.f.b6_c7_ph` 1 at sea (set at `b6_c7_start`), 2 the Perish (set at `b6_c7_perish`), 3 the cold realm (set at `b6_c7_realm`), 4 Malaz City (set at `b6_c7_landfall`), 5 the horns (set at `b6_c7_signal`). `b67Next()` says where the chapter goes on from after any "Not now"; the fire's "On." and the captain take the player there.
- **The first halt** is `b6_c7_start`, with `b6DeckChoice(7)` among its choices.
- **The reading:** `B6DECK[7]`: scene `b6_sea`, "a hatch cover lashed down amidships, with a lantern hung off a stay above it and a water jug wedged against the coaming" (table `bh:7`), back `b6_c7_deck_done` ("Back to the deck."); lines for `marrow`, `tallow`, `oldninth`. Nodes `b6_c7_deck` (`b6DeckOffer(7)`) and `b6_c7_card` (`b6DeckCard(7)`). The vision (Keneb on the jetty, bh-canon §12) is the visions pass's.
- **The fire** `b6_c7_fire`: the cook's sandbox at sea (phases 1–3), a tar barrel on the jetty (4–5). `feverHTML()` in its `html`; a rest once at sea and once on the jetty (`rest()`; flags `b6_c7_restSea`, `b6_c7_restJetty`); the squad's talk (one line each, at sea and on the jetty, for every possible Third squadmate); "Have … see to the fevered" when `b6FeverList()` and `b6CanCure()`; "On." (to `b67Next()`); "Not now." The roster is added by 38c (`ROSTER_FIRES.bh[7] = ['b6_c7_fire']`). The games pass wraps it.

## Fights (numbers for the balance pass; no rule changed)

The Third is level 16 at a `--from=7` start (the brief: 16–17) and should finish at 18. Engine pay is `XPK` 0.6.

| Fight | When | Foes | xp (raw → paid) |
|---|---|---|---|
| `b6_c7_alley` (optional) | the fish-shed alley, phase 4 | `b6_rioter` ×4, `b6_c7_ringleader` | 220 → 132 |
| `b6_c7_jetty` (main) | the street mouth, phase 4 | `b6_rioter` ×6 + a wave of 2 at round 2; ally `b6_regular` | 400 → 240 |
| · stage2 "The jetty's foot" | | `b6_c7_ringleader`, `b6_rioter` ×4; ally `b6_regular` | 220 → 132 |
| `b6_c7_guard` | the City Guard, phase 4 (or talked off: Wits 17) | `b6_cityguard` ×3, `b6_c7_guardsgt`, `b6_rioter` ×2 | 320 → 192 |
| `b6_c7_streets` (the `wickans` road) | the Wickan house in the lanes | `b6_rioter` ×3, `b6_cityguard` ×2 | 320 → 192 |
| · stage2 "The landward gate" | | `b6_cityguard` ×2, `b6_c7_guardsgt`, `b6_rioter` | 140 → 84 |

- Base path (jetty + guard fought): 564 paid; with the alley 696 (level 16 → 18 exactly at 5236 ≥ 5200). Talking the Guard off costs 192 xp; a squad that also skips the alley ends at 17. Flag for David: the balance pass may want the Guard's talk to pay something, or the jetty more.
- **This file's foes** (kinds already drawn): `b6_c7_ringleader` ("A docker with a boat-hook", `bruiser`: hp 44, ac 13, atk 10, dmg 1d10+3, reach 2, boss, rally + shove); `b6_c7_guardsgt` ("A Guard sergeant", `b2soldier`: hp 50, ac 16, atk 11, dmg 1d10+4, boss, rally). The engine's `b6_rioter` and `b6_cityguard` are used as they are; FSCALE's Chapter 7 row grows all of them.
- **Fever:** no fight here spreads it (the brief's Ch7 section names none). The fire and the hold cure it from a scene: a walking healer, else after Chapter 4 (`S.f.b6_soliel`) a carrier's touch among the 9th, else the 9th's surgeons. The test catches it on Tangle and has Marrow break it.

## Checks and "yes, but"

- The trick at the Grey Helms' drill, ✦ **Might 17** (Ottar +3, Haddat +2, Darrut +2, Hessa +1, Ramin +1, Mehet −2, Tangle −1); yes-but bruised.
- The alley, Guile 16 (you +2, Rasp +2, Darrut +1, Ottar −2); yes-but rattled.
- Bracing the jetty with harbour carts, Might 17 (Ottar +2, Darrut +2, Haddat +1, Tangle −1, Mehet −1); yes-but bruised; a pass gives surprise.
- Reading the Guard's order out, Wits 17 (you +2, Darrut +2, Rasp +1, Tallow +1, Sathi −2); yes-but bruised (a cobble).
- Over the roofs in the lanes, Wits 16 (Mehet +2, Sathi +2, Tebbet +1, Ottar −2, Darrut −1); yes-but bruised; a pass gives surprise.
- No silver costs (money is not the scene anywhere here). No fever cost.

## The trick

**The Grey Helms' Wall** (`b6_c7_wall`, `AB.t_b6_c7_wall`): Blue Fire's mechanics (`bluefire`), in the Perish's words. Chapter use, twice (one more from level 5); range 4; 2d6+`lvDmg()` to everything in a 3×3, squad included; everything caught is reeling (`dazzleUntil`, −3 to hit through the next round). Not a throw: no `boom` (so it works in a no-throw fight) and no scatter; the blast lands after a short delay as a thrown munition's does. Not sorcery. Learned at `b6_c7_drill` from phase 2; the shield `b6_c7_greyhelmshield` comes either way.

## Recruit

**Ottar** joins at sea (`b6_c7_ottar`): "Then walk with the Third" calls `b6Join('ottar')` (waits with the Grey Helms when six walk: `S.f.b6_ottarDone = 2`, `S.camp`); "Stand with the transport's marines" sets `b6_ottarDone = 0`. He has lines at the fire (sea and jetty), the realm (his god's), the roads, the battles, and the finale.

## Items

- `b6_c7_greyhelmshield`: armour slot, role `shield`, **+2 armour**. From the drill, pass or fail.
- `b6_c7_malazcloak`: armour slot, role `light`, +1 armour, +3 health. From the Wickan grandmother after the mob is beaten.
- **Art placeholders:** this file sets `ART['item/…'] ??=` borrowed pictures (`b3_c3_shield`, `b2_wickanhide`) so the lint passes before 107b lands. If the artist also uses `??=`, the borrowed picture would win: the artist must assign plainly.

## The key `b6_c7_key` (the roads)

Chosen at `b6_c7_roads` (from the horns `b6_c7_signal`, the captain after the Guard, the plank, or the fire), phase 5. "Not yet" steps away.

- **`adjunct`**: up the plank with the fleet; out of the harbour before Nok's warships close the mole. Loyalty: Ottar +1, Tangle +1, Rasp +1, Keth −2, Sathi −1, Orvas −1. **Book Seven imports it**: `b67Onward(s)` is true only for a finished Book Six save on this road. The road page and the end screen say so.
- **`jetty`**: hold the jetty's foot while the last boats go; left in Malaz City. Haddat +1, Hessa +1, Darrut +1, Mirrel +1, Ottar −1, Tangle −1. No road onward.
- **`wickans`**: into the lanes after a Wickan family (`b6_c7_lanes`, the `b6_c7_streets` fight and its stage2 at the landward gate), and out of the city with them. Sathi +2, Keth +2, Orvas +1, Marrow +1, Ottar −1, Rasp −1. No road onward.

## Earlier keys read here (each with a default)

- `b6_c1_key`: `bury` → the fate pages and the sergeant's page say the old dead were put back; anything else → "the barrows stayed open". The Ch3 fallen's page names the barrows either way.
- `b6_c3_key`: `in` → the fate pages say the squad went into the streets to hold Sinn's way open; anything else → held the gate. The squad's Book Six dead (`S.dead[id].ch === 3` with no `from`) are named in the intro, by the captain at sea, on their own fallen page and in the coda.
- `b6_c5_key`: `sail` → aboard since the first day (the intro and the ambush, one line); anything else → held a day on the shore.
- `b6_bone` → the finger bone on the fate pages and the old soldier's line.
- The Fourth's keys (`b6_c2_key`, `b6_c4_key`, `b6_c6_key`) and `b6_fourthRoad` (default `highfist`) only in the dispatch-boat rumour (one line) and on the Fourth's road page.

## The finale (both squads)

- **37's pages are kept**, and this file wraps `finPages` and `showFinale` (Book Six only, `b6On()`): the Third's road (`B6CH7.finale.endings`), a fate page per Third squadmate, the Third's fallen and waiting (`gone`), the Third's sergeant; then **the Fourth's road** (`b67road4`: `S.f.b6_fourthRoad`, with Ch2/4/6's keys in one paragraph), **a page per Fourth squadmate** (`b67fate4`), **the Fourth's fallen and waiting recruits** (`b67gone4`), **the Fourth's sergeant** (`b67fate4` `sgt`, Book One's look, the Fourth's sergeant's name); then **Where the books meet** (`b67meet`, with 38b's `worldSVG()` sketch when present); then 37's end page (the coda, the road list across all seven chapters, the dead, the count, "The End of *Bones in the Walls*", the credit to Steven Erikson and Ian C. Esslemont). The extra pages use 37's markup and buttons (`fBack`, `fNext`), so swipe, arrows and the bot all work.
- **How the Fourth's pages read its state:** `b67AsH(fn)` swaps the Fourth in with `b6Use('h')`, runs `fn`, and swaps back (`try/finally`). Nothing is saved between. The Fourth's sergeant's portrait is painted once with `S.thread = 'h'` and lent to 19's portrait cache frame by frame.
- **The contract with Chapter 6:** `B6CH6.fates`, keyed by squadmate id (`brisk`, `kettle`, `tuft`, `ohl`, `ellis`, `vell`, `sohra`, `greysword`, `brannoc`, `ressa`, and **`sgt`** for the Fourth's sergeant), **each value a string or a function returning a string**. A function is called as `fn(id, road)` (road = `S.f.b6_fourthRoad`) **while the Fourth is swapped in**, so `b6In`, `NAME('sgt')`, `S.name`, `S.loy`, `S.dead` are the Fourth's. Read defensively: `typeof B6CH6 !== 'undefined' && B6CH6.fates`; a missing, empty, non-string or throwing entry falls back to `B67FIN.fourthFallback(id, road)` (a short generic line by road plus one habit line). Page titles are this file's (`B67_FT`); the text is Chapter 6's.
- **Labels:** squad "The Third", fallen "The fallen", away "Not at Malaz City", the sergeant's role "Sergeant · Third squad, 9th Legion, the Fourteenth"; the roll counts both squads' dead.

## Flags (for Book Seven)

| Flag | Values | Meaning |
|---|---|---|
| `b6_c7_key` | `adjunct` / `jetty` / `wickans` | the Third's road |
| `b6_ottarDone` | 1 / 2 / 0 | Ottar walks / waits / sent to the marines |
| `b6_c7_wall` (trick) | `S.tricks.b6_c7_wall.who` | who learned the Grey Helms' Wall |
| `b6_c7_mobDone` | 1 | the jetty held |
| `b6_c7_guardDone` | `talked` / `fought` | the City Guard sent off |
| `b6_c7_alleyDone` | `talked` / `fought` | the Wickan boy in the alley |
| `b6_c7_streetsDone`, `b6_c7_gone` | 1 | (`wickans`) the house cleared, out of the gate |
| `b6_c7_shouts` | 1 | the Fist's shouts heard (the army is the Adjunct's, as soldiers tell it) |
| `b6_c7_ambushDone`, `b6_c7_sepik`, `b6_c7_perish`, `b6_c7_realm`, `b6_c7_wolvesHeard`, `b6_c7_jak` | 1 | the sea's steps |
| `b6_c7_drawn`, `b6_c7_reader`, `b6_c7_noCard` | | the reading (100c) |

## Canon calls (sources) and what is invented

- The ambush, the wall of water and Quick Ben's "wall of earth", illusion then more (W18): seen from a transport's rail, the marines on the next ship shouting that it was the High Mage's work. Quick Ben is never named in narration.
- Sepik deserted, harbour wrecked, no landfall (W19). Why: "the Edur were here first", the master's guess only.
- The Perish Grey Helms meet the fleet; their Destriant boards the flagship (W20). **Invented in the margin:** single Grey Helms sent across to some Malazan ships to learn how they fight (Ottar's bio says he was sent across). The Destriant is never named; the Perish's purpose stays open (keep-open §7).
- The Nemil supply ships run for home (W20): one line.
- The realm of Togg and Fanderay (W21): ice, roaring water, ships that seem to fly, wolves heard; the gods are never named in narration ("his and hers", Ottar).
- The Jakatakan fleet, hostile in manner (W22): one paragraph; no Claw, no Nil and Nether.
- Malaz City (W21, W23): the pogrom against the city's Wickans; Fist Aragan new a month (p. 665, by rumour); the marines hold the main jetty; a Fist's shouts turn the army (the words never quoted: a runner's paraphrase only, as belief); cussers on ballista bolts heard (Cuttle unnamed); the Perish hold the centre docks; the Red Blades go up to the Hold and the Hold wants the Wickans and Khundryl handed over (rumour); the fleet sails before Nok's ships can engage. Mock's Hold only over the roofs. The Empress is never named.
- **Claude's calls:** the squad's jetty is a neighbouring one (bh-canon §14); the City Guard come for the Wickan families under an order never shown whose; a Wickan family in a lane house and the landward gate (the `wickans` road) are inventions in the gap. The `wickans` road's family heads for a fishing village on the island's far side (no named place).
- **Never:** Mock's Hold, the Centre District, Admiral Bridge, Raven Hill, the Mouse, the Hanged Man, Smiley's, Fiddler's tenement, the Deadhouse, the First Throne, the Froth Wolf, the Silanda; no word with any canon character. T'amber, Kalam, Rynag, Koryk, Cuttle, Run'Thurvian unnamed. The test greps for every one.
- "Bonehunters" is said once, by the old soldier, as the marines' own name (keep-open §7).
- The captain is unnamed ("the captain"; kind `b4_c1_hollet`). No new named people beyond Ottar.

## Unsure

- Whether the ambush came before or after Sepik in the fleet's road: W18 then W19, so ambush first; followed.
- Whether the Jakatakan fleet meets them before Malaz City or off Quon Tali's coast earlier: W22 only says it meets them; "two days" from Malaz is Rasp's guess.
- The Wickans in Malaz City are written as the city's own, grandchildren of riders, not Temul's riders (W16 says most of the army's Wickans were leaving; W23's pogrom is the city's).

## Engine work in this file (guarded)

- `finPages` and `showFinale` wrapped for Book Six (the two-squad finale). Other books untouched (`b6On()` first).
- No other engine change. Nothing in `src/100*`, other chapters or Books One–Five was edited.

## Test status at commit (Wed Nov 4, 2026, late PST)

- Passed: `python3 build.py`; `node --check` on both files; `node tools/lint.mjs` (0 errors; 4 style warnings of the same kind as Book Four's); `tools/b6ch7_test.mjs` all ok (before the picks workaround); `trope_scan` (no Book Six budget over); `play.mjs 1` OK; `repeat_scan` and `trope_test` exit 0.
- **Not yet run / not confirmed:** `play.mjs 3 --book=bh --from=7` after the picks workaround (before it, 3/3 stuck at the level-17 picks modal: the engine gap above); `b6ch7_test` after the workaround; `recruit_test` (exit 1 in a mixed-up run; cause not read); `b6engine_test`, `roster_test`, `reading_test`.
- **Engine gap for the lead:** VET_LVLS has a seventh level (17) but PICKS.vet has six picks; the guarded workaround here skips a level nobody can take. A seventh veteran pick in 014 would be the real fix.
