Mon Nov 9, 2026, 7:40 AM PST. Book Eight continuity, against branch `book8` (v11.0.0, not shipped), with the continuity read's fixes in.

# Book Eight: *Time Served* (beside *Toll the Hounds*): continuity

What each chapter set up, for the finale and for later books. Later books read this doc, not the source. Written by a fresh reader from `src/140`–`149` against `docs/tth-book-brief.md`, `docs/book8-tth-plan.md`, `docs/tth-canon.md` (§4, §5), `docs/series-canon.md` §(a) rules 1–83, `docs/v11.0-notes.md` and the chapter notes. Where a chapter note and the code disagree, the code is what is described here. The read's fixes and the items left for the lead are at the end.

**One squad.** The Fourth (`S.book === 'tth'`): the sergeant (Treach's; Book One's look; "Time served") and Brisk, Kettle, Tuft, Ohl at 16, cap 21, or a transfer's Fourth (Book Three `daru`/`standdown` lifted to 16; Book Six `highfist`/`hanarara`/`home` at 16–18), with Sohra, Dannet (`greysword`), Ellis, Vell, Brannoc, Ressa possible. Every squadmate line is behind `b8In(id)`. Pronouns: Brisk, Kettle, Tuft, Sohra, Dannet, Ellis, Ressa, Orsa, Thessaly, Mossa, Benna "she"; Ohl, Vell, Brannoc, Vasso, Edrem, Benlo, Calder, Hurrin "he" (checked in every file).

**Shared helpers.** Engine (140): `b8On, b8In, b8Key, B8KEYS, B8KEY0, b8Join, b8CanRecruit, b8Con, b8Contract, b8ConTier, b8Roofs, b8WayOut, contractHTML, b8Story, b8ArriveWords`. 140c: `B8READ, B8POOL, b8ReadChoice/Offer/Card`; the reader chain Tuft, else Sohra (bones), else old Benna (a Daru washerwoman two doors down, with the caravan Ch 2–5 for the pay). Each chapter has its own `b8K…` helpers and reads earlier keys as `b8Key(n) || B8KEY0[n]`.

**Levels.** Fresh 16 → 17 after Ch 1 → 17/18 through Ch 2–4 → 19 by Ch 6–7 (the harness's 16, 16, 17, 17, 18, 19, 19). Balance is the lead's step with David (`B8SOLDIER`, `B8GAP` empty); every fight measured by the writers (Ch 1, Ch 2) is 100% at both tiers.

## The recurring cast (inventions, all chapters)

- **The Fourth's door**: a narrow house up the street from the Phoenix, at the Gadrobi end (Book One puts the Phoenix at the top of the alley, first door in Daru). Never named; the Phoenix never entered. On a Book Three save Brisk glares at it ("the Phoenix had other ideas"). The street the Fourth live on is always "the Fourth's street" (Ch 1, 6, 7); Tanner's Row is the row the first knives came over from (Ch 1 only).
- **The tavern with the painted sign** on the corner of the dyers' row (Rumjugs and Sweetlard; rule 16): Ch 1 (freshly painted every spring, the landlord "says the sign came with the lease"), Ch 6 (paper masks on both women, Kettle and Brisk's "follow the cake" echoed), Ch 7 (a white mask on its bracket). Nobody knows who they are, every time.
- **The retired Malazan** "from the Seven Cities lot": Ch 1 (Bredd, the historian, the charm), Ch 6 (asks after the charm; no second Bredd).
- **Minor names** (tth-canon §6 only): Orsa (Ch 1, 6, 7; the dice den; the Fourth owes her), Benlo (Ch 1, 5 at the gate with the news, 6 masks, 7, games), Calder (Ch 2–5; the merchant stays unnamed in the city), Thessaly (Ch 3, games, the `coral` page), Hurrin (Ch 4, games), Mossa (Ch 4). No other new names in the book.
- **Kelyk**: Ch 2 the merchant's last wagon (bought in the Domin, sold at the camp round the barrow, never west; the jug `b8_kelykjug`); Ch 3 the beggar, Calder's tarped wagon to the camp on `passed`, the sellers' tent; Ch 4 the camp's first turning, the store-yard, the Daru seal on `passed`; Ch 5 the peddler going west, stopped, talked round or let go (his cart smashed in the night; the kelyk never reaches the city). Never glamorised.

## Chapter 1: Before the Fete (`src/141_b8_ch1.js`)

The winter before the Fete; the first knife on a paper of its own; the tavern; Orsa's den; the key. Phases `b8_c1_ph` 1–5.

**Key `b8_c1_key`:** `hunt` (`b8Con(2)`; the go-between's house; Vasso on the step) or `quiet` (`b8Con(-1)`; the paper burned; chancers at the door). **Read:** Ch 6 (`hunt` −2 on Vasso's word), Ch 7 (the ledger's page, Vasso's fate line). Ch 2 reads it only through `b8_vassoDone`.

**Contract:** 3 → alley +1 (engine) → `hunt` 6 (7 with the Orsa check's "yes, but") / `quiet` 3.

**Flags read later:** `b8_vassoDone` 1/2/0 (unset on `quiet`), `b8_c1_vell` `cut`/`kept` (Ch 7 Vell's fate; Ch 6's mark scene reads only `b8In('vell')`), `b8_c1_denDone` (the games' cup). Callbacks: `b8_c1_sign`, `b8_c1_bredd` (Raraku, the Whirlwind and a shovel: bigger than Books Four, Six and Seven), `b8_c1_historian` (callback 6), `b8_c1_vell` (callback 4). Not read later: `closed`, `named`, `chancers*`, `cheap`, `bought`, `charm`.

**Recruit:** Vasso (`hunt`). **Trick:** The Roof-Line `b8_c1_roofline` (✦ wits 17; Rope's Way, free). **Items:** `b8_c1_guildknife`, `b8_c1_roofboots`, `b8_hoodcharm` (placed). **Fights:** `b8_c1_alley` 300+150 (guild), `b8_c1_den` 150 (opt), `b8_c1_hunt` 260+130 (`hunt`), `b8_c1_chancers` 200 (`quiet`). Paid ≈ 504–594 / 390–480. 16 → 17.

**Inventions:** the lamplighter's boy, the dyer, the go-between (never seen), Tanner's Row, the chalk sign on the door-post. **Left open:** who paid (rule 70); what the go-between knew.

## Chapter 2: The Black Coral Road (`src/142_b8_ch2.js`)

East over the old Domin at winter's end with Calder's caravan; Vasso on `quiet`; the town coming back; the scarecrow fields; the last wagon. Phases 1–6.

**Key `b8_c2_key`:** `fields` (the wagon's kelyk burned and a field's width of rows; up to −20 silver; `b8_c2_kelyk = 'burned'`) or `pass` (+20; `'passed'`). **Read:** Ch 3 (Calder cold or warm; the tarped wagon to the camp), Ch 4 (the extra wave and the seal on `passed`), Ch 5 (Calder; the seal on the peddler's jugs), Ch 7 (Kettle's fate). Every reader falls back to the key, then `pass`.

**Contract:** no move (brief). **Flags read later:** `b8_c2_kelyk`, `b8_vassoDone` (set here when Ch 1 left it unset: 1 walks, 2 rides with the wagons, 0 goes back west), `b8_c2_ph` (games). **Recruit:** Vasso (`quiet`). **Trick:** The Carter's Brake `b8_c2_brake` (✦ wits 17; the Line, free). **Items:** `b8_c2_caravanmail`, `b8_c2_drovergoad`, `b8_kelykjug` (placed). **Fights:** `b8_c2_raid` 150 (opt), `b8_c2_town` 300+150, `b8_c2_fields` 200+100 (`pollen`). Paid ≈ 450 / 540.

**Left open:** the merchant's name; "half at Black Coral" is words only (Ch 3's Calder "pays in full" with no silver moved).

## Chapter 3: Black Coral (`src/143_b8_ch3.js`)

The city under the Andii's night (Thessaly, the wreck in the bay, the tavern another night); the landward gate; Edrem on the pilgrims' road; the Great Barrow. Phases 1–4.

**Key `b8_c3_key`:** `kneel` (a gift laid, `b8_c3_gift`; peace, never a boon) or `stand` (`b8_c3_guards = 1`). **Read:** Ch 4 (`stand` +2 on the hold check; the guards hold the edge on `burn`; Mossa's words), Ch 7 (`coral` road: `kneel` the Redeemer's road, `stand` the Andii's pay; Edrem's vote).

**Contract:** −1 at the start (engine). **Flags read later:** `b8_edremDone` 1/2/0, `b8_c3_anvil` (callback 2: bearer id or `'sgt'`; Ch 7 reads `'greysword'`), `b8_c3_wreck` (callback 7: `'tuft'`/`'sgt'`; Ch 7 reads `'tuft'`), `b8_c3_thessaly` (games). Not read later: `b8_c3_sellersSent`, `b8_c3_wagon`, `b8_c3_ledger`, `b8_c3_tarp`.

**Recruit:** Edrem ("Seerdomin" once in the book, here). **Trick:** the Kurald Galain shroud `b8_shroud` (✦ wits 17; free ward). Tuft's cold that turns warm at the gate. **Items:** `b8_c3_coralknife`, `b8_c3_pilgrimtoken`, `b8_c3_lamp`. **Fights:** `b8_c3_road` 280+140, `b8_c3_ridge` 180 (opt), `b8_c3_sellers` 160 (opt). Paid ≈ 252–456.

**Left open:** the man in grey and the Andii at the board (never named); what the Redeemer does with the weight.

## Chapter 4: The Pilgrims' Camp (`src/144_b8_ch4.js`)

The camp's first turning; Mossa; Hurrin; the water-carriers' song; the rows, the rope and the children at a distance; the bad night. Phases 1–4.

**Key `b8_c4_key`:** `hold` (the far edge, survive 5; `b8_c4_held`) or `burn` (the store-yard; `b8_c4_burned`; `b8_c4_edgeCost` `held`/`tents`). **Read:** Ch 5 (`burn`: the peddler's is the last kelyk on the road), Ch 7 (Brisk's fate).

**Contract:** −1 at the start (engine). **Flags read later:** `b8_c4_hurrinMet`, `b8_c4_ph` (games); `b8_c4_jug` `poured`/`kept` removes the jug before Ch 5. Edrem waiting or unmet is offered again at the edge (with six walking he waits again, said in words).

**Trick:** The Water-Song `b8_c4_hymn` (✦ wits 17; Spirit-Song, a full turn, no ward). **Items:** `b8_c4_camphook`, `b8_c4_greyscale`, `b8_c4_ashrag`. **Fights:** `b8_c4_water` 180, `b8_c4_drunk` 200 (opt), `b8_c4_edge` 360+120 (`hold`; +1 wave on `passed`) or `b8_c4_stores` 260+130 (`burn`). Paid ≈ 342–516.

**Left open:** the children's rescue, Salind, Gradithan, the fire from the sky (later rumour, Ch 7's `coral` page).

## Chapter 5: The Road Back (`src/145_b8_ch5.js`)

The Lamatath during the Fete; the Hounds running toward the city one night; the peddler; the milestone; the gate at dusk on the last day; the four torches far off; the news from K'rul's. Phases 1–4.

**Key `b8_c5_key`:** `fast` (`b8Con(1)`; no road fight) or `wary` (the lie-up check, `contract:true`; `b8_c5_knives` guild, `b8Roofs(5)`; `b8_c5_scouted = 1`). **Read:** Ch 6 (`scouted` → surprise in the knives fight; unset follows the key), Ch 7 (Ellis's fate).

**Contract:** `fast` +1, or `wary` +1 (engine) and +1 on the lie-up's "yes, but". **Flags read later:** `b8_c5_scouted`, `b8_c5_mallet` (callback 3; Ch 7's toll and Ohl's fate; unset reads as "a healer the Fourth once knew"). Not read later: `peddler`, `teams`, `toll`, `torches`, `hounds`.

**Trick:** Grass-Running `b8_c5_grass` (✦ wits 17; passive Long Listen). **Items:** `b8_c5_peddlerpack`, `b8_c5_grasscloak`, `b8_c5_raidersword` (every road). **Fights:** `b8_c5_grass` 180 (opt), `b8_c5_peddler` 220+110, `b8_c5_knives` 260+130 (`wary`, guild).

**Inventions:** Calder's outrider (no name), the peddler, the burned wayhouse. Old Benna says goodbye at the gate.

## Chapter 6: The Night of the Hounds (`src/146_b8_ch6.js`; the book's one mortal fight)

The Fete's last night; Benlo remembers the last Fete (callback 1); the wall breaks in more places than one; the moon in pieces; the Gadrobi burns; the knives. Phases 1–4.

**Key `b8_c6_key`:** `wall` (an unnamed stretch with the watch) or `street` (the Fourth's street, survive 4, a Hound passes at round 2). **Read:** Ch 7 (who saw what, every fate page's last-night line, the fallen, the coda).

**The way out** (`b8WayOut()` at the roof-watch): `quiet` 0–1, `roofs` 2–4 (wits 18, `contract:true`), `word` 5–7 with Vasso walking (guile 16, his own roll, loyalty ≥ 1, −2 on Ch 1 `hunt`), none 8–10. **`b8_c6_knives`** is mortal, guild, one ground; `S.dead[id] = {ch:6, where:'The knives'}`, the sergeant scarred.

**Contract:** the knives +1 (engine); one "yes, but" +1 (the trick or the roofs check, once: `b8_c6_roofSaw`). **Flags read later:** `b8_c6_key`, `b8_c6_wayOut` `quiet`/`roofs`/`word`/`fought`, `b8_c6_knivesDown`, `b8_c6_fete`, `sgtScar`, `lastFallen`. Hood "didn't answer"; Brisk's god is "the dead"; the charm is cold.

**Trick:** The Knife-Sign `b8_c6_knifesign` (✦ wits 17; Claw Hand-Cant, free). **Items:** `b8_c6_guildbow` (pierce; every way out), `b8_c6_wallstone`. **Fights:** `b8_c6_masks` 180 (opt), `b8_c6_wall` 300+120 or `b8_c6_street` 300+100, `b8_c6_knives` 380 (mortal).

## Chapter 7: The Toll, and the end of Book Eight (`src/147_b8_ch7.js`)

The morning after on the shingle; the street; the dyers' row; the east road at the back of Brood's crowd (callbacks 5 and 8); evening, the bell for every soldier; the roads. Phases 1–3.

**Key `b8_c7_key`:** `daru`, `coral`, `east` (Book Nine's import: `b87Onward(s)`).

**Contract:** −2 at the start if `b8_c6_knivesDown`; `b8_c7_roofs` +1 (guild) or talked off −1 (guile 17, `contract:true`), its "yes, but" +1. `b8Roofs(7)`: one fewer than Ch 6's; nobody if the knives went down.

**Reads:** every key above, `b8_c2_kelyk`, `b8_c1_vell`, `b8_c3_anvil`, `b8_c3_wreck`, `b8_c5_mallet`, `b8_c6_wayOut`, `b8_c6_knivesDown`, `S.dead`, `b8_vassoDone` (2 or unset: Vasso on the step), `b8_edremDone` (2: on his road outside Black Coral). **Flags:** `b8_c7_tolled`/`toll`, `b8_c7_guardian`, `b8_c7_tufty`, `b8_c7_warm`, `b8_c7_roofs*`, `b8_c7_ph` (games).

**Trick:** The Toll Count `b8_c7_toll` (✦ wits 17; the Lady's Pull, with a guarded wrap). **Items:** `b8_c7_bell`, `b8_c7_mourningband`. **Fights:** `b8_c7_doorway` 150 (opt), `b8_c7_looters` 260+130, `b8_c7_roofs` 220 (opt, guild).

**The finale** (`B8CH7.finale`, `B87FIN`): the road page with the Contract; a fate page per squadmate (twelve written); the fallen (the mortal night's, this book's, before); those waiting; the sergeant; *Where the books meet*; the end page with the Fete echo and the credit to Steven Erikson and Ian C. Esslemont.

## The visions (148) and the games (149)

Visions `b8v1`–`b8v7` (Picker, Nimander at the fields, the Seerdomin at the barrow, Spinnock at the game, Spinnock at the crossroads, Karsa at the wall, Iskar Jarak); words-only flags, none read. Games: Orsa's Cup (Ch 1), the Last Peg (Ch 2), Lamp and Stone (Ch 3), Keep the Fire (Ch 4), Stones on the Water (Ch 7); none moves the Contract.

## The callbacks (each placed once)

1 the Fete (Ch 6, echoed in Ch 7's masks and coda); 2 the Shield Anvil's Weight (Ch 3); 3 Mallet (Ch 5); 4 Vell and the Guild (Ch 1, a line in Ch 6); 5 Tufty (Ch 7, Benna to Tuft, never in one scene); 6 the historian (Ch 1; Picker's vision mentions "the old historian" in her own thoughts); 7 the wreck in the bay (Ch 3); 8 the Guardian (Ch 7, Book One's "Anything else, Sergeant, ask it now", first echoed by Iskar Jarak in vision 7). Bredd once (Ch 1), with the Book Six (`b6_c5_bredd`) and Book Seven (`b7_c3_bredd`) backfills in place.

## The Contract across the book

| Path | after Ch 1 | Ch 3–4 | at Ch 6's roof-watch | way out |
|---|---|---|---|---|
| **Min** (`quiet`, `fast` or `wary`, no "yes, but") | 3 | 1 | **2** | `roofs` (two knives + one) |
| `hunt`, no "yes, but" | 6 | 4 | **5** | `word` with Vasso, else the fight (three knives + one) |
| **Max** (`hunt` + Orsa's "yes, but", `wary` + the lie-up's, Ch 6's trick "yes, but") | 7 | 5 | **8** | none: a knife and two veterans + one |

Tiers by Ch 6: `paper` on every `quiet` road, `price`/`watched` on `hunt`, `veteran` only by paying every "yes, but". **`quiet` (0–1) is never reachable** in play: the alley's +1 is unavoidable and Ch 5 always adds 1.

## Left open on purpose (for later books)

- Rules 70–83 all stand: who paid; K'rul's closed; Rake's death unseen; the swordsman; Hood falls; the Guardians nameless; the black sword gone at most; "a young lord in Black Coral"; the camp's fire from the sky as rumour; "a giant in the street"; the moon never why; Cutter, Challice, Gorlas as gossip; Kallor's road.
- The merchant's name; what the go-between knew; the man in grey at the board; the second half of Calder's pay.
- For later books (not written): Kettle's name and the Azath child; Hedge's return.

## The continuity read (Mon Nov 9, 2026)

**Clean checks (no finding):**
- Every promised key is read with a default: keys 1–6 by Ch 2–7 as listed; shared flags `b8_c2_kelyk` (Ch 3, 4, 5, 7), `b8_c5_scouted` (Ch 6), `b8_c6_wayOut` and `b8_c6_knivesDown` (Ch 7), the callbacks' flags (Ch 7). Every value compared exists where it is set (`'greysword'`, `'tuft'`, `'cut'`/`'kept'`, the four ways out).
- Recruits: Vasso joins or waits on both Ch 1 roads (Ch 1 `hunt`, Ch 2 `quiet`) and is found again in Ch 7; Edrem joins or waits in Ch 3, is offered again in Ch 4, and his waiting page is on his road. Six walking is said in words at every join.
- The calendar: Ch 1 winter, Ch 2 winter's end, Ch 3–4 "weeks", Ch 5 the Fete ("days ago"), Ch 6 the last night, Ch 7 the morning after. No count of weeks or months left (one fixed).
- Hard limits: no never-use name, no Burn's Sleep year, no §4 canon name in chapter play text outside the allowed places (Mallet and Bluepearl in Ch 5's news; Brood's cart in Ch 7; the visions' canon eyes). No Hound dies (`b8_hound`).
- `trope_scan`: B8 inside every budget (65k words; nobody 19, silence 14, theway 9).

**Fixed in the continuity read:**
1. **Whiskeyjack named (rule 7 as Book Eight continues it: "Whiskeyjack only as Iskar Jarak, in a vision").** Ch 5's Mallet memory now says "asking the commander for a week"; `b8ch5_test` checks for "the commander". The brief's callback text used the name; the rule wins. One word to put back if David prefers.
2. **The gate and the door (place).** Ch 5 said the Fourth's door was "across the city" from the east gate; Ch 6 puts the east wall right behind the Gadrobi District. Now "across the Gadrobi District".
3. **Vasso's bell (continuity).** Ch 1 has Vasso name the low bell as K'rul's; Ch 7 said nobody could say where it hangs. Ch 7 now: "I've never met anyone who has seen it rung."
4. **Two Contract costs in one chapter (brief: one "yes, but" point a chapter).** Ch 6's trick check and roofs check could each add +1. Both now share one guard, `b8_c6_roofSaw`.
5. **A count of months.** Sohra's `coral` fate "hates Black Coral's dark for a month" → "out loud for a good while".
6. **Doubled words.** Ch 6's sign: "For the Fete someone… for the Fete" now says it once.
7. **Fire lines copied between chapters (style).** Ch 6's late Vasso and Dannet lines and Ch 3's late Ellis line opened word for word as Ch 1's; reworded. Edrem's "to nobody in particular" (Ch 3 and Ch 4) now differs in Ch 4.
8. **The rest line (style).** "The Fourth sits an hour by… Wounds close, mostly." was in all seven chapters; Ch 2–7 now vary it.
9. **Rule 17 (the historian).** Picker's vision placed him "at the corner table": now just "the old historian".

**Repeated phrases left** (five or more across chapters): the map hint "Tap ground to move · tap a figure to talk" (UI); "up the street from the Phoenix" (13, the door's one address, by design); "a night that does not lift" (Black Coral's tag, Ch 2–3 and visions); "someone on a roof saw it" (the brief's own "yes, but" words, Ch 1, 5, 6, 7); "the tavern with the painted sign" (Ch 1, 6, the brief's name for it); "from the Seven Cities lot" (the brief's); "Ressa has her hands round a cup" (Ch 1–3, 6, her fire opener; only a transfer sees it); Edrem's "the mace across his knees" (Ch 3–7, his tic); Vasso "sits with his back to…" (Ch 1, 3, 4, 7, varied after). "With her back to the…" (11) is spread across many speakers and settings.

**For the lead and David (no fight, item, key value or engine file changed):**
1. **The `quiet` way out is unreachable.** The Contract can't go below 2 at Ch 6 (table above). If David wants the "nobody comes" night to be playable, one chapter needs its own −1 (the brief allows ±1 for a scene; Ch 2–4 used none), or Ch 5's `fast` could cost nothing.
2. **The Hound attacks** (Ch 6's note): `b8_hound` uses the ordinary AI at atk 14, mv 8, while its leaving line says it never looked at the squad. A "passes by" AI or a reworded line.
3. **Waiting recruits and the roster.** The bench lets a waiting Edrem (on the pilgrims' road) be called in at Darujhistan's fires in Ch 5–7, and a waiting Vasso (in the city) at Black Coral's. The roster has no place check; fresh with Vasso walking, Edrem always starts as "waiting" because six walk.
4. **Balance:** every measured fight is 100% at both tiers (`B8GAP`, `B8SOLDIER` empty).
5. **Calder's second half** at Black Coral is words only ("pays in full"); no silver moves.
6. **Engine wraps** to retire later: Ch 7's Pull-shaped `rollDice` wrap (as Book Seven's); `endBeat`'s guild +1 could count a retried first ground twice (Ch 1's note; Ch 5 guards by fight id).
