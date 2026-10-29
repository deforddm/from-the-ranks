Wed Oct 28, 2026, 6:50 PM PDT. Book Five, Chapter 1, "The Drownings" (`src/81_b5_ch1.js`, art `src/81b_b5_ch1_art.js`, the Wager Board in `src/89_b5_games.js`), against v8.0.0 on `book5` (not shipped).

# Chapter 1 notes: The Drownings

Letheras in summer, the eve and first days of the Errant's festival (MT ch 2, 4, 6; `mt-canon.md` §1.1). The Sixth Company is in the capital with the battalion's sick and its paybooks for the pursers' audit (Claude's call 2). Night one in the barracks yard; the festival's first day on the Low Walk of the Quillas Canal; the pit town outside the walls at dusk and the tavern brawl; the fines court that night (the key); the festival night in the yard; the morning after (the Special Drownings from the tiers, the Trate news, the road north).

## Shape

- **Areas (4):** `b5_c1_barracks` (the yard at night, ground `b5_c1_barracks`), `b5_c1_canal` (the Low Walk by day, `b5_c1_canal`), `b5_c1_canalnight` (the same walk by lamplight while the court sits, `b5_c1_canal`, dark), `b5_c1_pittown` (dusk going to night, `b5_c1_pittown`). The brief's three grounds, with the Low Walk drawn twice (day and night) because an area's darkness is fixed when it registers.
- **Nodes:** 73 `b5_c1_*` dialogue nodes (the tiles, the card and the Wager Board's after-node included).
- **Phases:** `S.f.b5_c1_ph` 1 the first night (set at `b5_c1_start`), 2 the festival's first day (set at `b5_c1_out`, through the court), 3 the festival night (set at `b5_c1_evening_go`), 4 the morning after (set at `b5_c1_sleep2`). `S.f.b5_c1_slept` marks the night between 1 and 2. The yard is shut to the company by day (the auditors are in it) and the Low Walk's ways back say so.
- **The first halt** is the barracks yard on the first night (`b5_c1_start`; `b5TileChoice(1)` there, at the fire, and at the tile-woman when Perrit is not walking). `B5READ[1]` is replaced from this file: same place and words as 80c's example, the tile-woman's line gains her spit, and `back` is the fire (`b5_c1_yard`, "To the fire.").
- **The fire** `b5_c1_yard` (id kept for the games pass): `again:` by phase; `b5TileChoice(1)`; a rest once a phase (`b5_c1_rest1`, `b5_c1_rest3`); the pay desk; the squad's talk (`b5_c1_yard_talk`, one line per squadmate present, by phase and key; Brune, Ruuk and Pessa have a line each for synthetic saves); the lanterns (phase 3); the Wager Board (89, phase 3); the way on by phase and key; "Not now." last (the roster choice goes before it). `ROSTER_FIRES.mt[1] = ['b5_c1_yard']`.
- **The pay desk** `b5_c1_pay`: at the clerk's table and from the fire, `debtHTML('The Sixth Company · Letheras')` and `b5PayChoices('b5_c1_yard')`, with an `again:` line.
- **The four's scenes** are their lines in the paybook at the clerk's table (`b5_c1_line_tobet/thegg/perrit/ammet`): who they owe and why, each with the soldier there.

## The key `b5_c1_key` (the canal)

Chosen at the fines court on the Low Walk that night (`b5_c1_court`; "Not yet" steps out onto the night walk, and the court's door or the Garrison man opens it again).

- **`pay`**: `b5Owe` sgt 80, Thegg 60, Perrit 60, Tobet 60, Ammet 40, each "Thegg's fine" (only those walking; the sergeant always). The court clerk's sealing fee takes up to 10 docks in hand (`S.f.b5_c1_fee`, 0–10). Thegg +2, Perrit −1. Gain `b5_c1_receipt`. From the starting debts every one of them ends just short of `pressed`: 420/425, 320/325, 470/512, 960/1125, 220/225. The key fight is **`b5_c1_lane`** that night; on its win `b5Forgive('thegg', 20, 'The collector's interest, struck out')`.
- **`swim`**: no debt moves at the court. The court releases Thegg to the Finadd's signature until first light. At the steps (`b5_c1_steps`, then `b5_c1_swim`, the swim in five short paragraphs: the rope, the water closing, the crowd's noise changing, his hand on the far steps) `b5Owe('thegg', 40, 'The court's fee for the rope and the weights')`, Tobet −1, Thegg 0, `S.f.b5_c1_swam = 1`, gain `b5_c1_weightbag`. Ammet on his chest after (`b5_c1_swim_after`). He swims; the text never has him walk the bed (tested). The key fight is **`b5_c1_lowwalk`** that morning.
- **"Yes, but" debts never spoil the key.** `b51Owe` (this file) puts a "yes, but" of 5–20 docks on the roller only if it leaves room for that soldier's share of the fine (and Thegg's 40) while the key is still to come, and keeps everyone short of `pressed`; otherwise the scene takes another cost (rattled). Two of the chapter's ten "yes, but"s are debt (the clerk's copying fee, 5; an eel-seller's basket, 8).
- **The canal threat:** at the road (`b5_c1_road`), if `b5DrowningThreat()`, a court's runner has one name on his list (the first debtor at `drowning`): one line, and the road north is the way out of it.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b5_c1_key` | `pay` / `swim` | the key |
| `b5_c1_fine` | 300 | Thegg's fine (set after the tavern fight, always) |
| `b5_c1_swam` | 1 | Thegg swam the Quillas Canal (swim only) |
| `b5_c1_fee` | 0–10 | the court clerk's fee in hand (pay only) |
| `b5_c1_laneDone` / `b5_c1_walkDone` | 1 | the key fight is won (pay / swim) |
| `b5_trate` | 1 | the Trate news (set at `b5_c1_trate`, always before the end) |
| `b5_bugg` | 1 | the builder's board (glossary) |
| `b5_brizad` | 1 | the tavern talk of the First Consort (glossary; set on opening the tavern, always passed) |
| `b5_company` | 1 | the Sixth's posting (set at the first node) |
| `b5_c1_tab` | 1 | the note about Thegg's mother's tab (always) |
| `b5_c1_ropeOk` | 1 | the trick was learned |
| `b5_c1_brys` | 1 | the King's party seen far off on the festival night (optional) |
| `b5_c1_cutDone`, `b5_c1_carter`, `b5_c1_sums` (`ok`), `b5_c1_warned` | | the optional scenes |
| `b5_wager` | `{net, staked, line}` | the Wager Board was played (89); `b5_wagerNet` the board's net pay so far (cap 12) |

Items read later: `b5_c1_receipt` (pay; Ch7's court's men), `b5_c1_weightbag` (swim; Ch7 and the finale).

## Docks and debts in this chapter

- **Docks in:** the clerk's sums +6 (Wits 13), the cutpurses' stall-keepers +8, the carter +5 (Might 13), the Finadd's festival dock +5 (always, phase 3), the bookmaker's ten +10 (swim only). The Wager Board: net capped at +12 once a book. A full `pay` playthrough finds about 24 docks plus the board; `swim` about 34.
- **Docks out:** the clerk's fee (pay, up to 10), salves at 6 (4 on a Guile 12 haggle, once), eel 3, the rope-man's knife 8 if the trick was missed.
- **Debt moves:** pay +300 on five lines, −20 on Thegg's after the lane; swim +40 on Thegg's. "Yes, but" debts 5 and 8, on the roller, only with room.

## Inventions (Claude's calls)

- **Why the Sixth is in Letheras** (the brief's call 2), billeted in an old barracks near the Drownings District, built for a regiment disbanded for debt.
- **The fines court sits all night in festival week**, "because the festival fills the cells"; the court weighs a swimmer with its own coin and hauls it back on the rope; it releases a soldier to his Finadd's signature until first light.
- **The army's error on the tab:** the army took Thegg's mother's tab out of his pay since the spring and never sent it (the last clerk's error). The collector's interest; twenty of it struck out in the lane.
- **The rope-man** (unnamed), the court's rope-men who haul the coins back, and now and then a living swimmer "when nobody was watching". His hooked knife.
- **The old Tarthenal by the brazier** and **the Tarthenal carter** in the pit town (unnamed; the carter's son is "in the Artisans", a canon battalion, said only as where he serves).
- **The bookmaker on the Low Walk** (unnamed) and his board; somebody in the Sixth laid a dock on Thegg's Stroke at twelve to one (Tobet's "I don't know who" is left open).
- **The wager words' glosses** on the Wager Board (a Stroke "the far steps", a Rising "under, and up again" and so on) are the bookmaker's, not canon's; canon gives only the six words.
- **The Wager Board's list** is three lines by weight of fine only (500, 250, 300: canon's fines), never a name, never the swim.
- No new named people. Every invention is unnamed by role.

## Canon as written

- Court news only as street and barracks talk (Ennic, the eel stall, the tavern): the Preda and the Queen's faction; Brys Beddict the new King's Champion; the delegation (Prince Quillas, Finadd Moroch Nevath "who heads the Prince's guard", the First Eunuch, Finadd Gerun Eberict); Eberict's list (thirty-one) and the King's Leave.
- The Eternal Domicile seen only as a dome under scaffolding from a street, seventeen years in the building, its clay heave the city joke; the builder's board says *Bugg*, *Builder*, and nothing else.
- Turudal Brizad is "the Queen's First Consort", gossip only: he has the Queen's ear and half the court owes him a favour (rule 31; nothing about the Errant).
- Brys: one line, far off, a shape with a sword among the King's party on a lit balcony on the festival night.
- The Special Drownings: headline only from the tiers (a rope going out and taut, the crowd's noise, the boards wiped). No named swimmer. Ublala's and Shurq's Drownings never; the squad's own Drowning is the ordinary list on another morning.
- Never Soulan Bridge, never Main Canal; never the throne room, the Cedance, the Old Palace, the Domicile's inside, the Azath, Tehol's house, Shand's workshop, Huldo's or Rild's. The name Kettle is not used.
- The Trate news (ch 6): a wave out of the sea wrecked the harbour "two evenings ago" (the game's reading of §17c item 5) and ships rode in on it, the spring's seal-poaching ships, "with nobody alive aboard", the crews at their oars and dead, which the runner did not see himself. Nothing of the wraiths or the Edur is said in Letheras.
- Thegg's four lungs: the Tarthenal's (W *Tarthenal*), said by Ammet, believed by Thegg, never counted.

## Engine additions in this file (all guarded or scoped)

- `TRICKS.b5_c1_haul` and `AB.t_b5_c1_haul`: the Rope's Way (`rope` / `t_rope`), copied: once a fight, free, swap with a squadmate within 5 + level step, no free swings. Not sorcery.
- `drawFeature` is wrapped (81b) so battle cover `t` on this chapter's four grounds is a stall, a tavern table, barrels or a mooring post; other styles pass through.
- `GLOSSX.mt` gains three rows (the Low Walk, the fines court, the pit towns), each unlocked by a chapter flag.
- **89 is new:** `src/89_b5_games.js`, the games file the brief names, holds the Wager Board (`playWager`, `b5WagerPay`, `B5G_*`, `b5g*` helpers) and wraps `b5_c1_yard` from there, as Book Four's 79 does. The games pass adds the other four games to it.

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b5_c1_cutpurses` (optional) | the Down Market crowd | 100 | `b5_c1_cutpurse` ×3 (kind `b5_c1_cutpurse`, hit and run), `b5_c1_minder` (kind `bruiser`); Guile 13 round the stalls (surprise) |
| `b5_c1_tavern` (main) | the pit-town tavern | 160 + 80 | objective: survive 4 rounds, the brief's words; `b5_bully` ×3, a wave at round 2 (`b5_c1_drunk`, kind `b5_c1_drunk`); `stage2` *The back room*: `b5_collector` + `b5_bully` ×2; Guile 14 to talk it down (surprise; the brawl happens anyway) |
| `b5_c1_lane` (pay) | the barracks lane | 160 | objective: survive 4 rounds; `b5_collector` + `b5_bully` ×3; Wits 14 round through the end bunk-house |
| `b5_c1_lowwalk` (swim) | the Low Walk | 160 | `b5_c1_bookman` (kind `b5_c1_bookman`, boss) + `b5_bully` ×3; the canal along one side (`b5_c1_walk` ground); Guile 14 to talk |

A playthrough fights three or four: 420–500 base, 252–300 xp, level 1 → 3 (the brief's curve).

The brief gave the writer foes `thug` and `bruiser` kinds; the chapter's artist drew `b5_c1_cutpurse`, `b5_c1_drunk` and `b5_c1_bookman`, so those three foes use their own figures (the minder stays `bruiser`).

**Balance** (`tools/balance.mjs`, a scratch `--patch` setting each fight in a fresh Book Five state at level 2, the four, a tile from `B5POOL[1]`, two salves; no rule changed; the harness's smart policy does not know Ammet is a healer, so it under-uses her): see the table below.

| Fight | Soldier, level 2 (win · health lost · downs) | Bridgeburner, level 2 |
|---|---|---|
| `b5_c1_cutpurses` | 100% · 12% · 0.06 | 100% · 13% · 0.06 |
| `b5_c1_tavern` (both grounds) | 100% · 22% · 0.13 | 94% · 47% · 1.44 |
| `b5_c1_lane` | 100% · 19% · 0.13 | 100% · 33% · 1.06 |
| `b5_c1_lowwalk` | 100% · 13% · 0.19 | 100% · 31% · 0.69 |

16 smart runs each. Soldier meets the target (a smart player wins every fight). Bridgeburner is easier than the 75–80% target on the three smaller fights (the tavern is about right); that is a balance question for David, not changed here.

## Left open on purpose

- Who in the Sixth laid the dock on Thegg's Stroke (swim).
- Whether the collector takes the rest of his claim to the pursers (pay).
- The old Tarthenal's name, the carter's son's company.
- What the tile-woman is called (never asked again).

## Canon points I was unsure of

- Whether the ordinary Drownings run on a festival morning before the Special list: written so (the brief's own words), and the tiers are near empty for it.
- The court's form of weighing (its own coin in a sack, hauled back on the rope): W *The Drownings* gives the coins tied on and recovered by rope; the sack and its fee are the game's.
- Whether the Garrison, not the Royal Guard, polices the pit towns outside the walls: the brief says the City Garrison; kept.
- That the Trate wave came "two evenings ago" when the news reaches Letheras: a guess at a runner's speed; the novel gives no day.

## Deviations from the brief

- **The Wager Board is built here, in a new `src/89_b5_games.js`**, because this session's order asked for the fire's game, its test and its screenshot; it is where the brief puts the games (89) and wraps the fire from there, so the chapter file only keeps the id.
- The tavern node is `b5_c1_taverndoor` (the battle keeps the brief's `b5_c1_tavern`), so a dialogue node and a fight never share an id.
- Two Low Walk areas (day and night) instead of one.
- Writer foes' kinds, above.

## Tests

- `tools/b5ch1_test.mjs` (22 checks): a fresh start through the yard (the clerk, the sums, the reading, the fire, the pay desk, the quartermaster, the Finadd), the Low Walk (the board, the stall, the cutpurses, the trick), the pit town (the old man, the cart, the tavern fight both grounds, with the haul run inside it), the court; `pay` (the five lines, the fee, the receipt, loyalty, nobody pressed; the festival night, the Finadd's dock, the lanterns; the Wager Board played through its DOM; the lane fight; the tiers, the Trate news, the road, the end) and `swim` from the same moment (no moves at court, the steps, the swim's moves, the Low Walk fight, the end); and a --from=1 style save at level 2 with Brune walking (every node renders; her line at the fire).
- With a Book Five chapter registered, Book Five is on the shelf. Five tests assumed it was coming and now expect it exactly when `BOOKS.mt.coming` is false: `shelf_test` (five covers, V), `b5engine_test` (the blurb "Chapter One so far", the credit naming Midnight Tides, the engine's thirteen foes plus each chapter's own). `b4carry_test` and `moi_test` (shelf, picker, Deeds sections) allow Book Five after Book Four. `gear_roles_test` lists Thegg's weight-sack among the signature pieces (the brief's `who:['thegg']`).
- `lint.mjs` 0 errors. Its absent-squadmate review lists this chapter's Thegg lines (the chapter is about him; before Chapter 6 the four always walk) and the paybook lines (reachable only when that soldier walks).
