# Book Six: *Bones in the Walls*, the book brief (Chapters 1–7)

Wed Nov 4, 2026, 9:05 PM PST. Against the Book Six engine on branch `book6` (v9.0.0, not shipped). This is the standing work order for every chapter of Book Six, beside *The Bonehunters*.

- **Plan:** `ashes-of-the-pale/book6-bh-plan.md`, David's decisions of Nov 4.
- **Canon:** `docs/bh-canon.md`.
- **Engine:** `docs/v9.0-notes.md`.

**How the chapters are built.** Seven writer-and-artist pairs, one per chapter, possibly at the same time. No writer reads another's chapter. This brief fixes every key, flag, item id, trick, fight id, recruit join point, reading place and fire in advance, so honour it exactly.
- Read earlier chapters' flags **always with a sensible default when one is unset**.
- Invent nothing a later chapter would need. If you must, put it in your notes.
- If the engine can't do something here, follow the engine, say so in your notes, and tell the lead.

## What is the same as Book Five's brief

Read `docs/mt-book-brief.md` §"Shared rules (writers)" and §"Shared rules (artists)" first. Everything there holds, with Book Five's names swapped for Book Six's:
- `b5_` becomes `b6_`, `src/8K` becomes `src/10K`, `B5CHK` becomes `B6CHK`, and helpers `b5<K>` become `b6<K>`.
- `mt-chK-notes.md` becomes `bh-chK-notes.md`, and the book-specific engine names become those below.

These parts carry over word for word:
- the owner's standing wishes;
- the fire;
- "every onward step declinable";
- "yes, but" on every check, fitted to the scene;
- the recruit rule;
- engine changes stay in your own file;
- continuity notes, tests, commit and report.

Book Five's **Debt** and **the tiles** don't apply. Book Six has **Fever** and **the Deck** instead.

## What is different (writers)

**Two squads.** Each chapter belongs to one squad (`B6_CH`), and the engine swaps the squads in `startChapter`. Write only your squad.
- **Chapters 1, 3, 5, 7: the Third**, Book Two's squad, in Blistig's 9th Legion of the Fourteenth.
  - The sergeant is Book Four's (its own history in `TPL.sgt`).
  - The core are `haddat`, `sathi`, `tangle` and `marrow`. Sathi is dead on a fresh start (Book Two's Barrow), so always guard.
  - Book Four's recruits and Fourteenth spares may walk: `redblade`, `warlock`, the Khundryl, and `tallow`, `hessa`, `tebbet`, `darrut`, `mirrel`, `yorin`, `rasp`. The fresh start brings **Mirrel**.
  - Book Six's own recruits for this squad are `mehet` (Ch1) and `ottar` (Ch7).
- **Chapters 2, 4, 6: the Fourth**, Books One and Three's squad, in the Seventh Company of Onearm's Host.
  - The sergeant is Book Three's.
  - The core are `brisk`, `kettle`, `tuft` and `ohl`.
  - Sohra, the Grey Sword, Ellis and Vell may walk on a transfer.
  - Book Six's own recruits for this squad are `brannoc` (Ch2) and `ressa` (Ch4).
- **The other squad** is elsewhere, and canon never puts the two together. One line of news from it per chapter is welcome, as camp talk ("the Host is camped before G'danisban in the rain, they say").
  - `b6OtherName()` gives the other sergeant's name. Use it once at most, in a letter or a rumour, never in person.
- **Text must read right with any squad**, as always. Guard every squadmate with `b6In(id)` (also true of transfers who arrived with others).

**Your files.**
- `src/10K_b6_chK.js` exports `B6CHK`: Ch1 is `101_b6_ch1.js`/`B6CH1` … Ch7 is `107_b6_ch7.js`/`B6CH7`. `src/990` already registers it.
- Your art goes in `src/10Kb_b6_chK_art.js`.
- Ids carry `b6_c<K>_`; helpers carry `b6<K>`.
- Never edit `src/100*`, another chapter's files, or Books One to Five's files.

**Size and levels.**
- Book Four's chapter size: 60–80 nodes, three or four areas (16×12), three or four fights, each main fight with a `stage2`.
- **Levels run 12 to 18.**
  - The Third (four chapters) starts Ch1 at 12 and finishes Ch7 at 18: about 500 xp a chapter at the engine's pay, roughly 13 after Ch1, 15 after Ch3, 16–17 after Ch5.
  - The Fourth (three chapters) starts Ch2 at 12 and finishes Ch6 at about 16.
  - `play.mjs --book=bh --from=K` uses those levels.
- Foes: start from the engine's `b6_` foes (sized for 12–18). Add your own with a `kind:` that has a sprite. Balance is a later step that goes to David: write the numbers in your notes, change no rule.

**The key choice** is `S.f.b6_cK_key`, with the values in `B6KEYS[K]` (don't change them). Pass it to `chapterEnd(K, key)`. Later chapters read it directly. **The other squad's keys are readable too** (both live in `S.f`), but use them only as rumour.

**Fever** (the book's system; `docs/v9.0-notes.md` §Fever):
- **Catching it:** `b6Catch(id, why)` where your section says (a well, a corpse, a village). Mark the fights that spread it with `feverRisk:'<why>'` on the fight def; the engine gives it to one walking soldier.
- **Treating it:** `b6Cure(id, how)`, always from a scene (the healer's tent, a surgeon, a Denul hand, and from Chapter 4's end a carrier's touch). Show `feverHTML()` in the node `html` where the squad takes stock. `b6CanCure()` says whether anyone here can.
- **Never lurid:** fever is sweat, shaking, and a soldier who can't keep water down, said in the soldiers' own short words. No plague-children, no buboes described, and the carriers are headline only.
- **"Yes, but" costs:** a fever risk can be one ("Yes, but you drank from that well"). No more than one in a chapter.
- **Ressa never catches it.**

**The Deck** (`100c`):
- Fill `B6DECK[K]` from your file: `{scene, where, set, back, backT, say:{<reader ids>}}`.
- Put `b6DeckChoice(K)` among the first halt's choices.
- Register `b6_cK_deck: () => b6DeckOffer(K)` and `b6_cK_card: () => b6DeckCard(K)`.
- **Readers.** For the Third: Marrow, else Tallow, else the old soldier of the 9th (`oldninth`). For the Fourth: Tuft, else Sohra, else old Benna. Write a line for each reader who can be there.
- The table is `READTABLE['bh:K']` (drawn), and the pool is `B6POOL[K]`. The vision is the visions pass's; a reading only opens it.

**A trick** every chapter, behind an optional ✦ hard check (DC 16–18 at these levels). Each copies an existing trick's mechanics, named in your section, in this book's words: `Object.assign(TRICKS, {b6_cK_…})` plus `AB.t_b6_cK_…`.

**Kit.** Two to four items with the ids given, each with `slot`, `role` and `line`, and art by your artist. At levels 12–18 an item should matter: at least one has a real number.

**The fire.** Your fire id is in your section. Add it to the roster from your file: `ROSTER_FIRES.bh = ROSTER_FIRES.bh || {}; ROSTER_FIRES.bh[K] = ['b6_cK_fire']`. The games pass wraps it. It offers the roster, a rest (`rest()`), the squad's talk, a fever check (`feverHTML()` and a cure if `b6CanCure()`), and the way on with "Not now".

**Recurring inventions** (shared; use them, don't contradict them):
- **The Third's officer** is the 9th Legion's company captain, unnamed ("the captain"), as in Book Four. It is not Keneb, whose 9th Company is in the 8th Legion (Q19). Blistig is seen at a distance only.
- **The Fourth's officer** is the Seventh Company's captain, unnamed, as in Book Three. Captain Sweetcreek's Falari are next in the lines.
- **The finger bone.** The Bonehunters' mark comes from the soldiers themselves, after Y'Ghatan (Koryk's bones from the paupers' pits, W10). The Third may take it up in Chapter 5; the Fourth never wears it. The narrator never explains the name beyond what soldiers say.
- **Mehet's keys** (gear): keys to doors that are no longer there. **Brannoc's whistle.** **Ressa's blue fingers.**
- **No new named people** beyond the four recruits. Every other invention is unnamed by role. A writer who truly needs a name runs the series check first and records the row.

**Tests** (all must pass):
- `python3 build.py`; `node --check` on your files; `node tools/lint.mjs` with 0 errors;
- `node tools/play.mjs 3 --book=bh --from=K` 3/3, and `node tools/play.mjs 1` (Book One) 1/1;
- `repeat_scan`, `trope_test`, `recruit_test`, `b6engine_test`, `roster_test`, `reading_test`;
- a chapter test `tools/b6chK_test.mjs`: halts, both keys (three in Ch 7), every fight's start and win, the trick, the fire, the reading, the recruit's join, and Fever caught and cured where your section says.

**Commit to `book6`**, never `main`. Don't touch `sw.js` or `src/010_preamble.js`.

## What is different (artists)

**Book Six's look.**
- **The Odhan and Y'Ghatan** (the Third): bone-coloured walls, scrub, and smoke-red dusk; the fire in Chapter 3 in orange and black. The Fourteenth wears grey-green cloaks over mail, and the marines lighter kit.
- **The north coast and G'danisban** (the Fourth): rain, grey sea, mud, canvas, and the city's walls grey. The Host wears Book Three's blue-grey.
- **The sea and Malaz City:** grey water, Mock's Hold on its rock, crowded jetties, the city's roofs.

**Replace your placeholder backdrop.** Each `b6_` scene in `B6_SCENE_LIKE` (`100`) borrows an earlier drawing until a chapter replaces it: `SCENEX.b6_… = …` in your art file. Your section says which are yours.

**Already drawn:** both squads, Book Four's spares and recruits, Book Three's recruits, and the foes' borrowed kinds. **New figures for this book:**
- Ch1's artist draws `mehet` and the foe kinds `b6_rebel` / `b6_fanatic` (replacing the borrowed `b4_c7_fleer`).
- Ch2's draws `brannoc` and `b6_cultist`.
- Ch4's draws `ressa`.
- Ch7's draws `ottar`, `b6_rioter` and `b6_cityguard`.

Register a simple placeholder for each name early, as Book Five's artists did.

**Limits and tone.** The fire and the plague are drawn at a distance: walls burning, smoke, the camp in rain. No burning figures, and no sick in close-up. Mock's Hold only as a silhouette on its rock.

## The keys, and who reads them

| Ch | Squad | Key | Values | Read by |
|---|---|---|---|---|
| 1 | Third | `b6_c1_key` (the barrows) | `bury` / `leave` | Ch3 (the barrow field after the fire), Ch7 fate pages |
| 2 | Fourth | `b6_c2_key` (the village) | `burn` / `pass` | Ch4 (fever count, a line), Ch6 |
| 3 | Third | `b6_c3_key` (the fire) | `in` (mortal) / `line` | Ch5 (who walks in out of the desert), Ch7, finale |
| 4 | Fourth | `b6_c4_key` (the vote) | `vote` / `out` | Ch6 (the High Fist's eye), finale |
| 5 | Third | `b6_c5_key` (the loading) | `wait` / `sail` | Ch7 (the ambush, a line) |
| 6 | Fourth | `b6_c6_key` (the city) | `letgo` / `report` | finale (Hanar Ara road) |
| 7 | Third | `b6_c7_key` (the roads) | `adjunct` / `jetty` / `wickans` | finale; Book Seven imports `adjunct` |

The finale also gives the Fourth's road: `S.f.b6_fourthRoad` is `highfist` / `hanarara` / `home`, chosen at Chapter 6's end. Ch7's finale reads it.

## Chapter 1: "The Lato Odhan" (`101`, the Third, key `bury` | `leave`)

- **Spine** (bh-canon §2; novel ch 3–6): the pursuit across the Lato Odhan; Leoman takes Y'Ghatan, kills the Falah'd and sends the citizens to Lothal; the Fourteenth comes up and digs in; reinforcements arrive under Captain Faradan Sort; the Fists argue.
- **The squad's story:**
  - The march, at the 9th's pace.
  - A well on the Odhan where bandits came first: the fight `b6_c1_well`, which spreads fever ("the well water").
  - The rebel rearguard on the road: `b6_c1_rearguard`, main, with `stage2`.
  - The camp before the city, the reinforcements walking in (heard and seen, never spoken with), and Mehet found outside the walls, who stayed.
  - The barrows of the Malazan dead, desecrated by the rebels (W6).
- **Key `b6_c1_key`**, decided at the barrows the night before the siege:
  - `bury`: put the dead back. A night's work under the walls, and a fight with a rebel patrol (`b6_c1_patrol`, not mortal).
  - `leave`: the squad rests, and the barrows stay open.
  - The key is read at Ch3's barrow field.
- **Recruit:** `b6Join('mehet')` at the barrows or the camp's edge.
- **Trick:** *The Potter's Map* (`b6_c1_map`), Mehet's knowledge of the old wells and drains. Copies **The Line** (`line`).
- **Items:** `b6_c1_odhanveil` (light, +1 ac against shots), `b6_c1_wellrope`, `b6_c1_rebeltulwar` (heavyweapon).
- **Deck:** the lean card is the Soldier (`B6POOL[1]`), at a fire on the Lato Odhan (`READTABLE['bh:1']`). `B6DECK[1]` is already filled in `100c` as the worked example; keep its back node `b6_c1_fire`.
- **Fire:** `b6_c1_fire`.
- **Hard limits:** the Imperial Warren; Gesler's squad; the Adjunct's tent.
- **Art:** `b6_odhan_night`, `b6_ghatan_walls`.

## Chapter 2: "The North Coast" (`102`, the Fourth, key `burn` | `pass`)

- **Spine** (bh-canon §3; novel ch 1, 6, 8): Onearm's Host on the north coast at Ehrlitan ("Dujek's army?", p. 36); the D'rek priests found slaughtered; the plague in the villages; the Host marches inland.
- **The squad's story:**
  - The Host's camp above the sea.
  - Brannoc loaned to the Seventh to make up numbers.
  - Word that the High Fist's spirit is broken, as the ranks feel it.
  - A march inland through empty villages.
  - A village where the dead were left: `b6_c2_village`, main, `stage2`, which spreads fever.
  - Bandits on the plague road: `b6_c2_road`.
- **Key `b6_c2_key`**, on orders to fire a plague village:
  - `burn`: the village burns; nobody in the squad catches fever there.
  - `pass`: the squad goes round, someone `b6Catch`es it, and a family that hid is left its roofs.
- **Recruit:** `b6Join('brannoc')` in camp, early.
- **Trick:** *Falari Weather-Sense* (`b6_c2_weather`), copies **Rhivi Spirit-Song** (`song`).
- **Items:** `b6_c2_falariaxe` (heavyweapon), `b6_c2_oilskin` (light), `b6_c2_drekcharm` (trinket, +1 against fever: Claude's call, a small effect only).
- **Deck:** the Leper (`B6POOL[2]`), on a wet camp on the coast (`bh:2`).
- **Fire:** `b6_c2_fire`.
- **Hard limits:** Apsalar; Paran at Kansu; Ehrlitan's tavern.
- **Art:** `b6_coast`, `b6_plague_village`.

## Chapter 3: "Y'Ghatan" (`103`, the Third, key `in` | `line`)

- **Spine** (bh-canon §2; novel ch 7): the assault at dusk. The wall goes down; the marines lead; Keneb and Baralta follow; **Blistig holds the reserves** (the 9th). The oil trap is sprung with nearly 3,000 inside. **791 come out** by Sinn's tunnel through the fire (pp. 261–262). The army marches for Sotka the next night.
- **The squad's story:**
  - The 9th on the reserve line at dusk.
  - The wall going down.
  - The streets lighting from inside.
  - The order to hold Sinn's path open.
  - The barrow afterwards, read with Ch1's key: `bury` means the old dead were put back before the new ones joined them.
- **Key `b6_c3_key`:**
  - `in`: into the burning streets to keep the path open. **The mortal fight** `b6_c3_streets` (`mortal:true`), with rebels and fanatics, the fire spreading tile by tile (`preFx` burning tiles).
  - `line`: hold the gate and pull the burned out. `b6_c3_gate` against rebels coming out the side of the walls, hard but not mortal.
- **Never:** the palace gate, Truth, the temple with Corabb, or the tunnels under the city (bh-canon §6).
- **Trick:** *Sinn's Way* is not a trick (it is canon and Sinn's). The trick is *The Sapper's Breath* (`b6_c3_breath`): wet cloth and the low air. Copies **The Rope** (`rope`).
- **Items:** `b6_c3_scorchedmail` (mail), `b6_c3_fanaticknife` (blade).
- **Deck:** the Herald (`B6POOL[3]`), the barrow field the night after (`bh:3`).
- **Fire:** `b6_c3_fire`, the barrow-side fire after.
- **Fate:** the dead from the mortal fight are remembered at the barrow.
- **Art:** `b6_ghatan_fire`, `b6_barrows`.

## Chapter 4: "G'danisban" (`104`, the Fourth, key `vote` | `out`)

- **Spine** (bh-canon §3; novel ch 13–16): the Host's camp before G'danisban in the rain; "Captain Kindly" takes command; Dujek dying; Poliel's temple; the Hounds in camp and city; Soliel heals through the carriers; Dujek dies; the army votes Paran High Fist; Dujek's tomb.
- **The squad's story:**
  - Rain.
  - The squad's own sick, and the surgeons' tents. Ressa walks in out of the city.
  - A night when something runs through the camp: the squad sees shapes and hears them, and **does not fight the Hounds**.
  - Cultists in the camp's edge (`b6_c4_cult`, main, `stage2`, feverRisk).
  - The streets outside the walls (`b6_c4_streets`).
  - The morning the fever breaks for many. Set `S.f.b6_soliel = 1`, and `b6Cure` every fevered squadmate ("the carriers").
- **Key `b6_c4_key`:**
  - `vote`: the squad stands for the High Fist the army chooses, from the back of the ranks.
  - `out`: the squad stays out of it, on picket. Paran's name is "Captain Kindly" to them, and later "the High Fist".
- **Recruit:** `b6Join('ressa')`.
- **Trick:** *The Surgeons' Vinegar* (`b6_c4_vinegar`), copies **A Courtesy of Darkness** (`dark`) mechanically (the smoke of burning bedding).
- **Items:** `b6_c4_raincloak` (light), `b6_c4_dyerknives` (blade).
- **Deck:** the Consort (`B6POOL[4]`), in a tent in the rain (`bh:4`).
- **Fire:** `b6_c4_fire`.
- **Hard limits:** the field hospital's command cots, Poliel's and Soliel's temples, the command tent, Dujek's tomb (seen from outside at most).
- **Art:** `b6_gdanisban_rain`.

## Chapter 5: "The Kokakal Shore" (`105`, the Third, key `wait` | `sail`)

- **Spine** (bh-canon §2; novel ch 13, 16, 18): the march to the coast; Nok's fleet loads; Grub's warning delays the sailing a day; the Y'Ghatan survivors walk in; the Wickans are ashamed to go home; the Silanda is towed in for Gesler.
- **The squad's story:**
  - The Sotka road with the plague behind.
  - Deserters on the road: `b6_c5_deserters`, main.
  - The shore camp and the loading.
  - The survivors coming in out of the desert, seen from the line. If Ch3 was `in`, one of the squad's dead is not among them (said once, quietly).
  - Temul's Wickans.
  - The finger bone, taken up by soldiers who walked out of Y'Ghatan, and offered to the squad. Set `S.f.b6_bone = 1` if they take it.
  - A fight at the boats: `b6_c5_boats`, looters.
- **Key `b6_c5_key`**, on the night of Grub's warning:
  - `wait`: the squad holds its transport a day, as Keneb did.
  - `sail`: the squad is aboard on the first day, and is read in Ch7 as one more line about the ambush.
- **Trick:** *Wickan Horse-Talk* (`b6_c5_horsetalk`), copies **Claw Hand-Cant** (`cant`).
- **Items:** `b6_c5_fingerbone` (trinket, `S.f.b6_bone`), `b6_c5_nokrope`.
- **Deck:** the Queen (`B6POOL[5]`), on the shore by the transports (`bh:5`).
- **Fire:** `b6_c5_fire`.
- **Hard limits:** the Silanda; the Adjunct's presentation of the sigil to Sort and Sinn.
- **Art:** `b6_kokakal`.

## Chapter 6: "The Falling Sky" (`106`, the Fourth, key `letgo` | `report`)

- **Spine** (bh-canon §3; novel ch 20–21): the Host marches north-east of G'danisban; twelve lights fall below the moon; Paran opens a gate to Mael through Hood; Mathok's rebels surrender at Hanar Ara and are let go.
- **The squad's story:**
  - The march.
  - The night the sky falls: the column halts and the squad watches. **Never Paran's gate.**
  - A fight on the night road with something knocked loose by it: `b6_c6_night`, main, `stage2`. These are bandits or the Chosen's followers, never a god.
  - Hanar Ara: Mathok's surrender seen from the line, and the city's cult at its edge (`b6_c6_cult`, feverRisk).
- **Key `b6_c6_key`:**
  - `letgo`: the surrender stands as the High Fist gave it.
  - `report`: the squad names the cult to its captain, and nothing comes of it in this book.
- **The Fourth's road**, at the chapter's end: `S.f.b6_fourthRoad` is `highfist`, `hanarara` or `home`.
- **Trick:** *The Fold Remembered* (`b6_c6_fold`), Tattersail's old trick as Tuft carries it. Copies **Tattersail's Fold** (`fold`). Without Tuft, Ohl knows a version.
- **Items:** `b6_c6_starstone` (trinket), `b6_c6_hanararobe`.
- **Deck:** the Gate (`B6POOL[6]`), with the column halted under the sky (`bh:6`).
- **Fire:** `b6_c6_fire`.
- **Hard limits:** Felisin Younger; Kulat; the city's centre.
- **Art:** `b6_sky`, `b6_hanar_ara`.
- **This is the Fourth's last chapter:** its fate pages are written here as `B6CH6.fates`, which Ch7's finale reads.

## Chapter 7: "Malaz City" (`107`, the Third, keys `adjunct` | `jetty` | `wickans`)

- **Spine** (bh-canon §2; novel ch 18–23): the Edur ambush and Quick Ben's illusion; Sepik deserted; the Perish join; Togg and Fanderay's realm; the Jakatakan fleet; Malaz City, its pogrom, Mock's Hold, the jetty, the flight; Fist Aragan (p. 665).
- **The squad's story:**
  - On a transport in the ambush (a line from Ch5's key).
  - Ottar sent across when the Perish come alongside.
  - The passage through the cold realm.
  - Malaz City's waterfront: a neighbouring jetty to the marines', with Keneb's words reaching the squad as shouts.
  - The mob: `b6_c7_jetty`, main, `stage2`.
  - The City Guard: `b6_c7_guard`.
  - The Wickans in the streets.
- **Key `b6_c7_key`** (the road out):
  - `adjunct`: out of the harbour with the fleet. Leads to Book Seven.
  - `jetty`: left on the jetty, in Malaz City.
  - `wickans`: into the streets after the Wickans (`b6_c7_streets`), and gone with them.
- **Recruit:** `b6Join('ottar')` at sea.
- **Trick:** *The Grey Helms' Wall* (`b6_c7_wall`), copies **Blue Fire** (`bluefire`) mechanically (a shield wall in place of fire).
- **Items:** `b6_c7_greyhelmshield` (shield), `b6_c7_malazcloak`.
- **Deck:** the Knight of Chains (`B6POOL[7]`), on a transport's deck (`bh:7`).
- **Fire:** `b6_c7_fire`.
- **The finale:** a fate page per squadmate of **both** squads (the Fourth's from `B6CH6.fates`), each squad's road, and *Where the books meet*.
- **Hard limits:** Mock's Hold, the Centre District, Admiral Bridge, Raven Hill, the Mouse, the Hanged Man, Smiley's, Fiddler's tenement, the Deadhouse, the First Throne.
- **Art:** `b6_sea`, `b6_malaz`.
