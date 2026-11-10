/* ============ Book Nine, Chapter 6: Dust on the Horizon ============ */
/* The Letherii's last chapter: the day of the battle, seen from the escort's own stretch of the line (dod-canon correction 1, fix A; rule
   97: the Letherii's part is the game's, on ground canon doesn't name). The enemy is "the short-tails" in narration (rule 88), first seen
   by day as what looks like a dust-storm (WC23). Hard, NOT mortal: death checks run in every fight here.
   Phase 1 (S.f.b9_c6_ph), dawn: the line forms on a plain in the Wastes; the Sixth holds a stretch "from the cairn to the dry wash"; the
   dust on the horizon at first light; Finadd Ennic's word; Yelt's spare scale out of the train for the front rank (b9_c6_escortscale);
   the drovers at the train behind the line, where Brennet (or an old drover) shows how the train raises a wall of dust off the wagons
   (the trick, Raise the Dust, free); the tile-woman or Perrit at a shield laid on the plain (the reading, B9READ[6]); the fire
   (b9_c6_fire, before the battle). Phase 2, morning: the dust comes on; the line check (S.f.b9_c2_drilled +2) and the line
   (b9_c6_line, main, stage 2); the plate off a short-tail in front of the line (b9_c6_plate); the key from Ennic at noon, S.f.b9_c6_key:
   'line' (stay on the stretch for the afternoon: the gap with the next company, b9_c6_gap optional) or 'train' (back to the supply
   wagons, where short-tails have come round in the dust: b9_c6_train, survive 5; S.f.b9_c6_trainHeld; b9Ration(2); Ch 4's 'book' puts
   the train where it should be, an easier start). Phase 4, late: the line pulls back to a rise (b9_c6_dusk, survive 4). Phase 5, dusk on
   the rise: one line of news ("the foreigners' rearguard is still out there"); the Letherii's road, S.f.b9_lethRoad ('escort', 'adjunct',
   'home'; b9Faith('l') colours it), then the Witness beat; the end. B9CH6.fates holds one line per Letherii squadmate and road for Ch 7's
   finale (Book Seven's shape, B7CH6.fates). Notes: docs/dod-ch6-notes.md. */
/* FOR THE ARTIST (166b): names this file uses.
   Items: ART['item/b9_c6_escortscale'], ['item/b9_c6_plate'].
   Figures: b9_nahruk (the short-tail body; the engine's short-tails keep kind 'khell' for Blood-Iron and the engine test, so 166b draws
   'khell' as b9_nahruk while Book Nine is open); reused: b5_c1_ennic, b5_c1_clerk (Yelt), b5_c1_tilewoman, b9_c2_orla, b9_c2_saffa,
   b5_letherii (the escort), b9_c4_outrider.
   Backdrops: b9_line and b9_battle (160's, yours), and three this file adds: b9_c6_dawn (the fire behind the line at first light, a shield
   laid on the plain), b9_c6_wagons (the supply train at the line's back by day, dust over it), b9_c6_dusk (the rise at dusk, the new line,
   the train drawn in, far east the rearguard's dust lit from inside).
   Ground (TILEX): b9_c6_field (Ch 4's b9_c4_wastes underneath; 'L' the escort's shield line, 'S' a shield laid on the plain, ';' the plain
   in front of the line, 'd' the dry wash's lip). Battle 't': spare shields and spears driven into the ground. */

/* ---- small helpers (b96: Book Nine, Chapter Six) ---- */
const b96L = (id, n) => { if (S.loy && S.loy[id] != null && !(S.dead && S.dead[id])) loy(id, n); };
const b96Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b9In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b96If = (id, s) => b9In(id) ? (typeof s === 'function' ? s() : s) : '';
const b96Who = () => (ROLL() && ROLL().who) || 'sgt';
const b96Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b96Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b96V = (id, you, they) => id === 'sgt' ? you : they;
const b96Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 dawn, 2 the morning (the line), 3 the key's road (afternoon), 4 the pull-back, 5 dusk on the rise */
const b96Ph = () => S.f.b9_c6_ph || 1;
const b96Key = () => S.f.b9_c6_key || null;
const b96Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b9In(id));
const b96And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b96Road = () => b9LethRoad();
const b96Faith = () => b9Faith('l');
/* earlier chapters read, always with a default (B9KEY0) */
const b96Drilled = () => !!S.f.b9_c2_drilled || b9Key(2) === 'drill';
const b96Step = () => !!S.f.b9_c2_stepOk || !!(S.tricks && S.tricks.b9_c2_step);
const b96Booked = () => !!S.f.b9_c4_book || (b9Key(4) || 'book') === 'book';
/* who shows the drovers' dust: Brennet, walking or waiting with the train; else an old drover of the train */
const b96Brennet = () => !!TPL.brennet && !(S.dead && S.dead.brennet) && (S.f.b9_brennetDone === 1 || S.f.b9_brennetDone === 2 || b9In('brennet'));
const b96TeachNm = () => b96Brennet() ? 'Brennet' : 'An old drover';
const b96Ready = () => !!S.f.b9_c6_orders && !!S.f.b9_c6_scale;

/* ---- Raise the Dust: what the train's drovers do when raiders come at the wagons on dry ground. Drag a thornbush on a rope behind a team,
   drive the oxen round in a short ring, beat the ground with the tilt-poles, and the dust goes up off the plain in a wall that no bowman
   on the far side can see through. It copies the Cadre's Ward (Book Seven's b7_c6_ward): a 3×3 of dust within 5 that nothing shoots
   into, out of or through, enemies standing in it −2 to hit; 2 rounds, 3 from level 5. Not sorcery. v10.3: it strikes nobody, so it is
   free. Guarded by its own ability; no engine change. ---- */
Object.assign(TRICKS, {
  b9_c6_dust:{name:'Raise the Dust', ch:6, use:'fight', ab:'t_b9_c6_dust', where:'the supply train at the back of the escort\'s line, on the day the dust came',
    lore:'The train\'s drovers have a way with raiders on dry ground. A thornbush dragged on a rope behind a team, the oxen driven round in a short ring, the tilt-poles beating the ground, and the dust goes up off the plain in a wall the bowmen on the far side cannot see through. It was how the carting houses got wagons past the border forts\' archers, back when the carting houses did not want to be counted. The drovers say it is not a trick. It is just what the ground does when you ask it.',
    get fx(){ return `Once a fight: a 3×3 of dust within 5, for ${2 + lvAt(5)} rounds, raised off the ground the drovers' way. Nothing shoots into it, out of it or through it, and enemies standing in it are −2 to hit. Grows with level. Not sorcery: it never sputters. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b9_c6_dust:{name:TRICKS.b9_c6_dust.name, trick:'b9_c6_dust', aoe:1, range:5, smoke:true, darkness:true, free:true, desc:()=>TRICKS.b9_c6_dust.fx,
    run(u, x, y){ AUDIO.play('shadow'); sparks(x, y, 22, '#c8a878', .5);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (!solid(x + dx, y + dy)) B.smoke.push({x:x + dx, y:y + dy, until:B.round + 2 + lvAt(5), dark:true, g:'d' + B.turn + ':' + x + ',' + y});
      blog(`${u.name} raises the dust over the ${placeWord(B.def)} the drovers' way, and whatever was aiming on the other side loses what it was aiming at.`);
      updBattleUI(); afterAct(); }},
});

/* ---- borrowed pictures until the artist's file (166b) replaces them ---- */
{ const like = {b9_c6_dawn:'b9_line', b9_c6_wagons:'b9_wagons', b9_c6_dusk:'b9_c4_dusk'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b9_c6_field ??= (...a) => (TILEX.b9_c4_wastes || TILEX.b9_c3_road || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b9_c6_escortscale', 'b9_c2_carterscoat'], ['b9_c6_plate', 'b9_c4_bonewhistle']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the reading: a shield laid on the plain at dawn ---- */
B9READ[6] = {scene:'b9_c6_dawn', where:'a shield laid on the plain at dawn', set:'First light on a plain in the Wastes, the escort forming its line, and low on the northern sky a smear of brown that was not there last night.', back:'b9_c6_fire', backT:'Back to the fire.',
  say:{perrit:'"On a shield," Perrit says, and lays one flat on the dry grass behind the line. "The Holds are a long way down this morning." She looks north, once, and then not again. "Three tiles. Quick, Sergeant. I would like to know before it gets here."',
       tilewoman:'"Came up from the train," the old woman says, lowering herself to the shield on her stick. "Last time I read on a shield it was for a lot who stood at the river." She holds out a hand. "A dock. Before, not after. I learned that too."'}};

/* ---- the words this chapter adds to Book Nine's glossary ---- */
GLOSSX.dod.push(
  [6, 'The stretch', 'The piece of the escort\'s line the Sixth Company held on the day the dust came: from a cairn to a dry wash, on a plain in the Wastes nobody has named.', ()=>!!(S && S.f && S.f.b9_c6_orders)],
  [6, 'Raise the dust', 'The train\'s drovers\' way with archers on dry ground: thorn on a rope, oxen in a short ring, poles on the ground, and a wall of dust nobody can see through.', ()=>!!(S && S.f && S.f.b9_c6_dustTried)]);

/* 160's scenes keep their own captions; in this chapter the line's caption follows the day */
{ const sc = SCENES.b9_line, base = sc && sc.cap; if (sc) Object.defineProperty(sc, 'cap', {configurable:true, enumerable:true,
    get(){ if (!(S && S.book === 'dod' && S.chapter === 6)) return base; const f = S.f || {}, ph = f.b9_c6_ph || 1;
      return ph === 1 ? 'First light on a plain in the Wastes: the escort forming its line, shields grounded, and low on the northern sky a brown smear that was not there last night.'
        : !f.b9_c6_lineDone ? 'The escort\'s line, shields locked, and coming down off the north a wall of dust as high as the sky, with shapes in it taller than any soldier.'
        : 'The escort\'s line holding, the dust drifting back across the plain, and far off east the foreigners\' fight going on under its own brown cloud.'; }}); }

/* the fire is a roster fire (38c) */
ROSTER_FIRES.dod = ROSTER_FIRES.dod || {}; ROSTER_FIRES.dod[6] = ['b9_c6_fire'];

/* ---- the Letherii's fate pages, for Ch 7's finale (B9CH6.fates; one line each, as the brief asks; Book Seven's B7CH6.fates shape).
   The Letherii's half of the save is S while they play and S.th.l while the Third does (Ch 7). Each line reads right on all three roads.
   The 'escort' road is canon's (the brigades go where the Commander takes them); where that is, is never said (rule 85). ---- */
const b96Half = () => !S ? null : (S.book === 'dod' && (S.thread || 't') === 'l') ? S : ((S.th && S.th.l) || null);
const b96RoadOf = () => b9LethRoad() || 'escort';
const B96_FATE = {
  tobet:{escort:'Tobet stays with the Commander\'s brigades and goes where they go, counting his arrows every morning, and every morning there are enough.', adjunct:'Tobet goes east with the foreigners, and learns their crossbow at the halts, and goes back to the bow.', home:'Tobet goes home to Lether when there is a way home, and finds the field his grandfather borrowed against, and nobody left to say whose it is.'},
  thegg:{escort:'Thegg stays with the brigades, at the front of every line, which is where they were going to put him anyway.', adjunct:'Thegg goes east with the foreigners, and the heavies take one look at him and put him in their front rank, and he lets them.', home:'Thegg goes home to Lether and tells his mother\'s dead about the Wastes, in her tongue, at length.'},
  perrit:{escort:'Perrit stays with the brigades, reaching for the Holds every night, a little further down each time, and saying so.', adjunct:'Perrit goes east with the foreigners, whose mages cannot feel their warrens either, and they sit together in the evenings and do sums instead.', home:'Perrit goes home to Lether, where the Holds are nearer, and lays three tiles on her mother\'s table, and puts them away again.'},
  ammet:{escort:'Ammet stays with the brigades and the surgeons\' carts, and boils her linen every night, because the cure is water and time.', adjunct:'Ammet goes east with the foreigners, and their healers show her a word that closes a wound, and she shows them the needle.', home:'Ammet goes home to Lether and hangs a needle on a board by a canal bridge, and takes what people can pay.'},
  ilsa:{escort:'Ilsa stays with the brigades as the company clerk\'s second, and keeps the roll in a hand the files would have known.', adjunct:'Ilsa goes east with the foreigners and reads their orders for the Sixth before anybody else does, which they do not like and do not stop.', home:'Ilsa goes home to Lether, and burns nothing, and files nothing, and walks the canals in a coat that is not grey.'},
  sorvan:{escort:'Sorvan stays with the brigades and rides with the Bluerose outriders again, who have stopped calling him foot-soldier and miss it.', adjunct:'Sorvan goes east with the foreigners, who have very few horses, and finds himself in charge of all of them.', home:'Sorvan goes home to Lether on a remount nobody else would ride, and rides it north, toward the horse country.'},
  ruuk:{escort:'Ruuk stays with the brigades because they pay on the day, and names every bird in the Wastes in Faraed to anyone who will listen.', adjunct:'Ruuk goes east with the foreigners, because they are going somewhere he has not been, which he says is reason enough.', home:'Ruuk goes home, which for Ruuk is north of Lether and the hills, and does not say goodbye, and sends word that he is fine.'},
  brune:{escort:'Brune stays with the brigades, and turns her face west at every halt, toward a sea she cannot see, and says the words to the Shore.', adjunct:'Brune goes east with the foreigners, further from the sea than any Shake has gone, and keeps the fish-spear sharp anyway.', home:'Brune goes home to the coast with her fish-spear and no boat, and asks the Shore, politely, to find her one.'},
  pessa:{escort:'Pessa stays with the brigades, and keeps the boathook wrapped, and tells it daily that it is still a boathook.', adjunct:'Pessa goes east with the foreigners and teaches their sergeants canal cant, the very specific parts.', home:'Pessa goes home to the canals and finds a barge whose owner did not come back, and poles it north, and asks nobody.'},
  brennet:{escort:'Brennet stays with the train, which is where his name lives now, and every wagon in it still rolls.', adjunct:'Brennet goes east with the foreigners and their wagons, which squeak in a language he has to learn, and he learns it.', home:'Brennet takes his own name home to Lether, as he meant to, on the tailboard of the first wagon going that way.'},
  kaedra:{escort:'Kaedra stays with the brigades, out ahead with the outriders on foot, reading the ground for country nobody has mapped.', adjunct:'Kaedra goes east with the foreigners, past every edge of every map, to see what the middle looks like. She says it looks like more.', home:'Kaedra walks back west as far as her old fort, and looks at its gate, and keeps walking.'}};
const b96FateDefault = (id, r) => `${TPL[id] ? TPL[id].name : 'They'} ${r === 'home' ? 'goes home to Lether with the rest of the Sixth who wanted it' : r === 'adjunct' ? 'goes on east with the foreigners, with the rest of the Sixth' : 'stays with the Commander\'s brigades, with the rest of the Sixth'}.`;
const b96SgtFate = r => r === 'home' ? 'You take the Sixth home to Lether when there is a way home, every one of them who wants it, and the Finadd writes the names in his own hand.'
  : r === 'adjunct' ? 'You take the Sixth on east with the foreigners, into country nobody in Lether has a legend for, and the Finadd writes it down and does not ask why.'
  : 'You keep the Sixth with the Commander\'s brigades, wherever he takes them, because the Commander asked for soldiers who came back, and the Sixth keeps coming back.';
const B96FATES = {
  half:() => b96Half(),
  road:() => b96RoadOf(),
  key:() => (S && S.f && S.f.b9_c6_key) === 'train' ? 'train' : 'line',
  /* one squadmate's line (also for the waiting); the sergeant's line for 'sgt' */
  line(id){ const r = b96RoadOf(); return id === 'sgt' ? b96SgtFate(r) : (B96_FATE[id] ? B96_FATE[id][r] : b96FateDefault(id, r)); },
  /* every page, in order: walking, waiting, the fallen in Book Nine, the sergeant last. Each {id, k:'fate'|'gone', label, txt} */
  pages(){ const h = b96Half(); if (!h) return []; const dead = h.dead || {};
    const walking = (h.squad || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id]), camp = (h.camp || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id] && !walking.includes(id));
    const fell = Object.keys(dead).filter(id => id !== 'sgt' && TPL[id] && !dead[id].from);
    return [...walking.map(id => ({id, k:'fate', label:'The Sixth', txt:this.line(id)})), ...camp.map(id => ({id, k:'fate', label:'Waiting', txt:this.line(id)})),
      ...fell.map(id => ({id, k:'gone', label:'The fallen', txt:`${TPL[id].name} did not come off the Wastes with the Sixth${dead[id].where ? `: ${dead[id].where}` : ''}. The squad said the name at the fire on the rise.`})),
      {id:'sgt', k:'fate', label:'The sergeant', name:h.name || '', txt:b96SgtFate(b96RoadOf())}]; },
};

const B9CH6 = {
  title:B9CH[6], number:'Six',
  intro:{loc:'The Wastes', sub:'The escort\'s line · first light', scene:'b9_c6_dawn', cap:'First light on a plain in the Wastes, the escort forming its line, and low on the northern sky a smear of brown that was not there last night.',
    paras:[
`The escort has been told to form a line at first light, which it has done before, at the river, and nobody has said why this morning. The quartermasters have said the ration is down again. The outriders came in before dawn on blown horses and went straight to the officers' fires.`,
()=>{ const v = b96Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, Sixth Company, and the squad is ${v.length ? `${b96And(v)}, and you` : 'you, and a paybook'}. The foreigners are a mile off east under their own dust. The Commander's brigades are forming beside them. Behind the line the supply train is drawing in, wagon by wagon, as if it knew something.`; },
`Low on the northern sky, where there was nothing last night, there is a brown smear. It looks like a dust-storm. The outriders have been saying, quietly, that it is not one.`],
    go:'Into the line', node:'b9_c6_start'},

  areas:[
    /* 16 x 12 (b9_c6_field, day). The escort's stretch: ; the plain in front of the line (no walking)  L the shield line  . dry grass
       behind it  , the track along the line's back  m the cairn (the stretch's west end)  d the dry wash (its east end)  F the squad's fire
       S a shield laid on the plain (the tile-woman)  w the train's wagons at the back  o water barrels  x thorn  r stone */
    { id:'b9_c6_line', title:'The Wastes · the escort\'s line', sub:'The Sixth\'s stretch, from the cairn to the dry wash', hint:'Tap ground to move · tap a figure to talk · the line is north, the train south', decor:'b9_c6_field',
      map:[ "rrrrrrrrrrrrrrrr",
            "r;;;;;;;;;;;;;;r",
            "r;;;;;;;;;;;;;dr",
            "rmLLLLLLLLLLLLdr",
            "r..............r",
            "r..F....S......r",
            "r.........x....r",
            "r,,,,,,,,,,,,,,r",
            "r..............r",
            "r.ww..oo...ww..r",
            "r..............r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.,', triggers:{L:'b9_c6_shields', m:'b9_c6_cairn', d:'b9_c6_washend', F:'b9_c6_fire', S:'b9_c6_shield', w:'b9_c6_drovers', o:'b9_c6_barrels'}, start:{x:5, y:6},
      quest:()=>{ const ph = b96Ph(), f = S.f;
        if (ph === 1) return !f.b9_c6_orders ? 'The Finadd, at the line. He has the morning\'s orders.' : !f.b9_c6_scale ? 'Yelt, at the train behind the line. He is handing something out.' : 'The fire. Then into the line, before the dust gets here.';
        if (ph === 2) return !f.b9_c6_lineDone ? 'The line, north. It is coming.' : !b96Key() ? 'The Finadd. He has the noon\'s orders.' : 'The line.';
        if (ph === 3) return b96Key() === 'line' && !f.b9_c6_keyDone ? 'The line, north. The next company\'s stretch, east, is giving.' : 'The Finadd. The line is pulling back.';
        if (ph === 4) return 'The Finadd. The line is pulling back to the rise.';
        return 'On.'; },
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:6, y:4, node:()=>'b9_c6_ennic', fresh:()=> b96Ph() === 1 ? !S.f.b9_c6_orders : b96Ph() === 2 ? !!S.f.b9_c6_lineDone && !b96Key() : !!S.f.b9_c6_keyDone},
        {id:'yelt', name:'Yelt, at the train', kind:'b5_c1_clerk', x:9, y:8, node:()=>'b9_c6_yelt', show:()=>b96Ph() === 1, fresh:()=>!S.f.b9_c6_scale},
        {id:'brennet', name:'Brennet, with the drovers', kind:'brennet', x:12, y:8, node:()=>'b9_c6_drovers', show:()=>b96Ph() <= 2 && b96Brennet() && !b9In('brennet'), fresh:()=>!S.f.b9_c6_dustTried},
        {id:'drover', name:'The train\'s drovers', kind:'b5_letherii', x:13, y:8, node:()=>'b9_c6_drovers', show:()=>b96Ph() <= 2 && (b9In('brennet') || !b96Brennet()), fresh:()=>!S.f.b9_c6_dustTried},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:9, y:5, node:()=>'b9_c6_shield', show:()=>b96Ph() === 1, fresh:()=>!S.f.b9_c6_drawn && !S.f.b9_c6_noCard},
        {id:'orla', name:'Orla, at her water-cart', kind:'b9_c2_orla', x:5, y:8, node:()=>'b9_c6_orla', show:()=>b96Ph() === 1, fresh:()=>!S.f.b9_c6_orla},
        {id:'kaedra', name:'Kaedra, with the outriders', kind:'kaedra', x:13, y:4, node:()=>'b9_c6_waiting', show:()=>b96Ph() === 1 && S.f.b9_kaedraDone === 2 && !b9In('kaedra') && !(S.dead && S.dead.kaedra), fresh:()=>false} ] },

    /* 16 x 12 (b9_c6_field, day). The supply train at the line's back, the 'train' road: W the wagons drawn in  . grass  , the track  c
       Orla's water-cart  X oxen on a picket  o barrels  C ration crates  ; dust and open plain past the wagons (no walking) */
    { id:'b9_c6_train', title:'The Wastes · the supply train', sub:'The wagons at the line\'s back', hint:'Tap ground to move · tap a figure to talk · the dust is coming in from the east', decor:'b9_c6_field',
      map:[ "rrrrrrrrrrrrrrrr",
            "rWWWWWWWWWWWWW;r",
            "rW............;r",
            "rW.oo...CC....;r",
            "rW.........X..;r",
            "rW..c......X..;r",
            "rW,,,,,,,,,,,,;r",
            "rW............;r",
            "rW..oo....CC..;r",
            "rW............;r",
            "rWWWWWWWWWWWWW;r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.,', triggers:{W:'b9_c6_tr_wagon', o:'b9_c6_tr_barrels', C:'b9_c6_tr_crates', X:'b9_c6_tr_oxen', c:'b9_c6_tr_orla', ';':'b9_c6_tr_dust'}, start:{x:3, y:6},
      quest:()=> !S.f.b9_c6_trainDone ? 'The east side of the wagons. Something is moving in the dust.' : 'Back to the line. The Finadd\'s runner is waving.',
      npcs:[
        {id:'yelt', name:'Yelt, with the ration book', kind:'b5_c1_clerk', x:7, y:4, node:()=>'b9_c6_tr_yelt', fresh:()=>!S.f.b9_c6_trYelt},
        {id:'saffa', name:'Saffa, the field cook', kind:'b9_c2_saffa', x:5, y:7, node:()=>'b9_c6_tr_saffa', fresh:()=>!S.f.b9_c6_trSaffa},
        {id:'tilewoman', name:'The tile-woman, on a wagon', kind:'b5_c1_tilewoman', x:9, y:9, node:()=>'b9_c6_tr_tilewoman', fresh:()=>false},
        {id:'shapes', name:'Shapes in the dust', kind:'b9_nahruk', x:13, y:5, node:()=>'b9_c6_tr_dust', show:()=>!S.f.b9_c6_trainDone, fresh:()=>true} ] },

    /* 16 x 12 (b9_c6_field, dusk). The rise the line pulled back to: L the new line along the crest  ; the plain falling away north and
       east  . the rise's back  F the squad's fire  w the train drawn in  E the east end of the rise (the far fight)  B the Commander's
       banner, far down the line (west) */
    { id:'b9_c6_rise', title:'The Wastes · the rise', sub:'Dusk · the line pulled back', hint:'Tap ground to move · tap a figure to talk · the east end of the rise looks toward the foreigners', decor:'b9_c6_field',
      map:[ "rrrrrrrrrrrrrrrr",
            "r;;;;;;;;;;;;;;r",
            "rBLLLLLLLLLLLLEr",
            "r..............r",
            "r....F.........r",
            "r..........x...r",
            "r,,,,,,,,,,,,,,r",
            "r..............r",
            "r.ww..ww..ww...r",
            "r..............r",
            "r..............r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.,', triggers:{L:'b9_c6_newline', E:'b9_c6_edge', B:'b9_c6_banner', F:'b9_c6_fire', w:'b9_c6_eve_train'}, start:{x:4, y:6},
      quest:()=> !b96Road() ? 'The Finadd, by the fire. He has a question for every sergeant tonight.' : !(S.b9 && S.b9.wit && S.b9.wit.c6) ? 'The fire.' : 'The fire. Then night.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:7, y:4, node:()=>'b9_c6_ennic5', fresh:()=>!b96Road()},
        {id:'yelt', name:'Yelt, with the ration book', kind:'b5_c1_clerk', x:9, y:7, node:()=>'b9_c6_eve_yelt', fresh:()=>!S.f.b9_c6_eveYelt},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:12, y:7, node:()=>'b9_c6_eve_tilewoman', fresh:()=>false} ] } ],

  battles:{
    /* the line: the short-tails come out of the dust onto the escort's stretch. Hard, not mortal (death checks run). */
    b9_c6_line:{title:'The line', style:'b9_c6_field', warrenText:'Morning on the plain · dust to the sky, shields locked · the Holds thin and cold, and something pressing on them', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","........","...t....","........",".#....t.","........","........","..t..t..","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_escort',1,8],['b9_escort',6,8]],
      foes:[['b9_lnahruk',2,1],['b9_lnahruk',5,1],['b9_lnahrukcaster',4,0]], xp:380, after:'b9_c6_line_after',
      preText:()=>`They come out of the dust walking. That is the first wrong thing. They are taller than any soldier on the line, armoured in dark plate from the crown to the heel, with short thick tails and heads that do not turn to look at anything, and they walk into the escort's shields as if the shields were grass.${b96If('thegg', `\n\nThegg sets his feet. "Taller than me," he says. He sounds personally offended.`)}${S.f.b9_c6_dustOk ? `\n\nAt the back of one of them a light is gathering, pale, in the hands. The dust, then. Put it where that one is looking.` : ''}`,
      stage2:{title:'The second rank', xp:170,
        text:()=>`The first of them are down, or gone back into the dust as if called. The line has not moved. Then the dust in front of the stretch goes dark from the inside, and a bigger one comes out of it, plate on plate, a blade as long as a door, and another behind it.${b96If('kaedra', `\n\nKaedra has an arrow on the string. "The joints," she says. "Under the arm. The plate doesn't go all the way."`)}${b96If('brennet', `\n\nBrennet has the wagon-pin in both hands and his back to the train. "Not past here," he says, to nobody, and to all of them.`)}`,
        map:["........","...t....","........","..#..t..","........","........",".t....t.","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b9_lnahrukbrute',3,1],['b9_lnahruk',5,1]]} },
    /* the 'train' road: short-tails come round in the dust at the wagons. Survive five rounds until the escort's reserve comes up. */
    b9_c6_train:{title:'The wagons', style:'b9_c6_field', warrenText:'Afternoon at the train · dust over the wagons, oxen bellowing · the Holds thin', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:5, text:'Hold the wagons five rounds, until the reserve comes up. Nothing gets to the water.'},
      map:["........","........","..t..t..","........",".t....t.","........","..t..t..","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_escort',6,8]],
      foes:[['b9_lnahruk',2,0],['b9_lnahruk',5,0]], xp:200, after:'b9_c6_train_after',
      waves:[{round:3, foes:[['b9_lnahruk',1,0]], text:'Another out of the dust on the wagons\' flank, walking, as if it had all day.'}],
      preText:()=>`They come out of the dust on the east side of the wagons, two of them, walking, and the oxen smell them before anybody sees them and start to bellow and pull at the picket.${b96Booked() ? ' The train is where Yelt\'s book says it is, drawn in tight, and the squad is between it and them.' : ' The train is strung out along the track, and the squad is running to get between it and them.'}${b96If('brennet', `\n\nBrennet is already among the oxen, a hand on each neck. "Hold," he tells them. "Hold." They do not, quite.`)}`},
    /* the 'line' road's afternoon: two short-tails come through where the next company's stretch gave (optional) */
    b9_c6_gap:{title:'The gap', style:'b9_c6_field', warrenText:'Afternoon on the line · dust, a gap in the shields · the Holds thin', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","........","..t.....","........",".....t..","........","...#....","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_escort',6,8]],
      foes:[['b9_lnahruk',3,0],['b9_lnahrukcaster',5,1]], xp:200, after:'b9_c6_gap_after',
      preText:()=>`The next company's stretch has given, a dozen paces of it, and two of them are coming through the hole sideways, toward the Sixth's flank, walking.${b96If('tobet', `\n\nTobet draws to the ear. "The one at the back," he says. "Its hands are lighting."`)}`},
    /* the pull-back: the line goes back to the rise in step while the short-tails follow. Survive. Near certain. */
    b9_c6_dusk:{title:'Back to the rise', style:'b9_c6_field', warrenText:'Late on the plain · the light going red, the line stepping back · the Holds thin', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Step back with the line four rounds, to the rise. Keep the shields together.'},
      map:["........","........","...t....","........","......t.","........",".t......","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_escort',1,8],['b9_escort',6,8]],
      foes:[['b9_lnahruk',3,0]], xp:100, after:'b9_c6_dusk_after',
      waves:[{round:2, foes:[['b9_lnahrukcaster',6,0]], text:'One more out of the dust behind, slower, its hands lit pale.'}],
      preText:()=>`The line goes back a step at a time, the whole escort, shields up and facing front, the way the Malazan sergeant drilled it on a dry field outside Letheras. Out of the dust in front, one of them follows. It does not hurry. It never has.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b9_c6_escortscale:{name:'Escort scale', slot:'armour', role:'mail', who:null, ac:2, hp:3,
      line:'A shirt of Letherii scale, bronze leaves on a leather back, from the train\'s spare stores for the front rank. It was made for a Whitefinder parade and has never been on one. Yelt signed it out to the Sixth in his own hand and wrote, in the margin, that he expected it back.'},
    b9_c6_plate:{name:'A short-tail\'s plate', slot:'trinket', role:'any', who:null, hp:3,
      line:'A plate of dark armour the size of a hand, broken off something much bigger in front of the Sixth\'s stretch. It is too heavy for what it is and colder than the sun should let it be. No one in the escort can say what it was made of. The squad carries it for luck, because it is too heavy to carry for anything else.'} },

  scenes:{
    b9_c6_dawn:{loc:'The Wastes', sub:'The escort\'s line · first light', cap:'First light behind the escort\'s line, a fire on dung and thorn, a shield laid flat on the dry grass, and low on the northern sky a smear of brown.', amb:'explore'},
    b9_c6_wagons:{loc:'The Wastes', sub:'The supply train · the line\'s back', cap:'The escort\'s supply train drawn in behind the line, oxen on their pickets, water barrels lashed three high, and dust coming in over the wagons from the east.', amb:'battle'},
    b9_c6_dusk:{loc:'The Wastes', sub:'The rise · dusk', cap:'Dusk on a low rise, the escort\'s new line along its crest, the train drawn in behind, and far off east a brown cloud lit from inside by what is burning under it.', amb:'explore'} },

  end:{
    line:['The stretch held', 'On the day the dust came, the Sixth Company held its stretch of the escort\'s line from the cairn to the dry wash. Things taller than any soldier walked out of the dust onto the shields, and the shields did not go back. In the afternoon, when the next company\'s stretch gave, the Sixth stayed where it was put. At dusk the whole line stepped back to a rise together, and the Sixth chose its road by the fire, with the foreigners\' rearguard still fighting far off in the dark.'],
    train:['The wagons came through', 'On the day the dust came, the Sixth Company held its stretch of the escort\'s line from the cairn to the dry wash. Things taller than any soldier walked out of the dust onto the shields, and the shields did not go back. In the afternoon, when the dust came round behind the line, the Sixth went back to the supply train and stood between it and what came out of the dust, and nothing got to the water. At dusk the whole line stepped back to a rise together, and the Sixth chose its road by the fire.'] },
  endScene:'b9_c6_dusk',
  endCap:()=> b96Key() === 'train' ? 'Dusk on the rise, the train drawn in behind the new line, every wagon still on its wheels, and far off east the foreigners\' fight going on into the dark.' : 'Dusk on the rise, the escort\'s new line along its crest, and far off east the foreigners\' fight going on into the dark.',
  tease:'Next: the Third. The same day\'s end, in the heavies\' rearguard, and into the dark.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b9_c6_lineDone) x.push('The short-tails came out of the dust onto the escort\'s line, and the Sixth\'s stretch held.');
    if (f.b9_c6_key === 'line') x.push(f.b9_c6_gapDone ? 'In the afternoon two of them came through the next company\'s gap, and the Sixth met them there.' : 'In the afternoon the Sixth closed the next company\'s gap with its own shields.');
    if (f.b9_c6_trainHeld) x.push('In the afternoon the Sixth held the supply train, and nothing got to the water.');
    if (f.b9_c6_dustOk) x.push(b96Brennet() ? 'Brennet showed the squad how the drovers raise the dust off a train.' : 'An old drover showed the squad how the train raises the dust.');
    if (f.b9_c6_plateGot) x.push('The squad carries a plate off a short-tail, for luck.');
    if (f.b9_lethRoad === 'escort') x.push('The Sixth means to stay with the Commander\'s brigades, wherever he takes them.');
    if (f.b9_lethRoad === 'adjunct') x.push('The Sixth means to go on east with the foreigners.');
    if (f.b9_lethRoad === 'home') x.push('The Sixth means to go home to Lether, when there is a way home.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b9_c6_lineDone && 'The short-tails: taller than any soldier, armoured in dark plate, short thick tails. They walk. Some of them have light in their hands.',
    f.b9_c6_dustOk && 'Raising the dust: thorn on a rope behind a team, oxen in a short ring, poles on the ground. Nothing on the far side can see through it.',
    f.b9_c6_key && (f.b9_c6_key === 'line' ? 'The Sixth stayed on its stretch through the afternoon.' : 'The Sixth went back to hold the supply train through the afternoon.'),
    f.b9_c6_news && 'At dusk the foreigners\' rearguard was still out there, fighting, under its own dust.',
    f.b9_lethRoad && ({escort:'The sergeant told the Finadd the Sixth stays with the Commander\'s brigades.', adjunct:'The sergeant told the Finadd the Sixth goes on east with the foreigners.', home:'The sergeant told the Finadd the Sixth goes home, when there is a way home.'})[f.b9_lethRoad],
    'The Sixth Company, in the Commander\'s escort, on the day the dust came.'].filter(Boolean); },

  fates:B96FATES,

  dlg:{
    /* ======== phase 1: first light, the line forming ======== */
    b9_c6_start:()=>({sp:'The escort\'s line', scene:'b9_c6_dawn', fx:()=>{ S.f.b9_c6_ph = S.f.b9_c6_ph || 1; }, again:()=>'The escort\'s line forming at first light, and the brown smear on the northern sky.', txt:
`The escort forms its line in the grey before the sun, company by company along a low swell of plain, shields grounded, spears up. The Sixth has a stretch of it: from an old cairn on the west to the lip of a dry wash on the east. Behind the line the supply train is drawing in, wagon by wagon.

The Sixth has the only cook-fire lit, because the Sixth lit one before anybody said not to.${b96Say({thegg:`\n\nThegg is eating his biscuit standing up, looking north. "That," he says, "is not a storm." He chews. "Storms move."`, tobet:`\n\nTobet is counting his arrows, and then counting them again, which he does not usually do.`, _:''})}${b96If('kaedra', `\n\nKaedra has climbed onto a wagon's tongue to see further. "It's keeping its shape," she says. "Dust doesn't keep its shape. Feet do."`)}

Finadd Ennic is walking the line with his slate. The brown smear on the northern sky is longer than it was an hour ago, and it is not getting thinner.`,
      ch:[{t:'The Finadd.', go:'b9_c6_ennic'},
          b9ReadChoice(6),
          {t:'Walk the stretch.', go:()=>startExplore()}]}),
    b9_c6_read:()=>b9ReadOffer(6),
    b9_c6_card:()=>b9ReadCard(6),

    /* Finadd Ennic, by phase */
    b9_c6_ennic:()=>{ const ph = b96Ph();
      if (ph === 2 && S.f.b9_c6_lineDone && !b96Key()) return DLG.b9_c6_key();
      if (ph === 2) return {sp:B5_FINADD.name, scene:'b9_line', txt:
`Finadd Ennic is standing behind the Sixth's stretch with his slate under his arm, looking at the dust. "Sergeant," he says. "Your stretch. Your line." He does not look away from the north. "I find I have nothing to add."`,
        ch:[{t:'Back to the line.', go:()=>startExplore()}]};
      if (ph >= 3) return S.f.b9_c6_keyDone ? DLG.b9_c6_pullback() : {sp:B5_FINADD.name, scene:'b9_line', txt:
`"${b96Key() === 'train' ? 'The wagons, Sergeant. Yelt is waiting, and so is whatever is in the dust behind him.' : 'Your stretch, Sergeant. The next company is giving. Do not let it give into you.'}"`,
        ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:'b9_line', fx:()=>{ S.f.b9_c6_orders = 1; }, again:()=>`${B5_FINADD.short}, with his slate, looking north. "From the cairn to the wash, Sergeant."`, txt:
`Finadd Ravel Ennic has shaved this morning, for the first time in many days, which in Ennic is an announcement. He has the slate under his arm and the dust in the creases of his face.

"Sergeant. The Sixth holds from the cairn to the dry wash." He points along the line with the slate. "The Commander's brigades are in line beside the foreigners, a mile of us, and the foreigners a mile of them east. Something is coming down off the north." He looks at it. "The outriders say it is not a storm. The outriders have been saying so since the middle of the night, at volume."

"The quartermasters have cut the ration again. Yelt is at the train with spare scale for the front rank and a face like a bill." He tucks the slate away. "Eat what you have. Drink what you have. Then stand where I have put you."${b96Drilled() ? `\n\nHe glances at the squad. "The Malazan sergeant said to stand like that, when it came," he says. "I am told he was talking to the Sixth."` : ''}${b96If('perrit', `\n\nPerrit is looking north with her face very still. "The Holds are pressed," she says, when he has gone on. "Something out there is leaning on them."`)}`,
        ch:[{t:'"Is it a storm, Finadd?"', req:()=>!S.f.b9_c6_storm, go:'b9_c6_ennic_storm'},
            {t:'"From the cairn to the wash."', go:()=>startExplore()},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c6_ennic_storm:()=>({sp:B5_FINADD.name, scene:'b9_line', fx:()=>{ S.f.b9_c6_storm = 1; }, txt:
`Ennic considers the question with care.

"Every legend in Lether about the Wastes ends with something coming out of them," he says. "The clerks used to say that was because the legends were written by people who had come home, and needed an ending." He looks at the brown smear. "I would like it to be a storm, Sergeant. I would like that very much." He nods to the squad. "Stand where I have put you anyway."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* Yelt at the train: spare scale for the front rank */
    b9_c6_yelt:()=>({sp:'Yelt', scene:'b9_c6_wagons', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c6_scale) { S.f.b9_c6_scale = 1; gain('b9_c6_escortscale'); } }, txt:
`Yelt is at the tailboard of a stores wagon with the ration book under one arm and a shirt of Letherii scale over the other, bronze leaves on a leather back, the kind made for parades.

"Spare scale," he says. "From the stores, for the front rank. One a squad." He holds it out to the Sixth and writes it in the book while it is still in his hand. "It was made for a Whitefinder parade. It has never been on one. I expect it back." He looks up. "With you in it, if the Sixth can manage it."

"The ration is cut again. ${b96Booked() ? 'The count is true, at least. It is cut from what is really in the wagons.' : 'I have asked them to cut it from what is really in the wagons. They have asked me how I know what is in the wagons.'}" He closes the book on his finger. "Whatever that is, Sergeant, it is between the train and the water."${b96If('brennet', `\n\nBrennet is looking past the wagons at the dust. "The oxen smell it," he says. "They don't like it."`)}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the drovers at the train: the trick, Raise the Dust */
    b9_c6_drovers:()=>{ const tr = S.f.b9_c6_dustTried, br = b96Brennet();
      return {sp:br ? 'Brennet' : 'An old drover', scene:'b9_c6_wagons', again:()=> S.f.b9_c6_dustOk ? 'The drovers at the train, thorn and rope ready.' : 'The drovers at the train, getting a thornbush onto a rope.', txt: tr ?
`${br ? 'Brennet' : 'The old drover'} is with the drovers at the back of the train, a thornbush on a rope beside him and a tilt-pole across his shoulders. "When it comes to the wagons," he says, "we'll raise it. Same as you can, now${S.f.b9_c6_dustOk ? '' : ', or nearly'}."` :
`At the back of the train the drovers have stopped pretending to be busy and are doing something useful instead: cutting thornbushes off the plain and tying them on ropes, and laying tilt-poles out on the ground by the oxen.

${br ? `Brennet is among them, the wagon-pin through his belt. "Carting houses' way," he says, when he sees the squad. "Before the emperor's law, when we didn't want the border forts counting us. Archers on a ridge, wagons on dry ground." He holds up a rope with a thornbush on it. "Drag this behind a team. Drive the oxen round short. Beat the ground. The dust goes up like a wall."` : `An old drover with a face like a boot is among them. "Carting houses' way," he says, when he sees the squad. "Archers on a ridge, wagons on dry ground. Drag thorn behind a team, drive the oxen round short, beat the ground with the poles, and the dust goes up like a wall." He spits. "Never needed a mage for it. Good thing, out here."`}

"Nothing shoots through it," ${br ? 'Brennet' : 'he'} says. "Not a bow, and not whatever the light in their hands is, I'd bet. Want it?"`,
        ch:[{t:'Learn it the drovers\' way: the thorn, the ring, the poles, and where the wall goes up.', check:['wits', 18], trick:'b9_c6_dust', req:()=>!tr, fx:()=>{ S.f.b9_c6_dustTried = 1; },
              edges:id=>[id === 'brennet' && ['nine years of the carting houses\' dust on the border roads', 2], S.tricks && S.tricks.b7_c6_ward && ['the cadre\'s ward under the ridge: put the grey where the bows are looking', 2], id === 'sorvan' && ['a lancer knows what a troop\'s dust hides', 1], id === 'kaedra' && ['the forts\' scouts read riders by their dust before they see them', 1], id === 'ruuk' && ['in Faraed the herders hide a herd in its own dust', 1], id === 'sgt' && ['you saw the Malazans come up out of the river under their own smoke', 1], id === 'thegg' && ['he raises dust walking, and has never once meant to', -1], id === 'ilsa' && ['a clerk keeps the dust off the page, not on it', -1]],
              go:'b9_c6_dust_ok', fail:'b9_c6_dust_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c6_dust_ok:()=>({sp:b96TeachNm(), scene:'b9_c6_wagons', fx:()=>{ S.f.b9_c6_dustOk = 1; }, txt:
`It takes a team of two oxen, a thornbush, three tilt-poles and a good deal of shouting at the back of the train. Then ${by({brennet:'Brennet drives the team round short with one hand on the yoke and the other on the rope, and', sorvan:'Sorvan sees where the wind is going before anybody else and puts the ring there, and', kaedra:'Kaedra stands off and calls where the wall is thin, and', _:'{who} gets the ring right, short and tight, and'})} the dust comes up off the plain in a wall as high as a wagon tilt, and the drovers on the far side of it vanish.

"There," ${b96Brennet() ? 'Brennet' : 'the old drover'} says, out of the dust, coughing. "That's all it is. You don't need oxen in a fight. Feet do it. Shields do it. Ask the ground."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b9_c6_dust_no:()=>({sp:b96TeachNm(), scene:'b9_c6_wagons', txt:
`The oxen go round, and the thorn drags, and the poles come down, and the dust goes up in a brown puff and blows away north toward the other dust as if to join it.

"Wind," ${b96Brennet() ? 'Brennet' : 'the old drover'} says. "You fought the wind. Never fight the wind." He coils the rope. "When it comes to the wagons, we'll do it for you."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the reading's place: a shield on the plain, the tile-woman */
    b9_c6_shield:()=>({sp:'The tile-woman', scene:'b9_c6_dawn', again:()=>'The tile-woman by the shield on the grass, her bag of bone tiles on her knee.', txt:
`The old woman who reads tiles for the escort has come up from the train on her stick and is sitting on a ration crate beside a shield somebody has laid flat on the dry grass behind the line. Her oiled bag is on her knee. She is looking north, at the dust, the way she looks at a customer who will not pay.

"Never read for a battle before it started," she says. "Only after. After is easier. Everybody knows how it came out."${b96If('perrit', `\n\nShe looks at Perrit. "Your cadre girl's going to want to do it herself," she says. "Let her. Hers are cold. Mine are cold. It's that kind of morning."`)}`,
      ch:[b9ReadChoice(6),
          {t:'Back to the line.', go:()=>startExplore()}]}),

    /* Orla: water at dawn */
    b9_c6_orla:()=>({sp:'Orla', scene:'b9_c6_wagons', fx:()=>{ S.f.b9_c6_orla = 1; }, txt:
`Orla has brought her water-cart up behind the line, which nobody told her to do, and is giving out the dawn cup herself, a cup to a soldier, with the cudgel across her lap.

"Drink it now," she says. "Not later. Later you won't have hands." She fills the Sixth's skins without being asked, every one, and does not write it down. "Yelt can count it after." She looks north. "If there's an after, he'll want to."${b96If('ammet', `\n\nAmmet asks for a skin for the surgeons' cart. Orla gives her two.`)}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* Kaedra, waiting with the outriders (six walk) */
    b9_c6_waiting:()=>({sp:'Kaedra', scene:'b9_line', txt:
`Kaedra is with the outriders at the east end of the stretch, on foot among the horses, the horn bow strung. "They'll put me on the flank," she says. "With the riders. Riders don't look at the ground." She looks north. "That doesn't walk like anything I've tracked."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the line, the cairn, the wash, the barrels */
    b9_c6_shields:()=>{ const ph = b96Ph(), done = !!S.f.b9_c6_lineDone;
      if (ph === 2 && !done) return DLG.b9_c6_arrive();
      if (ph === 3 && b96Key() === 'line' && !S.f.b9_c6_keyDone) return DLG.b9_c6_afternoon();
      return {sp:'The line', scene:ph >= 2 ? 'b9_line' : 'b9_c6_dawn', txt: ph === 1 ?
`The shields are grounded along the stretch, rim to rim, a spear behind each one, and the soldiers of the Sixth's company sit on their heels behind them eating biscuit and looking north.

The brown smear on the northern sky has a top to it now, a long flat top like a wall's, and under it the plain has gone a colour plains do not go.` :
`The line along the stretch, shields locked, the dust drifting back across the plain in front of it. In the grass between the line and the dust there are dark shapes that do not move, and the escort does not go out to them.${S.f.b9_c6_plateGot ? '' : ' One of them, nearer, is only a piece of something.'}`,
        ch:[{t:'The piece of something, a pace in front of the shields.', req:()=>done && !S.f.b9_c6_plateGot, go:'b9_c6_plate'},
            {t:'Back.', go:()=>startExplore()}]}; },
    b9_c6_cairn:()=>({sp:'The cairn', scene:b96Ph() === 1 ? 'b9_c6_dawn' : 'b9_line', txt:
`An old cairn of grey stones at the west end of the Sixth's stretch, lichened and older than Lether. The Finadd picked it as a mark because it was the only thing on the plain that was there before the escort. It will be there after.${b96Say({perrit:`\n\nPerrit puts a hand on it. "Cold," she says. "Colder than this morning." She takes the hand away.`, _:''})}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_washend:()=>({sp:'The dry wash', scene:b96Ph() === 1 ? 'b9_c6_dawn' : 'b9_line', txt:
`The lip of a dry wash at the east end of the stretch, falling away into a bed of sand and stones. Past it the next company's stretch begins, and past that the next, a mile of shields, and then the foreigners under their own dust.${b96If('kaedra', `\n\nKaedra looks down into the wash. "If they come round, they'll come up this," she says. "Things that walk like that don't like climbing." She thinks. "I'd like to be wrong."`)}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_barrels:()=>({sp:'The train', scene:'b9_c6_wagons', txt:
`Water barrels, lashed three high on the wagons at the back of the line, each with its number burned in the stave and its line in Yelt's book. On the end of one somebody has written in chalk, in a soldier's hand: <em>still not for washing</em>. Under it, in another: <em>today especially</em>.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* ======== the fire: dawn (phase 1), the day (2-4, cold), dusk on the rise (5). The games pass wraps this node: keep the id ======== */
    b9_c6_fire:()=>{ const ph = b96Ph(), eve = ph === 5, day = ph >= 2 && ph <= 4;
      return {sp:'The squad\'s fire', scene:eve ? 'b9_c6_dusk' : day ? 'b9_line' : 'b9_c6_dawn', html:rationsHTML(),
        again:()=> eve ? 'The squad\'s fire on the rise, small, on the last of the dung.' : day ? 'The squad\'s fire, out, behind the line.' : 'The squad\'s fire behind the line, the only one lit, at first light.', txt:
`${eve ? `The squad's fire on the back of the rise, small, on the last of the dung and a broken wagon tilt-pole, with the new line along the crest above it and the train drawn in below. The plain is going red and then grey. Far off east there is a glow under the foreigners' dust that is not the sunset.` : day ? `The squad's fire behind the line is out, kicked over when the dust came. The kit is still round it where the squad left it.` : `The squad's fire behind the line is the only one lit, a small one on dung and thorn with the ring of stones round it that the squad carries from camp to camp. The light is grey and getting gold. To the north the brown smear has a top to it now.`}${b96If('kaedra', `\n\nKaedra sits a little back from the fire, on the ground, facing north.`)}${b96If('brennet', `\n\nBrennet has his back to a wagon wheel and one ear toward the oxen.`)}`,
        ch:[...(ph === 1 ? [b9ReadChoice(6)] : []),
            {t:'Sit a while. Let the squad rest.', req:()=>!day && !S.f[eve ? 'b9_c6_rest5' : 'b9_c6_rest1'], fx:()=>{ S.f[eve ? 'b9_c6_rest5' : 'b9_c6_rest1'] = 1; rest(eve ? 'The squad sits by the fire on the rise. The aches stay, mostly. The cuts close.' : 'The squad sits by the fire at first light. Boots laced, straps checked, blisters seen to.'); }, go:'b9_c6_fire_rest'},
            {t:'Talk with the squad.', go:'b9_c6_fire_talk'},
            {t:'"What are we walking it for?"', req:()=>eve && !!b96Road() && !(S.b9 && S.b9.wit && S.b9.wit.c6), go:'b9_c6_witness'},
            {t:'Into the line.', req:()=>ph === 1 && b96Ready(), onward:true, go:'b9_c6_toline'},
            {t:'Night.', req:()=>eve && !!b96Road(), onward:true, go:'b9_c6_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c6_fire_rest:()=>({sp:'The squad\'s fire', scene:b96Ph() === 5 ? 'b9_c6_dusk' : 'b9_c6_dawn', txt: b96Ph() === 5 ?
`A while, then, on the back of the rise, with the line above and the train below and the glow far off east going on.

${b96Say({ammet:`Ammet goes round the squad with her satchel and the last of the clean linen. "Hold still," she says, to each of them in turn, and they do.`, perrit:`Perrit sits with her palm flat on the ground. "Further down than this morning," she says. "Much further." She opens her eyes. "Rest anyway. That still works."`, _:'Some of them sleep sitting up. The rest watch the glow.'})}` :
`A while by the fire at first light, with the line forming above and the dust coming on.

${b96Say({ammet:`Ammet goes round the squad checking straps and boot-laces, which is not a surgeon's work and she does it anyway. "A loose strap," she says, "is a wound waiting." She tightens Thegg's twice.`, tobet:`Tobet waxes his bowstring and then waxes it again. "Something to do with the hands," he says.`, _:'Nobody sleeps. They eat what there is, slowly.'})}`,
      ch:[{t:'Back to the fire.', go:'b9_c6_fire'}]}),
    b9_c6_fire_talk:()=>{ const eve = b96Ph() === 5, ln = [];
      if (b9In('tobet')) ln.push(eve ? `Tobet is counting his arrows. "Eleven," he says. "I started with forty." He puts them away. "That's a better count than some."` : `Tobet is sitting on his heels with his tally-stick out. "The paybook says I owe the house nothing," he says. "The quartermasters say the brigade owes the Wastes a ration." He looks north. "I don't know who we'll owe for that."`);
      if (b9In('thegg')) ln.push(eve ? `Thegg is holding his shield on his knee, looking at the dents. "The Malazan sergeant said stand like that when it comes," he says. "It came." He runs a thumb over a dent. "We stood."` : `Thegg has his shield across his back and his hands round his cup. "My mother said the Wastes had nothing in them," he says. He looks north. "She was wrong in a new way."`);
      if (b9In('perrit')) ln.push(eve ? `Perrit is turning a tile over in her fingers and not looking at it. "The light in their hands," she says. "That wasn't the Holds. It wasn't any warren I've ever reached for." She puts the tile away. "I don't want to know what it was. I'd like to know anyway."` : `Perrit is very pale. "Something out there is pressing on the Holds," she says, "like a hand on a drum." She looks at her own hands. "I can feel it from here. I'd rather not."`);
      if (b9In('ammet')) ln.push(eve ? `Ammet is boiling her needles in a pot no bigger than a fist. "The surgeons' carts went back along the line all day," she says. "I didn't count. One of us should." She watches the pot. "Not me."` : `Ammet is laying out her linen and her needles on a clean cloth, in order. "Before," she says, "is when you get to do it neatly."`);
      if (b9In('ilsa')) ln.push(eve ? `Ilsa is writing in a small book by the firelight. "The files would want to know what happened today," she says. "They won't ask." She keeps writing. "I'll know where to find it."` : `Ilsa is watching the officers' tents along the line. "When they stop sending runners," she says, "it means they know. When they send too many, it means they don't." She counts. "Too many."`);
      if (b9In('sorvan')) ln.push(eve ? `Sorvan has been along the line to the outriders. "They rode the flank all day," he says. "They say the foreigners' horse went in at the end, far east, a great many of them." He looks at the glow. "They didn't say how many came out."` : `Sorvan is oiling his blue scale plate by plate, fast. "The outriders' horses wouldn't go near it," he says. "That's what they told the officers. The horses knew before they did."`);
      if (b9In('ruuk')) ln.push(eve ? `Ruuk is lying on his back on the rise, looking up. "In Faraed," he says, "we would have run." He grins at the first stars. "Lether doesn't run. I've noticed. I'm still deciding about it."` : `Ruuk is squinting north. "In Faraed," he says, "we have a word for a thing that walks out of a storm." He thinks. "We don't say it. It brings them."`);
      if (b9In('brune')) ln.push(eve ? `Brune has her face turned west, toward the sea she cannot see. "I said the words to the Shore all day," she says. "Between." She pulls her knees up. "Something heard. Or I'm here anyway."` : `Brune is rubbing dust out of her eyes. "It's in everything," she says. "Even the water." She drinks hers anyway. "Even the sea, by now, probably."`);
      if (b9In('pessa')) ln.push(eve ? `Pessa has the boathook across her knees, unwrapped. "It went under the plate," she says. "In the joint. Like a canal-boat's hook in a sluice." She pats it. "It's still a boathook. It's had a day."` : `Pessa is scowling north. "I joined the army to get out of a press-gang," she says. "I'd like that written down somewhere before this."`);
      if (b9In('brennet')) ln.push(eve ? `Brennet is listening to the train below. "Every wagon still rolls," he says. "${b96Key() === 'train' ? 'Every one. I counted them twice.' : 'The drovers sent word. Every one.'}" He leans back on the wheel. "Free means you can say yes. I'm glad of the yes I said."` : `Brennet is eating his biscuit with one ear toward the oxen. "They've gone quiet," he says. "They don't go quiet." He finishes the biscuit. "I'd rather they bellowed."`);
      if (b9In('kaedra')) ln.push(eve ? `Kaedra sits outside the light facing the dark plain. "The forts' maps stopped at the ridge," she says. "Today I found out what's past it." She looks at the glow far off east. "I'm still going to look."` : `Kaedra is sitting facing north with the horn bow strung. "They don't leave spoor like anything that lives out here," she says. "The ground's afraid of them." She thinks. "So am I. I'll still shoot."`);
      return {sp:'The squad\'s fire', scene:eve ? 'b9_c6_dusk' : b96Ph() === 1 ? 'b9_c6_dawn' : 'b9_line', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b9_c6_fire'}]}; },

    /* the way on from dawn: into the line */
    b9_c6_toline:()=>({sp:'The escort\'s line', scene:'b9_c6_dawn', txt:
`The sun comes up gold on the left and turns the brown wall on the northern sky the colour of a bruise. The Finadd's whistle goes along the stretch. The soldiers of the Sixth's company stand up behind their shields, all together, and lift them, and the sound is one sound.

You put the fire out with your boot.`,
      ch:[{t:'Into the line.', onward:true, fx:()=>{ S.f.b9_c6_ph = 2; }, go:()=>{ startExplore('b9_c6_line'); talk('b9_c6_arrive'); }},
          {t:'Not yet.', go:'b9_c6_fire'}]}),

    /* ======== phase 2: the morning, the line ======== */
    b9_c6_arrive:()=>({sp:'The line', scene:'b9_line', again:()=>'The line, shields locked, and the wall of dust coming on.', txt:
`It comes on all morning, and then all at once. The brown wall on the northern sky gets taller until it is the sky, and the sun goes copper behind it, and the plain in front of the line goes dark under it. The wind out of it smells of nothing anybody can name.

Then there are shapes in the dust. Taller than any soldier. Walking.${b96Say({kaedra:`\n\nKaedra has an arrow on the string. "Short tails," she says. "Plate. They walk like they're carrying the ground with them." She draws. "Twenty paces. Fifteen."`, thegg:`\n\nThegg sets his shield. "They're very tall," he says, in the voice of a Tarthenal's son who has never once said that of anyone.`, _:''})}${b96Drilled() ? `\n\nAlong the stretch the Sixth's company closes up without being told, shoulder to shoulder, the way a Malazan sergeant drilled it on a dry field outside Letheras.` : ''}`,
      ch:[{t:'Lock the line the Malazan way before they reach it: rim to rim, and nobody first.', check:['might', 16],
            edges:id=>[b96Drilled() && ['the drill: "stand like that when it comes"', 2], b96Step() && id === 'sgt' && ['the step: the squad closes when you close', 1], id === 'thegg' && ['Tarthenal shoulders: this is what they are for', 2], id === 'brennet' && ['he has held a wagon on a hill with his back', 1], id === 'sorvan' && ['a lancer braces for the charge that hits him', 1], id === 'perrit' && ['she is not built for shoving', -1], id === 'ilsa' && ['she weighs what her coat weighs', -1]],
            near:{t:()=>`Yes, but the first of them hits the shields before the rims are quite together, and ${b96Nm(b96Who())} ${b96V(b96Who(), 'take', 'takes')} it on the shoulder through the shield, and the arm goes numb to the fingers: it will hurt in the fight.`, fx:()=>bruise(b96Who(), bruiseN())},
            go:()=>startBattle('b9_c6_line', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c6_arrive_late'},
          {t:'"Shields." Stand where you are put.', go:()=>startBattle('b9_c6_line', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c6_arrive_late:()=>({sp:'The line', scene:'b9_line', txt:
`A soldier two shields along flinches as the first of them comes out of the dust, only a little, and the gap is a hand wide, and it is enough. The line bends in at the Sixth.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c6_line', {surprise:'e'})}]}),
    b9_c6_line_after:()=>({sp:'The line', scene:'b9_line', fx:()=>{ S.f.b9_c6_lineDone = 1; }, again:()=>'The line, holding, the dust drifting back.', txt:
`They go back into the dust as if somebody had called them, the ones still walking, and the dust goes back with them, a little, and the sun comes through it copper and then gold.

The Sixth's stretch has not moved. Neither has the cairn, nor the lip of the wash. In the grass in front of the shields there are dark shapes that do not move either, and the escort does not go out to them.

The news comes along the line the way news does, a soldier to a soldier. The next company east has lost a file. The surgeons' carts have been going back to the train all morning. The foreigners, a mile off, are still fighting under their own cloud, and from here it sounds like a city falling down a long way off.${b96Say({tobet:`\n\nTobet goes along the squad with his eyes, one by one, the way he counts arrows.`, thegg:`\n\nThegg lowers his shield for the first time since dawn and looks at the dents in it, and lifts it again.`, _:''})}${b96If('kaedra', `\n\nKaedra is looking at the ground in front of the line. "They don't bleed like anything," she says. "They don't bleed much at all." She shoulders the bow. "I'll learn."`)}

Finadd Ennic is coming along behind the line with his slate.`,
      ch:[{t:'The Finadd.', go:'b9_c6_key'},
          {t:'The piece of something, a pace in front of the shields.', req:()=>!S.f.b9_c6_plateGot, go:'b9_c6_plate'},
          {t:'Walk the stretch.', go:()=>startExplore()}]}),
    b9_c6_plate:()=>({sp:'In front of the line', scene:'b9_line', fx:()=>{ if (!S.f.b9_c6_plateGot) { S.f.b9_c6_plateGot = 1; gain('b9_c6_plate'); } }, txt:
`A pace in front of the shields, in the trampled grass, there is a piece of dark armour the size of a hand, broken off something much bigger. It is heavier than it looks and colder than the sun should let it be, and it has no maker's mark, and no rivet anybody recognises.

${b96Say({perrit:'Perrit will not touch it. "Take it if you want," she says. "I would not keep it near the tiles."', pessa:'Pessa picks it up with the boathook, and then with her hand. "Luck," she says. "Too heavy for anything else."', _:'You turn it over in your hands and put it in the kit. Too heavy for anything but luck.'})}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* ======== the key: from Ennic, at noon ======== */
    b9_c6_key:()=>{ const k = b96Key();
      if (k) return {sp:B5_FINADD.name, scene:'b9_line', txt:`Finadd Ennic looks up from his slate. "${k === 'train' ? 'The wagons, Sergeant.' : 'Your stretch, Sergeant.'}"`,
        ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:'b9_line', html:rationsHTML(), again:()=>`${B5_FINADD.short}, behind the line, with the noon's orders.`, txt:
`Ennic has dust on his slate and on his face, and a cut along his jaw he has not noticed. He stops behind the Sixth and looks along the stretch, and then at the squad, and does a sum in his head that he does not say out loud.

"They will come again," he says. "Everybody along the line says so, and I agree with everybody, which I am told is in my orders." He holds up the slate. "Two things want the Sixth, and the Sixth is one squad."

"The stretch. The next company east is thin, and if it gives, it gives into us. The Sixth has to be standing here when it does, if anybody is." He wipes a line off the slate. "And the train. The outriders say some of them have come round in the dust behind us, from the east, toward the wagons. Yelt has the water. The reserve is a long way up the line." He looks at you. "Your call, Sergeant. I have written both down."${b96Booked() ? '\n\n"The train is drawn in where Yelt\'s book says it is," he adds. "That will help whoever goes."' : '\n\n"The train is strung out along the track," he adds. "Whoever goes will be running."'}${b96If('brennet', `\n\nBrennet is already looking back at the wagons. "The oxen," he says. "And the water." He does not say the rest.`)}${b96If('kaedra', `\n\nKaedra is looking east, along the line. "If the next stretch goes," she says, "it goes all at once."`)}${b96If('perrit', `\n\nPerrit has been doing the sum. "Without the water nobody stands tomorrow," she says. "Without the stretch nobody stands today."`)}`,
        ch:[{t:'"The stretch. The Sixth stays where it was put."', fx:()=>{ S.f.b9_c6_key = 'line'; S.f.b9_c6_ph = 3; b96L('thegg', 1); b96L('tobet', 1); }, go:'b9_c6_key_line'},
            {t:'"The train. Nothing gets to the water."', fx:()=>{ S.f.b9_c6_key = 'train'; S.f.b9_c6_ph = 3; b96L('brennet', 1); }, go:'b9_c6_key_train'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b9_c6_key_line:()=>({sp:B5_FINADD.name, scene:'b9_line', txt:
`"The stretch," Ennic says, and writes it, and nods: the order he would have given, if he had been allowed to give only one. "I will send a runner to the reserve for the train. He will run very fast. He has seen what is in the dust."${b96If('brennet', `\n\nBrennet looks back at the wagons once, and then sets his feet on the line beside the squad. "The drovers will raise it," he says. "They know how."`)}${b96If('kaedra', `\n\nKaedra nods. "East, then," she says, and moves down the line toward the wash, where she can see the next company.`)}`,
      ch:[{t:'The line.', go:()=>{ startExplore('b9_c6_line'); talk('b9_c6_afternoon'); }}]}),
    b9_c6_key_train:()=>({sp:B5_FINADD.name, scene:'b9_line', txt:
`"The train," Ennic says, and writes it. "Very well. I will close the stretch up behind you with what the company has. It will be thin." He looks east along the line. "Everything is thin today."

"Bring the water through, Sergeant. And all of the Sixth. In that order of importance to the quartermasters, and the other order to me."${b96If('brennet', `\n\nBrennet is already going, at a run, toward the wagons, the wagon-pin in his fist.`)}${b96If('kaedra', `\n\nKaedra goes with him. "Walkers," she says. "Back to the walking."`)}`,
      ch:[{t:'Back to the wagons.', go:()=>{ startExplore('b9_c6_train'); talk('b9_c6_tr_arrive'); }}]}),

    /* ======== phase 3, 'line': the afternoon on the stretch ======== */
    b9_c6_afternoon:()=>{ if (S.f.b9_c6_keyDone) return DLG.b9_c6_held();
      return {sp:'The line', scene:'b9_battle', again:()=>'The line in the afternoon, the next company giving at the wash.', txt:
`They come again in the afternoon, out of the dust as before, walking, and the line takes them as before, shields up and nobody first.

East, past the wash, the next company's stretch is giving. It does not break. It bends, and bends, and then a dozen paces of it are not there, and two of them are coming through the gap sideways, toward the Sixth's flank, without hurrying.${b96Say({tobet:`\n\nTobet has an arrow on the string. "The one at the back," he says. "Its hands are lit."`, thegg:`\n\nThegg looks at the gap, and at the squad, and back. "Close it," he says. "Or stand in it." He is not asking which.`, _:''})}`,
        ch:[{t:'Swing the Sixth\'s end of the line round and close the gap shoulder to shoulder with the next company.', check:['might', 16],
              edges:id=>[b96Drilled() && ['the drill: the line moves as one thing', 2], b96Step() && ['the step: go when the one beside goes', 1], id === 'thegg' && ['a Tarthenal at the hinge of a line', 2], id === 'sorvan' && ['a lancer wheels a troop on the move', 1], id === 'brennet' && ['he has swung a wagon team round in a ditch', 1], id === 'perrit' && ['she has never been the hinge of anything', -1], id === 'ilsa' && ['the files did not wheel', -1]],
              near:{t:()=>`Yes, but the swing is hard and fast, and ${b96Nm(b96Who())} ${b96V(b96Who(), 'come', 'comes')} round at the hinge of it and ${b96V(b96Who(), 'take', 'takes')} the next company's shield rim in the ribs, and the breath goes out: rattled.`, fx:()=>b96Rattle(b96Who())},
              go:'b9_c6_gap_closed', fail:'b9_c6_gap_open'},
            {t:'"Into the gap." Meet them in it.', go:()=>startBattle('b9_c6_gap', {})},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c6_gap_closed:()=>({sp:'The line', scene:'b9_battle', fx:()=>{ if (!S.f.b9_c6_keyDone) { S.f.b9_c6_keyDone = 1; S.f.b9_c6_gapClosed = 1; S.f.b9_c6_ph = 4; } }, txt:
`The Sixth's end of the line swings round like a gate on a hinge, ${by({thegg:'Thegg at the hinge with his shield on his shoulder, not moving, while the rest go round him,', sgt:'you at the hinge, calling it, while the rest go round you,', _:'{who} at the hinge, holding it, while the rest go round,'})} and meets the next company's shields rim to rim across the gap before the two coming through it are there.

They walk into a closed line. They stand in front of it a while, as if thinking. Then they go back into the dust.

The next company's sergeant looks along the shields at the Sixth and lifts a hand, which is a great deal, from a Letherii sergeant.`,
      ch:[{t:'Hold the stretch.', go:'b9_c6_held'}]}),
    b9_c6_gap_open:()=>({sp:'The line', scene:'b9_battle', txt:
`The swing goes ragged at the hinge, and the gap is still a gap when the two of them reach it, and they turn from it toward the Sixth.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c6_gap', {surprise:'e'})}]}),
    b9_c6_gap_after:()=>({sp:'The line', scene:'b9_battle', fx:()=>{ if (!S.f.b9_c6_keyDone) { S.f.b9_c6_keyDone = 1; S.f.b9_c6_gapDone = 1; S.f.b9_c6_ph = 4; } }, txt:
`The two in the gap are down, or gone back into the dust, and the next company has closed up behind the Sixth with shields borrowed from its dead file. Its sergeant looks along the line at the Sixth and lifts a hand, which is a great deal, from a Letherii sergeant.${b96If('pessa', `\n\nPessa is looking at her boathook. "In the joint," she says. "Under the arm." She sounds surprised that it worked, and pleased, and tired.`)}`,
      ch:[{t:'Hold the stretch.', go:'b9_c6_held'}]}),
    b9_c6_held:()=>({sp:'The line', scene:'b9_battle', txt:
`The afternoon goes on. They come again once more, fewer, and the stretch takes them. The dust goes back and comes on and goes back. Far off east the foreigners' fight goes on under its own cloud, and the noise of it comes and goes with the wind.

Late in the day a runner comes down the line from the Finadd at a crouch. The whole line is going back to a rise behind the train, together, in step, before the light goes.`,
      ch:[{t:'The Finadd.', onward:true, go:'b9_c6_pullback'},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ======== phase 3, 'train': the wagons ======== */
    b9_c6_tr_arrive:()=>({sp:'The supply train', scene:'b9_c6_wagons', again:()=>'The train, the oxen bellowing, the dust coming in from the east.', txt:
`The train ${b96Booked() ? 'is drawn in where Yelt\'s book says it is, wagons nose to tail, oxen inside, the water wagons in the middle' : 'is strung out along the track the way the morning left it, wagons half drawn in, oxen bellowing on a long picket, the water wagons at the end where anybody could get at them'}. The carters have their knives out. Yelt is standing on a tailboard with the ration book held against his chest like a shield.

East, past the last wagons, the dust is coming in low over the plain, and the oxen have smelled what is in it.${b96If('brennet', `\n\nBrennet is going down the picket with his hands on the oxen's necks, saying their names. "They know," he says. "They always know first."`)}`,
      ch:[{t:'To the east side of the wagons.', go:'b9_c6_tr_dust'},
          {t:'Walk the train.', go:()=>startExplore()}]}),
    b9_c6_tr_dust:()=>{ if (S.f.b9_c6_trainDone) return {sp:'The east side', scene:'b9_c6_wagons', txt:`The dust on the east side of the wagons is only dust again, settling on the barrels.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:'Shapes in the dust', scene:'b9_c6_wagons', html:rationsHTML(), txt:
`Out of the low dust on the east side of the wagons, two of them, walking, plate dark as wet slate, short thick tails, heads that do not turn. They are not coming for the squad. They are coming for the wagons, and the water in them, as if they knew what it was for.${b96If('kaedra', `\n\nKaedra has an arrow out. "They're not hunting us," she says. "They're hunting the train." She draws. "So are we, now."`)}`,
        ch:[{t:'Draw the last wagons in round the water and hold them there.', check:['wits', 16], rations:true,
              edges:id=>[b96Booked() && ['the train is where Yelt\'s book says it is', 2], id === 'brennet' && ['he knows every wagon by its squeak, and where it goes', 2], id === 'sorvan' && ['a lancer knows a laager', 1], id === 'perrit' && ['she has counted every wagon on this train', 1], id === 'tobet' && ['he has watched carters do this for years', 1], id === 'ruuk' && ['he would rather leave the wagons and run', -1]],
              near:{t:()=>`Yes, but the last water wagon will not come round in time, and ${b96Nm(b96Who())} ${b96V(b96Who(), 'put', 'puts')} a shoulder to its wheel and ${b96V(b96Who(), 'go', 'goes')} into the fight with the wheel's spoke-bruise all down one side: it will hurt in the fight.`, fx:()=>bruise(b96Who(), bruiseN())},
              go:()=>startBattle('b9_c6_train', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c6_tr_late'},
            {t:'"Sixth. Between them and the water."', go:()=>startBattle('b9_c6_train', b96Booked() ? {surprise:'p'} : {})},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c6_tr_late:()=>({sp:'Shapes in the dust', scene:'b9_c6_wagons', txt:
`The oxen will not be led. They see the shapes and plant their feet and bellow, and the last wagons stay where they are, and the two of them come on at the gap.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c6_train', {surprise:'e'})}]}),
    b9_c6_train_after:()=>({sp:'The supply train', scene:'b9_c6_wagons', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c6_trainDone) { S.f.b9_c6_trainDone = 1; S.f.b9_c6_trainHeld = 1; S.f.b9_c6_keyDone = 1; S.f.b9_c6_ph = 4; b9Ration(2, 'the wagons came through'); } }, txt:
`The reserve comes up the track at a run in the end, a company of it, and finds the wagons where they were, the water in them, and the Sixth standing between, and nothing else standing on the east side at all.

Yelt gets down off his tailboard. He goes along the water wagons with the book open, counting barrels, his lips moving, and then he counts again, and writes it.

"All of it," he says. "Every barrel." He looks at the squad over the book, and then he does something nobody on the train has seen him do: he writes the Sixth into the book, by name, on the brigade's page, where the barrels go. "So it is counted," he says.${b96Say({brennet:`\n\nBrennet is going down the picket again, saying the oxen's names. "All of them," he says. "Every one." He sounds hoarse.`, sorvan:`\n\nSorvan leans on his spear. "The reserve's captain asked who held the wagons," he says. "I told him the Sixth." He looks pleased despite himself.`, _:''})}`,
      ch:[{t:'Back to the line. The Finadd\'s runner is waving.', onward:true, go:'b9_c6_pullback'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c6_tr_yelt:()=>({sp:'Yelt', scene:'b9_c6_wagons', html:rationsHTML(), fx:()=>{ S.f.b9_c6_trYelt = 1; }, txt: S.f.b9_c6_trainDone ?
`Yelt is sitting on the tailboard with the book shut on his knee and both hands flat on it, looking at the water wagons. "All there," he says. "I have counted them four times. I may count them again." He does.` :
`Yelt is on a tailboard with the ration book held against his chest. "The water," he says. "The water is in wagons nine to fourteen. Everything else the brigade can lose and walk on." He looks at the dust. "I am a clerk. I have told you where the water is. That is what I can do."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_tr_saffa:()=>({sp:'Saffa', scene:'b9_c6_wagons', fx:()=>{ S.f.b9_c6_trSaffa = 1; }, txt: S.f.b9_c6_trainDone ?
`Saffa has her biggest knife in one hand and her ladle in the other, and seems to be deciding which to put down. "Nothing came over the wagons," she says. "I'd have been here." She puts the knife down. "Pot's on. Thin. It's on."` :
`Saffa is standing at her cook-wagon with her biggest knife. "I've three companies to feed tonight," she says, "and I mean to feed them, and nobody walking out of that dust is getting my pot." She is not joking, and the squad does not laugh.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_tr_tilewoman:()=>({sp:'The tile-woman', scene:'b9_c6_wagons', txt:
`The tile-woman is sitting on her meal wagon with her shawl over her head and her bag of tiles on her knee, not reading them. "I said I only read after," she says. "I'm waiting for after." She looks at the dust. "It's taking its time."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_tr_orla:()=>({sp:'Orla', scene:'b9_c6_wagons', txt:
`Orla's water-cart stands inside the wagons with its tap tied shut and Orla on the shaft with her cudgel. "No drinking till it's over," she says. "Then everybody drinks." She looks east. "If anything comes over those wagons for my water, I'll be here too."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_tr_wagon:()=>({sp:'The wagons', scene:'b9_c6_wagons', txt:
`Supply wagons ${b96Booked() ? 'drawn in nose to tail, wheels chocked, shafts down' : 'half drawn in, the carters still hauling the last of them round'}, tilts patched in three colours and grey with the day's dust.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_tr_barrels:()=>({sp:'The water', scene:'b9_c6_wagons', txt:
`Water barrels lashed three high, wagons nine to fourteen, each with its number burned in the stave. The whole escort's tomorrow, in a row.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_tr_crates:()=>({sp:'Ration crates', scene:'b9_c6_wagons', txt:
`Ration crates stacked at a tailboard, stencilled with the brigade's mark. Lighter than they were at the river. Not yet empty.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_tr_oxen:()=>({sp:'The oxen', scene:'b9_c6_wagons', txt:
`The oxen are pulling at their picket, eyes white, bellowing at the east.${b96If('brennet', ' Brennet goes down the line of them with a hand on each neck, and they do not stop, but they pull less.')}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* ======== phase 4: the pull-back to the rise ======== */
    b9_c6_pullback:()=>({sp:B5_FINADD.name, scene:'b9_battle', fx:()=>{ S.f.b9_c6_ph = 4; }, again:()=>`${B5_FINADD.short}, with the order to pull back to the rise.`, txt:
`Ennic is behind the line again with his slate, which has a crack across it now.

"The whole line goes back," he says. "To the rise behind the train. Together, in step, shields to the front, before the light goes. The Commander's order." He looks at the dust in front of the stretch. "They will follow. They always follow. Do not let them find a gap."${b96Step() ? `\n\n"Step," somebody in the company says, quietly, the Malazan way, and another voice answers it.` : ''}`,
      ch:[{t:'Go back in step, the whole stretch together, and keep the rims touching.', check:['wits', 16],
            edges:id=>[b96Step() && ['the step: go when the one beside goes', 2], b96Drilled() && ['the drill: the line moves as one thing', 1], id === 'sorvan' && ['a lancer knows a fighting withdrawal', 1], id === 'ilsa' && ['she counts paces for a living', 1], id === 'ruuk' && ['he has never once walked backward on purpose', -1]],
            near:{t:()=>`Yes, but going backward over broken ground is going backward over broken ground, and ${b96Nm(b96Who())} ${b96V(b96Who(), 'turn', 'turns')} an ankle on a stone and ${b96V(b96Who(), 'keep', 'keeps')} the step on it anyway: it will hurt in the fight.`, fx:()=>bruise(b96Who(), bruiseN())},
            go:()=>startBattle('b9_c6_dusk', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c6_pullback_ragged'},
          {t:'"Back. Together."', go:()=>startBattle('b9_c6_dusk', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c6_pullback_ragged:()=>({sp:'The line', scene:'b9_battle', txt:
`The stretch goes back ragged, one shield a step behind the next, and out of the dust one of them comes on at the place where the rims do not touch.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c6_dusk', {surprise:'e'})}]}),
    b9_c6_dusk_after:()=>({sp:'The rise', scene:'b9_c6_dusk', fx:()=>{ S.f.b9_c6_duskDone = 1; S.f.b9_c6_ph = 5; }, txt:
`The line comes up the back of the rise and turns on its crest and stands, the whole escort, a mile of shields with the light going red behind them. The dust in front of it does not follow up the slope. It goes back across the plain, slowly, like a tide going out, and leaves the plain dark.

The train comes up behind the rise wagon by wagon and draws in. Cook-fires are lit, small, on the last of the dung.`,
      ch:[{t:'The rise.', onward:true, go:()=>{ startExplore('b9_c6_rise'); talk('b9_c6_eve_arrive'); }},
          {t:'Not now.', go:()=>{ startExplore('b9_c6_rise'); }}]}),

    /* ======== phase 5: dusk on the rise ======== */
    b9_c6_eve_arrive:()=>({sp:'The rise', scene:'b9_c6_dusk', html:rationsHTML(), fx:()=>{ S.f.b9_c6_news = 1; }, again:()=>'The rise at dusk, the new line along its crest, the glow far off east.', txt:
`Dusk on the rise. The new line stands along the crest, and the soldiers in it sit down behind their shields one by one, as the sergeants let them, and do not take their eyes off the plain.

Far off east, where the foreigners were, the dust is still up, and under it there is a glow that is not the sunset, and a noise that comes and goes on the wind. A runner from the officers' fires says it as he passes, to nobody and to everybody: the foreigners' rearguard is still out there.${b96Say({thegg:`\n\nThegg looks east for a long breath. "Still fighting," he says. "In the dark." He sits down on his shield. "I hope somebody stands like that for them."`, tobet:`\n\nTobet looks east, and then along the squad, one by one, and then east again.`, _:''})}${b96If('kaedra', `\n\nKaedra stands at the end of the line with the bow unstrung, looking east. "Heavy feet out there," she says. "Ours, theirs." She shakes her head. "Too far to read."`)}${b96If('brennet', `\n\nBrennet is down among the wagons, listening to them come in. "Rolling," he says, when he comes back up. "All of them."`)}

Finadd Ennic is at the squad's fire, waiting, which he has never done.`,
      ch:[{t:'The Finadd.', go:'b9_c6_ennic5'},
          {t:'Walk the rise.', go:()=>startExplore()}]}),
    b9_c6_edge:()=>({sp:'The east end of the rise', scene:'b9_c6_dusk', txt:
`From the east end of the rise the plain falls away toward where the foreigners were. Their dust is still standing up against the last of the light, a long brown cloud, and under it things are burning, far off, small as lamps.

Once, while you watch, a long dark line of horsemen goes into the dust at a gallop, very far off, a great many of them, under banners nobody can read at this distance. The dust closes over them.

There is nothing anybody on the rise can do about any of it. The escort watches anyway.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_banner:()=>({sp:'The west end of the rise', scene:'b9_c6_dusk', txt:
`Far down the line to the west, against the red sky, the Commander's banner is still up on its pole. A soldier near the squad says he saw the Commander on his horse an hour since, riding the crest. A soldier always says that. Tonight the soldiers nearest the banner are saying it too.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_newline:()=>({sp:'The new line', scene:'b9_c6_dusk', txt:
`The escort's new line along the crest of the rise, shields grounded, soldiers sitting on their heels behind them, sentries standing. The plain below is dark. Nothing on it is walking.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_eve_train:()=>({sp:'The train', scene:'b9_c6_dusk', txt:
`The supply train drawn in behind the rise, wagons nose to tail, the oxen inside, cook-fires small among them. ${S.f.b9_c6_trainHeld ? 'The water wagons are in the middle, every barrel in them, and the carters keep looking at the Sixth as it goes by.' : 'The water wagons are in the middle. A reserve company held them in the afternoon, the carters say. It was close.'}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_eve_yelt:()=>({sp:'Yelt', scene:'b9_c6_dusk', html:rationsHTML(), fx:()=>{ S.f.b9_c6_eveYelt = 1; }, txt:
`Yelt is sitting at the tailboard of the first water wagon with the lamp on its hook and the ration book open on his knees, writing.

"The day," he says, without looking up. "Barrels, sacks, skins. Scale issued and returned." He writes. "Soldiers. I have been asked to keep that count too, tonight. I did not used to." He looks up at the Sixth, and counts it, and writes the number, and does not say it. "${S.f.b9_c6_trainHeld ? 'The water is all here. You know why.' : 'The water came through. The reserve held it. Barely.'}"`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b9_c6_eve_tilewoman:()=>({sp:'The tile-woman', scene:'b9_c6_dusk', txt:
`The tile-woman is sitting on a crate by a wagon with her bag on her knee, reading for a line of soldiers who are holding out docks to her in the dark. "After," she says, when she sees the squad. "Told you after was easier." She lays a tile. "Everybody knows how it came out. Not one of them knows what it means."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* the Letherii's road (S.f.b9_lethRoad: escort / adjunct / home), read by Ch 7's finale and Book Ten. b9Faith('l') colours it. */
    b9_c6_ennic5:()=>{ const r = b96Road();
      if (r) return {sp:B5_FINADD.name, scene:'b9_c6_dusk', txt:`Finadd Ennic has written it down. "${r === 'escort' ? 'With the brigades, then.' : r === 'adjunct' ? 'East with the foreigners, then.' : 'Home, then, when there is a way home.'}" He looks east at the glow. "Get some sleep, Sergeant. They may come again in the morning. They may not."`,
        ch:[{t:'Back.', go:()=>startExplore()}]};
      return DLG.b9_c6_road(); },
    b9_c6_road:()=>{ const fa = b96Faith();
      return {sp:B5_FINADD.name, scene:'b9_c6_dusk', html:rationsHTML(), again:()=>`${B5_FINADD.short} at the fire, with his cracked slate and one question.`, txt:
`Ennic sits down at the Sixth's fire without being asked, which he has never done, and lays the cracked slate on his knee.

"I have been asked a question by the Commander's staff," he says, "to ask every sergeant tonight, so that it is asked before anybody has to answer it in a hurry." He looks at the glow far off east. "When this is over, the brigades will go where the Commander takes them. The foreigners will go where their Adjunct takes them, which is east, and they have asked whether any Letherii would go on with them. And when the escort's road and Lether's part, there will be soldiers who want to go home." He looks at you. "Where does the Sixth go, Sergeant? I would like to write it down."${fa === 'doubt' ? `\n\nThe squad is quiet a while. Then ${b96Say({pessa:'Pessa', ruuk:'Ruuk', _:'somebody'})} says the word home, very quietly, as if testing whether the plain would object.` : fa === 'kept' ? `\n\n${b96Say({thegg:'Thegg', tobet:'Tobet', _:'One of the squad'})} looks round the fire at the others before anybody answers, the way the Sixth does now.` : ''}${b96If('kaedra', `\n\nKaedra is looking east. She does not need to say what she would answer.`)}${b96If('brennet', `\n\nBrennet is turning the cancelled debt-chit over in his fingers.`)}`,
        ch:[{t:'"With the Commander\'s brigades. Wherever he takes them."', fx:()=>{ if (!S.f.b9_lethRoad) { S.f.b9_lethRoad = 'escort'; b96L('sorvan', 1); b96L('thegg', 1); b96L('brennet', 1); } }, go:'b9_c6_road_done'},
            {t:'"East, with the foreigners. Lether should see where they are going."', fx:()=>{ if (!S.f.b9_lethRoad) { S.f.b9_lethRoad = 'adjunct'; b96L('kaedra', 1); b96L('ruuk', 1); b96L('tobet', 1); b96L('brennet', -1); } }, go:'b9_c6_road_done'},
            {t:fa === 'doubt' ? '"Home. Say it plainly: home."' : '"Home, when there is a way home."', fx:()=>{ if (!S.f.b9_lethRoad) { S.f.b9_lethRoad = 'home'; b96L('pessa', 1); b96L('brune', 1); if (fa !== 'doubt') b96L('thegg', -1); } }, go:'b9_c6_road_done'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c6_road_done:()=>{ const r = b96Road();
      return {sp:B5_FINADD.name, scene:'b9_c6_dusk', html:rationsHTML(), txt:
`${r === 'escort' ? `Ennic writes it, and nods. "The Commander asked for soldiers who came back," he says. "He will be glad they keep coming back. He will not say so. I will say it for him."

${b96Say({sorvan:'Sorvan nods slowly. "Bluerose rides with the brigades," he says. "So do I, then."', thegg:'Thegg nods. "Where the line is," he says. "That\'s where I go."', _:'The squad takes it as soldiers take orders they would have given themselves.'})}` : r === 'adjunct' ? `Ennic writes it, slowly. "East," he says. "With the foreigners." He looks at the glow. "I will put it to the Commander's staff that the Sixth asked. They may say yes. They may be glad to." He tucks the slate away. "I find I would like to know what the Wastes end in, myself."

${b96Say({kaedra:'Kaedra almost smiles. "The middle," she says. "I wanted to see the middle."', ruuk:'Ruuk grins at the dark. "Somewhere new," he says. "Good."', _:'The squad takes it in, and looks east, at the glow.'})}` : `Ennic writes it, and nods, and does not look disappointed, quite. "Home," he says. "When there is a way home. There will be, Sergeant. There usually is, for soldiers who came back."

${b96Say({pessa:'Pessa lets out a breath. "Said it," she says. "Out loud. Out here."', brune:'Brune turns her face west, toward the sea. "Home," she says, to it.', _:'The squad sits with the word a while. It sits well, mostly.'})}`}

He gets up, and then does not go. "There is one more thing they ask every sergeant tonight," he says. "Not for the slate."`,
        ch:[{t:'"Ask it."', go:'b9_c6_witness'},
            {t:'Not now.', go:'b9_c6_fire'}]}; },

    /* the Witness beat: dusk, the road chosen */
    b9_c6_witness:()=>{ const r = b96Road() || 'escort';
      return {sp:'The squad\'s fire', scene:'b9_c6_dusk', html:rationsHTML(), txt:
`Ennic looks round the fire at the squad, at the dents in the shields and the dust in everybody's hair.

"Not where," he says. "Why. The Commander's staff would like to know what the escort is still out here for, after today. So would I." He turns the cracked slate over. "${r === 'home' ? 'You will walk home. What will you have walked out here for?' : r === 'adjunct' ? 'You will walk on east. What for?' : 'You will walk on with the brigades. What for?'}"${b96If('kaedra', `\n\nKaedra is listening from outside the light. She has her own answer, and she wants to hear yours.`)}`,
        ch:[{t:'"Each other. The Sixth stood together today. It walks together after."', fx:()=>{ b9Wit('kept', 'for each other, after the line'); S.f.b9_c6_wit = 'each'; }, go:'b9_c6_wit_done'},
            {t:'"So somebody saw it. We stood. We\'ll be the ones who say so."', fx:()=>{ b9Wit('kept', 'to have seen it'); S.f.b9_c6_wit = 'seen'; }, go:'b9_c6_wit_done'},
            {t:'"Because the column turns, and we turn with it. That\'s all there is."', fx:()=>{ b9Wit('doubt', 'because the column turns'); S.f.b9_c6_wit = 'column'; }, go:'b9_c6_wit_done'},
            {t:'Not now.', go:'b9_c6_fire'}]}; },
    b9_c6_wit_done:()=>{ const w = S.f.b9_c6_wit;
      return {sp:'The squad\'s fire', scene:'b9_c6_dusk', html:rationsHTML(), txt:
`${w === 'each' ? `Ennic nods, and does not write it on the slate. He writes it, small, on the back of his hand.

${b96Say({thegg:'Thegg looks round the fire, at each of them. "At the river we were a crowd," he says. "Today we were a line."', tobet:'Tobet looks round the fire, at each of them, the way he counts arrows. "All here," he says. "That\'s the count."', _:'The squad sits closer to the fire, because of the cold, and not only because of the cold.'})}` : w === 'seen' ? `Ennic considers it. "The foreigners have a saying," he says. "About being their own witness. Their sergeants say it at the halts. I did not understand it until today." He nods. "Neither did they, I expect, until a day like this."

${b96Say({ilsa:'Ilsa has the small book open on her knee. "I wrote it down," she says. "All of it." She closes the book. "One day it will be wanted."', perrit:'Perrit nods slowly. "The stretch should be remembered," she says. "Us, then."', _:'Nobody argues. Out here, that is agreement.'})}` : `Ennic looks at you for a long breath. Then he nods. "Honest," he says. "The Commander's staff will not like it. I will write it down anyway." He does.

${b96Say({ruuk:'Ruuk grins at the fire. "Honest," he says. "One of us had to be."', pessa:'Pessa snorts. "At least the column goes somewhere," she says. "I\'ve marched for less."', _:'The squad laughs a little, at a thing that is true and not funny.'})}`}${b96If('kaedra', `\n\nKaedra has come in closer to the fire. "On the border we stayed because the others did," she says. "Today I stayed because I wanted to." She looks at the glow. "That's new."`)}${b96If('brennet', `\n\nBrennet says, to the coals, "Free means you can say yes." He thinks about it. "Today it meant I could stay. I stayed."`)}

Ennic goes on along the line to the next sergeant's fire, with his cracked slate.`,
        ch:[{t:'Back to the fire.', go:'b9_c6_fire'}]}; },

    /* ======== the end: night on the rise ======== */
    b9_c6_onward:()=>({sp:'The rise', scene:'b9_c6_dusk', html:rationsHTML(), txt:
`Night comes down over the rise. The new line keeps its shields up along the crest, and the sentries change, and nothing comes up the slope out of the dark. Far off east the glow under the foreigners' dust goes on a long while after the sun.

${b96Road() === 'home' ? 'Somewhere west, a long way back, is Lether. The Sixth will walk there when there is a way. Tonight it sits on a rise in the Wastes and keeps its shields up.' : b96Road() === 'adjunct' ? 'Somewhere east, under that glow, are the foreigners the Sixth means to walk on with. Tonight it sits on a rise in the Wastes and keeps its shields up.' : 'The Commander\'s banner is still up at the west end of the line. Tonight the Sixth sits on a rise in the Wastes under it and keeps its shields up.'}${b96If('kaedra', `\n\nKaedra lies down outside the tent, facing east, with the bow beside her. "Nothing," she says. Then: "Not yet."`)}${b96If('brennet', `\n\nBrennet sits with his back to a wagon wheel and listens to the oxen breathe. "Fine," he says. "Listen to them. Fine."`)}${b96Say({thegg:`\n\nThegg sleeps sitting up, with the shield on his knee and his hand on the rim.`, _:''})}`,
      ch:[{t:'Night.', onward:true, go:()=>chapterEnd(6, b96Key() || 'line')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
