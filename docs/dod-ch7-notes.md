Mon Nov 9, 2026, 10:42 PM PST. Book Nine, Chapter 7, "The Rearguard", and the book's finale (`src/167_b9_ch7.js`, art `src/167b_b9_ch7_art.js`, test `tools/b9ch7_test.mjs`), against the Book Nine engine on `book9` (v12.0.0, not shipped).

# Chapter 7 notes: The Rearguard (and the finale)

The Third's last chapter and the book's one mortal fight (David, Nov 9). The same battle as Ch 6, at its other end: late in the day into the dark (dod-canon corrections 3 and 9). The marines and heavies hold while the regulars break (RT4 S3). The Third holds a stretch of the heavies' rearguard canon never names, "between a cut bank and a line of burned wagons", on a plain in the Wastes nobody has named. Then the dark, the walk back in step, a grey morning on the retreat trail, the retreat camp days after, the Third's road, and the finale for both squads.

## Shape

- **Areas (4, 16×12, ground `b9_c7_field`):**
  - `b9_c7_rear`: the stretch late in the day. The shield line north (`L`), the plain in front (`;`, no walking), the cut bank west (`d`), the burned wagons east (`K`), the sappers' last wagon (`W`), the surgeons' last cart (`c`), the heavies' brew-fire (`F`), the way back south (`<`). Phase 1.
  - `b9_c7_dark`: the same stretch after dark (`dark:true`), the wagons alight, the stone at the east end (`E`, looking east), the way back (`>`). Phase 2.
  - `b9_c7_trail`: the retreat trail at a grey morning: the quartermaster's abandoned wagon (`W`), a broken cart (`c`), on north (`>`). Phase 3.
  - `b9_c7_camp`: the retreat camp days after, at dusk: tents, the cook-wagon (`W`), the Third's fire (`F`). Phase 4.
- **Nodes:** 62 `b9_c7_*` dialogue nodes, the reading's two included.
- **Phases** (`S.f.b9_c7_ph`): 1 late in the day (set at `b9_c7_start`); 2 after dark (set leaving the rearguard, `b97ToDark()`); 3 a grey morning (set by the walk back); 4 the camp days after (set at the trail's end).
- **The order a player meets things:**
  - Phase 1: the stretch (Tegra and Brask lines if they walk); Thallo (the captain's word: hold till dark, then walk back in step; "whoever goes down out there tonight stays down"); the brew-fire (rest, talk, roster, the Witness, into the line); the captain seen down the line; the regulars coming back (a check); the surgeons' last cart (a rations check); the sappers' last wagon (a cusser, and a check for a second); the burned wagons (the far fight, at a distance); the old marine ("after dark"); the line (lock shields, a check; the Witness; "Third. Hold."); the hold; **the rearguard (mortal)**.
  - Phase 2: the fallen said once (headline: cloaks in a row by the burning wagons); the lull (the first halt after dark: the reading, Thallo, the trick); the horsemen far off; the burning wagons; Thallo's word for after dark; **into the dark** (survive 5); the walk back in step.
  - Phase 3: the trail (no food); the runner with the news; stragglers (a check); the abandoned wagon (the cloak); the broken cart; the dogs (optional fight, or a check, or leave them); on north.
  - Phase 4: the camp (the column's pot); the cook-wagon; Thallo's three slates; the key; the heavies at the next fire (the Letherii's one line); the surgeons' lines; the old marine; the fire (the roll stick; the last of it); the end.
- **The first halt after dark** (`b9_c7_lull`) has `b9ReadChoice(7)` (Claude's call 1, below).
- **The fire** (`b9_c7_fire`, id kept for the games pass): phase 1 is the heavies' brew-fire behind the line (rest, talk, roster, the Witness, "Into the line" with "Not now"); phases 2–3 have no fire (the node says so; no map trigger reaches it); phase 4 is the retreat camp (rest, talk, the roll stick, "The last of it" once the key is made). `rationsHTML()` in every phase. The talk: a line before and a line after for every soldier the Third can field (`B97TALK`: Haddat, Sathi, Tangle, Marrow, Mirrel, Doss, Wenna, Mehet, Ottar, Tallow, Hessa, Tebbet, Darrut, Yorin, Rasp, Orvas, Ramin, Keth, Brask, Tegra).

## The mortal fight: `b9_c7_rearguard`

- **Foes:** `b9_nahruk` ×3, `b9_nahrukcaster`; stage 2 ("The rearguard, at dusk") `b9_nahrukbrute`, `b9_nahruk` ×2. **Allies** `b9_heavy` ×2 (stage 1). **xp 400 + 180.** `mortal:true`; death checks off (tested in both grounds); hunger counts (160). Locking the shields first (might 17) gives surprise.
- **Signposted before it starts:** Thallo says it; the line's text says it in bold; every choice into it carries `tag:'mortal'` and "(a mortal fight: whoever falls here stays down)" (the fire, the Witness's after-node, the line, the lock nodes, the hold); the hold's text ends on it; the battle's `preText` and stage 2 text end on it; `warrenText` says it; the engine logs it.
- **After:** `b9_c7_rear_after` names who fell (from `S.f.lastFallen`), one sentence of the squad by them, then the heavies lay them by the burning wagons under cloaks. Nothing close. `S.f.b9_c7_fell` keeps the list; `b97Fell()` reads `S.dead` (chapter 7, no `from`). A sergeant who falls gets 31's scar (`S.f.sgtScar`) and one line.
- **Balance:** not run (the caller asked for no long suites; balance is the next step, to David). It is five short-tails across two grounds against a fresh 19 or a `--from=7` 22, with two heavies, the sappers' cusser (or two), and Fight Them Low learned only after. The levers: the allies, stage 2's two `b9_nahruk`, surprise from the lock.

## Other fights

| id | where | foes | xp | notes |
|---|---|---|---|---|
| `b9_c7_dark` | the stretch after dark (`dark:true`) | `b9_nahruk` ×2, `b9_nahrukcaster`; a wave at round 3: `b9_nahruk` | 160 | **survive 5**, not mortal (death checks run); one `b9_heavy` |
| `b9_c7_trail` | the trail, morning (optional) | `b9_dog` ×3 | 90 | or might 17 to drive them off, or leave them |

- No own foes. Combat numbers at the engine's defaults; `B9GAP`/`B9SOLDIER` untouched.
- **Xp:** a fresh Third at 19 ends at 20 with every fight (test); a `--from=7` Third at 22 ends near 23.

## The key `b9_c7_key` (the Third's road), and how Witness colours it

Thallo's three slates at the camp days after ("Army's not going to stay one army. Clerks say the Adjunct means to go east, where there's no road. The Letherii are to go south, the long way round, with whoever else comes up."), with `rationsHTML()`. Brask, Tegra and Haddat have lines. "Not yet" steps back.

- **`adjunct`** (canon's road; never the Glass Desert by name): Haddat, Brask, Marrow +1; Mirrel −1.
- **`south`** (with the Letherii, the long way round; never "the coast"): Tegra, Tangle, Doss +1; Brask −1.
- **`home`** (time served, walk back west): Mirrel, Wenna +1; Haddat −1 unless the Third's faith is `doubt`.
- **`b9Faith('t')`:** on `doubt` Thallo's slates fall on a quiet fire, a squadmate says "home" out loud first, the home choice reads "Home. Say it plainly: home." and costs nothing, and the east choice reads "East. Because the column does."; on `kept` the Third looks at the east slate first, and home costs Haddat. With no beat at all (a bare save) the words are neutral.
- `chapterEnd(7, key)`; `CHEND[7]` titles: *East, with the army* / *South, the long way round* / *Time served*.

## The Witness beat (`b9Wit`, `S.b9.wit.c7`)

- **Where:** before the dark, in the rearguard (the brief): a heavy of the next file says "we shall be our own witness" to the man beside him, and it goes a little way along the shields. Reached from the brew-fire or the line, phase 1, before the fight.
- **The answers:** "Each other. Same as the road. Same as the stretch." → `kept` (`S.f.b9_c7_wit = 'each'`); "So somebody walks off this and says the Third stood. Our own witness." → `kept` (`'own'`); "Because we're the ones they put here. That's all it is." → `doubt` (`'put'`); "Not now" records nothing (the chapter can be played without it).
- Never a speech by Tavore heard; soldiers repeat the RG line.

## Rations (this chapter)

| Move | Where | Amount |
|---|---|---|
| The march | the engine, at the chapter's start | −1 |
| The chapter's one ration "yes, but" (once, `b9_c7_lost`) | the surgeons' cart (might 17, `rations:true`), near roll: the last sack of biscuit left in the grass for the carry | −1 |
| The retreat | the trail: nothing found (said, no move) | 0 |
| The days after (once, `b9_c7_pot`) | arriving at the camp: the column's pot | +1 |

- No own-scene move. Ranges: Ch 5 ended 1–10, Ch 7 starts 0–9, ends 0–10. A fresh or `--from=7` save at 6 goes 5, then 6 at the end (or 5 with the cart's near roll).
- **Hunger:** the line's text adds one sentence at `short` or below (`b97Hunger()`); the engine takes 5/10/15% health in every fight here, the mortal one too. At 5 (`fed`) nothing.

## The trick: Fight Them Low (`b9_c7_low`)

- What the heavies learn in the rearguard about where the plate won't give: under the long head, behind the backward knee, where the bands meet at the hip (RT4 S7: "they fought low, where the armour wouldn't give"; the marines will call it that after).
- **The check:** ✦ wits 19, phase 2, at `b9_c7_low` (from the lull, or the heavy of the next file's figure). **Brask teaches it if he walks** ("saw a marine do it at noon"); otherwise a heavy of the next file. Edges: Brask +2; Squint's Breath already held (the sergeant) +2; Tangle (a sapper goes under a wall), Haddat (a shield low), Mirrel (joints), Tegra (a bull at the hock) +1; Ottar and Marrow −1.
- **What it does:** copies Squint's Breath (`b2_squint`): the next blow +4 to hit and +2 damage (`steady` + `rallyUntil`; from squad tier 2, +2 to hit until the bearer's next turn). **Free** (`free:true` on its `AB`; the words end on the one-free-trick line). Not sorcery.

## Items (each with its own art, 167b)

| Item | Kind | Stats | How it is got |
|---|---|---|---|
| `b9_c7_rearguardcloak` | armour, mail | **ac 3, hp 5** (the real number: Ch 1's heavy scale is ac 3, hp 4) | the quartermaster's abandoned wagon on the trail: a bale of rearguard cloaks |
| `b9_c7_rollstick` | trinket, any | hp 2, wits +1 | cut at the camp fire: a notch per soldier since Letheras, a line across for the fallen |

## The finale (`B9CH7.finale`; 37's pages, extended in this file, guarded by `b9On()`)

- **The order:** the Third's road page (`b9_c7_road`, drawn by the key; Rations at the end; "Book Ten, when it is written, will offer this save" on `adjunct` and `south`) → a fate page for each soldier of the Third walking → a page for each not walking (the fallen tonight, the fallen before this book, the waiting, any recruit sent away) → the Third's sergeant → **the Sixth's road** (`b97road`: by `S.f.b9_lethRoad`, Ch 6's key in one line, their sergeant, their Rations, onward or not) → a page for each of the Sixth (from `B9CH6.fates.pages()`: walking, waiting, fallen in Book Nine; **plus their fallen from before this book**, which Ch 6's pages leave out) and their sergeant (Book Five's look, painted once and lent to the portrait cache, as Book Seven's) → *Where the books meet* ("Into the Wastes") → 37's end page (the coda for both squads, the road, the dead, the count, `The End of Dust on the Boots`, the credit to Steven Erikson and Ian C. Esslemont).
- **The Third's lines:** `B97FIN.T` holds a title, a line per road, the soldier's Book Nine in a phrase and a warm closing line for all twenty soldiers the Third can field (cold and middle closings shared). `B97FIN.book(id)` adds the soldier's own Book Nine from the keys, each with a default: Ch 1 `stores`/`street`, Ch 3 `boil`/`press`, Ch 5 `share`/`keep`, Ch 7 the stretch (Tegra from Ch 5 only). A trick carried out of Book Nine is named.
- **The fallen tonight:** "fell on the stretch between the cut bank and the burned wagons…; laid by the burning wagons under a cloak…; notched on the squad's roll, with a line across." Headline only.
- `labels.list` counts the dead of both squads; `ids()` covers every Third soldier, the dead and the camp.

## The onward helper for Book Ten (no import written)

- `b97OnwardT(s)`: a finished Book Nine save whose Third took `adjunct` or `south`.
- `b97OnwardL(s)`: a finished Book Nine save whose Sixth took `escort` or `adjunct` (`escort` by default).
- `b97Onward(s)`: either. Both `home` ends it.

## Flags later books may read

| Flag | Values | Set where |
|---|---|---|
| `b9_c7_key` (and `S.chapters[7]`) | `adjunct` / `south` / `home` | Thallo's slates |
| `b9_c7_wit` | `each` / `own` / `put` (Witness in `S.b9.wit.c7`) | the brew-fire or the line |
| `b9_c7_fell` | the ids who fell in the rearguard | after the mortal fight |
| `b9_c7_rearDone`, `b9_c7_darkDone` | 1 | the fights' after-nodes |
| `b9_c7_locked` | 1 / 0 | the lock check |
| `b9_c7_lowOk` | 1: the trick learned | the lull |
| `b9_c7_cart` | `ok` / `no` (`b9_c7_lost`: the ration near roll) | the surgeons' cart |
| `b9_c7_regulars`, `b9_c7_strag` | `ok` / `no` | the checks |
| `b9_c7_cusser`, `b9_c7_cusser2` | 1 | the sappers' wagon |
| `b9_c7_dogsDone` | `fought` / `driven` / `left` | the trail |
| `b9_c7_horse`, `b9_c7_news`, `b9_c7_pot`, `b9_c7_cloak`, `b9_c7_roll` | 1 | as named |

Earlier chapters read, each with a default: `b9_c1_street` / `b9Key(1)`, `b9Key(3)` (`boil`), `b9_c5_shared` / `b9Key(5)` (`share`), `b9_c6_key` / `b9Key(6)` (`line`), `b9_lethRoad` (`escort`), `b9_braskDone`, `b9_tegraDone`, `b9Faith('t')`.

## The recruits

- **Brask** (Ch 1): lines at the stretch, the fire (both), Thallo, the line, the lock, the rear's after-node, Thallo after dark, the dark line, the trick (he teaches it), the cloaks, the key, the roll, the end; his fate page.
- **Tegra** (Ch 5): lines at the stretch (she leaves the guides for the Third), the fire (both), the burned wagons, the Witness, the horsemen, the walk back, the dogs, the key, the south slate, the end; her fate page. Waiting, she has a "Waiting" page; she never names her clan (rule 89).
- No recruit joins here.

## Named inventions

- **No new named people.** Thallo and the old marine return.
- **Unnamed by role:** the heavies' captain (seen down the line, never speaks to the sergeant); a boy of the regulars; a heavy with a broken leg; the surgeon on the box; the sappers' clerk; a heavy of the next file (the trick, if Brask is not walking); a marine runner with a split lip; stragglers; the cook.
- **New places, all unnamed:** the stretch "between a cut bank and a line of burned wagons"; the retreat trail; the retreat camp.

## Canon points, hard limits, open threads

- **Never on the page:** Keneb's and Ruthan Gudd's charges, Lostara and the Adjunct, Quick Ben, Bottle, Hedge and his salvo, Fiddler, Gesler and Stormy, Deadsmell, the field after. The far fight is seen from the burned wagons as a line under its own cloud with tall shapes and pale light in it, and one sound like a wall coming down (never said what).
- **The news** (rules 86, 90; the brief's Ch 7 rumour): "The Fist is dead. He went in. The High Mage is missing. Nobody's found him. A captain went in alone, up the far end, and nobody's seen him since. The Adjunct was carried off the field." Nobody is confirmed dead or alive beyond canon's own: Marrow says "missing is not dead". Names are never said.
- **The horsemen** (rule 94): seen from the stone at the east end as the light goes, very far off, going in at the gallop; "a long while later, some of them come back out of it. Fewer." Never named; Orvas puts his hand over the black tears on his face. **Unsure:** the hour of Gall's charge is §10 Q12. Ch 6 has horsemen going in at dusk from the Letherii's rise; this matches. If a page check puts it in daylight, the words "as the light goes" want changing in two places.
- **Day or night** (§10 Q1): the rearguard is late in the day into dusk; the second fight is after dark. If a page check shows the fight ends in daylight, the chapter becomes "the Nah'ruk day" with the dark fight as "the last of the light" (words only).
- **The army splitting** (TCG): Thallo's slates say the clerks say the Adjunct means to go east and the Letherii south. This is camp word days after the battle; canon has the split decided at TCG's start. **Unsure** whether it is said that early; nothing changes if it is said a little later. The `south` road never says "coast" or "Glass Desert".
- **The Adjunct** is "carried off the field" and nothing more (an earlier draft said "she's alive"; removed).
- **"Bonehunters"** once (a heavy at the next fire). **Kolanse** not said. "Weeks" and "months" never.
- **Open on purpose:** which stretch was whose; what the light in the short-tails' hands is; where the long way round goes.

## Art (167b)

- **Backdrops:** `b9_c7_late` (the stretch late in the day: red-brown sky, the cut bank, the burned wagons smoking, the dust wall close with tall shapes and pale light before the fight; drawn back and darkening after); `b9_dark` (160's: night under the dust, the shields, four wagons burning, plate catching fire-glow out past the light, the column's lamps far south, sparks; after the rearguard a row of cloaks); `b9_retreat` (160's: a grey morning, the trail going away north-east with the column far on it, stragglers, a wheel, a pike, a cook-pot, the last dust low behind); `b9_c7_camp` (dusk days after: tents with gaps, the cook-wagon and its pot, dung-fires, the surgeons' lines with lamps, the Third's fire); `b9_c7_road` (the finale's road page by the key: east, the column into blank country; south, the Letherii wagons turning on a fork; home, a small squad walking west into the sun).
- **Captions:** `SCENES.b9_dark` and `SCENES.b9_retreat` get Ch 7 caption getters; 160's otherwise.
- **Ground** `b9_c7_field` (Ch 6's underneath; `K` a burned wagon, alight after dark). **Battle cover `t`:** a burned wagon's boards and a wheel, glowing after dark.
- **Items:** two, on Book Nine's dust-brown ground.
- **Figures:** none new; the short-tails wear 166b's body.
- **Size:** about 24 KB.

## Engine

- **No edit outside this chapter's files.**
- **In `167`, guarded by `b9On()`:** `finPages` and `showFinale` wrapped to add the Sixth's road, their pages and *Where the books meet* before 37's end page (Book Seven's 127 pattern, its own names). Also the trick's `AB`, `B9READ[7]`, the glossary rows, the caption getters on `SCENES.b9_dark` / `SCENES.b9_retreat` (Ch 7 only), `B9CH7.finale`, the onward helpers.
- **In `167b`:** a `drawFeature` wrapper for `t` on its own style only.

## Tests

`tools/b9ch7_test.mjs` (17 checks): the fresh start; every node under every phase, key, faith and fallen; the "yes, but" and "Not now" audit; Thallo and the brew-fire; the regulars, the cart (the ration −1 once), the sappers; the Witness (three answers, Not now); the signposts; the mortal fight (both grounds mortal, a squadmate dies and is named); the reading; the horsemen; the trick and its battle half; the dark; the trail (no food, the news, stragglers, the cloak, the dogs); the camp (the pot +1 once, the Letherii's line, the roll stick); every road through the whole finale (a page for every soldier of both squads, the fallen, both sergeants, the credit); the Witness colouring the roads; the onward helper; a `--from=7` style transfer save that reloads.

## Claude's calls (David may overturn any)

1. **The reading is at the first halt after dark** (`b9_c7_lull`), not the chapter's first halt, because its place is "the plain after dark, lit by what burns" (`READTABLE['dod:7']`). Its back is the lull, not the fire (the fire is days later).
2. **The fire is phased:** the heavies' brew-fire behind the line before the rearguard (so the roster can be set before the mortal fight), no fire in the dark or on the trail, and the retreat camp days after (the brief's place).
3. The Witness beat is before the mortal fight; it can be skipped.
4. The chapter's ration "yes, but" is the long carry to the surgeons' cart.
5. The sappers' last wagon gives every squad one cusser, and a guile check a second (its "yes, but" costs a sharper).
6. Brask teaches Fight Them Low if he walks; otherwise a heavy of the next file.
7. The rearguard cloak (ac 3, hp 5) is armour (`mail`), from a bale on an abandoned wagon; the roll stick is cut at the camp fire.
8. Thallo brings the roads as three slates "for the rearguard first"; the split is camp word from the clerks.
9. The Sixth's fallen from before this book get pages in the finale (Ch 6's pages leave them out).
10. Book Ten's onward: the Third on `adjunct` or `south`, the Sixth on `escort` or `adjunct`.
