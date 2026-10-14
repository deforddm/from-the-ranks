# Book Three, Chapter 4: "The Prisoners" — continuity notes

`src/64_b3_ch4.js` (exports `B3CH4`, `number:'Four'`), art in `src/64b_b3_ch4_art.js`. West of Capustan, two days after the relief: the Fourth hold a stretch of the stake line round about 200,000 Tenescowri, collect Dannet from the Grey Swords in the city, ride out at dusk with Grey Swords and ropes after a K'ell Hunter under the Gathering's dust, and hold their stretch on the night a Pannion priest drives the starving at the stakes. Ends at dawn by the ration cart, with the key.

## Shape

- **Areas (4, 16×12):** `b3_c4_edge` (guards' bank, dusk; ground `b3_c4_camp`), `b3_c4_city` (Capustan, the Camps by the Thrall; ground `b3_c3_city`, aliased by 64b if Ch3 is absent), `b3_c4_night` (the same bank after dark; `b3_c4_camp_night`), `b3_c4_dawn` (the bank at dawn). The three bank areas share one map (`C4EDGE`).
- **Fights:**
  - `b3_c4_hunt`: the K'ell Hunter (`b3_khell`), Grey Sword allies, `aid` Grey Swords (need 8), survive 3 rounds while the Grey Swords on the flanks get the ropes on; `stage2` "Down in the gully" vs `b3_c4_roped` (two blows a turn, slowed to 2 by the ropes); the Grey Swords stay on the bank holding the ropes, so the Fourth fight it alone. 160 + 100 xp. Dread rises before it (`b3_khell`, the dust).
  - `b3_c4_breakout`: objective fight (`def.b3Spare`). The priest's zealots and the starving come over the stakes; a starving one (`spare:true`) downed in melee or by an ally is knocked down and dragged back alive (`b3_c4_spared`); one killed by a shot, a munition or fire is dead (`b3_c4_starvedDead`); when only the starving are left they sit down (`b3_c4_sat`) and the stage is won. Tav fights beside Brisk if she is in the squad; `aid` a Rhivi rider (need 9). `stage2` "Among the shelters" vs the priest (`b3_c4_priest`, boss). 170 + 100 xp.
  - `b3_c4_brawl` (optional): Corporal Mosk and his lads of the Ninth, fists and cudgels (`def.b3Fists` forbids munitions and item abilities except salves). 60 xp. Only if the sergeant fails the guile check or says "Try it."
  - Total 530 xp listed on the main path (590 with the brawl); about 320–355 paid at the engine's XPK 0.6, taking a level-5 squad to 6.
- **The Deck:** `B3DECK[4]`, the pool leaning to the King in Chains (60c). If that card falls, `b3_c4_chains` follows: Tuft has never seen High House Chains (Sohra's and Old Benna's versions exist).
- **The trick:** *The Wolves' Rope* (`TRICKS.b3_c4_wolfrope`, battle ability `t_b3_c4_rope`), behind a ✦ might check DC 16 with Ambrel in the barracks yard. Once a fight: an enemy within 2 (3 with the rope-and-hooks) is −2 AC (+level) and −2 to hit until the bearer's next turn; doubled against a boss.
- **Items (3):** `b3_c4_ropehooks` (trinket, atk +1, Wolves' Rope reach +1; given by Ambrel after the hunt), `b3_c4_flint` (weapon, atk +1, +3 damage against K'Chain Che'Malle in any Book Three fight; optional, on the rise), `b3_c4_token` (trinket, wits +1; the old healer on Burn's temple steps).

## The key: `S.f.b3_c4_key`

- **`share`**: the squad's bread and up to two salves (`S.inv.salve` −2, floor 0; the count given in `b3_c4_salvesGiven`) go to the children and sick who came over the stakes. `ally(+2 trust, −2 dread)`, Ohl and Sohra loyalty +1, Brisk −1. **`S.f.b3_wjNoticed = 1`**: Whiskeyjack sees it from the dead tree and nods. Later chapters may let Whiskeyjack or a squadmate remember it (Ch7 especially).
- **`hold`**: supplies kept. `ally(0, +2 dread)`, Ohl loyalty −1 (he does one girl's feet with his own cloth and won't look at the sergeant), Brisk +1. Nobody says out loud it was the right sum.

## Flags later chapters may read

- `b3_c4_key` = `'share'` | `'hold'`; `b3_wjNoticed` = 1 on share.
- `b3_dannetDone` = 1 (Dannet with the Fourth) or 2 (no room: she marches with her company; `b3SwapIn('greysword')` is offered at the night fire and any later halt). `b3_dannetMet` = 1. `b3_c4_dannet` = 1 once she was collected.
- `b3_c4_hunted` = 1 (the K'ell Hunter roped and killed); `b3_khell` = 1 (the squad has seen a K'ell Hunter).
- `b3_c4_flint` = 1 (taken; Tuft loyalty −1, "Tuft will not touch it") | `'left'`.
- `b3_c4_gathering` = 1: the cold night, the dust, the howling; the child gone from the camp with Kruppe and two women marines (never the squad).
- `b3_c4_heart` = 1: the dragon seen coming down far off over the camp's heart; at dawn the word that Anaster is taken and his women dead, Whiskeyjack there. Headline only.
- `b3_c4_founders` = `'seen'` (the Fourth looked into the pit under the Thrall) | `'heard'`.
- `b3_c4_mosk` = `'talked'` | `'fought'` | `'let'` (the Fourth looked away; four of the Ninth taken by the Rhivi to the provosts; trust −2, dread +2; Whiskeyjack knows which sergeant).
- `b3_c4_broke` = 1; counts `b3_c4_spared`, `b3_c4_sat`, `b3_c4_starvedDead` (starving dead on the Fourth's stretch; 0 is the good night).
- `b3_c4_sarn` = `'grey'` (Sarn joins the Grey Swords; her boy Tibb carries water for the company) | `'camp'`. `b3_c4_tibb` = `'ohl'` | `'sung'` (who helped the boy).
- `b3_c4_ohlBurnt` = 1: Ohl reached into Denul across the stakes and the poisoned warren bit him (nosebleed, "rust"); he wrote it down.
- `b3_c4_leg` = 1 (the sergeant's quest: Ohl offered; "Mallet's wanted a week since Darujhistan"; Whiskeyjack: "I'll wait my turn", and at dawn "Later"). `b3_legSeen` = 1.
- `b3_tav` = 1, `b3_c4_tav` = 1 (Tav feeding children through the stakes, singing badly), `b3_c4_tavDawn`.
- `b3_karnadasHeard` = 1 (the healers' story of the Destriant eaten by his warren).
- Shared set on entry: `b3_capustan`, `b3_greyswords`, `b3_domin` = 1.

## Flags read from earlier chapters (defaults)

- `b3_dannetMet` / `b3_c3_key` (Ch3): how Dannet is met. Unset → she is new; `'field'` → the acolyte with water on the field; `'camps'` → the one who went into the Camps with the squad.
- `b3_dannetDone` / `b3_sohraDone`: recruit status (the engine's); Sohra is assumed to be in the squad on a fresh start.
- `b3Was('c7_letter')` on imports: Tav's letter still sealed if unset (otherwise "four coppers").
- `b3_hurtMost` (engine, from `def.hurtMost` on the hunt): who receives the rope-and-hooks in the text.

## Named inventions

- **Sarn** (a Domin farmer's widow from a village south of the Catlin; cropped hair) and her boy **Tibb** (eight, the flux).
- **Corporal Mosk** of the Ninth Company, heavy infantry, who walked through the city with the burial details and wants to "thin" the prisoners.
- **Ambrel**, the Grey Swords' rope-sergeant: old, bald, two fingers gone from the left hand, Genabaris dock Daru; he was on Itkovian's patrol before the siege ("killed eleven of us").
- The quartermaster's clerk at the ration cart; a young Rhivi rider on the outer line whose mother is the Mhybe's cousin; an old Capan healer on Burn's temple steps.
- **The Wolves' Rope**: the Grey Swords' name for the hook-and-rope method (in winter it "had the boar's name").

## Engine additions (all in 64, guarded by `b3On()` and per-fight def flags)

- `atkCalc` wrap: the Wolves' Rope's AC and to-hit penalties (`t.b3RopeUntil`, `b3RopeAc`, `b3RopeHit`).
- `attack` wrap: the flint's +3 damage against `kind === 'khell'`.
- `attack`/`blast`/`hurt`/`checkEnd` wraps for `def.b3Spare` (the breakout's sparing rules, above).
- `abOk` wrap for `def.b3Fists` (no munitions in the brawl).
- `BTUNE` entries for `b3_c4_hunt`, `b3_c4_hunt:2`, `b3_c4_breakout`, `b3_c4_breakout:2`, `b3_c4_brawl` (tuned with `tools/balance.mjs` and a scratch patch: a level-5 squad of six, Sohra in, Dannet waiting).
- Two glossary lines pushed to `GLOSSX.moi` (the Gathering, the First Founders).

## Left open on purpose

- Whether the T'lan Imass on the rise left the flint blade for the squad. It was "not there a moment ago". Never explained.
- Whatever Tuft feels under the Thrall ("awake… very old, very angry, very glad").
- Dannet's wolves dream: "two of them, a long way apart, looking the same way" after "a sick-looking Malazan captain" talked with the new Destriant. Tuft guesses Paran and doesn't say it.

## Canon points I was unsure of

- **Timing.** The game puts the Gathering's cold night, the hunt and Anaster's arrest across one night and the next dawn. In the book they all fall in the days after the relief, but their exact order is not on any page read.
- **The K'ell Hunter straggler** is invented (moi-canon Ch4 re-check: no page says one was loose near Capustan after the relief), modelled on Itkovian's patrol.
- **Feeding the prisoners.** The allies feed "a handful a head" and it is not enough. No page says so either way.
- The Grey Swords recruiting Tenescowri at the barracks this early (canon: recruited and trained on the road to Coral) is moved forward a few days.
- The new Destriant stays unnamed (canon: unnamed in what was read).
- "The Shield Anvil said" (that the Imass fight the lizards, never us) is Dannet's second-hand report of Itkovian's patrol, invented.

## Balance (tools/balance.mjs, scratch patch, level-5 squad of six with Sohra, trust 7)

- Soldier, smart policy: hunt 100% (0 downs), breakout 100% (0.1 downs, 1.8 munitions), brawl 100%. Naive (enemy AI driving the squad): all won, the hunt with 0.5–1.5 downs.
- Bridgeburner, smart: breakout about 75% (2 downs a fight), the hunt 100% with the final stage-2 numbers (a harsher stage 2, +1 damage and ×1.15 health, fell to 38–50%, so it was eased). The breakout is the chapter's hard fight.

