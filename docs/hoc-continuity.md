Wed Oct 21, 2026, 7:58 AM PDT. Book Four continuity, against branch book4 (v7.0.0, not shipped), with the findings fixed on `b4-fix`.

# Book Four: *Unblooded* (beside *House of Chains*) — continuity

What each chapter set up, for the books after it. Later books read this doc, not the source. Written by a fresh reader from `src/70*`–`78`; where a chapter note and the code disagree, the code is what is described here. The faults found on the read are in `docs/hoc-continuity-findings.md`, all fixed; this doc describes the fixed text.

**Shared helpers.** Each chapter has its own `b4NL / b4NSay / b4NR / b4NDog / b4NNew / b4NPh / b4NKey` (N = 1–7), all file-local in name but global in scope. Engine (70): `b4On, b4In(id), b4Was(k), b4Fresh, b4Fallen, b4FallenNames, b4Nerve, b4NerveNow, b4Mood, nerveHTML, b4Join, b4SwapIn, b4Offers, b4Waiting, b4Recruit_, b4Room, b4CanRecruit, b4Rest, b4DustNow`. Ch1 adds `b4PipeChoice(back)` (any fire) and `b41Token()`. Ch3 adds the ferry rope's check wrap. Ch5 adds `b45Rng(u, clear)` (range without/with the dust; Ch6 calls it).

**The book's recurring cast (inventions, all chapters).**
- **The 9th Legion's Second Company.** Captain **Hollet**: thin, Genabackan, a cough (in a few scenes; worst after the oil raid, absent when it matters in Ch7), kept a garrison's books at Genabaris for nine years; decent, frightened of Blistig; his line is "I keep the numbers". Sergeant-of-the-line **Radde**: bald Falari, sunburnt scalp, a pointing stick, "two wars, the Falari one and the one after"; keeps **the book** (the company roll) with marks: a finger bone for the company, a knot for the Chain (Ch1 `chain`), "the Fall" / "its place" (Ch2), an unseen mark (Ch4 `picket`), "steady" (Ch5 `column`), "held as posted" signed by Hollet (Ch6 `hold`), and on `ledger` "*lost in the water*" against every name.
- **The freckled girl** (unnamed recruit, she, inland Quon, big, came by transport): in every chapter. Holds her spear like a broom (Ch1), learns it (Ch3), first kill on the barrow stone (Ch4 `picket`), never saw the sea before the transports (Ch5), her brother "went with the Seventh, out of Aren, before the rising" and she looked for him among the riders (Ch7; open whether she saw him; Haddat has his name).
- **The old soldier of the 9th** (`oldninth`, he, no name): reads the Deck for a finger of rum; the third reader.
- **The squad next along**: an unnamed Second Company squad with "a good corporal" that takes whatever post the Third does not (Ch2 `fall`, Ch4).
- **The bones.** From Ch1 every soldier wears a finger bone on a thong at the throat, the same way, by the Adjunct's order. Never named ("there is no name for it yet", finale). **The standard**: a thin figure holding up a bone before a sandstorm, Fist Gamet's, raised on the Aren Way (Ch2), seen far off.
- **Book Two's dead.** One quiet line per chapter (`b4NBarrow()` from `b4Fallen()[0]`; fresh start: Sathi, and Hackle not seen again).

## Chapter 1 — The Muster (`src/71_b4_ch1.js`)

Aren, two days before the march: the review from the 9th's line (the flash in the 8th, the boy with the bone far off), Hollet's errand in the harbour streets (relic stall, Red Blades' drink sweep, the Crow ships, durhang runners at the barracks gate), the first night (barracks yard, cemetery over the wall), the order at noon, the second night, dawn on the Aren Way.

**Key `S.f.b4_c1_key` = `S.f.b4_bone`:**
- `grave`: bones from Aren's old graves, asked for first. Nerve +2; Haddat −1, Marrow −1. Radde's mark: the company's bone. Second night: guarding Hollet's dig detail; the thieves return with the sexton (fight `b4_c1_watch`; `b4_c1_sexton`). The company makes room at its fire.
- `chain`: the order's bone with a Chain token tied to it: `S.f.b4_c1_token` = `thread` (Haddat's blue thread) / `string` (a knot of Marrow's) / `feather` (a crow feather from the pilgrims' road) / `keepsake` (transfer with keepsakes). Nerve −1; Haddat, Marrow, Sathi +1; `b4_c1_radded` (Radde's knot). Second night: the yard brawl against recruits who blame the "Chain dogs" (`b4_c1_brawl`, non-lethal objective).
- Both give `b4_c1_finger`. **Read later:** Ch2 (the feather on the Fall), Ch3/4/7 (what is tied to the bone), Ch7 (the rider wears the token), finale.

**Flags:** `b4_company` 1; `b4_blistig` 1 (always); `b4_c1_relic` `bought`/`broken`/`left` (+ `b4_c1_relicBuried`); `b4_c1_hollet` `ninth`/`chain`; `b4_c1_drill` `clean`/`ok`/`fail`/`talk`; `b4_c1_recNight` `truth`/`sleep`; `b4_c1_cartSharper`, `b4_c1_cartName`, `b4_c1_redName` (the sergeant's name taken: "yes, but"); `b4_c1_sash`; `b4_pipe<n>` (the durhang pipe used in chapter n); `b4_raminDone` / `b4_kethDone` (1 walks / 2 near; transfer only).

**Recruits:** Ramin on the drink sweep (if `S.imported.ramin`): "I said I would be given back. I was given back." Has a horse now, leaves it with the company; gives his red sash (`b4_c1_redsash`). Keth on the quay with Temul's youths (if `S.imported.keth`). One walks; the other waits near.

**Canon as written:** the Adjunct a grey shape on a grey horse; Blistig "Staged... Keneb's brat... mad"; 300 Crow by three ships walk past Temul ("fourteen", Radde); "some forty" youths; Lenestro dead (camp talk, "somebody off the Chain"); Mallick Rel ("the Jhistal priest") and Pullyk Alar gone together (transfer with `b2_nobles7` `backed`: Pullyk's shuttered house). The 8th's lieutenant made to wear a bone; Gamet to make the standard.

**Inventions:** the Chain's corner of the old cemetery and its board *Seventh · the last mile* (who lies under it: open); the bone-broker, the sexton, the pipe-man, the old gate sergeant (Darrut's drill sergeant, unnamed), the 10th's corporal, the ringleader.

**Trick:** The Gate Drill `b4_c1_gate` (✦ wits 16; Darrut +3): bearer and neighbours +2 armour (+3 from level 11); adjacent enemies cannot step. **Items:** `b4_c1_finger` (steady first blow at Nerve ≥5), `b4_c1_relic` (guile +1; Haddat won't wear), `b4_c1_redsash` (armour +1; Ramin +1 to hit), `b4_c1_durhangpipe` (once a chapter at a fire; or sell 8).

**Fights:** `b4_c1_runners` 130 (company), `b4_c1_dig` 160+80, `b4_c1_watch` 160+80 (`grave`, company) or `b4_c1_brawl` 160+80 (`chain`). Level 8 → 9.

## Chapter 2 — Coltaine's Fall (`src/72_b4_ch2.js`)

The first day out on the Aren Way: the empty trees (Pormqual's army was crucified on them after the Chain was inside Aren; the squad watched it from the wall, and walks under them now for the first time; braids, painted soldiers; the Adjunct forbids cutting), the standard raised far up the column, the camp at dusk barely past the hill with Aren's walls still in sight ("the shortest day's march in the history of the Empire"), robbers stripping the hill, the night (key), the news by morning.

**The hill is the Barrow.** The army calls it Coltaine's Fall; the squad calls it the Barrow (Book Two's mound within sight of the walls). `b4_c2_called` = `barrow`/`fall` (what the sergeant told Radde).

**Key `S.f.b4_c2_key`:**
- `fall`: up the hill at night with the pilgrims; the names said; Nerve +1 (recruits, two regulars and the freckled girl follow); Haddat +2, Marrow +1; Tangle keeps the cusser. `b4_fallClimbed` 1, `b4_c2_rear` 1 (marched at the back, no rest). Fight `b4_c2_hill` (company). Optional: the market finger left (`b4_c2_relicLeft`), a Book Two keepsake left (`b4_c2_keepLeft` = item id), on `chain` the old Crow woman's feather (`b4_c2_feather`, item `b4_c2_crowfeather`).
- `march`: the Third keeps its place; Radde approves (Nerve +1), Haddat −1; `b4_fallClimbed` 0. Fight `b4_c2_probe` (company; second ground in the wagons).
- **Read later:** Ch3 (Haddat's line), Ch5 (Haddat's mood), Ch6 (Haddat's eve), Ch7 (the face "near" on `fall`).

**Flags:** `b4_barrowSeen` 1 (always); `b4_news` 1 (always, Nerve −1): "a Claw out of a warren" at the Adjunct's tents; the camp says Whiskeyjack, the Bridgeburners, Captain Paran dead, Dujek's Host broken — belief only; `b4_temulPast` 1 (`wickans` road: Temul walks past the fire); `b4_c2_axes` `stopped`/`cut`/`left` (+`b4_c2_tenthName`); `b4_c2_front` 1/0; `b4_c2_ask` `all`/`names`/`walk`; `b4_c2_fear` `fire`/`quiet`; `b4_c2_doubt`; `b4_c2_cart` `ok`/`no`; `b4_c2_crowTaught`; `b4_c2_duiker` (the marine sergeant of the 8th: the last tree empty, "the markets", no one knows).

**Inventions:** the Crow pilgrims walk north from Aren to the hill, faster than the column; the braid-cutter and the hill's robbers (Aren's poor; never Semk); the old woman of the Crow (unnamed); the cairn on the verge; the last milestone (Aren Guard's "one stone out"); the 10th's corporal with the axe; the raiders (hill clans, never Leoman's).

**Trick:** The Pilgrim's Crow `b4_c2_crow` (✦ guile 15; spirit): enemy blows on the bearer re-rolled (neighbours too from level 11). **Items:** `b4_c2_fetish` (+1 armour), `b4_c2_milestone` (first landed blow +1), `b4_c2_crowfeather` (+1 wits).

**Fights:** `b4_c2_robbers` 170+85, then `b4_c2_hill` 200+100 (`fall`) or `b4_c2_probe` 200+100 (`march`). Level 10.

## Chapter 3 — The Burned Tears (`src/73_b4_ch3.js`)

The Vathar Hills: three thousand riders on the ridges; the raiders driven onto the 9th's flank picket by Khundryl who then show themselves; Gall kneels to Temul (heard), the broken sword carried past (seen); the feast; Vathar Crossing; the blast; the butte over Ubaryd.

**Key `S.f.b4_c3_key` (`S.f.b4_carried` 1/0):**
- `carry`: the squad (and the Second Company, boots off) wades its own stretch the night before the blast and carries out what it can, buried in a row on the south bank. Nerve +1; Haddat +2, Marrow +2, Tangle −1, Orvas +2 (walking or near; a near Orvas joins if room). `b4_c3_carriedHow` `many`/`few`; `b4_c3_noRest` 1. Fight `b4_c3_scavengers` (the old ferryman).
- `blow`: the marines' sappers take the ford clean. Nerve +1; Tangle +2, Haddat −1; the squad sleeps. Fight `b4_c3_poles` on the far bank (a river band; Baralta warned, Gall sent word).
- Either way the marine squad that blew it crosses first ("Keneb's gift"), then the 8th, then the 9th.
- **Read later:** Ch4 (intro, Orvas's regard `S.loy.orvas ≥ 2`), Ch5 (Haddat's mood), Ch6 (Marrow's eve), Ch7 (riders wet to the knee).

**Flags:** `b4_khundryl` 1; `b4_whirlwindSeen` 1 (from the butte: Ubaryd retaken, Nok's ships, the Whirlwind on the horizon); `b4_chains` (a Chains card at the feast); `b4_orvasDone` 1/2/0; `b4_c3_knife` `orvas`/`feast`; `b4_c3_bead` `carried`/`poles`; `b4_c3_shamanTold` `bless`/`true` ("a long but restless life… a life of searching"); `b4_c3_recTold`; `b4_c3_gall` (the war chief poured; the cup); `b4_c3_rope`/`b4_c3_ropeNo`; `b4_rope<n>` (the rope's +1 spent in chapter n).

**The count.** Fresh start: "the ford kept a third of the squad's stretch" (never a number). Transfer: `b2_vatharLost`.

**Inventions:** the flank picket and its cairn; the three shamans at a blue fire; the old Khundryl woman who teaches the cry "as a debt"; the loudmouth of the 10th; the ferry post, the old ferryman (ran the ferry forty years); the river band and its headman.

**Trick:** The Black Tears `b4_c3_tears` (✦ guile 16; spirit; Orvas +3): enemies within 2 −2 to hit for the round; next squad blow on one +2. **Items:** `b4_c3_khundrylknife` (+1 to hit; "Khundryl give these to people they mean to see again"), `b4_c3_bonebead` (+3 health), `b4_c3_cup` (+1 guile), `b4_c3_ferryrope` (+1 to one check a chapter).

**Fights:** `b4_c3_raiders` 160+80 (company; Burned Tear allies in stage 2), `b4_c3_brawl` 140, key fight 160+80. Level 11.

## Chapter 4 — Leoman's Raids (`src/74_b4_ch4.js`)

North of the Vathar: the boy with the bone walking in the hottest sun (Marrow: "Five, maybe. Six."; Hollet sends his straw hat "for the boy, from the 9th"); the oil raid on the ring of wagons (two hundred riders, lamps on cords, a dozen wagons, half the column's horse drawn off); days of raids; the Seti ambushed in a gorge (more than three hundred dead, the wounded left for the Malazans; the Adjunct's "Wounded Malazans are better than dead ones", once, through Hollet via an officer of the 10th); the wounded camp inside the 9th's wagons; the barrow night; the morning.

**Key `S.f.b4_c4_key`:**
- `seti`: the Third stays with the Seti wounded. `b4_setiSaved` 1; Nerve +1; Marrow +2, Hessa +1. Riders come back in the small hours: hold-out `b4_c4_wounded` (wounded Seti archers as allies). None taken; the old cutter: "The Seti will remember the Chain squad." The squad next along takes the far picket.
- `picket`: the far end of the 9th's picket line on the barrow hills, in fog (`dust:1` logged as fog). `b4_setiSaved` 0; Nerve +1; Tebbet +1, Marrow −1; `b4_c4_raddeMark`. Fight `b4_c4_picket` (company). Morning: Blistig asks which squad: **`b4_blistigNoticed` 1**. The wounded camp lost some in the night.
- **Read later:** Ch5 (the Seti scout, Blistig's look), Ch6 (asked for by name; the Seti archer stands the picket), Ch7 (same).

**Flags:** `b4_leoman` 1 (Leoman "of the Flails" named only as the army's belief); `b4_c4_muni` `saved`/`lost`/`left`; `b4_c4_recTold` `walk`/`leave`; `b4_c4_campTold` `held`/`true`; `b4_c4_called` (the jackal-tail lancer remembers the face); `b4_c4_carried` `all`/`some`; `b4_c4_lancersHow` `talked`/`fought`; `b4_c4_shot` `hit`/`miss`; `b4_c4_setibow`; `b4_lampballThrown` (once a book); `b4_c4_holletRead`.

**Morning camp talk (canon, never seen):** the marines sat in the barrows under helms; "eight hundred" (the 8th's boast); Fist Gamet rode to an overrun picket in fog, his horse killed by a munition, pulled out by two marines of the 8th, legs cut, "not right in the head", gave up his legion; Keneb acting Fist. Empty helms on the barrows ("the marines' spare").

**Inventions:** the jackal-tail lancers (a young society); the old Seti cutter (grey braids); **the Seti archer with the bound left hand** (thirty, a scar through one eyebrow; "the gorge took the fingers that draw"; she gives the squad her mother's horn bow; in Ch7 she sits the picket with a sling and spots, never draws; Ch5's scout and Ch6's picket archer are other Seti women); the 9th's munitions wagon; the picket lantern.

**Trick:** The Oil Bola `b4_c4_bola` (✦ wits 16; Tangle +3): a 3×3 of burning oil for 2 rounds. **Items:** `b4_c4_lampball` (once a book), `b4_c4_setibow` (+1 hit, +1 range), `b4_c4_helm` (+1 armour), `b4_c4_salve` (first heal +2).

**Fights:** `b4_c4_wagons` 200+100 (company), `b4_c4_lancers_brawl` 140 (avoidable), key fight 160+100. Level 12.

## Chapter 5 — The Wall (`src/75_b4_ch5.js`)

Dust from here (`B4DUST` 5:1). The camp a mile short of the Whirlwind Wall (new, raised with the rising: nobody's father saw it; Raraku under it is old, and Haddat's mother's people walked in over open sand to sell water); the reshuffle across the hollow (Keneb reads medium squads onto the marines' rolls, "Greymane's way", a young officer of good family = Ranal unnamed; "not the 9th"); the marine mage "playing with dolls" (queue talk); Neffarias Bredd (rumour); **an officer walks to the Wall alone and back** (never named: Gamet); the picket at the Wall's edge; the Wall draws back a mile off before "a grey shape on a grey horse" (no sword); Temul's scouts with Khundryl go in; the old sea floor; Blistig's bandage ("Fist Gamet's taken the 8th back... broke his nose for him"); seven days of water, foul wells (Fist Gamet suspects Dom's people); the canal city at dusk.

**Key `S.f.b4_c5_key`:**
- `seep`: a water party to **the Widow**, a seep under a coral reef half a day north-west (invention; no canon spring). Nerve −1 then +2; Haddat +2, Tebbet +1. **`b4_seepWater` 1**. `b4_c5_found` `ok`/`late`. Fight `b4_c5_seep` (the water-master in a grey veil).
- `column`: the rearguard under the dust. Nerve +1; Haddat −1; `b4_seepWater` 0. Fight `b4_c5_rearguard` (company).
- **Finder** `b4_c5_finder`: `haddat` (her mother's people sold water in Raraku) → `orvas` → `seti` (on `b4_setiSaved`) → `darrut` (a water-sellers' map in the Aren Guard-house) → `scout`.

**Flags:** `b4_c5_bandage` `told`/`kept`; `b4_c5_recTold`; `b4_c5_lone`/`b4_c5_loneNo`; `b4_c5_seven` (Radde's seven); `b4_c5_withdrawn`; `b4_c5_inside`; `b4_c5_wallSeen`; `b4_c5_glass`/`b4_c5_glassNo`; `b4_c5_conch`; `b4_c5_roadTried`; **`b4_c5_desDone`** (the 10th's six dead carried back; Ch6 Haddat adds them to the names); `b4_c5_seti` (the Seti archer on the road, `setiSaved` only).

**Haddat's mood** (`b45HMood()`): her loyalty +1 for `carried` +1 for `fallClimbed`: `easy` (3+) / `hard` (≤0). Marrow: "like the warren at the Vathar, child. Only older"; a warren fragment "torn off something and kept" (her feeling).

**Inventions:** the Widow and the water-master; the water-sellers' marks on the old road's stones; the stone ship's green stern-light; the canal city's deserters led by "the sash with no badges"; the road of standing stones (canon's "road lined with ghosts", kept as stones that are sometimes more and sometimes fewer).

**Trick:** The Sea-Bed Road `b4_c5_seabed` (✦ wits 16; Haddat +3): ignore the dust's range penalty, +1 move. **Items:** `b4_c5_conch` (+1 wits), `b4_c5_seaglass` (first shot in dust +1 range), `b4_c5_veil` (half dust penalty and sputter).

**Fights:** `b4_c5_wallriders` 160+80 (company, Dust 2), key fight 160+80, `b4_c5_deserters` 150+75. Level 13.

## Chapter 6 — Pan'arak (`src/76_b4_ch6.js`)

Dust 2. The lines face the Dogslayers' trenches on three ramps across a basin. One unnamed legion, a third of the army, goes round to block the way out; **the Third is lent from the 9th to the flank pickets at the end of its line**, where it runs into rock ("Not the 9th... which legion, the orders don't say"). On `b4_blistigNoticed` the Fist asked for them by name; else Radde volunteered. The horse held back. Nil and Nether walk the lines at dusk, barefoot, holding hands. The spur (a Dogslayer post); dusk skirmishers; the eve; the key at midnight. Gamet is not mentioned.

**Key `S.f.b4_c6_key`:**
- `hold`: Nerve +2; Hollet signs Radde's book (`b4_c6_holletSigned`); Darrut, Hessa +1. **`b4_saw` = `far`**. Fight `b4_c6_patrol` (company; the Seti archer on `setiSaved`).
- `forward`: out to the foot of the middle ramp. Nerve −1 (+1 if nobody down: `b4_c6_downed` 0/1); Tebbet, Sathi +1. **`b4_saw` = `close`**, `b4_c6_sawClose` 1, `b4_c6_seen` `no`/`near`/`early`. They see the trenches full, fires back and back, and the dark over the oasis "wrong", sitting on it like a hand (Marrow: the warren "turning its face away"; never explained). Fight `b4_c6_outpost`, second ground the run back.
- **Read later:** Ch7 (the face plain on `close`; the mortal fight sooner and harder).

**Ch5's water:** on `b4_seepWater` 1 the first fight (`b4_c6_nest`) gives +3 health each and an undusted first round.

**Flags:** `b4_c6_recTold`; `b4_c6_recNight` `sat`/`gone` (the boy who shook); `b4_c6_counted`/`countNo`; `b4_c6_dug`/`digNo`; `b4_c6_listenTried`; `b4_c6_hornBlown` (once a book); `b4_c6_eve_<id>`; `b4_c6_setiStood`; glossary `b4_c6_panarak`, `b4_c6_dogs`.

**The eve (who they were before; adds to the templates):** Haddat (a water-seller's daughter by the old wells; took the silver at twenty-one; the shield her grandfather's; her brother by `b2_ilhar`, including `parted`); Sathi (stole a grey mare with one white foot at nine; the mare's daughter died at the river); Tangle (blew stumps for farmers in Itko Kan with Moranth crackers; his mother gave the bead); Marrow (a fisherman's daughter, novice of Soliel in Nap; thirteen years); Tallow (gutted fish and sang; his grandmother's three cards: a soldier, a door with a grey figure, and a figure in rags with a bell, "not one of hers" = the faceless Leper); Hessa (the Grand Temple's east door, six years; why she left kept "for after" — **open**); Tebbet (his father's goats in Dal Hon; dreamt of the ramps); Darrut (the baker's boy of the Old Quarter; Blistig "once, when it mattered, stood with us"); Orvas (his mother's third son; Gall's oath quoted, the only time in the book); Ramin (his father a Red Blade of Ehrlitan; Blistig let them out of the cells); Keth (the boy who could hear his dead grandmother).

**Inventions:** the Dogslayers' badge (a red square, a black dog's head with a black bar across its throat); the spur post and its sergeant with a whistle; the marching song with the words changed; the Wickan youth at the horse lines.

**Trick:** The Long Listen `b4_c6_listen` (✦ wits 15; Tebbet +3): the first enemy to move is marked (+2 to hit); no flanking. **Items:** `b4_c6_trenchspade` (Tangle, +1 armour), `b4_c6_dogslayer` (+1 to hit Dom's men), `b4_c6_pickethorn` (once a book, two regulars).

**Fights:** `b4_c6_nest` 140+70, `b4_c6_dusk` 160+80 (company), key fight 170+85. Level 14.

## Chapter 7 — The Convergence, and the end of Book Four (`src/77_b4_ch7.js`)

Dust 3 until the duel, then `S.dust = 1`. The flank picket of the block at dusk; outriders in the scrub; the night (all of it out of sight): a sound like a battle on the far side of a hill (Nerve −1), the dark over the oasis thinning, butterflies over the trenches, a Wickan standard on the shoulder of the nearest ramp with nobody holding it, a sound a league off; then grey light and dust and riders with no sound of hooves — Wickan braids, crow feathers, Khundryl tears, the old Seventh's helms, the Chain's cloaks, the army that hung in the trees, older riders out of the sand — going up into the trenches; the fires go out one by one. Never the deaths.

**The one face** (`S.f.b4_c7_face` = id or `ladle`): transfer `b4Fallen()[0]`; fresh start Sathi; a transfer that lost nobody sees **the Ladle**, a cook of the Seventh (invention). Clarity `b47Sure()`: `clear` (`b4_saw` close) / `near` (`b4_fallClimbed`) / `sure`. On `b4_bone` `chain` the rider wears the token. On `b4_carried` some riders come wet to the knee. The narrator never names; **`b4_c7_namer`** says it (Haddat/Tangle/Marrow/Sathi in order of who knew them, else `sgt`). `b4_c7_faceSaid` `aloud` (Nerve +1) / `kept` (namer +2). Orvas sees the Burned Tears' dead with a woman at their head.

**The mortal fight** `b4_c7_breakout` (`mortal`, `hurtMost`, company), signposted: a nameless band of forty or fifty desert warriors running out of Raraku past the last picket; "the one with the good sword". On `close` nearer, bigger, a round sooner. Dead are `S.dead[id] = {ch:7, where}` with no `from`. **Let go** (`b4_c7_letGo`): Nerve −2. `b4_c7_breakDone`.

**The morning (canon as camp talk or far sight):** trenches silent (+1); Gamet died in his bed, "a clot in the brain", Keneb says; Keneb Fist (Nerve −1); the duel watched in silence from the line, one thrust, the helm covering the face, "That was Sha'ik" and nothing more; the dust comes down; a giant on a Jhag horse rides west and says the Malazans are not his enemies (camp talk; never named); a bound man in a filthy Malazan officer's cloak brought to the Adjunct ("the camp says Korbolo Dom"); Captain Ranal dead in a sandstorm with "pale riders" in it (Hollet); the Red Blades hold the trenches; the 9th picks arms off the sand at the ramps' foot (`b4_c7_sword`); the Wickan boy's warning, the run, a grey sheet of water, the spur fight, the coral islands; sixteen strangers off the water, a girl among them; the orders: after Leoman, "across this entire continent".

**The reading** is on the coral island (not the first halt): the cards "settle", the old soldier says "somebody's put the Deck in its box, and shut the lid". Never the Master.

**Key `S.f.b4_c7_key` (the road out):**
- `line`: on after Leoman in the 9th's file. Nerve +1; Darrut, Hessa, Tallow +1, Tebbet −1. To Book Six.
- `horse`: with the riders. **`b4_c7_lead`** = `orvas` (walking or near) / `warlock` / `sathi` / `boy`. Nerve −1; Sathi, Orvas +2, Keth +1, Tangle −1 ("I'll walk"), Darrut −1. Orvas leading gives **`b4_c7_tear`** (the black glass bead; first hit +2) and joins if near. To Book Six.
- `ledger`: Radde writes *lost in the water* against every name; they wade south off the island; Darrut goes home to his sister in Aren's Old Quarter; Ramin leaves his red scale on the coral. Nerve −1. No road onward.

**Other flags:** `b4_c7_faceSeen`, `b4_c7_ride`, `b4_c7_heard`, `b4_c7_recTold`, `b4_c7_look`, `b4_c7_rideTried`, `b4_c7_coral`, `b4_c7_strangers`, `b4_c7_flood`, `b4_c7_duel`, `b4_c7_giant`, `b4_c7_bound`, `b4_c7_ranal`, `b4_c7_warned`, `b4_c7_morning`, `b4_chains`.

**Trick:** The Dead Ride `b4_c7_deadride` (✦ wits 16 at the shore, only after the face; namer +3; spirit): once a fight a rider of dust hits an enemy within 4 for 2d6 + (2 + level step). **Carried to Book Six.** **Items:** `b4_c7_coral` (+1 wits), `b4_c7_dogslayerblade` (1d10+2, +1 hit), `b4_c7_tear`.

**Fights:** `b4_c7_outriders` 170+85 (company), `b4_c7_breakout` 180+90 (mortal), `b4_c7_spur` 170+85 (Dust 1). Level 15 (14 with the band let go).

## The finale (`B4CH7.finale`, `B4FIN7` in 77)

Labels: "The Third", "The fallen", "Gone back to their people", "The roll", no prologue, no proclamation, **"The End of *Unblooded*"**, the credit to Steven Erikson and Ian C. Esslemont. The road page (three paragraphs by key) ends with the **Nerve count** (`B4FIN7.nerve()`: n of 10 and what the Second Company is now; regulars who ran). A fate page per squadmate by road and regard (Haddat sells water on `ledger`; Marrow opens a healer's door in the first town south; Tebbet goes home to Dal Hon and two goats; Hessa enters a small temple of D'rek; Darrut stops at his sister's; Tallow finds the coast). **"Fallen"** for anyone the mortal fight took (their kit's fate). **"With his people"** for a recruit not walking at the end. **"Among the riders"**: one page for the Barrow dead under the face (others named on it). The sergeant: road, face, the end of the line or the band let go, the trick, the bone (and token). Coda: the Whirlwind over, Gamet dead, Keneb Fist, Dom bound, Leoman away, the pursuit ordered; the bones and the standard with no name yet; the new sea. Tease: "Next, far across the sea: another people's war, and their unblooded."

## Nerve and Dust as the chapters use them

- **Nerve** (`S.nerve` 0–10, start 5). Every chapter lowers it for its omen (the boy with the bone; the news; the bones in the ford; the raid, the gorge, a Fist down; the Wall; the trenches within sight; the sounds in the oasis, Gamet's death) and raises it for the squad being seen to be steady (recruits told to sleep/eat/walk; the key; clean company fights +1 from the engine; the Khundryl; the Wall going back; the trenches silent). Every chapter shows `nerveHTML` through Radde or the recruits. The company regulars (`def.company`) appear in at least one fight a chapter. Finale reads the end value.
- **Dust** (`S.dust`): 0 in Ch1–4 (Ch4's picket is `dust:1` written as fog), 1 in Ch5 (the Wall picket fight at 2), 2 in Ch6, 3 in Ch7 until the duel, then 1. The text writes grit in the bread, the eye shortened, the warren "with sand in it", sputters; the veil, sea-glass and Sea-Bed Road answer it.

## The Deck in Book Four

Readers (`visReader()`): **Marrow** (ivory temple deck from Nap, "child") → **Tallow** (his grandmother's deck in oilcloth; "she read for fishermen; they mostly came back") → **the old soldier of the 9th** (rum cup). Reading places: the barracks yard (1), a fire below the Fall (2), the Khundryl feast (3), the wounded Seti's fire (4), a fire short of the Wall (5), the picket before Pan'arak (6), the coral island (7). `B4DECK[n]` from each chapter file; `b4DeckChoice(n)` on the first halt (Ch7: on the island) and at the fire. Lean cards: soldier, King, **Knight of Chains**, Queen, Assassin (the Rope, after Bottle's doll), **Leper**, Herald. Any Chains card drawn sets `b4_chains`; both are faceless and "not in her deck". Ch7 rewrites the Herald's words for the island only. Flags `b4_c<n>_drawn`, `_reader`, `_noCard`.

## The visions (`src/78_b4_visions.js`)

One per chapter, `book:'hoc'`, any card but the blank: `b4v1` Trull Sengar and Onrack on the Nascent's wall ("I was once among enemies"; why Shorned never said); `b4v2` Lostara Yil in the Imperial Warren (the crucified dragon, otataral kills Pearl's warren, Olar Shayn's head); `b4v3` Karsa on the Jhag Odhan, the stallion Havok (dun, white mane); `b4v4` Leoman outside the Malazan camp, the oil raid "as he meant" (Corabb unnamed); `b4v5` Heboric's jade giants dream, Treach's stripes (the fallen god unnamed); `b4v6` Sha'ik in her tent puts on her predecessor's armour; "her sister" once, as a face in a doorway — never Felisin, never tied to the army; `b4v7` Gamet among the dead, the Burned Tears' blue-eyed woman, Grub's "Up the main ramp, Fist", butterflies, a sound a league off. Words-only flags `b4vN_*`. Ends on the reader (`b4vEnd`).

## The recruits (one walks at a time; the others wait near; swapped at any fire)

- **Ramin** (`redblade`, transfer with `S.imported.ramin`): joined on Ch1's drink sweep or near. Red Blade of Ehrlitan, lent again; a horse now, left with the company; red scale (brown in the dust). His father a Red Blade. Half his company died at the Sekala on the Chain (Book Two's canon sheet); the rest came down the Aren Way into the city and the cells; every chapter says so. On `ledger` he leaves the scale on the coral; otherwise "lent and kept".
- **Keth** (`warlock`, transfer with `S.imported.keth`): joined on Ch1's quay or near, from Temul's youths. The grandmother's voice ("*Children*"). Swap line "*Temul says go*" at Ch1 and Ch7, varied between.
- **Orvas** (every game, Ch3 at the feast): 23, Gall's Burned Tears; held the horses when the clan rode away from Coltaine; tears new in Ch3; never explains them ("They are the reason"); `b4_orvasDone` 1/2/0; regard from the ford (`S.loy.orvas ≥ 2`) read in Ch4; finder of the seep (Ch5); leads the `horse` road and gives the bead.
- Fallen recruits get their own Fallen page; a recruit not walking at the end gets "With his people".

## The four new soldiers (fill order `tallow, hessa, tebbet, darrut`)

- **Tallow** (he, 18, Quon coast fishing village): reads his grandmother's deck; talks too much; writes home and never sends; one of the recruits at heart ("you were sick from Unta to Aren, I held your head").
- **Hessa** (she, 31, Kartool City): stood the Grand Temple's east door six years; "eventually"; why she left is kept for "after" (open).
- **Tebbet** (he, 26, Dal Hon): bowman; "I'd rather be a long way off" (his epithet; said at Ch4's key, his eve, the coral fire and the finale, not every scene); dreams that come true (sand, the ramps).
- **Darrut** (he, 34, Aren's Old Quarter): Aren Guard, followed Blistig; the camel in the governor's garden; "I was on the wall. That is all I will say about the wall" — says it once in Ch7 and stops; a sister in the Old Quarter.

## Book Two carried in

`S.imported.f` and `b4Was(k)`: `b2_c7_key` (guard/wickans; desert refused), `b2_vatharLost` (Ch3 count), `b2_stay`/`b2_barrowHeld` (Ch2 Barrow line), `b2_hackleBack` (Hackle at the sergeant's knee if Sathi fell), `b2_ilhar` (Haddat's brother: `came` sells water in Aren; `fell` dead; `lost` lost on the Chain; `parted` went back north to Dom alive with the family's skins; on `lost`/`parted` possibly in the trenches, never met or seen, never learned; unset on a fresh start: "she has not said her brother's name since Hissar"). All four are read in the bio (70), Ch5's seep, Ch6's lookout, eve and trench, and Ch7), `b2_nobles7` (Ch1 copies it in), keepsakes (Ch1 token, Ch2 left on the hill). Book Two's dead stay in `S.dead` with `from:'dg'`; fresh start has Sathi dead at the Barrow.

## Left open on purpose (for Book Six and after)

Who lies under *Seventh · the last mile*; the old woman of the Crow; the raiders' and river band's people; what the marines baited; the Seti archer's and cutter's names; who the officer at the Wall was (to the squad); the standing stones; whether the riders at the seep were the Wall's; Haddat's brother on `lost`/`parted`; why Hessa left the temple; what the dark over the oasis was; whether the freckled girl saw her brother; the sixteen strangers; what the black bead means; the bones and the standard have no name yet; what the Dead Ride is (a debt the dead pay back).
