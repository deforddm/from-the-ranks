Tue Nov 10, 2026, 1:30 PM PST. Book Ten, Chapter 3, "Night Marches" (`src/183_b10_ch3.js`, art `src/183b_b10_ch3_art.js`, test `tools/b10ch3_test.mjs`), against the Book Ten engine on `book10` (v13.0.0, not shipped).

# Chapter 3 notes: Night Marches

The Third, with the heavies, in the crossing's first nights: the column marches by night without a lamp and lies up by day under cloaks thrown over spear-shafts; the water is counted at every halt; the oxen die; heavies go into the traces. A dead city far off to the north on the night glass (never named, never entered). Dust far off at the second lie-up, going into the glass (never said whose).

## Shape

- **Areas (3, ground `b10_c3_ground`):** `b10_c3_lieup` (the first lie-up, day; the first area), `b10_c3_march` (the night march, dark), `b10_c3_lieup2` (the second lie-up, day). Area titles are road-neutral ("Night marches · …"); the scenes change by road.
- **Nodes:** 49 `b10_c3_*` (the reading's two included).
- **Phases** (`S.f.b10_c3_ph`): 1 the first lie-up (set at `b10_c3_start`); 2 the night march (the circle's "Dusk", needs the stragglers done); 3 the key's work in the dark (set by the key); 4 the second lie-up (the night area's east edge, once the key's work is done).
- **Order:** grey light at the first lie-up (the reading) → Thallo's word (the day watch on the company's water wagon) → the count at the tailboard → the oxen and the trick → the old marine, the column west → at noon the stragglers come for the wagon (main fight) → dusk → the night march: the dead city (north), the rearguard (west), the water wagon where the oxen go down (the key) → `haul`: the traces (survive fight), the thirst, the shelf; `cut`: carry what can be carried → grey light at the second lie-up: Thallo's cloak, the wagon or the skins, the dust far off, the beat in the circle → dusk, on east.
- **The fire** `b10_c3_fire` (id kept for the games pass): no fire in the glass; it is the squad's circle under the cloaks. `witnessHTML()` always; a rest once at each lie-up (the second clears the thirst, as any rest); the talk (`B103TALK`, a line at each lie-up for every soldier the Third can field, Pruss included; some second lines vary by key); the reading in phase 1; the beat in phase 4; the way on (dusk) in phases 1 and 4; "Not now". In phases 2–3 it says there is no circle while the column walks (not reachable from the night map).
- **The reading:** `B10READ[3]` with getters: the glass under the stars at grey light (`b10_glass`), or on `south` the hard ground of the road (`b10_south`). Offered at the first halt, the old marine (phase 1) and the circle (phase 1). Say lines for Marrow, Tallow and the old marine (on `south` "lent south with you … the clerks forgot to un-lend me").

## The key `b10_c3_key` (the water wagon, the night march)

At the water wagon (`b10_c3_wagonn`, the `W` tile or Thallo), the oxen kneel in the traces and do not get up. `witnessHTML()` shown; Pruss ("Beasts die first. Then the carters. I'm a carter."), Tangle and Thallo have lines. "Not yet" steps back.

- **`haul`**: `S.f.b10_c3_hauled = 1`, **Pruss +1** at the key. Thallo takes the near strap beside Pruss. The traces (`b10_c3_traces`, survive four, stragglers out of the dark); after it, the thirst (`b10Thirst(b10ThirstPick())`, recorded `S.f.b10_c3_thirst`) **unless `b10_c1_water`** (`'waived'`: the wells' skins go round); then a shelf in the glass (might 19); made or missed, the wagon comes through to the lie-up (`S.f.b10_c3_through` = `over` / `round`) and **`b10Witness(1, 'the wagon came through')`** once.
- **`cut`**: **`b10Witness(-1, 'left it in the glass')` and Tangle +1** at the key. The traces cut with the glass knife; every skin and pot filled from the barrels (might 19); made or missed (`S.f.b10_c3_carried` = `all` / `most`). The wagon stays standing in the glass. No thirst, no traces fight.
- **Read later (the brief):** Ch 5 (`b10_c3_hauled`: the last water is that wagon's last barrel), Ch 7 (fate pages).

## Witness (this chapter)

Start 5 (fresh) or 2–8; **the engine's wear −1** at the start ("nobody says why"). Moves: the dead city's "yes, but" **−1** (the chapter's one "yes, but" Witness cost: "a city died out here"; on `south` "the army out there without us"); `haul` **+1** when the wagon comes through, once; `cut` **−1** at the key; the beat **±1**. No own-scene move. From a fresh 5: **haul 3–6, cut 1–4** (inside the brief's 1–8). Test: haul with the beat kept ends at 6; cut with the beat doubted ends at 2.

## Thirst

Only on `haul`, once, after the traces fight, to `b10ThirstPick()` (the walking squadmate with the lowest loyalty, never the sergeant or a wounded one); waived by `b10_c1_water`. Words: a mouthful given to the one beside in the traces; split lips and a slowness; the circle saves a mouthful for it at the rest. Never more.

## The beat (c3)

In the circle at the second lie-up (phase 4, `b10_c3_beat`), offered until answered. "What are we marching for?" — "Each other. The one in the next strap." (`kept`, `S.f.b10_c3_beat = 'each'`), "She knows. Whatever it is, she knows, and that will have to be enough." (`kept`, `knows`), "The column's walking. So we walk." (`doubt`, `walking`), "Not now" (records nothing).

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b10_c3_key` | `haul` / `cut` | the water wagon at night |
| `b10_c3_hauled` | 1 on `haul` | the key (shared flag) |
| `b10_c3_through` | `over` / `round` | the shelf (`haul`) |
| `b10_c3_carried` | `all` / `most` | the carrying (`cut`) |
| `b10_c3_thirst` | an id / `waived` / `none` | after the traces (`haul`) |
| `b10_c3_beat` | `each` / `knows` / `walking` | the beat (also `S.b10.beat.c3`) |
| `b10_c3_harnessOk` | 1: the trick learned | the picket |
| `b10_c3_called` | `sat` / `no` | the stragglers called by their company (a Witness check) |
| `b10_c3_wagonDone`, `b10_c3_tracesDone` | 1 | the fights' after-nodes |
| `b10_c3_counted` | `true` / `slow` | the count at the tailboard |
| `b10_c3_city`, `b10_c3_dust`, `b10_c3_rear`, `b10_c3_cloak` | 1 | the far ground; the dust; the rearguard's word; Thallo's cloak |

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b10_c3_wagon` | the first lie-up at noon, then among the cloaks | `b10_straggler` ×4; stage 2 `b10_ringleader`, `b10_straggler` | 380 + 170 | **main**, no allies. Approaches: straight; guile 19 along the cloaks (surprise; "yes, but" a knee on the hot glass); call them by their company, wits 19 **`witness:true`** (made: one sits down, `drop:[3]`; "yes, but" a stave blow). Fought down, never killed in words; their sergeant (she) takes them back; "Bonehunters" once, in her mouth |
| `b10_c3_traces` | the night march, behind the slow wagon (dark) | `b10_straggler` ×2, a wave of 2 at round 2 | 120 | `haul` only, **survive 4** (near 100%); guile 19 approach ("yes, but" a strap takes skin) |

Battle xp at `XPK` .6: the main fight alone is a level (330), so every road reaches **26** from a level-25 start (the test: 7972 xp on `haul`). **Balance not run** (the lead's instruction). Battle 't' is a glass shard (a stone on `south`); no foe starts on one (tested).

## The trick: Into the Traces (`b10_c3_harness`)

How a carter's son leans into a load and takes a squadmate with him. ✦ might 21 at the oxen's picket; taught by Pruss (else Thallo; on `south` else a Letherii carter). Edges: Pruss +2 (a carter's son), Brask +2 (the 9th's guns at the river), the sergeant +1 (the Fourteenth's wagons through a holy desert), Tegra, Doss, Haddat +1; Marrow, Mehet −1. Copies **the Rope-Man's Haul** (`b5_c1_haul`): the bearer and a squadmate within 5 + trick level change places. **Free** (its words end on the one-free-trick line). Not sorcery. The trace-strap comes with it (or from the traces / the cut harness if the check is missed).

## Items (each with art, 183b; Book Ten's ground)

- `b10_c3_glassknife` (weapon, blade, **atk 2, 1d8+4**): knapped from the desert glass by the stragglers' corporal; "Keep it. He'll only make another."
- `b10_c3_nightcloak` (armour, light, ac 1, hp 4): a lie-up cloak, dark outside, chalked pale inside; Thallo's drill sergeant's spare (on `south` the wagon-master's).
- `b10_c3_tracestrap` (trinket, hp 2, might +1): a carter's trace-strap from the harness the oxen no longer need.

## Pruss

Walking (fresh `--from=3`): lines at the circle (both lie-ups), the key, the end, the oxen and the trick, the traces, the shelf, most scenes. Waiting (`b10_prussDone` 2): absent from every node; Thallo teaches the traces.

## The 'south' road

The Third is lent to the Commander's column (Ch 1) and guards the supply wagon of the Twelfth, the Letherii company it drills. The Twelfth's **wagon-master** (a Letherii, unnamed, `b5_letherii`) takes Thallo's part (orders, the key, the cloak); Thallo and the heavies' captain are not on this road. Dry country; the column marches by night on the Commander's word; the oxen fail more slowly; the stragglers are Bolkando and Letherii carters from a wagon gone dry; the far ground north is the glass's edge, a paleness with the army somewhere on it (the same Witness "yes, but"); the grey knights' dust ahead; the big ones once, far off along the flank; the dust at the second lie-up goes north from the grey knights' dust toward the glass. Backdrops `b10_south` (182b) and `b10_south_night` (180's placeholder, Ch 4's to draw); the old marine is "lent south too". The Sixth may be "three wagons back" (the one sighting) when the Letherii are on `escort`.

## The other squad

One line, at the rearguard (`b10_c3_rear`): the Letherii's `b10_c2_key` as rumour, by both roads: `watch` "somebody stood on the rise at dusk … and watched the column go out onto the glass"; `count` "the Letherii counted their water twice before they turned south". On a Letherii `adjunct`, "the few Letherii at the column's tail". On a Third `south`, "three wagons back". `b10OtherName()` not used.

## Named inventions

None new. Thallo (eating again, in crumbs); the heavies' captain (seen, looking at feet); the old marine. Unnamed by role: the Adjunct's clerk at the tailboard, the stragglers' sergeant (she), their corporal with the glass knife, the Twelfth's wagon-master, a Bolkando foreman, an old Letherii carter.

## Canon points and hard limits

- Never on the page: the dead city's name or gate, the walking dead Imass (not mentioned at all), the reserve water or its Fist, the marines' water fight, the sappers' beasts, the Adjunct with anyone, the grey knights' commander's ride (riders far off, "whose, nobody can say"), the children (not in this chapter).
- "Bonehunters" once (the stragglers' sergeant); the narrator never says it (tested). No count of days or nights. The grey knights' commander's ride (TCG ch 13) falls inside this chapter's span (ch 10–17); the dust at the second lie-up is only dust and riders, never said whose.
- **Unsure:** whether the southern allies marched by night (written as the Commander's word, for the horses); whether the Twelfth exists as a Letherii company number (Ch 2's invention, followed).

## Engine changes

None. `B10READ[3]`, `SCENEX.b10_c3_city`, `TILEX.b10_c3_ground` and a guarded `drawFeature` wrapper (style `b10_c3_ground` only) are this chapter's own.

## For Chapter 4's writer, and the lead

- The Third's line for the Letherii (Ch 4's one rumour): the Third took the traces of a water wagon when its oxen died (`haul`) or cut it loose and carried what it could (`cut`). On a Third `south`, the Third dragged (or left) the Twelfth's supply wagon on the same road, a few wagons ahead of the Sixth.
- `b10_south_night` is still 180's placeholder; Ch 4's artist draws it (this chapter uses it on `south` for the night march and the traces).
- `b10_glass` and `b10_glass_night` are now drawn (183b) and serve Ch 4's `adjunct` road and Ch 5; the night glass has no dead city in it (that is `b10_c3_city`).
- Ch 5: on `b10_c3_hauled` the last water is that wagon's last barrel; `b10_c3_thirst` is cleared by Ch 5's start (037).
- Trope budget: B10 stands at 21 Nobody/Somebody openers of about 43 allowed (30,679 words); this chapter adds none.

## Tests (Tue Nov 10, 2026)

`python3 build.py`; `node --check` on both files; `node tools/lint.mjs` 0 errors; `tools/b10ch3_test.mjs` all ok (a `--from=3` start, both keys from the same moment, the thirst waived by `b10_c1_water`, the `south` road, a transfer's squad with Pruss waiting); `b10engine_test`, `b10ch1_test`, `b10ch2_test`, `los_test`, `trope_test`, `recruit_test` all ok. A 412×915 screenshot of the first lie-up looked right. Not run (the lead's instruction): `run_all`, `balance`, `play.mjs`.
