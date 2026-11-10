Mon Nov 9, 2026, 9:29 PM PST. Book Nine, Chapter 5, "Short Rations" (`src/165_b9_ch5.js`, art `src/165b_b9_ch5_art.js`, test `tools/b9ch5_test.mjs`), against the Book Nine engine on `book9` (v12.0.0, not shipped).

# Chapter 5 notes: Short Rations

The Third, with the heavies, deep in the Wastes. The quartermaster cuts the ration again. Tegra, a Barghast guide the captain has hired for the company's water details, joins at the guides' fire. At the next day's noon halt the squad hears that two of the marines' sergeants are gone in the night, sees a lone officer far out on a rise fetched back to the column (Keneb's ride, never touched), and sees a man in a leather cap telling a clerk the munitions are short (Hedge, at a distance). A maddened bhederin. The water detail goes south to a dry wash, where a dead Kartool sutler's cart hides a cache under a false floor, and deserters come for it. The key is the cache. The Witness beat is at the dung-fire that night. At first light there is dust on the horizon that is not the column's (the far dust, once).

## Shape

- **Areas (3, 16×12, ground `b9_c5_wastes`):**
  - `b9_c5_camp`: the column's camp on open ground at night (dark). Phases 1 and 3.
  - `b9_c5_plain`: the noon halt on open country, by day. Phase 2.
  - `b9_c5_wash`: a dry wash south of the halt, afternoon. Phase 2.
- **Nodes:** 62 `b9_c5_*` dialogue nodes, the reading's two included.
- **Phases** (`S.f.b9_c5_ph`):
  1. The first night's camp. Set at `b9_c5_start`.
  2. The next day: the halt and the wash. Set at `b9_c5_turnin`.
  3. The second night's camp. Set leaving the wash once the key is made (`b9_c5_wash_back`).
- **The order a player meets things:**
  - Phase 1: the cut ration (the start; Ch 3's fevered squadmate remembered); Thallo; Tegra at the guides' fire (the first halt); the reading; the ration wagons; Harro (the dead sutler, the dust-scarf, where the wash is); heavies at the next fire counting the days back west (desertion talk); the old marine; the fire; turning in.
  - Phase 2: the noon halt; Thallo's word (the rumour, the water detail); the rise (the far rider); the sappers' wagons; the bull (optional); south to the wash; the dig (Tegra's water-lore); the dogs (optional); the dead sutler in the shade (a cairn); the wreck and its floor; the men on the lip (main fight); the key at the cache; back to the column.
  - Phase 3: the camp at dusk (the pot by the key); Thallo; the Witness beat at the fire; the old marine's saying (the trick); Harro's camp talk; first light and the far dust.
- **The first halt** is `b9_c5_start`, with Thallo, the guides' fire (Tegra) and `b9ReadChoice(5)`. The reading is offered at the start, the fire and the old marine in phase 1 only.
- **`B9READ[5]`:** scene `b9_wastes_night`; place "bare ground under the stars, by the dung-fire"; back `b9_c5_fire`; say lines for Marrow, Tallow and the old marine.
- **The fire** (`b9_c5_fire`, id kept for the games pass): phases 1 and 3, `rationsHTML()` both times, short rations named; a rest once a night; the talk (a line for every soldier the Third can field, by night 1 and night 2, the second by the key); the Witness (phase 3); turning in (phase 1) or first light (phase 3, after the key); "Not now" always. The engine adds the roster.

## The key `b9_c5_key` (the cache)

Made at the wreck after the cache fight (`b9_c5_key`; the wreck node leads back to it after "Not yet"). `rationsHTML()` shown; Haddat, Brask, Tegra and Tangle have lines; Thallo's heavy waits to be pointed.

- **`share`:** into the company's pot. No ration move. Brask +1, Haddat +1. **`S.f.b9_c5_shared = 1`** (shared flag). The heavies thank the Third at dusk; Thallo brings the captain's thanks.
- **`keep`:** the squad's own. **`b9Ration(2, 'what the squad kept')`** once (`b9_c5_kept`). Tegra +1, Haddat −1 (she does not eat from it). Thallo's heavy "didn't see anything"; Thallo smells pork.
- **Read later:** Ch 7 (a line; fate pages), by `S.f.b9_c5_shared` / `b9Key(5)`.

## Rations (this chapter)

| Move | Where | Amount |
|---|---|---|
| The march | the engine, at the chapter's start | −2 |
| The bull, killed (once, `b9_c5_bullMeat`) | `b9_c5_bull_after` | +2 |
| The chapter's one ration "yes, but" (once, `b9_c5_lost`) | driving the bull off (might 17), near roll: a sack of biscuit under its hooves | −1 |
| The key | `keep` / `share` | +2 / 0 |

- **Ranges:** Ch 3 ends 4–8. After the march 2–6; with the bull 4–8; on `keep` up to 10. Leanest (Ch 3 at 3, no bull, `share`): 1 (`hungry`). The brief's 1–8 holds except `keep` with the bull from a full Ch 3 (10).
- **Hunger:** at 5 (`fed`) nothing; at 3–4 (`short`) every squadmate starts 5% down; at 1–2 (`hungry`) 10% down and −1 on every check. A fresh start enters at 4 (`short`).
- Short rations are said plainly: belts a hole in, half a biscuit, water by the cup, Haddat saving half for tomorrow. No thirst unto death (rule 85): the dig finds water.

## The Witness beat (`b9Wit`, `S.b9.wit.c5`)

- **Where:** the dung-fire on the second night, after a soldier at the next fire says the RG line half as a joke ("we shall be our own witness": soldiers repeating it, never Tavore).
- **The answers:**
  - "Our own witness. Nobody else is coming to watch…" → `kept` (`S.f.b9_c5_wit = 'own'`)
  - "Each other. Same as on the road." → `kept` (`'each'`)
  - "Nothing. We march for nothing. I'll say it out loud…" → `doubt` (`'nothing'`)
  - "Not now" records nothing.
- Replies from Haddat, Marrow, Tangle, Brask and Tegra.
- **`witness:true`:** the trick's ✦ check carries it ("Our own witness" ±1).

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b9_c5_key` | `share` / `keep` | the cache |
| `b9_c5_shared` | 1 on `share` (shared flag) | the cache |
| `b9_tegraDone` | 1 walks / 2 waits (engine flag) | the guides' fire |
| `b9_c5_wit` | `own` / `each` / `nothing` (Witness in `S.b9.wit.c5`) | the fire, phase 3 |
| `b9_c5_dust` | 1: the far dust seen (once) | first light |
| `b9_c5_bullDone` | `killed` / `driven` | the halt |
| `b9_c5_dug` | `ok` / `tried` | the dig |
| `b9_c5_dogsDone` | `fought` / `driven` / `left` | the wash |
| `b9_c5_cacheDone`, `b9_c5_found`, `b9_c5_searched`, `b9_c5_cairn` | 1 | the wreck, the shade |
| `b9_c5_wordOk` | 1: the trick learned | the old marine |
| `b9_c5_rise`, `b9_c5_sappers`, `b9_c5_orders2` | 1: the far rider, Hedge, the rumour seen/heard | the halt |
| `b9_c5_axe`, `b9_c5_pack`, `b9_c5_scarf` | 1: the item given | dig, cache, Harro |

Read from earlier chapters: `b9_c3_sick` and `b9Key(3)` (default `boil`) for a line at the start; `b9Key(4)` (default `book`) for the other squad's one line (Harro, phase 3).

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b9_c5_cache` | the wash, afternoon | `b9_deserter` ×2, `b9_raider` ×2; stage 2 (the wreck) `b9_desertercap` | 380 + 170 | **main**; one `b9_heavy` ally (Thallo's heavy). Straight in, or guile 17 behind the wreck (surprise) |
| `b9_c5_bull` | the halt | `b9_bhederin` | 140 | optional; or might 17 to drive it off (no fight, no meat; its near roll is the ration "yes, but") |
| `b9_c5_dogs` | the wash | `b9_dog` ×4 | 100 | optional; or might 17 to drive them off, or leave them the mule |

- No new foes. Combat numbers at the engine's defaults; `B9GAP`/`B9SOLDIER` untouched.
- **Xp:** a fresh Third at 19 ends at 20 with every fight (test: 6044 xp); a Third at 21 (the `--from=5` level) ends at 22.
- **Balance:** `balance.mjs --book=dod` not run (the caller asked for no long suites). The main fight copies Ch 3's farm shape (four and a boss, one ally).

## The trick: Our Own Witness (`b9_c5_witness`)

- **What it is:** the saying the old hands use at the halts when the ration is cut, said quietly to the soldier beside you and said back.
- **The check:** ✦ wits 19 at the old marine's fire (phase 3), **`witness:true`**. Edges: Haddat (the names of the dead) +2; Marrow, Brask, Doss, the sergeant (heard it secondhand on the transports) +1; Tegra and Tangle −1.
- **What it does:** copies the Khundryl Paint (`b2_paint`): the bearer and adjacent squadmates +2 to hit until the bearer's next turn; enemies within 2 −3 to hit this round; from squad level 2 the nearest loses its nerve. **Free** (`free:true` on its AB; the words end "It does not use the action (one free trick a turn)."). Not sorcery.

## Items (each with its own art, 165b)

| Item | Kind | Stats | How it is got |
|---|---|---|---|
| `b9_c5_barghastaxe` | weapon, blade | **atk 2, 1d8+4** (the real number: Ch 3's knife is +3) | Tegra's spare, after the dig (either outcome) |
| `b9_c5_sutlerspack` | trinket, any | hp 3 | the cache, after the fight |
| `b9_c5_dustscarf` | trinket, any | hp 2 | Harro: four silver, haggled to two (guile 17; its "yes, but" three) |

## Tegra (the recruit)

- **Joins at the first halt** (`b9_c5_tegra` → `b9Join('tegra')`), from the start node or her NPC. When six walk she waits at the guides' fire (her NPC shows in the camp, the halt and the wash) and still leads the dig and gives the axe. No "go away" answer. Her clan is never named (rule 89); "the host" went to war, her clan walked away.
- **Her own scenes:** the join; the dig; the shade; the wash's lip; the key; the far dust at first light (she sees it; Haddat or a heavy if she is not walking).
- **Lines behind `b9In('tegra')`** at the fire (both nights), the halt, the bull, the wash, the key and its scenes, the Witness, the end. `recruit_test` passes.

## Named inventions

- **No new named people.** Thallo, Harro (the brief's) and the old marine return.
- **Unnamed by role:** the dead Kartool sutler ("Old Kartool", Harro's name for him, not a name); a long-faced corporal of the heavies; Thallo's heavy; the deserters, the raiders and their officer.
- **Seen far off:** Keneb (named by a squadmate as "the Fist", riding out and fetched back; R22 S6); Hedge (a man in a leather cap, named by Tangle, Rasp or a sentry; W *Hedge*).

## Canon points, hard limits, open threads

- **Keneb's ride** (hard limit): seen from the halt, a mile off, never approached; the rise node has only "Back to the halt". Who fetches him is "a second rider from the head of the column", never the Adjunct's name.
- **Hedge** (W *Hedge*: munitions low): seen at a distance arguing with a clerk; never spoken to; not his company, not Bavedict.
- **The rumour:** "two of the marines' sergeants gone in the night", Thallo; never the tent, the Shi'gal or names.
- **Desertion talk:** heavies of another company counting the days back west; never Sinter's plan, Kisswhere or Masan Gilani. Blistig's talk is not mentioned.
- **Pores' wagon and the writ:** not mentioned. No Bredd.
- **"Bonehunters"** is not said this chapter. **Kolanse** once (the intro).
- **The far dust:** once, at first light, south-east, "not the column's"; never named or explained.
- **Open on purpose:** what the deserters' officer had planned; whether Harro's loud mouth sent anyone else south.
- **Unsure:** canon has bhederin on the Wastes (R10 S1) and the Wastes emptied (R10 S7); a lone old bull is the game's own. Whether Keneb rode out on the same day as Gesler and Stormy were found gone is not page-checked (R22 S5 then S6 suggests close together); the chapter puts them on the same noon halt.

## Art (165b)

- **Backdrops:** `b9_wastes_night` (stars, the column's fires, tents, the Third's dung-fire in a ring of stones; in Ch 5 Harro's wagon, the guides' fire with Tegra while she has not joined, the old marine); `b9_dust` (first light, the column forming, the low brown smear far off right; Tegra on a back of stone in Ch 5); `b9_c5_plain` (the halt along the track, the sappers' wagons apart, the lone rider far off then two riders coming back, the bull); `b9_c5_wash` (the banks, the sandy bed, the blue cart on its side, the shade, the dig, the cairn, dogs, men on the lip, the heavy with his yoke).
- **Caption:** `SCENES.b9_dust` gets a caption getter for Ch 5 (the dust far, not coming on); 160's otherwise.
- **Ground:** `b9_c5_wastes` (Ch 4's underneath; `K` the wreck, `d` sand, `#` as bare stone); battle `t` a boulder.
- **Figure:** `tegra` (160b's bust kept: two white bars, the braid, the bones, the axes).
- **Items:** three, on Book Nine's dust-brown ground.
- Checked at 412×915: night, the halt, the wash before and after, first light, the wash map, the cache battle.

## Engine

No edit outside this chapter's files. In `165`: a caption getter on `SCENES.b9_dust` (Ch 5 only). In `165b`: a `drawFeature` wrapper for `t` on its own style only. `B9READ[5]` is filled from 165.

## Tests

- `python3 build.py`, `node --check` both files, `node tools/lint.mjs`: 0 errors.
- `tools/b9ch5_test.mjs`: 19/19 (fresh start; every node renders; the yes-but and Not-now audit; the reading; Thallo; Tegra's join; Harro; the first fire; the halt (rumour, Keneb, Hedge); the bull both ways; the way south; the dig; the dogs; the cairn; the wreck and the cache fight; the key; the Witness three answers and Not now; the trick and its battle half; both keys from the same moment to the end; a `--from=5` style transfer save with Tegra waiting, reloading).

## Claude's calls (David may overturn any)

1. Two nights and a day: the reading and Tegra the first night; the halt, the wash and the key by day; the Witness and the trick the second night; the far dust at first light.
2. The cache is a Kartool sutler's, dead in the shade of a wash after going off the line for water; Harro's loud talk sends both the Third and the deserters.
3. The key is made in the wash, with only Thallo's heavy as witness; he "didn't see anything" on `keep`.
4. The chapter's ration "yes, but" is driving the bull off (a sack of biscuit under it). No own-scene ±1.
5. Tegra gives her spare axe after the dig on either outcome; she leads the water detail even when she waits.
6. The trick is taught by the old marine, phase 3 only, so the Witness edge can count.
7. Keneb and Hedge are named by squadmates, seen far off only.
8. The axe's real number is +4 damage, a step over Ch 3's knife.
