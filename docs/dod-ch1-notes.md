Mon Nov 9, 2026, 6:51 PM PST. Book Nine, Chapter 1, "Letheras, Emptied" (`src/161_b9_ch1.js`, art `src/161b_b9_ch1_art.js`, test `tools/b9ch1_test.mjs`), against the Book Nine engine on `book9` (v12.0.0, not shipped).

# Chapter 1 notes: Letheras, Emptied

The Third, with the Bonehunters' heavies in Letheras, months after the city fell. The night the barracks emptied (the night of the Reading, dod-canon correction 8: seen from the street; rule 92) and the days after, when the heavies muster for the march east. Nobody in the chapter says who dealt, or that anything was dealt beyond "something's being dealt" (an old hand, secondhand through Thallo) and Keth's grandmother's "cards on a table". No card is dealt to anyone but the Third's own reading.

## Shape

- **Areas (4):** `b9_c1_yard` (the barracks yard by night, `b9_c1_barracks`, dark), `b9_c1_quarter` (the lane behind the barracks by night, `b9_c1_quarter`, dark; 'street' only), `b9_c1_muster` (the yard by day, the days after, `b9_c1_barracks`), `b9_c1_lanes` (the emptied quarter by day, `b9_c1_quarter`).
- **Nodes:** 60 `b9_c1_*` dialogue nodes (the reading's two included).
- **Phases** (`S.f.b9_c1_ph`): 1 the yard at dusk and into the night (set at `b9_c1_start`); 2 the night after the key (set by the key); 3 the days after (set leaving the night: the dawn count on 'stores', the barracks gate on 'street'); 4 the eve of the march (set when the looters are dealt with).
- **The order a player meets things:** the yard emptying; Thallo and the captain's word on the stores (the why check); the clerk's list and Brask (joins at the first halt); the 9th's bunk-house (the mess-tin); the old marine; the fire and the reading; the stable yard (the dead horse under a sheet); the woman at the gate (the key). Then the night (below). Then the muster: Thallo's word on the looters (and one line of the Letherii escort), the captain seen, the quartermaster's scale, the drill sergeant's roll (the trick); the quarter by day: the looters (main), the tavern (optional brawl), the household's door; back to the fire, and out of the gate at first light.
- **The first halt** is `b9_c1_start`, with `b9ReadChoice(1)`; the reading is also at the fire in phase 1 and on the stores watch, and with the old marine. `B9READ[1]` is 160c's worked example, unchanged (back `b9_c1_fire`). Its set text ("a sound like a roof going in") fits phase 1: the fire's own text has a long low sound far off, "like a building settling"; the roof itself goes in during the night.
- **The fire** `b9_c1_fire` (id kept for the games pass): `rationsHTML()` in every phase; a rest once by night (phase 1) and once by day (phases 3–4), none on the stores watch; the talk (a line by night and a line by day for every soldier the Third can field: Haddat, Sathi, Tangle, Marrow, Mirrel, Doss, Wenna, Mehet, Ottar, Tallow, Hessa, Tebbet, Darrut, Yorin, Rasp, Orvas, Ramin, Keth, Brask); the way on (phase 1 the woman at the gate; phases 3–4 the march, once the looters are done); "Not now". The engine adds the roster.

## The key `b9_c1_key` (the last night)

At the gate (`b9_c1_woman`), once Thallo has given the captain's word and Brask is settled (joined or waiting). A Letherii woman of the quarter: her boy ran into the alleys when their dead horse stood up in the yard; her father, an old carter, cannot walk far; the watch-house is empty. Thallo: he can sit on the stores, but not on both. `rationsHTML()` shown; Brask, Haddat and Tangle have lines. "Not yet" steps back.

- **`stores`**: Tangle +1, Brask +1. Thallo walks the woman to the empty watch-house and comes back alone. The watch: the dead dray-horse in the barracks' own stable yard stands up, and then nothing more; a roof goes in far off (`b9_c1_roof`). Then thieves over the canal wall (`b9_c1_stores`). At dawn the quartermaster counts twice: **`b9Ration(2, 'the stores counted twice')`** (once, `b9_c1_counted`). The quartermaster: "Squad that sat on my stores eats out of them first, on the road."
- **`street`**: **Haddat +1, Marrow +1, `S.f.b9_c1_street = 1`** (both at the key). Up the lane with the woman: her father's room (Marrow sits with him); the boy in the alley (a wits check; its "yes, but" is the chapter's one ration, `b9Ration(-1, 'bread for a boy in an alley')`); their stable yard: the dead horse is standing, lies down again, then nothing more; the roof goes in far off; drag it out for the knackers (might, optional) or bar the stable; sit the night out with them. At the gate Thallo says some lads tried the stores and he shouted, and "counted once". By day the woman gives the squad a loaf and a jar of oil: **`b9Ration(1, "a loaf from the carter's house")`** (once, `b9_c1_bread`; the scene of the chapter's own, ±1).
- **Read later (the brief):** Ch 3 (a line), Ch 7 (fate pages).

## Rations (this chapter)

Start 6 (the engine). `stores`: +2 at the dawn count → 8 (`full`). `street`: the alley's "yes, but" −1 (only on a near roll), the loaf +1 → 6 or 7 (`fed`). No other move. Brief's expected range 6–8 holds.

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b9_c1_key` | `stores` / `street` | the gate |
| `b9_c1_street` | 1 on `street` | the gate (shared flag, the brief) |
| `b9_braskDone` | 1 walks / 2 waits | the clerk's list (engine flag) |
| `b9_c1_counted` | 1: the stores counted twice at dawn ('stores') | the dawn |
| `b9_c1_boy` | `found` (the check made) / `came` (missed: he came to his mother's call) | the alley ('street') |
| `b9_c1_horseOut` | `out` (dragged out for the knackers) / `barred` | the household's yard ('street') |
| `b9_c1_bread` | 1: the household's loaf ('street') | the household by day |
| `b9_c1_horse`, `b9_c1_roof` | 1: the dead horse stood; the roof went in | the stable (both keys) |
| `b9_c1_rollOk` | 1: the drill sergeant's roll learned (the trick) | the gate by day |
| `b9_c1_lootersDone`, `b9_c1_storesDone`, `b9_c1_brawlDone` | 1 | the fights' after-nodes |
| `b9_c1_braskSquad` | 1: Brask told his old squad (Haddat took their names, if she walks) | Brask |
| `b9_c1_tin`, `b9_c1_scale` | 1: the mess-tin, the heavy scale taken | the bunk-house, the quartermaster |

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b9_c1_looters` | the emptied quarter by day (`b9_c1_quarter`) | `b9_c1_looter` ×3, `b9_deserterbow`; stage 2 `b9_desertercap`, `b9_c1_looter` | 380 + 170 | **main, the book's first fight**; one `b9_heavy` ally (Thallo's heavy). Approach: straight in, or a guile 17 round the yards (surprise) |
| `b9_c1_stores` | the barracks yard by night (`b5_c1_barracks`, dark) | `b9_deserter` ×2, `b9_raider` | 100 | on `stores`. The raider is "a drifter off some border a long way from here" in words (the engine's `b9_raider` reads "Border raider" on screen) |
| `b9_c1_brawl` | the soldiers' tavern (`b9_c1_taproom`) | `b9_c1_veteran` ×3 | 90 | optional; fists and benches in words; death checks still run (the engine's rule), low damage |

Own foes: `b9_c1_looter` (Looter, `b5_letherii` body, hp 26, ac 13, atk 11, 1d6+4), `b9_c1_veteran` (Letherii veteran, `b5_letherii`, hp 30, ac 13, atk 10, 1d4+3, "swings a fist at"). Combat numbers otherwise at the engine's defaults (balance is a later step, `B9GAP`/`B9SOLDIER` untouched).

Battle xp is paid at the engine's `XPK` (.6). The Third starts at 5530 xp (level 19); level 20 is 330 on. The looters alone pay 330 (both grounds), so **every road reaches level 20**; 'stores' adds the thieves (60) and either road the optional brawl (54) and clean checks (+10 each). Test runs: 'stores' with the brawl ended at 20; 'street' without it at 20. Balance (`balance.mjs --book=dod`) not run here: the caller asked for no long suites; numbers are the engine's defaults.

## The trick: The Roll at the Gate (`b9_c1_rollcall`)

The heavies' drill sergeant calls the roll at the gate before every march, every name in file order, each soldier stepping up into the gap the last one left. A ✦ wits 19 check at `b9_c1_drill`; its edges name what the squad knows: the Fourteenth's musters (the sergeant +1), the Gate Drill at Aren (+2 to whoever carries Book Four's `b4_c1_gate`, and to the sergeant if anyone does), Brask's six years of answering it (+2), Haddat's nightly roll of the dead (+1), Tangle's counting (+1), the Perish's sung musters (Ottar +1), the clerk's quarter-day reading (Doss +1); Sathi and Tallow −1. It copies the Line (`t_line`: `B.line`): the bearer and every squadmate beside them +3 + level armour and no flanking until the bearer's next turn. **Free** (`free:true`, its words end on the one-free-trick line). Not sorcery.

## Items (each with art, 161b)

- `b9_c1_heavyscale` (armour, mail, **ac 3, hp 4**): the quartermaster's spare from a squad that is not a squad any more; first pick on 'stores', "it goes with the man" on 'street'.
- `b9_c1_messtin` (trinket, any, hp 2): a dented mess-tin stamped with the 9th, left on a shelf in the 9th's empty bunk-house.
- `b9_c1_gutterknife` (weapon, blade, atk 2, 1d6+3): a Letherii canal-boy's knife a looter dropped.

## Brask (the recruit)

Joins at the first halt: the Adjunct's clerk reads him onto the Third's line (`b9Join('brask')`; waits in the heavies' lines when six walk, and joins from his node later). Lines behind `b9In('brask')`: the fire (both phases), the key, the stable (both keys), the household, the stores fight's after, the looters' second ground and after, the bunk-house, the captain, the drill sergeant, the tavern (both), the household by day, the end (he answers to four names nobody calls). His tally-stick with four notches filed flat (160's gear) is shown. The quartermaster's scale "goes with the man".

## Named inventions

- **Thallo** (the brief's recurring corporal): big as a door, a broken nose, bare-headed, always eating, keys at his belt. Drawn (`FIGX.b9_c1_thallo`). Later chapters may reuse the kind.
- No other new names. Unnamed by role: the Adjunct's clerk, the old marine (the Deck's third reader), the captain (seen, never speaks to the sergeant), the quartermaster, the drill sergeant of the heavies, the Letherii woman, her father (an old carter), her boy (about seven), the tavern-keeper (one arm), the bad-eyed Letherii veteran.
- **"No one comes back from the Wastes with a map. Bring one back. Show us."** The veterans' line. A later chapter may call it back (Claude's call: nobody has to).

## Canon points, hard limits, open threads

- The Reading: never its room, the inn, the Errant, Brys, Ublala; the dead thing that gets up is a dead dray-horse (two short paragraphs, nothing lurid); the roof goes in far off and is never explained (it is the burst inn; never said).
- Why the barracks emptied: the marines' old hands left first (WC3: nearly every soldier left before the Reading); the squad never learns who dealt (the glossary's "night of the cards" holds).
- No Fiddler, Keneb, Blistig, Hedge, Tarr, Cuttle, Tavore or palace in any scene; Kalam never. "Kolanse" said once, by the narrator reporting the clerks; nothing of what waits there.
- "Bonehunters" is not said in this chapter at all.
- The other squad: one line from Thallo ("The Letherii are mustering their escort on the plain outside the city. One of our heavies' sergeants is out there teaching them to stand still."). `b9OtherName()` not used.
- Orvas: "the heavies say the Burned Tears are coming by another road, round by the south" (rule 94: they march to join; headline).
- **Open on purpose:** what the household does after the army goes; whether the knackers came; the old carter's book of debts on the shelf.
- **Unsure:** none blocking. The "upmarket tavern" where Keneb and Blistig sit that night (WC3) is a hard limit; this chapter's tavern is a soldiers' dive by the barracks, by day, days after.

## Art (161b)

Six backdrops: `b9_letheras_night` (the yard by night, every window dark, the fire by the kit-crates, Thallo by the stores, the dust of the roof over the city once it has gone in), `b9_barracks` (the yard by day, wagons, crates, heavies), `b9_c1_street` (the lane at night, the woman's lamp, the stable gate, the canal), `b9_c1_stable` (the horse a shape: under its sheet, or standing dark on the stores night until the thieves), `b9_c1_lanes` (by day: open shutters, a door hanging off, a chair alone, the handcart), `b9_c1_tavern`. Ground: `b9_c1_barracks` (b5_c1_barracks + stores door, stable gate, wagons, crates), `b9_c1_quarter`, `b9_c1_taproom`, with 't' cover for the last two through a `drawFeature` hook. Figures: `brask` (replacing 160's sprite: doubled shoulders, bent cheek-guards, the sword over the shoulder, mace, tally-stick), `b9_c1_thallo`. Three items on Book Nine's dust-brown ground.

## Engine

No engine change and no edit outside this chapter's four files.

## Claude's calls (David may overturn any)

1. The key is chosen at the gate when the woman comes, not at the fire; the fire's way on in phase 1 leads to her.
2. The dead horse appears on both roads: the heavies' own baggage horse in the barracks stable on 'stores', the household's on 'street'. The roof goes in on both.
3. Haddat and Marrow's +1 and `b9_c1_street` are set at the key, so a later chapter can read them even if the night is cut short.
4. The stores' +2 comes at the dawn count, after the thieves.
5. The street road's own scene (the brief's ±1): the household's loaf by day, +1. The alley's "yes, but" is the chapter's one ration cost.
6. One ally (`b9_heavy`, Thallo's heavy) in the looters fight, to keep the book's first fight near certain.
7. The tavern's talk check costs a round (three silver) on its "yes, but": money is that scene.
8. Brask has no "go away" answer: he joins, or waits when six walk.
9. The quartermaster gives the heavy scale on both roads (worded by the key).
