# Brief: a "yes, but" cost for every check (v6.2.0)

David's ask (Wed Oct 14, 2026): every skill check should have its own "yes, but" cost that fits its scene. Until v6.1.2, a check without one charged "three silver to make it go away", which made no sense in most scenes. Since v6.1.2 the generic fallback (src/16_skill_checks.js `settleRoll`) costs the roller health at the next fight (Might) or rattles them (Wits/Guile). Now every check gets a bespoke cost written for its own moment.

## How a check works
A choice with `check:['stat', DC]` rolls. Missing by 1–2 is a "yes, but": the choice still succeeds (it goes to `go`), and the cost is paid. A choice can carry
`near:{t:'text' | ()=>'text', fx:()=>{ ... }}` — `t` is shown in the red "bad" note box at the top of the next page; `fx` applies the mechanical cost. `ROLL().who` is the id of whoever rolled; `NAME(id)` gives their name. Choices with `trick:` never get a "yes, but" (skip them).

## The model to copy (src/49_b2_ch2.js, Dryj Spring)
```js
near:{t:()=>`Yes, but the last of them heard the dog. He is down now, but a lance-butt found ${NAME(ROLL().who || 'sathi')} in the scrub on the way: ${bruiseN()} health down at the start of the fight.`, fx:()=>bruise(ROLL().who || 'sathi', bruiseN())},
```
Book One has many good examples too: grep `near:` in src/40_chapter1.js, src/43_chapter4.js, src/44_chapter5.js, src/46_chapter7.js.

## Costs you can use (pick what the scene earns; vary them)
- **Skin:** `bruise(id, bruiseN())` — that soldier starts the next fight `bruiseN()` health down. Only where a fight plausibly follows soon, or say "the next fight".
- **Rattled:** `S.rattled ??= {}; S.rattled[id] = 1` — −1 on their next check. Say "−1 on the next check".
- **Supplies:** a munition or salve — `if (S.inv.salve > 0) S.inv.salve--` (also `sharper`, `burner`, `cusser`, `smoker`). Always guard and give a fallback (rattled) when there is none, and make the text match what actually happened (use a `t` function that checks a flag set by fx, or decide inside `t` the same way fx will).
- **Book Two only — water:** read how water works in src/47_book2.js / src/58_b2_kit.js (e.g. `S.chain.water`) and use the existing helper if there is one. Water is Book Two's currency; thirst-costing exertion fits the Chain.
- **Book Two — the column / refugees** (`S.chain` fields) if a helper exists for losing stragglers etc.
- **Loyalty:** `S.loy[id] = (S.loy[id]||0) - 1` when a squadmate is put out by how it went (say so).
- **Silver** ONLY where the scene is literally about money or a bribe, in Book One/Three. Never in Book Two (water is the money there).
- **A story flag** (`S.f.<chapterprefix>_<name> = 1`) is fine as an extra, but only if you also give an immediate mechanical cost; don't invent flags that nothing reads unless you also read them somewhere sensible nearby.
Everything must be safe if the roller is not the named character (use `ROLL().who || '<fallback id>'`) and if the inventory is empty.

## Voice
Match the surrounding prose: plain, concrete, grim, wry. Start the text with "Yes, but". One or two sentences. Name the mechanical cost plainly at the end after a colon ("…: −1 on the next check." / "…: 4 health down at the start of the fight." — for skin use `${bruiseN()}`). No lurid content. Don't contradict what the success page (`go`) then says — read the node it goes to.

## Rules
- Edit ONLY the files assigned to you. Don't touch src/16_skill_checks.js, build.py, sw.js, src/10_preamble.js, README or index.html.
- Add `near:` on the same choice object as `check:`; don't restructure anything else.
- After editing, run `node --check` on each edited file (they are plain scripts; if `node --check` complains about top-level syntax, instead run `python3 build.py` and then `node tools/lint.mjs` — but do NOT commit). Report the line/node id of every check you gave a cost and a one-line summary of each cost.
