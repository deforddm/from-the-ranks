Wed Oct 21, 2026. Book Four, Chapter 1, "The Muster" (`src/71_b4_ch1.js`, art `src/71b_b4_ch1_art.js`), against v7.0.0 on `book4` (not shipped).

# Chapter 1 notes: The Muster

Aren, two days before the march (HoC ch 8). The review seen from the 9th's line; the afternoon in the harbour streets on Hollet's errand; the first night in the 9th's barracks yard and over the wall in the old cemetery; the Adjunct's order; the second night; dawn on the Aren Way.

## Shape

- **Areas (4):** `b4_c1_line` (the marshaling ground's edge, ground `b4_c1_aren`), `b4_c1_streets` (the harbour streets, `b4_c1_aren`), `b4_c1_barracks` (the yard at night, `b4_c1_barracks`), `b4_c1_cemetery` (the old cemetery at night, `b4_c1_graves`). The review, the market, the quay and the cemetery's arrival are backdrop nodes.
- **Nodes:** 79 `b4_c1_*` dialogue nodes (deck and card included).
- **Phases:** `S.f.b4_c1_ph` 1 the day, 2 the first night (set at the barracks gate), 3 the second night (set by `b4_c1_night2`), 4 dawn. Once the gate shuts the squad is confined to barracks and the streets are not offered again (canon: the confinement).
- **The first halt** is the barracks yard on the first night (`b4_c1_yard_arrive`; `b4DeckChoice(1)` there and at the fire), because the reading place is the yard at night (`READTABLE['hoc:1']`). `B4DECK[1]` is replaced from this file; its `back` is the fire.
- **The fire** `b4_c1_yard` (id kept for the games pass, 79): `again:` line; `b4Offers()` swaps; a rest once a night (`b4_c1_rest2`, `b4_c1_rest3`); the squad's talk (`b4_c1_yard_talk`, one line per squadmate present, both nights, Orvas guarded too); the pipe (pass or sell); the way on (over the wall / the dig detail / the end bunk-house / sleep) with "Not now".

## The key `b4_c1_key` (= `S.f.b4_bone`)

Chosen with Radde in the Chain's corner after the first night's fight (`b4_c1_key`; "Give me a moment" declines).

- **`grave`**: bones from Aren's old graves, asking first. Nerve +2 ("the company took the squad in as its own"); Haddat −1, Marrow −1 (*Claude's call*: "say nothing kind" read as disapproval). Radde's mark: a finger bone, the company's. Second night: Hollet's dig detail in the cemetery, the thieves come back with the sexton's key (fight `b4_c1_watch`). The company makes room at its fire.
- **`chain`**: the order's bone, tied with a Chain token: `S.f.b4_c1_token` = `thread` (Haddat's blue thread; needs Haddat) / `string` (a knot off Marrow's string; needs Marrow) / `feather` (a crow feather from the pilgrims' road; always) / `keepsake` (only if `b4Was('keepsakes')` is non-empty). Nerve −1; Haddat, Marrow and Sathi +1. Radde's mark: a knot (`S.f.b4_c1_radded = 1`). Second night: recruits whose cask the Red Blades found blame the "Chain dogs" (fight `b4_c1_brawl`).
- Both keys give `b4_c1_finger`. The squad wears a finger bone either way (the brief's recurring invention); on `chain` the token is tied to it.
- **For later chapters:** Ch2 at the Fall and Ch7 when the dead ride read `S.f.b4_bone`. On `chain`, `b41Token()` (this file) gives the token in words; read `S.f.b4_c1_token` directly in other files.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b4_company` | 1 | posted to the 9th's Second Company (set at the first node) |
| `b4_blistig` | 1 | Blistig seen grumbling (set at the fall-out, always) |
| `b4_bone`, `b4_c1_key` | `grave` / `chain` | the key |
| `b4_c1_token` | `thread` / `string` / `feather` / `keepsake` | `chain` only |
| `b4_c1_radded` | 1 | Radde wrote the Chain mark (`chain`) |
| `b4_c1_relic` | `bought` / `broken` / `left` | the relic stall |
| `b4_c1_relicBuried` | 1 | the bought finger buried in the Chain's corner |
| `b4_raminDone` | 1 walks / 2 near | Ramin on the drink sweep (transfer with `S.imported.ramin` only) |
| `b4_kethDone` | 1 walks / 2 near | Keth on the quay (transfer with `S.imported.keth` only); if Ramin already walks, `b4Join` leaves Keth at 2 |
| `b4_c1_hollet` | `ninth` / `chain` | what the sergeant told Hollet (ninth: Nerve +1, Haddat −1; chain: Haddat +1, Sathi +1) |
| `b4_c1_drill` | `clean` / `ok` / `fail` / `talk` | the recruits' shield drill |
| `b4_c1_recNight` | `truth` / `sleep` | what the recruits were told about the omen |
| `b4_c1_runnersDone`, `b4_c1_digDone`, `b4_c1_watchDone`, `b4_c1_brawlDone` | 1 | fights done |
| `b4_c1_sexton` | 1 | the sexton taken (`grave`) |
| `b4_c1_cartSharper`, `b4_c1_cartName` | 1 | a sharper off the 8th's munitions cart; the guard has the sergeant's name ("yes, but") |
| `b4_c1_redName` | 1 | the Red Blades took the sergeant's name at the stall ("yes, but") |
| `b4_c1_sash`, `b4_c1_quay`, `b4_c1_water`, `b4_c1_blast`, `b4_c1_grub`, `b4_c1_tenth` | 1 | seen / done |
| `b4_pipe<n>` | 1 | the durhang pipe passed round in chapter n (`b4PipeChoice(back)` offers it at any fire) |

## Nerve in this chapter

The omen −1; Blistig "in the recruits' hearing" −1 (both always); Hollet `ninth` +1; the drill, clean only, +1; breaking the stall +1 (failing −1); the runners' company fight, clean, +1 (engine); the recruits at night: truth −1 / "go to sleep" +1; the key `grave` +2 / `chain` −1; the dig detail's company fight, clean, +1 (engine). A middling path: `grave` about +3, `chain` about −1. The test's (most generous) `grave` path ends at Nerve 8 from 5.

## Inventions (Claude's calls)

- **The Second Company**, **Captain Hollet** and **Sergeant Radde** are the book brief's. Radde's book, its marks (a bone for the company, a knot for the Chain), and his "two wars" line are this chapter's.
- **The old gate sergeant** of the Aren Guard at the 9th's barracks gate (Darrut's old drill sergeant; unnamed). The 9th's barracks are the Aren Guard's old barracks on the harbour side, with the old city cemetery behind the yard wall.
- **The Chain's corner**: a strip of the old cemetery where the city buried the Chain's people who came in alive and died after; painted boards, one reading *Seventh · the last mile* (the Aren Guard "brought in what it could from the last mile of the Way, after": camp talk, not narration). It carries the chapter's one Barrow line: the fallen "may be under it, or may not".
- **The relic seller**, the **bone-broker** and his cloth, the **sexton** (unnamed) who sold the gate key, the **pipe-man** and the durhang runners, the **freckled recruit**, the **10th's corporal** at a grave, the **ringleader** (a regular of the 10th). None named.
- **Hollet's errand** (water and rations from the quay stores before the gates shut) is what puts the squad in the streets on the confinement day.
- The young Red Blade who cuts his badge off and drops his sash (fresh start); Ramin gives his own sash (transfer).
- Items: `b4_c1_finger` (wearer starts a fight steady while Nerve ≥ 5), `b4_c1_relic` (guile +1; Haddat cannot wear it), `b4_c1_redsash` (armour +1; Ramin hits +1 in it), `b4_c1_durhangpipe` (once a chapter at a fire: clears rattled and owed bruises; Marrow −1; or sells for 8).
- The trick **The Gate Drill** (`b4_c1_gate`, ✦ wits 16 at the gate; Darrut +3, Haddat +1, Hessa +1, Tebbet −2, Marrow −1): once a fight, the bearer and squadmates beside them +2 armour (+3 from level 11), and an enemy next to any of them cannot step until the bearer's next turn (it can still swing). Not sorcery.

## Canon as written

- The squad sees the blast as a white flash and a dust cloud in the 8th's ranks across the ground, and Grub as a small fair-haired boy with something pale, far off; a captain of the 8th picks him up (named Keneb only on Book Two's `guard` road, where the squad knows him). Cuttle, Strings, Gesler, Stormy, Pearl, Lostara and the *Silanda* do not appear. The Adjunct is "a grey shape on a grey horse" across the ground.
- Blistig, to his officers: "Staged... Keneb's brat", the Adjunct "mad", "the army's finished" (R8, W8 as the canon sheet gives them).
- The Red Blades take the drink and the durhang; 300 Crow by three ships with horses and dogs, walking past Temul; "some forty" youths; Lenestro found with his neck broken (camp talk, "somebody off the Chain", never who); Mallick Rel and Pullyk Alar gone from Aren together (rumour; Rel named "the Jhistal priest" only). Fist Gamet to make a standard of the bones, a lieutenant of the 8th told to wear one (camp talk; Ranal unnamed).
- No Burn's Sleep year, no never-use names, never "Bonehunters", "3rd Company" or "Dancer's Tavern". The bones are never given a later name.

## Engine additions in this file (all guarded by `S.book === 'hoc'`)

- `b4Import` is wrapped to copy Book Two's `b2_nobles7` into `S.imported.f` (70's `B4_KEEP` does not list it, and the brief asks for the Pullyk line). Lead: consider adding it to `B4_KEEP`.
- The Gate Drill: `atkCalc` (+2/+3 armour), `ai` (an adjacent enemy spends its move), `squadTurnStart` (the gate ends on the bearer's turn).
- The finger bone's steady start (a `startBattle` wrap); the sash's +1 for Ramin (in the `atkCalc` wrap).
- `b4PipeChoice(back)`, a global helper for any later fire.
- In 71b: `drawFeature` draws a battle's low cover in `b4_c1_aren` and `b4_c1_barracks` as crates (the city kind).

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b4_c1_runners` | the 9th's gate | 130 | `company` (1 regular, more at Nerve 7+/9+); a wave at round 3; Tangle's smoker; a wits 13 flank (surprise) |
| `b4_c1_dig` | the Chain's corner | 160 + 80 | `stage2` *The bone-pits* (the bone-broker); a wave at round 2; Tangle's burner; guile 14 to come round |
| `b4_c1_watch` (`grave`) | the dig detail | 160 + 80 | `company`; `stage2` *The sexton's gate* (the sexton); wits 14 to wait in the dark |
| `b4_c1_brawl` (`chain`) | the barracks yard | 160 + 80 | objective: survive 4 rounds, "fists and staves, nobody killed"; `stage2` *The bunk-house door* (the ringleader); guile 15 talks some of them out (surprise) |

A playthrough fights three (runners, dig, one key fight): about 366 xp, level 8 → 9 (the bot reaches 9 in every run).

**Balance** (`tools/balance.mjs`, a scratch `--patch` putting each fight in a fresh Book Four state: level 8 unless noted, Nerve 5, a card from `B4POOL[1]`; B4GAP and every rule unchanged; 12–16 smart runs, 4 naive):
- Soldier, level 8: runners 100% (23% health lost, 0.42 downs), dig 100% (30–40%), watch 100% (27%), brawl 100% after easing its wave to one recruit (20%; it was 92% with two). Naive: runners 100%, dig 50–75%, watch 100%, brawl 25% → 75%.
- Soldier, level 9 (the key fights as they fall): dig, watch, brawl 100% (22–24% lost).
- Bridgeburner, level 8: runners 100% (34% lost), dig 75% (60%), watch 75% (57%), brawl 83% (58%, with the two-recruit wave).

## Left open on purpose

- Who is under the board marked *Seventh · the last mile*.
- What the old gate sergeant's name is; whether the sexton is tried.
- Ramin's or Keth's place if both were asked: the one who waits is near (`b4Offers` at any fire).

## Canon points I was unsure of

- The order of the day in ch 8 (review, the graveyard raid, the order to wear the bones, the confinement): the game puts the review in the morning, the confinement from dusk, the raid that night and the order at noon the next day. The canon sheet gives the events, not their hours.
- Whether the Crow's ships came in on the review day: written as the same afternoon.
- Where Lenestro died, and when: written as camp talk, "the day the army came in".
- Whether the 9th's barracks are near the harbour or the old cemetery: an invention (the canon sheet places a cemetery near "the barracks").

## Tests

- `tools/b4ch1_test.mjs` (22 checks): a fresh start through the review, the company, the streets, the harbour fight (company, forced win, Nerve +1), the trick, the first halt and the Deck, the fire, the night, the graveyard fight (both grounds), both keys and both key fights (both grounds each) to the chapter's end; then a Book Two transfer on the Aren Guard road with Sathi alive (Hackle in the fights), Ramin joining on the drink sweep, Keth waiting, the swap at the fire, the Pullyk line, and the keepsake token.
- With a Book Four chapter registered, Book Four is on the shelf, in the picker and in Deeds, and Begin starts it. Four tests assumed three books and were made to expect Book Four exactly when `BOOKS.hoc.coming` is false: `b4carry_test` (shelf, picker, Begin), `shelf_test` (covers, pictures, the Classic numerals), `moi_test` (the picker, Deeds), `import_test` (a fresh device's shelf).
- `lint.mjs` still warns (not errors) on the three new battle styles `b4_c1_aren`, `b4_c1_graves`, `b4_c1_barracks`: its style list knows `/^b3/` and not `/^b4/`.
