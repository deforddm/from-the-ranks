// v6.10.0: the K'ell Hunter is what the books say it is, and a rope man is recognised. The Hunter: two blade-arms a turn with reach,
// a parry, a hide that turns 5 off every ordinary blow (a critical goes through), half damage from a sharper, half again from a cusser.
// Vell in the squad: the rope-sergeant knows a rope man; +3 on the Wolves' Rope check; his hook in the open puts a rope on the Hunter
// instead of "too heavy"; the coil after goes to him. Usage: node tools/khell_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const r = await page.evaluate(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); const out = {}; try {
  const settle = async () => { for (let i = 0; i < 60 && !(B && B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100); };
  const txt = node => { const n = DLG[node](); return (typeof n.txt === 'function' ? n.txt() : n.txt) || ''; };
  const k = FOES.b3_khell, rp = FOES.b3_c4_roped;
  out.khell = {hp:k.hp, ac:k.ac, atk:k.atk, attacks:k.attacks, dr:k.dr, sk:(k.sk || []).join('/'), sharper:k.resist && k.resist.sharper, cusser:k.weak && k.weak.cusser};
  out.roped = {hp:rp.hp, dr:rp.dr, attacks:rp.attacks, sharper:rp.resist && rp.resist.sharper, cusser:rp.weak && rp.weak.cusser};
  const setup = withVell => { setBook('moi'); S = newStateMOI('Hask'); S.lvl = 11; S.xp = LEVELS[10]; S.chapter = 4; S.chapters = {1:'crate', 2:'herd', 3:'camps'}; S.f.b3_c1_key = 'crate'; S.f.b3_c2_key = 'herd'; S.f.b3_c3_key = 'camps'; S.ally = {trust:6, dread:3}; S.f.b3_domin = 1;
    S.squad = withVell ? ['sgt', 'brisk', 'kettle', 'tuft', 'ohl', 'vell'] : ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; migrate(S); S.inv = {sharper:2, burner:1, cusser:1, salve:2}; save(); };
  // without Vell: no rope-man lines, no edge
  setup(false); out.noVell = {ambrel:/rope man/.test(txt('b3_c4_ambrel')), find:/First rope's yours/.test(txt('b3_c4_hunt_find')), after:/Vell's hands/.test(txt('b3_c4_hunt_after'))};
  // with Vell: the sergeant sees the coil; +3 on the check; the first rope is his; the coil comes to him after
  setup(true); const ch = DLG.b3_c4_ambrel().ch[0]; const ve = (ch.edges('vell') || []).find(e => e && e[0] === 'a rope man since he could walk');
  out.vell = {ambrel:/And a rope man/.test(txt('b3_c4_ambrel')), edge:ve && ve[1], check:ch.check && ch.check.join(':'), trick:ch.trick, find:/First rope's yours, rope man/.test(txt('b3_c4_hunt_find')), ok:(() => { const r0 = S.lastRoll; S.lastRoll = {who:'vell'}; const t = /Guild rope. I knew it from the coil/.test(DLG.b3_c4_rope_ok().txt || '') && /Roofs don't swing back/.test(DLG.b3_c4_rope_miss().txt || ''); S.lastRoll = r0; return t; })(), after:/puts it in Vell's hands/.test(txt('b3_c4_hunt_after')), held:/You held your end/.test(txt('b3_c4_hunt_after'))};
  S.f.b3_c4_vellRope = 1; out.vellAfterRope = /put a line on it in the open/.test(txt('b3_c4_hunt_after')); delete S.f.b3_c4_vellRope;
  const loy0 = S.loy.vell || 0; DLG.b3_c4_hunt_after().fx(); out.loyUp = (S.loy.vell || 0) - loy0; out.coil = S.kit.includes('b3_c4_ropehooks');
  // the hunt: the Hunter's numbers in the fight, the hide on a blow, a sharper at half, a cusser at half again, Vell's rope
  setup(true); startBattle('b3_c4_hunt', {}); await settle(); B.busy = true; B.over = true;
  const kh = foes().find(f => f.kind === 'khell'), v = B.units.find(u => u.id === 'vell'), b = B.units.find(u => u.id === 'brisk');
  out.inFight = {attacks:kh.attacks, rng:kh.rng, parry:kh.parryLeft, dr:kh.dr, boss:!!kh.boss};
  // a plain blow of 10 lands for 5
  B.units.forEach(u => { u.x = 0; u.y = 0; }); b.x = 3; b.y = 3; kh.x = 4; kh.y = 3; kh.hp = kh.maxhp; b.atk = 60; let res; for (let i = 0; i < 40; i++) { B.log = []; res = attack(b, kh, {dmg:[1,1,9]}); if (res.hit && !B.log.some(l => /critical|Parried/.test(String(l)))) break; } out.blow = res.dmg;
  // a sharper's 10 does 5 to it and 10 to a squadmate beside it; a cusser's 10 does 15
  kh.parryLeft = 0; b.hp = b.maxhp = 60; const hp0 = kh.hp; B.blastKind = 'sharper'; blast({x:4, y:3}, [[1,1,9],[1,1,9]], '#fff'); out.sharper = {hunter:hp0 - kh.hp, brisk:Math.round(60 - b.hp)};
  const hp1 = kh.hp; b.hp = 60; B.blastKind = 'cusser'; blast({x:4, y:3}, [[1,1,9],[1,1,9]], '#fff'); out.cusser = {hunter:hp1 - kh.hp, brisk:Math.round(60 - b.hp)};
  // Vell's hook in the open: a rope on it, not "too heavy"
  kh.hp = kh.maxhp; v.x = 4; v.y = 6; v.atk = 60; v.cdHook = -1; let roped = false; for (let i = 0; i < 20 && !roped; i++) { v.cdHook = -1; B.log = []; await AB.grapple.run(v, kh.x, kh.y); roped = kh.b3RopeUntil >= B.round; if (B.log.some(l => /too heavy/.test(String(l)))) { out.tooHeavy = true; break; } }
  out.vellRope = {roped, ac:kh.b3RopeAc, hit:kh.b3RopeHit, flag:S.f.b3_c4_vellRope, moved:kh.x === 4 && kh.y === 3, line:B.log.some(l => /One more rope on it/.test(String(l)))};
  // in the gully (the second ground) his hook is a hook again: the roped one is too heavy to haul
  B.over = false; B.def = Object.assign({}, B.def, {isStage2:true}); kh.b3RopeUntil = -1; delete S.f.b3_c4_vellRope; let heavy = false; for (let i = 0; i < 20 && !heavy; i++) { kh.parryLeft = 0; B.log = []; v.cdHook = -1; await AB.grapple.run(v, kh.x, kh.y); heavy = B.log.some(l => /doesn't come/.test(String(l))); } out.gully = {heavy, flag:S.f.b3_c4_vellRope || 0, roped:kh.b3RopeUntil >= B.round};
  } catch (e) { out.err = e.stack.split('\n').slice(0, 3).join(' | '); } return out; });
console.log(JSON.stringify(r));
ok(!r.err, 'no error in the page script' + (r.err ? ': ' + r.err : ''));
ok(r.khell && r.khell.attacks === 2 && r.khell.dr === 5 && r.khell.sk === 'reach/parry' && r.khell.sharper === .5 && r.khell.cusser === 1.5 && r.khell.hp === 96, `the K'ell Hunter: two blade-arms, reach, a parry, hide 5, sharpers at half, cussers at half again (${JSON.stringify(r.khell)})`);
ok(r.roped && r.roped.dr === 5 && r.roped.hp === 60 && r.roped.attacks === 2 && r.roped.sharper === .5 && r.roped.cusser === 1.5, `the roped Hunter keeps its hide and its two arms (${JSON.stringify(r.roped)})`);
ok(r.noVell && !r.noVell.ambrel && !r.noVell.find && !r.noVell.after, 'without Vell: no rope-man lines, the coil goes to the hurt or to you');
ok(r.vell && r.vell.ambrel && r.vell.edge === 3 && r.vell.check === 'might:16' && r.vell.trick === 'b3_c4_wolfrope', `with Vell: the sergeant sees the coil; +3 on the Wolves' Rope check (${JSON.stringify(r.vell)})`);
ok(r.vell && r.vell.find && r.vell.ok && r.vell.after && r.vell.held && r.vellAfterRope, 'with Vell: the first rope is his, the sergeant\'s word on the throw, the coil comes to him, and his line in the open is remembered');
ok(r.loyUp === 1 && r.coil, `the coil is his, and Vell's loyalty goes up one (${r.loyUp})`);
ok(r.inFight && r.inFight.attacks === 2 && r.inFight.rng === 2 && r.inFight.parry === 1 && r.inFight.dr === 5 && r.inFight.boss, `in the fight: reach 2, a parry, hide 5 (${JSON.stringify(r.inFight)})`);
ok(r.blow === 5, `a plain blow of 10 lands for 5 through the hide (${r.blow})`);
ok(r.sharper && r.sharper.hunter === 5 && r.sharper.brisk === 10, `a sharper's 10 does 5 to the Hunter and 10 to the squadmate beside it (${JSON.stringify(r.sharper)})`);
ok(r.cusser && r.cusser.hunter === 15 && r.cusser.brisk === 10, `a cusser's 10 does 15 to the Hunter (${JSON.stringify(r.cusser)})`);
ok(r.vellRope && r.vellRope.roped && r.vellRope.ac === 4 && r.vellRope.hit === 4 && r.vellRope.flag === 1 && r.vellRope.moved && r.vellRope.line && !r.tooHeavy, `Vell's hook in the open: a rope on it, it stays where it stands (${JSON.stringify(r.vellRope)})`);
ok(r.gully && r.gully.heavy && r.gully.flag === 0 && !r.gully.roped, `in the gully his hook is a hook again: the roped one is too heavy to haul (${JSON.stringify(r.gully)})`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
