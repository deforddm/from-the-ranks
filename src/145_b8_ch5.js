/* ============ Book Eight, Chapter 5: The Road Back ============ */
/* West over the Lamatath with Calder's wagons DURING the Fete, reaching Darujhistan on its last day (tth-canon correction 6, fix (A)). The
   Hounds of Shadow run through the grass toward the city: heard, seen far off, never fought and never killed (rule 14). At dusk on the
   last day, far off where another road crosses the old east road, four torches on tall poles and one figure waiting: never closer, never
   named (brief §Chapter 5; Spinnock, Kallor, Korlat and Orfantal never on the page, rule 83). The Guild's knives catch up on the road; a
   kelyk peddler heading west can be stopped (his kelyk never reaches the city, canon). At the gate the news from K'rul's: two of its
   Malazans dead, Mallet and Bluepearl (callback 3; never the raid, Picker or Blend, rule 71). Hood still answers in this chapter.
   Phase 1 (S.f.b8_c5_ph), the first night out on the Lamatath: the halt and its fire, the reading in the grass at dusk (B8READ[5]), Calder,
   Benna at her tubs, the outrider; riders in the long grass (b8_c5_grass, optional); sleep, and the night something runs through the
   grass (the Hounds). The dawn after: the outrider reads where they went (the trick, Grass-Running, passive; the grass-dyed cloak).
   Phase 2, the road west: the dry wash and the kelyk peddler (b8_c5_peddler, stage 2 his riders back from the water; or talked into
   pouring it out; or let go, and his cart found smashed in the grass next morning). Phase 3, the last day: the milestone with the Guild's
   chalk on it, and the key S.f.b8_c5_key: 'fast' (push the teams for the gate before it shuts, round the knives: b8Con(+1)) or 'wary' (go
   ahead and find the knives at a burned wayhouse: b8_c5_knives, guild:true, contract tiles for b8Roofs(5), stage 2 the wayhouse roof;
   S.f.b8_c5_scouted). Phase 4, the east gate at dusk: the torches far off, Benlo with the news, Calder paying off, the toll, and in.
   Notes for later chapters: docs/tth-ch5-notes.md. */
/* FOR THE ARTIST (145b): names this file uses.
   Items: ART['item/b8_c5_peddlerpack'], ['item/b8_c5_grasscloak'], ['item/b8_c5_raidersword'].
   Figures: b8_c5_outrider (Calder's plains-born outrider), b8_c5_peddler (the kelyk peddler); placeholders here with ??=. Reused:
   b8_c2_calder (Calder), b8_c1_benlo (Benlo), tenescowri (raiders), b4_c2_pilgrim (the drinker behind the cart), guildknife (the knives).
   Backdrops: b8_lamatath (140's, yours), and four this file adds that borrow until drawn: b8_c5_night (the grass at night, long lines
   bending where something huge runs through it far off, westward), b8_c5_wash (a dry wash in the long grass by day, a cart and a mule),
   b8_c5_wayhouse (a burned wayhouse on a rise at the last day's end), b8_c5_gate (Darujhistan's east wall at dusk, the Fete's lanterns
   along it; far off behind, on the plain, four small torches).
   Ground: TILEX.b8_c5_grass (dusk or night) and TILEX.b8_c5_day (day), over Book Three's Rhivi plain: '.' short grass, ',' long grass,
   'r' the road's ruts, 'W' a wagon, 'F' a fire, '=' a tent, '#' rock, 't' low cover (tussock, tumbled stone), 'p' the peddler's cart,
   'm' a milestone, 'x' the wayhouse's burned walls (block), 'H' the city wall (blocks), 'G' the gate, 'L' a lantern post; arrows. */

/* ---- small helpers (b85: Book Eight, Chapter Five) ---- */
const b85L = (id, n) => { if (b8In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b85Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b8In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b85If = (id, s) => b8In(id) ? (typeof s === 'function' ? s() : s) : '';
const b85Who = () => (ROLL() && ROLL().who) || 'sgt';
const b85Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b85Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b85V = (id, you, they) => id === 'sgt' ? you : they;
const b85Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b85And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* the phase: 1 the first night out, 2 the road west (the peddler), 3 the last day (the key's road), 4 the gate at dusk */
const b85Ph = () => S.f.b8_c5_ph || 1;
const b85Key = () => S.f.b8_c5_key || null;
const b85Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b8In(id));
/* earlier chapters, read with defaults (a --from=5 save sets keys only) */
const b85Kelyk = () => S.f.b8_c2_kelyk || ((b8Key(2) || B8KEY0[2]) === 'fields' ? 'burned' : 'passed');
const b85Passed = () => b85Kelyk() === 'passed';
const b85Burned4 = () => (b8Key(4) || B8KEY0[4]) === 'burn';
const b85Benna = () => { try { return visReader().id === 'benna'; } catch (e) { return false; } };
const b85Jug = () => (S.kit || []).includes('b8_kelykjug');
const b85Charm = () => (S.squad || []).find(id => b8In(id) && wears(id, 'b8_hoodcharm')) || null;
const b85PedDone = () => !!S.f.b8_c5_peddler;
const b85Reader = () => b8In('vasso') ? 'vasso' : b8In('vell') ? 'vell' : null; // who can read the Guild's chalk
const b85Gain = k => { if (!(S.kit || []).includes(k) && !Object.values(S.gear || {}).some(g => g && Object.values(g).includes(k))) gain(k); };
const b85Pay = (n, why) => { const p = Math.min(n, S.silver || 0); if (p > 0) { S.silver -= p; note(`${p} silver: ${why}.`, 'bad'); } return p; };

/* ---- Grass-Running: how the plains people read the long grass for what runs through it. It copies the Long Listen (b4_c6_listen) and is
   PASSIVE (v10.3; listed in V103_PASSIVE in 989): no button, it works by itself as every fight the bearer walks into opens. The first
   enemy to move is marked (+2 to hit it for the squad until the end of the next round); through the first round nobody in the squad can
   be flanked. Not sorcery. ---- */
Object.assign(TRICKS, {
  b8_c5_grass:{name:'Grass-Running', ch:5, use:'fight', ab:'t_b8_c5_grass', where:'the Lamatath, the morning after something ran through the grass toward the city',
    lore:'How the plains people read the long grass: which way it lies, where it has sprung back and where it has not, where the crickets have gone quiet and the larks gone up too early. A plains child learns it before she learns to ride. It tells you what is moving in the grass, which way, and how many, a breath before you could see it. It works on cobbles too, if you squint, and on dust, and on the faces in a crowd.',
    get fx(){ return 'Once a fight: the bearer reads the ground for what is moving on it. The first enemy to move is marked, and the squad is +2 to hit it until the end of the next round. Through the first round nobody in the squad can be flanked. Not sorcery: it never sputters.'; }},
});
Object.assign(AB, {
  t_b8_c5_grass:{name:TRICKS.b8_c5_grass.name, trick:'b8_c5_grass', self:true, desc:()=>TRICKS.b8_c5_grass.fx,
    run(u){ B.b85grass = {u, on:true, marked:null, r0:B.round || 1}; AUDIO.play('click'); float(u, 'reading the ground', '#d8d0a0'); sparks(u.x, u.y, 6, '#d8d0a0', .3);
      blog(`${u.name} goes still and reads the ground for what is moving on it. "${u.id === 'sohra' ? 'There. The grass is telling on them.' : u.id === 'vasso' ? 'Left. The dust gave them away.' : 'Left. One of them first.'}" For a round the squad's flanks are watched.`); }},
});
{ const _bfts = boonFoeTurnStart;
  boonFoeTurnStart = function(u){ const r = _bfts(u); const g = b8On() && B && B.b85grass;
    if (g && g.on && !g.marked && u && u.side === 'e' && u.hp > 0 && !u.b8hound) { g.marked = u; u.b85heard = B.round + 1; float(u, 'read', '#f2c46b'); blog(`${u.name} moves, and the ground gave it away first. <em>+2 to hit it.</em>`); }
    return r; }; }
{ const _fl = flanked;
  flanked = function(a, t, from){ if (b8On() && B && B.b85grass && B.b85grass.on && t && t.side === 'p' && a && a.side === 'e') return false; return _fl(a, t, from); }; }
{ const _ac = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _ac(a, t, o); if (b8On() && B && a && t && a.side === 'p' && t.b85heard != null && t.b85heard >= B.round) c.bonus += 2; return c; }; }
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); const g = b8On() && B && B.b85grass;
    if (g && g.on && g.u && u && g.u.id === u.id && (B.round || 1) > g.r0) { g.on = false; blog('The reading is done. The ground is only ground again.'); }
    return r; }; }

/* ---- borrowed pictures until the artist's file (145b) replaces them: four scenes, two grounds, two figures, the three items ---- */
{ const like = {b8_c5_night:'b8_lamatath', b8_c5_wash:'b8_lamatath', b8_c5_wayhouse:'b8_lamatath', b8_c5_gate:'b8_daru_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') { TILEX.b8_c5_grass ??= (...a) => (TILEX.b3_c2_plain_night || (() => {}))(...a); TILEX.b8_c5_day ??= (...a) => (TILEX.b3_c2_plain || (() => {}))(...a); }
if (typeof FIGX !== 'undefined') { FIGX.b8_c5_outrider ??= (ctx, h, t, o) => (FIGX.b8_c2_drover || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c5_peddler ??= (ctx, h, t, o) => (FIGX.b5_c3_trader || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c5_benna ??= (ctx, h, t, o) => (FIGX.b5_c5_refugee || FIGX.b2soldier || (() => {}))(ctx, h, t, o); }
if (typeof ART !== 'undefined') [['b8_c5_peddlerpack', 'b7_c4_musterbadge'], ['b8_c5_grasscloak', 'b7_c4_bluescale'], ['b8_c5_raidersword', 'b7_c4_bluelance']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Eight's glossary ---- */
GLOSSX.tth.push(
  [5, 'Calder\'s outrider', 'A plains woman who rides ahead of the merchant\'s wagons and reads the grass for them. She does not give her name to guards. She has buried two caravans\' worth of guards who did.', ()=>!!(S && S.f && S.f.b8_c5_outrider)],
  [5, 'The kelyk peddler', 'A man with a cart of jugs, going west over the Lamatath the wrong way, toward a city that has never bought what he sells.', ()=>!!(S && S.f && S.f.b8_c5_pedMet)],
  [5, 'The east gate', 'Darujhistan\'s gate on the road in from the Lamatath. On the Fete\'s last day it shuts at dusk, and the toll-men are paid double for standing at it.', ()=>!!(S && S.f && S.f.b8_c5_gateSeen)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tth = ROSTER_FIRES.tth || {}; ROSTER_FIRES.tth[5] = ['b8_c5_fire'];

/* the reading: the grass at dusk (the Hounds lean, B8POOL[5]) */
B8READ[5] = {scene:'b8_lamatath', where:'the grass at dusk', set:'The long grass of the Lamatath at the end of the day, the caravan drawn up on the road, the light going copper and then grey, and the wind moving over everything in long slow waves.', back:'b8_c5_fire', backT:'Back to the fire.',
  say:{tuft:'"Here," Tuft says, and treads a circle flat in the long grass just past the fire and sits in it. The grass round her keeps moving after the wind has stopped. She watches it. "One card," she says. "Before it gets dark."',
       sohra:'"The grass is a good table," Sohra says, and sits in it cross-legged, so that only her head and the cup show. "It hides what falls off." She shakes the bones. "Sit down. Lower. There."',
       benna:'"Out here," says Benna, lowering herself into the grass with a grunt and a hand on your arm. "My knees will want paying for this. Copper first. Then we see what the Lamatath thinks of you."'}};

const B8CH5 = {
  title:B8CH[5], number:'Five',
  intro:{loc:'The Lamatath', sub:'The road west · dusk', scene:'b8_lamatath', cap:'Long grass to the horizon, a road through it, and the light going.',
    paras:[
`West of the old Domin the land lets go of its stone and turns into grass: the Lamatath, long and pale and moving, with a road through it that is two ruts and a hope. Calder's wagons come down onto it out of the hills in a line, and the dark country falls away behind, and for the first time in a long while there is a sky overhead that does what it is told.`,
()=>{ const v = b85Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, and the Fourth is going home. ${v.length ? `${b85And(v)} ${v.length > 1 ? 'ride' : 'rides'} the wagons with you, or walk${v.length > 1 ? '' : 's'} beside them when the ruts get bad.` : 'You ride the last wagon by yourself, with the ledger.'} Somewhere ahead, past the edge of the grass, the Fete has begun in Darujhistan without you. Calder says the wagons will make the gate on its last day, if the teams hold and nothing else does.`; },
`The Contract did not come east. It will be waiting at the city's gate. The Fourth has been away long enough for the city to forget a little, and not long enough for the Guild.`],
    go:'Down onto the grass', node:'b8_c5_start'},

  areas:[
    /* 16 x 12 (b8_c5_grass, dusk and night). The caravan's halt on the Lamatath road. r the road  W the wagons  F the Fourth's fire
       = Benna's laundry wagon's awning  ^ north into the long grass  < west, the road on  > east, the road back */
    { id:'b8_c5_road', title:'The Lamatath · the caravan\'s halt', sub:'Dusk on the road west · the long grass', hint:'Tap ground to move · tap a figure to talk · the road goes on west', decor:'b8_c5_grass', dark:true,
      map:[ ",,,,,,,^,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,,W,,,.,,,W,,,,",
            ",,,,,.....,,,,,,",
            ",W,,,.,,,.,,,W,,",
            "<rrrrr.F..rrrrr>",
            ",W,,,.,,,.,,=W,,",
            ",,,,,.....,,,,,,",
            ",,,W,,,,,,,W,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,#,,,",
            ",,,,,,,,,,,,,,,," ],
      walk:'.,r<^>', triggers:{F:'b8_c5_fire', '^':'b8_c5_to_grass', '<':'b8_c5_west', '>':'b8_c5_east'}, start:{x:7, y:7},
      quest:()=> b85Ph() === 1 ? (!S.f.b8_c5_calder ? 'Calder, by the lead wagon.' : 'The fire, and sleep, if the grass lets you.')
        : b85Ph() === 2 ? (!b85PedDone() ? 'West along the road. The outrider has seen a cart ahead.' : 'The fire. The last night on the grass.')
        : b85Ph() === 3 ? (!b85Key() ? 'The fire. The milestone. Decide.' : 'West, for the gate.')
        : 'The gate.',
      npcs:[
        {id:'calder', name:'Calder, with the wagons', kind:'b8_c2_calder', x:10, y:3, node:()=>'b8_c5_calder', show:()=>b85Ph() <= 3, fresh:()=>!S.f.b8_c5_calder},
        {id:'outrider', name:'The outrider', kind:'b8_c5_outrider', x:4, y:7, node:()=> b85Ph() >= 2 && !S.f.b8_c5_dawn ? 'b8_c5_dawn' : 'b8_c5_outrider', fresh:()=> !S.f.b8_c5_outrider || (b85Ph() >= 2 && !S.f.b8_c5_dawn)},
        {id:'benna', name:'Old Benna, at her tubs', kind:'b8_c5_benna', x:12, y:7, node:()=>'b8_c5_benna', show:()=>b85Ph() <= 3, fresh:()=>!S.f.b8_c5_benna} ] },

    /* 16 x 12 (b8_c5_day, day). The road crosses a dry wash; the peddler's cart has stopped in it. p the cart and its jugs  # banks of
       grey stone  t tussocks  > east, back along the road to the wagons */
    { id:'b8_c5_wash', title:'The Lamatath · the dry wash', sub:'Day · the road west', hint:'Tap ground to move · tap a figure to talk · the wagons are back east', decor:'b8_c5_day',
      map:[ ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,##,,,,,,,,,##,",
            ",,,,,,t,,,,,,,,,",
            "rrrrr.......rrr>",
            ",,,,..p.....,,,,",
            ",,,,.........,,,",
            ",,#,,,,,,,t,,,,,",
            ",,,,,,,,,,,,,#,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,t,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,," ],
      walk:'.,r>', triggers:{p:'b8_c5_cart', '>':'b8_c5_wash_back'}, start:{x:14, y:4},
      quest:()=> !b85PedDone() ? 'The man with the cart.' : 'Back east, to the wagons.',
      npcs:[
        {id:'peddler', name:'The peddler, by his cart', kind:'b8_c5_peddler', x:7, y:5, node:()=>'b8_c5_peddler', show:()=>!b85PedDone(), fresh:()=>!S.f.b8_c5_pedMet} ] },

    /* 16 x 12 (b8_c5_grass, the last day's dusk). The burned wayhouse on its rise above the road. x its walls  t fallen stones
       m the milestone  v back down to the road and the wagons  < on west to the gate */
    { id:'b8_c5_rise', title:'The Lamatath · the burned wayhouse', sub:'The Fete\'s last day · late', hint:'Tap ground to move · the wayhouse is on the rise · the gate is west', decor:'b8_c5_grass', dark:true,
      map:[ ",,,,,,,,,,,,,,,,",
            ",,,,xxxxxxx,,,,,",
            ",,,,x.....x,,,,,",
            ",,,,x.t...x,,,,,",
            ",,,,x.....x,,,,,",
            ",,,,xxx.xxx,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            "<rrrrrrrrrrrrm,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,v,,,,,,,," ],
      walk:'.,r<v', triggers:{m:'b8_c5_milestone', t:'b8_c5_wayhouse', '<':'b8_c5_rise_on', 'v':'b8_c5_rise_back'}, start:{x:7, y:9},
      quest:()=> !S.f.b8_c5_knivesDone ? 'The wayhouse on the rise. They are in there, or on it.' : 'West, to the gate. The wagons will catch you up.',
      npcs:[
        {id:'knives', name:'Somewhere in the wayhouse', kind:'guildknife', x:7, y:3, node:()=>'b8_c5_lieup', show:()=>!S.f.b8_c5_knivesDone, fresh:()=>true} ] },

    /* 16 x 12 (b8_c5_grass, dusk). Darujhistan's east gate on the Fete's last day. H the wall  G the gate  L lantern posts
       W the wagons waiting  > back east along the road, to look */
    { id:'b8_c5_gate', title:'Darujhistan · the east gate', sub:'The Fete\'s last day · dusk', hint:'Tap ground to move · tap a figure to talk · the gate is in the wall', decor:'b8_c5_grass', dark:true,
      map:[ "HHHHHHHGHHHHHHHH",
            ",,,,,,L.L,,,,,,,",
            ",,,,,,...,,,,,,,",
            ",,,W,,...,,W,,,,",
            ",,,,,.....,,,,,,",
            ",,,,,.,r,.,,,,,,",
            ",,,,,,,r,,,,,,,,",
            ",,,,,,,rrrrrrrr>",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,," ],
      walk:'.,r>', triggers:{G:'b8_c5_gate_in', L:'b8_c5_wall', '>':'b8_c5_torches'}, start:{x:12, y:7},
      quest:()=> !S.f.b8_c5_mallet ? 'Benlo, at the gate. He has seen you. He has news.' : 'The gate, before it shuts.',
      npcs:[
        {id:'benlo', name:'Benlo, with a tray', kind:'b8_c1_benlo', x:9, y:2, node:()=>'b8_c5_benlo', fresh:()=>!S.f.b8_c5_mallet},
        {id:'calder', name:'Calder, with the wagons', kind:'b8_c2_calder', x:4, y:4, node:()=>'b8_c5_calder_end', fresh:()=>!S.f.b8_c5_calderEnd},
        {id:'benna', name:'Old Benna', kind:'b8_c5_benna', x:11, y:4, node:()=>'b8_c5_benna_end', fresh:()=>!S.f.b8_c5_bennaEnd} ] } ],

  battles:{
    /* riders in the long grass (optional): plains raiders who have shadowed the wagons since the hills */
    b8_c5_grass:{title:'The long grass', style:'b8_c5_grass', open:true, dark:true, warrenText:'Dusk on the Lamatath · the grass to the shoulder · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["..t.....","........","....t...","........","t.......","......t.","........","..t.....","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_raider',2,1],['b8_raider',5,1],['b8_raider',4,0]], xp:180, after:'b8_c5_grass_after',
      preText:()=>`They come out of the grass the way they went into it, low and quick, curved blades held back along the arm so the light won't find them. Three of them. There will be horses somewhere behind, lying down.`},
    /* the kelyk peddler: his two hired riders and the drinker who walks behind the cart; stage 2 the riders' friends back from the water */
    b8_c5_peddler:{title:'The dry wash', style:'b8_c5_day', open:true, warrenText:'Noon on the Lamatath · a dry wash, grey stone banks · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","........","....t...","........","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_raider',2,2],['b8_raider',5,2],['b8_pilgrim',4,1]], xp:220, after:'b8_c5_peddler_after',
      preText:()=>`The peddler gets behind his mule. His two riders do not need telling: they were hired for this, and they have been waiting all morning to earn it. The man who walks behind the cart comes too, smiling, with his stained mouth open and nothing in his hands.`,
      stage2:{title:'Back from the water', xp:110,
        text:()=>`The wash is quiet, and then it is not. Two more riders come down the bank at a canter from where the horses were watered, and they have seen what is lying on the stones, and they do not stop to ask about it.${b85Say({sohra:`\n\nSohra watches them come with her head on one side. "They ride badly," she says. "Good."`, brisk:`\n\nBrisk sets the shield and says something to Hood about riders that Hood has heard before.`, _:''})}`,
        map:["#......#","........","..t.....","........","......t.","........","........","..t.....","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_raider',2,1],['b8_raider',5,1]]} },
    /* key 'wary': the road knives at the burned wayhouse. The Contract puts b8Roofs(5) on the tiles (knives only, at most three); the
       crossbow is always there. Stage 2: the one on the wayhouse roof, and the knife who was keeping him company. */
    b8_c5_knives:{title:'The burned wayhouse', style:'b8_c5_grass', open:true, dark:true, guild:true, warrenText:'The Fete\'s last day · dusk on a rise · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.#..#.#","........","..t..t..","........","........","...t....","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_guildbow',4,0]], contract:[[2,1],[5,1],[3,2]], xp:260, after:'b8_c5_knives_after',
      preText:()=>`The wayhouse has no roof and three walls, and the Guild has made a nest of it: a crossbow behind the gap where the door was, and knives in the dark along the inside of the walls, waiting for wagons. They were not waiting for the Fourth to come up the back of the rise on foot.`,
      stage2:{title:'The wayhouse roof', xp:130,
        text:()=>`The ones in the walls are down. The one on what is left of the roof beam is not, and neither is the knife who was keeping him company up there, and they have both stopped pretending to be part of the wayhouse.${b85Say({vasso:`\n\nVasso looks up at the beam and his mouth goes tight. "I know the one with the bow," he says. "He taught me knots." He draws anyway.`, vell:`\n\nVell is already looking at the beam the way he looks at a roof: which bits hold. "Left end," he says. "The right end is charcoal."`, _:''})}`,
        map:["##.##.##","........","..t.....","........",".....t..","........","........","..t..t..","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_knife',3,1],['b8_guildbow',5,0]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b8_c5_peddlerpack:{name:'A peddler\'s pack', slot:'trinket', role:'any', who:null, stat:{guile:1}, hp:1,
      line:'A pack of oiled leather with more pockets than a pack has any right to, and in every pocket a different smell: wax, pepper, horse, and in the deepest one something sweet that will not wash out. The peddler kept his patter in it, too. Whoever carries it finds they know how to talk to a stranger on a road, which is most of a peddler\'s trade and some of a soldier\'s.'},
    b8_c5_grasscloak:{name:'A grass-dyed cloak', slot:'armour', role:'light', who:null, ac:1, hp:3,
      line:'Plains wool dyed the colour of the Lamatath at the end of summer, pale gold over grey-green, so that whoever wears it lying down in the long grass is only more grass. The outrider gave it over without a word, which from her is a speech. It smells of horse and woodsmoke and is warmer than it looks.'},
    b8_c5_raidersword:{name:'A plains raider\'s sword', slot:'weapon', role:'blade', who:null, atk:0, dmg:[1,10,3],
      line:'A long single-edged blade with a curve in it for cutting from the saddle, the grip wrapped in rawhide gone black with hands. The plains riders carry them low along the arm so the light will not find the steel. It is heavier at the point than a Malazan blade and it wants to be swung, not thrust. It will learn.'} },

  scenes:{
    b8_c5_night:{loc:'The Lamatath', sub:'The halt · night', cap:'The grass under the stars, the wagons drawn up dark, and far off, long lines in the grass bending westward where something is running through it.', amb:'explore'},
    b8_c5_wash:{loc:'The Lamatath', sub:'A dry wash on the road west · day', cap:'A dry wash with grey stone banks, the road dipping down into it and up, and a peddler\'s cart stopped on the stones with a mule in the shafts.', amb:'explore'},
    b8_c5_wayhouse:{loc:'The Lamatath', sub:'A burned wayhouse · the last day', cap:'Three black walls and a roof beam on a rise above the road, the grass gone copper in the last of the light, and the city\'s glow on the sky ahead.', amb:'explore'},
    b8_c5_gate:{loc:'Darujhistan', sub:'The east gate · the Fete\'s last day · dusk', cap:'The city wall high and dark, the gate open, lanterns and masks along the wall-walk, and the blue fire of the city coming up over it.', amb:'explore'} },

  end:{
    fast:['The gate before dark', 'The Fourth came back west over the Lamatath with Calder\'s wagons, through the long grass, while the Fete went on in the city without them. Something ran through the grass one night toward Darujhistan and did not look at them. On the last day there was Guild chalk on a milestone, and the Fourth went round it hard, and made the gate with the light going. Two of the Malazans at K\'rul\'s were dead. The news was waiting at the gate.'],
    wary:['The knives on the road', 'The Fourth came back west over the Lamatath with Calder\'s wagons, through the long grass, while the Fete went on in the city without them. Something ran through the grass one night toward Darujhistan and did not look at them. On the last day there was Guild chalk on a milestone, and the Fourth went up the rise to the burned wayhouse and found the knives there first. They came in at dusk. Two of the Malazans at K\'rul\'s were dead. The news was waiting at the gate.'] },
  endScene:'b8_c5_gate',
  endCap:()=> S.f.b8_c5_key === 'wary' ? 'The east gate at dusk on the Fete\'s last day: lanterns on the wall, the city\'s noise over it, and behind, on the plain, four small torches.' : 'The east gate with the light going on the Fete\'s last day: the gate-men at the bars, the wagons through, and behind, on the plain, four small torches.',
  tease:'Next: the Fete\'s last night in Darujhistan, the Fourth\'s own door up the street from the Phoenix, and a city full of masks that is about to have a very bad night.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b8_c5_key === 'fast') x.push('The Fourth went round the Guild\'s knives on the road and made the gate before it shut.');
    if (f.b8_c5_key === 'wary') x.push('The Fourth found the Guild\'s knives at a burned wayhouse on the road, and went up the back of the rise first.');
    if (f.b8_c5_grassOk) x.push('The Fourth learned to read the long grass from Calder\'s outrider.');
    if (f.b8_c5_peddler === 'stopped') x.push('A kelyk peddler on the road west was stopped in a dry wash, and his jugs broken on the stones.');
    if (f.b8_c5_peddler === 'poured') x.push('A kelyk peddler on the road west poured his jugs out into a dry wash, and went back east.');
    if (f.b8_c5_peddler === 'let') x.push('A kelyk peddler on the road west was let go. Something ran through his camp that night. His jugs never reached the city.');
    if (f.b8_c5_grassDone) x.push('Riders in the long grass found out what the wagons had for guards.');
    if (f.b8_c5_mallet) x.push('At the gate, the news from K\'rul\'s: Mallet and Bluepearl dead. The Fourth knew Mallet.');
    if (f.b8_c5_torches) x.push('On the last day, at dusk, four torches on tall poles far off on the plain, and one figure waiting among them. The Fourth did not go that way.');
    if (b8In('edrem')) x.push('Edrem has crossed the Lamatath. He says he had not known there was this much sky.');
    if (b8In('vasso')) x.push('Vasso is home, and the Guild knows it.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b8_c5_mallet && 'Mallet is dead. And Bluepearl. The two of K\'rul\'s Malazans, the news says. Mallet wanted a week of the commander flat on his back once, and never got an hour.',
    f.b8_c5_torches && 'Four torches on tall poles, far off on the plain at dusk, where another road crosses the old east road. One figure, waiting. Not for us.',
    f.b8_c5_key === 'wary' && 'The Guild\'s knives waited at a burned wayhouse on the last day. The Fourth got there first.',
    f.b8_c5_key === 'fast' && 'The Guild\'s chalk on a milestone on the last day. The Fourth went round, hard, and made the gate.',
    f.b8_c5_hounds && 'Something ran through the grass in the night, toward the city. Big. More than one. It never looked at the wagons.',
    f.b8_c5_pedMet && 'A peddler with a cart of kelyk, going west. The city has never bought it. He meant to be the first.',
    'The Fourth, on the road back west over the Lamatath, with Calder\'s wagons, while the Fete goes on in the city.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the first night out on the Lamatath ======== */
    b8_c5_start:()=>({sp:'The caravan\'s halt', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_ph = S.f.b8_c5_ph || 1; }, again:()=>'The halt on the Lamatath road, the wagons drawn up, the grass moving all round.', txt:
`Calder halts the wagons where the road widens enough to turn them, and the carters draw them up in a loose ring and see to the teams. All round, the grass goes away in every direction to the edge of the sky, pale and moving, the wind going over it in long slow waves like something breathing.

The Fourth has a fire going in the middle of the ring. The light is going copper.${b85Say({brisk:`\n\nBrisk stands just outside the firelight with her shield on her arm, looking out at the grass. "I don't like it," she says. "You can't see anything coming. It's all coming."`, _:`\n\nYou stand just outside the firelight and look out at the grass, and cannot see anything coming, and know that is not the same as nothing coming.`})}${b85If('edrem', `\n\nEdrem has been staring at the sky since the hills. "I had not known there was this much of it," he says. "In the Domin it was always nearer."`)}${b85If('vasso', `\n\nVasso has climbed onto a wagon's tailboard, out of habit, to get above things. There is nothing to get above. "It's a roof," he says, "with no edge. I hate it."`)}`,
      ch:[b8ReadChoice(5),
          {t:'Find Calder.', go:'b8_c5_calder'},
          {t:'Walk the halt.', go:()=>startExplore()}]}),
    b8_c5_read:()=>b8ReadOffer(5),
    b8_c5_card:()=>b8ReadCard(5),

    /* Calder: the road, the Fete begun behind the hills, the kelyk, his outrider */
    b8_c5_calder:()=>({sp:'Calder', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_calder = 1; }, again:()=>'Calder, by the lead wagon, with his tally-stick.', txt:
`Calder is at the lead wagon with a tally-stick, notching what the teams ate, the way he notches everything. He looks up when you come and does not stop notching.

"Sergeant." ${b85Passed() ? `He is easier with the Fourth than he was going east; the hidden wagon is empty now, left at the camp, and the merchant will be pleased with him. "Good road, this. Flat. Nothing on it to worry a man."` : `He has been cool with the Fourth since the fields on the road east, and he has not stopped being cool. "Road's flat," he says. "Pay's the same as it was. Lighter than it was meant to be, but the same."`}`,
      ch:[{t:'"The Fete. Has it started?"', go:'b8_c5_calder_fete'},
          {t:'"Anything on this road we should know about?"', go:'b8_c5_calder_road'},
          {t:'"Your hidden wagon. Is it empty?"', req:()=>!S.f.b8_c5_calderKelyk, go:'b8_c5_calder_kelyk'},
          {t:'Back to the halt.', go:()=>startExplore()}]}),
    b8_c5_calder_fete:()=>({sp:'Calder', scene:'b8_lamatath', txt:
`"Started without us," he says. "Days ago, by my count. The whole city in masks, and every inn full, and the merchant's warehouse shut up with nobody to unload it." He notches the stick. "We'll make the gate on the last day, if the teams hold. It shuts at dusk on the last day, Fete or no Fete. Gate-men like their supper too."

"After that it's the Fete's last night, and the new year after it, and I'm going to sleep through both."${b85If('vasso', `\n\nVasso, listening from the next wagon, says, "The last night's the best one. Everybody's out. Everybody." He thinks about that, and stops looking pleased.`)}`,
      ch:[{t:'Back to Calder.', go:'b8_c5_calder'}]}),
    b8_c5_calder_road:()=>({sp:'Calder', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_calderRoad = 1; }, txt:
`"Riders," he says. "Always riders. Plains people who think a wagon is a gift the grass has given them. They follow a while to see what's guarding it, and then they decide." He jerks his head at the north side of the ring. "There's some out there now. My outrider saw them at noon."

"And there's a peddler a day ahead of us, going west with a cart. My outrider saw him too. Going the wrong way with the wrong thing in his jugs, she says." He spits. "No one sells that in Darujhistan. There's always a fool trying to be first."${b85If('edrem', `\n\nEdrem has gone still. "Jugs," he says. "Going west."`)}`,
      ch:[{t:'Back to Calder.', go:'b8_c5_calder'}]}),
    b8_c5_calder_kelyk:()=>({sp:'Calder', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_calderKelyk = 1; }, txt: b85Passed() ?
`"Empty," he says, and holds your eye while he says it. "Left at the camp. Paid for, and gone, and the merchant's business and not mine." He notches the stick. "You took the pay for not asking, Sergeant. I'd not start asking now. It's a long road to be asking on."${b85Say({ohl:`\n\nOhl, behind you, says, "Twenty silver," to nobody in particular, and walks off.`, kettle:`\n\nKettle says, "We counted them in," very quietly, and walks off.`, _:''})}` :
`"Empty," he says, with no warmth in it. "You saw to that, on the road east. Burned in the fields with the green, and the merchant's money with it." He notches the stick, hard. "I'll be explaining that in Darujhistan. You'll be in a tavern."`,
      ch:[{t:'Back to Calder.', go:'b8_c5_calder'}]}),

    /* the outrider, before the night: she does not give her name */
    b8_c5_outrider:()=>({sp:'The outrider', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_outrider = 1; }, again:()=>'Calder\'s outrider, by her horse, looking at the grass.', txt: b85Ph() >= 2 && S.f.b8_c5_dawn ?
`The outrider is checking her horse's feet one at a time, with her back to the wagons and her face to the grass. "The road's clear to the wash," she says, without being asked. "After that it's the city." She looks west a moment. "They were going there too. Whatever they were."` :
`Calder's outrider is a plains woman of no particular age with her hair cropped to the skull and a cloak the colour of the grass. She is sitting on her heels by her horse, looking north into the long grass, not at you.

"Riders," she says. "Three. Since the hills. They want to know what the wagons have for guards." She glances at the squad. "Now they know. They'll decide tonight or tomorrow." She does not offer her name. When you ask, she says, "Calder pays me to see. Not to be known."${b85If('sohra', `\n\nSohra sits down on her heels beside her without asking, and the two of them look at the grass together, and after a while the outrider almost smiles.`)}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    /* old Benna at her tubs: she goes with the caravan because it pays */
    b8_c5_benna:()=>({sp:'Old Benna', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_benna = 1; }, again:()=>'Old Benna at the laundry wagon, wringing out the carters\' shirts.', txt:
`Old Benna has her tubs down off the laundry wagon and is wringing out the carters' shirts by the last of the light, with her sleeves rolled to the shoulder and her mouth set.

"Home," she says. "Proper water. A copper a shirt and not one carter in it." She slaps a shirt over the line. "I'll miss the money. I'll not miss the dark at noon, or the smell in that camp, or this." She glares at the grass. "Too much of it. It wants to get into the wash."${b85Benna() ? `\n\n"Read for you again before the city, if you like," she says. "Reading's extra. It always was."` : ''}${b85If('edrem', `\n\nShe looks past you at Edrem and sniffs. "And that one wants a shirt washed," she says. "Grey under that cloak. I can smell old grey from here." Edrem takes the cloak off and hands it to her without a word.`)}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the long grass, north: the riders (optional) */
    b8_c5_to_grass:()=> S.f.b8_c5_grassDone ? {sp:'The long grass', scene:'b8_lamatath', txt:
`North of the ring the grass is trampled flat in a wide circle where the riders lay with their horses, and then it goes on, untroubled, to the edge of the sky.`,
        ch:[{t:'Back to the halt.', go:()=>startExplore()}]} : b85Ph() >= 3 ? {sp:'The long grass', scene:'b8_lamatath', txt:
`North of the road the grass goes on to the sky. The riders who followed the wagons are not in it any more. Whatever ran through the grass in the night ran through their camp too, and they have decided against wagons for now.`,
        ch:[{t:'Back to the halt.', go:()=>startExplore()}]} : DLG.b8_c5_grass_start(),
    b8_c5_grass_start:()=>({sp:'The long grass', scene:'b8_lamatath', txt:
`North of the ring the grass is shoulder-high and going grey with the dusk. You go into it a little way and stop, and listen, and the grass stops too, all round, the way grass does not stop.

They are close. Three of them, the outrider said. Lying down in it with their horses, waiting to see what the wagons have for guards. They know now.${b85If('vasso', `\n\nVasso is very still beside you, which is new. "It's like a roof at night," he says, barely aloud. "Everyone pretending to be a chimney."`)}${b85If('edrem', `\n\nEdrem has the mace up. "On the barrow road they came at dusk too," he says. "Always at dusk. They think the light is on their side."`)}`,
      ch:[{t:'Go in after them, before they choose the time.', go:()=>startBattle('b8_c5_grass', {})},
          {t:'Stand up in the grass and show them the Fourth\'s teeth: let them see what they would be buying.', check:['guile', 15],
            edges:id=>[id === 'sohra' && ['a Rhivi rider knows what other riders are counting', 3], id === 'brisk' && ['she is a lot of shield to look at', 2], id === 'kettle' && ['a cusser held up where they can see it', 2], id === 'edrem' && ['a mace and a face they have both seen on a road', 1], id === 'sgt' && ['you have done this on the Rhivi Plain', 1], id === 'tuft' && ['she looks nineteen still', -1], id === 'vasso' && ['he looks like what he is, a boy off the roofs', -1]],
            near:{t:()=>`Yes, but one of them stands up too, close, close enough to see ${b85Nm(b85Who())} properly, and laughs, and it is ${b85Nm(b85Who())} who has to look away first: rattled.`, fx:()=>b85Rattle(b85Who())},
            go:'b8_c5_grass_faced', fail:'b8_c5_grass_row'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_grass_faced:()=>({sp:'The long grass', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_grassDone = 1; S.f.b8_c5_grassFaced = 1; if (!S.f.b8_c5_sword) { S.f.b8_c5_sword = 1; b85Gain('b8_c5_raidersword'); } }, txt:
`For a while nothing happens. Then three heads come up out of the grass, and three horses after them, and the riders look at the Fourth for as long as it takes to count what they see, and decide.

The oldest of them throws something down in the grass between you, a sword in its sheath, and says a word in the plains tongue, and they go: not away, exactly, only somewhere else. ${b8In('sohra') ? 'Sohra picks the sword up. "A toll," she says. "For passing. We passed."' : 'The outrider, when you bring it back to the ring, laughs once. "A toll," she says. "For passing. You passed."'}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b8_c5_grass_row:()=>({sp:'The long grass', scene:'b8_lamatath', txt:
`One of them laughs, low, somewhere to the left. Then the grass all round is moving the wrong way.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c5_grass', {})}]}),
    b8_c5_grass_after:()=>({sp:'The long grass', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_grassDone = 1; if (!S.f.b8_c5_sword) { S.f.b8_c5_sword = 1; b85Gain('b8_c5_raidersword'); } }, txt:
`Two of the three got back to their horses and are a long way off already, two shapes going north over the grass with the dusk behind them. The third will not be going anywhere. He left his sword.${b85Say({ohl:`\n\nOhl looks at the one who stayed, and kneels, and after a moment stands up again. "Nothing to do," he says. "He was quick about it. So were we."`, _:''})}${b85If('edrem', `\n\nEdrem stands where the wagons can see him until the dust of the two going north is gone.`)}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the road's two ends */
    b8_c5_east:()=>({sp:'The road east', scene:'b8_lamatath', txt:
`East, the road goes back the way you came: two ruts in the grass to the hills, and past the hills the old Domin, and past that, a long way past, a city where it is always night. ${b85If('edrem', 'Edrem looks that way longer than anyone. ')}None of the Fourth is going back that way this season.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b8_c5_west:()=>{ const ph = b85Ph();
      if (ph === 1) return {sp:'The road west', scene:'b8_lamatath', txt:
`West, the road goes on into the dusk, two ruts and the grass closing over them. Tomorrow. The teams are done for today, and so is the light.`,
        ch:[{t:'Back to the halt.', go:()=>startExplore()}]};
      if (ph === 2 && !b85PedDone()) return {sp:'The road west', scene:'b8_lamatath', txt:
`West, the road runs on over the grass. The outrider went ahead at first light and came back at a canter: a cart stopped in a dry wash where the road crosses it, half a morning ahead. A mule in the shafts. Jugs.`,
        ch:[{t:'Ride ahead to the wash.', onward:true, go:()=>{ startExplore('b8_c5_wash'); if (!S.f.b8_c5_washSeen) talk('b8_c5_wash_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]};
      if (ph === 2) return {sp:'The road west', scene:'b8_lamatath', txt:
`West, the road runs on over the grass toward the city. The wagons have come up to the halt for the night. Tomorrow is the last day of the Fete.`,
        ch:[{t:'Back to the halt.', go:()=>startExplore()}]};
      if (ph === 3 && !b85Key()) return {sp:'The road west', scene:'b8_lamatath', txt:
`West, the road. Somewhere ahead on it, past the milestone, the Guild is waiting. Decide how first.`,
        ch:[{t:'Back to the halt.', go:()=>startExplore()}]};
      if (ph === 3) return {sp:'The road west', scene:'b8_lamatath', txt: b85Key() === 'fast' ?
`West, hard, with the teams pushed and the outrider leading the wagons off the road and round through the grass where the ruts are kinder.` :
`West, ahead of the wagons, on foot, to the rise where the burned wayhouse is.`,
        ch:[{t:b85Key() === 'fast' ? 'On, for the gate.' : 'Up to the wayhouse.', onward:true, go:b85Key() === 'fast' ? 'b8_c5_fast' : 'b8_c5_wary'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'The road west', scene:'b8_c5_gate', txt:`West, the gate.`,
        ch:[{t:'To the gate.', onward:true, go:()=>startExplore('b8_c5_gate')},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* the fire: the halt, by phase. The games pass wraps this node: keep the id */
    b8_c5_fire:()=>{ const ph = b85Ph(), rk = 'b8_c5_rest' + ph;
      const way = ph === 1 ? (S.f.b8_c5_calder ? {t:'Sleep. The grass will keep watch, or it will not.', onward:true, go:'b8_c5_sleep'} : null)
        : ph === 2 ? (b85PedDone() ? {t:'Sleep. Tomorrow is the last day.', onward:true, go:'b8_c5_sleep2'} : null)
        : ph === 3 ? (!b85Key() ? {t:'The milestone. Decide.', go:'b8_c5_key'} : {t:b85Key() === 'fast' ? 'On, for the gate.' : 'Up to the wayhouse.', onward:true, go:b85Key() === 'fast' ? 'b8_c5_fast' : 'b8_c5_wary'})
        : {t:'To the gate.', onward:true, go:()=>startExplore('b8_c5_gate')};
      return {sp:'The halt', scene:'b8_lamatath', html:contractHTML(),
        again:()=>'The Fourth\'s fire in the ring of wagons, the grass dark all round.', txt:
`${ph === 1 ? `The fire is small in the middle of the ring, and the grass all round goes on into the dark. The carters are talking low. Every so often one of the teams lifts its head and listens to something, and puts its head down again.` : ph === 2 ? `The second night on the grass. The wind has dropped, and the grass is still, and the stillness is worse.${S.f.b8_c5_peddler ? ' The wash is behind you.' : ''}` : ph === 3 ? (!b85Key() ? `The last morning. The fire is out to embers and the teams are in the traces, and the outrider has come back from the road ahead with something she wants you to see.` : `The halt, packed up. The wagons are waiting for the word.`) : `The halt is behind you. The gate is ahead.`}${b85Say({kettle:`\n\nKettle is counting munitions on a wagon's tailboard.`, ohl:`\n\nOhl is going round the squad's feet, which is a thing he does on long roads, and complaining about each pair.`, _:''})}`,
        ch:[...(ph === 1 ? [b8ReadChoice(5)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk] && ph <= 3, fx:()=>{ S.f[rk] = 1; rest('The Fourth sits an hour by its fire in the ring of wagons. Wounds close, mostly. Whatever was left of the camp\'s sweet smoke goes out of everyone in the clean air.'); }, go:'b8_c5_fire_rest'},
            {t:'Talk with the squad.', go:'b8_c5_fire_talk'},
            ...(way ? [way] : []),
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c5_fire_rest:()=>({sp:'The halt', scene:'b8_lamatath', txt:
`An hour, then, by the fire, with the wagons round you and the grass round the wagons.

${b85Say({ohl:`Ohl goes round with his hands and his opinions. "Feet," he says. "The road east was all feet, and the road back is all feet, and I'm a healer, not a cobbler." He closes what wants closing anyway.`, _:'The squad sees to its own cuts and feet. It has had practice.'})}${b85If('edrem', `\n\nEdrem sleeps sitting up, facing east, toward a barrow he can no longer see.`)}${b85If('vasso', `\n\nVasso sleeps under a wagon, which is the nearest thing to a roof he can find, with one knife out on his chest.`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c5_fire'}]}),
    b8_c5_fire_talk:()=>{ const late = b85Ph() >= 3, ln = [];
      if (b8In('brisk')) ln.push(late ? `Brisk is buckling her shield on while the others are still eating. "The Guild on the road," she says. "Not in an alley. On a road, where you can see them coming." She touches two fingers to her brow. "Hood, you can have the ones on that milestone. Not mine."` : `Brisk has her back to a wheel and her shield on her knee. "Home," she says, as if testing the word. "I've had a few. That door's the one I'd keep." She taps two fingers to her brow, east and then west. "Hood can watch the road. I'll watch the grass."`);
      if (b8In('kettle')) ln.push(late ? `Kettle has her munitions laid out in a row on a cloth. "Two sharpers, a burner, a smoker," she says. "The Guild likes walls. I like what goes through walls." She wraps them up again, one at a time.` : `Kettle is lying on her back looking at the stars. "Nine hundred and something," she says. "I keep losing count. There's too many out here. In the city you can't see them for the gas." She sounds personally offended.`);
      if (b8In('tuft')) ln.push(late ? `Tuft has the Deck in her lap. "The Hounds keep coming up," she says. "Every draw. Running." She does not shuffle them back in. "Whatever ran past us is going where we're going. I'd like it to have got there and left before we do."` : `Tuft is looking at the grass, where the wind moves in it. "There's shadow on this plain," she says. "Not the night kind. The other kind." She pulls her knees up. "Something's going to come through. I can feel the grass getting out of its way."`);
      if (b8In('ohl')) ln.push(late && !S.f.b8_c5_mallet ? `Ohl has his list out, the oilcloth open on his knee. He is not writing in it. "When we get in," he says, "I'm going up to see how they are. Up at K'rul's. The Malazans." He folds the list. "Healer's courtesy. Mallet will want to tell me I've done it all wrong."` : late ? `Ohl has his list out, the oilcloth open on his knee, and two new names in it, the ink still wet. He keeps his thumb on them.` : `Ohl is boiling water in the squad's pot, because he can. "Clean water," he says, with deep satisfaction. "Out of a clean stream. No one's prayed in it, no one's poured anything sweet into it." He drinks. "I'd forgotten."`);
      if (b8In('sohra')) ln.push(late ? `Sohra has her bone cup in her lap. "The bones fell all one way this morning," she says. "West." She shakes the cup gently. "They are in a hurry. I do not know why bones would hurry."` : `Sohra is sitting in the grass beyond the firelight, where only her head shows, the way the Rhivi sit on the plain. "This is good grass," she says. "Not ours. But good." She looks happier than she has since Coral.`);
      if (b8In('greysword')) ln.push(late ? `Dannet is oiling the grey shield. "A road, a wall, a gate," she says. "I have held all three. A gate is easiest. Everyone must come through it, and you know where." She keeps oiling the shield.` : `Dannet stands the first watch at the ring's north side with the grey shield grounded. "The Wolves like this place," she says. "Too much, perhaps. They keep wanting to run."`);
      if (b8In('ellis')) ln.push(late ? `Ellis has walked out to the milestone and back without anyone seeing her go. "City boots," she says, sitting down. "Four sets, maybe five. Soft soles. They stood about a while and argued." She almost smiles. "The Claw never argued in the road."` : `Ellis is lying flat at the edge of the ring with her chin on her hands, watching the grass. "Three riders north," she says. "One more further out who thinks nobody's seen him." She does not move. "And something else, a long way off, going west fast. I don't know what."`);
      if (b8In('vell')) ln.push(late ? `Vell is knotting a cord and undoing it, faster than usual. "The Guild on a road," he says. "They hate roads. No lines to swing on, nowhere to drop from." He pulls a knot tight. "They'll be cross. Cross is careless."` : `Vell is looking unhappily at the grass. "No roofs," he says. "Two days of no roofs." He brightens slightly. "The city's all roofs. Tomorrow, or the day after."`);
      if (b8In('brannoc')) ln.push(late ? `Brannoc has been quiet since the outrider came back, which for Brannoc is a wound. "On a ship," he says at last, "you see them coming a league off. Here they're under the grass." He scowls at it. "I'd take a ship."` : `Brannoc is telling the carters about a Falari feast-day that went on a whole season and nobody minded. "The Fete's nothing to it," he says. The carters do not believe him, which he enjoys.`);
      if (b8In('ressa')) ln.push(late ? `Ressa has her hands round a cup of Ohl's clean water. "The Fete's last night," she says. "In the temples we used to sit up for it, with the sick, because the bells went all night and nobody slept anyway." She drinks. "I'd like to hear bells."` : `Ressa is sitting with Benna at the tubs, helping wring, which Benna allows. "She was a temple washer once, in the Daru tier," Ressa says, coming back. "She says it's the same work. She says the priests were dirtier."`);
      if (b8In('vasso')) ln.push(late ? `Vasso is sitting very straight with his back to a wheel. "That chalk's for us," he says. "That's the Guild's road mark. It means they're waiting, and it means where." He looks west. "I know some of the ones who'd be sent. I don't want to know which."` : `Vasso is listening to the dark with his head up. "No bells," he says. "Two days and no bells. I keep waking to count them." He listens a while longer. "When we're in, I'll hear the old one first. Low, under everything. It's how I'll know."`);
      if (b8In('edrem')) ln.push(late ? `Edrem has the mace across his knees. "A road, and men waiting on it to hurt the people walking it," he says. "I know that one. I have stood on that one for years." He looks at you. "Tell me where to stand."` : `Edrem is standing; it is how he sits. "The sky," he says. "I keep looking up. In the Domin you did not look up. There was nothing up there you wanted to see." He keeps looking.`);
      return {sp:'The halt', scene:'b8_lamatath', txt:ln.length ? ln.join('\n\n') : `It is quiet at the fire. You sit with the ledger, and the grass, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b8_c5_fire'}]}; },

    /* ---- the night: something runs through the grass toward the city (the Hounds of Shadow: never fought, never named by the narrator
       as more than Hounds, never looking at the squad; they are going toward Darujhistan, correction 6) ---- */
    b8_c5_sleep:()=>({sp:'The halt · night', scene:'b8_c5_night', fx:()=>{ S.f.b8_c5_hounds = 1; }, txt:
`You sleep in turns, two awake at a time. The fire goes down to embers. The stars come out over the Lamatath so thick that Kettle, on watch, gives up counting them.

In the small hours the teams wake before anyone does. Every horse in the ring comes up off the ground at once, screaming, and pulls at its tether, and the carters roll out from under the wagons cursing. And then you hear it. Not a sound, quite: a pressure, like the moment before thunder, coming over the grass from the east, and with it a long hiss of grass bending, a great deal of grass, very fast.

Something is running through the grass. More than one. Big. Going west.${b85If('tuft', `\n\nTuft is on her feet with her hand over her mouth. "Shadow's," she says, through her fingers. "Hounds." She does not move. "Don't look at them. Don't let them see you looking."`)}`,
      ch:[{t:'Hold the teams before they tear the wagons over.', check:['might', 15],
            edges:id=>[id === 'sohra' && ['Rhivi: she has held a herd through worse', 3], id === 'brisk' && ['she has hung onto worse than a horse', 2], id === 'edrem' && ['he has held carts on a road before', 2], id === 'greysword' && ['a Grey Sword can hold a line of anything', 1], id === 'sgt' && ['you held the Host\'s wagons on a ford, once', 1], id === 'tuft' && ['she cannot take her eyes off the grass', -1], id === 'vasso' && ['he has never held a horse in his life', -1]],
            near:{t:()=>`Yes, but the near-side horse of the second team goes up on its hind legs and comes down with ${b85Nm(b85Who())} still hanging on its head, and something in ${b85Nm(b85Who())}${b85Who() === 'sgt' ? 'r' : '\'s'} arm takes the weight of it. Stiff with it in the next fight.`, fx:()=>bruise(b85Who(), bruiseN())},
            go:'b8_c5_night_held', fail:'b8_c5_night_loose'},
          {t:'Let the horses go. Get the squad down flat in the grass, and keep still.', go:'b8_c5_night_flat'}]}),
    b8_c5_night_held:()=>({sp:'The halt · night', scene:'b8_c5_night', fx:()=>{ S.f.b8_c5_teams = 'held'; }, txt:
`The teams hold, just, with the Fourth on their heads and the carters on their tethers, and through it all the grass goes on bending out there in the dark, long lines of it laid over flat and springing up again, going west faster than horses run.

You see them once, for a breath, between two waves of grass: dark shapes, long and low and far too big, running with their heads down. They do not look at the wagons. They do not turn aside for them. The wagons are not what they are about.

And then they are gone, west, and the grass is only grass, and the horses stand trembling in the traces with their eyes rolling white.${b85If('edrem', `\n\nEdrem lets go of the shaft he was holding, finger by finger. "Toward the city," he says. "Your city."`)}`,
      ch:[{t:'Lie down again, if anyone can.', go:'b8_c5_dawn_go'}]}),
    b8_c5_night_loose:()=>({sp:'The halt · night', scene:'b8_c5_night', fx:()=>{ S.f.b8_c5_teams = 'loose'; }, txt:
`The second team tears its tether out of the ground and goes, wagon and all, bucking across the ring, and the wagon goes over on its side with a crack you feel in your teeth. The rest hold. Out in the dark the grass goes on bending in long lines, westward, very fast, and then it is only grass again.

The wagon's front axle is cracked. Calder looks at it by lantern-light for a long breath, swears at it in three languages, and then says, "By morning," and the carters get the jack out.${b85If('kettle', `\n\nKettle is under the wagon before the jack is. "I can splint it," she says. "Sappers splint everything."`)}`,
      ch:[{t:'Lie down again, if anyone can.', go:'b8_c5_dawn_go'}]}),
    b8_c5_night_flat:()=>({sp:'The halt · night', scene:'b8_c5_night', fx:()=>{ S.f.b8_c5_teams = 'flat'; }, txt:
`Down flat in the grass, all of you, faces in the earth, the carters too when they see the Fourth do it. The horses scream and pull and some of them get loose and are gone into the dark.

Out there the grass bends in long lines, westward. Something goes past near enough that the ground under your cheek shakes with it, near enough to smell: dust, and cold, and something like the inside of a stone. It does not stop. It does not look. You keep your eyes shut until it is a long way off, and then a while longer.

The carters spend the rest of the night bringing horses back in out of the grass. They get most of them.`,
      ch:[{t:'Lie down again, if anyone can.', go:'b8_c5_dawn_go'}]}),
    b8_c5_dawn_go:()=>({sp:'The halt · first light', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_ph = Math.max(2, S.f.b8_c5_ph || 1); }, txt:
`First light comes up grey and then gold over the grass behind you. Hardly anyone slept.

The outrider is already out in it, walking slowly away from the ring along a line of grass that has not sprung back, bent flat and pointing west, and stopping every so often to crouch and look. She waves you over.`,
      ch:[{t:'Go and see.', go:'b8_c5_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the dawn: the outrider reads the grass (the trick, ✦ wits 17; the cloak either way) */
    b8_c5_dawn:()=>({sp:'The outrider', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_outrider = 1; if (!S.f.b8_c5_cloak) { S.f.b8_c5_cloak = 1; b85Gain('b8_c5_grasscloak'); } }, again:()=>'The outrider, crouched in the bent grass, reading it.', txt:
`She is crouched in the bent grass with her hand flat on it, as if feeling a horse's flank. The line goes away west as far as the eye goes, a road of flattened grass, and there are others beside it, three, four, more.

"Here, they were running," she says. "Here, one stopped, and turned, and went on." She points at grass that looks to you like any other grass. "See where it has come back up and where it has not. See where the crickets have not started again." She looks up at you. "My mother read the grass for the old clans. Whatever this was, it was not the old clans. It was going to your city, and it did not care about anything on the way."

She stands, and takes off her cloak, which is the colour of the grass, and holds it out. "You'll want this tonight. Lying down in the grass, you will be grass." She does not say more about it.${b85If('sohra', `\n\nSohra is already down on her heels beside the line, reading it with her fingertips, and the outrider watches her and nods once.`)}`,
      ch:[{t:'Learn to read it: the lie of the grass, the crickets, where it has come back up.', check:['wits', 17], trick:'b8_c5_grass', req:()=>!S.f.b8_c5_grassTried, fx:()=>{ S.f.b8_c5_grassTried = 1; },
            edges:id=>[id === 'sohra' && ['Rhivi: she read the grass of her own plain before she could ride', 3], id === 'ellis' && ['the Claw taught her to read a road', 2], trickBy('b4_c6_listen') === id && ['the Long Listen: the same craft by ear', 2], id === 'tuft' && ['Shadow touched her, and she can feel where it went', 1], id === 'sgt' && ['the Rhivi Plain, years ago, and an outrider who showed you the same thing', 1], id === 'edrem' && ['years on a road watching who came along it', 1], id === 'vasso' && ['a city boy: grass is a thing in a park', -1], id === 'brannoc' && ['he reads water, not grass', -1], id === 'kettle' && ['she keeps trying to count the blades', -1]],
            near:{t:()=>`Yes, but it will not come right until ${b85Nm(b85Who())} ${b85V(b85Who(), 'have', 'has')} walked the whole line of the thing's running on hands and knees, a long way west, with that smell still in the bent grass, and ${b85Nm(b85Who())} ${b85V(b85Who(), 'come', 'comes')} back to the wagons with it in ${b85Who() === 'sgt' ? 'your' : 'their'} head: rattled.`, fx:()=>b85Rattle(b85Who())},
            go:'b8_c5_dawn_ok', fail:'b8_c5_dawn_no'},
          {t:'Walk the line with her a while, and leave the reading to the plains.', go:'b8_c5_dawn_walk'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_dawn_ok:()=>({sp:'The outrider', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_grassOk = 1; S.f.b8_c5_dawn = 1; }, txt:
`By the time the wagons are in the traces ${by({sgt:'you can', sohra:'Sohra can, and has been able to all along, and is gracious about it,', ellis:'Ellis can, and is already doing it to the carters for practice,', _:'{who} can'})} see it: where the grass lies over and where it springs, where the insects have gone quiet, the line of a thing that went by. Not much. Enough to know a breath sooner.

The outrider watches the last of it with her arms folded. "That will do," she says. "In a city it works on faces. Watch who has stopped moving." She goes to her horse.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b8_c5_dawn_no:()=>({sp:'The outrider', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_dawn = 1; }, txt:
`It is grass. It goes on being grass. She points at a place where something stopped and turned, and you look, and it is grass.

"Plains children take a few summers over it," the outrider says, not unkindly. "You have had a morning." She goes to her horse.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b8_c5_dawn_walk:()=>({sp:'The outrider', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_dawn = 1; }, txt:
`So you walk the line with her a while, westward, in the bent grass, and she points and you nod, and neither of you says much. A long way out the lines go over a low rise and are gone, toward the city.

"Fast," she says at last. "Faster than a horse, and not tired." She turns back to the wagons. "I'd not want to be where they are going."`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* ======== phase 2: the road west, the dry wash, the peddler ======== */
    b8_c5_wash_arrive:()=>({sp:'The dry wash', scene:'b8_c5_wash', fx:()=>{ S.f.b8_c5_washSeen = 1; }, txt:
`The road dips into a dry wash between banks of grey stone and climbs out the far side. Down on the stones a cart has stopped, a mule standing in the shafts with its head down, and on the cart, packed in straw and roped down, stoppered jugs. A lot of them.

A man in a good travelling coat is sitting on the cart's tail eating bread. Two riders are lying in the shade of the bank with their horses' reins round their wrists. And behind the cart, sitting on the stones with his knees up, a thin man in a pilgrim's robe is smiling at nothing, with his mouth stained dark at the corners.

The smell reaches you before the man looks up. Fruit, gone over. And under it the other thing.${b85If('edrem', `\n\nEdrem stops at the top of the bank. A moment, then: "That one behind the cart walked my road. Last spring. I remember his face. He was frightened then."`)}${b85If('ohl', `\n\nOhl stops too. "Oh," he says, quietly. "Not here as well."`)}`,
      ch:[{t:'Go down.', go:()=>startExplore()}]}),
    b8_c5_peddler:()=>({sp:'The peddler', scene:'b8_c5_wash', fx:()=>{ S.f.b8_c5_pedMet = 1; }, again:()=>'The peddler on his cart\'s tail, with the jugs behind him.', txt:
`The peddler gets up off the cart's tail and dusts the crumbs from his coat. He is a soft-spoken man of the Domin with clean hands and a careful smile, the kind of man who sells things.

"Guards," he says. "From the wagons behind. I saw your dust." He spreads his hands. "Going home? So am I, in a way. Going west." He pats a jug. "Darujhistan has never had this. Imagine. A whole city, and the Fete going, and nobody in it has ever had the fear taken off them." His smile does not change. "Someone has to be first."${b85Burned4() ? `\n\n"And there will not be much more on this road for a while," he says. "Some fools burned the stores at the camp's far edge. This may be the last of it going west for a season. The price will be very good."` : ''}${b85Jug() && !S.f.b8_c5_jug ? `\n\nHe stops, and sniffs, and looks at the squad's kit with new interest. "One of you is carrying a jug already. I would buy it back from you. A good price."` : ''}`,
      ch:[{t:'"Where did it come from? Who sent you?"', req:()=>!S.f.b8_c5_pedWho, go:'b8_c5_peddler_who'},
          {t:'"Pour it out. Every jug. Here, on the stones."', go:'b8_c5_peddler_pour'},
          {t:'"The jug we carry isn\'t for sale. Watch."', req:()=>b85Jug() && !S.f.b8_c5_jug, go:'b8_c5_jug'},
          {t:'"The city\'s not our business. Go on."', go:'b8_c5_peddler_let'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_peddler_who:()=>({sp:'The peddler', scene:'b8_c5_wash', fx:()=>{ S.f.b8_c5_pedWho = 1; }, txt:
`"From the camp," he says. "Outside the dark city. Where the god sleeps under the gifts." He says it reverently, and then the smile comes back. "Not from him, of course. He gives nothing. From the other one, the one the priests speak for, who gives this." He touches the jug again. "Nobody sent me. I sent myself. I have a cart and a mule and an idea."${b85If('edrem', `\n\nEdrem has come down the bank behind you. "The one behind your cart," he says. "Does he walk all the way to the city, on what you give him?"\n\n"He walks very happily," the peddler says.`)}${b85If('vasso', `\n\nVasso has been looking at the riders. "They're not his," he says, low. "They're hired. They'll want paying whether he lives or not."`)}`,
      ch:[{t:'Back to the peddler.', go:'b8_c5_peddler'}]}),
    b8_c5_peddler_pour:()=>({sp:'The peddler', scene:'b8_c5_wash', txt:
`The peddler stops smiling. Behind him, in the shade of the bank, the two riders sit up.

"That," he says, "is a cart and a mule and every coin I have, and a season's walking. You are guards for another man's wagons. You have no say over mine."`,
      ch:[{t:'"No. Off the cart." Take it from him.', go:()=>startBattle('b8_c5_peddler', {})},
          {t:'Talk to him: about the camp, and the city, and what it costs. Make him pour it himself.', check:['guile', 16],
            edges:id=>[id === 'ohl' && ['he has seen the prices, and can name them', 3], id === 'edrem' && ['he walked the man behind the cart up the road himself', 2], id === 'vasso' && ['he knows the city: there is no buyer in it who would not cut this man\'s throat for the cart', 2], id === 'ressa' && ['the temples, and the fevers that took them smiling', 1], id === 'sgt' && ['you have talked worse men out of worse', 1], id === 'brisk' && ['she makes it a threat whether she means to or not', -1], id === 'kettle' && ['she cannot keep the contempt out of it', -1]],
            near:{t:()=>`Yes, but before he pours he makes ${b85Nm(b85Who())} hold the first jug while he unstoppers it, and the smell of it comes up into ${b85Nm(b85Who())}${b85Who() === 'sgt' ? 'r' : '\'s'} face, sweet, and stays: rattled.`, fx:()=>b85Rattle(b85Who())},
            go:'b8_c5_peddler_talked', fail:'b8_c5_peddler_row'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_peddler_talked:()=>({sp:'The dry wash', scene:'b8_c5_wash', fx:()=>{ S.f.b8_c5_peddler = 'poured'; if (!S.f.b8_c5_pack) { S.f.b8_c5_pack = 1; b85Gain('b8_c5_peddlerpack'); } b85L('ohl', 1); b85L('edrem', 1); }, txt:
`It takes a long while, and most of the squad's patience, and in the end it is not any one thing that does it. It is the man behind the cart, maybe, who has started to laugh at nothing and cannot stop.

The peddler unstoppers the jugs himself, one after another, and pours them out on the grey stones of the wash, and the stuff runs dark between the stones and soaks in and is gone, and the smell comes up very strong and then thins. His hands are shaking by the end. The riders watch from the bank and decide this is not a thing they were paid to stop.

When the cart is empty he sits on its tail with his empty hands in his lap. Then he gets down and turns the mule round, east. He leaves his pack on the cart. "Take it," he says. "There is nothing in it now I want." The man in the pilgrim's robe goes after him, slowly, still laughing.${b85If('edrem', `\n\nEdrem watches them out of the wash. "He will want it again tonight," he says. "And tomorrow. And then a little less." He does not sound sure.`)}`,
      ch:[{t:'Back along the road to the wagons.', go:()=>startExplore()}]}),
    b8_c5_peddler_row:()=>({sp:'The dry wash', scene:'b8_c5_wash', txt:
`He listens to all of it with his careful smile, and when you have finished he says, very politely, "No," and lifts one hand, and the riders come up off the bank with their blades already out.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c5_peddler', {})}]}),
    b8_c5_peddler_after:()=>({sp:'The dry wash', scene:'b8_c5_wash', fx:()=>{ S.f.b8_c5_peddler = 'stopped'; if (!S.f.b8_c5_pack) { S.f.b8_c5_pack = 1; b85Gain('b8_c5_peddlerpack'); } if (!S.f.b8_c5_sword) { S.f.b8_c5_sword = 1; b85Gain('b8_c5_raidersword'); } b85L('ohl', 1); }, txt:
`The riders who could ride have ridden. The peddler is sitting in the stones of the wash with his back to a wheel and a cut over his eye, holding it, and the man in the pilgrim's robe is beside him, not laughing now, shaking.

The jugs go one by one onto the stones of the wash and break there, and the stuff runs between the stones and soaks into the dry ground and is gone. It takes a while. The smell is very bad and then it thins. The peddler watches every jug go and does not say a word until the last.

"Take the pack," he says then, dully. "Take the mule. I have nothing to sell." He leaves the mule. He takes the man in the pilgrim's robe by the arm, and they walk back east up the bank, slowly, two men with nothing.${b85Say({ohl:`\n\nOhl watches them go. "Some of it'll come back on that one, tonight," he says, of the shaking man. "The wanting. Then less. Then less." He breathes out. "I'd stay with him, if we weren't going the other way."`, _:''})}${b85If('vasso', `\n\nVasso looks at the wet stones. "It wouldn't have got through the gate anyway," he says. "Not on the last day of the Fete. Somebody would have had the cart off him before the toll-men did." He shrugs. "Better here."`)}`,
      ch:[{t:'Back along the road to the wagons.', go:()=>startExplore()}]}),
    b8_c5_peddler_let:()=>({sp:'The peddler', scene:'b8_c5_wash', fx:()=>{ S.f.b8_c5_peddler = 'let'; b85L('ohl', -1); b85L('edrem', -1); }, txt:
`The peddler bows a little, with his careful smile, and climbs back on the cart's tail. "Very sensible," he says. "A guard guards what he is paid to guard."

${b85Say({ohl:`Ohl turns round and walks back up out of the wash without a word, which from Ohl is a long speech.`, _:`It does not feel sensible, walking back up out of the wash with the smell of it on the wind behind you.`})}${b85If('edrem', `\n\nEdrem stays at the top of the bank a while, looking down at the man behind the cart. Then he comes away, and is quiet all afternoon.`)}`,
      ch:[{t:'Back along the road to the wagons.', go:()=>startExplore()}]}),
    /* the jug from Ch 2's wagon, if the squad still carries it */
    b8_c5_jug:()=>({sp:'The peddler', scene:'b8_c5_wash', fx:()=>{ S.f.b8_c5_jug = 'poured'; unwear('b8_kelykjug'); S.kit = (S.kit || []).filter(k => k !== 'b8_kelykjug'); b85L('ohl', 1); note('The jug of kelyk goes out on the stones of the dry wash.', 'good'); }, txt:
`You take the jug out of the kit, stoppered, sticky at the neck, the one off the merchant's wagon on the road east, and pull the stopper, and pour it out on the grey stones at the peddler's feet while he watches.

It runs between the stones and is gone. You set the empty jug on his cart with the others.

"That was a good price," he says, after a while. "I would have given a good price."${b85If('ohl', `\n\nOhl has his arms folded, and the corner of his mouth has gone up, which is as near as Ohl comes.`)}`,
      ch:[{t:'Back to the peddler.', go:'b8_c5_peddler'}]}),
    b8_c5_cart:()=>({sp:'The cart', scene:'b8_c5_wash', again:()=>'The peddler\'s cart in the wash.', txt: S.f.b8_c5_peddler === 'let' ?
`The cart's ruts go on west out of the wash and up the far bank. He has gone on.` : S.f.b8_c5_peddler ?
`The cart stands empty in the wash, its straw wet and dark. The stones under it smell sweet, and will for a while, and then they will not.` :
`Jugs, packed in straw, roped down, each one stoppered with wax and pressed with a thumb-mark. ${b85Passed() ? 'Some of them have a seal on the shoulder you have seen before: a wheel and a key. The merchant\'s mark, from the wagons the Fourth guarded east. They have come round the long way and are going home.' : 'None of them carry a Daru seal. Whatever the merchant was carrying east burned in the fields on the road. This came from somewhere else.'}${b85Burned4() ? ' The last of it on this road, the peddler said.' : ''}`,
      ch:[{t:'Back to the wash.', go:()=>startExplore()}]}),
    b8_c5_wash_back:()=>({sp:'The dry wash', scene:'b8_c5_wash', txt:
`East, up out of the wash, the road runs back to where the wagons are coming on in the dust.${b85PedDone() ? '' : ' The cart is still here, and so is he.'}`,
      ch:[{t:'Back to the wagons.', onward:true, go:()=>{ startExplore('b8_c5_road'); if (b85PedDone() && !S.f.b8_c5_eve2) talk('b8_c5_eve2'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_eve2:()=>({sp:'The halt', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_eve2 = 1; }, txt:
`The wagons have come up to the halt by evening, in a ring again, on a low swell of the grass where you can see a long way west. Out at the edge of the sky there is a smudge that is not cloud. Calder looks at it a long time.

"The city," he says. "Tomorrow, by dusk, if we push." He goes to see to the teams.${b85If('vasso', `\n\nVasso stands on a wagon's tailboard and looks at the smudge until the light goes, and keeps his hands very still on his knees.`)}`,
      ch:[{t:'To the fire.', go:'b8_c5_fire'}]}),

    /* the second night, and the last morning */
    b8_c5_sleep2:()=>({sp:'The halt · the last night on the grass', scene:'b8_c5_night', txt:
`The last night on the grass. Nothing runs through it. The horses sleep. The carters sleep. Even Kettle sleeps on her watch, a little, and is ashamed of it in the morning.

Before dawn there is a glow low in the west, very faint: the city's blue fire, under the edge of the sky.${S.f.b8_c5_peddler === 'let' ? `\n\nAnd in the night, a long way ahead on the road, one sound: a mule screaming, and then not.` : ''}`,
      ch:[{t:'Up. The last day.', go:'b8_c5_lastday'}]}),
    b8_c5_lastday:()=>({sp:'The last day', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_ph = Math.max(3, S.f.b8_c5_ph || 1); }, txt:
`The Fete's last day. The wagons are in the traces before the sun is up, and the teams lean into them as though they can smell their own stables.${S.f.b8_c5_peddler === 'let' ? ' A little way along the road the outrider stops, and waits for you to come up.' : ''}

Half a morning on, where the road passes a milestone, the outrider stops again and waits, and this time she does not look happy. On the milestone, low down where a carter would not look, there is chalk.`,
      ch:[...(S.f.b8_c5_peddler === 'let' && !S.f.b8_c5_wreck ? [{t:'What has she found on the road?', go:'b8_c5_wreck'}] : []),
          {t:'The milestone.', req:()=>S.f.b8_c5_peddler !== 'let' || !!S.f.b8_c5_wreck, go:'b8_c5_milestone'}]}),
    /* the peddler let go: his cart smashed in the grass, the jugs broken, the mule gone, his tracks running east. Never a body. */
    b8_c5_wreck:()=>({sp:'The road west', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_wreck = 1; if (!S.f.b8_c5_pack) { S.f.b8_c5_pack = 1; b85Gain('b8_c5_peddlerpack'); } }, txt:
`The peddler's cart is lying on its side in the long grass a little off the road, where he must have camped. One wheel is gone altogether. The jugs are broken, all of them, in a long spray across the grass, and the grass there has gone brown and sticky, and the flies have found it.

There is no mule. There is no peddler. There are his tracks, and the other man's, going back east through the grass at a run, a long stride, the stride of men who ran until they could not. Over all of it, through the camp, the grass is bent flat in a line going west, very wide.

"Something came back through," the outrider says. "Or more of them, behind the first." She looks at the broken jugs. "It did not care about these either."${b85If('ohl', `\n\nOhl stands over the broken jugs a while. "Well," he says. "It never got there." He does not sound as glad as he means to.`)}${b85If('edrem', `\n\nEdrem looks east along the running tracks. "They lived," he says. "That is something." He says it like a prayer.`)}

The peddler's pack is lying in the grass by the cart, its pockets open. No one is coming back for it.`,
      ch:[{t:'Take the pack. On to the milestone.', go:'b8_c5_milestone'}]}),
    b8_c5_milestone:()=>({sp:'The milestone', scene:'b8_lamatath', fx:()=>{ S.f.b8_c5_chalk = 1; }, again:()=>'The milestone, and the chalk on it.', txt:
`A milestone of the old grey stone, leaning, with the city's leagues cut in it and weathered nearly smooth. Low down on the side away from the road, where a carter would not look and a walker would, somebody has drawn in chalk: a short line, a hooked line, a mark like a closed eye.

${b85Reader() === 'vasso' ? `Vasso crouches by it and goes very still. "The Guild's road mark," he says. "Waiting ahead. This road. Today." He touches the closed eye without quite touching it. "And that means the job is taken. Somebody's on it." He stands up. "A league on there's a wayhouse that burned, on a rise. That's where I'd wait, if it was me." His eyes are on the chalk. "It isn't me. It was nearly."` : b85Reader() === 'vell' ? `Vell crouches by it. "Guild," he says. "Road mark. It means wait, and it means ahead." He frowns at the closed eye. "And that one means the paper's taken. They're on it." He looks west. "A league on, there's a rise. The outrider said a wayhouse burned up there once."` : `It means nothing to you. It means something to the outrider. "City men," she says. "Four or five. Soft boots. They came out of the west yesterday, stood here and argued, and drew this, and went back a league to the burned wayhouse on the rise." She looks at you. "They are not waiting for Calder. Calder has never been worth a knife."`}${b85If('ellis', `\n\nEllis looks at the chalk and then at the ground round the stone. "Four," she says. "One of them heavier, with a crossbow on his back; you can see where he leaned it."`)}`,
      ch:[{t:'Decide.', req:()=>!b85Key(), go:'b8_c5_key'},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ======== the key: the road ======== */
    b8_c5_key:()=>({sp:'The last day', scene:'b8_lamatath', html:contractHTML(), txt:
`The Guild is waiting on the road a league ahead, at a burned wayhouse on a rise, for the Fourth to come along it with the wagons. The gate shuts at dusk.

There are two ways to do this. You can push the teams hard all day and go round the rise through the grass where the outrider knows the ground, and make the gate before it shuts, and leave the Guild sitting in its wayhouse watching an empty road. Or you can leave the wagons to come on slow with Calder, and go up the back of the rise on foot, the Fourth alone, and find them first.

${b85Say({brisk:`"Find them," Brisk says. "In the open, in daylight, our side of the wall. Not in the city, in the dark, on their roofs." That is her vote.`, _:''})}${b85Say({kettle:`${b8In('brisk') ? '\n\n' : ''}"Go round," Kettle says. "Every fight we don't have is a fight we win." That is hers.`, ohl:`${b8In('brisk') ? '\n\n' : ''}"Go round," Ohl says. "I'd like to get home with the same number I left with." That is his.`, _:''})}${b85If('vasso', `\n\nVasso says, "If we go round, they'll know we went round. They'll be cross. They'll come to the door." He swallows. "If we go up, some of them won't come to the door."`)}${b85If('edrem', `\n\n"I go where you stand," Edrem says. "Either way."`)}`,
      ch:[{t:'"We push for the gate, and go round them." Fast.', fx:()=>{ if (!S.f.b8_c5_key) { S.f.b8_c5_key = 'fast'; b8Con(1, 'they slipped the knives'); } S.f.b8_c5_ph = 3; b85L('kettle', 1); b85L('ohl', 1); b85L('brisk', -1); }, go:'b8_c5_fast'},
          {t:'"We go up the back of the rise, and find them first." Wary.', fx:()=>{ S.f.b8_c5_key = S.f.b8_c5_key || 'wary'; S.f.b8_c5_ph = 3; b85L('brisk', 1); b85L('vasso', 1); b85L('ohl', -1); }, go:'b8_c5_wary'},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ---- 'fast': round the knives through the grass, and the gate before it shuts ---- */
    b8_c5_fast:()=>({sp:'The road west', scene:'b8_lamatath', html:contractHTML(), txt:
`So the Fourth pushes. The outrider takes the wagons off the road a mile short of the rise and round through the grass where the ground is firm, wide of the wayhouse, the teams leaning into the traces and the carters walking at their heads, and the Fourth walking at the back of the line with their eyes on the rise the whole way.

Nothing comes down off it. Up on the rise the wayhouse stands black against the sky with its three walls, and once, as the wagons pass wide, something moves on the roof beam and is still again.${b85If('vasso', `\n\nVasso watches the beam until it is behind the hill. "They saw," he says. "They'll know by tonight who went round them." He does not sound sorry.`)}

The light is going when the road comes back to you, and the wall of the city stands up out of the grass ahead, high and dark, with lanterns all along the top of it.`,
      ch:[{t:'To the gate.', onward:true, go:()=>{ startExplore('b8_c5_gate'); talk('b8_c5_gate_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- 'wary': up the back of the rise to the burned wayhouse; the lie-up check (contract:true), then the fight ---- */
    b8_c5_wary:()=>({sp:'The rise', scene:'b8_c5_wayhouse', html:contractHTML(), txt:
`So the wagons come on slow behind with Calder, and the Fourth goes ahead on foot, off the road and round, through the long grass, and up the back of the rise where the wayhouse stands.

It is late in the day. The grass on the rise has gone copper. Above it, the wayhouse: three black walls and a roof beam, burned out years ago, the kind of place no carter stops at because somebody once died in it.${b85If('vasso', `\n\n"Up there," Vasso breathes. "On the beam, one. A bow. The rest along the walls inside, waiting for wagons." He has his knives out. He has never put them in anybody.`)}`,
      ch:[{t:'Up to the wayhouse.', onward:true, go:()=>{ startExplore('b8_c5_rise'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_lieup:()=>({sp:'The burned wayhouse', scene:'b8_c5_wayhouse', again:()=>'The burned wayhouse on the rise, and the knives in it.', txt:
`From the long grass below the back wall you can hear them: somebody shifting his feet on charcoal, a low voice, a laugh cut short. The front of the wayhouse looks down on the road. The back of it looks down on you, and nobody is looking.

There is a little time. Enough to find where each of them is lying up, and get the squad round to where they are not expecting anyone, if the grass is kind and the Guild is careless.`,
      ch:[{t:'Find each of them, and come at them from the back of the rise.', check:['wits', 16], contract:true,
            edges:id=>[S.tricks && S.tricks.b8_c5_grass && ['Grass-Running: the grass tells on them', 2], id === 'vasso' && ['he knows where a Guild knife lies up, because he was taught where', 3], id === 'vell' && ['a roof-runner knows which beam will bear a man', 2], id === 'ellis' && ['Claw-trained: she has done exactly this', 2], id === 'sgt' && ['you have come up the back of worse hills', 1], id === 'brisk' && ['a heavy in mail on charcoal', -1], id === 'brannoc' && ['he talks under his breath when he is frightened', -1]],
            near:{t:()=>'Yes, but a boy the Guild left minding the horses in a hollow down the far side sees the squad going up, and is away on a pony toward the city before anyone can stop him. Someone on a roof saw it: the Contract +1.', fx:()=>b8Con(1, 'someone on a roof saw it')},
            go:'b8_c5_lieup_ok', fail:'b8_c5_lieup_loose'},
          {t:'No time. Straight in at the gap.', go:()=>startBattle('b8_c5_knives', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_lieup_ok:()=>({sp:'The burned wayhouse', scene:'b8_c5_wayhouse', fx:()=>{ S.f.b8_c5_found = 1; }, txt:
`One by one you find them: a knife behind the left wall where the window was, another in the corner with his back to the charcoal, the crossbow in the gap where the door was, facing the road. All of them facing the road. The Fourth comes up out of the copper grass at their backs.`,
      ch:[{t:'Now.', go:()=>startBattle('b8_c5_knives', nearMiss() ? {} : {surprise:'p'})}]}),
    b8_c5_lieup_loose:()=>({sp:'The burned wayhouse', scene:'b8_c5_wayhouse', txt:
`Charcoal turns under somebody's boot. Inside the walls the voices stop all at once, and a man's head comes up over the sill of the burned window and sees you.`,
      ch:[{t:'Go in.', go:()=>startBattle('b8_c5_knives', {})}]}),
    b8_c5_knives_after:()=>({sp:'The burned wayhouse', scene:'b8_c5_wayhouse', fx:()=>{ if (!S.f.b8_c5_knivesDone) { S.f.b8_c5_knivesDone = 1; S.f.b8_c5_scouted = 1; b85L('brisk', 1); } }, txt:
`It is quiet on the rise. The grass round the wayhouse is copper and then grey, and the wind is moving over it again. The ones who could run have run, west, toward the city, which is where they will be waiting next time. The others are not running anywhere.

Below, on the road, Calder's wagons are coming on slowly, and the carters are looking up at the rise.${b85Say({vasso:`\n\nVasso is sitting on a fallen stone with both his knives across his knees, clean. "The one with the bow," he says. "He taught me knots." After a while he puts the knives away. "Still never put it in anybody. There was always somebody nearer." He sounds less sure, this time, that he is glad.`, brisk:`\n\nBrisk leans on her shield and breathes. She salutes the wayhouse, two fingers. "Yours, Hood," she says. "Not mine."`, _:''})}${b85If('edrem', `\n\nEdrem stands at the front of the wayhouse where the road can see him, until the wagons are past.`)}

You know now how they wait on a road, and where they lie up, and which way they look. That will be worth something, in the city.`,
      ch:[{t:'On to the gate.', go:()=>startExplore()}]}),
    b8_c5_wayhouse:()=>({sp:'The burned wayhouse', scene:'b8_c5_wayhouse', txt: S.f.b8_c5_knivesDone ?
`Inside the three walls, charcoal underfoot and the roof beam overhead and the sky through it. Somebody's blanket. A water-skin. A paper folded small in a crack in the wall, blank on both sides, which in the Guild is a joke, ${b8In('vasso') ? 'Vasso says' : 'probably'}.` :
`The wayhouse looks down on you from the rise. Something in it shifts, and is still.`,
      ch:[{t:'Back down.', go:()=>startExplore()}]}),
    b8_c5_rise_back:()=>({sp:'The rise', scene:'b8_c5_wayhouse', txt:
`Down the rise is the road, and Calder's wagons coming on along it slowly.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore('b8_c5_road')}]}),
    b8_c5_rise_on:()=>({sp:'The road west', scene:'b8_c5_wayhouse', txt: S.f.b8_c5_knivesDone ?
`West, down off the rise, the road, and the wall of the city standing up out of the grass with lanterns all along the top of it. The wagons fall in behind you. The light is going.` :
`West. Not with them sitting on the rise behind you.`,
      ch:[...(S.f.b8_c5_knivesDone ? [{t:'To the gate.', onward:true, go:()=>{ startExplore('b8_c5_gate'); talk('b8_c5_gate_arrive'); }}] : []),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 4: the east gate at dusk on the Fete's last day ======== */
    b8_c5_gate_arrive:()=>({sp:'The east gate', scene:'b8_c5_gate', fx:()=>{ S.f.b8_c5_ph = 4; S.f.b8_c5_gateSeen = 1; S.f.b8_c5_torches = 1; }, txt:
`Darujhistan's wall stands up out of the grass, high and dark, with lanterns all along the top of it and masks among the lanterns: people up on the wall-walk to watch the last of the Fete, faces of birds and beasts and painted moons. Over the wall the city's noise comes like surf, music and bells and a hundred thousand people in the streets, and above it the blue fire of the upper city coming up into the dusk.

The gate is open. There is a queue at it, carts and walkers, and toll-men at the bars, and a gate-captain looking at the sky and then at the queue.

You look back once, east, the way you came. Far off on the darkening plain, where another road crosses the old east road, there are four torches on tall poles, small as sparks at this distance, and one figure standing among them, alone. Waiting. Not for anyone on this road.

Then the queue moves, and you turn round.${b85If('tuft', `\n\nTuft has looked back too. She looks for a breath longer than you did, and then away, quickly. "Don't," she says. "Whoever that is, it's none of ours."`)}${b85Say({vasso:`\n\nVasso has his head up, listening past the music. "There," he says, very low. "Under it all. The old one." Whatever he hears, he looks easier for it.`, _:''})}`,
      ch:[{t:'Into the queue.', go:()=>startExplore()}]}),
    b8_c5_torches:()=>({sp:'The road east', scene:'b8_c5_gate', again:()=>'The road east, and the torches far off.', txt:
`East, back along the road, the plain going dark. Far off where another road crosses it, four torches on tall poles burn very small and steady, and among them one figure stands still, and does not come nearer, and does not go.

The wagons are past here. The Fourth is past here. ${b85Charm() ? `At ${b85Charm() === 'sgt' ? 'your' : NAME(b85Charm()) + '\'s'} throat the Hood-touched charm is very cold tonight, colder than it has ever been. ` : ''}You turn back to the gate.`,
      ch:[{t:'Back to the gate.', go:()=>startExplore()}]}),
    b8_c5_wall:()=>({sp:'The east gate', scene:'b8_c5_gate', again:()=>'The lanterns on their posts at the gate, and the masks on the wall above.', txt:
`Lanterns on poles either side of the gate, and the wall going up behind them into the dusk, and along the top of it the Fete's last-day crowd in their masks, leaning over to watch the queue: a bird's face, a moon's, a bear's, a woman with no mask at all and a cup in her hand, waving to nobody.

${b85Say({brisk:`Brisk looks up at them and shakes her head slowly. "All those faces," she says, "and not one of them you can read." She keeps her shield on her arm.`, kettle:`Kettle looks up at them with her lip curled. "Every one of them's drunk," she says. "On a wall." She sounds almost fond.`, _:`The masks on the wall look down at the queue, and the queue looks up at the masks, and neither of them can see the other's face.`})}`,
      ch:[{t:'Back to the queue.', go:()=>startExplore()}]}),

    /* Benlo at the gate with a tray: the news from K'rul's (callback 3: Mallet). Never the raid, Picker or Blend (rule 71); never who paid,
       never that the Fourth was on the same paper (rule 70) */
    b8_c5_benlo:()=>({sp:'Benlo', scene:'b8_c5_gate', fx:()=>{ S.f.b8_c5_benlo = 1; }, again:()=>'Benlo, at the gate, with his tray of chestnuts.', txt:
`Benlo is working the queue with a tray of hot chestnuts on a strap round his neck, and he sees the Fourth before the Fourth sees him. His round face does something complicated.

"Sergeant," he says. "You're back. On the last day." He holds out the tray without seeming to know he is doing it. "You'll not have heard. Out there. You'll not have heard about the Malazans up at K'rul's."`,
      ch:[{t:'"Heard what, Benlo?"', go:'b8_c5_news'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_news:()=>({sp:'Benlo', scene:'b8_c5_gate', fx:()=>{ S.f.b8_c5_news = 1; }, txt:
`"Two of them dead," Benlo says. "Two of the Malazans that keep the old belfry. Some days ago, in the Fete. The healer, Mallet they called him. And another, Bluepearl." He shifts the tray. "Guild, people say. That's all anyone says. No one says more than that, not in the Gadrobi, not this week."

He looks at the Fourth's faces. "You knew them. I'm sorry. I'd not have been the one to tell you, if there was another."${b85If('vasso', `\n\nVasso has gone white. "Not ours," he says, very low, to you. "Not my paper. I told you there were other papers this winter. I didn't know whose." He swallows. "I still don't."`)}`,
      ch:[{t:'Mallet.', go:'b8_c5_mallet'}]}),
    b8_c5_mallet:()=>({sp:'The east gate', scene:'b8_c5_gate', fx:()=>{ S.f.b8_c5_mallet = 1; }, txt:
`Mallet.

You remember him by the Host's standard on a cold morning before Coral, with his hands on his hips, asking Whiskeyjack for a week. Flat on his back. Not a month, not forever. A week, so the leg would hold. He asked in Darujhistan and on the quorl and in front of the whole Host, and he never got an hour, and he never stopped asking.

He was the one who would have mended it. He was the one who was always there to mend things, after.${b85Say({ohl:`\n\nOhl has stopped moving. "He told me once he was better than me," he says. "By a tent rope. 'No offence.'" His mouth works. "None taken. He was. He was better than all of us." He takes his list out of his coat, the oilcloth one, and opens it, and stands there in the queue with the masks over him and writes a name in it, and then another. "They're not ours," he says. "They're going in anyway."`, _:`\n\nYou open the ledger, there in the queue with the masks over you, to the column for the names that are not owed anything any more. You write his in it. You write the other one too.`})}${b85If('brisk', `\n\nBrisk touches two fingers to her brow, east, west, it does not matter. "Hood," she says, "you've got a good one. Mind him."`)}${b85If('tuft', `\n\nTuft is quiet a while. Then: "He looked at everybody's hands, after Pale. Everybody's. He never said what he saw."`)}${b85If('kettle', `\n\nKettle is counting under her breath, and stops, because there is nothing to count.`)}${b85If('edrem', `\n\nEdrem did not know him. He stands with the Fourth anyway, in the queue, as a man stands at a graveside for someone else's dead.`)}`,
      ch:[{t:'Back to the queue.', go:()=>startExplore()}]}),

    /* Calder pays off at the gate (reads Ch 2's wagons); a raider's sword if the road gave none */
    b8_c5_calder_end:()=>({sp:'Calder', scene:'b8_c5_gate', fx:()=>{ S.f.b8_c5_calderEnd = 1; if (!S.f.b8_c5_sword) { S.f.b8_c5_sword = 1; S.f.b8_c5_swordCalder = 1; b85Gain('b8_c5_raidersword'); } }, again:()=>'Calder, with the wagons in the queue.', txt:
`Calder is at the lead wagon in the queue with his tally-stick, notching the toll before he pays it, the way he notches everything.

"Sergeant." ${b85Passed() ? `He holds out his hand, which he has not done before. "The merchant'll want you again. The east road, next season. I'll tell him you were worth it." He hesitates. "I'll not tell him about the wash. He'd not understand it."` : `He does not hold out his hand. "We're square," he says. "The pay's the pay. The merchant'll not want you again. I'll not say I'm sorry about that, and I'll not say I'm glad." He notches the stick. "You kept the wagons. I'll say that."`}${!S.f.b8_c5_sword || S.f.b8_c5_swordCalder ? `\n\nHe reaches into the wagon and brings out a long curved sword in a rawhide sheath. "The outrider took this off a rider last season," he says. "She says you'll want it more than she does. She says the city's full of riders without horses."` : ''}`,
      ch:[{t:'Back to the queue.', go:()=>startExplore()}]}),
    b8_c5_benna_end:()=>({sp:'Old Benna', scene:'b8_c5_gate', fx:()=>{ S.f.b8_c5_bennaEnd = 1; }, again:()=>'Old Benna, with her bundle, at the gate.', txt:
`Old Benna has her tubs on her back in a bundle and her money in her stocking, and is ready to be gone the moment the gate lets her.

"There," she says. "Home. Proper water." She looks up at the masks on the wall and sniffs. "Last night of the Fete. I'll be in my bed with the door barred, and so should you be." She pats your arm. "You've a door, haven't you. Up the street from the Phoenix. Bar it."${b85Benna() ? `\n\n"No reading tonight," she says. "Not on the last night. Not for anyone. I've seen what the cards do on the last night."` : ''}`,
      ch:[{t:'Back to the queue.', go:()=>startExplore()}]}),

    /* the gate itself: the toll, the gate-captain, and in. Money is the scene here, so the "yes, but" is silver */
    b8_c5_gate_in:()=>({sp:'The east gate', scene:'b8_c5_gate', again:()=>'The gate, the toll-men at the bars, and the city beyond.', txt: !S.f.b8_c5_mallet ?
`The gate. The queue is still long, and Benlo is still working it with his tray, and keeps looking your way.` :
`The gate-captain is looking at the sky. The light is nearly gone. The toll-men at the bars are taking double, because it is the last day and they can, and the queue behind the wagons is getting loud.

${b85Say({vasso:`Vasso, at your elbow, says, "That one on the left takes less if you say you're from the Gadrobi. Everyone says it. He likes hearing it."`, _:'There is a way through a toll-gate on a feast day, and it mostly involves sounding like you belong on the other side of it.'})}`,
      ch: !S.f.b8_c5_mallet ? [{t:'Back to the queue.', go:()=>startExplore()}] : [
          {t:'Talk the wagons through before the bars come down, at a fair toll.', check:['guile', 15],
            edges:id=>[id === 'vasso' && ['he is from the Gadrobi, and sounds it', 3], (S.kit || []).includes('b8_c5_peddlerpack') && ['the peddler\'s pack, and a little of his patter', 1], id === 'brannoc' && ['a Falari harbour-mouth for toll-men', 2], id === 'tuft' && ['she looks nineteen still, and harmless', 1], id === 'sgt' && ['you have lived in this city long enough to sound like it', 1], id === 'brisk' && ['she looks like a fight at a gate', -1], id === 'edrem' && ['grey scale at a city gate draws eyes', -1]],
            near:{t:()=>'Yes, but the toll-man on the left takes double anyway, because it is the last day and he can: 4 silver, out of the Fourth\'s own purse.', fx:()=>{ S.f.b8_c5_tollNear = 1; b85Pay(4, 'the toll on the last day'); }},
            go:'b8_c5_toll_ok', fail:'b8_c5_toll_paid'},
          {t:'Pay what they ask and go in.', go:'b8_c5_toll_paid'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_toll_ok:()=>({sp:'The east gate', scene:'b8_c5_gate', fx:()=>{ S.f.b8_c5_toll = 'fair'; }, txt:
`The toll-man looks at the Fourth, and at the wagons, and at the sky, and takes a fair toll out of Calder's purse${S.f.b8_c5_tollNear ? ' and a double one out of yours, because he can' : ' and none out of yours'}, and waves the line on. The gate-captain is already shouting for the bars.`,
      ch:[{t:'Through the gate.', onward:true, go:'b8_c5_onward'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_toll_paid:()=>({sp:'The east gate', scene:'b8_c5_gate', fx:()=>{ if (!S.f.b8_c5_toll) { S.f.b8_c5_toll = 'paid'; b85Pay(8, 'the toll for the Fourth, on the last day'); } }, txt:
`The toll-men take double, because they can, and Calder pays the wagons' and you pay the Fourth's, and the line moves. The gate-captain is already shouting for the bars.`,
      ch:[{t:'Through the gate.', onward:true, go:'b8_c5_onward'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c5_onward:()=>({sp:'The east gate', scene:'b8_c5_gate', txt:
`Under the arch of the gate it is loud and dark and smells of torches, and then you are through, and the bars come down behind the last of the wagons with a sound like a door closing on a long road.

Darujhistan. The Fete's last night coming on, masks in every street, music, the blue fire in its pipes and the bells going. The Fourth's door is across the city, up the street from the Phoenix. The Contract is waiting there too.${b85If('edrem', `\n\nEdrem stands just inside the gate and looks up at the gas-light, the blue fire in its glass, for a long breath. "It is very bright," he says. "Your city." He does not say whether he likes it.`)}${b85If('vasso', `\n\nVasso has his hood up already. "Home," he says. "Roofs." He looks up at them, the way he always does. "They know we're back."`)}`,
      ch:[{t:'Home, through the Fete.', onward:true, go:()=>chapterEnd(5, b85Key() || B8KEY0[5])},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
