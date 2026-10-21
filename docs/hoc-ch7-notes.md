Wed Oct 21, 2026, 6:12 AM PDT. Book Four, Chapter 7, "The Convergence", and the end of Book Four (`src/77_b4_ch7.js`, art `src/77b_b4_ch7_art.js`, test `tools/b4ch7_test.mjs`), against v7.0.0 on `b4-ch7` (not shipped).

# Chapter 7 notes: The Convergence, and the end of *Unblooded*

Raraku (HoC ch 25–26): the night before the battle at the flank picket of the blocking force; the dead riding down the Dogslayers, seen only as light, dust, riders, a sound at a league, butterflies and a Wickan standard, and one face; the mortal fight before dawn at the end of the line (or the band let go by); the silent morning, Gamet dead and Keneb Fist, the duel watched in silence, a giant riding past far off, a bound man brought in, Ranal in camp talk; the Wickan children's warning, the run, the flood; the coral island, the last reading, the trick, the roads; the finale. Dust 3 through the night (the engine's `B4DUST`); after the duel the chapter sets `S.dust = 1` ("the dust that has been in the air since the Wall comes down out of it").

## Shape

- **Areas (4):** `b4_c7_picket` (the flank picket at night, ground `b4_c7_picket`, dark), `b4_c7_breach` (the end of the line before dawn, `b4_c7_breach`, dark), `b4_c7_line` (the same picket ground in the morning, `b4_c7_picket`, lit: a separate area because an area's `dark` is fixed at registration), `b4_c7_isle` (the coral island after the flood, `b4_c7_isle`).
- **Nodes:** 78 `b4_c7_*` dialogue nodes (deck and card included).
- **Phases:** `S.f.b4_c7_ph` 1 dusk at the picket, 2 the night (after the outriders), 3 the dead have ridden, 4 before dawn at the end of the line, 5 the morning, 6 the island.
- **The first halt** is the picket at dusk (`b4_c7_start`). **The Deck is not on it**: the brief fixes this chapter's reading place as the coral island after the flood (`READTABLE['hoc:7']`, "pale coral stone, dawn, mist"), so `b4DeckChoice(7)` is on the island's first halt (`b4_c7_isle_arrive`) and at its fire. The shared rule ("among the first halt's choices") and the section disagree; the section is the specific one. **Claude's call.** `B4DECK[7]`'s scene is 70's `b4_coral`, redrawn in 77b. The cards "settle" in all three readers' words, and nobody says why (L'oric's sanctioning, echoed only so).
- **The Herald's words** (70c's `B4SAY.herald`, written for the eve before Pan'arak where Chapter 6 also lays it) get island variants for Chapter 7 only, wrapped in this file (`S.chapter === 7`); Chapter 6's reading is untouched.
- **The fire** `b4_c7_isle` (no game, the roads): `again:` line; a rest (once); the squad's talk (`b4_c7_isle_talk`, a line per squadmate present, Orvas/Ramin/Keth and Hackle guarded); `b4Offers()` swaps ("Send across the water for…"); "Find Radde first" until the orders are read; then "The road out" (the key), and after it "The last of it" (the end); "Not now".
- The picket has a shielded fire too (`b4_c7_shield`, a hide over a pit of coals), with an `again:` line, a rest and a line each; it is not the chapter's hub.
- Every onward step has "Not now" (or "A moment", "Not yet", "Give me until the fire burns down"); the far edges are "Not that way".

## The night, and the one face (David's rulings)

- From the screen, in order: a sound like a battle fought on the far side of a hill (Nerve −1, "nobody knows what"); the dark above the oasis thinning in the wrong place; butterflies over the trenches; a Wickan standard on the shoulder of the nearest ramp, nobody holding it; then a sound a league off, the ground trembling, and out of the desert behind the army grey light low on the ground, dust going up off it, and riders with no sound of hooves: Wickan braids, crow feathers, Khundryl tears, the old Seventh's helms, the Chain's cloaks, the army that hung in the trees along the Aren Way, and older riders out of the sand. They ride for the ramps. The light goes up into the trenches, and after that nothing: no sound, the fires going out one by one. **Headline only**; the trenches are never entered on the page, and in the morning they are silent.
- On `b4_carried` (Ch3) some riders come wet to the knee, and the Third knows without saying which.
- **The face** (`b47Face()`): on a transfer `b4Fallen()[0]`; on a fresh start Sathi. If a transfer lost nobody, it is a cook of the Chain's Seventh the squad called **the Ladle** (an invention: the squad names him by what it called him).
- **How clearly** (`b47Sure()`): `b4_saw === 'close'` (Ch6's forward road) plainly, for a breath; far but Ch2's Fall climbed (`b4_fallClimbed`, Ch2's promise) "near enough to be nearly sure, and then sure"; otherwise "a shape they are sure of".
- On `b4_bone === 'chain'` the rider has the Ch1 token at the throat beside the finger bone (`b4_c1_token` in words).
- The rider never speaks; the narrator never names them. **The squad names them** (`b47Namer()`: whoever knew them best and is still here, else the sergeant), and the name is only in that one quoted word. Orvas sees the Burned Tears' dead with a woman at their head (Gamet's vision's rider, R25), Keth's grandmother sees "all of them".
- The choice: say it back so the recruits hear "Our dead ride with us" (Nerve +1), or keep it in the Third (the namer +2, Haddat +1, Marrow +1). `b4_c7_faceSaid` = `aloud` / `kept`.

## The mortal fight

- Signposted at `b4_c7_predawn` on the choice itself: **"Hold the end of the line." (a mortal fight: whoever falls here stays down)**, with "Let them go by" and "A moment" beside it; again at the end of the line (`b4_c7_hold`: "Let them go by after all", "Not now").
- **`b4_c7_breakout`** (`mortal:true`, `hurtMost:true`, `company`): a band of nameless desert warriors running out of Raraku before dawn, east past the last picket; never Leoman, Corabb, Mathok or the Dogslayers' main body, away from every named squad. Stage 2 *Past the last picket*: they turn and stand rather than be ridden down in the open. The dead are recorded by the engine (`kill`, `S.dead[id] = {ch:7, where}`; `where` is the ground they fell on, *The end of the line* or *Past the last picket*); the aftermath names them, Nerve −1, Radde writes them down.
- **On `b4_saw === 'close'`** (a `battleDef` wrap in this file): every foe two rows nearer, one more of them, the wave a round sooner; the log says why.
- **Let go** (`b4_c7_letgo`): Nerve −2 ("the company saw"), no fight, on to dawn.

## The key `b4_c7_key` (the road out)

Asked on the island after Radde reads the orders ("across this entire continent").
- **`line`**: on after Leoman with the 9th, in the Second Company's file. Nerve +1; Darrut, Hessa, Tallow +1, Tebbet −1. To Book Six.
- **`horse`**: with the Fourteenth's riders. The leader (`S.f.b4_c7_lead`, `b47HorseLead()`): Orvas walking, else Keth walking, else Orvas waiting near with the Khundryl, else Keth waiting near, else Sathi (Temul has Weasels with him), else `boy` (a Wickan youth of Temul's). Nerve −1 (the Second Company loses its Chain squad); Sathi +2, Orvas +2, Keth +1, Tangle −1 ("I'll walk"), Darrut −1. **When Orvas leads he gives the sergeant the black bead** (`b4_c7_tear`; `S.f.b4_c7_tear`), and if he was waiting near with no other recruit walking and room, he joins. To Book Six.
- **`ledger`**: out of the ledger. Radde writes the Third down as *lost in the water*, properly, and they wade south off the end of the island in the dark; Darrut goes home to Aren (walks them that far and stops). Nerve −1; Darrut +2, Haddat +1, Tebbet +1, Hessa −1, Tallow −1. No road onward. The narrator never says how a squad goes missing in canon; it is Radde's wet page, and nothing else.
- `chapterEnd(7, key)` from `b4_c7_last`; the end screen opens the Epilogue (37).

## The finale (`B4CH7.finale`, read by 37's `showFinale`)

- `labels`: "The Third", "The fallen", "Gone back to their people", "Sergeant · Third squad, 9th Legion, the Fourteenth Army", "The Third's road", no prologue, "The roll", no proclamation paper, **"The End of *Unblooded*"**, and the credit to Steven Erikson and Ian C. Esslemont.
- `endings` (getters): `line` "On after Leoman", `horse` "With the riders", `ledger` "Out of the ledger", each three paragraphs, then **the Nerve count** (`B4FIN7.nerve()`: Nerve n of 10 and what the Second Company is now; the regulars who ran, if any). Scene `b4_c7_finale` (drawn by road).
- `fate(id, key)`: a page for every squadmate at the end (Haddat, Sathi, Tangle, Marrow, Tallow, Hessa, Tebbet, Darrut, Orvas, Ramin, Keth), by road and by regard; the Dead Ride's bearer gets a line.
- `gone(id, key)`: **Fallen** for anyone the mortal fight took (their kit's fate, Radde's book); **"With his people"** for a recruit not walking at the end (Orvas with the Khundryl, Ramin with the Red Blades, Keth with the Wickan youths); and **one page for the Barrow dead under the face the squad saw**, headed "Among the riders" (a small `showFinale` wrap in this file relabels 37's "The fallen" and the "where" line for that page only, guarded by `b4On()` and the page's own `riders` mark). The other Barrow dead are named on it, not given pages of their own.
- `ids()` puts that face's id last, so the order is: the road, the squad, the fallen and the gone, the riders, the sergeant, the end.
- `sgt(key)`: the road, the face, the end of the line (or the band let go), the trick, a scar if the mortal fight left one, the bone at the throat (and the Chain token beside it on `chain`). "Nobody has a name for it yet."
- `coda(key)`: the Whirlwind over (the ride, the silent trenches, the duel, the sea), Gamet dead, Keneb Fist, Dom brought in bound, Leoman away and the pursuit ordered; the Third's part; **the bones, the standard (a thin figure holding up a bone before a sandstorm), the new sea**. Never Y'Ghatan's end, never "Bonehunters".
- End screen tease: "Next, far across the sea: another people's war, and their unblooded. The Fourteenth's road goes on, and waits for the Third." (Book Five's novel is Midnight Tides; nothing of it is named.)

## Flags later books may read

| Flag | Values | Meaning |
|---|---|---|
| `b4_c7_key` | `line` / `horse` / `ledger` | the road out |
| `b4_c7_lead` | `orvas` / `warlock` / `sathi` / `boy` | `horse` only: who took the Third to the riders |
| `b4_c7_tear` | 1 | Orvas gave the sergeant the black bead (`horse`, Orvas leading) |
| `b4_c7_face` | a squadmate id / `ladle` | the face seen among the riders |
| `b4_c7_namer` | a squadmate id / `sgt` | who said the name |
| `b4_c7_faceSaid` | `aloud` / `kept` | the name said to the picket, or kept |
| `b4_c7_faceSeen`, `b4_c7_ride`, `b4_c7_heard` | 1 | the face seen; the ride seen; the sounds heard |
| `b4_c7_breakDone` / `b4_c7_letGo` | 1 | the mortal fight held / the band let go by |
| `b4_c7_sword` | 1 | the Dogslayer's sword taken at the ramps' foot |
| `b4_c7_coral`, `b4_c7_strangers`, `b4_c7_flood`, `b4_c7_duel`, `b4_c7_giant`, `b4_c7_bound`, `b4_c7_ranal`, `b4_c7_warned`, `b4_c7_morning` | 1 | seen / done (the glossary reads `b4_c7_ride` and `b4_c7_flood`) |
| `b4_c7_recTold` | `steady` / `true` | the recruits at the picket (steady: Nerve +1) |
| `b4_c7_look` | `ok` / `no` | the lookout's check |
| `b4_c7_rideTried` | 1 | the trick's check made at the shore |
| `b4_chains` | 1 | a Chains card drawn on the island |
| `lastFallen`, `S.dead` | engine | the mortal fight's dead (ch 7, no `from`) |

**Flags read from earlier chapters, with defaults:** Ch1 `b4_bone`, `b4_c1_token` (the rider's token; unset, no token); Ch2 `b4_fallClimbed` (the face "near", only if 1); Ch3 `b4_carried` (riders wet to the knee, only if 1), `b4_orvasDone`; Ch4 `b4_setiSaved` (the Seti archer at the picket), `b4_blistigNoticed` (the intro's "asked for by name"; Blistig's look on the island); **Ch6 `b4_saw`** (`close` / `far`, default far: written at the same time; read only as the brief promises it). From the transfer: `b2_ilhar` (Haddat at the silent trenches and in her fate: left open), `b2_hackleBack`.

## Nerve in this chapter

The sounds −1; the recruits +1 (or 0); a clean company fight +1 (engine; the outriders, and the breakout if nobody goes down); the name said aloud +1 (or 0); the breakout: a death −1, or let go −2; the silent trenches +1; Gamet −1; the key: `line` +1, `horse` −1, `ledger` −1. The test's path (fought, Tangle killed) ends at net +2 (`line`) and 0 (`horse`, `ledger`).

## Inventions (Claude's calls)

- **The flank picket**: a line of scrapes behind a screen of brush and hide on a low rise at the far end of the block; the shielded fire under a hide; the lookout rock and its regular; Radde's eleven "won't stand" on a shaky night.
- **The outriders at dusk**: desert warriors who ride for Sha'ik, round the end of the block to count its stakes; the gully where they left their horses. Never Dom's, never inside the camp.
- **The band before dawn**: forty or fifty on foot, some unarmed, some carrying others; "the one with the good sword". Nameless; where they came from inside Raraku is never said.
- **The Ladle**, the Seventh's cook (only when a transfer lost nobody at the Barrow).
- **The freckled recruit's brother**, who went with the Seventh out of Aren before the rising; she looked at every rider. Haddat takes his name for the night list.
- **The Dogslayer's sword**: weapons lying at the foot of the ramps the morning after, marks filed off; the 9th sent to pick up arms "not in the trenches" (Baralta's Red Blades have the trenches).
- **The spur**: Whirlwind men cut off by the flood on a coral spur between the 9th and its island.
- **The Wickan boy** of Temul's youths running the line with Nil and Nether's warning.
- **The Second Company's count on the island**: all present but four in the water and two on the 10th's island.
- Items: `b4_c7_coral` (trinket, +1 wits; free at a coral head); `b4_c7_dogslayerblade` (weapon, +1 to hit, 1d10+2; a Wits 14 check, "yes, but" a white-faced trip further up the ramp than anybody meant to go); `b4_c7_tear` (trinket, **its own effect**: the wearer's first hit in each fight carries 2 more, "for the dead"; an `attack` wrap in this file).
- The trick **The Dead Ride** (`b4_c7_deadride`, `spirit:true`; ✦ Wits 16 at the shore, offered only after the face was seen; the namer +3, Keth +2, Orvas, Sathi and Marrow +1, Tebbet −1): once a fight, a rider of dust rides down an enemy within 4 of the bearer for 2d6 + (2 + level step). Spirit-craft: the dust never fouls it. Carried to Book Six.

## Canon as written

- **What the line saw** (hoc-canon §7.4: R25, W25): sounds of battle almost heard, the dark above the oasis changing, butterflies over the trenches, a Wickan standard by the trenches, a sound a league off; the dead were Raraku's ghosts, the army's own, Pormqual's crucified soldiers and the Chain's (R25, R26, W *Gamet*). Gamet is not named among them, and no rider is drawn so as to be him.
- **The morning** (R26, W26, W *Gamet*): Gamet died in the night in his bed; "a clot in the brain", Keneb says (the fall in the fog is the camp's guess, from W *Gamet*); Keneb is Fist. The army watches the duel in silence; one thrust; the helm covers the face; the line is too far to see anything after; nobody in the Third wonders who it was. The giant on a Jhag horse (Orvas's word for the horse) rides west past the army and says something to the Adjunct's people that does not carry to the picket; the camp says "the Malazans were not his enemies any more". A bound man in a filthy Malazan officer's cloak is brought to the Adjunct between two figures the line cannot make out; "the camp says it was Korbolo Dom". Ranal dies in a sandstorm chasing desert warriors with marines; "pale riders" in the storm; the marines came back. Sixteen strangers come out of the water onto the next island, a girl among them, never named. The Wickan children's warning; the run; "a grey sheet of water"; the army reaches the coral ahead of it; the pursuit of Leoman, "across this entire continent" (R26).
- **Never on the page:** inside the rebel camp, the ride itself up close, the trenches' insides, the duel ground, Felisin's body, the sandstorm, the Liosan (beyond "pale riders"), the reunion, Sinn's fight, the defile; Leoman, Corabb, Mathok, Karsa's name, the Knight of Chains, Dom's fate, the Book of Dryjhna, Y'Ghatan's end, "Bonehunters", "3rd Company", "Dancer's Tavern", the never-use names, a Burn's Sleep year.

## Left open on purpose

- Who the band before dawn were, and where the ones who got away went.
- Whether the freckled recruit saw her brother.
- Ilhar (Haddat's brother, on a transfer that sent him to Dom): never learned; "she has stopped asking the dust".
- What the strangers off the water were.
- What the black bead means (the Khundryl never say).

## Canon points I was unsure of

- **Where the dead came from relative to a flank picket.** Canon has them gathering and Gamet riding up the main ramp; here they pass the end of the picket line on the way to the ramps (near on the forward road, a long bowshot otherwise). The squad never sees what they do there.
- **Whether the Whirlwind's dust fell with Sha'ik's death.** Written as the dust coming down over an hour after the duel (the goddess dying, unexplained), with `S.dust = 1` after; Ranal's sandstorm is still a storm.
- **Karsa's words to the army** are camp talk only (W26: he says they are no longer his enemies); whether he said them to the Adjunct's people or the army at large is written vaguely.
- **The Red Blades holding the trenches in the morning** (Baralta's men find Kindly and Pores in the Dogslayer camp, R26): the 9th's errand at the ramps' foot is the game's.
- **"Across this entire continent"** is R26's phrase; given to Radde as the order's words.

## Engine additions in this file (all guarded by `b4On()` or `S.chapter === 7`)

- `battleDef`: the breakout nearer, bigger and a round sooner on `b4_saw === 'close'` (`def.b47Close`), and a `startBattle` wrap that logs it.
- `attack`: the black bead's +2 on the wearer's first hit in a fight (`u.b47tear`).
- `B4SAY.herald`: island words for Chapter 7, falling through to 70c's elsewhere.
- `showFinale`: relabels the Barrow dead's page "Among the riders" (and its where-line) when the page's `gone` object carries `riders`.
- `TRICKS.b4_c7_deadride`, `AB.t_b4_c7_deadride` (spirit).

## Art (`77b`)

- **Figures:** `b4_c7_fleer` / `b4_c7_fleerbow` / `b4_c7_fleechief` (a desert warrior running: robe hitched into the sash, bare shins, the head-cloth loose and streaming, leaning into the stride, dust kicked up behind; the chief bigger, bearded, mail under the robe, a straight gilt-guarded sword), `b4_c7_ghost` (a horse and rider of grey light and dust, drawn `lighter`, flickering, dust streaming back; a soft brightness for a head, no face ever), `b4_c7_karsa` (a near-black silhouette, the horse bigger than any horse, the rider as tall again, something long across his back, the low sun on one edge; only ever drawn small and far).
- **Ground:** `b4_c7_picket` (75b's hard sand; thorn scrub; the brush-and-hide screen on its stakes; the scrape and its spoil bank; the shielded fire; the lookout rock), `b4_c7_breach` (the same cooled toward blue, the east paler, the last stakes), `b4_c7_isle` (pitted coral with a pink flush, wet sand with a sheen, one grey-green water with a lace of foam at the coral, coral heads, a driftwood fire). Battle `t`: a stretch of screen / the last stakes / a coral head; `o` on the isle is water.
- **Backdrops:** `b4_c7_night` (the basin, the dead city, three ramps with trenches and fires; after the sounds, the dark above the oasis thinning, butterflies, a pale standard on a ramp's shoulder), `b4_c7_ride` (a river of grey light low across the basin and up into the trenches, dust off it, faceless riders half lost in it), `b4_c7_predawn` (the last stakes, the east paling, small running figures until the fight is done or let go), `b4_c7_morning` (grey light, no fires, dust falling; clear after the duel, the Red Blades at the ramps' foot), `b4_c7_duel` (the army's lines far left, the dead city far right, a grey horse and two specks; after, one on the sand), `b4_c7_giant` (the clear plain, the army right, the giant far off walking west), `b4_c7_flood` (the white floor, coral islands, a grey sheet of water with a froth front, the army running), `b4_coral` (70's, redrawn: dawn mist on the new sea, the next islands with the army, the near coral, the Third round its driftwood fire), `b4_c7_finale` (by road: the column on the far shore under its standard; riders out ahead on `horse`; a few figures wading south on `ledger`).
- **Items:** the coral knuckle, the Dogslayer's sword (filed marks, rewound grip), the black glass tear on its thong, on 75b's `b45Item` (71b's frame).
- Contact sheets at phone width: `/tmp/claude-0/shots/b4/ch7/` (`sheet_scenes.png`, `sheet_maps.png`, `sheet_water.png` and the single shots).

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b4_c7_outriders` | the scrub at dusk | 170 + 85 | `company`; Dust 3; a wave at round 3; stage 2 *The gully*; Tangle's two sharpers; Wits 15 to come at them from below (surprise) |
| `b4_c7_breakout` | the end of the line before dawn | 180 + 90 | **mortal**, `hurtMost`, `company` (the two regulars at the last stake); Dust 3; a wave at round 3 (2 on `close`); stage 2 *Past the last picket*; Tangle's two sharpers; Might 15 to pull the stakes across the gap (surprise; "yes, but" a forearm opened) |
| `b4_c7_spur` | the coral spur in the flood | 170 + 85 | Dust 1; water (`o`) at the edges; a wave at round 2; stage 2 *The island's foot*; Tangle's burner; Guile 15 to shout to them in the desert tongue (surprise) |

All three: 780 base, 468 paid; level 14 → 15 (the test reaches 15 on all three roads). With the band let go, 510 base, 306 paid, and the chapter ends at 14 (both `play.mjs --from=7` runs let it go and ended at 14).

**Balance** (`tools/balance.mjs`, a scratch `--patch` putting each fight in a fresh Book Four state at Chapter 7: level 14, Nerve 5, Dust 3, a card from `B4POOL[7]`, Orvas in the squad; B4GAP and every rule unchanged):
- First pass (fleers 24 health, 1d8+3 and bleeding; two waves in the breakout; stragglers bleeding): Soldier 100% on all three (15%, 14%, 8% health lost), but Bridgeburner 83% / **13%** / 63% (24 runs). The foes as shipped: fleers 22 health, 1d8+2, hit-and-run instead of bleed; their leader 40; one wave; the two regulars at the last stake brought in as `company`; stragglers 22 health, no bleed.
- **Soldier, level 14** (16 smart, 6 naive): outriders 100% (14% health lost, 0.13 downs), breakout 100% (14%, 0.06 downs, 0 dead), spur 100% (12%, 0.25). Naive 100% on all three (40–51% lost).
- **Bridgeburner, level 14** (40 smart): outriders 95% (48% lost), breakout 95% (48%, 0.03 dead a fight), spur 85% (51%).
- The 24-run passes swung wildly on small changes (the breakout read 38%, 63% and 92% for neighbouring tunings), so the 40-run numbers are the ones to trust. **For David (step 14):** Soldier is comfortable; Bridgeburner sits a little above the 75–80% target on all three, the mortal fight kept on the gentle side on purpose (it kills about one squadmate in thirty fights on Bridgeburner, none on Soldier). Nothing was changed in any rule.

## Tests

- `tools/b4ch7_test.mjs` (22 checks): a fresh start at level 14 (Orvas walking, the Ch1–5 roads set, `b4_saw` unset) through the picket (Radde's Nerve widget, the recruits, the Seti archer, the lookout, the shielded fire a line each), the outriders (Dust 3, the company, both grounds, Nerve +1), the night (sounds −1, the dark, butterflies, the standard, the league, no hooves), the face (Sathi, far-but-Fall, the crow feather, unnamed by the narrator, Haddat says it; aloud +1), the signpost; the mortal fight fought with Tangle killed (both grounds, `S.dead.tangle` ch 7, the aftermath, Nerve −1) and let go from the same moment (Nerve −2, no fight); the morning (silent +1, Gamet −1 and Keneb, the duel in silence with no names and the dust to 1, the giant unnamed and far, Ranal, pale riders, Dom); the sword's "yes, but"; the warning, the run, the spur (Dust 1, both grounds), the flood; the island (the reading, the cards settling, the Herald's island words, the fire, the Dead Ride learned by the namer, the coral, sixteen strangers, the pursuit); **all three roads to the end screen and through every finale page** (no leaks; the road page's Nerve count; "Among the riders"; Tangle's Fallen page; the sergeant's bone; the end page's endline, credit, bones, standard, sea and pursuit; no Y'Ghatan, no Bonehunters; the bead on `horse`); the Dead Ride and the bead in a fight; then a transfer with Marrow dead at the Barrow, Sathi alive, Ramin walking, Orvas waiting and `b4_saw` close: every node renders, the face is Marrow's plainly and Haddat names her, far-and-no-Fall reads "a shape they are sure of", a fresh start on the forward road sees Sathi plainly, Ramin named in 9 of 10 sampled nodes, Hackle at Sathi's knee, the breakout sooner and harder (6 foes against 5, nearer, the wave at round 2), the swap to Orvas at the island fire, and the horse road with Orvas leading and the bead, and its finale (Marrow among the riders, Ramin with the Red Blades).
