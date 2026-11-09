// Book Eight, Chapter 6 (The Night of the Hounds, src/146_b8_ch6.js): the halts, the reading on a doorstep (and the card node the visions
// pass hooks onto), the fire (the Contract shown, a rest, a line each, Not now), the Fete full circle (Benlo and the last Fete, b8_c6_fete),
// the painted sign again, the trick behind a hard check (The Knife-Sign: free, one free trick a turn, a hand-cant mark), the items (each with
// its own art; the crossbow pierces), the night breaking (Hood didn't answer; the charm cold; Brisk's god "the dead"), both keys from the
// same moment ('wall': the breach and the gap; 'street': four rounds with a Hound that passes and the door), the Hound that can't be
// dropped, THE MORTAL FIGHT's rule (whoever is down at its end is dead, the sergeant gets a scar and lives, no death checks, the Guild
// counts its dead), the one way out by Contract tier ('quiet' 0-1, 'roofs' 2-4 with its DC 18 contract check, 'word' 5-7 only while Vasso
// walks, none 8-10) and the knives sized by the Contract, "Not now" on every onward step and a "yes, but" on every check, from a fresh start
// and from a --from=6 style save (Tuft dead; Vell and Vasso walking; Ch 1 'hunt', Ch 5 'fast').
// Usage: node tools/b8ch6_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const tx = c => typeof c.t === 'function' ? c.t() : c.t;
  const run = c => { runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const take = (id, re) => { const c = vis(id).find(x => re.test(tx(x))); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(tx).join(' | ')}]`); return run(c); };
  const has = (id, re) => vis(id).some(x => re.test(tx(x)));
  const settle = (id, re, who, tier) => { const c = vis(id).find(x => re.test(tx(x))); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(tx).join(' | ')}]`); runFx(c);
    const pass = tier !== 'fail'; settleRoll({who, stat:c.check[0], tier, ok:pass, pass, margin:pass ? (tier === 'near' ? -1 : 6) : -6, nat:pass ? 18 : 3}, c);
    if (tier !== 'near') { const g = pass ? c.go : c.fail; if (typeof g === 'string') talk(g); else if (typeof g === 'function') g(); } return c; };
  const made = (id, re, who) => settle(id, re, who, 'clean'), near = (id, re, who) => settle(id, re, who, 'near'), miss = (id, re, who) => settle(id, re, who, 'fail');
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tth'); S.chapter = 6; startExplore(area); };
  /* a forced win through the engine's own endBeat. A Hound on the field is taken off first (it can't be dropped); fell: squadmates down at
     the very end (the mortal test) */
  const force = async (id, opt = {}, fell = []) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').map(u => u.id); res.mortal = !!B.def.mortal; res.guild = !!B.def.guild;
    res.deathOn = deathOn(); res.surprise = B.surprise || (B.surpriseRound ? 'p' : null); res.obj = B.def.objective && B.def.objective.rounds; res.waves = (B.def.waves || []).map(w => w.round + ':' + w.foes.map(f => f[0]).join('+'));
    const clear = () => { B.units = B.units.filter(u => !u.b8hound); B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); };
    if (BATTLES[id].stage2) { clear(); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.title2 = B && B.def.title; }
    fell.forEach(k => { const u = B.units.find(x => x.side === 'p' && x.id === k); if (u) u.hp = 0; });
    clear(); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b8_c6_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Seba|Krute|Picker|Mallet|Bluepearl|Antsy|Blend\b|Murillio|Duiker|Kruppe|Kellanved|Dancer|Laseen|Burn's Sleep|\b11\d\d\b|Traveller|Cotillion|Shadowthrone|Karsa|Samar|Rake|Anomander|Dragnipur|Brood|Envy|Spite|Raven|Dassem|gaol|Temple of Shadow|K'rul's Bar|Phoenix Inn|Coll\b|Finnest|Vorcan|Rallick|Torvald|Challice|Gorlas|Cutter|beheaded|Hounds of Light|\bweeks\b|\bmonths\b|\b(two|three|four|five|six|seven|eight|nine|ten) years\b|\d+ years/i;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    (n.ch || []).forEach(c => { const t = tx(c); if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); if (c.edges) c.edges('sgt').filter(Boolean).forEach(e => { if (never.test(e[0])) errs.push(k + ': an edge names ' + e[0]); }); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every node under every phase, key, done-state, way out and Contract */
  const every = () => { const keep = JSON.stringify(S.f), con = b8Contract(), e = [];
    for (const ph of [1, 2, 3, 4]) for (const k of [null, 'wall', 'street']) for (const done of [0, 1]) for (const c of [0, 3, 6, 9, 10]) {
      S.f.b8_c6_ph = ph; S.f.b8_c6_key = k; S.f.b8_c6_wallDone = done && k === 'wall' ? 1 : 0; S.f.b8_c6_streetDone = done && k === 'street' ? 1 : 0; S.b8.con = c;
      e.push(...renderAll().map(x => `ph${ph} ${k} ${done} c${c}: ${x}`)); }
    S.f = JSON.parse(keep); S.b8.con = con; return [...new Set(e)].slice(0, 12); };
  /* every check carries its own "yes, but"; every onward step has a "Not now" (or "Not yet") beside it; under every phase, key and Contract */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), onwards = new Set(), keep = JSON.stringify(S.f), con = b8Contract(), vl = S.loy.vasso;
    for (const ph of [1, 2, 3, 4]) for (const k of ['wall', 'street', null]) for (const done of [0, 1]) for (const c of [0, 3, 6]) {
      S.f.b8_c6_ph = ph; S.f.b8_c6_key = k; S.f.b8_c6_wallDone = done && k === 'wall' ? 1 : 0; S.f.b8_c6_streetDone = done && k === 'street' ? 1 : 0; S.f.b8_c6_streetIn = done; S.b8.con = c; if (b8In('vasso')) S.loy.vasso = 1;
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c2 => { if (c2.check) { checks.add(id + ':' + tx(c2)); if (!(c2.near && c2.near.t && typeof c2.near.fx === 'function')) noNear.add(id + ':' + tx(c2)); } });
        if (ch.some(c2 => c2.onward)) { onwards.add(id); if (!ch.some(c2 => /^Not (now|yet)/.test(tx(c2)))) noStay.add(id); } }); }
    S.f = JSON.parse(keep); S.b8.con = con; if (vl != null) S.loy.vasso = vl;
    return {checks:checks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  const lines = () => DLG.b8_c6_fire_talk().txt.split('\n\n').length, here = () => S.squad.filter(id => id !== 'sgt' && b8In(id)).length;
  try {
  /* ================= a fresh start, brought to Chapter Six (earlier keys unset: the defaults; the Contract at 3) ================= */
  setBook('tth'); S = newStateTTH('Fresh'); S.lvl = 18; S.xp = LEVELS[17]; S.chapters = {}; S.picksDue = []; save(); startChapter(6); S.picksDue = [];
  out.f = {area:S.area, ch:S.chapter, con:b8Contract(), title:CHAPTERS[6].title, nodes:nodes.length, areas:CHAPTERS[6].areas.length, fights:Object.keys(CHAPTERS[6].battles).length,
    items:Object.keys(CHAPTERS[6].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && ART['item/' + k] !== ART['item/b7_c3_letherxbow'] && ART['item/' + k] !== ART['item/b7_c4_musterbadge']),
    itemN:Object.keys(CHAPTERS[6].gear).length, bow:ITEMS.b8_c6_guildbow.slot === 'weapon' && ITEMS.b8_c6_guildbow.role === 'ranged' && ITEMS.b8_c6_guildbow.atk > 0 && SOAK_PIERCE_ITEMS.has('b8_c6_guildbow'),
    stone:ITEMS.b8_c6_wallstone.slot === 'trinket' && ITEMS.b8_c6_wallstone.hp > 0, noNumbers:Object.values(CHAPTERS[6].gear).every(it => !/\d/.test(it.line)),
    scenes:['b8_wall_night', 'b8_c6_fete', 'b8_c6_burning'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), ownWall:SCENEX.b8_wall_night.toString().includes('b86'), ownFete:SCENEX.b8_c6_fete.toString().includes('b86'),
    fireRoster:(ROSTER_FIRES.tth[6] || []).includes('b8_c6_fire'), every:every(), audit:audit(),
    charmCold:/Cold tonight/.test(typeof ITEM_SPECIAL.b8_hoodcharm === 'function' ? ITEM_SPECIAL.b8_hoodcharm() : ''), briskGod:PATRONS.brisk === PATRON_B8DEAD,
    onlyMortal:Object.entries(CHAPTERS[6].battles).filter(([k, b]) => b.mortal).map(([k]) => k).join(','), mortalOne:!BATTLES.b8_c6_knives.stage2};
  /* the start, and the reading on a doorstep */
  talk('b8_c6_start'); out.f.ph = S.f.b8_c6_ph; out.f.deck = has('b8_c6_start', /Sit with Tuft/); out.f.walk = has('b8_c6_start', /Out into the street/);
  talk('b8_c6_read'); const rd = DLG.b8_c6_read(); const lay = rd.ch.find(c => /draw/.test(tx(c))); runFx(lay);
  out.r = {drawn:S.f.b8_c6_drawn, reader:S.f.b8_c6_reader, card:S.card, inPool:B8POOL[6].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(tx(c))), back:B8READ[6].back, step:/doorstep/.test(B8READ[6].where), cardNode:cardNodeName(), cardBack:DLG.b8_c6_card().ch[0].go, says:['tuft', 'sohra', 'benna'].every(k => !!B8READ[6].say[k])};
  /* the fire before the night breaks */
  talk('b8_c6_fire'); const f1 = DLG.b8_c6_fire(); out.fire1 = {html:/The Contract/.test(f1.html || ''), talk:has('b8_c6_fire', /Talk with the squad/), notNow:/Not now/.test(tx(f1.ch[f1.ch.length - 1])), lines:lines(), here:here(), turnShut:!has('b8_c6_fire', /noise has changed/)};
  /* the Fete, full circle: Benlo and the last Fete; the masks (silver is the scene) */
  startExplore('b8_c6_lane'); talk('b8_c6_benlo'); take('b8_c6_benlo', /Busy Fete/); const bl = DLG.b8_c6_benlo_last().txt;
  out.fete = {flag:S.f.b8_c6_fete, last:/frost ran down the gutters/.test(bl), sgt:/You spent the last night of that Fete/.test(bl)};
  take('b8_c6_benlo_last', /Back to the barrow/); const sv = S.silver; take('b8_c6_benlo', /Buy a mask/); out.fete.masks = S.silver === sv - 2 && S.f.b8_c6_masked === 1;
  talk('b8_c6_revellers'); out.fete.dance = /three forward and one back/.test(DLG.b8_c6_revellers().txt);
  /* the lanes: the painted sign again, the old soldier, Orsa */
  talk('b8_c6_to_lanes'); take('b8_c6_to_lanes', /Into the lanes/); out.l = {area:S.area, seen:S.f.b8_c6_lanesSeen, notNow:has('b8_c6_to_lanes', /Not now/)};
  talk('b8_c6_sign'); out.l.sign = S.f.b8_c6_signSeen === 1 && /Rumjugs and Sweetlard/.test(DLG.b8_c6_sign().txt) && /paper mask on each of them/.test(DLG.b8_c6_sign().txt);
  take('b8_c6_sign', /old soldier/); out.l.vet = S.f.b8_c6_vetMet === 1 && /crack in the moon/.test(DLG.b8_c6_vet().txt);
  talk('b8_c6_orsa'); out.l.orsa = S.f.b8_c6_orsa === 1 && /Your name came up in my cellar/.test(DLG.b8_c6_orsa().txt);
  /* the masked bravos (optional): a "yes, but" on facing them down, then the fight */
  out.m = {notNow:has('b8_c6_masks_start', /Not now/)}; const sm = JSON.stringify(S); near('b8_c6_masks_start', /stand there/, 'brisk'); out.m.near = ((S.bruised || {}).brisk || 0) > 0; restore(sm, 'b8_c6_lanes');
  out.m.fight = await force('b8_c6_masks'); out.m.done = S.f.b8_c6_masksDone === 1 && S.f.b8_c6_masksFought === 1;
  /* the trick: The Knife-Sign (✦ wits 17), free; its "yes, but" costs one Contract point */
  talk('b8_c6_post'); const tc = vis('b8_c6_post').find(c => c.trick);
  out.t = {seen:S.f.b8_c6_signsSeen, dc:tc && tc.check[1], stat:tc && tc.check[0], trick:tc && tc.trick, notNow:has('b8_c6_post', /Not now/), lore:/man of the Claw/.test(DLG.b8_c6_post().txt), edgeVasso:(edgesFor(tc, 'vasso').find(e => /Guild/.test(e[0])) || [])[1]};
  const st = JSON.stringify(S), c0 = b8Contract(); near('b8_c6_post', /Watch the roofs/, 'tuft'); out.t.nearCon = b8Contract() - c0; restore(st, 'b8_c6_lanes');
  made('b8_c6_post', /Watch the roofs/, 'kettle');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b8_c6_knifesign && S.tricks.b8_c6_knifesign.who, ok:S.f.b8_c6_signOk, free:AB.t_b8_c6_knifesign.free === true && TRICKS.b8_c6_knifesign.free === undefined, words:/one free trick a turn/.test(TRICKS.b8_c6_knifesign.fx), again:!has('b8_c6_post', /Watch the roofs/)});
  startBattle('b8_c6_masks', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'kettle'), f = foes()[0]; out.t.offered = trickOk(u, AB.t_b8_c6_knifesign) && u.ab.includes('t_b8_c6_knifesign'); AB.t_b8_c6_knifesign.run(u, f.x, f.y); out.t.marked = f.cantRound === B.round && f.cantLeft >= 1; }
  B = null; view = 'scene'; S.scene = 'talk';
  /* the east wall, and the watch */
  startExplore('b8_c6_lanes'); take('b8_c6_to_wall', /Down to the wall/); out.w0 = {area:S.area, seen:S.f.b8_c6_wallSeen, node:S.node};
  take('b8_c6_watch', /Quiet up there/); out.w0.last = /frost came down off the hills/.test(DLG.b8_c6_watch_quiet().txt);
  /* the fire: a rest, then the night breaks */
  startExplore('b8_c6_lane'); talk('b8_c6_fire'); S.wounds = {brisk:4}; take('b8_c6_fire', /Let the squad rest/); out.n = {rested:!S.wounds, turn:has('b8_c6_fire', /noise has changed/)};
  gain('b8_hoodcharm'); take('b8_c6_fire', /noise has changed/); const tn = DLG.b8_c6_turn().txt;
  out.n = Object.assign(out.n, {ph:S.f.b8_c6_ph, turned:S.f.b8_c6_turned, hood:/Hood didn't answer/.test(tn), charm:/only a knucklebone tonight/.test(tn), moon:/in pieces/.test(tn), never:/Nobody in the Fourth can say why/.test(tn)});
  take('b8_c6_turn', /The squad/); const kn = DLG.b8_c6_key();
  out.k = {wall:has('b8_c6_key', /The wall/), street:has('b8_c6_key', /The street/), notYet:has('b8_c6_key', /Not yet/), html:/The Contract/.test(kn.html || '')};
  const snapK = JSON.stringify(S);
  /* ================= key: street ================= */
  take('b8_c6_key', /The street/); out.s = {key:S.f.b8_c6_key, notNow:has('b8_c6_street_go', /Not now/)}; take('b8_c6_street_go', /Get them in/);
  const sd = JSON.stringify(S); near('b8_c6_street_door', /Talk them in/, 'ohl'); out.s.near = !!(S.rattled || {}).ohl; restore(sd, 'b8_c6_lane');
  made('b8_c6_street_door', /Talk them in/, 'ohl'); out.s.in = S.f.b8_c6_streetIn === 1; out.s.startNot = has('b8_c6_street_start', /Not now/);
  out.s.def = {survive:BATTLES.b8_c6_street.objective.rounds, hound:BATTLES.b8_c6_street.waves.some(w => w.round === 2 && w.foes.some(f => f[0] === 'b8_hound')), stage2:!!BATTLES.b8_c6_street.stage2, mortal:!!BATTLES.b8_c6_street.mortal};
  /* the Hound that passes: nothing drops it; it goes on after its two rounds */
  startBattle('b8_c6_street', {surprise:'p'}); await wait(80); B.busy = true;
  { out.s.deathOn = deathOn(); const hd = mkFoe('b8_hound', 4, 0); B.units.push(hd); B.initOrder.push(hd); hurt(hd, 5000); hurt(hd, 5000, true); const s0 = hd.soakNext; hd.ward = 0;
    out.s.hound = {hp:hd.hp, max:hd.maxhp, b8:!!hd.b8hound, immortal:!!hd.immortal}; const r0 = B.round; hd.b8leave = r0 + 2; B.round = r0 + 1; newRound(); out.s.hound.gone = !B.units.includes(hd); }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b8_c6_lane');
  out.s.fight = await force('b8_c6_street', {surprise:'p'}); out.s.done = S.f.b8_c6_streetDone === 1 && S.f.b8_c6_ph === 3 && S.kit.includes('b8_c6_wallstone') && S.f.b8_c6_houndSeen === 1;
  out.s.untouched = /The Fourth never touched it/.test(DLG.b8_c6_street_after().txt);
  /* phase 3 at the Contract 3: 'roofs'. The knives sized by the Contract; the DC 18 contract check; its "yes, but" +1 */
  talk('b8_c6_fire'); out.p = {way:has('b8_c6_fire', /The roofs/), con:b8Contract(), out:b8WayOut()}; take('b8_c6_fire', /The roofs/);
  const rw = DLG.b8_c6_roofwatch(), rc = vis('b8_c6_roofwatch').find(c => c.check);
  out.p = Object.assign(out.p, {html:/The Contract/.test(rw.html || ''), warn:/Whoever falls in this fight stays down/.test(rw.txt), dc:rc && rc.check[1], contract:rc && rc.contract === true, mortalTag:vis('b8_c6_roofwatch').some(c => c.tag === 'mortal' && /whoever falls here stays down/.test(tx(c))), notNow:has('b8_c6_roofwatch', /Not now/), noWord:!has('b8_c6_roofwatch', /Vasso goes up/)});
  const snapR = JSON.stringify(S), cr = b8Contract(); near('b8_c6_roofwatch', /Over the roofs/, 'vasso'); out.p.nearCon = b8Contract() - cr; restore(snapR, 'b8_c6_lane');
  made('b8_c6_roofwatch', /Over the roofs/, 'kettle'); out.p.roofs = {way:S.f.b8_c6_wayOut, bow:S.kit.includes('b8_c6_guildbow'), down:!S.f.b8_c6_knivesDown, ph:S.f.b8_c6_ph};
  restore(snapR, 'b8_c6_lane'); miss('b8_c6_roofwatch', /Over the roofs/, 'kettle'); out.p.failNode = S.node; out.p.failMortal = vis('b8_c6_roofs_no').some(c => c.tag === 'mortal') && has('b8_c6_roofs_no', /Not now/);
  take('b8_c6_roofs_no', /Back down into the street/); out.p.startWarn = /Whoever falls here stays down/.test(DLG.b8_c6_knives_start().txt) && has('b8_c6_knives_start', /Not now/);
  /* THE MORTAL FIGHT: three knives at the Contract 3; surprise for the squad on 'wary' (scouted by default); no death checks. Kettle and the
     sergeant are down at its end: Kettle is dead, the sergeant scarred and alive; the Guild counts its dead (+1) */
  const ck = b8Contract(); take('b8_c6_knives_start', /Fourth\. Here/); await wait(60);
  out.x = {foes:B.units.filter(u => u.side === 'e').map(u => u.id), mortal:!!B.def.mortal, guild:!!B.def.guild, deathOn:deathOn(), surprise:B.surprise || (B.surpriseRound ? 'p' : null), noHound:!B.units.some(u => u.b8hound), log:B.log.some(l => /Whoever falls here stays down/.test(l))};
  B.units.filter(u => u.side === 'p' && (u.id === 'kettle' || u.id === 'sgt')).forEach(u => u.hp = 0); B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
  await until(() => S.scene === 'talk' && view !== 'battle'); await wait(40); clearModal(); if (S.node !== 'b8_c6_knives_after') talk('b8_c6_knives_after');
  out.x = Object.assign(out.x, {dead:S.dead.kettle || null, gone:!S.squad.includes('kettle'), sgt:S.squad.includes('sgt') && !(S.dead || {}).sgt, scar:S.f.sgtScar, fallen:(S.f.lastFallen || []).join(','), named:/Kettle did not get up/.test(DLG.b8_c6_knives_after().txt), scarText:/It will be a scar/.test(DLG.b8_c6_knives_after().txt),
    down:S.f.b8_c6_knivesDown, way:S.f.b8_c6_wayOut, bow:S.kit.includes('b8_c6_guildbow'), con:b8Contract() - ck, fell:CHAPTERS[6].extras().some(x => /Kettle did not get up/.test(x)), journal:CHAPTERS[6].journal().some(x => /Kettle fell/.test(x))});
  /* toward morning: the moon bursts; the end */
  take('b8_c6_knives_after', /Inside/); const bu = DLG.b8_c6_burst().txt; out.e = {ph:S.f.b8_c6_ph, burst:S.f.b8_c6_burst, white:/whole of Darujhistan is white/.test(bu), death:/Death didn't answer/.test(bu), east:/east/.test(bu)};
  take('b8_c6_burst', /Inside/); out.e.onward = has('b8_c6_fire', /Toward morning/); take('b8_c6_fire', /Toward morning/); out.e.notYet = has('b8_c6_onward', /Not yet/); out.e.bell = /a bell begins/.test(DLG.b8_c6_onward().txt);
  take('b8_c6_onward', /Morning/); await wait(60); out.e.end = {view, ch:S.chapters[6], endText:(CHEND[6] || {}).street && CHEND[6].street[0]};
  /* ================= key: wall, from the same moment ================= */
  restore(snapK, 'b8_c6_lane'); take('b8_c6_key', /The wall/); out.w = {key:S.f.b8_c6_key, notNow:has('b8_c6_wall_go', /Not now/)}; take('b8_c6_wall_go', /Down to the wall/);
  out.w.node = S.node; out.w.area = S.area; const wn = AREAS.b8_c6_wallfoot.npcs.find(n => n.id === 'watch'); out.w.npc = wn.node() === 'b8_c6_breach';
  const sw = JSON.stringify(S); near('b8_c6_breach', /Get the cart across/, 'brisk'); out.w.near = ((S.bruised || {}).brisk || 0) > 0; restore(sw, 'b8_c6_wallfoot');
  made('b8_c6_breach', /Get the cart across/, 'brisk'); out.w.set = S.f.b8_c6_cartSet === 1; out.w.startNot = has('b8_c6_wall_start', /Not now/);
  out.w.fight = await force('b8_c6_wall', {surprise:'p'}); out.w.done = S.f.b8_c6_wallDone === 1 && S.f.b8_c6_ph === 3 && S.kit.includes('b8_c6_wallstone');
  out.w.raiders = BATTLES.b8_c6_wall.foes.some(f => f[0] === 'b8_raider') && BATTLES.b8_c6_wall.foes.some(f => f[0] === 'b8_bravo');
  /* the way out by tier, from the roofs at phase 3 */
  const snapW = JSON.stringify(S), knives = () => battleDef('b8_c6_knives').foes.map(f => f[0]);
  S.b8.con = 0; out.q = {out:b8WayOut(), knives:knives().length}; take('b8_c6_roofwatch', /Watch the roofs/); out.q.way = S.f.b8_c6_wayOut; out.q.bow = S.kit.includes('b8_c6_guildbow'); out.q.noFight = !has('b8_c6_quiet', /mortal/);
  restore(snapW, 'b8_c6_lane'); S.b8.con = 4; out.q.k4 = knives().join(','); out.q.edge4 = (edgesFor(vis('b8_c6_roofwatch').find(c => c.check), 'kettle').find(e => /Guild's paper/.test(e[0])) || [])[1];
  S.b8.con = 6; out.q.k6 = knives().join(','); out.q.out6 = b8WayOut(); out.q.only6 = vis('b8_c6_roofwatch').filter(c => !/Not now/.test(tx(c))).map(c => c.tag || 'x').join(',');
  S.b8.con = 9; out.q.k9 = knives().join(','); out.q.out9 = b8WayOut(); S.b8.con = 10; out.q.k10 = knives().join(',');
  /* Vasso walking, at 6: his word (loyalty 1 or more); the roller is Vasso; a "yes, but" rattles him; on a success the knives go elsewhere */
  restore(snapW, 'b8_c6_lane'); S.b8.con = 6; b8Join('vasso'); clearModal(); S.loy.vasso = 0; out.v = {out:b8WayOut(), noWordAt0:!has('b8_c6_roofwatch', /Vasso goes up/), refuses:/They wouldn't take my word/.test(DLG.b8_c6_roofwatch().txt)};
  S.loy.vasso = 1; const wc = vis('b8_c6_roofwatch').find(c => /Vasso goes up/.test(tx(c))); out.v.word = !!wc && wc.check[2] === 'vasso' && wc.check[0] === 'guile';
  const sv2 = JSON.stringify(S); near('b8_c6_roofwatch', /Vasso goes up/, 'vasso'); out.v.near = !!(S.rattled || {}).vasso; restore(sv2, 'b8_c6_lane');
  made('b8_c6_roofwatch', /Vasso goes up/, 'vasso'); out.v.way = S.f.b8_c6_wayOut; out.v.bow = S.kit.includes('b8_c6_guildbow'); out.v.notDown = !S.f.b8_c6_knivesDown;
  restore(sv2, 'b8_c6_lane'); miss('b8_c6_roofwatch', /Vasso goes up/, 'vasso'); out.v.fail = S.node === 'b8_c6_word_no' && vis('b8_c6_word_no').some(c => c.tag === 'mortal');
  /* no Hound in this chapter's fights can be dropped: every b8_hound is the engine's immortal one */
  out.h = {all:Object.values(CHAPTERS[6].battles).flatMap(b => [...(b.foes || []), ...((b.waves || []).flatMap(w => w.foes)), ...((b.stage2 && b.stage2.foes) || [])]).filter(f => /hound/i.test(f[0])).every(f => f[0] === 'b8_hound'),
    rule:FOES.b8_hound.immortal === true && FOES.b8_hound.b8hound === true && FOES.b8_hound.hp >= 999, knivesNone:!BATTLES.b8_c6_knives.foes.some(f => /hound/.test(f[0]))};
  /* ================= a --from=6 style save: Tuft dead; Vell and Vasso walking; Ch 1 'hunt', Ch 5 'fast' (no road knives: no surprise) ================= */
  setBook('tth'); S = newStateTTH('Syn'); S.lvl = 18; S.xp = LEVELS[17]; S.squad = ['sgt', 'brisk', 'kettle', 'ohl', 'vell', 'vasso']; S.dead.tuft = {ch:7, where:'Coral', from:'moi'};
  S.imported = {from:'Syn', book:'moi', road:'daru', lvl:15, mates:['brisk', 'kettle', 'ohl', 'vell'], lifted:true};
  S.chapters = {1:'hunt', 2:'pass', 3:'stand', 4:'hold', 5:'fast'}; S.f.b8_c1_key = 'hunt'; S.f.b8_c5_key = 'fast'; S.f.b8_vassoDone = 1; S.f.b8_away3 = 1; S.f.b8_away4 = 1; S.b8.con = 5;
  ['vell', 'vasso'].forEach(k => { S.loy[k] ??= 1; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(6); S.picksDue = [];
  out.y = {every:every(), audit:audit(), reader:b8Rd().id, lines:lines(), here:here(), vell:/Vell/.test(DLG.b8_c6_fire_talk().txt), vasso:/Vasso/.test(DLG.b8_c6_fire_talk().txt), out:b8WayOut(), arrive:/before it shut/.test(CHAPTERS[6].intro.paras[1]()),
    fete:(talk('b8_c6_benlo_last'), /went to Coral after that/.test(DLG.b8_c6_benlo_last().txt))};
  S.f.b8_c6_ph = 3; S.f.b8_c6_key = 'street'; S.f.b8_c6_streetDone = 1; out.y.vellMark = /It is for Vell/.test(DLG.b8_c6_roofwatch().txt); out.y.noScout = !/road west taught/.test(DLG.b8_c6_knives_start().txt);
  startBattle('b8_c6_knives', {}); await wait(60); out.y.foes = B.units.filter(u => u.side === 'e').length; out.y.noSurprise = !B.surprise && !B.surpriseRound; B = null; view = 'scene'; S.scene = 'talk';
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, f1 = r.fire1 || {}, fe = r.fete || {}, l = r.l || {}, m = r.m || {}, t = r.t || {}, w0 = r.w0 || {}, n = r.n || {}, k = r.k || {}, s = r.s || {}, p = r.p || {}, x = r.x || {}, e = r.e || {}, w = r.w || {}, q = r.q || {}, v = r.v || {}, h = r.h || {}, y = r.y || {};
if (f.area) {
  f.area === 'b8_c6_lane' && f.ch === 6 && f.con === 3 && !f.every.length && f.title === 'The Night of the Hounds' && f.areas === 3 && f.fights === 4 && f.items && f.itemN === 2 && f.bow && f.stone && f.noNumbers && f.scenes && f.ownWall && f.ownFete && f.fireRoster && f.nodes >= 60 && f.nodes <= 80
    ? ok(`Chapter Six opens in the Fourth's street; every b8_c6 node renders in every phase, key and Contract with no leak, no never-name, no count of years, no "!" in narration (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); two new items with their own art (the crossbow pierces); the wall and two backdrops drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 6 && !au.noNear.length && au.onwards >= 10 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.charmCold && f.briskGod ? ok('Hood has fallen tonight: the charm is cold, and Brisk\'s god is "the dead"') : no('gods ' + JSON.stringify([f.charmCold, f.briskGod]));
  f.onlyMortal === 'b8_c6_knives' && f.mortalOne ? ok('the one mortal fight is b8_c6_knives, on one ground (a second would drag the fallen back up)') : no('mortal only ' + JSON.stringify([f.onlyMortal, f.mortalOne]));
  f.ph === 1 && f.deck && f.walk ? ok('the start: the Fourth\'s door, the reading offered at the first halt') : no('start ' + JSON.stringify(f).slice(0, 300));
}
rd.drawn === 1 && rd.reader === 'tuft' && rd.inPool && rd.notNow && rd.back === 'b8_c6_fire' && rd.step && rd.says && rd.cardNode === 'b8_c6_card' && rd.cardBack === 'b8_c6_fire' ? ok(`the reading on a doorstep: Tuft draws (${rd.card}); a line for all three readers; the card node is the visions pass's hook (b8_c6_card)`) : no('reading ' + JSON.stringify(rd));
f1.html && f1.talk && f1.notNow && f1.lines === f1.here && f1.turnShut ? ok(`the fire on the Fete's evening: the Contract shown, a line each (${f1.lines}), Not now; the night waits on the lanes and the wall`) : no('fire1 ' + JSON.stringify(f1));
fe.flag === 1 && fe.last && fe.sgt && fe.masks && fe.dance ? ok('the Fete, full circle: masks in the street, Benlo remembers the last Fete like it (the frost), a line for the sergeant; masks for two silver at his barrow') : no('fete ' + JSON.stringify(fe));
l.area === 'b8_c6_lanes' && l.seen && l.notNow && l.sign && l.vet && l.orsa ? ok('the lanes: Rumjugs and Sweetlard again, in paper masks; the old soldier from Ch 1; Orsa counts the roofs') : no('lanes ' + JSON.stringify(l));
m.notNow && m.near && m.fight && m.fight.started && m.fight.after === 'b8_c6_masks_after' && !m.fight.mortal && m.done ? ok(`the masked bravos (optional): a "yes, but" on facing them down, the fight (${m.fight.foes.length} foes, not mortal)`) : no('masks ' + JSON.stringify(m));
t.seen && t.dc === 17 && t.stat === 'wits' && t.trick === 'b8_c6_knifesign' && t.notNow && t.lore && t.edgeVasso === 3 && t.nearCon === 1 && t.who === 'kettle' && t.ok === 1 && t.free && t.words && t.again && t.offered && t.marked
  ? ok('the trick: The Knife-Sign, a ✦ wits 17 check that names the Claw\'s cant (Vasso +3); free, one free trick a turn; it marks a foe as the hand-cant does; its "yes, but" costs one Contract point (someone on a roof saw it)') : no('trick ' + JSON.stringify(t));
w0.area === 'b8_c6_wallfoot' && w0.seen === 1 && w0.node === 'b8_c6_watch' && w0.last ? ok('the east wall: an unnamed stretch, the watch sergeant, the last Fete from the wall') : no('wall0 ' + JSON.stringify(w0));
n.rested && n.turn && n.ph === 2 && n.turned === 1 && n.hood && n.charm && n.moon && n.never ? ok('the night breaks: the howling, the wall, the moon in pieces (never why); Hood didn\'t answer; the charm only a knucklebone') : no('turn ' + JSON.stringify(n));
k.wall && k.street && k.notYet && k.html ? ok('the key: the wall or the street, Not yet; the Contract shown') : no('key ' + JSON.stringify(k));
s.key === 'street' && s.notNow && s.near && s.in && s.startNot && s.def.survive === 4 && s.def.hound && s.def.stage2 && !s.def.mortal && s.deathOn && s.hound && s.hound.hp === s.hound.max && s.hound.b8 && s.hound.immortal && s.hound.gone && s.fight.started && s.fight.obj === 4 && s.fight.stage2 && s.fight.inStage2 && s.fight.after === 'b8_c6_street_after' && s.done && s.untouched
  ? ok('key street: the neighbours behind the door (a "yes, but"); four rounds with a Hound at the second, death checks on (not mortal); the Hound takes 10,000 and is untouched, and goes on down the street; the door; the stone from the wall') : no('street ' + JSON.stringify(s).slice(0, 1200));
p.way && p.con === 3 && p.out === 'roofs' && p.html && p.warn && p.dc === 18 && p.contract && p.mortalTag && p.notNow && p.noWord && p.nearCon === 1 && p.roofs.way === 'roofs' && p.roofs.bow && p.roofs.down && p.roofs.ph === 4 && p.failNode === 'b8_c6_roofs_no' && p.failMortal && p.startWarn
  ? ok('the roofs at the Contract 3: the way out is "roofs", a DC 18 contract check (its "yes, but" +1); made, the Fourth goes east and finds a crossbow, no fight; failed, the mortal fight, signposted twice, with Not now') : no('roofs ' + JSON.stringify(p));
x.foes.length === 3 && x.foes.every(k => k === 'b8_knife') && x.mortal && x.guild && x.deathOn === false && x.surprise === 'p' && x.noHound && x.log && x.dead && x.dead.ch === 6 && x.dead.where === 'The knives' && x.gone && x.sgt && x.scar === 1 && x.fallen === 'kettle' && x.named && x.scarText && x.down === 1 && x.way === 'fought' && x.bow && x.con === 1 && x.fell && x.journal
  ? ok('THE MORTAL FIGHT: three knives at the Contract 3, the squad first (wary), no death checks; Kettle and the sergeant down at its end: Kettle is dead (S.dead.kettle = {ch:6, where:"The knives"}) and named after, the sergeant scarred and alive; knivesDown; the Guild counts its dead (+1)') : no('mortal ' + JSON.stringify(x).slice(0, 1200));
e.ph === 4 && e.burst === 1 && e.white && e.death && e.east && e.onward && e.notYet && e.bell && e.end && e.end.view === 'end' && e.end.ch === 'street' && e.end.endText === 'The street held'
  ? ok('toward morning: the moon bursts, white, the pieces east; death didn\'t answer; a bell begins on the hill; the end on street') : no('end ' + JSON.stringify(e));
w.key === 'wall' && w.notNow && w.node === 'b8_c6_breach' && w.area === 'b8_c6_wallfoot' && w.npc && w.near && w.set && w.startNot && w.fight.started && w.fight.surprise === 'p' && w.fight.stage2 && w.fight.inStage2 && w.fight.title2 === 'The gap' && w.fight.after === 'b8_c6_wall_after' && !w.fight.mortal && w.done && w.raiders
  ? ok('key wall, from the same moment: the breach with the watch, the cart (a "yes, but"; set, the squad first), bravos and raiders, the gap; the stone from the wall') : no('wall ' + JSON.stringify(w).slice(0, 1000));
q.out === 'quiet' && q.knives === 1 && q.way === 'quiet' && q.bow && q.noFight && q.k4 === 'b8_knife,b8_knife,b8_knife,b8_knife' && q.edge4 === -1 && q.k6 === 'b8_knife,b8_knife,b8_knife,b8_veteran' && q.out6 === null && q.only6 === 'mortal' && q.out9 === null && q.k9 === 'b8_knife,b8_knife,b8_veteran,b8_veteran' && q.k10 === 'b8_knife,b8_knife,b8_veteran,b8_gmknife'
  ? ok('the way out by tier: 0 "quiet" (nobody comes, the abandoned crossbow); 4 four knives and the Guild\'s paper −1; 6 without Vasso, no way out (the fight only); 9 two veterans; 10 the Grand Master\'s knife') : no('tiers ' + JSON.stringify(q));
v.out === 'word' && v.noWordAt0 && v.refuses && v.word && v.near && v.way === 'word' && v.bow && v.notDown && v.fail ? ok('"word" at 6 with Vasso walking: not offered at loyalty 0; at 1 a guile check Vasso makes himself (never a guarantee; a "yes, but" rattles him); made, the knives go elsewhere; failed, the mortal fight') : no('word ' + JSON.stringify(v));
h.all && h.rule && h.knivesNone ? ok('no Hound in this chapter can be dropped: every Hound is the engine\'s b8_hound (immortal, 999); none in the knives fight') : no('hounds ' + JSON.stringify(h));
!(y.every || ['x']).length && !y.audit.noNear.length && !y.audit.noStay.length && y.reader === 'benna' && y.lines === y.here && y.vell && y.vasso && y.out === 'word' && y.arrive && y.fete && y.vellMark && y.noScout && y.foes === 4 && y.noSurprise
  ? ok(`a --from=6 style save (Tuft dead; Vell and Vasso walking; Ch 1 hunt, Ch 5 fast, the Contract 5): every node renders, Benna reads, a line each (${y.lines}); the wagons came in before the gate shut; a knife makes Vell's mark; four knives and no surprise`) : no('synthetic ' + JSON.stringify(y).slice(0, 1200));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b8ch6: FAIL (${bad.length})` : 'b8ch6: all ok'); process.exit(bad.length ? 1 : 0);
