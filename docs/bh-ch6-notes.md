Wed Nov 4, 2026, 9:33 PM PST. Book Six, Chapter 6, "The Falling Sky" (`src/106_b6_ch6.js`, art `src/106b_b6_ch6_art.js` by the artist), against v9.0.0 on `book6` (not shipped). The Fourth's last chapter.

# Chapter 6 notes: The Falling Sky

Onearm's Host marches north-east of G'danisban under its new High Fist (BH ch 20–21; `bh-canon.md` §3, §5, §6, §8, §9). The night road and the lights below the moon; the halt; bandits and the plague-marked at the baggage; the day camp; Sweetcreek's water party; Hanar Ara, the surrender and the let-go; the cult at the city's edge; the key; the Fourth's road.

## Shape

- **Areas (3), all 16×12:**
  - `b6_c6_road`: the night road, the column halted (ground `b4_c4_camp`, dark). Triggers: `W` wagon, `h` Falari horse lines, `^` the road ahead (the heavies; never past), `v` the tail (the night fight). NPCs: the captain, Sweetcreek's Falari, a carrier, Old Benna (only when she is the reader), the drovers, the marked (after the fight).
  - `b6_c6_camp`: the Host's day camp at dusk (ground `b4_c4_camp`, dark). Triggers: `f` the fire, `<` the road west to the last well, `>` the night's march, `=` a tent wall, `W`, `h`. NPCs: the captain, the Falari, a carrier, Old Benna.
  - `b6_c6_hanar`: the plain before Hanar Ara (ground `odhan`, day). Triggers: `=`/`^` the city's edge, `r` the Seventh's place in the line (the cairn), `v` back to camp (the roads, after the key). NPCs: the captain (the key once the cult is done), the heavies, Mathok's rebels going (after the surrender), a carrier, a shrine-keeper.
- **Nodes:** 61 `b6_c6_*` (the Deck's two included).
- **Phases:** `S.f.b6_c6_ph` 1 the night road (set at `b6_c6_start`), 2 the day camp (`b6_c6_dawn`), 3 Hanar Ara (`b6_c6_hanar_arrive`), 4 the roads (`b6_c6_roads`).
- **The first halt** is `b6_c6_start`: the column halting under the lights. `b6DeckChoice(6)` is among its choices; it is a hub (`again:`) that the captain, the Falari and the drovers lead back to ("Back to the Fourth's stretch of road") while phase 1 lasts.
- **The fire** `b6_c6_fire` (phase 2): `again:`, `feverHTML()` in `html`, a rest once (`rest()`), the squad's talk (one line each), camp news, the squad's own scenes (Ohl's lamp, Brannoc's whistle, Ressa's blue, Brisk's rations, Kettle's satchel), the fever (to the carrier) if anyone has it, the sky, the night's march, the roster (38c adds it), "Not now" last. `ROSTER_FIRES.bh[6] = ['b6_c6_fire']`.

## Fights (xp as written; the engine pays ×0.6)

| Fight | Where | Foes | xp | Notes |
|---|---|---|---|---|
| `b6_c6_night` (main) | the baggage at the tail, night, `b4_c4_camp` | `b6_c6_raidchief` (boss), `b6_bandit` ×3, `b6_c6_banditbow`; wave r2 `b6_cultist` ×2; ally `b6_regular` | 230 | `stage2` "Past the lamps": `b6_cultist` ×3, `b6_bandit` ×2, wave `b6_cultist`; +110. Guile 16 to come in wide (surprise). Not mortal. Gives `b6_c6_starstone`. |
| `b6_c6_wells` (optional) | the last well, dusk, `odhan` | `b6_bandit` ×3, `b6_c6_banditbow`; wave r3 `b6_bandit`; ally `b6_c6_falari` | 160 | Wits 16 down the dry wash (surprise). |
| `b6_c6_cult` (main) | the city's edge at dusk, `odhan` | `b6_c6_marked` (boss), `b6_cultist` ×4; wave r2 `b6_cultist` ×2 | 210 | **`feverRisk:'the edge of Hanar Ara'`**. `stage2` "The outer shrines": `b6_cultist` ×4, `b6_c6_banditbow`; +100; the stage2 sets `feverRisk:null` (see Engine). Gives `b6_c6_hanararobe`. |

Total as written 810, paid about 486: the Fourth goes from 15 (4540) to about 16 (5026). With the well skipped, about 390.

**Writer foes (for the balance pass; numbers are the engine's b6 scale):**
- `b6_c6_raidchief` "Bandit captain", kind `b4_c5_rider`: hp 60, ac 15, atk 11, 1d10+4, mv 4, boss, `rally`, `shove`.
- `b6_c6_banditbow` "Bandit with a bow", kind `b4_c7_fleerbow`: hp 22, ac 13, atk 10, 1d8+2, rng 5, `pin`.
- `b6_c6_marked` "One of the marked, preaching", kind `b4_c7_fleer`: hp 52, ac 14, atk 10, 1d8+4, boss, `rally`.
- `b6_c6_falari` (ally) "A Falari water-carrier", kind `b2soldier`: hp 22, ac 14, atk 8, 1d8+2.

At level 15 these are light (the Fourth hits on almost anything). Balance is David's step; no rule changed.

## The key `b6_c6_key` (the city)

Chosen at `b6_c6_key`, the captain on the picket line after the cult fight ("Not yet" steps away; the captain on the map brings it back).
- **`letgo`**: "Nothing that changes the order, Captain. Let it stand." Ohl +1, Ressa +1, Brisk −1.
- **`report`**: "Write it down. A cult at the edge, a woman preaching, knives. My name under it." Brisk +1, Kettle +1, Ohl −1. Sets `S.f.b6_c6_reported = 1`. The captain says nothing will come of it, and nothing does in this book.
- Read: the Hanar Ara road's words (`report`: "You named the cult. You can keep an eye on it. From the road."), Ohl's fate page on that road, the sergeant's fate page, the road page, extras and journal.

## The Fourth's road `S.f.b6_fourthRoad` (read by Ch7's finale)

Chosen at `b6_c6_roads` (phase 4), the captain's three papers:
- **`highfist`**: on with the Host and the Seventh. Brisk +1, Brannoc +1.
- **`hanarara`**: the picket the High Fist leaves on the Hanar Ara road, a few days, to see Mathok's people clear; never past the outer shrines; comes back to the Host when sent for. Ohl +1, Ressa −1.
- **`home`**: the time-served list: to the coast and a ship west; where they get off is their own business (left open). Ohl +1, Kettle +1, Brisk −1.

Each road has its own node (`b6_c6_road_<road>`), then `b6_c6_end` → `chapterEnd(6, key)`.

## `B6CH6.fates`: the shape, for the Ch7 writer

`B6CH6.fates` (the same object as the file's `B66FATES`) reads **the Fourth's half of the save** wherever it is: `S` while the Fourth plays, `S.th.h` while the Third does (in Ch7 it is `S.th.h`). It never reads the Third's fields.

| Member | Returns |
|---|---|
| `half()` | the Fourth's half (`S.th.h` in Ch7): `{name, squad, camp, loy, dead, lvl, ...}`, or `null` outside Book Six |
| `road()` | `'highfist'` / `'hanarara'` / `'home'` (default `'highfist'` if unset) |
| `key()` | `'letgo'` / `'report'` (default `'letgo'`) |
| `roadPage()` | `{title, scene, paras:[…]}`: the Fourth's road page. Titles: "With the High Fist", "The Hanar Ara road", "Time served". The last para names "Sergeant <name>, Fourth Squad, Seventh Company". |
| `page(id)` | `{title, txt}` for one squadmate (or `'sgt'`). Written for `brisk`, `kettle`, `tuft`, `ohl`, `brannoc`, `ressa`, `sohra`, `greysword`, `ellis`, `vell`, and the sergeant; anyone else gets a short default. Each reads the road, the key and the soldier's loyalty in the Fourth's half. |
| `pages()` | the whole run, in order: `[{id, k, label, title, txt, loy, name?}]`. Walking squadmates (`k:'fate'`, `label:'The Fourth'`), then those waiting at the company's camp (`k:'fate'`, `label:'With the company'`), then **those fallen in Book Six** (`k:'gone'`, `label:'The fallen'`; `dead[id].from` unset), then the sergeant last (`id:'sgt'`, `k:'fate'`, `label:'The sergeant'`, `name` = the Fourth's sergeant). The dead from earlier books (`dead[id].from` set by the transfer) get no page. |

Notes for using it in the finale:
- **Portraits:** `drawPortrait(ctx, 'sgt', …)` draws the sergeant of `TPL.sgt`, which in Ch7 is the Third's. For the Fourth's sergeant page call `b6SgtFor('h')` before drawing and `b6SgtFor('r')` after (or keep a cached canvas). Squadmates' portraits are their own ids.
- **Loyalty:** the finale's `loyLabel(S.loy[id])` reads the Third's loyalties; use the page's `loy` field for the Fourth.
- **Text** uses `{sgt}` nowhere; it is in second person for the sergeant ("You march on…"). If the Fourth's pages are shown to the Third's player as "the other sergeant", the Ch7 writer may want to re-voice the sergeant page; the road page already names the sergeant in the third person.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b6_c6_key` | `letgo` / `report` | the key |
| `b6_fourthRoad` | `highfist` / `hanarara` / `home` | the Fourth's road (shared rule in the brief) |
| `b6_c6_reported` | 1 | the report was written (on `report`) |
| `b6_c6_lights` | 1 | the squad watched the lights |
| `b6_c6_surr` | 1 | the surrender at Hanar Ara seen |
| `b6_c6_eye` | 1 | on Ch4 `vote`: the High Fist's eye stopped on the Fourth (seen, never spoken with) |
| `b6_c6_nightDone`, `b6_c6_wellsDone`, `b6_c6_cultDone` | 1 | the fights won |
| `b6_c6_foldOk`, `b6_c6_foldBy` | 1, `tuft`/`ohl` | the trick taught, and to whom |
| `b6_c6_drawn`, `b6_c6_reader`, `b6_c6_noCard` | engine (100c) | the reading |

Flags read from earlier chapters, each with a default: `b6_c2_key` (`burn`: Kettle remembers a village burned on orders at the edge; `pass`: Brisk remembers a family that kept its roofs; unset: neither line), `b6_c4_key` (`vote`: the High Fist's eye stops on the Fourth, and the intro says the Fourth stood for him; `out`: "Captain Kindly as was" in the High Fist's mentions, and the intro says the Fourth was on picket; unset: neutral), `b6_c5_key` (`wait`: one line of rumour in the camp news), `b6_soliel` (the carriers can cure; `b6CanCure()`).

## Fever

- **Caught:** the cult fight (`feverRisk`, one walking soldier, never Ressa) and the edge's one "yes, but" (Guile 16 to go in among the tents: on a near miss the roller catches it, once a chapter, `S.f.b6_c6_nearFever`; if the roller cannot catch it, Ressa or already fevered, they are rattled instead).
- **Cured:** a carrier on every map (`b6_c6_carriers` → `b6_c6_carried`, "a carrier's touch"), and after the cult fight Ohl's Denul (slow and foul there) or a carrier (`b6_c6_cured`). `feverHTML()` at the fire, the carriers and the cult's aftermath.
- Never lurid: sweating, shaking, cannot keep water down; the marked are pale healed scars, said once or twice.

## The trick: The Fold Remembered (`b6_c6_fold`)

✦ Wits 17 at `b6_c6_fold`, from the first halt. With Tuft walking only Tuft can roll it (+3, she watched Tattersail once); without Tuft, only Ohl (+2, "Ohl's way"). A copy of **Tattersail's Fold** (`fold`): `use:'chapter'`, `n:1` (two at level 15). No battle half, as the fold has none.
- **Engine, in this file, guarded by `b6On()`:** the card screen (21) asks `trickLeft('fold')` and spends `spendTrick('fold')`. In Book Six `trickLeft('fold')` adds this trick's charges, and `spendTrick('fold')` spends this one when the old fold has none. The button still reads "Tattersail's Fold", which fits.
- The trick is taught before the reading on purpose: the Fourth has no later chapter, so it is only worth anything at this halt (and on a later transfer).

## Items

- `b6_c6_starstone` (trinket, `role:'any'`, `stat:{wits:1}`): the black stone off the bandit captain's neck. Nobody knows what it is; never said to be from the lights.
- `b6_c6_hanararobe` (armour, `role:'light'`, `ac:1`): a pilgrim's robe with charms in the hem, dropped at the first shrine.
- **Art:** the artist draws both in 106b. This file registers a plain placeholder for each **after the page's script has run** (`queueMicrotask`), only if 106b has not drawn it, so the lint's "every item has art" holds in a writer-only tree and the artist's art always wins.

## Canon calls and inventions

- **The lights:** "twelve, in a curve below the moon" (W20 says a dozen; page not found, Q21). The narrator never says what they were. The High Fist rides out "with a handful" and comes back; the squad never sees where or why (§6: never the gate). No sea hint.
- **The night march:** the Host marching by night out of the heat. Claude's call; W20 says Paran halted the column, which fits a column on the move at night.
- **The surrender:** seen from the line, all afternoon; weapons go down in heaps before the standard; then "Let them go" comes down the line. Whether they took their weapons back is not said. Mathok is "the big man at the front", too far to have a face. Claude's call within W21.
- **Sweetcreek and Rythe Bude** (W20): heard through a tent wall only, never met, never named in their own voices. The Falari as Sweetcreek's company, next in the line (the brief's recurring invention).
- **The carriers** (§8): "a soldier of the Third Regiment who had it at G'danisban". Noto Boil is never named.
- **The cult at the edge:** the plague-marked who came to Hanar Ara (W12), a tall marked woman preaching on a cart that the fever chose them and the sky opened for them. Never Felisin Younger, Kulat, the Chosen One by name, the Crippled God, or the city's centre; the squad goes no further than the outer shrines.
- **Ohl and Tattersail:** Ohl watching her fold in the Second's cadre tent is Claude's call (Ohl served the Second under Dujek; Tattersail was its cadre mage).
- **Ohl's home:** Ehrlitan, "along the coast" from where the time-served take ship; on `home` he stays in Seven Cities and walks to Ehrlitan. No distance given.
- **No new named people.** The rebel soldier, the shrine-keeper, the drovers, the captain, the heavies, the marked and Brannoc's cousin in the water party are unnamed.
- Tuft's fate keeps rule 4 and 11: "someone Tuft does not talk about" on Genabackis; no House, no child named.

## Deviations and things to tell the lead

1. **`roster_test.mjs`** iterates `ROSTER_FIRES` and calls `mk[book]()`, which has no `bh` entry; with `ROSTER_FIRES.bh` added (as the brief requires) it may throw. See the report for the run's result; the fix is one line in the test (`bh:()=>newStateBH('F6a','F6b')`), outside this branch.
2. **Fever with `stage2`:** 100's `endBeat` hook gives the fever at the end of **each ground** (stage 2 builds a new `B` and inherits `feverRisk`). The cult's `stage2` sets `feverRisk:null` so it is caught once. Other writers' `stage2` fights with `feverRisk` will catch it twice unless they do the same.
3. Node count 61 (in range).

## Tests (Wed Nov 4, 2026, late evening PST; the session was stopped by the lead before the battery finished)

- **Passed:** `python3 build.py`; `node --check` on both files; `node tools/lint.mjs` (0 errors, before the last fixes); `node tools/b6ch6_test.mjs` (all ok); `node tools/play.mjs 1` (1/1); `node tools/trope_scan.mjs --files` (106 under every budget).
- **`play.mjs 3 --book=bh --from=6`: 1/3 before the fix.** Two runs soft-locked on the night road: a "Not now" after the night fight left no way on to dawn. Fixed (the tail, the drovers and the road ahead now offer "Dawn. The column moves." once the fight is won; the chapter test checks it). **Not re-run after the fix.**
- **Not yet run:** `play.mjs 3 --book=bh --from=6` (after the fix), `b6ch6_test` (after the fix), `lint` (after the last edits), `repeat_scan`, `trope_test`, `recruit_test`, `b6engine_test`, `roster_test` (may throw on `mk.bh`, see Deviations 1), `reading_test`.
