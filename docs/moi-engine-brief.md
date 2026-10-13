# Book Three: the shelf — engine and title brief (v6.0)

Tue Oct 13, 2026. The work order for Book Three's engine (`src/60_book3.js`, `src/60c_b3_deck.js`) and its title art (`src/60b_b3_title.js`). Chapter writers build on what this file promises, so build exactly these names.

## The book

- **Book Three, *The Fair Exchange*, beside *Memories of Ice*.** Book id **`moi`**, `n:3`, `word:'Three'`, `title:'Memories of Ice'`, `name:'The Fair Exchange'`, `h1:['The Fair', 'Exchange']`, `squad:'Fourth Squad'`, `unit:'the Fourth'`.
- **Tag (the flavor line, shown under the name on the title):** "The Host is outlawed, and marches beside the enemy it fought for ten years. Five marines go south with it, into a country that has eaten itself."
- **Blurb:** "Genabackis, the spring after the Fete, beside Memories of Ice. The Fourth Squad again, with Onearm's Host and Caladan Brood's army, from the parley at Pale to Coral. Plays on its own; a finished Book One on the outlaw road can carry its Fourth across." + progress ("Chapter One so far." … "All seven chapters.") computed from registered chapters, like `dgProgress`.
- `titleArt:'title/moi'`, `titleScene:'moi'` (the classic canvas backdrop), `patch:'insignia/patch'` — **the Fourth's own round IV patch returns exactly as it is** (rule in `docs/patches.md`: "If the Fourth return, their round IV patch returns as it is"). Add one line to `docs/patches.md` saying Book Three uses it.
- Quick Ben's line at Coral is the title: "High Fist, it is a fair exchange." (never quote it before Chapter 7).

**Canon:** read `docs/moi-canon.md` (the sourced sheet; §6 hard limits are binding) and `docs/series-canon.md` §(a) (keep-open rules) before writing a word of text.

## What already exists (read it)

Book Two is the model for everything: `src/47_book2.js` (squad, systems, import, glossary, VISREADER), `src/47c_b2_deck.js` (a book's own Deck), `src/47d_b2_title.js` (painted title SVG, classic canvas title, patch), `src/56_b2_visions.js`, `src/38b_series.js` (journal and deeds per book), `src/29_title_intro.js` (the Book picker and import field), `src/15_state.js` (`setBook`, `migrate`), `src/14_data.js` (`BOOKS`, `BOOKSNAP`, `registerChapter`), `src/90_resume_boot.js` (registration), `docs/v4.0-notes.md`, `docs/dg-ch1-brief.md`, `tools/play.mjs` (`--book=dg`, `SYNTH_DG`), `tools/lint.mjs`.

## The squad: the Fourth comes back

- **Order `['sgt','brisk','kettle','tuft','ohl']`** — Book One's own templates, stats, abilities, picks, portraits and sprites. They keep their Book One looks and hands; Book Three changes their *lives*.
- **Per-book biography.** Book One's `TPL.brisk` etc. read Book One flags (`squadQuest`, `get quest()`), and `TPL.sgt` is already swapped per book. Extend `setBook` (wrap it in `60_book3.js`; do not rewrite 15) so that in `moi` the Fourth's `bio2`, `quest`, `banter`, `rel`, `epithet` and `service` come from `BOOKSNAP.moi.tpl[id]` and Book One's come back when the book changes (save/restore property descriptors the way `BOOKSNAP.*.sgt` does). Write those Book Three texts yourself, from `docs/story-bible.md` §1 (the end of each arc) and the canon sheet, in the established voice:
  - **The sergeant** (`BOOKSNAP.moi.sgt`): the same Untan sergeant, after the Fete, on the outlaw road; Dujek noticed ("You came up out of the Pale with all five"); the count. Quest: Whiskeyjack's leg (Mallet wanted a week flat on his back; he won't give it). Never heal it (rule 7).
  - **Brisk**: Tav (Tavrin, Fourth Regiment of the Second) is alive and *in the Host* — she can walk to his cook-fire now. The letter is opened ("four coppers"). Quest: two of them in one army, marching into a war; "we don't leave people".
  - **Kettle**: the Moranth debt settled or carried; the quorls are *here*, the Black Moranth fly for Dujek. Quest: the quorls, and Maud.
  - **Tuft**: kept her promise on the hill: the Rhivi child is Tattersail (never "only" Tattersail: rule 4). Quest: the child is with Brood's army now, growing years in weeks, and a man in a fur cloak wants her dead.
  - **Ohl**: the list (use `listCount()` only if it is book-safe; otherwise "more than two hundred names"). Seven Cities, his country, is in rebellion this year (rumour only). Quest: Denul in the Pannion lands is poisoned; he has heard of a priest whose warren ate him.
- **Fresh start** (no import): the Fourth all lived through Book One; Ellis and Vell are not with them. Text must never assume a Book One branch except: all five came out; Tuft knows the child is Tattersail; Brisk's Tav is alive in the Host; they are on the outlaw road.
- **Recruits** (new, Book Three), **one at a time** in the normal case; both are defined here (TPL, VERB, STATUP, PICKS[3], PATRONS, an ability each, portrait and sprite by the artist), and the chapters stage their joining:
  - **`sohra` — Sohra**, a Rhivi herd-rider and spirit-singer, about twenty, met in Chapter 1 or 2 (horn bow, `mark`; plus **`b3_song`**, *Spirit-Song of the Herds*: once a fight, every squadmate within 3 heals 2+level/2 and gets +1 to hit through the next round; spirit-craft, it never burns). The Rhivi lend her to the Fourth to keep an eye on the Malazans for the Mhybe. God: the Rhivi spirits (the herds' dead).
  - **`greysword` — Dannet**, a Capan second daughter who became a Grey Sword acolyte; Fener is gone and the company is turning to the Wolves. Shield and sword (`bash`), plus **`b3_howl`**, *The Wolf's Howl*: enemies within 2 take −2 to hit until her next turn; recharges after 3 rounds. Lent to the Malazans as a guide through the Domin after Capustan (Chapter 3 or 4). God: Togg and Fanderay, the Wolves of Winter.
  - Check both names against `docs/moi-canon.md` §7 and the whole series (they were checked by the lead, but look again); report any clash.
- **Recruit cap.** The squad is at most six (the sergeant, the four, and one recruit). `b3Room()` returns how many may join: `6 − S.squad.length`; an import that lost squadmates leaves room for both recruits at once. `b3SwapIn(id)` swaps the walking recruit for the waiting one (like `b2SwapIn`, in `src/57c_b2_keth.js`; read it).
- **Gods.** Brisk Hood, Kettle Oponn, Tuft Shadowthrone, Ohl Soliel as in Book One. **The sergeant's god in Book Three is Treach**, the Tiger of Summer: Fener has been torn down this year (DG) and does not answer; write Treach's patron text (`PATRONS` is keyed by id, so make the sergeant's entry per-book: Fener in `gotm`/`dg`, Treach in `moi`). Sohra the Rhivi spirits, Dannet the Wolves.

## Import from Book One

- The title's import field shows for Book Three when there are **finished Book One saves on the outlaw road** (`chapters[7] === 'outlaw'`). Label: "Bring a Book One sergeant and the Fourth". Fine print: "Only a finished Book One on the outlaw road: that Fourth marched north with the Host. The other roads lead elsewhere."
- Picking one **uses that sergeant's name** (fill and lock the name field; a fresh start unlocks it) and `newStateMOI(name, importId)` builds:
  - `S.squad`: the sergeant plus every Book One squadmate who is alive and followed the road (`!(o.dead||{})[k] && (o.f.c7_follow||{})[k] !== false`), from `brisk, kettle, tuft, ohl, ellis, vell`, in Book One's order.
  - `S.loy`: their loyalty, clamped to −2..3. `S.imported = {from, sid, road:'outlaw', dead:[...], f:{...}}` where `f` keeps the Book One flags a writer may want: `c7_tav, c7_letter, c7_debt, c7_chub, c6_tuft, c7_tuftCut, c5_tuftMarked, c4_key, c4_vell, c6_key, c7_wjKnows, c7_wjReport, sgtScar, c2_ellisJoined, c5_ellisThrough, c7_ellisBack`, plus `listCount()` as `list`. A helper `b3Was(k)` reads `S.imported.f[k]` (undefined on a fresh start).
  - Ellis and Vell keep their Book One templates. Ellis's hunt for Toc must never succeed (series rule 5).
- A dead squadmate stays dead: their slot is room for a recruit, and the chapters mourn them by name where it fits (`b3Fallen()` lists `S.imported.dead`).

## Systems

All Book Three code is guarded by `S.book === 'moi'` and sits in `src/60_book3.js`. Ids carry **`b3_`** (areas, nodes, fights, foes, gear, scenes, tricks, flags `S.f.b3_*`).

1. **The Alliance** — `S.ally = {trust, dread}`, both 0..12, new game `{trust:5, dread:1}`.
   - `ally(dTrust, dDread, why)` changes them and notes it (like `chain()`), tallies, updates the HUD pill (`#chainp`, like `updChain`: "Trust **n** · Dread **n**").
   - `allyHTML(road)`: the widget for a node's `html` (two bars, a road caption), styled like `chainHTML` (reuse `.chainbox`).
   - **Trust** is how far Brood's peoples (Rhivi, Barghast, Tiste Andii, the Grey Swords) trust the Fourth. A fight may name an ally: `def.aid = {kind:'b3_rhivi_rider', at:[x,y], need:8}` (or an array). At trust ≥ `need` (default 8) that ally fights beside the squad (a unit made like Hackle with `mkAlly`, scaled by level; define the allied foes here: `b3_rhivi_rider` (horn bow), `b3_barghast` (white-faced warrior, two-handed blade), `b3_andii` (Tiste Andii swordsman-mage, cold), `b3_greysword` (Grey Sword trooper), `b3_moranth` (Black Moranth soldier, chitin, munitions)), with a log line. Below `need` a short log line says who did not come.
   - **Dread** is what the Domin does to the mind: the Tenescowri, the K'ell Hunters, the Seer's cold. At dread ≥ 6 the squad starts every fight **shaken** (−1 to hit for the first two rounds); at ≥ 10 **haunted** (−1 to hit all fight and −1 initiative). Log lines say so. `b3Rest(t)`: a full rest that also lowers dread by 2 (a fire, a song, the Host around you); rest is free in Book Three (the Host feeds its own) unless a node says otherwise.
2. **Poisoned warrens** (canon: in Pannion lands the Crippled God's poison runs in the warrens; a Capustan healer's warren ate him). `S.f.b3_domin = 1` is set by the chapters once the squad is in the Domin (Chapter 5 on; Capustan's siege ground counts from Chapter 3). While set, a strain-costing spell by a squadmate may **burn** its caster for `1d4 + max(0, chapter−3)` damage (never below 1 health), chance 10% Ch3, 15% Ch4, 20% Ch5, 25% Ch6, 30% Ch7; a log line in Ohl's or Tuft's register ("Denul comes up hot, and something in it bites."). Spirit-craft (`a.spirit`: Sohra's song) and Elder tricks (`a.elder`) never burn. Count `S.f.b3_burns`.
3. **Shaken/haunted** as above; also expose `b3Dread()` for text.
4. **The squad away for one fight** (`def.away`), **hurtMost**, and **lastStand** — Book Two has these; give Book Three the same three behaviours (guard on `S.book === 'moi'`, or generalise Book Two's guards to `S.book !== 'gotm'` where safe).
5. **Mortal fights** — Book One's `mortal:true` (permanent death, `kill(id)`) must work in Book Three (check it does).

## The Deck in Book Three (`src/60c_b3_deck.js`)

- Model it on `src/47c_b2_deck.js`. **The reader is Tuft** while she is in the squad and alive (she read for Book One: use her voice); without her, Sohra reads the Rhivi way (bones and smoke, not cards, but the same cards come up); without both, "Old Benna", a Host laundress who reads cards for coppers. `VISREADER` must return the right one in `moi`.
- **Cards** (`B3CARDS`, ids `b3c_*`), with art by the title artist, each with an engine-wide effect while `S.card` is it (effects in this file, like 47c):
  - **Knight of High House Dark** (b3c_knight) — the squad's first hit each fight does +3.
  - **Hood's Herald** — no. Use instead **Soldier of High House Life** (b3c_lifesoldier) — healing on the squad's side heals +2.
  - **The Gate** (Hood's, b3c_gate, High House Death) — the first squadmate to go down each fight stands back up at 1 health (once a fight).
  - **Obelisk** (b3c_obelisk, Unaligned) — dread rises by 1 less each time it rises (min 0).
  - **The Mason of High House Death** (b3c_mason) — the squad's blasts hit +2 (reuse Book Two's effect pattern).
  - **The King in Chains** (b3c_kingchains, **High House Chains**, the new House in the Deck this year) — enemies get +1 to hit, but every enemy that falls heals the squadmate who felled it by 2. Tuft has never seen the House before; it is the Crippled God's.
  - **The Consort** (b3c_consort, High House Chains) — the squad's free swings hit +2, and enemies' free swings −2.
  - **The Leper** (b3c_leper, High House Chains) — poisoned warrens never burn the caster, but spells heal or harm 1 less.
  Every card's text says what it does in one line, in the game's voice.
- **Pools per chapter** (`B3POOL[n]`, leaning to one card per chapter, the House of Chains coming in from Chapter 4): Ch1 knight, obelisk, lifesoldier; Ch2 obelisk, gate, knight; Ch3 mason, knight, gate; Ch4 kingchains, lifesoldier, obelisk; Ch5 consort, leper, mason; Ch6 leper, knight, kingchains; Ch7 gate, consort, kingchains.
- **Readings**: `b3DeckChoice(n)`, `b3DeckOffer(n)`, `b3DeckCard(n)` exactly like Book Two's, reading a per-chapter table `B3DECK[n] = {scene, where, back, backT, say:{tuft, sohra, benna}}`. **Chapter writers fill `B3DECK[n]` from their own chapter file**; you write `B3DECK[1]` as the example, and say in the file how it works. The card node ids are `b3_c<n>_card` (make `cardNodeName()` in 36b book-aware for `moi`).
- **Visions** come later (a visions pass after the chapters). Make sure 36b's "Look into the card" simply offers nothing in `moi` until a `B3VIS` table exists, and that adding `book:'moi'` entries later just works.

## Title, picker, journal, deeds

- **Title picker**: three books in the segmented control (it is generated from `BOOKS`, so check layout at 360 px wide: three buttons must fit; shrink the small subtitle text if needed). `titleDress('moi')` wears Book Three's art, patch, name and tag. The footer credit line lists Book Three with its chapter progress. Roster rows say "Book Three".
- **Begin** in `moi`: `S = newStateMOI(name, importId); S.diff = diff; save(); startChapter(1)` (no prologue, no intro screen unless you add one as Book Two did not).
- **`38b_series.js`**: journal head and Deeds already go per book; make sure a `moi` save gets its own Deeds section ("Book Three"), its own route map (a simple route drawing for Book Three: Pale → the Rhivi Plain → Capustan → the Catlin → the Maurik → Coral; draw it in the series map style; nothing fancy), the alliance numbers in the count, and the fallen. "Where the books meet": add Book Three's row (concurrent with Book Two: the spring and summer after the Fete; Genabackis).
- **Glossary** `GLOSSX.moi`: the Host, Onearm's Host outlawed (as rumour only), Caladan Brood, the Rhivi, the Barghast, the Tiste Andii, Moon's Spawn, the Pannion Domin, the Seer, Tenescowri (headline), K'Chain Che'Malle (unlocked by a flag), Capustan, the Grey Swords, Treach, the Black Moranth and quorls, warrens poisoned. Some unlocked by `S.f.b3_*` flags the chapters set; list those flag names in your notes.
- **Ambience**: map Book Three's scene/area names to the existing ambience beds in `13_audio…js` (plain, camp, city, rain, wind, night); add names, not new synthesis, unless trivial.

## Book One safety (important)

Book Three shares Book One's squad ids, so Book One's own logic keyed on those ids can leak. Audit every non-chapter file for code that reads Book One flags or behaves Book-One-only on `brisk`/`kettle`/`tuft`/`ohl`/`ellis`/`vell` (e.g. `squadQuest`, `maudKept()`, `listCount()`, Tuft's card captions in 21, `tuftVisions`/`seenVis`, Ohl's list in sheets, the Maud rule, the prologue's journal reads, end-screen lines in 37 that already check `BOOK==='gotm'`), and guard it with `S.book === 'gotm'` / `BOOK === 'gotm'` where it must not run in Book Three — **without changing anything Book One does**. List every such guard in your notes.

## Tests (all must pass)

- `python3 build.py`; `node --check` on your files; `node tools/lint.mjs` 0 errors — extend the lint so `b3_` areas and nodes are checked under Book Three states (`S.book='moi'`, the Fourth, `S.ally`), like Book Two's.
- `tools/play.mjs`: add `--book=moi` (picks Book Three on the form; the run ends at the last written chapter's end screen) and `SYNTH_MOI` for `--from=N` (start of Book Three's chapter N, built with `newStateMOI` and plausible earlier keys: `S.f.b3_cN_key` values from `docs/moi-book-brief.md`, level ≈ N+1, trust 6, dread 3, `b3_domin` from Ch3, Sohra in the squad from Ch2, Dannet waiting from Ch4). Until chapters exist, `--book=moi` cannot play; make that a clean skip with a message, not a crash.
- **A new `tools/moi_test.mjs`** (headless Playwright, `executablePath:'/opt/pw-browsers/chromium'`, like the other tests): fresh Book Three state has the right squad, trust/dread, pill; `setBook` swaps the Fourth's bios and back (Book One bios unchanged after a round-trip); the import picks only outlaw-road saves and brings name, squad, loyalty and dead; a dead import leaves room for both recruits; ally aid joins at trust ≥ need and not below; shaken/haunted apply; poisoned warrens burn only with `b3_domin` and never on spirit/elder; the sergeant's god is Treach in `moi` and Fener in `gotm`; the title picker shows three books and dresses Book Three; Deeds has a Book Three section; a `b3c_*` card's effect works.
- `node tools/play.mjs 2` (Book One) 2/2 and `node tools/play.mjs 2 --book=dg` 2/2, then `node tools/run_all.mjs` PASS.
- Don't commit or push; don't touch `sw.js` or `src/10_preamble.js`. Write `docs/v6.0-notes.md` (what you built, every function and flag name a chapter writer will use, every Book One guard you added, open questions).
