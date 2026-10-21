/* ============ Book Four, Chapter 4: Leoman's Raids ============ */
/* The first weeks of the march north of the Vathar (House of Chains, ch 18–19). The boy with the bone walks beside the wagons in the
   hottest sun (seen, far off). Leoman's oil raid: two hundred riders out of the dark with clay lamps of oil thrown like bolas, a dozen
   wagons burning, the column's horse drawn off into the night after them; the Third is in that camp, on the 9th's wagon line. Days later
   the Seti are ambushed (more than three hundred dead, many wounded left for the Malazans to carry: R19, the game's reading), and the
   Adjunct's word comes down through the officers once: "Wounded Malazans are better than dead ones." The Third among the Seti wounded:
   their cutters, a woman archer bow to bow with Tebbet, young lancers who blame the infantry. Then the barrow night: the marines go out
   to the hills with the barrows (heard of; never the squad), the 9th puts out pickets, too far apart. Key (S.f.b4_c4_key): 'seti' (stay
   with the wounded, the riders' bait; they come back for the camp in the small hours: a hold-out, then the rush) or 'picket' (the far
   end of the 9th's line on the barrow hills, nowhere near the Fist's ride; raiders who slipped past the trap come at it in fog). In the
   morning: a Fist thrown from his horse in the fog and pulled out by marines of the 8th (camp talk), Keneb acting Fist (camp talk), an
   empty helm off a barrow ("the marines' spare"). Notes for later chapters: docs/hoc-ch4-notes.md. */
/* FOR THE ARTIST (74b): names this file uses.
   Items: ART['item/b4_c4_lampball'], ['item/b4_c4_setibow'], ['item/b4_c4_helm'], ['item/b4_c4_salve'].
   Figures: b4_c4_rider (the Whirlwind's desert raiders, veiled; the lamp-throwers; their leaders: never Leoman), b4_c4_seti (Seti
   lancers, the jackal-tail lancers, the Seti cutter), b4_c4_setiarcher (the Seti women archers; the archer with the bound hand),
   b4_c4_grub (decor only, far off, in b4_c4_sun); and the variants drawn from those: b4_c4_lamper, b4_c4_slinger, b4_c4_raidlead,
   b4_c4_lancechief, b4_c4_seticutter (the old cutter), b4_c4_setiwounded (an archer with a bound hand). Reused: b4_c1_hollet, b4_c1_radde, b4_c1_recruit, b2soldier.
   Backdrops (SCENEX): b4_c4_sun (the column in the hottest sun, the boy far off by the wagons), b4_c4_fire (wagons burning at night,
   riders as shapes), b4_seti_fire (70's, redrawn), b4_c4_fog (barrows on hills in fog, a picket's lantern). Ground (TILEX): b4_c4_camp
   ('.' earth, ',' trampled grass, 'W' wagon, 'F' burning wagon, '=' tent, 'h' horse lines, 'f' a cook fire; in a fight '#' a wagon and
   't' crates or a tent), b4_c4_hills ('.' grass, '#' rock, 'B' barrow mound, ',' scrub, 'L' the picket's lantern; in a fight 't' a low
   mound or stones). */

/* ---- small helpers (b44: Book Four, Chapter Four) ---- */
const b44L = (id, n) => { if (b4In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b44Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b4In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* the recruit who walks with the squad (one at a time), and a line for them */
const b44Rec = () => b4In('orvas') ? 'orvas' : b4In('redblade') ? 'redblade' : b4In('warlock') ? 'warlock' : null;
const b44R = m => { const r = b44Rec(), v = r && m[r]; return v ? (typeof v === 'function' ? v() : v) : ''; };
/* Hackle is with the squad: at Sathi's knee, or at the sergeant's if the whistle brought him home in Book Two */
const b44Dog = () => b4In('sathi') || (!!b4Was('b2_hackleBack') && !(S.dead && S.dead.hackle));
const b44New = () => HOC_NEW.filter(id => b4In(id));
/* the phase: 1 the column by day, 2 the raid and the camp after it, 3 the Seti wounded, 4 the barrow night, 5 the morning */
const b44Ph = () => S.f.b4_c4_ph || 1;
const b44Key = () => S.f.b4_c4_key || '';
const b44KeyDone = () => !!(S.f.b4_c4_woundedDone || S.f.b4_c4_picketDone);
/* Orvas's regard, from the ford (Ch3 'carry' gave him +2): he speaks for the Third among horse people */
const b44Orv = () => b4In('orvas') && ((S.loy && S.loy.orvas) || 0) >= 2;
const b44Carries = (id, it) => Object.values((S.gear && S.gear[id]) || {}).includes(it);
/* the chapter's one quiet line for the Barrow dead (one of them), at the wounded camp */
const b44Barrow = () => { const f = b4Fallen(); if (!f.length) return ''; const id = f[0];
  return ({sathi:`Sathi would have been down the Seti horse lines before the first blanket was laid, arguing about their horses' feet in three languages, ${b44Dog() ? 'with Hackle at her knee stealing from their packs' : 'with Hackle stealing from their packs'}. She is on the Barrow now. ${b44Dog() ? 'Hackle came home.' : 'Hackle was not seen again.'}`,
    haddat:'Haddat would have gone down the blankets asking each of them a name, and said the names that night with the rest. She is on the Barrow now.',
    tangle:'Tangle would have counted the wounded twice and got a different number each time, and minded. He is on the Barrow now.',
    marrow:'Marrow would have had her sleeves rolled before the first blanket was laid. She is on the Barrow now, and the Seti\'s cutters work without her.'})[id] || `${TPL[id].name} would have known what to do here. ${TPL[id].name} is on the Barrow now.`; };
/* the far end of the line, the Fist's ride, the barrows: never the squad. One line used twice (the hills and the morning). */
const b44Far = () => 'far off along the hills, at the other end of the 9th\'s line, where the marines are';

/* ---- the Oil Bola: the trick of the raiders' lamps, learned from a dud picked out of the ashes. Not sorcery. ----
   The brief's 2×2 is tuned to the 3×3 the throw's aim marker shows (Claude's call, in the notes): the lamp bursts on the mark (1d6) and
   the oil burns round it for 2 rounds, 1d6 + the level step to anyone who starts a turn in it. */
Object.assign(TRICKS, {
  b4_c4_bola:{name:'The Oil Bola', ch:4, use:'fight', ab:'t_b4_c4_bola', where:'the burnt wagons of the 9th, from a dud lamp picked out of the ashes',
    lore:'Two clay lamps of oil on a cord, the wicks lit, swung and let go: the cord wraps whatever it hits and the lamps break on it. The riders threw them by the hundred on the night of the raid. One came down in the ashes unbroken, and the Third took it to pieces to see how.',
    get fx(){ return `Once a fight: the bearer throws a lit oil bola, range 4. It bursts on the mark (1d6), and the oil burns round it, a 3×3, for 2 rounds: 1d6 + ${lvT()} to anyone who starts a turn there, the squad included. Not sorcery.`; }},
});
/* oil on the ground: B.fires (31) with its own words; the level step is added when a turn starts in it (the next hurt after its log line) */
function b44Oil(pt, rounds){ for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (!wall(pt.x + dx, pt.y + dy)) B.fires.push({x:pt.x + dx, y:pt.y + dy, until:B.round + rounds, txt:'the lamp-oil', b4oil:true}); }
Object.assign(AB, {
  t_b4_c4_bola:{name:TRICKS.b4_c4_bola.name, trick:'b4_c4_bola', boom:true, aoe:1, range:4, desc:()=>TRICKS.b4_c4_bola.fx,
    run(u, x, y){ const pt = scatter(u, x, y, 1, 1); throwArc(u, pt, () => { b44Oil(pt, 2); blast(pt, [[1,6,0]], '#ff8a3a'); AUDIO.play('burner'); sparks(pt.x, pt.y, 26, '#ff9a3a', .7); });
      blog(`${u.name} swings the cord twice round ${u.id === 'sgt' ? 'their' : 'the'} head, the way the riders did, and lets go. Two lamps and a cord, turning over in the dark.`); }},
  /* the unbroken lamp (b4_c4_lampball): once a book, whoever carries it throws it; then it is gone */
  b4_c4_lampball:{name:'The unbroken lamp', boom:true, aoe:1, range:4, ok:()=>!S.f.b4_lampballThrown,
    desc:()=>`Once a book: throw the riders' unbroken oil bola, range 4. It bursts on the mark (1d6 + ${lvT()}), and the oil burns round it, a 3×3, for 3 rounds: 1d6 + ${lvT()} to anyone who starts a turn there, the squad included. Then it is gone.`,
    run(u, x, y){ S.f.b4_lampballThrown = 1; const pt = scatter(u, x, y, 1, 1);
      throwArc(u, pt, () => { b44Oil(pt, 3); blast(pt, [[1,6,lvT()]], '#ff7a2a'); AUDIO.play('burner'); sparks(pt.x, pt.y, 34, '#ff9a3a', .9); });
      S.kit = (S.kit || []).filter(k => k !== 'b4_c4_lampball'); Object.values(S.gear || {}).forEach(g => { Object.keys(g || {}).forEach(sl => { if (g[sl] === 'b4_c4_lampball') delete g[sl]; }); });
      blog(`${u.name} throws the unbroken lamp, the one out of the ashes. It goes over in the dark the way the riders' did, and breaks the way theirs did.`); }},
});
{ const _blog = blog;
  blog = function(m){ if (b4On() && B && typeof m === 'string') {
      if (/is caught in the lamp-oil\.$/.test(m)) B.b4oilNext = true;
      if (B.def && B.def.b4fog) m = m.replace(/^<em>Dust (\d)\. The Whirlwind's sand is in the air:/, '<em>Fog. The hills are full of it, white and wet:').replace(/The Whirlwind's sand is in the warren too\./, 'The fog is in the warren too.').replace(/full of sand/, 'full of fog').replace(/Grit in the warren/, 'Wet in the warren').replace(/in the dust like/, 'in the fog like').replace(/the dust swallows it/, 'the fog swallows it'); }
    return _blog(m); }; }
{ const _hurt = hurt;
  hurt = function(u, n, crit){ if (b4On() && B && B.b4oilNext) { B.b4oilNext = false; n += lvT(); } return _hurt(u, n, crit); }; }
/* the raiders' lamp-throwers: a lamp that lands on a squadmate sets them alight */
{ const _fr = foeRiders;
  foeRiders = function(a, t, dmg){ const r = _fr(a, t, dmg); if (b4On() && B && a && a.side === 'e' && a.id === 'b4_c4_lamper' && t && t.hp > 0 && t.side === 'p') { t.burnTurns = Math.max(t.burnTurns || 0, 1); float(t, 'the oil catches', '#ff9a3a'); blog(`The lamp breaks on ${t.name}, and the oil catches.`); } return r; }; }
/* the Seti horse-salve: whoever carries it, the first heal they take in a fight heals +2 */
{ const _heal = heal;
  heal = function(u, n){ if (b4On() && B && u && u.side === 'p' && !u.ally && n > 0 && u.id && b44Carries(u.id, 'b4_c4_salve')) { B.b4salve ??= {}; if (!B.b4salve[u.id]) { B.b4salve[u.id] = 1; n += 2; float(u, 'horse-salve', '#c8e0a0'); } } return _heal(u, n); }; }
/* the unbroken lamp is in the hand of whoever carries it */
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ const u = _mkParty(id, x, y); if (b4On() && b44Carries(id, 'b4_c4_lampball') && !S.f.b4_lampballThrown && !u.ab.includes('b4_c4_lampball')) u.ab.splice(Math.max(0, u.ab.length - 1), 0, 'b4_c4_lampball'); return u; }; }
/* the Seti archers who can still draw fight at the squad's level, as the 9th's regulars do */
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y);
  if (b4On() && k === 'b4_c4_setiwounded') { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); }
  return u; }; }
/* the wagons burn from the first round of the raid (not only after a sharper) */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt);
    if (b4On() && B && B.id === 'b4_c4_wagons' && !B.def.isStage2) { [[0,4],[3,4],[4,4],[2,0],[5,0]].forEach(([x, y]) => [[0,1],[1,1],[0,-1]].forEach(([dx, dy]) => { const X = x + dx, Y = y + dy; if (inB(X, Y) && !wall(X, Y) && !B.fires.some(f => f.x === X && f.y === Y)) B.fires.push({x:X, y:Y, until:99, txt:'a burning wagon\'s oil'}); }));
      blog(`<em>The wagons burn on both sides of you. The oil runs out of them along the ground.</em>`); }
    return r; }; }

/* ---- the words this chapter adds to Book Four's glossary ---- */
GLOSSX.hoc.push(
  [4, 'The Seti', 'A horse people of Quon Tali, from Por Seti, riding for the Empire in warrior societies named for animals: young lancers and women archers, scouts and skirmishers for the Fourteenth. Brave, and quick to ride after anything.', ()=>(S.chapter || 0) >= 4],
  [4, 'Acting Fist', 'A captain raised to command a legion in the field because its Fist cannot. After the barrow night the camp said the 8th had one: Keneb, the captain with the boy.', ()=>!!(S.f && S.f.b4_c4_ph >= 5)]);

/* ---- the reading at the wounded Seti's fire (the chapter's reading place) ---- */
B4DECK[4] = {scene:'b4_seti_fire', where:'a stained cloth by the wounded Seti\'s fire', set:'Night in the column\'s camp, the Seti wounded under their blankets, and the burnt wagons smoking still at the edge of it.',
  back:'b4_c4_setifire', backT:'Back to the fire.',
  say:{marrow:`"I've had my hands in Seti all day, child," Marrow says, and wipes them, slowly, on her coat. "They mend like Napans: badly, and complaining." She shakes the cloth out. "One card. For the ones under the blankets, and the ones who left them there."`,
    tallow:`"My grandmother read for the boats that came back short," Tallow says, very quietly, because there are wounded all round. "She said the cards were kinder to them." He shuffles, badly. "One card, Sergeant. For them."`,
    oldninth:`The old soldier has come down to the Seti fire with his cup and his deck, because he heard there was a Chain squad sitting with the wounded. "Horse people," he says, looking along the blankets. "Never wait." He shuffles one-handed. "One card. Then I'll sit with that one, there. He keeps asking for his mother."`}};

const B4CH4 = {
  title:'Leoman\'s Raids', number:'Four',
  intro:{loc:'North of the Vathar', sub:'The first weeks of the march · the Fourteenth\'s column', scene:'b4_c4_sun', cap:'A column a league long in its own dust under a white sun, wagons in a crawling line, and beside them, far off, a small boy walking.',
    paras:[
`North of the Vathar the hills give out and the land goes flat and pale and hot. The Fourteenth walks it in a column a league long, wagons and foot and horse, with three thousand Khundryl round it now like a second army, and every day the sun is a little higher and a little whiter, and every night the camp is a ring of wagons in a land with nothing else in it.`,
()=>`You are Sergeant {sgt}, Third squad, 9th Legion. The Third has walked this kind of country before, with water in its mouth and the dead behind it. This time there is water, mostly, and an army, and nobody behind but the Vathar. ${S.f.b4_carried === 1 ? 'The squad left a row of graves on its south bank. It does not talk about them, and walks a little straighter for them.' : S.f.b4_carried === 0 ? 'The ford runs clean behind it now. The squad does not talk about that either.' : 'The squad does not talk about the river.'}`,
`And out in the flat, out of sight, there are riders. Everybody knows it. The Whirlwind has horse out here, the camp says, and a war leader called Leoman of the Flails who is never where you look for him.`],
    go:'Into the line', node:'b4_c4_start'},

  areas:[
    /* 16 x 12 (b4_c4_camp, day).  . earth  , trampled grass  W a 9th's wagon  h the Seti's horse lines  < back down the column  > on, to the night's camp */
    { id:'b4_c4_column', title:'North of the Vathar · the noon halt', sub:'Midday · the column halted in the sun', hint:'Tap ground to move · tap a figure to talk · the column goes on east', decor:'b4_c4_camp',
      map:[ ",,,,,,,,,,,,,,,,",
            ",,W.....W.....W,",
            "................",
            "..,.....,.......",
            "<..............>",
            "................",
            "...W.......W....",
            "......,.........",
            "................",
            ".,....,....hhh..",
            "...........hhh.,",
            ",,,,,,,,,,,,,,,," ],
      walk:'.,', triggers:{W:'b4_c4_wagon', h:'b4_c4_setilines', '<':'b4_c4_back', '>':'b4_c4_to_camp'}, start:{x:2, y:8},
      quest:()=> !S.f.b4_c4_orders ? 'Sergeant Radde, by the wagons.' : 'East with the column, to the night\'s camp.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:6, y:5, node:()=>S.f.b4_c4_orders ? 'b4_c4_radde_again' : 'b4_c4_radde', fresh:()=>!S.f.b4_c4_orders},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:10, y:3, node:()=>'b4_c4_hollet', fresh:()=>!S.f.b4_c4_hollet},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:4, y:7, node:()=>S.f.b4_c4_recTold ? 'b4_c4_recruits_again' : 'b4_c4_recruits', fresh:()=>!S.f.b4_c4_recTold},
        {id:'recruit2', name:'A recruit', kind:'b4_c1_recruit', x:5, y:8, node:()=>S.f.b4_c4_recTold ? 'b4_c4_recruits_again' : 'b4_c4_recruits'},
        {id:'lancers', name:'Seti lancers', kind:'b4_c4_seti', x:12, y:8, node:()=>'b4_c4_lancers_pass', fresh:()=>!S.f.b4_c4_passed} ] },

    /* 16 x 12 (b4_c4_camp, night, after the raid).  . earth  , trampled grass  W a wagon  F a burning wagon  = tents  h the horse lines, empty  > on, the days after */
    { id:'b4_c4_camp', title:'The column\'s camp · after the raid', sub:'Night · the wagons still burning', hint:'Tap ground to move · tap a figure to talk · the burnt wagons are where the ashes are', decor:'b4_c4_camp', dark:true,
      map:[ "################",
            "#hhhh....=.=...#",
            "#.....W...W....#",
            "#..F.........=.#",
            "#.......,......#",
            "#.W....,...F...#",
            "#..............#",
            "#....=...W.....#",
            "#.F.......,....>",
            "#.....,........#",
            "#..=.....=...W.#",
            "################" ],
      walk:'.,', triggers:{F:'b4_c4_ashes', W:'b4_c4_camp_wagon', h:'b4_c4_camp_horses', '>':'b4_c4_to_seti'}, start:{x:7, y:6},
      quest:()=> !S.f.b4_c4_ashes ? 'The burnt wagons. Something in the ashes.' : 'On, when the column moves.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:8, y:6, node:()=>'b4_c4_camp_radde', fresh:()=>!S.f.b4_c4_campRadde},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:5, y:4, node:()=>'b4_c4_camp_hollet', fresh:()=>!S.f.b4_c4_campHollet},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:12, y:6, node:()=>'b4_c4_camp_recruits', fresh:()=>!S.f.b4_c4_campRec} ] },

    /* 16 x 12 (b4_c4_camp, night).  . earth  , trampled grass  = the wounded's awnings  f the Seti fire  h the Seti horse lines  W a burnt wagon  < back into the column */
    { id:'b4_c4_seti', title:'The column\'s camp · the Seti wounded', sub:'Night · the wounded under their awnings', hint:'Tap ground to move · tap a figure to talk · the Seti fire is in the middle', decor:'b4_c4_camp', dark:true,
      map:[ "################",
            "#hhh...hhh.....#",
            "#......,.......#",
            "#.=.=.....=.=..#",
            "#..............#",
            "#.=...f....=...#",
            "#........,.....#",
            "#.=.=.....=.=..#",
            "#..............#",
            "#W....,.....W..#",
            "<..............#",
            "################" ],
      walk:'.,', triggers:{f:'b4_c4_setifire', '=':'b4_c4_tents', h:'b4_c4_horses', W:'b4_c4_seti_wagon', '<':'b4_c4_seti_back'}, start:{x:7, y:8},
      quest:()=> !b44Key() ? (S.f.b4_c4_lancersDone ? 'Sergeant Radde, and the night\'s orders.' : 'The Seti fire, and the wounded round it.') : b44Key() === 'seti' ? (S.f.b4_c4_woundedDone ? 'The morning.' : 'The small hours. Watch the dark.') : 'The hills.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:9, y:6, node:()=>b44Key() ? 'b4_c4_radde_night' : 'b4_c4_key', fresh:()=>!b44Key() && !!S.f.b4_c4_lancersDone},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:3, y:8, node:()=>'b4_c4_hollet_seti', fresh:()=>!S.f.b4_c4_holletSeti},
        {id:'cutter', name:'A Seti cutter', kind:'b4_c4_seticutter', x:4, y:4, node:()=>'b4_c4_healer', fresh:()=>!S.f.b4_c4_salve},
        {id:'archer', name:'A Seti archer', kind:'b4_c4_setiwounded', x:12, y:4, node:()=>'b4_c4_archer', fresh:()=>!S.f.b4_c4_archer},
        {id:'lancers', name:'Young Seti lancers', kind:'b4_c4_seti', x:13, y:8, node:()=>'b4_c4_lancers', show:()=>!S.f.b4_c4_lancersDone, fresh:()=>!S.f.b4_c4_lancersDone},
        {id:'riders', name:'Riders in the dark', kind:'b4_c4_rider', x:14, y:2, node:()=>'b4_c4_vigil', show:()=>b44Key() === 'seti' && !S.f.b4_c4_woundedDone, fresh:()=>b44Key() === 'seti' && !S.f.b4_c4_woundedDone} ] },

    /* 16 x 12 (b4_c4_hills, night, fog: 'picket' only).  . grass  , scrub  # rock  B barrow mounds  L the picket's lantern */
    { id:'b4_c4_hills', title:'The barrow hills · the far end of the line', sub:'Night · fog', hint:'Tap ground to move · tap a figure to talk · the picket\'s lantern is in the middle of it', decor:'b4_c4_hills', dark:true,
      map:[ ",,,..#....,,,,..",
            ".B......,....B..",
            "...,..##.......,",
            "..............B.",
            ".,...B......,...",
            "........L.......",
            "..,.........#...",
            "...B....,.......",
            "#.......,....,..",
            "..,.....B.......",
            "................",
            ",,,,,,,,,,,,,,,," ],
      walk:'.,', triggers:{B:'b4_c4_barrow', L:'b4_c4_lantern'}, start:{x:6, y:10},
      quest:()=> S.f.b4_c4_picketDone ? 'The morning.' : S.f.b4_c4_lanternLit ? 'Something moving in the fog, north.' : 'The picket\'s lantern.',
      npcs:[
        {id:'regs', name:'Regulars of the picket', kind:'b2soldier', x:10, y:6, node:()=>'b4_c4_picket_regs', fresh:()=>!S.f.b4_c4_regs},
        {id:'shapes', name:'Shapes in the fog', kind:'b4_c4_rider', x:13, y:2, node:()=>'b4_c4_fogshapes', show:()=>!!S.f.b4_c4_lanternLit && !S.f.b4_c4_picketDone, fresh:()=>!!S.f.b4_c4_lanternLit && !S.f.b4_c4_picketDone} ] } ],

  battles:{
    /* the oil raid: the riders come out of the dark into the camp with their lamps; the Third and the Second Company hold the 9th's
       wagon line among the burning wagons until the riders have done what they came for. The second ground: the horse lines. */
    b4_c4_wagons:{title:'The wagon line', style:'b4_c4_camp', dark:true, open:true, warrenText:'Night in the column\'s camp · the warren answers, thin and hot', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      objective:{type:'survive', rounds:4, text:'Hold the 9th\'s wagon line among the burning wagons for four rounds, until the riders have done what they came for and go.'},
      map:["..#..#..","........",".t....t.","........","#..##..#","........","..t..t..","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c4_raidlead',3,1],['b4_c4_raider',0,1],['b4_c4_raider',5,1],['b4_c4_lamper',4,0],['b4_c4_raider',5,3]], xp:200, after:'b4_c4_wagons_after',
      waves:[{round:2, foes:[['b4_c4_lamper',7,1]], text:'Another rider comes in along the wagons at a gallop with a lamp swinging on its cord, lit, and lets it go over the squad\'s heads into the canvas behind.'},
        {round:3, foes:[['b4_c4_raider',0,3]], text:'One comes over a burning wagon\'s tongue on foot, his horse gone out from under him, still coming.'}],
      stage2:{title:'The horse lines', xp:100,
        text:()=>`And then they are going, all at once, the way they came: out between the wagons at a gallop, into the dark, whooping. And the horse goes after them.\n\nThe column's horse comes up out of its lines half-saddled and goes out of the camp after the riders in a long ragged stream, lances and lamps and shouting, into the flat, and is gone. The camp is left with its burning wagons and its foot. And at the horse lines behind the 9th, the riders who stayed behind to cut the ropes are still cutting.${b44Say({sathi:`\n\n"They wanted that," Sathi says, watching the horse go, with her teeth bared. "The whole thing. They wanted the horse to go after them."`, tebbet:`\n\n"They wanted the horse out," Tebbet says, very calm. "That was the point of all of it. Look."`, _:''})}${b44R({orvas:`\n\nOrvas watches the Malazan horse go into the dark and says something short in Khundryl that does not need putting into Malazan.`})}`,
        map:["hhhhhhhh","........","..t..t..","........","........",".t....t.","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c4_raidlead',3,2],['b4_c4_raider',1,3],['b4_c4_raider',6,3],['b4_c4_lamper',4,1]]} },
    /* the Seti horse society's grudge: young lancers who want to ride after the raiders and blame the infantry. Lance-butts and fists. */
    b4_c4_lancers_brawl:{title:'The Seti horse lines', style:'b4_c4_camp', dark:true, open:true, warrenText:'Night · nobody is using a warren for this', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Lance-butts and fists, nobody killed. Hold them off the Third, and off the wounded, for four rounds, until their own elders come down the lines.'},
      map:["........","..t..t..","........","...,....","........",".t....t.","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c4_lancechief',3,1],['b4_c4_lancer',1,2],['b4_c4_lancer',6,2],['b4_c4_lancer',4,3]], xp:140, after:'b4_c4_lancers_after',
      waves:[{round:2, foes:[['b4_c4_lancer',7,3]], text:'Another of the young lancers comes running down the horse lines with his lance reversed and his jackal-tail flying, late to it and furious about being late.'}]},
    /* 'seti': the small hours in the wounded camp; the riders come back for the wounded they left. Four rounds, and then the rush. */
    b4_c4_wounded:{title:'The wounded camp', style:'b4_c4_camp', dark:true, open:true, warrenText:'The small hours · the warren is full of the wounded, and thin', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold the wounded camp for four rounds: keep the riders off the awnings until they have shown you all they brought.'},
      map:["........","..#..#..","........",".t....t.","........","..t..t..","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      allies:[['b4_c4_setiwounded',1,7]],
      foes:[['b4_c4_raider',2,0],['b4_c4_raider',5,0],['b4_c4_lamper',3,1],['b4_c4_raider',6,2]], xp:160, after:'b4_c4_wounded_after',
      waves:[{round:2, foes:[['b4_c4_raider',0,2]], text:'One comes in from the dark on the left, low over his horse\'s neck, for the awnings, not for you.'},
        {round:3, foes:[['b4_c4_lamper',7,1]], text:'A lamp comes over out of the dark, lit, turning on its cord, and the man who threw it comes after it.'},
        {round:4, foes:[['b4_c4_raider',4,0]], text:'Another. And behind him, out in the flat, the sound of more, gathering.'}],
      stage2:{title:'The rush', xp:100,
        text:()=>`For a breath it is quiet. Then the rest of them come, all together, the way riders come when they have stopped testing: twenty of them at a gallop out of the dark across the flat at the awnings, lamps lit and swinging.\n\nAnd under the awnings, the Seti who can still stand get up. Women archers with their arms in slings, holding the bow in their teeth to string it; a boy lancer with one leg, on a crutch, with a knife. They come out and stand behind the Third.${b44Say({marrow:`\n\n"Back under," Marrow tells them, without turning round. "I've only just sewn you." They stay where they are.`, hessa:`\n\nHessa plants the spear and sets her shield. "A door," she says to the Seti behind her, in a temple voice. "Stand behind the door."`, _:''})}${b44R({orvas:`\n\nOrvas laughs out loud, once, at the riders coming. "Horse people," he says. "Always the gallop."`, redblade:`\n\nRamin draws and sets his feet. "They will not stop," he says. "Neither will we."`, warlock:`\n\n"*Here they come,*" the grandmother says, almost fondly. "*All of them, now.*"`})}`,
        map:["........","........","..t..t..","........","........","#.t..t.#","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        allies:[['b4_c4_setiwounded',1,8],['b4_c4_setiwounded',6,8]],
        foes:[['b4_c4_raidlead',3,1],['b4_c4_raider',1,2],['b4_c4_raider',6,2],['b4_c4_lamper',4,0],['b4_c4_raider',2,3]]} },
    /* 'picket': the far end of the 9th's picket line on the barrow hills, in fog. Raiders who slipped past the marines' trap come at it on
       foot. The second ground: the lee of a barrow, where the rest of them went to ground. */
    b4_c4_picket:{title:'The far end of the line', style:'b4_c4_hills', dark:true, open:true, dust:1, b4fog:true, warrenText:'Night on the barrow hills · fog, and the warren is wet with it', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:["...#....",".,....t.","........","..t..,..","........",".,....,.","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c4_raidlead',3,1],['b4_c4_raider',1,2],['b4_c4_raider',6,2],['b4_c4_slinger',4,0],['b4_c4_raider',5,3]], xp:160, after:'b4_c4_picket_after',
      waves:[{round:3, foes:[['b4_c4_raider',7,4]], text:'Another comes out of the fog at the side, where there was nothing, running bent over, as if he had not seen the picket at all until he was on it.'}],
      stage2:{title:'The barrow\'s lee', xp:100,
        text:()=>`They go back into the fog, the way they came, and the picket goes after them as far as the nearest barrow, a long low mound grey with the fog on its grass, and stops, because the rest of them are there.\n\nThey have gone to ground in the barrow's lee, a dozen of them: men in desert cloth with their faces wrapped, who came round the marines' trap in the dark and the fog and found the Malazan line too long to go round. They are not running any more. There is nowhere left in the fog to run to.${b44Say({tebbet:`\n\n"I can see four," Tebbet says. "There's more than four."`, darrut:`\n\n"Gate drill," Darrut says to the regulars, flatly. "They come at the shields, you're the gate. You don't open."`, _:''})}${b44R({orvas:`\n\nOrvas goes low, as if the horse were still under him. "In the fog," he says. "Good. They cannot see us either."`, redblade:`\n\nRamin's red scale is grey with the wet. "Foot soldiers," he says, with contempt and some sympathy. "In a fog."`, warlock:`\n\n"*Frightened,*" the grandmother says. "*They have been running from the noise all night. Careful. Frightened men bite.*"`})}`,
        map:["#..tt..#","........",".,....,.","..t..t..","........","........",".,....,.","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c4_raidlead',3,2],['b4_c4_raider',1,3],['b4_c4_raider',6,3],['b4_c4_slinger',4,1],['b4_c4_raider',2,4]]} } },

  foes:{
    /* the Whirlwind's riders: desert raiders of the war leader's band, veiled, light and quick (never Leoman, never Corabb) */
    b4_c4_raider:{name:'Desert raider', sig:'r', kind:'b4_c4_rider', hp:17, ac:12, atk:5, dmg:[1,8,1], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
    b4_c4_lamper:{name:'Raider with the lamps', sig:'l', kind:'b4_c4_lamper', hp:13, ac:11, atk:5, dmg:[1,6,1], rng:4, mv:4, init:2, verb:'swings a lit lamp at'},
    b4_c4_slinger:{name:'Raider with a sling', sig:'g', kind:'b4_c4_slinger', hp:13, ac:11, atk:5, dmg:[1,6,1], rng:5, mv:4, init:2, sk:['pin'], verb:'slings a stone at'},
    b4_c4_raidlead:{name:'The raiders\' leader', sig:'C', kind:'b4_c4_raidlead', hp:34, ac:13, atk:6, dmg:[1,10,2], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a tulwar down on'},
    /* the jackal-tail lancers: young Seti of one society, who want to ride after the raiders and blame the infantry */
    b4_c4_lancer:{name:'Young Seti lancer', sig:'s', kind:'b4_c4_seti', hp:16, ac:12, atk:5, dmg:[1,6,2], rng:1, mv:5, init:3, sk:['reach'], verb:'goes in with a lance-butt at'},
    b4_c4_lancechief:{name:'The loudest of the lancers', sig:'J', kind:'b4_c4_lancechief', hp:30, ac:13, atk:5, dmg:[1,8,1], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'swings a reversed lance at'},
    /* a Seti woman archer who can still draw (an ally in the wounded camp) */
    b4_c4_setiwounded:{name:'Seti archer, wounded', sig:'A', kind:'b4_c4_setiwounded', hp:12, ac:12, atk:5, dmg:[1,8,1], rng:5, mv:3, init:2, verb:'looses at'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b4_c4_lampball:{name:'An unbroken oil bola', slot:'trinket', who:null,
      line:'Two clay lamps of oil on a plaited cord, the wicks black, the seals unbroken: one of the riders\' bolas that came down in the ashes of the 9th\'s wagons and did not break. Whoever carries it can throw it, once in the whole road: it bursts and burns as the riders\' did. Then it is gone. Tangle would like it carried a long way from his satchel.'},
    b4_c4_setibow:{name:'A Seti horn bow', slot:'weapon', who:['tebbet', 'sathi', 'sgt'], atk:1, rng:1,
      line:'A short recurved bow of horn and sinew, lacquered dark, with a Seti woman\'s marks burnt into the grip. It was made to be shot from a horse, and it throws further than a bow that size should: +1 to hit, +1 range. She gave it to the Third because her hand will not hold it again.'},
    b4_c4_helm:{name:'An empty helm from the barrows', slot:'trinket', who:null, ac:1,
      line:'A Malazan helm, dented, with nobody in it, picked up off a barrow on the morning after the barrow night. The marines set them out on the mounds in the dark; this one rolled. The 9th calls it the marines\' spare. Worn on a thong at the belt, or on the head when it rains: +1 armour.'},
    b4_c4_salve:{name:'A pot of Seti horse-salve', slot:'trinket', who:null,
      line:'A small clay pot of grey grease that smells of tar and sheep and something green, the Seti\'s salve for horses, which their cutters use on people when the horses are done with it. Whoever carries it heals better the first time: the first heal they take in a fight heals +2.'} },

  scenes:{
    b4_c4_sun:{loc:'North of the Vathar', sub:'The column · the hottest sun of the year', cap:'A column a league long under a white sun, wagons crawling in their own dust, and beside them, far off, a small boy walking.', amb:'wind'},
    b4_c4_fire:{loc:'The column\'s camp', sub:'The raid · night', cap:'Wagons burning in a ring of wagons, riders going through the firelight as shapes, and lamps turning over in the dark on their cords.', amb:'battle'},
    b4_c4_fog:{loc:'The barrow hills', sub:'The far end of the picket line · night', cap:'Long low mounds on the hills, grey grass, fog to the knee and then to the waist, and one lantern.', amb:'explore'},
    b4_c4_morning:{loc:'The barrow hills', sub:'The morning after', cap:'Barrows on the hills in the thinning fog, empty helms on them, and the column forming up below to go on north.', amb:'explore'} },

  end:{
    seti:['The wounded camp', 'Leoman\'s riders burned a dozen wagons in the column\'s camp one night and drew the horse off after them, and the Third held the 9th\'s wagon line among the fires. Days later the Seti rode into a gorge after them and lost three hundred, and the wounded were left for the Fourteenth to carry. On the barrow night the marines went out to the hills, and the Third stayed with the Seti wounded. The riders came back for them in the small hours. The Third was there.'],
    picket:['The far end of the line', 'Leoman\'s riders burned a dozen wagons in the column\'s camp one night and drew the horse off after them, and the Third held the 9th\'s wagon line among the fires. Days later the Seti rode into a gorge after them and lost three hundred, and the wounded were left for the Fourteenth to carry. On the barrow night the marines went out to the hills, and the Third took the far end of the 9th\'s picket line, in the fog. What came round the marines\' trap came at it. It held.'] },
  endScene:'b4_c4_morning',
  endCap:()=> b44Key() === 'seti' ? 'The Seti wounded go into the wagons in the morning, as many as went under the awnings. The column goes on north, toward the Whirlwind.' : 'The fog lifts off the barrows in the morning, and the column goes on north, toward the Whirlwind. The Fist asked, in the morning, which squad held the far end.',
  tease:'Next: the Whirlwind Wall.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b4_c4_key === 'seti') x.push('On the barrow night the Third stayed with the Seti wounded. The riders came back for them in the small hours, and the Third and the Seti who could still stand held the camp. The Seti remember it.');
    if (f.b4_c4_key === 'picket') x.push('On the barrow night the Third held the far end of the 9th\'s picket line in the fog. What came round the marines\' trap came at it, and it held. The Fist heard which squad it was.');
    if (f.b4_c4_key === 'picket') x.push('The Seti wounded camp lost some of its wounded in the night, to riders nobody stopped in time.');
    if (f.b4_c4_muni === 'saved') x.push('On the night of the raid Tangle went into a burning wagon for the 9th\'s spare munitions, and came out with them.');
    if (f.b4_c4_muni === 'lost') x.push('On the night of the raid the 9th\'s spare munitions went up in a burning wagon. Everybody heard it.');
    if (f.b4_c4_lancersHow === 'talked') x.push('The young Seti lancers who blamed the infantry were talked down at their own horse lines.');
    else if (f.b4_c4_lancersDone) x.push('The young Seti lancers who blamed the infantry were met at their own horse lines, with fists. They are friendlier now.');
    if (f.b4_orvasDone === 1) x.push('Orvas walks with the Third. He spent the evenings at the Seti horse lines, telling the lancers what they were doing wrong.');
    else if (f.b4_orvasDone === 2) x.push('Orvas rides with the Khundryl, near. He will come if he is asked.');
    if (f.b4_raminDone === 1) x.push('Ramin walks with the squad, a Red Blade lent. He says the horse should never have gone after the lamps.');
    else if (f.b4_raminDone === 2) x.push('Ramin rides with the Red Blades, near.');
    if (f.b4_kethDone === 1) x.push('Keth walks with the squad. The Wickans guarded the wagons on the raid night and lost none.');
    else if (f.b4_kethDone === 2) x.push('Keth is with Temul\'s youths, who guard the wagons now.');
    if (f.b4_c4_setibow) x.push('A Seti archer who will not draw a bow again gave hers to the Third.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b4_c4_ph >= 5 && 'On the barrow night a Fist was thrown from his horse in the fog, the camp says, and pulled out by marines of the 8th. Keneb, the captain with the boy, is acting Fist.',
    f.b4_c4_woundedDone && 'On the barrow night the Third stayed with the Seti wounded. The riders came back for them in the small hours. The camp held.',
    f.b4_c4_picketDone && 'On the barrow night the Third held the far end of the 9th\'s picket line in the fog, a long way from the marines\' trap. Raiders who came round it came at the picket.',
    f.b4_c4_key && (f.b4_c4_key === 'seti' ? 'The Third chose the wounded camp over the picket line on the barrow night.' : 'The Third took the far end of the picket line on the barrow night.'),
    f.b4_c4_lancersDone && 'Young Seti lancers of one society wanted to ride after the raiders, and blamed the infantry for the gorge. The Third met them at their horse lines.',
    f.b4_c4_ambush && 'The Seti rode after the raiders into a gorge and lost more than three hundred. The wounded were left for the Fourteenth to carry. The Adjunct said wounded Malazans are better than dead ones, the officers say.',
    f.b4_c4_wagonsDone && 'Leoman\'s riders came into the camp one night with clay lamps of oil on cords, and burned a dozen wagons, and the column\'s horse went out after them into the dark. That was what they wanted.',
    'In the first week of the march north of the Vathar the boy with the bone would not ride in a wagon, and walked beside them in the hottest sun of the year.'].filter(Boolean); },

  dlg:{
    /* ---- the column by day: the hottest sun, and the boy ---- */
    b4_c4_start:()=>({sp:'The column', scene:'b4_c4_sun', fx:()=>{ S.f.b4_c4_ph = 1; }, txt:
`The column halts at noon because the Adjunct has decided that an army walked through the noon dies of it. The 9th sits down in its own dust beside its wagons. The sun stands straight overhead, white, and the shadows are a hand's width round everybody's feet. The heat comes up off the flat in sheets that make the far end of the column swim.

And beside the wagons, out in it, a small boy is walking.

He is far down the column, with the 8th's wagons, a small fair-haired boy in a shirt too big for him, walking beside a wagon wheel at the wagon's pace in the hottest sun of the year with his head down. A woman leans out from the wagon and says something to him, and holds out her arms. He does not take them. He walks.`,
      ch:[{t:'Watch him a while.', go:'b4_c4_sun'},
          {t:'Into the shade of the wagons.', go:()=>startExplore()}]}),
    b4_c4_sun:()=>({sp:'The column', scene:'b4_c4_sun', txt:
`The 9th has seen him too. The word goes down the wagons as every word does. *The boy with the bone. The one from the review in Aren. The captain of the 8th's boy.* He would not go in the wagon this morning, the 9th says, or yesterday. He walks. The captain has not made him stop.

${b44Say({marrow:`"Five, maybe," Marrow says, watching, with her hand up against the glare. "Six. He wants a hat." She does not get up. It is a long way, and he is not hers, and she has been not getting up for a year.`, haddat:`Haddat watches him a long time with the blue shield grounded beside her. "The Chain had children who walked like that," she says. "At the end." She stops, and does not finish it.`, _:'The squad watches him. Out in the heat the small figure goes on beside the wheel, and does not get any nearer.'})}${b4In('tallow') ? `\n\n"He's littler than my sister," Tallow says. "She'd have had a hat on him by now. And a slap." He keeps watching, as if he could put a hat on him from here.` : ''}${b44R({orvas:`\n\nOrvas shades his eyes. "Khundryl children walk beside the herd," he says, "when they are being punished." He watches. "And no one is punishing that one. That is worse."`, redblade:`\n\n"In Ehrlitan," Ramin says, "they would say a child who walks in the sun is a child the sun has chosen." He shrugs. "In Ehrlitan they say all kinds of things."`, warlock:`\n\nThe grandmother, out of Keth, says only: "*Hm.*" And then nothing at all, which is not like her.`})}`,
      ch:[{t:'Into the shade of the wagons.', go:()=>startExplore()}]}),

    /* ---- the Second Company at the noon halt: Radde, Hollet, the recruits, the Seti riding past ---- */
    b4_c4_radde:()=>({sp:'Sergeant Radde · Second Company', html:nerveHTML('The Second Company'), txt:
`Radde comes down the halted wagons with the book under his arm and a wet rag on his bald head, stopping at every squad. At the Third he stops longer, and sits on the wagon's shaft, and takes the rag off and looks at it, and puts it back.

"Raids," he says. "Every night this week, somewhere on the column. Riders out of the flat, a wagon or two burnt, a carter dead, gone before the horse is up." He writes. "Tonight the Adjunct wants the camp in a ring of wagons, foot inside it, horse inside that. The 9th's wagons are the east side of the ring. The Second Company's on the wagon line." He looks at the squad. "The Third's on the wagon line. I asked for you."

He lowers his voice. "The recruits are not steady, Sergeant. Smoke every night and a boy walking in the sun all day like an omen with legs. I've written down four who'll run at the first horse that comes over a wagon tongue at them." He shuts the book. "I'd like to rub them out."`,
      ch:[{t:'"We\'ll take the wagon line."', fx:()=>{ S.f.b4_c4_orders = 1; }, go:'b4_c4_radde_2'},
          {t:'"Who are they? The riders."', go:'b4_c4_radde_why'}]}),
    b4_c4_radde_why:()=>({sp:'Sergeant Radde', txt:
`"The Whirlwind's horse," Radde says. "A war leader of Sha'ik's, Leoman of the Flails, with a few hundred of the best riders in Seven Cities, the officers say. He doesn't fight. He burns a wagon and goes, and comes back somewhere else." He considers. "I fought a man like that in Falar. We never caught him either. He died of old age, I heard. Very pleased with himself."${b44Say({haddat:`\n\n"Leoman," Haddat says, behind you, in Hissari, as if the name were a stone she had turned over, and leaves it there.`, _:''})}`,
      ch:[{t:'"We\'ll take the wagon line."', fx:()=>{ S.f.b4_c4_orders = 1; }, go:'b4_c4_radde_2'}]}),
    b4_c4_radde_2:()=>({sp:'Sergeant Radde', txt:
`"Good." He writes the Third against something. "East side of the ring, by dusk."${b44Say({tangle:` He looks at Tangle's satchel. "And keep that away from the wagons, sapper. The wagons carry lamp-oil. They carry everything."`, darrut:` He looks at Darrut. "Aren Guard. You've stood a wagon gate. Show the regulars how."`, _:''})}${b44R({orvas:`\n\nHe looks at Orvas. "Khundryl. If it comes on horses, I'd like to know what kind, and how many."`, redblade:`\n\nHe looks at Ramin's red scale. "Red Blade. If the horse goes out tonight, you're not going with it. You're lent to me."`, warlock:`\n\nHe looks at Keth. "The Wickans have the wagons at the head of the column. If your youths need help, Wickan, I don't want to hear about it from them."`})}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c4_radde_again:()=>({sp:'Sergeant Radde', txt:
`Radde is on the shaft of a wagon with the rag on his head and the book on his knee, writing, slowly, in the heat. "East side of the ring, Sergeant," he says. "By dusk. The column moves in an hour." He keeps writing. "I'm not writing that down. That's just a reminder."`,
      ch:[{t:'East, with the column, to the night\'s camp.', onward:true, go:'b4_c4_to_camp'},
          {t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c4_hollet:()=>({sp:'Captain Hollet · Second Company', fx:()=>{ S.f.b4_c4_hollet = 1; }, txt:
`Captain Hollet is sitting in the strip of shade under a wagon bed with his tablet on his knee, counting jars. He has a hat on, a broad straw one that somebody has given him, and he looks surprised to have it.

"Lamp-oil," he says, when he sees the squad. "Eighty jars in the 9th's wagons. For the lamps. Every wagon on the column carries some. The riders burn the wagons, and the wagons are full of oil. I said so to the Fist." He looks at the tablet. "He said a wagon without oil is a wagon nobody can see to unload at night. He's right. I keep the numbers. Numbers aren't arguments."

He looks out past the wagon wheel at the heat, toward the 8th, where the small figure is still walking. "The 8th's captain lets the boy walk," he says. "In this." He is quiet. "I'd have put him in the wagon. I'd have tied him in." He seems to hear himself. "That's not my business, Sergeant."`,
      ch:[{t:'"No, sir."', go:()=>startExplore()},
          {t:'"Somebody should give the boy a hat, sir."', go:'b4_c4_hollet_hat'}]}),
    b4_c4_hollet_hat:()=>({sp:'Captain Hollet', txt:
`Hollet looks at you, and then at the straw hat on his own head, for some time. Then he takes it off and gives it to the nearest regular of the 9th and says, "Take that to the 8th, the captain's wagon. For the boy. From the 9th." The regular goes, in the sun, holding the hat in front of him.

"Don't tell the Fist," Hollet says. He puts his tablet on his head instead, which does not work.`,
      ch:[{t:'Back into the halt.', go:()=>startExplore()}]}),
    b4_c4_recruits:()=>({sp:'The Second Company\'s recruits', txt:
`The company's recruits are lying under the wagons in the strip of shade, as many as fit, and the ones who do not fit are lying in the sun with their cloaks over their faces. The freckled girl from Aren is under the nearest wagon, with her spear beside her and her water-skin empty.

"Sergeant," she says. "The boy. The one with the bone, in Aren." She is watching him through the spokes. "They say he hasn't ridden since the river. They say it means something." A recruit behind her says it means the army's going to walk till it dies, and another tells him to shut up, and a third says it means the boy's an idiot. ${S.f.b4_news ? 'Since the news from Genabackis the recruits read everything.' : 'The recruits read everything this week.'}

${b44New().includes('tallow') ? `Tallow is under the next wagon with three of them, and he looks as if he would like to know too.` : b44New().includes('darrut') ? `Darrut is sitting in the sun with his helm off, as if the sun were a thing that happened to other people.` : `They look at the squad the way you look at people who have walked in worse sun than this.`}`,
      ch:[{t:'"It means he can walk it. So can you. Fill your skins."', fx:()=>{ S.f.b4_c4_recTold = 'walk'; b4Nerve(1, 'If the boy can walk it, so can the 9th'); }, go:'b4_c4_recruits_said'},
          {t:'"It means he\'s five, and somebody should carry him. Leave the boy alone."', fx:()=>{ S.f.b4_c4_recTold = 'leave'; b44L('marrow', 1); b44L('haddat', 1); }, go:'b4_c4_recruits_said'}]}),
    b4_c4_recruits_said:()=>({sp:'The Second Company\'s recruits', txt: S.f.b4_c4_recTold === 'walk' ?
`The freckled girl thinks about it, and then crawls out from under the wagon into the sun and goes to the water wagon with her skin, and the boy behind her goes after her, and then the rest of them, one at a time, grumbling. By the time the column moves every skin in the Second Company is full, and some of the recruits are walking beside the wagons instead of on them, out of pride, which will last about an hour.${b44Say({tangle:`\n\nTangle watches them go. "That's how you do it," he says. "You give them something to do that isn't thinking." He counts the satchel by the weight. "It works on sappers too."`, _:''})}` :
`The freckled girl looks at you, and then out through the spokes at the small figure in the heat, and something in her face shuts, gently. "Yes, Sergeant," she says. She tells the recruit behind her to leave the boy alone. He does. The rest of them stop watching the boy and start watching the flat, which is worse, and also what they are for.${b44Say({marrow:`\n\nMarrow, beside you, nods once, as if a patient had finally taken the right medicine.`, _:''})}`,
      ch:[{t:'Back into the halt.', go:()=>startExplore()}]}),
    b4_c4_recruits_again:()=>({sp:'The Second Company\'s recruits', txt: b44Ph() >= 2 ?
`The recruits are on their feet now, checking their spears in the light of the burning wagons, and none of them is looking at the boy, because there is no boy to look at, only fire.` :
`The recruits are under the wagons, ${S.f.b4_c4_recTold === 'walk' ? 'with full water-skins, which is something.' : 'watching the flat.'}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_lancers_pass:()=>({sp:'Seti lancers', fx:()=>{ S.f.b4_c4_passed = 1; }, txt:
`A troop of Seti lancers comes up the outside of the column at a canter in the full heat, forty of them, young, bare-armed, with lances held high and dyed horse-tails and the tails of other animals under the blades, and their women archers riding beside them with short horn bows across their thighs. They ride well, and they know it. They are the Fourteenth's horse from Quon Tali, the Seti, and they have been up and down the column all week looking for riders to chase.

Going past the 9th's wagons they slow, and the young men in front look down at the infantry sitting in the dust, and one of them, with a jackal's tail on his lance, calls something in Seti that the others laugh at, and then in Malazan, so the 9th can hear: "Sit, foot. We'll catch them for you." They go on up the column, laughing, raising dust over everybody.`,
      ch:[{t:'Let them go.', go:'b4_c4_lancers_pass2'},
          {t:'Call after them. ("Catch them first.")', check:['guile', 13],
            edges:id=>[id === 'orvas' && ['a Khundryl knows what to shout at horse boys', 2], id === 'sathi' && ['she has shouted at riders all her life', 2], id === 'darrut' && ['the Guard shouted at the cavalry for a living', 1], id === 'tallow' && ['his voice cracks when he shouts', -1]],
            near:{t:()=>`Yes, but the jackal-tail lancer hears exactly who said it, and wheels his horse to look, and remembers the face. Rattled: −1 on the next check, for ${NAME(ROLL().who || 'sgt')}.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; S.f.b4_c4_called = 1; }},
            go:'b4_c4_lancers_called', fail:'b4_c4_lancers_pass2'}]}),
    b4_c4_lancers_called:()=>({sp:'Seti lancers', fx:()=>{ S.f.b4_c4_called = 1; }, txt:
`${by({orvas:`Orvas stands up in the dust and calls after them in the trade-speech of the Odhan, something short about horses and their riders' mothers. Two of the women archers laugh out loud. The jackal-tail lancer does not.`, sathi:`Sathi stands up and calls after them in a Malazan with a great deal of Wickan in it, about what Wickan children do with horses that young Seti do not. The women archers laugh. The jackal-tail lancer does not.`, _:`{who} calls after them: "Catch them first." The 9th along the wagons laughs, because it has been eating the Seti's dust all week. The women archers laugh too. The jackal-tail lancer does not.`})}

The 9th sits up a little straighter in the dust for a while after.`,
      ch:[{t:'Back into the halt.', go:()=>startExplore()}]}),
    b4_c4_lancers_pass2:()=>({sp:'Seti lancers', txt:
`The dust they raised settles on the 9th. ${b44Say({tebbet:`Tebbet watches the women archers go with an expert's eye. "Horn bows," he says. "Shot from the saddle. I'd like to see that close." He thinks. "From behind something."`, sathi:`Sathi watches them go with her teeth bared. "They ride like children," she says. "Brave children. They will get themselves killed."`, _:`The squad watches them go up the column, and wipes its face.`})}${b44R({orvas:`\n\nOrvas watches them go with a horseman's narrow eyes. "They will ride after anything that runs," he says. "Whoever is out there will know that about them."`})}`,
      ch:[{t:'Back into the halt.', go:()=>startExplore()}]}),
    b4_c4_wagon:()=>({sp:'A 9th\'s wagon', txt:
`A 9th's wagon under a hooped canvas gone grey with dust, the axle-grease running in the heat. Under the canvas, sacks of meal, coils of rope, and jars: forty of them, lashed in straw, sealed with wax, smelling faintly of olives. Lamp-oil. On the tailboard somebody has chalked a count of the column's wagons burnt this week. It is a longer count than at the Vathar.

${b44Say({tangle:`Tangle puts his hand flat on the side of the wagon and takes it away again. "Oil and canvas," he says. "Dry as a bone. If I wanted to burn a column, Sergeant, I'd burn it here." He looks out at the flat. "So would anybody."`, darrut:`Darrut taps a jar with a knuckle. "In the Guard we kept the oil in its own cart," he says. "At the back. With a man on it who didn't smoke." He considers. "We didn't. But we said we did."`, _:`The jars sweat in the heat. The squad moves its kit to the other side of the wagon without anybody saying why.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_setilines:()=>({sp:'The Seti horse lines', txt:
`The Seti's spare horses stand on a rope between stakes in the full sun with their heads down, small, quick, wiry horses of Quon Tali with their manes cut short and their hides scarred with the marks of the societies that own them. A Seti boy walks the line with a bucket. The horses are too hot to bother with him.

${b44Say({sathi:`Sathi goes down the line and looks at their feet, one horse after another, lifting a hoof, putting it down, shaking her head. "They're riding them into the ground," she says. "Every day, up and down, after nothing." She puts her forehead against a grey's neck for a breath. "Poor things."`, orvas:`Orvas walks the line with his hand on every neck, and stops, and frowns. "Too much galloping," he says. "Always the gallop. The Seti think a horse is a lance with legs."`, _:`The horses watch the squad with their heads down. It is too hot for anything else.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_back:()=>({sp:'The column', txt:
`West, the column goes on back along the flat, wagon after wagon in the heat, as far as the dust goes. The Third's place is here.`,
      ch:[{t:'Not that way.'}]}),
    b4_c4_to_camp:()=> !S.f.b4_c4_orders ? ({sp:'The head of the halt', txt:
`East, the column will go on in an hour, to wherever the night's camp is. Radde will want the Third's orders given before it does.`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The column', txt:
`The column moves in the afternoon, and walks until the light goes red, and makes camp in a ring of wagons on the flat, the way the Adjunct wants it: wagons tongue to tail, foot inside, horse inside the foot. The 9th's wagons are the east side of the ring. The Second Company sits down behind them with its back to the canvas and its spears across its knees, and the Third sits down with it.`,
      ch:[{t:'Make camp on the wagon line.', onward:true, go:'b4_c4_dusk'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the raid ---- */
    b4_c4_dusk:()=>({sp:'The wagon line', scene:'b4_march_dusk', fx:()=>{ S.f.b4_c4_ph = 2; }, txt:
`Dusk goes quickly out here. The sun drops off the end of the flat and the dark comes up out of the ground, and the fires go up inside the ring, and the lamps are lit on the wagons, one by one, with oil out of the jars. The horse lines are behind the 9th, a long rope of horses stamping. Past the wagons the flat is black, and goes on.

${b44Say({tebbet:`Tebbet sits on the tongue of a wagon with his bow across his knees, looking out at the dark. "If I were them," he says, "I'd come in now, while everybody's eating."`, darrut:`Darrut walks the wagon line with the regulars, showing them where to stand: one in each gap, shield to the wheel. "If something comes through," he says, "you're the gate. A gate doesn't think."`, _:`The squad eats behind the wagons with its spears beside it, and watches the dark past the wheels.`})}${b4In('tallow') ? `\n\nTallow is not eating. He is holding his bread and looking at the lamps along the wagons, all of them lit, every one of them full of oil.` : ''}${b44R({orvas:`\n\nOrvas is lying with his ear to the ground under a wagon. "Horses," he says, quietly. "Scores. Not ours." He gets up. "Not far."`, redblade:`\n\nRamin has his helm on, which he does not usually do to eat. "The Red Blades' scouts lost them at noon," he says. "Riders, north. Two hundred, maybe." He eats, carefully, in the helm.`, warlock:`\n\nKeth's head comes up. "*Coming,*" the grandmother says, out of him. "*Coming now.*"`})}`,
      ch:[{t:'On your feet.', onward:true, go:'b4_c4_raid'}]}),
    b4_c4_raid:()=>({sp:'The wagon line', scene:'b4_c4_fire', fx:()=>{ if (!S.f.b4_c4_raidSeen) { S.f.b4_c4_raidSeen = 1; S.f.b4_leoman = 1; b4Nerve(-1, 'Wagons burning in the ring'); } }, txt:
`They come out of the dark from everywhere at once, the way water comes.

Riders, at a gallop, along the outside of the ring, two hundred or more, low on their horses in desert cloth with their faces wrapped. In their hands are lamps: clay lamps of oil, two to a cord, the wicks lit, swinging round their heads, and they let them go. They come over the wagons in the dark like burning birds, turning over and over, and the cord wraps the canvas, and the lamps break, and the oil goes up.

In a breath there are a dozen wagons burning round the ring. The canvas goes up in sheets. The jars of oil under it go up after the canvas. And through the gaps between the burning wagons, where the fire has driven the foot back, the riders come in.

${b44Say({tangle:`"The 9th's munitions wagon," Tangle says, very fast, at your shoulder. "The company's spare sharpers. Third wagon down, Sergeant. Next to that one." The wagon next to it is burning end to end.`, _:`Three wagons down, beside a wagon burning end to end, is the one the company keeps its spare munitions in. Everybody in the Second Company knows which wagon it is. Everybody is looking at it.`})}`,
      ch:[{t:'"Shields. Hold the wagon line."', go:()=>startBattle('b4_c4_wagons', {})},
          {t:'Get the munitions out of that wagon before it goes. (the fire is in the next wagon)', check:['might', 15], req:()=>!S.f.b4_c4_muni,
            edges:id=>[id === 'tangle' && ['a sapper knows how long a crate has in a fire', 2], (id === 'hessa' || id === 'darrut') && ['shield-line shoulders', 1], id === 'marrow' && ['she is old for running into fires, and knows it', -2], id === 'tallow' && ['he is too frightened to be careful, and too careful to be quick', -1]],
            clean:{t:'In, and out, and the crates down behind the water wagon, before the canvas over them has properly caught.'},
            near:{t:()=>`Yes, but the canvas comes down burning on ${NAME(ROLL().who || 'sgt')}'s back on the way out. ${3 + lvT()} health down at the start of the fight.`, fx:()=>bruise(ROLL().who || 'sgt', 3 + lvT())},
            go:'b4_c4_muni_ok', fail:'b4_c4_muni_fail'},
          {t:'Tangle puts a sharper in among them, in the gap.', tag:'uses 1 sharper', req:()=>b4In('tangle') && (S.inv.sharper || 0) > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b4_c4_wagons', {pre:'Tangle\'s sharper goes off in the gap between two burning wagons, and the riders coming through it stop coming through it.'})}]}),
    b4_c4_muni_ok:()=>({sp:'The wagon line', scene:'b4_c4_fire', fx:()=>{ S.f.b4_c4_muni = 'saved'; S.inv.sharper = (S.inv.sharper || 0) + 1; S.inv.burner = (S.inv.burner || 0) + 1; note('The company\'s spare: a sharper and a burner go into the satchel.', 'good'); b44L('tangle', 1); }, txt:
`${by({tangle:`Tangle goes in under the smoking canvas before you have finished saying yes, and comes out with a crate in his arms and his eyebrows gone, and goes back for the other one, and comes out again, and sits down very suddenly behind the water wagon with both crates in his lap, laughing in a high voice that does not sound like him.`, _:`{who} goes in under the smoking canvas and comes out with a crate, and goes back for the other, and comes out again with the canvas catching overhead, and puts both crates down behind the water wagon, and sits down beside them, very suddenly.`})} The wagon they came out of goes up a breath later, canvas and all, but there is nothing in it now that wants to go off.

The Second Company saw it. ${b4In('tangle') ? '"A sharper and a burner for the satchel," Tangle says, when he can talk. "Company\'s spare. The rest\'s the company\'s." He puts his hand on the crate like a man with a dog.' : 'A sharper and a burner from the crates go into the squad\'s satchel. The rest is the company\'s.'} And through the gaps, the riders come in.`,
      ch:[{t:'"Shields. Hold the wagon line."', go:()=>startBattle('b4_c4_wagons', {})}]}),
    b4_c4_muni_fail:()=>({sp:'The wagon line', scene:'b4_c4_fire', fx:()=>{ S.f.b4_c4_muni = 'lost'; }, txt:
`${by({sgt:'You get', _:'{who} gets'})} as far as the tailboard. Then the canvas of the burning wagon next to it comes down across the gap in one sheet, and the heat is a wall, and somebody of the Second Company has ${by({sgt:'you', _:'{who}'})} by the belt and is hauling backward, and ${by({sgt:'you go', _:'{who} goes'})}, and the munitions wagon catches.

It goes up a few breaths later: a flat hard crack, and a second one, and a third, and burning canvas going up into the dark in pieces and coming down all over the ring. Every horse in the camp screams. Every recruit in the Second Company throws himself flat. When they get up, the riders are through the gap.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c4_wagons', {surprise:'e'})}]}),
    b4_c4_wagons_after:()=>({sp:'The wagon line', scene:'b4_c4_fire', fx:()=>{ S.f.b4_c4_wagonsDone = 1; if (!S.f.b4_c4_muni) S.f.b4_c4_muni = 'left'; }, txt:
`It ends the way it began, all at once. The riders who are still on their horses are gone into the dark, whooping, and the ones who are not are lying among the burning wagons or running after their horses on foot. And the column's horse, which went out after the first of them, is gone into the dark too, out of sight now, chasing lamps.

The Second Company is still on the wagon line. Some of it is sitting down. A regular is holding his arm against his chest and swearing, alive. The freckled girl is standing in a gap between two burning wagons with her spear still levelled at the dark, and somebody has to go and tell her it is over.${S.f.b4_c4_muni === 'left' ? `\n\nThe company's munitions wagon is a black frame on its wheels. It went up in the middle of it, and nobody saw it go, because everybody was busy.` : ''}

${b44Say({haddat:`Haddat stands among the burning wagons with the blue shield black with smoke, and counts the dark with her eyes. "They did not come for us," she says. "They came for the horse. And the horse went."`, marrow:`Marrow is already kneeling by the regular with the arm, sleeves rolled. "Hold still, child," she says. "It's only broken. Broken is good. Broken I can do."`, _:`The squad stands among the burning wagons, getting its breath, and counts itself.`})}${b44R({orvas:`\n\n"They wanted the horse to go," Orvas says. "And it went. Like a dog after a thrown stick." He spits. "Khundryl would not have gone."`, redblade:`\n\n"The horse went out after lamps," Ramin says, with contempt, wiping his sword. "Lamps. In the dark. My captain will have something to say."`, warlock:`\n\n"*Clever,*" the grandmother says, out of Keth, grudging. "*Very clever. I would have done the same.*"`})}`,
      ch:[{t:'Into the camp. See what\'s left.', onward:true, go:()=>{ startExplore('b4_c4_camp'); }}]}),

    /* ---- the camp after the raid: the ashes, the empty horse lines, the count ---- */
    b4_c4_camp_radde:()=>({sp:'Sergeant Radde', fx:()=>{ S.f.b4_c4_campRadde = 1; }, txt:
`Radde is standing in the middle of the ring with the book open and nothing written in it, looking at the empty horse lines. "Gone," he says. "Out after the riders, half the column's horse, before anybody gave an order." He shuts the book. "They'll be back by morning, half of them, on blown horses. And the riders will be somewhere else, laughing."

He looks at the Third. "The company held. I saw." He opens the book, and writes, and draws a line through something. "Four rubbed out." He looks at the burning wagons. "A dozen wagons. The captain will want the count."${b44Say({darrut:`\n\n"In the Guard," Darrut says, "we'd have kept the horse in." Radde looks at him. "We'd have tried," Darrut says.`, _:''})}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c4_camp_hollet:()=>({sp:'Captain Hollet', fx:()=>{ S.f.b4_c4_campHollet = 1; }, txt:
`Hollet is walking along the burnt wagons with his tablet, counting, his face black with smoke and his cough worse. "Twelve on the ring," he says. "Twelve that I can see. Thirteen if the 8th's last one goes." He writes. "Eighty jars of lamp-oil in the 9th's alone. I said so." He coughs, and coughs. "I did say so."

He looks at the empty horse lines, and at the dark beyond them, where the horse went. "Everyone will say it was the cavalry's fault," he says. "And the cavalry will say it was the foot's." He puts the tablet under his arm. "It was the oil. I'm going to write that down, and nobody is going to read it."`,
      ch:[{t:'"I\'ll read it, sir."', fx:()=>{ S.f.b4_c4_holletRead = 1; }, go:()=>startExplore()},
          {t:'Leave him to the count.', go:()=>startExplore()}]}),
    b4_c4_camp_recruits:()=>({sp:'The Second Company\'s recruits', html:nerveHTML('The Second Company'), fx:()=>{ S.f.b4_c4_campRec = 1; }, txt:
`The company's recruits are sitting in a ring of their own inside the ring, close together, with their spears upright between their knees like a palisade. One of them has found a skin of the Khundryl's milk-spirit. It is going round. The freckled girl has her hands round it and is not drinking.

"They were laughing," she says, to the Third, not to anybody in particular. "On the horses. Going past. They were laughing." She looks at the burnt wagons. "Is that what it's like? The whole way? Burning, and laughing, and gone?"

The ones round her are listening, very hard.`,
      ch:[{t:'"They burned wagons. You held the line. That\'s what it\'s like."', fx:()=>{ S.f.b4_c4_campTold = 'held'; }, go:'b4_c4_camp_recruits_2'},
          {t:'"Yes. Until they stop laughing. Drink, then sleep."', fx:()=>{ S.f.b4_c4_campTold = 'true'; b44L('haddat', 1); }, go:'b4_c4_camp_recruits_2'}]}),
    b4_c4_camp_recruits_2:()=>({sp:'The Second Company\'s recruits', txt: S.f.b4_c4_campTold === 'held' ?
`"We held," the freckled girl says, trying the word, and the boy beside her says it too, and then somebody laughs, not at anything, and the milk-spirit goes round again, faster. It is not much. It is a ring of recruits who held a wagon line on their first night of fire, saying so to each other.${b44Say({sathi:`\n\nSathi crouches down at the edge of their ring and takes the skin out of the freckled girl's hands and drinks and gives it back. "You held," she says. "I saw you. Stupid, standing in the gap like that." She grins, every filed tooth. "Good."`, _:''})}` :
`The freckled girl nods slowly, and drinks, at last, and passes it on. "Until they stop laughing," she says. She lies down where she is with her spear across her and her eyes open, and after a while they close.${b44Say({haddat:`\n\n"That one will make a soldier," Haddat says, very quietly, "if she lives." She has said it before. She sounds surer each time.`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_ashes:()=>({sp:'The burnt wagons', fx:()=>{ S.f.b4_c4_ashes = 1; }, again:()=> S.f.b4_c4_lamp ? 'The burnt wagons, black on their wheels, and the dud lamp in the ash.' : 'The burnt wagons, and the two lamps in the ash: one broken, one whole.', txt:
`The burnt wagons stand on their wheels in the ring, black frames with the canvas gone and the hoops still up, like the ribs of something, and the ground round them is a crust of ash and broken clay and the reek of lamp-oil. The fire has gone down to a red glow in the beds. The 9th is throwing sand on what is left.

In the ash at the foot of one wheel, something whole. ${S.f.b4_c4_lamp ? 'Where the unbroken lamp was, there is only its print in the ash now.' : 'Two clay lamps, the size of a fist each, tied to the ends of a plaited cord as long as an arm. One is cracked across and empty. The other is whole, wax still on its mouth, its wick burnt down to the seal and gone out. It came over the wagons with the rest and landed in the ash and did not break.'} And beside it, broken open by a wheel, another one: a dud, cracked, spilt, the cord still on it, showing how it was all put together.${b44Say({tangle:`\n\nTangle crouches over the broken one without touching it. "Oh," he says, softly. "Oh, look at that. That's clever. That's very clever." He sounds as if he has met somebody he would like to buy a drink and then kill.`, _:''})}`,
      ch:[{t:'Take the dud to pieces, and see how they do it. (the Oil Bola)', check:['wits', 16], trick:'b4_c4_bola', req:()=>!S.f.b4_c4_bolaTried, fx:()=>{ S.f.b4_c4_bolaTried = 1; },
            edges:id=>[id === 'tangle' && ['a sapper\'s hands; he has taken worse apart', 3], id === 'sathi' && ['the Wickans throw bolas at horses', 1], id === 'orvas' && ['the Khundryl throw bolas at horses', 1], id === 'darrut' && ['he has seen fire-pots on the Aren wall', 1], id === 'haddat' && ['she wants nothing to do with it', -1], id === 'marrow' && ['she would rather mend what it does', -1]],
            near:{t:()=>`Yes, but the oil in the dud gets into ${NAME(ROLL().who || 'sgt')}'s hands and stays there, and stinks, and stings, and nobody will sit next to them at the fire. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c4_ashes_ok', fail:'b4_c4_ashes_no'},
          {t:'Pick up the unbroken one. Carefully.', req:()=>!S.f.b4_c4_lamp, fx:()=>{ S.f.b4_c4_lamp = 1; gain('b4_c4_lampball'); }, go:'b4_c4_ashes_lamp'},
          {t:'Leave the ashes.', go:()=>startExplore()}]}),
    b4_c4_ashes_lamp:()=>({sp:'The burnt wagons', again:'The unbroken lamp is in the kit, wrapped in a cloak, a long way from the satchel.', txt:
`It comes up out of the ash heavier than it looks, the two lamps knocking softly together on their cord, the oil moving in the whole one. ${b44Say({tangle:`"Not in my satchel," Tangle says at once. "Not near my satchel. Not near anything I love." He watches it go into the kit with an expression of deep personal betrayal.`, _:'It goes into the kit, wrapped in a cloak, a long way from the satchel.'})}

Once, on the whole road, somebody could throw it the way they threw theirs.`,
      ch:[{t:'Back to the ashes.', go:'b4_c4_ashes'}, {t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_ashes_ok:()=>({sp:'The burnt wagons', txt:
`${by({tangle:`Tangle takes it apart on a cloth by the last of the fire, the way he takes everything apart: slowly, saying each piece's name under his breath. The clay is thin, fired soft so it will break. The seal is wax and a twist of cloth. The wick goes down through the wax into the oil. The cord is horsehair, plaited, soaked in something so it will not burn through too soon. "You light both," he says. "You swing it. You let go when the weight's right. And it goes over, and wraps, and breaks." He sits back. "Simple. Cheap. Two hundred of them, in the dark." He looks at the burnt wagons. "I hate it," he says, with deep respect.`, _:`{who} takes it apart on a cloth by the last of the fire: the clay thin, fired soft so it will break; the seal wax and a twist of cloth; the wick down through the wax; the cord of horsehair, plaited and soaked so it will not burn through too soon. You light both. You swing it. You let go when the weight is right. It goes over, and wraps, and breaks.`})}

It is not sorcery. It is a lamp and a piece of string and somebody who has thought about it. By the time the fire is out, the Third could make one.`,
      ch:[{t:'Back to the ashes.', go:'b4_c4_ashes'}]}),
    b4_c4_ashes_no:()=>({sp:'The burnt wagons', txt:
`The dud comes apart wrong: the clay crumbles, the cord falls to pieces in the hand, the oil gets everywhere, and in the end there is a mess on a cloth that could have been put together any of six ways. ${by({sgt:'You give', _:'{who} gives'})} it up when the last of the fire goes out and there is nothing to see it by. Whoever made it knew something the Third does not.`,
      ch:[{t:'Back to the ashes.', go:'b4_c4_ashes'}]}),
    b4_c4_camp_wagon:()=>({sp:'A wagon on the ring', txt:
`A 9th's wagon that did not burn, with its canvas scorched brown down one side where the wagon next to it went up. The jars of oil under it are still lashed in their straw, warm to the touch. A carter is sitting on the tongue with his hat in his hands, looking at the black frame next door. He has been sitting there since it ended.

${b44Say({darrut:`Darrut sits down next to him without a word and they look at it together for a while. Then Darrut gets up. "He's all right," he says. "He's Aren. We sit."`, marrow:`Marrow looks at the carter's hands, and then at his face, and puts her own hand on his shoulder for a breath on her way past. He does not seem to notice. It helps anyway, by the look of him.`, _:`The carter stays where he is. The squad leaves him to it.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_camp_horses:()=>({sp:'The horse lines', txt:
`The horse lines are a long rope between stakes with nothing on it. Cut ends hang from it here and there where the riders' knives went through, and the ground under it is churned to a mire of hoofprints all going one way, out of the ring, into the dark. A few horses have come back on their own and are standing at the end of the rope, blowing, saddled, with nobody on them.${b44Say({sathi:`\n\nSathi goes along the rope to the ones that came back, and gets them by the bridle one after another, talking to them in Wickan, low. "Ridden blown," she says. "And the riders still out there." She does not say what she thinks of the riders. She does not have to.`, orvas:`\n\nOrvas walks along the empty rope with his face shut. "Every horse in the camp," he says, "after two hundred lamps." He looks out into the dark. "Gall would have had the herd hobbled at dusk. Gall knows."`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_to_seti:()=> !S.f.b4_c4_campRadde ? ({sp:'The edge of the ring', txt:
`Past the wagons the flat is black, and the horse is out in it somewhere. The column will not move until it comes back. Radde will want the Third first.`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The edge of the ring', txt:
`The horse comes back in the grey of the morning, half of it, on blown horses, with nothing to show. The column goes on north. The wagons that burned are pushed off the road and left.

And the days go on like that. The heat. The dust. A wagon burnt here, a picket cut there, riders seen at noon on the edge of sight and gone by the time the horse is up. The Seti ride after them every time, the young lancers, up and down the column, further and further out.`,
      ch:[{t:'On, with the column.', onward:true, go:'b4_c4_ambush'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the Seti ambushed ---- */
    b4_c4_ambush:()=>({sp:'The column', scene:'b4_march_dusk', fx:()=>{ if (!S.f.b4_c4_ambush) { S.f.b4_c4_ambush = 1; S.f.b4_c4_ph = 3; b4Nerve(-1, 'Three hundred Seti dead in a gorge'); } }, txt:
`The word comes back down the column in the afternoon, faster than any horse, and the column stops to hear it.

The Seti rode after riders again this morning. A few dozen of them, on the edge of sight, going away at a canter toward the hills. The Seti went after them, most of them, the young lancers and their women archers, the way they have gone after everything all week. The riders led them into a gorge. And in the gorge the rest of the riders were waiting.

*More than three hundred dead.* That is the number that comes down the column, and the column says it over and over, as if saying it would make it a different number. *And the wounded.* The riders did not finish the wounded. They left them in the gorge, hundreds of them, for the Malazans to find and carry. And the Malazans found them, and are carrying them, and the column will go slower now, a great deal slower, with a camp of wounded horse-warriors in the middle of it.

${b44Say({haddat:`"They left the wounded," Haddat says, very quietly. "On purpose. For us to carry." She has walked the Chain. She knows exactly what a wounded camp does to a column.`, marrow:`Marrow stands up out of the dust before the word has finished going past. "Wounded," she says. "Where?" It is the only thing she says for the rest of the day.`, _:`The squad hears it standing up. Then it sits down again in the dust, because there is nothing else to do with it.`})}${b44R({orvas:`\n\nOrvas closes his eyes. "Always the gallop," he says. "I said. I said somebody out there would know it about them."`, redblade:`\n\n"Three hundred," Ramin says. He is quiet. "Half my company died like that at the Sekala. Ridden at." He puts his helm on. "I mean to find the man who did it."`, warlock:`\n\nKeth is quiet for a while. Then the grandmother says, quite gently: "*The Wickans did not go after them. Temul kept the youths on the wagons.*" Keth, his own voice: "She means he was right."`})}`,
      ch:[{t:'To the wounded camp.', onward:true, go:()=>{ startExplore('b4_c4_seti'); talk('b4_c4_seti_arrive'); }}]}),
    b4_c4_seti_arrive:()=>({sp:'The Seti wounded', scene:'b4_seti_fire', txt:
`They put the Seti wounded in the middle of the night's camp, inside the 9th's wagons, under awnings of canvas off the burnt wagons propped on lances: rows of them on blankets in the firelight, young men and young women, horse-warriors of Quon Tali, bandaged and splinted and some of them not yet, with the Seti's own cutters going down the rows and the Fourteenth's cutters coming to help and getting in the way. Their horses, the ones that came back, stand on a rope at the edge of it with their heads down. The 9th's Second Company has been told to see to the camp tonight, and has a fire going in the middle of it.

The sound is the worst of it. Not loud. A great many people, quietly, all at once.

${b44Barrow() ? b44Barrow() + '\n\n' : ''}${b44Say({marrow:`Marrow is already gone, down the first row of blankets, with her sleeves rolled and her string in her teeth.`, hessa:`Hessa grounds her spear at the end of the first row and looks along it. "I stood a temple door for six years," she says. "They brought us the sick in the spring. I know how to carry." She goes.`, _:`The squad stands at the edge of it, and then goes in, because somebody has to carry the water.`})}`,
      ch:[b4DeckChoice(4),
          {t:'The fire in the middle of it.', go:'b4_c4_setifire'},
          {t:'Walk the rows.', go:()=>startExplore()}]}),
    b4_c4_deck:()=>b4DeckOffer(4),
    b4_c4_card:()=>{ const n = b4DeckCard(4); n.fx = () => { if (['b4c_knightchains', 'b4c_leper'].includes(S.card)) S.f.b4_chains = 1; }; return n; },

    /* the fire: the swap, a rest, the squad, and the way on (the games pass, 79, wraps this node: keep the id) */
    b4_c4_setifire:()=>({sp:'The Seti fire', scene:'b4_seti_fire', again:()=> b44Key() ? 'The Seti fire, burning low. The night\'s orders are given.' : 'The Seti fire, among the awnings. The wounded round it, and the night coming on.', txt:
`A fire of wagon-wood in the middle of the wounded camp, a stained cloth spread beside it that the cutters lay their knives on between rows, a dented helm upturned on the coals with water heating in it. The wounded nearest it have been put there for the warmth. A Seti girl with her arm bound to her chest is feeding the fire one splinter at a time, very carefully, the most important thing she has to do.${b44Dog() ? `\n\nHackle lies by the fire with his nose on his paws. The Seti children who are not hurt have found him. He is putting up with it.` : ''}`,
      ch:[b4DeckChoice(4),
          {t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b4_c4_rest, fx:()=>{ S.f.b4_c4_rest = 1; b4Rest('The squad sits an hour by the Seti fire among the wounded, and some of it sleeps sitting up, the way the Chain taught it. Wounds close, mostly.'); }, go:'b4_c4_setifire_rest'},
          {t:'Talk with the squad.', go:'b4_c4_setifire_talk'},
          ...b4Offers().map(id => ({t:`Send for ${NAME(id)}.`, fx:()=>{ b4SwapIn(id); }, go:'b4_c4_setifire_swap'})),
          b4PipeChoice('b4_c4_setifire'),
          {t:'Find Radde. The night\'s orders.', req:()=>!b44Key() && !!S.f.b4_c4_lancersDone, onward:true, go:'b4_c4_key'},
          {t:'The shouting at the horse lines.', req:()=>!S.f.b4_c4_lancersDone, onward:true, go:'b4_c4_lancers'},
          {t:'Wait for the small hours.', req:()=>b44Key() === 'seti' && !S.f.b4_c4_woundedDone, onward:true, go:'b4_c4_vigil'},
          {t:S.f.b4_c4_morning ? 'The column is forming up. Fall in.' : 'Wait for the morning.', req:()=>b44Key() === 'seti' && !!S.f.b4_c4_woundedDone, onward:true, go:'b4_c4_morning'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c4_setifire_rest:()=>({sp:'The Seti fire', scene:'b4_seti_fire', txt:
`An hour, then, on the trampled ground by the fire, with the wounded all round.

${b44Say({marrow:`Marrow does not rest. She comes back to the fire every so often to wash her hands in the helm, and goes away again. The third time, she sits down for as long as it takes to drink a cup of water, and is asleep before it is finished, and wakes when it falls, and goes.`, haddat:`Haddat sleeps sitting up against the blue shield, as she did on the Chain. Her lips move, once, on a name.`, _:`One of them sleeps. The rest of them listen to the wounded.`})}${b4In('tallow') ? `\n\nTallow has been sat beside by a Seti boy his own age with both legs splinted, who wants to know about the sea. Tallow tells him. It takes the whole hour.` : ''}${b4In('hessa') ? `\n\nHessa sits with her spear across her knees and her eyes shut. "In Kartool," she says, without opening them, "the sick slept on the temple steps. We sat over them all night with the doors shut behind us." She opens her eyes. "This is better. There are no doors."` : ''}${b4In('tebbet') ? `\n\nTebbet sleeps furthest from the fire, with his bow under him, near the women archers' awning. When he wakes he lies still a while, listening to them talk. He does not understand a word. He seems to like it.` : ''}${b44R({orvas:`\n\nOrvas sleeps on his back near the Seti horse lines, near enough to hear the horses breathe.`, redblade:`\n\nRamin sits up all hour with his sword across his knees, very straight, and a Seti woman with a bandaged head watches him do it and says something to her neighbour that makes them both laugh. He pretends not to hear.`, warlock:`\n\nKeth sleeps among the wounded, and the grandmother, out of him in his sleep, hums something to the wounded that nobody in the camp knows and everybody seems to.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c4_setifire'}]}),
    b4_c4_setifire_swap:()=>({sp:'The Seti fire', scene:'b4_seti_fire', txt:
`${b4In('orvas') ? `Orvas comes across the camp from the Khundryl's fires on foot, picking his way between the blankets, and puts his kit down by the fire. "The herd sent," he says, and looks round at the wounded, and his face changes. "Ah," he says. "Horse people."` : b4In('redblade') ? `Ramin comes across the camp from the Red Blades' lines with his helm under his arm, and puts his kit down by the fire. "Lent," he says. He looks at the wounded. "My captain said I should be useful."` : b4In('warlock') ? `Keth comes across from the Wickan youths at the wagons, with the grandmother complaining about the smell of the wounded. He puts his kit down. "*Temul sends him,*" she says. "*Temul says the Seti should have stayed on the wagons. Temul is a boy, and right.*"` : `The swap is made. The fire takes it calmly.`}`,
      ch:[{t:'Back to the fire.', go:'b4_c4_setifire'}]}),
    b4_c4_setifire_talk:()=>{ const late = !!b44Key(), ln = [];
      if (b4In('haddat')) ln.push(late ? `Haddat is looking out past the awnings at the dark, toward the hills. "Barrows out there, the camp says," she says. "Old ones. No one's." She is quiet. "Let them stay no one's tonight."` : `Haddat has been going down the rows with a skin of water, asking names. "I cannot say them right," she says. "Seti is a Quon tongue. I say them anyway." ${S.f.b4_carried === 1 ? 'She touches the place at her throat where the bone hangs. "We carried at the river. We carry here. It is the same work."' : 'She touches the place at her throat where the bone hangs, and leaves it at that.'}`);
      if (b4In('sathi')) ln.push(late ? `Sathi has been at the Seti horse lines since dark with Hackle at her knee, doing their horses' feet. "Ridden into the ground," she says. "Every one. If they live, they'll go lame." She wipes her hands. "The horses, I mean."` : `Sathi is sitting with a Seti girl who has lost her horse, the two of them talking in no language either of them really has. "She says hers was a grey," Sathi says. "With a black foot. She says he ran till he fell." She bares her teeth, not a grin. "They always do."`);
      if (b4In('tangle')) ln.push(late ? `Tangle has the satchel open on his knee by the fire, counting. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "And the marines are going out to the hills tonight with crates, the camp says. Whole crates." He looks toward the hills, a long time. "Not my business."` : `Tangle is making oil lamps on a cloth by the fire out of broken clay and a twist of rag, for the cutters to work by. "Since they're so good at it," he says, "the riders. We might as well have some." He lights one. It does not explode. He looks slightly disappointed.`);
      if (b4In('marrow')) ln.push(late ? `Marrow is washing her hands in the helm again. "The warren is very thin here, child," she says. "Like a blanket somebody's pulled too far. Too many under it." She dries them. "I'll pull it further."` : `Marrow sits down by the fire for the first time since dark and puts her hands in her lap and looks at them. "Arrows, mostly," she says. "Lances. A few the horses rolled on." She ties a knot in her string. "They're very young, child. They mend fast, the young ones. The ones who mend."`);
      if (b4In('tallow')) ln.push(late ? `Tallow has his grandmother's deck in its oilcloth in his lap and has not opened it. "She wouldn't read the night before a storm," he says. "She said the sea heard." He looks toward the hills. "I don't know what hears out here."` : `Tallow is helping a Seti cutter hold a boy down while she takes an arrowhead out of his shoulder. He comes back to the fire grey, and sits, and is sick, quietly, behind the awning, and comes back. "He thanked me," he says, amazed. "He thanked me for holding him."`);
      if (b4In('hessa')) ln.push(late ? `Hessa is sharpening her spear by feel. "D'rek's priests say the Worm takes the sick in the autumn," she says, "and gives them back in the spring, or doesn't." She tests the edge. "It's nearly autumn."` : `Hessa has carried more wounded tonight than anyone in the squad, one at a time, in her arms, the way the temple guards carried the sick up the steps. "They weigh less than you'd think," she says. "The young ones. They weigh what a door weighs."`);
      if (b4In('tebbet')) ln.push(late ? `Tebbet is restringing his bow by the fire. "The hills are a good walk from here," he says. "The barrows." He tests the string. "I'd still rather be further."` : `Tebbet has been sitting with the Seti women archers at their awning, saying nothing in any language, comparing bows by hand. "Horn and sinew," he says, when he comes back. "Glued in layers. You could shoot it from a horse at a gallop." He is quiet. "Half of them won't hold one again."`);
      if (b4In('darrut')) ln.push(late ? `Darrut has his boots off and his feet to the coals. "In the Guard," he says, "the night before anything, we said: whatever you're thinking about, think about it now, and then stop." He looks at his feet. "I'm thinking about it now."` : `Darrut is mending a Seti saddle by the fire with an awl and a strip of hide, badly. "I was a saddler's boy," he says, "before the Guard. In the Old Quarter. For a year." He looks at the saddle. "Not a good one."`);
      if (b4In('orvas')) ln.push(late ? `Orvas is cleaning the black-tailed lance by the fire. "My clan rode away from the end," he says. "Theirs rode into a gorge." He nods toward the Seti. "I do not know which is worse. I do not want to find out."` : `Orvas has spent the evening at the Seti horse lines and come back angry. "They ride them into the ground," he says, "and then they ride after the ones who wait in gorges." ${b44Orv() ? 'He looks at you. "At the river, you carried. These want carrying too." He goes back to the horse lines.' : 'He sits down. "And now they are on blankets, and their horses are on a rope. Both of them are my business, somehow."'}`);
      if (b4In('redblade')) ln.push(late ? `Ramin is sitting very straight with his helm on his knee. "The marines are going to the barrows tonight," he says. "My captain says the Adjunct means to bait something. She does not say what." He polishes the helm. "She keeps her own counsel."` : `Ramin has been helping the Seti cutters, which nobody expected, because he has held more men down while they were cut than anyone else in the squad. "The Red Blades are cavalry," he says. "We know what a lance does." He looks at his hands. "We know what a gorge does."`);
      if (b4In('warlock')) ln.push(late ? `Keth is sitting facing the hills. "*Old,*" the grandmother says. "*Very old. The barrows. Something sleeps in them that is not a man.*" Keth, his own voice: "She says they're empty. Mostly."` : `Keth is sitting between two of the wounded. "*They are frightened,*" the grandmother says, "*the young ones. Of the dark. Of what is in it.*" She is quiet. "*They are right to be.*"`);
      if (b44Dog() && !b4In('sathi')) ln.push(`Hackle lies across your boots, watching the dark past the awnings with his ears up.`);
      return {sp:'The Seti fire', scene:'b4_seti_fire', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it among the wounded, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b4_c4_setifire'}]}; },

    /* ---- the wounded camp: the tents, the cutter, the archer, Hollet, the horses, the lancers ---- */
    b4_c4_tents:()=>({sp:'Under the awnings', scene:'b4_seti_fire', txt: S.f.b4_c4_carried ?
`The rows under the awnings, quieter now. The ones the Third carried in from the cold are nearer the fire. Some of them are asleep.` :
`Under the nearest awning, a row of Seti on blankets: a boy with a lance-wound in his thigh, two women archers with arrows still in them waiting their turn, an older man with his ribs stove in by a falling horse, breathing in small sips. The Seti's cutters are three people for three hundred, and the Fourteenth's are ten more, and it is not enough. The awnings at the far end are full and the wounded still coming in from the gorge are being laid out in the open, in the cold, on bare ground, because there is nowhere else to put them.

${b44Say({marrow:`Marrow comes up out of the row with blood to the elbows. "The open ground, child," she says. "Get them in. Under something. All of them, before it gets cold." She goes back down.`, hessa:`Hessa looks at the ones in the open, and grounds her spear, and starts unbuckling her shield to have both arms free. "Under the wagons," she says. "There's room under the wagons."`, _:`The ones in the open are shivering already. The night will be cold, out here. It always is.`})}`,
      ch:[{t:'Get the ones in the open under the wagons. All of them. (with the company)', check:['might', 14], req:()=>!S.f.b4_c4_carried,
            edges:id=>[id === 'hessa' && ['she carried the sick up a temple\'s steps for six years', 2], id === 'marrow' && ['she knows how to move a hurt body, and is too tired to', 1], id === 'darrut' && ['broad, and patient', 1], id === 'tallow' && ['he is willing, and nearly as frightened of hurting them as of the dark', -1], id === 'orvas' && ['he lifts horse-people the way he lifts foals', 1]],
            clean:{t:'One after another, all of them, under the wagons on canvas, before the cold comes down.'},
            near:{t:()=>`Yes, but it is a long night of lifting, and somebody's back goes on the last one. ${NAME(ROLL().who || 'sgt')} starts the next fight ${3 + lvT()} health down.`, fx:()=>bruise(ROLL().who || 'sgt', 3 + lvT())},
            go:'b4_c4_tents_ok', fail:'b4_c4_tents_no'},
          {t:'Leave it to the cutters.', go:()=>startExplore()}]}),
    b4_c4_tents_ok:()=>({sp:'Under the awnings', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_carried = 'all'; b4Nerve(1, 'The Second Company carried the Seti in'); b44L('marrow', 1); b44L('hessa', 1); }, txt:
`It takes the rest of the evening. Two to a blanket, lifting slowly, ${b4In('marrow') ? 'the way Marrow shows them' : 'the way the cutters show them'}; under the wagons, on canvas off the burnt ones, out of the wind. The Second Company sees the Chain squad doing it and comes to help without being asked, recruits and regulars, the freckled girl at the end of a blanket with her lip bitten white, and by the time it is full dark there is nobody left on the open ground.

The Seti cutters, going down the rows, find their wounded under the 9th's wagons, and look at the 9th, and one of them, an old woman with grey braids and blood to the shoulder, nods to the Third. Once. It is a great deal.`,
      ch:[{t:'Back into the camp.', go:()=>startExplore()}]}),
    b4_c4_tents_no:()=>({sp:'Under the awnings', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_carried = 'some'; }, txt:
`There are too many, and the ground is hard, and the dark comes down faster than the work. ${by({sgt:'You lift', _:'{who} lifts'})} until the arms will not, and the company comes to help and gets as many as it can under the wagons. Not all of them. The last of them are left in the open under every cloak the Second Company owns, with a fire built up beside them, and somebody sitting up with them, which is something.`,
      ch:[{t:'Back into the camp.', go:()=>startExplore()}]}),
    b4_c4_healer:()=> S.f.b4_c4_salve ? ({sp:'A Seti cutter', scene:'b4_seti_fire', txt:
`The old Seti cutter is back down the rows, on her knees beside a boy with a lance-wound, her grey braids tied up out of the blood, busy. "More salve when it's gone," she says. "Not before."`,
      ch:[{t:'Leave her to it.', go:()=>startExplore()}]}) : ({sp:'A Seti cutter', scene:'b4_seti_fire', fx:()=>{ if (!S.f.b4_c4_salve) { S.f.b4_c4_salve = 1; gain('b4_c4_salve'); } }, txt:
`The old Seti cutter with the grey braids is sitting on an upturned saddle between two rows, eating, fast, with her bloody hands, because she has not eaten since the gorge and will not again until it is done. She looks up at the squad, at ${S.f.b4_bone === 'chain' ? 'what is tied to the bones at your throats' : 'the bones at your throats'}, at the way you stand, and knows what she is looking at. ${S.f.b4_c4_carried === 'all' ? '"You put them under the wagons," she says, in a Quon Malazan with the Seti hills in it. "All of them."' : '"Chain," she says, in a Quon Malazan with the Seti hills in it. "You walked it. All the way, they say."'}

She reaches behind her into a saddlebag and brings out a small clay pot, plugged with a twist of rag, and holds it out. "Horse-salve," she says. "For the horses, when they are cut. We use it on the riders when the horses are done with it." She shrugs. "Tar, and sheep, and a weed from home. It stinks. It works." She puts it in your hand. "Use it on whoever is hurt first. Then come back for more. I will be here." She looks along the rows. "I will be here a long time."${b44Say({marrow:`\n\nMarrow, passing with a bowl of water, stops and smells the pot over your shoulder, and her eyebrows go up. "Child," she says to the old woman, with deep respect.`, _:''})}`,
      ch:[{t:'"Thank you, mother."', go:()=>startExplore()}]}),
    b4_c4_archer:()=> S.f.b4_c4_shot ? ({sp:'A Seti archer', scene:'b4_seti_fire', txt:
`The Seti archer is asleep against her saddle under the women's awning, with her bound hand on her chest and her good one open in her lap, where the bow was.`,
      ch:[{t:'Let her sleep.', go:()=>startExplore()}]}) : ({sp:'A Seti archer', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_archer = 1; }, txt:
`Under the women archers' awning, a Seti archer is sitting up against a saddle with her left hand bound in a lump of rag the size of a fist, red through. She is older than the lancers, thirty perhaps, with a scar through one eyebrow and a horn bow across her knees, and she is running the fingers of her right hand along the string, over and over, the way you touch a thing you are saying goodbye to.

${b4In('tebbet') ? `Tebbet stops at the edge of the awning, with his own bow over his shoulder. She looks at it, and at him, and holds out her good hand for it. He gives it to her without a word. She weighs it, and draws it a little, one-handed, against her knee, and nods, and gives it back. Then she holds out her own.` : `She sees the squad looking at the bow, and holds it up. "Seti," she says. "Horn. My mother's." She looks at the bound hand. "The gorge took the fingers that draw." She says it the way you say a horse has gone lame: a fact, with a great deal under it.`}`,
      ch:[{t:b4In('tebbet') ? 'Let Tebbet try her bow. (at the lamp on the far pole)' : 'Try her bow. (at the lamp on the far pole)', check:['wits', 14], req:()=>!S.f.b4_c4_shot,
            edges:id=>[id === 'tebbet' && ['the bow is his trade, and he wants this', 3], id === 'sathi' && ['she has shot from horseback since she could sit one', 2], id === 'orvas' && ['a Khundryl bow is not so different', 1], id === 'marrow' && ['she has never drawn a bow in her life', -2]],
            near:{t:()=>`Yes, but the horn bow bites back, the way a strange bow does, and takes the skin off ${NAME(ROLL().who || 'sgt')}'s bow-hand with the string. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c4_archer_shot', fail:'b4_c4_archer_miss'},
          {t:'Leave her to it.', go:()=>startExplore()}]}),
    b4_c4_archer_shot:()=>({sp:'A Seti archer', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_shot = 'hit'; if (!S.f.b4_c4_setibow) { S.f.b4_c4_setibow = 1; gain('b4_c4_setibow'); } b44L('tebbet', 1); }, txt:
`${by({tebbet:`Tebbet takes the horn bow and turns it over in his hands, and strings an arrow, and draws, slowly, feeling for where it wants to be, and holds, and looses. The arrow goes across the camp over the awnings and knocks the lamp off the far pole forty paces off without breaking it. The women archers under the awning make a sound, all together. The one with the bound hand laughs, short and surprised.`, _:`{who} takes the horn bow and draws it, and holds, and looses. The arrow goes across the camp over the awnings and knocks the lamp off the far pole. The women archers under the awning make a sound, all together. The one with the bound hand laughs, short and surprised.`})}

"Keep it," she says. "It wants shooting. I can't." She closes ${b4In('tebbet') ? 'Tebbet\'s' : 'your'} hands over it with her good one. "When you shoot it at them, say it was a Seti's."${b44Say({tebbet:`\n\nTebbet looks at the bow a long time. "I'll make it count," he says at last, which from him is a vow.`, _:''})}`,
      ch:[{t:'"We will."', go:()=>startExplore()}]}),
    b4_c4_archer_miss:()=>({sp:'A Seti archer', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_shot = 'miss'; if (!S.f.b4_c4_setibow) { S.f.b4_c4_setibow = 1; gain('b4_c4_setibow'); } }, txt:
`The horn bow is stiffer than it looks and shorter than it should be, and the arrow goes high over the far pole into the dark, and somebody out there swears. The women archers laugh, not unkindly. The one with the bound hand shakes her head.

"It is a horse bow," she says. "You shoot it from a horse, or you shoot it badly." She holds it out anyway. "Keep it. It wants shooting. I can't. Learn it."`,
      ch:[{t:'"We will."', go:()=>startExplore()}]}),
    b4_c4_hollet_seti:()=>({sp:'Captain Hollet', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_holletSeti = 1; }, txt:
`Hollet is standing at the edge of the wounded camp with his tablet, not counting. He has been asked to count the Seti wounded for the Fist, and has started three times, and stopped.

"The Adjunct came down the column this afternoon," he says. "To the gorge. The officers went with her." He looks at the tablet. "One of them said the wounded would slow us. That the riders left them for that." He stops. "She said, *Wounded Malazans are better than dead ones.* That was all she said. Then she rode back." He is quiet. "An officer of the 10th told me. He was standing near enough to hear. He said she didn't raise her voice."

He looks along the rows. "So we carry them." He starts to count again. "I'd have carried them anyway, Sergeant. I'd like you to know that. But it's better that she said it."${b44Say({marrow:`\n\nMarrow, going past, says, "She's right, child," to Hollet, and does not stop.`, _:''})}`,
      ch:[{t:'"Yes, sir."', go:()=>startExplore()}]}),
    b4_c4_horses:()=>({sp:'The Seti horse lines', scene:'b4_seti_fire', txt:
`The Seti horses that came back from the gorge stand on a rope at the edge of the camp, far fewer of them than rode out, with their saddles still on because nobody has had the time. Some of them are hurt. Most of them are only standing, with their heads low, the way horses stand when the herd is wrong.

At the far end of the rope, a knot of young Seti lancers is standing round a fire of their own, the jackal-tail on one of the lances, talking loudly, and looking over at the 9th.${b44Say({sathi:`\n\nSathi goes along the rope taking saddles off, one after another, by herself, with Hackle at her heels, talking to each horse in Wickan, unasked and unstopped.`, orvas:`\n\nOrvas goes along the rope taking saddles off, one after another, talking to each horse in Khundryl. "It wants doing," he says, when he sees the squad watching.`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_lancers:()=> S.f.b4_c4_lancersDone ? ({sp:'The Seti horse lines', scene:'b4_seti_fire', txt:
`The young lancers' fire at the end of the rope is out. They are asleep round it, or sitting with the wounded, or standing at the horse lines with their foreheads against the horses.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}) : ({sp:'The young lancers', scene:'b4_seti_fire', txt:
`At the end of the Seti horse lines a knot of young lancers stands round a fire of their own: a society of them, a dozen, the jackal-tails under their lance-blades, the ones who came back from the gorge on their own horses and without a scratch, which is the worst thing that could have happened to them. They have been drinking. They are saying things, loudly, in Seti and in Malazan, so the 9th can hear.

"*Foot.* Sitting in the wagons while we rode." "*If the foot had come.*" "*Three hundred, and the foot ate its supper.*" The one with the jackal-tail on his lance, ${S.f.b4_c4_called ? 'the one from the noon halt, who remembers the Third\'s face,' : 'the loudest,'} turns as the Third comes along the rope, and sees the Chain on it, and his face goes ugly. "And here's the Chain," he says. "The ones who walk. We're going after them tonight. Not you. Us. With or without the Fist."

Behind him, the others are already untying horses.${b44Say({haddat:`\n\nHaddat stops. "They are children," she says, in Hissari, very low, "and they have lost three hundred, and they want somebody to have done it." She sets her shield on her arm. "We will do."`, darrut:`\n\nDarrut puts his helm on. "Drunk cavalry," he says. "The Guard's favourite kind of night."`, _:`The squad stops.`})}${b44R({orvas:`\n\nOrvas steps out beside you, lance grounded. ${b44Orv() ? '"Let me talk to them," he says, low. "Horse people listen to horse people. And they will hear what you did at the river."' : '"Horse boys," he says. "Drunk, and ashamed, and with horses. I know what that is."'}`, redblade:`\n\nRamin's red scale catches the firelight, and every one of the young lancers sees it. "Ah," he says. "They are going to hit me as well. Cavalry always does."`, warlock:`\n\n"*Children,*" the grandmother says, out of Keth, very clearly. "*Going out to die in the dark to feel better.*"`})}

If they ride out tonight they will ride into whatever is waiting, the way the three hundred did. Lance-butts and fists, then. Nobody killed.`,
      ch:[{t:'"Shields. No blades." Get between them and the horses.', go:()=>startBattle('b4_c4_lancers_brawl', {})},
          {t:'Talk them down. ("Three hundred went after the riders. Want to make it three hundred and twelve?")', check:['guile', 15],
            edges:id=>[id === 'orvas' && (b44Orv() ? ['horse people listen to horse people, and he speaks for you since the ford', 3] : ['horse people listen to horse people', 2]), id === 'sathi' && ['she rides better than any of them, and they can see it', 2], id === 'haddat' && ['she walked the Chain to the end, and says so', 1], id === 'redblade' && ['red scale, to angry young cavalry', -2], id === 'tallow' && ['he is younger than they are', -1]],
            near:{t:()=>`Yes, but the jackal-tail lancer swings once before he stops listening, and it lands. ${NAME(ROLL().who || 'sgt')} starts the next fight ${3 + lvT()} health down.`, fx:()=>bruise(ROLL().who || 'sgt', 3 + lvT())},
            go:'b4_c4_lancers_talked', fail:'b4_c4_lancers_fail'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c4_lancers_talked:()=>({sp:'The young lancers', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_lancersDone = 1; S.f.b4_c4_lancersHow = 'talked'; b44L('haddat', 1); }, txt:
`${by({orvas:`Orvas walks out between the Third and the lancers and says something to them in the trade-speech of the Odhan, low and fast, about horses, and gorges, and his clan riding away before the end, and what it is to be the ones who come back. ${b44Orv() ? 'And then, nodding back at the Third, something about a river, and the dead in it, and who carried them.' : ''} The ones untying the horses stop.`, sathi:`Sathi walks out between them and the horses and says, in her Wickan-thick Malazan, exactly what happens to young riders who ride after other riders into the dark, because she has seen it, more than once, from the Wickan side. The ones untying the horses stop.`, haddat:`Haddat walks out to them with the blue shield on her arm and says the Chain's numbers, the way she keeps its dead: Hissar, Sekala, Vathar, Sanimon, the Barrow. How many rode out, each time, after something. How many came back. The ones untying the horses stop.`, _:`{who} walks out between them and the horses and says it plainly: three hundred went after the riders this morning; the riders are still out there, waiting, the way they waited in the gorge. The ones untying the horses stop.`})}

The jackal-tail lancer looks round at them, and at the Third, and at the wounded under their awnings, and the ugly thing goes out of his face and leaves something worse, and younger. He sits down by the fire, suddenly, as if his legs had gone. One of the women archers comes from the wounded and sits down beside him and puts her arm round his neck and says something in Seti, and he puts his face in her shoulder.

The horses stay on the rope.`,
      ch:[{t:'Leave them to it.', go:()=>startExplore()}]}),
    b4_c4_lancers_fail:()=>({sp:'The young lancers', scene:'b4_seti_fire', txt:
`${by({sgt:'You say', _:'{who} says'})} it, and the jackal-tail lancer hears it, and laughs, high and wrong, and swings his reversed lance at the nearest of the Third, and the rest of them come with him, because they are drunk and ashamed and nineteen and here is somebody to hit.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c4_lancers_brawl', {surprise:'e'})}]}),
    b4_c4_lancers_after:()=>({sp:'The Seti horse lines', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_lancersDone = 1; if (!S.f.b4_c4_lancersHow) S.f.b4_c4_lancersHow = 'fought'; }, txt:
`The Seti elders come down the horse lines at the noise, two old men and the grey-braided cutter, and the young lancers who are still standing see them and stop being a fight and start being ashamed. The jackal-tail lancer is sitting in the trampled grass by the rope with his nose bleeding and a woman archer holding his head. None of them is dead, or going to be. None of the horses has left the rope.

The old cutter looks at the Third, and at her lancers, and says something to the lancers in Seti that makes the youngest of them cry. Then, to the Third, in Malazan: "Better a nose than a gorge." She goes back to the wounded.${b44R({orvas:`\n\nOrvas is sitting on a saddle with his lance across his knees, breathing hard. "I did not hit any of them very hard," he says. "Tell them that. They are horse people."`, redblade:`\n\nRamin is wiping blood off his knuckles. "The one with the tail hit me first," he says. "Cavalry always does."`, warlock:`\n\n"*Children,*" the grandmother says, satisfied. "*Alive children.*"`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c4_setifire'}]}),
    b4_c4_seti_wagon:()=>({sp:'A burnt wagon', scene:'b4_seti_fire', txt:
`A wagon from the raid night, burnt to its frame and dragged here to be a windbreak, its hoops still up, with the Seti's saddles hung on them in a row. A Seti boy is asleep under it in the ash, and the 9th steps round him.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c4_seti_back:()=>({sp:'The column\'s camp', txt:
`Back into the camp, the 9th's fires and the 8th's beyond them, and the Khundryl's beyond that. The Third's orders are here tonight.`,
      ch:[{t:'Not that way.'}]}),

    /* ---- the key: the barrow night. The wounded camp, or the far end of the picket line ---- */
    b4_c4_key:()=>({sp:'Sergeant Radde', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_ph = 4; }, txt:
`Radde finds the Third by the Seti fire after dark, with the book under his arm, and sits down on an upturned saddle, and does not open the book.

"Tonight," he says. "The marines are going out to the hills, the camp says. North of the camp, the ones with the old barrows on them. With crates. The Adjunct's orders." He shrugs. "What for, the marines know. The rest of us don't." He looks toward the hills, invisible in the dark. "The 9th's to put pickets out along the hills, the whole length of the camp, a squad to a picket. The Fist set them himself, this afternoon." He is quiet. "Too far apart. I said so. He said a picket's for seeing, not holding."

"The far end of the 9th's line wants a squad. The far end. Nowhere near the marines, nowhere near anything; a long way from the Fist's own pickets." He looks at the wounded. "And the captain asked me for a squad to sit with the Seti tonight. He's got it in his head that the riders who left them in the gorge will come back to see if we picked them up." He rubs his face. "He's not wrong. He keeps the numbers."

"I can give you either, Sergeant. Not both. I'll write whichever."${b44Say({marrow:`\n\nMarrow, washing her hands in the helm, has stopped washing them.`, tebbet:`\n\nTebbet is looking toward the hills. "The far end," he says, very quietly. "Out past everything." He does not say which he wants.`, _:''})}${b44R({orvas:`\n\nOrvas is watching you with his lance grounded. ${b44Orv() ? '"At the river you carried," he says. "Whatever you choose, I am with it."' : '"Whichever," he says. "I will be there."'}`, redblade:`\n\nRamin's hand goes to his sash, where the badge is not. "The Red Blades are not consulted either," he says. "We find it restful."`, warlock:`\n\n"*Both,*" the grandmother says. "*Something comes to both.*"`})}`,
      ch:[{t:'"We stay with the wounded."', fx:()=>{ S.f.b4_c4_key = 'seti'; S.f.b4_setiSaved = 1; b4Nerve(1, 'The Chain squad stayed with the Seti'); b44L('marrow', 2); b44L('hessa', 1); }, go:'b4_c4_key_seti'},
          {t:'"Give us the far end of the line."', fx:()=>{ S.f.b4_c4_key = 'picket'; S.f.b4_setiSaved = 0; S.f.b4_c4_raddeMark = 1; b4Nerve(1, 'The Chain squad took the far end of the line'); b44L('tebbet', 1); b44L('marrow', -1); }, go:'b4_c4_key_picket'},
          {t:'"Give me a moment, Sergeant."', go:()=>startExplore()}]}),
    b4_c4_key_seti:()=>({sp:'Sergeant Radde', scene:'b4_seti_fire', txt:
`Radde has the book open before you have finished, as if he had a bet on it with himself. "The Second Company's on the wounded, then, with the Chain lot," he says. "I'll give the far end to the squad next along. They've a good corporal." He gets up. "Keep a fire going, Sergeant. And keep your shields where you can find them in the dark."

He goes. The word goes round the wounded camp in a quarter of an hour, in Seti and Malazan: *the Chain squad is staying.* Under the women archers' awning, somebody laughs, tired, and somebody else starts stringing a bow one-handed with her teeth.${b44Say({marrow:`\n\nMarrow goes back to washing her hands in the helm. "Good, child," she says, without turning round. That is all.`, _:''})}${b44R({orvas:`\n\nOrvas goes to the Seti horse lines and starts checking the horses' feet, one after another, as if the night might need them.`, redblade:`\n\nRamin puts his helm on. "A wounded camp," he says. "The Red Blades held one on the Chain." He does not say what happened to it.`, warlock:`\n\nKeth lies down facing the dark. "*I will listen,*" the grandmother says.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c4_setifire'},
          {t:'Wait for the small hours.', onward:true, go:'b4_c4_vigil'}]}),
    b4_c4_key_picket:()=>({sp:'Sergeant Radde', scene:'b4_seti_fire', txt:
`Radde writes, and then, after a moment, makes a mark beside it that the Third has not seen him make before. "The far end," he says. "The squad next along will sit with the Seti; they've a good corporal." He gets up. "Up the hills north, past the last of the 9th's pickets, as far as the line goes. There's a lantern. Keep it lit. If anything comes, you're the end of the line, Sergeant. There's nobody past you."

He looks at the wounded a moment longer. "They'll be all right," he says, to nobody in particular, and goes.${b44Say({tebbet:`\n\nTebbet is already on his feet with his bow. "A long way off," he says. He sounds almost cheerful.`, marrow:`\n\nMarrow stands up from the helm and dries her hands, slowly, finger by finger. "I'll leave the old woman my string," she says. "She can count on it." She goes to find her.`, _:''})}${b44R({orvas:`\n\nOrvas picks up his lance. "The end of the line," he says. "Where the horses would go round." He nods. "Good."`, redblade:`\n\nRamin puts his helm on. "A picket in the hills," he says. "On foot." He sighs. "Lent."`, warlock:`\n\n"*The hills,*" the grandmother says. "*The barrows. Mind where you sit, children.*"`})}`,
      ch:[{t:'North, into the hills.', onward:true, go:()=>{ startExplore('b4_c4_hills'); talk('b4_c4_hills_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b4_c4_radde_night:()=>({sp:'Sergeant Radde', scene:'b4_seti_fire', txt: b44Key() === 'seti' ?
`Radde has gone back to the 9th's lines. ${S.f.b4_c4_woundedDone ? 'The book will have it by now.' : 'The Second Company is on the wounded with the Third, round the awnings in the dark, shields where they can find them.'}` :
`Radde is at the 9th's fire, writing. "The hills, Sergeant," he says. "The lantern. Before the fog comes down."`,
      ch:[{t:'North, into the hills.', req:()=>b44Key() === 'picket' && !S.f.b4_c4_picketDone, onward:true, go:()=>{ startExplore('b4_c4_hills'); talk('b4_c4_hills_arrive'); }},
          {t:'Wait for the small hours.', req:()=>b44Key() === 'seti' && !S.f.b4_c4_woundedDone, onward:true, go:'b4_c4_vigil'},
          {t:'Leave him.', go:()=>startExplore()}]}),

    /* ---- 'seti': the small hours in the wounded camp ---- */
    b4_c4_vigil:()=>({sp:'The wounded camp · the small hours', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_vigil = 1; }, txt:
`The small hours, and cold. The fire is down to coals. The wounded are asleep, the ones who can sleep, and the ones who cannot are lying very still under their blankets, listening, the way the Third is listening.

Far off to the north, in the hills, there is a sound: a flat hard crack, and another, and a long rolling one, like doors slamming in a big empty house. Munitions. The marines, out at the barrows, doing whatever they went to do. The sound comes and goes for a while, and then it stops, and the quiet after it is worse.

And then, out in the flat past the awnings, close, the sound of horses walking. Not galloping. Walking, slowly, a lot of them, the way you walk a horse when you do not want to be heard and have decided you do not care.${b44Say({tebbet:`\n\n"Twenty," Tebbet says, very quietly, an arrow on the string. "More behind. They're coming for the awnings."`, sathi:`\n\n"Horses," Sathi says, with Hackle stiff and silent against her leg. "Walking. They want us to hear them." She bares her teeth.`, _:''})}${b44R({orvas:`\n\nOrvas is up with his lance before anybody has said anything. "They come back for what they left," he says. "To see if we picked it up."`, redblade:`\n\nRamin rises with his sword already drawn, without a sound, the scale held still with his free hand.`, warlock:`\n\n"*Here,*" the grandmother says, out of Keth, very low. "*Now.*"`})}`,
      ch:[{t:'"Shields. On the awnings."', go:()=>startBattle('b4_c4_wounded', {})},
          {t:'Tangle puts a sharper out among the horses.', tag:'uses 1 sharper', req:()=>b4In('tangle') && (S.inv.sharper || 0) > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b4_c4_wounded', {pre:'Tangle\'s sharper goes off out in the flat among the walking horses, and the walk becomes a scream and a scatter.'})},
          {t:'Douse the fire and meet them in the dark past the awnings. (they think the camp is asleep)', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['he would rather be out in the dark, and is good at it', 2], id === 'sathi' && ['she hears horses the way other people hear their names', 1], id === 'orvas' && ['he hears horses the way other people hear their names', 1], id === 'darrut' && ['he is broad, and his shield is loud', -1], id === 'tallow' && ['his teeth are chattering', -1]],
            near:{t:'Yes, but a wounded Seti boy cries out in his sleep as the squad goes past his blanket, and the walking horses stop walking.'},
            go:()=>startBattle('b4_c4_wounded', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c4_vigil_seen'},
          {t:'Not yet. Wait.', go:()=>startExplore()}]}),
    b4_c4_vigil_seen:()=>({sp:'The wounded camp', scene:'b4_seti_fire', txt:
`The fire goes out, and for a breath it works, and then somebody's shield knocks on a lance-pole and the awning above it shivers, and out in the dark a man laughs, low, and says something in a desert tongue, and the horses stop walking and start running.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c4_wounded', {surprise:'e'})}]}),
    b4_c4_wounded_after:()=>({sp:'The wounded camp', scene:'b4_seti_fire', fx:()=>{ S.f.b4_c4_woundedDone = 1; }, txt:
`They go, in the end, the ones who can: out into the flat at a gallop, without their lamps, without what they came for. The awnings stand. Under them the Seti who got up to fight are sitting down again, slowly, on their blankets, with their bows across their knees and their slings bloody, and the cutters are coming back down the rows to see what has been undone.

None of the wounded under the awnings was taken. Not one.

The old cutter with the grey braids walks the length of the camp in the grey before dawn, counting, with her lips moving. At the end of it she comes to the Third's fire and stands there. "All of them," she says. "All that went under." She looks at the Third for a long breath. "The Seti will remember the Chain squad," she says, like a law being made. Then she goes back to work.${b44Say({marrow:`\n\nMarrow sits down by the coals for the first time all night. "Child," she says, to nobody, very tired. She does not get up for a while.`, hessa:`\n\nHessa grounds her spear at the end of the last row, where she has stood all night. "A door," she says. "It held." She sounds surprised, and then not.`, _:''})}${b44R({orvas:`\n\nOrvas is standing at the Seti horse lines with blood on his lance, grieving, out loud, the Khundryl way, for the three hundred in the gorge. The Seti under the awnings listen. After a while, some of them join it.`, redblade:`\n\nRamin cleans his sword on a Seti blanket, and apologises to its owner, gravely, in two languages.`, warlock:`\n\n"*Held,*" the grandmother says. "*They will tell it in Seti, child, in a hundred years, wrong.*"`})}`,
      ch:[{t:'Wait for the morning.', onward:true, go:'b4_c4_morning'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- 'picket': the far end of the line, in fog ---- */
    b4_c4_hills_arrive:()=>({sp:'The barrow hills', scene:'b4_c4_fog', txt:
`North of the camp the ground goes up into low hills, grass and scrub and stone, and on the hills there are barrows: long low mounds older than anyone's name for them, grassed over, a dozen in sight and more beyond, lying along the crests like sleeping cattle. The 9th's pickets are strung along the hills behind you, a fire here, a lantern there, a long way apart. The Third walks past the last of them, and on, until there is nothing ahead but hills and the dark.

And then the fog comes. Not from anywhere: it comes up out of the ground in the cold, the way it does out here before dawn, white, wet, to the knee and then to the waist and then over the head, and the barrows go grey and then go, and the lantern you were told to light is the only thing in the world.${b44Say({tebbet:`\n\n"Well," Tebbet says, looking into it. "Just us out here." He sounds less pleased than he did.`, haddat:`\n\n"Fog," Haddat says, with deep suspicion. "In the desert." She has lived her whole life in Seven Cities and never trusted it once.`, _:''})}${b44R({orvas:`\n\nOrvas sniffs the fog. "Horses," he says. "Far off. And men on foot, nearer." He frowns. "Running. Not toward us. Away from something."`, redblade:`\n\nRamin's red scale beads with the wet in a breath. "In Ehrlitan," he says, "they say fog is the dead walking." He looks at the barrows. "I would rather they did not say that tonight."`, warlock:`\n\n"*Old,*" the grandmother says, out of Keth, looking at the barrows. "*Sleep, old ones. Not tonight.*"`})}`,
      ch:[{t:'Find the lantern.', go:()=>startExplore()}]}),
    b4_c4_lantern:()=> S.f.b4_c4_picketDone ? ({sp:'The picket\'s lantern', scene:'b4_c4_fog', txt:
`The picket's lantern is still lit on its spear, the candle burnt down to a stub. ${S.f.b4_c4_morning ? 'The fog is going off the hills in the sun, and the column is forming up below.' : 'The fog is thinning. Below, the camp is waking, and the noise from the marines\' end of the hills stopped a long time ago.'}`,
      ch:[{t:S.f.b4_c4_morning ? 'Down to the column.' : 'Hold the end until morning.', onward:true, go:'b4_c4_morning'},
          {t:'Not yet.', go:()=>startExplore()}]}) : ({sp:'The picket\'s lantern', scene:'b4_c4_fog', fx:()=>{ S.f.b4_c4_lanternLit = 1; }, txt:
`The picket's lantern hangs from a spear driven into the ground on the crest, a horn lantern with a stub of candle, and two regulars of the 9th crouched beside it, very glad to see you. The fog stands all round it in a wall, lit gold for an arm's length and then white, and then nothing.

From ${b44Far()}, sound comes through the fog: a flat crack, and another, and a long roll like a door slamming in a big house, and then shouting, a great deal of it, and horses. Munitions. The marines, at their barrows, doing whatever they went to do. It goes on a long time. Somewhere in it a horse screams, close to the noise, and then another sound, a single heavy bang, apart from the rest, and then that end of the dark goes quiet.

You are a long way from it. The sound is the only thing of it that reaches the far end of the line.

And then, out in the fog to the north, nearer, there is another sound: feet, many, running on grass. Not toward the noise. Away from it.`,
      ch:[{t:'Douse the lantern. Wait.', go:()=>startExplore()},
          {t:'Keep it lit. Let them see the line.', go:()=>startExplore()}]}),
    b4_c4_barrow:()=>({sp:'A barrow', scene:'b4_c4_fog', txt:
`A long low mound, grassed over, older than the Empire, older than anything anybody here could give a name to, with the fog lying on it like water. There is a stone at one end, half sunk, with marks on it that might have been writing once. ${S.f.b4_c4_picketDone ? 'In the grey of the morning there is a Malazan helm lying on its far slope, upside down, empty, as if somebody had set it there and it had rolled.' : 'Nobody in the 9th has gone near the barrows tonight. The regulars by the lantern say there are things in them; the marines, the camp says, are sitting on theirs.'}${b44Say({tangle:`\n\n"Don't dig," Tangle says, before anybody has suggested it. "Not tonight. Not ever, but especially not tonight."`, haddat:`\n\nHaddat touches the stone, once, with two fingers, the Hissari way you touch a door that is not yours. "Sleep," she says to it. Then she takes her hand away.`, _:''})}`,
      ch:[{t:'Leave it be.', go:()=>startExplore()}]}),
    b4_c4_picket_regs:()=>({sp:'Regulars of the picket', scene:'b4_c4_fog', fx:()=>{ S.f.b4_c4_regs = 1; }, txt:
`Two regulars of the 9th and three of the Second Company's recruits crouch together behind their shields on the crest, looking into the fog, and one of the recruits is the freckled girl, with her spear level at the white. She looks round at the Third, and looks back at the fog, and does not lower the spear.

"Sergeant," says the older regular, very low. "That noise. Over there." He means the far end of the dark, where the munitions were. "Was that ours?" He does not wait for an answer. "It was ours. It's always ours, that noise." He shifts his shield. "What's running this way, then, isn't."`,
      ch:[{t:'"Then we\'re the end of the line. Shields."', go:()=>startExplore()}]}),
    b4_c4_fogshapes:()=>({sp:'The fog', scene:'b4_c4_fog', txt:
`They come out of the fog all at once: men on foot, a dozen and more, in desert cloth with their faces wrapped, running bent over across the crest, with tulwars and slings. Raiders who were out at the barrows, by the look of them, and have come round the end of whatever the marines did there in the dark and the fog, and are looking for the gap in the Malazan line to get back out into the flat. They have found the end of it. They have found the Third.

They stop when they see the lantern. Then the one in front, a tall man with a long blade, says something short, and they spread out in the fog, and come on, because there is nowhere else to go.${b44Say({tebbet:`\n\n"I see five," Tebbet says. "There's more." He looses, and one of the five is not there any more.`, _:''})}`,
      ch:[{t:'"Shields. Hold the end."', go:()=>startBattle('b4_c4_picket', {})},
          {t:'Tangle puts a sharper out into the fog where they are.', tag:'uses 1 sharper', req:()=>b4In('tangle') && (S.inv.sharper || 0) > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b4_c4_picket', {pre:'Tangle\'s sharper goes off out in the fog, a yellow flash in the white, and the shapes in it scatter.'})},
          {t:'Go round them in the fog, along the barrow, and take them from the side. (they cannot see either)', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['hills are his, and the far view, even in fog', 2], id === 'darrut' && ['he stood the Aren wall in sea-fog for ten years', 2], id === 'orvas' && ['he moves as if the horse were still under him', 1], id === 'tallow' && ['he has never been in fog this thick that wasn\'t on the sea', -1], id === 'hessa' && ['her shield is loud and she is careful of it', -1]],
            near:{t:'Yes, but a recruit\'s spear-butt rings on the barrow\'s stone in the fog as the squad goes along it, and the nearest of them turn toward it.'},
            go:()=>startBattle('b4_c4_picket', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c4_fog_seen'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b4_c4_fog_seen:()=>({sp:'The fog', scene:'b4_c4_fog', txt:
`The fog is thick, and the barrow is longer than it looked, and the grass on it is wet and loud underfoot, and the raiders, who have been running from noise all night, are very quick to turn on the sound of it. The first of them comes out of the white with his blade up, straight at the squad.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c4_picket', {surprise:'e'})}]}),
    b4_c4_picket_after:()=>({sp:'The far end of the line', scene:'b4_c4_fog', fx:()=>{ S.f.b4_c4_picketDone = 1; }, txt:
`It is over before the fog lifts. The raiders who can still run have gone back into the white, north, away from the line, and are not coming back. The ones who cannot are lying in the barrow's lee, in the wet grass. The picket's lantern is still lit on its spear. The regulars are standing round it with their shields up, as if they had forgotten how to put them down.

The freckled girl is sitting on the barrow's stone with her spear across her knees, shaking, and looking at the blood on the blade as if it belonged to somebody else. It is the first. Everybody in the Third remembers theirs.

${b44Say({darrut:`Darrut sits down beside her on the stone, and is quiet a while, and then says: "The wall. My first." He looks at the fog, and says nothing else about it. She nods, as if that were a great deal. It is.`, haddat:`Haddat goes and stands by the girl, not touching her. "Say his name if you have it," she says. "If not, say yours. Say something." The girl says her own name, very quietly. Haddat nods.`, _:`One of the squad goes and sits by her on the stone for a while, saying nothing. It is what was done for each of them, the first time.`})}${b44R({orvas:`\n\nOrvas walks the barrow's lee with his lance, making sure. "Foot," he says. "Running from the noise. They were not even looking for us." He sounds sorry for them, a little.`, redblade:`\n\nRamin stands on the crest with his sword drawn until the fog is gone, as if the fog had personally offended him.`, warlock:`\n\n"*Quiet now,*" the grandmother says, out of Keth, to the barrows. "*All quiet. Sleep.*"`})}`,
      ch:[{t:'Hold the end until morning.', onward:true, go:'b4_c4_morning'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the morning: the Fist's fall and the acting Fist (camp talk), the helm, the column north ---- */
    b4_c4_morning:()=>({sp:'The morning', scene:'b4_c4_morning', fx:()=>{ if (!S.f.b4_c4_morning) { S.f.b4_c4_morning = 1; S.f.b4_c4_ph = 5; b4Nerve(-1, 'A Fist down in the night'); if (b44Key() === 'picket') S.f.b4_blistigNoticed = 1; } }, txt:
`The fog burns off in the first hour of the sun, and the hills are only hills again, and the barrows only barrows: long and grey and quiet, and on some of them, scattered down their slopes, Malazan helms. Empty ones, dozens of them, dented, upside down in the grass. The 9th does not know why. The marines are coming back down off the hills in their squads, filthy, grinning, carrying their crates empty, and the 9th, watching them come, decides it does not want to know.

The word comes down the column before the column has formed up. It comes in pieces. *The marines sat in the barrows all night, under the helms, and the rebels came at the helms, and the munitions came down on them.* *Eight hundred of them, the 8th says, which the 8th would.* And then a worse piece, quieter. *A picket was overrun, at the marines' end, in the fog. Fist Gamet of the 8th rode out to it. A munition killed his horse under him.* *Two marines of the 8th pulled him out of the mud.* *His legs are cut to pieces, they say. He's not right in the head, they say.* *He's given up his legion.*

And then, by noon: *Keneb's acting Fist. The captain with the boy.*

${b44Key() === 'picket' ? `On the way down off the hills, Radde comes up the line to the Third with the book under his arm. "The Fist asked," he says, "this morning, which squad held the far end." He looks at the Third. "I told him." He does not say what Blistig said. From his face, Blistig said something sour, and then remembered the name.` : `On the way through the camp, Radde comes past the wounded camp with the book under his arm, and stops at the awnings, and counts, and writes. "The corporal next along had a quiet night on the far end," he says. "I'd have given it to you, if you'd asked." He looks at the Seti. "You didn't."`}${b44Key() === 'picket' ? `\n\nAnd from the wounded camp, a quieter piece still: riders came in among the awnings in the small hours, and the squad next along held them off, mostly. Some of the Seti wounded did not see the morning.` : ''}${b44Say({tangle:`\n\nTangle looks up at the hills, at the empty helms on the barrows, a long time. "They sat in the barrows," he says, very softly, "under the helms, with the crates. All night." He shakes his head, slowly. "That's the most beautiful thing I ever heard of."`, _:''})}${b44R({orvas:`\n\nOrvas looks at the barrows with the helms on them. "A trap with nothing in it," he says, "and they came at it. In the fog." He nods, slowly. "Gall would like that."`, redblade:`\n\n"A Fist down," Ramin says, quietly. "In a fog. For a picket." He puts his helm on. "That is a soldier's way to fall, at least."`, warlock:`\n\n"*The boy's captain,*" the grandmother says, out of Keth, thoughtfully. "*Acting Fist.*" Keth, his own voice: "She liked him, in Aren. She says he has a good face for bad news."`})}`,
      ch:[{t:'Pick up one of the empty helms on the way past.', req:()=>!S.f.b4_c4_helm, fx:()=>{ S.f.b4_c4_helm = 1; gain('b4_c4_helm'); }, go:'b4_c4_helm'},
          {t:'Fall in. North.', onward:true, go:()=>chapterEnd(4, b44Key() || 'seti')},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b4_c4_helm:()=>({sp:'The morning', scene:'b4_c4_morning', txt:
`It is a plain Malazan helm, dented over one ear, with nobody in it and nothing to say whose it was, lying on its back on the near slope of a barrow with the dew in it. ${b4In('tallow') ? 'Tallow picks it up and pours the dew out and looks into it. "Empty," he says, as if he had expected something else.' : 'It comes up out of the grass light, and the dew runs out of it.'}

By the time the column is moving, the 9th has a name for it. *The marines' spare.* By the time the column halts at noon, half the 9th has walked over to look at it, and the other half has asked to wear it.${b44Say({darrut:` Darrut puts it on, solemnly, over his own, for a breath. It does not fit. He keeps it anyway.`, _:''})}`,
      ch:[{t:'Fall in. North.', onward:true, go:()=>chapterEnd(4, b44Key() || 'seti')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
