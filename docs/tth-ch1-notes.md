Mon Nov 9, 2026, 12:45 AM PST. Book Eight, Chapter 1, "Before the Fete" (`src/141_b8_ch1.js`, art `src/141b_b8_ch1_art.js`, test `tools/b8ch1_test.mjs`), against the Book Eight engine on `book8` (v11.0.0, not shipped).

# Chapter 1 notes: Before the Fete

The Fourth, years out of the army, in Darujhistan: the winter before the Gedderone Fete (tth-canon correction 1, fix (A)). K'rul's is not touched yet. The Guild's first knife for the Fourth comes on a paper of its own (correction 3): five strokes, the chalk sign from the Fourth's door-post, the street, no name, no client. The squad goes after whoever paid (never found, rule 70) or lies low.

## Shape

- **Areas (4):** `b8_c1_street` (the Fourth's street, up from the Phoenix; `city_night`, dark), `b8_c1_roofs` (the Gadrobi roofs over the alley; `roof_night`, dark), `b8_c1_gadrobi` (the Gadrobi lanes at a winter dusk; `city_dusk`), `b8_c1_house` (a go-between's courtyard below the Daru tier; `city_night`, dark; `hunt` only). All grounds are existing tiles. Map UI: rings on trigger tiles, edge arrows `<` `>` only.
- **Nodes:** 75 `b8_c1_*` dialogue nodes (the reading's two included).
- **Phases** (`S.f.b8_c1_ph`): 1 the night at the door (set at `b8_c1_start`); 2 the roofs and the paper (set at `b8_c1_alley_after`); 3 the Gadrobi days (set by the fire's "Sleep, such as it is"); 4 the key's road (set at the key); 5 home (set at `b8_c1_home` on `hunt`, by the chancers on `quiet`).
- **The order a player meets things:** the table and the reading, the roof noise, the alley (the first knife, its second ground the roofs), the roofs (the line, the boots), the paper at the table (Vell's mark if he walks), morning, the lanes (the tavern with the painted sign, Benlo, the dyer, Orsa's den), the key at the fire; then `hunt`: Orsa's go-between check, the go-between's courtyard and stair, his shut door, home to Vasso on the step; or `quiet`: the paper burned, chancers at the door. Then winter's end and the road east.
- **The first halt** is `b8_c1_start` (the table by the fire, between the cups), with `b8ReadChoice(1)`; the reading is also at the fire in phase 1. `B8READ[1]` is 140c's worked example, unchanged (back `b8_c1_fire`). Its set text ("something on the roof that is not the wind") is the phase-1 night, so the reading is offered only before the alley.
- **The fire** `b8_c1_fire` (the Fourth's door; id kept for the games pass): every phase shows `contractHTML()`, the talk (a line for every soldier the Fourth can field: Brisk, Kettle, Tuft, Ohl, Sohra, Dannet, Ellis, Vell, Brannoc, Ressa, two each by phase, and Vasso), a rest once a phase from phase 2 (`b8_c1_rest<ph>`), the way on (phase 1 the alley; 2 the paper, then "Sleep"; 3 the key once the alley is done and the old soldier met; 5 "Winter's end. The road east." once Vasso is settled on `hunt`), and "Not now" last. `ROSTER_FIRES.tth[1] = ['b8_c1_fire']`.

## The key `b8_c1_key` (the paper)

Chosen at the fire (`b8_c1_key`), once `b8_c1_alleyDone` and `b8_c1_vetMet`. `contractHTML()` is shown there. "Not yet" steps back.

- **`hunt`**: `b8Con(2, 'names asked')`; Brisk +1, Ohl −1. Orsa's den gets the go-between question; `>` in the lanes opens the go-between's house once she has named it; the house fight; the shut door; Vasso on the step (`b8Join('vasso')`).
- **`quiet`**: `b8Con(-1, 'kept quiet')`; Ohl +1, Brisk −1. The paper goes in the fire. One night chancers stand by the barrels (`b8_c1_chancers`, not the Guild: "men who have heard there is money on the door"); they can be faced down (might 15) or fought. No Vasso (he comes in Ch 2, the brief).
- **Read later (the brief):** Ch 2 (Vasso on `quiet`), Ch 6 (the way out, through the Contract), Ch 7.

## The Contract (moves in this chapter)

| Where | Move | When |
|---|---|---|
| start | 3 | the engine |
| `b8_c1_alley` won (stage one) | +1 "the Guild counts its dead" | the engine (`guild:true`) |
| the key | `hunt` +2 "names asked" / `quiet` −1 "kept quiet" | once |
| `b8_c1_orsa_ask`'s "yes, but" | +1 "someone on a roof saw it" | `hunt` only, once (`b8_c1_roofSaw`) |

So a fresh `hunt` ends the chapter at **6** (watched), **7** with the "yes, but"; a fresh `quiet` at **3** (a name on a paper). The den, the go-between's bravos and the chancers are not the Guild and move nothing. One check carries `contract:true`: Orsa's go-between question (guile 15; "The Guild's paper" −1 at 6). The `hunt` number is a point above the brief's "about 5 at Ch 6" (6 − 2 + 1 = 5 with the road knives; 6 with the "yes, but"), which is the brief's own sum: the alley's +1 and `hunt`'s +2 on top of 3.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b8_c1_key` | `hunt` / `quiet` | the key (default `quiet`, `B8KEY0`) |
| `b8_vassoDone` | 1 / 2 / 0 (unset on `quiet`) | the engine's flag: Vasso walks / waits at the Fourth's door / went back to the roofs |
| `b8_c1_vell` | `cut` / `kept` | callback 4: Vell (if he walks) cut his clan's "owed" knot out of the dead knife's cord and burned it, or kept it in his coat. Ch 6 may read it with `b8In('vell')` |
| `b8_c1_vellRead` | 1 | Vasso read Vell's knot ("an old count; no one's paid on it") |
| `b8_c1_sign` | 1 | the tavern with the painted sign was seen (Rumjugs and Sweetlard; Ch 6 sees it again) |
| `b8_c1_bredd` | 1 | the retired Malazan told the Bredd story (the Whirlwind and the shovel) |
| `b8_c1_historian` | 1 | callback 6: "an old man up at K'rul's" who walked the Chain and wrote it down |
| `b8_c1_charm` | `bought` / `story` | the Hood-touched charm came from the retired Malazan (8 silver, or for a story) |
| `b8_c1_alleyDone` | 1 | the first knife was beaten (always) |
| `b8_c1_paperRead` | 1 | the paper was read at the table (always) |
| `b8_c1_lineOk` / `b8_c1_lineTried` | 1 | the trick learned / rolled |
| `b8_c1_boots` | 1 | the roof-boots taken (always, from the skylight) |
| `b8_c1_huntDone` | 1 | `hunt`: the go-between's courtyard and stair won |
| `b8_c1_closed` | `broke` / `left` | `hunt`: the go-between's door was broken in on an empty room and a warm grate, or left shut |
| `b8_c1_named` / `b8_c1_quietName` / `b8_c1_expected` | 1 | `hunt`: Orsa named the house / quietly (surprise to the squad at the courtyard) / a bravo heard and ran ahead |
| `b8_c1_roofSaw` | 1 | `hunt`: the go-between check's "yes, but" (+1 Contract) |
| `b8_c1_chancersDone` / `b8_c1_chancersSent` | 1 | `quiet`: the chancers fought or faced down / faced down without a fight |
| `b8_c1_denDone` | 1 | Orsa's table broken in the brawl (optional) |
| `b8_c1_cheap` / `b8_c1_bought` | 1 / count | Benlo's Moranth at the haggled price; how many bought (3 at most) |
| `b8_c1_drawn` / `b8_c1_reader` / `b8_c1_noCard` | | the reading (140c) |

Defaults: this chapter reads no earlier Book Eight flag. Ch 2 on a save that never played Ch 1 should treat `b8_c1_key` as `B8KEY0[1]` (`quiet`).

## Vasso (the recruit, on `hunt`)

- **Where:** on the Fourth's step, in the dark, hands open on his knees, when the squad comes home from the go-between's door (`b8_c1_home` → `b8_c1_vasso`). He was handed the Fourth's paper after the alley ("second on it, after the man you left on your eave"), read it twice, heard the Fourth was asking names and that the go-between had burned his papers, and came instead.
- **His words** (the brief's): "Malazans. The paper said Malazans. The Guild doesn't ask which. I asked. That is why I am sitting on your step." On who paid: "No one on the roofs knows who paid... The go-between knew. He was the only one." On other papers: "There may be other papers. I've heard there are. Old soldiers in this city, this winter, being looked at. I don't know whose." (rule 70: never K'rul's, never who.)
- "Come in" → `b8Join('vasso')` (with six walking, he waits at the door: the engine). "Wait at the door" → `b8_vassoDone = 2` (he stays on the step as an NPC with "Come in"; the roster can bring him). "Go home" → `0`, Kettle −1. He hears K'rul's bell at the fire (his god, a hum, never at the bar).
- **His lines:** the fire's talk, the onward node, the join. The "never put the knife in anybody" line is his (Claude's call; a later writer keeps it unless a fight says otherwise).

## The trick: The Roof-Line (`b8_c1_roofline`)

On the roofs over the alley, at the Guild's line on its post (`x`): ✦ wits 17, "Learn the lines: the loop, the knots, the way across." The check names what the squad knows: lines like these over the Daru District years ago, "the night of a roof the Fourth does not talk about, behind a rope boy who never looked down" (Book One's Kalam's roof and Vell). Edges: Vell +3, Vasso +3 (can't occur in Ch 1; for a replay), whoever carries Book One's `rope` +2, Ellis +2, the sergeant +1, Kettle +1, Tuft +1; Brisk −1, Ohl −1, Dannet −2. The "yes, but": both palms burned on the tar (a bruise). **Mechanic:** the Rope's Way (`rope`): once a fight, swap places with any squadmate within 5 + `lvT()`, no free swings; `free:true`, its words end "It does not use the action (one free trick a turn)." Not sorcery. Its edge comes back on the go-between's wall (the sergeant +2).

## Items

- `b8_c1_guildknife` (weapon, `role:'blade'`, `atk:2, dmg:[1,6,3]`): the first knife's, off the eave, always (`b8_c1_alley_after`). The chapter's real number.
- `b8_c1_roofboots` (trinket, `role:'any'`, `mv:1`): soft felt boots the crossbow kicked off to run, from the skylight, always.
- `b8_hoodcharm` (the engine's, placed here): the retired Malazan's knucklebone on a black cord, for 8 silver or a story (wits 15).
- Both new items drawn in 141b on Book Eight's ground (night slate-blue, gas-blue rim light). The chapter file registers borrowed placeholders with `??=` that 141b's plain assignments replace.

## Fights (numbers for the balance step; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b8_c1_alley` | the alley behind the door | `b8_knife` ×2, `b8_guildbow` | 300 | main; `guild:true` (+1 Contract at stage one); `dark`; surprise from the neighbour's yard (guile 15) |
| · stage 2 *The roofs* | | `b8_knife`, `b8_guildbow` | +150 (450, 270 paid) | `style:'roof'` (the drop is live) |
| `b8_c1_den` | Orsa's cellar | `b8_bravo` ×3 | 150 (90) | optional brawl; Kettle's dice; can be talked down (guile 14) or paid off |
| `b8_c1_hunt` | the go-between's courtyard | `b8_bravo` ×2, `b8_bravocaptain` | 260 | main, `hunt` only; `dark`; surprise if Orsa named it quietly, or over the side wall (wits 15) |
| · stage 2 *The stair* | | `b8_bravo` ×2 | +130 (390, 234 paid) | `style:'cellar'` |
| `b8_c1_chancers` | the Fourth's street | `b8_bravo` ×3 | 200 (120) | `quiet` only; not the Guild; can be faced down (might 15) |

Paid xp: about 594 on `hunt` with the den, 504 without; about 480 on `quiet` with the den, 390 without (the chancers faced down: 270). A fresh start at 16 (4540) ends at 17 on either road (the test saw 5174 on `hunt` with the den). Balance: see "Tests" below.

## The callbacks this chapter writes

- **4, Vell and the Guild** (`b8_c1_vell`): if Vell walks, the dead knife carries his clan's tally cord with Vell's runner's knot and a twist after it, "owed": "No one paid for me. It's not like yours. They're just keeping count." Never tied to K'rul's (rule 70). Vasso knows the knot on `hunt`.
- **6, the old historian at K'rul's** (`b8_c1_historian`): the retired Malazan: "There's an old man up at K'rul's, now, that knows things. Up at the old belfry, where some of the Genabackis lot drink. Walked the Chain of Dogs, they say, all of it, and wrote it down." Never his name, never how he lives (rule 17); the old soldier was at Aren "after".
- **Bredd** (`b8_c1_bredd`), the biggest yet: at Raraku he walked into the Whirlwind with a shovel, and in the morning it was gone; the Adjunct got the credit; he slept till noon. Secondhand ("my sergeant's cousin was in the next tent"); never seen. Scale: Book Four's fifty riders with a tent pole, Book Six's Y'Ghatan mule, Book Seven's three ships with a helmet.
- **Rumjugs and Sweetlard** (`b8_c1_sign`): the sign over the tavern on the corner of the dyers' row, freshly painted each spring; "Nobody in the tavern knows who they are" (rule 16). Kettle remembers them from a crate lid at the crossing (Book One's easter egg); Brisk: "You'd follow the cake."

## Canon used, and calls

- **The winter before the Fete** (fix A): fog off the lake, the Fete "weeks off", masks and lanterns at winter's end. No season is given for the Fete itself (tth-canon §2, open). The Council's young men (Vidikas, Lim, an Orr) and the Malazan-style torcs (R1) are a dyer's gossip only.
- **The Guild:** knives, a crossbow, clan cords and lines; a go-between who keeps bravos and a way over the roof and burns his papers. The Grand Master is never on the page; nor Seba Krafar, Krute, Vorcan.
- **The Phoenix:** seen down the street, never entered; on a Book Three save with Brisk, "The Phoenix had other ideas. She has not forgiven it."
- **Hard limits held:** no K'rul's (only "an old man up at K'rul's"; its bell heard by Vasso across the city, never its door); no Phoenix inside; no Vidikas estate; no Murillio, Picker, Antsy, Blend, Mallet, Bluepearl; never who paid. The test greps every node for these and the never-use names, a printed year, and "!" in narration.
- **Invented and unnamed** (per the brief's six names; Orsa and Benlo used): the lamplighter's boy, a dyer (she), the retired Malazan ("from the Seven Cities lot", grey, a telaba; the charm came off a man at Y'Ghatan, given in Aren), the tavern's landlord and painter, the first knife and the crossbow (never drawn), the go-between (never seen), the bravo with a name, the chancers, "a merchant's man hiring guards for wagons going east" (Calder is Ch 2's to name; the merchant is unnamed).
- **Claude's calls:**
  1. The quiet road gets its own fight, `b8_c1_chancers` (not in the brief's list): chancers who have heard there is money on the door, three bravos, not `guild:true`. It keeps three fights on each road and the xp near the brief's 450. Nothing later reads it beyond the flag.
  2. The hunt fight puts the brief's foes in its first ground (two bravos and the captain) and two more bravos on the stair.
  3. The alley's second ground is a second knife and a second crossbow on the roofs; the first ground's crossbow is on the eave.
  4. Vasso has "never put the knife in anybody".
  5. The charm costs 8 silver, or a story (wits 15).
  6. Benlo's Moranth: a sharper 5 silver, a burner 6, three at most; 3 and 4 after the haggle.
  7. On `quiet` the paper is burned; on `hunt` it stays on the table.
  8. The reading is offered at the table in phase 1 only (the set text is that night).
  9. The Fourth's door has the chalk sign the Guild left on its door-post "a week ago".

## Engine notes

- Nothing the engine lacked. No wraps. The trick reuses the Rope's Way's swap.
- **One engine observation for the lead:** `endBeat`'s Contract hook counts a `guild:true` fight when its first ground is cleared (the stage break), on that `B`. A squad that wins the alley's first ground, loses the roofs and retries would be counted again on the retry. Harmless in Ch 1 (one guild fight); worth a guard on the flag if Ch 5–7's knives have second grounds.
- Four scenes added in `CH.scenes` (`b8_c1_tavern`, `b8_c1_den`, `b8_c1_roofs`, `b8_c1_house`), drawn in 141b; 141b also draws 140's `b8_daru_night`, `b8_gadrobi`, `b8_door`, replaces `FIGX.vasso`, and adds `b8_c1_veteran`, `b8_c1_orsa`, `b8_c1_benlo`.
- **For Ch 6's artist:** `b81Sign(ctx, x, y, s, swing)` draws the painted sign (the board's width is 60·s).
- Glossary: "The Fourth's door", "A Guild paper", "The painted sign" pushed onto `GLOSSX.tth`.
- **Tool edit outside my files:** `tools/b8engine_test.mjs`'s shelf check and its "still being written" check now accept a registered chapter (as `b7engine_test` did for Book Seven).

## Tests

`tools/b8ch1_test.mjs` (18 checks): a fresh start (level 16, the Contract at 3, every node renders with no never-name, no printed year and no "!" in narration, the items with art, the figures and seven backdrops), an audit under every phase and key (every check has its own "yes, but"; every onward step has "Not now" or "Not yet"), the start and the reading (Tuft; `cardNodeName()` is `b8_c1_card`, the visions pass's hook), the fire before the alley, the alley's two grounds and the engine's +1, the trick (✦ wits 17, free, its battle half swaps), the roofs and the paper, the fire's rest, the lanes (the sign, Bredd, the historian, the charm, Benlo, the dyer), the den, the key, `hunt` (the go-between check's `contract:true` edge and its once-only +1, the house's two grounds, the shut door, home), Vasso (waits then joins, or joins), the end on `hunt` at 17 with the Contract at 6, `quiet` from the same moment (the chancers; the end at 3), and a `--from=1` style save (Tuft dead, Vell and Ellis: Benna reads, a line each at the fire, Vell's knot cut).

Results (Mon Nov 9, 2026, 1:14 AM PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (35 warnings, none in this chapter; `b8_c1_card` is an orphan by design, as every book's card node); `b8ch1_test` 18/18; `b8engine_test`, `trope_test` (B8 12,170 words, inside every budget), `yesbut_test`, `recruit_test`, `onward_test` pass. Not run here: the full `run_all` (the lead's) and `play.mjs`.

**Balance** (`node tools/balance.mjs --book=tth`, 20 smart runs each, level 16, the harness's Contract at 4):

| Fight | Soldier | Bridgeburner | median rounds | HP lost (Soldier / BB) |
|---|---|---|---|---|
| `b8_c1_alley` (first fight of the book) | 100% | 100% | 6 / 7 | 8% / 9% |
| `b8_c1_den` | 100% | 100% | 5 / 6 | 2% / 5% |
| `b8_c1_hunt` | 100% | 100% | 9 / 10 | 6% / 10% |
| `b8_c1_chancers` | 100% | 100% | 5 / 5.5 | 3% / 4% |

The alley sits where the first fight should. The den, the go-between's house and the chancers are easier than the v10.2 targets (Soldier ~90%, Bridgeburner 75–80%) at a fresh 16: bravos against a level-16 Fourth. Left as written for the balance step that goes to David (`B8SOLDIER`, `B8GAP` empty on purpose); the obvious levers are a `b8_veteran` among the go-between's men, or a second wave on the stair.

**Second tool edit:** `tools/balance.mjs` had no book prefix for `tth`, so every Book Eight fight came up as chapter 0 and the setup failed; `PREFIX.tth = 'b8_'` added.

**Art:** looked at in a 390×844 browser: the door, the street, the lanes, the tavern, the den, the roofs, the go-between's courtyard, and the lanes' map. Fixed while looking: an unfilled band under the skyline on the roofs, the courtyard and the street.
