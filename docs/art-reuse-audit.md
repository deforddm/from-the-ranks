Sun Nov 15, 2026 4:57 PM PST. Art reuse audit for series-polish-plan §3 ("More variety in battle maps and enemy figures where books reuse them"), on branch `ship`, before the fixes below were built. Status column updated after the build.

# Art reuse audit: enemy figures and battle grounds

How it was taken: the built game was loaded in Chromium and every battle in `BATTLES` (397 grounds counting each `stage2`, which inherits its parent's `style`) was walked for its foes (start and waves) and its ground; each foe's figure is `FOES[id].kind || id`, resolved against the base cases in `src/018_figure_sprites.js` and `FIGX`. A figure's home book is the book whose art file draws it (018 = Book One). Figures were then drawn side by side (scratchpad contact sheets) and judged against each book's canon sheet.

**Counts.** 396 foe defs; 31 figures are used by foes outside their home book (26 in more than one book, 5 only in another book). Verdicts: 18 right (the same people), 5 acceptable (neutral figures; 4 worth a figure of their own later), 8 with at least one wrong use: 9 foes in all, every one fixed (6 new figures, 3 pointed at their own book's figure). Inside single books, 2 more foes wore a figure of visibly different people; both fixed. Grounds: 27 ground styles are used outside their home book; 24 are the same place or a neutral ground, 3 are a mismatch of place (all Book Six), none changed (see §2).

The fix mechanism (Claude's call): a foe may name a figure with `fig:` beside its `kind`. Battles draw `u.fig || u.kind`; `kind` is left alone everywhere, because the engine reads it for rules (the K'Chain soak word, a howl's once-per-kind, Book Three's K'ell rules, sounds), so changing it could change a fight. `fig` is read only by the two draw calls in `src/031_battle.js` and by the lint's sprite check.

## 1. Enemy figures used across books

| Figure (home) | Where else, which foes | Verdict | Recommended fix | Status |
|---|---|---|---|---|
| `b2soldier` (B2 Malazan garrison) | B3 Mosk's lads; B4 loudmouth of the 10th; B6 Guard sergeant (Malaz City); B9 heavy corporal, sparring heavy; B10 sparring heavy, stragglers | Right: Malazan soldiers every time | none | — |
| `b3_c4_priest` (B3 the Seer's priest) | B6 `b6_c4_plaguepriest` "Priest of the Mistress" (Poliel, G'danisban) | **Wrong**: a Pannion priest standing in for Poliel's in Seven Cities | Own figure in Book Six's Ch4 art | **Fixed** (`b6_c4_plaguepriest`) |
| `b4_c1_tough` (B4 Aren hired tough) | B6 gate-ward of G'danisban (2) | Right: Seven Cities townsmen | none | — |
| `b4_c5_rider` (B4 Whirlwind rider) | B6 patrol's leader, bandit chief, bandit captain | Right: Seven Cities desert riders | none | — |
| `b4_c7_fleer` (B4 desert warrior running) | B6 "A knife from the postern"; B6 `b6_c6_marked` "One of the marked, preaching" | Knife: right. **The marked preacher: wrong** (a running desert warrior for a plague-marked preacher; the comment in 102b says the borrow was meant to end when `b6_cultist` was drawn, and this one was missed) | Point at Book Six's own `b6_cultist` | **Fixed** (`fig:'b6_cultist'`) |
| `b4_c7_fleerbow` (B4) | B6 bandit bowmen (3) | Right: Seven Cities | none | — |
| `b5_c7_greatwolf` (B5 the pack's biggest, a Jheck wolf ×1.5) | B9 `b9_dog` "Wastes dog"; B10 `b10_ldog` "Half-wild dog" | **Wrong**: a giant soletaken wolf drawn for half-starved dogs | A dog, drawn once in Book Nine and used by both | **Fixed** (`b9_dog`; B10 `fig:'b9_dog'`) |
| `b5_edur`, `b5_unblooded`, `b5_wraith`, `b5_krisnan` (B5) | B7 Edur warriors, war-leader, spearman, wraith, K'risnan | Right: the same people | none | — |
| `b5_letherii`, `b5_letherii_bow` (B5) | B7 soldiers, Finadd, cadre mage, crossbowman, deserters; B9 deserters, veteran, looter; B10 sparring spear of the Ninth | Right: Letherii | B7's cadre mage could carry a mage's mark later | — |
| `b6_bandit` (B6 plague-road bandit) | B9 border raiders (Bolkando border), chiefs, bowmen; B10 field-strippers, starving foragers, Bolkando deserters | Acceptable: the figure is a neutral ragged bandit (torn cloak, scarf, hatchet), nothing of Seven Cities in it. The Bolkando deserters are soldiers of a named army and would show its kit | A Bolkando deserter figure once a source for their kit is found (none in tcg-canon or dod-canon: open) | Recommended |
| `b6_cultist` (B6 follower of the Chosen) | B8 `b8_cultist` "Cultist of the Dying God" | **Wrong**: a Seven Cities cult for Saemankelyk's people in the old Pannion towns | Own figure in Book Eight | **Fixed** (`b8_cultist`) |
| `b4_c2_pilgrim` (B4 Dryjhna pilgrim, white head-wrap) | B8 `b8_pilgrim` "Kelyk-mad pilgrim" (the Redeemer's camp at Black Coral) | **Wrong**: a Seven Cities pilgrim for a Genabackan one | Own figure in Book Eight | **Fixed** (`b8_pilgrim`) |
| `priest` (B2 priest of Mae, plump, blue) | B8 `b8_kelykpriest` "Priest of the Dying God" | **Wrong**: a Seven Cities priest for the Dying God's | Own figure in Book Eight | **Fixed** (`b8_kelykpriest`) |
| `tenescowri` (B3 Pannion peasant host) | B8 field-tender, plains raider | Field-tender: right (the old Domin's peasants, the same people). Plains raider: acceptable; canon puts the Skathandi raiders on the Lamath plains (tth-canon R6), a mixed armed band, not starving peasants | A Skathandi-style raider figure for `b8_raider` | Recommended |
| `houseguard` (B1 Daru house guard, livery, halberd) | B8 `b8_bravocaptain` "Bravo with a name" | **Wrong in look** (same city, different people): a liveried house guard with a halberd for a named duellist who `duels` and parries | Own figure in Book Eight | **Fixed** (`b8_bravocaptain`) |
| `guildknife` (B1) | B8 Guild knife, Guild crossbow | Right: the Guild | none | — |
| `hound` (B1) | B8 Hound of Shadow | Right | none | — |
| `khell` (B3 K'ell Hunter) | B9 short-tails (6 foes) | Right already: 166b wraps `FIGX.khell` to draw `b9_nahruk` while Book Nine is open (kind kept for the rules) | none | — |
| `b3_barghast` (B3) | B9 Barghast skirmisher, war-leader | Right: Barghast | none | — |
| `b3_c2_bhederin` (B3) | B9 bhederin (2) | Right | none | — |
| `rebel`, `rebel_bow` (B2 Apocalypse rebels) | B4 tribal raiders, chief, horn-bow raider | Right: the Whirlwind's tribes | none | — |
| `deserter` (B1 Malazan deserter) | B3 Pale deserter; B6 deserter of the Fourteenth, burned sergeant; B6 `b6_c2_looter` "Shrine-looter" | Deserters: right (Malazan). **Shrine-looter: wrong** (Seven Cities looters at a D'rek shrine drawn in a Malazan half-helm) | Point at Book Six's own `b6_bandit` | **Fixed** (`fig:'b6_bandit'`) |
| `xbow` (B1 deserter crossbow) | B3 deserter crossbow; B6 deserter with a crossbow | Right: Malazan deserters | none | — |
| `bruiser` (B1 Gadrobi bruiser) | B5 collector's bully, cutpurses' minder; B6 robbers' big man, boathook men, docker; B7 Patriotist enforcer, rioter | Acceptable: a plain big man in brown, no people's marks | Letherii enforcers could get a Letherii look later | Recommended (low) |
| `thug` (B1) | B5 collector's man; B6 corpse-robber, looter; B7 factor's guard, Patriotist captain; B8 Daru bravo | Acceptable: neutral. Except the Patriotist captain, see §1b | none | — |
| `cutpurse` (B1) | B6 looter with a knife | Acceptable: neutral | none | — |

## 1b. Inside one book: one figure for visibly different people

| Book | Foe | Figure | Verdict | Status |
|---|---|---|---|---|
| One | `guildbow` "Guild crossbow" (Ch4) | `xbow`, the deserter crossbowman | **Wrong**: the Guild's other crossbow (`c6_guildbow`) wears the Guild's black; this one wore a Malazan deserter's kit | **Fixed** (`fig:'guildknife'`) |
| Six | `b6_c6_marked` | `b4_c7_fleer` | see §1 | **Fixed** |
| Six | `b6_c2_looter` | `deserter` | see §1 | **Fixed** |
| Two | `bhilard` also draws "Dom's rider"; `guran_officer` draws six officers | own | Right: Dom's army is these tribes and legions | — |
| Three | `beklite` also draws Pannion bowmen, drivers, skirmishers | own | Right: Beklites are Pannion soldiers | — |
| Seven | `b7_agentchief` "Patriotist captain" (Ch2) | `thug` | **Wrong**: the other Patriotist captain (`b7_c7_patcaptain`) and every agent wear the Patriotists' grey coat (`b7_agent`) | **Fixed** (`fig:'b7_agent'`) |

## 2. Battle grounds used across books

A battle's ground is its `style` (the `TILEX` tile set); `stage2` inherits it. Ground looks were rendered side by side (scratchpad `m1.png`–`m3.png`).

| Ground (home) | Used in | Verdict | Recommended fix | Status |
|---|---|---|---|---|
| `b5_c1_barracks`, `b5_c1_canal`, `b5_c1_walk`, `b5_c3_bank`, `b5_c5_farm`, `b5_c5_road`, `b5_c6_dissent`, `b5_c6_lines`, `b5_c7_barricade`, `b5_c7_lowwalk`, `b5_c7_streets` (B5 Lether) | B7 (17 battles), B9 `b9_c1_stores` | Right: Letheras and its country | none | — |
| `b5_c2_strand` (B5 Lether strand) | B7 dunes above the beach; B6 `b6_c5_boats` | B7 right. B6: acceptable, a grey beach and sea with nothing of Lether in it | none | — |
| `city`, `cellar`, `roof` (B1 Darujhistan) | B8 (13 battles) | Right: Darujhistan again | none | — |
| `plain` (B1) | B7 coast road | Right: neutral grassland | none | — |
| `b3_c5_domin_night`, `b3_c7_field_night` (B3 Pannion Domin, the fields before Coral) | B8 pilgrims' road, raiders' camp, sellers' tent | Right: Book Eight's road east is the old Domin to Black Coral | none | — |
| `hissar`, `odhan`, `odhan_night` (B2 Seven Cities) | B6 Y'Ghatan streets and gate, plague village, way-station, wells, Hanar Ara's edge | Right: Seven Cities | none | — |
| `b4_c4_camp`, `b4_c4_hills` (B4 Seven Cities) | B6 Ch1 and Ch6 (5 battles) | Right | none | — |
| `b3camp`, `b3camp_night` (B3 the Host's camp outside Pale, early spring) | B6 surgeons' carts, camp's edge (Ch4, the lines in the rain) | Acceptable: the same Host's camp, and a muddy spring camp suits the rain; the explore area uses it too | none | — |
| `b3_c3_city_night` (B3 Capustan's red brick) | B6 `b6_c4_streets` "The forward picket", outside G'danisban's walls | **Mismatch of place**: Capustan's red brick for a Seven Cities city. Book Two's `aren` ground (Seven Cities stone, dark) draws the same map with the same walls and cover; tried and it reads right. Not changed alone, because the explore area `b6_c4_outer` uses the same Capustan ground and its gate, well, cart and post tiles have no Seven Cities version | Change the battle and the area together, with `aren` tiles for `G`, `w`, `c`, `p`, `v` | Recommended |
| `b3_c5_domin`, `b3_c5_domin_night` (B3 the Pannion Domin) | B6 Ch2: plague road, shrine on the headland, village of the open doors (Seven Cities coast) | **Mismatch of place**, mild: Pannion farm ground for the Seven Cities coast; the Ch2 explore areas use it too (bh-ch2-notes) | A Seven Cities coast ground for Ch2's areas and fights together | Recommended |

No ground was changed in this pass: every clear mismatch shares its ground with the explore area the squad walks just before the fight, so changing the battle alone would make the walk and the fight disagree. Grounds are drawn from the map's characters; walls, cover and pits come from the map, not the style (only `roof` and `dock` change rules), so either recommended change is looks-only.

## 3. New figures (this pass)

Each is in the series' ~32px frame with 018's helpers and `B2F`, lit from the left, read at phone size (1.1× in the sheet) and at 2.6×. Sheets (not in the repo): `/tmp/claude-0/-home-claude/c7cefdea-0715-51c5-a1c3-439672d89b23/scratchpad/reuse/figs_before_after.png` (before beside after, 2.6× and 1.1×) and `big.png` beside it (the six new figures at 4.6×).

| Book · foe | Was | Now | Source for the look |
|---|---|---|---|
| Six · Priest of the Mistress | B3 Seer's priest | `b6_c4_plaguepriest`: a priest of Poliel, sallow and shaven, an ash-and-ochre robe with a dull mustard stole, linen-bound hands, an iron censer on a staff with a grey-green thread of smoke | Poliel's plague and its marked (bh-canon W12 [1], W15); robe colours Claude's call (no source describes her priests: open) |
| Eight · Cultist of the Dying God | B6 follower of the Chosen | `b8_cultist`: old-Domin field-folk in a drab smock, rags tied at the wrists (the scarecrow fields), a plum stain down the front, a field hook, swaying | tth-canon R4 S2 (rag-wrapped scarecrow fields), R6 S3; kelyk "a bruised plum", "never a face" (Book Eight's own art notes, 144b) |
| Eight · Kelyk-mad pilgrim | B4 Dryjhna pilgrim | `b8_pilgrim`: a pilgrim of the barrow camp, patched coat open, a tin cup on a cord, a bundle on the back, plum-stained, hands out | tth-canon W *Spindle*, R6 S5 (the pilgrim camp); Hurrin's coat (144b) for the camp's look |
| Eight · Priest of the Dying God | B2 priest of Mae | `b8_kelykpriest`: a long robe of faded plum, a grey rag mantle, stoppered jugs on the cord belt, a shallow bowl held out, a stained mouth | tth-canon R4 S2 (a Dying God priest in an old Pannion town); colours from 144b's kelyk palette |
| Eight · Bravo with a name | B1 house guard | `b8_bravocaptain`: a Daru duellist, fitted wine-dark coat, sash, a short cape on one shoulder, a torc, a long thin blade and a parrying dagger | tth-canon R1 ("Malazan-style torcs are the fashion"); the Daru duelling schools (Gorlas Vidikas, R1) |
| Nine (and Ten) · Wastes dog, half-wild dog | B5 giant Jheck wolf | `b9_dog`: a lean dun dog, darker saddle, ribs showing, one ear down, a ragged curled tail, smaller than the wolf | Claude's call (game's own animal) |
| One · Guild crossbow | B1 deserter crossbow | the Guild's own `guildknife` | Book One's other Guild crossbow (`c6_guildbow`) |
| Six · One of the marked, preaching | B4 desert runner | Book Six's own `b6_cultist` | bh-canon W12 (the marked drawn to Hanar Ara) |
| Six · Shrine-looter | B1 Malazan deserter | Book Six's own `b6_bandit` | bh-ch2-notes (looters at the shrine; never deserters in the text) |
| Seven · Patriotist captain (Ch2) | B1 Gadrobi thug | Book Seven's own `b7_agent` | 122b (the Patriotists' grey coat) |

Checked: `python3 build.py`; `node --check` on every changed file; `node tools/lint.mjs` 0 errors (75 warnings, all the old unlisted-style ones); the chapter tests of every touched chapter and the next (scenes1, b6ch2, b6ch2art, b6ch4, b6ch5, b6ch6, b7ch2, b7ch3, b8ch1–b8ch6, b8engine, b9ch3, b9ch5, b9ch7, b10ch2, b10ch4) and fightrow, all pass; one battle per touched book loaded on a 390×844 page with no page errors, each new figure seen in its fight.
