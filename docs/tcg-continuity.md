Tue Nov 10, 2026, 5:07 PM PST. Book Ten continuity, against branch `book10` (v13.0.0 not shipped; VERSION still 12.0.4), with the continuity read's fixes in.

# Book Ten: *Witnessed* (beside *The Crippled God*): continuity

What each chapter set up, for the finale and the series coda. This is the last book: nothing later reads this doc except the lead and David. Written by a fresh reader from `src/180`–`189` against `docs/tcg-book-brief.md`, `docs/book10-tcg-plan.md` (decisions 1–13), `docs/tcg-canon.md` (corrections 1–5, §3, §4 hard limits, rules 98–111, §9a), `docs/series-canon.md` §(a) rules 1–97, `docs/v13.0-notes.md` and the chapter, visions and games notes. Where a note and the code disagree, the code is what is described here. The read's fixes and the items for the lead are at the end.

**Two squads, one save, and a guest.** The Third (`S.thread === 't'`, Ch 1, 3, 5, 7) with the Bonehunters' heavies: the sergeant (Book Four's, Treach's, `sgt_dg` look), Haddat, Tangle, Marrow, Mirrel walking, Brask and Tegra at the baggage, Sathi dead (fresh), or a Book Nine `adjunct`/`south` transfer (Doss, Wenna, Mehet, Ottar, Book Four's spares possible). Recruit **Pruss** (Ch 1). The Letherii (`'l'`, Ch 2, 4, 6), the Sixth Company: the sergeant (Book Five's, the Errant's in Ch 2, quiet after), Tobet, Thegg, Perrit, Ammet walking, Brennet and Kaedra with the train, or a Book Nine `escort`/`adjunct` transfer (Ilsa, Sorvan, Ruuk, Brune, Pessa possible). Recruit **Tirren** (she, Ch 2). The Fourth (`S.b10f`, never played): Book Eight's on `east`, else Brisk, Kettle, Tuft, Ohl at 20 with an unnamed sergeant (never gendered); it comes over the ridge in Ch 7 (or walks up at the barrows on `south`). Pronouns: Haddat, Sathi, Marrow, Mirrel, Wenna, Hessa, Rasp, Tegra, Brisk, Kettle, Tuft, Perrit, Ammet, Ilsa, Brune, Pessa, Kaedra, Tirren, Sedge, Orla, Saffa "she"; the rest "he" (checked by script in every Book Ten file).

**The roads.** `b10TRoad()`: `adjunct` (default; into the glass) or `south` (lent to the Commander's column, drilling the Letherii Twelfth). `b10LRoad()`: `escort` (default; the Commander's brigades) or `adjunct` (a few Letherii who crossed; never beside Henar). Both default safely (`S.f.b10_tRoad === 'south'`, `S.f.b10_lRoad === 'adjunct'`, else canon's). **When both are in one column** (Third `south` + Letherii `escort`; both `adjunct`) the other squad is seen at a distance at most once a chapter, never on one stretch.

**Readers.** The Third: Marrow, else Tallow, else **the old marine**. The Letherii: Perrit, else **the tile-woman** (on `escort` only from Ch 4; she went south). The tiles go cold from Ch 3, never said why.

**Levels.** The Third 24 → 25 (Ch 1) → 26 (Ch 3) → 27 (Ch 5) → 28, the cap (Ch 7). The Letherii 16 → 17 (Ch 2) → 18 (Ch 4) → 19 (Ch 6; cap 20 never reached). Every main fight pays a level at `XPK` .6. `lvDmg` +1 at 25, `lvAc` +1 at 27 (decision 9). `B10SOLDIER`, `B10GAP` empty: balance not run.

## The recurring cast (inventions)

- **Thallo** (Book Nine's): Ch 1, 3, 5, 7, not eating, then eating again at the water (Ch 5) and at the barrows (Ch 7). Not on the `south` road until the barrows (the Twelfth's **wagon-master**, Letherii, unnamed, takes his part in Ch 3 and 5). **The heavies' captain** seen, never speaks to the sergeant. **The old marine** reads the Deck (Ch 1–7) and teaches the Last Mouthful (Ch 5).
- **Sedge** (she, the brief's): asks for file-closers at Ch 5's end (`b10_c5_lent = 'sedge'`, said once); her stretch in Ch 7; a corporal of hers with a burned hand (Ch 7 only). On `south`: **the Twelfth's finadd** (a careful moustache) and blue knots instead.
- **Rolle** (he, the brief's): the Host sergeant who brings the Fourth along the line in Ch 7 (regulars' field only); gives the Host cloak.
- **Finadd Ravel Ennic**, **Yelt**, **Orla** (she), **Saffa** (she), the tile-woman: Ch 2, 4, 6 (on the Letherii `adjunct` road Yelt, Orla, Saffa and the tile-woman went south at the parting; Ennic crossed). **The Ninth** (the next company of the brigades, Ch 2 drill, Ch 6 west end) and **the Twelfth** (the Letherii company the Third drills on `south`) are company numbers, not names.
- Horses: **Wren**, **Plum**, **Copper** (Ch 2), **Ash** the grey mare (Ch 4; Tirren takes her home on `horses`, Ch 6).
- Unnamed by role throughout: clerks, a surgeon, an old drill-sergeant, a purser, a foreign quartermaster, a foreign water-sergeant (Ch 4 `adjunct`), stragglers' sergeants and corporals, the foragers' headman, a regulars' corporal with a split lip (Ch 6 `adjunct`), a grey regular (Ch 7 `south`), a Letherii corporal at the barrows.
- No other new names (canon sheet §6 rows only).

## Chapter 1: Missing Is Not Dead (`src/181_b10_ch1.js`; the Third)

The retreat camp after the short-tails: burial lines, the allies on the horizon, news only (the Adjunct on her feet; "the mage and the captain who went in alone" walk back in with a handful of the dead Imass); the parley as lamps in a tent; camp word: east into the glass, the Letherii south ("she means to free the chained god" once, the clerk; "the Glass Desert" once). Phases 1–3, 53 nodes, 3 areas.

**Key `b10_c1_key`:** `names` (Haddat, Marrow +1; robbers at the burial lines `b10_c1_graves`; the names said, a `witness:true` check; `b10Witness(1, 'every name said')`; `S.f.b10_c1_names = 1`) or `water` (Tangle, Pruss +1; the sappers' wells; `S.f.b10_c1_water = 1`). **Read:** Ch 3 and Ch 5 (`b10_c1_water` waives each chapter's thirst once), Ch 7 (fate pages, `b107Names()` with `names` default).

**Witness:** the big tent's "yes, but" −1 (near only), `names` +1, the beat ±1. **The beat (c1):** "Why are we still here?" `each` / `word` (kept) / `nothing` (doubt). No thirst.

**Flags read later:** `b10_c1_key`, `b10_c1_water`, `b10_prussDone` (1 walks / 2 waits). **Set, never read:** `b10_c1_names` (Ch 7 reads the key instead; harmless). Words only: `named, waterDone, word, rollOk, missing, news, allies, prussSquad, slate, spade, carried`.

**Recruit:** Pruss at the burial lines (the clerk's slate). **Trick:** Every Name `b10_c1_roll` (✦ wits 21; the Khundryl Paint, free). **Items:** `b10_c1_scale` (ac 3, hp 5), `b10_c1_spade`, `b10_c1_slate`. **Fights:** `b10_c1_strippers` 380+170 (main, the Third's first), `b10_c1_graves` 100 (`names`), `b10_c1_spar` 120 (opt, survive 4).

**`south`:** the Third is lent to the Commander's column as drill-sergeants and walks to the Letherii wagons at dusk. **Left open:** nothing a later chapter needs.

## Chapter 2: The Parting (`src/182_b10_ch2.js`; the Letherii)

The brigades on a rise above the glass's edge; the Malazans lie up below and go out onto the glass at dusk; the first night south; the lizard-folk join ("Che'Malle" once, Ennic; two foreign sergeants far off). The column marches "by day as well as night" to make up ground. Phases 1–4, 48 nodes, 4 areas.

**Key `b10_c2_key`:** `watch` (Tobet +1; the edge, a `witness:true` check; `b10Witness(1, 'saw them go')`; `S.f.b10_c2_watched = 1`) or `count` (Brennet, Tirren +1; Yelt's barrels; `S.f.b10_c2_counted = 1`). On `adjunct`, `watch` is the brigades going south. **Read:** Ch 4 (`counted` waives the horses' thirst), Ch 6 (`b106Watched()`, `watch` default: a line at dusk), Ch 7 (the Sixth's line).

**Witness:** `watch` +1, the beat ±1; no "yes, but" cost. **Thirst:** on `adjunct` only, the first night on the glass. **The beat (c2):** "Why are they going?" `reason` / `commander` (kept) / `mad` (doubt).

**Flags read later:** `b10_c2_key`, `b10_c2_watched`, `b10_c2_counted`, `b10_tirrenDone`. Words only: `watchDone, countDone, joined, thirst, ledgerOk, orla, where, word`.

**Recruit:** Tirren at the horse-lines. **Trick:** The Water Ledger `b10_c2_ledger` (✦ wits 20; the Toll Count). **Items:** `b10_c2_spear`, `b10_c2_coat` (ac 2, hp 3), `b10_c2_tally`. **Fights:** `b10_c2_spar` 120 (survive 4, the Letherii's first), `b10_c2_deserters` 380+170 (main; stragglers on `adjunct`), `b10_c2_dogs` 100 (opt). **Engine-adjacent:** the Ledger's check wraps (`trickLeft`, `spendTrick`, `rollDice`, `note`, `blog`), guarded by `b10On()`; a `SCENES.b10_train.loc` getter. **Left open:** which horse Tirren brings home (closed in Ch 6).

## Chapter 3: Night Marches (`src/183_b10_ch3.js`; the Third)

The crossing's first nights: night marches, lie-ups under cloaks, the water counted, the oxen dying, a dead city far off (never named), dust going into the glass (never whose). Phases 1–4, 49 nodes, 3 areas.

**Key `b10_c3_key`:** `haul` (Pruss +1; the traces `b10_c3_traces`; the thirst unless `b10_c1_water`; `b10Witness(1, 'the wagon came through')`; `S.f.b10_c3_hauled = 1`) or `cut` (`b10Witness(-1, 'left it in the glass')`, Tangle +1). **Read:** Ch 5 (`hauled`: the last water is that wagon's last barrel), Ch 7 (fate pages, `haul` default), Ch 4 (the Third's rumour, `haul` default).

**Witness:** the wear −1 at the start; the dead city's "yes, but" −1; `haul` +1 / `cut` −1; the beat ±1. **The beat (c3):** "What are we marching for?" `each` / `knows` (kept) / `walking` (doubt).

**Flags read later:** `b10_c3_key`, `b10_c3_hauled`. Words only: `through, carried, thirst, harnessOk, called, counted, city, dust, rear, cloak`.

**Trick:** Into the Traces `b10_c3_harness` (✦ might 21; the Rope-Man's Haul, free). **Items:** `b10_c3_glassknife` (atk 2, 1d8+4), `b10_c3_nightcloak`, `b10_c3_tracestrap`. **Fights:** `b10_c3_wagon` 380+170 (main; stragglers fought down, never killed in words), `b10_c3_traces` 120 (`haul`, survive 4).

**`south`:** the Twelfth's supply wagon; dry country; the column "walks south by night now, on the Commander's word"; the wagon-master for Thallo; the Sixth "three wagons back" when the Letherii are on `escort` (the one sighting).

## Chapter 4: The Long Way Round (`src/184_b10_ch4.js`; the Letherii)

The southern march (R13 S1): the Grey Helms ahead, the Bolkando behind them, Lether last; the horses failing; a hungry country; three sunburned strangers taken in at the rear, far off; "the grey knights' commander rode off into the glass" (rumour). No mountains, no pass. Phases 1–3, 43 nodes, 4 areas.

**Key `b10_c4_key`:** `horses` (Tirren +1; the horses' water, a `witness:true` check; `b10Witness(1, 'the horses lived')`; the thirst unless `b10_c2_counted`; thieves at night `b10_c4_night`; `S.f.b10_c4_horses = 1`) or `pace` (Thegg +1, Tirren −1; `S.f.b10_c4_pace = 1`). **Read:** Ch 6 (`b106Pace()`, `horses` default: horses at the coast and +2 on the stakes, or first to the King's ships and the scale), Ch 5 and Ch 7 (rumour, `horses` default).

**Witness:** the wear −1; the lookout's "yes, but" −1; `horses` +1; the beat ±1; **Fists** (the game) +1 once if won. **The beat (c4):** "What did Lether send us out here for?" `each` / `commander` (kept) / `nothing` (doubt).

**Flags read later:** `b10_c4_key`, `b10_c4_horses`, `b10_c4_pace`. Words only: `walked, kept, thirst, farrierOk, lookDone, strangers, forDone, nightDone, dogsDone, ride`.

**Trick:** The Farrier's Hand `b10_c4_farrier` (✦ wits 20; the Water-Song, a full turn, no ward). **Items:** `b10_c4_horsebow`, `b10_c4_rasp`, `b10_c4_veil`. **Fights:** `b10_c4_foragers` 380+170 (main), `b10_c4_night` 120 (`horses`), `b10_c4_dogs` 100 (opt, `escort` only).

**Day or night (fixed in this read):** on `escort` the column marches by day here, "on the Commander's word: the ground on this stretch is too broken to walk blind" (see fix 1).

## Chapter 5: The Last Water (`src/185_b10_ch5.js`; the Third)

The crossing's worst: the barrels dry; "a Fist tried to take the water" (rumour, once); children in the column from somewhere east (one sentence, far off); the fire with no fire; the ground goes wet at grey light; the glass's far edge, Kolansii outriders who never ride back ("Word is the Assail think we died in the glass"); Sedge's file-closers. Phases 1–4, 46 nodes, 4 areas.

**Key `b10_c5_key`:** `give` (`b10Witness(2, 'gave the last of it')`, Haddat, Mirrel +1; to the next cloak's youngest, Sedge's file; the thirst unless `b10_c1_water`) or `hold` (`b10Witness(-1, 'held it back')`, Haddat −1, `S.f.b10_c5_held = 1`). **Read:** Ch 6 (the Third's rumour, `give` default), Ch 7 (the young one alive at the barrows on `give`; fate pages).

**Witness:** the wear −1; the rise's "yes, but" −1; `give` +2 / `hold` −1; **the lake +1** (fixed; on `south` "the first well in Kolanse"); the beat ±1. **The beat (c5):** "What are we marching for?" `own` (kept; "an officer said that once, in a tent, they say") / `nobody` (doubt); put off, offered again at the far edge's real fire.

**Flags read later:** `b10_c5_key`, `b10_c5_lent` (`sedge` / `twelfth`). Words only: `gave, held, thirst, beat, lake, drank, ridersDone, stragDone, mouthfulOk, look, rumour, rear, children, halt, picket`.

**Trick:** The Last Mouthful `b10_c5_mouthful` (✦ wits 21, `witness:true`; Squint's Breath, free). **Items:** `b10_c5_kolansiiblade`, `b10_c5_emptyskin`, `b10_c5_lakestone`. **Fights:** `b10_c5_stragglers` 120 (opt), `b10_c5_outriders` 380+170 (main).

**`south`:** "by night again on the Commander's word, now the road is flat again" (fix 1); the ration cut; the Grey Helms' dust bends away east; the King's ships rumoured; no children, no lake: a Kolansii village and the first well; the Third lent as file-closers to the Twelfth.

## Chapter 6: The Feint (`src/186_b10_ch6.js`; the Letherii; **mortal**)

The King's ships at the coast (giants seen wading ashore, never met); the allied attack before Kolanse City, a feint, on the Sixth's stretch "between a dry ditch and a dead tree"; far off and unexplained: the bay white, something cut in half over the far tower, the dead coming up into a fight at the tower's foot. News at dusk (headline): the Grey Helms turned on their masters, their leaders are dead, the Commander fell, and got up. Phases 1–4, 55 nodes, 4 areas.

**The mortal fight `b10_c6_line`** (400+180; `mortal:true`, `stage2`, two `b10_lspear` kept; signposted on the one choice into it, both roads; the stakes give surprise). `S.f.b10_c6_fell` (array, may be empty).

**Key `b10_c6_key`:** `hold` (Thegg, Tobet +1; a `witness:true` check; no Witness move) or `carry` (Ammet, Tirren +1; the open ground `b10_c6_open`, survive 4; `b10Witness(1, 'went back for them')`). **The Sixth's road `S.f.b10_lethRoad`:** `letheras` (Thegg, Sorvan +1) / `kolanse` (needs `b10RoadOpen('kolanse')`, holding or better; Ammet, Tirren +1; Ennic stays) / `free` (Pessa, Ruuk +1). Tirren names Ash on `horses`. **Read:** Ch 7's finale (`CHAPTERS[6].fates`), the coda.

**Witness:** `carry` +1, the beat ±1 (after the road); nothing else. **The beat (c6):** "What was it for?" `each` / `seen` (kept) / `told` (doubt).

**Flags read later:** `b10_c6_key`, `b10_c6_fell`, `b10_lethRoad`. Words only: `held, carried, set, lineDone, beachDone, squareOk, scaleGot, pikeGot, tallyGot, news, thirdSaid`.

**Trick:** The Letherii Square `b10_c6_square` (✦ wits 20; Hold the Square, uses the action). **Items:** `b10_c6_shipscale` (ac 2, hp 4), `b10_c6_pike`, `b10_c6_kingstally`. **Fights:** `b10_c6_beach` 120 (opt), `b10_c6_line` 400+180 (MORTAL), `b10_c6_open` 160 (`carry`). **Art:** 186b draws the kinds `b10_kolansii` and `b10_shriven` (worn by Ch 5's outriders and Ch 7's line too).

**`adjunct`:** the regulars' field, its morning (correction 4): the camp out of the glass, a stretch between two regulars' companies; the Kolansii walk back to the ridge; relieved toward noon; a low hill far off east with smoke; the relief as news at dusk. **The Third, both in the glass:** seen from the stretch's **west** end, far down the line toward its very end (fix 3). **The Third on `south`:** three stretches east, at the back of the Twelfth's line, from the east end.

## Chapter 7: Over the Ridge, and the end of Book Ten (`src/187_b10_ch7.js`; the Third; **mortal**)

Out of the glass; the first fields; before light an order goes round the heavies' fires and never reaches the Third (said once, plainly; never where the heavies went). Sedge's stretch at the far west end of the regulars' line; the first rush; the Khundryl's charge far off; the hill far off (smoke, munitions' thunder, a glare, quiet); dragons; the line; a Malazan Host over the ridge with the Fourth; the Kolansii kneel; the barrows. Phases 1–4, 50 nodes, 3 areas.

**The mortal fight `b10_c7_line`** (400+180; `mortal:true`; stage 1 Kolansii ×3, pike, bow, two regulars; stage 2 **one Assail**, Shriven ×2, a Kolansii, the regulars and, on the regulars' field, **the Fourth** `b10FourthAllies(0, 0)` read at fight time). Signposted on all three choices into it. `S.f.b10_c7_fell`. The file-closers' `witness:true` check gives surprise.

**Key `b10_c7_key`** (Thallo's three slates at the barrows): `colours` (Haddat, Brask, Marrow +1) / `kolanse` (needs holding or better; Tegra, Pruss, Wenna, Tangle +1) / `home` (Mirrel, Doss, Mehet +1). **The Fourth's road `S.f.b10_fourthRoad`:** `host` / `third` / `home`, asked after the key. `B10CH7.end` titles are `B10_ENDW.t`'s.

**Witness:** **the Fourth +1** (fixed: after the line on the regulars' field; on `south` when the Fourth walks up at the barrows); **Coins on the Shield** +1 once if won (the night before); the beat ±1 (after the ending). **The beat (c7):** "What was it for, then?" `each` / `seen` (kept) / `nothing` (doubt).

**Earlier keys read, each with a default:** `b10Key(1)` names, `(3)` haul, `(4)` horses, `(5)` give, `(6)` hold; `b10_lethRoad`, `b10_c6_fell`, `b10TRoad()`, `b10LRoad()`.

**Trick:** Rim to Rim `b10_c7_rim` (✦ wits 21; the Line, free; from the Fourth's sergeant, or a grey regular on `south`). **Items:** `b10_c7_knot`, `b10_c7_ridgecloak` (ac 1, hp 5), `b10_c7_roll`. **Fights:** `b10_c7_picket` 120 (opt), `b10_c7_morning` 160 (survive 4), `b10_c7_line` 400+180 (MORTAL).

**The Fourth's road** (rule 109, one page): Darujhistan, a lake boat, a coast, a ship ("a long time on it", no count, no compass word for the voyage), Aren, the old Host taking it back as veterans, "a road that wasn't a road", a keep, a pass, "the sappers did the rest", "the Host had munitions, more than it should have, and nobody would say from where" (Book Eight's Kettle line answered), "Your High Mage is alive" (the chapter's one rumour). Never Kalam, Serenity, the Deck or the warehouse.

**`south`:** the brigades' camp before Kolanse City; the Twelfth's stretch; **the Sixth three stretches west** (when the Letherii are on `escort`); the same fights with the Twelfth's spears, **no Fourth and no Host in the fight**; the Kolansii turn away for the far tower; the brigades march north; the Fourth walks up at the barrows.

**The finale:** 037's pages for the Third (`B10CH7.finale`: road page, a page per soldier, the sergeant), then `B10FIN.extra` (`b107road`, `b107leth` × n, `b107fourth`, `b107meet` "At the barrows"), then 037's end page ("The End of *Witnessed*", the credit to Steven Erikson and Ian C. Esslemont), then the engine's coda (`b10copen`, `b10coda` × squads, `b10credits`).

## The visions (188) and the games (189)

Visions `b10v1`–`b10v7` (Cuttle at a fire; Aranict on the southern march, by day; Shortnose in the traces; Gesler waking to Bent; Bottle and Nom Kala; Spax on the field; the Crippled God resolving to write the Fallen down, the one place narration names him). Words-only flags; none read by a chapter.

Games: the Corporal's Ladder (Ch 1, +1 regard), Yelt's Measures (Ch 2, +1 regard), Straws (Ch 3, +1 regard), **Fists (Ch 4, +1 Witness)**, **Coins on the Shield (Ch 7, the night before, +1 Witness)**; none at Ch 5 or 6. Each pays once, touches nothing else.

## Witness across the book (each squad its own; fresh 5; games included)

Ranges after each chapter, fresh start (a Book Nine transfer starts at 2–8, which widens every range to the clamp):

| | Ch 1/2 | Ch 3/4 | Ch 5/6 | Ch 7 |
|---|---|---|---|---|
| **The Third** | **3–7** (names 4–7, water 3–6) | **0–8** (haul 1–8, cut 0–6) | **0–10** (give 2–10, hold 0–8; the lake +1 last) | **0–10** |
| **The Letherii** | **4–7** (watch 5–7, count 4–6) | **1–9** (horses 2–9, pace 1–8; Fists +1 included) | **0–10** (hold 0–10, carry 1–10) | — |

- **At the mortal fights** (`B10_WITFIGHT`, decision 8: hollow −1 to hit, witnessed +1): the Letherii reach the line at Ch 4's end, **1–9** (hollow on `pace` with the lookout's near roll and a doubted beat; witnessed only with `horses`, every beat kept and Fists won). The Third reach the line at Ch 5's end plus the Shield game, **0–10** (hollow on `cut` + `hold` with both "yes, but"s and doubts; witnessed on `haul` + `give` with kept beats). On the regulars' field the Fourth's +1 comes **after** the line, so it never changes the fight.
- **The `kolanse` ending** (holding, 4+): **the Letherii** choose at dusk after the key and before the beat: 1–10 there, so it can be reached and missed on both `escort` and `adjunct`. **The Third** choose at the barrows: on the regulars' field after the Fourth's +1 (1–10 there: reachable and missable); **on `south` the Fourth's +1 may come after the key** if the player takes Thallo's slates before the Fourth walks up (question 2 below). Both closed roads show greyed with a line and a node that says why.
- The brief's expected ranges hold at the top; at the bottom the Third runs to 0 a chapter early (Ch 3: brief 1–8) because the dead city's "yes, but", `cut`, the wear and a doubted beat stack at a fresh 3.

## Thirst across the book

Ch 2 `adjunct` (the first night on the glass); Ch 3 `haul` (waived by `b10_c1_water`); Ch 4 `horses` (waived by `b10_c2_counted`); Ch 5 `give` (waived by `b10_c1_water`). None in Ch 1, 6, 7. A rest clears it; the next chapter's start clears it (037).

## Left open on purpose, and what the end says

This is the last book: nothing is kept open for a later one. What the narration settles, it settles only as the squads could see or hear it.

- **Said, as headline or news:** Bottle and Ruthan Gudd back ("the mage and the captain"); the Adjunct on her feet; the plan as camp word; the lake (never how: "nobody near the Third saw where it started"); the Grey Helms turned and their leaders dead; the Commander fell, and got up; the bay white; something cut in half in the sky; the dead at the tower; a Malazan Host over the ridge; the Kolansii on their knees; "Your High Mage is alive"; "the warleader fell" (camp word at the barrows); Nefarias Bredd asked after once.
- **Never said (hard limits held):** who held the hill or what was on it; the god, the chains, the heart; Tavore's words, charge or thoughts (never a viewpoint); Paran's name, card or portal; the barrow speeches; Fiddler, Korlat, Whiskeyjack; the Snake's names; blood or urine drunk; any Pure; the Fourth meeting Fiddler.
- **The coda's narration** (180, the only place): "The story is that at the barrows … the Adjunct said the army would be forgotten, and that she did not regret it. … Somebody wrote them down." No soldier knows it; nobody is named as the one who wrote (rule 98, §9a). Vision 7 ends on the book opened.
- **Left unsaid:** where the colours go after the barrows; whether the wells in Kolanse come up for long; what the Fourth's sergeant does on `host`; what Ash makes of Letheras; what the heavies saw in the night (Thallo never says).

## The continuity read (Tue Nov 10, 2026)

**Clean checks (no finding):**
- **Keys and flags.** Every earlier key is read through `b10Key(n) || '<canon default>'` (12 readers, every one with a default). Every shared flag is read where the brief says, with a default when unset: `b10_c1_water` (Ch 3, 5), `b10_c2_watched`/`counted` (Ch 4, 6), `b10_c3_hauled` (Ch 5), `b10_c4_horses`/`pace` (Ch 6), `b10_c6_fell` (Ch 6's fates for Ch 7), `b10_c7_fell`, `b10_lethRoad`, `b10_fourthRoad`. Every value compared exists where it is set. Lint's "read but never written" list for Book Ten is all engine or dynamic writes (`b10_tRoad`, `b10_lRoad`, `b10_prussDone`, `b10_tirrenDone`, 180c's `b10_c${n}_drawn`/`noCard`).
- **The roads.** The Third `adjunct`/`south` and the Letherii `escort`/`adjunct` are written in every chapter; every combination gives each squad its one line of the other: Third `south` + Letherii `escort` (one column: "three wagons back" Ch 3; the Twelfth three stretches east of the Sixth in Ch 6, the Sixth three stretches west in Ch 7: they agree); both `adjunct` (Ch 4 and 5 at the tail; Ch 6 morning and Ch 7 afternoon on different stretches, now agreeing on west and east, fix 3); the crossed roads as rumour or "nobody has heard". The Fourth with a Book Eight save (name, mates, dead) and without one (Brisk, Kettle, Tuft, Ohl; "the Fourth's sergeant") renders in the fight, the meeting, its road and its finale page; Kettle only inside the Fourth's scenes.
- **Recruits.** Pruss and Tirren join at their first halts and are guarded by `b10In` everywhere else (`recruit_test`); the games' and visions' lines key off the walking squad.
- **Hard limits.** No never-use name, no Burn's Sleep year, no count of days, weeks or months ("one more day of this" is Tebbet's bowstring; "years" only for ages and service); no Kalam, Paran, Pure, Spire, Perish, Teblor, Bugg or Snake name on screen; "Che'Malle" once (Ennic, Ch 2); "Bonehunters" once in the book, in Ch 3 (the stragglers' sergeant; a second, called by the squad in the same scene, is now "the army's name", fix 6), never by the narrator; "the Crippled God" only in vision 7; no exclamation marks in narration and no rounds or turns in story text (every chapter test checks every node); munitions never lit; the sergeant never gendered (the Fourth's sergeant checked by script).
- **Mortal fights** signposted on every choice into them: Ch 6 one, Ch 7 three, all "(a mortal fight: whoever falls here stays down)", tagged `mortal`, each with "Not yet".
- **Item (2), "the Commander fell, and got up"** (Ch 6 `escort`, dusk): rule 97 (TCG closes it: Brys dies and returns, WC23, R23.2, R24.4E) and tcg-canon §5 allow it as camp news, never seen; rule 111 is not touched (the return is canon's, not the game's). It is said once, by Ennic, read off a slate. One clause went beyond the headline (fix 2).
- **Item (3), Thallo in Ch 7's night.** Rule 108 holds on the page: the heavies "went off in the dark", nobody says where, and at the barrows "He does not say where the heavies went in the night. The Third does not ask." Nothing places him on the hill. A reader who knows canon will infer it (correction 2: Fiddler took "the Marines and Heavies" to the hill, "only a handful" left); canon never counts or names the handful, so an unnamed corporal among them changes no outcome. Ruled: holds (see question 4 for the stricter reading).
- **Item (4), Book Six's "never met".** Book Six (107, the Fourth's road page): "It never met the Third. It never will." Ch 7 answers it in the meeting node ("Book Six said … never met, and never would. Book Six was wrong about that.", both roads) and in *Where the books meet* ("In Book Six the Fourth and the Third shared a book and never met. In this one they did, at the very end of it."). **Both readings agree** on both roads (on `south` the meeting is at the barrows, still "the very end"). Style note in question 5.
- **The engine-adjacent changes** (182's Ledger wraps and caption getter; the chapters' `drawFeature` wrappers on their own styles; 187's `mkAlly` and `showFinale` wrappers; 186b's and 187b's foe kinds) are guarded by book, chapter or style and fall back to 180's.

**Fixed in the continuity read:**
1. **Day or night on the southern road (item 1; Ch 4, Ch 5).** Ch 3 (`south`) had the Commander's column walk "by night now"; Ch 4 (`escort`, the same column) marched at first light through noon; Ch 5 (`south`) "still by night". The canon sheet has no hour for the southern road ([O]); its only night march is the crossing's (W *Tavore Paran*); R13 S1 (the Letherii keeping the Grey Helms' dust in sight) and vision 2 (Aranict on that march, by day) lean day, and Ch 2 already has the column marching "by day as well as night". Least change, so all three agree by stretch: Ch 4's Ennic now says the column marches "By day again, on the Commander's word: the ground on this stretch is too broken to walk blind"; Ch 5 says "by night again on the Commander's word, now the road is flat again". Ch 3 unchanged. (Ch 3 night → Ch 4 day → Ch 5 night matches canon's order: ch 10–13, ch 13, ch 17–20.)
2. **The Commander's fall placed (Ch 6, `escort`).** "Out in front of the centre, where the Grey Helms were" put Brys's fall at a named scene (his ride and the Voice, a hard limit) with no source for the place. Cut to "And the Commander fell." … "And got up." Headline only; the doubled "slate under his arm" in the paragraph trimmed with it.
3. **Where the Third stood, seen from the Sixth (Ch 6, both `adjunct`).** Ch 6 put the Third "far down the line to the east" of the Sixth's morning stretch; Ch 7 puts the Third on Sedge's stretch at the far **west** end, with nothing west of it, and has the Sixth "far down the line" from its east end. Ch 6 now shows the Third from its **west** end ("to the west … toward the very end of it"; `b106ThirdAt()` returns `'west'` for both `adjunct`; the east end keeps the Third-`south` sighting). "They will have their own stretch, later" (the Third is on its stretch from first light in Ch 7) → "Their stretch is their own." The regulars' corporal at the Sixth's west end had "a burned hand", the same mark as Sedge's corporal at the Third's west end the same morning; now "a split lip". `tools/b10ch6_test.mjs` follows the west end.
4. **The narrator on the bay (Ch 6, `escort`, dusk).** "as if it had frozen, which it cannot have" was the narrator denying what canon has happen (Hood freezes the bay, WC23). Now "as if it had frozen. In this heat. The Sixth looks, and does not believe it." (a character's belief, not the narrator's).
5. **The High Mage described (Ch 7, the Fourth's road).** "Short." was an unsourced canon claim about Quick Ben; cut ("Saw him once, at a distance. Shouting at somebody.").
6. **"Bonehunters" twice in one scene (Ch 3, the call).** The brief allows it once a chapter; the squad's call to the stragglers and their sergeant's answer both said it. The call now says "the army's name"; the sergeant keeps hers.
7. **Stale engine notes (doc and a comment).** `v13.0-notes.md` and 180's Witness comment still said `B10_WITFIGHT` was all zero and levels 25–28 had no damage or armour step; both were settled and built (decisions 8, 9: hollow −1, witnessed +1; `lvDmg` 25, `lvAc` 27). Corrected; no number changed.

**Repeated phrases** (`trope_scan`: B10 inside every budget, 81,192 words; theway 20, silence 37, nobody 71). New phrases recurring five or more times across chapters (a 5-word scan of 180–189's prose): "the slate under his arm" (Ennic, 8 in Ch 2, 4, 6, after the trim; his tic); "her hand on the tile pouch" (Perrit, 9 in Ch 2, 4, 6; her tic); "the squad sits an hour" (the rest line, 12, Book Nine's, varied after it); "the camp after the short-tails" (15, a place name); "a Malazan Host came over the ridge" (7, Ch 6–7 news); "whoever falls here stays down" / "whoever fell there stayed down" (9 each, the mortal signpost, by design); "the open ground in front of" (9, Ch 6–7's ground); "says out of his mouth" (6, Keth's grandmother, by design); "walking with the rearguard says" (6, Ch 3, 5); "he looks at the Third" / "when he sees the Third" (7 / 6, Ch 1, 3, 5, 7); "the last of the light" (8); "the ground went wet under" (6, the lake's one phrase). UI strings ("Tap ground to move · tap a figure to talk", "Back to the lie-up") as every book. None over a budget; the lead may vary "he looks at the Third" once or twice.

**Page checks still open** (for `open-questions.md`; the game's lean stands meanwhile): tcg-canon §10 Q1–Q14 stand as written. This read adds:
1. **The southern road's hours** (TCG ch 10–21): did Brys's column march by day, by night, or both? The game now says night (Ch 3), day on broken ground (Ch 4), night again (Ch 5). If a page says otherwise, change the two reasons, not the structure.
2. **Kolanse Bay after the battle**: Brune's `kolanse` fate line (Ch 6) has her fish the bay "when the ice goes off it". Whether the bay stayed frozen is not found [O]; if it thawed at once, cut the clause.

**For the lead and David (no balance number, roster, key value or design call changed):**
1. **Balance (the next step).** Nothing in Book Ten is measured. Hardest: Ch 6's mortal line (the Letherii, no munitions, five Kolansii then an officer and two Shriven) and Ch 7's mortal line, whose `south` stage 2 has no Fourth (two spears against an Assail and two Shriven). With decision 8 a hollow squad fights both at −1 to hit (Letherii from Ch 4 at 1, Third from Ch 5 at 0–1). *Recommend:* balance both roads of Ch 7 as separate rows.
2. **The Fourth's +1 on `south` can come after the Third's key.** On the regulars' field the +1 always comes before Thallo's slates; on `south` the Fourth walks up at the barrows and the player can take the slates first, so a Third at 3 sees `kolanse` closed and then reaches 4. *Recommend:* on `south`, let the Fourth walk up before Thallo offers the slates (Thallo's node asks the sergeant to see who is looking for the Third first), so both roads open the ending on the same numbers. A one-node change; not made here because it changes the flow.
3. **`b10_c1_names` is set and never read** (Ch 7 reads `b10_c1_key`). *Recommend:* drop it from the brief's shared list, as Book Nine's `b9_c6_trainHeld`.
4. **Thallo and the hill (rule 108, stricter reading).** Ruled as holding (above). If David wants no invented survivor among canon's "handful", the least change is one clause in `b10_c7_dawn`: Thallo is left behind with the heavies' wagons when the runner comes ("Thallo with the wagons, cursing"), and his barrows line stays as it is. *Recommend:* keep as written; it is the book's best silence.
5. **Book Six named inside a scene (Ch 7, the meeting, both roads).** "Book Six said the Fourth and the Third never met … Book Six was wrong about that." is the only place in the series where the story text names a book; elsewhere that voice lives on the finale's pages. The two readings agree. *Recommend:* keep it in *Where the books meet* only and make the node's line in-world: "Once, in a plague year, the Fourth and the Third were in the same country a few hundred leagues apart, and never met. They have now." (Book Six's own words).
6. **The Witness floor.** The Third can reach 0 by Ch 3 (brief 1–8) and the Letherii 1 by Ch 4; both can fight their mortal line hollow. If David wants the brief's floor, the cheapest lever is to drop Ch 3's dead-city "yes, but" Witness cost when the squad is already at `doubt`.
7. **Engine wraps to retire later:** 182's Ledger wraps (`trickLeft`, `spendTrick`, `rollDice`, `note`, `blog`, a `MutationObserver`); the chapters' `drawFeature` wrappers (183–187b); 187's `mkAlly` and `showFinale` wraps and `B10FIN.extra`; the caption getters on `SCENES.b10_train` and `b10_ridge`.
