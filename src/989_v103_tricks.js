/* ============ v10.3 (David, Sun Nov 8, 2026, 8:50 PM PST): tricks that don't strike are free; three tricks become passive ============
   Loaded after every book's tricks (14x-12x) and before the boot (990).
   - FREE: a trick that doesn't strike a foe or take its turn away no longer uses the bearer's action. One free trick a squadmate a
     turn (abOk/useAb in 031, `u.freeTrick`). Strikes, Omtose Rime and the Herd-Call still use the action, and so do the group heals.
   - PASSIVE: Barghast Blood-Iron, the Long Listen and the Pilot's Eye work on their own at the start of every fight the bearer walks
     into: no button (031's trickAbs filter), nothing to spend. */
const V103_FREE = ['line', 'dark', 'otataral', 'b2_drop', 'b2_earth', 'b2_paint', 'b2_squint', 'b3_c4_wolfrope', 'b4_c1_gate',
  'b4_c2_crow', 'b4_c3_tears', 'b4_c5_seabed', 'b5_c6_finger', 'b6_c1_map', 'b6_c4_vinegar', 'b7_c2_margin', 'b7_c6_ward'];
const V103_PASSIVE = ['b3_c5_blood', 'b4_c6_listen', 'b5_c2_pilot', 'b8_c5_grass']; // v11.0: Book Eight's Ch 5 Grass-Running (docs/tth-book-brief.md), defined by its chapter
const V103_FREE_LINE = ' It does not use the action (one free trick a turn).';
const V103_PASSIVE_LINE = ' Always on: it works by itself at the start of every fight the bearer is in. Nothing to press.';
/* a trick's own words, said its new way: Once a fight now reads as a free trick or a passive one */
function v103Words(k, add, strip){
  const t = TRICKS[k]; if (!t) return;
  const d = Object.getOwnPropertyDescriptor(t, 'fx'); const base = d && d.get ? d.get : (() => d ? d.value : '');
  Object.defineProperty(t, 'fx', {configurable:true, enumerable:true, get(){ let s = String(base.call(t) || ''); if (strip) s = s.replace(/^Once a fight:\s*/, ''); return s + add; }});
}
V103_FREE.forEach(k => { const t = TRICKS[k]; const a = t && t.ab && AB[t.ab]; if (!a) return; a.free = true; v103Words(k, V103_FREE_LINE);
  if (typeof a.desc === 'function') { const d0 = a.desc; a.desc = function(){ const s = String(d0.apply(this, arguments) || ''); return s.includes('does not use the action') ? s : s + V103_FREE_LINE; }; } });
V103_PASSIVE.forEach(k => { const t = TRICKS[k]; const a = t && t.ab && AB[t.ab]; if (!a) return; a.passive = true; a.free = true; v103Words(k, V103_PASSIVE_LINE, true); });
/* the passives switch on as the fight opens: the bearer's own blade (Blood-Iron), or the listening (the Long Listen, the Pilot's Eye) */
function v103Passives(){
  if (!B || B.over) return;
  party().forEach(u => { if (u.ally || u.hp <= 0) return;
    V103_PASSIVE.forEach(k => { const t = TRICKS[k], a = t && AB[t.ab]; if (!a || trickBy(k) !== u.id || B.used[t.ab]) return;
      B.used[t.ab] = 1; const hs = B.healSrc; try { a.run(u, u.x, u.y); } catch (e) { console.warn('passive', k, e); } finally { B.healSrc = hs; } }); });
}
{ const _sb = startBattle; startBattle = function(){ const r = _sb.apply(this, arguments); try { v103Passives(); } catch (e) { console.warn('v103 passives', e); } return r; }; }
