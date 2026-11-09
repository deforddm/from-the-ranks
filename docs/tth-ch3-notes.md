Mon Nov 9, 2026, 1:53 AM PST. Book Eight, Chapter 3, "Black Coral" (`src/143_b8_ch3.js`, art `src/143b_b8_ch3_art.js`, test `tools/b8ch3_test.mjs`), against the Book Eight engine on `book8` (v11.0.0, not shipped), on branch `book8-ch3`.

# Chapter 3 notes: Black Coral

Coral, renamed, on Coral's own site, under a night that does not lift (tth-canon §2). The Andii hold it; none is named and none is met (rule 77). The Great Barrow lies just outside the landward gate with the pilgrims' camp round it. The Fourth comes in with Calder's wagons, weeks out of Darujhistan, and the engine cools the Contract by 1 as the chapter starts.

## Shape

- **Areas (3):** `b8_c3_city` (the harbour street; Book Three's `b3_c7_coral` ground, dark), `b8_c3_road` (the pilgrims' road; `b3_c5_domin_night`), `b8_c3_barrow` (the Great Barrow and the camp's edge; `b8_c3_mound`, new in 143b, which falls back to `b3_c7_field_night`). Map UI: rings on trigger tiles, edge arrows `<` `>` only.
- **Nodes:** 61 `b8_c3_*` dialogue nodes (the reading's two included).
- **Phases** (`S.f.b8_c3_ph`): 1 the city (set at `b8_c3_start`); 2 the road (set by the gate's "Out onto the pilgrims' road"); 3 the barrow (set by the road's "On to the barrow", which opens once the road fight is won); 4 back in the lodging (set by the camp's way back once the key is chosen).
- **The order a player meets things:** the lodging and the reading; the city (Thessaly and her ledger and lamp, Calder at the wagons, a pilgrim begging for the cup, the harbour wall and the wreck, the tavern another night, the upper streets refused); the landward gate (the trick; Tuft's cold that turns warm); the road (Edrem at a broken cart, the raiders, the token, the dry well, the raiders' camp on the ridge, optional); the barrow (the Shield Anvil's Weight, the guards, a priestess, the kneeling pilgrims, the kelyk-sellers, optional; the key); back to the lodging, and on to the camp.
- **The first halt** is `b8_c3_start` (the room over the chandler's, the stone sill) with `b8ReadChoice(3)`; the fire offers the reading in phase 1 too. `B8READ[3]`: scene `b8_c3_lodging`, "a stone sill under the lamps", back `b8_c3_fire`, a `say` line for Tuft, Sohra and Benna (Benna is in the city with the caravan, as the brief has her for Ch 2–5).
- **The fire** `b8_c3_fire` (a lodging in Black Coral; id kept for the games pass): `contractHTML()` in every phase, the talk (a line for every soldier the Fourth can field, two by phase for the old hands, and Vasso and Edrem), a rest once a phase from phase 2 (`b8_c3_rest<ph>`), the way on in phase 4 ("The camp wants guards"), and "Not now" last. `ROSTER_FIRES.tth[3] = ['b8_c3_fire']`.

## The key `b8_c3_key` (the barrow)

Chosen at the barrow (`b8_c3_key`, reached from the Shield Anvil scene or the barrow's trigger once that scene is done). `contractHTML()` is shown. "Not yet" steps back.

- **`kneel`**: a second node picks what is laid down (a copper from the Fourth's rent jar, a thread from the old patch, a stone off the road polished on a sleeve: `S.f.b8_c3_gift`, words only). The Redeemer takes a weight and gives nothing back but quiet (correction 8: peace, never a boon; nothing mechanical comes of it). Edrem +1 (loyalty, if he walks or waits), Ohl +1.
- **`stand`**: the Fourth stands witness at the edge of the lamplight with Edrem (if he walks) and the camp's guards; a guard passes the water down the line. `S.f.b8_c3_guards = 1`. Brisk +1, Edrem +1.
- **Read later (the brief):** Ch 4 (`stand`: +2 edge on the hold check), Ch 7 (the `coral` road, fate pages). Inside this chapter, `stand` warms the guards' fire, adds a +2 edge on the sellers' talk-down if it comes after, and the guards' captain herself asks at the lodging for the camp's edge.

## The Contract

| Where | Move | When |
|---|---|---|
| the chapter's start | −1 "weeks out of the city" | the engine (`b8_away3`) |

Nothing else here moves it: no Guild fight, no `contract:true` check, no scene of my own (the brief allows ±1; none was needed). A fresh start runs 3 → 2; the `--from=3` style save in the test, 4 → 3.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b8_c3_key` | `kneel` / `stand` | the key (default `stand`, `B8KEY0`) |
| `b8_edremDone` | 1 / 2 / 0 | the engine's flag: Edrem walks / keeps the road and waits / stayed on the road. Unset if the road fight was never won (cannot reach the barrow without it) |
| `b8_c3_guards` | 1 | `stand`: the camp's guards trust the Fourth (Ch 4 reads the key itself; this is the same fact as a flag) |
| `b8_c3_gift` | string | `kneel`: what was laid on the barrow (words) |
| `b8_c3_anvil` | a squadmate's id, or `'sgt'` | callback 2: who carried the Shield Anvil's Weight to the barrow (`trickBy('b3_c7_anvil')`), else the sergeant remembered |
| `b8_c3_wreck` | `'tuft'` / `'sgt'` | callback 7: the wreck in the bay seen from the harbour wall; Tuft knew it, or the sergeant did |
| `b8_c3_shroudOk` / `b8_c3_shroudTried` | 1 | the trick learned / rolled |
| `b8_c3_roadDone` | 1 | the raiders on the pilgrims' road beaten (always, to reach the barrow) |
| `b8_c3_ridgeDone` | 1 | the raiders' camp on the ridge broken (optional) |
| `b8_c3_sellersDone` / `b8_c3_sellersSent` | 1 | the kelyk-sellers' tent at the camp's edge: dealt with / talked into packing up and moving into the rows (not fought). Ch 4 may say "they came back" on `sellersSent` |
| `b8_c3_wagon` | 1 | Ch 2 `passed`: Calder's tarped wagon went to the camp (the sellers' jars carry his chalk) |
| `b8_c3_tarp` | `said` / `shut` | Calder admitted what was under the tarp, or did not |
| `b8_c3_ledger` | `kept` / `written` | Thessaly kept the Fourth's names out of her ledger, or wrote them |
| `b8_c3_thessaly`, `b8_c3_lamp`, `b8_c3_token`, `b8_c3_tavern`, `b8_c3_calder`, `b8_c3_beggar` | 1 | met / taken / seen |
| `b8_c3_drawn` / `b8_c3_reader` / `b8_c3_noCard` | | the reading (140c) |

## Ch 2's flags assumed (read with defaults)

- `b8_c2_key` through `b8Key(2)`, default `B8KEY0[2]` (`pass`).
- `b8_c2_kelyk` (`burned`/`passed`), read as `S.f['b8_c2_kelyk']`; when unset, `burned` if `b8_c2_key === 'fields'`, else `passed`. On `burned` Calder pays a light purse and is cold; on `passed` he pays in full and his tarped wagon goes to the camp (`b8_c3_wagon`).
- `b8_vassoDone` (Vasso walks from Ch 1 or 2): only through `b8In('vasso')`.
- Calder is the caravan master and Benna travels with the caravan (the brief's inventions); nothing else from Ch 2 is assumed.

## Edrem (the recruit)

- **Where:** on the pilgrims' road, holding a broken pilgrims' cart alone with a dozen pilgrims behind him, when the Fourth first goes out of the landward gate. Thessaly names him first ("He wore the grey once").
- **His words:** "Edrem. I wore the grey once. Seerdomin, the Domin called us. Nine years." This is the book's one use of "Seerdomin" for him (the test counts it). "No one calls me anything now. I keep this road. I'm not paid. That's the point of it."
- After the road fight, `b8_c3_edrem_after`: "Walk with us" → `b8Join('edrem')` (with six walking he waits on the road: the engine). "Keep your road for now" → `b8_edremDone = 2` (he stays by the cart as an NPC with "Walk with us"; the roster can bring him). "The road needs you more" → `0`, Ohl −1.
- He has no god (the engine). He does not kneel, ever; he sleeps facing the barrow; he was in Coral when the fortress came down on the Seer's palace (one line at the harbour wall, Claude's call).
- Lines in the fire talk, the road, the ridge, the barrow, the Shield Anvil scene, the key, the sellers, the priestess, the guards, the return and the onward node.

## The trick: the Kurald Galain shroud (`b8_shroud`, the engine's)

At the landward gate, where the night stops on the road "as if somebody had drawn it there": ✦ wits 17, "Fold a piece of the dark round a hand, the way the Andii carry it." The check names what the squad knows of Kurald Galain: the dark that came down over Lady Simtal's terrace in Darujhistan "like a lid on a pot" (Book One), Tuft's Meanas, and the Courtesy of Darkness if anyone carries it. Edges: Tuft +3, the bearer of `dark` +3, Sohra +1, Edrem +1, the sergeant +1; Ohl −1, Kettle −1, Brisk −1. The "yes, but": the dark gets into the roller's hand to the wrist (rattled). Earned through the check's `trick:'b8_shroud'` (016 calls `earnTrick`). The engine's AB is free and sets a full 15% ward; nothing changed.

**Tuft's cold that turns warm** (rule 11, as far as it lifts) is at the gate, on her alone: "Cold... And under it, not. Like somebody holding a hand that's been out in the winter." Never named, never the Gate.

## Items

- `b8_c3_coralknife` (weapon, `role:'blade'`, `atk:1, dmg:[1,8,3]`): off the raiders' second sellsword on the road, always (`b8_c3_road_after`). The chapter's real number.
- `b8_c3_pilgrimtoken` (trinket, `role:'any'`, `stat:{wits:1}`): pressed into the sergeant's hand by an old pilgrim from the north at the cart, after the road (once).
- `b8_c3_lamp` (trinket, `role:'any'`, `ac:1`): Thessaly's, for the road ("on the Andii's account"), once.
- All three drawn in 143b on Book Eight's ground (night slate-blue, gas-blue rim light). The chapter file registers borrowed placeholders with `??=` that 143b's plain assignments replace; the test checks each has its own art.

## Fights (numbers for the balance step; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b8_c3_road` | the pilgrims' road | `b8_raider` ×3, `b8_bravo` | 280 | main; `dark`; surprise through the dead trees (guile 15) |
| · stage 2 *The cart* | | `b8_raider` ×2, `b8_bravo` | +140 (420, 252 paid) | the rest of them, come up the ditch at the pilgrims |
| `b8_c3_ridge` | the raiders' camp on the ridge | `b8_raider` ×3, `b8_bravocaptain` | 180 (108) | optional, after the road; surprise from above (wits 15); Edrem +1 |
| `b8_c3_sellers` | the sellers' tent at the camp's edge | `b8_cultist` ×2, `b8_pilgrim` ×2 | 160 (96) | optional; can be talked down (guile 15; +2 on `stand`) |

Paid xp: about 456 with everything, 252 with the road alone. Not `guild:true`: nothing here moves the Contract. Balance left to the balance step (`B8SOLDIER`, `B8GAP` empty on purpose); not measured here.

## The callbacks this chapter writes

- **2, the barrow and the Shield Anvil's Weight** (`b8_c3_anvil`): at the barrow's foot, whoever carries `b3_c7_anvil` lays a hand flat on the gifts and gives some of it back, with their own words for Dannet (Capustan's wall), Ohl, Brisk, and a shared line for anyone else; if nobody carries it, the sergeant remembers a Grey Sword's hand on a hand the day of Coral. Never his end: the text says only that he taught it and is "still doing it". Tuft reads him as the Soldier of High House Life, kneeling over somebody.
- **7, the wreck in the bay** (`b8_c3_wreck`): from the harbour wall, a broken black shape far out, tilted, the fishing boats' lamps in a ring keeping away. Tuft knows it: "We saw it over Pale... we watched it go out to sea with the dead in it... It didn't get very far." Never named (rule 80); nobody under it named either.
- **Book Three's barrow:** Ohl's needle ("Somewhere in there") and Brisk's nod to it "the way she nods to a man in the line beside her" (Book Three's own words at the barrow).
- **The kelyk thread** (never glamorised; a sweet smell, then what it does, headline only): the beggar in the street ("It takes the weight better than he does"), Calder's tarped wagon on `passed`, a carter thrown out of the tavern for asking for "the sweet", a young pilgrim at the cart, a flask down the dry well, and the sellers' tent at the camp's edge.

## Canon used, and calls

- **Black Coral:** lamps at noon, tall shapes on the walls (never close, never a face), the Andii "let most things"; the upper streets refused by a porter, never the New Andiian Palace. Thessaly is sworn to the Andii and human. No Andii is named or spoken to.
- **The tavern, another night:** a tall Andii and a man in a grey cloak at a board in the corner, the room leaving them alone; the squad never at their table, never hearing a word. Never named.
- **The barrow and its camp:** gifts to the crown, pilgrims kneeling in rows (a merchant, a woman with a baby, two Rhivi from the herds near Pale, an old Barghast), priestesses washing muddy hands. A young Redeemer priestess (unnamed: Mossa is Ch 4's) says what correction 8 says: he takes the weight, he gives nothing. The guards are "fewer every week" (the first turning begins in Ch 4; nothing of Salind, Gradithan, Spindle or Monkrat).
- **Hard limits held:** no inside of the barrow, no word with the Redeemer, no High Priestess, no Palace, no cavern, no Liberators, no Spinnock or the Seerdomin's game except at a distance, no named Andii, no Gate. The test greps every node for the canon names and the never-use names, a printed year, and "!" in narration.
- **Claude's calls:**
  1. A third fight, `b8_c3_ridge` (the raiders' camp on the ridge, optional; not in the brief's list): it gives Edrem his own ask and keeps the xp near 450.
  2. The road fight's second ground is the rest of the raiders at the cart, with a second sellsword.
  3. Edrem was in Coral when the fortress came down on the Seer's palace (one line).
  4. `kneel` also gives Ohl +1; `stand` gives Brisk +1 and Edrem +1 (the brief fixes only Edrem's +1 on `kneel`).
  5. The kneel gift is chosen from three, words only; no item is taken from the kit.
  6. Thessaly's lamp and its `ac:1`; the token's +1 wits; the knife's numbers.
  7. A Book Three save's barrow gift is not read (Book Three's `b3_c7_gift` is not carried by the transfer).
  8. The chapter ends at the lodging with the camp asking for guards, so Ch 4 opens at the camp's edge.

## Engine notes

- Nothing the engine lacked. No wraps. The shroud is the engine's `TRICKS.b8_shroud`, used as written.
- One new ground, `TILEX.b8_c3_mound`, in 143b (Book Three's field at night plus the barrow, lamps on poles, mats and the sellers' tent). The chapter file registers a `??=` fallback.
- Four scenes added in `CH.scenes` (`b8_c3_lodging`, `b8_c3_harbour`, `b8_c3_tavern`, `b8_c3_road`), drawn in 143b; 143b also draws 140's `b8_blackcoral` and `b8_barrow`, replaces `FIGX.edrem` (the bust's kit: filed grey scale, the pilgrim's cloak, the slung mace, the coral token), and adds `b8_c3_thessaly`, `b8_c3_priestess`.
- Glossary: "The Andii's night", "The pilgrims' road", "A pilgrim's token" pushed onto `GLOSSX.tth`.
- No edits outside my files.
- Lint warns that `b8_c3_anvil` is an orphan: it is opened through `b8_c3_barrow_go` (a function, as Ch 1's alley mouth), not a string link. `b8_c3_card` is an orphan by design, as every book's card node.
- **Art, looked at in a 390×844 browser:** the lodging, the harbour (fixed while looking: the wreck was black on black and too large; it now sits small on a hazed horizon), the tavern, the road (the road nodes first borrowed the barrow backdrop; they now have their own, `b8_c3_road`), the barrow, the three maps, the three items.

## Tests

`tools/b8ch3_test.mjs` (20 checks): a fresh start (the Contract 3 → 2 by the engine, every node renders with no canon name it must not hold, no printed year and no "!" in narration, the items each with their own art, the figures, the ground, five backdrops), an audit under every phase, key and road state (every check has its own "yes, but"; every onward step has "Not now" or "Not yet"), the reading (Tuft; `cardNodeName()` is `b8_c3_card`), the fire, Thessaly (the ledger's "yes, but", the lamp once), Calder on `passed` and `burned`, the beggar, the wreck (Tuft), the tavern, the trick (✦ wits 17, free, its edge for Tuft, Tuft's cold that turns warm), the road (Edrem, "Seerdomin" once, the fight's two grounds, the Contract unmoved, the knife), Edrem (waits then joins, or joins), the token, the well, the ridge, the barrow (the sergeant remembers; Ohl's scene when he carries the trick), the sellers (Calder's chalk; talked down or fought), the key, `kneel` to the end, `stand` from the same moment to the end, a `--from=3` style save (Vasso walking, the fields burned: the Contract 4 → 3), and a transfer's Fourth (Tuft dead; Sohra reads; Dannet carries the Shield Anvil's Weight).
