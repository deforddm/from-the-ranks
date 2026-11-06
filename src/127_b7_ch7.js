/* ============ Book Seven, Chapter 7: Letheras (the Third, and the book's finale) ============ */
/* The Third, lent to Fist Keneb's column as a squad of heavies, at the end (rg-canon §2, ch 24; R24.1 S1, S7; R24.2 S1, S20-23, S39, S43;
   WE). The killing field is behind: the Third had the column's wounded at a farm a league back and saw only a light on the horizon; it has
   heard of a mage who burned (rule 63; never named). The Adjunct's landing has broken the Letherii army at the river (heard of).
   Phase 1, night under the walls of Letheras: refugees on the road (more frightened of the city than of the invaders), the lieutenant's
   orders (the Fist takes the gate himself; the heavies with him; other squads go another way, never said where), the Fist seen down the
   line (never spoken with). Phase 2, first light: the gate (b7_c7_gate, main, stage2: b7_lethsoldier, b7_lethxbow, b7_lethofficer; a
   wicket charge for a head start), then the gate square inside (the prisoners; the lieutenant). Phase 3, the city's last day: the
   streets, a brazier at a corner (the first halt, the reading, B7READ[7], the King), Patriotist holdouts running from the mob
   (b7_c7_streets, stage2), the earthquake and a white light under a quarter (unexplained, rule 59), a white dragon driven off (rule 60),
   the bridge with the crowd on it (b7_c7_bridge, optional; b7Rise(1, 'the crowd') once; the crowd's mood by b7RiseTier()), the trick
   (the Crowd's Luck), the surrender seen from a street end and the shout, the arena as news. Phase 4, three weeks on: a canal street,
   the new emperor (never named), the blank coin, the Letherii's road as one line of news, Doss and Wenna, and the key: S.f.b7_c7_key,
   'adjunct' (stay with the army; Book Nine imports it) / 'letheras' (the new emperor's coin and a post in the city) / 'home' (time
   served, a berth home). Then the finale for both squads (B7CH7.finale; the Letherii's pages from B7CH6.fates) and Where the books meet.
   Never: the tunnel or the postern; the palace, the throne room, the Eternal Domicile; the arena; Scale House and the machine; the roofs
   where Ruin falls; the City Garrison fight; the Patriotist compound; Tehol's house; Settle Lake. Never speaks with Keneb, Fiddler,
   Quick Ben, Hedge, Tehol, Brys, Janath or Varat Taun. Notes for the lead: docs/rg-ch7-notes.md. */
/* FOR THE ARTIST (127b): names this file uses.
   Items: ART['item/b7_c7_lethcloak'], ['item/b7_c7_kingscoin'].
   Figures, all existing: b2soldier (the lieutenant, marines, the Fist's officers far off), b5_c5_refugee (refugees, the water-woman, the
   old woman on the bridge, the crowd), b5_letherii (the gate's prisoners, the Whitefinders far off), b5_c1_clerk (the moneychanger),
   b7_agent (Patriotist holdouts).
   Backdrops: b7_city_burning (120's, yours: Letheras on its last day, smoke over the towers, and after the earthquake a white light under
   one quarter to the north; a white shape in the sky once the dragon has been seen), and three this file adds that borrow until you draw
   them: b7_c7_gate (the walls of Letheras and a great gate, night on the road with refugees in phase 1, first light in phase 2, after
   the fight the gate open with smoke in it), b7_c7_square (inside the gate: a cobbled square, the gatehouse behind, shuttered houses,
   morning), b7_c7_after (three weeks on: a canal street in the morning, a footbridge, washing out, the towers clean of smoke).
   Ground (TILEX, all existing): b7_c6_field (the road under the walls: W the walls, G the gate), b5_c7_streets (the square and the
   streets: '#' burned walls, c a cart, x a shop, h a door, F a brazier, v the way down to the canal), b5_c7_canal (three weeks on: '~'
   water, '-' the footbridge, a an arch). Battles: b5_c7_barricade (the gate), b5_c7_streets, b5_c7_lowwalk (the bridge, '#' the canal). */

/* ---- small helpers (b77: Book Seven, Chapter Seven) ---- */
const b77L = (id, n) => { if (b7In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b77Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b7In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b77If = (id, s) => b7In(id) ? (typeof s === 'function' ? s() : s) : '';
const b77Who = () => (ROLL() && ROLL().who) || 'sgt';
const b77Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b77Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b77V = (id, you, they) => id === 'sgt' ? you : they;
const B77_SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'hessa', 'rasp', 'wenna'];
const b77He = id => id === 'sgt' ? 'you' : B77_SHE.includes(id) ? 'she' : 'he';
const b77Him = id => id === 'sgt' ? 'you' : B77_SHE.includes(id) ? 'her' : 'him';
const b77His = id => id === 'sgt' ? 'your' : B77_SHE.includes(id) ? 'her' : 'his';
const b77Cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const b77And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b77Num = n => ['none', 'one', 'two', 'three', 'four', 'five', 'six'][n] || String(n);
/* the phase: 1 the road under the walls at night; 2 first light, the gate and the square inside it; 3 the city's last day; 4 three weeks on */
const b77Ph = () => S.f.b7_c7_ph || 1;
const b77Key = () => ['adjunct', 'letheras', 'home'].includes(S.f.b7_c7_key) ? S.f.b7_c7_key : null;
const b77Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b7In(id));
/* who fell in Chapter 5's mortal fight (the dead from earlier books carry a 'from') */
const b77Fell = () => Object.keys(S.dead || {}).filter(id => TPL[id] && S.dead[id] && S.dead[id].ch === 5 && !S.dead[id].from);
const b77Strip = () => S.f.b7_c1_key === 'strip';
const b77Ledger = () => S.f.b7_c3_key === 'ledger';
const b77Held = () => S.f.b7_c5_key === 'hold';
/* the city's mood, by how far Lether has turned (b7RiseTier) */
const b77Tier = () => b7RiseTier();
const b77Mood = () => ({
  quiet:'The crowd watches the foreign soldiers go by the way it watches weather, from doorways, and shuts the doors after.',
  stirring:'The crowd makes way for the foreign soldiers, and some of it nods, and a few of it look as if they would like to say something and have decided to wait and see who wins.',
  rising:'The crowd shouts when it sees the foreign soldiers, and it is not shouting at them. A month ago nobody in this city would have believed it.',
  risen:'The crowd is ahead of the foreign soldiers everywhere they go, opening doors, pointing down alleys at grey coats, holding out bread. The city has made up its mind.'})[b77Tier()];
/* who teaches the Crowd's Luck: Doss (the Indebted's spin), else Wenna (the tide-coin), else Tallow (his grandmother's coin), else the old woman */
const b77Teacher = () => b7In('doss') ? 'doss' : b7In('wenna') ? 'wenna' : b7In('tallow') ? 'tallow' : 'sgt';
/* the sapper for the wicket: Tangle, else Rasp, else the sergeant */
const b77Sap = () => b7In('tangle') ? 'tangle' : b7In('rasp') ? 'rasp' : null;
const b77SapN = () => b77Sap() ? NAME(b77Sap()) : 'You';
/* the Letherii's road (Chapter 6's), seen once from the street, three weeks on */
const b77LethRoad = () => B7_LETHROADS.includes(S.f.b7_lethRoad) ? S.f.b7_lethRoad : null;

/* ---- the Crowd's Luck: the Lady's Pull (pull, t_pull), in Letheras's words. The city's poor spin a dock on its edge on a thumbnail when
   the bread is short or the bailiff is coming, and the crowd says the coin lands for the crowd. An old Indebted woman on a bridge spins
   one for anyone who will put a dock in her bowl. Twice a chapter (one more from level 5): after a failed check, roll it again; or before
   an attack, roll twice and keep the better; the crowd wants paying: the squad's next check is −2. Not sorcery. ---- */
Object.assign(TRICKS, {
  b7_c7_luck:{name:'The Crowd\'s Luck', ch:7, use:'chapter', n:2, ab:'t_b7_c7_luck', where:'a bridge in Letheras on the city\'s last day, with the crowd on it',
    lore:'The poor of Letheras spin a dock on its edge on a thumbnail when the bread is short, or the bailiff is at the end of the street, and catch it, and do not look at which face came up. The crowd, they say, always wins in the end, because there are more of it. It is not the Errant\'s coin. It is the crowd\'s. It wants paying for afterward, like everything in Lether.',
    get fx(){ return `${trickTimes('b7_c7_luck')} a chapter: spin the coin after a failed check and roll it again, or before an attack and roll twice, keeping the better. The crowd wants paying: the squad's next check is −2. One more use from level 5. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b7_c7_luck:{name:TRICKS.b7_c7_luck.name, trick:'b7_c7_luck', self:true, free:true, desc:()=>'Spin the crowd\'s coin: this turn\'s attack rolls twice and keeps the better. The crowd wants paying: the squad\'s next check is −2. Does not use the action.',
    ok:u=>!B.acted && u.luckyTurn !== B.turn,
    run(u){ u.luckyTurn = B.turn; S.push = 1; AUDIO.play('coin'); float(u, 'the crowd\'s coin', '#e8c073'); sparks(u.x, u.y, 10, '#e8c073', .4); blog(`${u.name} spins a dock on a thumbnail, the way the poor of Letheras do, and catches it, and does not look.`); }},
});
/* The check half of the Pull lives in 16's rollDice, which asks for the trick 'pull' by name (Book Five's Holed Dock answered the same need
   the same way, 087). In Book Seven only, when the squad carries the Crowd's Luck and not the Pull, 'pull' is answered by the Luck: its
   charges, its spending, its words. Guarded (b7On); other books, and a squad with the real Pull, are untouched. Reported to the lead. */
{ const _tl = trickLeft, _sp = spendTrick, _rd = rollDice, _nt = note, _bl = blog;
  const luck = k => b7On() && k === 'pull' && S && S.tricks && S.tricks.b7_c7_luck && !S.tricks.pull;
  trickLeft = function(k){ return _tl(luck(k) ? 'b7_c7_luck' : k); };
  spendTrick = function(k){ if (!luck(k)) return _sp(k); _sp('b7_c7_luck'); S.tricks.pull = {who:S.tricks.b7_c7_luck.who, ch:7, b77:1}; }; // 16 names the spinner through trickBy('pull') next: lend it the Luck's bearer for that one line
  rollDice = function(r, done, spun){ if (S && S.tricks && S.tricks.pull && S.tricks.pull.b77) delete S.tricks.pull; return _rd(r, done, spun); };
  note = function(t, c){ if (b7On() && typeof t === 'string' && /spins the coin\. The Lady pulls/.test(t)) t = t.replace(/spins the coin\. The Lady pulls; the Lord will push back on the next check \(−2\)\./, 'spins a dock on a thumbnail, the crowd\'s way. It comes down the other way; the crowd wants paying on the next check (−2).'); return _nt(t, c); };
  blog = function(m){ if (b7On() && typeof m === 'string') m = m.replace('<em>The Lady pulls.</em>', '<em>The crowd\'s coin spins.</em>'); return _bl(m); };
  if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') { const mo = new MutationObserver(() => { if (!b7On() || !(S && S.tricks && S.tricks.b7_c7_luck && !S.tricks.pull)) return; const b = document.getElementById('dPull'); if (b && !b.dataset.b77) { b.dataset.b77 = 1; b.textContent = `Spin the crowd's coin · The Crowd's Luck (${trickLeft('pull')} left)`; } });
    const go = () => { const sh = document.getElementById('sheet'); if (sh) mo.observe(sh, {childList:true, subtree:true}); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go(); } }

/* ---- borrowed pictures until the artist's file (127b) replaces them: three scenes, the two items ---- */
{ const like = {b7_c7_gate:'b7_c6_walls', b7_c7_square:'b7_letheras', b7_c7_after:'b7_letheras'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof ART !== 'undefined') [['b7_c7_lethcloak', 'b7_c1_charredcloak'], ['b7_c7_kingscoin', 'b7_c1_tallyash']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Seven's glossary ---- */
GLOSSX.rg.push(
  [7, 'The crowd', 'What held Letheras on its last day as anyone knew it: not the garrison, not the Edur, who had gone, and not the Patriotists, who were running. The crowd shouted two words, Saviour and Emperor, and some of the men starting the shouting were paid to.', ()=>!!(S && S.f && (S.f.b7_c7_ph || 0) >= 3)],
  [7, 'A blank coin', 'Letheras struck coin in the weeks after the city turned over before anyone was sure whose face to put on it. Some came out of the mint with the old emperor\'s face filed off, and some with nothing on that side at all.', ()=>!!(S && S.f && (S.f.b7_c7_ph || 0) >= 4)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.rg = ROSTER_FIRES.rg || {}; ROSTER_FIRES.rg[7] = ['b7_c7_fire'];

/* the reading: a Letheras street at the end (rg:7); the King */
B7READ[7] = {scene:'b7_city_burning', where:'a doorstep at a street corner, by a brazier somebody left burning', set:'Letheras on its last day as anyone knew it: smoke over the towers, the crowd somewhere near and shouting, and the Third on a merchant\'s doorstep with the cards.', back:'b7_c7_fire', backT:'Back to the brazier.',
  say:{marrow:'"A doorstep, child," Marrow says, and sits on it. "In a city with the gate open and the crowd out. The Deck likes a door." She looks up the street toward the shouting. "It likes a crown better. Somebody\'s losing one today."',
       tallow:'"My grandmother read for a town the day its lord ran off," Tallow says, squatting by the brazier. "She said the cards come up crowned on a day like that, every one." He lays the first. "She liked to exaggerate."',
       oldninth:'The old marine from the column sits down on the step beside the Third as if he had been asked, with his worn deck in his fist. "Last city I read in was on fire as well," he says. "They mostly are, when they want me." He sets a cup on the step for the rum.'}};

const B7CH7 = {
  title:'Letheras', number:'Seven',
  intro:{loc:'Letheras', sub:'Keneb\'s column · under the walls', scene:'b7_c7_gate', cap:'The walls of Letheras in the dark, a great gate shut, smoke over the towers beyond, and the road out of the city full of people going the other way.',
    paras:[
`A day out from the city the marines made a ring on a cleared plain, and the Letherii loosed a week of sorcery at it off a ridge, and something in the ring held it. The Third was not in the ring. The lieutenant's company had the column's wounded a league back down the road, at a farm with a well, and the Third had the farm's gate. What it saw was a light on the horizon, silver, small as a coin held up to the sun, for longer than anyone could hold a breath. Then not.`,
`What it heard after was that a mage had burned. The marines who knew his name said it once, and then did not say it again, and the Third did not ask.`,
()=>{ const v = b77Mates().map(id => TPL[id].name);
  return `Then the Letherii army went down to the river to meet the Adjunct's ships, and did not come back from it as an army. And now Letheras. You are Sergeant {sgt}, Third squad, 9th Legion, lent to the Fist's column as heavies. ${v.length ? `The squad is ${b77And(v)}${b77Fell().length ? `, and the gap where ${b77And(b77Fell().map(NAME))} would be` : ''}.` : 'The Third, at the end, is you.'} The walls are there in the dark, and the smoke over them, and the road out of the gates is full of people going the other way.`; }],
    go:'March', node:'b7_c7_start'},

  areas:[
    /* 16 x 12 (b7_c6_field, night). W the walls  G the gate  , grass  . the road  = stakes  F the column's lie-up in the ditch  < back down the road */
    { id:'b7_c7_road', title:'Under the walls of Letheras', sub:'Night · before the gate', hint:'Tap ground to move · tap a figure to talk · the gate is north, the road back south', decor:'b7_c6_field', dark:true,
      map:[ "WWWWWWWGWWWWWWWW",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,,,,,,",
            ",,,,,,,.,,,,==,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,F,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,,,,,,",
            ",,,,,,,.,,,,==,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,<,,,,,,,," ],
      walk:'.,', triggers:{F:'b7_c7_fire', G:'b7_c7_gate_go', '<':'b7_c7_behind'}, start:{x:7, y:10},
      quest:()=> !S.f.b7_c7_orders ? 'The lieutenant, in the ditch by the road.'
        : b77Ph() >= 2 ? 'The gate. The Fist is in front.'
        : 'The gate, at first light. Until then, the road.',
      npcs:[
        {id:'lt', name:'The lieutenant', kind:'b2soldier', x:4, y:5, node:()=>'b7_c7_lt', fresh:()=>!S.f.b7_c7_orders},
        {id:'refugees', name:'A family with a handcart', kind:'b5_c5_refugee', x:8, y:7, node:()=>'b7_c7_refugees', fresh:()=>!S.f.b7_c7_refugees},
        {id:'marines', name:'Marines going along the wall', kind:'b2soldier', x:12, y:2, node:()=>'b7_c7_marines', show:()=>!!S.f.b7_c7_orders, fresh:()=>!S.f.b7_c7_marines},
        {id:'fist', name:'Officers by the road', kind:'b2soldier', x:9, y:3, node:()=>'b7_c7_fist', show:()=>!!S.f.b7_c7_orders, fresh:()=>!S.f.b7_c7_fist} ] },

    /* 16 x 12 (b5_c7_streets, morning). G the gate behind  # burned walls  c a cart  x a shop  , rubble  > south, into the streets */
    { id:'b7_c7_square', title:'Letheras · inside the gate', sub:'First light · the gate square', hint:'Tap ground to move · tap a figure to talk · the gate is behind you, north; the streets go on south', decor:'b5_c7_streets', dark:false,
      map:[ "######GG########",
            "#..............#",
            "#.c............#",
            "#.......,...c..#",
            "#..,...........#",
            "##.....##......#",
            "#......##..,...#",
            "#..............#",
            "#.,.........x..#",
            "#..............#",
            "#......,.......#",
            "#######>>#######" ],
      walk:'.,', triggers:{G:'b7_c7_wall_gate', '>':'b7_c7_square_east', x:'b7_c7_shop'}, start:{x:7, y:2},
      quest:()=> !S.f.b7_c7_lt2 ? 'The lieutenant, by the gatehouse.' : 'South, into the streets.',
      npcs:[
        {id:'lt2', name:'The lieutenant', kind:'b2soldier', x:5, y:3, node:()=>'b7_c7_lt2', fresh:()=>!S.f.b7_c7_lt2},
        {id:'prisoners', name:'The gate\'s garrison, sitting', kind:'b5_letherii', x:11, y:4, node:()=>'b7_c7_prisoners', fresh:()=>!S.f.b7_c7_prisoners},
        {id:'water', name:'A woman with a water-jar', kind:'b5_c5_refugee', x:3, y:8, node:()=>'b7_c7_water', fresh:()=>!S.f.b7_c7_water} ] },

    /* 16 x 12 (b5_c7_streets, day). ^ the street end, north, to a square below the palace  F a brazier at a corner (the first halt)
       h the counting-house door  x a shop with a broadsheet  v down to the canal and the bridge  < back, west, to the gate square */
    { id:'b7_c7_streets', title:'Letheras · the streets', sub:'The city\'s last day', hint:'Tap ground to move · tap a figure to talk · the brazier is by the corner, the canal east, the street to the palace north', decor:'b5_c7_streets', dark:false,
      map:[ "#######^########",
            "#..,......#..x.#",
            "#.c..,....#....#",
            "##.............#",
            "#....##..,.....#",
            "#.,..##.....h..#",
            "<......F.......v",
            "#..,.......##..#",
            "#.....c....##..#",
            "##..,...,......#",
            "#.......#..,...#",
            "################" ],
      walk:'.,', triggers:{F:'b7_c7_fire', '^':'b7_c7_view', h:'b7_c7_holdouts', x:'b7_c7_broadsheet', v:'b7_c7_bridge', '<':'b7_c7_streets_west'}, start:{x:1, y:6},
      quest:()=> !S.f.b7_c7_holdoutsDone ? 'A counting-house, and the crowd round it, east of the brazier.'
        : !S.f.b7_c7_view ? 'North, to the end of the street. Something is happening at the palace.'
        : !S.f.b7_c7_lt3 ? 'The lieutenant has found the Third.'
        : 'Evening. The lieutenant.',
      npcs:[
        {id:'shouters', name:'Men starting the shouting', kind:'b5_c5_refugee', x:9, y:3, node:()=>'b7_c7_shouters', fresh:()=>!S.f.b7_c7_shouters},
        {id:'runner', name:'A Letherii running', kind:'b5_letherii', x:4, y:9, node:()=>'b7_c7_news', show:()=>!!S.f.b7_c7_quake, fresh:()=>!S.f.b7_c7_news},
        {id:'sky', name:'Marines looking up', kind:'b2soldier', x:13, y:8, node:()=>'b7_c7_sky', show:()=>!!S.f.b7_c7_quake, fresh:()=>!S.f.b7_c7_sky},
        {id:'lt3', name:'The lieutenant', kind:'b2soldier', x:3, y:4, node:()=>'b7_c7_lt3', show:()=>!!S.f.b7_c7_holdoutsDone && !!S.f.b7_c7_view, fresh:()=>!S.f.b7_c7_lt3} ] },

    /* 16 x 12 (b5_c7_canal, morning). ~ the canal  - the footbridge  a an arch over the water  F the Third's brazier by its billet */
    { id:'b7_c7_after', title:'Letheras · three weeks on', sub:'A canal street · the new emperor\'s city', hint:'Tap ground to move · tap a figure to talk · the Third\'s billet and its brazier are by the bridge; the canal is south', decor:'b5_c7_canal', dark:false,
      map:[ "################",
            "#..............#",
            "#....F.........#",
            "#..............#",
            "#..............#",
            ",,,,,,,--,,,,,,,",
            "~~~~~~~--~~~~~~~",
            "~~~~~~~--~~~~~~~",
            ",,,,,,a--a,,,,,,",
            "................",
            "#..............#",
            "################" ],
      walk:'.,-', triggers:{F:'b7_c7_fire', a:'b7_c7_canal'}, start:{x:7, y:3},
      quest:()=> !S.f.b7_c7_lt4 ? 'The lieutenant has three lists, and wants a word.'
        : !b77Key() ? 'The roads out. The lieutenant is waiting for the Third\'s answer.'
        : 'The brazier by the billet. The last of it.',
      npcs:[
        {id:'lt4', name:'The lieutenant', kind:'b2soldier', x:3, y:3, node:()=>b77Key() ? 'b7_c7_key' : S.f.b7_c7_lt4 ? 'b7_c7_key' : 'b7_c7_lt4', fresh:()=>!S.f.b7_c7_lt4 || !b77Key()},
        {id:'coin', name:'A moneychanger at a table', kind:'b5_c1_clerk', x:11, y:3, node:()=>'b7_c7_coin', fresh:()=>!S.f.b7_c7_coin},
        {id:'white', name:'Letherii soldiers over the canal', kind:'b5_letherii', x:12, y:9, node:()=>'b7_c7_whitefinders', fresh:()=>!S.f.b7_c7_white},
        {id:'people', name:'People on the bridge', kind:'b5_c5_refugee', x:3, y:9, node:()=>'b7_c7_people', fresh:()=>!S.f.b7_c7_people} ] } ],

  battles:{
    /* the gate at first light, with the Fist in front: the outer passage and its guardrooms, then the gatehouse yard behind and its Finadd */
    b7_c7_gate:{title:'The gate of Letheras', style:'b5_c7_barricade', warrenText:'First light at the gate of Letheras · the warrens thin and strange, as if something under the city were drinking from them', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","#......#","#..t...#","#......#","...tt...","#......#","#..t..t#","#......#","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b7_marine',1,8],['b7_marine',6,8]],
      foes:[['b7_lethsoldier',2,1],['b7_lethsoldier',5,1],['b7_lethsoldier',4,3],['b7_lethxbow',3,0],['b7_lethxbow',4,0],['b7_lethxbow',2,0]], xp:300, after:'b7_c7_gate_after',
      waves:[{round:3, foes:[['b7_lethsoldier',0,4],['b7_lethsoldier',7,4]], text:'The guardroom doors either side of the passage open at once, and more of the garrison come out of them, buckling as they come.'}],
      preText:()=>`The gate's wicket is down, and beyond it the passage under the gatehouse, long and dim, with murder-holes in the roof and the garrison in it: soldiers of Lether in their good armour, crossbowmen behind them, who have heard the army is gone and have not yet decided what that means for them. The Fist goes through the wicket first. The Third goes after him.`,
      stage2:{title:'The gatehouse yard', xp:160,
        text:()=>`The passage is the column's. Past it, the gatehouse yard: a square of wet cobbles under the inner arch, with the city beyond it, and in the middle of it a Finadd of the garrison with his last men round him, a cadre mage at his shoulder, and his sword out.\n\nHe has not been told the war is over. He would like to hear it from somebody who can make him believe it.${b77Say({haddat:'\n\nHaddat sets the blue shield. "He means it," she says. "Good. So do I."', tangle:'\n\nTangle looks at the mage. "That one first," he says. "Always that one first."', _:''})}`,
        map:["#......#","#.t....#","........","#...t..#","#......#","..t...t.","#......#","#......#","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b7_marine',1,8]],
        foes:[['b7_lethofficer',3,1],['b7_lethsoldier',2,2],['b7_lethsoldier',5,2],['b7_lethmage',4,0],['b7_lethxbow',6,0]]} },
    /* Patriotist holdouts running from the mob: the street before a broker's counting-house, then its stair */
    b7_c7_streets:{title:'The counting-house street', style:'b5_c7_streets', warrenText:'Letheras by day · the crowd loud two streets off, and the grey coats louder, closer', warren:{meanas:1, denul:1}, music:'battle',
      map:["##..#..#","........","..t.....","........",".....t..","........","#.......","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b7_c7_patriot',2,1],['b7_c7_patriot',5,1],['b7_c7_patriot',3,3],['b7_lethsoldier',3,0],['b7_lethsoldier',5,0],['b7_lethxbow',6,0]], xp:240, after:'b7_c7_holdouts_after',
      preText:()=>`They have barricaded the street in front of the counting-house with a cart and the broker's furniture, and behind it there are grey coats with long knives, and with them soldiers from the palace who threw in with them and are wishing now that they had not. The crowd is at the end of the street, waiting for somebody to go first.${b77If('doss', ' Doss looks hard at the grey coats. He has never seen one close before.')}`,
      stage2:{title:'The counting-house stair', xp:120,
        text:()=>`Through the barricade, and into the counting-house, and up its stair, where the grey coats have gone to make their stand among the broker's ledgers. At the top, with his back to a window and a long knife in each hand, the one the others look at.\n\nHe has a list in his coat. He has always had a list in his coat. He has just found out that nobody is going to read it.`,
        map:["#......#","#..t...#","#......#","#......#","#.t..t.#","#......#","#......#","#......#","#......#","#......#"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b7_c7_patcaptain',3,1],['b7_c7_patriot',2,2],['b7_c7_patriot',5,2],['b7_lethxbow',4,0]]} },
    /* the bridge (optional): garrison crossbowmen who have not surrendered, holding a bridge against the crowd */
    b7_c7_bridge:{title:'The bridge', style:'b5_c7_lowwalk', warrenText:'A bridge in Letheras · the canal slow and brown below, the crowd at both ends', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.......","#..t....","#.......","#.....t.","#.......","#..t....","#.......","#.......","#.......","#......."],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b7_lethxbow',2,1],['b7_lethxbow',5,1],['b7_lethxbow',4,0],['b7_lethsoldier',3,2],['b7_lethsoldier',6,2]], xp:160, after:'b7_c7_bridge_after',
      preText:()=>`Garrison crossbowmen, a squad of them, on the hump of the bridge behind an overturned handcart, with the crowd at both ends throwing what it can find. They have shot into it once already. They will do it again, because they are frightened, and a frightened crossbowman is the most dangerous thing in any city.`} },

  foes:{
    /* a Patriotist agent holding out against the mob: grey coat, long knife, nowhere left to run (the Third's scale; drawn as Ch2's b7_agent) */
    b7_c7_patriot:{name:'Patriotist holdout', kind:'b7_agent', sig:'a', hp:28, ac:14, atk:11, dmg:[1,6,4], rng:1, mv:5, init:3, sk:['bleed'], verb:'slips a long knife at'},
    /* their captain on the stair, with a list in his coat (never named) */
    b7_c7_patcaptain:{name:'Patriotist captain', kind:'b7_agent', sig:'P', hp:60, ac:15, atk:12, dmg:[1,8,4], rng:1, mv:4, init:2, boss:true, sk:['rally', 'bleed'], verb:'cuts, two-handed, at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b7_c7_lethcloak:{name:'A Letherii officer\'s cloak', slot:'armour', role:'light', who:null, ac:2, hp:3,
      line:'A long riding cloak of good grey-blue wool, lined in oiled silk against the canal damp, with a Finadd\'s clasp at the throat: two gold fish, nose to tail. The garrison Finadd at the gatehouse took it off and gave it to the Third when he gave up his sword, folded, as if he were handing over the keys to a house he had kept well. It turns rain, and a knife at an angle, and it is the best-made thing the Third has owned.'},
    b7_c7_kingscoin:{name:'A coin with no face', slot:'trinket', role:'any', who:null, stat:{guile:1}, hp:2,
      line:'A new-struck Letherii coin, heavy and bright, the city\'s towers on one side and nothing at all on the other: struck in the weeks after Letheras turned over, before anyone at the mint was sure whose face to put on it. The moneychangers will not take it at full weight. Nobody in the Third would sell it at any weight.'} },

  scenes:{
    b7_c7_gate:{loc:'Letheras', sub:'The gate · night, then first light', cap:'The walls of Letheras, a great gate shut in them, smoke over the towers beyond, and refugees on the road.', amb:'explore'},
    b7_c7_square:{loc:'Letheras', sub:'Inside the gate · morning', cap:'A cobbled square inside the gate, the gatehouse behind with its doors open, and shuttered houses all round with eyes behind the shutters.', amb:'explore'},
    b7_c7_after:{loc:'Letheras', sub:'Three weeks on · a canal street', cap:'A canal street in the morning, a footbridge, washing out on the lines, and over the roofs the towers of Letheras with no smoke on them.', amb:'explore'} },

  end:{
    adjunct:['With the army', 'The Third came to Letheras with the Fist at the gate, and held the counting-house street, and saw the garrison give up from the end of a street. Three weeks on, when the lists came round, it put its names on the one that stays with the army, wherever the Adjunct takes it next.'],
    letheras:['The new emperor\'s coin', 'The Third came to Letheras with the Fist at the gate, and held the counting-house street, and saw the garrison give up from the end of a street. Three weeks on, when the lists came round, it took the new emperor\'s coin and a post in the city it had come to take.'],
    home:['A berth home', 'The Third came to Letheras with the Fist at the gate, and held the counting-house street, and saw the garrison give up from the end of a street. Three weeks on, when the lists came round, it put its names on the time-served list, and took a berth on a ship west.'] },
  endScene:'b7_c7_after',
  endCap:()=> b77Key() === 'home' ? 'A canal street in the morning, and a squad going down it with its packs on, toward the river and the ships.' : b77Key() === 'letheras' ? 'A canal street in the morning, and a squad in new cloaks at a bridge, with the city going past it.' : 'A canal street in the morning, and a squad sitting on its packs by a bridge, waiting for the army to say where.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b7_c7_gateDone) x.push('The Third went through the gate of Letheras at first light with the Fist in front, and took the gatehouse yard.');
    if (f.b7_c7_charge) x.push(`The wicket came down on ${b77Sap() ? NAME(b77Sap()) + '\'s' : 'the Third\'s'} charge, a breath before the Fist's.`);
    if (f.b7_c7_holdoutsDone) x.push('Patriotists running from the mob made a stand in a broker\'s counting-house. The Third went in before the crowd did.');
    if (f.b7_c7_bridge) x.push(f.b7_c7_bridge === 'fought' ? 'Garrison crossbowmen held a bridge against the crowd. The Third took it off them.' : 'Garrison crossbowmen held a bridge against the crowd. The Third talked them off it.');
    if (f.b7_c7_luckOk) x.push('The Third learned the crowd\'s coin from an old woman on a bridge.');
    if (f.b7_c7_view) x.push('From the end of a street the Third saw the garrison of Letheras give up, and heard the crowd shout two words.');
    if (f.b7_c7_quake) x.push('The ground moved under the city, and a white light came up under one quarter, and nobody in the Third knows what it was.');
    if (f.b7_c7_key) x.push(f.b7_c7_key === 'adjunct' ? 'The Third stays with the army.' : f.b7_c7_key === 'letheras' ? 'The Third takes the new emperor\'s coin.' : 'The Third goes home.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b7_c7_key && (f.b7_c7_key === 'adjunct' ? 'Three weeks on, the Third put its names on the list that stays with the army.' : f.b7_c7_key === 'letheras' ? 'Three weeks on, the Third took the new emperor\'s coin and a post in Letheras.' : 'Three weeks on, the Third put its names on the time-served list.'),
    f.b7_c7_ph >= 4 && 'Letheras has a new emperor. The Edur have gone. The Patriotists\' files went to the river in barrows.',
    f.b7_c7_view && 'The garrison of Letheras gave up to the Adjunct. The crowd shouted "Saviour" and "Emperor".',
    f.b7_c7_quake && 'The ground moved under the city, and a white light came up under one quarter. A white dragon was driven off over the palace.',
    f.b7_c7_holdoutsDone && 'Patriotists made a stand in a counting-house. The Third went in ahead of the crowd.',
    f.b7_c7_gateDone && 'The Fist took the gate of Letheras himself at first light. The Third went through behind him.',
    'A day out from the city a mage of the marines burned, holding off the Letherii sorcery. The Third saw the light from a league back.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the road under the walls, at night ======== */
    b7_c7_start:()=>({sp:'The road to Letheras', scene:'b7_c7_gate', fx:()=>{ S.f.b7_c7_ph = S.f.b7_c7_ph || 1; }, again:()=>'The road under the walls of Letheras, at night, and the people on it going the other way.', txt:
`The road runs straight to the gate across a mile of trampled fields, and the walls of Letheras stand up at the end of it, higher than anything in Seven Cities, with lamps along the top that nobody is tending. Over them, the towers, and smoke going up between the towers into the dark from somewhere inside, more than one somewhere.

The road is full. Not of soldiers. Of people coming out of the city, on foot, with carts and barrows and bundles and children, going past the column in the dark without looking at it. They are not running from the Malazans. They are walking round the Malazans, the way you walk round a cart in the road, to get further from what is behind them.

${b77Say({haddat:'Haddat watches them go by. "They are leaving the city to us," she says. "My mother said nobody leaves a city to an army unless the city is worse."', marrow:'Marrow watches them go by. "Frightened of their own, child," she says. "More than of us. That is a city at the end of something."', _:'The squad watches them go by.'})}${b77If('doss', `\n\nDoss stands at the road's edge, looking at the faces. "Indebted," he says. "Half of them. You can tell by the boots." He would know.`)}${b77If('wenna', `\n\nWenna looks past the walls at the smoke. "The river goes through there," she says. "Right through the middle. And out the other side, to the sea."`)}

In the ditch by the road somebody is whistling the lieutenant's two notes.`,
      ch:[{t:'Down into the ditch, to the lieutenant.', go:'b7_c7_lt'},
          {t:'Wenna, at the ditch-water.', req:()=>b7In('wenna') && !S.f.b7_c7_wennaRoad, go:'b7_c7_wenna_road'},
          {t:'Walk the road.', go:()=>startExplore()}]}),
    b7_c7_wenna_road:()=>({sp:b7In('wenna') ? 'Wenna' : 'The ditch', scene:'b7_c7_gate', fx:()=>{ S.f.b7_c7_wennaRoad = 1; }, txt: !b7In('wenna') ?
`The ditch by the road, a hand's depth of black water in the bottom of it, going down toward the river.` :
`Wenna is crouched at the bottom of the ditch with her hand flat in a hand's depth of black water, as she does with every water she comes to.

"It goes to the river," she says, without looking up. "The river goes through the city, under the walls, and out the other side, and down to the sea where my brother is." She takes her hand out and shakes it. "The Edur came up that river in their black ships, the year they took the city. My father watched them go past the shore." She stands. "I'd like to see where they went. Now they've gone."`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* the lieutenant: the gate, the Fist, the others */
    b7_c7_lt:()=>({sp:'The lieutenant', scene:'b7_c7_gate', fx:()=>{ S.f.b7_c7_orders = 1; }, again:()=>'The lieutenant, in the ditch. "First light, Sergeant. The gate. Behind the Fist."', txt:
`The lieutenant is in the ditch with her back against the bank and the slate on her knee, and she does not get up. She looks as tired as anyone in the column, and she looks, for the first time since the coast, like somebody who can see the end of a road.

"The gate," she says, and points up the road with the stylus. "At first light. The Fist means to take it himself, in front, with the heavies behind him, and that's us, Sergeant. That's the Third." She makes a mark. "Other squads have other ways in. Don't ask me which. I don't know, and if I knew I wouldn't say, and if I said you'd go and look."

She looks up the road at the walls. "They say the garrison's thin. They say the Edur have gone, all of them, out of the city. They say there's a mob inside that holds half the streets and doesn't love anybody." She puts the slate away. "They say a lot. We'll know at first light."`,
      ch:[{t:'"The field. What happened on it?"', req:()=>!S.f.b7_c7_ltMore, go:'b7_c7_lt_more'},
          {t:'"First light. Yes, Lieutenant."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c7_lt_more:()=>({sp:'The lieutenant', scene:'b7_c7_gate', fx:()=>{ S.f.b7_c7_ltMore = 1; }, txt:
`She is quiet long enough that you think she will not answer.

"A mage burned," she says. "One of Captain Sort's. The Letherii put a week of sorcery into that field, meant for us and their own Edur together, and he stood it off. All of it. Until there wasn't anything left of him to stand." She turns the stylus over. "The marines built him a barrow. I wasn't asked. Neither were you."

"Then the Letherii army went to the river to stop the Adjunct landing, and it didn't." She almost smiles. "She came off the ships like a wave, they say, and when they broke she let the soldiers have them." The smile goes. "So there's nothing between us and that gate now but the gate."${b77Strip() ? `\n\nShe looks at the Third's packs out of an old habit. "Still carrying the transport, Sergeant? All the way to Letheras." It is very nearly approval.` : ''}`,
      ch:[{t:'"First light. Yes, Lieutenant."', go:()=>startExplore()}]}),

    /* refugees: a family with a handcart; what the gate is like, inside (rise:true) */
    b7_c7_refugees:()=>({sp:'A family with a handcart', scene:'b7_c7_gate', fx:()=>{ S.f.b7_c7_refugees = 1; }, again:()=>'The family with the handcart, going down the road away from the city.', txt:
`A man and a woman with a handcart, and on the cart a grandmother and two children and everything else, going down the road away from the city. The man stops when he sees the Third, because the cart's wheel has found a rut, and for a moment he has no choice.

He looks at the Third's armour, and its shields, and its faces, and something goes out of him, as if he had been holding his breath since the city.

"You're the foreigners," he says. "The ones from the sea." He gets the wheel out of the rut. "Go on, then. Go in. You're welcome to it." The woman says something to him sharply in Letherii, and he shrugs. "Well, they are."${b77Ledger() ? `\n\nThe grandmother on the cart leans out and looks at the Third a long time. "Are these the ones," she says, "that burn the rolls?"` : ''}`,
      ch:[{t:'Ask them about the gate, and who holds it.', rise:true, req:()=>!S.f.b7_c7_toldTried, check:['guile', 15], fx:()=>{ S.f.b7_c7_toldTried = 1; },
            edges:id=>[id === 'doss' && ['he talks the way they talk', 3], id === 'wenna' && ['she is a Letherii subject too, of a kind', 1], id === 'mehet' && ['he knows how a city\'s gate is held, from the inside', 1], id === 'marrow' && ['she asks after the children first', 1], b77Ledger() && ['the grandmother has heard of the burned rolls', 2], id === 'ottar' && ['grey plate and a foreign accent', -2], id === 'sathi' && ['filed teeth', -1]],
            near:{t:()=>`Yes, but the cart's wheel comes out of the rut all at once and goes over ${b77Nm(b77Who())}${b77Who() === 'sgt' ? 'r' : '\'s'} foot. Bruised. The man tells you anyway.`, fx:()=>bruise(b77Who(), bruiseN())},
            go:'b7_c7_refugees_ok', fail:'b7_c7_refugees_no'},
          {t:'Let them go.', go:()=>startExplore()}]}),
    b7_c7_refugees_ok:()=>({sp:'A family with a handcart', scene:'b7_c7_gate', fx:()=>{ S.f.b7_c7_told = 1; }, txt:
`The man looks at his wife. She looks at the road. Then he tells you.

"The gate's garrison was a full company, at the start of the summer," he says. "Half of it went to the army. Half of what was left went over the wall the night the Edur walked out." He spits. "There's crossbowmen on the gatehouse that were sweeping the barracks yard a month ago. Levies. The left tower's levies won't stand. My brother-in-law's one of them. He told me so himself, last night, and gave me his good boots."

He lifts the cart's handles. "Don't kill him if you can help it. He's an idiot. My wife's fond of him."`,
      ch:[{t:'"We\'ll look for him." Let them go.', go:()=>startExplore()}]}),
    b7_c7_refugees_no:()=>({sp:'A family with a handcart', scene:'b7_c7_gate', txt:
`The man looks at you, and at the woman, and lifts the cart's handles. "Ask the gate," he says. "It'll tell you." They go on down the road, and do not look back, and the grandmother on the cart watches the Third over her shoulder until the dark has her.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* marines going off along the wall in the dark (never where) */
    b7_c7_marines:()=>({sp:'Marines going along the wall', scene:'b7_c7_gate', fx:()=>{ S.f.b7_c7_marines = 1; }, again:()=>'The marines have gone along the wall into the dark.', txt:
`A file of marines goes past along the foot of the bank, quiet, crouching, with a man in front who is not a soldier and is carrying a shuttered lantern. They are going along the wall, away from the gate, into the dark.

Their sergeant stops by the Third for a breath. She has a cusser in a sling across her chest like a baby. "Heavies," she says. "You've got the front door. Lucky you." She nods along the wall. "We've got the other kind." She does not say what kind. "See you inside. If there is an inside."

Then they are gone along the wall, and the lantern with them.${b77If('mehet', `\n\nMehet watches them go. "Every city has more doors than its walls show," he says. "Y'Ghatan had eleven." He does not say how he knows.`)}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* the Fist down the line, seen, never spoken with */
    b7_c7_fist:()=>({sp:'Officers by the road', scene:'b7_c7_gate', fx:()=>{ S.f.b7_c7_fist = 1; }, again:()=>'The Fist and his officers, up the road, with the gate behind them.', txt:
`Up the road, near enough to see and not near enough to hear, there is a knot of officers round a lantern, and in the middle of it a broad man in a plain cloak, bareheaded, listening more than he talks. Fist Keneb.

He walks down the line while you watch, slowly, stopping at every squad in the ditch. Some of the sergeants stand up. He waves them down. You hear his voice once, down the line, not the words, only the sound of it: a tired man, saying a plain thing, the way you would tell a carter which road.

He does not come as far as the Third. A sergeant of borrowed heavies does not go up the road to a Fist, and the Third does not.${b77Say({haddat:'\n\n"He has a face like my uncle," Haddat says. "My uncle was a good man. He died of it."', tangle:'\n\n"He goes in first," Tangle says. "Fists don\'t do that." He thinks about it. "This one does."', _:''})}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* back down the road: the field a day behind, the barrow unseen */
    b7_c7_behind:()=>({sp:'The road back', scene:'b7_c7_gate', txt:
`The road goes back south the way the column came, past farms with their doors open, toward the field a day behind where the marines built a barrow the Third was not asked to. There is nothing back there for the Third now. The night is going grey along the eastern edge.${b77Say({marrow:'\n\nMarrow looks back down the road a while. "Somebody burned for us, child," she says. "Whoever he was. I felt it from the farm. The warren rang like a bell." She turns round. "Forward, now."', _:''})}`,
      ch:[{t:'Back toward the walls.', go:()=>startExplore()}]}),

    /* the gate (phase 1: not yet; at first light: the assault) */
    b7_c7_gate_go:()=>({sp:'The gate of Letheras', scene:'b7_c7_gate', txt: !S.f.b7_c7_orders ?
`The gate of Letheras, shut, with the lamps along the walls above it and nobody moving behind them. The Third does not go up to a city's gate on its own. The lieutenant first.` :
`The gate of Letheras: two leaves of black timber bound in iron, taller than any gate in Seven Cities, in a gatehouse with two towers and a wicket in the left leaf. There are crossbows on the towers. Behind it, the city, the smoke, and somewhere a sound like the sea that is a great many people shouting.

The grey along the east is going white. ${b77Ph() >= 2 ? 'The Fist is up the road, in front, waiting.' : 'First light, the lieutenant said.'}`,
      ch:[{t:'Wait for first light, with the column.', req:()=>!!S.f.b7_c7_orders, onward:true, fx:()=>{ S.f.b7_c7_ph = Math.max(2, b77Ph()); }, go:'b7_c7_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 2: first light, the gate ======== */
    b7_c7_dawn:()=>({sp:'First light', scene:'b7_c7_gate', txt:
`First light, grey and cold, coming up behind the walls of Letheras so that the towers stand black against it.

The Fist walks up the road to the gate with his officers round him and a sapper of the marines beside him, a short man carrying something in both arms the way you carry a thing you do not want to drop. The column follows in the ditches either side, the heavies first. The Third is right behind the Fist, close enough now to see that his cloak is mended at the hem.

At the gate the sapper sets his burden down against the wicket, and steps back, and looks at the Fist, and the Fist nods. Up on the towers somebody shouts, and a crossbow goes off, wild, into the road.${!S.f.b7_c7_charge && !S.f.b7_c7_chargeTried && ((S.inv && S.inv.sharper) || 0) >= 1 ? `\n\n${b77Sap() ? `${NAME(b77Sap())} is looking at the wicket's hinges, which are on the outside, which is a mistake somebody made a hundred years ago.` : 'The wicket\'s hinges are on the outside, which is a mistake somebody made a hundred years ago.'} A sharper on each, and the wicket comes down a breath before the sapper's charge goes, and the Third is through it while the garrison is still looking at the smoke.` : ''}`,
      ch:[{t:`${b77SapN()} ${b77Sap() ? 'puts' : 'put'} a sharper on the wicket's hinges.`, tag:'uses 1 sharper', req:()=>!S.f.b7_c7_charge && !S.f.b7_c7_chargeTried && ((S.inv && S.inv.sharper) || 0) >= 1, check:['wits', 16], fx:()=>{ S.f.b7_c7_chargeTried = 1; },
            edges:id=>[(id === 'tangle' || id === 'rasp') && ['a hinge is a sapper\'s friend', 3], id === 'mehet' && ['he knows how a gate hangs', 1], b77Strip() && id === b77Sap() && ['the transport\'s stores, carried all the way for this', 1], id === 'ottar' && ['grey plate at a wicket under crossbows', -2], id === 'doss' && ['he has never touched a sharper', -2]],
            near:{t:()=>`Yes, but the fuse spits back as it catches and takes the skin off ${b77Nm(b77Who())}${b77Who() === 'sgt' ? 'r' : '\'s'} knuckles. Bruised. The wicket comes down.`, fx:()=>bruise(b77Who(), bruiseN())},
            go:'b7_c7_dawn_ok', fail:'b7_c7_dawn_no'},
          {t:'"Third. Behind the Fist."', onward:true, go:'b7_c7_gate_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c7_dawn_ok:()=>({sp:'The wicket', scene:'b7_c7_gate', fx:()=>{ if (!S.f.b7_c7_charge) { S.f.b7_c7_charge = 1; S.inv.sharper = Math.max(0, (S.inv.sharper || 0) - 1); note('The wicket\'s hinges are gone. The Third goes through first.', 'good'); } }, txt:
`Two cracks, close together, flat and loud under the gate's arch, and the wicket sags on its frame and falls inward with a sound like a dropped table. The sapper's charge has not even gone yet.

The marines' sapper looks at the hole, and at ${b77Sap() ? NAME(b77Sap()) : 'you'}, and says something short and approving that is not repeatable. The Fist goes through the hole, sword out, and the Third goes after him, a breath ahead of the garrison.`,
      ch:[{t:'Through the wicket.', onward:true, go:'b7_c7_gate_start'}]}),
    b7_c7_dawn_no:()=>({sp:'The wicket', scene:'b7_c7_gate', txt:
`The fuse goes out in the damp of the arch, halfway, and there is no time to cut another. ${b77Sap() ? `${NAME(b77Sap())} pulls the sharper back off the hinge and pockets it, and says something in Kanese that is not a prayer.` : 'You pull the sharper back off the hinge and pocket it.'}

The marines' sapper's charge goes instead, a breath later, with a noise like the end of the world, and the wicket goes in with half the leaf round it.`,
      ch:[{t:'Through the smoke.', onward:true, go:'b7_c7_gate_start'}]}),
    b7_c7_gate_start:()=>({sp:'The gate of Letheras', scene:'b7_c7_gate', txt:
`Through the wicket into the passage under the gatehouse, dim and long and full of smoke, with the city at the far end of it like a lamp at the end of a corridor.${S.f.b7_c7_charge ? ' The garrison is still turning round.' : ' The garrison is waiting.'}${S.f.b7_c7_told ? `\n\nOn the left tower's stair, three crossbowmen look at the Third coming through the smoke, and at each other, and put their crossbows down on the steps, and go up the stair and out of the fight. One of them has very new boots.` : ''}`,
      ch:[{t:'"Third. With the Fist."', onward:true, go:()=>startBattle('b7_c7_gate', Object.assign(S.f.b7_c7_charge ? {surprise:'p'} : {}, S.f.b7_c7_told ? {drop:[5]} : {}))},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c7_gate_after:()=>({sp:'The gatehouse yard', scene:'b7_c7_square', fx:()=>{ if (!S.f.b7_c7_gateDone) { S.f.b7_c7_gateDone = 1; gain('b7_c7_lethcloak'); } }, txt:
`The Finadd goes down on one knee on the wet cobbles with his sword across his thighs, and looks at it, and then holds it up, hilt first, not to the Third, but past the Third, to the broad man in the plain cloak coming through the arch behind it.

The Fist takes it, and says something to him, too low to hear, and the Finadd nods, and gets up, and unclasps his cloak, and folds it, and because the Fist's hands are full he gives it to the nearest soldier of the column. The nearest soldier is ${b77Mates().length ? NAME(b77Mates()[0]) : 'you'}. Then he sits down against the wall with his men and puts his head back against the stone.

The gate of Letheras is open. Through the inner arch the city is waiting, and it is very loud.${b77Say({haddat:'\n\nHaddat says the names under her breath, standing in the gate of Letheras, all of them, from the Chain on. It takes a while. The column waits for her.', marrow:'\n\nMarrow goes round the Third with her hands. "All of you," she says, at the end, surprised. "Well, child."', _:''})}`,
      ch:[{t:'Into the gate square.', onward:true, go:()=>{ startExplore('b7_c7_square'); talk('b7_c7_square_arrive'); }}]}),

    /* ======== the gate square, inside ======== */
    b7_c7_square_arrive:()=>({sp:'Inside the gate', scene:'b7_c7_square', again:()=>'The gate square, the garrison sitting by the wall, the shutters, the city loud beyond.', txt:
`Inside the gate, a cobbled square with the gatehouse behind and tall shuttered houses all round it, and streets going off it south and east toward the smoke. The column comes in through the gate behind the Third in a steady grey stream, and spreads into the square, and stops, because nobody has said what next.

Behind every shutter there are eyes. ${b77Mood()}

Somewhere east, a long way off, the sound like the sea goes on: a crowd, a very big one, shouting the same thing over and over, and you cannot make out what.`,
      ch:[{t:'The lieutenant.', go:'b7_c7_lt2'},
          {t:'Look round the square.', go:()=>startExplore()}]}),
    b7_c7_lt2:()=>({sp:'The lieutenant', scene:'b7_c7_square', fx:()=>{ S.f.b7_c7_lt2 = 1; }, again:()=>'The lieutenant, by the gatehouse. "The streets, Sergeant. East, to the canal."', txt:
`The lieutenant has her crossbow on her shoulder and blood on her sleeve that is not hers. She looks round the square at the Third, counting, and gets to the end.

"The Fist holds the gate," she says. "The rest of us go in. The palace is north, and that's not ours." She says it flatly, and you understand that somebody else's squads are already on the way there. "Ours is the streets between here and the canal. The mob's got most of them. There are grey coats running from it, Patriotists, and some of the palace soldiers who threw in with them, and they're making stands where they can." She shrugs. "Keep the mob off whoever gives up. Keep whoever doesn't give up off the mob. Don't get between the mob and anything it really wants."

She looks east, toward the shouting. "And Sergeant. If the ground does anything strange today, I don't know what it is either."`,
      ch:[{t:'"The streets. Yes, Lieutenant."', go:()=>startExplore()}]}),
    b7_c7_prisoners:()=>({sp:'The gate\'s garrison', scene:'b7_c7_square', fx:()=>{ S.f.b7_c7_prisoners = 1; }, again:()=>'The gate\'s garrison, sitting against the wall with their helmets off.', txt:
`The gate's garrison sits against the gatehouse wall with their helmets off and their weapons in a heap in front of them, under two marines with crossbows who are not watching them very hard. The Finadd is at the end of the row, cloakless, with his eyes shut.

One of them, a young soldier with a cut lip, looks up at the Third. "The Edur went," he says, before anyone asks. "Days ago. All of them, out of the city, in the night, every one. Not a word to us." He laughs, not well. "We were guarding the Emperor's gate for the Edur, and the Edur went home."

"The Emperor's in the arena," says the man beside him. "With his champions. He dies and gets up. He's been doing it all year." He looks at the Third's swords. "You'll see."${b77If('wenna', `\n\nWenna crouches by the young one and looks at his lip. "Shake?" she says. He shakes his head. "Pity," she says, and gives him her water-skin.`)}`,
      ch:[{t:'The Finadd at the end of the row.', req:()=>!S.f.b7_c7_finadd, go:'b7_c7_finadd'},
          {t:'Leave them to the marines.', go:()=>startExplore()}]}),
    b7_c7_finadd:()=>({sp:'The garrison\'s Finadd', scene:'b7_c7_square', fx:()=>{ S.f.b7_c7_finadd = 1; }, txt:
`The Finadd opens his eyes when the Third stops in front of him. He is older than he looked with a sword in his hand, grey at the temples, with the careful face of a man who has kept a gate for twenty years and a ledger for every one of them.

"The cloak was my father's," he says, to whoever has it. "He kept this gate too." He looks at it a moment. "It turns rain. Keep it dry." That is all he has to say about the cloak.

"The palace soldiers threw in with the Invigilator's people when the Edur went," he says. "Not mine. The grey coats came to my gate last night with a list, and I sent them away, and they went into the city to make their stand somewhere else." He shuts his eyes again. "You will find them. Or the crowd will. I would rather it was you, and I do not know why I should care."`,
      ch:[{t:'Leave him to the marines.', go:()=>startExplore()}]}),
    b7_c7_water:()=>({sp:'A woman with a water-jar', scene:'b7_c7_square', fx:()=>{ S.f.b7_c7_water = 1; }, again:()=>'The woman with the water-jar, at her door.', txt:
`A door opens in a tall house at the side of the square, the first one, and a woman comes out with a water-jar on her hip and a ladle, and stands on her step looking at the Third.

${b77Tier() === 'quiet' ? `She fills the ladle and drinks from it herself, and looks at the Third over it, and goes back in, and bolts the door. It was her water. She wanted the foreigners to see her drink it.` : b77Tier() === 'stirring' ? `She holds the ladle out, at arm's length, as if to a dog she is not sure of. When ${b77Mates().length ? NAME(b77Mates()[0]) : 'you'} ${b77Mates().length ? 'takes' : 'take'} it and drinks and gives it back, she nods once and goes in. She leaves the door open.` : `She comes down off the step with the jar and goes along the Third with the ladle, one each, like a woman at a harvest, and says something in Letherii to each of them that nobody in the squad understands and everybody does.`}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b7_c7_wall_gate:()=>({sp:'The gate, from inside', scene:'b7_c7_square', txt:
`The gate of Letheras from the inside: the passage, the arch, and in the arch the Fist, standing with his officers in the smoke with the Finadd's sword still in his hand, looking out at the road where the rest of the column is coming in. He has the gate. He is going to hold it himself. The Third's road is the other way.`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b7_c7_shop:()=>({sp:'A shuttered shop', scene:'b7_c7_square', txt:
`A chandler's shop with its shutters nailed, and on the shutters, in charcoal, a rat: a quick drawing, a few lines, a tail. Someone has tried to scrub it off and given up. ${b77Say({doss:'Doss looks at it. "The rat-catchers," he says. "They do that. They were outlawed, the whole guild." He sounds almost respectful. "Didn\'t stop them drawing."', mehet:'Mehet looks at it a long while. "In Y\'Ghatan that would mean a door," he says. "Here I do not know what it means."', _:'It means something to somebody. Not to the Third.'})}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b7_c7_square_east:()=>({sp:'The streets', scene:'b7_c7_square', txt: !S.f.b7_c7_lt2 ?
`The streets go off south and east toward the smoke. The lieutenant will want a word before the Third goes into them.` :
`The streets go off south and east toward the smoke and the shouting. Letheras.`,
      ch:[{t:'Into the streets.', req:()=>!!S.f.b7_c7_lt2, onward:true, fx:()=>{ S.f.b7_c7_ph = Math.max(3, b77Ph()); }, go:()=>{ startExplore('b7_c7_streets'); talk('b7_c7_streets_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 3: the streets, the city's last day ======== */
    b7_c7_streets_arrive:()=>({sp:'The streets', scene:'b7_city_burning', again:()=>'The streets of Letheras, the smoke, the shouting, the shutters.', txt:
`The streets of Letheras are not like any streets in Seven Cities. They are straight, and paved, and drained, and there are canals in them, and the houses are tall and close and narrow, and every one of them has its shutters closed in the middle of the morning.

There is broken glass in the gutters. There is a broadsheet torn half off a wall. There are no Edur anywhere, and no city watch, and at the end of every street going east there is the crowd: not a mob, from here, only a great many people standing, and shouting, and moving the way water moves.

At the corner ahead, outside a merchant's door, somebody has left a brazier burning on the cobbles and gone.${b77If('doss', `\n\nDoss stands in the middle of the street with the flail on his shoulder, turning slowly, looking up at the houses. "I never saw it," he says. "The city. All my life it was where the factor went." He keeps turning.`)}`,
      ch:[{t:'The brazier at the corner.', go:'b7_c7_corner'},
          {t:'Doss, in the middle of the street.', req:()=>b7In('doss') && !S.f.b7_c7_dossCity, go:'b7_c7_doss_city'},
          {t:'Walk the street.', go:()=>startExplore()}]}),
    b7_c7_doss_city:()=>({sp:b7In('doss') ? 'Doss' : 'The street', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_dossCity = 1; }, txt: !b7In('doss') ?
`The street, straight and paved and shuttered, going east toward the shouting.` :
`Doss has stopped in front of a tall house with a pair of fish carved over the door and its shutters closed, and he is looking up at it.

"That's a factor's," he says. "A city one. You can tell by the fish. Ours had the same over the counting-house door on the holding." He keeps looking. "The tally-books came here. Every quarter-day, on a cart, under a cloth, to a house like this. And here somebody added them all up." He turns the flail on his shoulder. "I used to think of it at night. A room in the city, with all of us in it, in columns."

He looks down the street toward the crowd. "${b77Ledger() ? 'We burned one room of it. In the counting room, inland. I watched.' : S.f.b7_c3_key === 'loot' ? 'We ate a factor\'s bread, inland, and left his rolls on the shelf. I think about the rolls.' : 'I never saw a book burn.'}" He breathes out. "Now the city's out in the street shouting. With the books still in the rooms." He does not seem to know whether that is funny.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    /* the first halt: the brazier at the corner (the reading) */
    b7_c7_corner:()=>({sp:'The corner', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_corner = 1; }, again:()=>'The brazier at the corner, the merchant\'s doorstep, the shouting two streets off.', txt:
`A brazier on the cobbles outside a merchant's door, burning down, with a kettle on it that has boiled dry. Whoever left it left in a hurry. The doorstep is wide and dry and has a carved lintel over it, a pair of fish.

The Third sits down on it, all of it, the first time since the ditch. Two streets off, the crowd is shouting. Nearer, there is somebody running, and then not.${b77Say({marrow:'\n\nMarrow lowers herself onto the step with a long breath. "A city, child," she says. "The whole of it. I have sat on a doorstep in every city I ever came into. It is the only way to meet one."', haddat:'\n\nHaddat sets the blue shield against the door, facing out. "A door at our backs," she says. "In Letheras." She almost laughs.', _:''})}`,
      ch:[b7ReadChoice(7),
          {t:'Sit a while.', go:'b7_c7_fire'},
          {t:'On, into the street.', go:()=>startExplore()}]}),
    b7_c7_read:()=>b7ReadOffer(7),
    b7_c7_card:()=>b7ReadCard(7),

    /* the fire: by phase. 1 the road (no fire); 2 the square (no fire, no time); 3 the brazier at the corner; 4 the billet's brazier,
       three weeks on. The games pass wraps this node: keep the id */
    b7_c7_fire:()=>{ const ph = b77Ph(), fell = b77Fell();
      if (ph <= 2) return {sp:'The road', scene:'b7_c7_gate', txt:
`No fire under the walls. The column lies in the ditches either side of the road in the dark, and waits for the light, and does not light anything the crossbows on the towers could use.`,
        ch:[{t:'Talk with the squad.', go:'b7_c7_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      const late = ph >= 4, rk = 'b7_c7_rest' + (late ? 4 : 3);
      return {sp:late ? 'The billet' : 'The corner', scene:late ? 'b7_c7_after' : 'b7_city_burning', html:risingHTML(),
        again:()=> late ? 'The billet by the canal, the brazier, the city going past.' : 'The brazier at the corner, the doorstep, the crowd two streets off.', txt:
`${late ? `The brazier outside the Third's billet, a chandler's house by a canal bridge, where the squad has slept for three weeks in beds, which it has not got used to. The city goes past on the bridge all day, about its business, and some of it nods to the foreign soldiers now.` : `The brazier at the corner, burning down, and the Third on the merchant's doorstep round it. Two streets off, the crowd. Over the roofs, the smoke.`}${fell.length ? `\n\nThe Third sits in its ring with ${fell.length > 1 ? 'gaps' : 'a gap'} in it, where ${b77And(fell.map(NAME))} would be. ${fell.length > 1 ? 'They are' : b77Cap(b77He(fell[0])) + ' is'} back by a mill-race in a village on the river, under a stone the village said it would put. The squad leaves the ${fell.length > 1 ? 'gaps' : 'gap'} where ${fell.length > 1 ? 'they are' : 'it is'}.` : ''}${b77Say({marrow:'\n\nMarrow has her knotted string out, and is running it through her fingers.', haddat:'\n\nHaddat is oiling the blue shield\'s straps.', _:''})}`,
        ch:[b7ReadChoice(7),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(late ? 'The squad sleeps the afternoon in beds. Wounds close, the last of them.' : 'The squad sleeps an hour on the doorstep, in turns. Wounds close, mostly.'); }, go:'b7_c7_fire_rest'},
            {t:'Talk with the squad.', go:'b7_c7_fire_talk'},
            {t:'The last of it.', req:()=>late && !!b77Key(), onward:true, go:'b7_c7_end'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c7_fire_rest:()=>({sp:b77Ph() >= 4 ? 'The billet' : 'The corner', scene:b77Ph() >= 4 ? 'b7_c7_after' : 'b7_city_burning', txt:
`${b77Ph() >= 4 ? 'An afternoon, then, in a chandler\'s beds, with the canal going by under the window and the city getting on with itself.' : 'An hour, then, on the doorstep, in turns, with the crowd going on two streets off like surf.'}

${b77Say({marrow:'Marrow goes round the squad with her hands and stops at each of them long enough to frown. "Sleep, child," she says. "That is the medicine. I am only the bottle."', mirrel:'Mirrel goes round with the water skin, one mouthful each, and watches each one swallow. "Drink. Good."', _:'Some of them sleep. The rest sit with their backs to the wall and do not.'})}${b77If('haddat', `\n\nHaddat lies down with her head on her pack and says names under her breath${b77Fell().length ? ', and at the end of them, the new ones' : ''}.`)}`,
      ch:[{t:'Back.', go:'b7_c7_fire'}]}),
    b7_c7_fire_talk:()=>{ const ph = b77Ph(), late = ph >= 3, end = ph >= 4, fell = b77Fell(), ln = [];
      if (b7In('haddat')) ln.push(!late ? `Haddat is looking at the walls. "My mother said every city has a gate it is proud of," she says. "This one is very proud." She runs a thumb along the blue shield's rim. "Tomorrow it will have been opened by a man in a mended cloak."` : end ? `Haddat has the blue shield across her knees. "I say the names every night," she says. "In Letheras. Three weeks. They do not get shorter." She looks at the canal. "I did not think I would say them here. I did not think there would be a here."` : `Haddat is watching the end of the street, where the crowd is. "They are not shouting at us," she says, carefully, as if checking it. "Hood's breath. They are not shouting at us."`);
      if (b7In('sathi')) ln.push(!late ? `Sathi is lying on her back in the ditch with her filed teeth showing at the stars. "A city," she says. "Weasels hated cities. Too many doors." She grins. "I like doors."` : `Sathi is sitting on the step with her knife across her knees. "All those years, the Weasels said nobody takes a city with a squad," she says. "${end ? 'We took one with a column. Close enough.' : 'They never met the Fist.'}" She laughs at something, and does not say what.`);
      if (b7In('tangle')) ln.push(`Tangle has the satchel open in his lap, counting by feel. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." He touches the Kanese bead on his wrist. ${!late ? '"Enough for a gate. Not two."' : end ? '"I could go home with that," he says. "I could sell that in Kan and buy a boat." He closes the satchel. "I won\'t."' : '"A whole city, and I\'ve used one." He sounds disappointed.'}`);
      if (b7In('marrow')) ln.push(!late ? `Marrow is warming her knuckles in her armpits. "The warrens are thin tonight, child," she says. "Something under that city is drinking from them." She sniffs. "Something old. I do not like it."` : end ? `Marrow is tying a knot in her string, slowly. "${fell.length ? 'One for each, child,' : 'None new since the river, child,'}" she says. "${fell.length ? 'So my hands know.' : 'I tie one anyway, every night, for the ones up the road.'}" She holds the string up. "It is long, now. Longer than I am."` : `Marrow is looking at the smoke. "Soliel walks in a city like this," she says. "She stops at doors. I can feel her doing it." She puts her hand on the step. "Some of them she opens."`);
      if (b7In('mirrel')) ln.push(`Mirrel is counting salves into her bag in threes. "${numw(S.inv.salve || 0, true)}," she says. ${!late ? '"Enough for a gate." She closes it.' : end ? '"I have been to the city\'s poorhouse," she says. "Sixty beds and four healers. Better than Li Heng." She closes the bag. "Not much."' : '"Enough." She keeps her hand on the bag anyway.'}`);
      if (b7In('tallow')) ln.push(`Tallow has his grandmother's deck out, turning it over without opening it. "${!late ? 'She said never read the night before a gate' : end ? 'She said every city reads differently once it has a new king' : 'She said the cards come up crowned on a day like this'}," he says. "${!late ? 'She never said why.' : 'I don\'t know. I haven\'t asked them.'}"`);
      if (b7In('hessa')) ln.push(`Hessa sits straight with the spear upright. "D'rek is under this city," she says. "The worm goes under all of them." She puts her palm flat on the ${!late ? 'ground' : 'stones'}. "${!late ? 'Something else is under it too. The worm is turning away from it.' : 'Something moved under here today. The worm felt it. I do not know what it was.'}"`);
      if (b7In('tebbet')) ln.push(`Tebbet is fletching arrows with gull feathers. "${!late ? 'Those towers on the wall,' : end ? 'There is a tower by the bridge,' : 'Every street in this city is straight,'}" he says. "${!late ? 'Long way up. I\'d like to be on one.' : end ? 'I go up it every morning. You can see the river all the way to the sea.' : 'A bow likes a straight street.'}"`);
      if (b7In('darrut')) ln.push(`Darrut has his helm on his knee. "${!late ? 'In the Aren Guard we held gates,' : 'In the Aren Guard I stood on the wall when the gate was shut on the Chain,'}" he says. ${!late ? '"Tomorrow we open one. I have never opened one." He turns the helm. "I expect it is the same, from the other side."' : '"Today the gate was opened, and nobody was left outside it." He turns the helm over. "It is better."'}`);
      if (b7In('yorin')) ln.push(`Yorin has his copper wind-vane on his palm. ${!late ? 'It will not settle. "Serc doesn\'t like this city," he says. "Something under it is pulling all the air down."' : '"Wind off the river," he says. "Clean, for the first time since the coast." He grins. "Clear tomorrow."'}`);
      if (b7In('rasp')) ln.push(!late ? `Rasp is checking fuses with her lips moving. "A gate," she says. "A real one. Big as a house." She grins. "I hope they let us do it."` : `Rasp is looking up at the tall houses. "Slate on oak," she says. "Every one. If you wanted to, you could bring this whole street down with four sharpers." She sighs. "No one wants to."`);
      if (b7In('orvas')) ln.push(`Orvas is looking at a tethered cart-horse in a yard, the only horse left in the street. "${!late ? 'The Burned Tears are with the Adjunct,' : 'The Burned Tears are outside the walls,'}" he says. "${!late ? 'I keep remembering.' : 'They will come in tomorrow, and weep, and the Letherii will not know what to make of them.'}" He pulls a strap tight on nothing.`);
      if (b7In('redblade')) ln.push(`Ramin is scraping rust off his red scale. "${!late ? 'In Seven Cities a city that opens its gate is a city that has sold you' : 'In Seven Cities a crowd that shouts like that is about to burn something'}," he says. "${!late ? 'Here, I do not know.' : 'Here they are burning paper.'}"`);
      if (b7In('warlock')) ln.push(`Keth sits with his knees drawn up. "*${!late ? 'A city with an emperor who dies and gets up,' : end ? 'A city with a new emperor,' : 'A city shouting for a new master,'}*" the grandmother says, out of his mouth. "*${!late ? 'My mother\'s country had one of those. It did not end well for the city.' : 'Well. I have seen worse masters chosen by worse crowds.'}*"`);
      if (b7In('mehet')) ln.push(`Mehet is turning his ring of keys over. "${!late ? 'Every city has more doors than its walls show,' : end ? 'I know all the streets between here and the river now,' : 'A city of straight streets,'}" he says. "${!late ? 'I would like to know this one\'s.' : end ? 'Every one. It took three weeks. Y\'Ghatan took a year.' : 'Easy to march down. Hard to hide in.'}" He holds one key up to the light.`);
      if (b7In('ottar')) ln.push(`Ottar is cleaning the wolf on his shield with a thumb. "Today's word," he says, "is *${!late ? 'gate' : end ? 'emperor' : 'crowd'}*." He tries it again. "${!late ? 'In Perish we would sing before a gate. Here, I think, they lie in a ditch.' : end ? 'They have a new one. I have asked everyone his name. They say only, the new one.' : 'A crowd in Perish is a thing that sings. This one shouts. It is almost the same.'}"`);
      if (b7In('doss')) ln.push(!late ? `Doss is sitting on the bank with the flail across his knees, looking at the walls. "The factor went there every quarter-day," he says. "With the tally-books. To the counting-houses." He is quiet a while. "I always wondered what it looked like inside."` : end ? `Doss is watching the people on the bridge. "No one's asked for a quarter-day since we came," he says. "No one can find the ledgers. Some say the treasury was empty before we got here. Some say the Patriotists had it, or the old emperor's people, or nobody." He turns the flail over. "I don't care who. It's gone."` : `Doss is watching the end of the street, where the crowd is. "They're Indebted," he says. "Most of them. All of them, maybe." He grips the flail. "They're shouting. In the city. In the street." He does not seem able to say anything else.`);
      if (b7In('wenna')) ln.push(!late ? `Wenna has her bare feet in the ditch-water. "The river goes right through it," she says. "Under the walls, and out." She wriggles her toes. "Anything goes anywhere, if it's water."` : end ? `Wenna is sitting on the canal steps with her feet in the water. "They say the Shake have a queen again," she says. "On the coast. They say it in the market like it's the price of fish." She looks at the water a long time. "My brother would have liked that."` : `Wenna is looking at a canal under a bridge, brown and slow. "Sewer," she says. "The whole city floats on it." She sniffs. "Still goes to the sea."`);
      if (late && fell.length) ln.push(`${fell.length > 1 ? 'There are gaps' : 'There is a gap'} in the ring where ${b77And(fell.map(NAME))} would sit. The squad sits round ${fell.length > 1 ? 'them' : 'it'}, in Letheras, and does not close ${fell.length > 1 ? 'them' : 'it'} up.`);
      return {sp:end ? 'The billet' : late ? 'The corner' : 'The road', scene:end ? 'b7_c7_after' : late ? 'b7_city_burning' : 'b7_c7_gate', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back.', go:'b7_c7_fire'}]}; },

    /* the holdouts: a broker's counting-house, the mob, the grey coats inside */
    b7_c7_holdouts:()=>({sp:'The counting-house', scene:'b7_city_burning', again:()=> S.f.b7_c7_holdoutsDone ? 'The counting-house, its door held, its stair quiet.' : 'The counting-house, the barricade, the crowd waiting at the end of the street.', txt: S.f.b7_c7_holdoutsDone ?
`The broker's counting-house, its door shut now, with a marine on it. The ledgers inside are still on their shelves. The crowd has gone on, toward the shouting.` :
`A broker's counting-house, three floors of dressed stone with a pair of fish carved over the door, and in front of it, across the street, a barricade of a cart and a broker's furniture: a desk, a strongbox, a chair with arms. Behind the barricade, grey coats.

At the end of the street, the crowd. Not all of it: a few hundred, men and women, with staves and stones and a ladder, waiting. They have chased the grey coats this far and stopped, because the grey coats have long knives, and the crowd has worked out that the first ones over the barricade will not be the ones who see what is behind it.

When the Third comes up the street the crowd goes quiet, and watches, to see what the foreigners will do.${b77Say({doss:'\n\nDoss looks at the grey coats. "Patriotists," he says. "They came to the holding once. For a man who said a thing at the well." He does not say what happened to the man.', mehet:'\n\nMehet looks at the barricade. "A desk," he says. "A strongbox. A chair." He shakes his head. "They have barricaded the street with the thing they were protecting."', _:''})}`,
      ch:[{t:'"Third. Over the barricade, before the crowd does."', req:()=>!S.f.b7_c7_holdoutsDone, onward:true, go:()=>startBattle('b7_c7_streets', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c7_holdouts_after:()=>({sp:'The counting-house stair', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_holdoutsDone = 1; }, txt:
`The captain on the stair goes down against the window with his knives, and what is left of the grey coats on the stair below him puts their knives on the steps, carefully, and their hands on their heads, and looks past the Third, down the stair, at the street. At the crowd.

"Not to them," one of them says. Not begging. Stating a preference.

The Third holds the door. The crowd comes up the street as far as the barricade, and looks at the shields across the counting-house door, and at the squad behind them, and thinks about it, for a long breath. Then somebody at the back shouts the name the crowd has been shouting all morning, and it turns round like one animal and goes off east toward wherever the name is, and the street is empty.

The lieutenant's marines come for the grey coats a while after, with a cord. The captain had a list in his coat. ${b77Say({doss:'Doss takes it out, and looks at it, and cannot read it, and puts it on the brazier at the corner on the way past.', _:'It goes on the brazier at the corner, unread.'})}`,
      ch:[{t:'Back to the street.', onward:true, go:'b7_c7_quake'}]}),
    /* the earthquake, and a white light under a quarter (unexplained; rule 59) */
    b7_c7_quake:()=>({sp:'The street', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_quake = 1; }, again:()=>'The street, and to the north, under one quarter, the white light.', txt:
`The ground moves.

Not much: a long shrug under the cobbles, like a sleeper turning over, and every shutter in the street rattles at once, and a chimney pot comes down two houses along and breaks in the road. Then it is still.

Then, to the north, past the roofs, under one quarter of the city where there is an old tower, a light comes up. White. Not fire, though there is fire round it. It comes up out of the ground between the houses as if the ground were the lid of something, and lies there, under the smoke, white and steady, and does not go out.

Not one of the Third knows what it is, or anyone in the street. A woman at a window looks at it and crosses her hands over her heart in a Letherii sign, and shuts the window.${b77Say({marrow:'\n\nMarrow has gone white herself. "Something old, child," she says. "Something that does sums." She puts both hands flat on the cobbles. "I cannot reach it. I do not want to."', yorin:'\n\nYorin\'s wind-vane is spinning on his palm, round and round, and will not stop. He puts it in his pocket.', hessa:'\n\nHessa has gone down on one knee with her palm on the stones. "The worm has turned away from it," she says. "All the way away."', _:''})}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    /* a white dragon over the palace district, driven off (rule 60); seen from the street, never the roofs */
    b7_c7_sky:()=>({sp:'Marines looking up', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_sky = 1; }, again:()=>'The sky over the palace, empty again.', txt:
`A squad of marines at a crossing is standing very still in the middle of the street, looking up.

Over the palace district, against the smoke, something white is turning in the sky. Wings. It is too big for anything with wings. It turns once, slow, over the towers, and comes lower, and there is a noise from it that the Third feels in its teeth.

Then, from somewhere on the roofs over there, too far to see who, light: once, twice, a flash and a flat crack that comes late across the city, and something the colour of a burner going off. The white thing turns, and lurches, and goes away north over the river, low, and does not come back.

"Dragon," one of the marines says, to nobody. "A white one." He says it the way you would say *rain*. "Somebody drove it off." He does not say who. He does not seem to want to know.${b77If('ottar', `\n\nOttar watches the sky where it went. "In Perish," he says, after a while, "there is no word for that." He thinks. "There is now."`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    /* the arena, as news (rules 33-35, 58): the Emperor fell and has not got up; an Edur killed there after */
    b7_c7_news:()=>({sp:'A Letherii running', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_news = 1; }, again:()=>'The young man has gone on, telling the next street.', txt:
`A young man comes running down the street from the north, a clerk by his ink-stained cuffs, and when he sees the Third he does not run away. He stops, out of breath, and tells them, because he has to tell somebody and they are there.

"The arena," he says. "The Emperor. He fought the last champion, a giant, the biggest man anybody ever saw, and he fell." He breathes. "And he hasn't got up. He always gets up. The whole arena's waiting, and he hasn't got up." He laughs, wildly, and stops. "And the giant's gone. No one saw where. And they say somebody killed an Edur in there after, one of his own, over the body." He looks at the Third as if they might know what it means. "They say. I don't know. I don't know anything."

He runs on, south, to tell the next street.${b77If('wenna', `\n\nWenna watches him go. "Dies and gets up," she says. "That's what they said on the coast. Every fisher's widow on the coast said it." She is quiet. "Not this time."`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    /* the crowd, and the men starting the shouting (the Rat Catchers' crowd, seen from the street) */
    b7_c7_shouters:()=>({sp:'Men starting the shouting', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_shouters = 1; }, again:()=>'The crowd at the end of the street, and the men in it starting the shouting.', txt:
`At the end of the street, where it opens on a market, the crowd is thickest, and the shouting comes in waves, and if you watch long enough you can see where each wave starts.

A man on a barrel, in a good coat that is too clean. A woman at a well-head with a voice like a bell. A boy up a lamp-post. Each of them shouts first, and the crowd round each of them shouts after, and it goes out from them across the market like rings on a pond. A name. Over and over. Then another word, *Emperor*.

${b77Say({doss:'Doss watches the man on the barrel. "He\'s paid," he says. "Look at his hands. Never worked a day." He keeps watching. "They\'re shouting it anyway. The ones who aren\'t paid. They mean it."', mehet:'Mehet watches the boy on the lamp-post. "In Y\'Ghatan we paid boys to start a song in the market," he says. "It only worked if the market already knew the words."', _:'Somebody is paying the ones who start it. The ones who finish it are not being paid. You can tell from their faces.'})}

A man near the Third sees you watching, and grins, and puts his finger on the side of his nose, and draws a quick shape on a wall with a bit of charcoal as he goes past: a rat, a few lines, a tail. Then he is gone into the crowd.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    /* a torn broadsheet (the Patriotists' last word) */
    b7_c7_broadsheet:()=>({sp:'A torn broadsheet', scene:'b7_city_burning', txt:
`A broadsheet pasted on a shop's shutter, half torn off, the black letters still clear on what is left: *THE LOYAL AND THE DISLOYAL. Citizens are reminded that the Invigilator* … and the rest is gone. Someone has drawn a rat over the Invigilator's name, and somebody else has drawn a better one beside it.${b77Say({doss:' Doss cannot read it. He asks what it says, and when he is told, he tears off the rest of it and puts it in his shirt.', _:''})}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the bridge: the crowd on it, garrison crossbowmen holding it (optional); b7Rise(1, 'the crowd') once; the trick */
    b7_c7_bridge:()=>({sp:'The bridge', scene:'b7_city_burning', fx:()=>{ if (!S.f.b7_c7_crowdRose) { S.f.b7_c7_crowdRose = 1; b7Rise(1, 'the crowd'); } }, html:risingHTML(), again:()=> S.f.b7_c7_bridge ? 'The bridge, the crowd going over it both ways.' : 'The bridge, the crowd at both ends, the crossbows on the hump.', txt: S.f.b7_c7_bridge ?
`The bridge over the canal, the crowd going over it both ways, an overturned handcart pushed to one side. ${b77Mood()}${!S.f.b7_c7_luckTried ? `\n\nAt the bridge's foot an old woman sits on an upturned pail with a bowl in front of her, spinning a dock on her thumbnail for anyone who will put a coin in the bowl.` : ''}` :
`Down a stair to a canal, and a stone bridge over it, humped in the middle, and the crowd at both ends of it, packed in, throwing what it can find at the hump. On the hump, behind an overturned handcart, a squad of the garrison with crossbows, who have not given up because nobody has told them they can.

The crowd sees the Third come down the stair, foreign soldiers, shields and grey-green cloaks, and the near end of it turns round to look.

${b77Mood()}${b77Ledger() ? `\n\nAn old woman near the front holds up a scrap of something charred, a corner of a debt-roll, and shouts at the Third in Letherii, and the people round her look at the scrap, and at the Third, and the word goes back through the crowd faster than you can follow it: *the rolls*. *The ones who burn the rolls.*` : ''}`,
      ch:[{t:'"Third. Take the bridge off them."', req:()=>!S.f.b7_c7_bridge, go:()=>startBattle('b7_c7_bridge', {})},
          {t:'Talk them down off the hump.', rise:true, req:()=>!S.f.b7_c7_bridge && !S.f.b7_c7_talkTried, check:['guile', 16], fx:()=>{ S.f.b7_c7_talkTried = 1; },
            edges:id=>[id === 'doss' && ['he talks like the crowd, and they listen to him', 2], id === 'haddat' && ['a sergeant\'s voice, a shield held low', 2], id === 'darrut' && ['he was a gate-guard once, and talks like one', 2], b77Ledger() && ['the crowd has heard of the burned rolls', 2], S.f.b7_c7_view && ['the garrison at the palace has given up already', 2], id === 'sathi' && ['filed teeth', -2], id === 'ottar' && ['grey plate and a foreign accent', -1]],
            near:{t:()=>`Yes, but a stone from the crowd meant for the hump takes ${b77Nm(b77Who())} on the side of the head. Bruised. The crossbows come down anyway.`, fx:()=>bruise(b77Who(), bruiseN())},
            go:'b7_c7_bridge_talk', fail:'b7_c7_bridge_no'},
          {t:'The old woman with the dock.', req:()=>!!S.f.b7_c7_bridge && !S.f.b7_c7_luckTried, go:'b7_c7_luck'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c7_bridge_talk:()=>({sp:'The bridge', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_bridge = 'talked'; }, txt:
`${b77Nmc(b77Who())} ${b77V(b77Who(), 'go', 'goes')} up the hump of the bridge with ${b77His(b77Who())} shield low and ${b77His(b77Who())} sword in its sheath, slowly, between the stones, and ${b77V(b77Who(), 'stop', 'stops')} a spear's length short of the handcart, and ${b77V(b77Who(), 'say', 'says')} what there is to say: the gate is open; the palace is giving up; the Edur are gone; nobody is coming to tell them they can stop, so the Third is telling them.

The crossbowmen look at each other. The one in charge, a corporal with grey in his beard, looks at the crowd, and at the Third, and lays his crossbow down on the cart. The others do the same.

The Third walks them off the bridge between its shields. The crowd lets them through, which nobody expected, the crowd least of all.`,
      ch:[{t:'Down off the bridge.', go:'b7_c7_bridge_after'}]}),
    b7_c7_bridge_no:()=>({sp:'The bridge', scene:'b7_city_burning', txt:
`The corporal behind the handcart listens, and then a stone comes over from the crowd and takes the man beside him in the face, and the corporal's crossbow comes up.

There is no more talking on this bridge.`,
      ch:[{t:'"Third. Take it."', go:()=>startBattle('b7_c7_bridge', {})}]}),
    b7_c7_bridge_after:()=>({sp:'The bridge', scene:'b7_city_burning', fx:()=>{ if (!S.f.b7_c7_bridge) S.f.b7_c7_bridge = 'fought'; }, txt:
`The bridge is clear. The crowd goes over it both ways at once, and some of it, going past the Third, touches the shields as it goes, the way you would touch a shrine you did not believe in, just in case.${b77Tier() === 'risen' || b77Tier() === 'rising' ? ' Somebody puts a loaf in Haddat\'s shield-hand, or would, if Haddat were holding still; somebody puts one in the nearest hand instead.' : ''}

At the bridge's foot an old woman sits on an upturned pail with a bowl in front of her, spinning a dock on her thumbnail for anyone who will put a coin in the bowl. She has not moved through any of it.`,
      ch:[{t:'The old woman with the dock.', req:()=>!S.f.b7_c7_luckTried, go:'b7_c7_luck'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    /* the trick: the Crowd's Luck, from the old woman, through Doss (the Indebted's spin), Wenna, Tallow or the sergeant */
    b7_c7_luck:()=>{ const te = b77Teacher();
      return {sp:'The old woman with the dock', scene:'b7_city_burning', txt:
`The old woman spins the dock on her thumbnail and catches it flat on the back of her hand, unseen. "For the crowd," she says. "Always for the crowd." She spins it again. She has a face like a walnut and no teeth to speak of and the quickest hands you have ever seen.

${te === 'doss' ? `Doss crouches down in front of her. "We did that on the holding," he says. "When the bread was short. Who carried the overseer's word, who got the crust." He holds out his thumb. "The overseer never once won." The old woman looks at him, and grins her empty grin, and gives him the dock.` : te === 'wenna' ? `Wenna crouches down in front of her. "The fishers do that on the coast," she says. "With a shell. For who goes out first when the sky's wrong." The old woman looks at her bare feet, and grins her empty grin, and gives her the dock.` : te === 'tallow' ? `Tallow crouches down in front of her. "My grandmother did that," he says. "With a copper, for the soldiers, before the cards." The old woman grins her empty grin and gives him the dock.` : `She sees you watching her hands, and grins her empty grin, and holds the dock out to you.`}

"It isn't the Errant's," she says. "Don't let a priest tell you so. It's the crowd's. There's more of us." She taps the bowl. "And it wants paying."`,
        ch:[{t:'Learn the spin: the thumb, the catch, and never looking.', req:()=>!S.f.b7_c7_luckTried, check:['wits', 17], trick:'b7_c7_luck', fx:()=>{ S.f.b7_c7_luckTried = 1; },
              edges:id=>[id === 'doss' && ['the Indebted\'s spin, from the holding', 3], id === 'wenna' && ['the fishers\' shell, the same trick', 2], id === 'tallow' && ['his grandmother\'s copper', 2], id === 'sathi' && ['the Weasels gambled on everything', 1], id === 'tangle' && ['a sapper\'s hands, too careful', -1], id === 'haddat' && ['she does not trust luck', -1], id === 'ottar' && ['gauntlets', -2]],
              near:{t:()=>'Yes, but the crowd wants paying: five silver into the old woman\'s bowl before she will show it twice.', fx:()=>{ S.silver = Math.max(0, (S.silver || 0) - 5); if (typeof updSilver === 'function') updSilver(); }},
              go:'b7_c7_luck_ok', fail:'b7_c7_luck_no'},
            {t:'Put a coin in her bowl, and go on.', go:()=>startExplore()},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c7_luck_ok:()=>({sp:'The old woman with the dock', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_luckOk = 1; b77L(b77Teacher(), 1); }, txt:
`It is in the thumb, and the catch, and above all in not looking: you spin it, and you catch it, and you put it away without seeing which face came up, and then whatever happens next is the face that came up. The old woman makes ${b77Nm(b77Who())} do it eleven times, and on the twelfth she nods.

"There," she says. "Now it's yours. Now you owe it." She holds out the bowl. "Everybody owes it."`,
      ch:[{t:'Put a coin in the bowl.', go:()=>startExplore()}]}),
    b7_c7_luck_no:()=>({sp:'The old woman with the dock', scene:'b7_city_burning', txt:
`${b77Nmc(b77Who())} ${b77V(b77Who(), 'spin', 'spins')} it, and ${b77V(b77Who(), 'look', 'looks')}. Every time. The old woman watches with her head on one side.

"You look," she says. "Soldiers always look." She takes the dock back. "It doesn't work if you look."`,
      ch:[{t:'Put a coin in her bowl anyway.', go:()=>startExplore()}]}),

    /* the street end: the surrender seen from far off; the shout */
    b7_c7_view:()=>({sp:'The end of the street', scene:'b7_city_burning', fx:S.f.b7_c7_holdoutsDone ? ()=>{ S.f.b7_c7_view = 1; } : undefined, again:()=>'The end of the street, the great square below the palace, the crowd in it.', txt: !S.f.b7_c7_holdoutsDone ?
`The street goes north to its end, where it opens on a great square below the palace walls. The square is full of people, and noise. The lieutenant said the palace was not the Third's, and there are grey coats in a counting-house behind you that are.` :
`The street ends at the edge of a great square below the palace walls, and the Third stops there, because the square is full and there is no going further, and because of what is happening at the far side of it.

A long way off, across a sea of heads, at the foot of the palace steps, there are soldiers in good armour coming down the steps in a file, and laying their weapons on the stones, one after another. The garrison of Letheras, giving up. Below them, mounted, small with distance, a figure in grey on a horse, with grey-green soldiers round her. The Adjunct. She does not move. She lets them come to her.

And the crowd shouts. Not one word: two, the way it has been shouting all day, but now all of it at once, from one side of the square to the other, so loud that the Third feels it in its chest. *Saviour.* And then, over it, louder, *Emperor.* *Emperor.*

Who they are shouting at, the Third cannot see from here. Someone on the steps. Two someones. The crowd knows. That is enough for the crowd.${b77Say({haddat:'\n\nHaddat stands at the street\'s end with the blue shield on her arm and watches the weapons going down on the steps. "That is the end of a war," she says. "My mother never saw one end. Only start."', doss:'\n\nDoss is shouting. He does not know the name, and he does not know the words, and he is shouting anyway, with the flail over his head, with the crowd.', _:'\n\nThe Third stands at the edge of it and watches.'})}`,
      ch:[{t:'Back down the street.', go:()=>startExplore()}]}),
    /* evening: the lieutenant; three weeks */
    b7_c7_lt3:()=>({sp:'The lieutenant', scene:'b7_city_burning', fx:()=>{ S.f.b7_c7_lt3 = 1; }, again:()=>'The lieutenant, at the corner. "Three weeks, Sergeant."', txt:
`Toward evening the lieutenant finds the Third at the corner by the brazier, which has gone out. She sits down on the merchant's step beside it without asking, and for a while only sits.

"The garrison gave up to the Adjunct," she says. "All of it, at the palace, this afternoon. The Fist has the gate. Captain Sort has the palace." She does not say how. "The Edur are gone. The Emperor's dead, they say, and didn't get up." She rubs her face. "And there's a new one. The crowd chose him. Or somebody chose him and paid the crowd. I don't know which, and I don't think it matters."

${b77Held() ? `She looks at the squad, and at the gaps in it, if there are gaps. "That mill village," she says. "On the river. Word came in with the Adjunct's lot: the village went back. A man was singing about it in the market. I didn't catch the words." She almost smiles. "The Third's in a song, Sergeant. Don't let it go to your head."` : S.f.b7_c5_key === 'slip' ? `She looks at the squad. "That mill village," she says, and leaves it there, and you are grateful.` : `She looks at the squad, and counts again, from habit.`}

"The army stays in the city a while," she says. "Billets. Beds. Food that isn't somebody's pig." She gets up. "In three weeks or so they'll come round with the lists. Who stays, who goes. Think about it. I'll ask."`,
      ch:[{t:'Three weeks.', onward:true, fx:()=>{ S.f.b7_c7_ph = 4; }, go:()=>{ startExplore('b7_c7_after'); talk('b7_c7_after_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b7_c7_streets_west:()=>({sp:'The streets', scene:'b7_city_burning', txt:
`Back west toward the gate square. The Fist still holds the gate. There is nothing back there for the Third today.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* ======== phase 4: three weeks on ======== */
    b7_c7_after_arrive:()=>({sp:'Three weeks on', scene:'b7_c7_after', again:()=>'A canal street in Letheras, three weeks on, the city getting on with itself.', txt:
`Three weeks on, Letheras is a city again.

The smoke is gone from the towers. The shutters are open in the mornings. The Edur are gone and have not come back, and nobody expects them to. The Patriotists' compound fell the day the gate did, and its files went down to the river in barrows, and some of them were burned and some were kept, and the city argues about which. There is a new emperor, whom nobody in the Third has seen, and a new Preda from the Palace Guard, and the markets are open, and nobody can find the ledgers.

The army of the Adjunct is billeted all over the city, and has been for three weeks, and has got fat, a little, and bored, a lot. The Third has a chandler's house by a canal bridge, with beds.

${({quiet:'The city is polite to the foreign soldiers. It is not friendly. It waits to see what they will do next, the way it waited for the Edur.', stirring:'The city is getting used to the foreign soldiers. Some of it nods to them. Some of it still crosses the street.', rising:'The city likes the foreign soldiers, mostly, the way you like a storm that has gone through and taken the barn you hated. The children follow them in the street.', risen:'The city treats the foreign soldiers as if they had been born in it. The baker on the bridge will not take their silver. The children have learned to march like them, badly, and do it up and down the canal all day.'})[b77Tier()]}`,
      ch:[{t:'The lieutenant.', go:'b7_c7_lt4'},
          {t:'Walk the canal.', go:()=>startExplore()}]}),
    b7_c7_lt4:()=>({sp:'The lieutenant', scene:'b7_c7_after', fx:()=>{ S.f.b7_c7_lt4 = 1; }, again:()=>'The lieutenant, with her three lists.', txt:
`The lieutenant comes along the canal in the morning with three slates under her arm instead of one, and sits on the Third's step, and lays them out.

"Three lists," she says. "The army's going on. The Adjunct hasn't said where, past *east*, and I don't think she'll say before she has to. That's the first slate. The ones who go with her." She taps it. "The Bonehunters, the army calls itself now. From the bones it took up at Y'Ghatan. You'll have heard."

She taps the second. "The new emperor's people want soldiers. Sergeants, mostly, to teach his army how to stand in a line, and a few to stand in one themselves, in the city, for his coin. That's the second." The third. "Time served. A berth on a ship west, when there's a ship. That's the third."

She looks at the Third, all of it, one by one, the way she has since the coast. "You were lent to us, Sergeant. You're not marines. Nobody's ever called you marines." It is very nearly fond. "Your names go on whichever slate you say. I'll not argue."`,
      ch:[{t:'"Where does the army go, Lieutenant?"', req:()=>!S.f.b7_c7_where, go:'b7_c7_where'},
          {t:'"Let me think."', go:'b7_c7_key'}]}),
    b7_c7_where:()=>({sp:'The lieutenant', scene:'b7_c7_after', fx:()=>{ S.f.b7_c7_where = 1; }, txt:
`"East," the lieutenant says. "That's the whole of what anyone's been told. East." She turns a slate over in her hands. "The Perish and the Khundryl are going east on their own road, ahead of us, and the new emperor's sending a detachment of his army with us, under an officer the crowd likes. Past that, the Adjunct says nothing, and the Fist says less, and Captain Sort says the Adjunct knows what she's doing, in the voice you use when you want somebody to believe it."

She looks at you. "Maybe she does. She got us here." She taps the first slate. "That's not nothing, Sergeant. That's a capital."`,
      ch:[{t:'"Let me think."', go:'b7_c7_key'}]}),
    /* the key: the roads out */
    b7_c7_key:()=>({sp:'The lieutenant', scene:'b7_c7_after', html:risingHTML(), again:()=> b77Key() ? ({adjunct:'The first slate, with the Third\'s names on it. With the army.', letheras:'The second slate, with the Third\'s names on it. The new emperor\'s coin.', home:'The third slate, with the Third\'s names on it. Time served.'})[b77Key()] : 'The lieutenant on the step, with her three slates.', txt: b77Key() ?
`The lieutenant has gone on along the canal with her slates. The Third's names are on the ${({adjunct:'first', letheras:'second', home:'third'})[b77Key()]}.` :
`The three slates on the step in the morning sun: the army, the city, home.

${b77Say({haddat:'Haddat looks at the first slate a long time. "Wherever she goes," she says. "It is what we have done since Hissar." She does not say whether she wants it.', marrow:'Marrow looks at the third slate. "Home, child," she says. "I have not said that word in a long time." She does not say whether she wants it either.', _:'The squad looks at the slates, and then at you.'})}${b77If('doss', `\n\n${b77Ledger() ? 'Doss looks at the second slate. "Here," he says. "In Lether. Where the rolls burned." He swallows. "If you go, I\'ll go. But here, Sergeant. If it\'s here."' : 'Doss looks at the second slate. "I\'d stay," he says. "In Lether. But I\'ll go where the Third goes. I said I would."'}`)}${b77If('wenna', `\n\nWenna looks at none of them. "The river goes to the sea whichever," she says. "So do I, one day."`)}${b77If('tangle', `\n\nTangle says, "The army's got the munitions," and leaves it there.`)}${b77If('mirrel', `\n\nMirrel says, "The poorhouse here has sixty beds and four healers," and leaves that there too.`)}`,
      ch:[{t:'"The first slate. With the army, wherever she goes."', req:()=>!b77Key(), fx:()=>{ if (!S.f.b7_c7_key) { S.f.b7_c7_key = 'adjunct'; b77L('haddat', 1); b77L('tangle', 1); b77L('ottar', 1); b77L('orvas', 1); b77L('sathi', 1); b77L('doss', -1); b77L('mirrel', -1); } }, go:'b7_c7_key_adjunct'},
          {t:'"The second slate. The new emperor\'s coin, and a post in Letheras."', req:()=>!b77Key(), fx:()=>{ if (!S.f.b7_c7_key) { S.f.b7_c7_key = 'letheras'; b77L('doss', 2); b77L('wenna', 1); b77L('mehet', 1); b77L('mirrel', 1); b77L('darrut', 1); b77L('haddat', -1); b77L('orvas', -1); } }, go:'b7_c7_key_letheras'},
          {t:'"The third slate. Time served. Home."', req:()=>!b77Key(), fx:()=>{ if (!S.f.b7_c7_key) { S.f.b7_c7_key = 'home'; b77L('marrow', 1); b77L('tallow', 1); b77L('rasp', 1); b77L('yorin', 1); b77L('tebbet', 1); b77L('haddat', -1); b77L('doss', -1); } }, go:'b7_c7_key_home'},
          {t:'"Not yet."', req:()=>!b77Key(), go:()=>startExplore()},
          {t:'Not now.', req:()=>!!b77Key(), go:()=>startExplore()}]}),
    b7_c7_key_adjunct:()=>({sp:'The first slate', scene:'b7_c7_after', html:risingHTML(), txt:
`The lieutenant writes the Third's names on the first slate, one after another, in her small square hand, and blows on them, though chalk does not need it.

"With the army, then," she says. "Wherever." She stands up, and looks at the Third, and for once does not count it. "I'm glad, Sergeant. I'd have been sorry to break in new heavies."${b77Say({haddat:'\n\nHaddat nods once, as if a debt had been paid. "Wherever she goes," she says.', tangle:'\n\n"Munitions," Tangle says, with deep content.', _:''})}${b77If('doss', `\n\nDoss looks at the canal a long time. "I said I'd march," he says. "I'm marching." He does not look back at the second slate.`)}${b77If('ottar', `\n\nOttar puts his fist on the wolf on his shield. "The Perish go east on their own road," he says. "My Destriant sent me to the Third." He thinks. "The Third goes east also. Good."`)}`,
      ch:[{t:'Back to the canal.', go:()=>startExplore()}]}),
    b7_c7_key_letheras:()=>({sp:'The second slate', scene:'b7_c7_after', html:risingHTML(), txt:
`The lieutenant writes the Third's names on the second slate, one after another, slowly, and looks at them when she has done.

"The new emperor's coin," she says. "You'll be teaching Letherii to stand in a line by the end of the month, Sergeant. They'll hate you. Then they'll stand in a line." She stands up. "I'll miss the Third. Don't tell anyone I said so."${b77If('doss', `\n\nDoss sits down on the step very suddenly, as if his legs had gone. "Here," he says. "We stay here." He laughs, and wipes his face with the back of his hand, and laughs again.`)}${b77If('haddat', `\n\nHaddat looks east along the canal, the way the army will go, and then back at the squad. "A wall is a wall," she says, at last. "Wherever you stand it."`)}${b77If('wenna', `\n\nWenna grins. "Near the river," she says. "Good."`)}`,
      ch:[{t:'Back to the canal.', go:()=>startExplore()}]}),
    b7_c7_key_home:()=>({sp:'The third slate', scene:'b7_c7_after', html:risingHTML(), txt:
`The lieutenant writes the Third's names on the third slate, one after another, and when she gets to the end she sits a while with the chalk in her fingers.

"Time served," she says. "You've earned it. The Hood-damned lot of you." She stands up. "There's a ship in a week, they say. West, for Quon Tali. Or near it." She hesitates. "Go and be bored somewhere, Sergeant. You've earned that too."${b77Say({marrow:'\n\nMarrow puts her hand flat on the slate, on the names. "Home, child," she says, very quietly.', tallow:'\n\nTallow is already shuffling his grandmother\'s deck. "I\'ll read for the ship," he says. "Everybody comes back."', _:''})}${b77If('doss', `\n\nDoss looks at the slate, and at the canal, and at the Third. "I've no home but this," he says. "Lether." He is quiet. "I'll walk you to the ship."`)}${b77If('haddat', `\n\nHaddat is quiet. Then: "Hissar," she says, as if trying the word, and it does not seem to fit.`)}`,
      ch:[{t:'Back to the canal.', go:()=>startExplore()}]}),

    /* the moneychanger: a coin with no face */
    b7_c7_coin:()=>({sp:'A moneychanger', scene:'b7_c7_after', fx:()=>{ if (!S.f.b7_c7_coin) { S.f.b7_c7_coin = 1; gain('b7_c7_kingscoin'); } }, again:()=>'The moneychanger at his table by the bridge, weighing coins.', txt:
`A moneychanger at a folding table at the bridge's end, with scales and a strongbox chained to his wrist, doing a brisk trade with the foreign soldiers in their silver. He weighs a Malazan coin for you, and sniffs, and gives you Letherii for it, and among the Letherii there is one he holds up to the light before he hands it over.

"New," he says. "From the mint. Struck the week the city turned over." He turns it. The towers on one side. On the other, nothing at all: a blank, bright face. "They didn't know whose to put on it yet." He shrugs. "Still don't, half of them. Take it. It's not full weight. No one'll take it off you at full weight." He grins. "No one'll take it off you at all, I expect. Keep it. For luck."${b77If('doss', `\n\nDoss holds the coin a long time, turning it, the blank side up. "No face," he says. "Nobody's." He gives it back to you carefully, as if it might break.`)}`,
      ch:[{t:'Back to the canal.', go:()=>startExplore()}]}),
    /* the Letherii's road, as one line of news (the other squad, seen from across the canal) */
    b7_c7_whitefinders:()=>({sp:'Letherii soldiers over the canal', scene:'b7_c7_after', fx:()=>{ S.f.b7_c7_white = 1; }, again:()=>'Across the canal, the Letherii company with the white fingertips on their shields.', txt:
`Across the canal, on the far bank, a company of Letherii soldiers with a white fingertip painted on every shield, ${({army:'drilling in a yard under a Malazan sergeant with a voice like a gate, who is teaching them to stand in a line and making them hate it; one squad of them already stands in it better than the rest', palace:'marching up the canal road toward the palace in good order, to stand a door there, behind an officer with a roll under his arm; one squad of them looks as if it has stood worse doors', free:'coming out of a barracks gate in twos and threes with papers in their hands and their coats over their arms, out of the army, into the street; one squad of them stops at the gate a moment, all together, and then goes'})[b77LethRoad() || 'army']}.

${b77Say({wenna:'Wenna watches them. "That lot were at the river," she says. "Against the Adjunct. Someone said." She shrugs. "They look all right."', doss:'Doss watches them. "Letherii," he says. "Soldiers. Same as us, I suppose." He sounds surprised to have said it.', _:'The Third watches them a while from its own bank, and they do not look across.'})}`,
      ch:[{t:'Back to the canal.', go:()=>startExplore()}]}),
    /* the people on the bridge: the mood three weeks on, and Doss's own scene */
    b7_c7_people:()=>({sp:'People on the bridge', scene:'b7_c7_after', fx:()=>{ S.f.b7_c7_people = 1; }, again:()=>'The bridge, the people going over it, the city getting on with itself.', txt:
`People on the bridge going about their business: a woman with a basket, two clerks arguing, a boy with a dog, a man selling eels out of a bucket. ${({quiet:'They go round the foreign soldiers without looking.', stirring:'Some of them nod to the foreign soldiers. The eel-seller does not.', rising:'The eel-seller calls out to the Third by its sergeant\'s rank, and asks after the big one with the shield.', risen:'The eel-seller will not take the Third\'s money and has given up trying to make it take eels for nothing.'})[b77Tier()]}

${b7In('doss') ? `Doss is at the bridge's rail, watching an old man go over it with a sack on his back. "On the holding," Doss says, "he'd have had a line in the book. Every one of them would." He watches the old man go. "No one can find the book now. No one's asked him for a quarter-day in three weeks." He turns round, and his face is wet, and he does not seem to notice. "${b77Ledger() ? 'We burned one. In the counting room. I watched it go. I didn\'t know you could just burn the book.' : 'I never saw a book burn. I just saw them stop asking.'}"` : `An old man goes over the bridge with a sack on his back, slowly, not looking at anyone. No one stops him to ask what he owes.`}`,
      ch:[{t:'Back to the canal.', go:()=>startExplore()}]}),
    /* the canal, three weeks on; Wenna's own scene */
    b7_c7_canal:()=>({sp:'The canal', scene:'b7_c7_after', fx:()=>{ S.f.b7_c7_canalSeen = 1; }, txt:
`The canal under the bridge, brown and slow and smelling of the whole city, going east toward the river and the river going on to the sea.${b7In('wenna') ? `\n\nWenna is sitting on the canal steps with her feet in the water, though nobody else in Letheras would. "They say the Shake have a queen again," she says. "On the coast. They say it in the market, like the price of fish." She looks at the water. "I could go back. There's boats now." She moves her feet. "${b77Key() === 'home' ? 'You\'re going west. I\'m going to the sea. It\'s the same water.' : b77Key() === 'letheras' ? 'Not yet. The river\'s here. That\'s close enough for a while.' : 'Not yet. The army\'s going east. There\'s sea east too, I expect. There\'s always sea.'}"` : ''}`,
      ch:[{t:'Back to the canal street.', go:()=>startExplore()}]}),

    /* the end: the last of it */
    b7_c7_end:()=>({sp:'The last of it', scene:'b7_c7_after', txt:
`The last morning at the billet. The packs on the step, the brazier out, the city going over the bridge.

${({adjunct:`The army is moving. Not today, not this week, but the word has come down that it will, east, and the quartermasters are counting carts. The Third will go with it, behind the Adjunct, wherever that turns out to be, as it has gone everywhere since Hissar.`, letheras:`The army is moving, east, soon. The Third is not. It has a new coat, and a new purse with the new emperor's coin in it, and a yard by the river where a company of Letherii levies stand in a line every morning and hate the foreign sergeant who taught them.`, home:`There is a ship at the river quays, a big-bellied transport going west, and the Third's names are on the master's list. What the Third will do when it gets there, the list does not say. It never does.`})[b77Key() || 'adjunct']}

${b77Fell().length ? `The Third is shorter by ${b77Num(b77Fell().length)} than it was on the beach, and it counts the ${b77Fell().length > 1 ? 'gaps' : 'gap'} with the rest.` : 'The Third counts itself, out of habit, and gets the same number it had on the beach, less the ones it lost before, and checks it.'} ${b77Say({haddat:'Haddat says the names, all of them, standing on the chandler\'s step. Then she picks up her pack.', marrow:'Marrow ties one more knot in her string. Then she picks up her bag.', _:'Then it picks up its packs.'})}${b7In('doss') ? `\n\n${b77Key() === 'letheras' ? 'Doss is staying too. He has not stopped smiling for a week.' : 'Doss is on the step with his pack on, ready, looking at the bridge.'}` : ''}${b7In('wenna') ? `\n\nWenna is barefoot on the canal steps, with her gaff over her shoulder, looking east down the water.` : ''}`,
      ch:[{t:'Go.', onward:true, go:()=>chapterEnd(7, b77Key() || 'adjunct')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* ============ the end of Book Seven: both squads (37's showFinale, extended below for the Letherii's road and pages and Where the books meet) ============ */
const B77FIN = {};
B77FIN.KEYS = ['adjunct', 'letheras', 'home'];
B77FIN.key = k => B77FIN.KEYS.includes(k) ? k : B77FIN.KEYS.includes(S && S.f && S.f.b7_c7_key) ? S.f.b7_c7_key : 'adjunct';
B77FIN.join = ps => ps.filter(p => p && String(p).trim()).join('\n\n');
B77FIN.loy = (id, warm, cold, mid) => { const l = (S.loy && S.loy[id]) || 0; return l >= 2 ? warm : l <= -2 ? cold : mid; };
/* the Third's Book Seven in a line per soldier: Ch1's ships, Ch3's counting room, Ch5's village (each read with a default; Doss and Wenna
   joined after the ships, Wenna before the counting room) */
B77FIN.ships = id => (id === 'doss' || id === 'wenna') ? '' : S.f.b7_c1_key === 'burn' ? `On the coast ${id === 'sgt' ? 'you' : b77He(id)} fired the transport with the rest, on time, and watched it burn.` : S.f.b7_c1_key === 'strip' ? `On the coast ${id === 'sgt' ? 'you' : b77He(id)} stripped the transport's stores before it burned, and came inland late.` : '';
B77FIN.room = id => b77Ledger() ? `In a factor's counting room inland, ${id === 'sgt' ? 'you' : b77He(id)} watched the debt-rolls burn.` : S.f.b7_c3_key === 'loot' ? `In a factor's counting room inland, ${id === 'sgt' ? 'you' : b77He(id)} ate the factor's bread and left his rolls on the shelf.` : '';
B77FIN.village = id => b77Held() ? `At the mill village on the river, ${id === 'sgt' ? 'you' : b77He(id)} held the street and the square.` : S.f.b7_c5_key === 'slip' ? `At the mill village on the river, ${id === 'sgt' ? 'you' : b77He(id)} went out by the river path in the dark.` : '';
B77FIN.book = id => [B77FIN.ships(id), B77FIN.room(id), B77FIN.village(id)].filter(Boolean).join(' ');

B77FIN.ending = key => {
  const T = {adjunct:['With the army', 'b7_c7_after'], letheras:['The new emperor\'s coin', 'b7_c7_after'], home:['A berth home', 'b7_river']}[key] || ['With the army', 'b7_c7_after'];
  if (typeof S === 'undefined' || !S || !S.f) return {title:T[0], scene:T[1], paras:[]};
  try {
    const mates = b77Mates().map(NAME), n = b77Mates().length + 1, r = b7Rising(), tier = b7RiseTier(r);
    let P;
    if (key === 'adjunct') P = [
`The army of the Adjunct goes out of Letheras at the end of a summer, east, with a Letherii detachment marching beside it and nobody in the ranks able to say where it is going. Behind it the city has a new emperor and a new Preda and a great many Malazan sergeants' voices still ringing in its drill-yards. Ahead there is a road, and whatever the Adjunct means to do with an army that has taken an empire's capital and been told nothing about why.`,
`${mates.length ? `${b77And(mates)} ${mates.length > 1 ? 'march' : 'marches'} with you, in the middle of the lieutenant's lot, heavy and slow, the borrowed heavies still.` : 'You march alone in the middle of the lieutenant\'s lot, and the lieutenant puts two marines beside you so that it looks like a squad.'} At every halt the Third counts itself, and gets ${numw(n)}, and checks it.`,
`The Third's road goes on, with the Adjunct: Book Nine, when it is written, will offer this save.`];
    else if (key === 'letheras') P = [
`The army of the Adjunct goes out of Letheras at the end of a summer, east, without the Third. On a page of the lieutenant's slate, against a squad's number, the chalk says *Letheras*, and nothing else.`,
`${mates.length ? `${b77And(mates)} ${mates.length > 1 ? 'stay' : 'stays'} with you.` : 'You stay alone.'} The new emperor's coin is good, mostly. His levies learn to stand in a line by the river every morning, and hate the foreign sergeant who taught them, and then, one morning in the autumn, stop hating him and stand.`,
`There is no road onward from here. The Third is in Letheras, under a new emperor, a long way from any army it was ever part of.`];
    else P = [
`The army of the Adjunct goes out of Letheras at the end of a summer, east, without the Third. The Third is already at sea by then, on a big-bellied transport going west, with its names on the master's list under *time served*.`,
`${mates.length ? `${b77And(mates)} ${mates.length > 1 ? 'are' : 'is'} at the rail with you.` : 'You are at the rail alone.'} Behind the ship the coast of Lether goes down into the sea, the same coast where the transports burned, and nobody at the rail says so.`,
`There is no road onward from here. No one is looking for a squad that went home.`];
    P.push(`Lether, at the end: ${B7_RISEW[tier].toLowerCase()} (the Rising stands at ${r} of ${B7_RISEMAX}${b7S().hi > r ? `, and was ${b7S().hi} at its height` : ''}).`);
    return {title:T[0], scene:T[1], paras:P};
  } catch(e) { return {title:T[0], scene:T[1], paras:[]}; }
};

/* a road line per soldier per road, the soldier's Book Seven in a sentence, and a warm closing line (the cold and middle ones are shared) */
B77FIN.T = {
  haddat:{title:'The names', adjunct:'Haddat marches east with the blue shield on her arm, behind the Adjunct, and says the names every night, the old ones from Hissar and the new ones from Lether.', letheras:'Haddat stands in a Letherii drill-yard by the river with the blue shield on her arm and teaches the new emperor\'s levies to hold a line, and says the names at night, in Letheras.', home:'Haddat stands at the stern rail with the blue shield on her arm as Lether goes down behind, and says the names, all of them, and does not say where home is.',
    mem:'Her list is longer than it was on the coast.', warm:'"You are not on the list," she tells you. "Good. Stay off it."'},
  sathi:{title:'Laughing', adjunct:'Sathi marches east with the army, laughing at the Letherii detachment\'s horses, which are bad, and at its riders, which are worse.', letheras:'Sathi stays in Letheras and finds the one tavern on the canals where Wickans are welcome, which is to say, the one with no other customers, and makes it hers.', home:'Sathi rides the ship west as she rides everything, badly and laughing, and hates the sea out loud every day of it.',
    mem:'She laughed at the walls of Letheras.', warm:'"You\'re all right, for infantry," she tells you. It is the best thing a Wickan has ever said to a Malazan.'},
  tangle:{title:'The count', adjunct:'Tangle marches east with the satchel, counting it every morning, twice, and the army\'s quartermasters have started to come to him to ask what they have.', letheras:'Tangle stays in Letheras and finds a Letherii alchemist who has never seen a sharper, and frightens him badly, and goes back every week.', home:'Tangle counts the satchel at the ship\'s rail every morning, twice, and in Kan, he says, there is a man who will buy the lot. He does not mean to sell it.',
    mem:'The Kanese bead is still on his wrist. He says Mincer\'s name at the end of the count.', warm:'"You point," he says, "and I make it stop being there." From a sapper there is nothing warmer.'},
  marrow:{title:'The string', adjunct:'Marrow marches east with her bag, and the army\'s sick call her *mother*, and she calls them *child*, and argues with the Letherii surgeons about herbs at every halt.', letheras:'Marrow stays in Letheras and finds the city\'s poorhouse and its four tired healers, and in a month they are five, and she is the one who tells the others what to do.', home:'Marrow goes down into the ship\'s hold every day with her bag, and the sick call her *mother*, and she ties a knot in her string for every one who walks off at the other end.',
    mem:'The string has a knot in it for everyone from the coast to the gate. She is still tying.', warm:'"Child," she says to you, still, and once, "Sergeant, child," which is both.'},
  mirrel:{title:'Three, and up', adjunct:'Mirrel marches east with the hospice bag, counting the sick in threes at every halt, and the count gets smaller.', letheras:'Mirrel stays in Letheras and takes a bed in the poorhouse by the river, the sixty-first, and works from it, and counts the city in threes.', home:'Mirrel goes down into the ship\'s hold every day with her bag and counts the sick in threes, and at the end of the voyage the count is nothing, and she checks it twice.',
    mem:'In Li Heng they said every city ends in a poorhouse. In Letheras she found it first.', warm:'"Sit," she tells you, at the end of every day. "Hand. Other hand. Good."'},
  mehet:{title:'The keys', adjunct:'Mehet marches east with his ring of keys, and in every town the army comes to, he knows which walls are newer than they look before the army is through the gate.', letheras:'Mehet stays in Letheras, which has streets, and in a month he knows all of them, and which canals go under which houses, and the new Preda\'s people have started to ask him.', home:'Mehet stands at the stern rail with his ring of keys and watches a third city go down behind him, and does not say whether it is easier.',
    mem:'He learned every street between the gate and the river in three weeks. Y\'Ghatan took a year.', warm:'He gives you a key off his ring, to a door in Letheras you have never seen. "You will not need it," he says. "Keep it."'},
  ottar:{title:'The word for wall', adjunct:'Ottar marches east with the Third, because his Destriant sent him to the Third and not to the Perish, who go east on their own road. He learns a Letherii word a day now as well.', letheras:'Ottar stays in Letheras with the Third, and watches the Perish go east without him, and does not go after them. "He sent me to you," he says. "Not to the road."', home:'Ottar does not take the ship. He goes east with the Perish on their own road, as his Destriant sends him at last, and stands at the quay to see the Third off, with his helm under his arm.',
    mem:'He has a word for a dragon now. He made it himself.', warm:'He teaches you a word in Perish every day, one for one, and calls you *Sergeant*, carefully, as a rank.'},
  tallow:{title:'Mostly they came back', adjunct:'Tallow marches east with his grandmother\'s cards in his shirt and reads for the army at night, badly, and the Letherii detachment comes to watch.', letheras:'Tallow stays in Letheras and reads the Deck for the canal-boatmen on the Low Walk on an upturned bucket. They mostly come back.', home:'Tallow reads the Deck for the ship\'s crew on an upturned bucket all the way west. Everybody comes back. He says it was the cards.',
    mem:'The cards came up crowned on the city\'s last day, every one. He has stopped saying his grandmother exaggerated.', warm:'"You\'re the one she\'d have read for," he tells you. "You\'d have come back."'},
  hessa:{title:'The door', adjunct:'Hessa marches east with her spear upright, and at every halt she stands between the Third and the road like a temple door.', letheras:'Hessa stays in Letheras, and finds that the worm has a shrine there after all, small and damp, under a bridge, and stands at its door.', home:'Hessa stands in the ship\'s hatch like a temple door all the way west, and the sick below sleep easier for it.',
    mem:'Something moved under Letheras on its last day, and the worm turned away from it. She has not decided what that meant.', warm:'"You are a door too, Sergeant," she tells you.'},
  tebbet:{title:'A long way off', adjunct:'Tebbet marches east out on the flanks, far out, which is where he always wanted to be, and comes in at night with a bird for the pot.', letheras:'Tebbet stays in Letheras and climbs the tower by the canal bridge every morning, because from the top you can see the river all the way to the sea.', home:'Tebbet goes up the ship\'s rigging with his bow, because the masthead is the longest way off on a ship, and the crew lets him.',
    mem:'From a tower in Letheras he could see the whole river. It was not far enough.', warm:'"I\'d rather be a long way off," he says. "With you. That\'s the thing."'},
  darrut:{title:'The wall', adjunct:'Darrut marches east with his big shield, and keeps quiet about Aren, and about the gate of Letheras, which he stood in when it was opened.', letheras:'Darrut stays in Letheras, and the new Preda\'s people offer him a gate to command, the one he came in by, and he takes it, and keeps it open.', home:'Darrut stands at the rail with his big shield as Lether goes down, and says the gate of Letheras was the first he ever helped open, and that it was better.',
    mem:'He was on the wall at Aren when the gate shut on the Chain. At Letheras he walked through one opening.', warm:'"You\'d have done in the Guard," he tells you. From an Aren man it is everything.'},
  yorin:{title:'Clear tomorrow', adjunct:'Yorin marches east and tells the quartermasters what the sky will do, every morning, and is right, and they have started to listen.', letheras:'Yorin stays in Letheras, and a barge-master on the river hires him to say when it will rain.', home:'Yorin tells the ship\'s master what the wind will do, every morning, all the way west, and is right.',
    mem:'His wind-vane spun on the city\'s last day and would not stop. He keeps it in his pocket now.', warm:'"Clear tomorrow, Sergeant," he tells you, every night.'},
  rasp:{title:'Lovely', adjunct:'Rasp marches east with the satchel on her hip and says the marines get the good fuse, and she got the good squad.', letheras:'Rasp stays in Letheras, and finds a Letherii mason who wants to know how you bring a slate roof down safely, and teaches him, and is very happy.', home:'Rasp takes the ship west, toward the Malaz waterfront where she was born, and weighs the satchel every morning, and says the gate of Letheras was lovely.',
    mem:'She saw the wicket at Letheras come down. She is still talking about it.', warm:'"You point," she tells you, "and I make it lovely."'},
  orvas:{title:'The tears', adjunct:'Orvas marches east beside the Burned Tears for a few days, weeping with them, before they go on their own road and he comes back to the Third.', letheras:'Orvas stays in Letheras, a Khundryl in the new emperor\'s city, and the children on the canal bridges touch his black tears as they pass, for luck.', home:'Orvas stands at the rail with his lance, a Khundryl on a ship again, and weeps for Lether very loudly as it goes down, and the crew weeps with him.',
    mem:'The tears on his face are tattooed and black. He wept for the walls of Letheras.', warm:'"You are not Khundryl," he tells you. "And I am not Malazan. And here we are."'},
  redblade:{title:'The red scale', adjunct:'Ramin marches east with the Fourteenth in his red scale, a long way from any Red Blade.', letheras:'Ramin stays in Letheras in his red scale, and the new emperor\'s people take it for a uniform and give him a post on a bridge.', home:'Ramin takes the ship west in his red scale, toward Seven Cities and the Red Blades, and does not say whether he means to go back to them.',
    mem:'In Seven Cities a crowd that shouts like that burns something. In Letheras it burned paper.', warm:'"Lent," he says of himself. "And kept."'},
  warlock:{title:'The grandmother', adjunct:'Keth marches east, and the grandmother complains about the road every day of it, and about the new emperor, whom she has not met.', letheras:'Keth stays in Letheras, and the grandmother finds she likes a city with canals in it, and says so, out of his mouth, to strangers.', home:'Keth takes the ship west, and the grandmother is sick over the rail every day of it, out of his mouth, and blames the Malazans.',
    mem:'"*Worse masters, chosen by worse crowds,*" the grandmother said of Letheras. She has not changed her mind.', warm:'"*This one,*" the grandmother says of you. "*This one I would have married.*"'},
  doss:{title:'The book', adjunct:'Doss marches east with the Third, out of Lether, out of the country of the holding and the factor and the quarter-day, with the flail on his shoulder and his face to the front. He said he would march.', letheras:'Doss stays in Letheras with the Third, in the city the factor went to every quarter-day, and walks its streets every evening, and nobody stops him to ask what he owes.', home:'Doss walks the Third to the ship, and stands on the quay with the flail on his shoulder until it is out past the river mouth. Then he goes back into Letheras, which is the only home he has.',
    mem:'His family\'s line was on a burnt page of a factor\'s tally-book on the coast. There is no book now. Nobody can find the ledgers.', warm:'"You stood up for us," he tells you. "On the holding nobody ever did. Twenty-six harvests." He does not say anything else. He does not need to.'},
  wenna:{title:'The sea', adjunct:'Wenna marches east with the Third, barefoot, beside the river as far as it goes, and then on, because there is sea east too, she says. There is always sea.', letheras:'Wenna stays in Letheras, near the river, and works the boats on it, and in the evenings sits on the canal steps with her feet in the water and talks to the Shore.', home:'Wenna does not take the ship west. She goes down the river the other way, to the coast, where the Shake have a queen again, people say. She means to see.',
    mem:'Her brother is in the sea off the coast where the transports burned. She told the Shore about Letheras.', warm:'"The river goes to the sea," she tells you. "So do I, one day. I\'ll tell it about you."'},
};
/* a page for a squadmate of the Third who walks to the end */
B77FIN.fate = (id, key) => {
  key = B77FIN.key(key); if (id === 'sgt') return B77FIN.sgt(key);
  const t = B77FIN.T[id], nm = NAME(id);
  const tr = Object.entries(S.tricks || {}).filter(([k, v]) => v.who === id && TRICKS[k] && /^b7_/.test(k)).map(([k]) => `${b77Cap(b77He(id))} carries a trick out of Book Seven: ${TRICKS[k].name}.`)[0] || '';
  if (!t) return {title:TPL[id] ? TPL[id].role : '', txt:B77FIN.join([TPL[id] ? TPL[id].quest : '', B77FIN.book(id), `${nm} ${key === 'home' ? 'goes home with the Third' : key === 'letheras' ? 'stays in Letheras with the Third' : 'marches east with the Third'}.`])};
  return {title:t.title, txt:B77FIN.join([t[key], `${t.mem} ${B77FIN.book(id)}`, tr, B77FIN.loy(id, t.warm, `${nm} walks a little apart from you now, and you both know why.`, `${nm} walks with you as ${b77He(id)} has since the coast.`)])};
};
/* a page for someone of the Third not walking at the end: the fallen, a recruit waiting or sent away, a soldier waiting with the column */
B77FIN.gone = (id, key) => {
  key = B77FIN.key(key);
  if (S.dead && S.dead[id]) { const d = S.dead[id];
    if (d.ch === 5 && !d.from) return {title:'Fallen', txt:B77FIN.join([
      `${NAME(id)} fell in the square by the mill, in a village on the Lether River, holding it while the people who had hidden the Third went down to the water. Whoever fell there stayed down.`,
      `The village buried ${b77Him(id)} by the mill-race, deep, with its own spades, by lantern-light, and said it would put a stone. It could not cut letters. It said it would know.`,
      `The Third said the name on the riverbank, and at the gate of Letheras, and every night in the city after. It carried it the rest of the way.`])};
    return {title:'Fallen', txt:B77FIN.join([`${NAME(id)} fell before this book${d.where ? `, at ${d.where}` : ''}, and did not come to Lether.`, `The Third carried the name across the sea and up the coast and all the way to Letheras, and says it at night with the others.`])}; }
  const done = B7_DONE[id] ? S.f[B7_DONE[id]] : null, waits = (S.camp || []).includes(id) || done === 2;
  if (id === 'doss' || id === 'wenna') {
    if (waits) return {label:'Waiting', title:id === 'doss' ? 'With the camp followers' : 'With the Shake fishers', txt:id === 'doss' ? `Doss walked with the column's camp followers while six of the Third walked, all the way to Letheras, and came in through the gate behind the army with the carts. In the city he found the Third's billet by asking, and sat on its step, and ${key === 'letheras' ? 'stayed when it stayed.' : key === 'home' ? 'walked it to the ship.' : 'marched east behind it with the carts.'}` : `Wenna walked with the Shake fishers at the column's edge while six of the Third walked, and came to Letheras by the river. ${key === 'home' ? 'She went down it the other way, to the coast, the week the Third took ship.' : 'She works the boats on the river now, and sits on the Third\'s canal steps some evenings.'}`};
    if (done === 0) return {label:'Sent away', title:id === 'doss' ? 'The factor\'s fields' : 'The sea', txt:id === 'doss' ? 'Doss went back to the factor\'s fields on the coast when the Third would not take him. When word came down the coast road that Letheras had fallen and nobody could find the ledgers, he was in the field, and he put down his hoe and walked away from it.' : 'Wenna went back to the sea when the Third would not take her, and her boat, and the Shore. When word came that the Shake had a queen again she was on the water, and she turned the boat for home.'};
    return null; }
  if ((S.camp || []).includes(id)) return {label:'Waiting', title:'With the column', txt:`${NAME(id)} waited with the column's rear through the march inland while six of the Third walked, and came into Letheras behind the army, and ${key === 'adjunct' ? 'marches east with it, two companies back' : key === 'letheras' ? 'stayed in the city when the Third did' : 'took ship with the Third, at the end'}.`};
  return null;
};
/* the Third's sergeant */
B77FIN.sgt = key => {
  const f = S.f, fell = b77Fell();
  return {title:'Third squad', txt:B77FIN.join([
    key === 'adjunct' ? 'You march east with the army of the Adjunct, Third squad, 9th Legion, still lent to the Fist\'s column, still the borrowed heavies, with the munitions counted twice and the names said every night. When the Letherii in the detachment ask what Letheras was like, you tell them about a gate, and a counting-house stair, and an old woman on a bridge spinning a coin, and they do not understand, which is right.' :
    key === 'letheras' ? 'You stay in Letheras with what is left of the Third, on the new emperor\'s coin, in a drill-yard by the river, teaching his levies to stand in a line. Somewhere in a Malazan lieutenant\'s slate you are *Letheras*, in chalk. At night you count, out of habit, and check it.' :
    'You took ship west from Letheras with what is left of the Third, time served. Somewhere in a Malazan lieutenant\'s slate you are *home*, in chalk, and nobody has asked you what that means. At night, at the rail, you count, out of habit, and check it.',
    `${B77FIN.book('sgt')} ${fell.length ? `It cost ${b77And(fell.map(NAME))}.` : 'Everybody who came to Lether with you came to Letheras.'}`,
    f.b7_c7_gateDone ? 'At first light you went through the gate of Letheras behind a Fist in a mended cloak.' : '',
    trickBy('b7_c7_luck') === 'sgt' ? 'You know the crowd\'s spin. You never look.' : '',
    f.sgtScar ? 'There is a scar you do not look at.' : ''])};
};

/* ---- the Letherii's pages: Chapter 6's B7CH6.fates (read defensively), and a short fallback here if it is missing ---- */
const b77LHalf = () => (S && S.th && S.th.l) || null;
B77FIN.lethFates = () => { try { const F = typeof B7CH6 !== 'undefined' && B7CH6 && B7CH6.fates; return F && typeof F.pages === 'function' ? F : null; } catch(e) { return null; } };
B77FIN.lethRoad = () => { const F = B77FIN.lethFates();
  try { if (F && typeof F.roadPage === 'function') { const R = F.roadPage(); if (R && R.title && Array.isArray(R.paras)) return R; } } catch(e) { /* fall through */ }
  const r = b77LethRoad() || 'army', h = b77LHalf();
  return {title:{army:'The army', palace:'The palace', free:'Out'}[r], scene:{army:'b7_field', palace:'b7_letheras', free:'b7_river'}[r],
    paras:[r === 'army' ? 'The Sixth Company of the Whitefinder Battalion stayed a company of the army of the new Lether.' : r === 'palace' ? 'The Sixth Company of the Whitefinder Battalion went into the Palace Guard of the new emperor.' : 'The Sixth Company of the Whitefinder Battalion went out of the army.', h && h.name ? `Sergeant ${h.name}, Sixth Company, the Whitefinder Battalion.` : ''].filter(Boolean)}; };
B77FIN.lethPages = () => { const h = b77LHalf(); if (!h) return []; const F = B77FIN.lethFates();
  try { if (F) { const P = F.pages(); if (Array.isArray(P) && P.length) return P; } } catch(e) { console.warn('finale', e); }
  const dead = h.dead || {}, walking = (h.squad || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id]);
  return [...walking.map(id => ({id, k:'fate', label:'The Sixth', title:TPL[id].role, txt:`${TPL[id].name} came through the summer the Malazans came to Lether, with the Sixth.`, loy:(h.loy && h.loy[id]) || 0})),
    {id:'sgt', k:'fate', label:'The sergeant', title:'The sergeant', txt:'You came through the summer the Malazans came to Lether, at the head of the Sixth.', loy:0, name:h.name || ''}]; };
/* where the books meet */
B77FIN.meet = () => [
`Book Seven ran in Lether, the continent of Book Five, some years after Book Five and a month or two after Book Six, in the summer the Malazans came. The Third came into it from Book Six's road, out with the fleet behind the Adjunct; the Sixth Company from Book Five's, the squad that stayed in Letheras under the Edur emperor. They stood on opposite sides of one war, and never met, and never crossed a blade.`,
`Lether is the ground Book Five walked: Letheras and its canals, the Drownings, the Quillas, the Azath's tower. Seven Cities and the plague year, where Book Six's Fourth stayed with the Host, are not in this book at all. Book Eight takes up the Fourth.`,
`The Adjunct's road goes on east out of Letheras, and some of the Letherii army with it. Whatever comes after, for whoever went, it starts here.`];

/* the coda: both squads, the gate, the river, the city */
B77FIN.coda = key => { const fell = b77Fell(), h = b77LHalf(), lDead = h ? Object.keys(h.dead || {}).filter(id => h.dead[id] && !h.dead[id].from && TPL[id]) : [], tier = b7RiseTier();
  return [
`The Malazans burned their ships on the coast of Lether and went inland by night. A mage burned holding off a week of sorcery on a field a day from the capital, and the Letherii army broke at the river against the Adjunct's landing, and the Edur walked home. Letheras opened its gate to a Fist in a mended cloak, and its garrison gave up to the Adjunct, and its crowd shouted *Saviour* and *Emperor*, and three weeks on it had a new emperor and nobody could find the ledgers.`,
`The Third was there. It held a mill village on the river, or went out of it by night; it went through the gate of Letheras behind the Fist. ${fell.length ? `${b77And(fell.map(NAME))} did not come to Letheras.` : 'Every one of the Third who came to Lether came to Letheras.'} The Sixth was there too, on the other side, in the line below the ridge and at the river. ${lDead.length ? `${b77And(lDead.map(NAME))} did not come to the walls.` : 'Every one of the Sixth came to the walls.'} That is each squad's part. It is small. It is the only part anybody will tell right.`,
`${({quiet:'Lether, at the end, kept its head down, as it had under the Edur, and waited to see what the foreigners would do.', stirring:'Lether, at the end, was stirring: not risen, not quiet, a country watching its new masters to see if they were different.', rising:'Lether, at the end, was rising, and some of it had risen already, and the Malazans had found more friends in it than anyone in the fleet believed they would.', risen:'Lether, at the end, had risen. The Indebted had stopped paying, and the crowd had chosen an emperor, and nobody in the country thought it would ever go back.'})[tier]} ${b77Mates().length ? 'The Third counts itself, and gets the number, and checks it.' : 'The sergeant counts, and gets one, and checks it.'}`]; };

B7CH7.finale = {
  ids:()=>['haddat', 'sathi', 'tangle', 'marrow', 'mirrel', 'mehet', 'ottar', 'tallow', 'hessa', 'tebbet', 'darrut', 'yorin', 'rasp', 'orvas', 'redblade', 'warlock', 'doss', 'wenna'],
  labels:{epi:'Epilogue', squad:'The Third', fallen:'The fallen', away:'Not in Letheras', sgtRole:'Sergeant · Third squad, lent to the Fist\'s column', road:'The road', prologue:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length + (b77LHalf() ? Object.keys(b77LHalf().dead || {}).length : 0)} names, both squads`], noDead:'None of the Third. Every one of them came to Letheras.', paper:false,
    endline:'The End of <em>Unwitnessed</em>',
    credit:'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for Reaper\'s Gale, the burned ships, the march inland and the fall of Letheras, and to Ian C. Esslemont for the world they built together; the Third and the Sixth only walked beside it.'},
  endings:{ get adjunct(){ return B77FIN.ending('adjunct'); }, get letheras(){ return B77FIN.ending('letheras'); }, get home(){ return B77FIN.ending('home'); } },
  fate:(id, key)=>B77FIN.fate(id, key),
  gone:(id, key)=>B77FIN.gone(id, key),
  coda:(key)=>B77FIN.coda(key) };

/* ---- the finale for two squads (Book Seven only, guarded): 37's pages, with the Letherii's road, their pages and Where the books meet put
   in before the end. The extra page kinds are drawn here in 37's shape (the same buttons, so the swipe, the keys and the bot all work). ---- */
{ const _fp = finPages, _sf = showFinale;
  const mine = k => /^b77/.test(k);
  finPages = function(){ const P = _fp(); if (!b7On()) return P;
    let add = []; try { const L = B77FIN.lethPages(); if (b77LHalf()) add = [{k:'b77road'}, ...L.map(pg => ({k:'b77leth', id:pg.id, pg}))]; } catch(e) { console.warn('finale', e); add = []; }
    add.push({k:'b77meet'}); P.splice(P.length - 1, 0, ...add); return P; };
  /* the Letherii sergeant's portrait: painted once in Book Five's look (S.thread 'l'), then lent to 19's cache for each frame */
  let b77SgtL = null;
  const sgtLLayer = () => { const key = `sgt|400x520|${portraitState('sgt')}|${BOOK}`, was = S.thread;
    try { b7SgtFor('l'); S.thread = 'l'; PORTRAIT_CACHE.delete(key); const cv = document.createElement('canvas'); cv.width = 400; cv.height = 520; drawPortrait(cv.getContext('2d'), 'sgt', 400, 520, 0); b77SgtL = PORTRAIT_CACHE.get(key) || null; PORTRAIT_CACHE.delete(key); }
    finally { S.thread = was; b7SgtFor(b7Thread()); } return key; };
  showFinale = function(i = 0){ if (!b7On()) return _sf(i);
    const P = finPages(); i = clamp(i | 0, 0, P.length - 1); const pg = P[i]; if (!mine(pg.k)) return _sf(i);
    S.scene = 'finale'; S.finPage = i; S.node = null; save();
    view = 'finale'; $('#sheet').hidden = true; B = null; titleAnim = null; finAnim = null; AUDIO.setScene('end');
    let body = '';
    if (pg.k === 'b77road') { const R = B77FIN.lethRoad(); G.sceneKind = SCENES[R.scene] ? R.scene : 'b7_letheras';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">The Sixth Company</div><h1 class="fin-title">${esc(R.title)}</h1><div class="narr">${R.paras.map(p => fmt(p)).join('')}</div>`; }
    else if (pg.k === 'b77meet') { G.sceneKind = 'b7_c7_after';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">Where the books meet</div><h1 class="fin-title">Lether, again</h1><div class="narr">${B77FIN.meet().map(p => fmt(p)).join('')}</div>${typeof worldSVG === 'function' ? `<div class="gloss meet">${(() => { try { return worldSVG(); } catch(e) { return ''; } })()}</div>` : ''}`; }
    else { const L = pg.pg || {}, id = pg.id, sgt = id === 'sgt', gone = L.k === 'gone', h = b77LHalf() || {};
      const nm = sgt ? (L.name || h.name || 'The sergeant') : (TPL[id] ? TPL[id].name : id), role = sgt ? 'Sergeant · Sixth Company, the Whitefinder Battalion' : (TPL[id] ? TPL[id].role : '');
      const where = gone && h.dead && h.dead[id] ? [h.dead[id].where, h.dead[id].ch ? `Chapter ${h.dead[id].ch}` : ''].filter(Boolean).join(' · ') : '';
      if (sgt) sgtLLayer();
      body = `<div class="fin-k">${sgt ? 'The Sixth\'s sergeant' : gone ? 'The Sixth · the fallen' : L.label === 'Waiting' ? 'The Sixth · waiting' : 'The Sixth'}</div>
      <div class="fin-card"><div class="fin-por ${gone ? 'gone' : ''}"><canvas id="fpc" width="400" height="520" aria-hidden="true"></canvas>${gone ? '<span class="fin-mark">†</span>' : ''}</div>
        <div class="fin-who"><h2>${esc(nm)}</h2><div class="r">${esc(role)}</div>${sgt ? '' : gone ? (where ? `<div class="pips">${esc(where)}</div>` : '') : `<div class="pips">${loyLabel(L.loy || 0)}</div>`}</div></div>
      <h3 class="fin-h">${esc(L.title || '')}</h3><div class="narr fin-txt">${fmt(L.txt || '')}</div>`;
      finAnim = t => { const cv = $('#fpc'); if (!cv) { finAnim = null; return; }
        if (sgt && b77SgtL) { const key = `sgt|400x520|${portraitState('sgt')}|${BOOK}`, own = PORTRAIT_CACHE.get(key); PORTRAIT_CACHE.set(key, b77SgtL); try { drawPortrait(cv.getContext('2d'), 'sgt', 400, 520, t); } finally { if (own) PORTRAIT_CACHE.set(key, own); else PORTRAIT_CACHE.delete(key); } }
        else drawPortrait(cv.getContext('2d'), id, 400, 520, t); }; }
    toTop(); $('#app').innerHTML = `<div class="fin" id="fin">${body}
    <div class="fin-nav"><button class="btn" id="fBack">Back</button><span class="fin-pg">${i + 1} / ${P.length}</span><button class="btn primary" id="fNext">Next</button></div></div>`;
    window.scrollTo(0, 0);
    $('#fBack').onclick = () => { AUDIO.play('click'); finGo(-1); };
    $('#fNext').onclick = () => { AUDIO.play('click'); finGo(1); };
    let sx = null, sy = null; const el = $('#fin'); el.ontouchstart = e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    el.ontouchend = e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null; if (Math.abs(dx) > 70 && Math.abs(dy) < 50) { AUDIO.play('flip'); finGo(dx < 0 ? 1 : -1); } }; }; }

/* the onward road: a finished Book Seven save on the 'adjunct' road is the one Book Nine imports (no import is written yet) */
const b77Onward = s => !!(s && s.book === 'rg' && s.chapters && s.chapters[7] === 'adjunct');
