// Book Seven, Chapter 4 (The Muster, src/124_b7_ch4.js): the halts, both keys from the same moment at the Sixth's fire, the reading at the
// first halt (the tent, the Tiles through Perrit, the Wall), the fire (rest, a line each, the Rising box, the roster, Not now), every fight's
// start and a forced win (the Edur's lesson, the riot at the muster gate at seven and at five after the talking, both grounds of the
// patriots), the trick (taught by Sorvan, and its battle half), the Rising and file moves ('edur': Rising −1, file −1; 'letherii': Rising +1,
// file +1; the levies let go +1 or handed back −1; the grooms' "yes, but" files +1), Sorvan's join (and the waiting road, and the road
// out), the name on the list by Chapter 2's key, the arrest branch when the file is wanted (out by the Finadd's signature, or by a talk
// that fails into it, or by Ilsa), and the chapter's end; from a --from=4 style start, and from a synthetic save with Perrit and Tobet dead,
// Book Five's recruits and Ilsa walking, where every node must still render, the tile-woman reads, Ruuk teaches and Sorvan waits.
// Usage: node tools/b7ch4_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const failed = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'fail', ok:false, pass:false, margin:-6, nat:3}, c); talk(c.fail); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const win = async (id) => { const res = {id};
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const force = async (id, start) => { (start || (() => startBattle(id, {})))(); await wait(60); const res = {started:!!B && B.id === id, foes:B.units.filter(u => u.side === 'e').length, allies:B.units.filter(u => u.ally).length, dark:!!B.def.dark}; return Object.assign(res, await win(id)); };
  const nodes = Object.keys(DLG).filter(k => /^b7_c4_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b|Kettle|Tehol the Only|Mael\b|Bonehunter|Bolkando|Redmask|K'Chain|!\s/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (leak.test(n.txt.replace(/"[^"]*"/g, '') + (n.html || '').replace(/<[^>]*>/g, ''))) errs.push(k + ': leaks'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); (n.ch || []).forEach(c => { if (/undefined|NaN/.test(c.t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const atPhases = () => { const was = [S.f.b7_c4_ph, S.f.b7_c4_key, S.f.b7_c4_patriotsDone], errs = [];
    [1, 2, 3, 4].forEach(p => [null, 'edur', 'letherii'].forEach(k => [0, 1].forEach(d => { S.f.b7_c4_ph = p; S.f.b7_c4_key = k; S.f.b7_c4_patriotsDone = d; renderAll().forEach(e => errs.push(`${p}/${k}/${d}:${e}`)); })));
    [S.f.b7_c4_ph, S.f.b7_c4_key, S.f.b7_c4_patriotsDone] = was; return [...new Set(errs)]; };
  const lines = () => DLG.b7_c4_fire_talk().txt.split('\n\n').length;
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('rg'); startExplore(area); };
  try {
  /* ================= a --from=4 style start: the Letherii at 9, Chapter 2's key unset (reads as refuse: the sergeant's name) ================= */
  setBook('rg'); S = newStateRG('Fresh', 'Other'); S.th.l.lvl = 9; S.th.l.xp = LEVELS[8]; S.th.l.picksDue = []; S.picksDue = []; save(); startChapter(4); S.picksDue = [];
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, squad:S.squad.join(','), lvl0:S.lvl, renderErr:atPhases(), title:CHAPTERS[4].title, nodes:nodes.length, areas:CHAPTERS[4].areas.length, fights:Object.keys(CHAPTERS[4].battles).length,
    rise0:b7Rising(), file0:b7File(), items:Object.keys(CHAPTERS[4].gear).every(k => !!ART['item/' + k] && ITEMS[k].role && /c74-/.test(ART['item/' + k])),
    figure:typeof FIGX.sorvan === 'function', por:typeof POR.sorvan === 'function', tile:typeof TILEX.b7_c4_lines === 'function',
    scenes:['b7_kravos', 'b7_c4_tent', 'b7_c4_gate', 'b7_c4_horselines'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), read:B7READ[4] && B7READ[4].back === 'b7_c4_fire', other:Object.keys(S.th || {}).join(',')};
  /* phase 1: the tent (the first halt), the reading, the Finadd, the clerk (the list), the tile-woman, the hill, the Edur */
  talk('b7_c4_tent'); out.f.ph = S.f.b7_c4_ph; out.f.tiles = has('b7_c4_tent', /tiles/);
  talk('b7_c4_read'); const rd = DLG.b7_c4_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b7_c4_drawn, reader:S.f.b7_c4_reader, card:S.card, inPool:B7POOL[4].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), words:/tent/.test(rd.txt)};
  talk('b7_c4_card'); out.r.cardNode = DLG.b7_c4_card().sp; out.r.backGo = DLG.b7_c4_card().ch[0].go;
  talk('b7_c4_fire'); out.f.sleepGated = !has('b7_c4_fire', /^Sleep/);
  talk('b7_c4_ennic'); take('b7_c4_ennic', /lines saying/); const nn = DLG.b7_c4_ennic_news().txt; out.f.news = S.f.b7_c4_news && /father and mother/.test(nn) && /Awl/.test(nn) && /Bivatt/.test(nn) && /five armies/i.test(nn);
  talk('b7_c4_clerk'); made('b7_c4_clerk', /Read the list/, 'perrit'); out.f.list = {name:S.f.b7_c4_listName, ok:S.f.b7_c4_clerkOk, txt:/yours, Sergeant/.test(DLG.b7_c4_clerk_ok().txt)};
  talk('b7_c4_tilewoman'); out.f.tw = S.f.b7_c4_tw; talk('b7_c4_hill'); out.f.hill = /Hanradi Khalag/.test(DLG.b7_c4_hill().txt) && !/Sirryn/.test(DLG.b7_c4_hill().txt);
  talk('b7_c4_edur_view'); out.g = {lesson:has('b7_c4_edur_view', /lesson/), watch:has('b7_c4_edur_view', /watch how they stand/), decline:has('b7_c4_edur_view', /Decline/), notNow:has('b7_c4_edur_view', /Not now/), npc:AREAS.b7_c4_lines.npcs.find(n => n.id === 'edur').show()};
  out.g.fight = await force('b7_c4_edurcamp'); out.g.done = S.f.b7_c4_edurDone; out.g.npcGone = !AREAS.b7_c4_lines.npcs.find(n => n.id === 'edur').show();
  /* the fire, phase 1 */
  talk('b7_c4_fire'); const fy = DLG.b7_c4_fire(); out.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b7_c4_fire', /rest/), talk:has('b7_c4_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:ROSTER_FIRES.rg[4].includes('b7_c4_fire'), html:/The Rising/.test(fy.html || '') && /Your file/.test(fy.html || ''), sleep:has('b7_c4_fire', /^Sleep/)};
  S.wounds = {tobet:4}; take('b7_c4_fire', /Let the squad rest/); out.fire.rested = S.f.b7_c4_rest1 && !S.wounds;
  out.fire.talkLines = lines(); out.fire.here = S.squad.filter(id => id !== 'sgt').length;
  /* the night, then the muster gate */
  take('b7_c4_fire', /^Sleep/); take('b7_c4_sleep', /First light/); out.st = {area:S.area, ph:S.f.b7_c4_ph, fire:/No fire/.test(DLG.b7_c4_fire().txt)};
  talk('b7_c4_gate_back'); out.st.backGated = !has('b7_c4_gate_back', /at dusk/);
  talk('b7_c4_tables'); out.st.badge = S.f.b7_c4_badge && S.kit.includes('b7_c4_musterbadge');
  S.f.b7_c3_key = 'ledger'; talk('b7_c4_sutler'); out.st.rumour = /debt-roll/.test(DLG.b7_c4_sutler().txt); delete S.f.b7_c3_key; const ds = S.silver, dsa = S.inv.salve; take('b7_c4_sutler', /jar of salve/); out.st.stall = {docks:ds - S.silver, salve:S.inv.salve - dsa};
  /* the crowd: a rise:true Guile check (clean file: no file edge); its "yes, but" is a bruise, not the file; made, two fewer rioters */
  talk('b7_c4_crowd'); const cc = DLG.b7_c4_crowd().ch.find(c => c.rise); out.c = {rise:!!cc, fileEdge:edgesFor(cc, 'tobet').some(e => /file/.test(e[0])), notNow:has('b7_c4_crowd', /Not now/)};
  const snapC = JSON.stringify(S); const f0 = b7File();
  near('b7_c4_crowd', /Talk to the front/, 'tobet'); out.c.nearFile = b7File() - f0; out.c.bruised = (S.bruised || {}).tobet || 0;
  restore(snapC, 'b7_c4_gate');
  out.c.fight = await force('b7_c4_riot', () => made('b7_c4_crowd', /Talk to the front/, 'tobet'));
  out.c.choices = has('b7_c4_riot_after', /Cut the rope/) && has('b7_c4_riot_after', /Hand the rope back/);
  const snapR = JSON.stringify(S), r0 = b7Rising();
  take('b7_c4_riot_after', /Cut the rope/); out.c.let = {flag:S.f.b7_c4_crowd, rise:b7Rising() - r0}; runFx(DLG.b7_c4_riot_after().ch[0]); out.c.let.once = b7Rising() - r0;
  restore(snapR, 'b7_c4_gate');
  take('b7_c4_riot_after', /Hand the rope back/); out.c.kept = {flag:S.f.b7_c4_crowd, rise:b7Rising() - r0};
  restore(snapR, 'b7_c4_gate'); take('b7_c4_riot_after', /Cut the rope/); out.c.done = S.f.b7_c4_riotDone;
  /* Sorvan: the lance; wait, go, or walk */
  talk('b7_c4_sorvan'); out.s = {notNow:has('b7_c4_sorvan', /Not now/)}; take('b7_c4_sorvan', /Who left you/); out.s.met = S.f.b7_c4_sorvanMet; out.s.lance = S.kit.includes('b7_c4_bluelance');
  out.s.choices = ['walk with us', 'Wait at the horse lines', 'Find a company', 'Not now'].every(w => has('b7_c4_sorvan_more', new RegExp(w)));
  const snapS = JSON.stringify(S);
  take('b7_c4_sorvan_more', /Wait at the horse lines/); out.s.wait = {flag:S.f.b7_sorvanDone, roster:ROSTER_BOOKS.rg.wait('sorvan'), camp:(S.camp || []).includes('sorvan'), npc:AREAS.b7_c4_gate.npcs.find(n => n.id === 'sorvan').show(), teach:b74Teach()};
  talk('b7_c4_sorvan'); take('b7_c4_sorvan', /Walk with us/); out.s.wait.joined = b7In('sorvan') && S.f.b7_sorvanDone === 1 && !(S.camp || []).includes('sorvan');
  restore(snapS, 'b7_c4_gate');
  take('b7_c4_sorvan_more', /Find a company/); out.s.away = {flag:S.f.b7_sorvanDone, can:b7CanRecruit('sorvan'), teach:b74Teach()};
  restore(snapS, 'b7_c4_gate');
  take('b7_c4_sorvan_more', /walk with us/); out.s.join = {in:b7In('sorvan'), flag:S.f.b7_sorvanDone, fire:/Sorvan/.test(DLG.b7_c4_fire_talk().txt), lines:lines(), here:S.squad.filter(id => id !== 'sgt').length, teach:b74Teach()};
  S.picksDue = []; { const m = document.getElementById('modal'); if (m) m.hidden = true; }
  /* back to the lines at dusk */
  talk('b7_c4_gate_back'); take('b7_c4_gate_back', /at dusk/); out.d = {area:S.area, ph:S.f.b7_c4_ph, dusk:/provost/i.test(DLG.b7_c4_dusk().txt)};
  talk('b7_c4_fire'); out.d.rest3 = has('b7_c4_fire', /rest/); out.d.noVisit = !has('b7_c4_fire', /two visitors/);
  talk('b7_c4_to_horse'); take('b7_c4_to_horse', /To the horse lines/); out.d.horseArea = S.area;
  talk('b7_c4_horse_back'); out.d.backGated = !has('b7_c4_horse_back', /Back to the lines/);
  /* the grooms: rise:true; the "yes, but" files a page; made, the way between the horses */
  talk('b7_c4_grooms'); const gc = DLG.b7_c4_grooms().ch.find(c => c.rise); out.gr = {rise:!!gc};
  const snapG = JSON.stringify(S), fg = b7File();
  near('b7_c4_grooms', /Ask him/, 'sorvan'); out.gr.nearFile = b7File() - fg; out.gr.filed = (S.stats || {}).b7Filed || 0;
  restore(snapG, 'b7_c4_horse');
  made('b7_c4_grooms', /Ask him/, 'sorvan'); out.gr.ok = S.f.b7_c4_groomsOk && b7File() === fg;
  /* the trick: Bluerose Horse-Sense, from Sorvan */
  talk('b7_c4_horses'); take('b7_c4_horses', /bring the line back/); out.t = {teach:b74Teach(), notNow:has('b7_c4_horse_trick', /Not now/), dc:DLG.b7_c4_horse_trick().ch[0].check[1]}; made('b7_c4_horse_trick', /Learn it/, 'sorvan');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b7_c4_horse && S.tricks.b7_c4_horse.who, ok:S.f.b7_c4_horseOk, fx:/heals/.test(TRICKS.b7_c4_horse.fx)});
  /* the patriots: the list, the way between the horses; the trick's battle half; both grounds */
  talk('b7_c4_wagon'); talk('b7_c4_patriots'); out.p = {who:S.f.b7_c4_listName, between:has('b7_c4_patriots', /between the horses/), no:has('b7_c4_patriots', /"No\."/), notNow:has('b7_c4_patriots', /Not now/), html:/The Rising/.test(DLG.b7_c4_patriots().html || '')};
  const snapP = JSON.stringify(S);
  take('b7_c4_patriots', /between the horses/); await wait(60);
  { const u = B.units.find(x => x.id === 'sorvan'); u.hp = Math.max(1, u.hp - 8); const h0 = u.hp; out.t.offered = trickOk(u, AB.t_b7_c4_horse); AB.t_b7_c4_horse.run(u); out.t.healed = u.hp > h0; }
  out.p.fight = Object.assign({started:B.id === 'b7_c4_patriots', foes:B.units.filter(u => u.side === 'e').length}, await win('b7_c4_patriots'));
  out.p.kit = S.kit.includes('b7_c4_bluescale'); out.p.done = S.f.b7_c4_patriotsDone;
  take('b7_c4_patriots_after', /Back to the lines/); out.k = {area:S.area, visitNpc:AREAS.b7_c4_lines.npcs.find(n => n.id === 'visit').show(), invite:/Edur/.test(DLG.b7_c4_invite().txt)};
  talk('b7_c4_fire'); out.k.fireVisit = has('b7_c4_fire', /two visitors/);
  /* the key, at the Sixth's fire */
  take('b7_c4_invite', /Hear them out/); const kn = DLG.b7_c4_key(); out.k = Object.assign(out.k, {edur:has('b7_c4_key', /picket/), leth:has('b7_c4_key', /Lether's/), notYet:has('b7_c4_key', /Not yet/), html:/The Rising/.test(kn.html || '') && /Your file/.test(kn.html || ''), sorvan:/Sorvan/.test(kn.txt)});
  S.b7.file = 2; const snapK = JSON.stringify(S), rk = b7Rising(), fk = b7File(), lk = {thegg:S.loy.thegg, tobet:S.loy.tobet, sorvan:S.loy.sorvan};
  /* ================= key: edur, then back to letherii from the same moment ================= */
  take('b7_c4_key', /picket/); out.ed = {thegg0:lk.thegg, key:S.f.b7_c4_key, rise:b7Rising() - rk, file:b7File() - fk, thegg:S.loy.thegg - lk.thegg, tobet:S.loy.tobet - lk.tobet, sorvan:S.loy.sorvan - lk.sorvan};
  take('b7_c4_key_edur', /Sleep/); out.ed.area = S.area; out.ed.ph = S.f.b7_c4_ph; out.ed.dawn = /width of a squad/.test(DLG.b7_c4_dawn().txt);
  restore(snapK, 'b7_c4_lines');
  take('b7_c4_key', /Lether's/); out.lt = {key:S.f.b7_c4_key, rise:b7Rising() - rk, file:b7File() - fk, thegg:S.loy.thegg - lk.thegg, tobet:S.loy.tobet - lk.tobet, rose:(S.stats || {}).b7Rose || 0};
  take('b7_c4_key_letherii', /Sleep/); out.lt.dawn = /touches his hat/.test(DLG.b7_c4_dawn().txt);
  /* dawn, the end */
  talk('b7_c4_fire'); out.e = {onwardGated:!has('b7_c4_fire', /night is over/), lines:lines(), here:S.squad.filter(id => id !== 'sgt').length, html:/The Rising/.test(DLG.b7_c4_fire().html || '')};
  talk('b7_c4_dawn_ennic'); out.e.ennic = S.f.b7_c4_dawnEnnic; take('b7_c4_fire', /night is over/); out.e.sorvanEnd = /Sorvan/.test(DLG.b7_c4_onward().txt); out.e.notYet = has('b7_c4_onward', /Not yet/);
  take('b7_c4_onward', /March/); await wait(60);
  out.e = Object.assign(out.e, {view, ch:S.chapters[4], lvl:S.lvl, xp:S.xp, rise:b7Rising(), file:b7File(), extras:CHAPTERS[4].extras().length, journal:CHAPTERS[4].journal().length, endText:(CHEND[4] || {}).letherii && CHEND[4].letherii[0]});
  /* ================= the arrest: the file wanted at the patriots ================= */
  restore(snapP, 'b7_c4_horse'); S.b7.file = 8; out.a = {wanted:b7Wanted()};
  const an = DLG.b7_c4_patriots(); talk('b7_c4_patriots'); out.a.sp = an.sp; out.a.list = S.f.b7_c4_listName; out.a.cell = /cell/i.test(an.txt);
  out.a.choices = {sorvan:has('b7_c4_arrest', /Sorvan/), talk:has('b7_c4_arrest', /provost through the bars/), ennic:has('b7_c4_arrest', /Finadd/), ilsa:has('b7_c4_arrest', /Ilsa/)}; out.a.again = DLG.b7_c4_patriots().sp;
  const snapA = JSON.stringify(S);
  failed('b7_c4_arrest', /provost through the bars/, 'sgt'); out.a.no = S.node; take('b7_c4_arrest_no', /Finadd/); out.a.ennic = {out:S.f.b7_c4_out, signed:S.f.b7_c4_ennicSigned}; out.a.arrest = S.f.b7_c4_arrest;
  take('b7_c4_arrest_ennic', /Out/); out.a.fight = await force('b7_c4_patriots', () => take('b7_c4_arrest_out', /Blades/)); out.a.done = S.f.b7_c4_patriotsDone;
  restore(snapA, 'b7_c4_horse'); take('b7_c4_arrest', /Sorvan/); out.a.sorvanOut = S.f.b7_c4_out;
  restore(snapA, 'b7_c4_horse'); made('b7_c4_arrest', /provost through the bars/, 'ammet'); out.a.talkOut = S.f.b7_c4_out;
  /* ================= a synthetic save: Perrit and Tobet dead; Ruuk, Brune, Pessa and Ilsa walking; Chapter 2 'name' ================= */
  setBook('rg'); S = newStateRG('Syn', 'Other'); { const L = S.th.l; L.squad = ['sgt', 'thegg', 'ammet', 'ruuk', 'brune', 'ilsa']; L.camp = ['pessa']; L.dead = {perrit:{ch:7, where:'Brans Keep', from:'mt'}, tobet:{ch:7, where:'Letheras', from:'mt'}}; ['ruuk', 'brune', 'pessa', 'ilsa'].forEach(k => { L.loy[k] ??= 0; L.gear[k] ??= {}; L.picks[k] ??= []; }); L.picksDue = []; L.lvl = 9; L.xp = LEVELS[8]; }
  S.f.b7_c2_key = 'name'; S.f.b7_ilsaDone = 1; S.picksDue = []; save(); startChapter(4); S.picksDue = [];
  out.y = {thread:S.thread, renderErr:atPhases(), lines:lines(), here:S.squad.filter(id => id !== 'sgt').length, reader:visReader().id, teach:b74Teach(), list:b74List(), ilsa:/Ilsa/.test(DLG.b7_c4_fire_talk().txt), ruuk:/Ruuk/.test(DLG.b7_c4_fire_talk().txt)};
  S.f.b7_c4_ph = 3; out.y.lines3 = lines();
  /* six walk: Sorvan waits, and teaches from the pickets */
  S.f.b7_c4_ph = 2; take('b7_c4_sorvan', /Who left you/); take('b7_c4_sorvan_more', /walk with us/); out.y.full = {flag:S.f.b7_sorvanDone, camp:(S.camp || []).includes('sorvan'), in:b7In('sorvan')};
  S.f.b7_c4_ph = 3; out.y.full.teach = b74Teach(); out.y.full.npc = AREAS.b7_c4_horse.npcs.find(n => n.id === 'sorvanw').show();
  /* the arrest with Ilsa: she reads the warrant */
  S.b7.file = 8; startExplore('b7_c4_horse'); talk('b7_c4_patriots'); out.y.arrestIlsa = has('b7_c4_arrest', /Ilsa/); take('b7_c4_arrest', /Ilsa/); out.y.ilsaOut = S.f.b7_c4_out;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, g = r.g || {}, fi = r.fire || {}, st = r.st || {}, c = r.c || {}, s = r.s || {}, d = r.d || {}, gr = r.gr || {}, t = r.t || {}, p = r.p || {}, k = r.k || {}, ed = r.ed || {}, lt = r.lt || {}, e = r.e || {}, a = r.a || {}, y = r.y || {};
if (f.area) {
  f.area === 'b7_c4_lines' && f.ch === 4 && f.thread === 'l' && f.lvl0 === 9 && f.squad === 'sgt,tobet,thegg,perrit,ammet' && !f.renderErr.length && f.title === 'The Muster' && f.rise0 === 2 && f.file0 === 0 && f.items && f.figure && f.por && f.tile && f.scenes && f.read && f.other === 't'
    ? ok(`a --from=4 start opens Chapter Four in the lines below Kravos Hill at level 9 with the Letherii (the Third waiting); every b7_c4 node renders in every phase and key (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); items, Sorvan, the ground and four backdrops drawn`) : no('start ' + JSON.stringify(f).slice(0, 900));
  f.ph === 1 && f.tiles && f.sleepGated && f.news && f.list && f.list.name === 'sgt' && f.list.ok === 1 && f.list.txt && f.tw === 1 && f.hill
    ? ok('the first night: the tent offers the Tiles; sleep waits on the Finadd; his news (the Emperor\'s parents, the Awl, Bivatt, five armies); the clerk\'s list has the sergeant\'s name (Chapter 2 unset); the tile-woman; the hill (Hanradi\'s banner)') : no('night ' + JSON.stringify(f).slice(0, 600));
}
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.words && rd.cardNode === 'The Tiles of the Holds' && rd.backGo === 'b7_c4_fire' ? ok(`the reading in the tent: Perrit lays the Tiles (${rd.card}); back to b7_c4_fire`) : no('reading ' + JSON.stringify(rd));
g.lesson && g.watch && g.decline && g.notNow && g.npc && g.fight && g.fight.started && g.fight.foes === 4 && g.fight.after === 'b7_c4_edur_after' && g.done === 1 && g.npcGone ? ok('the Edur from the hill: the lesson (take it, watch them, decline, Not now); four Edur, a forced win') : no('edur ' + JSON.stringify(g));
fi.again && fi.rest && fi.talk && fi.notNow && fi.roster && fi.html && fi.sleep && fi.rested && fi.talkLines === fi.here ? ok(`the fire: an again line, the Rising and the file, a rest (wounds close), the talk (a line each, ${fi.talkLines}), the roster, sleep, Not now`) : no('fire ' + JSON.stringify(fi));
st.area === 'b7_c4_gate' && st.ph === 2 && st.fire && st.backGated && st.badge && st.rumour && st.stall.docks === 7 && st.stall.salve === 1 ? ok('the muster gate: no fire; counted and badged; the sutler\'s rumour of a factor\'s rolls burned (the other squad, one line); salve at 7 docks; dusk waits') : no('gate ' + JSON.stringify(st));
c.rise && !c.fileEdge && c.notNow && c.nearFile === 0 && c.bruised > 0 && c.fight && c.fight.started && c.fight.foes === 5 && c.fight.allies === 1 && c.fight.after === 'b7_c4_riot_after' && c.choices && c.let.flag === 'let' && c.let.rise === 1 && c.let.once === 1 && c.kept.flag === 'kept' && c.kept.rise === -1 && c.done === 1
  ? ok('the riot: a rise:true Guile check (its "yes, but" a bruise, not the file); talked down to five rioters with a Whitefinder beside; the levies let go (+1, once) or handed back (−1)') : no('riot ' + JSON.stringify(c));
s.notNow && s.met === 1 && s.lance && s.choices && s.wait && s.wait.flag === 2 && s.wait.roster && s.wait.camp && s.wait.npc && s.wait.teach === 'sorvan' && s.wait.joined && s.away && s.away.flag === 0 && !s.away.can && s.away.teach === 'tobet' && s.join && s.join.in && s.join.flag === 1 && s.join.fire && s.join.lines === s.join.here && s.join.teach === 'sorvan'
  ? ok('Sorvan: the cut-down lance; he waits at the horse lines (the roster can bring him) then joins, or goes, or joins at once with a line at the fire') : no('sorvan ' + JSON.stringify(s));
d.area === 'b7_c4_lines' && d.ph === 3 && d.dusk && d.rest3 && d.noVisit && d.horseArea === 'b7_c4_horse' && d.backGated ? ok('dusk: the Finadd on the provost\'s wagon; a rest at the fire; the horse lines (no way back until the grey coats are dealt with)') : no('dusk ' + JSON.stringify(d));
gr.rise && gr.nearFile === 1 && gr.filed >= 1 && gr.ok ? ok('the grooms: a rise:true check; its "yes, but" files a page (+1); made, the way between the horses') : no('grooms ' + JSON.stringify(gr));
t.teach === 'sorvan' && t.notNow && t.dc === 16 && t.who === 'sorvan' && t.ok === 1 && t.fx && t.offered && t.healed ? ok('the trick: Bluerose Horse-Sense, a ✦ wits 16 check with Sorvan; in a fight it heals the squad near the bearer') : no('trick ' + JSON.stringify(t));
p.who === 'sgt' && p.between && p.no && p.notNow && p.html && p.fight && p.fight.started && p.fight.foes === 5 && p.fight.stage2 && p.fight.inStage2 && p.fight.foes2 === 5 && p.fight.after === 'b7_c4_patriots_after' && p.kit && p.done === 1
  ? ok('the patriots: they come for the sergeant\'s name; the grooms\' way between the horses; both grounds forced; Bluerose scale out of the provost\'s wagon') : no('patriots ' + JSON.stringify(p));
k.area === 'b7_c4_lines' && k.visitNpc && k.invite && k.fireVisit && k.edur && k.leth && k.notYet && k.html && k.sorvan ? ok('the key: two visitors at the Sixth\'s fire (an Edur, a captain); the picket, Lether\'s, Not yet, with the Rising and the file shown') : no('key ' + JSON.stringify(k));
ed.key === 'edur' && ed.rise === -1 && ed.file === -1 && (ed.thegg === 1 || ed.thegg0 === 3) && ed.tobet === -1 && ed.sorvan === -1 && ed.area === 'b7_c4_dawn' && ed.ph === 4 && ed.dawn
  ? ok('key edur: the Rising −1, the file −1; Thegg +1, Tobet −1, Sorvan −1; a squad-wide gap in the Edur picket at dawn') : no('edur key ' + JSON.stringify(ed));
lt.key === 'letherii' && lt.rise === 1 && lt.file === 1 && lt.thegg === -1 && lt.tobet === 1 && lt.rose >= 1 && lt.dawn ? ok('key letherii: the Rising +1, the file +1; Tobet +1, Thegg −1; an officer touches his hat at dawn') : no('letherii key ' + JSON.stringify(lt));
e.onwardGated && e.lines === e.here && e.html && e.ennic === 1 && e.sorvanEnd && e.notYet && e.view === 'end' && e.ch === 'letherii' && e.lvl >= 10 && e.extras >= 5 && e.journal >= 5 && e.endText === 'Among their own'
  ? ok(`the end: dawn (the Finadd first), a line each at the fire; the chapter ends on letherii at level ${e.lvl} (${e.xp} xp), the Rising ${e.rise}, the file ${e.file}`) : no('end ' + JSON.stringify(e));
a.wanted && a.sp === 'The provost\'s wagon' && a.arrest === 1 && a.list === 'sgt' && !a.cell && a.choices.sorvan && a.choices.talk && a.choices.ennic && !a.choices.ilsa && a.no === 'b7_c4_arrest_no' && a.ennic.out === 'ennic' && a.ennic.signed === 1 && a.fight && a.fight.started && a.fight.after === 'b7_c4_patriots_after' && a.done === 1 && a.sorvanOut === 'sorvan' && a.talkOut === 'talk'
  ? ok('the arrest (file wanted): the sergeant in the provost\'s wagon, never a cell; out by the Finadd\'s signature (after a failed talk), by Sorvan, or by the talk; then the fight') : no('arrest ' + JSON.stringify(a));
y.thread === 'l' && y.renderErr && !y.renderErr.length && y.lines === y.here && y.reader === 'tilewoman' && y.teach === 'ruuk' && y.list === 'ilsa' && y.ilsa && y.ruuk && y.lines3 === y.here && y.full && y.full.flag === 2 && y.full.camp && !y.full.in && y.full.teach === 'sorvan' && y.full.npc && y.arrestIlsa && y.ilsaOut === 'ilsa'
  ? ok(`a synthetic save (Perrit and Tobet dead; Ruuk, Brune and Ilsa walking; Chapter 2 'name'): every node renders, a line each (${y.lines}), the tile-woman reads, Ruuk teaches, the list names Ilsa; with six walking Sorvan waits and teaches from the pickets; Ilsa reads the warrant`) : no('synthetic ' + JSON.stringify(y));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b7ch4: FAIL (${bad.length})` : 'b7ch4: all ok'); process.exit(bad.length ? 1 : 0);
