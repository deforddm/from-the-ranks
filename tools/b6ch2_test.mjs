// Book Six, Chapter 2 (The North Coast, src/102_b6_ch2.js): the Fourth's chapter. Its halts, both keys and what each does to the fever,
// the reading (Tuft), the fire (rest, talk, the fever and Ohl's cure, the way on), the trick (taught, and its battle half), Brannoc's join
// (walking, waiting with Sweetcreek's lines, sent away), every fight's start and a forced win (both grounds of the village), the fever
// caught in the village (feverRisk), at the well (the "yes, but") and at the last house ('pass'), cured at the fire, the D'rek charm, and
// the chapter's end; from a fresh Book Six save, and from a --from=2 style save where every node must still render.
// Usage: node tools/b6ch2_test.mjs   (build first; exit 1 on a failure)
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
  const roll = (id, re, who, tier) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c);
    settleRoll({who, stat:c.check[0], tier:tier || 'clean', ok:true, pass:true, margin:tier === 'near' ? 0 : 6, nat:tier === 'near' ? 11 : 18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const made = (id, re, who) => roll(id, re, who, 'clean');
  const closeModal = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const force = async (id, also) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.waves = (B.def.waves || []).length; res.fever = B.def.feverRisk || null;
    if (also) await also(res);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').map(u => u.kind).join(','); }
    const xp0 = S.xp, B0 = B; B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true); for (let i = 0; i < 100 && B === B0 && S.xp === xp0; i++) await wait(50); await wait(60); res.xp = S.xp - xp0; // endBeat, as play does: the fever hook lives there
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); closeModal(); talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b6_c2_/.test(k));
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (!n.ch.filter(c => !c.req || c.req()).length) errs.push(k + ': no visible choice'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const mk = (name) => { setBook('bh'); S = newStateBH('Hask', name); S.chapters = {1:'bury'}; S.f.b6_c1_key = 'bury'; S.f.b6_mehetDone = 1; S.picksDue = []; S.th.h.picksDue = []; save(); startChapter(2); closeModal(); };
  try {
  /* ================= a fresh Chapter Two: the Fourth ================= */
  mk('Fresh');
  out.f = {thread:S.thread, name:S.name, squad:S.squad.join(','), lvl:S.lvl, area:S.area, ch:S.chapter, title:CHAPTERS[2].title, num:CHAPTERS[2].number, renderErr:renderAll(), roster:ROSTER_FIRES.bh[2].includes('b6_c2_fire'), reg:!!(BOOKSNAP.bh && BOOKSNAP.bh.ch[2])};
  talk('b6_c2_start'); out.f.ph = S.f.b6_c2_ph; out.f.deckChoice = vis('b6_c2_start').some(c => c.deck); out.f.startAgain = typeof DLG.b6_c2_start().again === 'function';
  /* the reading at the first halt: Tuft */
  talk('b6_c2_deck'); const dk = DLG.b6_c2_deck(); out.f.deckNotNow = dk.ch.some(c => /Not now/.test(c.t)); out.f.deckSay = /back to the sea/.test(dk.txt); runFx(dk.ch.find(c => /draw\./.test(c.t)));
  out.f.deck = {drawn:S.f.b6_c2_drawn, reader:S.f.b6_c2_reader, card:S.card, inPool:B6POOL[2].includes(S.card), scene:B6DECK[2].scene};
  talk('b6_c2_card'); const cd = DLG.b6_c2_card(); out.f.card = {sp:cd.sp, back:cd.ch[0].go}; talk('b6_c2_deck_done'); out.f.deckDone = has('b6_c2_deck_done', /Back to the camp/);
  /* the captain: orders, the plague, the High Fist */
  talk('b6_c2_captain'); out.f.capt = {flag:S.f.b6_c2_capt, notNow:has('b6_c2_captain', /Not now/), again:!!DLG.b6_c2_captain().again};
  take('b6_c2_captain', /Why the villages/); out.f.drek = {flag:S.f.b6_c2_drekHeard, slaughtered:/slaughtered/.test(DLG.b6_c2_capt_plague().txt), gloss:GLOSSX.bh.find(g => g[1] === 'D\'rek')[3]()};
  talk('b6_c2_captain'); take('b6_c2_captain', /High Fist/); out.f.dujek = {flag:S.f.b6_c2_dujek, coral:/Coral/.test(DLG.b6_c2_capt_dujek().txt)};
  /* the regular, and the other squad as rumour */
  talk('b6_c2_regular'); take('b6_c2_regular', /Anything else/); out.f.rumour = {flag:S.f.b6_c2_rumour, other:new RegExp(S.th.r.name).test(DLG.b6_c2_regular_rumour().txt), fourteenth:/Fourteenth/.test(DLG.b6_c2_regular_rumour().txt)};
  /* Brannoc joins by the horse lines */
  talk('b6_c2_captain'); take('b6_c2_captain', /The Falari/); take('b6_c2_capt_brannoc', /horse lines/);
  out.f.brannocOffer = ['Walk with us', 'Stay with Sweetcreek', 'can\'t take you', 'Not now'].every(t => has('b6_c2_brannoc', new RegExp(t)));
  take('b6_c2_brannoc', /Walk with us/); closeModal(); out.f.brannoc = {walks:b6In('brannoc'), flag:S.f.b6_brannocDone, npc:AREAS.b6_c2_camp.npcs.find(n => n.id === 'brannoc').show(), gloss:GLOSSX.bh.find(g => /Sweetcreek/.test(g[1]))[3]()};
  /* the quartermaster */
  const s0 = S.silver, sv0 = S.inv.salve; talk('b6_c2_qm'); take('b6_c2_qm', /oilskin/); talk('b6_c2_qm'); take('b6_c2_qm', /A salve/); out.f.qm = {coat:S.kit.includes('b6_c2_oilskin'), ac:ITEMS.b6_c2_oilskin.ac, salve:S.inv.salve - sv0, cost:s0 - S.silver, again:!has('b6_c2_qm', /oilskin/)};
  /* the shore, the boats, and the trick */
  talk('b6_c2_to_shore'); take('b6_c2_to_shore', /Down to the shore/); out.f.shore = {area:S.area, node:S.node}; talk('b6_c2_boats'); out.f.sweetcreek = /Sweetcreek/.test(DLG.b6_c2_boats().txt);
  talk('b6_c2_mender'); out.f.menderNotNow = has('b6_c2_mender', /Not now/); const mc = vis('b6_c2_mender').find(x => /Show us/.test(x.t)); out.f.trickCheck = mc.check.join(':') + ':' + mc.trick;
  out.f.trickEdges = ['brannoc', 'kettle', 'sgt', 'brisk', 'tuft'].map(id => (mc.edges(id).filter(Boolean)[0] || [0, 0])[1]).join(',');
  made('b6_c2_mender', /Show us/, 'kettle'); out.f.trick = {who:S.tricks && S.tricks.b6_c2_weather && S.tricks.b6_c2_weather.who, ok:S.f.b6_c2_weatherOk, ab:!!AB.t_b6_c2_weather && AB.t_b6_c2_weather.self, fx:/heals 1d6/.test(TRICKS.b6_c2_weather.fx), song:TRICKS.song && AB.t_song ? 1 : 0, again:!!DLG.b6_c2_mender_again().again};
  /* the shrine on the headland (and the trick in a fight) */
  talk('b6_c2_to_shrine'); out.f.shrineNotNow = has('b6_c2_to_shrine', /Not now/);
  out.f.shrine = await force('b6_c2_shrine', async res => { const u = B.units.find(x => x.side === 'p' && x.id === 'kettle'), p2 = B.units.find(x => x.side === 'p' && x !== u && cheb(x, u) <= 4);
    res.offered = trickOk(u, AB.t_b6_c2_weather); p2.hp = 5; p2.stun = true; AB.t_b6_c2_weather.run(u); res.healed = p2.hp > 5; res.woke = !p2.stun; B.used[TRICKS.b6_c2_weather.ab] = 1; res.once = !trickOk(u, AB.t_b6_c2_weather); });
  out.f.shrine.done = S.f.b6_c2_shrineDone; out.f.shrine.charm = S.kit.includes('b6_c2_drekcharm');
  take('b6_c2_shrine_after', /Back along the shore/); take('b6_c2_to_camp', /Up to the camp/); out.f.backCamp = S.area;
  /* the fire above the sea */
  talk('b6_c2_fire'); const fy = DLG.b6_c2_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, html:/fever/.test(fy.html || ''), rest:has('b6_c2_fire', /rest/), talk:has('b6_c2_fire', /Talk with the squad/), march:has('b6_c2_fire', /marches inland/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:fy.ch.some(c => /roster|Who walks/i.test(c.t + (c.tag || ''))), whistle:has('b6_c2_fire', /whistle/), ohl:has('b6_c2_fire', /Ehrlitan/), cureHidden:!has('b6_c2_fire', /sees to the fever/)};
  take('b6_c2_fire', /Let the squad rest/); out.f.rested = S.f.b6_c2_rest1;
  const ft = DLG.b6_c2_fire_talk().txt; out.f.talk = {lines:ft.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, brannoc:/Brannoc/.test(ft)};
  talk('b6_c2_fire'); take('b6_c2_fire', /whistle/); out.f.whistleFlag = S.f.b6_c2_whistle; talk('b6_c2_fire'); take('b6_c2_fire', /Ehrlitan/); out.f.ohlCity = S.f.b6_c2_ohlCity;
  /* the march; the road; the well */
  talk('b6_c2_fire'); take('b6_c2_fire', /marches inland/); out.f.march = {ph:S.f.b6_c2_ph}; take('b6_c2_march', /Inland/); out.f.road = {area:S.area, node:S.node};
  talk('b6_c2_house'); out.f.house = S.f.b6_c2_house;
  { const snapW = JSON.stringify(S); talk('b6_c2_well'); out.f.wellNotNow = has('b6_c2_well', /Leave it/); const wc = vis('b6_c2_well').find(x => /Look at the well/.test(x.t)); out.f.wellEdges = ['ohl', 'brannoc'].map(id => (wc.edges(id).filter(Boolean)[0] || [0, 0])[1]).join(',');
    roll('b6_c2_well', /Look at the well/, 'brisk', 'near'); out.f.wellNear = {fever:b6Fevered('brisk'), flag:S.f.b6_c2_wellSick, caught:(S.stats || {}).b6Caught || 0, ok:S.f.b6_c2_wellOk};
    S = JSON.parse(snapW); save(); startExplore('b6_c2_road'); G.said = {}; talk('b6_c2_well'); made('b6_c2_well', /Look at the well/, 'ohl'); out.f.well = {ok:S.f.b6_c2_wellOk, fever:b6FeverList().length}; }
  /* the village where the dead were left: a forced win of both grounds; the fever passes to one soldier */
  talk('b6_c2_road_on'); take('b6_c2_road_on', /To the village/); out.f.vil0 = {area:S.area, node:S.node, notNow:has('b6_c2_village_arrive', /Not now/)};
  out.f.village = await force('b6_c2_village'); out.f.village.done = S.f.b6_c2_villageDone; out.f.village.ph = S.f.b6_c2_ph; out.f.village.sick = b6FeverList().join(','); out.f.village.html = /Fever:/.test(DLG.b6_c2_village_after().html || '');
  /* the D'rek charm on the fevered soldier: −3 health, not −4 */
  { const w = b6FeverList()[0]; S.gear[w] ??= {}; const keep = S.gear[w].trinket; delete S.gear[w].trinket; const a = mkParty(w, 0, 0).maxhp; S.gear[w].trinket = 'b6_c2_drekcharm'; const b = mkParty(w, 0, 0).maxhp; if (keep) S.gear[w].trinket = keep; else delete S.gear[w].trinket; out.f.charm = b - a; }
  /* Ohl breaks it at the fire */
  talk('b6_c2_fire'); out.f.cureOffer = has('b6_c2_fire', /sees to the fever/); const sick0 = b6FeverList().length; take('b6_c2_fire', /sees to the fever/); out.f.cure = {before:sick0, after:b6FeverList().length, flag:S.f.b6_c2_cured, cured:(S.stats || {}).b6Cured || 0, bruised:!!(S.bruised && S.bruised.ohl)};
  /* the order, the last house */
  startExplore('b6_c2_vil'); talk('b6_c2_order'); out.f.order = {flag:S.f.b6_c2_order, txt:/fire it/i.test(DLG.b6_c2_order().txt)}; take('b6_c2_order', /last house/);
  out.f.key = {node:S.node, burn:has('b6_c2_lasthouse', /fire it/), pass:has('b6_c2_lasthouse', /go round/), notYet:has('b6_c2_lasthouse', /Not yet/), brannoc:/Brannoc/.test(DLG.b6_c2_lasthouse().txt)};
  const snap = JSON.stringify(S);
  const L = () => ({brisk:S.loy.brisk, ohl:S.loy.ohl, brannoc:S.loy.brannoc});
  /* ================= key: burn ================= */
  { const l0 = L(), c0 = (S.stats || {}).b6Caught || 0, bu = S.inv.burner; take('b6_c2_lasthouse', /fire it/); const l1 = L();
    out.b = {key:S.f.b6_c2_key, family:S.f.b6_c2_family, ph:S.f.b6_c2_ph, caught:((S.stats || {}).b6Caught || 0) - c0, burner:bu - S.inv.burner, loy:Object.fromEntries(Object.keys(l1).map(k => [k, l1[k] - l0[k]]))};
    take('b6_c2_burn', /Back to the road/); out.b.area = S.area; out.b.back = S.node; out.b.fireOn = has('b6_c2_fire', /On, after the column/);
    talk('b6_c2_bandits'); out.b.banditsNotNow = has('b6_c2_bandits', /Not now/);
    out.b.road = await force('b6_c2_road'); out.b.road.done = S.f.b6_c2_roadDone; out.b.axe = {kit:S.kit.includes('b6_c2_falariaxe'), dmg:ITEMS.b6_c2_falariaxe.dmg.join(',')};
    take('b6_c2_road_after', /On, after the column/); out.b.column = {brannoc:/Brannoc/.test(DLG.b6_c2_column().txt), notYet:has('b6_c2_column', /Not yet/)};
    take('b6_c2_column', /^South/); await wait(60); out.b.end = {view, ch:S.chapters[2], lvl:S.lvl, xp:S.xp}; out.b.extras = CHAPTERS[2].extras().length; out.b.journal = CHAPTERS[2].journal().length; }
  /* ================= key: pass, from the same moment ================= */
  { S = JSON.parse(snap); save(); startExplore('b6_c2_vil'); G.said = {}; talk('b6_c2_lasthouse');
    const l0 = L(), c0 = (S.stats || {}).b6Caught || 0; take('b6_c2_lasthouse', /go round/); const l1 = L();
    out.p = {key:S.f.b6_c2_key, family:S.f.b6_c2_family, who:S.f.b6_c2_passWho, sick:b6Fevered('brannoc'), caught:((S.stats || {}).b6Caught || 0) - c0, loy:Object.fromEntries(Object.keys(l1).map(k => [k, l1[k] - l0[k]])), joke:/Doesn't touch a Falari/.test(DLG.b6_c2_pass().txt)};
    take('b6_c2_pass', /Back to the road/); out.p.area = S.area; out.p.end0 = CHAPTERS[2].endCap();
    out.p.road = await force('b6_c2_road'); take('b6_c2_road_after', /On, after the column/); take('b6_c2_column', /^South/); await wait(60); out.p.end = {view, ch:S.chapters[2]}; out.p.extra = CHAPTERS[2].extras().some(x => /caught the fever carrying/.test(x)); }
  /* ================= Brannoc waits with Sweetcreek's lines; or is sent away ================= */
  { mk('Wait'); talk('b6_c2_start'); talk('b6_c2_brannoc'); take('b6_c2_brannoc', /Stay with Sweetcreek/); out.w = {flag:S.f.b6_brannocDone, walks:b6In('brannoc'), camp:(S.camp || []).includes('brannoc'), npc:AREAS.b6_c2_camp.npcs.find(n => n.id === 'brannoc').show(), again:has('b6_c2_brannoc_again', /Walk with us now/), waitRoster:ROSTER_BOOKS.bh.wait('brannoc')};
    take('b6_c2_brannoc_again', /Walk with us now/); closeModal(); out.w.later = b6In('brannoc');
    mk('Away'); talk('b6_c2_start'); talk('b6_c2_brannoc'); take('b6_c2_brannoc', /can't take you/); out.w.away = {flag:S.f.b6_brannocDone, npc:AREAS.b6_c2_camp.npcs.find(n => n.id === 'brannoc').show(), can:b6CanRecruit('brannoc')}; }
  /* ================= no Ohl (a transfer that lost him): nobody can treat it ================= */
  { mk('NoOhl'); S.squad = S.squad.filter(k => k !== 'ohl'); S.dead.ohl = {ch:7, where:'Coral', from:'moi'}; S.f.b6_c2_ph = 3; S.f.b6_c2_villageDone = 1; b6Catch('kettle', 'test'); save();
    out.n = {can:b6CanCure(), offer:has('b6_c2_fire', /sees to the fever/), html:/Nobody here can treat it yet/.test(DLG.b6_c2_fire().html), renderErr:renderAll()}; }
  /* ================= a --from=2 style save: every node renders, phase by phase ================= */
  { setBook('bh'); S = newStateBH('Hask', 'Brann'); const keys = B6KEYS; S.f.b6_c1_key = 'leave'; S.chapters = {1:'leave'}; S.lvl = 13; S.xp = LEVELS[12]; S.th.h.lvl = 12; S.th.h.xp = LEVELS[11];
    S.f.b6_mehetDone = 1; S.squad.push('mehet'); S.loy.mehet = 0; S.picksDue = []; S.th.h.picksDue = []; migrate(S); save(); startChapter(2); closeModal();
    const errs = []; [1, 2, 3, 4, 5].forEach(ph => { S.f.b6_c2_ph = ph; if (ph >= 3) S.f.b6_c2_villageDone = 1; if (ph >= 4) S.f.b6_c2_key = ph === 4 ? 'burn' : 'pass'; if (ph >= 5) S.f.b6_c2_roadDone = 1; errs.push(...renderAll().map(e => `ph${ph} ${e}`)); });
    b6Join('brannoc'); closeModal(); b6Catch('brannoc', 'test'); errs.push(...renderAll().map(e => `brannoc ${e}`)); out.y = {renderErr:errs, brannoc:b6In('brannoc'), thread:S.thread, otherLvl:S.th.r.lvl}; }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, b = r.b || {}, p = r.p || {}, w = r.w || {}, n = r.n || {}, y = r.y || {};
if (f.area) {
  f.thread === 'h' && f.name === 'Fresh' && /brisk,kettle,tuft,ohl/.test(f.squad) && f.lvl === 12 && f.area === 'b6_c2_camp' && f.ch === 2 && f.title === 'The North Coast' && f.num === 'Two' && !f.renderErr.length && f.roster && f.reg ? ok('a fresh Chapter Two swaps in the Fourth (level 12) and opens in the Host\'s camp on the north coast; every b6_c2 node renders') : no('fresh ' + JSON.stringify(f).slice(0, 700));
  f.ph === 1 && f.deckChoice && f.startAgain && f.deckNotNow && f.deckSay && f.deck.drawn === 1 && f.deck.reader === 'tuft' && f.deck.inPool && f.deck.scene === 'b6_coast' && f.card.sp === 'The Deck of Dragons' && f.card.back === 'b6_c2_deck_done' && f.deckDone ? ok(`the first halt and the reading (Tuft deals: ${f.deck.card}; "Not now" offered)`) : no('deck ' + JSON.stringify([f.ph, f.deckChoice, f.deck, f.card, f.deckDone, f.deckSay]));
  f.capt.flag && f.capt.notNow && f.capt.again && f.drek.flag && f.drek.slaughtered && f.drek.gloss && f.dujek.flag && f.dujek.coral && f.rumour.flag && f.rumour.other && f.rumour.fourteenth ? ok('the captain (a hub with an again line), the D\'rek priests found slaughtered, the High Fist unseen since Coral; the other squad as rumour') : no('captain ' + JSON.stringify([f.capt, f.drek, f.dujek, f.rumour]));
  f.brannocOffer && f.brannoc.walks && f.brannoc.flag === 1 && !f.brannoc.npc && f.brannoc.gloss ? ok('Brannoc joins by the horse lines (walk, wait, send away, Not now offered)') : no('brannoc ' + JSON.stringify([f.brannocOffer, f.brannoc]));
  f.qm.coat && f.qm.ac === 1 && f.qm.salve === 1 && f.qm.cost === 2 && f.qm.again ? ok('the quartermaster: the Fourth\'s oilskin (+1 armour), a salve for 2 silver') : no('qm ' + JSON.stringify(f.qm));
  f.shore.area === 'b6_c2_shore' && f.sweetcreek && f.menderNotNow && f.trickCheck === 'wits:17:b6_c2_weather' && f.trickEdges === '2,2,1,-1,-1' && f.trick.who === 'kettle' && f.trick.ok && f.trick.ab && f.trick.fx && f.trick.again ? ok('the trick: Falari Weather-Sense, ✦ Wits 17 (Brannoc +2, Kettle +2, sergeant +1, Brisk −1, Tuft −1), taught by the sail-mender; Sweetcreek at a distance') : no('trick ' + JSON.stringify([f.shore, f.trickCheck, f.trickEdges, f.trick]));
  f.shrineNotNow && f.shrine.started && f.shrine.offered && f.shrine.healed && f.shrine.woke && f.shrine.once && f.shrine.after === 'b6_c2_shrine_after' && f.shrine.done && f.shrine.charm && f.backCamp === 'b6_c2_camp' ? ok(`the shrine on the headland: a forced win (+${f.shrine.xp} xp), the D'rek charm; Weather-Sense in the fight heals and wakes, once a fight`) : no('shrine ' + JSON.stringify([f.shrine, f.backCamp]));
  f.fire.again && f.fire.html && f.fire.rest && f.fire.talk && f.fire.march && f.fire.notNow && f.fire.roster && f.fire.whistle && f.fire.ohl && f.fire.cureHidden && f.rested === 1 && f.talk.lines === f.talk.here && f.talk.brannoc && f.whistleFlag && f.ohlCity ? ok(`the fire above the sea: again line, fever box, rest, talk (a line each, ${f.talk.lines}), the roster, Brannoc's whistle and Kettle, Ohl and Ehrlitan, the march, Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talk, f.whistleFlag, f.ohlCity]));
  f.march.ph === 2 && f.road.area === 'b6_c2_road' && f.road.node === 'b6_c2_road_arrive' && f.house && f.wellNotNow && f.wellEdges === '2,-2' && f.wellNear.fever && f.wellNear.flag === 'brisk' && f.wellNear.caught === 1 && f.well.ok && f.well.fever === 0 ? ok('the march inland; the empty house; the well (Ohl +2, Brannoc −2): "yes, but you drank from that well" gives Brisk the fever; a clean look keeps everyone well') : no('road ' + JSON.stringify([f.march, f.road, f.house, f.wellEdges, f.wellNear, f.well]));
  f.vil0.area === 'b6_c2_vil' && f.vil0.notNow && f.village.started && f.village.fever && f.village.stage2 && f.village.inStage2 && /bruiser/.test(f.village.foes2 || '') && f.village.after === 'b6_c2_village_after' && f.village.done && f.village.ph === 3 && f.village.sick && f.village.html ? ok(`the village where the dead were left: both grounds forced (+${f.village.xp} xp), the fever passes to ${f.village.sick}`) : no('village ' + JSON.stringify([f.vil0, f.village]));
  f.charm === 1 ? ok('the D\'rek charm: the fever costs its wearer 3 health, not 4') : no('charm ' + f.charm);
  f.cureOffer && f.cure.before >= 1 && f.cure.after === 0 && f.cure.flag === 1 && f.cure.cured >= 1 && f.cure.bruised ? ok('Ohl breaks the fever at the fire, out of a sick warren (he pays for it)') : no('cure ' + JSON.stringify([f.cureOffer, f.cure]));
  f.order.flag && f.order.txt && f.key.node === 'b6_c2_lasthouse' && f.key.burn && f.key.pass && f.key.notYet && f.key.brannoc ? ok('the order to fire the village; the family in the last house; both ways and Not yet; Brannoc there') : no('key ' + JSON.stringify([f.order, f.key]));
}
b.key === 'burn' && b.family === 'fled' && b.ph === 4 && b.caught === 0 && b.burner === 1 && JSON.stringify(b.loy) === JSON.stringify({brisk:1, ohl:-1, brannoc:-1}) && b.area === 'b6_c2_road' && b.back === 'b6_c2_road_back' ? ok('key burn: nobody catches anything there; Kettle spends a burner; Brisk +1, Ohl −1, Brannoc −1') : no('burn ' + JSON.stringify(b).slice(0, 600));
b.banditsNotNow && b.road && b.road.started && b.road.waves === 1 && b.road.done && b.axe.kit && b.axe.dmg === '1,12,3' && b.column.brannoc && b.column.notYet && b.end && b.end.view === 'end' && b.end.ch === 'burn' && b.end.lvl >= 13 ? ok(`burn: the plague road (a wave; +${b.road.xp} xp), the Falari axe (1d12+3), the column, the end (level ${b.end.lvl}, ${b.end.xp} xp; ${b.extras} end lines, ${b.journal} journal)`) : no('burn end ' + JSON.stringify([b.road, b.axe, b.column, b.end]));
p.key === 'pass' && p.family === 'roofs' && p.who === 'brannoc' && p.sick && p.caught === 1 && p.joke && JSON.stringify(p.loy) === JSON.stringify({brisk:-1, ohl:1, brannoc:1}) && p.area === 'b6_c2_road' && /chimney/.test(p.end0) && p.end && p.end.ch === 'pass' && p.extra ? ok('key pass: the family keeps its roofs; Brannoc catches the fever carrying the water ("doesn\'t touch a Falari"); Ohl +1, Brannoc +1, Brisk −1; the end') : no('pass ' + JSON.stringify(p).slice(0, 600));
w.flag === 2 && !w.walks && w.camp && w.npc && w.again && w.waitRoster && w.later && w.away && w.away.flag === 0 && !w.away.npc && !w.away.can ? ok('Brannoc waits with Sweetcreek\'s lines (the roster knows; he can walk later); sent away, he is gone') : no('wait ' + JSON.stringify(w));
!n.can && !n.offer && n.html && !n.renderErr.length ? ok('without Ohl nobody can treat the fever: no cure at the fire, and every node still renders') : no('no ohl ' + JSON.stringify(n).slice(0, 600));
y.renderErr && !y.renderErr.length && y.brannoc && y.thread === 'h' && y.otherLvl === 13 ? ok('a --from=2 style save: every node renders in every phase, with Brannoc fevered and without; the Third waits at level 13') : no('synthetic ' + JSON.stringify(y).slice(0, 800));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b6ch2: FAIL (${bad.length})` : 'b6ch2: all ok'); process.exit(bad.length ? 1 : 0);
