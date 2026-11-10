Tue Nov 10, 2026, 2:29 PM PST. Book Ten, Chapter 5, "The Last Water" (`src/185_b10_ch5.js`, art `src/185b_b10_ch5_art.js`, test `tools/b10ch5_test.mjs`), against the Book Ten engine on `book10` (v13.0.0, not shipped).

# Chapter 5 notes: The Last Water

The Third, with the heavies, at the crossing's worst: the company's barrels dry; the squad's last water; children in the column from somewhere east (one sentence, far off, in one node); "a Fist tried to take the water" (rumour, once); the fire with no fire; at grey light the ground goes wet under the column, then it is water. After it, the first scrub of Kolanse at the glass's far edge, Kolansii outriders who see the army and never ride back ("Word is the Assail think we died in the glass": Thallo, as camp word, the only justification on the page), and Sedge asking for file-closers.

## Shape

- **Areas (4):** `b10_c5_lieup` (the last lie-up, day; decor `b10_c5_ground`), `b10_c5_march` (the night march, dark; `b10_c5_ground`), `b10_c5_lake` (grey light, the wet ground; `b10_c5_wet`), `b10_c5_scrub` (the glass's far edge, day; `b10_c5_scrub`). Titles road-neutral.
- **Nodes:** 46 `b10_c5_*` (the reading's two included). Below the brief's 60–80, like Ch 3 (49) and Ch 4 (43): the glass chapter has little to meet (Claude's call).
- **Phases** (`S.f.b10_c5_ph`): 1 the lie-up (set at the start); 2 the night march (the circle's "Dusk", needs the key done); 3 grey light at the water (the night's east edge, after the halt); 4 the far edge (the water's east edge, after the skins are filled).
- **Order:** first light (the reading) → Thallo (the barrels dry; the last water is the Third's) → the tailboard (the rumour), the old marine (the trick), the rise (the Witness "yes, but"), the next cloak (optional stragglers) → the key at the last water → dusk: the children far off → the halt in the night (the beat) → the rearguard (the Letherii line), Thallo in the dark → east: the ground goes wet (+1) → the press at the water (the stone), Thallo eating → the far edge: Thallo's picket word → the outriders (main) → Sedge → the fire, on.
- **The fire** `b10_c5_fire` (id kept). Phase 1: the circle under the cloaks (no fire), `witnessHTML()`, a rest, the talk (`B105TALK`, a line at the lie-up for every soldier the Third can field, Pruss included), the reading, dusk once the key is done, "Not now". Phase 2: **the fire with no fire** (the halt; sets `b10_c5_halt`), Witness shown, the beat; words by tier (hollow or doubt: "not the spit for it"); on `hold` the last of the water goes round here. Phase 3: "no circle at the water". Phase 4: **a real fire of thorn**, the first since the glass: a rest (clears the thirst), the talk (second lines), the beat if it was put off, the way on once Sedge has spoken, "Not now".
- **Map note for the lead:** 030 burns every `F` tile on any decor that is not `plain`/`hills` (the "night camp" branch), so Ch 3's glass circle has an animated fire on it. This chapter uses `O` for the circle in the glass and `F` only for the real fire at the far edge.
- **The reading:** `B10READ[5]`: the glass at first light (`b10_c5_dawn`), on `south` the road's edge at first light (`b10_south`). Say lines for Marrow, Tallow and the old marine. Offered at the first halt, the old marine (phase 1) and the circle (phase 1).

## The key `b10_c5_key` (the last water, at the `W` tile, after Thallo's word)

What the last water is: **on `b10_c3_hauled` the last barrel on the wagon the Third hauled** ("Captain says it's the Third's, since you dragged it here"); otherwise the Third's last skin. East, the next cloak over: a file of the regulars (Sedge's company, said only at the end) with its youngest failing. `witnessHTML()` shown; Haddat, Mirrel, Pruss and Tangle have lines; "Not yet" steps back.

- **`give`**: **`b10Witness(2, 'gave the last of it')`, Haddat +1, Mirrel +1** at the key. Then the water carried across and seen into him a mouthful at a time: a wits 19 check, **`witness:true`** ("yes, but" his hand will not let go: rattled); made or missed (`S.f.b10_c5_gave` = `kept` / `slow`). After it **the thirst** (`b10Thirst(b10ThirstPick())`, `S.f.b10_c5_thirst` = the id) **unless `b10_c1_water`** (`'waived'`: one skin from the sappers' wells, never counted, at the bottom of Tangle's satchel; written so it reads without Tangle too).
- **`hold`**: **`b10Witness(-1, 'held it back')`, Haddat −1**, `S.f.b10_c5_held = 1`. The water drunk by the squad at the halt in the night. No thirst. Mirrel goes across with nothing in her hands.
- **Read later (the brief):** Ch 7 (fate pages, the barrows).

## Witness (this chapter)

Start 5 (fresh) or 2–8; **the engine's wear −1** at the start. Moves: the rise's "yes, but" **−1** (the chapter's one Witness cost: `'no way back'`, on `south` worded as the grey knights going their own way); `give` **+2** / `hold` **−1** at the key; **the lake +1, fixed, once** (`'water under the column'`; on `south` `'the first well in Kolanse'`); the beat **±1**. No own-scene move. From a fresh 5: **give 6–8, hold 2–4** (inside the brief's 0–10). Test: give with the beat kept ends at 8; hold with the beat doubted ends at 3.

## Thirst

Only on `give`, once, after the water is carried across, to `b10ThirstPick()`; waived by `b10_c1_water`. Words: split lips, a slowness, "a careful way of not looking at anyone else's skin". The far edge's fire clears it (a rest).

## The beat (c5)

At the halt in the night (phase 2), the fire with no fire, before the ground goes wet. "What are we marching for?" — "Our own witness. We see it. We were here. That has to be enough." (`kept`, `S.f.b10_c5_beat = 'own'`; the RG line only as soldiers repeating "an officer said that once, in a tent, they say"), "Nothing. Nobody will ever know we were here." (`doubt`, `nobody`), "Not now" (records nothing). **Put off**, it is offered again at the far edge's real fire ("Ask it again, at a real fire"): the brief's "before the ground goes wet" is where it is first offered, not the only place (Claude's call, so a "Not now" never loses it).

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b10_c5_key` | `give` / `hold` | the last water |
| `b10_c5_gave` | `kept` / `slow` | the water carried across (`give`) |
| `b10_c5_held` | 1 | `hold` |
| `b10_c5_thirst` | an id / `waived` / `none` | after the giving (`give`) |
| `b10_c5_beat` | `own` / `nobody` | the beat (also `S.b10.beat.c5`) |
| `b10_c5_lent` | `sedge` / `twelfth` | **the lending** (Sedge on `adjunct`; the Twelfth on `south`) |
| `b10_c5_lake` | 1 | the ground gone wet (the +1 given) |
| `b10_c5_drank` | `first` / `press` | the press at the water |
| `b10_c5_ridersDone` | 1 | the outriders |
| `b10_c5_stragDone` / `b10_c5_stragLeft` | 1 | the stragglers fought / declined |
| `b10_c5_mouthfulOk` | 1: the trick learned | the old marine |
| `b10_c5_look`, `b10_c5_rumour`, `b10_c5_rear`, `b10_c5_children`, `b10_c5_halt`, `b10_c5_picket` | 1 | the rise; the tailboard; the rearguard; the children seen; the halt; Thallo's picket word |

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b10_c5_stragglers` | the next cloak, at the lie-up | `b10_straggler` ×2, `b10_ringleader` | 120 | **optional**: "Not our water. Leave it." declines (their own sergeant sees them off). Guile 19 approach ("yes, but" a hand on the hot glass). Non-lethal in words ("None of them is killed") |
| `b10_c5_outriders` | the scrub's edge, morning | `b10_outrider` ×3, `b10_kolbow`; stage 2 (the wash) `b10_kofficer`, `b10_outrider` | 380 + 170 | **main**, no allies. The horses too thin to run, so the riders fight afoot. Guile 19 approach in the thorn ("yes, but" thorn scratches). After: "None of them rides back." Headline only; the horses watered; the officer's blade |

Battle xp at `XPK` .6: the main fight alone is a level (330), so every road reaches **27** from 26 (test: level 27 after the outriders). **Balance not run** (the lead's instruction). Battle 't' is a glass shard (`b10_c5_ground`; a stone on `south`) or a thorn-bush (`b10_c5_scrub`); no foe starts on one (tested). The outriders use the engine's borrowed body (`b5_letherii`); Ch 6's artist draws `b10_kolansii`.

## The trick: The Last Mouthful (`b10_c5_mouthful`)

How the old hands hold one mouthful in the cheek and breathe round it until it matters. ✦ **wits 21, `witness:true`**, with the old marine (the Deck's third reader; "fifty years, three deserts, same mouthful"). Edges: Mirrel +2, Tegra +2, the sergeant +1 (the Fourteenth's wagons through a holy desert), Darrut +1 (the Aren Guard's rule), Sathi +1, Wenna +1; Tallow, Mehet −1. Copies **Squint's Breath** (`b2_squint`): the bearer goes still; next blow or shot +4 to hit, +2 damage; at trick level 2 a shot reaches two further. **Free** (its words end on the one-free-trick line). Not sorcery.

## Items (art in 185b, Book Ten's ground)

- `b10_c5_kolansiiblade` (weapon, blade, **atk 1, 1d10+4**): the outrider officer's blade, from the main fight.
- `b10_c5_emptyskin` (trinket, hp 3): the skin the last water came out of; given at the wet ground, both keys.
- `b10_c5_lakestone` (trinket, hp 1, wits +1): a stone from the wet ground (on `south`, from the trough), from the press at the water, made or missed.

## Pruss

Walking: lines at the circle (both lines), the halt, the key (his old squad gave its water to the next squad on the stretch), the giving (a hand under the young one's head), the stragglers, the wet ground (fills the old sergeant's helm), Thallo at the water, the picket, the outriders (shield in the wash; waters their horses), Sedge ("Back of the line. Where carters walk."), the far edge's fire, the end. Waiting: absent from every node (tested).

## The 'south' road

Still **by night** on the Commander's word, for the horses that are left (**Ch 3's choice kept**; Ch 4's `escort` marched by day: both can be true at different stretches, and the Third's own chapters stay consistent). The Twelfth's wagon-master for Thallo; the ration cut; on `hauled` the last barrel on the Twelfth's wagon; the youngest is a carter's boy of the Twelfth; the stragglers are Bolkando carters. The grey knights' dust **bends away east** off the road (WC21; first halt and the rise). The rumour is **the King's ships at the coast** (no Fist). **No children, no lake**: at grey light a Kolansii village and **the first well in Kolanse** (+1, `'the first well in Kolanse'`; `b10_kolanse` draws the well in phase 3). The outriders meet the column at the **edge of Kolanse's farmland**. At the end the wagon-master brings the Twelfth's finadd's word: the Third at the back of the Twelfth's line as file-closers "when it comes to a fight at the end of this road" (`b10_c5_lent = 'twelfth'`). Sedge is not on this road.

## The other squad

One line, at the rearguard (`b105Rumour`), the Letherii's `b10_c4_key`: both in the glass (Letherii `adjunct`): the few Letherii at the tail came in late with every horse / left horses on the glass. Third `south` with Letherii `escort`: a carter's word of a Letherii company that walked its horses (their farrier, a girl, talks to them) / kept pace with the Bolkando. Third `south`, Letherii `adjunct`: nobody on the road has heard of the few who went into the glass. **Third `adjunct`, Letherii `escort`** (no way for word to cross): the old marine's guess, matching the key, said "like a card he has turned". `b10OtherName()` not used. No sighting.

## Named inventions

None new. **Sedge** (the brief's): a thin woman, grey at the temples, a burn across one cheek, helm on her hip; she asked the heavies for file-closers and the heavies' captain gave her the Third, said once, plainly ("So the Third's lent to my company. File-closers, at the back of my line, from here to whatever's at the end of it."). On `give` the next cloak's file was hers ("The young one's walking"). Nothing about a hill or an order is said. Thallo (not eating; eating again at the water, and laughing); the heavies' captain (seen, gave his own water away, "not carrying a skin"); the old marine. Unnamed by role: the clerk at the tailboard, the regulars' youngest and his corporal (she), a sergeant of the regulars, the stragglers' sergeant, the Twelfth's wagon-master and clerk, a Bolkando foreman, the outriders and their officer.

## Canon points and hard limits

- **The water came** with no cause on the page: "nobody near the Third saw where it started"; Thallo "Up front, the ground went wet. That's all I've got." No Adjunct, no knife, no blood, no King's gift (I left the allowed "gift from the King" rumour out, to keep one rumour a chapter).
- **The children**: one sentence in `b10_c5_dusk`, far off, no names, nothing more (tested: one node, one sentence; none on `south`). No soldier gives water to a child: the `give` target is a young regular.
- **"A Fist tried to take the water"**: the clerk, once, "Word doesn't say what happened after." Never a name, the barrels or the mutiny.
- **The Assail** said once by Thallo (a soldier). The Kolansii are thin, hungry, their horses too thin to run; "none of them rides back" is the headline and the only line about it.
- No count of days or nights ("Two nights to the coast, the carters say" was **cut**: a count). Never "Bonehunters" (not said at all). The heavies' captain and the officers "walking, on foot" stands for the Adjunct, who is never mentioned.
- **Unsure:** whether the southern column was still near enough to see the Grey Helms turn off east before ch 21 (written as dust bending away, unexplained); whether Kolansii outriders were watching the glass's edge at all (GR21 says only that the Assail thought the army dead; the outriders are the game's own and justify that line).

## Engine changes

None. `B10READ[5]`, `SCENEX.b10_c5_dawn`, `SCENEX.b10_lake` and `SCENEX.b10_kolanse` (180's placeholders, now drawn), `TILEX.b10_c5_ground` / `_wet` / `_scrub` and a guarded `drawFeature` wrapper (those styles only) are this chapter's own.

## For Chapter 6's and Chapter 7's writers, and the lead

- **Ch 6 (the Letherii):** the Third's one line may be `b10_c5_key` as rumour: the foreigners' heavies gave their last water to another company's youngest (`give`) or kept it (`hold`); and/or "the ground went wet under them in the glass" (far-off news; never how). On a shared column (Third `south`, Letherii `escort`), the Third is with the Twelfth as file-closers (`b10_c5_lent = 'twelfth'`): **the Twelfth is not the Sixth**; keep the two on separate stretches. `b10_kolanse` is drawn (thin fields, granaries, watchers; reads `b10_tRoad` and `b10_c5_ph` only for the well).
- **Ch 7 (the Third):** the Third is **already lent to Sedge's company** (`b10_c5_lent === 'sedge'`; Sedge has met it and, on `give`, owes it a file's youngest). Don't re-introduce the lending; the brief's "say it once" is spent here. On `south`, `b10_c5_lent === 'twelfth'`: the Third stands at the back of the Twelfth's line in the allied battle. Fate-page material: `b10_c5_key`, `b10_c5_gave`, `b10_c5_beat`, `b10_c5_thirst`. The empty skin and the lake stone are in the kit for words.
- **Trope budget:** this chapter adds 2 Nobody/Somebody openers, 1 "the way" simile, 0 silence beats (B10 now 48,894 words: nobody 28, silence 19, theway 12).

## Tests (Tue Nov 10, 2026)

`python3 build.py`; `node --check` on both files; `node tools/lint.mjs`: no error from this chapter (its warnings are the two own battle styles, as Ch 3's and Ch 4's); **one error outside it, in Ch 4: `b10_c4_ennic: a choice has no text`** (the `horses` choice's `t` is a function, `src/184_b10_ch4.js`; not touched here, for the lead); `tools/b10ch5_test.mjs` all ok (a `--from=5` start on `haul`, both keys from the same moment, the thirst waived by `b10_c1_water`, the `south` road with the Letherii's `pace`, a transfer's squad with the wagon cut and Pruss waiting); `b10engine_test`, `b10ch1_test` … `b10ch4_test`, `los_test`, `trope_test`, `recruit_test`. A 412×915 dpr-1 screenshot of the first lie-up looked right. Not run (the lead's instruction): `run_all`, `balance`.
