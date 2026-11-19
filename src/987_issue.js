/* v13.53.0: what a recruit walks in wearing (David, Nov 19, 2026: "the amount and usefulness of armor seems especially lacking in some areas";
   recruits "feel like they are missing a bunch of the basic upgrades"). Every soldier's sheet already says what they wear (TPL armour). For the
   recruits that line is now a piece of kit: their own, worn by nobody else, +2 armour for a soldier in mail or heavier and +1 for the rest.
   The regulars are not given one: they have carried the books' armour since their first chapter.
   A join gives it (recruit); a save from before is given it once (migrate). It never displaces a piece already worn. */
const OWN_REGULARS = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl', 'haddat', 'tangle', 'marrow', 'mirrel', 'tobet', 'thegg', 'perrit', 'ammet'];
const ownKey = id => 'own_' + id;
const ownIds = () => Object.keys(TPL).filter(k => TPL[k].ab && TPL[k].bio && TPL[k].armour && PICKS[3][k] && !OWN_REGULARS.includes(k));
ownIds().forEach(id => { const heavy = (TPL_ROLES[id] || []).some(r => r === 'heavy' || r === 'mail'), t = TPL[id], k = ownKey(id);
  ITEMS[k] = {name:`${t.name}'s own armour`, slot:'armour', who:[id], ac:heavy ? 2 : 1, own:true, heavyOwn:heavy, line:`${t.armour}. ${t.name} came with it and will leave with it.`}; });
/* the picture: a mail coat or a leather one from the books' own armour (the chapters' items are gathered after this file loads, so it is done on first need) */
function ownArt(){ if (ownArt.done || typeof ART === 'undefined') return; const pic = heavy => { const k = Object.keys(ITEMS).find(k => !ITEMS[k].own && ITEMS[k].slot === 'armour' && ART['item/' + k] && (heavy ? /mail/i : /leather|jerkin|hide/i).test(ITEMS[k].name)); return k ? 'item/' + k : null; };
  const pH = pic(true), pL = pic(false); if (!pH || !pL) return; ownArt.done = true;
  ownIds().forEach(id => { const k = ownKey(id), a = ITEMS[k].heavyOwn ? pH : pL; ART['item/' + k] = ART[a].replace(/aria-label="[^"]*"/, `aria-label="${ITEMS[k].name.replace(/"/g, '')}"`); if (typeof ART_SIZE !== 'undefined' && ART_SIZE[a]) ART_SIZE['item/' + k] = ART_SIZE[a]; }); }
if (typeof setTimeout === 'function') setTimeout(ownArt, 0);
function ownGive(s, id, camp){ ownArt(); const k = ownKey(id); if (!ITEMS[k] || !s || !Array.isArray(s.kit)) return false; s.gear ??= {}; if (!camp) s.gear[id] ??= {};
  const had = s.kit.includes(k); if (!had) s.kit.push(k);
  const worn = Object.values(s.gear).some(g => g && Object.values(g).includes(k)) || Object.values(s.parked || {}).some(p => p && Object.values(p).includes(k));
  if (camp) { if (!worn && s.parked && !Object.values(s.parked[id] || {}).some(g => ITEMS[g] && ITEMS[g].slot === 'armour')) (s.parked[id] ??= {}).armour = k; return !had; } // at camp a soldier's kit is parked with them (38c)
  if (!worn && !Object.values(s.gear[id]).some(g => ITEMS[g] && ITEMS[g].slot === 'armour')) s.gear[id].armour = k; // only into an empty place
  return !had; }
{ const _recruit = recruit; recruit = function(id){ const r = _recruit(id); try { if (S && S.squad && S.squad.includes(id)) ownGive(S, id); } catch (e) {} return r; }; }
{ const _migrate = migrate; migrate = function(s){ const r = _migrate(s) || s; try { if (r && !r.ownGiven) { r.ownGiven = 1;
      [r, ...Object.values(r.th || {})].forEach(t => { if (!t) return; const o = t === r ? r : t; const kit = Array.isArray(o.kit) ? o : r; // a thread without its own pack shares the save's
        (o.squad || []).forEach(id => { if (ITEMS[ownKey(id)]) ownGive({kit:kit.kit, gear:(o.gear ??= {}), parked:o.parked}, id); });
        (o.camp || []).filter(id => !(o.squad || []).includes(id)).forEach(id => { if (ITEMS[ownKey(id)]) ownGive({kit:kit.kit, gear:(o.gear ??= {}), parked:(o.parked ??= {})}, id, true); }); }); } } catch (e) {} return r; }; }
/* reach, taught once: the first reach weapon into the pack says what it does */
{ const _gain = gain; gain = function(id){ const had = S && S.kit && S.kit.includes(id); const r = _gain(id); try { const it = ITEMS[id]; if (it && it.reach && !had && S.f && !S.f.reachTold) { S.f.reachTold = 1; note('A weapon with reach strikes an enemy two tiles away: over a squadmate\'s shoulder, or before the enemy can close.', 'good'); } } catch (e) {} return r; }; }
/* whoever walks into a fight has theirs: a soldier put in the squad by any other road (a book's opening roster, the camp) is not missed */
{ const _startBattle = startBattle; startBattle = function(...a){ try { if (S && Array.isArray(S.squad) && Array.isArray(S.kit)) S.squad.forEach(id => { if (ITEMS[ownKey(id)]) ownGive(S, id); }); } catch (e) {} return _startBattle.apply(this, a); }; }
