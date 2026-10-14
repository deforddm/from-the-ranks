# Book Three, Chapter 3 — "Capustan": continuity notes

Tue Oct 13, 2026. Writer's notes for `src/63_b3_ch3.js` (`B3CH3`), art in `src/63b_b3_ch3_art.js`. For the writers of Chapters 4–7 and the lead.

## Shape

Four areas, 86 nodes, four fights (three with a `stage2`).

1. **`b3_c3_halt`** (ground `b3camp_night`): the last halt, three leagues short of Capustan, the city burning on the skyline. The Deck reading (`b3DeckChoice(3)`, lean card the Mason). Whiskeyjack (the leg: `b3_legSeen`, "After Capustan"), Hurlochel, Korlat ("do not look at him for long"), a Rhivi rider (the Mhybe asks to be carried in a litter; Tuft sees the child in red wool, older again), Tav (Brisk only). **Fight 1 `b3_c3_picket`** (the Pannion picket on the rise across the north road; xp 110 + stage2 "the back of the rise", a Seerdomin, 50). Three ways in: up the front, Kettle's sharper, or round by the long grass (guile 14). The squad's fire: sleep (`b3Rest`), or Sohra sings for Capustan's dead first (trust +1, dread −1). Onward: the road south (declinable).
2. **`b3_c3_field`** (ground `b3_c3_field`): the allied line across the north road, the Host in the centre, Rhivi on the left flank, Brood's own and the Andii on the right. The warrens are poisoned here (`b3_domin`). A Grey Sword veteran rides out of the west postern asking for a squad to open a barricade in a south Camp; Whiskeyjack: "Your call." **The key.**
   - **`field`**: the Fourth holds its stretch beside Tav's company of the Fourth Regiment. **Fight 2 `b3_c3_hold`** (survive 4 rounds against Beklites and Tenescowri pouring out of the gates; allies Tav + a regular, or two regulars without Brisk; `aid` Rhivi rider, need 8; xp 170 + stage2 "the rearguard", a Seerdomin officer and a Beklite file-leader, 110). Brisk's "Nathilog" lock with Tav's file (might 14, Brisk only), or Kettle's burner. After: trust +2, the Beklite's spear. Then **the black dragon** (`b3_rake`) and the starving lying down in the grass; a choice for the knot of them nearest the line (water / stand between them and the Host's soldiers / leave them to the Rhivi: `b3_c3Grass`). Then Dannet, the acolyte with the water yoke (`b3_dannetMet`). Evening: an order to carry for the Host's healers in the city.
   - **`camps`**: into the city by the west postern (dread +2, what the siege did: headline only). Area 3.
3. **`b3_c3_camp`** (ground `b3_c3_city`), `camps` only: a Camp in the south of the city, a Beklite barricade of carts and furniture, four hundred of the Camp's people barred in a small temple behind it. The Grey Sword veteran (thirty-one years, out of Elingarth), **Dannet** (born three streets away; her father's house is in the Camp; knows a lane behind the dyers' houses), a Capan dyer, a Gidrath. **Fight 3 `b3_c3_camps`** (allies two Grey Swords, `aid` Barghast need 9; xp 160 + stage2 "the temple court", a Beklite officer, 100). Ways in: over the carts, Kettle's cusser (Maud, unless an import sent Maud home: `c3MaudHome()`), or Dannet's lane (guile 14, +2 if she showed it). After: the Beklite's spear; Dannet calls names through the doors until they open; the dragon seen from the temple steps; stay and help till evening (trust +1, dread −1) or go back.
4. **`b3_c3_dusk`** (ground `b3_c3_city_night`), both roads: a square in the Camps at dusk, the Grey Swords' barracks, the Thrall with the Mask Council in session and White Face Barghast waiting on its steps looking at its floor. The healers talk of the Destriant whose warren ate him (`b3_karnadasHeard`); **Ohl reaches into Denul and the warren burns a ring into his palm** (`b3_c3OhlBit`). The Shield Anvil, glimpsed and formal ("Sir. Thank you."). Gruntle and Trake's Legion (`b3_treach`). **The trick** from a woman of the legion. Dannet painting the wolf on her shield ("What do Malazans do, when the god goes?"), and the Grey Sword's surcoat. Tav (on `camps`, Brisk only). An optional **fight 4 `b3_c3_granary`** (Beklites barred in the last granary of the Camps; no burners; wits 15 to talk four out first; `aid` Grey Swords need 7; xp 90): the Capan round shield. Out by the west postern: Hurlochel's rumour that the First Child is taken alive (Anaster: "nobody I'd believe saw it"). Sleep → `chapterEnd(3, key)`.

Experience: about 530 on `field`, 510 on `camps`, with the granary; 440 / 420 without.

## The key: `S.f.b3_c3_key`

| value | what it is | what it changes here |
|---|---|---|
| `field` | held the Host's stretch of the allied line beside Tav's company | trust +2 (after the hold); the hold fight and its harder rearguard stage; the dragon and the grass seen from the line; Dannet met bringing water; Brisk +1, Sohra +1, Ohl −1 on choosing |
| `camps` | went into the city with a Grey Sword party and opened the south Camp's barricade | dread +2 (at the postern); the barricade fight; what the siege did (headline only); Dannet met as the guide; the dragon seen from the temple steps; Kettle +1, Ohl +1, Sohra −1 on choosing |

Later chapters might use it: on `field` Tav and Brisk stood side by side all day (Tav has a cut forearm, stitched); on `camps` the Grey Swords remember who came into their city (the Shield Anvil thanked the Fourth by name of the deed), and Dannet has seen the squad in her own streets.

## Flags set (all `S.f.`)

Shared (named in the brief): `b3_capustan = 1`, `b3_greyswords = 1`, `b3_domin = 1` (from the field on; Chapter 5 sets it again), `b3_rake = 1`, `b3_treach = 1` (on entering the city at dusk, both roads), `b3_karnadasHeard = 1` (same), `b3_dannetMet = 1` (both roads, guaranteed), `b3_legSeen = 1` (if the sergeant spoke to Whiskeyjack at the halt).

**`b3_dannetSeed = 1`**: the "loyalty seed" — set if the sergeant gave Dannet the Fourth's name at the water, told her "stay by me", stayed to help in the Camp, or answered her honestly or "keep marching" at the well. When it is set and Dannet is not yet in the squad, `S.loy.greysword` is set to at least 1, which `recruit()` keeps (it only defaults a missing value), so Chapter 4's `b3Join('greysword')` inherits it with no extra code.

Chapter-local, readable by later chapters if wanted:
- `b3_c3DannetWhere`: `'field'` | `'camps'` — where the Fourth met her.
- `b3_c3DannetSaid`: `'march'` | `'none'` | `'honest'` — the answer at the well ("Keep marching" / "Most of us never had one" / "I don't know").
- `b3_c3Grass`: `'water'` | `'stood'` | `'left'` (field only) — what the Fourth did for the starving lying down nearest the line.
- `b3_c3Held = 1` (field), `b3_c3CampDone = 1` (camps), `b3_c3Helped` 1/0 (camps), `b3_c3Cusser = 1` (Kettle spent a cusser on the barricade).
- `b3_c3Stripe`: the squad id (or `'sgt'`) who won Treach's Stripe; the item is given either way.
- `b3_c3OhlBit = 1`: Ohl's palm has a ring burnt into it by the poisoned warren (he favours needles from here).
- `b3_c3Granary`: `'won'` | `'no'` (refused; it burned) | `1` (asked, undecided); `b3_c3GranaryTalked = 1`.
- `b3_c3Itk = 1` (the Shield Anvil thanked the Fourth), `b3_c3Gruntle = 1`, `b3_c3Sat = 1` (an hour at the legion's fire), `b3_c3Carried = 1`, `b3_c3Thrall = 1`, `b3_c3LegAsked = 1` ("After Capustan"), `b3_c3Song = 1`, `b3_c3Picket = 1`, `b3_c3Close = 1`.

Earlier chapters' flags read (with defaults): none are required. Tav's scenes need only Brisk (`b3In('brisk')`); the letter line reads `S.imported && b3Was('c7_letter')` (sealed unless Brisk opened it in Book One; fresh start: "four coppers"). Sohra's lines need only `b3In('sohra')`, so she may be absent (an import, or a Ch1 `crate` start without Ch2).

## Inventions (later chapters may use; none contradicts the brief)

- **Treach's Stripe** (trick `b3_c3_stripe`, `spirit:true`, battle ability `t_b3_c3_stripe`): a strip of the tiger hide from over the altar of Trake's temple in Capustan, cut up by its priest on the second day of the siege for those who would go back on the wall. Once a fight, free action: heal 2+lvT and +2 to hit / +2+lvT damage through the next round. Not a warren (the poison never burns it). Given by a Capan woman of the legion; the ✦ check is might 16.
- **Items** (`CH.gear`, art in 63b): `b3_c3_shield` (a Gidrath's cousin's Capan round shield, dark red, gold dome; armour +2, Brisk/sgt/Dannet), `b3_c3_surcoat` (a Grey Sword's surcoat with the boar unpicked; +1 AC +3 hp, anyone), `b3_c3_spear` (a Beklite's spear; +1 hit, reach, −1 AC; Brisk/sgt/Dannet/Kettle), `b3_c3_stripe` (the trinket, +1 hit).
- **The Grey Sword veteran**: an unnamed Elin woman, thirty-one years a Grey Sword, followed Brukhalian out of Elingarth. Survives the chapter.
- **The young Rhivi rider** with the spirit-mark across her eyes (unnamed), on the left flank.
- **Dannet's background** (consistent with 60's bio): born three streets from the south Camp's temple; her father's house is in that Camp; has not been through its door in a year; knows the back lanes; is painting a wolf over the scraped boar (head done, then the eyes).
- The **map in the Seerdomin's tent** on the rise: the Host's march marked day by day from Pale (the Seer was meant to see the Host walk; the squad leaves the map where it is). No later chapter needs it.
- The Mhybe asks to be **carried in a litter** for the battle (seen through Sohra).

## Left open on purpose

- Anaster's capture is a rumour at the end (Hurlochel); the seizing by the dragon and the women's deaths are Chapter 4's to hear of, headline only.
- The field battle's wider shape (the Barghast's fight with Kulpath's reinforcements at the bridges, the Bridgeburners in the city) is never seen. The Fourth stands on one stretch of the line.
- No gate is named; the Fourth uses "the west postern" only. No Camp is named ("a Camp in the south of the city").
- Itkovian is glimpsed, thanks the Fourth, and goes to his wounded. Nothing of what he carries is said (Sohra: "It is bigger than he is").
- Gruntle says "They say Mortal Sword. I don't say it." Stonny is not mentioned.
- The Barghast on the Thrall's steps are looking at its floor (for Chapter 4's First Founders). Nothing more.
- Silverfox is seen once, at a distance, older again. Tuft says nothing.

## Canon points I was unsure of

- The **day** of the dragon. The game puts Rake's dragon over the field on the day the Pannion army is driven out, with the Tenescowri lying down in the grass to the west; MoI's exact sequence (the same day or days later, as the Wiki's *Anaster* page can be read) was not settled from the pages read (`moi-canon.md`, "Chapter 3 re-check").
- **The Pannion army meeting the allied line in the open**: the canon sheet has the Barghast and Bridgeburners driving it out "into the path of the allied army"; how much real fighting the Host did there is not on the pages read. The Fourth's stretch is kept small.
- **Trake's temple in Capustan** exists (Rath'Trake sits on the Mask Council); its tiger hide and the priest cutting it up are inventions (the stripes on Gruntle and his followers are canon).
- **Grey Swords recruiting Capan women** as acolytes during the siege is canon in outline; "Capan daughters... a year ago they were embroidering" is the veteran's own colour.
- The **Gidrath** as the Thrall's own guard, holding it through the siege, is my reading (the canon sheet only names them among the defenders); "the Pannions came up these steps four times" is an invention.
- The chapter's writer added a dated "Chapter 3 re-check" section to `docs/moi-canon.md` (outside this chapter's own files) with the sources consulted.
