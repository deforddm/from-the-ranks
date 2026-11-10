Tue Nov 10, 2026, 12:29 PM PST. Book Ten, Chapter 1, "Missing Is Not Dead" (`src/181_b10_ch1.js`, art `src/181b_b10_ch1_art.js`, test `tools/b10ch1_test.mjs`), against the Book Ten engine on `book10` (v13.0.0, not shipped).

# Chapter 1 notes: Missing Is Not Dead

The Third, with the Bonehunters' heavies, in the retreat camp after the short-tails. Burying and counting; the allies coming in (seen from a rise, never met); news only: the Adjunct on her feet, then two of the missing walked back in with a handful of the dead Imass ("the mage and the captain who went in alone"; Marrow's "missing is not dead" comes true); the officers' parley as lamps in a big tent; camp word after: east into the glass, the allies south; the first night march to the glass's edge.

## Shape

- **Areas (3):** `b10_c1_lines` (the burial lines by day; the first area), `b10_c1_camp` (the camp by day), `b10_c1_night` (the camp by night: the burial lines west, the sappers' wells east, the big tent north; dark). All on `b10_c1_camp` ground.
- **Nodes:** 53 `b10_c1_*` (the reading's two included).
- **Phases** (`S.f.b10_c1_ph`): 1 the day (set at `b10_c1_start`); 2 the night of the lamps (set at the fire's "Dusk", needs the strippers done and Thallo's news); 3 the night after the key (set by the key).
- **The order a player meets things:** the burial lines (the first halt): the clerk's slate and Pruss; the trestle (the slate item); Thallo (the strippers; he is not eating); the heavies' sergeant's roll over a grave (the trick); the sappers' spade cart; the upturned barrel (the reading); the strippers at the east edge (main fight). The camp: the rise (the allies), the long tents (a might check, a salve), the captain seen, the old marine (the Adjunct on her feet, the reading), the heavies sparring (optional), Thallo's news (the officers sit tonight), the fire, dusk. The night: the camp word of the two who walked back in; the big tent and the clerk at its door (the camp word); Thallo's word and the key; the night's work (names or water); the fire and the beat; dusk again, and the march.
- **The fire** `b10_c1_fire` (id kept for the games pass): `witnessHTML()` in every phase; a rest once by day and once by night; the talk (a line by day and a line by night for every soldier the Third can field: Haddat, Sathi, Tangle, Marrow, Mirrel, Doss, Wenna, Mehet, Ottar, Tallow, Hessa, Tebbet, Darrut, Yorin, Rasp, Orvas, Ramin, Keth, Brask, Tegra, Pruss: `B101TALK`); the reading by day; the beat (phase 3, after the night's work); the way on (dusk, then the march); "Not now". The engine adds the roster.
- **The reading:** `B10READ[1]` is redefined with getters (the same `where`, `back`, `backT`, `say`): by night 180c's worked example unchanged (scene `b10_c1_linesn`); by day "Afternoon at the burial lines …" on `b10_burial`. Offered at the first halt, the barrel, the old marine, and the fire by day.

## The key `b10_c1_key` (the night of the lamps)

From Thallo at the fire (`b10_c1_thallo_night`), once the camp word is out (`S.f.b10_c1_word`, heard from the clerk or `later`). `witnessHTML()` shown; Pruss, Haddat and Tangle have lines. "Not yet" steps back.

- **`names`**: `S.f.b10_c1_names = 1`, **Haddat +1, Marrow +1** (at the key). The burial lines by night: robbers in the last trench (`b10_c1_graves`); then every name on the clerk's slate said over the trench, a wits 19 check with **`witness:true`**; made or missed, the names are said (`S.f.b10_c1_named` = `said` / `clerk`) and **`b10Witness(1, 'every name said')`** once.
- **`water`**: `S.f.b10_c1_water = 1`, **Tangle +1, Pruss +1** (at the key). The sappers' wells all night: a might 19 check at the bottom of the chain; made or missed, the barrels are full by grey light (`S.f.b10_c1_waterDone` = `kept` / `slow`). No Witness move.
- **Read later (the brief):** Ch 3 and Ch 5 (`b10_c1_water` waives that chapter's thirst once), Ch 7 (fate pages). `S.f.b10_c1_names` is the brief's shared flag for Ch 7.

## Witness (this chapter)

Start 5 (fresh) or 2–8 (Book Nine). Moves: the big tent's "yes, but" **−1** ("the plan, and no why"; only on a near roll; the chapter's one "yes, but" cost); `names` **+1** once; the beat **±1**. Fresh range after the chapter: **names 4–7, water 3–6** (the brief's 4–7, one lower at the bottom on water with a doubt and the near roll). No other move. **No thirst** (the brief).

## The beat (c1)

At the fire after the night's work (phase 3, `b10_c1_beat`), offered on the fire until answered. "Why are we still here?" — "Each other" (`kept`, `S.f.b10_c1_beat = 'each'`), "Because she's on her feet, and she gave her word, whatever it is" (`kept`, `word`), "Nobody's said. So nothing." (`doubt`, `nothing`), and "Not now" (records nothing). Never Tavore's words; no sergeant's speech.

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b10_c1_key` | `names` / `water` | Thallo at night |
| `b10_c1_names` | 1 on `names` | the key (shared flag) |
| `b10_c1_water` | 1 on `water` | the key (shared flag; waives Ch 3's and Ch 5's thirst once) |
| `b10_prussDone` | 1 walks / 2 waits | the clerk's slate (engine flag) |
| `b10_c1_named` | `said` / `clerk` | the names over the last trench ('names') |
| `b10_c1_waterDone` | `kept` / `slow` | the wells ('water') |
| `b10_c1_beat` | `each` / `word` / `nothing` | the beat (also `S.b10.beat.c1`) |
| `b10_c1_word` | `heard` (from the clerk) / `later` | the big tent |
| `b10_c1_rollOk` | 1: the heavies' roll learned (the trick) | the burial lines |
| `b10_c1_missing`, `b10_c1_news`, `b10_c1_allies` | 1: the two who walked back in; the Adjunct on her feet; the allies seen | night arrival; Thallo; the rise |
| `b10_c1_stripDone`, `b10_c1_gravesDone`, `b10_c1_sparDone` | 1 | the fights' after-nodes |
| `b10_c1_prussSquad` | 1: Pruss told his squad (Haddat took the six names, if she walks) | Pruss |
| `b10_c1_slate`, `b10_c1_spade`, `b10_c1_carried` | 1 | the trestle, the spade cart, the long tents |

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b10_c1_strippers` | the east edge of the burial ground, then the wash behind | `b10_scav` ×3, `b10_scavbow`; stage 2 `b10_scavchief`, `b10_scav` | 380 + 170 | **main, the Third's first fight (target near 100%)**; one `b10_regular` ally. Approach: straight, or guile 19 along the spoil heaps (surprise; "yes, but" a knee) |
| `b10_c1_graves` | the burial lines by night (dark) | `b10_scav` ×2, `b10_scavbow` | 100 | on `names`; guile 19 approach ("yes, but" loose spoil) |
| `b10_c1_spar` | behind the heavies' wagons | `b10_c1_sparrer` ×3, wave of 2 at round 2 | 120 | optional, **survive 4** (target near 100%), wooden swords; death checks still run |

Own foe: `b10_c1_sparrer` (Sparring heavy, `b2soldier`, hp 46, ac 16, atk 12, 1d4+2). Battle xp is paid at `XPK` (.6): the strippers alone pay 330, so **every road reaches level 25** (the test ends at 7682 xp on `names` with the spar). **Balance not run** (the lead's instruction: no `balance.mjs` on this machine); numbers are the engine's foes at their first values.

## The trick: Every Name (`b10_c1_roll`)

A grey sergeant of the heavies calls the roll over each trench: the dead first, each answered "here" by the soldier beside, then the living, each for themselves, stepping into the gaps. A ✦ wits 21 check at `b10_c1_roll`; edges: the Roll at the Gate (Book Nine's `b9_c1_rollcall`, +2 to its bearer, and the sergeant if anyone carries it), the Fourteenth's musters (the sergeant +1), Pruss (+2), Brask (+2), Haddat's nightly names (+1), Tangle's counting (+1), Ottar's sung Perish dead (+1); Sathi and Tallow −1. Copies **the Khundryl Paint** (`b2_paint`): the bearer and squadmates beside +2 to hit, enemies within 2 −3, and from trick level 2 the nearest loses its nerve. **Free** (`free:true`, its words end on the one-free-trick line). Not sorcery.

## Items (each with art, 181b; Book Ten's ground)

- `b10_c1_scale` (armour, mail, **ac 3, hp 5**): a heavy's scale in the strippers' handcart; the clerks find no name; the quartermaster: "Living wear what the dead leave."
- `b10_c1_spade` (weapon, heavyweapon, atk 1, 1d10+4): a sapper's spade filed to an edge; "we've more spades than sappers now".
- `b10_c1_slate` (trinket, any, hp 2, wits +1): a clerk's slate of one squad's names, copied into the rolls and not wiped (Pruss's six are on it). Given at the trestle once Pruss is settled (walking or waiting).

## Pruss (the recruit)

Joins at the first halt off the clerk's slate (`b10Join('pruss')`; waits at the heavies' baggage when six walk, and can join later from his node). His squad held a stretch by a dry wash; he was sent back for water and came back to nothing; he carries his old sergeant's helm. Lines behind `b10In('pruss')` at the fire (both phases), the key, the end (both roads), and most scenes (24 of 53 nodes name him when he walks; the core average is 4). `recruit_scan`'s ABSENT lists his own two pre-join scenes, as Book Nine's Brask.

## The 'south' road

Thallo's key speech adds that the Third is lent out to the Commander's column as drill-sergeants (Book Seven's `army` road set-up). The burial lines, the fights and the key are the same; the fire's and the east edge's way on, and the last scene (`b10_c1_onward` on `b10_train`), walk across the camp to the Letherii wagons. `endCap` follows.

## Named inventions

- **Thallo** (Book Nine's; drawn by 161b): not eating, his bread given to the long tents for his drill sergeant, who will not eat; eats again in phase 3.
- No new names. Unnamed by role: the Adjunct's clerk at the first trench, the clerk at the big tent's door, the heavies' captain (seen, never speaks to the sergeant), the grey sergeant of the heavies (the roll), a sapper at the spade cart, the surgeon with the shaved head (she), the sappers' sergeant at the wells (she), the sparring sergeant, a regular from the next detail (the strippers' ally), the strippers' broad man, the old marine (the Deck's third reader), the quartermaster.

## Canon points and hard limits

- Never on the page: the Adjunct's tent, Deadsmell, anyone made captain, the grieving sapper, Bottle or Ruthan Gudd seen or named, the parley's words, Masan Gilani, Krughava's and Stormy's offers, the High Mage, Kalam. The Unbound are "the dead Imass", camp word only ("the soldiers say"); the narrator never puts them at the column's head.
- "She means to free the chained god" said once (the clerk, `b10_c1_word_ok`); "the Glass Desert" named once (the clerk, as the allies' officers' word). "Bonehunters" not used. No count of days; "tenday" removed.
- The allies arrive "on the horizon" by day (WC3 has them the day after the battle; Book Nine's Ch 7 has the retreat camp "days after"; the chapter says neither).
- **Unsure:** whether the Khundryl's remaining riders were camped apart from the Bonehunters before the crossing (written as "off to one side, on their own"), and whether the Bolkando came with the Perish to this camp (WC3 says Abrastal's Evertine legion did).

## For Chapter 2's writer, and the lead

- The Letherii's one line of the Third: the Third stood the burial lines (`names`) or the wells (`water`); on a Third `south`, the Third walked over to the Letherii wagons at dusk as lent drill-sergeants ("a Letherii officer with a ledger … waiting for the drill-sergeants he was promised"; Ennic or Yelt may claim the role).
- The chapter ends at the glass's edge at grey light (`adjunct`): Ch 2's parting can be that same morning.
- **`trope_test` fails on B10, and did before this chapter:** 180 and 180c open 20 sentences on Nobody/Somebody in about 5,200 words (budget 14 per 10k). This chapter has 4 in 8,150 words; the book's total is 24 of about 19 allowed. Not mine to edit (180*); the lead should trim the engine's, or later chapters will carry it.
- `lint`: 0 errors; three style warnings for `b10_c1_camp` (the same warning every Book Nine chapter style gets).

## Tests (Tue Nov 10, 2026)

`python3 build.py`; `node --check` on both files; `node tools/lint.mjs` 0 errors; `tools/b10ch1_test.mjs` all ok (fresh start, both keys from the same moment, the 'south' road, a --from=1 transfer save); `b10engine_test` 21/21; `los_test` ok; `recruit_test` ok; `roster_test` ok; `reading_test` ok; `trope_test` fails on B10 (above). Not run (the lead's instruction): `run_all`, `balance`, `play.mjs`.
