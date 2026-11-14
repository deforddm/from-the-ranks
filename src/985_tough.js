/* ============ v13.4 toughness reset (David, Nov 12-13, 2026; series-polish-plan.md §0c.1) ============
   Books One to Five drop an ordinary soldier in about six good hits; from Book Six it drifted, and Books Eight to Ten were fights against
   four or five 200-health sponges, which is why munitions, pushback and the Whisper faded there. David chose "B, plus A for the tiny fights":
   health back down to the six-hit scale, and the danger given back as to-hit and damage, same layouts (fights of three enemies or fewer
   get a few more, by hand, in their chapters). This is the last word on a foe's numbers: it wraps every book's mkFoe (loaded after them).
   TOUGH[book] = {hp ×, atk +, dmg +}, on Soldier and Bridgeburner (Story keeps its own easy numbers); the deathless are left alone.
   The per-fight rows (SOLDIER_FIGHT, B1GAP.., B6GAP..B10GAP) still sit under this and are re-tuned after it. ---- */
const TOUGH = {   // calibrated Nov 13, 2026 with the Whisper bot, 10 runs a fight (series-polish-plan.md §0c; numbers in resume.md)
  moi:{hp:.75, atk:0, dmg:1}, hoc:{hp:.75, atk:1, dmg:2},
  bh:{hp:.65, atk:2, dmg:3}, rg:{hp:.75, atk:1, dmg:2},
  tth:{hp:.7, atk:4, dmg:8}, dod:{hp:.65, atk:3, dmg:6}, tcg:{hp:.7, atk:3, dmg:7},
};
/* TFIGHT[id] = {s: k, b: k}: a fight's own step on Soldier (s) and Bridgeburner (b), after TOUGH. Each step is +1 to hit, and every
   third step +1 damage; a negative step eases. Health is left alone so the fight keeps its length. Set by the per-fight pass. */
const TFIGHT = {};
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra);
    if (!S || u.immortal || DIFF() === DIFFS.story) return u;
    const t = TOUGH[S.book || 'gotm'], tf = B && B.id && TFIGHT[B.id], st = tf ? tf[(S.diff || 'soldier') === 'bridgeburner' ? 'b' : 's'] || 0 : 0;
    const hp = t ? t.hp : 1, atk = (t ? t.atk || 0 : 0) + st, dmg = (t ? t.dmg || 0 : 0) + Math.trunc(st / 3);
    if (hp !== 1) u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * hp));
    u.atk = (u.atk || 0) + atk;
    if (u.dmg && dmg) u.dmg = [u.dmg[0], u.dmg[1], Math.max(0, (u.dmg[2] || 0) + dmg)];
    return u; }; }
