Tue Nov 10, 2026, 1:02 PM PST. Book Ten, Chapter 2, "The Parting" (`src/182_b10_ch2.js`, art `src/182b_b10_ch2_art.js`, test `tools/b10ch2_test.mjs`), against the Book Ten engine on `book10` (v13.0.0, not shipped).

# Chapter 2 notes: The Parting

The Sixth Company in the Commander's brigades, the day the army splits. The brigades marched the night through along the glass's edge to where the road south bends away from it (Claude's call: so the parting can be watched, and Ch 1's grey-light halt and the allies "turning south" both hold); the train halts on a low rise above the edge; below it the foreigners lie up under their cloaks and go out onto the glass at dusk. Then the first night south, and later on the road the lizard-folk join the column.

## Shape

- **Areas (4, ground `b10_c2_ground`):** `b10_c2_rise` (afternoon), `b10_c2_dusk` (the same rise at dusk, dark), `b10_c2_halt` (the first night's halt; on `adjunct` the first halt on the glass), `b10_c2_road` (the road south by day; `escort` only).
- **Nodes:** 48 `b10_c2_*` (the reading's two included).
- **Phases** (`S.f.b10_c2_ph`): 1 the rise; 2 dusk (set by the key); 3 the first night (the way south); 4 the road (`escort`, from the halt's way on).
- **Order:** the horse-lines (first halt: Tirren; the reading) → Ennic → the drill → Yelt (the trick), Orla (the tally), Saffa (the Third's line), the tile-woman, the overlook → the deserters at the water wagons (`escort`) → Ennic's key → dusk: the edge or the count → the fire, south → the halt: the dogs (optional), the beat → the road: the big ones, Ennic's word → the end.
- **The fire** `b10_c2_fire` (kept for the games pass): `witnessHTML()` in every phase; a rest in phase 1 and 3; the talk (`B102TALK`, a line by day and by night for Tobet, Thegg, Perrit, Ammet, Ilsa, Sorvan, Ruuk, Brune, Pessa, Brennet, Kaedra, Tirren; night lines vary by road); the reading in phase 1; the beat in phase 3; the way on in phases 2 and 3; "Not now".
- **The reading:** `B10READ[2]` redefined with getters (same `where`, `back`, `backT`, `say`): phase 1 "Afternoon on the rise…" on `b10_train`; later 180c's evening text (or a glass-night text on `adjunct`). Offered at the first halt, the tailboard and the fire in phase 1.

## The key `b10_c2_key` (Ennic, late afternoon, once Tirren is settled, the drill done, and on `escort` the deserters done)

- **`watch`**: `S.f.b10_c2_watched = 1`, **Tobet +1** at the key. Dusk at the rise's edge: a wits 17 check with **`witness:true`**; made or missed, the column is seen to go (`S.f.b10_c2_watchDone` = `gone` / `dark`) and **`b10Witness(1, 'saw them go')`** once. On `adjunct`: from the glass's edge, the brigades going south over the rise.
- **`count`**: `S.f.b10_c2_counted = 1`, **Brennet and Tirren +1** at the key (Brennet counts when walking or with the train). Yelt's barrels by lamplight: wits 17, the Water Ledger's bearer +2; made or missed the count is done (`S.f.b10_c2_countDone` = `true` / `slow`): eleven barrels short, "Grey Helms, noon". No Witness move.
- **Read later (the brief):** Ch 4 (`counted` waives its thirst once), Ch 6 (`watched`: a line at dusk), Ch 7 (the Sixth's pages).

## Witness (this chapter)

Start 5 (fresh) or 2–8. Moves: `watch` **+1** once; the beat **±1**. No "yes, but" Witness cost, no own-scene move. Fresh range: **watch 5–7, count 4–6** (brief 4–7).

## Thirst

Only on `adjunct`: arriving at the first halt on the glass, `b10Thirst(b10ThirstPick())` once (`S.f.b10_c2_thirst` = the id, or `'none'`). None on `escort`.

## The beat (c2)

At the fire on the first night (phase 3, `b10_c2_beat`), until answered. "Why are they going?" (`adjunct`: "…And why are we?"): "a reason we haven't been told" (`kept`, `S.f.b10_c2_beat = 'reason'`), "the Commander asked us to follow" (`adjunct`: "let us follow"; `kept`, `commander`), "Foreigners. Mad" (`doubt`, `mad`), "Not now".

## Flags later chapters may read

| Flag | Values | Set where |
|---|---|---|
| `b10_c2_key` | `watch` / `count` | Ennic |
| `b10_c2_watched`, `b10_c2_counted` | 1 | the key (shared flags) |
| `b10_tirrenDone` | 1 walks / 2 waits | the horse-lines (engine flag) |
| `b10_c2_watchDone` | `gone` / `dark` | the edge (`watch`) |
| `b10_c2_countDone` | `true` / `slow` | the count (`count`) |
| `b10_c2_beat` | `reason` / `commander` / `mad` | the beat (also `S.b10.beat.c2`) |
| `b10_c2_joined` | `held` / `bolted` | the big ones come in (`escort`): the horse-lines held, or three horses ran (and came back) |
| `b10_c2_thirst` | an id / `none` | `adjunct` only |
| `b10_c2_ledgerOk` | 1: the trick learned | Yelt |
| `b10_c2_desDone`, `b10_c2_sparDone`, `b10_c2_dogsDone` / `b10_c2_dogsLeft` | 1 | the fights |
| `b10_c2_orla`, `b10_c2_where`, `b10_c2_word` | 1 | the tally; Ennic's "Kolanse"; Ennic's "Che'Malle" |

## Fights and xp

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b10_c2_spar` | the rise, against a file of the Ninth | `b10_c2_sparrer` ×3, wave of 2 at round 2 | 120 | **survive 4, the Letherii's first fight** (near 100%); headless spear-shafts; death checks still run |
| `b10_c2_deserters` | `escort`: the water wagons by day; `adjunct`: the Sixth's barrels on the glass by night | `b10_lbolkando` ×3, `b10_lbolkandobow`; stage 2 `b10_lbolkandochief`, `b10_lbolkando` · `adjunct`: `b10_lstraggler` ×4; stage 2 `b10_lringleader`, `b10_lstraggler` | 380 + 170 | **main**; ally `b10_lspear`; guile 17 approach ("yes, but" a knee / a fall on the glass). Stragglers never killed in words ("stays down", "back to his company") |
| `b10_c2_dogs` | the dead horse at the halt (dark) | `b10_ldog` ×4 | 100 | optional; "Leave it to them" declines |

Own foe: `b10_c2_sparrer` (`b5_letherii`, hp 30, ac 14, atk 8, 1d4+2). Battle xp at `XPK` .6: the main fight alone is a level, so every road reaches **17** (test: 5032 xp on `watch` with the dogs). **Balance not run** (lead's instruction).

## The trick: The Water Ledger (`b10_c2_ledger`)

Yelt counts a barrel once for the book and again for the barrel, and believes the second. ✦ wits 20 at Yelt; edges: Perrit (sums) +2, Ilsa (ledgers) +2, Brennet (staves) +2, Tobet (tally-stick) +1, Tirren (horse count) +1, the sergeant (Yelt's ration book on the Wastes) +1; Thegg, Ruuk −1. Copies **the Toll Count** (`b8_c7_toll`, itself the Lady's Pull): chapter charges (2, +1 from level 5), re-roll a failed check or roll twice before an attack, next check −2; free.

## Items (art in 182b, Book Ten's ground)

- `b10_c2_spear` (weapon, reach, atk 1, 1d8+3, rng 2): the train-guard's crossbar spear, after the drill.
- `b10_c2_coat` (armour, light, **ac 2, hp 3**): a quilted dust-coat, after the deserters (either road).
- `b10_c2_tally` (trinket, hp 2, wits +1): Orla's knotted water-tally, first visit.

## Tirren (the recruit)

Joins at the first halt, the horse-lines, getting a downed horse (Wren) up; asks for a place "because a squad can decide when it stops"; her apron's tally of horses lost. Waits at the horse-lines when six walk. Named horses: Wren, Plum, Copper (lame; taken by the deserters on `escort`). She has not said which horse she means to bring home (left open). Lines at the fire, the key, the end, the drill, the deserters, the count, the halt, the dogs, the big ones.

## The other squad

One line, from Saffa: the Third's `b10_c1_key` as rumour (the burial lines / the wells), or on a Third `south`, Yelt's promised drill-sergeants ("drilling the Twelfth at the far end of the train"; on `adjunct`, "they go south with the brigades; you go east with theirs"). `b10OtherName()` not used. The squads never share a scene.

## Canon and hard limits

- The lizard-folk seen from the train, never close; "Che'Malle" said once, by Ennic (`b10_c2_ennic_road`), as the staff's word; two riders in foreign kit among them, far off, never named. Brys's meeting with them is never shown or said; the Commander is a banner far off.
- The Grey Helms are dust ahead (and "took their share at noon and a little more"). The Bolkando court never; a Bolkando officer apologises to Yelt.
- The Errant answers the sergeant's prayer in this chapter (engine); a line at dusk says "something like a coin turning answers it, faintly", nothing of his going.
- No count of days. "Bonehunters" not used ("the foreigners").
- **Unsure:** whether the allies' road actually ran along the glass's edge for a night before turning south (written so the parting can be watched, per the brief); whether the Che'Malle came to the column by day on the march (WT ch 10 has the meeting, not its staging).

## Engine changes (in this file, guarded)

- The Water Ledger's check half wraps `trickLeft`, `spendTrick`, `rollDice`, `note`, `blog` (and a `MutationObserver` on the dice button), guarded by `b10On()` and only when the squad carries the Ledger and not the Pull (the pattern of 127 and 147).
- `SCENES.b10_train.loc` gets a getter: "The glass's edge" in Ch 2 phases 1–2, 180's otherwise.

## For Chapter 3's writer, and the lead

- Ch 3 is the Third's; the Letherii's one line it may give is `b10_c2_key` as rumour: someone "stood on the edge of the rise and watched us go" (`watch`) or "the Letherii counted their water twice before they turned south" (`count`). On a Third `south`, the Letherii are in the same column (or, on Letherii `adjunct`, a few Letherii at the foreigners' tail).
- `b10_south` (backdrop) draws the big ones along the flank once `b10_c2_joined` is set or from Ch 3 on; Ch 4's artist may redraw it.
- Trope budget: B10's Nobody/Somebody openers stand at 21 of about 31 allowed (22,464 words); later chapters should keep them rare.

## Tests (Tue Nov 10, 2026)

`python3 build.py`; `node --check` on both files; `node tools/lint.mjs` 0 errors (its style warnings name `b10_c2_ground`, as every chapter's do); `tools/b10ch2_test.mjs` all ok (fresh start, both keys from the same moment, the `adjunct` road, a --from=2 style transfer save); `b10engine_test`, `b10ch1_test`, `los_test`, `trope_test`, `recruit_test` all ok. Not run (lead's instruction): `run_all`, `balance`.
