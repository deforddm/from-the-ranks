Mon Nov 9, 2026, 3:37 AM PST. Book Eight, Chapter 6, "The Night of the Hounds" (`src/146_b8_ch6.js`, art `src/146b_b8_ch6_art.js`, test `tools/b8ch6_test.mjs`), against the Book Eight engine on `book8` (v11.0.0, not shipped). Written on branch `book8-ch6`, beside Ch 5 and Ch 7 being written at the same time: Ch 5's flags are read with defaults.

# Chapter 6 notes: The Night of the Hounds

The Gedderone Fete's last night in Darujhistan (tth-canon correction 5; R22 S9, R23 S5, S22). The Fourth is home from the road west. The city is out in masks; the moon has a crack across it that people point at and laugh. Then the Hounds come over the plain, the wall goes down in more places than one, the moon hangs in pieces, the Gadrobi District burns. The Fourth holds a different breach, or its own street, and then the Guild's knives come for it under cover of the night: **the book's one mortal fight**. Toward morning the moon bursts and its pieces go east. Never why (rule 81).

## Shape

- **Areas (3), all on Book One's `city_night` ground** (lanterns `l`, braziers `F`, rubble `r`, a well `k`, doors, posts, steps; rings on triggers and edge arrows only):
  - `b8_c6_lane`, the Fourth's street: the door `D` (the fire), the well `k` (the moon), `<` the Phoenix's end (never inside), `>` the lanes. NPCs: Benlo (masks), the masks dancing, the neighbours (phase 4).
  - `b8_c6_lanes`, the Gadrobi lanes and the dyers' row: the tavern with the painted sign `D`, the lamp-post where the Guild's line comes down `x` (the trick), Orsa's steps `g`, `<` back, `v` down to the wall. NPCs: the old soldier from Ch 1, masked bravos (phase 1), a bucket line (phases 2–3).
  - `b8_c6_wallfoot`, the foot of the east wall behind the Gadrobi District, **an unnamed stretch**: the watch sergeant (unnamed), `v` back up.
- **Nodes:** 62 `b8_c6_*` (the reading's two included).
- **Phases** (`S.f.b8_c6_ph`): 1 the Fete at evening (`b8_c6_start`); 2 the night broken (`b8_c6_turn`, from the fire once Benlo's last Fete and the wall are seen); 3 the roofs (after the key's fight); 4 toward morning (once the way out is settled; `b8_c6_burst`).
- **First halt** `b8_c6_start`, with `b8ReadChoice(6)`; also at the fire in phase 1. `B8READ[6]`: scene `b8_c6_fete`, where "a doorstep in the Gadrobi streets", back `b8_c6_fire`, a line each for Tuft, Sohra and Benna.
- **The fire** `b8_c6_fire` (id kept for the games pass; `ROSTER_FIRES.tth[6]`): `contractHTML()`, a rest once a phase (`b8_c6_rest<ph>`; phase 1 once the lanes are seen), the talk (two lines for every soldier the Fourth can field, Vasso and Edrem included: early phase 1, late from phase 2), the way on by phase, "Not now" last.

## The key `b8_c6_key` (the last night)

Offered at `b8_c6_key` straight after the night breaks, with `contractHTML()`; "Not yet" steps back (the fire offers it again).
- **`wall`**: Brisk +1, Edrem +1, Dannet +1, Ohl −1. To the breach: the watch sergeant on the rubble; the cart check (might 16; success sets `b8_c6_cartSet` and the squad moves first); `b8_c6_wall` (bravo looters and plains raiders), stage 2 *The gap*. Won: `b8_c6_wallDone`, the wall stone.
- **`street`**: Ohl +1, Tuft +1, Vasso +1, Brisk −1. The neighbours behind the Fourth's door (guile 15; success sets `b8_c6_streetIn` and the squad moves first); `b8_c6_street`, survive four rounds; **a Hound of Shadow passes the end of the street at round 2** (`b8_hound`, the engine's, never dropped; it goes on after two rounds); stage 2 *The door*. Won: `b8_c6_streetDone`, `b8_c6_houndSeen`, the wall stone (lying in the gutter where the Hound went by).
- **Read later (the brief):** Ch 7 (who saw what; fate pages).

## The mortal fight and the one way out (phase 3)

`b8_c6_roofwatch`, from the fire, signposted ("Whoever falls in this fight stays down", every choice that starts it tagged `mortal` with "(a mortal fight: whoever falls here stays down)", and again at `b8_c6_knives_start`). The way out is `b8WayOut()` at that moment:

| Contract | Way out | What happens | `b8_c6_wayOut` |
|---|---|---|---|
| 0–1 | `quiet` | Nobody comes. A Guild crossbow is found where the watcher knelt, left some nights ago. No fight. | `quiet` |
| 2–4 | `roofs` | ✦-free hard check over the Gadrobi roofs: wits 18, `contract:true` (the Guild's paper −1 at 4). Made: the Fourth goes east into the smoke; a crossbow on the last roof. Failed (`b8_c6_roofs_no`): the fight. Its "yes, but" is +1 to the Contract ("someone on a roof saw it"). | `roofs` |
| 5–7, Vasso walking | `word` | Vasso's word to a journeyman he knows: offered only at loyalty ≥ 1 (at 0 he says they would not take it); a guile 16 check **Vasso makes himself** (`check[2]`), +2 "they were journeymen together", +1 at loyalty 2, −2 on Ch 1 `hunt`. Made: the knives go west; the journeyman leaves a crossbow "for the paper"; Vasso +1. Its "yes, but": the journeyman takes the knife off the back of Vasso's neck, rattled. Failed (`b8_c6_word_no`): the fight. | `word` |
| 5–7 without Vasso, 8–10 | none | The fight only. | `fought` |

The player may always choose to stand instead ("Stand in the street and let them come"). **`b8_c6_knives`**: `mortal:true`, `guild:true`, one ground (no stage 2: a second ground would drag the stage-one fallen back up, 031c `stageBreak`, and soften the rule), base foe one `b8_knife`, `contract:[[1,1],[6,1],[0,2],[7,2]]` (the engine puts `b8Roofs(6)` there). So 3 knives at 2–3; 4 at 4–5; three knives and a veteran at 6–7; two knives and two veterans at 8–9; two knives, a veteran and the Grand Master's knife at 10. `S.f.b8_c5_scouted` (default: Ch 5 `wary`) opens it with surprise for the squad. Mortal rules are the engine's (031 `win`): everyone down at its end is dead (`S.dead[id] = {ch:6, where:'The knives'}`, `S.f.lastFallen`), the sergeant takes `S.f.sgtScar` and lives, no death checks (031c `deathOn`). A loss is a loss: the gods answer (Brisk's is "the dead" tonight). Won: `b8_c6_knivesDown = 1`, `b8_c6_wayOut = 'fought'`, the crossbow; the engine's +1 (the Guild counts its dead). `b8_c6_knives_after` names the dead (Ohl writes the first new names on his list in years; Brisk salutes and nothing answers).

## The Contract

No fixed move. The engine's +1 on a won `b8_c6_knives`. The chapter's own: **+1 on a "yes, but"** of the trick check or the roofs check ("someone on a roof saw it"; at most one in practice, both possible). No check but the roofs carries `contract:true`.

## Flags later chapters may read

| Flag | Values | Meaning |
|---|---|---|
| `b8_c6_key` | `wall` / `street` | the key (default `street`, `B8KEY0`) |
| `b8_c6_wayOut` | `quiet` / `roofs` / `word` / `fought` | how the knives were settled (shared, the brief) |
| `b8_c6_knivesDown` | 1 | the mortal fight won (Ch 7: −2, and nobody on the roofs) |
| `sgtScar` | 1 | the sergeant went down in the mortal fight (engine) |
| `lastFallen` | ids | who died in it (engine); `S.dead[id].ch === 6` and no `from` |
| `b8_c6_fete` | 1 | callback 1: Benlo remembered the last Fete, the sergeant's line (gate for the night breaking, so always set before the key) |
| `b8_c6_wallDone` / `b8_c6_cartSet` | 1 | `wall`: the breach held / the cart got across |
| `b8_c6_streetDone` / `b8_c6_streetIn` / `b8_c6_houndSeen` | 1 | `street`: the street held / the neighbours all got in / the Hound went by |
| `b8_c6_turned` / `b8_c6_burst` | 1 | the night broke / the moon burst |
| `b8_c6_signOk` / `b8_c6_signTried` / `b8_c6_signsSeen` | 1 | the trick learned / rolled / the hand-signs seen |
| `b8_c6_vellMark` | 1 | callback 4's line here: Vell answered the clan mark on the ridge (only if Vell walks) |
| `b8_c6_masksDone` / `b8_c6_masksFought` / `b8_c6_masksFaced` | 1 | the dyers' row (optional) |
| `b8_c6_masked` | 1 | bought masks at Benlo's (2 silver) |
| `b8_c6_signSeen`, `b8_c6_vetMet`, `b8_c6_orsa`, `b8_c6_wallSeen`, `b8_c6_lanesSeen`, `b8_c6_neighbours`, `b8_c6_buckets`, `b8_c6_edremWall`, `b8_c6_vassoHands` | 1 | seen |
| `b8_c6_drawn` / `b8_c6_reader` / `b8_c6_noCard` | | the reading (140c) |

## Flags from earlier chapters this chapter reads (with defaults)

- **Ch 1:** `b8Key(1)` (default `quiet`): `hunt` gives −2 on Vasso's word ("the Fourth asked names all winter").
- **Ch 5:** `b8Key(5)` (default `wary`): `fast` the wagons came in before the gate shut, `wary` at dusk. `S.f.b8_c5_scouted`; unset, it follows the key (`wary` → scouted): surprise for the squad in the knives fight, and the start's line about the road knives.
- **The charm** (`b8_hoodcharm` in the kit): the old soldier asks about it; at the turn it is "only a knucklebone tonight". The engine makes it cold.
- **Recruits:** `b8In('vasso')`, `b8In('edrem')`, `b8In('vell')`; Vasso's loyalty for the word.
- `S.imported.book === 'moi'` adds a line to the sergeant's memory of the last Fete ("You went to Coral after that, and came back").

## The trick: The Knife-Sign (`b8_c6_knifesign`)

At the lamp-post where the Guild's line comes down (`b8_c6_post`): shapes on the ridge talking with their hands. ✦ wits 17, "Watch the roofs until the hands make sense." The check names what the squad knows: the Claw's hand-cant, shown on Kalam's roof in Book One. Edges: Vasso +3, Vell +3, the bearer of `cant` +2, Ellis +2, the sergeant +1, Tuft +1; Brisk −1, Dannet −1. "Yes, but": +1 to the Contract. **Mechanic:** Claw Hand-Cant's (`cant`): once a fight, sign an enemy within 6 (never the Hound); the next hit on it this round is a critical (two hits from the second squad level). **Free** (v10.3: it strikes nobody; one free trick a turn), words end as the brief asks. Not passive, not sorcery.

## Items (each with its own art in 146b, on Book Eight's ground)

- `b8_c6_guildbow` (weapon, `role:'ranged'`, `rng:1, atk:2, dmg:[1,10,4]`): a Guild crossbow. **Added to `SOAK_PIERCE_ITEMS`** from this file. Every way out gives it (taken off the dead, found on the last roof, left by the journeyman, or found at the abandoned post on `quiet`).
- `b8_c6_wallstone` (trinket, `role:'any'`, `hp:3`): a stone from the wall. Both keys give it after their fight.

## Fights (numbers for the balance step; no rule changed)

| Fight | Where | Foes | xp raw (×0.6 paid) | Notes |
|---|---|---|---|---|
| `b8_c6_masks` | the dyers' row | `b8_bravo` ×3 | 180 (108) | optional; can be faced down (might 15) |
| `b8_c6_wall` | the breach | `b8_bravo` ×2, `b8_raider` ×2 | 300 | `wall`; surprise if the cart is set |
| · stage 2 *The gap* | | `b8_raider` ×2, `b8_bravocaptain` | +120 (420, 252 paid) | |
| `b8_c6_street` | the Fourth's street | `b8_bravo` ×2, `b8_raider`; waves r2 **`b8_hound`**, r3 `b8_bravo` + `b8_raider` | 300 | `street`; survive 4; surprise if the neighbours are in |
| · stage 2 *The door* | | `b8_bravo` ×2, `b8_bravocaptain` | +100 (400, 240 paid) | |
| `b8_c6_knives` | the Fourth's street | `b8_knife` + `b8Roofs(6)` | 380 (228) | **mortal**, `guild:true`, one ground; surprise on `scouted` |

Paid xp: about 588 with the masks and the knives, 360 with the masks and no knives, 252 at the least. Balance numbers not taken (the lead's order: leave them to the balance step). The street's Hound is a boss at atk 14, 2d8+6, mv 8: it will reach the squad on an 8×10 map.

## Canon used, and limits held

- The night as canon has it, at a distance: the Hounds over the plain, the wall wrecked (R22 S9), the moon shattered and then bursting, the light going east (R22 S9, R23 S22; rule 81, never why); the Gadrobi District burning (R23 S5). The Fourth's breach is "an unnamed stretch"; the watch sergeant says the wall "came down in more places than this" and something big came through first "like it had an appointment" (no name, no swordsman, no giant).
- **Rule 14:** no Hound dies at the Fourth's hands; the only Hound is the engine's `b8_hound`, in a survive fight; the test hurts it for 10,000 and it stays at 999, then goes. No Hounds of Light on the page.
- **Rule 74:** Hood is never seen. "Hood didn't answer" (Brisk at the turn), "Death didn't answer" (the burst); the old soldier: "Nothing at the gate. No one to say no." Brisk's god is the engine's "the dead".
- **Rule 70:** never who paid; Orsa: "Nobody sends the Guild... it never tells the one on the paper who paid." The Grand Master's knife is "one more who stands apart... and has no face the lamps can find". Vell's clan mark is about him walking away, never K'rul's contract.
- **Rule 16:** Rumjugs and Sweetlard hang over the tavern in paper masks; no one knows who they are.
- **Bredd:** the old soldier does not tell a second one (one a book: Ch 1's).
- Never on the page: Traveller's breach, Cotillion, the gaol, the Temple of Shadow, the Noms' roofs, Coll's estate, the Finnest House, K'rul's Bar, the street of Rake's death, the Ravens, Envy and Spite, Dragnipur, Challice. The test greps every node and every edge for these names, "Hounds of Light", "beheaded", counts of years, and "!" in narration.
- **Bells:** one, at the very end ("Up on the hill, somewhere, a bell begins."); Ch 7 has the toll.
- **Book One's Fete** (callback 1): Benlo remembers "the ground came up in the hills on the last night and the frost ran down the gutters, and that great black stone was hanging over the lake that went away after" (never named); the sergeant's line ("a mask that was not yours... it ended with the ground coming open. You had a squad of five then."); the watch sergeant remembers it from the wall; Brisk "in a borrowed mask in a garden with a shield behind a hedge". Ch 7's coda echoes it (`b8_c6_fete`).
- **Invented, unnamed:** the watch sergeant and his two young men, the neighbours (the dyer's widow, the old man from the attic and his bird, the baker's girls), the dyer and his wife, the masked bravos, the journeyman with the cord on his wrist, the bucket line's landlord. **No new names**: the clan knife on the ridge who taught Vell the lines is "the clan-master".

## Claude's calls (David may overturn any)

1. The mortal fight has one ground, no stage 2, because 031c drags the stage-one fallen back up at a quarter health.
2. The roofs check is wits 18 (the brief says DC 18; the stat is mine).
3. Vasso's word is a guile 16 check he makes himself, with the edges above; "never a guarantee" is the check.
4. The Guild crossbow is had on every road, so the item is never lost to a lucky Contract.
5. The night breaks once Benlo's last Fete and the wall have both been seen; the key follows at once (with "Not yet").
6. Both key fights give the wall stone.
7. An optional fourth fight (`b8_c6_masks`) so the `quiet` road still earns a fight.
8. Two silver for masks at Benlo's (money is the scene).
9. "Yes, but" on the trick check costs a Contract point, the one point the brief allows a chapter; the roofs check's "yes, but" does the same (a player could pay both).
10. The neighbours' and the watch's scenes give no mechanics.

## Engine needs (for the lead; not patched)

- **The Hound attacks.** `b8_hound` is a boss with atk 14 and mv 8 and the ordinary AI, so on the street it will maul whoever is nearest, while the engine's leaving line says "It never once looked at the squad." Either a "passes by" AI (it walks the far row and attacks nothing) or a reworded leaving line. The street fight's text is written to fit either ("It does not stop for the street").
- `b8_c6_card` shows as an orphan in lint (the visions pass's hook), as for every chapter.

## Art (146b)

Backdrops: `b8_wall_night` (140's, replaced: the long wall, the gap full of fallen stone, the dark plain through it, the watch's brazier over, the cart if set, fire over the roofs, the moon by the hour), `b8_c6_fete` (the Fourth's street at evening: lantern strings, masks dancing small, the cracked moon), `b8_c6_burning` (the same street broken: lanterns out, roofs burning, smoke, the moon in pieces; **the Hound's passing**, a dark low shape going by the far end while one is in the street, the lamp on that side out; the sky white after the burst). Helpers `b86Moon` (crack / pieces / burst, from `S.f`), `b86Smoke`, `b86Fire`, `b86Lanterns`. Items: the crossbow, the stone. Reuses Ch 1's `b81Sky`, `b81Upper`, `b81Front`, `b81Lamp`, and figures `b8_c1_benlo`, `b8_c1_veteran`, `reveller`, `guard`, `thug`, `hound`. 19.6 KB.

## Tests

`tools/b8ch6_test.mjs` (23 checks): a fresh start brought to Ch 6 (earlier keys unset, the Contract 3) renders every node under every phase, key, done-state and Contract (0, 3, 6, 9, 10); the audit ("yes, but" on every check, "Not now" by every onward step); the charm cold and Brisk's god; the only mortal fight; the reading; the fire; the Fete callback; the lanes; the masks; the trick (✦ wits 17, free, the mark, its "yes, but" +1); the wall seen; the night breaking; the key; `street` (the door check, four rounds, the Hound at round 2, death checks on, the Hound hurt for 10,000 and untouched, then gone); the roofs at 3 (DC 18 contract check, its +1, made and failed); **the mortal fight** (three knives, no death checks, surprise; Kettle and the sergeant down at the end: Kettle dead and named, the sergeant scarred and alive, knivesDown, +1); the burst and the end; `wall` from the same moment; the tiers (0 quiet, 4 four knives and −1, 6 without Vasso no way out, 9, 10); `word` with Vasso (loyalty 0 and 1, his own roll, made and failed); every Hound is `b8_hound`; a `--from=6` style save (Tuft dead, Vell and Vasso walking, Ch 1 `hunt`, Ch 5 `fast`, the Contract 5).

Results (Mon Nov 9, 2026, 3:43 AM PST): `python3 build.py`; `node --check` on the three files; `node tools/lint.mjs` 0 errors, 35 warnings (none new; `b8_c6_card` listed as an orphan, as every chapter's card node); `b8ch6_test` 23/23; `b8ch1_test`, `b8engine_test`, `trope_test`, `yesbut_test`, `recruit_test` pass. `trope_scan --files src/146_b8_ch6.js`: 8,653 words, theway 2, silence 3, nobody 3, as-if-it-were 1, every book inside its budgets. Not run here (the lead's): `run_all`, `onward_test`, `play.mjs`, `balance.mjs`.

**Art:** looked at in a 390×844 browser: the Fete street, the burning street with the Hound going by, the breach with the cart, the white sky after the burst, the two items.
