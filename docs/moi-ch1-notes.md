# Book Three, Chapter 1 — "The Parley": continuity notes

Tue Oct 13, 2026. For the writers of Chapters 2–7. File: `src/61_b3_ch1.js` (`B3CH1`); art `src/61b_b3_ch1_art.js`.

## Shape

- **Areas** (16×12): `b3_c1_camp` (the Host's lines, morning; `b3camp`), `b3_c1_line` (the picket where the camps meet, noon; `b3camp`), `b3_c1_rhivi` (the Rhivi camp, night; `b3camp_night`, dark).
- **Order**: Whiskeyjack's order (and the Mallet–leg argument) → the old north sap under the parley ground (fight 1) → the picket and the parley (Kallor's *abomination*, Whiskeyjack's blow, seen from a hundred paces) → the Rhivi camp at dusk (Sohra, the Mhybe, Kallor's men) → the key → the night fight → dawn, the armies march.
- **Fights**: `b3_c1_tunnels` (looters and deserters; stage two `The fallen chamber`, boss "the man by the lamp", a Second Army sapper who never came up; xp 140 / +70, paid together at the end of stage two), `b3_c1_brawl` (the Ilgres fire; only if the shield-push is lost and the talk-down fails or is refused; xp 80), key fights `b3_c1_herds` (mhybe; aid `b3_rhivi_rider` need 7; stage two `The Mhybe's tent`, boss "the man with the cut ear"; xp 170 / +100) or `b3_c1_train` (crate; survive 3 rounds; aid `b3_moranth` need 6; stage two `The cutting`; xp 170 / +100). Raw 480 (560 with the brawl); at the engine's 0.6 pay that is 288 (336) experience, so the squad ends the chapter at level 3 either way.
- **The Deck**: `B3DECK[1]` replaced (an upturned shield by the Fourth's fire; Tuft / Sohra / Old Benna lines). `b3DeckChoice(1)` is on the opening node and the Fourth's fire.
- **Trick**: `b3_c1_call`, **The Herd-Call** (Sohra's two notes, low then high; `spirit:true`), ✦ wits 16 at Sohra's fire, `not:['sohra']`. In battle: once a fight, an enemy within 5+lvT stops and loses its next turn (a boss shakes it off on 12+2·lvT), its neighbours −1 to hit until the bearer's next turn. Engine wrappers (guarded by `S.book==='moi'`): `atkCalc` (the −1) and `squadTurnStart` (clears it). In the story the trick turns the herd-stampede at the watch into a surprise round.
- **Kit**: `b3_c1_whetstone` (Tav; trinket, +1 to hit), `b3_c1_torc` (Sarhul; trinket, +1 might; won at the push or after helping the Ilgres up), `b3_c1_charm` (the Mhybe; trinket, +2 hp, and a `b3Rest` wrapper: whoever wears it, a rest takes one more off the dread).
- **Glossary** adds (GLOSSX.moi): The Ilgres; The Mott Irregulars.

## The key `S.f.b3_c1_key`

- **`mhybe`**: the Fourth stand the night at the Mhybe's tent for Sohra; brigands off the Divide come for the herds and are broken. Trust +2; `S.f.b3_mhybe = 1`; Kallor comes down after the fight and looks at the sergeant: `S.f.b3_kallorSaw = 1`. **Sohra joins now** (`b3Join('sohra')`; `S.f.b3_sohraDone` = 1, or 2 if the squad is full).
- **`crate`**: the Host's order: escort a Moranth munitions train in off the Divide road. Munitions **+2 sharpers +1 cusser**; trust −1 ("Sohra asked, and the Fourth went elsewhere"). **Sohra does not join**: Chapter 2 should `b3Join('sohra')` at its start. She was cold about it: "Go and get your crates, Malazans." At dawn she says "I will find you on the march. When I have decided what to say." Chapter 2 can open on that.

## Flags later chapters may read

Shared (no chapter infix):
- `b3_tav = 1` — Tav met at his cook-fire (always set if the player visits him; with Brisk dead in an import he is told, and gives the whetstone anyway).
- `b3_legSeen = 1` — the sergeant heard Mallet ask Whiskeyjack for "a week, flat" (set at Whiskeyjack's first talk, which is mandatory).
- `b3_tuftChild = 1` — only if Tuft is in the squad: the child looked at Tuft across the parley ground "as if she half knew her".
- `b3_sohraMet = 1` — Sohra met (on the picket or at her fire).
- `b3_kallor = 1` — Kallor named (a pikeman names him after the parley; set again after the herds fight).
- `b3_mhybe = 1`, `b3_kallorSaw = 1` — key `mhybe` only.

This chapter's own (`b3_c1_*`), worth reading:
- `b3_c1_ilgres` = `'won'` (won the shield-push; torc) | `'calmed'` (lost the push, talked the boy's knife down) | `'helped'` (brawl, then helped the Ilgres up; torc) | `'left'` (brawl, left them in the mud; trust −1); unset if the push was declined (`b3_c1_ilgresDeclined`). `b3_c1_ilgresGrudge` = the boy put the knife away slowly.
- `b3_c1_boy` = `'provost'` | `'let'` — a camp follower's son found living in the old sap.
- `b3_c1_charmFrom = 1` — the Mhybe gave the bone charm (to "the one who looked at her daughter as if she knew her" when Tuft is present).
- `b3_c1_kmenGone = 1` — the Fourth stared Kallor's men in grey and fur away from the Mhybe's tent.
- `b3_c1_mott = 1` — met a Mott Irregular (apple peel; "third cousins, by apple").
- `b3_c1_whetRefused = 1` — the sergeant told Tav to give the whetstone to Brisk himself: **he says he will, "at Coral, or wherever."** A later chapter may pay that off (or not).
- `b3_c1_herdsDone` / `b3_c1_trainDone` — the key fight is behind the squad.

## Named inventions

- **Sarhul**, an Ilgres Barghast warrior (not a chief: the Ilgres's chief is unnamed on every page read). His father fell at Blackdog; the boy's at the Mott, to Malazan crossbows.
- **"The man by the lamp"** (unnamed Second Army sapper who stayed underground after the night the sky fell), and the charcoal line *THE FIST IS STILL COUNTING HEADS*.
- **"The man with the cut ear"**, a Divide brigand leader (dead in `mhybe`; in `crate` he is down on the road).
- **Kallor's men in grey and fur**: two or more paid swords of his own. Not canon (Kallor has no named retinue on any page read); keep them vague and few.
- **Brigands of the Divide** raid the Rhivi herds each spring. Invented.
- **Pell**, the Host's quartermaster (Book One's), still sells: sharper 6, burner 5, salve 5, smoker 4 silver. The mule named after him was left in Darujhistan "with the Paviors' Guild, in lieu of wages."
- A **Daru attendant** with a ledger travels south with Coll ("Bring boots").

## Left open on purpose

- Tuft and the standard bearer: she goes still; "I don't know why. Don't ask me." Nothing more.
- Tuft and the child: she has not gone near; the Mhybe asked her "Who are you, to my daughter?" and she said "Somebody who knew her. Before."
- The child perhaps said *uncle* to Whiskeyjack (Ohl reads lips; "He is not sure. He is sure.").
- Whiskeyjack's leg: unhealed; he refused Mallet and Ohl both.

## Canon points I was unsure of

See `docs/moi-canon.md` "Chapter 1 re-check". In short: how and where Whiskeyjack struck Kallor is on no page read, so the game shows only a blow, from far off. The fur-collared cloak is the series' own costume detail. The day of the parley is shown warm (Kruppe complains of the heat); the season stays spring. Mallet is at Pale with Paran before the Bridgeburners leave, so his scene is safe. The Ilgres in Ch1 wear plain iron; no blood-iron.
