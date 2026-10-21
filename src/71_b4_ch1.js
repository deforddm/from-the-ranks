/* ============ Book Four, Chapter 1: The Muster ============ */
/* Aren, two days before the march (House of Chains, ch 8). The Adjunct reviews a Fourteenth in disorder on the marshaling ground; the
   squad stands in the 9th Legion's line across the ground and sees a flash in the 8th's ranks and hears it, and a small boy walk out with
   a bone, from the far end of the ground. The afternoon in the streets on Captain Hollet's errand (the relic market, the Red Blades' drink sweep,
   the Crow ships at the quay, durhang runners at the 9th's barracks gate). Night in the barracks yard and over the wall in the old
   cemetery, where relic thieves are digging the Chain's corner. The Adjunct's order comes down: every soldier wears a finger bone, the
   same way. Key (S.f.b4_c1_key = S.f.b4_bone): 'grave' (a bone from the old graves like the rest of the Fourteenth; the company takes
   the squad in, Nerve +2; the second night guarding the diggers) or 'chain' (the bone tied with something of the Chain's dead; set apart,
   Nerve −1, Haddat, Marrow and Sathi +1; Radde writes it down; the second night the Red Blades' sweep turns into a brawl in the yard).
   The trick: the Gate Drill (Darrut's old sergeant at the gate). Notes for later chapters: docs/hoc-ch1-notes.md. */
/* FOR THE ARTIST (71b): names this file uses.
   Items: ART['item/b4_c1_finger'], ['item/b4_c1_relic'], ['item/b4_c1_redsash'], ['item/b4_c1_durhangpipe'].
   Figures: b4_c1_thief (relic thieves, the bone-broker, the sexton), b4_c1_tough (hired toughs, the ringleader), b4_c1_runner (durhang
   runners), b4_c1_hollet, b4_c1_radde, b4_c1_recruit (the raw Quon recruits, the brawlers). Reused: blistig, redblade, aren_guard,
   b2soldier, hissari_m, wickan, warlock. Backdrops (SCENEX): b4_aren_yard (70's, redrawn), b4_c1_review, b4_c1_market, b4_c1_graveyard,
   b4_c1_quay. Ground (TILEX): b4_c1_aren, b4_c1_graves, b4_c1_barracks. */

/* ---- small helpers (b41: Book Four, Chapter One) ---- */
/* loyalty only for a squadmate who is here */
const b41L = (id, n) => { if (b4In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b41Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b4In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* the recruit who walks with the squad (one at a time), and a line for them */
const b41Rec = () => b4In('redblade') ? 'redblade' : b4In('warlock') ? 'warlock' : null;
const b41R = m => { const r = b41Rec(), v = r && m[r]; return v ? (typeof v === 'function' ? v() : v) : ''; };
/* Hackle is with the squad: at Sathi's knee, or at the sergeant's if the whistle brought him home in Book Two */
const b41Dog = () => b4In('sathi') || (!!b4Was('b2_hackleBack') && !(S.dead && S.dead.hackle));
/* the Fourteenth's new soldiers in the squad (the fill), and who came off the Chain */
const b41New = () => HOC_NEW.filter(id => b4In(id));
const b41Vets = () => HOC_CORE.filter(id => b4In(id));
/* someone in the squad is wearing a thing; take a thing out of the kit */
const b41Worn = it => SQUAD().some(w => Object.values((S.gear && S.gear[w]) || {}).includes(it));
const b41Drop = it => { S.kit = (S.kit || []).filter(x => x !== it); Object.values(S.gear || {}).forEach(g => Object.keys(g || {}).forEach(k => { if (g[k] === it) delete g[k]; })); };
/* the phase of the chapter: 1 the day, 2 the first night, 3 the second night, 4 dawn */
const b41Ph = () => S.f.b4_c1_ph || 1;
/* the key fight is behind the squad */
const b41Done = () => !!(S.f.b4_c1_watchDone || S.f.b4_c1_brawlDone);
/* the Book Two road the squad came in on, if it came across */
const b41Guard = () => b4Was('b2_c7_key') === 'guard';
const b41Wickans = () => b4Was('b2_c7_key') === 'wickans';
/* the Chain token on a 'chain' bone, in words */
const b41Token = () => ({thread:b4In('haddat') ? 'a twist of Haddat\'s blue thread' : 'a twist of blue Hissari thread', string:b4In('marrow') ? 'a knot off Marrow\'s string' : 'a knot of string', feather:'a crow feather from the pilgrims\' road', keepsake:'a keepsake from the Chain'})[S.f.b4_c1_token] || 'something of the Chain\'s';

/* Book Two's b2_nobles7 (the squad stood behind Duiker against Pullyk Alar at Balahn) is not among the flags the transfer keeps (70's
   B4_KEEP); this chapter reads it for one line, so the transfer copies it too. Guarded: a fresh start and Books One to Three are untouched. */
{ const _imp = b4Import;
  b4Import = function(id){ const r = _imp(id); if (r) { const o = loadSlot(id), v = o && o.f && o.f.b2_nobles7; if (v != null) r.f.b2_nobles7 = v; } return r; }; }

/* ---- the Gate Drill: the Aren Guard's gate drill, from Darrut's old sergeant at the 9th's barracks gate. Not sorcery. ---- */
Object.assign(TRICKS, {
  b4_c1_gate:{name:'The Gate Drill', ch:1, use:'fight', ab:'t_b4_c1_gate', where:'the 9th\'s barracks gate in Aren, with an old sergeant of the Aren Guard',
    lore:'Three shields across a gate, rims locked, the middle one a half step back so anything that comes through comes through into a pocket. The Aren Guard drilled it every dawn for a hundred years and used it twice. The old sergeant at the 9th\'s gate says twice was enough.',
    get fx(){ return `Once a fight: the bearer calls the gate, and the bearer and every squadmate beside them lock shields: +${2 + (S && S.lvl >= 11 ? 1 : 0)} armour, and an enemy standing next to any of them cannot take a step until the bearer's next turn. It can still swing. Not sorcery: it never sputters.`; }},
});
const b41GateOn = t => !!(B && B.b4gate && B.b4gate.u.hp > 0 && t && t.side === 'p' && !t.ally && t.hp > 0 && (t === B.b4gate.u || cheb(t, B.b4gate.u) === 1));
Object.assign(AB, {
  t_b4_c1_gate:{name:TRICKS.b4_c1_gate.name, trick:'b4_c1_gate', self:true, desc:()=>TRICKS.b4_c1_gate.fx,
    run(u){ B.b4gate = {u, turn:B.turn}; AUDIO.play('sword'); shakeMap();
      const in_ = party().filter(p => b41GateOn(p)); in_.forEach(p => { float(p, 'the gate', '#d8b878'); sparks(p.x, p.y, 8, '#d8b878', .4); });
      blog(`${u.name}: "Gate!" The Aren Guard's call. ${in_.length > 1 ? `${in_.filter(p => p !== u).map(p => p.name).join(' and ')} lock${in_.length > 2 ? '' : 's'} in, rims together, the middle a half step back.` : 'One shield across the gap. It will have to be enough.'}`); }},
});
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o);
    if (b4On() && b41GateOn(t)) c.ac += 2 + (S.lvl >= 11 ? 1 : 0);
    if (b4On() && a && a.id === 'redblade' && a.side === 'p' && !a.ally && Object.values((S.gear && S.gear.redblade) || {}).includes('b4_c1_redsash')) c.bonus += 1; // the sash means more to Ramin
    return c; }; }
{ const _ai = ai;
  ai = async function(u, turnId){
    if (b4On() && B && B.b4gate && u && u.side === 'e' && u.hp > 0 && party().some(p => b41GateOn(p) && cheb(p, u) === 1) && u.rising !== B.turn) {
      u.rising = B.turn; float(u, 'held at the gate', '#d8b878'); blog(`${u.name} pushes at the locked shields and cannot get past.`); }
    return _ai(u, turnId); }; }
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); if (b4On() && B && B.b4gate && B.b4gate.u === u) B.b4gate = null; return r; }; }

/* ---- the finger bone: whoever wears it starts a fight steady (+2 to the first blow) while the company holds its nerve (5 or more) ---- */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt); if (!b4On() || !B || !B.units) return r;
    if (b4NerveNow() >= 5) { const w = B.units.find(u => u.side === 'p' && !u.ally && Object.values((S.gear && S.gear[u.id]) || {}).includes('b4_c1_finger'));
      if (w) { w.steady = true; blog(`${w.name} touches the bone on its thong. The company is watching, and ${w.name} is steady.`); } }
    return r; }; }

/* ---- the durhang pipe: once a chapter, at a fire, passed round: the rattled settle and the sore stop feeling it. Later chapters may
   offer it with b4PipeChoice(back) among a fire's choices. ---- */
function b4PipeChoice(back){ return {t:'Pass the confiscated pipe round. Once.', tag:'the durhang pipe', req:()=>b4On() && (S.kit || []).includes('b4_c1_durhangpipe') && !S.f['b4_pipe' + (S.chapter || 0)],
  fx:()=>{ S.f['b4_pipe' + (S.chapter || 0)] = 1; S.rattled = {}; S.bruised = {}; note('The rattled settle, and the sore stop feeling it. For tonight.', 'good'); b41L('marrow', -1); }, go:back}; }

/* ---- the words this chapter adds to Book Four's glossary ---- */
GLOSSX.hoc.push(
  [1, 'The Second Company', 'The 9th Legion\'s Second Company, the squad\'s company in the Fourteenth: Captain Hollet, who kept a garrison\'s books before this, and Sergeant Radde, who keeps the company\'s.', ()=>!!(S.f && S.f.b4_company)],
  [1, 'The relic sellers', 'Aren\'s markets sell pieces of the Chain: feathers, braids, buttons, and fingers said to be Coltaine\'s. The Third does not believe the fingers. Everybody in the Third has seen someone buy one.', ()=>!!(S.f && S.f.b4_c1_relic)]);

/* ---- the reading at the first halt: the barracks yard at night, the first night of the two ---- */
B4DECK[1] = {scene:'b4_aren_yard', where:'an upturned water crate in the barracks yard', set:'Night in Aren, two days before the march, and a yard full of recruits who cannot sleep because of a boy with a bone.',
  back:'b4_c1_yard', backT:'Back to the fire.',
  say:{marrow:`"A new army," she says. "I read for the old one from Hissar to these walls." She shuffles without looking. "Sit, child. One card, for a road we have walked once already, the wrong way."`,
    tallow:`"My grandmother read for the boats the night before they went out," he says. "I don't know if it's the same for armies." He shuffles badly and drops one, and puts it back without looking at it. "One card, Sergeant?"`,
    oldninth:`"Third squad," the old soldier says. "The Chain lot. Sit, then. Rum after, if you've any." He shuffles one-handed. "One card. The Deck's kinder to them that's already paid."`}};

const B4CH1 = {
  title:'The Muster', number:'One',
  intro:{loc:'Aren', sub:'The marshaling ground · two days before the march', scene:'b4_c1_review', cap:'Three legions on a dust plain under the walls, in lines that do not stay straight, and far across it a few riders under a standard.',
    paras:[
`Aren has been looking at soldiers all year. It watched the Chain come in under its walls, and what was left of it come in through the north gate, and it watched the High Fist march out the other way. Now the Empress has sent it an army by sea, and the city has gone up on its roofs to look at that one too.`,
()=>{ const v = b41Vets().map(id => TPL[id].name), n = b41New(), fill = {tallow:'a fishing boy off the Quon transports called Tallow', hessa:'a woman out of Kartool called Hessa, who stood a temple door for six years and does not say why she stopped', tebbet:'a Dal Honese bowman called Tebbet', darrut:'Darrut, one of the Aren Guard who followed Blistig into the 9th'};
  return `You are Sergeant {sgt}, Third squad, 9th Legion, the Fourteenth Army. The army broke the Chain's survivors up when it took them in and dealt them out across its three legions like cards, so the recruits would have somebody to copy. You were dealt to Blistig's 9th, to its Second Company. ${v.length ? `${b4And(v)} came off the Chain with you and were dealt with you.` : 'Nobody else from the Chain was dealt with you.'} ${n.length ? `The Fourteenth made the squad up to five with ${b4And(n.map(id => fill[id]))}.` : 'The Fourteenth looked at the squad, counted it, and left it as it was.'}`; },
`This morning the Adjunct is reviewing her army on the marshaling ground. Half of it came off the transports from Quon Tali a month ago and has never heard a sword drawn in anger. The other half is trying not to show it. The 9th is drawn up on the far side of the ground from the Adjunct, which Radde, the company's sergeant, says is the best place in any army to be.`],
    go:'Into the line', node:'b4_c1_start'},

  areas:[
    /* 16 x 12 (b4_c1_aren, day).  , the marshaling ground's dust  . paving  # wall  c a munitions cart  w a well  = the officers' awning  > east, into the streets */
    { id:'b4_c1_line', title:'Aren · the marshaling ground', sub:'Late morning · the 9th falling out', hint:'Tap ground to move · tap a figure to talk · the streets are east', decor:'b4_c1_aren',
      map:[ "################",
            "#,,,,,,,,,,,,,,#",
            "#,,,,,,,,,,,,,,#",
            "#,,,,,,,,,,,,,,#",
            "#..............#",
            "#..c.......w...#",
            "#..............>",
            "#.....,........#",
            "#..=...........#",
            "#..=.....,.....#",
            "#..............#",
            "################" ],
      walk:'.,', triggers:{c:'b4_c1_cart', w:'b4_c1_well', '>':'b4_c1_to_streets'}, start:{x:4, y:7},
      quest:()=> !S.f.b4_c1_errand ? 'Captain Hollet, by the officers\' awning.' : 'East into the streets: the quay stores, before the gates shut at dusk.',
      npcs:[
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:5, y:8, node:()=>S.f.b4_c1_errand ? 'b4_c1_hollet_again' : 'b4_c1_hollet', fresh:()=>!S.f.b4_c1_errand},
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:7, y:6, node:()=>S.f.b4_c1_radde ? 'b4_c1_radde_again' : 'b4_c1_radde', fresh:()=>!S.f.b4_c1_radde},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:10, y:8, node:()=>S.f.b4_c1_drill ? 'b4_c1_recruits_again' : 'b4_c1_recruits', fresh:()=>!S.f.b4_c1_drill},
        {id:'recruit2', name:'A recruit', kind:'b4_c1_recruit', x:11, y:9, node:()=>S.f.b4_c1_drill ? 'b4_c1_recruits_again' : 'b4_c1_recruits'},
        {id:'blistig', name:'Fist Blistig', kind:'blistig', x:12, y:2, node:()=>'b4_c1_blistig', fresh:()=>!S.f.b4_c1_blistigHeard},
        {id:'officer', name:'An officer of the 9th', kind:'b2soldier', x:13, y:3, node:()=>'b4_c1_blistig'} ] },

    /* 16 x 12 (b4_c1_aren, afternoon).  . paving  , sand blown in  # wall  = awning  s the relic stall  c cart  w well  D the 9th's barracks gate
       < west, back to the marshaling ground  > east, to the quay */
    { id:'b4_c1_streets', title:'Aren · the harbour streets', sub:'Afternoon · the gates shut at dusk', hint:'Tap ground to move · tap a figure to talk · the quay is east, the 9th\'s gate is south', decor:'b4_c1_aren',
      map:[ "################",
            "#==..s..=.=..==#",
            "#..............#",
            "<.............,>",
            "#..c....w......#",
            "#..............#",
            "#.=.=..,....=..#",
            "#..............#",
            "#.,....c.......#",
            "#..............#",
            "#....##D##.....#",
            "################" ],
      walk:'.,', triggers:{s:'b4_c1_stall', D:'b4_c1_gate', '>':'b4_c1_to_quay', '<':'b4_c1_back_line'}, start:{x:1, y:3},
      quest:()=> !S.f.b4_c1_water ? 'The quay stores, east, for the company\'s water.' : !S.f.b4_c1_runnersDone ? 'The 9th\'s barracks gate, south. Something is going on at it.' : 'The 9th\'s gate, and in before dusk.',
      npcs:[
        {id:'seller', name:'A relic seller', kind:'hissari_m', x:5, y:2, node:()=>'b4_c1_stall', show:()=>S.f.b4_c1_relic !== 'broken', fresh:()=>!S.f.b4_c1_relic},
        {id:'redblades', name:'Red Blades', kind:'redblade', x:10, y:5, node:()=>S.f.b4_c1_sweep ? 'b4_c1_sweep_again' : 'b4_c1_sweep', fresh:()=>!S.f.b4_c1_sweep},
        {id:'runners', name:'Men at the gate', kind:'b4_c1_runner', x:7, y:9, node:()=>'b4_c1_gate', show:()=>!S.f.b4_c1_runnersDone, fresh:()=>!!S.f.b4_c1_water && !S.f.b4_c1_runnersDone},
        {id:'gatesgt', name:'The gate sergeant', kind:'aren_guard', x:9, y:9, node:()=>'b4_c1_oldguard', show:()=>!!S.f.b4_c1_runnersDone, fresh:()=>!!S.f.b4_c1_runnersDone && !S.f.b4_c1_gateTried} ] },

    /* 16 x 12 (b4_c1_barracks, night).  . flagstones  , grit  # the yard wall  = barrack roofs  b a bunk-house door  F the Third's fire  ^ over the wall, to the old cemetery */
    { id:'b4_c1_barracks', title:'Aren · the 9th\'s barracks', sub:'Night · confined to barracks', hint:'Tap ground to move · tap a figure to talk · the fire is the Third\'s; the wall is north', decor:'b4_c1_barracks', dark:true,
      map:[ "######^^########",
            "#.....,,.......#",
            "#.===.....====.#",
            "#.=b=.....=b==.#",
            "#.......F......#",
            "#..............#",
            "#.===......===.#",
            "#.=b=......=b=.#",
            "#..............#",
            "#...,......,...#",
            "#..............#",
            "################" ],
      walk:'.,', triggers:{F:'b4_c1_yard', b:'b4_c1_bunk', '^':'b4_c1_wall'}, start:{x:7, y:10},
      quest:()=> b41Done() ? 'Sleep, if anyone can. The march is at dawn.' : b41Ph() >= 3 ? (S.f.b4_c1_key === 'grave' ? 'Over the wall with the dig detail, when the squad is ready.' : 'The fire. The yard is getting loud.') : !S.f.b4_c1_digDone ? 'Half the company is over the wall in the old cemetery. The wall is north.' : 'The fire.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:5, y:5, node:()=>b41Ph() >= 3 ? 'b4_c1_radde_n2' : 'b4_c1_radde_night', fresh:()=>b41Ph() < 3 ? !S.f.b4_c1_raddeNight : !S.f.b4_c1_raddeN2},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:10, y:5, node:()=>'b4_c1_hollet_night', fresh:()=>!S.f.b4_c1_holletNight},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:9, y:8, node:()=>'b4_c1_recruits_night', fresh:()=>!S.f.b4_c1_recNight},
        {id:'oldninth', name:'An old soldier of the 9th', kind:'b2soldier', x:13, y:9, node:()=>'b4_c1_oldsoldier', fresh:()=>!S.f.b4_c1_oldsoldier} ] },

    /* 16 x 12 (b4_c1_graves, night).  . earth  , dug earth  # tomb walls  o open graves  x dead trees  F lanterns  v south, back over the wall */
    { id:'b4_c1_cemetery', title:'Aren · the old cemetery', sub:'Night · lanterns among the graves', hint:'Tap ground to move · tap a figure to talk · the Chain\'s corner is north-east; the barracks wall is south', decor:'b4_c1_graves', dark:true,
      map:[ "################",
            "#,..x..#..o.,.F#",
            "#..o...#..,..o.#",
            "#.,....##....,.#",
            "#..o,.....x....#",
            "#.F....o...o,..#",
            "#...,.....,....#",
            "#.o..##..o...x.#",
            "#....#,....,...#",
            "#.,......F..o..#",
            "#..............#",
            "#######vv#######" ],
      walk:'.,', triggers:{F:'b4_c1_lantern', v:'b4_c1_cem_back'}, start:{x:7, y:10},
      quest:()=> b41Ph() >= 3 ? (S.f.b4_c1_watchDone ? 'Back over the wall. The march is at dawn.' : 'The dig detail, in the Chain\'s corner.') : !S.f.b4_c1_digDone ? 'The Chain\'s corner, north-east. There are men digging there who should not be.' : !S.f.b4_c1_key ? 'The Chain\'s corner. Radde is waiting for an answer.' : 'Back over the wall.',
      npcs:[
        {id:'thieves', name:'Men with spades', kind:'b4_c1_thief', x:12, y:3, node:()=>'b4_c1_chaincorner', show:()=>!S.f.b4_c1_digDone, fresh:()=>!S.f.b4_c1_digDone},
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:12, y:3, node:()=>'b4_c1_key', show:()=>!!S.f.b4_c1_digDone && !S.f.b4_c1_key, fresh:()=>!!S.f.b4_c1_digDone && !S.f.b4_c1_key},
        {id:'tenth', name:'A squad of the 10th', kind:'b2soldier', x:4, y:6, node:()=>'b4_c1_tenth', show:()=>b41Ph() < 3, fresh:()=>!S.f.b4_c1_tenth},
        {id:'detail', name:'The company\'s dig detail', kind:'b2soldier', x:11, y:4, node:()=>'b4_c1_watch_go', show:()=>b41Ph() >= 3 && S.f.b4_c1_key === 'grave' && !S.f.b4_c1_watchDone, fresh:()=>b41Ph() >= 3 && !S.f.b4_c1_watchDone} ] } ],

  battles:{
    /* the 9th's barracks gate: durhang runners passing pipes through the bars to recruits who have just had their drink taken; with the company */
    b4_c1_runners:{title:'The 9th\'s gate', style:'b4_c1_aren', open:true, warrenText:'Aren · the warrens are thin here, but they answer', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:["##.##.##","........",".t....t.","........","..,..,..","........","...tt...","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c1_pipeman',3,1],['b4_c1_runner',2,2],['b4_c1_runner',5,2],['b4_c1_slinger',2,0],['b4_c1_tough',5,3]], xp:130, after:'b4_c1_runners_after',
      waves:[{round:3, foes:[['b4_c1_runner',7,4]], text:'Another comes down off a roof behind the cart with a cudgel, late, and shouting for his share.'}],
      preText:()=>`Tangle's smoker goes off against the gate bars, and the runners on the far side of the smoke stop being a trade and start being a crowd of coughing men who cannot see who is coming.`},
    /* the old cemetery at night: relic thieves digging the Chain's corner, with their hired toughs; the second ground is the bone-pits */
    b4_c1_dig:{title:'The Chain\'s corner', style:'b4_c1_graves', dark:true, open:true, warrenText:'Night among the graves · the warren is quiet here, and listening', warren:{meanas:1, denul:1}, music:'battle',
      map:["#..o..o.","........",".x....t.","...,....","..o..,..","........",".,...o..","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c1_tough',2,1],['b4_c1_thief',5,1],['b4_c1_digger',4,3],['b4_c1_xbow',7,0]], xp:160, after:'b4_c1_dig_after',
      waves:[{round:2, foes:[['b4_c1_tough',0,5]], text:'A big man comes over a tomb wall at the side with a mattock, the one who was keeping watch and was not.'}],
      preText:()=>`Tangle's burner goes into the open grave they were standing round, and the lanterns are suddenly not the brightest thing in the cemetery. The men by the grave come up out of the light blinking, with spades in their hands, and one of them drops a sack, and it rattles.`,
      stage2:{title:'The bone-pits', xp:80,
        text:()=>`They break, and run the way they came: back between the old tombs into the hollow under the cemetery's north wall, where the city's poor were put in pits a long time before anybody thought to give them stones. There are lanterns down there, and sacks, and a man in a good coat sorting what is in the sacks onto a cloth by size.\n\n${b41Say({haddat:`Haddat sees the cloth, and what is on it, and her shield comes up without her seeming to lift it. "No," she says in Hissari, very quietly.`, marrow:`Marrow sees the cloth and stops walking. "Child," she says, to nobody, and then she starts walking again, faster.`, _:`What is on the cloth does not need a name.`})}`,
        map:["##....##","#..tt..#","#......#","#.o..o.#","#......#","#..,...#","#.o..o.#","#......#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c1_broker',3,2],['b4_c1_tough',1,2],['b4_c1_thief',6,2],['b4_c1_xbow',4,0]]} },
    /* 'grave': the second night, guarding the company's dig detail at the old graves; the thieves come back, and the sexton who sold them the gate key */
    b4_c1_watch:{title:'The dig detail', style:'b4_c1_graves', dark:true, open:true, warrenText:'Night among the graves · the second night', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8]], n:1},
      map:["#.o..o.#","........",".x....t.","........","..o..,..","........",".,...o..","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c1_tough',1,1],['b4_c1_tough',6,1],['b4_c1_thief',3,2],['b4_c1_xbow',4,0]], xp:160, after:'b4_c1_watch_after',
      waves:[{round:2, foes:[['b4_c1_digger',0,4],['b4_c1_thief',7,4]], text:'Two more come in from the sides, low, for the diggers\' tools and the sacks of bones the company has already lifted.'}],
      preText:()=>`Tangle's burner goes up the path between the tombs, and the path is suddenly full of men lit orange who had been walking very quietly.`,
      stage2:{title:'The sexton\'s gate', xp:80,
        text:()=>`The ones on the path go back the way they came, and the squad goes after them, to the cemetery's landward gate. It is open. It was locked at dusk; Radde saw to it.\n\nThere is a man standing in it with the key on a ring at his belt, and an old lantern, and the long iron-shod staff the city gives its grave-keepers. He has been keeping this cemetery for twenty years, by the look of him, and selling it for at least one.${b41Say({darrut:`\n\n"The sexton," Darrut says. "I've drunk with him." He does not say it as if it helped.`, _:''})}`,
        map:["##.##.##","#......#","#..tt..#","#......#","#.o..o.#","#......#","#......#","#..,...#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c1_sexton',3,1],['b4_c1_tough',1,3],['b4_c1_tough',6,3],['b4_c1_xbow',5,0]]} },
    /* 'chain': the second night, the Red Blades' sweep turned ugly. Recruits who want their drink back turn on the "Chain dogs". Fists and staves. */
    b4_c1_brawl:{title:'The barracks yard', style:'b4_c1_barracks', dark:true, open:true, warrenText:'Night · nobody is using a warren for this', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Fists and staves, nobody killed. Keep them off the Third for four rounds, until Radde brings the provosts.'},
      map:["##.##.##","........","..t..t..","........","........","...,....","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c1_brawler',1,2],['b4_c1_brawler',6,2],['b4_c1_brawler',3,1],['b4_c1_staff',5,0]], xp:160, after:'b4_c1_brawl_after',
      waves:[{round:2, foes:[['b4_c1_brawler',7,4]], text:'Another comes out of a bunk-house at the shouting, half dressed, and picks a side, and it is not the Third\'s.'}],
      preText:()=>`Tangle's smoker goes off in the middle of the yard, and the yard is suddenly full of coughing recruits who cannot see whom they meant to hit.`,
      stage2:{title:'The bunk-house door', xp:80,
        text:()=>`Radde comes across the yard with a lantern and two provosts, and the recruits who see him stop. Most of them.\n\nThe ones who don't go back into the end bunk-house and hold the door, and the man holding it is not a recruit. He is a regular of the 10th with a broken nose and a cask of the Red Blades' arrack under his bunk, and he has been telling the boys all night who told the Red Blades where to look.\n\n"Quietly," Radde says to the squad. "I want him able to march."`,
        map:["##....##","#......#","#..t...#","#......#","#......#","#..,...#","#......#","#......#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c1_ringleader',3,1],['b4_c1_brawler',1,3],['b4_c1_brawler',6,3],['b4_c1_staff',4,2]]} } },

  foes:{
    /* durhang runners: harbour boys and their minders, who sell the soldiers what the Red Blades took */
    b4_c1_runner:{name:'Durhang runner', sig:'r', kind:'b4_c1_runner', hp:10, ac:12, atk:3, dmg:[1,6,1], rng:1, mv:5, init:3, sk:['hitrun'], verb:'goes in low with a knife at'},
    b4_c1_slinger:{name:'Runner with a sling', sig:'g', kind:'b4_c1_runner', hp:8, ac:11, atk:3, dmg:[1,6,0], rng:5, mv:4, init:2, sk:['pin'], verb:'slings a stone at'},
    b4_c1_pipeman:{name:'The pipe-man', sig:'P', kind:'b4_c1_runner', hp:20, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'swings a weighted cosh at'},
    /* hired toughs out of the harbour, the thieves' muscle */
    b4_c1_tough:{name:'Hired tough', sig:'t', kind:'b4_c1_tough', hp:13, ac:12, atk:4, dmg:[1,8,0], rng:1, mv:4, init:1, sk:['shove'], verb:'brings a club round on'},
    b4_c1_xbow:{name:'Tough with a crossbow', sig:'x', kind:'b4_c1_tough', hp:8, ac:12, atk:3, dmg:[1,8,0], rng:5, mv:3, init:2, sk:['pin'], verb:'shoots at'},
    /* the relic thieves: grave-robbers who sell the Chain to the markets */
    b4_c1_thief:{name:'Relic thief', sig:'h', kind:'b4_c1_thief', hp:10, ac:12, atk:3, dmg:[1,6,1], rng:1, mv:5, init:2, sk:['bleed'], verb:'slashes with a knife at'},
    b4_c1_digger:{name:'Grave-digger with a spade', sig:'d', kind:'b4_c1_thief', hp:12, ac:11, atk:3, dmg:[1,8,0], rng:1, mv:4, init:1, verb:'swings a spade edge-on at'},
    b4_c1_broker:{name:'The bone-broker', sig:'B', kind:'b4_c1_thief', hp:24, ac:13, atk:5, dmg:[1,10,1], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'cuts with a long knife at'},
    b4_c1_sexton:{name:'The sexton', sig:'S', kind:'b4_c1_thief', hp:24, ac:13, atk:5, dmg:[1,10,1], rng:1, mv:3, init:1, boss:true, sk:['shove'], verb:'brings an iron-shod staff down on'},
    /* the brawl: recruits of the 9th and 10th who had their drink taken, and want somebody to blame */
    b4_c1_brawler:{name:'Angry recruit', sig:'a', kind:'b4_c1_recruit', hp:11, ac:11, atk:3, dmg:[1,6,0], rng:1, mv:4, init:1, verb:'swings a fist at'},
    b4_c1_staff:{name:'Recruit with a spear-butt', sig:'s', kind:'b4_c1_recruit', hp:11, ac:12, atk:3, dmg:[1,6,1], rng:1, mv:4, init:1, sk:['shove'], verb:'jabs a spear-butt at'},
    b4_c1_ringleader:{name:'The ringleader', sig:'L', kind:'b4_c1_tough', hp:22, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, boss:true, sk:['rally', 'shove'], verb:'brings a bunk-leg down on'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b4_c1_finger:{name:'A finger bone on a thong', slot:'trinket', who:null, line:'A finger bone, small and very white, drilled and tied on a leather thong the way the Adjunct\'s order says: the same way, every soldier, so nobody can say whose idea it was. Whoever wears it starts every fight steady while the company holds its nerve (Nerve 5 or more).'},
    b4_c1_relic:{name:'"Coltaine\'s finger"', slot:'trinket', who:['sgt', 'sathi', 'tangle', 'marrow', 'tallow', 'hessa', 'tebbet', 'darrut', 'orvas', 'redblade', 'warlock'], stat:{guile:1},
      line:'A dried finger in a glass phial with a wax seal and a scrap of red cloth tied round the neck. The seller swore it was Coltaine\'s. It is a dog\'s toe, Marrow says, or a goat\'s. Whoever carries it is a little better at lying, which says something. Haddat will not touch it.'},
    b4_c1_redsash:{name:'A Red Blade\'s cast-off sash', slot:'trinket', who:null, ac:1, line:'A red silk sash, frayed at one end where somebody cut a badge off it. A Red Blade threw it down in the street. On anyone it is a little armour, and a statement. On Ramin it is more than that: he hits +1 wearing it.'},
    b4_c1_durhangpipe:{name:'A confiscated durhang pipe', slot:'trinket', who:null, line:'A short clay pipe with a brass bowl-cap, still smelling of the resin. Once a chapter, at a fire, it can be passed round: the rattled settle and the sore stop feeling it. Marrow disapproves. The quartermaster\'s clerk would buy it.'} },

  scenes:{
    b4_c1_review:{loc:'Aren', sub:'The marshaling ground · the review', cap:'Three legions on a dust plain under the walls, lines that will not stay straight, and far across the ground a few riders under a standard.', amb:'explore'},
    b4_c1_market:{loc:'Aren', sub:'The relic market · afternoon', cap:'Awnings over the harbour street, and under one of them a cloth laid out with feathers, braids, buttons and small glass phials, and a man calling the Chain\'s name.', amb:'explore'},
    b4_c1_quay:{loc:'Aren', sub:'The quay · afternoon', cap:'Three ships warped in against the quay, and horses coming down the gangplanks with their eyes covered, and dogs, and riders in black.', amb:'explore'},
    b4_c1_graveyard:{loc:'Aren', sub:'The old cemetery · night', cap:'Old tombs going black, lanterns among them, open earth everywhere, and soldiers on their knees in it.', amb:'explore'} },

  end:{
    grave:['The old graves', 'The Adjunct reviewed her army, and something went off in the 8th\'s ranks, and a small boy walked out with a bone. That night the Fourteenth went over the cemetery walls for bones of its own, and the Adjunct made it an order. The Third took its bones from the old graves like everybody else, and the next night stood over the company\'s diggers while the thieves came back. The Second Company has stopped calling the squad "the Chain lot". It calls it the Third now, which is worse, and better.'],
    chain:['The Chain\'s bones', 'The Adjunct reviewed her army, and something went off in the 8th\'s ranks, and a small boy walked out with a bone. That night the Fourteenth went over the cemetery walls for bones of its own, and the Adjunct made it an order. The Third wear their bones the way the order says, and tied to every one of them is something of the Chain\'s dead. Radde wrote it in his book. The company noticed, and the next night some of it said so with its fists.'] },
  endScene:'b4_march',
  endCap:()=> S.f.b4_c1_key === 'grave' ? 'Dawn over Aren. The Fourteenth forms on the Aren Way in the grey light, a finger bone on every neck, and somewhere ahead of the column the Adjunct, too far off to see.' : 'Dawn over Aren. The Fourteenth forms on the Aren Way in the grey light, a finger bone on every neck, and on the Third\'s, something else tied on with it.',
  tease:'Next: the Aren Way. A day north, past the empty trees, to the hill where the Chain ended.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b4_c1_key === 'grave') x.push('The Third took their bones from the old graves, like the rest of the Fourteenth. The Second Company has started saving the squad a place at the cook-fire.');
    if (f.b4_c1_key === 'chain') x.push(`The Third wear the Adjunct's bone with ${b41Token()} tied to it. Radde wrote it in his book. Some of the company will not forget the brawl in the yard.`);
    if (f.b4_c1_relic === 'bought') x.push(f.b4_c1_relicBuried ? 'The squad bought "Coltaine\'s finger" off a stall in the harbour market, and buried it in the Chain\'s corner. It was a goat\'s, probably. It was buried properly anyway.' : 'The squad bought "Coltaine\'s finger" off a stall in the harbour market, to bury it. It is still in the kit.');
    if (f.b4_c1_relic === 'broken') x.push('The squad broke a relic stall in the harbour market. The Red Blades saw. So did half of Aren.');
    if (f.b4_c1_relic === 'left') x.push('The squad walked past a stall selling Coltaine\'s finger. Haddat has not quite forgiven it.');
    if (f.b4_raminDone === 1) x.push('Ramin walks with the squad again, a Red Blade lent once more. He has a horse this time. He leaves it with the company.');
    else if (f.b4_raminDone === 2) x.push('Ramin rides with the Red Blades, near. He will come if he is asked.');
    if (f.b4_kethDone === 1) x.push('Keth walks with the squad again, and the old woman in him has opinions about the 9th.');
    else if (f.b4_kethDone === 2) x.push('Keth is with Temul\'s youths, near. He will come if he is asked.');
    if (f.b4_c1_drill === 'clean' || f.b4_c1_drill === 'ok') x.push('The Second Company\'s recruits can lock shields now, after a fashion. They learned it from the Chain lot.');
    if (f.b4_c1_runnersDone) x.push('Durhang runners at the 9th\'s gate went away with less than they came with.');
    if (f.b4_c1_sexton) x.push('The cemetery\'s sexton had been selling the Chain\'s corner. He will not be keeping the gate any more.');
    if (f.b4_c1_cartSharper) x.push('A wagon guard of the 8th is a sharper short, and has the sergeant\'s name.');
    return x; },

  journal:()=>{ const f = S.f; return [
    b41Done() && (f.b4_c1_key === 'grave' ? 'The second night the squad stood over the company\'s diggers in the old cemetery. The thieves came back with the sexton\'s key. They did not get the bones.' : 'The second night the recruits whose drink the Red Blades took came for the "Chain dogs" in the yard. No one died. Radde wrote that down too.'),
    f.b4_c1_key && (f.b4_c1_key === 'grave' ? 'The Adjunct ordered every soldier to wear a finger bone, the same way. The Third took theirs from the old graves.' : `The Adjunct ordered every soldier to wear a finger bone, the same way. The Third tied ${b41Token()} to theirs, and Radde wrote it in his book.`),
    f.b4_c1_digDone && 'Relic thieves were digging the Chain\'s corner of the old cemetery, by night, for the markets. The squad stopped them, and found the cloth.',
    f.b4_c1_runnersDone && 'Durhang runners came to the 9th\'s barracks gate the day the Red Blades took the drink. The squad and the company sent them off.',
    f.b4_c1_quay && 'Three ships came into Aren with three hundred Wickans of the Crow Clan, Coltaine\'s own, with their horses and their dogs. They will not take orders from a boy.',
    f.b4_c1_sweep && 'The Red Blades are taking every cask and every pipe in the Fourteenth. The soldiers are calling them names. The Red Blades do not seem to mind.',
    f.b4_blistig && 'Fist Blistig, the 9th\'s, says the Adjunct is mad and the army is finished. He says it where the soldiers can hear.',
    f.b4_c1_grub && 'At the review a small boy walked out onto the ground with a bone, and the army called it an omen before he had stopped walking.',
    f.b4_c1_blast && 'Something went off under the cobbles in the 8th\'s ranks at the review, and knocked a third of a legion flat. The 8th stood up straighter afterwards. The camp says a sapper did it on purpose.',
    'The squad is in the 9th Legion\'s Second Company: Captain Hollet, Sergeant Radde, and a hundred recruits off the transports.'].filter(Boolean); },

  dlg:{
    /* ---- the review: the 9th's line across the marshaling ground, and everything happening far away ---- */
    b4_c1_start:()=>({sp:'The 9th\'s line', scene:'b4_c1_review', fx:()=>{ S.f.b4_company = 1; S.f.b4_c1_ph = 1; }, txt:
`The 9th is drawn up across the marshaling ground from the Adjunct, in a line that the company's sergeant walks behind for the second hour, straightening it with the end of his stick. It does not stay straight. Dust comes up off the ground every time somebody shifts a foot, and somebody is always shifting a foot.

Far across the ground, small with distance and the heat, there are a few riders under a standard: the Adjunct, they say, though from the 9th's line she is a grey shape on a grey horse and could be anybody. Nearer, on the right, the 8th Legion is still coming onto the ground. It was the first drawn up, and it is late.

${b41Say({tangle:`Tangle, beside you, counts the satchel by touch through the leather. "Same as this morning," he says, to nobody. Then, because he cannot help it: "The 8th's late. That's a legion's worth of somebody about to have a bad day."`, haddat:`Haddat stands with the shield grounded and her eyes on the far riders. "She has not moved since the sun was there," she says, and points with her chin. "Either she is very patient or she is asleep."`, _:`The squad stands in the line, and sweats, and waits for something to happen at the far end of the ground.`})}${b4In('tallow') ? `\n\nTallow, at the end of the squad, is standing so straight that he is leaning backwards. His helm is a size too big and it has slipped over one eye. He has decided not to fix it in case somebody sees.` : ''}${b4In('darrut') ? `\n\nDarrut has the Guard's big round shield up on his arm, though nobody asked for shields. "Habit," he says. "In Aren you stand on this ground with a shield or you go home with a cobble in your ear."` : ''}${b41R({redblade:`\n\nRamin stands the line on foot, very straight, in red scale he has polished until it hurts to look at.`, warlock:`\n\nKeth is beside you, in hide much too big for him, with his palms turned down to the ground to feel it.`})}`,
      ch:[{t:'Watch the 8th come on.', go:'b4_c1_blast'},
          {t:'"Eyes front, all of you."', fx:()=>{ S.f.b4_c1_eyes = 1; }, go:'b4_c1_blast'}]}),
    b4_c1_blast:()=>({sp:'The marshaling ground', scene:'b4_c1_review', fx:()=>{ S.f.b4_c1_blast = 1; }, txt:
`It comes as a white flash low down in the 8th's ranks, across the ground and a long way to the right, and for a breath nothing else happens at all. Then the sound arrives: a flat hard crack that goes through your boots before it reaches your ears, and a long rolling cough of dust going up.

A third of a legion goes down. From the 9th's line it looks like wind in a field: a whole stretch of the 8th lying flat, and then, slowly, getting up, and the dust drifting off them toward the walls. When the dust has gone the 8th is standing in a straight line. It is the first straight line anyone has seen all morning.

${b41Say({tangle:`"Moranth," Tangle says. His voice is very calm. "Under the cobbles. That was laid, Sergeant, by a sapper who knew exactly how much." He is quiet a moment. "I'd like to meet him. I'd like a wall between us while I do."`, darrut:`"In the Guard," Darrut says, "we'd have hanged him." He watches the 8th dress its ranks. "And then given him a medal. At the same time, probably. It was that sort of Guard."`, _:`The squad does not say *Moranth* out loud. Every one of them thinks it.`})}${b4In('tallow') ? `\n\nTallow has gone down on one knee without meaning to, and is getting up again, red to the ears. "I wasn't—" he says. "It was the noise."` : ''}${b4In('hessa') ? ` Hessa has not moved at all. "That was a sapper," she says, "not a god. Gods are slower."` : ''}`,
      ch:[{t:'Keep watching.', go:'b4_c1_grub'}]}),
    b4_c1_grub:()=>({sp:'The marshaling ground', scene:'b4_c1_review', fx:()=>{ S.f.b4_c1_grub = 1; b4Nerve(-1, 'An omen at the review'); }, txt:
`The review goes on. Officers ride up and down. The Fists go to the Adjunct and come back. And then, while the 9th is still craning to see what the 8th will do next, there is a child on the ground.

He is very small, from here: a fair-haired boy walking out alone across the open dust between the legions toward the Adjunct's riders, holding something pale in both arms. Something longer than his arm. He walks the way small children walk when they have decided where they are going.

The word comes down the 9th's line faster than a runner could carry it. *A bone. A thighbone. Some child's brought her a dead man's leg.* Then, behind it, quieter: *an omen*. A captain of the 8th goes out and picks the boy up${b41Guard() ? `; you know the walk, from Aren's wall: Keneb` : ''}, and the Adjunct says something to him that nobody in the 9th is near enough to hear.

${b41Say({marrow:`"A child with a bone," Marrow says. "Hood's humour, child. It has never been subtle."`, haddat:`Haddat makes the sign against the evil eye, the Hissari way, low and quick against her thigh, and then looks annoyed with herself for doing it.`, _:`Behind the squad a recruit says *omen* again, louder.`})}${b4In('tallow') ? `\n\n"My grandmother would have said—" Tallow begins, and stops, and does not say what she would have said.` : ''}

"Eyes front," says the company's sergeant, walking behind the line. "Eyes front. It's a boy. I've seen two wars and a great many boys."`,
      ch:[{t:'Eyes front.', go:'b4_c1_fallout'}]}),
    b4_c1_fallout:()=>({sp:'The marshaling ground', scene:'b4_c1_review', fx:()=>{ S.f.b4_blistig = 1; b4Nerve(-1, 'The Fist said it where the recruits could hear'); }, txt:
`The review ends the way reviews end, without anybody saying so: the Adjunct's riders turn and go back toward the city, and the Fists come away from her in three directions, and the order comes down the lines a quarter of an hour behind them. *Two days. The army marches in two days. Until then, every soldier is confined to barracks.*

Fist Blistig rides back along the 9th's front with his officers around him. He is a heavy man on a heavy horse, and his face is the face of somebody with a bad tooth that has been talking to him all morning. As he passes the Second Company you hear him, quite clearly, because he is not trying to be quiet: "...mad. She'll have us all in the ground by midsummer, and she'll review the graves."

The officers round him say nothing that carries. One of them looks back over his shoulder at the line, to see who heard. Everybody did.

"Fall out," says the company's sergeant. "Fall out, and stay where I can see you. Captain wants the Third."`,
      ch:[{t:'Fall out.', go:()=>startExplore()}]}),

    /* ---- the Second Company: Captain Hollet, Sergeant Radde, and the recruits ---- */
    b4_c1_hollet:()=>({sp:'Captain Hollet · Second Company', txt:
`Captain Hollet is standing in the shade of the officers' awning with a wax tablet in one hand and a stylus in the other, coughing into the back of the stylus hand. He is thin, and Genabackan by his accent, and he looks less like a captain than like the clerk a captain sends to count the barrels. He finishes the cough and looks at you over the tablet.

"The Third," he says. "The Chain squad. Sergeant {sgt}." He makes a mark on the tablet, as if you had been an item. "I kept a garrison's books at Genabaris for nine years, Sergeant, before somebody decided I was a captain. I mention it so that you know where I'm useful, and where I'm not." He considers. "Where I'm not is most of it. You've done this. I haven't."

He glances up the ground to where Fist Blistig is still talking at his officers. He lowers his voice without seeming to know he has. "And the Fist doesn't like the Chain lot. He says you'll put ideas in the recruits' heads. I'd rather you put ideas in the recruits' heads than nothing at all."

"So," he says. "Are you the Chain's, Sergeant, or are you mine?"`,
      ch:[{t:'"We\'re the 9th\'s now, sir. Yours."', fx:()=>{ S.f.b4_c1_hollet = 'ninth'; b4Nerve(1, 'The company heard the Chain squad say it'); b41L('haddat', -1); }, go:'b4_c1_hollet_2'},
          {t:'"Coltaine\'s, sir. Still. And yours."', fx:()=>{ S.f.b4_c1_hollet = 'chain'; b41L('haddat', 1); b41L('sathi', 1); }, go:'b4_c1_hollet_2'}]}),
    b4_c1_hollet_2:()=>({sp:'Captain Hollet', fx:()=>{ S.f.b4_c1_errand = 1; }, txt:
`${S.f.b4_c1_hollet === 'ninth' ? `Hollet looks at you a moment, and then something in his thin face lets go a little. "Good," he says. "Say it louder, next time. The recruits were listening." They were: a dozen of them, pretending to tie their boots.${b4In('haddat') ? ` Haddat, behind you, does not pretend to be doing anything but looking at the back of your head.` : ''}` : `Hollet considers that, and then nods, slowly, like a clerk at a column that adds up in a way he did not expect. "Both," he says. "Very well. I can keep a book with two columns. Don't tell the Fist."${b4In('haddat') ? ` Haddat, behind you, shifts her shield an inch higher on her arm, which for Haddat is applause.` : ''}`}

"An errand, then. We're confined to barracks from dusk, and the company's water and the day's rations are still sitting in the quay stores, because the quartermaster's clerk is three days behind and blames the Red Blades for it." He scratches a pass on a tablet leaf and breaks it off for you. "Take the Third down to the quay, sign for it, see it back to the 9th's gate before they shut it. And Sergeant: the streets are full of soldiers who have just been told they're confined, and Red Blades taking the drink off them, and people selling them things. Try to come back with the same number."${b41R({redblade:`\n\nHe looks at Ramin's red scale a moment. "And your Red Blade can tell his friends we're not hiding anything. We haven't anything to hide."`, warlock:`\n\nHe looks at Keth, and the ochre, and clears his throat. "And your Wickan can ask his people to keep their dogs out of our ration carts."`})}`,
      ch:[{t:'"Sir."', go:()=>startExplore()},
          {t:'"The Fist, sir. What does he think the Chain lot will teach them?"', go:'b4_c1_hollet_fist'}]}),
    b4_c1_hollet_fist:()=>({sp:'Captain Hollet', txt:
`Hollet looks at the tablet for a long breath, as if the answer might be written on it.

"That an army can lose," he says at last. "That's what he says. That the Chain walked into Aren with its head up and lost anyway, and the High Fist after it, and the Fist would rather the recruits didn't know that was a thing that could happen. I think they ought to know. I think they'll find out anyway. I'd rather they found out from you than from Raraku."

He puts the stylus away. "I didn't say that either, Sergeant."`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b4_c1_hollet_again:()=>({sp:'Captain Hollet', txt: S.f.b4_c1_water ?
`Hollet is checking a list against another list. "The water's signed for? Good. Good." He ticks it. "The gate, then, Sergeant. Before dusk."` :
`Hollet is checking a list against another list under the awning. He looks up. "The quay stores, Sergeant. Before dusk. I'm told the clerk closes his book an hour before that, out of spite."`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b4_c1_radde:()=>({sp:'Sergeant Radde · Second Company', fx:()=>{ S.f.b4_c1_radde = 1; }, html:nerveHTML('The Second Company'), txt:
`The company's sergeant is a bald Falari with a sunburnt scalp and a short stick he uses for pointing, and a book. The book is an old leather-bound roll the size of a brick, and he is writing in it with a stub of pencil, standing up, the stick under his arm.

"Radde," he says, without looking up. "Sergeant-of-the-line. I've seen two wars, Sergeant, the Falari one and the one after, and I say so to every new face in the company, so that's done." He writes something. "This is the roll. Everyone in the Second Company is in it. Who they are, where they came from, what they did. I'm writing the Third in." He looks up at last, at the squad, and counts it, by eye, in one pass. "Came off the Chain. I'll put that."

He turns the book so you can see the page. The company's names, in a square careful hand, and beside some of them small marks you cannot read.

"The recruits are watching you lot," he says. "You'll have seen. They've heard about the Chain, the version they tell in the transports' holds, and now here you are, eating bread like anybody. Half of them think you're heroes. Half of them think you're a story. The rest think you're bad luck." He shuts the book on the pencil. "That's three halves. They're recruits; they can't count. Give them something to copy, Sergeant, and I'll write that down too."`,
      ch:[{t:'"What are the marks?"', go:'b4_c1_radde_marks'},
          {t:'"We\'ll give them something."', go:()=>startExplore()}]}),
    b4_c1_radde_marks:()=>({sp:'Sergeant Radde', txt:
`"Things I want to remember." Radde taps one with the pencil. "Him: snores. Her: can't swim, says she can. Him: steals." He taps another. "Him: steady. I don't give many of those." He looks at you. "There's a mark for Chain, now. I haven't decided what it looks like."

${b4In('darrut') ? `He finds Darrut's name without looking for it. "Aren Guard," he says. "Followed the Fist in. I've put that down too." Darrut looks at the book like a gate he has been asked to hold.` : b4In('tallow') ? `He finds Tallow's name without looking for it. "Off the transports. Fishing village. Reads cards, I hear." He does not say whether he has put that down. Tallow very much wants to know.` : `He does not look for anybody else's name. He has them already.`}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c1_radde_again:()=>({sp:'Sergeant Radde', txt:
`Radde is walking the company's lines with the stick under his arm and the book in his hand, writing as he goes. "Still here, Sergeant? The captain gave you an errand." He writes something. "That's not a mark. That's a note. A mark's worse."`,
      ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c1_recruits:()=>({sp:'The Second Company\'s recruits', txt:
`A knot of the company's recruits are sitting on their shields in the shade of the wall, which is against orders, and get up very fast when they see the Third coming, which is worse. Quon boys and girls, most of them, sunburnt across the nose, in leather that still creaks and helms that do not fit. They look at the squad the way you look at somebody who has walked out of a story into your street.

${b41New().length ? `${b41New().includes('tallow') ? `Tallow knows some of them from the transport. He stands half with them and half with the squad and is not sure which half to be in. ` : ''}${b41New().includes('hessa') ? `Hessa looks at them the way she must have looked at the temple's novices. ` : ''}${b41New().includes('tebbet') ? `Tebbet looks at their bows, which they do not have, and sighs. ` : ''}${b41New().includes('darrut') ? `Darrut looks at their shields, and then at their feet, and shakes his head. ` : ''}` : ''}One of them, a big freckled girl with a spear she is holding like a broom, gets up the nerve. "Sergeant," she says. "Is it true about the Chain? That you walked it all the way? The whole way?"

The rest of them are listening very hard. Over on the dust the 8th is still standing in its straight line, and the boy with the bone is still the only thing anybody in the Fourteenth is talking about.`,
      ch:[{t:'"Shields up. I\'ll show you what the Chain taught us." (drill them)', check:['might', 13],
            edges:id=>[(id === 'hessa' || id === 'darrut') && ['a shield wall is what they know best', 2], id === 'haddat' && ['she stood the front of the squad from Hissar to Aren', 1], id === 'tallow' && ['he is one of them, nearly', -1], id === 'tebbet' && ['he would rather be a long way off', -1]],
            clean:{t:'They lock shields on the third try, rim to rim, and the recruits further down the wall stop pretending not to watch.'},
            near:{t:()=>`Yes, but a shield rim comes round on the second try and catches ${NAME(ROLL().who || 'sgt')} across the mouth. The freckled girl is very sorry. ${3 + lvT()} health down at the start of the next fight.`, fx:()=>bruise(ROLL().who || 'sgt', 3 + lvT())},
            go:'b4_c1_drill_ok', fail:'b4_c1_drill_fail'},
          {t:'"All the way. Now drink some water."', fx:()=>{ S.f.b4_c1_drill = 'talk'; }, go:'b4_c1_drill_talk'}]}),
    b4_c1_drill_ok:()=>({sp:'The Second Company\'s recruits', fx:()=>{ S.f.b4_c1_drill = cleanRoll() ? 'clean' : 'ok'; if (cleanRoll()) b4Nerve(1, 'The recruits locked shields with the Chain squad'); }, txt:
`${by({hessa:`Hessa takes the front, and says three words in the temple tongue that probably mean *together*, and then in Malazan: "You are a wall. Walls do not have opinions." She puts their rims together one by one with her own hands.`, darrut:`Darrut takes the front. "Gate," he says, the Aren Guard's word, and puts the freckled girl's shield against his own with one hand like a man shutting a door. "Gate. Now you. Now you."`, haddat:`Haddat takes the front and teaches them the way the Seventh taught her: by standing there until they stand there too.`, _:`{who} takes the front and shows them, slowly, the way it was done on the Chain: rim on rim, the knee bent, the weight forward, the face behind the shield and not over it.`})}

The third time, they hold. Eight recruits, rims locked in a row along the wall, faces red, breathing hard, and when you shove the end of the line it gives an inch and comes back.

The freckled girl laughs out loud, surprised at herself. Down the wall, other recruits have stopped pretending not to watch. Radde, walking past with his book, stops, and writes something, and walks on.`,
      ch:[{t:'"Again tomorrow."', go:()=>startExplore()}]}),
    b4_c1_drill_fail:()=>({sp:'The Second Company\'s recruits', fx:()=>{ S.f.b4_c1_drill = 'fail'; }, txt:
`It goes badly. The freckled girl locks her rim the wrong way round, and the boy beside her locks his into her ear, and when ${by({sgt:'you shove', _:'{who} shoves'})} the end of the line the whole thing folds up like a fan and sits down in the dust.

Down the ground, men of the 8th laugh. They have just been knocked flat by a munition; they are in a mood to laugh at somebody.

"Tomorrow," the freckled girl says, getting up, scarlet. "Can we try tomorrow?"${b41Say({haddat:` Haddat gives her a hand up. "Tomorrow," she says. "And the day after. It took the Seventh a year."`, _:''})}`,
      ch:[{t:'"Tomorrow."', go:()=>startExplore()}]}),
    b4_c1_drill_talk:()=>({sp:'The Second Company\'s recruits', txt:
`They drink. They watch you while they drink, as if you might be about to say something else, and you do not, and after a while the freckled girl nods as if that were an answer too.

"My uncle said nobody walks that far," she says. "He said it's a story the Empire tells."

${b41Say({marrow:`"Your uncle," says Marrow, "was right about the Empire, child, and wrong about the walking. Drink some more."`, tangle:`"Your uncle," says Tangle, "never walked anywhere he couldn't see a tavern from."`, haddat:`"Your uncle," says Haddat, "is in Quon Tali."`, _:`The question hangs there over the water bucket, and then the recruits drink.`})}`,
      ch:[{t:'Leave them to it.', go:()=>startExplore()}]}),
    b4_c1_recruits_again:()=>({sp:'The Second Company\'s recruits', txt: S.f.b4_c1_drill === 'fail' ?
`The recruits are practising on their own along the wall, rim to rim, and falling over, and getting up. The freckled girl waves.` :
`The recruits along the wall are locking shields at each other and shoving, and holding, and laughing when they hold. The freckled girl waves.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_blistig:()=>({sp:'Fist Blistig · the 9th', fx:()=>{ S.f.b4_c1_blistigHeard = 1; S.f.b4_blistig = 1; }, txt:
`Fist Blistig has got down off his horse on the edge of the ground and is standing with his officers in a half circle round him, like men round a fire they cannot get warm at. He is not lowering his voice. He never does, they say.

"Staged," he is saying. "Keneb's brat. Walks out in front of the whole army with a dead man's leg, and the whole army sees it, and now every recruit in the Fourteenth thinks Hood's walking at the head of the column. You don't get that by accident." He spits. "And her sitting there like a post. Two days. Two days, and then she marches green boys into the Holy Desert against Sha'ik with a sword she won't draw. Mad. The army's finished before it's started."

One of his officers says something careful. Blistig looks at him until he stops.

${b4In('darrut') ? `Darrut, beside you, has gone very still. He followed this man out of the Aren Guard. "He was better on the wall," he says, low. "He was. You'd not know it, now."` : b41Guard() ? `He knew the squad, once, on Aren's wall, when the Chain came in. He keeps his back to the line now. You are not sure he would know you if he turned.` : `The Second Company's recruits, who are near enough to hear, have stopped talking among themselves.`}`,
      ch:[{t:'Walk away before he sees the Third listening.', go:()=>startExplore()}]}),
    b4_c1_well:()=>({sp:'The well', txt:
`A public well at the edge of the ground, a round curb of old dressed stone, with a bucket on a chain and a queue of thirsty recruits. ${b41Say({haddat:`Haddat goes to the head of the queue, which nobody argues with, and draws a bucket, and then makes each of the recruits drink twice, and says a word in Hissari as each of them does: *water*, *well*, *poisoned*, *enough*, *run*. "You will need these," she tells them. "Say them back to me." They do, badly. She makes them do it again.`, _:`The squad drinks, slowly, the way the Chain taught it, and the recruits watching copy it without knowing they are copying.`})}`,
      ch:[{t:'Drink, and walk on.', go:()=>startExplore()}]}),
    b4_c1_cart:()=>({sp:'A munitions cart', txt:
`A heavy cart under an oiled hide, with three soldiers of the 8th sitting on it and a fourth standing in front of it with a crossbow, looking at everybody. The hide is roped down very carefully. Under it, by the shape, are crates; and on the crates, by the smell, is the resin-and-clay smell that every sapper knows.

${b41Say({tangle:`Tangle stops dead and looks at the cart with open longing. "Moranth," he says softly. "A whole cart." He counts the guards, out loud: "Four." He counts them again. "Four. Sergeant, they'd never miss one."`, _:`Moranth munitions, by the smell. A whole cart of them, after this morning.`})}`,
      ch:[{t:'Talk a sharper off the guard. ("The Third\'s satchel is light.")', check:['guile', 14],
            edges:id=>[id === 'tangle' && ['he knows exactly what to ask for and how', 2], id === 'tallow' && ['he talks too much, which helps', 1], id === 'hessa' && ['she cannot lie and does not try', -2], id === 'haddat' && ['she has a Hissari accent and the guard is from Unta', -1]],
            near:{t:'Yes, but the guard writes the sergeant\'s name on the back of his hand before he hands it over. The 8th\'s quartermaster will hear of it.', fx:()=>{ S.f.b4_c1_cartName = 1; }},
            go:'b4_c1_cart_ok', fail:'b4_c1_cart_no'},
          {t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_cart_ok:()=>({sp:'A munitions cart', fx:()=>{ S.f.b4_c1_cartSharper = 1; S.inv.sharper = (S.inv.sharper || 0) + 1; note('+1 sharper.', 'good'); }, txt:
`${by({tangle:`Tangle talks to the guard sapper to sapper, about fuse-cord and the price of clay in Malaz City and a man they both turn out to have known, and somewhere in the middle of it a sharper goes from the cart into the satchel and the guard watches it go and does not stop it.`, _:`{who} talks to the guard about the satchel, and the Chain, and how far it is to Raraku, and somewhere in the middle of it the guard gets down and lifts a corner of the hide.`})} "One," the guard says. "For the Chain. Don't throw it at the 8th."`,
      ch:[{t:'"Never."', go:()=>startExplore()}]}),
    b4_c1_cart_no:()=>({sp:'A munitions cart', txt:
`The guard listens to all of it with great patience, and then lifts the crossbow an inch. "No," he says. "This morning a sapper of the 8th put one of these under the parade ground. The captain says the next man who asks for one gets to sit on the cart until Raraku." He considers. "Nicely put, though."${b4In('tangle') ? `\n\nTangle sighs, and counts the guards again, and walks away.` : ''}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_to_streets:()=> S.f.b4_c1_errand ? ({sp:'Into the streets', txt:
`East off the ground the streets go down toward the harbour: awnings, carts, sand blown in off the Way and swept into the gutters, and soldiers everywhere who have just been told they are confined to barracks from dusk and are spending what is left of the afternoon as hard as they can.`,
      ch:[{t:'Down to the harbour.', onward:true, go:()=>{ startExplore('b4_c1_streets'); talk('b4_c1_streets_arrive'); }},
          {t:'Not now.'}]}) : ({sp:'The edge of the ground', txt:
`The streets go east off the ground toward the harbour. The company is still falling out, and Captain Hollet sent for the Third.`,
      ch:[{t:'Not yet.'}]}),

    /* ---- the harbour streets: the relic market, the Red Blades, the quay, and the 9th's gate ---- */
    b4_c1_streets_arrive:()=>({sp:'The harbour streets', fx:()=>{ S.f.b4_c1_streets = 1; }, txt:
`The harbour streets are full. Soldiers of all three legions, in twos and fours, with silver in their hands and two days to spend it in; stall-keepers who have been waiting all year for an army and have finally got one; Aren's own people on the steps and the roofs, watching, as if the Fourteenth were a play.

Down the street, Red Blades are going from tavern to tavern in their red-enamelled scale, carrying out casks. Soldiers stand back to let them pass and call them things.

And under an awning near the corner, a man is calling the Chain's name. *Feathers from the Fall. Braids. A button off the Fist's own coat. Coltaine's finger, in glass.*

${b41Say({haddat:`Haddat stops walking.`, marrow:`Marrow hears it, and her mouth goes thin.`, _:`The squad hears it.`})}`,
      ch:[{t:'Walk the street.', go:()=>startExplore()}]}),
    b4_c1_stall:()=> S.f.b4_c1_relic ? ({sp:'The relic stall', txt: S.f.b4_c1_relic === 'bought' ?
`The stall is still there. The man behind it has put out another phial where the first one was, with another scrap of red cloth on it. He sees the squad and smiles, and then sees ${b4In('haddat') ? 'Haddat' : 'the sergeant'}, and stops smiling.` : S.f.b4_c1_relic === 'broken' ?
`Where the stall was there is a broken trestle and some swept-up glass. Aren's people step round it.` :
`The stall is still there, and the man still calling. *Coltaine's finger, in glass.*`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}) : ({sp:'The relic stall', scene:'b4_c1_market', txt:
`A cloth laid out on a trestle under an indigo awning, and on the cloth the Chain, in pieces. Crow feathers, tied in threes. Braids of Wickan hair that were never on a Wickan. Brass buttons. A dog's collar. And in the middle, in a row of small glass phials stoppered with wax, each with a scrap of red cloth round its neck, fingers.

"Coltaine's," says the seller, an Aren man with good teeth and a good coat. He has seen the squad's faces and has misread them. "Off the cross, the day after. My cousin was on the wall. Twelve silver, to a soldier of the Chain. Eight, to a sergeant."

${b41Say({haddat:`Haddat looks at the phials for a long breath. "There were crows," she says in Malazan, flat, to the seller. "Crows took him. All of him. I was on the wall." It is not true; she was on the road. It does not matter. The seller keeps smiling.`, marrow:`"A goat's," says Marrow, looking at the nearest phial. "Or a dog's toe. Not even a man's, child." The seller keeps smiling.`, _:`The seller keeps smiling.`})}${b4In('darrut') ? `\n\nDarrut has gone a dark colour. "I was on the wall," he says. "There were no cousins on the wall. Only us."` : ''}${b41R({redblade:`\n\nRamin's hand is on his sword's hilt. He takes it off again with an effort you can see.`, warlock:`\n\nKeth looks at the feathers, and his face does something old and not his. "Crow," the grandmother says out of his mouth, in Wickan, very quietly. "Did anyone ask the Crow?"`})}`,
      ch:[{t:'Buy the finger, to bury it.', tag:'8 silver', req:()=>(S.silver || 0) >= 8, fx:()=>{ S.silver -= 8; updSilver(); S.f.b4_c1_relic = 'bought'; gain('b4_c1_relic'); b41L('haddat', 1); }, go:'b4_c1_stall_buy'},
          {t:'Put the trestle over. (break the stall)', check:['might', 14],
            edges:id=>[id === 'haddat' && ['she has wanted to since she saw it', 2], id === 'darrut' && ['he knows how the Guard turns over a stall', 1], id === 'hessa' && ['she does not lose her temper; she decides', 1], id === 'tallow' && ['he is very sure it is wrong and not at all sure he is allowed', -1]],
            near:{t:'Yes, but the trestle goes over with a crash that brings the Red Blades up the street at a run, and their officer takes the sergeant\'s name and the squad\'s number before he lets it go.', fx:()=>{ S.f.b4_c1_redName = 1; }},
            go:'b4_c1_stall_break', fail:'b4_c1_stall_fail'},
          {t:'Walk on.', fx:()=>{ S.f.b4_c1_relic = 'left'; b41L('haddat', -1); note(b4In('haddat') ? 'Behind the squad the seller is calling it again. Haddat says one thing in Hissari, the length of the street later: "Twelve silver."' : 'Behind the squad the seller is calling it again. Coltaine\'s finger. In glass.'); }, go:()=>startExplore()}]}),
    b4_c1_stall_buy:()=>({sp:'The relic stall', scene:'b4_c1_market', txt:
`The seller takes the silver and wraps the phial in a square of cloth, and makes a little bow. "A fine choice, Sergeant. He'll watch over you."

${b41Say({haddat:`Haddat takes it from your hand before he has finished bowing, still wrapped, and puts it in your kit, and does not touch it again. "We will bury it," she says. "Properly. With the others." She means the Chain's dead in the old cemetery. "It is a goat. It will be a buried goat."`, _:`You take it. It weighs nothing at all. There is a corner of the old cemetery, the camp says, where the Chain's dead who came in through the gate and died after are buried. It can go there.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_stall_break:()=>({sp:'The relic stall', scene:'b4_c1_market', fx:()=>{ S.f.b4_c1_relic = 'broken'; gain('b4_c1_relic'); b41L('haddat', 1); b4Nerve(1, 'The recruits in the street saw it'); }, txt:
`${by({haddat:`Haddat puts her shield under the edge of the trestle and lifts, once, without any expression at all, and the whole stall goes over into the gutter in a shower of feathers and glass.`, darrut:`Darrut takes the trestle by its end the way the Guard takes a stall in a riot, and walks it over, and the whole lot goes into the gutter.`, _:`{who} takes the trestle by the edge and turns it over, and the whole stall goes into the gutter in a shower of feathers and glass.`})}

The seller shouts. The street does not help him. Soldiers of the 9th and the 10th, who were about to buy, look at the squad and look at the gutter and, one by one, put their silver away.

One phial has rolled to the kerb without breaking. ${b41Say({haddat:`Haddat will not pick it up.`, _:`It goes into the kit.`})} It goes into the kit, to be buried with the others.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_stall_fail:()=>({sp:'The relic stall', scene:'b4_c1_market', fx:()=>{ S.f.b4_c1_relic = 'left'; b4Nerve(-1, 'The street laughed'); }, txt:
`The trestle is better made than it looks, and the seller is quicker than he looks, and he is shouting for the Red Blades before ${by({sgt:'you have', _:'{who} has'})} got it off the ground. Two of them come down the street at a trot, in red scale, and stand between the squad and the stall, and their officer says, very politely, that the Adjunct's order is that the soldiers of the Fourteenth are not to trouble the people of Aren.

Soldiers of the 10th, who saw it, laugh. The seller smiles.${b4In('haddat') ? `\n\nHaddat walks away first. She walks very fast.` : ''}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_sweep:()=>({sp:'The Red Blades', fx:()=>{ S.f.b4_c1_sweep = 1; }, txt:
`Red Blades, six of them, in red-enamelled scale with their swords sheathed, working down the street tavern by tavern. Two go in. They come out carrying a cask between them, or a crate of jars, or a sack that smells of durhang resin, and put it on a cart with the rest, and go on to the next. The soldiers of the Fourteenth stand aside and call them names: *Baralta's dogs*, *lapdogs*, *Seven Cities traitors*. The Red Blades do not seem to hear.

${b4CanRecruit('redblade') && !b4In('redblade') && S.f.b4_raminDone == null ? `One of them, coming out of the next door with a cask on his shoulder, stops dead in the middle of the street. He puts the cask down. He looks at you, and at the squad, and then he smiles, which you have seen him do perhaps four times.

It is Ramin. He has a horse again: it is standing at the end of the street with its reins over a post, a tall bay with a red cloth under the saddle. He looks well. He looks like somebody who has been given back.` : `One of them, a young man with a badge new on his sash, sees the squad's faces and looks at them a moment too long. A soldier of the 10th behind him spits on his boots. He does not look down.`}`,
      ch:[{t:'"Ramin."', req:()=>b4CanRecruit('redblade') && !b4In('redblade') && S.f.b4_raminDone == null, go:'b4_c1_ramin'},
          {t:'Tell the 10th to clear off.', req:()=>!(b4CanRecruit('redblade') && !b4In('redblade') && S.f.b4_raminDone == null), go:'b4_c1_sweep_sash'},
          {t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_sweep_sash:()=>({sp:'The Red Blades', fx:()=>{ S.f.b4_c1_sash = 1; gain('b4_c1_redsash'); }, txt:
`The soldier of the 10th looks at the squad, and at the Chain written all over it, and goes. His friends go with him.

The young Red Blade watches them go. Then he does something odd: he unwinds the red sash from his waist, the one with the new badge on it, and cuts the badge off with his knife, and drops the sash in the street at your feet. "They spit on that," he says, in the Ehrlitan dialect, quietly. "I will get another. You keep it. You walked the Chain beside us. Half a company of ours did not come off it." He picks up the cask and goes on.

${b41Say({haddat:`Haddat picks up the sash and shakes the dust out of it. "Ehrlitan," she says. "He talks like the market there. I did not think I would ever be glad to hear it."`, _:`The sash lies in the dust a moment. Then somebody picks it up.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_ramin:()=>({sp:'Ramin · the Red Blades', txt:
`"Sergeant." He says it as he used to say it on the Chain, like a rank in the Red Blades. Then he takes your forearm, the Seven Cities way, hard. "I said I would be given back. I was given back." He looks past you at the squad, and counts it, and you watch him do it, and you watch him come to the end.${b4In('haddat') ? `\n\n"Haddat," he says, and bows from the waist, and she bows back, and for a breath the two of them are simply two Seven Cities soldiers in a street, being polite in two languages.` : ''}${b4In('tangle') ? `\n\n"Tangle. Count." "Same as this morning," says Tangle, and grins.` : ''}

"The company has horses again," he says. "Tene Baralta has us taking the drink off the army, because the Adjunct ordered it and because nobody likes us anyway." He shrugs at the cask. "My captain says I may ask to be lent, if the squad will have me. He does not understand it. He says yes anyway." He looks at you. "I am asking."`,
      ch:[{t:'"Walk with us."', fx:()=>{ b4Join('redblade'); gain('b4_c1_redsash'); S.f.b4_c1_sash = 1; }, go:'b4_c1_ramin_join'},
          {t:'"Stay near your company. We\'ll send for you."', fx:()=>{ S.f.b4_raminDone = 2; note('"Near," Ramin says. "That is a Red Blade\'s word too. Ask at any fire, Sergeant. I will come."'); }, go:()=>startExplore()}]}),
    b4_c1_ramin_join:()=>({sp:'Ramin', txt: b4In('redblade') ?
`He nods once, once, at an order he was hoping for, and goes to tell his officer, and comes back without the cask. He has unwound his sash, the red silk one, and put it in your hand. "For the squad," he says. "I have another. The company always has another." He does not say what it costs a Red Blade to give one away. He does not have to.

The horse he leaves with the company. "There is no room for a horse in a squad of foot," he says. "I have learned that much." He sounds almost cheerful about it.` :
`He nods, and goes to his officer, and comes back. "Another walks with you already," he says. "Then I will be near. Ask, at any fire, and I will come." He puts his sash in your hand anyway. "For the squad. The company always has another."`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_sweep_again:()=>({sp:'The Red Blades', txt:
`The Red Blades are three taverns further down the street, carrying out casks. ${b4In('redblade') ? `One of them sees Ramin with the squad and raises a hand. Ramin raises his back.` : S.f.b4_raminDone === 2 ? `Ramin, among them, raises a hand.` : `The soldiers have stopped calling them names. It is too hot.`}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_to_quay:()=>({sp:'The quay', scene:'b4_c1_quay', fx:()=>{ S.f.b4_c1_quay = 1; S.f.b4_c1_water = 1; }, txt:
`The quay stores are a long low shed at the head of the quay, and the quartermaster's clerk is sitting in its door with his book, and he signs the Second Company's water and rations over to Hollet's pass with the air of a man giving away his own children. The company's carts are already waiting. It takes a quarter of an hour.

The quay is not watching the carts. It is watching the ships.

Three of them are warped in against the stone, and off every gangplank horses are coming down: tall plains horses with their eyes covered, stepping high and slow and hating the planks, and dogs running between their legs, and riders. The riders are in black. They wear their hair in braids, and their faces are hard and old and very still, and they do not look at Aren at all.

"Crow," somebody on the quay says. "The Crow Clan. Coltaine's own. Three hundred, they say, come all the way from Quon Tali to put themselves under the Adjunct." A pause. "And under the boy."

Further along the quay, standing very straight beside a grey mare, is the boy: Temul, captain of the Wickan youths who came through the Chain, some forty of them at his back. The Crow come down the gangplanks and walk past him, every one of them, and none of them stops.

${b41Say({sathi:`Sathi has gone completely still beside you, and so has Hackle at her knee. "Crow," she says. "Old men. Old women." She watches them walk past Temul. "Old fools." She says it in Wickan, and loud, and two of the Crow turn their heads, and she meets their eyes and does not stop grinning, every filed tooth.`, haddat:`"They will not take him," Haddat says, watching. "Not a boy. Not after Coltaine." She sounds as if she understands it, and does not like understanding it.`, _:`The squad watches them walk past the boy. The whole quay is quiet.`})}`,
      ch:[{t:'"Keth."', req:()=>b4CanRecruit('warlock') && !b4In('warlock') && S.f.b4_kethDone == null, go:'b4_c1_keth'},
          {t:'Back to the carts, and the gate.', go:()=>{ startExplore(); }}]}),
    b4_c1_keth:()=>({sp:'Keth · the Wickan youths', scene:'b4_c1_quay', txt:
`He is among Temul's youths, thin as a tent-pole and grown another hand out of his sleeves since Aren's wall, with ochre across his eyes and a rattle of dog's teeth at his belt. He sees you before you see him. He has always done that.

"Sergeant," he says in his own voice, and then, in the other one, older and ruder, out of the same mouth: "*Still alive. The healer's doing, I suppose.*"${b4In('marrow') ? ` He looks at Marrow and grins. "*Healer.*" "Witch," says Marrow, pleased.` : ''}${b4In('sathi') ? ` Sathi says something to him in Wickan that makes two of the youths laugh, and he says something back that makes the rest of them laugh, and she punches his arm.` : ''}

He looks along the quay at the Crow walking past Temul. "They won't follow him," he says, his own voice. "They say a boy can't lead them. The grandmother says the Crow couldn't lead a goat to grass." He shrugs. "Temul says I can go with the squad, if the squad asks. He says the youths will hold without me. He is probably right." He sounds as if he would like to be told otherwise. "Are you asking?"`,
      ch:[{t:'"We\'re asking."', fx:()=>{ b4Join('warlock'); }, go:'b4_c1_keth_join'},
          {t:'"Stay with Temul. He needs you more."', fx:()=>{ S.f.b4_kethDone = 2; note('"He does," Keth says, looking at the boy by the grey mare. "Somebody should stand next to him. Ask at any fire, Sergeant. I\'ll come."'); }, go:()=>startExplore()}]}),
    b4_c1_keth_join:()=>({sp:'Keth', scene:'b4_c1_quay', txt: b4In('warlock') ?
`He goes to Temul, and says something low, and Temul looks across at the squad and nods once, trying to nod like Coltaine. Keth comes back with his kit on his shoulder and Hackle's-cousin, a big yellow camp dog, at his heels; he sends the dog back to the youths with a word.

"*The 9th,*" says the grandmother, looking at the squad's badges. "*Never heard of it.*" "No one has," says Keth. "It's new." "*Everything is new,*" the grandmother says. "*That is what is wrong with it.*"` :
`He goes to Temul, and comes back. "Another walks with you already," he says. "Then I'll be with the youths, near. Ask at any fire." The grandmother says something about the 9th that is not polite.`,
      ch:[{t:'Back to the carts, and the gate.', go:()=>startExplore()}]}),
    b4_c1_back_line:()=>({sp:'The way back', txt:
`West, the streets climb back toward the marshaling ground. The company has gone in to the barracks already; there is nothing up there but dust and the 8th's carts.`,
      ch:[{t:'Not that way.'}]}),

    /* ---- the 9th's barracks gate: durhang runners, and an old sergeant of the Aren Guard ---- */
    b4_c1_gate:()=> S.f.b4_c1_runnersDone ? B4CH1.dlg.b4_c1_gate_in() : !S.f.b4_c1_water ? ({sp:'The 9th\'s barracks gate', txt:
`The 9th's barracks gate: an old Aren Guard gatehouse with iron bars across the arch and men hanging about outside it. The water first. Hollet was clear about the water.`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The 9th\'s barracks gate', txt:
`The company's carts come down the street to the 9th's barracks gate, and stop, because the gate is shut, and in front of it there is a trade going on.

Harbour boys, quick and thin, are passing small clay pipes and twists of black resin through the bars to recruits on the far side, and taking silver back through the bars, and behind the boys three or four bigger men are standing with their arms folded, watching the street. Durhang. The Red Blades took the drink this morning; the trade has come to the gate instead.

A man in a long coat with a weighted cosh on a cord at his wrist sees the squad, and the carts, and the company's regulars walking with them, and smiles. "Malazans," he says. "Off you go round the side. We're doing business."${b41Say({tangle:`\n\n"Smoker," says Tangle, under his breath, with his hand already in the satchel. "One smoker, Sergeant. They'd never see us coming."`, darrut:`\n\n"In the Guard," Darrut says, "we'd have had the bars down on their fingers by now."`, _:''})}`,
      ch:[{t:'"Off you go yourself." Shields up.', go:()=>startBattle('b4_c1_runners', {})},
          {t:'Tangle drops a smoker against the gate.', tag:'uses 1 smoker', req:()=>b4In('tangle') && (S.inv.smoker || 0) > 0, fx:()=>{ S.inv.smoker--; }, go:()=>startBattle('b4_c1_runners', {pre:true})},
          {t:'Come at them along the wall, behind the carts.', check:['wits', 13],
            edges:id=>[id === 'darrut' && ['he has walked this street on a beat for twelve years', 2], id === 'haddat' && ['she reads a Seven Cities street without trying', 1], id === 'tallow' && ['he is a fishing boy in a city', -1]],
            near:{t:'Yes, but a cart wheel squeals on the cobbles as you come round it, and the men at the gate are half turned by the time you are on them.'},
            go:()=>startBattle('b4_c1_runners', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c1_gate_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c1_gate_seen:()=>({sp:'The 9th\'s barracks gate', txt:
`The wall is the wrong side of the street for it, and the carts are the wrong height, and the man in the long coat watches the whole thing with great interest from the moment it begins. "Malazans," he says again, sorrowfully, and lets the cosh drop off his wrist into his hand.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c1_runners', {surprise:'e'})}]}),
    b4_c1_runners_after:()=>({sp:'The 9th\'s barracks gate', fx:()=>{ S.f.b4_c1_runnersDone = 1; gain('b4_c1_durhangpipe'); }, txt:
`The runners scatter into the alleys, and their minders after them, and the man in the long coat goes last, holding his arm. The street is suddenly very quiet. Aren's people on the steps have seen all this before.

There is a sack by the gate with forty clay pipes in it, and a pound of resin, and somebody's silver. ${b41Say({marrow:`Marrow empties the resin into the gutter and grinds it in with her heel. "There," she says. "Now nobody has to argue about it." She keeps one of the pipes, though, turning it over. "For the sick, child. Sometimes."`, _:`The resin goes in the gutter. One of the pipes goes in the kit, somehow.`})}

On the far side of the bars the recruits who were buying have all remembered somewhere else to be. All except the company's regulars who came down the street with the carts, who are grinning at the squad as if they had been told a joke.

And in the gatehouse door, an old man in the Aren Guard's old mail with the plume cut off his helm is leaning on the jamb, watching the squad with an old soldier's opinion of new ones. He has been there the whole time.`,
      ch:[{t:'In through the gate.', go:()=>startExplore()}]}),
    b4_c1_oldguard:()=>({sp:'The gate sergeant · late of the Aren Guard', txt:
`The old man in the gatehouse door is the 9th's gate sergeant now, which is what the Aren Guard does with its old men when the Fourteenth borrows its barracks. He has a face like a walnut and the Guard's mail, and he watched the whole fight without moving off the jamb.

"Shields like a row of doors," he says. "Every one of you on his own." He spits. "Didn't they teach you to make a gate?"${b4In('darrut') ? `

Darrut has gone red to the neck. "Sergeant," he says, as if he were twenty again. The old man looks at him properly for the first time. "Darrut," he says. "I taught you that drill. On this gate. You were useless at it." Darrut says, "Yes, Sergeant." The old man grins with about four teeth. "You got better."` : ''}

"Three shields across the arch," he says. "Rims locked, the middle one a half step back, so whatever comes through comes through into a pocket and nobody gets past to the man behind. The Guard drilled it every dawn for a hundred years. Used it twice." He looks at the squad. "I'll show one of you. Once. If they can't get it once, they won't get it ten times."`,
      ch:[{t:'"Show us."', check:['wits', 16], trick:'b4_c1_gate', req:()=>!S.f.b4_c1_gateTried, fx:()=>{ S.f.b4_c1_gateTried = 1; },
            edges:id=>[id === 'darrut' && ['he learned it on this gate, from this man, badly', 3], id === 'haddat' && ['she has held the front of a squad since Hissar', 1], id === 'hessa' && ['a temple door is a gate', 1], id === 'tebbet' && ['he has never held a shield in his life', -2], id === 'marrow' && ['she is a healer, and old for it', -1]],
            near:{t:'Yes, but the old man raps the learner across the knuckles with his stick every time the rim slips. It is not a light stick.', fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c1_gate_ok', fail:'b4_c1_gate_no'},
          {t:'In through the gate.', go:()=>startExplore()}]}),
    b4_c1_gate_ok:()=>({sp:'The gate sergeant', txt:
`He makes ${by({sgt:'you', _:'{who}'})} do it with the gatehouse's two old shields and his own, in the arch, the middle one a half step back. "Gate," he says, and you lock, and he puts his weight against the middle shield, and the middle shield gives a half step into the pocket and stops, and nobody gets through it.

"Again," he says, and you do it again. "Again." And then, after the fifth time, he stands back and nods. "That'll do. That's a gate." ${by({darrut:`He looks at Darrut. "You got better," he says again. Darrut does not answer. He has to look at the wall for a while.`, _:''})}

"It's not sorcery," he says. "They'll not sing about it. It's just three soldiers who won't move." He goes back to his jamb. "That's all the Guard ever was."`,
      ch:[{t:'"Thank you, Sergeant." In through the gate.', go:()=>startExplore()}]}),
    b4_c1_gate_no:()=>({sp:'The gate sergeant', txt:
`He makes ${by({sgt:'you', _:'{who}'})} do it with the gatehouse's two old shields and his own, in the arch. It looks easy. It is not easy. Every time the middle shield goes back its half step the rims come apart and he walks through the gap, every time, shaking his head.

"Doors," he says, at last. "A row of doors." He goes back to his jamb. "Come and try again when you're older." He is probably joking. He might not be.`,
      ch:[{t:'In through the gate.', go:()=>startExplore()}]}),
    b4_c1_gate_in:()=>({sp:'The 9th\'s barracks gate', txt:
`The gate, and the yard beyond it, and the company's barracks round the yard. Dusk is coming down over the harbour. Once you are through, the gate shuts behind the squad for two days, and Aren is on the other side of it.${!S.f.b4_c1_water ? `\n\nThe water first.` : ''}`,
      ch:[{t:'In, and the gate shut behind.', req:()=>!!S.f.b4_c1_water, onward:true, go:()=>{ S.f.b4_c1_ph = 2; startExplore('b4_c1_barracks'); talk('b4_c1_yard_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the barracks yard: the first night, the fire, and the deck ---- */
    b4_c1_yard_arrive:()=>({sp:'The 9th\'s barracks yard', scene:'b4_aren_yard', txt:
`The gate shuts behind the company with a noise like a sentence finished, and the bar goes across.

The 9th's barracks were the Aren Guard's, once: long low bunk-houses round a flagged yard, lamps in the windows, a cistern in the corner, and a wall at the back with the old city cemetery on the far side of it. Night comes down over the yard the way it comes in Seven Cities, all at once. The Second Company lights its fires, and sits round them, and talks about the boy with the bone, and does not sleep.

There is a story going round the fires already, from the 8th's lines over the wall: a noble of Aren's council, Lenestro, found in his house with his neck broken, the day the army came in. *Somebody off the Chain,* the story goes. *Somebody who remembered.* Nobody says who. ${b41Say({haddat:`Haddat, hearing it, says "Good," in Hissari, and nothing else.`, tangle:`Tangle, hearing it, says, "Well," and goes on counting the satchel.`, _:`The Third lets that pass.`})}

And beyond the wall, in the old cemetery, there are lanterns among the graves, dozens of them, moving.`,
      ch:[b4DeckChoice(1),
          {t:'The Third\'s fire.', go:'b4_c1_yard'},
          {t:'Walk the yard.', go:()=>startExplore()}]}),
    b4_c1_deck:()=>b4DeckOffer(1),
    b4_c1_card:()=>b4DeckCard(1),

    /* the fire: the swap, a rest, the squad, and the way on (the games pass, 79, wraps this node: keep the id) */
    b4_c1_yard:()=>({sp:'The Third\'s fire', scene:'b4_aren_yard', again:()=> b41Done() ? 'The fire, burnt down to coals. The march is at dawn.' : `The Third's fire, in the yard. ${b41Ph() >= 3 ? 'The second night.' : 'The lanterns are still moving over the wall.'}`, txt:
`${b41Done() ? `The Third's fire has burned down to a red eye of coals in a ring of stones. Round the yard the other fires are going out one by one. The march is at dawn. The recruits who could not sleep last night are asleep now, all of them, all at once, as if somebody had blown them out.` : b41Ph() >= 3 ? `The Third's fire, the second night. The yard is louder than it was: the recruits have been confined for a day and a half, the Red Blades have taken every cask in the Fourteenth, and somebody in the end bunk-house has found one they missed.` : `The Third's fire, in a ring of stones on the flags, with a pot on it that ${b4In('marrow') ? 'Marrow says is tea' : 'is meant to be tea'}${b4In('tangle') ? ' and Tangle says is a crime' : ''}. The yard is full of other fires and other squads, and every one of them is talking about the boy with the bone. Over the back wall the lanterns are still moving among the graves.`}${b4In('marrow') ? '' : `\n\nThe pot is just a pot. There is nobody in the squad who will call it tea.`}`,
      ch:[b4DeckChoice(1),
          {t:'Sit an hour. Let the squad rest.', req:()=>!S.f['b4_c1_rest' + b41Ph()], fx:()=>{ S.f['b4_c1_rest' + b41Ph()] = 1; b4Rest('The squad sits an hour by its own fire, inside the 9th\'s walls. Wounds close, mostly.'); }, go:'b4_c1_yard_rest'},
          {t:'Talk with the squad.', go:'b4_c1_yard_talk'},
          ...b4Offers().map(id => ({t:`Send for ${NAME(id)}.`, fx:()=>{ b4SwapIn(id); }, go:'b4_c1_yard_swap'})),
          b4PipeChoice('b4_c1_yard'),
          {t:'Sell the confiscated pipe to the quartermaster\'s clerk.', tag:'+8 silver', req:()=>(S.kit || []).includes('b4_c1_durhangpipe') && !S.f['b4_pipe' + (S.chapter || 0)], fx:()=>{ b41Drop('b4_c1_durhangpipe'); S.silver = (S.silver || 0) + 8; updSilver(); S.f.b4_c1_pipeSold = 1; note('The quartermaster\'s clerk buys the pipe for eight silver without asking where it came from. He will sell it to the 10th before morning.'); }, go:'b4_c1_yard'},
          {t:'Over the wall, to the cemetery.', req:()=>b41Ph() === 2 && !S.f.b4_c1_digDone, onward:true, go:'b4_c1_wall'},
          {t:'Over the wall with the dig detail.', req:()=>b41Ph() >= 3 && S.f.b4_c1_key === 'grave' && !b41Done(), onward:true, go:()=>{ startExplore('b4_c1_cemetery'); talk('b4_c1_watch_arrive'); }},
          {t:'The noise from the end bunk-house.', req:()=>b41Ph() >= 3 && S.f.b4_c1_key === 'chain' && !b41Done(), onward:true, go:'b4_c1_brawl_start'},
          {t:'Sleep. The march is at dawn.', req:()=>b41Done(), onward:true, go:'b4_c1_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c1_yard_rest:()=>({sp:'The Third\'s fire', scene:'b4_aren_yard', txt:
`An hour, then, on the warm flags by the fire, while the 9th talks itself hoarse round the yard.

${b41Say({marrow:`Marrow goes round the squad the way she always has, without asking, and looks at hands and feet and the backs of necks, and ties a knot in her string at the end.`, tangle:`Tangle lies on his back with the satchel on his chest, like a cat, and counts it by feel, and falls asleep in the middle of the count.`, _:`One of them sleeps. The others pretend to.`})}${b4In('tallow') ? `\n\nTallow writes another line of the letter home he never sends. He shows nobody. He crosses it out.` : ''}${b4In('hessa') ? `\n\nHessa prays, briefly, to the flagstones, and then eats, as if she expects to be busy tomorrow.` : ''}${b41Dog() ? `\n\nHackle sleeps across ${b4In('sathi') ? 'Sathi\'s' : 'your'} feet, and twitches, chasing something on the Way.` : ''}${b41R({redblade:`\n\nRamin cleans his sword, which is clean, and then cleans it again.`, warlock:`\n\nKeth sleeps curled small by the wall. The grandmother, in his sleep, mutters about the 9th.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c1_yard'}]}),
    b4_c1_yard_swap:()=>({sp:'The Third\'s fire', scene:'b4_aren_yard', txt:
`${b4In('redblade') ? `Ramin comes across the yard from the Red Blades' lines, walking the way he walks, as if there were a horse under him. He puts his kit down by the fire. "Lent again," he says. "My captain sighed. He sighs a great deal."` : b4In('warlock') ? `Keth comes over the wall from the Wickan youths' lines, which he is not supposed to do, with the grandmother complaining about the climb all the way down. He puts his kit by the fire. "*Temul says go,*" the grandmother says. "*Temul says all sorts of things.*"` : `The swap is made. The fire takes the news calmly.`}`,
      ch:[{t:'Back to the fire.', go:'b4_c1_yard'}]}),
    b4_c1_yard_talk:()=>{ const n2 = b41Ph() >= 3, ln = [];
      if (b4In('haddat')) ln.push(n2 ? `Haddat is mending her shield-strap by feel. "The recruits ask me about the Chain now," she says. "I tell them the names. It is the only answer I have." She says one, quietly, the way she says them at night, and goes on mending.` : `Haddat sits with her back to the yard and her face to the wall, toward the lanterns in the cemetery. "They are digging up the dead for bones," she says. "In Hissar we would call that a crime. Here it is an order, by morning, I think." She has not decided yet what she thinks of it.`);
      if (b4In('sathi')) ln.push(n2 ? `Sathi is teaching Hackle to growl at the word *Crow*. He has nearly got it. "The Crow walked past Temul again today," she says. "I want to bite one."` : `Sathi has her feet on Hackle and her chin on her knees. "Coltaine's own, they call themselves," she says, of the Crow on the quay. "We were Coltaine's own. The Weasels. All of us." She grins, and it is not a grin.`);
      if (b4In('tangle')) ln.push(n2 ? `Tangle has the new satchel open on his knee and is counting it for the fourth time tonight. "Same as this morning," he says, and then, quieter: "Whoever laid that charge under the 8th. That was lovely work, Sergeant. Lovely."` : `Tangle has the satchel open on his knee. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "Same as this morning." He hums the four notes, and stops. "There's a sapper in the 8th who knows exactly how deep a cobble goes. I'd like to keep a hill between him and me, for the rest of my life."`);
      if (b4In('marrow')) ln.push(n2 ? `Marrow has her string out and is looking at the knots. "The warren is better here," she says. "Thinner. Cleaner. Like a well after rain." She ties nothing. "It is the other way, child, that I mind. North. Something standing in it."` : `Marrow has her string out and is counting the knots. "A boy with a bone," she says. "The whole army has gone superstitious in an afternoon." She ties a knot, for no reason she will give. "I have seen it before. On the Chain. It is what frightened people do with their hands."`);
      if (b4In('tallow')) ln.push(n2 ? `Tallow has his grandmother's deck in its oilcloth on his knee and is not opening it. "She said you don't read the night before the boats go," he says. "You read the night before that. So they've time to change their minds." He looks at the gate. "No one's changing their minds."` : `Tallow is turning a finger bone over in his hands that he picked up off the street, from somebody's sack. "Everybody's going to wear one," he says. "That's what they're saying. Everybody." He puts it down, carefully, as if it might mind. "Whose was it, do you think?"`);
      if (b4In('hessa')) ln.push(n2 ? `Hessa is sharpening her spear by feel. "D'rek's priests would have liked today," she says. "An army taking bones out of the ground and putting them on. They would call it the right way round." She tests the edge on her thumb. "I left before they could explain it to me."` : `Hessa watches the lanterns over the wall without any expression at all. "The dead do not mind," she says. "They are past minding. It is the living who mind, and they will mind whichever way it goes." She goes back to her whetstone.`);
      if (b4In('tebbet')) ln.push(n2 ? `Tebbet is restringing his bow with his eyes half shut. "I dreamt of the boy," he says. "Not with a bone. With a cup of water, walking in the sun." He shrugs. "Dreams are like that. You get the boy right and the rest wrong."` : `Tebbet has the bow across his knees and is looking at nothing. "From the back of the line," he says, "you could see the whole thing. The flash. The boy." He thinks about it. "I would rather have been further back."`);
      if (b4In('darrut')) ln.push(n2 ? `Darrut has his boots off and his feet to the fire. "Did I tell you about the camel in the governor's garden?" He did. He tells it again anyway, and it is better the second time, and it does not mention the wall.` : `Darrut is looking at the gatehouse, where the old sergeant sits. "He taught me the gate," he says. "Twenty years ago. I was useless." He thinks. "I'm still useless, mostly. But I can do the gate."`);
      if (b4In('orvas')) ln.push(`Orvas sits on the edge of the firelight, looking at the yard like a herd he does not trust. "Walls," he says. "You people love walls."`);
      if (b4In('redblade')) ln.push(n2 ? `Ramin is polishing the red of his scale. "My company took eighty casks from the 10th today," he says. "They hate us for it. They hated us before. It is easier when there is a reason."` : `Ramin sits very straight by the fire with his helm on his knee. "In Ehrlitan they sold relics of the Falah'd," he says. "Teeth. Hair. All false. We broke the stalls, the year the company cleared the market." He does not say anything about the market. He never has.`);
      if (b4In('warlock')) ln.push(n2 ? `Keth is lying on his back on the flags. "The ground here is full," he says. "Aren's dead. Old ones. They don't mind the digging." The grandmother adds, in her own voice: "*They are glad of the company.*"` : `Keth sits cross-legged by the fire. "The Crow will not have him," he says, of Temul. "The grandmother says they are proud old fools. She says it as a compliment." The grandmother, out of his mouth: "*Mostly.*"`);
      if (b41Dog() && !b4In('sathi')) ln.push(`Hackle lies across your boots with his chin on his paws and one eye open toward the wall. He has been like that since the whistle.`);
      return {sp:'The Third\'s fire', scene:'b4_aren_yard', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b4_c1_yard'}]}; },

    /* ---- the yard at night: Radde, Hollet, the recruits, an old soldier, the bunk-house, the wall ---- */
    b4_c1_radde_night:()=>({sp:'Sergeant Radde', fx:()=>{ S.f.b4_c1_raddeNight = 1; }, txt:
`Radde is sitting on an upturned bucket by the company's main fire with the book open on his knee, writing by the light of it. He does not look up.

"Rumours," he says. "You'll want them, Sergeant; everybody does. Here's what the company's saying, so you can tell them it's wrong." He licks the pencil. "The boy with the bone is Captain Keneb's, of the 8th. Some say his son, some say a Chain orphan, some say an imp from the Abyss, which is the 10th's contribution. The Fist says it was staged." He writes. "Three hundred Wickans came in on the tide, Crow Clan, and won't follow their own captain because he's fourteen. The Red Blades have every cask in the Fourteenth on carts by the quay stores. And Mallick Rel and Pullyk Alar have left Aren together, the councillors, the Jhistal priest and the other one, three days back, nobody knows where."${b4Was('b2_nobles7') === 'backed' ? `

You remember Pullyk Alar's face very well. At Balahn, when the squad stood behind Duiker, he said he would remember yours. His house on the hill above the harbour is shuttered, Radde says; the servants were paid off. He will have to remember your face somewhere else.` : ''}

He shuts the book on the pencil. "And over the wall, half the Fourteenth is in the old cemetery with its hands in the dirt, digging up Aren's dead for finger bones to wear, because a boy carried a bone and somebody in the 8th made a joke of it. The officers are pretending not to know." He looks at you, finally. "Half the Second Company's over there. I'm pretending not to know as well. Go and see what they're doing. And Sergeant. The camp says there's a corner of that cemetery where they put the Chain's dead, the ones who came in through the gate and died after. If anybody's digging there, I want to know who."`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()},
          {t:'Over the wall, then.', req:()=>!S.f.b4_c1_digDone, onward:true, go:'b4_c1_wall'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c1_radde_n2:()=>({sp:'Sergeant Radde', fx:()=>{ S.f.b4_c1_raddeN2 = 1; }, html:nerveHTML('The Second Company'), txt:
`Radde is on his bucket by the company fire with the book open. He turns it so you can see the page, the Third's names in his square careful hand. ${S.f.b4_c1_key === 'chain' ? `Beside every one of them there is a new mark: a small knot, drawn in pencil. "Chain," he says. "That's the mark. I decided."

He shuts the book. "The company's noticed. Half of them think you're putting on airs, and half of them think you're right, and the other half have had their drink taken and want somebody to hit." He looks over at the end bunk-house, where the noise is coming from. "That's three halves again. Watch the end bunk-house tonight, Sergeant."` : `Beside every one of them there is a small mark like a finger bone, the same as the rest of the company's. "Second Company," he says. "That's the mark. Same as everybody's."

He shuts the book. "The captain wants the company's own bones taken properly, from the old graves, by a detail, not by half the company on its knees in the dark. He wants the Third over the wall with them tonight. The men who were digging the Chain's corner last night will be back. Men like that always come back for what they left."`}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c1_hollet_night:()=>({sp:'Captain Hollet', fx:()=>{ S.f.b4_c1_holletNight = 1; }, txt: b41Ph() >= 3 ?
`Hollet is at a table in the door of the company office, with a lamp and three tablets. "The order came down at noon," he says. "Every soldier of the Fourteenth wears a bone. The same way. On a thong, at the throat. A lieutenant of the 8th was told to wear one himself, the story goes, because he complained. And Fist Gamet is to make a standard of it." He rubs his eyes. "A standard. Of bones. I have no column in the books for that."

He looks at you. "${S.f.b4_c1_key === 'grave' ? 'The Third took theirs from the old graves. Good. The company saw. It matters more than it ought to.' : 'The Third tied something of the Chain\'s on theirs. I saw. So did the company.'}" He rubs his eyes. "Whatever the company thinks, Sergeant, the march is at dawn. Get them there."` :
`Hollet is at a table in the door of the company office, with a lamp, writing up the day. "The water came in," he says. "Every barrel. You'd be surprised how rarely that happens. The gate sergeant says there was trouble at the gate, and the Third ended it, and the company's regulars came back telling everybody." He makes a mark. "I'm putting that down as *water, delivered*. Anything else, I'd have to explain to the Fist."`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b4_c1_recruits_night:()=> S.f.b4_c1_recNight ? ({sp:'The Second Company\'s recruits', txt: b41Ph() >= 3 ?
`The recruits at the next fire are wearing their new bones, and fingering them, and trying not to. ${S.f.b4_c1_key === 'chain' ? 'Some of them look at the Third\'s and look away.' : 'The freckled girl holds hers up to show you, proudly, as if she had made it.'}` :
`The recruits at the next fire are still awake. They will be awake all night.`,
      ch:[{t:'Leave them be.', go:()=>startExplore()}]}) : ({sp:'The Second Company\'s recruits', txt:
`The recruits at the next fire are awake, all of them, sitting in their blankets like a row of owls. The freckled girl from the wall is there, and a thin boy with a cough, and a dozen others. When the squad comes near the talk stops, and then the freckled girl says what all of them want to ask.

"The boy with the bone," she says. "My uncle says that's a death omen. A child carrying Hood's leg out in front of the army." She swallows. "Is it? Is it what the Chain was like, before? Omens?"

The whole fire is listening.${b4In('tallow') ? ` Tallow, who was one of them a month ago, is listening hardest of all.` : ''}`,
      ch:[{t:'"The Chain was hunger and thirst and walking. No omens. Just the walking, and the dead."', fx:()=>{ S.f.b4_c1_recNight = 'truth'; b4Nerve(-1, 'The recruits heard what the Chain was'); b41L('haddat', 1); b41L('marrow', 1); }, go:'b4_c1_recnight_truth'},
          {t:'"It\'s a boy and a bone. Go to sleep. You\'ve a long walk."', fx:()=>{ S.f.b4_c1_recNight = 'sleep'; b4Nerve(1, 'The Chain squad shrugged at the omen'); b41L('haddat', -1); }, go:'b4_c1_recnight_sleep'}]}),
    b4_c1_recnight_truth:()=>({sp:'The Second Company\'s recruits', txt:
`They listen. You tell them a little: the wells, and the river, and the dead on the road, and the walking. Not much. Enough. The fire is quiet afterwards, and the thin boy with the cough has stopped coughing.

"Thank you, Sergeant," the freckled girl says at last, very formally. She does not look as if she will sleep any better. She looks as if she will remember.${b41Say({haddat:`\n\nHaddat, beside you, says the names, quietly, three of them, the way she does at night. The recruits do not know what she is doing. They are quiet while she does it anyway.`, marrow:`\n\nMarrow, beside you, nods once. "Better they hear it from us, child," she says, low. "Than from the desert."`, _:''})}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b4_c1_recnight_sleep:()=>({sp:'The Second Company\'s recruits', txt:
`They laugh, a little, the way frightened people laugh when somebody they trust has told them not to be. The freckled girl lies down in her blanket. "A long walk," she says. "Right." Two of the others are asleep before you have walked away.

${b41Say({haddat:`Haddat walks back to the squad's fire beside you and does not say anything until she gets there. Then she says, in Hissari, "It was not a lie. It was not the truth either." She leaves it there.`, _:`It was the right thing to say, for tonight. Probably.`})}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b4_c1_oldsoldier:()=>({sp:'An old soldier of the 9th', fx:()=>{ S.f.b4_c1_oldsoldier = 1; }, txt:
`A grey old man with a soldier's deck of cards sits behind the cook-lines with a cup, and a queue of recruits in front of him. He reads for the legion for a finger of rum, they say; nobody knows his name. He turns a card for the freckled girl and says something that makes her laugh, and turns another for the thin boy and says nothing at all, and takes the boy's rum anyway.

He sees you watching. "Chain lot," he says. "${b4In('marrow') ? 'You\'ve your own reader. The old Napan woman. I\'ve heard. I\'ll not take her trade.' : b4In('tallow') ? 'You\'ve your own reader, I hear. The fishing boy with his granny\'s deck. Let him read. It\'s good for the hands.' : 'No reader of your own? Sit, then, any night. Rum after.'}"`,
      ch:[{t:'Leave him to his trade.', go:()=>startExplore()}]}),
    b4_c1_bunk:()=>({sp:'The Third\'s bunk-house', txt: b41Done() ?
`The bunk-house is dark and full of snoring. The squad's kit is packed against the wall, ready for the morning, the way the Chain taught it: water first.` :
`The Third's bunk-house: a long low room with a dozen cots, of which the squad has four by the door: old soldiers always take the cots by the door. The other cots belong to recruits of the company, who are not in them; they are at the fires, or over the wall.${b4In('tallow') ? ` Tallow's cot has a letter on it, folded small, addressed in a careful hand to a village on the Quon coast. He moves it under his blanket when he sees you looking.` : ''}`,
      ch:[{t:'Back out to the yard.', go:()=>startExplore()}]}),
    b4_c1_wall:()=> S.f.b4_c1_digDone && b41Ph() < 3 ? ({sp:'The back wall', txt:
`The cemetery is over the wall, and the squad has already been. The lanterns are fewer now. Most of the Fourteenth has its bone.`,
      ch:[{t:'Over again.', onward:true, go:()=>{ startExplore('b4_c1_cemetery'); }},
          {t:'Not now.', go:()=>startExplore()}]}) : b41Ph() >= 3 ? ({sp:'The back wall', txt: S.f.b4_c1_key === 'grave' ?
`The back wall, and over it the old cemetery, dark tonight except for one lantern at the Chain's corner where the company's dig detail is waiting.` :
`The back wall. The cemetery beyond it is dark tonight. The Third's business is in the yard.`,
      ch:[{t:'Over the wall with the dig detail.', req:()=>S.f.b4_c1_key === 'grave' && !b41Done(), onward:true, go:()=>{ startExplore('b4_c1_cemetery'); talk('b4_c1_watch_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}) : ({sp:'The back wall', txt:
`The back wall of the yard is old Aren brick, chest high on this side and a good deal more on the other, and somebody has leaned a bunk-ladder against it. Over it, the old cemetery: dark tombs, and lanterns moving among them, and the sound of spades, a whole company of them.

${b41Say({darrut:`"Aren's old cemetery," Darrut says. "My grandfather's in there somewhere. Under a lot of other people's grandfathers."`, haddat:`Haddat looks over the wall a long time. "They are digging Aren's dead," she says. "For bones to wear." She does not say what she thinks of that yet.`, _:`Half the Fourteenth seems to be over there with a spade.`})}`,
      ch:[{t:'Over the wall.', onward:true, go:()=>{ startExplore('b4_c1_cemetery'); talk('b4_c1_cem_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the old cemetery, the first night: the squads' raid, and the Chain's corner ---- */
    b4_c1_cem_arrive:()=>({sp:'The old cemetery', scene:'b4_c1_graveyard', txt:
`Over the wall the cemetery goes back a long way into the dark: old tombs of Aren's families, grey and leaning, and between them the plain graves of everybody else, and between those the open earth. Lanterns everywhere. Soldiers of the Fourteenth on their knees in the dirt with spades and helmets and bare hands, digging up the dead of Aren for a finger bone each.

It started as a joke, by the sound of it. A boy carried a bone out in front of the army, and somebody in the 8th's lines laughed and said the army should all have one then. Now it is not a joke. They are digging quietly, and saying sorry to the graves, some of them, under their breath.

${b41Say({hessa:`Hessa stops at the edge of the open earth, and kneels, and puts her palm flat on it, and says one word in the temple tongue. Then she gets up. "D'rek does not mind," she says. "Everything comes to the Worm. It comes back out, sometimes."`, marrow:`Marrow stops at the edge of it with her hands folded in front of her. "Well," she says. "It is one way to bring the dead along."`, _:`The squad stands at the edge of it a while.`})}

And far over in the north-east corner, by the wall, where the camp says the Chain's dead are buried, there are lanterns too, but shuttered, and men who are not wearing the Fourteenth's colours.`,
      ch:[{t:'Into the cemetery.', go:()=>startExplore()}]}),
    b4_c1_tenth:()=>({sp:'A squad of the 10th', fx:()=>{ S.f.b4_c1_tenth = 1; }, txt:
`A squad of the 10th Legion, five recruits and a corporal, on their knees round an old grave with a broken stone. The corporal is trying to read the name off it by lantern-light, and cannot; the rain of a hundred years has had it. "Daughter of somebody," he says. "Hood keep her." He looks up at the squad. "We ask them first," he says. "It's only manners."

One of his recruits holds up a finger bone, small and very white, and looks at it as if it might say something. "Sorry," he says to the grave. "Sorry, missus."

"Chain lot," the corporal says, seeing the squad's faces. "You'll not be wanting Aren's, then. You'll have your own." He means it kindly. He goes back to the grave.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_lantern:()=>({sp:'A lantern among the graves', txt:
`A lantern hung on the arm of a tomb's carved figure, an old Aren matron with her face worn smooth. Soldiers have been digging round her plinth; the earth is open, and somebody has put the stones back on top of what they found, carefully, the way you tidy a room you have been a guest in.${b41Ph() >= 3 ? ' Tonight the lantern is cold and the earth is still.' : ''}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c1_chaincorner:()=>({sp:'The Chain\'s corner', scene:'b4_c1_graveyard', txt:
`The Chain's corner is a strip of new ground along the north-east wall, where the city put the Chain's people who came in through the gate alive and did not stay that way: fever, and wounds, and walking a thousand leagues and then stopping. There are no stones. There are boards, painted, and some of the boards have names and some have only a number, or a clan mark, or *Seventh*, or nothing.

The graves are open. Men with spades and shuttered lanterns are in them, a dozen at least, lifting things into sacks, and two big men with clubs are standing over them watching the cemetery for anybody who might mind. None of the Fourteenth has come over here to mind.

${(() => { const f = b4Fallen(); return f.length ? `One of the boards, half pulled up and thrown aside, says *Seventh · the last mile*. The camp says the Aren Guard brought in what it could from the last mile of the Way, after. ${f.length > 1 ? `${b4FallenNames()} may be under it, or may not. There is no way to know.` : `${TPL[f[0]].name} may be under it, or may not. There is no way to know.`}` : `One of the boards, half pulled up and thrown aside, says *Seventh · the last mile*.`; })()}

${b41Say({haddat:`Haddat's shield comes up without her seeming to lift it.`, marrow:`Marrow's face does something you have not seen it do since the Vathar.`, _:`The squad's shields come up.`})}`,
      ch:[{t:'"Get out of those graves." Shields up.', go:()=>startBattle('b4_c1_dig', {})},
          {t:'Tangle puts a burner in the open grave.', tag:'uses 1 burner', req:()=>b4In('tangle') && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b4_c1_dig', {pre:true})},
          {t:'Get round them through the tombs, quiet.', check:['guile', 14],
            edges:id=>[id === 'haddat' && ['she has been quiet in worse places than this', 1], id === 'tebbet' && ['he prefers distance, and knows how to get it', 2], id === 'darrut' && ['he is broad and the tombs are close', -1], id === 'tallow' && ['his new leather creaks', -2]],
            near:{t:'Yes, but a loose stone goes under a boot at the last tomb, and the man with the crossbow turns.'},
            go:()=>startBattle('b4_c1_dig', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c1_dig_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c1_dig_seen:()=>({sp:'The Chain\'s corner', scene:'b4_c1_graveyard', txt:
`The tombs are close, and the dark between them is full of things to fall over, and ${by({sgt:'you find', _:'{who} finds'})} one of them, loudly. The shuttered lanterns go dark all at once. A whistle, low. Spades come up out of the graves.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c1_dig', {surprise:'e'})}]}),
    b4_c1_dig_after:()=>({sp:'The bone-pits', scene:'b4_c1_graveyard', fx:()=>{ S.f.b4_c1_digDone = 1; }, txt:
`The man in the good coat is down, and the rest have gone over the north wall the way they came. The cloth is still there, by the lantern: fingers, sorted by size, and toes, and a jawbone or two, and a few small things that are not bones at all, buttons and a brass token and a Wickan bead. The sacks are full of the rest. Pieces of the Chain. *Coltaine's*, by tomorrow, every one of them, in glass, in the harbour market.

${b41Say({haddat:`Haddat goes down on her knees by the cloth and begins, very carefully, to put things back in the sacks. She does it without being told. After a while ${b4In('marrow') ? 'Marrow' : 'somebody'} kneels beside her and helps.`, marrow:`Marrow goes down on her knees by the cloth and begins to put things back. "Child," she says, to nobody in particular. "Child. Child."`, _:`The squad goes down on its knees by the cloth and puts things back in the sacks. It takes a long time.`})}${(S.kit || []).includes('b4_c1_relic') && S.f.b4_c1_relic === 'bought' ? `\n\nThe phial from the market is in the kit. It can go in with them. It is a goat's, probably. It can be buried anyway.` : ''}

When it is done, the squad carries the sacks back to the Chain's corner and puts them in the open graves and fills the graves in, and puts the boards back up, as near as anybody can tell where they went. ${b41R({redblade:`Ramin carries the board that says *Seventh* and puts it back himself, very straight.`, warlock:`Keth walks the length of the corner slowly, and the grandmother says something in Wickan that might be a prayer and might be a scolding.`})}

Radde is standing at the end of the row when you straighten up. You did not hear him come. He has the book under his arm.`,
      ch:[{t:'Bury the market finger with them.', req:()=>(S.kit || []).includes('b4_c1_relic') && S.f.b4_c1_relic === 'bought' && !S.f.b4_c1_relicBuried, fx:()=>{ b41Drop('b4_c1_relic'); S.f.b4_c1_relicBuried = 1; b41L('haddat', 1); note(b4In('haddat') ? 'The phial goes in last, under the board that says Seventh. Haddat says a name over it that is not Coltaine\'s. Then she says "Goat," and almost laughs.' : 'The phial goes in last, under the board that says Seventh. It is not Coltaine. It is buried anyway.'); }, go:'b4_c1_key'},
          {t:'"Sergeant."', go:'b4_c1_key'}]}),
    b4_c1_key:()=>({sp:'Sergeant Radde', scene:'b4_c1_graveyard', txt:
`"Thought it would be you," Radde says. "The Chain's corner." He looks at the filled graves, and the boards, and the squad's hands. "Good work. I'll write it." He does not write it yet.

"Word from the 8th," he says. "The Adjunct's heard about tonight. Every soldier of the Fourteenth with a finger bone round his neck, from the old graves, and the officers pretending not to know. The order comes down in the morning, they say: wear them, all of you, the same way, on a thong at the throat, so nobody can say whose idea it was. She's going to make it hers." He shrugs. "Clever. Or mad. The Fist says mad."

He looks at you. "So the Third wants a bone by morning, Sergeant, like everybody. There's Aren's old graves, all round us. Every squad in the company took theirs from those tonight. Or." He looks at the Chain's corner, and at ${b4In('haddat') ? 'Haddat\'s shield' : 'the squad\'s hands'}, and at your face. "Or you've your own ideas. I've seen the look before. I'll write it either way."${b41Say({haddat:`\n\nHaddat has the blue thread she has carried since Hissar wound round her fingers, without seeming to know she has taken it out.`, marrow:`\n\nMarrow's knotted string is in her hand, the third length.`, _:''})}${b41R({redblade:`\n\nRamin waits, very straight, to see what the squad he is lent to will do.`, warlock:`\n\nKeth has a crow feather in his hair, from the pilgrims' road. The grandmother is watching you through his eyes.`})}`,
      ch:[{t:'"A bone from the old graves, like the rest of the Fourteenth."', fx:()=>{ S.f.b4_c1_key = 'grave'; S.f.b4_bone = 'grave'; b4Nerve(2, 'The company took the squad in as its own'); b41L('haddat', -1); b41L('marrow', -1); gain('b4_c1_finger'); }, go:'b4_c1_key_grave'},
          {t:'"The bone the order says. Tied with Haddat\'s blue thread."', req:()=>b4In('haddat'), fx:()=>{ S.f.b4_c1_token = 'thread'; }, go:'b4_c1_key_chain'},
          {t:'"The bone the order says. Tied with a knot off Marrow\'s string."', req:()=>b4In('marrow'), fx:()=>{ S.f.b4_c1_token = 'string'; }, go:'b4_c1_key_chain'},
          {t:'"The bone the order says. With a crow feather from the pilgrims\' road."', fx:()=>{ S.f.b4_c1_token = 'feather'; }, go:'b4_c1_key_chain'},
          {t:'"The bone the order says. With what we carried off the Chain."', req:()=>{ const k = b4Was('keepsakes'); return Array.isArray(k) && k.length > 0; }, fx:()=>{ S.f.b4_c1_token = 'keepsake'; }, go:'b4_c1_key_chain'},
          {t:'"Give me a moment, Sergeant."', go:()=>startExplore()}]}),
    b4_c1_key_grave:()=>({sp:'The old cemetery', scene:'b4_c1_graveyard', txt:
`The squad takes its bones from the old graves of Aren, the way the 10th's corporal did: asking first, and saying the name off the stone if there is a stone, and putting the earth back after. Old bones, yellow-brown, of people who died before anybody in the squad was born, in a city none of them belongs to. They go on thongs at the throat, the way the order will say.

Radde watches, and then opens the book and writes, and turns it so you can see: a small mark like a finger bone, beside the Third's names. The same mark as the rest of the Second Company's.

"There," he says. "Now you're ours." He sounds as if he had won something.

${b41Say({haddat:`Haddat ties her bone on and does not say anything kind. She does not say anything at all, all the way back to the wall, and when she gets there she touches the blue thread at her wrist once, as if checking it was still there.`, _:''})}${b41Say({marrow:`${b4In('haddat') ? '\n\n' : ''}Marrow ties hers on with fingers that know every knot there is. "An Aren man," she says, looking at it. "Or woman. We'll never know. Well, child." She does not finish it.`, _:''})}${b41R({redblade:`\n\nRamin ties his on beneath his red sash. "The company will laugh," he says. "Let them."`, warlock:`\n\nKeth ties his on, and the grandmother says, "*An Aren woman. She was a weaver. She says she does not mind the travel.*" The squad does not ask how she knows.`})}`,
      ch:[{t:'Back over the wall.', onward:true, go:()=>{ startExplore('b4_c1_barracks'); talk('b4_c1_night2'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c1_key_chain:()=>({sp:'Sergeant Radde', scene:'b4_c1_graveyard', txt:
`"The bone," you say, "the way the order says. Like everybody." The squad takes its bones from the old graves; there is no other place to take them from, and the order will be the order. "And ${b41Token()} tied to it. On every one."

Radde looks at you for a long breath. Then he opens the book on the pencil and draws something beside the Third's names, small, and turns it so you can see: a knot.

"Chain," he says. "That's the mark. I decided." He shuts the book. "The company'll see it. Some of them will think you're putting on airs. Some of them will think you're right. Some of them will think you think you're better than them, and they'll be recruits, and they'll have had their drink taken." He shrugs. "I'd watch the yard, the next night or two."

${b41Say({haddat:`Haddat ${S.f.b4_c1_token === 'thread' ? 'unwinds the blue thread from her fingers and breaks it into lengths with her teeth, one for each of you, and ties yours on herself' : 'ties her bone on, and the token with it, and holds it in her fist a moment'}. "Coltaine's," she says. "Still."`, _:''})}${b41Say({marrow:`${b4In('haddat') ? '\n\n' : ''}Marrow ${S.f.b4_c1_token === 'string' ? 'unpicks a knot off the end of her string for each of you, and ties them on, and the string is shorter by that much' : 'ties hers on'}. "There," she says. "Now we're carrying them properly, child."`, _:''})}${b41Say({sathi:`${b4In('haddat') || b4In('marrow') ? '\n\n' : ''}Sathi grins at the bone, all her filed teeth. "Crow," she says. "Good."`, _:''})}${b41R({redblade:`\n\nRamin ties the token on beside the bone, very carefully, the way he keeps his sword. "Half my company stayed at the Sekala," he says. "I will carry them too."`, warlock:`\n\nKeth ties the token on, and the grandmother says, "*Good. The dead like to be carried by those who knew them. Strangers drop things.*"`})}`,
      ch:[{t:'"Write it, then."', fx:()=>{ S.f.b4_c1_key = 'chain'; S.f.b4_bone = 'chain'; S.f.b4_c1_radded = 1; b4Nerve(-1, 'The company saw the Third set itself apart'); b41L('haddat', 1); b41L('marrow', 1); b41L('sathi', 1); gain('b4_c1_finger'); note('The squad goes back over the wall with its bones at its throats, and the Chain\'s tied to every one of them.'); }, onward:true, go:()=>{ startExplore('b4_c1_barracks'); talk('b4_c1_night2'); }},
          {t:'"Not yet."', go:()=>startExplore()}]}),
    b4_c1_cem_back:()=>({sp:'The cemetery wall', txt: S.f.b4_c1_digDone && !S.f.b4_c1_key ?
`The wall back to the barracks. Radde is waiting in the Chain's corner for an answer first.` : b41Ph() >= 3 && S.f.b4_c1_key === 'grave' && !S.f.b4_c1_watchDone ?
`The wall back to the barracks. The dig detail is still out in the Chain's corner, waiting for the squad.` :
`The bunk-ladder against the cemetery side of the wall, and the yard's firelight over the top of it.`,
      ch:[{t:'Back over the wall.', req:()=>!(S.f.b4_c1_digDone && !S.f.b4_c1_key) && !(b41Ph() >= 3 && S.f.b4_c1_key === 'grave' && !S.f.b4_c1_watchDone), onward:true, go:()=>{ startExplore('b4_c1_barracks'); if (S.f.b4_c1_key && b41Ph() < 3) talk('b4_c1_night2'); }},
          {t:'Not now.'}]}),

    /* ---- the second night: the order, and whatever the key brings ---- */
    b4_c1_night2:()=>({sp:'The 9th\'s barracks yard', scene:'b4_aren_yard', fx:()=>{ S.f.b4_c1_ph = 3; }, txt:
`The next day goes the way a confined day goes: drill, and water, and the officers walking about with tablets, and the order coming down at noon exactly as Radde said. *Every soldier of the Fourteenth will wear a finger bone. The same way: on a thong, at the throat. Officers too.* Somebody says a lieutenant of the 8th was told to wear one himself because he complained. The 8th says Fist Gamet is to make a standard of them. By dusk the whole Fourteenth is wearing its bones, and fingering them, and trying not to.

Then it is the second night, and the march is at dawn.

${S.f.b4_c1_key === 'grave' ? `The Second Company makes room for the Third at its main fire, which it has not done before. The freckled girl gives you the end of her bread, without being asked. The company's recruits look at the squad's bones and see their own.

Hollet sends word at dusk: the company's own bones are to be gathered properly, from the old graves, by a detail, so that none of the company has to go over the wall on its knees again. And the Third will stand over the detail. "The men who were in the Chain's corner," Radde says, "will be back. Men like that always come back for what they left."` : `The Second Company does not make room at its fire. It does not need to; the Third has its own. But the company looks at the squad's bones as it goes past, and at what is tied to them, and some of it looks away and some of it does not.

The Red Blades came through the yard again at noon and took a cask out of the end bunk-house that somebody had hidden under the floor. The recruits who hid it are saying somebody told the Red Blades where to look. They are saying it loudly. They are saying it about the Chain dogs.`}`,
      ch:[{t:'The Third\'s fire.', go:'b4_c1_yard'},
          {t:'Walk the yard.', go:()=>startExplore()}]}),
    b4_c1_watch_arrive:()=>({sp:'The old cemetery', scene:'b4_c1_graveyard', txt:
`The cemetery is quiet tonight. The whole of the Fourteenth has its bones, and the graves it opened last night have been closed again, more or less, by soldiers who were ashamed in the morning. One lantern hangs at the Chain's corner, where the detail is starting work among the old Aren graves beside it, quietly, asking first.

The landward gate on the far side of the cemetery is shut. Radde locked it himself at dusk.`,
      ch:[{t:'Find the detail.', go:()=>startExplore()}]}),
    b4_c1_watch_go:()=>({sp:'The company\'s dig detail', txt:
`The dig detail's corporal looks up from a grave as the squad comes, and nods, and points with his spade at the dark path between the tombs toward the landward gate. "Something on the path," he says. "Twice now. Lantern, then no lantern." He spits. "Men like that always come back."

There is a sound from the path, and then another, and then the soft clink of a gate chain that should be locked.`,
      ch:[{t:'"Shields. Between them and the detail."', go:()=>startBattle('b4_c1_watch', {})},
          {t:'Tangle puts a burner up the path.', tag:'uses 1 burner', req:()=>b4In('tangle') && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b4_c1_watch', {pre:true})},
          {t:'Douse the lantern and wait for them in the dark.', check:['wits', 14],
            edges:id=>[id === 'tebbet' && ['he is good in the dark, and quiet in it', 2], id === 'haddat' && ['night watches from Hissar to Aren', 1], id === 'tallow' && ['he has never stood a night watch that mattered', -1]],
            near:{t:'Yes, but one of the detail drops a spade on a stone as the lantern goes out, and the path goes very quiet, all at once.'},
            go:()=>startBattle('b4_c1_watch', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c1_watch_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c1_watch_seen:()=>({sp:'The old cemetery', scene:'b4_c1_graveyard', txt:
`The lantern goes out, and for a breath it works, and then one of the detail lights his pipe. The path is suddenly full of running feet.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c1_watch', {surprise:'e'})}]}),
    b4_c1_watch_after:()=>({sp:'The sexton\'s gate', scene:'b4_c1_graveyard', fx:()=>{ S.f.b4_c1_watchDone = 1; S.f.b4_c1_sexton = 1; }, txt:
`The sexton is sitting against the gatepost with his staff across his knees and blood in his beard, and the key still on its ring at his belt. The men he let in are over the wall again, or lying among the tombs groaning, and the dig detail's corporal is standing over them with a spade, deciding things.

"Twenty years," the sexton says, to nobody. "Twenty years I kept it. Then the Chain came in, and the market wanted fingers." He looks at the squad's bones. "You're wearing them too," he says. "All of you. Off my graves. Who's the thief?"

${b41Say({darrut:`"You sold the Chain's corner," Darrut says. "I drank with you." He takes the key off the man's belt and holds it out to you, not to Radde. "That's the difference."`, haddat:`"We asked them first," Haddat says. It is the only answer she gives.`, _:`The corporal of the detail takes the key off his belt for an answer.`})}

Radde has come over the wall at the noise. He looks at the sexton, and at the squad, and at the dig detail's sacks, untouched, of the company's own bones. He opens the book, and writes something long. "The Second Company," he says, "will remember the Third stood its graves." He shuts the book. "Get some sleep. All of you. The march is at dawn."${b41R({redblade:`\n\nRamin cleans his sword on the sexton's coat, and then, after a moment, gives the man a cloth for his beard.`, warlock:`\n\nKeth crouches by the Chain's corner a while. "*Quiet now,*" the grandmother says. "*Good.*"`})}`,
      ch:[{t:'Back over the wall.', onward:true, go:()=>{ startExplore('b4_c1_barracks'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c1_brawl_start:()=>({sp:'The barracks yard', scene:'b4_aren_yard', txt:
`The noise comes out of the end bunk-house and into the yard: twenty recruits of the 9th and the 10th, some with staves, most with fists, some still holding the jars they were drinking from before the Red Blades found the rest. In front of them, a regular of the 10th with a broken nose is pointing at the Third's fire.

"*Chain dogs,*" he is saying. "Coltaine's own. Wear the Fist's bone like it's dirt, tie their own dead on it, and run to the Red Blades about our cask." He has a bunk-leg in his hand. "Let's see what the Chain's worth."

${b41Say({haddat:`Haddat stands up with her shield. "Nobody told the Red Blades anything," she says. "The Red Blades can smell arrack through a floor." It does not help.`, darrut:`Darrut stands up and puts on his helm. "This," he says, "is the Guard's favourite kind of night."`, _:`The squad stands up.`})}${b41R({redblade:`\n\nRamin stands up beside the squad in his red scale, and the recruits see him, and the noise goes up.`, warlock:`\n\nKeth stands up, and the grandmother says, loud and clear in Malazan out of his mouth: "*Children.*" It does not help either.`})}

Fists, then. Staves. No one wants a dead recruit the night before the march.`,
      ch:[{t:'"Shields. No blades." Hold them.', go:()=>startBattle('b4_c1_brawl', {})},
          {t:'Tangle drops a smoker in the middle of them.', tag:'uses 1 smoker', req:()=>b4In('tangle') && (S.inv.smoker || 0) > 0, fx:()=>{ S.inv.smoker--; }, go:()=>startBattle('b4_c1_brawl', {pre:true})},
          {t:'Talk them down. ("The Red Blades took the drink, not us.")', check:['guile', 15],
            edges:id=>[id === 'tallow' && ['he was off the transports with half of them', 2], id === 'darrut' && ['he has talked down a hundred Aren drunks', 1], id === 'haddat' && ['she is the Chain to them, and Seven Cities', -2], id === 'redblade' && ['he is wearing red scale', -3]],
            near:{t:'Yes, but the ringleader has already swung once before he stops to listen, and somebody is holding their jaw.', fx:()=>{ const w = ROLL().who || 'sgt'; bruise(w, 3 + lvT()); }},
            go:'b4_c1_brawl_talked', fail:'b4_c1_brawl_fail'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c1_brawl_fail:()=>({sp:'The barracks yard', scene:'b4_aren_yard', txt:
`${by({sgt:'You talk', _:'{who} talks'})}, and some of the recruits listen, and then the ringleader throws his jar, and it breaks on somebody's shield, and the listening is over.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c1_brawl', {surprise:'e'})}]}),
    b4_c1_brawl_talked:()=>({sp:'The barracks yard', scene:'b4_aren_yard', txt:
`${by({tallow:`Tallow steps out in front of the squad, which nobody told him to do, and starts talking to the recruits one at a time, by name, the ones he came over with: you were sick all the way from Unta, I held your head; you owe me a copper. They stop. The ones he named stop first.`, darrut:`Darrut steps out, helm under his arm, and talks to them the way the Guard talks to a drunk crowd at the harbour gate, slow and bored and certain, and one by one they stop.`, _:`{who} steps out and talks, slowly, and one by one they stop.`})}

Not the ringleader. He looks round at the recruits who have stopped, and his face goes ugly, and he swings his bunk-leg at the nearest of the Third anyway, and a handful of them go with him, because they have come this far.`,
      ch:[{t:'Shields. Fewer of them now.', go:()=>startBattle('b4_c1_brawl', {surprise:'p'})}]}),
    b4_c1_brawl_after:()=>({sp:'The barracks yard', scene:'b4_aren_yard', fx:()=>{ S.f.b4_c1_brawlDone = 1; }, txt:
`The ringleader is sitting in the bunk-house doorway with his nose bleeding again and a provost's hand on his collar. The recruits are sitting where they fell, in the yard, nursing their hands and their heads and their pride, and nobody is dead, and nobody is going to be.

Radde walks along the row of them with his lantern, looking at each face, and then he opens the book, and writes, a long time. "Marks," he says, to nobody. "Too many marks." He turns to the Third. "No blades," he says. "I saw. I'll write that too."

He looks at the squad's bones, and at what is tied to them. "They'll not forgive you that," he says, "the ones who wanted to hit something. They'll forget it, though. Give them a month on the road. They'll forget anything." He shuts the book. "Sleep. The march is at dawn."${b41R({redblade:`\n\nRamin is wiping blood off his knuckles with great care. "My company will hear I fought recruits of the 10th with my fists," he says. "They will be very jealous."`, warlock:`\n\nKeth is sitting on the ringleader's bunk-leg. "*Children,*" the grandmother says again, satisfied.`})}`,
      ch:[{t:'The fire.', go:'b4_c1_yard'}]}),

    /* ---- dawn: the march ---- */
    b4_c1_dawn:()=>({sp:'Aren · dawn', scene:'b4_march', fx:()=>{ S.f.b4_c1_ph = 4; }, txt:
`Dawn. The gate comes open, and the company goes out of it in column, and down through the grey streets toward the north gate, and Aren comes out on its steps and roofs one more time to watch an army go.

Outside the north gate the Fourteenth is forming on the Aren Way: three legions, the 8th at the head, the 9th behind, the 10th, the wagons, the Wickans on their horses to the flanks with the Crow riding apart from the youths, the Red Blades in red, and somewhere far up at the head of it all, too far off to see, the Adjunct. Every soldier in it has a finger bone at the throat. In the grey light the whole army looks as if it has come out of the ground.

The Way goes north from the gate between the trees. ${b4Fresh() ? 'The squad knows this road. It walked the last of it the other way.' : b4Fallen().length ? 'The squad knows this road. It came down the last of it, once, the other way, and some of it did not get to the gate.' : 'The squad knows this road. It came down the last of it, once, the other way, all of it.'}

${b41Say({haddat:`Haddat walks at the front of the squad with the shield up. "North," she says, to herself. "Again."`, tangle:`Tangle counts the satchel. "Same as yesterday," he says. "Lovely."`, _:`The squad takes its place in the column.`})}${b4In('tallow') ? `\n\nTallow touches the bone at his throat, and then the oilcloth inside his shirt, and then he stops touching things and walks.` : ''}${b41R({redblade:`\n\nRamin walks with the squad, on foot, his horse with the company somewhere behind. "Lent," he says, cheerfully, to nobody. "Again."`, warlock:`\n\nKeth walks with the squad, and every few hundred paces turns his head to look for the Wickan youths on the flank. The grandmother says nothing. She is looking north.`})}`,
      ch:[{t:'North.', onward:true, go:()=>chapterEnd(1, S.f.b4_c1_key || 'grave')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
