Wed Oct 21, 2026, 2:38 PM PDT. Book Four balance on v7.0.0 (not shipped): TUNED (branch b4-tune). The first measurement, as built, is kept below it as the "before".

# Book Four balance (House of Chains, *Unblooded*)

## Tuned, Wed Oct 21, 2026 (David's targets, 1:02 PM PDT)

David: the measured book "sounds too easy overall, death should still be a possibility even on soldier." Targets: Soldier, the smart bot wins ~85–95% of first attempts a fight, losing 30–50% health; Bridgeburner ~65–75%; Ch7's mortal fight kills a squadmate in ~15–25% of Soldier runs, and on Bridgeburner on the forward road ≤ 0.8 dead a won fight.

**What changed.**
1. **`B4GAP` rows** (src/70_book4.js), Bridgeburner's side:

| Ch | armour | to hit | health | damage | Soldier-only extra (`s`) |
|---|---|---|---|---|---|
| 1 | +7 | +4 | ×1.8 → **×1.85** | +6 | health ×1.08, damage +1 |
| 2 | +6 | +4 | ×1.7 → **×1.8** | +5 → **+7** | health ×1.2, to hit +1, damage +1 |
| 3 | +5 | +4 | ×1.55 → **×1.75** | +4 → **+6** | health ×1.2, to hit +1, damage +2 |
| 4 | +6 | +4 | ×1.5 → **×1.95** | +5 → **+7** | health ×1.2, to hit +1, damage +2 |
| 5 | +5 | +2 | ×1.35 → **×1.5** | +4 → **+5** | health ×1.2, to hit +1, damage +2 |
| 6 | +5 | +2 | ×1.25 → **×1.47** | +4 → **+6** | health ×1.2, to hit +1, damage +2 |
| 7 | +5 | +1 | ×1.25 → **×1.5** | +4 → **+6** | health ×1.2, to hit +1, damage +2 |

2. **A Book-Four-only Soldier adjustment** (the `s` column): applied in the `B4GAP` `mkFoe` wrap only when `S.diff` is Soldier, so Books One–Three and the global `DIFFS` are untouched. Why: as built Bridgeburner was near its old target and Soldier trivial, and the global Soldier/Bridgeburner gap (×1.25 health, ×1.2 wounds, +1 to hit) is too wide for David's new pair of targets; one `B4GAP` row cannot put both in band.
3. **Ch7's `b4_c7_breakout` on the forward road** (`b4_saw` close, src/77_b4_ch7.js): the extra `b4_c7_fleer` is dropped and "nearer" is one row, not two; it still begins a round sooner. With the tuned rows, the old wrap killed 3.5 a won fight on Soldier (13% won) and 5 on Bridgeburner (6% won).

**Final numbers** (16 runs a fight a difficulty, the method below; "lost" is over won fights):

| Ch | Fight | Soldier win | lost | Bridgeburner win | lost |
|---|---|---|---|---|---|
| 1 | brawl | 81% | 21% | 69% | 40% |
| 1 | dig | 88% | 30% | 75% | 48% |
| 1 | runners | 100% | 15% | 94% | 33% |
| 1 | watch | 88% | 24% | 63% | 36% |
| 2 | hill | 88% | 32% | 75% | 34% |
| 2 | probe | 69% | 41% | 56% | 30% |
| 2 | robbers | 100% | 40% | 63% | 28% |
| 3 | brawl | 100% | 40% | 100% | 41% |
| 3 | poles | 100% | 28% | 75% | 28% |
| 3 | raiders | 94% | 27% | 94% | 34% |
| 3 | scavengers | 100% | 32% | 94% | 32% |
| 4 | lancers_brawl | 100% | 24% | 100% | 26% |
| 4 | picket | 69% | 38% | 50% | 39% |
| 4 | wagons | 94% | 39% | 69% | 26% |
| 4 | wounded | 100% | 26% | 75% | 35% |
| 5 | deserters | 100% | 24% | 94% | 24% |
| 5 | rearguard | 81% | 20% | **31%** | 43% |
| 5 | seep | 81% | 22% | 63% | 27% |
| 5 | wallriders | 100% | 25% | 81% | 21% |
| 6 | dusk | 100% | 22% | 94% | 27% |
| 6 | nest | 94% | 23% | 69% | 27% |
| 6 | outpost | 100% | 24% | 75% | 34% |
| 6 | patrol | 100% | 25% | 94% | 33% |
| 7 | breakout | 100% | 23% | 81% | 30% |
| 7 | outriders | 94% | 20% | 75% | 31% |
| 7 | spur | 81% | 24% | 56% | 33% |

| Ch | Soldier win (before) | lost (before) | Bridgeburner win (before) | lost (before) |
|---|---|---|---|---|
| 1 | 89% (96%) | 22% (28%) | 75% (82%) | 39% (41%) |
| 2 | 85% (100%) | 38% (17%) | 65% (97%) | 31% (28%) |
| 3 | 98% (100%) | 32% (15%) | 91% (99%) | 34% (33%) |
| 4 | 91% (100%) | 31% (24%) | 73% (97%) | 31% (45%) |
| 5 | 91% (100%) | 23% (16%) | 67% (88%) | 26% (46%) |
| 6 | 98% (100%) | 24% (17%) | 83% (97%) | 30% (36%) |
| 7 | 92% (100%) | 22% (15%) | 71% (100%) | 31% (15%) |

**The mortal fight** (16 runs): normal road, Soldier 100% won with no deaths, Bridgeburner 81% won with no deaths. Forward road (as now built): Soldier 100% won, 0.56 dead a won fight, a death in 44% of won fights; Bridgeburner 81% won, 1.92 dead a won fight (85%).
**Transfer squad**, Ch5 seep, Soldier: 100% (12), 20% lost (the easier road, as allowed).

**Where it is off target, honestly.** Soldier wins sit in band (85–98% a chapter; single fights 69–100%), but health lost is 20–25% from Ch5 on, under the 30–50% asked: the late gear (see "How much the gear does") flattens it, and pushing it up would cost more Soldier wins first. Ch3 and Ch6 are easy on Bridgeburner (91% and 83%); Ch5's rearguard (31%) and Ch4's picket (50%) are hard outliers. The mortal fight's deaths are inverted from what David asked: none on the normal road, too many on the forward road (Bridgeburner 1.9 a won fight against ≤ 0.8 asked). These were left at the time budget; next levers, untested: Ch3 health ×1.75 → ×1.85 and Ch6 ×1.47 → ×1.55; one fewer foe in the rearguard; on the forward road, drop "a round sooner" for the wave too (keep the nearer row); for Soldier deaths on the normal road, a Ch7-only Soldier `s` damage +3.

---

# Before: as first measured (12:57 PM PDT, no change made)

Every number in this part is the first measurement; the proposals at its end were superseded by the tuning above.

## How it was measured

`node tools/balance.mjs --book=hoc [--diff=bridgeburner] [--transfer] [--flags=b4_saw:close] [--nogear] [--patch=f.js]` (the Book One harness, taught Book Four behind `--book=hoc`; without it Books One to Three run exactly as before).

- **State per fight:** a fresh-start squad (sergeant, Haddat, Tangle, Marrow, Tallow) at the chapter's level (chapter K = level K + 7), Book Three's veteran picks for the levels passed, every gear item the earlier Book Four chapters hand out (auto-placed by `allocateGear`), Nerve 5, the chapter's Dust (`B4DUST`; a fight's own `dust` still wins), a card drawn from `B4POOL[K]`, Book Four's start satchel, and **Orvas walking from Chapter 3 on**. Full health, first attempt, no gods' boons.
- **The smart player** is `balance.mjs`'s, with three Book Four additions: Marrow is played as the healer (stays back, mends), every shield-basher uses Shield bash (not only Brisk), and Orvas and Ramin use Lance Held Short. It spends at most 2 munitions, 1 cusser and 1 salve a fight.
- **Runs:** 40 per fight per difficulty (24 for the trial patches), 26 fights x 2 difficulties. A fight's two grounds (`stage2`) are one fight; a loss on the second ground is a loss.
- **"lost"** is the mean share of the squad's total health lost, over the fights won.
- Every key branch's fights are separate battles and all are in the table. The one branch that changes a fight in place, Ch7's breakout on Ch6's forward road (`b4_saw` close), is measured separately below.

## Every fight, as built (B4GAP unchanged)

| Ch | lvl | Fight | Soldier win | lost | rounds | downs | Bridgeburner win | lost | rounds | downs |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 8 | runners | 100% (40) | 15% | 6.4 | 0.1 | 95% (40) | 30% | 8.2 | 0.8 |
| 1 | 8 | dig | 95% (40) | 36% | 12.3 | 0.9 | 70% (40) | 53% | 16.3 | 3.1 |
| 1 | 8 | watch | 100% (40) | 24% | 11.8 | 0.5 | 83% (40) | 36% | 15.2 | 1.8 |
| 1 | 8 | brawl | 88% (40) | 35% | 11.8 | 1.2 | 78% (40) | 45% | 14.0 | 2.1 |
| 2 | 9 | robbers | 100% (40) | 18% | 9.6 | 0.2 | 98% (40) | 28% | 11.7 | 0.7 |
| 2 | 9 | probe | 100% (40) | 15% | 8.8 | 0.1 | 98% (40) | 28% | 11.3 | 0.8 |
| 2 | 9 | hill | 100% (40) | 17% | 9.8 | 0.1 | 95% (40) | 29% | 12.2 | 0.9 |
| 3 | 10 | raiders | 100% (40) | 13% | 9.3 | 0.1 | 98% (40) | 32% | 12.9 | 1.2 |
| 3 | 10 | brawl | 100% (40) | 20% | 4.0 | 0.1 | 100% (40) | 31% | 4.0 | 0.9 |
| 3 | 10 | scavengers | 100% (40) | 14% | 9.7 | 0.0 | 98% (40) | 40% | 13.2 | 1.9 |
| 3 | 10 | poles | 100% (40) | 13% | 8.9 | 0.0 | 100% (40) | 30% | 12.4 | 1.4 |
| 4 | 11 | wagons | 100% (40) | 26% | 9.7 | 0.7 | 98% (40) | 49% | 11.8 | 2.4 |
| 4 | 11 | lancers_brawl | 100% (40) | 16% | 4.0 | 0.1 | 100% (40) | 21% | 4.0 | 0.2 |
| 4 | 11 | wounded | 100% (40) | 27% | 9.6 | 0.7 | 95% (40) | 50% | 12.1 | 2.1 |
| 4 | 11 | picket | 100% (40) | 25% | 10.2 | 0.3 | 95% (40) | 60% | 14.9 | 2.6 |
| 5 | 12 | wallriders | 100% (40) | 15% | 10.7 | 0.0 | 88% (40) | 47% | 15.8 | 2.5 |
| 5 | 12 | seep | 100% (40) | 16% | 11.8 | 0.2 | 95% (40) | 45% | 16.7 | 2.6 |
| 5 | 12 | rearguard | 100% (40) | 17% | 11.9 | 0.1 | 78% (40) | 45% | 17.5 | 3.4 |
| 5 | 12 | deserters | 100% (40) | 16% | 10.8 | 0.1 | 90% (40) | 45% | 15.6 | 2.4 |
| 6 | 13 | nest | 100% (40) | 16% | 10.4 | 0.3 | 98% (40) | 28% | 13.9 | 1.4 |
| 6 | 13 | dusk | 100% (40) | 17% | 10.1 | 0.1 | 98% (40) | 43% | 13.8 | 1.6 |
| 6 | 13 | patrol | 100% (40) | 14% | 9.9 | 0.1 | 100% (40) | 26% | 13.1 | 1.1 |
| 6 | 13 | outpost | 100% (40) | 21% | 11.5 | 0.3 | 90% (40) | 47% | 16.1 | 2.7 |
| 7 | 14 | outriders | 100% (40) | 14% | 11.4 | 0.0 | 100% (40) | 15% | 14.4 | 0.1 |
| 7 | 14 | breakout | 100% (40) | 14% | 10.7 | 0.0 | 100% (40) | 15% | 13.8 | 0.1 |
| 7 | 14 | spur | 100% (40) | 16% | 11.7 | 0.1 | 100% (40) | 16% | 14.9 | 0.9 |

**Headline.** Soldier: 100% on 24 of 26 fights; Ch1's dig 95% and brawl 88% (both lost on the second ground, carrying stage-one wounds). Health lost on Soldier is 13–18% on 18 of the 26: light from Chapter 2 on, below the 20–45% band everywhere except Ch1 and Ch4. Bridgeburner: Ch1 70–95% (on target, a little hard on the dig); Ch2–Ch4 95–100%; Ch5 78–95%; Ch6 90–100%; Ch7 100% with 15% lost. Book Four is too easy from Chapter 2 on, on both difficulties.

## The mortal fight (Ch7, \`b4_c7_breakout\`)

| Variant | Soldier won | dead per won fight | won fights with a death | Bridgeburner won | dead per won fight | won fights with a death |
|---|---|---|---|---|---|---|
| as built, normal road | 100% (40) | 0.00 | 0% | 100% (40) | 0.00 | 0% |
| as built, forward road (\`b4_saw\` close) | 100% (40) | 0.03 | 3% | **85% (60)** | **1.63** | **73%** |
| trial P3 (below), normal road | 100% (24) | 0.17 | 17% | 88% (24) | 1.00 | 57% |
| trial P3 + forward road without the extra fleer | — | — | — | 100% (40) | 1.07 | 60% |

The forward road is the outlier: on Bridgeburner it kills one or two squadmates in most fights, against none on the normal road. The bot heals late and never retreats a dying squadmate, so a careful player will lose fewer; the gap between the roads is still real.

## The transfer squad (sgt, Haddat, Sathi + Hackle, Tangle, Marrow, Ramin; Book Two's gear as well)

| Fight | Soldier won | lost | rounds | Bridgeburner won | lost | rounds |
|---|---|---|---|---|---|---|
| Ch2 hill | 100% (40) | 8% | 7.0 | 100% (40) | 11% | 8.1 |
| Ch5 seep | 100% (40) | 15% | 7.8 | 100% (40) | 18% | 9.3 |
| Ch7 breakout | 100% (40) | 20% | 7.3 | 100% (40) | 22% | 8.9 |

Six squadmates, a dog and Book Two's kit: no transfer fight is a contest on either difficulty, and no one died in the mortal fight.

## How much the gear does (Bridgeburner, no Book Four gear, 40 runs)

| Fight | with the gear | without |
|---|---|---|
| Ch3 scavengers | 98%, 40% lost | 83%, 61% lost |
| Ch5 seep | 95%, 45% lost | 88%, 49% lost |
| Ch7 spur | 100%, 16% lost | 98%, 43% lost |

The trinkets the chapters hand out add up: by Chapter 7 they halve the health the squad loses. The table above assumes a player who has all of them; a player who missed some sits between the two columns. This is the main reason these numbers run easier than the chapter writers' (they measured with little or no gear and the plain bot).

## Trials (in memory, \`--patch\`; 24 runs a fight)

**P3**: B4GAP Ch1 damage +6→+5; Ch2 health x1.7 (unchanged), damage +5→+7; Ch3 x1.55→x1.7, +4→+6; Ch4 x1.5→x1.7, +5→+6; Ch5 x1.35→x1.55, +4→+5; Ch6 x1.25→x1.5, +4→+6; Ch7 x1.25→x1.5, +4→+6. (Ch1–Ch3 Soldier rows are trial P1, the same rows; Ch3 Soldier had 14 good runs a fight, a page crashed.)

| Ch | lvl | Fight | Soldier win | lost | rounds | downs | Bridgeburner win | lost | rounds | downs |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 8 | runners | 100% (24) | 13% | 6.0 | 0.0 | 100% (24) | 18% | 7.9 | 0.2 |
| 1 | 8 | dig | 100% (24) | 21% | 11.8 | 0.2 | 92% (24) | 33% | 15.2 | 1.2 |
| 1 | 8 | watch | 100% (24) | 19% | 11.3 | 0.1 | 92% (24) | 37% | 15.3 | 1.2 |
| 1 | 8 | brawl | 100% (24) | 24% | 11.3 | 0.2 | 75% (24) | 27% | 13.2 | 1.6 |
| 2 | 9 | robbers | 100% (24) | 23% | 9.8 | 0.3 | 92% (24) | 33% | 12.5 | 1.8 |
| 2 | 9 | probe | 100% (24) | 21% | 9.1 | 0.3 | 92% (24) | 33% | 11.2 | 1.3 |
| 2 | 9 | hill | 100% (24) | 22% | 10.1 | 0.5 | 100% (24) | 29% | 12.5 | 1.0 |
| 3 | 10 | raiders | 100% (14) | 24% | 11.6 | 0.5 | 75% (24) | 62% | 15.7 | 4.5 |
| 3 | 10 | brawl | 100% (14) | 32% | 4.0 | 0.8 | 100% (24) | 46% | 4.0 | 1.7 |
| 3 | 10 | scavengers | 100% (14) | 26% | 11.4 | 0.5 | 63% (24) | 57% | 16.0 | 4.9 |
| 3 | 10 | poles | 93% (14) | 27% | 10.3 | 0.4 | 67% (24) | 64% | 16.6 | 5.1 |
| 4 | 11 | wagons | 100% (24) | 26% | 10.3 | 1.2 | 83% (24) | 42% | 12.9 | 2.8 |
| 4 | 11 | lancers_brawl | 100% (24) | 17% | 4.0 | 0.0 | 100% (24) | 24% | 4.0 | 0.4 |
| 4 | 11 | wounded | 100% (24) | 28% | 10.5 | 1.1 | 96% (24) | 52% | 13.6 | 2.7 |
| 4 | 11 | picket | 100% (24) | 24% | 12.0 | 0.4 | 83% (24) | 51% | 15.5 | 3.0 |
| 5 | 12 | wallriders | 100% (24) | 25% | 13.0 | 0.7 | 38% (24) | 65% | 18.1 | 5.6 |
| 5 | 12 | seep | 100% (24) | 33% | 13.8 | 1.0 | 58% (24) | 61% | 17.9 | 5.3 |
| 5 | 12 | rearguard | 100% (24) | 29% | 14.2 | 1.0 | 29% (24) | 73% | 17.5 | 6.8 |
| 5 | 12 | deserters | 100% (24) | 31% | 13.0 | 1.1 | 67% (24) | 60% | 18.0 | 5.0 |
| 6 | 13 | nest | 100% (24) | 23% | 13.0 | 0.8 | 38% (24) | 31% | 16.7 | 5.5 |
| 6 | 13 | dusk | 100% (24) | 22% | 12.1 | 0.4 | 63% (24) | 29% | 14.2 | 2.8 |
| 6 | 13 | patrol | 100% (24) | 16% | 11.8 | 0.4 | 33% (24) | 23% | 15.4 | 4.8 |
| 6 | 13 | outpost | 100% (24) | 26% | 13.5 | 0.6 | 58% (24) | 32% | 16.4 | 3.8 |
| 7 | 14 | outriders | 100% (24) | 22% | 13.9 | 0.3 | 71% (24) | 58% | 19.8 | 4.2 |
| 7 | 14 | breakout | 100% (24) | 25% | 13.4 | 0.3 | 88% (24) | 62% | 18.3 | 2.8 |
| 7 | 14 | spur | 100% (24) | 26% | 14.0 | 0.7 | 42% (24) | 59% | 17.1 | 5.5 |

P3 puts every Soldier fight at 100% with 16–33% lost (the band asked for), and lands Ch1, Ch2 and Ch4 on Bridgeburner (75–100%). It overshoots Bridgeburner from Ch3 on (Ch3 63–75%, Ch5 29–67%, Ch6 33–63%, Ch7 42–88%), and on Soldier the mortal fight starts to kill (17% of fights). Soldier and Bridgeburner pull apart in the late chapters: Bridgeburner is near its target as built, Soldier is light. One B4GAP row cannot fix both there; the proposals take Bridgeburner's side late (the standing rule is that a smart player wins every Soldier fight, which holds either way).

Not measured: the chapters' optional helpers (the Seti archer, the picket's horn as a choice, the seep water's +3), Ramin or Keth on a fresh start, Nerve other than 5, and a level above the chapter's start for the key fights (the writers found +1 level eases them a few points).

## Proposals (recommendation first)

1. **B4GAP Ch1 damage +6 → +5; Ch2 damage +5 → +7; Ch4 health x1.5 → x1.7 and damage +5 → +6.** Tested (P3): Soldier 100% everywhere, 13–28% lost (was 15–36%, with the dig 95% and the brawl 88%); Bridgeburner Ch1 75–100% (was 70–95%), Ch2 92–100% (was 95–98%), Ch4 83–100% (was 95–100%). Fixes Ch1's Soldier losses and Ch2/Ch4 being trivial.
2. **B4GAP Ch3 health x1.55 → x1.65, damage +4 → +5.** Halfway between as built (Soldier 13–20% lost, Bridgeburner 98–100%) and P3's x1.7/+6 (Soldier 24–32%, Bridgeburner 63–75%); expected Soldier ~20–25% lost, Bridgeburner ~80–85%. Interpolated, not run: measure before shipping.
3. **B4GAP Ch5 health x1.35 → x1.4; Ch6 x1.25 → x1.3; Ch7 x1.25 → x1.3; damage unchanged.** A small step: as built Bridgeburner is 78–100% and P3 (+0.2–0.25 health, +1–2 damage) dropped it to 29–88%. Expected Bridgeburner ~80–90%, Soldier ~18–22% lost (still on the light side; see 5). Interpolated, not run.
4. **\`b4_c7_breakout\` on the forward road (the battleDef wrap in 77): keep "a round sooner and nearer", drop the extra \`b4_c7_fleer\`.** As built that road kills 1.6 squadmates a won fight on Bridgeburner (73% of wins), against none on the normal road. Without the extra man (with P3) Bridgeburner won 100% and the deaths fell to 1.07 a fight; with the unchanged Ch7 row it should fall further. Fixes the one fight whose cost is out of line with its road.
5. **Leave the gear as it is, and accept that late Soldier fights are lighter than the 20–45% band** (14–21% lost from Ch5 on). The squad's trinkets are what makes the late book easy (no-gear Ch7 spur: 43% lost, not 16%); weakening them would also hurt Bridgeburner, which is on target there. If David wants Soldier harder late, the place is Soldier-only (DIFFS), not B4GAP.
6. **The transfer squad: foes' health x1.15 in Book Four when the squad fields six (an engine line in the \`B4GAP\` \`mkFoe\` wrap, \`SQUAD().length >= 6\`).** As built it wins every fight on both difficulties with 8–22% lost. Expected Bridgeburner ~90%, still the easier road, which fits a squad that earned its way across. Untested; David may prefer to leave the transfer easy as a reward.
