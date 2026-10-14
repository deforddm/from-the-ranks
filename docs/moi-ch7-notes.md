# Book Three, Chapter 7 — "Coral" and the end of Book Three: continuity notes

Tue Oct 13, 2026 2:00 PM PDT. File `src/67_b3_ch7.js` (exports `B3CH7`, `B3CH7.finale`; helper object `B3FIN7`). Art in `src/67b_b3_ch7_art.js` (the artist's).

## Two roads in

Read in this order (`b3c7Road()`): `S.f.b3_flew` alone → the lift; `S.f.b3_river` alone → the river; else `S.f.b3_c6_key` `quorl` → lift, `maurik` → river; else the chapter asks at its first node (`b3_c7_start`) and sets `S.f.b3_c7_road` (`flew` | `river`) plus `b3_flew` / `b3_river`. The chapter re-sets `b3_flew` / `b3_river` for its road on its first node.

**The lift** (areas `b3_c7_entrench` on Ch6's `b3_c6_mountain_night` ground, then `b3_c7_coral`): Quick Ben and Dujek over the map; **"High Fist, it is a fair exchange."** (the only verbatim use in the game, node `b3_c7_qb`); Dujek on the leg; Twist and Kettle; Tav (Brisk); the standard bearer (Tuft goes still); a Bridgeburner (never named); Dannet (the trick). Night: the forward trench under the grey sorcery (`b3_c7_trenchfight` 150 + stage2 *The cedar screen* 70; the Seerdomin captain drops the grey mail). Down the mountain behind the Bridgeburners into the streets (never the keep). Optional stair (`b3_c7_stairs` 90, aid Black Moranth need 8). **The square, MORTAL** (`b3_c7_hunt` 180 + *The keep road* 80; a K'ell Hunter and Beklites; aid Black Moranth need 8; drops the K'ell Hunter's blade) or the side street (`b3_c7_side` 150 + *The cistern court* 60, not mortal; the Moranth take the Hunter and pay for it). Moon's Spawn falls on the keep; Hurlochel brings the word from the hill; Brisk finds Tav; out through the breach to the shore.

**The river** (areas `b3_c7_field`, then `b3_c7_hill` at dusk): the alliance's hill, the last morning. Whiskeyjack (the leg, one last time: `b3_c7_wjWord` `after` | `tonight` — a ✦ guile 17 push only gets *tonight*; Ohl may look at it and declines to reach into the poisoned warren); Silverfox and the two marines guarding her (seen, unnamed); the Mhybe (Sohra); Korlat; Kallor (reads `b3_kallorEnemy` / `b3_kallorSaw`); Brood; Itkovian alive (formal, "Sir"; the trick); a Rhivi herd-boy. The probe at the stake line (`b3_c7_probe` 150 + *The gully mouth* 70; aid Andii need 8; grey mail); optional herd gully (`b3_c7_gully` 90, aid Rhivi need 8). Noon: ~800 K'ell Hunters, Trake's Legion becomes the tiger. **The stake line, MORTAL** (`b3_c7_stakes` 180 + *Behind the stakes* 80; aid Grey Swords need 8 and Rhivi need 9; the Hunter's blade) or the herd lines (`b3_c7_herds` 150 + *The children's fire* 60, not mortal). Either way the Fourth are at the foot of the hill and **too far**: they see Kallor go for Korlat, then the tent; Whiskeyjack's leg gives; a marine of the Host (nobody they know) wounds Kallor; the two women guarding the child die; the standard bearer forces Kallor into a tear in the air. The Fourth reach the crest after. Hilltop at dusk: the tent, Korlat wounded, the standard bearer's burned arms, the child, Brood ("I went down the hill"), the Spawn falls, the Grey Swords kneeling in the rain on the plain.

**Both roads** (area `b3_c7_shore`): the armies meet on the shore; Itkovian's barrow (the T'lan Imass's words, then a gift each from every army through the night; the Fourth's gift is a choice: the sergeant's old Second Army whistle, one of Kettle's sharpers, or a polished stone); each squadmate's gift; Dannet finishes the wolf; the burial: Moon's Spawn sent out over the sea with Whiskeyjack, the Bridgeburner dead and Twist; "I have lost a friend." The fire: a last word with each squadmate (Ohl's list, Kettle's count — 31 of 40 quorls back, Brisk and Tav, Tuft and the child, Sohra and the sleeping Mhybe, Dannet and the Wolves, Ellis, Vell, and saying the leg out loud). Dujek, Kruppe, a Black Moranth ("Square"), Silverfox (lift road), the Grey Swords, the Rhivi; recruits waiting with their people can be swapped in (`b3SwapIn`). The Host's lines: the road out.

Total experience about 480–570 per road (the square and the stake line each 260 with their second stages) (more with the optional fight). Every onward step has a "Not yet" (none on the in-flow "Look up" beats after a fight, which do not change zone).

## Key `b3_c7_key` (passed to `chapterEnd(7, key)`)

- **`host`** — stay with Dujek's Host, whatever it is called now; Seven Cities and the year ahead. Loyalty Ohl +1, Brisk +1.
- **`daru`** — back to Darujhistan, the long way; the Fourth stand a door at the **Phoenix Inn** (never K'rul's Bar; the Bridgeburners' bar is only a rumour across the city; no Bridgeburner companions). Tuft +1, Kettle −1.
- **`standdown`** — the sergeant stands the Fourth down on the shore; each to their own road.

The finale (`B3CH7.finale`, read by 37's `showFinale`): road page (per key, with the Alliance's numbers: trust and dread at the end), a page per squadmate in the squad (`fate`), a page for each one not in it (`gone`: fallen at Coral or earlier in Book Three; fallen at Darujhistan in Book One for imports; **Sohra and Dannet "with her people"** whenever either is not walking with the squad), the sergeant ("Mallet's week"), then the coda and "The End of Book Three: *The Fair Exchange*".

## Flags this chapter sets (later books may read)

- `b3_c7_key` `host` | `daru` | `standdown`; `b3_c7_road` `flew` | `river` (only when the chapter had to ask).
- `b3_c7_square` `hunt` | `side` (lift); `b3_c7_hunters` `stakes` | `herds` (river). Mortal deaths are in `S.dead[id]` with `ch: 7`.
- `b3_c7_exchange` (heard Quick Ben), `b3_c7_trenchDone`, `b3_c7_spawn` (saw the Spawn fall), `b3_c7_news` (Hurlochel's word), `b3_c7_saw` (saw Whiskeyjack fall from the foot of the hill), `b3_c7_kallorLook` (Kallor looked at the sergeant on his way out: only if Kallor knew the face — `b3_kallorEnemy` or `b3_kallorSaw` — and the river road), `b3_c7_kallorStare`.
- `b3_c7_wjWord` `after` | `tonight`, `b3_c7_wjPushed`, `b3_c7_afterCoral` (Dujek), `b3_legSeen`.
- `b3_c7_barrow`, `b3_c7_gift` (text), `b3_c7_burial`, `b3_c7_dannetWolves` (the wolf finished), `b3_c7_tavFound` / `b3_c7_stav` (Brisk found Tav), `b3_c7_maud` (Kettle's cusser "Maud" spent), `b3_c7_stairDone`, `b3_c7_gullyDone`.
- `b3_listAdds` +1 (the legion's dead), +3 (the hill), +1 (the barrow) — Ohl's list.
- Trick `b3_c7_anvil` (*The Shield Anvil's Weight*): ✦ wits 16 from Dannet (lift), Itkovian (river) or the Grey Swords on the shore; `b3_c7_anvilTried`, `b3_c7_anvilBy` `dannet` | `itko` | `grey`.

## Flags read from earlier chapters (defaults when unset)

`b3_flew`, `b3_river`, `b3_c6_key` (road; else asked). `b3_kallorEnemy` (Ch5 `brood`) / `b3_kallorSaw` (Ch1 `mhybe`): Kallor knows the sergeant (else contempt, no look). `b3_mhybe` or `b3_c1_key === 'mhybe'`: the Mhybe remembers the night watch. `b3_c2_key` `herd` (the herd-boy remembers the flood) / `wagons` (Tav remembers the wagons). `b3_khell` (the strides on the plain). `b3_c3_key` `field` (Brood names the stretch by the walls) / `camps` (a Grey Sword acolyte from the Camp). `b3_treach` (the striped ones from Capustan). `b3_rake` (the dragon over Capustan). `b3_karnadasHeard` (Ohl on the Destriant). `b3_c4_key === 'share'` (Itkovian: the bread was seen). `b3_wjNoticed` (Whiskeyjack on the rations). `b3_domin` (set on). Recruit state `b3_sohraDone` / `b3_dannetDone` via `b3In` / `b3Waiting`. Imports: `b3Was('c7_letter')` (Brisk's letter sealed or open), `b3Fallen()`.

## Kit

- `b3_c7_greymail` — Seerdomin grey mail (armour, AC 1, HP 2): the first blow on its wearer each fight lands 2 lighter (a guarded wrapper on `hurt`, Book Three only — **an engine addition in this file**). From the trench's captain (lift) or the gully mouth's (river).
- `b3_c7_hunterblade` — a K'ell Hunter's blade (weapon, Sergeant/Brisk/Dannet, 2d6+2). Only from the mortal fight.
- Stand-in item art with `??=` in this file; the artist's file draws the real pictures.

## Other engine touches in this file

`BTUNE` on top of FSCALE: mortal fights `{hp:1.2, atk:+2, dmg:+2}` both stages (plus a second, wounded Hunter in the square at round 4 and Beklites through the stakes at round 3), the main non-mortal fights `{hp:1.4, atk:+3, dmg:+3}`, the optional stair and gully `{hp:1.2, atk:+2, dmg:+2}`. `tools/balance.mjs` (a scratch patch putting it in Book Three with Sohra, level 8, no earlier-chapter gear), 10 smart / 4 naive runs: every fight 100% smart; smart health lost 8–23%; the square 0.2 deaths a fight, the stake line 0–0.25; naive 36–58% health lost; `SCENEX.b3_c7_hill` / `_dusk` stand-ins (`??=`, the artist overrides); three `GLOSSX.moi` rows (Coral, the Shield Anvil, K'ell Hunters at Coral); `B3DECK[7]` (lean card the Gate; Tuft, Sohra or Old Benna reads).

## Inventions and things left open

- **Maud** (Book One's name for Kettle's cusser; **Gerrun** on an import with `c1_cusserSold`): spent in the mortal fight if the player chooses Kettle's cusser option (`b3_c7_maud`).
- "Square": a Moranth word for a debt paid (invented, used twice).
- Tav: lives, the left side of his face marked; he stops singing for a while. He was in the front companies that followed the Bridgeburners in.
- The two marines guarding Silverfox stay unnamed (canon gives no names); Ohl means to find them. The marine who wounds Kallor is "nobody you know".
- The Mhybe sleeps in her daughter's dream (canon); Coll and Murillio sit with her ("the Daru men").
- Silverfox goes over the sea with the Imass (canon); Tuft stays ("I'm the Fourth's").
- Dannet keeps the Fener amulet in her kit ("not yet"); the new Mortal Sword is mentioned, not named.
- Left open: what the Host is called next, and where the `host` road ends (Seven Cities by rumour only).

## Canon points I was unsure of

- **Silverfox's apparent age at Coral**: written as "looks fifteen, perhaps more". Canon has her a young woman by the end; exact age unclear.
- **Who speaks the barrow's first words**: the quotation is canon; giving it to the T'lan Imass is my reading.
- **Hurlochel** is used as the outrider who brings the word from the hill to the city (he is canon-alive; his exact post at Coral is not sourced).
- **Kruppe on the shore**: plausible (the Daru delegation is with Brood) but not sourced for Coral itself.
- How Whiskeyjack's river column joined Brood before Coral, and the distance from the hill to the walls, are not reached; kept vague ("two hours off").
- The K'Chain Che'Malle attack's timing against the Spawn's fall: the game has the Hunters at noon on the river road and the Spawn at dusk; canon order is close but the hours are mine.


## Appendix: the canon re-check for this chapter

Tue Oct 13, 2026, 5:11 AM PDT. A focused re-check for Chapter 7 by its writer. As before, the Reactor re-read pages for ch. 24 and 25 came back with no body text, and the wiki (and its breezewiki mirror) refused or bot-walled most requests. What answered: Rob Hendricks's Kindle highlights on Goodreads (quotations from the novel, with positions), the Goodreads "The Malazan Fallen" chapter 24 and end-of-book threads (readers' summaries), and the Malazan Wiki *Silverfox* page.

**Confirmed or sharpened**
- **The Bridgeburners' orders.** "We're going into Coral. From the night sky, straight down into the damned streets." and "'Understood, High Fist. And the Bridgeburners are the first in, sir?'" [KH 86%]. "'Aye, Captain. So, who do you figure will die first, you or us?'" [KH 87%]. The streets and the keep are theirs; Dujek's army follows into the city [H with §1.9].
- **Whiskeyjack's death is on a hilltop** at the alliance's position: "death has already ridden across this hilltop" [KH 88%]. Kallor's sword kills him; his eyes are on **Korlat's** as he dies [KH 88%]. Readers: Kallor goes for Korlat first as the only immediate threat, then Silverfox; Whiskeyjack's bad leg gives while he defends her; "Whiskeyjack saved Silverfox's life" [GR ch. 24, msgs 2, 6, 33]. W *Silverfox*: "the two Sister marines guarding Silverfox were killed by Kallor", who "escaped by Warren". **One marine wounded Kallor**, forcing him to withdraw [GR ch. 24, msg 33]. Korlat sees it and cannot reach him; the standard bearer is the one who saves them [GR ch. 24, msg 6]. Readers note "We never found out anything about the two marines" [GR msg 4]: they stay unnamed here too.
- **Itkovian** takes the T'lan Imass's grief so they can pass on [W *Silverfox*; GR ch. 24]. His death comes "beneath the Moon's torrential rain" [KH 94%]: the rain off the falling Spawn. Headline only.
- **His barrow.** "'We mark the death of this man, whose spirit travels to no god. He has walked through Hood's Gate, and that is all.'" and "'For the gift this mortal has given us, we shall each offer one in turn. Together, they shall become his barrow…'" [KH 97%]. "The solemn procession of modest gifts – at times nothing more than a polished stone… continued through the night" [KH 97%]. So the barrow is raised out of gifts, one each, through a night; soldiers kneel [KH 96%]. A Host squad laying a stone on the pile is canon-shaped.
- **The burial.** Rake to "High Fist Dujek. High Mage Tayschrenn. Moon's Spawn is dying…" and "'And I ask that the dead among the Bridgeburners be interred there, as well.'" Picker: "'Is there room for all our fallen?'" [KH 96%]. Dujek: "'I have lost a friend,' he said." [KH 96%]. Gruntle "turned away, blinking rapidly" [KH 96%]. Note that Rake names **Tayschrenn** openly after the battle: the high command knows. The game keeps rule 3 for the squad: the standard bearer, and at most a rumour.
- **The Mhybe.** "'The Mhybe now sleeps, and will sleep for ever more.'" (K'rul) [KH 94%]. With W *Silverfox*: Silverfox made the dream-world for her mother as an apology; the Mhybe is young there. Coll and Murillio tend the sleepers [KH 94%].
- **Silverfox after.** She refuses to release the T'lan Imass; Tool persuades her to free the T'lan Ay; the Imass choose to go to Assail for their kin, and she with them [W *Silverfox*].
- **Readers on the split.** Several call Dujek's airlift a near-suicidal plan; one reads it as Laseen's, through Tayschrenn [GR ch. 24 and end thread]. Never vouched for in game text (rule 1).

**Still not reached:** the K'Chain Che'Malle attack on the alliance camp in detail (when Brood left the hill, how far the camp is from the walls, how Whiskeyjack's river column joined Brood before Coral), Hedge's and Trotts's deaths in detail, Twist's in detail, how the Bridgeburner dead were brought out. The game keeps all of these at the edge of the frame.

**Sources (this re-check):** Goodreads Kindle highlights, Rob Hendricks, *Memories of Ice* (goodreads.com/notes/10377639-memories-of-ice/83187470-rob-hendricks), 86–97%; Goodreads "The Malazan Fallen" threads *MoI – Chapter Twenty-Four (no spoilers)* (topic 1307170) and *MoI – End of Book Discussion* (topic 1307173); Malazan Wiki *Silverfox* (malazan.fandom.com/wiki/Silverfox). Tried and empty: Reactor re-read MoI ch. 24; breezewiki mirrors of *Whiskeyjack* and *Korlat*.
