# Item artwork: the standard

Every item in the game has a picture. This applies to every book and every chapter, from now on.

## Rules

- **Same commit.** A new item gets its drawing in the same commit that adds it to `ITEMS` (a chapter's `gear`).
- **The lint enforces it.** `tools/lint.mjs` fails with "no artwork" for any item without `ART['item/<key>']`.
- **Book One** draws on the design-canvas boards `docs/art/Arms.dc.html` and `docs/art/Trinkets.dc.html`. Their labels are mapped to keys in `ITEM` in `tools/art_build.py`.
- **Book Two and later** draw in `tools/art_dg_items.py`, as one entry per item in `W` (weapons), `A` (armour) or `T` (trinkets). Each entry has:
  - the key;
  - the label (the item's name);
  - the chapter;
  - the stats;
  - who can use it;
  - a one-line caption;
  - the SVG body.

  The script writes the boards `docs/art/ArmsDG.dc.html` and `docs/art/TrinketsDG.dc.html`, plus the label-to-key map `items_dg.json`.
- **Frame sizes.**

  | Kind | viewBox | Background |
  |---|---|---|
  | Weapons | 0 0 200 150 | `url(#dwbg)` |
  | Armour | 0 0 200 150 | `url(#dabg)` |
  | Trinkets | 0 0 240 130 | `url(#dtbg)` |
- **Shared definitions.** Shared gradients and patterns live in `DEFS` in the script: `dtglow`, `dcold`, `dmail`, `dmail2`, `rings` and `scales`.
- **Style.** Lit from the upper left, with no outline on the ground. Signal an item's special effect in the picture:
  - heavy armour gets the noon sun mark;
  - anything uncanny gets a faint shimmer (`class="shimmer"`).

## Build

```
python3 tools/art_dg_items.py && python3 tools/art_build.py && python3 build.py
```
