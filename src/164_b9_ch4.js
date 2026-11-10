/* ============ Book Nine, Chapter 4: The Ration Book ============ */
/* The Letherii: Book Seven's squad of the Sixth Company in the Commander's escort, out on the Wastes behind the Malazans (dod-canon chapter
   table, Ch 4: the escort's column into the Wastes; mages failing, R5 and R19.2 S6, headline; thin game, R10 S1, S7; the Barghast war on
   the Akryn beside the road, R11 S1, headline). Phase 1 (S.f.b9_c4_ph), dusk, the train's wagons drawn in: Finadd Ennic's word; Kaedra, a
   scout off the Bolkando border riding with the Bluerose outriders, joins (b9Join('kaedra'), the first halt); the tile-woman at a ration
   crate (the reading, B9READ[4]); Yelt's ration book short four barrels and a sack, and who has been taking (a quartermaster's runner, left
   open by Ch 2, chalking the water wagons for border raiders). Phase 2, that night: raiders on the train (b9_c4_raid, main, stage 2); the
   Witness beat at the train's fire with Yelt's ledger closed. Phase 3, the next day's noon halt on open country: a bhederin stampede across
   the train's flank (b9_c4_herd, survive 4), the hunt for a lamed straggler (+1), Kaedra's spoor (the trick, Reading the Spoor, passive);
   the key from Ennic, S.f.b9_c4_key: 'book' (keep the ration book honest with Yelt: b9Ration(1), S.f.b9_c4_book = 1) or 'forage' (ride out
   with Kaedra and the Bluerose outriders after the herd: Barghast skirmishers who claim it, b9_c4_forage; b9Ration(3); Kaedra +1).
   Phase 4 the key's road; phase 5 the camp at evening, and on east at first light. Notes for later chapters: docs/dod-ch4-notes.md. */
/* FOR THE ARTIST (164b): names this file uses.
   Items: ART['item/b9_c4_bluerosespear'], ['item/b9_c4_scoutcoat'], ['item/b9_c4_bonewhistle'].
   Figures: kaedra (160's simple sprite, replaced in 164b), b9_c4_outrider (a Bluerose outrider on foot), b9_c4_runner (the quartermaster's
   runner); reused: b5_c1_ennic, b5_c1_clerk (Yelt), b5_c1_tilewoman, b9_c2_orla, b9_c2_saffa, b6_bandit (the raiders), b3_barghast,
   b3_c2_bhederin (the herd), b9_c4_bull (a foe on the bhederin body).
   Backdrops: b9_wastes and b9_camp_night (160's, yours), and two this file adds: b9_c4_dusk (the train's wagons drawn in at dusk, a ration
   crate), b9_c4_wash (a dry wash on open country, the herd in it, smoke far off north).
   Ground (TILEX): b9_c4_wastes (Ch 3's b9_c3_road for '.', ',', 'r', 'x', 'F', 'm', 'T', 'w', 'o', 'h'; and 'W' a wagon of the ring, 'C' a
   ration crate, 'X' oxen on a picket, 'c' Orla's water-cart, 's' the herd's track on the dust, 'e' a seep in a wash). Battle 't': stacked
   ration crates. */

/* ---- small helpers (b94: Book Nine, Chapter Four) ---- */
const b94L = (id, n) => { if (S.loy && S.loy[id] != null && !(S.dead && S.dead[id])) loy(id, n); };
const b94Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b9In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b94If = (id, s) => b9In(id) ? (typeof s === 'function' ? s() : s) : '';
const b94Who = () => (ROLL() && ROLL().who) || 'sgt';
const b94Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b94Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b94V = (id, you, they) => id === 'sgt' ? you : they;
const b94And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b94Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 dusk at the train, 2 that night, 3 the next day's noon halt, 4 the key's road, 5 the camp at evening, the key done */
const b94Ph = () => S.f.b9_c4_ph || 1;
const b94Key = () => S.f.b9_c4_key || null;
const b94Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b9In(id));
const b94KSettled = () => S.f.b9_kaedraDone != null;
const b94KWaits = () => S.f.b9_kaedraDone === 2;
const b94Kae = s => b9In('kaedra') ? s : '';
const b94NightReady = () => !!S.f.b9_c4_orders1 && b94KSettled() && !!S.f.b9_c4_countTried;
const b94Ennic = () => B5_FINADD.short;
const b94Marks = () => !!S.f.b9_c4_marks;
/* Chapter 2 read, always with a default: Yelt remembers the Sixth for the barrels found or the wagons loaded true */
const b94Yelt2 = () => S.f.b9_c2_loadedTrue || (b9Key(2) || 'wagons') === 'wagons' ? 'the Sixth loaded my wagons true outside Letheras, which nobody else did' : S.f.b9_c2_found ? 'the Sixth found my three barrels of pork outside Letheras' : 'the Sixth came back from the river';
/* the one line of the other squad, as camp talk (its Chapter 3 key; b9OtherName is not used) */
const b94Rumour = () => (b9Key(3) || 'boil') === 'press' ? 'one of the foreigners\' squads of heavies kept the column\'s pace the whole road east with a fevered soldier on the tail of a cart, and would not fall out' : 'one of the foreigners\' squads of heavies sat down by the road for a day and a night and boiled everything it had, and caught the column up at the last water, at the back of every line';

/* ---- Reading the Spoor: Kaedra's border craft. The forts' scouts read dust and grass the way a clerk reads a ledger: which way the
   stems lie, where a hoof has broken the crust, how old a dropping is, where the larks went up. It copies the Long Listen (Book Four's
   b4_c6_listen; Book Eight's Grass-Running is the same shape) and is PASSIVE (v10.3; listed in V103_PASSIVE in 989): no button, it works
   by itself as every fight the bearer walks into opens. The first enemy to move is marked (+2 to hit it for the squad until the end of the
   next round); through the first round nobody in the squad can be flanked. Not sorcery. Guarded by b9On(). ---- */
Object.assign(TRICKS, {
  b9_c4_spoor:{name:'Reading the Spoor', ch:4, use:'fight', ab:'t_b9_c4_spoor', where:'a herd\'s track across the Wastes, with a scout off the Bolkando border',
    lore:'The border forts\' scouts read the ground before they read a face. Which way the dry stems lie, where a hoof has broken the crust and how long ago, where the dust has been blown back over a print and where it has not had time. Where the larks went up early. Kaedra learned it from the scouts of a fort that stopped paying them, and says it is the only thing the Bolkando and the Letherii ever taught her that agreed.',
    get fx(){ return 'Once a fight: the bearer reads the ground for what is moving on it. The first enemy to move is marked, and the squad is +2 to hit it until the end of the next round. Through the first round nobody in the squad can be flanked. Not sorcery: it never sputters.'; }},
});
Object.assign(AB, {
  t_b9_c4_spoor:{name:TRICKS.b9_c4_spoor.name, trick:'b9_c4_spoor', self:true, desc:()=>TRICKS.b9_c4_spoor.fx,
    run(u){ B.b94spoor = {u, on:true, marked:null, r0:B.round || 1}; AUDIO.play('click'); float(u, 'reading the spoor', '#d8d0a0'); sparks(u.x, u.y, 6, '#d8d0a0', .3);
      blog(`${u.name} goes down on one knee and reads the dust. "${u.id === 'kaedra' ? 'There. The crust is broken left. Fresh.' : u.id === 'ruuk' ? 'Left. They walk heavy.' : 'Left. One of them first.'}" For a round the squad's flanks are watched.`); }},
});
{ const _bfts = boonFoeTurnStart;
  boonFoeTurnStart = function(u){ const r = _bfts(u); const g = b9On() && B && B.b94spoor;
    if (g && g.on && !g.marked && u && u.side === 'e' && u.hp > 0) { g.marked = u; u.b94read = B.round + 1; float(u, 'read', '#f2c46b'); blog(`${u.name} moves, and the dust gave it away first. <em>+2 to hit it.</em>`); }
    return r; }; }
{ const _fl = flanked;
  flanked = function(a, t, from){ if (b9On() && B && B.b94spoor && B.b94spoor.on && t && t.side === 'p' && a && a.side === 'e') return false; return _fl(a, t, from); }; }
{ const _ac = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _ac(a, t, o); if (b9On() && B && a && t && a.side === 'p' && t.b94read != null && t.b94read >= B.round) c.bonus += 2; return c; }; }
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); const g = b9On() && B && B.b94spoor;
    if (g && g.on && g.u && u && g.u.id === u.id && (B.round || 1) > g.r0) { g.on = false; blog('The reading is done. The dust is only dust again.'); }
    return r; }; }

/* ---- borrowed pictures until the artist's file (164b) replaces them ---- */
{ const like = {b9_c4_dusk:'b9_camp_night', b9_c4_wash:'b9_wastes'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b9_c4_wastes ??= (...a) => (TILEX.b9_c3_road || (() => {}))(...a);
if (typeof FIGX !== 'undefined') { FIGX.b9_c4_outrider ??= (ctx, h, t, o) => (FIGX.sorvan || FIGX.b5_letherii || (() => {}))(ctx, h, t, o); FIGX.b9_c4_runner ??= (ctx, h, t, o) => (FIGX.b5_letherii || (() => {}))(ctx, h, t, o); }
if (typeof ART !== 'undefined') [['b9_c4_bluerosespear', 'b9_c2_escortspear'], ['b9_c4_scoutcoat', 'b9_c2_carterscoat'], ['b9_c4_bonewhistle', 'b9_c2_tallystick']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the reading: a ration crate at the train, at dusk ---- */
B9READ[4] = {scene:'b9_c4_dusk', where:'a ration crate at the train, at dusk', set:'Dusk on the Wastes, the train\'s wagons drawn in for the night, and the cook-fires lit low to save the dung.', back:'b9_c4_fire', backT:'Back to the fire.',
  say:{perrit:'"Sit," Perrit says. She has turned a ration crate on its end and wiped the dust off it with her sleeve. "Three tiles. The cadre says the Holds are thin out here." She looks at the empty country. "The cadre says a great deal. Sit anyway."',
       tilewoman:'"A dock," the old woman says. "Same as Letheras." She pats the ration crate she is sitting on. "Better table, mind. It has something in it."'}};

/* ---- the words this chapter adds to Book Nine's glossary ---- */
GLOSSX.dod.push(
  [4, 'Reading the spoor', 'The border scouts\' craft: dust, grass and hoofprints read like a ledger. Which way it went, how many, how long ago.', ()=>!!(S && S.f && S.f.b9_c4_spoorTried)],
  [4, 'The border forts', 'Letherii forts on the marches with Bolkando, in country both kingdoms claim and neither feeds. They stopped paying their scouts last season.', ()=>!!(S && S.f && S.f.b9_kaedraDone != null)],
  [4, 'Bhederin', 'The great humped cattle of the plains. Fewer on the Wastes than the stories say. Enough to stampede.', ()=>!!(S && S.f && S.f.b9_c4_herdDone)]);

/* 160's scenes keep their own captions; in this chapter the noon halt's caption follows the backdrop */
{ const sc = SCENES.b9_wastes, base = sc && sc.cap; if (sc) Object.defineProperty(sc, 'cap', {configurable:true, enumerable:true,
    get(){ if (!(S && S.book === 'dod' && S.chapter === 4)) return base; return ((S.f && S.f.b9_c4_ph) || 1) >= 4 ? 'First light on open country: the escort forming on the track brigade by brigade, the train behind it, and the foreigners\' dust already up far ahead.' : 'The escort halted at noon on open country: the train drawn up along the track, Bluerose outriders out on the flanks, and dust on the northern sky.'; }}); }

/* the fire is a roster fire (38c) */
ROSTER_FIRES.dod = ROSTER_FIRES.dod || {}; ROSTER_FIRES.dod[4] = ['b9_c4_fire'];

const B9CH4 = {
  title:B9CH[4], number:'Four',
  intro:{loc:'The Wastes', sub:'The escort\'s train · dusk', scene:'b9_c4_dusk', cap:'The train\'s wagons drawn in for the night on open country, cook-fires lit low, and the sky going red over a land with nothing on it.',
    paras:[
`Lether ends somewhere behind the escort, at a farm nobody lived on and a stone nobody had carved. After that it is the Wastes. Every Letherii legend about the Wastes starts with somebody walking into them, and the escort has been walking into them for some time now, and none of the legends were long enough.`,
()=>{ const v = b94Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, Sixth Company, and the squad is ${v.length ? `${b94And(v)}, and you` : 'you, and a paybook'}. The ration is down a step since the river. Belts are down a hole. The supply train is the only thing on the march that everybody watches, and tonight its clerk has been seen counting the same wagon three times.`; },
`The wagons are drawing in. The light is going. Somewhere out on the dark side of the camp, the Bluerose outriders are coming in.`],
    go:'Into the train\'s camp', node:'b9_c4_start'},

  areas:[
    /* 16 x 12 (b9_c4_wastes, dusk and night). The train's camp: W the ring of wagons  . dry grass  , the track through  F the squad's fire
       T tents  w a wagon inside the ring  o water barrels  C a ration crate (the tile-woman)  X oxen on a picket  c Orla's cart
       h the outriders' horse lines */
    { id:'b9_c4_camp', title:'The Wastes · the escort\'s train', sub:'The wagons drawn in', hint:'Tap ground to move · tap a figure to talk · the water wagons are east, the horse lines south-east', decor:'b9_c4_wastes', dark:true,
      map:[ "WWWWWWWWWWWWWWWW",
            "W..............W",
            "W.T.T.....oo.w.W",
            "W.........C....W",
            "W..F......,....W",
            "W.........,..X.W",
            "W..T......,..X.W",
            "W....c....,....W",
            "W.........,....W",
            "W.T.T.......hh.W",
            "W..............W",
            "WWWWWWWWWWWWWWWW" ],
      walk:'.,', triggers:{F:'b9_c4_fire', C:'b9_c4_crate', o:'b9_c4_barrels', w:'b9_c4_wagon', X:'b9_c4_oxen', c:'b9_c4_cart', h:'b9_c4_horses', W:'b9_c4_ring'}, start:{x:5, y:5},
      quest:()=>{ const ph = b94Ph();
        if (ph === 1) return !S.f.b9_c4_orders1 ? 'The Finadd, by the tents. He has the night\'s word.' : !b94KSettled() ? 'The horse lines, south-east. A scout on foot came in with the outriders.' : !S.f.b9_c4_countTried ? 'Yelt, at the water wagons. His count is short.' : 'The fire. Then sit the train tonight.';
        if (ph === 2) return !S.f.b9_c4_raidDone ? 'The water wagons, north-east. Something is moving out there.' : !S.f.b9_c4_closed ? 'Yelt, and his count.' : 'The fire. Then sleep, what is left of the night.';
        if (ph === 4) return b94Key() === 'book' && !S.f.b9_c4_keyDone ? 'Yelt, at the water wagons, with the book open.' : 'The fire.';
        return 'The fire. East again at first light.'; },
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:2, y:3, node:()=>'b9_c4_ennic', show:()=>b94Ph() !== 2, fresh:()=>!S.f.b9_c4_orders1},
        {id:'kaedra', name:'A scout on foot', kind:'kaedra', x:12, y:10, node:()=>'b9_c4_kaedra', show:()=>(b94Ph() === 1 || b94Ph() >= 4) && (S.f.b9_kaedraDone == null || b94KWaits()), fresh:()=>S.f.b9_kaedraDone == null},
        {id:'yelt', name:'Yelt, with the ration book', kind:'b5_c1_clerk', x:12, y:3, node:()=>b94Ph() === 2 ? 'b9_c4_yelt_night' : b94Ph() === 4 && b94Key() === 'book' ? 'b9_c4_book' : 'b9_c4_yelt', fresh:()=> b94Ph() === 1 ? !S.f.b9_c4_countTried : b94Ph() === 2 ? !!S.f.b9_c4_raidDone && !S.f.b9_c4_closed : b94Key() === 'book' && !S.f.b9_c4_keyDone},
        {id:'runner', name:'A quartermaster\'s runner', kind:'b9_c4_runner', x:14, y:1, node:()=>'b9_c4_runner', show:()=>b94Ph() === 1, fresh:()=>!S.f.b9_c4_runnerSeen},
        {id:'orla', name:'Orla, at her water-cart', kind:'b9_c2_orla', x:6, y:7, node:()=>'b9_c4_cart', show:()=>b94Ph() !== 2, fresh:()=>!S.f.b9_c4_orla},
        {id:'saffa', name:'Saffa, the field cook', kind:'b9_c2_saffa', x:4, y:5, node:()=>'b9_c4_saffa', show:()=>b94Ph() !== 2, fresh:()=>!S.f.b9_c4_saffa},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:9, y:3, node:()=>'b9_c4_crate', show:()=>b94Ph() === 1, fresh:()=>!S.f.b9_c4_drawn && !S.f.b9_c4_noCard},
        {id:'raiders', name:'Shapes at the water wagons', kind:'b6_bandit', x:13, y:1, node:()=>'b9_c4_raiders', show:()=>b94Ph() === 2 && !S.f.b9_c4_raidDone, fresh:()=>true} ] },

    /* 16 x 12 (b9_c4_wastes, day). The noon halt on open country: r bare stone  . dry grass  , the column's track  w the train halted
       along it  o barrels  h the outriders' horses  m an old cairn  x thorn  s the herd's track (after the stampede)  > the track east */
    { id:'b9_c4_wastes', title:'The Wastes · the noon halt', sub:'Day · the train halted on the track', hint:'Tap ground to move · tap a figure to talk · the outriders are north-east', decor:'b9_c4_wastes',
      map:[ "rrrrrrrrrrrrrrrr",
            "r......x.......r",
            "r..m.......hh..r",
            "r..............r",
            "r,,,,,,,,,,,,,,>",
            "rwwww.oo.wwww..r",
            "r..............r",
            "r.......x......r",
            "r...s..........r",
            "r..............r",
            "r.....x.....x..r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.,', triggers:{m:'b9_c4_cairn', h:'b9_c4_outrider', s:'b9_c4_spoor', w:'b9_c4_daywagons', o:'b9_c4_daywagons', '>':'b9_c4_eastward'}, start:{x:3, y:6},
      quest:()=> !S.f.b9_c4_herdDone ? 'The outriders, north-east. Something is raising dust on the northern sky.' : !b94Key() ? (S.f.b9_c4_spoorTried ? 'The Finadd. He has the day\'s orders.' : 'The herd\'s track, south-west. And the Finadd, with the day\'s orders.') : 'On, with the key\'s road.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:6, y:6, node:()=>'b9_c4_ennic3', fresh:()=>!!S.f.b9_c4_herdDone && !b94Key()},
        {id:'outrider', name:'A Bluerose outrider', kind:'b9_c4_outrider', x:10, y:3, node:()=>!S.f.b9_c4_herdDone ? 'b9_c4_herdsign' : 'b9_c4_outrider', fresh:()=>!S.f.b9_c4_herdDone || !S.f.b9_c4_spear},
        {id:'kaedra', name:'Kaedra, with the outriders', kind:'kaedra', x:5, y:8, node:()=>'b9_c4_spoor', show:()=>!!S.f.b9_c4_herdDone && !b9In('kaedra'), fresh:()=>!S.f.b9_c4_spoorTried},
        {id:'straggler', name:'A lamed bhederin', kind:'b3_c2_bhederin', x:12, y:9, node:()=>'b9_c4_straggler', show:()=>!!S.f.b9_c4_herdDone && !S.f.b9_c4_huntTried, fresh:()=>true},
        {id:'tilewoman', name:'The tile-woman, on a wagon', kind:'b5_c1_tilewoman', x:7, y:6, node:()=>'b9_c4_tilewagon', fresh:()=>false} ] },

    /* 16 x 12 (b9_c4_wastes, day). A dry wash out on the plain, the forage road: r stone  . dry grass on the banks  , the wash's bed
       e a seep  x thorn  < back to the column */
    { id:'b9_c4_wash', title:'The Wastes · a dry wash', sub:'Day · out with the outriders', hint:'Tap ground to move · tap a figure to talk · the herd is down in the wash', decor:'b9_c4_wastes',
      map:[ "rrrrrrrrrrrrrrrr",
            "r....x.....rr..r",
            "r..............r",
            "rr,,,,,,,,,,,,rr",
            "r,,,,,,,,,e,,,,r",
            "r,,,,,,,,,,,,,,r",
            "rr,,,,,,,,,,,,rr",
            "r..............r",
            "r...x......x...r",
            "<..............r",
            "r..rr.......x..r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.,', triggers:{e:'b9_c4_seep', '<':'b9_c4_wash_back'}, start:{x:1, y:9},
      quest:()=> !S.f.b9_c4_forageDone ? 'Down into the wash. The herd, and whoever is on the far lip.' : 'Back to the column, west, before dark.',
      npcs:[
        {id:'outrider', name:'The outriders\' decurion', kind:'b9_c4_outrider', x:4, y:7, node:()=>'b9_c4_decurion', fresh:()=>!S.f.b9_c4_decurion},
        {id:'herd', name:'The herd, in the wash', kind:'b3_c2_bhederin', x:7, y:4, node:()=>'b9_c4_washherd', show:()=>!S.f.b9_c4_forageDone, fresh:()=>true},
        {id:'barghast', name:'Painted riders on the far lip', kind:'b3_barghast', x:13, y:2, node:()=>'b9_c4_washherd', show:()=>!S.f.b9_c4_forageDone, fresh:()=>true} ] } ],

  battles:{
    /* the stampede: a bhederin herd spooked off the north runs across the train's flank. Survive it. Near certain. */
    b9_c4_herd:{title:'The stampede', style:'b9_c4_wastes', warrenText:'Noon on open country · dust, horns, the ground shaking · the Holds thin and cold', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold the train\'s flank four rounds while the herd goes by. Turn them, or stand where they will go round.'},
      map:["........","........","...t....","........",".t....t.","........","........","..t..t..","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_bluerose',6,8]],
      foes:[['b9_c4_bull',2,0],['b9_c4_bull',5,1],['b9_c4_bull',4,0]], xp:120, after:'b9_c4_herd_after',
      waves:[{round:2, foes:[['b9_c4_bull',1,0],['b9_c4_bull',6,0]], text:'More of them out of the dust, heads down, and the ground going on shaking.'}],
      preText:()=>`They come out of the dust in a brown wall, heads down, more of them than anybody had said the Wastes still held, and none of them is looking where it is going. The oxen behind the squad have started to bellow. The water wagons are behind the oxen.`},
    /* raiders on the train at night: Bolkando-border raiders, come for the chalked water wagons (never the Bolkando court) */
    b9_c4_raid:{title:'The water wagons', style:'b9_c4_wastes', dark:true, warrenText:'Night inside the wagon ring · oxen shifting, one lamp · the Holds thin and cold', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t..t..","........","........","...t....","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b9_escort',6,8]],
      foes:[['b9_lraider',2,1],['b9_lraider',5,1],['b9_lraider',3,2],['b9_lraiderbow',1,0],['b9_lraiderbow',6,0]], xp:380, after:'b9_c4_raid_after',
      preText:()=>`They came under the wagons on their bellies, between the wheels, and they are already at the water barrels with ropes and a cart-pony led in on a muffled bit. Two have short bows up on the wagon beds. They do not shout when they see the squad. Border raiders do not shout. They count.`,
      stage2:{title:'Outside the ring', xp:170,
        text:()=>`The ones at the barrels are down or gone back under the wagons. Out past the ring, in the dark, a man on a horse is waiting with the cart-pony's lead rope and a sword, and two more come up out of the grass beside him. He has a bone whistle on a thong round his neck, and he blows it once, short, and his people stop running away and turn round.${b94If('kaedra', `\n\nKaedra has an arrow on the string. "Border work," she says. "He's the one who counts. Take him and the rest go home."`)}${b94If('brennet', `\n\nBrennet has the wagon-pin in both hands. "That pony's harness is off our train," he says. "I know the stitching."`)}`,
        map:["#......#","........","..t..t..","........","...tt...","........",".t....t.","........","........","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b9_lraiderchief',3,1],['b9_lraider',5,1],['b9_lraiderbow',2,0]]} },
    /* the forage road: Barghast skirmishers who claim the herd in the wash (rule 89: no clan named; the war with the Akryn as headline) */
    b9_c4_forage:{title:'The dry wash', style:'b9_c4_wastes', warrenText:'Afternoon in a dry wash · dust, bhederin bawling, painted faces · the Holds thin', warren:{meanas:1, denul:1}, music:'battle',
      map:["..t.....","........","....t...","........",".t......","......t.","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_bluerose',1,8],['b9_bluerose',6,8]],
      foes:[['b9_lbarghast',2,1],['b9_lbarghast',5,1],['b9_lbarghast',4,1],['b9_lbarghastchief',3,0]], xp:220, after:'b9_c4_forage_after',
      preText:()=>`They come down off the far lip of the wash at a run, faces painted white, war-axes up, shouting in a tongue none of the squad has. They are not raiders. They are hunters at war with somebody else, and the herd was theirs before the Letherii saw it, and they mean to make that plain.`} },

  foes:{
    /* a bhederin of the stampede, at the Letherii's scale: big, blind with fright, not trying to kill anybody (low to hit) */
    b9_c4_bull:{name:'Stampeding bhederin', sig:'b', kind:'b3_c2_bhederin', hp:30, ac:11, atk:6, dmg:[1,6,2], rng:1, mv:6, init:2, sk:['shove'], verb:'blunders into'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b9_c4_bluerosespear:{name:'A Bluerose lance-spear', slot:'weapon', role:'reach', who:null, atk:1, rng:1, reach:true, dmg:[1,8,3],
      line:'A Bluerose outrider\'s lance cut down to a spear for fighting on foot: ash with a long steel head, a blue-dyed tassel under it gone grey with dust. The outriders carry one spare on every third saddle. One of them gave this to the squad that turned a herd off the horse lines, and said he would like it back in Lether.'},
    b9_c4_scoutcoat:{name:'A border scout\'s coat', slot:'armour', role:'light', who:null, ac:1, hp:2,
      line:'A long dun coat of felted wool with a hood, dry grass stitched into loops at the shoulders so a scout lying in the scrub looks like more scrub. Kaedra\'s spare, from the fort. The fort never paid for it either.'},
    b9_c4_bonewhistle:{name:'A raider\'s bone whistle', slot:'trinket', role:'any', who:null, hp:2,
      line:'A whistle cut from a bird\'s leg-bone, polished brown with handling, on a greasy thong. One short blast and the border raiders stop running and turn round. The squad does not mean to blow it. Everybody has tried it once, quietly, behind a wagon.'} },

  scenes:{
    b9_c4_dusk:{loc:'The Wastes', sub:'The escort\'s train · dusk', cap:'The train\'s wagons drawn in a ring on open country, ration crates stacked at the tailboards, cook-fires lit low, and the sky going red over nothing.', amb:'explore'},
    b9_c4_wash:{loc:'The Wastes', sub:'A dry wash · day', cap:'A dry wash cut into the plain, a few bhederin down in its bed by a seep, and smoke standing up far off to the north.', amb:'explore'} },

  end:{
    book:['An honest count', 'Out on the Wastes the escort\'s ration book came up short, and the squad found out who had been taking: a quartermaster\'s runner who chalked the water wagons for border raiders. The raiders came in the night and did not leave with the water. A herd ran across the train at noon and was turned. On the last of it the squad sat down with Yelt and counted every barrel and sack in the brigade\'s share again, by lamplight, and wrote the true number in the book, short as it was, and sent it up the column with the runner\'s marks pinned to it.'],
    forage:['Game, and a little water', 'Out on the Wastes the escort\'s ration book came up short, and the squad found out who had been taking: a quartermaster\'s runner who chalked the water wagons for border raiders. The raiders came in the night and did not leave with the water. A herd ran across the train at noon and was turned. Then the squad rode out after it with Kaedra and the Bluerose outriders, and met painted hunters in a dry wash who said the herd was theirs, and came back at dusk with meat on the horses and the skins full from a seep.'] },
  endScene:'b9_wastes',
  endCap:()=> b94Key() === 'forage' ? 'Open country at first light, the escort going on east, and meat salted in the brigade\'s wagons for the first time since Lether.' : 'Open country at first light, the escort going on east, and a ration book that says what is really in the wagons.',
  tease:'Next: the Third. Deep in the Wastes, on short rations, and a dead sutler\'s cache.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b9_c4_key === 'book') x.push(`The squad counted the brigade's ration book honest with Yelt, and sent the true number up the column.${f.b9_c4_book ? ' The book and the wagons agree, short as it is.' : ''}`);
    if (f.b9_c4_key === 'forage') x.push('The squad rode out after the herd with Kaedra and the Bluerose outriders, and came back with meat and water.');
    if (f.b9_kaedraDone === 1) x.push('Kaedra, a scout off the Bolkando border, walks with the squad. She will not sleep inside a tent.');
    if (f.b9_kaedraDone === 2) x.push('Kaedra, a scout off the Bolkando border, rides with the outriders, if the squad will have her.');
    if (f.b9_c4_spoorOk) x.push('Kaedra taught the squad to read the spoor.');
    if (f.b9_c4_raidDone) x.push('Border raiders came for the water wagons in the night, and met the squad.');
    if (f.b9_c4_herdDone) x.push('A bhederin herd ran across the train at noon, and the squad stood in front of the oxen.');
    if (f.b9_c4_hunted) x.push('The squad brought down a lamed straggler from the herd. Saffa made it go round three companies.');
    if (f.b9_c4_marks) x.push('The squad found the chalk under the water wagons\' tailboards before the raiders did.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b9_c4_marks && 'Chalk marks under the water wagons\' tailboards: a border raiders\' sign. A quartermaster\'s runner made them.',
    f.b9_c4_raidDone && 'Border raiders under the wagons at night, and a man with a bone whistle outside the ring.',
    f.b9_c4_herdDone && 'A bhederin stampede across the train\'s flank at noon. More of them than the Wastes were said to hold.',
    f.b9_c4_spoorOk && 'Reading the spoor: which way the stems lie, where the crust is broken, how old the print is.',
    f.b9_c4_outrider && 'The Bluerose outriders say the Barghast are at war with the Akryn on the plains north of the road. Their smoke is on the sky.',
    f.b9_c4_key && (f.b9_c4_key === 'book' ? 'The squad kept the ration book honest with Yelt: the true count, short, sent up the column.' : 'The squad rode out after the herd with the outriders, and met painted hunters in a dry wash.'),
    f.b9_kaedraDone != null && 'A scout named Kaedra came in with the outriders: half Bolkando, off a border fort that stopped paying her. She asked for a squad that walks.',
    'The Sixth Company, in the Commander\'s escort, out on the Wastes.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: dusk at the train ======== */
    b9_c4_start:()=>({sp:'The escort\'s train', scene:'b9_c4_dusk', fx:()=>{ S.f.b9_c4_ph = S.f.b9_c4_ph || 1; }, again:()=>'The train\'s camp at dusk, the wagons drawn in, the cook-fires low.', txt:
`The brigade's wagons come off the track one after another and draw in nose to tail, a ring of them on dry grass with the oxen inside it, and the carters chock the wheels and drop the shafts. It is the same every night now. The carters no longer wait to be told.

The cook-fires are lit low, on dung and thorn, because there is nothing else to burn. The water goes round by the cup.${b94Say({thegg:`\n\nThegg is letting his belt out a hole and then, after a moment's thought, taking it in two. "Saffa says the pot's thinner tonight," he says. "I said I'd noticed. She said I would."`, tobet:`\n\nTobet is sitting on a ration crate counting his arrows, which is something to count that does not get smaller every day.`, _:''})}${b94If('brennet', `\n\nBrennet is going round the ring tapping wheels with his pin. "Nine squeaks," he says when he comes back. "Eight yesterday." He does not say which wagon. He looks as if he could.`)}

Finadd Ennic is at the company's tents with his slate. Out past the ring, on the dark side, the Bluerose outriders are coming in off the plain, and with them, on foot, somebody who is not a Bluerose outrider.`,
      ch:[{t:'The Finadd.', go:'b9_c4_ennic'},
          b9ReadChoice(4),
          {t:'The outriders coming in, and whoever is walking with them.', go:'b9_c4_kaedra'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b9_c4_read:()=>b9ReadOffer(4),
    b9_c4_card:()=>b9ReadCard(4),

    /* Finadd Ennic: the night's word */
    b9_c4_ennic:()=>{ const ph = b94Ph();
      if (ph >= 4) return {sp:B5_FINADD.name, scene:'b9_c4_dusk', txt: S.f.b9_c4_keyDone ?
`Finadd Ennic is writing on his slate by the light of somebody else's fire. "East again at first light," he says. "The Wastes are wider than the clerks drew them. I am told that is traditional."` :
`Finadd Ennic looks up. "${b94Key() === 'book' ? 'Yelt is waiting, Sergeant. With the book open. He waits no other way.' : 'You have the outriders\' horses, Sergeant. Go and use them before the herd remembers it has legs.'}"`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:'b9_c4_dusk', fx:()=>{ S.f.b9_c4_orders1 = 1; }, again:()=>`${b94Ennic()}, with his slate. "Yelt, Sergeant. And the outriders' scout."`, txt:
`Finadd Ravel Ennic has stopped shaving every day, which in Ennic is a confession. He has the slate under his arm and dust in the creases of his face.

"Sergeant. Three things." He holds up a finger for each. "The ration. It goes down a step again from tomorrow. Do not ask me how many steps there are; the quartermasters do not know, and I would rather not know with them. Yelt says his count is short, and he would like the Sixth to look at it, because the Sixth is the only company he says can count."

"The mages." He lowers his voice. "Ours cannot feel the Holds. The foreigners' cannot feel whatever it is theirs feel. The soldiers have noticed. They say the Malazan mages have fallen, and they say it in the voice they used to keep for the river." He lowers the finger. "Tell them it does not matter. I will be telling them that myself, and I would like to hear it from somebody else."

"And the outriders brought in a scout tonight. On foot. She asked for a squad that walks, and I said I had one." He looks at you. "Go and see what she wants."${b94If('perrit', `\n\nPerrit is looking at the dark. "It does matter," she says, very quietly, when he has gone. "I'll say it doesn't. But it does."`)}`,
        ch:[{t:'"The Barghast, Finadd. The smoke to the north."', req:()=>!S.f.b9_c4_smoke, go:'b9_c4_ennic_smoke'},
            {t:'"The count, then. And the scout."', go:()=>startExplore()},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c4_ennic_smoke:()=>({sp:B5_FINADD.name, scene:'b9_c4_dusk', fx:()=>{ S.f.b9_c4_smoke = 1; }, txt:
`"The painted clans." Ennic looks north, where a smudge on the red sky has been standing since noon. "At war with the Akryn, the outriders say, on the plains above the road. Not with us. Not yet." He tucks the slate under his arm. "The Commander has said the escort will keep to the track and keep its distance, and I agree with the Commander, which I am told is in my orders."

"Every legend in Lether has the Barghast in it somewhere. Usually at the end." He considers. "I have decided not to be in a legend."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Kaedra (the first halt): a scout off the Bolkando border, come in with the Bluerose outriders */
    b9_c4_kaedra:()=>{ const d = S.f.b9_kaedraDone;
      if (d === 2) return {sp:'Kaedra', scene:'b9_c4_dusk', txt:
`Kaedra is sitting outside the outriders' horse lines, not in a tent, with the horn bow across her knees and the hood down. She looks up when you come over, and waits, as scouts wait: without seeming to.`,
        ch:[{t:'"Walk with us, Kaedra."', fx:()=>{ b9Join('kaedra'); }, go:'b9_c4_kaedra_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (d === 1) return {sp:'Kaedra', scene:'b9_c4_dusk', txt:
`Kaedra is restringing the horn bow by the horse lines with the outriders, who tolerate her the way cavalry tolerate anybody on foot.`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'A scout on foot', scene:'b9_c4_dusk', again:()=>'The scout from the border, by the horse lines, waiting to be told.', txt:
`She comes in at the tail of the outriders with her hood up and a horn bow slung, walking where the horses walk, and stops in front of the squad and pushes the hood back: a woman of twenty-five or so, lean, burned dark by the sun, in a dun coat with dry grass stitched in loops at the shoulders. A blue bead on a thong at her throat.

"Sixth Company," she says. "They said you walk." Her Letherii has the border in it, the vowels flattened. "Kaedra. Seven years a scout of the forts on the Bolkando marches. The fort stopped paying us last season. When the escort came past the gate I walked out of it, and nobody stopped me, which says what they thought I was worth."

"I've been guiding for the outriders." She glances back at the horses. "They ride round anything they don't like. I walk through it and look at it. They don't like that either." She shrugs. "I'd like a squad that walks. I can read the ground for you. I can hit what I see."`,
        ch:[{t:'"Walk with us, Kaedra."', fx:()=>{ b9Join('kaedra'); }, go:'b9_c4_kaedra_join'},
            {t:'"Why walk out of the gate at all?"', req:()=>!S.f.b9_c4_kaedraWhy, go:'b9_c4_kaedra_why'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c4_kaedra_why:()=>({sp:'Kaedra', scene:'b9_c4_dusk', fx:()=>{ S.f.b9_c4_kaedraWhy = 1; }, txt:
`She touches the blue bead.

"My mother was a Bolkando trader. My father kept the fort's gate. The fort was on ground both kingdoms say is theirs, so both kingdoms sent it orders and neither sent it bread." She says it flatly, a sum she has done many times. "I scouted into the Wastes' edge for them for seven years. I always turned back at the same ridge, because the maps did."

"The escort was going past the ridge." She looks east, at the dark. "I wanted to see what the middle looks like. One of us should." She almost smiles. "Swear in Bolkando, pray in Letherii. You'll hear both."${b94If('tobet', `\n\nTobet nods, slowly. "Fort stopped paying you," he says. "Did they write it down?" Kaedra looks at him. "Every day," she says. Tobet nods again, as one Indebted man to one unpaid scout.`)}`,
      ch:[{t:'"Walk with us, Kaedra."', fx:()=>{ b9Join('kaedra'); }, go:'b9_c4_kaedra_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c4_kaedra_join:()=>({sp:'Kaedra', scene:'b9_c4_dusk', txt:
`${b9In('kaedra') ? `She nods, once, and slings the bow, and walks over to the squad's end of the camp as if she had always been going there.

"I don't sleep in tents," she says, while she is told where the squad's tents are. "I'll be outside it. If you hear me, wake up." She puts her pack down by the fire.${b94If('thegg', ` Thegg looks at her bow, and at her, and says it is very small. "So is an arrowhead," Kaedra says.`)}${b94If('brennet', ` Brennet nods to her from the wagon he is chocking. "Walker," he says. "Good. I'm tired of riders."`)}` : `She nods, and goes back to the horse lines: six already walk with the squad, and a scout can count. "When there's room," she says. "I'll be with the outriders. They need somebody to tell them what they've ridden past."`}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Yelt and the ration book: who has been taking */
    b9_c4_yelt:()=>{ const tried = S.f.b9_c4_countTried;
      if (b94Ph() >= 4) return {sp:'Yelt', scene:'b9_c4_dusk', txt: S.f.b9_c4_keyDone && b94Key() === 'book' ?
`Yelt sits at the tailboard with the book shut on his knee and both hands flat on it. "Sent up," he says. "Short. True." He seems, for Yelt, almost at peace.` :
`Yelt is at the tailboard counting, as he is always counting. He nods to the squad without stopping.`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'Yelt', scene:'b9_c4_dusk', fx:()=>{ S.f.b9_c4_yelt = 1; }, html:rationsHTML(), again:()=> tried ? (b94Marks() ? 'Yelt, at the water wagons, watching the chalked tailboards and pretending not to.' : 'Yelt, at the water wagons, counting the same wagon again.') : 'Yelt, at the water wagons, with the ration book open and a frown.', txt:
`Yelt has grown thinner on the march and somehow cleaner. He is sitting at the tailboard of the first water wagon with the ration book open on his knees, a lamp on the hook, and a face that has been doing a sum and not liking the answer.

"Sergeant." He turns the book round. "${b94Yelt2()[0].toUpperCase() + b94Yelt2().slice(1)}. So I asked for you." He puts a finger on a column. "Four barrels of water and a sack of meal, gone off the brigade's share in three nights. Not lost. Not spilled. I have counted the staves. Gone."

"Out here, four barrels is a company for a day and a half." He closes the book on his finger. "Somebody on this train has been taking, Sergeant. I would like to know who before the quartermasters cut the ration again and blame the oxen."${b94If('brennet', `\n\nBrennet has been listening with his head on one side. "Wagons eleven and fourteen ride different since Letheras," he says. "Lighter at the back." He does not say it as a guess.`)}`,
        ch:[{t:'Go through the count with Yelt, wagon by wagon, and find where it leaks.', check:['wits', 16], rations:true, req:()=>!tried,
              edges:id=>[id === 'perrit' && ['a ledger is a sum, and she does sums', 2], id === 'brennet' && ['he knows every wagon by how it rides', 2], id === 'ilsa' && ['she read Patriotist ledgers for a living', 2], id === 'kaedra' && ['a scout reads marks for a living', 1], S.f.b9_c4_runnerSeen && ['the runner at the water wagons, who was not counting', 1], id === 'tobet' && ['he has watched clerks lose things on purpose', 1], id === 'sgt' && ['you have checked the company\'s stores every pay-day for years', 1], id === 'thegg' && ['he reads slowly, and Yelt does not wait', -1], id === 'ruuk' && ['he will not look at writing', -1]],
              near:{t:()=>`Yes, but it means going under every water wagon in the ring on hands and knees with a lamp, and ${b94Nm(b94Who())} ${b94V(b94Who(), 'come', 'comes')} out from under the last one with a cracked head off an axle and the count going round and round behind the eyes: rattled.`, fx:()=>b94Rattle(b94Who())},
              fx:()=>{ S.f.b9_c4_countTried = 1; }, go:'b9_c4_yelt_ok', fail:'b9_c4_yelt_no'},
            {t:'"We\'ll sit the train tonight."', req:()=>tried && b94NightReady(), onward:true, go:'b9_c4_tonight'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c4_yelt_ok:()=>({sp:'Yelt', scene:'b9_c4_dusk', fx:()=>{ S.f.b9_c4_marks = 1; }, txt:
`${by({brennet:'Brennet goes straight to wagon eleven and lies down under its tailboard with the lamp, and says "There," in a voice nobody has heard him use.', perrit:'Perrit runs her finger down the book and says the barrels go missing only from the wagons on the ring\'s north side, the dark side, every night, in the same order, which is not how thieves who are guessing steal.', kaedra:'Kaedra crouches by the first water wagon and looks at the dust under it, not the book, and puts her finger on a scuffed patch nobody else had seen.', _:'{who} goes under the water wagons with the lamp, one after another, and comes out from under the fourth one very quiet.'})}

Under the tailboards of the water wagons on the north side of the ring, low down where no carter looks, somebody has chalked a mark: a ring with a stroke through it. Fresh on two of them. Old and smudged on the rest.

${b94Kae(`"Border sign," Kaedra says. "Raiders' chalk. It means water, and no guard." She rubs one out with her thumb, then thinks better of it and leaves the rest. "Somebody on your train is telling them where."\n\n`)}Yelt looks at the chalk for a long breath. "The quartermaster's runner," he says. "He has been walking the water wagons every evening with a slate, for the quartermaster. I thought he was counting." He writes something very small in the margin. "If they came last night and found the guard doubled, they will come tonight to the wagons the chalk says are still open."`,
      ch:[{t:'"Then the Sixth will be at those wagons."', onward:true, req:()=>b94NightReady(), go:'b9_c4_tonight'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c4_yelt_no:()=>({sp:'Yelt', scene:'b9_c4_dusk', txt:
`The lamp goes from wagon to wagon round the ring, and every tailboard has its number and its barrels, and none of them tells anybody anything. The count is short. It stays short.

Yelt closes the book. "Then we watch," he says. "All night, if the Sixth will. Whoever it is will come back. Thieves who find a full well come back to it." He does not sound comforted by it.`,
      ch:[{t:'"Then the Sixth will sit the train."', onward:true, req:()=>b94NightReady(), go:'b9_c4_tonight'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the quartermaster's runner (left open by Ch 2): walking the water wagons with a slate */
    b9_c4_runner:()=>({sp:'A quartermaster\'s runner', scene:'b9_c4_dusk', fx:()=>{ S.f.b9_c4_runnerSeen = 1; }, txt:
`A young man with a quartermaster's armband and a slate is going along the water wagons on the north side of the ring, not the south, stooping at each tailboard as if reading the number, though the numbers are chalked at the top.

He straightens when the squad comes over. "Checking the count," he says. "For the quartermaster." He smiles, a quick bright smile that does not reach anywhere. "Everything's fine. Everything's in order. Excuse me." He goes off toward the officers' fires a little faster than any clerk who had finished checking anything.${b94If('ilsa', `\n\nIlsa watches him go. "He held the slate upside down," she says, "the whole time."`)}${b94If('kaedra', `\n\nKaedra is looking at the dust where he stooped. She looks at it for longer than she needs to.`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Orla's water-cart: the water by the cup */
    b9_c4_cart:()=>({sp:'Orla', scene:b94Ph() === 3 ? 'b9_wastes' : 'b9_c4_dusk', fx:()=>{ S.f.b9_c4_orla = 1; }, txt:
`Orla's water-cart stands inside the ring with its tap tied shut with a rag and a cup on a string beside it. Orla sits on the shaft with her cudgel and gives out the water herself, a cup to a soldier, and watches each one drink it.

"A cup at dusk," she says. "A cup at dawn. A skin a squad for the march." She looks at the squad. "${S.f.b9_c2_orla === 'out' ? 'You lifted my cart out of a ditch outside Letheras. You get the same cup as everybody. I\'ll pour it slower.' : 'Same cup as everybody. Don\'t argue. Everybody argues.'}"${b94If('ammet', `\n\nAmmet holds out her cup and asks for it boiled, for the sick-cart. Orla looks at her, and fills a second cup, and says nothing about it to anyone.`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Saffa: the thin pot */
    b9_c4_saffa:()=>({sp:'Saffa', scene:'b9_c4_dusk', fx:()=>{ S.f.b9_c4_saffa = 1; }, txt: S.f.b9_c4_hunted && b94Ph() >= 4 ?
`Saffa has the lamed bhederin in her pot, or the best of it, and is stirring with the face of a woman holding a parade. "Three companies," she says. "One beast. It'll go round." She ladles. "Thicker tonight. Don't get used to it."` :
`Saffa's pot is as big as it was outside Letheras. What is in it is not. It smells of salt and onion and has, she says, been near some pork.

"I told you it'd be thinner," she says. "I said so so nobody would shout at me." She ladles a squad's share into the pot the Sixth holds out, and it does not fill it. "Not one of them has shouted. That's worse. They just look at the ladle."${b94Say({thegg:`\n\nThegg looks at his bowl, and then at Perrit's, and tips half of his biscuit into hers without saying anything. Perrit tips it back. They do this twice.`, tobet:`\n\nTobet breaks his biscuit in two and gives half to the carter at the next fire, who has none, and eats the other half very slowly.`, _:''})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the ring, the barrels, a wagon, the oxen, the horse lines */
    b9_c4_ring:()=>({sp:'The wagon ring', scene:b94Ph() === 2 ? 'b9_camp_night' : 'b9_c4_dusk', txt:
`The wagons are drawn in nose to tail, wheels chocked, shafts down, with a gap at each end of the ring wide enough for a file and closed at night with a cart. Outside them the plain goes away flat in every direction until it stops being anything at all.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_barrels:()=>({sp:'The water wagons', scene:b94Ph() === 2 ? 'b9_camp_night' : 'b9_c4_dusk', txt: b94Ph() === 2 && !S.f.b9_c4_raidDone ?
`The water wagons on the north side of the ring, dark against the dark, barrels lashed three high. Something moves between the wheels, and stops.` :
`Water barrels, lashed three high, each with a number burned into the stave and a line in Yelt's book.${b94Marks() ? ' Under the north side\'s tailboards, low down, the chalk rings with a stroke through them.' : ''} On the end of one somebody has written in chalk, in a soldier\'s hand: <em>still not for washing</em>.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_wagon:()=>({sp:'A wagon', scene:b94Ph() === 2 ? 'b9_camp_night' : 'b9_c4_dusk', txt:
`A supply wagon inside the ring with its tilt patched in three colours and its tailboard down for the night, meal sacks stacked inside, each tagged with a weight that is still, Yelt says, true.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_oxen:()=>({sp:'The oxen', scene:b94Ph() === 2 ? 'b9_camp_night' : 'b9_c4_dusk', txt:
`The oxen stand on their picket inside the ring, thinner than they were on the muster ground, chewing what the carters cut for them along the track, which is not much. Their ribs show in the lamplight, and so do the carters'.${b94If('brennet', `\n\nBrennet goes down the line with a handful of something green he found in a gully and gives each ox a mouthful, saying its name. "Ninety-one," he says when he comes back. "Three gone since the edge." He does not say where. The pot was thicker those nights.`)}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_horses:()=>({sp:'The horse lines', scene:'b9_c4_dusk', txt:
`The Bluerose outriders' horses stand on their picket in the south-east of the ring, rubbed down, blanketed, with more water to the head than any soldier on the train gets, which the soldiers have noticed. The outriders sit among them oiling blue scale and do not look up.${b94If('sorvan', `\n\nSorvan goes along the line and the outriders look up for him. He comes back with a handful of oats for the squad's pot. "They say they owe the Sixth," he says. "I didn't ask what for. They gave it anyway."`)}`,
      ch:[...(b94Ph() === 1 || b94Ph() >= 4) && (S.f.b9_kaedraDone == null || b94KWaits()) ? [{t:'The scout from the border.', go:'b9_c4_kaedra'}] : [],
          {t:'Back.', go:()=>startExplore()}]}),

    /* the tile-woman at a ration crate (the reading's place) */
    b9_c4_crate:()=>({sp:'The tile-woman', scene:'b9_c4_dusk', again:()=>'The tile-woman on her ration crate, with the bag of bone tiles. "Still a dock."', txt:
`The old woman who reads tiles for the escort is sitting on a ration crate at the tailboard of a meal wagon with her shawl up against the dust and her oiled bag on her knee. She came out of Letheras on the back of a wagon. She has not been off it much since.

"Wastes," she says. "Never thought I'd see them." She looks round at the empty plain going dark. "Not much to see. I'll tell them at home it was terrible."${b94If('perrit', `\n\nShe looks at Perrit. "Your cadre girl's tiles are cold," she says. "Mine are bone. Bone's always cold. It doesn't notice."`)}`,
      ch:[b9ReadChoice(4),
          {t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the way on from dusk: sit the train tonight */
    b9_c4_tonight:()=>({sp:'The escort\'s train', scene:'b9_c4_dusk', txt:
`The light goes. The cook-fires go down to a red glow, one by one. The carters roll themselves in blankets under their wagons. The outriders' horses stop shifting.

The Sixth takes its blankets to the water wagons on the north side of the ring${b94Marks() ? ', the chalked ones,' : ''} and lies down beside them with its boots on and its weapons by its hands, and does not sleep.`,
      ch:[{t:'Night. Sit the train.', fx:()=>{ S.f.b9_c4_ph = 2; }, go:()=>{ startExplore('b9_c4_camp'); talk('b9_c4_night_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ======== the fire: by phase. 1 dusk, 2 that night after the raid (the Witness), 4 and 5 the evening after. The games pass wraps
       this node: keep the id ======== */
    b9_c4_fire:()=>{ const ph = b94Ph(), night = ph === 2, rk = ph >= 4 ? 'b9_c4_rest4' : 'b9_c4_rest1';
      return {sp:'The squad\'s fire', scene:night ? 'b9_camp_night' : 'b9_c4_dusk', html:rationsHTML(),
        again:()=> night ? 'The squad\'s fire, down to coals, inside the wagon ring.' : 'The squad\'s fire, small, on dung and thorn, inside the wagon ring.', txt:
`${night ? `The squad's fire is down to coals inside the ring, banked with dung to keep it in till morning. Yelt has come over from the water wagons with his book under his arm and sat down at it without being asked, which he has never done before.${S.f.b9_c4_closed ? ' He has the book shut on his knee.' : ''}` : ph >= 4 ? `The squad's fire inside the ring at evening, on dung and the last of the thorn, with the plain going red and then grey round the wagons.${S.f.b9_c4_keyDone ? ' First light, the column goes on east. It always goes on east.' : ''}` : `The squad's fire is a small one inside the wagon ring, on dung and thorn, with a ring of stones round it that the squad carries from camp to camp because there are no stones out here worth the name.`}${b94If('kaedra', `\n\nKaedra sits a little back from the fire, on the ground, outside the light, where she can see the plain.`)}${b94If('brennet', `\n\nBrennet has his back to a wagon wheel and one ear toward the oxen.`)}`,
        ch:[...(ph === 1 ? [b9ReadChoice(4)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!night && !S.f[rk], fx:()=>{ S.f[rk] = 1; rest(ph >= 4 ? 'The squad sits an hour by the fire at evening. The aches go down, mostly.' : 'The squad sits an hour by the fire at dusk. Blisters close, mostly.'); }, go:'b9_c4_fire_rest'},
            {t:'Talk with the squad.', go:'b9_c4_fire_talk'},
            {t:'"What did Lether send us out here for?"', req:()=>night && !!S.f.b9_c4_closed && !(S.b9 && S.b9.wit && S.b9.wit.c4), go:'b9_c4_witness'},
            {t:'Sit the train tonight.', req:()=>ph === 1 && b94NightReady(), onward:true, go:'b9_c4_tonight'},
            {t:'Sleep, what is left of the night.', req:()=>night && !!S.f.b9_c4_closed, onward:true, go:'b9_c4_turnin'},
            {t:'First light. East.', req:()=>ph === 5 && !!S.f.b9_c4_keyDone, onward:true, go:'b9_c4_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c4_fire_rest:()=>({sp:'The squad\'s fire', scene:'b9_c4_dusk', txt:
`An hour, then, on the dry grass by the fire, with the camp going quiet round it and the stars coming out over the wagons more of them than anybody from a city ever sees.

${b94Say({ammet:`Ammet goes round the squad with her satchel and looks at feet. "Boots off," she says. "Out here the feet go first and the rest of you goes after." She lances a heel before its owner can object.`, perrit:`Perrit sits with her palm flat on the ground and her eyes shut. "Nothing," she says. "The Holds are a long way down." She opens her eyes. "Rest anyway. That still works."`, _:'Some of them sleep. The rest watch the fires go down.'})}${b94If('kaedra', `\n\nKaedra does not rest. She walks the outside of the ring once, slowly, looking at the ground, and comes back and sits down. "Nothing," she says. "Yet."`)}`,
      ch:[{t:'Back to the fire.', go:'b9_c4_fire'}]}),
    b9_c4_fire_talk:()=>{ const late = b94Ph() >= 3, ln = [];
      if (b9In('tobet')) ln.push(late ? `Tobet is cutting new fletchings from a bhederin's tail-hair he picked up off the track. "Lether's geese are a long way back," he says. He tries one. "This'll fly. Worse. It'll fly."` : `Tobet has his tally-stick out and is running his thumb down it. "The paybook says I owe the house nothing now," he says. "The ration book says the brigade owes the Wastes four barrels." He puts it away. "I liked it better when it was only me that owed."`);
      if (b9In('thegg')) ln.push(late ? `Thegg is holding his shield out level by the fire, for no reason, the Malazan way. "The sergeant said stand like that when it comes," he says. "It hasn't come. I'm practising." He holds it. "In case."` : `Thegg has his hands round his cup and his belt on its new hole. "My mother said hunger was a thing you said out loud once and then never again," he says. "So." He looks at the cup. "I'm hungry." He drinks. "There. Done."`);
      if (b9In('perrit')) ln.push(late ? `Perrit is doing sums in the dust with a stick, the ration book's sums. "Twelve thousand, near enough," she says. "Water by the cup." She looks at the number a while, then rubs it out with her boot. "I won't tell you. You'll do it yourself, and then we'll both know."` : `Perrit is turning a black tile in her fingers. "The soldiers say the Malazan mages have fallen," she says. "As if they were a wall." She puts the tile away. "The truth is quieter. We reach for the Holds and they're further down than they were. Every night, a little further. Like a well going dry."`);
      if (b9In('ammet')) ln.push(late ? `Ammet is boiling her linen in a pot no bigger than a fist. "One surgeon to the company," she says, "and the Letherii cure for the fever is water, and boiling, and time." She watches the pot. "We have one of those."` : `Ammet is rubbing grease into a carter's cracked hands at the next fire, then comes back. "He said he couldn't pay," she says. "I said nobody can, out here. It's the only fair thing about it."`);
      if (b9In('ilsa')) ln.push(late ? `Ilsa is reading the brigade's orders for tomorrow, pinned to a wagon. "East," she says. "Again. In a firmer hand." She smooths it. "The firmer the hand, the less anybody knows."` : `Ilsa sits with her grey coat round her, watching the quartermaster's tents. "In the files," she says, "the man with the slate was always the one to watch. Not the one with the sword." She almost smiles. "Nothing changes. Not even out here."`);
      if (b9In('sorvan')) ln.push(late ? `Sorvan has been with the outriders. "They've seen smoke every day," he says. "North. The painted clans and the Akryn, fighting over grass." He works oil into a plate of his scale. "It isn't our war. The outriders keep saying so. They keep saying it louder."` : `Sorvan is oiling his blue scale plate by plate. "The outriders' horses get more water than we do," he says. "I told them so." He works a plate. "They said, then carry the escort on your back, foot-soldier." He looks pleased despite himself. "They called me foot-soldier."`);
      if (b9In('ruuk')) ln.push(late ? `Ruuk is lying on his back watching the sky. "In Faraed," he says, "we would have eaten the herd and let the Barghast have the bones and gone home." He grins at the stars. "Lether keeps a book about it."` : `Ruuk is grinning at the empty plain. "Nothing out there," he says. "Not even a man to steal from." He thinks. "There's stealing anyway. That's Lether. You can take it into the Wastes."`);
      if (b9In('brune')) ln.push(late ? `Brune has her face turned west, toward the sea she cannot see. "The Shore is very quiet," she says. "Further every day." She pulls her knees up. "I say the words anyway. Something should be listening."` : `Brune is rubbing dust out of her eyes. "No sea," she says. "No river. No rain." She blinks. "Even the dust is dry. I didn't know dust could be drier."`);
      if (b9In('pessa')) ln.push(late ? `Pessa has the boathook across her knees, still wrapped. "No canals," she says. "No boats." She pats it. "I used it to pull a raider off a wagon last night. It's still a boathook. I'll tell it so."` : `Pessa is scowling at the quartermaster's tents. "Somebody's been taking our water," she says. "Out here." She spits, then regrets it, because it was water. "I want to meet him. Briefly."`);
      if (b9In('brennet')) ln.push(late ? `Brennet is carving a new chock for wagon eleven from a piece of the old one. "The train's held," he says. "Every wagon still rolls." He blows the dust off the chock. "The Wastes don't care if it rolls. I do."` : `Brennet is eating Saffa's stew slowly out of his carved tin. "First time in my life I've gone hungry on my own account," he says. "Not the house's." He finishes it. "Still hungry. But it's mine."`);
      if (b9In('kaedra')) ln.push(late ? `Kaedra is sitting outside the light with the horn bow across her knees. "The middle of the Wastes," she says, "looks like the edge of the Wastes, so far." She looks east. "I'll keep looking. The forts' maps stopped at the ridge. Everything past it is mine."` : `Kaedra is sitting outside the light, eating her ration in small pieces. "On the border we'd count the days to the next wagon from Lether," she says. "Then the days to the next one from Bolkando. Neither came." She chews. "This one comes. It's short. But it comes."`);
      return {sp:'The squad\'s fire', scene:b94Ph() === 2 ? 'b9_camp_night' : 'b9_c4_dusk', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b9_c4_fire'}]}; },

    /* ======== phase 2: that night, the raid ======== */
    b9_c4_night_arrive:()=>({sp:'The escort\'s train', scene:'b9_camp_night', again:()=>'The train\'s ring at night, one lamp at Yelt\'s tailboard, the water wagons dark on the north side.', txt:
`Night, deep, cold the way the Wastes are cold once the sun is off them. The ring of wagons is a black wall against the stars. One lamp burns at Yelt's tailboard, turned low.

It is a long time to lie still. Then, near the middle of the night, ${b94Say({kaedra:'Kaedra\'s hand comes down flat on your arm in the dark. "North side," she breathes. "Under the wagons. Four. Five." She has not lifted her head.', brennet:'Brennet sits up very slowly beside the water wagons. "Somebody\'s at the chocks," he whispers. "Ours don\'t creep."', tobet:'Tobet\'s bowstring creaks, very softly, as he draws. "North side," he says. "On their bellies."', _:'one of the oxen lifts its head and blows, and the squad hears it too: something moving between the wheels on the north side.'})}`,
      ch:[{t:'To the water wagons.', go:'b9_c4_raiders'},
          {t:'Walk the ring.', go:()=>startExplore()}]}),
    b9_c4_raiders:()=>({sp:'Shapes at the water wagons', scene:'b9_camp_night', txt:
`They are under the water wagons on the north side, between the wheels, dark shapes working at the lashings with knives. A cart-pony is being led in through the gap at the end of the ring on a muffled bit. Two of them are up on the wagon beds with short bows, watching the fires.${b94Marks() ? ' They are at the chalked wagons, every one.' : ''}${b94If('tobet', `\n\nTobet has an arrow on the string. "The ones on the beds first," he says. "They're looking at the fires. We're not at the fires."`)}`,
      ch:[{t:'"Sixth. At the water." Straight at them.', go:()=>startBattle('b9_c4_raid', {})},
          {t:'Wait by the chalked wagons until their hands are full, and take them there.', check:['guile', 16], req:()=>b94Marks(),
            edges:id=>[id === 'kaedra' && ['a border scout knows how raiders come in, and when', 2], id === 'ruuk' && ['a Faraed guide moves in the dark like the dark', 2], id === 'brennet' && ['the wagons are his, and so is the dark under them', 1], id === 'tobet' && ['a bowman knows how to wait', 1], id === 'ilsa' && ['she watched the agents move in Letheras', 1], id === 'thegg' && ['he is very large, and oxen notice', -1], id === 'sorvan' && ['blue scale in the dark is a bell', -1]],
            near:{t:()=>`Yes, but waiting means lying still on the cold ground under a wagon until the raiders are close enough to touch, and ${b94Nm(b94Who())} ${b94V(b94Who(), 'come', 'comes')} up out of it stiff in every joint, slow on the first step: it will hurt in the fight.`, fx:()=>bruise(b94Who(), bruiseN())},
            go:()=>startBattle('b9_c4_raid', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c4_raiders_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c4_raiders_seen:()=>({sp:'Shapes at the water wagons', scene:'b9_camp_night', txt:
`An ox blows. A head comes round under a wagon. Then all of them, together, and the knives come off the lashings and turn the other way.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c4_raid', {surprise:'e'})}]}),
    b9_c4_raid_after:()=>({sp:'The escort\'s train', scene:'b9_camp_night', fx:()=>{ if (!S.f.b9_c4_raidDone) { S.f.b9_c4_raidDone = 1; S.f.b9_c4_runner = 'gone'; gain('b9_c4_bonewhistle'); } }, txt:
`Quiet again inside the ring. The barrels are still lashed, two of them cut half through. The cart-pony stands where it was left with its muffled bit, looking embarrassed. The man with the whistle is down in the grass outside the ring, and the rest have gone back into the dark the way they came, toward the south and the border, and will not come back to this train.

The whistle is still on its thong round his neck: a bird's leg-bone, polished brown. It goes in the kit.

A carter comes running from the officers' fires with a lamp. The quartermaster's runner is gone, he says. His blankets are gone and so is a skin of water and a horse from the remounts. A sentry saw a rider go out of the south gap of the ring just before the shouting.${b94Say({kaedra:`\n\nKaedra crouches by the dead man's horse and looks at its shoes. "Fort-shod," she says. "One of ours, once." She stands. "The border sells everything. It always did."`, brennet:`\n\nBrennet is going along the cut lashings with new rope, and checking each bung with his thumb. "All there," he says. "Two cut. None gone." He sounds as if he owes somebody that.`, _:''})}

Yelt is coming along the wagons with his lamp and his book.`,
      ch:[{t:'Yelt.', go:'b9_c4_yelt_night'},
          {t:'Back to the ring.', go:()=>startExplore()}]}),
    b9_c4_yelt_night:()=>({sp:'Yelt', scene:'b9_camp_night', fx:()=>{ if (S.f.b9_c4_raidDone) S.f.b9_c4_closed = 1; }, txt: !S.f.b9_c4_raidDone ?
`Yelt is at his tailboard with the lamp turned down and the book shut, listening. "North side," he whispers. "I heard them." He does not get up. "I am a clerk. I have written down that I heard them."` :
`Yelt goes along the water wagons with the lamp held up, counting, and then counts again, and writes it in the book in his small exact hand. Then he writes the runner's going, and the horse, and the skin of water, and draws a line under it.

"Four barrels and a sack," he says, "owed by a man who will not pay." He looks at the line. "That is very Letherii of him." Then he closes the book, which the squad has never seen him do with anyone watching, and comes to the Sixth's fire with it under his arm.`,
      ch: S.f.b9_c4_raidDone ? [{t:'To the fire, with Yelt.', go:'b9_c4_fire'}] : [{t:'Back to the ring.', go:()=>startExplore()}]}),

    /* the Witness beat: at the train's fire, Yelt's ledger closed */
    b9_c4_witness:()=>({sp:'The squad\'s fire', scene:'b9_camp_night', html:rationsHTML(), txt:
`Yelt sits with the book shut on his knee and his hands flat on the cover, and looks at the coals.

"I keep the book," he says, "because a count is the only thing that will get anybody home. Everybody says so. I say so." He turns the book over, and back. "But nobody has told me where home is from here. Or what we are here for. The Commander asked for soldiers who came back. Lether sent them. Into this." He looks round the fire at the squad, at the empty country past the wagons. "What did Lether send us out here for, Sergeant? I would like to write it down."${b94If('kaedra', `\n\nKaedra is listening from outside the light. She does not offer an answer. She is new, and she wants to hear yours.`)}`,
      ch:[{t:'"Each other. The Sixth came back from the river together. We\'ll go on together."', fx:()=>{ b9Wit('kept', 'for each other'); S.f.b9_c4_wit = 'each'; }, go:'b9_c4_wit_done'},
          {t:'"The Commander asked for soldiers who came back. He asked for us. That\'s worth walking for."', fx:()=>{ b9Wit('kept', 'the Commander asked for them'); S.f.b9_c4_wit = 'commander'; }, go:'b9_c4_wit_done'},
          {t:'"The pay. If there\'s any. Write that down."', fx:()=>{ b9Wit('doubt', 'the pay, if any'); S.f.b9_c4_wit = 'pay'; }, go:'b9_c4_wit_done'},
          {t:'Not now.', go:'b9_c4_fire'}]}),
    b9_c4_wit_done:()=>{ const w = S.f.b9_c4_wit;
      return {sp:'The squad\'s fire', scene:'b9_camp_night', html:rationsHTML(), txt:
`${w === 'each' ? `Yelt opens the book to the back page, where nobody writes, and writes something there, small. He does not show anyone what.

${b94Say({thegg:'Thegg nods slowly. "At the river we were a crowd," he says. "Now we\'re a squad." He thinks. "A hungry one."', tobet:'Tobet looks round the fire, at each of them, the way he counts arrows. "All here," he says. "That\'s the count."', _:'The squad sits a while longer by the coals, close together because of the cold, and not only because of the cold.'})}` : w === 'commander' ? `Yelt considers it. "The Commander asked," he says. "He does not ask for much. When he does, it is usually the hard thing." He opens the book to the back page and writes something there, small.

${b94Say({sorvan:'Sorvan nods. "Bluerose rode for him at the river," he says. "We\'d ride for him again. Even out here. Especially out here."', perrit:'Perrit is quiet a while. "He came back from the river too," she says. "I\'d forgotten that. He doesn\'t say it."', _:'Nobody argues. Out here, that is agreement.'})}` : `Yelt looks at you for a long breath, and then he laughs, once, very short, which nobody on the train has heard him do. "There is no line in the book for pay," he says. "The new emperor tore the paybooks up with the debt books." He opens it anyway, to the back page, and writes something small.

${b94Say({ruuk:'Ruuk grins. "Honest," he says. "One of us had to be."', pessa:'Pessa snorts. "At least it\'s a reason," she says. "I\'ve marched for worse. I\'ve marched for nothing."', _:'The squad laughs, a little, at a thing that is true and not funny.'})}`}${b94If('kaedra', `\n\nKaedra has come in closer to the fire. "On the border," she says, "we never knew what we were there for either. We stayed because the others did." She looks at the fire. "I came out here to find out. So."`)}${b94If('brennet', `\n\nBrennet says, to the coals, "I'm here because free means you can say yes." He thinks about it. "I'm still deciding if it was the right yes."`)}`,
        ch:[{t:'Back to the fire.', go:'b9_c4_fire'}]}; },
    b9_c4_turnin:()=>({sp:'The escort\'s train', scene:'b9_camp_night', txt:
`What is left of the night is short. The squad sleeps in its blankets by the water wagons, and ${b94Kae('Kaedra outside them, and ')}the cut lashings are mended, and Yelt sits up with the book on his knee and does not sleep at all.

At first light the column goes on east, as it always does.`,
      ch:[{t:'Morning. The march, and the noon halt.', onward:true, fx:()=>{ S.f.b9_c4_ph = 3; }, go:()=>{ startExplore('b9_c4_wastes'); talk('b9_c4_day_arrive'); }},
          {t:'Not yet.', go:'b9_c4_fire'}]}),

    /* ======== phase 3: the next day's noon halt ======== */
    b9_c4_day_arrive:()=>({sp:'The noon halt', scene:'b9_wastes', again:()=>'The noon halt on open country, the train drawn up along the track.', txt:
`A morning's march, and then the noon halt on open country: dry grass, bare stone, a sky too big for it, and the escort strung out along the track behind the foreigners' dust, the train drawn up wagon after wagon behind the brigades.

The sun is hard. Everybody sits in whatever shade a wagon throws and drinks their mouthful and does not look at the skins.${b94If('kaedra', `\n\nKaedra has not sat down. She is standing on a wagon's tongue looking north, where a low brown smear lies along the horizon that was not there at dawn. "That's not cloud," she says. "That's feet. A lot of feet."`)}

North-east, the Bluerose outriders have come in off the flank at a canter, and one of them is shouting something at the train.`,
      ch:[{t:'The outriders.', go:'b9_c4_herdsign'},
          {t:'Walk the halt.', go:()=>startExplore()}]}),
    b9_c4_herdsign:()=>({sp:'A Bluerose outrider', scene:'b9_wastes', again:()=>'The outrider, his horse blowing, pointing north at the dust.', txt:
`The outrider is a lean grey man in blue scale on a horse that has been run hard. He pulls up by the squad because it is the nearest thing standing.

"Bhederin," he says. "A herd. Something spooked them in the north, the painted clans' hunting, or their war. They're coming down on the track and they're not looking." He points with his lance. "The water wagons are right in their road. Get the oxen turned and get in front of them, or they'll go through the train like it's grass."${b94If('kaedra', `\n\nKaedra drops off the wagon-tongue. "A score," she says. "Maybe fewer. More than I thought were left out here. They'll split round anything that stands still and shouts." She nocks an arrow. "Stand still. Shout."`)}`,
      ch:[{t:'Get the oxen and the water wagons turned before the herd hits.', check:['might', 16],
            edges:id=>[id === 'brennet' && ['he has turned an ox team in a ditch with one hand', 2], id === 'thegg' && ['an ox is light, if you are Thegg', 2], id === 'sorvan' && ['a lancer turns a frightened horse every day', 1], id === 'kaedra' && ['she knows which way a herd will break', 1], id === 'pessa' && ['she has hauled eel-boats up canal steps', 1], id === 'perrit' && ['she is built for sums, not oxen', -1], id === 'ilsa' && ['a clerk lifts paper', -1]],
            near:{t:()=>`Yes, but the last water wagon is still swinging round when the herd's edge clips its tail, and ${b94Nm(b94Who())} ${b94V(b94Who(), 'watch', 'watches')} a barrel come off the top, burst on the stones and soak into the dust in a breath: a ration gone.`, fx:()=>{ b9Ration(-1, 'a barrel burst in the stampede'); }},
            go:()=>startBattle('b9_c4_herd', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c4_herd_late'},
          {t:'"Shields up. Stand in front of the wagons."', go:()=>startBattle('b9_c4_herd', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c4_herd_late:()=>({sp:'The noon halt', scene:'b9_wastes', txt:
`The oxen will not turn. They see the dust and they plant their feet and bellow, and the herd comes out of it while the squad is still hauling on the yokes.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c4_herd', {surprise:'e'})}]}),
    b9_c4_herd_after:()=>({sp:'The noon halt', scene:'b9_wastes', fx:()=>{ S.f.b9_c4_herdDone = 1; }, txt:
`The herd goes by, and goes on going by, a brown river of humps and horns with dust standing up over it like smoke, and then the tail of it, and then it is gone south across the plain and the ground stops shaking.

The water wagons stand where they were. The oxen are bawling, and one carter is sitting on the ground holding his head, and the outriders are laughing the way riders laugh after a thing that could have killed them did not.${b94Say({thegg:`\n\nThegg is still holding his shield out level. "The sergeant said stand like that when it comes," he says. "Something came."`, brennet:`\n\nBrennet is going down the oxen with his hands on their necks, saying their names. "All of them," he says. "Every one." He sounds hoarse.`, _:''})}

Out on the plain, where the herd's tail went by, something big is down on its knees in the dust and getting up and going down again.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the hunt: a lamed straggler (the thin game; +1) */
    b9_c4_straggler:()=>({sp:'A lamed bhederin', scene:'b9_wastes', html:rationsHTML(), txt:
`A young bull of the herd, gone lame in the stampede, a foreleg dragging, standing alone on the plain where the others left it. It turns its head to watch the squad come and lowers its horns. It does not run. It cannot.

Meat. A great deal of meat, by the standards of a ration that comes by the cup.${b94If('kaedra', `\n\nKaedra has an arrow out. "Behind the shoulder," she says. "Low. He'll go a little way first." She looks at the squad. "Then we follow him."`)}`,
      ch:[{t:'Track it, and bring it down cleanly.', check:['wits', 16], rations:true, req:()=>!S.f.b9_c4_huntTried, fx:()=>{ S.f.b9_c4_huntTried = 1; },
            edges:id=>[id === 'kaedra' && ['seven years of bringing down game for a fort that sent no bread', 2], id === 'tobet' && ['the bow, behind the shoulder, low', 2], id === 'ruuk' && ['a Faraed guide eats what he follows', 1], id === 'sorvan' && ['he has put down lamed horses', 1], id === 'ammet' && ['she knows where the big vessels run', 1], id === 'perrit' && ['she has never killed anything she could not argue with', -1], id === 'ilsa' && ['the files did not keep cattle', -1]],
            near:{t:()=>`Yes, but the bull goes further than anyone thought, and turns once at the end, and ${b94Nm(b94Who())} ${b94V(b94Who(), 'take', 'takes')} a horn's flat across the thigh before it goes down. ${b94Nmc(b94Who())}'ll be walking stiff on the march.`, fx:()=>bruise(b94Who(), bruiseN())},
            go:'b9_c4_hunt_ok', fail:'b9_c4_hunt_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c4_hunt_ok:()=>({sp:'A lamed bhederin', scene:'b9_wastes', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c4_hunted) { S.f.b9_c4_hunted = 1; b9Ration(1, 'a lamed bull from the herd'); } }, txt:
`${by({kaedra:'Kaedra\'s first arrow goes in behind the shoulder, low, where she said. The bull goes a little way, and then a little further, and then kneels in the dust as if tired, and lies down.', tobet:'Tobet draws to the ear and lets go, and the bull takes three steps and stops, and stands a moment with its head down, and goes over.', _:'{who} follows it out across the plain until it stops, and does what has to be done, quickly.'})}

It takes six of them and a borrowed ox to drag it back to the train. Saffa comes out from the wagons with her biggest knife and looks at it as other women look at a wedding.

"Three companies," she says. "One beast. Tonight it goes round." She points the knife at the squad. "The Sixth gets the first ladle. I don't care who the officers are."`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b9_c4_hunt_no:()=>({sp:'A lamed bhederin', scene:'b9_wastes', txt:
`It is lame and it is still faster than anybody on foot. It goes off across the plain in a lurching run, into the dust the herd left, and the dust takes it.

${b94Kae('Kaedra lowers the bow. "He\'ll die out there," she says. "Something else will eat." She shrugs. "Something always does."')}${b9In('kaedra') ? '' : 'Something out there will eat tonight. It will not be the Sixth.'}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the trick: Reading the Spoor, at the herd's track */
    b9_c4_spoor:()=>({sp:'Kaedra', scene:'b9_wastes', again:()=> S.f.b9_c4_spoorOk ? 'Kaedra, crouched over the herd\'s track, reading it to anyone who stops.' : 'Kaedra at the herd\'s track, with the dust and the broken stems.', txt: !S.f.b9_c4_herdDone ?
`Dry grass and dust, and nothing in it yet that anybody can read.` :
`The herd's track is a road of broken stems and churned dust a hundred paces wide going away south across the plain. Kaedra is crouched at its edge with her hood back, touching the ground as a clerk touches a page.

${S.f.b9_c4_spoorTried ? `"Again, if you like," she says. "Out there you'll need it more than here."` : `"Look," she says. "Here the crust is broken and the dust hasn't blown back in. That's this morning. Here it has. That's yesterday, some other beast, alone." She moves along. "The stems lie the way they went. The larks went up north before anybody saw the dust. Everything that moves writes it down." She looks up. "The forts taught me. They didn't pay me for it. I'll teach you for nothing too."`}${b94If('ruuk', `\n\nRuuk is crouched beside her, grinning. "The Faraed read grass," he says. "Different grass." Kaedra looks at him. "Same writing," she says.`)}`,
      ch:[{t:'Learn to read it the scouts\' way: the crust, the stems, the dust, and how old each is.', check:['wits', 18], trick:'b9_c4_spoor', req:()=>!!S.f.b9_c4_herdDone && !S.f.b9_c4_spoorTried, fx:()=>{ S.f.b9_c4_spoorTried = 1; },
            edges:id=>[id === 'kaedra' && ['seven years of the forts\' spoor', 2], id === 'ruuk' && ['a Faraed guide reads the grass before the sky', 2], id === 'sorvan' && ['a Bluerose rider reads hoofprints at a canter', 1], id === 'tobet' && ['a bowman reads where the game went', 1], id === 'brennet' && ['he reads wheel-ruts and ox-dung for a living', 1], id === 'ilsa' && ['the files taught her to read what people leave behind', 1], id === 'sgt' && ['you have walked the river\'s margins with the Whitefinders\' scouts', 1], id === 'perrit' && ['she reads tiles, and tiles do not leave tracks', -1], id === 'thegg' && ['he walks through a track while he is looking at it', -1]],
            go:'b9_c4_spoor_ok', fail:'b9_c4_spoor_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c4_spoor_ok:()=>({sp:'Kaedra', scene:'b9_wastes', fx:()=>{ S.f.b9_c4_spoorOk = 1; if (!S.f.b9_c4_coat) { S.f.b9_c4_coat = 1; gain('b9_c4_scoutcoat'); } }, txt:
`It takes a while, crouched in the sun, with Kaedra's finger going from print to print. Then ${by({sgt:'you see it: the dust blown back into one print and not the next, and you know which came first without being told, and', ruuk:'Ruuk laughs, once, and says "There," at a print before Kaedra points to it, and', tobet:'Tobet reads it the way he reads where an arrow went, and', _:'{who} stops looking at the prints and starts reading them, and'})} the plain is not empty any more. It is full of writing, all of it about who went where.

"That's it," Kaedra says. "That's all it is." She takes a dun coat out of her pack, felted wool with dry grass stitched in loops at the shoulders, and holds it out. "My spare, from the fort. You'll want to lie in the scrub and look like scrub. It helps the reading."`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b9_c4_spoor_no:()=>({sp:'Kaedra', scene:'b9_wastes', fx:()=>{ if (!S.f.b9_c4_coat) { S.f.b9_c4_coat = 1; gain('b9_c4_scoutcoat'); } }, txt:
`It is dust, and stems, and more dust. Kaedra points, and points again, and the prints stay prints.

"Seven years," she says, not unkindly. "You've had a noon halt." She takes a dun coat out of her pack, felted wool with grass at the shoulders, and holds it out anyway. "My spare. Lie in the scrub in it and you'll at least look like you can read."`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* a Bluerose outrider: the spear, the Barghast war (the rumour), the other squad as camp talk */
    b9_c4_outrider:()=>({sp:'A Bluerose outrider', scene:'b9_wastes', fx:()=>{ S.f.b9_c4_outrider = 1; if (!S.f.b9_c4_spear) { S.f.b9_c4_spear = 1; gain('b9_c4_bluerosespear'); } }, txt:
`The grey outrider has come back down the train on his blown horse, and he stops by the Sixth and leans on the saddle-bow.

"You stood in front of the water," he says. "In front of our horse lines too, after." He reaches behind him and pulls a short lance off the saddle, ash and a long steel head and a blue tassel gone grey with dust: a lance cut down for fighting on foot. "Every third saddle carries a spare. I'd like it back in Lether."

"The herd ran from the north because the painted clans are at war with the Akryn up there," he says. "Over grass, over horses, over who knows. Their smoke's been on the sky for days. The Commander says keep to the track and keep our distance." He looks north. "We're keeping it."

He turns his horse, then turns back. "Heard a thing from the foreigners' end of the column, at the water. ${b94Rumour()}." He shrugs. "Malazans. You never know if they're mad or right till after."`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the cairn, the wagons, the tile-woman on her wagon, the track east */
    b9_c4_cairn:()=>({sp:'An old cairn', scene:'b9_wastes', txt:
`A heap of grey stones as high as a man, out on the plain beside the track, old enough that lichen has grown on it and died. The escort has no name for whoever piled it. Every Letherii legend about the Wastes has a cairn in it somewhere, and in every one of them it marks where somebody stopped.${b94Say({perrit:`\n\nPerrit puts her palm on the stones. "Old," she says. "Older than Lether." She takes the hand away. "Cold. Like everything out here."`, kaedra:`\n\nKaedra walks round it once and looks at the ground. "Not a boot here," she says, "since whoever built it." She looks east. "We're the first to come past in a long time."`, _:''})}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_daywagons:()=>({sp:'The train', scene:'b9_wastes', txt: S.f.b9_c4_herdDone ?
`The train drawn up along the track, wagon after wagon. The water wagons stand where the squad stood in front of them, every wheel still on.${b94If('brennet', ' Brennet goes along them tapping the wheels with his pin and listening, and nods to each one.')}` :
`The train drawn up along the track for the noon halt, wagon after wagon after wagon, carters in the strip of shade each one throws, oxen with their heads down.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_tilewagon:()=>({sp:'The tile-woman', scene:'b9_wastes', txt:
`The tile-woman is sitting on the tailboard of her meal wagon in the shade of its tilt with her shawl over her head, eating something she does not offer to share. "I read at dusk," she says. "Not at noon. At noon the tiles get hot and lie." She chews. "Like everybody."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_eastward:()=>({sp:'The track east', scene:'b9_wastes', txt: b94Key() ? `The track goes on east toward the foreigners' dust. The day's work is elsewhere.` : !S.f.b9_c4_herdDone ? `The track east, and on the northern sky the dust coming on. The outriders are shouting about it.` : `The track east, behind the foreigners' dust. The Finadd has the day's orders before anybody goes anywhere.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* ======== the key: from Ennic, at the noon halt ======== */
    b9_c4_ennic3:()=>{ const k = b94Key();
      if (!S.f.b9_c4_herdDone) return {sp:B5_FINADD.name, scene:'b9_wastes', txt:
`Finadd Ennic is looking north with his slate held up to shade his eyes. "Sergeant," he says. "The outriders are shouting. I find I would like to know why before I give anybody orders."`,
        ch:[{t:'Back to the halt.', go:()=>startExplore()}]};
      if (k) return {sp:B5_FINADD.name, scene:'b9_wastes', txt:`Finadd Ennic looks up from his slate. "${k === 'book' ? 'Yelt is waiting, Sergeant.' : 'The outriders are waiting, Sergeant. They are not good at it.'}"`,
        ch:[{t:'Back to the halt.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:'b9_wastes', html:rationsHTML(), again:()=>`${b94Ennic()}, with his slate and the day's orders.`, txt:
`"Two things want the Sixth," Ennic says, "and the Sixth is one squad." He holds up the slate.

"Yelt. He wants the brigade's whole share counted again before the quartermasters cut the ration tonight. Every barrel and every sack, true, with the runner's chalk pinned to it, and sent up the column in his own hand, so that whatever the cut is, it is cut from the true number and not from a thief's." He rubs a line off the slate. "It will be short. He knows it will be short. He would like it to be honestly short."

"And the outriders. The herd went south and some of it will have stopped at the first water it found. Their decurion will take a party out after it this afternoon, and he asked for the scout, and for a squad that walks to bring the meat in." He looks north. "The painted clans are hunting that country too. The decurion says that is why he wants a squad."

"Your call, Sergeant. I have written both down."${b94Say({kaedra:`\n\nKaedra is already looking south, at the herd's track. Her face says the rest.`, _:''})}${b94If('brennet', `\n\nBrennet is looking at the train. "Yelt's the only honest book on it," he says. "If his number's true, the wagons get there."`)}${b94If('perrit', `\n\nPerrit has been doing the sum. "Meat would help," she says. "The truth would help longer."`)}`,
        ch:[{t:'"The book. We count it honest with Yelt."', fx:()=>{ S.f.b9_c4_key = 'book'; S.f.b9_c4_ph = 4; }, go:'b9_c4_key_book'},
            {t:'"Forage. We go out with Kaedra and the outriders."', fx:()=>{ S.f.b9_c4_key = 'forage'; S.f.b9_c4_ph = 4; b94L('kaedra', 1); }, go:'b9_c4_key_forage'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b9_c4_key_book:()=>({sp:B5_FINADD.name, scene:'b9_wastes', txt:
`"The book," Ennic says, and writes it, and nods: the order he would have given, if he were allowed to give orders that cost meat. "The column makes an early camp tonight. Yelt will be at the water wagons with a lamp. I will tell the decurion the Sixth has gone to count barrels." He considers. "He will think it is a joke. Let him."${b94If('kaedra', `\n\nKaedra looks south once more, at the herd's track, and then shrugs and slings the bow. "Honest, then," she says. "I'll count the arrows."`)}${b94If('brennet', `\n\nBrennet is already walking back along the train toward the water wagons with the pin on his shoulder.`)}`,
      ch:[{t:'To the train, and the early camp.', go:()=>{ startExplore('b9_c4_camp'); talk('b9_c4_eve_arrive'); }}]}),
    b9_c4_key_forage:()=>({sp:B5_FINADD.name, scene:'b9_wastes', txt:
`"Forage," Ennic says, and writes it. "Very well. I will tell Yelt the Sixth has gone hunting. He will write it down, and put a mark beside it, which I have learned not to ask about." He looks at the squad over the slate. "Bring back meat, Sergeant. And all of the squad. In that order of importance to the quartermasters and the other order to me."${b94If('kaedra', `\n\nKaedra is grinning, which nobody has seen her do. "South," she says. "First water. I know where."`)}${b94If('brennet', `\n\nBrennet hands the wagon-pin to a carter, and takes it back. "I'll carry the meat," he says. "Wagons I know. Meat's just a wagon that bleeds."`)}`,
      ch:[{t:'South, with the outriders.', go:()=>{ startExplore('b9_c4_wash'); talk('b9_c4_ride'); }}]}),

    /* ======== phase 4, 'forage': out after the herd with the outriders ======== */
    b9_c4_ride:()=>({sp:'A dry wash', scene:'b9_c4_wash', again:()=>'The dry wash, the herd down in its bed, painted riders on the far lip.', txt:
`Two hours south across the plain at a horse's walk, the squad holding stirrups, ${b9In('kaedra') ? 'Kaedra out in front on foot reading the herd\'s track' : 'the scout out in front on foot reading the herd\'s track'} and the outriders in a loose line behind. Then the ground falls away into a dry wash cut deep into the plain, and down in its bed there is a darker patch of sand where water stands just under the surface, and a dozen bhederin of the herd round it with their heads down.

On the far lip of the wash, against the sky, there are riders. Painted faces, white. War-axes. They are watching the herd, and now they are watching the Letherii.

The outriders' decurion reins in beside you. "Barghast," he says quietly. "Hunting, or at war, or both. They'll say it's theirs." He looks at the herd. "It isn't anybody's. It's meat."`,
      ch:[{t:'Down into the wash.', go:()=>startExplore()}]}),
    b9_c4_decurion:()=>({sp:'The outriders\' decurion', scene:'b9_c4_wash', fx:()=>{ S.f.b9_c4_decurion = 1; }, txt: S.f.b9_c4_forageDone ?
`The decurion is watching his outriders load meat onto the spare horses. "Good day's work," he says. "Don't tell the quartermasters how good. They'll want us out every day."` :
`The decurion is a narrow man with a Bluerose officer's scarf over his mouth against the dust, and he sits his horse at the top of the wash as if he had been born there. "My riders don't fight in a ditch," he says. "Horses break legs. That's why I asked for a squad that walks." He nods at the far lip. "If they come down, they come down at you. We'll be on the flanks."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_washherd:()=>({sp:'The dry wash', scene:'b9_c4_wash', html:rationsHTML(), txt: S.f.b9_c4_forageDone ?
`The wash is quiet. The herd is meat on the spare horses, the seep is dug out, and the far lip is empty against the sky.` :
`The bhederin stand round the seep with their heads down, too tired from the stampede to run again. On the far lip of the wash the painted riders have dismounted, and they are coming down the slope toward the herd on foot, spread out, war-axes in their hands. One of them, bigger than the rest, raises an axe and shouts, and points at the herd, and at himself.${b94If('kaedra', `\n\nKaedra listens. "I don't have the words," she says. "I don't need them. He says it's theirs." She nocks an arrow. "He says it the way the forts said the border was theirs."`)}`,
      ch: S.f.b9_c4_forageDone ? [{t:'Back.', go:()=>startExplore()}] : [
          {t:'Come up the wash under the wind, the scouts\' way, and meet them at the herd.', check:['guile', 16],
            edges:id=>[id === 'kaedra' && ['she has crept up on Barghast hunting parties for the forts', 2], id === 'ruuk' && ['a Faraed guide moves in a gully like water', 2], S.tricks && S.tricks.b9_c4_spoor && ['the spoor: where they have walked, and where they will', 1], id === 'tobet' && ['a bowman knows how to wait', 1], id === 'thegg' && ['he is very large in a narrow wash', -1], id === 'sorvan' && ['blue scale flashes in the sun', -1]],
            near:{t:()=>`Yes, but the wash is sharp stone under the sand, and ${b94Nm(b94Who())} ${b94V(b94Who(), 'come', 'comes')} up out of the crawl with cut knees and a palm full of grit, and the painted hunters see the squad stand up a breath too soon.`, fx:()=>bruise(b94Who(), bruiseN())},
            go:()=>startBattle('b9_c4_forage', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c4_wash_seen'},
          {t:'"Sixth. Shields up." Meet them in the open.', go:()=>startBattle('b9_c4_forage', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c4_wash_seen:()=>({sp:'The dry wash', scene:'b9_c4_wash', txt:
`A stone turns under a boot. Every painted face on the slope comes round at once, and the big one laughs, and they come on at a run.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c4_forage', {surprise:'e'})}]}),
    b9_c4_forage_after:()=>({sp:'The dry wash', scene:'b9_c4_wash', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c4_forageDone) { S.f.b9_c4_forageDone = 1; S.f.b9_c4_keyDone = 1; b9Ration(3, 'game, and a little water'); } }, txt:
`The painted hunters go back up the far lip of the wash carrying their own, and do not look back, and in a little while their horses go away north toward the smoke. The squad does not follow. It was not the escort's war, and it still is not.

Then the work, which is longer. The outriders' spare horses take the meat. The squad digs out the seep with helmets and hands until it fills, slowly, brown and then clearer, and every skin the party carries is filled from it, a cup at a time.${b94Say({kaedra:`\n\nKaedra drinks from the seep last, after the horses, kneeling. "First water past the ridge," she says. "I'll remember it." She looks back at the far lip. "So will they."`, tobet:`\n\nTobet is cutting the herd's best meat into strips for salting, very carefully, like a clerk cutting paper money.`, _:''})}${b94If('brennet', `\n\nBrennet loads the horses as he loads a wagon, with the weight low and even. "Arrive," he tells them. They do not answer. Wagons don't either.`)}`,
      ch:[{t:'Back to the column at dusk.', onward:true, fx:()=>{ S.f.b9_c4_ph = 5; }, go:()=>{ startExplore('b9_c4_camp'); talk('b9_c4_eve_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c4_seep:()=>({sp:'The seep', scene:'b9_c4_wash', txt: S.f.b9_c4_forageDone ?
`The seep, dug out by helmets and hands, filling again slowly in the bottom of the wash. Brown at first, then clearer.` :
`A darker patch of sand in the bed of the wash, damp to the touch. Water, just under the surface. The bhederin found it first.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c4_wash_back:()=>({sp:'The dry wash', scene:'b9_c4_wash', txt: S.f.b9_c4_forageDone ?
`West, back up the herd's track to the column, with the meat on the horses and the light going.` :
`Back to the column with nothing, and the herd standing in the wash? The decurion is watching.`,
      ch: S.f.b9_c4_forageDone ? [{t:'Back to the column at dusk.', onward:true, fx:()=>{ S.f.b9_c4_ph = 5; }, go:()=>{ startExplore('b9_c4_camp'); talk('b9_c4_eve_arrive'); }},
                                   {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back.', go:()=>startExplore()}]}),

    /* ======== evening: the camp again (book: Yelt waiting; forage: riding in) ======== */
    b9_c4_eve_arrive:()=>({sp:'The escort\'s train', scene:'b9_c4_dusk', again:()=>'The train\'s camp at evening, the wagons drawn in.', txt: b94Key() === 'forage' ?
`The party rides in at dusk with the meat on the spare horses and the skins full, and the whole train comes to the gap in the ring to look. Saffa comes with her biggest knife. The quartermasters come with their slates. Yelt comes with his book, and writes it in, every strip, and the water by the skin.

${b94Say({kaedra:'Kaedra walks in last, on foot, behind the horses. A carter in the crowd at the gap starts to cheer and stops, because nobody does that in the escort. Kaedra pretends not to have heard it. She heard it.', thegg:'Thegg has carried a haunch the whole way back on his shoulder, and puts it down in front of Saffa as if laying a wreath.', _:'The squad walks in behind the horses, dusty to the eyes, and sits down by its fire.'})}` :
`The column makes an early camp, as Ennic promised, and the wagons draw in nose to tail in their ring on dry grass. Before the cook-fires are lit Yelt is at the first water wagon with the lamp on its hook and the ration book open on his knees and two blank pages ruled.

"Every barrel," he says. "Every sack. Again." He looks up at the squad. "Then I will write the true number, and the runner's chalk beside it, and the Finadd will send it up the column in my hand." He looks down. "It will be short. I would like it to be short and true."`,
      ch: b94Key() === 'book' && !S.f.b9_c4_keyDone ? [{t:'Yelt, and the count.', go:'b9_c4_book'}, {t:'Walk the camp.', go:()=>startExplore()}] : [{t:'The fire.', go:'b9_c4_fire'}, {t:'Walk the camp.', go:()=>startExplore()}]}),

    /* 'book': the honest count with Yelt */
    b9_c4_book:()=>{ if (b94Key() !== 'book') return DLG.b9_c4_yelt();
      if (S.f.b9_c4_keyDone) return {sp:'Yelt', scene:'b9_c4_dusk', txt:
`Yelt sits at the tailboard with the book shut on his knee and both hands flat on it. "Sent up," he says. "Short. True." He looks, for Yelt, nearly at peace.`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'Yelt', scene:'b9_c4_dusk', html:rationsHTML(), txt:
`Yelt has the book open and the lamp up and a slate for the sums. "Wagon one," he says. "Begin."${b94If('brennet', ` Brennet is already at wagon one with his pin, knocking on staves.`)}

It is every barrel in the brigade's share, opened, sounded, weighed or measured with a rod; every sack lifted and set against its tag; every skin counted; every number called aloud at its tailboard and written. By lamplight, after a day's march, on a ration that comes by the cup.`,
        ch:[{t:'Count the brigade\'s share the long way, every barrel and sack, and call each one.', check:['wits', 16], rations:true, req:()=>!S.f.b9_c4_bookTried,
              edges:id=>[id === 'perrit' && ['she calls the sums faster than Yelt\'s slate', 2], id === 'brennet' && ['nine years of loading wagons that had to arrive', 2], id === 'ilsa' && ['a clerk of the files can count anything', 2], id === 'tobet' && ['an Indebted boy learns to count what is his', 1], id === 'sgt' && ['you have checked the company\'s stores every pay-day for years', 1], S.f.b9_c4_marks && ['the runner\'s chalk: you know which wagons to trust least', 1], id === 'thegg' && ['he lifts well and counts slowly', -1], id === 'ruuk' && ['he would rather eat it than count it', -1]],
              near:{t:()=>`Yes, but it takes until the middle of the night, and ${b94Nm(b94Who())} ${b94V(b94Who(), 'call', 'calls')} the last of the numbers hoarse, and ${b94V(b94Who(), 'go', 'goes')} to bed with the numbers still going round: rattled.`, fx:()=>b94Rattle(b94Who())},
              fx:()=>{ S.f.b9_c4_bookTried = 1; }, go:'b9_c4_booked', fail:'b9_c4_booked'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c4_booked:()=>({sp:'Yelt', scene:'b9_c4_dusk', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c4_book) { S.f.b9_c4_book = 1; S.f.b9_c4_keyDone = 1; S.f.b9_c4_ph = 5; b9Ration(1, 'an honest count'); } }, txt:
`${ROLL() && ROLL().pass === false ? 'It goes wrong twice, and two wagons are counted over, and Yelt sends a carter for more lamp oil, but' : 'It takes until well after dark, and'} by the end of it the brigade's share is counted, every barrel and every sack, and the true number is written in the book in Yelt's small exact hand.

It is short. It is shorter than anybody wanted. But it is true, and the half barrel the clerks had been carrying as full since Letheras is found and written as a half, and two sacks the book had lost are found under a tilt in wagon twenty, and the squad's own share for the march comes out a little better than the quartermasters' guess would have had it.

Yelt pins the runner's chalk rubbings to the page and folds it, and gives it to the Finadd's runner to carry up the column. Then he shuts the book.${b94If('brennet', `\n\nBrennet slaps the tailboard of the last wagon. "Arrive," he tells it. "Now you know what you're carrying."`)}${b94If('kaedra', `\n\nKaedra has sat through the whole of it outside the lamplight, counting arrows. "Forty-one," she says, when it is done. "True."`)}`,
      ch:[{t:'The fire.', go:'b9_c4_fire'},
          {t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ======== the end: first light, east ======== */
    b9_c4_onward:()=>({sp:'The Wastes', scene:'b9_wastes', html:rationsHTML(), txt:
`First light, grey and then gold over a plain with nothing on it, and the escort forming on the track brigade by brigade with the train behind, wagon after wagon, and the oxen leaning into the yokes. Far ahead the foreigners' dust is already up.

${b94Key() === 'forage' ? 'In the brigade\'s wagons there is salted meat for the first time since Lether, and the skins are full from a seep in a dry wash that is on nobody\'s map but Kaedra\'s.' : 'On the first wagon Yelt rides the tailboard with the ration book on his knee, and the number in it is short, and it is true, and the quartermasters cut from it last night and did not cut as deep as they had meant to.'}${b94If('kaedra', `\n\nKaedra walks beside the squad, not with the outriders. She keeps looking at the ground ahead. "Nothing," she says. Then: "Something. Old. A long way off." She shrugs. "I'll tell you when it's close."`)}${b94If('brennet', `\n\nBrennet walks with the squad and listens to the train behind. "Fine," he says. "Listen to them. Fine."`)}${b94Say({thegg:`\n\nThegg looks back once at the camp's dead fires. "My mother said the Wastes had nothing in them," he says. He turns east. "She was nearly right."`, _:''})}`,
      ch:[{t:'East.', onward:true, go:()=>chapterEnd(4, b94Key() || 'book')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
