Thu Nov 5, 2026, 3:13 AM PST. Book Six, the seven "Through the Deck" visions (`src/108_b6_visions.js`, art `src/108b_b6_visions_art.js`, test `tools/b6visions_test.mjs`), on `b6-visions` off `book6` (Book Six, v9.0.0, not shipped; repo VERSION still 8.2.6).

# Book Six visions notes

Built on Books Four and Five's pattern (78/78b, 88/88b): `VISIONS.b6v1` to `b6v7`, `book:'bh', ch:n`, one per chapter for any card. 36b picks them up by book, and 21's card screen offers "✦ Look into the card" whenever `visionFor` finds one, so no chapter file changed and no engine file changed. Each vision comes back to `b6_c<n>_card` (36b's `cardNodeName`, already `b6_c` for `bh`).

**The readers.** Book Six reads through each squad's own chain (100c's `b6As` wraps `VISREADER`): the Third (Ch 1, 3, 5, 7) Marrow, else Tallow, else the old soldier of the 9th (`oldninth`); the Fourth (Ch 2, 4, 6) Tuft, else Sohra, else old Benna. `visionFor` runs with `S.book = 'bh'` (the card screen calls it unwrapped), so it finds `b6v<n>`; the closing step's `sp`/`fig`/`txt` are getters of `visReader()`, which goes through the wrapper, so the closer is the squad's own reader. Each closer has lines for the chapter's three readers and an `other` fallback (`b6vEnd`). A journal replay uses 36b's replay line, as in every book. Figures: `marrow`, `tallow`, `tuft`, `sohra`, `b4v_oldninth`, `b3v_benna`.

## The seven (bh-canon §12)

| Ch | id | Viewpoint, where | Stops before | Words-only flags |
|---|---|---|---|---|
| 1 | b6v1 | Leoman on a well in the Lato Odhan, the Book in his lap: his list (fire, the well, the horse lines); Corabb eats a toad ("strange dreams"); the men's "chosen", "the Apocalypse is as much a time"; Leoman thinks of disbanding, then of one impossible victory; meer-rats; Corabb tells the men the cursing is prayer | Y'Ghatan by name (he keeps the book; no plan is said) | `b6v1_toad` ask/watch, `b6v1_home` say/keep |
| 2 | b6v2 | Apsalar in Ehrlitan: the tavern ("Dujek's army?"), the knife across a follower's face, grief for a young man she made stay behind (unnamed), Shadow's chains, Telorast and Curdle rising from shackled bodies, Jen'rahb, the man she came for already dead, the attackers (priests of the Nameless Ones), the shades stay "to cheat everybody", Cotillion | what the shades are (no throne, no dragons) | `b6v2_grief` weep/away, `b6v2_shades` quiet/talk |
| 3 | b6v3 | Corabb in the Queen of Dreams' temple as Y'Ghatan burns: "Hood take Dryjhna", Dunsparrow knew, Leoman offers a way out, Corabb stays, the inner door's light, the children behind the altar, the Malazans coming in out of the smoke | where Leoman and Dunsparrow went (§7); L'oric unseen (rule 23); the tunnels | `b6v3_ask` believed/quiet, `b6v3_stay` stay/go |
| 4 | b6v4 | Hurlochel by Dujek's cot in the field hospital: Noto Boil, Rythe Bude, "the logs", Captain Kindly (his real name kept), the Hounds heard as dogs in the city, Dujek dies two bells before the captain returns, the hour written in the log, the bell | the vote; the name "Paran" (as Ch4 keeps it) | `b6v4_logs` all/near, `b6v4_fist` send/sit |
| 5 | b6v5 | Keneb on the Kokakal shore: the loading, Grub's "two days past Sepik", the delay, the marines walking in off the Sotka road with Fiddler | Grub as anything more than a boy (rule 18); Kalam and Quick Ben unnamed | `b6v5_ask` how/who, `b6v5_why` truth/casks |
| 6 | b6v6 | Noto Boil on the march north-east of G'danisban: Korel and Ipshank, soldiers touching his sleeve since his fever broke, Sweetcreek and Rythe Bude, twelve lights in a curve below the moon, "the sky is falling", the halt, Ormulogun's cards, the High Fist rides off with a handful, Noto lays out his tools | what the lights are; the gate to Mael; Hood (§7) | `b6v6_talk` listen/word, `b6v6_say` plain/korel |
| 7 | b6v7 | Keneb at Malaz City: Balm's squad on the jetty, the transports out of range, the Froth Wolf and the black ship moored on the Destriant's word, burning arrows, munitions, Koryk; Rynag of the Untan Palace Guard, the pogrom; Koryk's arrow; "This army is hers. Not the Empire's"; the Destriant bows; Mock's Hold black on its rock | Mock's Hold's inside, the Empress (never named), Korbolo, Mallick Rel, Kalam, T'amber | `b6v7_order` hold/chase, `b6v7_rynag` off/land |

Sources: W chapter summaries via the canon sheet; Reactor's re-read for ch 1 (the well, Apsalar's scenes), ch 20 (Noto Boil, the twelve "suns", Ormulogun, Hood's gate) and ch 23 part one (Keneb, Balm, Rynag, Koryk, the Destriant); Malazan Wiki *Corabb* and *Leoman* (the temple, "Hood take Dryjhna", the bargain, Corabb refusing) and *Grub* (delay boarding a day, two days after Sepik).

## Art (108b)

- New figures: `b6v_apsalar`, `b6v_corabb` (a child on his hip on b6v3's last step), `b6v_noto` (his tools on a cloth on b6v6's last step), `b6v_dunsparrow` (across the temple only). Reused: `leoman`, `keneb`, `hurlochel`, `b4_c4_grub`, `b2soldier`, `b6_rioter`, `shade`.
- Backdrops: `b6v_well`, `b6v_ehrlitan` (Shadow on step 2), `b6v_temple`, `b6v_hospital` (outside in the rain on step 4), `b6v_kokakal`, `b6v_lights`, `b6v_jetty`, and `b6deck` (the reader at each chapter's reading place, B6DECK[n]).
- Headline only: the fire is orange in the temple's high windows and smoke along its ceiling; Dujek is a shape under a blanket by a lamp; the lights are twelve points; Mock's Hold is a silhouette.
- Sheet: `/home/claude/wt/shots/visions/b6_visions_sheet.png`.

## Claude's calls

- **Leoman keeps the book.** Reactor gives his list of ways to destroy it, not that he does; Ch 3's "Hood take Dryjhna" follows. Y'Ghatan is not named in his thoughts.
- **Apsalar's young man** is unnamed (rule 23's spirit; the scene is hers). "Shadow Dancer" is left out (rule 13: "Dancer").
- **The temple's children and the Malazans** meet in the last step and the vision stops there: the canon escape underground is not shown.
- **Hurlochel's vigil** is Claude's frame (W15 gives Dujek's death two bells before Paran returns, Rythe Bude and Noto Boil at the cot); "Captain Kindly" and the unspoken real name follow Ch4's rule of never printing "Paran".
- **Keneb's excuse** (water casks) is a words-only choice; either way he will tell the Adjunct whose word it was (W16: he admits it to Tavore).
- **The lights' hour.** Reactor ch 20 has the twelve "suns" leave spots "in the blue sky" with the moon above, which reads as daytime; Ch6 (and its notes) put them on a night march. The vision says only "the moon is up" and paints a deep blue sky, so it fits either. **Open for the lead/David:** a page check of ch 20 for day or night.
- **Rythe Bude** has no pronoun anywhere in the vision (gender unchecked).

## Open, for David's copy

- BH ch 20: day or night when the lights fall; their exact count (W: a dozen; Reactor: twelve).
- BH ch 15: who is at Dujek's cot when he dies.
- BH ch 1: whether the well scene is Leoman's viewpoint or Corabb's (written as Leoman's, as the sheet names it).
