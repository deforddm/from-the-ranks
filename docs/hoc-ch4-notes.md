Wed Oct 21, 2026, 3:49 AM PDT. Book Four, Chapter 4, "Leoman's Raids" (`src/74_b4_ch4.js`, art `src/74b_b4_ch4_art.js`), against v7.0.0 on `book4` (not shipped).

# Chapter 4 notes: Leoman's Raids

The first weeks of the march north of the Vathar (HoC ch 18–19): the noon halt in the hottest sun (the boy with the bone walking beside the 8th's wagons, far off), the oil raid on the camp at dusk, the camp after it, the days of raids, the Seti ambushed in a gorge, the Seti wounded in the middle of the camp, the barrow night (the key), and the morning.

## Shape

- **Areas (4):** `b4_c4_column` (the noon halt by day, ground `b4_c4_camp`), `b4_c4_camp` (the ring of wagons at night after the raid, `b4_c4_camp`, dark), `b4_c4_seti` (the Seti wounded camp at night, `b4_c4_camp`, dark), `b4_c4_hills` (the far end of the 9th's picket line on the barrow hills, fog, `b4_c4_hills`, dark; the `picket` road only). The noon halt, the raid, the ambush and the morning are backdrop nodes.
- **Nodes:** 73 `b4_c4_*` dialogue nodes (deck and card included).
- **Phases:** `S.f.b4_c4_ph` 1 the noon halt, 2 the raid and the camp after it (set at dusk), 3 the Seti wounded (set by the ambush), 4 the barrow night (set when Radde gives the orders), 5 the morning.
- **The reading and the fire** are at the wounded Seti's fire (`READTABLE['hoc:4']`): `b4DeckChoice(4)` on the arrival node `b4_c4_seti_arrive` and at the fire. The noon halt and the raid camp come first, as the novel's order does (ch 18 before ch 19); the reading place is the Seti fire, as the brief fixes it.
- **The fire** `b4_c4_setifire` (id kept for the games pass): `again:` line (before and after the key); a rest (once); the squad's talk (`b4_c4_setifire_talk`, one line per squadmate present, two sets: before and after the orders; Orvas, Ramin, Keth and Hackle guarded); `b4Offers()` swaps; the pipe (`b4PipeChoice`); the way on (the lancers first, then "Find Radde. The night's orders.", then on `seti` the small hours and the morning) with "Not now".
- Every onward step has "Not now" (or "Not yet"/"Give me a moment"); the way back from an area's edge is "Not that way".

## The key `b4_c4_key`

Chosen with Radde at the Seti fire on the barrow night (`b4_c4_key`; "Give me a moment" declines). The marines are going out to the hills with the barrows (camp talk, the Adjunct's orders, "what for, the marines know"); the 9th's pickets go out along the hills, set by the Fist, too far apart; the captain wants a squad on the Seti wounded.

- **`seti`**: stay with the Seti wounded, the riders' bait. `S.f.b4_setiSaved = 1`; Nerve +1 ("the Chain squad stayed with the Seti"); Marrow +2, Hessa +1. The far end of the line goes to "the squad next along" (another squad of the Second Company, unnamed, "a good corporal"). In the small hours the riders who left the wounded in the gorge come back for the camp. Key fight `b4_c4_wounded`: a hold-out, four rounds (objective `survive`, not `lastStand`), waves at rounds 2, 3 and 4, a wounded Seti archer beside the squad; then stage 2 *The rush* (clear the field) with two more Seti archers who got up to fight. None of the wounded under the awnings was taken; the old cutter: "The Seti will remember the Chain squad."
- **`picket`**: the far end of the 9th's picket line on the barrow hills, "nowhere near the marines, nowhere near anything". `S.f.b4_setiSaved = 0`; Nerve +1; Tebbet +1 ("a long way off"), Marrow −1 (she leaves the wounded; *Claude's call*); Radde makes a mark the Third has not seen (`S.f.b4_c4_raddeMark = 1`). The fog comes up; the marines' munitions are heard from the other end of the line. Raiders who came round the marines' trap come at the picket on foot. Key fight `b4_c4_picket`: `def.dust = 1` for fog (the fight's log says fog, not dust: see the engine additions), `def.company`, stage 2 *The barrow's lee*. In the morning Blistig asks which squad held the far end: `S.f.b4_blistigNoticed = 1` (Ch6: the squad is given the flank pickets). The wounded camp, held by the squad next along, lost some of its wounded (one line: "did not see the morning").
- **Read later:** Ch6 (`b4_blistigNoticed`: posted to the flank pickets by name; `b4_setiSaved`: a Seti archer stands the picket with them) and Ch7.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b4_c4_key` | `seti` / `picket` | the key |
| `b4_setiSaved` | 1 / 0 | the Third held the Seti wounded camp (`seti`) |
| `b4_blistigNoticed` | 1 | Blistig heard which squad held the far end (`picket`; set at the morning) |
| `b4_leoman` | 1 | the oil raid (glossary), set when the raid begins |
| `b4_chains` | 1 | a Chains card drawn at the Seti fire (the pool has none; set only if a later card effect lands one) |
| `b4_c4_muni` | `saved` / `lost` / `left` | the 9th's spare munitions in the burning wagon (saved: +1 sharper, +1 burner, Tangle +1) |
| `b4_c4_recTold` | `walk` / `leave` | the recruits at the noon halt about the boy (walk: Nerve +1; leave: Marrow +1, Haddat +1) |
| `b4_c4_campTold` | `held` / `true` | the recruits after the raid (true: Haddat +1) |
| `b4_c4_called` | 1 | the squad called after the Seti lancers at noon (the jackal-tail lancer remembers the face) |
| `b4_c4_carried` | `all` / `some` | the wounded in the open got under the wagons (all: Nerve +1, Marrow +1, Hessa +1) |
| `b4_c4_lancersDone`, `b4_c4_lancersHow` | 1; `talked` / `fought` | the young lancers' grudge (talked: Haddat +1) |
| `b4_c4_setibow` / `b4_c4_shot` | 1; `hit` / `miss` | the Seti archer's bow given (Tebbet +1 on a hit) |
| `b4_c4_salve`, `b4_c4_lamp`, `b4_c4_helm` | 1 | the salve, the unbroken lamp, the helm taken |
| `b4_lampballThrown` | 1 | the unbroken lamp has been thrown (once a book) |
| `b4_c4_raddeMark` | 1 | Radde's new mark against the Third (`picket`) |
| `b4_c4_holletRead` | 1 | the sergeant said they would read Hollet's oil note |
| `b4_c4_wagonsDone`, `b4_c4_woundedDone`, `b4_c4_picketDone`, `b4_c4_ambush`, `b4_c4_morning`, `b4_c4_ashes`, `b4_c4_bolaTried`, `b4_c4_lanternLit`, `b4_c4_rest`, `b4_c4_passed`, `b4_c4_orders` | 1 | done / seen |

**Flags read from earlier chapters, with defaults:** `b4_carried` (Ch3; one line of the intro and Haddat's line at the fire, either way or neither), `b4_news` (Ch2; the recruits at noon), `b4_bone` (Ch1; the cutter sees what is tied to the bones), and Orvas's regard from the ford, `S.loy.orvas >= 2` (Ch3's `carry` gives +2): with Orvas walking, he speaks for the Third at the lancers' fire (edge +3 instead of +2, and a line about the river), at the key and at the fire. From the transfer: `b2_hackleBack`.

## Nerve in this chapter

The raid −1 (always); the Seti ambush −1 (always); a Fist down in the night −1 (always, at the morning); the key +1 (either). Optional: the recruits at noon told "he can walk it, so can you" +1; the wounded carried in from the open +1; each clean company fight +1 (engine: the wagons, the picket). A middling path is −1 to +1; the least is −2, the most generous +2 (the test's `seti` path ends at Nerve 6 from 5).

## Inventions (Claude's calls)

- **The noon halt** and the Adjunct's noon rest; **Hollet's straw hat**, sent to the 8th "for the boy, from the 9th"; the 9th's eighty jars of lamp-oil (Hollet's count).
- **The 9th's spare munitions wagon** beside a burning one, and Tangle going in for it.
- **The ring of wagons** on the raid night ("the Adjunct wants the camp in a ring of wagons, foot inside it, horse inside that").
- **The Seti on the march**: a troop of young lancers at noon; **the jackal-tail lancers**, one society of young lancers with a jackal's tail under the lance-blade (the society is unnamed; Seti societies are named for animals in canon, and this is only a mark); **the old Seti cutter** with grey braids (the salve); **the Seti archer with the bound left hand**, a scar through one eyebrow, her mother's horn bow (the bow). All unnamed. Ch6's archer on `b4_setiSaved` can be her or another; nothing fixes it.
- **The wounded camp** inside the 9th's wagons under awnings of canvas off the burnt wagons, propped on lances; the Second Company told to see to it.
- **The squad next along**: another squad of the Second Company, unnamed (never a marine squad, never numbered: the 4th, 5th, 6th and 9th squads are canon marines), with "a good corporal", that takes whichever post the Third does not.
- **The picket's lantern** on a spear, the freckled recruit's first kill on the barrow's stone (`picket`).
- Items: `b4_c4_lampball` (trinket; once a book, whoever carries it throws it: 1d6 + the level step on the mark, the oil burns a 3×3 for 3 rounds; then it is gone), `b4_c4_setibow` (weapon for Tebbet, Sathi or the sergeant: +1 to hit, +1 range), `b4_c4_helm` (trinket, +1 armour: "the marines' spare"), `b4_c4_salve` (trinket, its own effect: the first heal its carrier takes in a fight heals +2).
- The trick **The Oil Bola** (`b4_c4_bola`, ✦ wits 16 at the burnt wagons, taking a dud lamp to pieces; Tangle +3, Sathi +1, Orvas +1, Darrut +1, Haddat −1, Marrow −1): once a fight, throw within 4; it bursts on the mark (1d6) and the oil burns round it for 2 rounds, 1d6 + the level step to anyone who starts a turn there, the squad included. Not sorcery. **Tuned from the brief's 2×2 to a 3×3**, so that what burns is what the throw's aim marker shows (the engine draws an area's marker as a square round its centre).

## Canon as written

- The epigraph of ch 19 (Keneb's journals): in the first week of the march the boy refused a wagon and walked in the year's hottest sun. Seen far off, "the boy with the bone, the captain of the 8th's boy"; never named, nothing to come.
- The oil raid: about two hundred riders, clay lamps of oil on cords thrown like bolas, a dozen wagons burning ("at least a dozen", W *Leoman*), the horse drawn off after them ("they wanted the horse to go"). Whose horse is open in canon: the text says "the column's horse", "half of it", never the Seti or the Wickans by name.
- The Seti ambush: the Seti went after riders into a gorge; more than three hundred dead; many wounded left for the Malazans to carry (R19, the game's reading). The Adjunct's "Wounded Malazans are better than dead ones", once, through Hollet, as an officer of the 10th heard it.
- The Wickans guarded the wagons and kept clear of the ambush (W *Temul*, R19): Keth's and the grandmother's lines only.
- The barrow night: the marines go out to the barrows with crates (heard of); the pickets were set too far apart (R19); the marines' munitions heard from the far end of the line; in the morning empty helms on the barrows, "eight hundred of them, the 8th says". Fist Gamet rode to an overrun picket at the marines' end in fog, a munition killed his horse, two marines of the 8th pulled him out (Gesler and Pella, never named), legs cut, "not right in the head", gave up his legion; Keneb acting Fist. All camp talk in the morning.
- `b4_leoman` set; Leoman is named only as the army's belief ("a war leader of Sha'ik's"), never seen. The riders are never Leoman or Corabb; no one in the squad meets either.
- Never: the scorpion contest, the barrow trap seen, Gamet's ride or rescue, Dassem. No Burn's Sleep year, no never-use names, never "Bonehunters", "3rd Company" or "Dancer's Tavern".

## Left open on purpose

- What the marines were baiting (Radde: "what for, the marines know").
- The names of the Seti archer and the old cutter; which society the jackal-tail lancers are.
- Whether the riders at the wounded camp came from the same band as the gorge (the camp believes so).

## Canon points I was unsure of

- **The order of ch 18 and ch 19 in days**: written as the raid one night, then "the days go on like that", then the ambush, then the barrow night the same evening the wounded come in. The canon sheet gives the events, not their days.
- **Where the wounded camp was** and who guarded it on the barrow night: an invention (canon has wounded left for the Malazans; nothing on a camp).
- **The fog**: canon has fog for Gamet's ride; written as fog over the whole line of hills that night.
- **"Eight hundred"** is R19's count of the rebels at the barrows, used only as the 8th's boast.
- **Gamet named in camp talk** ("Fist Gamet of the 8th"): the squad may hear it (hoc-canon §3); earlier chapters did not name him in this way.
- **Temul's age** is left out (Keth's grandmother says "a boy, and right").

## Engine additions in this file (all guarded by `b4On()`)

- The Oil Bola: `AB.t_b4_c4_bola` (an area ability on the burner's pattern; `blast` resumes the turn); oil tiles are `B.fires` entries with `b4oil` and the words "the lamp-oil"; the level step is added by a `blog` wrapper (it notices the engine's "is caught in the lamp-oil" line) and a `hurt` wrapper (the next blow after it).
- The unbroken lamp: `AB.b4_c4_lampball` (once a book, `S.f.b4_lampballThrown`; the item leaves the kit and the gear when thrown), offered by a `mkParty` wrapper to whoever carries it.
- The raiders' lamp-throwers set a squadmate alight on a hit (`foeRiders` wrapper: `burnTurns`).
- The horse-salve: a `heal` wrapper (+2 on the carrier's first heal of a fight).
- The raid's first ground burns from round 1 (a `startBattle` wrapper puts long-lived fire tiles round the wagons).
- Fog: a fight with `def.b4fog` (the picket) has its Dust lines rewritten as fog by the `blog` wrapper (the start line, and the sputter lines).
- `mkAlly` for `b4_c4_setiwounded` (the wounded Seti archers at the squad's level, as Ch3's riders).
- In 74b: `drawFeature` draws low cover as crates and a saddle in the camp and as a low mound in the hills; the camp's `'#'` is a wagon of the ring on the map and a wagon (burning in the raid) in a fight; and a `drawFireAt` wrapper stops the barrow hills' `'B'` being animated as a bonfire (30 animates every `'B'` in a dark area as Book One's bonfire).

## Fights (base xp; the game pays ×0.6)

| Fight | Where | xp | Notes |
|---|---|---|---|
| `b4_c4_wagons` | the 9th's wagon line | 200 + 100 | `company`; objective survive 4 among burning wagons; waves at rounds 2 and 3; stage 2 *The horse lines*; Tangle's sharper; Might 15 for the munitions wagon first |
| `b4_c4_lancers_brawl` | the Seti horse lines | 140 | objective survive 4, "lance-butts and fists"; a wave at round 2; avoidable by Guile 15 (Orvas +2, +3 with his regard; Sathi +2) |
| `b4_c4_wounded` (`seti`) | the wounded camp | 160 + 100 | objective survive 4 (waves at rounds 2, 3, 4), a wounded Seti archer ally; stage 2 *The rush* with two; Wits 15 to meet them in the dark |
| `b4_c4_picket` (`picket`) | the far end of the line | 160 + 100 | `company`; `dust:1` as fog; a wave at round 3; stage 2 *The barrow's lee*; Wits 15 along the barrow |

A playthrough fights two or three (wagons, the lancers or not, one key fight): 700 base (420 paid) with the brawl, 560 (336) without, plus the clean checks' 10 each; level 11 → 12 either way. The wagon line pays 200 and the stage 2 grounds 100 (Ch3's were 160 and 80) so that talking the lancers down still reaches 12: the first bot runs, at Ch3's numbers, talked them down and stopped just short.

**Balance** (`tools/balance.mjs`, a scratch `--patch` putting each fight in a fresh Book Four state at Chapter 4: level 11, Nerve 5, a card from `B4POOL[4]`, Orvas in the squad; B4GAP and every rule unchanged; 12 smart runs, 4 naive):
- **Soldier, level 11:** wagons 100% (21% health lost, 0.58 downs), lancers 100% (13%), wounded 100% (17%), picket 100% (19%). Naive: 100%, 100%, 75%, 100% (34–72% lost).
- **Bridgeburner, level 11:** wagons 100% (58% lost, 3.3 downs), lancers 100% (21%), wounded 83% (65%), picket 92% (64%).
- For David (step 14): Soldier comfortable, as Ch3; Bridgeburner hard in the three main fights, a little easier than the 75–80% target; the lancers' brawl is light on both (it is a brawl). Nothing was changed in any rule.

## Tests

- `tools/b4ch4_test.mjs`: a fresh start at level 11 through the noon halt (the boy, the Nerve widget, the recruits, the lancers' "yes, but", Hollet's hat), the raid (Nerve −1, `b4_leoman`, the munitions wagon), the wagon line (company, burning tiles, both grounds, Nerve +1), the camp after (the lamp, the trick), the ambush (Nerve −1), the wounded camp (the Deck, the one Barrow line, the fire: again, rest, talk a line each, the way on, Not now), the wounded carried in, the salve, the bow, the Adjunct's word, the lancers (talked and fought), both keys and both key fights (both grounds each) to the chapter's end at level 12; the trick, the lamp and the salve in a fight; then a transfer on the Aren Guard road with Sathi alive (Hackle in the fights), Ramin walking and Orvas near with his regard: the swap at the Seti fire, the regard read, no Barrow line.
