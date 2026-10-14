# Book Three, Chapter 2: "The Rhivi Plain" — continuity notes

Tue Oct 13, 2026. File `src/62_b3_ch2.js` (`B3CH2`), art `src/62b_b3_ch2_art.js`. Ids carry `b3_c2_`.

## Shape

Four areas (16×12): `b3_c2_column` (day, first week: the Bridgeburners leave, Tav, the Mott Irregulars, Korlat, the quartermaster's clerk, Hurlochel), `b3_c2_far` (two weeks out: the wallow and the K'ell Hunter strides; the Barghast hill), `b3_c2_camp` (night, three weeks out: the Mhybe and the child, the tall man in the cloak, the Black Moranth and the trick, the old Rhivi woman, the herd-lines raid), `b3_c2_river` (five weeks out: the ford and the flood; the key). About 75 nodes.

Fights (each with `stage2`), engine pay:
- `b3_c2_hill` — Betakullid at the foot of a Barghast hill, then a Seerdomin (`b3_c2_seer`, boss) among the inverted trees. 110 + 60. `aid` Rhivi rider (need 8). Surprise for the squad unless the dead rider was carried home first; Sohra's gully check; Kettle's sharper opener.
- `b3_c2_night` — the herd-lines raid: survive 3 rounds, then the Seerdomin who sent them (`b3_seerdomin`). 90 + 50. `aid` Rhivi rider (8) and Barghast (9). Kettle's smoker opener.
- Key fight, one of: `b3_c2_herdfight` (the far bank and the calves' gully, Betakullid captain `b3_c2_betacap`; `aid` Rhivi rider need 7) or `b3_c2_wagonfight` (the wagon-ford, with two Fourth Regiment heavies `b3_c2_heavy` as allies, `keepAllies`). 130 + 70 each.
- Total about 510 xp.

## Key `S.f.b3_c2_key`

Chosen at the flood (`b3_c2_flood`; the step before it, the ford, is declinable).
- **`herd`** — the squad goes into the river for the children on the calves: `ally(+2, −1)`, −1 salve (if any), loyalty Sohra +2, Ohl +1, Tuft +1, Brisk −1, Kettle −1. Two wagons are lost (the Fourth Regiment saves the rest). After the fight, if Sohra is in the squad, `S.f.b3_herdMother = 1` (she calls the sergeant "herd-mother", once). The dead rider's uncle brings the horn bow if the squad doesn't have it (`b3_c2_bowGift`).
- **`wagons`** — the squad holds the wagons with Tav's company: `ally(−1, 0)`, +1 sharper +1 burner +1 salve, loyalty Brisk +2, Kettle +1, Sohra −2, Ohl −1. Some calves are lost; Sohra swims for one child alone and saves him. `S.f.b3_c2_tavWagons = 1`. Tav offers the four coppers back to Brisk; she pushes them back: "Not yet. Not for this." (The letter/coppers stay open for later chapters.)

## Flags later chapters may read

- `b3_khell = 1` — always set (the wallow is on the only path to the hill). Dread +2 when set.
- `b3_legSeen = 1` — if the sergeant went to stand by Mallet. `b3_c2_malletAsk = 1` — the sergeant told Mallet "I'll watch him" (or Ohl offered). `b3_c2_ohl = 1` — Ohl offered Whiskeyjack a night of Denul; WJ said "Later", and Ohl wrote the word down (a hook for Mallet's week).
- `b3_tuftChild = 1`, `b3_c2_collar = 1` — at the Rhivi fire the child touched her own collar where a cadre badge would be, looking at Tuft ("She remembered the collar. Not me.").
- `b3_herdMother = 1` — see above.
- `b3_c2_kallorLook = 1` — only if `b3_kallorSaw` (Ch1 `mhybe`): the tall man looked at the sergeant at the Rhivi fires and let them see he remembered.
- `b3_c2_carried` / `b3_c2_left` / `b3_c2_tookBow` (+ `b3_c2_bowBack`, given back to the old woman) — what the Fourth did with the dead outrider. `b3_c2_sang` — Sohra sang him home.
- `b3_c2_tree = 1` — the Fourth stood a felled Barghast tree back up on the hill; "the Ilgres will hear of that". Ch3+ Barghast may remember.
- `b3_c2_mottJug = 1` — drank with a Bole. (The Bole no longer repeats Chapter 1's "never caught one of us" joke; the brother is "he".)
- `b3_c2_sohraLate = 1` — Sohra joined at Ch2's start (Ch1 didn't bring her); on `crate` with a sour word about "boxes".
- `b3_c2_hillDone`, `b3_c2_nightDone`, `b3_c2_floodDone` — the three fights.
- Trick learned: `b3_c2_hand` (Moranth Hand-Talk) via the ✦ wits 16 check at the quorl lines.

## Inventions

- **Moranth Hand-Talk** (trick `b3_c2_hand`, ability `t_b3_c2_hand`, free action, once a fight): sign an enemy within 8 to a quorl overhead; a quarrel (1d6 + level damage) and the squad hits that enemy +2 (+level bonus) through the next round. Not `spirit` (it is Moranth signing, not a warren).
- **Items**: `b3_c2_hornbow` (bhederin-horn bow, +1 atk +1 range; the dead outrider's, made by his cousin), `b3_c2_bundle` (Rhivi spirit-bundle, trinket, wits +1; in Book Three its bearer ignores the dread's to-hit penalty — implemented as a +1 to hit while `B.b3Mind` is haunted or shaken in the first two rounds), `b3_c2_mace` (Seerdomin's grey mace, d10+2, "colder to hold than iron ought to be").
- **Foes**: `b3_c2_betakullid`, `b3_c2_betabow`, `b3_c2_betacap` (one captain shadows the column from the hill to the river; he dies at the flood either way), `b3_c2_seer` (the Seerdomin on the hill), ally `b3_c2_heavy`.
- An old Rhivi woman, Sohra's father's mother, ties spirit-bundles. A Rhivi herd-mother and her daughters (Sennet "always gets the dun calf").
- Seerdomin wear a closed-eye tattoo on the inside of the wrist (invented; drop it if canon says otherwise).
- Hurlochel takes the Fourth out to the far grass.

## Engine additions (in this file, guarded by `b3On()`)

- A wrap of `atkCalc` for the Hand-Talk mark and the spirit-bundle.

## Left open / canon notes

- Quick Ben's sorcerous contact with Capustan is told only as a Host rumour (a tent-guard's story); the rumour no longer says where Quick Ben is.
- The Mott Irregulars are written as brothers of one family (canon sheet §1.2), no count given.
- The Bridgeburners are seen leaving on foot ("thirty-odd"); the squad sees them only as far as the first rise, so whether quorls meet them later is left open (canon sheet lists it open).
- The Mhybe says she is "the vessel", without claiming the name means that.
- Korlat glances at Whiskeyjack; nothing more of that thread.

## Balance (tools/balance.mjs, Book Three patch, level 3, Sohra in, smart 12 / naive 6)

`b3_c2_hill` 100% / 100%, 19% HP lost; `b3_c2_night` 100% / 100%, 19%; `b3_c2_herdfight` 100% / 100%, 19%; `b3_c2_wagonfight` 100% / 67%, 16%. Every battle carries `warren:{meanas:1, denul:1}` (the plain is outside the Domin; without it Ohl's Denul read `B.warren.denul` of undefined).
