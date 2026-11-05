Wed Nov 4, 2026, against branch `book6` (v9.0.0, not shipped). Continuity notes for Book Six, Chapter 2, "The North Coast" (`src/102_b6_ch2.js`, `B6CH2`). The Fourth's first chapter of the book.

# Book Six, Chapter 2: The North Coast

## Shape

- **Squad:** the Fourth (`B6_CH[2] = 'h'`), Book Three's sergeant, Seventh Company, Onearm's Host. Starts at level 12.
- **Areas (4):** `b6_c2_camp` (the Host's camp above the sea, ground `b3camp_night`), `b6_c2_shore` (the beach below it, ground `b5_c2_strand`), `b6_c2_road` (the plague road inland, ground `b3_c5_domin`), `b6_c2_vil` (the village where the dead were left, ground `b3_c5_domin_night`). All ground is borrowed from earlier books; the artist draws backdrops, items and figures only.
- **Backdrops:** `b6_coast` and `b6_plague_village` (this chapter's, in `B6_SCENE_LIKE`), and `b6_camp_night` (borrowed) for the fire on the march.
- **Nodes:** 61 (`b6_c2_*`).
- **Phases** (`S.f.b6_c2_ph`): 1 the camp and the shore; 2 the march inland; 3 the village fought, the order to fire it; 4 the key taken, back on the road; 5 the road fight done, on to the column and the chapter's end.

## The key: `S.f.b6_c2_key` (`burn` | `pass`)

Decided at the last house in the village, after the runner brings the order to fire every village on the road with the dead in it. A family (an old man, a woman, a boy; unnamed) has hidden there with the shutters shut, and is clean.

- **`burn`:** the family goes up the hill path first, and the squad fires the village from the street. Nobody in the squad catches anything there. Kettle spends a burner if she walks and has one (`S.f.b6_c2_burner`). Brisk +1, Ohl −1, Brannoc −1. `S.f.b6_c2_family = 'fled'`.
- **`pass`:** the squad goes round, leaves the family its roofs, and carries them water. The water-carrier catches the fever (`b6Catch`): Brannoc first if he walks and is clean ("doesn't touch a Falari"), else Brisk, Kettle, Tuft, Ellis, Vell, Sohra, Dannet, Ohl, the sergeant. `S.f.b6_c2_passWho` = who. Ohl +1, Brannoc +1, Brisk −1. `S.f.b6_c2_family = 'roofs'`.
- **For Ch4** (a fever count line) and **Ch6**: read `S.f.b6_c2_key` directly; default `burn` when unset. The captain saw the squad come back with no smoke behind it on `pass` and said nothing; nothing official comes of it in this chapter (left open for Ch4/Ch6 to use as a line, or not).

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b6_c2_key` | `burn` / `pass` | the key |
| `b6_c2_family` | `fled` / `roofs` | the family in the last house |
| `b6_c2_passWho` | a soldier id, or unset | who caught it carrying the water (`pass` only) |
| `b6_brannocDone` | 1 walks / 2 waits with Sweetcreek's lines / 0 sent away | the engine's recruit flag |
| `b6_c2_cured` | 1 | Ohl broke the fever at the fire (and was grey for a day) |
| `b6_c2_shrineDone` | 1 | the D'rek shrine on the headland cleared |
| `b6_c2_villageDone`, `b6_c2_roadDone` | 1 | the two main fights |
| `b6_c2_weatherOk` | 1 | the trick taught |
| `b6_c2_drekHeard`, `b6_c2_dujek` | 1 | the squad heard of the D'rek priests; the ranks' talk of the High Fist |
| `b6_c2_wellOk` / `b6_c2_wellSick` | 1 / an id | the hamlet well: looked at clean / drunk from on a "yes, but" |
| `b6_c2_whistle`, `b6_c2_ohlCity` | 1 | fire scenes (Brannoc and Kettle; Ohl and Ehrlitan) |

The Deck sets `b6_c2_drawn`, `b6_c2_reader`, `b6_c2_noCard` (100c).

## Fever (where it moves)

- **Caught:** the village fight (`b6_c2_village`, `feverRisk:'the dead in the village'`): the engine gives it to one walking soldier (with the fresh squad it falls on Kettle). The hamlet well's "yes, but" (the chapter's one fever cost): `b6Catch(roller, 'the hamlet well')`. The `pass` key (above).
- **Cured:** at the fire, "Ohl sees to the fever" (`b6_c2_cure`), offered when `b6CanCure()` and someone other than the healer has it. Ohl cures every fevered soldier but himself ("it doesn't work that way round") and is bruised for it: the warren is sick this season (bh-canon §8, W16). Without Ohl nobody in the Fourth can treat it in this chapter; it carries to Ch4, where the carriers break it.
- `feverHTML()` shows at the fire, after the village fight, at `pass`, back on the road, after the road fight, and at the column.
- **The D'rek charm** (`b6_c2_drekcharm`, trinket): in a fight the fever costs its wearer 3 health, not 4 (Claude's call, a small effect; a guarded `mkParty` wrap in this file, `b6On()`).

## Recruit: Brannoc

- `b6Join('brannoc')` at the horse lines in camp, phase 1. The captain sends you to him. Choices: walk (`b6Join`), wait with Sweetcreek's lines (`b6_brannocDone = 2`, in `S.camp`), send away (0), Not now. While waiting he can still be asked again by the horse lines, and the roster can bring him in.
- His lines: the horse lines, the quartermaster, the shore and the boats, Sweetcreek seen at a distance, the sail-mender, the fire (talk, rest, the whistle with Kettle), the house, the well, the village (stage 2's whistle note), the last house, both key nodes, the bandits, the axe, the column.
- **Kettle and Brannoc** are both Falari, from rival islands, and pleased about it (Claude's call, from Kettle's bio: Falar, the Strike Isles).
- **Brannoc's whistle** (the brief's recurring invention) is in his first scene, the fire, the village and the column.

## The trick: Falari Weather-Sense (`b6_c2_weather`)

- Copies Rhivi Spirit-Song (`song`) exactly: once a fight, every squadmate within 4 heals 1d6+2+lvB, wakes from daze, steps out of fire. Not sorcery.
- Taught by an old Falari sail-mender (unnamed) on the shore: ✦ Wits 17. Edges: Brannoc +2, Kettle +2, the sergeant +1, Brisk −1, Tuft −1. "Yes, but": soaked and shaking until the squall comes (bruised).

## Items

- `b6_c2_oilskin` (armour, light, +1 armour, +2 health): the quartermaster's issue, one a squad.
- `b6_c2_drekcharm` (trinket, any): from the shrine on the headland (Ohl brings it out if he walks).
- `b6_c2_falariaxe` (weapon, heavyweapon, +1 hit, 1d12+3): off the bandit chief on the plague road.

## Fights (xp before the 0.6 pay; foes for the balance pass)

| Fight | Where | Foes | xp |
|---|---|---|---|
| `b6_c2_shrine` (optional) | the headland, night | 3 `b6_c2_looter`, `b6_bandit`, `b6_rebelbow` | 200 |
| `b6_c2_village` (main, `stage2`, feverRisk) | the village street, night | 3 `b6_c2_scav`, `b6_bandit`, `b6_rebelbow` | 260 |
| ↳ stage 2, the headman's yard | | `b6_c2_scavboss`, 2 `b6_c2_scav`, `b6_bandit`, `b6_rebelbow` | +130 |
| `b6_c2_road` | the plague road, dusk | `b6_c2_roadchief`, 3 `b6_bandit`, 2 `b6_rebelbow`; wave round 3: 2 `b6_bandit` | 240 |

Total 830 raw, about 500 paid: the Fourth goes from 12 (3220) to 13 (about 3720). Without the optional shrine, about 380 paid, still level 13.

New foes (sized beside the engine's `b6_` foes for level 12–18; balance is David's):
- `b6_c2_looter` (Shrine-looter, kind `deserter`): hp 24, ac 12, atk 9, 1d6+3, mv 5, init 2, hitrun.
- `b6_c2_scav` (Corpse-robber, kind `thug`): hp 26, ac 12, atk 9, 1d8+2, mv 4, init 2.
- `b6_c2_scavboss` (the robbers' big man, kind `bruiser`): hp 58, ac 14, atk 10, 1d10+3, boss, rally, shove.
- `b6_c2_roadchief` (the bandit chief, kind `b4_c5_rider`): hp 60, ac 15, atk 11, 1d10+4, boss, rally, shove.

Every fight keeps `warren:{meanas:1, denul:1}`; the warrens' sickness is in the text and in the cure's cost. **For the balance pass:** a Denul/Meanas multiplier below 1 in these fights would carry bh-canon §8's "warrens infested" into combat. Not done: no rule changed.

## Checks and their "yes, but"

- The trick (Wits 17): bruised.
- The shrine, round the rocks (Guile 15): rattled.
- The hamlet well (Wits 15): the fever ("you drank from that well"). The chapter's one fever cost.
- The village, the back way (Guile 16): rattled.
- The bandits, into the ditch first (Might 16): bruised.
- Silver only at the quartermaster's wagon (a salve at 2), where money is the scene.

## Canon calls, with sources

- **The Host on the north coast near Ehrlitan:** Wp ("lands on the north coast of Seven Cities ... despite a deadly plague") with W1 and p. 36 ("Dujek's army?"). The camp is outside the city; the squad never enters Ehrlitan (hard limit: its tavern; Apsalar). [H]
- **The D'rek priests found slaughtered:** W6 (Paran at Kansu) [1]. Here it is camp talk ("all of them, the way it's told"), never a place or a count the narrator vouches for. The shrine on the headland is an invention in the margin: two priests dead some days, "not the fever", headline only, and the squad does not go past the door.
- **The plague in the villages; the Host marches inland:** W8 (villages devastated), W13 (the Host before G'danisban) [1]. The direction "inland, south" and "a city called G'danisban" are the scouts' and the captain's guesses.
- **Dujek's spirit broken:** W6 (the Adjunct to Keneb) [1]. Here only as the ranks feel it: he has not walked the lines since the landing; "since Coral" (Whiskeyjack's death, Book Three's own text) is soldiers' talk.
- **Captain Sweetcreek, a Falari princess:** W13 [1]. Seen at a distance on the shore; "her father's a king on one of the islands" is Brannoc's talk.
- **Leoman and the Fourteenth in the Odhans:** a regular's rumour (bh-canon §2). The other sergeant's name is used once, in that rumour, guarded on `S.th.r`.
- **The Fist's order to fire the villages:** invented, an order "from the Fist's tent" through the captain; no named Fist, and no canon outcome turns on it.
- **"Poliel":** never named in this chapter. "The locals say a goddess sent it."
- **Ohl** was a temple healer in Ehrlitan before the Empire (his bio). That he knew some D'rek priests "well enough to argue with" is Claude's call.

## Inventions (all unnamed)

The Seventh's captain (as in Book Three), a clerk, a Host regular, the quartermaster, a runner (a boy from the clerks), an old Falari sail-mender, a Falari at a fire, the looters, the corpse-robbers and their big man, the bandit chief, the family in the last house. No new names.

## Engine notes

- The fire is `b6_c2_fire` in `ROSTER_FIRES.bh[2]`. It is reachable from the camp (`F`) in phase 1 and from the road (`F`) after.
- The Deck's back node is `b6_c2_deck_done`.
- **`tools/recruit_scan.mjs` has no `bh` entry in its `BOOK` table** (its `chOfFile` maps files 101–107 to `bh`, but `BOOK.bh` is undefined, so the scan throws once a Book Six chapter registers a dialogue node). That is a tools fix for the lead; see the report.
- **Item art:** this worktree has no `src/102b_b6_ch2_art.js` yet, so lint reports the three items as having no artwork until the artist's file is merged.

## Left open on purpose

- Whether anyone ever asks about the village on `pass`.
- Where the family went on `burn`.
- Whether Brannoc goes back to Sweetcreek when the Seventh has its numbers (he asks the sergeant not to let him, at the column).

## Test status at hand-off (Nov 4)

- **Passed:** `python3 build.py`; `node --check` on both files; `tools/b6ch2_test.mjs` all ok (every check); `play.mjs 3 --book=bh --from=2` 3/3; `play.mjs 1` 1/1; `repeat_scan`; `trope_test` (every book inside the budgets); `trope_scan --files` clean for B6.
- **Lint:** 0 errors from this file once a stale-flag throw in `b6_c2_pass` was guarded. Still 3 errors: the three items have no artwork (the artist's file, `102b`, is not in this worktree).
- **`b6engine_test`:** 1 FAIL, "shelf: gotm,dg,moi,hoc,mt,bh". The test expects Book Six off the shelf, and `BOOKS.bh.coming` flips once any chapter registers. That is the engine test's expectation, not this chapter.
- **Not yet run:** `roster_test`, `reading_test`, `recruit_test`. Expect `recruit_test` to throw: `recruit_scan.mjs` has no `BOOK.bh` entry.
