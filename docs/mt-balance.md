Thu Oct 29, 2026, 3:55 PM PDT. Book Five balance on v8.0.0 (branch `book5`, not shipped): TUNED. David's decisions of Thu Oct 29, 2026, 1:42 PM PDT.

# Book Five balance (Midnight Tides, *Indebted*)

## David's decisions

1. A Book Five-only Bridgeburner boost, like Book Four's `B4GAP`, tuned so Bridgeburner lands about 75–80% won before the gods. Books One to Four must not change.
2. Soften Chapter 7's barricade for Soldier, so a smart Soldier wins it every time (it lost one run in twelve).
3. Keep Soldier's late-book row (`SOLDIER_LATE.mt`, Book Two's), the cap (Soldier never harder than Bridgeburner), and the mortal fight's weight, bringing its win rate into the band.
4. The fate-page slip: a recruit waiting at High Fort (Ch 4) or Brans Keep (Ch 6) was credited with the rampart or the crossing. Fixed (below).

## What changed

1. **`B5GAP`** (src/80_book5.js): Bridgeburner only, Book Five only (`S.book === 'mt'`), on top of everything else (`FSCALE`, `DIFFS`): a row per chapter, `{ac +, atk +, hp ×, dmg +}`, and **`B5GAP_FIGHT`**, a fight's own row in place of its chapter's. Book Four's table is per chapter; Book Five needs both, because its chapters mix small fights the squad walks through with one or two main fights: one row per chapter left the small fights at 100% and broke the main ones (trial A below).

| Ch | chapter row (the fights without their own) | fights with their own row |
|---|---|---|
| 1 | armour +2, to hit +1, health ×1.45, damage +2 (cutpurses, lane) | lowwalk +1, +1, ×1.2, +1 · tavern +0, +0, **×0.92**, +0 |
| 2 | +3, +3, ×1.7, +3 (tide) | looters +3, +3, ×1.7, +3 · wreckers +1, +1, ×1.3, +1 · hulk +0, +1, ×1.15, +1 |
| 3 | +3, +3, ×2.0, +4 (deserters, cheer) | rivermen +1, +1, ×1.15, +1 · bank +2, +2, ×1.6, +3 |
| 4 | +2, +2, ×1.6, +3 (gully) | wraiths +2, +2, ×1.5, +3 · demon +1, +1, ×1.4, +2 · wolves +2, +2, ×1.6, +4 |
| 5 | +3, +3, ×2.0, +4 (press, factor) | farm +3, +3, ×1.6, +3 · wagons +2, +2, ×1.7, +3 |
| 6 | +3, +3, ×2.0, +4 (shore) | hills +2, +1, ×1.4, +2 · flight +1, +1, ×1.4, +2 · channel (mortal) +2, +1, ×1.4, +2 |
| 7 | +3, +3, ×2.0, +4 (court) | looters +3, +3, ×1.85, +4 · wolves +1, +1, ×1.25, +1 · barricade +0, +1, ×1.05, +0 |

   The tavern (Ch 1) was the one fight already under the band as built (about 62% won over six measurements with no row); its row eases it a little, and measured 90% after it (20 runs), so it now sits at the band's top.
2. **`B5SOFT`** (src/80_book5.js): Soldier only, Book Five only, per fight. One entry: **`b5_c7_barricade` health ×0.85, to hit −1, damage −1** (both grounds), which takes back about what Soldier's late extra (×1.2, +1, +1) adds there. `SOLDIER_LATE.mt` is unchanged.
3. Nothing else: Story, `DIFFS`, `FSCALE`, `SOLDIER_LATE`, Books One to Four and every fight's foes are as they were. `b5balance_test` proves the B5 rows touch no foe outside Book Five and none on Story or Soldier (bar the barricade), and `soldier_test` now covers Book Five's Soldier row and the cap.

## How it was measured

`node tools/balance.mjs --book=mt [--diff=bridgeburner] [--nogear] [--squad=a,b] [--lvl=K]` (the harness, taught Book Five this session):

- **State per fight:** a fresh Book Five squad (the sergeant, Tobet, Thegg, Perrit, Ammet), Chapter K at level min(7, K + 1) (the brief's curve: "7 after Ch 6", so Chapter 7 is fought at 7), the level-3 talent and the veteran picks, every gear item the earlier Book Five chapters hand out (auto-placed), Book Five's start satchel (two salves, no munitions), a tile from `B5POOL[K]`. Full health, first attempt, no gods.
- **The smart player** is the harness's, with **Ammet played as the healer** (she stays back and mends; the chapter writers' runs did not know she was one). At most one salve a fight.
- **Runs:** before, 16 a fight a difficulty; after, Soldier 16 and Bridgeburner 20 a fight. At 20 runs a single fight swings about ±10 points; a chapter about ±5. A two-ground fight is one fight; a loss on the second ground is a loss.
- **"lost"** is the mean share of the squad's total health lost, over the fights won.
- No recruits (Brune, Ruuk and Pessa are optional), as the books before.

## Every fight, before → after

| Ch | Fight | Soldier win | lost | Bridgeburner win | lost |
|---|---|---|---|---|---|
| 1 | cutpurses | 100% → **100%** | 11% → 10% | 100% → **85%** | 19% → 38% |
| 1 | lane (hold 4) | 100% → **100%** | 21% → 22% | 100% → **100%** | 26% → 59% |
| 1 | lowwalk | 100% → **100%** | 23% → 15% | 100% → **55%** | 27% → 41% |
| 1 | tavern | 100% → **100%** | 23% → 25% | 69% → **90%** | 50% → 32% |
| 2 | looters | 100% → **100%** | 7% → 7% | 100% → **85%** | 9% → 45% |
| 2 | tide (hold 4) | 100% → **100%** | 12% → 8% | 100% → **90%** | 18% → 68% |
| 2 | wreckers | 100% → **100%** | 15% → 12% | 100% → **85%** | 24% → 41% |
| 2 | hulk | 100% → **100%** | 25% → 15% | 100% → **60%** | 31% → 39% |
| 3 | deserters | 100% → **100%** | 6% → 5% | 100% → **100%** | 7% → 26% |
| 3 | bank | 100% → **100%** | 6% → 6% | 100% → **65%** | 10% → 21% |
| 3 | cheer (hold 4) | 100% → **100%** | 12% → 9% | 100% → **90%** | 21% → 67% |
| 3 | rivermen | 100% → **100%** | 32% → 13% | 100% → **75%** | 32% → 23% |
| 4 | gully | 100% → **100%** | 9% → 10% | 100% → **85%** | 12% → 41% |
| 4 | wraiths | 100% → **100%** | 18% → 28% | 100% → **95%** | 40% → 17% |
| 4 | demon | 100% → **100%** | 27% → 12% | 94% → **70%** | 38% → 49% |
| 4 | wolves | 100% → **100%** | 10% → 8% | 100% → **60%** | 12% → 46% |
| 5 | press (hold 4) | 100% → **100%** | 11% → 9% | 100% → **100%** | 14% → 53% |
| 5 | wagons | 100% → **100%** | 4% → 4% | 100% → **85%** | 3% → 29% |
| 5 | farm | 100% → **100%** | 6% → 18% | 100% → **75%** | 21% → 45% |
| 5 | factor (hold 4) | 100% → **100%** | 11% → 10% | 100% → **100%** | 12% → 49% |
| 6 | shore | 100% → **100%** | 7% → 5% | 100% → **75%** | 6% → 31% |
| 6 | hills | 100% → **100%** | 11% → 9% | 100% → **75%** | 13% → 40% |
| 6 | flight | 100% → **100%** | 16% → 13% | 100% → **85%** | 15% → 40% |
| 6 | channel (mortal) | 100% → **100%** | 13% → 13% | 100% → **65%** | 25% → 40% |
| 7 | looters | 100% → **100%** | 5% → 8% | 100% → **75%** | 7% → 36% |
| 7 | court (hold 4) | 100% → **100%** | 7% → 6% | 100% → **100%** | 8% → 37% |
| 7 | wolves | 100% → **100%** | 20% → 15% | 100% → **85%** | 20% → 37% |
| 7 | barricade | 100% → **100%** | 20% → 15% | 100% → **65%** | 28% → 34% |

## By chapter

| Ch | Soldier win (before) | Bridgeburner win (before) | Bridgeburner, fights to be won by killing (before) |
|---|---|---|---|
| 1 | 100% (100%) | 83% (92%) | 77% (90%) |
| 2 | 100% (100%) | 80% (100%) | 77% (100%) |
| 3 | 100% (100%) | 83% (100%) | 80% (100%) |
| 4 | 100% (100%) | 78% (98%) | 78% (98%) |
| 5 | 100% (100%) | 90% (100%) | 80% (100%) |
| 6 | 100% (100%) | 75% (100%) | 75% (100%) |
| 7 | 100% (100%) | 81% (100%) | 75% (100%) |
| book | 100% (100%) | 81% (99%) | 77% (98%) |

"Fights to be won by killing" leaves out the six hold-out fights (hold four rounds: lane, tide, cheer, press, factor, court). They end at round four whatever the foes have left, so a squad loses one only by going down entirely: 90–100% won on Bridgeburner even at the chapter's heaviest row, carrying 37–68% health lost.

**Bridgeburner: 81% across the book, 77% of the fights won by killing** (before: 99% / 98%). Chapters 75–90%; single fights 55–100% (the main and key fights 60–75%, as in Book Four, whose single fights ran 31–100%). Health lost in won fights rose from 3–40% to 17–68%.

**Soldier: 100% on every fight, before and after** (16 runs each), 4–28% lost. The changes leave Soldier untouched except the barricade.

## The barricade on Soldier (Ch 7)

The chapter writer's 92% (one run in twelve lost) was at level 7 with no gear. Measured the same way before the change: **94% (32 runs), 27% lost**. After `B5SOFT`: **100% (40 runs), 14% lost, a squadmate down in 13% of fights**. With the earlier chapters' gear: 100% before and after (16 runs each).

## The mortal fight (Ch 6, `b5_c6_channel`)

| | won | won fights with a death |
|---|---|---|
| Soldier, before | 100% (16) | 0 of 16 |
| Soldier, after | 100% (16) | 0 of 16 |
| Bridgeburner, before | 100% (16) | 0 of 16 |
| Bridgeburner, after | 65% (20) | 1 of 13 |

Its row went through five measurements at or near this weight (63–90% won, at ±0.05 health and ±1 armour), about 75% pooled: the book's band. The chapter writer saw a death in about one Bridgeburner fight in six without Ammet played as a healer; with her mending, deaths in won fights stay rare (one in thirteen here). Its foes are the Edur warriors and unblooded the chapter set; nothing else about it changed.

## The fate pages (Ch 7 finale)

`b5MarkWalked(n)` (src/80_book5.js) writes `S.f.b5_c4_walked` / `S.f.b5_c6_walked`, the ids walking (sergeant included, the dead left out), when Chapter 4's or Chapter 6's key is chosen (84, 86) and again when the key's fight starts (`B5_WALKED_AT`: `b5_c4_demon`, `b5_c4_wolves`, `b5_c6_channel`, `b5_c6_flight`; a "Not now" between key and fight may bring a waiting recruit in at a fire). In 87, `b57HighFort` / `b57Channel` credit the rampart (or the wood) and the crossing (or the fallback) only to those in the record; anyone else gets "At High Fort {name} was back with the company's followers, not on the west rampart (with the squad in the wood), and came south after the squad." / "At Brans Keep {he/she} waited behind the lines with the company's followers, and was not at the crossing (with the squad on the channel)." A save from before this change has no record and credits everyone, as before.

## Trials (12 runs a fight unless said, Bridgeburner)

| Trial | rows | book won |
|---|---|---|
| A | every chapter +2, +2, ×1.5, +3 | 64% (main fights 0–25%: the tavern 25%, the low walk 0%, the hulk 8%, the barricade 0%) |
| B | every chapter +1, +1, ×1.2, +1 | 89% |
| C | every chapter +1, +1, ×1.35, +2 | 82% (small fights still 100%, the barricade 17%) |
| D–G | per-chapter rows with per-fight rows (16 runs for G) | 85%, 86%, 83%, 79% |
| H, I | the table above, two rounds (20 runs) | 83%, 83% (I's non-hold fights 79%) |

## Off target, honestly

- At 20 runs single fights are noisy (the low walk measured 55–85% at the same row over seven trials). The book and chapter means are the numbers to trust.
- The hold-out fights stay near 100% on Bridgeburner; they cost health (37–68%), not wins.
- The harness starts every fight at full health. On Bridgeburner wounds carry from fight to fight until the squad rests, so a player who fights the small fights first will find the main fights harder than these numbers.
- Not measured: the recruits walking (a six-strong squad), a squad without the earlier gear on Bridgeburner, Nerve, and the gods (the target is "before the gods").
