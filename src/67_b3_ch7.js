/* ============ Book Three, Chapter 7: Coral, and the end of Book Three ============ */
/* Two roads in, as Chapter 6 left them (S.f.b3_flew / S.f.b3_river, else S.f.b3_c6_key 'quorl' / 'maurik'):
   THE LIFT (flew): the hidden entrenchments in the mountains above Coral; Quick Ben's fair exchange (quoted here, once); the night the
   grey sorcery comes down on the forward trench; then down into Coral's streets behind the Bridgeburners (never the keep): Beklites,
   Seerdomin and a K'ell Hunter, Moon's Spawn coming down on the Seer's redoubt, and the word from the hill brought by Hurlochel.
   THE RIVER (river): down the Maurik with Whiskeyjack's column to the alliance's position on a hill outside the city; the leg, and Mallet's
   week asked for one last time; the K'Chain Che'Malle come, Trake's Legion goes into them; the Fourth hold the stake line (or the herd
   lines) at the foot of the hill and are too far when Kallor goes for Korlat and the child. They are never the marine who wounds Kallor,
   never the two who die guarding Silverfox; they reach the hilltop after.
   Both roads meet on the shore: Itkovian's barrow (a gift each, through the night), the Spawn sent out over the sea with Whiskeyjack and the
   Bridgeburners in it, the Fourth's last words, and the road out: S.f.b3_c7_key 'host' | 'daru' | 'standdown'. Then the finale (37).
   One fight on each road is mortal, and the player sees it coming: the square (flew) and the stake line (river). */
/* FOR THE ARTIST (67b): the names this file uses.
   Items (ART['item/<key>']): b3_c7_greymail (Seerdomin grey mail), b3_c7_hunterblade (a K'ell Hunter's blade). Stand-ins below with ??=.
   Figures: b3_c7_bridgeburner (new); shelf/Book One: qb, dujek, moranth, b3_moranth, tav, artanthos, greysword, b3_greysword, wj, silverfox,
     mhybe, korlat, kallor, brood, rhivi, b3_rhivi_rider, b3_andii, hurlochel, kruppe; foes seerdomin, beklite, khell.
   Ground (TILEX / area decor / battle style): b3_c6_mountain_night (Ch6's, by name), b3_c7_coral, b3_c7_field.
   Backdrops (SCENEX): b3_c7_coral, b3_c7_hill, b3_c7_hill_dusk, b3_c7_spawn, b3_c7_barrow, b3_c7_sea, b3_c7_finale. */

/* which road the Fourth came in by: the Chapter 6 flags, else its key, else what the player said at the start */
const b3c7Road = () => { const f = (S && S.f) || {};
  if (f.b3_flew && !f.b3_river) return 'flew'; if (f.b3_river && !f.b3_flew) return 'river';
  if (f.b3_c6_key === 'quorl') return 'flew'; if (f.b3_c6_key === 'maurik') return 'river';
  return f.b3_c7_road === 'river' ? 'river' : 'flew'; };
const b3c7Known = () => { const f = (S && S.f) || {}; return !!(f.b3_flew || f.b3_river || f.b3_c6_key === 'quorl' || f.b3_c6_key === 'maurik' || f.b3_c7_road); };
const b3c7Flew = () => b3c7Road() === 'flew';
/* the squad as it stands, without the sergeant */
const b3c7Mates = () => ((S && S.squad) || []).filter(id => id !== 'sgt' && TPL[id] && !(S.dead && S.dead[id]));
const b3c7And = ids => !ids.length ? '' : ids.length === 1 ? NAME(ids[0]) : ids.slice(0, -1).map(NAME).join(', ') + ' and ' + NAME(ids[ids.length - 1]);
const b3c7He = id => ['ohl', 'vell'].includes(id);
const b3c7P = id => b3c7He(id) ? {she:'he', She:'He', her:'him', hers:'his'} : {she:'she', She:'She', her:'her', hers:'her'};
/* loyalty, only for someone who is walking with the squad */
const b3c7Loy = (id, n) => { if (b3In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* Kallor knows the sergeant's face (Chapter 1's watch at the Mhybe's tent, or Chapter 5's word to Brood) */
const b3c7Known7 = () => !!(S.f.b3_kallorEnemy || S.f.b3_kallorSaw);
/* a "yes, but" that raises dread quietly (the cost text names it): remembers how far it actually rose */
const b3c7Dread = n => { S.ally ??= {trust:5, dread:1}; if (S.card === 'b3c_obelisk') n = Math.max(0, n - 1); const d0 = S.ally.dread; S.ally.dread = clamp(d0 + n, 0, ALLY_MAX); const d = S.ally.dread - d0; if (d > 0) tally('dreadUp', d); updChain(); S.f.b3_c7_nearDread = d; return d; };
/* the letter in Brisk's gorget: open (a fresh start, or an import that opened it) or still sealed */
const b3c7Sealed = () => !!(S.imported && b3Was('c7_letter') !== 'brisk');
/* the mortal fight's dead, this chapter */
const b3c7Fell = () => Object.keys((S && S.dead) || {}).filter(id => S.dead[id] && S.dead[id].ch === 7 && TPL[id]);
/* Ohl's list, a name at a time (S.f.b3_listAdds is read by 60's b3List): the legion (+1, lift), Whiskeyjack and the two marines (+3, the hill or Hurlochel's word, else at the burial), the Shield Anvil (+1, the barrow), Twist (+1, the burial) */
const b3c7List = n => { S.f.b3_listAdds = (S.f.b3_listAdds || 0) + n; };
/* who the Fourth's recruits are, and where */
const b3c7Waiting = id => typeof b3Waiting === 'function' && b3Waiting(id);
/* Kettle's cusser: Maud (a new Maud keeps the name, as 60's quest line says), or, on an import that sent Maud home to the Moranth
   (the same rule as Chapter 3's c3MaudHome), the Host's cusser she has taken to calling Little Maud. b3c7MaudLeft: is there one to speak of. */
const b3c7Maud = () => (S.imported && b3Was('c7_debt') === 'paid' && !b3Was('c5_cusserUsed')) ? 'Little Maud' : 'Maud';
const b3c7MaudLeft = () => (S.inv && S.inv.cusser > 0);
const b3c7Count = () => { const n = b3c7Mates().length + 1; return n; };

/* ---- the trick: the Shield Anvil's Weight (a moment borrowed from Itkovian: one squadmate's pain, taken; never his end) ---- */
Object.assign(TRICKS, {
  b3_c7_anvil:{name:'The Shield Anvil\'s Weight', ch:7, use:'fight', ab:'t_b3_c7_anvil', spirit:true, where:'beside the Grey Swords, the day of Coral',
    lore:'Do not take the blow, the Shield Anvil says. Take the one it was meant for. Step in, put your hand where theirs is, and carry it with them. It is not sorcery. It is a thing a person decides to do, and then does.',
    get fx(){ return `Once a fight: the bearer lays a hand on a squadmate within 1 and takes their pain. The squadmate heals ${6 + 2 * lvT()}; the bearer takes half as much (never below 1 health). Not sorcery: the Domin's poison never touches it.`; }},
});
Object.assign(AB, {
  t_b3_c7_anvil:{name:'The Shield Anvil\'s Weight', trick:'b3_c7_anvil', spirit:true, desc:()=>TRICKS.b3_c7_anvil.fx,
    tiles:u=>party().filter(p => p !== u && !p.ally && p.hp > 0 && p.hp < p.maxhp && cheb(u, p) <= 1),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const want = Math.min(6 + 2 * lvT(), t.maxhp - t.hp), cost = Math.min(Math.ceil(want / 2), Math.max(0, u.hp - 1));
      heal(t, want); if (cost > 0) { u.hp -= cost; float(u, '−' + cost + ' carried', '#c8d4e0'); u.flash = performance.now(); }
      AUDIO.play('heal'); sparks(t.x, t.y, 12, '#c8d4e0', .4); sparks(u.x, u.y, 8, '#9aa4ac', .3);
      blog(`${u.name} steps in and puts a hand flat on ${t.name}'s, the way the Grey Swords showed, and takes some of it. ${t.name} stands up straighter. ${u.name} does not, for a moment.`); }},
});
const b3c7AnvilCh = who => ({t:who === 'dannet' ? '"Show me how the acolytes carried each other on the wall."' : '"Show us how the Grey Swords carry each other."', check:['wits', 16], trick:'b3_c7_anvil',
  req:()=>!S.f.b3_c7_anvilTried && !(S.tricks && S.tricks.b3_c7_anvil), fx:()=>{ S.f.b3_c7_anvilTried = 1; S.f.b3_c7_anvilBy = who; },
  edges:id=>[id === 'greysword' && ['she was on the wall when he taught it', 3], id === 'ohl' && ['a healer knows where the pain sits', 1], id === 'brisk' && ['she has stood in front of things all her life', 1], id === 'kettle' && ['she is watching the quorls, not the hands', -1]],
  go:'b3_c7_anvil_ok', fail:'b3_c7_anvil_miss'});

/* ---- the kit: the grey mail off a Seerdomin captain (both roads), and a K'ell Hunter's blade (the mortal fight, either road) ---- */
const B3C7_GEAR = {
  b3_c7_greymail:{name:'Seerdomin grey mail', slot:'armour', who:null, ac:1, hp:2, line:'Fine grey links off a Seerdomin captain, cold to the touch however long you wear it. The first blow in each fight lands 2 lighter: the links take it, and ring.'},
  b3_c7_hunterblade:{name:'A K\'ell Hunter\'s blade', slot:'weapon', who:['sgt', 'brisk', 'greysword'], dmg:[2, 6, 2], line:'A blade as long as a man\'s arm, broken off at the wrist of the thing that grew it. It was never forged. Nobody who carries it says it is light, and nobody who carries it puts it down.'},
};
/* the grey mail: the first blow on its wearer in a fight lands 2 lighter (Book Three only) */
{ const _hurt = hurt;
  hurt = function(u, n, crit){
    if (S && S.book === 'moi' && B && u && u.side === 'p' && !u.ally && n > 0 && !(B.used && B.used['b3c7mail_' + u.id]) && S.gear && S.gear[u.id] && Object.values(S.gear[u.id]).includes('b3_c7_greymail')) {
      B.used['b3c7mail_' + u.id] = 1; n = Math.max(0, n - 2); float(u, 'grey links', '#b8c0c8'); }
    return _hurt(u, n, crit); }; }
/* the items' pictures, in Book One's card style on a cold ground (the artist's file may draw them over these) */
if (typeof ART !== 'undefined') {
  ART['item/b3_c7_greymail'] ??= `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="Seerdomin grey mail"><defs><radialGradient id="c7m-bg" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#2a3038"/><stop offset="1" stop-color="#0b0d10"/></radialGradient><pattern id="c7m-ring" width="8" height="7" patternUnits="userSpaceOnUse"><circle cx="4" cy="3.5" r="2.6" fill="none" stroke="#9aa2ac" stroke-width="1.1"/></pattern></defs><rect width="200" height="150" rx="3" fill="url(#c7m-bg)"/><path d="M70 30 L130 30 L146 52 L138 120 L62 120 L54 52 Z" fill="#4a5058"/><path d="M70 30 L130 30 L146 52 L138 120 L62 120 L54 52 Z" fill="url(#c7m-ring)" opacity=".9"/><path d="M54 52 L36 76 L48 84 L62 64 M146 52 L164 76 L152 84 L138 64" fill="#3e444c" stroke="#8a929c" stroke-width="1"/><path d="M84 30 Q100 44 116 30" fill="none" stroke="#c8d0d8" stroke-width="2"/><path d="M62 120 L138 120" stroke="#6a7078" stroke-width="3"/><circle cx="100" cy="74" r="7" fill="none" stroke="#d8dee6" stroke-width="1.4" opacity=".7"/></svg>`;
  ART['item/b3_c7_hunterblade'] ??= `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A K'ell Hunter's blade"><defs><radialGradient id="c7h-bg" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#2c2a2e"/><stop offset="1" stop-color="#0c0b0d"/></radialGradient><linearGradient id="c7h-bl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a8a49a"/><stop offset="1" stop-color="#5e5a52"/></linearGradient></defs><rect width="200" height="150" rx="3" fill="url(#c7h-bg)"/><path d="M28 118 Q90 92 176 26 Q150 66 60 126 Z" fill="url(#c7h-bl)"/><path d="M40 116 Q100 86 170 32" fill="none" stroke="#d8d4c8" stroke-width="1.2" opacity=".7"/><path d="M28 118 L18 128 L30 132 L44 124 L60 126" fill="#6a5a4a" stroke="#3a3028" stroke-width="1.5"/><path d="M22 122 L30 126 M26 118 L36 124" stroke="#2a2018" stroke-width="1.4"/></svg>`;
  if (typeof ART_SIZE !== 'undefined') { ART_SIZE['item/b3_c7_greymail'] ??= [200, 150]; ART_SIZE['item/b3_c7_hunterblade'] ??= [200, 150]; }
}

/* ---- the scenes the river road borrows from the plain's drawing (the hill outside Coral, by day and at dusk) ---- */
SCENEX.b3_c7_hill ??= (cv, t) => drawPlain(cv, 'hills', t);
SCENEX.b3_c7_hill_dusk ??= (cv, t) => drawPlain(cv, 'hills_dusk', t);

/* ---- the Deck at the first halt: the Gate ---- */
B3DECK[7] = {get scene(){ return b3c7Flew() ? 'b3_c7_coral' : 'b3_c7_hill'; },
  get where(){ return b3c7Flew() ? 'a flat stone under the cedar screen, by a fire you cannot see from ten paces' : 'a Malazan shield laid face up in the grass, on a hill full of other people\'s armies'; },
  get set(){ return b3c7Flew() ? 'The last night in the entrenchments, with Coral below, its fires in rings round the keep.' : 'The last morning on the hill, with Coral two hours off, and smoke going up from it as straight as a rope.'; },
  back:()=>startExplore(), backT:'Back to the lines.',
  say:{tuft:`"One more," Tuft says. "The last of the road." She shuffles without looking, and she is not looking at the cards at all: she is looking at the city. "I want to know who's standing in the door."`,
    sohra:`"The bones are tired," Sohra says. "So am I." She shakes them anyway, close to her ear, listening. "One more throw. For the city with the cold in it."`,
    benna:`Old Benna has come up with the baggage, as laundresses do, wherever the army goes. "Last one of the season," she says. "Half price. Nobody's coming back to pay the other half, are they." It is not a question.`}};

/* ---- the words this chapter adds to Book Three's glossary ---- */
GLOSSX.moi.push(
  [7, 'Coral', 'The Pannion Seer\'s city on the coast, under its keep. The Host came to it out of the mountains and down the Maurik, and Brood\'s army over the land.', ()=>!!(S.f && S.f.b3_c7_started)],
  [7, 'The Shield Anvil', 'Itkovian of the Grey Swords, who carried Fener\'s grief, and at Coral took on the grief of the T\'lan Imass so that they could rest, and died of it. Soldiers of every army raised his barrow, a gift at a time.', ()=>!!(S.f && S.f.b3_c7_barrow)],
  [7, 'K\'ell Hunters at Coral', 'Some eight hundred of them came against the alliance outside the city. Trake\'s Legion went into them, and the tiger with it.', ()=>!!(S.f && (S.f.b3_c7_hunters || S.f.b3_c7_square))]);

/* ---- tuning on top of Chapter 7's curve (31c FSCALE), from tools/balance.mjs against a level-8 Fourth: the last fights have teeth.
   The mortal fights (hunt, stakes) sit where a smart squad wins every time and loses someone about one fight in six or eight. ---- */
{ const M = {hp:1.2, atk:2, dmg:2}, H = {hp:1.4, atk:3, dmg:3}, O = {hp:1.2, atk:2, dmg:2};
  Object.assign(BTUNE, {b3_c7_hunt:M, 'b3_c7_hunt:2':M, b3_c7_stakes:M, 'b3_c7_stakes:2':M,
    b3_c7_trenchfight:H, 'b3_c7_trenchfight:2':H, b3_c7_probe:H, 'b3_c7_probe:2':H, b3_c7_side:H, 'b3_c7_side:2':H, b3_c7_herds:H, 'b3_c7_herds:2':H,
    b3_c7_stairs:O, b3_c7_gully:O}); }

const B3CH7 = {
  title:'Coral', number:'Seven',
  /* the road decides where the chapter opens: the entrenchments for the lift, the alliance's hill for the river */
  get area(){ return this.areas[b3c7Known() && !b3c7Flew() ? 1 : 0]; },
  intro:{
    get loc(){ return b3c7Known() && !b3c7Flew() ? 'Outside Coral' : 'Above Coral'; },
    get sub(){ return b3c7Known() && !b3c7Flew() ? 'The alliance\'s hill · the last morning' : 'The hidden entrenchments · night'; },
    get scene(){ return b3c7Known() && !b3c7Flew() ? 'b3_c7_hill' : 'b3_c7_coral'; },
    get cap(){ return b3c7Known() && !b3c7Flew() ? 'A long hill above a plain, two armies on it, and at the far edge of the plain a dark city by the sea.' : 'Coral from the mountains at night: the keep on its height, the fires in rings, and the sea behind it, black.'; },
    paras:[
()=>!b3c7Known() ? `The Host split on the road south. Night after night the Black Moranth came and took whole companies away, and nobody told Brood, and nobody told the Seer, and the ones who stayed on the road built barges on the Maurik and did not ask where the others had gone.

Now it is the end of the road, one way or the other. Coral is near. You know where the Fourth went when the Host split. The page has to be told.`
  : b3c7Flew() ? `The quorls set the Fourth down in the mountains a week ago, in the dark, on a shelf of rock above a drop nobody could see the bottom of. Since then the Fourth has lived in a trench under a screen of cedar and moss, with half of Onearm's Host packed into the hills around it, and has not lit a fire anyone could see from ten paces.`
  : `The barges came down the Maurik in a few days, as Gruntle said they would, with Whiskeyjack's four thousand in them and half of those cooks, farriers and clerks. Then the march again, over the last of the Domin, until the column came up with Caladan Brood's army on a long hill above the plain, and the plain ran out at the sea, and on the edge of the sea there was a city.`,
()=>!b3c7Known() ? '' : b3c7Flew() ? `Below, a long way below, is Coral. The Seer's keep stands on its height in the middle of it like a fist. The Pannion army that was supposed to be facing Brood across a plain somewhere is in the city, and on its walls, and does not know that the hills behind it are full of Malazans.

${b3In('kettle') ? 'Kettle has counted the quorl roosts every night. ' : ''}${b3In('brisk') ? 'Brisk has walked to the Fourth Regiment\'s trench every night, and stood at the edge of it until Tav looked up. ' : ''}You have counted the Fourth. It comes out the same every time. That is all a sergeant asks of a number.`
  : `Coral. Two hours off, if nobody is trying to stop you. Everybody will be.

Whiskeyjack is on the hilltop with Brood and Korlat, and the leg is worse. ${b3In('tuft') ? 'The child is up there too, with the Rhivi, and Tuft has been looking at the hilltop since the sun came up. ' : ''}Somewhere in the mountains to the east, if anyone says it aloud, is the other half of the Host. It is not a thing to say aloud.`,
()=>!b3c7Known() ? '' : `This is the last of it. ${b3Mind() === 'haunted' ? 'The Domin is in every head in the squad; nobody has slept well since the Catlin.' : b3Mind() === 'shaken' ? 'The Domin has been in the squad\'s sleep for weeks.' : 'The squad has come through the Domin with its nerve, mostly.'} Whatever happens at Coral happens to all of it.`],
    go:'To the lines', node:'b3_c7_start'},

  areas:[
    /* 16 x 12. THE LIFT: the hidden entrenchments. . rock  , moss  # cliff  = cedar screen  T the forward trench mouth  F shielded fire  q quorl roost */
    { id:'b3_c7_entrench', title:'The mountains · above Coral', sub:'Night · the hidden entrenchments', hint:'Tap ground to move · tap a figure to talk · the trench mouth goes down to the forward line; the roost, the fire', decor:'b3_c6_mountain_night', dark:true, amb:'night',
      map:[ "################",
            "#..,..=====..q.#",
            "#.,....,.......#",
            "#..T.....,..,..#",
            "#......##......#",
            "#.,.F..##..,...#",
            "#..............#",
            "#.====...,..=..#",
            "#....,.........#",
            "#.,......,..,..#",
            "#...,.......,..#",
            "################" ],
      walk:'.,=', triggers:{T:'b3_c7_trench', F:'b3_c7_f_fire', q:'b3_c7_roost'}, start:{x:7, y:9},
      quest:()=> S.f.b3_c7_trenchDone ? 'Dawn is coming. Down the mountain, into Coral, behind the Bridgeburners.' : !S.f.b3_c7_exchange ? 'The High Fist and the Bridgeburners\' mage are over a map, by the cedar screen.' : 'The forward trench, when the squad is ready. The grey sorcery comes tonight.',
      npcs:[
        {id:'qb7', name:'Quick Ben', kind:'qb', x:6, y:2, node:()=>S.f.b3_c7_exchange ? 'b3_c7_qb_again' : 'b3_c7_qb', fresh:()=>!S.f.b3_c7_exchange},
        {id:'dujek7', name:'Dujek Onearm', kind:'dujek', x:8, y:2, node:()=>'b3_c7_dujek', fresh:()=>!S.f.b3_c7_dujek},
        {id:'twist7', name:'Achievant Twist', kind:'moranth', x:12, y:2, node:()=>'b3_c7_twist', fresh:()=>!S.f.b3_c7_twist},
        {id:'tav7', name:'Tav', kind:'tav', x:3, y:8, node:()=>'b3_c7_tav', fresh:()=>!S.f.b3_c7_tav},
        {id:'art7', name:'The standard bearer', kind:'artanthos', x:10, y:5, node:()=>'b3_c7_art', fresh:()=>!S.f.b3_c7_art},
        {id:'bb7', name:'A Bridgeburner', kind:'b3_c7_bridgeburner', x:13, y:8, node:()=>'b3_c7_bb', fresh:()=>!S.f.b3_c7_bb},
        {id:'dannet7', name:'Dannet', kind:'greysword', x:5, y:6, node:()=>'b3_c7_dannet', show:()=>b3In('greysword'), fresh:()=>b3In('greysword') && !S.f.b3_c7_dannet} ] },

    /* 16 x 12. THE RIVER: the alliance's position on the hill outside Coral, the last morning. . churned earth  , grass  # rock  = tent  F fire  x the broken stake line at the foot of the hill */
    { id:'b3_c7_field', title:'Outside Coral · the alliance\'s hill', sub:'Morning · Brood\'s army and Whiskeyjack\'s column', hint:'Tap ground to move · tap a figure to talk · the stake line at the foot of the hill; the fire', decor:'b3_c7_field', amb:'wind',
      map:[ "################",
            "#..,..=...,..=.#",
            "#.,......#.....#",
            "#...F..,.##..,.#",
            "#.......,......#",
            "#.,..=.....=...#",
            "#........,.....#",
            "#..,..#.....,..#",
            "#..............#",
            "#.,.,......,...#",
            "#xxxxxx..xxxxxx#",
            "################" ],
      walk:'.,', triggers:{x:'b3_c7_stakeline', F:'b3_c7_r_fire'}, start:{x:7, y:9},
      quest:()=> S.f.b3_c7_hunters ? 'Up the hill. Now.' : S.f.b3_c7_probeDone ? 'Something is coming across the plain that is not an army of men. The stake line.' : !S.f.b3_c7_wj ? 'Whiskeyjack, on the hilltop. He will have a post for the Fourth.' : 'The stake line at the foot of the hill: the Fourth\'s post.',
      npcs:[
        {id:'wj7', name:'Whiskeyjack', kind:'wj', x:7, y:1, node:()=>S.f.b3_c7_wj ? 'b3_c7_wj_again' : 'b3_c7_wj', fresh:()=>!S.f.b3_c7_wj},
        {id:'fox7', name:'Silverfox', kind:'silverfox', x:11, y:2, node:()=>'b3_c7_fox', fresh:()=>!S.f.b3_c7_fox},
        {id:'mhybe7', name:'An old Rhivi woman', kind:'rhivi', x:13, y:3, node:()=>'b3_c7_mhybe', fresh:()=>!S.f.b3_c7_mhybe},
        {id:'korlat7', name:'Korlat', kind:'korlat', x:5, y:2, node:()=>'b3_c7_korlat', fresh:()=>!S.f.b3_c7_korlat},
        {id:'kallor7', name:'Kallor', kind:'kallor', x:3, y:1, node:()=>'b3_c7_kallor', fresh:()=>!S.f.b3_c7_kallor},
        {id:'brood7', name:'Caladan Brood', kind:'brood', x:9, y:4, node:()=>'b3_c7_brood', fresh:()=>!S.f.b3_c7_brood},
        {id:'itko7', name:'The Shield Anvil', kind:'b3_greysword', x:2, y:6, node:()=>'b3_c7_itko', fresh:()=>!S.f.b3_c7_itko},
        {id:'herd7', name:'A Rhivi herd-boy', kind:'rhivi', x:13, y:7, node:()=>S.f.b3_c7_gullyDone ? 'b3_c7_herdboy_again' : 'b3_c7_herdboy', fresh:()=>!S.f.b3_c7_herdboy} ] },

    /* 16 x 12. THE RIVER, after: the hilltop at dusk. . churned earth  , grass  # rock  = the tent where he lies  F fire  x broken stakes */
    { id:'b3_c7_hill', title:'Outside Coral · the hilltop', sub:'Dusk · after', hint:'Tap ground to move · tap a figure to talk · the tent; the fire', decor:'b3_c7_field', dark:true, amb:'dusk',
      map:[ "################",
            "#....,...,.....#",
            "#.,..=.=...,...#",
            "#.......,..#...#",
            "#..,...F.......#",
            "#....,....,..,.#",
            "#.#............#",
            "#....,.........#",
            "#.,......,..#..#",
            "#..x.x..x..x.,.#",
            "#.......,......#",
            "################" ],
      walk:'.,', triggers:{'=':'b3_c7_h_tent', F:'b3_c7_h_fire'}, start:{x:7, y:10},
      quest:()=> !S.f.b3_c7_htent ? 'The tent on the crest. He is in it.' : !S.f.b3_c7_hspawn ? 'The fire. Then look at the city.' : 'To the shore, when the squad is ready.',
      npcs:[
        {id:'hkorlat', name:'Korlat', kind:'korlat', x:9, y:3, node:()=>'b3_c7_h_korlat', fresh:()=>!S.f.b3_c7_hkorlat},
        {id:'hbearer', name:'The standard bearer', kind:'artanthos', x:12, y:5, node:()=>'b3_c7_h_bearer', fresh:()=>!S.f.b3_c7_hbearer},
        {id:'hfox', name:'Silverfox', kind:'silverfox', x:4, y:5, node:()=>'b3_c7_h_fox', fresh:()=>!S.f.b3_c7_hfox},
        {id:'hbrood', name:'Caladan Brood', kind:'brood', x:6, y:2, node:()=>'b3_c7_h_brood', fresh:()=>!S.f.b3_c7_hbrood} ] },

    /* 16 x 12. Both roads: the shore below the hill, the days after. . churned earth  , grass  # rock  = the Host's lines  F fire  x the old stake line, where the barrow goes up */
    { id:'b3_c7_shore', title:'Coral · the shore', sub:'The days after', hint:'Tap ground to move · tap a figure to talk · the barrow beyond the old stakes; the fire; the Host\'s lines for the road out', decor:'b3_c7_field', amb:'lake',
      map:[ "################",
            "#.,....x.,..,..#",
            "#....,.x.......#",
            "#.,....x...#...#",
            "#......,....,..#",
            "#..#.....F.....#",
            "#.,....,.......#",
            "#.....,....,...#",
            "#..==......,.#.#",
            "#..==..,.......#",
            "#.,......,..,..#",
            "################" ],
      walk:'.,', triggers:{x:'b3_c7_barrow', F:'b3_c7_s_fire', '=':'b3_c7_roads'}, start:{x:9, y:9},
      quest:()=> !S.f.b3_c7_barrow ? 'The Shield Anvil\'s barrow, past the old stake line. A gift each.' : !S.f.b3_c7_burial ? 'Moon\'s Spawn, out over the water. Everyone is going down to the shore.' : 'The fire, for the squad. The Host\'s lines, for the road out.',
      npcs:[
        {id:'stav', name:'Tav', kind:'tav', x:12, y:6, node:()=>'b3_c7_s_tav', show:()=>b3In('brisk'), fresh:()=>b3In('brisk') && !S.f.b3_c7_stav},
        {id:'sdujek', name:'Dujek Onearm', kind:'dujek', x:5, y:7, node:()=>'b3_c7_s_dujek', show:()=>!!S.f.b3_c7_burial, fresh:()=>!!S.f.b3_c7_burial && !S.f.b3_c7_sdujek},
        {id:'skruppe', name:'Kruppe', kind:'kruppe', x:13, y:4, node:()=>'b3_c7_s_kruppe', show:()=>!!S.f.b3_c7_burial, fresh:()=>!!S.f.b3_c7_burial && !S.f.b3_c7_skruppe},
        {id:'smoranth', name:'A Black Moranth', kind:'b3_moranth', x:2, y:3, node:()=>'b3_c7_s_moranth', fresh:()=>!S.f.b3_c7_smoranth},
        {id:'sfox', name:'Silverfox', kind:'silverfox', x:5, y:2, node:()=>'b3_c7_s_fox', show:()=>b3c7Flew(), fresh:()=>b3c7Flew() && !S.f.b3_c7_sfox},
        {id:'sgrey', name:'The Grey Swords', kind:'b3_greysword', x:10, y:2, node:()=>'b3_c7_s_grey', fresh:()=>!S.f.b3_c7_sgrey},
        {id:'srhivi', name:'Rhivi riders', kind:'b3_rhivi_rider', x:13, y:9, node:()=>'b3_c7_s_rhivi', fresh:()=>!S.f.b3_c7_srhivi} ] },

    /* 16 x 12. THE LIFT: Coral's streets, behind the Bridgeburners. . black paving  , rubble  # wall  F fire  s a stair  g the square ahead  c coral-stone */
    { id:'b3_c7_coral', title:'Coral · the streets', sub:'Before dawn · behind the Bridgeburners', hint:'Tap ground to move · tap a figure to talk · the square ahead; a stair', decor:'b3_c7_coral', dark:true, amb:'city_night',
      map:[ "################",
            "#..,.#....#.,.s#",
            "#.c..#.F..#....#",
            "#....,....,..c.#",
            "###.####..####.#",
            "#......c.......#",
            "#.,..F....,..,.#",
            "#....###.###...#",
            "#.c..#.....#.,.#",
            "#....#..g..#...#",
            "#.,............#",
            "################" ],
      walk:'.,c', triggers:{g:'b3_c7_square', s:'b3_c7_stair'}, start:{x:7, y:10},
      quest:()=> S.f.b3_c7_squareDone ? (S.f.b3_c7_news ? 'Out of the city, to the shore.' : 'Something is coming down out of the sky over the keep.') : 'The square ahead. The Bridgeburners are past it, and something is coming down the street behind them.',
      npcs:[
        {id:'chur', name:'Hurlochel', kind:'hurlochel', x:3, y:5, node:()=>'b3_c7_news', show:()=>!!S.f.b3_c7_spawn, fresh:()=>!!S.f.b3_c7_spawn && !S.f.b3_c7_news},
        {id:'ctav', name:'Tav', kind:'tav', x:12, y:5, node:()=>'b3_c7_tav_found', show:()=>!!S.f.b3_c7_squareDone && b3In('brisk'), fresh:()=>!!S.f.b3_c7_squareDone && b3In('brisk') && !S.f.b3_c7_tavFound},
        {id:'cbb', name:'A Bridgeburner', kind:'b3_c7_bridgeburner', x:9, y:3, node:()=>'b3_c7_bb2', fresh:()=>!S.f.b3_c7_bb2} ] } ],

  battles:{
    /* THE LIFT, the night before: the grey sorcery comes down on the forward trench, and the Beklites come up the slope under it. Then the captain. */
    b3_c7_trenchfight:{title:'The forward trench', style:'b3_c6_mountain_night', dark:true, warrenText:'Above Coral, night · the warrens fouled to the bottom, and the grey sorcery coming down on top of it', warren:{denul:.8, meanas:.8}, music:'battle',
      map:["..#.....","........",".,...#..","........","#..,....","....#...","........","##....##","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_beklite',1,1],['b3_beklite',4,0],['b3_beklite',6,1],['b3_c7_greymage',3,0]], xp:150, after:'b3_c7_after_trench',
      preText:'Kettle\'s sharper goes off in the cut the Beklites are climbing, and the cut comes down on the front of them, stone and all.',
      waves:[{round:3, foes:[['b3_beklite',0,3],['b3_beklite',7,2]], text:'More of them, out of the dark on the flanks, where the slope was supposed to be too steep.'}],
      stage2:{title:'The cedar screen', xp:70,
        text:()=>`The trench is held. Up and down the line the grey sorcery is still coming down, and men in it are screaming, and the legion is holding anyway, the way Quick Ben said it would: badly, and holding.

At the cedar screen, where the trench turns, a Seerdomin captain has come through with a handful of Beklites, very calm, the grey mace on his shoulder, looking for whoever gives the orders. ${b3In('brisk') ? 'Brisk sets her shield. "Me," she says, to nobody.' : 'He is looking at you.'}`,
        map:["........",".#....#.","........","...,....","........","..#..#..","........","........",",.......","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c7_greyofficer',3,1],['b3_beklite',1,2],['b3_beklite',6,2],['b3_c7_greymage',4,0]]} },

    /* THE LIFT, optional: a stair where a quorl came down, with its rider, and Beklites holding the top of it */
    b3_c7_stairs:{title:'The stair', style:'b3_c7_coral', dark:true, warrenText:'Coral · the warrens poisoned, and cold besides', warren:{denul:.8, meanas:.8}, music:'battle',
      map:["#..##..#","#......#","#.#..#.#","#......#","##....##","#......#","#.c....#","#......#","#......#","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_beklite',2,1],['b3_beklite',5,1],['b3_beklite',3,3],['b3_c7_greymage',5,0]], xp:90, after:'b3_c7_after_stair',
      aid:{kind:'b3_moranth', at:[1, 7], need:8} },

    /* THE LIFT, MORTAL: the square. A K'ell Hunter coming down the street behind the Bridgeburners, and Beklites with it. Then the keep road. */
    b3_c7_hunt:{title:'The square', style:'b3_c7_coral', dark:true, mortal:true, warrenText:'Coral · the warrens poisoned · whoever falls here stays down', warren:{denul:.8, meanas:.8}, music:'battle', hurtMost:true,
      map:["#......#","#.c..c.#","........","..#..#..","........","........","..#..#..","........","........","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_khell',3,1],['b3_beklite',1,2],['b3_beklite',6,2]], xp:180, after:'b3_c7_after_hunt',
      aid:{kind:'b3_moranth', at:[1, 8], need:8},
      waves:[{round:3, foes:[['b3_beklite',0,4],['b3_beklite',7,4]], text:'Beklites come into the square from the side streets, because the Hunter is there and they think it is winning.'},
             {round:4, foes:[['b3_c7_hurthunter',6,0]], text:'A second one comes down the north street after the first, slower, one blade-arm hanging. Something on the walls has already had a piece of it. It wants the rest of the morning anyway.'}],
      stage2:{title:'The keep road', xp:80, keepAllies:true,
        text:()=>`Both of them are down. They go on moving long after they are down, and nobody goes near them until they stop.

Up the street, between the square and the keep, a company of Seerdomin is coming the other way, in good order, toward the Bridgeburners' backs. The sky over the keep is full of quorls and something else, bigger, that is not a quorl. ${b3In('kettle') ? '"Twist\'s lot," Kettle says, looking up. "They\'re dying up there." Then she looks at the Seerdomin. "Right."' : 'Up there the Moranth are dying. Down here there is a street to hold.'}`,
        map:["#.#..#.#","........","........","..#..#..","........","....c...","........",".#....#.","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_seerdomin',2,1],['b3_seerdomin',5,1],['b3_beklite',3,2],['b3_beklite',6,3],['b3_c7_greymage',4,0]]} },

    /* THE LIFT, the other street: leave the Hunter to the Moranth's munitions and hold the side street the Beklites are using */
    b3_c7_side:{title:'The side street', style:'b3_c7_coral', dark:true, warrenText:'Coral · the warrens poisoned, and cold besides', warren:{denul:.8, meanas:.8}, music:'battle',
      map:["#.#..#.#","#......#","#......#","##.##.##","#......#","#......#","#.#..#.#","#......#","#......#","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_beklite',2,1],['b3_beklite',5,1],['b3_beklite',3,2],['b3_seerdomin',4,0]], xp:150, after:'b3_c7_after_side',
      aid:{kind:'b3_moranth', at:[1, 8], need:7},
      stage2:{title:'The cistern court', xp:60, keepAllies:true,
        text:()=>`The side street is held. Behind it there is a court with a cistern in it, and the Beklites who were coming down the street to take the square from the flank are in the court, with a Seerdomin among them who has worked out what the Fourth are doing there.`,
        map:["########","#......#","#.#..#.#","#......#","#..cc..#","#......#","#......#","#.#..#.#","#......#","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c7_greyofficer',3,1],['b3_beklite',1,3],['b3_beklite',6,3],['b3_c7_greymage',4,1]],
        waves:[{round:2, foes:[['b3_beklite',1,1],['b3_beklite',5,1]], text:'Two more come over the court wall from the next street.'}]} },

    /* THE RIVER: the Pannion probe at the foot of the hill, before anything else comes. Then the gully mouth and its captain. */
    b3_c7_probe:{title:'The foot of the hill', style:'b3_c7_field', warrenText:'Outside Coral · the warrens poisoned, and the Seer\'s cold in the air', warren:{denul:.8, meanas:.8}, music:'battle',
      map:["........","..#.....","......#.","........","...,....","..,.....","........","#......#","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_beklite',1,1],['b3_beklite',4,0],['b3_beklite',6,1],['b3_c7_greymage',3,0]], xp:150, after:'b3_c7_after_probe',
      aid:{kind:'b3_andii', at:[7, 8], need:8},
      preText:'Kettle\'s sharper goes off under the front rank as it comes up through the grass, and the front rank is not a rank afterwards.',
      waves:[{round:3, foes:[['b3_beklite',0,4],['b3_beklite',7,3]], text:'More of them, up out of the long grass on either side, where nobody had looked.'}],
      stage2:{title:'The gully mouth', xp:70, keepAllies:true,
        text:()=>`They fall back down the slope into a dry gully, and the Fourth go after them, because the gully runs behind the herd lines and up toward the hill's flank.

At the gully mouth a Seerdomin captain is waiting for them, very calm, the grey mace on his shoulder.`,
        map:["##....##","#......#","..#..#..","........","........","...,....","........","#......#","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c7_greyofficer',3,1],['b3_beklite',1,2],['b3_beklite',6,2],['b3_c7_greymage',4,0]]} },

    /* THE RIVER, optional: Pannion skirmishers in the gully behind the herd lines */
    b3_c7_gully:{title:'The herd gully', style:'b3_c7_field', warrenText:'Outside Coral · the warrens poisoned', warren:{denul:.8, meanas:.8}, music:'battle',
      map:["#......#","#..#...#","........","........","..#.....","......#.","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c7_skirm',1,1],['b3_c7_skirm',5,0],['b3_c7_skirm',6,2],['b3_beklite',3,2]], xp:90, after:'b3_c7_after_gully',
      aid:{kind:'b3_rhivi_rider', at:[7, 8], need:8} },

    /* THE RIVER, MORTAL: the stake line, where the Hunters come through the Legion's flank. Then the second, already hurt. */
    b3_c7_stakes:{title:'The stake line', style:'b3_c7_field', mortal:true, warrenText:'Outside Coral · the warrens poisoned · whoever falls here stays down', warren:{denul:.8, meanas:.8}, music:'battle', hurtMost:true,
      map:["........","........","..#..#..","........","........","........",".#....#.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_khell',3,1],['b3_beklite',1,2],['b3_beklite',6,2]], xp:180, after:'b3_c7_after_stakes',
      aid:[{kind:'b3_greysword', at:[1, 8], need:8}, {kind:'b3_rhivi_rider', at:[6, 9], need:9}],
      waves:[{round:3, foes:[['b3_beklite',0,3],['b3_beklite',7,3]], text:'Beklites come through the gap behind the Hunter, where it has broken the stakes for them.'}],
      stage2:{title:'Behind the stakes', xp:80, keepAllies:true,
        text:()=>`It goes down. Out on the plain the tiger is still in the K'Chain Che'Malle, green and enormous, and there are fewer of the Legion every time you look.

Then another comes through the gap in the stakes, slower than the first, with a stripe of torn grey down its side where something with claws has had it. It does not stop. It has never been taught to stop.`,
        map:["........","........","...#....","........","........","..#..#..","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c7_hurthunter',3,1],['b3_beklite',6,2]]} },

    /* THE RIVER, the other post: the herd lines at the back of the hill, where Beklites have come round to the Rhivi children */
    b3_c7_herds:{title:'The herd lines', style:'b3_c7_field', warrenText:'Outside Coral · the warrens poisoned', warren:{denul:.8, meanas:.8}, music:'battle',
      map:["........","..#.....","........",".....#..","........","..,.....","........","#......#","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_beklite',1,1],['b3_beklite',4,1],['b3_beklite',6,0],['b3_seerdomin',3,0]], xp:150, after:'b3_c7_after_herds',
      aid:{kind:'b3_rhivi_rider', at:[7, 8], need:7},
      stage2:{title:'The children\'s fire', xp:60, keepAllies:true,
        text:()=>`The herd lines are held. Behind them, at the children's fire, a Seerdomin and the last of his Beklites have got in among the wagons, and the Rhivi children are under the wagons, very quiet, the way the herds taught them.`,
        map:["........","..#..#..","........","........","...,....","........",".#....#.","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c7_greyofficer',3,1],['b3_beklite',1,2],['b3_beklite',6,2],['b3_c7_greymage',4,0]],
        waves:[{round:2, foes:[['b3_beklite',0,4],['b3_beklite',7,4]], text:'More of them, in among the wagons from the far side.'}]} } },

  foes:{
    b3_c7_greyofficer:{name:'Seerdomin captain', sig:'Σ', kind:'seerdomin', hp:40, ac:16, atk:6, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['rally', 'parry'], verb:'brings the grey mace down on'},
    b3_c7_greymage:{name:'Seerdomin sorcerer', sig:'σ', kind:'seerdomin', hp:18, ac:13, atk:5, dmg:[1,8,2], rng:5, mv:4, init:2, sk:['daze'], verb:'throws grey sorcery at'},
    b3_c7_hurthunter:{name:'A wounded K\'ell Hunter', sig:'K', kind:'khell', hp:40, ac:15, atk:6, dmg:[2,8,2], rng:1, mv:5, init:2, boss:true, verb:'scythes a blade-arm through'},
    b3_c7_skirm:{name:'Pannion skirmisher', sig:'s', kind:'beklite', hp:11, ac:12, atk:4, dmg:[1,6,1], rng:4, mv:5, init:2, sk:['pin'], verb:'throws a javelin at'} },

  gear:B3C7_GEAR,

  scenes:{
    b3_c7_coral:{loc:'Above Coral', sub:'The mountains, at night', cap:'Coral from the mountains at night: the keep on its height, the fires in rings, and the sea behind it, black.', amb:'hills'},
    b3_c7_hill:{loc:'Outside Coral', sub:'The alliance\'s hill', cap:'A long hill above a plain, two armies on it, and at the far edge of the plain a dark city by the sea.', amb:'wind'},
    b3_c7_hill_dusk:{loc:'Outside Coral', sub:'The hilltop, at dusk', cap:'The hill at dusk, very quiet, and a great many people on it standing still.', amb:'dusk'},
    b3_c7_spawn:{loc:'Coral', sub:'Moon\'s Spawn', cap:'Something vast and dark coming down out of the sky onto the keep, from a long way off, slowly.', amb:'storm'},
    b3_c7_barrow:{loc:'Outside Coral', sub:'The Shield Anvil\'s barrow', cap:'A barrow on the plain at dawn, made of gifts, and soldiers of every army standing round it.', amb:'dusk'},
    b3_c7_sea:{loc:'The coast by Coral', sub:'The Rust Ocean', cap:'Moon\'s Spawn going out over the sea, low and slow and small on the horizon, with the sun going down behind it.', amb:'lake'},
    b3_c7_shore_night:{loc:'The coast by Coral', sub:'The shore · night', cap:'Stars down to the sea and nothing on the horizon, the companies still standing along the shingle with a few torches, and the Fourth among them in the dark.', amb:'lake'},
    b3_c7_finale:{loc:'The coast by Coral', sub:'After', cap:'A shore, the sea, and where the dark shape was, nothing.', amb:'lake'} },

  end:{
    host:['With the Host', 'Whiskeyjack died at Coral, on the hill, of the leg he would not give a week to, and Kallor walked out of the world\'s attention alive. The Shield Anvil is under a barrow of gifts on the plain. Moon\'s Spawn went out over the sea with the Bridgeburners in it. The Fourth stayed with Onearm\'s Host, whatever it is called now, and whatever comes next, which in this army is always more of it.'],
    daru:['To Darujhistan', 'Whiskeyjack died at Coral, on the hill, of the leg he would not give a week to, and Kallor walked out of the world\'s attention alive. The Shield Anvil is under a barrow of gifts on the plain. Moon\'s Spawn went out over the sea with the Bridgeburners in it. The Fourth went back the long way to the city of blue fire, where nobody keeps the Host\'s rolls, and a door wants standing in.'],
    standdown:['Stood down', 'Whiskeyjack died at Coral, on the hill, of the leg he would not give a week to, and Kallor walked out of the world\'s attention alive. The Shield Anvil is under a barrow of gifts on the plain. Moon\'s Spawn went out over the sea with the Bridgeburners in it. The sergeant stood the Fourth down on the shore, and each of them went their own road.'] },
  endScene:'b3_c7_finale',
  endCap:()=> `The shore by Coral. ${b3c7Fell().length ? `${b3c7And(b3c7Fell())} did not come off the ${b3c7Flew() ? 'square' : 'stake line'}. ` : ''}Out on the water there is nothing now where the dark shape was. You count the Fourth. It comes out at ${numw(b3c7Count())}. You count twice.`,
  tease:'The epilogue: the road out of Coral, a page for every one of the Fourth, and the end of Book Three.',

  extras:()=>{ const f = S.f, x = [];
    x.push(b3c7Flew() ? 'The Fourth came to Coral by quorl, out of the mountains, and went into the streets behind the Bridgeburners.' : 'The Fourth came to Coral down the Maurik with Whiskeyjack\'s column, and stood on the alliance\'s hill.');
    if (f.b3_c7_exchange) x.push('In the entrenchments the squad heard Quick Ben call it a fair exchange. The legion took the grey sorcery that night, badly, and held.');
    if (f.b3_c7_square === 'hunt') x.push('In the square the Fourth stood in front of a K\'ell Hunter so the Bridgeburners would not have to turn round.');
    if (f.b3_c7_square === 'side') x.push('The Fourth held a side street while the Moranth dealt with the Hunter in the square. The Moranth paid for it.');
    if (f.b3_c7_hunters === 'stakes') x.push('At the stake line the Fourth held the gap where the K\'ell Hunters came through Trake\'s Legion.');
    if (f.b3_c7_hunters === 'herds') x.push('The Fourth held the herd lines at the back of the hill, and the Rhivi children came out from under the wagons.');
    b3c7Fell().forEach(id => x.push(`${NAME(id)} fell at Coral. Ohl wrote the name.`));
    if (f.b3_c7_wjWord) x.push('Whiskeyjack told the sergeant, on the last morning, that Mallet would get his week after Coral.');
    if (f.b3_c7_kallorLook) x.push('Kallor looked at the sergeant once, on his way out. He remembered the face.');
    if (f.b3_c7_tavFound || f.b3_c7_stav) x.push('Tav came out of Coral alive. He is not singing yet.');
    if (f.b3_c7_barrow) x.push(`The squad laid ${f.b3_c7_gift ? `${f.b3_c7_gift}` : 'a gift'} on the Shield Anvil's barrow.`);
    if (f.b3_c7_burial) x.push('From the shore the Fourth watched Moon\'s Spawn go out over the sea with Whiskeyjack and the Bridgeburners in it.');
    if (f.b3_c7_dannetWolves) x.push('Dannet finished the wolf on her shield.');
    if (trickBy('b3_c7_anvil')) x.push(`${NAME(trickBy('b3_c7_anvil'))} steps in now, when a squadmate is hurt, and puts a hand where theirs is.`);
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b3_c7_started && `Coral, the Pannion Seer's city by the sea. ${b3c7Flew() ? 'Half of Onearm\'s Host lay hidden in the mountains above it, flown in by the Black Moranth.' : 'Whiskeyjack\'s column came down the Maurik to join Brood\'s army on a hill outside it.'}`,
    f.b3_c7_exchange && `Quick Ben told the High Fist the Bridgeburners and the mages could bloody the Seer's nose and take out ten thousand Beklites, a dozen mages and a Septarch. He called it a fair exchange. The Bridgeburners went into Coral from the night sky.`,
    (f.b3_c7_news || f.b3_c7_htent) && `Whiskeyjack died on the alliance's hill, defending the child, when his leg gave. Kallor killed him. A Host marine wounded Kallor; Kallor killed the two marines guarding the child. The standard bearer drove Kallor out and saved Korlat. Kallor is alive.`,
    (f.b3_c7_spawn || f.b3_c7_hspawn) && `Moon's Spawn came down out of the sky on the Seer's keep. Quick Ben, they say, took the Seer. Twist, Trotts and Hedge are dead.`,
    (f.b3_c7_news || f.b3_c7_htent) && `Trake's Legion went into some eight hundred K'ell Hunters, and the tiger with them. The Shield Anvil took the T'lan Imass's grief, and died of it.`,
    f.b3_c7_barrow && `The Shield Anvil's barrow was raised on the plain out of gifts, one each, through a night.`,
    f.b3_c7_burial && `Moon's Spawn, dying, became Whiskeyjack's tomb and the Bridgeburners', and Achievant Twist's. It went out over the sea and was lost.`].filter(Boolean); },

  dlg:{}
};
B3CH7.dlg.b3_c7_deck = () => b3DeckOffer(7);
B3CH7.dlg.b3_c7_card = () => b3DeckCard(7);

Object.assign(B3CH7.dlg, {
  /* ---- the start: the road the Fourth came in by ---- */
  b3_c7_start:()=> !b3c7Known() ? {sp:'The end of the road', fx:()=>{ S.f.b3_c7_started = 1; S.f.b3_domin = 1; }, txt:
`The Host split on the road south. Night after night the quorls came for whole companies, and the rest stayed on the road with Whiskeyjack and built barges on the Maurik.

Where were the Fourth when it split?`,
      ch:[{t:'On the quorls, with Dujek, into the mountains above Coral.', fx:()=>{ S.f.b3_c7_road = 'flew'; S.f.b3_flew = 1; }, go:'b3_c7_f_start'},
          {t:'On the barges, with Whiskeyjack\'s column, down the Maurik.', fx:()=>{ S.f.b3_c7_road = 'river'; S.f.b3_river = 1; }, go:()=>{ startExplore('b3_c7_field'); talk('b3_c7_r_start'); }}]}
    : b3c7Flew() ? DLG.b3_c7_f_start() : DLG.b3_c7_r_start(),

  /* ================= THE LIFT: the entrenchments ================= */
  b3_c7_f_start:()=>({sp:'The entrenchments · night', scene:'b3_c7_coral', fx:()=>{ S.f.b3_c7_started = 1; S.f.b3_domin = 1; S.f.b3_flew = 1; }, txt:
`The trench is two men deep and roofed with cedar boughs and moss, and the squad lives in it the way badgers live in a bank. The cold comes up out of the rock at night. It is not the mountains' cold. ${b3In('tuft') ? 'Tuft says it is older than the mountains, and will not say more.' : 'No one in the squad will put a name to it.'}

${b3In('kettle') ? `Kettle is lying on her back at the trench mouth, counting quorls against the stars. "Forty-one," she says. "Forty-one roosting. They brought half the Host up this mountain in the dark and lost two." A pause. "That's not nothing. That's two."

` : ''}${b3In('ohl') ? `Ohl has his kit open on his knees and is not using it. "Denul is sour up here," he says. "Sour all the way down. I reached for a cut on a boy's hand this morning and something reached back." He closes the kit. "I have a rule. I don't reach twice."

` : ''}${b3In('sohra') ? `Sohra is sitting with her back to the cedar screen and her eyes shut, very still, because there are no herds up here to sing to and she does not like it. "The Mhybe is a long way north," she says, without opening them. "In Capustan, with the two Daru. Far." She opens them. "I can feel her getting older from here."

` : ''}${b3In('greysword') ? `Dannet has the grey paint beside her and the half-wolf in her lap, and has not opened the pot. "No light to paint by," she says. "The wolf can wait. It has waited since Capustan."

` : ''}${b3In('ellis') ? `Ellis is at a gap in the screen with her gloved hand flat on the moss, looking down. "Three rings of fires round the keep," she says. "The gaps in them are where the officers sleep." She has counted every fire in Coral twice. "Pale was worse. Pale had a moon over it."

` : ''}${b3In('vell') ? `Vell is coiling his rope and uncoiling it and coiling it again. "A whole mountain," he says, "and nothing to throw a line at but cedar." He looks down at the city, at its walls, at the black roofs packed close together. "Those, though. Those are roofs."

` : ''}Below, a long way below, are Coral's fires. Somewhere among the cedars the High Fist is talking to somebody in a low voice, over a map.`,
      ch:[b3DeckChoice(7),
          {t:'Down the trench to see who is talking.', go:()=>startExplore()}]}),

  /* ---- Quick Ben and the High Fist: the fair exchange (the book's title, quoted here, once) ---- */
  b3_c7_qb:()=>({sp:'Quick Ben · the cedar screen', scene:'b3_c7_coral', fx:()=>{ S.f.b3_c7_exchange = 1; }, txt:
`They have a map on a flat rock and a shuttered lantern, and the High Fist is leaning on the rock with his one hand, and the Bridgeburners' mage is squatting on his heels beside it, smiling at something just past the edge of the light. Dujek does not send the Fourth away. You are the picket on this stretch of screen, and the High Fist has decided pickets are furniture.

"Twelve of the bastards," Quick Ben is saying. "Seerdomin. Mages, all of them, in the city. If I go in quiet and they come out loud, we can bloody their noses. Shank and Bluepearl have the ground laid. Maybe ten thousand Beklites, ten, twelve mages and a Septarch, against what it costs us." He looks up from the map, at Dujek, and does not smile. "High Fist, it is a fair exchange."

Dujek studies the map until the lantern gutters. "And whoever's in the forward trench when their grey sorcery comes down on it?"

"Takes it," Quick Ben says. "Badly. And holds."

The High Fist grunts. Then he turns his head, and sees you, and does not look surprised. "Sergeant," he says. "Which company?"`,
      ch:[{t:'"Seventh, High Fist. The forward trench is ours."', fx:()=>{ S.f.b3_c7_forward = 1; ally(1, 1, 'The forward trench'); }, go:'b3_c7_qb2'},
          {t:'Say nothing. Let him read the badge.', go:'b3_c7_qb2'}]}),
  b3_c7_qb2:()=>({sp:'Dujek Onearm', scene:'b3_c7_coral', txt:
`"Seventh." Dujek nods, as if that settled something he had been arguing with. "The marines who came up out of the Pale with all five. I remember." ${b3c7Mates().length >= 4 ? `He counts the squad behind you with his eyes. "Still most of you. Good."` : `He counts the squad behind you with his eyes, and gets a smaller number than he remembers, and lets it go.`}

"Tonight the forward trench takes what they send," he says. "The Bridgeburners go in after, from the sky, and the rest of us follow them down at first light into the streets. ${S.f.b3_c7_forward ? 'You said it was yours. It is.' : 'It\'s yours.'} Hold it."

Quick Ben is already looking at the Fourth the way he looks at most things: mildly, and as if somebody had told him a joke about you a long time ago. "Marines," he says. "Don't stand up when it starts. It'll want you to stand up."`,
      ch:[{t:'"High Fist."', go:()=>startExplore()}]}),
  b3_c7_qb_again:()=>({sp:'Quick Ben', txt:
`The mage is gone from the rock and back again without anyone seeing him move. ${b3In('tuft') ? 'Tuft watches him without blinking.' : ''}${b3In('vell') ? ' Vell looks at the rock, and the drop beside it, and the mage, and cannot work out the route, and minds.' : ''} "Don't stand up," he says again, pleasantly. "That's all. Everything else is just dying."`,
      ch:[{t:'Leave him to his map.', go:()=>startExplore()}]}),

  /* ---- Dujek: the leg, from the other side ---- */
  b3_c7_dujek:()=>({sp:'Dujek Onearm', fx:()=>{ S.f.b3_c7_dujek = 1; }, txt:
`The High Fist is sitting on an upturned crate, eating cold bread with the hand he has, the stump of the other arm strapped across his chest. He looks at you the way he looks at weather.

"You sound like a sergeant with a question," he says. "Ask it, or go and dig something."`,
      ch:[{t:'"Whiskeyjack. The leg. Did he ever give Mallet the week?"', fx:()=>{ S.f.b3_legSeen = 1; }, go:'b3_c7_dujek_leg'},
          {t:'"Brood\'s people. Do they know we\'re up here?"', go:'b3_c7_dujek_brood'},
          {t:'"No question, High Fist."', go:()=>startExplore()}]}),
  b3_c7_dujek_leg:()=>({sp:'Dujek Onearm', txt:
`Dujek stops chewing. For a moment he looks old, which he is, and tired, which he will not admit to.

"No," he says. "I told him. I told him on the road out of Darujhistan, and I told him at Capustan, and I told him again the night before the quorls took me, and he told me where to put it." He tears the bread in half with his teeth. "He's got four thousand people on the river and half of them can't hold a sword. He thinks if he lies down for a week, they'll notice." A grunt. "They'd notice."

He looks at the city. "After Coral," he says. "That's what he said. After Coral."`,
      ch:[{t:'"After Coral, then."', fx:()=>{ S.f.b3_c7_afterCoral = 1; }, go:()=>startExplore()}]}),
  b3_c7_dujek_brood:()=>({sp:'Dujek Onearm', txt:
`"No." Flat. "Nor the Seer. That's the point." He chews. "Brood's people think we went somewhere. Kallor's been telling Brood where for a month, and he's wrong, and he's not, and that's how you can tell a man's a liar who knows his trade."${S.f.b3_kallorEnemy ? `

He looks at you sideways. "Word got to Brood about what Kallor's men were doing at a well south of the Catlin. Marines, I heard." He doesn't ask. "It's the kind of thing Brood remembers."` : ''}

"When this is done they'll know where we went," Dujek says. "Whether they thank us is their business."`,
      ch:[{t:'Leave him to his bread.', go:()=>startExplore()}]}),

  /* ---- Kettle and Twist ---- */
  b3_c7_twist:()=>({sp:'Achievant Twist · the roosts', fx:()=>{ S.f.b3_c7_twist = 1; }, txt:
`The commander of the Black Moranth is a tall figure in black chitin standing among the quorls at the edge of the shelf, with his helm on, as they always are. His people move round him without being told. Quorls shift their long wings in the dark with a sound like paper.

${b3In('kettle') ? `Kettle has followed you over and is standing a pace too close to the nearest quorl, which is looking at her with one great faceted eye. "Achievant," she says. "Sir. How many go in tonight?"

The helm turns to her. A long pause, which with the Moranth means nothing at all, or everything.

"Forty," Twist says. His voice is dry and clicks a little at the ends of the words. "Forty go in, with the Bridgeburners."

"And how many come back?" Kettle asks.

Twist does not answer that. He turns back to the quorls. After a moment Kettle says, quietly, "Right," and does not ask again.` : `"Marines," Twist says, without turning. His voice is dry and clicks a little at the ends of the words. "Forty of mine go in tonight, with the Bridgeburners. The sky over the keep will be full. Do not look up when you are in the streets. Look at the street."`}`,
      ch:[{t:'"Good flying, Achievant."', fx:()=>{ b3c7Loy('kettle', 1); }, go:()=>startExplore()},
          {t:'Leave him to his roosts.', go:()=>startExplore()}]}),

  /* ---- Brisk and Tav, the night before ---- */
  b3_c7_tav:()=>({sp:'Tav · the Fourth Regiment\'s trench', fx:()=>{ S.f.b3_c7_tav = 1; }, txt: b3In('brisk') ?
`Tav is where Brisk said he would be: in the Fourth Regiment's trench two hundred paces along the screen, a big Cawn man with a heavy-infantry shield across his knees, singing under his breath. He cannot sing. He has never been able to sing. He is singing *The Wharf at Cawn*, which is about eels, and getting the eels wrong.

Brisk stands at the edge of his trench until he looks up. He looks up.

"Bris." He grins. "Come to collect?"${S.f.b3_c2_key === 'wagons' ? ' He looks past her at the squad. "The marines who came into the river for our wagons. Don\'t think I forgot."' : ''}

"Four coppers," Brisk says.

"Not paying." He holds up a fist and opens it, and there is nothing in it, and they both look at it, and it is the funniest thing either of them has ever seen. ${b3c7Sealed() ? `"You opened that letter yet?" "When you're dead." "Long wait." "I'm patient."` : `"You read the letter?" "Every word." "All twelve of them." "Eleven. You spelled *sergeant* with a j."`}

"We go down behind the Bridgeburners in the morning," Tav says. "Us first, then the marines." He looks at the squad, and at you. "Sergeant. She'll stand in front of things. I know her."`
  : `Tav is in the Fourth Regiment's trench two hundred paces along the screen, a big Cawn man with a heavy-infantry shield across his knees, singing under his breath, badly. He looks up at you and stops.

"You're Bris's sergeant," he says. "Were." He looks at the squad, counting, the way everyone counts the Fourth, and gets a number with a gap in it. "Right," he says, after a while. "Right." He doesn't sing again while you are there.`,
      ch: b3In('brisk') ? [{t:'"I\'ll keep her behind something, if I can."', fx:()=>{ b3c7Loy('brisk', 1); }, go:'b3_c7_tav_song'},
          {t:'"She stands where she\'s put. Same as you."', go:'b3_c7_tav_song'}] : [{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c7_tav_song:()=>({sp:'Tav', txt:
`"Liar," Tav says, cheerfully, to whichever you said. "Nobody keeps her behind anything."

Brisk sits down on the lip of his trench. She pulls a grass stem and turns it in her fingers until it is shredded. Then, very low, so that only you and Tav hear it, she says, "Don't stand in front of things."

Tav looks at her. "That's my line," he says. "That's in the letter."

"I know," Brisk says. "I'm giving it back."`,
      ch:[{t:'Leave them to it.', go:()=>startExplore()}]}),

  /* ---- the standard bearer ---- */
  b3_c7_art:()=>({sp:'The standard bearer', fx:()=>{ S.f.b3_c7_art = 1; }, txt:
`Dujek's standard bearer is a quiet man standing alone under the cedars with the Host's standard furled and lashed, looking down at the city as if he were reading it. He nods to you, and goes back to his reading.

${b3In('tuft') ? `Tuft has gone very still beside you. She does not look at him. She looks at the ground between his boots, as if something there were the wrong shape. When you are back at the trench she says, "I don't know." You did not ask. "I don't know, Sergeant. I just don't."` : `There is nothing to say to that, so you say nothing back.`}`,
      ch:[{t:'Back to the trench.', go:()=>startExplore()}]}),

  /* ---- a Bridgeburner ---- */
  b3_c7_bb:()=>({sp:'A Bridgeburner', fx:()=>{ S.f.b3_c7_bb = 1; }, txt:
`A Bridgeburner is sitting on a coil of rope at the end of the line with a satchel between his knees, checking munitions by touch, the way sappers do. He looks at your badge and nods. They all know the Seventh. Everybody in this army knows everybody in this army by now.

"You're the marines going down behind us," he says. "Stay behind us. If we turn round, it's because something's turned round with us, and you want to be somewhere else." He buckles the satchel. "First in, last out. That's us. You lot get the middle. The middle's where you live."${b3In('kettle') ? `

Kettle looks at his satchel with naked love. He sees it, and grins, and taps it. "Not for you, sapper," he says. "Not tonight."` : ''}${b3In('vell') ? `

Vell is looking at the coil the man is sitting on. "Good rope," he says. "Daru-laid. Wasted under a sapper." The Bridgeburner shifts to sit on it more firmly. "First in, rope boy," he says. "We'll want it on the way out."` : ''}`,
      ch:[{t:'"Good hunting."', go:()=>startExplore()}]}),

  /* ---- Dannet and the trick ---- */
  b3_c7_dannet:()=>({sp:'Dannet', fx:()=>{ S.f.b3_c7_dannet = 1; }, txt:
`Dannet is painting. She has the pot of grey on the trench lip and the brush in her teeth and the shield across her knees, and the wolf on it is still half a wolf.

"On Capustan's wall," she says, round the brush, "the Shield Anvil taught the acolytes a thing. Not a drill. He said a shield is for the blow, and a Grey Sword is for the one the blow was meant for." She takes the brush out. "You step in. You put your hand where theirs is. You carry some of it." She looks at the half-wolf. "I could show you. It is not hard. It is only hard to do."`,
      ch:[b3c7AnvilCh('dannet'),
          {t:'"Finish the wolf."', go:()=>startExplore()}]}),
  b3_c7_anvil_ok:()=>({sp:{dannet:'Dannet', itko:'The Shield Anvil'}[S.f.b3_c7_anvilBy] || 'A Grey Sword', txt: S.f.b3_c7_anvilBy === 'dannet' ?
`Dannet puts the shield down and takes ${by({sgt:'your', _:'{who}\'s'})} hand and puts it flat over her own, on the cold amulet, and leans. Not much. Enough. ${by({greysword:'She does it to herself, eyes shut, as if she had forgotten and were remembering.', _:'"Like that," she says. "Not the blow. The one it was meant for."'})}

It is not sorcery. The warren does not stir. Something passes anyway, from one hand to the other, and ${by({sgt:'you', _:'{who}'})} feel it go.`
  : S.f.b3_c7_anvilBy !== 'itko' ? `The Grey Sword shows it the way it was shown to her on Capustan's wall: she steps in beside ${by({sgt:'you', _:'{who}'})}, puts her hand flat over ${by({sgt:'yours', _:'{who}\'s'})}, and leans. "He taught it to us," she says. "The Shield Anvil. *Not the blow. The one it was meant for.*" Something passes from one hand to the other, and it is not sorcery, and ${by({sgt:'you', _:'{who}'})} feel it go.`
  : `The Shield Anvil does not demonstrate. He simply steps in beside ${by({sgt:'you', _:'{who}'})} and lays his gauntleted hand over ${by({sgt:'your', _:'{who}\'s'})}, on the hilt, and for a moment the weight of everything ${by({sgt:'you have', _:'{who} has'})} carried down this road is a little less, and his face is a little greyer.

"So," he says. "Sir. It is not a gift. It is a decision." He takes his hand away. "Decide it seldom."`,
      ch:[{t:'"Thank you."', go:()=>startExplore()}]}),
  b3_c7_anvil_miss:()=>({sp:{dannet:'Dannet', itko:'The Shield Anvil'}[S.f.b3_c7_anvilBy] || 'A Grey Sword', txt: S.f.b3_c7_anvilBy === 'dannet' ?
`Dannet tries. ${by({sgt:'You try', _:'{who} tries'})}. It is only a hand on a hand, and a lean, and nothing passes at all. "It was like that for me on the wall," she says. "For a month." She picks the brush up again. "There isn't a month."`
  : S.f.b3_c7_anvilBy !== 'itko' ? `She shows it twice. It is only a hand on a hand. "It took me a month," she says. "He said it would come at a bad time or not at all."`
  : `He shows it, patiently, twice. ${by({sgt:'You', _:'{who}'})} cannot find where the weight is. "It will come or it will not," he says. "Sir. It came to me at a bad time. I would not wish it a better one."`,
      ch:[{t:'Let it be.', go:()=>startExplore()}]}),

  /* ---- the fire under the screen: rest, and the Alliance ---- */
  b3_c7_f_fire:()=>({sp:'The shielded fire', txt:
`A fire in a pit under a slab, banked so low it gives heat and no light. The squad sits round it close.

${b3In('ohl') ? `Ohl has the list out. He is not reading it. He is holding it. "${b3ListWords()}," he says, when he sees you looking. "I'd like that to be the number at the end of the week, Sergeant. I'd like that very much."` : `One of the squad says the number of the dead out loud, the way Ohl used to. The fire takes it.`}${b3In('sohra') ? ` Sohra hums under her breath, too low for the city to hear, a herd song with the words left out.` : ''}${b3In('greysword') ? ` Dannet sits with her shield on her arm, even here, even sitting down.` : ''}${b3In('ellis') ? ` Ellis sits with her back to the fire, facing the dark, and takes the glove off to warm the hand, and has it on again before anyone can look.` : ''}${b3In('vell') ? ` Vell is asleep sitting up against the slab with the rope in his lap, which is the only way he has ever slept in the Host.` : ''}

Out on the plain, two days off, Brood's army is coming on toward Coral not knowing half the Host is already here. Whatever the Rhivi and the Barghast and the Andii think of the Malazans tonight, they will think something else tomorrow.`,
      html:allyHTML('Above Coral · the night before'),
      ch:[{t:'Sleep, if anyone can.', req:()=>!S.f.b3_c7_frest, fx:()=>{ S.f.b3_c7_frest = 1; b3Rest('The squad sleeps in the trench in its cloaks, in turns, with the old cold coming up out of the rock. Wounds close, mostly.'); }, go:()=>startExplore()},
          {t:'Back to the line.', go:()=>startExplore()}]}),

  /* ---- the quorl roost ---- */
  b3_c7_roost:()=>({sp:'The quorl roost', txt:
`The quorls roost on a ledge under an overhang, folded, their long bodies faintly warm in the cold, their wings rustling. ${b3In('kettle') ? `Kettle goes along the ledge putting her hand flat on each one, not quite touching. "Warm," she says. "Chub said. We didn't believe him." She is counting. She gets to forty and stops. "Tomorrow there'll be fewer," she says. "I'll count them again."` : `Black Moranth move among them, checking harness, saying nothing.`}${b3In('vell') ? ` Vell watches the Moranth tie off the harness, strap by strap. "Those aren't knots," he says, when they have gone. "I don't know what those are. I want to."` : ''}

Overhead, very high, something bigger than a quorl goes across the stars and is gone. The Moranth all look up at once, and then go back to their harness.`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

  /* ---- the forward trench: the night's work ---- */
  b3_c7_trench:()=> S.f.b3_c7_trenchDone ? {sp:'The forward trench', txt:
`The forward trench is full of what the night left in it. The legion is still holding it. Dawn is coming up grey over the sea, and down the mountain the first companies are already moving toward the city, quietly, in file.`,
      ch:[{t:'Down into Coral, behind the Bridgeburners.', go:'b3_c7_descend'},
          {t:'Not yet.', go:()=>startExplore()}]}
    : !S.f.b3_c7_exchange ? {sp:'The forward trench', txt:
`The forward trench runs along the lip of the shelf, facing the city. It is empty except for a legion's worth of shields stacked against its wall, waiting. The Fourth has not been told where to stand yet. The High Fist is over a map by the cedar screen.`,
      ch:[{t:'Find out where the Fourth stand.', go:()=>startExplore()}]}
    : {sp:'The forward trench', fx:()=>{ S.f.b3_c7_trenchSeen = 1; }, txt:
`Full dark. The legion is in the forward trench, shoulder to shoulder, and the Fourth is in it with them, on a stretch of wall where the cut drops away toward the city.

It starts without a sound. A greyness comes up the slope out of Coral like a tide, and where it touches men they go down screaming, and the ones beside them do not stand up, because a mage said not to. ${b3In('tuft') ? 'Tuft has her hands over her ears and her eyes shut. "It\'s *grey*," she says. "It\'s just grey. There\'s nothing in it at all."' : ''}${b3In('ohl') ? ' Ohl has his hand on a screaming man\'s chest and is not reaching into anything, because there is nothing to reach into that will not reach back.' : ''}${b3In('greysword') ? ' Dannet has her shield up over the legion man beside her, who is not one of the Fourth. On the wall at Capustan she was taught whose blow a shield is for.' : ''}${b3In('ellis') ? ' Ellis has an arrow on the string and is not watching the grey at all. She is watching under it, down the cut.' : ''}

Under the grey, coming up the cut in the dark, there are Beklites.`,
      ch:[{t:'"Hold the trench."', go:()=>startBattle('b3_c7_trenchfight', {})},
          {t:'Kettle drops a sharper into the cut ahead of them.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c7_trenchfight', {pre:`Kettle leans over the lip, counts under her breath, and lets a sharper go down the cut, and listens for it.`})},
          {t:'Not yet. Back along the line.', go:()=>startExplore()}]},
  b3_c7_after_trench:()=>({sp:'The forward trench · before dawn', fx:()=>{ S.f.b3_c7_trenchDone = 1; gain('b3_c7_greymail'); ally(0, 1, 'The grey sorcery'); }, txt:
`The grey goes out of the air an hour before dawn, all at once. The legion is still in the trench. Not all of it. Enough.

The Seerdomin captain is lying under the cedar screen in his grey mail, which is very fine, and very cold, and fits ${b3In('brisk') ? 'Brisk' : 'somebody in the squad'} better than it fitted him. The question of taking it does not come up. Somebody takes it.

${b3In('ohl') ? `Ohl goes down the line with his kit, not reaching into Denul at all, using needles and gut and complaint, and when he comes back his hands are shaking. "Fourteen of the legion," he says. "I'll want the names." He gets them.` : `The names of the legion's dead get taken down the line, one by one.`} Down the mountain, in the grey light, the Bridgeburners are already gone, unseen, in the dark. The sky over the keep is full of quorls.`,
      ch:[{t:'Down into Coral.', fx:()=>{ b3c7List(1); }, go:'b3_c7_descend'},
          {t:'Not yet. A moment on the line.', fx:()=>{ b3c7List(1); }, go:()=>startExplore()}]}),
  b3_c7_descend:()=>({sp:'Down the mountain', scene:'b3_c7_coral', txt:
`The Host goes down the mountain in file, in the grey before dawn, without a word, and into Coral by a breach the sappers blew in the night where the wall meets the rock. Ahead, somewhere in the black streets, the Bridgeburners are making the kind of noise only munitions make. ${b3In('kettle') ? 'Kettle names every one of them, under her breath, as they go off. "Cusser. Sharper. Sharper. That one was a burner, the idiot."' : ''}${b3In('vell') ? ' Vell looks up at the roofs behind the wall as they go under it, black and packed close. "I could cross this city in an hour," he says, "and never touch a street." It is not a thing anyone is going to ask him to do this morning.' : ''}

The Fourth's company goes in behind the Fourth Regiment. ${b3In('brisk') ? 'Brisk can see Tav\'s shield three ranks ahead. She does not take her eyes off it.' : 'Somewhere ahead is Tav\'s company.'} Then you are in the streets, and the city closes over your heads like water.`,
      ch:[{t:'Into the streets.', go:()=>{ startExplore('b3_c7_coral'); talk('b3_c7_streets'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),

  /* ================= THE LIFT: Coral's streets ================= */
  b3_c7_streets:()=>({sp:'Coral · the streets', fx:()=>{ S.f.b3_c7_inCity = 1; }, txt:
`Coral is black stone. Black paving, black walls, the coral-stone of the old city showing through grey and pitted where the black has worn. Fires in the side streets. Doors shut. No people, or none that come out.

The Bridgeburners went through here an hour ago. You can tell, the way you can tell where a storm went. Up ahead, past a square, the street climbs toward the keep, and the sky over the keep is full of quorls going round like leaves in a drain, and things among them with wings that are not quorls. ${b3In('sohra') ? 'Sohra looks up once and then not again. "Birds," she says. "Something is wearing them."' : ''}${b3In('ellis') ? ' Ellis crouches and reads the paving the way she reads a trail. "Boots," she says. "Thirty pairs, an hour gone, all going up." Then she looks back along the street, and stands up quickly.' : ''}

Down the street behind the Bridgeburners, toward the square, something is coming that is too tall, and too fast, and makes no sound at all when it runs.`,
      ch:[{t:'To the square.', go:()=>startExplore()}]}),

  /* ---- the square: MORTAL, on a choice the player sees coming ---- */
  b3_c7_square:()=> S.f.b3_c7_squareDone ? {sp:'The square', txt:
`The square is full of what the morning left in it. ${S.f.b3_c7_square === 'hunt' ? 'The Hunter is still lying where it fell. The Fourth gives it a wide berth. Nobody has stopped looking at it.' : 'Black Moranth chitin, broken, on the paving where the Hunter went through them.'}`,
      ch:[{t:'Out through the breach, to the shore.', req:()=>!!S.f.b3_c7_news, go:'b3_c7_f_out'},
          {t:S.f.b3_c7_news ? 'Not yet.' : 'Leave it.', go:()=>startExplore()}]}
    : {sp:'The square', fx:()=>{ S.f.b3_c7_squareSeen = 1; }, txt:
`The square opens out ahead, black and empty, and on the far side of it the street climbs toward the keep, where the Bridgeburners went.

It comes into the square from the west street. Taller than a horse, grey, two-legged, a long tail held out stiff behind it for balance, and where its hands should be, blades. A K'ell Hunter. ${S.f.b3_khell ? 'The Fourth have seen its strides before, in the mud of the Rhivi Plain beside a dead outrider. ' : ''}It is not looking at the Fourth. It is looking up the keep road, where the Bridgeburners are, and it is going there.

Above it a quorl is coming down, low, its rider standing in the stirrups with a munition. To the right a side street runs off toward the Beklites' flank, where they are massing to take the square when the Hunter has cleared it.

${b3In('brisk') ? '"If it goes up that street," Brisk says, "it\'s in their backs." She is already looking at it the way she looks at anything she means to stand in front of.' : 'If it goes up that street it is in the Bridgeburners\' backs.'}${b3In('vell') ? (S.f.b3_c4_hunted ? ' Vell has the hook off his shoulder. "We roped one, west of Capustan, with the Grey Swords," he says. He looks round the square, which has nothing in it to tie off to. "Not here."' : ' Vell looks round the square for something to tie a line off to, and there is nothing, and he puts the hook back.') : ''} Whatever falls in front of that thing, everybody here knows, is not going to get up again.`,
      html:allyHTML('Coral · the square'),
      ch:[{t:'"Here. We hold the square." (Whoever falls here stays down.)', fx:()=>{ S.f.b3_c7_square = 'hunt'; }, go:()=>startBattle('b3_c7_hunt', {})},
          {t:'Kettle puts the cusser under it as it comes.', tag:'uses 1 cusser · whoever falls stays down', req:()=>b3In('kettle') && S.inv.cusser > 0, fx:()=>{ S.inv.cusser--; S.f.b3_c7_square = 'hunt'; S.f.b3_c7_maud = 1; }, go:()=>startBattle('b3_c7_hunt', {pre:`Kettle says "${b3c7Maud()}" very quietly and rolls the cusser out under its feet.`})},
          {t:'"Leave it to the Moranth. We take the side street."', fx:()=>{ S.f.b3_c7_square = 'side'; ally(-1, 0, 'The Moranth took the square'); }, go:()=>startBattle('b3_c7_side', {})},
          {t:'Not yet.', go:()=>startExplore()}]},
  b3_c7_after_hunt:()=>{ const fell = (S.f.lastFallen || []).filter(id => TPL[id]);
    return {sp:'The square', fx:()=>{ S.f.b3_c7_squareDone = 1; if (!fell.length) ally(2, 0, 'The square held'); else ally(1, 1, 'The square held'); gain('b3_c7_hunterblade'); }, txt:
`The keep road is held. The square is held. The thing that came into it is lying across the paving with one blade-arm broken off at the wrist, and the second one beside it, and both have finally stopped moving.

${fell.length ? `${b3c7And(fell)} ${fell.length > 1 ? 'are' : 'is'} lying in the square too, and ${fell.length > 1 ? 'are' : 'is'} not getting up. You knew, when you said *here*. Everyone knew. It does not help.${b3In('ohl') ? ` Ohl kneels, and closes ${fell.length > 1 ? 'eyes' : b3c7P(fell[0]).hers + ' eyes'}, and takes out the list, and writes, there, in the square, with Coral burning round him, because if he does not write it now he is afraid he will not be able to later.` : ''}` : `Everyone is still breathing. You count them twice, there in the square, out loud, and not one of them laughs at you for it.`}

${S.f.b3_c7_maud && b3In('kettle') ? `Kettle sits down on the paving with the empty satchel in her lap. "${b3c7Maud()}," she says. "That was what she was for." ` : ''}The broken blade-arm gets picked up. It was never forged, and it is made of nothing anyone can name. It stays picked up.`,
      ch:[{t:'Look up.', go:'b3_c7_spawnfall'}]}; },
  b3_c7_after_side:()=>({sp:'The side street', fx:()=>{ S.f.b3_c7_squareDone = 1; }, txt:
`The side street is held, and the cistern court behind it, and the Beklites who meant to take the square from the flank are not going to take anything.

In the square, the Moranth took the Hunter down. You can see how, from the paving: chitin, broken, a long way across it, and a quorl on its back with its wings spread, and the Hunter lying in the middle of it all with the last of the munitions still smoking in it. ${b3In('kettle') ? `Kettle walks out into the square and stands by the quorl. "Two of them," she says. "And the riders." That is all she says about it.` : 'The squad stands and looks.'}`,
      ch:[{t:'Look up.', go:'b3_c7_spawnfall'}]}),

  /* ---- the stair (optional) ---- */
  b3_c7_stair:()=> S.f.b3_c7_stairDone ? {sp:'The stair', txt:`The stair is clear. At the top of it the Moranth rider is sitting against the wall with his helm off, which nobody has ever seen, and you do not look.`, ch:[{t:'Leave him his face.', go:()=>startExplore()}]}
    : {sp:'The stair', txt:
`A stair goes up between two black walls toward a terrace, and at the top of it a quorl has come down hard, on its side, one wing broken across the steps. Its rider is still alive. Beklites are coming down the terrace toward him, in no hurry at all.

${b3In('kettle') ? '"Up," Kettle says. "Sergeant. *Up.*"' : 'Nobody has to say it.'}${b3In('vell') ? ' Vell looks at the terrace wall, and the stair, and the Beklites, and does a rope man\'s sum. "Stair," he says. "The wall\'s too smooth, and they\'d hear the hook."' : ''}`,
      ch:[{t:'"Up the stair."', go:()=>startBattle('b3_c7_stairs', {})},
          {t:'Not yet.', go:()=>startExplore()}]},
  b3_c7_after_stair:()=>({sp:'The stair', fx:()=>{ S.f.b3_c7_stairDone = 1; ally(1, 0, 'A Moranth rider brought down the stair'); b3c7Loy('kettle', 1); }, txt:
`The terrace is held. The rider is alive. He sits against the wall with his helm off, because he cannot get his breath with it on, and for a moment the Fourth see what nobody in the Host has ever seen, and then ${b3In('kettle') ? 'Kettle steps in front of him, very deliberately, with her back to him, so that nobody else can.' : 'everyone looks somewhere else, at once, without being told.'}

"Square," he says, behind her, in his dry clicking voice. It is the Moranth word for a debt that is paid.`,
      ch:[{t:'Back down the stair.', go:()=>startExplore()}]}),

  /* ---- Moon's Spawn ---- */
  b3_c7_spawnfall:()=>({sp:'Coral · the keep', scene:'b3_c7_spawn', fx:()=>{ S.f.b3_c7_spawn = 1; ally(0, 1, 'Moon\'s Spawn'); }, txt:
`Everybody in the street is looking up.

Something is coming down out of the sky over the keep. It is so big that for a long time it does not seem to move, and then it does, and the light changes all over the city. Black, and vast, and very old, streaming water from every edge as if it had been pulled up out of the sea, which, the Host will say afterwards, is exactly what happened. Moon's Spawn.${S.f.b3_rake ? ' The Andii lord\'s, who was a black dragon over the field at Capustan.' : ''} ${b3In('tuft') ? `Tuft says, "Oh," very softly, the way you say it when somebody you knew comes into a room.` : ''}${b3In('vell') ? ` Vell, who watched it hang over Darujhistan from the roofs the season it came, takes a step back from it all the same.` : ''}

It comes down on the Seer's keep slowly, the way a mountain would fall if mountains fell, and the sound arrives a long while after, and goes on. Then the rain comes off it, warm and dirty, over the whole city, and keeps coming.

Somewhere up there the Bridgeburners are. The street keeps its eyes on the sky.`,
      ch:[{t:'Wait for the rain to stop.', go:()=>startExplore()}]}),

  /* ---- the word from the hill: Hurlochel ---- */
  b3_c7_news:()=>({sp:'Hurlochel · outrider', fx:()=>{ if (!S.f.b3_c7_news) { ally(0, 2, 'The word from the hill'); b3c7List(3); } S.f.b3_c7_news = 1; }, txt:
`An outrider comes up the street on a lathered horse, through the rain, looking at every face: Hurlochel, the Host's outrider, come in from the hill outside the city. He is looking for the High Fist's people. He finds the Fourth.

"Sergeant." His voice is far too steady. "The alliance's hill. Outside the city. The K'Chain Che'Malle came against Brood's army, hundreds of them, and Trake's Legion went into them, and while Brood was down the hill —" He stops. Starts again. "Kallor went for Korlat. Then for the child. Whiskeyjack stood in front of her."

Nobody says anything.

"His leg went," Hurlochel says. "In the middle of it. It went, and Kallor killed him." He wipes the rain off his face with the back of his glove. "A marine of the Host put a blade in Kallor. He killed the two women guarding the child. The standard bearer drove him off. He's gone. Alive." A breath. "Korlat's hurt. The child's alive. The Shield Anvil is dead. I have to find the High Fist."

He rides on up the street toward the keep, into the rain.`,
      ch:[{t:'"Mallet never got his week."', go:'b3_c7_news2'},
          {t:'Say nothing.', go:'b3_c7_news2'}]}),
  b3_c7_news2:()=>({sp:'Coral · the rain', txt:
`${b3In('brisk') ? `Brisk takes her helmet off and stands in the rain with it under her arm. It is the only time anyone in the Fourth has ever seen her do it in a street with enemies in it.\n\n` : ''}${b3In('ohl') ? `Ohl has the list out in the rain. He writes the name, and then he writes *two marines*, because nobody here knows their names, and then he stops, with the pen over the page, and says in Ehrlii something that is not a prayer, to Hood, who is listening.\n\n` : ''}${b3In('tuft') ? `"She's alive," Tuft says. She is not speaking to anyone. "She's alive. He stood in front of her." She puts her hand over her mouth.\n\n` : ''}${b3In('greysword') ? `Dannet heard *the Shield Anvil*. She stands in the street with her shield on her arm and her other hand closed round the cold amulet, and asks nothing else, and does not move until you say her name.\n\n` : ''}${b3In('sohra') ? `Sohra says a few words in Rhivi, north, toward Capustan. "The Mhybe will want to know her daughter lives," she says. "I told her. She will hear it, wherever she is."\n\n` : ''}${b3In('vell') ? `"Who were they?" Vell says. "The two women." The street does not know. He looks as though that is the part he cannot put down.\n\n` : ''}You were a long way up the mountain when the Host split, and further still this morning, in a city, behind a square, under a falling sky. You could not have been on that hill. You know it. You are going to go on knowing it.

*After Coral*, he said.`,
      ch:[{t:'On.', go:()=>startExplore()}]}),

  /* ---- Brisk finds Tav ---- */
  b3_c7_tav_found:()=>({sp:'Tav', fx:()=>{ S.f.b3_c7_tavFound = 1; b3c7Loy('brisk', 1); }, txt:
`The Fourth Regiment comes back down the keep road in the rain, what is left of the front companies of it, carrying its own. Tav is walking. He has his shield on his arm and a cloth tied round his head that was white once, and the left side of his face is going to be a different shape from now on.

Brisk walks out into the street and stops in front of him. Neither of them speaks. Then he puts his hand on top of her head, and leaves it there.

"Bris," he says, eventually. "You stood in front of something."

"So did you."

"Yes," Tav says. "Yes." He looks back up the street, toward the keep, where the dark shape is lying across everything. He does not sing. You get the feeling he will not, for a while.`,
      ch:[{t:'Leave them.', go:()=>startExplore()}]}),
  b3_c7_bb2:()=> !S.f.b3_c7_squareDone ? {sp:'A Bridgeburner', txt:
`A Bridgeburner runs back past the Fourth from the keep road, bent low, for more munitions, and does not stop. "Middle," he says as he passes. "Stay in the middle."`,
      ch:[{t:'On.', go:()=>startExplore()}]}
    : {sp:'A Bridgeburner', fx:()=>{ S.f.b3_c7_bb2 = 1; }, txt:
`A Bridgeburner is sitting on a doorstep with his back against the black stone, soaked through, holding an empty satchel, looking at the keep where the dark shape is lying across it. He sees your badge.

"Seventh," he says. "You held the square." It is not a question. "That was you." He looks back at the keep. "We went in from the sky. Not all of us came out of it." He doesn't say who. He doesn't need to; the way he holds the satchel says who.`,
      ch:[{t:'Sit with him a moment.', fx:()=>{ S.f.b3_c7_bbSat = 1; }, go:()=>startExplore()},
          {t:'Leave him.', go:()=>startExplore()}]},

  /* ---- the way out of the city, once the word has come ---- */
  b3_c7_f_out:()=>({sp:'The breach', txt:
`The Host is coming back out of Coral through the breach in the rain, company by company, carrying its own. Beyond the wall the ground falls away to the shore, and along the shore, from the hill, Brood's army is coming down to meet it: Rhivi and Barghast and Tiste Andii, and the Grey Swords, and what is left of Trake's Legion, walking very slowly.${b3In('sohra') ? ' Sohra picks out the Rhivi riders in that line before anyone else can tell them from the Barghast.' : ''}${b3In('greysword') ? ' Dannet sees the grey of the Grey Swords among them, and how few, and stops counting anything else.' : ''}

There is no cheering. Neither army knows yet what to say to the other one.`,
    ch:[{t:'Down to the shore.', go:()=>{ startExplore('b3_c7_shore'); talk('b3_c7_s_arrive'); }},
        {t:'Not yet.', go:()=>startExplore()}]}),
});
Object.assign(B3CH7.dlg, {
  /* ================= THE RIVER: the alliance's hill ================= */
  b3_c7_r_start:()=>({sp:'The alliance\'s hill · morning', scene:'b3_c7_hill', fx:()=>{ S.f.b3_c7_started = 1; S.f.b3_domin = 1; S.f.b3_river = 1; }, txt:
`The column came up the back of the hill at dawn and found Brood's army already on it: the Rhivi herds in the hollow behind, Barghast fires along the crest, the Tiste Andii standing apart the way they always stand, and the Grey Swords, and the striped ones, Trake's Legion, sitting in the grass sharpening things. Between the hill and the city there is a plain, and nothing on it yet.

${b3In('brisk') ? `Brisk is looking east, toward the mountains, where the other half of the Host went on the quorls. Tav's company went with them. She has not said his name since the lift field. "We don't leave people," she said, the night after the quorls took his company, and then she turned her back on the field and went down to the Maurik with the rest of you.

` : ''}${b3In('sohra') ? `Sohra went straight to the Rhivi in the hollow and came back an hour later with her face shut. "A rider came down from Capustan," she says. "The Mhybe. She is very old now. Older than anyone. The two Daru carry her from the bed to the window." She sits down. "Sing to me later, ${S.f.b3_herdMother ? 'herd-mother' : 'Sergeant'}. I need someone to sing to me."

` : ''}${b3In('tuft') ? `Tuft is looking at the crest, where the Rhivi have put up a tent in red wool beside Brood's. "She's up there," she says. The squad does not need to ask who.

` : ''}${b3In('greysword') ? `Dannet saw the Grey Swords on the hill before the column reached the foot of it, and has been standing straighter ever since. "The company," she says. "What is left of it." She does not go to them. She is lent.

` : ''}${b3In('ellis') ? `Ellis has been down to the foot of the hill and back before the column has finished dropping its packs. "Long grass," she says. "Gullies in it. I'd come that way." She means somebody will.

` : ''}${b3In('vell') ? `Vell is looking past all of it at the city on the edge of the sea: walls, a keep, a great many roofs, two hours off. He has the look of a hungry boy outside a cookshop.

` : ''}Whiskeyjack is up there too. You can see him from here, standing with Brood, with his weight on one leg.`,
      ch:[b3DeckChoice(7),
          {t:'Up the hill.', go:()=>startExplore()}]}),

  /* ---- Whiskeyjack: the leg, one last time ---- */
  b3_c7_wj:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c7_wj = 1; S.f.b3_legSeen = 1; }, txt:
`He is standing at the edge of the crest with a map in one hand, looking at the plain, and when he hears you coming he turns, and he turns on the good leg, and you see him decide not to show it, and fail.

"Sergeant." The single word, as it always was. ${S.f.b3_wjNoticed ? `Then, after a moment: "The rations at Capustan. The children's end of the camp. I heard." That is all he says about it. It is a great deal, for him.` : `He looks at the squad behind you and counts it, the way everybody in this army counts the Fourth.`}

"The stake line at the foot of the hill, east side," he says. "Where the ground drops into the gully. Brood thinks the Seer will send something across the plain before noon, and it won't be men." He folds the map. "That's yours."`,
      ch:[{t:'"Sir. The leg. Mallet wanted a week."', go:'b3_c7_wj_leg'},
          {t:'Ask Ohl to look at it, here, now.', req:()=>b3In('ohl'), go:'b3_c7_wj_ohl'},
          {t:'"Sir."', go:()=>startExplore()}]}),
  b3_c7_wj_leg:()=>({sp:'Whiskeyjack', txt:
`He looks at you with those grey eyes, and keeps looking. You have the strong impression that a great many people have said this to him, and that he has heard every one of them, and that he is tired of being right about why he will not.

"After Coral," he says. "Mallet gets his week after Coral. I've told the High Fist. I've told Korlat." Something moves at the corner of his mouth that might be the start of a smile, in another life. "Now I've told a sergeant of marines. That makes it an order."

He turns back to the plain, on the good leg.`,
      ch:[{t:'"After Coral, sir."', fx:()=>{ S.f.b3_c7_wjWord = 'after'; }, go:()=>startExplore()},
          {t:'Push it. "Today, sir. Before whatever comes across that plain."', check:['guile', 17], fx:()=>{ S.f.b3_c7_wjPushed = 1; },
            near:{t:()=>`Yes, but you pushed him in front of Brood and Korlat, and the look he gives ${NAME(ROLL().who || 'sgt')} for it is the one from Pale, the one that makes a sergeant feel like a recruit: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            edges:id=>[id === 'ohl' && ['a healer of twenty-two years', 2], id === 'brisk' && ['she has never once asked him for anything', 1], S.f.b3_wjNoticed && ['he remembers Capustan', 1]],
            go:'b3_c7_wj_almost', fail:'b3_c7_wj_no'}]}),
  b3_c7_wj_almost:()=>({sp:'Whiskeyjack', txt:
`For a moment he actually considers it. You see it. He looks at the plain, and at the hilltop, at the red tent and Brood and the Andii, and you watch him do the sum the way he has done it all the way from Pale.

"Tonight," he says. "If the plain's empty by dusk, I'll lie down, and Mallet can come down off his mountain and shout at me, and I'll let him." He almost laughs. "Tell nobody I said that, Sergeant. They'll want it in writing."

It is more than anyone else got out of him. It is not enough. Nothing you could have said would have been.`,
      ch:[{t:'"Tonight, then."', fx:()=>{ S.f.b3_c7_wjWord = 'tonight'; }, go:()=>startExplore()}]}),
  b3_c7_wj_no:()=>({sp:'Whiskeyjack', txt:
`"No." Not angry. Final. "Four thousand people walked down a river behind me, Sergeant, and half of them have never held a sword. If I lie down, they'll see me lie down." He looks at you, not unkindly. "After Coral."`,
      ch:[{t:'"After Coral."', fx:()=>{ S.f.b3_c7_wjWord = 'after'; }, go:()=>startExplore()}]}),
  b3_c7_wj_ohl:()=>({sp:'Ohl · Whiskeyjack', txt:
`Ohl doesn't ask. He kneels in the grass and puts his hand flat on the knee through the leather, and Whiskeyjack lets him, which surprises everyone, including Whiskeyjack.

Ohl is quiet a long time. "It knit wrong at Darujhistan," he says at last. "A week flat, and Denul, and a good healer, and it would hold. Here?" He takes his hand away. "Here the warren bites. If I reach into it for this, sir, I may give you back something worse than a knee."

"Then don't," Whiskeyjack says. "After Coral. Mallet can have it." He looks down at Ohl. "Thank you, healer."

Ohl gets up, slowly. When you are back at the foot of the hill he says, "I have a rule," and does not say what it is.`,
      ch:[{t:'On.', fx:()=>{ S.f.b3_c7_wjWord = 'after'; b3c7Loy('ohl', 1); }, go:()=>startExplore()}]}),
  b3_c7_wj_again:()=>({sp:'Whiskeyjack', txt:
`He is with Brood now, the two of them over the map, saying very little. He sees you, and nods once toward the foot of the hill. *Your post.*`,
      ch:[{t:'Go.', go:()=>startExplore()}]}),

  /* ---- Tuft and the child ---- */
  b3_c7_fox:()=>({sp:'Silverfox', fx:()=>{ S.f.b3_c7_fox = 1; }, txt:
`She is not a child any more, or not only. She looks perhaps fifteen, perhaps more, tall in red wool, with a face that is a girl's and eyes that are not, and she is standing at the door of the Rhivi tent looking out at the plain the way Whiskeyjack is.

Two marines of the Host stand a few paces off from her, women, from some other company, fighting kit on, saying nothing; they stand shoulder to shoulder, a pair long used to it. ${b3In('tuft') ? 'Tuft stops when she sees them, and then goes on.' : ''}${b3In('ellis') ? ' Ellis looks at the pair a breath longer than the rest of the squad does: where they stand, what they can see from there, what they can\'t. Then she nods to them, scout to sentries, and they nod back.' : ''}

${b3In('tuft') ? `Tuft walks up to the child and stops an arm's length off and does not know what to do with her hands. The child looks at her.

"I know you," Silverfox says. "I think I know you." Something goes across her face that is several people at once. "You were small. You read the cards with your tongue between your teeth."

"I still do," Tuft says.

"Yes." The child almost smiles. "You were kind to me. To her. When it was very dark." She looks out at the plain again. "Go back to your sergeant, Tuft. It is going to be a bad day. I would like you to be somewhere I can't see you."` : `The child looks at you with eyes that are much too old, and gives you a small grave nod, officer to sergeant, and looks back at the plain.`}`,
      ch:[{t:b3In('tuft') ? 'Take Tuft back down the hill.' : 'Back down the hill.', fx:()=>{ b3c7Loy('tuft', 1); }, go:()=>startExplore()}]}),

  /* ---- Sohra and the Mhybe (who is not here: Coll and Murillio took her back to Capustan before the Catlin; her word comes south by a rider) ---- */
  b3_c7_mhybe:()=>({sp:'An old Rhivi woman', fx:()=>{ S.f.b3_c7_mhybe = 1; }, txt:
`An old Rhivi woman sits in the shade of the Rhivi tent under bhederin hides, a cousin of the Mhybe's, tying knots in a cord. A rider came down from Capustan in the night with the Mhybe's words for whoever would carry them, and she is the one carrying them. The Mhybe is the oldest thing alive, the rider said: a little dry bundle of a woman whose daughter is not a year born and looks fifteen.

${b3In('sohra') ? `Sohra kneels by her and faces north and sings, very low, one of the songs for the herds' dead, which is not a thing you sing to the living, and the old woman listens with her eyes shut.

${S.f.b3_mhybe || S.f.b3_c1_key === 'mhybe' ? 'Then her eyes find you over Sohra\'s head. "She sent a word for the night watch," she says. "At Pale. She heard you, outside, all night. Shuffling." Something like a smile.\n\n' : ''}"Child," the old woman says, when it is done, in Rhivi, and then in Daru, so that you will understand. "She says: *Child. Did you watch the Malazans, as I asked?*"

"Yes, Mother."

"And?"

Sohra looks at the squad. "They are loud," she says. "And they don't leave people."

The old woman laughs, a dry little sound like a stick breaking. "Good," she says. "She will like that. Go and sing to them, then."` : `"Malazans," she says, in a voice like dry leaves, and looks at you a long time. "She sent word from the north. She says the grey one on the crest is kind to her daughter. He is the only one who is not afraid of her." She closes her eyes. "Go and stand where he put you."`}`,
      ch:[{t:'Leave her to the shade.', fx:()=>{ b3c7Loy('sohra', 1); ally(1, 0, 'The Mhybe'); }, go:()=>startExplore()}]}),

  /* ---- Korlat ---- */
  b3_c7_korlat:()=>({sp:'Korlat', fx:()=>{ S.f.b3_c7_korlat = 1; }, txt:
`The Tiste Andii woman stands a little apart from Brood and Whiskeyjack, very tall, very dark, watching Whiskeyjack and not the plain. She turns her head when you come up and inclines it to you, gravely, as if you were somebody of consequence.

"Sergeant," she says. "Your squad marched with the child's people all the way from Pale. The Rhivi speak of it." A pause. "I am grateful. So, I think, is he." She does not look at Whiskeyjack when she says *he*. She does not need to.${S.f.b3_c6_korlat ? `

"At Maurik I asked you to tell me if he fell behind," she says. "You never had to." Something that is almost a smile. "He would not let himself."` : ''}`,
      ch:[{t:'"Look after him, lady."', fx:()=>{ ally(1, 0, 'Korlat\'s regard'); }, go:'b3_c7_korlat2'},
          {t:'Bow, and go.', go:()=>startExplore()}]}),
  b3_c7_korlat2:()=>({sp:'Korlat', txt:
`Something goes across her face, very quickly, and is put away. "I mean to," she says. "He makes it difficult. He treats that leg as a debt he means to pay alone." She looks back at him. "Go to your post, Sergeant. We will all be very busy soon."`,
      ch:[{t:'Go.', go:()=>startExplore()}]}),

  /* ---- Kallor ---- */
  b3_c7_kallor:()=>({sp:'Kallor', fx:()=>{ S.f.b3_c7_kallor = 1; S.f.b3_kallor = 1; }, txt:
`The tall man in the fur-collared cloak stands at the very edge of the hilltop with a two-handed sword point-down in the turf in front of him and both hands on the pommel. He is looking at the red tent. He is always looking at the red tent.

${b3c7Known7() ? `His eyes come round to you, slowly, and stop. "I know you," Kallor says. His voice is pleasant, and old, older than the language he is speaking. "${S.f.b3_kallorEnemy ? 'The well south of the Catlin. The marine who carried tales to Brood.' : 'The tent of the Rhivi witch, at Pale. The one who stood the night watch.'}" He smiles. It does not reach anything. "I have outlived empires that had larger opinions than yours, Sergeant. Go and stand somewhere."` : `His eyes pass over you. There is nothing about the Fourth worth stopping them for, and he wants you to know it. After a while he says, to the air, "Malazans," and nothing after it, as if the one word were the whole of the insult.`}

${b3In('tuft') ? 'Tuft has not come within twenty paces of him. She is watching his hands.' : ''}${b3In('ellis') ? `${b3In('tuft') ? ' ' : ''}Ellis has stood the whole time where she could see both his hands and the pommel. "He'd kill all of us," she says, on the way down, "and not move his feet."` : ''}`,
      ch:[{t:'Go and stand somewhere.', go:()=>startExplore()},
          {t:'Hold his eye a moment longer than he likes.', check:['might', 15], fx:()=>{ S.f.b3_c7_kallorStare = 1; },
            near:{t:()=>`Yes, but holding it costs ${NAME(ROLL().who || 'sgt')} something. For the length of that look you could see how old he is, and what he has outlived, and it walks back down the hill with you: ${S.f.b3_c7_nearDread ? `dread +${S.f.b3_c7_nearDread}` : 'the Obelisk takes it, and dread holds'}.`, fx:()=>{ b3c7Dread(1); }},
            edges:id=>[id === 'brisk' && ['she has stared down worse', 1], id === 'tuft' && ['she will not look at him', -2]], go:'b3_c7_kallor_held', fail:'b3_c7_kallor_lost'}]}),
  b3_c7_kallor_held:()=>({sp:'Kallor', txt:
`You hold it. It is like holding a coal. Slowly something in his face becomes very slightly interested, which is worse than the contempt.

"Hm," Kallor says, and looks back at the tent.`,
      ch:[{t:'Go.', fx:()=>{ S.f.b3_kallorSaw = S.f.b3_kallorSaw || 1; }, go:()=>startExplore()}]}),
  b3_c7_kallor_lost:()=>({sp:'Kallor', txt:
`You last about a breath. Then something very old looks out of him at you, and you find you are looking at the grass. He has already forgotten you.`,
      ch:[{t:'Go.', go:()=>startExplore()}]}),

  /* ---- Brood ---- */
  b3_c7_brood:()=>({sp:'Caladan Brood', fx:()=>{ S.f.b3_c7_brood = 1; }, txt:
`The warlord is sitting on a rock with the hammer across his knees, a huge quiet man with a face like weathered wood, the man the Host spent ten years trying to kill. He looks at you. He looks at the squad.

"Malazans," he says.${S.f.b3_c3_key === 'field' ? ' "The field at Capustan. The stretch by the walls. Yours." It is not a question.' : ''} Then, after a while, as if it cost him: "${b3Trust() >= 8 ? 'Mine say yours are good. On the march. At Capustan. Mine do not say that.' : b3Trust() >= 5 ? 'Mine say you march well.' : 'Mine do not know you.'}" He looks back at the plain. "Today you will find out what my people are."`,
      ch:[{t:'"And you, ours."', fx:()=>{ ally(1, 0, 'A word with Brood'); }, go:()=>startExplore()},
          {t:'Nod, and go.', go:()=>startExplore()}]}),

  /* ---- the Shield Anvil, alive, the morning of Coral ---- */
  b3_c7_itko:()=>({sp:'The Shield Anvil', fx:()=>{ S.f.b3_c7_itko = 1; }, txt:
`A Grey Sword in battered grey armour is standing with the company at the edge of the hill, very upright, very tired. He has not slept properly since a city fell round him. The others give him room without seeming to. He is Itkovian, the Shield Anvil, who carried Fener's grief out of Capustan; everyone in both armies knows his face by now.

He turns to you. "Sir," he says, formally, as if you were an officer, as if everyone were. ${S.f.b3_c4_key === 'share' ? `"The Malazan sergeant whose squad gave its bread to the children at the prisoners' edge. I wished to say that it was seen."` : `"The Malazan marines who marched with the Rhivi from Pale. Today we stand on the same hill. I wished to say so."`}

${b3In('greysword') ? `Dannet has gone stiff as a post beside you. He looks at her shield, at the half-painted wolf, and something in his face eases very slightly. "Acolyte," he says. "Finish it."` : ''}`,
      ch:[b3c7AnvilCh('itko'),
          {t:'"Sir."', go:()=>startExplore()}]}),

  /* ---- the fire on the hill ---- */
  b3_c7_r_fire:()=>({sp:'The fire on the hill', txt:
`A Malazan cook-fire on a hill full of other people's armies. Barghast come and stare at it. Rhivi children come and stare at the Barghast. Somebody's dog is asleep in the warmest place. ${b3In('kettle') ? `Kettle is lying on her back looking east at the mountains. "They're up there," she says. "Half the Host and all the quorls. I can feel them being up there."` : ''}

${b3In('ohl') ? `Ohl has the list out. "${b3ListWords()}," he says. "Today's a day for it." He puts it away. "I'd like to be wrong."` : ''}${b3In('greysword') ? `

Dannet has been over to the Grey Swords' fire and come back with a fresh pot of grey, and a look on her face she keeps to herself.` : ''}${b3In('ellis') ? `

Ellis sits facing the plain, not the fire, with her gloved hand flat on the grass, as if the ground might tell her something first.` : ''}${b3In('vell') ? `

Vell is showing a Rhivi child a Guild knot. The child already knows a better one, and is showing him back, and Vell is letting them.` : ''}`,
      html:allyHTML('Outside Coral · the last morning'),
      ch:[{t:'Rest an hour while there is an hour.', req:()=>!S.f.b3_c7_rrest, fx:()=>{ S.f.b3_c7_rrest = 1; b3Rest('The squad sleeps an hour in the grass with its boots on, in the middle of three armies. Wounds close, mostly.'); }, go:()=>startExplore()},
          {t:'Back to the line.', go:()=>startExplore()}]}),

  /* ---- the herd-boy and the gully (optional) ---- */
  b3_c7_herdboy:()=>({sp:'A Rhivi herd-boy', fx:()=>{ S.f.b3_c7_herdboy = 1; }, txt:
`A Rhivi boy of nine or ten runs up the slope with a herd-staff taller than he is, and stops in front of the squad, and says something very fast in Rhivi.${S.f.b3_c2_key === 'herd' ? ' He has seen the Fourth before: at a river in flood, on the plain, pulling children out of it. He says so, with his hands, in case.' : ''} ${b3In('sohra') ? `Sohra answers him, just as fast, and then turns to you. "Pannion skirmishers in the gully behind the herds. Javelins. They are spearing the calves to make the herd run onto the stakes." Her face is very still. "Herd-mother. *Please.*"` : `None of the squad speaks Rhivi. He points down the hill, behind the herds, at the dry gully, and makes a throwing motion, and then the shape of a calf falling.`}`,
      ch:[{t:'"Show us."', go:()=>startBattle('b3_c7_gully', {})},
          {t:'Not yet. Tell him to find the Rhivi riders.', go:()=>startExplore()}]}),
  b3_c7_herdboy_again:()=>({sp:'A Rhivi herd-boy', txt:`The boy is back with the herd, standing on a rock with his staff, counting calves out loud in Rhivi. When he sees the squad he stops counting long enough to wave the staff, and then starts again from the beginning, in case.`,
      ch:[{t:'Wave back.', go:()=>startExplore()}]}),
  b3_c7_after_gully:()=>({sp:'The herd gully', fx:()=>{ S.f.b3_c7_gullyDone = 1; ally(1, -1, 'The herd gully'); b3c7Loy('sohra', 1); }, txt:
`The gully is clear. The herd has stopped running. Two calves are lying in the long grass with javelins in them, and the herd-boy goes and sits by them${b3In('sohra') ? ', and Sohra goes and sits by him, and sings' : ''}, and after a while the old bulls come over and stand round them like a wall.`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

  /* ---- the stake line: first the probe, then what comes after it ---- */
  b3_c7_stakeline:()=> !S.f.b3_c7_wj ? {sp:'The stake line', txt:
`A line of sharpened stakes along the foot of the hill, broken in places where the Barghast pulled some up for firewood and nobody has stopped them. The Fourth is still waiting to be given a stretch of it. Whiskeyjack is on the crest.`,
      ch:[{t:'Up the hill, then.', go:()=>startExplore()}]}
    : !S.f.b3_c7_probeDone ? {sp:'The stake line', fx:()=>{ S.f.b3_c7_probeSeen = 1; }, txt:
`The Fourth's stretch: forty paces of broken stakes where the hill drops into a dry gully, the long grass going away beyond it toward the city.

The grass is moving against the wind. ${b3In('sohra') ? 'Sohra has an arrow on the string before anyone else has seen it. "Men," she says. "In the grass. Not many. Testing."' : b3In('ellis') ? 'Ellis has seen it before anyone else. "Men," she says, flat. "In the grass. Not many. Testing." She has an arrow out already.' : 'Men, in the grass, low, not many. A probe, testing the line.'} A Seerdomin's grey shape rises among them, very calm, and points at the gap in the stakes where the Fourth are.`,
      ch:[{t:'"Hold the line."', go:()=>startBattle('b3_c7_probe', {})},
          {t:'Kettle rolls a sharper into the grass ahead of them.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c7_probe', {pre:`Kettle bowls a sharper underarm into the long grass and puts her fingers in her ears.`})},
          {t:'Not yet. A moment.', go:()=>startExplore()}]}
    : S.f.b3_c7_hunters ? {sp:'The stake line', txt:`The stake line is held. Up the hill, the people are moving wrong: too slowly, or not at all.`, ch:[{t:'Up the hill.', go:'b3_c7_r_hill'}, {t:'Not yet.', go:()=>startExplore()}]}
    : {sp:'The stake line', fx:()=>{ S.f.b3_c7_hunterSeen = 1; }, txt:
`Noon. The plain is not empty any more.

They come out of the haze toward the city in their hundreds, at a run, and they make no sound at all. Grey, two-legged, long-tailed, taller than horses, with blades where their hands should be. K'ell Hunters. More of them than anyone has ever seen in one place. Eight hundred, somebody on the crest says, in a voice that is trying to be a soldier's.

Trake's Legion${S.f.b3_treach ? ', the striped ones the Fourth first saw in Capustan,' : ''} stands up out of the grass and goes down the slope to meet them, all of it, at a run, and something happens to the Legion as it goes that nobody on the hill will ever be able to describe properly afterwards: it blurs, and runs together, and there is a tiger on the plain, green as summer and as big as a keep, and it goes into the K'Chain Che'Malle like a dog into rats.

It cannot hold all of them. On the Fourth's stretch, Hunters are coming round the tiger's flank toward the gap in the stakes. Behind the hill, at the herd lines, Beklites who came round in the night are falling on the Rhivi wagons and the children under them.${b3In('sohra') ? `

"The children," Sohra says. Only that. She is already facing the herd lines.` : ''}${b3In('greysword') ? `

Along the stakes to the left the Grey Swords are forming a shield line on the gap, too few for it. Dannet looks at them, and then at you, and waits for the order like a soldier.` : ''}`,
      html:allyHTML('Outside Coral · noon'),
      ch:[{t:'"The stakes. Here." (Whoever falls here stays down.)', fx:()=>{ S.f.b3_c7_hunters = 'stakes'; }, go:()=>startBattle('b3_c7_stakes', {})},
          {t:'Kettle puts the cusser in the gap as the first comes through.', tag:'uses 1 cusser · whoever falls stays down', req:()=>b3In('kettle') && S.inv.cusser > 0, fx:()=>{ S.inv.cusser--; S.f.b3_c7_hunters = 'stakes'; S.f.b3_c7_maud = 1; }, go:()=>startBattle('b3_c7_stakes', {pre:`Kettle says "${b3c7Maud()}" very quietly and rolls the cusser into the gap in the stakes.`})},
          {t:'"The herd lines. The children." (Leave the stakes to the Grey Swords.)', fx:()=>{ S.f.b3_c7_hunters = 'herds'; b3c7Loy('sohra', 1); }, go:()=>startBattle('b3_c7_herds', {})},
          {t:'Not yet.', go:()=>startExplore()}]},
  b3_c7_after_probe:()=>({sp:'The gully mouth', fx:()=>{ S.f.b3_c7_probeDone = 1; gain('b3_c7_greymail'); }, txt:
`The probe is broken. The Seerdomin captain is lying at the gully mouth in his grey mail, which is very fine, and very cold, and comes off him easier than it should. It is on one of the squad before anyone has decided it should be.

${b3In('ohl') ? 'Ohl looks at the mail and does not touch it. "It\'s cold," he says. "It\'s the Seer\'s cold. Wear it if you like. I won\'t stitch anyone who sleeps in it."' : ''}

Out on the plain, toward the city, the haze is moving in a way haze does not.`,
      ch:[{t:'Back to the stakes.', go:()=>startExplore()}]}),
  b3_c7_after_stakes:()=>{ const fell = (S.f.lastFallen || []).filter(id => TPL[id]);
    return {sp:'The stake line', fx:()=>{ gain('b3_c7_hunterblade'); if (!fell.length) ally(2, 0, 'The stake line held'); else ally(1, 1, 'The stake line held'); }, txt:
`The gap is held. Two of them are lying among the broken stakes, and the second one goes on trying to stand long after it should have stopped.

${fell.length ? `${b3c7And(fell)} ${fell.length > 1 ? 'are' : 'is'} lying there too, and ${fell.length > 1 ? 'are' : 'is'} not getting up. You said *here*. Everyone knew what it meant. No word about it now; there will be time for that, and there will never be enough.${b3In('ohl') ? ' Ohl kneels, and takes out the list, and writes, there, in the grass, with his hand shaking.' : ''}` : `Everyone is still breathing. You count them, out loud, in the middle of a battle, and nobody laughs.`}

${S.f.b3_c7_maud && b3In('kettle') ? 'Kettle is sitting in the grass with the empty satchel. "That was what she was for," she says. ' : ''}One of the squad has picked up a broken blade-arm off the first one. It was never forged. It has not been put down since.${b3In('greysword') ? ' Dannet is leaning on her shield among the Grey Swords who came along the stakes to the Fourth\'s gap, and one of them has a hand on her shoulder.' : ''}

Then somebody on the hill screams, and it is not a soldier's scream.`,
      ch:[{t:'Look up the hill.', go:'b3_c7_r_hill'}]}; },
  b3_c7_after_herds:()=>({sp:'The herd lines', fx:()=>{ ally(2, -1, 'The Rhivi children'); }, txt:
`The herd lines are held, and the children's fire. The Rhivi children come out from under the wagons one at a time, very quiet, the way the herds taught them, and count each other, and get the right number.

${b3In('sohra') ? 'Sohra stands among them with her bow and does not cry, and then does, and then picks up the smallest and carries it back to the herds on her hip, talking to it in Rhivi the whole way.' : 'A Rhivi woman comes running down from the hollow and stops when she sees them, and puts her hands over her face.'}${b3In('ellis') ? ' Ellis counts them too, under her breath, and gets the same number they do, and only then lowers the bow.' : ''}

Then somebody on the hill screams, and it is not a soldier's scream.`,
      ch:[{t:'Look up the hill.', go:'b3_c7_r_hill'}]}),

  /* ---- what the Fourth saw from the foot of the hill: too far, and too late ---- */
  b3_c7_r_hill:()=>({sp:'The foot of the hill', scene:'b3_c7_hill', fx:()=>{ if (!S.f.b3_c7_saw) { ally(0, 2, 'The hill'); b3c7List(3); } S.f.b3_c7_saw = 1; if (b3c7Known7()) S.f.b3_c7_kallorLook = 1; }, txt:
`The crest is three hundred paces up a steep slope, and the Fourth start up it at a run, and it is the longest three hundred paces in the world.

You see it the way you see things a long way off: small, and clear, and much too slow. Brood is gone from the crest, down the far slope with his hammer, into the K'Chain Che'Malle. The tall man in the fur-collared cloak is not looking at the red tent any more. He has his sword up, and he has gone for Korlat, and she is down. Then he turns toward the tent.

Whiskeyjack is between them. He has his sword out. He is limping. You see him take the first blow and the second, and you see the leg go, a green branch in a frost, and you are a hundred and fifty paces off with your lungs on fire, and then it is over. He goes down.

Someone else is there first, a marine of the Host, nobody you know, and a blade goes into the tall man's side, and he staggers. The two women at the tent are fighting him as one, and they are very good, and then they are down too. Then fire, or something like fire, the wrong colour, and the standard bearer is between Kallor and the tent with his arms out, and the air tears, and the tall man goes backward into the tear with his hand pressed to his side.${S.f.b3_c7_kallorLook ? `

On the way into it he looks across the slope, once, and finds you, and knows you. Then he is gone.` : ''}

When the Fourth reach the crest it is quiet.`,
      ch:[{t:'The crest.', go:()=>{ startExplore('b3_c7_hill'); talk('b3_c7_h_arrive'); }}]}),

  /* ================= THE RIVER: the hilltop, after ================= */
  b3_c7_h_arrive:()=>({sp:'The hilltop', scene:'b3_c7_hill_dusk', txt:
`Korlat is sitting in the grass with her hands over a wound in her side, and blood between her fingers, and she is not looking at the wound. She is looking at the tent, where they have carried him.

The two marines are lying by the red tent, side by side, where they fell. There is a cloak over them, and no names. ${b3In('ohl') ? 'Ohl goes to find out. He comes back without them. "Another company," he says. "Which one, nobody here knows. I\'ll find out."' : ''}${b3In('vell') ? ' Vell stands by the cloak a while. "Somebody should know who they were," he says. "Somebody always knows. You just have to keep asking."' : ''}

The child is standing in the door of the tent with a bloody cloth in her hands that she does not seem to know she is holding. The standard bearer is sitting on the ground a little way off with his arms across his knees, and his arms are burned to the elbow in a way that is not like any burn you have seen.

Out on the plain the tiger is gone, and the K'Chain Che'Malle are gone, and something gold is moving over the ground where they were, like dust, or a tide. Over the city, over the keep, the sky is wrong.`,
      ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c7_h_tent:()=> S.f.b3_c7_htent ? {sp:'The tent', txt:`Korlat is in the tent with him now. The flap stays shut.`, ch:[{t:'Leave them.', go:()=>startExplore()}]}
    : {sp:'The tent', fx:()=>{ S.f.b3_c7_htent = 1; }, txt:
`They have laid him on a camp bed in Brood's tent, with his sword on his chest and his hands on the sword, and somebody has straightened the leg. That is the thing you will remember. Somebody straightened the leg, carefully, as if it mattered now.

He looks like what he was: a mason from Quon Tali who became a soldier, and then a commander, and then the best of them, and never let anyone make a fuss. His face is very calm. It looks as if he has finally been allowed to lie down.

${b3In('brisk') ? `Brisk salutes. She has never saluted anyone in the Fourth's hearing but Hood, at the gate of a fight. She holds it a long time.\n\n` : ''}${b3In('ohl') ? `Ohl stands at the foot of the bed and says something very quietly in Ehrlii, not to Hood this time.\n\n` : ''}${b3In('ellis') ? `Ellis looks at the straightened leg, and then at her own gloved hand, and goes back out of the tent without a word.\n\n` : ''}Mallet never got his week.`,
      ch:[{t:'Stand there a while.', go:()=>startExplore()},
          {t:'"Sir."', fx:()=>{ S.f.b3_c7_said = 1; }, go:()=>startExplore()}]},
  b3_c7_h_korlat:()=>({sp:'Korlat', fx:()=>{ S.f.b3_c7_hkorlat = 1; }, txt:
`She looks up at you. Her face is perfectly composed. "Sergeant," she says. "You were at the stakes."

"Yes, lady."

"Good," Korlat says. "Somebody had to be." She looks back at the tent. "He would have told you so." After a while she says, very low, "I could not reach him. I was three paces away, and I could not reach him." She does not say anything else, and you do not ask her to.`,
      ch:[{t:'Leave her.', go:()=>startExplore()}]}),
  b3_c7_h_bearer:()=>({sp:'The standard bearer', fx:()=>{ S.f.b3_c7_hbearer = 1; }, txt:
`The standard bearer is sitting with his burned arms across his knees, very still, looking at nothing. Up close the burns are worse, and they are not burns.

He looks up at you, and something in his face is not a standard bearer's face at all, and then it is again. "Sergeant," he says. "I was slow." That is all.

${b3In('tuft') ? 'Tuft will not come within ten paces of him. Later she says, "I still don\'t know. I think I know less than I did." She looks at her own hands. "I think he saved her. I don\'t know what that means either."' : ''}`,
      ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c7_h_fox:()=>({sp:'Silverfox', fx:()=>{ S.f.b3_c7_hfox = 1; b3c7Loy('tuft', 1); }, txt:
`She is sitting on the ground outside the tent now with the bloody cloth folded in her lap, and she is fifteen, or looks it, and she is very much older, and she is crying the way a child cries, with her whole face.

${b3In('tuft') ? `Tuft sits down beside her. Presently the child leans against her, and Tuft puts an arm round her, and they sit like that while the sun goes down.

"She knew him," Silverfox says, eventually, into Tuft's shoulder. "Tattersail. She was going to tell him things, after. So was I." She shakes her head. "There are too many of me to grieve with. They all want to."

"Let them," Tuft says. "There's room."` : `She looks up at you. "He stood in front of me," she says. "Why do they do that? Why do soldiers do that?" The Fourth has no answer she would want.`}`,
      ch:[{t:'Leave them be.', go:()=>startExplore()}]}),
  b3_c7_h_brood:()=>({sp:'Caladan Brood', fx:()=>{ S.f.b3_c7_hbrood = 1; }, txt:
`Brood came back up the hill when it was over, with his hammer, and he has not put it down. He is standing by the tent with his back to everyone, and nobody goes near him.

When you pass he says, without turning, "I went down the hill." It is not addressed to you. It is not addressed to anyone. "I went down the hill."`,
      ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c7_h_fire:()=> !S.f.b3_c7_hspawn ? {sp:'The fire on the crest', txt:
`A fire has been built up on the crest, because it is getting dark and people need something to look at that is not the tent. The squad stands round it, and stays standing.

Then everybody on the hill looks up at the same time, toward the city.`,
      ch:[{t:'Look.', go:'b3_c7_h_spawn'}]}
    : {sp:'The fire on the crest', txt:
`The rain off the Spawn has come and gone over the hill, warm and dirty, and the fire is hissing in it. ${b3In('kettle') ? 'Kettle is looking east, at the mountains, where the quorls came from. "Twist\'s lot went in over the keep," she says. "I want to know how many." There is no telling yet.' : ''}${b3In('vell') ? ' Vell is on his back in the wet grass, looking at the sky over the city, which is the wrong colour, and for once he does not seem to like it.' : ''}`,
      html:allyHTML('Outside Coral · after'),
      ch:[{t:'Down to the shore, where the armies are meeting.', go:'b3_c7_h_out'},
          {t:'Not yet.', go:()=>startExplore()}]},
  b3_c7_h_spawn:()=>({sp:'Coral · the keep', scene:'b3_c7_spawn', fx:()=>{ S.f.b3_c7_hspawn = 1; S.f.b3_c7_spawn = 1; }, txt:
`Something is coming down out of the sky over the keep. It is so big that for a long time it does not seem to move, and then it does, and the light changes over the whole plain. Black, and vast, and streaming water from every edge as if it had been pulled up out of the sea. Moon's Spawn.${S.f.b3_rake ? ' The Andii lord\'s, who was a black dragon over the field at Capustan.' : ''} ${b3In('tuft') ? `Tuft says, "Oh," very softly, the way you say it when somebody you knew comes into a room.` : ''}

It comes down on the Seer's keep slowly, the way a mountain would fall if mountains fell, and the sound arrives a long while after, and goes on.

Then the rain comes off it, across the plain and up the hill, warm and dirty, and on the plain, in the rain, where the gold dust is, the Grey Swords are gathering round something lying in the grass, and they are kneeling. ${b3In('greysword') ? 'Dannet sees it, and goes very still, and then she is running down the hill toward them, and you let her go.' : 'Nobody on the hill says what it is. Everybody on the hill knows.'}`,
      ch:[{t:'Wait for the rain to pass.', go:()=>startExplore()}]}),
  b3_c7_h_out:()=>({sp:'Down to the shore', txt:
`The Host is coming out of Coral by the coast road, company by company, carrying its own, and Brood's army is going down off the hill to meet it on the shore. The cheering never starts. Neither army knows what to say to the other one.

${b3In('brisk') ? 'Brisk is looking at every shield that comes out of the city, for one with a notch. She has not stopped since the rain.' : ''}${b3In('ellis') ? `${b3In('brisk') ? ' ' : ''}Ellis is reading the faces too, every one, as they come. She has never said whose she is looking for.` : ''}`,
      ch:[{t:'Down to the shore.', go:()=>{ startExplore('b3_c7_shore'); talk('b3_c7_s_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),
});
Object.assign(B3CH7.dlg, {
  /* ================= BOTH ROADS: the shore ================= */
  b3_c7_s_arrive:()=>({sp:'The shore', fx:()=>{ S.f.b3_c7_shore = 1; }, txt:
`The two armies meet on the shore below the hill in the last of the light, and stand there, and look at each other: the Host that came out of the mountains and the city, black with soot and wet with the Spawn's rain, and Brood's people coming down off the hill, Rhivi and Barghast and Andii, the Grey Swords with their dead, the few who are left of Trake's Legion walking as if they had forgotten how.

The shore is quiet. ${b3c7Flew() ? 'Somebody in Brood\'s army shouts *Where were you?* and somebody in the Host shouts back *Here*, and that is the whole of it.' : 'The Host\'s companies that went by quorl come out along the coast road, and the companies that came down the river stand and watch them come, and count, and get it wrong.'}

On the plain behind the hill, where the K'Chain Che'Malle were, there is something gold lying over the ground like a frost that will not melt. Beyond the old stake line, soldiers are already carrying stones.${b3In('greysword') ? ` Dannet goes to the Grey Swords and their dead without asking, and you let her, and she comes back an hour later carrying a stone.` : ''}${b3In('sohra') ? ` Sohra rides out to meet the Rhivi as they come down, and rides back, and says the herds are mostly whole. "Mostly," she says again, as if trying the word.` : ''}`,
      ch:[{t:'On.', go:()=>startExplore()}]}),

  /* ---- the barrow: a gift each, through the night ---- */
  b3_c7_barrow:()=> S.f.b3_c7_barrow ? {sp:'The barrow', scene:'b3_c7_barrow', txt:
`The barrow stands on the plain in the dawn light, higher than a man, made of gifts: stones, mostly, polished on sleeves, and knives, and coins, and a helmet on the top that nobody will ever touch. Soldiers of every army are still coming to it, one at a time, and setting something down, and going away again.${S.f.b3_c7_burial ? '' : `

Down at the shore everyone is gathering at the water's edge, looking out to sea.`}`,
      ch:[{t:'Down to the water.', req:()=>!S.f.b3_c7_burial, go:'b3_c7_burial'},
          {t:'Leave it.', go:()=>startExplore()}]}
    : {sp:'The barrow', scene:'b3_c7_barrow', txt:
`The Grey Swords carried him off the plain at dusk, in the rain, and laid him beyond the old stake line, and then something happened that nobody had ordered.

The T'lan Imass came. Dust, and then shapes in the dust, grey and old as the ground, standing round him in a ring. One of them spoke, in a voice like stones settling. *We mark the death of this man, whose spirit travels to no god. He has walked through Hood's Gate, and that is all.* And then: *For the gift this mortal has given us, we shall each offer one in turn.* And one by one they did, and went.

Then the soldiers started. All night, from every army, one at a time, a gift each. Nobody organised it. Nobody had to.

${b3In('greysword') ? `Dannet is standing at the foot of it with her shield in both hands. She has not moved since dusk.\n\n` : ''}It is the Fourth's turn.`,
      ch:[{t:'The sergeant\'s old Second Army whistle, no longer used.', fx:()=>{ S.f.b3_c7_barrow = 1; S.f.b3_c7_gift = 'the sergeant\'s old Second Army whistle'; }, go:'b3_c7_barrow2'},
          {t:'One of Kettle\'s sharpers, fuse drawn.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; S.f.b3_c7_barrow = 1; S.f.b3_c7_gift = 'one of Kettle\'s sharpers, fuse drawn'; b3c7Loy('kettle', 1); }, go:'b3_c7_barrow2'},
          {t:'A stone off the shore, polished on a sleeve, like most of them.', fx:()=>{ S.f.b3_c7_barrow = 1; S.f.b3_c7_gift = 'a stone off the shore, polished on a sleeve'; }, go:'b3_c7_barrow2'},
          {t:'Not yet.', go:()=>startExplore()}]},
  b3_c7_barrow2:()=>({sp:'The barrow', scene:'b3_c7_barrow', fx:()=>{ ally(1, -2, 'The barrow'); }, txt:
`You set it down on the pile, among the others, and step back.

${b3In('ohl') ? `Ohl sets down a needle. Just a needle, a curved one, the kind he has stitched every member of the Fourth with at least once. "He healed a city's grief," he says. "I'd like him to have something from the trade."${S.f.b3_karnadasHeard ? ' A pause. "Their Destriant went the same way, at Capustan. Healing. The warren ate him." He does not say anything else about it.' : ''}\n\n` : ''}${b3In('brisk') ? `Brisk sets down nothing. She stands with her shield and looks at the helmet on top of the pile, and then she nods to it, once, the way she nods to a man in the line beside her.\n\n` : ''}${b3In('sohra') ? `Sohra sets down one of her bone beads, one of the herd's dead she sang home, and sings, very low, and the Barghast standing nearby stop talking to listen.\n\n` : ''}${b3In('greysword') ? `Dannet sets her shield down at the foot of the barrow, face up, and kneels, and takes the grey paint and the brush out of her kit. When she stands up the wolf is finished. She picks the shield up again. "Now I know what it's for," she says.\n\n` : ''}${b3In('tuft') ? `Tuft sets down a card. Not one of the ones that came up for the Fourth. A blank one, from the back of the deck. "He wasn't anybody's," she says. "Somebody should have given him a card nobody else had."\n\n` : ''}${b3In('ellis') ? `Ellis sets down a stone off the shore, like most of them, and stands back with her gloved hand closed, and starts to count the gifts round it. She loses the count. She does not start again.\n\n` : ''}${b3In('vell') ? `Vell sets down a length of rope, cut clean, whipped at both ends, tied in a Guild knot that will not slip. "So it holds," he says. He says it to the helmet on the top.\n\n` : ''}The procession goes on behind you, through the dawn, one at a time.`,
      ch:[{t:'Down to the water.', fx:()=>{ if (b3In('greysword')) S.f.b3_c7_dannetWolves = 1; b3c7List(1); }, go:'b3_c7_burial'},
          {t:'Not yet. Stay a while.', fx:()=>{ if (b3In('greysword')) S.f.b3_c7_dannetWolves = 1; b3c7List(1); }, go:()=>startExplore()}]}),

  /* ---- the burial: Moon's Spawn out over the sea, from the shore ---- */
  b3_c7_burial:()=>({sp:'The shore · dusk', scene:'b3_c7_sea', fx:()=>{ if (!S.f.b3_c7_burial) b3c7List(1 + (S.f.b3_c7_news || S.f.b3_c7_saw ? 0 : 3)); S.f.b3_c7_burial = 1; ally(1, -1, 'The Spawn goes out'); }, txt:
`They say afterwards that the Lord of Moon's Spawn offered it himself: that the Spawn was dying, and he asked that it be a tomb. For Whiskeyjack. For the Bridgeburners who did not come out of Coral: Trotts, and Hedge, and the others whose names their own will say. For the Black Moranth's commander, Twist, who went in over the keep with forty and did not come back. The Fourth hear it the way soldiers hear everything, three times, wrong, and then right.

What the Fourth see is this. The Spawn, low over the water, broken, leaning, going out to sea in the last of the light, very slowly. On the shore the Host stands in its companies and Brood's people stand beside them. No order is given. Everybody is at attention anyway.

Somewhere along the shore the High Fist is standing with what is left of the Bridgeburners. ${b3In('kettle') ? 'Kettle has her hand up to her eyes against the sun, counting the quorls that circle the Spawn as it goes. She stops counting when she gets to the end, and does not say the number.' : ''}${b3In('vell') ? ' Vell watches it go with his head back. He worked the roofs of Darujhistan the season it hung over the city, a second sky with nobody to rope it. He watches it all the way out.' : ''} You hear, from along the line, in a voice you know: *I have lost a friend.* That is all the High Fist says.

The Spawn gets smaller. Then it is a dark shape on the horizon. Then it is nothing.`,
      ch:[{t:'Stand there until it is dark.', go:'b3_c7_burial2'}]}),
  b3_c7_burial2:()=>({sp:'The shore · night', scene:'b3_c7_shore_night', txt:
`${b3c7Fell().length ? `${b3c7And(b3c7Fell())} went out with it, or into the ground by the barrow; the Fourth will argue about which, later, and never settle it, because it does not matter where. ` : ''}You count the Fourth, there on the shore, in the dark. ${numw(b3c7Count(), true)}. You count twice. ${b3In('ohl') ? `\n\nBeside you Ohl says, very quietly, "${b3ListWords()}." He doesn't take the list out. He doesn't need to.` : ''}

*After Coral*, he said.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

  /* ---- the fire: the Fourth's last words ---- */
  b3_c7_s_fire:()=>({sp:'The fire on the shore', txt:
`A fire on the shore, with the sea making the noise the sea makes. The squad sits round it, close, the way it always has.${b3In('ellis') ? ' Ellis sits back from the fire, facing out, as she has at every fire since the dead horses.' : ''}${b3In('vell') ? ' Vell is splicing a frayed rope-end by feel, not looking at it.' : ''} Sleep can wait. Sleep is where tomorrow starts.`,
      html:allyHTML('Coral · the shore, after'),
      ch:[{t:'Ohl, and the list.', req:()=>b3In('ohl') && !S.f.b3_c7_wOhl, go:'b3_c7_w_ohl'},
          {t:'Kettle, and the count.', req:()=>b3In('kettle') && !S.f.b3_c7_wKettle, go:'b3_c7_w_kettle'},
          {t:'Brisk, and Tav.', req:()=>b3In('brisk') && !S.f.b3_c7_wBrisk && !!(S.f.b3_c7_tavFound || S.f.b3_c7_stav), go:'b3_c7_w_brisk'},
          {t:'Tuft, and the child.', req:()=>b3In('tuft') && !S.f.b3_c7_wTuft, go:'b3_c7_w_tuft'},
          {t:'Sohra, and the Mhybe.', req:()=>b3In('sohra') && !S.f.b3_c7_wSohra, go:'b3_c7_w_sohra'},
          {t:'Dannet, and the Wolves.', req:()=>b3In('greysword') && !S.f.b3_c7_wDannet, go:'b3_c7_w_dannet'},
          {t:'Ellis.', req:()=>b3In('ellis') && !S.f.b3_c7_wEllis, go:'b3_c7_w_ellis'},
          {t:'Vell.', req:()=>b3In('vell') && !S.f.b3_c7_wVell, go:'b3_c7_w_vell'},
          {t:'The leg. Say it out loud, once.', req:()=>!S.f.b3_c7_wLeg && !!S.f.b3_c7_burial, go:'b3_c7_w_leg'},
          {t:'Sleep.', req:()=>!S.f.b3_c7_srest, fx:()=>{ S.f.b3_c7_srest = 1; b3Rest('The squad sleeps on the shore with the sea going in and out, all night, as if nothing had happened. Wounds close, mostly. Other things take longer.'); }, go:()=>startExplore()},
          {t:'Leave the fire.', go:()=>startExplore()}]}),
  b3_c7_w_ohl:()=>({sp:'Ohl', fx:()=>{ S.f.b3_c7_wOhl = 1; }, txt:
`Ohl has the list open on his knee and a pen, and he is not writing. "${b3ListWords()}," he says. "I added Whiskeyjack. I added *two marines*, because nobody could tell me more than that. I'll find out from somebody. I added the Moranth commander. I added the Shield Anvil, who wasn't ours, and I don't care." He closes it. "Some of them I'm going to have to write by what they did. It's not enough. It's what there is."

${b3c7Fell().length ? `He looks at the fire. "And ${b3c7And(b3c7Fell())}. Those I wrote in the street, so I wouldn't lose my nerve. I'll copy them out properly." His hands are steady. His voice isn't.\n\n` : ''}"Seven Cities is burning," he says, after a while, about nothing. "My country. I was born in Ehrlitan." He looks at you. "I'd like to go home, Sergeant. Not to stay. To look."`,
      ch:[{t:'"When we can, old man."', fx:()=>{ b3c7Loy('ohl', 1); }, go:'b3_c7_s_fire'},
          {t:'Let him be.', go:'b3_c7_s_fire'}]}),
  b3_c7_w_kettle:()=>({sp:'Kettle', fx:()=>{ S.f.b3_c7_wKettle = 1; }, txt:
`"Thirty-one," Kettle says. "Quorls. They took forty in over the keep and thirty-one came back, and the Achievant didn't." She is turning something over in her fingers: a scrap of black chitin. "One of them gave me this. Off his. I didn't ask. They don't give anybody anything."

${S.f.b3_c7_maud ? `"And ${b3c7Maud()}'s gone," she says. "She went where she was for. Chub would have said that was the whole point of her." She tucks the chitin into the satchel where the cusser used to be. ` : b3c7MaudLeft() ? `"${b3c7Maud()}'s still in the bottom of the satchel," she says. "I didn't throw her. Nothing was enough." She looks at the sea. "Something will be." ` : `"No cusser left," she says. "${b3c7Maud()} went where she was needed, before all this." She looks at the sea. "I'll draw another, and name her the same." `}Then: "${b3c7Count() > 1 ? `${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}, ${numw(S.inv.burner || 0)} burner${(S.inv.burner || 0) === 1 ? '' : 's'}, ${numw(S.inv.cusser || 0)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}. Not the same as this morning.` : 'Not the same as this morning.'}" She grins, and it nearly works. "Nothing's the same as this morning, Sergeant. I've decided I like it."`,
      ch:[{t:'"Put it in the ledger."', fx:()=>{ b3c7Loy('kettle', 1); }, go:'b3_c7_s_fire'},
          {t:'Let her count.', go:'b3_c7_s_fire'}]}),
  b3_c7_w_brisk:()=>({sp:'Brisk', fx:()=>{ S.f.b3_c7_wBrisk = 1; }, txt:
`Brisk is sitting with her back to the fire, which means she is looking at the Fourth Regiment's lines, where Tav is, with his face tied up. "He'll keep the eye," she says. "The healer says. Not the look of it."

${b3c7Sealed() ? `She takes the letter out of her gorget, still sealed, three years and a war old. She holds it a long time. Then she puts it back. "Not yet," she says. "He's not dead. That was the deal."` : `"Four coppers," she says. "He still won't pay." She almost smiles. "I asked him, on the shore. He said *after*. Everybody says after."`}

"We don't leave people," she says. "I said it on the river bank when the quorls went, and they went anyway, and I couldn't go with them." She looks at you. "Turned out you don't have to go with them. You have to be there when they come back." She looks at her hands. "Whiskeyjack didn't come back."`,
      ch:[{t:'"No. He didn\'t."', fx:()=>{ b3c7Loy('brisk', 1); }, go:'b3_c7_s_fire'},
          {t:'Sit with her.', go:'b3_c7_s_fire'}]}),
  b3_c7_w_tuft:()=>({sp:'Tuft', fx:()=>{ S.f.b3_c7_wTuft = 1; }, txt:
`"She's going away," Tuft says. "With the Imass. Over the sea, somewhere, to find the rest of them." She has the Deck in her hands and is not shuffling it. "She told me. She said there are too many of her to stay. Tattersail, and the others. They all want different things, and they all want to go."

She looks at the fire. "I kept my promise. I said she was Tattersail, at Darujhistan, and she is, and she's more than that, and I never knew how much more until today." A long breath. "She called me Tuft. She remembered my tongue between my teeth."

"I'm not going with her," Tuft says. "I wanted to. I'm a soldier." She says it as if she were finding out. "I'm the Fourth's. That's what I am."`,
      ch:[{t:'"You are."', fx:()=>{ b3c7Loy('tuft', 1); }, go:'b3_c7_s_fire'},
          {t:'Say nothing. Let her shuffle.', go:'b3_c7_s_fire'}]}),
  b3_c7_w_sohra:()=>({sp:'Sohra', fx:()=>{ S.f.b3_c7_wSohra = 1; }, txt:
`"She sleeps," Sohra says. "The Mhybe. In Capustan, a long way north. The Daru men are sitting with her, the fat one's friends. She is asleep and she will not wake, and in the sleep she is young." She has her bone beads in her lap and is counting them. "The child made it for her. A place in the dream. The spirits told me." She stops counting. "It is a good place. There is grass."

"I watched the Malazans," she says. "As she asked." She looks round the fire. "I will tell my people you are a slow herd, and you complain, and you do not leave anyone." A pause. "And that I have a herd-mother now, who is a Malazan, and they can say what they like about it."`,
      ch:[{t:'"Sing, then. For all of them."', fx:()=>{ b3c7Loy('sohra', 1); ally(1, -1, 'A Rhivi song on the shore'); }, go:'b3_c7_s_fire'},
          {t:'Let her count the beads.', go:'b3_c7_s_fire'}]}),
  b3_c7_w_dannet:()=>({sp:'Dannet', fx:()=>{ S.f.b3_c7_wDannet = 1; }, txt:
`The wolf on Dannet's shield is ${S.f.b3_c7_dannetWolves ? 'finished: grey, and lean, and looking back over its shoulder at whoever carries it.' : 'still half a wolf.'} She has the cold Fener amulet in her fist.

"He took their grief," she says. "The Imass. All of it, at once, and it killed him. That's what a Shield Anvil is for. I used to think it was a title." She opens her hand and looks at the amulet. "I said I would tell you what the Wolves were, when I knew. A god, or a grief with teeth." She closes her hand. "Both. They're both. I heard them howl when he died. They were sorry."

She takes the amulet off over her head and holds it out over the fire, and does not let go, and then puts it in her kit instead. "Not yet," she says. "The boar was a long time in my family."`,
      ch:[{t:'"Take it home with you."', fx:()=>{ b3c7Loy('greysword', 1); }, go:'b3_c7_s_fire'},
          {t:'Let her be.', go:'b3_c7_s_fire'}]}),
  b3_c7_w_ellis:()=>({sp:'Ellis', fx:()=>{ S.f.b3_c7_wEllis = 1; }, txt:
`Ellis is sitting a little apart, as she does, looking along the shore at all the roads that lead anywhere but here. "I looked at every face that came out of the city," she says. "And every face that came down the hill." She doesn't say whose face she was looking for. She never has. "Not there."

"I'd like it noted," she says, "that I'm still looking." A pause. "And that I'm still here. Both of those."`,
      ch:[{t:'"Noted."', fx:()=>{ b3c7Loy('ellis', 1); }, go:'b3_c7_s_fire'}]}),
  b3_c7_w_vell:()=>({sp:'Vell', fx:()=>{ S.f.b3_c7_wVell = 1; }, txt:
`Vell is lying on his back in the sand with his hands behind his head, looking at the sky where the Spawn used to be. "Nothing to string a line between," he says. "All the way from Pale to here, nothing. I thought I'd hate it." He is quiet a while. "I don't. I like the sky. Don't tell the Guild."`,
      ch:[{t:'"Your secret\'s safe."', fx:()=>{ b3c7Loy('vell', 1); }, go:'b3_c7_s_fire'}]}),
  b3_c7_w_leg:()=>({sp:'The fire', fx:()=>{ S.f.b3_c7_wLeg = 1; }, txt:
`You say it out loud, once, to the fire, because somebody should: that Mallet wanted a week, after Darujhistan, and never got it. That Whiskeyjack said *after Coral* to everyone who asked, and meant it, and that it was the leg in the end, not the sword. That it could have been mended. That nobody could have made him.

${b3c7Mates().length ? `The squad lets it stand. ${b3In('brisk') ? 'Brisk nods, once.' : ''} ${b3In('ohl') ? 'Ohl says, "I have a rule. I don\'t heal people who won\'t lie down." It is not a joke.' : ''}${b3In('ellis') ? ' Ellis says, "Noted," very quietly, which from her is a eulogy.' : ''}${b3In('vell') ? ' Vell pulls the knot he is tying tight, and holds it.' : ''}` : 'There is nobody to hear it but the fire.'}

You watched how he stood, all the way from Pale. You told yourself watching was all a sergeant could do. It was. That is the worst of it.`,
      ch:[{t:'Let the fire burn down.', go:'b3_c7_s_fire'}]}),

  /* ---- the shore's people ---- */
  b3_c7_s_tav:()=>({sp:'Tav', fx:()=>{ S.f.b3_c7_stav = 1; b3c7Loy('brisk', 1); }, txt: S.f.b3_c7_tavFound ?
`Tav is at the Fourth Regiment's fire with his face tied up, eating, very slowly, out of one side of his mouth. He sees Brisk and lifts his spoon. "Bris," he says. "I'm told I'm handsomer." He has told himself that. He still does not sing.`
  : `The Fourth Regiment comes along the shore from the coast road in the last of the light, what is left of its front companies, carrying its own. Brisk sees the shield before anyone, the one with the notch top left. She does not run. She walks, very fast, the way she walks into a line.

Tav is alive. He has a cloth tied round his head that was white once, and the left side of his face is going to be a different shape from now on. He stops when he sees her. Neither of them says anything. Then he puts his hand on top of her head and leaves it there.

"Bris," he says. "You weren't there."

"No," Brisk says. "I was on the river."

"Good," Tav says. "Good." He does not sing. You get the feeling he will not, for a while.`,
      ch:[{t:'Leave them.', go:()=>startExplore()}]}),
  b3_c7_s_dujek:()=>({sp:'Dujek Onearm', fx:()=>{ S.f.b3_c7_sdujek = 1; }, txt:
`The High Fist is sitting on a rock above the tide line with his one hand on his knee, looking at the place on the horizon where the Spawn was. He hears you and does not turn round.

"Sergeant." A long silence. "He wouldn't lie down. I told him." Another. "I told him, and I went on the quorls, and left him four thousand cooks and a river."

He turns his head. "The Host goes where it's sent. It always has. There's talk of Seven Cities, and what's left of the Empire there, and the proclamations, and who wrote what about whom, and I haven't decided yet what I'm going to lie about." He looks at the Fourth. "There's a place in it for marines who came up out of the Pale with all five and kept coming. If they want one."`,
      ch:[{t:'"We\'ll think on it, High Fist."', go:()=>startExplore()}]}),
  b3_c7_s_kruppe:()=>({sp:'Kruppe', fx:()=>{ S.f.b3_c7_skruppe = 1; }, txt:
`A round little man in a stained waistcoat is sitting on an upturned crate by the Rhivi fires, mopping his brow with a silk handkerchief, the most out-of-place person on a battlefield you have ever seen, and the least surprised.

"Ah," he says. "The sergeant of the Fourth, who walked beside the child from Pale and never once asked Kruppe anything, for which Kruppe is grateful beyond the poor powers of speech." He folds the handkerchief. "Kruppe merely observes that Darujhistan is a long way, and a city of blue fire, and that there are doors in it which want standing in, and a great many inns, and that the Empire's ledgers are very seldom read there." He beams. "Kruppe would never presume to suggest. Kruppe only mentions."${b3In('vell') ? `

His eyes find Vell, and twinkle. "And a son of the Guild, a long way from his roofs. Kruppe knows of several roofs that have missed him." Vell goes red to the ears, and says he has no idea what Kruppe means, and Kruppe agrees that he has none at all.` : ''}`,
      ch:[{t:'"Noted, Kruppe."', go:()=>startExplore()}]}),
  b3_c7_s_moranth:()=>({sp:'A Black Moranth', fx:()=>{ S.f.b3_c7_smoranth = 1; }, txt:
`A Black Moranth is standing at the water's edge with his helm on, looking out at where the Spawn went, very still. The Moranth do not grieve where anyone can see. This one is standing where anyone can see.

${b3In('kettle') ? `Kettle goes and stands beside him, a pace too close, the way she stands near quorls. Then he takes something off his own chitin, a small black scale, and holds it out to her, and she takes it.

"Square," he says. Then he walks away up the shore.` : `He does not turn when you come up. After a while he says, in his dry clicking voice, "Thirty-one," and nothing else.`}`,
      ch:[{t:'Leave him to the sea.', go:()=>startExplore()}]}),
  b3_c7_s_fox:()=>({sp:'Silverfox', fx:()=>{ S.f.b3_c7_sfox = 1; b3c7Loy('tuft', 1); }, txt:
`The child is standing at the water's edge in red wool, alone, with the T'lan Imass standing back from her in the dusk like a grey wood. She looks perhaps fifteen. She is very much older.

${b3In('tuft') ? `Tuft goes to her. You don't hear what they say. You see the child put her hand flat on Tuft's cheek, the way Tattersail used to put her hand over a card, and you see Tuft stand very still and let her. When Tuft comes back her face is wet and she is smiling, which you have never seen her do at the same time.

"She remembered me," Tuft says. "My tongue between my teeth. She's going away with them, over the sea." She sits down hard on the sand. "He stood in front of her. Whiskeyjack. She said Tattersail was going to tell him things, after, and now none of them can."` : `She looks at the Fourth as you pass, and nods, gravely. Then she looks back at the sea.`}`,
      ch:[{t:'Leave her to the Imass.', go:()=>startExplore()}]}),
  b3_c7_s_grey:()=>({sp:'The Grey Swords', fx:()=>{ S.f.b3_c7_sgrey = 1; }, txt:
`The Grey Swords have pitched their camp nearest the barrow. Capan women mostly, the acolytes, shorn, in grey, and among them the few old troopers who came out of Capustan, very quiet. The whole company talks in murmurs.

${b3c7Waiting('greysword') ? `Dannet is with them. She comes out of the lines when she sees the squad, with the half-painted shield on her arm, and stops in front of you. "Sergeant," she says. "I'm lent to you till the Domin's done." She looks back at the barrow. "The Domin's done." Then: "Ask me anyway."` : b3In('greysword') ? `They know Dannet. They make room for her at the fire without being asked, and she sits, and an old trooper puts his hand on her shoulder and leaves it there.` : `An acolyte looks up at the Fourth's badges, and nods${S.f.b3_c3_key === 'camps' ? ', and you know her: she was in the Camp at Capustan, the day the Fourth went in with the company' : ''}, and says in Daru, "He would have said *sir*. To you. To everyone." She looks at the barrow. "We are learning to say it for him."`}`,
      ch:[{t:'"Come back to the Fourth, Dannet, if you want it."', req:()=>b3c7Waiting('greysword'), fx:()=>{ b3SwapIn('greysword'); }, go:()=>startExplore()},
          b3c7AnvilCh('grey'),
          {t:'Leave them to their dead.', go:()=>startExplore()}]}),
  b3_c7_s_rhivi:()=>({sp:'Rhivi riders', fx:()=>{ S.f.b3_c7_srhivi = 1; }, txt:
`The Rhivi have brought the herds down to the shore to drink at a stream that comes out of the hill, and the riders are sitting their horses among the bhederin, singing, low, the songs for the dead, and then one more, facing north, slow, the kind you sing to someone who is asleep and will not wake.

${b3c7Waiting('sohra') ? `Sohra rides out of the herd when she sees the squad, and pulls up, and looks down at you. "The Mhybe sleeps," she says. "For ever. In the sleep she is young." Her face does something. "I watched the Malazans for her, ${S.f.b3_herdMother ? 'herd-mother' : 'Sergeant'}. I am not finished watching."` : b3In('sohra') ? `They call to Sohra in Rhivi as you pass, and she answers, and for a moment she is one of them again, and then she is back in the Fourth's file, walking.` : `A rider looks at your badges and says something in Rhivi, and then in bad Daru: "The Malazans. You don't leave people." It might be a compliment. You decide to take it as one.`}`,
      ch:[{t:'"Ride with the Fourth again, Sohra."', req:()=>b3c7Waiting('sohra'), fx:()=>{ b3SwapIn('sohra'); }, go:()=>startExplore()},
          {t:'Leave them to the herds.', go:()=>startExplore()}]}),

  /* ---- the road out ---- */
  b3_c7_roads:()=> !S.f.b3_c7_burial ? {sp:'The Host\'s lines', txt:
`The Host's lines along the shore, companies pitching camp as if they meant to stay, which none of them do. Clerks are already making lists. Nothing is being decided yet. ${S.f.b3_c7_barrow ? 'Everyone is going down to the water.' : 'Beyond the old stake line soldiers are carrying stones to the plain.'}`,
      ch:[{t:'Not yet.', go:()=>startExplore()}]}
    : {sp:'The Host\'s lines', txt:
`Morning on the shore. The Host is already getting ready to be somewhere else; armies always are. Clerks with slates. Quartermasters with grievances. Rumours: Seven Cities; the proclamations taken down, or not; Darujhistan; home, wherever that is. Brood's people are packing too, the Rhivi first, the herds already moving off inland.

The Fourth has to go somewhere. It is your call. It always was.`,
      ch:[{t:'Stay with the Host, whatever it is called now.', go:'b3_c7_road_host'},
          {t:'Darujhistan, the long way, and a door to stand in.', go:'b3_c7_road_daru'},
          {t:'Stand the Fourth down. Each to their own road.', go:'b3_c7_road_stand'},
          {t:'Not yet.', go:()=>startExplore()}]},
  b3_c7_road_host:()=>({sp:'The Host', txt:
`The Host, then. Dujek's, whatever the proclamations end up calling it, going where it is sent, which by every rumour on the shore is Seven Cities and the year after this one.

${b3In('ohl') ? 'Ohl looks up when you say it. Seven Cities is his country. "Ehrlitan," he says, and nothing else, and it is enough. ' : ''}${b3In('kettle') ? 'Kettle looks at the quorl roosts down the shore. "They\'ll be coming," she says. "The Moranth. They always come." ' : ''}${b3In('brisk') ? 'Brisk looks at the Fourth Regiment\'s lines, where Tav is. "Same army," she says. That is all she needs. ' : ''}${b3In('sohra') ? 'Sohra watches the herds going inland without her, and then turns her back on them. "A long way from the grass," she says. "I said I would watch the Malazans. I did not say where." ' : ''}${b3In('greysword') ? 'Dannet looks at the Grey Swords\' camp by the barrow. "I am lent," she says. "No one has asked for me back." ' : ''}${b3In('ellis') ? 'Ellis looks along the coast road. "More roads," she says. From her it might be approval. ' : ''}${b3In('vell') ? 'Vell says, "Seven Cities means ships. Ships have rigging." He has plainly been waiting a long time to say it. ' : ''}`,
      ch:[{t:'This road.', fx:()=>{ S.f.b3_c7_key = 'host'; b3c7Loy('ohl', 1); b3c7Loy('brisk', 1); }, go:'b3_c7_end'},
          {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c7_road_daru:()=>({sp:'Darujhistan', txt:
`Darujhistan, then. The long way back over the Domin and the plain to the city of blue fire on its lake, where nobody reads the Empire's ledgers and Kruppe has already, somehow, arranged everything. Not a bar of your own; not anybody else's either. The Phoenix has a door that needs standing in, and the Fourth know what a door is for.

${b3In('tuft') ? 'Tuft looks west. "It\'s where she was born," she says. "The second time." ' : ''}${b3In('kettle') ? 'Kettle frowns. "No Moranth quartermaster in Darujhistan," she says. Then: "There\'s an alchemist." ' : ''}${b3In('sohra') ? 'Sohra says, "A city," the way you would say *a hole*. Then she shrugs. "The herd goes where the herd goes." ' : ''}${b3In('greysword') ? 'Dannet says the long way goes by Capustan, and that she will want an hour there, at the wall, and does not say which part of it. ' : ''}${b3In('vell') ? 'Vell has gone very still. "Home," he says, and then, more carefully, "the city." Whatever the Guild wrote against his name is still written there. He looks, for a moment, about fifteen. ' : ''}${b3In('ellis') ? 'Ellis says, "The Phoenix," and nothing after it, which is a whole speech. ' : ''}`,
      ch:[{t:'This road.', fx:()=>{ S.f.b3_c7_key = 'daru'; b3c7Loy('tuft', 1); b3c7Loy('kettle', -1); }, go:'b3_c7_end'},
          {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c7_road_stand:()=>({sp:'Stood down', txt:
`Stood down, then. There is no form for it, in an army the proclamations say is outlawed. You will say the words anyway, on the shore, and they will go: each to their own road, wherever it leads, and the Fourth will be a thing that happened, the way Coral happened.

${b3c7Mates().length ? `${b3c7Mates().length > 1 ? 'They look at each other' : `${NAME(b3c7Mates()[0])} looks at you`}. There is no argument. There is no yes, either.` : 'There is nobody left to stand down but you.'}`,
      ch:[{t:'This road.', fx:()=>{ S.f.b3_c7_key = 'standdown'; }, go:'b3_c7_end'},
          {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c7_end:()=>{ const k = ['host', 'daru', 'standdown'].includes(S.f.b3_c7_key) ? S.f.b3_c7_key : 'host';
    return {sp:'The shore · the last morning', scene:'b3_c7_finale', txt:
`At first light you walk down to the water one more time, because you have to.

The sea is flat and grey. Where the Spawn went there is nothing at all, only the horizon. Behind you, up on the plain, the barrow; behind that, the hill; behind that, the black city with its broken keep, very quiet.

You count them. You have always counted them. ${b3c7Mates().length ? `${b3c7And(b3c7Mates())}, here.` : 'Nobody, here, but you.'}${b3c7Fell().length ? ` ${b3c7And(b3c7Fell())}, at Coral.` : ''}${b3Fallen().length ? ` ${b3FallenNames()}, at Darujhistan, a long way back.` : ''} Whiskeyjack. The Shield Anvil. Twist. Two marines whose names ${b3In('ohl') ? 'Ohl means to find' : 'nobody has found yet'}.

Then you go up the beach, and ${k === 'host' ? 'report to the Host\'s lines' : k === 'daru' ? 'find the road west' : 'say the words'}, and it is over.`,
      ch:[{t:'The end of the road.', go:()=>chapterEnd(7, k)}]}; },
});

/* ============ the end of Book Three: the road out of Coral, a page per squadmate, the gone, the sergeant, the coda (37: showFinale) ============ */
const B3FIN7 = {};
B3FIN7.KEYS = ['host', 'daru', 'standdown'];
B3FIN7.key = k => B3FIN7.KEYS.includes(k) ? k : B3FIN7.KEYS.includes(S.f.b3_c7_key) ? S.f.b3_c7_key : 'host';
B3FIN7.join = ps => ps.filter(p => p && String(p).trim()).join('\n\n');
B3FIN7.loy = (id, warm, cold, mid) => { const l = (S.loy && S.loy[id]) || 0; return l >= 2 ? warm : l <= -2 ? cold : mid; };
B3FIN7.trickLine = id => trickBy('b3_c7_anvil') === id ? (id === 'sgt' ? 'When one of yours is hurt now, you step in and put your hand where theirs is. You learned it the day of Coral, from the Grey Swords. You decide it seldom.' : `When one of the Fourth is hurt now, ${b3c7P(id).she} steps in and puts a hand where theirs is, the way the Grey Swords showed, the day of Coral.`) : '';

B3FIN7.ending = key => {
  const T = {host:['With the Host', 'b3_c7_sea'], daru:['To Darujhistan', 'b3_c7_finale'], standdown:['Stood down', 'b3_c7_finale']}[key] || ['With the Host', 'b3_c7_sea'];
  if (typeof S === 'undefined' || !S || !S.f) return {title:T[0], scene:T[1], paras:[]};
  try {
    const mates = b3c7Mates(), n = mates.length + 1, t = b3Trust(), d = b3Dread();
    let P;
    if (key === 'host') P = [
`The Host breaks camp on the shore below Coral a week after the Spawn went out, and marches, and the Fourth marches with it, in its place in the Seventh Company's file, the way it always has. Behind it the Tiste Andii are moving into the black city as if they meant to stay, and the Rhivi herds are going home across the plain, and Caladan Brood stands on the hill and watches the Host go without saying anything, which from Brood is a great deal.`,
`Where the Host is going is the Host's business, and the rumours change every day: Seven Cities, where the rising is, and what is left of the Empire there; Genabaris, and ships; the proclamations taken down, or nailed up again. The Fourth has stopped listening to the rumours. It has heard the High Fist say he hasn't decided yet what he is going to lie about, and it has decided that is good enough. ${mates.length ? `${b3c7And(mates)} ${mates.length === 1 ? 'is' : 'are'} in the file with you.` : 'You are in the file alone, which is not how a file is meant to work.'}`,
`It is a long road. Whatever comes at the end of it, the Fourth will count itself at every halt and get ${numw(n)}, and check it, and go on.`];
    else if (key === 'daru') P = [
`The Fourth goes back the long way, over the Domin and the Catlin and the Rhivi Plain, with the Darujhistan delegation's wagons and a round little man in a waistcoat who never once mentions that he arranged any of it. The Host's clerks write *detached* beside the Fourth's names, which is a word with a great deal of give in it, and nobody comes after you to ask what it means.`,
`Darujhistan takes the Fourth the way it takes everybody: without asking. The Phoenix Inn has a door that wants standing in, and the Fourth stands in it, and the city's blue fire comes up every night over the lake as if nothing had happened anywhere. Somewhere across the city, they say, some soldiers have bought a building and are turning it into a bar. The Fourth does not go to look. Some things are other people's.`,
`${mates.length ? `${b3c7And(mates)} ${mates.length === 1 ? 'keeps' : 'keep'} the door with you.` : 'You keep the door alone.'} When strangers ask what the Fourth did in the south, you tell them about a hill, and a leg, and a barrow made of gifts. They do not believe the barrow. It is the only part that is completely true.`];
    else {
      const roads = mates.map(id => ({
        brisk:`Brisk goes to the Fourth Regiment, to a brother who can't sing and has stopped trying.`,
        kettle:`Kettle goes to the Black Moranth, who have a word for her now that means *asked*.`,
        tuft:`Tuft goes west, to Darujhistan, where the child was born the second time.`,
        ohl:`Ohl goes south and east, toward Seven Cities and Ehrlitan, to look.`,
        sohra:`Sohra rides home with the Rhivi herds, singing.`,
        greysword:`Dannet goes back to the Grey Swords with the wolf finished on her shield.`,
        ellis:`Ellis rides, down a road that leads anywhere but here.`,
        vell:`Vell goes wherever there is sky.`}[id] || `${NAME(id)} goes ${b3c7P(id).hers} own way.`));
      P = [
`You stand the Fourth down on the shore below Coral at noon, with the sea going in and out and the barrow on the plain behind you. There is no form for it. There is nobody left to countersign. You say the words anyway.`,
roads.length ? `And they go. ${roads.join(' ')} Not all at once; the Fourth never did anything all at once except stand in a line. Every one of them looks back once, and counts, and gets it wrong, and doesn't correct it.` : `There's nobody left to go anywhere but you. You say the words to the sea, and the sea takes them the way it takes everything.`,
`${roads.length ? 'The squad ends. The people don\'t.' : 'The squad ended at Coral. This is only the paperwork.'} You stand on the shore until the Rhivi are dust and the Host is a line on the coast road, and then you go up the beach, alone for the first time in a long time, toward wherever is next.`];
    }
    P.push(`The Alliance, at the end of it: trust ${t} of ${ALLY_MAX}, dread ${d}. ${t >= 8 ? 'Brood\'s people would come if the Fourth called, and the Fourth knows it.' : t >= 5 ? 'Brood\'s people know the Fourth\'s faces, and nod.' : 'Brood\'s people never quite made up their minds about the Fourth.'} ${d >= 10 ? 'The Domin is still in every head in the squad, at night.' : d >= 6 ? 'The squad still dreams of the Domin, some nights.' : 'Most nights, the squad sleeps.'}`);
    return {title:T[0], scene:T[1], paras:P};
  } catch(e) { return {title:T[0], scene:T[1], paras:[]}; }
};

B3FIN7.fate = (id, key) => {
  key = B3FIN7.key(key); const P = b3c7P(id), tr = B3FIN7.trickLine(id);
  const add = (title, ps) => { if (tr) ps.splice(Math.max(1, ps.length - 1), 0, tr); return {title, txt:B3FIN7.join(ps)}; };
  if (id === 'sgt') return B3FIN7.sgt(key);
  if (id === 'brisk') return add('Four coppers', [
    key === 'host' ? `Brisk marches with the Host in the Seventh's file, and of an evening she walks back down the column to the Fourth Regiment's fire and stands just outside the firelight until Tav looks up. He always looks up. His face is a different shape now. He has started, very quietly, to sing again, and he still gets the eels wrong.` :
    key === 'daru' ? `Brisk stands in the Phoenix's door like something taller than she is, and the city learns not to argue with her. Tav writes. He can't spell *sergeant*. She reads every letter twice and keeps them in her gorget.` :
    `Brisk goes to the Fourth Regiment, to Tav, who can't sing and has started to again, quietly, getting the eels wrong. They stand in the same line now. She stands in front of things. So does he. They have stopped telling each other not to.`,
    b3c7Sealed() ? `The letter is still sealed. "When he's dead," she says. "Long wait," he says. They have both decided, after Coral, that this is the funniest thing in the world.` : `He still owes her four coppers. He will never pay. She will never stop asking. It is the whole of what they have to say to each other, and it is enough.`,
    B3FIN7.loy('brisk', `"Sergeant." She says it to you as if it were a whole conversation. After Coral, it is.`, `She never quite forgave you something on the road south. She stands where you put her anyway.`, `"Sergeant," she says, and waits, and you know what she means.`)]);
  if (id === 'kettle') return add('Not the same as this morning', [
    key === 'host' ? `Kettle marches with the Host and counts the quorls every dusk, one by one, by name now, and when the Black Moranth come down at the edge of the camp she goes and stands near them the way other people stand near a fire.` :
    key === 'daru' ? `Kettle goes to Darujhistan and finds the city has an alchemist with more munitions than sense, and is very happy for a while, and then looks at the sky every evening at dusk for quorls that do not come.` :
    `Kettle goes to the Black Moranth. They have never taken anyone. They take her. The Moranth have never been seen to explain anything, and they do not explain this.`,
    S.f.b3_c7_maud ? `${b3c7Maud()} went where she was for, at Coral. There is a scrap of black chitin in the bottom of the satchel where the cusser used to be. She counts it every morning.` : b3c7MaudLeft() ? `${b3c7Maud()} is still at the bottom of the satchel. Nothing at Coral was enough. She has decided something will be, one day, and she will know it.` : `There is a new cusser at the bottom of the satchel, drawn from the Host's stores after Coral, and she has named it ${b3c7Maud()}, because some names are a post, not a person.`,
    B3FIN7.loy('kettle', `"You point, I make it stop being a thing," she says. "That's love, in the sapper trade." She means it.`, `She stopped telling you the count somewhere on the road. She tells the quorls instead.`, `"Not the same as this morning," she says, every morning. You have stopped expecting it to be.`)]);
  if (id === 'tuft') return add('More than Tattersail', [
    `The child went over the sea with the T'lan Imass, to find the rest of them. Tuft stood on the shore and watched the dust go, and did not go with it, and has not said why, except once, to Kettle: "I'm the Fourth's."`,
    key === 'host' ? `She reads the Deck for the Host's marines on an upturned shield at every halt, for coppers she never takes. The House of Chains comes up more often than she likes. She holds each card a moment longer before she turns it, as if listening.` :
    key === 'daru' ? `She reads the Deck in Darujhistan, where the child was born the second time, in a tent on the cadre row that was there before any of this. The city does not know what she knows. She has decided that is a kindness.` :
    `She goes west to Darujhistan, alone, with the Deck in her coat and a blank card missing from the back of it.`,
    B3FIN7.loy('tuft', `"The cards say nothing about you, Sergeant," she says. "I checked." It is still the best thing she knows how to say.`, `She reads for everyone but you, now. You have stopped asking why.`, `"Two refuse me," she says, shuffling. "The third does not." She never draws for you. You never ask.`)]);
  if (id === 'ohl') return add('The list', [
    `${b3ListWords().replace(/^./, c => c.toUpperCase())} on the list now: Whiskeyjack, and the Moranth commander, and the Shield Anvil, who was not the Fourth's and is on it anyway, and two marines written by what they did, because he could never find out more.${b3c7Fell().length ? ` And ${b3c7And(b3c7Fell())}, written in a street, copied out properly later, with his hand steady.` : ''}`,
    key === 'host' ? `The Host goes where it is sent, and by every rumour that is Seven Cities, his country, burning. He goes with it. He has not said one word about it. He reads the list at night with his lips moving, and adds the names of strangers.` :
    key === 'daru' ? `In Darujhistan he finds a temple of Soliel that asks him, very politely, to stay. He says no, for reasons he describes as theological, and patches the Phoenix's customers for nothing, and complains.` :
    `He goes south and east toward Seven Cities and Ehrlitan, alone, with his needles and the list. Not to stay. To look.`,
    B3FIN7.loy('ohl', `"Drink the tea, Sergeant," he says. "It's not poison. It's just unpleasant, which is how you know." He still calls you *child*, once in a while. You still let him.`, `He keeps your name off the list. He keeps it off the other way, too: he does not speak to you more than he has to.`, `"I have a rule," he says. He still has not told you what it is.`)]);
  if (id === 'sohra') return add('The herd-mother', [
    `The Mhybe sleeps, and will sleep for ever, and in the sleep she is young, in a place her daughter made for her where there is grass. Sohra sings to her before every march. She is the only one who hears it.`,
    key === 'host' ? `Sohra stays with the Host, which nobody in the Rhivi camp understands, and rides out ahead of it where a scout rides, and sings to the dead of every battlefield it crosses, Malazan and otherwise. The Host has started to say *the Rhivi girl* the way it says *the Moranth*: as if it could not do without.` :
    key === 'daru' ? `Sohra goes to Darujhistan and hates it, loudly, for a month, and then finds the cattle market, and the drovers, and is happy, and still sleeps outside.` :
    `Sohra rides home with the herds across the plain, singing, and tells her people the Malazans are a slow herd and complain and do not leave anyone, and that she has a herd-mother now who is one of them, and they can say what they like.`,
    B3FIN7.loy('sohra', `"Herd-mother," she says. She means you. She does not explain it to anyone.`, `She watched the Malazans, as she was asked. She did not like everything she saw.`, `"Loud," she says, when anyone asks her what Malazans are. "Loud, and they don't leave people."`)]);
  if (id === 'greysword') return add('The Wolves of Winter', [
    `The wolf on her shield is ${S.f.b3_c7_dannetWolves ? 'finished: she painted it at the foot of the Shield Anvil\'s barrow, at dawn, among the gifts.' : 'still half a wolf. She says she will finish it when she knows. She is nearer than she was.'} The Fener amulet is in her kit, cold. She has not thrown it away. The boar was a long time in her family.`,
    key === 'host' ? `She stays with the Fourth, lent and not returned, and the Grey Swords let her, because the new Mortal Sword says the Wolves go where they are needed.` :
    key === 'daru' ? `She goes back to the Grey Swords at the end, as she said she would, and then comes to Darujhistan anyway, on the company's business, and stands in the Phoenix's door beside the Fourth for a season, saying *sir* to everyone.` :
    `She goes back to the Grey Swords, to the Wolves, with an answer for the Destriant: both. A god, and a grief with teeth. Both.`,
    B3FIN7.loy('greysword', `"Shield up, Sergeant," she says. "Not for you. For me. I like to know where it is."`, `She was lent to the Malazans. She has made it plain she was lent, and nothing more.`, `She says *sir* to you now, the way he did. To everyone. She is learning.`)]);
  if (id === 'ellis') return add('Still looking', [
    `Ellis looked at every face that came out of Coral and down the hill. Not there. She is still looking, down every road that leads anywhere but where the Fourth is going, and she is still with the Fourth. She would like both of those noted.`,
    key === 'standdown' ? `She rides, when the Fourth stands down. The Fourth does not ask where.` : key === 'daru' ? `In Darujhistan she takes the post across the street from the Phoenix's door, which is not the same as standing in it, and counts everyone who goes in, and everyone who comes out, and the numbers always match.` : `She scouts for the Fourth, and counts the horses first, and comes back every time.`,
    B3FIN7.loy('ellis', `She counts you first now, at every halt, before the horses. She has never said so. Kettle told you.`, `She reports to you in one sentence, always the right one, and never a second.`, `"Counted," she says at every halt, and you know it means you as well.`)]);
  if (id === 'vell') return add('Sky', [
    `Vell crossed half a continent with nothing to string a line between, and found he liked the sky. Don't tell the Guild.`,
    key === 'daru' ? `In Darujhistan he goes back up on the roofs, once, to look, and comes down again, and says the roofs are smaller than he remembered.` : key === 'standdown' ? `When the Fourth stands down he goes wherever there is sky, with a coil of rope and a Guild knot nobody else in the Host can tie, and says he will write. He is the only one of them who does.` : `He goes where the Fourth goes, with a coil of rope he has not used since Pale, and looks up a great deal.`,
    `${S.f.b3_c7_barrow ? 'He left a length of that rope on the Shield Anvil\'s barrow, tied so it holds. ' : ''}He still asks after the names of the two marines on the hill, wherever he stops. Somebody always knows, he says. No one has, yet.`,
    B3FIN7.loy('vell', `"Off is the hard part," he says, when anyone asks how the Fourth came through it. "The sergeant's good at off." From a rope man there is nothing higher.`, `He keeps his rope coiled and his thoughts with it, and goes up on his own afterwards, to be somewhere you are not.`, `He still checks your knots when he thinks you are not looking. You still let him.`)]);
  return {title:TPL[id] ? TPL[id].role : '', txt:TPL[id] ? TPL[id].quest : ''};
};

B3FIN7.gone = (id, key) => {
  key = B3FIN7.key(key); const P = b3c7P(id);
  if (S.dead && S.dead[id]) {
    const at7 = S.dead[id].ch === 7, where = at7 ? (S.f.b3_c7_square === 'hunt' ? 'the square in Coral, in front of a K\'ell Hunter, so the Bridgeburners would not have to turn round' : 'the stake line below the alliance\'s hill, where the Hunters came through') : (S.dead[id].where || 'the road south');
    return {title:'Fallen', txt:B3FIN7.join([
      `${NAME(id)} fell at ${where}. ${at7 ? `You said *here*, and everyone knew what it meant, and ${P.she} stood there anyway.` : ''}`,
      {brisk:`${b3c7Sealed() ? 'The letter went with her, still sealed.' : 'Tav never paid the four coppers.'} He stands at the edge of the Fourth's fire some evenings, the way she used to stand at his, until somebody looks up.`,
       kettle:`The satchel came back without her. The Fourth counts it every morning, out loud, so it knows.`,
       tuft:`The Deck came back without her. The Fourth cannot read it. Nobody will throw it away.`,
       ohl:`The list came back without him. A trooper in the Fourth reads it at night now, lips moving, and adds Ohl\'s name at the end, every time, as if it might not have stuck.`,
       sohra:`The Rhivi sang her home across the plain. Somewhere at the edge of the grass she is standing with the herd's dead, watching the Malazans.`,
       greysword:`The Grey Swords took her shield home to the company, with the wolf on it.`,
       ellis:`Her bow came back without her, and the glove. The Fourth will not wear the glove, or throw it away. At every halt somebody counts the horses first, because she would have.`,
       vell:`His rope came back without him, coiled the Guild way. No one in the Fourth has uncoiled it. It rides in the baggage, for a roof, some day.`}[id] || '',
      `Ohl's list has ${P.her} on it. The Fourth carried the name the rest of the way.`])};
  }
  if (b3Fallen().includes(id)) return {label:'Remembered', title:'Darujhistan', txt:`${NAME(id)} did not come out of Darujhistan, the year before. The Fourth marched south without ${P.her}, all the way to the sea, and counted ${P.her} anyway, once, at the end, the way you count a tooth that is gone.`};
  /* the two recruits, when they are not walking with the Fourth at the end (waiting near, or never asked in): a page each, with their people */
  if (B3_RECRUITS.includes(id) && !b3In(id)) return {label:'With her people', title:id === 'sohra' ? 'With the herds' : 'With the Grey Swords', txt:id === 'sohra'
    ? `Sohra stayed with the Rhivi through Coral, at the herd lines, and when the Mhybe slept, far off in Capustan, she sang north to her, and then rode home with the herds across the plain. She watched the Malazans for a season, as she was asked. She tells her people they are loud, and do not leave anyone.`
    : `Dannet stood with the Grey Swords at Coral, and knelt with them in the rain on the plain, and was at the barrow all night. She went home with the company, to the Wolves, with an answer for the Destriant.`};
  return null;
};

B3FIN7.sgt = key => {
  const f = S.f;
  return {title:'Mallet\'s week', txt:B3FIN7.join([
    key === 'host' ? `You march with the Host, whatever it is called now, and keep the pay ledger honest and the munitions count honester, and read every order twice. When the new marines ask what Coral was like you tell them about a hill, and a leg, and they don't understand, which is right.` :
    key === 'daru' ? `You stand in a door in Darujhistan, which is a thing a sergeant can do in any city, and keep a ledger nobody asked for, and the city's blue fire comes up every night over the lake as if nothing had happened anywhere.` :
    `You stood the Fourth down on a shore, and said the words, and went up the beach alone. You still count, at every halt, out of habit. You get one. You check it anyway.`,
    `Whiskeyjack's leg wanted a week, after Darujhistan. Mallet asked, and the High Fist, and Korlat, and ${f.b3_c7_wjWord === 'tonight' ? 'you, and on the last morning he said *tonight*, if the plain was empty by dusk. It was not.' : f.b3_c7_wjWord ? 'you, and he said *after Coral* to every one of you, and meant it.' : 'everyone who loved him, and he said *after Coral* to every one of them, and meant it.'} It was never healed. He could not have been made to lie down. You watched how he stood, all the way from Pale, and you were ${b3c7Flew() ? 'in a city, under a falling sky,' : 'three hundred paces down a hill'} when it went.`,
    f.b3_c7_kallorLook ? `A tall man in a fur-collared cloak looked at you once on his way out of the world's attention, and knew your face. Kallor is alive. You have decided you would like to see him again, and you have decided that is a stupid thing to want, and you want it anyway.` : `Kallor is alive, somewhere. You have decided he is somebody else's sum.`,
    B3FIN7.trickLine('sgt'),
    `You have carried nothing of Whiskeyjack's out of Coral. His things went into the Spawn with him. You carry the week he never took. It is heavier than it sounds.`])};
};

B3FIN7.coda = key => {
  const fell = b3c7Fell(), mates = b3c7Mates();
  return [
`Whiskeyjack died at Coral, on the alliance's hill, of the leg he would not give a week to; Kallor killed him, and a marine of the Host put a blade in Kallor, and two more died guarding a child, and the standard bearer drove the High King out of the world's attention alive. Trake's Legion went into eight hundred K'ell Hunters, and the tiger with it. The Shield Anvil took the T'lan Imass's grief and died of it, and soldiers of every army raised his barrow, a gift at a time, through a night. Moon's Spawn came down on the Seer's keep, and then went out over the sea with Whiskeyjack and the Bridgeburners and the Achievant in it, and was lost.`,
`The Fourth was there. ${b3c7Flew() ? `It held a trench under the grey sorcery and ${S.f.b3_c7_square === 'side' ? 'a side street' : 'a square'} in the black streets.` : `It held ${S.f.b3_c7_hunters === 'herds' ? 'the herd lines behind the hill' : 'a hill\'s worth of stakes'}, and was too far, and reached him after.`} ${fell.length ? `${b3c7And(fell)} did not come off it.` : `Every one of the Fourth who went to Coral came away from it.`} That is the Fourth's part of it. It is small. It is the only part anybody will ever tell right.`,
`On the plain outside Coral there is a barrow made of gifts, with a helmet on top that nobody touches. Out on the sea there is nothing at all. ${mates.length ? 'The Fourth counts itself, and gets the number, and checks it.' : 'The sergeant counts, and gets one, and checks it.'}`];
};

B3CH7.finale = {
  ids:()=>['brisk', 'kettle', 'tuft', 'ohl', 'ellis', 'vell', 'sohra', 'greysword'],
  labels:{epi:'Epilogue', squad:'The Fourth', fallen:'The fallen', away:'Gone their own way', sgtRole:'Sergeant · Fourth Squad, Seventh Company, Onearm\'s Host', road:'The Fourth\'s road', prologue:false,
    list:()=>[b3In('ohl') || b3List() ? 'Ohl\'s list' : 'The list', b3ListWords()], noDead:'None of the Fourth. Every one of them came away from Coral.', paper:false,
    endline:'The End of Book Three: <em>The Fair Exchange</em>',
    credit:'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for Memories of Ice, Whiskeyjack, Itkovian, the Bridgeburners and the long road south, and to Ian C. Esslemont for the world they built together; the Fourth only walked beside it.'},
  endings:{ get host(){ return B3FIN7.ending('host'); }, get daru(){ return B3FIN7.ending('daru'); }, get standdown(){ return B3FIN7.ending('standdown'); } },
  fate:(id, key)=>B3FIN7.fate(id, key),
  gone:(id, key)=>B3FIN7.gone(id, key),
  coda:(key)=>B3FIN7.coda(key) };
