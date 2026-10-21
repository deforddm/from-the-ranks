/* ============ Book Three, Chapter 5: South of the Catlin ============ */
/* Across the Catlin into the Pannion Domin: a stripped land, a Beklite rearguard at a ford where the Host's cadre drowns a Pannion mage
   (seen from the bank), a burnt town where the Seer's soldiers drive the last of the starving south, and a night at a dead village's well
   where a man in Kallor's colours tries to set the Fourth Regiment and the Rhivi at each other's throats.
   Key (S.f.b3_c5_key): 'brood' (the Fourth walk the man to Caladan Brood's fire and say it in front of Korlat and Kallor: trust +3, and
   Kallor knows the sergeant now, S.f.b3_kallorEnemy = 1, which Chapter 7 reads) or 'quiet' (settled among soldiers, no names: trust +1,
   and Kallor's whisper keeps working; Chapter 6 takes trust −1 for it).
   The warrens are poisoned from the first step (S.f.b3_domin = 1). New here: Barghast Blood-Iron (a trick, spirit-craft), three items,
   the Deck's Consort reading, two glossary words. Ids carry b3_c5_.
   FOR THE ARTIST (65b), every art name this file uses:
     items  ART['item/b3_c5_knife'] (blood-iron knife), ART['item/b3_c5_chain'] (Pannion chain of office), ART['item/b3_c5_skin'] (Rhivi water-skin)
     figures (FIGX)  b3_c5_kallorman (Kallor's man and his hired swords), b3_c5_villager (the gleaner, the old man, the old woman), b3_c5_mage (the cadre mage);
                     shelf: hurlochel, tav, wj, rhivi, b3_barghast, b3_rhivi_rider, b3_greysword, beklite, seerdomin, b2soldier
     ground (TILEX)  b3_c5_domin, b3_c5_domin_night  (. , # x ~ - F w; the fights also use 'o' deep water, drawn as '~' by c5Water below, and 't' cover)
     backdrops (SCENEX)  b3_c5_catlin, b3_c5_drowned, b3_c5_burnt, b3_c5_camp (Brood's fire at the halt; falls back to Book One's camp drawing) */

const c5Loy = (id, n) => { if (b3In(id)) loy(id, n); };
/* a squadmate's name from a flag that holds an id ('sgt' is the sergeant), or a fallback */
const c5Name = (id, or = 'Someone') => id === 'sgt' || (typeof id === 'string' && TPL[id]) ? NAME(id) : or;
/* Brisk is with the squad; Brisk did not come out of Darujhistan (a Book One import) */
const c5Brisk = () => b3In('brisk');
const c5BriskGone = () => b3Fallen().includes('brisk');
/* the count at the end of a day: everyone walking with the Fourth */
const c5Count = () => SQUAD().filter(id => !(S.dead && S.dead[id])).length;
/* what the squad found at the well, as a list for the telling */
const c5Proof = () => [S.f.b3_c5_ev === 1 && 'the knife with the filing still bright on it', S.f.b3_c5_wit && 'the old woman in the doorway who saw the calf go down', S.f.b3_c5_caught === 'talked' && 'what the man himself said, sitting against the well-head'].filter(Boolean);
const c5ProofWords = () => { const p = c5Proof(); return p.length > 1 ? p.slice(0, -1).join(', ') + ' and ' + p[p.length - 1] : p[0] || 'the dead calf, and nothing else anyone can swear to'; };

/* the river tiles in a fight: 'o' is deep water (nobody wades it, everyone sees across). The ground style may draw only '~', so 'o' borrows it. */
function c5Water(){ ['b3_c5_domin', 'b3_c5_domin_night'].forEach(k => { const f = TILEX[k]; if (typeof f !== 'function' || f.c5o) return;
  const g = (ctx, ch, x, y, T, dark) => f(ctx, ch === 'o' ? '~' : ch, x, y, T, dark); g.c5o = 1; TILEX[k] = g; }); }
/* the Domin from the first step: the warrens are poisoned all the way south (60's burn reads S.f.b3_domin) */
{ const _sc = startChapter; startChapter = function(n){ if (S && S.book === 'moi' && n === 5) { S.f ??= {}; S.f.b3_domin = 1; c5Water(); } return _sc(n); }; }
SCENEX.b3_c5_camp ??= (cv, t) => drawCamp(cv, t, true); // the halt at night: Book One's camp drawing, as 60 does for Pale
{ const _sb = startBattle; startBattle = function(id, opt){ if (S && S.book === 'moi' && /^b3_c5_/.test(id || '')) { S.f.b3_domin = 1; c5Water(); } return _sb(id, opt); }; }

/* ---- Barghast Blood-Iron: an Ilgres shaman's craft, learned at his fire on the south shore. Spirit-craft: the Domin never burns it. ---- */
Object.assign(TRICKS, {
  b3_c5_blood:{name:'Barghast Blood-Iron', ch:5, use:'fight', ab:'t_b3_c5_blood', spirit:true, where:'an Ilgres shaman\'s fire, on the south shore of the Catlin',
    lore:'The Barghast quench their iron in blood cooled in snow, high in the mountains, and the iron remembers the cold. A shaman cannot quench a blade on a Domin road in summer. He can remind one: blood on the edge, and the old words said into the cut, and the iron wakes for as long as a fight lasts.',
    get fx(){ return `Once a fight: the bearer, or a squadmate next to them, wakes their blade. For the rest of the fight their blows do +${1 + lvT()} damage, and +${3 + lvT()} against a K'ell Hunter. Grows with level. Barghast craft: the Domin's poison never touches it.`; }},
});
Object.assign(AB, {
  t_b3_c5_blood:{name:TRICKS.b3_c5_blood.name, trick:'b3_c5_blood', spirit:true, desc:()=>TRICKS.b3_c5_blood.fx,
    tiles:u=>party().filter(p => !p.ally && cheb(u, p) <= 1 && !p.bloodIron),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; t.bloodIron = 1 + lvT(); AUDIO.play('sword'); sparks(t.x, t.y, 14, '#c8d8e8', .5); float(t, 'blood-iron', '#c8d8e8');
      blog(`${u.name} draws a thumb along ${t === u ? 'the edge of their own blade' : `${t.name}'s edge`} and says the Ilgres words into the cut. The iron goes cold as a mountain, and stays cold.`); }},
});
/* blood-iron and the Ilgres knife: the squad's blows land harder (the knife only on its wearer, against Seerdomin and K'ell Hunters) */
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (!(S && S.book === 'moi' && B && a && t && a.side === 'p' && !a.ally && t.side === 'e')) return _attack(a, t, o);
    let add = 0;
    if (a.bloodIron) add += a.bloodIron + (t.kind === 'khell' ? 2 : 0);
    if (TPL[a.id] && Object.values((S.gear || {})[a.id] || {}).includes('b3_c5_knife') && (t.kind === 'seerdomin' || t.kind === 'khell')) add += 2;
    if (!add) return _attack(a, t, o);
    const dd = o.dmg || a.dmg; return _attack(a, t, Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + add]})); }; }
/* the Rhivi water-skin: while the squad carries it, a rest at a fire lowers dread by 1 more */
{ const _rest = b3Rest;
  b3Rest = function(t){ const r = _rest(t);
    if (S && S.book === 'moi' && (S.kit || []).includes('b3_c5_skin') && S.ally && S.ally.dread > 0) { ally(0, -1, 'Sweet water from a Rhivi skin'); save(); }
    return r; }; }

/* the words this chapter adds to Book Three's glossary */
GLOSSX.moi.push(
  [5, 'The race for Coral', 'Whoever holds a city when it falls has the say of what becomes of it. Brood\'s people fear the Host means to reach Coral first and keep it for the Empress. Brood\'s second says so loudest.', ()=>!!(S.f && (S.f.b3_c5_race || S.f.b3_c5_key))],
  [5, 'Blood-iron', 'Barghast iron, quenched in blood cooled with snow in the mountains. Their shamans say the iron remembers the cold, and can be reminded of it.', ()=>!!(S.f && (S.f.b3_c5_bloodTried || (S.tricks && S.tricks.b3_c5_blood)))]);

/* ---- the Deck at the first halt: the Consort, House of Chains ---- */
B3DECK[5] = {scene:'b3_c5_catlin', where:'the flat of a cart-wheel that came off in the ford', set:'Noon on the south shore of the Catlin, the mud drying grey on everyone\'s boots and the stubble going on south to the edge of sight.',
  back:()=>startExplore(), backT:'Back to the shore.',
  say:{tuft:`"Over the river," she says, "and the warren goes oily, and nobody's planted anything since last year." She cuts the Deck on her knee. "I want to know what's sitting in this country, Sergeant. Before it sits on us."`,
    sohra:`"South of the river the grass is dead," she says. "The bones do not like dead grass. They will talk anyway." She shakes them in her fist, hard, as if waking them. "Sit upwind."`,
    benna:`"Crossed the river with you lot, didn't I," she says. "Washing don't dry in this country. Nothing grows. Sit down. Copper first; the Deck's been sulking since the ford."`}};

const B3CH5 = {
  title:'South of the Catlin', number:'Five',
  intro:{loc:'South of the Catlin', sub:'The Pannion Domin · the road south', scene:'b3_c5_catlin', cap:'The broken bridge on the trader road, and below it a mile of brown ford churned to mud by two armies.',
    paras:[
`The bridge on the trader road is gone, which everyone knew, and the ford below it is a mile of brown water that the river has not finished making up its mind about. The two armies take three days to cross. Wagons go in to the axles and come out without wheels. The bhederin go across lowing in a long dark line with Rhivi children on their backs, and do it better than anyone.`,
`On the south shore the grass stops. Not all at once. It stops the way a ledger stops when the money runs out: the fields were cut green, before the grain had headed, and carried off, and then somebody came back for the stubble with rakes. The villages along the road have their doors open and nobody behind them. This is the Pannion Domin. The Seer's priests went through it ahead of the army, and took the seed grain, and took the people.`,
`You are Sergeant {sgt}, Fourth Squad, Seventh Company, Onearm's Host, and the warrens have gone bad under your feet, and somewhere at the far end of all this is Coral, and the Seer, and nobody in the Host has seen either.`],
    go:'Across', node:'b3_c5_start'},

  areas:[
    /* 16 x 12.  . dead earth  , stubble  # ruin wall  x dead tree  ~ the Catlin (blocks)  - the ford they came over  > the road south-east */
    { id:'b3_c5_shore', title:'The south shore of the Catlin', sub:'Morning · the Domin begins', hint:'Tap ground to move · tap a figure to talk · the road goes on east', decor:'b3_c5_domin', amb:'plain',
      map:[ "#~~~~~~--~~~~~~#",
            "#~~~~~~--~~~~~~#",
            "#,..,.......,..#",
            "#..x...,....x..#",
            "#.,....#.,.....#",
            "#..,..##...,...>",
            "#......,..,....>",
            "#.x.,......#.,.#",
            "#....,...,.##..#",
            "#.,...x.......,#",
            "#..,....,..x...#",
            "################" ],
      walk:'.,-', triggers:{'>':'b3_c5_to_ford'}, start:{x:8, y:2},
      quest:()=> !S.f.b3_c5_hurl ? 'An outrider is walking his horse down the column. Outriders never do that for nothing.' : !S.f.b3_c5_bloodTried && !S.f.b3_c5_glean ? 'The shore, before the road. The road goes on east.' : 'The road south-east, two days to the next river.',
      npcs:[
        {id:'hurl', name:'Hurlochel', kind:'hurlochel', x:12, y:4, node:()=>S.f.b3_c5_hurl ? 'b3_c5_hurl_again' : 'b3_c5_hurl', fresh:()=>!S.f.b3_c5_hurl},
        {id:'qm5', name:'The quartermaster', kind:'b2soldier', x:3, y:8, node:()=>'b3_c5_qm', fresh:()=>!S.f.b3_c5_qm},
        {id:'glean', name:'A woman in the stubble', kind:'b3_c5_villager', x:5, y:9, node:()=>'b3_c5_glean', show:()=>!S.f.b3_c5_glean || S.f.b3_c5_glean === 'left' || /^b3_c5_glean/.test(S.node || ''), fresh:()=>!S.f.b3_c5_glean},
        {id:'shaman', name:'An Ilgres shaman', kind:'b3_barghast', x:10, y:7, node:()=>S.f.b3_c5_bloodTried ? 'b3_c5_shaman_again' : 'b3_c5_shaman', fresh:()=>!S.f.b3_c5_bloodTried} ] },

    /* 16 x 12.  . dead earth  , stubble  # ruin wall  x dead tree  ~ deep river (blocks)  - the ford (the fight, then the way on) */
    { id:'b3_c5_ford', title:'The Domin · a ford two days south', sub:'Noon · a rearguard on the far bank', hint:'Tap ground to move · tap a figure to talk · the ford is the gravel across the river', decor:'b3_c5_domin', amb:'wind',
      map:[ "################",
            "#.....x...,..x.#",
            "#.,......,.....#",
            "#...,.#....,...#",
            "#,.........,..,#",
            "#..,.....,.....#",
            "#~~~~~----~~~~~#",
            "#~~~~~~--~~~~~~#",
            "#~~~~~~~~~~~~~~#",
            "#,..,..x...,..,#",
            "#..#....,...#..#",
            "################" ],
      walk:'.,', triggers:{'-':'b3_c5_ford'}, start:{x:7, y:2},
      quest:()=> S.f.b3_c5_fordDone ? 'The ford is the Host\'s. Across, and south.' : !S.f.b3_c5_capt ? 'The Seventh\'s lieutenant is on the bank with the cadre, pointing.' : 'The ford. Beklites behind an earthwork on the far bank.',
      npcs:[
        {id:'capt5', name:'The lieutenant', kind:'b2soldier', x:4, y:4, node:()=>S.f.b3_c5_fordDone ? 'b3_c5_capt_again' : 'b3_c5_capt', fresh:()=>!S.f.b3_c5_capt},
        {id:'mage5', name:'A cadre mage', kind:'b3_c5_mage', x:11, y:5, node:()=>S.f.b3_c5_fordDone ? 'b3_c5_drowned' : 'b3_c5_mage', fresh:()=>!S.f.b3_c5_mage || (!!S.f.b3_c5_fordDone && !S.f.b3_c5_drowned)},
        {id:'rider5', name:'A Rhivi rider', kind:'b3_rhivi_rider', x:13, y:2, node:()=>'b3_c5_rider', show:()=>!S.f.b3_c5_fordDone, fresh:()=>S.f.b3_c5_asked == null} ] },

    /* 16 x 12.  . dead earth  , stubble  # ruin wall  F smoulder (blocks)  x dead tree  w the square's well  > the road on */
    { id:'b3_c5_town', title:'The Domin · a burnt town', sub:'Rain · the Seer\'s people burned it themselves', hint:'Tap ground to move · tap a figure to talk · the square is round the well', decor:'b3_c5_domin', amb:'storm',
      map:[ "################",
            "#..##..,.##F,..#",
            "#..#F...,.#....#",
            "#,.......,...,.#",
            "##.##..,...##..#",
            "#....,..w.....,>",
            "#.,..........,.>",
            "##..##.,..#F#..#",
            "#F..#...,..#...#",
            "#..,..x.....,..#",
            "#.,..#...,..x..#",
            "################" ],
      walk:'.,', triggers:{w:'b3_c5_square', '>':'b3_c5_to_well'}, start:{x:2, y:6},
      quest:()=> S.f.b3_c5_townDone ? 'South again. The column halts at dusk, somewhere with a well.' : 'The square, round the well. The Seer\'s soldiers have the last of the town\'s people there.',
      npcs:[
        {id:'oldman', name:'An old man in a doorway', kind:'b3_c5_villager', x:13, y:2, node:()=>'b3_c5_oldman', fresh:()=>!S.f.b3_c5_oldman},
        {id:'gs5', name:'A Grey Sword trooper', kind:'b3_greysword', x:3, y:9, node:()=>S.f.b3_c5_townDone ? 'b3_c5_gs_again' : 'b3_c5_gs', fresh:()=>S.f.b3_c5_gs == null} ] },

    /* 16 x 12.  . dead earth  , stubble  # ruin wall  x dead tree  w the village well  F the Fourth's fire */
    { id:'b3_c5_well', title:'The Domin · a dead village', sub:'Night · the halt · one well', hint:'Tap ground to move · tap a figure to talk · the well is on the green, the Fourth\'s fire by the wall', decor:'b3_c5_domin_night', amb:'night', dark:true,
      map:[ "################",
            "#.,..x.....,.x.#",
            "#..##....,.....#",
            "#..#..,....##..#",
            "#,......,......#",
            "#....,.w...,...#",
            "#.,.........,..#",
            "#..x...,....#..#",
            "#.,...F...,.##.#",
            "#....,.....,...#",
            "#.x.,....,...x.#",
            "################" ],
      walk:'.,', triggers:{w:'b3_c5_well', F:'b3_c5_fire'}, start:{x:7, y:9},
      quest:()=> S.f.b3_c5_key ? 'The fire, when you are ready to sleep. Coral is south.' : S.f.b3_c5_caught ? 'The man in the fur collar sits bound by the well. What happens to him is yours.' : S.f.b3_c5_inc ? 'Somebody put a dead calf down that well. Find out who.' : 'Two lines at one well: the Fourth Regiment\'s water detail and the Rhivi herd.',
      npcs:[
        {id:'tav5', name:'Tav', kind:'tav', x:5, y:4, node:()=>'b3_c5_tav', fresh:()=>!S.f.b3_c5_tav},
        {id:'wj5', name:'Whiskeyjack', kind:'wj', x:13, y:6, node:()=>'b3_c5_wj', show:()=>S.f.b3_c5_key !== 'brood' || !!S.f.b3_c5_broodBack || /^b3_c5_brood/.test(S.node || ''), fresh:()=>!S.f.b3_c5_wj},
        {id:'herd5', name:'A Rhivi herd-mother', kind:'rhivi', x:9, y:4, node:()=>'b3_c5_herd', fresh:()=>!S.f.b3_c5_herd || (!!S.f.b3_c5_key && !S.f.b3_c5_skin)},
        {id:'kman5', name:'A man in a fur collar', kind:'b3_c5_kallorman', x:14, y:2, node:()=>S.f.b3_c5_inc ? 'b3_c5_confront' : 'b3_c5_kman', show:()=>!S.f.b3_c5_caught, fresh:()=>!S.f.b3_c5_kmanMet || (!!S.f.b3_c5_inc && !S.f.b3_c5_caught)},
        {id:'witness5', name:'An old woman in a doorway', kind:'b3_c5_villager', x:2, y:6, node:()=>'b3_c5_witness', show:()=>!!S.f.b3_c5_inc, fresh:()=>!!S.f.b3_c5_inc && !S.f.b3_c5_wit && !S.f.b3_c5_caught} ] } ],

  battles:{
    /* the ford: a Beklite rearguard in the water and on the gravel, and behind it the far bank, where the cadre drowns their mage */
    b3_c5_ford:{title:'The ford', style:'b3_c5_domin', pitTxt:'the river', warrenText:'A ford at noon · the Domin\'s poison in every warren', warren:{denul:1, meanas:1}, music:'battle', hurtMost:true,
      map:[".t....t.","........","o------o","o------o","oo----oo","o------o","........","..t..t..","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c5_spear',2,3],['b3_c5_spear',5,3],['b3_c5_spear',4,4],['b3_c5_file',3,2],['b3_c5_sling',4,0],['b3_c5_sling',2,0]], xp:170, after:'b3_c5_after_ford',
      /* the Rhivi come up the shallows behind the spears if they were asked, and trust the Fourth enough */
      get aid(){ return {kind:'b3_rhivi_rider', at:[0, 9], need:(typeof S !== 'undefined' && S && S.f && S.f.b3_c5_asked === 1) ? 7 : 9}; },
      waves:[{round:3, foes:[['b3_c5_spear',6,1]], text:'One more spearman comes down off the earthwork into the water, as if he had been waiting his turn.'}],
      preText:()=>`Kettle's sharper goes into the river just short of their line, and the river comes up out of its bed in a brown wall full of gravel and lands on them. The ones in the water go down. The ones on the bank get up wet, and looking at Kettle.`,
      preFx:B => { foes().filter(f => f.y >= 2 && f.y <= 5).forEach(f => { f.stun = true; float(f, 'knocked flat', '#cfc8b8'); }); },
      stage2:{title:'The far bank', xp:100,
        text:()=>`The Beklites on the gravel do not break and do not run. They go back step by step into the deeper water, still facing you, and die there, and the far bank is ten paces off.

On it, behind the earthwork, a man in grey has climbed up onto a cart and lifted both his hands, and the air over the river has started to go wrong: cold, and grey, and thick, like the light before hail.

Behind you, on the near bank, the cadre mage with the wet sleeves stands up.

You don't see her do anything. You see the man on the cart stop. He puts a hand to his throat. He opens his mouth and water comes out of it, brown river water, a great deal more than a man could hold, and he goes down off the cart onto his knees in the dust and keeps on bringing it up, and then he doesn't.

The grey goes out of the air. A voice on the far bank shouts an order, and the Seerdomin who stood round the cart come down to the water's edge to meet you, maces up, because there is nothing else left for them to do.${b3In('ohl') ? `

Ohl, beside you in the river, says something in Ehrlii that is not a prayer, and then something that is.` : ''}`,
        map:["#.t..t.#","........","..#..#..","........",".t....t.","........","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_seerdomin',3,1],['b3_seerdomin',4,2],['b3_seerdomin',5,1],['b3_c5_spear',6,3],['b3_c5_sling',6,0]],
        waves:[{round:2, foes:[['b3_c5_spear',0,4]], text:'A last spearman comes round the end of the earthwork, alone, and does not hurry.'}]} },

    /* the burnt town: the Seer's drivers in the street, then the square, where a Seerdomin stands on the temple steps */
    b3_c5_town:{title:'The burnt town', style:'b3_c5_domin', warrenText:'Rain on ash · the Domin\'s poison in every warren', warren:{denul:1, meanas:1}, music:'battle',
      map:["#..##..#","........","..#..#..","........","#.t..t.#","........","........",".#....#.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c5_driver',2,1],['b3_c5_driver',5,1],['b3_c5_driver',3,2],['b3_beklite',4,3],['b3_c5_sling',6,0]], xp:150, after:'b3_c5_after_town',
      /* a Grey Sword patrol is in the next street: they come when they hear it, if the Fourth asked, and trust is high enough */
      get aid(){ return {kind:'b3_greysword', at:[7, 9], need:(typeof S !== 'undefined' && S && S.f && S.f.b3_c5_gs === 1) ? 7 : 9}; },
      waves:[{round:2, foes:[['b3_c5_driver',0,3],['b3_c5_driver',7,3]], text:'Two more come out of burnt doorways on either side of the street, each with a whip in one hand and a spear in the other.'}],
      stage2:{title:'The square', xp:90,
        text:()=>`The street is clear. The square opens out beyond it, round a well with a broken windlass, and in the middle of the square, in the mud, in the rain, the town's last people sit roped together in a long line and do not look up.

On the steps of what was a temple a Seerdomin stands with a grey mace in one hand and a chain of office round his neck, watching you come, as if he had expected you for some time and was disappointed in how long you took.${b3In('greysword') ? `

Dannet says one word in Elin, under her breath, and puts her shield up.` : ''}${b3In('kettle') ? ` Kettle's hand goes to the satchel and comes away again empty. "Not with them in the middle of it," she says. "Don't ask me."` : ''}`,
        map:["##.tt.##","........","#......#","........","..t..t..","........","#......#","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c5_priest',3,1],['b3_beklite',1,2],['b3_beklite',6,2],['b3_c5_driver',4,2],['b3_c5_sling',2,0],['b3_c5_sling',5,0]],
        waves:[{round:3, foes:[['b3_c5_driver',0,4],['b3_c5_driver',7,4]], text:'Two drivers come back into the square from the south road, where they had been taking the first of the line, and drop the rope they were holding.'}]} },

    /* the well, at night: the man in the fur collar and his hired swords, when talk fails */
    b3_c5_wellfight:{title:'The well', style:'b3_c5_domin_night', dark:true, warrenText:'Night at a dead village · the Domin\'s poison in every warren', warren:{denul:1, meanas:1}, music:'battle',
      map:["#......#","..t.....","........","...tt...","........","#......#","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c5_kman',3,1],['b3_c5_ksword',1,2],['b3_c5_ksword',6,2]], xp:80, after:'b3_c5_after_wellfight',
      waves:[{round:2, foes:[['b3_c5_ksword',7,4],['b3_c5_ksword',0,4]], text:'Two more of his hired swords come over the broken wall, late, one still buckling his belt.'}]} },

  foes:{
    /* the rearguard: Beklites, the Seer's line infantry, who hold until the column behind them is gone */
    b3_c5_spear:{name:'Beklite spearman', sig:'B', kind:'beklite', hp:18, ac:14, atk:5, dmg:[1,8,2], rng:1, mv:4, init:1, sk:['reach'], verb:'drives a spear at'},
    b3_c5_sling:{name:'Beklite slinger', sig:'s', kind:'beklite', hp:12, ac:12, atk:5, dmg:[1,6,2], rng:5, mv:4, init:2, sk:['pin'], verb:'slings a stone at'},
    b3_c5_file:{name:'Beklite file-leader', sig:'F', kind:'beklite', hp:32, ac:15, atk:6, dmg:[1,10,3], rng:1, mv:4, init:2, sk:['parry'], verb:'cuts at'},
    /* the drivers in the burnt town, and the Seerdomin who keeps them */
    b3_c5_driver:{name:'Pannion driver', sig:'d', kind:'beklite', hp:17, ac:13, atk:5, dmg:[1,8,2], rng:1, mv:4, init:1, sk:['shove'], verb:'lays a whip-handle across'},
    b3_c5_priest:{name:'The Seerdomin on the steps', sig:'Σ', kind:'seerdomin', hp:46, ac:16, atk:6, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['daze','parry'], verb:'brings the grey mace down on'},
    /* Kallor's man at the well, and the men he pays */
    b3_c5_kman:{name:'The man in the fur collar', sig:'K', kind:'b3_c5_kallorman', hp:32, ac:15, atk:6, dmg:[1,8,3], rng:1, mv:4, init:3, sk:['parry'], verb:'cuts at'},
    b3_c5_ksword:{name:'Hired sword', sig:'h', kind:'b3_c5_kallorman', hp:20, ac:13, atk:5, dmg:[1,8,3], rng:1, mv:4, init:2, verb:'swings at'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b3_c5_knife:{name:'Blood-iron knife', slot:'trinket', who:null, atk:1, line:'An Ilgres shaman\'s long knife, darker than iron ought to be, with a rime along the fuller that does not melt in the Domin\'s heat. It has had a Malazan\'s blood and wants nobody else\'s. Whoever wears it strikes Seerdomin and K\'ell Hunters for 2 more.'},
    b3_c5_chain:{name:'A Pannion chain of office', slot:'trinket', who:null, stat:{guile:1}, line:'Grey iron links and a disc of bone carved with an open eye, taken off a dead Seerdomin on a temple step in a burnt town. People from the Domin look at whoever wears it differently. The Fourth would rather not know how differently.'},
    b3_c5_skin:{name:'A Rhivi water-skin', slot:'trinket', who:null, hp:2, line:'A bhederin-bladder skin stitched with sinew and hung with one bone bead, from a herd-mother at a well in the Domin. Water kept in it stays sweet. While the squad carries it, a rest at a fire lowers dread by 1 more.'} },

  scenes:{
    b3_c5_catlin:{loc:'The Catlin', sub:'The south shore', cap:'The broken bridge on the trader road, its middle span gone, and below it a mile of brown ford churned to mud by two armies.', amb:'plain'},
    b3_c5_drowned:{loc:'The Domin', sub:'The far bank of a ford', cap:'A far riverbank under a hard sky, a cart, and a man on his knees beside it in a dark wet circle where nothing else is wet.', amb:'wind'},
    b3_c5_burnt:{loc:'The Domin', sub:'A burnt town · rain', cap:'Black walls without roofs, smoke going up into the rain, and a square round a well where nobody is left to draw water.', amb:'storm'},
    b3_c5_camp:{loc:'The Domin', sub:'The halt at night · Caladan Brood\'s fire', cap:'A great many small fires across a dead village, and one big one with very few people round it.', amb:'camp_night'} },

  end:{
    brood:['Brood heard it', 'South of the Catlin a man in Kallor\'s colours put a dead calf down a well and told the Fourth Regiment and the Rhivi two halves of one lie. The Fourth caught him and walked him to Caladan Brood\'s fire, and said it in order in front of Korlat, and in front of Kallor, who listened without interest. Brood\'s people trust the Fourth further now. Kallor knows the sergeant\'s face, and has decided something about it.'],
    quiet:['Among soldiers', 'South of the Catlin a man in Kallor\'s colours put a dead calf down a well and told the Fourth Regiment and the Rhivi two halves of one lie. The Fourth caught him, broke his nose and sent him back to his own lines with no names said aloud, and the well was shared by midnight. In Brood\'s camp they are still saying the Malazans mean to keep Coral for the Empress. Where it started is anyone\'s guess.'] },
  endScene:'b3_c5_camp',
  endCap:()=> S.f.b3_c5_key === 'brood' ? 'A dead village in the Domin, after midnight. Across the halt Caladan Brood sits by his fire with the hammer across his knees, and does not sleep, and does not look toward Kallor\'s tents.' : 'A dead village in the Domin, after midnight. The bhederin drink from a trough knocked together out of a cart-bed, and Tav sings to them, badly, and nobody stops him.',
  tease:'Next: the road to the Maurik, and the quorls that come down at dusk and are gone by morning, more of them every night.',

  extras:()=>{ const f = S.f, x = [];
    x.push(`The Fourth crossed the Catlin into the Domin and walked a week of it. Trust ${b3Trust()} of ${ALLY_MAX}, dread ${b3Dread()}${b3Mind() ? `: ${b3Mind()}` : ''}.`);
    if (f.b3_c5_key === 'brood') x.push(`The man in the fur collar was walked to Caladan Brood's fire. Kallor called him a fool and left him there. Kallor looked at the sergeant once, on his way out of the light.`);
    if (f.b3_c5_key === 'quiet') x.push(`The man in the fur collar went back to his own lines with a broken nose and no names said. The well was shared by midnight. The story about Coral was not stopped.`);
    if (f.b3_c5_inc === 'cut') x.push(`Blood at the well before it stopped: a Rhivi herdsman's arm, a Fourth Regiment man's face, and Tav's palm, which he says is nothing.`);
    if (f.b3_c5_inc === 'calm') x.push(`The well saw no blood. The knives went down before they went in.`);
    if (f.b3_c5_drowned || f.b3_c5_fordDone) x.push('A cadre mage drowned a Pannion mage at a ford, from a hundred paces off, with water from the river. The Fourth saw him on his knees on the far bank.');
    if (f.b3_c5_orley) x.push(`${b3In('ohl') ? 'Ohl wrote' : 'The sergeant wrote'} a name at the ford: Orley, the Seventh, nineteen. The list is ${b3ListWords()} now.`);
    if (f.b3_c5_remnants === 'fed') x.push('The Fourth gave the starving in the burnt town what it was carrying, and sent them north toward the Grey Swords.');
    if (f.b3_c5_remnants === 'north') x.push('The Fourth cut the starving loose in the burnt town and pointed them north, and kept its rations.');
    if (f.b3_c5_glean === 'fed') x.push('A woman gleaning single grains in the stubble on the south shore has a day of the Host\'s hardtack in her skirt.');
    if (f.b3_c5_glean === 'north') x.push('A woman gleaning in the stubble walked north to find the Grey Swords, on Dannet\'s word.');
    if (f.b3_c5_blood) x.push(`${c5Name(f.b3_c5_blood)} held an Ilgres shaman's knife while he said the blood-iron words, and did not let go.`);
    if (f.b3_c5_leg) x.push('Whiskeyjack says Mallet can have his week after Coral. Not before.');
    if (f.b3_c5_quorls) x.push('Kettle counts the quorls at dusk and again at dawn, and the numbers do not agree. It is in the ledger.');
    if (preUsed('b3_c5_ford')) x.push('Kettle put a sharper in a river and the river got up and landed on a Beklite line. She wants it noted that this was a first.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b3_c5_key === 'brood' && `The Fourth took Kallor's man to Brood and Korlat. Kallor called him a fool and disowned him. Kallor knows the sergeant now.`,
    f.b3_c5_key === 'quiet' && `The Fourth settled the well among soldiers: Kallor's man went home with a broken nose and no names. The story about Coral goes on.`,
    f.b3_c5_caught && `A man in Kallor's colours put a dead calf down the well at the halt and told each line the other meant to take the water.`,
    f.b3_c5_townDone && `A burnt town in the rain. The Seer's soldiers were driving the last of its people south ahead of the army. The Fourth cut them loose.`,
    f.b3_c5_fordDone && `A Beklite rearguard held a ford two days south of the Catlin, and died there. A cadre mage drowned their mage from the near bank.`,
    f.b3_c5_race && `Hurlochel: Brood's camp says the Host means to take Coral first and keep it for the Empress. Kallor says it loudest.`,
    f.b3_c5_mhybe && `The Mhybe has gone back north to Capustan in a wagon, with the two Daru, to find a temple that can ease her. Her daughter stayed with the army.`,
    `The Fourth crossed the Catlin into the Pannion Domin. The fields are stripped, the villages empty, and the warrens poisoned.`].filter(Boolean); },

  dlg:{
    /* ---- the south shore ---- */
    b3_c5_start:()=>({sp:'The south shore', scene:'b3_c5_catlin', html:allyHTML('South of the Catlin · the Domin begins'), fx:()=>{ S.f.b3_domin = 1; S.f.b3_kallor = 1; S.f.b3_c5_started = 1; ally(0, 1, 'The Domin'); }, txt:
`The Fourth comes up out of the ford on the third morning with the Catlin to its knees, and then to its shins, and then at last only in its boots, where it means to stay for a week.

The south shore is a field. It was a field. The barley was cut green, before it had headed, and every sheaf carried away, and then someone came back for the stubble with rakes. There are no birds on it. There is nothing on it for a bird.

${c5Brisk() ? `Brisk has the ration sacks open on a cart-tail before anyone has asked her, counting. "Twelve days, the Host's issue. Forage, nothing." She ties the neck off. "I've written *nothing*. First time I've had to."` : `The ration count is yours today. Twelve days, the Host's issue. Forage: nothing. You write it down, and look at the word for a while.`}

${b3In('greysword') ? `Dannet stands at the edge of the stubble and looks south as if she could see the whole road from here. "This is the Domin," she says. "From here it is all like this."` : `South, the stubble goes on to the edge of sight, and past it, by every account, the Domin goes on the same.`}${b3In('ohl') ? `

Ohl has taken his hand out of his satchel and is looking at it.` : ''}${b3In('ellis') ? `

Ellis has been a little way out into the stubble and back. "Rakes," she says. "Not a dog, not a goat. Just rakes." She shows you the width of the rake-marks with two fingers of the gloved hand. "Somebody did every row on purpose."` : ''}${b3In('vell') ? `

Vell looks along the shore, out of habit, for anything taller than his knee, and finds nothing. "Pale had walls," he says, to nobody much.` : ''}`,
      ch:c5StartCh()}),
    b3_c5_start_ohl:()=>({sp:'Ohl', scene:'b3_c5_catlin', fx:()=>{ S.f.b3_c5_askOhl = 1; }, txt:
`"Nothing." He flexes the fingers. "I reached for Denul. A blister on a carter's hand. Nothing; a thing I could do asleep." He turns the hand over. "It came. It came with something in it. Like drawing water and finding the bucket warm."

He wipes the hand on his coat, slowly, though there is nothing on it. "The healers in Brood's camp said the warrens go bad in the Pannion lands. I heard them. I wrote it down." A breath. "Well. I've crossed a river into it, child. That's all. I'll go careful. Hood's listening down here. I can feel him leaning in."

${b3In('tuft') ? `Tuft, beside him, has her hands up her sleeves. "Meanas too," she says. "It's oily. It doesn't want to be touched." She doesn't take her hands out.` : `The rest of the Fourth has no warren to reach for, and is spared hearing one go wrong.`}`,
      ch:c5StartCh()}),
    b3_c5_start_sohra:()=>({sp:'Sohra', scene:'b3_c5_catlin', fx:()=>{ S.f.b3_c5_askSohra = 1; S.f.b3_c5_mhybe = 1; }, txt:
`Sohra is sitting on her heels at the edge of the stubble with her bow across her knees, not singing. It takes a moment to see what is wrong with the picture. Sohra is always singing.

"The Mhybe is not on this side of the river," she says, before you can ask. "The two Daru took her back to the city. In a wagon, with blankets. They say there is a temple in Capustan that can ease her." She says *ease* the way ${c5Brisk() ? 'Brisk' : 'a quartermaster'} says *a week*. "At Pale she could still sit a horse, Sergeant. She cannot lift a cup now."

She looks across the column to where Brood's people are still coming up out of the ford, and somewhere among them a girl walks on her own, straight-backed, at a distance from everyone. "Her daughter did not go with her. Her daughter is angry. The bones will not tell me with whom."

${b3In('tuft') ? `Tuft has come up behind her without a sound and is looking the same way, at the same girl. After a while Sohra moves over on the hide so that there is room for two.` : `You leave her to it. Some watches are kept alone.`}`,
      ch:[{t:'Sit with her a while.', req:()=>!S.f.b3_c5_satSohra, fx:()=>{ S.f.b3_c5_satSohra = 1; c5Loy('sohra', 1); }, go:'b3_c5_start_sohra2'}, ...c5StartCh()]}),
    b3_c5_start_sohra2:()=>({sp:'Sohra', scene:'b3_c5_catlin', txt:
`You sit. Sohra doesn't talk, which with Sohra is unheard of.

Then, very low, almost under her breath, she starts to sing: not a herd-song, nothing for the bulls, something with a lot of room in it. The Rhivi words are too quick to follow. One of them, you think, is the Mhybe's name.

When she stops she wipes her face with the back of her wrist, quickly, as if a fly had been there. "Herd-mother," she says to you, in Rhivi, and then, in Malazan, "Don't tell anyone I said that. They'll think I've gone soft on the loud people."`,
      ch:c5StartCh()}),
    b3_c5_start_dannet:()=>({sp:'Dannet', scene:'b3_c5_catlin', fx:()=>{ S.f.b3_c5_askDannet = 1; S.f.b3_c5_wells = 1; }, txt:
`"To the Maurik at least," she says. "Further. I never went further." She sets the shield rim-down in the stubble and leans on it. "The Seer's priests came through the villages last year and took the seed grain. Not the harvest. The seed. Do you understand? The people here were never meant to plant again. They were told the Seer would feed them." A pause. "Then they were told where the food was."

She doesn't say where. She was on Capustan's wall when the Tenescowri came over it.

"The ones who could walk are the Tenescowri now. The ones who couldn't are still here, some of them. Mostly not." She picks the shield up. "I'll take you by the wells I know. Half of them will be fouled. I'll know which half when I smell them."`,
      ch:c5StartCh()}),
    b3_c5_deck:()=>b3DeckOffer(5),
    b3_c5_card:()=>b3DeckCard(5),

    /* Hurlochel, the Host's outrider: the race for Coral, and who is telling it */
    b3_c5_hurl:()=>({sp:'Hurlochel · outrider', fx:()=>{ S.f.b3_c5_hurl = 1; S.f.b3_kallor = 1; }, txt:
`A rider is walking his horse down the column toward you, which outriders never do unless they want something or have something. Hurlochel is one of the Host's outriders, Dujek's own, and sits a horse like a man who has never let rank come between him and a good one.${b3In('ellis') ? ` Ellis looks at the horse first, as she always does, and then at its feet. New shoes. Somebody in the Host still has a farrier.` : ''}

"Seventh Company. The Fourth." He doesn't ask; he knows. "You'll want this before it reaches you sideways. Brood's camp has a story going round it. The Host means to march hard for Coral, they say, and take it before Brood's people get there, and hold it for the Empress." He makes a face at nothing in particular. "Brood's people believe about half of it. The half they believe is growing."

"Who's telling it?"

"Everyone, by now. Who started it?" He looks up the column, past the Rhivi, to where a tall figure in a fur-collared cloak sits a big horse beside Caladan Brood's standard and does not appear to look at anything. "Kallor says it loudest. Brood's second. He says it as though it bores him, and he says it often."`,
      ch:[{t:'"Is it true?"', go:'b3_c5_hurl_coral'}, {t:'"Thank you."'}]}),
    b3_c5_hurl_coral:()=>({sp:'Hurlochel', fx:()=>{ S.f.b3_c5_race = 1; }, txt:
`Hurlochel looks at you for a moment the way he would look at a ford.

"Dujek says nothing. Dujek's very good at saying nothing; he's had the practice. Whiskeyjack says the Host is here for the Seer, and that's all he says, and he says it to Brood's face." He gathers the reins. "There's a race for Coral whether anyone runs it or not, Sergeant. Whoever holds a city when it falls gets the say of what happens to it. Brood knows that. The Empress knows it, wherever she is. And Kallor knows Brood knows it, and keeps reminding him."

He turns the horse. "Watch your wells. There's going to be a fight about water before we're a week south, and I'd as soon it wasn't us."`,
      ch:[{t:'Let him go.'}]}),
    b3_c5_hurl_again:()=>({sp:'Hurlochel', txt:
`He's further up the column now, sitting his horse on a rise, watching the Rhivi herds cross the dead fields with the face of a man counting something he would rather not. He lifts a hand to you without turning his head.${S.f.b3_c5_race ? '' : `

"Watch your wells," he calls. That's all.`}`,
      ch:[{t:'Leave him to his count.'}]}),

    /* the Seventh's quartermaster: no forage, and everything for sale */
    b3_c5_qm:()=>({sp:'The quartermaster-sergeant', fx:()=>{ S.f.b3_c5_qm = 1; }, again:()=>`The tailboard, the slate, the insult. You have ${S.silver} silver.`, txt:
`The Seventh's quartermaster-sergeant has set up shop on the tailboard of a wagon that came through the ford without its back wheels, which he takes as a personal insult. He is selling. In the Host this spring everything is sold.

"Forage?" He laughs, once. "There's no forage. They took the seed grain, Sergeant. You know what that means? It means nobody's coming back to plant it. It means they knew we were coming and they made the ground say so." He slaps a crate. "No paymaster this side of the proclamations, so it's silver or nothing. Salves, five. Moranth sharpers, eight. Don't ask me for a cusser. Don't ask me why."`,
      ch:[{t:'A salve. Five silver.', tag:'5 silver', req:()=>S.silver >= 5, fx:()=>{ S.silver -= 5; S.inv.salve = (S.inv.salve || 0) + 1; AUDIO.play('coin'); note('A salve, for five silver.', 'good'); }, go:'b3_c5_qm'},
          {t:'A sharper. Eight silver.', tag:'8 silver', req:()=>S.silver >= 8, fx:()=>{ S.silver -= 8; S.inv.sharper = (S.inv.sharper || 0) + 1; AUDIO.play('coin'); note(b3In('kettle') ? 'A sharper, for eight silver. Kettle counts it twice.' : 'A sharper, for eight silver.', 'good'); }, go:'b3_c5_qm'},
          {t:'Leave him to his wheels.'}]}),

    /* a woman gleaning single grains in the stubble */
    b3_c5_glean:()=> S.f.b3_c5_glean === 'left' ? {sp:'A woman in the stubble', txt:
`She is still there on her knees, a long way from anyone, picking up one grain and then, after a long look, one more. The fold of her skirt holds no more than it did.`,
      ch:[{t:'Give her a day of the squad\'s rations after all.', fx:()=>{ S.f.b3_c5_glean = 'fed'; ally(0, -1, 'Bread in a gleaner\'s skirt'); c5Loy('ohl', 1); }, go:'b3_c5_glean_fed'}, {t:'Leave her to the field.'}]} : {sp:'A woman in the stubble', txt:
`A woman is working the stubble on her knees, a long way from anyone, and she does not get up when the squad comes near. She is picking up single grains. One, and then a long look along the ground, and then one more, into a fold of her skirt that holds, you can see from here, less than a handful.

She is older than anyone in the Fourth and weighs less than ${b3In('kettle') ? 'Kettle\'s satchel' : 'a full pack'}. When she looks up her eyes go over the squad without stopping, the way you look at rain.

"The young ones went," she says, in a Daru so old it creaks. "With the priests. The priests said the Seer would feed them." One more grain. "I was too slow to be fed."`,
      ch:[{t:'Give her a day of the squad\'s rations.', fx:()=>{ S.f.b3_c5_glean = 'fed'; ally(0, -1, 'Bread in a gleaner\'s skirt'); c5Loy('ohl', 1); }, go:'b3_c5_glean_fed'},
          {t:'"Dannet. Tell her about Capustan."', req:()=>b3In('greysword'), fx:()=>{ S.f.b3_c5_glean = 'north'; ally(0, -1, 'A road north for a gleaner'); c5Loy('greysword', 1); }, go:'b3_c5_glean_north'},
          {t:'Leave her to the field.', fx:()=>{ S.f.b3_c5_glean = 'left'; ally(0, 1, 'A woman on her knees in the stubble'); }, go:'b3_c5_glean_left'}]},
    b3_c5_glean_fed:()=>({sp:'A woman in the stubble', txt:
`${c5Brisk() ? `Brisk counts out a day of hardtack and a twist of salt pork without being asked twice, and puts it into the woman's hands, and writes it down.` : `You count out a day of hardtack and a twist of salt pork and put it into her hands.`} She doesn't thank anyone. She ties it into her skirt with the grains, very carefully, so as not to lose the grains.

"South is the same," she says. "All the way to the sea. You'll see." It is not a warning. It is the only thing she has to give back.${b3In('ohl') ? `

Ohl looks at her as if she were a name he was learning by heart.` : ''}`,
      ch:[{t:'On.'}]}),
    b3_c5_glean_north:()=>({sp:'Dannet', txt:
`Dannet kneels in the stubble so their faces are level, and speaks to her in a Capan the old woman seems to half follow.

"Capustan takes people now," she says. "The Grey Swords take people. Women. Anyone. Walk north to the river and ask for the grey cloaks."

The woman looks at her a long time. "Grey Swords," she says. "They were on the walls."

"Yes."

"We were told they ate their prisoners."

Dannet's face doesn't change. "We were told the same of you."

The woman gets up, which takes a while, and starts north toward the ford without hurrying, the grains still in her skirt. Dannet watches her go until she is a speck, and then a while after that.`,
      ch:[{t:'On.'}]}),
    b3_c5_glean_left:()=>({sp:'The stubble', txt:
`You walk on. Behind you the woman goes on picking up grains, one at a time, and when you look back from the far edge of the field she has not moved, and the field has not got any smaller.${b3In('sohra') ? `

Sohra looks back too, once. She doesn't sing for an hour after.` : ''}`,
      ch:[{t:'On.'}]}),

    /* the Ilgres shaman and the blood-iron (the chapter's trick) */
    b3_c5_shaman:()=>({sp:'An Ilgres shaman', txt:
`The Ilgres keep their own fires a little apart from the Rhivi's, and keep them their own way: small, smoky, and surrounded by men who look as if they would like a reason. An old shaman sits at the nearest with a long knife across his knees and iron rings in his beard, and he is doing something to the blade with his thumb and a mutter that stands the hair up on the back of your neck.

"Malazan." His eyes stay on the knife. "You've come to look at the blood-iron. Everyone comes to look. Nobody asks." He tilts the knife so it takes the light. It is darker than iron should be, and there is frost along the fuller in the noon sun. "We quench it in the mountains, in blood that has been cooled in snow. There is no snow here. There is nothing here." He spits into the fire. "But iron remembers. Give it blood, and the words, and it remembers the cold for a while."

The thumb again, and the mutter. "Hold the edge while I say them. Do not let go. And I will teach your hand what to say."`,
      ch:[{t:'Hold the edge.', check:['might', 16], trick:'b3_c5_blood', req:()=>!S.f.b3_c5_bloodTried, fx:()=>{ S.f.b3_c5_bloodTried = 1; },
            edges:id=>[id === 'brisk' && ['she has held worse, and longer', 2], id === 'greysword' && ['the acolytes drill on cold iron', 1], id === 'sohra' && ['the spirit in the iron knows her songs', 1], id === 'tuft' && ['Meanas shrinks from the cold', -1], id === 'kettle' && ['she wants to ask how it works, and he can tell', -1]],
            go:'b3_c5_shaman_ok', fail:'b3_c5_shaman_miss'},
          {t:'"Another time."'}]}),
    b3_c5_shaman_ok:()=>({sp:'An Ilgres shaman', fx:()=>{ S.f.b3_c5_blood = ROLL().who || 'sgt'; gain('b3_c5_knife'); }, txt:
`${by({sgt:`You close your fist round the edge.`, _:`{who} closes a fist round the edge.`})} The cut is shallow. The cold is not. It goes up the arm like river water in winter, and keeps going, and the shaman says the words: once, and again, and by the third time ${by({sgt:'your own lips are', _:'{who}\'s lips are'})} moving with his, and there is frost on the knuckles.

"Good," he says, and takes the knife back, and looks at it, and then holds it out again, hilt first. "Keep it. It has had your blood. It will not want mine now."

${b3In('sohra') ? `Sohra lets her breath out. "The iron sang back," she says. "I heard it. Malazans don't hear anything."` : `The cold goes out of the hand slowly, over the afternoon. Something of it stays.`}`,
      ch:[{t:'Thank him.'}]}),
    b3_c5_shaman_miss:()=>({sp:'An Ilgres shaman', txt:
`${by({sgt:'You let go.', _:'{who} lets go.'})} Everybody lets go, the shaman says, laughing, a big wheezing Barghast laugh that his men take up round the fire. The cold was like putting a hand into the mountain itself.

"The iron does not know you yet," he says. "It will not wait for you, either." He goes back to his thumb and his mutter, and does not look up again.`,
      ch:[{t:'Leave him to his fire.'}]}),
    b3_c5_shaman_again:()=>({sp:'An Ilgres shaman', txt: S.f.b3_c5_blood ?
`The shaman glances at ${S.f.b3_c5_blood === 'sgt' ? 'your hand' : `${c5Name(S.f.b3_c5_blood, 'a Malazan')}'s hand`}, where the cut has healed white and cold, and grunts, satisfied.` :
`The shaman is still at his fire with his knife and his mutter. He does not offer twice. Barghast do not.`,
      ch:[{t:'Leave him to his fire.'}]}),

    /* the road on, to the ford */
    b3_c5_to_ford:()=>({sp:'The road south-east', txt:
`The column goes on south-east along the trader road, or what the Seer's people left of it. ${b3In('greysword') ? `Two days on, Dannet says, there's a river with a ford in it.` : `Two days on, the scouts say, there's a river with a ford in it.`} The scouts say the ford is held.`,
      ch:[{t:'South. To the ford.', go:()=>{ startExplore('b3_c5_ford'); talk('b3_c5_ford_arrive'); }}, {t:'Not yet.'}]}),

    /* ---- the ford ---- */
    b3_c5_ford_arrive:()=>({sp:'The ford', fx:()=>{ S.f.b3_c5_atFord = 1; }, txt:
`Two days. The road runs between fields that were cut green and orchards that were cut down, and the villages along it have their doors open and nobody behind them.${b3Mind() ? ` The squad has said very little since the river.` : ''}

The river is brown and quick between steep banks, and the ford is a wide pale tongue of gravel across it, knee-deep. On the far bank a low earthwork has been thrown up across the road, and behind it spears catch the light. Beklites: the Seer's line infantry, holding the ford so that something can get away behind them.

${b3In('greysword') ? `"A rearguard," Dannet says. "They do this. They hold until the column behind them is gone, and then they die." She says it flatly, a Grey Sword reciting a drill. "They don't run. Nobody ever told them they could."` : `They are not running. By the look of them, nobody has ever told them they can.`}${b3In('ellis') ? `

Ellis has been out with the Host's scouts since first light, and is back. "Forty spears that I could count," she says. "Slings behind the earthwork. And one at the back who keeps looking up the road, waiting for something." She would like that noted. You note it.` : ''}

The Seventh's lieutenant is up on the bank with a pair of cadre mages, pointing.`,
      ch:[{t:'Up the bank.'}]}),
    b3_c5_capt:()=>({sp:'The lieutenant', fx:()=>{ S.f.b3_c5_capt = 1; }, txt:
`"Fourth." The lieutenant is young and sunburnt and trying hard to look as if he has done this before. "Captain's orders: we take the near end of the ford and push them off the gravel. The cadre deals with the far bank." He jerks his head at the two mages, who are not listening. "There's a Seerdomin over there, the scouts say. One of their wizards. The cadre says leave him to them." He looks at the river. "The cadre says that about a lot of things."`,
      ch:[{t:'"Sir."'}]}),
    b3_c5_capt_again:()=>({sp:'The lieutenant', txt:
`The lieutenant is sitting on the bank with his helmet off, looking at the far side of the river, where the man on his knees is. He has been looking at him for some time.

"I'd heard," he says. "About what the cadre can do." He puts the helmet back on. "Hearing's different."`,
      ch:[{t:'Leave him to it.'}]}),
    b3_c5_mage:()=>({sp:'A cadre mage', fx:()=>{ S.f.b3_c5_mage = 1; }, txt:
`The two cadre mages sit on the bank with their boots off and their feet in the river, which looks like idleness until you see their faces. One of them is a heavy woman with grey in her braid and both sleeves soaked to the elbow, and she is watching the far bank without blinking.

"Don't stand there," she says, without looking round. "You're between me and him." You move. "Better."

${b3In('tuft') ? `Then she does look round, at Tuft, and her eyebrows go up. "The Mouse Quarter girl. You were on the High Mage's staff, the season before Pale."

Tuft has gone very still. "For a season," she says.

The mage looks at her a moment longer, and then back at the river, and lets it lie, which is a kindness, and both of them know it.` : `"When it starts," she says, "keep your heads down on the gravel. I'm going to do something to a man on the far bank, and I'd as soon nobody on this side was watching me do it."`}`,
      ch:[{t:'"Tuft. Sit with her."', req:()=>b3In('tuft') && !S.f.b3_c5_tuftMage, fx:()=>{ S.f.b3_c5_tuftMage = 1; c5Loy('tuft', 1); }, go:'b3_c5_mage_tuft'},
          {t:'Leave them to the river.'}]}),
    b3_c5_mage_tuft:()=>({sp:'Tuft', txt:
`Tuft sits down on the bank beside her, which nobody tells her to do, and takes her boots off, and puts her own feet in the water.

"The warren," Tuft says. "Down here. Does it bite you?"

"Every time." The mage lifts one hand out of the river. The fingertips are white and wrinkled as if they'd been in it for hours, and there is a thread of dried blood at one nostril she hasn't bothered to wipe. "It takes its fee. You pay or you don't cast." She puts the hand back. "Pay it once for something that matters, girl. Not twice for something that doesn't. That's all the advice I have."

Tuft nods slowly, as if she were writing it down somewhere inside. The two of them sit there with their feet in the Domin's river and watch the far bank, and do not say anything else, and it is the most at ease you have seen Tuft since Darujhistan.`,
      ch:[{t:'Leave them to it.'}]}),
    b3_c5_rider:()=>({sp:'A Rhivi rider', txt: S.f.b3_c5_asked === 1 ?
`The rider is still in his fold of ground with his dozen behind him, waiting. "When the spears look the other way," he says. "Not before. We are not Malazans."` : S.f.b3_c5_asked === 0 ?
`The rider doesn't look at you. His horse does, which is something.` :
`A Rhivi rider sits his horse at the edge of the bank with a dozen more behind him in a fold of ground, watching the Beklites with an air of mild professional interest. ${b3In('sohra') ? `He and Sohra trade a word in Rhivi, quick, and something in it makes her laugh a beat late.` : `He has a bone bead on a thong at his throat, and turns it in his fingers.`}

"Malazans," he says. "You will go into the water there, and they will put spears in you. The shallows downstream go across too. Horses could cross them, and come up behind the spears." He looks at you sidelong. "If somebody asked."`,
      ch:[{t:'"I\'m asking."', req:()=>S.f.b3_c5_asked == null && b3Trust() >= 6, fx:()=>{ S.f.b3_c5_asked = 1; }, go:'b3_c5_rider_yes'},
          {t:'"I\'m asking."', req:()=>S.f.b3_c5_asked == null && b3Trust() < 6, fx:()=>{ S.f.b3_c5_asked = 0; }, go:'b3_c5_rider_no'},
          {t:'"Sohra. Ask him the Rhivi way."', req:()=>S.f.b3_c5_asked == null && b3In('sohra'), check:['wits', 12, 'sohra'], fx:()=>{ S.f.b3_c5_asked = 0; },
            edges:()=>[b3Trust() >= 6 && ['he has heard of the Fourth', 1], b3Trust() < 4 && ['he has heard of the Fourth', -1]], clean:{fx:()=>{ c5Loy('sohra', 1); }},
            near:{fx:()=>{ if (S.inv.sharper > 0) { S.inv.sharper--; note(`Yes, but the Rhivi way has a gift in it, and the gift he wants is one of the squad's sharpers, "for the spears": −1 sharper.`, 'bad'); }
              else { S.rattled ??= {}; S.rattled.sohra = 1; note(`Yes, but the Rhivi way has a gift in it, and with nothing in the satchel to give, Sohra pays in a promise she will not repeat to you, and it sits on her: −1 on her next check.`, 'bad'); } }},
            go:'b3_c5_rider_yes', fail:'b3_c5_rider_no'},
          {t:'Leave him to his fold of ground.'}]}),
    b3_c5_rider_yes:()=>({sp:'A Rhivi rider', fx:()=>{ S.f.b3_c5_asked = 1; }, txt:
`He shrugs, the whole Rhivi shrug, shoulders and eyebrows and the horse's ears.

"Then we will be in the shallows," he says. "When the spears look the other way. Not before. We are not Malazans; we do not like to be stabbed." He nods, once, at ${b3In('sohra') ? 'Sohra' : 'you'}. "Tell your mages not to drown us by mistake."`,
      ch:[{t:'"I\'ll tell them."'}]}),
    b3_c5_rider_no:()=>({sp:'A Rhivi rider', fx:()=>{ S.f.b3_c5_asked = 0; }, txt:
`He considers it, turning the bead at his throat.

"In our camp they say the Malazans want Coral for their Empress," he says at last. "Maybe you want this ford for her too." He doesn't move. Neither do the dozen behind him. "We will watch. We are very good at watching."`,
      ch:[{t:'Leave it.'}]}),
    b3_c5_ford:()=> S.f.b3_c5_fordDone ? {sp:'The ford', txt:
`The gravel is the Host's now. On the far bank the earthwork is a long low heap with nobody behind it, and the man the cadre drowned is still on his knees by the cart, his forehead on the ground. The column has started across behind you, wagons and bhederin and the Rhivi children on their backs.

South of the river the road goes on toward a smudge of smoke on the horizon, three days off, that does not move with the wind.`,
      ch:[{t:'Cross. South.', go:()=>{ startExplore('b3_c5_town'); talk('b3_c5_town_arrive'); }}, {t:'Not yet.'}]} : {sp:'The ford', txt:
`The gravel tongue runs out into the river and the river runs over it, knee-deep and quick and the colour of strong tea. Thirty paces across. On the far side the Beklites wait behind their earthwork with their spears levelled, not shouting.${S.f.b3_c5_asked === 1 ? ` Downstream the Rhivi have gone down into their fold of ground and not come out of it.` : ''}

${b3In('kettle') && S.inv.sharper > 0 ? `Kettle has a sharper in her hand and is looking at the water just short of their line, where the spears stand in the river. "In the river," she says. "It'd throw half the river at them. Gravel too." She is not asking. She is hoping.` : b3In('kettle') ? `Kettle has her hand in the satchel and nothing in it to throw. She says so, twice.` : `It is a long thirty paces.`}${b3In('vell') ? `

Vell has the coil off his shoulder and is measuring the river by eye. "I could get a line across," he says. "If they'd stop looking at it." They won't.` : ''}`,
      ch:[{t:'Into the water.', go:()=>startBattle('b3_c5_ford', S.f.b3_c5_read ? {surprise:'p'} : {})},
          {t:'Kettle\'s sharper, into the river short of their line.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c5_ford', S.f.b3_c5_read ? {pre:true, surprise:'p'} : {pre:true})},
          {t:'Read the ford before anyone goes in.', check:['wits', 14], req:()=>!S.f.b3_c5_readTried, fx:()=>{ S.f.b3_c5_readTried = 1; },
            edges:id=>[id === 'sohra' && ['she has crossed a hundred rivers with the herds', 2], id === 'greysword' && S.f.b3_c5_wells && ['she knows the Domin\'s country', 2], id === 'ellis' && ['a scout\'s eye for ground', 1], id === 'kettle' && ['she is looking at where to throw, not where to walk', -1]],
            near:{t:()=>`Yes, but to be sure of the shelf ${NAME(ROLL().who || 'sgt')} wades out to the knee to feel it, and a Beklite slinger on the far bank sees a target: ${bruiseN()} health down at the start of the fight.`, fx:()=>bruise(ROLL().who || 'sgt', bruiseN())},
            go:'b3_c5_ford_read', fail:'b3_c5_ford_miss'},
          {t:'Not yet.'}]},
    b3_c5_ford_read:()=>({sp:'The ford', fx:()=>{ S.f.b3_c5_read = 1; }, txt:
`${by({sohra:`Sohra watches the water a long time, the way she watches the herds, and then points with her chin. "There. The river is shallower by the left bank. See the ripple? Their line is two deep on the right and one deep on the left, because the right is where they think we will come."`, ellis:`Ellis counts the spears, and then the ripples, and puts the two counts together. "Two deep on the right," she says. "One on the left, where it's shallower. They've counted on us coming the easy way."`, greysword:`Dannet crouches on the bank with her eyes half shut. "The gravel shelves on the left," she says. "Their line is two deep on the right and one on the left. They think we're fools. Good."`, sgt:`You watch the water a long time. The ripple's wrong on the left: shallower there. Their line is two deep on the right and one on the left, because the right is where they think you'll come.`, _:`{who} watches the water a long time. "The left," {who} says at last. "Shallower. Their line is two deep on the right and one on the left. They think we'll come where it's easy."`})}

It isn't much. It's the first step, which is the one that matters.`,
      ch:[{t:'Into the water. The left.', go:()=>startBattle('b3_c5_ford', {surprise:'p'})},
          {t:'Kettle\'s sharper first, into the river short of their line.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c5_ford', {pre:true, surprise:'p'})},
          {t:'Not yet.'}]}),
    b3_c5_ford_miss:()=>({sp:'The ford', txt:
`The river hides whatever it knows. ${by({sohra:'Sohra shakes her head. "Brown water lies," she says. "Everywhere."', sgt:'You can\'t see the bottom, or the trick of it.', _:'{who} shakes their head. Brown water, quick, and the bottom nowhere.'})} On the far bank a Beklite file-leader is watching you watch, and does something with his hand, and the spears shift.`,
      ch:[{t:'Into the water.', go:()=>startBattle('b3_c5_ford')},
          {t:'Kettle\'s sharper, into the river short of their line.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c5_ford', {pre:true})},
          {t:'Not yet.'}]}),
    b3_c5_after_ford:()=>({sp:'The far bank', scene:'b3_c5_drowned', fx:()=>{ S.f.b3_c5_fordDone = 1; S.f.b3_c5_orley = 1; S.f.b3_listAdds = (S.f.b3_listAdds || 0) + 1; ally(0, 1, 'The drowned man on the far bank'); }, txt:
`The ford is the Host's. The rearguard died on the gravel and in the water and on the far bank, as ${b3In('greysword') ? 'Dannet said' : 'everyone knew'} they would, and not one of them ran.

The man the cadre drowned is still on his knees in the dust beside the cart, bent forward with his forehead on the ground as if he were praying. The earth round him is wet in a wide dark circle. Nothing else on the far bank is wet. The flies have found him already. The Fourth goes no closer than it has to.

Downstream the Seventh is pulling a boy out of the deep water at the edge of the ford, where the gravel stops without warning. He went in face-down in his armour and did not come up.${b3In('vell') ? ` Vell's line goes out to them across the deep water, and they take it, and it is good for nothing now but bringing him in.` : ''} ${b3In('ohl') ? `Ohl wades out to him, and turns him over, and does not reach for Denul, because there is nothing for it to do. Then he takes out his book and writes it before the boy is out of the river: *Orley. The Seventh. Nineteen. A ford with no name.* The list is ${b3ListWords()} now. He shuts the book.` : `One of the Seventh says his name was Orley, and that he was nineteen. You write it down, because Ohl would have.`}`,
      ch:[{t:'See to the cadre mage.', go:'b3_c5_drowned'}, {t:'Back across. Leave the far bank to the flies.', go:()=>startExplore()}]}),
    b3_c5_drowned:()=>({sp:'A cadre mage', scene:'b3_c5_drowned', fx:()=>{ S.f.b3_c5_drowned = 1; }, txt:
`The mage with the wet sleeves is sitting on the near bank again with her feet in the river and her head between her knees, and her partner is holding a cloth to her face, and the cloth is red.

"Don't," she says, when ${b3In('ohl') ? 'Ohl reaches' : 'you reach'} for her. "It's the warren. It wants paying, down here. I paid." She takes the cloth away; the bleeding has slowed. "I put the river in him. Fill a man's chest with water from a hundred paces off and he can't say a word of his own warren back at you. It's quick."

She looks across at the man kneeling on the far bank, and away again.

"It isn't clean. Nothing's clean down here."${b3In('tuft') ? `

Tuft is behind you. When you look round she has her hands up her sleeves again and is looking at the river, not the man, as if the river had done it on its own.` : ''}${b3In('ohl') ? `

Ohl gives the partner a pad of clean lint from his satchel and shows her how to pinch the bridge of the nose, which she knows, and lets him show her anyway.` : ''}${b3In('ellis') ? `

Ellis has watched all of it from the bank, with the gloved hand inside her coat. "The Claw has mages who can do that," she says. "None of them sit down after."` : ''}`,
      ch:[{t:'Leave her to it.', go:()=>startExplore()}]}),

    /* ---- the burnt town ---- */
    b3_c5_town_arrive:()=>({sp:'A burnt town', fx:()=>{ S.f.b3_c5_atTown = 1; ally(0, 1, 'The burnt town'); }, txt:
`Three days south of the ford the rain comes, and the smoke on the horizon turns out to be a town.

It was burned before the army came. Not by soldiers: by its own people, on the priests' word, so the Malazans would find nothing. Black walls without roofs. Doorways full of ash going grey in the rain. A dog that will not come out from under a cart. The smell is old fire and wet wool and something under both that nobody names.

From the square in the middle of it, somebody is shouting in Pannion, the flat bark of a man used to being obeyed, and a whip cracks, and nobody cries out.

${b3In('greysword') ? `"They're taking the last of them south," Dannet says quietly. "Ahead of us. So we find nothing in this country but empty towns, and they find more mouths for the Seer." Her knuckles are white on the shield-grip. "I've seen this. On the road to Capustan. I've seen this."` : `Whatever is happening in the square, it has been happening a long time, and nobody in it expects it to stop.`}`,
      ch:[{t:'Into the town.'}]}),
    b3_c5_oldman:()=>({sp:'An old man in a doorway', txt: S.f.b3_c5_oldman ?
`He is still in the doorway with the dead cat, out of the rain. ${S.f.b3_c5_townDone ? `"You were loud," he says. "In the square. Good."` : `"The lane by the smithy," he says again, as if you might have forgotten. "Behind the well."`}` :
`An old man is sitting in the doorway of the one house in the street that still has a roof, out of the rain, with a dead cat in his lap that he is stroking. He watches the squad come up the street and doesn't move.

"They burned it when the priests told them," he says, as if somebody had asked. "Their own houses. Our houses. So the Malazans would find nothing." He strokes the cat. "I told them the Malazans would find me. Here you are."

He nods up the street toward the noise. "There are some left, in the square. The priest's soldiers are taking them south, roped like goats. There's a lane by the smithy that comes out behind the well." He looks at the cat. "I used to take that way when my wife wanted me home."${b3In('vell') ? `

Vell, behind you, is looking up at the black walls and the open sky where the roofs were. "Back home I'd have gone over the top," he says. "There's no top."` : ''}`,
      ch: S.f.b3_c5_oldman ? [{t:'Leave him to his doorway.'}] : [
          {t:'Give him something to eat.', fx:()=>{ S.f.b3_c5_oldman = 'fed'; S.f.b3_c5_lane = 1; ally(0, -1, 'An old man fed in a doorway'); }, go:'b3_c5_oldman_after'},
          {t:'"The lane by the smithy. Thank you."', fx:()=>{ S.f.b3_c5_oldman = 'lane'; S.f.b3_c5_lane = 1; }, go:'b3_c5_oldman_after'}]}),
    b3_c5_oldman_after:()=>({sp:'An old man in a doorway', txt: S.f.b3_c5_oldman === 'fed' ?
`He takes the hardtack and holds it, and doesn't eat it. He breaks a corner off and puts it by the cat's mouth, and then laughs at himself, a dry small sound, and eats the rest.

"The smithy," he says. "Mind the anvil. It's still there. Nothing burns an anvil."` :
`"Mind the anvil," he says. "Nothing burns an anvil." He goes back to the cat.`,
      ch:[{t:'The square, then.'}]}),
    b3_c5_gs:()=>({sp:'A Grey Sword trooper', txt:
`A Grey Sword trooper is sheltering under a broken wall at the end of the street with her shield on her arm and the rain running off the wolf painted over the boar on it. There are six more behind her, sitting on their heels. ${b3In('greysword') ? `She sees Dannet, and something passes between them, a nod with a whole company in it.` : `They look at the Fourth's badges, and then at the Fourth, in that order.`}

"Malazans." An Elin accent, flat. "Our orders are to follow the column and see what the Seer leaves behind. This is what he leaves behind." She looks toward the square. "There are a dozen of his soldiers in there, and a Seerdomin, and fifty of the town roped together in the mud. We were going in at dusk." A pause. "If you go in first, we'll come when we hear it."`,
      ch:[{t:'"We\'ll go in first. Come when you hear it."', fx:()=>{ S.f.b3_c5_gs = 1; c5Loy('greysword', 1); }, go:'b3_c5_gs_yes'},
          {t:'"Wait for dusk. We\'ll go when we\'re ready."', fx:()=>{ S.f.b3_c5_gs = 0; }, go:'b3_c5_gs_no'}]}),
    b3_c5_gs_yes:()=>({sp:'A Grey Sword trooper', txt:
`She nods, and taps the wolf on her shield twice with two fingers, which may be a prayer or may be a habit. "When we hear it," she says. "If the Wolves are listening, sooner."`,
      ch:[{t:'The square.'}]}),
    b3_c5_gs_no:()=>({sp:'A Grey Sword trooper', txt:
`"As you like." She settles back on her heels in the rain. "We've been waiting since Capustan. We're good at it."`,
      ch:[{t:'The square, when you are ready.'}]}),
    b3_c5_gs_again:()=>({sp:'A Grey Sword trooper', txt:
`The Grey Swords are in the square now, with the town's people, cutting ropes and handing out what they carry. The trooper looks up as you pass. ${S.f.b3_c5_gs === 1 ? `"We heard it," she says. That's all; it is a great deal, from a Grey Sword.` : `She nods to the Fourth, once, and goes back to the ropes.`}`,
      ch:[{t:'Leave them to it.'}]}),
    b3_c5_square:()=> S.f.b3_c5_townDone ? {sp:'The square', txt:
`The well's windlass is broken and the rope is gone. The Seerdomin's grey mace has been put down the shaft. The well will give no water for years, and there is nobody left to draw it.`,
      ch:[{t:'Leave the square.'}]} : {sp:'The square', txt:
`From the corner of the street you can see all of it. A square round a well with a broken windlass. In the middle, in the mud, fifty people sit roped together in a long line, farmers and their children and their old, with their heads down in the rain. Round them, Beklites with whips and spears are getting them up to walk, one rope at a time.

On the temple steps a Seerdomin stands with a grey mace, watching the work. He wears a chain round his neck with a disc of bone on it. He has not raised his voice once.${b3In('ellis') ? `

Ellis is beside you, watching the doorways rather than the whips. "The whips are for show," she says. "Whoever's in the doorways isn't."` : ''}${S.f.b3_c5_lane ? `

The lane by the smithy runs off to your left between two black walls. The old man said it comes out behind the well.` : ''}`,
      ch:[{t:'Go in.', go:()=>startBattle('b3_c5_town')},
          {t:'Round by the smithy lane, and come out behind the well.', req:()=>!!S.f.b3_c5_lane, go:()=>startBattle('b3_c5_town', {surprise:'p'})},
          {t:'Not yet.'}]},
    b3_c5_after_town:()=>({sp:'The square', scene:'b3_c5_burnt', fx:()=>{ S.f.b3_c5_townDone = 1; gain('b3_c5_chain'); }, txt:
`The Seerdomin is dead on the temple steps, face up in the rain, and round his neck there is a chain of office: grey iron links and a disc of bone carved with an open eye. ${c5Brisk() ? 'Brisk takes it off him, because somebody has to and nobody else will touch it.' : 'You take it off him, because somebody has to and nobody else will touch it.'}

The town's people are still roped together in the middle of the square. They did not run when the fighting started. They did not cheer when it stopped. They sat in the mud and waited to see who would own them next.${S.f.b3_c5_gs === 1 ? `

The Grey Swords come into the square from the far street at a run, shields up, and stop when they see there is nothing left for them to do, and look at the Fourth, and then at each other.` : ''}`,
      ch:[{t:'Cut them loose.', go:'b3_c5_remnants'}]}),
    b3_c5_remnants:()=>({sp:'The square', scene:'b3_c5_burnt', txt:
`They are farmers, mostly, and their children, and their old. What they have been made to do this past year is in their faces. Nobody in the Fourth asks, and nobody in the square offers.

${b3In('greysword') ? `Dannet cuts the first rope herself. Her hands are not quite steady. "In Capustan," she says, to nobody, "they came over the walls like this." She cuts the next. "Exactly like this."` : `The rope is wet and swollen and has to be sawn through, one at a time.`}${b3In('vell') ? `

Vell takes the next rope and saws, and looks at the cut end. "Good hemp," he says. "The Guild would pay for this." He hates that he knows it, and saws the one after faster.` : ''}

When they are loose they do not go anywhere. They look at the Fourth's packs.`,
      ch:[{t:'Give them what the squad is carrying. All of it.', fx:()=>{ S.f.b3_c5_remnants = 'fed'; ally(1, -2, 'Bread for the starving'); if ((S.inv.salve || 0) > 0) { S.inv.salve--; note('A salve gone, too, to a child with a whip-cut that would not close.', 'bad'); } c5Loy('ohl', 1); c5Loy('greysword', 1); c5Loy('brisk', -1); }, go:'b3_c5_remnants_fed'},
          {t:'Point them north, toward Capustan and the Grey Swords. Keep the rations.', fx:()=>{ S.f.b3_c5_remnants = 'north'; ally(0, 1, 'Hungry faces in the rain'); c5Loy('brisk', 1); }, go:'b3_c5_remnants_north'}]}),
    b3_c5_remnants_fed:()=>({sp:'The square', scene:'b3_c5_burnt', txt:
`${c5Brisk() ? `Brisk opens the sacks without a word, and hands it out, and does not count it, which for Brisk is the same as weeping. Afterwards she writes in the ledger: *Rations, the squad's. Given.* She underlines *given*.` : `The sacks come open. It goes quickly. It always does.`}

It is nowhere near enough for fifty. It is a day for them, perhaps two. A woman with a child on her hip takes hardtack from your hand and looks at it as if she does not remember what it is for, and then she does.${S.f.b3_c5_gs === 1 || b3In('greysword') ? `

"We'll take them north," the Grey Sword trooper says. "To the river, and over it. Capustan takes people now."` : `

They start north in the rain, toward the river, toward Capustan, in no kind of order, still in their line as if the rope were there.`}`,
      ch:[{t:'On.', go:()=>startExplore()}]}),
    b3_c5_remnants_north:()=>({sp:'The square', scene:'b3_c5_burnt', txt:
`"North," you tell them. "The river, and over it. Capustan. Ask for the grey cloaks." ${b3In('greysword') ? 'Dannet says it again in Capan, and again in something older.' : ''}

They go, after a while, in the rain, in no kind of order, still walking in their line as if the rope were there, and do not look back. Behind you the Fourth's packs are as heavy as they were, and nobody in the Fourth says anything about it for the rest of the day.${c5Brisk() ? `

Brisk writes in the ledger: *Rations, the squad's. Kept.* She doesn't underline anything.` : ''}`,
      ch:[{t:'On.', go:()=>startExplore()}]}),
    b3_c5_to_well:()=> !S.f.b3_c5_townDone ? {sp:'The road south', txt:
`The road goes on south out of the town. ${b3In('greysword') ? 'Dannet doesn\'t move. "Not with the square still held," she says.' : 'Behind you, in the square, a whip cracks again.'}`,
      ch:[{t:'The square first.'}]} : {sp:'The road south', txt:
`South again, in the rain. The column strings out behind the Fourth along the road for a league and more, and the dead country goes past on either side, field after stripped field, and at dusk the outriders come back with word of a village with a well.`,
      ch:[{t:'On, to the halt.', go:()=>{ startExplore('b3_c5_well'); talk('b3_c5_well_arrive'); }}, {t:'Not yet.'}]},

    /* ---- the well, at night ---- */
    b3_c5_well_arrive:()=>({sp:'A dead village', fx:()=>{ S.f.b3_c5_atWell = 1; }, txt:
`The rain stops at dusk as if somebody had told it to. The column halts by a village that is all walls and no roofs, with one well in the middle of what was its green, and there is a line at the well before the first fire is lit.

Two lines. The Fourth Regiment of the Second has the Host's water detail tonight, with barrels on a cart and a corporal with a list. The Rhivi have their herd, two hundred bhederin lowing in the dark, thirsty from the rain they could not drink. Both lines want the same bucket. Both lines are looking at the other one more than they are looking at the well.

${c5Brisk() ? `"Fourth Regiment," says Brisk. That is all she says. You know whose regiment it is.` : `The Fourth Regiment: Tav's regiment.`}`,
      ch:[{t:'Walk the halt.'}]}),
    b3_c5_tav:()=>({sp:'Tav', fx:()=>{ S.f.b3_c5_tav = 1; }, txt: S.f.b3_c5_key ?
`Tav is on a barrel by the trough, singing to the bhederin. He can't sing. The bhederin don't seem to mind. ${S.f.b3_c5_inc === 'cut' ? `His palm is bound up in a strip of somebody's shirt, and he waves it at you like a flag.` : `He waves at you without stopping.`}` : S.f.b3_c5_inc ?
`Tav is back on the water cart${S.f.b3_c5_inc === 'cut' ? ' with his palm bound up in a strip of somebody\'s shirt' : ''}, filling nothing, because there is nothing clean to fill from. "That was done on purpose," he says, nodding at the well. "Whoever did it walked round both fires with the same pot. Find him, Sergeant. I'd like a word."` : c5Brisk() ?
`Tav is on the water cart, because of course he is: the biggest man in the company and the only one who'll stand on a barrel and sing while he fills it. He can't sing. He knows. He sings anyway, a Cawn dock song about a woman with a boat, as flat as the Catlin.

He stops when he sees Brisk. "Bris." He jumps down, and the cart rocks. "Four coppers," he says, before she can.

"I've not said a word."

"You were going to." They stand a little back from the fire, the two of them, the same height, the same jaw, not touching. "Brood's lot say we mean to take their well," he says, lower. "Ours say the Rhivi have been at it. Somebody's been round both fires with the same pot." He spits. "I'm on the cart. I'll stay on the cart."` :
`Tav is on the water cart, filling barrels and singing a Cawn dock song about a woman with a boat, as flat as the Catlin. He sees you and stops. "Sergeant." ${c5BriskGone() ? `He doesn't ask. He has not asked since Darujhistan, because he knows, and because there is nothing to ask that would make it a different answer. He goes back to the barrels. After a while he starts singing again, quieter.` : `He looks past you for his sister, and doesn't find her, and doesn't ask. "Brood's lot say we mean to take their well," he says instead. "Ours say the Rhivi have been at it. Somebody's been round both fires with the same pot."`}`,
      ch:[{t:'"Brisk. Stay with him a while."', req:()=>c5Brisk() && !S.f.b3_c5_inc && !S.f.b3_c5_tavBrisk, fx:()=>{ S.f.b3_c5_tavBrisk = 1; c5Loy('brisk', 1); }, go:'b3_c5_tav_brisk'},
          {t:'Leave him to the cart.'}]}),
    b3_c5_tav_brisk:()=>({sp:'Brisk', txt:
`The squad leaves them by the water cart. When Brisk comes back to the fire, a while later, she sits down beside you without being asked, which she has never done.

"If it goes wrong at that well tonight," she says, "he'll stand in front of it. He always stands in front of it." She looks at her hands. ${S.imported && b3Was('c7_letter') !== 'brisk' ? `"It'll be in the letter, I expect. *Don't stand in front of things.* I haven't opened it. I don't need to."` : `"I told him, *don't stand in front of things.* He wrote me the same thing, in the letter. We've both been saying it for nine years. Neither of us has ever once listened."`}

A pause.

"We don't leave people," she says. "I know. I'm only saying where I'll be."`,
      ch:[{t:'"I know where you\'ll be."'}]}),
    b3_c5_wj:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c5_wj = 1; }, txt: S.f.b3_c5_key ?
`Whiskeyjack is on his bucket by the dead tree, with the leg out straight and the sword across his knees, watching the well, which has nobody fighting at it.

"Sergeant." ${S.f.b3_c5_key === 'brood' ? `A pause. "He'll remember you. Kallor. Mind it." Another. "He remembers me."` : `A pause. "That's done, then." He doesn't say whether it was done well. With Whiskeyjack, that means it was.`}` :
`Whiskeyjack is sitting on an upturned feed bucket by a dead tree at the edge of the halt, his bad leg out straight in front of him and his sword across his knees, watching the well. ${S.f.b3_legSeen ? `He has stopped pretending the leg is anything but what it is. So has everyone else.` : `He sits down whenever he can now, and gets up slowly.`}

"Sergeant." He doesn't take his eyes off the well. "Somebody's going to start something over that bucket tonight. I'd like it to be nobody."${S.f.b3_wjNoticed ? ` A glance, brief. "You gave your rations to the prisoners' children at Capustan. ${b3In('ohl') ? 'Ohl\'s salves too. ' : 'Your salves too. '}I heard." Back to the well. "Good."` : ''}`,
      ch:[{t:'"The leg, sir."', req:()=>!S.f.b3_c5_leg, go:'b3_c5_wj_leg'},
          {t:'Leave him to his bucket.'}]}),
    b3_c5_wj_leg:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c5_leg = 1; S.f.b3_legSeen = 1; }, txt:
`"Mallet's not here to ask." He shrugs. "When he sees me he'll want his week. Flat on my back, he says, and he'll put it right."

${b3In('ohl') ? `Ohl, behind you, clears his throat. "I'd want less than a week, sir. Three days. Denul's bad down here; I'd go slow. But three days would do it."

Whiskeyjack looks at him, not unkindly. "After," he says.` : `"After," he says.`}

"After what, sir?"

"Coral." He shifts the leg, and doesn't let his face move while he does it. "Then Mallet can have his week."`,
      ch:[{t:'Leave him to his bucket.'}]}),
    b3_c5_herd:()=>({sp:'A Rhivi herd-mother', fx:()=>{ S.f.b3_c5_herd = 1; }, txt: S.f.b3_c5_key ?
`The herd-mother is at the trough with her staff, counting the bulls as they drink, and does not lose count when you come up.

"Malazan." She unhooks something from her belt and holds it out without looking: a water-skin, a bhederin bladder stitched with sinew, a bone bead on the neck. "Water stays sweet in it. Even this country's." ${S.f.b3_c5_key === 'brood' ? `"You took it to the Warlord's fire. Everyone saw." She goes back to counting.` : `"You settled it the soldiers' way. The bulls don't care how." She goes back to counting.`}` : S.f.b3_c5_inc ?
`The herd-mother is at the edge of the herd with her staff across her shoulders, her mouth a line. "A calf of ours was killed to do this," she says. "A white-blaze calf. I knew her mother." She looks at you. "Find who. Then we'll talk about water."` :
`A broad Rhivi woman with a herd-staff hung with bone beads stands at the edge of the herd, between her bulls and the well, as if she meant to hold it alone.

"The bulls have not drunk since the river," she says. "Your water-men say the well is the Host's tonight. That is what they say in our fires that your water-men say." She taps the staff on the ground. "I don't know who to believe. I know the bulls are thirsty."${b3In('sohra') ? `

She and Sohra exchange a few words in Rhivi. Sohra's face does something complicated. "She says there was a man at our fires at dusk," Sohra tells you. "Not one of ours. Not one of yours."` : ''}`,
      ch: S.f.b3_c5_key && !S.f.b3_c5_skin ? [{t:'Take it, and thank her.', fx:()=>{ S.f.b3_c5_skin = 1; gain('b3_c5_skin'); }, go:()=>startExplore()}] : [{t:'Leave her to her herd.'}]}),
    b3_c5_kman:()=>({sp:'A man in a fur collar', fx:()=>{ S.f.b3_c5_kmanMet = 1; S.f.b3_kallor = 1; }, txt:
`A man in a good cloak with fur at the collar stands at the edge of the light between the two lines, not in either, with two others behind him who have the look of men paid by the month. His colours are not the Host's, nor Brood's own. They are the colours of Brood's second, and he wears them as if they were a joke he had been let in on.

"Marines." Pleasantly. "You'll be wanting the well for the Host, I expect. Everyone says so. The Malazans want the well. The Malazans want Coral." He smiles. "I only repeat what I hear."

"Who do you serve?"

"The High King." He says it with relish. "Lord Kallor. Who has seen a great many armies march to a great many cities, and tells me they all want the same thing in the end." He looks past you, at the well, at the two lines. "Water. And whatever is behind the walls."`,
      ch:[{t:'Leave him at the edge of the light.'}]}),
    b3_c5_well:()=> S.f.b3_c5_key ? {sp:'The well', txt:
`The well is shared. The bad water has been hauled out bucket by bucket and poured away in the ditch, and the Fourth Regiment knocked a trough together out of a cart-bed, and the bhederin drink from it in turns, and the Rhivi children sit on the well-head and watch the Malazans fill barrels as if it were a show.`,
      ch:[{t:'Leave the well.'}]} : S.f.b3_c5_caught ? {sp:'The well', txt:
`The man in the fur collar is sitting with his back against the well-head and his hands tied in front of him. Everyone is waiting to see what the Fourth does with him.`,
      ch:[{t:'Decide it.', go:'b3_c5_key'}, {t:'Not yet.'}]} : S.f.b3_c5_inc ? {sp:'The well', txt:
`The knives are away${S.f.b3_c5_inc === 'cut' ? ', and the cuts are being bound' : ''}. The bucket still stands on the well-head, stinking. The two lines have pulled back from each other and stand with the well between them, watching the Fourth to see what it will do.

${S.f.b3_c5_ev === 1 ? `The calf is on the ground by the well, and the knife with the bright new filing is in your belt.` : S.f.b3_c5_ev === 0 ? `There's a dead calf at the bottom of it. That's all anyone can swear to.` : `Something is dead at the bottom of it. It hasn't been looked at properly yet.`}`,
      ch:[{t:'Have it hauled up and looked at properly.', req:()=>S.f.b3_c5_ev == null, check:['wits', 13],
            edges:id=>[id === 'ohl' && ['he has looked at worse things in water', 2], id === 'greysword' && S.f.b3_c5_wells && ['she knows the Domin\'s wells', 2], id === 'sohra' && ['it is a Rhivi calf', 1], id === 'kettle' && ['she can tell a cut from a tear', 1]],
            near:{fx:()=>{ const w = ROLL().who || 'sgt';
              if (S.inv.salve > 0) { S.inv.salve--; note(`Yes, but ${NAME(w)} goes down the rope to set the grapnel, and comes up with both hands raw from three days of bad water, and a jar of salve goes on them: −1 salve.`, 'bad'); }
              else { S.rattled ??= {}; S.rattled[w] = 1; note(`Yes, but ${NAME(w)} goes down the rope to set the grapnel, and comes up with both hands raw from three days of bad water and nothing to put on them: −1 on the next check.`, 'bad'); } }},
            go:'b3_c5_look', fail:'b3_c5_look_miss'},
          {t:'Find the man in the fur collar.', go:'b3_c5_confront'},
          {t:'Not yet.'}]} : {sp:'The well', txt:
`You are ten paces from the well when it goes.

A Fourth Regiment man drops his bucket down the shaft and hauls it up and it comes up stinking, and he says a word, and a Rhivi herdsman beside him says a word back, and then there is a knife out, and then a dozen, and the bhederin start to bellow and shove, and the corporal is shouting about poison and the Rhivi are shouting about thieves, and somebody has a spear levelled at somebody's belly.

${c5Brisk() ? `Tav is off the cart. Tav is in the middle of it, of course he is, arms wide, a big man standing in front of the spear, saying "Now, now," in a voice like a Cawn barge-horn. Brisk is already moving.` : `A big man is in the middle of it with his arms out wide, standing in front of the spear: Tav, saying "Now, now," in a voice like a barge-horn, as if that had ever stopped anything.`}

Out between the two lines the man with the fur collar is watching, and not moving, and smiling slightly.`,
      ch:[{t:'"Fourth! Between them. Now."', check:['might', 14],
            edges:id=>[id === 'brisk' && ['her brother is in the middle of it', 2], id === 'greysword' && ['the Grey Wall, drilled on Capustan\'s walls', 1], id === 'sgt' && ['your voice carries', 1], id === 'kettle' && ['she is better at starting noise than stopping it', -1]],
            near:{t:()=>`Yes, but nobody told the bhederin, and a bull with somewhere to be puts ${NAME(ROLL().who || 'sgt')} into the well-head on his way past: ${bruiseN()} health down at the start of the next fight.`, fx:()=>bruise(ROLL().who || 'sgt', bruiseN())},
            go:'b3_c5_well_calm', fail:'b3_c5_well_cut'},
          {t:'"Sohra. The herders."', req:()=>b3In('sohra'), check:['wits', 13, 'sohra'], edges:()=>[b3Trust() >= 8 && ['the Rhivi trust the Fourth', 2], S.f.b3_c5_satSohra && ['she has been singing for days to keep from shouting', 1]],
            near:{t:'Yes, but a bull swings his head at the wrong moment, and the horn passes a finger\'s width from Sohra\'s eye. She finishes the song. Her hands shake for an hour after: −1 on her next check.', fx:()=>{ S.rattled ??= {}; S.rattled.sohra = 1; }},
            go:'b3_c5_well_calm', fail:'b3_c5_well_cut'}]},
    b3_c5_well_calm:()=>({sp:'The well', fx:()=>{ S.f.b3_c5_inc = 'calm'; ally(1, 0, 'The well held'); }, txt:
`${by({sohra:`Sohra goes into the herd, not round it, straight in among the bulls with her staff over her head, singing. Not loudly. The bulls stop shoving to listen, and the herdsmen stop shouting because the bulls have stopped, and in the hush she says three things in Rhivi, fast and hard, and the knives go down one by one as if each of them had decided it alone.`, brisk:`Brisk goes through the Fourth Regiment shoulder first and puts her shield between her brother and the spear, rim to the spear-point, and says "*Down*," in the regiment voice, and the Fourth Regiment remembers it is a regiment. Across the bucket the Rhivi see the shield and the voice and the big man laughing behind them, and their knives go down too.`, sgt:`You go in between them with your hands open and your sword sheathed, which is either the bravest thing you have done this spring or the stupidest, and use the voice that eleven years of marines have put in you. It carries. The Fourth Regiment's corporal hears his rank in it and shuts his mouth, and the Rhivi hear something else, and their knives go down.`, _:`{who} gets in between them, and the squad gets in behind, and for a long breath it might go either way. Then a knife goes down, and another, and the bhederin stop bellowing because the men have stopped.`})}

The knives come away clean. The bucket still stands on the well-head, stinking.

"Poison," the corporal says again, but quieter. "They poisoned it."

The herd-mother pushes through to the well with her staff. "You will say that again," she says, "when you have looked."`,
      ch:[{t:'Look.', go:'b3_c5_well'}]}),
    b3_c5_well_cut:()=>({sp:'The well', fx:()=>{ S.f.b3_c5_inc = 'cut'; ally(-1, 1, 'Blood at the well'); }, txt:
`It doesn't go down in time. A Rhivi herdsman takes a knife along the forearm. A Fourth Regiment heavy takes a spear-butt in the teeth. And Tav, in the middle of it, catches a blade in his bare hand that was going into somebody's belly, and holds on to it, and laughs, and keeps on saying "Now, now," with the blood running down his wrist.

In the end it is that, more than anything the Fourth did, that stops it: a big man bleeding and laughing in the middle of everyone like a fool, so that nobody can quite go on.

${c5Brisk() ? `Brisk has him by the collar a moment later and is looking at the hand, and saying things to him in Cawn dockside that nobody else in the halt understands, and he is laughing still.` : `A Fourth Regiment man binds his hand with a strip of shirt. He laughs at that too.`}

The herd-mother pushes through to the well with her staff. "Poison, they say." She looks at the bucket. "Look, before you say it again."`,
      ch:[{t:'Look.', go:'b3_c5_well'}]}),
    b3_c5_look:()=>({sp:'The well', fx:()=>{ S.f.b3_c5_ev = 1; }, txt:
`It takes four men and a grapnel off the water cart.${b3In('vell') ? ` Vell ties the grapnel on himself, and won't let anyone else, and pays the line out hand over hand into the dark.` : ''} What comes up out of the well is a bhederin calf with a white blaze, three days old, its throat cut.

${by({ohl:`Ohl turns the throat to the lantern. "Straight blade," he says. "One stroke, left to right, by somebody who's done it before. Rhivi cut a calf the other way, and they say a word first, and they don't throw it down a well." He sits back on his heels. "And look here."`, greysword:`Dannet turns the throat to the lantern. "A straight blade," she says. "Not a Rhivi knife. And look here."`, sohra:`Sohra makes a small sound and kneels by the calf, and touches the blaze. "A Rhivi would not cut a calf so," she says. "And a Rhivi would not put it in a well. Look."`, kettle:`Kettle turns the throat to the lantern. "That's a cut, not a tear," she says. "Straight blade. Clean. Whoever did it has done it before. And here, look."`, _:`{who} turns the throat to the lantern. A straight blade, one stroke. "And look here."`})}

Under the bucket on the well-head, where anybody drawing water would find it, lies a knife: Host issue, the regiment's mark on the hilt filed off. The filing is bright. It was done today.

"It was meant to be found," ${b3In('kettle') ? 'Kettle says' : 'somebody says'}. "Meant for us to find, and for the Rhivi to see us find it."`,
      ch:[{t:'Find the man in the fur collar.', go:'b3_c5_confront'}, {t:'Not yet.'}]}),
    b3_c5_look_miss:()=>({sp:'The well', fx:()=>{ S.f.b3_c5_ev = 0; }, txt:
`It takes four men and a grapnel off the water cart. What comes up is a bhederin calf, three days old, dead. How it died, in the dark and the stink and with everyone shouting, nobody can swear to. The Fourth Regiment says the Rhivi did it. The Rhivi say a Rhivi would not. Both of them look at the Fourth to settle it.

The water is spoiled either way.`,
      ch:[{t:'Find the man in the fur collar.', go:'b3_c5_confront'}, {t:'Not yet.'}]}),
    b3_c5_witness:()=>({sp:'An old woman in a doorway', fx:()=>{ S.f.b3_c5_wit = 1; }, txt:
`An old woman sits in what was a doorway on the green, wrapped in a blanket, watching everything. She has been sitting there, you realise, since before the column came. Since before the Seer came, by the look of her. The column never noticed her, which may be how she is still alive.

"At dusk," she says, in old Daru. "Before your fires. The man with the fur on his neck. He carried a calf over his shoulders like a shepherd, and put it down the well." She shows you, with her hands. "I thought, they'll kill each other for that. I thought, good."

She looks past you at the bhederin, and the Rhivi children asleep on their backs.

"Then I thought, the cows will die. The cows did nothing."`,
      ch:[{t:'"Thank you, mother."', fx:()=>{ ally(0, -1, 'An old woman\'s word'); }, go:()=>startExplore()}, {t:'Leave her to her doorway.'}]}),
    b3_c5_confront:()=>({sp:'The man in the fur collar', txt:
`He is where he was, with his two hired swords behind him, as if none of it had anything to do with him. Perhaps he thinks it hasn't. Men in Kallor's colours do not, as a rule, expect to be asked anything.

"Marines." Pleasantly. "A bad business. I did warn you: everyone wants that well."${S.f.b3_c5_ev === 1 ? `

You show him the knife. He looks at the bright filing on the hilt for a long moment, and the smile stays where it is, but something behind it has started counting.` : ''}${S.f.b3_c5_wit ? `

Across the green the old woman in the doorway is watching. He follows your eyes to her, and his own go flat.` : ''}${b3In('ellis') ? `

Ellis has come up on his left without anyone seeing her do it. She is watching his hands, not his face. The Claw taught her which one lies first.` : ''}`,
      ch:[{t:'"You put the calf down the well. Say it, in front of them."', check:['guile', 14], req:()=>!S.f.b3_c5_pressed, fx:()=>{ S.f.b3_c5_pressed = 1; },
            edges:()=>[S.f.b3_c5_ev === 1 && ['the knife with the fresh filing', 2], S.f.b3_c5_wit && ['an old woman saw him do it', 2], S.f.b3_c5_inc === 'cut' && ['there is blood on the ground and everyone is watching', 1]],
            near:{fx:()=>{ const t0 = b3Trust(); ally(-1, 0, 'Yes, but he takes his time getting there, and on the way he says, pleasantly, for the Rhivi to hear, that Malazans are only tidier thieves than he is');
              if (b3Trust() === t0) { const w = ROLL().who || 'sgt'; S.rattled ??= {}; S.rattled[w] = 1; note(`Yes, but he takes his time getting there, and the smile he gives ${NAME(w)} at the end of it stays with them: −1 on the next check.`, 'bad'); } }},
            go:'b3_c5_talked', fail:'b3_c5_draw'},
          {t:'"Take him."', go:()=>startBattle('b3_c5_wellfight')},
          {t:'Not yet.'}]}),
    b3_c5_draw:()=>({sp:'The man in the fur collar', txt:
`He laughs. "Say it? I'll say this: the High King's men answer to the High King, and not to a marine sergeant with a dead calf." He steps back, and his hand goes to his hilt, and behind him his two hired swords come out of their slouch like dogs off a chain. "Go and tell Dujek a Rhivi cow fell down a well. Go on."

The Fourth does not move out of his way.`,
      ch:[{t:'Take them.', go:()=>startBattle('b3_c5_wellfight')}]}),
    b3_c5_talked:()=>({sp:'The man in the fur collar', fx:()=>{ S.f.b3_c5_caught = 'talked'; }, txt:
`He looks round: at the Fourth, at the Fourth Regiment with their bandages, at the Rhivi with their knives put away but not far away, at ${S.f.b3_c5_wit ? 'the old woman in the doorway' : 'the dark beyond the light, where nothing will help him'}. His two hired swords have already decided they were never with him.

"The High King wished to know how easily Malazans and Rhivi fall out," he says at last, in the same pleasant voice. "Very easily, it turns out. I'll tell him so." He holds out his wrists, mocking. "If I'm let."`,
      ch:[{t:'Bind him.', go:'b3_c5_key'}]}),
    b3_c5_after_wellfight:()=>({sp:'The well', fx:()=>{ S.f.b3_c5_caught = 'fought'; }, txt:
`His hired swords are down, one of them for good. The man in the fur collar is on his knees in the mud by the well with his blade a long way off, alive, which seems to surprise him more than anything else tonight.

The halt has gone very quiet. The Fourth Regiment is watching. The Rhivi are watching. Somewhere out in the dark the bhederin are lowing, thirsty still.`,
      ch:[{t:'Bind him.', go:'b3_c5_key'}]}),

    /* ---- the key: what happens to Kallor's man ---- */
    b3_c5_key:()=>({sp:'The man in the fur collar', txt:
`He sits with his back against the well-head and his hands tied in front of him, and he has stopped smiling, mostly. The Fourth Regiment is watching. The Rhivi are watching. Whiskeyjack, on his bucket by the dead tree, is watching, and has not said a word, which means it is yours.

You have ${c5ProofWords()}.

You could walk him across the halt to Caladan Brood's fire tonight and say it there, in order, in front of Brood and Korlat and whoever else is sitting at it. Everyone would know whose man he is, then. Everyone would know whose sergeant said so.

Or you could settle it here, among soldiers. A broken nose, his own lines by morning, the truth told quietly at both fires, and no names said aloud. The well shared. Nobody's name in anybody's mouth.${b3In('ellis') ? `

Ellis says one sentence: "The Claw would do it quietly." You can't tell from her voice whether that is for it or against.` : ''}${b3In('vell') ? `

"In the Daru District," Vell says, "you'd settle it on a roof, and he'd walk home." He thinks about it. "Mostly."` : ''}`,
      ch:[{t:'"Brood\'s fire. Tonight."', fx:()=>{ S.f.b3_c5_key = 'brood'; }, go:'b3_c5_brood'},
          {t:'"Here. Among soldiers. No names."', fx:()=>{ S.f.b3_c5_key = 'quiet'; }, go:'b3_c5_quiet'},
          {t:'"Not yet. Hold him."'}]}),
    b3_c5_brood:()=>({sp:'Caladan Brood\'s fire', scene:'b3_c5_camp', fx:()=>{ S.f.b3_kallor = 1; }, txt:
`Whiskeyjack gets up off the bucket when you bring the man past him. It costs him; he doesn't quite let it show. "I'll walk with you," he says, and does, all the way across the halt, at the man's pace, which is slow, because Whiskeyjack's is.

Caladan Brood's fire is the biggest in the halt and has the fewest people round it. Brood sits beside it on a saddle with the hammer leaning on his knee like a walking stick, and does not get up. Korlat stands at his shoulder, tall and dark and very still, and inclines her head to Whiskeyjack, and then, after a moment, to you.

You tell it. In order, and only what you saw: the two lines at the well, the story at each fire, the dead calf, ${c5Proof().length ? c5ProofWords() + ', ' : ''}the man with the fur collar watching from the edge of the light.

Brood listens to all of it. He doesn't move at all while he listens, and when you have finished he still doesn't, for long enough that you begin to wonder if he heard.

"Korlat," he says.

"It is as the sergeant says, I think." Her voice is low and grave and courteous, as if you had brought her a gift. "We have heard that story at our own fires. We did not hear where it began." She looks at the man on his knees. "Now we have."`,
      ch:[{t:'"He\'s yours, sir."', go:'b3_c5_brood_kallor'}]}),
    b3_c5_brood_kallor:()=>({sp:'Kallor', scene:'b3_c5_camp', fx:()=>{ S.f.b3_kallorEnemy = 1; ally(3, 0, 'Brood heard it from the Fourth'); c5Loy('sohra', 1); }, txt:
`"Mine, I think."

He has come into the firelight without anyone hearing him, which in a man that size should not be possible: tall, grey-bearded, the fur collar on a long cloak, and under it armour that was old when the Empire was young. ${S.f.b3_kallorSaw ? `You have seen him before, in the dark by a Rhivi tent outside Pale. He has seen you.` : `${b3In('tuft') ? `Tuft has a name for him that isn't Kallor: *the tall man.* You see now why it was enough.` : `You have heard about him since Pale. None of it was enough.`}`}

Kallor looks at the man on his knees the way you would look at a spilled cup.

"A fool," he says. "I keep a great many. They are cheaper than wise men, and they tell me what the other fools are saying." To Brood, with no change in his voice: "Whatever he did at your well, Warlord, he did without my word. Hang him if you like. I shan't miss him." And to you, last, and only for a moment: "Malazan."

That is all. His eyes go over you once, as if writing your face down somewhere it will keep, and then he is gone out of the light the way he came, and the man on his knees is staring after him with his mouth open, as if he has only now understood something.

Brood watches him go. "I have known Kallor," he says, "longer than your Empire has had a name." He lifts the hammer and lays it across his knees. "Go and sleep, Sergeant. The well is the Rhivi's and the Host's. Both. Tonight, and every night to the sea."`,
      ch:[{t:'Walk back with Whiskeyjack.', go:'b3_c5_brood_after'}]}),
    b3_c5_brood_after:()=>({sp:'Whiskeyjack', scene:'b3_c5_camp', fx:()=>{ S.f.b3_c5_broodBack = 1; }, txt:
`Whiskeyjack walks back across the halt beside you at his own pace, which is slower than it was at Pale, and is a good way across before he speaks.

"Good," he says at last.

Then, a few steps on, not looking at you: "He'll remember you. Mind it." A few steps more. "He remembers me."

He sits down on his bucket by the dead tree as if the walk had been nothing, and lays the sword across his knees, and goes back to watching the well.`,
      ch:[{t:'Back to the Fourth\'s fire.', go:()=>startExplore()}]}),
    b3_c5_quiet:()=>({sp:'Behind the smithy wall', fx:()=>{ ally(1, 0, 'Settled among soldiers'); }, txt:
`It's done the old way, behind the wall where the village's smithy stood, with a lantern on the ground and nobody watching who doesn't need to.

${c5Brisk() ? `Brisk breaks his nose. She does it once, carefully, the way she does everything, and then hands him a rag for it.` : `You break his nose. Once, carefully. Then you hand him a rag for it.`} "Back to your own lines," you tell him. "Tonight. Tell whoever sent you the Malazans and the Rhivi drank from the same bucket. Tell him nobody asked your name."

He goes, holding the rag to his face. ${S.f.b3_c5_caught === 'fought' ? `The one hired sword still on his feet goes with him.` : `His two hired swords go with him, three paces behind, the way men walk behind a man they have just stopped working for.`}

Then the truth goes round the two fires sideways: a word to the Fourth Regiment's corporal, a word to the herd-mother${b3In('sohra') ? `, Sohra singing it to the bulls in Rhivi so that every herdsman in earshot hears` : ''}, nobody's name in it. By midnight the bad water is poured out in the ditch, the bhederin are drinking out of a trough the Fourth Regiment knocked together from a cart-bed, and Tav is standing on a barrel singing to them, badly.`,
      ch:[{t:'Back toward the fire.', go:'b3_c5_quiet_after'}]}),
    b3_c5_quiet_after:()=>({sp:'The Rhivi fires', txt:
`It holds. The well holds, and the night holds, and nobody at either fire says the word *poison* again.

Walking back past Brood's side of the halt, though, you hear the other thing anyway: at the Rhivi fires, at the Barghast's, at a Tiste Andii's, said low. The Malazans mean to take Coral for the Empress. The Malazans will march hard and leave Brood's people to bleed behind them. Nobody can say where they heard it, and nobody ever can.${b3In('sohra') ? `

Sohra listens to it for a while from the herd-lines and comes back with her mouth tight. "One fool goes home with a broken nose," she says, "and the story stays at the fire. Stories are cheap to feed."` : ''}`,
      ch:[{t:'The fire.', go:()=>startExplore()}]}),

    /* ---- the Fourth's fire ---- */
    b3_c5_fire:()=>({sp:'The Fourth\'s fire', txt:
`The squad has a fire going in the lee of a broken wall, with the rest of the halt spread out round it in the dark, a thousand small fires across a dead village. ${S.f.b3_c5_key ? `The well is quiet now. Somewhere Tav is singing.` : S.f.b3_c5_inc ? `Over by the well, nobody is drinking.` : `Over by the well, two lines are getting longer.`}

${c5FireLine()}`,
      ch:[{t:'Rest by the fire.', req:()=>!S.f.b3_c5_rested, fx:()=>{ S.f.b3_c5_rested = 1; }, go:'b3_c5_fire_rest'},
          {t:'Send to the Grey Swords\' lines for Dannet.', req:()=>b3Waiting('greysword'), go:'b3_c5_swap'},
          {t:'Send to the Rhivi fires for Sohra.', req:()=>b3Waiting('sohra'), go:'b3_c5_swap'},
          {t:'"Kettle. You\'ve been counting something."', req:()=>b3In('kettle') && !S.f.b3_c5_quorls, go:'b3_c5_quorls'},
          {t:'Sit the night out.', req:()=>!!S.f.b3_c5_key, go:'b3_c5_close'},
          {t:'Not now.'}]}),
    b3_c5_fire_rest:()=>({sp:'The Fourth\'s fire', fx:()=>{ b3Rest('The Fourth rests in the lee of a broken wall, with the Host round it and the Domin all round that. Wounds close, mostly.'); }, txt:
`An hour. Boots off, for the first time since the ford. ${b3In('ohl') ? `Ohl makes the tea, which is worse than usual, because the water is. Nobody complains, because complaining is drinking it slower.` : `Tea gets made, and it is bad, because the water is.`}${b3In('sohra') ? ` Sohra sings under her breath to nothing anyone else can see, and the fire burns a little steadier for it, or seems to.` : ''}${b3In('ellis') ? ` Ellis takes her boots off last, and sits with the gloved hand in her lap, and is asleep sitting up before the fire has settled.` : ''}${b3In('vell') ? ` Vell unwraps the hook, dries it one tine at a time, and wraps it again in its rag.` : ''}

It isn't much. In the Domin, it's what there is.`,
      ch:[{t:'Up again.'}]}),
    b3_c5_swap:()=>({sp:'The Fourth\'s fire', txt: b3Waiting('greysword') ?
`Dannet has been walking with the Grey Swords since the river, a mile back along the column, waiting to be asked. She comes when she's sent for, the half-painted wolf on her shield, and stands just outside the firelight. "Sergeant," she says. "The Domin's my country, more than yours. I'd as soon walk it with you."` :
`Sohra has been riding with her own people since the river, a mile up the column, waiting to be asked. She comes when she's sent for, and sits down on her heels by the fire. "The Malazans are a slow herd," she says. "But they are mine. They will need bringing in."`,
      ch:[{t:'"Walk with us."', fx:()=>{ b3SwapIn(b3Waiting('greysword') ? 'greysword' : 'sohra'); }, go:()=>startExplore()},
          {t:'"Not yet. Soon."', go:()=>startExplore()}]}),
    b3_c5_quorls:()=>({sp:'Kettle', fx:()=>{ S.f.b3_c5_quorls = 1; c5Loy('kettle', 1); }, txt:
`Kettle came back from the edge of the halt after dark with her hands in her armpits and a look on her face you have seen before, when a count came out wrong.

"Quorls," she says. "I count them when they come down at dusk. I always count them." She sits. "Thirty-one came down tonight. Twenty-six at dawn yesterday, and nineteen the night before, and the number's never the same twice." She stares at the fire. "The Moranth don't do anything twice without a reason, Sergeant. And they never come back the way they go out."

She takes out the ledger and writes it down, small and neat, under the munitions.

"Somebody'll want that," she says. "One day. You'll see."`,
      ch:[{t:'"Put it in the ledger."'}]}),
    b3_c5_close:()=>({sp:'The Fourth\'s fire', html:allyHTML('South of the Catlin · a week into the Domin'), txt:
`Late. The bhederin have drunk and settled. The Fourth Regiment's cart has gone back to its lines with the barrels full. Somewhere in the dark Tav has stopped singing, which means somebody has finally asked him to.

${c5CloseLines()}

The Domin goes on south to the edge of sight, and past it. Somewhere at the end of it is Coral, and the Seer, and nobody in the Host has seen either. You count the Fourth, the way you always do. ${numw(c5Count(), true)}. You count twice.`,
      ch:[{t:'Sleep. Coral is south.', go:()=>chapterEnd(5, S.f.b3_c5_key || 'quiet')},
          {t:'Not yet.'}]}),
  },
};

/* the first halt's choices (the start node and the talks off it share them) */
function c5StartCh(){ return [
  b3DeckChoice(5),
  {t:'"Ohl. What is it?"', req:()=>b3In('ohl') && !S.f.b3_c5_askOhl, go:'b3_c5_start_ohl'},
  {t:'"Sohra. You haven\'t said a word since the ford."', req:()=>b3In('sohra') && !S.f.b3_c5_askSohra, go:'b3_c5_start_sohra'},
  {t:'"Dannet. How far is it like this?"', req:()=>b3In('greysword') && !S.f.b3_c5_askDannet, go:'b3_c5_start_dannet'},
  {t:'Walk the shore.', go:()=>startExplore()}]; }

/* who is at the fire, before the well is settled */
function c5FireLine(){
  if (S.f.b3_c5_key) return b3In('tuft') ? `Tuft is sitting a little apart, looking across the halt toward the Rhivi fires, where a girl sits with her back very straight among people who do not sit near her.` : `The squad sits close, and the talk is short.`;
  if (b3In('kettle') && !S.f.b3_c5_quorls) return `Kettle comes in from the edge of the halt with her hands tucked in her armpits and the look she gets when a count comes out wrong.`;
  if (b3In('ohl')) return `Ohl has his book out on his knee, and is not writing in it.`;
  return `The squad sits close round it, and keeps its boots on.`;
}

/* the last night: a line from each of the squad who is here */
function c5CloseLines(){ const f = S.f, out = [];
  if (b3In('brisk')) out.push(f.b3_c5_key === 'brood' ? `Brisk writes in the ledger by the last of the fire. *One well. Shared. One man to Brood's fire.* Then, smaller, under it: *Kallor.* She looks at the word for a while, and doesn't cross it out.` : `Brisk writes in the ledger by the last of the fire. *One well. Shared. No names.* She looks at it a while. "No names," she says. "That's the bit that'll come back. You watch."`);
  if (b3In('kettle')) out.push(f.b3_c5_quorls ? `Kettle is asleep sitting up, with the ledger open on her knee at the page with the quorls on it.` : `Kettle counts the satchel by touch, under her breath, and arrives at the same number twice, and seems disappointed.`);
  if (b3In('tuft')) out.push(`Tuft is looking across the halt at the Rhivi fires. "She's older again," she says, to nobody. "Every time I look. She's as tall as a grown woman now." She doesn't look away. "Her own people won't sit near her."`);
  if (b3In('ohl')) out.push(f.b3_c5_orley ? `Ohl has the list open. He has turned back to the ford: *Orley.* He reads the name, and the ones above it, all the way up, with his lips moving.` : `Ohl has the list open on his knee and reads it with his lips moving, all of it, ${b3ListWords()}.`);
  if (b3In('ellis')) out.push(f.b3_c5_key === 'brood' ? `Ellis sits with her back to the wall, where she can see Kallor's tents and the way out of the halt both. "Both," she says, when she sees you see. "I like to know where the door is. And where he is."` : `Ellis sits with her back to the wall, facing the halt, with the bow across her knees, which is what she does instead of sleeping.`);
  if (b3In('vell')) out.push(`Vell lies on his back with the coil under his head, looking up. "Clear sky," he says. "All the way to the sea, I'd bet." He is asleep before anyone takes the bet.`);
  if (b3In('sohra')) out.push(`Sohra sings to the bulls, low, from among them. Somewhere in it, you're nearly sure now, is the Mhybe's name.`);
  if (b3In('greysword')) out.push(`Dannet has the pot of grey paint out and is working on the wolf on her shield, a stroke at a time, by firelight. It is still not finished. "When I know what it's for," she says, when she sees you looking.`);
  if (f.b3_c5_key === 'brood') out.push(`Across the halt, Kallor's tents are dark. You don't look at them. You find you know exactly where they are anyway.`);
  return out.join('\n\n'); }
