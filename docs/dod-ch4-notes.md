Mon Nov 9, 2026, 9:00 PM PST. Book Nine, Chapter 4, "The Ration Book" (`src/164_b9_ch4.js`, art `src/164b_b9_ch4_art.js`, test `tools/b9ch4_test.mjs`), against the Book Nine engine on `book9` (v12.0.0, not shipped).

# Chapter 4 notes: The Ration Book

The Letherii (the Sixth Company) in the Commander's escort, out on the Wastes behind the Malazans. The train's ration book is short, and the squad finds out who has been taking: the quartermaster's runner Ch 2 left open, chalking the water wagons for Bolkando-border raiders. Raiders on the train at night. A bhederin stampede at the noon halt (thin game, R10 S1, S7). Kaedra, a scout off the Bolkando border, joins at the first halt. Mages failing (R5, R19.2 S6) and the Barghast war on the Akryn (R11 S1) are headline only. The Commander is never seen; Aranict is never mentioned.

## Shape

- **Areas (3, 16×12, ground `b9_c4_wastes`):**
  - `b9_c4_camp`: the train's wagon ring (dark). Used at dusk (phase 1), at night (phase 2), and at evening (phases 4–5).
  - `b9_c4_wastes`: the noon halt on open country, by day (phase 3).
  - `b9_c4_wash`: a dry wash out on the plain, by day (the `forage` road only).
- **Nodes:** 61 `b9_c4_*` dialogue nodes, the reading's two included.
- **Phases** (`S.f.b9_c4_ph`):
  1. Dusk at the train. Set at `b9_c4_start`.
  2. That night. Set at `b9_c4_tonight`.
  3. The next day's noon halt. Set at `b9_c4_turnin`.
  4. The key's road. Set at the key.
  5. The camp at evening, the key done. Set at the end of the key's scene.
- **The order a player meets things:**
  - Phase 1: Ennic's word (the ration down a step, "the Malazan mages have fallen" as soldiers' talk, the Barghast smoke if asked); Kaedra with the outriders (the first halt); the tile-woman at a ration crate (the reading); the runner at the water wagons; Yelt's count (the chalk); Orla, Saffa, the oxen, the horse lines; the fire; sit the train.
  - Phase 2: the raid (main fight); the runner gone; Yelt closes the book; the Witness beat at the fire; sleep.
  - Phase 3: the noon halt; the stampede (survive fight); the lamed straggler (the hunt, +1); Kaedra's spoor (the trick); the outrider (the spear, the rumour, the other squad's line); the cairn; the key from Ennic.
  - Phase 4: `book` back to the early camp and the recount with Yelt; `forage` south to the dry wash and the Barghast.
  - Phase 5: the fire at evening; first light, east.
- **The first halt** is `b9_c4_start`, with `b9ReadChoice(4)` and the way to Kaedra. The reading is offered at the crate and at the fire in phase 1 only.
- **`B9READ[4]`:** scene `b9_c4_dusk`; place "a ration crate at the train, at dusk"; back `b9_c4_fire`; say lines for Perrit and the tile-woman.
- **The fire** (`b9_c4_fire`, id kept for the games pass):
  - phase 1 at dusk; phase 2 at night (no rest; the Witness beat; sleep); phases 4–5 at evening (the way east in phase 5).
  - `rationsHTML()` in every phase. A rest once at dusk and once at evening.
  - The talk: a line by dusk and a line by day for Tobet, Thegg, Perrit, Ammet, Ilsa, Sorvan, Ruuk, Brune, Pessa, Brennet and Kaedra.
  - "Not now" always. The engine adds the roster.

## The key `b9_c4_key` (the ration book)

Given by Ennic at the noon halt once the stampede is over, with `rationsHTML()` shown; Kaedra, Brennet and Perrit have lines; "Not yet" steps back.

- **`book`:** the column makes an early camp, and the squad counts the brigade's whole share again with Yelt by lamplight. A wits 16 `rations:true` check; both outcomes go on (its "yes, but": rattled). At its end **`b9Ration(1, 'an honest count')`** once and **`S.f.b9_c4_book = 1`** (`b9_c4_booked`). The true number goes up the column with the runner's chalk pinned to it.
- **`forage`:** Kaedra +1 at the key. South with the Bluerose outriders to a dry wash with a seep, where Barghast hunters claim the herd: the forage fight `b9_c4_forage`. On the win **`b9Ration(3, 'game, and a little water')`** once (`b9_c4_forageDone`).
- **Read later:** Ch 6 reads `S.f.b9_c4_book` (the train holds where it should).

## Rations (this chapter)

| Move | Where | Amount |
|---|---|---|
| The march | the engine, at the chapter's start | −2 |
| The hunt (once, `b9_c4_hunted`) | the lamed straggler after the stampede, a wits 16 `rations:true` check | +1 |
| The chapter's one ration "yes, but" | the stampede's approach (might 16): a barrel bursts | −1 (near roll only) |
| The key | `book` / `forage` | +1 / +3 |

- **Ranges:**
  - From Ch 2's `wagons` (8): 6 after the march, 7 with the hunt; 8 on `book`, 10 on `forage`.
  - From `drill` (6): 4, then 5; 6 on `book`, 8 on `forage`.
  - A fresh or `--from=4` save (6): the same as `drill`.
  - With the near roll at the stampede, one less. The brief's range of 5–10 holds, except `book` with no hunt from `drill` (5) and with the near roll as well (4).
- At 4 (`short`) every squadmate starts the raid 5% down on health; the stampede and the forage fight too, if the squad is still short then. This chapter cannot reach `hungry` (1–2).

## The Witness beat (`b9Wit`, `S.b9.wit.c4`)

- **Where:** the train's fire on the night of the raid, after Yelt has written the runner off and closed the ledger. Yelt asks: "What did Lether send us out here for, Sergeant? I would like to write it down."
- **The answers:**
  - "Each other…" → `kept` (`S.f.b9_c4_wit = 'each'`)
  - "The Commander asked for soldiers who came back…" → `kept` (`'commander'`)
  - "The pay. If there's any." → `doubt` (`'pay'`)
  - "Not now" records nothing.
- Each answer gets replies (Thegg or Tobet; Sorvan or Perrit; Ruuk or Pessa), and lines from Kaedra and Brennet if they walk. No `witness:true` check this chapter.

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b9_c4_key` | `book` / `forage` | Ennic, the noon halt |
| `b9_c4_book` | 1 on `book` (shared flag) | the recount |
| `b9_kaedraDone` | 1 walks / 2 waits (engine flag) | the horse lines |
| `b9_c4_wit` | `each` / `commander` / `pay` (Witness in `S.b9.wit.c4`) | the fire, night |
| `b9_c4_marks` | 1: the runner's chalk found before the raid | Yelt's count |
| `b9_c4_runner` | `gone`: the runner rode off with the raiders | the raid's after |
| `b9_c4_hunted` | 1: the straggler brought down, +1 | the hunt |
| `b9_c4_forageDone`, `b9_c4_keyDone` | 1 | the key's scenes |
| `b9_c4_spoorOk` | 1: the spoor learned (the trick) | the herd's track |
| `b9_c4_raidDone`, `b9_c4_herdDone`, `b9_c4_closed` | 1 | the fights' after-nodes; Yelt |
| `b9_c4_spear`, `b9_c4_coat` | 1: the item given | the outrider; Kaedra |
| `b9_c4_outrider` | 1: the Barghast war heard | the outrider |

Chapter 2 is read for Yelt's opening line (`b9_c2_loadedTrue`, `b9_c2_found`, `b9Key(2)`, default `wagons`) and Orla's (`b9_c2_orla`). Chapter 3 is read for the other squad's one line (`b9Key(3)`, default `boil`).

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b9_c4_raid` | the wagon ring, night | `b9_lraider` ×3, `b9_lraiderbow` ×2; stage 2 (outside the ring) `b9_lraiderchief`, `b9_lraider`, `b9_lraiderbow` | 380 + 170 | **main**; one `b9_escort` ally. Straight in, or (with the chalk found) a guile 16 wait at the chalked wagons for surprise |
| `b9_c4_herd` | the noon halt | `b9_c4_bull` ×3; a wave at round 2: ×2 | 120 | **survive 4**, near certain; one `b9_bluerose` ally. A might 16 turning of the oxen first (surprise; its near roll is the ration "yes, but") |
| `b9_c4_forage` | the dry wash, afternoon (`forage` only) | `b9_lbarghast` ×3, `b9_lbarghastchief` | 220 | two `b9_bluerose` allies. Straight in, or a guile 16 crawl up the wash for surprise. No clan named (rule 89) |

- **Own foe:** `b9_c4_bull` (Stampeding bhederin; `b3_c2_bhederin` body; hp 30, ac 11, atk 6, 1d6+2, mv 6, shove), low to hit on purpose.
- Combat numbers are otherwise the engine's defaults; `B9GAP` and `B9SOLDIER` are untouched.
- **Xp:** at the engine's `XPK` (.6) the raid alone pays 330, a full level. A fresh Letherii at 11 ends at 12 (test: 3332 xp on `book`); a `--from=4` squad at 12 ends at 13.
- **Hunger:** at 5 (`fed`) nothing; at 3 (`short`) every squadmate starts 5% down; at 1 (`hungry`) 10% down and −1 on every check.
- **Balance:** `balance.mjs --book=dod` was not run (the caller asked for no long suites). The raid copies Ch 2's main fight's shape with one more raider and bow, at a level higher; the stampede and the forage fight are built light.

## The trick: Reading the Spoor (`b9_c4_spoor`)

- **What it is:** the border forts' scouts' craft: the crust, the stems, the dust, and how old each print is.
- **The check:** a ✦ wits 18 check at the herd's track (`b9_c4_spoor`), after the stampede. Kaedra teaches it whether she walks or waits. Its edges:
  - Kaedra's forts +2; Ruuk's Faraed grass +2;
  - Sorvan's hoofprints at a canter, Tobet's game, Brennet's wheel-ruts and dung, Ilsa's files, the sergeant's river scouting +1;
  - Perrit and Thegg −1.
- **What it does:** it copies the Long Listen (`b4_c6_listen`) the way Book Eight's Grass-Running does, under `b9On()` (`B.b94spoor`). It is **passive** (`V103_PASSIVE` already lists it): it opens by itself in every fight. The first enemy to move is marked, +2 to hit it for the squad until the end of the next round; through the first round nobody in the squad can be flanked. Not sorcery.
- **Either way:** Kaedra gives her spare scout's coat on either outcome.

## Items (each with art, 164b)

| Item | Kind | Stats | How it is got |
|---|---|---|---|
| `b9_c4_bluerosespear` | weapon, reach | **atk 1, 1d8+3, reach** (the real number: Ch 2's escort spear is +2) | the Bluerose outrider, after the stampede |
| `b9_c4_scoutcoat` | armour, light | ac 1, hp 2 | Kaedra, at the herd's track (either outcome) |
| `b9_c4_bonewhistle` | trinket, any | hp 2 | the raiders' leader, after the raid |

All three are got on both keys.

## Kaedra (the recruit)

- **Joins at the first halt:** from the start node or her NPC at the horse lines (`b9_c4_kaedra` → `b9Join('kaedra')`). When six walk she waits with the outriders and can be asked again in phase 1 or at evening. There is no "go away" answer.
- **Her own scenes:** her join (the fort, the blue bead, why she walked out of the gate); the chalk under the wagons; the night; the stampede; the hunt; the spoor; the wash.
- **Her lines behind `b9In('kaedra')`:** the fire (both phases), the Witness, the key, the key's scenes, the end. Brennet has lines at the start, the oxen, the count, the raid, the stampede, the Witness, the key, the loading of the meat or the recount, and the end.
- `recruit_test` passes.

## Named inventions

- **No new named people.** Yelt, Orla, Saffa (the brief's) and Ennic return.
- **Unnamed by role:**
  - the quartermaster's runner (Ch 2's open thread, used and closed: he chalked the water wagons and rode off with the raiders);
  - a grey Bluerose outrider;
  - the outriders' decurion;
  - the raiders and their leader with the bone whistle;
  - the Barghast hunters and their leader;
  - the tile-woman (160c's).
- **New figures:** `kaedra` (replacing 160's sprite), `b9_c4_outrider`, `b9_c4_runner`.

## Canon points, hard limits, open threads

- **Off the page:** Brys and Aranict walking the camp, Henar, the Barghast camps, Tool, Hetan, Stolmen, Sekara, Setoc, the Akrynnai envoy and the Snake are not mentioned. "The Commander" is named in words only (his orders), never seen.
- **Mages failing:** Ennic passes on the soldiers' words "the Malazan mages have fallen" (R19.2 S6), and Perrit says the Holds are further down each night. Headline only; no number changes.
- **The Barghast:** they are "the painted clans" and "Barghast"; war on the Akryn is news (Ennic, the outrider). The forage fight is with hunters at war with somebody else. No clan is named.
- **The one rumour:** the Barghast war (allowed Ch 3–4).
- **The other squad:** one line, from the outrider, as camp talk read from `b9Key(3)`:
  - `boil`: "sat down by the road for a day and a night and boiled everything it had";
  - `press`: "kept the column's pace… with a fevered soldier on the tail of a cart".
  - `b9OtherName()` is not used.
- **Rule 85:** water by the cup and a seep in a wash; no thirst unto death. Hunger is a belt on a new hole, half a biscuit passed back and forth.
- **Never said:** "weeks", "months", a Burn's Sleep year, "Bonehunters" (not said at all; "the foreigners").
- **Open on purpose:** where the runner went; what the Barghast hunters do next; what the decurion's party carries home besides meat.
- **Unsure:** the canon sheet has bhederin "still walk" the Wastes (R10 S1) and the Wastes "emptied" (R10 S7). The stampede's size is the game's own ("a score, maybe fewer" since the continuity read, Nov 10: R10 S7 has the Wastes "emptied"). I suggest a page check that a herd of that size is plausible this far into the Wastes.

## Art (164b)

- **Four backdrops:**
  - `b9_wastes`: open country by day: dry grass, bare stone, a cairn, the foreigners' dust far east. In Ch 4 it also has the escort halted along the track, the outriders' horses, the grey outrider, the herd's dust coming on in the north before the stampede, and the lamed bull after it. It is generic outside Ch 4, for later chapters.
  - `b9_camp_night`: the wagon ring dark against the stars, tents, low cook-fires, a sentry, the column's fires going away for a league. In Ch 4 it also has Yelt's lamp and, before the raid, three shapes under the water wagons.
  - `b9_c4_dusk`: the ring at dusk under a red sky, ration crates, barrels, oxen, the squad's fire with dung-smoke. In phase 1 the tile-woman and Yelt; Orla except at night; Kaedra outside the light once she walks.
  - `b9_c4_wash`: the dry wash with its seep, the herd round it and painted riders on the far lip; after the fight, the spare horses loaded with meat; smoke far off north.
- **Ground `b9_c4_wastes`:** Ch 3's road ground underneath, plus `W` a wagon of the ring, `C` a ration crate, `X` oxen on a picket, `c` a water-cart, `s` the herd's track, `e` a seep.
- **Battle cover `t`:** stacked ration crates.
- **Figures:** `kaedra` (the dun coat, grass at the shoulders, the hood down, the blue bead, the horn bow; 160b's bust kept), `b9_c4_outrider`, `b9_c4_runner`.
- **Items:** three, on Book Nine's dust-brown ground.
- **Size:** 30 KB. Checked at 412×915: dusk, night, noon, the wash before and after, the three maps, and the raid and stampede battles.

## Engine

- **No edit outside this chapter's files.** In `164`, guarded by `b9On()`: the trick's battle half (wrappers on `boonFoeTurnStart`, `flanked`, `atkCalc`, `squadTurnStart`, as Book Eight's Grass-Running).
- **Captions:** `SCENES.b9_wastes` (160) gets a caption getter so it reads as the noon halt in Ch 4; 160's caption otherwise.
- `B9READ[4]` is filled from 164 (as the brief asks).
- **Uses Ch 2's and Ch 3's art helpers** (`b92aWagon`, `b92aBarrels`, `b92aOx`, `b92aTent`, `b93aLand`, `b93aHorse`, `TILEX.b9_c3_road`) by calling them; it does not change them.

## Tests

- `python3 build.py`: passes.
- `node --check` on both files: passes.
- `node tools/lint.mjs`: 0 errors. The three style warnings are the same kind Ch 1–3 have.
- `tools/b9ch4_test.mjs`: 19/19. It covers:
  - the fresh start (the march −2);
  - every node rendering clean;
  - the "yes, but" and "Not now" audit (7 checks, 10 onward nodes);
  - the reading;
  - Kaedra joining;
  - Yelt's count and the chalk;
  - the fire;
  - the raid on both grounds;
  - the Witness (three answers and Not now);
  - the stampede and its ration "yes, but";
  - the hunt +1 once;
  - the trick (passive, its battle half, +2);
  - the outrider;
  - both keys from the same moment (book +1; forage +3 and the forage fight);
  - a `--from=4` style transfer save (Perrit dead, six walk, Kaedra waits and still teaches) that reloads.
- `b9ch1_test`, `b9ch2_test`, `b9ch3_test`, `b9engine_test`, `trope_test`, `recruit_test`, `yesbut_test`, `reading_test`, `v103_test`, `tricks_test`: all pass.
- `trope_scan`: B9 inside every budget. This chapter: theway 1, silence 3, nobody 4.

## Claude's calls (David may overturn any)

1. The chapter opens at dusk at the train, so the reading's place (a ration crate at dusk) is the first halt. The stampede and the key come the next day at the noon halt; the key's road plays that afternoon and evening.
2. "Who has been taking" is Ch 2's quartermaster's runner, chalking the water wagons for border raiders; he rides off with them and is closed here.
3. Finding the chalk opens a guile wait at the chalked wagons (surprise) before the raid; failing the count still brings the raid, straight in.
4. The chapter's one ration "yes, but" is the stampede's approach: a barrel bursts. There is no own-scene ±1.
5. One ally in the raid (an escort sentry), one in the stampede and two in the forage fight (Bluerose outriders).
6. The trick is taught at the herd's track after the stampede. Kaedra teaches whether she walks or waits, and gives her coat either way.
7. Kaedra +1 at the `forage` key; the +3 comes at the forage fight's win (always reached, or the game is lost).
8. The Witness question is Yelt's, at the fire with the ledger closed. The `commander` answer names the Commander as the one who asked for them; nothing he says is heard.
9. The spear's real number is +3 damage, a step over Ch 2's escort spear.
