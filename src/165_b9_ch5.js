/* ============ Book Nine, Chapter 5: Short Rations ============ */
/* The Third, with the heavies, deep in the Wastes. Phase 1 (S.f.b9_c5_ph), a dry camp at night: the march has eaten (the engine's −2), the
   quartermaster has cut the ration a step; Thallo; Tegra, a Barghast guide the captain has hired for the company's water details, joins
   at the guides' fire (b9Join('tegra'); she never names her clan, rule 89); the reading on bare ground by the dung-fire (B9READ[5]);
   Harro the sutler, who talks too loudly about a dead sutler's hidden cache; heavies at the next fire talking about the west (desertion
   talk, never Sinter's plan); the old marine. Phase 2, the next day's noon halt on the open plain: Thallo's word ("two sergeants gone in
   the night", the chapter's one rumour; never the tent); a lone officer far out on a rise, fetched back (Keneb's ride, seen from the
   halt and never touched, dod-canon §4); the sappers' wagons and a man in a leather cap telling a clerk the munitions are short (Hedge,
   seen at a distance); a maddened bhederin (b9_c5_bull, optional: +2 Rations if killed; the chapter's ration "yes, but" if driven off);
   the water detail south with Tegra to a dry wash: Wastes dogs (b9_c5_dogs, optional), Tegra's dig for water, the dead sutler's wreck
   and his cache under a false floor, deserters after it (b9_c5_cache, main, stage 2); the key at the cache, S.f.b9_c5_key: 'share' (the
   company's pot: no ration move, Brask and Haddat +1, S.f.b9_c5_shared = 1) or 'keep' (b9Ration(2), Tegra +1, Haddat −1). Phase 3, the
   dung-fire under the stars: the Witness beat (b9Wit), the old marine's saying (the trick, Our Own Witness, behind a ✦ check that carries
   witness:true), Harro's camp talk (the other squad's one line); first light, and dust on the horizon that is not the column's (once).
   Notes for later chapters: docs/dod-ch5-notes.md. */
/* FOR THE ARTIST (165b): names this file uses.
   Items: ART['item/b9_c5_barghastaxe'], ['item/b9_c5_sutlerspack'], ['item/b9_c5_dustscarf'].
   Figures: tegra (replaces 160's sprite). Reused: b9_c1_thallo (161b), b9_c3_harro (163b), b2soldier (the old marine, the heavies),
   b5_letherii (deserters), b6_bandit (raiders), b5_c7_greatwolf (dogs), b3_c2_bhederin (the bull).
   Backdrops: b9_wastes_night and b9_dust (160's, yours), and two this file adds: b9_c5_plain (the noon halt on open country, the far
   rider, the sappers' wagons), b9_c5_wash (the dry wash, the wreck, the shade under the bank).
   Ground (TILEX): b9_c5_wastes (Ch 4's b9_c4_wastes underneath; and 'K' the sutler's wrecked cart, 'd' the wash's sandy bed). Battle 't'
   is a boulder. */

/* ---- small helpers (b95: Book Nine, Chapter Five) ---- */
const b95L = (id, n) => { if (b9In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b95Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b9In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b95If = (id, s) => b9In(id) ? (typeof s === 'function' ? s() : s) : '';
const b95Who = () => (ROLL() && ROLL().who) || 'sgt';
const b95Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b95Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b95V = (id, you, they) => id === 'sgt' ? you : they;
const b95And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b95Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const B95SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'wenna', 'hessa', 'rasp', 'tegra'];
const b95He = (id, cap) => B95SHE.includes(id) ? (cap ? 'She' : 'she') : (cap ? 'He' : 'he');
const b95His = id => B95SHE.includes(id) ? 'her' : 'his';
const b95Him = id => B95SHE.includes(id) ? 'her' : 'him';
/* the phase: 1 the first night's camp, 2 the next day (the noon halt, the wash), 3 the second night's camp (the Witness, the trick) */
const b95Ph = () => S.f.b9_c5_ph || 1;
const b95Key = () => S.f.b9_c5_key || null;
const b95Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b9In(id));
const b95Sh = n => `${numw(n, true)} sharper${n === 1 ? '' : 's'}`;
/* Tegra: walks (1), waits at the guides' fire (2), or not yet asked */
const b95TSettled = () => S.f.b9_tegraDone != null;
const b95TWaits = () => S.f.b9_tegraDone === 2;
const b95TIn = () => b9In('tegra');
/* the guide, named once she has given her name (she walks or waits); "the guide" before */
const b95Guide = () => b95TSettled() ? 'Tegra' : 'the Barghast guide';
const b95GuideC = () => b95TSettled() ? 'Tegra' : 'The Barghast guide';
/* Chapter Three remembered: the fevered squadmate (S.f.b9_c3_sick), by the key (default 'boil') */
const b95C3 = () => { const id = S.f.b9_c3_sick; if (!id || !TPL[id] || !b9In(id)) return ''; const k = b9Key(3) || 'boil';
  return k === 'press' ? `\n\n${NAME(id)} carried the fever out onto the Wastes and lost it somewhere in the first days, and a good deal of ${b95His(id)} weight with it. ${b95He(id, true)} walks. ${b95He(id, true)} says ${b95He(id)} is fine. The squad is not fooled and lets it go.`
    : `\n\n${NAME(id)} has been well since the fever broke by the road, thin and steady, and boils ${b95His(id)} water at every halt as if the Letherii healer were still watching.`; };
/* the other squad, as camp talk: Harro's word on the Letherii escort (Ch 4's key, default 'book'), one line */
const b95Other = () => (b9Key(4) || 'book') === 'forage' ? 'The Letherii rode out south a few days back, a squad of them with their blue cavalry, and came back with meat on the horses. Barghast arrows in one of the saddles, I hear. They were very pleased with themselves. I would be.' : 'The Letherii escort caught a thief in their own ration book, I hear. Some squad of theirs sat up with the clerk and counted the lot again. Honest count. Out here.' ;
/* the cache: found in the wreck, fought over, and shared or kept */
const b95Found = () => !!S.f.b9_c5_found;
const b95CacheDone = () => !!S.f.b9_c5_cacheDone;

/* ---- Our Own Witness: what some of the old hands say at the halts when the ration is cut, "we shall be our own witness", and the soldier
   beside them says it back. It copies the Khundryl Paint (b2_paint): a cry that steadies the bearer's neighbours and checks the enemy
   close by. Not sorcery. v10.3: it strikes nobody, so it is free. ---- */
Object.assign(TRICKS, {
  b9_c5_witness:{name:'Our Own Witness', ch:5, use:'fight', ab:'t_b9_c5_witness', where:'a dung-fire deep in the Wastes, from an old marine, on short rations',
    lore:'Some of the old hands say it at the halts, when the ration is cut again: we shall be our own witness. The story is that the Adjunct said it once, on the other side of the sea, to marines going over the side. The old marine was not there and says it does not matter who said it first. What matters is that you say it to the soldier next to you, and they say it back, and then the both of you know somebody is watching. Said out loud in a fight, it makes a line stand where it is.',
    get fx(){ return `Once a fight: the bearer says it, and the squad beside them says it back. The bearer and squadmates next to them are +2 to hit until the bearer's next turn; enemies within 2 of the bearer are −3 to hit this round, and ${lvT() >= 2 ? 'the nearest of them loses its nerve for a turn' : 'falter'}. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b9_c5_witness:{name:TRICKS.b9_c5_witness.name, trick:'b9_c5_witness', self:true, free:true, desc:()=>TRICKS.b9_c5_witness.fx,
    run(u){ AUDIO.play('sword'); shakeMap();
      const us = party().filter(p => !p.ally && cheb(p, u) <= 1), them = foes().filter(f => cheb(f, u) <= 2);
      us.forEach(p => { p.rallyUntil = Math.max(p.rallyUntil || 0, B.round + 1); float(p, 'witnessed', '#d8c8a0'); sparks(p.x, p.y, 6, '#d8c8a0', .4); });
      them.forEach(f => { f.dazzleUntil = Math.max(f.dazzleUntil || 0, B.round); float(f, 'falters', '#cfc8b8'); });
      const near = lvT() >= 2 && them.sort((a, b) => cheb(a, u) - cheb(b, u))[0]; if (near) { near.slowTurn = true; }
      blog(`${u.name} says it, not loud, the way the old hands say it at the halts: <em>we shall be our own witness</em>. ${us.length > 1 ? 'The squad beside says it back, and closes up.' : 'There is nobody beside to say it back. It holds anyway.'} ${them.length ? 'The nearest of the enemy hesitate, as if they had heard more voices than there are.' : ''}`); }},
});

/* ---- borrowed pictures until the artist's file (165b) replaces them: two scenes, three items ---- */
{ const like = {b9_c5_plain:'b9_wastes', b9_c5_wash:'b9_wastes'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof ART !== 'undefined') [['b9_c5_barghastaxe', 'b9_c3_akrynknife'], ['b9_c5_sutlerspack', 'b9_c3_boilingpot'], ['b9_c5_dustscarf', 'b9_c3_feverbark']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });
if (typeof TILEX !== 'undefined') TILEX.b9_c5_wastes ??= (...a) => (TILEX.b9_c4_wastes || (() => {}))(...a);

/* ---- the reading: bare ground under the stars, by the dung-fire ---- */
B9READ[5] = {scene:'b9_wastes_night', where:'bare ground under the stars, by the dung-fire', set:'Night deep in the Wastes, the dung-fire low, and nothing on any side but the dark and the column\'s other fires.', back:'b9_c5_fire', backT:'Back to the fire.',
  say:{marrow:'"No table out here, child," Marrow says, and smooths a patch of ground flat with her palm, and blows the grit off it. "The Obelisk likes bare ground anyway. One card."',
       tallow:'"Grandmother read on a floor of beaten earth all her life," Tallow says, clearing the stones away with the side of his hand. "Said the cards lie less close to the ground." He unwraps the deck. "One?"',
       oldninth:'"Nothing to lay them on but the Wastes," the old marine says, and lays them on the Wastes. "Suits the cards. They have been out here before us." He holds out the deck. "One."'}};

/* ---- the words this chapter adds to Book Nine's glossary ---- */
GLOSSX.dod.push(
  [5, 'Short rations', 'What the quartermasters call a ration after it has been cut, and cut again. Half a biscuit, what the pot holds, and water by the cup.', ()=>!!(S && S.f && S.f.b9_c5_ph)],
  [5, 'Our own witness', 'Something the old hands say at the halts on the march east: we shall be our own witness. Some say the Adjunct said it first, on the other side of the sea. The ones who say it now were mostly not there.', ()=>!!(S && S.f && S.f.b9_c5_wordHeard)],
  [5, 'The guides', 'Plainsfolk the quartermasters hire for the column\'s water details: they know which dry washes hold water under the sand. Most of them do not say where they come from, and are not asked.', ()=>!!(S && S.f && S.f.b9_tegraDone != null)]);

/* 160's scene keeps its caption; in this chapter the far dust is far, and nobody is turning to face it yet */
{ const sc = SCENES.b9_dust, base = sc && sc.cap; if (sc) Object.defineProperty(sc, 'cap', {configurable:true, enumerable:true,
    get(){ return S && S.book === 'dod' && S.chapter === 5 ? 'First light on the Wastes, the column forming on its track, and far out at the bottom of the sky a low smear of dust that is not the column\'s.' : base; }}); }

/* the fire is a roster fire (38c) */
ROSTER_FIRES.dod = ROSTER_FIRES.dod || {}; ROSTER_FIRES.dod[5] = ['b9_c5_fire'];

const B9CH5 = {
  title:B9CH[5], number:'Five',
  intro:{loc:'The Wastes', sub:'The column on the march · late in the day', scene:'b9_column', cap:'Files of soldiers on a track that is mostly dust, wagons behind, and a sun going down on a plain with nothing on it.',
    paras:[
`The column is deep in the Wastes now, and the Wastes have stopped being a place it is walking into and become a place it is in. Dry grass, bare stone, a sky too big for either. Every day looks like the last one, except that the ration is smaller.`,
()=>{ const v = b95Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, Third squad, 9th Legion, marching with the heavies. ${v.length ? `${b95And(v)} ${v.length > 1 ? 'walk' : 'walks'} with you, a hole further in on every belt.` : 'The Third, today, is you, a hole further in on the belt.'} The clerks still say Kolanse. The clerks are eating the same biscuit as everybody else, and say it less often.`; },
`Tonight the quartermaster cut the ration again.`],
    go:'Into the camp', node:'b9_c5_start'},

  areas:[
    /* 16 x 12 (b9_c5_wastes, night). The column's camp on open ground: r bare stone  T tents  W the company's ration wagons  H Harro's
       wagon  F the Third's dung-fire  o barrels  > the camp's east edge, into the dark */
    { id:'b9_c5_camp', title:'The Wastes · the column\'s camp', sub:'Night · short rations', hint:'Tap ground to move · tap a figure to talk · the ration wagons are north-west, the guides\' fire east', decor:'b9_c5_wastes', dark:true,
      map:[ "rrrr..rrrrr..rrr",
            "r.T.T..T...T.T.r",
            "r..............r",
            "r.WW.....H.....r",
            "r..............r",
            "r......F.......r",
            "r..............r",
            "r.T............>",
            "r..............r",
            "r...o....T.....r",
            "r..............r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.', triggers:{F:'b9_c5_fire', W:'b9_c5_wagons', H:'b9_c5_harro', '>':'b9_c5_camp_east'}, start:{x:6, y:6},
      quest:()=> b95Ph() === 1 ? (!S.f.b9_c5_orders1 ? 'Thallo, by the ration wagons. He has the quartermaster\'s word.' : !b95TSettled() ? 'The guides\' fire, east, at the camp\'s edge. The captain has hired somebody.' : 'The fire, and sleep. The column moves at first light.')
        : !S.f.b9_c5_orders3 ? 'Thallo, at the fire.' : !(S.b9 && S.b9.wit && S.b9.wit.c5) ? 'The fire. The squad is awake, and thinking.' : 'The fire. First light, east.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:4, y:4, node:()=>b95Ph() === 1 ? 'b9_c5_thallo' : 'b9_c5_thallo3', fresh:()=>b95Ph() === 1 ? !S.f.b9_c5_orders1 : !S.f.b9_c5_orders3},
        {id:'tegra', get name(){ return b95TSettled() ? 'Tegra' : 'A Barghast guide'; }, kind:'tegra', x:13, y:7, node:()=>'b9_c5_tegra', show:()=>!b95TSettled() || b95TWaits(), fresh:()=>!b95TSettled()},
        {id:'old', name:'The old marine', kind:'b2soldier', x:11, y:9, node:()=>'b9_c5_oldmarine', fresh:()=>b95Ph() === 1 ? !S.f.b9_c5_old : !S.f.b9_c5_wordTried},
        {id:'heavies', name:'Heavies at the next fire', kind:'b2soldier', x:3, y:8, node:()=>'b9_c5_heavies', show:()=>b95Ph() === 1, fresh:()=>!S.f.b9_c5_heavies} ] },

    /* 16 x 12 (b9_c5_wastes, day). The noon halt on open country: , the column's track  w its wagons  W the sappers' wagons  m a stone rise
       x scrub  s the water detail's way south  > the column, east */
    { id:'b9_c5_plain', title:'The Wastes · the noon halt', sub:'Day · open country', hint:'Tap ground to move · tap a figure to talk · the rise is east, the sappers\' wagons north, the way south to the wash below', decor:'b9_c5_wastes',
      map:[ "rrr..rrrrrr..rrr",
            "r..............r",
            "r.......x......m",
            "r..W.W.........r",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,>",
            "r..w.....w.....r",
            "r..............r",
            "r.....x........r",
            "r......s.......r",
            "r......s.......r",
            "rrrrrrrsrrrrrrrr" ],
      walk:'.,s', triggers:{W:'b9_c5_sappers', m:'b9_c5_rise', s:'b9_c5_south', '>':'b9_c5_plain_east'}, start:{x:3, y:7},
      quest:()=> !S.f.b9_c5_orders2 ? 'Thallo, by the wagons. He has the captain\'s word.' : !S.f.b9_c5_cacheDone ? `South, with ${b95Guide()} and the water detail.` : 'Back to the column.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:5, y:7, node:()=>'b9_c5_thallo2', fresh:()=>!S.f.b9_c5_orders2},
        {id:'bull', name:'A bhederin bull, alone', kind:'b3_c2_bhederin', x:13, y:9, node:()=>'b9_c5_bull', show:()=>!S.f.b9_c5_bullDone, fresh:()=>true},
        {id:'tegra', name:'Tegra', kind:'tegra', x:8, y:8, node:()=>'b9_c5_tegra', show:()=>b95TWaits(), fresh:()=>false} ] },

    /* 16 x 12 (b9_c5_wastes, day). A dry wash south of the halt: r its banks of stone  d the sandy bed  K the sutler's wrecked cart  e
       where water stands under the sand  m the shade under the bank  < back up to the column */
    { id:'b9_c5_wash', title:'The Wastes · a dry wash', sub:'Afternoon · the water detail', hint:'Tap ground to move · tap a figure to talk · the wreck is in the bed, the shade under the south bank', decor:'b9_c5_wastes',
      map:[ "rrrrrrrrrrrrrrrr",
            "rrrrr....rrrrrrr",
            "rdddddddddddddrr",
            "<ddddddKKddddddr",
            "rdddddddddddddrr",
            "rddddddddddeddrr",
            "rrdmddddddddddrr",
            "rddddddddddddddr",
            "rrdddddddddddddr",
            "rrrrddddddddrrrr",
            "rrrrrrdddrrrrrrr",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.d', triggers:{K:'b9_c5_wreck', e:'b9_c5_dig', m:'b9_c5_shade', '<':'b9_c5_wash_back'}, start:{x:2, y:3},
      quest:()=> !S.f.b9_c5_dug ? `Where ${b95Guide()} says the water is.` : !S.f.b9_c5_searched ? 'The wreck in the bed of the wash.' : !b95CacheDone() ? 'Men on the lip of the wash.' : !b95Key() ? 'The cache, under the wreck.' : 'Back up to the column.',
      npcs:[
        {id:'dogs', name:'Dogs up the wash', kind:'b5_c7_greatwolf', x:12, y:3, node:()=>'b9_c5_dogs', show:()=>!S.f.b9_c5_dogsDone, fresh:()=>true},
        {id:'comers', name:'Men on the lip of the wash', kind:'b5_letherii', x:6, y:1, node:()=>'b9_c5_comers', show:()=>!!S.f.b9_c5_searched && !b95CacheDone(), fresh:()=>true},
        {id:'heavy', name:'Thallo\'s heavy, with the skins', kind:'b2soldier', x:3, y:4, node:()=>'b9_c5_skins', fresh:()=>false},
        {id:'tegra', name:'Tegra', kind:'tegra', x:10, y:6, node:()=>'b9_c5_tegra', show:()=>b95TWaits(), fresh:()=>false} ] } ],

  battles:{
    /* the deserters after the cache: down the wash, then their officer at the wreck */
    b9_c5_cache:{title:'The sutler\'s cache', style:'b9_c5_wastes', warrenText:'A dry wash deep in the Wastes · afternoon · the warrens thin and far off', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","..t.....","........","....t...","#......#","..t.....","......t.","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_heavy',1,8]],
      foes:[['b9_deserter',2,1],['b9_deserter',5,1],['b9_raider',1,2],['b9_raider',6,2]], xp:380, after:'b9_c5_cache_after',
      preText:()=>`Four of them come down the bank into the wash, two in Letherii army coats with the badges cut off, two in riders' leathers with their faces wrapped against the dust. They heard about the cache from the same loud sutler the Third did. They have walked further for it, and are hungrier.`,
      stage2:{title:'The wreck', xp:170,
        text:()=>`The bed of the wash is the Third's. The wreck is not. A man in an officer's coat with the badges cut off has come round the far side of the cart with a pry-bar in one hand and a sword in the other, and he is not running, because this was the plan, and there is no other one.${b95If('tegra', `\n\nTegra has an axe in her hand, not thrown yet. "He will not stop," she says. "Out here, the ones who come this far for food do not stop."`)}`,
        map:["#..tt..#","........","..t..t..","........","........","...t....","........",".t....t.","........","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b9_desertercap',3,1]]} },
    /* the maddened bhederin at the noon halt: optional */
    b9_c5_bull:{title:'The bull', style:'b9_c5_wastes', warrenText:'Open country at noon · dry grass, bare stone · the warrens far off', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","........","...t....","........","........","......t.","........","..t.....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b9_bhederin',4,1]], xp:140, after:'b9_c5_bull_after',
      preText:()=>`An old bull, alone, grey at the muzzle, ribs showing through the hide like a wagon's slats. Flies in a cloud round its head. It has been thrown out of its herd, or outlived it, and the thin grazing and the flies have done the rest. It lowers its head at the Third and paws the dust.`},
    /* Wastes dogs at the wash: optional */
    b9_c5_dogs:{title:'The dogs in the wash', style:'b9_c5_wastes', warrenText:'A dry wash deep in the Wastes · afternoon · the warrens thin', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","......t.","........","...t....","........",".t......","........","........","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b9_dog',1,1],['b9_dog',6,1],['b9_dog',3,0],['b9_dog',5,2]], xp:100, after:'b9_c5_dogs_after',
      preText:()=>`Four of them, grey as the grass, lean as the bull on the plain. They have had the wash to themselves for a while, and do not mean to give it up to anything on two legs.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b9_c5_barghastaxe:{name:'A Barghast throwing-axe', slot:'weapon', role:'blade', who:null, atk:2, dmg:[1,8,4],
      line:'A short axe with a long beard to the blade and a haft of dark wood wrapped in sinew at the grip, light enough to throw and heavy enough not to need to. A guide carries a spare, Tegra says, for whoever carries her water. There are marks burned into the haft. She does not say what they mean, and it is plain that is a clan thing.'},
    b9_c5_sutlerspack:{name:'A sutler\'s pack', slot:'trinket', role:'any', who:null, hp:3,
      line:'A sutler\'s canvas pack, oiled against the wet in a country that has none, with pockets inside pockets and a brass buckle worn bright. It came out of the false floor of a wrecked cart in a dry wash. Whoever carries it finds things in it for days afterwards: a needle, a twist of salt, a bent nail. Never food.'},
    b9_c5_dustscarf:{name:'A dust-scarf', slot:'trinket', role:'any', who:null, hp:2,
      line:'A long strip of loose-woven linen, dun, to wrap the mouth and nose against the dust of the march. Harro sells them out of a sack at a price that would shame a temple. It keeps out most of the dust. The dust that gets past it tastes of linen, which is an improvement.'} },

  scenes:{
    b9_c5_plain:{loc:'The Wastes', sub:'The noon halt · open country', cap:'The column halted at noon on a plain with nothing on it, wagons drawn up along the track, and far out east a single rider on a low rise.', amb:'explore'},
    b9_c5_wash:{loc:'The Wastes', sub:'A dry wash · afternoon', cap:'A dry wash cut into the plain, a sutler\'s cart on its side in the sandy bed, and shade under the south bank.', amb:'explore'} },

  end:{
    share:['Into the company\'s pot', 'Deep in the Wastes the ration was cut, and cut again. A Barghast guide took the Third\'s water detail to a dry wash, and in the wash was a dead sutler\'s cart, and under its floor a cache of food. Deserters came for it, and did not get it. The Third carried it back to the column and put it in the company\'s pot, and the heavies ate a little better for two nights, and said so. Then, at first light, there was dust on the horizon that was not the column\'s.'],
    keep:['What the squad kept', 'Deep in the Wastes the ration was cut, and cut again. A Barghast guide took the Third\'s water detail to a dry wash, and in the wash was a dead sutler\'s cart, and under its floor a cache of food. Deserters came for it, and did not get it. The Third kept it. It was the squad\'s, the squad said, and the squad ate. Then, at first light, there was dust on the horizon that was not the column\'s.'] },
  endScene:'b9_dust',
  endCap:()=> b95Key() === 'keep' ? 'The column forming at first light, a squad among the files with its belts a hole looser than the rest, and far off a low smear of dust that is not the column\'s.' : 'The column forming at first light, a company that ate a little better last night, and far off a low smear of dust that is not the column\'s.',
  tease:'Next: the Letherii. The escort\'s line at dawn, and the dust on the horizon coming on.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b9_c5_key) x.push(f.b9_c5_key === 'share' ? 'The Third found a dead sutler\'s cache in a dry wash and put it in the company\'s pot.' : 'The Third found a dead sutler\'s cache in a dry wash and kept it.');
    if (f.b9_tegraDone === 1) x.push('Tegra, a Barghast guide, walks with the Third. She has not said her clan, and has not been asked.');
    if (f.b9_tegraDone === 2) x.push('Tegra, a Barghast guide, waits at the guides\' fire for room in the Third.');
    if (f.b9_c5_cacheDone) x.push('Deserters came down a dry wash for a dead man\'s food, and the Third met them there.');
    if (f.b9_c5_bullDone === 'killed') x.push('A maddened bhederin bull at the noon halt went into the Third\'s pot.');
    if (f.b9_c5_bullDone === 'driven') x.push('A maddened bhederin bull at the noon halt was driven off into the Wastes.');
    if (f.b9_c5_dug === 'ok') x.push('Tegra found water under the sand of a dry wash, and the Third filled every skin.');
    if (f.b9_c5_wordOk) x.push('An old marine taught the Third how the old hands say it at the halts: we shall be our own witness.');
    if (S.b9 && S.b9.wit && S.b9.wit.c5) x.push(S.b9.wit.c5 === 'kept' ? 'On short rations under the stars, the Third still had an answer for what it marches for.' : 'On short rations under the stars, the Third said it marches for nothing, out loud.');
    if (f.b9_c5_dust) x.push('At first light there was dust on the horizon that was not the column\'s.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b9_c5_dust && 'At first light, dust far out on the horizon. Not the column\'s. Tegra says the wind does not raise dust like that.',
    f.b9_c5_key && (f.b9_c5_key === 'share' ? 'The sutler\'s cache went into the company\'s pot. The heavies ate a little better, and knew who to thank.' : 'The sutler\'s cache stayed with the Third. The Third ate. Haddat did not, the first night.'),
    f.b9_c5_found && 'A Kartool sutler went off the column\'s line after water and died in a dry wash. There was food under the floor of his cart.',
    f.b9_c5_rise && 'A lone officer rode out from the column to look at the Wastes, and was fetched back. The heavies said it was the Fist.',
    f.b9_c5_sappers && 'The munitions are short. A man in a leather cap told a quartermaster\'s clerk so, at length, at the sappers\' wagons.',
    f.b9_c5_orders2 && 'Two of the marines\' sergeants are gone in the night, Thallo says. The marines are not saying where.',
    f.b9_c5_heavies && 'Heavies at the next fire talking about the west, and how far back the last water is.',
    f.b9_c5_orders1 && 'The quartermaster cut the ration again. Half a biscuit, what the pot holds, water by the cup.',
    'The Third, with the heavies, deep in the Wastes.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the first night's camp ======== */
    b9_c5_start:()=>({sp:'The column\'s camp', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_ph = S.f.b9_c5_ph || 1; }, again:()=>'The camp on open ground, the dung-fires low, the dark close on every side.', txt:
`The column stops where the light gives out, on a stretch of bare ground no different from the last one, and the tents go up in their rows and the wagons draw in, and the cook-fires are lit on dung because there has been nothing else to burn for days.

The pot is thin tonight. The quartermaster's clerks went down the line at dusk with their tallies, and every squad got a little less than yesterday, and nobody was surprised. ${b95Say({haddat:`Haddat takes her belt in a hole without comment and goes on boiling the water.`, tangle:`Tangle takes his belt in a hole and looks at the new hole like a count that has come out short.`, _:'The squad takes its belts in a hole and does not discuss it.'})}${b95C3()}${b95If('brask', `\n\nBrask is eating his half-biscuit standing up, in very small bites, to make it last. "Heavies eat last," he says. "Always did. Means you know exactly how much there was."`)}

Thallo is at the ration wagons with the clerks, with the look of somebody asked to explain a sum to people who can count. Out past the last tents, on the east side, there is a small fire on its own, the guides' fire, and someone at it who is not a soldier.`,
      ch:[{t:'Thallo.', go:'b9_c5_thallo'},
          {t:'The guides\' fire, at the camp\'s edge.', req:()=>!b95TSettled(), go:'b9_c5_tegra'},
          b9ReadChoice(5),
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b9_c5_read:()=>b9ReadOffer(5),
    b9_c5_card:()=>b9ReadCard(5),

    /* Thallo, the first night: the cut, and the guide */
    b9_c5_thallo:()=>({sp:'Thallo', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_orders1 = 1; }, again:()=>'Thallo, by the ration wagons. "Half a biscuit, Sergeant. Water by the cup."', txt:
`"Half a biscuit," Thallo says, before you ask. "What the pot holds. Water by the cup, and the cup's smaller." He holds up his own half-biscuit and looks at it with a kind of respect. "Quartermaster says it's to stretch it. I asked him to what. He said to the end." He eats the biscuit in two bites. "I asked him the end of what. He went away."

"Captain's taken on a guide," he says. "Barghast. A woman. For the company's water details." He nods east, at the small fire past the tents. "She knows where the dry washes hold water under the sand, they say. Plainsfolk know that. Heavies don't." He considers. "Heavies know where the wagons are. Not the same."`,
      ch:[{t:'"How long does it stretch to?"', go:'b9_c5_thallo_more'},
          {t:'The guides\' fire.', req:()=>!b95TSettled(), go:'b9_c5_tegra'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_thallo_more:()=>({sp:'Thallo', scene:'b9_wastes_night', txt:
`"Nobody's said." He wipes his mouth. "Clerks have a number. They won't tell it. If they told it, we'd know whether it's enough, and they'd rather we didn't, which tells you." He shrugs his huge shoulders. "Game's thin. The scouts go out and come back with one hare between them. Grass is thin. Water's thin." He looks at the dark. "Even the dark's thin, out here. Too many stars."${b95If('tangle', `\n\nTangle has been listening. "If they won't say the number," he says, "it's small." Thallo looks at him. "Sapper," he says. It is not a question.`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Tegra (the first halt): a Barghast guide the captain has hired, at the guides' fire */
    b9_c5_tegra:()=>{ const d = S.f.b9_tegraDone, ph = b95Ph();
      const sc = ph === 2 ? (S.area === 'b9_c5_wash' ? 'b9_c5_wash' : 'b9_c5_plain') : 'b9_wastes_night';
      if (d === 2) return {sp:'Tegra', scene:sc, txt:
`Tegra is ${ph === 2 ? 'a little apart from the water detail, reading the ground,' : 'at the guides\' fire, alone, with her back to the column and her face to the dark,'} with an axe across her knees${ph === 2 ? ' when she sits' : ''}. She looks up when you come over, and waits.`,
        ch:[{t:'"Walk with us, Tegra."', fx:()=>{ b9Join('tegra'); }, go:'b9_c5_tegra_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (d === 1) return {sp:'Tegra', scene:sc, txt:
`Tegra is sitting on her heels, not on the ground, the way she always sits, turning a pebble over in her fingers and looking at it like something that is telling her a story.`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'A Barghast guide', scene:'b9_wastes_night', again:()=>'The guide at her own small fire, at the edge of the camp.', txt:
`The guides' fire is a handful of dung and thorn at the very edge of the camp, where the tents stop and the dark starts. There is one person at it: a Barghast woman of thirty or so, sitting on her heels, in painted hide over a quilted shirt, with two white bars painted under her eyes and her hair in a long braid over one shoulder. A string of small bones at her throat. Two short axes in her belt.

She watches the Third come over the whole way, without seeming to.

"Malazans," she says, in a trade-tongue with the plains in it. "The captain said a squad would come. He said you were the ones who boil water." She seems to find that funny, and also to approve of it. "I am Tegra. I know where the washes keep water under the sand. Your captain pays me in biscuit, which is a joke, out here. I took it anyway."`,
        ch:[{t:'"Walk with us, Tegra. A guide who walks with the squad is worth two at a fire."', fx:()=>{ b9Join('tegra'); }, go:'b9_c5_tegra_join'},
            {t:'"Barghast. Which clan?"', req:()=>!S.f.b9_c5_tegraWhy, go:'b9_c5_tegra_why'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c5_tegra_why:()=>({sp:'Tegra', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_tegraWhy = 1; }, txt:
`She looks at you for a moment as if you had asked the price of her grandmother.

"A small one," she says. "It walked away from the host when the host went to war. The host does not forgive walking away." She turns a pebble over in her fingers. "So I do not say the name. Not to Malazans, not to anybody. If the name goes along the column, it goes off the end of it, and somebody on the plains hears it, and then somebody comes." She puts the pebble down. "My clan went west. I did not. That is all the story there is."

"Ask me where the water is," she says. "That one I will answer."${b95If('haddat', `\n\nHaddat bows to her, the Hissari way, a short bow for a stranger. "My mother would not say her village either," she says. "Not after." Tegra looks at her, and nods, as if something had been agreed.`)}`,
      ch:[{t:'"Walk with us, Tegra."', fx:()=>{ b9Join('tegra'); }, go:'b9_c5_tegra_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_tegra_join:()=>({sp:'Tegra', scene:S.area === 'b9_c5_wash' ? 'b9_c5_wash' : S.area === 'b9_c5_plain' ? 'b9_c5_plain' : 'b9_wastes_night', txt:
`${b95TIn() ? `She gets up off her heels in one movement, picks up a gourd and a pack, and walks over to the Third's fire as if she had been on her way there already.

"I will sleep with my feet to the fire and my head to the dark," she says, while she is shown where the squad's tents are. "If I wake you, there is something out there. If I do not, there is not." She sits on her heels by the dung-fire.${b95If('brask', ` Brask looks at the axes in her belt and says, "Throw those?" She says, "Yes." He nods, satisfied, as if that settled a great deal.`)}${b95If('tangle', ` Tangle asks if she can count. She says to forty, in four languages. He seems to think that will do.`)}` : `She nods, and sits back down on her heels: six already walk with the Third, and a guide can count. "When there is room," she says. "I will be at this fire, or at the head of the water detail. The captain pays me either way. In biscuit."`}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the ration wagons: short rations, plainly */
    b9_c5_wagons:()=>({sp:'The ration wagons', scene:'b9_wastes_night', html:rationsHTML(), again:()=>'The company\'s ration wagons, the clerks gone, a sentry on each tailboard.', txt:
`The company's ration wagons are drawn up nose to tail with a sentry on each tailboard, which there was not at the Wastes' edge. The canvas is tied down tight. Under it, the shapes are fewer and lower than they were at the Wastes' edge.

${b95Ph() === 1 ? `A clerk is going along them with a lamp and a tally, counting, and writing it down, and counting again, under his breath, like prayers.` : `The clerk has gone to bed. The sentries have not.`}${b95Say({doss:`\n\nDoss looks at the canvas for a while. "On the holding," he says, "the clerk's men came and counted our stores in the winter. Then they took the count away with them." He looks at the sentry. "This is the same, the other way round."`, mehet:`\n\nMehet looks at the knots on the canvas, professionally. "Easy," he says. Then, seeing your face: "I said easy. I didn't say I would."`, _:''})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Harro, the sutler: phase 1 the dead sutler and the scarf (money is the scene), phase 3 camp talk */
    b9_c5_harro:()=>{ const ph = b95Ph(), have = !!S.f.b9_c5_scarf, s = S.silver || 0;
      if (ph >= 3) return {sp:'Harro, the sutler', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_harro3 = 1; }, again:()=>'Harro, on his tailboard, his stock thin.', txt:
`Harro is on his tailboard with his hat pushed back and very little left to sell, and he is counting it anyway.

${b95Key() === 'keep' ? `"You found him," he says, as soon as he sees the Third. "Old Kartool. And his floor." He sniffs the air, which does not smell of anything but dung-smoke, and nods. "Kept it, did you. Good. I'd have kept it." He thinks. "I'd have sold it you after, mind."` : b95Key() === 'share' ? `"You found him," he says. "Old Kartool. And gave his floor to the company's pot." He shakes his head slowly. "Malazans. I've followed armies from Unta to here, and you're the only ones who do that." He does not sound as if he means it as praise. He does not sound as if he means it as anything else either.` : `"Heard you went south with the guide," he says. "Water detail." He looks at you, sharp. "Find anything?"`}

"News, for nothing, since you're not buying." He leans in. "${b95Other()}"`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'Harro, the sutler', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_harro1 = 1; }, again:()=> have ? 'Harro, at his wagon, telling somebody else about the cache.' : 'Harro, at his wagon, with a sack of dust-scarves.', txt:
`Harro's wagon is lighter than it was on the road east, and so is Harro. He is sitting on the tailboard in his wide hat, telling three heavies of another company, loudly, about a sutler who is not there.

"Kartool man," he says, waving you over. "Old. Sold needles and salt and bad wine off a mule-cart. Three days back he went off the column's line after water, south, in some wash the guides talk about, and he never came back." He spreads his hands. "And every sutler on every road keeps a little something under the floor of his cart, for the bad days. Everybody knows that. I keep one." He pats the tailboard, then seems to remember who is listening, and stops patting it.

"Dust-scarves," he says, to change the subject. He holds one up out of a sack: a long strip of dun linen. "For the mouth. The dust gets in everything out here. Four silver."`,
        ch:[{t:'Talk him down. He has a sackful.', check:['guile', 17], req:()=>!have && !S.f.b9_c5_haggled && s >= 3, fx:()=>{ S.f.b9_c5_haggled = 1; },
              edges:id=>[id === 'mehet' && ['a market boy from Y\'Ghatan', 2], id === 'doss' && ['he has haggled with the clerk\'s men all his life', 1], id === 'tangle' && ['he has counted the sack', 1], id === 'tegra' && ['the plains haggle by looking at the sky, and Harro does not know how to answer it', 1], id === 'brask' && ['heavies pay what\'s asked', -1], id === 'ottar' && ['he does not know the Malazan for robbery', -1]],
              near:{t:()=>`Yes, but Harro gives ground like a heavy, a step at a time, and takes three for it, and calls it charity.`, fx:()=>{ S.silver = Math.max(0, (S.silver || 0) - 3); updSilver(); S.f.b9_c5_scarf = 1; gain('b9_c5_dustscarf'); }},
              go:'b9_c5_harro_ok', fail:'b9_c5_harro_no'},
            {t:'"Four, then."', tag:'4 silver', req:()=>!have && s >= 4, fx:()=>{ S.silver -= 4; updSilver(); S.f.b9_c5_scarf = 1; gain('b9_c5_dustscarf'); }, go:'b9_c5_harro_paid'},
            {t:'"This wash. Where?"', req:()=>!S.f.b9_c5_harroWash, go:'b9_c5_harro_wash'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c5_harro_ok:()=>({sp:'Harro, the sutler', scene:'b9_wastes_night', fx:()=>{ if (!S.f.b9_c5_scarf) { S.silver = Math.max(0, (S.silver || 0) - 2); updSilver(); S.f.b9_c5_scarf = 1; gain('b9_c5_dustscarf'); } }, txt:
`${nearMiss() ? `It takes a while. Harro holds at four, and then at three and a half, which is not a coin, and in the end at three, which is. He hands over a scarf with the face of a man being robbed by his own family.` : `It takes a while. Harro holds at four, then three, then remembers how many scarves are in the sack and how few soldiers have silver left out here, and in the end hands one over for two with the face of a man being robbed by his own family.`}

"Don't tell the heavies," he says. "They'll all want two."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c5_harro_no:()=>({sp:'Harro, the sutler', scene:'b9_wastes_night', txt:
`Harro listens with great courtesy, nodding, and at the end says "Four," as if nothing had been said at all.

"Out here," he says, "the price of dust goes up." He seems pleased with that, and says it again to the heavies.`,
      ch:[{t:'"Four, then."', tag:'4 silver', req:()=>!S.f.b9_c5_scarf && (S.silver || 0) >= 4, fx:()=>{ S.silver -= 4; updSilver(); S.f.b9_c5_scarf = 1; gain('b9_c5_dustscarf'); }, go:'b9_c5_harro_paid'},
          {t:'Not at that price.', go:()=>startExplore()}]}),
    b9_c5_harro_paid:()=>({sp:'Harro, the sutler', scene:'b9_wastes_night', txt:
`Harro takes the silver, bites a coin out of habit, and hands over a scarf from the sack with a little bow. "Wrap it twice," he says. "Over the nose. Tuck the end." He demonstrates on himself, and talks through it, muffled. "Pleasure."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c5_harro_wash:()=>({sp:'Harro, the sutler', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_harroWash = 1; }, txt:
`"South," Harro says. "Ask the guides. Some wash they say holds water under the sand. He went to fill his skins and sell the water back to us at a profit, the old thief." He says it with real affection. "Didn't come back."

He looks round at the heavies he was talking to, who are still listening, and lowers his voice, too late. "If you find him," he says, "I'll buy whatever he had. Fair price." He thinks. "Fair-ish."${b95If('brask', `\n\nBrask watches the three heavies drift away from the wagon toward their own fire, talking among themselves. "Said that loud," he says. Harro looks at him. "I say everything loud," he says. "It's how you sell."`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* heavies at the next fire: desertion talk (never Sinter's plan) */
    b9_c5_heavies:()=>({sp:'Heavies at the next fire', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_heavies = 1; }, again:()=>'The heavies at the next fire, talking low, and stopping.', txt:
`At the next fire, three heavies of another company are sitting close together and talking low. The words that carry are about the west: how many days back the last water is, whether a man on his own could walk it on a full skin, what the Letherii do to Malazans they find on their roads now.

They stop when the Third comes near. One of them, a long-faced corporal, looks up. "Just talking, Sergeant," he says. "Counting the days back." He looks at the fire. "It's a lot of days."${b95Say({brask:`\n\nBrask stands at the edge of their fire. "Old squad had one who counted days back," he says. "He walked, one night. On a full skin." He waits. "We didn't find him. Wastes didn't give him back either." The corporal looks at the fire and says he was only counting.`, haddat:`\n\nHaddat stands at the edge of their fire. "My mother walked the Pan'potsun alone once," she says. "She said never again. She said the desert does not care if you are brave." The corporal looks at the fire.`, _:''})}`,
      ch:[{t:'"Count the days forward instead. There are fewer of us to share them with if you go."', go:'b9_c5_heavies_more'},
          {t:'Leave them to it.', go:()=>startExplore()}]}),
    b9_c5_heavies_more:()=>({sp:'Heavies at the next fire', scene:'b9_wastes_night', txt:
`The corporal thinks about that for longer than it deserves. "Fewer to share the biscuit," he says. "More biscuit." He almost smiles. "That's a sapper's sum."

"Don't worry, Sergeant," he says. "We're too tired to walk anywhere we're not marched." The other two laugh, not much. When the Third goes back to its own fire, they are talking about something else.${b95If('tegra', `\n\nTegra, at the Third's fire, has heard all of it. "West is far," she says. "And the host is on the plains between. They would not get far." She says it as a plain fact of the place, and goes back to her pebble.`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the old marine: phase 1 a word and the reading; phase 3 the saying (the trick) */
    b9_c5_oldmarine:()=>{ const ph = b95Ph();
      if (ph >= 3) return {sp:'The old marine', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_wordHeard = 1; }, again:()=> S.f.b9_c5_wordTried ? 'The old marine at his small fire, his cup empty, saying it under his breath to nobody in particular.' : 'The old marine at his small fire, with an empty cup.', txt:
`The old marine has his boots off and his feet to his dung-fire and his cup in his hand, and nothing in the cup. He is holding it anyway.

"Heard them at the next fire," he says. "Saying it." He does not say what. "Ration's cut, so they say it. That's how it goes." He turns the empty cup in his fingers. "<em>We shall be our own witness.</em> Story is the Adjunct said it, on the other side of the sea, to the marines going over the side. I wasn't there. Wasn't on that boat." He shrugs. "Doesn't matter who said it first."

"What matters is how you say it. Not to the sky. Not to the Adjunct. To the one next to you. And they say it back." He looks at the Third. "Then you both know someone's watching. That's all a soldier wants, most days. Somebody to see it." He drinks from the empty cup, out of habit. "In a fight, said right, it holds a line where it is. Seen it."`,
        ch:[{t:'Learn to say it the way the old hands do: to the one beside you, and wait for it back.', check:['wits', 19], trick:'b9_c5_witness', witness:true, req:()=>!S.f.b9_c5_wordTried, fx:()=>{ S.f.b9_c5_wordTried = 1; },
              edges:id=>[id === 'haddat' && ['she says the names of the dead every night; she knows what it is to be the witness', 2], id === 'marrow' && ['a healer of Soliel sits with the dying so they are seen', 1], id === 'brask' && ['the heavies\' wall answers for the man beside it', 1], id === 'sgt' && ['the words went round the transports before the landing, and you heard them secondhand', 1], id === 'doss' && ['on the holding, the debt-clerk was the only witness; he knows what it is to have a better one', 1], id === 'tegra' && ['among her people the dead do the watching, and she finds it strange to do it yourself', -1], id === 'tangle' && ['he would rather count the squad than say anything to it', -1]],
              go:'b9_c5_word_ok', fail:'b9_c5_word_no'},
            {t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'The old marine', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_old = 1; }, again:()=>'The old marine by his own small fire, with his cup and his deck.', txt:
`The old marine has his own small fire beside the heavies' lines, as he has had at every halt since Letheras, with a cup and his deck. There is nothing in the cup. He holds it anyway.

"Rum's gone," he says. "Three days back. Last of it." He turns the empty cup in his fingers. "Didn't think I'd miss it this much. Thought I'd miss my knees more." He shuffles the deck one-handed. "Ground's flat enough for a reading, if anybody wants one. It's all flat, out here."`,
        ch:[b9ReadChoice(5),
            {t:'Back to the camp.', go:()=>startExplore()}]}; },
    b9_c5_word_ok:()=>({sp:'The old marine', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_wordOk = 1; }, txt:
`He makes ${by({sgt:'you', _:'{who}'})} say it to the soldier at ${by({sgt:'your', _:'{who}\'s'})} elbow, and the first time it comes out like an order, and he shakes his head. The second time it comes out like a prayer, and he shakes his head again. The third time it is said quietly, to the face beside, as a thing that is simply true, and it comes back the same way, and the old marine nods.

"That's it," he says. "You don't shout it. Shouting's for the ones who aren't sure." He looks into his empty cup. "Say it like that in a fight and the line stays where it is. Seen it at the landing. Seen it since."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c5_word_no:()=>({sp:'The old marine', scene:'b9_wastes_night', txt:
`It will not come out right. Said loud, it sounds like an officer. Said soft, it sounds like a joke. The soldier beside says it back each time in exactly the wrong voice, and somebody at the next fire laughs, and that is the end of it.

"It's not a drill," the old marine says, not unkindly. "You can't learn it at a fire. You learn it when you need it, or you don't." He holds up the empty cup to the stars. "I didn't, for years."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the camp's east edge */
    b9_c5_camp_east:()=>({sp:'The camp\'s edge', scene:'b9_wastes_night', txt:
`Past the last tents the ground goes on, pale grass and bare stone, into a dark with no fires in it at all. The sentries stand facing it. There is nothing out there to see, and they look at it anyway, as soldiers do.${b95If('tegra', `\n\nTegra comes up beside you and looks too, for a while. "Nothing," she says. Then: "Not nothing. Nothing close."`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ======== the fire: phase 1 the first night, phase 3 the second. The games pass wraps this node: keep the id ======== */
    b9_c5_fire:()=>{ const ph = b95Ph(), late = ph >= 3, rk = 'b9_c5_rest' + (late ? 3 : 1);
      return {sp:'The Third\'s fire', scene:'b9_wastes_night', html:rationsHTML(),
        again:()=>'The Third\'s dung-fire under the stars, burning low to make the dung last.', txt:
`${late ? `The Third's fire tonight is the same dung-fire a day further east, under the same stars, burning low. ${b95Key() === 'keep' ? 'There is something in the pot tonight that did not come off the company\'s wagons, and the squad eats it with its back to the next fire.' : b95Key() === 'share' ? 'The company\'s pot is thicker tonight, by a dead man\'s floor, and the heavies at the next fire raised their cups to the Third when it came in. The cups had water in them.' : 'The pot is thin.'}` : `The Third's fire is a few cakes of dung on bare ground with a ring of stones round it, and it burns low and hot and smells of the herds that left it. Short rations, the clerks call it. Half a biscuit, what the pot holds, and water by the cup. The pot does not hold much.`}${b95If('tegra', late ? `\n\nTegra sits on her heels with her feet to the fire and her face to the dark, as she said she would.` : `\n\nTegra sits on her heels at the Third's fire with her feet to it and her face to the dark.`)}${b95If('brask', `\n\nBrask has his back to the fire and his half-biscuit in his fist, not eaten yet.`)}`,
        ch:[...(ph === 1 ? [b9ReadChoice(5)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(late ? 'The squad sits an hour by the dung-fire. Wounds close, mostly. The hunger stays.' : 'The squad sits an hour by the dung-fire. Wounds close, mostly. The belts stay where they are.'); }, go:'b9_c5_fire_rest'},
            {t:'Talk with the squad.', go:'b9_c5_fire_talk'},
            {t:'"What are we marching for, out here, on this?"', req:()=>late && !(S.b9 && S.b9.wit && S.b9.wit.c5), go:'b9_c5_witness'},
            {t:'Turn in. The column moves at first light.', req:()=>ph === 1 && !!S.f.b9_c5_orders1, onward:true, go:'b9_c5_turnin'},
            {t:'First light. East.', req:()=>late && !!b95Key(), onward:true, go:'b9_c5_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c5_fire_rest:()=>({sp:'The Third\'s fire', scene:'b9_wastes_night', txt:
`An hour, then, by the dung-fire, with the stars going over and the column's other fires going away east in a line and stopping.

${b95Say({marrow:`Marrow goes round the squad with her hands, and stops at each of them a little longer than she used to. "Eat what you have, child," she says to each. "Slowly." She closes a cut anyway.`, mirrel:`Mirrel goes round the squad's feet, every pair, and does not like what she finds. "Stones," she says. "And the boots thinner than the stones." She binds what she can.`, _:'Some of them sleep. The rest watch the fire and do not think about food, carefully.'})}${b95If('haddat', `\n\nHaddat says the names of the dead under her breath, the long list, and at the end of it she breaks her half-biscuit in two and puts half back in her pack for tomorrow.`)}`,
      ch:[{t:'Back to the fire.', go:'b9_c5_fire'}]}),
    b9_c5_fire_talk:()=>{ const late = b95Ph() >= 3, k = b95Key(), ln = [], sh = S.inv.sharper || 0, cu = S.inv.cusser || 0;
      if (b9In('haddat')) ln.push(late ? (k === 'keep' ? `Haddat has not eaten from the pot tonight. She is boiling the water. "My mother said food you hide from the village is food you eat alone," she says, "even with others at the fire." She does not look angry. She looks tired. "Eat. I will eat tomorrow."` : `Haddat is boiling the water, as she does at every halt. "Tonight the next fire is eating what we found," she says. "My mother would have liked that." She counts under her breath, to a hundred.`) : `Haddat is boiling the squad's water, counting to a hundred under her breath, as the Letherii healer taught them. "My mother crossed the Pan'potsun on a skin a day," she says. "I used to think she exaggerated." She looks at the cup. "She did not."`);
      if (b9In('sathi')) ln.push(late ? `Sathi is gnawing something, slowly, with her filed teeth, and grinning at the dark. "Hungry is good," she says. "Hungry is awake." Nobody agrees with her, and she does not mind.` : `Sathi is sharpening her knife at the fire. "Weasels went hungry half the year," she says. "We ate what we caught." She looks at the dark. "Nothing out there to catch."`);
      if (b9In('tangle')) ln.push(late ? `Tangle has the satchel open on his knees. "${b95Sh(sh)}, ${numw(cu)} cusser${cu === 1 ? '' : 's'}," he says. "Same as yesterday. Same as tomorrow." He shuts it. "The man in the leather cap was right. It's not enough. For what, he didn't say."` : `Tangle is counting his biscuit, which takes no time. "Half," he says. "Yesterday was three-quarters. Day before, a whole." He does the sum and stops doing it. "I don't like where that sum goes."`);
      if (b9In('marrow')) ln.push(late ? `Marrow is sitting very small by the fire with her eyes shut. "Soliel's door is still open a crack, child," she says. "Further out than I thought. The Queen does not mind short rations. She minds the ones who stop eating." She opens one eye at you. "Eat."` : `Marrow has her knotted string out, and is knotting it, slowly. "One for each day since the last water that tasted of anything," she says. "It's getting long, child." She ties another.`);
      if (b9In('mirrel')) ln.push(late ? `Mirrel is going through her bag by touch, counting rolls of linen. "Fewer cuts lately," she says. "Nobody has the strength to fight." She does not seem to know whether that is good.` : `Mirrel is watching the squad eat. "Slowly," she says. "All of you. A stomach that's been short takes it badly if you rush." She eats her own half-biscuit in a dozen pieces, setting the example.`);
      if (b9In('doss')) ln.push(late ? `Doss is looking at the pot. "On the holding," he says, "a bad winter, we'd find a neighbour's store and we'd ${k === 'share' ? 'share it round the village, because next winter it would be ours they found' : 'keep it, because the clerk would have it otherwise'}." He shrugs. "Same out here. Only the clerk's further off."` : `Doss is eating his half-biscuit with his eyes shut. "Tastes of the holding," he says. "The bad years." He opens his eyes. "I used to think the Indebted were hungry. We were. This is different. This is everybody."`);
      if (b9In('wenna')) ln.push(late ? `Wenna is shaking her skin, listening to it slosh. "Full," she says. "From the wash. Tegra's water." She sounds as if she would like to be annoyed that someone else found it, and cannot manage it.` : `Wenna has her ear to the ground, as she does sometimes, listening. "Water," she says. "Somewhere. Deep." She sits up. "Too deep for a spade."`);
      if (b9In('mehet')) ln.push(late ? `Mehet is turning a brass buckle in his fingers, off the sutler's pack. "Never seen a false floor done that well," he says. "Kartool work." He sounds almost respectful. "Y'Ghatan would have paid for that man."` : `Mehet is jingling his ring of keys. "Every wagon in the company's locked tonight," he says. "Sentries on the tailboards." He considers. "Doesn't make me hungry for what's in them. Makes me hungry for the locks."`);
      if (b9In('ottar')) ln.push(late ? `Ottar has the grey plate off, which he does more often now; it is heavy, and he is lighter. "Today's word," he says, "is <em>witness</em>." He tries it. "In Perish, the one who watches the oath." He thinks. "Here, it is the soldier beside you." He nods. "Both are true."` : `Ottar is eating very slowly. "Today's word," he says, "is <em>ration</em>." He thinks. "It means less."`);
      if (b9In('tallow')) ln.push(late ? `Tallow is laying out his grandmother's deck on the bare ground and not reading it, just looking at it. "She said the Wastes had a card of their own," he says. "Never told me which." He puts them away.` : `Tallow is eating his half-biscuit standing, as Brask does. "Grandmother said a soldier's belly is the army's clock," he says. "Mine says it's late."`);
      if (b9In('hessa')) ln.push(late ? `Hessa has her palm flat on the ground. "D'rek is very deep here," she says. "She is patient. She can wait for us." She takes her hand back. "I would rather she did not."` : `Hessa has the spear upright beside her and her half-biscuit untouched. "In the temple we fasted," she says. "For D'rek. It made the visions come." She looks at the biscuit. "Nothing is coming. I am only hungry."`);
      if (b9In('tebbet')) ln.push(late ? `Tebbet has the bow across his knees and an arrow he is not going to waste turning in his fingers. "Not a hare in days," he says. "Not a bird." He puts the arrow away. "Something ate them before we got here."` : `Tebbet is waxing his bowstring. "Went out with the scouts at noon," he says. "Not a hare. Not a bird. Nothing to shoot for a league." He looks at the dark. "I've never been somewhere with nothing to shoot."`);
      if (b9In('darrut')) ln.push(late ? `Darrut has his helm on his knees, polishing it with sand, which is all there is. "The Aren Guard had a siege year," he says. "Short rations a whole winter." He stops. "This is shorter."` : `Darrut is looking at the column's fires. "In Aren," he says, "when the ration was cut, the Guard was told why." He looks at the fires. "Here nobody tells anybody."`);
      if (b9In('yorin')) ln.push(late ? `Yorin's copper wind-vane is turning on his palm, slowly, and stopping, south-east. "Wind's from that way," he says. "Tomorrow." He looks unhappy. "Serc doesn't like what's on it."` : `Yorin has the copper wind-vane on his palm and is not looking at it. "Serc is thin out here," he says. "Like the grass." He closes his hand on it.`);
      if (b9In('rasp')) ln.push(late ? `Rasp has been to see the sappers again. "The man in the cap says the Moranth stopped sending," she says. "Or the boats did." She sits. "He wants to make his own. The quartermaster says no." She looks at Tangle's satchel. "The quartermaster has never had to throw one."` : `Rasp has the squad's munitions laid out on a cloth, checking the timers by feel in the dark. "They don't get hungry," she says. "That's one good thing about them."`);
      if (b9In('orvas')) ln.push(late ? `Orvas is looking south-east into the dark. "Khundryl say a plain this empty has been grazed by something," he says. "Something big. Something that left." He shrugs. "Or old women's talk."` : `Orvas is eating his biscuit slowly. "Khundryl would eat a horse now," he says. "Somebody else's." He thinks. "Ours as well, by tomorrow."`);
      if (b9In('redblade')) ln.push(late ? `Ramin has eaten nothing tonight, and makes no remark on it. "The Red Blades fasted before a fight," he says, when asked. "To be clear." He looks into the dark. "I feel very clear."` : `Ramin is sitting very straight, in his scale, as if a Red Blade officer might come by to check. "Hunger is discipline," he says. Then, quieter: "That is what they told us. They were well fed when they said it."`);
      if (b9In('warlock')) ln.push(late ? `Keth is very quiet. "*Eat, boy,*" the grandmother says, out of his mouth. "*I starved once in a bad year. It is not interesting.*" Keth eats.` : `Keth sits close to the fire. "*In my day,*" the grandmother says, out of his mouth, "*we ate the boots.*" Keth looks at his boots, alarmed.`);
      if (b9In('brask')) ln.push(late ? (k === 'share' ? `Brask is sitting with the heavies at the next fire for once, and comes back. "They said thank you," he says. He seems to find it strange. "Heavies don't say thank you. Heavies say pass the pot." He sits. "Well. They said both."` : k === 'keep' ? `Brask has eaten his share of the cache and is sitting with his back to the next fire. "Old squad would've kept it," he says. "Every time." He picks at the dung-fire with a stick. "Old squad's dead."` : `Brask is sharpening the heavy sword, slowly, to keep his hands busy.`) : `Brask is holding his half-biscuit and not eating it. "Make it last till the next halt," he says. "Then you've got something to want." He puts it back in his pack.`);
      if (b9In('tegra')) ln.push(late ? `Tegra is sitting on her heels, turning a pebble over. "My grandmother said the plains feed you if you know where to put your hand," she says. "Out here, they are not the plains." She puts the pebble down. "Out here you put your hand on a dead man's floor." She shrugs. "It fed you."` : `Tegra is sitting on her heels, watching the Third eat its half-biscuits with interest. "You eat like it is the last," she says. "Barghast eat like there will be more." She thinks. "That is why the host went to war, maybe." She does not explain.`);
      return {sp:'The Third\'s fire', scene:'b9_wastes_night', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b9_c5_fire'}]}; },
    /* first light: phase 1 to 2 */
    b9_c5_turnin:()=>({sp:'The camp', scene:'b9_wastes_night', txt:
`The Third turns in round its fire, with the half-biscuits in the packs for the morning and the skins by the blankets, and the stars going over, too many of them.${b95If('tegra', ` Tegra sleeps with her feet to the fire and her head to the dark, and does not wake anybody.`)}

At first light the drums go, and the column gets up off the bare ground, slowly, and forms on its track, and goes on east.`,
      ch:[{t:'First light. The march.', onward:true, fx:()=>{ S.f.b9_c5_ph = 2; }, go:()=>{ startExplore('b9_c5_plain'); talk('b9_c5_day_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ======== phase 2: the noon halt on open country ======== */
    b9_c5_day_arrive:()=>({sp:'The noon halt', scene:'b9_c5_plain', again:()=>'The column halted at noon on open country, the wagons drawn up along the track.', txt:
`By noon the column has walked a morning across country with nothing on it: dry grass the colour of old bone, bare stone coming up through it in long low backs, and a sky that does not end. It halts where it is, files sitting down in the dust, wagons drawn up along the track.

Little is said. Water goes round by the cup.${b95If('tegra', `\n\nTegra squats on her heels at the track's edge and runs a hand flat over the grass, against the grain and then with it. "South," she says, to nobody in particular. "Low ground south. A wash." She stands. "I will tell your captain."`)}${b95If('brask', `\n\nBrask is walking on the dusty side of the track again, so the rest of the Third can walk on the less dusty one. He was not asked to, and is not stopped.`)}

Thallo is coming down the line from the captain's wagon with his face set the way it sets for a job, and something else in it too.`,
      ch:[{t:'Thallo.', go:'b9_c5_thallo2'},
          {t:'Walk the halt.', go:()=>startExplore()}]}),
    /* Thallo, the noon halt: the rumour, and the water detail */
    b9_c5_thallo2:()=>({sp:'Thallo', scene:'b9_c5_plain', fx:()=>{ S.f.b9_c5_orders2 = 1; }, again:()=> b95CacheDone() ? 'Thallo, in the shade of a wagon. "Column camps at dusk, Sergeant."' : `Thallo, by the wagons. "South with ${b95Guide()}, Sergeant. The skins."`, txt:
`"Two things," Thallo says. He squats down in the shade of a wagon and keeps his voice under the noise of the halt.

"First. Two of the marines' sergeants are gone. In the night. Gone from the column." He rubs his broken nose. "That's all anybody knows. The marines aren't saying where, and the ones who'd know aren't saying anything." He looks up the line toward the front, where the marines march. "Some say walked off. Some say worse. I don't say. Two sergeants." He shakes his head. "Not the kind that walk off, I'd have thought."

"Second. Captain's word: water detail south, with ${b95Guide()}. ${b95GuideC()} says there's a wash an hour off holds water under the sand. Third's turn. Take my heavy for the skins." He stands up. "And keep an eye out. Harro was telling half the column last night about some dead sutler's cart down that way."`,
      ch:[{t:'"Gone how?"', req:()=>!S.f.b9_c5_thalloMore, go:'b9_c5_thallo2_more'},
          {t:'South, then. The water detail.', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_thallo2_more:()=>({sp:'Thallo', scene:'b9_c5_plain', fx:()=>{ S.f.b9_c5_thalloMore = 1; }, txt:
`"I don't know, Sergeant. I'm a heavy." He looks at his hands. "I know the marines' sergeants are hard men, and one of them's the hardest I've seen, and in the morning he wasn't there, and his mate wasn't either, and the marines are going about their business with their mouths shut tight." He looks at the plain. "When marines go quiet, I get worried. Marines are never quiet."${b95If('tegra', `\n\nTegra has been listening. "On the plains," she says, "when two good hunters go out in the night and do not come back, you do not go and look for them." She thinks. "You move the camp."`)}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the rise: a lone officer far out on the plain, fetched back (Keneb's ride, R22 S6, seen from the halt and never touched) */
    b9_c5_rise:()=>({sp:'The rise', scene:'b9_c5_plain', fx:()=>{ S.f.b9_c5_rise = 1; }, again:()=>'A low back of stone at the halt\'s east end, and the empty plain past it.', txt:
`From the low back of stone at the east end of the halt, the plain goes on and on, and far out on it, a mile or more, there is a single rider sitting a horse on a rise of his own with his back to the column. An officer's cloak, by the cut of it. He is not doing anything. He is looking east, at the Wastes.

He sits there a while. Then a second rider goes out to him from the head of the column at a walk, and reaches him, and the two of them sit together a moment, and then they turn and come back, slowly, side by side.

${b95Say({brask:`Brask has come up beside you. "Fist," he says. "Keneb. Rides out most days at the halt, they say, and looks at it." He watches the two riders coming in. "And most days somebody gets sent to fetch him." He shrugs. "Officers."`, haddat:`Haddat has come up beside you. "The Fist," she says. "Keneb. The heavies say he rides out at every halt and looks, and somebody is sent to fetch him." She watches the riders. "My mother said a man who keeps looking at the road has already seen where it goes."`, _:'A heavy sitting on the stone with his boots off says, "Fist Keneb. Rides out most days, and gets fetched back," and goes back to his boots.'})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    /* the sappers' wagons: the munitions short (Hedge, seen at a distance) */
    b9_c5_sappers:()=>({sp:'The sappers\' wagons', scene:'b9_c5_plain', fx:()=>{ S.f.b9_c5_sappers = 1; }, again:()=>'The sappers\' wagons, the canvas lashed tight, and the argument over.', txt:
`The sappers' wagons are drawn up a little apart from the rest, as they always are, with their canvas lashed down and a sentry on each who is very careful where he sits.

At the last of them a man in a battered leather cap is telling a quartermaster's clerk, at length and from very close, how much of the army's issue is left in the way of munitions, and that it is not enough, and what he thinks of whoever decided it was. The clerk is holding a tally and nodding at it. The man in the cap is not done.

${b95Say({tangle:`Tangle has stopped dead in the track. "That's Hedge," he says, very quietly. "The one who came back." He watches the man in the cap a while. "He's right, too." His hand is on the satchel. He does not go any nearer, and neither does anyone else.`, rasp:`Rasp has stopped in the track. "That's Hedge," she says. "The one who came back." She watches. "He's right." She does not go any nearer.`, _:'A sentry on the nearest wagon catches your eye and shakes his head, very slightly. "Hedge," he says. "Don\'t." The Third does not.'})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b9_c5_plain_east:()=>({sp:'The track east', scene:'b9_c5_plain', txt:
`The column's track goes on east from the halt, a pale stripe of trodden grass and wheel-ruts across country that has no other mark on it, to where the front of the column is already a smudge of its own dust on the horizon.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the maddened bhederin: optional. Killed, the squad's pot (+2); driven off, the chapter's one ration "yes, but" */
    b9_c5_bull:()=>({sp:'A bhederin bull', scene:'b9_c5_plain', again:()=>'The old bull out on the plain, alone, shaking its head at the flies.', txt:
`Out on the plain south of the halt, a hundred paces off, there is a bhederin bull on its own: old, grey at the muzzle, ribs like a wagon's slats under the hide, with a cloud of flies round its head. It has been thrown out of its herd, or outlived it. It has already come at a water detail of another company this morning, the heavies say, and sent them back without their skins.

It stands in the grass, swinging its head, watching the column. Every so often it paws the dust.${b95If('tegra', `\n\nTegra looks at it with a hunter's eye. "Mad," she says. "Thin grass and flies. It will come at the wagons before dark." She looks at the Third. "It is also meat."`)}${b95If('doss', `\n\nDoss has seen bulls like it. "On the holding we'd have put it down," he says. "And eaten off it till spring." He thinks about spring. "Out here there isn't one."`)}`,
      ch:[{t:'"Third, with me." Bring it down. It\'s meat.', go:()=>startBattle('b9_c5_bull', {})},
          {t:'Shields and noise. Drive it off before it comes at the wagons.', check:['might', 17],
            edges:id=>[id === 'brask' && ['a heavy in scale makes a wall of noise', 2], id === 'ottar' && ['grey plate in the sun is a terrible thing to a bull', 1], id === 'haddat' && ['the blue shield and a shout', 1], id === 'doss' && ['he has driven cattle all his life', 1], id === 'tegra' && ['the plains drive bulls with cord and a cry', 1], id === 'marrow' && ['she is too old to run at bulls, child', -2], id === 'tangle' && ['he would rather throw something at it', -1]],
            near:{t:()=>`Yes, but it goes through the company's ration line on its way out, and a sack of biscuit goes under its hooves: a ration gone.`, fx:()=>{ if (!S.f.b9_c5_lost) { S.f.b9_c5_lost = 1; b9Ration(-1, 'a sack of biscuit under the bull'); } }},
            go:'b9_c5_bull_gone', fail:'b9_c5_bull_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_bull_gone:()=>({sp:'A bhederin bull', scene:'b9_c5_plain', html:rationsHTML(), fx:()=>{ S.f.b9_c5_bullDone = 'driven'; }, txt:
`The Third goes out into the grass with shields up and the loudest noise it can make, and the bull thinks about it, and then turns, and goes, at a heavy lurching run, ${nearMiss() ? 'the wrong way first, straight through the company\'s ration line, where a sack of biscuit bursts under its hooves and goes into the dust, before it finds the right way and is gone.' : 'off south-east across the plain, the flies going with it, until it is only a moving dust on the grass.'}

${b95Say({tegra:`Tegra watches it go. "It will die out there," she says. "Something will eat it." She sounds as if she would rather it had been the Third.`, _:'The heavies at the wagons stop watching, and sit back down.'})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b9_c5_bull_seen:()=>({sp:'A bhederin bull', scene:'b9_c5_plain', txt:
`The noise does not impress it. The bull lowers its head, and the flies lift off it in a cloud, and it comes, faster than anything that thin should move.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c5_bull', {surprise:'e'})}]}),
    b9_c5_bull_after:()=>({sp:'A bhederin bull', scene:'b9_c5_plain', html:rationsHTML(), fx:()=>{ S.f.b9_c5_bullDone = 'killed'; if (!S.f.b9_c5_bullMeat) { S.f.b9_c5_bullMeat = 1; b9Ration(2, 'the bull'); } }, txt:
`The bull is down in the grass, and the flies are already back on it.

There is not much meat on it, for the size of it. It is tough and old and stringy, and the Third butchers it at the halt with every knife it has while the heavies watch, and by the time the drums go there is a wrapped bundle on every pack, and the dogs that follow the column have something to follow it for.${b95Say({brask:`\n\nBrask carries the biggest bundle, over his shoulder, without being asked. "Captain says whoever kills it eats it," he says. "He's hungry too, he said." He thinks. "He said that as well."`, tegra:`\n\nTegra cuts out the tongue and the marrow-bones first, before anybody else thinks to. "The best," she says. "The plains way." She offers them round. Nobody has ever been offered a bhederin's tongue before. Most decline.`, _:''})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* the way south: the water detail */
    b9_c5_south:()=>({sp:'The way south', scene:'b9_c5_plain', txt: !S.f.b9_c5_orders2 ?
`A faint line of trodden grass goes off south from the halt, where water details of other companies have gone and come back. Thallo has been looking for the Third.` : S.f.b9_c5_cacheDone ?
`The way south, back to the wash. There is nothing more in it that is the Third's.` :
`${b95GuideC()} is waiting at the edge of the halt with the water detail's skins, and Thallo's heavy with them, a slow quiet man with a yoke of empty skins on his shoulders. South, the grass goes down gently toward low ground an hour off.`,
      ch: !S.f.b9_c5_orders2 ? [{t:'Back to the halt.', go:()=>startExplore()}] : S.f.b9_c5_cacheDone ?
        [{t:'Back down to the wash.', go:()=>{ startExplore('b9_c5_wash'); }}, {t:'Back to the halt.', go:()=>startExplore()}] :
        [{t:'South, to the wash.', onward:true, go:()=>{ startExplore('b9_c5_wash'); if (!S.f.b9_c5_washSeen) talk('b9_c5_wash_arrive'); }},
         {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== the dry wash ======== */
    b9_c5_wash_arrive:()=>({sp:'A dry wash', scene:'b9_c5_wash', fx:()=>{ S.f.b9_c5_washSeen = 1; }, again:()=>'The dry wash, its sandy bed, the wreck in it, the shade under the south bank.', txt:
`The wash is a long cut in the plain, steep banks of grey stone and dust, a bed of pale sand at the bottom with old tide-lines of grit where water ran once, in some year that had rain in it.

There is a sutler's cart in the bed of it, on its side, one wheel off and lying flat. Up the wash beyond it there are dogs at something, which the Third does not go and look at.${b95Say({tegra:`\n\nTegra goes down the bank first, sideways, in a little slide of dust, and walks straight to a place in the bed where the sand is a shade darker than the rest. She kneels and puts her palm flat on it. "Here," she says. "Down an arm. Maybe two."`, _:`\n\nThe guide goes down the bank first, sideways, in a little slide of dust, and walks to a place in the bed where the sand is a shade darker, and kneels, and puts her palm flat on it. "Here," she says. "Down an arm."`})}

Thallo's heavy puts the yoke of skins down, and looks at the cart, and then at you. "That's Harro's dead man," he says. "I suppose."`,
      ch:[{t:'The water first.', go:'b9_c5_dig'},
          {t:'The wreck.', go:'b9_c5_wreck'},
          {t:'Look the wash over.', go:()=>startExplore()}]}),
    b9_c5_skins:()=>({sp:'Thallo\'s heavy', scene:'b9_c5_wash', txt: b95Key() === 'keep' ?
`Thallo's heavy is sitting on his yoke of full skins, chewing. "Didn't see anything," he says, before you ask. "Not a thing." He swallows. "Good, whatever it was I didn't see."` : b95Key() === 'share' ?
`Thallo's heavy is lashing the cache's sacks onto his yoke beside the skins, carefully, as if they were sharpers. "Company's going to like you," he says. "Tonight, anyway."` : S.f.b9_c5_dug ?
`Thallo's heavy is filling skins from the hole, one at a time, slowly, holding each one up to the light afterwards as if he could see through the leather.` :
`Thallo's heavy is waiting with the empty skins, patiently, in the way of heavies.`,
      ch:[{t:'Back to the wash.', go:()=>startExplore()}]}),

    /* Tegra's dig: water under the sand (a rations check: water matters here) */
    b9_c5_dig:()=>({sp:'The dig', scene:'b9_c5_wash', again:()=> S.f.b9_c5_dug ? 'The hole in the wash\'s bed, water standing in the bottom of it.' : 'The dark patch in the sand.', txt: S.f.b9_c5_dug ?
`The hole in the bed of the wash, ${S.f.b9_c5_dug === 'ok' ? 'with grey water standing in the bottom of it, slowly filling again as it is drawn.' : 'muddy at the bottom, giving up a cup at a time.'}` :
`The dark patch in the sand is cooler than the rest, under the hand. ${b95GuideC()} draws a circle round it with a finger. "Dig here," she says. "Not too wide. The sides fall in. Not too fast. The water comes up slow, or it does not come." She sits back on her heels. "Wrong, and you get mud. Right, and you fill your skins."`,
      ch: S.f.b9_c5_dug ? [{t:'Back to the wash.', go:()=>startExplore()}] :
        [{t:'Dig it the way she says: narrow, slow, and wait for it.', check:['wits', 17], rations:true, req:()=>!S.f.b9_c5_digTried, fx:()=>{ S.f.b9_c5_digTried = 1; },
            edges:id=>[id === 'tegra' && ['the plains are hers, and so is the water under them', 2], id === 'wenna' && ['she knows where water goes', 2], id === 'haddat' && ['a water-seller\'s daughter knows a seep', 1], id === 'doss' && ['he dug wells on the holding', 1], id === 'orvas' && ['the Khundryl dig for water in a dry year', 1], id === 'brask' && ['he digs like a heavy, wide and fast', -1], id === 'ottar' && ['he digs like a Perish, deeper than asked', -1]],
            near:{t:()=>`Yes, but the bank comes down on ${b95Nm(b95Who())} at the end, a slide of dust and stone, and ${b95Nm(b95Who())} ${b95V(b95Who(), 'come', 'comes')} out of it grey and bruised.`, fx:()=>bruise(b95Who(), bruiseN())},
            go:'b9_c5_dig_ok', fail:'b9_c5_dig_no'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_dig_ok:()=>({sp:'The dig', scene:'b9_c5_wash', fx:()=>{ S.f.b9_c5_dug = 'ok'; b95L('tegra', 1); if (!S.f.b9_c5_axe) { S.f.b9_c5_axe = 1; gain('b9_c5_barghastaxe'); } }, txt:
`It takes most of an hour. Down an arm, narrow, and the sand going from pale to dark to wet, and then nothing, and then, after a long wait with everybody watching, a grey shine in the bottom that grows, slowly, into a hand's depth of water.

It tastes of stone and of something older. Boiled, it will do. The heavy fills every skin on his yoke, one after another, and the hole fills again behind each.

${b95GuideC()} watches the last skin tied off and nods, satisfied, as at a thing done properly. Then she pulls one of the two axes out of her belt and holds it out, haft first. "A guide carries a spare," she says, "for whoever carries her water." ${b95TIn() ? 'She looks round the squad. "That is all of you, now."' : 'She shrugs. "You carried it."'}`,
      ch:[{t:'Back to the wash.', go:()=>startExplore()}]}),
    b9_c5_dig_no:()=>({sp:'The dig', scene:'b9_c5_wash', fx:()=>{ S.f.b9_c5_dug = 'tried'; if (!S.f.b9_c5_axe) { S.f.b9_c5_axe = 1; gain('b9_c5_barghastaxe'); } }, txt:
`It goes wrong. The hole goes too wide, and the sides come in, and what comes up in the bottom is mud, and then wetter mud, and in the end a cup of brown water at a time, which the heavy squeezes into the skins through a cloth, patiently, for most of the afternoon.

${b95GuideC()} does not say anything about it. She takes over the last of it herself, with her hands, and gets another skin out of it that nobody else could. Then she pulls one of the two axes out of her belt and holds it out, haft first. "A guide carries a spare," she says. "For whoever carries her water." She looks at the mud. "Carry it better next time."`,
      ch:[{t:'Back to the wash.', go:()=>startExplore()}]}),

    /* the dogs up the wash: optional */
    b9_c5_dogs:()=>({sp:'Up the wash', scene:'b9_c5_wash', txt:
`Up the wash past the wreck there are four dogs, big and lean and grey as the grass, at what is left of a mule in the traces of a broken cart-pole. They have had the wash to themselves. They lift their heads at the Third, and do not go.${b95If('wenna', `\n\nWenna is looking at the tracks in the sand. "Same pack as the road east, maybe," she says. "Following the column. Living on what it leaves."`)}`,
      ch:[{t:'"Third, with me." Clear them out of the wash.', go:()=>startBattle('b9_c5_dogs', {})},
          {t:'Stones and noise. Drive them up the wash and out.', check:['might', 17],
            edges:id=>[id === 'brask' && ['a heavy in scale makes a wall of noise', 2], id === 'tegra' && ['she throws a stone like an axe', 2], id === 'haddat' && ['the blue shield and a shout', 1], id === 'doss' && ['he kept dogs off the holding\'s goats', 1], id === 'marrow' && ['she is too old to run at dogs, child', -2], id === 'mehet' && ['he was bitten once, as a boy, and remembers', -1]],
            near:{t:()=>`Yes, but the biggest stands its ground long enough to open ${b95Nm(b95Who())} up along the shin before it goes. ${b95Nmc(b95Who())}'ll feel it in the next fight.`, fx:()=>bruise(b95Who(), bruiseN())},
            go:'b9_c5_dogs_gone', fail:'b9_c5_dogs_seen'},
          {t:'Leave them the mule. Keep to this end of the wash.', fx:()=>{ S.f.b9_c5_dogsDone = 'left'; }, go:'b9_c5_dogs_left'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_dogs_gone:()=>({sp:'Up the wash', scene:'b9_c5_wash', fx:()=>{ S.f.b9_c5_dogsDone = 'driven'; }, txt:
`Stones, and shouting, and shields banged, and the dogs think about it and then go, up the wash and over the lip, one after another, in no hurry, looking back.

They will be behind the column tonight. But the wash is the Third's.`,
      ch:[{t:'Back to the wash.', go:()=>startExplore()}]}),
    b9_c5_dogs_seen:()=>({sp:'Up the wash', scene:'b9_c5_wash', txt:
`The stones do not impress them. The biggest lowers its head, and the others come round to either side of it in the sand, as a pack does when it has decided the ground is worth it.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c5_dogs', {surprise:'e'})}]}),
    b9_c5_dogs_left:()=>({sp:'Up the wash', scene:'b9_c5_wash', txt:
`The Third keeps to its own end of the wash and lets the dogs keep theirs. They watch, and eat, and watch. It is an arrangement. Nobody on either side trusts it.`,
      ch:[{t:'Back to the wash.', go:()=>startExplore()}]}),
    b9_c5_dogs_after:()=>({sp:'Up the wash', scene:'b9_c5_wash', fx:()=>{ S.f.b9_c5_dogsDone = 'fought'; }, txt:
`The wash is quiet. Up past the wreck the flies have it to themselves now.

${b95Say({brask:`Brask drags the dogs up over the lip of the wash, one at a time, by their hind legs. "Others'll eat these," he says. "Better than our water."`, tegra:`Tegra looks at the dogs for a while. "Thin," she says. "Everything out here is thin." It is not a complaint. It is a warning.`, _:'The Third goes back down the wash to the water and sits, for a moment, before anyone moves.'})}`,
      ch:[{t:'Back to the wash.', go:()=>startExplore()}]}),

    /* the wreck: the dead sutler's cart, and the floor Harro talked about */
    b9_c5_wreck:()=>{ if (b95CacheDone() && !b95Key()) return DLG.b9_c5_key();
      return {sp:'The wreck', scene:'b9_c5_wash', again:()=>'The sutler\'s cart on its side in the sand.', txt: b95CacheDone() ?
`The sutler's cart on its side in the sand, its floor pried up and empty now. ${b95Key() === 'share' ? 'The cache is on the heavy\'s yoke, for the company.' : 'The cache is in the Third\'s packs.'}` : S.f.b9_c5_searched ?
`The sutler's cart, gone over. ${b95Found() ? 'Under the driver\'s box, the false floor, lifted.' : 'Nothing found.'} And on the lip of the wash, men.` :
`It is a sutler's mule-cart, light and old, painted once in Kartool blue. It went down the bank too fast, by the marks, and over, and the near wheel came off and the axle with it. The load is strewn in the sand: a bolt of needles in oilcloth, a crock of salt, broken jugs of something that smelled of wine and now smells of nothing. Whatever there was to eat on top is gone. The dogs, or the sun, or both.

The driver's box is still on, and still shut.`,
        ch: S.f.b9_c5_searched ? (b95CacheDone() ? [{t:'Back to the wash.', go:()=>startExplore()}] : [{t:'The men on the lip.', go:'b9_c5_comers'}, {t:'Back to the wash.', go:()=>startExplore()}]) :
          [{t:'Go over it for the floor Harro talked about.', check:['wits', 17], req:()=>!S.f.b9_c5_searched, fx:()=>{ S.f.b9_c5_searched = 1; },
              edges:id=>[id === 'mehet' && ['he grew up finding what people hid', 2], id === 'tangle' && ['a sapper knows a false bottom when he sounds one', 1], id === 'doss' && ['the holdings hid seed grain from the clerk', 1], S.f.b9_c5_harroWash && ['Harro said under the floor', 1], id === 'brask' && ['he looks for it with the sword hilt', -1], id === 'ottar' && ['the Perish keep nothing under the floor', -1]],
              near:{t:()=>`Yes, but the box's lid comes up on a nail, and the nail goes into ${b95Nm(b95Who())}: a bad hand for the next fight.`, fx:()=>bruise(b95Who(), bruiseN())},
              go:'b9_c5_search_ok', fail:'b9_c5_search_no'},
           {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c5_search_ok:()=>({sp:'The wreck', scene:'b9_c5_wash', fx:()=>{ S.f.b9_c5_found = 1; }, txt:
`Under the driver's box, where a man sits all day and nobody else ever looks, the floor sounds wrong. It comes up in one piece with a knife-blade under the edge: a false floor, very well made, oiled against the wet, and under it a space a hand deep and the length of the cart, packed tight.

Sacks. Oiled cloth. A crock with its lid waxed down. The smell of salt pork comes up out of it, and every head in the wash turns at once.

Then the heavy says, "Sergeant," very quietly, and looks up. On the north lip of the wash, against the sky, there are men.`,
      ch:[{t:'The men on the lip.', go:'b9_c5_comers'}]}),
    b9_c5_search_no:()=>({sp:'The wreck', scene:'b9_c5_wash', txt:
`The box is empty. The load is strewn. The squad goes over the cart twice, sounding the boards, and finds nothing but a cart.

Then the heavy says, "Sergeant," very quietly, and looks up. On the north lip of the wash, against the sky, there are men, and one of them has a pry-bar, and is looking at the cart as if he knew exactly where on it to use it.`,
      ch:[{t:'The men on the lip.', go:'b9_c5_comers'}]}),

    /* the shade under the south bank: the sutler */
    b9_c5_shade:()=>({sp:'The shade under the bank', scene:'b9_c5_wash', again:()=> S.f.b9_c5_cairn ? 'A small cairn of stones in the shade under the south bank.' : 'The shade under the south bank, and the man sitting in it.', txt: S.f.b9_c5_cairn ?
`A small cairn of grey stones in the shade under the bank, with a sutler's wide hat on top of it, weighed down with a stone.` :
`Under the south bank, where the afternoon shade falls, a man is sitting with his back against the stone and his hat tipped down over his face, as if he were asleep. He has been asleep a while. An old man, in a sutler's coat. An empty skin across his knees.

${b95Say({tegra:`Tegra squats beside him and does not touch him. "He sat down out of the sun," she says. "Out here, you sit down, you get up again, or you do not." She looks at the skin. "He did not."`, haddat:`Haddat kneels beside him and says the word she says for the dead she has no name for.`, _:'The heavy takes his helmet off, and stands a moment, and puts it back on.'})}`,
      ch: S.f.b9_c5_cairn ? [{t:'Back to the wash.', go:()=>startExplore()}] :
        [{t:'Stones over him, before the dogs. It won\'t take long.', fx:()=>{ S.f.b9_c5_cairn = 1; b95L('haddat', 1); }, go:'b9_c5_cairn'},
         {t:'Leave him. The column won\'t wait.', go:()=>startExplore()}]}),
    b9_c5_cairn:()=>({sp:'The shade under the bank', scene:'b9_c5_wash', txt:
`It does not take long. There are stones enough in the wash for a great many cairns. The squad builds the cairn up about him where he sits, and puts his hat on top, and a stone on the hat.${b95If('haddat', `\n\nHaddat says the word, and then, because she does not know his name, she says "Kartool", which is all anyone knows of him.`)}${b95If('tegra', `\n\nTegra watches the cairn go up with a face that does not give much away. "My people leave them on the ground," she says. "For the sky." She puts a pebble on the top anyway, beside the hat.`)}`,
      ch:[{t:'Back to the wash.', go:()=>startExplore()}]}),

    /* the deserters after the cache */
    b9_c5_comers:()=>({sp:'The lip of the wash', scene:'b9_c5_wash', txt:
`Four of them, on the north lip, against the sky: two in Letherii army coats with the badges cut off, two in riders' leathers with their faces wrapped. Behind them, a fifth in an officer's coat, also without badges, with a pry-bar in his hand. They have walked a long way from wherever they deserted, on Harro's word, carried down the column at somebody's fire.

They look at the cart, and at the Third, and at the full skins on the heavy's yoke, and they work out that there are more of them than there is cover in the wash to hide behind, and that it does not matter.${b95If('tegra', `\n\nTegra's hand is on an axe. "They are hungrier than you," she says. "That makes them brave."`)}${b95If('brask', `\n\nBrask has stepped in front of the cart without being told. "Nobody leaves with the floor," he says, to nobody in particular.`)}`,
      ch:[{t:'"Come down and get it, then." Straight at them.', go:()=>startBattle('b9_c5_cache', {})},
          {t:'Down behind the wreck. Let them come to the cart.', check:['guile', 17],
            edges:id=>[id === 'sathi' && ['she lay in wait for Odhan riders with the Weasels', 2], id === 'tegra' && ['on the plains, standing still is a way of hiding', 2], id === 'mehet' && ['he grew up keeping out of sight', 1], id === 'wenna' && ['she reads the ground before she puts a foot on it', 1], id === 'brask' && ['heavy scale behind a cart is still heavy scale', -1], id === 'ottar' && ['grey plate in a white wash is a beacon', -2]],
            near:{t:()=>`Yes, but ${b95Nm(b95Who())} ${b95V(b95Who(), 'go', 'goes')} down behind the cart onto the broken jugs, and ${b95V(b95Who(), 'feel', 'feels')} it the whole fight.`, fx:()=>bruise(b95Who(), bruiseN())},
            go:()=>startBattle('b9_c5_cache', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c5_comers_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_comers_seen:()=>({sp:'The lip of the wash', scene:'b9_c5_wash', txt:
`A stone goes from under somebody's boot behind the cart and skitters down the sand, and every head on the lip turns at once, and then they come down the bank in a slide of dust with blades out and nothing to lose.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c5_cache', {surprise:'e'})}]}),
    b9_c5_cache_after:()=>({sp:'The wreck', scene:'b9_c5_wash', fx:()=>{ S.f.b9_c5_cacheDone = 1; if (!S.f.b9_c5_found) S.f.b9_c5_found = 1; if (!S.f.b9_c5_pack) { S.f.b9_c5_pack = 1; gain('b9_c5_sutlerspack'); } }, txt:
`The wash is quiet. The officer lies by the cart with his pry-bar under him. It was not much of a plan, his, and it was the only one.

${b95Found() ? 'The cache is still in the cart, under the driver\'s box: a false floor a hand deep, packed tight.' : 'His pry-bar finds what the squad did not. Under the driver\'s box, where a man sits all day and nobody else looks, the floor comes up in one piece: a false floor a hand deep, packed tight.'} Salt pork in a waxed crock. Hard biscuit in oiled sacks, a great deal of it. Dried figs. A skin of wine that did not break. And a sutler's canvas pack, oiled, with pockets inside pockets, which comes out first and goes onto ${b9In('mehet') ? 'Mehet\'s' : 'the nearest'} shoulder as if it had always been there.${b95Say({haddat:`\n\nHaddat kneels by each of the dead, as she does by every dead soldier, and says the word. They were soldiers once, and hungry, and a long way from home.`, brask:`\n\nBrask stands over the officer with the heavy sword point down in the sand. "Should've stayed in the column," he says. "Half a biscuit. Better than this." He does not sound pleased to be right.`, _:''})}

The heavy looks at the cache, and at the full skins, and at you. He waits.`,
      ch:[{t:'The cache.', go:'b9_c5_key'},
          {t:'Back to the wash.', go:()=>startExplore()}]}),

    /* the key: the cache */
    b9_c5_key:()=>({sp:'The cache', scene:'b9_c5_wash', html:rationsHTML(), again:()=>'The dead sutler\'s cache in the floor of the wreck, and the question of whose it is.', txt:
`It is more food than the Third has seen in one place since the Wastes' edge. Not a feast. Enough. Enough for the squad to eat full rations for days, or for the company's pot to be thicker for two nights.

It is nobody's. The man who packed it is under a hat in the shade. The men who wanted it are lying in the sand. The column does not know it is here, except for whoever heard Harro, and those are lying in the sand too.

${b95Say({haddat:`Haddat is looking at the crock of pork. "My mother said," she begins, and stops. "My mother was never this hungry." She looks at you. "She would still have shared it." She means it, and she is hungry, and both are plain on her face.`, _:'The squad looks at the cache, and then at you.'})}${b95If('brask', `\n\nBrask is looking north, toward the column. "Heavies at the next fire have had half a biscuit two days," he says. "Same as us." He waits. "Your call, Sergeant."`)}${b95If('tegra', `\n\nTegra is sitting on her heels by the cart. "On the plains," she says, "what the hunter finds, the hunter's fire eats first." She shrugs. "Then the clan, if there is more." She looks at the cache. "There is not more. There is this."`)}${b95If('tangle', `\n\nTangle has already counted it. "Squad, full rations, six days," he says. "Company's pot, two nights, a bit thicker." He looks at the heavy. "Just saying it."`)}

Thallo's heavy keeps his mouth shut. He is a heavy. He waits to be pointed.`,
      ch:[{t:'"The company\'s pot. Everybody\'s on half a biscuit. Everybody eats."', fx:()=>{ S.f.b9_c5_key = 'share'; S.f.b9_c5_shared = 1; b95L('brask', 1); b95L('haddat', 1); }, go:'b9_c5_key_share'},
          {t:'"It\'s ours. We found it, we fought for it. The Third eats."', fx:()=>{ S.f.b9_c5_key = 'keep'; b95L('tegra', 1); b95L('haddat', -1); }, go:'b9_c5_key_keep'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b9_c5_key_share:()=>({sp:'The cache', scene:'b9_c5_wash', html:rationsHTML(), txt:
`The heavy nods once, as if a sum had come out, and starts lashing the sacks onto his yoke beside the skins.

It all goes: the pork, the biscuit, the figs, the wine. It goes up out of the wash on the heavy's shoulders and the Third's, and back across an hour of plain to the column, and to the company's ration wagon, where the clerk looks at it as if it had fallen out of the sky, and writes it down, twice.${b95If('haddat', `\n\nHaddat carries the crock of pork herself, both arms round it, all the way.`)}${b95If('brask', `\n\nBrask carries the heaviest sack and puts it down at the wagon's tailboard in front of the clerk. "From the Third," he says, so the clerk will write that down too.`)}${b95If('tegra', `\n\nTegra watches it go into the wagon with her head on one side. "Malazans," she says. It is not quite a complaint.`)}`,
      ch:[{t:'Back to the column. The camp at dusk.', onward:true, go:'b9_c5_wash_back'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_key_keep:()=>({sp:'The cache', scene:'b9_c5_wash', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c5_kept) { S.f.b9_c5_kept = 1; b9Ration(2, 'what the squad kept'); } }, txt:
`The Third shares it out into its own packs, there in the wash, with the heavy watching: the pork, the biscuit, the figs, the wine, a portion each, and a portion pressed on the heavy, who looks at it a moment and then puts it inside his shirt without a word.

"Didn't see anything," he says. "Not a thing."${b95If('tegra', `\n\nTegra takes her portion and nods, once, as at a thing done properly. "Your fire eats," she says. "Good." She means it.`)}${b95If('haddat', `\n\nHaddat takes her portion and puts it in her pack and does not eat any of it, then or later, and does not say why. She does not need to.`)}${b95If('brask', `\n\nBrask takes his portion and weighs it in his hand. "Old squad would've," he says. He puts it away.`)}`,
      ch:[{t:'Back to the column. The camp at dusk.', onward:true, go:'b9_c5_wash_back'},
          {t:'Not now.', go:()=>startExplore()}]}),
    /* out of the wash: back to the halt, or (the key made) on to the camp at dusk */
    b9_c5_wash_back:()=>({sp:'Out of the wash', scene:'b9_c5_wash', txt: b95Key() ?
`Up the bank, out of the wash, and north across an hour of plain with the full skins and ${b95Key() === 'share' ? 'the company\'s cache' : 'the Third\'s packs heavier'}, after the column, which has walked on through the afternoon and is making camp at dusk on bare ground a league further east, much like the last.` :
`Up the bank, back to the halt. ${b95CacheDone() ? 'The cache is still in the wreck.' : 'The wash, behind, with its wreck and its water.'}`,
      ch: b95Key() ? [{t:'The camp, at dusk.', onward:true, fx:()=>{ S.f.b9_c5_ph = 3; }, go:()=>{ startExplore('b9_c5_camp'); talk('b9_c5_camp2_arrive'); }},
                      {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the halt.', go:()=>{ startExplore('b9_c5_plain'); }},
         {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 3: the second night's camp ======== */
    b9_c5_camp2_arrive:()=>({sp:'The column\'s camp', scene:'b9_wastes_night', again:()=>'The second night\'s camp, the dung-fires low under the stars.', txt:
`The second night's camp is the first night's, a league on: the same tents in their rows, the same wagons drawn in with sentries on the tailboards, the same dung-fires burning low under too many stars.

${b95Key() === 'share' ? `At the company's fire the pot is thicker tonight, and smells of pork, and the heavies queuing at it with their bowls look round for the Third as it comes in, and one of them raises his cup, and then the rest do. The cups have water in them. It is the thought.` : `The Third eats at its own fire, with its back to the next one, out of its own packs. The pork is very good. The heavies at the next fire are eating half a biscuit and what the pot holds, and do not look over, and do not need to.`}

Thallo comes to the fire after dark and sits down without being asked.`,
      ch:[{t:'Thallo.', go:'b9_c5_thallo3'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b9_c5_thallo3:()=>({sp:'Thallo', scene:'b9_wastes_night', fx:()=>{ S.f.b9_c5_orders3 = 1; }, again:()=>'Thallo, at the fire, with his hands to it.', txt: b95Key() === 'share' ?
`"Captain says thank you," Thallo says. He seems to find it as strange as Brask would. "He said the Third's name to the clerk, so the clerk would write it down. He said it twice." He holds his hands to the fire. "Company's eating tonight. Two nights. Then it's half a biscuit again." He shrugs. "Two nights is two nights."

"Heard them at the next fire," he says. "Saying the thing the old hands say. Our own witness." He looks into the fire. "First time I've heard it said like they meant it."` :
`Thallo holds his hands to the fire and looks at it, not at you. "My heavy says he didn't see anything down that wash," he says. "He was very sure about it." He sniffs, once. "Smells of pork, this fire."

"I didn't see anything either." He is quiet a while. "Company's on half a biscuit. Same as yesterday." He gets up. "Heard them at the next fire saying the thing the old hands say. Our own witness." He looks down at the Third. "Didn't sound like they meant you."`,
      ch:[{t:'"What are we marching for, out here?" Ask the squad.', req:()=>!(S.b9 && S.b9.wit && S.b9.wit.c5), go:'b9_c5_witness'},
          {t:'Back to the fire.', go:'b9_c5_fire'},
          {t:'Not now.', go:()=>startExplore()}]}),
    /* the Witness beat: the dung-fire under the stars, on short rations */
    b9_c5_witness:()=>({sp:'The Third\'s fire', scene:'b9_wastes_night', html:rationsHTML(), fx:()=>{ S.f.b9_c5_wordHeard = 1; }, txt:
`At the next fire somebody says it, loud enough to carry, half as a joke and half not: <em>we shall be our own witness</em>. A laugh goes round that fire, and stops.

The Third's fire is quiet a while after.

${b95Say({haddat:`Haddat is looking into the dung-fire. "My mother said a soldier marches for the ones beside her," she says. "On the road, I believed it." She looks up. "I still believe it. It is harder out here."`, tangle:`Tangle is turning his empty cup in his hands. "Surviving isn't what this is about," he says. "That's what they said, on the road. The marines." He looks at the cup. "Then what is it about. That's what I keep asking."`, _:'The squad looks at the fire, and then at you.'})}${b95If('tegra', `\n\nTegra is watching the Malazans with a stranger's interest. "Barghast march for the ancestors," she says. "The dead watch. You do not have to say anything." She looks round the fire. "You have no dead watching?"`)}${b95If('brask', `\n\nBrask grunts. "Old squad's dead," he says. "They're watching, if anybody is."`)}

So you ask. What is the Third marching for, out here, deep in the Wastes, on half a biscuit and water by the cup, with nobody saying where?`,
      ch:[{t:'"Our own witness. Nobody else is coming to watch. So we watch each other, and that\'s enough."', fx:()=>{ b9Wit('kept', 'our own witness'); S.f.b9_c5_wit = 'own'; }, go:'b9_c5_wit_done'},
          {t:'"Each other. Same as on the road. That hasn\'t changed."', fx:()=>{ b9Wit('kept', 'each other, still'); S.f.b9_c5_wit = 'each'; }, go:'b9_c5_wit_done'},
          {t:'"Nothing. We march for nothing. I\'ll say it out loud, so nobody has to pretend."', fx:()=>{ b9Wit('doubt', 'for nothing, said out loud'); S.f.b9_c5_wit = 'nothing'; }, go:'b9_c5_wit_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c5_wit_done:()=>{ const w = S.f.b9_c5_wit;
      return {sp:'The Third\'s fire', scene:'b9_wastes_night', html:rationsHTML(), txt: w === 'own' ?
`It sits in the fire a while. Then ${b95Say({haddat:'Haddat', marrow:'Marrow', brask:'Brask', _:'somebody'})} says it back, quietly, the way the old marine said to: <em>our own witness</em>. And then the next one does, round the fire, not loud.

${b95Say({haddat:`Haddat nods, slowly. "Then I will watch," she says. "I am good at watching. I say the names every night." She looks round. "I will say yours."`, marrow:`Marrow opens her eyes. "Soliel has seen worse fires than this, child," she says. "But not many with so many witnesses." She closes them again.`, _:'The squad looks at itself round the fire, as if to check the count.'})}${b95If('tegra', `\n\nTegra watches it go round with her head on one side. "Strange," she says. "Your own dead are not enough, so you do it yourselves." She thinks. "Good. I will watch too, then."`)}` : w === 'each' ?
`It sits in the fire a while. It is the answer from the road, and it holds, out here, a little thinner.

${b95Say({tangle:`Tangle grunts. "I can count that," he says. "Still countable." He looks round the fire. "Just."`, haddat:`Haddat nods. "Then it is enough," she says. "It was enough on the road. The road was easier, that is all."`, _:'The squad does not argue with it.'})}${b95If('brask', `\n\nBrask looks round the fire at each of them, slowly, as heavies look at a wall. "That'll do," he says. "For now."`)}${b95If('tegra', `\n\nTegra nods. "A clan," she says. "A small one." She seems to approve.`)}` :
`It sits in the fire a while. It is the truest thing anybody has said all day, and it is very cold.

${b95Say({tangle:`Tangle nods slowly. "That's honest," he says. "Hungry and honest." He goes on turning his empty cup.`, haddat:`Haddat looks at you a long while across the fire. "I heard you," she says at last. "I do not agree." She says the names of the dead under her breath, the whole list. "But I heard you."`, _:'The squad looks at the fire, and no one calls it wrong.'})}${b95If('brask', `\n\nBrask shrugs. "Old squad marched for nothing," he says. "Most days." He pokes the fire. "Most days it was enough."`)}${b95If('tegra', `\n\nTegra looks at you with something like respect. "On the plains," she says, "you say the bad thing out loud, so it cannot creep up on you." She nods. "Now it cannot."`)}`,
        ch:[{t:'Back to the fire.', go:'b9_c5_fire'}]}; },

    /* ======== the end: first light, and dust on the horizon (the far dust, once) ======== */
    b9_c5_onward:()=>({sp:'First light', scene:'b9_dust', html:rationsHTML(), fx:()=>{ S.f.b9_c5_dust = 1; }, txt:
`First light, grey and then pale gold over a plain with nothing on it, and the drums, and the column getting up off the bare ground and forming on its track, file after file, wagon after wagon, with its own dust going up over it as soon as the first boots move.

${b95Key() === 'keep' ? 'The Third forms with its packs heavier and its belts a hole looser than the files on either side, and nobody in those files says anything about it, and nobody needs to.' : 'The Third forms with the rest of the company, on half a biscuit again, and the heavies in the next file nod to it as it comes into line.'}

${b95Say({tegra:`Tegra is not in the file yet. She is standing a little apart on a back of stone with her face to the south-east, very still, the way she stands when the ground is telling her something. "Look," she says, when you come up. Far out, at the very bottom of the sky, there is a low brown smear along the horizon, like a long smudge of dust. Not the column's. The column's dust is here, over the column. "Wind," Tegra says. She watches it a while longer. "Maybe." She does not think so, and she does not say what she thinks instead.`, haddat:`Haddat is standing a little apart with her face to the south-east. "Look," she says, when you come up. Far out, at the very bottom of the sky, there is a low brown smear along the horizon, like a long smudge of dust. Not the column's. The column's dust is here, over the column. "Wind," Haddat says. "My mother said the Pan'potsun raised dust like that." She watches it a while. "Before a storm."`, _:`A heavy in the next file is standing still with his face to the south-east. "Sergeant," he says. Far out, at the very bottom of the sky, there is a low brown smear along the horizon, like a long smudge of dust. Not the column's. The column's dust is here, over the column. "Wind," the heavy says. He watches it a while. "Wind, likely." He goes back into his file.`})}

The drums go again. The column moves, east, and the smear on the horizon stays where it is, low and brown and patient, and after a while the column's own dust is too thick to see it through.`,
      ch:[{t:'East.', onward:true, go:()=>chapterEnd(5, b95Key() || 'share')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
