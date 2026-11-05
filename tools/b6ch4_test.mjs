// Book Six, Chapter 4 (G'danisban, src/104_b6_ch4.js): the Fourth before G'danisban in the rain. The first halt and the reading (Tuft,
// else Sohra, else old Benna); the captain and his cot (a check); camp talk of Captain Kindly; the surgeons' tents and the cot (a cure);
// the bedding pits (the trick, the Surgeons' Vinegar: taught, and its battle half lays the smoke); the field hospital from outside; Ressa at
// the picket (b6Join, walking or waiting); the carts (fight, the rain-cloak); the water detail's fever "yes, but"; the fire (rest, talk,
// Ohl's hands on the fever, the roster, the way on); the night: the cult at the edge (stage2, feverRisk), the shapes in the camp (still or
// shaken), the streets outside the walls (feverRisk, the dyer's knives); the morning: the fever breaks for every fevered squadmate
// (b6_soliel), the bell, the key both ways (vote; out with the picket check), the High Fist, the tomb, the chapter's end. Then a
// --from=4 style save (Brannoc walks, so Ressa waits) where every node renders in every phase and both keys.
// Usage: node tools/b6ch4_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`);
    runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  const roll = (c, who, tier) => settleRoll({who, stat:c.check[0], tier, ok:tier !== 'fail', pass:tier !== 'fail', margin:tier === 'clean' ? 6 : tier === 'near' ? 0 : -6, nat:tier === 'fail' ? 3 : 15}, c);
  const made = (id, re, who, tier = 'clean') => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); roll(c, who, tier); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const missed = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); roll(c, who, 'fail'); talk(c.fail); return c; };
  const shut = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const settle = async () => { for (let i = 0; i < 60 && B && view === 'battle' && !document.getElementById('bOn'); i++) await wait(50); };
  const force = async (id, also) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.dark = !!B.def.dark; res.fever = B.def.feverRisk || null; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.waves = (B.def.waves || []).length; res.kinds = B.units.filter(u => u.side === 'e').map(u => u.kind).join(',');
    if (also) await also(res);
    const f0 = (typeof b6FeverList === 'function') ? b6FeverList().length : 0;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); checkEnd(); await settle(); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').map(u => u.id || u.kind).join(','); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); checkEnd(); for (let i = 0; i < 80 && view === 'battle'; i++) await wait(50);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); shut(); }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.caught = b6FeverList().length - f0; res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b6_c4_/.test(k));
  const BAN = /\bParan\b|Laseen|Bonehunters|Bridgeburners|Burn's Sleep|Kellanved|Dancer|Ammanas|\b11\d\d\b/;
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (n.ch.some(c => typeof c.t !== 'string')) errs.push(k + ': a choice without words'); else if (BAN.test(n.txt)) errs.push(k + ': a hard-limit word: ' + n.txt.match(BAN)[0]); else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* a fresh Chapter Four: Book Six save, Chapters 1-3 played, the Fourth at level 13 */
  const mk = (c2, withBrannoc, fever) => { setBook('bh'); S = newStateBH('Hask', 'Brann'); S.chapters = {1:'bury', 2:c2, 3:'line'}; S.f.b6_c1_key = 'bury'; S.f.b6_c2_key = c2; S.f.b6_c3_key = 'line';
    const h = S.th.h; h.lvl = 13; h.xp = LEVELS[12]; h.picksDue = [];
    if (withBrannoc) { S.f.b6_brannocDone = 1; h.squad.push('brannoc'); h.loy.brannoc = 0; h.gear.brannoc = {}; h.picks.brannoc = []; }
    if (fever) h.fever = {[fever]:2};
    S.picksDue = []; save(); startChapter(4); shut(); };
  const L = () => Object.fromEntries(['brisk', 'kettle', 'tuft', 'ohl', 'brannoc'].map(k => [k, S.loy[k] ?? null]));
  try {
  /* ================= a fresh Chapter Four after a 'pass' Chapter Two: no Brannoc, Kettle fevered from the village ================= */
  mk('pass', false, 'kettle');
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, title:CHAPTERS[4] && CHAPTERS[4].title, num:CHAPTERS[4] && CHAPTERS[4].number, renderErr:renderAll(), roster:ROSTER_FIRES.bh[4].includes('b6_c4_fire'), keys:B6KEYS[4].join(), sgt:S.name, squad:S.squad.join(','), kettleFev:b6Fevered('kettle'), nodes:nodes().length};
  talk('b6_c4_start'); const st = DLG.b6_c4_start(); out.f.start = {ph:S.f.b6_c4_ph, again:typeof st.again === 'function', deck:st.ch.some(c => c.deck), fev:/Kettle/.test(st.html || ''), passLine:/went round/.test(CHAPTERS[4].intro.paras[1]())};
  /* the reading at the first halt: Tuft reads */
  take('b6_c4_start', /the Deck/); const dk = DLG.b6_c4_deck(); out.f.deckNotNow = dk.ch.some(c => /Not now/.test(c.t)); runFx(dk.ch.find(c => /draw/.test(c.t)));
  out.f.deck = {drawn:S.f.b6_c4_drawn, reader:S.f.b6_c4_reader, card:S.card, inPool:B6POOL[4].includes(S.card), lean:B6POOL[4].filter(x => x === 'b3c_consort').length, say:/The cards like a roof/.test(dk.txt), table:!!READTABLE['bh:4'], scene:B6DECK[4].scene};
  talk('b6_c4_card'); const cd = DLG.b6_c4_card(); out.f.card = {sp:cd.sp, back:cd.ch[0].go}; talk('b6_c4_deck_done'); out.f.deckDone = has('b6_c4_deck_done', /Back to the lines/);
  /* the captain: orders and the cot */
  talk('b6_c4_captain'); out.f.captain = {orders:S.f.b6_c4_orders, kindly:/Captain Kindly/.test(DLG.b6_c4_captain().txt), notNow:has('b6_c4_captain', /Not now/), check:vis('b6_c4_captain').find(x => /cots/.test(x.t)).check.join(':')};
  made('b6_c4_captain', /cots/, 'ohl'); out.f.cot = S.f.b6_c4_cot;
  /* camp talk: Captain Kindly */
  talk('b6_c4_falari'); out.f.falari = {flag:S.f.b6_c4_kindly, flat:/knocks her flat/.test(DLG.b6_c4_falari().txt), noBrannoc:!/Brannoc/.test(DLG.b6_c4_falari().txt)}; take('b6_c4_falari', /look like/); out.f.look = /Nobody's had a good look/.test(DLG.b6_c4_falari_look().txt);
  talk('b6_c4_benna'); out.f.benna = {flag:S.f.b6_c4_benna, yghatan:/Y'Ghatan/.test(DLG.b6_c4_benna().txt), noDeck:!has('b6_c4_benna', /Deck/)};
  /* the surgeons' tents: the cot cures Kettle */
  talk('b6_c4_surgeons'); out.f.surg = {fevLine:/Kettle has the fever/.test(DLG.b6_c4_surgeons().txt), cotChoice:has('b6_c4_surgeons', /captain's cot/), html:/Fever: Kettle/.test(DLG.b6_c4_surgeons().html || '')};
  take('b6_c4_surgeons', /captain's cot/); out.f.cured = {kettle:!b6Fevered('kettle'), used:S.f.b6_c4_cotUsed, rest1:S.f.b6_c4_rest1};
  /* the trick: the Surgeons' Vinegar */
  talk('b6_c4_pits'); const pc = vis('b6_c4_pits').find(x => /Vinegar/.test(x.t)); out.f.trickCheck = pc.check.join(':') + ':' + pc.trick; out.f.trickEdges = ['ohl', 'kettle', 'ressa', 'brannoc'].map(id => (pc.edges(id).filter(Boolean)[0] || [0, 0])[1]).join(','); out.f.pitsNotNow = has('b6_c4_pits', /Not now/);
  made('b6_c4_pits', /Vinegar/, 'ohl'); out.f.trick = {who:S.tricks && S.tricks.b6_c4_vinegar && S.tricks.b6_c4_vinegar.who, ok:S.f.b6_c4_vinOk, notSorcery:!TRICKS.b6_c4_vinegar.sorcery && /Not sorcery/.test(TRICKS.b6_c4_vinegar.fx), mech:AB.t_b6_c4_vinegar.smoke && AB.t_b6_c4_vinegar.darkness && AB.t_b6_c4_vinegar.range === 5};
  /* the field hospital from outside */
  talk('b6_c4_hospital'); out.f.hosp = {flag:S.f.b6_c4_hospital, shut:/flap stays shut/.test(DLG.b6_c4_hospital().txt), ohl:/two arms then/.test(DLG.b6_c4_hospital().txt)}; made('b6_c4_hospital', /how the High Fist is/, 'ohl'); out.f.hospOk = S.node === 'b6_c4_hospital_ok';
  /* Ressa at the picket: she walks (five walk) */
  talk('b6_c4_picket'); out.f.picket = {met:S.f.b6_c4_ressaMet, blue:/blue to the wrist/.test(DLG.b6_c4_picket().txt), notNow:has('b6_c4_picket', /Not now/), npc:AREAS.b6_c4_lines.npcs.find(n => n.id === 'ressa').show()};
  take('b6_c4_picket', /walks with the Fourth/); out.f.ressa = {in:b6In('ressa'), done:S.f.b6_ressaDone, node:S.node, txt:/steps in beside the squad/.test(DLG.b6_c4_ressa_join().txt), npcGone:!AREAS.b6_c4_lines.npcs.find(n => n.id === 'ressa').show(), never:(b6Catch('ressa', 'test'), !b6Fevered('ressa'))};
  /* the carts: a fight, the rain-cloak */
  talk('b6_c4_carts'); out.f.cartsNotNow = has('b6_c4_carts', /Not now/); out.f.cartsCheck = vis('b6_c4_carts').find(x => /Along the earthwork/.test(x.t)).check.join(':');
  out.f.carts = await force('b6_c4_carts'); out.f.carts.done = S.f.b6_c4_cartsDone; out.f.cloak = S.kit.includes('b6_c4_raincloak') && ITEMS.b6_c4_raincloak.ac === 1 && ITEMS.b6_c4_raincloak.hp === 3;
  /* the fire */
  startExplore('b6_c4_lines'); talk('b6_c4_fire'); const fy = DLG.b6_c4_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b6_c4_fire', /rest/), talk:has('b6_c4_fire', /Talk with the squad/), water:has('b6_c4_fire', /water detail/), dusk:has('b6_c4_fire', /Dusk/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:fy.ch.some(c => c.roster), html:/fever/i.test(fy.html || ''), restOff:!has('b6_c4_fire', /rest/)};
  /* the water detail: the one fever "yes, but" (near), on Brisk */
  take('b6_c4_fire', /water detail/); made('b6_c4_water', /Fill the barrels/, 'brisk', 'near'); out.f.water = {brisk:b6Fevered('brisk'), node:S.node, salve:S.f.b6_c4_water};
  /* Ohl's hands at the fire */
  talk('b6_c4_fire'); out.f.ohlChoice = has('b6_c4_fire', /Ohl\. The fever/); const br0 = (S.bruised || {}).ohl || 0; take('b6_c4_fire', /Ohl\. The fever/); out.f.ohlCure = {brisk:!b6Fevered('brisk'), bruised:((S.bruised || {}).ohl || 0) > br0, again:!has('b6_c4_fire', /Ohl\. The fever/)};
  const ft = DLG.b6_c4_fire_talk().txt; out.f.talk = {lines:ft.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, ressa:/It was a city/.test(ft)};
  /* dusk: to the edge */
  take('b6_c4_fire', /Dusk/); out.f.dusk = {notNow:has('b6_c4_dusk', /Not now/)}; take('b6_c4_dusk', /To the edge/); out.f.edge = {area:S.area, ph:S.f.b6_c4_ph, node:S.node, dark:!!AREAS.b6_c4_edge.dark};
  talk('b6_c4_sentry'); out.f.sentry = S.f.b6_c4_sentry;
  talk('b6_c4_edge_back'); out.f.edgeLocked = !has('b6_c4_edge_back', /runner/) && has('b6_c4_edge_back', /Not now/);
  talk('b6_c4_fire'); out.f.fire2 = {on:has('b6_c4_fire', /^On\.$/), scene:DLG.b6_c4_fire().scene};
  talk('b6_c4_shrine'); out.f.shrine = {notNow:has('b6_c4_shrine', /Not now/), check:vis('b6_c4_shrine').find(x => /take the priest/.test(x.t)).check.join(':')};
  /* the cult: stage2, the fever spread; the Surgeons' Vinegar in battle */
  out.f.cult = await force('b6_c4_cult', async res => { const u = B.units.find(x => x.side === 'p' && x.id === 'ohl'), e = B.units.find(x => x.side === 'e');
    res.offered = typeof trickOk === 'function' && trickOk(u, AB.t_b6_c4_vinegar); const s0 = B.smoke.length; B.cur = u; AB.t_b6_c4_vinegar.run(u, e.x, e.y); await new Promise(r => setTimeout(r, 200)); res.smoke = B.smoke.length - s0; res.vin = B.smoke.some(s => s.b64vin && s.dark); });
  out.f.cult.done = S.f.b6_c4_cultDone; out.f.fevAfterCult = b6FeverList().length;
  /* the shapes in the camp */
  take('b6_c4_cult_after', /Listen/); out.f.hounds = {node:S.node, notNow:has('b6_c4_hounds', /Not now/), check:vis('b6_c4_hounds').find(x => /Still/.test(x.t)).check.join(':'), tuft:/From the Pale/.test(DLG.b6_c4_hounds().txt), noFight:!vis('b6_c4_hounds').some(c => /startBattle/.test(String(c.go)))};
  made('b6_c4_hounds', /Still/, 'tuft'); out.f.still = S.f.b6_c4_hounds;
  take('b6_c4_hounds_still', /On/); out.f.order = {node:S.node, notNow:has('b6_c4_outer_order', /Not now/)};
  take('b6_c4_outer_order', /streets/); out.f.outer = {area:S.area, node:S.node, ressa:/That was mine/.test(DLG.b6_c4_outer_arrive().txt)};
  talk('b6_c4_well'); out.f.well = /first well it was in/.test(DLG.b6_c4_well().txt); talk('b6_c4_gate'); out.f.gate = has('b6_c4_gate', /Not now/) && !has('b6_c4_gate', /^(?!Not now).*/);
  talk('b6_c4_outer_back'); out.f.outerLocked = !has('b6_c4_outer_back', /Back to the camp/);
  talk('b6_c4_post'); out.f.post = {notNow:has('b6_c4_post', /Not now/), check:vis('b6_c4_post').find(x => /dye-yards/.test(x.t)).check.join(':')};
  out.f.streets = await force('b6_c4_streets'); out.f.streets.done = S.f.b6_c4_streetsDone; out.f.knives = S.kit.includes('b6_c4_dyerknives') && ITEMS.b6_c4_dyerknives.dmg.join() === '1,6,3';
  out.f.fevBeforeMorning = b6FeverList().length;
  take('b6_c4_streets_after', /Back to the camp/); take('b6_c4_dawn_walk', /Into the lines/);
  out.f.morning = {area:S.area, ph:S.f.b6_c4_ph, soliel:S.f.b6_soliel, carried:S.f.b6_c4_carried, nobody:b6FeverList().length === 0, html:/Nobody in the squad has the fever/.test(feverHTML()), canCure:b6CanCure()};
  talk('b6_c4_carrier'); out.f.carrier = /They are not priests/.test(DLG.b6_c4_carrier().txt);
  talk('b6_c4_captain_morn'); out.f.capMorn = S.f.b6_c4_capMorn;
  talk('b6_c4_fire'); take('b6_c4_fire', /^On\.$/); out.f.bell = {node:S.node};
  talk('b6_c4_bell'); out.f.bell.flag = S.f.b6_c4_bell; out.f.bell.dujek = /Dujek Onearm/.test(DLG.b6_c4_bell().txt); out.f.bell.notNow = has('b6_c4_bell', /Not now/);
  take('b6_c4_bell', /On/); out.f.key = {node:S.node, vote:has('b6_c4_key', /stands with the Seventh/), out:has('b6_c4_key', /has the picket/), notYet:has('b6_c4_key', /Not yet/), kindly:/Kindly/.test(DLG.b6_c4_key().txt)};
  const snap = JSON.stringify(S);
  /* ================= key: vote ================= */
  { const l0 = L(); take('b6_c4_key', /stands with the Seventh/); const l1 = L();
    out.v = {key:S.f.b6_c4_key, loy:Object.fromEntries(Object.keys(l1).map(k => [k, (l1[k] ?? 0) - (l0[k] ?? 0)])), node:S.node, unanimous:/Not one company in the Host gives another/.test(DLG.b6_c4_vote().txt), notNow:has('b6_c4_vote', /Not now/)};
    take('b6_c4_vote', /On/); out.v.word = {flag:S.f.b6_c4_word, sleeve:/new sleeve/.test(DLG.b6_c4_word().txt), notNow:has('b6_c4_word', /Not now/)};
    take('b6_c4_word', /On/); out.v.tomb = {node:S.node, notYet:has('b6_c4_tomb', /Not yet/), outside:/does not go nearer/.test(DLG.b6_c4_tomb().txt)};
    take('b6_c4_tomb', /On, with the Host/); await wait(60); out.v.end = {view, ch:S.chapters[4], lvl:S.lvl}; out.v.extras = CHAPTERS[4].extras().length; out.v.journal = CHAPTERS[4].journal().length; out.v.endTxt = !!(CHEND[4] && CHEND[4].vote); }
  /* ================= key: out ================= */
  { S = JSON.parse(snap); save(); startExplore('b6_c4_lines'); G.said = {}; talk('b6_c4_key');
    const l0 = L(); take('b6_c4_key', /has the picket/); const l1 = L();
    out.o = {key:S.f.b6_c4_key, loy:Object.fromEntries(Object.keys(l1).map(k => [k, (l1[k] ?? 0) - (l0[k] ?? 0)])), node:S.node, check:vis('b6_c4_out').find(x => /Let them through/.test(x.t)).check.join(':'), notNow:has('b6_c4_out', /Not now/)};
    made('b6_c4_out', /Let them through/, 'ressa'); out.o.through = {flag:S.f.b6_c4_letThrough, word:S.f.b6_c4_word, node:S.node};
    take('b6_c4_out_ok', /On/); out.o.picketView = /from the picket/.test(DLG.b6_c4_word().txt); take('b6_c4_word', /On/); take('b6_c4_tomb', /On, with the Host/); await wait(60); out.o.end = {view, ch:S.chapters[4]}; }
  /* ================= the fire's "On" resumes the night after a Not now ================= */
  { S = JSON.parse(snap); S.f.b6_c4_ph = 2; S.f.b6_c4_cultDone = 1; S.f.b6_c4_hounds = null; S.f.b6_c4_streetsDone = null; save(); startExplore('b6_c4_edge'); talk('b6_c4_fire'); take('b6_c4_fire', /^On\.$/); out.r = {hounds:S.node};
    S.f.b6_c4_hounds = 'still'; talk('b6_c4_fire'); take('b6_c4_fire', /^On\.$/); out.r.order = S.node; }
  /* ================= a --from=4 style save: Brannoc walks, so Ressa waits; every node renders in every phase and both keys ================= */
  { mk('burn', true, null); out.y = {brannoc:b6In('brannoc'), squad:S.squad.length};
    talk('b6_c4_falari'); out.y.brannocLine = /Flat on her back/.test(DLG.b6_c4_falari().txt);
    S.f.b6_c4_ph = 1; talk('b6_c4_picket'); take('b6_c4_picket', /walks with the Fourth/); out.y.ressaWaits = {in:b6In('ressa'), done:S.f.b6_ressaDone, camp:(S.camp || []).includes('ressa'), txt:/until there's room/.test(DLG.b6_c4_ressa_join().txt)};
    out.y.burnLine = /burned on the road inland/.test(CHAPTERS[4].intro.paras[1]());
    const errs = []; [[1, null], [2, null], [3, null], [3, 'vote'], [3, 'out']].forEach(([ph, k]) => { S.f.b6_c4_ph = ph; S.f.b6_c4_key = k; S.f.b6_c4_bell = ph === 3 ? 1 : null; errs.push(...renderAll().map(e => `ph${ph}${k || ''} ${e}`)); });
    S.dead = {tuft:{ch:3, where:'x'}}; S.f.b6_c4_ph = 1; errs.push(...renderAll().map(e => `noTuft ${e}`)); out.y.reader = visReader().id;
    S.squad = ['sgt']; errs.push(...renderAll().map(e => `alone ${e}`)); out.y.renderErr = errs; }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, v = r.v || {}, o = r.o || {}, y = r.y || {}, rr = r.r || {};
const J = x => JSON.stringify(x).slice(0, 700);
if (f.area) {
  f.area === 'b6_c4_lines' && f.ch === 4 && f.thread === 'h' && f.sgt === 'Brann' && f.title === 'G\'danisban' && f.num === 'Four' && !f.renderErr.length && f.roster && f.keys === 'vote,out' && f.kettleFev && f.nodes >= 60 ? ok(`a fresh Chapter Four: the Fourth (Sergeant Brann) in the Seventh's lines; registered for Book Six; ${f.nodes} b6_c4 nodes, every one renders`) : no('fresh ' + J([f.area, f.ch, f.thread, f.sgt, f.title, f.num, f.renderErr, f.roster, f.keys, f.kettleFev, f.nodes]));
  f.start.ph === 1 && f.start.again && f.start.deck && f.start.fev && f.start.passLine && f.deckNotNow && f.deck.drawn === 1 && f.deck.reader === 'tuft' && f.deck.inPool && f.deck.lean === 3 && f.deck.say && f.deck.table && f.deck.scene === 'b6_gdanisban_rain' && f.card.sp === 'The Deck of Dragons' && f.card.back === 'b6_c4_deck_done' && f.deckDone ? ok(`the first halt (Ch2 'pass' read; Kettle's fever shown) and the reading: Tuft draws ${f.deck.card} (the Consort leans ×3; "Not now" offered)`) : no('start/deck ' + J([f.start, f.deck, f.card, f.deckDone, f.deckNotNow]));
  f.captain.orders && f.captain.kindly && f.captain.notNow && f.captain.check === 'guile:14' && f.cot === 1 && f.falari.flag === 1 && f.falari.flat && f.falari.noBrannoc && f.look && f.benna.flag && f.benna.yghatan && f.benna.noDeck ? ok('the captain (orders; "Captain Kindly"; the cot, Guile 14); the Falari\'s story of Sweetcreek; old Benna (Y\'Ghatan as camp talk; no Deck while Tuft walks)') : no('captain ' + J([f.captain, f.cot, f.falari, f.look, f.benna]));
  f.surg.fevLine && f.surg.cotChoice && f.surg.html && f.cured.kettle && f.cured.used && f.cured.rest1 ? ok('the surgeons\' tents: the captain\'s cot cures Kettle (b6Cure from a scene), at the cost of the rest') : no('surgeons ' + J([f.surg, f.cured]));
  f.trickCheck === 'wits:17:b6_c4_vinegar' && f.trickEdges === '2,1,1,-1' && f.pitsNotNow && f.trick.who === 'ohl' && f.trick.ok && f.trick.notSorcery && f.trick.mech ? ok('the trick: the Surgeons\' Vinegar, ✦ Wits 17 (Ohl +2, Kettle +1, Ressa +1, Brannoc −1), not sorcery, A Courtesy of Darkness\'s mechanics') : no('trick ' + J([f.trickCheck, f.trickEdges, f.trick]));
  f.hosp.flag && f.hosp.shut && f.hosp.ohl && f.hospOk ? ok('the field hospital from the mud outside: the flap shut; a guard\'s word') : no('hospital ' + J([f.hosp, f.hospOk]));
  f.picket.met && f.picket.blue && f.picket.notNow && f.picket.npc && f.ressa.in && f.ressa.done === 1 && f.ressa.txt && f.ressa.npcGone && f.ressa.never ? ok('Ressa walks in out of the city at the picket; b6Join: she walks with the Fourth (b6_ressaDone 1); she never catches it') : no('ressa ' + J([f.picket, f.ressa]));
  f.cartsNotNow && f.cartsCheck === 'wits:14' && f.carts.started && f.carts.waves === 1 && /b4_c7_fleerbow/.test(f.carts.kinds) && f.carts.after === 'b6_c4_carts_after' && f.carts.done && f.cloak ? ok('the surgeons\' carts: bandits off the plague road (a wave), won; the rain-cloak (+1 armour, +3 health)') : no('carts ' + J([f.cartsNotNow, f.cartsCheck, f.carts, f.cloak]));
  f.fire.again && f.fire.talk && f.fire.water && f.fire.dusk && f.fire.notNow && f.fire.roster && f.fire.html && f.fire.restOff && f.water.brisk && f.water.node === 'b6_c4_water_ok' && f.ohlChoice && f.ohlCure.brisk && f.ohlCure.bruised && f.ohlCure.again && f.talk.lines === f.talk.here && f.talk.ressa ? ok('the fire: again line, talk (a line each, Ressa\'s), the roster, the fever box, no rest after the cot; the water detail\'s "yes, but" gives Brisk the fever; Ohl breaks it, and the sick warren bites him') : no('fire ' + J([f.fire, f.water, f.ohlChoice, f.ohlCure, f.talk]));
  f.dusk.notNow && f.edge.area === 'b6_c4_edge' && f.edge.ph === 2 && f.edge.node === 'b6_c4_edge_arrive' && f.edge.dark && f.sentry && f.edgeLocked && f.fire2.on && f.fire2.scene === 'b6_c4_edge' && f.shrine.notNow && f.shrine.check === 'guile:14' ? ok('dusk: the edge at night; the sentry; the way back shut until the night is done; the picket fire offers On') : no('edge ' + J([f.dusk, f.edge, f.sentry, f.edgeLocked, f.fire2, f.shrine]));
  f.cult.started && f.cult.dark && f.cult.fever && f.cult.stage2 && f.cult.inStage2 && f.cult.after === 'b6_c4_cult_after' && f.cult.done && f.cult.caught >= 1 && /b3_c4_priest/.test(f.cult.kinds) ? ok(`the cult at the ditch (a priest; stage2 the rag shrine), won; the fever spread to ${f.cult.caught}`) : no('cult ' + J(f.cult));
  f.cult.offered && f.cult.smoke >= 4 && f.cult.vin ? ok(`the Surgeons' Vinegar in battle: offered once a fight, the smoke lies (${f.cult.smoke} tiles)`) : no('vinegar in battle ' + J(f.cult));
  f.hounds.node === 'b6_c4_hounds' && f.hounds.notNow && f.hounds.check === 'wits:15' && f.hounds.tuft && f.hounds.noFight && f.still === 'still' && f.order.node === 'b6_c4_outer_order' && f.order.notNow ? ok('the shapes in the camp: no fight; the squad stands still (Wits 15); Tuft knows the sound from the Pale') : no('hounds ' + J([f.hounds, f.still, f.order]));
  f.outer.area === 'b6_c4_outer' && f.outer.ressa && f.well && f.outerLocked && f.post.notNow && f.post.check === 'wits:15' && f.streets.started && f.streets.fever && f.streets.allies === 2 && f.streets.waves === 1 && f.streets.done && f.knives ? ok('the streets outside the walls (never in the gate): Ressa\'s dye-yard; the well; the forward picket held with two regulars (feverRisk); the dyer\'s knives') : no('streets ' + J([f.outer, f.well, f.outerLocked, f.post, f.streets, f.knives]));
  f.fevBeforeMorning >= 1 && f.morning.area === 'b6_c4_lines' && f.morning.ph === 3 && f.morning.soliel === 1 && f.morning.carried === f.fevBeforeMorning && f.morning.nobody && f.morning.html && f.morning.canCure && f.carrier && f.capMorn ? ok(`the morning: the fever breaks; b6_soliel = 1; every fevered squadmate cured by the carriers (${f.morning.carried})`) : no('morning ' + J([f.fevBeforeMorning, f.morning, f.carrier, f.capMorn]));
  f.bell.node === 'b6_c4_bell' && f.bell.flag && f.bell.dujek && f.bell.notNow && f.key.node === 'b6_c4_key' && f.key.vote && f.key.out && f.key.notYet && f.key.kindly ? ok('the bell (Dujek Onearm dead of the fever); the key both ways and Not yet') : no('bell/key ' + J([f.bell, f.key]));
}
v.key === 'vote' && JSON.stringify(v.loy) === JSON.stringify({brisk:1, kettle:0, tuft:0, ohl:1, brannoc:0}) && v.unanimous && v.notNow && v.word && v.word.flag && v.word.sleeve && v.word.notNow && v.tomb && v.tomb.notYet && v.tomb.outside && v.end && v.end.view === 'end' && v.end.ch === 'vote' && v.endTxt ? ok(`key vote: Brisk +1, Ohl +1; the companies, unanimous; the High Fist's armour; the tomb from outside; the end (level ${v.end && v.end.lvl}; ${v.extras} end lines, ${v.journal} journal)`) : no('vote ' + J(v));
o.key === 'out' && JSON.stringify(o.loy) === JSON.stringify({brisk:0, kettle:0, tuft:1, ohl:-1, brannoc:0}) && o.check === 'guile:14' && o.notNow && o.through && o.through.flag === 1 && o.through.word === 1 && o.picketView && o.end && o.end.ch === 'out' && o.end.view === 'end' ? ok('key out: Tuft +1, Ohl −1; the picket lets the city\'s sick through to the carriers (Guile 14); the roar from behind; the end') : no('out ' + J(o));
rr.hounds === 'b6_c4_hounds' && rr.order === 'b6_c4_outer_order' ? ok('after a Not now, the fire\'s On takes the night up where it stopped') : no('resume ' + J(rr));
y.brannoc && y.squad === 6 && y.brannocLine && y.ressaWaits && !y.ressaWaits.in && y.ressaWaits.done === 2 && y.ressaWaits.camp && y.ressaWaits.txt && y.burnLine && y.reader === 'benna' ? (y.renderErr && !y.renderErr.length ? ok(`a --from=4 style save (Brannoc walks; Ressa waits at the surgeons' tents): every node renders in every phase, both keys, without Tuft (reader ${y.reader}) and with the sergeant alone`) : no('synthetic render ' + J(y.renderErr))) : no('synthetic ' + J(y));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b6ch4: FAIL (${bad.length})` : 'b6ch4: all ok'); process.exit(bad.length ? 1 : 0);
