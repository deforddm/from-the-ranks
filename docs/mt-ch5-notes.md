Thu Oct 29, 2026, 2:31 AM PDT. Book Five, Chapter 5, "The Retreat" (`src/85_b5_ch5.js`, art `src/85b_b5_ch5_art.js`, its game in `src/89_b5_games.js`), against v8.0.0 on `book5` (not shipped).

# Chapter 5 notes: The Retreat

South from High Fort to Brans Keep, through country burned to the root by Letherii hands so the Edur would find nothing (MT ch 19–21; `mt-canon.md` §7.1, §9, §10, §17c). On Ch4 `hold` the Sixth walks in the long column of the disarmed with knives, shields and paybooks; on `run` it walks armed, ahead of the column. The road (the burned farms, the first cache already dug out, refugees, rumours, a Bluerose courier, a press-gang and Pessa, a burned farm with deserters, the second cache and the rearming, the fire and the Token Auction); the battalion's rear picket, which tells the Sixth plainly that the battalion burned the road on its retreat from First Reach; Brans Keep, where the Whitefinders are and the Sixth rejoins them; the factor and the key; the night; the morning in the battalion's lines.

## Shape

- **Areas (3):** `b5_c5_road` (the military road through the burned country, day; ground `b5_c5_road`), `b5_c5_farm` (a burned farm off the road, optional; ground `b5_c5_farm`), `b5_c5_keep` (the Whitefinders' lines at Brans Keep across the dry channel; ground `b5_c5_keep`). The fights use those three grounds (`t` is a burned cart on the road, a charred beam in the farm, crates in the lines; `#` a burned wall).
- **Nodes:** 71 `b5_c5_*` dialogue nodes in 85 (the tiles, the card and the tiles' way back included), and `b5_c5_tokens_after` in 89.
- **Phases:** `S.f.b5_c5_ph` 1 the road (set at `b5_c5_start`), 2 Brans Keep (set leaving `b5_c5_onward`), 3 the night (set at the key's onward step, or the keep fire's "The night.").
- **The first halt** is `b5_c5_start` (the burned country), with `b5TileChoice(5)`; the choice is also at the road fire and the tile-woman (when Perrit is not walking). `B5READ[5]`: scene `b5_road_south`, "the ash at the road's edge, where a farm's coals are still warm" (the table `mt:5`), back `b5_c5_tiles_done` ("Back to the road."); `say` is a getter so Ruuk's line appears only when he walks. The vision (Moroch, mt-canon §12) is the visions pass's; the reading only opens it.
- **The fires:** `b5_c5_fire` (the road's fire in the lee of a burned wall; the Token Auction is offered there from 89) and `b5_c5_keepfire` (the Sixth's fire in the battalion's lines). `ROSTER_FIRES.mt[5] = ['b5_c5_fire', 'b5_c5_keepfire']`. Each has an `again:` line, a rest once (`b5_c5_rest1` on the road, `b5_c5_rest2` at the keep; a "yes, but" can spend either), the pay desk, the squad's talk (one line per squadmate present), the way on and "Not now." last. The road fire also has Pessa and Perrit's reading (both present, once) and "South, to Brans Keep." once the road is open; the keep fire has the factor's offer, the night and the morning by phase.
- **The pay desk** `b5_c5_pay`: `debtHTML('The Sixth Company · the road south')`, `b5PayChoices` back to the road fire in phase 1 and the keep fire after. The clerk's own node (`b5_c5_clerk`) leads to it from either area.
- **The quartermaster** sells salves at 6 docks on the road and at the battalion's carts (`b5_c5_qm`).
- **The way on** (`b5_c5_south`, the road's `v`, and the road fire) is shut until the second cache is dug (`b5_c5_cache`) and the press-gang is settled one way or another (`b5_c5_pressDone`); the text says which is missing. The farm stays optional.

## The key `b5_c5_key` (the ledger)

Chosen at `b5_c5_key`, at Brans Keep: Ennic would rather sign than decide, and asks the sergeant what to sign. Reached from the factor, from Ennic, or from the keep fire. "Not yet" steps away.

- **`sign`**: Tobet −2 ("I have been sold twice now"), Perrit +1 ("Not bad. Not good. Not bad."), Pessa −1 if walking ("They've bought the boots"). `S.f.b5_holder = 'house'`. In order: **+40 docks** (the house's advance), **`b5_c5_housemail`** (the house's scale), then **on Ch1 `pay`** the house buys the fines court's lines at half: `b5Forgive(id, ⌊share/2⌋, 'the house bought the fine at half')` on the sergeant 40, Thegg 30, Perrit 30, Tobet 30, Ammet 20 (each walking or waiting, alive, with debt), then **the house's first interest** on every debtor (`b5Debtors()`): `b5Owe(id, ⌈debt/10⌉, 'the house\'s first interest')`. The fine is bought before the interest is charged (Claude's call: the brief lists the interest first and the fine after, without saying which applies to which balance; buying the lines first means the house never charges a tenth on paper it has just written off). **The key fight is `b5_c5_wagons`**: that night deserters raid the house's kit wagons outside the lines, and the house pays the Sixth 10 docks to stand by them.
- **`refuse`**: Tobet +2, Pessa +1 if walking, Perrit −1. `S.f.b5_holder = 'army'`. The army keeps the books; the Sixth draws its kit from the battalion's carts and the old stores (no `b5_c5_housemail`, no interest). Tobet shows Pessa how her line is written (both present: `S.f.b5_c5_ledgerShown = 1`). "In Lether, Finadd, a declined offer is only an open question." **The key fight is `b5_c5_factor`**: in the night the house's hired men come into the Sixth's lines for the paybook in the clerk's case; survive four rounds, non-lethal, until the battalion's provosts come. Nothing on them is the house's. `S.f.b5_c5_paybookKept = 1`.
- **Read later** (by the brief): Ch6 reads `b5_c5_key` (the factor at the line's end with his ledger on `sign`; the army's clerk at the barrow, without interest, on `refuse`) and `b5_holder`; Ch7 reads it (the house's strongroom burns on `sign`; the clerk with the case in a doorway on `refuse`); the finale reads it for what each debt became.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b5_c5_key` | `sign` / `refuse` | the key |
| `b5_holder` | `house` / `army` | who holds the paybooks from the key on |
| `b5_pessaDone` | 1 / 2 / 0 | Pessa walks / waits with the refugee column / was kept by the press-gang or sent away (unset if the player never reached the crossroads, which the way on prevents) |
| `b5_trateFell` | 1 | Trate's fall heard from the refugees on the road (always, at the refugees' cart) |
| `b5_breakaway` | 1 | the rumour of a Finadd upriver whose garrison "answers to nobody now" (never named, never placed) |
| `b5_rearmed`, `b5_c5_rearmed` | 1 | the squad rearmed (`b5Rearm`) at the second cache, or on arriving at Brans Keep if it somehow was not (`b5_c5_rearmedWith`: the ids given) |
| `b5_c5_cache` | 1 | the second cache dug (always, before the way on) |
| `b5_c5_empty` | 1 | the first cache seen, dug out already (never who) |
| `b5_c5_markOk` | 1 | the trick learned (`b5_c5_markTried` once tried) |
| `b5_c5_rejoined` | 1 | the Sixth rejoined its battalion at Brans Keep |
| `b5_c5_learned` | 1 | the battalion's rear picket told the Sixth the battalion burned the road |
| `b5_c5_pack` | 1 | Thegg carried Pessa's pack the first day (both walking when she joined). **Chapter 6 gives it back.** |
| `b5_c5_lamp` | 1 | Pessa held the lamp for Ammet at the fire (both present) |
| `b5_c5_husband` | 1 | Perrit read for Pessa's husband and lied about one tile (both present; never which) |
| `b5_c5_ledgerShown` | 1 | `refuse`: Tobet showed Pessa her ledger line (both present) |
| `b5_c5_ledger` | `burned` / `kept` | after the press-gang fight, its ledger burned (three refugees walk away unwritten) or given to the clerk. Pessa's line stands either way. |
| `b5_c5_claimed` / `b5_c5_pressWon` / `b5_c5_let` | 1 | how the press-gang was settled: the claim (Guile 14), the fight, or "let them keep her" |
| `b5_c5_named` | 1 | the claim's "yes, but": the press sergeant took the sergeant's name and a dock |
| `b5_c5_girth`, `b5_c5_cut` | 1 | the courier's Bluerose girth-strap kept; seen to be cut, not worn (the Wits 13) |
| `b5_c5_nerek` | 1 | Ch3 `warn`: the Nerek family on the road knew the Sixth's name (Ammet +1) |
| `b5_c5_farmDone` | 1 | the optional farm fought (12 docks) |
| `b5_c5_nightDone` | 1 | the key fight won |
| `b5_c5_boots` | 1 | the Token Auction's boots lot won (a rest) |
| `b5_tokens`, `b5_tokensLast`, `b5_tokensResold` | object / 1 | the Token Auction played (wins, owed, resold); the one resale, once a book |

Items read later: `b5_c5_housemail` (on `sign` only) carries the house's stamp inside the collar; `b5_c5_girth` may be named once. The cache pieces are ordinary weapons.

## Docks and debts

- **The brief's Ch5 row:** Pessa joins with her own 120 (the press-gang's chit, `B5_DEBT0.pessa`; `b5Join` or the wait writes it). The key: `sign` +40 docks, the house's scale, the fine at half on Ch1 `pay`, the first interest on every debtor; `refuse` nothing. The Token Auction writes its winning tokens as debt (`b5Owe` on the line the token was on, 5–20 docks each) as the table closes, and pays 10 docks once a book if a lot is resold.
- **Docks in:** the farm's deserters' purse +12 (optional), the battalion's road-money +10 at Brans Keep (always), the house's fee for the wagons +10 (`sign` only). So 10–32 docks, plus the 40 on `sign` and the auction's 10. The claim's "yes, but" takes 1 dock in hand.
- **Salves:** +1 the first cache's spoil (Wits 12), +2 the second cache, +1 the battalion's carts (Guile 13), and the quartermaster's at 6.
- **"Yes, but" costs** (eight): skin (the spoil's broken jar), skin (the cart's tail), rest (walking the courier to the surgeon's cart: no road rest), a dock and a name (the claim: money is the scene), debt 6 or skin (a cracked cache-jar against the roller, the trick), skin (the farmhouse wall still hot), debt 8 or rest (the battalion's stores drawn against the roller's line), rattled (a tent-rope in the dark). Two of eight are debt, each only with room (`b55Owe`, as `b54Owe`: never past `pressed`).
- **The Token Auction never lets a token take a soldier past `pressed`** (its own room check, counting the tokens already won at the table).
- **The King's bounty** is not paid in this chapter. The CH5 brief's binding rules mention it "before Brans Keep … (the brief)", and the book brief puts it on Chapter 6's eve (`b5Forgive(id, 30, …)`, `S.f.b5_bounty = 1`); paying it here as well would pay it twice. Chapter 5 has one line of camp talk at Brans Keep ("There is talk in the lines of a bounty from the King for every soldier who stands here. Nothing is written yet."). **Deviation, reported.**

## The recruits

- **Pessa** (the recruit, Ch5): at the crossroads, the press-gang has written her name wrong and 120 docks beside it. Three roads: **the claim** (Guile 14: the sergeant +2, Tobet +1, the Trate dockhand's word +2 on Ch2 `dead`, +2 on Ch4 `run` because armed soldiers are not pressed; "yes, but" the press sergeant takes the sergeant's name and a dock); **the fight** `b5_c5_press` (after it the ledger is the squad's to burn or keep, and she asks to come anyway); or **let the press-gang keep her** (`b5_pessaDone = 0`; she goes east with a file of the pressed to another company, and nothing worse is said). Then `b5_c5_pessa`: "Walk with us" (room), "Walk with us, instead of X" (a recruit walks: `b5Join` then `b5SwapIn`), "Walk with the refugee column for now" (`b5_pessaDone = 2`, at `B5_HOME.pessa`), or "The Sixth can't take you" (0). Her line stands whatever happens. Waiting, she is on the road map by the column and in the roster at both fires.
  - Her scenes behind `b5In`: Thegg carries her pack (both), she holds the lamp for Ammet (both), Perrit reads for her dead husband and lies about one tile (both; never which), Tobet shows her the ledger line on `refuse` (both). Lines at the fire, the keep fire, the key, the sign, the well, the wagons' arrow, and the morning.
- **Ruuk** and **Brune** (if walking): the reading, the milestone, the fires, the arrival, the key, the morning. Brune walking when Pessa joins goes to the company's followers ("It is all one road"); Ruuk goes back to the scouts.

## Inventions (Claude's calls)

- **The two caches.** The first, at a milestone by the road, dug out neatly by "somebody who knew exactly where to dig" (the quartermaster puts a cut seal in his pocket and says nothing; never who). The second, at an old leaning milestone in a burned copse where the road moved and the stone did not.
- **The quartermaster's cut** (the trick's lore): a line for the road, notches for paces in fours, a hook for the side; water, linen, salve, then kit, deepest last.
- **The battalion's rear picket** on the road, two days north of Brans Keep, below a village burned a day earlier: the picket's sergeant tells the Sixth the battalion's orders in two sentences. The narrator never shows the burning; the squad meets "the end of it, a day old".
- **The battalion's Second Company** (one soldier, touching up his fingertip: "It's so you can tell us from the ones who did it, from a long way off. Except we're the ones who did it.") and its cook. "Second" is a company number, as "Sixth" is.
- **The house's factor** (unnamed, about fifty, a pleasant face he uses) and his clerk with the umbrella; the house's mark, a scale-balance. "Everybody in Lether owes somebody, Sergeant. The house only asks to be the somebody."
- **The press-gang** (a sergeant with a ledger on a cart-tail, four with cudgels) at a crossroads by a burned inn; the Trate dockhand on Ch2 `dead`.
- **The courier's strap**, cut on the inside long ago so that it would hold for a while and then not (canon: Bluerose supplied poor tack on purpose; never more than that, rule 37).
- **The Token Auction** (89): the quartermaster's sealed bids in clay tokens, written on the paybook.
- No new named people.

## Canon as written

- "The fort has surrendered, and the whole frontier with it." The Edur follow south, unhurried (never seen on the road).
- The burned country: fields, farms, wells and granaries destroyed by the army's retreat so the Edur would find nothing; boards with the army's stamp on the gateposts. The Whitefinders' part is told by their own picket ("We were recalled north, from the exercises at First Reach. Then the fort went. We were ordered south to Brans Keep instead, and to leave nothing behind us the Edur could eat.") and never shown (§17c, ch 20).
- Trate has fallen: refugees off the coast road, "From the sea, in a night", headline only.
- A Finadd upriver whose garrison answers to nobody now (rumour; "Upriver. Everybody says upriver."; never named, never Brous). Second Maiden's Fort still holds (rumour, R19). Three companies of the frontier army waiting on the frontier road (rumour, R21; never Seren, never the meeting).
- Bluerose horses and tack behind the cavalry; a courier's saddle fails and the horse goes on without him.
- A press-gang at work on the road (W21, R20).
- The army's hidden caches (W *Letherii Army*).
- Brans Keep: squat against its cliff facing north, barren hills behind, Lake Brans on one side, the dry channel running north-east on the other; the army's tents in front; the Whitefinders on the right across the channel. High Fort's other survivors rearmed at the carts and sent where battalions are short; "the Artisans have taken a whole column of them" (heard; never Moroch, never his recruiting scene, never the Artisans' standard).

## Engine additions in this file (all guarded or scoped)

- `TRICKS.b5_c5_mark` and `AB.t_b5_c5_mark`: the Rhivi Spirit-Song (`song`, `t_song`), copied: once a fight, every squadmate within 4 heals 1d6+2 and 1 more per level step past the first, wakes from a daze, steps out of fire. Not sorcery.
- `GLOSSX.mt` gains two rows (the army's caches, after the cache; the burned country).
- `drawFeature` wrapped (85b) for `b5_c5_road`, `b5_c5_farm`, `b5_c5_keep` only (battle `t`). Other styles pass through.
- `FIGX.b5_c5_nerek` is Chapter 3's Nerek figure (guarded `??=`, as the brief allows).
- **89:** the Token Auction (`playTokens`, `b5TokensPay`, `B5G_TOKENS`, `B5G_RIVALS`), and the wrap of `b5_c5_fire` that offers it (phase 1, once) with `b5_c5_tokens_after` and a journal line. Written with the chapter, as Chapters 1–3 wrote theirs; the header comment says so.
- **13 (audio):** `PLACE` rows: the road, the burned farm and the burned backdrop to the burnt country, the cache and the keep's lines to the camp, the arrival backdrop to the hills. `audio_test` checks the six.
- `tools/b5ch5_test.mjs` (new; `run_all` picks up every `*_test.mjs` by itself).

## The Token Auction (89, `b5g_tokens`)

At the road fire, once, in phase 1. Three lots in turn: two salves in a jar; a cache piece the squad lacks (the bow, else the blade; else linen and gut); dry boots for the squad (a rest). For each, a token of 5, 10, 15 or 20 docks on a chosen soldier's line ("Whose line" cycles the walking squad), or no token; two soldiers of the column bid sealed against you (each lot has its own range); the highest token takes it and a tie goes to the token in first, which is never yours. Once a game, "Watch the tokens go in" (Wits 13; Perrit +2, the sergeant +1, Pessa +1, Tobet +1) shows the top figure on the lot in hand; a near look costs a dock. No token may take a soldier past `pressed`. As the table closes every winning token is written (`b5Owe`) and its lot handed over; then, once a book, a Grass Jacket buys one consumable lot for 10 docks in hand, and the token stays written. Leaving early closes the table on what was won. Deeds: `b5TokensBid`, `b5TokensWon`, `b5TokensNone`, `b5TokensResold`.

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b5_c5_farm` (optional) | a burned farm off the road | 130 + 60 | `b5_deserter` ×3, `b5_deserterbow` ×2; Wits 14 behind the house's wall (surprise); `stage2` *The barn*: writer foe `b5_c5_deserterboss` (boss) + `b5_deserter` ×2. On `hold` it is the knives-and-staves fight, and the text says so |
| `b5_c5_press` (main, avoidable by the claim) | the crossroads | 150 | `b5_presssgt` (boss) + `b5_pressman` ×4; **survive 4 rounds**, non-lethal ("nobody is killed on the King's road") |
| `b5_c5_wagons` (`sign`) | the house's wagons, night | 160 | `dark`; ally `b5_regular` (a picket); `b5_deserter` ×3 + `b5_deserterbow`, a wave of a deserter and a bow at round 2 (six in all) |
| `b5_c5_factor` (`refuse`) | the clerk's tent, night | 160 | `dark`; `b5_collector` (boss) + `b5_bully` ×4; **survive 4 rounds** until the provosts |

A playthrough fights two to four: 160–500 base, 96–300 xp. From level 6 (the brief's start for Chapter 5) a full road reaches 7; the chapter test, which forces each fight it walks, ends at level 6.

**Balance** (`tools/balance.mjs`, a scratch `--patch` setting each fight in a fresh Book Five state at level 6, Chapter 5, the four, a tile from `B5POOL[5]`, two salves, no gear; both areas of the farm played; no rule changed; 12 smart runs each):

| Fight | Soldier, level 6 (win · health lost · downs) | Bridgeburner, level 6 |
|---|---|---|
| `b5_c5_farm` (both grounds) | 100% · 12% · 0.08 | 100% · 13% · 0.08 |
| `b5_c5_press` (survive) | 100% · 10% · 0.00 | 100% · 12% · 0.00 |
| `b5_c5_wagons` (with the picket) | 100% · 4% · 0.00 | 100% · 4% · 0.00 |
| `b5_c5_factor` (survive) | 100% · 12% · 0.00 | 100% · 15% · 0.08 |

Soldier meets the target. **Bridgeburner is far easier than its 75–80% on all four**, as in Chapter 4: the brief's fixed deserters, press-gang and bullies on Book Two's curve (`FSCALE`, `SOLDIER_LATE.mt`) are light foes for a level-6 squad, and the wagons' picket ally carries that fight. No number was tuned (balance goes to David). Levers, if wanted: the wagons' wave at round 1 with two bows, or no picket; the press-gang and the factor's men at five rounds; a fourth deserter and the leader's `rally` on the farm.

## Left open on purpose

- Who dug the first cache.
- The breakaway Finadd: who, where, and what his garrison is doing.
- What became of the courier, and the Grass Jacket on the verge.
- Whether the factor's men were the house's (the provosts find nothing on them; the factor tips his hat).
- Pessa's husband: gone "on the canal, before all this"; never how. Which tile Perrit lied about.
- The King's bounty: talk only. Chapter 6 pays it.

## Canon points I was unsure of

- **Where the Whitefinders' rear picket would be.** The novel has the battalion "razing the ground on their retreat from First Reach" and due at Brans Keep soon (ch 20); it does not say how far north of the keep it burned. The picket is two days north, below a village burned the day before. The squad rejoins the battalion itself at Brans Keep, as §17c requires.
- **The Artisans and High Fort's survivors.** Canon attaches Moroch's survivors to the Artisan Battalion (ebook p. 735); the chapter says only that "the Artisans have taken a whole column of them", heard at the carts, and never goes to look.
- **Second Maiden's Fort** is R19's single mention; the Grass Jacket repeats it as road talk.
- **The house's interest at "one part in ten"** is the brief's 10%, said in Lether's words.

## Deviations from the brief

- **The King's bounty** is not paid here (above): Chapter 6's eve pays it by the book brief; Chapter 5 has a line of talk.
- **`b5_c5_press` has no `stage2`**, and neither key fight has one: the brief gives none for them, and the farm (the chapter's only fight with a brief-given second area) has its barn. The brief's "each main fight with a `stage2`" is met by the farm's.
- **"`b5_deserter` ×4, `b5_deserterbow` ×2, a wave"** is read as six in all (three and a bow, then a wave of one and one), as Chapter 4 read its waves.
- Extra trigger letters beyond the brief's ground keys: the road's `k` (the copse), `F` (the fire), `f` (the farm lane) and `v` (on south); the farm's `e` (back to the road); the keep's `q` (the battalion's carts) and `^` (the north road). The keep's `F` is the brief's.
- The farm uses the `b5_c5_burned` backdrop (a farmstead burned to its walls, the barn smoking until the fight is won), so the farm has a background that matches without a fifth backdrop.
- `b5Rearm` is called at the second cache, and again (guarded, once) on arriving at Brans Keep if the squad is somehow still disarmed; the cache's two pieces are gained as finds on every road, so the items always exist in the chapter. On a real Ch4 `hold`, the stash comes back (the squad's own weapons) and the cache's pieces are extra.
- The chapter's fire game and its after-node live in 89 (as Chapters 1–3 did theirs), since this session wrote the game.

## Engine notes (reported, not patched)

- **`settleRoll` (16) says "Oponn smiles, for now" on a natural 20 in every book**, Book Five included. Oponn is not Lether's (the Errant is). A one-line book check in 16 would fix it; it is not a chapter's to patch.

## Tests

- `tools/b5ch5_test.mjs` (16 checks): a fresh Chapter Five after `pay`/`dead`/`warn`/`hold` with Brune walking (disarmed, a spear on the pile): the first halt and the reading (the Walker), the first cache and its spoil, the refugees (Trate's fall; the dockhand), the cart, the Grass Jacket's rumours (no name, no place), the courier's girth (cut), the Nerek family, the way on shut, the claim and Pessa walking instead of Brune (her 120, the pack), salves, the trick and the rearming (the spear back, the cache's two), the farm both grounds and its 12, the fire and its talk (the lamp, the groves line), Perrit's reading for Pessa, the pay desk, **the Token Auction played through in the DOM** (a 20-token wins the salves; the debt written only as the table closes; resold for 10 once), the rear picket and Brans Keep (road-money 10), the factor, the keep fire, the key both ways (sign: loyalties, +40, the scale, the fine at half then the interest by the numbers, the wagons with the picket and the wave, the 10, the morning and the end; refuse: loyalties, no interest, the ledger line, the factor's men, survive, the end); a `run`/`watch`/`salvage`/`swim` road with nobody (armed, the claim +2, the press-gang fought, the ledger burned, Pessa with room, the cache as finds; let them keep her); a `--from=5` style save (every node renders in every phase and both keys, the cache's fallback rearm, the roster offers Ruuk, the Mark heals in a fight).
- The session's checks: `python3 build.py`; `node --check` on the changed files; `lint` 0 errors (26 warnings, none Chapter 5's); `repeat_scan` (every Ch5 hub reads `again`; the keep's rest folds); `trope_scan --files` (85: the way 2, silence 1, nobody 6, edge 2 in 9,498 words; Book Five within budget); `recruit_scan` (LISTED 0, COUNT 0 new; ABSENT only Pessa in her own recruiting scenes) and `recruit_test` pass; `b5ch1`–`b5ch5`, `b5engine`, `reading`, `audio`, `gear_roles`, `roster`, `shelf`, `access`, `series`, `onward` (after making the key's and the picket's onward steps go by node, so the unspoken-to line never shows on a node that stays), `back`, `fit`, `recheck`, `trope` pass (`yesbut_test` does not exist); `play.mjs 1 --book=mt` plays Chapters 1 to 5 through (level 7, road swim/dead/watch/run/sign); `play.mjs 3 --book=mt --from=5` 3/3 (both Ch4 keys; Pessa walks in two); `play.mjs 1` (Book One) 1/1. `run_all` was not run this session (the lead's instruction).
- Screenshots at 390px: `/tmp/claude-0/-home-claude/a618115a-4a1c-549c-b1f5-85dc892eec82/scratchpad/mt/shots/ch5/`.
