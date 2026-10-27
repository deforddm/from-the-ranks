/* ============ Book Three, Chapter 6: The Night Lift ============ */
/* Dujek's secret split (MoI ch. 21-23): night after night the Black Moranth take whole companies of the Host away by quorl, more than
   half of it, telling neither Brood nor the Seer; Dujek goes; about four thousand stay on the road under Whiskeyjack, making the dust of
   an army, and march to the Maurik to build barges downriver of a ford.
   The Fourth learn the secret by being part of it: they hold the lift field the night Tav's company goes up. Then the key:
   S.f.b3_c6_key = 'quorl'  — the Fourth fly with their company: a night landing on a ledge above Coral, the hidden entrenchments under
                              cedar and moss, Achievant Twist, Tav again, and demon-ridden Condors following the Moranth home (S.f.b3_flew = 1)
                 = 'maurik' — the Fourth stay with Whiskeyjack's four thousand: the barge camp, the leg seen close, raiders in the night,
                              the river to Maurik with the White Face, and Brood finding out (S.f.b3_river = 1)
   One trick, in the camp before the fork (the Boatman's Knot, from Oskan, a Cawn wright: a ✦ check); three items (vambrace on the
   quorl road, axe on the river road, a Condor feather on either: it will not let the squad be surprised). Notes: docs/moi-ch6-notes.md.
   FOR THE ARTIST (66b): items b3_c6_vambrace, b3_c6_axe, b3_c6_feather (ART['item/<key>']); figures b3_c6_condor, b3_c6_twist,
   b3_c6_raider (plus the shelf: tav, wj, dujek, hurlochel, artanthos, brood, kallor, korlat, b3_moranth, b3_barghast, b3_rhivi_rider,
   beklite, seerdomin, b2soldier for Oskan); grounds b3_c6_mountain, b3_c6_mountain_night, b3_c6_river (+ shelf b3camp_night); battle
   grounds b3_c6_campb / b3_c6_ridgeb / b3_c6_bankb are wrappers below; backdrops b3_c6_lift, b3_c6_entrench, b3_c6_barges. */

/* ---- small helpers ---- */
const c6Shut = () => !!(S && S.imported && b3Was('c7_letter') !== 'brisk'); // Brisk's letter from Tav: still sealed (an import that never opened it)
const c6BriskGone = () => b3Fallen().includes('brisk');                        // Brisk died in Book One (an import): Tav knows
const c6Count = () => { const p = (n, s) => `${numw(n)} ${s}${n === 1 ? '' : 's'}`; const t = `${p(S.inv.sharper, 'sharper')}, ${p(S.inv.burner, 'burner')}, ${p(S.inv.cusser, 'cusser')}`; return t[0].toUpperCase() + t.slice(1); };
const c6KallorKnows = () => !!(S && S.f && (S.f.b3_kallorSaw || S.f.b3_kallorEnemy));
const c6Quiet = () => !!(S && S.f && S.f.b3_c5_key === 'quiet');
const c6Feather = () => !!(S && S.gear && SQUAD().some(w => Object.values(S.gear[w] || {}).includes('b3_c6_feather')));
/* the Fourth's company: the Seventh, marines. The squad's own word for what Whiskeyjack's column is doing on the road */
const c6Dust = () => `four thousand making the dust of ten`;
/* the lie, the truth, or "ask me at the Maurik": what the sergeant told Sohra (or the Rhivi rider) about the companies going */
const c6Told = () => (S && S.f && S.f.b3_c6_ask) || '';
/* Kallor is "the tall man in the fur-collared cloak" until the squad has heard him named (Ch1 sets b3_kallor) */
const c6Kallor = (cap) => S && S.f && S.f.b3_kallor ? 'Kallor' : (cap ? 'The' : 'the') + ' tall man in the fur-collared cloak';
/* a "yes, but" that moves the Alliance's dread quietly (the cost text names it, so no second note): returns how far it actually rose */
const c6Dread = n => { S.ally ??= {trust:5, dread:1}; if (S.card === 'b3c_obelisk') n = Math.max(0, n - 1); const d0 = S.ally.dread; S.ally.dread = clamp(d0 + n, 0, ALLY_MAX); const d = S.ally.dread - d0; if (d > 0) tally('dreadUp', d); updChain(); S.f.b3_c6_nearDread = d; return d; };
const c6DreadTxt = () => S.f.b3_c6_nearDread ? `dread +${S.f.b3_c6_nearDread}` : 'the Obelisk takes it, and dread holds';

/* ---- the battle ground: Book Three's battle maps mark low cover 't' and pits/deep water 'o' (31's rule); these draw them in this chapter's ground ---- */
TILEX.b3_c6_campb = (ctx, ch, x, y, T, dark) => TILEX.b3camp_night && TILEX.b3camp_night(ctx, ch === 't' ? 'W' : ch === 'o' ? 'r' : ch, x, y, T, true);
TILEX.b3_c6_ridgeb = (ctx, ch, x, y, T, dark) => TILEX.b3_c6_mountain && TILEX.b3_c6_mountain(ctx, ch === 't' ? '=' : ch === 'o' ? 'T' : ch, x, y, T, dark);
TILEX.b3_c6_bankb = (ctx, ch, x, y, T, dark) => TILEX.b3_c6_river && TILEX.b3_c6_river(ctx, ch === 'o' ? '~' : ch === 't' ? 'l' : ch, x, y, T, dark);

/* ---- the Condor feather: whoever wears it, the squad is never taken by surprise (it lifts in a wind nobody else feels, just before) ---- */
{ const _sb = startBattle;
  startBattle = function(id, opt = {}){
    if (!(b3On() && opt && opt.surprise === 'e' && !opt.stage && c6Feather())) return _sb(id, opt);
    const r = _sb(id, Object.assign({}, opt, {surprise:null}));
    if (B) blog(`<em>The Condor feather lifts, in a wind nobody else can feel, a breath before anything moves.</em> Nobody in the Fourth is surprised.`);
    return r; }; }

/* ---- the trick (one, before the road forks, so either road can carry it): the Boatman's Knot, from a Cawn wright in the camp ---- */
Object.assign(TRICKS, {
  b3_c6_knot:{name:'The Boatman\'s Knot', ch:6, use:'fight', ab:'t_b3_c6_knot', where:'the carpenters\' wagons south of Setta, from a Cawn wright',
    lore:'A weighted line and a running knot the Cawn bargemen throw at a drifting hull to bring it in against the current. Thrown at a man it does the same thing, and the man is not expecting it.',
    get fx(){ return `Once a fight: a weighted line at an enemy within ${4 + lvT()} (not adjacent). It is hauled up to two steps toward the bearer and knocked down: no move on its next turn (a boss shakes the knot off on ${12 + 2*lvT()}+, but is still hauled). Grows with level.`; }},
});
Object.assign(AB, {
  t_b3_c6_knot:{name:TRICKS.b3_c6_knot.name, trick:'b3_c6_knot', desc:()=>TRICKS.b3_c6_knot.fx,
    tiles:u=>foes().filter(f => cheb(u, f) > 1 && cheb(u, f) <= 4 + lvT() && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; AUDIO.play('step');
      let moved = 0; for (let i = 0; i < 2; i++) { const nx = t.x + Math.sign(u.x - t.x), ny = t.y + Math.sign(u.y - t.y); if (cheb({x:nx, y:ny}, u) < 1 || !free(nx, ny, t)) break; t.x = nx; t.y = ny; moved++; }
      sparks(t.x, t.y, 10, '#c8b08a', .4);
      const shrug = t.boss && d20() >= 12 + 2*lvT();
      if (!shrug) { t.prone = true; float(t, 'down', '#c8b08a'); }
      blog(`${u.name} throws the weighted line the Cawn way, and the knot runs. ${t.name} ${moved ? `comes ${moved > 1 ? 'two steps' : 'a step'} across the ground at the end of it` : 'is jerked off balance where it stands'}${shrug ? ', and slips the knot' : ', and goes down'}.`); }},
});

/* ---- the Deck at the first halt (60c): the Leper's chapter ---- */
B3DECK[6] = {scene:'b3_c6_host', where:'a quorl-blanket spread on the mud between two tent lines', set:'Night, the third out of Setta. Out past the horse lines something large is breathing in the dark, and nobody in the Host is supposed to have heard it.',
  back:'b3_c6_start2', backT:'Back to the lines.',
  say:{tuft:`"There's something in the air tonight," Tuft says, "and it isn't the Deck." She shuffles anyway. "One card, Sergeant. The road's about to fork. I can feel it in the cards."`,
    sohra:`"Your people are quiet tonight," Sohra says. "Malazans are never quiet. That is how the herds know where you are." She rattles the bones. "Sit. The smoke will tell me what you are not saying."`,
    benna:`"You're the last marines in the Seventh who haven't sat down for me," Old Benna says. "The rest have all gone and had their fortunes told this week. All of them. In a hurry." She looks at you over the tub. "Sit down. Copper."`}};

const B3CH6 = {
  title:'The Night Lift', number:'Six',
  intro:{loc:'The Pannion Domin', sub:'South of Setta · the road to the Maurik · early summer', scene:'b3_c6_lift', cap:'A field at night, and on it a dark row of things with wings, and men walking out to them with their packs on.',
    paras:[
`Setta was empty. So was the country after it: fields gone to thistle, villages with their doors open and nothing behind the doors, wells that somebody had filled with stones. The Domin is a house with the furniture taken out. The Host walks through it at a predictable pace, the way Dujek promised at Pale, and leaves very good tracks.`,
`Three nights ago the Fourth woke to a sound like wind in a great deal of canvas, all at once, somewhere out past the horse lines. In the morning a company of the Second had gone. Its tents were struck. Its fires were laid and cold. The pickets had seen nobody march past.`,
`There has been no word. That is how you know.`],
    go:'Wake', node:'b3_c6_start'},

  areas:[
    /* 16 x 12 · b3camp_night:  . trampled mud  , grass  # palisade/earthwork  = tent  F the squad's fire  W the quartermaster's wagons  h horse lines
       r a burnt farmstead  s Dujek's standard  > the lift field, east, past the horse lines */
    { id:'b3_c6_camp', title:'The Host\'s camp · south of Setta', sub:'Night · the Domin · fewer fires than last week', hint:'Tap ground to move · tap a figure to talk · the lift field is east, past the horse lines', decor:'b3camp_night', dark:true,
      map:[ "################",
            "#=.=..hhhh..=.=#",
            "#.....,.......,#",
            "#.W.......=..W.#",
            "#,...=......,..>",
            "#..,.....s.....#",
            "#.,....=....,..#",
            "#rr...,........#",
            "#r.....F...=...#",
            "#..=.,....,..W.#",
            "#.....=.....,..#",
            "################" ],
      walk:'.,', triggers:{F:'b3_c6_fire', W:'b3_c6_wagons', r:'b3_c6_farm', s:'b3_c6_standard', '>':'b3_c6_field_go'}, trigNames:{'>':'The lift field', r:'The burnt farm', s:'The High Fist\'s standard'}, start:{x:7, y:9},
      quest:()=> S.f.b3_c6_fieldDone ? (S.f.b3_c6_key ? 'Go.' : 'Whiskeyjack wants an answer: the quorls, or the road.') : !S.f.b3_c6_tavList && b3In('brisk') && !c6BriskGone() ? 'Tav\'s company is at its fire, packing. Brisk has noticed.' : 'A runner came by: the Fourth to the lift field after dark, east, past the horse lines. No fires. No noise.',
      npcs:[
        {id:'c6tav', name:'Tav', kind:'tav', x:12, y:6, node:()=>c6BriskGone() ? 'b3_c6_tav_grief' : 'b3_c6_tav', show:()=>!S.f.b3_c6_fieldDone && (b3In('brisk') || c6BriskGone()), fresh:()=>!S.f.b3_c6_tavMet},
        {id:'c6hurl', name:'Hurlochel', kind:'hurlochel', x:4, y:2, node:()=>S.f.b3_c6_hurl ? 'b3_c6_hurl_again' : 'b3_c6_hurl', fresh:()=>!S.f.b3_c6_hurl},
        {id:'c6wj', name:'Whiskeyjack', kind:'wj', x:10, y:5, node:()=>'b3_c6_wj', show:()=>!!S.f.b3_c6_fieldDone && !S.f.b3_c6_key, fresh:()=>!!S.f.b3_c6_fieldDone && !S.f.b3_c6_key},
        {id:'c6oskan0', name:'Oskan', kind:'b2soldier', x:5, y:3, node:()=>S.f.b3_c6_oskan0 ? 'b3_c6_oskan0_again' : 'b3_c6_oskan0', show:()=>!S.f.b3_c6_key, fresh:()=>!S.f.b3_c6_oskan0},
        {id:'c6rider', name:'A Rhivi rider', kind:'b3_rhivi_rider', x:3, y:6, node:()=>'b3_c6_ask', show:()=>!!S.f.b3_c6_fieldDone && !b3In('sohra') && !c6Told(), fresh:()=>!!S.f.b3_c6_fieldDone && !c6Told()} ] },

    /* 16 x 12 · b3_c6_mountain_night:  . rock  , moss  # cliff  = cedar screen  F shielded fire  q quorl roost  T the trench mouth, down */
    { id:'b3_c6_ledge', title:'The ledge · above Coral', sub:'Night · the mountains · cold that should not be here in summer', hint:'Tap ground to move · tap a figure to talk · the trench mouth goes down to the entrenchments at first light', decor:'b3_c6_mountain_night', dark:true,
      map:[ "################",
            "#,,..#####..q..#",
            "#,....###...q..#",
            "#..=........,..#",
            "#..=..,....F...#",
            "#.......,......#",
            "##.............#",
            "###..,......=..#",
            "####.......=...#",
            "#####..T.......#",
            "######...,,....#",
            "################" ],
      walk:'.,', triggers:{q:'b3_c6_roost', F:'b3_c6_ledge_fire', T:'b3_c6_ledge_down', '=':'b3_c6_ledge_look'}, trigNames:{'=':'The cedar screen', T:'The trench mouth'}, start:{x:9, y:5},
      quest:()=> !S.f.b3_c6_twist ? 'The Moranth commander is at the roost, among the quorls.' : 'First light. The trench mouth goes down to the entrenchments.',
      npcs:[
        {id:'c6twist', name:'Achievant Twist', kind:'b3_c6_twist', x:10, y:2, node:()=>S.f.b3_c6_twist ? 'b3_c6_twist_again' : 'b3_c6_twist', fresh:()=>!S.f.b3_c6_twist} ] },

    /* 16 x 12 · b3_c6_mountain (day): the entrenchments. . rock  , moss  # cliff  = cedar screen (Coral is below it)  F shielded fire  q roost  T trench mouth */
    { id:'b3_c6_trench', title:'The entrenchments · above Coral', sub:'Day · cedar and moss · six thousand people being quiet', hint:'Tap ground to move · tap a figure to talk · the screen looks down on Coral', decor:'b3_c6_mountain',
      map:[ "################",
            "#,,..#....###..#",
            "#,.T.......#..,#",
            "#.......,...F..#",
            "#..q...........#",
            "#,......,....q.#",
            "#..,...........#",
            "#.....T....,...#",
            "#.,.........,..#",
            "#..............#",
            "#===.====.====.#",
            "################" ],
      walk:'.,', triggers:{'=':'b3_c6_trench_look', F:'b3_c6_trench_fire', q:'b3_c6_trench_roost', T:'b3_c6_stand'}, trigNames:{'=':'The cedar screen', T:'The roost trench', q:'The roost'}, start:{x:8, y:8},
      quest:()=> S.f.b3_c6_condorsDone ? 'Night. Tomorrow is Coral.' : !S.f.b3_c6_tav2 && b3In('brisk') && !c6BriskGone() ? 'Tav\'s company is dug in along the upper trench. Brisk is pretending not to look for him.' : !S.f.b3_c6_dujek ? 'Dujek is walking the trenches. He has seen the Fourth.' : 'Dusk is coming, and the quorls with it. Stand-to at the roost trench.',
      npcs:[
        {id:'c6tav2', name:'Tav', kind:'tav', x:5, y:2, node:()=>'b3_c6_tav2', show:()=>b3In('brisk') || c6BriskGone(), fresh:()=>!S.f.b3_c6_tav2},
        {id:'c6dujek', name:'Dujek Onearm', kind:'dujek', x:10, y:6, node:()=>S.f.b3_c6_dujek ? 'b3_c6_dujek_again' : 'b3_c6_dujek', fresh:()=>!S.f.b3_c6_dujek},
        {id:'c6heavy', name:'A Moranth heavy', kind:'b3_moranth', x:13, y:7, node:()=>'b3_c6_heavy', fresh:()=>!S.f.b3_c6_heavy} ] },

    /* 16 x 12 · b3_c6_river: the barge camp on the Maurik, downriver of the ford. . mud  , reeds  ~ deep river  - the ford's shallows  b barges on their slips  l logs  F fire */
    { id:'b3_c6_bank', title:'The Maurik · the barge camp', sub:'Downriver of the ford · four thousand people and a lot of timber', hint:'Tap ground to move · tap a figure to talk · the barges are on their slips by the water', decor:'b3_c6_river',
      map:[ "################",
            "#...l..=..,..=.#",
            "#.=......F.....#",
            "#..l....,....l.#",
            "#.....,........#",
            "#,..bbb..,.bbb.#",
            "#,..bbb....bbb,#",
            "#,,...........,#",
            "#--,,,..,..,,,,#",
            "#--,,,....,,,,,#",
            "#~~~~~~~~~~~~~~#",
            "################" ],
      walk:'.,', triggers:{b:'b3_c6_barges', l:'b3_c6_logs', F:'b3_c6_bank_fire', '-':'b3_c6_ford'}, trigNames:{b:'The barges', l:'The timber', '-':'The ford'}, start:{x:8, y:4},
      quest:()=> S.f.b3_c6_raidDone ? 'Dawn. The barges go in the water.' : !S.f.b3_c6_wjLeg ? 'Whiskeyjack is sitting on a log by the slips, with his leg out straight.' : 'The barges, when the squad is ready to work into the night.',
      npcs:[
        {id:'c6wj2', name:'Whiskeyjack', kind:'wj', x:8, y:3, node:()=>S.f.b3_c6_wjLeg ? 'b3_c6_wj_again' : 'b3_c6_wj_leg', fresh:()=>!S.f.b3_c6_wjLeg},
        {id:'c6oskan', name:'Oskan', kind:'b2soldier', x:5, y:4, node:()=>S.f.b3_c6_oskan ? 'b3_c6_oskan_again' : 'b3_c6_oskan', fresh:()=>!S.f.b3_c6_oskan},
        {id:'c6whiteface', name:'A White Face warrior', kind:'b3_barghast', x:12, y:7, node:()=>S.f.b3_c6_logs ? 'b3_c6_barghast_again' : 'b3_c6_barghast', fresh:()=>!S.f.b3_c6_logs},
        {id:'c6bearer', name:'The standard bearer', kind:'artanthos', x:2, y:4, node:()=>'b3_c6_bearer', fresh:()=>!S.f.b3_c6_bearer} ] },

    /* 16 x 12 · b3_c6_river (day): the landing at Maurik. ~ river  - shallows  b barges pulled in  . mud  , reeds  = tents  F fire  l stacked gear  > the road south */
    { id:'b3_c6_landing', title:'Maurik · the landing', sub:'Day · an empty city on a river · Brood\'s army coming in by the ford', hint:'Tap ground to move · tap a figure to talk · the road south leaves from the east end', decor:'b3_c6_river',
      map:[ "################",
            "#~~~~~~~~~~~~~~#",
            "#~~bb~~~~~~bb~~#",
            "#--bb------bb--#",
            "#,,,,,,,,,,,,,,#",
            "#..,......,..,.#",
            "#.=..l....=....#",
            "#......F.......#",
            "#,..=.....,..=.#",
            "#..........,...>",
            "#.,....,.......#",
            "################" ],
      walk:'.,', triggers:{b:'b3_c6_unload', F:'b3_c6_landing_fire', l:'b3_c6_gear', '>':'b3_c6_road'}, trigNames:{b:'The barges', l:'The Host\'s gear', '>':'The road south'}, start:{x:7, y:5},
      quest:()=> !S.f.b3_c6_herds ? 'Rhivi herders have run their bhederin down onto the landing. Nothing is getting off the barges.' : !S.f.b3_c6_brood ? 'Brood has come down to the river. Whiskeyjack has gone to meet him, and wants a line of marines behind him.' : 'Whiskeyjack is not waiting for anyone. The road south.',
      npcs:[
        {id:'c6herder', name:'A Rhivi herder', kind:'b3_rhivi_rider', x:10, y:4, node:()=>'b3_c6_herds', show:()=>!S.f.b3_c6_herds, fresh:()=>!S.f.b3_c6_herds},
        {id:'c6brood', name:'Caladan Brood', kind:'brood', x:12, y:7, node:()=>S.f.b3_c6_brood ? 'b3_c6_brood_again' : 'b3_c6_brood', show:()=>!!S.f.b3_c6_herds, fresh:()=>!!S.f.b3_c6_herds && !S.f.b3_c6_brood},
        {id:'c6kallor', name:'A tall man in a fur-collared cloak', kind:'kallor', x:13, y:6, node:()=>'b3_c6_kallor', show:()=>!!S.f.b3_c6_herds},
        {id:'c6korlat', name:'Korlat', kind:'korlat', x:9, y:9, node:()=>'b3_c6_korlat', show:()=>!!S.f.b3_c6_brood, fresh:()=>!!S.f.b3_c6_brood && !S.f.b3_c6_korlat} ] } ],

  battles:{
    /* the lift field, the night Tav's company goes up: a Beklite foraging party stumbles on it. None of them can be let go back to tell it. */
    b3_c6_field:{title:'The lift field', style:'b3_c6_campb', dark:true, open:true, warrenText:'Night in the Domin · the warrens are poisoned here: a spell may burn its caster', warren:{denul:1, meanas:1}, music:'battle',
      map:["..t.....","........","...,..t.","........",",..##...","........",".t....,.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c6_forager',1,1],['b3_c6_forager',5,0],['b3_c6_forager',5,1],['b3_c6_forager',3,2],['b3_c6_runner',3,0]], xp:120, after:'b3_c6_after_field',
      waves:[{round:2, foes:[['b3_c6_runner',7,5]], text:'One of them was out on the flank, and has seen the quorls. He is turning to run.'}],
      preText:()=>`The sharper goes off in the middle of them, and it is the loudest thing that has happened in the Domin for a month. Out on the field forty quorls lift their heads at once. In the camp behind you, somebody drops a pot.`,
      stage2:{title:'The gully', xp:50,
        text:()=>`The foragers on the field are down. Two who were not on the field are not down: they are running for a gully that goes south toward the hills, toward whoever sent them out to count the Host's fires, and one of them is shouting a name.
${b3In('greysword') ? `
"Beklite file-leader," Dannet says. "He will have a horn. If he blows it in that gully, the whole valley hears." She is already moving.` : ''}`,
        map:["#......#","##....##","#......#","#..,...#","##....##","#......#","#.,....#","##....##","#......#","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c6_fileleader',3,1],['b3_c6_runner',5,0],['b3_c6_forager',2,2],['b3_c6_forager',5,2]]} },

    /* the landing ledge above Coral, at night: a Pannion picket nobody knew was there */
    b3_c6_landing:{title:'The landing ledge', style:'b3_c6_ridgeb', dark:true, open:true, warrenText:'Night in the mountains above Coral · the warrens poisoned, and the cold getting into them', warren:{denul:1, meanas:1}, music:'battle',
      map:["##....##","#...t..#","........","..t.....","........","....t...","##......","#.......","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_beklite',2,2],['b3_beklite',5,2],['b3_beklite',3,4],['b3_beklite',5,4],['b3_c6_runner',1,1],['b3_c6_runner',6,1]], xp:150, after:'b3_c6_q_after_land',
      waves:[{round:2, foes:[['b3_beklite',7,4]], text:'Another comes up over the lip of the ledge from below, spear first, where nobody thought there was a way up.'}],
      preText:()=>`The sharper drops out of the dark from twenty feet up, off a quorl's harness, and lands among the picket's packs. The picket fire goes up the mountain in sparks. So does most of the picket.`,
      stage2:{title:'The goat track', xp:70,
        text:()=>`The ledge is yours. Above it a goat track goes up between two crags toward the trench mouth, and on the track somebody in dark armour is coming down without hurrying, a long mace across his shoulders, and the air round him has gone grey and wrong.
${b3In('tuft') ? `
"Seerdomin," Tuft says. "That's sorcery he's wearing, Sergeant, not a cloak." She flexes her fingers. "Down here it'll cost me to answer it. I'll answer it."` : ''}`,
        map:["##....##","##.t..##","#......#","##....##","#..t...#","##....##","#......#","#......#","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_seerdomin',2,0],['b3_beklite',2,3],['b3_beklite',5,3],['b3_beklite',4,4],['b3_c6_runner',4,0]]} },

    /* dusk at the roost: demon-ridden Condors follow the quorls home to the entrenchments. The Moranth come if they trust you. */
    b3_c6_condors:{title:'The roost at dusk', style:'b3_c6_ridgeb', open:true, warrenText:'Dusk above Coral · the warrens poisoned · something riding the birds', warren:{denul:1, meanas:1}, music:'battle',
      map:["........","..t.....","......t.","........","...tt...","........",".t......","......t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c6_condor',1,0],['b3_c6_condor',4,0],['b3_c6_condor',7,1],['b3_c6_condor',2,2]], xp:200, after:'b3_c6_q_after_condors',
      aid:{kind:'b3_moranth', at:[6,8], need:8},
      waves:[{round:2, foes:[['b3_c6_condor',0,4],['b3_c6_condor',7,3]], text:'Two more come down out of the last of the light, wings folded, straight at the line.'}],
      preText:()=>`The sharper goes up and bursts under the first of them, and feathers come down over the roost like black snow. The bird does not fall. It turns its head and looks at whoever threw it.`,
      stage2:{title:'The ridden one', xp:100,
        text:()=>`The birds on the roost are down, or flapping on the rock with their wings broken. One is not. It is bigger than the rest, too big, and it lands on the crag above the roost and folds its wings and looks down at the Fourth, and its eyes are not a bird's eyes.

${b3In('sohra') ? `Sohra makes a sound you have never heard her make. "Something is riding it," she says. "Something that is not a spirit and not a man. It is *wearing* it." She has an arrow on the string. Her hand is shaking. She does not let that matter.` : `Something is looking out of it. Something that would like, very much, to know what the Fourth is called.`}`,
        map:["#..##..#","#......#","...t....","........","..t..t..","........","........",".t....t.","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c6_ridden',3,1],['b3_c6_condor',1,3],['b3_c6_condor',6,3]]} },

    /* the barge camp at night: Pannion raiders come out of the reeds to burn the barges */
    b3_c6_raid:{title:'The barge camp', style:'b3_c6_bankb', dark:true, open:true, warrenText:'Night on the Maurik · the warrens poisoned: a spell may burn its caster', warren:{denul:1, meanas:1}, music:'battle',
      map:["oooooooo","o,,..,,o",".,......","..t.....","........","....t...",".t......","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b3_c6_raider',2,2],['b3_c6_raider',5,2],['b3_c6_raider',4,3],['b3_c6_slinger',1,1],['b3_c6_slinger',6,1]], xp:150, after:'b3_c6_m_after_raid',
      waves:[{round:2, foes:[['b3_c6_raider',0,4],['b3_c6_raider',7,5]], text:'Two more come out of the reeds on either side with fire-pots, going for the slips while everyone is looking the other way.'}],
      preText:()=>`The sharper goes into the reeds where they were crouching, and the reeds, which are dry at the top and wet at the root, catch and steam at once. The raiders come out of the smoke coughing, and not where they meant to.`,
      stage2:{title:'The slips', xp:70,
        text:()=>`The ones on the bank are down. On the slips, a man in a black cloak has got a fire going under the nearest hull, and is feeding it from a pot, very calmly, while two of his people keep the Host's carpenters off with spears.
${b3In('brisk') ? `
Brisk says one word, which is a Cawn word, and which you have heard her use before only about her brother. Then she goes for the fire.` : ''}`,
        map:["oooooooo","o..tt..o",".......o","........","..t..t..","........","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c6_raidlead',2,1],['b3_c6_raider',1,2],['b3_c6_raider',6,2],['b3_c6_slinger',5,1]]} },

    /* the river: an ambush from a reed bank on the day's float to Maurik. The White Face on the barge come if they trust you. */
    b3_c6_ambush:{title:'The river', style:'b3_c6_bankb', open:true, warrenText:'The Maurik at noon · the warrens poisoned · grey sorcery on the bank', warren:{denul:1, meanas:1}, music:'battle',
      map:["o....o,,","o.t..o,,","o....-,,","o..t.o,,","o....-,,","o.t..o,,","o....-,,","o....o,,","o....o.,","o....o.."],
      party:[[2,8],[3,8],[1,9],[4,9],[2,9],[3,9]],
      foes:[['b3_c6_slinger',7,1],['b3_c6_slinger',6,5],['b3_beklite',6,2],['b3_beklite',6,4],['b3_beklite',6,6],['b3_beklite',7,8]], xp:200, after:'b3_c6_m_after_amb',
      aid:{kind:'b3_barghast', at:[1,1], need:7},
      waves:[{round:2, foes:[['b3_beklite',7,3],['b3_c6_slinger',7,7]], text:'More of them come down through the reeds at a run. The barge is drifting closer to the bank, not further.'}],
      preText:()=>`The sharper goes over the gap of water and into the reed bank, and a whole stand of reeds lies down at once, and the men in it with them. The barge rocks. A man on it laughs, in Barghast.`,
      stage2:{title:'The reed bank', xp:100,
        text:()=>`The barge grounds on the shallows with a long sound like a sigh, and the Fourth go over the side into water to the knee and up onto the bank, because the ones still shooting are up there, and so is the one doing the grey thing to the air.
${b3In('greysword') ? `
"That is not a Seerdomin," Dannet says, low. "That is a Seerdomin's teacher." She touches the cold amulet, and then the half-painted wolf. "Good."` : ''}`,
        map:["..,#,...",".,....,.","..t...,.",",......,","...,t...",".,......","........",",.....,.","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b3_c6_greymage',3,1],['b3_beklite',1,3],['b3_beklite',6,3],['b3_c6_slinger',5,0],['b3_c6_slinger',2,0]]} } },

  foes:{
    /* Pannion foragers: Beklites sent out in small parties to count the Host's fires and take anything the Domin has left */
    b3_c6_forager:{name:'Beklite forager', sig:'B', kind:'beklite', hp:16, ac:13, atk:5, dmg:[1,8,2], rng:1, mv:4, init:1, verb:'drives a spear at'},
    b3_c6_runner:{name:'Pannion scout', sig:'s', kind:'b3_c6_raider', hp:12, ac:12, atk:5, dmg:[1,6,1], rng:4, mv:6, init:3, sk:['hitrun'], verb:'slings a stone at'},
    b3_c6_fileleader:{name:'Beklite file-leader', sig:'F', kind:'beklite', hp:34, ac:14, atk:6, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['parry','rally'], verb:'brings a spear round on'},
    /* the Condors: carrion birds of the Domin's mountains, with something riding them */
    b3_c6_condor:{name:'Condor', sig:'c', kind:'b3_c6_condor', hp:18, ac:13, atk:6, dmg:[1,8,2], rng:1, mv:7, init:4, sk:['pounce','hitrun'], verb:'drops on'},
    b3_c6_ridden:{name:'The ridden Condor', sig:'C', kind:'b3_c6_condor', hp:54, ac:15, atk:7, dmg:[2,6,3], rng:3, mv:6, init:4, boss:true, sk:['daze','pounce'], verb:'spits grey fire at'},
    /* the raiders on the Maurik: what is left of a Pannion garrison, living in the reeds */
    b3_c6_raider:{name:'Pannion raider', sig:'r', kind:'b3_c6_raider', hp:15, ac:12, atk:5, dmg:[1,8,2], rng:1, mv:5, init:2, sk:['bleed'], verb:'hacks at'},
    b3_c6_slinger:{name:'Pannion slinger', sig:'s', kind:'b3_c6_raider', hp:10, ac:11, atk:5, dmg:[1,6,1], rng:5, mv:4, init:2, sk:['pin'], verb:'slings a stone at'},
    b3_c6_raidlead:{name:'The man with the fire-pot', sig:'R', kind:'b3_c6_raider', hp:34, ac:14, atk:6, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['parry','bleed'], verb:'swings a burning pot at'},
    /* on the reed bank: a Seerdomin who teaches Seerdomin */
    b3_c6_greymage:{name:'Seerdomin master', sig:'Σ', kind:'seerdomin', hp:46, ac:15, atk:6, dmg:[1,10,3], rng:3, mv:4, init:2, boss:true, sk:['daze','chill'], verb:'throws grey sorcery at'} },

  gear:{
    b3_c6_vambrace:{name:'A Moranth chitin vambrace', slot:'trinket', who:null, ac:1, line:'A forearm guard of black chitin in overlapping plates, lighter than leather and harder than iron. A Moranth flier unbuckled it from its own arm and held it out without a word, the way the Moranth do everything. It was warm. It still is, a little.'},
    b3_c6_axe:{name:'A barge-builder\'s axe', slot:'weapon', who:['brisk', 'sgt'], dmg:[1,10,2], line:'A broad, thin, bearded blade on a long ash haft, for squaring timber, not men. It squares men. Oskan the wright keeps one like it for every barge he has built and gave this one away, which he says he has never done.'},
    b3_c6_feather:{name:'A Condor feather', slot:'trinket', who:null, line:'A long black flight feather, ragged at the barbs, ivory at the quill. It is cold to hold, colder than it should be, and now and then it lifts in a wind that is not there. Whoever wears it is never taken by surprise: it lifts first.'} },

  scenes:{
    b3_c6_lift:{loc:'The lift field', sub:'Night · the Domin', cap:'Quorls in dark rows on a field with no lanterns, and a company walking out to them with its packs on.', amb:'night'},
    b3_c6_host:{loc:'The Pannion Domin', sub:'The Host\'s camp · night', cap:'The Host asleep in its tent lines with a few fires banked, and very high, going south across the stars, a long ragged line of something darker than the dark.', amb:'night'},
    b3_c6_road:{loc:'The Pannion Domin', sub:'The road south · dusk', cap:'The column on the road at dusk, strung out under its own dust and more dust than it should raise, a burnt farmstead by the way, and the mountains going blue in the south.', amb:'wind'},
    b3_c6_lift_empty:{loc:'The lift field', sub:'Night · after', cap:'The field empty, the grass pressed flat in long rows where the quorls sat, and a man sitting on a stone at the top of the gully with one leg out straight.', amb:'night'},
    b3_c6_flight:{loc:'The night sky', sub:'South, by quorl', cap:'The Domin black below, a river like a crack in glass, the mountains coming up with snow on them, the quorls in a long low line between, and ahead under a crag, one small fire.', amb:'wind'},
    b3_c6_ledge:{loc:'The mountains above Coral', sub:'The landing ledge · first light', cap:'A ledge under a crag in the first grey, a dead fire, quorls coming down out of the paling sky, and through a gap in the cloud far below, something black on a grey sea.', amb:'hills'},
    b3_c6_slips_night:{loc:'The Maurik', sub:'The slips · midnight', cap:'Torches along the slips and the wrights working in their light, the river black beyond, and on this bank the reeds, very tall, and very still.', amb:'night'},
    b3_c6_downriver:{loc:'The Maurik', sub:'Downriver · after noon', cap:'The barges going down the river in a long line, poled and leaking, the White Face painted and singing on them, and ahead the river bending under a high bank of reeds.', amb:'plain'},
    b3_c6_maurik:{loc:'Maurik', sub:'The landing · evening', cap:'An empty city on the river, every door open and chalked, and along its long stone landing Brood\'s army, drawn up and watching the barges come in.', amb:'explore'},
    b3_c6_entrench:{loc:'The entrenchments', sub:'The mountains above Coral', cap:'Trenches under cedar boughs and moss, and far below, a black city on the edge of the sea.', amb:'hills'},
    b3_c6_barges:{loc:'The Maurik', sub:'The barge camp at dawn', cap:'Barges on their slips, half ribs and half planking, and a river going south toward the sea.', amb:'plain'} },

  end:{
    quorl:['The night lift', 'Night after night the Black Moranth took the Host away by quorl, a company at a time, and told neither Brood nor the Seer. The Fourth went with the Seventh. They came down on a ledge above Coral in the dark and fought for it, and dug in under cedar and moss with Dujek\'s half of the Host, six thousand people being quiet on a mountain. At dusk the Condors came after the quorls. Whiskeyjack is somewhere behind, on the road, making the dust of an army.'],
    maurik:['The Maurik', 'Night after night the Black Moranth took the Host away by quorl, and the Fourth stayed: four thousand on the road under Whiskeyjack, making the dust of ten. They built barges on the Maurik below the ford, kept them from burning, and rode them a day downriver to an empty city with the White Face Barghast singing badly on the decks. At Maurik, Brood found out. Whiskeyjack did not wait to be forgiven. He marched for Coral that afternoon.'] },
  get endScene(){ return S && S.f && S.f.b3_c6_key === 'maurik' ? 'b3_c6_road' : 'b3_c7_coral'; },
  endCap:()=> S.f.b3_c6_key === 'maurik' ? 'Dusk on the road south of Maurik, the column strung out and walking fast. The sergeant counts the Fourth twice, and then, without meaning to, counts the man at the head of the column, and how he walks.' : 'Night in the entrenchments, no fires showing. Below, Coral\'s lamps. The sergeant counts the Fourth twice in the dark, by touch.',
  tease:'Next: Coral. The last chapter of Book Three.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b3_c6_fieldDone) x.push(f.b3_c6_loud ? 'The night Tav\'s company went up, the Fourth held the lift field with a sharper, and the whole camp heard it. Outside the Host, nobody heard it. Probably.' : 'The night Tav\'s company went up, the Fourth held the lift field, quietly, and nobody who saw the quorls went home to say so.');
    if (f.b3_c6_ask === 'truth') x.push(`The sergeant told ${f.b3_c6_askWho === 'sohra' ? 'Sohra' : 'a Rhivi rider'} the truth about the companies going. It went no further than the Rhivi fires until Maurik. At least one of Brood\'s people knew the Fourth had not lied.`);
    if (f.b3_c6_ask === 'lie') x.push(`The sergeant would not tell ${f.b3_c6_askWho === 'sohra' ? 'Sohra' : 'a Rhivi rider'} where the companies went. When it came out, the Rhivi remembered who had not said.`);
    if (S.tricks && S.tricks.b3_c6_knot) x.push(`Oskan the wright taught ${NAME(S.tricks.b3_c6_knot.who)} the Cawn dock knot. Don't tell them on the Cawn.`);
    if (f.b3_c6_seed === 'rhivi') x.push('Seed grain from a burnt farm south of Setta went to the Rhivi foragers.');
    if (f.b3_c6_seed === 'left') x.push('Seed grain hidden in a burnt farm south of Setta is still there, waiting for whoever hid it.');
    if (f.b3_c6_key === 'quorl') {
      x.push('The Fourth flew with the Seventh and came down above Coral in the dark.');
      if (f.b3_c6_tav2) x.push(c6BriskGone() ? 'Tav found the sergeant in the entrenchments, and asked about his sister, and was told.' : 'Brisk found Tav in the entrenchments. He owes her four coppers. He still will not pay.');
      if (f.b3_c6_twistArm) x.push('Ohl offered to look at Achievant Twist\'s arm. Twist thanked him, and said no.');
      if (f.b3_c6_condorsDone) x.push(`At dusk the Fourth held the roost against the Condors.${(f.b3_c6_moranthCame) ? ' The Black Moranth came down beside them.' : ''}`);
    }
    if (f.b3_c6_key === 'maurik') {
      x.push(`The Fourth stayed on the road with Whiskeyjack's ${c6Dust()}.`);
      if (f.b3_c6_ohlWeek) x.push('Ohl offered Whiskeyjack a week flat on his back. Whiskeyjack said after Coral.');
      if (f.b3_c6_raidDone) x.push(`The barges on the Maurik did not burn.${f.b3_c6_hullLost ? ' One did, a little. Oskan says it floats.' : ''}`);
      if (f.b3_c6_ambDone) x.push(`On the river the Fourth went over the side and up a reed bank after a Seerdomin master.${f.b3_c6_barghastCame ? ' The White Face went with them, singing.' : ''}`);
      if (f.b3_c6_brood) x.push('At Maurik, from a guard line, the Fourth watched Caladan Brood find out.');
      if (f.b3_c6_logs) x.push(f.b3_c6_logs === 'won' ? 'On the Maurik the Fourth beat a White Face warrior at carrying logs, and the White Face sang about it.' : 'On the Maurik a White Face warrior beat the Fourth at carrying logs, and sang about it, kindly.');
      if (f.b3_c6_korlat) x.push('Korlat asked the sergeant to tell her, not him, if Whiskeyjack fell behind on the road.');
      if (f.b3_c6_kallorLook) x.push(`${c6Kallor(true)} looked at the sergeant at Maurik. He has a long memory for faces, and nothing else to do with it yet.`);
    }
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b3_c6_key === 'maurik' && f.b3_c6_brood && `At Maurik, Caladan Brood found out what the Host had done, and said only that he should have been told. Kallor, it is said, called leaving the Host to be annihilated a tactical mistake, and asked to ride south; Korlat went with Whiskeyjack. Whiskeyjack marched for Coral that afternoon with the White Face, and Brood's army came on behind at its own pace.`,
    f.b3_c6_key === 'maurik' && `Whiskeyjack's column built barges on the Maurik below the ford and floated a day downriver to Maurik, an empty city. Three clans of the White Face Barghast rode the barges; the rest walked.`,
    f.b3_c6_key === 'quorl' && `The Seventh's marines were flown south to the mountains above Coral, where Dujek's half of the Host is dug in under cedar and moss. The Bridgeburners hold the forward trenches. The Condors have started following the quorls home.`,
    f.b3_legSeen && f.b3_c6_key === 'maurik' && `Whiskeyjack's leg is worse. He will not lie down until after Coral.`,
    `South of Setta the Black Moranth began taking the Host away by quorl, whole companies a night, more than half of it in all, and Dujek with them. Neither Brood nor the Seer was told. About four thousand stayed on the road under Whiskeyjack.`].filter(Boolean); },

  dlg:{}
};

/* ---------------- the camp south of Setta: the companies going, and the lift field ---------------- */
Object.assign(B3CH6.dlg, {
  b3_c6_start:()=>({sp:'The Host · south of Setta', scene:'b3_c6_host', fx:()=>{ if (!S.f.b3_c6Start) { S.f.b3_c6Start = 1; S.f.b3_domin = 1; } }, txt:
`The second time it happens, you are awake for it.

A sound out past the horse lines like a great many sails filling at once. Then nothing. Then, very high, going south, a long ragged line of something darker than the dark, across the stars, and gone.

In the morning another company is missing. A company of the Fourth Regiment this time, heavy infantry, two hundred people and their kit. The tents are struck and folded. The fires are laid the way you lay a fire you mean to come back to. The quartermasters have already been along the line and moved the next company up into the gap, so that from the hills the Host is exactly as long as it was yesterday.
${b3In('kettle') ? `
Kettle has not slept. She sat up all night on her satchel facing east, and the face she turns to you has the look of someone who has heard a very good secret through a wall. "Quorls," she says. "Dozens, Sergeant. I counted the wingbeats."` : ''}${b3In('brisk') && !c6BriskGone() ? `

Brisk went down the line at first light to look at the empty tents. The Fourth Regiment is Tav's regiment. She comes back and sits down and starts oiling her shield, which does not need it. "Not his company," she says, once. That is all she says.` : ''}${b3In('ellis') ? `

Ellis has walked the empty lines too. "Every tent struck and folded," she says. "Not a boot-print going out past the pickets. Not one." She looks east. "I can't track a thing that doesn't touch the ground."` : ''}`,
    ch:[b3DeckChoice(6),
        {t:'Count the fires.', go:'b3_c6_start2'},
        {t:'"Nobody says anything. Then neither do we."', go:'b3_c6_start2'}]}),
  /* the reading at the first halt (60c) */
  b3_c6_deck:()=>b3DeckOffer(6),
  b3_c6_card:()=>b3DeckCard(6),
  b3_c6_start2:()=>({sp:'The Host · south of Setta', scene:'b3_c6_road', txt:
`The Host marches all day as if nothing had happened, because that is the order nobody gave.

Dujek's standard goes at the head of the column where it always goes. Dujek has not been seen under it for two days.${b3In('ohl') ? ` Ohl mentions this at the noon halt, mildly, to his tea, and then does not mention it again for the rest of the day.` : ''} The Rhivi outriders on the flanks ride up to the column more often than they used to, and look along it, and ride away.

At dusk the Host makes camp in the lee of a burnt farmstead, and a runner comes down the Seventh's lines with his voice kept low.

"Fourth Squad. After dark, the field east of the horse lines. Packs left behind, no fires, no noise." He looks at you. "No questions, Sergeant. I haven't got any answers, so it saves us both the trouble."

He goes before you can ask him anything anyway.`,
    ch:[{t:'Walk the lines.', go:()=>startExplore('b3_c6_camp')}]}),

  /* ---- Tav, packing ---- */
  b3_c6_tav:()=>({sp:'Tav · Fourth Regiment, the Second', fx:()=>{ S.f.b3_c6_tavMet = 1; }, txt:
`Tav's company is packing, and it is not packing for a march. Full kit, no tents. Everything tied down twice and then once more by somebody's corporal. The fire has been let go out.

Tav is sitting on his pack in the middle of it, a big Cawn man with wheat-pale hair, singing under his breath. He cannot sing. He has never been able to sing. He sings anyway, the way some men whistle, to tell the dark he is there.

He sees Brisk at the edge of the dead fire's light, and stops.

${c6Shut() ? `"Opened it yet?" he says.

"When you're dead," says Brisk.

"Long wait."

They have had this conversation every week since Darujhistan. Both of them seem to find it more satisfying each time.` : `"Bris."

"Four coppers," says Brisk.

"Never." He grins. "Come and get them."

They have had this conversation every week since Darujhistan. Both of them seem to find it more satisfying each time.`}`,
    ch:[{t:'"Ask him what they\'re packing for, Brisk."', req:()=>b3In('brisk') && !S.f.b3_c6_tavList, go:'b3_c6_tav_list'},
        {t:'Leave them to it.', go:()=>startExplore()}]}),
  b3_c6_tav_list:()=>({sp:'Tav', fx:()=>{ S.f.b3_c6_tavList = 1; }, txt:
`"Latrines," Tav says.

Brisk looks at the packs, the bedrolls tied down twice, the dead fire. "Latrines."

"Quartermaster came round with a slate. Stand-to at dusk east of the horse lines, full kit, no fires. If anybody asks, we're digging latrines." He shrugs, which on Tav is a geological event. "Nobody believes it. We're the Fourth Regiment. We've never dug a latrine in our lives."

"Quorls," says Brisk.

"I didn't say quorls." He looks up at the sky, which is clear and full of stars and has nothing in it yet. "Bris. Don't stand in front of things."

"You first."

${b3In('kettle') ? `Kettle, behind you, makes a small noise like a kettle. You give her a look. She stops.

` : ''}East of the horse lines, after dark: the same field the runner gave the Fourth. Brisk works it out a breath after you do. She will be standing on that field when he goes, with her back to him, facing the hills, and both of you know it.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  /* an import whose Brisk died in Book One: Tav comes to the sergeant */
  b3_c6_tav_grief:()=>({sp:'Tav · Fourth Regiment, the Second', fx:()=>{ S.f.b3_c6_tavMet = 1; S.f.b3_c6_tavList = 1; }, txt:
`A big Cawn man with wheat-pale hair gets up from a dead fire as the Fourth goes past, and comes over, and stands in front of you, filling the path.

"You were her sergeant," he says. "Brisk's." He has her chin. He has her way of standing, as if something heavy were about to be put on him and he meant to take it. "Tav. Tavrin. Her brother."

He knew already. Word reached him in Darujhistan, or he read it on a roll. He wants to hear it from you. That is all he wants, and he will stand there until he has it.`,
    ch:[{t:'Tell him how she stood.', go:'b3_c6_tav_grief2'},
        {t:'"I\'m sorry. Not tonight."', go:()=>startExplore()}]}),
  b3_c6_tav_grief2:()=>({sp:'Tav', txt:
`You tell him. In order, without anything in it that isn't so.

He listens the way she used to listen to orders, all the way to the end, without moving. When you have finished he nods once.

"In front of something," he says. "She'd be." He breathes out. "I told her not to. In a letter. She never answered it." He looks east, past the horse lines. "We're going somewhere tonight, Sergeant. Latrines, the quartermaster says. If I don't come back from the latrines, she'll have something to say about it." He almost smiles. "Somebody should."

He goes back to his pack.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),

  /* ---- Hurlochel, in from the flank ---- */
  b3_c6_hurl:()=>({sp:'Hurlochel · outrider', fx:()=>{ S.f.b3_c6_hurl = 1; }, txt:
`Hurlochel is just in off the flank, rubbing down a horse that has been ridden too hard, in the lee of the wagons. He has ridden for the Host a long time and for Brood before that, and does not explain either.

"Sergeant." He nods south and west, where the dark is. "Brood's two days behind and taking his time. Rhivi outriders keep coming up to our pickets after dark and counting fires. One of them asked me straight out why the Malazans have fewer fires every night." He works the brush along the horse's flank. "I told him we're a careless people and we lose things. He wrote it down."

He glances at you sideways. "Some of the riders asking aren't Rhivi. Fur on the collars. ${c6KallorKnows() ? `The tall man's colours. He knows your face, I hear. I'd keep it out of the firelight.` : `The tall man's colours: Brood's second. He doesn't send riders to count things for the fun of it.`}"${b3In('ellis') ? `

"The Claw had men who watched fires for a living," Ellis says. "They never rode up to the pickets to do it."

Hurlochel looks at her over the horse's back, and then, thoughtfully, at her glove.` : ''}`,
    ch:[{t:'"What are they counting, Hurlochel?"', go:'b3_c6_hurl2'},
        {t:'Leave him to the horse.', go:()=>startExplore()}]}),
  b3_c6_hurl2:()=>({sp:'Hurlochel', txt:
`He looks at you over the horse's back.

"You don't know either," he says. "Good. Nobody knows anything this week. It's restful." He goes back to the brush. "If somebody tells you, Sergeant, don't tell me. I'm the one the Rhivi ask."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_hurl_again:()=>({sp:'Hurlochel', txt: S.f.b3_c6_fieldDone ? `Hurlochel is saddling a fresh horse. He looks at the Fourth, and at the field to the east, and does not ask. "Restful," he says, to the horse.` : `Hurlochel is still at the horse. "Fewer fires," he says, without looking up. "I counted too."`, ch:[{t:'Leave him.', go:()=>startExplore()}]}),

  /* ---- the burnt farm, and what somebody left under the floor ---- */
  b3_c6_farm:()=>({sp:'The burnt farm', txt:
`A farmstead, or the stone half of one: a house and a byre and a wall round a yard, the roofs burned off and the beams fallen in. Not this week. The ash has been rained on more than once. On the lintel somebody has painted the Seer's sign, and somebody else has tried to scrape it off, and given up halfway.

Nothing in the byre. Nothing in the yard. The well has stones in it. The Domin is like this all the way from the Catlin: not burned by an enemy. Emptied by its own side.${b3In('ellis') ? ` Ellis goes once round the yard, reading the ground. "Cart, and a lot of bare feet, all going one way," she says. "None of it came back."` : ''}
${b3In('greysword') ? `
"The Tenescowri come through first," Dannet says, behind you, very flat. "Then the army takes what they missed. Then nobody lives here." She does not say how she knows. She was on Capustan's wall.` : ''}`,
    ch:[{t:'Look in the root cellar.', req:()=>!S.f.b3_c6_seed, go:'b3_c6_farm_cellar'},
        {t:'Leave it.', go:()=>startExplore()}]}),
  b3_c6_farm_cellar:()=>({sp:'The root cellar', txt:
`The cellar is empty, the way everything here is empty, except that the floor rings wrong under your boot.

Under the boards, wrapped in oiled cloth and then in sacking and then in a cow's hide, there are four sacks of seed grain. Next spring's planting. The hole was dug and lined and the floor laid back over it, carefully, the night before they were driven out, and a hand pressed flat in the dust on the top board, a small hand, the way children do to say *mine*.

They meant to come back for it.`,
    ch:[{t:'Send word to the Rhivi foragers. Brood\'s people are hungrier than ours.', fx:()=>{ S.f.b3_c6_seed = 'rhivi'; ally(1, 0, 'Seed grain for the Rhivi'); if (b3In('sohra')) loy('sohra', 1); }, go:'b3_c6_farm_rhivi'},
        {t:'Put the boards back. They meant to come back for it.', fx:()=>{ S.f.b3_c6_seed = 'left'; ally(0, -1, 'Somebody meant to come back'); if (b3In('ohl')) loy('ohl', 1); }, go:'b3_c6_farm_left'},
        {t:'The quartermaster will pay for grain.', fx:()=>{ S.f.b3_c6_seed = 'qm'; S.silver += 8; updSilver(); ally(0, 1, 'The last of a farm, in a ledger'); if (b3In('ohl')) loy('ohl', -1); }, go:'b3_c6_farm_qm'}]}),
  b3_c6_farm_rhivi:()=>({sp:'The burnt farm', txt:
`Two Rhivi foragers come for it before midnight, a man and a girl, with a pack-bhederin that looks at the farm the way you did.

They do not thank you. They look at the hand in the dust for a long time, and the girl says something in Rhivi, and the man answers, and they take the sacks.${b3In('sohra') ? `

"She asked if the child is dead," Sohra says. "He said: the grain does not know." She watches them go. "That was a good thing to do, ${S.f.b3_herdMother ? 'herd-mother' : 'Sergeant'}. Do not do it where the quartermasters can see."` : ''}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_farm_left:()=>({sp:'The burnt farm', txt:
`You put the boards back the way they were, and the dust back over the boards as near as you can, and leave the hand where it is.

None of the Fourth mentions it.${b3In('ohl') ? ` Ohl, going back up the cellar steps, says something under his breath in Ehrlii that is not addressed to Hood for once. Later you ask him what it was. "A thing my mother said over seed," he says. "It doesn't matter what. It's the saying."` : ''}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_farm_qm:()=>({sp:'The burnt farm', txt:
`The quartermaster pays eight silver for the four sacks without looking at them, writes a line in his ledger, and has them on a wagon inside the hour.

The hand stays in the dust on the empty board. You find you remember it longer than the eight silver.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),

  /* ---- the High Fist's standard, and the man who keeps it ---- */
  b3_c6_standard:()=>({sp:'The High Fist\'s standard', fx:()=>{ S.f.b3_c6_standard = 1; }, txt:
`Dujek's standard is planted by the command tents the way it is every night, lit by two lamps, with a pair of guards beside it who have the look of men told to stand there whether or not anybody is in the tent.

Still no sign of the High Fist. If Dujek is gone, somebody has decided the standard is not.

The standard bearer is sitting on a camp stool at its foot, mending a strap: an unremarkable man, neither young nor old, with careful hands. He looks up as you pass, politely, the way a man looks up at weather, and goes back to the strap.${b3In('tuft') ? `

Tuft has stopped walking. She stands quite still, the way she always does near him, and when you look at her she shakes her head before you can ask.

"I don't know," she says. "I don't. It's every time." She walks on, quickly, and does not look back at him, and does not stop not looking until the command tents are behind you.` : ''}`,
    ch:[{t:'Leave him to his strap.', go:()=>startExplore()}]}),

  /* ---- the squad's fire ---- */
  b3_c6_fire:()=> S.f.b3_c6_fieldDone && b3In('sohra') && !c6Told() ? DLG.b3_c6_ask() : ({sp:'The Fourth\'s fire', txt:
`The Fourth's fire, small and banked. Every fire in the Seventh's lines is banked tonight, and no one gave the order.${S.f.b3_c6_fieldDone ? ` The field to the east is empty again. Out past the horse lines the grass is flattened in long rows where the quorls sat.` : ''}

${b3In('kettle') ? `Kettle counts the satchel by feel. "${c6Count()}," she says. "Same as this morning." She sounds, for the first time in a month, as if she'd like it not to be.` : 'The satchel is where it always is.'}${b3In('greysword') ? ` Dannet has the pot of grey paint open on her knee and is not painting, only looking at the wolf.` : ''}${b3In('ellis') ? ` Ellis sits facing east, toward the horse lines, with the gloved hand in her lap.` : ''}${b3In('vell') ? ` Vell lies on his back watching the sky over the field, as if something might go across it. Twice tonight, something does.` : ''}${b3Waiting('greysword') ? ` Dannet is with the Grey Swords tonight, three lines over, if the Fourth wants her.` : ''}${b3Waiting('sohra') ? ` Sohra is at the Rhivi fires tonight, if the Fourth wants her.` : ''}`,
    ch:[{t:'Rest a while.', req:()=>!S.f.b3_c6_rest, fx:()=>{ S.f.b3_c6_rest = 1; b3Rest('The Fourth sleeps in its boots by a banked fire, the way the Seventh sleeps tonight. Wounds close, mostly.'); }, go:'b3_c6_rested'},
        {t:'Send for Dannet.', req:()=>b3Waiting('greysword'), fx:()=>{ b3SwapIn('greysword'); }, go:'b3_c6_swap'},
        {t:'Send for Sohra.', req:()=>b3Waiting('sohra'), fx:()=>{ b3SwapIn('sohra'); }, go:'b3_c6_swap'},
        {t:'"Ellis. What are you watching?"', req:()=>b3In('ellis') && !S.f.b3_c6_tEllis, go:'b3_c6_fire_ellis'},
        {t:'"Vell. What are you waiting for up there?"', req:()=>b3In('vell') && !S.f.b3_c6_tVell, go:'b3_c6_fire_vell'},
        {t:'Leave it.', go:()=>startExplore()}]}),
  /* Ellis and Vell at the fire before the fork (a Book One import brings one of them, rarely both) */
  b3_c6_fire_ellis:()=>({sp:'Ellis', fx:()=>{ S.f.b3_c6_tEllis = 1; }, txt:
`"Dujek's grey," Ellis says, when you sit. She has not turned from the horse lines. "It hasn't been out in three days. Someone's grooming it twice a day so it looks ridden." The gloved hand moves in her lap. "In the Claw, that's how you'd know a man had gone. Not the empty tent. The horse somebody's still feeding."

Out past the pickets a Rhivi outrider goes along the dark side of the camp at a walk, counting fires. Ellis follows him all the way along with her chin.

"He's good," she says. "He came up to the pickets last night and asked me where the Malazans go. I said I look at the ground for a living. He said he'd thought I'd say that." Something at the corner of her mouth. "I liked him. Six years I was the one kept out of things, Sergeant. Toc told me the end of the last secret on the plain, after it had done its work. I'd sooner not do that to a good scout." She shrugs. "I will, if it's the order. I'd like it noted I didn't enjoy it."`,
    ch:[{t:'"When we know, you\'ll know. Before anyone."', fx:()=>{ S.f.b3_c6_ellisAns = 'tell'; loy('ellis', 1); }, go:'b3_c6_fire_ellis2'},
        {t:'"Noted. Keep watching him."', fx:()=>{ S.f.b3_c6_ellisAns = 'watch'; }, go:'b3_c6_fire_ellis2'}]}),
  b3_c6_fire_ellis2:()=>({sp:'Ellis', txt: S.f.b3_c6_ellisAns === 'tell' ?
`She looks at you properly then, which she rarely does, as if checking a track she had already read once.

"That's all a scout asks," she says. "Mostly." She goes back to the horse lines. A while later, without turning, she says: "The grey's a good horse. Someone should ride it, wherever he's gone."` :
`"I'll watch him," she says. "He'll watch me. It'll be very professional." She settles the bow across her knees. "On the plain, that's nearly friendship."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_fire_vell:()=>({sp:'Vell', fx:()=>{ S.f.b3_c6_tVell = 1; }, txt:
`Vell doesn't sit up. He points, from where he lies, at the stars over the field to the east.

"There," he says. "Twice tonight, a line of something across the stars. Going south. I'm the only one looking up." He puts his hands behind his head. "In the Daru District you learn to look up. Everything that matters is on the roofs. The clans, the lines, the rope-men. People in the street never once look up. You could run a whole war over their heads." He is quiet. "I think somebody is."

He turns his head toward you.

"I went up on the roofs at thirteen. Never looked down once, that's the rule. And I've never, not once, wanted to go higher than the highest roof there was." He looks back at the stars. "Tonight I do. Is that daft, Sergeant?"`,
    ch:[{t:'"No. One day you\'ll string a line up there."', fx:()=>{ S.f.b3_c6_vellAns = 'line'; loy('vell', 1); }, go:'b3_c6_fire_vell2'},
        {t:'"Feet on the ground, Vell. For now."', fx:()=>{ S.f.b3_c6_vellAns = 'ground'; }, go:'b3_c6_fire_vell2'}]}),
  b3_c6_fire_vell2:()=>({sp:'Vell', txt: S.f.b3_c6_vellAns === 'line' ?
`He grins at the sky. "Between what and what, though," he says. "That's the trouble with up there. Nothing to tie off to." He thinks about it. "I'll work on it."

When you look back from the fire a while later he is still awake, tying a knot in the air with two fingers, and then another, as if trying out which one would hold a star.` :
`"For now," he agrees, comfortably. He has heard *for now* from the Fourth before, and it has always meant something.

He keeps watching the stars anyway. The Fourth's rule is feet on the ground. There was never a rule about eyes.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_rested:()=>({sp:'The Fourth\'s fire', txt:
`You sleep, or something near it. Twice in the night the sound of sails filling comes from the east, a long way off, and twice you are awake before it stops.${b3In('ohl') ? ` Ohl does not sleep at all. In the morning he says he did.` : ''}`,
    ch:[{t:'Up.', go:()=>startExplore()}]}),
  b3_c6_swap:()=>({sp:'The Fourth\'s fire', txt: b3In('greysword') && S.f.b3_dannetDone === 1 && !b3In('sohra') ?
`Dannet comes over from the Grey Swords' lines with her shield on her back and her pot of grey paint in her hand, and sits down at the Fourth's fire as if she had never left it. "The company says the Domin is mine to show you," she says. "Show you what, I asked. They said: the rest of it."` :
`Sohra comes in from the Rhivi fires with her bow unstrung over her shoulder and her bone beads clicking, and sits down on the wrong side of the fire, the side the smoke goes. "The Mhybe's people say watch the Malazans," she says. "I said I was already watching. They said watch closer."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),

  /* ---- the quartermaster's wagons: the Host's quartermaster sells, in silver ---- */
  b3_c6_wagons:()=>({sp:'The quartermaster', again:()=>`The quartermaster's wagon. You have ${S.silver} silver.`, txt:
`The Seventh's quartermaster has spent the week moving companies up into gaps so the column stays the same length, and has opinions about it, which he does not share. He has also got wagons, and on the wagons are things a squad can buy, in silver, from a man with a slate.

"Salve, six. Sharpers, nine, and don't tell me the Moranth give them away, the Moranth don't give me anything. Smokers, five." He looks at the Fourth. "Buy now. I hear some of you are going a long way soon. Latrines, I hear."${b3In('kettle') ? `

Kettle looks at the sharpers the way other people look at a fire on a cold night.` : ''}${b3In('vell') ? `

Vell asks if there is any tarred line on the wagons. "Rope's spoken for," the quartermaster says. "All of it. Every fathom in the column. Don't ask me what for." Vell, who has never once in his life heard of rope being spoken for, looks at the carpenters' wagons for a long, thoughtful breath, and then asks anyway.` : ''}`,
    ch:[{t:'A salve.', tag:'6 silver', req:()=>S.silver >= 6, fx:()=>{ S.silver -= 6; S.inv.salve++; updSilver(); note('A salve, from the quartermaster\'s wagon.', 'good'); }, go:'b3_c6_wagons'},
        {t:'A sharper.', tag:'9 silver', req:()=>S.silver >= 9, fx:()=>{ S.silver -= 9; S.inv.sharper++; updSilver(); note('A sharper, from the quartermaster\'s wagon.', 'good'); }, go:'b3_c6_wagons'},
        {t:'A smoker.', tag:'5 silver', req:()=>S.silver >= 5, fx:()=>{ S.silver -= 5; S.inv.smoker++; updSilver(); note('A smoker, from the quartermaster\'s wagon.', 'good'); }, go:'b3_c6_wagons'},
        {t:'Nothing.', go:()=>startExplore()}]}),

  /* ---- the lift field ---- */
  b3_c6_field_go:()=> S.f.b3_c6_fieldDone ? {sp:'The lift field', txt:`The field east of the horse lines. The grass is flattened in long rows where the quorls sat, and in the gully to the south the Pannion foragers are where the Fourth left them.`, ch:[{t:'Back.', go:()=>startExplore()}]} : {sp:'The lift field', txt:
`East, past the horse lines, the ground falls away to a long field of dead grass that nobody has camped on. The runner said after dark. It is dark.${b3In('brisk') && S.f.b3_c6_tavList ? ` Brisk is already looking that way.` : ''}`,
    ch:[{t:'Go.', onward:true, go:'b3_c6_field'},
        {t:'Not yet.', go:()=>startExplore()}]},
  b3_c6_field:()=>({sp:'The lift field', scene:'b3_c6_lift', txt:
`They are on the field already when you get there: forty quorls, perhaps more, in long dark rows on the dead grass, wings folded down along their backs like the cloaks of men asleep standing up. No lanterns. The Black Moranth stand at their heads, carved out of the same dark, not moving. Something in the air smells of hot horn and resin.

A company of the Fourth Regiment is walking out to them with its packs on.

Whiskeyjack is at the near edge of the field, watching it go. He is standing with all his weight on one leg and none on the other, and making it look like a choice. He sees the Fourth, and points south, to the low rise where the field ends and the dark country begins, and that is your order: face the hills, and let nothing come over them.

Dujek's name goes unsaid. It doesn't need saying.`,
    ch:[{t:'Face the hills.', go:()=> b3In('brisk') && !c6BriskGone() ? talk('b3_c6_field_brisk') : talk('b3_c6_field_alarm')}]}),
  b3_c6_field_brisk:()=>({sp:'The lift field', txt:
`Tav's company goes past behind you in the dark, close enough to hear: two hundred people trying to walk quietly in full kit, which is not quiet. Somebody in it is singing under his breath, badly, the same four bars over and over.

Brisk does not turn round. She is on picket, facing the hills, with her shield up. That is where you put her.

The singing comes level with her, and stops.

"Bris," says Tav's voice, very low.

She does not turn round. Then, without turning, she lifts her free hand over her shoulder, open, and holds it there a moment, and puts it back on her shield.

The singing starts again, further off, going out onto the field.${b3In('kettle') ? ` Kettle, beside Brisk, looks at her once and then very carefully at the hills.` : ''}`,
    ch:[{t:'Watch the hills.', go:'b3_c6_field_alarm'}]}),
  b3_c6_field_alarm:()=>({sp:'The lift field · the south rise', txt:
`Behind you the first row of quorls goes up. You feel it more than hear it: the air pushed down the field in a long soft blow, and the grass lying flat, and then the sound, the sails filling, going away upward.

In front of you a stone turns over in the dark.

Voices, low, in a tongue that is not Malazan. Then shapes on the rise, a dozen of them, spears and packs, a foraging party out to count the Host's fires, and they have come over the rise and stopped dead, and they are looking past the Fourth at forty quorls and two hundred Malazans going up into the sky.

If one of them gets home, the Seer knows by morning.${b3In('ellis') ? `

"Twelve," Ellis breathes. "And one out on the flank I can hear and can't see."` : ''}${b3In('vell') ? `

Vell has the hook off his shoulder and the line paid out in loops over his arm. "The one who runs," he whispers. "I'll have his ankles."` : ''}${b3In('greysword') ? `

"Beklite foragers," Dannet breathes. "They count. That is all they are for."` : ''}`,
    ch:[{t:'"Take them. Quietly."', go:()=>startBattle('b3_c6_field', {})},
        {t:'Kettle\'s sharper, into the middle of them.', tag:'uses 1 sharper · loud', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; S.f.b3_c6_loud = 1; ally(-1, 0, 'A sharper on the lift field, heard two miles off'); }, go:()=>startBattle('b3_c6_field', {pre:true})},
        {t:'Round by the ditch, and take them from behind.', check:['guile', 14],
          near:{t:()=>S.f.b3_c6_nearSmoke ? `Yes, but the ditch is a foot deep in cold water, and ${NAME(ROLL().who || 'sgt')} goes along it flat, with the munitions bag underneath. One of Kettle's smokers comes out of it a lump of wet clay. One smoker gone.` : `Yes, but the ditch is a foot deep in cold water, and ${NAME(ROLL().who || 'sgt')} comes up out of it shaking so hard the hand will not stay still: −1 on the next check.`,
            fx:()=>{ S.f.b3_c6_nearSmoke = 0; if (S.inv.smoker > 0) { S.inv.smoker--; S.f.b3_c6_nearSmoke = 1; } else { S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; } }},
          edges:id=>[id === 'sohra' && ['the plains way: low, and downwind', 2], id === 'greysword' && ['she knows how Beklites walk a picket', 1], id === 'brisk' && ['heavy kit, and a shield', -1], id === 'ellis' && ['six years of not being where the sentry looked', 2], id === 'vell' && ['a Guild runner crosses a yard without a sound', 1]],
          go:'b3_c6_field_round', fail:'b3_c6_field_seen'}]}),
  b3_c6_field_round:()=>({sp:'The lift field · the south rise', txt:
`${by({sohra:`Sohra goes down into the ditch below the rise on her belly and is gone, the way grass is gone when the wind lies it flat. A moment later the forager at the back of the party sits down with an arrow in him and does not get up.`, greysword:`Dannet goes along the ditch bent double with her shield on her back, and comes up behind the last of them without a sound, and the last of them is no longer a problem.`, ellis:`Ellis goes along the ditch and is simply not there any more, and then she is behind the last of them with the gloved hand over his mouth, and the last of them is no longer a problem.`, vell:`Vell goes along the ditch on his elbows with the line coiled on his back, and the hook goes out once, low, round the ankles of the last of them, and he goes down into the ditch with hardly a splash.`, _:`{who} goes along the ditch under the rise and comes up behind the last of them, and the last of them is no longer a problem.`})}

The rest turn round to see what happened to the back of their file. That is when the Fourth comes over the rise.`,
    ch:[{t:'Into them.', go:()=>startBattle('b3_c6_field', {surprise:'p'})}]}),
  b3_c6_field_seen:()=>({sp:'The lift field · the south rise', txt:
`A boot finds the one loose stone in the ditch. It goes rattling down, very loud, and twelve faces turn toward it at once.

One of them shouts. One of them, worse, does not shout, and turns to run.`,
    ch:[{t:'After them.', go:()=>startBattle('b3_c6_field', {surprise:'e'})}]}),
  b3_c6_after_field:()=>({sp:'The lift field', scene:'b3_c6_lift_empty', fx:()=>{ if (!S.f.b3_c6_fieldDone) { S.f.b3_c6_fieldDone = 1; if (c6Quiet()) ally(-1, 0, 'Kallor\'s whisper, with something to stand on now'); } }, txt:
`The file-leader goes down at the bottom of the gully with his horn under him, unblown. Nobody went home.

Behind you the field is empty. The last row of quorls is a darker line on the dark, very high, going south, and then not even that. The grass is flat in long rows where they sat. Two hundred people were standing there a quarter of an hour ago.${b3In('brisk') && !c6BriskGone() ? ` Brisk stands looking at the place where the singing was, for exactly as long as it takes to wipe her blade, and then turns her back on it.` : ''}

Whiskeyjack comes across the grass to the gully. He walks slowly, and the slowness is not the dark. He looks at the dead, and at the Fourth, and counts.${b3In('ellis') ? ` Ellis has counted them already. She catches his eye and nods once: the same number.` : ''}

"Nobody went home," he says.

"No, sir."

"Good." He lowers himself onto a stone at the top of the gully, carefully, leg out straight. "You've worked it out. Dujek went two nights ago. The Moranth come every night and take what they can carry. By the time we reach the Maurik, more than half the Host will be dug in in the mountains over Coral, and the Seer will still be watching this road, because this road is going to have an army on it." He almost smiles. "Four thousand of us. Half of them cooks and carpenters. Making the dust of ten."${c6Quiet() ? `

He looks south-west, toward Brood's fires. "There's a story going round Brood's camp. That the Malazans mean to take Coral for the Empress, and leave the rest of the alliance to find its own way home. It's had a week to grow, with help." He doesn't say who. "This won't help."` : ''}

"The Seventh goes tomorrow night," he says. "Your company. I can keep one squad of marines back with the column. I need people on the road who can stand a line by a river and keep their mouths shut." He looks at you. "I don't order people onto a quorl, Sergeant. Or off one."`,
    ch:[{t:'"We go with the Seventh, sir."', fx:()=>{ S.f.b3_c6_key = 'quorl'; }, go:'b3_c6_key_quorl'},
        {t:'"We stay with you, sir."', fx:()=>{ S.f.b3_c6_key = 'maurik'; }, go:'b3_c6_key_maurik'},
        {t:'"Why is Brood not to know, sir?"', req:()=>!S.f.b3_c6_why, fx:()=>{ S.f.b3_c6_why = 1; }, go:'b3_c6_wj_why'},
        {t:'"Give me tonight, sir."', go:()=>startExplore('b3_c6_camp')}]}),
  b3_c6_wj_why:()=>({sp:'Whiskeyjack', txt:
`"Because Brood's camp leaks like a Rhivi tent in the spring, and the Seer has ears in it, the way he has ears everywhere in this country." He rubs the knee with the heel of his hand, without seeming to know he is doing it. "And because Dujek decided. You can ask him why, when you see him. He'll tell you it's a fair question and then not answer it."

He looks toward the far fires. "Brood will find out at the Maurik. I'll tell him myself. It needs a man to stand there while he does." A pause. "I'd rather it was me."

You watch him shift his weight on the stone, and stop, and decide not to try again.`,
    ch:[{t:'"We go with the Seventh, sir."', fx:()=>{ S.f.b3_c6_key = 'quorl'; }, go:'b3_c6_key_quorl'},
        {t:'"We stay with you, sir."', fx:()=>{ S.f.b3_c6_key = 'maurik'; }, go:'b3_c6_key_maurik'},
        {t:'"Give me tonight, sir."', go:()=>startExplore('b3_c6_camp')}]}),
  /* Whiskeyjack in the camp after the field, for an answer */
  b3_c6_wj:()=>({sp:'Whiskeyjack', txt:
`Whiskeyjack is sitting on an upturned crate by the High Fist's standard, with his leg out straight and a map across his knees that he is not looking at.

"Sergeant." He folds the map. "The quorls come for the Seventh tomorrow night. Go with them, or walk with me. I'd like to know which before the quartermaster does."`,
    ch:[{t:'"We go with the Seventh, sir."', fx:()=>{ S.f.b3_c6_key = 'quorl'; }, go:'b3_c6_key_quorl'},
        {t:'"We stay with you, sir."', fx:()=>{ S.f.b3_c6_key = 'maurik'; }, go:'b3_c6_key_maurik'},
        {t:'"Why is Brood not to know, sir?"', req:()=>!S.f.b3_c6_why, fx:()=>{ S.f.b3_c6_why = 1; }, go:'b3_c6_wj_why'},
        {t:'"Not yet, sir."', go:()=>startExplore()}]}),

  /* ---- the question: Sohra (or a Rhivi rider) asks where the companies go ---- */
  b3_c6_ask:()=>({sp:b3In('sohra') ? 'Sohra' : 'A Rhivi rider', txt: b3In('sohra') ?
`Sohra is sitting at the Fourth's fire when you come back to it, on the side the smoke goes, with her bow across her knees. She was on the field. She saw the rows of quorls, and the company walking out to them, and the grass lying down.

"The Mhybe's people lent me to you to watch the Malazans," she says. "So. I am watching." She tests the string with her thumb. "Where do your people go at night, ${S.f.b3_herdMother ? 'herd-mother' : 'Sergeant'}?"

It is the first time she has asked you anything she might not like the answer to.` :
`A Rhivi rider is sitting his horse at the edge of the Seventh's lines in the dark, where the pickets have decided not to see him. He is young, with the pale spirit-mark across his eyes, and he is looking past you at the field to the east, where the grass is lying flat in long rows.

"Malazan," he says. His trade-tongue is careful. "Every night there are fewer of your fires. The Mhybe's people ask me why. I ask you." He waits. "Where do your people go at night?"`,
    ch:[{t:'Tell the truth. South, by quorl, to Coral.', fx:()=>{ S.f.b3_c6_ask = 'truth'; S.f.b3_c6_askWho = b3In('sohra') ? 'sohra' : 'rider'; ally(1, 0, 'The truth, told to the Rhivi'); if (b3In('sohra')) loy('sohra', 1); if (b3In('brisk')) loy('brisk', -1); }, go:'b3_c6_ask_truth'},
        {t:'"Latrines."', fx:()=>{ S.f.b3_c6_ask = 'lie'; S.f.b3_c6_askWho = b3In('sohra') ? 'sohra' : 'rider'; if (b3In('sohra')) loy('sohra', -1); }, go:'b3_c6_ask_lie'},
        {t:'"Ask me at the Maurik."', fx:()=>{ S.f.b3_c6_ask = 'later'; S.f.b3_c6_askWho = b3In('sohra') ? 'sohra' : 'rider'; }, go:'b3_c6_ask_later'}]}),
  b3_c6_ask_truth:()=>({sp:b3In('sohra') ? 'Sohra' : 'A Rhivi rider', txt: b3In('sohra') ?
`You tell her. South, by quorl, to the mountains over Coral, half the Host, Dujek with them. You do not tell her it is an order not to. She knows.

She is quiet a long time.

"I will not tell the Mhybe's people," she says at last. "Not yet. When they find out, and they will find out, I will tell them one Malazan did not lie to me." She looks up. "That is worth something, on the plain. More than you think."${b3In('brisk') ? `

Brisk, across the fire, folds her arms. Brisk keeps orders the way she keeps the ration count. You will hear about this, later, in the form of silence.` : ''}` :
`You tell him. South, by quorl, to Coral. Half the Host.

He looks at you, and then at the flat grass, and then he nods, once, the Rhivi way, with the chin.

"I will remember who said it," he says, and turns his horse, and is gone into the dark toward Brood's fires without hurrying.${b3In('brisk') ? ` Brisk watches him go, and then looks at you, and then looks at nothing.` : ''}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_ask_lie:()=>({sp:b3In('sohra') ? 'Sohra' : 'A Rhivi rider', txt: b3In('sohra') ?
`"Latrines," Sohra says.

She looks at the field, where two hundred Malazans in full kit went up into the sky an hour ago.

"Latrines," she says again, as if trying the word for weight. She does not laugh, and Sohra laughs at everything Malazans say, a beat late and harder. She restrings the bow, very carefully, and does not look at you again tonight.` :
`"Latrines," the rider repeats. He looks at the flat grass in its long rows.

"The Mhybe's people will laugh," he says. He does not laugh. He turns his horse and goes, and you have the feeling, watching him, that he will remember your face better than your answer.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_ask_later:()=>({sp:b3In('sohra') ? 'Sohra' : 'A Rhivi rider', txt: b3In('sohra') ?
`"At the Maurik," Sohra says. She considers it. "A river is a good place for an answer. Things come out in water." She lays the bow down. "I will hold you to the river, ${S.f.b3_herdMother ? 'herd-mother' : 'Sergeant'}. All the way to it."` :
`"At the river," the rider says. He considers it, and you, and the flat grass. "Good. I will ask at the river." He turns his horse. "I will ask you. Not the others."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),

  /* ---- the key ---- */
  b3_c6_key_quorl:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c6_key = 'quorl'; S.f.b3_flew = 1; delete S.f.b3_river; if (!S.f.b3_c6_keyLoy) { S.f.b3_c6_keyLoy = 1; if (b3In('kettle')) loy('kettle', 1); if (b3In('brisk')) loy('brisk', 1); if (b3In('ohl')) loy('ohl', -1); } }, txt:
`Whiskeyjack nods, as if he had expected it, and as if it costs him something to have expected it.

"Good. Dujek will be glad of you. Tell him—" He stops. "Tell him I'm walking."

He gets up off the stone in two movements instead of one, and goes.
${b3In('kettle') ? `
Kettle has stopped breathing. "By *quorl*," she says. "Sergeant. *By quorl.*" Then, recovering a little dignity: "For the munitions. The munitions need an eye kept on them."` : ''}${b3In('brisk') && !c6BriskGone() ? `

Brisk looks south, the way the singing went. Then she nods, once, to you, which from Brisk is a letter of thanks.` : ''}${b3In('ohl') ? `

"I have never flown," Ohl says. "I would like it noted that I am too old to begin." He goes to pack anyway.` : ''}${b3In('tuft') ? `

Tuft looks south-west, toward Brood's fires, and the Rhivi among them. "She isn't there," she says, before anyone asks. "Not for two nights. She's ahead of us. South. I can feel it in my teeth." She picks up her pack. "So it's the right way, either way."` : ''}${b3In('sohra') ? `

"The Mhybe's people said to watch the Malazans," Sohra says, faintly. "They did not say from underneath a bug."` : ''}${b3In('greysword') ? `

"Coral," Dannet says. "From the sky." She touches the half-painted wolf. "They will never believe me in Capustan."` : ''}${b3In('ellis') ? `

"From up there you could see every road out," Ellis says. She sounds, for Ellis, very nearly pleased.` : ''}${b3In('vell') ? `

Vell is grinning before anybody else has finished. "Higher than the Spawn," he says. "Higher than anything with a roof on it." Then, more practically: "Do they give you a rope?"` : ''}`,
    ch:[{t:'The next night.', go:'b3_c6_q_night'}]}),
  b3_c6_key_maurik:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c6_key = 'maurik'; S.f.b3_river = 1; delete S.f.b3_flew; if (!S.f.b3_c6_keyLoy) { S.f.b3_c6_keyLoy = 1; if (b3In('ohl')) loy('ohl', 1); if (b3In('kettle')) loy('kettle', -1); if (b3In('sohra')) loy('sohra', 1); } }, txt:
`Whiskeyjack looks at you for a moment longer than he needs to.

"Good," he says. That is all he says about it. "Get some sleep. Tomorrow you start marching like three squads."

He gets up off the stone in two movements instead of one, and goes.
${b3In('kettle') ? `
The next night the quorls come for the Seventh, and the Fourth stands at the edge of the field and watches its own company walk out to them and go up. Kettle counts the wingbeats out loud until she can't hear them any more, and then keeps counting. "There goes the Seventh," she says. "There goes everybody." She does not say *there go the quorls*. She doesn't have to.` : `
The next night the quorls come for the Seventh, and the Fourth stands at the edge of the field and watches its own company walk out to them and go up.`}${b3In('brisk') && !c6BriskGone() ? `

Brisk watches them go with her arms folded. "Tav went up last night," she says, to nobody in particular. "I could have asked to go with him. Wouldn't have been hard." A long breath. "We don't leave people. I'm not leaving anybody. I'm staying with mine." She turns away from the field. "It's further than I thought it went, that. *We don't leave people.* Goes in more than one direction."` : ''}${b3In('ohl') ? `

Ohl watches Whiskeyjack walk back to his tent, and how he walks. He has stopped saying things about it out loud, in case Hood is listening.` : ''}${b3In('sohra') ? `

Sohra looks at the empty field, and then at you. "You stayed," she says. "On the ground, where a person can see you." She nods. "Good. I was not going to fly."` : ''}${b3In('ellis') ? `

Ellis watches the Rhivi outriders on the far edge of the field, who are watching the Seventh go. "On the ground," she says, "you can see who's following." She has counted them already.` : ''}${b3In('vell') ? `

Vell watches the quorls until there is nothing left to watch, and a while after. "Next time," he says, mostly to himself.` : ''}`,
    ch:[{t:'Walk.', go:'b3_c6_m_march'}]}),
});

/* ---------------- Oskan, a Cawn wright with the carpenters' wagons: the chapter's trick (✦), before the road forks ---------------- */
Object.assign(B3CH6.dlg, {
  b3_c6_oskan0:()=>({sp:'Oskan · a wright', fx:()=>{ S.f.b3_c6_oskan0 = 1; }, txt:
`Behind the carpenters' wagons a short, broad, bald man with forearms like hawsers is throwing a weighted line at a fence post, over and over, in the dark. The line goes out, the knot at the end of it runs, and the post jerks as if somebody had kicked it. He walks over, frees it, walks back, and throws again.

"Oskan," he says, without being asked. "Wright. Cawn." He jerks his head at the wagons, which are full of adzes, augers, saws, rope, pitch and a great many things you do not have names for. "I've not been told what all this is for. So I'm practising for a river."${b3In('brisk') && !c6BriskGone() ? `

Brisk has stopped. She is watching the line go out with a look you have not seen on her since the Cawn wharf came up in conversation, which it never does.

"Dock knot," she says.

"Dock knot," Oskan agrees, pleased. "Whose are you?"

"Tavrin's sister."

"Big lad? Sings?" He winces. "I'm sorry for you."` : ''}${b3In('vell') ? `

Vell's hands are moving at his sides, copying the throw without meaning to. "That's not a Guild knot," he says. "The Guild would pay to know that one."

"The Guild," says Oskan, "can come to the Cawn and ask."` : ''}`,
    ch:[{t:'"Show us the knot."', check:['wits', 16], trick:'b3_c6_knot', req:()=>!S.f.b3_c6_knotTried, fx:()=>{ S.f.b3_c6_knotTried = 1; },
          edges:id=>[id === 'brisk' && ['she grew up on the Cawn docks', 2], id === 'sohra' && ['a herd-rider\'s rope hand', 1], id === 'kettle' && ['quick fingers, and patience with fuses', 1], id === 'tuft' && ['she has never thrown anything heavier than a card', -1], id === 'vell' && ['rope is his trade', 2]],
          go:'b3_c6_oskan0_knot', fail:'b3_c6_oskan0_miss'},
        {t:'"A river, you said."', go:'b3_c6_oskan0_river'},
        {t:'Leave him to his post.', go:()=>startExplore()}]}),
  b3_c6_oskan0_knot:()=>({sp:'Oskan', txt:
`Oskan puts the line in ${by({sgt:'your', _:'{who}\'s'})} hands and stands behind, close enough to catch the line if it goes.

"Not the arm. The hip. The arm just goes where it's told." The line goes out, and falls short, and comes back. "The weight does the reaching. You do the knot. When it touches, you're already pulling. Never pull late. Pull late and you've thrown a rope at a man, and he'll thank you for it."

The third throw takes the post. The fourth jerks it half out of the ground.

"There." He takes the line back and coils it, and then, after a moment's thought, cuts a length from the coil and gives it over, weight and all. "Every bargeman on the Cawn can do that drunk, in the rain, at night. Now so can a marine." He looks at you. "Don't tell them on the Cawn."${by({brisk:`

Brisk coils the line round her forearm without looking, the way you do a thing your hands learned before you did. "Tav could never get it," she says. "Not once. Nine years." She almost smiles.`, vell:`

Vell coils the line the Guild way without thinking, and stops, and coils it again the Cawn way, to feel the difference. "Huh," he says, which from a rope man is a speech.`, _:''})}`,
    ch:[{t:'"A river, you said."', go:'b3_c6_oskan0_river'},
        {t:'Thank him, and go.', go:()=>startExplore()}]}),
  b3_c6_oskan0_miss:()=>({sp:'Oskan', txt:
`The line goes out and wraps itself round ${by({sgt:'your', _:'{who}\'s'})} own ankle, which Oskan says is a thing he has seen before, but only in children.

"Hip," he says kindly, untangling it. "Not the arm. You'll get it. Some don't." He goes back to his post.`,
    ch:[{t:'"A river, you said."', go:'b3_c6_oskan0_river'},
        {t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_oskan0_river:()=>({sp:'Oskan', txt:
`"A river." He nods south. "Nobody carries this much pitch to dig latrines, Sergeant. And they've been asking every man in the column who's built a hull. There's eleven of us." He throws the line. The post jumps. "Barges. They mean to float an army somewhere. I'd like to know which bit of the army." He frees the knot. "Not the bit that's leaving at night, I'd guess. Can't take a barge on a bug."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_oskan0_again:()=>({sp:'Oskan', txt:`Oskan is still at the post. The line goes out; the post jumps. "Hip," he says, when he sees you. "Not the arm."`,
    ch:[{t:'"Show us the knot again."', check:['wits', 16], trick:'b3_c6_knot', req:()=>!S.f.b3_c6_knotTried2 && S.f.b3_c6_knotTried && !(S.tricks && S.tricks.b3_c6_knot), fx:()=>{ S.f.b3_c6_knotTried2 = 1; },
          edges:id=>[id === 'brisk' && ['she grew up on the Cawn docks', 2], id === 'sohra' && ['a herd-rider\'s rope hand', 1], id === 'kettle' && ['quick fingers, and patience with fuses', 1], id === 'tuft' && ['she has never thrown anything heavier than a card', -1], id === 'vell' && ['rope is his trade', 2]],
          go:'b3_c6_oskan0_knot', fail:'b3_c6_oskan0_miss'},
        {t:'Leave him.', go:()=>startExplore()}]}),
});

/* ---------------- the quorl road: the night lift, the ledge, the entrenchments, the Condors ---------------- */
Object.assign(B3CH6.dlg, {
  b3_c6_q_night:()=>({sp:'The lift field · the next night', scene:'b3_c6_lift', txt:
`The next night it is the Seventh's turn to walk out onto the field with its packs on, and the Fourth goes with it.

Close to, a quorl is bigger than you expected and quieter than you feared: a long dark body like a dragonfly's made by somebody who had only heard dragonflies described, four wings folded back along it, and a smell of hot horn and resin. The rider is already up behind the head. A Black Moranth turns its helm toward you, the visor a smooth black slot, and holds out a hand, and that is the whole of the conversation.

You go up behind it. Your squad goes up behind theirs. The straps are wet with somebody else's sweat.${b3In('kettle') ? `

Kettle is up before anyone, satchel strapped to her chest, both hands flat on the quorl's back. "It's *warm*," she says. "Chub said. We didn't believe him." The Moranth in front of her turns its head a little, the way a horse does, and turns back.` : ''}

Then the wings open, all four at once, and the field drops away under you like a stone down a well.`,
    ch:[{t:'Hold on.', go:'b3_c6_q_flight'}]}),
  b3_c6_q_flight:()=>({sp:'The night sky · south', scene:'b3_c6_flight', txt:
`Cold. That is the first thing and the last. Cold that gets in at the wrists and the neck and stays.

Below, the Domin goes by in the dark: a river like a crack in black glass, a town with no lights at all, the line of the Host's road and the small fires of the four thousand on it, getting smaller. Then hills, then mountains, their snow faint in the starlight, and the quorls going between them in a long line, low, so low that once a pine top whips the soles of your boots.${b3In('ohl') ? `

Somewhere behind you Ohl is praying, steadily, to Soliel, in a voice that suggests he is also making notes for a complaint.` : ''}${b3In('tuft') ? `

Tuft is quiet. When you look back at her she is looking south, past the rider's shoulder, as if something there were already looking back.` : ''}${b3In('greysword') ? `

Dannet rides with her shield strapped flat on her back and her eyes shut, and opens them once, over a river, to see if it is the one at Capustan. It isn't.` : ''}${b3In('ellis') ? `

Ellis watches the fires on the road below go back under you, and keeps her bow hand flat on the harness the whole way.` : ''}${b3In('vell') ? `

Vell lets go with one hand to lean out and look straight down. Without turning its head, the Moranth in front of him reaches back and puts the hand back on the strap.` : ''}

Near dawn the rider's hand comes up, flat, and the quorl drops. Ahead, on a ledge under a crag, a small fire that should not be there. Men round it. A Pannion picket, high and lonely, put out to watch the passes and not expecting anything to come down on it out of the sky.

The Moranth looks back at you over its shoulder. It is asking.`,
    ch:[{t:'Kettle\'s sharper, off the harness, into their fire.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c6_landing', {pre:true})},
        {t:'Set us down beyond the crag. We go in on foot.', check:['guile', 14],
          near:{t:()=>S.f.b3_c6_nearSharp ? `Yes, but a sharper works loose from a harness strap as the quorls lift away, and goes down the mountain into the snow, and does not go off, and is not coming back. One sharper gone.` : `Yes, but ${NAME(ROLL().who || 'sgt')} comes round the rock with frozen hands from the flight, and has to watch them to make them close: −1 on the next check.`,
            fx:()=>{ S.f.b3_c6_nearSharp = 0; if (S.inv.sharper > 0) { S.inv.sharper--; S.f.b3_c6_nearSharp = 1; } else { S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; } }},
          edges:id=>[id === 'sohra' && ['she can come down on a herd without it lifting its head', 1], id === 'greysword' && ['Pannion pickets: she has watched them from a wall', 1], id === 'ohl' && ['his knees, on a mountain, in the dark', -1], id === 'ellis' && ['a Claw scout, coming in on a fire', 2], id === 'vell' && ['loose rock in the dark is only a bad roof', 1]],
          go:'b3_c6_q_foot', fail:'b3_c6_q_seen'},
        {t:'Straight down on them.', go:()=>startBattle('b3_c6_landing', {})}]}),
  b3_c6_q_foot:()=>({sp:'The landing ledge', scene:'b3_c6_ledge', txt:
`The quorls put you down in a hollow beyond the crag and lift away without a sound, and the Fourth comes round the rock on the picket's blind side, slowly, one boot at a time, in the grey before the sun.

${by({sohra:`Sohra is first round the rock. She has her bow drawn before anyone at the fire has turned.`, greysword:`Dannet is first round the rock. She points, twice, at the two men who matter, and is already moving.`, vell:`Vell is first round the rock, over the top of it rather than round, and drops onto the ledge behind the fire as if off a Daru parapet.`, ellis:`Ellis is first round the rock, and nobody at the fire hears her go. She holds up the gloved hand: five fingers, then one. Six at the fire.`, _:`{who} is first round the rock, and has picked the one to take before the picket knows there is anyone to pick.`})}`,
    ch:[{t:'Now.', go:()=>startBattle('b3_c6_landing', {surprise:'p'})}]}),
  b3_c6_q_seen:()=>({sp:'The landing ledge', scene:'b3_c6_ledge', txt:
`The quorls put you down in a hollow beyond the crag, and the hollow is full of loose scree, and the scree goes down the mountain with a noise like a cart of crockery overturning.

At the fire, every head comes up.`,
    ch:[{t:'Go.', go:()=>startBattle('b3_c6_landing', {surprise:'e'})}]}),
  b3_c6_q_after_land:()=>({sp:'The landing ledge', scene:'b3_c6_ledge', fx:()=>{ if (!S.f.b3_c6_landDone) { S.f.b3_c6_landDone = 1; ally(0, 1, 'A Seerdomin on the goat track above Coral'); } }, txt:
`The Seerdomin goes down on the goat track in a long clatter of plate, and the grey goes out of the air round him the way frost goes out of a window.

No word of it went down the mountain.

The quorls come back in twos and threes out of the paling sky and settle on the ledge, folding their wings, and the Seventh's marines climb off them stiff and blue and swearing in whispers. The Moranth do not swear. They walk among the dead picket and turn each one over with a boot, and look at the Fourth, and one of them inclines its helm a quarter of an inch.${b3In('kettle') ? ` Kettle goes pink to the ears.` : ''}

Beyond the crag the mountain falls away into cloud, and through a gap in the cloud, very far below, something black on the edge of a grey sea.

Coral.`,
    ch:[{t:'Look round the ledge.', go:()=>startExplore('b3_c6_ledge')}]}),

  /* ---- the ledge ---- */
  b3_c6_roost:()=>({sp:'The quorl roost', fx:()=>{ S.f.b3_c6_roost = 1; }, txt:
`The quorls roost along the back of the ledge under the crag, clinging to the rock with their many legs, wings shivering now and then in the cold. The riders sit among them, not talking, the way the Moranth do not talk: a hand moves, a head tilts, and something has been said.${b3In('kettle') ? `

Kettle squats in front of the nearest rider, the one she flew behind, and holds up her hand: two fingers, a fist, two fingers. The hand-talk the Moranth use for *munitions, here*. She has been practising it on the Fourth since Pale.

The Moranth looks at her. Then it lifts its own hand and makes a sign you have never seen: a flat palm, turned over slowly.

"I don't know that one," Kettle whispers. "Sergeant, I don't *know* that one."` : ''}${b3In('vell') ? `

Vell goes along the roost looking at the harness on every quorl: straps, buckles of chitin, a girth like a saddle's. "Not a knot on any of them," he says, low, scandalised. "Not one. You'd think, with the drop."` : ''}`,
    ch:[{t:'Wait for the rider.', req:()=>!S.f.b3_c6_vamb, go:'b3_c6_roost_gift'},
        {t:'Leave them to the cold.', go:()=>startExplore()}]}),
  b3_c6_roost_gift:()=>({sp:'The quorl roost', fx:()=>{ if (!S.f.b3_c6_vamb) { S.f.b3_c6_vamb = 1; gain('b3_c6_vambrace'); } }, txt:
`The rider gets up, unhurried, and unbuckles the vambrace from its left forearm: overlapping plates of black chitin, worn smooth at the edges, still warm from the arm inside it. It holds the thing out, without a word, the way the Moranth do everything.

${b3In('kettle') ? `Kettle takes it in both hands like a hot loaf.

"It means *thank you*," she says, hoarse. "The palm turned over. I'm nearly sure it means thank you. For the picket." She looks up at the rider. "Doesn't it."

The Moranth looks at her. Then it goes back and sits down among the quorls, and that is all the answer anybody is getting.` : `You take it. The Moranth goes back and sits down among the quorls. Whatever that was, it is finished, and it was not nothing.`}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_ledge_fire:()=>({sp:'A shielded fire', txt:
`A fire in a pit under a slab of rock, with a hide hung across the mouth so not a glimmer shows down the mountain. The Seventh's marines sit round it in rows, knee to knee, steaming. There is a pot on. There is always a pot on.${b3In('ohl') ? ` Ohl goes from man to man with his bag, looking at fingers gone white with cold, and does not use his warren once. "Not here," he says, when somebody asks. "Here it bites back. Rub it. Harder. Swear if you like."` : ''}`,
    ch:[{t:'Sit and get warm.', req:()=>!S.f.b3_c6_qrest, fx:()=>{ S.f.b3_c6_qrest = 1; b3Rest('The Fourth sleeps an hour in a heap by the shielded fire, the way marines sleep anywhere. It is enough. Nearly.'); }, go:'b3_c6_ledge_rested'},
        {t:'"Vell. You\'ve been up the crag."', req:()=>b3In('vell') && !S.f.b3_c6_tVellQ, go:'b3_c6_ledge_vell'},
        {t:'Leave it.', go:()=>startExplore()}]}),
  b3_c6_ledge_vell:()=>({sp:'Vell', fx:()=>{ S.f.b3_c6_tVellQ = 1; }, txt:
`Vell comes in to the fire with frost on his eyebrows and his knuckles skinned and a look on him like a boy who has found the one door in the house that was never locked.

"Up the crag," he says. "Over the roost. There's a crack goes all the way, a hand wide. Put the hook in at the top and you could run a line down to the ledge for anyone." He holds his hands to the fire. "The Moranth watched me the whole way. One of them came up after, on a quorl, and hung there off the rock beside me, just looking." He laughs, under his breath. "Never said a word. They don't. I think it was impressed."

He is quiet a moment, warming.

"From the top you can see the city. And the sea. And the mountains going back the way we came, all of them, with snow on." He shakes his head. "Highest I've ever been without wings under me. Higher than the Spawn ever was." A pause. "I'd like the Guild to know. I'd like to be the one who tells them."`,
    ch:[{t:'"Leave the line up. Someone will need it."', fx:()=>{ S.f.b3_c6_crag = 1; loy('vell', 1); }, go:'b3_c6_ledge_vell2'},
        {t:'"Next time, ask before you go up."', go:'b3_c6_ledge_vell2'}]}),
  b3_c6_ledge_vell2:()=>({sp:'Vell', txt: S.f.b3_c6_crag ?
`He is off before you have finished, back up the crag in the grey light, and by noon there is a tarred line hanging down the rock beside the roost, knotted every arm's length, with a Daru copper on a string tied at the top for luck. Three of the Seventh's marines use it before dark. One of them thanks him. He tells the story of that thank-you for days.` :
`"Ask," he says, trying the word out. "Right." He thinks about it. "You'd have said no. So I didn't ask." He holds his hands back to the fire. "Next time I'll ask, Sergeant. Then I'll go up."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_ledge_rested:()=>({sp:'A shielded fire', txt:`You sleep sitting up, against ${b3In('brisk') ? 'Brisk\'s shield' : 'a pack'} or a rock or somebody's back, and wake with your feet warm for the first time since the field. Someone has put a cup in your hand. You do not find out who.`,
    ch:[{t:'Up.', go:()=>startExplore()}]}),
  b3_c6_ledge_look:()=>({sp:'The cedar screen', txt:
`Cedar boughs have been cut and laced into a screen along the ledge's lip, and moss laid over the boughs, so that from below the ledge is only more mountain. Through a gap in it you can see the whole of the country to the south: ridge after ridge going down, black with cedar, to a plain, and on the edge of the plain, where the land stops and the grey sea begins, a city.

It is too far to see anything but its shape. Walls. A great dark mass in the middle of it, darker than the rest.

${b3In('tuft') ? `Tuft puts her eye to the gap. "There's something under the city," she says at last. "Old. Cold. And something on top of it that isn't." She steps back from the screen. "I don't want to look any more, Sergeant."` : `It is very quiet up here. Nothing moves on the plain at all.`}${b3In('vell') ? `

Vell studies the walls the way he would look at a parapet from the street. "High," he says at last. "Not as high as up here." It is meant to be a comfort.` : ''}`,
    ch:[{t:'Step back from the screen.', go:()=>startExplore()}]}),
  b3_c6_twist:()=>({sp:'Achievant Twist · the Black Moranth', fx:()=>{ S.f.b3_c6_twist = 1; }, txt:
`The Moranth commander stands among the roosting quorls with one arm held stiffly across his chest. His armour is the same black chitin as the others', but a Malazan cloak is thrown over it, and you know who he is before the riders' heads all turn to him: Twist, Achievant of the Black Moranth, who has flown Dujek's Host out of the Domin a company at a time for a week of nights.

He speaks Malazan, slowly, with a click in it. "Fourth Squad. The Seventh." The visor turns toward the dead picket. "That was well. Nobody went down."

Up close he smells wrong, under the resin: sweet, the way a wound smells when it has been bound too long.${b3In('ohl') ? `

Ohl smells it too. You watch him decide whether to say anything, and decide.` : ''}

"Tonight we go back for more of your people," Twist says. "Tomorrow night, more. And at dusk now, there are birds." He does not say what kind. "They follow us home."`,
    ch:[{t:'Ohl: "That arm wants looking at, Achievant."', req:()=>b3In('ohl') && !S.f.b3_c6_twistArm, fx:()=>{ S.f.b3_c6_twistArm = 1; }, go:'b3_c6_twist_arm'},
        {t:'"Birds?"', go:'b3_c6_twist_birds'},
        {t:'Salute, and leave him to his riders.', go:()=>startExplore()}]}),
  b3_c6_twist_arm:()=>({sp:'Achievant Twist', txt:
`Twist is still for a moment. Then he turns the visor on Ohl.

"An old wound. It was given to me a long time ago, by people who are dead now." The click again. "Your healers' warrens are sick in this country, Ehrlii. Your own hands know it. I have watched your hands." He inclines his helm, very slightly. "I thank you. No."

Ohl opens his mouth, and closes it, and nods.${b3In('ohl') ? ` Afterwards, at the fire, he is an hour over his cup before he says to it: "He knows." Nothing else.` : ''}`,
    ch:[{t:'"Birds, Achievant?"', go:'b3_c6_twist_birds'},
        {t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_twist_birds:()=>({sp:'Achievant Twist', txt:
`"Condors." The word sounds strange in his mouth, as if he had learned it this week. "The carrion birds of these mountains. Big. Bigger than they should be. Something rides them now. It came up out of the city a few days ago." The visor tilts toward Coral. "They come at dusk, when the quorls come home, and they come for the quorls. Quorls do not fight well on the ground. Neither do my riders."

He looks at the Fourth, and at the dead picket, and back.

"Your people fight well on the ground."`,
    ch:[{t:'"We\'ll be at the roost at dusk, Achievant."', go:()=>startExplore()}]}),
  b3_c6_twist_again:()=>({sp:'Achievant Twist', txt: S.f.b3_c6_condorsDone ? `Twist is among the quorls, counting them with small movements of his good hand. He stops when he sees you and inclines his helm, the quarter-inch the Moranth give. "The birds will come again," he says. "So will you."` : `Twist is among the quorls. He does not turn. "At dusk," he says.`,
    ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_ledge_down:()=>({sp:'The trench mouth', txt:
`A cleft in the rock at the back of the ledge, with a ladder of cedar poles going down into the dark and the smell of a great many people coming up out of it.${S.f.b3_c6_twist ? '' : `

A Moranth at the top puts out an arm across the cleft, and points at the roost: the Achievant first.`}`,
    ch:[{t:'Down to the entrenchments.', req:()=>!!S.f.b3_c6_twist, onward:true, go:'b3_c6_q_trench_in'},
        {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c6_q_trench_in:()=>({sp:'The entrenchments', scene:'b3_c6_entrench', txt:
`The ladder goes down a long way, and comes out under cedar.

The entrenchments go along the mountainside as far as you can see in both directions: trenches cut into the slope and roofed with cedar boughs and moss, tunnel mouths hidden under fallen trees, cook-fires sunk in pits, latrines that somebody really has dug. Six thousand people, more coming every night, all of them being quiet. The Host is here. The half of it that went.

From below, the mountain must look like a mountain.

Down the slope, beyond the last screen, there are other trenches, further forward, closer to the city than seems sensible. "Bridgeburners," says a passing corporal of the Seventh, when you look. "Took those off the Pannion before any of us came. Don't go down there. They don't like visitors and they bite."`,
    ch:[{t:'Find the Seventh\'s stretch.', go:()=>startExplore('b3_c6_trench')}]}),

  /* ---- the entrenchments ---- */
  b3_c6_trench_look:()=>({sp:'The forward screen', fx:()=>{ if (!S.f.b3_c6_coral) { S.f.b3_c6_coral = 1; ally(0, 1, 'Coral, close enough to count the gates'); } }, txt:
`From the forward screen Coral is close enough to see properly, and you wish it were not.

A city of black stone on the edge of the sea, walled, its streets going up in steps to a great dark keep in the middle. Nothing on the walls that you can see. No smoke from the chimneys. On the plain before the gates the grass has been burned off in a wide ring, and in the ring, very small at this distance, things are moving: lines of men drilling, a long way off, and among them, now and then, something taller than men that moves the wrong way.

${b3In('greysword') ? `Dannet looks once and turns away. "I have seen those," she says, quite steady. "At Capustan. They do not tire." She does not look again.` : `The Fourth does not put a name to the taller things.`}${b3In('ellis') ? `

Ellis counts the gates, and the roads out of them, and the ring of burned ground, and says the numbers to you once, low, so that one of you will remember them. "Every road out of a city tells you who's left it," she says. "No one's left this one in a while."` : ''}`,
    ch:[{t:'Step back from the screen.', go:()=>startExplore()}]}),
  b3_c6_trench_fire:()=>({sp:'The Seventh\'s fire-pit', html:allyHTML('The entrenchments above Coral'), txt:
`The Seventh's fire-pit, under a roof of boughs, with the smoke led off along a trench so it comes out a hundred paces away among the cedars. The company's sergeants sit round it and talk about home, and about the Alliance, which is a long way behind and does not know where they are.

"Brood'll be spitting," one of them says. "When he finds out."

"Brood'll be at the Maurik when he finds out," says another. "Whiskeyjack'll tell him. Rather him than me."

${b3Mind() === 'haunted' ? `It gets no laugh. The Domin has got into all of them, as it has into the Fourth.` : `One of them laughs, and it does everybody good.`}`,
    ch:[{t:'Rest a while.', req:()=>!S.f.b3_c6_trest, fx:()=>{ S.f.b3_c6_trest = 1; b3Rest('The Fourth sleeps through the afternoon in a trench under cedar, which smells better than anything has smelled since Capustan.'); }, go:'b3_c6_trench_rested'},
        {t:'"Ellis. You\'ve been at the screen all day."', req:()=>b3In('ellis') && !S.f.b3_c6_tEllisQ, fx:()=>{ S.f.b3_c6_tEllisQ = 1; }, go:'b3_c6_trench_ellis'},
        {t:'Leave it.', go:()=>startExplore()}]}),
  b3_c6_trench_ellis:()=>({sp:'Ellis', txt:
`Ellis has spent the day at the forward screen with her cheek against the moss, and comes back to the fire-pit with the pattern of the boughs pressed into it.

"The plain round the city," she says, sitting. "They've burned it off in a ring, so nothing can come up on the walls unseen. Someone there thinks like a scout." She does not sound pleased about it. "Six roads out. I watched every one of them, all day. Nothing on any of them going out. Carts going in, from the south, slow." She turns the gloved hand over. "Full ones."

She watches the fire for a while.

"From up here you can see a long way," she says. "Further than I've seen since the plain. I kept thinking I'd see a rider." She doesn't say which rider. "You can't, from this far. I know that. I looked anyway." A breath. "I'd like it noted that it's a good place to look from."`,
    ch:[{t:'"Noted. Look again tomorrow."', fx:()=>{ loy('ellis', 1); }, go:()=>startExplore()},
        {t:'"Get some sleep, Ellis."', go:()=>startExplore()}]}),
  b3_c6_trench_rested:()=>({sp:'The Seventh\'s fire-pit', txt:`You sleep. When you wake the light through the boughs has gone long and gold, and the quorls on the roost have started shifting their wings, and the Moranth are standing up.`,
    ch:[{t:'Up.', go:()=>startExplore()}]}),
  b3_c6_trench_roost:()=>({sp:'The roost', txt:
`The quorls that stay by day roost in a long gully above the trenches, under nets of cedar, and the riders sleep beside them, or do something that looks like sleep. A few are hurt: a torn wing being stitched with gut by a Moranth with a curved needle, a rider whose chitin has been opened along the back by something with a hook.${b3In('kettle') ? `

Kettle bends close over the stitching. "Talons," she says. "That's talons, Sergeant. Big ones." For once she does not sound pleased to know something.` : ''}`,
    ch:[{t:'Leave them.', go:()=>startExplore()}]}),
  b3_c6_heavy:()=>({sp:'A Moranth heavy', fx:()=>{ S.f.b3_c6_heavy = 1; }, txt:
`A Black Moranth heavy infantryman stands sentry at the end of the roost trench, taller than the riders and much broader, in chitin plates a hand thick, with a long two-handed blade grounded in front of him. He does not move when you come up. He does not move when you stop. You are not sure he has noticed you at all until the helm turns, a little, toward the darkening sky in the east.

He lifts one hand and makes a sign: fingers spread, then closed, then dragged down, like a claw. Then he points at the roost trench, and at the Fourth, and at the ground under his feet.

*Here. You. When they come.*`,
    ch:[{t:'Nod.', go:()=>startExplore()}]}),
  b3_c6_dujek:()=>({sp:'Dujek Onearm · High Fist', fx:()=>{ S.f.b3_c6_dujek = 1; }, txt:
`Dujek Onearm is walking the trenches with a staff officer trotting behind him, the empty sleeve pinned across his chest, stopping every twenty paces to look at a firing step or a latrine or a man's boots. He stops in front of the Fourth.${b3In('greysword') ? ` His eye goes to the wolf painted over the boar on Dannet's shield, and stays there a moment. "Capustan," he says. That's all, and she stands straighter for it.` : ''}

"The Seventh's marines. The ones from the lift field." He looks you over. "Whiskeyjack sent word you made it quiet. Good." A pause. "How was he?"

You tell him. *Tell him I'm walking.*

Dujek is silent a moment. "Walking," he says. "That's him." He looks north, at the mountain, as if he could see through it to the road. "Four thousand. Half of them cooks." Something moves in his face and is put away. "He'll be at Coral. He's always where he said."`,
    ch:[{t:'"Sir. Why isn\'t Brood to know?"', req:()=>!S.f.b3_c6_why, fx:()=>{ S.f.b3_c6_why = 1; }, go:'b3_c6_dujek_why'},
        {t:'Salute.', go:()=>startExplore()}]}),
  b3_c6_dujek_why:()=>({sp:'Dujek Onearm', txt:
`Dujek gives you a long look, the one he gives to junior officers who ask good questions at bad times.

"Because the Seer has eyes in every camp in this country, Sergeant, and Brood's is a big camp." He scratches his jaw. "And because I'm an old man who's been lied to by allies before, and I've learned to keep a knife where my friends can't see it. Doesn't mean I mean to use it on them." He grunts. "Brood'll understand. Or he won't. Whiskeyjack'll stand there either way."

He moves on before you can salute.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_dujek_again:()=>({sp:'Dujek Onearm', txt:`Dujek is further down the trench, looking at somebody's boots. He lifts his one hand to you without turning round.`,
    ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_tav2:()=>({sp:'Tav · Fourth Regiment, the Second', fx:()=>{ S.f.b3_c6_tav2 = 1; }, txt: c6BriskGone() ?
`Tav finds you in the trench, the big Cawn man, with his helmet under his arm and frost still in his eyebrows from the night.

"Sergeant." He looks at the Fourth, counting it the way his sister would have. "You came too." He nods, slowly. "She'd have come. She'd have hated it. The flying." He almost smiles. "Thank you for telling me. That night. I thought about it all the way up."

He goes back to his company. You find you are glad, for no good reason, that he is on this mountain and not on that road.` :
`The Fourth Regiment is dug in along the upper trench, and Tav is sitting on the firing step with his boots off, rubbing his feet, singing under his breath, very badly.

Brisk stands at the end of the trench and looks at him.

He looks up. The singing stops.

"Bris," he says. "You flew."

"You first."

He laughs, out loud, and fifty heavy infantry turn to shush him, and he puts his hand over his mouth and laughs behind it, and Brisk sits down on the step beside him, armour and shield and all, and the step complains. They do not say anything else. They sit there, shoulder to shoulder, looking at the cedar boughs, for as long as you can spare her.

${c6Shut() ? `When she comes back she is turning something over in her fingers: the sealed letter, out of her gorget. She puts it back without opening it. "When he's dead," she says, to nobody. "Long wait."` : `When she comes back, she says: "Four coppers. Still won't pay." She sounds happier than you have heard her since Capustan.`}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_stand:()=>({sp:'The roost trench · dusk', txt: S.f.b3_c6_condorsDone ? `The roost trench is quiet. Feathers lie in the bottom of it, black, as long as your arm.` :
`Dusk. The sun is going down behind the mountain, and the slope is in shadow, and out over the plain the light is copper and long.

From the north, low, the first quorls of the night are coming home, a long ragged line, their riders bent forward. And behind them, higher, coming down the sky after them, stooping, there are other shapes. Bigger. Slower-winged. Five, six, more.

The Moranth heavy at the end of the trench draws his blade.${b3Dread() >= 6 ? `

A marine in the Seventh starts to pray. Another tells him to shut up, and then, after a moment, starts praying too.` : ''}`,
    ch: S.f.b3_c6_condorsDone ? [{t:'Sleep in the trench.', onward:true, go:()=>chapterEnd(6, 'quorl')}, {t:'Not yet.', go:()=>startExplore()}] : [
        {t:'Stand to at the roost.', onward:true, go:'b3_c6_q_condor_pre'},
        {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c6_q_condor_pre:()=>({sp:'The roost · dusk', txt:
`The quorls come in over the screen in a rush of wings and drop onto the roost, and the riders roll off them and run, and the first of the big shapes comes down out of the copper sky with its wings half folded and lands on a quorl, and the quorl screams.

It is a carrion bird. It is a carrion bird the size of a small cart, bare-headed, ruffed, with a hooked beak like an ivory pick. Its eyes are wrong.

${b3In('sohra') ? `"Not a spirit," Sohra says, very fast. "Not a spirit. Do not look at its eyes, ${S.f.b3_herdMother ? 'herd-mother' : 'Sergeant'}."` : `Do not look at its eyes.`}`,
    ch:[{t:'Kettle\'s sharper, under the first of them.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c6_condors', {pre:true})},
        {t:'Smother the fires. Make them come down to the quorls in the dark.', check:['wits', 14],
          near:{t:()=>`Yes, but the last fire is the slowest, and ${NAME(ROLL().who || 'sgt')} is still kicking earth over it when the first bird turns its head and looks straight down into the trench. Everyone saw those eyes, and everyone will see them again tonight: ${c6DreadTxt()}.`, fx:()=>{ c6Dread(1); }},
          edges:id=>[id === 'kettle' && ['she knows what a quorl does when it is frightened', 1], id === 'sohra' && ['herds and hawks: she has done this on the plain', 2], id === 'tuft' && ['something in those eyes is looking for her', -1]],
          go:'b3_c6_q_condor_dark', fail:'b3_c6_q_condor_bad'},
        {t:'Into them.', go:()=>startBattle('b3_c6_condors', {})}]}),
  b3_c6_q_condor_dark:()=>({sp:'The roost · dusk', txt:
`${by({sohra:`Sohra is already kicking earth over the roost fires, shouting in Rhivi at the Moranth, who do not understand a word and understand her perfectly.`, _:`{who} has the roost fires out in three breaths, and the Moranth, who understand at once, pull the quorls down flat under their nets.`})}

The birds come down into a dark trench full of nets and cedar and marines who were waiting for them.`,
    ch:[{t:'Now.', go:()=>startBattle('b3_c6_condors', {surprise:'p'})}]}),
  b3_c6_q_condor_bad:()=>({sp:'The roost · dusk', txt:
`A fire goes out. Another flares up instead as somebody kicks dry boughs into it, and the roost is lit like a stage, and every bird in the sky turns its head toward it at once.`,
    ch:[{t:'Hold.', go:()=>startBattle('b3_c6_condors', {surprise:'e'})}]}),
  b3_c6_q_after_condors:()=>({sp:'The roost · night', scene:'b3_c7_coral', fx:()=>{ if (!S.f.b3_c6_condorsDone) { S.f.b3_c6_condorsDone = 1; S.f.b3_c6_moranthCame = b3Trust() >= 8 ? 1 : 0; ally(0, 1, 'Something rode those birds'); if (!S.f.b3_c6_feath) { S.f.b3_c6_feath = 1; gain('b3_c6_feather'); } } }, txt:
`The ridden one goes off the crag at last, not falling, flying, badly, one wing dragging, out over the screen and down toward Coral in the dark. Whatever was in it does not come back to look.

The roost is full of feathers. Two quorls are dead. One rider. The Moranth lay the rider out on the rock and stand round him, and say nothing, the way they say everything.${S.f.b3_c6_moranthCame ? `

The ones who fought beside the Fourth come over afterwards, one by one, and each inclines its helm the quarter-inch, and goes.` : ''}

In the bottom of the trench there is a single long flight feather, black, ragged at the barbs, ivory at the quill. When you pick it up it is cold, colder than the night, and as you hold it, it lifts a little, in a wind that is not there, toward the south.${b3In('tuft') ? `

"Keep it," Tuft says, from behind you. "Don't ask me why. It doesn't like them either." She does not explain what *them* is.` : ''}

Tomorrow the quorls go back for more of the Host. The night after, more. Then, somebody says, Coral.`,
    ch:[{t:'Sleep in the trench.', onward:true, go:()=>chapterEnd(6, 'quorl')},
        {t:'Not yet.', go:()=>startExplore('b3_c6_trench')}]}),
});

/* ---------------- the river road: four thousand making the dust of ten, the barges, the raid, the river, Maurik ---------------- */
Object.assign(B3CH6.dlg, {
  b3_c6_m_march:()=>({sp:'The road south · Whiskeyjack\'s column', scene:'b3_c6_road', html:allyHTML('The road to the Maurik · four thousand'), txt:
`The Host that marches south out of that camp is less than half the Host that marched into it, and it marches exactly the same way.

Every squad draws a second ration of firewood and lights three fires at night instead of one. The wagons drag cut brush behind them on chains to raise the dust of a column three times as long. Companies of cooks and farriers and carpenters march in the files of the companies that went, under their standards, with their spears. The Seventh's standard goes by in the hands of a quartermaster's clerk who has never held one in his life and holds it as if it might go off.${b3In('ellis') ? `

Ellis lights the Fourth's three fires every night and then walks out past the pickets to look back at the column's. "From the hills it's eleven thousand," she says. "I'd round down."` : ''}${b3In('kettle') ? `

Kettle walks with her eyes on the sky every night until the wingbeats stop. On the fourth night they do not come at all. "That's everybody, then," she says. "Everybody who's going." She does not look at the sky after that.` : ''}

The Rhivi outriders come closer to the column every day, and look along it, and say nothing, and ride back to Brood's army, which is a day behind and taking its time.

Whiskeyjack rides at the head of it. On the fifth day he stops riding, and walks, and leans on a spear, and the column pretends not to notice that either.`,
    ch:[{t:'On, to the river.', go:'b3_c6_m_march2'}]}),
  b3_c6_m_march2:()=>({sp:'The Maurik · below the ford', scene:'b3_c6_barges', txt:
`The Maurik is wide and brown and slow, going south between banks of reed toward a sea you cannot see. There is a ford, a long pale shallows where the old road crosses, and a league below the ford, where the bank shelves and the cedars come down to the water, Whiskeyjack halts the column and says: here.

By nightfall there are slips cut in the bank and the first keels laid on them. The wrights, all eleven of them, go up and down the bank shouting. Everyone else carries timber.${b3In('vell') ? ` Vell is up on the ribs with the wrights inside the hour, because a barge on a slip is mostly rope and height, and nobody can get him down.` : ''}

The White Face Barghast came down to the river two days ago from wherever the White Face go, a great many of them, painted, loud, and are camped on the high ground above the slips, singing, and coming down in the afternoons to help carry logs, by which they mean to carry more logs than the Malazans.${S.f.b3_treach ? `

Gruntle's people, Trake's Legion, are camped upriver by the ford. You see Gruntle himself once, sitting on a cask at the water's edge with his striped forearms on his knees, watching the river as if it owed him money.` : `

Upriver, by the ford, a company of Capan soldiers with tiger stripes painted on their arms keeps itself to itself.`}`,
    ch:[{t:'Find the Fourth\'s stretch of the bank.', go:()=>startExplore('b3_c6_bank')}]}),

  /* ---- the bank ---- */
  b3_c6_wj_leg:()=>({sp:'Whiskeyjack', fx:()=>{ S.f.b3_c6_wjLeg = 1; S.f.b3_legSeen = 1; }, txt:
`Whiskeyjack is sitting on a log by the slips with his bad leg stretched out in front of him on another log, which is the nearest anyone has seen him come to lying down. He is reading a wright's tally slate. He has his knife out and is cutting at a boot lace that has been tied too tight over the swelling.

Close to, you can see it properly. The leg is wrapped from knee to ankle, and the wrapping is not clean, and the boot over it has been slit and laced shut again with cord. He sits with it out straight in front of him, and does not move it unless he has to.

He sees you looking. He does not cover it.

"Sergeant." He sets the slate down. "Barges in four days, the wrights say. I've told them three."`,
    ch:[{t:'"Mallet said a week flat on your back, sir."', req:()=>!S.f.b3_c6_mallet, fx:()=>{ S.f.b3_c6_mallet = 1; }, go:'b3_c6_wj_mallet'},
        {t:'Ohl: "I could look at it, sir."', req:()=>b3In('ohl') && !S.f.b3_c6_ohlWeek, fx:()=>{ S.f.b3_c6_ohlWeek = 1; if (b3In('ohl')) loy('ohl', 1); }, go:'b3_c6_wj_ohl'},
        {t:'Leave him to his slate.', go:()=>startExplore()}]}),
  b3_c6_wj_mallet:()=>({sp:'Whiskeyjack', txt:
`"Mallet says a lot of things." He goes back to the lace. "Mallet's in the mountains with Paran, digging holes for the Seer to fall into. When I see him at Coral, I'll lie down for a week, and he can stand over me and say he told me so, and I'll let him." He gets the lace loose at last, and breathes out through his nose. "After Coral."

He looks at you.

"I know what it looks like, Sergeant. I've got a leg too. Somebody has to walk in front of four thousand people pretending to be ten, and the Seer's watching, and the Seer doesn't care about my leg." A dry almost-smile. "Neither should you."

You find that you do, and that he knows it, and that neither of you is going to say so again.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_wj_ohl:()=>({sp:'Whiskeyjack', txt:
`Ohl kneels by the log without being asked and puts his hand flat on the wrapping, not unwinding it, just feeling the heat come through.

He is quiet a long time.

"A week," he says at last. "Flat. No riding, no walking, no standing at the front of anything. Not my warren, sir; not here; here it would bite us both. Rest. That's all it wants. A week of it." He takes his hand away. "I'm sorry. That's the whole of my craft, sometimes."

Whiskeyjack looks at him with something that might be fondness.

"After Coral," he says. "You can have your week after Coral, Ehrlii. You and Mallet can fight over who gets to say it."

Ohl gets up, slowly, without a word, and you know from the set of his shoulders that he has added a name to a list he keeps somewhere that is not the one he reads aloud.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_wj_again:()=>({sp:'Whiskeyjack', txt: S.f.b3_c6_raidDone ? `Whiskeyjack is on his feet at the water's edge, watching the barges go in, one hand on a spear he is pretending not to lean on. "They float," he says. "Good."` : `Whiskeyjack is still on his log. "Three days," he says, to the slate.`,
    ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_oskan:()=>({sp:'Oskan · a wright', fx:()=>{ S.f.b3_c6_oskan = 1; }, txt:
`Oskan the wright is up on the ribs of the nearest barge with an adze, shaping a knee of cedar by eye, and he does not stop when he sees you.

"Told you," he says. "A river." The adze comes down. "Flat-bottomed. Shallow draught. Cedar, because there's nothing else, and green, because there's no time. They'll leak like a Rhivi tent and they'll float a day downriver to Maurik with the whole of this lot on them, and that's all they have to do. Then the river can have them."

He jerks his chin at the reeds on the far bank. "Something's been watching us from over there since the first keel. Pannion. Garrison that never got the word to go home, maybe. Living in the reeds like eels." The adze comes down. "If I were them, I'd come for the slips at night with fire. Green wood doesn't burn well. Pitch does."`,
    ch:[{t:'"Show us the knot, Oskan."', check:['wits', 16], trick:'b3_c6_knot', req:()=>!(S.tricks && S.tricks.b3_c6_knot) && !S.f.b3_c6_knotTried3, fx:()=>{ S.f.b3_c6_knotTried3 = 1; },
          edges:id=>[id === 'brisk' && ['she grew up on the Cawn docks', 2], id === 'sohra' && ['a herd-rider\'s rope hand', 1], id === 'kettle' && ['quick fingers, and patience with fuses', 1], id === 'tuft' && ['she has never thrown anything heavier than a card', -1], id === 'vell' && ['rope is his trade', 2]],
          go:'b3_c6_oskan0_knot', fail:'b3_c6_oskan0_miss'},
        {t:'Leave him to his adze.', go:()=>startExplore()}]}),
  b3_c6_oskan_again:()=>({sp:'Oskan', txt: S.f.b3_c6_raidDone ? `Oskan is in the water to his waist, caulking a seam by feel, swearing at the river in Cawn. He waves the caulking iron at you.` : `The adze comes down. "Pitch," Oskan says. "At night. Mark me."`,
    ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_barghast:()=>({sp:'A White Face warrior', txt:
`A White Face Barghast warrior, a head taller than ${b3In('brisk') ? 'Brisk' : 'anyone in the Fourth'}, his face painted chalk-white with black round the eyes so that he looks like a skull that has been told a joke, is carrying a cedar log on one shoulder that two Malazan carpenters had been trying to roll. He sets it down by the slips, and looks at the Fourth, and grins.

"Malazans," he says, in fair trade-tongue. "You carry one log between two, and you sweat. We carry two logs to one man, and we sing." He points at the log pile. "Humbrall Taur says the Malazans are our friends now. I say show me."${b3In('greysword') ? `

Dannet looks at the log, and at him. "On Capustan's walls," she says, "we carried the dead up the steps two at a time, and did not sing." The Barghast considers this. "Then you will like it better," he says, "with singing."` : ''}`,
    ch:[{t:'"Show you." A log each, and a race to the slips.', check:['might', 14],
          near:{t:()=>`Yes, but ${NAME(ROLL().who || 'sgt')} wins it by half a stride and pays for the half with a back that clicks every time it bends, and the night watch on the slips is coming: ${bruiseN()} health down at the start of the next fight.`, fx:()=>bruise(ROLL().who || 'sgt', bruiseN())},
          edges:id=>[id === 'brisk' && ['heavy infantry: this is what she is for', 2], id === 'greysword' && ['she has carried a shield wall up Capustan\'s steps', 1], id === 'tuft' && ['a cadre mage and a cedar log', -2], id === 'kettle' && ['she is half his size', -1]],
          go:'b3_c6_barghast_win', fail:'b3_c6_barghast_lose'},
        {t:'"We carry with our heads, friend." Leave him to it.', go:()=>startExplore()}]}),
  b3_c6_barghast_win:()=>({sp:'A White Face warrior', fx:()=>{ if (!S.f.b3_c6_logs) { S.f.b3_c6_logs = 'won'; ally(1, 0, 'A log race with the White Face'); } }, txt:
`${by({brisk:`Brisk picks up the log he points at as if it had personally offended her, and carries it to the slips at a walk, and sets it down, and comes back for another, while the Barghast is still getting his second one balanced.`, _:`{who} picks up the log, staggers once, and goes, and gets it to the slips a long breath ahead of the Barghast, who is laughing too hard to carry properly.`})}

The White Face on the high ground roar. The Barghast warrior drops his log and pounds ${by({sgt:'you', _:'{who}'})} on the back hard enough to loosen teeth.

"Friends," he says, delighted. "Humbrall Taur is right. I will tell him. He will not believe it either."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_barghast_lose:()=>({sp:'A White Face warrior', fx:()=>{ if (!S.f.b3_c6_logs) { S.f.b3_c6_logs = 'lost'; ally(1, 0, 'A log race with the White Face, lost with good grace'); } }, txt:
`The Barghast gets both his logs to the slips and sits on them and watches ${by({sgt:'you', _:'{who}'})} arrive with one, and sings a short song about it, which the White Face on the high ground take up at once.

But he gets up and helps with the last of it, and claps ${by({sgt:'you', _:'{who}'})} on the shoulder, and says: "You did not put it down. A Malazan who does not put it down." He seems to think this is worth something. So, from the singing, do the rest of them.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_barghast_again:()=>({sp:'A White Face warrior', txt:`The White Face warrior is carrying two logs. He lifts one end of one of them at you in greeting, which nearly kills a carpenter.`,
    ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_bearer:()=>({sp:'The standard bearer', fx:()=>{ S.f.b3_c6_bearer = 1; }, txt:
`The High Fist's standard came south with the column, though the High Fist did not, and the standard bearer came with it: the same unremarkable man, neither young nor old, sitting on a coil of rope by the slips with the standard's pole across his knees, rubbing oil into the wood with a rag.

He is watching the river. Not the barges, not the Barghast. The water.${b3In('tuft') ? `

Tuft walks past him with an armful of rope, and stops dead, and the rope goes everywhere.

He looks up. Politely. Then he goes back to what he was doing.

Tuft picks up the rope, every coil of it, without looking at him once, and goes, and when you find her later on the far side of the slips she is sitting with her back to a log and her arms round her knees. "Every time," she says. "Every single time, Sergeant. And I *can't*—" She stops. "Never mind. Never mind it."` : `

When he sees you looking, he nods, pleasantly, and goes back to the oil.`}`,
    ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_logs:()=>({sp:'The timber', txt:
`Cedar logs in great untidy heaps, bark still on, sap still running, smelling of a temple\'s incense. The Barghast bring them down from the slope; the Malazans square them; the wrights shout. ${S.f.b3_c6_raidDone ? 'The heaps are much smaller now.' : 'There will be enough. Probably.'}`,
    ch:[{t:'Leave it.', go:()=>startExplore()}]}),
  b3_c6_ford:()=>({sp:'The ford', txt:
`Upriver, the old ford: a long pale shallows where the Domin's road goes into the water and comes out again on the far side, worn deep by carts that do not run any more. The shallows are empty now. Brood's army will come down to it in a day or two, and find the Malazans gone downriver ahead of them, and wonder.

${c6Told() === 'later' ? `You told somebody you would answer them at the Maurik. Here it is.` : `The water goes by, brown, slow, going south.`}`,
    ch:[{t:'Leave it.', go:()=>startExplore()}]}),
  b3_c6_bank_fire:()=> c6Told() === 'later' && !S.f.b3_c6_riverAsk ? DLG.b3_c6_river_ask() : ({sp:'The Fourth\'s fire', txt:
`The Fourth's fire, on the bank above the slips, built big, because the order on this road is big fires, three to a squad. You sit by one of them. The other two burn for nobody, very convincingly.${b3In('kettle') ? ` Kettle counts the satchel by feel. "${c6Count()}," she says.` : ''}${b3Waiting('greysword') ? ` Dannet is with the Grey Swords' few who came on the road, further up the bank, if the Fourth wants her.` : ''}${b3Waiting('sohra') ? ` Sohra is with the Rhivi riders who stayed by the column, if the Fourth wants her.` : ''}`,
    ch:[{t:'Rest a while.', req:()=>!S.f.b3_c6_mrest, fx:()=>{ S.f.b3_c6_mrest = 1; b3Rest('The Fourth sleeps by a fire meant for three squads, warm for once all the way through.'); }, go:'b3_c6_bank_rested'},
        {t:'Send for Dannet.', req:()=>b3Waiting('greysword'), fx:()=>{ b3SwapIn('greysword'); }, go:'b3_c6_swap'},
        {t:'Send for Sohra.', req:()=>b3Waiting('sohra'), fx:()=>{ b3SwapIn('sohra'); }, go:'b3_c6_swap'},
        {t:'"Ellis. You went over the river."', req:()=>b3In('ellis') && !S.f.b3_c6_tEllisM, fx:()=>{ S.f.b3_c6_tEllisM = 1; }, go:'b3_c6_bank_ellis'},
        {t:'Leave it.', go:()=>startExplore()}]}),
  b3_c6_bank_ellis:()=>({sp:'Ellis', txt:
`Ellis swam the river at dusk with her bow in an oilskin on her head, and is drying out by the second fire, the one that burns for nobody.

"There's people living in the far reeds," she says. "Not many. Twenty, thirty. Bare feet and sandals, no boots. They come down to the water at night to look at the slips, and go back before light." She holds the gloved hand to the fire, carefully, as she always does, as if it might remember something. "They've left a path a child could follow. They don't think anyone will come looking. It's been a long while since anyone did."

She wrings out the end of her braid.

"I could have gone in after them. Alone, quiet, the old way." She looks at you sidelong. "The Claw would have sent me. I'm asking you instead. That's new."`,
    ch:[{t:'"Not alone. If we go, the Fourth goes."', fx:()=>{ S.f.b3_c6_ellisReeds = 1; loy('ellis', 1); }, go:'b3_c6_bank_ellis2'},
        {t:'"Let them come to us. Tell Oskan."', fx:()=>{ S.f.b3_c6_ellisReeds = 2; }, go:'b3_c6_bank_ellis2'}]}),
  b3_c6_bank_ellis2:()=>({sp:'Ellis', txt: S.f.b3_c6_ellisReeds === 1 ?
`"The Fourth goes," she repeats. She nods, slowly, as if fitting it into the place where something else used to be. "Six years, the Claw never once said that to me." She picks up the bow. "I'd have thought it was sentimental. I'd have been wrong."

She goes to sleep with her back to the river and the path in the reeds fixed in her head, ready for whenever it is wanted.` :
`"Oskan already knows," she says. "Oskan said *pitch*, three times, and then a word in Cawn I won't repeat." She settles by the fire. "They'll come to us. People who leave a path like that always do, in the end."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_bank_rested:()=>({sp:'The Fourth\'s fire', txt:`You sleep to the sound of adzes, which the wrights do not stop for anything, and wake to the sound of the White Face singing, which nobody can stop either.`,
    ch:[{t:'Up.', go:()=>startExplore()}]}),
  b3_c6_river_ask:()=>({sp:b3In('sohra') ? 'Sohra' : 'A Rhivi rider', fx:()=>{ S.f.b3_c6_riverAsk = 1; }, txt: b3In('sohra') ?
`Sohra is sitting at the fire with her bow across her knees, on the side the smoke goes.

"This is the Maurik," she says. "You said."` :
`A young Rhivi rider with the pale spirit-mark across his eyes is sitting his horse at the edge of the firelight, where the pickets have decided not to see him. It is the same one.

"This is the river," he says. "You said I could ask at the river. I ask."`,
    ch:[{t:'Tell the truth now. Half the Host went south by quorl, with Dujek.', fx:()=>{ S.f.b3_c6_ask = 'truth'; ally(1, 0, 'The truth, at the river, as promised'); if (b3In('sohra')) { loy('sohra', 1); S.f.b3_herdMother = 1; } }, go:'b3_c6_river_truth'},
        {t:'"Ask Whiskeyjack. At Maurik."', fx:()=>{ S.f.b3_c6_ask = 'lie'; if (b3In('sohra')) loy('sohra', -1); }, go:'b3_c6_river_dodge'}]}),
  b3_c6_river_truth:()=>({sp:b3In('sohra') ? 'Sohra' : 'A Rhivi rider', txt: b3In('sohra') ?
`You tell her. She listens with her eyes on the river.

"I knew," she says. "Since the field. I wanted to hear you say it." She lays the bow down. "When Brood's people find out, and they will, at Maurik, I will be standing behind you. That is where the Mhybe's people will see me." A pause. "Herd-mother."` :
`You tell him. He listens, and nods with the chin, and looks at the river a while.

"I knew," he says. "The grass told me. I wanted a Malazan to tell me." He turns his horse. "At Maurik, they will shout. I will say: one of them kept their word about a river."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_river_dodge:()=>({sp:b3In('sohra') ? 'Sohra' : 'A Rhivi rider', txt: b3In('sohra') ?
`Sohra looks at you.

"At Maurik," she says. "Then it was not the river, after all." She picks up the bow and goes to sit on the other side of the fire, where the smoke does not go, which on Sohra is a slammed door.` :
`The rider looks at you, and at the river, and back.

"The river was your word," he says. "Not mine." He turns his horse and goes, and does not come back.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),

  /* ---- the barges, and the raid ---- */
  b3_c6_barges:()=>({sp:'The barges', txt: S.f.b3_c6_raidDone ?
`The barges are in the water, all of them, riding low and leaking gently, tied off to stakes along the bank. The White Face are already on the first three, painted for war, arguing about where to sit. Whiskeyjack is on the bank with a spear for a stick, waiting for the last of the Host to stop pretending it is not ready.` :
`Six barges on their slips, ribbed and half planked, smelling of green cedar and hot pitch. Oskan says three days. Whiskeyjack says two.

At dusk the wrights call for every pair of hands that can hold a mallet: they mean to work through the night by torchlight, and the Fourth is told off to guard the slips while they do.${S.f.b3_c6_oskan ? ` Oskan, going past, says one word: "Pitch."` : ''}`,
    ch: S.f.b3_c6_raidDone ? [
        {t:'Aboard.', onward:true, go:'b3_c6_m_river'},
        {t:'Not yet.', go:()=>startExplore()}] : [
        {t:'Guard the slips through the night.', onward:true, go:'b3_c6_m_raid_pre'},
        {t:'Not yet.', go:()=>startExplore()}]}),
  b3_c6_m_raid_pre:()=>({sp:'The slips · midnight', scene:'b3_c6_slips_night', txt:
`Torches along the slips, and the wrights working in their light, and the river black beyond, and the reeds on this bank black too, and very tall, and very still.

Too still. The frogs have stopped.

${b3In('sohra') ? `"Somebody is lying in the reeds," Sohra says softly. "Many somebodies. The frogs say so."` : b3In('greysword') ? `"The reeds," Dannet says softly. "They have stopped moving with the wind."` : b3In('ellis') ? `"Twenty in the reeds," Ellis says softly. "Perhaps more. They're breathing together."` : `There are men lying in the reeds. A great many.`}`,
    ch:[{t:'Kettle\'s sharper, into the reeds where they\'re lying.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c6_raid', {pre:true})},
        {t:'Douse the torches on the slips, and wait for them in the dark.', check:['guile', 14],
          near:{t:()=>b3In('ohl') && ROLL().who !== 'ohl' && S.loy && S.loy.ohl != null ? `Yes, but it is a long wait among the timber, and Ohl spends it whispering that men who come with fire-pots can be talked out of them, and that lying in the dark for them is murder with extra steps. He does not like how this is going to go.` : `Yes, but it is a long wait in the dark among the timber with the frogs gone quiet, and ${NAME(ROLL().who || 'sgt')} hears every reed move twice: −1 on the next check.`,
            fx:()=>{ if (b3In('ohl') && ROLL().who !== 'ohl' && S.loy && S.loy.ohl != null) loy('ohl', -1); else { S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; } }},
          edges:id=>[id === 'sohra' && ['she hunts at night', 1], id === 'ohl' && ['he would rather talk them out of it', -1]],
          go:'b3_c6_m_raid_dark', fail:'b3_c6_m_raid_bad'},
        {t:'Shout the alarm, and go in after them.', go:()=>startBattle('b3_c6_raid', {})}]}),
  b3_c6_m_raid_dark:()=>({sp:'The slips · midnight', txt:
`The torches go out one by one along the slips, as if the wrights were turning in for the night. The Fourth lies down among the timber.

When the raiders come out of the reeds with their fire-pots, crouching, they come straight onto the Fourth.`,
    ch:[{t:'Now.', go:()=>startBattle('b3_c6_raid', {surprise:'p'})}]}),
  b3_c6_m_raid_bad:()=>({sp:'The slips · midnight', txt:
`The last torch will not go out. A wright is still holding it, staring at the reeds, and before anyone can get to him something comes out of the reeds very fast and he goes down, and the torch with him, into a pot of pitch.`,
    ch:[{t:'At them.', go:()=>startBattle('b3_c6_raid', {surprise:'e'})}]}),
  b3_c6_m_after_raid:()=>({sp:'The slips · dawn', scene:'b3_c6_barges', fx:()=>{ if (!S.f.b3_c6_raidDone) { S.f.b3_c6_raidDone = 1; S.f.b3_c6_hullLost = (S.f.b3_lastRoundsFought || 0) > 7 ? 1 : 0; if (!S.f.b3_c6_axeGot) { S.f.b3_c6_axeGot = 1; gain('b3_c6_axe'); } } }, txt:
`The man with the fire-pot goes into the river, and the river takes him, and the slips are quiet.

${S.f.b3_c6_hullLost ? `One hull has burned, a little: a black scar along her strakes from bow to midships. Oskan stands looking at it with his hands on his hips. "She'll float," he says finally. "She won't like it. Neither will whoever's in her."` : `Nothing has burned but a pot of pitch and some reeds. Oskan walks the length of every hull with his hand on the planking, feeling for heat, and comes back, and nods.`}${b3In('ellis') ? `

Ellis has been down in the reeds since first light, and comes back wet to the thigh. "Thirty-odd came out of there," she says. "Eleven went back in, and two of those were carried." She shows you a sandal-strap, cut. "They've been living in the reeds a month. They weren't waiting for us. They were waiting for anybody."` : ''}

At first light he comes to the Fourth with something long wrapped in sacking and puts it in ${b3In('brisk') ? 'Brisk\'s' : 'your'} hands without ceremony: a barge-builder's axe, the broad bearded blade sharp enough to shave with, the ash haft dark from his hands.

"For every barge I build I keep one," he says. "Never gave one away. Not once, thirty years." He shrugs. "There'd be no barges without you. Squares men too, I expect. Don't tell me."

By noon the barges are in the water.`,
    ch:[{t:'Aboard.', onward:true, go:'b3_c6_m_river'},
        {t:'Not yet.', go:()=>startExplore('b3_c6_bank')}]}),

  /* ---- the river ---- */
  b3_c6_m_river:()=>({sp:'The Maurik · downriver', scene:'b3_c6_downriver', txt:
`The barges go downriver in a long line, poled and steered and leaking, with four thousand Malazans on them and three clans of the White Face, who have painted themselves for the occasion and sing the whole way. The rest of the Barghast walk along the banks, keeping pace, and sing back.

Humbrall Taur himself is on the lead barge beside Whiskeyjack, a vast old man in furs, saying nothing at all, which among the White Face is apparently a mark of great rank.${b3In('ohl') ? `

Ohl sits in the middle of the Fourth's barge with both hands on the gunwales. "I have never liked boats," he says. "I would like it noted that this is not a boat. This is a floor that has been told lies about water."` : ''}

A little after noon the river bends hard under a high bank of reeds, and the barge swings in toward it, and the steersman shouts, and a stone the size of a fist comes out of the reeds and takes him off the steering oar into the water.${b3In('vell') ? ` Vell has a line out to him before he comes up, and hauls him in along the side, coughing.` : ''}

Then the reeds are full of men.${b3In('greysword') ? `

"Grey sorcery," Dannet says, very quiet, looking at the bank. "One of them is wearing it."` : ''}`,
    ch:[{t:'Kettle\'s sharper, over the water into the reeds.', tag:'uses 1 sharper', req:()=>b3In('kettle') && S.inv.sharper > 0, fx:()=>{ S.inv.sharper--; }, go:()=>startBattle('b3_c6_ambush', {pre:true})},
        {t:'Shields up along the gunwale. Get the oar back.', check:['might', 14],
          near:{t:()=>`Yes, but one stone comes in under the rim of the shield before the wall is set, and finds ${NAME(ROLL().who || 'sgt')} on the collarbone: ${bruiseN()} health down at the start of the fight.`, fx:()=>bruise(ROLL().who || 'sgt', bruiseN())},
          edges:id=>[id === 'brisk' && ['a shield, a wall, a river: home', 2], id === 'greysword' && ['the Grey Swords\' wall-drill', 1]],
          go:'b3_c6_m_river_wall', fail:'b3_c6_m_river_bad'},
        {t:'Shoot back.', go:()=>startBattle('b3_c6_ambush', {})}]}),
  b3_c6_m_river_wall:()=>({sp:'The Maurik · the reed bank', txt:
`${by({brisk:`Brisk is on the gunwale with her shield up before the second stone comes, and the stones ring off it, and behind her the Fourth gets the steering oar and puts the barge where it wants to go, which is at the bank.`, _:`{who} gets a shield up along the gunwale and the stones ring off it, and the steering oar is back in a Malazan hand, and the barge goes where the Fourth wants it, which is at the bank.`})}`,
    ch:[{t:'Over the side.', go:()=>startBattle('b3_c6_ambush', {surprise:'p'})}]}),
  b3_c6_m_river_bad:()=>({sp:'The Maurik · the reed bank', txt:
`The oar swings loose and the barge slews round broadside to the bank, and for a long moment the Fourth is standing in an open boat in plain sight with nothing between it and the reeds but air.`,
    ch:[{t:'Down, and shoot.', go:()=>startBattle('b3_c6_ambush', {surprise:'e'})}]}),
  b3_c6_m_after_amb:()=>({sp:'The Maurik · the reed bank', scene:'b3_c6_downriver', fx:()=>{ if (!S.f.b3_c6_ambDone) { S.f.b3_c6_ambDone = 1; S.f.b3_c6_barghastCame = b3Trust() >= 7 ? 1 : 0; ally(0, 1, 'A Condor, dead in the reeds, a long way from the mountains'); if (!S.f.b3_c6_feath) { S.f.b3_c6_feath = 1; gain('b3_c6_feather'); } } }, txt:
`The Seerdomin master goes down in the reeds and lies still, and the grey goes out of the air.${S.f.b3_c6_barghastCame ? ` The White Face who came over the side with the Fourth stand round him and sing something short and ugly, and then go back to their barge, very pleased.` : ''}

Further up the bank, in a hollow among the reeds, there is something else: a bird. A carrion bird, huge, bigger than any bird should be, lying with its wings spread and its neck broken, as if it had fallen out of the sky. It has been dead a day or two. It has not been touched. Nothing in the reeds has gone near it, not a fly.

Its eyes are open. There are too many of them.

${b3In('sohra') ? `Sohra will not go closer than ten paces. "It came from the south," she says. "From the city. Something was riding it, and got off." She spits, Rhivi-fashion, to the side. "Leave it."` : `The Fourth stays back.`}

One long black feather has come loose from the wing and lies on the mud by your boot. When you pick it up it is cold, and it lifts a little in your hand, in a wind that is not there, toward the south.

By evening the barges are tying up at Maurik.`,
    ch:[{t:'Ashore.', go:'b3_c6_m_landing_in'}]}),
  b3_c6_m_landing_in:()=>({sp:'Maurik', scene:'b3_c6_maurik', txt:
`Maurik is empty. A city on a river, walls, temples, a long stone landing with iron rings in it, and not a soul. The doors stand open. The Seer's sign is chalked on every one, and chalked over, and then everyone left.

Brood's army is here.

It came overland, fast, by the ford, and got here first, and it is drawn up along the landing and the street above it: Rhivi, and Tiste Andii, and Barghast of other clans, and mercenaries, and Mott Irregulars, and every one of them is looking at the barges coming in, and counting.

There is a long silence along the landing, and in the silence the White Face on the barges stop singing.${b3In('ellis') ? `

Ellis, beside you, is counting them back. She gets as far as the Andii and stops. "I'd like it noted," she says, "that they got here first."` : ''}`,
    ch:[{t:'Off the barge.', go:()=>startExplore('b3_c6_landing')}]}),

  /* ---- Maurik ---- */
  b3_c6_herds:()=>({sp:'A Rhivi herder', txt:
`A Rhivi herd has come down to the river to drink at the end of the landing, a great slow brown press of bhederin, and the herders have let it, and nobody can get the barges behind the Fourth's in to the stone. Up the river the rest of the column is backing water and shouting. The herder in front of you, a lean old man on a lean old horse, is not shouting. He is looking at the Malazans with no expression whatever.

"The herds were thirsty," he says, in trade-tongue. "The Malazans were not here. Then they were." He shrugs. "Now everyone waits."

Behind the herd, a man in a ragged Mott Irregular's coat, calling himself to anyone who will listen the High Marshal of something, is filling a sack with dried dung from the landing and being ignored by everyone including the bhederin.${b3In('ellis') ? `

Ellis has counted the herders' horses before she has counted the herders, and apologises to you for it under her breath, as she always does. "Nine horses. Six riders," she says. "The other three are for whoever they're expecting."` : ''}`,
    ch:[{t:'Sohra: talk to him, herder to herder.', req:()=>b3In('sohra'), fx:()=>{ S.f.b3_c6_herds = 'sohra'; ally(1, -1, 'Sohra moves a Rhivi herd with three words'); loy('sohra', 1); }, go:'b3_c6_herds_sohra'},
        {t:'"Please. The rest of the column is on the river."', check:['wits', 13],
          near:{t:()=>S.f.b3_c6_nearSalve ? `Yes, but the old man's please has a price: his horse has a gall on its withers the size of a palm, and he looks at it, and at your kit, until the Fourth's pot of salve goes on it. One salve gone.` : `Yes, but he lets the herd go only after he has looked his fill at the Fourth\'s empty hands, and the herders along the landing see him do it: −1 on the next check for ${NAME(ROLL().who || 'sgt')}, who felt every moment of it.`,
            fx:()=>{ S.f.b3_c6_nearSalve = 0; if (S.inv.salve > 0) { S.inv.salve--; S.f.b3_c6_nearSalve = 1; } else { S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; } }},
          edges:id=>[id === 'ohl' && ['an old man\'s patience with old men', 1], id === 'kettle' && ['she says what she thinks of herds', -1]],
          go:'b3_c6_herds_ok', fail:'b3_c6_herds_no'},
        {t:'Wait. It isn\'t your herd and it isn\'t your river.', fx:()=>{ S.f.b3_c6_herds = 'wait'; }, go:'b3_c6_herds_wait'}]}),
  b3_c6_herds_sohra:()=>({sp:'Sohra', txt:
`Sohra says three words to the old herder in Rhivi. He says four back. She says one.

He looks at her, and then at the Fourth, and then he whistles, a long falling note, and the whole herd lifts its heads at once and begins, without hurry, to go up off the landing into the street, where it is somebody else's problem.

"What did you say?" you ask her.

"I said: these are mine." She does not explain further. The herder, going past, looks at you the way the Rhivi look at a Malazan they have decided to remember.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_herds_ok:()=>({sp:'A Rhivi herder', fx:()=>{ if (!S.f.b3_c6_herds) { S.f.b3_c6_herds = 'asked'; ally(1, 0, 'Asked a Rhivi herder, politely'); } }, txt:
`The old herder thinks about it for some time.

"Please," he repeats. "A Malazan says please." He seems to find this sufficiently strange to be worth rewarding. He whistles, and the herd begins, unhurried, to move up off the landing.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_herds_no:()=>({sp:'A Rhivi herder', fx:()=>{ if (!S.f.b3_c6_herds) { S.f.b3_c6_herds = 'slow'; } }, txt:
`The old herder looks at you, and at the river, and at the herd, and does nothing whatever for as long as it takes the bhederin to finish drinking, which is a long time. Then they wander off on their own.

Upriver, Trake's Legion's barges come in last of all, hours late, and the big striped man at the bow of the first one has a great deal to say about bhederin.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_herds_wait:()=>({sp:'The landing', txt:
`You wait. The herd drinks. The herders watch the Malazans waiting, and something passes among them that is not quite approval and not quite contempt: the Malazans are good at waiting, it seems, when they choose. Eventually the bhederin wander off up the street of their own accord.

The last barges, Trake's Legion's, come in hours late, and their people come ashore talking about bhederin in several languages.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b3_c6_unload:()=>({sp:'The barges', txt:
`The barges unload onto the landing in a long confusion of crates and packs and sacks and soldiers, and the White Face come off them still in their war-paint and stand about looking at Brood's Barghast, who look back. The singing has stopped.${S.f.b3_c6_brood ? ` The barges will not be needed again. Oskan is already arguing with a Rhivi about selling one.` : ''}`,
    ch:[{t:'Leave it.', go:()=>startExplore()}]}),
  b3_c6_gear:()=>({sp:'The Host\'s gear', again:()=>`The landing, the stacks, the quartermaster's eye. You have ${S.silver} silver.`, txt:
`The Host's gear, stacked on the landing under a quartermaster's eye: everything four thousand people need to march to Coral, which is less than four thousand people want.

"Salve, six. Sharpers, nine. Smokers, five," the quartermaster says, without looking up. "Silver. Last shop before Coral."`,
    ch:[{t:'A salve.', tag:'6 silver', req:()=>S.silver >= 6, fx:()=>{ S.silver -= 6; S.inv.salve++; updSilver(); note('A salve, from the Host\'s gear at Maurik.', 'good'); }, go:'b3_c6_gear'},
        {t:'A sharper.', tag:'9 silver', req:()=>S.silver >= 9, fx:()=>{ S.silver -= 9; S.inv.sharper++; updSilver(); note('A sharper, from the Host\'s gear at Maurik.', 'good'); }, go:'b3_c6_gear'},
        {t:'A smoker.', tag:'5 silver', req:()=>S.silver >= 5, fx:()=>{ S.silver -= 5; S.inv.smoker++; updSilver(); note('A smoker, from the Host\'s gear at Maurik.', 'good'); }, go:'b3_c6_gear'},
        {t:'Nothing.', go:()=>startExplore()}]}),
  b3_c6_landing_fire:()=>({sp:'A fire on the landing', txt:
`A fire on the stones of the landing, made of a door from one of Maurik's empty houses. The Fourth sits round it and eats, and does not look at Brood's people, and Brood's people do not look at the Fourth, very carefully, all evening.${b3In('greysword') ? ` Dannet sits with her shield face-in against her knees, so the wolf is toward the fire and not the landing.` : ''}${b3In('vell') ? ` Vell has climbed the landing wall to sit on top of it, because it is the only high thing in Maurik nobody has chalked on.` : ''}${b3In('ellis') ? ` Ellis eats with her back to the river, where she can see the street and the command tent both.` : ''}`,
    ch:[{t:'Rest a while.', req:()=>!S.f.b3_c6_lrest, fx:()=>{ S.f.b3_c6_lrest = 1; b3Rest('The Fourth sleeps on the stones of the landing at Maurik, in a city nobody lives in, and wakes no worse.'); }, go:'b3_c6_landing_rested'},
        {t:'"Vell. Come down off the wall."', req:()=>b3In('vell') && !S.f.b3_c6_tVellM, fx:()=>{ S.f.b3_c6_tVellM = 1; }, go:'b3_c6_landing_vell'},
        {t:'Leave it.', go:()=>startExplore()}]}),
  b3_c6_landing_vell:()=>({sp:'Vell', txt:
`Vell comes down off the landing wall the long way, by a drainpipe and a lintel and a shutter, because it is there, and sits by the fire with his eyes bright.

"Roofs," he says. "A whole city of them, and not a soul on any of them. I went across half of Maurik before the light went. Never touched a street." He takes the bread he's handed and doesn't eat it. "It's not right, though, Sergeant. The Seer's sign. It's chalked on every door, you saw. It's chalked on the roofs too. On the chimney-stacks. On a skylight you can only get to from the next roof over, with a jump." He turns the bread over. "Someone climbed for that. In the dark, I'd bet. So the whole city'd know it was watched from above as well."

He eats, at last.

"In the Daru District," he says, "the roofs were ours. The Guild's. No one else's." He looks up at the dark roofline. "There's worse in the Domin. I've seen it. But that's the one I'll keep. Someone took the roofs."`,
    ch:[{t:'"Then we\'ll take them back. Coral has roofs."', fx:()=>{ loy('vell', 1); }, go:()=>startExplore()},
        {t:'"Eat, Vell. Then sleep."', go:()=>startExplore()}]}),
  b3_c6_landing_rested:()=>({sp:'A fire on the landing', txt:`You sleep. In the night somebody walks past the fire very slowly, a tall shape in a fur collar, and stops, and goes on. In the morning you are not sure you did not dream it.`,
    ch:[{t:'Up.', go:()=>startExplore()}]}),
  b3_c6_brood:()=>({sp:'Caladan Brood', fx:()=>{ if (!S.f.b3_c6_brood) { S.f.b3_c6_brood = 1;
      const t = c6Told(); ally(-1, 1, 'Brood finds out'); if (t === 'truth') ally(1, 0, 'A Rhivi voice: one Malazan did not lie'); if (t === 'lie') ally(-1, 0, 'The Rhivi remember who said latrines'); } }, txt:
`Caladan Brood comes down to the landing with the great hammer across his back and his face like a cliff, and Whiskeyjack walks out to meet him across the stones, slowly, with the spear for a stick and his weight on the good leg, and making it look like a choice.

They do not say anything where anyone can hear. Brood looks along the landing at the barges, and at the four thousand coming off them, and then up and down the empty street, as if counting a column that is not there. Then he turns and goes into the command tent on the landing, and Whiskeyjack goes in after him, and Korlat, and ${c6Kallor()}, and the tent flap drops.

The Fourth stands in the guard line outside it, facing out, with its back to the tent and its face to the river, which is where Whiskeyjack put it.

There is no sound from the tent. Then Brood's voice, once, not loud, a single word you do not catch, and the canvas of the tent moves as if a wind had touched it from inside.

Then nothing again.${b3In('sohra') && c6Told() === 'truth' ? `

At the edge of the Rhivi line a young rider says something in Rhivi, not loud, and points at the Fourth with his chin. Sohra, beside you, does not turn her head. "He says: those ones did not lie," she murmurs. "It is going along the line." It is.` : ''}${c6Told() === 'lie' ? `

At the edge of the Rhivi line a young rider with a spirit-mark across his eyes looks at you, and says one word to the man beside him. You know which word. *Latrines.*` : ''}`,
    ch:[{t:'Hold the line.', go:'b3_c6_brood2'}]}),
  b3_c6_brood2:()=>({sp:'The guard line', fx:()=>{ S.f.b3_kallor = 1; }, txt:
`When they come out, Whiskeyjack comes first. His face tells nothing. Brood comes after him and stands on the landing looking south, toward the mountains, toward Coral, and says, to nobody, in a voice like a stone settling: "He should have told me." Then he goes, and his own people close round him, and none of them look at the Malazans.

${c6Kallor(true)} comes out last, and stops on the threshold, and pulls on his gloves. He is smiling. Not much. He has been given something he asked for.${S.f.b3_kallor ? '' : `

"Kallor," somebody behind you in the Rhivi line says, very low, and spits after it. So that is his name.`}

${c6KallorKnows() ? `His eyes go along the guard line, idly, and stop on you. He knows your face. He has known it a while. The smile does not change at all.` : `His eyes go along the guard line, idly, and pass over you, and go on.`}`,
    ch:[{t:'Face the river.', go:()=>startExplore()}]}),
  b3_c6_brood_again:()=>({sp:'Caladan Brood', txt:`Brood is at the far end of the landing with his own people, a head above all of them, with his back to the Malazans.`,
    ch:[{t:'Leave him.', go:()=>startExplore()}]}),
  b3_c6_kallor:()=>({sp:c6Kallor(true), fx:()=>{ if (S.f.b3_c6_brood) S.f.b3_c6_kallorLook = 1; }, txt: S.f.b3_c6_brood ?
`${c6Kallor(true)} is standing by the river with two of his own soldiers, in their fur trim and his colours, watching the Malazans unload with the expression of a man watching a cart go into a ditch from a safe distance.

He hears you come up. He does not turn.

"Four thousand," he says, to the river. "Pretending to be an army, so that six thousand can pretend to be a surprise. And the High Fist in the mountains with his one arm, waiting to see which of you the Seer eats first." He laughs, very softly. "I told Brood that to leave the Host to be annihilated would be a tactical mistake. He agreed. I have asked to ride south with your Whiskeyjack." He turns his head, at last. "I like to be there when things end, soldier. I have been there for a great many."${c6KallorKnows() ? `

He looks at you a moment longer. "I have seen you before," he says. "Haven't I." It is not a question, and he does not wait for an answer.` : ''}` :
`A tall man in a fur-collared cloak stands apart on the landing, watching the barges come in, with two of his own soldiers at his back. He does not look at the Fourth. You find you are glad.`,
    ch:[{t:'Walk away.', go:()=>startExplore()}]}),
  b3_c6_korlat:()=>({sp:'Korlat', fx:()=>{ S.f.b3_c6_korlat = 1; }, txt:
`Korlat of the Tiste Andii is standing at the head of the landing with a tall, silent Andii man beside her, both of them dark as the shadow under a bridge. She is watching Whiskeyjack across the landing, the way you watch a fire you have been told to keep in.

She turns to the Fourth, and inclines her head, with the grave courtesy of her people.

"Sergeant. You were on the river with him." Not a question. "I am going south with your column. Orfantal and I, and some few others." A pause. "Brood will come on behind, at the pace of an army. Your commander will not wait for it." Something moves in her face. "He does not wait for anything. Not even for his leg." She looks at you steadily. "If he falls behind, Sergeant, on the road, you will tell me. Not him. Me."${b3In('vell') ? `

Vell has gone very still beside you, the way he goes still on a roof when a tile moves. The last Tiste Andii he stood near had a sword out and the Daru night behind him. Korlat looks at him, briefly, and something in her face tells you she knows the look, and has seen it on younger faces than his.` : ''}`,
    ch:[{t:'"I will."', go:()=>startExplore()}]}),
  b3_c6_road:()=>({sp:'The road south', txt: S.f.b3_c6_brood ?
`The road south leaves Maurik by the east gate and goes toward the mountains, and Coral beyond them. Whiskeyjack's column is already forming on it: Malazans, the White Face, Korlat and her few Andii. Brood's army will come on behind at its own pace, and whoever else means to come will come.

The pretence of ten thousand is over. There is no point. The Seer will know by tomorrow what Brood knows today.` :
`The road south leaves Maurik by the east gate. It is still empty. Whiskeyjack has something to do on the landing first.`,
    ch: S.f.b3_c6_brood ? [
        {t:'March.', onward:true, go:()=>chapterEnd(6, 'maurik')},
        {t:'Not yet.', go:()=>startExplore()}] : [
        {t:'Back to the landing.', go:()=>startExplore()}]}),
});
