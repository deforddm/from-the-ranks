Thu Oct 29, 2026, 1:06 PM PDT. Book Five continuity, against branch `book5` (v8.0.0, not shipped; `VERSION` still 7.4.1), with the continuity read's fixes in.

# Book Five: *Indebted* (beside *Midnight Tides*) — continuity

What each chapter set up, for the books after it. Later books read this doc, not the source. Written by a fresh reader from `src/80*`–`89`; where a chapter note and the code disagree, the code is what is described here. The faults found on the read are listed at the end, under what was fixed and what is left for David.

**Shared helpers.** Each chapter has its own `b5KL / b5KSay / b5KIf / b5KWho / b5KNm / b5KPos / b5KV / b5KPh / b5KKey / b5KDocks / b5KRattle / b5KOwe / b5KRoom` (K = 1–7), file-local in name but global in scope. Each chapter's `b5KOwe` puts a "yes, but" of 5–20 docks on the roller only with room under `pressed` (Ch1's also keeps room for the court's fine while the key is still to come); otherwise the alternative cost. Engine (80): `b5On, b5In, b5He/His/Him, B5_FINADD, b5Coin, b5Debt, b5DebtStart, b5DebtTotal, b5Debtors, b5Owe, b5Pay, b5Forgive, b5Standing, B5_STANDW, b5Collectors, b5DrowningThreat, debtHTML, b5PayChoices, b5Join, b5SwapIn, b5Waiting, b5Offers, b5Recruit_, b5Room, b5CanRecruit, b5Disarm, b5Rearm, b5Rest, B5READ, b5TileChoice/Offer/Card`. Ch7 adds `B57FIN` (the finale) and `b57Onward(s)`.

**Money and standing.** Docks only. Standing against `S.debt0`: `free` 0, `easing` ≤ ½, `held`, `pressed` > 1.25×, `drowning` ≥ 1.5× (a soldier who started at 0: pressed from 50, drowning from 100). Crossing into pressed costs 1 loyalty once and counts `S.f.b5_collectors`. Starting debts: sergeant 340, Tobet 900, Thegg 260, Perrit 410, Ammet 180, Ruuk 40, Brune 60, Pessa 120. The squad starts with 12 docks. Salves at 6 from the quartermaster in Ch1, 2, 3, 5 and 6 (none at High Fort, none in Letheras's last day).

**The book's recurring cast (inventions, all chapters).**
- **The Sixth Company of the Whitefinder Battalion**, under **Finadd Ravel Ennic** (he, about forty, a merchant's younger son, a neat hand and a neat book; signs what is put in front of him; his good sword is first drawn at High Fort's break; wounded at Brans Keep on both roads, stitched by Ammet or the battalion's surgeons; lives; writes the `ledger` road's dead roll). The battalion's commander is never named or seen; at the end of Ch6 he is "dead, or taken; nobody knows which" (open).
- **The company clerk** (he, unnamed, Indebted, ink to the wrist): the oilskin paybook case, never let go; "quietly appalled". In the canal in Ch7 he holds it over his head and it stays dry.
- **The quartermaster** (unnamed): counts barrels twice; salves at 6, "docks, not promises"; runs the Token Auction (Ch5); finds the second cache by the cut; an empty crate at the footbridge.
- **The tile-woman** (she, unnamed): reads bone tiles for a dock when Perrit does not; spits to one side, for manners, every time.
- **The white fingertip** on every Whitefinder's boss: nobody knows why. The sergeant touches it for the Errant before things and at every chapter's end. Ch5: a soldier of the Second says it marks "the ones who did it"; Ch6: the old drill-sergeant's guess (a drill, boss to boss), only a guess.
- **The battalion's Second Company** (Ch5–6): a soldier with a paint-pot, its cook; in front of the Sixth at Brans Keep on Ch4 `run`.
- **The sergeant's street**: two streets back from the Quillas, the fourth house on the left, the family tally cut on the lintel; the mother's cousin has it now (Ch7; the brief's heir).
- **Thegg's mother** is dead; her tab in the pit town outside the east gate passed to him as heir. The old Tarthenal by the third brazier knew her. Thegg "ran, once" (said Ch4 and Ch5; never explained: open).

## Chapter 1 — The Drownings (`src/81_b5_ch1.js`)

Letheras in summer, the eve and first days of the Errant's festival. The Sixth is in the barracks near the Drownings District with the battalion's sick and its paybooks for the pursers' audit. The yard (the clerk, each soldier's paybook line, the Finadd's court news, the quartermaster, the tile-woman, the reading); the Low Walk by day (the rope-man and the trick, the cutpurses, the builder's board *Bugg*, the eel stall's Eberict talk); the pit town at dusk (the old Tarthenal, the carter, the tavern brawl over Thegg's mother's tab); the fines court that night (the key); the festival night (the Wager Board, the lanterns, the King's party far off); the morning (the Special Drownings from the tiers, the Trate news, the road north).

**Key `S.f.b5_c1_key`:**
- `pay`: the 300-dock fine on five paybooks, sergeant 80, Thegg 60, Perrit 60, Tobet 60, Ammet 40 (only those walking), "Thegg's fine"; the court clerk's sealing fee, up to 10 in hand (`b5_c1_fee`). Thegg +2, Perrit −1. Gain `b5_c1_receipt`. Everyone ends just short of pressed. Key fight `b5_c1_lane` (the collector in the barracks lane, survive 4); on its win `b5Forgive('thegg', 20)`.
- `swim`: Thegg swims the Quillas at first light on the ordinary list, weighted with the court's 300 docks, and comes out on the far steps (he swims; never walks the bed). `b5Owe('thegg', 40)`; Tobet −1; `S.f.b5_c1_swam = 1`; gain `b5_c1_weightbag` (Thegg ties it to his shield's strap). Key fight `b5_c1_lowwalk` (the bookmaker who laid against a Rising); +10 docks after (somebody in the Sixth laid a dock on the Stroke at twelve to one: open).
- **Read later:** Ch2 (Perrit's sums at the bounty on `pay`; Thegg dives, +2, on `swim`), Ch5 (the house buys the fine at half on `pay` + `sign`), Ch7 (the receipt turns the court's men away; the court's men know "the one who swam"; Thegg leads into the canal +2 on `swim`; the fire's lines), finale (Thegg's page).

**Flags:** `b5_c1_fine` 300; `b5_c1_swam`; `b5_c1_fee`; `b5_c1_laneDone` / `b5_c1_walkDone`; `b5_trate` 1 (always); `b5_bugg` 1; `b5_brizad` 1 (gossip only); `b5_company` 1; `b5_c1_tab` 1; `b5_c1_ropeOk`; `b5_c1_brys` (the King's party far off); `b5_wager`, `b5_wagerNet` (89). Phases `b5_c1_ph` 1–4.

**The canal threat** at the road: if `b5DrowningThreat()`, a court's runner has the first drowning name on his list; the road north is the way out.

**Canon as written:** court news as talk only (the Preda and the Queen's faction; Brys the new Champion; the delegation: Quillas, Moroch "who heads the Prince's guard", the First Eunuch, Eberict; Eberict's thirty-one and the King's Leave); the Eternal Domicile under scaffolding, seventeen years, sinking; the Special Drownings headline only; the Trate wave "two evenings ago" with crews "at their oars, and dead" (the runner's word).

**Inventions:** the fines court sits all night in festival week and weighs a swimmer with its own coin; the army's clerk's error on the tab; the rope-man and his hook-knife; the bookmaker on the Low Walk; the old Tarthenal; the Tarthenal carter (her son "in the Artisans").

**Trick:** The Rope-Man's Haul `b5_c1_haul` (✦ Might 15; the sergeant +2): the Rope's Way, swap with a squadmate within 5 + level step. **Items:** `b5_c1_hookknife` (+1 hit), `b5_c1_chit` (+1 Guile), `b5_c1_receipt` (+1 Wits; `pay`), `b5_c1_weightbag` (Thegg +1 armour; `swim`).

**Fights:** `b5_c1_cutpurses` 100 (optional), `b5_c1_tavern` 160+80 (survive 4), key fight 160. Level 1 → 3.

## Chapter 2 — Trate (`src/82_b5_ch2.js`)

Some days after the wave ("the last spears of sunlight", read as a summer evening). The quays (the harbour master's board, the old pilot and the trick, the curio market and the tooth, the Legion's cart for the drowned, the flooded sheds); the first hulk at dusk (the squad's first sight of Edur sorcery: shapes in the rigging; one in a drowned man's coat); the strand by the Shake boats (the Sixth's lines, Brune, the fish-hook); weeks of the harbour (the delegation's rumour, the night watch); the bounty (the key); the war declared; the barges up the river.

**Key `S.f.b5_c2_key`:**
- `salvage`: +40 docks; if Brune walks or waits, `b5Forgive('brune', 30)` (`b5_c2_forgiven` 30). Tobet +1, Perrit +1, Brune −1 (walking), Ammet −1. The cargo landed (`b5_c2_hauled`), `b5_c2_sealcoat` "salvor's right". The second hulk keeps its dead. Key fight `b5_c2_wreckers` (the harbour master sold the cargo twice: open whether on purpose).
- `dead`: no docks. Brune +2 (walking or waiting), Ammet +1, Thegg +1. The dead laid on the quay with the Shake (`b5_c2_laid`); `b5_c2_shells` from Brune or the Shake woman. Key fight `b5_c2_tide` (survive 4 until the Legion's lamps). The Shake take the poachers' dead out on the morning tide.
- **Read later:** Ch3 (the barge crews know the Sixth either way; Brune on the Shore having the fire's dead, on `dead`), Ch4 (the Trate straggler knows the company that carried the dead out), Ch5 (the Trate dockhand +2 on the press-gang claim, on `dead`), finale (Brune's page), 89 (Knucklebones' bargeman).

**Flags:** `b5_bruneDone` 1/2/0; `b5_bruneHook` (both walking); `b5_wraithSeen` 1; `b5_c2_hulkDone`; `b5_c2_hauled` / `b5_c2_laid`; `b5_c2_wreckDone` / `b5_c2_tideDone`; `b5_c2_war` 1; `b5_c2_weeks`; `b5_c2_pilotOk`; `b5_tiles`, `b5_tilesNet` (89).

**Brune** (she, 24, of the Shake) joins at the Shake boats with her own fish-spear and 60 docks (a boat the harbour tax took); "The Shore takes everything back. I would just like it to wait." Waiting, she is "with the Shake boats on the strand", and from then on with the company's followers.

**Canon as written:** the lighthouse and Tarancede Tower seen, never entered; the Legion's sorceress a robed figure on the sea wall, never named in this chapter; Fent and Nerek curios, teeth nobody can name; the flower dancers; the pilot scow only in the harbour master's telling; no toll; "From the Preda, through the Legion: the Edur have declared war." The river is never named.

**Inventions:** the harbour master and his board and ledger; the old pilot (forty years over the bar); the Shake woman and her boat; the black shell among the white (never explained).

**Trick:** The Pilot's Eye `b5_c2_pilot` (✦ Wits 16; Brune +2): the Long Listen. **Items:** `b5_c2_sealcoat` (+1 armour; `salvage`), `b5_c2_tooth` (+3 health), `b5_c2_gaff` (reach, −1 armour), `b5_c2_shells` (+1 Wits; `dead`).

**Fights:** `b5_c2_looters` 110 (optional), `b5_c2_hulk` 170+80, key fight 170. Level 4.

## Chapter 3 — Kraig's Landing (`src/83_b5_ch3.js`)

Three buildings and a dock up "the river" from Trate, the Cold Clay Battalion camped round it, the Snakebelt cadre up from Awl, two ships with the King's banner and the Ceda's. The news (the war; the council in Letheras as officers' talk; the Whitefinders recalled north: "the battalion is coming"; a Letherii went over, no name); the Faraed scouts' fire and Ruuk; the trader's man; the young cadre mage and the trick; the Nerek haulers; the first night (river thieves); the next day (deserters at the scouts' fire; the night's orders; "There were Nerek up there"); the key; the green fire; dawn (the ash, Fent Reach, the road to High Fort). The squad never enters the hostel or its tavern.

**Key `S.f.b5_c3_key`:**
- `watch`: Perrit +1, Ammet −1. The green fire from the barges; the camp cheers; the backlash fells the shed by the water (two will not walk for a while; nobody killed). Key fight `b5_c3_cheer` (the regiment's drunks on the Nerek haulers, survive 4).
- `warn`: the runner is Ruuk if he walks, else Tobet (`S.f.b5_c3_runner`). Ammet +2, Thegg +1, Perrit −1. The fire comes before he is a league up the bank; the squad finds him in the reeds; key fight `b5_c3_bank` (three wraiths and an unblooded watching the villages). "I didn't get there… a league short." At dawn the Cold Clay notes the Sixth: `S.f.b5_noted = 1`, `b5Owe('sgt', 30)`. Ennic: "I would have sent him too."
- **Read later:** Ch4 (`b5_noted`: "as far from the royals as the fort has"; Perrit's grief for two of the eleven on `watch`, her book's "*The Sixth was right*" on `warn`), Ch5 (the Nerek family on the road on `warn`; Ammet +1), finale (Ammet's page).

**Flags:** `b5_c3_runner`; `b5_noted`; `b5_fentReach` 1 (always); `b5_ruukDone` 1/2/0; `b5_c3_trader` `paid`/`ride`/`talked` (+ `b5_c3_nameTaken`, a name in the trader's book: nobody reads it); `b5_c3_haulers`; `b5_c3_riverDone`; `b5_c3_cheerDone` / `b5_c3_bankDone`; `b5_c3_collapse`; `b5_c3_linkOk`; `b5_c3_desDone`; `b5_bones`, `b5_bonesNet` (89).

**Ruuk** (he, 17, Faraed guide; never the canon scout Trull's party kills) joins at the scouts' fire with 40 docks (his clan's winter grain); "Not that way. The map lies. Come." With Brune walking, "Walk with us instead of Brune" swaps her to the followers. The trader's man: pay 20 (`b5Pay`), let it ride (+15: **this presses Ruuk at once**, 55 against 50), or a Guile 14.

**Canon as written:** the three mages as "the sorceress from Trate, and two others", tents only; the green fire as a curtain over the mountains, "onto whatever is there"; the cheer; "Nothing came down off them after"; Fent Reach surrendered "to the Edur, who came by sea" (Yan Tovis unnamed in text); one line of a merchant's iron-banded wagons.

**Inventions:** the young Snakebelt cadre mage (an apple, ink on her fingers); the Cold Clay soldier on his bucket; the old Nerek hauler (her sister's people went up long ago); the barge-master; the river thieves; Ruuk's uncle among the scouts; a place left empty at the scouts' fire (a scout up the north road: never who or how).

**Trick:** The Cadre's Link `b5_c3_link` (✦ Wits 16; Perrit +3; rides the Hold): the Claw Hand-Cant. **Items:** `b5_c3_cadretile` (+1 Wits), `b5_c3_spear` (reach; Ruuk's spare or 2 docks), `b5_c3_ash` (green ash, no effect; into the canal in Ch7).

**Fights:** `b5_c3_rivermen` 150+70, `b5_c3_deserters` 100 (optional), key fight 150. Level 5.

## Chapter 4 — High Fort (`src/84_b5_ch4.js`)

The forest road north (Ruuk or a Faraed scout guides; the stream took the bridge; Thegg carries Ruuk over; Ruuk's stone for Perrit and herb for Ammet); High Fort, the Whitefinders' station, without the Whitefinders: the Queen, the Prince, the Queen's Battalion and the Quillas Brigade fell back on it yesterday. The Sixth is put under the garrison on the westernmost rampart under the bastion tower. The reading at the arrival; the old hand and the brand-pots (*NOT FOR THE QUEEN*); the cadre-master who does not link Perrit; a Grass Jacket ("Wraiths first… wolves at the back. For after."); a Trate Legion straggler (Trate gone "from the sea, in a night"); the view (Moroch far off, the one uneasy officer); the gully patrol; the night; the battle from the west rampart (the eleven die, the lightning column, the wraiths over the west rampart first, the charge taken apart, the Grass Jackets break).

**Key `S.f.b5_c4_key`:**
- `hold`: Thegg +1, Ammet +1, Ruuk −1 ("We could have been in the trees"). The demon inside the rampart (`b5_c4_demon`, then the back slope until the horns); the wolves among the wounded on the field (one line); the wounded carried in through the gate (`S.f.b5_c4_wounded = 1`; Might 13, done either way); the word ("And the whole frontier with it"); the pile: `b5Disarm()` (`b5_disarmed`, `b5_stash`); knives, shields and the clerk's case stay; the long file south, never with the royals' end.
- `run`: Ruuk +2, Tobet +1, Thegg −1 ("I stand behind. I do not run. I ran."). West with the Grass Jackets into the wood, armed; key fight `b5_c4_wolves`; out on the road south ahead of the disarmed column, which brings the word.
- **Read later:** Ch5 (disarmed column and the rearming on `hold`; armed ahead and +2 on the claim on `run`), Ch6 (the front of the crossing on `hold`, the second rank on `run`), Ch7 and the finale (High Fort on every page, `b57HighFort`).

**Flags:** `b5_disarmed`; `b5_c4_wounded`; `b5_c4_moroch` 1; `b5_ruukCarried`; `b5_c4_stone` / `b5_c4_herb`; `b5_c4_mages` 1; `b5_c4_unlinked`; `b5_c4_trate` (the straggler heard); `b5_c4_brandOk`; `b5_c4_gullyDone`; `b5_c4_word` 1 (both keys); fights' `…Done`.

**Perrit** is not one of the eleven, never linked, never "the last" of anything: the links go "like a door slammed in a long corridor".

**Inventions:** the garrison's Finadd (two pencils, "Keep the wolves off it"); the old hand (nineteen years, three Finadds and a well; names Moroch once); the fort's cadre-master (one of the eleven, going to the stone fort); the Grass Jacket with the water-skins; the straggler; the brand-pot crate.

**Trick:** The Brand-Pot `b5_c4_brand` (✦ Wits 16): the Oil Bola. **Items** (none of them weapons): `b5_c4_helm` (+1 armour), `b5_c4_wolftooth` (+1 Might; "too big for a wolf"), `b5_c4_pitchpot` (line only).

**Fights:** `b5_c4_gully` 120 (optional, +8 docks), `b5_c4_wraiths` 170+90 (garrison allies), key fight `b5_c4_demon` 110+70 (survive 4) or `b5_c4_wolves` 180. Level 6. No money moves (the brief's row).

## Chapter 5 — The Retreat (`src/85_b5_ch5.js`)

South from High Fort through country burned to the root by Letherii hands. The first cache at a milestone, dug out neatly (never who; the quartermaster pockets a cut seal); refugees (Trate has fallen: `b5_trateFell`; on Ch2 `dead` the Trate dockhand); a Grass Jacket's road talk (a Finadd upriver whose garrison "answers to nobody now": `b5_breakaway`; Second Maiden's Fort holds; three companies on the frontier road); the Bluerose courier's girth, cut not worn; on Ch3 `warn` the Nerek family; the press-gang at the crossroads and Pessa; the burned farm and its deserters (optional); the second cache in a burned copse (the trick; `b5Rearm` on `hold`); the road fire (the Token Auction; Pessa and Perrit's reading); the battalion's rear picket below a village burned a day before ("We were ordered south to Brans Keep… and to leave nothing behind us the Edur could eat"); Brans Keep, the Whitefinders there; the factor; the key; the night; the morning in the lines.

**Key `S.f.b5_c5_key`** (and `S.f.b5_holder`):
- `sign` (`house`): Tobet −2 ("I have been sold twice now"), Perrit +1, Pessa −1. +40 docks; `b5_c5_housemail`; on Ch1 `pay` the fine bought at half first (`b5Forgive` sergeant 40, Thegg 30, Perrit 30, Tobet 30, Ammet 20), then the house's first interest on every debtor (⌈debt/10⌉), walking or waiting. Key fight `b5_c5_wagons` (deserters at the house's wagons; +10 docks).
- `refuse` (`army`): Tobet +2, Pessa +1, Perrit −1. Tobet shows Pessa her line (both present: `b5_c5_ledgerShown`). Key fight `b5_c5_factor` (the house's men for the paybook case, survive 4; nothing on them is the house's; the factor tips his hat).
- **Read later:** Ch6 (the factor at the line's end and at the barrow on `sign`; the clerk without interest on `refuse`), Ch7 (the strongroom burns on `sign`; the clerk in the doorway on `refuse`), finale (the holder on every page).

**Flags:** `b5_pessaDone` 1/2/0; `b5_trateFell` 1; `b5_breakaway` 1; `b5_rearmed`, `b5_c5_rearmed`, `b5_c5_rearmedWith`; `b5_c5_cache` 1; `b5_c5_empty`; `b5_c5_markOk`; `b5_c5_rejoined` 1; `b5_c5_learned` 1; `b5_c5_pack` (Thegg carries Pessa's pack); `b5_c5_lamp`; `b5_c5_husband` (Perrit lies about one tile; never which); `b5_c5_ledgerShown`; `b5_c5_ledger` `burned`/`kept`; `b5_c5_claimed` / `b5_c5_pressWon` / `b5_c5_let`; `b5_c5_named`; `b5_c5_girth`, `b5_c5_cut`; `b5_c5_nerek`; `b5_c5_farmDone`; `b5_c5_nightDone`; `b5_tokens…` (89).

**Pessa** (she, 33, a canal boatwoman from a burned village north of the capital; a burn-scar down one cheek; "I am not a soldier. I am a woman with a boathook and a grievance.") joins with the press-gang's 120 docks, her name spelled wrong in its book; her line stands whatever happens. Her husband is gone "on the canal, before all this" (never how).

**Canon as written:** the burned country (boards with the army's stamp; never the battalion shown burning); Bluerose's tack, nothing more; Brans Keep against its cliff, Lake Brans, the dry channel; High Fort's survivors rearmed at the carts, "the Artisans have taken a whole column of them" (heard). The King's bounty is talk only here ("Nothing is written yet").

**Inventions:** the two caches and the quartermaster's cut; the rear picket; the house's factor (about fifty, a pleasant face he uses) and his clerk with the umbrella; the house's mark, a scale-balance; the press-gang at the burned inn.

**Trick:** The Quartermaster's Mark `b5_c5_mark` (✦ Wits 16; Ammet +2): the Rhivi Spirit-Song. **Items:** `b5_c5_cacheblade` (+1 hit), `b5_c5_cachebow` (+1 hit), `b5_c5_housemail` (+1 armour; `sign`), `b5_c5_girth` (+1 Guile).

**Fights:** `b5_c5_farm` 130+60 (optional, +12), `b5_c5_press` 150 (avoidable by the claim; survive 4), key fight 160. Level 6–7.

## Chapter 6 — Brans Keep (`src/86_b5_ch6.js`)

The eve in the Whitefinders' lines across the dry channel (the order of battle from the Preda; no Ceda; the front of the crossing on Ch4 `hold`, the second rank behind the Second on `run`); the King's bounty at the clerk's table; the drill-sergeant and the trick; the foragers by the lake (optional); the fire (one scene each: before the paybook, and paid up); Thegg gives Pessa her pack back; the night. Dawn and the reading on a shield. The day from the channel: the dust, the white fire, the pillars, both corner towers down, the pillars on the left and the centre, a standard everybody knows going under ("That was the Preda's"); the Edur who came over the lake beds, hand to hand, without sorcery; the break.

**The King's bounty** (`b5_bounty` 1): `b5Forgive` 30 on the sergeant and every walking soldier (not those waiting), once; +15 docks (the quarter's pay a day early). The clerk writes the heirs for every line the night before.

**Key `S.f.b5_c6_key`:**
- `stand`: the mortal fight `b5_c6_channel` (Edur and unblooded only, a Whitefinder regular beside; downed in the first ground are dragged up, whoever falls in the second stays down). `S.f.b5_c6_fallen` = the ids killed, set at `b5_c6_channel_after`. Ennic wounded (`b5_c6_ennicHurt`, `b5_c6_stitched` `ammet`/`surgeons`). Every survivor +1. The fallen are left on the crossing and go into the barrow. Then the hills (`b5_c6_hills`), the Errant's shrine (`b5_c6_shrine` `took` 8 docks / `gave` 1), the ridge.
- `fallback`: Thegg −1 ("We left the crossing"), Pessa +1 ("Good."), Tobet +1. `b5_c6_fallen = []`. The Dissent road, the sutler's cart (`b5_c6_cart`, 8 docks), the flight `b5_c6_flight`; Ennic wounded here too (a wolf past a shield).
- Both roads: the pillars lift and what they carried comes down; the keep burns; a Riven soldier let go to carry word: the Emperor's declaration (subjects; not a victory; one barrow by midnight); the barrow seen far off (`b5_barrowSeen` 1); the fallen's debts said once (`b56Heir`).
- **The dead's debts:** `kill` in 80 has passed each to `S.f.b5_heirs`. On Ch5 `sign` the house adds a tenth at the barrow, once (`b5_c6_heirsWritten = 'house'`); on `refuse` the clerk writes them without (`'army'`). Never the squad's.
- **Read later:** Ch7 (who walks; the names at the brazier; Ennic's stitches; the White Finger's +1 at the barricade), finale (the fallen's pages, `b57Channel` on every page).

**Flags:** `b5_c6_fallen`; `b5_heirs`; `b5_c6_heirsWritten`; `b5_c6_ennicHurt`; `b5_c6_stitched`; `b5_bounty`; `b5_barrowSeen`; `b5_c6_pack`; `b5_c6_fingerOk`; `b5_c6_shoreDone`; `b5_c6_shrine`; `b5_c6_cart`; `b5_c6_survived`; `b5_c6_day` 0–3; `b5_drill…` (89).

**Inventions:** the old drill-sergeant (thirty years, twenty as drill-sergeant); the foragers' sergeant; the quarter's pay a day early; the Riven soldier let go to carry word; the wayside shrine with a holed dock carved over its door; the sutler's cart; "the ones who came over the lake beds" (Tomad and Binadas never named).

**Trick:** The White Finger `b5_c6_finger` (✦ Might 16; Thegg +3): the Line. **Items:** `b5_c6_edurblade` (+1 hit), `b5_c6_paint` (+1 armour; whoever carries it repaints the bosses at a rest), `b5_c6_lakestone` (+3 health; "the only thing anybody brought out of that field that nobody owes for").

**Fights:** `b5_c6_shore` 130 (optional, +10), `stand`: `b5_c6_channel` 200+100 (mortal) and `b5_c6_hills` 160; `fallback`: `b5_c6_flight` 170. Level 7 (the fallback road is light on xp).

## Chapter 7 — The Seventh Closure, and the end of Book Five (`src/87_b5_ch7.js`)

The night after Brans Keep: the broken army in at the main gate; burned houses, looting, the dead (headline); "the King has been crowned Emperor, by his own court, in the new palace. The Seventh Closure has come" (belief); starlings round a dark tower apart; the bell-station at the old fish market; Ennic's orders: the footbridge over the Quillas by the Low Walk, two streets from the sergeant's birth. On Ch5 `sign` the house's strongroom in the Counters' Quarter burns (`b57Burn`: `b5Forgive(⌈debt/4⌉)` on every debtor, once; `b5_c7_burned`); on `refuse` the clerk sits in a doorway all night. The streets (the cooper's shop, the purse in the rubble, your street). The footbridge at night: the barricade, the brazier, the reading, the names, the court's men (if `b5DrowningThreat()`: the receipt on `pay`, Thegg's face on `swim`, else the fight). The day: citizens on the white walls with slates; the Jheck on the tiers and the footbridge; the runner's word of the main bridge ("seventy or so", the Finadd and the Emperor both fell, "and then the Emperor got up"; nobody along the canal saw it); Settle Lake's thump; the Edur at the barricade; the sorcery down the street with the lamps going out; the squad into the canal under the arch on the ledge a hand wide; it passes; the Emperor's word: the killing stopped, a day of suffering decreed (never what it holds). The evening: the rumours (Eberict dead in a street, the King's Champion dead in the throne room, the Chancellor sworn), the canal children's holed dock, the Edur patrol, the roads.

**Key `S.f.b5_c7_key`** (all three open to every squad; only the sergeant and those walking are on the Low Walk):
- `emperor`: lay down arms to the patrol; the army is the Emperor's; the paybooks unchanged (`b5_c7_sealed`). Ennic swears with the rest. Perrit +1, Thegg +1, Tobet −1, Pessa −2 (she gets her boathook back), Brune −1. The finale's one line of rumour of Edur ships across the sea (rule 44). **The save Book Seven may offer** (`b57Onward(s)`: `s.chapters[7] === 'emperor'`).
- `paid`: discharge; every dock in hand on the debts, smallest first (`b57PaidOut`), then the army's release for anyone `easing` or `free` (`b5_c7_spent`, `b5_c7_released`). Pessa +1, Ruuk +1, Brune +1, Perrit −1. No road onward.
- `ledger`: Ennic writes the squad into the dead roll of the fall; each walking line (and the sergeant's) goes to the heirs: `S.f.b5_c7_listed = {id: docks}`, `S.debt[id] = 0` (kept apart from the true dead's `b5_heirs`). The clerk tears out the Sixth's page (`b5_c7_ledgerpage`). Tobet +2, Pessa +1, Thegg −1, Perrit −1, Ruuk −1, Brune −1. Never called desertion. No road onward.

**Flags:** `b5_c7_sealed`; `b5_c7_spent`, `b5_c7_released`; `b5_c7_listed`; `b5_c7_burned`; `b5_c7_canal` 1; `b5_c7_stopped` 1; `b5_c7_word` 1; `b5_c7_courtDone` `receipt`/`swam`/`fought`; `b5_c7_threat`; `b5_c7_named`; `b5_c7_dockOk`, `b5_c7_dockGot` (the dock is given either way); `b5_c7_ash`; fights' `…Done`; `b5_c7_ph` 1–4, `b5_c7_day` 1–3.

**Inventions:** the bell-station and its count; the old garrison sergeant at the barricade (his wife on the walls with a slate; "Spectators. That's a Letherii talent"); the ledge under the arch every Drownings child knows; the canal children and the holed dock's custom; the citizen with the slate; the cooper; how the decree is heard (a voice on the bridge "with a strange edge to it"); on `emperor`, the Edur counting the soldiers and an officer with a new band.

**Trick:** The Holed Dock `b5_c7_dock` (✦ Guile 16; the sergeant +2, Pessa +2): the Lady's Pull, wired to 16's `pull` in Book Five only. Carried to Book Seven. **Items:** `b5_c7_dock` (+1 Guile), `b5_c7_lamp` (+3 health), `b5_c7_ledgerpage` (line only; `ledger`).

**Fights:** `b5_c7_looters` 120 (optional; talked out for 8, fought for 12), `b5_c7_court` 120 (only on the threat; survive 4), `b5_c7_wolves` 170+80, `b5_c7_barricade` 180+90 (not mortal). Level 8.

## The finale (`B5CH7.finale`, `B57FIN` in 87)

Labels: Epilogue, The squad, "Fallen at Brans Keep", "Not on the Low Walk", the role "Sergeant · Sixth Company, the Whitefinder Battalion", "The End of *Indebted*", the credit to Steven Erikson and Ian C. Esslemont. The road page by key (three paragraphs; the fallen named once). **A fate page per squadmate who walks**: what the debt became (`B57FIN.debt`: on `emperor` the number, the start, the standing and the holder; on `paid` released or still owing, to whom; on `ledger` the heir; the strongroom's quarter on `sign`), High Fort by Ch4's key, the channel by Ch6's, Thegg by Ch1's, Brune by Ch2's, Ammet by Ch3's, and a closing line by loyalty. **Gone pages:** "In the barrow" (Brans Keep's dead, their heirs, with the house's tenth or the clerk's none, the name said at the brazier); a recruit "Waiting"; "Sent away"; "Another road". The sergeant's page (the road; the debt; the canal; the holed dock if carried; the white fingertip). The coda: the Seventh Closure as everybody says it (rule 40); the Edur in the streets; the day of suffering, undescribed; the Sixth's part; the canal; the paybook; `debtHTML` as the count.

**The heirs** (fixed; `B56_HEIRS` = `B57_HEIRS`): the sergeant → a cousin two streets back from the Quillas; Tobet → his family on the tenant farm, Indebted again; Thegg → nobody living ("a ledger nobody can collect"); Perrit → her father, a clerk in the Pursers' District; Ammet → the cutler takes the tools, the note dies; Ruuk → his clan in the Faraed hills; Brune → her village on the coast; Pessa → nobody (her name is spelled wrong, her husband gone).

## The Tiles in Book Five

Readers (`visReader()`): **Perrit** (black stone, the school's spiral of five) while she walks and lives, else **the tile-woman** (bone, a row of four, a dock). Reading places: the barracks yard (1), the quay at Trate (2), the outer barge at Kraig's Landing (3), the west rampart by a helm (4), the ash at the road's edge (5), a shield on the grass at dawn (6), a cracked flagstone behind the barricade with a dock and a knife (7). Chapters 4, 6 and 7 put the choice at the reading's place, not the chapter's first halt (each chapter's notes say why). Lean tiles: the Empty Throne, the Barrow, the Watcher, the Wall, the Walker, the Axe, the Gate. No tile names its being (rule 41).

## The visions (`src/88_b5_visions.js`)

`b5v1` Trull in Mosag's longboat on Calach Bay (what was summoned is a swell under the boat); `b5v2` Kuru Qan in the Cedance through the tile that answers Tarancede Tower, the end of a summer day (the spirit "something old, and bound, and hungry"); `b5v3` Yan Tovis on the wall at Fent Reach, three hundred thousand, the colours struck (no blood, no Shake, no "Twilight"); `b5v4` Nekal Bara at the Trate lighthouse, her mistake, the Ceda's name, the lamp out; `b5v5` Moroch on the road south to the gates (no Errant); `b5v6` the Preda ("she") with the King's Battalion, "Hold", the Whitefinders still fighting on the right (no word of her death); `b5v7` Moroch on the principal bridge over Main Canal (unnamed), seventy-three behind him, the Emperor coming on (never the duel, nothing of the sword). Words-only flags `b5vN_*`.

## The recruits (one walks at a time until Chapter 7; the others wait with their own people or the company's followers; swapped at any fire)

- **Brune** (Ch2, Trate): the fish-spear; feet in any water there is; "The Shore takes everything back. I would just like it to wait." No queen, witch or royal line.
- **Ruuk** (Ch3, Kraig's Landing): a step ahead; "Not that way. The map lies. Come."; names birds; will not look at Perrit's tiles; his grandmother "will not believe a word".
- **Pessa** (Ch5, the road south): the boathook; reads her line out loud; "I'm not a soldier."
- From Chapter 7 a dead core soldier makes room for two recruits.

## Left open on purpose (for Book Seven and after)

Who laid the dock on Thegg's Stroke; whether the collector took the rest to the pursers; the old Tarthenal's and the carter's son's names; the tile-woman's name; what held the shapes in Trate's rigging; the black shell; whether the harbour master sold the cargo twice on purpose; the jar of teeth; whether anyone was in the villages to warn; the scout who did not come back; the name in the trader's book; what the young cadre mage was sent for; what the demon was; the Grass Jackets who ran and the three carried in; who dug the first cache; the breakaway Finadd; the courier and the Grass Jacket on the verge; whether the factor's men were the house's; which tile Perrit lied about; how Pessa's husband went; the battalion's commander ("dead, or taken"); whether others of the Sixth fell at the crossing; whether the Errant noticed his docks; what happened at the crossing after `fallback`; the other names on the court's list; who of the garrison came up out of the canal; what the Edur's morning count means (`emperor`); where the squad goes west (`ledger`) or after discharge (`paid`); what the day of suffering held; why Thegg "ran, once".

## The continuity read (Thu Oct 29, 2026)

**Checked across chapters:** every flag a later chapter reads has a setter earlier (a script over 80–89; the only never-set names are the engine's tile, vision and standing flags, set by 80c/36b/80 at run time); every key's consequences against the brief's keys table (all present, both ways, with defaults for synthetic saves); every debt move against the brief's table (all present; totals cannot go negative: `b5Pay` and `b5Forgive` clamp); the heirs (the two tables match the brief); the dead after Brans Keep (every later line about a core soldier is behind `b5In`/`b57Say`; the finale's gone pages handle `S.dead`); pronouns and the ungendered sergeant (every `b5He/His/Him` on a roller is guarded for `sgt`); the hard-limit words (no Kettle, Green Jackets, Soulan Bridge, Burn's Sleep year, never-use names or crossbows in Letherii hands; Main Canal only in vision 7 and its closer); no exclamation marks in narration (the four found are in dialogue); `repeat_scan` (every Book Five hub reads `again` or folds).

**Fixed (small, in the chapter files):**
- *Timeline:* Brune "in Trate in the spring" (Ch4 straggler) → this summer; Tobet's "Two days' ride" to Letheras (Ch6 end; never count the days) → "Back to Letheras. Where they keep the books."; Thegg's finale "in the autumn" (no season is established after summer) → "at the fall"; vision 2's Trate "to the north and west" of Letheras → "to the north".
- *Consistency:* Perrit's "hand is shaking on the staff" (Ch7 barricade; she carries a knife and a tile pouch) → the tile pouch; the house's advance sentence at Ch5's dawn (garbled: "forty docks less owing… in coin") rewritten; Tobet's "sold twice" (Ch7 roads) and "Sold three times" (finale, `emperor`) now count only the house's sale on `sign`; the `emperor` road's last line no longer stacks the shields the patrol did not take; Thegg's brazier line no longer reads "or the strap where it would be" on `pay`; Pessa's "the second time she has mentioned him" (Ch6; depends on optional scenes) → plain; Ch5's refugees now note the Trate story is the High Fort straggler's when he was heard.
- *Canon and rules:* "Lether took their country north-west of here" (Ch1 pit town; no source places it) → unplaced; "a corporal of the Fourth Squad" (Ch1; no rank below Finadd is invented) → "a soldier".
- *Trope convergence* (an n-gram scan of 81–88; the trope budgets themselves are all inside): Pessa's "boathook upright" 19 → 12 (cut seven in Ch5–6); Tobet's "says, flat" 19 → 11; Brune's "feet in the" water 21 → 17; Ruuk's "a step ahead" 24 → 20 (cut three in Ch4, one in Ch3); Ammet's "boiling her needles" 7 → 5; Tobet's "From back here, everything owes me money" at High Fort's arrival replaced (kept at Ch3, Ch4's fire variant and Ch7). Left as deliberate motifs: the sergeant touching the white fingertip "for the Errant" (16, one per chapter's end and a few before fights), the tile-woman's spit "for manners" (18), Ammet's "Hold still", Thegg's "Behind me", Ruuk's "The map lies. Come."

**Left for David (design or balance; not changed):**
1. **Ch1 `pay` then Ch3 `warn` presses the sergeant** (420 + 30 = 450 > 425): two fixed brief moves meet; the collectors count it. Either is easy to soften (the regiment's fine 20, or the sergeant's share of the fine 70).
2. **Ch3's "let it ride" presses Ruuk at once** (40 + 15 = 55 > 50, −1 loyalty and a collector). The brief's number; 10 would keep him held.
3. **A recruit who was waiting at High Fort or Brans Keep still gets "held the west rampart" / "held the crossing" on the finale's page** (`b57HighFort`, `b57Channel` read the key, not who walked). Needs a small "walked in chapter N" record to fix properly.
4. **Balance, from the chapter notes:** Bridgeburner is easier than 75–80% almost everywhere from Ch3 on (the brief's foes on Book Two's curve); `b5_c7_barricade` lost one smart Soldier run in twelve; the Ch6 `fallback` road is light on xp (one fight). Levers are in each chapter's notes.
5. **Engine needs reported by the chapters:** `settleRoll` says "Oponn smiles" on a natural 20 in Book Five (16); `hurtMost` does nothing in Book Five; no hide-and-reappear skill for the demon (`b5_demon`'s "hide 2"); the Holed Dock's check half is wired to `pull` by wraps (a `TRICKS[k].pull` key in 16 would retire them).
