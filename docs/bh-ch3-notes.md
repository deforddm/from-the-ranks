Wed Nov 4, 2026, 9:35 PM PST. Book Six, Chapter 3, "Y'Ghatan" (`src/103_b6_ch3.js`, art `src/103b_b6_ch3_art.js` by the chapter's artist), against v9.0.0 on `book6` (not shipped). The Third's chapter.

# Chapter 3 notes: Y'Ghatan

The Third, in Blistig's 9th Legion, on the reserve line under Y'Ghatan on the day of the assault (BH ch 7; `bh-canon.md` §2, §4, §5, §14). The afternoon and dusk (the orders, the line, the sally); dusk into night (the wall, the fire, the order, the key and its fight); the night after (the barrow field, the reading, the march for Sotka).

## Shape

- **Areas (3):**
  - `b6_c3_line`: the 9th's reserve line south of the walls, dusk. Ground: Book Two's `odhan_night`. Triggers: `F` the 9th's fire, `W` the water wagon, `r` the spoil heaps at the forward lip, `^` forward to the walls.
  - `b6_c3_breach`: under the walls at night, the city burning. Ground: Book Two's `hissar`, dark. Triggers: `D` the breach, `G` the gate, `c` the carts with the burned, `w` the old well, `v` back to the line.
  - `b6_c3_barrows`: the barrow field the night after. Ground: `b6_c3_barrows`, a small wrapper in this file over `odhan_night` (`m` old barrow, dug open when Ch1 was `leave`; `o` an old barrow that is a trigger; `M` the new long barrow; `b` the far barrows; `x` a dead tree; `F` the barrow-side fire). It is `??=`, so the artist may replace it.
- **Nodes:** 63 `b6_c3_*` dialogue nodes (the Deck's two included).
- **Phases:** `S.f.b6_c3_ph` 1 the afternoon (set at `b6_c3_start`), 2 from dusk (set by the "Dusk. The assault." choice, at the spoil, the sally's end or the fire), 3 the night after (set by "To the barrow field." at `b6_c3_night`). Phase changes are on choices, never on a node's own fx.
- **The fire** `b6_c3_fire` (id kept for the games pass): the 9th's fire on the line in phases 1–2, the barrow-side fire in phase 3. `again:` by phase; `feverHTML()` in its `html`; a rest once in phase 1 and once in phase 3 (`b6_c3_rest1`, `b6_c3_rest3`); "The fever." when anyone has it (`b6_c3_fever`, a cure per fevered soldier when `b6CanCure()`); the squad's talk (`b6_c3_fire_talk`, one line per squadmate present: the core, Mehet, and every Book Four spare and recruit, by phase; the empty place for the squad's dead in phase 3); the way on by phase; `b6DeckChoice(3)` in phase 3; "Not now." last. `ROSTER_FIRES.bh[3] = ['b6_c3_fire']`.
- **The reading:** `B6DECK[3]`, the barrow field the night after (`bh:3`), scene `b6_barrows`, back `b6_c3_fire`. Lines for `marrow`, `tallow`, `oldninth`. **Claude's call:** the brief puts `b6DeckChoice(K)` at the first halt and the reading at the barrow field the night after. The two meet at `b6_c3_barrows_arrive`, the first halt of the night after, and again at the barrow-side fire. It is not offered on the reserve line before the fire.

## The key `b6_c3_key` (the fire)

The order comes down the reserve line once the city is burning (`b6_c3_order`, `S.f.b6_c3_order`): there is a way out through the fire, the reserve is to keep it open, some squads to its mouth and the rest to the gate. The captain does not order the Third in. Chosen with the captain under the walls (`b6_c3_key`). "Not yet" steps away; the captain brings it back.

- **`in`** (signposted: "(a mortal fight: whoever falls here stays down)", `tag:'mortal'`). Mehet +1, Haddat +1, Marrow −1. **The fight is `b6_c3_streets`**, `mortal:true`: a street the width of a cart, burning at its far end. From the second round the fire takes more of it, tile by tile, edges first (`B63_FIRE`, wrapped `startBattle`/`newRound` guarded by `b6On()` and the fight's id; `preFx` lights it too when the sapper's opener is used, once). Stage 2, "The mouth of the way": the houses either side alight from end to end, the middle open. Then out along the way with the last who came (`b6_c3_path`). `S.f.b6_c3_streetsDone = 1`.
- **`line`**: Marrow +1, Mirrel +1, Mehet −1. **The fight is `b6_c3_gate`**: hold four rounds (`objective:{type:'survive', rounds:4}`) while the burned are carried out behind, with two waves; stage 2, "The side of the walls", after them to the tanners' postern, which the squad shuts with a beam. Not mortal. Then the rest of the night pulling out whoever comes (`b6_c3_gate_pull`). `S.f.b6_c3_gateDone = 1`.
- **Both:** `b6_c3_scorchedmail` in the after-node; `b6_c3_night` (the city burns all night; the way closes at dawn; the marines who went in first are not among those out, and "the camp says they are dead").
- **Read later** (the brief): Ch5 (who walks in out of the desert), Ch7, the finale.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b6_c3_key` | `in` / `line` | the key |
| `S.dead[id]` | `{ch:3, where:'The mouth of the way'}` (or `'The burning streets'` if they fell in the first ground; no `from`) | who fell in the mortal fight (`in` only). `b63Fell()` reads it. Imported dead carry `from`, and are not these. |
| `b6_c3_streetsDone` / `b6_c3_gateDone` | 1 | the key's fight won |
| `b6_c3_sallyDone` | 1 | the sally at the wagons won |
| `b6_c3_oil` | 1 | Mehet named the maethgara's oil (only when he walks) |
| `b6_c3_breathOk` | 1 | the trick was taught |
| `b6_c3_strays` / `b6_c3_strayLeft` | 1 | the far barrows: fought, or left to the Wickans |
| `b6_c3_mended` | 1 | Ch1 `leave`: one old barrow put back on the night after |
| `b6_c3_burnedOk` | 1 | helped with the burned under the walls |

Ch5 may say once, quietly, that one of the squad's dead is not among those walking in: read `S.dead` entries with `ch:3` and no `from`.

## What this chapter reads

- **`b6_c1_key`** (default: neither, a neutral line). `bury`: the old soldier saw the earth turned, "your lot put them back"; at the barrow field the old barrows are whole, "the old dead were put back before the new ones came to join them. The Third did it." `leave`: the old barrows still stand open (the barrow ground draws them dug); at the old barrow the squad may put one back (`b6_c3_mended`, Haddat +1).
- **`b6_c2_key`** (default: no line). The old soldier's rumour of the Host: `burn` "firing its plague villages as it goes", `pass` "goes round its plague villages and leaves them be". Rumour only; `b6OtherName()` is not used.
- **Mehet** (`b6In('mehet')`): his street, the bricked drain under the potters' gate that is open now, the maethgara's olive oil in the broken jar and again when the city goes up, the well outside the walls his mother sent him to, the streets he could guide the squad through on `in`, a lamp-seller among the strays, and his ring of keys named one by one at the dead tree. Every line has a default without him.

## Fever

- **Caught:** the water wagon (`b6_c3_water`), the chapter's one fever "yes, but": a cask from the cistern at the Odhan crossing, where a sick courier came from. On a near miss, `b6Catch(roller, 'the crossing water')`. No fight in this chapter has `feverRisk`.
- **Cured:** at the fire, `b6_c3_fever`: the squad's healer (`HEALER()`: Marrow, else Mirrel) breaks it with Denul, `b6Cure(id, '<healer>, with Denul, at the fire')`; the healer is rattled (the sickness in the warren, bh-canon §8). Without a healer, "Nobody here can treat it yet" (the 9th's surgeon has his hands full).
- Never lurid: sweating, cold, cannot keep water down, hands shaking.

## The trick: The Sapper's Breath (`b6_c3_breath`)

From a sapper of the 9th on the forward trench (`b6_c3_sapper`), wits DC 17, ✦. Edges: Tangle and Rasp +3, Mehet +1, Haddat and Darrut −1, Marrow −1. Copies **The Rope's Way** (`rope`) exactly: once a fight, free, swap places with any squadmate within 5 + lvT. Three rules: wet cloth, down where the last good air is, go to your mate. Not sorcery. `S.f.b6_c3_breathTried`, `S.f.b6_c3_breathOk`.

## Kit

- `b6_c3_scorchedmail`: armour, role `mail`, ac +2, health +4. A marine's mail dropped in the streets when the heat made mail a thing you took off. From either key's after-node.
- `b6_c3_fanaticknife`: weapon, role `blade`, +2 to hit, 1d6+3. From the sally.

## Fights and numbers (for the balance pass; no rule changed)

All use the engine's `b6_` foes at Chapter 3's `FSCALE` (health ×1.7, to hit +3, damage +2 on Soldier and Bridgeburner). Book Six has no `SOLDIER_LATE` row. Experience is paid at `XPK` 0.6; a second ground pays the first's xp plus its own.

| Fight | Grounds | Foes | xp (raw) |
|---|---|---|---|
| `b6_c3_sally` (main) | the reserve's wagons / the drain mouth (`o` the drain) | 2 rebels, 2 fanatics, 1 bowman; wave r2: 2 fanatics / stage 2: rebel captain, 2 rebels, 1 bowman | 190 + 100 |
| `b6_c3_streets` (main, **mortal**, `in`) | the burning street / the mouth of the way; fire spreads from round 2 | 2 fanatics, 2 rebels, 1 bowman; wave r3: 2 fanatics / stage 2: rebel captain, 2 fanatics, 2 rebels | 260 + 130 |
| `b6_c3_gate` (main, `line`) | the gate, survive 4 rounds / the side of the walls (`o` the ditch) | 2 rebels, 1 bowman; wave r2: rebel, fanatic; wave r3: rebel, bowman / stage 2: rebel captain, 2 rebels, 1 fanatic | 240 + 120 |
| `b6_c3_strays` (optional) | the far barrows | 3 rebels, 1 bowman | 150 |

Scaled numbers at Chapter 3: rebel 51 health, ac 14, +13, 1d8+5; bowman 41, ac 13, +13, 1d8+5, range 5, pins; fanatic 37, ac 12, +12, 1d6+5, move 5; rebel captain 95, ac 15, +14, 1d10+6, boss, rallies and shoves. Fire on a tile: 1d6 at the start of a turn there, 1d4 and a save on walking in (31's rules).

- **Experience:** `in` 830 raw (498 paid), `line` 800 raw (480 paid), with the strays; about 330 less (paid 90 less) without them. From level 13 that is about level 14 and a half, toward the brief's 15 after Ch3.
- **Not run through `tools/balance.mjs`** in this pass (the machine's two browser slots are shared by the seven writer-and-artist pairs). The mortal fight's fire is the thing to watch: it takes the street's edges from round 2 to round 8 and never the middle column, and it lands only on empty ground.

## Canon calls

- **The assault** (W7 [1]): at dusk; the wall down to munitions; marines first, the heavies close behind, then Keneb's and Baralta's; **Blistig commands the reserves** (the 9th); the Wickans and Khundryl watch for breakouts. The squad sees Blistig only as a banner far down the line.
- **The trap and the numbers:** the walls and houses full of oil; "nearly three thousand, a third of the army" inside (W7 [1]); **791** out by the way through the fire (pp. 261–262 [closed]). Headline only, never a burning figure. The burned are spoken of, not described.
- **The oil:** Leoman seized the olive oil in the maethgara (W6 [1]). Mehet knows the maethgara was emptied and says so only after the jar breaks and again when the city goes up, never as a warning the squad could act on.
- **The way out:** "the soldiers say a girl made it", "the strange one who came in off the Raraku sea". The squad never sees or speaks with Sinn. She is put under guard after and out of it by morning (W7 [1]), as camp talk; neither the Fist nor Faradan Sort is named for it.
- **The marines under the city:** the narrator says only that they are not among those out; "the camp says they are dead". Kept open for Ch5.
- **After:** Tene Baralta came out burned (camp talk); the army marches for Sotka the next night because of the plague (W7 [1]).
- **The last time:** "The First Sword fell here, that time. So they say." (the old soldier; the glossary's line). Belief only.
- **Hard limits kept:** never the palace gate, Truth, the temple with Corabb and the children, the tunnels under the city (Bottle's rat), or D'riss. The squad never speaks with Keneb, Blistig, Sinn or Faradan Sort.
- **Never:** "Bonehunters", a Burn's Sleep year, a never-use name.

## Inventions (unnamed, by role)

- The 9th's company captain (as the brief; sprite borrowed from Book Four's captain); the old soldier of the 9th (Book Four's Deck reader, `oldninth`); a sapper of the 9th; a water-carrier; a Khundryl rider of the Burned Tears (a woman, tears inked); the 9th's surgeon and his boy; a young soldier of Keneb's at the carts.
- The bricked storm drain under the potters' gate, and the tanners' postern by the ditch (Mehet's city). The cistern at the Odhan crossing, where a sick courier came in from.
- The long barrow for the dead the army could carry out (bh-canon §5: "the barrow outside the walls is the squad's"): the breach, the gate, and those who died of their burns after. "The city keeps the rest."
- No new named people.

## Engine notes

- The fire's spread is in this file (`b63Light`, `b63Spread`, wrappers on `startBattle` and `newRound` guarded by `b6On()` and `B.id === 'b6_c3_streets'`), because a battle's `preFx` runs only with the sapper's opener (31). The fight's `preFx` calls the same light once.
- `TILEX.b6_c3_barrows` is a small ground wrapper over `odhan_night`, set with `??=`.
- `b6engine_test`'s check "Book Six stays off the shelf until a chapter exists" fails once any chapter registers. That is the test's pre-chapter assumption, not this chapter; the lead should update it at merge.

## Test status (Wed Nov 4, 2026, PST, at wrap-up)

- **Passed:** `python3 build.py`; `node --check` on both files; `tools/b6ch3_test.mjs` (all checks; the roster check at the fire added after that run); `trope_scan`/`trope_test` (B6 inside every budget).
- **Failed for tool reasons, not this chapter:** `b6engine_test` (its "off the shelf until a chapter exists" check); `roster_test` (its `mk` has no `bh`: needs `bh:()=>newStateBH(...)`); `recruit_test` (`recruit_scan`'s `BOOK` has no `bh` entry, so the scan throws); `reading_test` (two Book Five "after the fade" timing checks, `mt` ch1 and ch4, likely load-flaky; no `bh` failure seen).
- **Not yet run:** `lint.mjs`, `repeat_scan.mjs`, `play.mjs 3 --book=bh --from=3`, `play.mjs 1`, `balance.mjs`.
