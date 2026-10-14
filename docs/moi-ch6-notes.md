# Book Three, Chapter 6 — "The Night Lift": continuity notes

Tue Oct 13, 2026. File `src/66_b3_ch6.js` (`B3CH6`); art `src/66b_b3_ch6_art.js` (the artist's). MoI ch. 21–23: Dujek's secret split.

## Shape

- **Areas:** `b3_c6_camp` (the Host's camp south of Setta, night; both roads), `b3_c6_ledge` (the landing ledge above Coral, night; quorl), `b3_c6_trench` (the entrenchments, day; quorl), `b3_c6_bank` (the barge camp on the Maurik below the ford; maurik), `b3_c6_landing` (Maurik's landing; maurik).
- **Fights:** `b3_c6_field` (the lift field: Beklite foragers who must not get home; stage 2 the gully and a file-leader with an unblown horn; both roads) · quorl: `b3_c6_landing` (a Pannion picket on the ledge; stage 2 a Seerdomin on the goat track), `b3_c6_condors` (demon-ridden Condors at the roost at dusk; `aid` Black Moranth, need 8; stage 2 the ridden one) · maurik: `b3_c6_raid` (Pannion raiders with fire-pots at the slips; stage 2 the man with the fire-pot), `b3_c6_ambush` (a reed-bank ambush on the float to Maurik; `aid` White Face, need 7; stage 2 a Seerdomin master). XP: 170 + 220 + 300 = 690 on either road.
- **The Deck:** `B3DECK[6]` (the Leper's chapter), `b3DeckChoice(6)` at `b3_c6_start`.
- **The trick (one ✦):** *The Boatman's Knot* (`b3_c6_knot`, wits 16; Brisk +2, Sohra +1, Kettle +1, Tuft −1), taught by **Oskan**, a Cawn wright with the carpenters' wagons in the camp (before the fork, so either road can carry it); a second try is offered at his post, and again on the Maurik bank. Battle half `t_b3_c6_knot`: haul an enemy 2–(4+lvT) away up to two steps and knock it down.
- **Items:** `b3_c6_vambrace` (Moranth chitin vambrace, +1 AC trinket; quorl road, from a quorl rider at the roost), `b3_c6_axe` (barge-builder's axe, 1d10+2, Brisk or the sergeant; maurik road, from Oskan after the raid), `b3_c6_feather` (a Condor feather; either road: after the Condors, or from a dead Condor in the reeds after the ambush). The feather's effect is engine code in the chapter file: while anyone wears it, a fight that would open with the squad surprised (`surprise:'e'`, not a stage two) opens without surprise, with a log line.

## The key `b3_c6_key`

Chosen at `b3_c6_after_field` (or Whiskeyjack in the camp, or "Give me tonight" and back): Whiskeyjack keeps one squad of marines back with the column.
- **`quorl`** → `S.f.b3_flew = 1` (and `b3_river` deleted). The Fourth fly with the Seventh, take a picket's ledge above Coral, meet Achievant Twist (his arm smells of a bound wound; he refuses Ohl's help), go down into the entrenchments (Dujek, Tav, a Moranth heavy, the forward screen with Coral below and K'ell Hunters drilling far off on the plain), and hold the roost against the Condors at dusk. Loyalty: Kettle +1, Brisk +1, Ohl −1.
- **`maurik`** → `S.f.b3_river = 1` (and `b3_flew` deleted). The Fourth stay with Whiskeyjack's four thousand ("making the dust of ten"), build barges below the ford, see the leg close (`S.f.b3_legSeen = 1`), hold the slips against raiders, float a day to Maurik with three clans of the White Face, and stand the guard line outside the command tent when Brood finds out. Loyalty: Ohl +1, Sohra +1, Kettle −1.

## Flags later chapters may read

- `b3_c6_key` 'quorl' | 'maurik'; `b3_flew` 1 / `b3_river` 1 (exactly one of them).
- `b3_c6_ask`: what the sergeant told the Rhivi about the companies going — 'truth' | 'lie' | 'later' (unanswered: a quorl-road squad that said "ask me at the Maurik" never got there) — and `b3_c6_askWho` 'sohra' | 'rider'. On the maurik road 'later' becomes 'truth' or 'lie' at the river.
- `b3_c6_loud` 1: a sharper was thrown on the lift field (trust −1 then).
- `b3_c6_seed` 'rhivi' | 'left' | 'qm' (seed grain in a burnt farm's cellar).
- `b3_c6_tav2` 1: Brisk and Tav met in the entrenchments (quorl). Tav's company (Fourth Regiment) **went by quorl either way**; on maurik Brisk said goodbye on the field without turning round.
- `b3_c6_twistArm` 1 (Ohl offered; Twist refused) · `b3_c6_twist` 1 · `b3_c6_dujek` 1 · `b3_c6_condorsDone` · `b3_c6_moranthCame` 1/0.
- `b3_c6_ohlWeek` 1 (Ohl offered Whiskeyjack the week; "after Coral") · `b3_c6_mallet` 1 (the sergeant said "Mallet's week" to his face; "after Coral") · `b3_legSeen` 1 on maurik.
- `b3_c6_raidDone`, `b3_c6_hullLost` 1/0, `b3_c6_ambDone`, `b3_c6_barghastCame` 1/0, `b3_c6_logs` 'won' | 'lost' (a log race with a White Face warrior).
- `b3_c6_herds` 'sohra' | 'asked' | 'slow' | 'wait' (Rhivi bhederin on Maurik's landing).
- `b3_c6_brood` 1: watched Brood find out, from the guard line; `b3_kallor` = 1 there (a Rhivi names him). `b3_c6_kallorLook` 1: Kallor spoke to the sergeant at the river (and, if `b3_kallorSaw`/`b3_kallorEnemy`, said "I know you"). `b3_c6_korlat` 1: Korlat asked the sergeant to tell *her*, not Whiskeyjack, if he falls behind on the road — **Ch7 may pay this off** (the squad is too far when he falls; rule 2).
- Earlier flags read: `b3_c5_key === 'quiet'` → trust −1 after the field and Whiskeyjack mentions the rumour (default: no penalty); `b3_kallorSaw` / `b3_kallorEnemy` (Kallor knows the face; Hurlochel warns; Kallor's line at Maurik); `b3_kallor` (named or "the tall man in the fur-collared cloak"); `b3_treach` (Gruntle named at the ford, else "Capan soldiers with tiger stripes"); `b3_dannetDone`; `b3Was('c7_letter')` (the letter sealed for an import); `b3Fallen()` includes 'brisk' (Tav comes to the sergeant instead).

## Inventions

- **Oskan**, a short bald Cawn wright, one of the column's eleven hull-builders; keeps one axe for every barge he builds and gave this one away. Knows Tav ("Big lad? Sings? I'm sorry for you").
- A young Rhivi rider with a pale spirit-mark across his eyes (when Sohra is not with the squad) who asks where the Malazans go at night.
- A White Face warrior who races the Fourth carrying logs. A Moranth rider's turned-over palm (Kettle thinks it means thank you).
- The Mott Irregular stealing dung on Maurik's landing is canon's "High Marshal" (Sty, unnamed here).

## Left open on purpose

- What the squad saw of the K'ell Hunters from the forward screen is only "something taller than men that moves the wrong way".
- Brood's words in the tent are never heard: one word, the canvas moving, and outside "He should have told me."
- Kallor says he has *asked* to ride south with Whiskeyjack (the wiki pages disagree on how he came to be at the alliance's position; the game never says).
- Tuft and the standard bearer: "every time", nothing more (rule 7).

## Canon notes and doubts

- Followed: Black Moranth "coming each night, taking whole companies away"; Dujek went with them; about 4,000 on the road under Whiskeyjack, half support; barges below a ford on the Maurik; about a day downriver to Maurik; three clans of the White Face rode the barges, the rest walked; Rhivi bhederin blocking the later barges (Gruntle's arrive hours late); Brood waiting at Maurik and finding out; Kallor calling the abandonment a tactical mistake and asking to go south; Korlat and Orfantal going with Whiskeyjack; Brood following at an army's pace; Twist's infected arm; Condors following the quorls home and attacking anything that flies; Bridgeburners holding the forward trenches (never visited); Dujek's half about 6,000.
- Doubtful: the order Setta → Maurik (Setta is named as "empty"; Lest is never visited); whether Artanthos marched with Whiskeyjack's column (he is at the alliance's position at Coral, so the game puts him on the road); Hurlochel appears in the camp before the split (he is with Brood at Maurik in canon, so he is not shown on the river); the first glimpse of K'ell Hunters drilling outside Coral is the game's own; the ford's distance is unstated.
- Never: Shank's drowning, Spindle's tunnels, the 400 Beklites, Brood's tent from inside, "fair exchange".

## The source re-check (moved here from moi-canon.md so only this chapter's files change)


## Chapter 6 re-check (Tue Oct 13, 2026, 5:30 AM PDT): the airlift and the march to the Maurik

A focused re-check for Book Three, Chapter 6 ("The Night Lift"). New sources this time: **W23** the Malazan Wiki page *Memories of Ice/Chapter 23* (it answered); **W24** *Memories of Ice/Chapter 24*; **WK** the wiki's *Kallor* and *Korlat* pages; **BN** a chapter-by-chapter guide at booknookcook.com ("Memories of Ice: Every Chapter Explained"; a single unofficial summary, treated as [1] and only where it agrees with the wiki or the sheet); **KH** the same Goodreads Kindle highlight (Scott Melton, 82%) the sheet already quotes. The Reactor re-read pages for chapters 22–24 again came back with no body text.

**Confirmed or sharpened**
- **The plan is made in ch. 21.** Dujek and Whiskeyjack plan the split; Paran and Quick Ben go ahead with the Bridgeburners; the Black Moranth are due "in two nights"; Whiskeyjack talks of retiring after [1: BN ch. 21; WK *Korlat* has him and Korlat planning a quiet life after]. Itkovian tells Gruntle that **Setta, Lest and Maurik are empty**; only Coral is left [1: BN ch. 21]. W23: Setta is empty but for condor nests and the dead (headline only, never detail).
- **The lift itself** [H: KH 82% "The Black Moranth, of course. Coming each night, taking whole companies away."; BN ch. 23 "quietly removing companies from the column each night"]. Dujek flies out with them; Seven Cities "is consuming itself", and the Empress may need Whiskeyjack to bring the Host there [1: BN ch. 23]. **About 4,000 remain on the road** [H: KH 82%; W23 Straw: Whiskeyjack "now leads an army of only 4,000"].
- **Dujek's half at Coral** holds "the entrenchments on the mountainside", about **6,000** strong, against a Pannion army Antsy puts near 30,000 [1: W24]. The Bridgeburners took the **Pannion forward entrenchments** above Coral first; a 400-strong Beklite company was destroyed with sharpers, felled oil-soaked trees and burners [1: BN ch. 23; W23 has Spindle's sappers blowing old Pannion tunnels so the Seer will think the whole army is on the hillside, and the woods set alight].
- **Shank drowns a Seerdomin** by filling his lungs with water, at the entrenchments, in ch. 23 [H: BN ch. 23; W23 "Shank and Quick Ben kill the Seerdomin leader"]. The sheet's §1.7 "Malazan mages drown an enemy mage" is this deed: a Bridgeburner's, above Coral, not on the road. (Chapter 5's writer may want to know; a Book Three squad never does it.)
- **Twist** is near death from an infection spreading from an old arm wound; he talks with Paran and says the Moranth will not fight the Tiste Edur; "the Malazan Empire is a wise empire" [1: W23]. He dies at Coral (sheet §2).
- **Condors**: "the condors are attacking anything that flies"; Dujek cannot send a Moranth to Whiskeyjack because of them; a demon-ridden condor brings down Moranth fliers in numbers [1: W24]. The sheet's "following the Moranth back to the entrenchments" [KH 88%] stands.
- **The Maurik.** The barges carry the column downriver: Whiskeyjack and **Humbrall Taur** cross by barge, "about a day's journey" to Maurik; "three clans of the White Face took the barges while the rest walked" [1: W23]. So **the White Face Barghast are with Whiskeyjack's column at the river** (W23: Whiskeyjack worries that leaving "the 50,000 Barghast behind" may prove fatal). The ford is the KH 82% context; W23 does not mention it. Gruntle and Itkovian come up hours later, after **Rhivi herders block the barges with their bhederin**; a Mott Irregular calling himself High Marshal Sty steals dung from them [1: W23].
- **At Maurik Brood learns of it.** Brood confronts Whiskeyjack over the concealed companies [H: BN ch. 23; WK *Korlat*: "Whiskeyjack stayed behind at Maurik to break the news, which earned Brood and Kallor's scorn"]. **Kallor** tells Brood that abandoning Onearm's Host "to annihilation was a tactical mistake", and asks to ride with Korlat and Whiskeyjack; Brood agrees; Kallor smiles as he leaves the tent [1: W23; WK *Kallor* says instead that Brood took Kallor's advice to let his own army linger: the two wiki pages disagree on whether Kallor went with Whiskeyjack or followed him]. **Korlat and Orfantal** go with Whiskeyjack's small army on a forced march to Coral; Brood comes on at a measured pace [H: W23; WK *Korlat*; BN ch. 23]. **Hurlochel** stands with Brood, Kallor, Orfantal and Korlat in the long silence before the barges come in [1: W23].
- **At Coral** Whiskeyjack's exhausted column forms a line facing the city with the **Ilgres** on one side and the **White Face** on the other, outside the north gate [1: W24; BN ch. 24].

**Corrections and cautions**
- The sheet's town order Setta → Lest → Maurik → Coral: Setta and Maurik are now [1] on the road (W23); Lest is only named as empty (BN). Keep Lest unvisited.
- **Lestari**: still unconfirmed (W23 does not have it). Gruntle is with Whiskeyjack's column at the river; call his people Trake's Legion, or nothing.
- **Who at Coral**: W24 says Dujek ordered Twist to send "a regiment of his Moranth heavies" against the Pannion legions; Black Moranth losses were very heavy (hundreds of quorls and riders in suicidal charges at the condors). Nothing of this belongs in Chapter 6 but the dread of it.
- **Kallor and the column**: because the two wiki pages disagree, the game never says how Kallor came to be at the alliance's position; in Chapter 6 he is seen at Maurik, beside Brood, and asks to go on.

**For the game.** A Host marine squad may be one of the companies lifted (set down in the entrenchments after the Bridgeburners took them; the Moranth go back each night; condors come at dusk), or one of the companies left with Whiskeyjack (making the dust of a larger army; building and riding the barges with the White Face; at Maurik when Brood finds out, watching from a guard line). Never Shank's drowning, never Spindle's tunnels, never the 400 Beklites, never Brood's tent.

**Sources (this re-check).** Malazan Wiki: *Memories of Ice/Chapter 23*, *Memories of Ice/Chapter 24*, *Kallor*, *Korlat* (malazan.fandom.com). booknookcook.com, *Memories of Ice: Every Chapter Explained* (chapters 21–24). Goodreads Kindle highlights, Scott Melton, MoI 82%. Not reached: the Reactor re-read of chapters 22–24 (no body text), the Goodreads chapter 23 threads (fetch refused), the wiki's *Twist* and *Maurik* pages.
