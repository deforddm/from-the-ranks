/* ============ Book Three, Chapter 3: Capustan ============ */
/* The last night of the march, the relief of Capustan, and the city after.
   Canon (docs/moi-canon.md §1.3, §1.5 and the Chapter 3 re-check): the Barghast and the Bridgeburners break into the city by night (heard,
   never seen); the next day they drive Kulpath's army out of its gates onto the allied line; a black dragon comes over the field and the
   Tenescowri lie down in the grass; Anaster is taken by others (a rumour at the chapter's end). Brukhalian and Karnadas are already dead.
   Itkovian is glimpsed; Gruntle and Trake's Legion carry the tiger's stripes; the Mask Council sits in the Thrall.
   Key (S.f.b3_c3_key): 'field' (the Fourth held the Host's stretch of the line beside Tav's company: trust +2, a harder second stage)
   or 'camps' (the Fourth went into the city with a Grey Sword party and opened a barricade in the south Camp: dread +2, what the siege did).
   Dannet is met either way (S.f.b3_dannetMet, S.f.b3_dannetSeed); she joins in Chapter 4, not here.
   Sets: b3_capustan, b3_greyswords, b3_domin (the siege ground), b3_rake, b3_treach, b3_karnadasHeard, b3_dannetMet, b3_dannetSeed.
   New here: Treach's Stripe (a trick, below), four items (art in 63b), B3DECK[3] (the Mason).
   FOR THE ARTIST (63b), every art name this file uses:
     items  ART['item/b3_c3_shield'], ART['item/b3_c3_surcoat'], ART['item/b3_c3_spear'], ART['item/b3_c3_stripe']
     figures (new) b3_c3_gruntle, b3_c3_itkovian, b3_c3_capan, b3_c3_gidrath; (shelf) wj, hurlochel, tav, korlat, b3_rhivi_rider, b3_greysword,
             greysword, beklite, seerdomin, tenescowri, b3_barghast (aid), b2soldier (Fourth Regiment regulars)
     ground  b3camp_night (shelf), b3_c3_field (. , # x r = s c F), b3_c3_city and b3_c3_city_night (. , # = t w c D F)
     backdrops b3_c3_walls, b3_c3_dragon, b3_c3_thrall */

const c3Key = () => S.f.b3_c3_key;
const c3Brisk = () => b3In('brisk');
/* loyalty only for a squadmate who is here (an import can lose anyone, and a recruit may be waiting with her own people) */
const c3Loy = (id, n) => { if (!b3In(id)) return; S.loy[id] ??= 0; loy(id, n); };
/* Dannet's loyalty seed: a flag for later chapters, and a point of loyalty kept ready for when she joins (recruit() keeps an existing S.loy) */
const c3Seed = () => { S.f.b3_dannetSeed = 1; if (!b3In('greysword')) S.loy.greysword = Math.max(S.loy.greysword || 0, 1); };
/* Kettle's cusser: Maud, unless an import sent Maud home to the Moranth at Darujhistan (60's quest line reads the same flags) */
const c3MaudHome = () => !!(S.imported && b3Was('c7_debt') === 'paid' && !b3Was('c5_cusserUsed'));
/* the satchel, said the way Kettle says it */
const c3Count = () => { const i = S.inv, n = (k, w) => `${numw(i[k] || 0)} ${w}${(i[k] || 0) === 1 ? '' : 's'}`; const s = `${n('sharper', 'sharper')}, ${n('burner', 'burner')}, ${n('cusser', 'cusser')}`; return s.charAt(0).toUpperCase() + s.slice(1); };

/* ---- the trick: Treach's Stripe, from Trake's Legion at dusk. Once a fight, free: the bearer heals and hits harder through the next round ---- */
Object.assign(TRICKS, {
  b3_c3_stripe:{name:'Treach\'s Stripe', ch:3, use:'fight', ab:'t_b3_c3_stripe', spirit:true, where:'Trake\'s Legion, at dusk in Capustan',
    lore:'The Tiger of Summer marks the ones who would not stop. In Capustan the marks came up on the skin of butchers and coopers and wall-militia in the last days of the siege, and did not wash off. A strip of the old temple hide is a little of that, lent.',
    get fx(){ return `Once a fight, and it does not use the bearer's action: the bearer heals ${2 + lvT()}, and through the next round hits +2 and does +${2 + lvT()} damage. Grows with level. A god's mark, not a warren: the Domin's poison never touches it.`; }},
});
Object.assign(AB, {
  t_b3_c3_stripe:{name:TRICKS.b3_c3_stripe.name, trick:'b3_c3_stripe', self:true, free:true, spirit:true, desc:()=>TRICKS.b3_c3_stripe.fx,
    run(u){ u.stripeUntil = B.round + 1; heal(u, 2 + lvT()); AUDIO.play('growl'); sparks(u.x, u.y, 16, '#e8a040', .5); float(u, 'striped', '#e8a040');
      blog(`${u.name} closes a fist on the strip of tiger hide, and for a breath something long and low and striped looks out through ${u.name}'s eyes. It does not want the fight to be over.`); }},
});
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (b3On() && B && a && a.side === 'p' && !a.ally && a.stripeUntil >= B.round) c.bonus += 2; return c; }; }
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (!(b3On() && B && a && a.side === 'p' && !a.ally && a.stripeUntil >= B.round && t && t.side === 'e')) return _attack(a, t, o);
    const dd = o.dmg || a.dmg; return _attack(a, t, Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + 2 + lvT()]})); }; }

/* ---- the reading at the last halt (60c): the Mason leans in ---- */
B3DECK[3] = {scene:'b3_c3_walls_night', where:'an upturned shield in the lee of a wagon', set:'The last halt before Capustan, two bells short of dawn, and the sky to the south-east the colour of a forge.',
  back:()=>startExplore(), backT:'Back to the halt.',
  say:{tuft:`"A city on fire," she says, "and two armies walking at it in the dark." She shuffles, and the cards are slow in her hands tonight, the way they are when they mean to be listened to. "One card, Sergeant. For whatever is under that light."`,
    sohra:`"The dead in that city are very loud," Sohra says. She does not look south-east; she looks at the bones in her fist. "I will ask them something else. Sit. Do not breathe on the smoke."`,
    benna:`"Capustan," says Old Benna, and spits, for luck or for Capustan. "Read for a Capan once. Paid me in a coin with a dome on it. Sit down. Copper for the reading. I don't take domes."`}};

const P6 = [[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]];

const B3CH3 = {
  title:'Capustan', number:'Three',
  intro:{loc:'Capustan', sub:'The Catlin road · the last night of the march', scene:'b3_c3_walls_night', cap:'Walls and domes on a low hill over the river, and the smoke going up off them into the dark.',
    paras:[
`Six weeks of grass, and then a night with no grass in it: only the road, and the dark, and the whole Host walking at the pace Whiskeyjack sets, which tonight is faster than anyone's legs.`,
`In the south-east the sky has been the wrong colour since dusk. Low, red, unsteady, the way a sky is over a forge or a city. The scouts say it is a city. Capustan, on the Catlin, under the Pannion siege, burning.`,
`Word came down the column at moonrise, passed hand to hand from Brood's riders: the Barghast reached the city first, and went in at dusk, and some of the Bridgeburners went in with them. Nobody in the Host saw it. By the second bell everybody in the Host has a version.`,
`Three leagues short, Whiskeyjack halts the column for two bells: to eat, to sleep if you can, and to be told what the morning is. The morning is a field.`],
    go:'On', node:'b3_c3_start'},

  areas:[
    /* 16 x 12, the shelf's camp ground at night.  . mud  , grass  = tent  F the squad's fire  W wagon  h horse lines  s the Host's standard  E the road south */
    { id:'b3_c3_halt', title:'Before Capustan · the last halt', sub:'Night · two bells · the city burning on the skyline', hint:'Tap ground to move · tap a figure to talk · the squad\'s fire, and the road south at the top of the field', decor:'b3camp_night', dark:true,
      map:[ "#######E########",
            "#..=..=..h.hh..#",
            "#.....,......=.#",
            "#.=......=..,..#",
            "#......W.......#",
            "#..,.....s.....#",
            "#.=....,.......#",
            "#....W.....=...#",
            "#.,......F.....#",
            "#.....=......,.#",
            "#.......,......#",
            "################" ],
      walk:'.,', triggers:{F:'b3_c3_fire', E:'b3_c3_dawn'}, start:{x:7, y:10},
      quest:()=> !S.f.b3_c3Wj ? 'Whiskeyjack is by the standard.' : !S.f.b3_c3Picket ? 'The picket on the rise across the road.' : !S.f.b3_c3Rested ? 'The squad\'s fire. Two bells.' : 'The road south, at the top of the field, when the squad is ready.',
      npcs:[
        {id:'c3wj', name:'Whiskeyjack', kind:'wj', x:10, y:5, node:()=>S.f.b3_c3Wj ? 'b3_c3_wj_again' : 'b3_c3_wj', fresh:()=>!S.f.b3_c3Wj},
        {id:'c3hurl', name:'Hurlochel', kind:'hurlochel', x:11, y:4, node:()=>'b3_c3_hurl', fresh:()=>!S.f.b3_c3Hurl},
        {id:'c3tav', name:'Tav', kind:'tav', x:12, y:8, node:()=>S.f.b3_c3Tav ? 'b3_c3_tav_again' : 'b3_c3_tav', show:()=>c3Brisk(), fresh:()=>c3Brisk() && !S.f.b3_c3Tav},
        {id:'c3korlat', name:'Korlat', kind:'korlat', x:3, y:2, node:()=>S.f.b3_c3Korlat ? 'b3_c3_korlat_again' : 'b3_c3_korlat', fresh:()=>!S.f.b3_c3Korlat},
        {id:'c3rhivi', name:'A Rhivi rider', kind:'b3_rhivi_rider', x:13, y:3, node:()=>S.f.b3_c3Rhivi ? 'b3_c3_rhivi_again' : 'b3_c3_rhivi', fresh:()=>!S.f.b3_c3Rhivi} ] },

    /* 16 x 12, the trampled field below the walls (63b).  . earth  , grass  # siege bank  x stake line  r rubble  = shelter  s the Fourth's standard  c cart  F fire  E toward the walls */
    { id:'b3_c3_field', title:'The field before Capustan', sub:'Day · the Host\'s stretch of the allied line · the walls a mile off', hint:'Tap ground to move · tap a figure to talk · the Fourth\'s standard; the city at the top of the field', decor:'b3_c3_field',
      map:[ "#######E########",
            "#..r..r....r...#",
            "#.x.xx.x.xx.x..#",
            "#......,.......#",
            "#.,.........,..#",
            "#...##....##...#",
            "#.....,........#",
            "#.=..s.....,.=.#",
            "#....,..c......#",
            "#.F......=..F..#",
            "#..,.....,.....#",
            "################" ],
      walk:'.,', triggers:{s:'b3_c3_line', E:'b3_c3_field_on'}, start:{x:7, y:10},
      quest:()=> !S.f.b3_c3Rider ? 'A rider in grey is coming out of the city.' : !c3Key() ? 'The Grey Sword wants an answer. Whiskeyjack is behind the line.' : c3Key() === 'camps' ? 'The postern in the west wall, at the top of the field.' : !S.f.b3_c3Held ? 'The Fourth\'s standard. The gates.' : 'The city, at the top of the field, when the squad is ready.',
      npcs:[
        {id:'c3rider', name:'A Grey Sword', kind:'b3_greysword', x:6, y:3, node:()=>'b3_c3_rider', show:()=>!c3Key(), fresh:()=>!S.f.b3_c3Rider},
        {id:'c3wjf', name:'Whiskeyjack', kind:'wj', x:8, y:6, node:()=>!S.f.b3_c3Rider ? 'b3_c3_wj_wait' : !c3Key() ? 'b3_c3_wj_field' : 'b3_c3_wj_after', fresh:()=>!!S.f.b3_c3Rider && !c3Key()},
        {id:'c3tavf', name:'Tav', kind:'tav', x:3, y:8, node:()=>'b3_c3_tav_field', show:()=>c3Brisk() && c3Key() !== 'camps', fresh:()=>c3Brisk() && c3Key() === 'field' && (!S.f.b3_c3TavLine || (!!S.f.b3_c3Held && !S.f.b3_c3TavAfter))},
        {id:'c3dannetf', name:'Dannet', kind:'greysword', x:10, y:4, node:()=>'b3_c3_dannet_field', show:()=>!!S.f.b3_c3Held},
        {id:'c3rhivif', name:'A Rhivi rider', kind:'b3_rhivi_rider', x:13, y:4, node:()=>'b3_c3_rhivi_field', fresh:()=>!S.f.b3_c3RhiviF || (!!S.f.b3_c3Held && !S.f.b3_c3RhiviF2)} ] },

    /* 16 x 12, Capustan's streets (63b).  . paving  , rubble  # wall  = awning  t temple step  w well  c the barricade cart  E back to the square */
    { id:'b3_c3_camp', title:'Capustan · a Camp in the south of the city', sub:'Noon · the Grey Swords\' party · a barricade across the street', hint:'Tap ground to move · tap a figure to talk · the barricade; the way back at the bottom of the street', decor:'b3_c3_city',
      map:[ "################",
            "#.==..#..t.t..w#",
            "#.....#........#",
            "#,....#..,.....#",
            "#######c########",
            "#......,.......#",
            "#..=.......=...#",
            "#.,............#",
            "#...w....,.....#",
            "#..=..=.....,..#",
            "#.......,......#",
            "#######E########" ],
      walk:'.,', triggers:{c:'b3_c3_barricade', E:'b3_c3_camp_on'}, start:{x:9, y:10},
      quest:()=> !S.f.b3_c3CampDone ? 'The barricade across the street. The Grey Swords are waiting on you.' : 'The Grey Swords\' barracks. The way out is at the bottom of the street.',
      npcs:[
        {id:'c3vet', name:'The Grey Sword', kind:'b3_greysword', x:6, y:6, node:()=>S.f.b3_c3CampDone ? 'b3_c3_vet_after' : 'b3_c3_vet', fresh:()=>!S.f.b3_c3Vet},
        {id:'c3dannetc', name:'Dannet', kind:'greysword', x:9, y:6, node:()=>S.f.b3_c3CampDone ? 'b3_c3_dannet_after' : 'b3_c3_dannet_camp', fresh:()=>!S.f.b3_c3DannetCamp},
        {id:'c3dyer', name:'A Capan dyer', kind:'b3_c3_capan', x:2, y:8, node:()=>S.f.b3_c3CampDone ? 'b3_c3_dyer_after' : 'b3_c3_dyer', fresh:()=>!S.f.b3_c3Dyer},
        {id:'c3gidc', name:'A Gidrath', kind:'b3_c3_gidrath', x:12, y:8, node:()=>'b3_c3_gidrath_camp', fresh:()=>!S.f.b3_c3GidCamp} ] },

    /* 16 x 12, the Camps at dusk (63b, night).  . paving  , rubble  # wall  = awning  t the Thrall's steps  D the barracks door  w the square's well  F the legion's fire  c cart  E out of the city */
    { id:'b3_c3_dusk', title:'Capustan · the Thrall at dusk', sub:'Dusk · the Camps · the Mask Council in session', hint:'Tap ground to move · tap a figure to talk · the barracks door, the Thrall\'s steps, the well; the way out at the bottom of the square', decor:'b3_c3_city_night', dark:true,
      map:[ "################",
            "#..t.tt.t..#####",
            "#..........#####",
            "#.=.....,..##D##",
            "#..............#",
            "#.,....=.....,.#",
            "#..............#",
            "#.=.......F....#",
            "#....c.......=.#",
            "#..,....w......#",
            "#..............#",
            "########E#######" ],
      walk:'.,', triggers:{t:'b3_c3_thrall', D:'b3_c3_barracks', w:'b3_c3_well', E:'b3_c3_end'}, start:{x:10, y:10},
      quest:()=> !S.f.b3_c3Barracks ? 'The Grey Swords\' barracks, by the lit door. The healers are working.' : S.f.b3_c3Granary === 1 ? 'The Gidrath is waiting by the Thrall\'s steps.' : 'The square: the legion\'s fire, the Thrall\'s steps. The way out of the city at the bottom, when the squad is ready.',
      npcs:[
        {id:'c3itk', name:'The Shield Anvil', kind:'b3_c3_itkovian', x:6, y:2, node:()=>'b3_c3_itkovian', show:()=>!S.f.b3_c3Itk || /^b3_c3_itkovian/.test(S.node || ''), fresh:()=>!S.f.b3_c3Itk},
        {id:'c3gid', name:'A Gidrath', kind:'b3_c3_gidrath', x:4, y:2, node:()=>!S.f.b3_c3Granary || S.f.b3_c3Granary === 1 ? 'b3_c3_gidrath' : 'b3_c3_gidrath_again', fresh:()=>!S.f.b3_c3Granary},
        {id:'c3gruntle', name:'A striped Daru', kind:'b3_c3_gruntle', x:9, y:7, node:()=>S.f.b3_c3Gruntle ? 'b3_c3_gruntle_again' : 'b3_c3_gruntle', fresh:()=>!S.f.b3_c3Gruntle},
        {id:'c3legion', name:'A woman of the legion', kind:'b3_c3_capan', x:11, y:8, node:()=>S.f.b3_c3Legion ? 'b3_c3_legion_again' : 'b3_c3_legion', fresh:()=>!S.f.b3_c3Legion},
        {id:'c3dannetd', name:'Dannet', kind:'greysword', x:7, y:9, node:()=>S.f.b3_c3DannetDusk ? 'b3_c3_dannet_dusk_again' : 'b3_c3_dannet_dusk', fresh:()=>!S.f.b3_c3DannetDusk},
        {id:'c3tavd', name:'Tav', kind:'tav', x:3, y:6, node:()=>'b3_c3_tav_dusk', show:()=>c3Brisk() && c3Key() === 'camps', fresh:()=>c3Brisk() && c3Key() === 'camps' && !S.f.b3_c3TavDusk} ] } ],

  battles:{
    /* the last night: the Pannion picket on the rise across the north road, between the Host and the field */
    b3_c3_picket:{title:'The picket on the rise', style:'b3_c3_field', dark:true, open:true, pitTxt:'the rise', warrenText:'Night on the north road · Capustan burning on the skyline', warren:{denul:1, meanas:1}, music:'battle',
      map:["..,..#..",".#....,.","...x....",",.......","..x..x..","........",".,....,.","...x....","........","........"],
      party:P6,
      foes:[['b3_c3_picket',2,1],['b3_c3_picket',5,1],['b3_c3_pbow',3,0],['b3_c3_pbow',6,0]], xp:110, after:'b3_c3_after_picket',
      waves:[{round:2, foes:[['b3_c3_picket',0,3]], text:'A man who went down the back of the rise for help comes back up it with some.'}],
      preText:()=>`It lands in the fire they meant you to see, and the fire goes everywhere at once: up, out, and over the men sitting closest, in a shower of sparks and burning sticks. For a breath nobody on the rise can see anything but the light.`,
      preFx:B=>{ [[2,1],[3,1],[4,1],[3,0],[4,0]].forEach(([x, y]) => preSmoke(x, y, 1)); },
      stage2:{title:'The back of the rise', xp:50,
        text:()=>`Over the crest, behind the second fire, there is a tent, and in front of the tent a man who has just come out of it: tall, in grey plate, with a long mace in one hand and the air round the other hand gone faintly wrong, like heat over a road.

A Seerdomin. The Seer's own. ${c3Brisk() ? `"One," says Brisk. "Just the one." She does not sound comforted.` : 'Just the one. Nobody in the squad finds that a comfort.'}`,
        map:["...==...","...==...","........",".,..,...","...x....","........","..,...,.","........","........","........"],
        party:P6,
        foes:[['b3_seerdomin',3,1],['b3_c3_picket',2,2],['b3_c3_picket',5,2]]} },

    /* the relief: the Pannion army driven out of the gates onto the allied line, and the Fourth's stretch of it (key 'field') */
    b3_c3_hold:{title:'The Host\'s stretch of the line', style:'b3_c3_field', open:true, pitTxt:'the line', warrenText:'The siege ground · the warrens are poisoned here: a spell may burn its caster', warren:{denul:1, meanas:1}, music:'battle',
      map:["..,..,..","........",".,....,.","........","x.xx.xx.","........","..,..,..","........","........","........"],
      party:P6,
      get allies(){ return c3Brisk() ? [['b3_c3_tav',7,8],['b3_c3_regular',0,8]] : [['b3_c3_regular',7,8],['b3_c3_regular',0,8]]; },
      aid:{kind:'b3_rhivi_rider', at:[7,5], need:8},
      foes:[['b3_beklite',2,1],['b3_beklite',5,1],['b3_tenescowri',1,0],['b3_tenescowri',3,0],['b3_tenescowri',6,0]], xp:170, after:'b3_c3_after_hold',
      objective:{type:'survive', rounds:4, text:'Hold the Host\'s stretch for four rounds, until the files behind them break.'},
      waves:[{round:2, foes:[['b3_tenescowri',0,0],['b3_tenescowri',7,0],['b3_beklite',4,0]], text:'More of them, out of the smoke, running because the ones behind them are running.'},
        {round:3, foes:[['b3_beklite',2,0],['b3_c3_pbow',6,0]], text:'A Beklite file comes on behind the starving, in step, with an officer shouting the step.'},
        {round:4, foes:[['b3_tenescowri',3,0],['b3_tenescowri',4,0]], text:'The last of the rush, thin as rakes, and they do not stop.'}],
      preFx:B=>{ [[2,4],[3,4],[4,4],[5,4]].forEach(([x, y]) => preFire(x, y, 2, 'Moranth fire')); },
      stage2:{title:'The rearguard', xp:110, keepAllies:true,
        text:()=>`The starving have gone past, east and west, round the ends of the line. What comes now is what was behind them: the last Pannion files that still have officers, coming at the Host's centre in good order, because good order is all they have left. At their head, on foot, a Seerdomin in grey plate with a white cloak, walking as if the field were his.${c3Brisk() ? `

"Fourth Regiment," says Tav, on your right, the way another man would remark on the weather. "Shields." And the shields come up all along the line like a shutter.` : ''}`,
        map:[".,....,.","........","..x..x..","........",",......,","........","...,....","........","........","........"],
        party:P6,
        foes:[['b3_c3_seerofficer',3,1],['b3_c3_file',1,2],['b3_beklite',5,2],['b3_c3_pbow',6,0],['b3_c3_pbow',1,0]],
        waves:[{round:2, foes:[['b3_beklite',0,3]], text:'One more file-leader\'s man, come back for his officer.'}]} },

    /* the south Camp: the Beklites' barricade round the temple (key 'camps') */
    b3_c3_camps:{title:'The barricade', style:'b3_c3_city', pitTxt:'the street', warrenText:'Capustan · the warrens are poisoned here: a spell may burn its caster', warren:{denul:1, meanas:1}, music:'battle',
      map:["#.t..t.#","#......#","#.=..=.#","#......#","##.##.##","#......#","#.c...,#","#......#","#......#","#......#"],
      party:P6,
      allies:[['b3_greysword',1,8],['b3_greysword',6,8]],
      aid:{kind:'b3_barghast', at:[6,6], need:9},
      foes:[['b3_beklite',2,3],['b3_beklite',5,3],['b3_c3_pbow',1,1],['b3_c3_pbow',6,1],['b3_tenescowri',3,2],['b3_tenescowri',4,2]], xp:160, after:'b3_c3_after_camp',
      waves:[{round:2, foes:[['b3_beklite',3,0]], text:'Another Beklite comes up from the court at a run, sent by somebody calm.'}],
      preFx:B=>{ preTile(3, 4, '.'); preTile(4, 4, '.'); },
      stage2:{title:'The temple court', xp:100, keepAllies:true,
        text:()=>`Beyond the barricade, the court: a paved square in front of a small domed temple, its doors barred and the steps below them stained. On the steps, a Beklite officer in a long scale coat with a spear like a boat-hook. He has seen you. He is calm. He says something over his shoulder to the men with him, and one of them looks at the temple doors.

Dannet, beside you, says one word in Capan. You do not need it translated.`,
        map:["#tttttt#","#......#","#.=..=.#","#......#","#......#","#..w...#","#......#","#......#","#......#","#......#"],
        party:P6,
        foes:[['b3_c3_file',3,1],['b3_beklite',2,2],['b3_beklite',5,2],['b3_c3_pbow',5,1]],
        waves:[{round:2, foes:[['b3_tenescowri',1,2],['b3_tenescowri',6,2]], text:'Two of the starving come out of a doorway on the court, where they have been all along, and do not look at anything but the nearest of you.'}]} },

    /* dusk: Beklites barred into a granary in the next Camp, with the last grain in it (optional) */
    b3_c3_granary:{title:'The granary', style:'b3_c3_city', dark:true, pitTxt:'the granary', warrenText:'The Camps at night · the warrens are poisoned here: a spell may burn its caster', warren:{denul:1, meanas:1}, music:'battle',
      map:["##....##","#......#","#..==..#","#......#","#.c..c.#","#......#","##.##.##","#......#","#......#","#......#"],
      party:P6,
      aid:{kind:'b3_greysword', at:[6,9], need:7},
      foes:[['b3_c3_holdout',3,1],['b3_beklite',2,2],['b3_beklite',5,2],['b3_c3_pbow',4,0]], xp:90, after:'b3_c3_after_granary'} },

  foes:{
    /* Pannion soldiers, on the Beklite sprite (60b) */
    b3_c3_picket:{name:'Beklite picket', sig:'b', kind:'beklite', hp:12, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'drives a spear at'},
    b3_c3_pbow:{name:'Pannion bowman', sig:'p', kind:'beklite', hp:9, ac:12, atk:4, dmg:[1,6,1], rng:5, mv:4, init:2, sk:['pin'], verb:'looses a short bow at'},
    b3_c3_file:{name:'Beklite file-leader', sig:'F', kind:'beklite', hp:26, ac:15, atk:5, dmg:[1,10,2], rng:1, mv:4, init:2, boss:true, sk:['parry','reach'], verb:'brings a long spear round on'},
    b3_c3_holdout:{name:'Beklite holdout', sig:'H', kind:'beklite', hp:22, ac:14, atk:5, dmg:[1,8,2], rng:1, mv:4, init:1, boss:true, sk:['shove'], verb:'hacks at'},
    /* a Seerdomin of Kulpath's rearguard: grey sorcery that gets into the head */
    b3_c3_seerofficer:{name:'Seerdomin of the rearguard', sig:'Σ', kind:'seerdomin', hp:32, ac:16, atk:6, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['daze','parry'], verb:'brings the long mace down on'},
    /* allies on the line: Brisk's brother (60b's 'tav'), and the Fourth Regiment */
    b3_c3_tav:{name:'Tav', sig:'T', kind:'tav', hp:26, ac:15, atk:5, dmg:[1,8,2], rng:1, mv:4, init:1, verb:'brings a short sword down on'},
    b3_c3_regular:{name:'Fourth Regiment regular', sig:'r', kind:'b2soldier', hp:20, ac:15, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'thrusts at'} },

  gear:{
    b3_c3_shield:{name:'A Capan round shield', slot:'armour', who:['brisk', 'sgt', 'greysword'], ac:2, line:'A Capan round shield, boards under painted leather, dark red with the city\'s gold dome on it and a bronze boss. A Gidrath carried it on the Thrall\'s steps for nine days. It has the marks of all nine.'},
    b3_c3_surcoat:{name:'A Grey Sword\'s surcoat', slot:'armour', who:null, ac:1, hp:3, line:'Grey wool, split at the hem and torn, with the boar\'s head on the breast picked out in black thread and the thread cut through where Fener was. The wolf is not on it yet. It belonged to an acolyte who will not want it back.'},
    b3_c3_spear:{name:'A Beklite\'s spear', slot:'weapon', who:['brisk', 'sgt', 'greysword', 'kettle'], atk:1, rng:1, ac:-1, reach:true, line:'A long ash spear with a broad leaf blade of black iron and a grey rag knotted under it. It reaches over a shield to the man behind, and leaves the one holding it a little open, which is how the Pannions fought and why so many of them are dead.'},
    b3_c3_stripe:{name:'Treach\'s stripe', slot:'trinket', who:null, atk:1, line:'A strip of old tawny hide barred with black, on a thong with a bone bead, cut from the tiger skin that hung over the altar of Trake\'s temple in Capustan. It is warm. It should not be.'} },

  scenes:{
    b3_c3_walls:{loc:'Capustan', sub:'On the Catlin', cap:'Walls and domes on a low hill over the river, and smoke going up from a dozen places.', amb:'explore'},
    b3_c3_walls_dawn:{loc:'Capustan', sub:'On the Catlin · sunrise', cap:'Walls and domes on a low hill over the river with the sun just up off to the east, the Pannion camp left grey and empty below them, and the Host\'s standards coming over the rise into line.', amb:'explore'},
    b3_c3_dragon:{loc:'The field before Capustan', sub:'Noon', warren:true, cap:'Something black and vast over a breaking army, seen from far below.', amb:'explore'},
    b3_c3_walls_night:{loc:'Capustan', sub:'On the Catlin · night', cap:'Walls and domes on a low hill over the river, dark against a sky the colour of a forge, and small fires across the field below.', amb:'night'},
    b3_c3_field:{loc:'The field before Capustan', sub:'After the shadow', cap:'The sky empty again but for the city\'s smoke, the starving lying down in the grass by the thousand, and the Rhivi riding slowly out to herd them.', amb:'wind'},
    b3_c3_court:{loc:'Capustan', sub:'A temple court in the Camps', cap:'Pale walls in hard sun, the Camp\'s people sitting along them where they came out, and acolytes in grey going among them with water.', amb:'explore'},
    b3_c3_thrall:{loc:'Capustan', sub:'The Thrall at dusk', cap:'A great domed hall with every window lit, and voices coming down its steps.', amb:'explore'} },

  end:{
    field:['The line held', 'At Capustan the Barghast and the Bridgeburners broke into the city by night, and in the morning drove the Pannion army out of its gates onto the allied line. The Fourth held the Host\'s stretch of it all day, beside the Fourth Regiment, and Brood\'s people saw who held. A black dragon came over the field, and the Seer\'s starving army lay down in the grass. Capustan is relieved. Nobody in it would use the word.'],
    camps:['Into the Camps', 'At Capustan the Barghast and the Bridgeburners broke into the city by night, and in the morning drove the Pannion army out of its gates onto the allied line. The Fourth was not on the line. It went into the city with a Grey Sword party and opened a barricade in the south Camp, and four hundred people came out of a temple into the light. The Fourth saw what nine days did to Capustan. It will not say.'] },
  endScene:'b3_c3_walls_night',
  endCap:()=> c3Key() === 'camps' ? 'Night on the field below Capustan. The Thrall\'s lamps are still lit behind the walls. The squad sleeps badly, and nobody asks anybody why.' : 'Night on the field below Capustan, where the Pannion army stood this morning. The Rhivi fires are close tonight. Somebody over there is singing about a line that held.',
  tease:'Next: the prisoners. West of the city, the starving the Seer drove ahead of his army, under guard in their tens of thousands; an order from Whiskeyjack that not everyone wants to keep; and one cold night, dust on the horizon.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b3_c3Picket) x.push('On the last night of the march the Fourth took the Pannion picket on the rise across the north road. In the Seerdomin\'s tent there was a map of the Host\'s march, a mark for every day.');
    if (f.b3_c3Song) x.push('Sohra sang for Capustan\'s dead at the last halt, and the Rhivi fires took it up across the field.');
    if (f.b3_c3LegAsked) x.push('At the last halt the sergeant asked Whiskeyjack about his leg. "After Capustan," he said.');
    if (f.b3_c3_key === 'field') x.push('The Fourth held the Host\'s stretch of the line below Capustan all day, beside the Fourth Regiment, while Kulpath\'s army came out of the gates onto it.');
    if (f.b3_c3_key === 'camps') x.push(`The Fourth went into Capustan with a Grey Sword party and opened the Beklites' barricade in the south Camp. Four hundred people came out of the temple.${f.b3_c3Cusser ? ' The barricade is a hole in the street now, and Kettle\'s satchel is lighter by one.' : ''}`);
    if (f.b3_c3Grass === 'water') x.push('When the Tenescowri lay down in the grass, the Fourth carried its own water out to the nearest of them, where Brood\'s riders could see.');
    if (f.b3_c3Grass === 'stood') x.push('When the Tenescowri lay down in the grass, the Fourth stood between them and the Host\'s soldiers, and said nothing.');
    if (f.b3_c3Grass === 'left') x.push('When the Tenescowri lay down in the grass, the Fourth turned its back.');
    if (f.b3_rake) x.push('A black dragon came over the field at noon. The Seer\'s starving army lay down under it.');
    if (f.b3_dannetMet) x.push(`A Grey Sword acolyte called Dannet ${f.b3_c3DannetWhere === 'camps' ? 'took the Fourth through the back lanes of the Camp where she was born' : 'brought water down the line to the Fourth\'s stake from the barracks well'}.${f.b3_dannetSeed ? ' She remembers the Fourth by name.' : ''}`);
    if (f.b3_c3Itk) x.push('The Shield Anvil of the Grey Swords thanked the Fourth on the Thrall\'s steps, formally, and went on to his wounded.');
    if (f.b3_treach) x.push('In a square in the Camps, Trake\'s Legion sat round a fire with a Daru caravan guard who has been made into something else.');
    if (f.b3_c3Stripe && TPL[f.b3_c3Stripe]) x.push(`${NAME(f.b3_c3Stripe)} carries a strip of the tiger hide from Trake's temple. It is warm.`);
    if (f.b3_c3OhlBit) x.push('Ohl reached into Denul in the Grey Swords\' barracks, and something in the warren bit him. There is a ring burnt into his palm.');
    if (f.b3_c3Granary === 'won') x.push('The Fourth took the granary in the next Camp without burning the grain.');
    if (f.b3_c3Granary === 'no') x.push('The Fourth would not take the granary. Somebody burned it.');
    if (f.b3_c3Carried) x.push('The Fourth carried in the Grey Swords\' barracks until the lamps were trimmed.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b3_capustan && `The White Face Barghast and Captain Paran's Bridgeburners broke into Capustan by night. The next day they drove Septarch Kulpath's army out of its gates onto Dujek's and Brood's line.`,
    f.b3_rake && `A black dragon came over the field at Capustan: the lord of the Tiste Andii, the soldiers say. The Seer's starving army lay down in the grass under it.`,
    f.b3_karnadasHeard && `The Grey Swords' Destriant healed through the whole siege while his warren went bad in him, until it ate him. Their Mortal Sword is dead too. The Shield Anvil lives.`,
    f.b3_treach && `Treach, the Tiger of Summer, has a Mortal Sword in Capustan: Gruntle, a Daru caravan guard. His Capan followers carry the tiger's stripes on their skin and call themselves Trake's Legion.`,
    f.b3_c3Thrall && `The Mask Council of Capustan's high priests sits in the Thrall, deciding whose fault it was. Barghast wait on the Thrall's steps, looking at its floor.`,
    f.b3_c3Close && `They say the First Child, who led the Tenescowri, was taken alive at Capustan. Nobody the Fourth would believe saw it.`,
    f.b3_c3_key === 'field' && `At Capustan the Fourth held the Host's stretch of the allied line, beside the Fourth Regiment, when the Pannion army came out of the gates.`,
    f.b3_c3_key === 'camps' && `At Capustan the Fourth went into the city with the Grey Swords and opened a barricade in the south Camp, where four hundred people had held a temple for nine days.`,
    f.b3_domin && `The warrens are poisoned on the siege ground at Capustan, as they are in the Domin. A spell may burn the hand that casts it.`,
    `The Host and Caladan Brood's army came down the Catlin road to Capustan by night, six weeks out of Pale.`].filter(Boolean); },

  dlg:{}
};

/* ---------------- the last halt ---------------- */
Object.assign(B3CH3.dlg, {
  b3_c3_start:()=>({sp:'The last halt', scene:'b3_c3_walls_night', html:allyHTML('The Catlin road · three leagues short of Capustan'), txt:
`The Host comes off the road into a fallow field and lies down in it, company by company, without being told twice. Fires are allowed, small ones. Nobody sings.

From the rise at the field's edge you can see it properly for the first time: a smudge of walls on a low hill over the river, domes on top of it like upturned bowls, and the light under the smoke going up and down, slowly, the way a fire breathes.${b3In('kettle') ? `

"That's not one fire," Kettle says, beside you. "That's a lot of fires that have stopped being separate." She sounds as though she would like to be closer. She sounds as though she knows it.` : ''}${b3In('sohra') ? `

Sohra has her hands over her ears. When she sees you looking she takes them away, carefully, as if they might be needed again.` : ''}

Somewhere across the field Brood's people are halting too. The Rhivi fires are a long way off tonight.${b3In('tuft') ? ' Tuft is looking at them, and not at the city.' : ''}`,
    ch:[b3DeckChoice(3),
        {t:'Find Whiskeyjack.', go:()=>startExplore()},
        {t:'"Eat. Sleep if you can."', go:()=>startExplore()}]}),
  b3_c3_deck:()=>b3DeckOffer(3),
  b3_c3_card:()=>b3DeckCard(3),

  b3_c3_wj:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c3Wj = 1; S.f.b3_legSeen = 1; }, txt:
`Whiskeyjack is by the standard with Hurlochel and two runners, still mounted, a map across his saddle that he is not looking at. He gets down when he sees you coming. It takes him a moment longer than it should, with his weight kept off one leg, and he does it in the dark, where nobody would see.

You see.

"Sergeant." He folds the map. "There's a rise across the road, south. Half a mile. The Pannions kept a picket on it all through the siege, to watch the north road, and it's still there: twenty, thirty, a fire they think we can't see. At dawn the Host forms on the field beyond it." A pause. "I'd like the rise to be ours before then. Quietly, if you can. Not quietly, if you can't."

He looks at the city. "The Barghast are inside. Some of ours with them. By morning they'll have pushed Kulpath's army as far back as it will go, and the only way left for it to go is out." He says it the way another man would say *rain by noon*. "Out is us."`,
    ch:[{t:'"Sir. The picket."', go:'b3_c3_picket_go'},
        {t:'"Sir. Your leg."', req:()=>!S.f.b3_c3LegAsked, go:'b3_c3_wj_leg'},
        {t:'"Sir." Back to the squad.', go:()=>startExplore()}]}),
  b3_c3_wj_leg:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c3LegAsked = 1; }, txt:
`He looks at you for long enough that the runners find something to do elsewhere.

"Mallet wanted a week," he says. "Flat on my back, with him sitting on my chest to keep me there. Mallet's in that city tonight, with the Barghast." He nods south-east, at the light. "When he comes out of it he can have his week. After Capustan."

"After Capustan, sir."

"That's what I said." He takes the reins again, and this time he goes up into the saddle in one movement, all on the good leg, as if to show you he can. It is very well done. It is the worst thing you have seen all spring.`,
    ch:[{t:'"Sir." The picket.', go:'b3_c3_picket_go'},
        {t:'Leave it.', go:()=>startExplore()}]}),
  b3_c3_wj_again:()=>({sp:'Whiskeyjack', txt: S.f.b3_c3Picket
    ? `Whiskeyjack is up on his horse again by the standard, watching the light in the south-east. "The rise is ours," he says, without turning. "Good." A pause. "Get some sleep, Sergeant. That's an order I don't expect you to obey."`
    : `Whiskeyjack is up on his horse again by the standard, watching the light in the south-east. "The rise, Sergeant," he says, without turning.`,
    ch:[{t:'"Sir. The picket."', req:()=>!S.f.b3_c3Picket, go:'b3_c3_picket_go'},
        {t:'"Sir." Back to the squad.', go:()=>startExplore()}]}),
  b3_c3_hurl:()=>({sp:'Hurlochel · the Host\'s outrider', fx:()=>{ S.f.b3_c3Hurl = 1; }, txt:
`Hurlochel was Brood's once, and rides for the Host now, and nobody on either side has ever quite decided what to make of that, least of all Hurlochel. He is sitting on an upturned bucket by the standard, cleaning mud off a horse's bit.

"The rise?" He doesn't look up. "Two fires. One they want us to see, on the near side of the crest, and a dozen spears round it pretending to be asleep. One behind, out of sight, where the rest are. Bowmen. And a tent." Now he looks up. "A tent with a man in grey in it. I saw him come out to piss. He walked like he owned the hill."

He goes back to the bit. "The Rhivi ride the flanks at dawn. The Andii and Brood's own on the right. The Host in the middle, across the north road, where it's flattest." He holds the bit up to the firelight, and is not satisfied with it. "Flattest is where they'll come."`,
    ch:[{t:'"Thanks."', go:()=>startExplore()}]}),

  b3_c3_picket_go:()=>({sp:'The rise', txt:
`The rise is a long hump of grass across the road, black against the red sky, with a fire on the near side of the crest that is meant to be seen and, if Hurlochel is right, another behind it that isn't.

${c3Brisk() ? `Brisk has her shield on her arm already. "Twenty," she says. "Thirty. Half of them asleep. The other half wishing they were." She looks at you. "Up the front, or round?"` : 'Up the front, or round. Those are the choices. They usually are.'}`,
    ch:[{t:'Up the front. Fast.', go:()=>startBattle('b3_c3_picket', {})},
        {t:'Kettle\'s sharper into the fire they want us to see.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c3_picket', {pre:true})},
        {t:'Round by the long grass, and up the back of the rise.', check:['guile',14],
          edges:id=>[id === 'sohra' && ['the grass is her country', 2], id === 'tuft' && ['small, and very quiet', 1], id === 'brisk' && ['she clanks', -1]],
          near:{t:()=>`Yes, but it is half a bell flat on the belly in wet grass with every stalk a noise, and ${NAME(ROLL().who || 'sgt')} comes up the back of the rise with a heart going like a drum: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
          go:'b3_c3_picket_round', fail:'b3_c3_picket_seen'},
        {t:'"Not yet."', go:()=>startExplore()}]}),
  b3_c3_picket_round:()=>({sp:'The rise', txt:
`${by({sohra:`Sohra goes into the long grass the way water goes into sand, and the squad goes after her as best it can. She stops twice to listen to something none of you can hear. The third time she stops, she points, and there they are: the back of the picket, a dozen men round a fire they think is hidden, looking the wrong way.`,
  sgt:`You take the squad round by the long grass, slowly, the way you were taught on a plain a long way from here. It takes half a bell. When you come up over the back of the rise they are round their second fire, a dozen of them, looking the wrong way.`,
  _:`{who} takes the squad round by the long grass, a step at a time. It takes half a bell. When you come up over the back of the rise they are round their second fire, a dozen of them, looking the wrong way.`})}

Nobody has seen you yet. That will last about a heartbeat.`,
    ch:[{t:'Into them.', go:()=>startBattle('b3_c3_picket', {surprise:'p'})}]}),
  b3_c3_picket_seen:()=>({sp:'The rise', txt:
`Something goes wrong in the grass: a boot on a dry stalk, a scabbard on a stone, a horse somewhere behind you that decides to say so. On the crest a voice calls out in a language you don't know, sharp, a question.

Nobody answers it. That is an answer.`,
    ch:[{t:'Up. Now.', go:()=>startBattle('b3_c3_picket', {surprise:'e'})}]}),
  b3_c3_after_picket:()=>({sp:'The rise', fx:()=>{ S.f.b3_c3Picket = 1; }, txt:
`The rise is yours. ${b3In('ohl') ? 'Ohl goes from body to body with a lamp, the way he does, ours first and then theirs.' : 'Somebody goes from body to body with a lamp, ours first and then theirs.'}

In the tent behind the crest, the one with the grey-armoured man's things in it, there is a map pinned to a board. The north road, the plain, the Catlin. Along the road, in a small neat hand, a line of marks, one for each day, from Pale to here: the Host's march, every day of it, at the pace it walked.

${b3In('tuft') ? `Tuft looks at it a long time. "They counted us," she says. "Every day." She sounds almost offended.` : 'They counted the Host. Every day of it.'}${b3In('kettle') ? ` "Good," says Kettle. "So they knew when we were coming." She grins at the red sky. "They didn't know what we were bringing."` : ''}

You leave the map where it is. Whiskeyjack will want to see it, and then he will say nothing about it at all, which is how you'll know somebody meant it to be there.`,
    ch:[{t:'Back to the halt.', go:()=>startExplore('b3_c3_halt')}]}),

  b3_c3_tav:()=>({sp:'Tav · the Fourth Regiment', fx:()=>{ S.f.b3_c3Tav = 1; c3Loy('brisk', 1); }, txt:
`Tav's company is three fires over, the Fourth Regiment's heavy infantry sitting on their shields in the dark. Tav is easy to find. He is the biggest of them, and the only one singing.

Brisk walks to the edge of the light and stops there, the way she does. He looks up. He stops singing, which is a mercy to the Fourth Regiment.

"Bris."

"Tav."

"Field in the morning," he says. "They're putting us on the line beside the marines. Beside you lot." He thinks about this. "If I'd known that, I'd have sung louder."

"You'd have sung the same."

"I would." He holds out a heel of Rhivi bread, and she takes it. Neither of them says anything about the morning, which in their family is how you say a great deal about it.${S.imported && b3Was('c7_letter') !== 'brisk' ? `

"Still sealed?" he says, nodding at her gorget.

"Still sealed."

"Long wait."

"I'm patient," says Brisk.` : `

"Four coppers," she says, going.

"Come and get them," says Tav, and starts singing again.`}`,
    ch:[{t:'Leave them to it.', go:()=>startExplore()}]}),
  b3_c3_tav_again:()=>({sp:'Tav', txt:`Tav is singing again. The Fourth Regiment has stopped objecting, which is not the same as liking it.`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_korlat:()=>({sp:'Korlat', fx:()=>{ S.f.b3_c3Korlat = 1; }, txt:
`A Tiste Andii woman stands alone at the edge of the field, a little apart from everything, looking at the burning city. Korlat. She speaks for the Andii while their lord is elsewhere, and in six weeks on the road the Host has never once heard her raise her voice.

She knows you are there before you have decided to speak. "Sergeant." Grave, courteous, as if you were somebody. "You are one of Whiskeyjack's."

"Fourth Squad, Seventh Company."

"Yes." She does not look away from the city. After a while she says, to the light, or to you: "My lord is near. Nearer than he was. You may see him tomorrow. If you do, do not look at him for long." It is not a threat. It sounds, if anything, like kindness. "Mortals find it hard to stop."${b3In('tuft') ? `

Tuft has gone very still beside you, the stillness she keeps for when something of Kurald Galain is near. Korlat's eyes go to her, briefly, and then back to the city. That is all. It is enough to make Tuft breathe out, slowly, as if she had been told something she already knew.` : ''}`,
    ch:[{t:'Leave her to the city.', go:()=>startExplore()}]}),
  b3_c3_korlat_again:()=>({sp:'Korlat', txt:`Korlat has not moved. The light of the city is on her face, and she looks at it the way you would look at a letter in a hand you know.`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_rhivi:()=>({sp:'A Rhivi rider', fx:()=>{ S.f.b3_c3Rhivi = 1; }, txt:
`A Rhivi rider comes along the edge of the field at a walk, leading a second horse, and stops when she sees ${b3In('sohra') ? 'Sohra' : 'the Fourth'}.

${b3In('sohra') ? `The two of them talk in Rhivi, fast and low, the rider leaning down from the saddle. Sohra's face does something and then stops doing it. When the rider goes on, Sohra stands looking after her.

"The Mhybe," she says at last. "She has asked to be carried tomorrow. In a litter." She says the word as if it belonged to some other people's tongue. "At the turn of the year she rode a bhederin bull for a bet. I saw it." She does not say anything else. She does not need to.` : `The rider looks the Fourth over, a long frank look, the way the Rhivi look at a herd they have not decided to buy, and says in bad Malazan: "Tomorrow, the flanks. Us. You, the middle." She points at the ground between you, to make it clear where the middle is. "Do not run." Then she smiles, which changes her whole face, and goes on.`}${b3In('tuft') ? `

Behind her, further off, a wagon of the Mhybe's people goes by on the road with a lantern on it, and in the lantern light, for a moment, a girl in red wool sits up at the front beside the driver, looking at the city. Older again. Older than she was at Pale by a great deal more than the weeks.

Tuft says nothing at all. She watches the lantern until it has gone into the dark.` : ''}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_rhivi_again:()=>({sp:'The Rhivi', txt:`The Rhivi rider is a long way off now, a shape on a horse against the red sky, going round the edge of the field the way a herd-rider goes round a herd at night.`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_fire:()=> S.f.b3_c3Rested ? ({sp:'The squad\'s fire', txt:`The fire is ash. The Host is getting up round it, company by company, in the grey. ${S.f.b3_c3Picket ? 'At the top of the field the road runs south, and the runners are waiting for the word.' : 'There is still the rise across the road.'}`, ch:[{t:'On.', go:()=>startExplore()}]})
    : ({sp:'The squad\'s fire', txt:
`The squad's fire is the size of a helmet, which is what the order allows, and ${b3In('kettle') ? 'Kettle has built it with professional resentment' : 'somebody has built it with care'}. The light of the city sits on the horizon behind it like a second, bigger fire that nobody is allowed to warm their hands at.

Two bells. ${S.f.b3_c3Picket ? 'The rise is yours. The Host can form on the field at dawn.' : 'The rise across the road is still the Pannions\'.'}${b3In('ohl') ? ' Ohl has the tea going, Rhivi leaves, and is daring anyone to refuse it.' : ''}`,
    ch:[{t:'Sleep.', fx:()=>{ S.f.b3_c3Rested = 1; b3Rest('The Fourth sleeps in its cloaks on a fallow field three leagues from a burning city, with the whole Host round it snoring. Wounds close, mostly.'); }, go:'b3_c3_fire_slept'},
        {t:'Let Sohra sing first. For the city.', req:()=>b3In('sohra'), fx:()=>{ S.f.b3_c3Rested = 1; S.f.b3_c3Song = 1; b3Rest('The Fourth sleeps after the song, three leagues from a burning city, with the whole Host round it. Wounds close, mostly.'); ally(1, -1, 'Sohra sings for Capustan\'s dead, and the Rhivi fires answer'); c3Loy('sohra', 1); }, go:'b3_c3_fire_song'},
        {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c3_fire_song:()=>({sp:'Sohra', txt:
`Sohra does not stand up to sing. She sits cross-legged by the little fire with her eyes shut and her hands open on her knees, and starts very low, so low that at first it might be the wind in the stubble.

It is not a song for the living. You know that much Rhivi by now. It is the one they sing at the edge of the grass, to the dead who have not yet found the herd, so they will know which way to walk.

Across the field one Rhivi fire picks it up, and then another, until the whole far side of the field is singing it, very quietly, to a city that cannot hear.

${b3In('ohl') ? `Ohl has stopped stirring the tea. When it is over he says, to nobody, "I don't know the words for theirs. I'll learn them."` : 'When it is over nobody says anything. Then the squad sleeps, better than it has any right to.'}`,
    ch:[{t:'Sleep.', go:()=>startExplore()}]}),
  b3_c3_fire_slept:()=>({sp:'The squad\'s fire', txt:
`You sleep. Twice in the night you wake with the smell of smoke in your nose from a long way off, and the second time ${c3Brisk() ? `Brisk is sitting up with her shield across her knees, watching the light in the south-east. "Go back to sleep, Sergeant," she says. "I've got it."` : 'somebody is sitting up, watching the light in the south-east, and you let them.'}`,
    ch:[{t:'Morning.', go:()=>startExplore()}]}),

  b3_c3_dawn:()=> !S.f.b3_c3Picket ? ({sp:'The road south', txt:`The road south runs past the rise, and the rise is still the Pannions'. Whiskeyjack wanted it before dawn.`,
      ch:[{t:'The picket.', go:'b3_c3_picket_go'}, {t:'Not yet.', go:()=>startExplore()}]})
    : ({sp:'The road south', txt:
`Grey light. The Host gets up out of the fallow field and forms on the road, and the word comes down the column from the standard: the Host to the field below the walls, on the allied line, across the north road. The marines in the centre, with the heavy infantry.

${S.f.b3_c3Rested ? 'The squad is as rested as it is going to be.' : 'The squad has not slept. It is not going to now.'} ${b3In('kettle') ? `"${c3Count()}," says Kettle, to nobody. "Same as last night."` : ''}`,
    ch:[{t:'"Form up. We go."', go:()=>{ startExplore('b3_c3_field'); talk('b3_c3_field_arrive'); }},
        {t:'"Not yet."', go:()=>startExplore()}]}),
});

/* ---------------- the field, and the choice ---------------- */
Object.assign(B3CH3.dlg, {
  b3_c3_field_arrive:()=>({sp:'The field before Capustan', scene:'b3_c3_walls_dawn', html:allyHTML('Before Capustan · the allied line'), fx:()=>{ S.f.b3_domin = 1; S.f.b3_capustan = 1; S.f.b3_c3Field = 1; }, txt:
`The field below Capustan is a mile of trampled ground between the river and the hills, and the Pannion army has lived on it for weeks: siege banks, stake lines, the black rings of cook-fires, a tent city gone grey with smoke and left in the night. Everything in it faces the walls.

Now the Host faces the other way. It comes down onto the field at sunrise and opens out into line across the north road, the heavy infantry in the centre, the marines among them, the Fourth's stretch of ground marked by a broken stake and a dropped shield. To the left, a long way off, the Rhivi on their horses. To the right, Brood's standard, the dark ranks of the Andii, and the Mott Irregulars doing something unofficial to a fence.

The city is a mile in front of you. Smoke goes up from it in a dozen places, and under the smoke, very faintly, you can hear it. Not fire. Fighting.${b3In('ohl') ? `

Ohl has his hand open in front of him, palm down, the way a man feels for rain. "It's here," he says. "What they talked about in Brood's camp. In the warren." He closes the hand. "It tastes of rust, Sergeant. Like a well something has died in." He does not reach any further.` : `

The Host's healers have stopped talking about the warrens. They have started looking at their own hands.`}`,
    ch:[{t:'To the Fourth\'s ground.', go:()=>startExplore()}]}),

  b3_c3_rider:()=>({sp:'A Grey Sword', fx:()=>{ S.f.b3_c3Rider = 1; S.f.b3_greyswords = 1; }, txt:
`A rider comes out of the city by a postern in the west wall, at the gallop, and down across the field toward the Host's centre, and the Host's crossbows follow her the whole way and do not shoot, because she is in grey.

A Grey Sword. Grey mail, grey surcoat, a round shield with a boar's head scraped off it so recently the wood is pale. A woman, old for a soldier, with an Elin face and a cut along her jaw that somebody has stitched in a hurry. She reins in by Whiskeyjack, and they speak, and Whiskeyjack points down the line at you.

She comes on at a walk. "Sergeant. You're the marines with the munitions." It isn't a question. "There is a Camp in the south of the city, by an old temple, where the Beklites have barricaded the streets with carts and furniture, and the people of the Camp are still inside. Four hundred, perhaps. In the temple." She says it flatly, the way you would report a count of arrows. "The Barghast would take that barricade in an hour. They would not stop for the temple. We have not the swords left to take it ourselves without losing the people in it."

The pale place on her shield where the boar was catches the sun. "We want a squad who can open a barricade without bringing the street down on what is behind it. We want it this morning, before the Pannion army breaks and comes out across this field, and every Malazan on it is needed here."`,
    ch:[{t:'"How many Beklites?"', req:()=>!S.f.b3_c3Asked, fx:()=>{ S.f.b3_c3Asked = 1; }, go:'b3_c3_rider_ask'},
        {t:'Look down the line, to Whiskeyjack.', go:'b3_c3_wj_field'},
        {t:'"Give me a moment."', go:()=>startExplore()}]}),
  b3_c3_rider_ask:()=>({sp:'A Grey Sword', txt:
`"Forty. Fifty. Bowmen on the roofs. An officer who knows his work, which is why it is still standing." She looks at you. "And Tenescowri, inside the line, with them. You will have heard what the Tenescowri are." That isn't a question either.

"The acolytes I bring are children. Capan daughters. A year ago they were embroidering. They have held the wall for nine days, and I would take them into that street sooner than leave the temple to the Barghast." Her horse shifts under her, and she settles it without looking. "I would rather take Malazans."`,
    ch:[{t:'Look down the line, to Whiskeyjack.', go:'b3_c3_wj_field'},
        {t:'"Give me a moment."', go:()=>startExplore()}]}),
  b3_c3_wj_wait:()=>({sp:'Whiskeyjack', txt:`Whiskeyjack is sitting his horse behind the Fourth's stretch, watching the city. "There's a rider coming out of that postern," he says, without turning. "In grey. She'll want somebody. Hear her out."`, ch:[{t:'"Sir."', go:()=>startExplore()}]}),
  b3_c3_wj_field:()=>({sp:'Whiskeyjack', html:allyHTML('Before Capustan · the allied line'), txt:
`Whiskeyjack has ridden up behind the Fourth's stretch. He has heard. He is looking at the city, not at you.

"Your call, Sergeant," he says. "The Host can spare a squad. It can't spare it twice." He gathers the reins. "Brood's people are going to watch who holds this line when the Pannions come out of those gates, and they're going to remember it. The Grey Swords are going to remember who came into their city, and who didn't." He looks at you then, grey-eyed, tired. "Both of those are true. Pick one."${c3Brisk() ? `

Down the line, the Fourth Regiment is forming on your right. Tav's company. Brisk has seen it. She hasn't said a word.` : ''}`,
    ch:[{t:'"We hold the line, sir. The Fourth stays."', fx:()=>{ S.f.b3_c3_key = 'field'; c3Loy('brisk', 1); c3Loy('sohra', 1); c3Loy('ohl', -1); }, go:'b3_c3_key_field'},
        {t:'"We go into the city with the Grey Swords."', fx:()=>{ S.f.b3_c3_key = 'camps'; c3Loy('kettle', 1); c3Loy('ohl', 1); c3Loy('sohra', -1); }, go:'b3_c3_key_camps'},
        {t:'"Not yet, sir. A moment with the squad."', go:()=>startExplore()}]}),
  b3_c3_key_field:()=>({sp:'The field before Capustan', txt:
`"The Fourth stays," you tell her.

The Grey Sword looks at you a moment longer than courtesy needs. Then she nods, once. "Then the line holds," she says, "and I find someone else." It is not a reproach. It is not anything else either. She turns her horse toward the city, and you watch her go, a grey rider on a mile of trampled ground, until the postern takes her in.

Whiskeyjack is already riding on down the line. "Sergeant," he says, going, and that's all.

${c3Brisk() ? `Brisk shifts her shield on her arm and looks right, at the Fourth Regiment, at a big man in the second file who can't sing. "Beside us," she says. "All day." She does not quite smile.` : 'Then there is nothing to do but wait for the gates.'}`,
    ch:[{t:'The Fourth\'s ground.', go:()=>startExplore()}]}),
  b3_c3_key_camps:()=>({sp:'The field before Capustan', txt:
`"We'll come," you tell her.

The Grey Sword closes her eyes, very briefly, the way a soldier does when a weight on the march is shifted and she had not let herself know how heavy it was. "Then come now," she says. "The postern. My acolytes are inside it."

Whiskeyjack has already turned away down the line. "Sergeant," he says over his shoulder. "Bring them back."${c3Brisk() ? `

Brisk looks right, once, at the Fourth Regiment forming on the line, at a big man in the second file who can't sing. Then she looks at the city, and settles her shield, and that is all you get. She would not thank you for noticing more.` : ''}`,
    ch:[{t:'Into Capustan.', go:()=>{ startExplore('b3_c3_camp'); talk('b3_c3_camp_arrive'); }},
        {t:'"A moment first."', go:()=>startExplore()}]}),
  b3_c3_wj_after:()=>({sp:'Whiskeyjack', txt: c3Key() === 'camps'
    ? `Whiskeyjack is riding the line. "The postern's waiting, Sergeant," he says, going past. "So are they."`
    : S.f.b3_c3Held ? `Whiskeyjack rides along the Host's stretch, slowly, looking at the dead and then at the living, in that order. He stops by the Fourth's stake. He counts you; you watch him do it.

"Good," he says. He rides on. When he is twenty paces off, he shifts in the saddle, and for a moment, with nobody looking but you, his face is grey with something that is not the day.`
    : `Whiskeyjack is watching the gates. "When they open," he says, "they'll come at the flattest ground. That's us." He does not look round. "Hold, Sergeant."`,
    ch:[{t:'"Sir."', go:()=>startExplore()}]}),
  b3_c3_field_on:()=>{
    if (!c3Key()) return {sp:'The field', txt:`The city is a mile off across the field. The Fourth's place is on the line until somebody tells it otherwise.`, ch:[{t:'Back to the line.', go:()=>startExplore()}]};
    if (c3Key() === 'camps') return {sp:'The postern', txt:`The postern in the west wall stands half open, with a grey rider in it, waiting.`,
      ch:[{t:'Into Capustan.', go:()=>{ startExplore('b3_c3_camp'); talk('b3_c3_camp_arrive'); }}, {t:'"Not yet."', go:()=>startExplore()}]};
    if (!S.f.b3_c3Held) return {sp:'The field', txt:`The gates have not opened yet. When they do, the Fourth's place is by its standard.`, ch:[{t:'Back to the line.', go:()=>startExplore()}]};
    return {sp:'The field · evening', txt:
`Evening, and an order down the line from Whiskeyjack: the Host's healers into the city, to the Grey Swords' barracks, where the wounded of nine days are lying in rows; and a squad of marines to carry for them, and to see that nobody in the dark streets mistakes a Malazan healer for a Pannion.

The Fourth, Sergeant. You held all day. You can carry all evening.`,
      ch:[{t:'Into the city.', go:()=>{ startExplore('b3_c3_dusk'); talk('b3_c3_dusk_arrive'); }}, {t:'"Not yet."', go:()=>startExplore()}]}; },

  b3_c3_tav_field:()=> !S.f.b3_c3Held ? ({sp:'Tav', fx:()=>{ S.f.b3_c3TavLine = 1; }, txt:
`Tav's file is on the Fourth's right, close enough to touch shields. He nods to Brisk. She nods back.

"Don't stand in front of things," he says.

"You first," says Brisk.`, ch:[{t:'On.', go:()=>startExplore()}]})
    : ({sp:'Tav', fx:()=>{ S.f.b3_c3TavAfter = 1; }, txt:
`Tav is sitting on his shield with a cut along his forearm that he is pretending not to have.

"Bris," he says. "You stood in front of things."

"So did you."

"I'm bigger." He holds out the arm, not to her, to ${b3In('ohl') ? 'Ohl, who is already there with a needle and an expression' : 'the Fourth, in case anybody has a needle'}. "Four coppers," he says, to the sky, for no reason at all, and Brisk laughs, once, out loud, which nobody in the Fourth has heard her do since Pale.`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_rhivi_field:()=> !S.f.b3_c3Held ? ({sp:'A Rhivi rider', fx:()=>{ S.f.b3_c3RhiviF = 1; }, txt:
`A Rhivi rider has come in from the left flank to look at the Malazan centre, the way you would look at a fence somebody else built. She is young, with a spirit-mark painted across her eyes${b3In('sohra') ? `, and she and Sohra touch foreheads, briefly, horse to foot` : ''}.

"When they come," she says, "they come here. Flat ground." She points at the Fourth's stake. "We will be at the sides, cutting. You will be in the middle, standing." She looks at you. "Stand."`, ch:[{t:'"We\'ll stand."', go:()=>startExplore()}]})
    : ({sp:'A Rhivi rider', fx:()=>{ S.f.b3_c3RhiviF = 1; S.f.b3_c3RhiviF2 = 1; }, txt: c3Key() === 'field'
      ? `The young Rhivi rider from the morning comes back along the line in the evening, slowly, her horse blowing. She stops at the Fourth's stake and looks at it, and at the ground in front of it, for a long time.

"You stood," she says. Then she says it again in Rhivi, louder, over her shoulder, to the riders behind her, and one of them laughs and one of them doesn't, and she rides on.`
      : `The young Rhivi rider rides along the line in the evening, slowly, her horse blowing. She looks at the Fourth's stake, where somebody else stood today, and then at you, and says nothing at all.`,
      ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_line:()=> c3Key() === 'field' && !S.f.b3_c3Held ? ({sp:'The Fourth\'s standard', txt:`The Fourth's standard is a broken stake with a rag on it, and the Fourth's stretch is the twenty paces either side. Ahead, a mile off, the gates on the field side of the city are shut. Behind them, the sound has changed. It is getting nearer.`,
      ch:[{t:'"Here. We wait here."', go:'b3_c3_hold_wait'}, {t:'Not yet.', go:()=>startExplore()}]})
    : ({sp:'The Fourth\'s standard', txt: S.f.b3_c3Held ? `The broken stake with the rag on it. Somebody from the Fourth Regiment has scratched a IV on it with a knife, under the rag, where an officer won't see.` : c3Key() === 'camps' ? `The broken stake with the rag on it. The Fourth won't be standing by it today. Somebody else will.` : `A broken stake with a rag on it, twenty paces of trampled ground either side. The Fourth's stretch, until somebody says otherwise.`,
      ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_hold_wait:()=>({sp:'The field before Capustan', txt:
`The gates open a little before noon.

All of them at once, on the field side, and out of them onto the field comes the Pannion army: not marching. Coming out the way water comes out of a broken jar. Beklites in their files with their officers shouting, and among them, around them, ahead of them, the Tenescowri, more of them than the eye will agree to count, running, because the Barghast are behind them and there is nowhere left to run but here.

They see the allied line across the north road. Some of them stop. The ones behind them don't.

${b3Mind() ? 'Your hands are not quite steady. Nobody\'s are. You have heard, all the way down from Pale, what the Tenescowri are.' : 'You have heard, all the way down from Pale, what the Tenescowri are. You find you do not want to know whether it is true.'}${c3Brisk() ? `

On your right, Tav's file sets its shields. "Bris," says Tav. "Tav," says Brisk.` : ''}`,
    ch:[{t:'"Hold."', go:()=>startBattle('b3_c3_hold', {})},
        {t:'Kettle\'s burner across the gap in the stakes, where they\'ll come thickest.', tag:'uses 1 burner', req:()=>b3In('kettle') && S.inv.burner > 0, fx:()=>{ S.inv.burner--; },
          go:()=>startBattle('b3_c3_hold', {pre:'Kettle\'s burner goes into the gap in the stakes where they are coming thickest, and the gap is fire, a wall of it, for as long as the oil lasts. The ones making for it go round, and round is longer.'})},
        {t:'"Shields. Lock with the Fourth Regiment."', check:['might',14], req:()=>c3Brisk(),
          edges:id=>[id === 'brisk' && ['her brother is the next shield', 2], id === 'sgt' && ['you drilled this on the plain', 1], id === 'tuft' && ['her shield arm is not her good arm', -1]],
          near:{t:()=>`Yes, but to close the last gap in time ${NAME(ROLL().who || 'brisk')} has to throw the shield across it, and the rim comes back into the shoulder like a slammed door: ${bruiseN()} health down at the start of the fight.`, fx:()=>bruise(ROLL().who || 'brisk', bruiseN())},
          go:'b3_c3_lock_ok', fail:'b3_c3_lock_fail'}]}),
  b3_c3_lock_ok:()=>({sp:'The line', txt:
`"*Nathilog*," says Brisk, and the shields go rim to rim along the Fourth's stretch and on into Tav's file without a gap, a hand's width of steel and wood and nothing else, and the line stops being a row of soldiers and becomes a wall.

The first of them hit it at a run. The wall does not notice.`,
    ch:[{t:'Hold.', go:()=>startBattle('b3_c3_hold', {surprise:'p'})}]}),
  b3_c3_lock_fail:()=>({sp:'The line', txt:
`The shields come up, but not together: there's a gap between the Fourth's last shield and Tav's first, a hand's width, and the first of them come straight at it as if they could smell it.

${c3Brisk() ? `"Close it," says Brisk, through her teeth, and steps into it herself.` : 'Somebody steps into it. It will have to do.'}`,
    ch:[{t:'Hold.', go:()=>startBattle('b3_c3_hold', {})}]}),
  b3_c3_after_hold:()=>({sp:'The field before Capustan', fx:()=>{ S.f.b3_c3Held = 1; ally(2, 0, 'Brood\'s people saw who held the Host\'s stretch of the line'); gain('b3_c3_spear'); }, txt:
`It ends the way these things end, not all at once but in pieces: a file that stops coming, a gap that stays empty, an officer who looks round and finds nobody behind him.

The Pannion army is not beaten so much as emptied out. It goes past the ends of the allied line in a long ragged spill, east toward the hills and west toward the river, with the Rhivi riding down its edges. In front of the Host's stretch, where the Fourth stood, it does not go past. It stopped there.

${c3Brisk() ? 'Brisk is on one knee behind her shield, breathing. On her right, Tav is on one knee behind his. They look at each other along the rim, and then both look away at once, as if they had been caught at something.' : 'Down the line the Fourth Regiment is counting its dead out loud, by file.'}

And then the shadow comes over the field.`,
    ch:[{t:'Look up.', go:'b3_c3_dragon'}]}),
  b3_c3_dragon:()=>({sp:'The field before Capustan', scene:'b3_c3_dragon', fx:()=>{ S.f.b3_rake = 1; }, txt:
`It comes from the east, low over the walls: black, and long, and the size of it wrong in a way your eyes keep trying to correct and cannot. The wings go over the field with a sound like a sail filling, once, and every soldier of the Pannion army still on the field looks up at the same moment, the way grass bends to one wind.

It does not breathe fire. It does not need to. It goes over them, slow, and turns west, toward where the Tenescowri are running, and drops toward them, and the sound that comes back across the field is not the sound of people being hurt. It is the other kind.

${b3In('tuft') ? `Tuft has her hand over her mouth. "High House Dark," she says through her fingers. "The Knight." ${S.f.b3_c3Korlat ? '"Don\'t look at him for long, Korlat said."' : ''} She makes herself take the hand away. She does not look away.` : `Somebody in the Host says the word *dragon*, and somebody else says *no*, and neither of them is wrong. The Andii on the right of the line do not look surprised.`}

${b3In('sohra') ? `Sohra does not look at it at all. She is watching the grass to the west, where the starving were running. "They have stopped," she says. "Look. They are lying down."` : 'To the west, where the starving were running, they have stopped. They are lying down in the grass.'}`,
    ch:[{t:'Watch.', go:'b3_c3_grass'}]}),
  b3_c3_grass:()=>({sp:'The field before Capustan', scene:'b3_c3_field', txt:
`They lie down by the hundred and then by the thousand, in the trampled grass west of the field: men and women and the very old and the very young, the whole starving army of the Seer lying down under the shadow as if somebody had told them it was allowed now. Some of them put their hands over their heads. Most of them don't bother.

The shadow goes up again, and away, and is gone over the river. Nobody on the field says anything for a long time.

Then the Rhivi ride out to herd them, slowly, the way you would herd a herd that has stopped wanting anything.${b3In('sohra') ? ' Sohra watches her people go with a face you have not seen on her before.' : ''}

Nearest the Host's stretch, forty paces out, a knot of them have lain down where they stopped: thin as rakes, filthy, with the look of people who have been hungry so long that the hunger is the only thing still holding them up.

The Host's soldiers are looking at them. Some of the Host's soldiers are looking at them in a way you do not like.`,
    ch:[{t:'"Water. Ours. Take it out to them."', fx:()=>{ S.f.b3_c3Grass = 'water'; ally(1, -1, 'The Fourth\'s water, carried out to the starving where Brood\'s riders could see'); c3Loy('ohl', 1); c3Loy('kettle', -1); }, go:'b3_c3_grass_water'},
        {t:'Stand between them and the Host\'s soldiers, and say nothing.', fx:()=>{ S.f.b3_c3Grass = 'stood'; ally(0, -1, 'The Fourth stood where it could be seen'); c3Loy('brisk', 1); }, go:'b3_c3_grass_stood'},
        {t:'Leave them to the Rhivi. It isn\'t the Fourth\'s field.', fx:()=>{ S.f.b3_c3Grass = 'left'; ally(0, 1, 'The Fourth turned its back on the grass'); c3Loy('ohl', -1); }, go:'b3_c3_grass_left'}]}),
  b3_c3_grass_water:()=>({sp:'The grass', txt:
`${b3In('ohl') ? 'Ohl is already walking out with two skins before you have finished saying it.' : 'You walk out with two skins yourself, because somebody has to go first.'}${b3In('kettle') ? ' Kettle follows with a third, complaining under her breath the whole way, and holds it to the mouth of an old man with no teeth as gently as she would set a fuse.' : ''}

They drink the way the very thirsty drink, too fast, and choke, and drink again. None of them says thank you. One woman, when the skin is empty, holds on to it and will not let go, and in the end you let her keep it.

The Host's soldiers who were looking go and look at something else. A Rhivi rider at the edge of the grass watches the whole thing from the saddle, and when it is done she lifts a hand to you, palm out, and rides on.`,
    ch:[{t:'Back to the line.', go:'b3_c3_water'}]}),
  b3_c3_grass_stood:()=>({sp:'The grass', txt:
`You walk out forty paces and stand in front of them, and the Fourth comes and stands with you, in a line, facing the Host. Nobody gives an order. Nobody has to.

The Host's soldiers who were looking stop looking. One of them laughs, not very well, and says something about marines, and goes back to his file. After a while the Rhivi come and take the starving away west at a walk, and the Fourth goes back to its stake and its dropped shield.

${c3Brisk() ? '"Line," says Brisk, to nobody. "That\'s all it is. A line."' : 'A line is a line, whichever way it faces.'}`,
    ch:[{t:'Back to the line.', go:'b3_c3_water'}]}),
  b3_c3_grass_left:()=>({sp:'The grass', txt:
`You turn your back on the grass, and so does the Fourth.

The Rhivi get there before anything happens. You tell yourself so, later, more than once. Probably it is even true.${b3In('ohl') ? `

Ohl does not turn his back. He stands looking at the grass until the Rhivi have taken the last of them away, and then he takes out his list, and looks at it, and puts it away without writing anything, which is worse.` : ''}`,
    ch:[{t:'Back to the line.', go:'b3_c3_water'}]}),
  b3_c3_water:()=>({sp:'A Grey Sword acolyte', fx:()=>{ S.f.b3_dannetMet = 1; S.f.b3_c3DannetWhere = 'field'; }, txt:
`An hour after noon a Grey Sword acolyte comes down the line from the city with a yoke across her shoulders and a bucket at each end, walking the way a woman walks to a well in peacetime, and stops at every stretch of the line to let the soldiers drink.

She is tall and square and very young, with the acolytes' shorn hair and a round shield on her back that has the boar scraped off it and something half painted on the pale wood. A wolf, maybe. It is not finished. She has a cut over one eye that is a day old and a look in both of them that is nine days old.

She sets the buckets down at the Fourth's stake. "Water," she says, in good Malazan with a Capan edge to it. "From the barracks well. It's clean." A pause. "We watched from the wall. The Grey Swords. We watched who held."

She waits while the squad drinks. When you hand back the dipper she looks at you directly for the first time.

"Dannet," she says. "Acolyte. If anyone asks who brought it."`,
    ch:[{t:'"Fourth Squad. Thank you, Dannet."', fx:()=>{ c3Seed(); }, go:'b3_c3_water2'},
        {t:'"What happens to the city now?"', go:'b3_c3_water3'}]}),
  b3_c3_water2:()=>({sp:'Dannet', txt:
`She nods, as if that were a thing worth having said. "Fourth Squad," she repeats, filing it somewhere. "I'll remember."

She shoulders the yoke. At the next stretch of the line she stops again and stands while they drink, very straight, as if there were a wall behind her even out here, where there is nothing behind her but a mile of trampled ground.`,
    ch:[{t:'Back to the Fourth\'s ground.', go:()=>startExplore()}]}),
  b3_c3_water3:()=>({sp:'Dannet', txt:
`"Now?" She looks back at the smoke. "Now the Mask Council will meet and decide whose fault it was. The Shield Anvil will stand there while they do it." Something goes over her face and is put away again. "And we'll bury people. A great many. That's what happens now."

She shoulders the yoke. "Drink, Sergeant. It's clean."`,
    ch:[{t:'Back to the Fourth\'s ground.', go:()=>startExplore()}]}),
  b3_c3_dannet_field:()=>({sp:'Dannet', txt:`Dannet is further down the line with her buckets, standing very straight while a file of the Fourth Regiment drinks. She sees you, and lifts her chin a fraction, which in a Grey Sword acolyte is a wave.`, ch:[{t:'On.', go:()=>startExplore()}]}),
});

/* ---------------- the south Camp (key 'camps') ---------------- */
Object.assign(B3CH3.dlg, {
  b3_c3_camp_arrive:()=>({sp:'Capustan', fx:()=>{ S.f.b3_dannetMet = 1; S.f.b3_c3DannetWhere = 'camps'; ally(0, 2, 'What the siege did to Capustan'); }, txt:
`The postern lets you into a lane between two warehouses, and the lane lets you into Capustan.

You have been in sacked cities; the marines see a great many. This is not a sacked city. This is a city that was eaten while it was still alive, a street at a time, for nine days, and has not yet understood that it is over. Doors stand open on rooms nobody will go into. A well has a rope down it and nothing at the end of the rope. Fires are still going in three streets you can see and others you can smell. The Grey Sword leading you does not look at the doorways, and after the first street, neither do you.${b3In('ohl') ? `

Ohl walks with his eyes open, all the way, because somebody should. He does not say anything. His lips are moving.` : ''}${b3In('sohra') ? `

Sohra has stopped singing under her breath, for the first time since you have known her.` : ''}

The Grey Sword's party is waiting in a little square by a dry fountain: a dozen acolytes in grey, girls of sixteen and twenty with shorn heads and the boar scraped off their shields. One of them steps out to meet you, tall and square, with a half-painted wolf on her shield and a cut over one eye.

"Dannet," she says. "Acolyte. I know the Camp. I was born three streets from that temple." A pause. "I'll take you."`,
    ch:[{t:'"Show me the barricade."', go:()=>startExplore()}]}),
  b3_c3_vet:()=>({sp:'The Grey Sword', fx:()=>{ S.f.b3_c3Vet = 1; }, txt:
`The Grey Sword has her helm off and is retying the strap of her shield with her teeth.

"Forty or fifty," she says round the strap. "Behind the carts at the head of the street. Bowmen on the roofs either side. Beyond the barricade a court, and the temple steps, and the doors barred from inside: that is the Camp's people, and they will not open to anyone they cannot see is not Pannion." She pulls the knot tight. "The officer has the court. If he thinks he is losing, he will remember the temple is there."

She looks at you. "I have been a Grey Sword for thirty-one years, Sergeant. I followed the Mortal Sword out of Elingarth. He is dead, and the Destriant is dead, and the god is gone, and the Shield Anvil is standing in the Thrall waiting to be shouted at by priests." No change in her voice at all. "I would like, today, one thing to go the way it should."`,
    ch:[{t:'"Then let\'s go and make it."', go:()=>startExplore()}]}),
  b3_c3_vet_after:()=>({sp:'The Grey Sword', txt:`The Grey Sword is sitting on the temple step with her helm in her lap and her eyes shut, in the sun, the first time you have seen her sit. She does not open them when you pass. "Well done," she says, to the sun.`, ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_dannet_camp:()=>({sp:'Dannet', fx:()=>{ S.f.b3_c3DannetCamp = 1; }, txt:
`Dannet is crouched at the corner of the street with her shield on her back, looking at the barricade the way ${b3In('kettle') ? 'Kettle' : 'a sapper'} looks at a lock.

"There is a lane," she says, without turning. "Behind the dyers' houses. It comes out in the court, by the temple steps. Too narrow for more than one at a time. The Beklites don't know it; they aren't from here." She looks round at you. "I used to go that way to the temple when I was eight, so nobody would see where I'd gone."

She looks back at the barricade. "My father's house is in this Camp. I have not been through its door in a year. I don't know who is in that temple." Very level. "I'll know in an hour."`,
    ch:[{t:'"Show us the lane when it\'s time."', fx:()=>{ S.f.b3_c3Lane = 1; }, go:()=>startExplore()},
        {t:'"Stay by me in there."', fx:()=>{ S.f.b3_c3Lane = 1; c3Seed(); }, go:'b3_c3_dannet_camp2'}]}),
  b3_c3_dannet_camp2:()=>({sp:'Dannet', txt:`She looks at you, surprised, and then not. "Yes, Sergeant," she says, the way the Grey Swords say *sir*. It is the first Malazan order anyone has ever given her. She seems to find that it fits.`, ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_dannet_after:()=>({sp:'Dannet', txt:`Dannet is on her knees in the court beside an old woman who will not let go of her hand. She does not look up. She does not need to.`, ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_dyer:()=>({sp:'A Capan dyer', fx:()=>{ S.f.b3_c3Dyer = 1; }, txt:
`A Capan man in a dyer's leather apron, blue to the elbows, stands in a doorway across the square with a cleaver in his hand that he does not seem to know he is holding.

"My wife," he says, when you come close. "My daughters. In the temple. The priests opened it when the gates went, and took in everyone who could run." He looks at the cleaver. "I could not run. I was on the wall with the militia. When I came down, the street was theirs."

He holds the cleaver out to you, handle first, as if you would know what to do with it. "Nine days," he says. "Please."`,
    ch:[{t:'"Keep it. Stay here. We\'ll bring them out."', go:()=>startExplore()}]}),
  b3_c3_dyer_after:()=>({sp:'The dyer', txt:`The dyer is sitting on the temple step with a girl under each arm and his face in his wife's apron. You look somewhere else. Some things are not yours to see.`, ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_gidrath_camp:()=>({sp:'A Gidrath', fx:()=>{ S.f.b3_c3GidCamp = 1; }, txt:
`A Gidrath gate-soldier in a dented cap sits on the edge of the dry fountain with a crossbow across his knees and the look of a man who has not been allowed to sit down for nine days and does not entirely trust it now.

"The Gidrath held the Thrall," he says, when you ask. "The council hall. All through. The Pannions came up the steps four times." He shrugs. "We are gate-soldiers. We are good at doors." He looks at the barricade. ${S.f.b3_c3CampDone ? '"That was a door," he says. "Was."' : '"That is a door. I will be behind you."'}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_barricade:()=> S.f.b3_c3CampDone ? ({sp:'The barricade', txt:`The barricade is a heap of broken furniture now, dragged half aside. Beyond it, the court, and the temple steps in the sun.`, ch:[{t:'On.', go:()=>startExplore()}]})
    : ({sp:'The barricade', txt:
`The barricade is three carts on their sides and everything the Camp owned piled behind them: doors, tables, a bed, a loom, a cradle. Over the top of it, beyond, the dome of a small temple. Behind it, voices in a language you don't know, and one voice over them giving orders in it, calmly.

The acolytes form up behind you in the street. They are very young.${b3In('kettle') ? ' Kettle has the satchel open and is looking at the carts with love.' : ''}`,
    ch:[{t:'Straight at it. Over the carts.', go:()=>startBattle('b3_c3_camps', {})},
        {t:'Kettle\'s cusser under the middle cart. The temple is far enough back. Probably.', tag:'uses 1 cusser', req:()=>b3In('kettle') && S.inv.cusser > 0, fx:()=>{ S.inv.cusser--; S.f.b3_c3Cusser = 1; }, go:'b3_c3_cusser'},
        {t:'Dannet\'s lane behind the dyers\' houses, and take the court from the side.', check:['guile',14],
          edges:id=>[S.f.b3_c3Lane && ['Dannet showed you the lane', 2], id === 'tuft' && ['small, and very quiet', 1], id === 'brisk' && ['the lane is one shield wide', -1]],
          near:{fx:()=>{ const d0 = b3Dread(); ally(0, 1, 'Yes, but halfway down the lane a back door stands open on a dyer\'s kitchen the Tenescowri got to first. Nobody stops. Everybody looks');
            if (b3Dread() === d0) { const w = ROLL().who || 'sgt'; S.rattled ??= {}; S.rattled[w] = 1; note(`Yes, but halfway down the lane a back door stands open on a dyer's kitchen the Tenescowri got to first, and ${NAME(w)} looks too long: −1 on the next check.`, 'bad'); } }},
          go:'b3_c3_lane_ok', fail:'b3_c3_lane_fail'},
        {t:'"Not yet."', go:()=>startExplore()}]}),
  b3_c3_cusser:()=>({sp:'Kettle', txt:
`Kettle lies on her back under the middle cart for the length of a long breath, her hands up in the dark among the axles, the way a midwife works.

When she comes out she is grey with dust and very calm. ${c3MaudHome() ? `"That's the Host's cusser under there," she says, low, so the acolytes won't hear. "I never named it. Maud went home." She looks over the barricade at the dome.` : `"Maud," she says, to you, low, so the acolytes won't hear. "That's Maud under there." She looks over the barricade at the dome.`} "Four hundred people, the Grey Sword said." She swallows. "I think this is one that matters. I think. Tell me if it isn't."

You don't tell her it isn't.

She lights it.`,
    ch:[{t:'"Down."', go:()=>startBattle('b3_c3_camps', {pre:'The cusser goes off under the middle cart with a sound you feel in your teeth, and the barricade is not there any more: there is a hole in the street, and a slow rain of chair legs and loom-pieces and one whole door coming down over the court, and beyond it Beklites picking themselves up, deaf.'})}]}),
  b3_c3_lane_ok:()=>({sp:'The lane', txt:
`Dannet goes first, because it is her lane, and ${by({sgt:'you go', _:'{who} goes'})} after her, and the squad after that, one at a time, sideways between two walls so close that the stone catches at your sleeves. It smells of old dye: blue and madder and something sour underneath.

It comes out where she said, behind the barricade, beside the temple steps, and the Beklites behind the carts are all facing the street, and their backs are very close.`,
    ch:[{t:'Now.', go:()=>startBattle('b3_c3_camps', {surprise:'p'})}]}),
  b3_c3_lane_fail:()=>({sp:'The lane', txt:
`Halfway down the lane a shutter bangs open above you, and a Beklite bowman leans out of it to see what the noise was, and looks straight down at the top of ${by({sgt:'your head', _:'{who}\'s head'})}.

He shouts. Behind the barricade, the calm voice stops, and starts again, less calm.`,
    ch:[{t:'Back to the street. Fast.', go:()=>startBattle('b3_c3_camps', {surprise:'e'})}]}),
  b3_c3_after_camp:()=>({sp:'The temple court', fx:()=>{ S.f.b3_c3CampDone = 1; gain('b3_c3_spear'); }, txt:
`The court is yours. The officer is dead on the temple steps, where he went to remember the temple was there, and did not get the time.

It takes a long while to persuade the people inside to open the doors. In the end it is not you who does it, or the Grey Sword. It is Dannet, standing on the steps with her helm off, saying something in Capan through the crack between the doors, a name, and then another name, until a bar is lifted somewhere inside.

They come out slowly into the light: four hundred, perhaps, as the Grey Sword said. The old first, then mothers with children, then everyone. They have been in the dark for nine days. You do not ask them about the nine days. You do not have to. It is in how they come out, one hand on the wall.${S.f.b3_c3Cusser ? `

The barricade is a hole in the street with a cartwheel at the bottom of it, still turning.${b3In('kettle') ? ' Kettle sits on the temple step with her satchel in her lap, looking at it, and does not say anything at all.' : ''}` : ''}`,
    ch:[{t:'Up the temple steps.', go:'b3_c3_camp_dragon'}]}),
  b3_c3_camp_dragon:()=>({sp:'The temple steps', scene:'b3_c3_dragon', fx:()=>{ S.f.b3_rake = 1; }, txt:
`From the top of the temple steps you can see over the roofs of the Camp to the walls, and over the walls to the field.

The Pannion army is coming out onto it. All of it, from here, out of the gates on the field side and onto the allied line drawn up across the north road, and the line is holding. You can see the Host's standards in the middle of it. Somewhere there is the Fourth's stretch, with somebody else standing on it.${c3Brisk() ? ' And Tav\'s company. Brisk is looking at exactly that place, and has not blinked.' : ''}

Then something comes over the walls, low, from the east: black, long, the size of it wrong, with wings that go over the city with a sound like a sail filling. The acolytes on the steps go flat. The Camp's people don't; they have no fear left to go flat with. They only watch it go out over the field, and turn, and drop toward the west, where the starving were running.

${b3In('tuft') ? `"High House Dark," Tuft says. Her voice is very steady. "The Knight." She watches until it has gone up again, over the river. "I'd like to know what he's looking for."` : 'Nobody on the steps says *dragon*. Nobody needs to.'}

Out on the field, to the west, the Tenescowri are lying down in the grass by the thousand.`,
    ch:[{t:'Down, to the people.', go:'b3_c3_camp_help'}]}),
  b3_c3_camp_help:()=>({sp:'The temple court', scene:'b3_c3_court', txt:
`Below, in the court, the Camp's people sit where they came out, against the walls, in the sun. The acolytes go among them with water. Dannet is on her knees by an old woman who will not let go of her hand.

The Grey Sword comes up the steps. "That was well done, Sergeant." From her it sounds like a medal. "The barracks will want your healer, if you have one, and every pair of hands. The Host will be sending its own wounded in by evening." She looks down at the court. "Before that, there is this."`,
    ch:[{t:'"The Fourth stays and helps, until evening."', fx:()=>{ S.f.b3_c3Helped = 1; c3Seed(); ally(1, -1, 'The Fourth stayed in the south Camp until evening, carrying water'); c3Loy('ohl', 1); }, go:'b3_c3_camp_helped'},
        {t:'"We\'re needed outside the walls. We go back."', fx:()=>{ S.f.b3_c3Helped = 0; c3Loy('brisk', 1); }, go:'b3_c3_camp_back'}]}),
  b3_c3_camp_helped:()=>({sp:'The south Camp', txt:
`You stay. It is not soldiering, and it is the most useful thing the Fourth has done all spring: water from the Grey Swords' casks, bread when the bread comes, a cart for the ones who cannot walk to the barracks, and an hour of Dannet saying names into the crowd until people answer to them.${b3In('ohl') ? ' Ohl works with needles and nothing else, and tells you why without being asked: "Rust," he says. "I can taste it from here."' : ''}

Toward evening Dannet comes and stands beside you for a while without saying anything. Then she says, "Thank you, Sergeant," in Malazan, carefully, as if it were a phrase she had learned for the purpose. Then she goes back to the names.`,
    ch:[{t:'To the Grey Swords\' barracks.', go:()=>{ startExplore('b3_c3_dusk'); talk('b3_c3_dusk_arrive'); }},
        {t:'"Not yet."', go:()=>startExplore()}]}),
  b3_c3_camp_back:()=>({sp:'The south Camp', txt:
`You take the Fourth back toward the postern. By the time you reach it the field is over, and a runner from Whiskeyjack is waiting in it with an order that has been chasing you since noon: the Host's healers are going into the city to the Grey Swords' barracks, and the Fourth is to carry for them.

${c3Brisk() ? `Brisk reads the order over your shoulder, and looks back at the city, and says nothing. Then: "The Fourth Regiment held," she says. "The runner said." She has asked him. Of course she has.` : 'So the Fourth turns round and goes back in.'}`,
    ch:[{t:'To the Grey Swords\' barracks.', go:()=>{ startExplore('b3_c3_dusk'); talk('b3_c3_dusk_arrive'); }},
        {t:'"Not yet."', go:()=>startExplore()}]}),
  b3_c3_camp_on:()=> !S.f.b3_c3CampDone ? ({sp:'The street', txt:`The street goes back the way you came, toward the postern and the field. The barricade is the other way, and the Grey Swords are waiting on you.`, ch:[{t:'Back.', go:()=>startExplore()}]})
    : ({sp:'The street', txt:`Down the street and through the Camps, the Grey Swords' barracks, where the Camp's people are going, and the wounded, and everyone.`,
      ch:[{t:'To the barracks.', go:()=>{ startExplore('b3_c3_dusk'); talk('b3_c3_dusk_arrive'); }}, {t:'"Not yet."', go:()=>startExplore()}]}),
});

/* ---------------- Capustan at dusk (both roads) ---------------- */
Object.assign(B3CH3.dlg, {
  b3_c3_dusk_arrive:()=>({sp:'Capustan · dusk', fx:()=>{ S.f.b3_domin = 1; S.f.b3_capustan = 1; S.f.b3_greyswords = 1; S.f.b3_karnadasHeard = 1; S.f.b3_treach = 1; S.f.b3_c3Dusk = 1; }, txt:
`${c3Key() === 'camps' ? 'Evening. The Camp\'s people have gone to the Grey Swords\' barracks, where there is bread, and the Fourth has gone with them.' : 'Evening. The Host\'s healers go in through the west postern with their bags and their lamps, and the Fourth goes in round them, the way you go round anything breakable in a crowd.'}

The barracks is a long stone hall off a square in the Camps, with a well in the middle of the square and a fire in one corner, where men and women with striped arms are sitting, and at the top of the square the steps of a great domed hall with a lamp in every window: the Thrall, where the Mask Council sits.

In the barracks the healers are working by lamplight: the Host's, the Grey Swords' few, a Rhivi woman with smoke and bone. They talk while they work, the way healers do, and what they talk about, low, is the Destriant: the Grey Swords' healer, who healed through the whole siege while the warren went bad in him, and kept on healing, until it ate him from the inside. Nobody tells it as a story. They tell it as a warning.${b3In('ohl') ? `

Ohl stands in the doorway and listens to all of it. Then he takes off his coat, and rolls up his sleeves, and goes in.` : ''}`,
    ch:[{t:'Into the square.', go:()=>startExplore()}]}),

  b3_c3_itkovian:()=>({sp:'The Shield Anvil', fx:()=>{ S.f.b3_c3Itk = 1; }, txt:
`A man in grey plate comes down the Thrall's steps alone, slowly, and stops at the bottom to let a stretcher go past.

You know who he is before anyone says so. Everybody in the square does; the square goes quiet round him the way a room goes quiet round a coffin. The Shield Anvil of the Grey Swords. His armour is dented and black with smoke and his surcoat is in rags, and he stands very straight in it, straighter than a man stands who is only tired, as if something heavy were sitting on his shoulders and he had decided it would not be seen to bend him.

His eyes find the Fourth. ${c3Key() === 'camps' ? `"You went into the south Camp with my acolytes," he says. His voice is low, formal, very clear. "Sir. Thank you. The Grey Swords will not forget it."` : `"You held under the walls," he says. His voice is low, formal, very clear. "We watched from the parapet. Sir. Thank you. The Grey Swords will not forget it."`}

Behind him, up the steps, through the Thrall's open doors, voices are raised: many voices, priests' voices, all talking at once. He does not look back at them.${b3In('sohra') ? `

Sohra is staring at him. When he has gone on across the square she says, very quietly, "He is carrying something. I cannot see what. It is bigger than he is."` : ''}`,
    ch:[{t:'"Shield Anvil."', go:'b3_c3_itkovian2'},
        {t:'Let him go.', go:()=>startExplore()}]}),
  b3_c3_itkovian2:()=>({sp:'The Shield Anvil', txt:`He inclines his head, exactly as far as courtesy requires and no further, as if any further would cost something he does not have to spare. Then he goes on across the square toward the barracks, where his wounded are, and the square lets out its breath behind him.`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_gruntle:()=>({sp:'A striped Daru · Trake\'s Legion', fx:()=>{ S.f.b3_c3Gruntle = 1; S.f.b3_treach = 1; }, txt:
`Trake's Legion has a fire in the corner of the square, and the legion round it: Capan men and women in whatever armour the siege left them, butchers and coopers and wall-militia, and on every one of them, on the arms and the faces and the backs of the hands, stripes. Dark bars, barbed at the ends, as if a tiger had been painted onto them by somebody who knew tigers. They do not look painted.

The man in the middle of them is not Capan. A big Daru with a caravan guard's shoulders and two cutlasses on the ground beside him, sitting on a broken door with a jug, and the stripes on him are darker than on anyone, across his cheeks and down his bare arms, and there is amber in his beard that was not, you would guess, there a fortnight ago.

He looks up at you with eyes that have the same amber in them.

"Malazans," he says. Not unfriendly. Tired past unfriendliness. "Sit, if you like. Don't call me anything. They've been calling me things for two days." He drinks. "I'm a caravan guard. Was. I'm told I'm something else now."`,
    ch:[{t:'"What are you now?"', go:'b3_c3_gruntle_ask'},
        {t:'Sit with them a while.', req:()=>!S.f.b3_c3Sat, fx:()=>{ S.f.b3_c3Sat = 1; ally(0, -1, 'An hour by Trake\'s Legion\'s fire'); }, go:'b3_c3_gruntle_sit'},
        {t:'Leave them to the jug.', go:()=>startExplore()}]}),
  b3_c3_gruntle_ask:()=>({sp:'Gruntle', txt:
`He looks into the jug for a while, as if the answer might be at the bottom of it.

"There's a god," he says at last. "New. A tiger. Treach. The Tiger of Summer, the priests are calling him, the ones who've noticed him, which is most of them now." He turns his arm over and looks at the stripes as if they belonged to somebody else. "He was looking for someone to stand in front of things. I was standing in front of things. That's all it was. Wrong place." He drinks. "They say Mortal Sword. I don't say it."

"Gruntle," says the striped woman beside him, not looking up from the blade she is honing, "is what he is. The rest is the god's business."

"Gruntle is what my mother called me," says Gruntle, "and she didn't mean it kindly either."

For a moment, at the edge of the firelight, something long and low and striped goes past, and the grass between the paving stones stands up behind it as if combed. Nobody else seems to see it. You do. ${godMet('sgt') ? 'It has answered you this spring, once, when nothing else would. You had not known its face until now.' : 'Soldiers in the Host have been swearing by Treach this spring instead of Fener. You find you understand why.'}`,
    ch:[{t:'Sit with them a while.', req:()=>!S.f.b3_c3Sat, fx:()=>{ S.f.b3_c3Sat = 1; ally(0, -1, 'An hour by Trake\'s Legion\'s fire'); }, go:'b3_c3_gruntle_sit'},
        {t:'Leave him to it.', go:()=>startExplore()}]}),
  b3_c3_gruntle_sit:()=>({sp:'Trake\'s Legion', txt:
`You sit. Nobody makes anything of it. The jug comes round; it is Capan wine, sour, and very welcome.${b3In('kettle') ? ' Kettle asks a cooper with stripes to the elbow what he made before the siege, and he says barrels, and she asks him what kind, and they are still talking about barrels an hour later.' : ''}${c3Brisk() ? ' Brisk sits beside a big butcher with her shield across her knees, and the two of them say nothing to each other for an hour, comfortably.' : ''}

Nobody talks about the siege. Nobody talks about the god. Toward the end somebody starts a song, a Capan one, and Gruntle tells him to stop, and he doesn't, and Gruntle doesn't make him.`,
    ch:[{t:'Up.', go:()=>startExplore()}]}),
  b3_c3_gruntle_again:()=>({sp:'Gruntle', txt:`Gruntle is asleep sitting up on his broken door, the jug in the crook of his arm, with the legion round him keeping its voice down. In the firelight the stripes on his face move when he breathes.`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_legion:()=>({sp:'A woman of the legion', fx:()=>{ S.f.b3_c3Legion = 1; }, txt:
`One of the legion sits a little apart from the fire with a knife and a long strip of old tawny hide across her knees. A Capan woman of forty or so, broad, with stripes up both forearms and across her throat like a collar.

"The temple of Trake had a hide over the altar," she says, when she sees you looking. "Older than the city. A tiger's, they said, though nobody here had ever seen a tiger. On the second day the priest cut it up and gave a strip to everybody who'd go back on the wall." She holds one up: amber and black, on a thong with a bone bead. "Most of the ones who took them are dead. The rest of us are this." She turns her striped wrist to the firelight. "This is the last of the hide. It goes to whoever the god likes the look of. It's not my choice who he likes."

She holds out the strip. Not to anyone in particular. To all of you, and to the dark beyond the fire.`,
    ch:[{t:'Take it, and hold her eye while you do.', check:['might',16], trick:'b3_c3_stripe', req:()=>!S.f.b3_c3StripeTried, fx:()=>{ S.f.b3_c3StripeTried = 1; },
          edges:id=>[id === 'sgt' && ['Treach is your god this spring', 2], id === 'brisk' && ['she stands in front of things', 1], id === 'tuft' && ['she belongs to another House', -1]],
          go:'b3_c3_legion_ok', fail:'b3_c3_legion_miss'},
        {t:'Leave it with her.', go:()=>startExplore()}]}),
  b3_c3_legion_ok:()=>({sp:'A woman of the legion', fx:()=>{ S.f.b3_c3Stripe = ROLL().who || 'sgt'; gain('b3_c3_stripe'); }, txt:
`She looks at ${by({sgt:'you', _:'{who}'})} for a long moment, and then she puts the strip into ${by({sgt:'your hand', _:'{who}\'s hand'})} and closes the fingers over it with her own.

It is warm. It should not be warm; it is old leather that has hung in a cold temple since before the city had walls. It is warm the way a cat is warm, from the inside, and for a breath, holding it, ${by({sgt:'you feel', _:'{who} feels'})} something come up through the hand into the chest that is not courage, exactly. Something that does not want to stop.

"There," she says. "He likes you. I'm sorry." She goes back to her knife. "It'll come when you need it. Once in a fight. Don't make it a habit." She turns her striped wrist. "Look at us."`,
    ch:[{t:'Thank her.', go:()=>startExplore()}]}),
  b3_c3_legion_miss:()=>({sp:'A woman of the legion', fx:()=>{ gain('b3_c3_stripe'); }, txt:
`She looks at ${by({sgt:'you', _:'{who}'})} for a long moment, and then shakes her head, not unkindly.

"No," she says. "Not you. Not yet." She puts the strip into ${by({sgt:'your hand', _:'{who}\'s hand'})} anyway. "Keep it. It's a good piece of hide. It won't do for you what it did for us." She goes back to her knife. "Be glad."`,
    ch:[{t:'Thank her.', go:()=>startExplore()}]}),
  b3_c3_legion_again:()=>({sp:'A woman of the legion', txt:`She has put the knife away. Her hands are empty in her lap, and she is looking at the fire the way people look at a fire when there is nothing left to cut.`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_barracks:()=>({sp:'The Grey Swords\' barracks', fx:()=>{ S.f.b3_c3Barracks = 1; }, txt:
`Inside, the barracks is one long hall of wounded in rows on straw, lit by lamps and by a brazier at the far end, and it smells the way every hospital in every war you have been in smells, which is a smell you stop noticing and never stop knowing.

A Grey Sword healer, an old man with a Capan face and hands that shake when they are not working, is going down the rows. He sees the Malazans and does not stop. "If you have a healer," he says over his shoulder, "send him to the end. The leg wounds. Do not let him reach far. Whatever is in the warrens here, it bit the Destriant until there was nothing left of him, and he was the best of us." He kneels by a girl in grey. "Needle and thread, if he has sense. We have learned to like needles."`,
    ch:[{t:'"Ohl. Go on."', req:()=>b3In('ohl') && !S.f.b3_c3OhlTried, go:'b3_c3_ohl'},
        {t:'Carry for them, all evening.', req:()=>!S.f.b3_c3Carried, fx:()=>{ S.f.b3_c3Carried = 1; ally(1, 0, 'The Fourth carried in the Grey Swords\' barracks until the lamps were trimmed'); }, go:'b3_c3_carry'},
        {t:'Back to the square.', go:()=>startExplore()}]}),
  b3_c3_ohl:()=>({sp:'Ohl', fx:()=>{ S.f.b3_c3OhlTried = 1; S.f.b3_c3OhlBit = 1; c3Loy('ohl', 1); }, txt:
`Ohl goes to the end of the hall, to the leg wounds, and kneels by a boy of fifteen in a militia jerkin whose thigh was opened by a Beklite spear and closed badly by somebody in a hurry.

He uses the needle first, because the old healer said to. Then, because the boy is grey and the wound is hot, he puts his hand flat on the thigh and reaches for Denul.

You see it happen. Everybody near does. Ohl's hand jerks as if the boy's skin were a stove, and he says something in Ehrlii that is not a prayer, and keeps the hand where it is anyway, for the length of three breaths, while the colour goes out of his face and into the boy's.

When he takes the hand away the boy is asleep, properly asleep, and Ohl's palm is red and blistered in a ring, as if he had held a hot cup by the wrong end.

"Rust," he says to you, very quietly, holding the hand against his chest. "Like a well. Something died in it, and the something is still there, and it doesn't like being disturbed." He looks down the rows at the old healer, and at the empty place by the brazier where, you understand without being told, the Destriant lay. "He did this for nine days," Ohl says. "*Nine days.*" He does not say anything else for some time.`,
    ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
  b3_c3_carry:()=>({sp:'The Grey Swords\' barracks', txt:
`You carry. Water, bandages, the dead out to the cart in the yard and the living in from the cart to the straw.${b3In('sohra') ? ' Sohra sings over the ones the healers have stopped going back to, under her breath, so as not to frighten the ones who might still live.' : ''}${b3In('tuft') ? ' Tuft holds lamps for the healers and does not reach for her warren once, though you see her want to.' : ''}

Near the end of the evening an acolyte with half her face bandaged catches your sleeve as you pass and says, in Capan and then in bad Malazan, "Malazans. You came," as if somebody had told her you wouldn't. Then she lets go, and goes back to sleep.`,
    ch:[{t:'Back to the square.', go:()=>startExplore()}]}),

  b3_c3_dannet_dusk:()=>({sp:'Dannet', fx:()=>{ S.f.b3_c3DannetDusk = 1; }, txt:
`Dannet is sitting on the edge of the well with her shield across her knees and a pot of grey paint beside her, painting the wolf. She has done the head. She is not sure about the eyes.

"The Destriant is dead," she says, when you sit, as if going on with a conversation. "The Mortal Sword is dead. The god is dead, or gone, or something worse that nobody will explain to an acolyte. Now the new acolytes are dreaming about wolves. Two of them. Most nights." She dabs at the wolf's eye and frowns at it. "The Shield Anvil says nothing. The officers say *wait*. I am tired of waiting. I waited on a wall for nine days." She looks at you. "What do Malazans do, when the god goes?"`,
    ch:[{t:'"Keep marching. Find out later."', fx:()=>{ c3Seed(); S.f.b3_c3DannetSaid = 'march'; }, go:'b3_c3_dannet_dusk2'},
        {t:'"Most of us never had one to lose."', fx:()=>{ S.f.b3_c3DannetSaid = 'none'; }, go:'b3_c3_dannet_dusk3'},
        {t:'"I don\'t know. I\'d tell you if I did."', fx:()=>{ c3Seed(); S.f.b3_c3DannetSaid = 'honest'; }, go:'b3_c3_dannet_dusk4'}]}),
  b3_c3_dannet_dusk2:()=>({sp:'Dannet', fx:()=>{ gain('b3_c3_surcoat'); }, txt:
`She thinks about that. "Keep marching," she says. "Find out later." She paints a line along the wolf's jaw. "That's very Malazan." From her it isn't an insult. It's an observation, filed.

She nods at a folded grey bundle beside her on the well's edge. "There's a surcoat. Off one of ours who won't want it back. The boar's unpicked. The wolf isn't on it yet." She doesn't look up. "Take it. You stood with us today. It might as well be on somebody who did."`,
    ch:[{t:'Take it.', go:()=>startExplore()}]}),
  b3_c3_dannet_dusk3:()=>({sp:'Dannet', fx:()=>{ gain('b3_c3_surcoat'); }, txt:
`"Never had one." She looks at you as if you had said you were born without a shadow. Then, slowly, she laughs, short and surprised, the first time you have heard it. "Then you won't miss it," she says. "Lucky."

She nods at a folded grey bundle beside her on the well's edge. "There's a surcoat. Off one of ours who won't want it back. The boar's unpicked. Take it. You can be godless in it. It's warm."`,
    ch:[{t:'Take it.', go:()=>startExplore()}]}),
  b3_c3_dannet_dusk4:()=>({sp:'Dannet', fx:()=>{ gain('b3_c3_surcoat'); }, txt:
`"No," she says. "You would, wouldn't you." She paints the wolf's eye, finally, one quick stroke, and sits back to look at it. "That's more than the officers say."

She nods at a folded grey bundle beside her on the well's edge. "There's a surcoat. Off one of ours who won't want it back. The boar's unpicked. The wolf isn't on it yet." She looks at the wolf on her shield, and then at you. "Take it. When I know what the wolves are, I'll tell you. I'd tell you if I did."`,
    ch:[{t:'Take it.', go:()=>startExplore()}]}),
  b3_c3_dannet_dusk_again:()=>({sp:'Dannet', txt:`Dannet is still at the well with the paint. The wolf on her shield has both eyes now. They look, in the lamplight, as if they were watching something a long way off.`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b3_c3_thrall:()=>({sp:'The Thrall', scene:'b3_c3_thrall', fx:()=>{ S.f.b3_c3Thrall = 1; }, txt:
`The Thrall is a great domed hall at the top of the square, with lamps in every window and its doors standing open, and through the doors and all the way down the steps come voices: the Mask Council, the high priests of every temple in Capustan still standing, in session since noon.

You can't hear the words. You don't need to. It is the sound of a room deciding whose fault it was.

A Gidrath at the foot of the steps catches you looking. "Since noon," he says. "They will be at it till morning. Then they will be at it again." He spits, carefully, to one side of the steps and not on them. "We held this hall for them for nine days. The Pannions came up these steps four times. Not one of the masks came out to see who was holding the door."

On the steps above him, in the lamplight, a dozen Barghast sit with white-painted faces and their weapons across their knees, saying nothing, waiting. Not for the council. They are looking through the open doors at the Thrall's floor, as if something were under it.`,
    ch:[{t:'Back down into the square.', go:()=>startExplore()}]}),

  b3_c3_gidrath:()=>({sp:'A Gidrath', fx:()=>{ if (!S.f.b3_c3Granary) S.f.b3_c3Granary = 1; }, txt:
`The Gidrath from the foot of the Thrall's steps comes down into the square when he sees Malazan colours: a gate-soldier, grey at the temples, a crossbow on his back and a dented cap.

"Sergeant." Formal, Capan. "There is a granary in the next Camp, behind the dyers' street. Eight or ten Beklites went into it when the army broke, and barred the doors, and will not come out. We have called to them. They throw things." He looks tired past tiredness. "The granary has the last grain in the Camps in it. If we burn them out, we burn the grain. If we wait, they eat it." A pause. "The Grey Swords are asleep on their feet. The Barghast would burn it to see the fire. You are Malazans. You have done this before."`,
    ch:[{t:'"Show us the granary."', go:'b3_c3_granary_go'},
        {t:'"Not tonight. Find somebody else."', fx:()=>{ S.f.b3_c3Granary = 'no'; }, go:'b3_c3_gidrath_no'},
        {t:'"In a while."', go:()=>startExplore()}]}),
  b3_c3_gidrath_no:()=>({sp:'A Gidrath', fx:()=>{ ally(0, 1, 'The granary in the next Camp, burning'); }, txt:
`He nods, as if he had expected nothing else, and goes back to the steps.

Later in the evening there is a glow over the roofs of the next Camp, and a smell on the wind that it takes you a moment to know, because it is a good smell and does not belong here: bread, burning, a whole granary of it, all at once.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_gidrath_again:()=>({sp:'A Gidrath', txt: S.f.b3_c3Granary === 'won' ? `The Gidrath has a sack of grain on his shoulder, going up the Thrall's steps with it, and does not seem to know he is smiling.` : `The Gidrath is back at the foot of the Thrall's steps, watching the glow over the next Camp. He does not look at you.`, ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c3_granary_go:()=>({sp:'The granary', txt:
`The granary is a round stone tower with a cone of a roof, behind a dyers' street where the gutters still run blue. The doors are oak and barred, and somebody inside has heard you coming and stopped talking.

${b3In('kettle') ? `"No burners," Kettle says, before you can ask. She sounds personally wounded by it. "Not with grain. Grain dust goes up like a Fete." She looks at the doors. "I can do the hinges. Quietly."` : 'No burners. Not with grain. Grain dust goes up like a city.'}`,
    ch:[{t:'Break the doors, and in.', go:()=>startBattle('b3_c3_granary', {})},
        {t:'Call them out first: in Malazan, and then in whatever else the squad has.', check:['wits',15],
          edges:id=>[id === 'sohra' && ['she has traded with Pannion herders', 1], id === 'tuft' && ['a cadre mage\'s ear for tongues', 1]],
          near:{fx:()=>{ const t0 = b3Trust(); ally(-1, 0, 'Yes, but the calling goes on long enough for a pair of white-faced Barghast to drift over from the Thrall\'s steps and watch Malazans bargain with Pannions, and go back to tell the clans');
            if (b3Trust() === t0) { const w = ROLL().who || 'sgt'; S.rattled ??= {}; S.rattled[w] = 1; note(`Yes, but it takes a long time shouting at an oak door, and ${NAME(w)} is hoarse and short-tempered by the end of it: −1 on the next check.`, 'bad'); } }},
          go:'b3_c3_granary_talk', fail:'b3_c3_granary_fail'},
        {t:'"Not yet."', go:()=>startExplore()}]}),
  b3_c3_granary_talk:()=>({sp:'The granary', fx:()=>{ S.f.b3_c3GranaryTalked = 1; ally(0, -1, 'Four Beklites came out of the granary with their hands up'); }, txt:
`${by({sgt:'You call', _:'{who} calls'})} through the doors, slowly, in Malazan and then in trade-talk and then in the handful of Pannion words anyone in the Host has learned on the road, which are mostly about food.

After a long time a bar goes back, and four of them come out, one at a time, with their hands up and their faces grey: boys, two of them, under the helmets. They lie down on the paving when you point at it.

The rest don't come. Through the open door, in the dark, a voice is telling them not to, in a voice that has given orders before.`,
    ch:[{t:'In, then.', go:()=>startBattle('b3_c3_granary', {surprise:'p'})}]}),
  b3_c3_granary_fail:()=>({sp:'The granary', txt:
`${by({sgt:'You call', _:'{who} calls'})} through the doors. The answer is a clay jar, thrown from a slit high in the wall, that bursts on the paving at your feet and turns out to have been full of something that was once lamp oil and is now mostly smell.

Then the doors open from inside, all at once. They have decided to come out after all. Not with their hands up.`,
    ch:[{t:'Hold them.', go:()=>startBattle('b3_c3_granary', {surprise:'e'})}]}),
  b3_c3_after_granary:()=>({sp:'The granary', fx:()=>{ S.f.b3_c3Granary = 'won'; gain('b3_c3_shield'); }, txt:
`The granary is yours, and the grain in it, most of it: enough, the Gidrath says, to feed the Camps for a week if nobody is greedy, and somebody will be.

He comes in with a lamp and stands looking at the sacks for a long time. Then he takes the round shield off his back, a Capan shield, dark red with the city's gold dome on it, and holds it out to you.

"My cousin's," he says. "He held the Thrall's steps with it for nine days. On the ninth he did not need it any more." He puts it into your hands. "He would want it on a door. You are good at doors."`,
    ch:[{t:'Back to the square.', go:()=>startExplore('b3_c3_dusk')}]}),

  b3_c3_well:()=>({sp:'The square\'s well', txt:
`The square's well is deep and cold and, the Gidrath swear, clean: the Pannions never got as far as this square. Somebody has set a dipper on the rim, and a line of people from the Camps is waiting to use it, patiently, in the dusk, the way people in a city queue for water when they have forgotten what it was like not to.`,
    ch:[{t:'Drink, and sleep an hour in the barracks yard.', req:()=>!S.f.b3_c3Rest2, fx:()=>{ S.f.b3_c3Rest2 = 1; b3Rest('The Fourth sleeps an hour in the barracks yard with its back to the wall and the Thrall\'s lamps on the other side of the square. Wounds close, mostly.'); }, go:()=>startExplore()},
        {t:'Drink, and go on.', go:()=>startExplore()}]}),

  b3_c3_tav_dusk:()=>({sp:'Tav', fx:()=>{ S.f.b3_c3TavDusk = 1; c3Loy('brisk', 1); }, txt:
`Tav comes into the square an hour after dark with a Host water detail, a cut along one forearm tied up in somebody's sleeve, singing.

Brisk is across the square before he has finished the verse. She stops a pace short of him. He stops singing.

"Bris."

"You stood in front of things," she says.

"All day." He holds up the arm. "Somebody stood in front of me for a bit. A marine. Not you." He considers her. "I didn't like it."

"Good," says Brisk, and something in her shoulders comes down for the first time since the morning.`,
    ch:[{t:'Leave them to it.', go:()=>startExplore()}]}),

  b3_c3_end:()=>({sp:'Out of the city', txt:
`At the bottom of the square a street runs down to the west postern, and out of it to the field, where the Host's fires are being lit across the ground the Pannion army stood on this morning.${!S.f.b3_c3Barracks ? ' The barracks door is still lit behind you. The healers are still working.' : ''}`,
    ch:[{t:'Back out to the Host\'s lines.', go:'b3_c3_close'},
        {t:'"Not yet."', go:()=>startExplore()}]}),
  b3_c3_close:()=>({sp:'Capustan · night', scene:'b3_c3_walls_night', fx:()=>{ S.f.b3_c3Close = 1; }, txt:
`You go out through the west postern under a sky with no dragon in it. Behind you the Thrall's lamps are still lit. In front of you the Host's fires are spread across the field, and beyond them, west, the Rhivi fires ring a darkness that is the starving, lying in the grass, under guard, more of them than anyone has yet tried to count.

Hurlochel passes you at the postern, riding in. "They say the First Child's taken," he says, reining in. "The one who led them. Taken alive." He shrugs. "Nobody I'd believe saw it. Everybody says they did." He rides on.${b3In('kettle') ? `

"${c3Count()}," says Kettle, at the fire. ${S.f.b3_c3Cusser ? '"Not the same as this morning." She looks at the satchel. "I\'d do it again."' : '"Same as this morning. Nearly."'}` : ''}${b3In('ohl') ? `

Ohl sits with his list on his knee and ${S.f.b3_c3OhlBit ? 'his blistered hand inside his coat, ' : ''}does not write in it. "${b3ListWords().replace(/^./, c => c.toUpperCase())}," he says, when you look. "No more of ours. I'll take that, from a day like this."` : ''}${b3In('tuft') ? `

Tuft is looking west, past the Rhivi fires, toward where a wagon with a lantern on it stood last night. She doesn't say anything. She doesn't have to.` : ''}${b3In('sohra') ? `

Sohra is asleep already, outside the tent, as she always is, with her bow under her hand. In her sleep she is singing, very quietly, the song for the edge of the grass.` : ''}

You count. ${SQUAD().length > 1 ? `All ${numw(SQUAD().length)}.` : 'Just you.'} You count twice.`,
    ch:[{t:'Sleep.', go:()=>chapterEnd(3, S.f.b3_c3_key || 'field')}]}),
});
