/* ============ Book Three, Chapter 2: The Rhivi Plain ============ */
/* Six weeks south-east from Pale toward Capustan with the Rhivi herds, Brood's contingents and the Host's wagons. Paran's
   Bridgeburners peel off east for the Barghast (seen going, never followed), and Mallet goes with them. A Rhivi outrider dead in a
   wallow, and strides too long for anything (S.f.b3_khell). Pannion eyes on a Barghast hill. A night raid on the herd lines. Then a
   river in spring spate, and the flood takes the choice out of the sergeant's hands but one.
   Key (S.f.b3_c2_key): 'herd' (the squad goes into the water for the Rhivi herd and the children riding it: trust +2, dread −1, a salve
   lost, Sohra calls the sergeant herd-mother) or 'wagons' (the squad holds the Host's supply wagons on the ford, with Tav's company:
   a sharper, a burner and a salve saved, trust −1).
   New here: Moranth Hand-Talk (a trick, below), the Rhivi spirit-bundle (a bearer the dread cannot shake), and B3DECK[2].
   Every id carries b3_c2_; flags are S.f.b3_c2_* unless the book brief fixes them (b3_khell, b3_legSeen, b3_herdMother). */
/* FOR THE ARTIST (62b): the names this file uses.
   Items (ART['item/<key>']): b3_c2_hornbow, b3_c2_bundle, b3_c2_mace.
   Figures (FIGX): b3_c2_betakullid (all three Betakullid foes and the captain), b3_c2_child (the Rhivi child at the ford);
     b3_c2_bhederin is drawn but only appears in the ground's 'h' tiles. Shelf figures used: wj, mallet, paran, trotts, korlat,
     tav, hurlochel, mhybe, silverfox, kallor, b3_moranth, b3_rhivi_rider, b3_barghast, rhivi, seerdomin, bruiser, b2soldier.
   Ground (TILEX): b3_c2_plain (column, far grass, river, and the hill/herd/wagon fights), b3_c2_plain_night (the night camp
     and the herd-lines fight); characters used: . , h = F W ~ - # >.
   Backdrops (SCENEX): b3_c2_herds, b3_c2_flood, b3_c2_strides. */

/* ---- small helpers ---- */
const c2L = (id, n) => { if (b3In(id)) loy(id, n); };
/* the tall man, by name once Chapter 1 has named him */
const c2K = (cap) => { const k = S.f.b3_kallor ? 'Kallor' : 'the tall man in the fur-collared cloak'; return cap ? k[0].toUpperCase() + k.slice(1) : k; };
/* how many of the Fourth are left of the Fourth (the sergeant and Book One's own, never a recruit), for the people who count them */
const c2Fourth = () => 1 + ['brisk', 'kettle', 'tuft', 'ohl', 'ellis', 'vell'].filter(k => b3In(k)).length;
const c2Five = () => { const n = c2Fourth(); return n === 5 ? 'All five' : numw(n, true); };
/* Brisk's letter: open on a fresh start, or sealed if a Book One import never opened it */
const c2Sealed = () => !!(S.imported && b3Was('c7_letter') !== 'brisk');
/* Sohra joins at the start if Chapter 1 did not bring her (on 'crate' she rides in with a sour word); with no room she rides with
   the Rhivi instead (b3Join notes it). Run when the start node is built, so its text already knows. */
function c2Join(){ if (S.f.b3_c2_joinDone) return; S.f.b3_c2_joinDone = 1;
  if (!b3In('sohra') && !b3Waiting('sohra') && !(S.dead && S.dead.sohra)) { S.f.b3_c2_sohraLate = 1; b3Join('sohra'); } }
/* what the Fourth may do at the wallow: sing him home, carry him, mark him and go, take his bow; and leave */
const c2Wallow = () => [
  {t:'"Sohra. Sing him home."', req:()=>b3In('sohra') && !S.f.b3_c2_sang, fx:()=>{ S.f.b3_c2_sang = 1; ally(0, -1, 'A song by the stream'); c2L('sohra', 1); }, go:'b3_c2_sing'},
  {t:'Carry the rider back to his clan across a saddle.', req:()=>!S.f.b3_c2_carried && !S.f.b3_c2_left && !S.f.b3_c2_kin, fx:()=>{ S.f.b3_c2_carried = 1; ally(1, 0, 'The rider, home to his clan'); c2L('sohra', 1); c2L('brisk', 1); }, go:'b3_c2_carry'},
  {t:'Mark the place for his kin, and press on east while the trail is fresh.', req:()=>!S.f.b3_c2_carried && !S.f.b3_c2_left && !S.f.b3_c2_kin, fx:()=>{ S.f.b3_c2_left = 1; c2L('kettle', 1); }, go:'b3_c2_leave'},
  {t:'Take the bow lying beside him. He has no more use for it.', req:()=>!S.f.b3_c2_tookBow && !S.f.b3_c2_carried && !S.f.b3_c2_kin, fx:()=>{ S.f.b3_c2_tookBow = 1; gain('b3_c2_hornbow'); ally(-1, 0, 'A dead man\'s bow'); c2L('sohra', -1); }, go:'b3_c2_bow'},
  {t:'Leave the wallow.', go:()=>startExplore()}];
/* who in the Fourth goes first, for a line: the first of these in the squad, else the sergeant */
const c2First = (...ids) => ids.find(k => b3In(k)) || 'sgt';

/* ---- Moranth Hand-Talk: the signs the Black Moranth make to the ground from a quorl, and the ground makes back ---- */
Object.assign(TRICKS, {
  b3_c2_hand:{name:'Moranth Hand-Talk', ch:2, use:'fight', ab:'t_b3_c2_hand', where:'the quorl lines at dusk, on the Rhivi Plain',
    lore:'The Black Moranth talk without sound: a hand flat, a hand turned, two fingers drawn down the chitin of the forearm. It is how a rider on a quorl tells the ground what it sees, and how the ground tells the rider where to put a quarrel.',
    get fx(){ return `Once a fight, and it does not use the bearer's action: sign an enemy within 8 to the Black Moranth overhead. A quarrel comes down on it out of the sky (1d6${lvDmg() ? '+' + lvDmg() : ''}), and the squad hits it +${2 + lvT()} through the next round. Grows with level.`; }},
});
Object.assign(AB, {
  t_b3_c2_hand:{name:TRICKS.b3_c2_hand.name, trick:'b3_c2_hand', free:true, desc:()=>TRICKS.b3_c2_hand.fx,
    tiles:u=>foes().filter(f => cheb(u, f) <= 8 && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; t.b3HandUntil = B.round + 1; t.b3HandBonus = 2 + lvT();
      AUDIO.play('click'); float(t, 'spotted', '#c8d4e0'); sparks(t.x, t.y, 12, '#9aa4ac', .5);
      blog(`${u.name} lifts a hand, flat, and turns it, and draws two fingers down a forearm that has no chitin on it. High up, something black tilts its wings, and a quarrel comes down out of the sky into ${t.name}. Nobody saw the quorl. That is the point of quorls.`);
      hurt(t, roll(1, 6, lvDmg())); }},
});
/* the spotted enemy is easier to hit; the spirit-bundle keeps its bearer's nerve (Book Three only) */
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (!b3On() || !B || !a) return c;
    if (a.side === 'p' && t && t.b3HandUntil >= B.round) c.bonus += t.b3HandBonus || 2;
    if (a.side === 'p' && !a.ally && Object.values((S.gear || {})[a.id] || {}).includes('b3_c2_bundle') && (B.b3Mind === 'haunted' || (B.b3Mind === 'shaken' && B.round <= 2))) c.bonus += 1;
    return c; }; }

/* ---- the reading at the first halt (60c) ---- */
B3DECK[2] = {scene:'b3_c2_herds', where:'a bhederin hide pegged flat on the grass', set:'The noon halt on the first week out of Pale, the herds grazing off to the north like a second, slower army.',
  back:()=>startExplore(), backT:'Back to the column.',
  say:{tuft:`"Six weeks of grass," she says. "The Deck hates grass. Nothing to hide behind." She shuffles anyway, without looking at her hands. "One card, Sergeant. For the plain."`,
    sohra:`"On the plain we read in the open," she says, "so the sky can see what we are asking it." She shakes the bones in her fist. "Sit downwind. The smoke does not like Malazans."`,
    benna:`Old Benna rides the laundry wagon two lines back and has walked up the column for the coppers. "Hold the hide down," she says. "The wind out here takes everything. Took my second-best shift on the first day."`}};

const B3CH2 = {
  title:'The Rhivi Plain', number:'Two',
  intro:{loc:'The Rhivi Plain', sub:'South-east from Pale · spring', scene:'b3_c2_herds', cap:'Grass to the edge of the world, two armies on it, and the herds between them like weather.',
    paras:[
`On the road from Pale, Onearm's Host goes south-east to join the ranks of Caladan Brood's army: ten thousand veterans who spent ten years trying to kill the people they are now marching beside, and who have not yet worked out where to look.`,
`The Rhivi go with their herds. The bhederin cover the plain to the north in a brown tide that moves at its own pace, and the column moves at that pace too, because nobody, not the Warlord, not the High Fist, has ever hurried a bhederin.`,
`Capustan is six weeks off, Brood's people say. Something called the Pannion Domin is in front of it. You have been told what the Domin is. You have been told it the way you are told about a country nobody in the army has seen.`],
    go:'Walk', node:'b3_c2_start'},

  areas:[
    /* 16 x 12.  . grass  , long grass  h the herds  = tent  F fire  W wagon  > east  */
    { id:'b3_c2_column', title:'The Rhivi Plain · the column', sub:'Day · the first week out of Pale', hint:'Tap ground to move · tap a figure to talk · east, when the squad goes out', decor:'b3_c2_plain',
      map:[ "################",
            "#hhh,,..hhh,,hh#",
            "#hh,....,hh...h#",
            "#,....=.....,..#",
            "#..=..=...F....#",
            "#.........,....#",
            "#..W..W....=...>",
            "#.,.....,......#",
            "#....F....W..,.#",
            "#.W.....,....=.#",
            "#,,..,....,,..,#",
            "################" ],
      walk:'.,', triggers:{h:'b3_c2_herd', W:'b3_c2_wagons', '>':'b3_c2_to_far'}, start:{x:7, y:7},
      quest:()=> !S.f.b3_c2_bb ? 'Whiskeyjack is by the road. Something is leaving.' : !S.f.b3_c2_hurl ? 'Hurlochel the outrider wants the Fourth. He is by the wagons.' : 'East, with Hurlochel, when the squad is ready.',
      npcs:[
        {id:'c2wj', name:'Whiskeyjack', kind:'wj', x:12, y:5, node:()=>S.f.b3_c2_bb ? 'b3_c2_wj_again' : 'b3_c2_bb', fresh:()=>!S.f.b3_c2_bb},
        {id:'c2mallet', name:'Mallet', kind:'mallet', x:13, y:5, node:()=>'b3_c2_bb', show:()=>!S.f.b3_c2_bb || /^b3_c2_(bb|mallet|paran)/.test(S.node || '')},
        {id:'c2paran', name:'Captain Paran', kind:'paran', x:13, y:7, node:()=>'b3_c2_bb', show:()=>!S.f.b3_c2_bb || /^b3_c2_(bb|mallet|paran)/.test(S.node || '')},
        {id:'c2trotts', name:'Trotts', kind:'trotts', x:14, y:7, node:()=>'b3_c2_bb', show:()=>!S.f.b3_c2_bb || /^b3_c2_(bb|mallet|paran)/.test(S.node || '')},
        {id:'c2korlat', name:'Korlat', kind:'korlat', x:11, y:5, node:()=>'b3_c2_korlat', show:()=>!!S.f.b3_c2_bb, fresh:()=>!!S.f.b3_c2_bb && !S.f.b3_c2_korlat},
        {id:'c2tav', name:'Tav', kind:'tav', x:4, y:7, node:()=>S.f.b3_c2_tav ? 'b3_c2_tav_again' : 'b3_c2_tav', show:()=>b3In('brisk'), fresh:()=>b3In('brisk') && !S.f.b3_c2_tav},
        {id:'c2bole', name:'A Mott Irregular', kind:'bruiser', x:9, y:3, node:()=>S.f.b3_c2_mott ? 'b3_c2_mott_again' : 'b3_c2_mott', fresh:()=>!S.f.b3_c2_mott},
        {id:'c2qm', name:'The quartermaster\'s clerk', kind:'b2soldier', x:10, y:9, node:()=>'b3_c2_qm', fresh:()=>!S.f.b3_c2_qm},
        {id:'c2hurl', name:'Hurlochel', kind:'hurlochel', x:12, y:8, node:()=>'b3_c2_hurl', fresh:()=>!S.f.b3_c2_hurl} ] },

    /* 16 x 12.  . grass  , long grass  # the Barghast hill's stones  ~ a stream (blocks)  - the wallow  > the hill, east */
    { id:'b3_c2_far', title:'The Rhivi Plain · the far grass', sub:'Day · two weeks out · the outriders\' country', hint:'Tap ground to move · tap a figure to talk · the hill is east', decor:'b3_c2_plain',
      map:[ "################",
            "#,,..,....,###.#",
            "#,..,...,..###.#",
            "#...,......,#..#",
            "#..,..........,#",
            "#~~~..,........#",
            "#~~~~~.....,...>",
            "#.,~~~--.......#",
            "#....~--,..,...#",
            "#,..,.~~.....,.#",
            "#,,....~~..,,..#",
            "################" ],
      walk:'.,-', triggers:{'-':'b3_c2_strides', '>':'b3_c2_to_hill'}, start:{x:3, y:3},
      quest:()=> !S.f.b3_khell ? 'Hurlochel says the rider went down by the stream.' : !S.f.b3_c2_hillDone ? 'The hill to the east, with the stones on it. Somebody is up there.' : 'Back to the column. It will have made camp by dark.',
      npcs:[
        {id:'c2hurl2', name:'Hurlochel', kind:'hurlochel', x:5, y:4, node:()=>'b3_c2_hurl2', fresh:()=>!!S.f.b3_khell && !S.f.b3_c2_hurl2},
        {id:'c2kin', name:'A Rhivi rider', kind:'b3_rhivi_rider', x:9, y:8, node:()=>S.f.b3_c2_kin ? 'b3_c2_kin_again' : 'b3_c2_kin', show:()=>!!S.f.b3_khell, fresh:()=>!!S.f.b3_khell && !S.f.b3_c2_kin} ] },

    /* 16 x 12.  . grass  , long grass  h the herd lines  = tent  F fire  W wagon */
    { id:'b3_c2_camp', title:'The Rhivi Plain · the night camp', sub:'Night · three weeks out · the herds lowing in the dark', hint:'Tap ground to move · tap a figure to talk · the fire, then the herd lines', decor:'b3_c2_plain_night', dark:true,
      map:[ "################",
            "#hhhh..hhhh,,hh#",
            "#hh.....hh.....#",
            "#..,..........,#",
            "#.=..F..=...=..#",
            "#.......,......#",
            "#..=.........=.#",
            "#,......,......#",
            "#..W....=..W...#",
            "#....,.........#",
            "#,,..W.....,,,.#",
            "################" ],
      walk:'.,', triggers:{F:'b3_c2_fire', h:'b3_c2_herdlines'}, start:{x:7, y:7},
      quest:()=> S.f.b3_c2_nightDone ? 'Morning. The column moves on toward the river.' : !S.f.b3_c2_rest ? 'The Fourth\'s fire. The Rhivi fires beyond it.' : 'The herd lines, when the squad takes its watch.',
      npcs:[
        {id:'c2mhybe', name:'The Mhybe', kind:'mhybe', x:12, y:5, node:()=>S.f.b3_c2_mhybe ? 'b3_c2_mhybe_again' : 'b3_c2_mhybe', fresh:()=>!S.f.b3_c2_mhybe},
        {id:'c2fox', name:'The child', kind:'silverfox', x:13, y:5, node:()=>S.f.b3_c2_mhybe ? 'b3_c2_mhybe_again' : 'b3_c2_mhybe'},
        {id:'c2kallor', name:'A tall man in a cloak', kind:'kallor', x:14, y:7, node:()=>'b3_c2_kallor', show:()=>!!S.f.b3_c2_mhybe && !S.f.b3_c2_kallor, fresh:()=>!!S.f.b3_c2_mhybe && !S.f.b3_c2_kallor},
        {id:'c2moranth', name:'A Black Moranth', kind:'b3_moranth', x:2, y:9, node:()=>'b3_c2_moranth', fresh:()=>!S.f.b3_c2_moranth},
        {id:'c2gran', name:'An old Rhivi woman', kind:'rhivi', x:7, y:3, node:()=>S.f.b3_c2_gran ? 'b3_c2_gran_again' : 'b3_c2_gran', fresh:()=>!S.f.b3_c2_gran},
        {id:'c2rumour', name:'A Host regular', kind:'b2soldier', x:6, y:9, node:()=>'b3_c2_rumour', fresh:()=>!S.f.b3_c2_rumour} ] },

    /* 16 x 12.  . grass  , long grass  ~ the river (blocks)  - the ford  h the herd on the far bank  W wagon  = tent  F fire  > on */
    { id:'b3_c2_river', title:'The Rhivi Plain · the river', sub:'Day · five weeks out · rain in the hills', hint:'Tap ground to move · tap a figure to talk · the ford', decor:'b3_c2_plain',
      map:[ "################",
            "#,,..hh..,,,...#",
            "#.,.hhhh...,,..#",
            "#~~~~~~----~~~~#",
            "#~~~~~~----~~~~#",
            "#..,.W..W...,..#",
            "#.......,..=...>",
            "#.,..=.........#",
            "#....,....,..,.#",
            "#,..=....F.....#",
            "#,,.....,,...,,#",
            "################" ],
      walk:'.,', triggers:{'-':'b3_c2_ford', W:'b3_c2_rwagons', '>':'b3_c2_onward'}, start:{x:7, y:8},
      quest:()=> S.f.b3_c2_floodDone ? 'The far bank tonight. On, toward Capustan.' : !S.f.b3_c2_key ? 'The ford. The herd is half across and the sky in the west is black.' : 'The water.',
      npcs:[
        {id:'c2mother', name:'A Rhivi herd-mother', kind:'rhivi', x:3, y:6, node:()=>S.f.b3_c2_mother ? 'b3_c2_mother_again' : 'b3_c2_mother', fresh:()=>!S.f.b3_c2_mother && !S.f.b3_c2_key},
        {id:'c2child', name:'A Rhivi child', kind:'b3_c2_child', x:4, y:6, node:()=>S.f.b3_c2_mother ? 'b3_c2_mother_again' : 'b3_c2_mother', show:()=>!S.f.b3_c2_key || S.f.b3_c2_key === 'herd'},
        {id:'c2tav2', name:'Tav', kind:'tav', x:9, y:6, node:()=>'b3_c2_rwagons', show:()=>b3In('brisk') && (!S.f.b3_c2_key || S.f.b3_c2_key === 'wagons')},
        {id:'c2wj2', name:'Whiskeyjack', kind:'wj', x:12, y:8, node:()=>'b3_c2_wj_river', fresh:()=>!S.f.b3_c2_wjRiver} ] } ],

  battles:{
    /* Pannion eyes on a Barghast hill: Betakullid at the foot, a Seerdomin among the inverted trees at the top */
    b3_c2_hill:{title:'The Barghast hill', style:'b3_c2_plain', open:true, warrenText:'Noon on the plain · the warrens clean, for now', warren:{meanas:1, denul:1}, music:'battle',
      map:["..#..,..","...,....",".#....#.","........","..,..,..","........",".,....,.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c2_betakullid',2,1],['b3_c2_betakullid',5,1],['b3_c2_betakullid',4,0],['b3_c2_betabow',1,0],['b3_c2_betabow',6,0]], xp:110, after:'b3_c2_after_hill',
      aid:{kind:'b3_rhivi_rider', at:[0,8], need:8},
      preText:()=>`Kettle's sharper goes off among the picketed horses at the foot of the hill, and the horses, who have had a long spring, decide they have had enough of it. Half the Betakullid spend the first moments of the fight watching their way home go north at a gallop.`,
      stage2:{title:'The inverted trees', xp:60,
        text:()=>`The foot of the hill is taken. Up among the stones the trees stand on their heads: oak trunks the thickness of a man, roots in the air like fingers, carved from the ground to the roots with things that are not letters. Barghast trees. Somebody has cut one down for firewood.
${b3In('sohra') ? `
"The Barghast will kill them for that," Sohra says. "If we do not." She nocks. "I would rather it was us. It is quicker."` : ''}
At the top, beside the fire they made of it, a man in grey with a long mace across his knees is getting up without any hurry at all.`,
        map:["#..##..#","........",".#....#.","...##...","........",".#....#.","........","..,..,..","........","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b3_c2_seer',3,1],['b3_c2_betakullid',0,1],['b3_c2_betakullid',5,1],['b3_c2_betabow',5,0]]} },
    /* the night raid on the herd lines: hold until the Rhivi are mounted, then the one who sent them */
    b3_c2_night:{title:'The herd lines', style:'b3_c2_plain_night', dark:true, open:true, warrenText:'Night on the plain · the warrens clean, for now', warren:{meanas:1, denul:1}, music:'battle',
      map:["........",".,....,.","..#.....","........","...,,...","........",".....#..","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c2_betakullid',1,0],['b3_c2_betakullid',6,0],['b3_c2_betakullid',4,1],['b3_c2_betabow',3,0]], xp:90, after:'b3_c2_after_night',
      aid:[{kind:'b3_rhivi_rider', at:[0,9], need:8}, {kind:'b3_barghast', at:[7,9], need:9}],
      objective:{type:'survive', rounds:3, text:'Hold the herd lines for three rounds, until the Rhivi are mounted.'},
      waves:[{round:2, foes:[['b3_c2_betakullid',0,4],['b3_c2_betabow',7,2]], text:'More of them out of the dark on the flank, where the calves are.'}, {round:3, foes:[['b3_c2_betakullid',7,5]], text:'One more, low and quick, for the gap between the squad and the herd.'}],
      preText:()=>`Kettle's smoker breaks in the long grass between the raiders and the herd, and the grey lies there in the starlight like a held breath. The bhederin will not go into it. Neither will the horses that were meant to drive them.`,
      stage2:{title:'The man in grey', xp:50,
        text:()=>`The Rhivi come up out of the dark at last, mounted, singing, and the raiders who are still on their feet decide the herd is somebody else's.

All but one. Back where the grass rises, a man in grey sits a tall horse and watches it go wrong, and then gets down off the horse, the way a man does who has decided to finish a thing himself. Three of his riders come back to stand with him.${b3In('sohra') ? `

"Seerdomin," Sohra says, very quietly. "That is what the word means. The Seer's own." She does not look frightened. She looks like a woman memorising a face.` : ''}`,
        map:["..,..,..","........",".#....#.","........","........","..,..,..","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_seerdomin',3,1],['b3_c2_betakullid',0,1],['b3_c2_betakullid',5,1],['b3_c2_betabow',4,0]]} },
    /* the flood, the herd's road: the riders who have shadowed the column since the hill come for the scattered herd and the children */
    b3_c2_herdfight:{title:'The far bank', style:'b3_c2_plain', open:true, warrenText:'Dusk after the flood · the warrens clean, for now', warren:{meanas:1, denul:1}, music:'battle',
      map:["--------","..,..,..","........",".#....#.","........","..,..,..","........",".#....#.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c2_betakullid',1,2],['b3_c2_betakullid',6,2],['b3_c2_betabow',2,1],['b3_c2_betabow',5,1]], xp:130, after:'b3_c2_after_herd',
      aid:{kind:'b3_rhivi_rider', at:[7,8], need:7},
      waves:[{round:2, foes:[['b3_c2_betakullid',0,5]], text:'Another one, out of the reeds on the flank, going for the children on the calf.'}],
      preText:()=>`Kettle's sharper lands in the wet reeds where they are bunching, and the reeds and the mud and everything in them go up together. Somebody comes out of it the wrong way round.`,
      stage2:{title:'The calves\' gully', xp:70,
        text:()=>`The bank is held. Up the gully the scattered calves have run into, the riders have found the last of them, and the two children still clinging to one, and a big man on foot with a heavy lance and a captain's plume is walking toward them as if he had all evening.${b3In('sohra') ? `

Sohra makes a sound you have never heard from her, and goes up the gully at a run.` : ''}`,
        map:["#......#","#.,..,.#","........","..#..#..","........","........",".#....#.","........","........","##....##"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c2_betacap',3,1],['b3_c2_betakullid',1,3],['b3_c2_betabow',6,1]],
        waves:[{round:2, foes:[['b3_c2_betakullid',7,4]], text:'A rider who went round comes back down the gully side, on foot, lance first.'}]} },
    /* the flood, the wagons' road: the same riders come for the wagons stuck on the near bank, and Tav's company stands with the squad */
    b3_c2_wagonfight:{title:'The wagon-ford', style:'b3_c2_plain', open:true, warrenText:'Dusk after the flood · the warrens clean, for now', warren:{meanas:1, denul:1}, music:'battle',
      map:["--------","--------","........","..#..#..","........","..,..,..","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c2_betakullid',1,2],['b3_c2_betakullid',6,2],['b3_c2_betabow',2,0],['b3_c2_betabow',5,0]], xp:130, after:'b3_c2_after_wagons',
      allies:[['b3_c2_heavy',1,7],['b3_c2_heavy',6,7]],
      waves:[{round:2, foes:[['b3_c2_betakullid',7,5]], text:'Another rider comes along the bank, low on his horse\'s neck, for the last wagon in the line.'}],
      preText:()=>`Kettle's sharper goes into the riders where they are coming down to the water, and the water, which has had a long day, throws a great deal of itself into the air. When it comes down, there are fewer of them.`,
      stage2:{title:'The last wagon', xp:70, keepAllies:true,
        text:()=>`The riders on the bank are down or running. The last wagon is not out: it is on its side in the shallows with the oxen cut loose, and the Betakullid captain has put himself on top of it with a heavy lance and a plume, and his people round it, as if a wagon of salt pork were a thing worth dying for. He seems to think it is. Perhaps it is.${b3In('brisk') ? `

"That's Tav's wagon," Brisk says. She doesn't raise her voice. She doesn't need to.` : ''}`,
        map:["--------","...##...","........","..#..#..","........","........",".,....,.","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c2_betacap',2,0],['b3_c2_betakullid',1,2],['b3_c2_betabow',6,0]],
        waves:[{round:2, foes:[['b3_c2_betakullid',0,4]], text:'One more out of the water, soaked to the chest, lance first.'}]} } },

  foes:{
    /* Betakullid: the Domin's horse, here on foot in the grass with their lances and short bows */
    b3_c2_betakullid:{name:'Betakullid rider', sig:'b', kind:'b3_c2_betakullid', hp:16, ac:13, atk:5, dmg:[1,8,2], rng:1, mv:5, init:2, sk:['reach'], verb:'drives a horse-lance at'},
    b3_c2_betabow:{name:'Betakullid archer', sig:'a', kind:'b3_c2_betabow', hp:12, ac:12, atk:5, dmg:[1,6,2], rng:5, mv:5, init:3, sk:['pin', 'hitrun'], verb:'looses a short horse-bow at'},
    /* the captain of the riders who shadow the column from the hill to the river */
    b3_c2_betacap:{name:'Betakullid captain', sig:'C', kind:'b3_c2_betacap', hp:38, ac:15, atk:6, dmg:[1,10,3], rng:1, mv:5, init:3, boss:true, sk:['reach', 'rally'], verb:'brings a heavy lance round on'},
    /* the Seerdomin on the Barghast hill: the Seer's own, with the grey sorcery behind his eyes */
    b3_c2_seer:{name:'The Seerdomin on the hill', sig:'Σ', kind:'seerdomin', hp:40, ac:15, atk:6, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['daze'], verb:'brings the long mace down on'},
    /* allies on the wagons' road: heavy infantry of the Fourth Regiment, Tav's company */
    b3_c2_heavy:{name:'Fourth Regiment heavy', sig:'h', kind:'b2soldier', hp:22, ac:16, atk:4, dmg:[1,8,2], rng:1, mv:3, init:1, verb:'puts a shortsword into'} },

  gear:{
    b3_c2_hornbow:{name:'A bhederin-horn bow', slot:'weapon', who:['sohra', 'kettle', 'ellis'], atk:1, rng:1, line:'A Rhivi bow of bhederin horn and sinew, short and doubled back on itself, the grip wrapped in hide worn dark by one hand. It belonged to a rider who went down by a stream in the far grass. It pulls like a mule.'},
    b3_c2_bundle:{name:'A Rhivi spirit-bundle', slot:'trinket', who:null, stat:{wits:1}, line:'A knot of grass, bone beads and a lock of bhederin hair, tied in red thread, the way the old women of the Mhybe\'s clan tie them for riders going into bad country. Whoever carries it is never shaken by the dread at a fight\'s start: no −1 to hit from it. Sohra says the spirits in it are not strong. She says they are stubborn, which is better.'},
    b3_c2_mace:{name:'A Seerdomin\'s grey mace', slot:'weapon', who:['sgt', 'brisk', 'greysword', 'vell'], dmg:[1,10,2], line:'A long-hafted mace of grey iron off the Seerdomin on the Barghast hill, flanged, heavy in the head, with a hand-grip worn smooth by somebody who used it more than he prayed with it. It is colder to hold than iron ought to be. Tuft will not say why.'} },

  scenes:{
    b3_c2_herds:{loc:'The Rhivi Plain', sub:'South-east from Pale', cap:'The herds and the two armies on the plain under a sky too big for any of them.', amb:'explore'},
    b3_c2_flood:{loc:'The river', sub:'Dusk · the spate', cap:'A river standing up out of its bed at dusk, brown and white and full of everything it has picked up on the way.', amb:'explore'},
    b3_c2_far:{loc:'The far grass', sub:'Two days east of the column', cap:'Grass and wind and sky and no column anywhere, and on the low hills, stones, and oak trunks planted upside down with their roots in the air.', amb:'wind'},
    b3_c2_hill:{loc:'The far grass', sub:'The Barghast hill', cap:'The stand trees along the crest, roots to the sky, one of them felled into a fire, and far off to the west the column, very small.', amb:'wind'},
    b3_c2_camp_night:{loc:'The Rhivi Plain', sub:'The night camp · moonrise', cap:'The Host\'s fires in long straight lines, the Rhivi\'s in rings round the herds, the Barghast\'s off to the south, and a big moon coming up off the grass.', amb:'night'},
    b3_c2_herds_dawn:{loc:'The Rhivi Plain', sub:'The herd lines · first light', cap:'The fires down to embers, dew grey on the grass, and the Rhivi walking slowly through the herd, counting.', amb:'explore'},
    b3_c2_ford:{loc:'The river', sub:'The ford · afternoon', cap:'A brown river running full, the herd going over at the ford with children riding the calves, the wagons waiting their turn, and up the river to the east a sky gone black.', amb:'explore'},
    b3_c2_flood_night:{loc:'The river', sub:'Night · after the spate', cap:'The river still high and loud in the dark, Rhivi fires along the far bank, and the wagons drawn into a ring on the near one.', amb:'night'},
    b3_c2_herds_rain:{loc:'The Rhivi Plain', sub:'South-east · the rains', cap:'The column going on across the plain under a lid of grey cloud, the herds on its flank, and far off in the east, hills with grey curtains of rain hanging under the cloud.', amb:'wind'},
    b3_c2_far_dusk:{loc:'The river', sub:'The far bank · dusk', cap:'The spate going by brown and loud, the wagons small on the other bank, the herd scattered through the reeds on this one with the children, and in the reeds on the right, riders who are not Rhivi.', amb:'explore'},
    b3_c2_far_night:{loc:'The river', sub:'The far bank · night', cap:'The river still high and black, the wagon ring\'s fires small on the other side of it, and on this bank the herd lying down in the reeds, the Rhivi mothers\' fires, and the Fourth\'s.', amb:'night'},
    b3_c2_strides:{loc:'The far grass', sub:'A wallow by a stream', cap:'A dead horse in the mud, and in the mud round it, tracks that should not be that far apart.', amb:'explore'} },

  end:{
    herd:['The herd came out', 'Six weeks across the Rhivi Plain. Paran\'s Bridgeburners went east to the Barghast, and Mallet with them, and the week Whiskeyjack never gave him went too. A Rhivi rider died by a stream in the far grass, and whatever killed him walks on two legs and strides like nothing alive. At the river the water came down out of the hills at dusk, and the Fourth went into it for the Rhivi herd and the children riding it. The Rhivi will remember. So will the Host\'s quartermaster.'],
    wagons:['The wagons came out', 'Six weeks across the Rhivi Plain. Paran\'s Bridgeburners went east to the Barghast, and Mallet with them, and the week Whiskeyjack never gave him went too. A Rhivi rider died by a stream in the far grass, and whatever killed him walks on two legs and strides like nothing alive. At the river the water came down out of the hills at dusk, and the Fourth held the Host\'s wagons on the ford with Tav\'s company. The Host will eat. The Rhivi watched from the far bank, and counted.'] },
  get endScene(){ return S && S.f && S.f.b3_c2_key === 'herd' ? 'b3_c2_far_night' : 'b3_c2_flood_night'; }, // the herd: the Fourth came out on the far bank
  endCap:()=> S.f.b3_c2_key === 'herd' ? 'The far bank at night. Rhivi fires, and children asleep against warm hide, and the river still loud in the dark.' : 'The near bank at night. The wagons in a ring, the Fourth Regiment\'s fires, and a big man somewhere among them singing badly.',
  tease:'Next: Capustan. The Barghast and the Bridgeburners get there first; the Host gets there after, with Brood, onto a field where something very large and black is in the sky.',

  extras:()=>{ const f = S.f, x = [];
    x.push(`Trust ${b3Trust()}, dread ${b3Dread()}, at the river.`);
    if (f.b3_c2_key === 'herd') x.push(`At the river the Fourth went into the flood for the Rhivi herd and the children riding it.${f.b3_herdMother ? ' Sohra calls the sergeant herd-mother now, once, when she thinks nobody else is listening.' : ''}`);
    if (f.b3_c2_key === 'wagons') x.push(`At the river the Fourth held the Host's wagons on the ford, with Tav's company. The Rhivi lost calves to the water. They know who was on the near bank.`);
    if (f.b3_c2_ohl) x.push('Ohl offered Whiskeyjack a night with Denul for the leg. Whiskeyjack said later. Ohl has written the word down, which he says is how you hold a man to it.');
    if (f.b3_c2_malletAsk) x.push('Mallet went east with the Bridgeburners and asked the sergeant to watch the leg. The sergeant is watching it.');
    if (f.b3_c2_carried) x.push('The Fourth carried a dead Rhivi outrider back to his clan across a saddle. The Rhivi noticed. The Pannion scouts on the hill noticed the delay.');
    if (f.b3_c2_tookBow) x.push('The Fourth took a dead Rhivi\'s bow from beside him in the mud. His clan has not said anything about it. That is not the same as forgetting.');
    if (f.b3_c2_sang) x.push('Sohra sang the dead outrider home by the stream, and the grass bent the way grass bends when something goes through it.');
    if (f.b3_c2_tree) x.push('The Fourth stood the Barghast tree back on its head on the hill. Somebody among the Ilgres heard of it before the night was out.');
    if (f.b3_c2_mottJug) x.push('A Bole of the Mott Irregulars shared his jug with the Fourth. Nobody has been quite well since.');
    if (f.b3_c2_collar) x.push('At the Rhivi fires the child put her hand to her own collar, where a cadre badge would be sewn, and looked at Tuft.');
    if (f.b3_c2_kallorLook) x.push(`${c2K(true)} looked at the sergeant across the Rhivi fires, the way you look at a face you have decided to remember.`);
    if (f.b3_c2_rumour) x.push('The Host says Quick Ben talked to Capustan one night from his tent, a hundred leagues off, with his eyes shut. The Host says a great many things.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b3_c2_floodDone && (f.b3_c2_key === 'herd' ? `At the river the flood came down at dusk, and the Fourth went into it for the Rhivi herd and its children, and fought the Pannion riders for them on the far bank.` : `At the river the flood came down at dusk, and the Fourth held the Host's wagons on the ford with Tav's company against the Pannion riders.`),
    f.b3_c2_nightDone && `Three weeks out, Betakullid raiders came for the herd lines at night, with a Seerdomin behind them.`,
    f.b3_c2_hillDone && `On a Barghast hill in the far grass, among the trees the Barghast stand on their heads, the Fourth found a Seerdomin and his Betakullid watching the alliance march.`,
    f.b3_khell && `A Rhivi outrider died by a stream in the far grass. In the mud round him were tracks like an eagle's, far too large, and far too far apart.`,
    f.b3_c2_bb && `On the first days out of Pale, Captain Paran took the Bridgeburners east toward the Barghast. Mallet went with them.`,
    `Onearm's Host marched south-east from Pale beside Caladan Brood's army, toward Capustan, at the pace of the Rhivi herds.`].filter(Boolean); },

  dlg:{}
};

/* ---------------- the column: the first week ---------------- */
Object.assign(B3CH2.dlg, {
  b3_c2_start:()=>(c2Join(), {sp:'The Rhivi Plain', scene:'b3_c2_herds', fx:()=>{ S.f.b3_c2_in = 1; }, txt:
`The first week.

The column learns the plain the way it learns any country, by walking on it until its feet know. Grass to the knee, then to the thigh, then to the knee again; a sky that starts at your boots and goes up for ever; and to the north, always, the herds, a brown tide on the move that you can hear before you see it, a sound like a city breathing.

${S.f.b3_c2_sohraLate && b3In('sohra') ? (S.f.b3_c1_key === 'crate' ? `Sohra finds the Fourth on the second morning, riding in from the herds on a dun horse with her bow across her knees. "The Mhybe says I am to watch the Malazans," she says. "I watched you at Pale. You went to fetch boxes." She gets down. "Next time she asks you to stand at her tent, stand at her tent." Then, because she is Rhivi and it is spring: "I have brought smoked meat. Not for you. For the one who does not complain."` : `Sohra finds the Fourth on the second morning, riding in from the herds on a dun horse with her bow across her knees. "The Mhybe says I am to watch the Malazans," she says, getting down. "So. I am watching." She looks the squad over, one by one, as if counting calves. "You are a slow herd. I will bring you in."`) : b3In('sohra') ? `Sohra rides beside the squad on a dun horse when she is not off with the herds, and walks beside it when the Fourth's pace offends the horse. She sings under her breath to the bhederin. They do not seem to mind.` : `The Rhivi girl the Mhybe sent to watch the Malazans rides with her own people this week; there is no room in the Fourth, and both sides have been very polite about it. She waves from the herds, now and then, as if checking the count.`}

${b3In('kettle') ? `Kettle has counted the munitions every morning. "${S.inv.sharper} sharper${S.inv.sharper === 1 ? '' : 's'}, ${S.inv.burner} burner${S.inv.burner === 1 ? '' : 's'}, ${S.inv.cusser} cusser${S.inv.cusser === 1 ? '' : 's'}. Same as yesterday. The Moranth counted too." ` : ''}${b3In('ohl') ? `Ohl walks with a hand on the wagon-side and says the grass is giving him hay fever, which is a thing, he says, in Ehrlitan. ` : ''}${b3In('tuft') ? `Tuft walks a little further up the column every day, toward the Rhivi, without seeming to.` : ''}`,
    html:allyHTML('The Rhivi Plain · the first week out of Pale'),
    ch:[b3DeckChoice(2),
        {t:'"On, then. Walk."', go:()=>startExplore()}]}),
  b3_c2_deck:()=>b3DeckOffer(2),
  b3_c2_card:()=>b3DeckCard(2),

  /* ---- the Bridgeburners go east, and Mallet with them ---- */
  b3_c2_bb:()=>({sp:'The road east', fx:()=>{ S.f.b3_c2_bb = 1; }, txt:
`At the side of the road, where a track goes off east toward a line of blue hills, Whiskeyjack sits a horse with his bad leg hanging stiff in the stirrup, watching a file of soldiers go past him onto the track.

Bridgeburners. Not many. Thirty-odd, in no order anybody could call a column, with packs and crossbows and that particular way of walking, as if they had already been where they were going and found it disappointing. Captain Paran walks at the head of them, grey in the face, thinner than he was in Darujhistan, like a man getting over a fever who has not been told what it was. Beside him walks Trotts, tall and tattooed, with his teeth showing at nothing.

${b3In('brisk') ? `Trotts sees Brisk. He bares his teeth. She bares hers. Neither of them breaks stride. "*Him*," Brisk says afterwards, and that is all.

` : ''}Paran sees the Fourth, and slows. He looks along the squad the way he always has, the way everyone in this army seems to.

"Sergeant." A breath. "${c2Five()}." He nods, as if that were a thing settled, and goes on, east, onto the track.

Mallet is the last of them. He stops by Whiskeyjack's stirrup and says something too low to hear, and Whiskeyjack says something back, and Mallet looks at the leg and then, for some reason, at you.`,
    ch:[{t:'Go and stand by Mallet.', go:'b3_c2_mallet'},
        {t:'Let them go.', go:'b3_c2_paran_gone'}]}),
  b3_c2_mallet:()=>({sp:'Mallet · Bridgeburners\' healer', fx:()=>{ S.f.b3_legSeen = 1; }, txt:
`Mallet is round and red and tired, with the patient face of a man who has spent a lifetime telling soldiers to stop doing the thing that hurts.

"Sergeant." He jerks his head at Whiskeyjack, who has turned the horse to watch the Bridgeburners go and is pretending he cannot hear. "That leg wants a week. Flat. On his back. I said so in Darujhistan, I said so at Pale, I'm saying it on a road." He hitches his pack. "He won't give me the week. Now he won't give me anything, because I'm going that way and he's going this."

He looks at you a moment longer.

"Somebody in this column has to watch him stand. You've been doing it anyway. I've seen you." He doesn't smile. "Keep doing it."`,
    ch:[{t:'"I\'ll watch him."', fx:()=>{ S.f.b3_c2_malletAsk = 1; }, go:'b3_c2_mallet2'},
        {t:'"He outranks me, Mallet."', go:'b3_c2_mallet2'},
        {t:'"Ohl could do it. If he\'d lie down."', req:()=>b3In('ohl'), go:'b3_c2_ohl'}]}),
  b3_c2_mallet2:()=>({sp:'Mallet', txt:
`"He outranks everybody," Mallet says. "That's the trouble with him. Nobody left to give him an order but the leg." He shrugs. "The leg'll give it. One day it'll give it all at once."

He goes. Down the track after the others, at that tired healer's walk, and does not look back, and the blue hills take the Bridgeburners the way the grass takes a stone.

Whiskeyjack watches until there is nothing to watch. Then he turns the horse.

"Sergeant." That is all he says. He knows exactly what Mallet said to you. You can see him know it.`,
    ch:[{t:'"Sir."', go:'b3_c2_paran_gone'}]}),
  b3_c2_ohl:()=>({sp:'Ohl', fx:()=>{ S.f.b3_c2_ohl = 1; S.f.b3_c2_malletAsk = 1; c2L('ohl', 1); }, txt:
`Ohl has already limped over, because a Denul healer can hear the word *leg* across a parade ground.

"Sir." He addresses Whiskeyjack, not Mallet; one healer does not go behind another's back while the other is standing there. "A night. One night, with the warren, while the column's halted. It won't mend it. It'll give Mallet's week a running start."

Whiskeyjack looks down at him from the horse for a long moment. It isn't unkind.

"Later," he says.

"Sir." Ohl steps back. Then, to you, very quietly, in the voice he uses for the list: "Later. I'm writing that down, child. I find men keep to a word better once they've seen it written."

Mallet looks at Ohl, and at you, and something in his tired face eases a little. "Two of you," he says. "Good. He'll ignore you both. But it'll take him longer."`,
    ch:[{t:'Let them go.', go:'b3_c2_mallet2'}]}),
  b3_c2_paran_gone:()=>({sp:'The road east', txt:
`The Bridgeburners go over the first rise and are gone. Nobody in the column says where they are going. Everybody in the column knows: the Barghast, in the hills, to talk to people who whiten their faces and quarrel with everybody. Thirty-odd Bridgeburners to talk a whole people round. The Host has decided this is either very clever or a funeral, and is holding its opinion until it hears which.

${b3In('kettle') ? `"Bridgeburners," Kettle says, watching the rise, with deep and personal envy. "Off to do something stupid and famous. And we get *grass*."` : ''}${b3In('tuft') ? ` Tuft watches the place where Paran went over the rise for a long time after the rest of you have stopped.` : ''}`,
    ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
  b3_c2_wj_again:()=>({sp:'Whiskeyjack', txt:
`Whiskeyjack rides at the head of the Host's column with Dujek's standard a little behind him and a tall Tiste Andii woman riding at his stirrup, and he sits the horse the way a man sits a horse when standing is worse.

He sees you watching. He lets you. That is the whole conversation.`,
    ch:[{t:'Leave him to the road.', go:()=>startExplore()}]}),
  b3_c2_korlat:()=>({sp:'Korlat · Tiste Andii', fx:()=>{ S.f.b3_c2_korlat = 1; }, txt:
`The tall woman at Whiskeyjack's stirrup is Korlat, who speaks for the Tiste Andii while their lord is elsewhere. Dark-skinned, older than anyone's history, with a grave, still way of turning her head, and she turns it toward the Fourth now as you come up.

"Sergeant." A courtesy, exactly measured. Her eyes go along the squad, once. ${S.f.b3_c1_key === 'mhybe' ? `"You stood the watch at the Mhybe's tent, after the parley. She has told me." A pause. "She does not tell me many things."` : `"You are the squad that came out of Pale with all its people. The Commander has spoken of it."`}

${b3In('tuft') ? `Tuft has gone very still. Kurald Galain comes off the Andii woman the way cold comes off a well, and Tuft stands in it like somebody standing at a window.` : `Something comes off her, faintly, like cold off a well in summer.`}

Whiskeyjack says nothing. Korlat glances at him, and then back at you, and something passes over her face so quickly that you could not swear to it afterwards. Then the horses walk on.`,
    ch:[{t:'Fall back.', go:()=>startExplore()}]}),

  /* ---- Tav, with the Fourth Regiment's wagons ---- */
  b3_c2_tav:()=>({sp:'Tav · Fourth Regiment', fx:()=>{ S.f.b3_c2_tav = 1; c2L('brisk', 1); }, txt:
`The Fourth Regiment of the Second is walking with the wagons this week, as escort and as muscle, because a wagon in long grass is a thing that needs a great many shoulders. Tav is one of the shoulders: a big Cawn man with his sister's jaw and none of her silence, pushing a wheel out of a hole and singing while he does it.

He cannot sing. He has never been able to sing. Everyone within forty paces knows the song and wishes they didn't.

"Bris." He has seen her. He doesn't stop pushing. "You've come to help."

"No," says Brisk.

"Good. You'd do it wrong." The wheel comes up out of the hole. He straightens, wipes his hands on his thighs, and looks at the rest of the Fourth with frank interest. "${c2Sealed() ? `She tell you she's not opened my letter yet? Three years. She says she'll open it when I'm dead. I say that's a long wait.` : `She tell you about the four coppers? She tells everybody about the four coppers. I'm not paying. It's the principle.`}"

Brisk says nothing at all. She stands at the edge of the wagon's shadow with her shield on her back, the way she stands at the edge of his fire most evenings, and watches him the way she watches a gate she has been told to hold.`,
    ch:[{t:'"Tav. Look after the wagons."', go:'b3_c2_tav2'},
        {t:'Leave them be.', go:'b3_c2_tav2'}]}),
  b3_c2_tav2:()=>({sp:'Tav', txt:
`"Wagons are easy," Tav says. "Wagons stay where you put them." He nods at his sister. "It's her you want to look after. She stands in front of things."

"I don't," says Brisk.

"She does." He goes back to the next wheel, and the next hole, and starts the song again from the beginning, and somewhere down the line of the Fourth Regiment somebody throws a boot at him, without much hope.

Brisk watches him a while longer. Then she comes back to the squad. "Sergeant," she says, which today means: *he's alive, and he's a mile from me, and that's close enough, and it isn't.*`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c2_tav_again:()=>({sp:'Tav', txt:`Tav is pushing a wheel, singing. The Fourth Regiment has stopped throwing boots. It has run out of boots.`, ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),

  /* ---- the Mott Irregulars ---- */
  b3_c2_mott:()=>({sp:'A Mott Irregular', fx:()=>{ S.f.b3_c2_mott = 1; }, txt:
`A big bearded man in homespun and a leather jerkin, with a woodsman's axe through his belt and a crossbow on his back and a stone jug in his fist, has walked over from Brood's side of the road to look at the Fourth. He looks at you the way a farmer looks at another man's pig.

"Malazans," he says. "Real ones." He seems pleased. "I'm a Bole."

Behind him, at a little distance, a younger man with the same broad face and the same beard, and a crossbow cocked and pointed at the ground, very carefully at the ground, is watching the squad without blinking.

"That's one of my brothers," the Bole says. "Don't mind him. He's counting." He holds out the jug. "Mott Irregulars. Brothers, all of us, one family, one wood. Woodcutters and farmers till you lot came to Mott Wood and made us into something else." He beams. "Your Bridgeburners know the Mott. Ask them about the Boles, when you see 'em. Watch their faces." He considers. "Good times. Drink?"`,
    ch:[{t:'Drink from the jug.', fx:()=>{ S.f.b3_c2_mottJug = 1; ally(1, 0, 'A jug with the Mott Irregulars'); }, go:'b3_c2_mott_drink'},
        {t:'"What\'s he counting?"', go:'b3_c2_mott_count'},
        {t:'"We\'re on the march. Another time."', go:'b3_c2_mott_no'}]}),
  b3_c2_mott_drink:()=>({sp:'A Bole', txt:
`It is not wine. It is not beer. It is something that was a pear once, a long time ago, before the Boles got to it, and it goes down like a lit fuse.

${b3In('kettle') ? `Kettle drinks, and goes a colour, and holds out the jug for more. "That's *beautiful*," she says hoarsely. "What's it made of? Can it be made to go off?" The Bole looks at her with something like love.` : `You drink. Your eyes water. The Bole is delighted.`}${b3In('ohl') ? ` Ohl declines, on medical grounds, and then accepts, on medical grounds.` : ''}

"There," the Bole says. "Now you've had a drink with Mott. That's a thing. You tell your Bridgeburners, when you see 'em, we've no hard feelings. Mostly." He takes the jug back. Behind him, the brother has not blinked once.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c2_mott_count:()=>({sp:'A Bole', txt:
`"Oh." The Bole looks back at his brother fondly. "Malazans. The ones he put down in Mott Wood, and the ones he's seen since that he'd put down if the Warlord let him. Different columns." He lowers his voice, which does not make it quieter. "He's got a long memory. Longest in the family. Don't let him get behind you on the march and you'll be fine." He winks. "Joke."

The brother has not blinked. He does not look as if it was a joke.

${b3In('brisk') ? `Brisk moves, very slightly, so that she is between the brother and the rest of the squad. The brother notices. Something like approval crosses his face, and is gone.` : `You find you have moved so that nobody in the Fourth has their back to him.`}`,
    ch:[{t:'Drink from the jug.', req:()=>!S.f.b3_c2_mottJug, fx:()=>{ S.f.b3_c2_mottJug = 1; ally(1, 0, 'A jug with the Mott Irregulars'); }, go:'b3_c2_mott_drink'},
        {t:'Move on, carefully.', go:()=>startExplore()}]}),
  b3_c2_mott_no:()=>({sp:'A Bole', txt:
`"Suit yourselves." The Bole is not offended. Nothing, you suspect, offends a Bole. "We'll be about. There's a great many Boles. Hard to miss."

The brother watches you go. You can feel him doing it, the way you feel sun on the back of your neck.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c2_mott_again:()=>({sp:'A Bole', txt:`${S.f.b3_c2_mottJug ? 'The Bole lifts the jug at you from across the road. You do not go over. Your stomach remembers.' : 'The Bole waves. Behind him the brother does not.'}`, ch:[{t:'Wave back.', go:()=>startExplore()}]}),

  /* ---- the quartermaster's clerk: silver for kit ---- */
  b3_c2_qm:()=>({sp:'The quartermaster\'s clerk', fx:()=>{ S.f.b3_c2_qm = 1; }, txt:
`The Host's quartermaster rides somewhere up the column with the ledgers. His clerk walks with the stores wagon and sells what will not be missed, for silver, with a slate and a stub of chalk and the face of a man who has heard every story there is about why a squad is short.

"Salve, five. Sharpers, eight, and don't tell the Moranth what I charged. Nothing else. There is nothing else." He taps the slate. "The Host feeds its own. The Host does not *arm* its own for free. Not on this road. Not with nobody paying the Host."

You have ${S.silver} silver.`,
    ch:[{t:'A jar of salve.', tag:'5 silver', req:()=>S.silver >= 5, fx:()=>{ S.silver -= 5; S.inv.salve = (S.inv.salve || 0) + 1; AUDIO.play('coin'); note('Bought: a jar of salve. −5 silver.', 'good'); }, go:'b3_c2_qm'},
        {t:'A sharper.', tag:'8 silver', req:()=>S.silver >= 8, fx:()=>{ S.silver -= 8; S.inv.sharper = (S.inv.sharper || 0) + 1; AUDIO.play('coin'); note('Bought: a sharper. −8 silver.', 'good'); }, go:'b3_c2_qm'},
        {t:'Nothing today.', go:()=>startExplore()}]}),

  /* ---- the herds and the wagons on the map ---- */
  b3_c2_herd:()=>({sp:'The herds', txt:
`Bhederin, as far as the grass goes: shaggy and humped and dun, heads down, grazing as they walk, calves at their mothers' flanks, and the old bulls on the edges with their heads up, watching nothing in particular in a way that makes the Host's horses nervous. Rhivi riders move among them on small horses, singing.

${b3In('sohra') ? `Sohra rides out to them and back three times in an hour, for no reason she will give. "Counting," she says, when you ask. "The herd is a thing you count. Like your sapper counts." She glances at you. "Like you count."` : `Somewhere out among them a girl's voice is singing, small and clear, to the calves.`}`,
    ch:[{t:'Leave them to the grass.', go:()=>startExplore()}]}),
  b3_c2_wagons:()=>({sp:'The Host\'s wagons', txt:
`The supply wagons: salt pork, hard bread, Moranth munitions in sealed crates with a black chitin guard walking beside every third one, horse-feed, tents, nails, rope, and the Host's whole remaining store of anything that can't be had off the land. They creak. They stick. The Fourth Regiment pushes them out of holes and sings.

The Host lives on these, Brood's people live on their herds, and the two have been eyeing each other's dinner all week.`,
    ch:[{t:'Leave them.', go:()=>startExplore()}]}),

  /* ---- Hurlochel, and going out ---- */
  b3_c2_hurl:()=>({sp:'Hurlochel · outrider', fx:()=>{ S.f.b3_c2_hurl = 1; }, txt:
`Hurlochel rides for the Host now, which he did not always: a lean outrider with a long face and an easy seat, who served Brood once and has the manners of a man who has been on both sides of a great many arguments.

"Sergeant. You're the Fourth." He doesn't wait for you to agree. "A Rhivi herd-rider didn't come back last night from the far grass, two days east. His clan want him found. The Warlord's people want to know what happened to him. And the High Fist wants somebody who isn't Rhivi to see what the Rhivi see, so that when they tell us about it we'll believe them." He grimaces. "That's you. ${b3In('sohra') ? `Bring the girl. She'll know the ground.` : `I'd have liked a Rhivi with you. They tell me there's no room in your squad.`}"

He looks east, where the plain goes on and on and there is nothing on it.

"There's been talk of things on the plains near Capustan. Rumour, mostly. Demons, the Rhivi say." He shrugs. "The Rhivi have a word for most things. I'd like to know which word this is."`,
    ch:[{t:'"We\'ll ride when you\'re ready."', go:'b3_c2_to_far'},
        {t:'"Give us a moment."', go:()=>startExplore()}]}),
  b3_c2_to_far:()=>({sp:'East · the far grass', txt: S.f.b3_c2_hurl ?
`Hurlochel is waiting with a string of horses at the east end of the column, sitting his own as if he had been born on it. ${b3In('sohra') ? 'Sohra is already mounted, her bow across her knees, impatient.' : ''}

Two days east, he says. Light, quick, and back to the column by the time it makes its night camp further on. The far grass is the Rhivi's outriding country, where the herd-riders go to see what is coming before it comes.` :
`Hurlochel the outrider rides up as you reach the end of the column, with a string of spare horses behind him, and looks you over.

"The Fourth? Good." A Rhivi herd-rider did not come back from the far grass, he says; the High Fist wants Malazan eyes on whatever the Rhivi find. "Two days east, light and quick. Back by the night camp."`,
    ch:[{t:'Ride east.', fx:()=>{ S.f.b3_c2_hurl = 1; }, go:()=>{ startExplore('b3_c2_far'); talk('b3_c2_far_arrive'); }},
        {t:'Not yet.', go:()=>startExplore()}]}),
});

/* ---------------- the far grass: the strides, and the hill ---------------- */
Object.assign(B3CH2.dlg, {
  b3_c2_far_arrive:()=>({sp:'The far grass', scene:'b3_c2_far', fx:()=>{ S.f.b3_c2_farIn = 1; }, txt:
`Two days east of the column there is no column. There is grass, and wind in it, and the sky, and every now and then a hill with stones on top.

The Barghast stand trees on those hills, Hurlochel says: oak trunks carried down out of the north, carved, and planted upside down with their roots in the air. Sacred places. The traders' track to Capustan runs past a dozen of them. Nobody camps on them who wants to see morning.

${b3In('sohra') ? `Sohra rides ahead. She has stopped singing. After a while she lifts a hand and points south, to where a stream comes down through a fold in the ground, and the grass by it is flattened in a way that has nothing to do with grazing. "There," she says. Her voice is very flat. "His horse. I can see his horse."` : `Toward noon Hurlochel stops and points south, to where a stream comes down through a fold in the ground. Something is lying in the mud by it. Something the size of a horse.`}`,
    ch:[{t:'Down to the stream.', go:()=>startExplore()}]}),
  b3_c2_strides:()=> S.f.b3_khell ? {sp:'The wallow', scene:'b3_c2_strides', txt:
`The wallow by the stream. ${S.f.b3_c2_carried ? 'The rider has gone home across a saddle.' : S.f.b3_c2_kin ? 'His kin have come and taken the rider.' : 'The rider lies under a cloak.'} The horse is still there. So are the tracks, going east into the grass. Nobody has walked in them.`,
    ch:c2Wallow()} : {sp:'The wallow', scene:'b3_c2_strides', fx:()=>{ S.f.b3_khell = 1; ally(0, 2, 'What walks the far grass'); }, txt:
`The horse is dead. That is the first thing, and the simplest.

The rider is a little way off. ${b3In('ohl') ? `Ohl goes to him, because Ohl always goes, and kneels, and after a moment he takes off his own cloak and puts it over what is there. "Something with edges," he says at last, standing up. "A great many edges. Very quick." That is all he will say, then or later.` : `What was done to him is not a thing anyone in the Fourth will put in a letter home. Somebody puts a cloak over it.`}

Then the tracks.

They are in the mud of the wallow, and out of it, into the grass, going east. Each print is longer than a man's forearm: three great toes forward, a spur behind, and the deep stab of a claw at the end of every toe, like the print of an eagle, if an eagle were the size of a house. And between them, the stride. ${b3In('kettle') ? `Kettle lays a spear down beside one print, and another spear end to end with it, and then looks at the next print, which is beyond the end of both. "That's a step," she says. "That's one *step*." She is not chattering. That is how you know.` : `You pace it out. You stop pacing it out.`}

${b3In('tuft') ? `Tuft stands at the edge of the mud with her arms wrapped round herself. "It's cold," she says. "Not the mud. *It.* Whatever made these was cold, the way a barrow is cold." She looks east, along the tracks. "Nothing alive leaves cold like that, Sergeant."` : `The mud is cold where the prints are. Colder than it ought to be in spring.`}

${b3In('sohra') ? `Sohra has not got off her horse. She is staring at the tracks, and her lips are moving, and it takes you a moment to understand that she is singing, very low, without any sound, the way you would sing to yourself in the dark to prove you still could.` : `Hurlochel sits his horse at the edge of it and does not get down. "Two legs," he says. "Whatever it is, it walks on two legs." He sounds as if he would rather it had four.`}`,
    ch:c2Wallow()},
  b3_c2_sing:()=>({sp:'Sohra', txt:
`Sohra gets down off the horse at last. She goes to the rider and crouches by him, not touching the cloak, and sings.

It isn't loud. It is the kind of song you sing to a calf that has got lost in the long grass, a coaxing thing, over and over, the same few notes. And at the edge of the wallow the grass bends, all of it, the same way, the way grass bends when something big goes through it, and there is nothing going through it.

When she stops she stays crouched a while. Then she stands. "He went," she says. "He was afraid to. It is very far, from here, to the edge of the grass." She wipes her face with the back of her wrist, once, angrily. "He is there now."`,
    ch:[{t:'On.', go:'b3_c2_strides'}]}),
  b3_c2_carry:()=>({sp:'The wallow', txt:
`You lift him onto a spare horse in ${b3In('ohl') ? 'Ohl\'s cloak' : 'somebody\'s cloak'}, and tie him on, gently, the way you would tie on anybody's brother.

Hurlochel watches you do it. "That'll cost you the afternoon," he says. "His clan is a half-day north. Whatever's on that hill" (he nods east, at a hill with stones on it, a league off) "will have seen us by then, if it's looking." He shrugs. "The Rhivi will know you did it, mind. They'll know by tonight. They know everything by tonight."

${b3In('brisk') ? `"We don't leave people," Brisk says, to nobody, and takes the horse's lead.` : `Nobody argues.`}`,
    ch:[{t:'North to his clan, then back.', go:'b3_c2_strides'}]}),
  b3_c2_leave:()=>({sp:'The wallow', txt:
`You drive a spear into the mud by him, point down, and tie a strip of red cloth to it where it will be seen a long way off. His kin will come. Hurlochel says they are already coming; the Rhivi know everything by nightfall.

Then you look east, the way the tracks go, toward a hill a league off with stones on its top. There is a thread of smoke going up from it, thin, almost nothing. A cooking fire, on a hill nobody camps on.

"Somebody's up there," Hurlochel says. "Somebody who doesn't know whose hill it is. Or doesn't care."`,
    ch:[{t:'On.', go:'b3_c2_strides'}]}),
  b3_c2_bow:()=>({sp:'The wallow', txt:
`It is a good bow: bhederin horn and sinew, short, doubled back on itself, the grip wrapped in hide worn dark by one hand. It was strung when he died. He got one arrow off. You find it, later, in the grass a long way east, snapped.

${b3In('sohra') ? `Sohra watches you take it. She doesn't say anything. She doesn't have to; she has a face that says things for her, and it says them now, and then it stops saying anything at all, which is worse.` : `Hurlochel watches you take it, and says nothing, the way a man says nothing who is going to remember.`}`,
    ch:[{t:'On.', go:'b3_c2_strides'}]}),
  b3_c2_hurl2:()=>({sp:'Hurlochel', fx:()=>{ S.f.b3_c2_hurl2 = 1; }, txt:
`Hurlochel is looking east, at the hill with the stones on it, with his hand shading his eyes.

"Smoke," he says. "On a Barghast hill." He lowers the hand. "Rhivi wouldn't. Barghast wouldn't, not for a cook-fire. Nobody of ours would. So it's somebody else's." He thinks about it. "The Domin sends riders north, the Grey Swords say, to watch who's coming. Horse. Betakullid, they call them. With something in charge of them that isn't horse." He looks at you. "I'd like to know who's watching us march. So would the High Fist. So would the Warlord, though he'd never ask."`,
    ch:[{t:'"Then we\'ll go and see."', go:'b3_c2_to_hill'},
        {t:'"In a while."', go:()=>startExplore()}]}),
  b3_c2_kin:()=>({sp:'A Rhivi rider', fx:()=>{ S.f.b3_c2_kin = 1; }, txt:
`A Rhivi rider has come down from the north, a young man with the dead rider's face, or near enough: a brother, a cousin. He sits his horse at the edge of the wallow and looks at the tracks and does not get down.

${S.f.b3_c2_tookBow ? `His eyes go to the bow on your squad's back. They stay there. Then they come away, slowly, and he says something in Rhivi, quietly, to the grass.${b3In('sohra') ? ` "He says it was a good bow," Sohra says flatly. "He says his cousin made it."` : ''}` : S.f.b3_c2_carried ? `"You carried him," he says, in careful trade-tongue. "To us. Malazans." He seems to need to say each part of it separately to make it true. Then he touches his chest, and his forehead, and holds out his open hand, palm up, the way the Rhivi do.` : `"You marked him," he says, in careful trade-tongue. "With the red. So we would find." He nods once. "We found."`}

${b3In('sohra') ? `He and Sohra talk in Rhivi a while, low. When he rides off she says: "He says the old women have a word for what made those tracks. It is not *demon*. It is older than that. He says they will not say it in the dark."` : `He rides off east, after the tracks, alone. Somebody should tell him not to. Nobody does.`}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c2_kin_again:()=>({sp:'A Rhivi rider', txt:`He is a long way east now, a small shape on a small horse, following the tracks at a walk.`, ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),

  /* ---- the hill ---- */
  b3_c2_to_hill:()=> !S.f.b3_khell ? {sp:'East · the hill', txt:
`The way east to the hill goes down past the stream, and the stream is where the horse is.`,
    ch:[{t:'The stream first.', go:'b3_c2_strides'}, {t:'Not yet.', go:()=>startExplore()}]} : S.f.b3_c2_hillDone ? {sp:'The far grass', txt:
`The hill is quiet now. The column will have made its night camp by dark, Hurlochel says, a day further on, and the Fourth can be at its fires by moonrise if it rides now.`,
    ch:[{t:'Ride for the night camp.', go:()=>{ startExplore('b3_c2_camp'); talk('b3_c2_camp_arrive'); }}, {t:'Not yet.', go:()=>startExplore()}]} : {sp:'The Barghast hill', txt:
`The hill stands up out of the grass a league east of the stream, steep-sided, with a crown of grey stones and, among the stones, the trees: oak trunks standing on their heads with their roots spread against the sky like hands. A thread of smoke goes up among them.

At the foot of the hill, on the side away from the column's road, horses are picketed in the long grass. Fifteen, twenty. Small, tough, plains horses, saddled for war. Men in leather and iron are sitting by them, eating. Lances stacked. Short bows. ${S.f.b3_c2_carried ? `They are watching the west. They have been watching it all afternoon, since a party rode north from the stream with something across a saddle.` : `They are not watching the west. They have not looked at the stream once.`}

${b3In('sohra') ? `"Betakullid," Sohra breathes. "On a Barghast hill. Eating." She has an arrow on the string already. "The Barghast will want their skulls for cups. I will tell them where to look."` : `"Betakullid," Hurlochel says, very low. "Domin horse. And whoever made that fire is up top."`}`,
    ch:[{t:'"Take the foot of the hill."', fx:()=>{ S.f.b3_c2_hillGo = 1; }, go:()=>startBattle('b3_c2_hill', S.f.b3_c2_carried ? {} : {surprise:'p'})},
        {t:'Kettle\'s sharper into the picketed horses first.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; S.f.b3_c2_hillGo = 1; }, go:()=>startBattle('b3_c2_hill', {pre:true, surprise:S.f.b3_c2_carried ? null : 'p'})},
        {t:'Sohra goes round by the dry gully to come at them from behind.', check:['guile', 14], req:()=>b3In('sohra') && !S.f.b3_c2_gully,
          edges:id=>[id === 'sohra' && ['she knows this ground', 2], S.f.b3_c2_carried && ['they are watching the west', -2]],
          fx:()=>{ S.f.b3_c2_gully = 1; S.f.b3_c2_hillGo = 1; },
          near:{fx:()=>{ const w = ROLL().who || 'sohra';
            if (S.inv.smoker > 0) { S.inv.smoker--; note('Yes, but the gully is all loose stones and thorn, and somewhere on the way down a smoker works out of a satchel and stays there: −1 smoker.', 'bad'); }
            else { S.rattled ??= {}; S.rattled[w] = 1; note(`Yes, but the gully is all loose stones and thorn, and ${NAME(w)} comes out of the bottom of it scratched and short of breath: −1 on the next check.`, 'bad'); } }},
          go:'b3_c2_gully_ok', fail:'b3_c2_gully_seen'},
        {t:'Not yet.', go:()=>startExplore()}]},
  b3_c2_gully_ok:()=>({sp:'The Barghast hill', txt:
`${by({sohra:`Sohra goes down off the horse and into the gully on her belly, and the grass closes over her as if she had never been there. A long minute. Then an archer by the pickets sits down with an arrow in him, quite slowly, looking puzzled, and his neighbour turns round to ask him why and finds a Rhivi girl behind him with a knife.`,
  _:`{who} goes into the gully with Sohra, and the grass closes over them both. A long minute. Then an archer by the pickets sits down with an arrow in him, and the men round him are turning the wrong way.`})}

The rest come up off the grass grabbing for lances, and you are already among them.`,
    ch:[{t:'Into them.', go:()=>startBattle('b3_c2_hill', {surprise:'p'})}]}),
  b3_c2_gully_seen:()=>({sp:'The Barghast hill', txt:
`A horse whickers. Just one, at the end of the picket line, at a smell it does not like coming up the gully, and every head at the foot of the hill turns at once.

${b3In('sohra') ? `Sohra comes back up out of the gully at a run, swearing in Rhivi, and the first arrows go into the grass where she was.` : `Somebody shouts in a language you don't know. You know the tone.`}

They know you are there now. They come anyway.`,
    ch:[{t:'Hold, and take them.', go:()=>startBattle('b3_c2_hill', {surprise:'e'})}]}),
  b3_c2_after_hill:()=>({sp:'The Barghast hill', scene:'b3_c2_hill', fx:()=>{ S.f.b3_c2_hillDone = 1; gain('b3_c2_mace'); if (B && B.def && (B.def.b3Came || []).length) ally(1, 0, 'The Rhivi saw the Fourth on the hill'); }, txt:
`The man in grey goes down among the inverted trees, beside the fire he made out of one of them, and the long mace goes out of his hand and rolls a little way down the slope and stops against a root.

He was not young. He has a face like a clerk's, and grey eyes that stay open, and on the inside of his wrist a mark like a closed eye, tattooed. ${b3In('tuft') ? `Tuft won't go near him. "There was something behind his eyes," she says. "When he looked at me. Something that wasn't him, looking out through him, very cold." She rubs her arms. "It's gone now. I think it went *home*."` : `When he looked at you, before the end, something looked out of his eyes that was not him. You are fairly sure of that. You are not going to say it to anybody.`}

The Betakullid who could still ride, rode. South. They will tell somebody what they saw.

From the top of the hill you can see the column, very small, a day off to the west: the wagons, the herds, the two armies, crawling south-east across the grass. A long way to watch it from. A good place to watch it from.

${b3In('sohra') ? `Sohra is looking at the felled tree, its carved roots in the ashes. She doesn't say anything. Her face says that something should be done about it.` : `One of the inverted trees lies felled across the fire, its carved roots in the ashes.`}`,
    ch:[{t:'Stand the tree back on its head.', req:()=>!S.f.b3_c2_tree, check:['might', 13], edges:id=>[id === 'brisk' && ['shoulders like a wall', 2], id === 'sohra' && ['too small for this', -1]],
          fx:()=>{ S.f.b3_c2_treeTried = 1; },
          near:{t:()=>`Yes, but the last heave is all ${NAME(ROLL().who || 'sgt')}, and something in the small of the back goes with it, and stays gone: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
          go:'b3_c2_tree', fail:'b3_c2_tree_no'},
        {t:'Ride for the night camp.', go:()=>{ startExplore('b3_c2_camp'); talk('b3_c2_camp_arrive'); }},
        {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c2_tree:()=>({sp:'The Barghast hill', fx:()=>{ S.f.b3_c2_tree = 1; ally(1, 0, 'A Barghast tree stood up again'); }, txt:
`It takes ${by({brisk:'Brisk and a rope and Hurlochel\'s horse', sgt:'you and a rope and Hurlochel\'s horse', _:'{who} and a rope and Hurlochel\'s horse'})} and most of an hour and a great deal of swearing, but the tree goes back up into its hole roots-first, carved roots to the sky, and stands there among the others as if it had never been down.

Hurlochel looks at it with his head on one side. "The Ilgres will hear of that," he says. "Barghast hear everything that happens on their hills. They'll want to know which Malazans." He coils the rope. "I'll tell them, if they ask. It's the kind of thing they remember."`,
    ch:[{t:'Ride for the night camp.', go:()=>{ startExplore('b3_c2_camp'); talk('b3_c2_camp_arrive'); }},
        {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c2_tree_no:()=>({sp:'The Barghast hill', txt:
`The tree is heavier than it looks, and it looks very heavy. It comes up off the ash a hand's width and goes down again, and the second time it goes down it takes some skin with it.

"Leave it," Hurlochel says. "The Barghast will come and do it themselves, with songs. They'll wonder who knocked it down. Best they don't wonder about us."`,
    ch:[{t:'Ride for the night camp.', go:()=>{ startExplore('b3_c2_camp'); talk('b3_c2_camp_arrive'); }},
        {t:'Not yet.', go:()=>startExplore()}]}),
});

/* ---------------- the night camp ---------------- */
Object.assign(B3CH2.dlg, {
  b3_c2_camp_arrive:()=>({sp:'The night camp', scene:'b3_c2_camp_night', fx:()=>{ S.f.b3_c2_campIn = 1; }, txt:
`Three weeks out.

The column makes its night camp where the grass goes down to a little water, and the Fourth comes in at moonrise with the far grass still on its boots. The Host's fires in long straight lines, the way the Host does everything. The Rhivi fires in rings round the herds, singing. Brood's Barghast off to the south with their own fires, louder. The Andii somewhere, quiet. Nobody, anywhere, entirely asleep.

Word has come in ahead of you. ${S.f.b3_c2_carried ? 'The Rhivi know a Malazan squad carried a dead rider home across a saddle. You can feel them knowing it, at every fire you pass.' : S.f.b3_c2_tookBow ? 'The Rhivi know a Malazan squad took a dead rider\'s bow out of the mud beside him. Nobody says so. Nobody at the Rhivi fires looks at you, either.' : 'The Rhivi know about the tracks. Everyone does, by now. Things get told at night that would not be told by day.'}

${b3In('tuft') ? `Tuft looks toward the Rhivi fires the moment the squad gets down. She does not go. She looks.` : ''}`,
    html:allyHTML('The Rhivi Plain · three weeks out'),
    ch:[{t:'Make camp.', go:()=>startExplore()}]}),

  /* the fire: a rest, and a song (dread falls) */
  b3_c2_fire:()=> S.f.b3_c2_rest ? {sp:'The Fourth\'s fire', txt:`Dung and grass, burning low. ${b3In('kettle') ? 'Kettle is asleep with the satchel in her arms.' : 'Somebody is asleep beside it.'} Out past the herds the night is very big.`,
    ch:[{t:'The herd lines. Take the watch.', go:'b3_c2_herdlines'}, {t:'Leave it.', go:()=>startExplore()}]} : {sp:'The Fourth\'s fire', txt:
`A fire of dried dung and dead grass in a scrape, because there is nothing else on the plain to burn, and the Fourth round it, and the stars coming down to the ground on every side.

From the Rhivi fires beyond comes singing, slow, the same few notes over and over. ${b3In('sohra') ? `Sohra sits with her back to the Fourth's fire and her face to the Rhivi ones, and sings with them, under her breath.` : ''}

${b3Mind() ? `Nobody says anything about the tracks. Everybody is thinking about them. You can tell by the way the squad sits: facing out.` : `Nobody says anything about the tracks. That is how the Fourth talks about things.`}`,
    ch:[{t:'Rest. Let the singing do what it does.', fx:()=>{ S.f.b3_c2_rest = 1; b3Rest('The Fourth sleeps by its fire with the Rhivi singing on every side, and ten thousand people of the Host snoring beyond them. Wounds close, mostly.'); }, go:'b3_c2_fire_rest'},
        {t:'Leave it for now.', go:()=>startExplore()}]},
  b3_c2_fire_rest:()=>({sp:'The Fourth\'s fire', txt:
`${b3In('sohra') ? `Some time in the night Sohra comes and sits down by the fire, because the Rhivi singing has stopped and she does not like the quiet. "It is for the herd," she says, when you ask her what the songs are. "So the herd knows we are here. So the dead in the grass know we are here." She pokes the fire. "So whatever made those tracks knows we are here." She thinks about it. "That last part I am less sure is good."` : `Some time in the night the Rhivi singing stops, and the quiet after it is very big.`}

${b3In('brisk') ? `Brisk takes the first watch without being asked, sitting with her shield across her knees and her back to the fire and her face to the dark, where the herd is.` : `You take the first watch yourself.`} The rest sleep. On the plain, under that sky, it is easier than it has any right to be.`,
    ch:[{t:'Wake for the watch.', go:()=>startExplore()}]}),

  /* the Mhybe and the child */
  b3_c2_mhybe:()=>({sp:'The Mhybe · the Rhivi', fx:()=>{ S.f.b3_c2_mhybe = 1; }, txt:
`At the biggest of the Rhivi fires, on a pile of hides, sits the Mhybe.

You saw her at Pale. ${S.f.b3_c1_key === 'mhybe' ? 'You stood the night watch at her tent. ' : ''}She was a woman then, not young, not old. She is old now. Her hair has gone white at the roots and grey to the ends, and her hands in her lap are knotted at the knuckles like a grandmother's, and when she turns her head to look at you she turns it slowly, the way old women do who have learned that quickly hurts.

Three weeks.

Beside her, cross-legged on the hides, is the child. She was a child at Pale. She is taller now than she was at Pale by more than the weeks can account for, long in the arms and legs the way a girl is at that age that comes before all the others, and she is watching the Fourth come up to the fire with eyes that are much older than her face.

${b3In('sohra') ? `Sohra has stopped a pace behind you. When the Mhybe looks at her, Sohra's face does something complicated and goes still. "Elder," she says, in Rhivi, and then nothing else. She is frightened. You have never seen her frightened.` : ''}

"Malazans," says the Mhybe. Her voice is still her own, low and dry. "${S.f.b3_c1_key === 'mhybe' ? 'The ones who stood at my tent. Sit, then. You have earned a fire.' : 'Sit, if you are going to stare. Staring is cheaper sitting down.'}"`,
    ch:[{t:'Sit. Say nothing. Let her talk if she wants to.', fx:()=>{ ally(1, 1, 'An hour at the Mhybe\'s fire'); c2L('sohra', 1); }, go:'b3_c2_mhybe_sit'},
        {t:'"Elder. What is happening to you?"', go:'b3_c2_mhybe_ask'},
        {t:'Bow, and leave her to her fire.', go:'b3_c2_mhybe_go'}]}),
  b3_c2_mhybe_sit:()=>({sp:'The Mhybe', txt:
`You sit. The Fourth sits. Nobody says anything for a long time, and the fire burns down a little, and the child watches the squad one by one, and the Mhybe watches the fire.

"At the turn of the year," the Mhybe says at last, to the fire, "I could ride a day and not feel it. Now I ride in a cart, like grain." She lifts one knotted hand and looks at it. "She grows. I pay. That is all it is, Malazan. It is a very simple sum." The hand goes back into her lap. "Everyone says it to me as if it were a riddle. It is not a riddle."

She does not look at the child when she says it. The child looks at her. There is something in the child's face then that you will think about for a long time afterwards, and not be able to name.

${b3In('sohra') ? `On the way back to the Fourth's fire Sohra walks beside you without speaking, and then, all at once: "She was young. At the turn of the year she was young. She taught me the song for calving." Her voice breaks on it and she lets it. "Nobody in the clan will say why. Everyone knows. Nobody will say."` : ''}`,
    ch:[{t:'Back to the fire.', go:'b3_c2_child'}]}),
  b3_c2_mhybe_ask:()=>({sp:'The Mhybe', fx:()=>{ ally(0, 1, 'What the child costs'); }, txt:
`The Mhybe looks at you for a long time with her old eyes.

"A Malazan asks," she says. "Not one of my own people. A Malazan." Something that is not quite a laugh. "Very well. The child grows, and I pay for it. I am the vessel. A vessel. The kind you fill once, and pour out." She holds up one knotted hand, so you can see it in the firelight. "I am being emptied."

${S.f.b3_c1_key === 'mhybe' ? `"You stood at my tent. I will tell you a thing for it. Do not stand between the child and the tall man in the cloak. Not because of what he would do to you. Because of what she might do, one day, to him." She lets the hand fall. "Go, now."` : `"Go, now. I am tired. I am always tired."`}`,
    ch:[{t:'Back to the fire.', go:'b3_c2_child'}]}),
  b3_c2_mhybe_go:()=>({sp:'The Mhybe', txt:
`You bow, the Malazan way, and the Mhybe inclines her white head, the Rhivi way, and that is the whole of it.

As the Fourth turns to go, the child gets up off the hides.`,
    ch:[{t:'Wait.', go:'b3_c2_child'}]}),
  b3_c2_child:()=>({sp:'The child', txt: b3In('tuft') ?
`The child comes round the fire, barefoot in the trodden grass, and stops in front of Tuft.

Tuft does not move. You have seen Tuft not move before, on the edge of the cadre row, in the tunnels under Pale, in Darujhistan with something walking past her in the dark. Not like this.

The child looks at her for a long moment. Then her hand comes up, slowly, a girl's thin hand, and touches her own collar, at the left side, just under the jaw: the place where, on a cadre tunic, a badge would be sewn.

She doesn't say anything. She looks at Tuft as if she were trying to remember a word in a language she used to speak.

Then the Mhybe says something in Rhivi, sharp, and the child turns and goes back to the hides, and sits, and does not look round again.

Tuft breathes out. It takes her a long time. "She's older," she says, on the way back, in a voice like somebody holding something very full. "By years. By *years*, Sergeant. Three weeks." And then, lower, not to you: "She remembered the collar. Not me. The collar." She does not say anything else all night, and she does not sleep, and in the morning she has the Deck out in her lap and has not turned a card.` :
`The child comes round the fire, barefoot in the trodden grass, and looks at the Fourth one by one, as if counting, the way everyone in this army seems to count the Fourth.

When she has finished she nods, as if the number were right. Then she goes back to the Mhybe and sits down against her, and the old woman's knotted hand comes up and rests on her hair, and stays there.`,
    ch:[{t:'Back to the Fourth\'s fire.', fx:()=>{ if (b3In('tuft')) { S.f.b3_c2_collar = 1; S.f.b3_tuftChild = 1; } }, go:()=>startExplore()}]}),
  b3_c2_mhybe_again:()=>({sp:'The Mhybe', txt:`The Mhybe is asleep on the hides, or has her eyes shut. The child sits beside her, awake, watching the dark beyond the fire${b3In('tuft') ? ', and once, when Tuft walks past, watching Tuft' : ''}.`, ch:[{t:'Leave them be.', go:()=>startExplore()}]}),

  /* the tall man in the cloak, watching the child */
  b3_c2_kallor:()=>({sp:S.f.b3_kallor ? 'Kallor' : 'A tall man in a fur-collared cloak', fx:()=>{ S.f.b3_c2_kallor = 1; S.f.b3_c2_kallorLook = S.f.b3_kallorSaw ? 1 : 0; ally(0, 1, 'The man at the edge of the firelight'); }, txt:
`At the edge of the Rhivi firelight, where nobody else is standing, stands ${c2K()}: tall, grey-bearded, very upright, in old iron under the cloak, with his hands clasped behind his back like a man looking at a painting he dislikes.

He is looking at the child.

He does not move. He does not need to. ${b3In('tuft') ? `Tuft has seen him. She has stopped walking. "He looks at her like ${b3In('kettle') ? 'Kettle' : 'a sapper'} looks at a fuse," she says, very low. "Like he's working out how long."` : `He looks at her the way a sapper looks at a fuse: working out how long.`}

${S.f.b3_kallorSaw ? `Then he turns his head, slowly, and looks at you. He has seen your face before, at the Mhybe's tent after the parley. He lets you see that he remembers it. Then he looks back at the child, as if you had been a thing in the way of the view.` : `After a while his eyes move off the child and go over the Fourth, once, without interest, the way you look at a cart going by.`}

${b3In('sohra') ? `"Brood's second," Sohra says, when he has gone. "The Warlord keeps him close. The clan says that is so he can see him." She spits into the grass. "The clan says a great many things about that one, quietly."` : ''}`,
    ch:[{t:'Walk on.', go:()=>startExplore()}]}),

  /* the Black Moranth at the quorl lines: Moranth Hand-Talk (✦) */
  b3_c2_moranth:()=>({sp:'A Black Moranth · the quorl lines', fx:()=>{ S.f.b3_c2_moranth = 1; }, txt:
`At the west edge of the camp, where the Black Moranth bring their quorls down at dusk, the great insects stand folded in a row like a shed of dark glass, wings lifting a little in the night wind. A rider in black chitin is going down the line, touching each one on the head, as a groom goes down a line of horses.

${b3In('kettle') ? `Kettle is already there. Of course Kettle is already there. She is standing as close to the nearest quorl as a person can stand without being in it, with her hands clasped behind her back so that she won't touch it, and her face is the face of a child at a Fete.

"They're *warm*," she says, without turning round. "Sergeant. Chub said. They're warm."` : `The quorls are warm. You can feel it on your face from three paces, like standing by a banked fire.`}

The rider has stopped and turned its helmed head toward the Fourth. It makes a small clicking sound. Then, as if it had decided something, it lifts one gloved hand and makes a sign with it: flat, then turned, then two fingers drawn down the chitin of its other forearm.`,
    ch:[{t:'Watch its hands, and try to sign it back.', check:['wits', 16], trick:'b3_c2_hand', req:()=>!S.f.b3_c2_handTried, fx:()=>{ S.f.b3_c2_handTried = 1; },
          edges:id=>[id === 'kettle' && ['she has watched them since Nathilog', 2], id === 'sohra' && ['herd-signs are hand-signs', 1], id === 'brisk' && ['she does not wave at things', -1]],
          go:'b3_c2_hand_ok', fail:'b3_c2_hand_miss'},
        {t:'Nod, and leave it to its quorls.', go:()=>startExplore()}]}),
  b3_c2_hand_ok:()=>({sp:'A Black Moranth', txt:
`${by({kettle:`Kettle's hands come up before you can say anything, and do it back: flat, turned, two fingers down the forearm. Wrong the first time. The Moranth clicks and does it again, slowly. Kettle does it again. Right.`, sgt:`You lift your hand and do it back: flat, turned, two fingers down your own forearm. Wrong the first time. The Moranth clicks and does it again, slowly. You do it again. Right.`, _:`{who} lifts a hand and does it back: flat, turned, two fingers down the forearm. Wrong the first time. The Moranth clicks and does it again, slowly. Again. Right.`})}

The Moranth goes very still. Then it signs something else, quick, a dozen shapes one after another, and points up at the sky, and at the grass, and at the space between.

You understand perhaps a third of it. It is enough. *Here*, the hand says. *This one. From above.* It is how a rider on a quorl tells the ground what it sees, and how the ground tells the rider where to put a quarrel.

The Moranth clicks twice, which might be approval, and goes back to its quorls.${b3In('kettle') ? `

"I'm never going to sleep again," Kettle says happily, all the way back to the fire.` : ''}`,
    ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
  b3_c2_hand_miss:()=>({sp:'A Black Moranth', txt:
`${by({sgt:'You try', _:'{who} tries'})}. Flat, turned, two fingers. It comes out like a man waving off a fly.

The Moranth watches. It clicks once, which might be anything, and goes back down the line of quorls, touching each one on the head. Whatever it was offering, it has stopped offering it.${b3In('kettle') ? `

"You did it *backwards*," Kettle says, in anguish. "Turned, then flat. It's flat, then turned." She does it herself, perfectly, at the Moranth's back. The Moranth does not turn round.` : ''}`,
    ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

  /* an old Rhivi woman: the spirit-bundle */
  b3_c2_gran:()=>({sp:'An old Rhivi woman', fx:()=>{ S.f.b3_c2_gran = 1; }, txt:
`An old Rhivi woman sits by a small fire of her own at the edge of the herd lines, tying something with red thread: grass, bone beads, a lock of coarse dun hair. Her fingers are quicker than her eyes.

${b3In('sohra') ? `"My father's mother," Sohra says. "She ties bundles for riders going into bad country. She has tied one for every rider in the clan." A pause. "She tied one for him. The one by the stream."` : `She ties bundles for riders going into bad country, a man at the next fire tells you. She has tied one for every rider in the clan.`}

The old woman looks up at the Fourth. Her eyes go along the squad, slowly, and come back to you.

${S.f.b3_c2_carried ? `She says something in Rhivi. ${b3In('sohra') ? `"She says you carried him," Sohra says. "She says a squad that carries its dead should not walk into bad country with nothing tied to it."` : 'She points at you, and at the bundle, and nods.'} She holds it out.` : S.f.b3_c2_tookBow ? `Her eyes stop on the bow. She looks at it for a long moment, and then she goes back to her tying, and does not look up again.` : b3In('sohra') ? `She and Sohra talk a while, low, in Rhivi. "She asks if you are a herd or a pack," Sohra says. "I said a herd. A slow one." The old woman cackles, and holds the bundle out to you.` : `She looks at you a long time, and then she shrugs, the way old women shrug when they have decided it is no business of theirs whom the spirits look after, and holds out the bundle.`}`,
    ch:[{t:'Take it, with both hands.', req:()=>!S.f.b3_c2_tookBow || b3In('sohra'), fx:()=>{ gain('b3_c2_bundle'); c2L('sohra', 1); }, go:'b3_c2_gran_took'},
        {t:'Give the bow back. It was his.', req:()=>!!S.f.b3_c2_tookBow && S.kit.includes('b3_c2_hornbow'), fx:()=>{ S.f.b3_c2_bowBack = 1; S.kit = S.kit.filter(i => i !== 'b3_c2_hornbow'); SQUAD().forEach(w => { Object.keys(S.gear[w] || {}).forEach(sl => { if (S.gear[w][sl] === 'b3_c2_hornbow') delete S.gear[w][sl]; }); }); ally(1, 0, 'A dead man\'s bow, given back'); c2L('sohra', 1); }, go:'b3_c2_gran_bow'},
        {t:'Thank her, and go.', go:()=>startExplore()}]}),
  b3_c2_gran_took:()=>({sp:'An old Rhivi woman', txt:
`It weighs nothing at all. It smells of smoke and grass and bhederin.

The old woman watches you take it, and says one more thing in Rhivi, short, and goes back to her tying.${b3In('sohra') ? ` "She says the spirits in it are not strong," Sohra says. "She says they are stubborn. Stubborn is better." She looks at the bundle, and then at you, and something in her face that has been tight since the stream lets go a little.` : ''}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c2_gran_bow:()=>({sp:'An old Rhivi woman', txt:
`You hold out the bow. The old woman looks at it for a long time without taking it. Then she does, in both hands, and lays it across her knees, and runs her thumb along the worn grip, once.

When she looks up again something has changed in her face. She reaches into the pile of grass and thread beside her and finds a bundle already tied, red thread, bone beads, and holds it out to you without a word.${b3In('sohra') ? `

Sohra lets out a breath she seems to have been holding since the stream.` : ''}`,
    ch:[{t:'Take it.', fx:()=>{ gain('b3_c2_bundle'); }, go:()=>startExplore()}]}),
  b3_c2_gran_again:()=>({sp:'An old Rhivi woman', txt:`She is still tying, red thread round grass and bone. She does not look up. She knows you are there.`, ch:[{t:'Leave her be.', go:()=>startExplore()}]}),

  /* a rumour: Quick Ben and Capustan */
  b3_c2_rumour:()=>({sp:'A Host regular', fx:()=>{ S.f.b3_c2_rumour = 1; }, txt:
`A regular of the Host is sitting on an upturned bucket mending a boot by the light of somebody else's fire, and is very willing to talk to anyone who stops.

"Heard about the wizard? Quick Ben. Bridgeburners'." He bites off a thread. "Sat in his tent one night with his eyes shut and talked to Capustan. *Capustan.* A hundred leagues. Talked to the Grey Swords there, the ones holding it for the prince. Told 'em we're coming." He holds the boot up to the light. "That's what his tent-guard says, anyway. Tent-guard says he came out after looking like he'd been sick, and said the Grey Swords were a lot of pompous fools, and then went and talked to Whiskeyjack for an hour, and Whiskeyjack didn't think they were fools at all."

He shrugs. "Tent-guard says a lot. Still. Capustan's holding, they say. For now."

${b3In('tuft') ? `Tuft, beside you, has gone still at the name. "Talked," she says. "From here." She does not say anything else, but she looks south-east for a while, as if she could see the distance.` : ''}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),

  /* the herd lines: the night raid */
  b3_c2_herdlines:()=> S.f.b3_c2_nightDone ? {sp:'The herd lines', txt:
`The herd lines, grey with dawn. The Rhivi are walking the herd, counting, singing. Some of the calves are not there to be counted. Fewer than there would have been.`,
    ch:[{t:'On to the river with the column.', go:'b3_c2_to_river'}, {t:'Not yet.', go:()=>startExplore()}]} : {sp:'The herd lines', txt:
`The Fourth's watch is the herd lines, the long ragged edge of the camp where the Rhivi have bedded the bhederin down in the grass for the night. A warm, rank, breathing dark, full of the shapes of animals bigger than horses, and the calves pressed in among them.

${S.f.b3_c2_rest ? '' : 'The squad has not slept. '}The Rhivi riders who should be walking the outer edge are fewer than they should be. ${S.f.b3_c2_hillDone ? 'Some of them went out after the Betakullid who rode south from the hill.' : ''}

${b3In('sohra') ? `Sohra stops dead. Lifts her head. "The old bulls," she whispers. "Listen to the old bulls." They have all got up, along the edge of the herd, every one, and they are facing the same way, out into the dark.` : `Along the edge of the herd the old bulls have all got up, every one, and are facing the same way, out into the dark.`}`,
    ch:[{t:'"Shields. Face out."', go:'b3_c2_raid'},
        {t:'Not yet.', go:()=>startExplore()}]},
  b3_c2_raid:()=>({sp:'The herd lines', txt:
`Riders. Out of the dark, low on small horses, with burning grass on the ends of their lances: a dozen, two dozen, Betakullid, come to drive the herd. Stampede it. Into the camp, into the Host's lines, into the tents, a brown flood of panic in the dark, and while the alliance is picking itself up off the ground, be gone with as many calves as they can cut out.

The Rhivi are only now getting to their horses. The Fourth is between the riders and the herd, on foot.

${b3In('brisk') ? `"Hold it," Brisk says. Not to you. To herself. To the shield.` : `Hold until the Rhivi are mounted.`}`,
    ch:[{t:'Hold the herd lines.', go:()=>startBattle('b3_c2_night', {})},
        {t:'Kettle\'s smoker across the grass between them and the herd.', tag:'uses 1 smoker', req:()=>b3In('kettle') && S.inv.smoker > 0, fx:()=>{ S.inv.smoker--; S.f.b3_c2_smoke = 1; }, go:()=>startBattle('b3_c2_night', {pre:true, surprise:'p'})}]}),
  b3_c2_after_night:()=>({sp:'The herd lines · before dawn', scene:'b3_c2_herds_dawn', fx:()=>{ S.f.b3_c2_nightDone = 1; if (B && B.def && (B.def.b3Came || []).length) ally(1, 0, 'The herd lines held, together'); }, txt:
`The man in grey goes down in the grass with his long mace under him, and his riders take what is left of their horses south into the dark, and do not take a single calf with them.

The Rhivi come back from chasing them at first light, singing, slow, the way they sing for the dead and for the living both. They walk the herd, counting. Some calves are not there to count: trampled, in the first rush, before the Fourth was between. Fewer than there would have been.

${b3In('sohra') ? `Sohra walks the herd with them and comes back grey with tiredness. "Four calves," she says. "And a rider. Not ours. Ilgres. He came out of the Barghast lines on foot when he heard and he stood with the bulls." She sits down hard in the grass. "The clan says the Malazans held the herd lines. Like they are surprised. I said: I told you. They are a slow herd. They hold."` : `A Rhivi rider stops by the Fourth on his way past, and looks at the squad, and says something in Rhivi, and touches his chest. Then he rides on.`}

${S.f.b3_c2_kallorLook ? `Across the camp, on the slope where Brood's tents are, a tall man in a fur-collared cloak is standing in the grey light watching the herd lines. Watching the Fourth. Then he isn't.` : ''}`,
    ch:[{t:'On to the river with the column.', go:'b3_c2_to_river'},
        {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c2_to_river:()=>({sp:'The road south-east', scene:'b3_c2_herds_rain', fx:()=>{ S.f.b3_c2_onRiver = 1; }, txt:
`Two more weeks.

The plain goes on. It rains, and stops, and rains. To the east, very far off, there are hills where the rain is falling all the time, grey curtains of it hanging under the clouds, and the Rhivi look at those hills every morning and say nothing.

Five weeks out of Pale the column comes down to a river. Not a great one: a brown river in a broad bed of gravel and reeds, running fast and full with the spring, with a ford the Rhivi know, where the gravel comes up under the water and a herd can cross at a walk. On the far bank, more plain. On this bank, the whole alliance, bunching up to wait its turn.

The herds go first. They always go first.`,
    ch:[{t:'Down to the river.', go:()=>{ startExplore('b3_c2_river'); talk('b3_c2_river_arrive'); }},
        {t:'Not yet.', go:()=>startExplore()}]}),
});

/* ---------------- the river ---------------- */
Object.assign(B3CH2.dlg, {
  b3_c2_river_arrive:()=>({sp:'The river', scene:'b3_c2_ford', fx:()=>{ S.f.b3_c2_riverIn = 1; }, txt:
`The herd is half across.

A brown tide on a brown river, the bhederin going into the water at the ford in a long stream, bawling, the calves swimming where it deepens with their noses up and the Rhivi riders in among them to the saddle-girths, singing. And on some of the calves, children: Rhivi children of six and eight and ten, riding the young bhederin across the way children have always ridden them across, bareback, gripping the hair, shrieking with joy.

Behind the herd, on this bank, the Host's wagons are drawn up to cross next: the salt pork, the bread, the Moranth crates, with the Fourth Regiment of the Second shouldering the first of them down toward the water.

To the east, up the river, the sky over the hills is black.

${b3In('sohra') ? `Sohra is looking at it. Her hands have gone still on her bow.` : ''}`,
    html:allyHTML('The Rhivi Plain · the river, five weeks out'),
    ch:[{t:'Walk down to the ford.', go:()=>startExplore()}]}),
  b3_c2_mother:()=>({sp:'A Rhivi herd-mother', fx:()=>{ S.f.b3_c2_mother = 1; }, txt:
`A Rhivi woman in a hide coat is standing on the bank with a little boy on her hip and a girl of perhaps seven tugging at her hand, wanting to go into the water with the others. The woman is not letting her go.

She looks at the sky over the hills, and then at the river, and then at the Fourth.

"The river is talking," she says, in trade-tongue. "Listen. It is getting louder." She hoists the boy higher. "The rain has been in the hills for three days. My mother said a river like this one does not rise. It *stands up*."

The girl tugs again. "Sennet is on the dun calf," she says. "Sennet always gets the dun calf."

"Sennet," the woman says, "will be across in a moment, and then you may be cross with her on the other side." She doesn't take her eyes off the river.`,
    ch:[{t:'"Keep her on the bank."', go:()=>startExplore()}]}),
  b3_c2_mother_again:()=>({sp:'A Rhivi herd-mother', txt:`The woman is still on the bank with the boy on her hip and the girl's hand in hers, watching the river. It is louder.`, ch:[{t:'Leave her be.', go:()=>startExplore()}]}),
  b3_c2_rwagons:()=>({sp:'The wagons at the ford', txt: S.f.b3_c2_floodDone ? (S.f.b3_c2_key === 'wagons' ? `The wagons in a ring on the near bank, mud to the axles, every one of them out of the water. ${b3In('brisk') ? 'Tav is asleep under one of them, snoring. Brisk sits by the wheel.' : 'The Fourth Regiment is asleep under them.'}` : `The wagons on the near bank. Not all of them. ${b3In('brisk') ? 'Tav is among the men digging the last one out of the shallows. Brisk watches from across the river and does not stop watching until he looks up and waves.' : 'The Fourth Regiment is digging the last of them out of the shallows.'}`) :
`The supply wagons, drawn up on the bank to cross after the herd: twenty of them, heavy, with the Fourth Regiment of the Second at the wheels. ${b3In('brisk') ? `Tav is at the first one, up to his knees already, pushing, and singing, and when Brisk comes down the bank he stops singing long enough to say "Bris, get in, the water's lovely," and starts again.` : 'Somebody among them is singing, very badly.'}`,
    ch:[{t:'Leave them.', go:()=>startExplore()}]}),
  b3_c2_wj_river:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c2_wjRiver = 1; }, txt:
`Whiskeyjack has got down off his horse at the top of the bank to look at the ford, and is standing with his weight on his good leg and a hand on the saddle. Not leaning. Not quite.

He sees you looking at the leg. He lets you.

"The Rhivi want it hurried," he says. "The herd over, the wagons over, before that comes down." He nods at the black sky over the hills. "The quartermaster wants the wagons first. The Mhybe's people want the herd first. I said both." The ghost of something that is not a smile. "That's what the High Fist pays me for. Saying both."

He looks at the river.

"If it comes down before we're over, Sergeant, you'll be where you are. Do what's in front of you." He gets back on the horse. It takes him two tries, and he does not look at you either time.`,
    ch:[{t:'"Sir."', go:()=>startExplore()}]}),

  /* the ford, and the flood */
  b3_c2_ford:()=> S.f.b3_c2_key ? {sp:'The ford', txt: S.f.b3_c2_floodDone ? `Where the ford was there is brown water running fast and high, with branches in it, and a dead bhederin turning slowly in the eddy under the far bank. It will go down in a day or two. The Rhivi say.` : `The water.`,
    ch:[{t:'Leave it.', go:()=>startExplore()}]} : {sp:'The ford', txt:
`The ford: gravel under the brown water, a line of Rhivi riders marking it with their horses, the last of the herd going over in a bawling stream with the children on the calves. The first of the wagons is going down the bank behind them with the Fourth Regiment at its wheels.

The river is louder than it was. The Rhivi on the far bank have stopped singing.`,
    ch:[{t:'Down to the water\'s edge.', go:'b3_c2_flood'},
        {t:'Not yet.', go:()=>startExplore()}]},
  b3_c2_flood:()=>({sp:'The river · the spate', scene:'b3_c2_flood', fx:()=>{ S.f.b3_c2_floodSeen = 1; }, txt:
`It comes down at dusk.

You hear it first, the way you hear a cavalry charge first, as a sound in the ground. Then you see it: up the river to the east, between the banks, a wall of brown water and white water and everything the river has picked up in three days of rain in the hills, whole trees, a drowned cart, a cow, coming round the bend at the speed of a galloping horse.

There is time to shout. There is time for one thing.

Out in the ford, the tail of the herd: the last calves, swimming, and on them the last of the children, three of them, four, and the Rhivi riders turning their horses to go back for them, too far, too slow. ${b3In('sohra') ? `Sohra is already off her horse and running for the water.` : ''}

On the bank and in the shallows, the wagons: the first three already in the water with the Fourth Regiment to the waist round them, the oxen bellowing, the whole Host's bread and salt and Moranth munitions about to go down the river. ${b3In('brisk') ? `Tav is at the first wheel. He has seen it. He is not letting go of the wheel.` : `The heavies at the wheels have seen it. Not one of them lets go.`}

The Fourth is between them. The water will be here in a hundred heartbeats. You can reach one or the other.

Not both.`,
    ch:[{t:'"The children. Into the water."', fx:()=>{ S.f.b3_c2_key = 'herd'; }, go:'b3_c2_key_herd'},
        {t:'"The wagons. Get them out."', fx:()=>{ S.f.b3_c2_key = 'wagons'; }, go:'b3_c2_key_wagons'}]}),

  /* the herd */
  b3_c2_key_herd:()=>({sp:'The river · the spate', scene:'b3_c2_flood', fx:()=>{ if (!S.f.b3_c2_keyFx) { S.f.b3_c2_keyFx = 1; ally(2, -1, 'The herd and its children');
      if (S.inv.salve > 0) { S.inv.salve--; note('A jar of salve went down the river with a Moranth crate. −1 salve.', 'bad'); }
      c2L('sohra', 2); c2L('ohl', 1); c2L('tuft', 1); c2L('brisk', -1); c2L('kettle', -1); } }, txt:
`You go into the water.

All of you, the Fourth, off the bank and into the ford to the waist, to the chest, the gravel moving under your boots, the current already pulling. ${b3In('brisk') ? `Brisk goes in first, shield on her back, and gets a calf by the hair and a child by the arm and turns, all in one movement, like a woman shouldering a door.` : ''}${b3In('ohl') ? ` Ohl has a boy by the collar and is swearing at Hood in Ehrlii, steadily, all the way.` : ''}${b3In('sohra') ? ` Sohra is out past all of you, swimming, singing at the calves in a high cracked voice, and the calves turn toward her, the way calves turn to their mothers.` : ''}

Then the water hits.

It is like being hit by a building. The world goes brown and loud and there is no up, and something heavy goes past you in the dark of it, and you have a child's arm in your fist and you do not let go. You do not let go. You come up on the far bank in the reeds, with the child, coughing, and the Fourth coming up round you one by one out of the brown, and you count them. You count twice.

Behind you, on the near bank, the wagons. Two of them went. The Fourth Regiment got the rest up the bank, somehow, without you, and a Moranth crate turning over and over in the brown water goes past, going to the sea.

${b3In('brisk') ? `Brisk is standing in the reeds with water running off her, looking across the river at the near bank, at the men round the wagons. She is looking for one of them. It takes a long time. Then she finds him, and her shoulders come down, and she turns round and does not look again.` : ''}

And on the far bank, in the reeds where the herd has scattered, there are riders. Not Rhivi.`,
    ch:[{t:'"Shields. Up. Now."', go:'b3_c2_herd_fight'}]}),
  b3_c2_herd_fight:()=>({sp:'The far bank · dusk', scene:'b3_c2_far_dusk', txt:
`Betakullid: the riders who ran south from the hill, or their brothers. They have shadowed the column for a week, waiting for it to come apart, and the river has just done it for them. The herd is scattered along the bank in the dusk, the children with it, and the Rhivi riders who should be guarding it are on the other side of a river that is standing up.

They are not here for the Fourth. They are here for calves, and anything else small enough to carry.

${b3In('sohra') ? `Sohra has a child under each arm, and puts them down behind ${b3In('ohl') ? 'Ohl\'s back, or yours' : 'your back'}, and nocks.` : `The children are behind you. That is where they are going to stay.`}`,
    ch:[{t:'Hold the bank.', go:()=>startBattle('b3_c2_herdfight', {})},
        {t:'Kettle\'s sharper into the reeds where they are bunching.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c2_herdfight', {pre:true})}]}),
  b3_c2_after_herd:()=>({sp:'The far bank · night', scene:'b3_c2_far_night', fx:()=>{ S.f.b3_c2_floodDone = 1; if (!S.kit.includes('b3_c2_hornbow') && !S.f.b3_c2_bowBack) { S.f.b3_c2_bowGift = 1; gain('b3_c2_hornbow'); }
      if (b3In('sohra')) S.f.b3_herdMother = 1; }, txt:
`The captain goes down in the gully with his plume in the mud, and the riders who are left go south into the dark, and every child who went into that river is on this side of it, alive, wet, and screaming for its mother.

Their mothers come across at midnight, when the river has dropped enough for the Rhivi to swim the horses over, and there is a great deal of noise, and some of it is weeping and most of it is not. The girl from the bank finds her sister, the one who always gets the dun calf. The dun calf made it too. Sennet is very pleased about the calf.

${S.f.b3_c2_bowGift ? `Later, an old Rhivi man comes to the Fourth's fire with a bow in his hands: bhederin horn and sinew, doubled back on itself, a good bow. "My nephew's," he says, in trade-tongue. "By the stream. He would want it shooting." He puts it down by the fire and goes.

` : ''}${b3In('sohra') ? `Sohra sits down by you at the fire, soaked, shaking, with a blanket somebody's mother put round her, and doesn't say anything for a long time.

"Herd-mother," she says at last, quietly, in Rhivi, and then in Malazan so you will have it too: "Herd-mother. That is what we call the one who goes back for the calves." She doesn't look at you. "I will not say it again. I wanted it said once."` : `A Rhivi woman you have never seen before comes and sits by the Fourth's fire for a while, without saying anything, and leaves a pot of something hot.`}`,
    html:allyHTML('The river · the far bank'),
    ch:[{t:'The far bank, tonight.', go:()=>startExplore()}]}),

  /* the wagons */
  b3_c2_key_wagons:()=>({sp:'The river · the spate', scene:'b3_c2_flood', fx:()=>{ if (!S.f.b3_c2_keyFx) { S.f.b3_c2_keyFx = 1; ally(-1, 0, 'The herd, left to the water');
      S.inv.sharper = (S.inv.sharper || 0) + 1; S.inv.burner = (S.inv.burner || 0) + 1; S.inv.salve = (S.inv.salve || 0) + 1; note('From the wagons you saved: a sharper, a burner and a jar of salve. The quartermaster\'s clerk says nothing, and writes it down.', 'good');
      c2L('brisk', 2); c2L('kettle', 1); c2L('sohra', -2); c2L('ohl', -1); } }, txt:
`You go for the wagons.

Into the shallows, shoulders to the wheels beside the Fourth Regiment, and the oxen bellowing and the water already climbing your legs. ${b3In('brisk') ? `Brisk puts her shoulder to the first wheel beside Tav without a word, and he looks at her, once, and doesn't sing.` : ''}${b3In('kettle') ? ` Kettle goes for the Moranth crates, because Kettle would go for the Moranth crates if the sky were falling, and gets two of them up the bank by herself, and goes back for a third.` : ''}

Then the water hits.

It hits the wagons broadside and the wagons groan like ships, and for a moment they all start to go, all of them, and then they don't. They don't, because there are thirty pairs of shoulders on them and none of those shoulders will let go, and the first wagon comes up the bank out of the brown water, and then the second, and then all of them but one.

Behind you, out in the ford, the tail of the herd. You don't watch. You hear it. Then you watch, because you owe it that.

The Rhivi riders reach some of the children. Not all of the calves. ${b3In('sohra') ? `Sohra went in after them alone when you went for the wagons. She comes out a long way downstream with a boy of six in her arms, alive, and stands in the reeds of the far bank holding him, looking across the river at you. She does not wave.` : `On the far bank a woman is standing in the reeds holding a child, looking across the river at the Malazans and the wagons. She does not wave.`}

And then, along the near bank, out of the dusk: riders. Not Rhivi. Coming for the last wagon, the one on its side in the shallows.`,
    ch:[{t:'"Shields. Hold the wagons."', go:'b3_c2_wagon_fight'}]}),
  b3_c2_wagon_fight:()=>({sp:'The wagon-ford · dusk', txt:
`Betakullid: the riders who ran south from the hill, or their brothers, who have shadowed the column for a week waiting for it to come apart. The river has done it for them. Half the alliance is on the far bank and the other half is picking itself out of the mud, and the wagons are full of bread.

The Fourth Regiment's heavies form on the squad without being told, two files, shields up. ${b3In('brisk') ? `Tav is in the left file. Brisk looks at him once and then not again, the way you don't look at a thing you might start counting.` : ''}`,
    ch:[{t:'Hold the wagons.', go:()=>startBattle('b3_c2_wagonfight', {})},
        {t:'Kettle\'s sharper into them where they come down to the water.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c2_wagonfight', {pre:true})}]}),
  b3_c2_after_wagons:()=>({sp:'The near bank · night', scene:'b3_c2_flood_night', fx:()=>{ S.f.b3_c2_floodDone = 1; S.f.b3_c2_tavWagons = 1; }, txt:
`The captain goes off the top of the wagon into the shallows with his plume under him, and his riders go south into the dark, and the wagon of salt pork is still the Host's.

The Fourth Regiment rights it with ropes and oxen and a great deal of noise, and somebody starts singing, and it is Tav, and this time nobody throws anything.

${b3In('brisk') ? `Afterwards he comes and sits down by Brisk at the Fourth's fire, wet through, steaming. He doesn't say anything. After a while he takes four coppers out of his belt-pouch, one at a time, and puts them on the ground between them, in a row.

Brisk looks at them for a long time. Then she pushes them back to him with one finger.

"Not yet," she says. "Not for this."

He puts them away. He doesn't argue. Neither of them says anything else, and they sit there until the fire is out.` : `Afterwards a big Cawn heavy from the Fourth Regiment comes and stands by the Fourth's fire for a while, wet through, steaming, saying nothing, and then nods to the squad, once, and goes back to his own.`}

Across the river, the Rhivi fires. You can hear them counting. Calves, children, riders. The count goes on a long time.${b3In('sohra') ? `

Sohra does not come back across that night. She sends no word. In the morning she is there by the fire when you wake, as if she had always been, with her bow across her knees, and she does not say anything about the river. She does not say anything about anything until noon.` : ''}`,
    html:allyHTML('The river · the near bank'),
    ch:[{t:'The near bank, tonight.', go:()=>startExplore()}]}),

  /* on, toward Capustan: the chapter's end, declinable */
  b3_c2_onward:()=> !S.f.b3_c2_floodDone ? {sp:'The road south-east', txt:
`The road south-east goes on past the river. ${S.f.b3_c2_key ? 'The water first.' : 'The column crosses here or not at all, and the herd is half across.'}`,
    ch:[{t:'Not yet.', go:()=>startExplore()}]} : {sp:'The road south-east', scene:'b3_c2_herds', txt:
`Six weeks out of Pale.

The river goes down in two days, the way the Rhivi said it would, and the whole alliance crosses, wagons and herds and armies, and goes on south-east across the last of the plain. ${S.f.b3_c2_key === 'herd' ? 'The Rhivi ride closer to the Host\'s column than they did. Children come and stand at the edge of the Fourth\'s fire in the evenings and stare, and run away shrieking when ' + (b3In('kettle') ? 'Kettle' : 'anybody') + ' waves.' : 'The Host eats. The Rhivi ride a little further off from the Host\'s column than they did, and count their herd every evening where the Malazans can hear them.'}

Ahead, the Barghast hills on the left hand, and somewhere ahead of that, Capustan, on its river, under siege. The outriders say they can see smoke on the horizon at dawn now. A great deal of smoke.

${b3In('ohl') ? `Ohl has started looking at the horizon in the mornings the way he looks at a wound before he unwraps it. ` : ''}${b3In('kettle') ? `Kettle counts the munitions at every halt. ` : ''}${b3In('tuft') ? `Tuft has not drawn a card since the Rhivi fires. ` : ''}You count the Fourth. You count twice.`,
    html:allyHTML('The Rhivi Plain · six weeks out of Pale'),
    ch:[{t:'On, toward Capustan.', go:()=>chapterEnd(2, S.f.b3_c2_key || 'herd')},
        {t:'Not yet.', go:()=>startExplore()}]},
});
