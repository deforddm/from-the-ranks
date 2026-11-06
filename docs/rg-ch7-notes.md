Thu Nov 5, 2026, 8:53 PM PST. Book Seven, Chapter 7, "Letheras" (`src/127_b7_ch7.js`, art `src/127b_b7_ch7_art.js`, test `tools/b7ch7_test.mjs`), and the book's finale for both squads, against the Book Seven engine on `book7` (v10.0.0, not shipped).

# Chapter 7 notes: Letheras

The Third, lent to Fist Keneb's column as a squad of heavies, at the end of *Reaper's Gale* (rg-canon §2, ch 24; R24.1 S1, S7; R24.2 S1, S20–23, S39, S43; WE). The killing field is behind it: on the day, the Third had the column's wounded at a farm a league back (Claude's call, a gap: it was never in the ring) and saw only a silver light on the horizon; it has heard that a mage burned (rule 63, never named). The Adjunct's landing has broken the Letherii army at the river (heard of). The Third goes through the gate behind the Fist (rg-canon §14), never the tunnel, the postern or the palace.

## Shape

- **Areas (4):** `b7_c7_road` (under the walls, night; ground `b7_c6_field`; `G` the gate, `F` the ditch, `<` the road back), `b7_c7_square` (inside the gate, morning; `b5_c7_streets`; `G` the gate from inside, `x` a shuttered shop with the chalk rat, `>` into the streets), `b7_c7_streets` (the city's last day; `b5_c7_streets`; `F` the brazier at a corner, `h` the counting-house, `x` a torn broadsheet, `v` the canal and the bridge, `^` the street end to the palace square, `<` back), `b7_c7_after` (three weeks on; `b5_c7_canal`; `F` the billet's brazier, `a` the arch over the canal).
- **Nodes:** 61 `b7_c7_*` dialogue nodes (the reading's two included).
- **Phases:** `S.f.b7_c7_ph` 1 the road (set at `b7_c7_start`), 2 first light and the square (set on the gate's "Wait for first light" choice), 3 the streets (set on "Into the streets"), 4 three weeks on (set on the lieutenant's "Three weeks."). Phase changes are on choices.
- **Order:** the lieutenant opens the gate; first light opens the gate fight; the fight opens the square; the lieutenant in the square opens the streets; the counting-house opens the earthquake, the dragon, the runner and the street end; the holdouts and the street end open the lieutenant at evening; she opens three weeks on; the lieutenant's three lists open the key; the key opens the last of it.
- **The first halt** is `b7_c7_corner` (a brazier at a street corner, the brief's "Letheras street at the end"), with `b7ReadChoice(7)`; the reading is also on the fire in phases 3 and 4. Phase 1 has no fire (under the crossbows); the night march gets no halt (Ch5's pattern).
- **The fire** `b7_c7_fire` (id kept for the games pass): phases 1–2 "no fire under the walls" (talk only); phase 3 the corner (the Deck, a rest `b7_c7_rest3`, the talk, `risingHTML()`); phase 4 the billet (the Deck, a rest `b7_c7_rest4`, the talk, `risingHTML()`, "The last of it" once the key is chosen). Every list ends "Not now". `ROSTER_FIRES.rg[7] = ['b7_c7_fire']`. The talk has a line before the gate and after it for Haddat, Sathi, Tangle, Marrow, Mirrel, Tallow, Hessa, Tebbet, Darrut, Yorin, Rasp, Orvas, Ramin, Keth, Mehet, Ottar, Doss, Wenna, plus one for Chapter 5's gap.

## The key `b7_c7_key` (the roads out), three weeks on

The lieutenant's three slates on the Third's step, `risingHTML()` shown; Haddat, Marrow, Doss, Wenna, Tangle and Mirrel speak if they walk; "Not yet" steps back. Guarded (`!S.f.b7_c7_key`). No Rising move.
- **`adjunct`** (the first slate: with the army, wherever she goes; Book Nine imports it, `b77Onward(s)`): Haddat, Tangle, Ottar, Orvas, Sathi +1; Doss, Mirrel −1.
- **`letheras`** (the second: the new emperor's coin and a post in the city, teaching his levies to stand in a line, canon's Malazan sergeants training Letherii troops, WB): Doss +2; Wenna, Mehet, Mirrel, Darrut +1; Haddat, Orvas −1.
- **`home`** (the third: time served, a ship west): Marrow, Tallow, Rasp, Yorin, Tebbet +1; Haddat, Doss −1.
- Each key has its own after-node, end text (`end.adjunct` "With the army", `end.letheras` "The new emperor's coin", `end.home` "A berth home"), end caption, last-morning text, finale road page and a line in every squadmate's fate page.

## The Rising

| Where | Move | When |
|---|---|---|
| `b7_c7_bridge` (the crowd on the bridge, reached by `v`) | `b7Rise(1, 'the crowd')` | once (node fx, guarded by `b7_c7_crowdRose`), whatever the Third does there |

**`b7RiseTier()` read** (the brief): the crowd's mood (`b77Mood()`, quiet / stirring / rising / risen) in the square and on the bridge; the water-woman (drinks it herself / holds the ladle out / goes along the squad); three weeks on (polite / getting used to them / likes them / will not take their silver); the people on the bridge; the finale's road page ("Lether, at the end: … the Rising stands at N of 10") and the coda's last paragraph.

**`rise:true` checks:** the refugees on the road (guile 15: Doss +3, Wenna +1, Mehet +1, Marrow +1, Ch3 `ledger` +2, Ottar −2, Sathi −1; made, the left tower's levies put down their crossbows at the gate, one foe dropped; "yes, but" a cart wheel, bruised) and talking the bridge's crossbowmen down (guile 16: Doss, Haddat, Darrut +2, Ch3 `ledger` +2, the surrender already seen +2, Sathi −2, Ottar −1; "yes, but" a stone, bruised). "The Rising" edge applies.

## Flags later readers may want

| Flag | Values | Meaning |
|---|---|---|
| `b7_c7_key` | `adjunct` / `letheras` / `home` | the key; Book Nine imports `adjunct` |
| `b7_c7_gateDone` | 1 | the gate taken behind the Fist (always) |
| `b7_c7_charge` / `b7_c7_chargeTried` | 1 | a sharper on the wicket's hinges: the gate fight starts with the squad first |
| `b7_c7_told` / `b7_c7_toldTried` | 1 | the refugees told of the left tower's levies (one crossbow fewer at the gate) |
| `b7_c7_holdoutsDone` | 1 | the counting-house holdouts beaten (always) |
| `b7_c7_quake`, `b7_c7_sky`, `b7_c7_news`, `b7_c7_view` | 1 | the earthquake and the white light; the dragon seen; the arena as news; the surrender seen and the shout |
| `b7_c7_bridge` | `fought` / `talked` | the bridge's crossbowmen (optional) |
| `b7_c7_crowdRose` | 1 | the crowd's +1 has been given |
| `b7_c7_luckOk` / `b7_c7_luckTried` | 1 | the trick learned / rolled |
| `b7_c7_coin` | 1 | the coin with no face (always offered) |
| `b7_c7_white` | 1 | the Letherii's road seen from across the canal |
| `b7_c7_orders`, `b7_c7_lt2`, `b7_c7_lt3`, `b7_c7_lt4`, `b7_c7_where`, `b7_c7_finadd`, `b7_c7_prisoners`, `b7_c7_fist`, `b7_c7_dossCity`, `b7_c7_wennaRoad`, … | 1 | scenes seen |
| `b7_c7_drawn` / `b7_c7_reader` / `b7_c7_noCard` | | the reading (120c) |

**Read here (with defaults):** `b7_c1_key` (`strip`: the lieutenant's look; the wicket's edge; the fate pages' coast line; unset, no line), `b7_c3_key` (`ledger`: the refugee grandmother and the bridge crowd know "the ones who burn the rolls", edges +2, Doss's lines; `loot`: Doss's other line; unset, neither), `b7_c5_key` (`hold`: the lieutenant's song in the market; `slip`: she leaves it there; the fate pages and coda), `S.dead` (Chapter 5's fallen: `ch:5`, no `from`), `S.f.b7_lethRoad` (one line three weeks on; default `army`), `B7CH6.fates` (the finale). `b7OtherName()` is not used.

## The finale (both squads)

`B7CH7.finale` (37's shape: `ids`, `labels`, `endings` getters for the three keys, `fate`, `gone`, `coda`), and a guarded wrap of `finPages` / `showFinale` (Book Six's pattern, `b77` page kinds) that puts the Letherii's pages in before the end page. Order:
1. **The Third's road** (`endings[key]`): title, scene, three paragraphs, and the Rising at the end. `adjunct` says "Book Nine, when it is written, will offer this save."
2. **A fate page per walking squadmate** of the Third: a road line per key, a Book Seven sentence (Ch1 ships / Ch3 counting room / Ch5 village, each defaulted; Doss and Wenna skip the ships), a trick line, and a loyalty line (warm per soldier; cold and middle shared). Written for all eighteen: haddat, sathi, tangle, marrow, mirrel, mehet, ottar, tallow, hessa, tebbet, darrut, yorin, rasp, orvas, redblade, warlock, doss, wenna.
3. **The gone** (`finale.ids()` not walking): Chapter 5's fallen ("fell in the square by the mill… buried by the mill-race"), earlier dead ("fell before this book"), Doss/Wenna waiting or sent away, anyone waiting with the column.
4. **The Third's sergeant** (per key; the gate; the scar; the trick).
5. **The Sixth Company's road** (`B7CH6.fates.roadPage()`, scene by road).
6. **A page per Letherii** from `B7CH6.fates.pages()` (walking, waiting, fallen, their sergeant last with Book Five's look painted once through `b7SgtFor('l')`, each page's own `loy`). A short fallback here if `B7CH6.fates` is missing.
7. **Where the books meet** ("Lether, again"; the world map).
8. **37's end page:** the coda (canon in a paragraph; each squad's part with its dead named; the city's mood by the Rising), the road list, the dead (`S.dead`, which names Chapter 5's fallen), "N names, both squads", *The End of Unwitnessed*, and the credit to Steven Erikson and Ian C. Esslemont.

## Trick: The Crowd's Luck (`b7_c7_luck`)

✦ wits 17 at the bridge's foot, from an old Indebted woman spinning a dock for the crowd. Taught through **Doss** (the Indebted's spin on the holding), else **Wenna** (the fishers' shell), else **Tallow** (his grandmother's copper), else the sergeant. Edges: Doss +3, Wenna +2, Tallow +2, Sathi +1, Tangle −1, Haddat −1, Ottar −2. "Yes, but": five silver into her bowl (a money scene). **Mechanic: The Lady's Pull** (`pull`): the battle half is `t_b7_c7_luck` (two rolls, keep the better; the next check −2; free); the check half lives in 16's `rollDice`, which asks for `pull` by name, so this file answers `pull` with the Luck in Book Seven only (Book Five's Holed Dock did the same, 087). **Engine wrap, reported:** `trickLeft`, `spendTrick`, `rollDice`, `note`, `blog` and the `#dPull` button's words, all guarded by `b7On()` and by the squad carrying the Luck and not the Pull.

## Items

- `b7_c7_lethcloak` (armour, `role:'light'`, `ac:2, hp:3`): the garrison Finadd's riding cloak with a two-fish clasp, handed over with his sword (always, at the gate). The real number.
- `b7_c7_kingscoin` (trinket, `role:'any'`, `stat:{guile:1}, hp:2`): a new-struck coin with the towers on one side and nothing on the other (always, from the moneychanger three weeks on).
- Drawn in 127b on Book Six's smoke-umber ground (200×150); borrowed placeholders with `??=` in the chapter file.

## Fights (numbers for the balance pass; no rule changed, no balance run)

Ch7's `FSCALE` row: health ×1.95, to hit +4, damage +3. Paid xp ×0.6; a second ground pays the first's plus its own.

| Fight | Where | Foes | xp raw | Notes |
|---|---|---|---|---|
| `b7_c7_gate` | the gate passage (`b5_c7_barricade`), allies `b7_marine` ×2 | `b7_lethsoldier` ×3, `b7_lethxbow` ×3 (one dropped if the refugees told); wave r3 `b7_lethsoldier` ×2 | 300 | required; `surprise:'p'` with the wicket charge |
| · stage 2 *The gatehouse yard* | ally `b7_marine` | `b7_lethofficer`, `b7_lethsoldier` ×2, `b7_lethmage`, `b7_lethxbow` | +160 | |
| `b7_c7_streets` | the counting-house street (`b5_c7_streets`) | `b7_c7_patriot` ×3, `b7_lethsoldier` ×2, `b7_lethxbow` | 240 | required |
| · stage 2 *The counting-house stair* | | `b7_c7_patcaptain`, `b7_c7_patriot` ×2, `b7_lethxbow` | +120 | |
| `b7_c7_bridge` | the bridge (`b5_c7_lowwalk`) | `b7_lethxbow` ×3, `b7_lethsoldier` ×2 | 160 | optional (or talked down) |

Own foes: `b7_c7_patriot` (Patriotist holdout, kind `b7_agent`: hp 28, ac 14, +11, 1d6+4, bleed, move 5) and `b7_c7_patcaptain` (boss, kind `b7_agent`: hp 60, ac 15, +12, 1d8+4, rally, bleed). Scaled at Ch7: Letherii soldier about 62 health, ac 15, +15, 1d8+6; crossbowman about 51, ac 14, +15, 1d10+6, range 6, pins; cadre mage about 55, ac 13, +15, 2d6+5, range 5, dazes; Finadd about 125, ac 16, +16, 1d10+7, boss, rallies; holdout about 55, ac 14, +15, 1d6+7; captain about 117, ac 15, +16, 1d8+7.

**Paid xp:** required path 820 raw (492 paid), with the bridge fought 980 (588). A `--from=7` save at 19 ends at **20** on any path (the test saw 6062).

## Canon used, and calls

- **The killing field** (W22, correction 2): the Third was a league back with the wounded (Claude's call; a gap), saw a silver light "small as a coin", heard a mage burned; the marines built a barrow it was not asked to (unseen). Beak never named.
- **The river** (R24.1 S9–10): the lieutenant's rumour, "she let the soldiers have them" (headline only).
- **The road** (R24.1 S1, S7): refugees more frightened of what is inside; the mob holds half the streets; the Edur all gone.
- **The gate** (R24.2 S1): the Fist takes it himself, in front; a marine sapper's charge at the wicket; the Third behind him. Keneb is seen (a broad man in a plain, mended cloak, bareheaded) and heard down the line, never spoken with. Other squads go "the other kind" of way along the wall with a man with a lantern (never said: the tunnel and postern are never entered or named). The palace is "not ours" (Sort's, said as fact).
- **The garrison's Finadd** (invented, unnamed) surrenders at the gatehouse yard; the City Garrison fight (S16–18) is never touched.
- **The holdouts:** Patriotists and some palace soldiers in a broker's counting-house (not the compound); the crowd turns away toward the name it is shouting.
- **The white light** (rule 59): an earthquake and a white light under one quarter "where there is an old tower"; never Scale House, never what it was. **The dragon** (rule 60): "a white one… somebody drove it off", seen from a street, never the roofs.
- **The arena** (rules 33–35, 58): a clerk's news: the Emperor fell to the last champion, "a giant", and has not got up; the giant gone; "they say somebody killed an Edur in there after, over the body". No names.
- **The surrender** (R24.2 S43): seen from a street end across the great square below the palace: the garrison laying weapons on the steps, the Adjunct mounted and still (seen, never a viewpoint, rule 55); the crowd shouting *Saviour* and *Emperor*, at whom the Third cannot see.
- **The Rat Catchers** (W3; R24.2 S10, S42): the men starting the shouting, paid; the chalk rat; never the guild's tunnels.
- **Three weeks on** (WE): a new emperor (never named), a new Preda from the Palace Guard (Varat Taun, unnamed), the Patriotists' files to the river in barrows (Ch6's fates agree), and nobody can find the ledgers; who drained the treasury is left to Doss's "some say" (rule 69).
- **East** (rule 55): the lieutenant says only *east*; the Perish and Khundryl on their own road (rule 65); a Letherii detachment "under an officer the crowd likes" (rule 66, Brys unnamed in this chapter).
- **The Shake's queen** said openly in the market (rule 61).
- **"Bonehunters"** once, by the lieutenant at the lists. The Third is "lent", "the borrowed heavies", "not marines" (she says so).
- **Hard limits held:** never the tunnel, postern, palace, throne room, Eternal Domicile, arena, Scale House, the roofs, the City Garrison fight, the Patriotist compound, Tehol's house or Settle Lake; never speaks with Keneb, Fiddler, Quick Ben, Hedge, Tehol, Brys, Janath or Varat Taun. The test fails any node naming Kettle, Mael, Tehol, Beak, Rhulad, Karsa, Trull, Icarium, Silchas, Scale House, Fiddler, Hedge, Quick Ben, Gesler, Hellian, Brys, Janath, Varat, Seguleh, tunnel, postern, the Eternal Domicile, throne room, Settle Lake, Hanradi, Sirryn, Gnol, Karos, Tanal, Bowl, Lutes, Tavos, Primly, K'Chain, Burn's Sleep or a never-use name, and any exclamation mark. (The finale's Letherii army sergeant page, Ch6's, names Brys Beddict once under rule 66; allowed there.)

## Inventions (unnamed, by role)

The family with the handcart and the grandmother; the brother-in-law with new boots (a levy on the left tower); the marine sergeant with a cusser in a sling; the marine sapper at the wicket; the garrison's Finadd (his father kept the gate) and the young soldier with a cut lip; the water-woman; the clerk running with the arena's news; the man on the barrel, the woman at the well-head, the boy on the lamp-post; the old Indebted woman with the dock; the bridge's corporal; the moneychanger; the eel-seller; the chandler's house by the canal (the Third's billet). **No new named people.**

## Unsure, or left open

- **Where the Third was during the killing field.** Canon has under a thousand marines on the plain (W22); the Third is a league back with the wounded. If David would rather it stood at the ring's edge, only the intro and `b7_c7_lt_more` change.
- **The gate's mechanics** (how Keneb took it) are the game's: a sapper's charge at the wicket. R24.2 S1 says only that he took it himself.
- **Who the crowd shouts at.** The Third cannot see; the words are canon (S43), the people are not placed.
- **Ottar on `home`** goes east with the Perish rather than west (his Destriant's road, rule 65); on `adjunct` and `letheras` he stays with the Third.
- **The giant in the arena** is left as "a giant", not "Toblakai", to keep rule 58's close at "the city sees the fight, then he is gone".

## Engine notes (all in this file, guarded)

- The finale wrap (`finPages` / `showFinale`, `b77road`, `b77leth`, `b77meet`), Book Six's pattern; the Letherii sergeant's portrait painted once in Book Five's look and lent to 19's cache per frame.
- The Pull wrap for the trick's check half (above).
- `SCENES.b7_city_burning.cap` becomes a getter: before the earthquake it does not mention the white light.
- Three scenes in `CH.scenes` (`b7_c7_gate`, `b7_c7_square`, `b7_c7_after`) drawn in 127b; 127b also draws 120's `b7_city_burning` (the white light after the quake; the dragon only while it is being looked at).
- Glossary: "The crowd", "A blank coin" pushed onto `GLOSSX.rg`. `B7READ[7]` filled (a doorstep at a street corner; Marrow, Tallow, the old marine).
- `b77Onward(s)` marks a finished save on `adjunct` as Book Nine's import (no import written).

## Tests

`tools/b7ch7_test.mjs` (19 checks): a `--from=7` start (level 19; every node over 4 phases × 4 keys × Ch5/Ch3/Ch1 keys × road × quake × three Rising tiers, no leak, no never-word, no exclamation mark; items, backdrops, `B7READ[7]`), the road (no fire, the gate gated, the mage who burned, the Fist seen), the refugees (rise:true, bruise, the levies), the gate (charge, a dropped foe, two marines, both grounds, the cloak), the square, the reading at the corner (Marrow, the King's pool, back to the fire), the fire, the holdouts (both grounds), the quake, the dragon, the arena, the shouters, the view and the shout, the bridge (+1 once; talked, fought, bruise), the trick (Doss; the silver "yes, but"; `pull` answered; its battle half), three weeks on (the coin, the Letherii army road line, Doss), the key three ways (loyalty), the end at level 20 with the epilogue and `b77Onward`, the finale (every page kind in order; Brann's page; Ilsa's; Sathi fallen before; Wenna waiting; Where the books meet; the credit), Chapter 5's fallen named everywhere, a synthetic save (no Doss, Wenna or sapper; burn, loot, slip; the Rising quiet; the Letherii free; the finale on `letheras`), and a save that never played the earlier chapters.

Results (Thu Nov 5, 2026, PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors (35 warnings, unchanged; `b7_c7_card` in the orphan list like every chapter's card node); `b7ch7_test` 19/19 four times; `play.mjs 2 --book=rg --from=7` 2/2 and `play.mjs 3 --book=rg --from=7` 3/3 (level 20 each, the epilogue and finale reached); `play.mjs 1` 1/1; `b7engine_test`, `roster_test`, `reading_test`, `trope_test`, `recruit_test`, `audio_test`, `repeat_scan` pass; `trope_scan` B7 inside budget (this file: weather 1, theway 3, silence 2, nobody 7, shield 1). Contact sheets: `/tmp/claude-0/shots/b7/ch7/`.

**Tool edits outside my files:** none.
