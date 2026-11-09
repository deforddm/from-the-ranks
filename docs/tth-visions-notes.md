Mon Nov 9, 2026, 4:08 AM PST. Book Eight, the seven visions of *Time Served* (`src/148_b8_visions.js`, art `src/148b_b8_visions_art.js`, test `tools/b8visions_test.mjs`), on `book8-visions` against the Book Eight engine (v11.0.0, not shipped).

# Book Eight visions notes

Built on Book Seven's pattern (128/128b): `VISIONS.b8v1` to `b8v7`, `book:'tth', ch:n`, one per chapter, for any card. 36b picks them up by book; 21's card screen offers "✦ Look into the card" whenever `visionFor` finds one (it runs outside 140c's `b8As`, so `S.book` is `tth` there). Each vision comes back to `b8_c<n>_card` (36b's `cardNodeName`, already `b8_c` for `tth`), whose one button goes to `B8READ[n].back`. No chapter file and no engine file changed: every chapter already registers `b8_c<n>_read` and `b8_c<n>_card` (the lint orphans the chapter notes mention are these hooks).

**The readers.** 140c wraps `VISREADER` in `b8As`, so `visReader()` is Book Three's chain: Tuft, else Sohra (bones), else Old Benna. The closing step (`b8vEnd`) has a line for each and an `other` fallback, and opens the house way: "Tuft lets the card go", "Sohra sweeps the bones together", "Old Benna puts the card down". Figures `tuft`, `sohra`, `b3v_benna`. "Her hands are cold" closes only the first and last vision, for each reader (six in the book; the trope cap is eight). The readers speak from the chapter's reading place (B8READ[n]): the table at the door, the tailboard, the sill, the mat, the grass, the step, the shingle.

## The seven (tth-canon §9)

| Ch | id | Eyes, moment | Canon in it (source) | Stops before | Words-only flags |
|---|---|---|---|---|---|
| 1 | b8v1 | Picker walking home from the market, followed, deciding | Blend's "sprained" ankle, the errands, Mallet's gloomy retirement, a professional tail spotted long before he moves, she kills him (R1) [1, with §9.1] | The blow (it is "over in the time it takes a lamp to gutter"); the second knife at the bar; who paid (rule 70); the bar's name and door (71). Tuft: "That hasn't happened yet" (fix A) | `b8v1_read` purse/guild, `b8v1_basket` down/keep |
| 2 | b8v2 | Nimander at the scarecrow fields | Rag-wrapped dead on poles feeding the plants, thousands to the horizon, root balls like rows of heads; a priest of the Dying God takes them for traders from Black Coral; the Pannion towns rising; Nimander's voices; "the one true god is time" (R4 S2) [1, with §9.2] | His kin's names, the stranger with them, the Eleint blood (77); Bastion, the god's body (78); no wagon | `b8v2_walk` walk/look, `b8v2_said` trade/quiet |
| 3 | b8v3 | The Seerdomin at his prayer before the Great Barrow | Daily prayer, not for redemption ("a dream of the deluded"); his company for the Redeemer's loneliness; peace for the pilgrims; offerings that cost the poor most; a young priestess calls him "Benighted", a title of respect, and says he is chosen; he refuses (R4 S3) [1, with §9.3] | The task's content (the children, a hard limit); the priestess's rank and name; any answer from the barrow (correction 8); his end (78) | `b8v3_pray` here/silent, `b8v3_no` no/else |
| 4 | b8v4 | Spinnock Durav at the tavern game, then Salind | The game; kelyk's stains spreading through the city; the Seerdomin yields a game he could win, no reason given; Salind comes in, he calls the tavern his refuge; Spinnock waits outside (R6 S6–S7) [1, with §9.4] | Salind's name (unnamed: "a young woman from the camp"); her end (78); what passes between her and the Seerdomin | `b8v4_play` press/slow, `b8v4_go` stay/out |
| 5 | b8v5 | Spinnock at the crossroads, four torches, the old man | Four torches on high poles; Spinnock waiting; "the city is not for you"; Kallor tries hard not to fight, and draws (R22 S2) [1]; the jug of wine (§9.5, W *Kallor*) [1] | The blow and Spinnock's wounds; Kallor's name (he is "the old man", "the old king"); why Spinnock was sent, by whom, and where Kallor is going (83) | `b8v5_wine` offer/wait, `b8v5_last` sorry/none |
| 6 | b8v6 | Karsa at the broken wall, Samar Dev, the moon | The wall the Hounds wrecked; Samar overwhelmed; Karsa tells her to raise walls in her mind against "the one who had arrived", who is blazing; they follow the swordsman in; the moon shattered (R22 S9) [1, with §9.6] | Who arrived (never named; rule 74); the swordsman's name (73); Toc, torcs, daughters, what Karsa will do (79); why the moon (81); its pieces slide east | `b8v6_say` look/hold |
| 7 | b8v7 | Iskar Jarak at the head of the dead | The dead come of their own free will (R22 S12–16) [1]; the Bridgeburners at the point, Brukhalian's Grey Swords on a flank (R22 S16) [1]; the very old dead too weak against the storm, Brukhalian "immovable", the Bridgeburners stand (R24.1 S5) [1] | Hood at their head, Draconus, the wagon, the chains, the dragons, the Seguleh, Dujek and Bult (72, 74, 76, 80); "Dragnipur" (the place is "a place that is ending"); Whiskeyjack's name (7, 75); "ascended" (19); "Bridgeburners" (the narration says "his own", "a company he led") | `b8v7_order` close/let, `b8v7_word` hold/with |

The spare (Endest Silann, §9) is not used.

## Art (148b)

- New figures: `b8v_picker` (retired: shirt and vest, a knife, the basket; it is put down on b8v1's last step if she set it down), `b8v_nimander` (young, long loose hair, a road cloak; `o.phase` varies the kin's cloaks), `b8v_seerdomin` (big, grey, the badge cut off his coat; `o.kneel` at the barrow), `b8v_spinnock` (iron-grey hair, long coat over mail; `o.draw` the sword up at the crossroads), `b8v_samar` (`o.hands` at her temples), `b8v_pilgrimgirl`, `b8v_iskar` (grey kit, grey beard, one leg bearing less, a little transparent). Reused: `b4_c7_karsa`, `kallor`, `greysword` (Brukhalian), `b3_c7_bridgeburner`, `b2soldier`, `b3_c4_priest`, `b8_c3_priestess`.
- Backdrops: `b8v_market`, `b8v_fields`, `b8v_barrow`, `b8v_tavern`, `b8v_crossroads`, `b8v_wall`, `b8v_dead`, and `b8deck` (the reader at each B8READ place; a card for Tuft and Benna, bones and a thread of smoke for Sohra).
- Headline only: Picker's lane is empty when it happens; the scarecrows are rag shapes on poles with a dark streak; the crossroads ends with two blades up; the storm is a grey wall, the third rank of the dead fading where it touches.
- Sheet: `/tmp/claude-0/-home-claude/c7cefdea-0715-51c5-a1c3-439672d89b23/scratchpad/b8_visions_sheet.png` (scratch, regenerable).

## Claude's calls

- **Picker's city is festive**, "in a mood to celebrate something" (R1 says New Year; open question 2 leaves the Fete's season unsaid, so no festival is named). The vision is of what is coming (fix A); each reader says "not yet".
- **Picker's tail is "Guild" only in her own guess** (the choice); the narrator says "a professional", never whose.
- **Nimander's voices** are "the dead he carries"; his lover and Phaed are not named. His kin are "cousins".
- **The Seerdomin's task** is "a thing to be done"; the children are never mentioned.
- **The game** is unnamed (canon doesn't name it); the friend "says, quietly, that he yields".
- **Salind looks at Spinnock in the street as she passes** and something in him "opens one eye". R6 has her come in and Spinnock wait outside; the look in the street is Claude's, carrying §9.4's "surprised at what she does to him".
- **The crossroads** has the jug (§9.5) though R22's summary doesn't mention it; Spinnock sets it down unbroken.
- **Iskar Jarak says Book One's words**, "Anything else, ask it now", the line the Guardian says at the back of the crowd in Ch 7 (`b8_c7_guardian_say`): the reading is at first light, before the procession, so the vision is the first echo and the Guardian the second. Neither names him.
- **Old Benna washed his shirts at Pale** (Ch 7) and saw the old man's face across the field at Pale (Ch 5): Benna was Onearm's Host's laundress (60, 140c).
- **The bells** begin at the end of b8v7 "in a city by a lake": the morning after, under the Fourth's reading.

## Open, for David's copy

- TtH ch 1: whether Picker's walk is during the Fete or another New Year (open question 2).
- TtH ch 6: what passes between Salind and Spinnock that night (§9.4's "what she does to him").
- TtH ch 22: whether Spinnock brings wine to the crossroads (W *Kallor*; R22's summary doesn't say).
