# Book Three, *The Fair Exchange*: continuity pass

Tue Oct 13, 2026, 5:25 PM PDT. One editor read the seven chapters (written at the same time by seven writers) as one book and fixed the seams. Only `src/61_b3_ch1.js` … `src/67_b3_ch7.js` and the `moi-chK-notes` files changed. Every fix is the smallest edit that works; each writer's voice is kept.

## 1. Flags

Every flag one chapter reads from another is written under that name and value: `b3_c1_key` (Ch2, Ch7), `b3_c2_key`, `b3_c3_key` (Ch4, Ch7), `b3_c4_key`, `b3_c5_key === 'quiet'` (Ch6), `b3_c6_key` / `b3_flew` / `b3_river` (Ch7), `b3_kallorSaw` (Ch1), `b3_kallorEnemy` (Ch5), `b3_wjNoticed` (Ch4), `b3_mhybe`, `b3_treach`, `b3_rake`, `b3_karnadasHeard`, `b3_khell`, `b3_dannetDone` / `b3_sohraDone` (the engine's `b3Join`). Lint's three "read but never written" names are false alarms: `b3_c4_drawn` is written by 60c as `` S.f[`b3_c${n}_drawn`] ``, `b3_sohraDone` by 60's `B3_DONE`, `b3_c` is a comment.

Fixed:
- **`b3_kallor` for `--from=5` starts.** Ch5 names Kallor freely and Ch6 reads `b3_kallor` to decide between "Kallor" and "the tall man in the fur-collared cloak". In a full play Ch1's parley always sets it, but a `--from=5` start did not. Ch5's first node now sets it.
- **`b3_herdMother`.** Ch2 sets it only on `herd`, when Sohra first calls the sergeant "herd-mother". Ch4, Ch6 and Ch7 used the word to the sergeant on every road. Those lines now read the flag and say "Sergeant" without it. Ch6's truth at the river (where Sohra says "Herd-mother." as a turning point) now sets it. The endings' "I have a herd-mother now" stay as they are: that is where she arrives.
- **Ch6's Korlat flag paid off.** Ch6 sets `b3_c6_korlat` (Korlat asks the sergeant to tell her if Whiskeyjack falls behind). Ch7's Korlat now answers it in two lines on the river road.

## 2. Facts that differed

- **The Mhybe (the biggest seam).** Canon (moi-canon "Chapter 5 re-check", [H]): Coll and Murillio take the Mhybe back toward Capustan before the Catlin crossing; she ends asleep in the dream her daughter made, with the two Daru tending her; Silverfox stays with the army. Ch3–Ch5 had it right. **Ch7 had her at Coral**: on a litter on the alliance's hill as a talking NPC, "on the plain, with Brood" on the lift road, carried by the Rhivi on the river road, and two Daru men by her litter on the shore. Fixed in Ch7: the hill NPC is now an old Rhivi woman, a cousin of the Mhybe's, who carries the Mhybe's words south from a rider out of Capustan (the scene's lines, Sohra's "Yes, Mother", the night-watch callback and the laugh all kept, as the Mhybe's message); Sohra on the lift road feels her "a long way north, in Capustan, with the two Daru"; the river road's news comes "from Capustan"; the shore's "She sleeps" is "in Capustan, a long way north"; the Rhivi on the shore sing one song north instead of sitting by a litter; the finale's "with her people" page says she sang north to her.
- **Silverfox's apparent age.** Ch1 about ten; Ch2 the age before all the others; Ch3 older again; Ch5 "taller than the Mhybe was at the turn of the year" (now "as tall as a grown woman now": the Mhybe at Pale was already old and stooped, so the old comparison read backwards); Ch7 "perhaps fifteen, perhaps more". It now grows in order. Ch7's "not two years born" is "not a year born" (born at the Fete, the parley a season later).
- **Whiskeyjack's leg.** Ch1 "after this parley" → Ch2 "Later" → Ch3 "After Capustan" → Ch4 "I'll wait my turn" / "Later" → Ch5 "after Coral" → Ch6 and Ch7 "after Coral", never healed. The one break: Ch5 had "Mallet can have a month" when every other chapter keeps "Mallet's week". Now "his week". Ch5's "Mallet wants a week... since Darujhistan" duplicated Ch4's words nearly exactly; Ch5's now opens "Mallet's not here to ask" (he is ahead with the Bridgeburners).
- **Tav.** Consistent: corporal, Fourth Regiment of the Second, heavy infantry; with the wagons (Ch2), on the field line (Ch3), at the stakes (Ch4), on the water cart (Ch5); his company goes by quorl on both roads in Ch6; in the entrenchments and the front companies behind the Bridgeburners in Ch7. One fix: Ch7's river road had Brisk "on the bank" watching the quorls leave after the Maurik. In Ch6 she said goodbye on the lift field, before the Maurik, without turning round. Ch7 now says she turned her back on the lift field.
- **Sohra and Dannet joining.** Ch1 `mhybe`: Sohra joins at the key. Ch1 `crate`: she does not; Ch2's start joins her with the sour "boxes" line. Dannet: met in Ch3 on both roads, joins (or waits) in Ch4. No chapter contradicts this.
- **Hurlochel.** Ch2, Ch3 and Ch6 call him once Brood's, now the Host's; Ch5 calls him "one of the Host's outriders, Dujek's own". These don't conflict, so no change.
- **Kallor's naming.** The fur-collared cloak until Ch1's parley names him (always in a full play); Ch2 and Ch6 read `b3_kallor` through their helpers; Ch5 now sets it (above).
- **Kallor's look at the sergeant.** Ch6 and Ch7 both had him open with "I know you". Ch6's is now "I have seen you before. Haven't I." so that Ch7's "I know you" (which places the face) lands as the step up. Ch7's "Malazans, the way some people say *flies*" repeated Ch1's Sarhul ("the way you'd say *fish*"); Ch7's now stops on the one word.
- **The Ch5 well.** Ch7 called it "a well on the Catlin road" twice (Hurlochel, Kallor). Ch3 uses "the Catlin road" for the road *north* of Capustan. Now "south of the Catlin".
- **Ohl's list (`b3_listAdds`).** Ch5 +1 (Orley). Ch7 counted the hill's three only if the player talked to Hurlochel on the lift road, never counted Twist though Ohl says he wrote him down, and could count the hill or Hurlochel's word twice on a second visit. Now: +3 from the hill or Hurlochel, else at the burial; +1 for Twist at the burial; guards on all three. Ch7's finale also had Ohl "started calling you *child*"; he has called the sergeant "child" since Ch1, so now he "still" does.
- **Maud.** Ch3 can spend Kettle's cusser (Maud) at the barricade, or know Maud went home to the Moranth on an import. Ch7 always called the cusser Maud and could say "Maud's still in the satchel" with none left. It also keyed a "Gerrun" name off `c1_cusserSold`, which the import never carries. Ch7 now uses 60's rule (a new cusser keeps the name Maud; on a "Maud went home" import she has taken to calling the Host's cusser Little Maud) and says Maud went earlier when the satchel is empty.
- **Dannet's question.** Ch7: "I asked you once whether the Wolves were a god or a grief with teeth. At Coral, I said." No chapter has her ask that. Ch3 has "When I know what the wolves are, I'll tell you", so Ch7 now says "I said I would tell you what the Wolves were, when I knew."
- **Silverfox's absence in Ch6.** Tuft: "She isn't there. Not since the river." But Ch5 shows the child at the Rhivi fires south of the Catlin. Now "Not for two nights."
- **Invented names.** Sarhul, Pell, Sennet, the Boles, Ambrel, Mosk, Sarn, Tibb, Orley, Oskan, Square, Old Benna: no two characters share a name, and no character has two. No Liss, Straw, Story or Cage; no Fist named; no army number.
- **Mott Irregulars, Trake/Treach.** Consistent: the Bole brothers; "Trake's Legion" and "Trake's temple"/Rath'Trake for the Capan name, Treach for the god. **Artanthos** is never named in game text ("the standard bearer" throughout; Tuft goes still).

## 3. Repetition trimmed

- "Was young at the turn of the year" (the Mhybe): Ch1's journal, the Mhybe herself and Sohra in Ch2, the Ch3 rider's bull, and Sohra again in Ch4 and Ch5. Ch2 and Ch3 keep it. Ch4's Sohra now remembers the calving song "this spring". Ch5's says "At Pale she could still sit a horse". Ch7's new text drops it.
- Ch1 used "longer than the Empire has had a name" twice for Kallor; the second is now "since before there were Malazans to write in it". Brood's line in Ch5 keeps it.
- The Mott: Ch2's Bole repeated Ch1's "year and a half… never caught one of us" joke. His line now points at the Bridgeburners' faces instead. "What's she counting?" (the brother is a man) is now "he".
- Ch6's quorls were "a sound like a sail filling", which is Ch3's dragon. Ch6 now has wind in a great deal of canvas.
- Ch5 and Ch6 both had Whiskeyjack sit "the way a man sits when standing has…". Ch6 now has the leg out straight.
- Kept on purpose as the brief's recurring bits (once or so a chapter, building to Ch7): Tav can't sing; "four coppers"; "Don't stand in front of things" (Book One's letter line, paid off in Ch7's Brisk page); "watch the Malazans"; "a slow herd"; Tuft going still; "In order, without anything in it that isn't so" (Book One's report formula); the grey going out of the air when a Seerdomin falls.

## 4. Squad absence

Lint's REVIEW list for Book Three: every entry is a node reached only with that squadmate present, or a deliberate absent branch ("because Ohl would have"; "the way Ohl used to"). One fix: Ch4's "six days' bread for six" (four times) assumed six in the squad; it now counts the squad.

## 5. Canon

- "High Fist, it is a fair exchange.": exactly once, Ch7 `b3_c7_qb`. The journal paraphrases ("called it a fair exchange") are not the quote.
- Whiskeyjack dies on the alliance's hill outside Coral, of the leg, to Kallor. The squad is too far. "A marine of the Host, nobody you know" wounds Kallor; the two women guarding the child are not the Fourth. The Bridgeburners go into the keep; the Fourth fight in the streets and on "the keep road", never inside. Itkovian's end and the barrow are headline only.

## Left open on purpose

- **Ch5's drowned mage.** The brief and moi-canon §1.7 put "Malazan mages drown an enemy mage" on the march. Ch6's re-check (W23) makes that Shank's deed at the entrenchments above Coral. Ch5 keeps an invented, unnamed cadre drowning at an invented ford, seen from the bank. It is not the squad's deed. If the owner prefers canon's placing, Ch5 can change the drowned man to a Pannion mage killed some other way.
- **Four coppers after Ch2 `wagons`.** There Tav tries to pay and Brisk pushes the coins back ("Not yet. Not for this."). Ch6 and Ch7 go on with "he still won't pay". That reads as the old game resumed, so it is left.
- **Ohl's offers** vary (a night, five days, three days, a week): each is his guess on the day, and none heals the leg.
- **Ohl's list and the legion** (Ch7 lift): the legion's fourteen dead count as one entry.
- **Whiskeyjack calls Ohl "Ehrlii"** in Ch6, as a nickname from his people's name. Left.

## v6.10.0 (Oct 18, 2026): the K'ell Hunter, and a rope man

- `FOES.b3_khell` and `b3_c4_roped` are what the books say: two blade-arms a turn (`attacks:2`), reach, a parry a round, `dr:5` (a hide that takes 5 off every ordinary blow; a critical goes through), `resist:{sharper:.5}`, `weak:{cusser:1.5}`. The roped one has 60 health. Any later chapter that places a Hunter inherits this; place one only where the squad has ropes, cussers, or allies, and say so in the text.
- Engine hooks (31): `u.dr` on blows in `attack()`; `u.resist` / `u.weak` by munition name in `blast()`, read from `B.blastKind` (set by `useAb` from the ability's item; the quorl counts as a sharper). The opening sharper of a fight (`opt.pre`) honours `resist.sharper` too.
- **Vell** (an import from Book One) in Chapter 4: the rope-sergeant Ambrel sees the Guild line on his shoulder (`b3_c4_ambrel`); Vell has a +3 edge on the Wolves' Rope check; at the gully mouth the first rope is his (`b3_c4_hunt_find`); in the hunt's first ground his grapple on the Hunter does not haul it but ropes it for a round (`S.f.b3_c4_vellRope` counts the throws; the gully's roped Hunter is still too heavy to haul); after, the coil goes into his hands, Ambrel's word depends on `b3_c4_vellRope`, and Vell gains 1 loyalty. The chapter recap names his rope. Later chapters may read `b3_c4_vellRope` (he "carries two" ropes from then on).
- Ambrel always says, in the yard, that sharpers won't do it and a cusser under it when it is held will: the player is told the rule in the world.
