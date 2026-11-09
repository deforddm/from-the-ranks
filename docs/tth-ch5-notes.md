Mon Nov 9, 2026, 3:42 AM PST. Book Eight, Chapter 5, "The Road Back" (`src/145_b8_ch5.js`, art `src/145b_b8_ch5_art.js`, test `tools/b8ch5_test.mjs`), against the Book Eight engine on `book8` (v11.0.0, not shipped; Chapters 1–4 merged). Written on branch `book8-ch5`, beside Ch 6 and Ch 7 being written at the same time.

# Chapter 5 notes: The Road Back

West over the Lamatath with Calder's wagons during the Fete, reaching Darujhistan's east gate at dusk on its last day (tth-canon correction 6). The Hounds of Shadow run through the grass toward the city one night: heard, glimpsed far off, never fought, never looking at the squad (rule 14). At dusk on the last day, far off where another road crosses the old east road, four torches on tall poles and one figure waiting: never closer, never named. The Guild's chalk on a milestone; the key. At the gate, Benlo with the news from K'rul's: Mallet and Bluepearl dead (callback 3). Hood still answers.

## Shape

- **Areas (4):** `b8_c5_road` (the caravan's halt: wagons `W`, the fire `F`, Benna's awning `=`; `^` the long grass, `<` west, `>` east), `b8_c5_wash` (day; the dry wash and the peddler's cart `p`; `>` back), `b8_c5_rise` (`wary` only; the burned wayhouse `x`, a tumbled stone `t` inside, the milestone `m`; `<` on to the gate, `v` back), `b8_c5_gate` (the east wall `H`, the gate `G`, lanterns `L`; `>` look back east). Grounds `TILEX.b8_c5_grass` (dusk/night) and `TILEX.b8_c5_day`, over Book Three's Rhivi plain. Rings on triggers, arrows on edges only.
- **Nodes:** 66 `b8_c5_*` (the reading's two included).
- **Phases** (`S.f.b8_c5_ph`): 1 the first night out (set at `b8_c5_start`); 2 the road west (set at the dawn after the Hounds, `b8_c5_dawn_go`); 3 the last day (set at `b8_c5_lastday`); 4 the gate (set at `b8_c5_gate_arrive`).
- **Order:** the halt and the reading; Calder (the Fete, the road, his wagon), the outrider, Benna; the long grass (optional riders); the fire, sleep; the night (the Hounds; hold the teams or lie flat); the dawn (the outrider reads the grass: the trick; the cloak); the wash and the peddler (stop him, talk him round, or let him go; the squad's own jug); the evening; the last night; the last morning (the wreck, if he was let go); the milestone; the key; `fast` (round through the grass to the gate) or `wary` (the burned wayhouse, the knives); the gate at dusk (the torches behind; Benlo's news; Mallet; Calder; Benna; the wall; the toll); in.
- **First halt** `b8_c5_start`, with `b8ReadChoice(5)`; the reading also at the fire in phase 1. `B8READ[5]`: scene `b8_lamatath`, where "the grass at dusk", back `b8_c5_fire`, a line for Tuft, Sohra and Benna.
- **The fire** `b8_c5_fire` (id kept for the games pass; `ROSTER_FIRES.tth[5]`): `contractHTML()`, a rest once a phase (`b8_c5_rest<ph>`), the talk (two lines each, early and late, for every soldier the Fourth can field and for Vasso and Edrem; Ohl's late line changes after the news), the way on by phase, "Not now" last.

## The key `b8_c5_key` (the road)

Offered from the milestone (`b8_c5_milestone` → `b8_c5_key`) on the last morning, with `contractHTML()`; "Not yet" steps back. The fire offers it too in phase 3.

- **`fast`**: `b8Con(1, 'they slipped the knives')` once; Kettle +1, Ohl +1, Brisk −1. The outrider takes the wagons round the rise through the grass; something moves on the wayhouse beam as they pass wide. No road fight. Then the gate.
- **`wary`**: Brisk +1, Vasso +1, Ohl −1. The squad goes up the back of the rise on foot. The lie-up check `b8_c5_lieup` (wits 16, **`contract:true`**; Grass-Running +2 to every roller, Vasso +3): success → `b8_c5_found`, the fight with surprise for the squad (none on a "yes, but"); the "yes, but" is the chapter's one Contract cost ("someone on a roof saw it", +1); failure starts it plain; "No time" skips it. Won: `b8_c5_knivesDone = 1`, **`b8_c5_scouted = 1`**, Brisk +1; the engine's +1 ("the Guild counts its dead", once per fight id).
- **Read later (the brief):** Ch 6 (`scouted`: the knives fight opens with surprise for the squad).

## The Contract

- `fast` +1 at the key. `wary`: the road knives `guild:true` +1 by the engine; the lie-up "yes, but" +1 (optional, once).
- No engine cooling here (that was Ch 3 and Ch 4). From a fresh start with the defaults: 3 at the start, 4 at the end on either road (5 on `wary` with the "yes, but").
- Shown at the fire, the key, `fast` and `wary`.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b8_c5_key` | `fast` / `wary` | the key (default `wary`, `B8KEY0`) |
| `b8_c5_scouted` | 1 | `wary`: the road knives were found and beaten first (Ch 6: surprise for the squad) |
| `b8_c5_knivesDone` / `b8_c5_found` | 1 | `wary`: the wayhouse won / the lie-up check made |
| `b8_c5_mallet` | 1 | callback 3: the news from K'rul's heard at the gate and Mallet remembered (always, before the gate opens) |
| `b8_c5_news` / `b8_c5_benlo` | 1 | Benlo told it |
| `b8_c5_torches` | 1 | the four torches far off at dusk, one figure (always, at the gate) |
| `b8_c5_hounds` | 1 | the night something ran through the grass toward the city (always) |
| `b8_c5_teams` | `held` / `loose` / `flat` | the teams held; or a wagon went over and its axle cracked; or the squad lay flat and let the horses run |
| `b8_c5_peddler` | `stopped` / `poured` / `let` | the kelyk peddler fought and his jugs broken / talked into pouring them out / let go (his cart found smashed in the grass next morning, `b8_c5_wreck`) |
| `b8_c5_jug` | `poured` | the squad's own jug (Ch 2's) poured out at the peddler's feet, if still carried |
| `b8_c5_grassOk` / `b8_c5_grassTried` | 1 | the trick learned / rolled |
| `b8_c5_grassDone` / `b8_c5_grassFaced` | 1 | the riders in the long grass dealt with / faced down without a fight (optional) |
| `b8_c5_toll` | `fair` / `paid` | the gate toll talked down, or paid double (8 silver, or 4 on a "yes, but") |
| `b8_c5_calderEnd`, `b8_c5_bennaEnd`, `b8_c5_outrider`, `b8_c5_chalk`, `b8_c5_wreck`, `b8_c5_cloak`, `b8_c5_pack`, `b8_c5_sword` | 1 | met / seen / given |
| `b8_c5_drawn` / `b8_c5_reader` / `b8_c5_noCard` | | the reading (140c) |

## Earlier flags this chapter reads (with defaults)

- **Ch 2:** `b8_c2_kelyk`; unset, `fields` → `burned`, else `passed` (the `B8KEY0[2]` default). `passed`: Calder is easy (his tarped wagon left at the camp), the merchant's wheel-and-key seal is on some of the peddler's jugs, Calder says the merchant will want the Fourth again. `burned`: Calder is cool, no seal.
- **Ch 4:** `b8Key(4)` (default `hold`). On `burn`, the peddler says his is the last kelyk going west on this road for a season (the brief).
- **The jug** (`b8_kelykjug` in the kit, if Ch 4 did not pour it): the peddler smells it and offers to buy it; it can be poured out at his feet.
- **The charm** (`b8_hoodcharm`, whoever wears it): at the gate, looking back at the torches, it is "colder than it has ever been" (a foreshadow; the engine's cold night is Ch 6).
- **Recruits:** Vasso and Edrem only through `b8In()`. Vasso reads the Guild's chalk (else Vell, else the outrider), is the gate's best talker, and says "Not my paper" at the news. Edrem's lines run through the road, the peddler (he walked the drinker up the barrow road), the knives and the gate. Nothing waits for either here.

## The trick: Grass-Running (`b8_c5_grass`)

At the dawn after the Hounds, the outrider reads the line of their running in the bent grass. ✦ wits 17, "Learn to read it: the lie of the grass, the crickets, where it has come back up." The check names what the squad knows: Sohra +3 (the Rhivi read their own grass), Ellis +2 (the Claw), the bearer of the Long Listen +2, Tuft +1 (Shadow, and where it went), the sergeant +1 (the Rhivi Plain), Edrem +1; Vasso, Brannoc, Kettle −1. "Yes, but": rattled. The cloak is given either way.

**Mechanic:** it copies the Long Listen and is **passive** (`V103_PASSIVE` already lists it; 989 sets `passive` and `free` and words it "Always on"): as every fight the bearer is in opens, the bearer reads the ground; the first enemy to move is marked (+2 to hit it for the squad until the end of the next round); through the first round nobody in the squad can be flanked (it switches off at the bearer's turn once the round has turned). Not sorcery. Its own hooks (`boonFoeTurnStart`, `flanked`, `atkCalc`, `squadTurnStart`) are guarded by `b8On()` and live in 145.

## Items (each with its own art in 145b, on Book Eight's ground)

- `b8_c5_peddlerpack` (trinket, `role:'any'`, `stat:{guile:1}, hp:1`): the peddler's pack. Gained on every peddler road (after the fight, left on the cart when he pours, found by the wrecked cart if he was let go). Its bearer gives +1 on the gate's toll check.
- `b8_c5_grasscloak` (armour, `role:'light'`, `ac:1, hp:3`): the outrider's, at the dawn.
- `b8_c5_raidersword` (weapon, `role:'blade'`, `atk:0, dmg:[1,10,3]`): from the long grass (fought or faced down: the riders' toll), or the peddler's riders, or Calder hands one over at the gate if neither.

## Fights (numbers for the balance step; no rule changed)

| Fight | Where | Foes | xp raw | Notes |
|---|---|---|---|---|
| `b8_c5_grass` | the long grass | `b8_raider` ×3 | 180 | optional (or faced down, guile 15); dusk |
| `b8_c5_peddler` | the dry wash | `b8_raider` ×2, `b8_pilgrim` | 220 | main, day; skipped if he is talked round (guile 16) or let go |
| · stage 2 *Back from the water* | | `b8_raider` ×2 | +110 | |
| `b8_c5_knives` | the burned wayhouse | `b8_guildbow` + `b8Roofs(5)` on `contract:[[2,1],[5,1],[3,2]]` (0–3 knives) | 260 | `wary`; `guild:true`; surprise if the lie-up was found |
| · stage 2 *The wayhouse roof* | | `b8_knife`, `b8_guildbow` | +130 | the contract foes are stage one only |

No `b8_hound` in any fight (the Hounds are never fought in this chapter). Death checks as the engine runs them. **Balance was not run** (the lead's step, as asked); the fresh-start contract (3) gives the wayhouse a crossbow and two knives.

## Canon used, and limits held

- **The road** (correction 6): the Lamatath during the Fete, the gate on the last day at dusk. Calder: "Started without us. Days ago, by my count." No count of weeks or months.
- **The Hounds** run west toward the city (R14 S2), seen as long lines in the grass and low dark shapes far off; Tuft names them "Hounds", "Shadow's"; the narrator only "something". They never look at the wagons. Never fought, never killed (rule 14).
- **The crossroads** (W *Kallor*, R22 S2): four torches on tall poles, far off, one figure waiting, "not for anyone on this road"; seen from the gate at dusk, never closer. No Spinnock, Kallor, Korlat or Orfantal; no Traveller, Karsa or Samar Dev (not even far off); no Kindaru, Skathandi or the Captain's carriage (the riders are "plains riders").
- **Kelyk** never reaches the city (canon): the peddler is stopped, pours it out, or is let go and his cart is smashed in the night where something ran through it (his tracks running east; never a body). Never made to look good: his pitch is answered by the man behind his cart.
- **Mallet** (callback 3; rule 71): Benlo tells it at the gate, after: "Two of them dead... The healer, Mallet they called him. And another, Bluepearl. Guild, people say." Never the raid, Picker, Blend, Antsy or the cellar (the test greps the node). The sergeant remembers Book Three's morning by the standard: a week, flat on his back, never an hour. Ohl remembers "I'm better than you. No offence." and writes the names in his list; without Ohl the sergeant writes them in the ledger. Brisk's salute is to Hood, who still answers (Ch 5).
- **Rule 70:** Vasso at the news: "Not ours. Not my paper. I told you there were other papers this winter. I didn't know whose." Never who paid; never that the Fourth was on K'rul's paper.
- **Ch 6's Fete callback** is left alone: the wall's masks are seen, nobody remembers Book One's Fete here.
- No year, no never-use names, no "!" in narration; the test greps every node.
- **Invented, unnamed:** Calder's outrider (a plains woman who will not give her name), the peddler (a man of the Domin), the drinker behind his cart, the hired riders, the riders in the grass, the gate-captain and toll-men, the burned wayhouse on its rise. Named from tth-canon §6 only: Calder, Benlo, Benna.

## Claude's calls (David may overturn any)

1. **Whiskeyjack is named once**, in the sergeant's memory at the gate (`b8_c5_mallet`), as the brief's callback reads ("a week of Whiskeyjack flat on his back"). Rule 75 keeps him nameless as a Guardian (Ch 7); a memory of a dead commander by the Fourth is not that. The journal line says "the commander". If David would rather, it becomes "the commander" there too (one word).
2. The torches are seen from the gate on both roads (the Fourth arrives at dusk either way); on `fast` the gate is made "with the light going".
3. The lie-up check's "yes, but" is the chapter's one Contract cost (+1).
4. The peddler can be let go; his kelyk still never reaches the city (the Hounds, or more of them, run through his camp). Ohl and Edrem −1 for letting him go; +1 each for talking him round.
5. The gate toll is the chapter's money scene: talked down (fair), or 8 silver (4 on a "yes, but").
6. Old Benna has a figure of her own (`b8_c5_benna`) and says goodbye at the gate; she refuses a reading on the last night.
7. The charm at the wearer's throat is "colder than it has ever been" at the gate, looking back at the torches: a hint only, no mechanic.
8. Calder hands over a raider's sword at the gate if the road gave none, so every item is on every road.

## Engine notes

- **Nothing the engine lacked; nothing in 140 or 989 changed.** The passive's hooks are the chapter's own, after the Long Listen's (Book Four's are guarded by `b4On()` and do nothing here).
- The contract hook (`battleDef`) reads `S.chapter` (5) for `b8Roofs`: knives only, at most three.
- Lint: 0 errors, no new warnings (the `b8_` battle styles are known now). Orphans by design: `b8_c5_card` (every book's card node) and `b8_c5_grass_start` (reached through `b8_c5_to_grass`, a function).
- Glossary: "Calder's outrider", "The kelyk peddler", "The east gate" pushed onto `GLOSSX.tth`.
- **For later artists:** `b85Sky(x, W, hz, 'dusk'|'night'|'day')`, `b85Grass`, `b85Stems`, `b85Road`, `b85City` (a far wall-line with a blue glow), and the ground `b85Ground` (`'H'` wall with lanterns, `'G'` gate, `'L'` lantern post) are free for Ch 6 and 7.
- Art (145b): figures `b8_c5_outrider`, `b8_c5_peddler`, `b8_c5_benna`; grounds; backdrops `b8_lamatath` (140's, replaced), `b8_c5_night`, `b8_c5_wash`, `b8_c5_wayhouse`, `b8_c5_gate` (with the four torch-sparks far off on the plain); the three items. Looked at in a 390×844 browser: the five backdrops, the four maps, the three fights and the items; fixed while looking: the Hounds' lines stacked on one spot with motion off, the wayhouse read as a table (now three walls and a beam), the cart hid the mule, the dusk grass read as water.

## Tests

`tools/b8ch5_test.mjs` (17 checks): a fresh start with the earlier keys unset (every node renders with no never-name or canon name it must not hold, K'rul's dead only in the news, Whiskeyjack only in the memory, no year, no "!" in narration; the items with their own art; the figures, two grounds, five backdrops; no Hound in any fight; the trick passive), an audit under every phase, key and peddler state (every check has its own "yes, but"; every onward step has "Not now" or "Not yet"), the reading (Tuft; `cardNodeName()` is `b8_c5_card`), the fire, Calder, the outrider, Benna, the long grass (its "yes, but", the fight, the sword), the night (a rest, the Hounds never a fight, holding the teams' "yes, but"), the trick (✦ wits 17, its edges; passive: on as a fight opens, no button, the first foe to move marked +2, no flanking, off when the round turns), the wash (the seal, the jug poured), the peddler let go (the wreck, the pack), talked round (its "yes, but"), stopped (both grounds), the last day and the milestone, the key, `fast` (the Contract +1, the gate, the torches never nearer, the news never the raid, Mallet, Calder, Benna, the wall, the toll's silver "yes, but", the end), `wary` from the same moment (the lie-up check's `contract:true` edge and its +1 "yes, but", the wayhouse's knives by `b8Roofs(5)` and its +1, both grounds, `scouted`, the end), and a `--from=5` style save (Tuft dead; Sohra, Vasso, Edrem walking; Ch 2 `fields`, Ch 4 `burn`: Sohra reads, a line each, Calder cool, "the last of it", no seal, Vasso reads the chalk and says "not my paper").

Results (Mon Nov 9, 2026, 3:42 AM PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (35 warnings, none this chapter's); `b8ch5_test` 17/17; `b8ch1_test` all ok; `b8engine_test`, `trope_test` (B8 inside every budget), `yesbut_test`, `recruit_test` pass. Not run here: `run_all`, `onward_test`, `play.mjs`, `balance.mjs` (the lead's).
