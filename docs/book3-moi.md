# Book Three: *The Fair Exchange* — shipped as v6.0.0

Tue Oct 13, 2026, 7:51 PM PDT. Live at https://deforddm.github.io/from-the-ranks/ (commit 2b670fa; the live sw.js serves `ftr-v6.0.0`). Full suite 34/34. Three bots played the book from Chapter 1 to the finale on the final build, all OK, reaching level 8.

## What's in it

Beside *Memories of Ice*. The Fourth again (Book One's squad, IV patch), marching with Onearm's Host and Caladan Brood's army from the parley at Pale to Coral. Plays on its own; a finished Book One on the outlaw road can bring its Fourth across.

| Ch | Title | Key choice | Trick ✦ | Vision (through the Deck) |
|---|---|---|---|---|
| 1 | The Parley | `mhybe` (watch the Mhybe's tent) / `crate` (Moranth munitions train) | The Herd-Call | Gruntle at Saltoan |
| 2 | The Rhivi Plain | `herd` / `wagons` in the flash flood | Moranth Hand-Talk | Itkovian roping a K'ell Hunter |
| 3 | Capustan | `field` (hold the line) / `camps` (into the city) | Treach's Stripe | Picker on a Capustan roof |
| 4 | The Prisoners | `share` / `hold` the squad's rations | The Wolves' Rope | Kruppe at the Second Gathering |
| 5 | South of the Catlin | `brood` (take Kallor's man to Brood) / `quiet` | Barghast Blood-Iron | Korlat at Brood's fire |
| 6 | The Night Lift | `quorl` (fly with Dujek) / `maurik` (stay with Whiskeyjack) | The Boatman's Knot | Rake at Ortnal's Cut |
| 7 | Coral | `host` / `daru` / `standdown` | The Shield Anvil's Weight | Quick Ben on a quorl into Coral |

- Recruits: **Sohra** (Rhivi herd-rider and spirit-singer) and **Dannet** (Capan Grey Sword acolyte). With the full Fourth only one walks at a time; the other waits and can be swapped in at a fire.
- Systems: the Alliance (trust and dread, allies who come when trust is high, dread that shakes the squad), poisoned warrens in the Domin (spells may burn their caster; spirit-craft never does), Treach answers for the sergeant, Mallet's week (Whiskeyjack's leg, never healed).
- Chapter 7 has two roads in (the streets behind the Bridgeburners, or the alliance's hill outside the city). One fight on each road is mortal, signposted. Whiskeyjack's death, Kallor and the two marines follow the canon sheet; the squad is never the marine who wounds Kallor, never in the keep. "High Fist, it is a fair exchange." is quoted once.
- About 2,000 nodes in the game now (Book Three ~620). Every item has artwork.

## How it was built

Seven writer-and-artist pairs, one per chapter, written at once from `docs/moi-book-brief.md`; then a visions pass and a continuity read of the whole book (`docs/moi-continuity.md`). Per-chapter continuity notes: `docs/moi-ch1-notes.md` … `moi-ch7-notes.md`. Engine and shelf: `docs/v6.0-notes.md`. Canon: `docs/moi-canon.md` (with per-chapter re-checks and a Visions section).

Fixes made while merging: Ohl's healing could crash in a fight with no warren set (engine now defaults it); 15 enemies started on walls, trees or water; Corporal Mosk's night scene had no "Not yet"; three fights (Ch2 hill, Ch5 ford and burnt town) softened a notch after the bots needed 10 forced retries (now 3–4, Book Two's level).

## Open questions for David

1. **The drowned mage (Ch5).** The novel's drowning is Shank's, above Coral; Ch5 shows an invented drowning by unnamed cadre mages at a ford. Keep, or move it?
2. **Rake's vision (Ch6)** shows Moon's Spawn low over water at Ortnal's Cut, matching the Knight card's art. Where the Spawn and Rake are during the march isn't on any page read. Keep it vague as it is?
3. **Mortal fights in Ch7** killed two or three squadmates in some bot runs (the bot plays badly; a careful player loses about one in five fights' worth). Is that the weight you want for the book's end?
4. ~~Imports start at level 1.~~ **Settled in v6.1.0:** every Book Three game starts at level 8 (cap 15), and a transfer keeps its gear, kit, picks and tricks.
5. Small inventions to bless or change: Kallor's men in grey and fur, the Ilgres warrior Sarhul, Corporal Mosk, Sarn and Tibb, Oskan the Cawn wright, the Seerdomin's closed-eye tattoo, Silverfox "looking fifteen" at Coral, Kruppe on the shore.

## Files

- itch zip: `from-the-ranks-v6.0.0-itch.zip` (tested inside a frame on another address).
- PC copy: `C:\Users\stone\FromTheRanks` updated (53 files).

## v6.1.0 (Tue Oct 13, 2026, evening)

Every Book Three game starts at level 8, cap 15 (Books One and Two stay at 8). Levels 9–15: +4 health and +1 to hit each; +1 damage at 10 and 13; +1 armour at 12; the role Measure +1 at 12; spells reach further at 11 and 14; a veteran pick at 9, 11, 13 and 15 (new picks Stout, +1 armour, and Edge, +1 damage). A fresh start picks its level 3/5/7 talents on the first talk. A transfer keeps the gear its soldiers wear, the unworn kit, their talents and picks, and the tricks carried by anyone who came across. A recruit who joins late brings her own veteran picks. Enemies carry the six-level gap per chapter (`B3GAP` in src/60_book3.js), tuned on the balance bot so smart-play health lost per chapter matches the old curve within a few points. Test: tools/b3carry_test.mjs.
