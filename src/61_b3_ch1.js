/* ============ Book Three, Chapter 1: The Parley ============ */
/* The spring after the Fete. Onearm's Host is back outside Pale, where the Fourth's story began, and Caladan Brood's army has come in
   across the valley. Morning in the Host's lines (Whiskeyjack and Mallet over the leg, Tav at his cook-fire, Pell's wagon, the old
   north sap under the parley ground), noon on the picket where the two camps meet (the parley seen from the line: Kallor names the
   child an abomination and Whiskeyjack strikes him; the Ilgres at their fire; a Mott brother; the Daru carriage), and night in the
   Rhivi camp (Sohra, the Mhybe, men in Kallor's colours, the key). Dawn: the armies set out south-east.
   Key (S.f.b3_c1_key): 'mhybe' (Sohra asks the Fourth to stand the night at the Mhybe's tent: brigands from the Divide come for the
   herds; trust +2, Sohra joins now, S.f.b3_mhybe, and Kallor knows the sergeant's face, S.f.b3_kallorSaw) or 'crate' (the Host's
   order: escort a Moranth munitions train in off the Divide road; munitions +2 sharpers +1 cusser, trust −1; Sohra joins at the start
   of Chapter 2). The trick: the Herd-Call (Sohra's, spirit-craft). Notes for later chapters: docs/moi-ch1-notes.md. */
/* FOR THE ARTIST (61b): names this file uses.
   Items: ART['item/b3_c1_whetstone'] (Tav's Second Army whetstone), ART['item/b3_c1_torc'] (an Ilgres iron torc), ART['item/b3_c1_charm'] (a Rhivi bone charm).
   Figures: b3_c1_looter (tunnel looters and the man by the lamp), b3_c1_ilgres (Sarhul and the Ilgres), b3_c1_mott, b3_c1_brigand (Divide brigands,
   archers and the man with the cut ear), b3_c1_delegate. Reused: wj, mallet, tav, pell, kruppe, sohra, mhybe, houseguard, b2soldier, deserter, xbow,
   b3_rhivi_rider, b3_moranth. Backdrops (SCENEX): b3_c1_parley, b3_c1_tunnels, b3_c1_rhivi; plus the shelf's b3_pale_camp. Ground: b3camp, b3camp_night. */

/* ---- small helpers (b31: Book Three, Chapter One) ---- */
/* loyalty only for a squadmate who is here (an import can have lost anyone but the sergeant) */
const b31L = (id, n) => { if (b3In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b31Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b3In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* the Fourth as Book One counted it: the sergeant and whoever of the old squad is still walking */
const b31Five = () => ['sgt', 'brisk', 'kettle', 'tuft', 'ohl', 'ellis', 'vell'].filter(id => id === 'sgt' || b3In(id)).length;
/* Tav's letter: an import that never had it opened still has it sealed in Brisk's gorget (the same rule as her Book Three sheet, 60) */
const b31Sealed = () => !!(S && S.imported && b3Was('c7_letter') !== 'brisk');
/* someone in the squad is wearing a thing */
const b31Worn = it => SQUAD().some(w => Object.values((S.gear && S.gear[w]) || {}).includes(it));
/* Kettle's count, in words: "Two sharpers, one burner, one cusser" */
const b31Count = () => { const p = (n, s) => `${numw(n || 0)} ${s}${n === 1 ? '' : 's'}`;
  const t = `${p(S.inv.sharper, 'sharper')}, ${p(S.inv.burner, 'burner')}, ${p(S.inv.cusser, 'cusser')}`; return t[0].toUpperCase() + t.slice(1); };
/* the chapter's key fight is behind the squad: the march is waiting */
const b31Done = () => !!(S.f.b3_c1_herdsDone || S.f.b3_c1_trainDone);
/* Brisk died in Book One (an import), or is simply not with the squad */
const b31BriskGone = () => b3Fallen().includes('brisk');

/* ---- the Herd-Call: a Rhivi herd-rider's two notes, taught at Sohra's fire. Spirit-craft: it never burns. ---- */
Object.assign(TRICKS, {
  b3_c1_call:{name:'The Herd-Call', ch:1, use:'fight', ab:'t_b3_c1_call', spirit:true, where:'Sohra\'s fire in the Rhivi camp, the night of the parley',
    lore:'Two notes on a bone whistle, or on the teeth if there is no whistle, low and then high: what a Rhivi herd-rider blows to turn a bull that has decided to charge, or to make a horse stand when everything in it says run. Sohra says the herds learned it from the dead, and the dead learned it from the herds, and nobody remembers who was first.',
    get fx(){ return `Once a fight: an enemy within ${5 + lvT()} stops where it stands and loses its next turn (a boss shakes it off on ${12 + 2 * lvT()}+), and every enemy beside it is −1 to hit until the bearer's next turn. Grows with level. Spirit-craft: the Domin's poison never touches it.`; }},
});
Object.assign(AB, {
  t_b3_c1_call:{name:TRICKS.b3_c1_call.name, trick:'b3_c1_call', spirit:true, desc:()=>TRICKS.b3_c1_call.fx,
    tiles:u=>foes().filter(f => cheb(u, f) <= 5 + lvT() && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; AUDIO.play('step'); sparks(t.x, t.y, 14, '#e8d9a0', .4);
      const near = foes().filter(f => f !== t && cheb(f, t) <= 1); near.forEach(f => { f.b31CallUntil = B.round + 1; float(f, 'uneasy', '#e8d9a0'); });
      if (t.boss && d20() >= 12 + 2 * lvT()) { float(t, 'shakes it off', '#e8d9a0'); blog(`${u.name} puts two fingers to the teeth: low, then high. ${t.name} checks, a half step, and comes on anyway.${near.length ? ' The ones beside it do not like the sound at all.' : ''}`); }
      else { t.stun = true; float(t, 'stands', '#e8d9a0'); blog(`${u.name} blows the Herd-Call: low, then high, the way Sohra does it. ${t.name} stops dead where it stands, like a horse that has heard its name.${near.length ? ' The ones beside it look round for whatever made it stop.' : ''}`); } }},
});
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (S && S.book === 'moi' && B && a && a.side === 'e' && a.b31CallUntil >= B.round) c.bonus -= 1; return c; }; }
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); if (S && S.book === 'moi' && B && u && trickBy('b3_c1_call') === u.id) B.units.forEach(e => { if (e.b31CallUntil != null) e.b31CallUntil = -1; }); return r; }; }

/* ---- the Rhivi bone charm: whoever wears it, a rest takes one more off the dread ---- */
{ const _rest = b3Rest;
  b3Rest = function(t){ const r = _rest(t); if (S && S.book === 'moi' && b31Worn('b3_c1_charm') && S.ally && S.ally.dread > 0) ally(0, -1, 'The Rhivi charm, warm in the hand'); return r; }; }

/* ---- the words this chapter adds to Book Three's glossary ---- */
GLOSSX.moi.push(
  [1, 'The Ilgres', 'A Barghast clan that has fought for Caladan Brood for years. Iron torcs, no white paint, and a fondness for contests that stop being contests.', ()=>!!(S.f && S.f.b3_c1_ilgresMet)],
  [1, 'The Mott Irregulars', 'Woodsmen out of Mott Wood who fight for Brood: brothers, mostly, or say so. They kept a Malazan army hunting through their forest for a year and a half and are still pleased about it.', ()=>!!(S.f && S.f.b3_c1_mott)]);

/* ---- the reading at the first halt: the Fourth's own tent, forty paces from where it stood the night the sky came down ---- */
B3DECK[1] = {scene:'b3_pale_camp', where:'an upturned shield by the Fourth\'s cook-fire', set:'Morning outside Pale, mist still lying on the old burial field, two armies\' smoke going up into the same sky.',
  back:()=>startExplore(), backT:'Back to the lines.',
  say:{tuft:`"Here," she says. "Of all the places." She shuffles without looking at her hands. "The last time I read on this hill, the sky came down an hour after." She doesn't smile. "One card, Sergeant. For the road south."`,
    sohra:`"The Mhybe says to read for the Malazans," she says, "so that I will know what you are." She shakes the bones in her fist. "Sit. Do not breathe on the smoke. Malazans always breathe on the smoke."`,
    benna:`"Marines," she says, as if the word were a stain she'd been asked to get out. "I read for the Second on this hill, the year before. Most of them aren't here to complain." She shuffles. "Copper on the shield."`}};

const B3CH1 = {
  title:'The Parley', number:'One',
  intro:{loc:'Outside Pale', sub:'Genabackis · the spring after the Fete', scene:'b3_pale_camp', cap:'Mud, new grass through it, the Host\'s tent lines, and across the valley another army\'s smoke.',
    paras:[
`Spring comes to Pale the way the Host came the first time: late, muddy, and in no hurry to leave. The siege lines are grass. The burial field of the Second has gone green over its long low mounds, and somebody has driven a horse picket into the slope where the cadre row stood. The Host has been back a week. Nobody has said, out loud, that it has been here before.`,
`You are Sergeant {sgt}, Fourth Squad, Seventh Company, Onearm's Host. The proclamations say the Host is outlawed. The Host has been fed every day since anyway, by a quartermaster who has opinions about it, and it has marched north on the backs of the Black Moranth to sit outside the city it took, and wait.`,
`Across the valley, on the slopes where nobody could camp while Moon's Spawn hung over the city, there is another army: a thousand fires, horse lines, banners nobody in the Host salutes, and round hide tents with herds between them. Caladan Brood's. The Host spent ten years trying to kill it. Today the two of them are going to stand in a field and talk.`],
    go:'Out of the tent', node:'b3_c1_start'},

  areas:[
    /* 16 x 12 (b3camp).  . mud  , new grass  # palisade  = tent  F the Fourth's fire  W Pell's wagon  h horse lines  r the rubble of the north quarter, where the old sap comes out  s the Host's standard  > east, to the picket */
    { id:'b3_c1_camp', title:'Outside Pale · the Host\'s lines', sub:'Morning · the parley at noon', hint:'Tap ground to move · tap a figure to talk · the picket is east', decor:'b3camp',
      map:[ "################",
            "#rr...=.=..=.=.#",
            "#r,...=.=..=.=.#",
            "#,,.........,..#",
            "#.=.=..s....h..#",
            "#.=.=.......h..#",
            "#......,.......>",
            "#.=..F....W....#",
            "#.=.......,..=.#",
            "#,...,..=.=..=.#",
            "#..,....=.=....#",
            "################" ],
      walk:'.,', triggers:{r:'b3_c1_mouth', F:'b3_c1_fire', W:'b3_c1_pell', s:'b3_c1_wj', '>':'b3_c1_to_line'}, start:{x:5, y:8},
      quest:()=> !S.f.b3_c1_order ? 'Whiskeyjack, by the Host\'s standard. He sent for you.' : !S.f.b3_c1_tunnelsDone ? 'The old north sap, in the rubble by the city wall. Before noon.' : 'East, to the picket where the camps meet.',
      npcs:[
        {id:'wj', name:'Whiskeyjack', kind:'wj', x:8, y:5, node:()=>'b3_c1_wj', fresh:()=>!S.f.b3_c1_order || (!!S.f.b3_c1_tunnelsDone && !S.f.b3_c1_wjLine)},
        {id:'mallet', name:'Mallet', kind:'mallet', x:9, y:4, node:()=>'b3_c1_mallet', show:()=>!!S.f.b3_legSeen, fresh:()=>!!S.f.b3_legSeen && !S.f.b3_c1_mallet},
        {id:'tav', name:'Tav', kind:'tav', x:13, y:7, node:()=>S.f.b3_tav ? 'b3_c1_tav_again' : 'b3_c1_tav', fresh:()=>!S.f.b3_tav},
        {id:'pell', name:'Quartermaster Pell', kind:'pell', x:11, y:7, node:()=>'b3_c1_pell', fresh:()=>!S.f.b3_c1_pellMet} ] },

    /* 16 x 12 (b3camp).  . mud  , grass  # the Host's palisade  = Brood's tents  F the Ilgres fire  W the Daru carriage  h horse lines  s the Fourth's picket post  < west, to the Host  v south, to the Rhivi camp */
    { id:'b3_c1_line', title:'The picket · where the camps meet', sub:'Noon · the parley ground below Brood\'s tent', hint:'Tap ground to move · tap a figure to talk · the Fourth\'s post is the standard', decor:'b3camp',
      map:[ "################",
            "#..=.=....,.=.=#",
            "#..=.=........=#",
            "<.......W...,..#",
            "#.,..........=.#",
            "#....s.........#",
            "#..........,...#",
            "#.,...F.....=..#",
            "#..........=...#",
            "#..,..h.h......#",
            "#.....h.h..,...#",
            "#######vv#######" ],
      walk:'.,', triggers:{s:'b3_c1_post', '<':'b3_c1_line_back', v:'b3_c1_to_rhivi'}, start:{x:1, y:3},
      quest:()=> !S.f.b3_c1_parleyDone ? 'The Fourth\'s post on the picket, by the standard. Noon.' : 'Dusk soon. South, to the Rhivi camp, when the line is relieved.',
      npcs:[
        {id:'delegate', name:'A Daru attendant', kind:'b3_c1_delegate', x:7, y:2, node:()=>'b3_c1_delegate', fresh:()=>!S.f.b3_c1_delegate},
        {id:'kruppe', name:'A round man in silks', kind:'kruppe', x:10, y:3, node:()=>'b3_c1_kruppe', show:()=>!S.f.b3_c1_parleyDone || /^b3_c1_kruppe/.test(S.node || ''), fresh:()=>!S.f.b3_c1_kruppe},
        {id:'sarhul', name:'Ilgres Barghast', kind:'b3_c1_ilgres', x:7, y:8, node:()=>'b3_c1_ilgres', fresh:()=>!S.f.b3_c1_ilgresMet},
        {id:'ilgres2', name:'Ilgres Barghast', kind:'b3_c1_ilgres', x:5, y:8, node:()=>'b3_c1_ilgres'},
        {id:'mott', name:'A man in a strange hat', kind:'b3_c1_mott', x:3, y:9, node:()=>'b3_c1_mott', fresh:()=>!S.f.b3_c1_mott},
        {id:'sohra', name:'A Rhivi rider', kind:'sohra', x:11, y:9, node:()=>'b3_c1_sohra_line', show:()=>!b3In('sohra'), fresh:()=>!S.f.b3_sohraMet} ] },

    /* 16 x 12 (b3camp_night).  . trodden ground  , grass  = hide tents  F Rhivi fires  h the herds  ^ north, back to the picket */
    { id:'b3_c1_rhivi', title:'The Rhivi camp · night', sub:'Fires, herds, and somebody always singing', hint:'Tap ground to move · tap a figure to talk · the fires are warm', decor:'b3camp_night', dark:true,
      map:[ "######^^########",
            "#.=..=...h.h.h.#",
            "#....,...h.h.h.#",
            "#.=.F..=.......#",
            "#......,...=...#",
            "#.=...........,#",
            "#.....==.......#",
            "#.,...==...F...#",
            "#..............#",
            "#.=..,....=..=.#",
            "#..h.h.....,...#",
            "################" ],
      walk:'.,', triggers:{F:'b3_c1_rfire', '^':'b3_c1_rhivi_back'}, start:{x:6, y:1},
      quest:()=> b31Done() ? 'Dawn is coming. The fires, and then the march.' : !S.f.b3_sohraMet || !S.f.b3_c1_sohraFire ? 'Sohra, at the fires.' : 'The Mhybe\'s tent, and whatever the night wants of the Fourth.',
      npcs:[
        {id:'sohra', name:'Sohra', kind:'sohra', x:5, y:4, node:()=>b31Done() ? 'b3_c1_sohra_late' : S.f.b3_c1_sohraFire ? 'b3_c1_sohra_again' : 'b3_c1_sohra', show:()=>!b3In('sohra') || !S.f.b3_c1_sohraFire, fresh:()=>!S.f.b3_c1_sohraFire},
        {id:'mhybe', name:'The Mhybe', kind:'mhybe', x:8, y:7, node:()=>'b3_c1_mhybe', show:()=>!S.f.b3_c1_trainDone, fresh:()=>!S.f.b3_c1_mhybeMet},
        {id:'kmen', name:'Men in grey and fur', kind:'houseguard', x:9, y:5, node:()=>'b3_c1_kmen', show:()=>!S.f.b3_c1_key, fresh:()=>!S.f.b3_c1_kmen},
        {id:'runner', name:'A Host runner', kind:'b2soldier', x:3, y:8, node:()=>'b3_c1_runner', show:()=>!S.f.b3_c1_key && !!S.f.b3_c1_sohraFire, fresh:()=>!S.f.b3_c1_runner} ] } ],

  battles:{
    /* the old north sap under the parley ground: looters and deserters who lived through the Host's year here, and never came up */
    b3_c1_tunnels:{title:'The north sap', warrenText:'Warrens quiet down here · the old cold is gone', warren:{meanas:1, denul:1}, music:'battle',
      map:["#..##..#","#......#","##.##.##","#......#","#.#..#.#","#......#","##....##","#......#","#......#","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b3_c1_deserter',1,1],['b3_c1_looter',5,1],['b3_c1_looter',3,3],['b3_c1_xbow',5,0]], xp:140, after:'b3_c1_tunnels_after',
      waves:[{round:2, foes:[['b3_c1_looter',1,5]], text:'Another comes out of a side gallery behind you, the way the Fourth came in once, a long time ago.'}],
      preText:()=>`Kettle's sharper goes off against the shoring at the bend, and the shoring, which has been waiting a year for an excuse, comes down. The ones behind it stop being a line and start being a cough. Dust rolls up the sap in a wall, and for a breath nobody can see anybody.`,
      /* the second ground: the chamber where three passages met before the ceiling came down, and the beam */
      stage2:{title:'The fallen chamber', xp:70,
        text:()=>`The sap opens out where it always did: a chamber where three passages met before the ceiling came down, the beam still lying across the floor where it fell. ${b3In('tuft') || b3In('brisk') ? `${b31Say({tuft:'Tuft', brisk:'Brisk'})} looks at the beam and then doesn't. Nothing is under it now.` : 'Nothing is under it now.'}
\nThere is a lamp on it instead, and a man sitting beside the lamp with a sapper's mattock across his knees and his boots off. He has been down here long enough that the dark has become a room. "Malazans," he says, and yawns. "Took you long enough."`,
        map:["##....##","#......#","#.#..#.#","#......#","###..###","#......#","#..tt..#","#......#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b3_c1_keeper',3,1],['b3_c1_looter',1,3],['b3_c1_looter',6,3],['b3_c1_xbow',4,0]]} },
    /* the Ilgres fire: a shoving contest over a line in the dirt that stops being a contest when the youngest draws */
    b3_c1_brawl:{title:'The Ilgres fire', style:'b3camp', warrenText:'Noon · nobody is using a warren for this', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..,..,..","........",".t....t.","........","........","..,..,..","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c1_sarhul',3,1],['b3_c1_ilgres',1,2],['b3_c1_ilgres',6,2],['b3_c1_knife',4,3]], xp:80, after:'b3_c1_brawl_after'},
    /* the Mhybe's tent: brigands off the Divide come for the Rhivi herds in the dark */
    b3_c1_herds:{title:'The herd lines', style:'b3camp_night', dark:true, warrenText:'Night · the Rhivi spirits are restless on these hills', warren:{meanas:1, denul:1}, music:'battle',
      aid:{kind:'b3_rhivi_rider', at:[7, 8], need:7},
      map:["..,....,","........",".t....t.","........","...,....","........","..t..t..","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c1_brigand',1,1],['b3_c1_brigand',6,1],['b3_c1_brigand',3,2],['b3_c1_bow',5,0]], xp:170, after:'b3_c1_herds_after',
      waves:[{round:2, foes:[['b3_c1_brigand',0,5]], text:'One comes in low along the tent ropes, a knife in his teeth, for the horses on the far line.'}],
      preText:()=>`Kettle's burner goes into the gap between the herd and the dark, and the dark is suddenly full of men lit orange, blinking, with ropes in their hands. The herd does not run. Sohra is singing to it, low, under all the noise, and it stands.`,
      stage2:{title:'The Mhybe\'s tent', xp:100,
        text:()=>`The ones at the herd lines break, and not all of them run the way they came. Three go between the tents, fast and sure of their way: they know where the good horses are kept and who has the silver; and one of them, the big one with the cut ear, goes straight for the tent with the painted door-flap, because it is the biggest.
\n${b3In('sohra') || S.f.b3_sohraMet ? `"No," says Sohra, very quietly, and goes after him.` : `A voice inside the tent says something in Rhivi, old and sharp.`} The child is in there.`,
        map:["#.#..#.#","........","..t..t..","........","#......#","........","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c1_divide',3,1],['b3_c1_brigand',1,3],['b3_c1_brigand',6,3],['b3_c1_bow',4,0]]} },
    /* the Host's order: a Moranth munitions train down off the Divide road, and the men who want it */
    b3_c1_train:{title:'The Divide road', style:'b3camp_night', dark:true, warrenText:'Night on the road · quorls somewhere overhead', warren:{meanas:1, denul:1}, music:'battle',
      aid:{kind:'b3_moranth', at:[0, 8], need:6},
      objective:{type:'survive', rounds:3, text:'Hold the wagons for three rounds, until the train is through the cutting.'},
      map:["..##..##","........",".t....t.","........","........","..,..,..","........","...tt...","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c1_brigand',1,1],['b3_c1_brigand',6,1],['b3_c1_bow',4,0]], xp:170, after:'b3_c1_train_after',
      waves:[{round:2, foes:[['b3_c1_brigand',0,3],['b3_c1_brigand',7,3]], text:'Two more come down off the cutting\'s sides, sliding on the scree, for the lead wagon.'}],
      preText:()=>`Kettle's burner goes up the cutting wall, and the scree on the far side is suddenly bright as noon and full of men who had been lying very still on it. They stop lying still.`,
      stage2:{title:'The cutting', xp:100,
        text:()=>`The wagons are through. The Moranth drivers do not stop or look back; their wagons go on down the road into the dark with a soft clatter of chitin and a great deal of something nobody should be shooting at. The men who came for it fall back up the cutting, and their leader is shouting them into a line across the road above, because having lost the wagons he would still like the Malazans' purses.
\n${b3In('kettle') ? `"They wanted the *crates*," Kettle says. She sounds personally insulted. "Do they know what's *in* them?" "Kettle." "Yes, Sergeant."` : `Up the cutting, then.`}`,
        map:["##....##","#......#","#.#..#.#","#......#","##....##","#......#","#.t..t.#","#......#","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c1_divide',3,1],['b3_c1_bow',6,1],['b3_c1_brigand',1,3],['b3_c1_brigand',6,3]]} } },

  foes:{
    /* the north sap: what lived through the Host's year at Pale underground, and stayed */
    b3_c1_looter:{name:'Tunnel looter', sig:'l', kind:'b3_c1_looter', hp:10, ac:12, atk:3, dmg:[1,6,1], rng:1, mv:4, init:1, verb:'swings a pick-haft at'},
    b3_c1_deserter:{name:'Pale deserter', sig:'d', kind:'deserter', hp:12, ac:13, atk:4, dmg:[1,8,0], rng:1, mv:4, init:1, verb:'cuts at'},
    b3_c1_xbow:{name:'Deserter crossbow', sig:'x', kind:'xbow', hp:8, ac:12, atk:3, dmg:[1,8,0], rng:5, mv:3, init:2, sk:['pin'], verb:'shoots at'},
    /* the man by the lamp: a Second Army sapper who went down the night the sky fell, and decided not to come up */
    b3_c1_keeper:{name:'The man by the lamp', sig:'K', kind:'b3_c1_looter', hp:21, ac:13, atk:4, dmg:[1,10,1], rng:1, mv:3, init:1, boss:true, sk:['shove'], verb:'brings a sapper\'s mattock round on'},
    /* the Ilgres: Barghast who have fought for Brood for years, and like a contest */
    b3_c1_ilgres:{name:'Ilgres Barghast', sig:'b', kind:'b3_c1_ilgres', hp:14, ac:12, atk:4, dmg:[1,6,2], rng:1, mv:4, init:1, sk:['shove'], verb:'drives a shield-rim at'},
    b3_c1_knife:{name:'The youngest Ilgres', sig:'y', kind:'b3_c1_ilgres', hp:11, ac:12, atk:4, dmg:[1,4,2], rng:1, mv:5, init:3, sk:['bleed'], verb:'goes in with a knife at'},
    b3_c1_sarhul:{name:'Sarhul', sig:'S', kind:'b3_c1_ilgres', hp:22, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, boss:true, sk:['shove'], verb:'swings an iron-bound fist at'},
    /* the Divide's brigands: horse thieves and road men from the hills between Pale and Darujhistan */
    b3_c1_brigand:{name:'Divide brigand', sig:'r', kind:'b3_c1_brigand', hp:12, ac:12, atk:4, dmg:[1,8,0], rng:1, mv:5, init:2, verb:'hacks at'},
    b3_c1_bow:{name:'Brigand archer', sig:'a', kind:'b3_c1_brigand', hp:8, ac:11, atk:3, dmg:[1,6,1], rng:5, mv:4, init:2, sk:['pin'], verb:'looses at'},
    b3_c1_divide:{name:'The man with the cut ear', sig:'E', kind:'b3_c1_brigand', hp:26, ac:13, atk:5, dmg:[1,10,1], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a hill-axe down on'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b3_c1_whetstone:{name:'A Second Army whetstone', slot:'trinket', who:null, atk:1, line:'A grey hone in a leather sleeve with the Second\'s stamp worn nearly off it. Tav had two. He says a soldier with two whetstones has an edge on a soldier with none, and laughs at it every time, alone.'},
    b3_c1_torc:{name:'An Ilgres iron torc', slot:'trinket', who:null, stat:{might:1}, line:'A heavy twisted iron neck-ring, open at the front, the knobbed ends wound with sinew. Ilgres work. It goes on easily. The squad has not yet tried to take it off, and the Ilgres laughed when asked.'},
    b3_c1_charm:{name:'A Rhivi bone charm', slot:'trinket', who:null, hp:2, line:'A small bhederin carved in bone, red ochre in the cuts, on a thong with two blue beads. Whoever wears it, the squad sleeps easier: a rest takes one more off the dread. Sohra says it is not magic. Sohra says it is manners.'} },

  scenes:{
    b3_c1_parley:{loc:'Below Brood\'s tent', sub:'The parley ground · noon', cap:'The meeting ground below the command tent: two armies\' worth of watchers, a knot of the great in the middle, and a child in red wool a little apart.', amb:'explore'},
    b3_c1_parley_after:{loc:'Below Brood\'s tent', sub:'The parley ground · after', cap:'The command tent with its front let down and laced, lamplight along the seam, the awning empty, and the guard line still standing in front of it.', amb:'explore'},
    b3_c1_tunnels:{loc:'Under Pale', sub:'The old north sap', cap:'A sapper tunnel by lamplight, the shoring black with old smoke, and the dark at the end of it gone ordinary at last.', amb:'tunnel'},
    b3_c1_rhivi:{loc:'The Rhivi camp', sub:'Night', cap:'Round hide tents, low fires, the herds a dark mass breathing on the slope above, and somebody singing to them.', amb:'explore'},
    b3_c1_divide:{loc:'The Divide road', sub:'Night · the cutting', cap:'A pale road going up between black hills into a cutting banked with scree, six wagons under oiled hide, and quorls very high against the stars.', amb:'night'},
    b3_pale_grey:{loc:'Outside Pale', sub:'The munitions park · before dawn', cap:'The Host\'s lines in the grey before dawn, the wagons in under their hides, and a quorl coming down at the edge of the park.', amb:'explore'},
    b3_pale_dawn:{loc:'Outside Pale', sub:'Dawn · the south-east road', cap:'The tents struck, and two armies going out down the south-east road at a walk, banners up, the herds on their flank and Pale behind.', amb:'explore'} },

  end:{
    mhybe:['The night watch', 'The parley at Pale held, just, after Whiskeyjack struck Brood\'s second in front of both armies. That night the Fourth stood watch at the Mhybe\'s tent for a Rhivi girl who asked, and brigands off the Divide came for the herds and did not get them. Sohra walks with the Fourth now. Brood\'s people have started to look at the squad as people instead of scenery. And a tall man in a fur-collared cloak knows the sergeant\'s face.'],
    crate:['The Host\'s order', 'The parley at Pale held, just, after Whiskeyjack struck Brood\'s second in front of both armies. That night the Host sent the Fourth up the Divide road for a Moranth munitions train, and the train came in, and the squad\'s satchel is heavier than it has been since Darujhistan. A Rhivi girl asked the Fourth for something else that night. She will find them on the march, she says. She did not say it warmly.'] },
  endScene:'b3_pale_dawn',
  endCap:()=> S.f.b3_c1_key === 'mhybe' ? 'Dawn outside Pale. Two armies take the road south-east at a walk anyone could time, and a Rhivi girl rides at the Fourth\'s shoulder, singing to the herds.' : 'Dawn outside Pale. Two armies take the road south-east at a walk anyone could time, and the munitions wagons creak behind the Fourth, heavy and careful.',
  tease:'Next: the Rhivi Plain. Six weeks south-east with the herds and Brood\'s strange contingents, the Bridgeburners going their own way, and, far out on the grass, a track too long for anything that walks.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b3_c1_key === 'mhybe') x.push('The Fourth stood the night at the Mhybe\'s tent. The herds are whole. The Rhivi have started to nod to the squad at the fires.');
    if (f.b3_c1_key === 'crate') x.push('The Fourth brought a Moranth munitions train in off the Divide road by night. Kettle has counted it four times.');
    if (f.b3_kallorSaw) x.push('Kallor walked past the Mhybe\'s tent after the fight and looked at the sergeant, and took his time about it. He has a face for his book now.');
    if (f.b3_kallor) x.push('Brood\'s second called the child an abomination in front of both armies, and demanded her death, and Whiskeyjack struck him. The squad saw it from the picket. Kallor, the soldiers call him.');
    if (f.b3_legSeen) x.push('Mallet wants a week of Whiskeyjack flat on his back for that leg. Whiskeyjack has not given him an hour.');
    if (f.b3_tav) x.push(b3In('brisk') ? 'Brisk walked to Tav\'s cook-fire, and stood by it until he felt it. He was singing. He can\'t.' : 'Tav, Brisk\'s brother, found the Fourth at Pale, and sat with the sergeant a while, and did not say much. Neither did the sergeant.');
    if (f.b3_tuftChild) x.push('The child in red wool looked across the parley ground at Tuft, as if she half knew her. Tuft has not said what she felt. She has not slept much either.');
    if (f.b3_c1_ilgres === 'won') x.push('The Fourth won a shield-push at the Ilgres fire, and an iron torc with it.');
    if (f.b3_c1_ilgres === 'calmed') x.push('A young Ilgres drew a knife at a contest, and the Fourth talked him out of using it. His elders were impressed. He was not.');
    if (f.b3_c1_ilgres === 'helped') x.push('A contest at the Ilgres fire became a brawl. Afterwards the Fourth helped the Barghast up, and drank with them, and came away with a torc and a headache.');
    if (f.b3_c1_ilgres === 'left') x.push('A contest at the Ilgres fire became a brawl, and the Fourth walked away from the Barghast it put down. The Ilgres have not forgotten.');
    if (f.b3_c1_boy === 'provost') x.push('A boy who had lived a year in the old north sap went up to the provosts in the Fourth\'s hands.');
    if (f.b3_c1_boy === 'let') x.push('A boy who had lived a year in the old north sap went up the far shaft into the city, and the Fourth let him.');
    if (f.b3_c1_charmFrom) x.push('The Mhybe gave a bone charm to the Fourth, for the one who looked at her daughter as if she knew her.');
    if (f.b3_c1_mott) x.push('A Mott Irregular told the squad which snares in Mott Wood were his, cheerfully, for some time.');
    if (preUsed('b3_c1_tunnels')) x.push('Kettle brought down the shoring in the north sap with a sharper. In a tunnel. Hedge would have had something to say.');
    return x; },

  journal:()=>{ const f = S.f; return [
    b31Done() && (f.b3_c1_key === 'mhybe' ? 'The Fourth stood the night watch at the Mhybe\'s tent for Sohra. Brigands off the Divide came for the herds and were broken.' : 'The Fourth brought a Moranth munitions train in off the Divide road by night, on the Host\'s order.'),
    f.b3_kallorSaw && 'Kallor came to the Mhybe\'s tent after the fight, looked at the sergeant, and left. Sohra says he does not forget a face, and she has never heard of him forgiving one.',
    f.b3_sohraMet && 'Sohra, a Rhivi herd-rider, was sent by the Mhybe\'s people to watch the Malazans. She told the sergeant so. She is watching.',
    f.b3_c1_mhybeMet && 'The Mhybe, the Rhivi elder who carries the child, was young at the turn of the year. She is not young now.',
    f.b3_kallor && 'At the parley, Brood\'s second called the child an abomination and demanded her death. Whiskeyjack struck him. Brood stood between them. Kallor, the soldiers call him: a king of somewhere that is not there any more.',
    f.b3_tuftChild && 'Tuft saw the child for the first time since the hill above the plain. The child looked back.',
    f.b3_c1_tunnelsDone && 'The Fourth went back down the old north sap under Pale, where its story started, and cleared it before the parley.',
    f.b3_legSeen && 'Mallet wants a week of Whiskeyjack flat on his back. Whiskeyjack has a parley, and a war after it, and will not give him an hour.',
    f.b3_tav && 'Tav, Brisk\'s brother, a heavy-infantry corporal in the Fourth Regiment of the Second, has a cook-fire at the far end of the Host\'s lines. He sings. He cannot.',
    'Onearm\'s Host is back outside Pale. Caladan Brood\'s army has come in across the valley. The two are going to talk.'].filter(Boolean); },

  dlg:{
    /* ---- opening: the Fourth's tent, forty paces from where it stood the night the sky came down ---- */
    b3_c1_start:()=>({sp:'The Fourth\'s tent', scene:'b3_pale_camp', fx:()=>{ S.f.b3_c1_started = 1; }, txt:
`The Fourth's tent is pitched where the Host's quartermaster put it, which by some joke of his is forty paces from where it stood the night before the sky came down on Pale. Nobody in the squad said so when they drove the pegs. Everybody noticed.
${b3In('brisk') ? `\nBrisk is standing over the cook-fire as if it might try something.` : ''}${b3In('kettle') ? ` Kettle has the satchel open on her knee and is counting it by touch.` : ''}${b3In('ohl') ? ` Ohl has the oilcloth out and is not reading it, which is a thing he does when the list is long enough already.` : ''}${b3In('tuft') ? `\n\nTuft is at the end of the tent line with her back to the squad, looking north at the hill where the cadre row stood. There is grass on it now, and somebody's horse. She has been looking at it since first light.` : ''}${b3In('ellis') ? `\n\nEllis is looking the other way, at the city, with the gloved hand tucked under her arm. The fire that did the hand was here, before the Hounds; she told the squad that much on the plain and has not added to it since. She isn't adding to it now.` : ''}${b3In('vell') ? `\n\nVell has been up the tent's ridge-pole already to look at Pale's walls, and has come down disappointed in them. "Low," he says. "You could get a mule over those." He sounds personally let down.` : ''}${b3Fallen().length ? `\n\nThere is room in the tent nobody has filled. ${b3FallenNames()} did not come out of Darujhistan. You still count to the old number, every morning, and stop.` : ''}

Across the valley, Brood's army is cooking breakfast: a thousand thin smokes going straight up in the still air, and below them, nearer, the round hide tents of the Rhivi and their herds grazing between. The meeting ground is the trampled slope below Brood's command tent. Noon, the runners say.

${b31Say({brisk:`"Sergeant." Brisk, not looking up. "Runner came. Whiskeyjack wants you by the standard. Said *when you're ready*." A pause. "Which means now."`, _:`A runner came at dawn: Whiskeyjack wants the sergeant of the Fourth by the Host's standard, when you're ready. Which means now.`})}`,
      ch:[{t:'Walk the lines.', go:()=>startExplore()},
          {t:'"Kettle. Count."', req:()=>b3In('kettle') && !S.f.b3_c1_askKettle, fx:()=>{ S.f.b3_c1_askKettle = 1; }, go:'b3_c1_start_kettle'},
          {t:'"Ohl. How long is it?"', req:()=>b3In('ohl') && !S.f.b3_c1_askOhl, fx:()=>{ S.f.b3_c1_askOhl = 1; }, go:'b3_c1_start_ohl'},
          {t:'"Tuft. What\'s up there?"', req:()=>b3In('tuft') && !S.f.b3_c1_askTuft, fx:()=>{ S.f.b3_c1_askTuft = 1; }, go:'b3_c1_start_tuft'},
          b3DeckChoice(1)]}),
    b3_c1_start_kettle:()=>({sp:'Kettle', scene:'b3_pale_camp', txt:
`She snaps the satchel shut. "${b31Count()}. Same as this morning. Same as Darujhistan." She considers. "${b3Was('c5_cusserUsed') ? `The new Maud's at the bottom. She's not the old Maud. She knows it. I've told her she can be Maud anyway.` : b3Was('c7_debt') === 'paid' ? `No Maud. Maud went home to the Moranth. I check for her anyway.` : `Maud's at the bottom, if anyone's asking.`}"

Then, because she can't not: "There are quorls at the edge of the camp. Twelve came down at dusk and nine went up at dawn, so there are three, unless they've been moving them at night, which they have, because the grass is flat in a fourth place." She looks at you. "I'm not saying I went and looked. I'm saying the grass is flat."${b3In('brisk') ? `\n\n"She went and looked," says Brisk.` : ''}`,
      ch:[{t:'"Ohl. How long is it?"', req:()=>b3In('ohl') && !S.f.b3_c1_askOhl, fx:()=>{ S.f.b3_c1_askOhl = 1; }, go:'b3_c1_start_ohl'},
          {t:'"Tuft. What\'s up there?"', req:()=>b3In('tuft') && !S.f.b3_c1_askTuft, fx:()=>{ S.f.b3_c1_askTuft = 1; }, go:'b3_c1_start_tuft'},
          b3DeckChoice(1), {t:'Walk the lines.', go:()=>startExplore()}]}),
    b3_c1_start_ohl:()=>({sp:'Ohl', scene:'b3_pale_camp', txt:
`He folds the oilcloth along its old creases. "${b3ListWords().replace(/^./, c => c.toUpperCase())}. A good many of them are from here, child. I came to this camp with a short list and left it with a long one." He looks at the burial field, green now, the mounds soft with it. "I walked up there last night. I thought I should. I don't know what I thought I'd find. Grass, it turns out."

${b3Fallen().length ? `"And ours," he says, more quietly. "${b3FallenNames()}. I wrote them in Darujhistan. I said I would die before I did." He puts the oilcloth away. "I was slow."` : `"None of ours, Sergeant." He says it to the oilcloth. "Still none. I mention it because you'd never ask."`}`,
      ch:[{t:'"Kettle. Count."', req:()=>b3In('kettle') && !S.f.b3_c1_askKettle, fx:()=>{ S.f.b3_c1_askKettle = 1; }, go:'b3_c1_start_kettle'},
          {t:'"Tuft. What\'s up there?"', req:()=>b3In('tuft') && !S.f.b3_c1_askTuft, fx:()=>{ S.f.b3_c1_askTuft = 1; }, go:'b3_c1_start_tuft'},
          b3DeckChoice(1), {t:'Walk the lines.', go:()=>startExplore()}]}),
    b3_c1_start_tuft:()=>({sp:'Tuft', scene:'b3_pale_camp', txt:
`She doesn't turn round. "Her tent was there. Second from the end. The lamp was always lit." A horse on the hill lifts its head and puts it down again. "There's grass. I walked up before the sun. I thought there'd be something. A peg." She shakes her head. "Somebody's picketed a horse on it."

Then, quieter, and not about the hill at all: "She's over there, Sergeant." She doesn't point. She doesn't need to: across the valley, the Rhivi tents. "I can feel it from here, like a lamp left lit in a window. I'm not going over." A breath. "Not yet. I'd like to be the one who decides when."`,
      ch:[{t:'"When you decide, tell me first."', fx:()=>{ b31L('tuft', 1); S.f.b3_c1_tuftFirst = 1; }, go:'b3_c1_start_tuft2'},
          {t:'"Kettle. Count."', req:()=>b3In('kettle') && !S.f.b3_c1_askKettle, fx:()=>{ S.f.b3_c1_askKettle = 1; }, go:'b3_c1_start_kettle'},
          b3DeckChoice(1), {t:'Walk the lines.', go:()=>startExplore()}]}),
    b3_c1_start_tuft2:()=>({sp:'Tuft', scene:'b3_pale_camp', txt:
`"Yes, Sergeant." It is her compliance voice, and then, because it is you, it isn't. "I'll tell you first. I told you first last time." She turns round at last. "That's twice I've promised you something on this hill. I'd like to keep this one without anybody dying."`,
      ch:[b3DeckChoice(1), {t:'Walk the lines.', go:()=>startExplore()}]}),
    b3_c1_deck:()=>b3DeckOffer(1),
    b3_c1_card:()=>b3DeckCard(1),

    /* ---- the Fourth's fire: rest, and the squad ---- */
    b3_c1_fire:()=>({sp:'The Fourth\'s fire', txt: S.f.b3_c1_tunnelsDone ?
`The cook-fire, banked. ${b3In('brisk') ? 'Brisk has scraped the mud off her boots with the edge of a pick-head and is pretending she hasn\'t. ' : ''}${b3In('ohl') ? 'Ohl has a pot of something on the coals that is technically tea. ' : ''}The sun is near noon, and across the valley the knot of banners below Brood's tent is getting thicker.` :
`The cook-fire, with a pot on it. ${b3In('ohl') ? 'Ohl\'s tea, which is technically medicine. ' : ''}The squad could sit an hour, if the morning had an hour in it. It doesn't: Whiskeyjack sent for you.`,
      ch:[{t:'Sit an hour. Patch what needs patching.', req:()=>!!S.f.b3_c1_tunnelsDone && !S.f.b3_c1_restCamp, fx:()=>{ S.f.b3_c1_restCamp = 1; b3Rest(`The Fourth sits an hour by its own fire${b3In('ohl') ? ', and Ohl sees to what the tunnels did' : ''}. Wounds close, mostly.`); }, go:'b3_c1_fire_sat'},
          b3DeckChoice(1),
          {t:'Leave it.'}]}),
    b3_c1_fire_sat:()=>({sp:'The Fourth\'s fire', txt:
`An hour, then, in the mud by the fire, with the Host going past on its business and nobody's business coming to the Fourth.

${b31Say({kettle:`Kettle, flat on her back with her hands behind her head, watches a quorl come down at the edge of the camp, gold-brown wings going like a struck string. "Warm," she says, to nobody. "Chub said."`, ohl:`Ohl drinks his own tea and makes a face at it, and pours another.`, _:`One of them sleeps. The other pretends to.`})}${b3In('brisk') && b3In('tuft') ? `\n\nBrisk sits facing the hill, between Tuft and the hill. Tuft lets her.` : ''}${b3In('ellis') ? `\n\nEllis sits with her back to the fire and her face to the camp, which is how she rests, as far as anyone has ever been able to tell.` : ''}${b3In('vell') ? `\n\nVell has the rope off his shoulder and is whipping the ends again. They didn't need it. They never do. "Habit," he says, when he sees you looking. "The Guild fines you for a frayed end."` : ''}`,
      ch:[{t:'Up. The picket.', go:()=>startExplore()}]}),

    /* ---- Whiskeyjack and Mallet by the standard: the leg ---- */
    b3_c1_wj:()=> S.f.b3_c1_order ? B3CH1.dlg.b3_c1_wj_again() : ({sp:'Whiskeyjack · Onearm\'s Host', fx:()=>{ S.f.b3_legSeen = 1; }, txt:
`Whiskeyjack is standing by the Host's standard with his weight on one leg. Mallet, the Bridgeburners' healer, is standing in front of him with his hands on his hips, and neither of them has seen you yet, which means you hear the end of it.

"A week," Mallet says. "Flat. I'm not asking for a month. I'm not asking you to like it. A week, and I can make it so it holds you up in a fight instead of putting you in the mud in one."

"There's a parley at noon."

"There's always a parley. There'll be one after this, and a war after that one." Mallet looks at the leg as if it had done something to him personally. "I said this in Darujhistan. I said it on the quorl. You want it in writing? I'll find a clerk."

"I want my healer to go and see to his captain," Whiskeyjack says, mild as milk, "who looks worse than I do." And then, without turning his head: "Sergeant."

Mallet goes. He has stopped arguing, and has not agreed. On his way past he looks at you, and at the leg, and at you again. It is a whole sentence.`,
      ch:[{t:'"Sir."', go:'b3_c1_wj_order'},
          {t:'"The leg, sir."', go:'b3_c1_wj_leg'}]}),
    b3_c1_wj_leg:()=>({sp:'Whiskeyjack', txt:
`"Is fine." Two words, and the door shut behind them.

${b3In('ohl') ? `Ohl, behind you, clears his throat. "Sir. I'm Denul, if Mallet's busy. Three days. I'd want three days, and you'd have to lie still for them, and I'd talk the whole time, which I'm told is worse than the knitting."

Whiskeyjack looks at him, not unkindly. "Your sergeant needs you more than I do, healer."

"With respect, sir, that's not true."

"No," Whiskeyjack agrees. "It isn't." He doesn't say anything else, and that is the end of it, and Ohl knows it, and says something to Hood in Ehrlii under his breath that is not a prayer.` : `He shifts his weight back onto it, deliberately, the way you'd put a boot on a snake to show it who's in charge. Something goes tight round his mouth and comes back.

"There's a parley at noon," he says. "Brood's people will be watching how I stand. I'll stand."`}`,
      ch:[{t:'"Sir."', go:'b3_c1_wj_order'}]}),
    b3_c1_wj_order:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c1_order = 1; }, txt:
`He looks at the Fourth, and counts it without seeming to, the way he did on this hill a year ago at the Bridgeburners' fire. ${!b3Fallen().length && (b3In('ellis') || b3In('vell')) ? `"${numw(b31Five(), true)}," he says. His eyes go to ${b3In('ellis') ? 'Ellis' : 'Vell'}, the one who wasn't in the Fourth the first time it stood on this hill, and back. "Still."` : b31Five() >= 5 && !b3Fallen().length ? `"All five," he says. "Still."` : b3Fallen().length ? `"${numw(b31Five(), true)}." A pause you could stand a spear in. "I heard. ${b3FallenNames()}." He doesn't say he's sorry. He says the names, which is better.` : `"${numw(b31Five(), true)}," he says. "Still."`}

Then he points with his chin, north, at the broken line of the city wall and the rubble at its foot. "The north quarter. You know it. You were down the sapper tunnels under it the week the sky came down, before any of us went back for anything." He doesn't ask what you found. He never did. "The old saps run out under the slope where Brood's army is camped. Under the ground where Dujek and Brood are going to stand at noon."

"The Host's wagons have been losing things at night, and the tracks go back down there. Pell says it's rats. Pell's rats carry crossbows." He looks at the sun. "Clear them. Before noon. I don't want anything under that ground but ground while two armies are standing on top of it."`,
      ch:[{t:'"Before noon, sir."', go:()=>startExplore()},
          {t:'"And after?"', go:'b3_c1_wj_after'}]}),
    b3_c1_wj_after:()=>({sp:'Whiskeyjack', txt:
`"After, the Fourth stands picket on the line where the camps meet, below Brood's tent." The ghost of something crosses his face that might, on another man, be a smile. "You'll have a good view. You'll watch. You won't do anything else, Sergeant, whatever you see, because if a marine does anything at all on that line this afternoon, ten years of war start again by teatime."

He lets that sit. "The tunnels first."`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b3_c1_wj_again:()=>({sp:'Whiskeyjack', fx:()=>{ if (S.f.b3_c1_tunnelsDone) S.f.b3_c1_wjLine = 1; }, txt: S.f.b3_c1_tunnelsDone ?
`"Clear?"

You tell him. In order, without anything in it that isn't so${S.f.b3_c1_boy === 'let' ? `, including the boy who went up the far shaft` : S.f.b3_c1_boy === 'provost' ? `, including the boy you handed to the provosts` : ''}. He listens the way he always has, as if a figure in a ledger were coming out even.

"Good." A whole sentence. "The picket, then. East, below Brood's tent." He shifts on the leg. "Watch, Sergeant. Only watch."` :
`He's still by the standard, still on the one leg, watching the knot of banners thicken below Brood's tent. "The tunnels, Sergeant," he says, without looking round. "Noon doesn't move."`,
      ch:[{t:'Go.'}]}),
    b3_c1_mallet:()=>({sp:'Mallet · Bridgeburners', fx:()=>{ S.f.b3_c1_mallet = 1; }, txt:
`Mallet has stopped on his way back to the Bridgeburners' lines to glare at a tent rope, which has done nothing to him either.

"Sergeant." He knows the Fourth: every healer in the Host knows the squads that come back. "You heard that."

"It wants a week of him flat on his back. I said it in Darujhistan, the night after, with the splint still wet. It's not a hard leg. It's a stubborn man." He wipes his hands down his tunic as if the argument were on them. "I'm the best there is at this in the Host. That's the patient I got."

${b3In('ohl') ? `Ohl, beside you: "If he'd let me—"

"He won't let you. He won't let *me*, and I'm better than you." Mallet looks at Ohl. "No offence."

"None," says Ohl. "You are." They look at each other, two healers, the way two sappers look at the same fuse.` : `He looks back toward the standard, where Whiskeyjack is standing on the leg as if it were a point of honour, which it is.`}

"You've a squad that watches him," Mallet says. "I've noticed. He's noticed. Keep watching." He goes.`,
      ch:[{t:'Leave him to it.'}]}),

    /* ---- Tav at the Fourth Regiment's cook-fire ---- */
    b3_c1_tav:()=> b3In('brisk') ? ({sp:'The Fourth Regiment\'s lines', fx:()=>{ S.f.b3_tav = 1; }, txt:
`The Fourth Regiment of the Second is camped at the far end of the lines, where the ground is worst, which Brisk says is a family tradition. There is a big man at a cook-fire who can't sing, singing. It is a Cawn barge song, the one about the bargeman's wife and the tollkeeper's boat, and he has all the words right and nothing else.

Brisk stops at the edge of the light. She never speaks first, not the first time in a day. She stands there until he feels it on the back of his neck.

He stops singing. He doesn't turn round. ${b31Sealed() ? `"Opened it yet?"

"No."

"Good," says Tav. "I'm not dead." Then he turns round, and grins, and he has her face, only wider, and a nose somebody broke for him a long time ago.` : `"Four coppers," he says. "Still not paying."

"Bastard," says Brisk, with enormous affection.

He turns round. He has her face, only wider, and a nose somebody broke for him a long time ago, and he is grinning.`}

"So this is the sergeant." He gets up. He keeps getting up for a while; there is a lot of him. "Tavrin. Tav. Corporal, Fourth Regiment, heavy, the Second, what's left of it." He looks at the Fourth the way the Second looks at marines, which is down, and then he looks at Brisk, and stops doing it. "She talks about you. Two words a week. One of them's *sergeant*."`,
      ch:[{t:'"What\'s the other one?"', go:'b3_c1_tav_word'},
          {t:'Sit at his fire a while.', fx:()=>{ b31L('brisk', 1); S.f.b3_c1_tavSat = 1; }, go:'b3_c1_tav_sat'},
          {t:'"Corporal." Leave them to it.', fx:()=>{ S.f.b3_c1_tavLeft = 1; }, go:'b3_c1_tav_left'}]}) :
      ({sp:'The Fourth Regiment\'s lines', fx:()=>{ S.f.b3_tav = 1; }, txt: b31BriskGone() ?
`The Fourth Regiment of the Second is camped at the far end of the lines, where the ground is worst. There is a big man at a cook-fire who can't sing, not singing. He sees you coming a long way off. He has been watching that end of the camp for a week.

He gets up. He keeps getting up for a while; there is a lot of him, and he has her face, only wider. "Sergeant {sgt}," he says. "Tavrin. Tav. I read the rolls in Darujhistan." He doesn't say whose name was on them. He doesn't have to; you are standing here without her.

"Did she stand in front of something?"

You tell him. All of it, in order, because she would have wanted it in order.

He nods, slowly, the whole time. "Course she did," he says at the end. "I told her not to. In writing." He looks at the fire. "Sit, if you want. I'm not going to sing."` :
`The Fourth Regiment of the Second is camped at the far end of the lines, where the ground is worst. A big man at a cook-fire who can't sing is singing, a Cawn barge song with all the words right and nothing else. He stops when he sees the Fourth, and looks along it for somebody, and doesn't find her.

"She's on a detail," he says. It isn't a question. "Tell her Tav says four coppers." He goes back to singing, worse.`,
      ch:[{t:'Sit with him a while.', req:b31BriskGone, fx:()=>{ S.f.b3_c1_tavSat = 1; }, go:'b3_c1_tav_grief'},
          {t:'Leave him to his fire.'}]}),
    b3_c1_tav_word:()=>({sp:'Tav', txt:
`"*Fine*," says Tav. "As in, *the sergeant's fine*. Every week. I asked her once what that meant, fine, and she hit me." He rubs his arm, remembering. "Twelve years old, she hit like a mooring post. Still does."

"It means fine," says Brisk.

"See?" He spreads his hands to you. "That's what I get." Then he digs in his pack and comes out with a whetstone in a leather sleeve, and holds it out to you, not to her. "Here. Second Army issue. I've two." He waits until you take it. "For whoever's edge she stands next to. She'll not take it off me herself. She thinks I'd make a thing of it."

"You would," says Brisk.

"I would," Tav agrees.`,
      ch:[{t:'Take it.', fx:()=>{ gain('b3_c1_whetstone'); S.f.b3_c1_whetstone = 1; }, go:'b3_c1_tav_end'},
          {t:'"Give it to her yourself, Corporal."', fx:()=>{ b31L('brisk', -1); b31L('kettle', 1); S.f.b3_c1_whetRefused = 1; }, go:'b3_c1_tav_refuse'}]}),
    b3_c1_tav_refuse:()=>({sp:'Tav', txt:
`Tav looks at you, and at Brisk, and laughs out loud: a big, bad, barge-hand's laugh that turns heads three fires over.

"I like this one," he tells her. He puts the whetstone back in his pack. "I'll give it to you at Coral, then. Or wherever." He sits down again, and picks the song up where he left it, worse.

Brisk keeps her eyes off you for a while. ${b3In('kettle') ? `Kettle doesn't, and looks delighted, and says nothing, which for Kettle is a sort of medal.` : ''}`,
      ch:[{t:'Back to the lines.'}]}),
    b3_c1_tav_sat:()=>({sp:'Tav', txt:
`You sit. The Fourth Regiment's fire is bigger than the Fourth's and smokier, and the heavy infantry round it look at the marines the way heavies look at marines, and then at Tav, and stop.

Tav sings the barge song through, all of it, eleven verses, very badly. The squad lets him. When he gets to the verse about the tollkeeper's boat Brisk says the last line with him, under her breath, in the Cawn way, and doesn't seem to know she's done it.

Afterwards he digs in his pack and holds out a whetstone in a leather sleeve, to you. "Second Army issue. I've two. For whoever's edge she stands next to." He jerks his head at his sister. "She'll not take it off me. She thinks I'd make a thing of it."

"You would," says Brisk.

"I would," Tav agrees.`,
      ch:[{t:'Take it.', fx:()=>{ gain('b3_c1_whetstone'); S.f.b3_c1_whetstone = 1; }, go:'b3_c1_tav_end'}]}),
    b3_c1_tav_left:()=>({sp:'Tav', txt:
`You leave them to it. When you look back from the end of the row, Tav has started the song again, and Brisk is sitting on an upturned bucket at his fire with her shield across her knees, not singing, and not leaving either.

She catches up with the squad a quarter of an hour later, at a steady walk. "Sergeant." That's all. It's a thank-you, in her dialect.`,
      ch:[{t:'Back to the lines.'}]}),
    b3_c1_tav_end:()=>({sp:'Tav', txt:
`The whetstone is warm from his pack and worn into a shallow saddle in the middle by a great many blades.

"Right." Tav slaps his knees and stands, and keeps standing. "Parley at noon. Fourth Regiment's on the far end of the line, where nothing will happen, which is where the Second always is, these days." He looks at his sister. "Don't stand in front of things."

"I'll stand where I'm put."

"That's what I'm afraid of." He says it lightly. He doesn't mean it lightly, and she knows, and that is the whole of the conversation, and it was enough.`,
      ch:[{t:'Back to the lines.'}]}),
    b3_c1_tav_grief:()=>({sp:'Tav', txt:
`You sit. He doesn't sing. Neither of you says anything for a long while, which is the right length.

At last he digs in his pack and comes out with a whetstone in a leather sleeve, worn into a saddle in the middle. "Second Army issue. I had two. One was for her, if she ever let me." He holds it out. "She'd want it on somebody's edge. Not in a pack."

He waits until you take it. "Four coppers," he says to the fire, and that is the last of it.`,
      ch:[{t:'Take it, and go.', fx:()=>{ gain('b3_c1_whetstone'); S.f.b3_c1_whetstone = 1; }, go:()=>startExplore()}]}),
    b3_c1_tav_again:()=>({sp:'Tav', txt: b3In('brisk') ?
`Tav is singing again. ${S.f.b3_c1_parleyDone ? `"Heard your officer hit their king," he says, between verses. "The whole Second heard. We cheered. Quietly. In the regiment voice."` : `He lifts a hand to Brisk without stopping. She lifts one back. That's the visit; they've done it every day for a week.`}` :
`Tav is at his fire. He lifts a hand to you, and you lift one back.`,
      ch:[{t:'Leave him to it.'}]}),

    /* ---- Pell's wagon ---- */
    b3_c1_pell:()=>({sp:'Quartermaster Pell', fx:()=>{ S.f.b3_c1_pellMet = 1; }, again:()=>`Pell has the ledger open and his thumb on the page. You carry ${S.silver} silver.`, txt:
`Pell has a wagon, a ledger, and the face of a man who has been asked for things for a year and has started saying no before the question. He was the Host's quartermaster at Pale the first time. He is the Host's quartermaster at Pale now. In between, he says, he was outlawed, by people who have never once had to feed an army, and he has decided this means he can charge what he likes.

"Moranth stock. Fresh off the quorls."${b3In('kettle') ? ` He doesn't look at Kettle. He doesn't need to; everyone always knows where Kettle is relative to a munitions crate.` : ''} ${S.f.b3_c1_tunnelsDone ? `"And the Fourth went down the old sap and brought me back two crates of my own salve and a sack of my own boot-nails. Adequate."` : `"Somebody's been coming up out of the old saps at night and lifting it off my wagon. I told Whiskeyjack it was rats."`}

You carry ${S.silver} silver.`,
      ch:[
        {t:'Sharper, 6 silver', tag:`have ${S.inv.sharper || 0}`, req:()=>S.silver >= 6, fx:()=>{ S.silver -= 6; S.inv.sharper = (S.inv.sharper || 0) + 1; note('Bought a sharper.', 'good'); AUDIO.play('coin'); }, go:'b3_c1_pell'},
        {t:'Burner, 5 silver', tag:`have ${S.inv.burner || 0}`, req:()=>S.silver >= 5, fx:()=>{ S.silver -= 5; S.inv.burner = (S.inv.burner || 0) + 1; note('Bought a burner.', 'good'); AUDIO.play('coin'); }, go:'b3_c1_pell'},
        {t:'Healing salve, 5 silver', tag:`have ${S.inv.salve || 0}`, req:()=>S.silver >= 5, fx:()=>{ S.silver -= 5; S.inv.salve = (S.inv.salve || 0) + 1; note('Bought a salve.', 'good'); AUDIO.play('coin'); }, go:'b3_c1_pell'},
        {t:'Smoker, 4 silver', tag:`have ${S.inv.smoker || 0}`, req:()=>S.silver >= 4, fx:()=>{ S.silver -= 4; S.inv.smoker = (S.inv.smoker || 0) + 1; note('Bought a smoker.', 'good'); AUDIO.play('coin'); }, go:'b3_c1_pell'},
        {t:'"We named a mule after you, Pell."', req:()=>b3In('kettle') && !S.f.b3_c1_mule, fx:()=>{ S.f.b3_c1_mule = 1; }, go:'b3_c1_pell_mule'},
        {t:'Leave.'}]}),
    b3_c1_pell_mule:()=>({sp:'Quartermaster Pell', txt:
`"I heard." Pell writes something in the ledger. "Word gets about. Bit Gadrobi, I'm told. Did the same face."

"We left him in Darujhistan," says Kettle. "With the Paviors' Guild. In lieu of wages."

Pell considers this for some time, the pen still. "Then he's better off than me," he says at last, and underlines something. "Adequate."${b3In('brisk') ? `\n\nBrisk, who has not smiled since the Fete, turns away to look at the hill, and her shoulders go, once.` : ''}`,
      ch:[{t:'Back to the wagon.', go:'b3_c1_pell'}]}),

    /* ---- the old north sap: the rubble by the city wall, and the way down ---- */
    b3_c1_mouth:()=> !S.f.b3_c1_order ? {sp:'The rubble of the north quarter', txt:
`The rubble at the foot of the broken wall, where the north quarter used to be, and in it the mouth of the old sap, timbered, black, breathing cold air very gently up at the sky.

The Fourth went down this hole once, the week the sky came down, with a lantern and a dead mage's errand. The squad leaves that unsaid. There are no orders to go down it today, either.`,
      ch:[{t:'Leave it.'}]} : S.f.b3_c1_tunnelsDone ? {sp:'The rubble of the north quarter', txt:
`The old sap mouth. Quiet, now. A Host detail is already sitting on it with a brazier and a pot of tar, and a corporal waves at you to say the Host has it from here.`,
      ch:[{t:'Leave it.'}]} : ({sp:'The old north sap', scene:'b3_c1_tunnels', txt:
`The sap mouth, timbered and black, in the rubble where the north quarter was. The Fourth went down it once, the week the sky came down, for a cadre mage who wanted a dead man's satchel brought to her and to nobody who asked nicely along the way.

It doesn't smell the way it did. ${b3In('tuft') ? `"The cold's gone," Tuft says, from the lip, very quietly. "Quick Ben said a month." It has been a good deal more than a month.` : `The cold that lived down there, the cold that pushed against the lantern, is gone.`} What it smells of now is smoke, and people, and somebody's dinner.

Fresh boot-prints in the mud at the mouth, going down. A Host crate-lid with Pell's mark on it, kicked into the rubble. ${b3In('kettle') ? `Kettle crouches over a scrap of fuse-cord on the timbers and sniffs it. "Ours," she says. "Old. Somebody down there knows what this is."` : ''}${b3In('ellis') ? `\n\nEllis is down on one knee over the prints with her bare hand flat beside them, not touching. "Four," she says. "One heavy. One favours the left foot. One's barefoot, and light." A pause. "The fourth walks as if the place is his. He'll be at the back."` : ''}${b3In('vell') ? `\n\nVell looks down the hole with the expression of a rope boy who has been shown a building upside down. "It's a roof," he says at last, "only on the wrong side." He does not sound reassured.` : ''}

${b3In('brisk') ? `"Straight down the sap," Brisk says, "or the side gallery." She doesn't say *the one the deserters used, the first time*. She doesn't have to.` : `There are two ways in: straight down the sap, or the side gallery the deserters used, the first time.`}`,
      ch:[{t:'"Straight down. Shields first."', go:()=>startBattle('b3_c1_tunnels', {})},
          {t:'Take the side gallery and come in behind them.', check:['wits',13],
            edges:id=>[id === 'brisk' && ['she walked it, the first time, at the back', 1], id === 'tuft' && ['she remembers every turn of it, and wishes she didn\'t', 1], id === 'kettle' && ['she remembers where the timbers were bad', 1], id === 'ohl' && ['he remembers the smell, not the turns', -1]],
            near:{t:'You come in behind them, but a loose timber goes as you do. Half of them are turning round already.'},
            go:()=>startBattle('b3_c1_tunnels', nearMiss() ? {} : {surprise:'p'}), fail:'b3_c1_mouth_lost'},
          {t:'Kettle rolls a sharper down the sap ahead of you.', tag:'uses 1 sharper', req:()=>b3In('kettle') && (S.inv.sharper || 0) > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c1_tunnels', {pre:true})},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b3_c1_mouth_lost:()=>({sp:'The side gallery', scene:'b3_c1_tunnels', txt:
`The side gallery is where it was, but the floor of it isn't: a year of seep has brought half the roof down into it, and the Fourth goes the long way round through a crawl that ends, with a great deal of noise, in a fall of loose stone straight into the main sap.

Right in front of them.

${b31Say({kettle:`"Hello," says Kettle, from the bottom of the heap, to a man with a crossbow. "We're from the quartermaster."`, _:`Down the sap, a man shouts. Lamps go out. Something with a string on it goes *click*.`})}${b3In('vell') ? `\n\nVell comes down the fall of stone feet first, and lands like a cat, and is the only one of the Fourth who does.` : ''}`,
      ch:[{t:'Up. Into them.', go:()=>startBattle('b3_c1_tunnels', {surprise:'e'})}]}),
    b3_c1_tunnels_after:()=>({sp:'The fallen chamber', scene:'b3_c1_tunnels', fx:()=>{ S.f.b3_c1_tunnelsDone = 1; }, txt:
`The man by the lamp is down. When the squad turns him over he is older than he fought: grey in the stubble, a Second Army tattoo on the back of the hand, sapper's burns up both forearms. ${b3In('ohl') ? `Ohl kneels, and looks, and closes the eyes. "He came down the night the sky fell," he says. "I'd know the burns. He just never went up." He does not take out the oilcloth. "I don't know his name. I won't write a man I don't know."` : `He came down the night the sky fell, by the burns. He never went up.`}

Behind the beam there are Pell's crates, two of salve and a sack of boot-nails, a bed of stolen blankets, and, scratched into the timber over the bed in charcoal, in a big careful hand: *THE FIST IS STILL COUNTING HEADS*. Somebody, once, carried a word down here, and somebody else kept it.${b3In('kettle') ? `\n\nKettle looks down the dark fork where the passage goes on under the slope, toward the place the Bridgeburners' gallery came down the night of the assault. "That's where—" she begins. "Leave it," says ${b3In('brisk') ? 'Brisk' : 'somebody'}.` : ''}

And there is a boy. Sixteen, perhaps, hiding behind the crates with a knife he hasn't used, filthy, blinking at the lamps. He was a camp follower's son, he says, when the Host was here before. Then the Host went to Darujhistan and he didn't.${b3In('ellis') ? `\n\n"The barefoot one," Ellis says, to nobody, and lowers the bow.` : ''}${b3In('vell') ? ` Vell looks at him a while, the knife, the blinking. "I was carrying rope at thirteen," he says, to you, not the boy. "Nobody asked me either."` : ''}`,
      ch:[{t:'"Up. The provosts will feed you, at least."', fx:()=>{ S.f.b3_c1_boy = 'provost'; b31L('brisk', 1); }, go:'b3_c1_boy_up'},
          {t:'Show him the far shaft into the city. "Go. Now."', fx:()=>{ S.f.b3_c1_boy = 'let'; b31L('ohl', 1); b31L('brisk', -1); }, go:'b3_c1_boy_let'}]}),
    b3_c1_boy_up:()=>({sp:'The old north sap', scene:'b3_c1_tunnels', txt:
`He comes up between ${b3In('brisk') ? 'Brisk and the sergeant' : 'the squad'} into the noon light, flinching at it, and the provosts take him at the sap mouth with a blanket and a bowl, which is more than he expected and less than he needed.

${b31Say({brisk:`"He'll eat," says Brisk. "He'll be a soldier by Capustan, or wherever it is. The Host makes new ones." She doesn't sound sorry. She doesn't sound glad either.`, _:`He'll eat. The Host makes new soldiers out of less.`})}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b3_c1_boy_let:()=>({sp:'The old north sap', scene:'b3_c1_tunnels', txt:
`He goes up the far shaft into the ruins of the north quarter like a cat up a drainpipe, without a backward glance, and is gone.

${b31Say({ohl:`"He'll find the Pale garrison," Ohl says, "or a cookhouse, or a girl. Any of those is better than a provost." He puts his hands in his sleeves. "We don't leave people. But sometimes they leave, and you let them."`, _:`Whatever he finds up there, it isn't a provost.`})}${b3In('ellis') ? `\n\n"He lasted a year down here and nobody found him," Ellis says. "That's a skill. Somebody up there will pay for it." She doesn't say who. She knows who.` : ''}${b3In('brisk') ? `\n\nBrisk says nothing at all, all the way back up the sap.` : ''}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* ---- east, to the picket ---- */
    b3_c1_to_line:()=> !S.f.b3_c1_tunnelsDone ? {sp:'The east lines', txt:
`East, the Host's palisade, and beyond it the line where the camps meet. ${S.f.b3_c1_order ? `Whiskeyjack said the tunnels first. Noon doesn't move.` : `Whiskeyjack sent for you. He's by the standard.`}`,
      ch:[{t:'Not yet.'}]} : {sp:'The east lines', txt:
`East, through the gap in the Host's palisade, to the Fourth's stretch of the picket: forty paces of trodden mud between the Host's ditch and Brood's first tents, and a standard on a pole to say whose forty paces they are. Noon is close.`,
      ch:[{t:'The picket.', onward:true, go:()=>{ startExplore('b3_c1_line'); talk('b3_c1_line_arrive'); }},
          {t:'Not yet.'}]},
    b3_c1_line_arrive:()=>({sp:'The picket · where the camps meet', fx:()=>{ S.f.b3_c1_onLine = 1; }, txt:
`The Fourth's stretch of the picket is a standard on a pole, a ditch nobody has finished, and a long view.

Brood's camp starts forty paces off, and it is not one camp but a dozen: the tall dark-skinned Tiste Andii, very still, in their own lines; Barghast round a fire, shoving each other over a line in the dirt and roaring; a scatter of woodsmen in hats that were recently alive; mercenaries in mismatched mail; and south, down the slope, the Rhivi tents and the herds. Up the hill is the command tent, and below it the trampled meeting ground, already filling with the kind of people who stand near the great when the great are about to talk.

${b31Say({kettle:`"Ten years," says Kettle, "we tried to kill all that." She says it with something like wonder. "We were *rubbish* at it."`, brisk:`"Ten years," says Brisk, and leaves it there.`, _:`Ten years the Host tried to kill all that. Now it stands forty paces off, and the Fourth watches it, and it watches back.`})}${b3In('ellis') ? `\n\nEllis has started counting fires. She does it with her lips shut and her eyes moving, the way she was taught, and she will have a number by noon, and it will be right, and she will give it to nobody unless asked.` : ''}${b3In('vell') ? `\n\n"Their hats are alive," Vell says, of the woodsmen. "Some of them. I saw one move."` : ''}`,
      ch:[{t:'To the post.'}]}),
    b3_c1_line_back:()=>({sp:'The Host\'s palisade', txt: S.f.b3_c1_parleyDone ?
`West, back through the gap into the Host's lines. The Fourth is off the line at dusk; the Rhivi camp is south.` :
`West, back through the gap into the Host's lines. The Fourth is on picket until it's relieved.`,
      ch:[{t:'Back into the Host\'s lines.', go:()=>startExplore('b3_c1_camp')}, {t:'Not yet.'}]}),

    /* ---- the parley, from the picket ---- */
    b3_c1_post:()=> S.f.b3_c1_parleyDone ? {sp:'The Fourth\'s post', txt:
`The meeting ground is emptying. The great have gone up into the command tent, and the people who stand near the great have gone with them, and what is left is trampled grass and a long afternoon on the picket.${b3In('brisk') ? ` Brisk has not taken her eyes off the tent flap since.` : ''}`,
      ch:[{t:'Stand the line.'}]} :
      ({sp:'The Fourth\'s post', txt:
`Noon. The meeting ground below Brood's command tent is a hundred paces up the slope: close enough to see faces, too far to hear much, which ${b3In('brisk') ? 'Brisk says' : 'every marine knows'} is the right distance for a parley.

The Host's party is coming up through the lines on foot. On the far side, Brood's people are already gathering. Everyone on both picket lines has found a reason to be facing the same way.`,
      ch:[{t:'Stand the line. Watch.', go:'b3_c1_parley'},
          {t:'Not yet.'}]}),
    b3_c1_parley:()=>({sp:'The parley ground', scene:'b3_c1_parley', txt:
`Dujek Onearm comes up the slope first: thin, of no great height, in plain armour with a standard-issue shortsword at his belt and one sleeve pinned, looking like a quartermaster who has come to argue about a bill. Whiskeyjack is a step to his left, grey-bearded, in a visored helm, walking as if the leg were nobody's business, and you can see from the picket that it is costing him. A Black Moranth in black chitin walks behind them with no expression at all, since it has no face to put one on.

At Dujek's right, a step back, comes the standard bearer, a nondescript young man under a marine's rain cape with the Host's standard on his shoulder.${b3In('tuft') ? `

Beside you, Tuft goes still. Not the stillness of watching; the other kind, the kind a hare has in long grass. She doesn't look away from the standard bearer and she doesn't seem to know she's doing it. "I don't know," she says, very low, before you ask. "I don't know why. Don't ask me." Then he is past, and whatever it was goes past with him, and she breathes.` : ''}

On the far side: Caladan Brood, huge and broad-faced, with a hammer on his back that it would take two of the Host to lift; a Tiste Andii woman beside him in black, grave and watchful, who ${b3In('sohra') || S.f.b3_sohraMet ? 'Sohra says' : 'the pickets say'} is Korlat; a great black bird hopping along a tent ridge and shouting at everyone; a stooped old Rhivi woman with her hand on the shoulder of a child in red wool; and at Brood's shoulder, a tall man, gaunt and grey, in a fur-collared cloak, who looks at nobody, because nobody, his whole body says, is worth the trouble.`,
      ch:[{t:'Watch the child.', go:'b3_c1_parley_child'}]}),
    b3_c1_parley_child:()=>({sp:'The parley ground', scene:'b3_c1_parley', fx:()=>{ if (b3In('tuft')) S.f.b3_tuftChild = 1; }, txt:
`The child is ten, perhaps, or looks it, in a red wool smock too short at the wrists, as if it had fitted her last month. The old Rhivi woman beside her has white hair and a young woman's way of standing, which is wrong, and her hand on the child's shoulder is the hand of somebody holding on.

${b3In('tuft') ? `Tuft has stopped breathing again. Not because of any standard bearer.

The child turns her head. Over the heads of the great, over a hundred paces of grass and two armies' worth of watchers, she looks straight down the slope at the Fourth's stretch of the picket, and finds Tuft, and looks at her: the way you look at somebody across a crowded room whose face you know and can't place. Half knowing. A small frown, as if at a word on the tip of the tongue.

Then the old woman says something, and the child looks away.

Tuft doesn't move. "She knew me," she says, and her voice is perfectly steady. "Not *me*. Not yet. She knew there was somebody." She puts her hands behind her back so nobody will see what they're doing. "I'm not going up there. I want to go up there more than I have ever wanted anything. I'm not going."${b3In('brisk') ? `\n\nBrisk moves, half a step, so her shield is between Tuft and the slope. It isn't for the slope.` : ''}` : `The child turns her head, once, and looks down the slope along the picket, the whole length of it, as if she were counting it. Then the old woman says something, and she looks away.`}`,
      ch:[{t:'Keep watching. The tall man has started to talk.', go:'b3_c1_parley_strike'}]}),
    b3_c1_parley_strike:()=>({sp:'The parley ground', scene:'b3_c1_parley', txt:
`You can't hear what Dujek says, or what Brood says back. You can hear the tall man. He has a voice that has given orders for longer than the Empire has had a name, and it carries, cold, across the whole slope.

"*Abomination*."

He is looking at the child. The whole meeting ground has gone quiet round that one word the way a field goes quiet round a hawk. He says more; most of it is lost on the slope, but not all of it. *Kill it. Now. Before it*— and something else, and his hand moves toward the hilt at his hip, not quickly, the way you reach for a tool.

Whiskeyjack moves first. He has to come round Dujek to do it, on the leg, and the leg takes his weight wrong for one step and he doesn't care. He strikes the tall man. From the picket it is only a shape and a sound, a blow, flat and hard, and the tall man goes back a pace with his head turned.

Every hand on both picket lines is on a weapon. ${b31Say({brisk:`Brisk's shield is up before she knows it.`, kettle:`Kettle's hand is in the satchel.`, _:`Yours too.`})} ${b3In('ohl') ? 'Ohl says something to Hood in Ehrlii that sounds like a bargain.' : ''}${b3In('ellis') ? ' Ellis has an arrow on the string, pointed at the grass, which is the only place on this slope it can point.' : ''} The Host's line holds its breath. So does Brood's.

Then Brood is between them. He doesn't seem to hurry; he is simply there, the way a hill is there, and he says one word, low, that doesn't reach the picket. The tall man straightens. He looks at Whiskeyjack for a long time. He looks at the child. Then he turns his back on the lot of them, and that, somehow, is worse than the hilt.

The child has gone to Whiskeyjack. She stands beside him, and looks up at him, and says something.${b3In('ohl') ? ` Ohl, who reads lips in three languages, says afterward that it might have been *uncle*. He is not sure. He is sure.` : ''}`,
      ch:[{t:'Breathe.', go:'b3_c1_parley_after'}]}),
    b3_c1_parley_after:()=>({sp:'The picket', scene:'b3_c1_parley_after', fx:()=>{ S.f.b3_c1_parleyDone = 1; S.f.b3_kallor = 1; ally(0, 1, 'The parley'); }, txt:
`It takes the meeting ground a while to start breathing again, and then it does, all at once, too loud. The great go up into the command tent. The tall man in the fur-collared cloak goes in last, alone, and the tent flap falls behind him like a door.

"Kallor," says a pikeman of the Host along the line, to nobody, as if he had been waiting all morning for a reason to say it. "Brood's second. They say he was a king, once. Of somewhere that isn't there any more." He spits. "They say he did that to it."

${b31Say({brisk:`"Good," says Brisk. That's all. She means the blow.`, kettle:`"He *hit* him," Kettle says. "Whiskeyjack. He hit Brood's— he walked over on that leg and he *hit* him." She can't decide whether she's frightened or in love.`, _:`The Fourth's stretch of the line has gone very quiet.`})}${b3In('ohl') ? `\n\n"On that leg," Ohl says. "Hood's breath. Mallet's going to kill him before anybody else gets the chance."` : ''}${b3In('tuft') ? `\n\nTuft hasn't moved. "I've seen him look at her," she says. "Since she was a bundle on a saddle. I've seen him *look*." She takes a breath that doesn't go all the way down. "Now I've heard him say it."` : ''}${b3In('ellis') ? `\n\nEllis lets the arrow off the string, slowly. "The Claw keeps a page on Brood's second," she says. "I read it once. It's short." She puts the arrow back. "It says *don't be in the room*."` : ''}`,
      ch:[{t:'Stand the line.', go:()=>startExplore()}]}),

    /* ---- the Ilgres fire ---- */
    b3_c1_ilgres:()=> S.f.b3_c1_ilgres ? {sp:'The Ilgres fire', txt: ['won', 'helped', 'calmed'].includes(S.f.b3_c1_ilgres) ?
`The Ilgres at their fire raise their cups to the Fourth as it passes. Sarhul bares his teeth, which is friendly. Probably.` :
`The Ilgres at their fire watch the Fourth go past and say nothing. Sarhul's lip is still split. He touches it, and looks at you.`,
      ch:[{t:'Walk on.'}]} : ({sp:'Sarhul · Ilgres Barghast', fx:()=>{ S.f.b3_c1_ilgresMet = 1; }, txt:
`Six Barghast round a fire, big men and two bigger women, faces bare (no white paint: Brood's Barghast have no use for it, one of them tells you later, with contempt for somebody), iron torcs at every throat. They have drawn a line in the dirt and are shoving each other over it shield to shield, two at a time, and roaring at whoever loses.

The biggest of them, a man with a jaw like a cart-axle and a torc as thick as a child's wrist, sees the Fourth's shields and grins. "Malazans." He says it the way you'd say *fish*. "I am Sarhul, of the Ilgres. Ten years, your shields against our shields, and never a fair push." He scuffs the line with his boot. "One push. Your best against me, over the line. If you win: iron." He touches the torc. "If we win, you carry our water up to the meeting ground, and everybody sees."

Behind him the youngest of them, a long boy with his first torc still bright, watches the Fourth with a look that isn't a grin.`,
      ch:[{t:'Put a shield on the line.', check:['might',14],
            edges:id=>[id === 'brisk' && ['six years heavy infantry, and the line is the only thing she has ever loved', 2], id === 'sgt' && ['a shield picked up at Nathilog and never put down', 1], id === 'ohl' && ['an old man, and he knows it', -2], id === 'tuft' && ['she is half his weight', -2], id === 'kettle' && ['she would rather blow the line up', -1]],
            clean:{t:'Clean over, and Sarhul sits down hard in the dirt, laughing.', fx:()=>{ S.f.b3_c1_ilgresClean = 1; }},
            near:{t:()=>`Yes, but Sarhul doesn't go quietly: the rim of his torc catches ${NAME(ROLL().who || 'sgt')} over the eye on the way down, and it bleeds the way brows do: ${bruiseN()} health down at the start of the next fight.`, fx:()=>bruise(ROLL().who || 'sgt', bruiseN())},
            go:'b3_c1_ilgres_win', fail:'b3_c1_ilgres_lost'},
          {t:'"Not today, Sarhul."', fx:()=>{ S.f.b3_c1_ilgresDeclined = 1; }, go:'b3_c1_ilgres_no'}]}),
    b3_c1_ilgres_no:()=>({sp:'Sarhul', txt:
`"Not today," Sarhul repeats, and the Ilgres hoot. "Not in ten years either. Malazans." But he says it without heat, and goes back to shoving his own people over the line, and when you look back from the post he is still grinning.`,
      ch:[{t:'Walk on.'}]}),
    b3_c1_ilgres_win:()=>({sp:'Sarhul', fx:()=>{ S.f.b3_c1_ilgres = 'won'; gain('b3_c1_torc'); S.f.b3_c1_torc = 1; ally(1, 0, 'The Ilgres fire'); }, txt:
`${by({brisk:`Brisk sets her shield against his, rim to rim, and plants her feet, and nothing at all happens except that the Ilgres stop roaring. Then she leans. It isn't a shove. It's the line at Nathilog, all of it, in one woman, and Sarhul goes back over the scuff in the dirt one heel at a time, looking astonished.`, sgt:`You set your shield against his and lean, the way the marines drill it and the heavies laugh at, low and patient, and Sarhul goes back over the line one heel at a time, looking astonished.`, _:`{who} sets a shield against his and leans, low and patient, and Sarhul goes back over the line one heel at a time, looking astonished.`})}

The Ilgres roar louder than they did for their own. Sarhul gets up, and wipes his hands, and takes the torc off his own neck, which takes some doing, and puts it in ${by({sgt:'your', _:'{who}\'s'})} hands. "Iron," he says. "Wear it. Then everybody sees." He bares his teeth. "Next time, two pushes."

The youngest of them doesn't cheer. He goes and sits on the far side of the fire, with his back to the Fourth.`,
      ch:[{t:'Walk on.'}]}),
    b3_c1_ilgres_lost:()=>({sp:'Sarhul', txt:
`${by({brisk:`Brisk sets her shield against his and leans, and for a moment it's even, and then her heel finds a wet patch in the mud and she goes back over the line on one knee.`, _:`{who} sets a shield against his and leans, and for a moment it's even, and then Sarhul simply has more of himself to push with, and that's that.`})} The Ilgres roar. Sarhul laughs and holds out a hand to help ${by({sgt:'you', _:'{who}'})} up, which is the custom.

Then the youngest of them steps across the line with a knife out. He is shouting in Barghast; something about Malazans, something about his father, something about ten years. His friends have stopped laughing. So has Sarhul. The knife is very bright and very close to ${by({brisk:'Brisk', sgt:'you', _:'{who}'})}.`,
      ch:[{t:'Talk him down. Slowly.', check:['guile',14],
            edges:id=>[id === 'ohl' && ['he has talked knives out of a great many boys', 2], id === 'kettle' && ['she talks so much he loses the thread', 1], id === 'brisk' && ['he is pointing the knife at her', -1], id === 'tuft' && ['she speaks no Barghast and her voice is very quiet', -1]],
            near:{t:'He puts it away, but he puts it away slowly, looking at you the whole time.', fx:()=>{ S.f.b3_c1_ilgresGrudge = 1; }},
            go:'b3_c1_ilgres_calm', fail:'b3_c1_ilgres_brawl'},
          {t:'"Shields."', go:'b3_c1_ilgres_brawl'}]}),
    b3_c1_ilgres_calm:()=>({sp:'Sarhul', fx:()=>{ S.f.b3_c1_ilgres = 'calmed'; ally(1, 0, 'The Ilgres fire'); }, txt:
`${by({ohl:`Ohl walks up to the boy as if he were a patient, talking the whole way in a mild Ehrlitan grumble, about knives and wrists and how much a tendon costs to sew back on, until the boy is listening to him instead of to himself.`, kettle:`Kettle talks. About knives, about the Ilgres, about a man she knew in Falar who drew on a Moranth and what happened to the knife after; she talks until the boy has lost the thread of his own anger and is trying to find it in hers.`, sgt:`You talk to him, low and level, the voice you use on new recruits and frightened horses, about his father, whom you never met, and about ten years, which you did.`, _:`{who} talks to him, low and level, until he is listening.`})}

The knife goes down. Sarhul takes it out of the boy's hand without looking at him and cuffs him across the back of the head, hard enough to hear. "Ten years," Sarhul says to you. "His father fell at the Mott, to Malazan crossbows. Mine at Blackdog. Yours?" He doesn't wait for an answer. "It is a new year." He holds out his hand again, properly this time.`,
      ch:[{t:'Take it.', go:()=>startExplore()}]}),
    b3_c1_ilgres_brawl:()=>({sp:'The Ilgres fire', txt:
`The boy goes in with the knife. ${by({brisk:'Brisk', _:'Somebody'})} catches it on a shield rim, and the boy's friends come in after him, because he is theirs, and the Fourth goes in after them, because it is the Fourth, and Sarhul roars something that might be *stop* and then, when nobody does, wades in himself.

It is not a contest any more.`,
      ch:[{t:'Fight.', go:()=>startBattle('b3_c1_brawl', {})}]}),
    b3_c1_brawl_after:()=>({sp:'The Ilgres fire', txt:
`The Ilgres are down, or sitting, or holding things that hurt. None of them is dead; the knife went into the fire at some point, and the boy is sitting on the far side of the line holding his wrist and crying with rage. Sarhul is flat on his back in the mud, looking at the sky with an expression of great interest.

Every picket within a hundred paces saw it. On Brood's side the watchers have gone very quiet. Somewhere up the slope an officer of the Host is going to hear about this, and so is one of Brood's.`,
      ch:[{t:'Hold out a hand to Sarhul. Then to the rest.', fx:()=>{ S.f.b3_c1_ilgres = 'helped'; ally(1, 0, 'The Ilgres fire'); gain('b3_c1_torc'); S.f.b3_c1_torc = 1; b31L('ohl', 1); }, go:'b3_c1_brawl_help'},
          {t:'Leave them in the mud. Back to the post.', fx:()=>{ S.f.b3_c1_ilgres = 'left'; ally(-1, 0, 'The Ilgres fire'); b31L('brisk', 1); b31L('ohl', -1); }, go:'b3_c1_brawl_leave'}]}),
    b3_c1_brawl_help:()=>({sp:'Sarhul', txt:
`Sarhul looks at the hand, and then takes it, and comes up out of the mud all at once like something surfacing. He looks round at his people, and at the Fourth, and laughs until he has to sit down again.

"Now it was a fair push," he says. He takes the torc off his own neck, which takes some doing, and drops it in your hand. "Iron. For the push and the hand." A skin goes round of something that tastes like a horse's opinion of you. ${b3In('ohl') ? 'Ohl splints the boy\'s wrist while he swears at him in Barghast, and the boy lets him. ' : ''}The watchers on Brood's side go back to watching the tent.`,
      ch:[{t:'Back to the post.', go:()=>startExplore()}]}),
    b3_c1_brawl_leave:()=>({sp:'The Ilgres fire', txt:
`You leave them where they are. Behind you, nobody laughs.

${b31Say({brisk:`"They drew first," Brisk says. "In front of both armies." She is already walking. "Let everybody see who got up."`, _:`They drew first. Let everybody see who got up.`})} On Brood's side the watchers watch the Fourth all the way back to its post, and keep watching after.`,
      ch:[{t:'Back to the post.', go:()=>startExplore()}]}),

    /* ---- a Mott Irregular ---- */
    b3_c1_mott:()=>({sp:'A Mott Irregular', fx:()=>{ S.f.b3_c1_mott = 1; }, txt:
`A lean man in a hat made out of something that was recently alive sits on a stump on Brood's side of the line with a crossbow across his knees and an apple, which he is peeling with a knife much too large for it in one long unbroken curl.

"Malazans," he says pleasantly. "Were you lot in Mott Wood? The year the rain didn't stop?"

${b3In('brisk') ? `Brisk's face does something complicated.` : `It is not the kind of question people ask for no reason.`}`,
      ch:[{t:'"We were."', go:'b3_c1_mott_yes'},
          {t:'"Not us."', go:'b3_c1_mott_no'}]}),
    b3_c1_mott_yes:()=>({sp:'A Mott Irregular', txt:
`"Ah," he says, delighted. "Then you'll know the hole by the split oak, on the ridge path. With the stakes in it." He mimes, with the apple. "That was me. And the deadfall at the stream, the one that took the mule. Me. And my brother did the thing with the hornets, but I helped." He beams. "Year and a half, you lot were in there. We used to bet on you. I won a hat." He touches it. "This one."

${b31Say({brisk:`"The hole by the split oak," says Brisk, very evenly, "had a sergeant of mine in it for two days."`, kettle:`"The *hornets*," says Kettle, with deep feeling.`, _:`Several of the Fourth have things to say about the hornets, and don't.`})}

"Lovely," says the Irregular. "Is he well?" He offers you a curl of apple peel, which seems to be meant as a courtesy. "No hard feelings. It was the war. Now it's a different war, and here we all are." He looks across at the command tent, and for a moment the cheer goes out of his face. "They say there's worse than us down south. I didn't think there was worse than us."`,
      ch:[{t:'Take the apple peel.', fx:()=>{ ally(1, 0, 'A Mott Irregular\'s apple'); }, go:'b3_c1_mott_end'},
          {t:'Walk on.'}]}),
    b3_c1_mott_no:()=>({sp:'A Mott Irregular', txt:
`"Pity," he says, and means it. "You'd have liked it. Well. You wouldn't. But you'd *remember* it." He goes back to the apple. "My brothers and me kept a Malazan army hunting through those trees for a year and a half. Never caught one of us. Well. One. He got better." He shows you the peel, still unbroken, a yard of it. "Patience. That's the whole secret of the Mott. You lot never had patience. Always marching somewhere."

He looks at the command tent. "Going to be marching a long way now, I hear."`,
      ch:[{t:'Walk on.'}]}),
    b3_c1_mott_end:()=>({sp:'A Mott Irregular', txt:
`You eat the apple peel. The Irregular watches you do it with enormous satisfaction, as if a treaty had been signed.

"There," he says. "Now we're kin. Third cousins, by apple." He settles his hat. "If you're ever in the Mott again, don't take the ridge path."`,
      ch:[{t:'Walk on.'}]}),

    /* ---- the Daru carriage ---- */
    b3_c1_delegate:()=>({sp:'A Daru attendant', fx:()=>{ S.f.b3_c1_delegate = 1; }, txt:
`A carriage has been driven out of the city and up to the edge of Brood's camp, and stuck there, axle-deep in spring mud, with its horses looking ashamed of it. A young Daru attendant in a coat much too good for the mud is standing on the step holding a parasol over nothing and a ledger against his chest.

"Soldier." He sounds relieved to see anyone who looks as if they might know where things are. "The Darujhistan delegation. Councillor D'Arle, Master Coll, Master Murillio, and" (a fractional pause, the pause of a young man trying very hard to be professional) "*him*." He looks at the ledger. "Fourteen trunks. Thirteen arrived. I'm told the fourteenth was eaten, or will be." He looks at you hopefully. "Is there a road?"`,
      ch:[{t:'"There\'s mud. There\'s more mud south."', go:'b3_c1_delegate_2'},
          {t:'Walk on.'}]}),
    b3_c1_delegate_2:()=>({sp:'A Daru attendant', txt:
`He takes this the way the young of Darujhistan take everything outside Darujhistan: as a personal discourtesy from the world. "South," he says. "They keep saying south. Master Coll says he's going with them. Further south. With the armies." He looks at the ledger as if it might contain an argument against this. It doesn't. "I'm to go with him."

"Bring boots," ${b31Say({vell:'Vell tells him, in a Daru District voice that makes the attendant look at him properly for the first time', kettle:'Kettle tells him kindly', brisk:'Brisk tells him', _:'you tell him'})}. He writes it in the ledger.`,
      ch:[{t:'Walk on.'}]}),
    b3_c1_kruppe:()=>({sp:'A round man in silks', fx:()=>{ S.f.b3_c1_kruppe = 1; }, txt:
`A short, round man in silks of every colour that silk comes in is standing beside the stuck carriage dabbing at his forehead with a crimson handkerchief and addressing the day, which is warmer than spring has any right to be.

"Ah," he says, seeing the Fourth. "Soldiers. Kruppe knows these faces, or believes he does, which in Kruppe's experience is very nearly the same thing and considerably less trouble." He beams. "Kruppe merely observes that it is warm, that the mud is deep, and that there are those on that meeting ground today who would very much prefer that a certain small person in red wool were somewhere else entirely." The handkerchief pauses. "One of them is very tall."

A great black bird drops out of the air onto the carriage roof with a noise like a dropped drum. "*Malazans!*" it shrieks, delighted. "And the fat one! You, sir, should have been a raven!"

"And you, madam," says Kruppe warmly, "a parrot."

"A *parrot*?"

${b3In('tuft') ? `Tuft, beside you, has gone a little pale at *red wool* and is not laughing. Kruppe looks at her over the handkerchief, very briefly, with eyes that are not round at all, and then he is all silk again.` : `Kruppe dabs his forehead, and winks at nobody in particular.`}`,
      ch:[{t:'Leave them to it.'}]}),

    /* ---- Sohra on the line ---- */
    b3_c1_sohra_line:()=> S.f.b3_sohraMet ? {sp:'Sohra', txt:
`The Rhivi girl is still on the bank by the herds, still watching. She lifts her herd-staff an inch to you, which may be a greeting and may be a note made in a ledger.${S.f.b3_c1_parleyDone ? ` "The fires," she says. "After dark."` : ''}`,
      ch:[{t:'Walk on.'}]} : ({sp:'A Rhivi rider', fx:()=>{ S.f.b3_sohraMet = 1; }, txt:
`A Rhivi girl of about twenty is sitting on the bank above the herds with a horn bow across her knees and a herd-staff hung with bone beads beside her. She has a pale mark painted across her eyes, and she is watching the Fourth with frank, unhurried interest, the way you watch a new horse.

"You are Malazans," she says. "I am watching you."

${b31Say({kettle:`"Why?" says Kettle, who would.`, brisk:`"Why?" says Brisk.`, _:`"Why?"`})}

"The Mhybe's people sent me. To watch the Malazans, and say what they are." She considers. "I was told I could say so, if I was asked. Nobody else has asked. You are the first." She stands, in one movement, the way riders do. "Sohra. Come to the fires tonight, south, when your line is relieved. I will have more to say about you by then."`,
      ch:[{t:'"What do you say so far?"', go:'b3_c1_sohra_line2'},
          {t:'Walk on.'}]}),
    b3_c1_sohra_line2:()=>({sp:'Sohra', txt:
`She looks the Fourth over, one at a time, taking her time about it.

"Loud," she says. "Muddy. You stand close together, like the young bulls do when there are wolves." She tilts her head. "The Mhybe asked me what Malazans are like, before. I said loud. She said that was not an answer." A small, sharp smile. "I am going to tell her it is the whole answer, and see what she says."`,
      ch:[{t:'Walk on.'}]}),

    /* ---- south, to the Rhivi camp, when the line is relieved ---- */
    b3_c1_to_rhivi:()=> !S.f.b3_c1_parleyDone ? {sp:'South, down the slope', txt:
`South, down the slope, the Rhivi camp. The Fourth is on picket until the parley is done and the line is relieved.`,
      ch:[{t:'Not yet.'}]} : {sp:'South, down the slope', txt:
`The relief comes up the line at dusk, a squad of the Fourth Regiment${S.f.b3_tav ? `, with Tav at the head of it singing` : ''}. Below, the Rhivi fires are coming out one by one, like stars upside down.`,
      ch:[{t:'Down to the Rhivi fires.', onward:true, go:()=>{ startExplore('b3_c1_rhivi'); talk('b3_c1_rhivi_arrive'); }},
          {t:'Not yet.'}]},
    b3_c1_rhivi_arrive:()=>({sp:'The Rhivi camp', scene:'b3_c1_rhivi', fx:()=>{ S.f.b3_c1_inRhivi = 1; }, txt:
`The Rhivi camp at night is round hide tents and low fires and the herds a great dark breathing mass on the slope above, horses and the shaggy humped bhederin together, and somebody, always somebody, singing to them, low, between other jobs.

The Fourth walks in unchallenged, and ungreeted. Rhivi faces turn in the firelight, look, and turn back. *Malazans*. Something you don't argue with. Something that passes.${b3In('tuft') ? `\n\nTuft walks a little ahead of the squad, and then a little behind it, and then beside you, as if she can't decide which is safest. Somewhere in this camp is a tent with a child in it. She doesn't ask which.` : ''}`,
      ch:[{t:'Find Sohra.', go:()=>startExplore()}]}),
    b3_c1_rhivi_back:()=>({sp:'The slope', txt: b31Done() ?
`North, up the slope to the picket. The armies march at dawn.` :
`North, up the slope to the picket and the Host's lines beyond.`,
      ch:[{t:'Up to the picket.', go:()=>startExplore('b3_c1_line')}, {t:'Not yet.'}]}),

    /* ---- Sohra at her fire ---- */
    b3_c1_sohra:()=>({sp:'Sohra · Rhivi herd-rider', fx:()=>{ S.f.b3_sohraMet = 1; S.f.b3_c1_sohraFire = 1; }, txt:
`${S.f.b3_sohraMet ? `Sohra is at a small fire on the edge of the camp, nearest the herds, with a pot of something on it and a smoked haunch of bhederin hung over it. "You came," she says. "Good. I have been telling people about you."` : `A Rhivi girl of about twenty is sitting at a small fire on the edge of the camp, nearest the herds, with a horn bow beside her and a pale mark painted across her eyes. "You are the Malazans who stand together like young bulls," she says. "I saw you on the line. Sit. I am Sohra. The Mhybe's people sent me to watch the Malazans and say what they are." She shrugs. "I was told I could say so, if I was asked. You have not asked. I am saying so anyway. It saves time."`}

She cuts the Fourth a slice of the haunch each, exactly the same size, and watches you eat it.

"Your officer struck the High King today," she says. "For the child." Her voice does something careful on *the child*. "Some of the young men wanted to make him a song. The old ones said a song for a Malazan would bring storms." She picks at the fire. "I said: he struck *Kallor*. I would like to see the weather that is worse than Kallor."

Then, without warning, and not looking at you: "The Mhybe was young at midwinter. My mother's age. Now she is older than my grandmother. Nobody will tell me why." The bone beads on her staff click as her hand closes on it. "I am watching the Malazans. I am also watching her. I am not supposed to say that part."`,
      ch:[{t:'"Then don\'t. We didn\'t hear it."', fx:()=>{ ally(1, 0, 'Sohra'); b31L('tuft', 1); }, go:'b3_c1_sohra_2'},
          {t:'"What will you tell them we are?"', go:'b3_c1_sohra_what'},
          {t:'"Teach me that whistle you use on the herd."', check:['wits',16], trick:'b3_c1_call', not:['sohra'], req:()=>!S.f.b3_c1_callTried, fx:()=>{ S.f.b3_c1_callTried = 1; },
            edges:id=>[id === 'kettle' && ['she has been whistling at quorls for a week', 1], id === 'tuft' && ['she can hear the dead in it', 1], id === 'brisk' && ['she cannot whistle, and never could', -2], id === 'ohl' && ['his teeth are not what they were', -1]],
            go:'b3_c1_call_ok', fail:'b3_c1_call_miss'}]}),
    b3_c1_sohra_what:()=>({sp:'Sohra', txt:
`"That you are loud," she says promptly. "That you eat what you are given and say thank you badly. That you count each other." She has noticed that. "All the time. Like herders count at dusk." She tilts her head at you. "The Rhivi say a herder who counts every dusk has lost something once, and remembers."

${b3Fallen().length ? `She looks at the space in the squad where ${b3FallenNames()} should be, as if she can see it. Perhaps she can. "Yes," she says quietly. "Like that."` : `She looks at the Fourth, all of it, and nods, as if a number had come out right.`}`,
      ch:[{t:'"Then don\'t tell them that part."', fx:()=>{ ally(1, 0, 'Sohra'); }, go:'b3_c1_sohra_2'},
          {t:'"Teach me that whistle you use on the herd."', check:['wits',16], trick:'b3_c1_call', not:['sohra'], req:()=>!S.f.b3_c1_callTried, fx:()=>{ S.f.b3_c1_callTried = 1; },
            edges:id=>[id === 'kettle' && ['she has been whistling at quorls for a week', 1], id === 'tuft' && ['she can hear the dead in it', 1], id === 'brisk' && ['she cannot whistle, and never could', -2], id === 'ohl' && ['his teeth are not what they were', -1]],
            go:'b3_c1_call_ok', fail:'b3_c1_call_miss'},
          {t:'Thank her for the meat.', go:()=>startExplore()}]}),
    b3_c1_sohra_2:()=>({sp:'Sohra', txt:
`She looks at you as she looked at the Fourth on the line, and then something in her face settles.

"Good," she says. "That is a good answer. I will not tell them you said it." She hands ${b3In('tuft') ? 'Tuft' : 'you'} the last of the haunch, which is the best of it. "Come back when it is full dark. I will want to ask the Malazans something. I have not decided yet if I will."`,
      ch:[{t:'"Teach me that whistle you use on the herd."', check:['wits',16], trick:'b3_c1_call', not:['sohra'], req:()=>!S.f.b3_c1_callTried, fx:()=>{ S.f.b3_c1_callTried = 1; },
            edges:id=>[id === 'kettle' && ['she has been whistling at quorls for a week', 1], id === 'tuft' && ['she can hear the dead in it', 1], id === 'brisk' && ['she cannot whistle, and never could', -2], id === 'ohl' && ['his teeth are not what they were', -1]],
            go:'b3_c1_call_ok', fail:'b3_c1_call_miss'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b3_c1_call_ok:()=>({sp:'Sohra', txt:
`Sohra puts two fingers to her teeth and blows: low, then high, two notes that go out over the herd like a thrown rope. Up on the slope a young bull that has been tossing its head at a horse goes still, all at once, and stands, and blinks.

"Low, then high," she says. "Low says *I am here*. High says *stop*. The herds learned it from the dead, and the dead learned it from the herds." She watches ${by({sgt:'you', _:'{who}'})} try it. The first time is a wet noise. The second time is a noise. The third time the young bull turns its head and looks down the slope, puzzled, and stands.

Sohra laughs out loud, delighted, a beat late, the way Rhivi laugh at Malazans. "There. Now you can stop a bull. It will work on men too, sometimes. Men are only bulls who talk." ${by({kettle:`Kettle does it again, and again, until three Rhivi at the next fire throw a boot at her.`, _:''})}`,
      ch:[{t:'Walk the camp.', go:()=>startExplore()}]}),
    b3_c1_call_miss:()=>({sp:'Sohra', txt:
`Sohra puts two fingers to her teeth and blows: low, then high. Up on the slope a young bull goes still and stands.

${by({sgt:'You try', _:'{who} tries'})}. The noise that comes out sets every dog in the Rhivi camp barking and starts three horses on the near line, and a very old man three fires away shouts something in Rhivi that does not need translating.

"Another night," Sohra says, carefully not laughing, in the way that is worse than laughing. "Your mouth is the wrong shape. It is a Malazan mouth. It is for giving orders."`,
      ch:[{t:'Walk the camp.', go:()=>startExplore()}]}),
    b3_c1_sohra_again:()=>(S.f.b3_c1_key ? {sp:'Sohra', txt: S.f.b3_c1_key === 'mhybe' ? `Sohra is by the fire with her bow strung, watching the Mhybe's tent. "When you are ready," she says. "The night will not wait for long."` : `Sohra is by the fire, feeding it a twist of dry grass. "Go," she says. "You have somewhere to be."`,
      ch:[S.f.b3_c1_key === 'mhybe' ? {t:'Stand the watch at the tent.', onward:true, go:'b3_c1_watch'} : {t:'Up the Divide road.', onward:true, go:'b3_c1_road'},
          {t:'Not yet.'}]} : {sp:'Sohra', txt:
`Full dark now. Sohra is on her feet by the fire, with her bow strung, which it wasn't before, and she is not looking at you. She is looking past the herds, at the black slope of the hills toward the Divide.

"I have decided," she says. "I will ask."`,
      ch:[{t:'"Ask."', req:()=>!S.f.b3_c1_key, go:'b3_c1_key'},
          {t:'"Teach me that whistle you use on the herd."', check:['wits',16], trick:'b3_c1_call', not:['sohra'], req:()=>!S.f.b3_c1_callTried && !S.f.b3_c1_key, fx:()=>{ S.f.b3_c1_callTried = 1; },
            edges:id=>[id === 'kettle' && ['she has been whistling at quorls for a week', 1], id === 'tuft' && ['she can hear the dead in it', 1], id === 'brisk' && ['she cannot whistle, and never could', -2], id === 'ohl' && ['his teeth are not what they were', -1]],
            go:'b3_c1_call_ok', fail:'b3_c1_call_miss'},
          {t:'Not yet.'}]}),
    b3_c1_sohra_late:()=>({sp:'Sohra', txt: S.f.b3_c1_key === 'mhybe' ?
`Sohra is sitting with her back against the Mhybe's tent, singing very quietly to the herd, which is quiet again. She doesn't stop singing, but she moves over to make room.` :
`Sohra is at her fire. She looks up as the Fourth comes in off the road, at the munitions wagons going past to the Host's lines, and then at you, and then back at the fire. "You are back," she says. That is all.`,
      ch:[{t:'Sit a while.'}]}),

    /* ---- the Mhybe ---- */
    b3_c1_mhybe:()=>({sp:'The Mhybe', fx:()=>{ S.f.b3_c1_mhybeMet = 1; }, txt:
`An old Rhivi woman is sitting on a stool outside the largest tent in the camp, the one with the painted door-flap, wrapped in a blanket though the night is mild. Her hands on the blanket are knotted and spotted. Her eyes in the firelight are not old at all. They are a young woman's eyes, looking out of a face that has been stolen from her, and they are very tired, and very angry, and they are looking at the Fourth.

"Malazans." Her voice cracks on it. "The ones who stood on the line today and watched." The tent behind her is dark. Something small breathes in it, asleep.

"Your officer struck the High King," she says. "For my daughter. Today I could have kissed a Malazan." Her mouth twists. "Then I came back and looked at my hands."${b3In('tuft') ? `

Her eyes go past you, to Tuft, and stay there.

"You," she says. "You are the one who looked at her. On the slope." Tuft says nothing. "She asked me who you were. She does not ask me who people are. She *knows* who people are." The old hands close on the blanket. "Who are you, to my daughter?"

Tuft is very white. "Somebody who knew her," she says. "Before."

The Mhybe looks at her for a long, long time. "Then you know more of my daughter than I do," she says at last, and it is the bitterest thing you have ever heard anyone say, and the most tender, and she seems to hear both, and closes her eyes.` : `

"She has my milk and my years," the old woman says, to nobody, "and none of my face." She closes her eyes.`}`,
      ch:[{t:'Stand there with her a while. Say nothing.', req:()=>!S.f.b3_c1_charmFrom, fx:()=>{ S.f.b3_c1_charmFrom = 1; gain('b3_c1_charm'); S.f.b3_c1_charm = 1; ally(1, 0, 'The Mhybe'); b31L('tuft', 1); }, go:'b3_c1_mhybe_charm'},
          {t:'Leave her to her night.'}]}),
    b3_c1_mhybe_charm:()=>({sp:'The Mhybe', txt:
`You stand there. ${b3In('tuft') ? 'Tuft stands beside you. ' : ''}The fire settles. The herd breathes on the slope. The thing in the tent breathes, small and even.

After a while, without opening her eyes, the Mhybe takes something from round her own neck and holds it out: a little bhederin carved in bone, red ochre in the cuts, on a thong with two blue beads.

"For the one who looked at her as if she knew her," she says. "And for the ones who stood beside that one and said nothing, which is harder than people think." A breath. "It is not magic. Sohra will tell you it is manners." Her eyes open. "Sohra is right more often than she knows. Do not tell her."`,
      ch:[{t:'Take it.'}]}),

    /* ---- the men in grey and fur ---- */
    b3_c1_kmen:()=>({sp:'Men in grey and fur', fx:()=>{ S.f.b3_c1_kmen = 1; }, txt:
`Two men are standing in the shadow between two tents, not quite near the Mhybe's tent and not quite anywhere else. Grey cloaks trimmed with fur at the collar, good swords, the easy stillness of men who are paid well to stand still. They are not Rhivi and they are not Barghast and they are not anything the Host has a word for.

They watch the Mhybe's tent and nothing else.

${b3In('sohra') ? `"Kallor's," Sohra says, not quietly. "He has a few of his own. He never says where he finds them."` : `A Rhivi boy going past with a water-skin sees where you're looking. "Kallor's," he says, low. "The High King has a few of his own." He hurries on.`}`,
      ch:[{t:'Walk over and stand near them. Just stand.', check:['might',13],
            edges:id=>[id === 'brisk' && ['she has stood in front of worse things, and looks it', 2], id === 'kettle' && ['she keeps a hand in the satchel, which helps', 1], id === 'tuft' && ['they do not see her as a threat', -1]],
            near:{t:'They go, but slowly, and the one with the scar looks back.'},
            go:'b3_c1_kmen_go', fail:'b3_c1_kmen_stay'},
          {t:'Leave them. Note them.'}]}),
    b3_c1_kmen_go:()=>({sp:'Men in grey and fur', fx:()=>{ S.f.b3_c1_kmenGone = 1; ally(1, 0, 'Kallor\'s men'); }, txt:
`${by({brisk:'Brisk walks over and stands three paces from them with her shield on her arm and her eyes on nothing in particular, the way she stands at a gate.', sgt:'You walk over and stand three paces from them, and look at nothing in particular. It is the oldest drill in the army.', _:'{who} walks over and stands three paces from them, looking at nothing in particular.'})} The quiet goes on. Then one of the men laughs, softly, at a joke he keeps to himself, and the two of them go away between the tents.

A Rhivi woman at the next fire, who has been watching all of it, lifts her cup to the Fourth.`,
      ch:[{t:'Walk on.'}]}),
    b3_c1_kmen_stay:()=>({sp:'Men in grey and fur', txt:
`${by({sgt:'You walk over', _:'{who} walks over'})} and stand three paces from them. They look back, quite politely, and do not move, and after a while it becomes clear that they will not, and that both sides know it, and that the Fourth is the one standing in the Rhivi camp at night staring at a man in a good cloak.

You walk away. Behind you, one of them laughs, softly.`,
      ch:[{t:'Walk on.'}]}),

    /* ---- a Rhivi fire: rest, and a song ---- */
    b3_c1_rfire:()=> b31Done() ? ({sp:'A Rhivi fire', txt:
`The fire is low and the sky over the hills is going grey. Up in the Host's lines a trumpet is clearing its throat; across the valley, Brood's camp is already striking tents. The march is at dawn, and dawn is here.`,
      html:allyHTML('Outside Pale · the night before the march'),
      ch:[{t:'Up. The march.', onward:true, go:'b3_c1_dawn'},
          {t:'Not yet.'}]}) : ({sp:'A Rhivi fire', txt:
`A Rhivi fire, low, with three old men round it who make room for the Fourth without looking up, and a pot of something that smells of smoke and herbs. One of them is singing to the herd, under his breath; it is not loud, and it doesn't need to be.

${b3Mind() ? `The Fourth sits down as if it had been carrying something a long way.` : `It is the most peaceful the Fourth has been since Darujhistan.`}`,
      html:allyHTML('Outside Pale · the night after the parley'),
      ch:[{t:'Sit. Eat what they give you. Sleep an hour.', req:()=>!S.f.b3_c1_restRhivi, fx:()=>{ S.f.b3_c1_restRhivi = 1; b3Rest(`The Fourth sleeps an hour by a Rhivi fire while an old man sings to the herd${b3In('ohl') ? ', and Ohl sees to what the day did' : ''}. Wounds close, mostly.`); }, go:'b3_c1_rfire_slept'},
          {t:'Leave them to their song.'}]}),
    b3_c1_rfire_slept:()=>({sp:'A Rhivi fire', txt:
`You wake to the same song, or another one very like it, and a blanket over you that you didn't have when you lay down.

${b31Say({ohl:`Ohl is awake, sitting up with his hands in his sleeves, listening to the old man sing. "It's a list," he says quietly, when he sees you're awake. "I asked. It's the names of the herd's dead. All of them. Every one since his grandfather." He sounds envious, and something else. "He doesn't write it. He just *knows* it."`, tuft:`Tuft is awake, sitting with her knees up, looking at the painted door-flap of the biggest tent in the camp.`, _:`The old man nods to you, once, without stopping his song.`})}`,
      ch:[{t:'Up.'}]}),

    /* ---- the Host's runner ---- */
    b3_c1_runner:()=>({sp:'A Host runner', fx:()=>{ S.f.b3_c1_runner = 1; }, txt:
`A runner of the Host, out of breath and out of place among the hide tents, finds the Fourth by asking every Rhivi he meets where the Malazans are, which is not a question the Rhivi enjoy.

"Sergeant {sgt}? Fourth Squad?" He holds out a slate. "From the Host's quartermaster, by the Fist's word. A Moranth munitions train is coming in off the Divide road tonight, down from the hills, late. There's been men on that road. The Fourth's nearest, and the Fourth knows the road." He looks round at the Rhivi camp. "They said you'd be here. They didn't say why."`,
      ch:[{t:'"Wait. I\'ve something to settle first."', go:'b3_c1_key'},
          {t:'"Tell them we\'ll come."', go:'b3_c1_key'}]}),

    /* ---- the key: the Mhybe's tent, or the Host's order ---- */
    b3_c1_key:()=>({sp:'The Mhybe\'s tent · the Host\'s order', fx:()=>{ S.f.b3_c1_sohraAsked = 1; }, txt:
`Sohra asks.

"Those men in grey and fur were by the Mhybe's tent again at dusk," she says. "And there are riders on the Divide hills tonight. I saw their fire. Horse-thieves, out of the passes; they come down at the turn of every spring, when the herds are fat and the herders are tired." She is watching the hills while she says it. "Our young men are at the far herd. The old ones are old. The Mhybe sleeps very badly, and the child sleeps very well, and I would like somebody with shields to stand outside that tent tonight who is not Kallor's." Her chin comes up. "I am asking the Malazans. I am not asking twice."

${S.f.b3_c1_runner ? `The Host's runner is standing three paces off with his slate, pretending not to listen. The munitions train comes down off the Divide road tonight, late, and the Host wants the Fourth on it.` : `And up the slope a runner of the Host is coming down between the tents, asking every Rhivi he passes where the Malazans are, with a slate in his hand that says the Moranth munitions train is coming in off the Divide road tonight, and the Host wants the Fourth on it.`}

Two things want the Fourth tonight. It can do one of them.`,
      ch:[{t:'"We\'ll stand at the tent." Send the runner back with the Fourth\'s regrets.', fx:()=>{ S.f.b3_c1_key = 'mhybe'; S.f.b3_mhybe = 1; ally(2, 0, 'The Mhybe\'s tent'); b31L('tuft', 1); b31L('ohl', 1); b31L('kettle', -1); }, go:'b3_c1_watch'},
          {t:'"The Host has given us an order." Go up the Divide road.', fx:()=>{ S.f.b3_c1_key = 'crate'; ally(-1, 0, 'Sohra asked, and the Fourth went elsewhere'); b31L('kettle', 1); b31L('brisk', 1); b31L('tuft', -1); }, go:'b3_c1_crate'},
          {t:'"Not yet. Let me think."', go:()=>startExplore()}]}),

    /* ---- the night watch at the Mhybe's tent ---- */
    b3_c1_watch:()=>({sp:'The Mhybe\'s tent', scene:'b3_c1_rhivi', txt:
`The Fourth stands the night outside the tent with the painted door-flap, shields on their arms, while the fires burn down.

${S.f.b3_c1_kmenGone ? `The men in grey and fur don't come back.` : `The men in grey and fur come back once, near midnight, and see the shields, and look at them, and go away again between the tents without a word.`} Sohra sits with her back against the tent pole and sings to the herd, very low.${b3In('tuft') ? ` Tuft stands at the door-flap, as close as she has been, closer than she said she'd come, with her back to it so she won't look in.` : ''}

Somewhere past the middle of the night the singing stops.

Then the far herd screams: horses, high and terrible, and men's voices in the dark, and the drum of a great many hooves going the wrong way. Up on the slope, shapes are coming down through the herd lines with ropes and knives, and some of them are coming this way.`,
      ch:[{t:'"Shields. Hold the tent and the herd."', go:()=>startBattle('b3_c1_herds', {})},
          {t:'Blow the Herd-Call. Stop the stampede before it starts.', req:()=>!!trickBy('b3_c1_call'), go:'b3_c1_watch_call'},
          {t:'Kettle puts a burner into the gap between the herd and the dark.', tag:'uses 1 burner', req:()=>b3In('kettle') && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b3_c1_herds', {pre:true})}]}),
    b3_c1_watch_call:()=>({sp:'The herd lines', scene:'b3_c1_rhivi', txt:
`${NAME(trickBy('b3_c1_call') || 'sgt')} puts two fingers to the teeth and blows: low, then high. Up on the slope Sohra hears it, and turns, and blows the same two notes back, louder, and then every herder in the camp is doing it, low then high, from every fire.

The herd stops. A thousand animals that had decided to run stand still in the dark, blinking, and the men who came down among them to drive them are suddenly standing in the open in the middle of a herd that won't move, with nowhere to go and everybody looking at them.`,
      ch:[{t:'"Now."', go:()=>startBattle('b3_c1_herds', {surprise:'p'})}]}),
    b3_c1_herds_after:()=>({sp:'The Mhybe\'s tent', scene:'b3_c1_rhivi', fx:()=>{ S.f.b3_c1_herdsDone = 1; S.f.b3_kallorSaw = 1; S.f.b3_kallor = 1; }, txt:
`The man with the cut ear is down in the mud a pace from the painted door-flap, and the rest of them are gone back up into the Divide hills with fewer horses than they came with and nothing of the Rhivi's. The herd is whole. The Rhivi young men come back from the far herd at a dead run, too late, and stop, and look at the Fourth standing in a ring round the Mhybe's tent, and don't know what to say.

Then the camp goes quiet in a different way.

A tall man comes down between the tents with two men in grey and fur a pace behind him: gaunt, grey, in a fur-collared cloak, unhurried, as if the night belonged to him and he had come to see what had been done with it. He looks at the dead brigand. He looks at the painted door-flap, and something moves in his face that is not pity. Then he looks at you.

It is a long look. It is the look of a man writing a name in a book he has kept since before there were Malazans to write in it, in a hand that does not hurry.

Then Kallor turns and goes back the way he came, and the men in grey and fur go after him.

${b3In('sohra') ? `"He will remember your face," Sohra says.` : `"He will remember your face," says Sohra, at your shoulder. She is shaking, very slightly, and pretending not to be.`} "He remembers everything. Nobody has ever said he forgave any of it." She looks at the Fourth, all of it, still in its ring, and then at the tent, where a small sleepy voice has started asking a question in Rhivi. Something in her face makes up its mind.`,
      ch:[{t:'"Sohra."', go:'b3_c1_sohra_join'}]}),
    b3_c1_sohra_join:()=>({sp:'Sohra', fx:()=>{ if (!b3In('sohra')) b3Join('sohra'); }, txt:
`"I was sent to watch the Malazans," she says. "I can watch them better from inside the herd." She slings the horn bow. "When you march, I am marching with you. The Mhybe's people will say I am still watching. I will be." A beat. "I will also be making sure you do not get lost. You are a very slow herd, and you complain, and you would get lost."

${b3In('sohra') ? `She falls in at the end of the Fourth's line, where the new one always stands, and looks along it, and counts it, under her breath, the way the Fourth does. It comes out right.` : `There isn't room in the Fourth for another, not yet; she sees that before you say it, and shrugs. "Then I will ride beside the herd," she says. "Ask at any fire, and I will come."`}${b3In('brisk') ? `\n\nBrisk looks her up and down. "Good," she says. It is the longest review she has ever given.` : ''}`,
      ch:[{t:'Sleep until the march.', go:'b3_c1_dawn'},
          {t:'Not yet. Walk the camp.', go:()=>startExplore()}]}),

    /* ---- the Host's order: the Divide road ---- */
    b3_c1_crate:()=>({sp:'Sohra', scene:'b3_c1_rhivi', txt:
`Sohra looks at you, and then at the Mhybe's tent, and nods once.

"The Host gave an order," she says. "Of course." She turns back to the fire. "Go and get your crates, Malazans." It is perfectly polite. It is the coldest thing anyone has said to the Fourth all day, and that includes Kallor.${b3In('tuft') ? `\n\nTuft looks back once, at the painted door-flap, as the Fourth goes. Then she doesn't again.` : ''}`,
      ch:[{t:'Up the Divide road.', onward:true, go:'b3_c1_road'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b3_c1_road:()=>({sp:'The Divide road', scene:'b3_c1_divide', txt:
`The Divide road goes up out of the valley into the hills between Pale and Darujhistan, a pale scar in the starlight between black slopes. Two leagues up it, at a cutting where the road goes between banks of scree, the Fourth meets the train: six wagons with Moranth drivers in black chitin, sitting very still, and crates under oiled hide that everyone keeps a respectful distance from.

Something goes over, high up, with a sound like a struck string. ${b3In('kettle') ? `"Quorls," Kettle breathes, looking up, and her whole face is lit with it. "They're flying cover. They're flying cover for *us*."` : `Quorls, flying cover, high and invisible.`}

The lead driver clicks at you, once, which might be a greeting, and the train starts down through the cutting at a walk. Halfway through it, somebody on the scree above starts a little avalanche of pebbles, and then a bigger one, and then a voice says something in the Divide's ugly dialect and the dark on both banks stands up.`,
      ch:[{t:'"To the wagons."', go:()=>startBattle('b3_c1_train', {})},
          {t:'Kettle lights up the cutting wall with a burner.', tag:'uses 1 burner', req:()=>b3In('kettle') && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b3_c1_train', {pre:true})}]}),
    b3_c1_train_after:()=>({sp:'The Divide road', scene:'b3_pale_grey', fx:()=>{ S.f.b3_c1_trainDone = 1; S.inv.sharper = (S.inv.sharper || 0) + 2; S.inv.cusser = (S.inv.cusser || 0) + 1; note('The Moranth quartermaster signs two sharpers and a cusser over to the Fourth, for the road.', 'good'); }, txt:
`The man with the cut ear is down on the road, and the rest of them are gone back over the ridge into the dark, and the train is in: six wagons creaking into the Host's lines an hour before dawn with every crate still under its hide.

At the munitions park a Black Moranth quartermaster walks the length of the wagons, clicking softly, counting. At the end it turns its blank black helm on the Fourth and holds out two sharpers and a cusser, without a word, and goes on counting.

${b3In('kettle') ? `Kettle takes them like an infant she has been told is hers. "*Two* sharpers," she says. "*And* a cusser. Sergeant. Sergeant, look." She looks up. A quorl is coming down onto the edge of the park in the grey light, wings going like a struck string, and it turns its great faceted head and looks at her. "*Warm*," she says. "Chub said. I'm writing it down."` : `The squad's satchel is heavier than it has been since Darujhistan.`}

Down the slope, the Rhivi camp is waking. It does not come up to see the train in.`,
      ch:[{t:'Sleep an hour before the march.', go:'b3_c1_dawn'},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ---- dawn: the armies march ---- */
    b3_c1_dawn:()=>({sp:'Outside Pale · dawn', scene:'b3_pale_dawn', fx:()=>{ S.f.b3_c1_dawn = 1; }, txt:
`Dawn, and two armies take the road.

They do it slowly, and in the open. The Host's column goes out down the south-east road in the grey light with its banners up and its drums going, at a walk you could time with a water-clock, and on its flank Brood's people go with it: the Rhivi and their herds, the Barghast, the Andii keeping their own silent order, the Mott brothers in their dreadful hats. Whiskeyjack rides past the Fourth at the head of a company, sitting the horse as if the leg were nobody's business, and says, without stopping, "Steady, Sergeant. We walk. Where everybody can see us." He doesn't say why. ${b3In('ohl') ? `"Somebody down south is setting a timetable by us," Ohl says, watching him go. "I'd put money on it." He finds no takers.` : `Down south, you'd guess, someone is setting a timetable by it.`}

${S.f.b3_tav ? (b3In('brisk') ? `Somewhere back down the column the Fourth Regiment is singing a Cawn barge song, and one voice in it is worse than all the others put together. Brisk, marching, doesn't turn her head. Her mouth moves, once, on the last line.` : `Somewhere back down the column the Fourth Regiment is marching, and one big man in it is not singing.`) : `Somewhere back down the column the Second is singing, badly.`}

${S.f.b3_c1_key === 'mhybe' ? (b3In('sohra') ? `Sohra rides at the Fourth's shoulder on a dun mare, singing to the herds, and every so often counts the squad under her breath.` : `Sohra rides with the herd on the Fourth's flank, close enough to call to. She lifts her herd-staff an inch, which is either a greeting or a note in a ledger.`) : `A Rhivi girl rides past the Fourth on the herd's flank without turning her head. "I will find you on the march," Sohra says, to the road ahead. "When I have decided what to say."`}${b3In('tuft') ? `\n\nTuft walks on the side of the column nearest the Rhivi, where she can see the Mhybe's wagon. She doesn't go any nearer. She doesn't look away either.` : ''}

Behind the Fourth, Pale goes down into its own hills: the broken north wall, the burial field green over its mounds, the hill where the cadre row was, with a horse on it. ${b31Say({kettle:`"Same as this morning," Kettle says, to nobody, with a hand on the satchel. Then: "No. Not the same."`, _:`The Fourth doesn't look back. It counts itself instead.`})}`,
      html:allyHTML('Outside Pale · the march begins'),
      ch:[{t:'South-east.', onward:true, go:()=>chapterEnd(1, S.f.b3_c1_key || 'mhybe')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
