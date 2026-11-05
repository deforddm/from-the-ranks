Wed Nov 4, 2026, PST. Book Six, Chapter 4, "G'danisban" (`src/104_b6_ch4.js`, art `src/104b_b6_ch4_art.js`), against v9.0.0 on `book6` (not shipped). Branch `b6-ch4`.

# Chapter 4 notes: G'danisban

The Fourth, with Onearm's Host, in the camp before G'danisban in the rain (*The Bonehunters* ch 13–16; `bh-canon.md` §3, §5, §8). The Host's commander is "Captain Kindly" to the squad from the first scene and "the High Fist" after the vote. The narrator never names him otherwise, and the squad never sees his face.

## Shape

63 dialogue nodes, 3 areas (16×12), 3 fights (one with `stage2`), 3 phases (`S.f.b6_c4_ph` 1, 2, 3).

1. **The lines in the rain** (`b6_c4_lines`, `b3camp`). The first halt (`b6_c4_start`, the Deck choice), the captain and the night's orders, a Falari of Sweetcreek's with the story of Captain Kindly, old Benna at the wash-tubs, the surgeons' tents and the bedding pits (the trick), the field hospital from the mud outside, Ressa at the picket, the surgeons' carts (optional fight), the water detail (from the fire), the fire.
2. **The night** (`b6_c4_edge`, `b3camp_night`; then `b6_c4_outer`, `b3_c3_city_night`). Poliel's followers at the ditch (`b6_c4_cult`); the shapes in the camp (no fight); the captain's runner; the streets outside the walls and the forward picket (`b6_c4_streets`); the walk back at first light.
3. **The morning** (`b6_c4_lines` again). The fever breaks (`b6_soliel`); the carriers; the bell; the key; the High Fist's armour; the tomb from the lines; `chapterEnd(4, key)`.

The fire (`b6_c4_fire`) is in the lines (phases 1 and 3) and at the edge (phase 2). Its "On." choice resumes the night or the morning after any "Not now" (`b64Next()`).

## The key `b6_c4_key` (the vote)

- **`vote`**: the Fourth stands at the back of the Seventh before the High Fist's tent. The captain answers for the company and the Fourth shouts the name with the rest. Brisk +1, Ohl +1, Brannoc −1.
- **`out`**: the Fourth keeps the picket at the gap while the Host votes behind it. People come out of the city carrying their sick, and a Guile 14 check decides whether the picket lets them through to the carriers (`S.f.b6_c4_letThrough` 1 or 0). Tuft +1, Brannoc +1, Ohl −1.
- **Either way the vote is unanimous** (W15, R15): staying on picket is not a vote against, and the text says every company gave the same name. No canon outcome changes.
- Ch6 reads the key ("the High Fist's eye"), and so does the finale.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b6_c4_key` | `vote` / `out` | the key |
| `b6_soliel` | 1 | set at the morning (the brief); `b6CanCure()` is true from here for the rest of the book |
| `b6_ressaDone` | 1 walks / 2 waits | Ressa's join (engine flag); she waits at "the surgeons' tents" when six walk |
| `b6_c4_letThrough` | 1 / 0 | `out` only: the picket let the city's sick through to the carriers |
| `b6_c4_hounds` | `still` / `shaken` | how the squad met the shapes in the camp |
| `b6_c4_cultDone`, `b6_c4_streetsDone`, `b6_c4_cartsDone` | 1 | fights won (carts is optional) |
| `b6_c4_kindly` | 1 | the squad heard the Captain Kindly story (also opens the glossary row) |
| `b6_c4_bell`, `b6_c4_word` | 1 | heard the bell; heard the vote's outcome |
| `b6_c4_carried` | number | how many squadmates the carriers cured at the morning |
| `b6_c4_drawn`, `b6_c4_reader`, `b6_c4_noCard` | | the reading (100c's flags) |

**Read from earlier chapters:**
- `b6_c2_key`: `pass` gives "the village the squad went round … come with it, the way a cough comes with a cold" in the intro; `burn` gives "the village the squad burned"; unset gives a neutral line.
- `b6_brannocDone` (through `b6In('brannoc')`): Brannoc's lines.
- The Fourth's own `S.fever` is carried by the engine from Ch2.

## Fever

- **Caught:**
  - `b6_c4_cult` (`feverRisk:'the Mistress's followers at the ditch'`).
  - `b6_c4_streets` (`feverRisk:'the streets outside the walls'`). The brief lists feverRisk only on the cult; v9.0-notes asks writers to mark "the G'danisban streets", so I marked both. This is Claude's call.
  - **The one "yes, but" fever cost**, at the water detail (Might 13, near): the roller drank from the cistern. If Ressa rolls it, nothing happens to her and the squad loses its rest instead.
- **Treated:**
  - **The captain's cot** in the surgeons' tents, once, if the captain's Guile 14 check was made. It cures the first fevered soldier and costs the phase-1 rest.
  - **Ohl's hands at the fire**, once per phase, not on himself. It cures one soldier, and the sick warren bruises Ohl (bh-canon §8: the warrens are infested).
  - **The morning**: every fevered squadmate is cured, "the carriers", with `S.f.b6_soliel = 1`.
- **Shown:** `feverHTML()` at the first halt, the surgeons' tents, the fire, the cult's after and the streets' after.
- **Tone:** the sweats, the shaking, water that will not stay down. No sores. The followers' hands are "what is on them", and the squad "does not need to look".

## Recruit: Ressa

- **She walks in out of the city at the picket** (`^` in the lines) in phase 1. The choices are "She walks with the Fourth" (`b6Join('ressa')`), "The surgeons need hands" (she goes to the surgeons' tents and can be taken on there later), or "Not now" (she stays at the picket as an npc).
- **With six walking she waits** at the surgeons' tents (engine `B6_HOME`), and the text says so.
- **Her lines:** the join, the fire talk in all three phases, the bedding pits (edge), the edge (the bowls on her street), the outer streets (her dye-yard), the well (her street's chalk marks), the dyer's knives, the carrier scene, the key, the `out` check (edge +3).
- **She never catches the fever.** The engine guards it; the water near-miss handles her too.
- **Brannoc** has lines at the start, the Falari's story, the join, the fire talk (three phases), the bell, the key, the vote and the end lines.

## Inventions (Claude's calls)

- **The Seventh's captain** is "he", unnamed, as Book Three's unnamed captain. He gives the night's orders and answers for the company at the vote.
- **A Falari of Sweetcreek's** (unnamed) tells the Sweetcreek story. **Old Benna** (Book Three's reader) does the surgeons' linen.
- **People unnamed by role:**
  - the surgeon with the red forearms;
  - the orderly at the bedding pits;
  - the surgeons' quartermaster;
  - the sentry;
  - the runner;
  - the forward picket's two regulars;
  - the gate-ward's ringleader;
  - the priest in grey.
- **The bedding pits:** vinegar-damped bedding, burned to smoke rather than flare. This is the trick's lore.
- **The rag post** with clay bowls "for her to drink from", and the chalk marks round the well ("the water is spoken for", Ohl's reading of old Ehrlii).
- **The forward picket's post** in the streets outside the walls, overrun from the gate-ward on the night of the shapes.
- **Eleven of the Seventh's sick are up** on the morning.
- **The surgeons' carts,** with bandits off the plague road.
- **No new named people.** One working name ("old Tamin") was cut before commit.

## Canon as written (sources)

- **Who is where:** the Host is camped before G'danisban, east of Raraku, in heavy rain (W13).
- **Sweetcreek and "Captain Kindly":** Sweetcreek, a Falari princess, was knocked out by a man taken for a deserter, who took command as "Captain Kindly", a name the soldiers know but no one in the Host has met (W13). Hurlochel's part is told as "Hurlochel with him" in the hospital, not how it happened.
- **The field hospital,** seen from outside: a cutter saying no through the canvas (Noto Boil keeping Paran out, W15, R15; not named there). Hurlochel is seen at the flap.
- **The night:** the shapes run through camp and city (R15 [1]); the squad stands still. Tuft knows the sound "from the Pale" (Book One). Series-canon rule 14 holds: no Hound dies at the Fourth's hands. Nobody names Shadowthrone.
- **Inside the city that night:** Tuft feels "something very old" dying (Poliel, W15). It is her belief, never the narrator's.
- **The morning:** the fever breaks through the carriers, "Noto Boil first", told as camp talk (W15, R15 [H]).
- **The bell:** Dujek dies of the fever "two bells" before Kindly returns (W15, R15 [H]).
- **The vote:** unanimous, on the strength of Dujek's logs (W15, R15 [H]).
- **After the vote:** the armour with a new sleeve, and the army waiting outside the tent (W16). I put it "later", without a day.
- **The tomb** outside G'danisban, with a painter inside it (Ormulogun, W16; not named). It is seen from the lines only.
- **Never:**
  - the field hospital's cots, Poliel's or Soliel's temples, the command tent, inside the tomb, inside the walls;
  - a word with Paran, Dujek, Hurlochel, Sweetcreek, Rythe Bude or Noto Boil;
  - the name "Paran".

## Engine additions in this file

- `TRICKS.b6_c4_vinegar` and `AB.t_b6_c4_vinegar`: A Courtesy of Darkness's mechanics, without `sorcery`/`elder`. A 3×3 of `dark:true` smoke within 5 for `2 + lvAt(5)` rounds; its tiles carry `b64vin`.
- `GLOSSX.bh`: two rows ("Captain Kindly", "The carriers").
- `B6DECK[4]`: readers Tuft, Sohra, Benna.
- `ROSTER_FIRES.bh[4]`.
- `SCENEX.b6_c4_edge` and `SCENEX.b6_c4_outer`, `??=` borrowing `b3_c2_camp_night` / `b3_c3_walls_night` until 104b paints them. These are this file's own two scenes; the artist may replace them.
- `b6_c4_mourner`'s kind is `b6_cultist` when Chapter 2's art has drawn it (checked at load), else `b4_c7_fleer`.

## Fights (base xp; the game pays ×0.6)

| Fight | When | Foes | xp |
|---|---|---|---|
| `b6_c4_carts` (optional) | phase 1 | 3 `b6_bandit` + `b6_c4_banditbow`, wave of 1 `b6_bandit` at round 2 | 140 |
| `b6_c4_cult` (main, `stage2`, feverRisk) | phase 2 | 3 `b6_c4_mourner` + `b6_c4_plaguepriest` (boss), wave of 1 mourner; stage2 "the rag shrine": 4 mourners | 220 + 120 |
| `b6_c4_streets` (feverRisk) | phase 2 | 3 `b6_c4_gateman` + `b6_c4_ringleader` (boss) + 1 `b6_bandit`, wave of 2 gatemen; allies 2 `b6_regular` | 200 |

- **Totals:** about 410 xp from the fights (330 without the carts), plus about 90 from clean checks. That is about 500, the brief's figure. A play from 13 ends at about 14.5.
- **Foe numbers** (base, before FSCALE ch 4: health ×1.7, +3 to hit, +2 damage):

| Foe | Health | AC | To hit | Damage | Notes |
|---|---|---|---|---|---|
| mourner | 26 | 12 | 9 | 1d6+3 | |
| priest | 56 | 13 | 10 | 1d8+3 | range 3, daze, rally |
| gateman | 24 | 12 | 9 | 1d6+3 | |
| ringleader | 48 | 14 | 10 | 1d8+4 | rally |
| banditbow | 22 | 13 | 9 | 1d8+2 | range 5, pin |

- **Warrens:** `{denul:.85–.9, meanas:.85–.9}`. The plague is in them (bh-canon §8).
- **Balance not run:** `tools/balance.mjs` has no `--book=bh` set-up yet. The numbers go to the balance pass and David; no rule changed.

## Left open on purpose

- What the shapes were, beyond Tuft's "from the Pale".
- What died in the city.
- Who the painter is.
- Why the Host marches north-east (Ch6).
- Where Ressa waits if she waits. Ch6 can bring her in at the fire.

## Canon points I was unsure of

- **Whether the fever broke in the camp before or after Dujek's bell.** I kept them the same morning: the fever breaks at first light and the bell is at mid-morning. Dujek's death "two bells before Kindly came back" stands either way.
- **The day of the armour scene** (W16 is after ch15's vote). It is "later" in the text.
- **The rain:** W13 only (Q21 lists it as not found by the page search).
- **Hounds "in camp and city":** R15 only [1].

## Deviations from the brief

- **`feverRisk` also on `b6_c4_streets`** (see Fever).
- **Two own backdrops** with borrowed drawings (the brief named only `b6_gdanisban_rain` for this chapter's art).

## Tool gaps found (not fixed: they are not this chapter's files)

- **`tools/lint.mjs`** has no Book Six state. `b6_` nodes are linted under `mk(0, v)`, a Book One state, whose squad happens to be the Fourth. My chapter test renders every node under Book Six states instead.
- **`tools/recruit_scan.mjs`**'s `BOOK` table has no `bh` row. See the report for whether it throws on a `b6_` file.
- **`tools/balance.mjs`** has no `bh` set-up.

## Tests

**Passed** (with the artist's uncommitted `104b` copied in for the run only):
- `build.py` and `node --check`;
- `lint` (exit 0; without 104b, only the two item-art errors and the Ressa sprite warning);
- `play.mjs 3 --book=bh --from=4`;
- `play.mjs 1`;
- `repeat_scan` (no b6_c4 hits);
- `trope_test` (B6 inside budget);
- `b6ch4_test` (all ok).

**Not yet run** (the session's wrap-up): `recruit_test` (it was running), `b6engine_test`, `roster_test`, `reading_test`.
