Tue Nov 10, 2026, 10:37 AM PST. The plan for Book Ten, beside *The Crippled God* (not built; branch `book10` from v12.0.4). The last book of the series.

# Book Ten: beside *The Crippled God* (plan)

**At a glance:** abbreviation `tcg`, ids `b10_`, shelf `src/180`–`199`, version v13.0.0, branch `book10`.

## Settled (David, Tue Nov 10, 2026, 10:37 AM PST)

1. **Who comes:** the Third and the Letherii taking turns (Third Ch 1, 3, 5, 7; Letherii Ch 2, 4, 6). Book Eight's Fourth (`east`) lands on the Kolanse coast and joins the Third for the last chapter only.
2. **The system: Witness is the main track.** What the squad still believes it marches for drives the checks and the roads. Thirst and short rations are in the scenes and the costs, not a second counter (Claude's call: Book Nine's Rations are not carried; a transfer's Rations become one line of the opening).
3. **Mortal fights: one per squad**, each squad's last chapter: the Letherii at the pass (Ch 6), the Third at the end of the crossing (Ch 7).
4. **The end: a series coda** after Book Ten's own finale (one page per squad from every finished book on the device, then the credits). **Title: *Witnessed*.**

## Settled after the canon sheet (David, Tue Nov 10, 2026, 11:05 AM PST)

5. **The Letherii's mortal fight is the feint battle before Kolanse City** (TCG ch 23), on a stretch of the allied line canon never names; there is no pass on their road (the pass is Paran's). Brys and the Voice, the Perish centre, the seawater cloud, Spax with the Gilk and Grub's relief are hard limits (`docs/tcg-canon.md`). Ch 4 is the long southern march, no mountains.
6. **The Third's mortal fight: lent to the regulars' line** on the last nights of the crossing; it holds a stretch far from the Adjunct, Fiddler's hill and the Khundryl until Paran's relief comes over the ridge. The hill itself is never entered.
7. **The Fourth comes with Onearm's Host from Aren**: it finds its old army at Aren and comes over the ridge with the relief onto the Third's stretch in Ch 7; how it got there is one page.

## Settled after the engine (David, Tue Nov 10, 2026, 11:53 AM PST)

8. **Witness in fights:** hollow −1 to hit, witnessed +1; the middle tiers nothing (`B10_WITFIGHT`).
9. **Levels 25–28:** +1 damage at 25, +1 armour at 27 (`lvDmg`, `lvAc`).
10. **The gods' silence:** a wiped fight still restarts, with no boon, once Hood is gone and the Errant has fled (from Ch 3).
11. **One Forkrul Assail** leads the Kolansii in the Third's mortal fight, on its unnamed stretch; tuned to the targets at balance.

## Settled during the build (David, Tue Nov 10, 2026, 4:28 PM PST), shipping with v13.0.0

12. **The lance thrust** (`AB.b2_lance`, every book that has it): it still hits an enemy up to 2 tiles off for 1d10+2 plus the level bonus; on a hit the enemy is driven back a tile (free swings for every squadmate it is driven out of reach of, as Shield Drive; bosses and the very heavy don't move) and bleeds 1d4 at the start of its next two turns. Named for its carrier: Ramin's *Lance Held Short*, Orvas's *The Khundryl Lance*, Brune's *The Fish-Spear*, Sorvan's *The Bluerose Lance*. Enemies now bleed (engine).
13. **Allies know fire** (David, Tue Nov 10, 2026, 4:53 PM PST): an allied unit walks round burning tiles, never ends a move in fire when it can help it, and steps out of fire it stands in. Foes unchanged. `tools/allyfire_test.mjs`.

## David's questions as asked (recommendation first)

1. **Who comes.** Recommended: the Third and the Letherii taking turns, as in Books Six, Seven and Nine; the Fourth (Book Eight's `east` road) lands on the Kolanse coast and joins the Third for the last chapter only. Alternatives: three squads taking turns; or the Third and the Letherii only, the Fourth never comes.
2. **The system.** Recommended: Water (0–10), Book Nine's Rations renamed and harder (the crossing is thirst, not hunger), with Witness carried from Book Nine as the second track. Alternatives: Witness as the main track; or a new track.
3. **Mortal fights.** Recommended: one mortal fight per squad, each squad's last chapter (the Letherii at the pass, the Third at the end of the crossing). Alternative: one only, the Third's.
4. **The end.** Recommended: Book Ten's own finale (a fate page per squadmate, as every book), then a series coda: one page per squad from every finished book on the device, then the credits. Title *Witnessed* (answering Book Seven's *Unwitnessed*). Alternatives: Book Ten's finale only; another title.

## The spine (draft, from memory [O]; the canon sheet checks every line)

- The army splits after the Nah'ruk battle: the Bonehunters east into the desert with the Adjunct; Brys's Letherii, with the Bolkando and the Perish, south toward the mountains and the pass [O].
- The Bonehunters' crossing: thirst, the army failing, the Adjunct's purpose kept [O].
- The southern force at the pass; the Perish's part; the Letherii's battle [O].
- Kolanse and the Spire; the end of the Crippled God's chains [O]. Headline only for the squads, canon's scenes never entered.

## The chapters (draft; replaced by the canon sheet's chapter table, `docs/tcg-canon.md`, with decisions 5–7)

| Ch | Squad | Draft |
|---|---|---|
| 1 | Third | The split; into the desert behind the Adjunct |
| 2 | Letherii | South with Brys; the allied column |
| 3 | Third | The crossing; Water begins to fail |
| 4 | Letherii | The mountains; the road to the pass |
| 5 | Third | The crossing's worst; a Witness beat |
| 6 | Letherii | The pass (mortal); the Letherii's road out |
| 7 | Third | The far side; the last fight (mortal); the finale |

## Claude's calls (David may overturn any)

- **Levels:** the Third fresh at 24, cap 28; the Letherii fresh at 16, cap 20. Each squad keeps its own levels.
- **Transfers:** a finished Book Nine save brings the Third (`adjunct` or `south`) and the Letherii (`escort` or `adjunct`). A Third on `south` marches with Brys and its chapters follow the southern column, where it may meet the Letherii (the Book Nine continuity item). A Letherii on `adjunct` crosses with the Malazans. A `home` road from Book Nine starts fresh with the canon defaults. A fresh start: the Third on `adjunct`, the Letherii on `escort`.
- **Readings:** the Deck for the Third, the Tiles for the Letherii.
- **Recruits:** one per squad, named after the series-wide name check.
- **Standing for every book** as in Book Nine: a reading with a vision, a trick behind a hard check, two to four items with art, a key choice, "Not now" on every onward step, a "yes, but" on every check, title art, flavour line and patch, glossary, journal, Deeds, five games at the fires, the balance targets of Nov 6. Chapters one agent at a time.
- **From the canon sheet (Nov 10):** a Book Nine `adjunct` Letherii may cross the desert with the Malazans (Henar Vygulf did; W). The Errant stops answering after Ch 2 (he flees into the warrens; W). Recruits: Pruss (the Third) and Tirren (the Letherii, she), name-checked in the canon sheet.
