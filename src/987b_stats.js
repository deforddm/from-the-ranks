/* ============ v13.56.0: starting Might, Wits and Guile evened out (David, Nov 19, 2026: "approved"; series-polish-plan.md §0g) ============
   Everyone starts on a total of 5 with nobody above 3. A soldier short of 5 gained in the lowest stat; Vasso, the only 6, gave one back.
   The +1 gains at levels 4, 8 and 12 go on at 16, 20 and 24, turn about between the soldier's two growth stats (015's lvStat). */
const STAT_START = {brisk:[3,1,1], ohl:[1,3,1], haddat:[2,2,1], marrow:[1,3,1], redblade:[2,2,1], warlock:[1,2,2], greysword:[2,2,1], tallow:[1,2,2], hessa:[2,2,1], darrut:[2,2,1],
  orvas:[1,2,2], mirrel:[1,3,1], tobet:[1,2,2], thegg:[3,1,1], ammet:[1,3,1], brune:[2,2,1], ottar:[3,1,1], brannoc:[2,2,1], doss:[2,2,1], sorvan:[2,2,1], vasso:[1,1,3], edrem:[3,1,1],
  brask:[3,1,1], brennet:[2,2,1], pruss:[3,1,1]};
Object.entries(STAT_START).forEach(([id, [m, w, g]]) => { const t = TPL[id]; if (t && t.st) Object.assign(t.st, {might:m, wits:w, guile:g}); else console.warn('stats: no sheet for', id); });
{ const _lv = lvStat; lvStat = function(id, stat){ const u = STATUP[id], l = (S && S.lvl) || 1; return _lv(id, stat) + (!u ? 0 : (u[1] === stat && l >= 16 ? 1 : 0) + (u[0] === stat && l >= 20 ? 1 : 0) + (u[1] === stat && l >= 24 ? 1 : 0)); }; }
