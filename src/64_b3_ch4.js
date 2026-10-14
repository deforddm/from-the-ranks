/* ============ Book Three, Chapter 4: The Prisoners ============ */
/* West of Capustan, two days after the relief: two hundred thousand starving Tenescowri held on the plain behind a ditch and a stake
   line, and Whiskeyjack's order that nobody touches them. The Fourth walk a stretch of that line; go into the city for the Grey Swords'
   guide (Dannet joins, or waits with her company); ride west at dusk with Grey Swords and ropes after a K'ell Hunter, under dust that
   is not weather; and hold their stretch the night a Pannion priest drives the starving at the stakes.
   Key (S.f.b3_c4_key): 'share' (the squad's own rations and salves go to the children and the sick: trust +2, dread −2, −2 salves,
   Whiskeyjack notices: S.f.b3_wjNoticed = 1) or 'hold' (the squad keeps its supplies for the march: dread +2, Ohl's loyalty −1).
   Canon kept at the distance the brief asks: Anaster's arrest, the dragon over the camp's heart, the Second Gathering, the Barghast's
   First Founders under the Thrall and Paran's word to the Grey Swords are seen far off or heard of, never touched (docs/moi-canon.md
   §6 and the Chapter 4 re-check). The darker material is headline only. */
/* FOR THE ARTIST (64b): names this file uses.
   Items, ART['item/<key>']: b3_c4_ropehooks (Grey Sword rope-and-hooks), b3_c4_flint (T'lan Imass flint blade), b3_c4_token (Capan temple token).
   Figures (FIGX, as foe/npc kind): b3_c4_priest, b3_c4_zealot; shelf kinds also used: wj, tav, tenescowri, child, b2soldier, b3_rhivi_rider,
   greysword, b3_greysword, b3_barghast, khell. (b3_c4_imass and b3_c4_canoe are drawn for the glimpse and the Thrall; the text carries both.)
   Ground (TILEX / area decor and battle style): b3_c4_camp, b3_c4_camp_night, b3_c3_city (aliased in 64b with ??= if Chapter 3 is absent).
   Backdrops (SCENEX): b3_c4_prisoners, b3_c4_gathering, b3_c4_founders. */

const c4In = id => b3In(id);
/* Brisk's letter from Tav: open on a fresh start ("four coppers"); still sealed if a Book One import never opened it */
const c4Shut = () => !!(S && S.imported && b3Was('c7_letter') !== 'brisk');
/* the counts from the breakout: the starving the Fourth put down with the flat of a blade and sent back alive, and the ones who died */
const c4Back = (cap = true) => { const n = c4Spared(); return n ? `${numw(n, cap)} of the starving went back across the ditch alive` : `${cap ? 'None' : 'none'} of the starving went back across the ditch alive`; };
const c4Spared = () => (S.f.b3_c4_spared || 0) + (S.f.b3_c4_sat || 0), c4Dead = () => S.f.b3_c4_starvedDead || 0;
/* who the Fourth met Dannet as, in Chapter 3 (a sensible default when Chapter 3 was not played: she is new) */
const c4DannetHow = () => !S.f.b3_dannetMet ? 'new' : S.f.b3_c3_key === 'camps' ? 'camps' : 'field';
/* the people of this chapter, by name */
const C4 = {mother:'Sarn', boy:'Tibb', corporal:'Mosk', ropesgt:'Ambrel'};
/* the same map serves the day, the night and the dawn on the guards' bank: the prisoners north of the ditch, the gap where the carts go in */
const C4EDGE = [
  "=,.=..=.,=..=.,=",
  ".,.=,..,..,.=..,",
  "########.#######",
  "..,.........,...",
  ".F.....x.....F..",
  "......c........>",
  ".,.............>",
  "....=......,....",
  "..,....F........",
  ".........,....,.",
  "..=..,......=...",
  "################"];

/* ---- the Wolves' Rope: the Grey Swords' way of pulling down a K'ell Hunter (a hard check in the barracks yard) ---- */
Object.assign(TRICKS, {
  b3_c4_wolfrope:{name:'The Wolves\' Rope', ch:4, use:'fight', ab:'t_b3_c4_rope', where:'the Grey Swords\' yard in Capustan, with a rope-sergeant who pulled a K\'ell Hunter down before the siege and buried what it cost',
    lore:'Two iron hooks back to back on a grey rope, thrown low, round the legs, and every hand on the rope pulling the same way at the same moment. The Grey Swords learned it on the plain before the siege, from a thing that did not die when it should have. They call it the Wolves\' Rope now. In the winter it had the boar\'s name.',
    get fx(){ return `Once a fight: throw the hooks at an enemy within ${c4RopeReach()}. Until the bearer's next turn it is −2 to hit and every blow on it hits +${2 + lvT()}; against something huge (a boss) both are doubled. Grows with level.`; }},
});
/* the rope reaches one further for whoever carries the Grey Swords' own rope-and-hooks */
const c4RopeReach = u => 2 + (u && Object.values((S.gear && S.gear[u.id]) || {}).includes('b3_c4_ropehooks') ? 1 : 0);
Object.assign(AB, {
  t_b3_c4_rope:{name:TRICKS.b3_c4_wolfrope.name, trick:'b3_c4_wolfrope', desc:()=>TRICKS.b3_c4_wolfrope.fx,
    tiles:u=>foes().filter(f => cheb(u, f) <= c4RopeReach(u) && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const big = !!t.boss; AUDIO.play('sword'); shakeMap();
      t.b3RopeUntil = B.round + 1; t.b3RopeAc = (2 + lvT()) * (big ? 2 : 1); t.b3RopeHit = big ? 4 : 2;
      float(t, 'roped', '#c8ccd4'); sparks(t.x, t.y, 12, '#a4a6a8', .5);
      blog(`${u.name} throws the hooks low. The rope goes round ${t.name}'s legs and ${big ? 'every hand near it takes hold and pulls the same way at the same moment. It is too big to fall. It staggers' : 'snaps tight, and it staggers'}.`); }},
});
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (!b3On() || !B || !a || !t) return c;
    if (t.side === 'e' && t.b3RopeUntil >= B.round) c.ac -= t.b3RopeAc || 2;
    if (a.side === 'e' && a.b3RopeUntil >= B.round) c.bonus -= a.b3RopeHit || 2;
    return c; }; }

/* ---- the T'lan Imass flint blade: colder near the K'Chain Che'Malle (+3 damage against them), in any Book Three fight ---- */
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (b3On() && B && a && t && a.side === 'p' && !a.ally && t.kind === 'khell' && Object.values((S.gear && S.gear[a.id]) || {}).includes('b3_c4_flint')) {
      const dd = o.dmg || a.dmg; if (!B.used['flint_' + a.id]) { B.used['flint_' + a.id] = 1; blog(`<em>The flint in ${a.name}'s hand goes cold as a winter stone.</em>`); }
      return _attack(a, t, Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + 3]})); }
    return _attack(a, t, o); }; }

/* ---- the breakout (b3_c4_breakout, def.b3Spare): the starving the priest drives at the stakes are not the enemy ----
   A starving one (FOES spare:true) put down by a squadmate's blade in reach, or by an ally, is knocked down and dragged back alive
   (S.f.b3_c4_spared); one killed by a shot, a munition or fire is dead (S.f.b3_c4_starvedDead). When the priest's people are all down,
   the starving left standing sit down where they are (S.f.b3_c4_sat) and the fight is won. Retrying the fight restores the counts. */
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (b3On() && B && B.def && B.def.b3Spare && t && t.spare && a && a.side === 'p') t.b3Last = a.ally || (cheb(a, t) <= 1 && !a.reachMelee) ? 'flat' : 'shot';
    return _attack(a, t, o); }; }
{ const _blast = blast;
  blast = function(pt, dice, col){ if (!(b3On() && B && B.def && B.def.b3Spare)) return _blast(pt, dice, col);
    B.b3Blast = true; try { return _blast(pt, dice, col); } finally { if (B) B.b3Blast = false; } }; }
{ const _hurt = hurt;
  hurt = function(u, n, crit){
    if (!(b3On() && B && B.def && B.def.b3Spare && u && u.spare && u.hp > 0 && u.side === 'e')) return _hurt(u, n, crit);
    const how = u.b3Last; delete u.b3Last;
    if (u.hp - n > 0) return _hurt(u, n, crit);
    if (how === 'flat' && !B.b3Blast) { // down, alive, and dragged back into the dark by the people behind
      u.hp = 0; B.units = B.units.filter(x => x !== u); S.f.b3_c4_spared = (S.f.b3_c4_spared || 0) + 1;
      AUDIO.play('hurt'); sparks(u.x, u.y, 8, '#cfc8b8', .4); float(u, 'alive', '#cfc8b8');
      blog(`${u.name} goes down under the flat of a blade and stays down, alive. Hands from behind drag them back into the dark.`);
      updBattleUI(); return; }
    S.f.b3_c4_starvedDead = (S.f.b3_c4_starvedDead || 0) + 1; return _hurt(u, n, crit); }; }
{ const _checkEnd = checkEnd;
  checkEnd = function(){
    if (b3On() && B && !B.over && B.def && B.def.b3Spare) { const f = foes();
      if (f.length && f.every(x => x.spare)) { f.forEach(x => { x.hp = 0; }); B.units = B.units.filter(x => !f.includes(x)); S.f.b3_c4_sat = (S.f.b3_c4_sat || 0) + f.length;
        blog(`<em>With the priest's people down, the starving still on their feet stop where they are, and sit, one after another, as if somebody had cut a string.</em>`); } }
    return _checkEnd(); }; }
/* the brawl by the gap is fists and cudgels: nobody throws a munition at the Host's own (def.b3Fists) */
{ const _abOk = abOk;
  abOk = function(u, k){ const a = AB[k]; if (b3On() && B && B.def && B.def.b3Fists && a && (a.boom || (a.item && a.item !== 'salve'))) return false; return _abOk(u, k); }; }

/* the fights' tuning on Soldier and Bridgeburner, on top of the chapter's curve (31c BTUNE; checked with tools/balance.mjs) */
Object.assign(BTUNE, {b3_c4_hunt:{atk:2, dmg:2}, 'b3_c4_hunt:2':{hp:1.1, atk:1}, b3_c4_breakout:{hp:1.3, atk:2, dmg:1}, 'b3_c4_breakout:2':{hp:1.4, atk:3, dmg:1}, b3_c4_brawl:{hp:1.2, atk:2}});

/* ---- the reading at the first halt (60c) ---- */
B3DECK[4] = {scene:'b3_c4_prisoners', where:'a ration sack laid flat on the guards\' bank',
  set:'Dusk on the guards\' bank west of Capustan, with two hundred thousand people on the other side of a ditch and very few fires among them.',
  back:()=> S.f.b3_c4_drawn && S.card === 'b3c_kingchains' ? talk('b3_c4_chains') : startExplore(), backT:'Back to the line.',
  say:{tuft:`"Two hundred thousand people on the other side of that ditch," Tuft says, "and the Deck wants to talk about it." She doesn't shuffle the way she usually does, quick and showy. She does it slowly, like somebody counting. "One card, Sergeant. I'd rather know."`,
    sohra:`"The bones do not like this place," Sohra says. "Too many who have not been sung, and most of them are not even dead." She shakes the bones in her fist and doesn't look north. "Sit. Quietly. They are listening over there, and they have nothing else to do."`,
    benna:`"Prisoners," Old Benna says, "and marines minding them, and a laundress reading the Deck on a ration sack." She looks across the ditch and away again. "Hood's a comedian. Copper."`}};

/* the words this chapter adds to Book Three's glossary */
GLOSSX.moi.push(
  [4, 'The Gathering', 'The T\'lan Imass, called together somewhere out on the plain near Capustan. The Host knows only that there was dust on the horizon, and a cold night, and that the Rhivi child was not in the camp.', ()=>!!(S.f && S.f.b3_c4_gathering)],
  [4, 'The First Founders', 'The Barghast\'s oldest dead, their founding spirits, found under the floor of Capustan\'s council hall in great canoes. The White Face clans dug them up. The priests of the Mask Council were not consulted.', ()=>!!(S.f && S.f.b3_c4_founders)]);

const B3CH4 = {
  title:'The Prisoners', number:'Four',
  intro:{loc:'West of Capustan', sub:'Two days after the relief', scene:'b3_c4_prisoners', cap:'A plain filled to the horizon with people sitting down, a ditch and a stake line along its edge, and the guards\' fires on the near side.',
    paras:[
`Capustan is relieved. The Barghast went in first, and then the Bridgeburners, and then a black dragon came down out of the sky over the field and the Pannion army stopped being an army and became a great many frightened men running the wrong way. That was two days ago. The city still smokes.`,
`West of the walls, on the plain where the Barghast drove them, sit the Tenescowri: the Seer's peasant army, the starving he sent ahead of his legions. Two hundred thousand of them, give or take the ones who die each night. Everyone on the guards' bank knows what they did in the city. Nobody on the guards' bank says it in front of the children, and there are a great many children.`,
`You are Sergeant {sgt}, Fourth Squad, Seventh Company, Onearm's Host, and the Fourth has a stretch of the stake line from a dead tree to a ration cart. Your orders came down an hour ago in one sentence, and the sentence was Whiskeyjack's.`],
    go:'Walk the line', node:'b3_c4_start'},

  areas:[
    /* 16 x 12. . trodden earth  , ash  # the ditch and the stake line (a gap at the cart road)  = shelters  F fires  x the dead tree  c the ration cart  > the road east to Capustan */
    { id:'b3_c4_edge', title:'West of Capustan · the guards\' bank', sub:'Dusk · the prisoners across the ditch', hint:'Tap ground to move · tap a figure to talk · the road east goes into the city', decor:'b3_c4_camp',
      map:C4EDGE, walk:'.,', triggers:{c:'b3_c4_cart', '>':'b3_c4_to_city'}, start:{x:9, y:8},
      quest:()=> !S.f.b3_c4_order ? 'Whiskeyjack is walking the line.' : !S.f.b3_c4_city ? 'The Grey Swords\' guide waits in the city. The road east, when your stretch is walked.' : 'The road east, to Capustan.',
      npcs:[
        {id:'wj', name:'Whiskeyjack', kind:'wj', x:6, y:3, node:()=>S.f.b3_c4_order ? 'b3_c4_wj_again' : 'b3_c4_wj', fresh:()=>!S.f.b3_c4_order},
        {id:'mosk', name:'Corporal ' + C4.corporal, kind:'b2soldier', x:12, y:3, node:()=>'b3_c4_mosk', fresh:()=>!S.f.b3_c4_moskMet},
        {id:'sarn', name:C4.mother, kind:'tenescowri', x:7, y:1, node:()=>S.f.b3_c4_sarnMet ? 'b3_c4_sarn_again' : 'b3_c4_sarn', fresh:()=>!S.f.b3_c4_sarnMet},
        {id:'tibb', name:C4.boy, kind:'child', x:9, y:1, node:()=>S.f.b3_c4_sarnMet ? 'b3_c4_sarn_again' : 'b3_c4_sarn'},
        {id:'tav', name:'Tav', kind:'tav', x:2, y:4, node:()=>S.f.b3_c4_tav ? 'b3_c4_tav_again' : 'b3_c4_tav', show:()=>c4In('brisk'), fresh:()=>c4In('brisk') && !S.f.b3_c4_tav},
        {id:'rider', name:'A Rhivi rider', kind:'b3_rhivi_rider', x:14, y:8, node:()=>S.f.b3_c4_rider ? 'b3_c4_rider_again' : 'b3_c4_rider', fresh:()=>!S.f.b3_c4_rider} ] },

    /* 16 x 12. . paving  , rubble  # walls  D the Thrall's door  t temple steps  = awnings  w a well  c a cart  F a house still burning  < the road west */
    { id:'b3_c4_city', title:'Capustan · the Camps by the Thrall', sub:'Day · the city two days after', hint:'Tap ground to move · tap a figure to talk · the Thrall\'s door is north',  decor:'b3_c3_city',
      map:[ "################",
            "#...#..D...#..t#",
            "#.,.#......#..t#",
            "#...=..,...=...#",
            "#..............#",
            "<.....w....,...#",
            "<..,...........#",
            "#..c.....=.....#",
            "#.##.....,..##.#",
            "#.##..F.....##.#",
            "#,.......,.....#",
            "################" ],
      walk:'.,=', triggers:{D:'b3_c4_thrall', t:'b3_c4_healers', '<':'b3_c4_city_back'}, start:{x:2, y:5},
      quest:()=> !c4DannetDone() ? 'The Grey Swords\' barracks, for the guide.' : !S.f.b3_c4_ambrel ? 'The rope-sergeant in the barracks yard has something to say about the plain.' : 'The rope-sergeant. The company rides west at dusk.',
      npcs:[
        {id:'dannet', name:'Dannet', kind:'greysword', x:12, y:7, node:()=>c4DannetDone() ? 'b3_c4_dannet_again' : 'b3_c4_dannet', show:()=>!c4In('greysword') || !S.f.b3_c4_dannet, fresh:()=>!S.f.b3_c4_dannet},
        {id:'ambrel', name:C4.ropesgt, kind:'b3_greysword', x:14, y:10, node:()=>'b3_c4_ambrel', fresh:()=>!S.f.b3_c4_ambrel},
        {id:'recruits', name:'Recruits at drill', kind:'tenescowri', x:10, y:10, node:()=>'b3_c4_recruits', fresh:()=>!S.f.b3_c4_recruits},
        {id:'barghast', name:'A Barghast at the door', kind:'b3_barghast', x:8, y:2, node:()=>'b3_c4_thrall', fresh:()=>!S.f.b3_c4_thrall} ] },

    /* the guards' bank again, after dark: the cold, the howling, Mosk's lads, and the night the priest comes */
    { id:'b3_c4_night', title:'West of Capustan · the guards\' bank', sub:'Night · cold out of nowhere', hint:'Tap ground to move · tap a figure to talk · the fire, when you\'re ready', decor:'b3_c4_camp_night', dark:true,
      map:C4EDGE, walk:'.,', triggers:{F:'b3_c4_fire', c:'b3_c4_cart_night', '>':'b3_c4_road_night'}, start:{x:9, y:8},
      quest:()=> !S.f.b3_c4_mosk ? 'Corporal ' + C4.corporal + '\'s lads are by the gap, and they are not sleeping.' : 'The fire. Sleep, or pretend.',
      npcs:[
        {id:'nmosk', name:'Corporal ' + C4.corporal, kind:'b2soldier', x:10, y:3, node:()=>S.f.b3_c4_mosk ? 'b3_c4_mosk_after' : 'b3_c4_mosk_night', fresh:()=>!S.f.b3_c4_mosk},
        {id:'nsarn', name:C4.mother, kind:'tenescowri', x:7, y:1, node:()=>'b3_c4_sarn_night'} ] },

    /* dawn on the bank: Whiskeyjack walking the line, the people who came over the stakes, and the ration cart */
    { id:'b3_c4_dawn', title:'West of Capustan · the guards\' bank', sub:'Dawn · after the night', hint:'Tap ground to move · tap a figure to talk · the ration cart, when you\'re ready', decor:'b3_c4_camp',
      map:C4EDGE, walk:'.,', triggers:{c:'b3_c4_key', '>':'b3_c4_road_dawn'}, start:{x:9, y:8},
      quest:()=> !S.f.b3_c4_dawnWj ? 'Whiskeyjack is walking the line again.' : S.f.b3_c4_key ? 'Three days to the Catlin. The cart, when you\'re ready.' : 'The ration cart. The people who came over the stakes are sitting by it.',
      npcs:[
        {id:'dwj', name:'Whiskeyjack', kind:'wj', x:8, y:3, node:()=>S.f.b3_c4_dawnWj ? 'b3_c4_dawn_wj_again' : 'b3_c4_dawn_wj', fresh:()=>!S.f.b3_c4_dawnWj},
        {id:'dsarn', name:C4.mother, kind:'tenescowri', x:5, y:5, node:()=>'b3_c4_sarn_dawn', fresh:()=>!S.f.b3_c4_sarn},
        {id:'dtav', name:'Tav', kind:'tav', x:2, y:4, node:()=>'b3_c4_tav_dawn', show:()=>c4In('brisk'), fresh:()=>c4In('brisk') && !S.f.b3_c4_tavDawn},
        {id:'ddannet', name:'Dannet', kind:'greysword', x:10, y:6, node:()=>'b3_c4_dannet_dawn', show:()=>!c4In('greysword') && S.f.b3_dannetDone === 2} ] } ],

  battles:{
    /* the hunt: a K'ell Hunter in a gully west of the camp, at dusk, with the Grey Swords and their ropes */
    b3_c4_hunt:{title:'The gully mouth', style:'b3_c4_camp', open:true, warrenText:'Dusk on the plain · the warrens foul this near the Domin · Denul burns', warren:{denul:.9, meanas:.9}, music:'battle', hurtMost:true,
      map:[",.....,.","..,..,..","#......#","#..,...#","........","..,.....","........",".,....,.","........","..,..,.."],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      allies:[['b3_greysword',0,9],['b3_greysword',7,9]],
      aid:{kind:'b3_greysword', at:[3,6], need:8},
      foes:[['b3_khell',4,1]], xp:160, after:'b3_c4_hunt_after',
      objective:{type:'survive', rounds:3, text:'Hold it in the open for three rounds, until the ropes are on.'},
      preText:()=>`The sharper goes off under its feet and it does not fall down. It does not even seem to notice. But the ground it was standing on is not there any more, and for a moment it has to think about where to put a foot, and the Grey Swords spread out with the ropes while it thinks.`,
      stage2:{title:'Down in the gully', xp:100,
        text:()=>`The hooks go round its legs on the third throw and every hand on every rope pulls the same way at the same moment, the way ${C4.ropesgt} drilled it, and the thing goes over the lip of the gully and down, and the Grey Swords stay up on the bank with every rope taut, all of them, because a rope you let go of is a rope it can use. Somebody has to go down to it. That is what the Host lent them a squad for.

It is on one knee at the bottom, in the stones, with a rope round each leg and one round the long tail, and it is still trying to get up. It is still swinging. ${c4In('greysword') ? `"Now," Dannet says. "While it is held. It will not stay held."` : `"Now," ${C4.ropesgt} shouts from the top of the bank. "While it is held."`}`,
        map:["##....##","#......#","#.,....#","##....##","#......#","#..,...#","##....##","#......#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,7],[4,7]],
        foes:[['b3_c4_roped',3,1]]} },
    /* the breakout: the priest drives his zealots and a crowd of the starving at the Fourth's stretch of the stakes */
    b3_c4_breakout:{title:'The stake line', style:'b3_c4_camp_night', dark:true, b3Spare:true, warrenText:'Night · the warrens foul this near the Domin · Denul burns', warren:{denul:.9, meanas:.9}, music:'battle',
      map:[".,..,..,","..,.....",",......,","##..##.#","........",".,....,.","........","..,....,","........",".,....,."],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      get allies(){ return c4In('brisk') ? [['b3_c4_tav',1,7]] : []; },
      aid:{kind:'b3_rhivi_rider', at:[6,7], need:9},
      foes:[['b3_c4_zealot',1,1],['b3_c4_zealot',5,0],['b3_c4_zealot',6,2],['b3_c4_starving',2,2],['b3_c4_starving',3,1],['b3_c4_starving',4,2],['b3_c4_starving',0,2]], xp:170, after:'b3_c4_after_breakout',
      waves:[{round:2, foes:[['b3_c4_starving',6,0],['b3_c4_starving',1,0],['b3_c4_zealot',3,0]], text:'More of them come over the ditch behind the first, some pushed, some climbing, a zealot with a sickle among them shouting the Seer\'s name.'}],
      preText:()=>`Kettle's sharper lands among the ochre brow-bands where she meant it to. The ochre brow-bands are not the only people standing there.`,
      stage2:{title:'Among the shelters', xp:100,
        text:()=>`The stake line holds. The ones who came over it are down, or sitting, or crawling back across the ditch the way they came, and the priest is not among any of them. He is back in the shelters, thirty paces in, with his own people round him, shouting at the dark to try again.

The gap at the cart road is open. ${c4In('brisk') ? `Brisk looks at it, and at you. "In after him," she says. "Or he does this again tomorrow night."` : `In after him, or he does this again tomorrow night.`}${c4In('ohl') ? ` Ohl, behind you: "Mind where you put your feet in there. They are lying down, most of them. They are not all asleep."` : ''}`,
        map:[".,..,...","..,..,..","...,....",".#....#.","........","..,..,..","#......#","........","........",".,....,."],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c4_priest',4,0],['b3_c4_zealot',1,1],['b3_c4_zealot',6,1],['b3_c4_starving',3,2],['b3_c4_starving',5,3],['b3_c4_starving',2,4]],
        waves:[{round:2, foes:[['b3_c4_zealot',0,0],['b3_c4_starving',7,2]], text:'Another brow-band comes out of a shelter with a stake pulled from the line, and a woman behind him who has nothing in her hands at all.'}]} },
    /* Mosk's lads, by the gap, with cudgels: fists and the flat of things */
    b3_c4_brawl:{title:'By the gap', style:'b3_c4_camp_night', dark:true, b3Fists:true, warrenText:'Night · fists and cudgels · nobody throws anything at the Host\'s own', warren:{denul:.9, meanas:.9}, music:'battle',
      map:["........","..,.....","........","###..###","........",".,......","........","......,.","........","..,....."],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c4_mosk',3,1],['b3_c4_lad',1,1],['b3_c4_lad',5,1],['b3_c4_lad',4,2]], xp:60, after:'b3_c4_after_brawl'} },

  foes:{
    /* the Seer's people among the starving: a priest better fed than the people round him, and the zealots he has found */
    b3_c4_priest:{name:'The Seer\'s priest', sig:'P', kind:'b3_c4_priest', hp:34, ac:12, atk:4, dmg:[1,6,2], rng:4, mv:4, init:2, boss:true, sk:['daze','rally'], verb:'calls the Seer\'s hunger down on'},
    b3_c4_zealot:{name:'Zealot', sig:'z', kind:'b3_c4_zealot', hp:15, ac:12, atk:4, dmg:[1,6,2], rng:1, mv:4, init:1, sk:['bleed'], verb:'swings a sickle at'},
    /* the starving the priest drives at the stakes: not the enemy (the breakout spares them: def.b3Spare) */
    b3_c4_starving:{name:'Starving Tenescowri', sig:'t', kind:'tenescowri', hp:6, ac:9, atk:1, dmg:[1,3,0], rng:1, mv:4, init:0, spare:true, verb:'claws at'},
    /* the K'ell Hunter, roped and down in the gully (the first ground is the engine's b3_khell) */
    b3_c4_roped:{name:'K\'ell Hunter, roped', sig:'K', kind:'khell', hp:40, attacks:2, ac:12, atk:5, dmg:[2,6,2], rng:1, mv:2, init:2, boss:true, verb:'scythes a blade-arm through'},
    /* Corporal Mosk and his lads, of the Ninth Company: fists and cudgels */
    b3_c4_mosk:{name:'Corporal ' + C4.corporal, sig:'M', kind:'b2soldier', hp:18, ac:13, atk:4, dmg:[1,4,2], rng:1, mv:4, init:1, sk:['shove'], verb:'swings a fist like a mallet at'},
    b3_c4_lad:{name:'One of ' + C4.corporal + '\'s lads', sig:'l', kind:'b2soldier', hp:12, ac:12, atk:3, dmg:[1,4,1], rng:1, mv:4, init:1, verb:'swings a cudgel at'},
    /* Tav, beside his sister at the stake line (an ally while Brisk is with the Fourth) */
    b3_c4_tav:{name:'Tav', sig:'T', kind:'tav', hp:26, ac:15, atk:5, dmg:[1,8,2], rng:1, mv:4, init:1, verb:'brings a heavy-infantry blade round on'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b3_c4_ropehooks:{name:'Grey Sword rope-and-hooks', slot:'trinket', who:null, atk:1, line:'A coil of grey rope with two iron hooks back to back at the end of it and a strip of grey cloth at the knot. The Grey Swords gave it after the gully. Whoever carries it throws the Wolves\' Rope one pace further.'},
    b3_c4_flint:{name:'T\'lan Imass flint blade', slot:'weapon', who:['sgt', 'brisk', 'greysword', 'kettle', 'ohl'], atk:1, line:'A long flint blade, knapped to an edge you could shave with, on a haft of antler bound in hide gone to dust. It was lying where something had stood and watched, and was not there before. It goes cold near the K\'Chain Che\'Malle: +3 damage against them.'},
    b3_c4_token:{name:'Capan temple token', slot:'trinket', who:null, stat:{wits:1}, line:'A worn bronze disc on a knotted cord, stamped with a domed temple and a ring of marks, green in the hollows. Burn\'s, the old healer said: the Sleeping Goddess, whose blood runs in every warren, and something in it now. "Somebody should still pray to her," she said.'} },

  scenes:{
    b3_c4_prisoners:{loc:'West of Capustan', sub:'The prisoners · dusk', cap:'The plain filled to the horizon with people sitting down, a few thin fires among them, and the guards\' fires all along the near edge like a line drawn under a sum.', amb:'explore'},
    b3_c4_gathering:{loc:'West of Capustan', sub:'The plain · a cold sky', cap:'Frost on the grass where there should be none, a white sky, and on the horizon a wall of dust standing up with no wind to raise it.', amb:'explore'},
    b3_c4_founders:{loc:'Capustan', sub:'The Thrall · the floor torn up', cap:'Flagstones heaved and stacked against the walls, and in the pit beneath them, by torchlight, great black canoes laid side by side, and in the canoes, bones too big to be anyone\'s.', amb:'explore'} },

  end:{
    share:['The squad\'s own bread', 'Two hundred thousand starving people sat on the plain west of Capustan, and the Host was told nobody touches them. A priest drove some of them at the Fourth\'s stretch of the stakes one night, and the Fourth held it and tried to sort the starving from the priest\'s people in the dark. In the morning the Fourth emptied its own sacks and its own salve jars into the hands of the children and the sick who had come over the stakes. Whiskeyjack saw it, at the end of the line, and said nothing, which is how he says the other thing.'],
    hold:['Kept for the road', 'Two hundred thousand starving people sat on the plain west of Capustan, and the Host was told nobody touches them. A priest drove some of them at the Fourth\'s stretch of the stakes one night, and the Fourth held it and tried to sort the starving from the priest\'s people in the dark. In the morning the Fourth kept its sacks and its salve for the march south, because the Domin is stripped bare and somebody has to be able to fight in it. It was the right sum. Nobody in the squad has said so out loud.'] },
  endScene:'b3_c4_gathering',
  endCap:()=> S.f.b3_c4_key === 'share' ? 'Dawn on the guards\' bank. A boy asleep against the ration cart with the squad\'s last bread in his fist, and the frost going off the grass.' : 'Dawn on the guards\' bank. The squad\'s sacks are full and tied, and nobody is looking at them.',
  tease:'Next: the Catlin. The armies cross to the south shore and march into the Domin, a land stripped bare ahead of them, and a tall man in a fur-collared cloak starts telling Brood what the Malazans really want.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b3_c4_key === 'share') x.push('The Fourth gave its own rations and salves to the children and the sick who came over the stakes. Whiskeyjack noticed.');
    if (f.b3_c4_key === 'hold') x.push('The Fourth kept its supplies for the march south. The Domin is stripped bare. It was the sum the quartermaster would have done.');
    if (f.b3_c4_broke) x.push(c4Dead() ? `On the night of the breakout ${c4Back(false)} from the Fourth's stretch, and ${numw(c4Dead())} did not.` : `On the night of the breakout not one of the starving died on the Fourth's stretch. ${c4Back()}.`);
    if (f.b3_c4_mosk === 'talked') x.push(`Corporal ${C4.corporal}'s lads meant to go over the stakes with cudgels. Whiskeyjack's order, said once, in the right voice, sent them back to their fire.`);
    if (f.b3_c4_mosk === 'fought') x.push(`Corporal ${C4.corporal}'s lads meant to go over the stakes with cudgels. The Fourth put them on the ground first. Nobody reported it. Everybody knows.`);
    if (f.b3_c4_mosk === 'let') x.push(`The Fourth let Corporal ${C4.corporal}'s lads go over the stakes. A Rhivi patrol brought them back. Nobody asked what happened on the other side.`);
    if (f.b3_dannetDone === 1) x.push('Dannet, a Grey Sword acolyte, walks with the Fourth as the company\'s guide into the Domin.');
    if (f.b3_dannetDone === 2) x.push('Dannet, the Grey Swords\' guide, marches with her own company for now. There is no room in the Fourth. Send for her at any halt.');
    if (f.b3_c4_hunted) x.push('The Fourth helped the Grey Swords pull a K\'ell Hunter down into a gully with ropes, and kill it there. It did not want to stay dead.');
    if (f.b3_c4_flint) x.push('A flint blade was lying in the dust where something had stood and watched the gully. It is in the Fourth\'s kit now. Tuft will not touch it.');
    if (f.b3_c4_flint === 'left') x.push('A flint blade was lying in the dust where something had stood and watched the gully. The Fourth left it there.');
    if (f.b3_c4_gathering) x.push('On a cold night the Rhivi child was not in the camp. Out on the plain the dust stood up with no wind under it, and something howled that was not a wolf.');
    if (f.b3_c4_founders === 'seen') x.push('The Barghast tore up the floor of Capustan\'s council hall and found their First Founders under it, in canoes. The Fourth saw the bones.');
    if (f.b3_c4_sarn === 'grey') x.push(`${C4.mother}, a Domin farmer's widow from the other side of the ditch, has shorn her hair and gone into the Grey Swords. Her boy ${C4.boy} carries water for the company.`);
    if (f.b3_c4_sarn === 'camp') x.push(`${C4.mother} and her boy are still on the other side of the ditch. The Fourth knows which shelter.`);
    if (f.b3_c4_ohlBurnt) x.push('Ohl reached into Denul for a sick boy on the wrong side of the stakes, and the warren bit him. He has written that down, and underlined it.');
    if (f.b3_c4_tav) x.push('Tav passed his bread through the stakes to a ring of children and sang to them, badly. Brisk stood at the edge of the light.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b3_c4_key === 'share' && `The squad's own bread and salves went to the children and the sick at the ration cart. Whiskeyjack saw it from the end of the line.`,
    f.b3_c4_key === 'hold' && `The squad kept its supplies for the march south. The Domin is stripped bare, and there are three days to the Catlin.`,
    f.b3_c4_broke && `A priest of the Seer drove his people and the starving at the Fourth's stretch of the stakes. The Fourth held it, and sorted the one from the other as best it could in the dark.`,
    f.b3_c4_heart && `On the night of the breakout something huge came down out of the sky over the heart of the prisoners' camp. In the morning the word was that Anaster, the First Child, was taken, and the women who guarded him were dead, and Whiskeyjack had been there.`,
    f.b3_c4_gathering && `The child went out of the camp with the fat Daru and two Host marines, two women. That night was cold out of nowhere, and the dust stood up on the horizon.`,
    f.b3_c4_hunted && `The Grey Swords pulled a K'ell Hunter down into a gully with ropes, and the Fourth helped kill it. Something dust-grey watched from a rise, and was gone.`,
    f.b3_c4_dannet && `Dannet, a Capan second daughter and a Grey Sword acolyte, is lent to the Malazans as a guide into the Domin.`,
    f.b3_c4_founders && `The Barghast tore up the floor of the Thrall and found their First Founders in nine great canoes.`,
    f.b3_c4_order && `Whiskeyjack's order: nobody goes over the stakes, nobody takes anything from the other side of them, nobody touches the Tenescowri except to feed them or bury them.`,
    `Two hundred thousand Tenescowri are held on the plain west of Capustan, behind a ditch and a stake line.`].filter(Boolean); },

  dlg:{
    /* ---- the first halt: the Fourth's fire on the guards' bank ---- */
    b3_c4_start:()=>({sp:'The guards\' bank', scene:'b3_c4_prisoners', fx:()=>{ S.f.b3_c4_started = 1; S.f.b3_capustan = 1; S.f.b3_greyswords = 1; S.f.b3_domin = 1; }, txt:
`The Fourth's stretch: a hundred paces of ditch with sharpened stakes along the far lip, slanting outward, a cord strung along them with rags tied on it every few paces so you can see the line in the dark. A dead tree at one end with its bark stripped as high as a man can reach. A ration cart at the other. A fire in the middle, which is yours.

On the far side of the ditch, sitting down, as far as the eye goes, the Tenescowri. Most of them are not doing anything. That is the first thing you notice and the thing you go on noticing: two hundred thousand people, and almost none of them moving. Some are lying down. A few are walking, slowly, nowhere. Here and there a shelter of sticks and rags. Very few fires.

${c4In('brisk') ? `Brisk has her shield on her back and is counting the ration sacks on the cart with her lips moving, the way she counts everything. ` : ''}${c4In('kettle') ? `Kettle is sitting on the satchel, for once not opening it. ` : ''}${c4In('tuft') ? `Tuft is looking north across the ditch and not at anything in particular, which is how Tuft looks at things she does not want to be caught looking at. ` : ''}${c4In('ohl') ? `Ohl has his sleeves rolled up already, and nothing to do with his hands.` : ''}`,
      ch:[b3DeckChoice(4),
          {t:'"Ohl. How bad is it over there?"', req:()=>c4In('ohl') && !S.f.b3_c4_askOhl, fx:()=>{ S.f.b3_c4_askOhl = 1; }, go:'b3_c4_start_ohl'},
          {t:'"Brisk. What have we got?"', req:()=>c4In('brisk') && !S.f.b3_c4_askBrisk, fx:()=>{ S.f.b3_c4_askBrisk = 1; }, go:'b3_c4_start_brisk'},
          {t:'Walk the stretch.', go:()=>startExplore()}]}),
    b3_c4_start_ohl:()=>({sp:'Ohl', scene:'b3_c4_prisoners', txt:
`"Bad." He doesn't look away from the ditch. "The flux, mostly. Fevers. Feet. Old wounds nobody has looked at since the spring. And under all of it, the hunger, which is not a sickness, so I am told I cannot treat it." He says *told* the way other people say a curse. "They have been walking north on nothing for a month, child. Some of them for longer. A body eats itself, after a while. It starts with the parts it thinks it can spare."

He rubs his thumb across his fingers. "The Host has a tent at the gap. Brood's people have another. The Rhivi sing over the ones who are going and the ones who will go. The warrens down here taste of rust, the Capan healers say, and I believe them. I have not reached in yet." A pause. "I am going to. I wanted you to know, so you would not be surprised when I come back bleeding."`,
      ch:[{t:'"Brisk. What have we got?"', req:()=>c4In('brisk') && !S.f.b3_c4_askBrisk, fx:()=>{ S.f.b3_c4_askBrisk = 1; }, go:'b3_c4_start_brisk'},
          {t:'"Don\'t come back bleeding."', go:()=>startExplore()},
          {t:'Walk the stretch.', go:()=>startExplore()}]}),
    b3_c4_start_brisk:()=>({sp:'Brisk', scene:'b3_c4_prisoners', txt:
`"Six days' bread for six${c4In('kettle') ? ', if nobody eats like Kettle' : ''}." Brisk doesn't look up from the sacks. "Two salve jars. Dried meat from the Rhivi, which tastes of the horse it came off. The Host feeds us at the big fires twice a day. The cart's not ours. The cart goes over the ditch at dawn and comes back empty."

She ties the sack off. "A handful a head, over there. Meal and Rhivi meat, when the carts come. The quartermaster says the Host's short. Brood's short. Everyone's short." She looks north, once, the length of a breath. "I counted the children by the ditch on our stretch. I stopped."`,
      ch:[{t:'"Ohl. How bad is it over there?"', req:()=>c4In('ohl') && !S.f.b3_c4_askOhl, fx:()=>{ S.f.b3_c4_askOhl = 1; }, go:'b3_c4_start_ohl'},
          {t:'Walk the stretch.', go:()=>startExplore()}]}),
    /* the reading (60c) */
    b3_c4_deck:()=>b3DeckOffer(4),
    b3_c4_card:()=>b3DeckCard(4),
    /* after the reading, if the House of Chains came up: a new House in the Deck */
    b3_c4_chains:()=>({sp:b3Rd().id === 'tuft' ? 'Tuft' : b3Rd().name, scene:'b3_c4_prisoners', txt: b3Rd().id === 'tuft' ?
`She doesn't put the Deck away. She sits with the card face up on the sack in front of her and her hands flat on her knees, the way you sit when you are trying not to touch something.

"I learned the Deck from a woman on the cadre staff when I was ten," she says. "She said it was the oldest thing in the world that still talks. She said the Houses don't change. Cards come and go, the Unaligned wander, but the Houses are the Houses." She looks at the chains running off the edge of the card. "Somebody's put a new one in. And it's *bound*. The King's bound to his own throne, and he's not resting, and he's not asleep."

${c4In('ohl') ? `Ohl, from the far side of the fire, very gently: "What does it mean, girl?"

"I don't know." It is the first time you have heard her say that about a card. "I know who'd know." She doesn't say who. She looks south-east, toward the Rhivi fires, where a child in red wool is not sitting tonight.` : `Nobody asks her what it means. She looks south-east, toward the Rhivi fires, where a child in red wool is not sitting tonight, and does not say who would know.`}` :
`${b3Rd().id === 'sohra' ? `Sohra sweeps the bones up quickly and ties them in their bag and ties the bag twice. "That one ran south," she says. "The line ran off the hide and kept going. The herds would run from it." She looks at the ditch. "They walked toward it. All of them. For a month."` : `Old Benna turns the card over and back and puts it in her apron by itself, the way you would put away a coin you think may be bad. "Thirty years," she says again. "New House." She looks north across the ditch at two hundred thousand people sitting down. "Chained ones. Fits the week."`}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* ---- Whiskeyjack walks the line ---- */
    b3_c4_wj:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c4_order = 1; S.f.b3_legSeen = 1; }, txt:
`He comes along the bank on foot with a runner two paces behind, and he is walking the way a man walks when he has decided, this morning, not to limp. It almost works. The leg goes stiff on the downslope by the dead tree, and he lets it, and goes on.

He stops at your fire. Grey eyes, grey stubble, the sword at his hip that he does not touch. "Sergeant."

"Sir."

"You've got this stretch till we march." He looks across the ditch while he talks, not at you. "Some in the Host think the Tenescowri want thinning before we go south. Some of Brood's think so too. They're wrong. Nobody goes over the stakes. Nobody takes anything from the other side of them. Nobody touches them except to feed them or bury them. Anyone tells you different, send them to me."

From the next fire along, a voice, not loud: "They ate the city, sir."

Whiskeyjack doesn't turn round. "They were told to," he says, "by a man who isn't here. We'll get to him."`,
      ch:[{t:'"Understood, sir."', go:'b3_c4_wj2'},
          c4LegCh(),
          {t:'"And when they\'re hungry enough to come over anyway?"', req:()=>!S.f.b3_c4_wjHow, fx:()=>{ S.f.b3_c4_wjHow = 1; }, go:'b3_c4_wj_how'}]}),
    b3_c4_wj_how:()=>({sp:'Whiskeyjack', txt:
`He thinks about it. He is the only officer you have ever known who thinks about a question before he answers it in front of the men.

"Then you stop them," he says. "Shields, not blades, if you can. Blades if you can't. And you find out who sent them, because it won't have been their idea. These people haven't had an idea of their own since the spring." He looks at the ditch. "The Seer's priests are in there somewhere. Some of them took the brow-band off and sat down with the rest. Not all."`,
      ch:[{t:'"Understood, sir."', go:'b3_c4_wj2'},
          c4LegCh()]}),
    b3_c4_wj_leg:()=>({sp:'Whiskeyjack', txt:
`${c4In('ohl') ? `Ohl is already on his feet. "Five days, sir. Flat. I could make a start on it tonight."` : `You say it. The runner behind him looks at the ground, very carefully.`}

Whiskeyjack looks down at his own leg as if it belonged to someone he had been asked to keep an eye on. "Mallet wants a week," he says. "Mallet's wanted a week since Darujhistan." He shifts his weight onto it, deliberately, and it holds, and you watch what holding costs him and he watches you watch.

"${c4In('ohl') ? 'Your healer' : 'Every healer in the Host'} has two hundred thousand patients this week, Sergeant. I'll wait my turn." It is very nearly a joke. It is the nearest he comes.`,
      ch:[{t:'"Sir."', go:'b3_c4_wj2'}]}),
    b3_c4_wj2:()=>({sp:'Whiskeyjack', txt:
`"One more thing." He nods east, toward the walls and the smoke. "The Grey Swords are lending us a guide for the Domin. One of their acolytes, a Capan, knows the roads south. Go and collect her from their barracks in the Camps when you've walked your stretch. Be civil. They've had a bad month, and their god's gone, and they're polite about it, which is worse."

He goes on along the bank toward the next fire, and the next. At the dead tree he stops and puts a hand on it, as if to see whether it was still standing, and then goes on.${c4In('brisk') ? `

Brisk watches him all the way down the line. "He's not going to give it the week," she says. "Is he."

It isn't a question. You don't answer it.` : ''}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b3_c4_wj_again:()=>({sp:'Whiskeyjack', txt:
`He is three fires down now, talking to a sergeant of the Ninth, and the sergeant of the Ninth is standing very straight. He doesn't look your way. He has said what he came to say, and he does not say things twice.`,
      ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),

    /* ---- Corporal Mosk, of the Ninth: the soldiers who would rather the order were different ---- */
    b3_c4_mosk:()=>({sp:'Corporal ' + C4.corporal + ' · Ninth Company', fx:()=>{ S.f.b3_c4_moskMet = 1; }, txt:
`A heavy-infantry corporal on an upturned bucket, with three of his lads squatting round a fire that is better than yours. A face like a shut door. He is watching the gap at the cart road the way a dog watches a gate.

"Sergeant." He doesn't get up. "You heard him."

"I heard him."

"I walked through that city yesterday. Went in with the burial details." He doesn't go on. One of his lads looks at the fire. Another spits, carefully, to one side. "The palace," ${C4.corporal} says at last, and stops again, and that is the whole of what he is going to say about the palace.

"I heard him too," he says. "I heard him fine."`,
      ch:[{t:'"Then we\'ve all heard him."', go:'b3_c4_mosk2'},
          {t:'Leave him to his bucket.', go:()=>startExplore()}]}),
    b3_c4_mosk2:()=>({sp:'Corporal ' + C4.corporal, txt:
`"We have." He looks at you for the first time, a long flat look. "And they're sitting over there on their arses being fed meal out of our carts while my lads go on half rations to Coral. That's an order too. Nobody's said it out loud but it's an order."

He looks back at the gap. "Some nights," he says, "a man can't sleep."

${c4In('brisk') ? `Brisk, behind you, in her regiment voice, which she uses about once a season: "Then he can lie awake, Corporal. Same as the rest of us."

${C4.corporal} grins without anything in it. "Heavy," he says. "I can hear it." ` : ''}You know exactly what he means. So does he.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* ---- Sarn and her boy, at the gap ---- */
    b3_c4_sarn:()=>({sp:C4.mother + ' · from the other side of the ditch', fx:()=>{ S.f.b3_c4_sarnMet = 1; }, txt:
`At the gap where the cart road goes through the stake line, a woman is sitting on the far side of the ditch with a boy across her knees. She is somewhere past forty, or looks it, which down here may mean thirty. Her hair is cropped close and badly, as if with a knife. The boy is eight or so. He is very hot to look at and very still.

She sees your uniform and doesn't flinch, which is worse than if she had. "Malazan," she says, in a Daru you can follow. "My name is ${C4.mother}. This is ${C4.boy}." She says it like somebody filling in a ledger. "He has the flux. He has had it nine days. I have nothing to give him."

She doesn't ask for anything. She only tells you, so it will have been told.`,
      ch:[{t:'"Ohl."', req:()=>c4In('ohl'), go:'b3_c4_sarn_ohl'},
          {t:'Sohra sings over the boy.', req:()=>c4In('sohra') && !S.f.b3_c4_sung, fx:()=>{ S.f.b3_c4_sung = 1; S.f.b3_c4_tibb = 'sung'; ally(0, -1, 'A song at the gap'); }, go:'b3_c4_sarn_song'},
          {t:'Pass the squad\'s bread through the stakes.', req:()=>!S.f.b3_c4_bread, fx:()=>{ S.f.b3_c4_bread = 1; ally(1, 0, 'The Rhivi on the outer line saw'); if (c4In('brisk')) loy('brisk', 1); }, go:'b3_c4_sarn_bread'},
          {t:'"Where are you from?"', req:()=>!S.f.b3_c4_sarnFrom, fx:()=>{ S.f.b3_c4_sarnFrom = 1; }, go:'b3_c4_sarn_from'},
          {t:'Leave her be.', go:()=>startExplore()}]}),
    b3_c4_sarn_ohl:()=>({sp:'Ohl', fx:()=>{ S.f.b3_c4_ohlBurnt = 1; S.f.b3_c4_tibb = 'ohl'; loy('ohl', 1); }, txt:
`Ohl gets down on his knees in the dirt on your side of the ditch, slowly, knees first, and puts his arm through the stakes, and ${C4.mother} lets him put his hand on the boy's belly. He closes his eyes. He says something in Ehrlii that is the beginning of a prayer and the middle of an argument.

You see the moment Denul comes up, because his face changes, and you see the moment something in it bites, because it changes again. His nose starts to bleed. He doesn't take his hand away.

When he does, the boy is still hot, and still very still, but he is breathing slower and deeper, the way a child breathes when he is asleep and not when he is something else.

Ohl sits back on his heels and wipes his lip with his thumb and looks at the blood on it. "Rust," he says. "Like the Capans said. There is something in the warren down here, and it has teeth, and it does not like being reached past." He looks at the boy. "It let me past. This time." He writes something in the oilcloth before he gets up. He doesn't say what.`,
      ch:[{t:'"Sit a while, Ohl."', go:()=>startExplore()},
          {t:'Back to the stretch.', go:()=>startExplore()}]}),
    b3_c4_sarn_song:()=>({sp:'Sohra', txt:
`Sohra crouches at the lip of the ditch and sings to the boy across it. Not loud. It is the song the Rhivi sing over the herd's calves in a hard winter, she says afterwards, and she does not know if it works on people, and she has decided that is not her business.

${C4.mother} doesn't understand a word of it. She listens to all of it anyway, with her hand on the boy's hair. When it is done she says something in her own tongue that Sohra doesn't understand either, and Sohra nods as if she had.

"The grass is listening," Sohra says, getting up. "Over there too. I was not sure it would be." She doesn't look back at the shelters. "It is listening very hard. It has a great deal to listen to."`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b3_c4_sarn_bread:()=>({sp:C4.mother, txt:
`A day's bread for six goes through the stakes in four pieces. ${c4In('brisk') ? `Brisk hands it over herself, without being asked, and writes it in the ration ledger afterward without being asked either: *One day. Gap. Not lost.*` : `You hand it over yourself.`}

${C4.mother} breaks the first piece into smaller pieces, and the smaller pieces into crumbs, and wets them from a cup, and feeds the boy a crumb at a time. She doesn't eat any. She doesn't thank you. She puts the rest inside her shirt against her skin, where nobody will see it in the night, and looks at you the way you would look at a door that had opened when you had not knocked.

Two hundred paces down the outer line, a Rhivi rider has stopped his horse to watch.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b3_c4_sarn_from:()=>({sp:C4.mother, txt:
`"A village south of the Catlin. Nine days' walk south. It isn't there now." She says it without any weight at all. "The priests came in the winter and said the Seer would feed the faithful. They said the hungry walk north, and are fed. We were hungry. We walked." She looks at the boy. "My husband walked with us as far as the river."

She doesn't say what they ate on the road north. You don't ask. She sees you not asking, and something in her face goes very tired, as if that were a courtesy she had stopped expecting from anyone.

"They told us the Seer would feed us," she says again. "He did not say with what."`,
      ch:[{t:'"Ohl."', req:()=>c4In('ohl') && !S.f.b3_c4_ohlBurnt, go:'b3_c4_sarn_ohl'},
          {t:'Back to the stretch.', go:()=>startExplore()}]}),
    b3_c4_sarn_again:()=>({sp:C4.mother, txt:
`${C4.mother} is where she was, with the boy across her knees. ${S.f.b3_c4_tibb ? `He is sleeping. She is not.` : `He is very still. So is she.`} She nods to you once, the way you nod to a neighbour.`,
      ch:[{t:'"Ohl."', req:()=>c4In('ohl') && !S.f.b3_c4_ohlBurnt, go:'b3_c4_sarn_ohl'},
          {t:'Pass the squad\'s bread through the stakes.', req:()=>!S.f.b3_c4_bread, fx:()=>{ S.f.b3_c4_bread = 1; ally(1, 0, 'The Rhivi on the outer line saw'); if (c4In('brisk')) loy('brisk', 1); }, go:'b3_c4_sarn_bread'},
          {t:'Leave her be.', go:()=>startExplore()}]}),

    /* ---- Tav, at the Fourth Regiment's fire ---- */
    b3_c4_tav:()=>({sp:'Tav · Fourth Regiment', fx:()=>{ S.f.b3_c4_tav = 1; S.f.b3_tav = 1; }, txt:
`The Fourth Regiment has the next stretch west, and at its nearest fire a big man is sitting on the lip of the ditch with his legs over the edge and a hunk of bread in his fist, passing it through the stakes a piece at a time to a ring of children on the far side. He is singing to them. It is a Cawn barge song, the one about the bargemaster's wife, and he is singing it very badly, and the children are watching his face, not the bread.

Tav. He can't sing. He has never been able to sing. He has never once let that stop him.

He sees Brisk and doesn't stop singing. He finishes the verse, because you finish the verse, and gives the last piece to the smallest one, and only then looks up. "Bris."

"Tav." Brisk stands at the edge of his firelight the way she always does. "${C4.corporal}'s lot are watching you."

"Let 'em." He wipes his hands on his knees. "${c4Shut() ? `Still sealed?` : `You came for your four coppers.`}"

"${c4Shut() ? `Still breathing?` : `I came for my four coppers.`}"

"${c4Shut() ? `So far.` : `Not paying.`}" He grins at her, enormous, and she nearly grins back, and catches it in time.`,
      ch:[{t:'"Your bread, corporal. You\'ll be short at Coral."', go:'b3_c4_tav2'},
          {t:'Leave them to it.', fx:()=>{ loy('brisk', 1); }, go:()=>startExplore()}]}),
    b3_c4_tav2:()=>({sp:'Tav', txt:
`"I'll be short at Coral anyway." He shrugs, a big slow shrug. "We grew up on the Cawn wharves, Sergeant, the two of us. There were winters." He looks at the children, who have not gone away. "When you're that hungry somebody tells you what to do and you do it. You'd eat the boards off the quay if somebody told you it was bread. They're people. Hungry ones. I've been hungry." He looks at his sister. "So's she."

Brisk says nothing at all for a long moment. Then she takes the heel of bread out of her own kit, the end she keeps for the march, and hands it to her brother, and he passes it through the stakes without a word, and the smallest one gets it again.

"Don't stand in front of things," Brisk says to him, apropos of nothing.

"You first," says Tav, and starts the next verse.`,
      ch:[{t:'Back to the stretch.', fx:()=>{ loy('brisk', 1); }, go:()=>startExplore()}]}),
    b3_c4_tav_again:()=>({sp:'Tav', txt:
`Tav is on the next verse, or the one after. The children have started to join in on the bargemaster's name, which is the only word of it any of them know. They sing it better than he does.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* ---- a Rhivi rider on the outer line ---- */
    b3_c4_rider:()=>({sp:'A Rhivi rider · the outer line', fx:()=>{ S.f.b3_c4_rider = 1; }, txt:
`The Rhivi ride the outer line, on the far side of the prisoners' camp and along its ends, on horses as tired as the people they are watching. This one has stopped at the end of your stretch and is sitting his saddle looking at the Malazans on the bank. ${c4In('sohra') ? `He is about Sohra's age. He says something to Sohra in Rhivi, and she answers him, short, and he laughs, and then doesn't.` : ''}

"Malazan." His Daru is good. "Ten years ago your people burned my mother's summer grass. Now you feed the people who would have eaten my mother." He nods at the ditch. "Explain it."`,
      ch:[{t:'"Whiskeyjack\'s order."', go:'b3_c4_rider_order'},
          {t:'"They were told to, by a man who isn\'t here. We\'re going to him."', fx:()=>{ ally(1, 0, 'A Rhivi rider on the outer line'); }, go:'b3_c4_rider_ok'},
          {t:'"I can\'t."', fx:()=>{ ally(1, 0, 'A Rhivi rider on the outer line'); }, go:'b3_c4_rider_cant'}]}),
    b3_c4_rider_order:()=>({sp:'The Rhivi rider', txt:
`"The one-legged one." He nods slowly. "The Rhivi say he struck the tall man in the fur collar at Pale, for the child's sake." He looks at the Malazans on the bank, and at the ditch, and back. "Orders," he says. "Good. Orders end. I will come back and ask you when they do." He turns his horse and goes on along the line.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b3_c4_rider_ok:()=>({sp:'The Rhivi rider', txt:
`He thinks about it, the way the Rhivi think about weather. "The Seer," he says. "In Coral." He looks at the ditch for a long time. "The herds do not hate the wolf's leavings. They hate the wolf." Then, unexpectedly, he leans down from the saddle and touches two fingers to the stakes, the way you would touch a horse's neck. "I will tell my mother a Malazan said that. She will not believe me. She will want to."${c4In('sohra') ? `

Sohra watches him go. "His mother is the Mhybe's cousin," she says. "Now the whole camp will know by dark." She seems pleased.` : ''}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b3_c4_rider_cant:()=>({sp:'The Rhivi rider', txt:
`He looks at you for a long time. Then he nods, as if that were the first true thing a Malazan had told him all spring, and it may have been.

"No," he says. "Nor I." He looks across at the shelters. "My grandmother says the dead do not leave. They move to the edge of the grass and wait to be sung to. There will be a great deal of singing, after this." He turns his horse. "Keep your stakes, Malazan. We will keep ours."`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b3_c4_rider_again:()=>({sp:'A Rhivi rider', txt:`He is further down the outer line now, a small shape on a tired horse, riding slowly. He lifts a hand when he sees you looking. It may be a greeting.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* ---- the ration cart, by day ---- */
    b3_c4_cart:()=>({sp:'The ration cart', txt:
`A high-sided handcart with the Host's mark burned into the tailboard. Two sacks in it, slack, and a quartermaster's clerk sitting on the shafts with a slate, doing sums that never come out.

"Meal and Rhivi meat," he says, before you ask. "A handful a head. Over the ditch at dawn, back empty by noon. Two hundred thousand, give or take the ones who died since breakfast. The Host's short. Brood's short. We'll all be shorter by the Catlin, and south of it there's nothing, they say: the Seer's had it all off the land and walked it north." He rubs out a figure with his sleeve. "I'm told to count heads. I count heads. Somebody else decides what they mean."`,
      ch:[{t:'Leave him to his sums.', go:()=>startExplore()}]}),
    /* ---- the road east, into Capustan ---- */
    b3_c4_to_city:()=> !S.f.b3_c4_order ? {sp:'The road east', txt:
`The road east runs along the bank to the city's western gate, a mile off through the smoke. Whiskeyjack is walking the line. He'll want to have said what he came to say before the Fourth goes anywhere.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]} : {sp:'The road east', txt:
`The road east, along the bank and through the burial details and the carts, to Capustan's western gate. The Grey Swords' barracks are in the Camps beyond, by the Thrall. ${c4In('kettle') ? `Kettle is already looking at the walls the way other people look at a meal.` : ''}`,
      ch:[{t:'Into the city.', fx:()=>{ S.f.b3_c4_city = 1; }, go:()=>{ const was = S.f.b3_c4_cityIn; S.f.b3_c4_cityIn = 1; startExplore('b3_c4_city'); if (!was) talk('b3_c4_city_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]},

    /* ---- Capustan, two days after ---- */
    b3_c4_city_arrive:()=>({sp:'Capustan', txt:
`Capustan smells of smoke and lime. The burial details have been working for two days and will be working for ten more. There are domes over the temples that have had holes punched in them, and streets where every door is a black square, and streets where nothing seems to have happened at all, which are worse, because there is nobody in them.

Barghast in white paint go by carrying flagstones on their shoulders, two to a stone, singing. Grey Swords go by in pairs, women most of them, with their hair shorn and their grey surcoats too big for them. A Capan woman sits on a doorstep with a broom across her knees and watches you all the way past.

Nobody in the Fourth goes near the palace. ${C4.corporal} was right to stop where he stopped.${c4In('tuft') ? `

Tuft walks close to the sergeant, which she doesn't usually do. "Something's very wrong with the warrens here," she says, low. "Not quiet. *Wrong.* Like a well somebody's dropped something in."` : ''}`,
      ch:[{t:'The Grey Swords\' barracks.', go:()=>startExplore()}]}),
    b3_c4_dannet:()=>{ const how = c4DannetHow(); return {sp:'Dannet · Grey Sword acolyte', fx:()=>{ S.f.b3_c4_dannet = 1; S.f.b3_dannetMet = 1; S.f.b3_greyswords = 1; }, txt:
`${how === 'field' ? `You know her before she turns round. The acolyte who came down the field line with water on the day the Pannion army broke, and who poured it into every mouth that opened and did not hurry and did not duck. She is in a clean grey surcoat now, with a round shield on her back, the boar scraped off it and a wolf's head half painted over the scrape.` : how === 'camps' ? `You know her before she turns round. The acolyte who went into the Camp with you behind the Grey Sword party, and saw what the siege had done there, and told you the order of it afterward and nothing else. She has a round shield on her back now, the boar scraped off it and a wolf's head half painted over the scrape.` : `A tall, square young woman in a grey surcoat too big in the shoulders, standing in the barracks gate as if there were a wall behind her even where there isn't. Shorn hair. A round shield on her back with a boar scraped off it and a wolf's head half painted over the scrape.`}

"Sergeant." Formal. A Capan accent you could cut glass with. "I am Dannet. ${how === 'new' ? `A second daughter of Capustan, and an acolyte of the Grey Swords for a year.` : `We have met.`} The company lends me to the Malazans as a guide into the Domin until the Domin is done. I know the roads south as far as Coral. I know the wells. I know which villages will have been burned." A pause. "All of them, I expect."

She looks past you, west, toward the plain and the camp you came from. Her face does not change at all. "You guard them," she says. "The Tenescowri."

"Whiskeyjack's order."

"Yes. We heard." She doesn't say what the Grey Swords thought of it. "I was on the wall on the second day," she says instead, "when the gates went. I know the order of it. I will not tell you the order of it."`,
      ch:[c4JoinCh(),
          {t:'"What happened to your god?"', req:()=>!S.f.b3_c4_dannetGod, fx:()=>{ S.f.b3_c4_dannetGod = 1; }, go:'b3_c4_dannet_god'}]}; },
    b3_c4_dannet_god:()=>({sp:'Dannet', txt:
`"Fener is gone." She says it the way you would report a casualty. "Every Grey Sword felt him go, in the winter, before the siege. Like a floor taken away. The Shield Anvil carries something now. We do not ask him what."

She touches the cold amulet at her throat, and then the half-painted wolf on her shield, the same order every time, as if one were asking permission of the other. "A Malazan captain came to the barracks two nights ago and talked with the new Destriant. A sick-looking man. I did not hear what he said. Nobody did. But that night there were wolves in everyone's sleep, two of them, a long way apart, looking the same way." She looks at you. "The Destriant says they are listening. I am not yet sure I want to be listened to."${c4In('tuft') ? `

Tuft has gone very still. "A Malazan captain," she says. "Sick-looking."

"Yes."

Tuft doesn't say *Paran*. She doesn't need to.` : ''}`,
      ch:[c4JoinCh()]}),
    b3_c4_dannet_join:()=>({sp:'Dannet', txt: c4In('greysword') ?
`She nods once, as if signing for something. "Sergeant." She takes the shield off her back and puts it on her arm, which is apparently how a Grey Sword says *yes*.${c4In('brisk') ? `

Brisk looks at the shield, and at the way Dannet stands behind it, and Dannet looks at Brisk's, and neither of them says anything, which is a whole conversation.` : ''}

"There is one more thing," Dannet says. "Our rope-sergeant, ${C4.ropesgt}, has asked to see you. Something is loose on the plain west of here. He will tell it better than I would."` :
`She looks at the Fourth, and counts it, the way everyone counts the Fourth, and arrives at a number.

"You are full," she says. It is not a complaint. "I will march with my own company, then, and be your guide from there. Send for me at any halt. I will come." She bows, the short Grey Sword bow, from the neck. "Sergeant."

"There is one more thing," she says. "Our rope-sergeant, ${C4.ropesgt}, has asked to see you. Something is loose on the plain west of here. He will tell it better than I would."`,
      ch:[{t:'Find the rope-sergeant.', go:()=>startExplore()}]}),
    b3_c4_dannet_again:()=>({sp:'Dannet', txt:
`Dannet is in the barracks gate, watching the recruits drill in the yard. "${C4.ropesgt} is by the far wall," she says. "With the ropes. He is always with the ropes."`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b3_c4_recruits:()=>({sp:'The barracks yard', fx:()=>{ S.f.b3_c4_recruits = 1; }, txt:
`In the yard, recruits at drill: a few dozen of them, in grey surcoats too big for them, with wooden swords. Capan women, most of them, young, with fresh-shorn hair. And among them, here and there, thinner than the rest, slower, with the look of people who have walked a long way on nothing, a few who are not Capan at all.

"Tenescowri," says ${c4In('greysword') ? 'Dannet beside you' : 'a Grey Sword at the gate, without being asked'}. "From the camp. The company takes those who ask. We lost nearly everyone on the walls, Sergeant. We are rebuilding from what is left, and what is left is daughters nobody wanted, and the Seer's starving." A pause. "The new Destriant says the Wolves do not ask where you have been. Only where you are going."

One of the recruits, a man of fifty with a farmer's hands, drops his wooden sword, and stands looking at it on the ground as if he cannot remember what it is for, and then picks it up again and goes on.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* ---- the rope-sergeant, and the thing loose on the plain ---- */
    b3_c4_ambrel:()=>({sp:C4.ropesgt + ' · rope-sergeant of the Grey Swords', fx:()=>{ S.f.b3_c4_ambrel = 1; }, txt:
`An old soldier, older than anyone else in the yard, bald as a stone and missing the last two fingers of his left hand. He is coiling a grey rope over his elbow and palm with two iron hooks at the end of it, back to back, and he does not stop coiling while he talks.

"Malazans." His Daru is a Genabaris dock-hand's. "Good. One of you'll be a sapper." He looks along the Fourth.${c4In('kettle') ? ` His eyes stop on Kettle's satchel. "Good."` : ''} "There's a K'ell Hunter on the plain west of the prisoners' camp. One of the Seer's lizards. It came up behind Kulpath's army, or with it, and when the army broke it didn't. It's been in the gullies since. Killed two Rhivi herders yesterday and one of our outriders this morning." He finishes the coil. "We ride out at dusk with the ropes."

"Before the siege we met one on the plain. Pulled it down with these." He lifts the hooks. "It killed eleven of us doing it. Then four more came and we would all have died, and something out of the dust saved us that I will not talk about in a city." He looks at you. "The Host was asked for a squad that can throw things and doesn't run. Somebody said the Fourth."`,
      ch:[{t:'"Show me how the rope goes on."', check:['might', 16], trick:'b3_c4_wolfrope', req:()=>!S.f.b3_c4_ropeTried, fx:()=>{ S.f.b3_c4_ropeTried = 1; },
            edges:id=>[id === 'greysword' && ['she drilled it on the walls', 2], id === 'brisk' && ['the heavy work', 1], id === 'kettle' && ['knots are sapper work', 1], id === 'tuft' && ['not her kind of rope', -1]],
            go:'b3_c4_rope_ok', fail:'b3_c4_rope_miss'},
          {t:'"We\'ll ride with you."', go:'b3_c4_hunt_out'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b3_c4_rope_ok:()=>({sp:C4.ropesgt, txt:
`He takes ${by({sgt:'you', _:'{who}'})} out into the middle of the yard and gives ${by({sgt:'you', _:'them'})} the rope, and stands three paces off and says *low*, and *round the legs, not the body, never the body*, and *now everyone on the rope pulls the same way at the same moment or it pulls you*. Recruits are put on the tail of it. ${C4.ropesgt} plays the Hunter, bent over, swinging his maimed hand like a blade, and is ridiculous, and nobody laughs.

On the fourth throw the hooks go round his shins and the recruits pull and he goes over in the dust, slowly, the way an old man goes over, and lies there.

"That," he says from the ground, "is the Wolves' Rope. In the winter it had the boar's name." He holds out his good hand to be pulled up. "${by({greysword:'You had it already, girl. I only reminded you.', brisk:'Heavy infantry. I can always tell.', kettle:'Sapper. Knew it. You hold a rope like it owes you money.', _:'You\'ll do.'})}"`,
      ch:[{t:'"We\'ll ride with you."', go:'b3_c4_hunt_out'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b3_c4_rope_miss:()=>({sp:C4.ropesgt, txt:
`It goes wrong on the second throw: the hooks go round ${C4.ropesgt}'s middle instead of his legs, and the recruits on the tail pull anyway, as they were told, and he goes over sideways and takes ${by({sgt:'you', _:'{who}'})} with him.

"*Body*," he says, from underneath. "Never the body. The body's where the blades are." He gets up, slowly. "That's how I lost these." He holds up the hand with the two fingers gone. "We'll put you on the tail of it tonight. The tail's an honourable place."`,
      ch:[{t:'"We\'ll ride with you."', go:'b3_c4_hunt_out'},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ---- the Thrall: the Barghast and their First Founders ---- */
    b3_c4_thrall:()=> S.f.b3_c4_thrall ? {sp:'The Thrall', txt:
`The Thrall's door. Inside, the Barghast are still lifting flagstones, and the priests have stopped shouting and started arguing with each other instead, which is what the Mask Council is for.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]} : {sp:'The Thrall · the council hall', fx:()=>{ S.f.b3_c4_thrall = 1; }, txt:
`Capustan's council hall: the Thrall, where the Mask Council of the city's high priests sits, or sat. Its great door stands open. Barghast are carrying flagstones out of it two to a stone and stacking them in the square, and inside you can hear iron bars going into the joints of the floor, and the floor coming up.

On the steps, a priest in a lacquered mask is shouting at a Barghast woman twice his size, in white paint, with her arms folded. He is telling her that the Thrall is holy ground. She is letting him. When he stops for breath she says, in perfectly good Daru, "It is now," and goes back inside.

${c4In('kettle') ? `"They're taking the floor up," Kettle says, delighted. "The *whole floor*. Why are they taking the floor up?"` : `They are taking the floor up. The whole floor.`}`,
      ch:[{t:'Look inside.', go:'b3_c4_founders'},
          {t:'Leave the Barghast to their floor.', fx:()=>{ S.f.b3_c4_founders = 'heard'; ally(1, 0, 'The White Face saw the Malazans keep their distance'); }, go:'b3_c4_thrall_left'}]},
    b3_c4_thrall_left:()=>({sp:'The Thrall', txt:
`You turn away. ${c4In('kettle') ? `Kettle comes, eventually, walking backwards. ` : ''}By evening the whole city knows anyway: the Barghast's oldest dead, their First Founders, were under the floor of the Thrall all along, in boats, and the Mask Council had been sitting on them for longer than anyone can say.

A Barghast at the door watched you go, and nodded, once, as if a Malazan keeping his distance were a thing worth noting. In that army it may be.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b3_c4_founders:()=>({sp:'The Thrall · the floor torn up', scene:'b3_c4_founders', fx:()=>{ S.f.b3_c4_founders = 'seen'; ally(0, 1, 'The bones under the Thrall'); }, txt:
`The hall has no floor. Where it was is a pit, and the flagstones are stacked against the walls to the height of a man, and torches on poles stand round the edge.

In the pit, side by side, nine canoes. Dugouts, each one cut from a single tree bigger than any tree you have seen, black with age, split along their lengths, packed with earth. And in the earth, bones. Bones too big to be anyone's. A thigh as long as a tall man. A skull you could sit in. The Barghast are kneeling along the edge of the pit, dozens of them, and nobody is singing now.

Along the canoes' flanks, carved and almost gone, there are pictures: tall figures in boats fighting other figures, grey ones. A Barghast warrior beside you sees you looking and says one word, not to you: "*T'isten'ur.*" He touches his own face where the white paint is. "The Grey-Skinned. The enemy." Then, after a long time: "They came home."${c4In('tuft') ? `

Tuft has her hand pressed flat against her breastbone. "They're *awake*," she whispers. "Sergeant. Something down there's awake, and it's very old, and it's very angry, and it's very glad."` : ''}${c4In('greysword') ? `

Dannet stands at the edge with her face like a door. "Two hundred years the Council sat on them," she says. "In masks. And voted."` : ''}`,
      ch:[{t:'"Step back. It\'s theirs."', fx:()=>{ ally(1, 0, 'The White Face saw the Malazans step back'); }, go:'b3_c4_founders_back'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b3_c4_founders_back:()=>({sp:'The Thrall', txt:
`The Fourth steps back from the edge of the pit, all of it, without being told twice. ${c4In('kettle') ? `Even Kettle. ` : ''}The Barghast warrior watches you do it. He doesn't say anything. But on the way out a big Barghast woman in white paint at the door moves aside to let the Fourth through instead of making the Fourth go round her, and in this city, this week, that is a treaty.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* ---- the healers on the temple steps: Ohl, the Destriant who was eaten, and Burn's token ---- */
    b3_c4_healers:()=> S.f.b3_c4_healers ? {sp:'The temple steps', txt:
`The old healer is asleep on the top step with her back against a pillar, finally. Nobody wakes her.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]} : {sp:'The temple steps · the healers', fx:()=>{ S.f.b3_c4_healers = 1; S.f.b3_karnadasHeard = 1; }, txt:
`On the steps of a small domed temple the Capan healers have laid out the wounded who are not going to be moved, in rows, on blankets. An old woman in a stained grey shift is going down the rows with a bowl, and not reaching into any warren at all. Her hands are shaking.

"Malazan." She sees ${c4In('ohl') ? 'Ohl\'s healer\'s bag' : 'the squad'} and something in her face loosens. "Do you have anyone who can reach? No. Don't. Not here." She sits down on the step, all at once, as if her legs had decided it. "The Grey Swords' Destriant reached, on the worst night. Denul. He healed and healed, and the warren was rotten all the way through, and it ate him from inside while he did it. He would not stop." She looks at her hands. "We none of us reach now. We use needles and boiled cloth, like soldiers."

${c4In('ohl') ? `Ohl sits down on the step beside her. ${S.f.b3_karnadasHeard ? `He has heard the story three times now in the healers' tents. He asks to hear it again.` : `He has heard it only as a rumour until now. He asks her to tell it slowly.`} She tells him. He listens to all of it with his hands between his knees, and at the end of it he says, "Needles and boiled cloth," and nods, as if a sum had come out.` : `Nobody in the squad says anything to that.`}`,
      ch:[{t:'"Whose temple is this?"', go:'b3_c4_token'},
          {t:'Back to the street.', go:()=>startExplore()}]},
    b3_c4_token:()=>({sp:'The old healer', fx:()=>{ gain('b3_c4_token'); }, txt:
`"Burn's." She looks up at the dome, which has a hole in it the size of a cart. "The Sleeping Goddess. The earth's mother. All the warrens run in her blood, the old priests say, and something has got into her blood now, and so into all of them." She takes a worn bronze disc on a cord from round her neck and holds it out. "A token of the temple. Take it. For ${c4In('ohl') ? 'your healer' : 'whichever of you reaches'}, when you are down in the Domin and the warren goes bad in his hand." She shakes her head at whatever is on your face. "Somebody should still pray to her. She is asleep, and she is sick, and nobody prays to the sick."`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b3_c4_city_back:()=>({sp:'The road west', txt:
`The western gate, and the road back along the bank to the Fourth's stretch. ${!S.f.b3_c4_ambrel ? `The Grey Swords' business isn't done.` : `${C4.ropesgt} and the ropes ride from here at dusk, west, past the end of the prisoners' camp.`}`,
      ch:[{t:'Back to the stretch, for now.', go:()=>{ startExplore('b3_c4_edge'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ---- the hunt: west at dusk, under dust that is not weather ---- */
    b3_c4_hunt_out:()=>({sp:'The plain west of Capustan', scene:'b3_c4_gathering', fx:()=>{ S.f.b3_c4_gathering = 1; ally(0, 1, 'Dust on the horizon, and a cold sky'); }, txt:
`The Grey Swords ride west at dusk, twenty of them, with coiled ropes on their saddles, and the Fourth goes with them on borrowed horses that do not like the Fourth. Past the end of the prisoners' camp the plain opens up, brown and grey and empty, cut with gullies where the spring floods ran.

It gets cold. Not evening cold: cold out of nowhere, all at once, the cold of a hill in deep winter. Frost comes up white on the grass in front of the horses as you ride, and the horses do not like that either.

And on the horizon to the south-east, far off, dust. A wall of it, standing up off the plain into a white sky, with no wind under it to raise it. It doesn't move. It doesn't settle.

${c4In('sohra') ? `Sohra rides up beside you, very straight in the saddle. "The child went that way," she says. "This afternoon. With the fat Daru, and two of your marines, two women. The Mhybe is sitting at her tent door, and she is not singing." She doesn't look at the dust. "Nobody in the Rhivi camp will tell me where."` : `Somebody in the column says the Rhivi child went out of the camp this afternoon, south-east, with the fat Daru and two of the Host's marines. Nobody says why.`}${c4In('tuft') ? `

Tuft is very white. "Don't go near that," she says, to nobody. "Sergeant. Whatever we do tonight, don't go near *that*."` : ''}`,
      ch:[{t:'Follow the Grey Swords into the gullies.', go:'b3_c4_hunt_find'},
          {t:'Not yet. Back to the city.', go:()=>startExplore()}]}),
    b3_c4_hunt_find:()=>({sp:'The gullies', scene:'b3_c4_gathering', fx:()=>{ S.f.b3_khell = 1; ally(0, 1, 'A K\'ell Hunter'); }, txt:
`They find what it left first: a herder's pony at the mouth of a gully, or the front half of one, and a long smear across the frost where something was dragged, and tracks. Three-toed. A stride too long for anything that walks on two legs.

Then it comes out of the gully. It does not hurry.

Grey-skinned, two-legged, the height of a mounted man, leaning forward over its long tail the way a heron leans. Where its hands should be there are blades, long and curved, and it holds them low and wide. Its skin has gone wrong in places, split and dry, as if it had been dead a long time and had not been told. Its eyes find the Grey Swords, and then the Fourth, and it seems to decide something.

"In the open," ${C4.ropesgt} says quietly, "we hold it. We do not try to kill it. We hold it until the ropes are on." He looks at you. "Then we kill it."`,
      ch:[{t:'"Hold it."', go:()=>startBattle('b3_c4_hunt', {})},
          {t:'Kettle puts a sharper under its feet.', tag:'uses 1 sharper', req:()=>c4In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c4_hunt', {pre:`Kettle bowls the sharper low and flat across the frost, the way you would roll a ball to a dog, and gets her hands over her ears.`})}]}),
    b3_c4_hunt_after:()=>({sp:'The gully', scene:'b3_c4_gathering', fx:()=>{ S.f.b3_c4_hunted = 1; gain('b3_c4_ropehooks'); }, txt:
`It takes a long time to stop moving. Long after it should have, a blade-arm goes on scything slowly at the stones, and the Grey Swords stand clear of it and wait, the way you wait for a fire to burn out, and keep the ropes taut.

When it is still, ${C4.ropesgt} goes down into the gully and looks at it for a long time. Then he cuts the hooks free, all of them, and coils the ropes, and brings one coil up the bank and puts it in ${S.f.b3_hurtMost && TPL[S.f.b3_hurtMost] && c4In(S.f.b3_hurtMost) ? `${NAME(S.f.b3_hurtMost)}'s` : 'your'} hands.

"For the Fourth," he says. "You held it in the open. Most don't." He looks back down at the thing in the gully. "It was dead before we started, you know. Long dead. They don't stay down because they were never properly up."${c4In('greysword') ? `

Dannet is standing at the lip of the gully with her shield still up. She lowers it slowly. "The patrol before the siege," she says. "I was not on it. The ones who were are mostly not on anything now." She touches the amulet, and the wolf.` : ''}`,
      ch:[{t:'Look up at the rise.', go:'b3_c4_imass'}]}),
    b3_c4_imass:()=>({sp:'The rise above the gully', scene:'b3_c4_gathering', txt:
`${c4In('sohra') ? 'Sohra sees it first.' : c4In('tuft') ? 'Tuft sees it first.' : 'You see it first.'} On the low rise across the gully, against the white sky, somebody is standing and watching.

Short. Broad. Grey all over, the grey of dust, of old hide gone to dust, of bone. Something on its head with antlers. A long blade held low in one hand, pale, not iron. It has been standing there, you understand, for some time. It watched the Hunter fall.

Nobody moves. The Grey Swords nearest you have gone very still, the stillness of people who have seen this before and lived because of it.

Then the wind that is not there takes it. It goes to dust from the feet up, the way a sandcastle goes when the tide comes in, and the dust lifts off the rise and goes away south-east, toward the wall of dust on the horizon, and the rise is empty.${c4In('greysword') ? `

"They will fight the lizards," Dannet says, very low. "Not us. Never us. The Shield Anvil said, after the patrol." She touches the amulet at her throat and does not say anything else.` : ''}`,
      ch:[{t:'Walk up to where it stood.', go:'b3_c4_flint'},
          {t:'Leave the rise alone. Back to the camp.', fx:()=>{ S.f.b3_c4_flint = 'left'; }, go:'b3_c4_hunt_home'}]}),
    b3_c4_flint:()=>({sp:'The rise', scene:'b3_c4_gathering', txt:
`Where it stood the frost is gone in a ring, and the ground is dry, and in the middle of the ring, lying in the dust as if it had been put down for somebody, there is a blade.

Flint. Long, leaf-shaped, knapped to an edge so fine it seems to cut the light. An antler haft, bound in something that was hide once. It was not there a moment ago. You would swear to it.

${c4In('tuft') ? `"Don't," Tuft says from the foot of the rise. She hasn't come up. "Sergeant. I don't know what that is, and that's twice tonight I've said that, and I've never said it before this year."` : `Nobody comes up the rise after you.`}`,
      ch:[{t:'Take it.', fx:()=>{ S.f.b3_c4_flint = 1; gain('b3_c4_flint'); if (c4In('tuft')) loy('tuft', -1); }, go:'b3_c4_hunt_home'},
          {t:'Leave it where it was put.', fx:()=>{ S.f.b3_c4_flint = 'left'; if (c4In('tuft')) loy('tuft', 1); }, go:'b3_c4_hunt_home'}]}),
    b3_c4_hunt_home:()=>({sp:'The plain west of Capustan', scene:'b3_c4_gathering', txt:
`You ride back in the dark with the Grey Swords, and the cold comes with you all the way. ${S.f.b3_c4_flint === 1 ? `The flint blade rides wrapped in a blanket across the back of a horse that keeps trying to look round at it. ` : ''}The wall of dust is still there on the horizon when the light is gone. You can't see it. You can feel where it is, the way you can feel where a fire is with your eyes shut.

Some time after midnight the howling starts.

It comes from the south-east, from very far off, carried on the wind that isn't there. It is not wolves. It is not any animal anyone in the Host has heard. It goes on for a long time, and stops, and starts again, and it is the most desolate sound you have ever heard, and the Grey Swords ride through it with their heads down and nobody says anything at all.`,
      ch:[{t:'Back to the Fourth\'s stretch.', fx:()=>{ S.f.b3_c4_night = 1; ally(0, 1, 'Howling, far off'); }, go:()=>{ startExplore('b3_c4_night'); talk('b3_c4_night_arrive'); }}]}),

    /* ---- the night on the bank ---- */
    b3_c4_night_arrive:()=>({sp:'The guards\' bank · night', fx:()=>{ S.f.b3_c4_nightIn = 1; }, txt:
`The bank is quiet in the way an army is quiet when nobody is asleep. The fires are low. Frost on the stakes, frost on the cord and the rags tied on it, frost on the blankets of the soldiers lying along the lip of the ditch with their eyes open. Across the ditch, two hundred thousand people in the cold, and almost no fires.

The howling has stopped. Everyone is waiting for it to start again.

At the gap, ${C4.corporal} and his three lads are standing up, which they were not doing this afternoon. They have cudgels. They are looking at the ditch.`,
      ch:[{t:'See what Corporal ' + C4.corporal + ' thinks he\'s doing.', go:'b3_c4_mosk_night'},
          {t:'The fire first.', go:()=>startExplore()}]}),
    b3_c4_mosk_night:()=>({sp:'Corporal ' + C4.corporal, txt:
`"Sergeant." He doesn't lower the cudgel. "Can't sleep. Nobody can sleep. That noise." He jerks his head at the dark. "So we thought we'd go over and see if the ones by the gap can sleep. Thin 'em out a bit before the march. Save on meal." One of his lads laughs. It is not a good laugh. "Nobody'll miss a few. Nobody'll count."

He looks at you. He wants you to say something. He isn't sure what.

"You heard him, this afternoon," he says. "So did I. I'm telling you so you'll have been told."`,
      ch:[{t:'"Whiskeyjack\'s order, Corporal. Back to your fire."', check:['guile', 14],
            edges:id=>[id === 'sgt' && ['the stripes', 1], id === 'brisk' && ['heavy infantry talking to heavy infantry', 2], id === 'greysword' && ['a Capan who was on the wall, telling him he is wrong', 1], id === 'kettle' && ['she is talking too fast', -1]],
            go:'b3_c4_mosk_down', fail:'b3_c4_mosk_fight'},
          {t:'"Try it."', go:'b3_c4_mosk_fight'},
          {t:'Look the other way.', fx:()=>{ S.f.b3_c4_mosk = 'let'; ally(-2, 2, 'Malazans went over the stakes in the dark'); if (c4In('brisk')) loy('brisk', -1); if (c4In('ohl')) loy('ohl', -2); if (c4In('greysword')) loy('greysword', -1); }, go:'b3_c4_mosk_let'}]}),
    b3_c4_mosk_down:()=>({sp:'Corporal ' + C4.corporal, fx:()=>{ S.f.b3_c4_mosk = 'talked'; ally(1, 0, 'The Rhivi saw the order kept'); }, txt:
`${by({brisk:`Brisk walks up to him until they are a hand apart, which with the two of them is not far, and says one thing, very quietly, in the voice the heavy regiments use in the line when the line is about to break. You don't hear what. ${C4.corporal} does.`, greysword:`Dannet steps up beside you with her shield on her arm. "I was on the wall on the second day," she says to him. "I saw what they did. I saw who told them to. You are not going over that ditch to find him. He is not there."`, sgt:`You say it once, in the voice you have used maybe four times in eleven years, the one that does not argue because it has already won.`, _:`{who} says it once, in the voice you use when there is no second time.`})}

${C4.corporal} looks at the ditch for a long time. Then he lowers the cudgel and lets it hang from his hand.

"Aye," he says. "Aye, well." He turns round. "Back to the fire, lads. Sergeant says." He stops after three steps and doesn't look back. "That noise," he says. "What *is* that."

You tell him you don't know. It's the truth.`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b3_c4_mosk_fight:()=>({sp:'Corporal ' + C4.corporal, txt:
`${C4.corporal} looks at you, and at the Fourth, and at his three lads, and does the sum, and doesn't like it, and decides he is past caring about sums tonight.

"Shame," he says, and comes at you with the cudgel.`,
      ch:[{t:'Put them on the ground.', go:()=>startBattle('b3_c4_brawl', {})}]}),
    b3_c4_after_brawl:()=>({sp:'By the gap', fx:()=>{ S.f.b3_c4_mosk = 'fought'; ally(1, 0, 'The Rhivi saw the order kept'); }, txt:
`${C4.corporal} sits up in the frost with blood coming out of his nose and looks at it on his fingers. His lads are sitting up too, one at a time, and nobody is reaching for a cudgel.

"Fair," ${C4.corporal} says thickly. "Fair enough." He gets up. He doesn't look at the ditch. "Nobody's reporting this."

${c4In('brisk') ? `"Nobody's reporting anything," says Brisk. "Go to bed, Corporal."` : `Nobody is reporting anything. He goes to bed.`}

Across the ditch, in the dark, at the gap, a woman with a boy across her knees has watched all of it without moving.`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b3_c4_mosk_let:()=>({sp:'The gap', txt:
`You look at the fire. You hear them go: four men over a ditch in the dark, quietly, the way soldiers go when they have done it before.

Later there is a noise from the shelters by the gap, not loud, and then quiet, and later still a Rhivi patrol comes along the inside of the stake line at a walk, leading four men on foot with their hands tied, and two of them are bloody, and none of them is talking. The Rhivi don't look at the Fourth as they pass. That is how you know they saw.

${c4In('ohl') ? `Ohl doesn't say anything. He gets up from the fire and goes and sits by himself, further along the bank, with the oilcloth in his lap, not writing.` : `Nobody at the fire says anything at all.`}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b3_c4_mosk_after:()=>({sp:'Corporal ' + C4.corporal, txt: S.f.b3_c4_mosk === 'let' ?
`The Rhivi took ${C4.corporal} and his lads up the line to the provosts. Their fire has burned down to nothing.` :
`${C4.corporal} is lying by his fire with his back to the ditch and a blanket over his head. He is not asleep. Nobody is.`,
      ch:[{t:'Leave it.', go:()=>startExplore()}]}),
    b3_c4_sarn_night:()=>({sp:C4.mother, txt:
`${C4.mother} is sitting at the gap with the boy across her knees and a blanket over both of them${S.f.b3_c4_bread ? ' that was not there this afternoon' : ''}. When the howling comes she puts her hands over the boy's ears.

"The priests are moving," she says, very low, without looking up. "In the shelters. Since the noise. The ones who kept their brow-bands." She says it the way she said everything else, so it will have been told.`,
      ch:[{t:'"How many?"', go:'b3_c4_sarn_night2'},
          {t:'Back to the fire.', go:()=>startExplore()}]}),
    b3_c4_sarn_night2:()=>({sp:C4.mother, fx:()=>{ S.f.b3_c4_warned = 1; }, txt:
`"One priest. A tall one, who eats." She looks at you. "He has eight or nine who still listen to him. He is telling the rest that the Seer will feed them on the other side of the stakes." She pulls the blanket closer round the boy. "Some of them believe him. Some of them only want it to be over. It is the same thing, at night."

${c4In('brisk') ? `Brisk, behind you, quietly: "I'll wake the line."` : `You'll wake the line.`}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b3_c4_cart_night:()=>({sp:'The ration cart', txt:
`The cart is empty until dawn. The clerk is asleep under it with his slate on his chest, the only person on the bank who is.`,
      ch:[{t:'Let him sleep.', go:()=>startExplore()}]}),
    b3_c4_road_night:()=>({sp:'The road east', txt:
`The road east to the city. Not tonight. The Fourth has a stretch to hold, and something out on the plain is howling.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the fire: rest, the recruits, the cold, and the howling */
    b3_c4_fire:()=>({sp:'The Fourth\'s fire', txt:
`The fire is low and the frost comes right up to the edge of it and stops. ${c4In('kettle') ? `Kettle is lying on her back with the satchel under her head, eyes open. ` : ''}${c4In('ohl') ? `Ohl is boiling something that will be tea in the technical sense. ` : ''}${c4In('tuft') ? `Tuft is sitting up with her knees drawn in and her cards in her lap, not reading them.` : ''}

${b3Mind() === 'haunted' ? `Nobody has slept since the gully. Everyone keeps looking south-east, at nothing.` : b3Mind() === 'shaken' ? `Every time the howling starts, every head at the fire turns the same way, and then turns back.` : `The howling comes and goes. You find, after a while, that you have started to be able to talk over it.`}`,
      html:allyHTML('West of Capustan · a cold night'),
      ch:[{t:'Rest, as much as anyone can.', req:()=>!S.f.b3_c4_rested, fx:()=>{ S.f.b3_c4_rested = 1; b3Rest('The Fourth lies down round its fire on the frozen bank with the Host all round it, and rests, more or less. Wounds close, mostly.'); }, go:'b3_c4_fire'},
          {t:'"Tuft. What is that, out there?"', req:()=>c4In('tuft') && !S.f.b3_c4_askTuft, fx:()=>{ S.f.b3_c4_askTuft = 1; }, go:'b3_c4_fire_tuft'},
          {t:'"Sohra. How is the Mhybe?"', req:()=>c4In('sohra') && !S.f.b3_c4_askSohra, fx:()=>{ S.f.b3_c4_askSohra = 1; }, go:'b3_c4_fire_sohra'},
          {t:'Send for Dannet. Sohra goes back to the Rhivi fires.', req:()=>b3Waiting('greysword') && c4In('sohra') && b3Room() <= 0, fx:()=>{ S.f.b3_c4_swapIn = 'greysword'; b3SwapIn('greysword'); }, go:'b3_c4_swap'},
          {t:'Send for Dannet.', req:()=>b3Waiting('greysword') && b3Room() > 0, fx:()=>{ S.f.b3_c4_swapIn = 'greysword'; b3SwapIn('greysword'); }, go:'b3_c4_swap'},
          {t:'Send for Sohra. Dannet goes back to the Grey Swords\' lines.', req:()=>b3Waiting('sohra') && c4In('greysword') && b3Room() <= 0, fx:()=>{ S.f.b3_c4_swapIn = 'sohra'; b3SwapIn('sohra'); }, go:'b3_c4_swap'},
          {t:'Send for Sohra.', req:()=>b3Waiting('sohra') && b3Room() > 0, fx:()=>{ S.f.b3_c4_swapIn = 'sohra'; b3SwapIn('sohra'); }, go:'b3_c4_swap'},
          {t:'Corporal ' + C4.corporal + ' first.', req:()=>!S.f.b3_c4_mosk, go:'b3_c4_mosk_night'},
          {t:'Sleep. Or pretend.', req:()=>!!S.f.b3_c4_mosk, go:'b3_c4_heart'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b3_c4_fire_tuft:()=>({sp:'Tuft', txt:
`She doesn't answer for a while. When she does, she keeps her voice down, as if it could hear.

"The child's out there. I can feel her. I could always feel her, a bit, since the hill." She turns a card over in her fingers without looking at it. "And all round her there are more of them than I can count, Sergeant. Hundreds. Thousands. Old. *Dry.* Like the dust has been told to stand up and remember being people." She shivers. "And they're all listening to her. Every one of them. And she's saying no to something, and they're howling."

She puts the card back in the Deck very carefully. "I wanted to be near her," she says. "I've wanted it all spring. I'm glad I'm here. I'm glad I'm *here*, and I'm ashamed of being glad."`,
      ch:[{t:'"Sleep, if you can."', go:'b3_c4_fire'}]}),
    b3_c4_fire_sohra:()=>({sp:'Sohra', txt:
`"Alone." Sohra is sitting cross-legged with her bow across her knees, facing south-east. "The child went out with the fat Daru this afternoon, and your two marines. The Mhybe sat at her tent door all evening and did not sing, and did not eat, and when I went to her she did not know me for a moment." She is quiet for a while. "She was young at the turn of the year, herd-mother. I remember. I am not mad. She was *young*."

${c4In('ohl') ? `Ohl, without looking up from the tea: "I know, child. I have been watching too."` : 'Nobody at the fire tells her she is mad.'} Sohra doesn't cry. She picks up her bow and checks the string, which did not need checking.`,
      ch:[{t:'Let her be.', go:'b3_c4_fire'}]}),
    b3_c4_swap:()=>({sp:'The Fourth\'s fire', txt:
`${S.f.b3_c4_swapIn === 'greysword' ? `Dannet comes along the bank out of the dark with her shield on her arm, as if she had been waiting a few fires down for exactly this, and sits down at the edge of the Fourth's fire without a word, in the place nobody was using.${S.f.b3_sohraDone === 2 ? ` Sohra has gone back to the Rhivi fires. She said she would come if she was asked. She will be.` : ''}` : `Sohra comes back along the bank from the Rhivi fires with her bow on her back and sits down where she always sits, and says "Loud," to nobody, and everyone knows what she means.${S.f.b3_dannetDone === 2 ? ` Dannet has gone back to the Grey Swords' lines. Send for her at any halt.` : ''}`}`,
      ch:[{t:'Back to the fire.', go:'b3_c4_fire'}]}),

    /* the camp's heart, far up the line, and then the Fourth's stretch */
    b3_c4_heart:()=>({sp:'The guards\' bank · past midnight', fx:()=>{ S.f.b3_c4_heart = 1; ally(0, 1, 'Something came down over the camp\'s heart'); }, txt:
`You don't sleep. Nobody does. You lie on the frozen ground with your eyes shut and listen to the howling come and go, and some time past midnight you hear something else, far up the line to the north, where the heart of the prisoners' camp is and the First Child's tents are: a great many voices at once, rising, the sound a crowd makes when it all starts to run the same way.

You sit up. Everybody sits up.

Far off, over the heart of the camp, the night tears. Something comes down out of it that is darker than the night and as big as a hill, and the noise of it reaches the bank a breath later, a wind and a roar and a sound like a forest going over. Then the voices stop. Not all at once. In a long falling-away, like a wave going back down a beach.

Nobody on the bank says anything. ${c4In('tuft') ? `Tuft has both hands over her mouth. ` : ''}${c4In('kettle') ? `Kettle says, very quietly, "That was a dragon. That was the dragon. From the field." ` : ''}Up the line, a long way off, somebody is shouting orders in a voice you know.

And then, on your own stretch, at the gap, the stakes start to move.`,
      ch:[{t:'On your feet.', go:'b3_c4_breach'}]}),
    b3_c4_breach:()=>({sp:'The stake line', txt:
`They come out of the dark across the ditch, a great many of them, because somebody has told them that tonight is the night. In the front, eight or nine men with strips of dirty ochre bound round their brows, with sickles and stakes and one rusted sword, shouting the Seer's name. Behind them, and round them, and pushed in front of them, the starving: people in rags, stumbling, some with their hands out, some with nothing in their hands at all, coming at the stakes because the people behind them are coming.

And back in the shelters, thirty paces in, a tall man in a long dun robe who is better fed than anyone round him, with his arms up, telling them the Seer will feed them on the other side.

${S.f.b3_c4_warned ? `The line is awake. ${C4.mother} told you, and you told them, and the Fourth is standing at the stakes with its shields up before the first of them reaches the ditch.` : `The line is half awake. It will have to do.`}

Whiskeyjack: shields, not blades, if you can. The ones with brow-bands are the ones who mean it.`,
      ch:[{t:'"Shields. The brow-bands first. The rest, flat of the blade."', go:()=>startBattle('b3_c4_breakout', S.f.b3_c4_warned ? {surprise:'p'} : {})},
          {t:'Kettle puts a sharper among the brow-bands.', tag:'uses 1 sharper', req:()=>c4In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; S.f.b3_c4_sharperNight = 1; }, go:()=>startBattle('b3_c4_breakout', {pre:`Kettle throws it hard and low into the thick of the ochre brow-bands and gets down. "Twins forgive me," she says, which you have never once heard her say before.`, surprise:S.f.b3_c4_warned ? 'p' : null})}]}),
    b3_c4_after_breakout:()=>({sp:'The stake line', fx:()=>{ S.f.b3_c4_broke = 1; S.f.b3_c4_priest = 1; const d = c4Dead(); if (d >= 3) ally(-1, 1, 'Starving people died on the Fourth\'s stretch'); else if (!d) ally(1, -1, 'Not one of the starving died on the Fourth\'s stretch'); }, txt:
`The priest is down among the shelters, on his back, with his arms still up as if he had not yet been told to put them down. His brow-bands are down round him. The starving who are still on their feet have sat down where they were standing, all along the gap, as if somebody had cut a string, and they are not looking at anyone.

${c4Dead() ? `You count. Everyone counts. ${c4Back()}, dragged or crawling or walking, from the Fourth's stretch. ${numw(c4Dead(), true)} did not. ${c4In('ohl') ? `Ohl goes and kneels by each of the ${c4Dead() === 1 ? 'one' : numw(c4Dead())} in turn, and closes ${c4Dead() === 1 ? 'the eyes' : 'their eyes'}, and doesn't write anything.` : `Somebody closes ${c4Dead() === 1 ? 'the eyes' : 'their eyes'}.`}${S.f.b3_c4_sharperNight ? `${c4In('kettle') ? ' Kettle is sitting on the satchel with her hands over her face.' : ''}` : ''}` : `You count. Everyone counts. ${c4Back()} from the Fourth's stretch, dragged or crawling or walking. Not one of them died on it. ${c4In('brisk') ? `Brisk writes it in the ledger by firelight, in capitals, the way she writes the things she wants to be able to find again.` : `You write it in the pay ledger, in the margin, where you will be able to find it again.`}`}

Up the line, at the heart of the camp, the shouting has stopped. Torches are moving there. A great many torches.${c4In('brisk') ? `

Tav comes along the bank from the Fourth Regiment's stretch with blood on his arm that isn't his, and stands beside his sister, and doesn't say anything, and neither does she.` : ''}`,
      ch:[{t:'Dawn.', go:()=>{ startExplore('b3_c4_dawn'); talk('b3_c4_dawn'); }}]}),

    /* ---- dawn on the bank ---- */
    b3_c4_dawn:()=>({sp:'The guards\' bank · dawn', scene:'b3_c4_gathering', fx:()=>{ S.f.b3_c4_dawn = 1; }, txt:
`The frost goes off the grass in the first sun as if somebody were wiping a slate. The wall of dust on the horizon is gone. The howling stopped an hour before dawn and has not started again, and the silence where it was is enormous.

Along the gap, on your side of the ditch now, the ones who came over the stakes in the night and did not go back are sitting in a long ragged row by the ration cart: children, most of them, and the sick, and the very old, who could not get back across the ditch, or did not want to. Nobody has told them to go back. Nobody has told them to stay.

The word comes down the line with the water carts, from fire to fire, the way word does. Anaster, the First Child, is taken. The women who guarded him are dead, all of them, his mother among them. The black dragon came down on them out of the sky. Whiskeyjack was there.

That is all the word says. Up the line, a long way off, he is walking toward you along the bank.`,
      ch:[{t:'Wait for him.', go:()=>startExplore()}]}),
    b3_c4_dawn_wj:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c4_dawnWj = 1; }, txt:
`He looks a hundred years old. He is limping now and has stopped pretending not to. There is blood on his boots that is not his and he has not noticed it, or has noticed and not cared.

He stops at your stretch and looks at the gap, and at the stakes the Fourth pulled back upright in the night, and at the row of people sitting by the cart. He is counting. You watch him do it.

"There's a thing that happened up the line tonight that you'll hear about," he says. "Most of what you hear will be true." He doesn't say which part. ${c4Dead() ? `"${numw(c4Dead(), true)}," he says, looking at your stretch. "I'd hoped for none." He looks at you. "I know why it wasn't none. Shields, if you can. You couldn't, every time. Nobody could."` : `"None of theirs dead on your stretch," he says. "None." He looks at you for a long moment. "Good."`}

${S.f.b3_c4_mosk === 'let' ? `He looks along the bank to where ${C4.corporal}'s fire is cold. "The provosts have four of the Ninth," he says. "The Rhivi brought them in. They say a sergeant looked the other way." He doesn't ask which sergeant. He doesn't need to. He goes on looking at you until you look back. Then he walks on.` : S.f.b3_c4_mosk === 'fought' ? `He looks along the bank to where ${C4.corporal} is sitting with a swollen face, very carefully not looking at anyone. Whiskeyjack doesn't ask. Something at the corner of his mouth moves, and stops.` : `He looks along the bank to where ${C4.corporal} is lying with a blanket over his head. "Somebody told the Ninth no last night," he says, "and they listened. I heard." That's all.`}${c4In('ohl') ? `

"Sir," Ohl says. "The leg."

"Later," says Whiskeyjack. It is the same answer as yesterday, and you all hear it.` : ''}`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b3_c4_dawn_wj_again:()=>({sp:'Whiskeyjack', txt:
`He has gone on along the line, slowly, fire to fire, and stopped at the end of the Fourth's stretch by the dead tree to talk to a quartermaster with a slate. He can see the ration cart from there. You notice that he can.`,
      ch:[{t:'Leave him.', go:()=>startExplore()}]}),
    b3_c4_sarn_dawn:()=>({sp:C4.mother, txt:
`${C4.mother} is sitting with the others by the cart, on your side of the ditch now, with the boy against her. ${S.f.b3_c4_tibb ? `He is awake, and thin, and looking at everything. When he sees ${S.f.b3_c4_tibb === 'ohl' && c4In('ohl') ? 'Ohl' : S.f.b3_c4_tibb === 'sung' && c4In('sohra') ? 'Sohra' : 'the Fourth'} he looks for a long time, the way children look at the people who were there when they were sick.` : `He is asleep, or something like it.`}

"They say the Grey Swords take people," she says. "From the camp. Into the company. They cut their hair and give them a sword and feed them." She touches her own cropped hair. "I cut mine on the road. It was full of lice." She looks at you. "Is it true?"`,
      ch:[{t:'"It\'s true. Dannet can take you to them."', req:()=>!!S.f.b3_c4_dannet || !!S.f.b3_dannetMet, fx:()=>{ S.f.b3_c4_sarn = 'grey'; ally(1, 0, 'A Tenescowri woman went to the Grey Swords'); if (c4In('greysword')) loy('greysword', 1); }, go:'b3_c4_sarn_grey'},
          {t:'"I don\'t know."', fx:()=>{ S.f.b3_c4_sarn = 'camp'; }, go:'b3_c4_sarn_camp'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b3_c4_sarn_grey:()=>({sp:C4.mother, txt:
`${c4In('greysword') ? `Dannet looks at ${C4.mother} for a long time, the Capan and the Domin farmer's widow, with the whole siege between them. Then she holds out her hand. "Come," she says. "Bring the boy. The company needs water carried. It always needs water carried."` : `Dannet comes along the bank from the Grey Swords' lines when you send for her, and looks at ${C4.mother} for a long time, the Capan and the Domin farmer's widow, with the whole siege between them. Then she holds out her hand. "Come," she says. "Bring the boy. The company needs water carried."`}

${C4.mother} gets up. It takes her two tries. She picks the boy up, though he is too big to be carried, and does not look back at the ditch, and goes.

${c4In('greysword') ? `"The Wolves do not ask where you have been," Dannet says to you quietly, before she follows. "I am trying to learn not to ask either. I am not good at it yet."` : ''}`,
      ch:[{t:'Back to the cart.', go:()=>startExplore()}]}),
    b3_c4_sarn_camp:()=>({sp:C4.mother, txt:
`She nods, as if that were an answer she had expected, and goes back across the ditch at the gap with the boy, carefully, the way you cross a ditch with a boy, and sits down at her shelter, and does not look round.

You know which shelter. You find that you will keep knowing.`,
      ch:[{t:'Back to the cart.', go:()=>startExplore()}]}),
    b3_c4_tav_dawn:()=>({sp:'Tav', fx:()=>{ S.f.b3_c4_tavDawn = 1; }, txt:
`Tav is sitting on the lip of the ditch with his arm bound up in a strip of somebody's shirt, and Brisk is sitting next to him, not touching him, about a hand's width away, which for Brisk is a great deal.

"Can't sing with my arm like this," Tav says.

"You can't sing with your arm like anything," says Brisk.

They sit there. The sun comes up. Neither of them says *we don't leave people*. Neither of them has to.`,
      ch:[{t:'Leave them be.', go:()=>startExplore()}]}),
    b3_c4_dannet_dawn:()=>({sp:'Dannet', txt:
`Dannet has come along the bank from the Grey Swords' lines with her shield on her back, and is standing a little way off from the Fourth's fire, watching the row of people by the cart. "The company is recruiting by the gap this morning," she says. "I said I would see who came." She looks at you. "Send for me when you want me, Sergeant. I am a guide. I will be where I am needed."`,
      ch:[{t:'Back to the cart.', go:()=>startExplore()}]}),
    b3_c4_road_dawn:()=>({sp:'The road east', txt:
`The road east, to the city and the Catlin crossing beyond it. The Host marches in three days. The cart first.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* ---- the key: the ration cart, and the people sitting by it ---- */
    b3_c4_key:()=> S.f.b3_c4_key ? {sp:'The ration cart', txt:
`The cart has gone over the ditch and come back. The row by it is thinner, some gone back across, some taken off by the Grey Swords' recruiters, some by the Rhivi. Three days to the Catlin.`,
      ch:[{t:'Rest. The Catlin in three days.', go:()=>chapterEnd(4, S.f.b3_c4_key)},
          {t:'Not yet.', go:()=>startExplore()}]} : !S.f.b3_c4_dawnWj ? {sp:'The ration cart', txt:
`The cart is loading for the morning run, and the row of people by it is waiting, and Whiskeyjack is coming along the bank. He'll want his word first.`,
      ch:[{t:'Wait for him.', go:()=>startExplore()}]} : {sp:'The ration cart', txt:
`The clerk is loading the cart for the morning run over the ditch. A handful a head. He looks at the row of people sitting by his wheels, the ones who came over in the night, the children and the sick, and then at his slate, and then at you.

"They're on your side now, Sergeant," he says. "Your side of the ditch. They're not on my count." He doesn't say whose count they're on. "The Host feeds its own. I've no orders for these."

${c4In('brisk') ? `Brisk is standing by the Fourth's sacks with her arms folded. "Six days' bread for six," she says, to nobody. "Two salves. Three days to the Catlin and nothing south of it but what we carry." She isn't arguing. She's reading out the ledger, so it will have been read.` : `Six days' bread. Two salves, if nobody has used them. Three days to the Catlin and nothing south of it but what the Fourth carries.`}

${c4In('ohl') ? `Ohl is looking at a girl at the end of the row whose feet are wrapped in rags that have stopped being white. He doesn't say anything. He doesn't need to say anything. He is looking at the salve jars.` : 'A girl at the end of the row has her feet wrapped in rags that have stopped being white.'}`,
      ch:[{t:'Open the sacks. The children and the sick, the bread and the salves.', fx:()=>{ S.f.b3_c4_key = 'share'; S.f.b3_wjNoticed = 1; const n = Math.min(2, S.inv.salve || 0); S.inv.salve = (S.inv.salve || 0) - n; S.f.b3_c4_salvesGiven = n; ally(2, -2, 'The Fourth\'s own bread'); if (c4In('ohl')) loy('ohl', 1); if (c4In('sohra')) loy('sohra', 1); if (c4In('brisk')) loy('brisk', -1); }, go:'b3_c4_share'},
          {t:'"We keep what we carry. The Domin is bare, and somebody has to be able to fight in it."', fx:()=>{ S.f.b3_c4_key = 'hold'; ally(0, 2, 'Kept for the road'); if (c4In('ohl')) loy('ohl', -1); if (c4In('brisk')) loy('brisk', 1); }, go:'b3_c4_hold'},
          {t:'Not yet.', go:()=>startExplore()}]},
    b3_c4_share:()=>({sp:'The ration cart', txt:
`The Fourth opens its sacks. ${c4In('brisk') ? `Brisk does it herself, after a moment, because if it is going to be done it is going to be done properly: she breaks the bread into even pieces with her knife and gives them out down the row, one each, and the dried meat after, and writes it in the ledger as she goes: *Six days. Gap. Given.*` : `The bread goes down the row in even pieces, one each, and the dried meat after.`} ${c4In('ohl') ? `Ohl kneels at the end of the row with the salve jars, ${S.f.b3_c4_salvesGiven ? `${S.f.b3_c4_salvesGiven === 1 ? 'the last of them' : 'both of them'}, and unwraps the girl's feet, and does not make a face, and does them properly, with boiled cloth.` : `which are empty already, and does what he can with boiled cloth.`}` : S.f.b3_c4_salvesGiven ? `The salve goes on the worst feet, and the worst hands.` : ''}

It is not very much. Six days' bread for six does not go far down a row like that. It goes far enough that the children at the end of it get some.

Down at the end of the line, by the dead tree, Whiskeyjack has stopped talking to the quartermaster. He is looking at the Fourth's empty sacks. He doesn't come over. He doesn't say anything. After a while he nods, once, to nobody you can see, and walks on up the line, slowly, on the leg.

${c4In('kettle') ? `"We're going to be so hungry," Kettle says cheerfully, sitting down on the empty satchel of bread. "In the Domin. With nothing. *So* hungry."

"Yes," says ${c4In('brisk') ? 'Brisk' : 'somebody'}.

"Good," says Kettle, and doesn't explain.` : ''}`,
      ch:[{t:'Rest. The Catlin in three days.', go:()=>chapterEnd(4, 'share')},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b3_c4_hold:()=>({sp:'The ration cart', txt:
`The Fourth keeps its sacks tied. ${c4In('brisk') ? `Brisk ties them again, tighter, and stands next to them, and writes nothing in the ledger, which is how you know she has thought about it.` : `Nobody writes anything down.`}

The clerk nods as if you had confirmed a figure, and loads the cart, and takes it over the ditch at the gap with the morning's handful a head, and the row by his wheels watches it go. ${c4In('ohl') ? `Ohl looks at the girl at the end of the row for a long moment, and then at you, and then he takes a strip of boiled cloth out of his own kit, which is not the squad's, and goes and kneels by her and does her feet with that and nothing else. He doesn't look at you while he does it. He doesn't look at you afterward either.` : `A Grey Sword recruiter comes along the row later and takes the girl at the end of it, and a few others, to the barracks, where there is meal.`}

It was the right sum. The Domin is stripped bare; the clerk said so, the Grey Swords say so, the Seer's own people say so. Somebody has to be able to fight in it. Nobody in the Fourth says out loud that it was the right sum, and nobody says it was not.`,
      ch:[{t:'Rest. The Catlin in three days.', go:()=>chapterEnd(4, 'hold')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
/* the sergeant's quest: somebody offers to look at Whiskeyjack's leg (Mallet's week; nobody heals it) */
const c4LegCh = () => ({t:c4In('ohl') ? '"Ohl could look at that leg, sir."' : '"A healer could look at that leg, sir."', req:()=>!S.f.b3_c4_leg, fx:()=>{ S.f.b3_c4_leg = 1; }, go:'b3_c4_wj_leg'});
/* Dannet's joining: into the Fourth if there is room (or she is already walking with it), else she marches with her company and waits (60 b3Join) */
function c4JoinCh(){ const room = c4In('greysword') || b3Room() > 0;
  return {t:room ? '"Welcome to the Fourth, then."' : '"We\'re full. March with your company, and I\'ll send for you."', fx:()=>{ if (!c4In('greysword')) b3Join('greysword'); if (c4In('greysword')) S.f.b3_dannetDone = 1; }, go:'b3_c4_dannet_join'}; }
/* the guide's joining is recorded as either in the squad or waiting near (b3Join sets b3_dannetDone; Chapter 3 may have set it already) */
function c4DannetDone(){ return !!S.f.b3_c4_dannet || c4In('greysword'); }
