Thu Nov 5, 2026, 9:45 PM PST. Book Seven continuity, against branch `book7` (v10.0.0, not shipped), with the continuity read's fixes in.

# Book Seven: *Unwitnessed* (beside *Reaper's Gale*): continuity

What each chapter set up, for the finale and for later books. Later books read this doc, not the source. Written by a fresh reader from `src/120`–`128` against `docs/rg-book-brief.md`, `docs/rg-canon.md` (§6, §7 rules 55–69), `docs/v10.0-notes.md` and the chapter notes. Where a chapter note and the code disagree, the code is what is described here. The read's fixes and the items left for the lead are at the end.

**Two squads, one save.** `B7_CH = {1:'t', 2:'l', 3:'t', 4:'l', 5:'t', 6:'l', 7:'t'}`. The Third (thread `t`, Book Four's sergeant in Book Two's look, Treach's) plays 1, 3, 5, 7, **lent to Fist Keneb's column as a squad of heavies** (rg-canon correction 1, fix (A)) and never called marines in narration. The Letherii (thread `l`, Book Five's squad of the Sixth Company, Whitefinder Battalion; the Errant's sergeant) play 2, 4, 6. `S.f` is shared; the other squad's keys are read only as rumour (one line a chapter). The two squads never meet and never cross blades: when the Sixth is at the river (Ch6) the Third is on the far side of the killing field (Ch7's intro); the Sixth goes into Letheras by the river gate the morning after the river, and the Third takes the plain-road gate behind the Fist against the garrison and its levies, never the Sixth.

**Shared helpers.** Engine (120): `b7On, b7In, b7Use, b7Thread, b7Join, b7OtherName, b7SgtFor, b7Coin, B7KEYS, B7_LETHROADS`; the Rising `b7Rise, b7Rising, b7RiseTier, b7Open, b7Guides, risingHTML`; the file `b7Filed, b7File, b7Heat, b7HeatTier, b7Wanted`. 120c: `B7READ, B7POOL, b7ReadChoice/Offer/Card`, the Third's reader chain (Marrow, Tallow, then `oldninth`, which after Chapter 1 is **the old marine of the column**: see Fixed 1). Each chapter has its own `b7K…` helpers. Ch6 adds `B7CH6.fates`; Ch7 adds `B7CH7.finale`, `B77FIN` and `b77Onward(s)`.

**Levels.** The Third: fresh 16, 17 after Ch1, 18 after Ch3, 19 after Ch5, 20 after Ch7 (cap 21). The Letherii: fresh 8, 9 after Ch2, 10 after Ch4, 11 after Ch6 (cap 12). Every fight measured so far is 100% at Bridgeburner, under the 75–80% target: the balance pass's, with David.

## The recurring cast (inventions, all chapters)

- **The Third's captain is Captain Hollet**, Book Four's and Book Six's (slate, cough), in Ch1's intro only; he stays with the 9th and the fleet.
- **The lieutenant** of the marine company the Third walks with: a she, unnamed (narrow, sunburned, a crossbow, a slate, whistles two notes). Ch1, 3, 5, 7. "Bonehunters" is hers, once in Ch1 and once in Ch7.
- **The old soldier of the 9th** reads in Ch1 only and goes back with the last pinnace before dawn. **The old marine of the column** (grey to the eyebrows, a worn deck, a cup for the rum) reads in Ch3, 5, 7 when neither Marrow nor Tallow walks. Neither is named.
- **Finadd Ravel Ennic** (`B5_FINADD`), older. Ch2: he copies the roll himself and keeps the squad's page in his coat (`b7_c2_ennicEve`). Ch4: may sign the sergeant's release (`b7_c4_ennicSigned`). Ch6: the standard, the roll on his knee, the road.
- **The company clerk** and **the tile-woman** (Book Five's, unnamed, she) are still with the Sixth.
- **The man in the grey coat**, a Patriotist of middle years: Ch2 (asks for the name), Ch6 (sits at the next fire when the squad is watched; "he always comes back").
- **Three factors, all unnamed and offstage:** Ch1's coast factor (scales mark; Doss's holding), Ch3's inland factor (in Letheras a month), Ch5's mill village factor (mill-wheel mark).
- **No new named people** beyond the four recruits (Doss, Wenna, Ilsa, Sorvan; rg-canon §11).

## Chapter 1: The Burned Ships (`src/121_b7_ch1.js`, the Third)

The landing on the north-west coast; the transports burned; Keneb a voice down the line; the dunes; the coast road; a factor's tally-shed; the lie-up. Phases `b7_c1_ph` 1–5.

**Key `b7_c1_key`:** `burn` (on time; Haddat +1, Mirrel +1, Tangle −1) or `strip` (+2 sharpers, +1 salve, the farm's goose-grease salve, `b7Rise(-1)`, the riders required, `b7_c1_late`; Tangle +1, Marrow +1, Haddat −1). **Read:** Ch2 (one rumour line: "one of them burned last"), Ch3 (the lieutenant's look, the counting room), Ch5 (`strip`'s two sharpers can rig the roof), Ch7 (the lieutenant, the wicket, the fate pages' ships line). Unset reads as neither, or `burn`'s line.

**The Rising:** the tally-book `b7Rise(1)` always; `strip` −1. A fresh `burn` ends at 3, `strip` at 2.

**Flags:** `b7_c1_late`, `b7_c1_farmDone`/`farmPaid`, `b7_c1_burned`, `b7_c1_dunesDone`, `b7_c1_ridersDone`/`ridersPassed`, `b7_c1_tallyDone`, `b7_c1_bookBurned`, `b7_c1_clerk` `freed`/`tied`, `b7_dossDone` 1/2/0, `b7_c1_dossRoads` (**read by Ch3**: the guide check's +1, Wenna's map), `b7_c1_dossPage`, `b7_c1_fingerOk`/`Tried`, `b7_c1_why`, `b7_c1_duneWarned`. Not read later: `late`, `farmDone`, `farmPaid`, `ridersPassed`, `clerk`, `dossPage`.

**Recruit:** Doss walks in the next dusk (`b7Join('doss')`), or waits with the camp followers, or goes home. **Trick:** Finger-Talk `b7_c1_fingertalk` (✦ wits 17; Claw Hand-Cant). **Items:** `b7_c1_charredcloak`, `b7_c1_factorblade`, `b7_c1_tallyash`.

**Inventions:** the marine who teaches the signs, the picket, the Indebted farm family, the tally-clerk, the shed's sergeant; Doss's great-grandmother "came off a ship from somewhere, owing for the passage" (open, unused).

**Fights:** `b7_c1_dunes` 200, `b7_c1_riders` 180 (optional on `burn`), `b7_c1_tally` 300+150. Paid ≈ 498 / 390. 16 → 17.

## Chapter 2: The File (`src/122_b7_ch2.js`, the Letherii)

Letheras under Rhulad as the barracks hear it; the cook across the lane taken; Ilsa on the canal steps; the alley; the key in the yard; the Finadd's errand; the bridge. Phases `b7_c2_ph` 1–5.

**Key `b7_c2_key`:** `name` (the eel-seller at the head of the canal steps; `b7Rise(-1)`, `b7Filed(-1)`; his door open by dusk) or `refuse` (`b7Rise(1)`, `b7Filed(2)`; the canal knows the Sixth said no). **Read:** Ch3 (the prisoner's rumour), Ch4 (whose name is on the list: `refuse` or unset the sergeant; `name` Ilsa or the first who walks, because the eel-seller gave names back), Ch6 (the grey coat; Ilsa's and the sergeant's pages), the finale through `B7CH6.fates`.

**The file:** the neighbours' "yes, but" +1. The bridge reads `b7HeatTier()` (`b7_c2_bridgeHot`).

**Flags:** `b7_ilsaDone` 1/2/0 (2: a safe room off the Quillas, the blue shutter), `b7_c2_cook`, `b7_c2_alleyDone`, `b7_c2_filepage`, `b7_c2_errand`/`bridgeDone`, `b7_c2_bridgeHot`, `b7_c2_gateDone` (**read by Ch4**: the Edur from the hill heard of the Sixth)/`gateDeclined`, `b7_c2_marginOk`/`Tried`, `b7_c2_quarrel`, `b7_c2_board`, `b7_c2_neighOk`, `b7_c2_slate`, `b7_c2_ennicEve` (**read by Ch4 and Ch6**: his hand goes to the page).

**Recruit:** Ilsa (`b7Join('ilsa')`; with six walking she waits). **Trick:** The Clerk's Margin `b7_c2_margin` (✦ wits 16; The Line). **Items:** `b7_c2_greycoat` (+1 on `rise:true` Guile checks for its wearer), `b7_c2_agentknife`, `b7_c2_filepage`.

**Fights:** `b7_c2_gate` 150 (optional), `b7_c2_alley` 240+130, `b7_c2_bridge` 180 (four foes clean, six noted or worse). Paid ≈ 420 / 330. 8 → 9.

## Chapter 3: Night Raids (`src/123_b7_ch3.js`, the Third)

Weeks inland; a farmhouse in a wood; Wenna at the spring; the farm in the valley; the prisoners; the village; the factor's house. Phases `b7_c3_ph` 1–4.

**Key `b7_c3_key`:** `ledger` (`b7Rise(2)`, `b7_c3_ledgerash`; Doss +2, Haddat +1, Marrow +1, Wenna −1, Mirrel −1; smoke over the valley) or `loot` (+20 silver, +2 salves, `b7Rise(-1)`; Mirrel, Wenna, Tangle +1, Doss −2, Haddat −1). **Read:** Ch4 (the sutler's rumour), Ch5 (`ledger`: the whole village hides the squad, the boy's question, +2 on the roof and the well), Ch7 (the refugee grandmother, the bridge crowd, edges +2; Doss's lines; the fate pages' counting-room line). Unset reads as neither.

**The Rising:** prisoners let go +1 / kept −1; the key ±. `b7Open()` decides the village (open: the orchard wall +2; shut: the old road's Edur camp).

**Flags:** `b7_wennaDone` 1/2/0 (with Doss walking a fresh squad is six, so she usually waits with the fishers), `b7_c3_prisoners` `freed`/`kept`, `b7_c3_village` `open`/`shut`, `b7_c3_villageIn`, `b7_c3_roadDone`, `b7_c3_farmDone`, `b7_c3_factorDone`, `b7_c3_guided`, `b7_c3_tracksOk` (**read by Ch5**: the sergeant's +2 on the scouts' ambush and the well)/`Tried`, `b7_c3_steward` `freed`/`locked`, `b7_c3_drum`, `b7_c3_searched`, `b7_c3_dossDawn`, `b7_c3_wennaDawn`. Not read later: `prisoners`, `village`, `steward`.

**Canon heard, never seen:** Sands killed up the line; the far blow on the road north (the Drum, never named); a mage's demons at a farmhouse and Uru Hela (Kenryll'ah never printed); Tissy's ten smokes; the Fist means to catch a brigade ("Borthen" never printed).

**Recruit:** Wenna. **Trick:** Wenna's Tracks `b7_c3_tracks` (✦ wits 17; The Rope's Way). **Items:** `b7_c3_letherxbow`, `b7_c3_edurmail` (the factor's Finadd's), `b7_c3_ledgerash` (only on `ledger`).

**Fights:** `b7_c3_farm` 280+130, `b7_c3_road` 160 (village shut), `b7_c3_factor` 240+130. Paid ≈ 468 / 564. 17 → 18.

## Chapter 4: The Muster (`src/124_b7_ch4.js`, the Letherii)

Out of Letheras to the camp below Kravos Hill; the muster gate and the riot; Sorvan; the horse lines; the patriots at the provost's wagon; two visitors at the fire. Phases `b7_c4_ph` 1–4.

**Key `b7_c4_key`:** `edur` (the Sixth on the Edur's picket; `b7Rise(-1)`, `b7Filed(-1)`) or `letherii` (with the officers who want the Edur gone; `b7Rise(1)`, `b7Filed(1)`). **Read:** Ch5 (the lieutenant's rumour on the bank), Ch6 (what the visitor asks: `edur` or unset, the picket; `letherii`, stay in the line whoever comes with an order), the finale.

**The Rising and the file:** the levies cut loose +1 / handed back −1; the grooms' "yes, but" files +1. **`b7Wanted()`**: the arrest in the provost's wagon (never a cell), out by Ilsa, Sorvan, a talk or the Finadd's signature.

**Flags:** `b7_sorvanDone` 1/2/0 (with Ilsa walking a fresh squad is six, so he usually waits at the horse lines), `b7_c4_listName`, `b7_c4_crowd` `let`/`kept`, `b7_c4_riotDone`, `b7_c4_patriotsDone`, `b7_c4_edurDone` (**read by Ch6**: the eldest's healed cut)/`edurDeclined`, `b7_c4_arrest`/`b7_c4_out`, `b7_c4_ennicSigned`, `b7_c4_horseOk`/`Tried`, `b7_c4_groomsOk`, `b7_c4_badge`, `b7_c4_news`, `b7_c4_clerkOk`. Not read later: `listName`, `crowd`, `arrest`, `out`, `ennicSigned`.

**Recruit:** Sorvan. **Trick:** Bluerose Horse-Sense `b7_c4_horse` (✦ wits 16; Rhivi Spirit-Song). **Items:** `b7_c4_bluelance`, `b7_c4_bluescale`, `b7_c4_musterbadge`.

**Fights:** `b7_c4_edurcamp` 200 (optional), `b7_c4_riot` 180, `b7_c4_patriots` 250+150. Paid ≈ 468 / 348. 9 → 10.

## Chapter 5: The Village (`src/125_b7_ch5.js`, the Third; the book's one mortal fight)

The funnel; a mill village of the Third's own on the river side, the same night as the tavern village (heard of only); the factor's cellar; the mill-woman; the bailiff; dusk. Phases `b7_c5_ph` 1–4.

**Key `b7_c5_key`:** `hold` (**the mortal fight** `b7_c5_village`, signposted three times; the roof a cusser, or `strip`'s two sharpers, can bring down on the war-leader; `b7Rise(2)`) or `slip` (out by the race door and the river path, `b7_c5_slip` not mortal, a light over the trees; `b7Rise(-2)`). **`b7Guides()`** (6+): the children warn the Third, either fight starts with the squad first. **Read:** Ch6 (the levy's uncle, one line; unset "the villages hide them"), Ch7 (the lieutenant's song in the market, the fate pages, the coda).

**The dead:** `S.dead[id] = {ch:5, where:'The square by the mill'}`, no `from`. Named at the fire, in the gap line, the lieutenant's count, the bank, the journal, Ch7's intro and fire, the fate and gone pages ("fell in the square by the mill… buried by the mill-race"), and the end page. The sergeant takes a scar, never death.

**Flags:** `b7_c5_holdDone`/`slipDone`, `b7_c5_roof`, `b7_c5_warned`, `b7_c5_bailiffDone` (drops one foe from either key's first ground), `b7_c5_bailiff` `village`/`column`, `b7_c5_shield`, `b7_c5_boardDown`, `b7_c5_squareOk`/`Tried`, `b7_c5_desk`, `b7_c5_roadDone`, `b7_c5_miller`, `b7_c5_lt3`. None read later beyond the key and `S.dead`.

**Trick:** Hold the Square `b7_c5_square` (✦ wits 17; Blue Fire). **Items:** `b7_c5_villageshield` (ac 3, a heron in faded blue), `b7_c5_edurblade`.

**Fights:** `b7_c5_road` 200, `b7_c5_bailiff` 150 (optional), `b7_c5_village` 320+160 (mortal) or `b7_c5_slip` 260+130. Paid ≈ 498 / 444. 18 → 19.

## Chapter 6: Before the Walls (`src/126_b7_ch6.js`, the Letherii; their last chapter)

The camp the night before; the line below the cadre's ridge; the wave and the silver dome far off; the Edur walk home north through the line; the deserters; the march to the river; the Adjunct's regulars off the ships; the walls. Phases `b7_c6_ph` 1–4.

**Key `b7_c6_key`:** `stand` (a Malazan sergeant's squad breaks on the Sixth; "Walk."; no Rising move) or `break` (into the reeds; `b7Rise(1)`). **The road `S.f.b7_lethRoad`:** `army` / `palace` / `free`, at the walls on Ennic's roll. **Read:** Ch7 (one line three weeks on), the finale through `B7CH6.fates`.

**The Rising and the file:** deserters let go or talked +1; the watcher's "yes, but" files +1. `b7HeatTier()` the night before: watched or wanted puts the grey coat at the next fire (no arrest; "the warrant will keep").

**Flags:** `b7_c6_standDone`/`breakDone`, `b7_c6_landingDone`, `b7_c6_dome`, `b7_c6_homeDone`, `b7_c6_ask` `picket`/`stay`, `b7_c6_edurWord`, `b7_c6_captainKnew` `asked`/`quiet`, `b7_c6_deserters` `fought`/`talked`/`let`, `b7_c6_watcherGone`, `b7_c6_badNight`, `b7_c6_levyOk`, `b7_c6_wardOk`/`Tried`, and scenes seen. None read by Ch7 directly; the fates read the keys, the road and loyalty.

**`B7CH6.fates`:** `half()`, `road()` (default `army`), `key()` (default `stand`), `roadPage()`, `page(id)` (written for the nine Letherii and `'sgt'`, a short default for anyone else), `pages()` (walking, waiting, fallen in Book Seven; Book Five's dead get no page). "Brys Beddict" once, on the `army` sergeant page (rule 66).

**Trick:** The Cadre's Ward `b7_c6_ward` (✦ wits 16; A Courtesy of Darkness). **Items:** `b7_c6_fingershield`, `b7_c6_ridgecharm`.

**Fights:** `b7_c6_deserters` 180 (optional), `b7_c6_landing` 260+160, `b7_c6_stand` 260 or `b7_c6_break` 160+100. Paid ≈ 408 required. 10 → 11.

## Chapter 7: Letheras, and the end of Book Seven (`src/127_b7_ch7.js`, the Third)

The killing field from a farm a league back (a silver light, "a mage burned"); the river as rumour; refugees; the gate behind the Fist; the square; the counting-house holdouts; the earthquake and white light; a white dragon driven off; the arena as news; the surrender seen from a street end; the bridge; three weeks on. Phases `b7_c7_ph` 1–4.

**Key `b7_c7_key`:** `adjunct` (Book Nine's import, `b77Onward(s)`), `letheras` (the new emperor's coin, training his levies), `home` (a ship west; Ottar goes east with the Perish). No Rising move. The crowd on the bridge `b7Rise(1)` once.

**Reads:** `b7_c1_key`, `b7_c3_key`, `b7_c5_key`, `S.dead` (ch 5), `S.f.b7_lethRoad` (default `army`), `B7CH6.fates`, `b7RiseTier()` for the city's mood.

**Flags:** `b7_c7_gateDone`, `b7_c7_charge`/`chargeTried`, `b7_c7_told`/`toldTried`, `b7_c7_holdoutsDone`, `b7_c7_quake`, `b7_c7_sky`, `b7_c7_news`, `b7_c7_view`, `b7_c7_bridge` `fought`/`talked`, `b7_c7_crowdRose`, `b7_c7_luckOk`/`Tried`, `b7_c7_coin`, `b7_c7_white`.

**Trick:** The Crowd's Luck `b7_c7_luck` (✦ wits 17; The Lady's Pull, with a guarded `rollDice` wrap). **Items:** `b7_c7_lethcloak`, `b7_c7_kingscoin`.

**Fights:** `b7_c7_gate` 300+160, `b7_c7_streets` 240+120, `b7_c7_bridge` 160 (optional or talked down). Paid ≈ 492 / 588. 19 → 20.

## The finale (`B7CH7.finale`, `B77FIN`)

The Third's road (with the Rising at the end; `adjunct` says Book Nine will offer the save), a page per Third squadmate (eighteen written: the ships, the counting room, the village, a trick, loyalty; Doss and Wenna skip the ships), the Third's gone (Chapter 5's fallen, earlier dead, Doss or Wenna waiting), the Third's sergeant; then the Sixth's road page and a page per Letherii from `B7CH6.fates` (their sergeant last, in Book Five's look); *Where the books meet* ("Lether, again"); 37's end page (coda, both squads' dead, *The End of Unwitnessed*, the credit to Steven Erikson and Ian C. Esslemont).

## The visions (`src/128_b7_visions.js`)

`b7v1`–`b7v7`: Keneb on the beach; Tehol on his roof; Fiddler setting the Drum; Bruthen Trana on the sea floor (the vision ends on Brys's name); Hellian in the tavern; Hanradi on the killing field (he leads his Edur north, as Ch6 now has it); Lostara Yil beside the Adjunct. Words-only flags `b7vK_*`; no chapter reads them.

## Left open on purpose (for later books)

- Rules 55–69 (rg-canon §7) all stand: the Adjunct's purpose beyond "east"; Bugg; the Errant's hand; Karsa and the sword; Icarium's machine (an earthquake and white fire, unexplained); Kettle, Silchas Ruin and the Refugium (a white dragon, driven off); the Shake's queen; Quick Ben and Hedge (Hedge's return never explained; neither seen in Ch7's text); Beak (a mage who burned, never named); the Awl and Toc; the Perish and Khundryl east; the Letherii army after (rule 66); Seren and Trull; Mosag's end; who drained the treasury (Doss's "some say").
- Bowl, Lutes and Tavos Pond (rg-canon §15 Q1): never named anywhere.
- Who ordered the transports burned (§15 Q7): "the Fist's order, and his from the Adjunct"; the vision writes it passive.
- What the village did with the bailiff on `village`; what became of the eel-seller on `name`; whether any of the cadre died (stretchers and blankets).
- Doss's great-grandmother off a ship; Sorvan's report (he hit an officer beating a horse); the man in the grey coat after the compound fell.
- Where Kravos Hill is from Letheras (a day's march or more, never stated).
- Whether the Third ever stood at the ring's edge (Ch7 keeps it a league back with the wounded).

## The continuity read (Thu Nov 5, 2026)

**Clean checks (no finding):**
- Every promised key is read, each with a default: `b7_c1_key` (Ch2, Ch3, Ch5, Ch7), `b7_c2_key` (Ch3, Ch4, Ch6 and the fates), `b7_c3_key` (Ch4, Ch5, Ch7), `b7_c4_key` (Ch5, Ch6 and the fates), `b7_c5_key` (Ch6, Ch7), `b7_c6_key` and `b7_lethRoad` (the fates, Ch7). Side flags read across chapters: `b7_c1_dossRoads` (Ch3), `b7_c2_gateDone` and `b7_c2_ennicEve` (Ch4, Ch6), `b7_c3_tracksOk` (Ch5), `b7_c4_edurDone` (Ch6). Each reads unset as a sensible line.
- Pronouns: Perrit, Ammet, Pessa, Brune, Ilsa and the tile-woman "she" as in Book Five (`b5He`); Haddat, Sathi, Marrow, Mirrel, Hessa, Rasp and Wenna "she" as in Books Four and Six; the lieutenant "she" in all four Third chapters; Finadd Ennic "he", "Finadd Ravel Ennic" or "the Finadd".
- Canon squads: Bowl, Lutes, Tavos Pond, Primly, Hellian's and Fiddler's squads are never placed with the Third (Fiddler, Hellian and Hedge appear only in code comments and the visions). Brys is named only on the `army` page (rule 66) and in vision 4.
- Hard-limit names (Froth Wolf, Scale House, Settle Lake, Huldo's, Kettle, Mael, "Tehol the Only", K'Chain, Bolkando, Redmask, Toc, Karsa, Icarium, Rhulad, Trull, Silchas, Burn's Sleep, the never-use names): none in 121–127 play text. "Bonehunters" once in Ch1 and once in Ch7.
- A one-soldier render of every node in every phase of every chapter names an absent squadmate only in recruit join scenes and gated arrest branches (after the two fixes below).
- Recruits wait on a fresh path (Wenna in Ch3, Sorvan in Ch4); no text assumes them walking without `b7In`.
- `trope_scan`: B7 inside every budget (nobody 37, silence 9, theway 5 in 67k words). `repeat_scan` passes.

**Fixed in the continuity read:**
1. **The old soldier of the 9th (continuity).** He goes home on a pinnace in Ch1, but Book Four's once-a-book description ("An old soldier of the 9th reads for the legion…") and the "again" line still showed when he read in Ch3, 5 or 7. 120c now gives the third reader from Chapter 3 on his own description and again line, the speaker label "The old marine" and the halt choice "Sit with the old marine" (`B7RD_OLDMARINE`, `S.f.b7_rd_oldmarine`).
2. **The Edur walk home north (continuity).** Ch6 had them go "east along the road, toward the river and the sea"; vision 6 has Hanradi lead them north toward their villages (the Edur homeland is north). Ch6 now says north.
3. **The mill village after `hold` (continuity).** Ch6's levy rumour said the village "went down the river with them in the morning" and Ch7 "the village went back"; Ch5 has it come back up from the river and stand. Both now say it is still standing.
4. **The two squads at the gates (continuity).** The Sixth now enters by "the river gate" the morning after the river, so nothing places it at the plain-road gate the Third takes behind the Fist.
5. **Unguarded squadmates (continuity).** Ch2's alley ("narrow enough that Thegg would have to turn sideways") and Ch6's road ("an arithmetic Perrit could not do") named soldiers who may be dead or absent; Ch7's eel-seller asked after "the big one with the shield" (Haddat). All three now generic.
6. **Captain Hollet (continuity).** Named once in Ch1's intro, as Book Six names him; prose otherwise "the captain".
7. **Fire lines copied between chapters (style).** Seven writers seeded the fire from Ch1's template: Marrow's string, Haddat oiling the straps, Marrow's and Mirrel's rest lines, Marrow's knuckles, Tangle's satchel (Third); Perrit's cups, "Some of them sleep sitting up", three Ammet lines (Letherii). Reworded in the later chapter of each pair. The Ch4 Edur lesson's "yes, but" no longer copies Ch2's word for word; Ch5's "Doss walks at the back with the flail on his shoulder" no longer copies Ch3's.
8. **A dead end on the river bank (play).** `play.mjs 3 --book=rg --from=1` stuck two runs of three in Ch6: "Not now" at `b7_c6_stand_after` / `b7_c6_break_after` left the squad on the bank with the key spent, the Finadd only repeating his bank line, and no other way to the walls. The Finadd now leads on (`b76BankNode()`: the key, the key's fight, or its after-node). The Ch6 writer's `--from=6` runs never chose "Not now" there. The Edur eldest's "road east" is now "the north" too.
9. **"'ll feel it in the fight" (style):** 16 "yes, but" lines across six chapters; now once a chapter, the rest varied.

**Repeated phrases left (five or more across three or more chapter files):** "the man in the grey coat" (13, Ch2/4/6: a deliberate recurring figure); Doss's "flail on his shoulder" (about 9, his signature, now not word-for-word between chapters); "talks to his mother's dead" (Thegg, Ch2/4/6: his Book Five trait); "dies and gets up again" (the Emperor's rumour, Ch1/2/5/7); "Marrow… names under her breath" and Haddat's "says names under her breath" at rests (Ch1/3/5/7); the transfer soldiers' fire openers ("Hessa sits straight with the spear upright", "Darrut has his helm on his knee", "Ottar is cleaning the wolf on his shield", "Mehet is turning his ring of keys", "Yorin has his copper wind-vane", "Rasp is checking fuses with her lips moving", Ch1/3/5/7; "Pessa has the boathook upright", "the tile-woman spits to one side for manners", Ennic "inclines his head a finger's width", Ch2/4/6). The lines after each opener differ; they read as character tics. Only a transfer save sees most of them.

**For the lead (no combat numbers, fight definitions, item stats or key values changed):**
1. **Balance.** Every chapter's fights are 100% at Bridgeburner (Ch1–6 measured; Ch5's mortal fight and Ch7 not run). `B7GAP` or the foes' numbers, with David.
2. **Book Four's card words in Book Seven.** The Third's readings use `B4SAY` as Book Six did, so a card can say "the yard full of recruits", "the Seti could use her" or "the Adjunct's already got us moving" on the Lether coast. A `B7SAY` (or a Book Seven override for the few Book-Four-bound lines) would fix it; the series has lived with it since Book Six.
3. **Brys on the `army` page** comes with no word that the city saw him come back; Book Five's Letherii last heard he died in the throne room. Rule 66 allows the name; a clause ("whom the city buried once and then saw walk back") is David's call against rule 33's "beyond what the city sees".
4. **Ch5's mortal fight** has not had a balance run with the roof and without.
5. **The visions' closers** in Ch3, 5 and 7 say "The old soldier lets the card go" for the old marine; harmless (he is an old soldier), left.
6. **`b7_c4_ennicSigned`** (the Finadd's name in the provost's book for the Invigilator) is set and never read; Ch6 or the fates could use it.
