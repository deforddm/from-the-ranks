/* ============ Book Nine, Chapter 3: The Road East ============ */
/* The Third, with the heavies, on the road east out of Lether toward the Wastes' edge (R11 S5: the army departs). The fever that has half
   the Malazans (R11 S13) and the Letherii water cure, met through a Letherii healer of the escort lent to the Malazan fever-carts (never
   the Commander; dod-canon §4). Phase 1 (S.f.b9_c3_ph), the first night's camp by the road: a squadmate falls sick (S.f.b9_c3_sick, the
   engine's b9Fever; set when the chapter starts); Thallo; the fever-carts and the Letherii healer (the trick, The Letherii Cure); the
   reading at a stone by the road (B9READ[3]); Wastes dogs at the carts (b9_c3_dogs, optional). Phase 2, the next day: the column on the
   road among the last farms; Harro the sutler, selling dear; the last farm and the deserters in it (b9_c3_farm, main, stage 2); the
   farm's last stores (a rations check, +1 once: the chapter's anchor, shared with Duvo). Phase 3, the second night's camp: Thallo passes
   on what the sergeants said (secondhand, never their meeting) and the Witness beat at the fever-fire; the key at the fever-carts,
   S.f.b9_c3_key: 'boil' (stop and boil everything: b9Ration(-1), the fever breaks) or 'press' (keep the column's pace and trust the
   cure: b9Ration(1), the sick squadmate carries the fever to the fire). Phase 4, the Wastes' edge: Duvo the Akrynnai horse-trader
   (horse-meat, a rations check, +1 if the farm gave nothing; the Barghast war on the Akryn as news, the chapter's one rumour); raiders
   on his horses (b9_c3_road, optional); Harro again; the fire; out onto the Wastes.
   Notes for later chapters: docs/dod-ch3-notes.md. */
/* FOR THE ARTIST (163b): names this file uses.
   Items: ART['item/b9_c3_akrynknife'], ['item/b9_c3_boilingpot'], ['item/b9_c3_feverbark'].
   Figures: b9_c3_healer (the Letherii healer), b9_c3_harro (the sutler), b9_c3_duvo (the Akrynnai trader); placeholders here with ??=.
   Reused: b9_c1_thallo (161b), b2soldier (the old marine, the captain), b5_c5_refugee (the farm's old woman), b5_letherii (deserters).
   Backdrops: b9_road_east and b9_column (160's, yours), and three this file adds: b9_c3_fevercamp (the camp by the road at night, the
   fever-carts, a squad's fire by a stone), b9_c3_farm (the last farm by day), b9_c3_edge (the last water before the Wastes, by day).
   Ground (TILEX): b9_c3_road ('.' dry grass, ',' the road, 'x' scrub, '#' a field wall, 'w' a wagon, 'v' a fever-cart, 'H' Harro's
   wagon, 'T' a tent, 'F' a fire, 'm' a stone by the road, 'o' barrels, 'h' a horse picket, 'D' a trader's tent, 'r' bare stone, '<' '>'
   the road on), b9_c3_farm (the same, and 'Q' the farmhouse, 'D' its door, 'b' the barn, 'a' the barn door, 'W' the well, 'c' a cart,
   'k' a woodstack). Battle 't' is low cover. */

/* ---- small helpers (b93: Book Nine, Chapter Three) ---- */
const b93L = (id, n) => { if (b9In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b93Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b9In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b93If = (id, s) => b9In(id) ? (typeof s === 'function' ? s() : s) : '';
const b93Who = () => (ROLL() && ROLL().who) || 'sgt';
const b93Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b93Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b93V = (id, you, they) => id === 'sgt' ? you : they;
const b93And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b93Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const B93SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'wenna', 'hessa', 'rasp', 'tegra'];
const b93He = (id, cap) => B93SHE.includes(id) ? (cap ? 'She' : 'she') : (cap ? 'He' : 'he');
const b93His = id => B93SHE.includes(id) ? 'her' : 'his';
const b93Him = id => B93SHE.includes(id) ? 'her' : 'him';
/* the phase: 1 the first night's camp, 2 the next day (the road, the last farm), 3 the second night's camp (the Witness, the key),
   4 the Wastes' edge */
const b93Ph = () => S.f.b9_c3_ph || 1;
const b93Key = () => S.f.b9_c3_key || null;
const b93Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b9In(id));
const b93Sh = n => `${numw(n, true)} sharper${n === 1 ? '' : 's'}`;
const b93Found = () => !!S.f.b9_c3_found;
/* the sick squadmate (S.f.b9_c3_sick): chosen when the chapter starts, never the sergeant, the healers last */
const b93Sick = () => { const v = S.f.b9_c3_sick; return v && TPL[v] ? v : null; };
const b93SickIn = () => !!b93Sick() && b9In(b93Sick());
const b93SickN = () => b93SickIn() ? NAME(b93Sick()) : 'the heavy in the next blanket';
const b93Fevered = () => !!(S.injury && b93Sick() && S.injury[b93Sick()] === 'b9fever');
const b93Broke = () => !!S.f.b9_c3_feverBroke;
function b93Pick(){ const sq = (S.squad || []).filter(k => k !== 'sgt' && TPL[k] && b9In(k) && !(S.injury && S.injury[k]));
  const pool = sq.filter(k => !['marrow', 'mirrel'].includes(k)), use = pool.length ? pool : sq;
  return use.sort((a, b) => ((S.loy || {})[a] || 0) - ((S.loy || {})[b] || 0))[0] || null; }
function b93Fall(){ if (!b9On() || S.f.b9_c3_sick) return; const id = b93Pick(); if (!id) return; S.f.b9_c3_sick = id; b9Fever(id); save(); }
/* the fever does not break for an hour by a fire (engine change, this chapter only, guarded): while Chapter 3 plays, a rest or a fire sees
   to the wounds and leaves the march fever, until the squad stops and boils (the key, 'boil'); on 'press' it is carried to the chapter's
   end, and the next chapter's start clears it (037) */
{ const _ic = injuryClear; injuryClear = function(){ if (!(b9On() && S && S.chapter === 3 && S.injury) || S.f.b9_c3_feverBroke) return _ic();
    const keep = {}; Object.entries(S.injury).forEach(([k, v]) => { if (v === 'b9fever') keep[k] = v; }); const r = _ic();
    if (Object.keys(keep).length) S.injury = keep; return Array.isArray(r) ? r.filter(id => !keep[id]) : r; }; }
const b93Rest = t => rest(t);
/* the other squad, as camp talk: the Letherii healer's word on the escort's own company (Ch 2's key), one line */
const b93Other = () => (b9Key(2) || 'wagons') === 'drill' ? 'One of our companies went back to your drill sergeant\'s square on the last day and asked for more of it. The whole escort heard. They are very proud. I think they are mad.' : 'One of our companies loaded its wagons honest at the muster, our clerks say, every barrel where the book says. The clerks talk of nothing else. It has never happened before.';
/* Chapter One, remembered on the road */
const b93C1 = () => (b9Key(1) || 'stores') === 'street'
  ? `${b9In('haddat') ? 'Haddat' : b9In('marrow') ? 'Marrow' : 'Somebody in the squad'} still talks about the household in the quarter, the boy in the doorway waving. It is a long way back to that door now.`
  : `The quartermaster's rule from Letheras holds: the squad that sat on his stores eats out of them first. On the road east that is a biscuit before the rest get theirs, which is the best rule the Third has ever been under.`;

/* the chapter starts: the fever comes into the Third (the engine's b9Fever) */
{ const _sc = startChapter; startChapter = function(n){ const r = _sc(n); if (b9On() && n === 3 && S && S.chapter === 3) b93Fall(); return r; }; }

/* ---- The Letherii Cure: what the escort's healers show the Malazan fever-carts. Boil the water, all of it; salt and a little honey for the
   ones who cannot keep it down; boiled linen; the latrines dug downhill of the water. It copies the Rhivi Spirit-Song (song, t_song): a
   group heal, a full turn, and no ward (plain heal). Not sorcery. ---- */
Object.assign(TRICKS, {
  b9_c3_cure:{name:'The Letherii Cure', ch:3, use:'fight', ab:'t_b9_c3_cure', where:'the fever-carts on the road east, from a healer of the Letherii escort',
    lore:'Every skin and every pot boiled before anyone drinks from it, and boiled again if it stood. A pinch of salt and a little honey in the water for the ones who cannot keep it down, and keep giving it, a mouthful at a time, until they can. Linen boiled. Latrines downhill of the water, always. The Letherii healers have done it for their own fevers for longer than the Malazans have had an empire. It is not sorcery. It works anyway.',
    get fx(){ return `Once a fight: every squadmate within 4 drinks, and heals 1d6+2, and 1 more for each squad level past the first; it wakes the dazed and stops bleeding. Grows with level. Not sorcery. It takes the bearer's action.`; }},
});
Object.assign(AB, {
  t_b9_c3_cure:{name:TRICKS.b9_c3_cure.name, trick:'b9_c3_cure', self:true, desc:()=>TRICKS.b9_c3_cure.fx,
    run(u){ AUDIO.play('heal'); const near = party().filter(p => !p.ally && cheb(p, u) <= 4);
      near.forEach(p => { heal(p, roll(1, 6, 2 + lvB())); p.bleed = 0; if (p.stun) { p.stun = false; float(p, 'awake', '#9fe0b8'); } sparks(p.x, p.y, 10, '#c8dcd0', .35); });
      blog(`${u.name} goes down the line with the skin of boiled water, salt in it, a mouthful each, and waits while each one swallows. ${near.length > 1 ? 'The squad drinks.' : `${u.name} drinks last.`}`); }},
});

/* ---- borrowed pictures until the artist's file (163b) replaces them: three scenes, three figures, three items ---- */
{ const like = {b9_c3_fevercamp:'b9_camp_night', b9_c3_farm:'b9_road_east', b9_c3_edge:'b9_wastes'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof FIGX !== 'undefined') [['b9_c3_healer', 'b5_c5_refugee'], ['b9_c3_harro', 'b2soldier'], ['b9_c3_duvo', 'b3_rhivi_rider']].forEach(([k, l]) => { FIGX[k] ??= (ctx, h, t, o) => (FIGX[l] || (() => {}))(ctx, h, t, o); });
if (typeof ART !== 'undefined') [['b9_c3_akrynknife', 'b9_c1_gutterknife'], ['b9_c3_boilingpot', 'b9_c1_messtin'], ['b9_c3_feverbark', 'b9_c1_messtin']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });
if (typeof TILEX !== 'undefined') { TILEX.b9_c3_road ??= (...a) => (TILEX.b5_c5_farm || (() => {}))(...a); TILEX.b9_c3_farm ??= (...a) => (TILEX.b5_c5_farm || (() => {}))(...a); }

/* ---- the reading: a stone by the road at the first fever-fire ---- */
B9READ[3] = {scene:'b9_c3_fevercamp', where:'a flat stone by the road at the fever-fire', set:'Evening by the road east, the first fever-fire lit, and the sick laid out on blankets along the carts.', back:'b9_c3_fire', backT:'Back to the fire.',
  say:{marrow:'"The sick want the Queen tonight, child," Marrow says, "whether she comes or not." She lays a hand on the stone. "Warm still, from the sun. Sit. One card."',
       tallow:'"Grandmother read for the sick," Tallow says. "Never for herself. Said the cards are kinder to a fever than a fool." He unwraps the deck. "One?"',
       oldninth:'"Road east," the old marine says, "and half of us shaking." He sits on the stone as if he owned it. "Cards don\'t mind a fever. One, and then I sleep."'}};

/* ---- the words this chapter adds to Book Nine's glossary ---- */
GLOSSX.dod.push(
  [3, 'The fever-carts', 'The carts at the tail of the column where the Malazans\' sick ride or lie in rows, on the road east out of Lether. A fever went through the army in the first days of the march.', ()=>!!(S && S.f && S.f.b9_c3_ph)],
  [3, 'The Letherii cure', 'What the Letherii escort\'s healers taught the Malazan fever-carts: boil every drop, salt and honey in it for the ones who cannot keep it down, boiled linen, latrines downhill of the water. Not sorcery.', ()=>!!(S && S.f && S.f.b9_c3_healer)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.dod = ROSTER_FIRES.dod || {}; ROSTER_FIRES.dod[3] = ['b9_c3_fire'];

const B9CH3 = {
  title:B9CH[3], number:'Three',
  intro:{loc:'East of Letheras', sub:'The road east · evening', scene:'b9_column', cap:'Files of soldiers on a track that is mostly dust, wagons behind, and the long shadow of a column that has been walking since dawn.',
    paras:[
`The army is out of Letheras and walking east, and has been for days. The road started as a Letherii road, paved and ditched and milestoned. It is becoming something else as it goes, a little at a time: a track with wheel-ruts, then a track with dust.`,
()=>{ const v = b93Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, Third squad, 9th Legion, marching with the heavies. ${v.length ? `${b93And(v)} ${v.length > 1 ? 'walk' : 'walks'} with you.` : 'The Third, today, is you.'} Nobody has said why the army is going east. The clerks still say Kolanse, as if saying it often enough would put it on a map.`; },
`On the second day a fever came down the column from the front, and the fever-carts at the back filled up before noon. Tonight it has come into the Third.`],
    go:'Into the camp', node:'b9_c3_start'},

  areas:[
    /* 16 x 12 (b9_c3_road, night). . dry grass  , the road  x scrub  T tents  w wagons  v the fever-carts  F the Third's fire  m a stone by
       the road  o barrels  > the road east */
    { id:'b9_c3_camp', title:'The road east · the column\'s camp', sub:'Night · the fever-carts full', hint:'Tap ground to move · tap a figure to talk · the fever-carts are north of the road, the fire south', decor:'b9_c3_road', dark:true,
      map:[ "xxxx..xxxxx..xxx",
            "x.T.T.T....T.T.x",
            "x..............x",
            "x.w....vv......x",
            "x..............x",
            ",,,,,,,,,,,,,,,>",
            ",,,,,,m,,,,,,,,,",
            "x..............x",
            "x....F.........x",
            "x.T.....o..w...x",
            "x..............x",
            "xxxxxxxxxxxxxxxx" ],
      walk:'.,', triggers:{F:'b9_c3_fire', v:'b9_c3_carts', m:'b9_c3_stone', '>':'b9_c3_camp_east'}, start:{x:4, y:7},
      quest:()=> b93Ph() === 1 ? (!S.f.b9_c3_orders1 ? 'Thallo, by the road. He has the word from the front.' : !S.f.b9_c3_healer ? 'The fever-carts. A Letherii healer is going down them.' : 'The fire, and sleep. The column moves at first light.')
        : !S.f.b9_c3_orders3 ? 'Thallo, at the fire. He has been to the sergeants\' fires.' : !b93Key() ? `The fever-carts. ${b93SickIn() ? NAME(b93Sick()) + ' is worse.' : 'The sick are worse.'}` : 'First light.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:9, y:4, node:()=>b93Ph() === 1 ? 'b9_c3_thallo' : 'b9_c3_thallo3', fresh:()=>b93Ph() === 1 ? !S.f.b9_c3_orders1 : !S.f.b9_c3_orders3},
        {id:'healer', name:'A Letherii healer', kind:'b9_c3_healer', x:6, y:4, node:()=>'b9_c3_healer', show:()=>b93Ph() === 1, fresh:()=>!S.f.b9_c3_healer},
        {id:'brask', name:'Brask', kind:'brask', x:10, y:2, node:()=>'b9_c3_brask', show:()=>b93Ph() === 1 && b9In('brask'), fresh:()=>!S.f.b9_c3_brask},
        {id:'old', name:'The old marine', kind:'b2soldier', x:12, y:8, node:()=>'b9_c3_oldmarine', fresh:()=>!S.f.b9_c3_old},
        {id:'dogs', name:'Eyes past the carts', kind:'b5_c7_greatwolf', x:13, y:2, node:()=>'b9_c3_dogs', show:()=>!S.f.b9_c3_dogsDone && !!S.f.b9_c3_healer, fresh:()=>true} ] },

    /* 16 x 12 (b9_c3_road, day). The column halted at noon among the last farms: w wagons  H Harro's wagon  # a field wall  < back west
       > the lane to the last farm */
    { id:'b9_c3_road', title:'The road east · the last farms', sub:'Day · the column halted at noon', hint:'Tap ground to move · tap a figure to talk · the farm lane is east, the sutler west', decor:'b9_c3_road',
      map:[ "xx...xxxxx...xxx",
            "x...w...w...w..x",
            "x..............x",
            ",,,,,,,,,,,,,,,,",
            "<,,,,,,,,,,,,,,,",
            "x..............x",
            "x.H.....######.x",
            "x.......#....#.x",
            "x.......#......>",
            "x.......#####..x",
            "x..x.......x...x",
            "xxxxxxxxxxxxxxxx" ],
      walk:'.,', triggers:{H:'b9_c3_harro', '<':'b9_c3_road_west', '>':'b9_c3_lane'}, start:{x:4, y:5},
      quest:()=> !S.f.b9_c3_orders2 ? 'Thallo, by the wagons. The quartermaster has a job.' : !S.f.b9_c3_farmDone ? 'The lane east, to the last farm.' : 'Back to the column. It makes camp at dusk.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:6, y:5, node:()=>'b9_c3_thallo2', fresh:()=>!S.f.b9_c3_orders2},
        {id:'harro', name:'Harro, the sutler', kind:'b9_c3_harro', x:3, y:7, node:()=>'b9_c3_harro', fresh:()=>!S.f.b9_c3_bark} ] },

    /* 16 x 12 (b9_c3_farm, day). The last farm: Q the farmhouse, D its door  b the barn, a its door  W the well  c a cart  k a woodstack
       < back to the road */
    { id:'b9_c3_farm', title:'The road east · the last farm', sub:'Afternoon · the fields gone to dust', hint:'Tap ground to move · tap a figure to talk · the house is north-west, the barn north-east, the well in the yard', decor:'b9_c3_farm',
      map:[ "################",
            "#QQQQ#....#bbbb#",
            "#QQDQ#....#bbab#",
            "#..............#",
            "#.......W......#",
            "#..............#",
            "#.c...........k#",
            "#..............#",
            "<..............#",
            "#..............#",
            "#######..#######",
            "################" ],
      walk:'.', triggers:{D:'b9_c3_door', a:'b9_c3_barn', W:'b9_c3_well', '<':'b9_c3_farm_back'}, start:{x:2, y:8},
      quest:()=> !S.f.b9_c3_farmDone ? 'The farmhouse door. There are men inside who are not farmers.' : !S.f.b9_c3_farmer ? 'The old woman in the yard.' : 'Back to the road. The column makes camp at dusk.',
      npcs:[
        {id:'men', name:'Men at the farmhouse door', kind:'b5_letherii', x:4, y:3, node:()=>'b9_c3_door', show:()=>!S.f.b9_c3_farmDone, fresh:()=>true},
        {id:'farmer', name:'An old woman', kind:'b5_c5_refugee', x:6, y:5, node:()=>'b9_c3_farmer', show:()=>!!S.f.b9_c3_farmDone, fresh:()=>!S.f.b9_c3_farmer},
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:3, y:9, node:()=>'b9_c3_farm_thallo', fresh:()=>false} ] },

    /* 16 x 12 (b9_c3_road, day). The last water before the Wastes: r bare stone  h Duvo's horse picket  D his tent  H Harro's wagon  F the
       fire  w wagons  > the road east, onto the Wastes */
    { id:'b9_c3_edge', title:'The Wastes\' edge · the last water', sub:'Day · the grass giving out', hint:'Tap ground to move · tap a figure to talk · the trader is north of the road, the fire south', decor:'b9_c3_road',
      map:[ "rrr..rrrrr...rrr",
            "r..............r",
            "r.hhh.....D....r",
            "r..............r",
            ",,,,,,,,,,,,,,,>",
            ",,,,,,,,,,,,,,,,",
            "r..............r",
            "r.H.....F......r",
            "r..............r",
            "r...w..w...rr..r",
            "r..............r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.,', triggers:{h:'b9_c3_horses', D:'b9_c3_duvo', H:'b9_c3_harro', F:'b9_c3_fire', '>':'b9_c3_edge_east'}, start:{x:1, y:5},
      quest:()=> !S.f.b9_c3_duvo ? 'The horse-trader by the road. An Akrynnai, Thallo says.' : 'The fire. Then the Wastes.',
      npcs:[
        {id:'duvo', name:'Duvo, the horse-trader', kind:'b9_c3_duvo', x:11, y:3, node:()=>'b9_c3_duvo', fresh:()=>!S.f.b9_c3_duvo},
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:6, y:6, node:()=>'b9_c3_thallo4', fresh:()=>!S.f.b9_c3_orders4} ] } ],

  battles:{
    /* the deserters in the last farm: the yard, then the barn behind */
    b9_c3_farm:{title:'The last farm', style:'b9_c3_farm', warrenText:'Afternoon at the last farm in Lether · dust on everything · the warrens thin and far off', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","..t.....","....t...","........","#......#","..t..t..","........","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_heavy',1,8]],
      foes:[['b9_deserter',2,1],['b9_deserter',5,1],['b9_deserter',4,2],['b9_deserterbow',3,0]], xp:380, after:'b9_c3_farm_after',
      preText:()=>`Four of them come out of the house into the yard, Letherii army coats with the badges cut off and the farm's flour on their boots. They have been told the Malazans are a day ahead. They were told wrong.`,
      stage2:{title:'The barn', xp:170,
        text:()=>`The yard is the Third's. The barn is not. A man with an officer's sword and a deserter's coat is in the barn door with the farm's cart half loaded behind him, and he is not running, because the cart is all he has.${b93If('brask', `\n\nBrask looks at the cart, and then at the man. "Leave it," he says. "You'll live longer." The man does not leave it.`)}`,
        map:["#..tt..#","........","..t..t..","........","........","...t....","........",".t....t.","........","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b9_desertercap',3,1]]} },
    /* Wastes dogs at the fever-carts, the first night: optional */
    b9_c3_dogs:{title:'The fever-carts', style:'b9_c3_road', dark:true, warrenText:'Night by the road east · the sick lying in rows · the warrens thin', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t.....","......t.","........","...t....","........",".t......","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b9_dog',1,1],['b9_dog',6,1],['b9_dog',3,0],['b9_dog',5,2]], xp:100, after:'b9_c3_dogs_after',
      preText:()=>`Big lean dogs, four of them, grey as the grass, come in low out of the dark toward the carts where the sick lie. They have smelled the fever. They think it means the herd is weak.`},
    /* raiders on Duvo's horses at the Wastes' edge: optional */
    b9_c3_road:{title:'The trader\'s horses', style:'b9_c3_road', warrenText:'The Wastes\' edge by day · bare stone, dry grass · the warrens far off', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","...t....","........","..t..t..","........","........","....t...","........","........","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b9_raider',2,1],['b9_raider',5,1],['b9_raider',4,2],['b9_raiderchief',3,0]], xp:140, after:'b9_c3_road_after',
      preText:()=>`Four of them in a dry wash with the trader's horses on a rope, riders' leathers, faces wrapped against the dust. They are not Akrynnai and not Barghast. They are what the edge of any country grows.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b9_c3_akrynknife:{name:'An Akrynnai knife', slot:'weapon', role:'blade', who:null, atk:2, dmg:[1,8,3],
      line:'A horse-trader\'s long knife with a horn grip wrapped in rawhide and a blade worn narrow in the middle from the stone. Duvo carried it across the plains for years and says it has cut more rope than men. He says it in a way that leaves the count of men open. It is the best steel the Third has seen since Letheras.'},
    b9_c3_boilingpot:{name:'A healer\'s boiling-pot', slot:'trinket', role:'any', who:null, hp:3,
      line:'A small blackened copper pot with a bail handle and a lid that fits, the kind the Letherii healers hang over every fire on the march. The healer who taught the Third the cure gave it over without ceremony. Whoever carries it boils the squad\'s water at every halt, and is thanked for it less than they deserve.'},
    b9_c3_feverbark:{name:'A twist of fever-bark', slot:'trinket', role:'any', who:null, hp:2,
      line:'A twist of oiled cloth holding curls of a bitter red bark, the kind sutlers sell to soldiers on every road out of every city. Harro swears by it. Chewed, it tastes like a punishment and makes the sweats a little easier to stand. Kept in a pocket, it makes the soldier feel looked after, which may be most of it.'} },

  scenes:{
    b9_c3_fevercamp:{loc:'The road east', sub:'The column\'s camp · night', cap:'A camp strung out along the road, tents and drawn-in wagons, the fever-carts with their sick in rows, and a squad\'s small fire beside a flat stone.', amb:'explore'},
    b9_c3_farm:{loc:'The road east', sub:'The last farm · afternoon', cap:'A mud-brick house and a barn at the end of Lether, a well with its bucket gone, and fields gone to dust to the edge of the sky.', amb:'explore'},
    b9_c3_edge:{loc:'The Wastes\' edge', sub:'The last water', cap:'Grass giving out to bare stone, a horse-trader\'s string on a picket, and the column\'s camp spread along the road at the last water before the Wastes.', amb:'explore'} },

  end:{
    boil:['The fever broken', 'On the road east out of Lether the fever came down the column, and into the Third. A Letherii healer of the escort showed the squad the cure: boil every drop, salt in it, a mouthful at a time. When the order came to keep the column\'s pace, the Third fell out instead and boiled everything it owned, and sat with its sick until the fever broke, and lost its place at the wagons for it. Then it marched hard, and caught the column at the Wastes\' edge, and walked out onto the Wastes with it.'],
    press:['The column\'s pace', 'On the road east out of Lether the fever came down the column, and into the Third. A Letherii healer of the escort showed the squad the cure: boil every drop, salt in it, a mouthful at a time. When the order came to keep the column\'s pace, the Third kept it, and kept its place at the wagons, and trusted the cure, and carried its sick along at the tail of the carts. At the Wastes\' edge it walked out onto the Wastes with the column, still carrying the fever with it.'] },
  endScene:'b9_column',
  endCap:()=> b93Key() === 'press' ? 'The column walking out onto the Wastes, the fever-carts at its tail, and a squad among the files with one of its own still shaking.' : 'The column walking out onto the Wastes, and a squad that caught it two days late, every skin in its kit boiled twice.',
  tease:'Next: the Letherii. The escort\'s own column into the Wastes, a ration book that will not add up, and a border scout who knows what the grass is saying.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b9_c3_sick && TPL[f.b9_c3_sick]) x.push(f.b9_c3_key === 'boil' ? `The fever took ${NAME(f.b9_c3_sick)} on the road east. The Third stopped and boiled everything, and it broke.` : f.b9_c3_key === 'press' ? `The fever took ${NAME(f.b9_c3_sick)} on the road east. The Third kept the column's pace, and ${NAME(f.b9_c3_sick)} walked out onto the Wastes still shaking with it.` : `The fever took ${NAME(f.b9_c3_sick)} on the road east.`);
    if (f.b9_c3_cureOk) x.push('A Letherii healer of the escort taught the Third the cure for the march fever. Boil it. All of it.');
    if (f.b9_c3_farmDone) x.push('Deserters were cleared out of the last farm in Lether, and an old woman kept her house.');
    if (f.b9_c3_found) x.push(f.b9_c3_found === 'farm' ? 'The last farm sold the Third what it could spare.' : 'Duvo the Akrynnai traded the Third horse-meat at the Wastes\' edge.');
    if (f.b9_c3_roadDone) x.push('Raiders on an Akrynnai trader\'s horses met the Third at the Wastes\' edge, and the trader got his horses back.');
    if (f.b9_c3_dogsDone) x.push('Wastes dogs came for the fever-carts the first night. They did not get to them.');
    if (S.b9 && S.b9.wit && S.b9.wit.c3) x.push(S.b9.wit.c3 === 'kept' ? 'Asked what it marches for, the Third had an answer.' : 'Asked what it marches for, the Third said the column was going, so it went.');
    if (b9In('brask')) x.push('Brask carried water down the fever-carts the first night, and did not say why.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b9_c3_key && (f.b9_c3_key === 'boil' ? 'The Third fell out of the column and boiled everything it owned, and the fever broke. It cost a day and a place at the wagons.' : 'The Third kept the column\'s pace and its place at the wagons, and trusted the cure. The fever came with it.'),
    f.b9_c3_orders3 && 'The marines\' sergeants say surviving isn\'t what this is about. Thallo had it from a heavy who had it from a marine.',
    f.b9_c3_duvo && 'Duvo, an Akrynnai horse-trader at the Wastes\' edge. He says the Barghast have gone to war with his people on the plains to the north.',
    f.b9_c3_farmDone && 'The last farm in Lether, and deserters in it with a cart half loaded. An old woman stayed.',
    f.b9_c3_bark && 'Harro, a sutler following the column, sells fever-bark at a price that would make a Letherii clerk blush.',
    f.b9_c3_cureOk && 'The Letherii cure: boil the water, salt and honey for the ones who cannot keep it down, boil the linen, dig the latrines downhill.',
    f.b9_c3_sick && TPL[f.b9_c3_sick] && `The fever came into the Third on the road east. ${NAME(f.b9_c3_sick)} had it first.`,
    'The Third, with the heavies, on the road east out of Lether toward the Wastes.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the first night's camp ======== */
    b9_c3_start:()=>({sp:'The column\'s camp', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_ph = S.f.b9_c3_ph || 1; }, again:()=>'The camp by the road, the fever-carts full, the Third\'s fire small by its stone.', txt:
`The column camps where it stops, which tonight is a long strip of dry grass either side of the road, with the tents going up in rows and the wagons drawn in and the fever-carts at the back where the wind takes the smell away.

${b93SickIn() ? `${NAME(b93Sick())} sat down at the noon halt and did not get up again for a while. By evening ${b93He(b93Sick())} is shaking in a blanket by the Third's fire with ${b93His(b93Sick())} teeth going, sweating through the wool, and insisting ${b93He(b93Sick())} can march. ${b93He(b93Sick(), true)} cannot hold a cup.` : `The fever is two tents down, in the heavies' lines. The Third has been lucky so far, and knows better than to say so.`}

${b93Say({mirrel:`Mirrel has already been down the carts and back. "Half the column," she says. "Sweats, shakes, the flux. It came from the front." She looks at the Third's water skins. "It came in the water."`, marrow:`Marrow has her hand on ${b93SickIn() ? NAME(b93Sick()) + '\'s' : 'a sick heavy\'s'} forehead. "Soliel is listening tonight, child," she says. "But she wants us to do the work."`, _:'The squad gets the fire going and the sick under a blanket, and looks at the water skins as if they had done something.'})}${b93If('brask', `\n\nBrask is standing by the road watching the carts fill. "Heavies don't get fevers," he says. "That's what they told us in the 9th." He is quiet a while. "They told us a lot of things in the 9th."`)}

${b93C1()}

Down on the road, Thallo is coming along the camp with a heel of bread and the look of a man carrying word from the front.`,
      ch:[{t:'Thallo.', go:'b9_c3_thallo'},
          b9ReadChoice(3),
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b9_c3_read:()=>b9ReadOffer(3),
    b9_c3_card:()=>b9ReadCard(3),

    /* Thallo, the first night: the fever, and the Letherii healers coming down the carts */
    b9_c3_thallo:()=>({sp:'Thallo', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_orders1 = 1; }, again:()=>'Thallo, by the road, eating. "Letherii healers on the carts, Sergeant. First light, the march."', txt:
`"Captain's sick," Thallo says, before you ask. "Not bad. Sick. Half the company's sick." He tears the bread in two and looks at both halves. "Drill sergeant isn't. Drill sergeant says he's never been sick in his life and won't start now. He's grey as a tent."

He nods back up the camp toward the carts. "The Letherii sent their healers down the line at dusk. Their Commander's order, they say. Women in pale coats with pots, going cart to cart, telling our lot what to do with their own water." He chews. "Our lot are letting them. That's how sick our lot are."${b93SickIn() ? `\n\nHe looks at ${NAME(b93Sick())} in the blanket. "Get ${b93Him(b93Sick())} to the carts, or get the healer to ${b93Him(b93Sick())}. Either. They're going down every cart." He considers. "I'd get the healer. The carts smell."` : ''}`,
      ch:[{t:'"Where did it come from?"', go:'b9_c3_thallo_more'},
          {t:'The fever-carts.', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_thallo_more:()=>({sp:'Thallo', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_where = 1; }, txt:
`"The water," he says. "Everybody says the water. The front of the column drinks out of a stream, and then the horses go through it, and then the wagons, and then us at the back." He shrugs. "By the time it's our turn it's not a stream, it's soup."

He looks east along the road, where the column's fires go away in a line and stop. "Bonehunters, they call us now. Some clerk thought of it." He finishes the bread. "Never seen a bone I'd hunt. I've seen a lot of water I wouldn't drink, though."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Brask, the first night: carrying water (his own scene) */
    b9_c3_brask:()=>({sp:'Brask', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_brask = 1; }, again:()=>'Brask, going down the carts with a skin in each hand.', txt:
`Brask is going down the fever-carts with a water skin in each hand, from the Letherii healers' pots, giving a mouthful to every heavy who can lift a head, and holding the head for the ones who can't. He does it slowly, and does not talk, and does not stop.

"Two of mine had this," he says, when you come up. "At the river. Before the river. They got over it, and then the river had them anyway." He gives a man a mouthful. "Seemed a waste, to get over it." He moves to the next cart.${b93SickIn() ? `\n\n"I'll do ${NAME(b93Sick())} last," he says. "${b93He(b93Sick(), true)}'ll want to say ${b93He(b93Sick())} doesn't need it. Better if ${b93He(b93Sick())}'s too tired."` : ''}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the fever-carts: the healer (phase 1), the key (phase 3) */
    b9_c3_carts:()=>{ const ph = b93Ph();
      if (ph === 3 && S.f.b9_c3_orders3 && !b93Key()) return DLG.b9_c3_key();
      if (ph === 3) return {sp:'The fever-carts', scene:'b9_c3_fevercamp', txt: b93Key() ?
`The fever-carts in the dark, the sick in rows, the Letherii pots steaming on their tripods. ${b93Key() === 'boil' ? 'The Third\'s own pot is going by its own fire, and will be all night.' : 'The column moves at first light. The carts will be at the back of it.'}` :
`The fever-carts in the dark. ${b93SickIn() ? `${NAME(b93Sick())} is worse tonight.` : 'The sick are worse tonight.'} Thallo was looking for the Third, back at the fire.`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'The fever-carts', scene:'b9_c3_fevercamp', again:()=>'The fever-carts, the sick in rows, the Letherii pots steaming.', txt:
`The fever-carts are farm carts the quartermaster bought in the last town, with their sides let down and blankets laid in the beds, and the sick of half a dozen companies lying in them in rows, or sitting propped against the wheels. The smell is what it is.

Between the carts, on tripods over small fires, the Letherii healers' pots are boiling. A woman in a pale coat is going from cart to cart with a ladle and a skin, and nobody is arguing with her.`,
        ch:[{t:'The healer.', go:'b9_c3_healer'},
            {t:'Back to the camp.', go:()=>startExplore()}]}; },

    /* the Letherii healer: the cure, and the trick */
    b9_c3_healer:()=>({sp:'A Letherii healer', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_healer = 1; }, again:()=> S.f.b9_c3_cureTried ? 'The Letherii healer, going down the carts with her ladle. "Boil it. All of it."' : 'The Letherii healer, at the carts, with her pot and her ladle.', txt:
`She is a Letherii of fifty or so, in a pale linen coat with the sleeves tied back and a copper pot on a tripod, and she talks while she works, the trade-tongue first and then Malazan when she finds it does not land.

"Your soldiers drink anything," she says. "A ditch. A hoofprint with rain in it. Then they lie in my carts and ask me why." She ladles water into a skin, salts it, drips honey in from a jar. "We have had this fever in Lether since before your empire. Every summer, in the low towns. It is not a god's curse. It is the water."

${b93SickIn() ? `She looks at ${NAME(b93Sick())}, at the shaking and the grey lips, and nods. "This one is not so bad yet. Keep ${b93Him(b93Sick())} drinking. Mine, not yours."` : `She looks at the Third's water skins with an expert's contempt. "Whose are those? Empty them."`}${b93If('mirrel', `\n\nMirrel has come to stand at her elbow and is watching every move of the ladle. "Li Heng did this," she says. "Not the honey. We did not have the honey." The healer looks at her for a moment and hands her the jar.`)}

${b93Other()}`,
      ch:[{t:'Learn it properly: the boiling, the salt, the count, the latrines. All of it.', check:['wits', 19], trick:'b9_c3_cure', req:()=>!S.f.b9_c3_cureTried, fx:()=>{ S.f.b9_c3_cureTried = 1; },
            edges:id=>[id === 'mirrel' && ['she nursed the fevers in Li Heng', 2], id === 'marrow' && ['a healer of Soliel knows what a fever wants', 2], id === 'haddat' && ['a water-seller\'s daughter knows bad water', 1], id === 'wenna' && ['she knows where water goes bad', 1], id === 'mehet' && ['Y\'Ghatan\'s cisterns had their own fevers', 1], id === 'doss' && ['the holdings boiled the well water in a bad summer', 1], id === 'sgt' && ['the camp fevers on the Seven Cities road', 1], id === 'brask' && ['heavies drink what\'s in the skin', -1], id === 'tangle' && ['he keeps trying to measure the salt', -1]],
            go:'b9_c3_cure_ok', fail:'b9_c3_cure_no'},
          {t:'"Show us what to do for ours, then."', go:'b9_c3_sick', req:()=>b93SickIn() && !S.f.b9_c3_tended},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_cure_ok:()=>({sp:'A Letherii healer', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_cureOk = 1; if (!S.f.b9_c3_pot) { S.f.b9_c3_pot = 1; gain('b9_c3_boilingpot'); } }, txt:
`She shows it once, and then makes ${by({sgt:'you', mirrel:'Mirrel', marrow:'Marrow', _:'{who}'})} do it while she watches: the skin emptied, the pot brought to the boil and held there, a count of a hundred, the salt, the honey, the mouthful at a time and the wait between. Linen into the pot after. The latrines dug downhill of the water, always, and the next company told where they are.

"Good," she says, at the end, as if she did not expect to say it. She unhooks a small copper pot from her belt and puts it in ${by({sgt:'your', _:'{who}\'s'})} hands. "I have three. You have none. Every halt, boil. Your soldiers will hate you. They will live."`,
      ch:[{t:'Back to the carts.', go:()=>startExplore()}]}),
    b9_c3_cure_no:()=>({sp:'A Letherii healer', scene:'b9_c3_fevercamp', fx:()=>{ if (!S.f.b9_c3_pot) { S.f.b9_c3_pot = 1; gain('b9_c3_boilingpot'); } }, txt:
`It goes wrong at the count. Somebody takes the pot off the fire at sixty because it looks boiled, and somebody else salts it twice, and the healer takes the ladle back without a word and does it again herself, fast, as she has done it ten thousand times.

"Boil it," she says. "That is the whole of it. The rest is my work." She unhooks a small copper pot from her belt anyway and hands it over. "Every halt. Boil. Count to a hundred. Do not be clever."`,
      ch:[{t:'Back to the carts.', go:()=>startExplore()}]}),
    /* keeping the sick going (a rations check: food and water matter here) */
    b9_c3_sick:()=>({sp:b93SickIn() ? NAME(b93Sick()) : 'The sick', scene:'b9_c3_fevercamp', again:()=> b93SickIn() ? `${NAME(b93Sick())}, in the blanket by the fire, shaking.` : 'The sick, in their rows.', txt: !b93SickIn() ?
`The heavies in the carts are drinking what the Letherii give them, a mouthful at a time. There is nothing the Third can add to it but water.` :
`${NAME(b93Sick())} is by the fire in a blanket, grey, shaking, ${b93His(b93Sick())} jaw clamped. ${b93He(b93Sick(), true)} will not drink. ${b93He(b93Sick(), true)} says the water is what did it, and ${b93He(b93Sick())} is not wrong, and that is no help at all.

The healer has given the squad a skin of her own, boiled and salted. The trick, she says, is to get it in a mouthful at a time, all night, whether ${b93He(b93Sick())} wants it or not.`,
      ch: !b93SickIn() ? [{t:'Back to the camp.', go:()=>startExplore()}] :
        [{t:`Sit with ${b93Him(b93Sick())} and get it into ${b93Him(b93Sick())}, a mouthful at a time, all night.`, check:['wits', 17], rations:true, req:()=>!S.f.b9_c3_tendTried, fx:()=>{ S.f.b9_c3_tendTried = 1; },
            edges:id=>[id === 'mirrel' && ['she has sat up with a thousand fevers', 2], id === 'marrow' && ['she has sat up with more', 2], id === 'haddat' && ['her mother rationed water by the mouthful', 1], id === 'brask' && ['he did this for two of his own', 1], id === 'sathi' && ['she would sooner tie the sick down', -1], id === 'ottar' && ['his Malazan fails him at the bedside', -1]],
            not:[b93Sick()].filter(Boolean),
            near:{t:()=>`Yes, but it takes all night, and ${b93Nm(b93Who())} ${b93V(b93Who(), 'get', 'gets')} no sleep and ${b93V(b93Who(), 'carry', 'carries')} it into the morning: rattled.`, fx:()=>b93Rattle(b93Who())},
            go:'b9_c3_sick_ok', fail:'b9_c3_sick_no'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_sick_ok:()=>({sp:b93SickIn() ? NAME(b93Sick()) : 'The sick', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_tended = 'ok'; b93L(b93Sick(), 1); }, txt:
`It takes most of the night. A mouthful, and a wait, and another. ${b93SickIn() ? NAME(b93Sick()) : 'The sick one'} fights it for the first hour and then stops fighting it, and somewhere before dawn the shaking eases, and the sweat is only sweat.

"Still sick," the healer says, going by with her ladle, and looks. "Less." From her, it is a great deal.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c3_sick_no:()=>({sp:b93SickIn() ? NAME(b93Sick()) : 'The sick', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_tended = 'tried'; }, txt:
`It does not go in. ${b93SickIn() ? NAME(b93Sick()) : 'The sick one'} turns ${b93SickIn() ? b93His(b93Sick()) : 'the'} head away from every mouthful, and the skin goes on the blanket as often as anywhere, and by midnight the healer comes and takes over, and gets it in herself, in a manner that admits no argument.

"You tried," she says. It does not sound like praise.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the stone by the road: the reading's place */
    b9_c3_stone:()=>({sp:'A stone by the road', scene:'b9_c3_fevercamp', again:()=>'The flat stone by the road, still warm from the day.', txt:
`A flat grey stone by the road, waist-high, old, with a groove worn across the top where somebody long before Lether sharpened something on it, year after year. It holds the day's warmth after dark. ${b93Ph() === 1 && !S.f.b9_c3_drawn && !S.f.b9_c3_noCard ? 'It would take a deck of cards laid out flat.' : 'Somebody has left a tin cup on it.'}`,
      ch:[...(b93Ph() === 1 ? [b9ReadChoice(3)] : []),
          {t:'Back to the camp.', go:()=>startExplore()}]}),
    /* the old marine, walking with the heavies again */
    b9_c3_oldmarine:()=>({sp:'The old marine', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_old = 1; }, again:()=>'The old marine by his own small fire, with his cup.', txt: b93Ph() >= 3 ?
`The old marine has his boots off and his feet to his fire. "Two days in and the column's shaking like a dog," he says. "Seen it before. The ones who boil their water live. The ones who don't, march lighter." He drinks from his cup. Boiled, he says.` :
`The old marine from the barracks has his own small fire beside the Third's, with a cup and his deck, and no fever. "Never had one," he says. "Drink rum. Fever doesn't like rum." He considers his cup. "Rum doesn't like me either. We get on."

He shuffles the deck one-handed. "Stone over there'd take a reading, if anybody wanted one."`,
      ch:[...(b93Ph() === 1 ? [b9ReadChoice(3)] : []),
          {t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Wastes dogs at the fever-carts: optional */
    b9_c3_dogs:()=>({sp:'Past the carts', scene:'b9_c3_fevercamp', txt:
`Out past the last of the fever-carts, where the camp ends and the dark begins, there are eyes in the grass. Four pairs, low, green in the firelight, and very patient.

Wastes dogs. The heavies say they follow the column for what it leaves. Tonight they have smelled the sick.${b93If('wenna', `\n\nWenna is looking at the tracks at the camp's edge. "Big," she says. "Hungry. They have been following since the last town."`)}`,
      ch:[{t:'"Third, with me." Go out and meet them.', go:()=>startBattle('b9_c3_dogs', {})},
          {t:'Brands from the fire, and noise. Drive them off without a fight.', check:['might', 17],
            edges:id=>[id === 'brask' && ['a heavy in scale makes a lot of noise', 2], id === 'ottar' && ['grey plate, firelit, is a terrible thing to a dog', 1], id === 'haddat' && ['the blue shield and a brand', 1], id === 'doss' && ['he kept dogs off the holding\'s goats', 1], id === 'marrow' && ['she is too old to run at dogs, child', -2], id === 'mehet' && ['he was bitten once, as a boy, and remembers', -1]],
            near:{t:()=>`Yes, but one of them stands its ground long enough to open ${b93Nm(b93Who())} up along the forearm before it goes. ${b93Nmc(b93Who())}'ll feel it in the next fight.`, fx:()=>bruise(b93Who(), bruiseN())},
            go:'b9_c3_dogs_gone', fail:'b9_c3_dogs_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_dogs_gone:()=>({sp:'Past the carts', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_dogsDone = 'driven'; }, txt:
`The Third goes out into the grass with brands from the fire held high and the loudest noise it can make. The dogs think about it, and then they go, back into the dark, all four, in no hurry.

They will be there tomorrow night. But the carts sleep.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c3_dogs_seen:()=>({sp:'Past the carts', scene:'b9_c3_fevercamp', txt:
`The brands do not impress them. The biggest one lowers its head, and the others spread out to either side of it in the grass, as a pack does when it has decided.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c3_dogs', {surprise:'e'})}]}),
    b9_c3_dogs_after:()=>({sp:'Past the carts', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_dogsDone = 'fought'; }, txt:
`The grass is quiet. The heavies on the nearest carts, the ones who could lift their heads to watch, lie back down.

${b93Say({brask:`Brask drags the dogs out past the camp's edge by their hind legs, one at a time. "Others will eat these," he says. "Better them than ours."`, haddat:`Haddat stands over the last of them with the shield on her arm and says the word she says for the dead she has no name for. It is a dog. She says it anyway.`, _:'The squad goes back to its fire and sits closer to it.'})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the camp's east end: by phase */
    b9_c3_camp_east:()=>({sp:'The road east', scene:'b9_c3_fevercamp', txt:
`The road goes on east out of the camp, pale in the dark, and the column's other fires go away along it in a line for a league or more, and stop. Past the last of them there is nothing but the dark and the stars, and a long low smell of dry grass.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ======== the fire: by phase. 1 the first night, 3 the second night, 4 the Wastes' edge. The games pass wraps this node: keep the id ======== */
    b9_c3_fire:()=>{ const ph = b93Ph(), edge = ph >= 4, rk = 'b9_c3_rest' + (edge ? 4 : 1);
      return {sp:'The Third\'s fire', scene:edge ? 'b9_c3_edge' : 'b9_c3_fevercamp', html:rationsHTML(),
        again:()=> edge ? 'The Third\'s cook-fire at the last water, the Wastes beyond it.' : 'The Third\'s fever-fire by its stone, the sick in their blankets.', txt:
`${edge ? `The Third's fire at the last water is dung and dry grass, because there is no more wood. It burns hot and fast and smells of the herds that left it.${b93Key() === 'press' && b93SickIn() ? ` ${NAME(b93Sick())} sits closest, still in the blanket, still shaking at dusk.` : b93Key() === 'boil' ? ' The healer\'s pot is on it, as it is at every halt now. The pot is not argued with.' : ''}` : ph === 3 ? `The Third's fire by its flat stone is a fever-fire tonight, as half the fires in the camp are: a pot on it, a skin by it, and somebody in a blanket beside it who is not getting better.` : `The Third's fire is a small one by a flat stone at the edge of the road, with a pot on it and the fever-carts behind. ${b93SickIn() ? `${NAME(b93Sick())} is in a blanket on the warm side.` : 'The heavies\' sick are in the carts behind.'}`}${b93If('brask', edge ? `\n\nBrask has his back to the fire and his face to the Wastes, looking at all that nothing.` : `\n\nBrask sits a little back from the fire, with a water skin across his knees, waiting for it to cool.`)}`,
        ch:[...(ph === 1 ? [b9ReadChoice(3)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk] && (ph === 1 || edge), fx:()=>{ S.f[rk] = 1; b93Rest(edge ? 'The squad sits an hour at the last water. Wounds close, mostly.' : 'The squad sits an hour by the fever-fire. Wounds close, mostly. The fever does not.'); }, go:'b9_c3_fire_rest'},
            {t:'Talk with the squad.', go:'b9_c3_fire_talk'},
            {t:'"What are we marching for?"', req:()=>ph === 3 && !!S.f.b9_c3_orders3 && !(S.b9 && S.b9.wit && S.b9.wit.c3), go:'b9_c3_witness'},
            {t:'Turn in. The column moves at first light.', req:()=>ph === 1 && !!S.f.b9_c3_healer, onward:true, go:'b9_c3_turnin'},
            {t:'The fever-carts. The captain\'s word.', req:()=>ph === 3 && !!S.f.b9_c3_orders3 && !b93Key(), onward:true, go:'b9_c3_key'},
            {t:'Out onto the Wastes, with the column.', req:()=>edge, onward:true, go:'b9_c3_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c3_fire_rest:()=>({sp:'The Third\'s fire', scene:b93Ph() >= 4 ? 'b9_c3_edge' : 'b9_c3_fevercamp', txt:
`${b93Ph() >= 4 ? 'An hour, then, at the last water, with the dung-fire ticking and the Wastes going blue in front of it.' : 'An hour, then, by the fever-fire, with the carts creaking behind and the pots going.'}

${b93Say({mirrel:`Mirrel goes round the squad with the boiled skin, one mouthful each, and watches each one swallow. "Drink. Good. Again."`, marrow:`Marrow goes round the squad with her hands, and stops at each of them long enough to frown. She closes a cut anyway.`, _:'Some of them sleep. The rest watch the pot.'})}${b93SickIn() && b93Fevered() ? `\n\n${NAME(b93Sick())} sleeps, or something like it. The fever does not care that it is a rest.` : ''}${b93If('haddat', `\n\nHaddat says the names of the dead under her breath, the long list, and stops at the end of it, and listens to the carts.`)}`,
      ch:[{t:'Back to the fire.', go:'b9_c3_fire'}]}),
    b9_c3_fire_talk:()=>{ const edge = b93Ph() >= 4, ln = [], sh = S.inv.sharper || 0, cu = S.inv.cusser || 0, sick = b93Sick();
      const me = id => id === sick && b93Fevered();
      if (b9In('haddat')) ln.push(me('haddat') ? `Haddat is in the blanket with the shield beside her, shaking, and furious about it. "My mother crossed the Pan'potsun on a skin a day," she says, through her teeth. "She never had a fever. I am ashamed."` : edge ? `Haddat is looking out at the Wastes. "My mother would have said there is water out there," she says, "if you know where the stones are." She thinks. "I do not know where the stones are."` : `Haddat is boiling the squad's skins one at a time, as the healer showed, and counting under her breath. "My mother counted water three times," she says. "Now I count it to a hundred." She does not seem to mind.`);
      if (b9In('sathi')) ln.push(me('sathi') ? `Sathi is in a blanket with her filed teeth chattering. "Weasels don't get fevers," she says. "Weasels get eaten." She closes her eyes. "I'd rather."` : edge ? `Sathi is grinning at the Wastes with her filed teeth. "Wide," she says. "No roads. No farms. No fences." She likes it. The rest do not.` : `Sathi has her knife out and is sharpening it at the fire, watching the dark past the carts. "The dogs are still out there," she says, pleased. "Good. Somebody's paying attention."`);
      if (b9In('tangle')) ln.push(me('tangle') ? `Tangle is in a blanket with the satchel under his head and the trip cord round both wrists, sweating. "${b93Sh(sh)}," he says, without being asked. "${numw(cu, true)} cusser${cu === 1 ? '' : 's'}. Count it for me. I keep losing my place."` : edge ? `Tangle has the satchel open at the last water. "${b93Sh(sh)}, ${numw(cu)} cusser${cu === 1 ? '' : 's'}," he says. "Same as Letheras. Same as tomorrow. Nobody out there is selling munitions." He shuts it, and looks at the Wastes. "Nobody out there is selling anything."` : `Tangle is keeping the satchel well away from the pot. "Water and sharpers," he says. "Not a mix."`);
      if (b9In('marrow')) ln.push(me('marrow') ? `Marrow is in the blanket, very small in it. "Soliel is laughing at me, child," she says. "Healer, heal thyself. I will. In a while."` : edge ? `Marrow is sitting with her eyes shut, facing east. "Soliel's door is open a crack, child," she says. "Further than I thought it would be, this far from anywhere." She opens one eye. "The Queen is with the sick. She always is."` : `Marrow has her knotted string out and is knotting it, one knot for every mouthful the sick have taken. "The Letherii woman knows her work," she says. "She does not pray while she does it. I pray for her. It is only fair."`);
      if (b9In('mirrel')) ln.push(me('mirrel') ? `Mirrel is in the blanket, telling whoever is nearest exactly how to nurse her, and in what order. "Mouthful," she says. "Wait. Mouthful. I know. I know what I look like."` : edge ? `Mirrel is checking the squad's feet again, every pair, one by one. "The road's done its worst," she says. "Out there it'll be stones." She frowns at a heel. "Stones are worse."` : `Mirrel is rolling boiled linen into her bag in tight rolls. "In Li Heng we did not have the honey," she says. "We lost more." She ties the bag. "I will remember the honey."`);
      if (b9In('doss')) ln.push(me('doss') ? `Doss is in the blanket, shaking. "On the holding," he says, "a fever summer, we buried one in five." He tries to laugh. "Don't count me yet."` : edge ? `Doss is looking at the grass running out into stone. "Nobody farms that," he says. "Nobody ever farmed that." He sounds almost relieved. "Nobody owed on it either."` : `Doss is watching the Letherii healers go down the carts. "On the holding, the healer came once a year, and charged," he says. "These ones don't charge." He frowns at it. "I don't trust it. I'll take it."`);
      if (b9In('wenna')) ln.push(me('wenna') ? `Wenna is in the blanket, shaking, and still listening to the water. "The Shore told me," she says. "In Letheras. The water was wrong." She shuts her eyes. "I should have listened harder."` : edge ? `Wenna has filled every skin at the last water and boiled half of them already. "Last water," she says. "The heavies keep calling it that." She ties the last skin off. "I wish they would stop."` : `Wenna has been up and down the stream the column drank from. "It's the horses," she says. "Front of the column waters the horses in it, and then it's ours." She sits. "We drink after the horses. That's the army."`);
      if (b9In('mehet')) ln.push(me('mehet') ? `Mehet is in the blanket, shaking, his ring of keys in his fist. "Y'Ghatan had this every summer," he says. "In the low town. I never once had it." He closes his eyes. "Saved it up, I suppose."` : edge ? `Mehet is looking at the bare stone. "No locks out there," he says. "No doors. No walls." He jingles the keys. "I'll carry these anyway."` : `Mehet is watching the healers' pots. "In Y'Ghatan they boiled the cistern water in a plague year," he says. "The rich did. The low town drank it as it was." He watches the pot. "This lot boil it for everybody."`);
      if (b9In('ottar')) ln.push(me('ottar') ? `Ottar is in the blanket with the grey plate off. It is the first time the squad has seen him without it. "Today's word," he says, very slowly, "is <em>fever</em>. I did not want it."` : edge ? `Ottar is looking out at the Wastes. "Today's word," he says, "is <em>edge</em>. The heavies say it." He tries it. "In Perish it means a blade. Here it means where the road stops." He thinks. "Both are true."` : `Ottar is helping the healer, lifting heavies in and out of the carts as if they were children. "Today's word," he says, "is <em>boil</em>. The healer says it a hundred times." He considers. "I have learned it."`);
      if (b9In('tallow')) ln.push(me('tallow') ? `Tallow is in the blanket, shaking, his grandmother's deck in its oilcloth under his hand. "She said the cards don't catch fevers," he says. "I'll have to trust them."` : edge ? `Tallow is eating his half-ration standing up. "Grandmother said never step off a road you can't see the end of," he says. He looks east. "Can't see the end of this one."` : `Tallow is boiling the squad's skins, badly, and being corrected by Mirrel. "Grandmother just drank rum," he says. "Lived to ninety." Mirrel hands him the pot back.`);
      if (b9In('hessa')) ln.push(me('hessa') ? `Hessa is in the blanket, shaking, the spear upright beside her anyway. "D'rek does not care for fevers," she says. "She cares for what comes after." She grips the spear. "Not yet."` : edge ? `Hessa has her palm flat on the bare stone. "D'rek is very far down out here," she says. "Further than I have ever felt her." She takes her hand back. "She is still there."` : `Hessa watches the pots boil. "In D'rek's temple the water is never boiled," she says. "It is blessed." She thinks about the carts. "Boiled is better."`);
      if (b9In('tebbet')) ln.push(me('tebbet') ? `Tebbet is in the blanket, shaking too hard to string the bow, and keeps trying. "Dry strings for the east," he says. "Wet hands. Wrong way round."` : edge ? `Tebbet has the bow strung and is looking at the open ground. "Clear shot to the horizon," he says. "Nothing in it to shoot." He unstrings it. "Yet."` : `Tebbet is waxing his bowstring by the fire. "Half the bowmen in the company are in the carts," he says. "If anything comes, it's us and the dogs."`);
      if (b9In('darrut')) ln.push(me('darrut') ? `Darrut is in the blanket, his helm on his chest. "The Aren Guard had a fever year," he says. "We stood the walls in our blankets." He closes his eyes. "Felt like this."` : edge ? `Darrut is watching the column spread out at the last water. "Aren had walls," he says. "Out there, the column is the wall." He looks at it. "It is a thin wall."` : `Darrut is looking at the fever-carts. "In Aren," he says, "the Guard's sick went home to their mothers." He shrugs. "These ones go in a cart."`);
      if (b9In('yorin')) ln.push(me('yorin') ? `Yorin is in the blanket with the copper wind-vane on his chest. "It's spinning," he says. "Or I am." He holds it still. "I am."` : edge ? `Yorin's copper wind-vane points east and stays there. "Serc likes the Wastes," he says. "Plenty of wind. Nothing in the way of it." He looks unhappy about that.` : `Yorin has the copper wind-vane flat on his palm. "The wind's from the front of the column," he says. "So's the fever." He does not say what Serc thinks of that.`);
      if (b9In('rasp')) ln.push(me('rasp') ? `Rasp is in the blanket, shaking, still checking the timers on the squad's munitions with her fingers. "If I sweat on these," she says, "move them."` : edge ? `Rasp has been to see the column's sappers at the last water. "They're counting what they've got," she says. "Like Tangle. Every night." She sits. "Nobody likes the number."` : `Rasp has moved the squad's munitions upwind of the pot and the sick. "Damp's bad for them," she says. "So's a man in a fever kicking in his sleep."`);
      if (b9In('orvas')) ln.push(me('orvas') ? `Orvas is in the blanket, shaking. "The old women would sing over me," he says. "In the Khundryl camps." He closes his eyes. "Somebody sing."` : edge ? `Orvas is looking at the Wastes with something like recognition. "Horse country," he says. "Bad horse country, but horse country." He nods at the trader's string. "Those know it."` : `Orvas is looking at the Letherii healers. "Khundryl women would do the same," he says. "Boil, and salt." He nods. "And sing. These ones do not sing."`);
      if (b9In('redblade')) ln.push(me('redblade') ? `Ramin is in the blanket with the scale off for once, shaking, and keeping very still to hide it. "The Red Blades," he says, "would call this weakness." He shuts his eyes. "The Red Blades are not here."` : edge ? `Ramin is looking at the Wastes with his hand on his sword. "No one owns that," he says. "No one has ever held it." He takes the hand away. "Good."` : `Ramin has the scale off for once and is boiling his own water, carefully, as the healer showed. "The Red Blades never boiled anything," he says. "Half of them are dead." He watches the pot.`);
      if (b9In('warlock')) ln.push(me('warlock') ? `Keth is in the blanket, shaking, and the grandmother is talking for him. "*He had this as a boy,*" she says, out of his mouth. "*He lived. Tell him to stop fussing.*"` : edge ? `Keth is looking east. "*My mother's mother walked out there,*" the grandmother says, out of his mouth. "*She came back with a horse and a husband and no story.*" Keth looks surprised again.` : `Keth sits close to the fever-fire. "*Boil it, boy,*" the grandmother says, out of his mouth. "*I told your mother. She never listened either.*"`);
      if (b9In('brask')) ln.push(me('brask') ? `Brask is in the blanket, very large in it, shaking. "Heavies don't get fevers," he says, through his teeth. "Somebody tell the fever."` : edge ? `Brask is looking at the Wastes. "Old squad would've had a word for that," he says. "The kind you say once and spit." He doesn't say it. "This lot's got more manners."` : `Brask is waiting for a skin to cool, so he can take it down the carts. "Did this for two of mine," he says. "I'm better at it now." He tests the skin against his cheek. "Not by much."`);
      return {sp:'The Third\'s fire', scene:edge ? 'b9_c3_edge' : 'b9_c3_fevercamp', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b9_c3_fire'}]}; },
    /* first light: phase 1 to 2 */
    b9_c3_turnin:()=>({sp:'The camp', scene:'b9_c3_fevercamp', txt:
`The Third turns in by its fire, with the pot banked and a skin by every blanket, and the fever-carts creaking behind it all night as the sick turn over.

${b93SickIn() ? `${NAME(b93Sick())} sleeps in the end, or near enough. ` : ''}At first light the drums go, and the column gets up off the grass, slowly, the sick into the carts and the well onto their feet, and the road east is waiting where it was.`,
      ch:[{t:'First light. The road.', onward:true, fx:()=>{ S.f.b9_c3_ph = 2; }, go:()=>{ startExplore('b9_c3_road'); talk('b9_c3_road_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ======== phase 2: the road among the last farms ======== */
    b9_c3_road_arrive:()=>({sp:'The road east', scene:'b9_road_east', again:()=>'The column halted at noon on the road, among the last farms.', txt:
`By noon the column has walked out of the last of the green. There are still farms, mud-brick houses set back from the road with walls round their fields, but the fields are dust, and the walls have gaps in them, and nobody is in the doorways.

The column halts in the sun, files sitting down where they stop, wagons drawn up along the road. Somewhere up the line the drill sergeant is shouting about water, and for once everybody is listening.

${b93SickIn() ? `${NAME(b93Sick())} walked the morning on ${b93His(b93Sick())} own feet, out of pride, and is sitting in the shade of a wagon now with ${b93His(b93Sick())} head between ${b93His(b93Sick())} knees.` : 'The fever-carts are at the back, and fuller than last night.'}${b93If('brask', `\n\nBrask is walking on the dusty side of the road, so the rest of the Third can walk on the less dusty one. He was not asked to.`)}

Thallo is coming down the line from the quartermaster's wagon with a face that means a job.`,
      ch:[{t:'Thallo.', go:'b9_c3_thallo2'},
          {t:'Walk the halt.', go:()=>startExplore()}]}),
    b9_c3_thallo2:()=>({sp:'Thallo', scene:'b9_road_east', fx:()=>{ S.f.b9_c3_orders2 = 1; }, again:()=> S.f.b9_c3_farmDone ? 'Thallo, eating in the shade of a wagon. "Column camps at dusk, Sergeant."' : 'Thallo, by the wagons. "The farm down the lane, Sergeant. Deserters."', txt: S.f.b9_c3_farmDone ?
`Thallo is sitting in the shade of a wagon wheel with something out of a cloth. "Quartermaster's pleased," he says. "Said a farm's not worth a fight, and then said he was pleased." He swallows. "Camp at dusk. Same as last night. Same carts."` :
`"Quartermaster's word," Thallo says. "Farm down that lane, east. Last one with anybody in it, the scouts say. Letherii deserters went in this morning, four or five, and they've got a cart." He scratches his broken nose. "The quartermaster wants it stopped. Not for the farm. He says if the column's leaving deserters behind it with carts, it'll have deserters in front of it next."

"I'm to come, and a heavy of mine. Captain's still in the cart." He looks down the lane. "Last farm in Lether, they say. After that it's grass."`,
      ch: S.f.b9_c3_farmDone ? [{t:'Back to the halt.', go:()=>startExplore()}] :
        [{t:'"The farm, then."', go:()=>startExplore()},
         {t:'Not now.', go:()=>startExplore()}]}),

    /* Harro, the sutler: selling dear (money is the scene); phase 2 on the road, phase 4 at the Wastes' edge */
    b9_c3_harro:()=>{ const edge = b93Ph() >= 4, have = !!S.f.b9_c3_bark, s = S.silver || 0;
      return {sp:'Harro, the sutler', scene:edge ? 'b9_c3_edge' : 'b9_road_east', again:()=> have ? 'Harro, at his wagon, selling dear to somebody else.' : 'Harro, at his wagon, with the fever-bark.', txt: edge ?
`Harro's wagon is at the last water with the rest, and Harro is sitting on its tailboard looking at the Wastes as if they had personally cheated him. "No custom out there," he says. "No towns. Nobody to buy off and nobody to sell to." ${have ? 'He nods at the Third. "You had my bark. Best price on the road."' : `He holds up a twist of oiled cloth. "Fever-bark. Last of it. I'm not carrying it into that. Whatever's in your purse, up to two." He sniffs. "Robbery. Mine."`}${b93Key() === 'boil' ? '\n\n"You were behind the column two days," he says. "I saw you come up. Boiling. The Letherii woman\'s lot." He spits. "Good for business, that cure. Ruins mine."' : ''}` :
`Harro is a Malazan sutler, by his accent from somewhere on the Quon coast, a lean brown man in a wide hat with a wagon hung all over with pots and skins and twists of cloth, following the column for what it will buy. He has followed armies before, and watched a great many of them walk off and leave him with stock.

"Fever-bark," he says, before you are close enough to say anything. He holds up a twist of oiled cloth. "From the south. Chew it, the sweats ease. Half the column wants it and half the column's in a cart." He smiles. "Six silver."${b93SickIn() ? `\n\nHe looks past you at ${NAME(b93Sick())}, in the wagon's shade. "Seven, now I've seen that one," he says. "No. Six. I'm not a monster."` : ''}`,
        ch: edge ? [{t:'"Two silver, then."', req:()=>!have, fx:()=>{ const p = Math.min(2, S.silver || 0); S.silver = (S.silver || 0) - p; updSilver(); S.f.b9_c3_bark = 1; gain('b9_c3_feverbark'); }, go:'b9_c3_harro_edge'},
                    {t:'Back to the camp.', go:()=>startExplore()}] :
          [{t:'Talk him down. He has more of it than he says.', check:['guile', 17], req:()=>!have && !S.f.b9_c3_haggled && s >= 5, fx:()=>{ S.f.b9_c3_haggled = 1; },
              edges:id=>[id === 'mehet' && ['a market boy from Y\'Ghatan', 2], id === 'doss' && ['he has haggled with the clerk\'s men all his life', 1], id === 'tangle' && ['he can count what\'s on the wagon', 1], id === 'haddat' && ['a water-seller\'s daughter knows a seller', 1], id === 'brask' && ['heavies pay what\'s asked', -1], id === 'ottar' && ['he does not know the Malazan for robbery', -1]],
              near:{t:()=>`Yes, but Harro gives the ground slowly and takes five for it, and calls it a gift.`, fx:()=>{ S.silver = Math.max(0, (S.silver || 0) - 5); updSilver(); S.f.b9_c3_bark = 1; gain('b9_c3_feverbark'); }},
              go:'b9_c3_harro_ok', fail:'b9_c3_harro_no'},
           {t:'"Six, then."', tag:'6 silver', req:()=>!have && s >= 6, fx:()=>{ S.silver -= 6; updSilver(); S.f.b9_c3_bark = 1; gain('b9_c3_feverbark'); }, go:'b9_c3_harro_paid'},
           {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c3_harro_ok:()=>({sp:'Harro, the sutler', scene:'b9_road_east', fx:()=>{ if (!S.f.b9_c3_bark) { S.silver = Math.max(0, (S.silver || 0) - 3); updSilver(); S.f.b9_c3_bark = 1; gain('b9_c3_feverbark'); } }, txt:
`${nearMiss() ? `It takes a while. Harro holds out at six, and then at five and a half, which is not a coin, and in the end at five, which is. He hands over the twist of cloth and pockets the silver with the face of a man being robbed in broad daylight.` : `It takes a while. Harro holds out at six, then five, then remembers a cousin in Aren who would want him to be fair, then remembers how many twists of bark are on the wagon, and in the end hands one over for three with the face of a man being robbed in broad daylight.`}

"Don't tell the heavies," he says. "They'll all want three."`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b9_c3_harro_no:()=>({sp:'Harro, the sutler', scene:'b9_road_east', txt:
`Harro listens to all of it with great courtesy, nodding, and at the end of it says "Six," as if nothing had been said at all.

"I've sold to marines," he says. "You're not even trying."`,
      ch:[{t:'"Six, then."', tag:'6 silver', req:()=>!S.f.b9_c3_bark && (S.silver || 0) >= 6, fx:()=>{ S.silver -= 6; updSilver(); S.f.b9_c3_bark = 1; gain('b9_c3_feverbark'); }, go:'b9_c3_harro_paid'},
          {t:'Not at that price.', go:()=>startExplore()}]}),
    b9_c3_harro_paid:()=>({sp:'Harro, the sutler', scene:'b9_road_east', txt:
`Harro takes the silver, bites one coin out of habit, and hands over a twist of oiled cloth with a bow that would not disgrace a Letherii clerk. "Chew it," he says. "Not much. It's bark." He tips his hat. "Pleasure."`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b9_c3_harro_edge:()=>({sp:'Harro, the sutler', scene:'b9_c3_edge', txt:
`Harro takes what there is, which he counts without looking, and hands the last twist of bark over the tailboard. "There," he says. "Now I'm carrying less into that." He looks at the Wastes. "Not much less."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c3_road_west:()=>({sp:'The road west', scene:'b9_road_east', txt:
`The road goes back west the way the column came, between field walls with gaps in them, toward Lether. The dust of the column's passing is still settling on it. There is nothing back there now that is the Third's.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    /* the lane to the last farm */
    b9_c3_lane:()=>({sp:'The farm lane', scene:'b9_road_east', txt: S.f.b9_c3_farmDone ?
`The lane to the last farm, rutted, between walls. The farm is quiet now.` : !S.f.b9_c3_orders2 ?
`A lane goes off east between field walls toward a mud-brick farm and a barn. There is smoke from the chimney, and a cart in the yard, and more movement than one farm should have at noon. Thallo has been looking for the Third.` :
`The lane goes east between field walls, rutted with old cartwheels and one new set. At the end of it, a mud-brick house and a barn, smoke from the chimney, and a cart in the yard with its shafts up.`,
      ch: S.f.b9_c3_farmDone ? [{t:'To the farm.', go:()=>{ startExplore('b9_c3_farm'); }}, {t:'Back to the halt.', go:()=>startExplore()}] : S.f.b9_c3_orders2 ?
        [{t:'Down the lane to the farm.', onward:true, go:()=>{ startExplore('b9_c3_farm'); talk('b9_c3_farm_arrive'); }},
         {t:'Not now.', go:()=>startExplore()}] : [{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the last farm */
    b9_c3_farm_arrive:()=>({sp:'The last farm', scene:'b9_c3_farm', again:()=>'The last farm in Lether, its yard, its well, its barn.', txt:
`The last farm in Lether is a mud-brick house with a thatch gone grey, a barn bigger than the house, and a well in the middle of the yard with its bucket gone. Beyond the walls the fields run out to the sky, and the sky has nothing in it.

There are men in the house. Letherii, by their coats. One of them is in the doorway with a sack of flour on his shoulder, and stops when he sees the Third come into the yard, and stands very still, the sack and all.${b93If('brask', `\n\nBrask comes in behind the squad and stands in the yard gate, filling it. "Nobody leaves with the cart," he says, to nobody in particular.`)}`,
      ch:[{t:'The door.', go:'b9_c3_door'},
          {t:'Look the yard over first.', go:()=>startExplore()}]}),
    b9_c3_door:()=>({sp:'The farmhouse door', scene:'b9_c3_farm', txt: S.f.b9_c3_farmDone ?
`The farmhouse door, standing open. Inside, an old woman is sweeping flour off her floor.` :
`The man with the flour has put it down and gone back inside, and there are voices in there now, low and quick, and the scrape of a bench. Five of them, maybe, by the boots. They have heard the Malazans were a day ahead. They are working out what it means that they were not.`,
      ch: S.f.b9_c3_farmDone ? [{t:'Back to the yard.', go:()=>startExplore()}] :
        [{t:'"Out. Now." Straight in at them.', go:()=>startBattle('b9_c3_farm', {})},
         {t:'Round by the barn, quiet, and take them from the back.', check:['guile', 17],
            edges:id=>[id === 'sathi' && ['she lay in wait for Odhan riders with the Weasels', 2], id === 'mehet' && ['he grew up keeping out of sight', 1], id === 'wenna' && ['she reads the ground before she puts a foot on it', 1], id === 'tebbet' && ['a bowman knows how to wait', 1], id === 'brask' && ['heavy scale in a farmyard is a bell', -1], id === 'ottar' && ['grey plate in a farmyard is a bigger bell', -2]],
            near:{t:()=>`Yes, but ${b93Nm(b93Who())} ${b93V(b93Who(), 'catch', 'catches')} a nail in the barn fence going over, and ${b93V(b93Who(), 'feel', 'feels')} it the whole fight.`, fx:()=>bruise(b93Who(), bruiseN())},
            go:()=>startBattle('b9_c3_farm', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c3_door_seen'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_door_seen:()=>({sp:'The farmhouse door', scene:'b9_c3_farm', txt:
`A chicken goes up off the barn fence with a noise like a cusser, and every head in the farmhouse turns at once, and then the shutters bang open and the deserters come out into the yard with blades out and nothing to lose.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c3_farm', {surprise:'e'})}]}),
    b9_c3_farm_after:()=>({sp:'The last farm', scene:'b9_c3_farm', fx:()=>{ S.f.b9_c3_farmDone = 1; }, txt:
`The yard is quiet. The cart stands in the barn door with its load of somebody else's sacks and a dead man's sword lying across the shafts.

Thallo comes in through the yard gate behind his heavy and looks at it all, and puts his keys back on his belt. "Quartermaster'll want the cart," he says. "He won't get it. It's hers." He nods toward the house.${b93Say({brask:`\n\nBrask is standing over the officer with the heavy sword point down in the dust. "Told him," he says. "Leave it, I said." He does not sound pleased to have been right.`, haddat:`\n\nHaddat kneels by each of them, as she does by every dead soldier, and says the word. They were soldiers once. They were Letherii soldiers a year ago, on the other side of a river.`, _:''})}

An old woman has come out of the house, and is standing in her own doorway with a broom, looking at the Third.`,
      ch:[{t:'The old woman.', go:'b9_c3_farmer'},
          {t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c3_farmer:()=>({sp:'An old woman', scene:'b9_c3_farm', fx:()=>{ S.f.b9_c3_farmer = 1; }, again:()=>'The old woman of the last farm, in her doorway with her broom.', txt:
`She is very old and very straight, Letherii, in a dress that was black once, with a broom she holds as a soldier holds a spear. Her son went west for work two years ago, she says, and her husband went into the ground last spring, and she has stayed because the house is hers and the well was dug by her grandfather.

"They were taking my flour," she says. "And my cart. And then my roof, they said, for firewood, when they went east." She looks at the bodies, and then away from them. "East. There is nothing east. Everyone who goes east comes back with nothing."

She looks at the Third, hard, as she might look at a sky she did not trust. "You are hungry. Soldiers are always hungry. I have a little they did not find. I will sell it. I will not give it." ${b93Found() ? 'She looks at the column\'s dust on the road. "Though you have eaten, I think."' : ''}`,
      ch:[{t:'Buy what she can spare, and leave her enough.', check:['wits', 17], rations:true, req:()=>!S.f.b9_c3_storesTried && !b93Found(), fx:()=>{ S.f.b9_c3_storesTried = 1; },
            edges:id=>[id === 'doss' && ['he knows what a holding needs to see a winter through', 2], id === 'haddat' && ['she bows to the old woman, the Hissari way', 1], id === 'marrow' && ['she calls her mother, and means it', 1], id === 'mehet' && ['a market boy knows a fair price', 1], id === 'sathi' && ['her teeth do not reassure', -1], id === 'brask' && ['he is still holding a bloody sword', -1]],
            near:{t:()=>`Yes, but she drives a hard bargain with ${b93Nm(b93Who())}, and ${b93Nm(b93Who())} ${b93V(b93Who(), 'leave', 'leaves')} her yard feeling ${b93V(b93Who(), 'you have', 'they have')} been bested by a farm wife twice ${b93V(b93Who(), 'your', b93His(b93Who()))} age: rattled.`, fx:()=>b93Rattle(b93Who())},
            go:'b9_c3_stores_ok', fail:'b9_c3_stores_no'},
          {t:'"Keep it. You will want it."', req:()=>!S.f.b9_c3_storesTried, fx:()=>{ S.f.b9_c3_storesTried = 1; S.f.b9_c3_storesLeft = 1; b93L('haddat', 1); }, go:'b9_c3_stores_left'},
          {t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c3_stores_ok:()=>({sp:'An old woman', scene:'b9_c3_farm', html:rationsHTML(), fx:()=>{ if (!b93Found()) { S.f.b9_c3_found = 'farm'; b9Ration(1, 'the last farm\'s stores'); } }, txt:
`It is not much: a crock of oil, a sack of lentils from under the floor, a string of onions, a wheel of hard cheese wrapped in a cloth that smells of the cellar. She names a price that is fair, and then a lower one when she sees what the Third counts out, and then takes the first one anyway.

"East," she says, as the Third goes. "There is nothing east." She shuts the door.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c3_stores_no:()=>({sp:'An old woman', scene:'b9_c3_farm', txt:
`It goes badly. She names a price, and the Third names another, and somewhere in the middle of it she decides she does not like the look of soldiers after all, and the crock and the sack go back under the floor, and the door shuts.

Through the door she says: "Thank you for my cart." It sounds like a dismissal.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c3_stores_left:()=>({sp:'An old woman', scene:'b9_c3_farm', txt:
`She looks at the Third over her broom, checking for a trick. Then she nods, once, and goes in, and comes out again with a jug of her well water, boiled, and sets it on the step.

"For the one with the fever," she says. "I saw." She shuts the door.${b93If('haddat', `\n\nHaddat bows to the shut door.`)}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c3_well:()=>({sp:'The well', scene:'b9_c3_farm', txt:
`A stone well with a wooden lid, the rope still on its post, the bucket gone. It has been drawn from today. The water down there is low and smells of iron and of something else.${b93If('wenna', ` Wenna drops a pebble and listens to it go. "Low," she says. "A fathom of water, and mud under it. Boil it twice."`)}${S.f.b9_c3_cureOk ? ' The healer\'s count goes through the head unbidden: a hundred, and the salt.' : ''}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c3_barn:()=>({sp:'The barn', scene:'b9_c3_farm', txt: S.f.b9_c3_farmDone ?
`The barn. The deserters' cart is in the door, half loaded with the farm's sacks. Thallo's heavy is unloading them back into the barn, one at a time, without being told.` :
`The barn door stands half open on a cart with its shafts up and a load going onto it, and nobody at it just now. Whoever was loading it is in the house, with the others.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c3_farm_thallo:()=>({sp:'Thallo', scene:'b9_c3_farm', txt: S.f.b9_c3_farmDone ?
`Thallo is sitting on the well's lid, which is not what it is for, eating. "Last farm in Lether," he says. "Last bread I didn't carry." He looks at the fields. "Column camps at dusk. We can go when you like."` :
`Thallo is at the yard gate with his heavy, waiting. "Your squad, your call, Sergeant," he says. "I'll come in behind."`,
      ch: S.f.b9_c3_farmDone ? [{t:'Back to the column. Dusk, and the camp.', onward:true, go:'b9_c3_farm_back'}, {t:'Not now.', go:()=>startExplore()}] : [{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c3_farm_back:()=>({sp:'The lane', scene:'b9_c3_farm', txt: S.f.b9_c3_farmDone ?
`Back up the lane to the road, and the column, which has walked on through the afternoon and is making camp at dusk a league further east, on a strip of dry grass much like the last one, with the fever-carts at the back.` :
`Back up the lane, the road and the halted column. The farm is behind, with men in it who are not farmers.`,
      ch: S.f.b9_c3_farmDone ? [{t:'The camp, at dusk.', onward:true, fx:()=>{ S.f.b9_c3_ph = 3; }, go:()=>{ startExplore('b9_c3_camp'); talk('b9_c3_camp2_arrive'); }},
                                {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the road.', go:()=>{ startExplore('b9_c3_road'); }},
         {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 3: the second night's camp ======== */
    b9_c3_camp2_arrive:()=>({sp:'The column\'s camp', scene:'b9_c3_fevercamp', again:()=>'The second night\'s camp, the fever-carts fuller, the pots going.', txt:
`The second night's camp is the first night's, a league on: the same rows of tents, the same wagons drawn in, the same fever-carts at the back with more in them. The Letherii pots are going on their tripods. The Third's fire is by another flat stone, as if the road had a stone for every squad.

${b93SickIn() ? `${NAME(b93Sick())} is worse. The fever has come up in ${b93Him(b93Sick())} in the afternoon, the way the healer said it would if it was going to, and by dark ${b93He(b93Sick())} is in a blanket by the fire, grey, and not insisting on anything any more.` : `The sick in the carts are worse. The ones who walked today are lying down tonight.`}

Thallo comes to the fire after dark, from somewhere up the camp, and sits down without being asked, which he has not done before.`,
      ch:[{t:'Thallo.', go:'b9_c3_thallo3'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    /* Thallo passes on what the sergeants said (secondhand), and the captain's word on the sick */
    b9_c3_thallo3:()=>({sp:'Thallo', scene:'b9_c3_fevercamp', fx:()=>{ S.f.b9_c3_orders3 = 1; }, again:()=> b93Key() ? 'Thallo, at the fire, with nothing in his hands for once.' : 'Thallo, at the fire. "Captain\'s word on the sick, Sergeant. And the other thing."', txt:
`He has nothing to eat, for once. He holds his hands out to the fire.

"Two things," he says. "The marines' sergeants had a fire of their own tonight. I wasn't at it. A heavy of ours was standing near enough, getting water, and he heard one of them say it, and he told me, so I'm telling you." He looks at the fire. "He said: surviving isn't what this is about." He rubs his broken nose. "That's all he heard. Then somebody saw him and he went back to the water."

"I don't know what it's about, then," he says. "Nobody's told me. But the marines' sergeants know something, or they think they do, and they're not running." He is quiet a moment. "Thought you'd want to know."

"Other thing. Captain's out of the cart. His word: the column keeps its pace, fever or no fever. Sick ride or walk. Any squad that falls out to nurse its own falls behind, and loses its place at the ration wagons till it catches up." He looks at ${b93SickIn() ? NAME(b93Sick()) : 'the carts'}. "Your call, Sergeant."${b93If('brask', `\n\nBrask has been listening with the skin across his knees. "Surviving's what heavies are about," he says. "Always was." He thinks. "Maybe not."`)}`,
      ch:[{t:'"What are we marching for?" Ask the squad.', req:()=>!(S.b9 && S.b9.wit && S.b9.wit.c3), go:'b9_c3_witness'},
          {t:'The sick first. The fever-carts.', req:()=>!b93Key(), go:'b9_c3_key'},
          {t:'Not now.', go:()=>startExplore()}]}),
    /* the Witness beat: at the fever-fire, after Thallo */
    b9_c3_witness:()=>({sp:'The Third\'s fire', scene:'b9_c3_fevercamp', html:rationsHTML(), txt:
`Surviving isn't what this is about. It goes round the fire after Thallo has gone, from hand to hand, without anybody quite picking it up.

${b93Say({haddat:`Haddat is looking at the fire. "Then what is it about," she says. It is not quite a question.`, tangle:`Tangle says it under his breath, testing it. "Surviving isn't what this is about." He shakes his head. "Then I'm in the wrong army."`, _:'The squad looks at the fire, and then at you.'})}${b93If('marrow', `\n\nMarrow has her eyes shut. "Ask them, child," she says. "Ask them what they march for. Ask yourself first."`)}

So you ask. What is the Third marching for, out here, two days past the last town, with a fever in the carts and Kolanse somewhere ahead that nobody can find on a map?`,
      ch:[{t:'"For each other. For the Third. That\'s what we march for."', fx:()=>{ b9Wit('kept', 'for each other'); S.f.b9_c3_wit = 'squad'; }, go:'b9_c3_wit_done'},
          {t:'"The Adjunct knows why. She gave her word it\'s worth it. That\'s enough for me."', fx:()=>{ b9Wit('kept', 'the Adjunct\'s word'); S.f.b9_c3_wit = 'adjunct'; }, go:'b9_c3_wit_done'},
          {t:'"The column\'s going. So we go."', fx:()=>{ b9Wit('doubt', 'the column is going'); S.f.b9_c3_wit = 'column'; }, go:'b9_c3_wit_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_wit_done:()=>{ const w = S.f.b9_c3_wit;
      return {sp:'The Third\'s fire', scene:'b9_c3_fevercamp', html:rationsHTML(), txt: w === 'squad' ?
`It sits in the fire a while. No one argues with it.

${b93Say({haddat:`Haddat nods slowly. "My mother said you march for the ones beside you," she says. "Everything else is a story the officers tell." She looks round the fire. "I like the ones beside me."`, tangle:`Tangle grunts. "I can count that," he says. "I can count the Third." He looks at the fire. "Fewer of us than there were. Still countable."`, _:'The squad looks at itself round the fire, as if to check the count.'})}${b93If('brask', `\n\nBrask looks round the fire, at each of them, slowly, as heavies look at a wall. "That'll do," he says.`)}` : w === 'adjunct' ?
`It sits in the fire a while. It is a thing soldiers say, and some of them mean it.

${b93Say({marrow:`Marrow opens her eyes. "She has the look of one who knows, child," she says. "I have seen it on priests. Most of them were wrong." She closes them again. "Not all."`, haddat:`Haddat thinks about it. "She does not tell us," she says. "But she does not lie to us either. My mother said that is rarer."`, _:'The squad thinks about it, and does not argue.'})}${b93If('brask', `\n\nBrask shrugs. "Heavies don't get told," he says. "We get pointed." He looks east. "She's pointing."`)}` :
`It sits in the fire a while. It is the truest thing anybody has said all day, and nobody likes it.

${b93Say({tangle:`Tangle nods. "That's honest," he says. "I'll take honest." He goes on watching the fire.`, haddat:`Haddat looks at you. "My mother would not have said that," she says. Then: "My mother was not here."`, _:'The squad looks at the fire, and no one calls it wrong.'})}${b93If('brask', `\n\nBrask nods. "Old squad marched like that," he says. "Column went, we went." He pokes the fire. "Then the column went over a river."`)}`,
        ch:[{t:'The sick. The fever-carts.', req:()=>!b93Key(), go:'b9_c3_key'},
            {t:'Back to the fire.', go:'b9_c3_fire'}]}; },

    /* the key: the fever */
    b9_c3_key:()=>({sp:'The fever-carts', scene:'b9_c3_fevercamp', html:rationsHTML(), again:()=>'The fever-carts at night, the captain\'s word on the sick, and the column moving at first light.', txt:
`The Letherii healer is at the carts again with her pot and ladle, and she has heard the captain's word too, because everybody has.

"Your captain is a fool," she says, without looking up. "Or he is right. With fevers it is hard to tell until afterwards." ${b93SickIn() ? `She looks at ${NAME(b93Sick())}. "This one: if you stop, and boil everything you own, and sit with ${b93Him(b93Sick())} a day and a night, the fever breaks. If you march, the cure still works, slower, and ${b93He(b93Sick())} carries it with ${b93Him(b93Sick())}. Maybe all the way to where you are going."` : `"Any of yours: stop and boil, and the fever breaks. March, and it comes along."`} She ladles. "I am going with the carts either way."

Behind her, the column's ration wagons are drawn up in their order for the morning, and the Third's place is in it.${b93Say({mirrel:`\n\nMirrel is beside the healer. "She's right," she says. "Stop and it breaks. I'd stop." She looks at the ration wagons. "I'm not the one who has to feed you."`, marrow:`\n\nMarrow has her hand on the sick one's forehead. "Soliel says stop, child," she says. "But Soliel does not walk."`, _:''})}${b93If('brask', `\n\nBrask is at the end of the cart. "I'll carry ${b93SickIn() ? b93Him(b93Sick()) : 'whoever'}," he says. "If we march. I'll carry ${b93SickIn() ? b93Him(b93Sick()) : 'them'} if we don't. Either." He means it.`)}${b93If('tangle', `\n\nTangle is looking at the ration wagons. "Lose our place," he says, "and we eat last. Every halt. Till we catch up." He does the sum. "I'm just saying it."`)}`,
      ch:[{t:'"We stop. Boil everything. We sit with ours till it breaks."', fx:()=>{ S.f.b9_c3_key = 'boil'; b93L(b93Sick(), 1); }, go:'b9_c3_key_boil'},
          {t:'"We keep the pace and trust the cure. Nobody loses our place."', fx:()=>{ S.f.b9_c3_key = 'press'; }, go:'b9_c3_key_press'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b9_c3_key_boil:()=>({sp:'The fever-carts', scene:'b9_c3_fevercamp', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c3_boiled) { S.f.b9_c3_boiled = 1; b9Ration(-1, 'fuel and time'); } }, txt:
`The healer nods once, as if a sum had come out, and goes on down the carts.

The Third boils everything. Every skin, every pot, every cup, the linen, the blankets as far as a pot will hold them. It burns the squad's whole stock of fuel and most of the night, and in the morning the column gets up off the grass and goes on east without it, files and wagons and fever-carts, and the Third's place at the ration wagons goes on with them, filled by somebody else.

${b93SickIn() ? `The Third sits with ${NAME(b93Sick())} all that day, by a fire of the last dry thornwood, in an empty camp with the column's dust going away east. A mouthful at a time. The fever comes up in the afternoon, and holds, and holds, and some time after dark it breaks, and ${b93He(b93Sick())} sleeps, really sleeps, for the first time since Letheras.` : `The Third sits by its pot all that day in an empty camp, boiling, with the column's dust going away east. By dark its sick are sleeping.`}${b93If('brask', `\n\nBrask sits up with ${b93SickIn() ? b93Him(b93Sick()) : 'the sick'} through the middle of the night, so the others can sleep. In the morning he does not mention it.`)}`,
      ch:[{t:'After the column. March hard.', onward:true, go:'b9_c3_boil_day'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_boil_day:()=>({sp:'The road east', scene:'b9_column', fx:()=>{ if (!S.f.b9_c3_feverBroke) { S.f.b9_c3_feverBroke = 1; const id = b93Sick(); if (id && S.injury && S.injury[id] === 'b9fever') { delete S.injury[id]; if (!Object.keys(S.injury).length) S.injury = null; note(`${NAME(id)}'s fever has broken.`, 'good'); save(); } } }, txt:
`The Third marches hard after the column for two days, on short commons because the squad that loses its place eats last, and eats what is left. The road gets thinner. The farms stop. The column's dust is always ahead, and always the same distance, and then on the second evening it is not so far, and then there are the fever-carts at the tail of it, and the Letherii pots going, and the healer looking up from her ladle as the Third comes in.

"Ah," she says, and looks at ${b93SickIn() ? NAME(b93Sick()) : 'the squad'}, walking. "Good." She goes back to her ladle.`,
      ch:[{t:'The camp at the Wastes\' edge.', onward:true, fx:()=>{ S.f.b9_c3_ph = 4; }, go:()=>{ startExplore('b9_c3_edge'); talk('b9_c3_edge_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_key_press:()=>({sp:'The fever-carts', scene:'b9_c3_fevercamp', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c3_pressed) { S.f.b9_c3_pressed = 1; b9Ration(1, 'kept our place at the wagons'); } }, txt:
`The healer shrugs, as if she had expected it, and goes on down the carts.

At first light the Third gets up with the column and takes its place in the files, and at the noon halt it takes its place at the ration wagons, which is the first place, still, by the quartermaster's rule, and eats while the squads that fell out to nurse their own are a day back down the road, boiling.

${b93SickIn() ? `${NAME(b93Sick())} walks, when ${b93He(b93Sick())} can, and rides the tail of a fever-cart when ${b93He(b93Sick())} cannot, and drinks what the healer gives at every halt, a mouthful at a time. The cure works. It works slowly. The fever does not break. It comes along.` : `The sick ride the tail of the fever-carts and drink what the healer gives at every halt. The cure works, slowly. The fever comes along.`}${b93If('brask', `\n\nBrask carries ${b93SickIn() ? b93Him(b93Sick()) : 'a sick heavy'} for a league in the afternoon, over his shoulder like a sack, and puts ${b93SickIn() ? b93Him(b93Sick()) : 'the heavy'} down at the halt without remark.`)}`,
      ch:[{t:'On, with the column.', onward:true, go:'b9_c3_press_day'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_press_day:()=>({sp:'The road east', scene:'b9_column', txt:
`The column walks two more days east. The road gets thinner. The farms stop. The field walls stop. The grass gets shorter and paler and then there are stones in it, and then the stones are most of it.

On the second evening the column comes to a stream in a shallow valley with a few thorn trees along it, and stops, and the word comes down the files from the front: last water. After this, the Wastes.${b93SickIn() ? `\n\n${NAME(b93Sick())} is still on ${b93His(b93Sick())} feet at the halt. Still shaking. Still on ${b93His(b93Sick())} feet.` : ''}`,
      ch:[{t:'The camp at the Wastes\' edge.', onward:true, fx:()=>{ S.f.b9_c3_ph = 4; }, go:()=>{ startExplore('b9_c3_edge'); talk('b9_c3_edge_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 4: the Wastes' edge ======== */
    b9_c3_edge_arrive:()=>({sp:'The Wastes\' edge', scene:'b9_c3_edge', again:()=>'The last water before the Wastes, the column\'s camp along the stream.', txt:
`The last water is a thin stream in a shallow valley, a few thorn trees, and grass going out on the far side into stone, and stone going out to a sky that is too big for it. The column is spread along the stream for a league, watering everything it has, filling everything that holds water, and the Letherii pots are going all along the bank.

Little is said. The heavies stand on the far bank in twos and threes and look east at the Wastes, and come back.

${b93Key() === 'boil' ? 'The Third came in two days behind the column, and is at the back of everything: the water, the wagons, the ration line.' : 'The Third kept its place, and is watering at its own stretch of the bank with the rest of the company.'}${b93If('brask', `\n\nBrask stands on the far bank a long time, looking east. Then he comes back and fills his skins.`)}

Up the road there is a string of horses on a picket and a felt tent beside it, and a man who is plainly not a soldier sitting in its door.`,
      ch:[{t:'The horse-trader.', go:'b9_c3_duvo'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b9_c3_thallo4:()=>({sp:'Thallo', scene:'b9_c3_edge', fx:()=>{ S.f.b9_c3_orders4 = 1; }, again:()=>'Thallo, at the stream, filling skins.', txt:
`Thallo is filling skins at the stream, a great many of them, and boiling them at a Letherii pot in turn. "Captain's orders," he says. "Every skin in the company full and boiled before we go out on that." He nods east. "Says nobody knows where the next water is." He fills another. "Says it like that's normal."

"There's an Akrynnai up the road with horses," he says. "Selling meat. Horse meat. Says it's horses that went lame." He looks at the string. "They don't look lame. He's had some trouble, they say. Lost some of his string to somebody in the night."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    /* Duvo the Akrynnai horse-trader: the trade (a rations check, +1 if the farm gave nothing), the Barghast war as news */
    b9_c3_duvo:()=>({sp:'Duvo', scene:'b9_c3_edge', fx:()=>{ S.f.b9_c3_duvo = 1; }, again:()=>'Duvo, in the door of his tent, with his tea.', txt:
`Duvo is Akrynnai, a plainsman, with a long felt coat and a leather cap with its ear-flaps tied up and grey braids under it, and a horn-gripped knife in his sash, and a face the wind has been at for fifty years. He sits in the door of his felt tent with a bowl of tea and watches the Malazan army water itself at the stream patient as an old herder who has seen a great many herds come down to water, and none of them in boots.

"Malazans," he says, in a trade-tongue with the plains in it. "Going east. Into that." He drinks his tea. "I am going north. Home. The Barghast have gone to war with my people on the plains, and a man should be with his herds in a war." He shrugs. "Or a long way from them. I have not decided."

"I sell meat," he says. "Horse. Good horse, dried and salted. You will want it out there. Nothing out there to eat but stones." He laughs. "That is a plains joke. The plains have very few."${S.f.b9_c3_roadDone ? '' : `\n\nHe looks at his picket, where there are gaps in the string. "Last night some men came and took six of my horses," he says. "Not Barghast. Not Akrynnai. Men from nowhere. They are in a wash an hour south, waiting for the army to go so they can sell them back to me."`}`,
      ch:[{t:'Bargain for the horse-meat.', check:['guile', 17], rations:true, req:()=>!S.f.b9_c3_meatTried && !b93Found(), fx:()=>{ S.f.b9_c3_meatTried = 1; },
            edges:id=>[id === 'orvas' && ['a Khundryl knows what a horse is worth', 2], id === 'doss' && ['he knows salt meat from salt leather', 1], id === 'mehet' && ['a market boy from Y\'Ghatan', 1], id === 'sathi' && ['she grins at him and he likes it', 1], id === 'ottar' && ['the Perish do not eat horses, and his face says so', -2], id === 'brask' && ['heavies pay what\'s asked', -1]],
            near:{t:()=>`Yes, but Duvo wants silver as well as the price, and ${b93Nm(b93Who())} ${b93V(b93Who(), 'pay', 'pays')} three over to close it.`, fx:()=>{ S.silver = Math.max(0, (S.silver || 0) - 3); updSilver(); }},
            go:'b9_c3_duvo_meat_ok', fail:'b9_c3_duvo_meat_no'},
          {t:'"Your horses. Where\'s this wash?"', req:()=>!S.f.b9_c3_roadDone, go:'b9_c3_horses'},
          {t:'The knife in your sash. Is it for sale?', req:()=>!S.f.b9_c3_knife, go:'b9_c3_duvo_knife'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_duvo_meat_ok:()=>({sp:'Duvo', scene:'b9_c3_edge', html:rationsHTML(), fx:()=>{ if (!b93Found()) { S.f.b9_c3_found = 'duvo'; b9Ration(1, 'Duvo\'s horse-meat'); } }, txt:
`It goes back and forth over the tea for a while, in the plains way, which involves a great deal of looking at the sky. In the end Duvo puts two long bundles of dried horse in the Third's arms, black and salt and hard as harness, and pours everybody more tea.

"Chew it slowly," he says. "It is better than it looks. Everything is, out there." He nods east. "Except the water."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c3_duvo_meat_no:()=>({sp:'Duvo', scene:'b9_c3_edge', txt:
`Duvo listens to the offer, and then to the next one, and then studies the sky, and then names a price that is twice the first one, which in the plains way means the bargaining is over.

"Another day," he says. "Another trader. Out there, there are no other traders." He pours his tea. "So: no."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c3_duvo_knife:()=>({sp:'Duvo', scene:'b9_c3_edge', txt: S.f.b9_c3_roadDone ?
`Duvo touches the knife's horn grip. "That one is yours already," he says. "For the horses." He looks surprised you asked.` :
`Duvo touches the knife's horn grip. "This," he says. "I have carried this across the plains for thirty years. It has cut more rope than men." He considers the Third. "For my horses back, I would give it. For silver..." He looks at the sky. "Eight."`,
      ch: S.f.b9_c3_roadDone ? [{t:'Back to the camp.', go:()=>startExplore()}] :
        [{t:'"Eight, then."', tag:'8 silver', req:()=>(S.silver || 0) >= 8 && !S.f.b9_c3_knife, fx:()=>{ S.silver -= 8; updSilver(); S.f.b9_c3_knife = 'bought'; gain('b9_c3_akrynknife'); }, go:'b9_c3_duvo_sold'},
         {t:'"We\'ll bring your horses."', go:'b9_c3_horses'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_duvo_sold:()=>({sp:'Duvo', scene:'b9_c3_edge', txt:
`Duvo takes the silver, counts it twice, and draws the knife and turns it in the light once and hands it over hilt first. "Do not lose it," he says. "It does not like to be lost." He drinks his tea. "I will buy another in the north. Worse."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    /* the raiders on Duvo's horses: optional */
    b9_c3_horses:()=>({sp:'Duvo\'s horses', scene:'b9_c3_edge', txt: S.f.b9_c3_roadDone ?
`Duvo's string on its picket, whole again, the six from the wash among them, rolling in the dust one after another as if to get the raiders off them.` :
`Duvo's string on its picket, with gaps in it. The tracks of the six that were taken go off south across the stony ground, plain to anybody, toward a dry wash an hour away where the ground folds.

"Four men," Duvo says, from his tent. "Maybe five. I am too old to count men at night."`,
      ch: S.f.b9_c3_roadDone ? [{t:'Back to the camp.', go:()=>startExplore()}] :
        [{t:'Follow the tracks straight down the wash, and take them.', go:()=>startBattle('b9_c3_road', {})},
         {t:'Read the tracks, and come on them from above the wash.', check:['wits', 17],
            edges:id=>[id === 'wenna' && ['she follows tracks for a living', 2], id === 'orvas' && ['a Khundryl reads horse sign as he reads words', 2], id === 'tegra' && ['the plains are hers', 2], id === 'doss' && ['he tracked strays across the holdings', 1], id === 'sathi' && ['she rode with the Weasels', 1], id === 'brask' && ['he is a heavy, not a scout', -1], id === 'ottar' && ['grey plate on a skyline is a beacon', -2]],
            near:{t:()=>`Yes, but the stones turn under ${b93Nm(b93Who())} on the slope above the wash, and ${b93Nm(b93Who())} ${b93V(b93Who(), 'come', 'comes')} down onto them with a bad ankle.`, fx:()=>bruise(b93Who(), bruiseN())},
            go:()=>startBattle('b9_c3_road', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c3_horses_seen'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c3_horses_seen:()=>({sp:'The wash', scene:'b9_c3_edge', txt:
`The tracks go into a fold of stone and come out again somewhere else, and by the time the Third has found them a second time, the men in the wash have found the Third.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c3_road', {surprise:'e'})}]}),
    b9_c3_road_after:()=>({sp:'The wash', scene:'b9_c3_edge', fx:()=>{ S.f.b9_c3_roadDone = 1; if (S.f.b9_c3_knife !== 'bought') { S.f.b9_c3_knife = 'given'; gain('b9_c3_akrynknife'); } }, txt:
`The wash is quiet. Six of Duvo's horses stand at the far end of it on their rope, watching, ears forward, with the calm of animals who have seen men do this before and expect to see it again.

Duvo is at his tent when the Third brings them in, and he walks down his string and touches every one, and counts them, twice. Then he draws the horn-gripped knife out of his sash and turns it in the light once, and hands it over hilt first.

${S.f.b9_c3_knife === 'bought' ? `"You bought my knife already," he says. "So." He looks at the sky. "So I owe you. I do not like to owe." And he puts a bundle of dried horse in the Third's arms, which is not a knife, but is not nothing.` : `"Thirty years," he says. "It has cut more rope than men. Today it cut nothing. You did the cutting."`}${b93If('brask', `\n\nBrask leads the last two horses in himself, one rope in each fist, and the horses walk beside him as if he were a wall they had decided to trust.`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the road east, onto the Wastes */
    b9_c3_edge_east:()=>({sp:'The road east', scene:'b9_c3_edge', txt:
`The road goes on east over the stream on a ford of flat stones, and up the far bank, and out onto the Wastes, where it is not really a road any more, only the place where the column will walk tomorrow.`,
      ch:[{t:'The fire first.', go:'b9_c3_fire'},
          {t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ======== the end: out onto the Wastes ======== */
    b9_c3_onward:()=>({sp:'The road east', scene:'b9_column', html:rationsHTML(), txt:
`First light, and the drums, and the column gets up off the bank of the last water and crosses the ford, file after file, wagon after wagon, the fever-carts last, and goes up the far bank and out onto the Wastes.

There is no singing. The dust comes up off the stony ground as soon as the first files are on it, pale and fine, and gets into everything, and will not come out again.

${b93Key() === 'press' && b93SickIn() ? `${NAME(b93Sick())} walks in the Third's file, still grey, still shaking at the halts, still on ${b93His(b93Sick())} feet. The fever comes too.` : b93Key() === 'boil' && b93SickIn() ? `${NAME(b93Sick())} walks in the Third's file, thin and steady, with the healer's pot on ${b93His(b93Sick())} pack.` : 'The Third walks in its file, with the healer\'s count going in every head: a hundred, and the salt.'}${b93Say({haddat:`\n\nHaddat says the names of the dead under her breath as she walks, and at the end of them, quietly, a new word: <em>Lether</em>. The country, behind.`, tangle:`\n\nTangle walks with a hand on the satchel and his eyes on the ground. Counting, probably.`, _:''})}${b93If('brask', `\n\nBrask walks at the end of the Third's file, where he can see what's coming. Nothing is coming. There is nothing out there to come.`)}`,
      ch:[{t:'East.', onward:true, go:()=>chapterEnd(3, b93Key() || 'boil')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
