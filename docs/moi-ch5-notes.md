# Book Three, Chapter 5 — "South of the Catlin": continuity notes

Tue Oct 13, 2026. File `src/65_b3_ch5.js` (exports `B3CH5`, `number:'Five'`); art in `src/65b_b3_ch5_art.js`. All ids carry `b3_c5_`.

## Shape

Four areas, 16×12:
1. `b3_c5_shore` — the south shore of the Catlin (morning). The first halt: the Deck (`b3DeckChoice(5)`), Ohl on the poisoned warren, Sohra on the Mhybe gone north, Dannet on how far the Domin goes. NPCs: Hurlochel (the race for Coral, Kallor saying it loudest), the Seventh's quartermaster (salve 5 silver, sharper 8), a gleaning woman, an Ilgres shaman (the trick). Exit `>` → the ford (declinable).
2. `b3_c5_ford` — a ford two days south (noon). The lieutenant, two cadre mages (Tuft is recognised as having served on the High Mage's staff "the season before Pale"; nothing more), a Rhivi rider (`aid` if asked). Fight `b3_c5_ford`, then the drowned mage on the far bank, and Orley (the Seventh, nineteen) on Ohl's list. Onward: "Cross. South." (declinable).
3. `b3_c5_town` — a burnt town in rain. An old man with a dead cat (a lane by the smithy → surprise), a Grey Sword patrol (`aid` if asked). Fight `b3_c5_town`; the starving cut loose (fed or pointed north). Onward to the halt (declinable).
4. `b3_c5_well` — a dead village at night, one well. Tav on the Fourth Regiment's water cart; Whiskeyjack on a bucket (the leg: "after Coral, Mallet can have a month"); a Rhivi herd-mother; the man in the fur collar. The well goes bad (a dead calf, a Host knife with the mark filed off). Calm it (might 14 / Sohra wits 13) or blood (Tav's palm cut). Evidence: haul the calf (wits 13), the old woman witness. Confront: guile 14 to make him say it, else fight `b3_c5_wellfight`. Then the key. The fire: rest (`b3Rest`), swap the waiting recruit in, Kettle's quorl count, close (`chapterEnd(5, key)`), all declinable.

Fights (xp at engine pay): `b3_c5_ford` 170 + stage2 "The far bank" 100 (aid: Rhivi riders, need 7 if asked else 9; optional sharper `pre` into the river stuns the line in the water; reading the ford gives surprise); `b3_c5_town` 150 + stage2 "The square" 90 (aid: Grey Swords, need 7 if asked else 9; the smithy lane gives surprise); `b3_c5_wellfight` 80 (avoidable by the guile check). Total about 590. New foes: `b3_c5_spear`, `b3_c5_sling`, `b3_c5_file`, `b3_c5_driver`, `b3_c5_priest` (the Seerdomin on the steps, boss), `b3_c5_kman`, `b3_c5_ksword`.

Balance (`tools/balance.mjs` with a scratch patch that builds a Book Three save: level 6, trust 6, Sohra or Dannet as recruit, the Domin on): Soldier, smart 100% on all three (HP lost 12–24% ford, 13–16% town, 5% well; downs ≤0.5 a fight), naive 67–100%; one level under the curve (5): ford 90%, town 100%; Bridgeburner at level 6: ford 60%, town 60%, well 100% (hard, as wanted).

## The key: `S.f.b3_c5_key`

- **`brood`** — the Fourth walk Kallor's man (with Whiskeyjack) to Caladan Brood's fire and tell it in front of Brood and Korlat. Kallor comes into the light, calls the man a fool, disowns him, looks at the sergeant once: "Malazan." Trust +3, Sohra loyalty +1. **`S.f.b3_kallorEnemy = 1`** (Chapter 7 reads it). Whiskeyjack: "He'll remember you. Mind it. He remembers me."
- **`quiet`** — settled behind the smithy wall: a broken nose, back to his own lines, no names. Trust +1. The Coral rumour keeps running in Brood's camp — **Chapter 6 should take trust −1 for `quiet`** (the brief's rule).

Either way the well is shared by midnight, and the herd-mother gives the Rhivi water-skin.

## Flags other chapters may read

| flag | values | meaning |
|---|---|---|
| `b3_domin` | 1 | set on chapter start, on the first node, and on any `b3_c5_` fight (warrens poisoned) |
| `b3_c5_key` | `brood` / `quiet` | the key |
| `b3_kallorEnemy` | 1 | on `brood` only |
| `b3_kallor` | 1 | Kallor seen/named (Hurlochel, the man in the fur collar, Brood's fire) |
| `b3_legSeen` | 1 | if the sergeant asks Whiskeyjack about the leg (`b3_c5_leg = 1`) |
| `b3_listAdds` | +1 | Orley, at the ford (`b3_c5_orley = 1`) |
| `b3_c5_mhybe` | 1 | Sohra told the sergeant the Mhybe has gone back to Capustan with Coll and Murillio (unnamed: "the two Daru") |
| `b3_c5_race` | 1 | Hurlochel explained the race for Coral |
| `b3_c5_quorls` | 1 | Kettle has counted the quorls (31 / 26 / 19) and written the mismatch in the ledger — a seed for Chapter 6's secret lift; it says nothing of where they go |
| `b3_c5_inc` | `calm` / `cut` | the well incident; on `cut` Tav's palm was cut catching a blade |
| `b3_c5_caught` | `talked` / `fought` | how Kallor's man was taken; on `fought` one hired sword died |
| `b3_c5_remnants` | `fed` / `north` | the starving in the burnt town |
| `b3_c5_glean` | `fed` / `north` / `left` | the gleaning woman on the shore |
| `b3_c5_blood` | squadmate id or `sgt` | who learned Barghast Blood-Iron (holds the knife) |
| `b3_c5_tavBrisk` | 1 | Brisk sat with Tav at the cart ("We don't leave people. I'm only saying where I'll be.") |
| `b3_c5_drowned`, `b3_c5_fordDone`, `b3_c5_townDone` | 1 | progress |

Flags read from earlier chapters (with defaults when unset): `b3_legSeen` (Ch1), `b3_wjNoticed` (Ch4 `share`), `b3_kallorSaw` (Ch1 `mhybe`), `b3_sohraDone` / `b3_dannetDone` (waiting recruits, via `b3Waiting`), Book One `c7_letter` via `b3Was` for Brisk's line about Tav's letter.

## Trick, items, Deck, glossary

- **Trick** `b3_c5_blood` *Barghast Blood-Iron* (`spirit:true`, so the Domin never burns it): ✦ might 16 at the Ilgres shaman's fire on the shore (edges: Brisk +2, Dannet +1, Sohra +1, Tuft −1, Kettle −1). Battle half `t_b3_c5_blood`: once a fight, the bearer or an adjacent squadmate's blows do +(1+lvT) for the fight, +2 more against a K'ell Hunter.
- **Items** (all with `ART['item/…']` by the artist): `b3_c5_knife` Blood-iron knife (trinket, +1 atk; +2 damage against Seerdomin and K'ell Hunters for its wearer; given on the trick's success); `b3_c5_chain` A Pannion chain of office (trinket, +1 guile; off the Seerdomin on the temple steps); `b3_c5_skin` A Rhivi water-skin (trinket, +2 hp; while carried, a fire rest via `b3Rest` lowers dread 1 more; from the herd-mother after the key).
- **Deck** `B3DECK[5]`: the Consort, read at the first halt on a cart-wheel (Tuft / Sohra / Old Benna lines).
- **Glossary** (GLOSSX.moi, chapter 5): *The race for Coral*, *Blood-iron*.

## Engine additions (all in `65`, guarded by `S.book === 'moi'`)

- wraps `startChapter` and `startBattle` to set `S.f.b3_domin = 1` for Chapter 5 and its fights;
- `c5Water()` wraps `TILEX.b3_c5_domin(_night)` so battle tile `o` (deep water: blocks movement, not sight) draws as the river `~`;
- wraps `attack` for the blood-iron bonus and the knife's bonus against Seerdomin / K'ell Hunters;
- wraps `b3Rest` for the water-skin;
- `SCENEX.b3_c5_camp ??=` Book One's camp drawing (the artist's backdrop overrides it).

## Inventions and things left open on purpose

- The Beklite rearguard at an unnamed ford, the burnt town (unnamed; not Setta or Lest), the dead village, Orley, the cadre mage with the wet sleeves (unnamed, a woman, grey braid), the Seventh's lieutenant, the herd-mother, the old man with the cat, the old woman witness, the man in the fur collar (never named).
- Kallor is never in a fight. He appears only at Brood's fire on `brood`, and as a far figure by Brood's standard.
- The Mhybe is not south of the river (canon: Coll and Murillio take her back toward Capustan before the crossing). Silverfox is seen only far off ("a girl… nobody sits near her").
- Dujek's split is not shown; only Kettle's quorl count hints that numbers do not add up.
- Tuft and the cadre mage: the mage recalls Tuft on "the High Mage's staff"; the High Mage is never named (series rule 3).

## Canon doubts

- Who drowned the Pannion mage, and where: unknown in the sources read; given to unnamed Host cadre mages at an invented ford.
- Whether the armies fought at any ford south of the Catlin: unconfirmed (the rearguard is small and invented).
- Hurlochel: the canon sheet's table says "once Brood's, now the Host's (outrider)"; I could not confirm the Brood half, so the text calls him only one of the Host's outriders, Dujek's own.
- The research behind this chapter is in the "Chapter 5 re-check" section appended to `docs/moi-canon.md` in this checkout.
