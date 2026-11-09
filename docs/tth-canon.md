Sun Nov 8, 2026, 8:15 PM PST. Canon sheet for Book Eight (Time Served), against v10.2.0.

# *Toll the Hounds*: canon sheet (first pass)

Plan: `docs/book8-tth-plan.md` (settled Nov 8, 7:54 PM PST, all as recommended). This sheet checks that plan against the novel. It has the same shape as `rg-canon.md`.

**Sources** (read Nov 8, 2026, through WebFetch; about half of all requests failed and were retried once):
- **T:** the novel's own text. **Not reached.** Google Books and the publisher's excerpt didn't load, so nothing here is closed by a page quote. §10 lists the page checks that matter.
- **W:** the Malazan Wiki (malazan.fandom.com), the named page. Reached: *Toll the Hounds* (the book page), *Mallet*, *Bluepearl*, *Picker*, *Murillio*, *Gorlas Vidikas*, *Anomander Rake*, *Mother Dark*, *Hood*, *Kallor*, *Spindle*, *Monkrat*, *Endest Silann*, *Torvald Nom*, *Rallick Nom*, *Hounds of Shadow* (TtH section empty), *Fête of Gedderone*, *K'rul's Belfry*, *Orb Sceptre Throne/Dramatis Personae*. **Unreached** (failed twice): *Black Coral*, *Great Barrow*, *Seerdomin*, *Salind*, *Gradithan*, *Itkovian*, *Spinnock Durav*, *Seba Krafar*, *Vorcan*, *Madrun*, *Darujhistan*, *Gadrobi District*, *Toll the Hounds/Dramatis Personae*.
- **R:** Reactor's re-read, by chapter: R1, R4, R6, R7, R8.2, R14, R17.2, R22, R23, R24.1, and the book wrap (RW). Scene numbers as Reactor gives them (R23 S21 = ch 23, scene 21). **Unreached:** the Prologue, ch 2, 3, 5, 8.1, 9–13, 15–16, 17.1, 18–21, 24.2, the Epilogue (the page or only the site frame came back).
- **F:** fan sources, used only where nothing better loaded: the Goodreads "Malazan Fallen" group's ch 21, 22 and 24 threads (GR21, GR22, GR24); one r/Malazan timeline thread (RM). Wikipedia's TtH page repeats W's summary.
- **Not used:** `malazan-wiki.pages.dev` ("Malazan Explorer"): unsourced and wrong in places (it calls Salind the High Priestess).
- **Marks:** **[H]** two sources agree, **[1]** one source, **[O]** none found. *(memory)* is unchecked.

---

## Plan corrections (the gate: does a planned beat contradict canon?)

**Yes. Two beats break canon as drafted (1 and 2); the rest need small fixes.** Each fix has a recommendation first.

### 1. The calendar: the round trip to Black Coral doesn't fit (the big one)

- **Canon:** the Darujhistan story runs "over the entirety of the festival, beginning on the first day and ending on the last night" of the multi-day Gedderone Fête (W *Fête of Gedderone*). Kallor reaches the city "on the last day of the Gedderone Fête" (W *Kallor*). RM agrees: the novel takes place "for the duration of the Gedderone Fête" [H, W + F].
  - Chapter 1's "New Year crowds" (R1 S1) are the Fête's first day: the Fête is the Daru new year (W *Fête of Gedderone*; series-canon §(e)).
  - So the Guild's first knives (R1), Mallet's death (W *Mallet*: ch 11) and the night of the Hounds (R22–R24.1) all fall inside **days, perhaps two weeks**. No source gives the Fête's length [O].
- **The plan:** Ch 1 is the New Year; Ch 2–5 are a caravan to Black Coral and back; Ch 6 is the night of the Hounds. Black Coral is many weeks' road from Darujhistan (in MoI the Host took weeks from Capustan to Coral *(memory)*; Book Three's `daru` road went "the long way… over the Domin and the Catlin and the Rhivi Plain"). **The trip can't fit between the Fête's first day and its last.**
- **And Ch 4 clashes with Ch 6.** The camp's turning is the same night as Rake's death:
  - Salind in Gradithan's hut, and Spindle telling Monkrat "It's time" to take the children out, are ch 22 (R22 S4–S6).
  - Silanah burns Gradithan and his followers (W *Spindle*, W *Monkrat*).
  - The moon's fragments strike Black Coral and the kelyk rain falls in ch 24 (R24.1 S1, S28).
  - That is the night the Hounds are in Darujhistan (R22 S9, R23). The squad can't stand in both.
- **Fix (A), recommended: start earlier, leave Black Coral before its climax.**
  - **Ch 1 moves to the winter before the Fête.** The Guild's first knife for the Fourth comes weeks before the New Year, on a paper of its own (correction 3). K'rul's isn't touched yet. Retitle *The Long Night* or *Before the Fête*; keys `hunt` / `quiet` stand.
  - **Ch 2:** the caravan east at winter's end.
  - **Ch 3:** Black Coral, as drafted.
  - **Ch 4:** the camp's *first* turn: kelyk spreading, the children kept apart, the Seerdomin no longer coming, the pilgrims frightened (R6 S5–S7). The squad holds its edge on one bad night and is gone before the real turning. Spindle, Monkrat, Silanah and the children are later rumour.
  - **Ch 5:** the road back west *during* the Fête, reaching the city on its last day. K'rul's news (Mallet and Bluepearl dead) meets them at the gate.
  - **Ch 6** (the last night) and **Ch 7** (the morning after) as drafted, with fixes 2, 5 and 7.
- **Fix (B):** stay in Black Coral for its climax. Ch 6 becomes Black Coral's night: the shroud failing, moon-fire in the dark, the kelyk rain, the dragon over the camp seen from the walls. Ch 7 is the news of Rake's death coming east, and the roads out. Truer to the novel's halves, but it gives up the Darujhistan finale David chose.
- **Fix (C):** the plan's own alternative: all seven chapters in Darujhistan, Black Coral as rumour.

### 2. Rake's body: no Andii procession (Ch 7)

- **Canon:** next morning "Darujhistan stopped". "Tens of thousands of silent mourners followed Caladan Brood and the ox cart" carrying Rake's body to a barrow outside the city, which Brood made with the warren of Tennes. The body was laid "exactly as Rake had fallen, in the Tiste Andii manner", in a chamber with no weapons or treasure. Brood sealed it with a Barghast glyph meaning "Grief" (W *Anomander Rake*, citing ch 24 and the Epilogue). GR24 agrees: a barrow "made from Burn's flesh", sealed "Grief" [H, W + F].
- Mother Dark comes back to Black Coral through the Gate of Darkness and Rake's sacrifice, not through his body (W *Mother Dark*, W *Anomander Rake*) [1].
- **The plan's "the Andii come for him" contradicts this.** Fix: the Fourth walk at the far back of the tens of thousands behind the ox cart. They never see the barrow sealed, never reach Brood, and no Andii is named. The city's bells toll for Rake: Kallor hears them from Worrytown (W *Kallor*) [1]. That is the book's toll, and the plan's "a bell for every soldier" can ring under it.

### 3. Whose contract (Ch 1)

- R1: Dester Thrin follows Picker on "a contract on at least several of the retired Malazans" [1].
- W *Picker*: "a contract on the owners of Krul's Bar". W *K'rul's Belfry*: assassins "contracted to kill the remaining Bridgeburners" [1].
- **Who paid: not found** in any source reached [O]. The R1 summary says only that they were "paid assassins".
- So "the Guild's list has the Fourth's names on it too" isn't supported. **Fix:** the Fourth's knives are a second paper, client unknown. The Guild journeyman may say "Malazans, the paper said. The Guild doesn't ask which." The narrator never says it is the K'rul's contract, and never says who paid (rule 70).

### 4. The road to Black Coral (Ch 2)

- **Direction.** Black Coral is Coral renamed (W *Spindle*: "the renamed Black Coral"; moi-canon §1.9: Rake's Andii take Coral) [H]. Coral is on the Pannion coast, east of Darujhistan; Book Three's `daru` road leaves Coral by "the road west". **"The plain north and east" → "east, over the old Domin."**
- **Trade.** A Dying God priest in an old Pannion town takes Nimander's party "for traders from Black Coral" (R4 S2), so Black Coral's traders work those roads [1]. Baruk and the Crone talk of Rake's "delay in establishing relations" (R1 S15–18): Darujhistan and Black Coral have no settled relations yet [1]. **A Daru merchant caravan is margin, not canon:** keep it one merchant's venture, never the Council's.
- **Distance and time:** no source [O]. Write "weeks", never a count.
- **The scarecrow fields and the risen towns are canon** (R4 S2: fields of plants fed by rag-wrapped corpses, "thousands more" in the distance; the Pannion cities "rising in the new age of Saemankelyk"; R6 S3: the scarecrows sing and the pollen pulls at the mind) [1]. **Nimander's party is on these roads.** The caravan never meets four young Andii, a wagon with a comatose boy, or Kallor riding in it (R6 S9; W *Kallor*: near Heath). It never goes to Bastion.

### 5. The night of the Hounds (Ch 6)

- **Which Hounds:** the Hounds of Shadow, who came with Traveller over the Lamatath (R14 S2; R22 S11, Cotillion "accompanied by a few Hounds"). Then ten Hounds of Light, when the moon explodes after Rake's death (R23 S22–24) [H, R14 + R22/R23].
  - Not the Deragoth: no source puts the Hounds of Darkness in TtH [O].
  - The Hounds of Light are killed by Karsa, Barathol, the Seguleh Second and Tulas Shorn; seven of ten die (W *Anomander Rake*; R24.1 S13–23) [H].
  - Five Hounds of Shadow stand round Rake's body (R23 S21). R23's two summaries disagree on whether Envy and Spite kill them or drive them back [O].
- **Where:** Traveller, Karsa and Samar Dev "reach the wall, which the Hounds have wrecked" (R22 S9), and Cotillion meets Traveller inside (R22 S11). **The Gadrobi District burns** (R23 S5). The gaol, the Temple of Shadow, the estate tower and Coll's estate by the Finnest House are all in play that night (R23). No source names which stretch of wall [O].
- **Fixes:**
  - The Fourth hold a *different* breach, or the Gadrobi streets behind the wall (the plan's Gadrobi lodging pays off here). Never the breach Traveller walks through, never Cotillion, never the gaol.
  - **Rule 14 holds: no Hound dies at the Fourth's hands**, of Shadow or of Light. So the mortal fight is **not** a Hound. Recommended: the Guild's knives, come for the Fourth under cover of the night (the Contract decides how many), with a Hound passing the end of the street as a "survive" beat, never killed.
- **The moon:** by the time Karsa's party is inside, "the moon has shattered" (R22 S9). Torvald and Vorcan watch the Gadrobi District burn "beneath the shattered moon" (R23 S5). After Rake dies, "the moon explodes, filling Darujhistan with light" (R23 S22) [H, R22 + R23]. What the moon is, or why, is never said (rule 81).

### 6. The road back (Ch 5)

- **"Hounds running south" → "toward the city".** The Hounds of Shadow shadow Traveller over the Lamatath toward Darujhistan (R14 S2) [1].
- **The crossroads** is lit by "four torches on tall poles" (R22 S2; W *Kallor*). Spinnock holds it on Rake's orders; the fight runs through the night of the Fête's last day and ends at dawn (W *Kallor*). Kallor then reaches Worrytown, on the city's eastern outskirts (W *Kallor*) [H, R22 + W].
  - So the crossroads is on the eastern approach, the Fourth's own road home. The torches can be seen at dusk on the last day, far off, with one figure waiting. **Never closer, never the fight, never Korlat or Orfantal** (W *Kallor*: Kallor kills Orfantal).

### 7. Hood and the Guardians (patrons, plan Q9)

- **Hood walks through Darujhistan that night** (GR21: "As Hood walks through Darujistan we get a medley of deaths"). **Rake beheads him with Dragnipur**, "with a single clean cut" (W *Hood*, citing ch 21, US TPB p. 712; GR21 quotes Hood: "Son of Darkness… I have reconsidered—") [H, W + F]. Hood then leads the armies of the dead inside Dragnipur under Iskar Jarak, "of their own free will" (R22 S12–16; R24.1 S5) [H].
- **The Guardians of the Gate begin only after Brood shatters Dragnipur** at Baruk's estate, the morning after (W *Hood*: "took on the role as Guardians of High House Death"; W *Anomander Rake*) [1].
- **So Hood can't answer on the last night, and the Guardians don't exist yet.** Fix, recommended: Hood answers Ch 1–5. In Ch 6 "the dead" answer: no name, a column marching somewhere else, a grey-bearded captain at its head never named. From Ch 7, the Guardians of the Gate.

### 8. Smaller notes

- **Ch 4 `burn`:** Silanah, the red dragon, burns Gradithan's camp (W *Spindle*, W *Monkrat*) [1]. The Fourth never burn the camp. `burn` = their own edge's kelyk stores, or a scarecrow field. Under fix (A) it's before the turning anyway.
- **Mallet isn't the only death at K'rul's:** Bluepearl dies with him "in a raid by the Assassins' Guild" (W *Bluepearl*). W *Picker*: the attack left "two of the former Bridgeburners dead, and Blend seriously injured" (ch 11 per W *Mallet*) [1, W only].
- **Murillio dies at the mine,** not in the city: the Eldra Iron Mongers mine west of Darujhistan (W *Murillio*, W *Gorlas Vidikas*, R17.2 S10) [H].
- **The Redeemer "never answers":** canon backs "never grants". Itkovian *speaks* with the Seerdomin, refuses to summon the Imass or to judge, and answers "every choice in the world" (R14 S5; R22 S6) [1]. Writers say he never acts for a petitioner, never that he is silent.
- **The former-Seerdomin recruit:** the canon viewpoint is called "Seerdomin" and "Benighted" (R4 S3; R6 S5). Ours is always called by his own name (§6); the word "Seerdomin" is used for him at most once, as a past ("wore the grey once").
- **The Host (Book Six's `highfist`):** no source puts Onearm's Host, Paran or any Malazan army in TtH. Picker and Antsy reach Paran only "through the Azath House" (W *Picker*) [1]. The Host never appears; the time-served list works.

---

## 1. The spine, chapter by chapter

Four Books (W *Toll the Hounds*, contents) [1]:
- Book One, *Vow to the Sun* (ch 1–6)
- Book Two, *Cold-Eyed Virtues* (7–12)
- Book Three, *To Die in the Now* (13–18)
- Book Four, *Toll the Hounds* (19–24)

Kruppe narrates the Darujhistan thread (RW).

| Ch | Darujhistan | Black Coral and the camp | The road and the plain | Elsewhere (headline) | Src |
|---|---|---|---|---|---|
| Pro | — | — | — | A necropolis: Hood, Edgewalker, Shadowthrone and Rake meet, unheard. Dragnipur's wagon slows as Chaos nears the Gate of Kurald Galain. Kruppe asks K'rul to watch him dance. | W [1] |
| 1 | New Year (the Fête's first day). Challice on the Vidikas balcony; Malazan-style torcs are the fashion. Guild knives Dester Thrin, Zechan Throw and Giddyn the Quick die on Picker, Antsy and Bluepearl. Spindle "has gone on a pilgrimage". Chillbais sees something leave the Azath. Gorlas, Shardan Lim and Hanut Orr on the Council. Murillio stabbed (by Prelick, W). The Phoenix: Kruppe, Scorch and Leff's debtors' list; Meese sent for Coll. Mallet called away to heal Murillio. Crone brings Baruk a scroll from Rake: "it has begun". | — | — | — | R1 [1] |
| 2 | Cutter home, dreading the Phoenix; Barathol and Spite arrive *(W book page; R2 unreached)* | — | — | — | W [1] |
| 3 | Rallick "kicked awake by Raest" (W *Rallick Nom*, ch 3) | — | — | — | W [1] |
| 4 | — | The Seerdomin's daily prayer at the Great Barrow; a young High Priestess calls him "Benighted" and he refuses to guard the children. Endest's past at Kharkanas. Rake asks whether the barrow's rising is Itkovian becoming a god. Spinnock and the High Priestess: Mother Dark hasn't forgiven. A Redeemer priestess refuses Spinnock's and Rake's help. | Traveller wrecked on the coast. Nimander's party at the scarecrow fields; a priest says the Dying God's body lies in Bastion. Kallor on the plains of Lamath. | Kharkanas (flashback) | R4 [1] |
| 5 | *(unreached)* | | | | — |
| 6 | Kallor senses two Andii powers north and heads for Darujhistan. | Endest feels a cry from Kurald Galain; Rake says Spinnock "will be needed elsewhere". Salind and the pilgrims, abandoned by "the Benighted", fear for themselves; a merchant who gave up his wealth complains. Spinnock and the Seerdomin play in the tavern; the Seerdomin concedes; Salind comes, and he tells her to go. | Shadowthrone and Cotillion meet Traveller two days inland from Morn. The singing scarecrows; Clip kills a village. Kallor joins Nimander's wagon. On the Lamath plains: the Kindaru clan, the Skathandi raiders and their Captain; Samar Dev finds Traveller. | — | R6 [1] |
| 7 | Harllo sold to the mine. Trygalle at Quip's bar; Gruntle joins. Gorlas, Lim and Orr plot a Council seat. Stonny's duelling school. Murillio means to teach there. Rallick at his lodgings (Irilta). Torvald home to Tiserra. Fisher and Duiker at K'rul's. A ghost in K'rul's cellar speaks to Bluepearl. | — | — | Mappo, Burn's priests | R7 [1] |
| 8 | — | — | Nimander's party and Kallor at Gothos's tower. Karsa frees the Captain's slaves and burns the carriage. Traveller and Samar Dev. | — | R8.2 [1] |
| 9–10 | *(unreached)* | | | | — |
| 11 | **The Guild's raid on K'rul's: Mallet and Bluepearl killed, Blend badly hurt** | | | | W *Mallet*, *Bluepearl*, *Picker* [1] |
| 12–13 | *(unreached)* Picker and Antsy seek Paran through the Azath; Picker falls into a coma; Antsy carries her to the Phoenix | | | | W *Picker* [1] |
| 14 | — | Rake sets Dragnipur down in a deep cavern; he has sent Spinnock away; Endest must act. The Seerdomin asks Itkovian to summon the Imass; Itkovian refuses: "every choice in the world". Salind dances in her certainty. | Traveller's party shadowed by Great Ravens and Hounds of Shadow. Shadowthrone and Cotillion warn Karsa a crown and a throne wait in Darujhistan. | Hood's realm: the dead gathered as an army; Toc, Iskar Jarak, Brukhalian | R14 [1] |
| 15–16 | *(unreached)* | | | | — |
| 17 | Barathol arrested; Chaur breaks; Barathol beaten and jailed. **Murillio killed in the "first blood" duel at the mine**; the body sent to the Phoenix. Krute goes back to the Guild for "a new contract" under Seba. Rallick to the Phoenix. Kruppe can't stop Cutter. The Prophet of the Crippled God in the city; Bedek dies in the crush. | — | — | — | R17.2 [1]; W *Murillio* [H] |
| 18–20 | *(unreached)* Murillio laid in Coll's family crypt (W *Murillio*). | | | | — |
| 21 | Hood walks the city. **Rake beheads Hood** with Dragnipur. **Cutter kills Gorlas** (W: at the mine). | | | | W *Hood*; GR21 [H] |
| 22 | The Hounds have wrecked the wall; Karsa, Samar and Traveller go in; "the moon has shattered"; Cotillion stops Traveller and lets him pass. | Salind in Gradithan's hut bleeding saemankelyk. **Spindle to Monkrat: "It's time"**, the children must go. The Redeemer wonders aloud if he can help the Dying God; the Seerdomin goes to bring Salind back. Endest alone; Silanah waits over the camp. | **Spinnock stops Kallor at the four-torch crossroads**: the city "is not for you". | Clip opens a gate to Black Coral and kills Nenanda; Picker falls in a strange realm; Hood in Dragnipur with the armies of the dead, Iskar Jarak leading. | R22 [1] |
| 23 | Pallid and Baran wreck the gaol; Chaur struck down; Antsy out. The Noms watch the Gadrobi District burn. Cutter rides with the lance. **Challice jumps from the estate tower.** Kruppe leaves the Phoenix grieving. Raest takes Chaur into the Finnest House for a dead white cat. **Rake dies:** he blocks Traveller's blow and lets Dragnipur split his skull; Dassembrae cultists chant, hundreds of Great Ravens gather. The moon explodes; ten Hounds of Light. Pust and Kruppe on mules. | — | Spinnock holds Kallor through the night, falls; Korlat heals him; Kallor kills Orfantal and walks on. | — | R23 [1]; W *Anomander Rake* [H] |
| 24 | The street over Rake's body: Karsa, the Second, Barathol, Tulas Shorn, Karsa's daughters, a dragon kill seven Hounds of Light. Envy and Spite back away from a carriage. The morning after: the city stops; Brood's ox cart to the barrow outside the city; Brood shatters Dragnipur at Baruk's (Crone, Derudan, Vorcan, Baruk watching). | Moon fragments strike Black Coral; Endest made to hold back Light; the High Priestess fears the Dying God takes the Throne of Darkness; the Andii feel their lord die; kelyk rains. **Mother Dark settles with the Gate in Black Coral** (W). Itkovian takes the Dying God's avatar in Salind (GR24, F). | — | Dragnipur: the dead hold under Brukhalian, the Seguleh, the Bridgeburners; Toc made Herald of Death and sent with the Trygalle; Rake enters Dragnipur. Picker in a cave: Toc's message, "Find the Toblakai… and lead him to war". | R24.1 [1]; W *Anomander Rake*, *Mother Dark* [1] |
| Epi | Kallor in a Worrytown tavern hears the city's bells toll for Rake (W). Nimander takes his father's place as Lord in Black Coral (W). Cutter sails away (GR24, F). | | | | W [1] |

## 2. Where and when

**When.**
- **After MoI:** "years" (W TtH page; RM: "years after the events in Memories of Ice"; RM's own estimate, "4–5 years after… Gardens of the Moon") [F only for a number]. **Write "years".**
- **Season: the sources disagree** [O].
  - W's book page: "It is summer," the heat oppressive.
  - W *Fête of Gedderone*: the Fête marks "the end of winter and the beginning of its new year".
  - **Write "the Fête"**, never a season, until a page check (§10 Q2).
- **Span:** the Fête's days, first day to last night (correction 1).
- **The last night:** Hood falls; the Hounds; the moon; Rake dies; Spinnock and Kallor; Black Coral's night; the camp burns. **The morning after:** the barrow; Dragnipur broken.

**Darujhistan** (places the novel uses):
- **K'rul's Bar**, in the old belfry, "in the Noble district" (W *K'rul's Belfry*).
- **The Phoenix Inn** (R1, R17.2, R23).
- **The Gadrobi District**: it burns on the last night (R23 S5).
- **Worrytown**: the eastern outskirts (W *Kallor*).
- **The Vidikas estate and its tower** (R1, R23); Coll's estate by **the Finnest House**, the Azath (R23 S17); **Baruk's estate** (W *Anomander Rake*).
- **The Temple of Shadow**, **the gaol** (R23); **Stonny's duelling school**, **Quip's bar** (R7).
- **The Eldra Iron Mongers mine**, west of the city (W *Gorlas Vidikas*).
- **Rake's barrow**, outside the city (W *Anomander Rake*).
- **The Lakefront and the estate tier:** series-canon §(g) (F).

**Black Coral:**
- **Coral renamed**, on Coral's own site (W *Spindle*; moi-canon §1.9) [H]. The Andii hold it under a shroud of Night that Endest keeps (R24.1 S1).
- Endest is castellan of "the New Andiian Palace" (W *Endest Silann*) [1].
- A tavern where Spinnock and the Seerdomin play (R4 S8, R6 S6); the Redeemer's priestesses (R4 S8).
- **The Liberators**: human plotters against the Andii, whom the Seerdomin hunts (W *Monkrat*) [1].
- **The Great Barrow** lies "just outside" the city (W *Spindle*), with **the pilgrim camp** around it (W *Spindle*, W *Monkrat*; R6 S5) [H].
- Book Three's "barrow of gifts on the plain" fits.

**The plain and beyond:**
- **The old Pannion towns** (scarecrow fields, kelyk, the Dying God's priests): R4, R6.
- **Bastion**, where the Dying God's body lies: R4 S2; W *Kallor*. Never visited by the squad.
- **The Lamatath** (the Lamath plains): the Kindaru, the Skathandi, the Captain's carriage (R6 S10; R8.2 S12–14). Heath, a town where Kallor meets Nimander's wagon (W *Kallor*).
- **The crossroads**: four torches, on the eastern approach (correction 6).

**Moon's Spawn:** sent out over the sea after Coral and lost (moi-canon §1.9) [H]. Its wreck is "the Spawns" of OST (OST Dramatis Personae: "At the Spawns") [1]. **Book Eight never names the Spawns** (rule 80).

## 3. Who lives and who dies

| Who | Fate in TtH | What the Fourth may know | Src |
|---|---|---|---|
| Mallet | dies in the Guild's raid on K'rul's | news: "two of the K'rul's Malazans dead" | W *Mallet*, *Bluepearl*, *Picker* [1] |
| Bluepearl | dies with Mallet | same | W [1] |
| Blend | badly hurt | rumour at most | W *Picker* [1] |
| Picker | coma, then a dream-realm; carries Toc's message | never | W *Picker*; R24.1 [H] |
| Antsy | jailed on the last night, out; at Rake's body | never met | R23; W *Anomander Rake* [H] |
| Spindle | at the camp; with Monkrat saves twenty children | never | W *Spindle*, *Monkrat* [1] |
| Duiker, Fisher | alive at K'rul's | rule 17: "an old historian at K'rul's" at most | R1, R7; OST DP [H] |
| Murillio | killed by Gorlas at the mine; Coll's crypt | the city hears it | W, R17.2 [H] |
| Gorlas Vidikas | killed by Cutter | the city hears "a councillor dead" | W; GR21 [H] |
| Challice | jumps from the estate tower | "a councillor's widow fell". Headline only (tone) | R23 [1] |
| Rake | dies by Dragnipur in a street | bells, the moon, the cart. Never seen | R23; W [H] |
| Hood | beheaded; leads the dead in Dragnipur; not dead (DoD) | never seen; "Death didn't come tonight" | W *Hood*; R22 [H] |
| Spinnock | badly hurt, healed by Korlat | torches far off | R23 S34–35 [1] |
| Orfantal | killed by Kallor | never | W *Kallor* [1] |
| Kallor | alive, wounded, in Worrytown | "a tall old man drinking alone" at most | W *Kallor* [1] |
| Endest Silann | holds the shroud; fate not found | never | R24.1 [O on fate] |
| The Seerdomin, Salind | fates not found | never | [O] |
| Gradithan | burned with his followers by Silanah | "a red dragon over the camp" | W *Spindle*, *Monkrat* [1] |
| Cutter | lives; sails away | never met | GR24 (F) |
| Kruppe, Coll, Baruk, Derudan, Crone | all live (OST) | rule 14 | W *Anomander Rake*; OST DP [H] |
| Rallick, Vorcan, Torvald | live (OST) | rule 6 | W *Rallick Nom*; OST DP [H] |
| Barathol, Scillara | live (OST) | never met | OST DP [1] |
| Chaur | taken into the Azath | never | R23 [1] |
| Karsa, Samar Dev, Traveller | live; Traveller falls by Rake's body | "a giant in the street" | R23, R24.1 [1] |

## 4. Hard limits

The Fourth never stands in, at or near:

**In Darujhistan:**
- **K'rul's Bar**: inside, its door, its cellar and its fights.
- **The Phoenix Inn**: inside (plan Q5 already moves the door).
- The Vidikas estate, its balcony and tower, Challice's rooms.
- **Lady Varada's estate** (Nom Manor; OST DP: Madrun and Lazan Door) and Torvald's job there.
- **Coll's estate, his crypt, the Finnest House and its garden.**
- Baruk's estate (Dragnipur broken there).
- The Temple of Shadow; the gaol (Pallid, Baran, Chaur); the Gadrobi District's roofs where the Noms stand.
- **The street of Rake's death**, the Ravens, the Dassembrae chant, the Hounds' fight over the body, Envy and Spite.
- Stonny's school, Quip's bar, Kruppe's and Pust's mules, Harllo's family, the Prophet's crowd.
- **The mine** and both duels there.
- **The breach Traveller enters**, Cotillion's meeting.
- **Rake's barrow**: the Fourth are at the crowd's back.

**At Black Coral:**
- **Gradithan's hut**; the children's rescue.
- The Great Barrow's inside, or any talk with the Redeemer.
- The High Priestess's rooms, the New Andiian Palace, the deep cavern.
- The Seerdomin's and Spinnock's game: the squad may sit in the same tavern another night.
- The Liberators' plot.
- The Gate, Mother Dark's coming, the dragon over the camp.

**Elsewhere:**
- **The crossroads fight.**
- Bastion, Gothos's tower, Heath, Nimander's wagon, Clip's gate.
- The Kindaru and Skathandi, the Captain's carriage.
- **Dragnipur** and everything inside it.
- Hood's realm, the necropolis, the Trygalle.

**Never speaks with:** Picker, Antsy, Blend, Mallet, Bluepearl, Spindle, Monkrat, Duiker, Fisher, Kruppe, Coll, Murillio, Baruk, Crone, Rallick, Vorcan, Torvald, Scorch, Leff, Cutter, Challice, Gorlas, Barathol, Scillara, Chaur, Spite, Envy, Karsa, Samar Dev, Traveller, Cotillion, Shadowthrone, Rake, Endest, Spinnock, Korlat, the Seerdomin, Salind, Gradithan, the High Priestess, Nimander's party, Kallor, Brood, Gruntle, Mappo.
- Any may be seen at a distance or heard through a wall.
- A Guild knife, a Redeemer priestess and a camp pilgrim are the game's own people.

**The plan's seven chapters against these:** with corrections 1 to 8, no planned beat stands where canon names a scene. As drafted, Ch 1's timing, Ch 4's night and Ch 7's procession do contradict canon. Fix (A), plus 2 and 7, clears them.

## 5. Keep-open rules (proposed for `series-canon.md` §(a), from 70)

**What TtH lifts or closes:**
- **Rule 6:** lifts the sleep. Rallick and Vorcan are awake (W *Rallick Nom*, ch 3). The Azath stays shut, its inside never shown. Rallick may be "back" in rumour. **Vorcan is still never named**, and Lady Varada is never said to be her (OST).
- **Rule 11:** lifts to Tuft only, as the plan has it. Mother Dark comes to Black Coral (W *Mother Dark*). "A cold that turns warm", never named, never the Gate.
- **Rule 14:** closes for **Murillio** and **Rake** (the city learns both deaths). It still stands for Coll, Baruk, Derudan, Kruppe and the Crone (all in OST). Still **no Hound dies at the Fourth's hands**.
- **Rule 17:** Duiker lives at K'rul's (R1, R7). Book Eight may say "an old historian at K'rul's". Never his name, never how he lives.
- **Rule 19:** the Bridgeburner dead fight in Dragnipur (R24.1 S5). The narrator still never says "ascended". In a vision they are "the dead".
- **Rules 7 and 12** continue (Whiskeyjack only as Iskar Jarak, in a vision; the Fourth never "Bridgeburners").
- **Rule 13** continues: never "the T'orrud Cabal", even though OST uses it.
- **§(f)'s Hood line:** stays, with correction 7's timing.

**New rules:**

70. **The Guild's paper.** Never who paid, for the Fourth's knives or K'rul's. Never that the Fourth's names were on the K'rul's contract. The Grand Master is faceless: never Seba Krafar or Krute on the page. Vorcan's return to the Guild, if any, is headline at most (OST).
71. **K'rul's Bar is closed.** Mallet and Bluepearl die there; the Fourth hear it as news, after. Never the raid, Blend's wound, Picker's coma or her dream-realm. Spindle's pilgrimage and Monkrat are never met.
72. **Rake's death** is never seen: no street, no duel, no blow. The city hears bells, sees the moon burst and follows Brood's cart. Never Dragnipur's realm, the Gate of Darkness, or "sacrifice" as narration.
73. **Traveller** is "a swordsman" at most. Never Dassem Ultor, never the Dassembrae, never Hood's daughter.
74. **Hood falls; he never dies.** Never his beheading shown, never the Ice Throne, his Jaghut or his penance (DoD). Death "didn't answer" on the last night.
75. **The Guardians of the Gate** are nameless dead, from the morning after on. Never Whiskeyjack's name, Toc as Herald, or the Gate's arbiters (DoD).
76. **Dragnipur:** "the black sword is gone" at most. Never Brood's hammer, Draconus, the Chained, Apsal'ara, Ditch or Kadaspala.
77. **Black Coral after the night:** Mother Dark per rule 11. "A young lord in Black Coral" at most: never Nimander's name, Aranatha, Clip, or the Eleint blood.
78. **The Redeemer and the Dying God:** never the embrace, never Salind's or the Seerdomin's end. The camp ends in "fire from the sky", seen from far off or told after. Never Bastion or the Dying God's body.
79. **Karsa and the gods of war:** "a giant in the street". Never Toc's message, "torc-bearer", Karsa's daughters, or what he will do (DoD, TCG). Rule 24 continues.
80. **OST's ground:** never the Legate, the Seguleh coming, the Spawns (never by that name), the Malazan ambassador, Humble Measure's rise, Taya, or Tayschrenn as T'renn. The `daru` road may say "Malazans may come back one day", nothing more.
81. **The moon** cracks and bursts on the last night, and its pieces fall east. Never why, and never Challice's globe.
82. **Cutter, Challice and Gorlas:** the city's gossip only. Never Cutter's destination (TCG).
83. **Kallor lives.** Never his road after TtH (TCG). Never Orfantal's death, never Korlat's dragons by name.

## 6. Name check

Checked Nov 8 against: the OST Dramatis Personae (loaded); the TtH names in every R and W page above; web searches on the wiki (no hits for the picks); this repo's `src` and `docs` (grep). **The TtH, MoI, DoD and TCG Dramatis Personae did not load this pass**, so every "clear" below is supported, not closed.

**The Guild journeyman** (Daru, wants out; Ch 1 on `hunt`, Ch 2 on `quiet`):

| Candidate | Nearest found | Status |
|---|---|---|
| **Vasso** (recommended) | — | clear |
| Tamber | — | clear |
| Ardo | Ardata (spider goddess, R7) | clear; weaker |

**Rejected:** Dorrin (Dorin is Cotillion's mortal name, rule 13 territory), Fenn and Pell (have pages), Dester, Zechan, Giddyn, Krute (TtH's own Guild).

**The former Seerdomin** (Pannion veteran at the barrow, Ch 3):

| Candidate | Nearest found | Status |
|---|---|---|
| **Edrem** (recommended) | Edur (a people) | clear |
| Velkis | — | clear |
| Seltar | — | clear |

**Rejected:** Mathok (Sha'ik's warleader, HoC), Ulthan (too near Ultentha, MoI), anything Kul- (Kulpath), Gradi-, Sal-.

**Six spare names for minor NPCs:**

| Name | Use | Status |
|---|---|---|
| Orsa (she) | a Daru carter or dice-den keeper | clear |
| Benlo | a Gadrobi street vendor | clear |
| Calder | the caravan's master (the merchant's man, never the Council's) | clear |
| Thessaly (she) | an Andii-sworn human clerk in Black Coral | clear |
| Hurrin | a pilgrim from the north | clear |
| Mossa (she) | a Redeemer priestess at the camp's edge | clear |

**Known clashes for §(b):**

| Name | Status | Canon bearer | Note for writers |
|---|---|---|---|
| **Madryn** (Book One, Claw handler) | Kept; out of Book Eight | **Madrun**, "colourful guard of Nom Manor" with Lazan Door (OST DP) [1]; in TtH *(memory)* | Book Eight never writes Madryn. If a Book One memory line needs him: "the Claw's man". |
| **Kettle** (ours) | Kept; usable | The canon Kettle is in Lether (MT, RG), not in TtH or OST | No clash in Book Eight. Rule 60 was Book Seven's. |
| **Tuft** / **Tufty** | Kept | Raest takes a dead white cat for Chaur (R23 S9); W *Raest* names the cat Tufty | Never put Tuft and the Azath's cat in one scene. |
| **Vell** (Book One, Guild-marked) | Kept | The TtH Guild is canon; Vell's mark is ours | His Guild past is the game's. Never tie it to the K'rul's contract (rule 70). |
| Lim | Note | Shardan Lim (TtH, Council); Councilman Lim (GotM, dead); Jeshin Lim and Corien Lim (OST) | Never a new Lim. |
| Orr | Note | Turban Orr (GotM), Hanut Orr (TtH), Redda Orr (OST) | Never a new Orr. |
| Vasso, Tamber, Ardo, Edrem, Velkis, Seltar, Orsa, Benlo, Calder, Thessaly, Hurrin, Mossa | Clear (supported) | — | Orsa, Thessaly and Mossa are "she". |
| *Time Served* (title) | Clear | No canon title or phrase found | — |

## 7. Patrons (in §(f) style)

- **Hood:** answers Ch 1–5. Falls on the last night (correction 7). Never after.
- **The dead:** Ch 6 only. Nameless, marching elsewhere, a captain at their head never named (R22 S12–16).
- **The Guardians of the Gate:** Ch 7 and on (W *Hood*). Whiskeyjack's dead, never named (rule 75).
- **Treach:** may answer as in Books Three and Six. He is the god of war; Toc is sent to "all the gods of war" (R24.1 S25). **Gruntle**, his Mortal Sword, is in Dragnipur with the Trygalle that night (R24.1 S7–9) and is never on the page. A Treach boon never names him.
- **Soliel:** no TtH source either way [O]. Carries on as in Book Six (Ohl's temple on the `daru` road).
- **Oponn:** no TtH source [O]. Carries on, "diminished and scared" (§(f)).
- **Shadowthrone and Cotillion:** active, in person, in this novel. They meet Traveller (R6 S1), warn Karsa (R14 S7), and Cotillion is in the city on the last night (R22 S11). Shadow's Hounds run that night. A Shadow boon may not turn a Hound on the squad, or turn one off. GR24: Shadowthrone wanted Dragnipur (F); never say so.
- **The Redeemer:** never grants (correction 8). He speaks to the Seerdomin and refuses to act (R14 S5) [1]. A prayer to him at the barrow gets peace, never a boon.
- **The Dying God:** never.
- **K'rul:** the old god of the belfry. Kruppe dances for him (W, Prologue). May answer as a whisper in an old bell's hum, never through Kruppe, and never at K'rul's Bar.
- **Never:** the Crippled God (his Prophet is in the city, R17.2 S9), Poliel (rule 54), Mael (rule 56), Burn, Ardata, Gedderone as a voice.

## 8. Timeline (writers only, never printed)

- **Years after MoI.** *(memory: TtH about 1166–67 BS; RM's estimate puts it later.)* Writers say "years".
- **The Fourth's arrival:** on Book Three's `daru` road it reached the city the season after Coral, so it has lived there "years". Book Six's `highfist` and `hanarara` saves arrive with the Host's time-served list from Seven Cities, later; `home` comes west by ship.
- **Under fix (A):**
  - Ch 1: winter, weeks before the Fête.
  - Ch 2: the road east, weeks.
  - Ch 3–4: Black Coral, days to a week or two.
  - Ch 5: the road west, weeks, arriving on the Fête's last day.
  - Ch 6: the last night.
  - Ch 7: the morning after, and the days after.
- **Canon's order inside the Fête:**
  - First day: the knives (R1).
  - Mid-Fête: K'rul's raid (ch 11).
  - Later: Murillio's duel (ch 17).
  - Last night: Hood falls (ch 21); the camp and the crossroads (ch 22); Rake dies, the moon bursts (ch 23).
  - Morning: Dragnipur broken, the barrow (ch 24, Epilogue).
- **Never print a year or a count of months.**

## 9. The Visions (one per game chapter, canon eyes, nothing changed)

1. **Picker**, walking back from the market to K'rul's, cursing Blend's ankle. She has known for streets that a man is following her, and she has decided what to do about it (R1 S2, S6). For Ch 1, under fix (A) a vision of what is coming.
2. **Nimander** at the scarecrow fields, the rag-wrapped dead feeding the green, thousands more to the horizon. A priest takes his party for traders from Black Coral (R4 S2). For Ch 2.
3. **The Seerdomin** at his daily prayer before the Great Barrow, offering the Redeemer his company and asking peace for the pilgrims. A young priestess calls him "Benighted" (R4 S3). For Ch 3.
4. **Spinnock Durav** at the game in the tavern, watching his friend concede for no reason. Then Salind comes in, and Spinnock is surprised at what she does to him (R6 S6–S7). For Ch 4.
5. **Spinnock** at the crossroads, four torches on tall poles, a jug of wine he will offer and a tall old man who won't take it (R22 S2; W *Kallor*). For Ch 5. It echoes the torches the squad sees far off.
6. **Karsa** at the broken wall, telling Samar Dev to build walls in her mind against what has arrived, and looking up to see the moon in pieces (R22 S9). For Ch 6.
7. **Iskar Jarak** at the head of the dead, come of their own free will into a place that is ending, beside the Bridgeburners and the Grey Swords' Brukhalian (R22 S12–16; R24.1 S5). For Ch 7. The narrator never gives his old name; the Fourth's sergeant knows the voice.

Spare: **Endest Silann** alone as the shroud thins and the light comes down in pieces (R22 S8; R24.1 S1). Use him if Ch 7's vision should be Black Coral's.

## 10. Open questions (for David's copy; the lead adds them to `open-questions.md`)

Recommendation first in each.

1. **Correction 1 (the calendar): fix (A), recommended.** Ch 1 moves before the Fête; Ch 4 is the camp's first turn; the squad is back for the last night. (B) keeps them in Black Coral; (C) is all Darujhistan. *This one changes the build.*
2. **Season (page check, ch 1):** is the Fête at winter's end (W *Fête*) or summer (W's book page)? Until checked, the text says "the Fête" and no season.
3. **How long is the Fête?** Page check. It bounds Ch 5's arrival and Ch 6.
4. **Who paid the Guild?** Page check, ch 1–11 and 24 (Seba Krafar's scenes). Recommendation: keep it unsaid whatever the answer (rule 70).
5. **Which stretch of the wall do the Hounds break?** Page check, ch 21–22. Recommendation: the Fourth's breach is unnamed either way.
6. **Do Envy and Spite kill the five Hounds of Shadow, or drive them back** (R23's two summaries disagree)? It bears on rule 14's wording only.
7. **Did any Andii walk behind Brood's cart** (Korlat, Spinnock)? Page check, ch 24 and the Epilogue. Recommendation: the Fourth see no Andii either way.
8. **The fates of the Seerdomin, Salind and Endest** (ch 24, Epilogue). Not needed for the build; rule 78 holds.
9. **Black Coral's trade with Darujhistan:** any caravan, road or market named (ch 4–6, 10)? Recommendation: one merchant's venture, as correction 4.
10. **Madrun in TtH:** is he in TtH or only OST? Recommendation: Madryn stays out of Book Eight either way.
11. **Where Cutter kills Gorlas:** W says the mine; *(memory)* says the city. Not needed for the build.
12. **Who the "two of the former Bridgeburners dead" are:** W gives Mallet and Bluepearl. Page check, ch 11, before the Fourth hear the names in Ch 5.
