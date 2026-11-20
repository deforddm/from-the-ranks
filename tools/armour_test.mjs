/* v13.57.0: armour for the regulars in Books Three, Four, Five and Eight (src/988_armour.js; series-polish-plan.md §0j). */
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const R = await page.evaluate(() => { const out = {rows:[]};
  const NEW = {moi:() => newStateMOI('Hask'), hoc:() => newStateHOC('Hask'), mt:() => newStateMT('Hask'), tth:() => newStateTTH('Hask')};
  const REG = {moi:['brisk','kettle','tuft','ohl'], hoc:['haddat','tangle','marrow'], mt:['tobet','thegg','perrit','ammet'], tth:['brisk','kettle','tuft','ohl']};
  for (const a of ARMOUR_NEW) { const o = {id:a.id}; out.rows.push(o);
    try { setBook(a.book); S = NEW[a.book](); S.chapter = a.ch; S.picksDue = []; S.f.b3_c1_tunnelsDone = 1; const it = ITEMS[a.id];
      o.item = !!it && it.slot === 'armour' && it.ac >= 1; o.art = !!ART['item/' + a.id] && ART['item/' + a.id].length > 800; o.role = ITEM_ROLE[a.id] === it.role;
      o.line = !!it.line && !/\d|!/.test(it.line); o.gear = !!(a.CH().gear || {})[a.id]; o.wear = REG[a.book].some(id => TPL[id] && canWear(id, a.id));
      if (a.nodes.length) { const nd = a.nodes[0], n = DLG[nd](); o.para = typeof n.txt === 'string' && n.txt.endsWith(a.para()); const k0 = S.kit.length; n.fx(); n.fx(); o.once = S.kit.filter(k => k === a.id).length === 1 && !!S.f[a.id];
        const n2 = DLG[nd](); o.stays = n2.txt.endsWith(a.para());
        if (a.nodes[1]) { const n3 = DLG[a.nodes[1]](); o.other = !n3.txt.endsWith(a.para()); n3.fx(); o.once = o.once && S.kit.filter(k => k === a.id).length === 1; } else o.other = true;
        const s2 = NEW[a.book](); s2.chapter = a.ch + 1; migrate(s2); o.topup = s2.kit.includes(a.id); const s3 = NEW[a.book](); s3.chapter = a.ch; migrate(s3); o.notEarly = !s3.kit.includes(a.id); }
      else { const n = DLG.b5_c1_qm(), c = n.ch.find(c => c.ware === a.id); const d0 = b5Debt('sgt'); o.para = !!c && c.req(); c.fx(); o.once = S.kit.includes(a.id) && b5Debt('sgt') === d0 + 6; o.stays = !DLG.b5_c1_qm().ch.find(c => c.ware === a.id).req(); o.other = o.topup = o.notEarly = true; const s2 = NEW.mt(); s2.chapter = 5; migrate(s2); o.topup = !s2.kit.includes(a.id); }
    } catch (e) { o.err = String(e && e.stack || e).slice(0, 300); } }
  /* Pell keeps his coat until the saps are cleared */
  try { setBook('moi'); S = newStateMOI('Hask'); S.chapter = 1; S.picksDue = []; const n = DLG.b3_c1_pell(); n.fx(); out.pellWaits = !S.kit.includes('b3_c1_hostscale') && !/Re-issued/.test(n.txt); } catch (e) { out.pellErr = String(e); }
  return out; });
ok(R.rows.length === 12, 'twelve pieces');
for (const o of R.rows) { ok(!o.err, `${o.id}: no error ${o.err || ''}`); for (const k of ['item','art','role','line','gear','wear','para','once','stays','other','topup','notEarly']) ok(o[k], `${o.id}: ${k}`); }
ok(R.pellWaits, 'Pell keeps the coat until the saps are cleared ' + (R.pellErr || ''));
ok(!errors.length, 'no page errors ' + errors.slice(0, 2).join(' / '));
await br.close(); console.log(fails ? `FAIL (${fails})` : 'PASS'); process.exit(fails ? 1 : 0);
