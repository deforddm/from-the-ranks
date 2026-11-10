Mon Nov 9, 2026, 4:45 PM PST. The plan for Book Nine, beside *Dust of Dreams* (not built; branch `book9` from v11.0.0).

# Book Nine: beside *Dust of Dreams* (plan)

**At a glance:** abbreviation `dod`, ids `b9_`, shelf `src/160`–`179`, version v12.0.0, branch `book9`.

## Settled (David, Mon Nov 9, 2026, 4:44 PM PST)

1. **Two squads, taking turns**, as in Books Six and Seven:
   - **the Third** (Book Seven's, on the `adjunct` road) with the Bonehunters' marines and heavies, in Chapters 1, 3, 5 and 7;
   - **the Letherii** (Book Seven's Sixth Company, on the `army` road) with Brys's brigades, in Chapters 2, 4 and 6.
   - The Fourth (Book Eight's `east` road, a ship toward the Malazans) does not come in Book Nine; its ship reaches the army in Book Ten.
2. **The system: Rations, with a little Witness.** Rations (0–10) is the column's food and water: short rations cost health and checks; foraging, finds and choices refill it. Witness is a few beats in the key choices (Tavore's "unwitnessed"): what the squad still believes it marches for. Rations is the main track.
3. **The mortal fight is the Nah'ruk night**, the Third's last chapter: the K'Chain Nah'ruk fall on the marines and heavies, and the Third holds a part of the line canon never names. Deaths are permanent. Canon outcomes are untouched.
4. **Levels:** the Third fresh at 19, cap 24; the Letherii fresh at 11, cap 16. Each squad keeps its own levels (as Book Seven).
5. **Title:** *Dust on the Boots*.

Standing for every book: a Deck reading (the Third) or a Tiles cast (the Letherii) with a vision through canon eyes, a trick behind a hard check, two to four items with art, a key choice, "Not now" on every onward step, a "yes, but" on every check, the title art, flavour line and patch, glossary, journal, Deeds, a finale with a fate page per squadmate and roads out, five games at the fires. The balance targets of Nov 6. Chapters one agent at a time unless David says otherwise.

## Settled after the canon sheet (David, Mon Nov 9, 2026, 5:23 PM PST)

6. **The Letherii are in the Nah'ruk battle** (they are the Bonehunters' "Letherii escort", W ch 23; `docs/dod-canon.md`). Their Ch 6 is the battle's day from their own stretch of line: a hard fight, not mortal; they choose their road at dusk. The Third's Ch 7 is the mortal rearguard into the dark. The canon sheet's chapter table (`docs/dod-canon.md`) replaces the draft below.

## The spine (draft, for the canon sheet to check)

Marks: [T] the novel's text, [W] the wiki, [R] Reactor, [O] memory only. The canon sheet re-checks every line before any writing.

- The Bonehunters in Letheras after *Reaper's Gale*; the Adjunct's purpose kept from her own army; the march east into the Wastelands toward Kolanse [O].
- Brys Beddict's Letherii march too, as "brigades under command of Brys Beddict", with their own supply train and Bluerose cavalry (DoD p. 763) [T].
- Elsewhere (headline only for the squads): the Perish Grey Helms and the Khundryl through Bolkando; the White Face Barghast under Onos Toolan; the Snake children; the K'Chain Che'Malle seeking champions; the Shake; Icarium [O].
- The end: the K'Chain Nah'ruk fall on the marines and heavies [R, the wrap-up's "Nah'ruk battle 1 and 2"]; Tool dies [R]; the Bonehunters' fate left open into *The Crippled God* [R].

## The chapters (draft; the canon sheet and the brief fix them)

| Ch | Squad | Draft |
|---|---|---|
| 1 | Third | Letheras, the last days before the march; a fresh start or a Book Seven transfer |
| 2 | Letherii | Brys's brigades muster; Malazan sergeants' drill; out of the city behind the Bonehunters |
| 3 | Third | Into the Wastelands; Rations begins to bite |
| 4 | Letherii | The Letherii column on its own road; water and the supply train |
| 5 | Third | Deep in the Wastes; the army's thirst; a Witness beat |
| 6 | Letherii | The Letherii and the Bonehunters apart near the end; the Letherii road chosen |
| 7 | Third | The Nah'ruk night (mortal); the Third's road chosen; the finale |

## Claude's calls (David may overturn any)

- **Transfers:** a finished Book Seven save brings the Third on `adjunct` and the Letherii on `army` (one save holds both, as Book Seven's did). A fresh start uses Book Seven's canon-default survivors.
- **Readings:** the Deck for the Third, the Tiles for the Letherii (as Book Seven).
- **Recruits:** two per squad, named after the canon sheet's series-wide name check.
- **Patrons:** the Guardians of the Gate where Hood answered (Hood falls in Book Eight); the Errant for the Letherii sergeant, as before.
- **Roads out** (to Book Ten, *The Crippled God*): fixed in the brief, so each squad has a road into the Glass Desert and Kolanse and at least one road out of it.
- **The page checks David asked about** (Nov 9: "you may find the answers in the later books"): the canon sheet also looks for Q21 (*The Bonehunters*) and Q23 (*Reaper's Gale*) answers in *Dust of Dreams* and *The Crippled God*.

## Claude's calls from the engine and brief (Mon Nov 9, 2026; `docs/v12.0-notes.md`, `docs/dod-book-brief.md`)

1. Rations are counted per squad, 0–10, starting at 6; Ch 1's `stores` key brings the Third to 8. The march eats 2 at the start of Ch 3–5 and 1 at Ch 6–7.
2. Below 5, squadmates start each fight 5/10/15% down on health; `rations:true` checks get +1 to −3, and a hungry squad takes −1 on other checks.
3. Witness: one beat a chapter from Ch 3, `kept` or `doubt`, the first answer standing; ±1 on `witness:true` checks; it colours the Ch 6 and Ch 7 roads.
4. Levels 22 and 23 give +1 damage and +1 armour; 24 adds nothing new.
5. Chapter titles: *Letheras, Emptied* · *The Escort* · *The Road East* · *The Ration Book* · *Short Rations* · *Dust on the Horizon* · *The Rearguard*.
6. Keys: Ch 1 `stores`/`street`, Ch 2 `wagons`/`drill`, Ch 3 `boil`/`press`, Ch 4 `book`/`forage`, Ch 5 `share`/`keep`, Ch 6 `line`/`train`; the Third's roads `adjunct`/`south`/`home`; the Letherii's `escort`/`adjunct`/`home`.
7. Recruits: Brask (Ch 1) and Tegra (Ch 5) with the Third; Brennet (Ch 2) and Kaedra (Ch 4) with the Letherii. Hood's faithful are answered by the Guardians of the Gate; the recruits have no gods.
8. The Nah'ruk are "short-tails" on screen: armoured, half damage from sharpers and burners, cussers tear them open, their sorcerers' blows count as sorcery.
9. The fever is a wound (−1 to hit) that only a chapter gives.
10. No Neffarias Bredd rumour in Book Nine: canon uses the name itself in DoD.
11. A sergeant carried from Book Seven gets a new save slot; the Book Seven save is untouched.
12. The title art: a lone dusty soldier walking after the column, the short-tails' dust far off. The patch: both squads' patches on one dun strip with a stitched boot-print.

## Settled at balance (David, Tue Nov 10, 2026)

7. **Balance: to the targets**, Book Nine tables only (Soldier ~90%, 85–97; Bridgeburner ~75–80%, 65–85, none under 60; first fights and survive fights near 100% on Soldier). Untuned, the bot won all 22 fights on both difficulties. Final numbers go to David before the ship.
8. **Rations floor at 2 before Ch 7:** the column's pot tops the Third up to at least 2 before the rearguard.

9. **Balance approved** (David, Tue Nov 10, 2026, 5:08 AM PST: "Approve and ship"): Soldier mean 93.0% (min 80), Bridgeburner mean 83.9% (min 60); the rearguard 90% on both, 0.6 / 1.0 dead a fight (at Rations 2: 80% / 1.2 and 65% / 2.4). `docs/v12.0-balance.md`.
