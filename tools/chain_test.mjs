// The transfer chain (polish plan §2, Nov 14, 2026): every link where a finished book's squad crosses into a later book, end to end.
// Each source save is made the way a finished one is (its book's road at chapters[7], a level, a trinket on every soldier, a talent, a
// veteran pick, a held trick, a loyalty, and on one link a death), saved to its slot, and the next book's new state is built from it
// through the same function the new-sergeant form calls. Then the next book's half for that squad is checked against the source half:
// who comes across (the dead never do), level, gear on each soldier, the kit, talents and picks, tricks and their holders, loyalty.
// The links: One→Three (outlaw), Two→Four, Four→Six (the Third, line road), Three→Six (the Fourth, host road), Five→Seven (Letherii,
// emperor), Six→Seven (the Third, adjunct), Three→Eight (daru), Six→Eight (the Fourth, home), Seven→Nine (both), Nine→Ten (both),
// Eight→Ten (the Fourth, east; by design they come only as allies in Chapter 7, never played, so their unworn kit and tricks stay
// behind and only who comes, level, worn gear and picks are checked). Together they carry one save's squads through all ten books.
// Usage: node tools/chain_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, {});
const r = await page.evaluate(() => {
  const out = [], DEF = {bh: 'r', rg: 't', dod: 't', tcg: 't'};
  const half = (o, t) => !t || !o.th ? o : (o.thread || DEF[o.book]) === t ? o : o.th[t];
  const trinkets = Object.keys(ITEMS).filter(k => ITEMS[k].slot === 'trinket'); let ti = 0;
  const trickKeys = Object.keys(TRICKS); let tk = 0;
  /* finish one half: what a squad that played its book through would carry */
  function finish(o, t, lvl, kill){ const h = half(o, t); const mates = (h.squad || []).filter(k => k !== 'sgt');
    h.lvl = lvl; h.xp = LEVELS[lvl - 1] || h.xp; h.gear ??= {}; h.picks ??= {}; h.kit ??= []; h.tricks ??= {}; h.loy ??= {}; h.dead ??= {};
    ['sgt', ...mates].forEach(k => { const it = trinkets[ti++ % trinkets.length]; h.gear[k] ??= {}; h.gear[k].trinket = it; if (!h.kit.includes(it)) h.kit.push(it); });
    const spare = trinkets[ti++ % trinkets.length]; if (!h.kit.includes(spare)) h.kit.push(spare); // one piece unworn
    mates.forEach(k => { h.picks[k] ??= []; const p3 = (PICKS[3][k] || [])[0]; if (p3 && !h.picks[k].includes(p3[0])) h.picks[k].push(p3[0]); });
    h.picks.sgt ??= []; const v = PICKS.vet[0][0]; if (!h.picks.sgt.includes(v)) h.picks.sgt.push(v);
    if (mates[0]) { const key = trickKeys[tk++ % trickKeys.length]; h.tricks[key] = {who: mates[0], ch: 7, left: 0}; h.loy[mates[0]] = 2; }
    if (mates[1]) h.loy[mates[1]] = -1;
    if (kill && mates.includes(kill)) { h.dead[kill] = {ch: 5, where: 'the chain test'}; h.squad = h.squad.filter(k => k !== kill); }
    return h; }
  function store(o, road, f){ o.chapters ??= {}; for (let c = 1; c <= 7; c++) o.chapters[c] ??= 'x'; o.chapters[7] = road; Object.assign((o.f ??= {}), f || {}); S = o; save(); const id = o.sid; S = null; return id; }
  /* compare the source half (as finished) with the new state's half */
  function check(link, src, dst, opts = {}){ const res = {link, bad: [], note: []};
    const dead = Object.keys(src.dead || {}), mates = (src.squad || []).filter(k => k !== 'sgt' && !dead.includes(k));
    const there = new Set([...(dst.squad || []), ...(dst.camp || [])]);
    mates.forEach(k => { if (!there.has(k)) res.bad.push(`${k} did not come across`); });
    dead.forEach(k => { if (there.has(k)) res.bad.push(`${k} is dead but came across`); if (!(dst.dead || {})[k]) res.note.push(`${k}'s death is not on the new save's dead list`); });
    if ((dst.lvl || 0) < Math.min(src.lvl, opts.cap || 99) && !opts.lvlReset) res.bad.push(`level ${src.lvl} became ${dst.lvl}`);
    if (dst.lvl !== src.lvl) res.note.push(`level ${src.lvl} → ${dst.lvl}`);
    ['sgt', ...mates].forEach(k => { const a = (src.gear || {})[k] || {}, b = (dst.gear || {})[k] || {}; Object.entries(a).forEach(([slot, it]) => { if (!ITEMS[it]) return; if (b[slot] !== it && !Object.values(b).includes(it) && !Object.values(((dst.parked || {})[k]) || {}).includes(it)) res.bad.push(`${k}'s ${slot} ${it} not worn after`); }); });
    if (!opts.allies) (src.kit || []).filter(it => ITEMS[it]).forEach(it => { const worn = Object.entries(src.gear || {}).find(([k, g]) => Object.values(g || {}).includes(it)); if (worn && !['sgt', ...mates].includes(worn[0])) return; if (!(dst.kit || []).includes(it)) res.bad.push(`kit ${it} left behind`); });
    ['sgt', ...mates].forEach(k => ((src.picks || {})[k] || []).forEach(p => { if (!(((dst.picks || {})[k]) || []).includes(p)) res.bad.push(`${k}'s pick ${p} lost`); }));
    if (!opts.allies) Object.entries(src.tricks || {}).forEach(([key, t]) => { if (!t || !['sgt', ...mates].includes(t.who)) return; const d = (dst.tricks || {})[key]; if (!d) res.bad.push(`trick ${key} (${t.who}) lost`); else if (d.who !== t.who) res.bad.push(`trick ${key} moved from ${t.who} to ${d.who}`); });
    mates.forEach(k => { const a = clamp(((src.loy || {})[k]) || 0, -2, 3), b = ((dst.loy || {})[k]) || 0; if (a !== b) res.note.push(`${k} loyalty ${a} → ${b}`); });
    res.mates = mates.join(','); return res; }
  const snap = h => JSON.parse(JSON.stringify(h));
  // One → Three (outlaw), and a second One → Three for the daru road into Eight
  setBook('gotm'); let a = newState('ChainA'); a.squad = a.squad || ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; let hA = snap(finish(a, null, 8)); const idA = store(a, 'outlaw');
  let moi = newStateMOI('ChainA3', idA); out.push(check('One → Three', hA, moi, {cap: 15}));
  setBook('gotm'); let a2 = newState('ChainB'); finish(a2, null, 8, 'tuft'); const hA2 = snap(a2); const idA2 = store(a2, 'outlaw');
  let moi2 = newStateMOI('ChainB3', idA2); out.push(check('One → Three, Tuft dead', hA2, moi2, {cap: 15}));
  // Two → Four (Marrow dead on the way)
  let dg = newStateDG('ChainC'); finish(dg, null, 8, 'marrow'); const hDG = snap(dg); const idDG = store(dg, B4_ROADS[0], {b2_c7_key: B4_ROADS[0]});
  let hoc = newStateHOC('ChainC4', idDG); out.push(check('Two → Four, Marrow dead', hDG, hoc, {cap: 15}));
  // Four → Six (the Third, line road) and Three → Six (the Fourth, host road)
  finish(hoc, null, 12); const hHOC = snap(hoc); const idHOC = store(hoc, 'line', {b4_c7_key: 'line'});
  finish(moi, null, 12); const hMOI = snap(moi); const idMOI = store(moi, 'host', {b3_c7_key: 'host'});
  let bh = newStateBH('ChainR', 'ChainH', idHOC, idMOI); out.push(check('Four → Six (the Third)', hHOC, half(bh, 'r'), {cap: 18})); out.push(check('Three → Six (the Fourth)', hMOI, half(bh, 'h'), {cap: 18}));
  // Six → Seven (the Third, adjunct) and Five → Seven (Letherii, emperor)
  let bh2 = JSON.parse(JSON.stringify(bh)); finish(bh, 'r', 15); finish(bh, 'h', 15); const hBHr = snap(half(bh, 'r')), hBHh = snap(half(bh, 'h')); const idBH = store(bh, 'adjunct', {b6_c7_key: 'adjunct'});
  let mt = newStateMT('ChainL'); finish(mt, null, 9); const hMT = snap(mt); const idMT = store(mt, 'emperor', {b5_c7_key: 'emperor'});
  let rg = newStateRG('ChainT', 'ChainL7', idBH, idMT); out.push(check('Six → Seven (the Third)', hBHr, half(rg, 't'), {cap: 18})); out.push(check('Five → Seven (the Letherii)', hMT, half(rg, 'l'), {cap: 18}));
  // Three → Eight (daru) and Six → Eight (the Fourth, home)
  finish(moi2, null, 13); const hMOI2 = snap(moi2); const idMOI2 = store(moi2, 'daru', {b3_c7_key: 'daru'});
  let tth = newStateTTH('ChainE', idMOI2); out.push(check('Three → Eight (daru)', hMOI2, tth, {cap: 18}));
  bh2.sid = newSid(); bh2.name = 'ChainR2'; finish(bh2, 'r', 14); finish(bh2, 'h', 14); const hBH2h = snap(half(bh2, 'h')); const idBH2 = store(bh2, 'adjunct', {b6_c7_key: 'adjunct', b6_fourthRoad: 'home'});
  let tth2 = newStateTTH('ChainE2', idBH2); out.push(check('Six → Eight (the Fourth, home)', hBH2h, tth2, {cap: 18}));
  // Seven → Nine (both)
  finish(rg, 't', 16); finish(rg, 'l', 16); const hRGt = snap(half(rg, 't')), hRGl = snap(half(rg, 'l')); const idRG = store(rg, 'adjunct', {b7_c7_key: 'adjunct', b7_lethRoad: 'army'});
  let dod = newStateDOD('ChainT9', 'ChainL9', idRG, idRG); out.push(check('Seven → Nine (the Third)', hRGt, half(dod, 't'), {cap: 18})); out.push(check('Seven → Nine (the Letherii)', hRGl, half(dod, 'l'), {cap: 18}));
  // Nine → Ten (both) and Eight → Ten (the Fourth, east)
  finish(dod, 't', 17); finish(dod, 'l', 17); const hDODt = snap(half(dod, 't')), hDODl = snap(half(dod, 'l')); const idDOD = store(dod, 'adjunct', {b9_c7_key: 'adjunct', b9_lethRoad: 'escort'});
  finish(tth, null, 17); const hTTH = snap(tth); const idTTH = store(tth, 'east', {b8_c7_key: 'east'});
  let tcg = newStateTCG('ChainT10', 'ChainL10', idDOD, idDOD, idTTH);
  out.push(check('Nine → Ten (the Third)', hDODt, half(tcg, 't'), {cap: 18})); out.push(check('Nine → Ten (the Letherii)', hDODl, half(tcg, 'l'), {cap: 18}));
  const tf = tcg.b10f && tcg.b10f.imported ? tcg.b10f : null; out.push(tf ? check('Eight → Ten (the Fourth, allies only)', hTTH, tf, {cap: 18, allies: true}) : {link: 'Eight → Ten (the Fourth)', bad: ['the Fourth did not come across into Book Ten (b10f.imported empty)'], note: []});
  return out; });
let fails = 0;
for (const x of r) { const okk = !x.bad.length; if (!okk) fails++; console.log(`${okk ? '  ok  ' : '  FAIL'} ${x.link}${x.mates ? ` [${x.mates}]` : ''}${x.bad.length ? ': ' + x.bad.join('; ') : ''}`); if (x.note.length) console.log('        notes: ' + x.note.join('; ')); }
if (errors.length) { console.log('page errors:', errors.slice(0, 3)); fails++; }
console.log(fails ? `${fails} failing` : 'all passed'); await br.close(); process.exit(fails ? 1 : 0);
