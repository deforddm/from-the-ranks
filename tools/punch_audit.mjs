// Polish plan §1 (Nov 14, 2026): the punch-list audits over all ten books. Produces lists, changes nothing.
//   A. choices that mislead: two visible choices going to the same node with nothing set by either (so the choice changes nothing); a "Not now" / "Back" / "Later" that starts a fight,
//      ends or starts a chapter; a choice whose words promise a fight ("Fight", "Charge", "Attack") that goes nowhere near one.
//   B. repetition across books: the same sentence (7+ words) in two or more books' dialogue.
//   C. backdrop match: a node's backdrop against its words (night words on a day scene and the reverse; indoor words on an
//      open scene and the reverse).
// Usage: node tools/punch_audit.mjs [--json=out.json]   (build first)
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const arg = k => (process.argv.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1];
const srv = await server(); const br = await launch();
const { page } = await openGame(br, srv.url, { fast: true });
const r = await page.evaluate(() => {
  const BOOKOF = id => { const m = /^b(\d+)_/.exec(id); return m ? +m[1] : 1; };
  const NEW = {1: () => { setBook('gotm'); S = newState('Hask'); }, 2: () => { S = newStateDG('Hask'); }, 3: () => { setBook('moi'); S = newStateMOI('Hask'); },
    4: () => { setBook('hoc'); S = newStateHOC('Hask'); }, 5: () => { S = newStateMT('Hask'); }, 6: () => { S = newStateBH('Hask'); }, 7: () => { S = newStateRG('Hask'); },
    8: () => { S = newStateTTH('Hask'); }, 9: () => { S = newStateDOD('Hask'); }, 10: () => { S = newStateTCG('Hask'); }};
  const out = {same: [], notnow: [], promise: [], sent: {}, scene: [], thrown: 0, nodes: 0};
  const NIGHT = /\b(midnight|moonlight|moonlit|the stars|starlight|torchlight|by lamplight|in the dark|darkness|the night)\b/i, DAY = /\b(noon|midday|sunlight|the sun is|in the sun|sun-baked|the heat of the day|afternoon)\b/i;
  const INDOOR = /\b(inside the|the tent|the room|the cellar|indoors|the hall|under the roof|the barracks|the tavern|the inn)\b/i;
  const sceneTime = k => /night|dark|dusk|eve|moon|lamp/.test(k) ? 'night' : /day|noon|sun|morning|dawn/.test(k) ? 'day' : '';
  const sceneIn = k => /tent|room|inn|cellar|hall|tavern|barrack|house|den|cave|tunnel|vault|interior|keep|temple|inside/.test(k) ? 'in' : /field|plain|road|ridge|beach|desert|glass|march|camp|coast|lake|wall|street|roof|yard|hill/.test(k) ? 'out' : '';
  const books = {}; Object.keys(DLG).forEach(id => { (books[BOOKOF(id)] ??= []).push(id); });
  for (const [b, ids] of Object.entries(books)) {
    for (const id of ids) {
      try { NEW[b](); S.picksDue = []; } catch (e) { continue; }
      let n; try { n = DLG[id](); } catch (e) { out.thrown++; continue; } if (!n) continue; out.nodes++;
      const vis = (n.ch || []).filter(c => { try { return !c.req || c.req(); } catch (e) { return false; } });
      const go = c => typeof c.go === 'string' ? c.go : c.go ? String(c.go) : '';
      // A1: two visible choices to the same node (a string link, or the same talk('x') call)
      const tgt = c => { const g = go(c); const m = /^\(\)\s*=>\s*talk\('([a-z0-9_]+)'\)$/.exec(g); return typeof c.go === 'string' ? c.go : m ? m[1] : null; };
      const seen = {}; vis.forEach(c => { const t = tgt(c); if (!t || c.chk || c.fx || c.set || c.cost || c.item || c.key) return; /* a choice that sets something is a real choice even when the next page is shared */ if (seen[t] && seen[t] !== c.t) out.same.push(`${id}: "${seen[t]}" and "${c.t}" both go to ${t}`); seen[t] = c.t; });
      // A2: a stay-word that moves the story on
      vis.forEach(c => { if (/^(not now|back|later|not yet|leave it|wait)\b/i.test(c.t || '') && /startBattle|chapterEnd|startChapter|finale/.test(go(c))) out.notnow.push(`${id}: "${c.t}" -> ${go(c).slice(0, 90)}`); });
      // A3: a choice that promises a fight with no fight in its go (and no link onward, which may lead to one)
      vis.forEach(c => { if (/^(fight|charge|attack|go in|take them)\b/i.test(c.t || '') && !/startBattle|talk\(|battle/i.test(go(c)) && typeof c.go !== 'string') out.promise.push(`${id}: "${c.t}" -> ${go(c).slice(0, 90) || '(no go)'}`); });
      // B: sentences
      const txt = String(n.txt || '').replace(/<[^>]+>/g, ' ');
      txt.split(/(?<=[.?!])\s+|\n+/).map(x => x.trim()).filter(x => x.split(/\s+/).length >= 7).forEach(x => { const k = x.toLowerCase().replace(/[^a-z' ]/g, '').replace(/\s+/g, ' ').trim(); if (k.length < 30) return; (out.sent[k] ??= {s: x, where: []}); if (!out.sent[k].where.some(w => w[0] === +b)) out.sent[k].where.push([+b, id]); });
      // C: backdrop
      const sc = n.scene; if (sc && typeof sc === 'string') { const tm = sceneTime(sc), io = sceneIn(sc);
        const nt = NIGHT.test(txt), dy = DAY.test(txt);
        if (tm === 'day' && nt && !dy) out.scene.push(`${id} [${sc}]: night words on a day scene: …${(txt.match(NIGHT) || [''])[0]}…`);
        if (tm === 'night' && dy && !nt) out.scene.push(`${id} [${sc}]: day words on a night scene: …${(txt.match(DAY) || [''])[0]}…`);
        if (io === 'out' && INDOOR.test(txt.slice(0, 220))) out.scene.push(`${id} [${sc}]: indoor words in the opening, open-air scene: …${txt.match(INDOOR)[0]}…`); }
    }
  }
  out.rep = Object.values(out.sent).filter(v => v.where.length >= 2).map(v => `${v.where.map(w => 'B' + w[0] + ' ' + w[1]).join(' · ')}: "${v.s.slice(0, 140)}"`); delete out.sent;
  return out;
});
const J = arg('json'); if (J) fs.writeFileSync(J, JSON.stringify(r, null, 1));
console.log(`nodes ${r.nodes}, threw ${r.thrown}`);
for (const [k, h] of [['same', 'A1 two choices, one destination'], ['notnow', 'A2 a stay-word that moves on'], ['promise', 'A3 a fight promised, none started'], ['rep', 'B the same sentence in two or more books'], ['scene', 'C backdrop against the words']])
  { console.log(`\n## ${h}: ${r[k].length}`); r[k].slice(0, 400).forEach(x => console.log('- ' + x)); }
await br.close(); process.exit(0);
