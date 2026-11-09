Mon Nov 9, 2026, 3:37 AM PST. Book Eight, Chapter 7, "The Toll", and the book's finale (`src/147_b8_ch7.js`, art `src/147b_b8_ch7_art.js`, test `tools/b8ch7_test.mjs`), against the Book Eight engine on `book8` (v11.0.0, not shipped). Written on branch `book8-ch7`, beside Ch 5 and Ch 6 being written at the same time: their flags are read with defaults.

# Chapter 7 notes: The Toll

The morning after the Fete's last night (tth-canon correction 2; W *Anomander Rake*, ch 24 and the Epilogue). Darujhistan stops. Every bell in the city tolls for the Son of Darkness. Caladan Brood walks an ox cart out to a barrow with tens of thousands behind him; the Fourth walks at the very back, never sees the barrow sealed, never reaches Brood, sees no Andii. That evening on the shingle the Fourth rings its own bell for every soldier, and chooses its road. Then the finale.

## Shape

- **Areas (3):** `b8_c7_shore` (the lake shore; `lakefront`; the fire `F`, boats `n`, the bollard `k` for the water, `>` up into the street), `b8_c7_street` (the Fourth's street the morning after; `city_dusk`; the door `D`, the painted sign `x`, Fete poles `l`, the outside stair to the roofs `S`, `<` the lake, `>` the east road), `b8_c7_road` (the road out of the city behind the crowd; `plain`; the milestone `x`, stones `r` where a Daru family rests, `^` toward the cart, never reached, `v` back). Existing grounds only. Rings on triggers, arrows on edges.
- **Nodes:** 63 `b8_c7_*` dialogue nodes (the reading's two included).
- **Phases** (`S.f.b8_c7_ph`): 1 first light (the shore, then the street; set at `b8_c7_start`); 2 the procession (set by "Go with them, at the back" at the street's east end, once the dyers' row is done); 3 evening on the shore (set at `b8_c7_halt`).
- **Order:** the shingle (the Contract cools, the reading, washing, Tuft at the water); the street (the door and the men in it, Benlo's news, Vasso on the step if he waits, the masks, the sign, the roofs if anyone is left, the dyers' row and Orsa); the east road (the crowd, Brisk, Edrem, a child's question, old Benna and Tufty, the Guardian); the crowd stops, the cart goes on; the shore at evening (the bell for every soldier, the trick, Vasso and the oldest bell, the roads).
- **First halt** `b8_c7_start` (the shingle), with `b8ReadChoice(7)`; also at the fire in phase 1. `B8READ[7]`: scene `b8_lakeshore`, where "the shingle by the lake", back `b8_c7_fire`, a line for Tuft, Sohra and Benna.
- **The fire** `b8_c7_fire` (id kept for the games pass; `ROSTER_FIRES.tth[7]`): `contractHTML()`, a rest once a phase (`b8_c7_rest<ph>`), the talk (two lines each, early and late, for all twelve who can walk), in phase 3 Vasso's bell, then the toll, then the roads; "Not now" last.

## The key `b8_c7_key` (the roads)

Offered at the fire in phase 3 once the toll is rung (`b8_c7_roads`, with `contractHTML()`; every squadmate who walks gives a vote). Each road has its own confirm node with "That's the road" (`chapterEnd(7, key)`) and "Not yet" (clears the key).

- **`daru`**: stay in the city, the door kept. Brisk +1, Vasso +1, Ellis +1.
- **`coral`**: back to Black Coral. On Ch 3 `kneel`, the Redeemer's road (keeping the pilgrims' road, unpaid); on `stand`, the Andii's pay (through Thessaly, the human guards' ledger). Edrem +1, Tuft +1, Vasso −1. Edrem walks with them, or is on his road when they arrive if he waits.
- **`east`**: down the lake and the river to the coast, a ship toward the Malazans abroad, "nobody agrees where". Ohl +1, Kettle +1, Brannoc +1, Brisk −1. **Book Nine may import it:** `b87Onward(s)` is true for a finished `tth` save on `east` (no import written).

## The Contract

| Where | Move | When |
|---|---|---|
| `b8_c7_start` | −2 "the Guild has counted enough" | once, if `b8_c6_knivesDown` (the brief) |
| `b8_c7_roofs` won | +1 "the Guild counts its dead" | the engine (`guild:true`) |
| `b8_c7_roofs_talked` | −1 "the paper put down for a day" | the chapter's own move: let the roofs see the Fourth walk out with the mourners (guile 17, `contract:true`) |
| that check's "yes, but" | +1 "someone on a roof saw it" | the brief's once-a-chapter cost |

`b8Roofs(7)` sizes the roofs: one fewer than Ch 6's list; nobody if the knives went down. At the Contract 5 that is two knives; at 2–3 one; at 0–1 nobody (`b8_c7_roofs_none`). The finale's road page and the sergeant's page end with the Contract ("at the end", and its worst).

## Flags later books may read

| Flag | Values | Meaning |
|---|---|---|
| `b8_c7_key` | `daru` / `coral` / `east` | the road (default `daru`, `B8KEY0`) |
| `b8_c7_cooled` | 1 / 2 | the morning's cooling ran (2: the Ch 6 knives were down, −2) |
| `b8_c7_tolled` / `b8_c7_toll` | 1 / `list` / `ledger` / `quiet` | the bell for every soldier: Ohl read the list, the sergeant read the ledger's column, or no names |
| `b8_c7_tollTried` / `b8_c7_tollOk` | 1 | the trick rolled / learned |
| `b8_c7_guardian` | 1 | callback 8: the soldier at the crowd's back said Book One's words |
| `b8_c7_tufty` | 1 | callback 5: Benna told the Tufty rumour to Tuft |
| `b8_c7_warm` | 1 | Tuft felt the cold in the east turn warm (rule 11, never named) |
| `b8_c7_doorDone` / `b8_c7_doorFought` / `b8_c7_doorTalked` | 1 | the men in the Fourth's room put out (optional) |
| `b8_c7_lootDone` / `b8_c7_lootFlank` | 1 | the dyers' row held / came at them through the cloth |
| `b8_c7_roofsDone` / `b8_c7_roofsLeft` / `b8_c7_roofsNone` | 1 | the roofs fought / talked off / nobody there |
| `b8_c7_band` / `b8_c7_orsa` | 1 | Orsa and the dyers' mourning band |
| `b8_c7_benlo`, `b8_c7_vassoTalk`, `b8_c7_masks`, `b8_c7_sign`, `b8_c7_ledger`, `b8_c7_crowd`, `b8_c7_brisk`, `b8_c7_edrem`, `b8_c7_hum`, `b8_c7_washed`, `b8_c7_street`, `b8_c7_road`, `b8_c7_boatsSeen` | 1 (`b8_c7_crowd` may be `'soldier'`) | seen |
| `b8_c7_drawn` / `b8_c7_reader` / `b8_c7_noCard` | | the reading (140c) |

## Earlier flags this chapter reads (with defaults)

- **Ch 1:** `b8_c1_key` (default `quiet`): the ledger's page and Vasso's fate line. `b8_c1_vell` (`cut`/`kept`; unset: "the Guild wrote something against his name once"): Vell's fate line.
- **Ch 2:** `b8_c2_kelyk`, else from `b8_c2_key` (`fields` → `burned`, default `pass` → `passed`): Kettle's fate line.
- **Ch 3:** `b8_c3_key` (default `stand`): the `coral` road (`kneel` the Redeemer's road, `stand` the Andii's pay), Edrem's vote and fate. `b8_c3_wreck` (`'tuft'`), `b8_c3_anvil` (`'greysword'`): Tuft's and Dannet's fate lines.
- **Ch 4:** `b8_c4_key` (default `hold`): Brisk's fate line.
- **Ch 5:** `b8_c5_key` (default `wary`): Ellis's fate line. `b8_c5_mallet` (unset: nothing): the toll adds "two of the K'rul's Malazans, one of them a healer the Fourth once knew" (no name), and Ohl's fate line.
- **Ch 6:** `b8_c6_key` (default `street`): who saw what at the start, the door's tenants' excuse, every fate page's last-night line, the fallen pages, the coda. `b8_c6_knivesDown` (unset: 0): the Contract's −2, the roofs. `b8_c6_wayOut` (`quiet`/`roofs`/`word`/`fought`; unset: null): the start's words, Vasso's fate line on `word`.
- **The dead:** `S.dead[id]` with `ch:6` and no `from` is the mortal night's (its own fallen page); any other `ch` without `from` is this book's; with `from`, before this book.
- **Recruits:** `b8_vassoDone`: 2 (or unset) → on the Fourth's step in the street, joins (`b8Join`); 0 → sent away (his finale page). `b8_edremDone`: 2 → on his road outside Black Coral (no Ch 7 scene; finale page; found on the road on `coral`); 0 → sent away.

## The trick: The Toll Count (`b8_c7_toll`)

At `b8_c7_count`, after the toll: ✦ wits 17, "Count them the soldiers' way: once, and again, and believe the second." The check names what the squad knows: counting the squad at every halt since Pale (Book One's habit), Vasso's counting the bells on the roofs (his trait), Kettle's twice-counting, Ohl's list, Book One's Pull. Edges: Vasso +3, the bearer of `pull` +2, Kettle +2, Ohl +2, the sergeant +2, Ellis +1; Brisk −1, Brannoc −1, Tuft −1. "Yes, but": rattled. **Mechanic:** the Lady's Pull's (`pull`): `use:'chapter'`, `n:2` (three from level 5): after a failed check, count again and roll again; in battle (`AB.t_b8_c7_toll`, `free:true`) this turn's attack rolls twice and keeps the better; the squad's next check is −2. Its words end "It does not use the action (one free trick a turn)." Not sorcery, not passive.

## Items (each with its own art in 147b, on Book Eight's ground)

- `b8_c7_bell` (trinket, `role:'any'`, `stat:{wits:1}`): a dented brass bell cut off a Fete pole by Kettle (or the sergeant) on the way back; always, at the toll.
- `b8_c7_mourningband` (trinket, `role:'any'`, `hp:3`): a dyer's black band, from Orsa's row after the looters; always.

## Fights (numbers for the balance step; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b8_c7_doorway` | the Fourth's room | `b8_bravo` ×3 | 150 (90) | optional; might 15 faces them down |
| `b8_c7_looters` | the dyers' row | `b8_bravo` ×3, `b8_bravocaptain` | 260 | main; surprise through the drying cloth (wits 15) |
| · stage 2 *The dyers' yard* | | `b8_bravo` ×2, `b8_raider` | +130 (390, 234 paid) | |
| `b8_c7_roofs` | the roofs over the street | `b8Roofs(7)` on `contract:[[2,1],[5,1],[4,0]]`, no base foes | 220 (132) | optional; `guild:true`; offered only while `b8Roofs(7)` is not empty; guile 17 (`contract:true`) talks them off |

Paid xp: about 456 with everything, 234 on the looters alone. Not balanced here (left to the balance step, as asked).

## The callbacks this chapter writes

- **5, Tuft and Tufty** (`b8_c7_tufty`, needs `b8In('tuft')`): on the road, old Benna (a Daru washerwoman now, with a basket of washing) tells of "that old house nobody goes into" and "whatever lives in it now. A Jaghut, my cousin says", who has a dead white cat called Tufty. Tuft: "I have never been white as a sheet." The house is never on the page, the cat never seen (rule 6, §(b)).
- **8, the Guardians of the Gate** (`b8_c7_guardian`, always): a soldier in old grey kit with the badge scraped off walks behind the Fourth, counts it ("He gets to five"), says "Fourth Squad", returns Brisk's salute, and says Book One's words to the Fourth at Pale (`040`, the Bridgeburners' fire outside Pale: "Anything else, Sergeant, ask it now."). Gone when a woman with a child passes between. The sergeant knows the voice; never his name (rule 75).
- **Tuft's warm** (`b8_c7_warm`): at the water, a cold she has carried since Pale turns warm, east: "like coming in out of the snow to a lit room". Never named, never the Gate (rule 11).
- **1, the Fete, full circle**, echoed once: the masks on the poles (`b8_c7_masks`) and the coda ("The last Fete the Fourth saw in this city ended with the sky on fire over an estate garden... This one ended with bells").
- **Rumjugs and Sweetlard**: the sign, with a white mask hung on its bracket (`b8_c7_sign`); nobody knows who they are (rule 16).
- **Brisk's god** is the Guardians of the Gate from this chapter (the engine's getter): her scene on the road (`b8_c7_brisk`), "It was never really him I was saluting."
- **Vasso's K'rul**: the oldest bell's hum under all the others (`b8_c7_hum`); "I have never met anyone who can say where it hangs": never at K'rul's Bar.

## The finale (`B8CH7.finale`, read by 037's showFinale)

- **The road page** (`endings[key]`): `daru` *The door kept* (scene `b8_daru_night`: the city mends, "the Malazans may come back one day; the Fourth does not join in" (rule 80's line), the door, the count); `coral` *Back to Black Coral* (`b8_blackcoral`: the camp burned, "fire from the sky, told after" (rule 78); "a young lord in Black Coral" (rule 77); the dark warmer; the Redeemer's road or the Andii's pay); `east` *A ship east* (`b8_lakeshore`: the transport, "Book Nine, when it is written, may offer this save"). Each ends with the Contract.
- **A fate page per squadmate who walks** (`B87FIN.T`, all twelve: Brisk, Kettle, Tuft, Ohl, Sohra, Dannet, Ellis, Vell, Brannoc, Ressa, Vasso, Edrem): a road line, a line from the soldier's Book Eight (reading the keys above), the last-night line (Ch 6), any Book Eight trick they carry, and loyalty (warm at 2, cold at −2).
- **The fallen:** the mortal night's (`ch:6`): "on the last night of the Fete, on a broken stretch of the city wall / in the Gadrobi streets by the Fourth's own door, to the Guild's knives"; this book's other dead; and those who fell before it (a transfer's).
- **Those waiting:** Vasso (the step) and Edrem (the pilgrims' road), or sent away; an old soldier in `S.camp` (at the Fourth's door).
- **The sergeant** (*Time served*): the road, the last night and its cost, the Guardian if met, the trick, the Contract.
- **Where the books meet** (`b87meet`, *Darujhistan, again*), put in before the end page by a guarded wrap of `finPages` / `showFinale` (as Book Seven's).
- **The end page:** the coda (the canon at headline: the wall, the moon's pieces east, Death not answering, the bells, Brood's cart and the barrow, the new keepers at the gate; the Fete echo; the Fourth's part; the brass bell), 37's road and roll of the dead, and the credit to Steven Erikson and Ian C. Esslemont. Endline *The End of Book Eight: Time Served*.

## Canon used, and limits held

- Correction 2: no Andii procession; the Fourth at the far back; the cart a speck; the barrow never seen sealed ("You will never know what is at the end of that road"). The coda says Brood sealed it, as headline.
- Rake: "the Son of Darkness", "the lord of the black city", dead in the city, "No one knows how" (rule 72); his name is never printed, nor Dragnipur, the street, the Hounds' fight, Envy or Spite. The moon "went to pieces... and the pieces went off east" (rule 81). Karsa is "a giant in the street" (rule 79). Gorlas and Challice: "a councillor's dead", "a councillor's widow fell" (rule 82). Hood: "Death didn't come last night" (rule 74). No Whiskeyjack, Mallet, Picker, Kruppe, Kallor, Traveller, Cotillion, Nimander or named Andii; no OST ground.
- The test greps every node and every finale page for those names, a four-digit year and "!" in narration.
- **Invented, unnamed:** the Daru woman and the old man in the burned mask at the water, the fisherman, the lake boatman, the three men in the Fourth's room, the man in the good coat and his looters, the dyers, the journeyman on the roofs, the family at the stones and the boy, the soldier at the back. Named: Benlo, Orsa, Calder (offstage), Thessaly (the `coral` page), Benna (the third reader, here a woman in the crowd).

## Claude's calls (David may overturn any)

1. The chapter starts on the lake shore at first light (the reading place and the fire), not in the street, so the first halt is the reading's place.
2. A third fight of the chapter's own, `b8_c7_doorway` (optional): men who heard the Fourth did not come home. The brief names the roofs and the looters.
3. The looters are at Orsa's den in the dyers' row, with a second ground in her yard (so the main fight has its `stage2`).
4. The roofs can be talked off (guile 17, `contract:true`): the chapter's one own Contract move, −1.
5. The toll offers three ways: Ohl reads the list (if he walks), the sergeant reads the ledger's last column, or no names.
6. The `coral` road splits on Ch 3's key: `kneel` the Redeemer's road, `stand` the Andii's pay.
7. Old Benna tells the Tufty rumour (only with Tuft walking); she is the third reader elsewhere, so she is never both in one save.
8. The Guardian's line is Book One's "Anything else, Sergeant, ask it now" (`src/040_chapter1.js`, Whiskeyjack at Pale).
9. Edrem waiting stays on his road outside Black Coral (he never came west); the `coral` page finds him there.
10. The finale has a *Where the books meet* page, as Book Seven's.

## Engine needs (reported, not patched)

- **The Toll Count answers `pull` in checks.** 16's `rollDice` asks for the trick `pull` by name. In Book Eight only, when the squad carries `b8_c7_toll` and not `pull`, this file wraps `trickLeft`, `spendTrick`, `rollDice`, `note`, `blog` and the `#dPull` button's words (guarded by `b8On()`; Book Seven's Crowd's Luck does the same under `b7On()`). A shared "Pull-shaped tricks" hook in 016 would retire both wraps.
- `finPages` / `showFinale` are wrapped for the meet page (guarded), on top of Book Seven's.
- Lint shows `b8_c7_door_home`, `b8_c7_roofs_none` and `b8_c7_halt` as orphans: they are reached through `DLG.x()` calls from their parent nodes. `b8_c7_card` is an orphan by design.

## Tests

`tools/b8ch7_test.mjs` (26 checks): a fresh start at 19 (Vasso on the step, Edrem on his road, the Contract 5): every node renders with no never-name and no "!" in narration; the audit under every phase and key; the start and the reading; the fire and its rest; Tuft's warm; the door ("yes, but", the fight); Benlo; Vasso joining; the roofs (two knives, the Guild's paper edge, −1 talked off, +1 on its "yes, but", +1 fought); the dyers' row (the "yes, but", surprise, both grounds, the band); the procession; Tufty; the Guardian; the halt; the toll and the bell; the trick (✦ wits 17, chapter charges, the Pull's check half, free in battle); the key; the finale on all three roads (road page with the Contract, a fate page per squadmate, the sergeant, Where the books meet, the end page with the coda and the credit); Edrem's waiting page; and a `--from=7` style save (Tuft dead before, Brisk fallen on the last night at the wall, the knives down: the Contract 6 → 4, nobody on the roofs, Sohra reads; the finale on `east` with the fallen, the waiting and the sent away).
