/* ============ Book Four, Chapter 2: Coltaine's Fall ============ */
/* The first day out of Aren on the Aren Way (House of Chains, ch 11). The column goes north between the empty trees, hung with fetishes
   and painted soldiers; the Adjunct forbids cutting them. The standard is raised at the column's head, far off. The army camps at dusk
   barely past Coltaine's Fall, the hill where the Chain ended, now a pilgrims' place: Book Two's squad calls it the Barrow. At dusk the
   squad drives men off the hill who are stripping the memorials for Aren's markets. In the night a Claw comes to the Adjunct's tent, and
   by morning the news is everywhere (belief, never narration): Whiskeyjack, the Bridgeburners, Paran, Dujek's Host. Duiker's tree is
   empty (camp talk). The Crow elders refuse Temul (camp talk). Key (S.f.b4_c2_key): 'fall' (up the hill at night with the pilgrims, the
   names and the keepsakes; the robbers' second try on the hill, with regulars who went up after; the squad's place in the column and a
   rest are lost; Haddat +2, Marrow +1, Nerve +1; S.f.b4_fallClimbed = 1) or 'march' (the Third keeps its place, as ordered; the night
   probe on the 9th's line and its second ground in the column; Radde approves, Nerve +1, Haddat −1; b4_fallClimbed = 0).
   The trick: the Pilgrim's Crow (an old Crow pilgrim on the hill). Notes for later chapters: docs/hoc-ch2-notes.md. */
/* FOR THE ARTIST (72b): names this file uses.
   Items: ART['item/b4_c2_crowfeather'], ['item/b4_c2_fetish'], ['item/b4_c2_milestone'].
   Figures: b4_c2_scavenger (the hill's robbers, the braid-cutter, the relic-buyer's man), b4_c2_raider (tribal raiders), b4_c2_pilgrim
   (Crow pilgrims, old), b4_c2_temul. Reused: b4_c1_hollet, b4_c1_radde, b4_c1_recruit, b4_c1_tough, b2soldier, hissari_m, wickan.
   Backdrops (SCENEX): b4_road_fire and b4_march (70's, redrawn), b4_c2_trees, b4_c2_fall (dusk; night from phase 3), b4_c2_standard.
   Ground (TILEX): b4_c2_way ('.' road, ',' verge, 'T' spiked tree, '#' rock, 'c' cart, 'F' fire; here also 'P' a tree with painted
   figures, 'k' a roadside cairn, 'm' the last milestone, 'n' a tent), b4_c2_fall ('.' earth, ',' grass, 'a' anthill and tokens, '#'
   stone, 'F' a pilgrim's lamp). A battle's 't' is a cart on the Way and a heap of tokens on the hill. */

/* ---- small helpers (b42: Book Four, Chapter Two) ---- */
const b42L = (id, n) => { if (b4In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b42Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b4In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* the recruit who walks with the squad, and a line for them */
const b42Rec = () => b4In('redblade') ? 'redblade' : b4In('warlock') ? 'warlock' : b4In('orvas') ? 'orvas' : null;
const b42R = m => { const r = b42Rec(), v = r && m[r]; return v ? (typeof v === 'function' ? v() : v) : ''; };
const b42Dog = () => b4In('sathi') || (!!b4Was('b2_hackleBack') && !(S.dead && S.dead.hackle));
const b42New = () => HOC_NEW.filter(id => b4In(id));
/* the phase: 1 the road by day, 2 the camp at dusk, 3 the night (the robbers driven off), 4 the key taken, 5 the morning */
const b42Ph = () => S.f.b4_c2_ph || 1;
const b42Key = () => S.f.b4_c2_key || null;
const b42Wick = () => b4Was('b2_c7_key') === 'wickans';
/* the key fight is behind the squad */
const b42Done = () => !!(S.f.b4_c2_hillDone || S.f.b4_c2_probeDone);
const b42Drop = it => { S.kit = (S.kit || []).filter(x => x !== it); Object.values(S.gear || {}).forEach(g => Object.keys(g || {}).forEach(k => { if (g[k] === it) delete g[k]; })); };
/* Book Two's keepsakes still in the kit (a transfer) */
const b42Keeps = () => { const k = b4Was('keepsakes'); return Array.isArray(k) ? k.filter(it => ITEMS[it] && (S.kit || []).includes(it)) : []; };
/* the one Barrow line in this chapter: who of the squad's own is on that hill (fresh start: Sathi, and Hackle's absence) */
function b42Barrow(){
  if (b4Fresh()) return `Sathi is up there. She stayed on it with the Fist's last four hundred when the rest of you went on to the walls, and she laughed at the last funeral any of you saw her at, and Hackle went up the hill at her knee and nobody has seen him since.`;
  const st = b4Was('b2_stay'), held = b4Was('b2_barrowHeld'), ids = st && typeof st === 'object' ? Object.keys(st).filter(id => st[id] && TPL[id]) : [], f = ids.length ? ids : b4Fallen();
  if (!f.length) return `None of the squad is up there. Every one of you was on the walls that day, and watched it from there, and that is its own weight to carry up a road.`;
  const n = b4And(f.map(id => TPL[id].name));
  return `${n} stayed up there with the Fist's last four hundred, when the rest of you went on to the walls${held === 1 ? ', and held it, for as long as it was ever going to be held' : held === 0 ? ', and it did not hold, and nobody had expected it to' : ''}. ${f.length > 1 ? 'They are' : ['tangle', 'redblade', 'warlock'].includes(f[0]) ? 'He is' : 'She is'} somewhere under the braids now.`; }

/* ---- the Pilgrim's Crow: an old Crow pilgrim's word, on Coltaine's Fall. Spirit-craft. ---- */
Object.assign(TRICKS, {
  b4_c2_crow:{name:'The Pilgrim\'s Crow', ch:2, use:'fight', ab:'t_b4_c2_crow', spirit:true, where:'Coltaine\'s Fall at dusk, from an old woman of the Crow Clan',
    lore:'The Crow say the birds that took the Fist off his cross took him nowhere: they keep him, and keep the ones who were his, and they do not like a blade put into one of theirs. An old woman of the clan taught the word for asking. She said the crows decide.',
    get fx(){ return `Once a fight: the bearer says the Crow's word, and crows cry over the field. Until the bearer's next turn every enemy blow that would land on the bearer is struck again${S && S.lvl >= 11 ? ', and on any squadmate beside the bearer as well' : ''}; only the second blow counts. Spirit-craft: it never sputters.`; }},
});
const b42CrowOn = t => !!(B && B.b4crow && B.b4crow.u.hp > 0 && t && t.side === 'p' && !t.ally && t.hp > 0 && (t === B.b4crow.u || (S.lvl >= 11 && cheb(t, B.b4crow.u) === 1)));
Object.assign(AB, {
  t_b4_c2_crow:{name:TRICKS.b4_c2_crow.name, trick:'b4_c2_crow', self:true, spirit:true, desc:()=>TRICKS.b4_c2_crow.fx,
    run(u){ B.b4crow = {u, turn:B.turn}; AUDIO.play('shadow'); float(u, 'the crows', '#2a2a32'); sparks(u.x, u.y, 12, '#3a3a44', .5);
      blog(`${u.name} says the Crow's word, low, the way the old woman said it. Somewhere over the field crows start to cry, and do not stop.`); }},
});
/* the re-roll: a blow that would land on the crows' own is struck again, and the second blow is the one that counts */
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (!(b4On() && B && a && a.side === 'e' && b42CrowOn(t))) return _attack(a, t, o);
    const c = atkCalc(a, t, o), n1 = d20(), hit1 = n1 >= c.critOn || (n1 !== 1 && n1 + c.bonus >= c.ac);
    if (!hit1) { const r0 = Math.random; let once = true; Math.random = () => { if (once) { once = false; return (n1 - .5) / 20; } return r0(); }; try { return _attack(a, t, o); } finally { Math.random = r0; } }
    const n2 = d20(); blog(`<em>The crows.</em> ${a.name}'s blow is struck again.`); float(t, 'the crows', '#3a3a44');
    const r0 = Math.random; let once = true; Math.random = () => { if (once) { once = false; return (n2 - .5) / 20; } return r0(); };
    try { return _attack(a, t, o); } finally { Math.random = r0; } }; }
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); if (b4On() && B && B.b4crow && B.b4crow.u === u) B.b4crow = null; return r; }; }

/* ---- the milestone chip: a whetstone. Whoever carries it, the first blow that lands in a fight does +1 damage ---- */
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (!(b4On() && B && a && a.side === 'p' && !a.ally && !a.b4whet && Object.values((S.gear && S.gear[a.id]) || {}).includes('b4_c2_milestone'))) return _attack(a, t, o);
    const dd = o.dmg || a.dmg; if (!dd) return _attack(a, t, o);
    const r = _attack(a, t, Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + 1]}));
    if (r && r.hit) a.b4whet = true; return r; }; }

/* ---- the words this chapter adds to Book Four's glossary ---- */
GLOSSX.hoc.push(
  [2, 'The empty trees', 'The trees along the Aren Way where the High Fist\'s army was nailed up, at the end of the Chain. They are empty now, spike holes and stains, and the pilgrims have hung them with braids and painted soldiers. The Adjunct will not let them be cut down.', ()=>!!(S.f && S.f.b4_c2_tree)],
  [2, 'The standard', 'The Fourteenth\'s standard, made of the bones: a thin figure holding up a bone before a sandstorm. Raised on the Aren Way, at the head of the column, too far off to see clearly from the 9th.', ()=>!!(S.f && S.f.b4_c2_standard)]);

/* ---- the reading at the first halt: a fire off the Aren Way below the Fall ---- */
B4DECK[2] = {scene:'b4_road_fire', where:'a flat stone by the fire, with the dust brushed off it', set:'Dusk on the first day out of Aren, with the city\'s walls still in sight behind the column, and the hill above the fire hung with braids.',
  back:'b4_c2_fire', backT:'Back to the fire.',
  say:{marrow:`She looks up at the hill once, and then not again. "The first fire out of a city," she says. "I read on the first night of the Chain too, child. I won't say what came up." She shuffles. "One card. For the road north, this time."`,
    tallow:`"My grandmother said you read at the first fire out," he says. "Before anyone's had time to be afraid." He looks up at the hill, and the braids on it moving in the last of the light. "That's probably gone, then. One card, Sergeant?"`,
    oldninth:`The old soldier has walked over from the cook-lines with his cup. "First night out," he says. "I always read the first night out. Rum after." He glances at the hill and away. "The Deck knows where we're sitting. One card."`}};

const B4CH2 = {
  title:'Coltaine\'s Fall', number:'Two',
  intro:{loc:'The Aren Way', sub:'The first day out of Aren', scene:'b4_c2_trees', cap:'The column going north between the trees, and every tree empty, and every tree hung with something.',
    paras:[
`The Fourteenth goes out of Aren's north gate in the grey of the morning, three legions and the wagons and the horse, and turns onto the Aren Way. The city comes up on its walls one more time to watch.`,
()=>`The trees begin at the gate. You know them. The whole of Seven Cities knows them: the trees along the Way where the High Fist's army was nailed up, ten thousand of it, at the end of the Chain. ${b4Fresh() ? 'You came in under them, the last mile, and saw.' : 'The squad came in under them, the last mile, and saw.'} They are empty now, and hung with things.`,
`The 9th is in the middle of the column, which Radde says is the best place in any army to be: too far back to be first and too far forward to be eaten by the wagons' dust. He has seen two wars. He says the column will make the hill by dusk, and that the hill is a day's march, and that both of these will be true, and that you will see why.`],
    go:'Onto the Way', node:'b4_c2_start'},

  areas:[
    /* 16 x 12 (b4_c2_way, day). . the road  , the verge  T the empty trees  # rock  c the company's water cart  P a tree hung with painted figures
       k a roadside cairn (the view of the hill)  m the last milestone  < back toward Aren  > on, to the night's camp */
    { id:'b4_c2_road', title:'The Aren Way', sub:'The first day out of Aren · the 9th in the column', hint:'Tap ground to move · tap a figure to talk · the column goes east', decor:'b4_c2_way',
      map:[ "################",
            "#,,T,,,,T,,,,T,#",
            "#,,,,,#,,,,,k,,#",
            "#......P.......#",
            "<..c...........>",
            "#..............#",
            "#.........m....#",
            "#,,T,,,,,T,,,T,#",
            "#,,,,#,,,,,,,,,#",
            "#,T,,,,,,,T,,,,#",
            "#,,,,,,,,,,,,,,#",
            "################" ],
      walk:'.,', triggers:{P:'b4_c2_tree', c:'b4_c2_cart', k:'b4_c2_hillview', m:'b4_c2_milestone', '<':'b4_c2_back', '>':'b4_c2_to_camp'}, start:{x:2, y:5},
      quest:()=> !S.f.b4_c2_hollet ? 'Captain Hollet, by the company\'s water cart.' : !S.f.b4_barrowSeen ? 'The column goes east. There is a cairn on the verge where you can see ahead.' : 'East, with the column, to the night\'s camp.',
      npcs:[
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:4, y:5, node:()=>S.f.b4_c2_hollet ? 'b4_c2_hollet_again' : 'b4_c2_hollet_road', fresh:()=>!S.f.b4_c2_hollet},
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:8, y:5, node:()=>'b4_c2_radde_road', fresh:()=>!S.f.b4_c2_raddeRoad},
        {id:'axes', name:'A squad of the 10th', kind:'b2soldier', x:4, y:2, node:()=>S.f.b4_c2_axes ? 'b4_c2_axes_again' : 'b4_c2_axes', fresh:()=>!S.f.b4_c2_axes},
        {id:'crows', name:'Old pilgrims on the verge', kind:'b4_c2_pilgrim', x:12, y:8, node:()=>'b4_c2_crows', fresh:()=>!S.f.b4_c2_crows},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:11, y:4, node:()=>S.f.b4_c2_ask ? 'b4_c2_ask_again' : S.f.b4_barrowSeen ? 'b4_c2_ask' : 'b4_c2_recruits_road', fresh:()=>!!S.f.b4_barrowSeen && !S.f.b4_c2_ask} ] },

    /* 16 x 12 (b4_c2_way, dusk and night). . trampled road  , verge  # rock  T the trees along the Way  n tents  c the company's carts
       F the Third's fire  ^ the path up the hill */
    { id:'b4_c2_camp', title:'Below Coltaine\'s Fall', sub:'The 9th\'s camp · dusk, the first night out', hint:'Tap ground to move · tap a figure to talk · the fire is the Third\'s; the path up the hill is north', decor:'b4_c2_way', dark:true,
      map:[ "#######^^#######",
            "#,,,,,,..,,,,,,#",
            "#,n,n,,..,,n,n,#",
            "#,,,,,,..,,,,,,#",
            "#TT............#",
            "#......F.......#",
            "#..c...........#",
            "#.n.n......n.n.#",
            "#..............#",
            "#,,,,,,,,,,,,,,#",
            "#,,T,,,,,T,,,,T#",
            "################" ],
      walk:'.,', triggers:{F:'b4_c2_fire', '^':'b4_c2_path', c:'b4_c2_wagons'}, start:{x:7, y:8},
      quest:()=> b42Ph() <= 2 ? (S.f.b4_c2_robbersDone ? 'The fire.' : 'Radde wants the Third up the hill before dark. The path is north.') : b42Ph() === 3 ? 'The fire, and Radde. The pilgrims are lighting their lamps on the hill.' : b42Key() === 'march' && !S.f.b4_c2_probeDone ? 'The Third\'s place on the line, at the camp\'s edge.' : 'The fire.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:5, y:6, node:()=>b42Ph() >= 3 && !b42Key() ? 'b4_c2_key' : 'b4_c2_radde_camp', fresh:()=>b42Ph() >= 3 ? !b42Key() : !S.f.b4_c2_raddeCamp},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:10, y:3, node:()=>'b4_c2_hollet_camp', fresh:()=>!S.f.b4_c2_holletCamp},
        {id:'marines', name:'Marines of the 8th', kind:'b2soldier', x:12, y:8, node:()=>'b4_c2_marines', fresh:()=>!S.f.b4_c2_duiker},
        {id:'oldninth', name:'An old soldier of the 9th', kind:'b2soldier', x:3, y:8, node:()=>'b4_c2_oldsoldier', fresh:()=>!S.f.b4_c2_oldsoldier},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:9, y:6, node:()=>'b4_c2_recruits_camp', fresh:()=>!S.f.b4_c2_recCamp},
        {id:'temul', name:'Temul', kind:'b4_c2_temul', x:8, y:1, node:()=>'b4_c2_temul', show:()=>b42Wick() && b42Ph() === 3 && !S.f.b4_temulPast, fresh:()=>b42Wick() && b42Ph() === 3 && !S.f.b4_temulPast},
        {id:'line', name:'The 9th\'s line', kind:'b2soldier', x:14, y:5, node:()=>'b4_c2_line', show:()=>b42Key() === 'march' && !S.f.b4_c2_probeDone, fresh:()=>b42Key() === 'march' && !S.f.b4_c2_probeDone} ] },

    /* 16 x 12 (b4_c2_fall, dusk and night). . earth  , grass  a anthills and the pilgrims' tokens  # stone  F a pilgrim's lamp  v down to the camp */
    { id:'b4_c2_hill', title:'Coltaine\'s Fall', sub:'The hill above the Way · dusk', hint:'Tap ground to move · tap a figure to talk · the camp is down the path, south', decor:'b4_c2_fall', dark:true,
      map:[ "################",
            "#,,,a,,,##,,a,,#",
            "#,a,,,,F,,,,,,,#",
            "#,,,,..a..,,a,,#",
            "#,#,......,,,,,#",
            "#,,a,..F..a,,#,#",
            "#,,,,......,,,,#",
            "#,a,,,,..,,,a,,#",
            "#,,,#,,..,,,,,,#",
            "#,,,,,,..,,a,,,#",
            "#,,,,,,..,,,,,,#",
            "#######vv#######" ],
      walk:'.,', triggers:{F:'b4_c2_lamp', v:'b4_c2_hill_down'}, start:{x:7, y:10},
      quest:()=> b42Key() === 'fall' ? (S.f.b4_c2_hillDone ? 'Down to the column, before the dawn.' : !S.f.b4_c2_names ? 'The pilgrims, on the slope.' : 'Wait with the pilgrims. The robbers will come back.') : !S.f.b4_c2_robbersDone ? 'Men at the top of the hill, cutting the braids down.' : 'Down to the camp, south.',
      npcs:[
        {id:'pilgrim', name:'An old woman of the Crow', kind:'b4_c2_pilgrim', x:4, y:6, node:()=>b42Key() === 'fall' && !S.f.b4_c2_names ? 'b4_c2_names' : 'b4_c2_pilgrim', fresh:()=>b42Key() === 'fall' ? !S.f.b4_c2_names : !S.f.b4_c2_pilgrim},
        {id:'robbers', name:'Men with knives', kind:'b4_c2_scavenger', x:8, y:2, node:()=>'b4_c2_robbers_go', show:()=>!S.f.b4_c2_robbersDone, fresh:()=>!S.f.b4_c2_robbersDone},
        {id:'dark', name:'Lamps going out at the crest', kind:'b4_c2_scavenger', x:10, y:2, node:()=>'b4_c2_hill_wait', show:()=>b42Key() === 'fall' && !!S.f.b4_c2_names && !S.f.b4_c2_hillDone, fresh:()=>b42Key() === 'fall' && !!S.f.b4_c2_names && !S.f.b4_c2_hillDone} ] },

    /* 16 x 12 (b4_c2_way, morning): the same camp at dawn, the column forming on the Way */
    { id:'b4_c2_morning', title:'Below Coltaine\'s Fall', sub:'The 9th\'s camp · morning, the column forming', hint:'Tap ground to move · tap a figure to talk · the fire, and then the road', decor:'b4_c2_way',
      map:[ "################",
            "#,,,,,,..,,,,,,#",
            "#,n,n,,..,,n,n,#",
            "#,,,,,,..,,,,,,#",
            "#TT............#",
            "#......F.......#",
            "#..c...........#",
            "#.n.n......n.n.#",
            "#..............#",
            "#,,,,,,,,,,,,,,#",
            "#,,T,,,,,T,,,,T#",
            "################" ],
      walk:'.,', triggers:{F:'b4_c2_fire', c:'b4_c2_wagons'}, start:{x:7, y:8},
      quest:()=> !S.f.b4_c2_hollet3 ? 'Captain Hollet. The news has reached the Second Company.' : 'The fire, and then the road. The column is forming.',
      npcs:[
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:10, y:3, node:()=>'b4_c2_hollet_news', fresh:()=>!S.f.b4_c2_hollet3},
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:5, y:6, node:()=>'b4_c2_radde_dawn', fresh:()=>!S.f.b4_c2_raddeDawn},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:9, y:6, node:()=>'b4_c2_fear', fresh:()=>!S.f.b4_c2_fear} ] } ],

  battles:{
    /* the Fall at dusk: men stripping the memorials for the markets; the second ground is the crest, among the tokens */
    b4_c2_robbers:{title:'Coltaine\'s Fall', style:'b4_c2_fall', dark:true, open:true, warrenText:'Dusk on the hill · the warren is close here, and crowded', warren:{meanas:1, denul:1}, music:'battle',
      map:["##..,..#",".,..t...","...,..,.","..t.....","........",".,....,.","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c2_scav',2,2],['b4_c2_scav',5,1],['b4_c2_prybar',4,3],['b4_c2_slinger',6,0]], xp:170, after:'b4_c2_robbers_after',
      waves:[{round:2, foes:[['b4_c2_scav',0,5]], text:'Another comes round the shoulder of the hill with a sack over his arm and a knife in his hand, late for his share.'}],
      preText:()=>`Tangle's sharper goes off on the bare slope below them, well clear of the braids, and the men cutting at the tokens come round with their knives and their sacks and their mouths open.`,
      stage2:{title:'The crest', xp:85,
        text:()=>`They go back up the hill, the way thieves always go, toward what they came for. At the top there is a heap of what they have already cut down: braids, feathers, a dog's skull on a cord, little painted figures of soldiers, all in a pile on a cloak, ready to carry. A man in a good headcloth is standing over it with a long knife, waiting for his sacks.\n\n${b42Say({haddat:`Haddat sees the pile and says one word in Hissari that is not a prayer.`, sathi:`Sathi sees the pile, and the crow feathers in it, and stops grinning.`, marrow:`Marrow looks at the pile and her mouth goes thin. "Child," she says, to the man in the headcloth. It is not kindly meant.`, _:`The pile on the cloak does not need anybody to say what it is.`})}`,
        map:["#..t..,#","........","..,..,..","....t...","........",".t......","........","...,....","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c2_cutter',3,1],['b4_c2_scav',1,2],['b4_c2_prybar',6,2],['b4_c2_slinger',4,0]]} },
    /* 'march': the night probe on the 9th's line, with the company; the second ground is in the column, among the wagons (the key fight) */
    b4_c2_probe:{title:'The 9th\'s line', style:'b4_c2_way', dark:true, open:true, warrenText:'Night on the Way · the warren is quiet, and listening', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:["..,..,..","........",".#....,.","........","...,....","..t..t..","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c2_spear',2,1],['b4_c2_spear',5,1],['b4_c2_bow',4,0],['b4_c2_blade',7,2]], xp:200, after:'b4_c2_probe_after',
      waves:[{round:3, foes:[['b4_c2_blade',0,3]], text:'One more comes in out of the dark on the left, low and fast, from the rocks by the road.'}],
      preText:()=>`Tangle's sharper goes off in the dark in front of the line, and for one white breath the raiders are there to see, a dozen of them, crouched, painted, much closer than anybody had thought.`,
      stage2:{title:'In the column', xp:100, keepAllies:true,
        text:()=>`They break off the line, the ones who can, and do not go back into the dark. They go along it, the way water goes, to where the 9th's wagons are drawn up behind the tents with the oxen asleep in the traces.\n\nBy the time the squad gets there somebody has cut the first team loose and there is a torch in the hand of a man on a wagon-bed, and the wagon-drivers are under their wagons, and the company is coming up behind the squad in its nightshirts with spears.${b42Say({darrut:`\n\n"Wagons," Darrut says, running. "It's always the wagons. In the Guard it was always the wagons."`, tangle:`\n\n"Don't throw anything," says Tangle, running. "There's lamp oil on that one."`, _:''})}`,
        map:["........","..t..t..","........","...,....","..t..t..","........","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c2_chief',3,1],['b4_c2_spear',1,3],['b4_c2_torch',6,0],['b4_c2_bow',4,0]]} },
    /* 'fall': the robbers' second try, on the hill in the dark, with the regulars who went up after the squad; the second ground is the summit */
    b4_c2_hill:{title:'The Fall at night', style:'b4_c2_fall', dark:true, open:true, warrenText:'Night on the hill · the warren is full of something, and patient', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8]], n:1},
      map:["#..,...#","...t....","........","..,...t.","........","....,...",".t......","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c2_tough',1,1],['b4_c2_tough',6,1],['b4_c2_scav',3,2],['b4_c2_slinger',5,0]], xp:200, after:'b4_c2_hill_after',
      waves:[{round:2, foes:[['b4_c2_prybar',0,4],['b4_c2_scav',7,4]], text:'Two more come up the far side of the hill, where the pilgrims are, for the lamps and the cloaks and whatever the pilgrims left at the tokens tonight.'}],
      preText:()=>`Tangle's sharper goes off on the path below the crest where nobody is praying, and the men coming up it with shuttered lanterns are suddenly lit, and suddenly a great deal less quiet.`,
      stage2:{title:'The summit', xp:100, keepAllies:true,
        text:()=>`The ones on the path go back over the crest, and the squad goes over after them, between the anthills and the heaps of tokens, with the pilgrims' lamps going out behind as the old people put them out to be dark.\n\nThe man in the good headcloth is there again at the top, with two hired men from Aren's harbour, big ones, and a cloak spread for the braids. He has come back for what he left. He has brought more knives this time.${b42Say({haddat:`\n\n"Twice," Haddat says. "On this hill, twice." Her shield comes up.`, _:''})}`,
        map:["#..,..,#","..t..t..","........","........","...,....","........","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c2_cutter',3,1],['b4_c2_tough',1,2],['b4_c2_tough',6,2],['b4_c2_slinger',4,0]]} } },

  foes:{
    /* the hill's robbers: Seven Cities scavengers out of Aren's poor quarters, stripping the memorials for the relic markets (never Semk) */
    b4_c2_scav:{name:'Scavenger', sig:'s', kind:'b4_c2_scavenger', hp:11, ac:12, atk:3, dmg:[1,6,1], rng:1, mv:5, init:2, sk:['bleed'], verb:'slashes with a knife at'},
    b4_c2_prybar:{name:'Scavenger with a pry-bar', sig:'p', kind:'b4_c2_scavenger', hp:13, ac:12, atk:3, dmg:[1,8,0], rng:1, mv:4, init:1, sk:['shove'], verb:'swings an iron bar at'},
    b4_c2_slinger:{name:'Scavenger with a sling', sig:'g', kind:'b4_c2_scavenger', hp:8, ac:11, atk:3, dmg:[1,6,0], rng:5, mv:4, init:2, sk:['pin'], verb:'slings a stone at'},
    b4_c2_cutter:{name:'The braid-cutter', sig:'C', kind:'b4_c2_scavenger', hp:24, ac:13, atk:5, dmg:[1,10,1], rng:1, mv:4, init:2, boss:true, sk:['rally', 'bleed'], verb:'cuts with a long knife at'},
    b4_c2_tough:{name:'Hired man from the harbour', sig:'t', kind:'b4_c1_tough', hp:13, ac:12, atk:4, dmg:[1,8,0], rng:1, mv:4, init:1, sk:['shove'], verb:'brings a club round on'},
    /* tribal raiders harrying the column (never named, never Leoman's) */
    b4_c2_spear:{name:'Raider with a spear', sig:'r', kind:'b4_c2_raider', hp:13, ac:12, atk:4, dmg:[1,8,0], rng:1, mv:5, init:2, verb:'thrusts a spear at'},
    b4_c2_blade:{name:'Raider with a tulwar', sig:'w', kind:'b4_c2_raider', hp:11, ac:12, atk:4, dmg:[1,6,1], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
    b4_c2_bow:{name:'Raider with a horn bow', sig:'b', kind:'b4_c2_raider', hp:9, ac:12, atk:4, dmg:[1,8,0], rng:6, mv:4, init:2, sk:['pin'], verb:'looses at'},
    b4_c2_torch:{name:'Raider with a torch', sig:'f', kind:'b4_c2_raider', hp:10, ac:11, atk:3, dmg:[1,6,1], rng:1, mv:5, init:2, verb:'swings a burning brand at'},
    b4_c2_chief:{name:'The raiders\' leader', sig:'L', kind:'b4_c2_raider', hp:21, ac:13, atk:5, dmg:[1,10,1], rng:1, mv:5, init:3, boss:true, sk:['rally'], verb:'brings a heavy tulwar down on'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b4_c2_crowfeather:{name:'A crow feather from the Fall', slot:'trinket', who:null, stat:{wits:1},
      line:'A long black flight feather from the hill where the Fist died, taken by leave of an old woman of the Crow, tied with a twist of red wool. On the Chain\'s bone it sits as if it had always been meant to. Whoever wears it notices things a moment sooner: +1 wits.'},
    b4_c2_fetish:{name:'A braided fetish off the trees', slot:'trinket', who:null, ac:1,
      line:'A plait of horsehair and red thread with a small painted soldier knotted into it, fallen from one of the empty trees on the Aren Way into the road, where the wagons would have had it. Not cut: picked up. Haddat ties it to a shield rim the Hissari way. On anyone it turns a blow now and then: +1 armour.'},
    b4_c2_milestone:{name:'A chip of the last milestone', slot:'trinket', who:null,
      line:'A flat chip of grey stone knocked off the last milestone on the Aren Way, the one the Aren Guard counted the city from. It takes an edge like a temple whetstone. Whoever carries it puts a better edge on before a fight: the first blow that lands in a fight does +1 damage.'} },

  scenes:{
    b4_c2_trees:{loc:'The Aren Way', sub:'The empty trees · the first day out', cap:'The trees along the Way, every one empty, every one hung with braids and painted soldiers, and the column going north under them in its own dust.', amb:'explore'},
    b4_c2_fall:{loc:'Coltaine\'s Fall', sub:'The hill above the Way', cap:'A low hill crawling with ants, hung with braids and dog skulls and crow feathers, and the pilgrims\' lamps going up it as the light goes.', amb:'explore'},
    b4_c2_standard:{loc:'The Aren Way', sub:'The head of the column', cap:'Far up the column, too far to see clearly, something tall going up on a pole: a thin figure, holding up a bone.', amb:'explore'} },

  end:{
    fall:['The Fall at night', 'The Fourteenth marched out of Aren under the empty trees and camped at dusk below the hill where the Chain ended, with the city still in sight. That night the Third went up the hill with the pilgrims and left the names there, and the men who strip the hill for the markets came back, and did not get what they came for. Some of the Second Company went up after the squad. In the morning the news was all through the camp, and the Third marched at the back, in everybody\'s dust.'],
    march:['The column\'s place', 'The Fourteenth marched out of Aren under the empty trees and camped at dusk below the hill where the Chain ended, with the city still in sight. That night the pilgrims\' lamps went up the hill without the Third. The squad kept its place on the 9th\'s line as ordered, and the raiders came to the line in the dark, and then to the wagons. In the morning the news was all through the camp. Radde wrote that the Third had kept its place. Haddat has not said what she thinks of that.'] },
  endScene:'b4_c2_standard',
  endCap:()=> S.f.b4_c2_key === 'fall' ? 'Morning on the Aren Way. The column goes north under its standard, and at the very back of it, in the dust of three legions, the Third, with the hill behind it hung with something new.' : 'Morning on the Aren Way. The column goes north under its standard, and the 9th in the middle of it, and the Third in its place, and the hill behind it with its lamps all out.',
  tease:'Next: north, into the Vathar Hills, where something with a great many horses is following the army.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b4_c2_key === 'fall') x.push('The Third climbed the Fall at night with the pilgrims and left the names there. Some of the Second Company went up after it.');
    if (f.b4_c2_key === 'march') x.push('The Third kept its place in the column on the first night, as ordered, and held the 9th\'s line when the raiders came. Radde wrote it down.');
    if (f.b4_c2_robbersDone) x.push('Men from Aren were stripping the braids and feathers off Coltaine\'s Fall for the relic markets. The squad put them off the hill, and put the braids back.');
    if (f.b4_c2_axes === 'stopped') x.push('A squad of the 10th wanted to cut one of the empty trees down. The Third reminded it of the Adjunct\'s order before Radde had to.');
    if (f.b4_temulPast) x.push('Temul walked past the Third\'s fire on the first night, alone, and did not stop. The Crow had refused him.');
    if (f.b4_c2_relicLeft) x.push('The market\'s "Coltaine\'s finger" is buried on the hill where he fell. It is still a goat\'s, probably.');
    if (f.b4_c2_keepLeft) x.push('A keepsake off the Chain stayed on the hill, among the braids.');
    if (b4In('redblade')) x.push('Ramin walked the Way north with the squad, past the place where the Red Blades\' company died.');
    if (b4In('warlock')) x.push('Keth walked the Way north with the squad, and the old woman in him had a word for every pilgrim on the hill.');
    if (f.b4_raminDone === 2 && !b4In('redblade')) x.push('Ramin rides with the Red Blades, near. He will come if he is asked.');
    if (f.b4_kethDone === 2 && !b4In('warlock')) x.push('Keth is with Temul\'s youths, near. He will come if he is asked.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b4_news && 'By the morning after the first night out, the whole camp was saying that Whiskeyjack is dead, and the Bridgeburners, and Captain Paran, and that Dujek\'s Host is broken, in Genabackis. A Claw brought it to the Adjunct in the night, they say. How it got out of her tent, the 9th cannot say.',
    b42Done() && (f.b4_c2_key === 'fall' ? 'On the first night the squad went up Coltaine\'s Fall with the pilgrims and left the names there. The men who strip the hill came back in the dark. They went away again without the braids.' : 'On the first night the raiders came to the 9th\'s line in the dark and then to the wagons. The squad was in its place. So was the company.'),
    f.b4_c2_crowTaught && 'An old woman of the Crow Clan, on the hill, taught the word the Crow use for asking the birds.',
    f.b4_c2_robbersDone && 'At dusk there were men on Coltaine\'s Fall cutting down the braids and the feathers for Aren\'s relic markets. The squad drove them off and put the braids back as near as anybody could tell.',
    f.b4_c2_duiker && 'The marines of the 8th say Duiker\'s tree, the historian\'s, the last on the Way, is empty, and no one knows why. The marines think the markets.',
    f.b4_c2_crowsRefuse && 'The Crow elders have refused Temul. They will not be commanded by a boy, they say, not after Coltaine.',
    f.b4_c2_standard && 'The standard went up at the head of the column on the first day: a thin figure holding up a bone before a sandstorm, made of the army\'s bones. From the 9th it was very small.',
    f.b4_barrowSeen && 'The column went past the hill the squad calls the Barrow. The army calls it Coltaine\'s Fall. It is a pilgrims\' place now, hung with braids.',
    f.b4_c2_tree && 'The trees along the Aren Way are empty, and hung with braids and painted soldiers. The Adjunct has ordered that nobody cut them down.'].filter(Boolean); },

  dlg:{
    /* ---- the road: the first day out, under the trees ---- */
    b4_c2_start:()=>({sp:'The Aren Way', scene:'b4_c2_trees', fx:()=>{ S.f.b4_c2_ph = 1; }, txt:
`Out of the gate, and the column turns north, and the trees close in on both sides of the Way and stay there.

They are not trees any more, most of them. They are posts, and some of them were trees once, and the soldiers of the High Fist's army were nailed to them at the end of the Chain, along the whole length of the road. They are empty. You can see the spike holes from the column, dark, and the stains below them, and that is all there is to see. The dead were taken down. Since then, others have hung the trees with braids of horsehair and red thread, and little painted figures of soldiers in Malazan grey nailed to the bark where the men were.

The recruits look at them for the first mile, and then try not to, and then look at them again.

${b42Say({haddat:`Haddat walks with her shield on her arm and her eyes on the road in front of her. "Ten thousand," she says, in Hissari, to the road. "I counted the first hundred, coming in. Then I stopped."`, tangle:`Tangle counts the satchel by touch through the leather, and then counts it again, which for Tangle is the same as a prayer.`, _:`The squad walks, and the trees go past, and every one of them is empty.`})}${b4In('tallow') ? `\n\nTallow has his eyes on his boots. "They said in the hold," he says, "on the transport. About the road. I thought they were making it worse than it was." He swallows. "They weren't."` : ''}${b4In('hessa') ? `\n\nHessa looks up at each tree as she passes it, the way she must have looked at the faces coming up the temple steps. "Empty," she says. "Good. The Worm has had them."` : ''}${b42R({redblade:`\n\nRamin walks very straight. A company of the Red Blades came down this road on the Chain and did not come off it. He looks at every tree.`, warlock:`\n\nKeth walks with his palms turned to the trees, low, as he passes them. The grandmother is very quiet in him for once.`})}`,
      ch:[{t:'Walk.', go:()=>startExplore()}]}),
    b4_c2_tree:()=>({sp:'A tree on the Aren Way', fx:()=>{ S.f.b4_c2_tree = 1; }, txt:
`One tree close to the road, an old one that was alive once, with its bark gone silver. There are holes in it at the height of a man's wrists, spread wide, and lower down a hole for the feet, and below that the stain. Above the holes somebody has nailed a little painted soldier, a hand high, grey tunic and a red face and a sword, and round its neck a braid of horsehair and red thread, the Wickan way.

All down the road the trees are like this. Pilgrims came out from Aren and did it, the company says, after, without being told.

In the dust at the foot of the tree, where it fell in the night and the wagons will have it in an hour, there is one of the braids, with a soldier knotted into it.

${b42Say({haddat:`Haddat looks at it and then at you.`, marrow:`Marrow looks at it a while, and touches one of the knots on her string.`, _:`The squad looks at it.`})}`,
      ch:[{t:'Pick it up out of the road. Not cut: picked up.', req:()=>!S.f.b4_c2_fetish, fx:()=>{ S.f.b4_c2_fetish = 1; gain('b4_c2_fetish'); b42L('haddat', 1); }, go:'b4_c2_tree_fetish'},
          {t:'Leave it. Walk on.', go:()=>startExplore()}]}),
    b4_c2_tree_fetish:()=>({sp:'A tree on the Aren Way', txt:
`${b42Say({haddat:`Haddat takes it from you, and brushes the dust off it, and ties it to the rim of her shield with three turns and a knot, the Hissari way, and the little painted soldier hangs there by the strap. "He goes north with us, then," she says. "He has seen enough of this road."`, _:`It goes on a shield rim, by the strap, with three turns and a knot, and the little painted soldier hangs there and swings when the shield moves.`})}

Down the road, somebody of the 10th is shouting about an axe.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_axes:()=>({sp:'A squad of the 10th', txt:
`A squad of the 10th Legion has fallen out of the column at the verge, five recruits and a corporal with an axe off a supply wagon, and the corporal is squaring up to one of the trees with his sleeves pushed back.

"Wrong," he is saying. "It's wrong, leaving them up like this. A man ought to cut them down and burn them. You'd want it, if it was your mate nailed up there." He spits on his hands. "Firewood, and decent. Both."

His recruits are not sure. One of them has his hand on the corporal's arm. Up the column, nobody has noticed yet.

${b42Say({darrut:`"The order came down at the gate," Darrut says, low. "The Adjunct's. No one cuts the trees." He has been in the Guard twelve years. He knows what happens to a corporal who is found with an axe in his hand after an order.`, haddat:`Haddat has stopped. "He is not wrong," she says. "And it is not his to do."`, _:`The order came down the column at the gate, from the Adjunct: nobody cuts the trees. Everybody heard it.`})}`,
      ch:[{t:'"The Adjunct\'s order, Corporal. Put the axe back on the wagon."', check:['guile', 13],
            edges:id=>[id === 'darrut' && ['he has talked down an Aren Guard corporal with an axe before', 2], id === 'hessa' && ['a temple guard knows how to say no to a man at a door', 1], id === 'haddat' && ['she is Seven Cities, and he is talking about her dead', -1], id === 'tallow' && ['the corporal is twice his age', -1]],
            near:{t:'Yes, but the corporal takes the sergeant\'s name before he lets go of the axe, and says he will be telling his captain about the 9th\'s Chain squad.', fx:()=>{ S.f.b4_c2_tenthName = 1; }},
            go:'b4_c2_axes_ok', fail:'b4_c2_axes_no'},
          {t:'Leave it to Radde.', fx:()=>{ S.f.b4_c2_axes = 'left'; }, go:'b4_c2_axes_left'}]}),
    b4_c2_axes_ok:()=>({sp:'A squad of the 10th', fx:()=>{ S.f.b4_c2_axes = 'stopped'; b4Nerve(1, 'The recruits saw the Chain squad stop the axe'); }, txt:
`${by({darrut:`Darrut walks up to the corporal the way the Guard walks up to a man at a gate, slow and bored and without any doubt at all, and takes the axe out of his hands by the haft. "Not this one," he says. "Not any of them. She said." He gives the axe to the nearest recruit. "Wagon."`, hessa:`Hessa stands between the corporal and the tree and does not move, the way she stood a temple door for six years, and after a while the corporal finds that he has lowered the axe without deciding to.`, _:`{who} talks to the corporal about the order, and the Adjunct, and the column a hundred paces up the road, until the corporal finds he has lowered the axe without deciding to.`})}

"Someone ought to," the corporal says, to the tree. "That's all."

"Someone did," ${b42Say({haddat:'Haddat says', marrow:'Marrow says', _:'you say'})}. "The pilgrims. Look at it." He looks at the little painted soldier on the bark, and the braid, and then he goes back to the column with his squad.

Further down the verge, the Second Company's recruits watched the whole of it.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_axes_no:()=>({sp:'A squad of the 10th', fx:()=>{ S.f.b4_c2_axes = 'cut'; b42L('haddat', -1); }, txt:
`The corporal is not listening. He gets one stroke into the tree, a white bite out of the silver wood, before Radde comes down the verge at a walk with his stick under his arm and the book in his hand.

Radde does not say anything to the corporal at all. He opens the book and writes, and turns it round so the corporal can see the page, and the corporal reads it, and puts the axe on the ground.

"Back in the column," Radde says. The 10th goes. He looks at the Third. "That was your tree to stop, Sergeant," he says, and writes something else.${b4In('haddat') ? `\n\nHaddat looks at the white cut in the bark for a long breath before she walks on.` : ''}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_axes_left:()=>({sp:'A squad of the 10th', txt:
`You leave it. Radde comes down the verge a moment later at a walk, as if he had been sent for, and opens his book at the corporal, and that is the end of the axe.

He gives the Third a look on the way back that is not quite a mark.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_axes_again:()=>({sp:'A squad of the 10th', txt: S.f.b4_c2_axes === 'cut' ?
`The tree has a white cut in it at the height of a man's chest. The 10th has gone back to the column.` :
`The 10th's squad is back in the column. The tree has its painted soldier, and its braid, and no cut in it.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    b4_c2_hollet_road:()=>({sp:'Captain Hollet · Second Company', fx:()=>{ S.f.b4_c2_hollet = 1; }, txt:
`Captain Hollet is walking beside the company's water cart with a wax tablet, counting barrels that have not changed since he last counted them. He coughs, and looks at the trees, and then back at the tablet very quickly.

"Sergeant." A mark on the tablet. "We've made two miles since the gate. I'm told the head of the column has made four, and the wagons have made one, and they are all the same column." He coughs. "Fist Blistig says the Adjunct is walking us to Raraku at the pace of a funeral. He says it on purpose, near the recruits."

He lowers his voice. "The recruits are frightened of the trees. I don't blame them. I'm frightened of the trees." He looks at the squad. "I'd like the Third at the front of the company for the rest of the day, Sergeant. Where they can see you. Walking past it like any road." He hesitates. "It's a great deal to ask, of you. Of all people."`,
      ch:[{t:'"We\'ll take the front, sir."', fx:()=>{ S.f.b4_c2_front = 1; b4Nerve(1, 'The Chain squad walked at the front of the company, past the trees'); b42L('marrow', -1); b42L('haddat', -1); }, go:'b4_c2_hollet_front'},
          {t:'"Our place, sir. They can see us from where we are."', fx:()=>{ S.f.b4_c2_front = 0; b42L('marrow', 1); }, go:'b4_c2_hollet_place'}]}),
    b4_c2_hollet_front:()=>({sp:'Captain Hollet', txt:
`"Thank you," Hollet says, and means it, and coughs.

So the Third walks at the front of the Second Company for the rest of the day, past every tree, with the recruits behind it watching the backs of the squad's heads. After the first mile the Third stops looking up at the trees, and does not look away from them either. The recruits copy it without knowing they are copying.

${b42Say({marrow:`"There," says Marrow, at the second mile, very quietly. "Now they can see what it does to you, child. That's not nothing." She does not say whether she means it kindly.`, haddat:`Haddat walks at the very front of all of it with the shield up, and does not speak for three miles.`, _:`It is a long day.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_hollet_place:()=>({sp:'Captain Hollet', txt:
`Hollet looks at you, and then at the squad, and something in his thin face understands. "Of course," he says. "Of course. Forgive me. I keep the books, Sergeant. Sometimes I forget the column has people in it." He coughs into his hand, and goes back to counting barrels.

${b42Say({marrow:`"He's a kind man," Marrow says, when he has gone. "He'll be dead by Raraku, or he'll be a captain. One or the other."`, _:`He is a kind man. The squad keeps its place.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_hollet_again:()=>({sp:'Captain Hollet', txt:
`Hollet is counting the barrels again. "Same as this morning," he says, and then looks up, startled. "Your sapper says that. It's catching."`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    b4_c2_radde_road:()=>({sp:'Sergeant Radde', fx:()=>{ S.f.b4_c2_raddeRoad = 1; }, txt:
`Radde is walking the company's flank with the book open, writing as he walks, which he can do over rough ground without looking down.

"The order came down at the gate," he says. "You'll have heard it. The trees aren't to be cut, and nothing's to be taken off them." He writes. "The 10th's already had a man at one with an axe. The Adjunct's riding at the head of the column and somehow she knew about it before I did." He licks the pencil. "She doesn't miss much, the camp says. She doesn't say much, either."

He looks up the column, toward the head of it, where there is nothing to see but dust and spear-points and, very far off, the riders. "And there's a hill ahead, Sergeant, by dusk. You know the one. The army calls it Coltaine's Fall." He shuts the book on the pencil. "I'll not ask what the Third calls it. I'll write down whatever you say, though."`,
      ch:[{t:'"We call it the Barrow."', fx:()=>{ S.f.b4_c2_called = 'barrow'; }, go:'b4_c2_radde_named'},
          {t:'"Coltaine\'s Fall will do."', fx:()=>{ S.f.b4_c2_called = 'fall'; }, go:'b4_c2_radde_named'}]}),
    b4_c2_radde_named:()=>({sp:'Sergeant Radde', txt:
`${S.f.b4_c2_called === 'barrow' ? `"The Barrow," Radde says, and writes it, and underlines it. "Good. A thing ought to have its soldiers' name on it as well as the army's." He looks at the trees. "Two wars, and every hill in them had two names. One for the maps and one for the ones who were there."` : `"Coltaine's Fall," Radde says, and writes it. "That's the army's name for it. The maps'll have that." He looks at you over the book a moment longer than he needs to. "I'll leave a space for the other one, Sergeant, in case it comes to you."`}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    b4_c2_crows:()=>({sp:'Old pilgrims on the verge', fx:()=>{ S.f.b4_c2_crows = 1; S.f.b4_c2_crowsRefuse = 1; }, txt:
`Coming the other way along the verge, against the whole column, there is a little line of old people on foot: Wickans, by the braids and the faded black, grey-haired, with walking sticks and bundles. Crow Clan. They walk south toward the hill the column is going to reach at dusk, and they do not look at the army at all.

"Pilgrims," says a soldier of the 9th, passing. "They go out every day from the city to the hill. Old ones, the ones who didn't come by the ships." He lowers his voice. "The Crow who came on the ships won't have the boy, you heard? Fist Gamet went to the Adjunct about it this morning, they say. The elders said they'll not be told by a child. Not after Coltaine."

${b42Say({sathi:`Sathi watches the old people go past with Hackle pressed against her leg. "Crow," she says. She says something after them in Wickan, not loud, and one of the old women turns her head and looks at her, at the Weasel braids and the filed teeth, a long look, and nods once. Sathi does not grin.`, haddat:`Haddat watches them go. "They are walking to him," she says. "The way you walk to a well."`, _:`The old people walk on, south, toward the hill.`})}${b42R({warlock:`\n\nKeth has gone very still. "*Crow,*" the grandmother says out of his mouth, and then, in a voice that is nearly gentle: "*Old fools. Good old fools. Let them walk.*"`, redblade:`\n\nRamin watches them pass and bows a little from the waist, the Seven Cities way, to the eldest of them. She does not see it. He does it anyway.`})}`,
      ch:[{t:'Let them pass. Walk on.', go:()=>startExplore()}]}),

    b4_c2_recruits_road:()=>({sp:'The Second Company\'s recruits', txt:
`The company's recruits are walking in a clump behind the Third, which is against orders, and nobody has the heart to stop them. The freckled girl from Aren is among them, with her spear over her shoulder now instead of held like a broom. She keeps looking at the trees and then at the squad, and opening her mouth, and closing it.

She will ask, sooner or later. All of them will.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    /* the view of the hill: the Barrow from the road (b4_barrowSeen), and the one quiet line for the squad's own dead */
    b4_c2_hillview:()=>({sp:'A cairn on the verge', scene:'b4_c2_fall', fx:()=>{ S.f.b4_barrowSeen = 1; }, txt:
`There is a cairn of stones on the verge where the road bends, and from beside it you can see ahead over the heads of the column.

There is the hill. Low, and long, and not much of a hill, on the left of the Way with Aren's walls still in sight behind it. It is covered in something that moves when the wind does: braids, and feathers, and things on cords, hung on stakes and stones and on the bare earth all over it, so that from here the whole hill looks as though it has grown a pelt. Little figures are going up it on foot. The pilgrims.

The army calls it Coltaine's Fall. The squad has another name for it.

${b42Barrow()}

${b42Say({haddat:`Haddat says names. Quietly, in Hissari, one after another, the way she does at night, and does not stop until she has said them all.`, _:''})}${b4In('tangle') ? `${b4In('haddat') ? '\n\n' : ''}Tangle counts the satchel. All the way through, twice, with his hand flat on the leather.` : ''}${b4In('marrow') ? `${b4In('haddat') || b4In('tangle') ? '\n\n' : ''}Marrow's fingers find one knot on her string and stay on it.` : ''}${b4In('darrut') ? `\n\n"I was on the wall," Darrut says, to nobody, looking at it. "That is all I will say about the wall."` : ''}`,
      ch:[{t:'Walk on, with the column.', go:()=>startExplore()}]}),
    /* the new soldiers ask what happened here: how much to say */
    b4_c2_ask:()=>({sp:'The Second Company\'s recruits', txt:
`It comes, as it was always going to, a mile short of the hill. The freckled girl drops back beside you with her spear over her shoulder and the clump of recruits drops back with her.

"Sergeant," she says. "That hill. Coltaine's Fall." She looks at it, and at the trees, and at the squad. "What happened here? The real one. Not the hold version."

${b42New().length ? `${b42New().includes('tallow') ? 'Tallow, beside her, wants to know too. He has wanted to know since Aren. ' : ''}${b42New().includes('hessa') ? 'Hessa walks on, and listens. ' : ''}${b42New().includes('tebbet') ? 'Tebbet, at the back, lowers his bow a little. ' : ''}${b42New().includes('darrut') ? 'Darrut, who knows, looks at the road in front of him. ' : ''}` : ''}The veterans of the Third look at you.`,
      ch:[{t:'Tell them. The road from Hissar, the river, the last mile, the hill.', fx:()=>{ S.f.b4_c2_ask = 'all'; b4Nerve(-1, 'The recruits heard what happened on the hill'); b42L('haddat', 1); b42L('marrow', 1); }, go:'b4_c2_ask_all'},
          {t:'"Haddat will tell you their names. That\'s what happened here."', req:()=>b4In('haddat'), fx:()=>{ S.f.b4_c2_ask = 'names'; b42L('haddat', 2); }, go:'b4_c2_ask_names'},
          {t:'"A battle. A long time ago. Keep walking."', fx:()=>{ S.f.b4_c2_ask = 'walk'; b4Nerve(1, 'The Chain squad shrugged at the hill'); b42L('haddat', -1); }, go:'b4_c2_ask_walk'}]}),
    b4_c2_ask_all:()=>({sp:'The Second Company\'s recruits', txt:
`So you tell them. Not all of it: nobody could tell all of it, walking. Enough. The road from Hissar, and the wells, and the river, and the walking, and the last of the Seventh going up that hill to hold it while the rest of the Chain went on to the gate, and the Fist taken there in sight of the walls. You keep it short. It takes a mile anyway.

When you have finished the recruits are very quiet, and they look at the hill as they pass under it, every one of them, and none of them looks away.

${b42Say({marrow:`"Good," says Marrow, very low, beside you. "Now they know what the hill is, child. They'd only have made it up otherwise."`, haddat:`Haddat, ahead, does not turn round. Her shoulders come down an inch.`, _:`It was the truth. It sits on them all the rest of the way.`})}${b4In('tallow') ? `\n\nTallow has gone pale under the sunburn. He walks closer to the squad after that, and keeps his hand near the oilcloth in his shirt.` : ''}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_ask_names:()=>({sp:'Haddat', txt:
`Haddat drops back without being asked, and walks beside the freckled girl, and begins.

She does not tell them about the Chain. She tells them who was in it. A name, and where they were from, and one thing about them: *this one sang*, *this one could not swim and swam the river anyway*, *this one was fourteen*. Name after name, in Malazan for the recruits and then quietly in Hissari after, all the way to the foot of the hill.

The recruits listen to every one. The freckled girl's lips move with some of them, trying to keep them.

When Haddat stops, at last, she says, "That is what happened here. There are more. I will tell you the rest at night, if you want them." She goes back to the front of the squad. The recruits look up at the hill as they pass under it as if they might know somebody on it.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_ask_walk:()=>({sp:'The Second Company\'s recruits', txt:
`"A battle," you say. "A long time ago, the way soldiers count. Keep walking. You've a long road."

The freckled girl looks at you, and at the hill, and something in her face decides that if the Chain squad can say *a battle* about it, it can be walked past. "Right," she says. "Right." The recruits walk on, and look at the hill, and keep walking.

${b42Say({haddat:`Haddat, ahead of you, says one word in Hissari, without turning round. It is not a word for recruits.`, marrow:`Marrow looks at you sidelong. "It's one way, child," she says. "It's the Empire's way."`, _:`It was not the truth. It was the thing they needed, today.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_ask_again:()=>({sp:'The Second Company\'s recruits', txt:
`The recruits walk behind the Third in their clump. ${S.f.b4_c2_ask === 'names' ? 'The freckled girl is saying names under her breath, the ones she kept.' : S.f.b4_c2_ask === 'all' ? 'They are quieter than they were this morning.' : 'They have started telling each other jokes about the trees, which is what recruits do.'}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    b4_c2_milestone:()=>({sp:'The last milestone', txt:
`A milestone at the edge of the verge, a squat block of grey stone with the Empire's numerals cut in its face and half of them gone: the last on the Aren Way, the one the city counts its road from. Something has hit it hard, a wagon or a ram or a great many feet, and a corner of it lies in the dust at its foot, a flat grey chip the size of a palm.

${b42Say({darrut:`"Aren Guard counted from this one," Darrut says. "Every patrol. *One stone out*, you'd say, and turn for home." He looks at the chip. "No one's going to count from it now."`, hessa:`Hessa picks up the chip and runs her thumb along the broken edge. "Temple stone," she says. "Or near it. It would take an edge like the whetstones we had at the doors."`, _:`The chip is good grey stone, close-grained. It would take an edge.`})}`,
      ch:[{t:'Take the chip. It will make a whetstone.', req:()=>!S.f.b4_c2_chip, fx:()=>{ S.f.b4_c2_chip = 1; gain('b4_c2_milestone'); }, go:()=>startExplore()},
          {t:'Leave it. Walk on.', go:()=>startExplore()}]}),

    b4_c2_cart:()=> S.f.b4_c2_cart ? ({sp:'The company\'s water cart', txt:
`The water cart creaks on. ${S.f.b4_c2_cart === 'ok' ? 'The boy from the 10th is riding on the tailboard now, with a wet cloth on his head, embarrassed and alive.' : 'The boy from the 10th is in a wagon of the 10th\'s now, out of the sun.'}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}) : ({sp:'The company\'s water cart', txt:
`The Second Company's water cart, two oxen and twelve barrels and a driver asleep on his feet. A recruit from the 10th is sitting in its shade at the verge where he fell out of his own column, with his helm off and his face the wrong colour: grey, and not sweating any more, which is the bad sign. His mates have gone on without him. The heat on the Way is worse than it looks.

${b42Say({marrow:`Marrow is down on her knees beside him before you have finished looking. "Child," she says. "Look at me."`, _:`Unless someone does something he will stop breathing properly.`})}`,
      ch:[{t:'Get water into him, and shade, and the warren if it will come.', check:['wits', 13],
            edges:id=>[id === 'marrow' && ['she has seen a thousand like him on the Chain', 3], id === 'haddat' && ['she knows the desert sickness from Hissar', 1], id === 'hessa' && ['she has carried the sick off the temple steps', 1], id === 'tebbet' && ['he does not know what to do with his hands', -1]],
            near:{t:'Yes, but it takes the squad\'s own water to do it, a whole skin, and the Third goes thirsty to the night\'s camp. Whoever went without starts the next fight a little down.', fx:()=>{ bruise(ROLL().who || 'sgt', 2 + lvT()); }},
            go:'b4_c2_cart_ok', fail:'b4_c2_cart_no'},
          {t:'Send for the 10th\'s own people. Walk on.', go:()=>startExplore()}]}),
    b4_c2_cart_ok:()=>({sp:'The company\'s water cart', fx:()=>{ S.f.b4_c2_cart = 'ok'; }, txt:
`${by({marrow:`Marrow puts her hands on him and the warren comes, a little, cool, the way water comes into a dry well, and she wets a cloth from the company's barrel and puts it on his neck, and makes him drink, slowly, a mouthful at a time.`, _:`{who} gets him into the shade of the cart and a wet cloth on his neck and water into him, slowly, a mouthful at a time, the way the Chain taught it.`})} After a quarter of an hour he is sweating again, and swearing, which is better.

The cart driver wakes up enough to let him ride the tailboard. "Second Company," the boy says, squinting at the squad's badges. "The Chain lot." He drinks again. "They told us you were mad."`,
      ch:[{t:'"Drink slower."', go:()=>startExplore()}]}),
    b4_c2_cart_no:()=>({sp:'The company\'s water cart', fx:()=>{ S.f.b4_c2_cart = 'no'; }, txt:
`He will not drink. He is past wanting it, and that is how the heat takes them, and ${by({sgt:'your', _:'{who}\'s'})} hands are not the right hands for it. In the end a healer of the 10th comes back down the column at a run, sent for, and takes him away on a litter, grey, with a cloth over his face against the sun.

"He'll live," the healer says, going. "Probably. You did the right things. Too slowly." It is not a reproach. It is the Way.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    b4_c2_back:()=>({sp:'The way back', txt:
`West, behind the column, the Way goes back between the trees toward Aren. The wagons are on it, and the dust of the wagons. There is nothing back there for the Third today.`,
      ch:[{t:'Not that way.'}]}),
    b4_c2_to_camp:()=> S.f.b4_c2_standard ? ({sp:'The Aren Way', txt:
`The column goes on east along the Way toward the hill, with the standard far ahead of it. The 9th will camp below the hill tonight.`,
      ch:[{t:'On, to the night\'s camp.', onward:true, go:()=>{ S.f.b4_c2_ph = 2; startExplore('b4_c2_camp'); talk('b4_c2_camp_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}) : ({sp:'The head of the column', scene:'b4_c2_standard', fx:()=>{ S.f.b4_c2_standard = 1; }, txt:
`In the afternoon the column halts for water, all of it at once, the way a column does, so that the 9th stands in the middle of the road between the trees for half an hour going nowhere.

And far up at the head of it, a long way off, past the 8th and past the Adjunct's riders, something goes up on a pole.

You can only just see it. Something tall and thin, catching the light, made of small pale things wired together: a figure, holding something up over its head. A bone. Behind it, painted or made, something like a cloud of sand. The word comes down the column faster than the water: *the standard*. Fist Gamet's. Made of the bones, out of Aren's old graves, the ones the whole army went over the wall for.

${b42Say({tangle:`Tangle squints up the column at it. "Well," he says. "That's us, then." He touches the bone at his throat, and then, a moment later, the satchel.`, haddat:`Haddat looks at it a long way off. "A thin man holding up a bone," she says. "In front of a sandstorm." She thinks. "Yes. That is us."`, _:`The 9th looks at it, a long way off. A thin man, holding up a bone, before a sandstorm.`})}${b4In('tallow') ? `\n\nTallow touches the bone at his own throat, and then looks round to see if anybody saw him do it. Half the company is doing the same.` : ''}`,
      ch:[{t:'On, to the night\'s camp.', onward:true, go:()=>{ S.f.b4_c2_ph = 2; startExplore('b4_c2_camp'); talk('b4_c2_camp_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the camp below the hill: the first halt, the fire and the Deck ---- */
    b4_c2_camp_arrive:()=>({sp:'Below Coltaine\'s Fall', scene:'b4_road_fire', txt:
`The column stops at dusk, barely past the hill, and makes camp on both sides of the Way. When you turn round, Aren's walls are still there behind it, low and pale on the edge of the evening, with the first lamps coming out on them.

"The shortest day's march in the history of the Empire," Radde says, going past with the book. "Two wars, and I never saw one shorter." He writes it down.

The 9th's camp is below the hill. The hill is right there, above the tents: low, long, and covered in the braids and the feathers and the things on cords, moving in the evening wind, and in the last of the light you can see the ants on the path, a dark river of them, going up. The pilgrims' lamps are coming out on it one by one.

The Third has its own fire, off the road at the camp's edge. ${b42Say({tangle:`Tangle sets the satchel down by it and counts it before he does anything else.`, haddat:`Haddat sits down by it with her back to the hill.`, _:`The squad sits down by it.`})}`,
      ch:[b4DeckChoice(2),
          {t:'The Third\'s fire.', go:'b4_c2_fire'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b4_c2_deck:()=>b4DeckOffer(2),
    b4_c2_card:()=>b4DeckCard(2),

    /* the fire: the swap, a rest, the squad, and the way on (the games pass, 79, wraps this node: keep the id) */
    b4_c2_fire:()=>{ const ph = b42Ph(), k = b42Key(), dawn = ph >= 5;
      return {sp:'The Third\'s fire', scene:dawn ? 'b4_march' : 'b4_road_fire', again:()=> dawn ? 'The fire is a ring of black stones. The column is forming on the road.' : b42Done() ? 'The fire, burnt down. What is left of the night is quiet.' : ph >= 3 ? 'The Third\'s fire. The pilgrims\' lamps are on the hill.' : 'The Third\'s fire, below the hill.', txt:
`${dawn ? `The Third's fire is a ring of black stones and a smell. Round it the camp is coming down: tents falling, oxen being backed into traces, sergeants shouting, and up on the Way the column is forming, all three legions, in the grey. Everybody is talking about the same thing, and quietly.` : ph >= 4 && k === 'march' && !S.f.b4_c2_probeDone ? `The Third's fire, low, at the camp's edge. The squad has its kit on and its shields by it, because the Third's place on the line tonight is fifty paces off in the dark. Up on the hill the pilgrims' lamps have gone up without the squad, and are sitting among the braids, very small.` : ph >= 3 ? `The Third's fire, built up again. Up on the hill the pilgrims' lamps are out among the braids, a few dozen of them, moving slowly, going up. The wind brings down the sound of the old people singing, now and then, in Wickan, and then takes it away.` : `The Third's fire, at the camp's edge below the hill, in a ring of stones off the road, with a pot on it. Round the camp the 9th is putting up its tents and lighting its fires and looking up at the hill and then not looking. ${b4In('marrow') ? 'Marrow says the pot is tea.' : 'The pot is meant to be tea.'}`}`,
      ch:[b4DeckChoice(2),
          {t:'Sit an hour. Let the squad rest.', req:()=>!dawn && !S.f['b4_c2_rest' + ph] && !(k === 'fall'), fx:()=>{ S.f['b4_c2_rest' + ph] = 1; b4Rest('The squad sits an hour by its own fire, below the hill. Wounds close, mostly.'); }, go:'b4_c2_fire_rest'},
          {t:'Sit an hour before the march.', req:()=>dawn && k === 'march' && !S.f.b4_c2_rest5, fx:()=>{ S.f.b4_c2_rest5 = 1; b4Rest('An hour by the black stones while the column forms. Wounds close, mostly.'); }, go:'b4_c2_fire_rest'},
          {t:'Talk with the squad.', go:'b4_c2_fire_talk'},
          ...b4Offers().map(id => ({t:`Send for ${NAME(id)}.`, fx:()=>{ b4SwapIn(id); }, go:'b4_c2_fire_swap'})),
          b4PipeChoice('b4_c2_fire'),
          {t:'Up the path to the hill, before dark.', req:()=>ph <= 2 && !S.f.b4_c2_robbersDone, onward:true, go:'b4_c2_path'},
          {t:'The pilgrims\' lamps on the hill. Find Radde.', req:()=>ph === 3 && !k, onward:true, go:'b4_c2_key'},
          {t:'The Third\'s place on the line.', req:()=>k === 'march' && !S.f.b4_c2_probeDone, onward:true, go:'b4_c2_line'},
          {t:'Fall in. North.', req:()=>dawn, onward:true, go:'b4_c2_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}; },
    b4_c2_fire_rest:()=>({sp:'The Third\'s fire', scene:b42Ph() >= 5 ? 'b4_march' : 'b4_road_fire', txt:
`An hour, then, ${b42Ph() >= 5 ? 'on the cold ground by the black stones, while the column shouts itself into order on the road.' : 'on the warm ground by the fire, with the hill above and the camp talking round it.'}

${b42Say({marrow:`Marrow goes round the squad without asking, and looks at hands and feet and the backs of necks, and ties a knot at the end.`, tangle:`Tangle lies on his back with the satchel on his chest and counts it by feel, and falls asleep in the middle of the count.`, _:`One of them sleeps. The others pretend to.`})}${b4In('tallow') ? `\n\nTallow writes another line of the letter home, and crosses it out.` : ''}${b4In('tebbet') ? `\n\nTebbet unstrings his bow and lies with it across his chest and his eyes open, the hill way.` : ''}${b42Dog() ? `\n\nHackle sleeps across ${b4In('sathi') ? 'Sathi\'s' : 'your'} feet with his nose toward the hill.` : ''}${b42R({redblade:`\n\nRamin oils his scale, which does not need it.`, warlock:`\n\nKeth sleeps with his palms flat on the ground. The grandmother, in his sleep, is talking to somebody on the hill.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c2_fire'}]}),
    b4_c2_fire_swap:()=>({sp:'The Third\'s fire', scene:'b4_road_fire', txt:
`${b4In('redblade') ? `Ramin comes along the camp from the Red Blades' lines, walking as if there were a horse under him, and puts his kit down by the fire. "Lent again," he says. "My captain sighed."` : b4In('warlock') ? `Keth comes over from the Wickan youths' fires with his kit on his shoulder and the grandmother complaining about the dark. "*Temul says go,*" she says. "*Temul is not saying much else tonight.*"` : `The swap is made. The fire takes it calmly.`}`,
      ch:[{t:'Back to the fire.', go:'b4_c2_fire'}]}),
    b4_c2_fire_talk:()=>{ const late = b42Ph() >= 5, ln = [];
      if (b4In('haddat')) ln.push(late ? `Haddat is ${(S.kit || []).includes('b4_c2_fetish') ? 'tying the little painted soldier back on a shield rim where the knot slipped' : 'mending her shield-strap by feel'}. "They say the Bridgeburners are dead," she says. "In Genabackis. All of them." She pulls the knot tight. "They said that about us, in Aren, for a month. I heard a man say it on the wall the day we came in under it."` : `Haddat sits with her back to the hill, and does not turn round, and does not need to. "I will go up," she says, quietly, in Hissari, to the fire. "Before we leave it. Or I will not, and carry that instead." She has not decided which is heavier.`);
      if (b4In('sathi')) ln.push(late ? `Sathi is feeding Hackle the end of the bread. "Bridgeburners," she says. "I never met one. Coltaine never liked them, the old ones said." She grins, a little. "He'd have liked them dead even less. He liked nobody dead."` : `Sathi has her feet on Hackle and her eyes on the hill, where the old Crow are going up with their lamps. "They hated us, the Crow," she says. "The Weasels. For a hundred years." She watches the lamps. "I'd carry any one of them up that hill."`);
      if (b4In('tangle')) ln.push(late ? `Tangle has the satchel open on his knee. "The Bridgeburners had sappers," he says. "The best there were, they said. Moranth by the crate." He counts. "Same as yesterday. If they're dead it was something sappers couldn't fix. I don't like to think about that."` : `Tangle has the satchel open on his knee and is counting it for the third time. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." He shuts it. "Same as this morning. They'd have been glad of the cusser up there, on the day."`);
      if (b4In('marrow')) ln.push(late ? `Marrow is retying her string where it frayed. "A Claw out of a warren in the night," she says. "And by morning the whole army knows what was said in her tent." She ties a knot. "That's not a rumour, child. That's somebody wanting it known."` : `Marrow has the string out and her thumb on one knot of it. "The warren's crowded here," she says. "Not with anything bad. Just full. Like a room after a funeral, when nobody's gone home yet." She does not move her thumb.`);
      if (b4In('tallow')) ln.push(late ? `Tallow has his grandmother's deck in its oilcloth on his knee, unopened, and his hands round it. "If the Bridgeburners can be dead," he says, "all of them," and does not finish, and does not have to.` : `Tallow is looking up at the hill and the lamps on it. "My grandmother's people put lamps on the water," he says, "for the ones the sea kept. Little ones, on boards." He thinks about it. "I didn't think soldiers did that."`);
      if (b4In('hessa')) ln.push(late ? `Hessa is sharpening her spear by feel. "In the temple they said the dead are never all dead at once," she says. "There is always one still walking somewhere, not told." She tests the edge. "The priests said it to comfort people. It does not comfort people."` : `Hessa is looking at the ants on the path, the dark river of them going up the hill. "D'rek's little ones," she says. "They have been busy here. They are always busy where the dead are." She does not say it unkindly.`);
      if (b4In('tebbet')) ln.push(late ? `Tebbet is restringing his bow with his eyes on the road north. "I dreamt of the Bridgeburners," he says. "Last night. I never met one." He tests the string. "They were laughing. That's all. I'd not say it to the captain."` : `Tebbet has the bow across his knees and his eyes on the hill. "From up there," he says, "you could see the walls. And the gate." He thinks about it. "Close enough to see it and not close enough to reach. I would not want to be put there."`);
      if (b4In('darrut')) ln.push(late ? `Darrut is lacing his boots. "In the Guard," he says, "every month somebody came in on a ship saying a whole army was dead somewhere. Half the time the army walked in a year later and wanted its back pay." He pulls the lace tight. "Half the time."` : `Darrut is cleaning the place on his shield where the Guard's badge used to be. He keeps his back to the hill. "Did I tell you about the camel in the governor's garden?" he says. He tells it again. It is shorter tonight, and it does not mention the wall.`);
      if (b4In('orvas')) ln.push(`Orvas sits back from the fire with his eyes on the horse lines. "Our dead are on that hill too," he says. "The ones who turned away." He does not explain it.`);
      if (b4In('redblade')) ln.push(late ? `Ramin sits very straight with his helm on his knee. "In Ehrlitan they said the Bridgeburners could not die," he says. "That is a thing people say about soldiers they are afraid of." He looks at the squad. "They said it about the Red Blades, once."` : `Ramin has his helm on his knee and is looking at the trees along the Way in the last light. "A company of ours came down this road," he says. "On the Chain. They are not on the hill. They are on the road, somewhere, between the trees." He does not say anything else about it, and he does not look away from the trees.`);
      if (b4In('warlock')) ln.push(late ? `Keth is lying on his back with his palms flat on the ground. "Genabackis," he says. "Very far." The grandmother, in her own voice: "*Far is where the dead go to be lied about. Wait until somebody walks in.*"` : `Keth is sitting with his palms flat on the ground, facing the hill. "They're all up there," he says, his own voice. "The Seventh. The Wickans. The dogs." The grandmother, out of his mouth, softer than she ever is: "*They are glad of the lamps.*"`);
      if (b42Dog() && !b4In('sathi')) ln.push(`Hackle lies across your boots with his chin on his paws and his eyes on the hill, and every now and then his ears go up at something on it that nobody else can hear.`);
      return {sp:'The Third\'s fire', scene:late ? 'b4_march' : 'b4_road_fire', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b4_c2_fire'}]}; },

    /* ---- the camp at dusk and at night: Radde, Hollet, the marines of the 8th, the old soldier, the recruits, Temul ---- */
    b4_c2_radde_camp:()=>({sp:'Sergeant Radde', fx:()=>{ S.f.b4_c2_raddeCamp = 1; }, txt: b42Ph() >= 4 ?
`Radde is on his bucket by the company's fire with the book on his knee. "${b42Key() === 'march' ? 'Your place on the line, Sergeant. I wrote it. Go and stand in it.' : 'You\'re up the hill, Sergeant. You\'re not here. I\'m writing you as not here.'}" He writes.` : S.f.b4_c2_robbersDone ?
`Radde looks up from the book as you come back down the path. "I heard," he says. "Off the hill, with their sacks, and the braids back on their stakes." He writes something. "The pilgrims came down saying the Malazans had done it. They sounded surprised." He shuts the book. "Get something hot inside the squad. It's a long night, the first night out. They always are."` :
`Radde is on an upturned bucket by the company's fire with the book open, writing by the last of the light.

"The pilgrims came down off the hill an hour ago," he says, without looking up. "Old Wickans, a couple of Aren women. They say there are men up there with knives and sacks, cutting the braids off the stakes and the feathers off the stones, the dog skulls, all of it. For the markets in Aren." He writes. "The relic stalls want the Fall. It's worth more than fingers, the Fall. It's the place."

He looks at you at last. "The Fist says it's no business of the 9th's what Aren's poor do to a hill. The captain says the Fist didn't say we couldn't go and look. I say there's an hour of light left." He shuts the book on the pencil. "The path's north of the tents, Sergeant."`,
      ch:[{t:'Up the hill, then.', req:()=>!S.f.b4_c2_robbersDone && b42Ph() <= 2, onward:true, go:'b4_c2_path'},
          {t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c2_hollet_camp:()=>({sp:'Captain Hollet', fx:()=>{ S.f.b4_c2_holletCamp = 1; }, txt:
`Hollet is at a camp table in front of his tent, with a lamp and three tablets, writing up the day. "Two miles," he says. "And a half. The Fist says it is the slowest march he ever saw. He says it is deliberate." He coughs. "I think it is three legions and a great many wagons and a road with ten thousand dead on it. I'd not march fast past that either."

He sets the stylus down. "The order for tonight, Sergeant, from the Fist, through me: the column keeps its lines. Pickets out at dark on the camp's edge, every company its own stretch. No wandering off. There've been riders seen in the rocks to the east all afternoon, the scouts say, not many, not near." He looks up at the hill, and the lamps on it. "And the pilgrims are the pilgrims' business."`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b4_c2_marines:()=>({sp:'Marines of the 8th', fx:()=>{ S.f.b4_c2_duiker = 1; }, txt:
`A handful of the 8th's marines are at the water barrels below the road, filling skins and arguing, the way marines do, about everything at once. One of them, a sergeant with a voice like gravel in a pot, is telling it to the others, and the 9th's men round the barrels are listening without pretending not to.

"The last one," he is saying. "The last tree on the Way. The historian's. We went and looked." He drinks. "Empty. Spike holes and nothing. No body."

"Crows," says somebody.

"Crows don't take the nails," the sergeant says. "He was taken down. And I'd bet you a month's pay what for: the markets. You've seen the stalls in Aren. A bit of the Chain's historian'd fetch a price." He spits. "That's what I think. No one knows."

${b42Say({haddat:`Haddat has gone very still beside you. "Duiker," she says, low, in Malazan. "He walked with us. He asked everybody's name. He wrote them down." She looks north up the dark road. "Someone should have his."`, marrow:`Marrow's hand is on her string. "The historian," she says. "He asked me once what I'd seen. I told him. He wrote it down." She does not say anything about the markets. Her mouth says it for her.`, tangle:`Tangle, beside you, has stopped counting. "The historian," he says. "Duiker. He knew everybody's name on the Chain." He looks north. "Even mine."`, _:`The historian, then. Duiker, who walked the Chain with a notebook and asked everybody's name.`})}${b4In('tallow') ? `\n\nTallow looks from the marines to the squad. "You knew him?" he says. The squad lets that be its own answer.` : ''}`,
      ch:[{t:'Leave the marines to their water.', go:()=>startExplore()}]}),
    b4_c2_oldsoldier:()=>({sp:'An old soldier of the 9th', fx:()=>{ S.f.b4_c2_oldsoldier = 1; S.f.b4_c2_crowsRefuse = 1; }, txt:
`The grey old man who reads for the legion is sitting behind the cook-lines with his cup and his deck and no queue tonight. The recruits are looking at the hill instead.

"Chain lot," he says. "Sit, if you want. I'll not read. Not here." He nods at the hill. "Some places the cards get ideas."

He drinks. "You'll have heard about the boy and the Crow. Three hundred of them came on the ships, and their elders went to the Adjunct today, and Fist Gamet stood there while they said it: they'll not take a boy for their captain. Not after the Fist." He shrugs. "Fair enough, I'd say, if I were three hundred old Wickans. It's hard on the boy." He looks at his cup. "He's fourteen. He's the one who brought the Fist's children in."`,
      ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c2_recruits_camp:()=>({sp:'The Second Company\'s recruits', fx:()=>{ S.f.b4_c2_recCamp = 1; }, txt:
`The company's recruits are at their fire, not cooking. They are watching the hill, and the lamps going up it, and the dark river of ants on the path that they can still see if they look hard. The freckled girl has her bone in her fist.

"Are they allowed?" she says, when she sees you. "The old ones. To go up there at night."

"It's theirs," says one of the others. "It's a Wickan thing."

"It's a Chain thing," says the freckled girl, and looks at the squad, and then looks down, as if she had said something she was not allowed to.`,
      ch:[{t:'"It\'s everybody\'s who was there."', go:()=>startExplore()},
          {t:'"Eat something. It\'s a long night."', go:()=>startExplore()}]}),
    b4_c2_wagons:()=>({sp:'The company\'s carts', txt: b42Ph() >= 5 ?
`The carts are being loaded in the grey, oxen backed into the traces, drivers swearing. ${S.f.b4_c2_probeDone ? 'One of them has a black scorch along its side from the night, and a new pole.' : 'Somebody says the 9th\'s line had raiders at it in the night, at the far end, and the company held. The carts are all here.'}` :
`The Second Company's carts, drawn up behind the tents with the oxen asleep in the traces and the drivers asleep under the carts. Water, rations, the company's spare spears, and a cart of lamp oil that the quartermaster's clerk wants kept a long way from everybody's fires.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_temul:()=>({sp:'Temul', fx:()=>{ S.f.b4_temulPast = 1; }, txt:
`He comes down along the camp's edge in the dark, alone, from the direction of the Adjunct's tents: a boy in Wickan leathers with a sword too long for him, walking very straight. Temul. He walks past the Third's fire close enough to touch, and does not stop, and does not turn his head.

You know him. The whole squad knows him, from the Chain, from Aren, from the Fist's children. ${b4In('warlock') ? 'Keth half rises, and the grandmother says something low in Wickan, and the boy does not hear it, or will not.' : b4In('sathi') ? 'Sathi half rises, and says his name, and he does not hear it, or will not.' : 'Nobody calls out to him. It is not a night for it.'}

He walks on past the fire and along the line of the camp, toward the Wickan youths' fires, and in the dark at the edge of the firelight his shoulders are not as straight as he is holding them.`,
      ch:[{t:'Let him go.', go:()=>startExplore()}]}),

    /* ---- the path up the hill at dusk, and the hill ---- */
    b4_c2_path:()=> S.f.b4_c2_robbersDone && b42Key() !== 'fall' ? ({sp:'The path up the hill', txt: b42Ph() >= 4 ?
`The path up the hill, and the pilgrims' lamps on it. ${b42Key() === 'march' ? 'The Third keeps its place tonight. Radde wrote it.' : ''}` :
`The path goes up between the tents to the hill, where the pilgrims' lamps are. The robbers are gone. What the Third does tonight is for Radde to hear first.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}) : b42Key() === 'fall' ? ({sp:'The path up the hill', txt:
`The path up the hill in the dark, and the pilgrims' lamps above.`,
      ch:[{t:'Up the hill.', onward:true, go:()=>{ startExplore('b4_c2_hill'); }},
          {t:'Not now.', go:()=>startExplore()}]}) : ({sp:'The path up the hill', txt:
`North of the tents a path goes up the hill: a pale strip of trodden earth between the anthills, and the ants on it, and the light going. Above, among the braids and the stakes, you can see the pilgrims' first lamps, and higher, at the crest, other lights, shuttered, moving quickly, and the shapes of men bending and straightening.

${b42Say({haddat:`Haddat is already on the path. She did not wait to be told.`, sathi:`Sathi is already on the path with Hackle in front of her, the way she went up every hill on the Chain.`, _:`The squad looks at the path, and at you.`})}`,
      ch:[{t:'Up the hill.', onward:true, go:()=>{ startExplore('b4_c2_hill'); talk('b4_c2_hill_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c2_hill_arrive:()=>({sp:'Coltaine\'s Fall', scene:'b4_c2_fall', again:'The hill at dusk, the braids moving, and men at the crest with sacks.', txt:
`Up close the hill is not a hill at all, only a long rise of hard earth and old grass, and every foot of it is covered.

Braids of hair, horse and human, red thread and black, tied to stakes driven into the ground, and to stones, and to each other. Crow feathers, hundreds of them, stuck upright in the earth like a field of black grass. Dog skulls on cords, the Wickan dogs that died on the Chain, bleached, a great many of them. Little painted soldiers. Tokens of copper and clay and bone, and among them, here and there, small bundles bound in a way that is not Wickan and not Malazan: the Semk leave tokens here too, the pilgrims say, for their own dead. Everybody who fought on this hill has left something on it.

And everywhere, the ants. The whole hill moves with them, in the last light, a slow dark shine over everything.

There is no body. There is no cross. There is a place near the top where the ground is barer than the rest, and the pilgrims keep a little way back from it.

At the crest, men with sacks are cutting the braids off the stakes.`,
      ch:[{t:'Up to the crest.', go:'b4_c2_robbers_go'},
          {t:'Walk the hill.', go:()=>startExplore()}]}),
    b4_c2_pilgrim:()=> S.f.b4_c2_pilgrim ? ({sp:'An old woman of the Crow', txt: S.f.b4_c2_crowTaught ?
`The old woman sits by her lamp on the slope. When she sees ${S.tricks && S.tricks.b4_c2_crow && (S.tricks.b4_c2_crow.who === 'sgt' || b4In(S.tricks.b4_c2_crow.who)) ? NAME(S.tricks.b4_c2_crow.who) : 'the squad'} she makes a small sign with her fingers, the crow's, and goes back to her lamp.` :
`The old woman sits by her lamp on the slope with her eyes closed and her lips moving. She has said what she had to say to the squad.`,
      ch:[{t:'Leave her be.', go:()=>startExplore()}]}) : ({sp:'An old woman of the Crow', txt:
`On the slope below the crest an old woman of the Crow Clan sits by a clay lamp with her legs folded under her and her stick across her knees, and does not move when the squad comes up, though the men at the crest are a stone's throw off with their knives. She is very old. Her braids are white. She has been watching them cut the braids down for an hour, and has not moved for that either.

"Malazans," she says, in Malazan, without opening her eyes. "From the Chain. I can smell it on you." She opens them. "You walked with him."

${b42Say({sathi:`Sathi crouches down in front of her, the Wickan way, and says something in Wickan, and the old woman looks at her for a long breath and laughs, a cracked old laugh. "Weasel," she says. "A Weasel, on the Crow's hill. He would have laughed."`, haddat:`Haddat goes down on one knee in front of her, the Hissari way, and bows her head. The old woman looks at her a long while. "A Seven Cities woman," she says. "On the Crow's hill." She does not sound displeased.`, _:`She looks at the squad, one at a time, and seems to count it, the way Radde does.`})}${b42R({warlock:`\n\nKeth crouches in front of her and the grandmother speaks out of him in Wickan, fast and low, and the old woman's face changes, and she answers in the same voice. They talk a while. Neither of them will say afterwards what about.`, redblade:`\n\nRamin bows to her from the waist. She looks at his red scale and laughs, not unkindly. "Red Blade," she says. "On the Crow's hill. The world is very strange this year."`})}

"The birds that took him," she says, "took him nowhere. They keep him. They keep the ones who were his. And they do not like a blade put into one of theirs." She looks at the men at the crest, and back. "There is a word, for asking them. The clan has always had it. You might ask it of me, if you are quick, before those men have the whole hill in their sacks."`,
      ch:[{t:'"Teach us the word, grandmother."', check:['guile', 15], trick:'b4_c2_crow', req:()=>!S.f.b4_c2_pilgrim, fx:()=>{ S.f.b4_c2_pilgrim = 1; },
            edges:id=>[(id === 'sathi' || id === 'warlock') && ['the Crow\'s word is a Wickan word, and the old woman knows it', 2], id === 'haddat' && ['she bowed to the old woman, and the old woman saw', 1], id === 'tangle' && ['he does not believe in birds that listen, and she can tell', -1], id === 'hessa' && ['she belongs to another god, and the old woman can tell that too', -1]],
            near:{t:'Yes, but the old woman makes the learner say it over and over, sixty times, until the men at the crest have filled another sack, and then makes them say it once more for luck. It goes into the dreams afterwards, all night.', fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c2_pilgrim_ok', fail:'b4_c2_pilgrim_no'},
          {t:'"Later, grandmother. The crest first."', go:'b4_c2_robbers_go'}]}),
    b4_c2_pilgrim_ok:()=>({sp:'An old woman of the Crow', fx:()=>{ S.f.b4_c2_crowTaught = 1; }, txt:
`She says it once, low, a sound that is not quite a word and not quite a bird. ${by({sathi:'Sathi says it back. The old woman closes her eyes and nods.', warlock:'Keth says it back, and the grandmother says it with him, and the old woman closes her eyes and nods.', _:'{who} says it back, badly, and she says it again, and {who} says it again, and the third time she closes her eyes and nods.'})}

"There," she says. "You have asked. They decide." She looks up. Over the hill, in the last of the light, three crows have come from nowhere and are turning above the crest, crying, and the men with the sacks look up at them, and one of them makes the sign against the evil eye. "They say they will think about it," the old woman says, and laughs, the cracked old laugh, and goes back to her lamp.`,
      ch:[{t:'Up to the crest.', go:'b4_c2_robbers_go'}]}),
    b4_c2_pilgrim_no:()=>({sp:'An old woman of the Crow', txt:
`She says it, and ${by({sgt:'you say', _:'{who} says'})} it back, and she shakes her head. She says it again. It goes wrong again, a Malazan mouth round a Wickan sound, and the third time she stops, and looks at the squad, and shrugs.

"No," she says. "Not you. The birds would laugh." She is not unkind about it. "Go and chase those men off his hill, then. The birds like that well enough."`,
      ch:[{t:'Up to the crest.', go:'b4_c2_robbers_go'}]}),
    b4_c2_lamp:()=>({sp:'A pilgrim\'s lamp', txt: b42Ph() >= 4 && b42Key() === 'fall' ?
`A clay lamp on a flat stone, burning low, and round it a ring of new things the pilgrims brought up tonight: a braid, a bone comb, a little cake of bread with a crow pressed into it. ${S.f.b4_c2_hillDone ? 'The robbers did not get this one.' : 'The old woman who left it is sitting a little way off in the dark, keeping it.'}` :
`A clay lamp on a flat stone among the braids, burning, with a ring of things round it the pilgrims have brought: a braid, a bone comb, a dried flower, a child's wooden horse. The lamp is being kept lit. ${S.f.b4_c2_robbersDone ? 'The cloak-pile from the crest has been carried down and the braids from it put back here, as near as anybody can tell.' : 'Up at the crest, men are filling sacks.'}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_robbers_go:()=> S.f.b4_c2_robbersDone ? ({sp:'The crest', txt:
`The crest, with its stakes and braids, and the bare place near the top that the pilgrims keep away from. The robbers are gone.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}) : ({sp:'The crest', scene:'b4_c2_fall', txt:
`At the crest a dozen men are working fast, before the dark: men from Aren's poor quarters by their clothes, Seven Cities men, thin and quick, with knives and short iron bars and sacks. They are cutting the braids off the stakes, and pulling the feathers out of the ground by the fistful, and prying the copper tokens off the stones, and putting it all in the sacks or on a cloak spread on the ground. One of them has a dog's skull on a cord in each hand.

A big man with a sling is standing a little apart, watching the slope, and he sees the squad and whistles.

"Malazans," says a man in a good headcloth at the cloak, straightening. "Off you go. This is Aren business. The markets will take the lot by the day after tomorrow, and there'll be soldiers of yours buying them back off the stalls by the end of the week." He smiles. "Coltaine's own braid. Off his own hill."

${b42Say({haddat:`Haddat's shield comes up without her seeming to lift it.`, sathi:`Sathi laughs, a high hard laugh, all her filed teeth, and draws.`, marrow:`Marrow looks at the man in the headcloth for a long breath. "No," she says.`, _:`The squad's shields come up.`})}`,
      ch:[{t:'"Get off his hill." Shields up.', go:()=>startBattle('b4_c2_robbers', {})},
          {t:'Tangle throws a sharper on the bare slope, well clear of the braids.', tag:'uses 1 sharper', req:()=>b4In('tangle') && (S.inv.sharper || 0) > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b4_c2_robbers', {pre:true})},
          {t:'Come up on them round the shoulder of the hill, quiet.', check:['guile', 14],
            edges:id=>[id === 'tebbet' && ['he would rather come at it from a long way round, and knows how', 2], id === 'sathi' && ['she went up every hill on the Chain this way', 1], id === 'darrut' && ['he is broad, and the braids rattle', -1], id === 'tallow' && ['his new leather creaks', -2]],
            near:{t:'Yes, but a dog skull on a cord swings into somebody\'s shield on the way round with a noise like a bell, and the man with the sling turns.'},
            go:()=>startBattle('b4_c2_robbers', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c2_robbers_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c2_robbers_seen:()=>({sp:'The crest', scene:'b4_c2_fall', txt:
`The shoulder of the hill is thick with stakes, and every stake has things hung on it that knock and rattle, and ${by({sgt:'you find', _:'{who} finds'})} the loudest of them. The man with the sling whistles twice. Knives come out all along the crest.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c2_robbers', {surprise:'e'})}]}),
    b4_c2_robbers_after:()=>({sp:'Coltaine\'s Fall', scene:'b4_c2_fall', fx:()=>{ S.f.b4_c2_robbersDone = 1; S.f.b4_c2_ph = Math.max(b42Ph(), 3); }, txt:
`The man in the headcloth is gone down the far side of the hill, holding his arm, and the rest after him, and two of their sacks with them. The rest of the sacks are lying where they were dropped, and the cloak, and the pile on it.

${b42Say({haddat:`Haddat goes down on her knees by the cloak and begins, very carefully, to take the braids out of the pile and tie them back on the stakes. She does it without being told. She does not know where most of them went. She ties them on anyway, the nearest stake, three turns and a knot.`, marrow:`Marrow goes down on her knees by the cloak and begins to take things out of the pile. "Child," she says, to nobody. "Child. Child."`, _:`The squad goes down on its knees by the cloak and begins to put things back.`})}

The pilgrims come up out of the dusk to help, the old Crow and the Aren women, without a word, and the squad and the pilgrims put the hill back as near as anybody can tell: braids on the stakes, feathers in the earth, the dog skulls on their cords. It takes until full dark. The old woman of the Crow watches it from her lamp.

When it is done the pilgrims go back to their lamps, and the hill is a hill again, and the ants go on with it.`,
      ch:[{t:'Down to the camp.', onward:true, go:()=>{ startExplore('b4_c2_camp'); talk('b4_c2_night'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c2_hill_down:()=> b42Key() === 'fall' ? (S.f.b4_c2_hillDone ? ({sp:'The path down', txt:
`The path down to the camp in the grey before dawn. Below, the 9th's fires are burning low, and the column is stirring.`,
      ch:[{t:'Down to the column.', onward:true, go:()=>{ S.f.b4_c2_ph = 5; startExplore('b4_c2_morning'); talk('b4_c2_dawn_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}) : ({sp:'The path down', txt:
`The path down to the camp. The Third came up here tonight on purpose. ${S.f.b4_c2_names ? 'The robbers will be back before dawn, the old woman said.' : 'The pilgrims are waiting on the slope.'}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]})) : S.f.b4_c2_robbersDone ? ({sp:'The path down', txt:
`The path down to the camp, and the 9th's fires below.`,
      ch:[{t:'Down to the camp.', onward:true, go:()=>{ startExplore('b4_c2_camp'); if (!S.f.b4_c2_night) talk('b4_c2_night'); }},
          {t:'Not now.', go:()=>startExplore()}]}) : ({sp:'The path down', txt:
`The path down to the camp. At the crest, men are still filling sacks.`,
      ch:[{t:'Down to the camp.', onward:true, go:()=>{ startExplore('b4_c2_camp'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the night: the key ---- */
    b4_c2_night:()=>({sp:'Below Coltaine\'s Fall', scene:'b4_road_fire', fx:()=>{ S.f.b4_c2_night = 1; S.f.b4_c2_ph = Math.max(b42Ph(), 3); }, txt:
`Night comes down over the camp all at once, the Seven Cities way. The 9th's fires go up along the road. On the hill, more pilgrims' lamps come out among the braids, a few dozen, and the sound of old people singing comes down now and then on the wind, and goes away again.

The company is talking about the robbers on the hill and the Chain squad that put them off it. It is also talking about the riders seen in the rocks to the east, and about the Crow and the boy, and about the trees, and about the hill. Mostly about the hill.

The order is the Fist's, through the captain: the column keeps its lines tonight, every company its own stretch of the camp's edge. And above the camp the pilgrims are going up the Fall in the dark with their lamps, the way they do every night, to sit with the dead until the morning.

${b42Say({haddat:`Haddat sits down by the fire with her back to the hill, and then turns round, and looks at it.`, sathi:`Sathi stands back from the fire looking up at the lamps, with Hackle against her leg.`, _:`The squad looks up at the lamps on the hill.`})}`,
      ch:[{t:'Find Radde.', go:'b4_c2_key'},
          {t:'The Third\'s fire.', go:'b4_c2_fire'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b4_c2_key:()=>({sp:'Sergeant Radde', scene:'b4_road_fire', txt:
`Radde is on his bucket with the book on his knee. He has seen you coming, and has had time to decide what he will say, and says it anyway as if he had not.

"The pilgrims go up every night," he says. "Old Crow, mostly, and some of Aren. They sit with the dead until the morning and come down for the bread." He looks at the hill. "Some of the company want to go up tonight with them. Recruits. They heard about the robbers. They heard about the Third." He writes nothing. "The Fist's order is the column keeps its lines. Every company its own stretch of the edge, all night. There are riders in the rocks."

He looks at you. "I'll not stop the Chain squad going up that hill, Sergeant. I couldn't, I think. But the Third goes up, the Third's stretch of the line goes to somebody else, and the Third's place in the column tomorrow goes with it. You'll march at the back, in the 10th's dust, and you'll not have slept." He shuts the book on the pencil. "Or the Third keeps its place, as ordered, and the hill keeps its lamps without you. Either way I'll write it."${b42Say({haddat:`\n\nHaddat is standing behind you. She has not said anything. She does not need to.`, marrow:`\n\nMarrow has her string out, and her thumb on a knot.`, _:''})}${b42R({redblade:`\n\nRamin waits, very straight, to see what the squad he is lent to will do. He has his hand on the place on his sash where a badge would be.`, warlock:`\n\nKeth is looking at the hill. "*They would like it,*" the grandmother says. "*The ones up there. The company of it.*" Keth, in his own voice: "She doesn't get a vote."`})}`,
      ch:[{t:'"The Third goes up the hill tonight, with the pilgrims."', go:'b4_c2_key_fall'},
          {t:'"The Third keeps its place. As ordered."', go:'b4_c2_key_march'},
          {t:'"Give me a moment, Sergeant."', go:()=>startExplore()}]}),
    b4_c2_key_fall:()=>({sp:'Sergeant Radde', scene:'b4_road_fire', txt:
`Radde looks at you for a long breath. Then he opens the book and writes, and turns it so you can see: the Third's names, and beside them, tonight's date, and *the Fall*.

"I'll give your stretch to the next squad along," he says. "They'll complain." He shuts the book. "Go on, then. Before the lamps are all up."

${b4In('tangle') ? `Tangle is shouldering the satchel. He stops, and looks at it, and at the hill. "The dead don't need the cusser," he says. "I'd thought of leaving it up there. For them." He thinks about it. "They don't need it. We might." He keeps it.\n\n` : ''}${b42Say({haddat:`Haddat is already walking.`, _:`The squad is already walking.`})}`,
      ch:[{t:'Up the hill, with the pilgrims.', onward:true, fx:()=>{ S.f.b4_c2_key = 'fall'; S.f.b4_fallClimbed = 1; S.f.b4_c2_ph = 4; S.f.b4_c2_rear = 1; b4Nerve(1, 'The company saw the Chain squad go up the hill, and some went after'); b42L('haddat', 2); b42L('marrow', 1); }, go:()=>{ startExplore('b4_c2_hill'); talk('b4_c2_climb'); }},
          {t:'"Not yet."', go:()=>startExplore()}]}),
    b4_c2_key_march:()=>({sp:'Sergeant Radde', scene:'b4_road_fire', txt:
`Radde nods, once, and something in his sunburnt face lets go. "Good," he says. "Good. That's soldiering, Sergeant." He opens the book, and writes, and turns it so you can see: the Third's names, and beside them, tonight, *its place*.

"The Third's stretch is the far end of the company's line, fifty paces past the last tent, where the road bends." He shuts the book. "Out at dark. In at dawn. The hill will be there in the morning. It's been there a while."

${b42Say({haddat:`Haddat does not move. Then she picks up her shield, and goes to the line, and keeps her back to the hill after that, and that is what it costs her.`, marrow:`Marrow sighs, and puts her string away. "The living, then, child," she says. "They need it more."`, _:`The squad picks up its shields.`})}`,
      ch:[{t:'To the line.', onward:true, fx:()=>{ S.f.b4_c2_key = 'march'; S.f.b4_fallClimbed = 0; S.f.b4_c2_ph = 4; b4Nerve(1, 'Radde approved, and the company saw the Chain squad keep its place'); b42L('haddat', -1); }, go:'b4_c2_line'},
          {t:'"Not yet."', go:()=>startExplore()}]}),

    /* ---- 'march': the Third's place on the line, and the night probe ---- */
    b4_c2_line:()=> S.f.b4_c2_probeDone ? ({sp:'The 9th\'s line', txt:
`The far end of the Second Company's line, quiet now. The fires behind are low. ${S.f.b4_c2_ph >= 5 ? 'The column is forming.' : 'There is not much of the night left.'}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}) : ({sp:'The 9th\'s line · the first watch', scene:'b4_road_fire', txt:
`The Third's stretch is the far end of the company's line, past the last tent, where the Way bends round a shoulder of rock: fifty paces of dark with the camp's fires at your back and nothing in front but the rocks and the road and the stars.

The squad stands it the way the Chain stood every night of the Chain: shields grounded, ${b4In('tebbet') ? 'Tebbet a little back with an arrow on the string, ' : ''}one awake for every one dozing, nobody by a fire. Behind and above, on the hill, the pilgrims' lamps sit among the braids, very small, and the old people's singing comes down in pieces.

${b42Say({haddat:`Haddat stands at the end of the line with her back to the hill, which is the hardest place on the line to stand tonight. She chose it.`, sathi:`Sathi lies on her belly on the rock with Hackle beside her and her chin on her fists, watching the dark the way the Weasels watched it.`, _:`The dark in front is very dark.`})}${b42R({redblade:`\n\nRamin stands the line on foot with his lance grounded, very straight, the way the Red Blades stood the walls of Aren.`, warlock:`\n\nKeth has his palms flat on the rock. "*Someone,*" the grandmother says, very quietly, after a while. "*Out there. More than one.*"`})}

In the second hour, out in the rocks, a pebble goes.`,
      ch:[{t:'"Stand to." Shields up.', go:()=>startBattle('b4_c2_probe', {})},
          {t:'Tangle throws a sharper out into the dark in front of the line.', tag:'uses 1 sharper', req:()=>b4In('tangle') && (S.inv.sharper || 0) > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b4_c2_probe', {pre:true})},
          {t:'Let them come close. Hold still in the dark, and take them at the line.', check:['wits', 14],
            edges:id=>[id === 'tebbet' && ['he would rather be a long way off in the dark, and knows how to stay still in it', 2], id === 'sathi' && ['the Weasels watched every night of the Chain this way', 2], id === 'haddat' && ['night watches from Hissar to Aren', 1], id === 'tallow' && ['he has never stood a night watch that mattered', -1]],
            near:{t:'Yes, but a recruit two tents back drops a pot, and out in the rocks everything goes very still, all at once.'},
            go:()=>startBattle('b4_c2_probe', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c2_probe_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c2_probe_seen:()=>({sp:'The 9th\'s line', scene:'b4_road_fire', txt:
`For a while it works. Then somebody in the company's tents behind the line laughs out loud at something, and out in the rocks the raiders know exactly where the Malazans are. They come all at once, low and fast and painted, with spears.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c2_probe', {surprise:'e'})}]}),
    b4_c2_probe_after:()=>({sp:'The 9th\'s wagons', scene:'b4_road_fire', fx:()=>{ S.f.b4_c2_probeDone = 1; }, txt:
`The raiders' leader is down by the wagon wheel, and the rest have gone back into the rocks the way they came, fast, carrying two of their own. The torch is out in the dust where somebody stamped it. One wagon has a black scorch along its side and a pole cut through, and the oxen are standing in a knot, eyes white, being talked to by their drivers.

The company is all round the squad, in shirts and bare feet, with spears, getting its breath. One of the recruits has a cut along his arm and is showing it to everybody. The freckled girl from Aren is holding her spear the right way round.

"Tribesmen," says somebody of the company. "Out of the hills. They've been in the rocks all day." Whose, the company cannot say. The 9th has never heard of them.

Radde comes along the line with a lantern, and looks at the wagon, and the raiders' leader, and the squad, and the company round the squad. He opens the book and writes a long time. "The Third kept its place," he says, at last, to the company. "And the place held." He shuts the book. "Get some sleep. All of you. The march is at dawn."${b42R({redblade:`\n\nRamin cleans his lance-head on the raiders' leader's cloak. "Seven Cities," he says, quietly. "Hill clans. Poor ones." Whose side they think they are on, he leaves alone.`, warlock:`\n\nKeth crouches by the dead man a while with his palms down. "*Gone home,*" the grandmother says. "*It is a long walk, from here.*"`})}

Up on the hill, the pilgrims' lamps are still burning, every one.`,
      ch:[{t:'Sleep what is left of the night.', onward:true, go:()=>{ S.f.b4_c2_ph = 5; startExplore('b4_c2_morning'); talk('b4_c2_dawn_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- 'fall': up the hill at night with the pilgrims; the names; the robbers' second try ---- */
    b4_c2_climb:()=>({sp:'Coltaine\'s Fall · night', scene:'b4_c2_fall', txt:
`The path in the dark is the ants' path, and the pilgrims' lamps go up it in a slow line, old people with sticks, and the Third goes up among them, and behind the Third, when you look back, there are other lights coming: a handful of the Second Company's recruits with a lantern, and two regulars who ought to be on the line, and the freckled girl from Aren with her spear over her shoulder.

"We heard," she says, when she catches up, out of breath. "About the robbers. We thought." She does not finish. She does not need to.

At the top the pilgrims sit down among the braids, each by a lamp, and the hill is quiet except for the wind in the feathers and the old people singing, low, in Wickan, a song with no end to it. The lamps make little rooms of light among the stakes. Beyond them, Aren's walls are a pale line on the edge of the dark, very near.

The old woman of the Crow is there by her lamp on the slope. She sees the squad and nods, as if she had expected it.`,
      ch:[{t:'Sit with the pilgrims.', go:'b4_c2_names'},
          {t:'Walk the hill.', go:()=>startExplore()}]}),
    b4_c2_names:()=>({sp:'Coltaine\'s Fall · night', scene:'b4_c2_fall', fx:()=>{ S.f.b4_c2_names = 1; }, txt:
`So the Third sits down among the pilgrims, on the hill, in the dark, each by a lamp.

${b42Say({haddat:`Haddat says the names. All of them, the way she does at night, one after another in Hissari and then in Malazan, so the recruits who came up after can hear: everyone she knew on the Chain and some she only heard of. It takes most of an hour. The old woman of the Crow listens to every one, with her eyes closed, and at the end she says something in Wickan that might be *good*.`, _:`The names get said, the way the Chain said them: one at a time, by whoever knew them, until there are no more anybody can remember. It takes most of an hour. The old woman of the Crow listens to every one with her eyes closed.`})}${b4In('marrow') ? `\n\nMarrow unpicks a knot off the end of her string, and ties it round one of the stakes, low down, and does not say whose it is.` : ''}${b4In('sathi') ? `\n\nSathi sits with Hackle across her knees, and for once she is not grinning, and for a long time she does not do anything at all. Then she laughs, quietly, at something only she remembers.` : ''}${b4In('tangle') ? `\n\nTangle sits with the satchel on his lap, and does not open it, and does not count it. It is the only time anybody in the squad has seen him not count it.` : ''}${b42New().length ? `\n\n${b42New().includes('tallow') ? 'Tallow sits very close to the squad and listens to every name as if he were going to be tested on them. ' : ''}${b42New().includes('hessa') ? 'Hessa puts her palm flat on the earth by her lamp, the way she prays at dusk, and leaves it there. ' : ''}${b42New().includes('tebbet') ? 'Tebbet sits facing out, with an arrow across his bow, because someone should. ' : ''}${b42New().includes('darrut') ? 'Darrut sits with his back to Aren\'s walls, and does not turn round to them once.' : ''}` : ''}${b42R({redblade:`\n\nRamin says the names of his company, the ones who did not come off the Chain, in the Ehrlitan dialect, quietly, at the end, after everybody else. There are a great many of them.`, warlock:`\n\nKeth sits with his palms flat on the hill and the grandmother speaks out of him to the old woman of the Crow, low, a long time, and the old woman answers. Neither of them will say what about.`})}

There are things to leave, if the squad wants to leave them.`,
      ch:[{t:'Leave the market\'s "Coltaine\'s finger" here, where he fell.', req:()=>(S.kit || []).includes('b4_c1_relic') && !S.f.b4_c2_relicLeft, fx:()=>{ b42Drop('b4_c1_relic'); S.f.b4_c2_relicLeft = 1; b42L('haddat', 1); note(b4In('haddat') ? 'The phial goes into the earth by the old woman\'s lamp. Haddat covers it over with her hand, and says "Goat," and almost laughs, and then does not.' : 'The phial goes into the earth by the old woman\'s lamp. It is a goat\'s, probably. It is on his hill now anyway.'); }, go:'b4_c2_names'},
          ...b42Keeps().slice(0, 2).map(it => ({t:`Leave ${ITEMS[it].name.replace(/^[A-Z]/, c => c.toLowerCase())} on the hill.`, req:()=>!S.f.b4_c2_keepLeft && (S.kit || []).includes(it), fx:()=>{ b42Drop(it); S.f.b4_c2_keepLeft = it; b42L('haddat', 1); b42L('marrow', 1); note('It goes on a stake among the braids, tied on with three turns and a knot. It was carried the length of the Chain. It can stay at the end of it.'); }, go:'b4_c2_names'})),
          {t:'Ask the old woman for a feather, for the Chain\'s bone.', req:()=>S.f.b4_bone === 'chain' && !S.f.b4_c2_feather, go:'b4_c2_feather'},
          {t:'Keep the watch with the pilgrims.', go:'b4_c2_hill_wait'},
          {t:'Walk the hill.', go:()=>startExplore()}]}),
    b4_c2_feather:()=>({sp:'An old woman of the Crow', scene:'b4_c2_fall', fx:()=>{ S.f.b4_c2_feather = 1; gain('b4_c2_crowfeather'); b42L('sathi', 1); }, txt:
`The old woman looks at the bones at the squad's throats, and at what is tied to them, ${S.f.b4_c1_token === 'feather' ? 'the crow feathers from the pilgrims\' road' : 'the Chain\'s tokens'}, and nods slowly.

She reaches out without getting up and draws one long black feather out of the earth by her lamp, a flight feather, and ties a twist of red wool round its quill with fingers that have done it ten thousand times, and holds it out.

"Off his hill," she says. "Not off a stall." She puts it into your hand and closes your fingers on it. "The birds will know the difference."`,
      ch:[{t:'"Thank you, grandmother."', go:'b4_c2_names'}]}),
    b4_c2_hill_wait:()=> S.f.b4_c2_hillDone ? ({sp:'Coltaine\'s Fall', txt:
`The hill is quiet. The pilgrims are relighting their lamps.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}) : ({sp:'Coltaine\'s Fall · the small hours', scene:'b4_c2_fall', txt:
`The night goes on. The old people sing, and stop, and sing. Some of them sleep where they sit. Down below, the 9th's fires burn low along the road, and once, a long way off at the far end of the camp, there is shouting, and a light that might be a torch, and then nothing. Another company's stretch of the line. ${S.f.b4_c2_probeHeard ? '' : 'The company will tell it in the morning.'}

Then, in the small hours, at the crest above the pilgrims, the lamps go out. Not all at once: one, and then another, the way lamps go out when somebody is walking among them putting them out with a hand.

The old woman of the Crow opens her eyes. "Back," she says. "For what they left."

${b42Say({haddat:`"Twice," Haddat says. "On this hill." She stands up with the shield.`, _:`The squad stands up.`})} Behind the Third, the recruits who came up after are getting to their feet with their spears, and the two regulars of the company, and the freckled girl, who is white to the lips and has her spear the right way round.`,
      ch:[{t:'"Between them and the pilgrims." Shields up.', fx:()=>{ S.f.b4_c2_probeHeard = 1; }, go:()=>startBattle('b4_c2_hill', {})},
          {t:'Tangle throws a sharper on the path below the crest, where nobody is praying.', tag:'uses 1 sharper', req:()=>b4In('tangle') && (S.inv.sharper || 0) > 0, fx:()=>{ S.inv.sharper--; S.f.b4_c2_probeHeard = 1; }, go:()=>startBattle('b4_c2_hill', {pre:true})},
          {t:'Ask the pilgrims to put out their lamps, and wait for them in the dark.', check:['wits', 14],
            edges:id=>[(id === 'sathi' || id === 'warlock') && ['the old Crow will do it for a Wickan without a word', 2], id === 'haddat' && ['the pilgrims watched her say the names', 1], id === 'tebbet' && ['he has been facing out all night', 1], id === 'tallow' && ['he whispers too loudly', -1]],
            near:{t:'Yes, but one old man will not put out his lamp for anybody, and sits there by it in the dark, a little island of light, singing, and the men coming up the path see it.', fx:()=>{ S.f.b4_c2_probeHeard = 1; }},
            go:()=>{ S.f.b4_c2_probeHeard = 1; startBattle('b4_c2_hill', nearMiss() ? {} : {surprise:'p'}); }, fail:'b4_c2_hill_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c2_hill_seen:()=>({sp:'Coltaine\'s Fall', scene:'b4_c2_fall', fx:()=>{ S.f.b4_c2_probeHeard = 1; }, txt:
`The lamps go out, most of them, and for a breath the hill is dark, and then one of the recruits who came up after strikes a light to see where his spear is. The men on the path are on the slope at once.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c2_hill', {surprise:'e'})}]}),
    b4_c2_hill_after:()=>({sp:'Coltaine\'s Fall · before dawn', scene:'b4_c2_fall', fx:()=>{ S.f.b4_c2_hillDone = 1; }, txt:
`The man in the good headcloth is lying across his own cloak at the crest with his long knife a yard from his hand, and his hired men have gone down the far side of the hill into the dark, and they will not be back this time. One of the regulars of the company is sitting on a stone with his head in his hands and blood in his hair, swearing, and the freckled girl is tying a cloth round it for him, badly.

The pilgrims are relighting their lamps, one from another, all along the crest, without hurrying.

${b42Say({haddat:`Haddat goes along the crest in the grey and puts every braid that came down back on its stake. When she gets to the end she stands a while looking down at Aren's walls in the first light. Then she comes back.`, marrow:`Marrow goes round the company's recruits and looks at hands and heads, and ties a knot at the end.`, _:`The squad sits down among the pilgrims, and gets its breath.`})}

The old woman of the Crow is by her lamp. She looks up at the squad as the grey comes. "Twice," she says. "On his hill." She nods. "The birds saw."

Down below, the 9th's fires are low, and at the far end of the camp's line there is a wagon with a black scorch along its side: raiders, the company will say later, came to the line in the night, and the next squad along held the Third's stretch, and complained about it. And the column is stirring. The Third's place in it has gone to somebody else.${b42R({redblade:`\n\nRamin cleans his sword on the braid-cutter's cloak, and then folds the cloak, and puts it under the old woman's lamp, for her to sit on.`, warlock:`\n\nKeth crouches by the bare place near the top a long time with his palms down. The grandmother says nothing at all. It is the first time.`})}`,
      ch:[{t:'Down to the column, before the dawn.', onward:true, go:()=>{ S.f.b4_c2_ph = 5; startExplore('b4_c2_morning'); talk('b4_c2_dawn_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the morning: the news, belief only (S.f.b4_news), Hollet, the recruits' fear, the road north ---- */
    b4_c2_dawn_arrive:()=>({sp:'Below Coltaine\'s Fall · morning', scene:'b4_march', fx:()=>{ S.f.b4_c2_ph = 5; S.f.b4_news = 1; b4Nerve(-1, 'The news from Genabackis ran through the camp'); }, txt:
`By the time the grey is light the news is everywhere.

Where it started, no one knows. It came out of the 8th's lines, the 9th says, before dawn; the 10th says it came out of the 9th's. A man came out of a warren in the night at the Adjunct's tents, a Claw, and a high one by the way the guards stood, the story goes, with news from Genabackis. And by morning every soldier in the Fourteenth has heard what he said.

*Whiskeyjack is dead.* *The Bridgeburners are dead, every one.* *Captain Paran with them.* *Dujek's Host is broken, out on Genabackis, finished.* That is what the camp is saying. It is saying it at the water barrels and the cook-fires and in the traces, low, the way you tell a thing you have just been told and cannot yet hold.

${b42Say({darrut:`Darrut, lacing his boots, has stopped with the lace in his hand. "The Bridgeburners," he says. "In the Guard we used to say if the Bridgeburners ever died the Empire would have to send somebody to tell the world." He pulls the lace. "Looks like it sent a Claw."`, tangle:`Tangle has the satchel open and is counting it, very fast, the way he counts it when he does not want to think about something else.`, _:`The squad hears it the way the camp hears it: at the barrels, from a man who heard it from a man.`})}

And the column is forming on the road, under the standard, as if nothing had been said at all.`,
      ch:[{t:'Walk the camp.', go:()=>startExplore()},
          {t:'The Third\'s fire.', go:'b4_c2_fire'}]}),
    b4_c2_hollet_news:()=>({sp:'Captain Hollet', fx:()=>{ S.f.b4_c2_hollet3 = 1; }, txt:
`Hollet is sitting on his camp table in front of his folded tent with his tablets in his lap, not writing. He looks up when the squad comes, and he looks older than he did last night.

"Genabackis," he says. "I kept the books for nine years in Genabaris, Sergeant. I signed Onearm's Host in and out of my stores the year they went up the coast. I knew the quartermasters." He coughs. "Whiskeyjack's men drew their boots from me once. They were the rudest men I ever met. They paid for every pair."

He turns a tablet over in his hands. "If it's true," he says, and stops, and starts again. "The recruits are saying if the Bridgeburners can die, anybody can. As if they hadn't known." He looks at you. "Is it true, do you think?"`,
      ch:[{t:'"They said the Chain was dead, sir. In Aren. For a month."', fx:()=>{ S.f.b4_c2_doubt = 1; b42L('haddat', 1); }, go:'b4_c2_hollet_doubt'},
          {t:'"I don\'t know, sir. The march is still north."', fx:()=>{ S.f.b4_c2_doubt = 0; }, go:'b4_c2_hollet_north'}]}),
    b4_c2_hollet_doubt:()=>({sp:'Captain Hollet', txt:
`Hollet looks at you a long while. Then something in his thin face almost smiles. "So they did," he says. "So they did. I heard it in Genabaris too, the Chain gone, all of it, Coltaine and all." He coughs. "And here are the Third, eating bread."

He sets the tablet down. "Thank you, Sergeant. I'll tell the company that. Not as if I knew. As a thing that happened once." He gets up off the table. "Rumours from a long way off are the worst kind, my father used to say. No one can go and look."`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b4_c2_hollet_north:()=>({sp:'Captain Hollet', txt:
`"Yes," Hollet says. "Yes, it is." He looks up the road, where the column is forming, and the standard is up at the head of it, very small. "North. Well." He gets up off the table and picks up his tablets. "I'd best count something, then. It helps."

He goes. He does not cough until he is out of earshot of the recruits.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_fear:()=> S.f.b4_c2_fear ? ({sp:'The Second Company\'s recruits', txt:
`The recruits are striking their tent. ${S.f.b4_c2_fear === 'fire' ? 'One of them is telling another the thing the sergeant said, wrong, and it is still a comfort.' : 'They are quiet, but they are doing it.'}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}) : ({sp:b4In('tallow') ? 'Tallow' : 'The Second Company\'s recruits', html:nerveHTML('The Second Company'), txt:
`${b4In('tallow') ? `Tallow is behind the company's tents, where he thinks nobody can see him, with his grandmother's deck in its oilcloth in both hands and his face white under the sunburn. He is not crying. He is working very hard at it.

"The Bridgeburners," he says, when he sees you. "In the hold, on the transport, we used to tell stories about them. Every night. That they couldn't be killed. That was the whole point of them." He holds the deck tighter. "If they can be dead, Sergeant, all of them, in a place I've never heard of, then what's the Fourteenth? What are we?" He swallows. "I'm sorry. I'm sorry. I'm all right."

Behind him the company's recruits are striking their tent and listening to every word.` : `The freckled girl from Aren is behind the company's tents, sitting on her rolled blanket with her spear across her knees and her face white under the freckles. The other recruits are round her, not striking their tent, not doing anything.

"The Bridgeburners," she says, when she sees you. "My uncle served with a man who'd seen them. He said they couldn't be killed. That was the whole point of them." She swallows. "If they can be dead, all of them, then what's the Fourteenth? What are we, Sergeant?"`}

The company is frightened this morning. You can feel it along the whole line of the tents.`,
      ch:[{t:'Say it to the whole company, so they all hear: "The Chain heard worse every week, and walked."', fx:()=>{ S.f.b4_c2_fear = 'fire'; b4Nerve(1, 'The company heard the Chain squad say it'); b42L('tallow', -1); }, go:'b4_c2_fear_fire'},
          {t:b4In('tallow') ? 'Take Tallow aside, quietly, away from the company.' : 'Sit with her a moment, quietly, away from the rest.', fx:()=>{ S.f.b4_c2_fear = 'quiet'; b42L('tallow', 1); b42L('marrow', 1); }, go:'b4_c2_fear_quiet'}]}),
    b4_c2_fear_fire:()=>({sp:'The Second Company', txt:
`So you say it loud, so the whole line of tents can hear it: that the Chain heard worse every week from Hissar to Aren, that it heard Aren had fallen and Coltaine was dead and the Empire had given up on Seven Cities, and walked, and here it is. That rumours from a long way off are the worst kind, because nobody can go and look. That the march is north, and the Fourteenth is marching it.

It is not much. The company stops to hear it anyway, all along the tents, and when it is over a sergeant of the next company says "Right," loudly, and the tents start coming down again.

${b4In('tallow') ? `Tallow has gone red to the ears, to have been the reason, in front of everybody. But he stands up, and puts the deck back in his shirt, and goes to strike the squad's tent.` : `The freckled girl stands up, and picks up her spear the right way round, and goes to strike the tent.`}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_fear_quiet:()=>({sp:b4In('tallow') ? 'Tallow' : 'The freckled recruit', txt:
`${b4In('tallow') ? `You take him round behind the carts, where the company can't see, and sit on a wheel, and let him get it out.

He does, in pieces. The hold, and the stories, and the trees, and the hill, and now this, all on the first day. You do not say much. You say that the Chain heard worse every week and walked, and that rumours from a long way off are the worst kind, because nobody can go and look. At the end he wipes his face on his sleeve and laughs, a little.

"My grandmother would have said read the cards," he says. "She'd have said they'd know." He does not take them out. "I don't want to know, today." He stands up. "Thank you, Sergeant."` : `You sit down on the blanket beside her, away from the others, and let her get it out. Her uncle, and the stories, and the trees, and the hill, and now this. You say the Chain heard worse every week and walked. At the end she wipes her face on her sleeve and nods. "Right," she says. "Right." She stands up.`}

${b42Say({marrow:`Marrow, passing with her kit, looks at you and nods once, as she does for a wound well dressed.`, _:''})}

Behind you the company is still frightened. But one of them is not, quite, as much.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c2_radde_dawn:()=>({sp:'Sergeant Radde', fx:()=>{ S.f.b4_c2_raddeDawn = 1; }, txt:
`Radde is standing by the road with the book under his arm, watching the column form. "Rumours," he says, before you can speak. "You'll want to know what I think. I think a Claw came to the Adjunct's tent and told her something, and somebody heard it, and the somebody wanted it heard. That's all I know, and all anybody knows." He writes. "The Adjunct's told the Fists that nobody leaves the column. Not for this. Not for anything. The camp says there'll be desertions. The Adjunct says there won't."

He looks at the squad. ${b42Key() === 'fall' ? `"The Third marches at the back today, Sergeant, behind the 10th's wagons, in everybody's dust. I said you would." He writes. "Some of the company asked to march at the back with you. I said no." He almost smiles. "I wrote it down, though."` : `"The Third kept its place last night, and the place held. That's in the book." He shuts it. "The march is north, Sergeant. Same as yesterday. Same as tomorrow."`}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c2_dawn:()=>({sp:'The Aren Way · morning', scene:'b4_c2_standard', txt:
`The column goes north.

${b42Key() === 'fall' ? `The Third goes north at the very back of it, behind the 10th's wagons, in the dust of three legions and a great many oxen, with no sleep in it, eating grit. The squad does not complain. When the road bends you can see the hill behind, and on it, in the morning light, the braids moving, all of them, back on their stakes.` : `The Third goes north in its place in the middle of the 9th, rested, with the company round it. When the road bends you can see the hill behind, and the pilgrims coming down off it for their bread, and the braids moving on it in the morning light.`} Ahead, very far up, the standard goes before the column: a thin figure holding up a bone, before a sandstorm.

The trees go on along the Way, empty, and the army walks past them. Everybody in it is thinking about Genabackis, and the Bridgeburners, and whether a thing is true because the whole camp says it is.

${b42Say({haddat:`Haddat walks at the front of the squad with the shield up${(S.kit || []).includes('b4_c2_fetish') ? ', the little painted soldier swinging from its rim' : ''}. "North," she says in Hissari. "Again."`, tangle:`Tangle counts the satchel. "Same as yesterday," he says. "Lovely."`, _:`The squad walks.`})}${b4In('tallow') ? `\n\nTallow touches the bone at his throat, and the oilcloth in his shirt, and then he stops touching things and walks.` : ''}${b42R({redblade:`\n\nRamin walks with the squad on foot. Every tree he passes, he looks at, and then at the next.`, warlock:`\n\nKeth walks with the squad, and every few hundred paces he looks back at the hill until it is gone. "*Good lamps,*" the grandmother says at last. "*They will keep.*"`})}`,
      ch:[{t:'North.', onward:true, go:()=>chapterEnd(2, S.f.b4_c2_key || 'march')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
