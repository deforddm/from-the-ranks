/* ============ Book Nine, Chapter 2: The Escort ============ */
/* The Letherii: Book Seven's squad of the Sixth Company (the 'army' road), mustered into the Commander's escort on a plain outside the
   landward gate of Letheras, the same days the Malazans muster in the city (dod-canon correction 6: drilled by an unnamed Malazan
   sergeant of the heavies, never Tarr's or Cuttle's company, and no Malazan officer of canon stops by; the Commander's reshaping of the
   brigades (R11 S8) is headline). Phase 1 (S.f.b9_c2_ph), the first evening, the drill over: the muster ground by lamplight; Finadd
   Ennic's word; the supply train behind the brigades, its clerk Yelt and his ration book, Orla's water-cart in a ditch, Saffa's pot;
   Brennet, a carter of the train, joins at the wagons (b9Join('brennet'), the first halt); the tile-woman at a tailboard (the reading,
   B9READ[2], back b9_c2_fire). Phase 2, the next day on the drill field: the Malazan sergeant's drill (b9_c2_drill, survive 4, the
   Letherii's first fight), the needling, the trick (The Malazan Step), a heavy corporal's bout (b9_c2_bout, optional), one rumour line
   ("a Malazan ghost is recruiting"). Phase 3, that night in the train's yard: thieves at the barrels (b9_c2_wagons, main, stage 2).
   Phase 4, the last day: the key, S.f.b9_c2_key, from Ennic: 'wagons' (load the train honestly with Yelt and Orla: b9Ration(2, 'the
   wagons loaded true')) or 'drill' (go back to the Malazan sergeant for more: Thegg +1, S.f.b9_c2_drilled = 1). Phase 5: out of the
   gate behind the Malazans. Notes for later chapters: docs/dod-ch2-notes.md. */
/* FOR THE ARTIST (162b): names this file uses.
   Items: ART['item/b9_c2_carterscoat'], ['item/b9_c2_tallystick'], ['item/b9_c2_escortspear'].
   Figures: brennet (160's simple sprite, replaced in 162b), b9_c2_orla (the water-cart driver), b9_c2_saffa (the field cook); placeholders
   here with ??=. Reused: b5_c1_ennic (the Finadd), b5_c1_clerk (Yelt), b5_c1_tilewoman, b7_malsgt (the Malazan sergeant), b2soldier (the
   Malazan heavies, the sparrers), b5_letherii (the thieves).
   Backdrops: b9_muster and b9_wagons (160's, yours), and two this file adds that borrow until you draw them: b9_c2_yardnight (the train's
   yard at night), b9_c2_road (the road out of the landward gate at first light, the Malazans' dust ahead).
   Ground (TILEX): b9_c2_muster (Book Five's lines: '=' tents, ',' grass, '.' trodden earth, 'F' a fire; and 'w' a supply wagon, 'o' water
   barrels lashed three high, 'x' oxen on a picket, 'c' the water-cart, 'T' a tailboard with a lamp, 'r' a rack of wooden swords, 'P' the
   drill post, '#' a rail fence). Battle 't' is low cover (barrels). */

/* ---- small helpers (b92: Book Nine, Chapter Two) ---- */
const b92L = (id, n) => { if (b9In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b92Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b9In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b92If = (id, s) => b9In(id) ? (typeof s === 'function' ? s() : s) : '';
const b92Who = () => (ROLL() && ROLL().who) || 'sgt';
const b92Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b92Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b92V = (id, you, they) => id === 'sgt' ? you : they;
const b92And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b92Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the first evening on the muster ground, 2 the next day on the drill field, 3 that night in the train's yard, 4 the last
   day (the key), 5 the key made, the eve of the march */
const b92Ph = () => S.f.b9_c2_ph || 1;
const b92Key = () => S.f.b9_c2_key || null;
const b92Eve = () => b92Ph() === 1;
const b92Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b9In(id));
const b92BrennetSettled = () => S.f.b9_brennetDone != null;
const b92NightReady = () => !!S.f.b9_c2_orders1 && b92BrennetSettled();
const b92Ennic = () => B5_FINADD.short;
/* the one line of the other squad, as rumour (its Chapter 1 key; b9OtherName is not used) */
const b92Rumour = () => (b9Key(1) || 'stores') === 'street' ? 'a squad lent to the heavies went out into the quarter that night with some woman and her lamp, and left the stores to a corporal' : 'a squad lent to the heavies sat on the stores that night, while the rest hid in the taverns, and the count came out right';

/* ---- The Malazan Step: the heavies' drill, every soldier moving when the one beside moves, so the line is never a line of separate
   people. It copies the Gate Drill (Book Four's b4_c1_gate) under Book Nine's own guard: the bearer and every squadmate beside them close
   up, take armour, and an enemy standing next to any of them cannot take a step until the bearer's next turn. Not sorcery. v10.3: it
   strikes nobody, so it is free. ---- */
Object.assign(TRICKS, {
  b9_c2_step:{name:'The Malazan Step', ch:2, use:'fight', ab:'t_b9_c2_step', where:'the escort\'s drill field outside Letheras, under a Malazan sergeant of the heavies',
    lore:'The Malazan heavies do not step as one soldier and then the next. They step when the soldier beside them steps, shield rim to shield rim, so the line moves as one thing and closes as one thing, and whatever stands against it finds there is no gap to go through and no room to go back. The Malazan sergeant drilled it into the escort on a dry field until the escort could do it asleep. Some of them did.',
    get fx(){ return `Once a fight: the bearer calls the step, and the bearer and every squadmate beside them close up, rims together. They take +${lvT()} armour, and an enemy standing next to any of them cannot take a step until the bearer's next turn. It can still swing. Grows with level. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
const b92StepOn = t => !!(B && B.b9step && B.b9step.u.hp > 0 && t && t.side === 'p' && !t.ally && t.hp > 0 && (t === B.b9step.u || cheb(t, B.b9step.u) === 1));
Object.assign(AB, {
  t_b9_c2_step:{name:TRICKS.b9_c2_step.name, trick:'b9_c2_step', self:true, free:true, desc:()=>TRICKS.b9_c2_step.fx,
    run(u){ B.b9step = {u, turn:B.turn}; AUDIO.play('sword'); shakeMap();
      const in_ = party().filter(p => b92StepOn(p)); in_.forEach(p => { float(p, 'step', '#d8c49a'); sparks(p.x, p.y, 8, '#d8c49a', .4); });
      blog(`${u.name}: "Step." ${in_.length > 1 ? `${in_.filter(p => p !== u).map(p => p.name).join(' and ')} step${in_.length > 2 ? '' : 's'} with ${u.name}, rims together, and the line closes as one thing, the Malazan way.` : 'Nobody beside to step with. One shield will have to be the line.'}`); }},
});
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (b9On() && b92StepOn(t)) c.ac += lvT(); return c; }; }
{ const _ai = ai;
  ai = async function(u, turnId){
    if (b9On() && B && B.b9step && u && u.side === 'e' && u.hp > 0 && party().some(p => b92StepOn(p) && cheb(p, u) === 1) && u.rising !== B.turn) {
      u.rising = B.turn; float(u, 'held by the step', '#d8c49a'); blog(`${u.name} shoves at the closed shields and finds no gap to go through.`); }
    return _ai(u, turnId); }; }
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); if (b9On() && B && B.b9step && B.b9step.u === u) B.b9step = null; return r; }; }

/* ---- borrowed pictures until the artist's file (162b) replaces them: two scenes, the ground, the figures, the three items ---- */
{ const like = {b9_c2_yardnight:'b9_wagons', b9_c2_road:'b9_wagons'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b9_c2_muster ??= (ctx, ch, x, y, T, dark) => (TILEX.b5_c6_lines || (() => {}))(ctx, '=w'.includes(ch) ? '=' : '.,F'.includes(ch) ? ch : '.', x, y, T, dark);
if (typeof FIGX !== 'undefined') { FIGX.b9_c2_orla ??= (ctx, h, t, o) => (FIGX.b5_c5_refugee || FIGX.b5_letherii || (() => {}))(ctx, h, t, o); FIGX.b9_c2_saffa ??= (ctx, h, t, o) => (FIGX.b5_c5_refugee || FIGX.b5_letherii || (() => {}))(ctx, h, t, o); }
if (typeof ART !== 'undefined') [['b9_c2_carterscoat', 'b5_c2_sealcoat'], ['b9_c2_tallystick', 'b5_c1_receipt'], ['b9_c2_escortspear', 'b5_c3_spear']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Nine's glossary ---- */
GLOSSX.dod.push(
  [2, 'The Malazan step', 'How the foreigners\' heavies move: each soldier stepping when the one beside steps, so the line closes as one thing. A Malazan sergeant drilled it into the escort on a dry field outside Letheras.', ()=>!!(S && S.f && S.f.b9_c2_drillDone)],
  [2, 'The ration book', 'Yelt\'s ledger for the brigade\'s share of the supply train: every barrel, sack and skin, by wagon and by day. The one book in Lether the new emperor did not tear up.', ()=>!!(S && S.f && S.f.b9_c2_yelt)]);

/* the muster ground's caption (160's scene) follows its backdrop: evening on this chapter's first night, the drill by day otherwise */
{ const sc = SCENES.b9_muster, day = sc && sc.cap; if (sc) Object.defineProperty(sc, 'cap', {configurable:true, enumerable:true,
    get(){ return S && S.book === 'dod' && S.chapter === 2 && (S.f.b9_c2_ph || 1) === 1 ? 'The muster ground at evening, the drill over: Letherii tents in their rows, the supply train behind them, and lamps going up at the tailboards.' : day; }}); }

/* the fire is a roster fire (38c) */
ROSTER_FIRES.dod = ROSTER_FIRES.dod || {}; ROSTER_FIRES.dod[2] = ['b9_c2_fire'];

const B9CH2 = {
  title:B9CH[2], number:'Two',
  intro:{loc:'Outside Letheras', sub:'The escort\'s muster ground · evening', scene:'b9_muster', cap:'A plain outside the landward gate, Letherii tents in their rows, the supply train behind them, and lamps going up at the tailboards as the light goes.',
    paras:[
`The Commander asked for soldiers who came back. The Sixth Company came back, from the river, the day the foreigners came ashore and the army of Lether stopped being one. So the Sixth Company is in the escort now, and the escort is mustering on a plain outside the landward gate, and nobody has told it where it is going except east, behind the people who beat it.`,
()=>{ const v = b92Mates().map(id => NAME(id)), gone = Object.keys(S.dead || {}).filter(id => TPL[id]);
  return `You are Sergeant {sgt}, Sixth Company, and the squad is ${v.length ? `${b92And(v)}, and you` : 'you, this year, and a paybook'}.${gone.length ? ' The rest are names in the company roll with a line through them.' : ''} Today a Malazan sergeant of the heavies had the company on a field for the first time, and walked the front rank, and said what he thought of Letherii feet.`; },
`The drill is over. The lamps are going up. Everybody is sore, and nobody is saying so in front of the foreigners.`],
    go:'Onto the muster ground', node:'b9_c2_start'},

  areas:[
    /* 16 x 12 (b9_c2_muster, evening). . trodden earth  # a rail fence  = tents  F the squad's fire  T a tailboard with a lamp (the
       tile-woman)  w the supply wagons  o water barrels  x oxen on a picket  c Orla's water-cart */
    { id:'b9_c2_ground', title:'Outside Letheras · the escort\'s muster ground', sub:'Evening · the drill over, the lamps going up', hint:'Tap ground to move · tap a figure to talk · the train is east, the tents all round', decor:'b9_c2_muster', dark:true,
      map:[ "################",
            "#==.==.==.==.==#",
            "#..............#",
            "#.==.==...T.ww.#",
            "#.........o.ww.#",
            "#......F....xx.#",
            "#..............#",
            "#.==.==...c....#",
            "#..............#",
            "#==.==.==.==.==#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b9_c2_fire', T:'b9_c2_tailboard', w:'b9_c2_wagonline', o:'b9_c2_barrels', c:'b9_c2_cart', x:'b9_c2_oxen'}, start:{x:7, y:6},
      quest:()=> !S.f.b9_c2_orders1 ? 'The Finadd, by the tents. He has the escort\'s word.' : !b92BrennetSettled() ? 'The wagons, east. The train needs hands, and somebody there is waiting to be told.' : 'The fire. The drill again at first light.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:4, y:2, node:()=>'b9_c2_ennic', fresh:()=>!S.f.b9_c2_orders1},
        {id:'yelt', name:'Yelt, the brigade clerk', kind:'b5_c1_clerk', x:11, y:4, node:()=>'b9_c2_yelt', fresh:()=>!S.f.b9_c2_yelt},
        {id:'brennet', name:'A carter at the wagons', kind:'brennet', x:14, y:4, node:()=>'b9_c2_brennet', show:()=>S.f.b9_brennetDone == null || S.f.b9_brennetDone === 2, fresh:()=>S.f.b9_brennetDone == null},
        {id:'orla', name:'Orla, at her water-cart', kind:'b9_c2_orla', x:11, y:7, node:()=>'b9_c2_cart', fresh:()=>!S.f.b9_c2_orla},
        {id:'saffa', name:'Saffa, the field cook', kind:'b9_c2_saffa', x:5, y:6, node:()=>'b9_c2_saffa', fresh:()=>!S.f.b9_c2_saffa},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:9, y:3, node:()=>'b9_c2_tailboard', fresh:()=>!S.f.b9_c2_drawn && !S.f.b9_c2_noCard} ] },

    /* 16 x 12 (b9_c2_muster, day). The drill field: , grass  . the beaten square  r racks of wooden swords  P the sergeant's post
       = the near tents  < back to the lines */
    { id:'b9_c2_field', title:'Outside Letheras · the drill field', sub:'Day · the Malazan sergeant\'s square', hint:'Tap ground to move · tap a figure to talk · the sergeant is at his post', decor:'b9_c2_muster',
      map:[ "################",
            "#,,,,,,,,,,,,,,#",
            "#,............,#",
            "#,..r......r..,#",
            "#,............,#",
            "<,............,#",
            "#,............,#",
            "#,....P.......,#",
            "#,............,#",
            "#,,,,,,,,,,,,,,#",
            "#==.==.==.==.==#",
            "################" ],
      walk:'.,', triggers:{r:'b9_c2_rack', P:'b9_c2_post', '<':'b9_c2_field_back'}, start:{x:2, y:5},
      quest:()=> b92Ph() === 5 ? (S.f.b9_c2_redrillDone ? 'Back to the lines. The march is at first light.' : 'The Malazan sergeant. One more day of it.') : !S.f.b9_c2_drillDone ? 'The Malazan sergeant, at his post. The drill.' : 'Back to the lines at dusk. Yelt wants the squad on the train tonight.',
      npcs:[
        {id:'malsgt', name:'The Malazan sergeant', kind:'b7_malsgt', x:7, y:6, node:()=>b92Ph() === 5 ? 'b9_c2_redrill' : !S.f.b9_c2_drillDone ? 'b9_c2_sergeant' : 'b9_c2_sergeant_after', fresh:()=>b92Ph() === 5 ? !S.f.b9_c2_redrillDone : !S.f.b9_c2_drillDone || !S.f.b9_c2_stepTried},
        {id:'heavy', name:'A Malazan heavy', kind:'b2soldier', x:12, y:4, node:()=>'b9_c2_heavy', show:()=>b92Ph() === 2 && !!S.f.b9_c2_drillDone, fresh:()=>!S.f.b9_c2_heavy},
        {id:'corporal', name:'A heavy corporal with a wooden sword', kind:'b2soldier', x:12, y:8, node:()=>'b9_c2_corporal', show:()=>!!S.f.b9_c2_drillDone && !S.f.b9_c2_boutDone, fresh:()=>!S.f.b9_c2_boutTalk},
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:3, y:8, node:()=>'b9_c2_ennic_field', show:()=>b92Ph() === 2, fresh:()=>false} ] },

    /* 16 x 12 (b9_c2_muster, night). The train's yard: w the wagons in their rows  o barrels  x oxen  c Orla's cart  < back to the lines */
    { id:'b9_c2_yard', title:'Outside Letheras · the supply train', sub:'Night · the wagons drawn up', hint:'Tap ground to move · tap a figure to talk · the barrels are north and east', decor:'b9_c2_muster', dark:true,
      map:[ "################",
            "#ww.ww.ww.ww.ww#",
            "#..............#",
            "#.oo........oo.#",
            "#..............#",
            "<....ww..ww....#",
            "#..............#",
            "#.xx.....c.....#",
            "#..............#",
            "#ww.ww.ww.ww.ww#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{w:'b9_c2_ywagon', o:'b9_c2_ybarrels', c:'b9_c2_cart', x:'b9_c2_oxen', '<':'b9_c2_yard_back'}, start:{x:1, y:5},
      quest:()=> !S.f.b9_c2_wagonsDone ? 'Shapes at the barrels, north-east.' : 'Yelt, and his count. Then back to the lines.',
      npcs:[
        {id:'yelt', name:'Yelt, with a lamp', kind:'b5_c1_clerk', x:7, y:6, node:()=>'b9_c2_yelt_night', fresh:()=>!!S.f.b9_c2_wagonsDone && !S.f.b9_c2_counted},
        {id:'thieves', name:'Shapes at the barrels', kind:'b5_letherii', x:12, y:2, node:()=>'b9_c2_thieves', show:()=>!S.f.b9_c2_wagonsDone, fresh:()=>true} ] },

    /* 16 x 12 (b9_c2_muster, day). The muster ground on the last day: the same ground as the first evening, the wagons loading */
    { id:'b9_c2_last', title:'Outside Letheras · the escort\'s muster ground', sub:'The last day · the train loading', hint:'Tap ground to move · tap a figure to talk · the Finadd is by the tents, the train east', decor:'b9_c2_muster',
      map:[ "################",
            "#==.==.==.==.==#",
            "#..............#",
            "#.==.==.....ww.#",
            "#.........o.ww.#",
            "#......F....xx.#",
            "#..............>",
            "#.==.==...c....#",
            "#..............#",
            "#==.==.==.==.==#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b9_c2_fire', w:'b9_c2_wagonline', o:'b9_c2_barrels', c:'b9_c2_cart', x:'b9_c2_oxen', '>':'b9_c2_tofield'}, start:{x:7, y:6},
      quest:()=> !b92Key() ? 'The Finadd, by the tents. The last day\'s orders.' : !S.f.b9_c2_keyDone ? (b92Key() === 'wagons' ? 'The train, east. Yelt and Orla, and the loading.' : 'The drill field, east. The Malazan sergeant.') : 'The fire. Then the gate, behind the foreigners.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:4, y:2, node:()=>'b9_c2_ennic4', fresh:()=>!b92Key()},
        {id:'yelt', name:'Yelt, the brigade clerk', kind:'b5_c1_clerk', x:11, y:4, node:()=>'b9_c2_load', fresh:()=>b92Key() === 'wagons' && !S.f.b9_c2_keyDone},
        {id:'brennet', name:'Brennet, at the wagons', kind:'brennet', x:14, y:4, node:()=>'b9_c2_brennet', show:()=>S.f.b9_brennetDone === 2, fresh:()=>false},
        {id:'orla', name:'Orla, at her water-cart', kind:'b9_c2_orla', x:11, y:7, node:()=>'b9_c2_cart', fresh:()=>false},
        {id:'saffa', name:'Saffa, the field cook', kind:'b9_c2_saffa', x:5, y:6, node:()=>'b9_c2_saffa', fresh:()=>false} ] } ],

  battles:{
    /* the Malazan sergeant's drill: the Letherii's first fight (near certain). Sparring heavies with wooden swords; four rounds of it */
    b9_c2_drill:{title:'The drill field', style:'b9_c2_muster', warrenText:'Day on the drill field · dust, wooden swords, a Malazan voice · warrens thin and uneasy', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold the square four rounds against the sparring heavies. Wooden swords. They still hurt.'},
      map:["........","........","..t..t..","........","........","........","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b9_c2_sparrer',2,1],['b9_c2_sparrer',5,1],['b9_c2_sparrer',4,2]], xp:120, after:'b9_c2_drill_after',
      waves:[{round:2, foes:[['b9_c2_sparrer',1,0],['b9_c2_sparrer',6,0]], text:'The sergeant sends in the next file, fresh, with the dust still settling off the last one.'}],
      preText:()=>`The heavies come across the square in a line, wooden swords up, shields on, at a walk. They are not trying to kill anybody. They are trying to find out where the Letherii will give, and they have done this before.`},
    /* the heavy corporal's bout: optional, after the drill. Wooden swords, in words; death checks still run (the engine's rule) */
    b9_c2_bout:{title:'The corporal\'s bout', style:'b9_c2_muster', warrenText:'Late on the drill field · a ring of watching heavies · warrens thin', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t..t..","........","........","........","........",".t....t.","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b9_c2_corporal',3,1],['b9_c2_sparrer',2,2],['b9_c2_sparrer',5,2]], xp:100, after:'b9_c2_bout_after',
      preText:()=>`A ring of heavies sits down in the dust to watch, which is never good. The corporal rolls his neck and takes the wooden sword in both hands, like a man picking up a spade he knows.`},
    /* thieves at the train's barrels, the night before the last day: city thieves, two of them in old army coats, and their master */
    b9_c2_wagons:{title:'The train\'s yard', style:'b9_c2_muster', dark:true, warrenText:'Night in the supply train · oxen shifting, a lamp at a tailboard · warrens thin', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t..t..","........","........","...t....","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b9_escort',6,8]],
      foes:[['b9_lraider',2,1],['b9_lraider',5,1],['b9_lraiderbow',4,0]], xp:380, after:'b9_c2_wagons_after',
      preText:()=>`Two of them have a barrel half off the tailboard between them, and a third is up on the wagon bed with a bow, keeping watch, badly. They put the barrel down when they see the squad. They put it down carefully, which says what they think it is worth.`,
      stage2:{title:'Between the wagons', xp:170,
        text:()=>`The ones at the barrel are down or running. Between the next two wagons a bigger man is waiting with a cart-whip in one hand and a sword in the other, and two more of his are coming round the oxen behind him. He came for the water barrels, and he means to leave with some.${b92If('brennet', `\n\nBrennet looks at the cart-whip. "That's a Harbour Yard whip," he says. "I know that yard. I know that whip." He lifts the wagon-pin. "I don't think I like him."`)}`,
        map:["#......#","..t..t..","........","........","...tt...","........",".t....t.","........","........","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b9_lraiderchief',3,1],['b9_lraider',5,2]]} } },

  foes:{
    /* a Malazan heavy with a wooden sword and a shield: sparring, not killing; low damage */
    b9_c2_sparrer:{name:'Sparring heavy', sig:'h', kind:'b2soldier', hp:22, ac:13, atk:5, dmg:[1,4,1], rng:1, mv:4, init:1, verb:'cracks a wooden sword across'},
    /* the heavy corporal: bigger, slower, and he means it a little more */
    b9_c2_corporal:{name:'Heavy corporal', sig:'H', kind:'b2soldier', hp:40, ac:14, atk:6, dmg:[1,6,2], rng:1, mv:4, init:1, boss:true, sk:['shove'], verb:'brings a wooden sword down on'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b9_c2_carterscoat:{name:'A carter\'s coat', slot:'armour', role:'light', who:null, ac:1, hp:3,
      line:'A long coat of oiled canvas over quilting, with iron studs sewn at the shoulders where a load rests and a deep pocket for a tally. Orla\'s, once, or her brother\'s; she does not say which. It keeps off dust and rain and the odd swing of a tailboard. Carters wear them for the road, and the road is the point.'},
    b9_c2_tallystick:{name:'Yelt\'s spare tally', slot:'trinket', role:'any', who:null, hp:2,
      line:'A tally-stick of pale ash, notched in Yelt\'s small exact hand: barrels, sacks, skins, a mark for each wagon of the brigade\'s share. His spare, for when the book is wet. Whoever carries it counts the water before the water runs short, which out here is the same as luck.'},
    b9_c2_escortspear:{name:'An escort spear', slot:'weapon', role:'reach', who:null, atk:1, rng:1, reach:true, dmg:[1,8,2],
      line:'A long ash spear with a leaf head and a butt-spike, the escort\'s new issue, stamped with no battalion at all because the Commander broke the old battalions up. Thieves took a bundle off the armoury wagon and dropped this one between the wheels. It keeps a man off the barrels at arm\'s length and a little more.'} },

  scenes:{
    b9_c2_yardnight:{loc:'Outside Letheras', sub:'The supply train · night', cap:'Wagons in rows with their tilts dark, oxen shifting on the picket, water barrels lashed three high, and one lamp at a tailboard.', amb:'explore'},
    b9_c2_road:{loc:'Outside Letheras', sub:'The road east · first light', cap:'The landward gate behind, the escort\'s files and wagons going out onto the road, and far ahead the foreigners\' dust standing up in the morning.', amb:'explore'} },

  end:{
    wagons:['The wagons loaded true', 'The escort mustered on a plain outside Letheras, and a Malazan sergeant of the heavies drilled it into the dirt and out again, and taught it to step as one thing. Thieves came for the train\'s water barrels in the night and did not leave with them. On the last day the squad loaded the brigade\'s wagons with Yelt and Orla, every barrel full and every sack the weight the ration book said, and then the escort went out of the landward gate, east, behind the foreigners\' dust.'],
    drill:['Back for more', 'The escort mustered on a plain outside Letheras, and a Malazan sergeant of the heavies drilled it into the dirt and out again, and taught it to step as one thing. Thieves came for the train\'s water barrels in the night and did not leave with them. On the last day, while the rest of the company loaded the wagons, the squad went back to the drill field and asked the sergeant for more, and got it. Then the escort went out of the landward gate, east, behind the foreigners\' dust.'] },
  endScene:'b9_c2_road',
  endCap:()=> b92Key() === 'drill' ? 'The road east at first light, the escort going out in its files, and somewhere ahead a Malazan sergeant who said they would do.' : 'The road east at first light, the escort going out behind its wagons, and every barrel in the brigade\'s share full to the bung.',
  tease:'Next: the Third. The road east out of Lether, the last farms, and a fever that has half the Malazans.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b9_c2_key === 'wagons') x.push(`The squad loaded the brigade's wagons with Yelt and Orla on the last day, honestly.${f.b9_c2_loadedTrue ? ' The ration book and the wagons agreed.' : ''}`);
    if (f.b9_c2_key === 'drill') x.push('The squad went back to the Malazan sergeant on the last day and asked for more drill. Thegg thought it was the best day of his life.');
    if (f.b9_brennetDone === 1) x.push(b9In('brennet') ? 'Brennet, a carter of the supply train, free since the new emperor\'s law, walks with the squad.' : 'Brennet, a carter of the supply train, walks with the squad.');
    if (f.b9_brennetDone === 2) x.push('Brennet, a carter of the supply train, waits with the wagons, if the squad will have him.');
    if (f.b9_c2_stepOk) x.push('The Malazan sergeant taught the squad the step.');
    if (f.b9_c2_wagonsDone) x.push('Thieves at the train\'s water barrels met the squad, the night before the last day.');
    if (f.b9_c2_boutDone) x.push('A heavy corporal of the Malazans had a bout with the squad, with wooden swords, and shook hands after.');
    if (f.b9_c2_orla === 'out') x.push('Orla\'s water-cart came out of the ditch on the first evening, and she remembers who lifted it.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b9_c2_wagonsDone && 'Thieves at the supply train\'s water barrels, the night before the last day, and a man with a Harbour Yard cart-whip.',
    f.b9_c2_stepOk && 'The Malazan step: each soldier moves when the one beside moves. The line closes as one thing.',
    f.b9_c2_drillDone && 'The Malazan sergeant drilled the escort to its knees, and needled it about the river. The squad stayed standing longer than most.',
    f.b9_c2_heavy && 'A Malazan heavy says a ghost of theirs is going round the Letherii camps, recruiting.',
    f.b9_c2_key && (f.b9_c2_key === 'wagons' ? 'The last day: the squad loaded the brigade\'s wagons with Yelt and Orla, every barrel full.' : 'The last day: the squad went back to the drill field for more.'),
    f.b9_brennetDone != null && 'A carter of the train named Brennet came to the squad at the wagons. He was Indebted to a carting house until the new emperor\'s law.',
    f.b9_c2_yelt && 'Yelt keeps the brigade\'s ration book. He counts everything, and he says the count is the only thing that will get them home.',
    'The Sixth Company, in the Commander\'s escort, outside Letheras, before the march east.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the first evening on the muster ground ======== */
    b9_c2_start:()=>({sp:'The muster ground', scene:'b9_muster', fx:()=>{ S.f.b9_c2_ph = S.f.b9_c2_ph || 1; }, again:()=>'The muster ground at evening, the lamps up, the train loading behind the tents.', txt:
`The escort's muster ground is a plain of trodden grass outside the landward gate, ringed with a rail fence somebody put up and nobody guards. The brigades' tents stand on it in rows, new canvas, new pegs, the old battalion marks painted out. Behind the tents is the supply train, and the supply train goes back further than the eye wants to follow.

Lamps are going up at the tailboards. Somewhere a clerk is calling numbers, and somewhere else an ox is disagreeing with them.

${b92Say({thegg:`Thegg sits down on the grass very slowly, the way big men do when they have been made to stand in a square all day. "He said we stand like a queue at a bakery," he says. "The Malazan." He thinks about it. "My mother queued at bakeries. She stood well."`, tobet:`Tobet is flexing his fingers, one at a time. "He made us hold the shields out level," he says. "For as long as it took him to tell us about the river." He looks at his hands. "It took him a while."`, _:'The squad stands on the trodden grass and is sore in a dozen new places.'})}${b92If('ammet', `\n\nAmmet is already going round the squad with a pot of grease for the shield-blisters. "Hands," she says. "Out. Both."`)}

Finadd Ennic is by the company's tents with a slate under his arm, looking at the Sixth as if counting it.`,
      ch:[{t:'The Finadd.', go:'b9_c2_ennic'},
          b9ReadChoice(2),
          {t:'Walk the muster ground.', go:()=>startExplore()}]}),
    b9_c2_read:()=>b9ReadOffer(2),
    b9_c2_card:()=>b9ReadCard(2),

    /* Finadd Ennic: the escort's word */
    b9_c2_ennic:()=>({sp:B5_FINADD.name, scene:'b9_muster', fx:()=>{ S.f.b9_c2_orders1 = 1; }, again:()=>`${b92Ennic()}, with his slate. "The train, Sergeant. And the drill at first light."`, txt:
`Finadd Ravel Ennic is older than he was at the river, by more than the time since. He has a slate under his arm instead of a list, because the Commander's quartermasters gave every officer one, and he holds it the way he used to hold the list: as if it might be taken off him.

"Sergeant." He nods at the tents. "The Commander has broken the old battalions up and built new ones out of the pieces. Whitefinder is a word on a banner now. We are the Sixth Company of the escort, and we march behind the foreigners when they go, wherever they go." He looks east, where the Malazan lines are a dark smudge on the evening. "They do not tell us. I do not think they tell themselves."

"Two things. The drill again at first light: the Malazan sergeant asked for us by name, which I have decided to take as a compliment. And the train." He taps the slate. "The brigade's share of it is short of hands, and the clerk is short of patience. A carter of the train came round asking for the Sixth. Go and see what he wants."${b92If('perrit', `\n\nPerrit is looking at the slate. "They gave you a slate," she says. "So you can rub it out." Ennic looks at her. "Yes," he says. "That was my thought too."`)}`,
      ch:[{t:'"Where are we going, Finadd? Truly."', req:()=>!S.f.b9_c2_where, go:'b9_c2_ennic_where'},
          {t:'"The train, then."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_ennic_where:()=>({sp:B5_FINADD.name, scene:'b9_muster', fx:()=>{ S.f.b9_c2_where = 1; }, txt:
`"East." He almost smiles. "Into the Wastes, and through them. The clerks have a word for the far side. Kolanse." He says it carefully, as a man handles a coin from a country he has never seen. "I asked a Malazan captain what was in Kolanse. He said a drought. I asked what else. He said that was what he had been told, and he looked at me as if I had asked him the price of his mother."

"The Commander asked for soldiers who came back from the river. We came back. So we go." He tucks the slate under his arm. "Every legend in Lether about the Wastes ends with somebody walking into them. None of them say what happened after. I find I would like to know."`,
      ch:[{t:'Back to the muster ground.', go:()=>startExplore()}]}),

    /* the wagons: Brennet (the first halt) */
    b9_c2_wagonline:()=>{ const d = S.f.b9_brennetDone, ph = b92Ph();
      if (d == null) return DLG.b9_c2_brennet();
      return {sp:'The wagons', scene:ph === 1 ? 'b9_muster' : 'b9_wagons', txt: ph === 1 ?
`The brigade's wagons stand in a double row behind the tents with their tilts up and their shafts down, and carters going between them with lamps, greasing axles and talking to the oxen. Every wagon has a number chalked on its tailboard, and every number is in Yelt's book.` :
`The wagons are loading. Barrels go up the ramps on ropes, sacks go up on shoulders, and at every tailboard a clerk with a tally calls each one as it goes in. The oxen are being walked up from the river in long files, unhappy about all of it.${b92If('brennet', ' Brennet goes from wagon to wagon tapping wheels with his pin, listening to them.')}`,
        ch:[{t:'Back to the ground.', go:()=>startExplore()}]}; },
    b9_c2_brennet:()=>{ const d = S.f.b9_brennetDone;
      if (d === 2) return {sp:'Brennet', scene:b92Ph() === 1 ? 'b9_muster' : 'b9_wagons', txt:
`Brennet is sitting on a wagon-tongue with the pin across his knees, watching the squad's end of the ground. He looks up when you come over, and waits.`,
        ch:[{t:'"Walk with us, Brennet."', fx:()=>{ b9Join('brennet'); }, go:'b9_c2_brennet_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A carter at the wagons', scene:'b9_muster', again:()=>'The carter with the wagon-pin, waiting to be told where to stand.', txt:
`He is under the third wagon of the row with a pot of grease and a lamp, and he comes out backwards when he hears the squad, and stands, and is bigger than he looked under there: a man of thirty or so in a carter's studded apron and a padded cap, with an iron wagon-pin as long as his arm in one hand.

"Sixth Company," he says. "I asked for you." He wipes his hands on the apron, which makes them worse. "Brennet. I drove for a carting house nine years, Indebted to it since I was twelve. Then the new emperor tore the books up." He considers this, as he plainly has every day since. "Free on a Tuesday. The quartermasters came round on the Wednesday asking for carters who'd go east. Free means you can say yes. So I did."

"Thing is, the train goes east behind the brigades, and the brigades are soldiers, and I'm not. Clerk says each wagon wants a squad that knows it. I heard the Sixth came back from the river." He looks at the squad. "That's enough for me."`,
        ch:[{t:'"Walk with us, Brennet."', fx:()=>{ b9Join('brennet'); }, go:'b9_c2_brennet_join'},
            {t:'"Why the Sixth?"', req:()=>!S.f.b9_c2_brennetWhy, go:'b9_c2_brennet_why'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c2_brennet_why:()=>({sp:'Brennet', scene:'b9_muster', fx:()=>{ S.f.b9_c2_brennetWhy = 1; }, txt:
`He takes a folded paper out of his boot: a debt-chit with the carting house's seal on it and a line drawn through it in fresh ink.

"I carried for the army before the river," he says. "Down to the ridge, with the levies' bread. The Sixth were the only ones who helped get a wagon out of the mud without being told." He puts the chit back in his boot. "Don't remember? No. You wouldn't. It was a bad day." He shrugs. "I remember. A man who's been Indebted keeps a book in his head of who did what. I don't know how to stop."${b92If('tobet', `\n\nTobet looks at the chit, and then at his own boot, where he keeps his own. He nods to Brennet as one man nods to another in the same queue.`)}`,
      ch:[{t:'"Walk with us, Brennet."', fx:()=>{ b9Join('brennet'); }, go:'b9_c2_brennet_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_brennet_join:()=>({sp:'Brennet', scene:b92Ph() === 1 ? 'b9_muster' : 'b9_wagons', txt:
`${b9In('brennet') ? `He nods, and hangs the grease pot on the wagon's hook, and comes over to the squad's end of the ground with the pin on his shoulder.

"Where do I stand?" he asks. He is told. "Behind the wagon, then," he says. "That's where I always stood." He thinks. "In front of it, now and then."${b92If('thegg', ` Thegg looks him up and down, one big man measuring another, and moves over on the grass to make room.`)}` : `He nods, and goes back to his wagon: six already walk with the squad, and a carter can count. "When there's room," he says. "The train's not going anywhere without me."`}`,
      ch:[{t:'Back to the ground.', go:()=>startExplore()}]}),

    /* Yelt, the brigade clerk, and his ration book: a count to make */
    b9_c2_yelt:()=>({sp:'Yelt', scene:'b9_muster', fx:()=>{ S.f.b9_c2_yelt = 1; }, again:()=> S.f.b9_c2_found ? 'Yelt, at his tailboard, writing. "Found," he says, not looking up. "Thank you."' : 'Yelt, at his tailboard, with the ration book and a frown.', txt:
`Yelt is a clerk of the brigade, narrow and grey and very clean for a man who works in a supply train, sitting at a tailboard under a lamp with a ledger as thick as a brick. It is the brigade's ration book: every barrel, every sack, every skin in the brigade's share of the train, by wagon and by day.

"The Sixth," he says. "Good. I have been told to expect you and not told why." He turns the book round. "Three barrels of salt pork are written into wagon nine. Wagon nine has none. Either the book is wrong or the wagons are, and the book," he says, with perfect calm, "is never wrong. I made it."

"The new emperor tore up the debt books. He did not tear up mine." He closes it. "Out there, this is the only thing that will get anybody home."`,
      ch:[{t:'Go down the wagons with him, and find where the barrels went.', check:['wits', 16], rations:true, req:()=>!S.f.b9_c2_foundTried,
            edges:id=>[id === 'perrit' && ['a ledger is a sum, and she does sums', 2], id === 'brennet' && ['he knows every wagon in the row by its squeak', 2], id === 'ilsa' && ['she read Patriotist ledgers for a living', 2], id === 'tobet' && ['he has watched clerks lose things on purpose', 1], id === 'sgt' && ['you have checked the company\'s stores every pay-day for years', 1], id === 'thegg' && ['he reads slowly, and Yelt does not like waiting', -1], id === 'ruuk' && ['he will not look at writing', -1]],
            near:{t:()=>`Yes, but the barrels are three wagons down, chalked as nine in somebody's careless hand, and finding them takes ${b92Nm(b92Who())} until long after the lamps are down to their wicks, going wagon by wagon with Yelt reading every number aloud. ${b92Nmc(b92Who())} ${b92V(b92Who(), 'carry', 'carries')} the numbers to bed: rattled.`, fx:()=>b92Rattle(b92Who())},
            fx:()=>{ S.f.b9_c2_foundTried = 1; }, go:'b9_c2_yelt_ok', fail:'b9_c2_yelt_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_yelt_ok:()=>({sp:'Yelt', scene:'b9_muster', fx:()=>{ S.f.b9_c2_found = 1; }, txt:
`${by({brennet:'Brennet walks the row knocking on barrels with his pin, and stops at wagon six. "Pork," he says. "Sounds like pork." It is pork.', perrit:'Perrit reads the book over Yelt\'s shoulder and says the sixes on this page are written the way the nines are written on the last one, and Yelt goes very still, and then very pink.', _:'{who} goes down the row with the lamp and finds them three wagons along, in wagon six, chalked as a nine by somebody careless.'})}

Yelt writes it in. He writes a little note in the margin too, very small, about whoever chalked the tailboard. "Thank you," he says. He means it, which is rare in a clerk. "Out there, three barrels is a company for a day. I will remember the Sixth."`,
      ch:[{t:'Back to the ground.', go:()=>startExplore()}]}),
    b9_c2_yelt_no:()=>({sp:'Yelt', scene:'b9_muster', txt:
`The row goes on and on in the dark, and every tailboard has a number on it, and none of them is the right one. In the end Yelt closes the book. "Tomorrow," he says. "In daylight. The barrels will still be lost in daylight. They are patient." He does not sound patient.`,
      ch:[{t:'Back to the ground.', go:()=>startExplore()}]}),

    /* Orla's water-cart, a wheel in the ditch; on the last day, a line */
    b9_c2_cart:()=>{ const ph = b92Ph(), o = S.f.b9_c2_orla;
      if (ph === 3) return {sp:'Orla\'s water-cart', scene:'b9_c2_yardnight', txt:
`Orla's water-cart is drawn up by the oxen for the night, its barrel full and its tap tied shut with a rag. Orla herself is asleep under it on a blanket, with a cudgel beside her and one boot still on, in case.`,
        ch:[{t:'Back to the yard.', go:()=>startExplore()}]};
      if (ph >= 4) return {sp:'Orla', scene:'b9_wagons', txt:
`Orla is filling her water-cart at the river end of the ground, barrel by barrel, with a face that says she is counting. "Water's water," she says, "till it isn't. Then it's the only thing." She slaps the barrel. ${o === 'out' ? '"This one\'s mine. And I know who lifted it out of the ditch."' : '"This one goes where I go."'}${b92If('brennet', ` She nods at Brennet. "Harbour Yard," she says. "I know your squeak." He looks pleased.`)}`,
        ch:[{t:'Back to the ground.', go:()=>startExplore()}]};
      if (o) return {sp:'Orla', scene:'b9_muster', txt:
`Orla's water-cart is ${o === 'out' ? 'out of the ditch and standing level, its barrel topped up' : 'still in the ditch, and Orla is sitting on the shaft eating bread and waiting for daylight and a team'}. She raises the bread to the squad.`,
        ch:[{t:'Back to the ground.', go:()=>startExplore()}]};
      return {sp:'Orla, at her water-cart', scene:'b9_muster', txt:
`A water-cart has gone into the drainage ditch at the edge of the ground, one wheel in, one wheel up, and its barrel leaning at an angle a barrel does not like. A woman in a carter's coat is standing in the ditch with her shoulder under the axle, swearing in a low steady voice, as if saying a prayer she knows well.

"Orla," she says, when she sees the squad. "Water-cart. Brigade's second. That ox went into the ditch to look at a weed, and the cart went with him, and the ox came out." She does not take her shoulder away. "The ox is a coward. Are you?"`,
        ch:[{t:'Get shoulders under it and lift it out.', check:['might', 15],
              edges:id=>[id === 'thegg' && ['Tarthenal shoulders, and a lifetime of being asked', 2], id === 'brennet' && ['he has had a hundred wheels out of a hundred ditches', 2], id === 'sorvan' && ['he has lifted a lamed horse off a lancer', 1], id === 'pessa' && ['she has hauled eel-boats up canal steps', 1], id === 'perrit' && ['she is built for sums, not axles', -1], id === 'ilsa' && ['a clerk lifts paper', -1]],
              near:{t:()=>`Yes, but the cart comes up all at once and the barrel shifts on its chocks, and ${b92Nm(b92Who())} ${b92V(b92Who(), 'take', 'takes')} the shaft across the ribs. ${b92Nmc(b92Who())}'ll feel it on the drill field.`, fx:()=>bruise(b92Who(), bruiseN())},
              go:'b9_c2_cart_ok', fail:'b9_c2_cart_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c2_cart_ok:()=>({sp:'Orla', scene:'b9_muster', fx:()=>{ if (!S.f.b9_c2_orla) { S.f.b9_c2_orla = 'out'; gain('b9_c2_carterscoat'); } }, txt:
`It comes up out of the ditch with a sound like a drunk getting off a bench, and stands on four wheels on the grass, and the barrel settles back on its chocks with a slosh that everybody listens to.

Orla walks round it once, slowly, the way the Malazan sergeant walked round the front rank. Then she goes to the cart's box and takes out a long coat of oiled canvas with iron studs at the shoulders and hands it to the nearest soldier. "My brother's," she says. "He went home to Brevos. Said the Wastes were for idiots." She considers the squad. "You'll want it."`,
      ch:[{t:'Back to the ground.', go:()=>startExplore()}]}),
    b9_c2_cart_no:()=>({sp:'Orla', scene:'b9_muster', fx:()=>{ if (!S.f.b9_c2_orla) { S.f.b9_c2_orla = 'ditch'; gain('b9_c2_carterscoat'); } }, txt:
`It comes up a hand's breadth, and then the bank gives, and it goes back in deeper. Orla climbs out of the ditch and wipes her hands and looks at it.

"Daylight," she says. "And a team." She goes to the cart's box anyway and takes out a long coat of oiled canvas with iron studs at the shoulders, and hands it over. "My brother's. He went home. You tried, which is more than the ox did. Take it."`,
      ch:[{t:'Back to the ground.', go:()=>startExplore()}]}),

    /* Saffa, the field cook */
    b9_c2_saffa:()=>({sp:'Saffa', scene:b92Ph() === 1 ? 'b9_muster' : 'b9_wagons', fx:()=>{ S.f.b9_c2_saffa = 1; }, txt: b92Ph() === 1 ?
`Saffa is the field cook for three companies, a broad woman with burn scars up both forearms and a ladle she points with. Her pot is the size of a small boat and it is full of something that smells of onions and has, she says, been pork.

"You're the Sixth," she says. "You're on my ladle. You come at the second bell and not the first, because the first is for the officers and the officers take the top." She stirs. "Out east it'll be thinner. I'm saying so now so nobody shouts at me later."${b92If('ammet', `\n\nAmmet looks at the scars. "Grease burns," she says. "You let them heal open." Saffa looks back at her. "I had a pot to see to," she says. Ammet nods, as one professional to another.`)}` :
`Saffa is packing her pots into a wagon with the care of a woman packing a family's silver. "The big one goes on top," she says. "If the wagon goes over, the big one comes out first and I can cook in it." She looks at the squad. "That's the whole of my plan for the Wastes. It's better than the Commander's. He hasn't told me his."`,
      ch:[{t:'Back to the ground.', go:()=>startExplore()}]}),

    /* the oxen; the barrels */
    b9_c2_oxen:()=>({sp:'The oxen', scene:b92Ph() === 3 ? 'b9_c2_yardnight' : b92Ph() === 1 ? 'b9_muster' : 'b9_wagons', txt:
`The oxen stand on their picket in a long brown row, chewing, steaming a little, regarding the soldiers with the deep patience of animals who know the soldiers will be walking too.${b92If('brennet', ' Brennet goes down the row saying their names, every one, in a voice he uses for nobody else.')}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c2_barrels:()=>({sp:'The water barrels', scene:b92Ph() === 1 ? 'b9_muster' : 'b9_wagons', txt:
`Water barrels, lashed three high on a flat wagon and roped over. Every one has a number burned into the stave and a line in Yelt's book. On the end of the top one someone has written in chalk, in a soldier's hand: <em>not for washing</em>.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* the tile-woman at a tailboard (the reading's place) */
    b9_c2_tailboard:()=>({sp:'The tile-woman', scene:'b9_muster', again:()=>'The tile-woman at her tailboard, with her bag of bone tiles. "Still a dock."', txt:
`An old woman in a shawl sits on the tailboard of a supply wagon with a lamp on a hook beside her and an oiled bag on her knee. Bone tiles, by the sound of it when she shifts. She read tiles for soldiers in the city, under the Edur and after, and she has come out onto the plain with the train because, she says, the soldiers have.

"Going east," she says. "On a wagon, at my age. The quartermaster says I'm cargo." She sniffs. "I said cargo is paid for. He let me on."${b92If('perrit', `\n\nShe looks at Perrit. "Your cadre girl reads for free," she says. "Wrong, but free."`)}`,
      ch:[b9ReadChoice(2),
          {t:'Back to the ground.', go:()=>startExplore()}]}),

    /* the way on from the first evening (also the fire's) */
    b9_c2_turnin:()=>({sp:'The muster ground', scene:'b9_muster', txt:
`The lamps go down at the tailboards one by one. The clerk stops calling numbers. The ox stops disagreeing. Over in the Malazan lines a long way off somebody is singing something slow and rude, and somebody else tells him to stop, and he does not.

The squad turns in under new canvas that smells of the stores it came out of. First light, the drill again.`,
      ch:[{t:'First light. The drill field.', onward:true, fx:()=>{ S.f.b9_c2_ph = 2; }, go:()=>{ startExplore('b9_c2_field'); talk('b9_c2_field_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ======== the fire: by phase. 1 the first evening, 4 and 5 the last day. The games pass wraps this node: keep the id ======== */
    b9_c2_fire:()=>{ const ph = b92Ph(), day = ph >= 4, rk = day ? 'b9_c2_rest4' : 'b9_c2_rest1';
      return {sp:'The squad\'s fire', scene:day ? 'b9_wagons' : 'b9_muster', html:rationsHTML(),
        again:()=> day ? 'The squad\'s fire by the tents, a pot on it, the wagons loading behind.' : 'The squad\'s fire on the muster ground, the lamps up at the tailboards.', txt:
`${day ? `The squad's fire by the tents is a cook-fire in daylight, with a pot on it that Saffa did not make, in among the coming and going of the last day: wagons loading, oxen being walked up, clerks with tallies shouting numbers at each other across the ground.${S.f.b9_c2_keyDone ? ' The march is at first light. Tonight is the last night anybody sleeps within sight of Letheras.' : ''}` : `The squad's fire is a small one in a ring of stones in front of the Sixth's tents, with the muster ground going dark round it and the lamps going up behind, at the tailboards of the train. The city is a low black line to the west, with a few lights in it. East, the Malazan lines have their own fires, more of them, and further apart.`}${b92If('perrit', day ? '' : `\n\nPerrit has her tiles in their calfskin on her knee, and keeps not opening it.`)}${b92If('brennet', `\n\nBrennet sits a little back from the fire, on a wagon-tongue he has dragged over for the purpose, where he can see the train.`)}`,
        ch:[...(ph === 1 ? [b9ReadChoice(2)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(day ? 'The squad sits an hour by the fire on the last day. Blisters close, mostly.' : 'The squad sits an hour by the fire after the drill. The aches go down, mostly.'); }, go:'b9_c2_fire_rest'},
            {t:'Talk with the squad.', go:'b9_c2_fire_talk'},
            {t:'Turn in. The drill at first light.', req:()=>ph === 1 && b92NightReady(), onward:true, go:'b9_c2_turnin'},
            {t:'The gate, behind the foreigners. The march.', req:()=>ph === 5 && !!S.f.b9_c2_keyDone, onward:true, go:'b9_c2_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c2_fire_rest:()=>({sp:'The squad\'s fire', scene:b92Ph() >= 4 ? 'b9_wagons' : 'b9_muster', txt:
`${b92Ph() >= 4 ? 'An hour, then, in the sun, with the wagons loading round the fire and carters stepping over the squad\'s legs.' : 'An hour, then, on the grass by the fire, with the muster ground going quiet round it.'}

${b92Say({ammet:`Ammet goes round the squad with the grease pot and a roll of linen, and takes every hand in turn and looks at it. "Blisters," she says. "Blisters. That one's going bad. Hold still." She lances it before anybody can object.`, perrit:`Perrit sits with her eyes closed and her palm flat on the grass. "The Holds are quiet here," she says. "Too quiet." She opens one eye. "Rest anyway."`, _:'Some of them sleep. The rest watch the Malazan fires.'})}${b92If('thegg', `\n\nThegg sleeps sitting up, with his shield on his knees, as he did at the river.`)}`,
      ch:[{t:'Back to the fire.', go:'b9_c2_fire'}]}),
    b9_c2_fire_talk:()=>{ const day = b92Ph() >= 4, ln = [];
      if (b9In('tobet')) ln.push(day ? `Tobet is restringing his bow in the sun with a dry string. "Lether strings for Lether," he says. "Damp. This is a Malazan string. One of theirs gave it to me." He tests it. "Didn't sell it. Gave it." He looks puzzled. "I've been trying to work out what I owe him."` : `Tobet has his tally-stick out and is running his thumb down the notches. "The paybook still has the number in it," he says. "The old one. The debt." He puts the stick away. "No one's going to collect it. I still read it every night. I don't know what else to read."`);
      if (b9In('thegg')) ln.push(day ? `Thegg is watching the Malazan heavies drill on the far side of the ground. "Look at them," he says. "When one moves, they all move." He watches a while longer. "My mother said a Tarthenal line was a lot of men standing near each other. That's not a line. That's one thing."` : `Thegg has his hands round a cup and is looking at the Malazan fires. "At the river," he says, "they came up out of the water in a line, and we were a crowd." He drinks. "Today one of them told me so. Fair. He was there too."`);
      if (b9In('perrit')) ln.push(day ? `Perrit is doing sums in the dust with a stick. "Twelve thousand soldiers, near enough, and the train," she says. "Water for so many days." She rubs it out. "The quartermasters did the same sum. I'd like to see theirs. I think it has a guess in the middle of it."` : `Perrit is turning a tile in her fingers without looking at it. "The cadre can't feel the Holds properly since the night the dead stirred in the city," she says. "None of us. Like a room with the lamp gone out." She puts the tile away. "The Malazans' mages are the same, I hear. That should be a comfort. It isn't."`);
      if (b9In('ammet')) ln.push(day ? `Ammet is packing her kit into a satchel and then packing it again in a different order. "There is one surgeon to the company," she says, "and the nearest healers' house will be behind us by tomorrow night." She ties the satchel. "Don't get cut, Sergeant. That's my whole plan."` : `Ammet is rubbing grease into her own hands now that everyone else's are done. "The Malazan sergeant," she says, "had the shields held out till three of the company dropped them." She flexes her fingers. "Then he showed them how to hold them so the weight's in the shoulder. He could have shown them first." She considers. "No. He couldn't. They wouldn't have listened."`);
      if (b9In('ilsa')) ln.push(day ? `Ilsa is reading the brigade's movement order, which somebody pinned to a tent pole. "It says east," she says. "In three different hands, each one more sure than the last." She smooths it flat. "In the files, that means nobody knows."` : `Ilsa sits with her grey coat folded on her knees, watching the clerks at the tailboards. "They count everything," she says. "Barrels, sacks, skins. Nothing about the people." She almost smiles. "I used to count the people. I think I like this better."`);
      if (b9In('sorvan')) ln.push(day ? `Sorvan has been down to the Bluerose horse lines and come back. "They're riding ahead of the train," he says. "Outriders. Knee to knee, and turn as one." He nods at the Malazan heavies. "Like that. On horses." He seems pleased that anybody else knows how.` : `Sorvan is oiling his blue scale by the fire, plate by plate. "Bluerose sent a full wing," he says. "For the escort. They asked who'd ride with foreigners." He works a plate. "Everybody stepped forward. Not one of us wanted to be the one left home to explain it."`);
      if (b9In('ruuk')) ln.push(day ? `Ruuk is lying on his back on the grass watching the clouds go east. "Even the clouds are going," he says. "They haven't been told why either."` : `Ruuk is grinning at the Malazan fires. "In Faraed," he says, "we would have let the foreigners walk into the Wastes alone and waited to see what came back." He shrugs. "Lether goes with them. Bigger idea. Worse."`);
      if (b9In('brune')) ln.push(day ? `Brune has her feet in the irrigation ditch at the edge of the ground. "Last water that comes from the sea," she says. "The Shore won't follow us out there." She wriggles her toes. "It'll hear about it."` : `Brune is looking west, toward the river. "The river goes to the sea," she says. "We go the other way." She pulls her knees up. "I've never walked away from the sea before. It feels like walking uphill."`);
      if (b9In('pessa')) ln.push(day ? `Pessa has wrapped the boathook in sacking for the march. "No canals out east," she says. "No boats." She pats it. "It comes anyway. It's not a boathook any more. It's a reason."` : `Pessa is scowling at the Malazan fires. "They needled us all day about the river," she says. "Every one of them." She spits in the fire. "I was pressed off an eel-boat the week before. I never got to the river. I'm still angry about it."`);
      if (b9In('brennet')) ln.push(day ? `Brennet is watching the oxen go up to the wagons in files. "Ninety-four oxen in the brigade's share," he says. "I know sixty by name." He watches. "By the far side of the Wastes I'll know the rest. Or there'll be fewer." He does not say which he thinks.` : `Brennet is eating Saffa's stew slowly, out of a tin he carved the house's mark off. "First night I've ever eaten that wasn't on the house's book," he says. He looks at the stew. "Tastes the same." He finishes it anyway. "That's the strange part."`);
      return {sp:'The squad\'s fire', scene:day ? 'b9_wagons' : 'b9_muster', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b9_c2_fire'}]}; },

    /* ======== phase 2: the drill field ======== */
    b9_c2_field_arrive:()=>({sp:'The drill field', scene:'b9_muster', again:()=>'The drill field, the dust up, the Malazan sergeant at his post.', txt:
`The drill field is a square of beaten earth beside the muster ground, the grass trodden off it by a hundred thousand Letherii feet in the last few days, and all of it is dust now. The companies of the escort come onto it one after another at first light and leave it bent over.

The Malazan sergeant is at his post in the middle with a wooden sword under his arm, a grey square soldier of the heavies with a voice that carries without his raising it. His heavies stand round the square in their scale, leaning on wooden swords and shields, waiting, with the bored faces of people who have done this to a great many Letherii.${b92If('brennet', `\n\nBrennet has come along, because the squad has. He looks at the square, and at the heavies, and puts the wagon-pin down very carefully. "I'll watch," he says. The squad does not let him.`)}`,
      ch:[{t:'The Malazan sergeant.', go:'b9_c2_sergeant'},
          {t:'Walk the field.', go:()=>startExplore()}]}),
    b9_c2_sergeant:()=>({sp:'The Malazan sergeant', scene:'b9_muster', again:()=>'The Malazan sergeant at his post, the wooden sword under his arm.', txt:
`He watches the Sixth come onto the square like a farmer watching a field come up crooked.

"Sixth Company," he says. "You were at the river." It is not a question. "So was I. You stood very nicely on the bank, and then you stopped standing, one at a time, all along the line, each of you when you liked." He walks along the front of the squad. "Today you will stand when the soldier beside you stands, and go when the soldier beside you goes, and not one moment before. My heavies will help."

He looks at you. "Sergeant. The squad is yours. The square is mine." He steps back. "Shields up."`,
      ch:[{t:'"Shields up." Into the square.', go:()=>startBattle('b9_c2_drill', {})},
          {t:'Answer him back about the river first.', check:['guile', 16], req:()=>!S.f.b9_c2_backTried,
            edges:id=>[id === 'sgt' && ['you were on that bank too, and you remember who broke first', 1], id === 'pessa' && ['she is angry enough for the whole company', 1], id === 'ilsa' && ['she reads men for a living', 2], id === 'ruuk' && ['he grins at sergeants of every army', 1], id === 'thegg' && ['he agrees with the Malazan, and it shows', -2], id === 'ammet' && ['she would rather get on with it', -1]],
            near:{t:()=>`Yes, but he likes it, and to show how much he likes it he has the squad hold the shields out level while ${b92Nm(b92Who())} ${b92V(b92Who(), 'finish', 'finishes')} the answer, and then again while he gives his. ${b92Nmc(b92Who())}'ll feel it in the shoulders on the square.`, fx:()=>bruise(b92Who(), bruiseN())},
            fx:()=>{ S.f.b9_c2_backTried = 1; }, go:'b9_c2_back_ok', fail:'b9_c2_back_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_back_ok:()=>({sp:'The Malazan sergeant', scene:'b9_muster', fx:()=>{ S.f.b9_c2_back = 1; }, txt:
`${by({sgt:'"And your lot came up out of the river wet to the neck and got to the bank because we let you," you tell him, "and you know it."', ilsa:'Ilsa tells him, quietly, the name of the Malazan company that came ashore first at the river and how many of it got to the bank, which she read in a report she was not meant to read, and he looks at her for a long breath.', pessa:'Pessa tells him exactly what she thinks of foreigners who win battles she never got to, at length, and in canal words.', _:'{who} gives him the river back, the Letherii side of it, and does not leave anything out.'})}

He listens to all of it. Then he nods, once. "Good," he says. "Angry is better than sorry. Sorry drops its shield." He takes the wooden sword out from under his arm. "Shields up."`,
      ch:[{t:'Into the square.', go:()=>startBattle('b9_c2_drill', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_back_no:()=>({sp:'The Malazan sergeant', scene:'b9_muster', txt:
`It comes out wrong, the way it does when the man you are answering is right. He hears it out, kindly, which is worse.

"There," he says. "Now you've said it. Feel better?" He does not wait. "Shields up."`,
      ch:[{t:'Into the square.', go:()=>startBattle('b9_c2_drill', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_drill_after:()=>({sp:'The drill field', scene:'b9_muster', fx:()=>{ S.f.b9_c2_drillDone = 1; }, txt:
`It ends when the sergeant says it ends, and not before, with the squad still on its feet in the middle of the square in a ring of sitting, breathing heavies, and the dust coming down slowly over all of them.

The sergeant walks round the squad once. "Better," he says. "You stood together for nearly as long as it took to say it." He looks at the other companies of the escort, most of which are lying on the grass at the edge of the square in heaps. "Better than them."${b92Say({thegg:`\n\nThegg is still holding his shield out level, though nobody has told him to. The sergeant looks at it, and at him. "You can put it down, big man," he says. Thegg puts it down. He looks as if he had been given a medal.`, tobet:`\n\nTobet has sat down on the spot with his bow across his knees, very carefully, as if he might break. "I'm a bowman," he says to nobody. "I stand at the back. That's the whole point of a bowman."`, _:''})}${b92If('brennet', `\n\nBrennet is breathing like a winded ox. "Nine years on a wagon-seat," he says. "They never told me about this part."`)}

Then the sergeant says something nobody expected. "There's a step," he says. "The heavies' step. If you want it, I'll show you. If you don't, there's water at the trough."`,
      ch:[{t:'"Show us the step."', go:'b9_c2_sergeant_after'},
          {t:'Back to the field.', go:()=>startExplore()}]}),

    /* the step: the trick */
    b9_c2_sergeant_after:()=>({sp:'The Malazan sergeant', scene:'b9_muster', again:()=> S.f.b9_c2_stepOk ? 'The Malazan sergeant at his post, watching the next company come on. "Step," he says to it. It does not.' : 'The Malazan sergeant at his post, the wooden sword under his arm.', txt:
`He has his own heavies show it first, six of them in a line: one soldier steps, and the next steps with him, not after, and the next, so the whole line moves as one long thing and closes as one, rim to rim, without a word from anyone.

${S.f.b9_c2_stepTried ? `"Again tomorrow," he says. "Or the day after, out there, where you'll need it."` : `"It's not a step," he says. "It's a promise. You go when he goes. He goes when you go. No one is first." He looks at the Letherii. "You've all walked in step before. Parade step. That's walking near each other. This is walking as each other." He shrugs. "Try it."`}${b92If('thegg', `\n\nThegg is watching the heavies' feet with the face of a man seeing something he has always wanted named.`)}`,
      ch:[{t:'Learn the step the heavies\' way: shoulder to the next shoulder, and go when it goes.', check:['wits', 18], trick:'b9_c2_step', req:()=>!S.f.b9_c2_stepTried, fx:()=>{ S.f.b9_c2_stepTried = 1; },
            edges:id=>[id === 'sorvan' && ['Bluerose lancers ride knee to knee and turn as one', 2], id === 'brennet' && ['an ox team moves when the lead ox moves, and so does a carter', 2], id === 'thegg' && ['he watched the Malazans come up out of the river in a line', 2], id === 'sgt' && ['you have called the Whitefinders\' parade step for years, and it was not this', 1], id === 'pessa' && ['rowers on the eel-boats pull when the next one pulls', 1], id === 'tobet' && ['a bowman keeps the beat of a volley', 1], id === 'ammet' && ['a surgeon\'s hands keep time with a pulse', 1], id === 'perrit' && ['she counts it, and a count is always a beat behind', -1], id === 'ruuk' && ['the Faraed never walk in step with anybody', -1], id === 'ilsa' && ['she reads the drill instead of doing it', -1]],
            go:'b9_c2_step_ok', fail:'b9_c2_step_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_step_ok:()=>({sp:'The Malazan sergeant', scene:'b9_muster', fx:()=>{ S.f.b9_c2_stepOk = 1; }, txt:
`It goes wrong three times, and then, the fourth time, ${by({sgt:'you stop thinking about your own feet and feel the shoulder next to yours go, and go with it, and', sorvan:'Sorvan says "Knee to knee," under his breath, like a lancer, and', brennet:'Brennet says "Walk on," the way he says it to the lead ox, and', thegg:'Thegg stops waiting to be told and simply goes when the man beside him goes, and', _:'{who} stops thinking about it, and'})} the squad moves across the square as one thing and closes up at the end of it as one thing, and nobody gave an order to close.

The sergeant watches it once more, all the way. "That'll do," he says. "That's the step." He turns away to the next company, which is lying on the grass. "Up," he says to it. "Your turn to be shamed by Letherii."`,
      ch:[{t:'Back to the field.', go:()=>startExplore()}]}),
    b9_c2_step_no:()=>({sp:'The Malazan sergeant', scene:'b9_muster', txt:
`It goes well for three paces, and then somebody goes before the soldier beside them, and somebody else waits to see, and the squad comes apart in the middle like wet bread.

"Heavies learn it in a year," the sergeant says. "You've had a morning." He does not seem disappointed. He seems as if this is what he expected, and is saving the disappointment for something worse.`,
      ch:[{t:'Back to the field.', go:()=>startExplore()}]}),

    /* a Malazan heavy: the rumour; and the other squad, as camp talk */
    b9_c2_heavy:()=>({sp:'A Malazan heavy', scene:'b9_muster', fx:()=>{ S.f.b9_c2_heavy = 1; }, txt:
`A heavy of the Malazans is sitting on an upturned bucket at the edge of the square, unlacing his scale, a big tired man with a face like a closed door that opens, now and then, for a joke.

"You lot'll do," he says. "Don't tell the sergeant I said. He likes to say it himself." He works at a lace. "Here. A word. There's a ghost going round your camps. One of ours that came back, they say, which nobody comes back from. Recruiting Letherii." He looks at the squad. "Don't go. Whatever he's making, it's loud."

He gets the lace undone and sighs. "Our own lot are no better. Heard ${b92Rumour()}." He shrugs. "Heavies talk. It's the only thing we do fast."`,
      ch:[{t:'Back to the field.', go:()=>startExplore()}]}),
    b9_c2_ennic_field:()=>({sp:B5_FINADD.name, scene:'b9_muster', txt: S.f.b9_c2_drillDone ?
`Finadd Ennic is at the edge of the square, writing on his slate. He looks up. "The sergeant said you'll do," he says. "To me. Not to you." He rubs something out. "I am told that is high praise among the foreigners. Yelt wants the squad on the train tonight. The water barrels have been got at."` :
`Finadd Ennic is at the edge of the square with the other officers of the escort, watching their companies be taken apart. "Go on, Sergeant," he says. "He asked for the Sixth by name. I'd like to know why too."`,
      ch:[{t:'Back to the field.', go:()=>startExplore()}]}),
    b9_c2_rack:()=>({sp:'The racks', scene:'b9_muster', txt:
`A rack of wooden swords and a stack of practice shields, bound with rawhide, every one of them dented. The wood is dark at the grips from a great many Letherii hands, and darker in other places.`,
      ch:[{t:'Back to the field.', go:()=>startExplore()}]}),
    b9_c2_post:()=> b92Ph() === 5 ? DLG.b9_c2_redrill() : !S.f.b9_c2_drillDone ? DLG.b9_c2_sergeant() : DLG.b9_c2_sergeant_after(),

    /* the heavy corporal's bout: optional */
    b9_c2_corporal:()=>({sp:'A heavy corporal', scene:'b9_muster', fx:()=>{ S.f.b9_c2_boutTalk = 1; }, again:()=>'The heavy corporal, with his wooden sword, waiting for an answer.', txt:
`A corporal of the heavies comes over with a wooden sword on his shoulder and two of his squad behind him: a broad man with a neck like a gatepost and a pleasant, interested face.

"Sergeant says you'll do," he says. "I'd like to see for myself. Proper bout, your squad and my three. Wooden swords. No one dies, unless they're very unlucky, and the trough's right there." He grins. "Loser carries water for the winner. Up to you."${b92If('thegg', `\n\nThegg is already standing up.`)}`,
      ch:[{t:'"Pick up your sword, Corporal."', go:()=>startBattle('b9_c2_bout', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_bout_after:()=>({sp:'A heavy corporal', scene:'b9_muster', fx:()=>{ S.f.b9_c2_boutDone = 1; }, txt:
`It ends with the corporal on his back in the dust looking up at the sky, and laughing, which the watching heavies seem to think is the correct thing to do.

He gets up with a hand from ${b92Say({thegg:'Thegg', sorvan:'Sorvan', _:'a squadmate'})}, and shakes it, and keeps hold of it a moment. "Letherii," he says. "Huh." He picks up his wooden sword. "I'll carry the water. Don't tell the sergeant how it went. He'll want to try it himself."${b92If('brennet', `\n\nBrennet has been holding the wagon-pin like a quarterstaff the whole time. He looks at it. "I could get used to this," he says, and seems alarmed.`)}`,
      ch:[{t:'Back to the field.', go:()=>startExplore()}]}),

    /* the way back from the field: to the train at dusk (phase 3), or after the last day's drill */
    b9_c2_field_back:()=>{ const ph = b92Ph();
      if (ph === 5) return {sp:'The drill field', scene:'b9_muster', txt: S.f.b9_c2_redrillDone ?
`The square is emptying. The companies are going back to the muster ground to load, and the heavies are stacking the wooden swords in their racks for the last time in Lether.` :
`The square, and the Malazan sergeant at his post in the middle of it, waiting to see if the Sixth meant it.`,
        ch: S.f.b9_c2_redrillDone ? [{t:'Back to the muster ground.', go:()=>{ startExplore('b9_c2_last'); }}, {t:'Not now.', go:()=>startExplore()}] : [{t:'Back to the field.', go:()=>startExplore()}]};
      return {sp:'The drill field', scene:'b9_muster', txt: S.f.b9_c2_drillDone ?
`The light is going. The last company is coming off the square on its hands and knees, more or less. Back at the lines, the Finadd says, Yelt wants the squad on the train tonight: somebody has been at the water barrels.` :
`Back to the lines, with the drill not done? The Malazan sergeant is watching. So is the Finadd.`,
        ch: S.f.b9_c2_drillDone ? [{t:'Dusk. The train\'s yard.', onward:true, fx:()=>{ S.f.b9_c2_ph = 3; }, go:()=>{ startExplore('b9_c2_yard'); talk('b9_c2_yard_arrive'); }},
                                   {t:'Not now.', go:()=>startExplore()}] :
          [{t:'Back to the field.', go:()=>startExplore()}]}; },

    /* ======== phase 3: night in the train's yard ======== */
    b9_c2_yard_arrive:()=>({sp:'The supply train', scene:'b9_c2_yardnight', again:()=>'The train\'s yard at night, the wagons drawn up, a lamp at a tailboard.', txt:
`The brigade's share of the train is drawn up for the night in rows beyond the tents, wagon after wagon with the tilts down and the shafts on the ground, oxen on their pickets between them, and one lamp at Yelt's tailboard in the middle of it all.

"Two barrels of water gone off wagon fourteen last night," Yelt says. "Not lost. Gone. Rolled off. I found the marks." He holds the lamp up and looks at the dark rows. "Water. Out there." He does not finish it. "The Finadd says the Sixth will sit the yard. I am glad. I am a clerk."${b92If('brennet', `\n\nBrennet walks a little way down the row and stops, and listens, the way he listens to wheels. "There's someone at the barrels," he says, low. "North end. Not ours. Ours don't creep."`)}`,
      ch:[{t:'Walk the yard.', go:()=>startExplore()}]}),
    b9_c2_ywagon:()=>({sp:'The wagons', scene:'b9_c2_yardnight', txt:
`Wagons in their rows, tilts down, tailboards up and pinned. Each one has its number chalked fresh, and a carter asleep under it or on it. One snores. The oxen do not seem to mind.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c2_ybarrels:()=>({sp:'The water barrels', scene:'b9_c2_yardnight', txt: S.f.b9_c2_wagonsDone ?
`The water barrels are back on their wagon, roped over, and the rope is new where the old one was cut.` :
`Water barrels lashed three high on a flat wagon. The rope over the near stack has been cut, neatly, by somebody with a good knife.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c2_thieves:()=>({sp:'Shapes at the barrels', scene:'b9_c2_yardnight', txt:
`Three of them at the north end of the row, at the water wagon: two easing a barrel off the tailboard on a rope, and one up on the bed with a short bow, watching the wrong way. City men by their boots, and two in old army coats with the buttons cut off. The kind of men who know that in a few days' time a barrel of water outside Letheras will be worth more than they are.${b92If('tobet', `\n\nTobet has an arrow on the string already. "The one on the bed," he says. "He's looking at the city. He thinks we're the city."`)}`,
      ch:[{t:'"Sixth! At the water!" Straight at them.', go:()=>startBattle('b9_c2_wagons', {})},
          {t:'Come round behind the oxen, quiet, and take them at the barrels.', check:['guile', 16],
            edges:id=>[id === 'ruuk' && ['a Faraed guide moves in the dark like the dark', 2], id === 'brennet' && ['he knows the ox lines, and the oxen know him', 2], id === 'tobet' && ['a bowman knows how to wait', 1], id === 'ilsa' && ['she watched the agents move in Letheras', 1], id === 'thegg' && ['he is very large, and oxen notice', -1], id === 'sorvan' && ['blue scale in a dark yard is a bell', -1]],
            near:{t:()=>`Yes, but an ox shies as ${b92Nm(b92Who())} ${b92V(b92Who(), 'go', 'goes')} by, and kicks the barrel they were easing down off the tailboard, and it lands on its end and splits a stave, and the squad's own water goes into the grass while the thieves turn round: a ration gone.`, fx:()=>{ b9Ration(-1, 'a barrel split in the dark'); }},
            go:()=>startBattle('b9_c2_wagons', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c2_thieves_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c2_thieves_seen:()=>({sp:'Shapes at the barrels', scene:'b9_c2_yardnight', txt:
`An ox lows. Three heads come round together, and the barrel goes down on the grass, and the knives come out.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c2_wagons', {surprise:'e'})}]}),
    b9_c2_wagons_after:()=>({sp:'The supply train', scene:'b9_c2_yardnight', fx:()=>{ if (!S.f.b9_c2_wagonsDone) { S.f.b9_c2_wagonsDone = 1; gain('b9_c2_escortspear'); } }, txt:
`The yard is quiet again. The oxen have stopped shifting. The barrels are on the grass, and none of them is broken, and the man with the cart-whip is down between the wheels with the whip still in his fist, and the rest have gone over the rail fence toward the city and will not be back.

Between the wheels of the water wagon there is a long ash spear with a leaf head, the escort's new issue, stamped with no battalion at all. They had a bundle of them off the armoury wagon and dropped this one. It goes in the kit.${b92Say({brennet:`\n\nBrennet is putting the barrels back on the wagon one by one, with a rope and his back, and checking each bung with his thumb. "All there," he says. "All full." He sounds as if it matters to him personally, and it does.`, thegg:`\n\nThegg lifts the barrels back up onto the bed one at a time, as if they were loaves.`, _:''})}

Down the row, Yelt is coming with his lamp and his book.`,
      ch:[{t:'Yelt.', go:'b9_c2_yelt_night'},
          {t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c2_yelt_night:()=>({sp:'Yelt', scene:'b9_c2_yardnight', fx:()=>{ if (!S.f.b9_c2_counted && S.f.b9_c2_wagonsDone) { S.f.b9_c2_counted = 1; gain('b9_c2_tallystick'); } }, txt: !S.f.b9_c2_wagonsDone ?
`Yelt is at his tailboard with the lamp turned low and the ration book shut, listening to the dark. "North end," he whispers. "I heard them." He does not get up. "I am a clerk."` :
`Yelt goes down the water wagon with his lamp held up, counting, and then counts again, and then writes it in the book in his small exact hand.

"All there," he says. "Every barrel the book says." He looks at the squad. "Do you know how rare that is? In Lether?" He takes a tally-stick of pale ash out of his coat, notched along its length in the same small hand, and holds it out. "My spare. For when the book is wet. I won't need it if the Sixth is on my train." He considers. "I will need it. Take it anyway."

"Tomorrow is the last day. The Finadd will want you." He closes the book. "Go and sleep. I will sit up with the barrels. I find I like them better now."`,
      ch: S.f.b9_c2_wagonsDone ? [{t:'Back to the lines. The last day.', onward:true, fx:()=>{ S.f.b9_c2_ph = 4; }, go:()=>{ startExplore('b9_c2_last'); talk('b9_c2_last_arrive'); }},
                                  {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c2_yard_back:()=>({sp:'The supply train', scene:'b9_c2_yardnight', txt: S.f.b9_c2_wagonsDone ?
`Back along the row to the lines, past Yelt's lamp. He will want to count first.` :
`Back to the lines, with somebody at the barrels? Brennet heard them at the north end.`,
      ch: S.f.b9_c2_wagonsDone && S.f.b9_c2_counted ? [{t:'Back to the lines. The last day.', onward:true, fx:()=>{ S.f.b9_c2_ph = 4; }, go:()=>{ startExplore('b9_c2_last'); talk('b9_c2_last_arrive'); }},
                                                       {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* ======== phase 4: the last day, and the key ======== */
    b9_c2_last_arrive:()=>({sp:'The muster ground', scene:'b9_wagons', again:()=>'The muster ground on the last day, everything going onto wagons.', txt:
`The last day is loud. Everything on the muster ground that is not a soldier is going onto a wagon, and some of the soldiers are being argued with about it. The oxen are walked up from the river in files. Tents come down. The clerks shout numbers at each other across the ground, and every number goes into a book.

Far off at the head of the brigades a rider on a grey horse goes along the front of the companies at a walk, with officers round him. The Commander, somebody says. He does not stop. The companies straighten up as he passes, and slump again after.${b92Say({brennet:`\n\nBrennet watches the wagons load with the face of a man watching his own house being packed. "Fourteen's riding low on the left," he says. "The pork's all gone on one side." He does not say whose fault it is. He looks as if he knows.`, _:''})}

Finadd Ennic is at the company's tents with his slate, and the face of a man with one more order to give.`,
      ch:[{t:'The Finadd.', go:'b9_c2_ennic4'},
          {t:'Walk the ground.', go:()=>startExplore()}]}),
    b9_c2_ennic4:()=>{ const k = b92Key();
      if (k) return {sp:B5_FINADD.name, scene:'b9_wagons', txt: S.f.b9_c2_keyDone ?
`Finadd Ennic is watching the tents come down. "First light," he says. "Behind the foreigners. Get some sleep, Sergeant. The Wastes will not."` :
`Finadd Ennic looks up from his slate. "${k === 'wagons' ? 'Yelt is waiting, Sergeant. And Orla, who is worse.' : 'The drill field, Sergeant. He said he\'d be there.'}"`,
        ch:[{t:'Back to the ground.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:'b9_wagons', html:rationsHTML(), again:()=>`${b92Ennic()}, with his slate and one more order.`, txt:
`"Last day," Ennic says. "Two things want the Sixth, and the Sixth is one squad." He holds up the slate. "Yelt asks for hands to load the brigade's wagons. Honestly, he says, which I gather from Yelt means every barrel full and every sack the weight his book says, with no grain going to a quartermaster's cousin on the way." He looks at the wagons. "Most of the train will be loaded the usual way. Yelt's will not, if he has his way."

"And the Malazan sergeant sent a runner. Any squad that wants another day on the square can have one before the march, he says. He asked for the Sixth." He rubs a line off the slate. "He did not ask for anybody else. I am told that is unusual."

"Your call, Sergeant. I have written both down, so whichever you choose I was right."${b92Say({brennet:`\n\nBrennet is looking at the wagons. "Yelt's honest," he says. "Not many on this train are. Someone should stand by him."`, _:''})}${b92If('thegg', `\n\nThegg is looking at the drill field, and trying not to look as if he is.`)}${b92If('perrit', `\n\nPerrit is looking at the wagons. "Water," she says. "Out there. I did the sum."`)}`,
        ch:[{t:'"The wagons. We load with Yelt and Orla."', fx:()=>{ S.f.b9_c2_key = 'wagons'; S.f.b9_c2_ph = 5; }, go:'b9_c2_key_wagons'},
            {t:'"The square. We go back to the sergeant for more."', fx:()=>{ S.f.b9_c2_key = 'drill'; S.f.b9_c2_drilled = 1; S.f.b9_c2_ph = 5; b92L('thegg', 1); }, go:'b9_c2_key_drill'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b9_c2_key_wagons:()=>({sp:B5_FINADD.name, scene:'b9_wagons', txt:
`"The wagons," Ennic says, and writes it, and nods: the order he would have given. "Yelt will be pleased. He will not show it. Orla will show it, loudly." He looks at the drill field. "I will tell the sergeant the Sixth has gone to count barrels. He will understand. Malazans understand barrels."${b92If('brennet', `\n\nBrennet is already walking toward the train with the wagon-pin on his shoulder.`)}`,
      ch:[{t:'To the train.', go:'b9_c2_load'}]}),
    b9_c2_key_drill:()=>({sp:B5_FINADD.name, scene:'b9_wagons', txt:
`"The square," Ennic says, and writes it, and looks at the squad for a moment over the slate. "Very well. I will tell Yelt the Sixth has gone to be shouted at by foreigners. He will understand that no one understands why anybody does that."${b92If('thegg', `\n\nThegg is on his feet before the Finadd has finished, and pretending he was getting up anyway.`)}${b92If('brennet', `\n\nBrennet looks at the wagons, and then at the squad, and picks up the pin. "The wagons'll load without me," he says. "Badly. But they'll load."`)}`,
      ch:[{t:'To the drill field.', go:()=>{ startExplore('b9_c2_field'); talk('b9_c2_redrill'); }}]}),
    b9_c2_tofield:()=>({sp:'The way to the drill field', scene:'b9_wagons', txt: b92Key() === 'drill' ?
`The drill field, past the last of the tents. The Malazan sergeant is at his post in the middle of it, waiting.` :
`The drill field, past the last of the tents. Another company is on the square today, being taken apart.`,
      ch: b92Key() === 'drill' && !S.f.b9_c2_redrillDone ? [{t:'To the square.', go:()=>{ startExplore('b9_c2_field'); talk('b9_c2_redrill'); }}, {t:'Not now.', go:()=>startExplore()}] : [{t:'Back to the ground.', go:()=>startExplore()}]}),

    /* 'wagons': the loading, with Yelt and Orla */
    b9_c2_load:()=>{ const k = b92Key();
      if (k !== 'wagons') return {sp:'Yelt', scene:'b9_wagons', txt: !k ?
`Yelt is at his tailboard with the ration book and three clerks who are not as good at it as he is. "The Finadd has my request," he says. "I am waiting to see if the Sixth is honest or busy."` :
`Yelt is loading the brigade's wagons with clerks and carters who do not count as well as he does. He waves the ration book at the squad as it goes by toward the drill field. "Go and be shouted at," he says. "I will be honest without you."`,
        ch:[{t:'Back to the ground.', go:()=>startExplore()}]};
      if (S.f.b9_c2_keyDone) return {sp:'Yelt', scene:'b9_wagons', txt:
`The brigade's wagons stand loaded in their rows with the tilts roped down. Yelt sits at his tailboard with the book shut on his knee, for the first time in days, and looks at them.`,
        ch:[{t:'Back to the ground.', go:()=>startExplore()}]};
      return {sp:'Yelt and Orla', scene:'b9_wagons', html:rationsHTML(), txt:
`Yelt is at his tailboard with the book open, and Orla is beside him with her arms folded, and between them, plainly, an argument has just been won.

"A quartermaster's runner was here," Yelt says. "He suggested the brigade's water could go out three barrels light and be found again in the Wastes, by him, for a consideration." He turns a page. "Orla suggested something to him in return."${b92If('brennet', ` Brennet laughs, once, and stops.`)}

"Every barrel full," Orla says. "Every sack the weight. Lashed three high and lashed right, so it's still three high when we get there. Before the light goes." She looks at the squad. "That's the job. It's a lot of barrels."`,
        ch:[{t:'Load the brigade\'s share the long way: every barrel filled, weighed, lashed and called.', check:['might', 16], rations:true, req:()=>!S.f.b9_c2_loadTried,
              edges:id=>[id === 'brennet' && ['nine years of loading wagons that had to arrive', 2], id === 'thegg' && ['a barrel is light, if you are Thegg', 2], id === 'perrit' && ['she calls the weights faster than the clerks', 1], id === 'tobet' && ['an Indebted boy loads carts before he can read', 1], id === 'sgt' && ['you have loaded the company\'s stores onto a barge before', 1], id === 'ilsa' && ['a clerk lifts paper', -1], id === 'ruuk' && ['he would rather carry less and walk faster', -1]],
              near:{t:()=>`Yes, but the light goes before the last wagon, and ${b92Nm(b92Who())} ${b92V(b92Who(), 'finish', 'finishes')} the lashing by Orla's lantern, and ${b92V(b92Who(), 'take', 'takes')} a barrel's rim on the hand doing it. ${b92Nmc(b92Who())}'ll feel it on the road.`, fx:()=>bruise(b92Who(), bruiseN())},
              fx:()=>{ S.f.b9_c2_loadTried = 1; }, go:'b9_c2_loaded', fail:'b9_c2_loaded'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c2_loaded:()=>({sp:'Yelt and Orla', scene:'b9_wagons', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c2_loadedTrue) { S.f.b9_c2_loadedTrue = 1; S.f.b9_c2_keyDone = 1; b9Ration(2, 'the wagons loaded true'); } }, txt:
`${ROLL() && ROLL().pass === false ? 'It takes longer than it should, and two barrels go back off a wagon because the lashing was wrong and Orla says so, but' : 'It takes all the afternoon, and'} by the time the light goes the brigade's share of the train is loaded the way Yelt's book says: every barrel filled at the river and bunged and weighed, every sack the weight on its tag, lashed three high and lashed right, and each one called aloud at the tailboard and written in.

Yelt reads the last page through twice, and closes the book, and does a thing nobody on the train has seen him do. He smiles.

"The book and the wagons agree," he says. "Do you know how rare that is?" ${b9In('brennet') ? 'Brennet' : 'Orla'} says they do now.${b92If('brennet', `\n\nBrennet walks the row one last time, slapping each tailboard as he passes. "Arrive," he tells them. "That's all I ask."`)}`,
      ch:[{t:'Back to the ground.', go:()=>startExplore()}]}),

    /* 'drill': back to the Malazan sergeant for more */
    b9_c2_redrill:()=>{ if (b92Key() !== 'drill') return {sp:'The Malazan sergeant', scene:'b9_muster', txt:
`The Malazan sergeant has another company on the square today and is taking it apart.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      if (S.f.b9_c2_redrillDone) return {sp:'The Malazan sergeant', scene:'b9_muster', txt:
`The Malazan sergeant is stacking his wooden swords in the rack, one by one, counting them. "Go on," he says, without turning round. "First light. Try to stay alive out there. I've put work into you."`,
        ch:[{t:'Back to the field.', go:()=>startExplore()}]};
      return {sp:'The Malazan sergeant', scene:'b9_muster', again:()=>'The Malazan sergeant at his post, waiting.', txt:
`The Malazan sergeant is at his post with the wooden sword under his arm, and he watches the Sixth come onto the empty square with no expression at all.

"Came back," he says. "They never come back." He walks along the front of the squad. "Today is not the step. You have the step, or you have the start of it. Today is what happens when the step is not enough. When something bigger than you comes at the line and the line has to hold anyway." He signs to his heavies, and six of them come onto the square with shields and stand in a block, shoulder to shoulder. "They will lean on you. You will not move."${b92If('thegg', `\n\nThegg looks at the six heavies, and something in his face settles, like a soldier waiting a long while for the right weight to be put on him.`)}`,
        ch:[{t:'Hold the line against the heavies\' shove.', check:['might', 16], req:()=>!S.f.b9_c2_shoveTried,
              edges:id=>[id === 'thegg' && ['Tarthenal shoulders: this is what they are for', 2], id === 'brennet' && ['he has held a wagon on a hill with his back', 1], id === 'sorvan' && ['a lancer braces for the charge that hits him', 1], id === 'pessa' && ['she has held an eel-boat against a canal\'s flood', 1], S.f.b9_c2_stepOk && id === 'sgt' && ['the step: the squad leans when you lean', 1], id === 'perrit' && ['she is not built for shoving', -1], id === 'ilsa' && ['she weighs what her coat weighs', -1]],
              near:{t:()=>`Yes, but the heavies lean very hard indeed, and the line holds, and ${b92Nm(b92Who())} ${b92V(b92Who(), 'come', 'comes')} out of it with a shield rim pressed into ${b92Who() === 'sgt' ? 'your' : 'the'} collarbone and the bruise to prove it. ${b92Nmc(b92Who())}'ll feel it on the road.`, fx:()=>bruise(b92Who(), bruiseN())},
              fx:()=>{ S.f.b9_c2_shoveTried = 1; }, go:'b9_c2_redrill_done', fail:'b9_c2_redrill_done'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c2_redrill_done:()=>({sp:'The Malazan sergeant', scene:'b9_muster', fx:()=>{ if (!S.f.b9_c2_redrillDone) { S.f.b9_c2_redrillDone = 1; S.f.b9_c2_keyDone = 1; } }, txt:
`${ROLL() && ROLL().pass === false ? 'The first time, the line goes back three paces, and the heavies laugh. The second time it goes back one. The third time, as the light starts to go,' : 'The heavies lean, and lean harder, and then lean the way heavies lean when they mean it, and'} the squad's line does not move. It bends, and it creaks, and somebody in it says something to their god, and it does not move.

The sergeant signs his heavies off. He looks at the squad for a long breath, and then he says the thing the escort will hear about later from other companies, who will not believe it.

"You'll do," he says. "Out there, when it comes, and something will come, stand like that." He tucks the wooden sword under his arm. "And stand together. You lot are good at standing apart. Don't."${b92Say({thegg:`\n\nThegg is grinning, which nobody in the squad has seen him do since the river. "He said we'll do," he says, to everybody, several times, on the way back.`, _:''})}${b92If('brennet', `\n\nBrennet is rubbing his shoulder. "Wagon's easier," he says. "Wagon doesn't lean back."`)}`,
      ch:[{t:'Back to the muster ground.', go:()=>{ startExplore('b9_c2_last'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== the end: first light, out of the gate behind the foreigners ======== */
    b9_c2_onward:()=>({sp:'The road east', scene:'b9_c2_road', html:rationsHTML(), txt:
`First light, grey over the plain, and the escort forming on the road outside the landward gate company by company, with the train behind, wagon after wagon after wagon, and the oxen leaning into the yokes.

Far ahead, east, the foreigners went out before dawn, and their dust is standing up over the road in the morning light, a long low cloud that does not move off. The escort walks into it.${b92Key() === 'drill' ? ` Somewhere up in it, a Malazan sergeant of the heavies is walking with a wooden sword under his arm, and the Sixth knows the step.` : ` Behind the Sixth, the brigade's wagons roll with every barrel full, and Yelt rides on the tailboard of the first with the book on his knee.`}${b92If('brennet', `\n\nBrennet walks beside the squad, not on a wagon-seat, for the first time in nine years. He keeps looking back at the train. "They're fine," he says. "Listen to them. Fine." Then he stops looking back.`)}${b92Say({thegg:`\n\nThegg looks back once at the city, a low black line in the west with the sun coming up behind the escort onto its towers. "My mother never left Letheras," he says. "She said there was nothing out there." He turns east. "I'll tell her."`, _:''})}`,
      ch:[{t:'East, behind the foreigners.', onward:true, go:()=>chapterEnd(2, b92Key() || 'wagons')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
