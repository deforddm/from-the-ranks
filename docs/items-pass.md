Fri Oct 30, 2026 · the items pass, data half, on top of v8.0.20 (branch `items-data`; ships with the display half as the next minor)

# The items pass: numbers, new pieces, trinket effects

David's decisions of Oct 30, 2026: every weapon has its own damage profile so choosing one is a real choice; the dead trinkets get real
effects; Book Four gets armour and Books One and Five get a few damage weapons; the numbers come out of the prose (the shared formatter
shows them). Munitions are untouched (they never grow). The lead re-balances after the merge; nothing here has been through `balance.mjs`.

## The weapon profiles

A weapon's damage **replaces** the soldier's own (`mkParty`, 31_battle.js); level and Edge add on top. Before this pass only 9 of 37
weapons had damage, so the rest (the "+1 to hit" pieces) kept the soldier's base: front line 1d8+2, the others 1d8+0/+1 or 1d6+0/+1.

| Kind | Profile | Against the base |
|---|---|---|
| Knives (hook-knife, duelling knife, Claw and Khundryl knives, cold iron) | +2 to hit, 1d6+1, later 1d6+2 | An upgrade for the 1d6 soldiers (healers, mages, scouts); a sidegrade (more hits, less weight) for the front line |
| Short blades (Guild blades, cache shortsword, sabre, flint) | +1 to hit, 1d8+1, later 1d8+2 | An upgrade for everyone but the front line; level with it in damage at 1d8+2, +1 to hit |
| Heavy weapons (axes, maces, longswords, the club) | +0 or +1 to hit, 1d10+2 to 1d12+2 (the Hunter's blade 2d6+2) | The front line's upgrade |
| Reach (halberds, lances, spears, the gaff) | reach, +1 range, −1 armour, +0/+1 to hit, 1d8+1 to 1d10+2 | A sidegrade: the shield goes on the back for the second rank |
| Bows | +1 to hit, +1 range, 1d8+0, later 1d8+1 | Range, and the dice of the better archers |
| Crossbows | +1 to hit, 1d10+1/+2, no extra range | Hard-hitting at the range the soldier already has |

Power grows gently by chapter inside each book (Book One's knives 1d6+1 at Ch1, 1d6+2 at Ch3; blades 1d8+1 at Ch4, 1d8+2 at Ch5–6;
Book Five's blades 1d8+1 at Ch1, 1d8+2 at Ch5, the Edur sword 1d10+2 at Ch6). `tools/items_data_test.mjs` checks that every weapon has
damage and that none is a downgrade for every soldier who can use it (expected damage against armour 14, or a reach, range or stat it adds).

## Every number change

"Before" for a weapon without damage meant the wearer's own base damage.

| Item | Book · ch | Before | After | Why |
|---|---|---|---|---|
| clawknife (Grey cloak's knife) | One · 1 | +1 hit | +2 hit, 1d6+1 | knife profile |
| rhivibow (Rhivi horn bow) | One · 2 | +1 hit, +1 range | +1 hit, +1 range, 1d8+0 | bow profile ("a bad bow") |
| **secondhalberd** (A Second Army halberd) | One · 2 | new | reach, +1 range, −1 armour, 1d10+1 | new: Book One's first reach weapon, off the deserters |
| daruknife (Daru duelling knife) | One · 3 | +1 hit | +2 hit, 1d6+2 | knife profile, a step up from Ch1 |
| guildblade (Guild blade) | One · 4 | +1 hit | +1 hit, 1d8+1 | short blade |
| **darucrossbow** (A Daru roof-crossbow) | One · 4 | new | +1 hit, 1d10+1 | new: Book One's crossbow, left on the Daru ridge |
| barrowflint (Barrow-flint blade) | One · 5 | +1 hit | +1 hit, 1d8+2 | short blade, a step up |
| simtalhalberd (House guard's halberd) | One · 6 | +1 hit, +1 range, reach, −1 armour | the same, 1d10+2 | reach profile, better than the Ch2 halberd |
| blackedblade (Blacked Guild blade) | One · 6 | +1 hit, +1 guile | the same, 1d8+2 | short blade |
| **darusword** (A Daru house-guard's sword) | One · 6 | new | +1 hit, 1d10+2 | new: Book One's heavy weapon, from Simtal's stable yard |
| b2_horsebow (A Weasel horse-bow) | Two · 2 | +1 hit, +1 range | the same, 1d8+0 | bow profile |
| b2_tithlance (A Tithansi lance) | Two · 3 | +1 hit, +1 range, reach, −1 armour | the same, 1d10+1 | reach profile |
| b2_noblesabre (A noble's sabre) | Two · 4 | +2 hit | +2 hit, 1d8+1 | a fine light blade |
| b2_coldknife (A cold iron knife) | Two · 5 | +1 hit | +2 hit, 1d6+2 | knife profile |
| b2_tcrossbow (A Trygalle crossbow) | Two · 5 | +1 hit, +1 range, 1d8+2 | +1 hit, 1d10+2 | crossbow profile: the dice, not the range |
| b2_arensword (An Aren longsword) | Two · 7 | +2 hit, 1d8+2 | +1 hit, 1d10+3 | longsword: the book's last and heaviest blade |
| b3_c2_hornbow (A bhederin-horn bow) | Three · 2 | +1 hit, +1 range | the same, 1d8+1 | bow profile |
| b3_c3_spear (A Beklite's spear) | Three · 3 | +1 hit, +1 range, reach, −1 armour | the same, 1d8+2 | reach profile (a spear, lighter than a halberd) |
| b3_c4_flint (T'lan Imass flint blade) | Three · 4 | +1 hit (+3 against K'Chain Che'Malle) | +1 hit, 1d8+2 (the +3 kept) | short blade |
| b3_c6_axe (A barge-builder's axe) | Three · 6 | 1d10+2 | 1d12+2 | a step past the Ch2 mace |
| b4_c3_khundrylknife (A Khundryl knife) | Four · 3 | +1 hit | +2 hit, 1d6+2 | knife profile |
| b4_c4_setibow (A Seti horn bow) | Four · 4 | +1 hit, +1 range | the same, 1d8+1 | bow profile |
| **b4_c1_issuemail** (Fourteenth issue mail) | Four · 1 | new | +2 armour | new: Book Four had no armour |
| **b4_c4_setijack** (A Seti hide jack) | Four · 4 | new | +1 armour, +3 health | new: light armour for the archers and healers |
| **b4_c6_dogscale** (A Dogslayer's scale shirt) | Four · 6 | new | +3 armour | new: heavy armour, off Dom's soldiers |
| b5_c1_hookknife (A rope-man's hook-knife) | Five · 1 | +1 hit | +2 hit, 1d6+1 | knife profile |
| **b5_c1_issuesword** (A Letherii issue sword) | Five · 1 | new | +1 hit, 1d8+1 | new: the quartermaster sells it, 8 docks |
| **b5_c1_tarthclub** (A Tarthenal war-club) | Five · 1 | new | 1d10+2 | new: Thegg's people's club, from the old Tarthenal |
| b5_c2_gaff (A harbour gaff) | Five · 2 | +1 hit, +1 range, reach, −1 armour | the same, 1d8+1 | reach profile (a tool, not a weapon) |
| b5_c3_spear (A Faraed throwing-spear) | Five · 3 | +1 hit, +1 range | the same, 1d8+1 | thrown spear |
| b5_c5_cacheblade (A cache shortsword) | Five · 5 | +1 hit | +1 hit, 1d8+2 | short blade, a step up from Ch1 |
| b5_c5_cachebow (A cache bow) | Five · 5 | +1 hit | +1 hit, +1 range, 1d8+1 | bow profile: it was the only bow with no range |
| b5_c6_edurblade (An Edur sword) | Five · 6 | +1 hit | +1 hit, 1d10+2 | "the Edur make better swords than Lether does" |

Unchanged: b2_auxtulwar (+1, 1d8+3), b2_semkaxe (1d10+2), b2_khundrylblade (+1, 1d8+3), b3_c2_mace (1d10+2), b3_c7_hunterblade (2d6+2),
b4_c7_dogslayerblade (+1, 1d10+2): they already fit the scheme. No trinket's or armour's existing numbers changed, so the b5ch tests'
pins (cadre tile, helm, wolf's tooth, girth, house mail, lake stone, lamp) still hold.

## Where the new pieces are found

Each is a line in a node that already gives loot or ends a fight; no new nodes.

| Item | Where | Line |
|---|---|---|
| secondhalberd | Book One Ch2, `c2_after_deserters` | One of the deserters carried it four days south and never got it level. |
| darucrossbow | Book One Ch4, `c4_after_clan` | The crossbowman on the Daru ridge left it on the tiles, still cocked. |
| darusword | Book One Ch6, `c6_after_guards` | Picked out of the straw of Simtal's stable yard; nobody is coming back for it. |
| b4_c1_issuemail | Book Four Ch1, `b4_c1_to_quay` | Hollet's pass says *and kit*, so the quay clerk signs a shirt of issue mail to the Third. |
| b4_c4_setijack | Book Four Ch4, `b4_c4_healer` | The old Seti cutter gives it with the salve: "His. He does not need it now." |
| b4_c6_dogscale | Book Four Ch6, `b4_c6_patrol_after` (hold) or `b4_c6_outpost_after` (forward) | A Dogslayer left in front of the screen, or in the basin. |
| b5_c1_issuesword | Book Five Ch1, `b5_c1_qm` | A choice at the quartermaster's: 8 docks, "a better one than issue". |
| b5_c1_tarthclub | Book Five Ch1, `b5_c1_oldman_ok` | The old Tarthenal hands it to Thegg by the wrong end: "Her people's." (A reward for the Wits check.) |

Artwork: Book One's three in `src/46b_b1_items_art.js` (the Arms board's 200×150 frame, so the canvas boards need no rebuild); Book Four's
and Book Five's in their chapter art files with the chapter's own helper. Roles are in `ITEM_ROLE` (38c) and inline.

## Trinket effects (`src/89c_item_specials.js`)

Wrappers keyed on the item id, as Books Two to Four do theirs. "Worn" goes through `wears(unit or id, item)`; the display half adds it,
and this file carries a shim of the same name until then. `IX_SPECIAL` in the same file has the words for each; the display half's
special-text table may take them. Once a fight is kept in `B.used` (it carries into a second ground); once a chapter in `S.f`.

| Item | Book | Effect | Why it fits |
|---|---|---|---|
| b5_c4_pitchpot | Five · 4 | Once a fight, an action: throw it, range 4, 1d6 to a 3×3 and the pitch burns 2 rounds | The brand-pot from the west rampart, like Book Four's lamp-bola (which is once a book) |
| tyrantmap | One · 3 | +1 to Wits checks in the Gadrobi Hills (Book One Ch5) | Brack's map is "the Gadrobi Hills, roughly" |
| b5_c3_ash | Five · 3 | Once a chapter, the first time fire would burn its wearer (standing in it, walking through it, or already burning), it does not | Green ash: a fire ward |
| b5_c7_ledgerpage | Five · 7 | +1 to a check about debts, pay, the paybook, docks, a fine or a tab | The Sixth's page from the paybook. It comes at the end of Book Five, so it matters on a transfer onward |
| b4_c1_durhangpipe | Four · 1 | Worn: its wearer goes into a fight without the soreness a "yes, but" left (`S.bruised`). The fire choice (once a chapter, passed round) is unchanged | Durhang dulls pain |
| b4_c3_ferryrope | Four · 3 | Worn: +1 to hit with the first attack of each fight. Carried: once a chapter +1 to a check, unchanged | "Knotted round a wrist, it steadies the hand" |
| houndtooth | One · 1 | +1 initiative (its +1 to hit kept) | The Hounds are faster than anything they hunt |
| lampchip | One · 3 | Once a fight, the first blow it lands dazzles: −3 to hit through the round | Darujhistan's blue light |
| fetemask | One · 6 | First round of a fight: enemies −2 to hit its wearer | A face nobody can read, until they have had time to |
| b2_dogtooth | Two · 6 | Once a fight, the first blow aimed at its wearer meets +2 armour | The Chain's dogs stood over the wounded |
| b2_crowfeather | Two · 7 | Once a fight, the first attack it misses is rolled again | Coltaine's crows: a second look |
| b3_c3_stripe | Three · 3 | +2 damage while its wearer is below half health | Treach, the Tiger of Summer, fights hardest wounded |
| b4_c5_conch | Four · 5 | +1 initiative | "Whoever carries it listens a little harder" |
| b5_c2_shells | Five · 2 | Never rattled on a check | "Thinks a little more slowly before doing something stupid" |
| b5_c4_wolftooth | Five · 4 | +1 damage against an enemy already wounded | Wolves go for the bleeding |
| b5_c7_dock | Five · 7 | Once a chapter, a check its wearer fails is rolled again | The Errant remembers who keeps one |

spawnshard stays useless: it is Brack's joke, and the test checks it.

## The prose

The numbers came out of 41 item lines ("+1 to hit", "+3 health", "(−1 armour)", "for 2 more", "Nerve 5 or more" and the like); the
flavour stays. The formatter and the special-text table now carry the numbers, including the conditional ones that used to live only in
the prose: b4_c1_redsash (+1 to hit on Ramin), b4_c6_dogslayer (+1 to hit Dom's soldiers), b3_c2_bundle (no −1 from the dread),
hoodrep (stays up at 1 health, once a chapter), b2_plank (3 back to the striker), b3_c4_flint (+3 against K'Chain Che'Malle),
b3_c5_knife (+2 against Seerdomin and K'ell), b3_c5_skin (dread −1 more at a rest), b3_c7_greymail (the first blow 2 lighter),
b4_c1_finger (Nerve 5 or more), b4_c2_milestone (+1 on the first blow), b4_c4_salve (+2 on the first heal), b4_c6_pickethorn (two
regulars). The display half's table needs those numbers.
