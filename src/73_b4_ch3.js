/* ============ Book Four, Chapter 3: The Burned Tears ============ */
/* Days north of Aren, on the road north to Vathar Crossing (House of Chains, ch 15; never "the Vathar Hills": Q19, Oct 27). Dust and riders on the ridges, about three thousand, shadowing the
   Fourteenth; a marine squad of the 8th goes out to look (never the squad). The raiders who have harried the column are driven onto the
   9th's flank picket by riders nobody has seen yet, and the riders come over the ridge: Gall's Khundryl Burned Tears. Gall kneels to
   Temul (heard), the broken sword carried past (seen), the Khundryl taken into the Crow Clan. The feast: the army drunk, the shamans'
   "a long but restless life", a brawl at the edge of the fires, and Orvas, a young Burned Tear, at the Third's fire. Then Vathar
   Crossing, choked with the bones of the Day of Pure Blood and the tribes' offerings on poles, the Third's worst day. Key
   (S.f.b4_c3_key): 'carry' (the squad wades its own stretch the night before the sappers' work and carries out what bones it can reach;
   no rest; river scavengers come for the iron, in the shallows) or 'blow' (let the munitions take it; the army crosses dry; that night a
   river band comes to the poles on the far bank). Either way the marine squad that blew it crosses first and the Third after. From the
   butte: Ubaryd retaken by Nok's ships, and the Whirlwind on the horizon. Notes for later chapters: docs/hoc-ch3-notes.md. */
/* FOR THE ARTIST (73b): names this file uses.
   Items: ART['item/b4_c3_khundrylknife'], ['item/b4_c3_bonebead'], ['item/b4_c3_cup'], ['item/b4_c3_ferryrope'].
   Figures: b4_c3_khundryl (Burned Tear riders, the shamans, the mourner, Khundryl youths), b4_c3_scavenger (river scavengers, the old
   ferryman), b4_c3_tribesman (river-tribe warriors, the headman). Reused: b4_c1_hollet, b4_c1_radde, b4_c1_recruit, b2soldier, rebel,
   rebel_bow, khundryl_chief (Gall, far off), orvas, wickan. Backdrops (SCENEX): b4_feast (70's, redrawn), b4_c3_shadow, b4_c3_ford,
   b4_c3_butte. Ground (TILEX): b4_c3_hills, b4_c3_ford. */

/* ---- small helpers (b43: Book Four, Chapter Three) ---- */
const b43L = (id, n) => { if (b4In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* Orvas walking with the squad, or waiting near at the Khundryl fires */
const b43ONear = () => !b4In('orvas') && !!(S.f && S.f.b4_orvasDone === 2) && b4CanRecruit('orvas');
const b43OHere = () => b4In('orvas') || b43ONear();
const b43LO = n => { if (!b43OHere()) return; S.loy ??= {}; S.loy.orvas ??= 0; loy('orvas', n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b43Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b4In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* the recruit who walks with the squad (one at a time), and a line for them */
const b43Rec = () => b4In('orvas') ? 'orvas' : b4In('redblade') ? 'redblade' : b4In('warlock') ? 'warlock' : null;
const b43R = m => { const r = b43Rec(), v = r && m[r]; return v ? (typeof v === 'function' ? v() : v) : ''; };
/* Hackle is with the squad: at Sathi's knee, or at the sergeant's if the whistle brought him home in Book Two */
const b43Dog = () => b4In('sathi') || (!!b4Was('b2_hackleBack') && !(S.dead && S.dead.hackle));
const b43New = () => HOC_NEW.filter(id => b4In(id));
/* the Fourteenth's spares (v7.1): a paragraph each for Mirrel, Yorin and Rasp, whichever are with the squad, in that order */
const b43Sp = m => ['mirrel', 'yorin', 'rasp'].filter(id => m[id] && b4In(id)).map(id => typeof m[id] === 'function' ? m[id]() : m[id]).filter(Boolean).map(t => '\n\n' + t).join('');
/* the squad's sapper (Rasp and Tangle are never in one squad): the name for a munitions choice or a battle's opening */
const b43Sap = () => b4In('rasp') ? 'Rasp' : 'Tangle';
const b43HasSap = () => b4In('tangle') || b4In('rasp');
/* the phase: 1 the hills by day, 2 the feast at night, 3 the ford at dusk, 4 the far bank at night (blow), 5 the butte */
const b43Ph = () => S.f.b4_c3_ph || 1;
const b43Key = () => S.f.b4_c3_key || '';
const b43KeyDone = () => !!(S.f.b4_c3_scavDone || S.f.b4_c3_bandDone);
const b43Guard = () => b4Was('b2_c7_key') === 'guard';
const b43Wickans = () => b4Was('b2_c7_key') === 'wickans';
/* what the Vathar kept of the squad's stretch: the transfer's count, or Book Two's usual on a fresh start (never a number then) */
const b43Lost = () => { if (b4Fresh()) return 'The ford kept a third of the squad\'s stretch.'; const n = b4Was('b2_vatharLost');
  return n ? `The ford kept ${numw(n)} of the squad's stretch.` : 'The ford kept none of the squad\'s stretch that anybody found, and took the rest of the Chain in handfuls all round it.'; };
/* the chapter's one quiet line for the Barrow dead (one of them), at the ford */
const b43Barrow = () => { const f = b4Fallen(); if (!f.length) return ''; const id = f[0];
  return ({sathi:`Sathi crossed here on a borrowed horse with her knees up out of the water, laughing at it, and Hackle swimming behind her with his nose up. She is on the Barrow now. ${b43Dog() ? 'Hackle came home.' : 'Hackle was not seen again.'}`,
    haddat:'Haddat said the names here, the first time, standing in the river to the waist. She is on the Barrow now, and nobody else knows all of them.',
    tangle:'Tangle counted the satchel here with the water at his chest, holding it over his head, out loud, all the way across. He is on the Barrow now.',
    marrow:'Marrow stood in the shallows here with her sleeves rolled and put her hands on everybody who came past her, one after the other, until the light went. She is on the Barrow now.'})[id] || `${TPL[id].name} crossed here. ${TPL[id].name} is on the Barrow now.`; };
/* the old ferry rope: once a chapter, +1 to a check while it is in the kit (spent on the roll) */
const b43RopeOk = () => b4On() && (S.kit || []).includes('b4_c3_ferryrope') && !S.f['b4_rope' + (S.chapter || 0)];

/* ---- the ferry rope's +1, named on the check, spent when the dice go ---- */
{ const _ef = edgesFor;
  edgesFor = function(c, id){ const out = _ef(c, id); if (b43RopeOk() && c && c.check) out.push(['the old ferry rope, knotted round a wrist', 1]); return out; }; }
{ const _ck = check;
  check = function(stat, dc, who, c){ const had = !!c && b43RopeOk(); const r = _ck(stat, dc, who, c); if (had) { S.f['b4_rope' + (S.chapter || 0)] = 1; note('The old ferry rope has done its turn for this stretch of the road.'); } return r; }; }

/* ---- the Black Tears: a Khundryl mourning-cry, learned at the feast. Spirit-craft: it never sputters. ---- */
Object.assign(TRICKS, {
  b4_c3_tears:{name:'The Black Tears', ch:3, use:'fight', ab:'t_b4_c3_tears', spirit:true, where:'the Khundryl feast on the road to the Vathar, at an old woman\'s fire',
    lore:'The Burned Tears grieve out loud, all of them at once, and then they laugh, at the same fire. The cry is the first half. An old woman at the feast taught it to the Third because, she said, the Chain had not had anybody to do it for them, and that was a debt too.',
    get fx(){ return `Once a fight: the bearer gives the Burned Tears' mourning-cry. Every enemy within 2 of the bearer is −2 to hit for the rest of the round, and the next squadmate to strike one of them hits +2. Spirit-craft: it never sputters in the dust.`; }},
});
const b43TearsMark = t => !!(B && B.b4tears && t && t.side === 'e' && B.b4tears.marked.includes(t));
Object.assign(AB, {
  t_b4_c3_tears:{name:TRICKS.b4_c3_tears.name, trick:'b4_c3_tears', self:true, spirit:true, desc:()=>TRICKS.b4_c3_tears.fx,
    run(u){ const near = B.units.filter(e => e.side === 'e' && e.hp > 0 && cheb(e, u) <= 2);
      B.b4tears = {u, round:B.round, marked:near.slice(), spent:false}; AUDIO.play('growl');
      near.forEach(e => { float(e, 'the tears', '#c8c0b0'); sparks(e.x, e.y, 6, '#2a2420', .5); }); float(u, 'grieving', '#e8dcc0');
      blog(`${u.name} throws back ${u.id === 'sgt' ? 'their' : 'the'} head and grieves, out loud, the Burned Tears' way: a cry with no words in it that goes on longer than a breath should let it. ${near.length ? `${near.length > 1 ? 'The enemy near' : 'The one nearest'} falter${near.length > 1 ? '' : 's'}, the way you falter at a funeral that is not yours.` : 'There is nobody near enough to hear it but the squad, and the squad hears it.'}`); }},
});
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); const T = b4On() && B && B.b4tears;
    if (T && a && a.side === 'e' && a.hp > 0 && B.round === T.round && T.u && T.u.hp > 0 && cheb(a, T.u) <= 2) c.bonus -= 2;
    if (T && !T.spent && a && a.side === 'p' && !a.ally && b43TearsMark(t)) c.bonus += 2;
    return c; }; }
{ const _attack = attack;
  attack = function(a, t, o = {}){ const T = b4On() && B && B.b4tears, hit = T && !T.spent && a && a.side === 'p' && !a.ally && b43TearsMark(t);
    const r = _attack(a, t, o); if (hit) { T.spent = true; blog(`${a.name} strikes into the grief.`); } return r; }; }
/* the Khundryl riders who come over the ridge in the first fight fight at the squad's level, like the 9th's regulars */
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y);
  if (b4On() && k === 'b4_c3_rider') { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); }
  return u; }; }

/* ---- the words this chapter adds to Book Four's glossary ---- */
GLOSSX.hoc.push(
  [3, 'Vathar Crossing', 'The ford of the Vathar, where the Chain of Dogs crossed under the tribes on the Day of Pure Blood. The Fourteenth found it choked with the dead and hung with the tribes\' offerings, and the marines\' sappers blew it clear.', ()=>!!(S.f && S.f.b4_c3_ford)],
  [3, 'Ubaryd', 'A port of Seven Cities that fell in the rising. From the butte north of the Vathar the Fourteenth saw it taken back, Admiral Nok\'s ships crowded in its harbour.', ()=>!!(S.f && S.f.b4_whirlwindSeen)]);

/* ---- the reading at the feast (the chapter's first halt and its fire) ---- */
B4DECK[3] = {scene:'b4_feast', where:'a pegged hide by a Khundryl fire', set:'Night on the road to the Vathar, the Khundryl grieving and laughing round their fires, and the Fourteenth drunk among them.',
  back:'b4_c3_feast', backT:'Back to the fire.',
  say:{marrow:`"Three thousand of them came to say sorry," Marrow says, "and brought the drink to do it with." She lays the hide flat with the flat of her hand. "Sit, child. One card, for the people who rode away, and the people they rode away from."`,
    tallow:`"My grandmother would have read for them," Tallow says, watching a Khundryl rider weep and laugh at the next fire over. "She read for anybody who'd sit." He shuffles badly, twice. "One card, Sergeant. Before I'm too drunk to hold them."`,
    oldninth:`The old soldier has found the Third by its fire and brought his cup. "Horse people," he says. "Grieve like a funeral and drink like a wedding." He shuffles one-handed. "One card. Then I'm going back for more of whatever that is."`}};

const B4CH3 = {
  title:'The Burned Tears', number:'Three',
  intro:{loc:'The road to the Vathar', sub:'Days north of Aren · the Fourteenth on the march', scene:'b4_c3_shadow', cap:'Dry hills under a white sky, the column a league long in the folds of them, and on the far ridges dust that is not the column\'s.',
    paras:[
`North of Aren the land gets up off the plain and folds itself into hills: dry grass, scree, and red rock standing out of it like the ribs of something. The Fourteenth goes through the folds in a column a league long, eating its own dust, and every night it camps in a different hollow that looks exactly like the last.`,
()=>`You are Sergeant {sgt}, Third squad, 9th Legion. The squad came down out of these hills once before, the other way, with the Chain. At the bottom of them is a river. The Third has not said its name since Aren. ${S.f.b4_news ? 'Since the news from Genabackis went round the camp the recruits have stopped asking the Third questions, which is worse than the questions.' : 'The recruits have stopped asking the Third about the Chain, which is worse than the asking.'}`,
`For three days now there has been dust on the ridges that is not the column's. Riders, the scouts say. Hundreds, maybe more, keeping pace, keeping off. And for longer than that, raiders have been at the column's flanks at dusk, a few wagons at a time, and gone before anybody could get a horse after them.`],
    go:'Into the line', node:'b4_c3_start'},

  areas:[
    /* 16 x 12 (b4_c3_hills, day).  . dry grass  , scree  # rock  W a 9th's wagon  k a cairn on the rise  > east, to the flank picket  < west, the column */
    { id:'b4_c3_hills', title:'The road to the Vathar · the 9th\'s halt', sub:'Midday · the column halted in a fold', hint:'Tap ground to move · tap a figure to talk · the flank picket is east', decor:'b4_c3_hills',
      map:[ "##,,,,##,,,,,,##",
            "#,,,,,,#,,k,,,,#",
            ",,,.,,,,,,,,,,,,",
            "...,,,,..,,,,..,",
            "................",
            "...W....W......>",
            "................",
            ".....,.....,....",
            "...W............",
            "........,......#",
            "<.............##",
            "#,,,,......,,###" ],
      walk:'.,', triggers:{W:'b4_c3_wagon', k:'b4_c3_cairn', '>':'b4_c3_to_flank', '<':'b4_c3_back'}, start:{x:2, y:9},
      quest:()=> !S.f.b4_c3_picket ? 'Sergeant Radde, by the wagons.' : !S.f.b4_c3_raidersDone ? 'The flank picket, east.' : 'The Khundryl are coming in. The fires tonight.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:6, y:6, node:()=>S.f.b4_c3_picket ? 'b4_c3_radde_again' : 'b4_c3_radde', fresh:()=>!S.f.b4_c3_picket},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:10, y:4, node:()=>'b4_c3_hollet', fresh:()=>!S.f.b4_c3_hollet},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:11, y:8, node:()=>S.f.b4_c3_recTold ? 'b4_c3_recruits_again' : 'b4_c3_recruits', fresh:()=>!S.f.b4_c3_recTold},
        {id:'recruit2', name:'A recruit', kind:'b4_c1_recruit', x:12, y:9, node:()=>S.f.b4_c3_recTold ? 'b4_c3_recruits_again' : 'b4_c3_recruits'} ] },

    /* 16 x 12 (b4_c3_hills, night).  . trampled grass  , scree  = tents  F the Third's fire among the Khundryl's  f other fires  h horse lines  > east, toward the river */
    { id:'b4_c3_camp', title:'The road to the Vathar · the Khundryl fires', sub:'Night · the feast', hint:'Tap ground to move · tap a figure to talk · the Third\'s fire is in the middle; the road to the river is east', decor:'b4_c3_hills', dark:true,
      map:[ "################",
            "#hhhh..=.=..hhh#",
            "#......f.......#",
            "#.=..........=.#",
            "#.=...,..,...=.#",
            "#......F.......#",
            "#..f........f..#",
            "#.....,........#",
            "#.=..=....=..=.#",
            "#..............>",
            "#......,.......#",
            "################" ],
      walk:'.,', triggers:{F:'b4_c3_feast', h:'b4_c3_horses', '>':'b4_c3_to_ford'}, start:{x:7, y:9},
      quest:()=> !S.f.b4_c3_brawlDone ? (S.f.b4_c3_brawlNear ? 'The shouting at the 10th\'s fires, east.' : 'The Third\'s fire, and the feast round it.') : 'The road to the river, east, in the morning.',
      npcs:[
        {id:'shaman', name:'Khundryl shamans', kind:'b4_c3_khundryl', x:7, y:3, node:()=>'b4_c3_shaman', fresh:()=>!S.f.b4_c3_shaman},
        {id:'mourner', name:'An old Khundryl woman', kind:'b4_c3_khundryl', x:12, y:7, node:()=>'b4_c3_mourner', fresh:()=>!S.f.b4_c3_tearsTried},
        {id:'orvas', name:'A young Burned Tear', kind:'orvas', x:9, y:5, node:()=>'b4_c3_orvas', show:()=>S.f.b4_orvasDone == null && !b4In('orvas'), fresh:()=>S.f.b4_orvasDone == null},
        {id:'gall', name:'A Khundryl war chief', kind:'b4_c3_warchief', x:4, y:6, node:()=>'b4_c3_gall', show:()=>!S.f.b4_c3_gall, fresh:()=>!S.f.b4_c3_gall},
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:5, y:9, node:()=>'b4_c3_radde_feast', fresh:()=>!S.f.b4_c3_raddeFeast},
        {id:'brawl', name:'Shouting at the 10th\'s fires', kind:'b4_c1_recruit', x:13, y:9, node:()=>'b4_c3_brawl_start', show:()=>!S.f.b4_c3_brawlDone, fresh:()=>!S.f.b4_c3_brawlDone},
        {id:'youths', name:'Wickan youths', kind:'wickan', x:2, y:9, node:()=>'b4_c3_youths', fresh:()=>!S.f.b4_c3_youths} ] },

    /* 16 x 12 (b4_c3_ford, dusk).  . bank  ~ deep water  - shallows  b bone-banks under the water  p offering poles  , reeds  r the old ferry post  < back up the road */
    { id:'b4_c3_ford', title:'Vathar Crossing · the near bank', sub:'Dusk · the army camped above the ford', hint:'Tap ground to move · tap a figure to talk · the 9th\'s stretch of the bank is in front of you', decor:'b4_c3_ford',
      map:[ "~~~~~~~~~~~~~~~~",
            "~~bbbb~~~~~bbbb~",
            "~~------~~~~--~~",
            "~----bbbbb-----~",
            "-----------bb---",
            ",,--,,----,,--,,",
            "..p.....,..p....",
            "....r...........",
            ".......p........",
            "<..........,....",
            "..,.............",
            ",....,......,..," ],
      walk:'.,-', triggers:{p:'b4_c3_poles', b:'b4_c3_bones', r:'b4_c3_rope', '<':'b4_c3_ford_back'}, start:{x:7, y:10},
      quest:()=> !b43Key() ? 'Sergeant Radde, on the 9th\'s stretch of the bank.' : b43Key() === 'carry' ? (S.f.b4_c3_scavDone ? 'Dawn, and the sappers.' : S.f.b4_c3_waded ? 'Something moving in the shallows, downstream.' : 'Into the water, with the squad.') : 'Sleep, and the sappers at dawn.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:8, y:8, node:()=>b43Key() ? 'b4_c3_radde_ford' : 'b4_c3_key', fresh:()=>!b43Key()},
        {id:'sappers', name:'Marines of the 8th, down the bank', kind:'b2soldier', x:14, y:6, node:()=>'b4_c3_sappers', fresh:()=>!S.f.b4_c3_sappers},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:3, y:9, node:()=>'b4_c3_hollet_ford', fresh:()=>!S.f.b4_c3_holletFord},
        {id:'scav', name:'Shapes in the shallows', kind:'b4_c3_scavenger', x:13, y:4, node:()=>'b4_c3_scav_start', show:()=>b43Key() === 'carry' && !!S.f.b4_c3_waded && !S.f.b4_c3_scavDone, fresh:()=>!!S.f.b4_c3_waded && !S.f.b4_c3_scavDone} ] },

    /* 16 x 12 (b4_c3_ford, night: 'blow' only).  # the far bank's lip  . bank  , reeds  p offering poles  F the 9th's fires  - shallows  ~ deep water */
    { id:'b4_c3_farbank', title:'Vathar Crossing · the far bank', sub:'Night · the army across, and dry', hint:'Tap ground to move · tap a figure to talk · the poles are along the bank', decor:'b4_c3_ford', dark:true,
      map:[ "################",
            "#......,....p..#",
            "#.p............#",
            "#.....,...F....#",
            "#..p.........p.#",
            "#......,.......#",
            "#.,............#",
            ",,,,,,,,,,,,,,,,",
            "---------------~",
            "~~~~--~~~~~~~~~~",
            "~~~~~~~~~~~~~~~~",
            "~~~~~~~~~~~~~~~~" ],
      walk:'.,-', triggers:{p:'b4_c3_farpoles', F:'b4_c3_farfire'}, start:{x:7, y:6},
      quest:()=> S.f.b4_c3_bandDone ? 'The fire, and sleep. The butte in the morning.' : 'The poles along the bank. Something is out there.',
      npcs:[
        {id:'band', name:'Men among the poles', kind:'b4_c3_tribesman', x:12, y:2, node:()=>'b4_c3_band', show:()=>!S.f.b4_c3_bandDone, fresh:()=>!S.f.b4_c3_bandDone},
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:9, y:4, node:()=>'b4_c3_radde_far', fresh:()=>!S.f.b4_c3_raddeFar} ] } ],

  battles:{
    /* the 9th's flank picket: the raiders who have harried the column for days, driven down a wash onto the picket by riders nobody has
       seen yet; with the company. The second ground: the wash's mouth, where the riders come over the ridge. */
    b4_c3_raiders:{title:'The flank picket', style:'b4_c3_hills', open:true, warrenText:'The road to the Vathar · the warrens are thin and dry, but they answer', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:["..#..,..",".,....t.","........","..t..,..","........",".,....,.","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c3_raidchief',3,1],['b4_c3_raider',1,2],['b4_c3_raider',6,2],['b4_c3_raidbow',4,0],['b4_c3_raider',5,3]], xp:160, after:'b4_c3_raiders_after',
      waves:[{round:3, foes:[['b4_c3_raider',7,4]], text:'Another comes down the wash at a dead run, looking back over his shoulder at the ridge, not at you.'}],
      preText:()=>`${b43Sap()}'s sharpers go off in the mouth of the wash, two flat cracks, and the raiders coming down it stop being a charge and become men trying to decide which way to die.`,
      stage2:{title:'The wash\'s mouth', xp:80,
        text:()=>`They break back up the wash, the way they came, and stop, because the way they came is full of dust.\n\nRiders come over the ridge above it, out of the dust, a long line of them, at a walk and then not at a walk: horsehide coats, lances with black tails under the blades, braids, and faces with something dark under the eyes, too far to see. They do not shout. They ride the raiders back down the wash onto the 9th's shields as if the picket had been put there for it.${b43Say({haddat:`\n\n"Khundryl," Haddat says. She has seen them come down off ridges before, at Sanimon, in their tens of thousands. "Khundryl," she says again. It is a word she had not expected to use.`, sathi:`\n\n"Horse people," Sathi says, delighted, and then, seeing the faces: "Oh."`, _:''})}${b43R({orvas:`\n\nOrvas lifts his lance to the riders on the ridge, high, and two of them lift theirs back.`})}`,
        map:["#......#","#..t...#","#......#","##....##","#......#","#..,...#","#......#","#......#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        allies:[['b4_c3_rider',1,0],['b4_c3_rider',6,0]],
        foes:[['b4_c3_raidchief',3,4],['b4_c3_raider',1,5],['b4_c3_raider',6,5],['b4_c3_raidbow',4,2]]} },
    /* the feast's edge: drunk recruits of the 9th and the 10th, and Khundryl youths after an insult. Fists, nobody killed, before the Fists see. */
    b4_c3_brawl:{title:'The 10th\'s fires', style:'b4_c3_hills', dark:true, open:true, warrenText:'Night · nobody is using a warren for this', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Fists and staves, nobody killed. Keep the recruits and the Khundryl apart for four rounds, until Radde and the Khundryl elders get there, and before any Fist looks this way.'},
      map:["........","..t..t..","........","...,....","........",".t....t.","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c3_loudmouth',3,1],['b4_c3_drunk',1,2],['b4_c3_drunk',2,3],['b4_c3_youth',6,2],['b4_c3_youth',4,3]], xp:140, after:'b4_c3_brawl_after',
      waves:[{round:2, foes:[['b4_c3_drunk',7,4],['b4_c3_youth',0,4]], text:'A youth comes in from the Khundryl side, and another recruit comes out of the dark at the shouting with a jar in each hand and no idea which side he is on, and picks the wrong one.'}],
      preText:()=>`${b43Sap()}'s smoker goes off between the two crowds, and the grass between them is suddenly full of coughing people who cannot see whom they meant to hit.`},
    /* 'carry': the night in the shallows, river scavengers come for the iron in the bones (buckles, blades, arrowheads). Knee-deep; the
       deep channel takes anybody shoved into it. The second ground: the bone-bank, and the old ferryman who runs them. */
    b4_c3_scavengers:{title:'The shallows', style:'b4_c3_ford', dark:true, open:true, pitTxt:'the deep channel', warrenText:'Night in the Vathar · the warren here is cold, and full', warren:{meanas:1, denul:1}, music:'battle',
      map:["oooooooo","ottt-ooo","-------o","---tt---","--------",",,--,,--","........","..t.....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c3_hook',2,2],['b4_c3_scav',5,2],['b4_c3_scav',1,4],['b4_c3_scavsling',4,1]], xp:160, after:'b4_c3_scav_after',
      waves:[{round:2, foes:[['b4_c3_scav',7,4]], text:'Another comes up out of the water at the side, where nobody was, with a knife in his teeth and a sack on his back that clinks.'}, {round:3, foes:[['b4_c3_hook',0,3]], text:'A boat-hook comes out of the dark on the other side, and the man on the end of it.'}],
      preText:()=>`${b43Sap()}'s burner goes into the reeds at the water's edge, and the shallows are lit orange to the far bone-bank, and full of men with sacks who had been working very quietly.`,
      stage2:{title:'The bone-bank', xp:80,
        text:()=>`They go back into the river, the way they came, wading hard, and the squad goes after them, out into the shallows to the knee, to the thigh, to the long bank of the dead that lies under the water across the ford like a weir.\n\nThere is a boat pulled up against it, a flat river-boat with a pole, and an old man standing in it with a lantern and a long boat-hook, sorting what comes up onto a cloth: buckles, blades, arrowheads, the iron off a shield. He has been doing this since the Chain went over, by the look of the cloth. He used to run the ferry here, before the bridge, before the ford was anybody's.${b43Say({haddat:`\n\nHaddat sees the cloth, and her shield comes up out of the water.`, marrow:`\n\nMarrow sees the cloth and says, "Child," quietly, to the old man, the way she says it to the dying.`, _:''})}`,
        map:["oooooooo","o-ttt-oo","o------o","--tt----","-----tt-","--------","-,----,-","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c3_ferryman',1,1],['b4_c3_hook',1,3],['b4_c3_scav',6,3],['b4_c3_scavsling',5,1]]} },
    /* 'blow': the far bank at night, a river band come to the poles after the blasting. Gall sent word; this band came anyway. */
    b4_c3_poles:{title:'The poles', style:'b4_c3_ford', dark:true, open:true, pitTxt:'the river', warrenText:'Night on the far bank · the warren is cold here, and listening', warren:{meanas:1, denul:1}, music:'battle',
      map:["..t...t.","........",".,..t...","........","...,....","........",",,,,,,,,","--------","---oo---","oooooooo"],
      party:[[3,5],[4,5],[2,6],[5,6],[3,6],[4,6]],
      foes:[['b4_c3_warrior',2,1],['b4_c3_warrior',5,1],['b4_c3_spear',3,2],['b4_c3_archer',5,0]], xp:160, after:'b4_c3_poles_after',
      waves:[{round:2, foes:[['b4_c3_warrior',0,3]], text:'Another comes out of the reeds at the side, painted for it, with a spear and a long grievance.'}, {round:3, foes:[['b4_c3_warrior',7,3]], text:'And one more, from the poles, the youngest of them, too angry to wait his turn.'}],
      preText:()=>`${b43Sap()}'s burner goes up among the poles, and the carcasses on them are suddenly lit from below, and so are the men under them, who had been waiting very still.`,
      stage2:{title:'The headman\'s poles', xp:80,
        text:()=>`They go back up the bank among the poles, the way they came, and the squad goes after them, to where the poles are thickest and oldest, up on the lip of the far bank, with the river below.\n\nThere is a man standing among them with a staff hung with braids and a dog's skull, and a fresh carcass on a fresh pole beside him: a goat, put up tonight. He is the oldest of them, and not afraid, and he says something to the squad in a river tongue that ${b4In('haddat') ? 'Haddat understands, by her face' : 'nobody in the squad understands, and everybody does'}.${b43Say({haddat:` "He says the river was full of the dead," Haddat says, "and the dead were the river's. He says we took them away with fire." She does not say anything about whether he is wrong.`, _:''})}`,
        map:["#..t..t#","#......#","#.t..t.#","#......#","#......#","#..,...#","#......#",",,,,,,,,","--------","oooooooo"],
        party:[[3,5],[4,5],[2,6],[5,6],[3,6],[4,6]],
        foes:[['b4_c3_headman',3,1],['b4_c3_warrior',1,2],['b4_c3_warrior',6,2],['b4_c3_archer',4,0]]} } },

  foes:{
    /* the raiders who harried the column: unnamed tribal bands (never Leoman's), light and quick, mostly on foot by now */
    b4_c3_raider:{name:'Tribal raider', sig:'r', kind:'rebel', hp:16, ac:12, atk:5, dmg:[1,8,1], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
    b4_c3_raidbow:{name:'Raider with a horn bow', sig:'b', kind:'rebel_bow', hp:12, ac:12, atk:5, dmg:[1,8,1], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'},
    b4_c3_raidchief:{name:'The raiders\' chief', sig:'C', kind:'rebel', hp:32, ac:13, atk:6, dmg:[1,10,2], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a tulwar down on'},
    /* a Khundryl Burned Tear rider (an ally in the wash's mouth) */
    b4_c3_rider:{name:'Burned Tear rider', sig:'K', kind:'b4_c3_khundryl', hp:16, ac:15, atk:5, dmg:[1,8,2], rng:1, mv:6, init:3, verb:'drives a lance at'},
    /* the brawl: drunk recruits, a loudmouth of the 10th who said the wrong thing, and Khundryl youths who heard it */
    b4_c3_drunk:{name:'Drunk recruit', sig:'a', kind:'b4_c1_recruit', hp:16, ac:11, atk:4, dmg:[1,6,1], rng:1, mv:4, init:1, verb:'swings a jar at'},
    b4_c3_loudmouth:{name:'The loudmouth of the 10th', sig:'L', kind:'b2soldier', hp:30, ac:13, atk:5, dmg:[1,8,1], rng:1, mv:4, init:1, boss:true, sk:['rally', 'shove'], verb:'swings a tent-pole at'},
    b4_c3_youth:{name:'Khundryl youth', sig:'y', kind:'b4_c3_khundryl', hp:16, ac:12, atk:5, dmg:[1,6,2], rng:1, mv:5, init:3, verb:'goes in with a lance-butt at'},
    /* the river scavengers: ford-pickers who strip the dead of their iron */
    b4_c3_scav:{name:'River scavenger', sig:'s', kind:'b4_c3_scavenger', hp:16, ac:12, atk:5, dmg:[1,8,1], rng:1, mv:5, init:2, sk:['bleed'], verb:'slashes with a gutting knife at'},
    b4_c3_hook:{name:'Scavenger with a boat-hook', sig:'h', kind:'b4_c3_scavenger', hp:18, ac:12, atk:5, dmg:[1,8,1], rng:1, mv:4, init:1, sk:['reach', 'shove'], verb:'drags a boat-hook at'},
    b4_c3_scavsling:{name:'Scavenger with a sling', sig:'g', kind:'b4_c3_scavenger', hp:12, ac:11, atk:5, dmg:[1,6,1], rng:5, mv:4, init:2, sk:['pin'], verb:'slings a river stone at'},
    b4_c3_ferryman:{name:'The old ferryman', sig:'F', kind:'b4_c3_scavenger', hp:32, ac:13, atk:6, dmg:[1,10,2], rng:1, mv:3, init:1, boss:true, sk:['reach', 'shove', 'rally'], verb:'swings the long boat-hook at'},
    /* the river band: warriors of a river people who hung the offerings, and do not want them blown up */
    b4_c3_warrior:{name:'River-tribe warrior', sig:'w', kind:'b4_c3_tribesman', hp:16, ac:12, atk:5, dmg:[1,8,1], rng:1, mv:4, init:2, verb:'cuts with a hooked sword at'},
    b4_c3_spear:{name:'River-tribe spearman', sig:'p', kind:'b4_c3_tribesman', hp:16, ac:12, atk:5, dmg:[1,8,1], rng:1, mv:4, init:1, sk:['reach'], verb:'thrusts a fishing spear at'},
    b4_c3_archer:{name:'River-tribe archer', sig:'a', kind:'b4_c3_tribesman', hp:12, ac:11, atk:5, dmg:[1,8,1], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'},
    b4_c3_headman:{name:'The headman', sig:'H', kind:'b4_c3_headman', hp:32, ac:13, atk:6, dmg:[1,10,2], rng:1, mv:3, init:1, boss:true, sk:['rally', 'shove'], verb:'brings a skull-hung staff down on'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b4_c3_khundrylknife:{name:'A Khundryl knife', slot:'weapon', who:['sgt', 'haddat', 'sathi', 'tangle', 'tallow', 'darrut', 'orvas', 'redblade', 'warlock'], atk:1,
      line:'A long curved knife with a horn grip wound in horsehair and a black bead on a thong at the pommel. The Khundryl give them to people they mean to see again. On anyone it is a good knife: +1 to hit. Orvas says it is a better promise.'},
    b4_c3_bonebead:{name:'A bead from the ford', slot:'trinket', who:null, hp:3,
      line:'A small bead of bone, drilled, worn smooth by the river, that came up out of Vathar Crossing in somebody\'s hand. Some woman of the Chain wore it in her hair. Whoever wears it has a little more in them before they go down: +3 health. Haddat would rather it were hers to carry.'},
    b4_c3_cup:{name:'A Khundryl horn cup', slot:'trinket', who:null, stat:{guile:1},
      line:'A drinking horn cut short and capped with copper, a little dented, that a Khundryl war chief filled at the feast and did not ask for back. Whoever carries it is a little better at talk: +1 guile. It still smells of what was in it.'},
    b4_c3_ferryrope:{name:'A length of the old ferry rope', slot:'trinket', who:null,
      line:'A fathom of old hemp rope, black with the river, cut from the post where the ferry used to cross the Vathar before there was anybody to cross it for. Knotted round a wrist, it steadies the hand: once a chapter, +1 to a check. Then it has done its turn until the next stretch of road.'} },

  scenes:{
    b4_c3_shadow:{loc:'The road to the Vathar', sub:'The ridges · dust that is not the column\'s', cap:'Dry hills folding away under a white sky, and on the far ridges a long smear of dust with riders in it, too far to count.', amb:'wind'},
    b4_c3_ford:{loc:'Vathar Crossing', sub:'The ford · dusk', cap:'A wide slow river going red in the last light, dark banks lying under the water across the ford, and on the shore the tribes\' offerings on poles.', amb:'explore'},
    b4_c3_fordnight:{loc:'Vathar Crossing', sub:'The ford · night', cap:'The river black under the stars, the bone-banks blacker under it, lanterns moving on the water where nobody of the 9th is.', amb:'explore'},
    b4_c3_crossing:{loc:'Vathar Crossing', sub:'The crossing · morning', cap:'The ford running fast and clean from bank to bank after the blast, and the army wading it to the waist toward the far trees.', amb:'explore'},
    b4_c3_butte:{loc:'North of the Vathar', sub:'The butte · morning', cap:'A harbour far below with ships crowded in it, a city round it, and away on the horizon a wall of dust standing up out of the desert.', amb:'wind'} },

  end:{
    carry:['The Third\'s stretch', 'Gall\'s Khundryl came in out of the dust and knelt to a Wickan boy, and the army drank with them all night. At Vathar Crossing the ford was choked with the Chain\'s dead. The night before the sappers blew it, the Third waded its own stretch in the dark and carried out what it could reach, and buried it on the bank, and fought the men who had been picking it for iron. In the morning the munitions took the rest. The marines who blew it crossed first, and the Third after them, tired to the bone.'],
    blow:['The army crossed dry', 'Gall\'s Khundryl came in out of the dust and knelt to a Wickan boy, and the army drank with them all night. At Vathar Crossing the ford was choked with the Chain\'s dead, and the marines\' sappers blew it clear at dawn. The Third let them. The marines who blew it crossed first, and the Third after them, dry to the knee. That night a river band came to the poles on the far bank for what had been done to their dead and their river, and the Third met it.'] },
  endScene:'b4_c3_butte',
  endCap:()=> b43Key() === 'carry' ? 'From the butte the Fourteenth looks down on Ubaryd and its harbour full of ships, and away north, the Whirlwind. The Third looks back at a line of new graves on the south bank.' : 'From the butte the Fourteenth looks down on Ubaryd and its harbour full of ships, and away north, the Whirlwind. Behind it the Vathar runs clean over the ford, for the first time since the Chain.',
  tease:'Next: the march north, and the raids by night. Somebody out there is very good at fire.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b4_c3_key === 'carry') x.push(f.b4_c3_carriedHow === 'few' ? 'The night before the crossing the Third waded its own stretch of the Vathar in the dark and carried out what bones it could reach. It was not many. The river was cold, and the squad was colder.' : 'The night before the crossing the Third waded its own stretch of the Vathar in the dark and carried out what bones it could reach, and buried them on the south bank, in a row. The company carried too.');
    if (f.b4_c3_key === 'blow') x.push('The Third let the munitions take the ford. The army crossed dry. A river band came to the poles that night for what had been done to their river.');
    if (f.b4_orvasDone === 1) x.push('Orvas, a rider of the Burned Tears, walks with the Third now. He would rather ride. He says the herd will learn.');
    else if (f.b4_orvasDone === 2) x.push('Orvas, a rider of the Burned Tears, rides with the Khundryl, near. He will come if he is asked.');
    else if (f.b4_orvasDone === 0) x.push('A young Burned Tear asked to stand with the Third, and the sergeant sent him back to his clan. He went.');
    if (f.b4_raminDone === 1) x.push('Ramin walks with the squad, a Red Blade lent. He walked the Vathar in his scale, twice now.');
    else if (f.b4_raminDone === 2) x.push('Ramin rides with the Red Blades, near.');
    if (f.b4_kethDone === 1) x.push('Keth walks with the squad. The grandmother has made friends with an old Khundryl woman, which nobody expected.');
    else if (f.b4_kethDone === 2) x.push('Keth is with Temul\'s youths, and the youths have three thousand horse now.');
    if (f.b4_c3_shamanTold === 'bless') x.push('The Khundryl shamans foretold a long but restless life for the army. The Third told the recruits it was a blessing.');
    if (f.b4_c3_shamanTold === 'true') x.push('The Khundryl shamans foretold a long but restless life for the army. The Third told the recruits what it sounded like.');
    if (f.b4_c3_brawlDone) x.push('A brawl at the edge of the feast was stopped before any Fist saw it. A Khundryl youth and a recruit of the 10th are both sorry, mostly.');
    if (f.b4_c3_gall) x.push('A Khundryl war chief poured for the Chain squad at the feast and did not ask for his cup back.');
    if (b4In('mirrel')) x.push(f.b4_c3_key === 'carry' ? 'Mirrel got the recruits out of the Vathar before the cold took them, and stitched the old ferryman who had been picking it. She has not said which she minded more.' : 'Mirrel laid out her linen for the river men on the far bank. They would not take it. She rolled it up again, three turns and a tuck.');
    if (b4In('yorin') && f.b4_whirlwindSeen) x.push('Yorin saw the Whirlwind from the butte. His copper vane has not pointed true since. He says it will. He checks it every morning.');
    if (b4In('rasp')) x.push(f.b4_c3_key === 'blow' ? 'Rasp watched the marines blow Vathar Crossing from the bank and called it lovely work. Then she was quiet for a day, which the squad had not known she could be.' : 'Rasp hung her satchel on the ferry post and carried bones all night with the rest. She watched the marines blow the ford in the morning, and called it lovely work, quietly.');
    if (f.b4_c3_rope) x.push('The squad cut a length of the old ferry rope off its post at the Vathar. It is knotted round somebody\'s wrist.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b4_whirlwindSeen && 'From a butte north of the Vathar the army saw Ubaryd, taken back, its harbour full of Admiral Nok\'s ships, and on the horizon the Whirlwind.',
    f.b4_c3_scavDone && 'The night before the crossing the Third waded its own stretch of the ford and carried out what bones it could. Scavengers came for the iron in them. They did not get it.',
    f.b4_c3_bandDone && 'The night after the crossing a river band came to the offering poles on the far bank, for the blasting. The Third met them.',
    f.b4_c3_key && (f.b4_c3_key === 'carry' ? 'At Vathar Crossing the Third carried its own dead out of the ford before the sappers blew it.' : 'At Vathar Crossing the Third let the sappers blow the ford clear. The army crossed dry, the marines who blew it first.'),
    f.b4_c3_ford && 'Vathar Crossing is choked with the Chain\'s dead, from the Day of Pure Blood, and hung with the tribes\' offerings on poles. The Khundryl call it a place of death.',
    f.b4_c3_shaman && 'The Khundryl shamans read the army at the feast: a long but restless life, a life of searching.',
    f.b4_khundryl && 'The riders on the ridges were Gall\'s Khundryl Burned Tears, come to make amends for riding away before Coltaine\'s end. Gall knelt to Temul. The Khundryl are Crow Clan now.',
    f.b4_c3_raidersDone && 'The raiders who had harried the column for days were driven onto the 9th\'s flank picket by riders nobody had seen yet.',
    'For days there were riders on the ridges, keeping pace with the Fourteenth. A marine squad of the 8th went out to look at them.'].filter(Boolean); },

  dlg:{
    /* ---- the hills by day: the dust on the ridges ---- */
    b4_c3_start:()=>({sp:'The 9th\'s line', scene:'b4_c3_shadow', fx:()=>{ S.f.b4_c3_ph = 1; }, txt:
`The column halts at midday in a fold of the hills, the way it halts every midday, because the Adjunct has decided that an army that walks through the heat dies of it. The 9th sits down where it stands. The dust it raised goes on without it for a while and then settles on everybody.

On the ridge to the east the other dust does not settle. It has been there since dawn, a long low smear against the white sky, and in it, when the light is right, things moving. Riders. More than anyone can count. Keeping pace.

${b43Say({tebbet:`Tebbet has his hand up over his eyes. "Horse," he says. "More horse than I can count from here, Sergeant. They're not coming down. They're watching us eat."`, haddat:`Haddat watches the ridge with the blue shield grounded beside her. "They are not hiding," she says. "If they wanted to hide, there are a hundred folds in these hills. They want us to see them."`, _:`The squad watches the ridge. Everybody in the 9th is watching the ridge.`})}${b4In('tallow') ? `\n\nTallow is pretending not to watch it, and failing. He has a stone in the pocket of his sling, out of habit, and his thumb on it.` : ''}${b43Sp({mirrel:`Mirrel goes along the squad with a water skin, one, two, three swallows each and up. "They can watch," she says. "Drink while they do it."`, yorin:`Yorin is looking at the dust, not the riders. "That's not wind," he says. "Wind doesn't keep pace with anybody." The little copper vane in his palm swings round to the ridge and stays there. He puts it away.`, rasp:`Rasp weighs the satchel in one hand without opening it. "If they come down," she says, hoarse, "they come down a fold. I like a fold. Everything in a fold goes off twice."`})}${b43R({orvas:`\n\nOrvas is on his feet, the only one in the 9th standing, with his lance grounded, looking at the ridge the way you look at a house you grew up in.`, redblade:`\n\nRamin has his helm off and is shading his eyes with it. "Three thousand," he says. "My company's scouts said so this morning. They would not go nearer."`, warlock:`\n\n"*Horses,*" says the grandmother. "*Many. And grief. Something with a great deal of grief in it.*"`})}`,
      ch:[{t:'"Eat. Drink. They\'ll come or they won\'t."', go:'b4_c3_dust'},
          {t:'Watch the ridge.', go:'b4_c3_dust'}]}),
    b4_c3_dust:()=>({sp:'The 9th\'s line', scene:'b4_c3_shadow', fx:()=>{ b4Nerve(-1, 'Raiders at dusk for days, and riders on the ridges'); }, txt:
`A marine squad of the 8th went out at dawn to look at them, the word is: a sergeant and his people, up the far side of the ridge on foot. They have not come back. The 9th does not know if that is bad.

And at dusk every day for a week the column has been raided. A few riders come out of a fold, a wagon burns, a carter dies, and they are gone before anybody can get a horse after them. Everybody in the 9th has seen the smoke. Half of the 9th thinks it is the same riders as the ones on the ridge, and is waiting for them to come down.

${b43Say({marrow:`"They are not the same," Marrow says, chewing. "Raiders do not ride three thousand to a wagon, child. Raiders ride twenty." She swallows. "That up there is a people."`, tangle:`Tangle counts the satchel without opening it, by the weight. "Whoever they are," he says, "if they come down, they come down onto the 8th first." He sounds as if that were the only good news he has had all week.`, _:`The squad eats, and watches, and says what it thinks only to itself.`})}${b43Sp({yorin:`"Dusk's when the wind drops," Yorin says. "Smoke goes straight up at dusk. You see it from a league off." He frowns at the ridge. "They want us to see it. That's the part I don't like."`, rasp:`"Wagons at dusk," Rasp says. "Every time. Same hour, same trick." She sounds professionally disappointed. "Somebody out there's good with fire and bored with it."`})}${b43R({orvas:`\n\n"They will come down," Orvas says, not looking away from the ridge. "When they have decided what to say."`, redblade:`\n\n"My company's scouts thought they might be Leoman's," Ramin says. "They did not go near enough to be sure."`, warlock:`\n\n"*Not raiders,*" the grandmother says. "*Raiders do not grieve.*"`})}`,
      ch:[{t:'On your feet when Radde comes.', go:()=>startExplore()}]}),

    /* ---- the Second Company at the halt: Radde, Hollet, the recruits ---- */
    b4_c3_radde:()=>({sp:'Sergeant Radde · Second Company', html:nerveHTML('The Second Company'), txt:
`Radde comes down the halted column with the book under his arm and the stick in his hand, stopping at every squad, saying a word, writing a word. At the Third he stops longer.

"Flank picket," he says. "The captain wants a squad on the rise east of the wagons, where the wash comes down out of the hills. Every raid this week has come down a wash at dusk. That's the closest wash." He writes. "I've told him the Chain lot have seen a wash before."

He looks at the recruits round the wagons, who are watching the ridge and not eating. He looks at his book. "And they're not steady, Sergeant. Riders up there all morning, smoke every night, and the boy with the bone still in their heads from Aren. I've written down three that'll run the first time something comes down off a hill at them." He shuts the book. "I'd like to rub those out. Take a few regulars with you. Let them see the Chain lot stand."`,
      ch:[{t:'"We\'ll take the picket."', fx:()=>{ S.f.b4_c3_picket = 1; }, go:'b4_c3_radde_2'},
          {t:'"Why us?"', go:'b4_c3_radde_why'}]}),
    b4_c3_radde_why:()=>({sp:'Sergeant Radde', txt:
`"Because the Fist doesn't like you," Radde says, plainly, "and the captain does, and a picket on a wash is where the two of them agree." He shrugs. "And because you walked through these hills with the Chain, and the rest of the 9th came down them on a road map." He writes something. "Mostly the first."`,
      ch:[{t:'"We\'ll take the picket."', fx:()=>{ S.f.b4_c3_picket = 1; }, go:'b4_c3_radde_2'}]}),
    b4_c3_radde_2:()=>({sp:'Sergeant Radde', txt:
`"Good." He writes the Third's name against something. "East of the wagons. Before dusk."${b43Say({haddat:` He glances at Haddat. "And Hissari. If they come down that wash, tell me what they shout. The captain likes to know."`, darrut:` He glances at Darrut. "Aren Guard. You'll know how to stand a picket. Show the regulars."`, _:''})}${b43Sp({mirrel:`He looks at Mirrel's bag with the red hand on it. "And bring the hospice with you. The regulars bleed same as anybody."`, yorin:`He looks at Yorin. "Your mage keeps his lightning off my regulars," he says. "I've written that down so you can't say I didn't."`, rasp:`He looks at Rasp's satchel, and steps round it. "Sapper. If you blow the wash, blow it after the regulars are out of it. Not during."`})}${b43R({orvas:`\n\nHe looks at Orvas a long breath, and at the black on his face, and at the ridge. "Him too," he says. "Especially him."`, redblade:`\n\nHe looks at Ramin's red scale. "Your Red Blade can ride for help, if it comes to that. He's the only one of you who knows what a horse is for."`, warlock:`\n\nHe looks at Keth. "And the Wickan stays where I can find him. The Crow are asking after him."`})}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c3_radde_again:()=>({sp:'Sergeant Radde', txt: S.f.b4_c3_raidersDone ?
`Radde is walking the column with the book open, writing as he goes. "Three rubbed out," he says, without looking up. "I've drawn a line through them. They held." He looks at the ridge, which is empty now. "And now we've three thousand horse to feed and none of them ours."` :
`Radde is walking the column with the book open. "East of the wagons, Sergeant. Before dusk." He writes. "I'm not writing that down. That's just a reminder."`,
      ch:[{t:'To the Khundryl fires.', req:()=>!!S.f.b4_c3_raidersDone, onward:true, go:()=>{ S.f.b4_c3_ph = 2; startExplore('b4_c3_camp'); talk('b4_c3_feast_arrive'); }},
          {t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c3_hollet:()=>({sp:'Captain Hollet · Second Company', fx:()=>{ S.f.b4_c3_hollet = 1; }, txt:
`Captain Hollet is sitting on the tailboard of a wagon with his tablet on his knee, counting water skins. He looks up at the squad and loses his place.

"Sergeant." He finds it again. "Eleven wagons burned this week. Eleven. On the whole column. The Fist says it's the cavalry's fault, and the cavalry says it's the Fist's. I keep the numbers. The numbers say it's always at dusk, always down a wash, and nobody ever catches them."

He lowers his voice. "There's a story going round the 8th. About one of their captains, Keneb, the one with the boy. That he left his post in the uprising, in Seven Cities, to get his family out, and left his soldiers to it." He looks at the tablet. "The 8th doesn't trust him. I don't know if it's true. I'd have done it." He seems to hear himself. "I didn't say that, Sergeant."${b43Say({haddat:`\n\nHaddat, behind you, looks at the captain properly, for the first time.`, marrow:`\n\nMarrow, behind you, makes a small sound that might be approval.`, _:''})}${b43Sp({mirrel:`"At the hospice," Mirrel says, behind you, "we'd have called that a man with sense and a short career." Hollet decides not to hear it.`})}${b43R({orvas:`\n\nOrvas, listening, nods slowly. "Family first," he says. "That is not desertion. That is being a person."`, redblade:`\n\n"Every officer who lived through the rising has a story like that," Ramin says. "The Red Blades do not ask. We have our own."`, warlock:`\n\n"*Everybody leaves somebody,*" the grandmother says. Hollet looks at Keth for some time.`})}`,
      ch:[{t:'"We\'ll watch the wash, sir."', go:()=>startExplore()},
          {t:'"Rumours, sir. Every army has them."', go:()=>startExplore()}]}),
    b4_c3_recruits:()=>({sp:'The Second Company\'s recruits', txt:
`The company's recruits are sitting round the water wagon with their backs to it, as if the wagon could stop a charge. The freckled girl from Aren is among them, with her spear across her knees, and she has learned to hold it like a spear and not a broom, which nobody has told her is good.

"Sergeant," she says. "The ones on the ridge. Are they the ones burning the wagons? Are they coming down tonight?" The rest of them are listening very hard. A voice behind her says *Leoman*, and another says *Sha'ik's horse*, and a boy at the end has gone grey under his sunburn.

${b43New().includes('tallow') ? `Tallow is sitting with them, which he does more than he sits with the squad, and he is as grey as the boy at the end. He looks at you as if you might know.` : b43New().includes('darrut') ? `Darrut is standing behind them with his big shield, like a wall somebody has leaned recruits against.` : b43New().includes('mirrel') ? `Mirrel is already crouched by the boy at the end with two fingers on his wrist. "Sit. Breathe. Other way round, if you like," she says. "It's the sun, mostly. The rest is the ridge."` : b43New().includes('yorin') ? `Yorin is sitting with them, because they asked him what the sky would do tonight and he made the mistake of answering. "Clear," he is saying. "Clear's not a promise. Clear's just what it is now."` : b43New().includes('rasp') ? `Rasp is sitting on the wagon's tongue above them with the satchel in her lap, which is doing nothing at all for their nerves.` : `They look at the squad the way you look at somebody who has been somewhere you are going.`}`,
      ch:[{t:'"Whoever they are, they\'re not hitting us. Eat."', fx:()=>{ S.f.b4_c3_recTold = 'steady'; b4Nerve(1, 'The Chain squad said eat, and ate'); }, go:'b4_c3_recruits_steady'},
          {t:'"They could be anyone. Keep your spear where you can find it."', fx:()=>{ S.f.b4_c3_recTold = 'true'; b43L('haddat', 1); }, go:'b4_c3_recruits_true'}]}),
    b4_c3_recruits_steady:()=>({sp:'The Second Company\'s recruits', txt:
`You sit down on the wagon's shaft and eat, slowly, the way the Chain taught you: a mouthful, and look at the ridge, and another, and do not look at the ridge. After a while the freckled girl eats too. Then the boy at the end. It goes down the wagon like a yawn.

${b43Say({tangle:`Tangle sits down beside you and eats with great noise and evident enjoyment, which is a lie; it is the same biscuit as yesterday.`, marrow:`Marrow sits down beside you and eats, and passes the boy at the end her water without a word, and watches him drink it.`, _:`The squad sits down and eats with you.`})}${b4In('tallow') ? `\n\nTallow eats. It does not stay down long. He comes back from behind the wagon pale and grinning. "Better," he says.` : ''}${b43Sp({mirrel:`Mirrel watches the boy at the end eat, and nods, once, as if a wound had closed the way she meant it to.`, rasp:`Rasp eats with the satchel between her boots. The recruit next to her moves a hand's width away, and then, when nothing goes off, moves back.`})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b4_c3_recruits_true:()=>({sp:'The Second Company\'s recruits', txt:
`The freckled girl nods slowly, and puts her spear where she can find it, across her lap. The others do the same. They do not look happier. They look like soldiers, a little: people who have been told something true and have decided to carry it.

${b43Say({haddat:`"Good," Haddat says to the girl, in Malazan, and then in Hissari, to herself: "That is how it starts. A spear where you can find it." She sounds, for a moment, almost proud.`, _:`"Right," says the girl. "Right." She checks the spear again.`})}${b43Sp({rasp:`"Pointy end out," Rasp tells the boy at the end, kindly, in a voice like a file on a hinge. "That's all there is to it. The rest is just standing there." He looks as if he would rather have been told something frightening.`})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b4_c3_recruits_again:()=>({sp:'The Second Company\'s recruits', txt: S.f.b4_c3_raidersDone ?
`The recruits are on their feet now, watching the riders come down off the ridge and in toward the column at a walk, and the freckled girl is trying very hard to look as if she had never been afraid of them.` :
`The recruits are sitting round the water wagon, watching the ridge. ${S.f.b4_c3_recTold === 'steady' ? 'They are eating, which is something.' : 'They have their spears across their knees.'}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c3_wagon:()=>({sp:'A 9th\'s wagon', txt:
`A water wagon of the 9th, the barrels lashed under a hide, a carter asleep in the shade under the bed with his hat over his face. On the tailboard somebody has scratched a tally with a knife: a mark for each wagon that has burned this week, on the whole column. There are eleven.

${b43Say({rasp:`Rasp counts them, and touches each mark with the file from her belt. "Eleven," she says. "All fire, all at dusk." She sniffs at the tailboard. "Pitch and oil. No clay." She sounds almost sorry for them. "Whoever it is, they're doing it the long way."`, darrut:`Darrut counts them with his finger. "In the Guard," he says, "we'd have put a squad in every third wagon with crossbows and a lid on." He considers. "We never did. But we'd have liked to."`, tangle:`Tangle counts them twice. "Eleven," he says. "Fire, every one." He looks at the satchel. "Somebody out there likes fire. I don't trust people who like fire, Sergeant. It's a professional thing."`, _:`Eleven marks. The carter sleeps through the squad reading them.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c3_cairn:()=>({sp:'A cairn on the rise', txt:
`A heap of grey stones on the rise above the halt, old, with a bleached horse skull on top and a rag tied to a stick in it. From up here the ridge to the east is nearer: a long line of dust, and under it, when it thins, horsemen sitting their horses in a line that goes on further than the eye wants it to.`,
      ch:[{t:'Get a proper look at them. (read the riders from the rise)', check:['wits', 15], req:()=>!S.f.b4_c3_counted,
            edges:id=>[id === 'tebbet' && ['the far view is his', 2], id === 'sathi' && ['she reads horses the way other people read faces', 1], id === 'orvas' && ['he knows whose horses those are', 2], id === 'haddat' && ['she has seen Khundryl come off a ridge', 1], id === 'yorin' && ['he reads the wind in the dust, and the dust is coming off horses', 1], id === 'tallow' && ['he keeps looking at the nearest ones', -1]],
            near:{t:()=>`Yes, but the sun comes off a lance-head straight into ${NAME(ROLL().who || 'sgt')}'s eyes and stays there for an hour. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c3_cairn_ok', fail:'b4_c3_cairn_no'},
          {t:'Walk on.', go:()=>startExplore()}]}),
    b4_c3_cairn_ok:()=>({sp:'A cairn on the rise', fx:()=>{ S.f.b4_c3_counted = 1; }, txt:
`${by({tebbet:`Tebbet lies on his belly on the warm stones with his chin on his fists and watches without blinking until the dust thins. "Not raiders," he says at last. "Families. There's a woman up there with a child on the saddle in front of her. Old men. They're all in the same coats." He watches. "And their faces are dark under the eyes. All of them. Like soot."`, orvas:`Orvas does not need to look long. "Burned Tears," he says. "My clan. Gall's." He is quiet. "They came," he says, to himself, as if he had not been sure they would.`, yorin:`Yorin watches the dust instead of the horses, the way it lifts and where it hangs. "Not a war-band," he says at last. "A war-band raises a narrow dust and moves it fast. That's a wide dust. That's everything they own." He looks again, and sees it. "There are children up there."`, _:`{who} watches a long time. "Not raiders," at last. "There are families up there. Old men, women, a child on a saddle. And their faces are dark under the eyes. All of them. Like soot."`})}

Down the ridge, closer to the 9th, a small knot of riders has peeled off the line and is moving slowly south and east along the hills, keeping to the folds. Toward the wash. Toward the 9th's flank. ${S.f.b4_c3_picket ? 'Toward the picket.' : 'Where Radde will want a picket.'}`,
      ch:[{t:'Back down.', go:()=>startExplore()}]}),
    b4_c3_cairn_no:()=>({sp:'A cairn on the rise', fx:()=>{ S.f.b4_c3_counted = 1; }, txt:
`The dust is too thick and the light is wrong, and everything on the ridge is horses and more horses, shimmering. ${by({sgt:'You give', _:'{who} gives'})} it up when the eyes start to water. There are too many to count. That is all there is to say about them from here.`,
      ch:[{t:'Back down.', go:()=>startExplore()}]}),
    b4_c3_back:()=>({sp:'The column', txt:
`West, the column goes on back along the fold, wagon after wagon, a legion sitting down in its own dust. There is nothing back there for the Third but the 10th's opinions.`,
      ch:[{t:'Not that way.'}]}),

    /* ---- the flank picket: the raiders come down the wash, driven ---- */
    b4_c3_to_flank:()=> S.f.b4_c3_raidersDone ? ({sp:'The flank picket', txt:
`The rise east of the wagons, and the wash below it, and on the wash's stones the marks of a fight. The riders who came over the ridge have gone back up it. The picket is the 10th's tonight.`,
      ch:[{t:'To the Khundryl fires.', onward:true, go:()=>{ S.f.b4_c3_ph = 2; startExplore('b4_c3_camp'); talk('b4_c3_feast_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}) : !S.f.b4_c3_picket ? ({sp:'The edge of the halt', txt:
`East of the wagons the ground rises to a low crest, and beyond it a dry wash comes down out of the hills. There is no picket on it yet. Radde will want to know who is wandering about on the column's flank.`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The flank picket', fx:()=>{ S.f.b4_c3_onFlank = 1; }, txt:
`The rise east of the wagons, a low crest of scree with the wash below it: a dry streambed of white stones coming down out of a fold in the hills, wide enough for six riders abreast, with the column's flank wide open at the bottom of it. Radde's regulars come up behind the squad and dig their shields in, and look at the wash, and look at the Third.

The afternoon goes on. The heat comes off the stones in sheets. And then, an hour short of dusk, there is a sound up the wash: hooves on stone, scores of them, coming fast, and men shouting, not the way men shout when they are charging. The way men shout when they are being chased.

They come round the bend at a gallop, twenty, thirty, more: raiders in desert cloth with their faces wrapped, the ones who have been burning the wagons all week, and they are not coming for the column. They are running from something behind them, up the wash, in the dust. And the picket is in their way.${b43Say({tebbet:`\n\n"Something's driving them," Tebbet says, very calm, an arrow already on the string. "Up the wash. I can't see what."`, haddat:`\n\nHaddat listens to what they are shouting. "They are shouting *behind*," she says. "Just *behind*. Over and over."`, _:''})}${b4In('tallow') ? `\n\nTallow has gone to the end of the line where there is room to swing, and is whirling the sling once, slowly, the way he did at the gulls. His lips are moving. It is his grandmother's word for the Twins, and it is not a prayer, he says. It is manners.` : ''}${b43Sp({yorin:`Yorin has his hand up into the hot wind off the wash, fingers spread. "Something big behind them," he says. "Big enough to push the air ahead of it." His fingers spark, once, blue, and he shakes them. "Not yet. Not yet."`, rasp:`Rasp has two sharpers out of the satchel already, one in each fist, weighing them. "Say when," she says to you, as if she were asking about the salt.`})}${b43R({orvas:`\n\nOrvas laughs out loud, once, and grounds his lance in the scree. "Herded," he says. "They have been herded to us. Polite."`, redblade:`\n\nRamin draws, and sets himself. "They will not stop for us," he says. "They are past stopping."`, warlock:`\n\n"*Horses behind them,*" the grandmother says. "*Hundreds. Good horses.*"`})}`,
      ch:[{t:'"Shields. Here they come."', go:()=>startBattle('b4_c3_raiders', {})},
          {t:`${b43Sap()} puts two sharpers in the wash's mouth.`, tag:'uses 2 sharpers', req:()=>b43HasSap() && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c3_raiders', {pre:true})},
          {t:'Take the wash\'s mouth from the side, among the rocks.', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['hills are his, and the far view', 2], id === 'darrut' && ['he has stood a gate', 1], id === 'haddat' && ['she walked these hills once already', 1], id === 'rasp' && ['she can read a ditch and a wash like a map', 1], S.f.b4_c3_counted && ['the squad saw them coming from the cairn', 1], id === 'tallow' && ['he has never seen horses come at him', -1]],
            near:{t:'Yes, but a regular\'s shield-rim rings on a rock as the squad goes along the side, and the nearest raiders turn their horses toward it.'},
            go:()=>startBattle('b4_c3_raiders', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c3_flank_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c3_flank_seen:()=>({sp:'The flank picket', txt:
`The rocks along the side of the wash are loose and the scree is louder than anybody wanted, and the raiders, who are frightened of everything behind them, are very quick to be frightened of something in front too. The first of them comes straight at the squad with a tulwar out.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c3_raiders', {surprise:'e'})}]}),
    b4_c3_raiders_after:()=>({sp:'The wash', fx:()=>{ S.f.b4_c3_raidersDone = 1; }, txt:
`It is over quickly, after the riders come. The raiders who are still on their feet throw down their tulwars, and the riders on the ridge watch them do it, and do not come down any further. One of the regulars is sitting on a stone with his arm across his chest, swearing, alive. The rest are standing, which they keep looking at their own feet to check.

The riders sit their horses at the top of the wash and look down at the picket. Up close, now, you can see their faces. Under every eye, on every one of them, man and woman and the boy at the end of the line, there are tears: black, running down the cheeks to the jaw, inked into the skin. They do not explain them, and the Third does not ask.

Then one of them, an old man with grey in his braids, lifts his lance to the Third, just the Third, and turns his horse, and they go back up over the ridge into the dust without a word.${b43Say({haddat:`\n\nHaddat watches them go. "At Sanimon," she says, "their faces were painted. Ochre. For war." She touches her own cheek, under the eye. "That is not paint."`, marrow:`\n\nMarrow watches them go. "Ink," she says. "Under the skin, child. You don't do that for a season." She does not say what you do it for.`, _:''})}${b43Sp({mirrel:`Mirrel has the swearing regular's arm out straight across her knee before he has finished the word. "Sit. Hand. Other hand. Good." One, two, three, and the shoulder goes back in with a sound the recruits will talk about for a week. "There," she says, to the shoulder.`, yorin:`Yorin watches the riders go back into the dust, and lets out a breath. "I had lightning ready," he says. "For about half the wash. I'm glad I didn't have to pick which half."`})}${b43R({orvas:`\n\nOrvas watches them go with his chin up and his eyes wet, and keeps his own counsel for the rest of the afternoon.`, redblade:`\n\n"Not Leoman's," Ramin says. "I will tell the Fist. He will not like it."`, warlock:`\n\n"*Grief,*" the grandmother says, satisfied, as if a bet had come in.`})}`,
      ch:[{t:'Back to the column.', go:'b4_c3_come_in'}]}),
    b4_c3_come_in:()=>({sp:'The column', scene:'b4_c3_shadow', fx:()=>{ S.f.b4_khundryl = 1; b4Nerve(1, 'The Khundryl came in'); }, txt:
`They come in at dusk, all of them: down off the ridge in a long column of their own, three thousand riders with their families and their herds, toward the head of the Fourteenth, slow, the way you come to a door you have been a long time getting up the nerve to knock on.

The word comes down the column faster than a horse. *Khundryl. Burned Tears. Gall's.* The clan that rode with Coltaine for a while, and rode away before the end. *They've come to make it up to the dead.* And then, an hour later, a stranger word: *their war chief knelt. To the boy. To Temul.* Gall of the Burned Tears got down off his horse in front of the Adjunct and the whole of the Fourteenth's head, and knelt to a Wickan boy, and the boy took the Khundryl into the Crow Clan. *They're Wickans now,* the 9th says, not believing it. *Three thousand Wickans.*

You do not see it; the 9th is half a league back. But in the last of the light a knot of Wickan youths rides back down the column past the 9th's wagons, and the boy at the head of them is carrying a sword across his saddle. A broken one: a heavy blade snapped off a hand's width above the hilt, held flat across the pommel like something that weighs more than it does.

${b43Say({sathi:`Sathi watches the youths go by with her filed teeth bared in something that is not quite a grin. "Crow Clan," she says. "He took them in." She looks at the broken sword. "The old Crow wouldn't have him. And now he has three thousand horse." She laughs, then, properly. "Good."`, haddat:`Haddat watches the broken sword go by. "They rode away," she says, very quietly. "Before the end. And now they kneel to a boy." She does not say whether it is enough.${S.f.b4_fallClimbed ? ` She climbed Coltaine's hill with the pilgrims a week ago, in the dark, with the names. She does not say what she said up there.` : ''}`, _:`The youths ride past with the broken sword. The 9th watches it go by, and goes quiet.`})}${b43Sp({mirrel:`Mirrel watches the broken sword go by with her bag on her shoulder. "Where I grew up," she says, "when a man knelt in the street it was because somebody had cut his hamstrings." She considers the youths. "This is better."`, rasp:`Rasp watches three thousand horse settle round the head of the column, and moves the satchel round to her other hip, away from all of them. "Lovely animals," she says. "Kick like a cusser and twice as often."`})}${b43R({orvas:`\n\nOrvas watches the broken sword go by and does not breathe until it has passed. "That was Gall's," he says. "Now it is the boy's." He wipes his face with the back of his hand, and the black does not come off.`, warlock:`\n\nKeth rides out of the knot of youths for a moment, alongside the squad. "Temul did it," he says, his own voice, shaking a little. "They knelt. All of them." The grandmother, out of his mouth: "*About time somebody did.*"`, redblade:`\n\n"Three thousand horse," Ramin says, with deep feeling. "And not one of them a Red Blade's."`})}`,
      ch:[{t:'"They\'ll have fires going. Let\'s go and look."', onward:true, go:()=>{ S.f.b4_c3_ph = 2; startExplore('b4_c3_camp'); talk('b4_c3_feast_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the feast: the Khundryl fires, the Third's fire, the Deck ---- */
    b4_c3_feast_arrive:()=>({sp:'The Khundryl fires', scene:'b4_feast', txt:
`The Khundryl make camp in among the Fourteenth as if they had always been there, and light their fires, fire after fire, and bring out the drink. It comes in skins and jars and horns, a pale sour milk-spirit that tastes of horse and smoke and goes down like a dropped stone, and the Khundryl give it to everybody. By full dark the Fourteenth is drunk.

They grieve, the Khundryl, out loud. At every fire somebody is weeping, a big man or an old woman or a boy, with their head back and the black tears on their face shining in the firelight; and then, at the same fire, a moment later, somebody laughs, and the weeping one laughs too. It goes round the fires like wind round a hill.

${b43Say({marrow:`Marrow sits down by the fire the Third has been given and accepts a horn of the milk-spirit with great dignity. She tastes it. "Child," she says, to the horn, with deep respect.`, tangle:`Tangle sits down with the satchel on the side away from the fire and the horses. "A camp full of drunks and open flame," he says. "My two favourite things." He drinks.`, _:`The Third sits down at the fire it has been given, and is given a horn, and drinks.`})}${b43Sp({mirrel:`Mirrel is given a horn and sniffs it. "Horse milk, and something that would clean a wound," she says. She drinks it anyway. "In Li Heng we'd have called this a quiet night."`, yorin:`Yorin is given a horn by a Khundryl grandmother who pats his cheek and says something that makes her whole fire laugh. "Sky-child," somebody translates. He has no idea how she knew.`, rasp:`Rasp sits with the satchel on the far side of her, away from the fire, and gives the Khundryl who come to look at it a hoarse, friendly look that sends them away again.`})}${b43R({orvas:`\n\nOrvas is home. He goes from fire to fire for an hour and comes back with his eyes red and a jar under each arm. "My mother's sister," he says, of a fire somewhere. "She is very angry with me. She is always very angry with me."`, redblade:`\n\nRamin will not drink. He sits very straight with a horn of water. The Khundryl at the next fire think this is the funniest thing they have ever seen.`, warlock:`\n\nKeth sits with the squad, though the youths are three fires over. "*They grieve properly,*" the grandmother says, approving. "*Wickans grieve properly too. Malazans grieve like accountants.*"`})}`,
      ch:[b4DeckChoice(3),
          {t:'The Third\'s fire.', go:'b4_c3_feast'},
          {t:'Walk the fires.', go:()=>startExplore()}]}),
    b4_c3_deck:()=>b4DeckOffer(3),
    b4_c3_card:()=>{ const n = b4DeckCard(3); n.fx = () => { if (['b4c_knightchains', 'b4c_leper'].includes(S.card)) S.f.b4_chains = 1; }; return n; },

    /* the fire: the swap, a rest, the squad, and the way on (the games pass, 79, wraps this node: keep the id) */
    b4_c3_feast:()=>({sp:'The Third\'s fire', scene:'b4_feast', again:()=> S.f.b4_c3_brawlDone ? 'The Third\'s fire, burning down. The river tomorrow.' : 'The Third\'s fire, among the Khundryl\'s. The feast goes on all round it.', txt:
`${S.f.b4_c3_brawlDone ? `The Third's fire has burned down to a red eye in the grass. Round it the feast is going out one fire at a time: Khundryl asleep on their saddles, recruits asleep on the Khundryl, a horse standing over somebody and looking down at him with mild interest. Away east, past the last fires, the ground goes down toward the river. The Khundryl's war chief called it a place of death, the camp says, at the Adjunct's fire. The Third did not need telling.` : `The Third's fire, a ring of scree-stones in the trampled grass with Khundryl fires all round it. The horns keep being filled. The weeping and the laughing go round and round the camp, and the 9th's recruits have started to join in with both, badly. Away east, past the last fires, there is shouting at the 10th's.`}${b43Dog() ? `\n\nHackle lies by the fire with his nose on his paws, watching the Khundryl dogs, who are watching him.` : ''}${b43Sp({yorin:`Yorin sits with his back to the open sky, the way he sits at every fire, and his face to the coals.`})}`,
      ch:[b4DeckChoice(3),
          {t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b4_c3_rest2, fx:()=>{ S.f.b4_c3_rest2 = 1; b4Rest('The squad sits an hour by its fire among the Khundryl\'s, while three thousand people grieve and laugh round it. Wounds close, mostly.'); }, go:'b4_c3_feast_rest'},
          {t:'Talk with the squad.', go:'b4_c3_feast_talk'},
          ...b4Offers().map(id => ({t:`Send for ${NAME(id)}.`, fx:()=>{ b4SwapIn(id); }, go:'b4_c3_feast_swap'})),
          b4SpareChoice('b4_c3_feast'),
          b4PipeChoice('b4_c3_feast'),
          {t:'The shouting at the 10th\'s fires.', req:()=>!S.f.b4_c3_brawlDone, onward:true, go:'b4_c3_brawl_start'},
          {t:'Sleep. The river tomorrow.', req:()=>!!S.f.b4_c3_brawlDone, onward:true, go:'b4_c3_to_ford'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c3_feast_rest:()=>({sp:'The Third\'s fire', scene:'b4_feast', txt:
`An hour, then, on the warm grass by the fire, with the feast going round.

${b43Say({marrow:`Marrow goes round the squad the way she always has, looking at hands and feet and the backs of necks, and then, because she has had three horns of the milk-spirit, does it again.`, haddat:`Haddat sleeps sitting up against the blue shield, as she slept on the Chain. Her lips move, once, on a name.`, _:`One of them sleeps. The others watch the Khundryl.`})}${b4In('tallow') ? `\n\nTallow has been adopted by a Khundryl family at the next fire, who are teaching him to weep properly. He is very bad at it. They are delighted.` : ''}${b4In('hessa') ? `\n\nHessa watches the Khundryl grieve with her hands folded. "They do it for the ones they lost," she says, "and the ones they left. In the temple we grieved nobody. The Worm has them; that was all the prayer there was." She seems to be deciding which is better.` : ''}${b4In('tebbet') ? `\n\nTebbet sleeps further from the fire than anyone, with his bow under him. "Horse archers," he says, when asked. "All round. I'll sleep when they've gone home."` : ''}${b43Sp({mirrel:()=>`Mirrel goes round ${b4In('marrow') ? 'after Marrow ' : 'the squad '}with the red-hand bag: blisters, a cut lip, a recruit of the 10th who walked into a tent-pole. ${b4In('marrow') ? 'The two of them pass each other at the edge of the firelight and argue about a poultice in whispers.' : '"Sit still," she tells each one. Each one does.'}`, yorin:()=>`Yorin drinks a cup of water after the drink, without being told, ${b4In('mirrel') ? 'because Mirrel is watching him' : 'because the healer at Aren told him to and he is trying to be better'}, and then falls asleep holding the cup.`, rasp:`Rasp sleeps with one hand on the satchel and the other on her belt-file, like somebody who has been robbed once and did not like it.`})}${b43R({orvas:`\n\nOrvas sleeps across the fire from the sergeant, near enough to hear the herd move.`, redblade:`\n\nRamin cleans his sword, which is clean, and is offered drink four times, and refuses four times, very politely.`, warlock:`\n\nKeth sleeps, and the grandmother, in his sleep, sings something about horses.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c3_feast'}]}),
    b4_c3_feast_swap:()=>({sp:'The Third\'s fire', scene:'b4_feast', txt:
`${b4In('orvas') ? `Orvas comes across the camp from his clan's fires at a run, as if somebody might change their mind, and puts his kit down by the fire. "The herd sent for me," he tells the Khundryl at the next fire, loudly. They cheer.` : b4In('redblade') ? `Ramin comes across the camp from the Red Blades' lines on foot, picking his way between sleeping Khundryl. He puts his kit down by the fire. "Back," he says. "My captain did not argue. I think he is relieved."` : b4In('warlock') ? `Keth comes across from the Wickan youths, three fires over, with the grandmother complaining about the drunks underfoot. He puts his kit down. "*Temul lets him go,*" she says. "*Temul has three thousand horse now. He can spare a boy.*"` : `The swap is made. The fire takes it calmly.`}`,
      ch:[{t:'Back to the fire.', go:'b4_c3_feast'}]}),
    b4_c3_feast_talk:()=>{ const late = !!S.f.b4_c3_brawlDone, ln = [];
      if (b4In('haddat')) ln.push(late ? `Haddat is looking east, toward the river, though there is nothing to see. "Tomorrow," she says. "I will say the names at the water. All of them. It will take a long time." She does not ask if anybody minds.` : `Haddat has a horn in her hand she has not drunk from. "They rode away," she says, of the Khundryl. "Before the end. Now they bring us drink." She drinks, at last, a little. "It is good drink. I am still angry."`);
      if (b4In('sathi')) ln.push(late ? `Sathi has her feet on Hackle and her head on a Khundryl saddle that is not hers. "Tomorrow the river," she says. "I rode across it last time. I am walking it this time." She does not grin.` : `Sathi has been arguing with three Khundryl riders about horses for an hour, at the top of her voice, in three languages. She comes back to the fire hoarse and happy. "They are wrong about everything," she says. "I like them."`);
      if (b4In('tangle')) ln.push(late ? `Tangle has the satchel open on his knee, counting by the coals. "The 8th's sappers are going to blow the ford," he says. "Crackers and cussers, the word is. The whole bank." He looks east. "Clean work, if they do it right."` : `Tangle has the satchel on his knee and a horn in his other hand. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "And a Khundryl offered me two horses for the cusser. Two." He drinks. "I nearly did it."`);
      if (b4In('marrow')) ln.push(late ? `Marrow has her string out, not tying anything. "The warren is very full here, child," she says. "Like a well somebody has thrown too many stones in. It is the river. It is what is in the river." She puts the string away.` : `Marrow is watching the Khundryl weep and laugh at the next fire. "They do it properly," she says. "Both at once. I have been trying to teach Malazans that for thirty years." She ties a knot, for no reason she gives.`);
      if (b4In('tallow')) ln.push(late ? `Tallow has his grandmother's deck in its oilcloth on his knee. "She said the dead in the water were the sea's," he says. "You didn't fish where a boat went down. Not for a year." He looks east. "We're going to walk through it."` : `Tallow has learned the first half of a Khundryl drinking song and is singing it to anyone who will listen, over and over. "I don't know what it means," he says, happily. "Nobody will tell me."`);
      if (b4In('hessa')) ln.push(late ? `Hessa is sharpening her spear by feel. "The temple taught me a river is the Worm's road," she says. "Everything that goes in, she has. In the end." She tests the edge. "The priests who taught me that never stood in one. Tomorrow I will, and pray in it, and see if she answers there too."` : `Hessa has a horn of the milk-spirit and has not touched it. "A temple guard does not drink on duty," she says. Then she drinks it, all of it, at once. "I am not a temple guard."`);
      if (b4In('tebbet')) ln.push(late ? `Tebbet is restringing his bow. "The river's down there," he says. "I can hear it from here." He listens. "I'd rather not."` : `Tebbet is watching a Khundryl woman string a horn bow with her knee. "That's a good bow," he says, with longing. "That's a better bow than mine." He thinks about it. "Don't tell her."`);
      if (b4In('darrut')) ln.push(late ? `Darrut has his boots off and his feet to the coals. "Aren had a story about the Vathar," he says. "After the Chain. That the river ran slow for a month." He shrugs. "Aren had a lot of stories."` : `Darrut has been taught to ride a Khundryl pony by four children and has fallen off it six times. He is sitting by the fire with a split lip and the best mood anybody has seen him in since Aren.`);
      if (b4In('mirrel')) ln.push(late ? `Mirrel is rolling clean linen by the coals, three turns and a tuck, and not lending any of it. "Tomorrow there's nothing in that river I can mend," she says. "So tonight I'm getting ready for the day after." She rolls another.` : `Mirrel has stitched two Khundryl and a recruit of the 10th since the drink came out, and been paid in drink for all three. "It's a feast," she says, threading the needle again. "Feasts are the busiest night a hospice has. Everybody falls over something."`);
      if (b4In('yorin')) ln.push(late ? `Yorin is lying on his back with the copper vane on his chest, watching it. "There's a wind off the river," he says. "Cold. It smells of —" He stops. "I'm not going to say what it smells of. Shadowthrone keep me, I'm not."` : `Yorin is sitting with three Khundryl youths who want him to make the fire jump. He makes it jump. They want it again. "It's not a trick," he tells them, which is a lie, and does it again.`);
      if (b4In('rasp')) ln.push(late ? `Rasp has the satchel open on her knee, touching each clay ball in turn without counting. "The 8th's lot are going to blow the whole ford," she says. "Crackers and cussers, end to end." She shuts the satchel, gently. "I'd give a year's pay to watch from close. I'll watch from far. That's how you get to be old in this trade."` : `Rasp has been offered a horse for the satchel, and then two horses, and then a saddle with silver on it. "I said I'd think about it," she says, hoarse. "I won't. But you have to let them feel heard."`);
      if (b4In('orvas')) ln.push(late ? `Orvas sits back from the fire, cleaning the black-tailed lance. "We met the Chain after the river," he says. "At Sanimon. We never saw this one." He looks east. "Tomorrow I will."` : `Orvas is lying on his back by the fire with a jar on his chest, looking at the stars. "I am going to cry now," he says, and does, loudly, for a while, and then laughs at something nobody else heard. "Better," he says.`);
      if (b4In('redblade')) ln.push(late ? `Ramin is sitting very straight with his helm on his knee. "Fist Baralta told the Adjunct the river tribes would take it badly," he says, "blowing the ford. Their offerings are on the poles. I heard him." He shrugs. "Gall says he has sent word to them."` : `Ramin is sitting very straight with a horn of water. "A Khundryl asked me if the Red Blades have any horses," he says. "I said yes. He asked if we would like to see some real ones." He considers it. "I will not forgive him."`);
      if (b4In('warlock')) ln.push(late ? `Keth is lying with his face toward the river. "*Full,*" the grandmother says. "*The whole bank. They have not moved on.*" Keth, his own voice: "She means the dead."` : `Keth is grinning at nothing. "*Three thousand Wickans,*" the grandmother says, delighted, of the Khundryl. "*The Crow will die of it.*"`);
      if (b43Dog() && !b4In('sathi')) ln.push(`Hackle lies across your boots, watching the Khundryl dogs, who have not decided about him.`);
      return {sp:'The Third\'s fire', scene:'b4_feast', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, among the Khundryl's noise, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b4_c3_feast'}]}; },

    /* ---- the feast: the shamans, the mourner, the war chief, Orvas, the youths, Radde ---- */
    b4_c3_shaman:()=>({sp:'The Khundryl shamans', scene:'b4_feast', fx:()=>{ S.f.b4_c3_shaman = 1; }, txt:
`At the biggest fire, near the middle of the camp, the Khundryl's shamans are reading the army. Three of them, old, in horsehide gone bald with age, throwing something into the fire that makes it burn blue and smell of hair, and looking at the smoke, and looking at the Fourteenth's soldiers round the fire, one after another, as if the smoke and the soldiers were the same thing.

They say it in their own tongue, and somebody says it in Malazan after them, and it goes out round the fires and through the camp in a quarter of an hour, the way everything does: *A long life, for this army. A long but restless life. A life of searching.*

The 9th's recruits behind the shamans are passing it back and forth between them, turning it over, trying to decide if it is good.${b43Say({marrow:` "That is a priest's answer, child," Marrow says, beside you. "It can be carved on anything."`, haddat:` "Searching," Haddat says. "For what? They do not say for what."`, _:''})}${b43Sp({mirrel:`"Long," Mirrel says, unimpressed. "The hospice priests told every woman in labour she'd have a long life. It kept them pushing."`, yorin:`Yorin is watching the blue smoke go up, and where the night wind takes it. North. Every scrap of it goes north. "Restless," he says, very quietly. "Yes. The sky thinks so too."`})}${b43R({orvas:`\n\n"They said that to my grandfather's war-band," Orvas says. "Before the Odhan. He lived to be very old." He thinks. "He never stopped riding."`, redblade:`\n\n"In Ehrlitan the priests say such things for silver," Ramin says. "These do it for nothing. That is worse, I think."`, warlock:`\n\n"*Restless,*" the grandmother says. "*Yes. That one, they got right.*"`})}`,
      ch:[{t:'Tell the recruits it\'s a blessing: a long life.', fx:()=>{ S.f.b4_c3_shamanTold = 'bless'; b4Nerve(1, 'The recruits heard a long life'); b43L('haddat', -1); }, go:'b4_c3_shaman_told'},
          {t:'Tell them what it sounds like: a long road, and no rest on it.', fx:()=>{ S.f.b4_c3_shamanTold = 'true'; b43L('haddat', 1); b43L('marrow', 1); }, go:'b4_c3_shaman_told'}]}),
    b4_c3_shaman_told:()=>({sp:'The Khundryl shamans', scene:'b4_feast', txt: S.f.b4_c3_shamanTold === 'bless' ?
`"A long life," you tell the freckled girl, who has come to the Third to ask. "Every one of you. That's what it means." She takes it back to the others like water in her hands, carefully, so as not to spill it, and you watch it go round, and the faces change.

It is not a lie. It is most of the truth. The other part is on the shamans' faces, by the blue fire, and the recruits are not looking at the shamans.` :
`"A long road," you tell the freckled girl, who has come to the Third to ask. "And no rest on it. That's what it sounds like." She thinks about that a long breath, the way she thought about the spear. "Long's good," she says at last. "Long means we're on it."

She takes that back to the others. Some of them like it. Some of them go and get another horn.${b43Say({haddat:` Haddat watches her go. "She will make a soldier," she says, "if she lives." It is the kindest thing she has said about a recruit since Aren.`, _:''})}`,
      ch:[{t:'Back into the feast.', go:()=>startExplore()}]}),
    b4_c3_mourner:()=>({sp:'An old Khundryl woman', scene:'b4_feast', txt:
`An old Khundryl woman sits alone at a small fire at the edge of the camp, with a horn she is not drinking and a horse standing behind her with its head over her shoulder. The black tears on her face are old, gone blue-grey, the way ink goes.

She looks at the squad's faces, and at ${S.f.b4_bone === 'chain' ? 'what is tied to the bones at your throats' : 'the bones at your throats'}, and knows what you are.

"The Chain," she says, in a Malazan learned from traders. "You walked it. All the way." She nods slowly, to herself. "We rode beside you a while. Then we rode away. Gall says we came to grieve the loss of ourselves." She puts the horn down. "But nobody grieved for you. Not properly. Not the Khundryl way. The Malazans buried you with a trumpet and a list." She looks at the squad. "Sit. I will teach you. It is a debt."${b43R({orvas:`\n\nShe looks at Orvas, and says something sharp in Khundryl, and he goes red under the black and sits down at once.`, redblade:`\n\nShe looks at Ramin's red scale and laughs, not unkindly. "Even you," she says. "Sit."`, warlock:`\n\nShe looks at Keth, and the grandmother looks back out of his eyes, and the two old women nod to each other like two queens across a road.`})}${b43Sp({mirrel:`She takes Mirrel's hands, both of them, and turns them over in the firelight. "Healer," she says. "You have held too many. You will learn this fastest." Mirrel does not take her hands back.`})}`,
      ch:[{t:'Sit, and learn the cry. (the Black Tears)', check:['guile', 16], trick:'b4_c3_tears', req:()=>!S.f.b4_c3_tearsTried, fx:()=>{ S.f.b4_c3_tearsTried = 1; },
            edges:id=>[id === 'orvas' && ['he has grieved this way since he could talk', 3], id === 'sathi' && ['the Weasels keened for their dead too', 1], id === 'haddat' && ['she says the names every night', 1], id === 'warlock' && ['the grandmother keened for half a clan', 1], id === 'hessa' && ['she grieves nobody, and cannot start', -1], id === 'tebbet' && ['he would rather grieve on his own', -1], id === 'mirrel' && ['she has sat with a great many dying, and heard this cry in the hospice, without the words for it', 1], id === 'rasp' && ['a cusser took the top off her voice; what is left will not go that high', -1]],
            near:{t:()=>`Yes, but the cry takes everything ${NAME(ROLL().who || 'sgt')} has kept down since the Chain and brings it up at once, in front of three Khundryl fires. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c3_mourner_ok', fail:'b4_c3_mourner_no'},
          {t:'"Another night, mother."', go:()=>startExplore()}]}),
    b4_c3_mourner_ok:()=>({sp:'An old Khundryl woman', scene:'b4_feast', txt:
`She makes ${by({sgt:'you', _:'{who}'})} do it with her, at her small fire, with her hand flat on ${by({sgt:'your', _:'{who}\'s'})} back between the shoulders, the way you hold a child who is learning to swim. *Not with the throat. From under it. From where you put them.* The first time it comes out as a cough. The second as a word. The third time it comes out as what it is: a cry with no words in it, going up and up and on longer than a breath should let it, for everybody from Hissar to Aren.

At the next fire the Khundryl stop talking. Then, one by one, they join it.

When it stops ${by({sgt:'you are', _:'{who} is'})} shaking, and the old woman is laughing, softly, and wiping ${by({sgt:'your', _:'{who}\'s'})} face with the end of her sleeve. "There," she says. "Now they have been grieved. Now you can laugh." The laugh does not quite come. But it is nearer than it was.

"In a fight," she says, "it does something to the ones who hear it. They remember their own dead. They falter." She shrugs. "It is not sorcery. It is only grief. Grief is older."`,
      ch:[{t:'"Thank you, mother."', go:()=>startExplore()}]}),
    b4_c3_mourner_no:()=>({sp:'An old Khundryl woman', scene:'b4_feast', txt:
`She tries. ${by({sgt:'You try', _:'{who} tries'})}. It comes out as a cough, and then a word, and then a cough again, and every time it nearly gets there it stops in the throat like a stone in a sling. The old woman shakes her head, at last, gently.

"Malazan," she says. "You have it in a box. You will have to open the box." She picks up her horn. "Another night. Or never. Some people never." She does not seem to think less of you for it.`,
      ch:[{t:'Back into the feast.', go:()=>startExplore()}]}),
    b4_c3_gall:()=>({sp:'A Khundryl war chief', scene:'b4_feast', fx:()=>{ S.f.b4_c3_gall = 1; gain('b4_c3_cup'); }, txt:
`A big man comes along the fires with two warriors behind him, stopping at each one: a broad, heavy Khundryl in bronze scale under a horsehide mantle, grey coming into his braids, and on his face the black tears, thick and fresh and running all the way to the jaw. He stops at every fire. He does not sit at any. At the Third's he stops longer.

He looks at the squad, and at ${S.f.b4_bone === 'chain' ? 'what is tied to the bones at your throats' : 'the bones at your throats'}, ${b4In('haddat') ? 'and at Haddat\'s blue shield, ' : ''}and at the Chain written all over the squad, and he knows what he is looking at. Everybody in the camp knows who he is.

"You were there," Gall says. "At the end. We were not." He says it as if it were a wound he was showing you, and proud of how deep it goes. He takes the horn from the warrior at his shoulder, fills it from a skin, and holds it out. "Drink. It does not pay anything. Nothing pays it. Drink anyway."${b43Say({haddat:`\n\nHaddat looks at the horn a long breath. Then she takes it from his hand, before you can, and drinks, and gives it back to you. She does not thank him. He nods, as if that were the right answer.`, _:''})}${b43R({orvas:`\n\nOrvas has gone very still, with his eyes on the ground: a young rider near his war chief. Gall looks at him, and at the squad he is sitting with, and says one word in Khundryl. Orvas lifts his head.`, warlock:`\n\nKeth stands up as Gall comes, and the grandmother says something in Wickan, and Gall, to everybody's surprise, answers in it.`, redblade:`\n\nRamin stands up, very straight, as Gall comes. Gall looks at the red scale. "Red Blades," he says. "Some of you were with him too. At the end." He inclines his head to Ramin, a little, which is a great deal.`})}`,
      ch:[{t:'Drink.', go:'b4_c3_gall_2'}]}),
    b4_c3_gall_2:()=>({sp:'The war chief', scene:'b4_feast', txt:
`It is the milk-spirit, and something else in it, and it goes down like a hot coal. When you lower the horn the war chief has already gone on to the next fire, and the horn is still in your hand. He did not ask for it back.

It is a drinking horn cut short and capped with copper, a little dented, the kind of thing a man carries for twenty years. The Third's fire does not suggest going after him with it.`,
      ch:[{t:'Back into the feast.', go:()=>startExplore()}]}),
    b4_c3_orvas:()=>({sp:'A young Burned Tear', scene:'b4_feast', txt:
`A young Khundryl comes to the Third's fire, alone, without a horn, and stands just out of the firelight until you look at him. Lean as a tent-pole, half turned toward the horse lines as if he were always about to go back to them; lacquered leather and horsehair; a short lance with a strip of old red cloth on it; and the black tears down both cheeks, new enough that the skin round them is still pink.

"Orvas," he says. "Of the Burned Tears." He looks at the squad, at its faces, at the Chain on it. "You were Coltaine's. At the end." It is not a question. "My clan rode away from Coltaine before the end. My father. My uncles. Me. I held the horses." He says it steadily, as if he had practised. "We have grieved since. Every night, at every fire. I am tired of grieving at a fire."

He grounds the lance. "I want to stand with the ones who did not ride away. Gall says he will lend me to a Malazan squad, if a Malazan squad will have me. He thinks it is a very small piece of the debt." He grins, suddenly, wide. "I think so too. I am asking anyway."${b43Say({sathi:`\n\nSathi is looking at him with her head on one side, like a horse-trader. "Can you ride?" she says. "Properly?" He looks at her as if she had asked whether he could breathe.`, haddat:`\n\nHaddat looks at him for a long breath. She offers him no kindness. She offers no unkindness either, which for Haddat is a door left open.`, _:''})}${b43Sp({yorin:`Yorin looks at the lance, and at the horse lines behind the Khundryl, and says, to nobody in particular, "I could make a horse go faster. With the wind. If anybody needed that." Orvas looks at him with sudden and total attention.`, rasp:`Rasp looks him up and down. "Do you keep the horse with you?" she says. "Because the satchel goes on the other side of it. Always. That's the only rule."`})}${b4Recruit_() && b4Recruit_() !== 'orvas' ? `\n\n${NAME(b4Recruit_())}, beside you, looks at the Khundryl, and at the squad, and counts.` : ''}`,
      ch:[{t:'"Walk with us, Orvas."', fx:()=>{ b4Join('orvas'); }, go:'b4_c3_orvas_join'},
          {t:'"Stay with your clan, near. We\'ll send for you."', fx:()=>{ S.f.b4_orvasDone = 2; S.loy ??= {}; S.loy.orvas ??= 0; note('"Near," Orvas says. "Yes. Near is a Khundryl word too. Send at any fire, Sergeant. I will come at a gallop."'); }, go:'b4_c3_orvas_near'},
          {t:'"Go home, Orvas. Your clan needs you more than we do."', fx:()=>{ S.f.b4_orvasDone = 0; }, go:'b4_c3_orvas_away'}]}),
    b4_c3_orvas_join:()=>({sp:'Orvas · the Burned Tears', scene:'b4_feast', fx:()=>{ if (!S.f.b4_c3_knife) { S.f.b4_c3_knife = 'orvas'; gain('b4_c3_khundrylknife'); } }, txt: b4In('orvas') ?
`He lets out a breath he seems to have been holding since the Chain. Then he laughs, and goes to the horse lines, and comes back without a horse, which costs him something you can see. "A herd that walks," he says. "My grandmother would weep. Then she would laugh." He sits down at the fire. "I am doing both."

He takes a long curved knife off his belt, horn-gripped, a black bead on a thong at the pommel, and puts it in your hand. "Khundryl give these to people they mean to see again," he says. "So. Now you have to come back."` :
`He looks at the squad, and counts, and sees there is nobody's place to take. "Another walks with you already," he says. "Then I will be near, with my clan. Send at any fire." He takes a long curved knife off his belt, horn-gripped, a black bead at the pommel, and puts it in your hand anyway. "Khundryl give these to people they mean to see again."`,
      ch:[{t:'Back to the fire.', go:'b4_c3_feast'}]}),
    b4_c3_orvas_near:()=>({sp:'Orvas · the Burned Tears', scene:'b4_feast', fx:()=>{ if (!S.f.b4_c3_knife) { S.f.b4_c3_knife = 'orvas'; gain('b4_c3_khundrylknife'); } }, txt:
`"Near," he says again, trying it. Then he grins and takes a long curved knife off his belt, horn-gripped, a black bead on a thong at the pommel, and puts it in your hand. "Khundryl give these to people they mean to see again," he says. "So now I have to come when you send." He goes back to the horse lines at a run.`,
      ch:[{t:'Back to the fire.', go:'b4_c3_feast'}]}),
    b4_c3_orvas_away:()=>({sp:'Orvas · the Burned Tears', scene:'b4_feast', txt:
`He takes it standing, the way he must have stood holding the horses. Then he nods once. "Yes," he says. "That is what Coltaine would have said." He looks away. "The clan needs me. The clan needs everybody." He goes back to the horse lines, walking, which for a Khundryl is the saddest thing you have seen all night.${b43Say({haddat:` Haddat watches him go. "He held the horses," she says. "Somebody had to." Her face is turned away from you.`, _:''})}`,
      ch:[{t:'Back to the fire.', go:'b4_c3_feast'}]}),
    b4_c3_youths:()=>({sp:'Temul\'s Wickan youths', scene:'b4_feast', fx:()=>{ S.f.b4_c3_youths = 1; }, txt:
`The Wickan youths have a fire of their own at the edge of the camp, some forty of them, the ones who came through the Chain with Temul, and round it now there are Khundryl, dozens, sitting with them as if they had been invited. They have. The youths are not drunk; Temul is somewhere at the Adjunct's fire, and they are keeping his. But they are sitting up very straight, the way boys sit when three thousand horse have just been given to them.

The old Crow, the three hundred who came in by ship at Aren and would not have the boy, have their own fires further off, and are very quiet tonight.${b43Wickans() || b4In('warlock') ? `\n\n${b4In('warlock') ? 'Keth' : 'One of the youths who knew the squad on the Chain'} looks up at the Third and grins. "${b4In('warlock') ? 'Three thousand Wickans,' : 'Three thousand horse,'}" he says. "In a day. The Crow have gone grey."` : ''}${b43Say({sathi:`\n\nSathi crouches by the fire with the youths and says something in Wickan that makes the nearest ones hoot. She looks over at the Crow fires, and grins, every filed tooth. "Grey," she says. "Good."`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c3_radde_feast:()=>({sp:'Sergeant Radde', scene:'b4_feast', fx:()=>{ S.f.b4_c3_raddeFeast = 1; S.f.b4_c3_brawlNear = 1; }, txt:
`Radde is not drinking. He is sitting on a Khundryl saddle with the book open on his knee, writing by the firelight, while a Khundryl child tries to see what he is writing. He lets her.

"Word from the head of the column," he says. "The Khundryl's war chief told the Adjunct the crossing is a place of death. The Vathar. Tomorrow." He writes. "She said yes. The sappers of the 8th are going to clear the ford, the word is, because the ford's full. Of the Chain." He keeps writing. "I expect you know what it's full of, Sergeant. I expect you were there."

He turns a page. "And there's trouble starting at the 10th's fires, east. Some fool said something to the Khundryl about riding away. If a Fist sees it, it's floggings, and the Khundryl are guests." He looks at you at last. "I'd like it stopped before a Fist sees it."`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()},
          {t:'"We\'ll stop it."', onward:true, go:'b4_c3_brawl_start'}]}),
    b4_c3_horses:()=>({sp:'The Khundryl horse lines', scene:'b4_feast', txt:
`The horse lines are a long rope between stakes, with horses on it as far as the dark goes: small, deep-chested, ugly, with the kind of eyes that have seen everything a horse can see. They watch the feast without much interest. A Khundryl boy walks along them with a bucket, talking to each one by name.

${b43Say({sathi:`Sathi goes down the line from horse to horse, and every one of them puts its nose in her hand. "Good," she says to each one, in Wickan. "Good. Good." She comes back to the squad a different shape than she left it.`, orvas:`Orvas walks the line with his hand on every neck, and stops at a grey mare, and stands with his forehead against hers for a while. "Mine," he says. "She is angry with me too."`, _:`The horses watch the squad. The squad watches the horses. It is a draw.`})}${b43Sp({yorin:`Yorin stays at the end of the line. When he comes nearer the horses lift their heads and turn their ears to him, all down the rope, the way they turn them to thunder a valley off. "They can tell," he says, unhappily. "They always can."`, rasp:`Rasp keeps well back from the hind ends. "Clever animals," she says. "Know exactly where to put a foot. I've met sappers who didn't."`})}`,
      ch:[{t:'Back to the fires.', go:()=>startExplore()}]}),

    /* ---- the brawl at the edge of the fires ---- */
    b4_c3_brawl_start:()=>({sp:'The 10th\'s fires', scene:'b4_feast', fx:()=>{ S.f.b4_c3_brawlNear = 1; }, txt:
`At the edge of the camp, between the 10th's fires and the last of the Khundryl's, two crowds are standing in the firelight with a yard of trampled grass between them. On one side, recruits of the 9th and the 10th, very drunk, with jars and tent-poles. On the other, Khundryl youths, younger than the recruits and soberer, with lance-butts. In the middle, a regular of the 10th with a loud voice is saying it again, so everybody can hear:

"*Rode away.* That's what I heard. Rode off and left Coltaine to the crows, and now they want a drink for it." He spits. "Tears. Paint it on, does it wash off when you run?"

The Khundryl youths have gone very still. The ones in front have their lance-butts up. Behind them, older Khundryl are getting up from the fires.${b43Say({haddat:`\n\nHaddat stands up, and her shield comes with her. "He is right that they rode away," she says, low, in Hissari. "And he is wrong about everything else." She sounds as if she has not decided which to hit.`, darrut:`\n\nDarrut puts his helm on. "This," he says, "is the Guard's favourite kind of night."`, _:`The squad stands up.`})}${b43Sp({mirrel:`Mirrel puts down her horn and picks up her bag. "Fists I can mend," she says. "Lances I can mend. Floggings take a month. Keep it to fists."`, yorin:`Yorin flexes his fingers and looks at them, and puts them in his armpits. "No lightning," he says to himself. "Not at a feast. Not at guests."`, rasp:`Rasp has a hand in the satchel and an eye on the gap between the crowds. "Smoker," she says. "Never hurt anybody, a smoker. Mostly."`})}${b43R({orvas:`\n\nOrvas has gone white under the black. He has his lance in both hands. "Sergeant," he says, very quietly. "I would like to kill him. I am asking you not to let me."`, redblade:`\n\nRamin stands, and sees the red scale catch the light, and sees every recruit of the 10th see it too. "Ah," he says. "They are going to hit me as well."`, warlock:`\n\n"*Children,*" the grandmother says out of Keth's mouth, loud and clear. It does not help.`})}

Fists, then. Staves. The Khundryl are guests, and no one wants a dead recruit or a dead Khundryl the night before the river, and no one wants a Fist to see.`,
      ch:[{t:'"Shields. No blades." Get between them.', go:()=>startBattle('b4_c3_brawl', {})},
          {t:`${b43Sap()} drops a smoker between the two crowds.`, tag:'uses 1 smoker', req:()=>b43HasSap() && (S.inv.smoker || 0) > 0, fx:()=>{ S.inv.smoker--; }, go:()=>startBattle('b4_c3_brawl', {pre:true})},
          {t:'Talk them apart. ("The Khundryl came back. Most people don\'t.")', check:['guile', 15],
            edges:id=>[id === 'orvas' && ['he can say it to the youths in Khundryl', 2], id === 'tallow' && ['half the recruits came over on his transport', 1], id === 'darrut' && ['he has talked down a hundred Aren drunks', 1], id === 'haddat' && ['she is still angry with the Khundryl herself', -1], id === 'mirrel' && ['she has talked drunks off a hospice floor every feast-night of her life', 1], id === 'redblade' && ['he is wearing red scale', -2]],
            near:{t:'Yes, but the loudmouth has already thrown his jar before he stops to listen, and it has broken on somebody\'s head.', fx:()=>{ const w = ROLL().who || 'sgt'; bruise(w, 3 + lvT()); }},
            go:'b4_c3_brawl_talked', fail:'b4_c3_brawl_fail'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c3_brawl_fail:()=>({sp:'The 10th\'s fires', scene:'b4_feast', txt:
`${by({sgt:'You talk', _:'{who} talks'})}, and some of them listen, and then the loudmouth throws his jar at the nearest Khundryl, and it breaks, and the listening is over on both sides at once.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c3_brawl', {surprise:'e'})}]}),
    b4_c3_brawl_talked:()=>({sp:'The 10th\'s fires', scene:'b4_feast', txt:
`${by({orvas:`Orvas steps out between the two crowds and says something to the Khundryl youths in their own tongue, fast and low, and the ones in front lower their lance-butts and look at him, and then at the Third behind him, and step back.`, tallow:`Tallow steps out in front of the recruits, which nobody told him to do, and starts talking to them one at a time, by name: you were sick from Unta to Aren, I held your head. They stop. The ones he named stop first.`, mirrel:`Mirrel walks out between the two crowds with her bag open, and starts sorting linen on the grass at their feet, three rolls, in a row. "Whoever's first," she says, not looking up, "gets the clean ones." The ones in front look at the linen, and then at each other, and lower their hands.`, _:`{who} steps out between the two crowds and talks, slowly, to both of them, and one by one the ones in front stop.`})}

Not the loudmouth. He looks round at the recruits who have stopped, and his face goes ugly, and he swings his tent-pole at the nearest of the Khundryl anyway, and a handful of drunks go with him because they have come this far, and a handful of youths go to meet them.`,
      ch:[{t:'Shields. Fewer of them now.', go:()=>startBattle('b4_c3_brawl', {surprise:'p'})}]}),
    b4_c3_brawl_after:()=>({sp:'The 10th\'s fires', scene:'b4_feast', fx:()=>{ S.f.b4_c3_brawlDone = 1; if (!S.f.b4_c3_knife) { S.f.b4_c3_knife = 'feast'; gain('b4_c3_khundrylknife'); } }, txt:
`Radde comes across the grass with a lantern and two provosts, and a grey-braided Khundryl elder walking beside him with a whip coiled in his hand, and the two crowds see them and remember they are drunk. The loudmouth of the 10th is sitting in the grass holding his nose. The Khundryl youths are holding each other back, which is easier now that nobody is pulling. None of them is dead, or going to be.

No Fist saw it. The provosts take the loudmouth away to sober up somewhere cold. The Khundryl elder says something to his youths that makes them hang their heads, and then something to the squad, in Khundryl, that nobody translates.${S.f.b4_c3_knife === 'feast' ? `\n\nOne of the youths, a boy with fresh tears on his face and a split lip, comes up to the squad afterward, sheepish, and holds out a long curved knife, horn-gripped, a black bead at the pommel. "For standing between," he says, in very bad Malazan. "Khundryl give these to people they mean to see again." He goes red, and runs.` : ''}

Radde looks at the squad, and at the grass, and writes something. "No Fist," he says. "Good. I'll write that." He shuts the book. "Get some sleep. The river's tomorrow."${b43Sp({mirrel:`Mirrel goes along the grass on her knees afterward, from a recruit to a Khundryl to a recruit, without asking which side anybody was on. "Hold that," she says, and "Chin up," and "You'll have a scar, and you'll lie about it." The loudmouth's nose she sets last, and not gently.`, rasp:`Rasp picks the smoker's casing out of the grass and puts it in her pocket. "Not a scratch on anyone," she says, hoarse and pleased. "Lovely stuff, a smoker. I like to tidy up after it."`})}${b43R({orvas:`\n\nOrvas is shaking a little, with the lance across his knees. "I did not kill him," he says. "Write that down too."`, redblade:`\n\nRamin is wiping blood off his knuckles. "He hit me first," he says. "Put that in the book."`, warlock:`\n\nKeth is sitting on the loudmouth's tent-pole. "*Children,*" the grandmother says again, satisfied.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c3_feast'}]}),
    b4_c3_to_ford:()=> !S.f.b4_c3_brawlDone ? ({sp:'The edge of the camp', txt:
`East, past the last fires, the ground goes down in the dark toward the river. It will still be there in the morning. There is shouting at the 10th's fires that Radde will want stopped first.`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The road to the river', scene:'b4_c3_shadow', txt:
`The Fourteenth wakes late and sore and marches badly, with three thousand Khundryl round it now like a second army, and all day the hills go down. By afternoon the grass is greener, and there are trees in the folds, and the air smells of water. The column's head stops. Then the 8th. Then the 9th.

Below, at the bottom of the last hill, the Vathar runs wide and brown and slow between its banks, and the army comes down to it the way you come into a room where somebody has died.${b43Sp({yorin:`"River air," Yorin says, at the top of the last hill, and then nothing else all the way down.`})}`,
      ch:[{t:'Down to the river.', onward:true, go:()=>{ S.f.b4_c3_ph = 3; startExplore('b4_c3_ford'); talk('b4_c3_ford_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- Vathar Crossing: the near bank at dusk ---- */
    b4_c3_ford_arrive:()=>({sp:'Vathar Crossing', scene:'b4_c3_ford', fx:()=>{ S.f.b4_c3_ford = 1; b4Nerve(-1, 'The bones in the ford'); }, txt:
`The ford is where it was. The river goes over it wide and shallow and brown, as it did, and on the far side the trees begin, as they did. But it is a different shape. The water humps and slows across the whole width of the crossing in long dark banks just under the surface, like a weir somebody built without meaning to. Things stand up out of it here and there, pale, that are not reeds. The current goes round them.

All along the near bank there are poles driven into the mud, dozens of them, old and new, with things tied to the tops of them: carcasses, mostly, goats and dogs and a horse's head, gone black in the sun, and braids, and strings of something that rattles when the wind takes it. The tribes have been bringing offerings to the river since the Chain went over. The 9th keeps clear of the poles.

The Third stands on the bank and looks at the water. This was the worst day. Of all of them, from Hissar to Aren, this was the worst day. ${b43Lost()}${b43Barrow() ? `\n\n${b43Barrow()}` : ''}

${b43Say({haddat:`Haddat walks down to the water's edge, alone, and stands there with the shield on her arm, and begins to say the names. She says them quietly, in order, the way she says them every night. It takes a long time. The Third lets her.`, marrow:`Marrow walks down to the water's edge and stands with her hands open at her sides, the way she stood in it once, silent.`, _:`The squad stands on the bank and looks at the water, and for a while that is all it does.`})}${b4In('tallow') ? `\n\nTallow stands a pace behind the squad, not sure he is allowed nearer. He does not ask what the pale things are. He has worked it out.` : ''}${b4In('hessa') ? `\n\nHessa goes down on one knee on the bank, with the spear laid flat and her palm on the mud, and prays to the ground, briefly, the way she does at dusk. When she gets up there is mud to the wrist. "She has them," she says. "The Worm. She had them before the river did." It is meant as comfort. In Kartool it would have been.` : ''}${b43Sp({mirrel:`Mirrel stands with her bag on her shoulder and her hands at her sides. She came to the Fourteenth to mend people. There is nobody here to mend, and she looks at the water as if that were a personal failing.`, yorin:`Yorin has his arms wrapped round himself. "The air's wrong over it," he says, very low. "Heavy. Like before a storm, and no storm coming." He does not take out the vane.`, rasp:`Rasp looks at the banks under the water, how they lie, how the current goes round. She does not say anything about it. It is the first thing all week she has not had a word for.`})}${b43R({orvas:`\n\nOrvas stands with them. "We met you after the river," he says, very low. "At Sanimon. Nobody told us about this." He looks at the water. "Now I know why nobody told us."`, redblade:`\n\nRamin stands with his helm under his arm. "Half my company is in a river like this one," he says. "The Sekala." That is all of it.`, warlock:`\n\nKeth has gone down on one knee at the water's edge. The grandmother is silent. That is the worst thing about it.`})}`,
      ch:[{t:'Walk the bank.', go:()=>startExplore()}]}),
    b4_c3_poles:()=>({sp:'The offering poles', scene:'b4_c3_ford', txt:
`Up close the poles are old wood and new wood, some of them carved, some of them hung with so many braids and strings that the pole itself is gone under them. A dog's skull. A goat, recent, its eyes taken by the birds. A horse's tail, plaited with red thread. The things that rattle are knucklebones, threaded, and the knucklebones are not a goat's. The flies are loud.

The tribes along the river put them up for the dead in the water: to say the dead are the river's now, a camp-guide of the 10th says, and the river is theirs.${b43Say({haddat:` Haddat reads the braids, and the carving, and says, "They are mourning poles. Not curses. They are mourning our dead." She sounds as if she does not know what to do with that.`, _:''})}${b43Sp({yorin:`The wind comes up off the river and the knucklebones rattle, all along the bank, at once. Yorin flinches, and then looks ashamed of it. "Just wind," he says. "I know wind. That's just wind."`})}${b43R({redblade:`\n\n"Fist Baralta told the Adjunct the tribes would take it badly if the army blew the ford," Ramin says. "The poles. I heard him say it. She said the army would cross."`, orvas:`\n\n"Gall has sent word to the river people," Orvas says. "That the army will cross, and what it will do. That they should keep away." He looks at the fresh goat. "Some of them will not listen. Some of them never do."`, warlock:`\n\n"*Leave them,*" the grandmother says, out of Keth's mouth, very quietly. "*They are doing it properly.*"`})}`,
      ch:[{t:'Leave the poles alone.', go:()=>startExplore()}]}),
    b4_c3_bones:()=>({sp:'The bone-banks', scene:'b4_c3_ford', txt:
`From the edge of the shallows you can see into the nearer of the banks, a little, where the water runs thin over it: a long dark shape under the brown, and in it, packed together the way the current packed them, shapes you know. A shield-rim. The curve of something. Cloth that was blue. The river has been at them for a year, and the river is patient.

${b43Say({marrow:`Marrow looks for a while, and then turns away. "There is nothing to heal there, child," she says. "There is only carrying."`, mirrel:`Mirrel looks for a while, and then turns away, and finds her hands have gone to the bag on their own. She takes them off it. "Nothing to mend," she says. "Only carrying."`, rasp:`Rasp looks at the bank a long breath, the length and the depth of it. "Two cussers and a crate of crackers," she says, quietly, "would take that out to the far side." Then: "I'd rather not be the one." It is the first time anybody in the squad has heard her say that about anything.`, tangle:`Tangle looks, and then looks away, and counts the satchel. "Two cussers and a crate of crackers," he says, "would take that bank out to the far side. Clean." He is neither happy about it nor unhappy, and that is the sapper in him.`, _:`The squad looks, and then looks away.`})}${b43Sp({mirrel:()=> b4In('marrow') ? `Mirrel stands beside Marrow and looks where she looks. Two healers on a bank of the dead. Neither of them reaches for the warren.` : '', rasp:()=> b4In('marrow') ? `Rasp looks at the bank a long breath, the length and the depth of it, and works out the charge without meaning to. Then she makes herself stop.` : ''})}${S.f.b4_bone === 'chain' ? `\n\nThe bones at the squad's throats, with ${S.f.b4_c1_token === 'feather' ? 'the crow feather' : S.f.b4_c1_token === 'string' ? 'Marrow\'s knot' : S.f.b4_c1_token === 'thread' ? 'Haddat\'s blue thread' : 'the Chain\'s tokens'} tied to them, feel heavier here.` : ''}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c3_rope:()=>({sp:'The old ferry post', scene:'b4_c3_ford', txt: S.f.b4_c3_rope || S.f.b4_c3_ropeNo ?
`The old ferry post, leaning out over the water with ${S.f.b4_c3_rope ? 'a fresh-cut end where the squad took its fathom of rope' : 'the old rope still on it, set like iron'}.` :
`A thick post of black wood sunk into the bank at an angle, leaning out over the water, older than anything else on this shore. A rope runs from it out into the river and down under the surface toward the far bank: hemp as thick as a wrist, black with the water and set hard. The ferry used to run on it, the camp-guides say, before there was a bridge, before the ford was anybody's.`,
      ch:[{t:'Cut a length of it free. (the old rope is set like iron)', check:['might', 14], req:()=>!S.f.b4_c3_rope && !S.f.b4_c3_ropeNo,
            edges:id=>[id === 'darrut' && ['he has pulled on a lot of ropes on a lot of walls', 1], id === 'hessa' && ['a temple door is mostly rope and patience', 1], id === 'orvas' && ['he has cut a lot of rope off a lot of horses', 1], id === 'marrow' && ['she is old for it, and she knows it', -1], id === 'tallow' && ['he grew up on boats; he knows exactly how hard this is', 1], id === 'rasp' && ['the file on her belt has cut worse than rope', 1]],
            near:{t:()=>`Yes, but the old rope fights to the last strand, and comes free all at once, and takes the skin off ${NAME(ROLL().who || 'sgt')}'s palms with it. ${3 + lvT()} health down at the start of the next fight.`, fx:()=>bruise(ROLL().who || 'sgt', 3 + lvT())},
            go:'b4_c3_rope_ok', fail:'b4_c3_rope_no'},
          {t:'Leave it.', go:()=>startExplore()}]}),
    b4_c3_rope_ok:()=>({sp:'The old ferry post', scene:'b4_c3_ford', fx:()=>{ S.f.b4_c3_rope = 1; gain('b4_c3_ferryrope'); }, txt:
`${by({tallow:`Tallow does it the way the boat-men did it at home: a knife, a lot of swearing, and his whole weight on the rope at the right moment. A fathom of it comes away in his hands, black and stiff. "My grandfather said ferry rope's lucky," he says. "Because it always goes across and it always comes back."`, rasp:`Rasp takes the file off her belt and goes at the rope with it, strand by strand, hoarse with swearing, until a fathom comes away black and stiff in her fist. "Good rope," she says. "Wasted on a ferry. You could hang a mine-charge off that for a year."`, _:`{who} saws and pulls and saws, and a fathom of the old rope comes away all at once, black and stiff, smelling of the river.`})} It goes into the kit, and then, because somebody thinks of it, round a wrist.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b4_c3_rope_no:()=>({sp:'The old ferry post', scene:'b4_c3_ford', fx:()=>{ S.f.b4_c3_ropeNo = 1; }, txt:
`The rope is set like iron. ${by({sgt:'You saw', _:'{who} saws'})} at it until the knife is blunt and the hand is raw, and it does not part. It has held the ferry against the Vathar for longer than the Empire has had a name for this river. It will hold against the Third.`,
      ch:[{t:'Leave it.', go:()=>startExplore()}]}),
    b4_c3_sappers:()=>({sp:'Down the bank', scene:'b4_c3_ford', fx:()=>{ S.f.b4_c3_sappers = 1; }, txt:
`Far down the bank, at the head of the ford where the 8th is camped, there are men at the water's edge in marines' gear: a sergeant and a handful of his squad, and a long-faced sapper wading out to the knee with a pole, prodding the bone-banks, and wading back, and saying something, and wading out again. Another, crouched on the bank, is laying out crates in a row in the last of the light.

Marines of the 8th. The ones who went out to look at the Khundryl, the camp says. They are going to blow the ford in the morning. ${b43Say({rasp:`\n\nRasp watches them with the look of somebody standing outside a bakery. "Marines," she says. "That's the good fuse he's laying. The long stuff." She watches the long-faced one prod the bank, and wade back, and prod again. "He's checking for holes. That's a careful man, Sergeant. That's what the school said they were like, and I never believed it." She does not go down the bank. She would like to, and she does not, and she keeps that to herself so loudly the whole squad can hear it.`, tangle:`\n\nTangle watches them, unmoving, until the light goes. "Crackers," he says at last, very softly. "And cussers. Laid along the banks, the whole width. He's checking for holes first. That's a careful man, Sergeant." He does not go down the bank to them. He does not ask to. "I'd like to watch," he says. "From here."`, _:'The Third watches from where it is. It is not the Third\'s work, or the Third\'s ford, after tonight.'})}`,
      ch:[{t:'Leave them to it.', go:()=>startExplore()}]}),
    b4_c3_hollet_ford:()=>({sp:'Captain Hollet', scene:'b4_c3_ford', fx:()=>{ S.f.b4_c3_holletFord = 1; }, txt:
`Hollet is sitting on a rock above the bank with his tablet on his knee and nothing written on it. He has been looking at the river for some time.

"I kept the garrison's books at Genabaris," he says, without looking up, "the year the Chain was on the march. We had the dispatches. Numbers, every week. So many crossed, so many lost. This was a number. I copied it out myself." He is quiet. "I didn't know it would look like this. You don't, from a number."

He looks at the squad then. "The Fist says the sappers will clear it at dawn and we'll cross dry, and good riddance. I expect he's right." He turns the stylus over. "I'd understand, Sergeant, if the Third wanted to see to its own first. The 9th's stretch is the bit below us. I didn't say that, either."${b43Sp({mirrel:`"Numbers don't bleed, sir," Mirrel says, not unkindly. "That's what they're for." Hollet looks at her, and nods, and looks back at the river.`})}`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),

    /* ---- the key: carry the dead out, or let the munitions take the ford ---- */
    b4_c3_key:()=>({sp:'Sergeant Radde', scene:'b4_c3_ford', txt:
`Radde is standing at the water's edge on the 9th's stretch of the bank, a reach of the ford below the 8th's, with the book under his arm, looking at the bone-bank in front of him. He has not opened the book.

"The sappers go at first light," he says. "All along the ford. Crackers and cussers. It'll be clean, they say, and the army crosses dry by noon, the marines who blew it first, then the 8th, then us." He looks at the water. "And this lot goes up in the air with the mud and comes down in the river in pieces, and goes out to the sea, and that's the end of it." He is quiet. "Some would say that's a decent end. A clean one."

He looks at you. "Some would say the Chain's own should carry its own. Tonight. Before the sappers. Our stretch, as far as we can reach, out to the bank and into the ground." He shrugs. "It's cold, Sergeant, and it's dark, and there's no rest in it, and the ford's not just bones. There'll be scavengers on it; there always are, where there's iron in the dead. I'll write it either way."${b43Say({haddat:`\n\nHaddat has stopped saying the names, and is listening.`, tangle:`\n\nTangle, beside you, is looking down the bank at the marines' crates.`, _:''})}${b43Sp({mirrel:`Mirrel has her sleeves rolled already, and does not seem to know she has done it.`, yorin:`Yorin is looking at the water and not at you. "Cold tonight," he says. "Clear and cold. I could keep the wind off the bank, a while. Not off the river."`, rasp:`Rasp is looking down the bank at the marines' crates, and then at the bone-bank, and then at you. "Clean's a sapper's word," she says. "I like it. I'd still like to know what I'm being clean about."`})}${b43R({orvas:`\n\nOrvas is watching you, with his lance grounded, the way you watch somebody you have decided to follow and are about to find out about.`, redblade:`\n\nRamin has his helm under his arm. "Whichever it is," he says, "I mean to tell my captain I was there."`, warlock:`\n\nThe grandmother is watching you through Keth's eyes.`})}${b43ONear() ? `\n\nUp the bank, at the edge of the Khundryl's camp, a young rider with black tears is sitting his horse, watching the Third.` : ''}`,
      ch:[{t:'"We carry our own. Tonight."', fx:()=>{ S.f.b4_c3_key = 'carry'; S.f.b4_carried = 1; b4Nerve(1, 'The company carried too'); b43L('haddat', 2); b43L('marrow', 2); b43L('tangle', -1); b43L('mirrel', 1); b43LO(2); if (b43ONear() && b4Room() > 0 && !b4Recruit_()) b4Join('orvas'); }, go:'b4_c3_carry'},
          {t:'"Let the sappers do it. Clean."', fx:()=>{ S.f.b4_c3_key = 'blow'; S.f.b4_carried = 0; b4Nerve(1, 'The army crossed dry'); b43L('tangle', 2); b43L('rasp', 1); b43L('haddat', -1); }, go:'b4_c3_blow'},
          {t:'"Give me a moment, Sergeant."', go:()=>startExplore()}]}),
    b4_c3_carry:()=>({sp:'The 9th\'s stretch', scene:'b4_c3_ford', txt:
`Radde nods once, as if he had been waiting to see which, and opens the book, and writes a short line, and shuts it. Then he takes his boots off.

The word goes back up the bank to the Second Company before the Third is in the water, and the company comes down. Not all of it. The freckled girl first, with her spear left on the bank, and then a dozen others, and then more, recruits who have never seen the Chain and regulars who have seen too much, and they take their boots off too, and come into the river behind the Third without being asked.

The water is cold. Not cool: cold, the way a river is cold at dusk after a day of sun, coming up through the feet and the shins into the bones.${b43Say({haddat:` Haddat goes in first, to the waist, the blue shield slung, still saying the names.`, _:''})}${b4In('hessa') ? `\n\nHessa wades in with her spear left on the bank and her lips moving: not the names, a temple prayer, short, the one for the doors. "The Worm will have them back in the end," she says, to the river. "Tonight she can wait."` : ''}${b43Sp({mirrel:`Mirrel ties her hospice bag high on a pole on the bank, where it will stay dry, and wades in after it with her sleeves rolled. "One, two, three, and up," she says, at the first bone, to whoever is on the other end of it.`, yorin:`Yorin stands on the bank a breath with his hands up, and the wind off the river drops, all along the 9th's stretch, as if somebody had shut a door on it. "That'll hold an hour," he says, through his teeth. "Maybe two." Then he wades in too.`, rasp:`Rasp hangs the satchel on the ferry post, well up, and looks at it hanging there as if she were leaving a child with strangers. Then she goes in.`})}${b43R({orvas:`\n\nOrvas comes down off the bank and into the water behind you, without a horse. "My clan rode away," he says. "I am not riding away from this." He wades out past you to the bone-bank.`, redblade:`\n\nRamin wades in in his red scale, which is a very bad idea, and does not take it off.`, warlock:`\n\nKeth wades in beside the squad, and the grandmother says, very gently, "*There. There. We have come for you.*"`})}`,
      ch:[{t:'Into the water. (wade the stretch, and carry)', check:['might', 14],
            edges:id=>[(id === 'hessa' || id === 'darrut') && ['shield-line shoulders', 1], id === 'haddat' && ['she has done this once before, on this ford', 2], id === 'marrow' && ['she is old, and the water is cold', -2], id === 'tebbet' && ['he would rather be anywhere but in this water', -1], id === 'orvas' && ['he wants this more than anyone', 1], id === 'yorin' && ['he has the wind off the bank, for a while', 1], id === 'mirrel' && ['hospice work: lift, carry, lay down, again', 1]],
            clean:{t:'The squad works its stretch out to the bone-bank and back, again and again, until the light is gone, and nobody falls.'},
            near:{t:'Yes, but the cold gets into everybody before the work is done: every squadmate who waded starts the next fight a little down, the river still in their bones.', fx:()=>{ SQUAD().forEach(id => bruise(id, 2 + lvT())); }},
            go:'b4_c3_carry_ok', fail:'b4_c3_carry_cold'},
          {t:'"In a moment. Back up the bank first."', go:()=>startExplore()}]}),
    b4_c3_carry_ok:()=>({sp:'The 9th\'s stretch', scene:'b4_c3_ford', fx:()=>{ S.f.b4_c3_waded = 1; S.f.b4_c3_carriedHow = 'many'; S.f.b4_c3_noRest = 1; if (b4In('haddat') && !S.f.b4_c3_bead) { S.f.b4_c3_bead = 'carried'; gain('b4_c3_bonebead'); } }, txt:
`It goes on until the light goes, and then by the light of the company's lanterns on the bank. Into the water, out to the bone-bank, hands down into the cold, and back to the bank with what comes up: a long bone, a skull, a jaw, a hand of small bones in a fold of blue cloth. Laid on the grass. Back out.

By full dark there is a row of them on the bank, long, under the company's cloaks, and the company is digging, without a word. The Khundryl, up on the slope, have stopped their fires to watch.${b4In('haddat') ? `\n\nHaddat comes out of the water the last time with something closed in her fist. She opens it by the lantern: a small bead of bone, drilled, worn smooth by the river. Some woman of the Chain wore it in her hair. Haddat looks at it a long breath, and then gives it to you, not to keep. "Carry it," she says. "I have too many already."` : ''}

${b43Say({marrow:`Marrow sits on the bank with her feet in the cold mud and her hands shaking, and ties a knot in her string for every one that goes into the ground. She runs out of string. She starts tying knots in the hem of her coat.`, tangle:`Tangle carries with the rest, and says, once, coming back past you with a skull in his arms: "They'll blow it anyway, Sergeant. And it'll be clean." He says it gently. He goes back out.`, _:`The squad carries until it cannot, and then carries some more.`})}${b43Sp({mirrel:`Mirrel comes out of the water every tenth trip and goes along the recruits on the bank with her hands, quick, wrists and lips and fingers: who is too cold, who goes back in, who sits. "You. Sit. You, one more and then sit." They do as they are told. She goes back in.`, yorin:`Yorin holds the wind off the bank until his nose bleeds, and then a little after. ${b4In('mirrel') ? 'Mirrel makes him drink, and he does.' : 'He sits on the bank with his head back and a cold cloth on his face, and says the sky is not his fault.'}`, rasp:`Rasp carries with the rest, steadily, and has no clever word all night. The recruits notice, and it frightens them more than the bones.`})}

And downstream, in the dark, where the 9th's lanterns do not reach, something is moving in the shallows that is not the Second Company.`,
      ch:[{t:'Look downstream.', go:()=>startExplore()}]}),
    b4_c3_carry_cold:()=>({sp:'The 9th\'s stretch', scene:'b4_c3_ford', fx:()=>{ S.f.b4_c3_waded = 1; S.f.b4_c3_carriedHow = 'few'; S.f.b4_c3_noRest = 1; SQUAD().forEach(id => bruise(id, 3 + lvT())); if (b4In('haddat') && !S.f.b4_c3_bead) { S.f.b4_c3_bead = 'carried'; gain('b4_c3_bonebead'); } }, txt:
`The river is colder than anybody thought, and the bank is softer, and the bone-bank is further out than it looked. ${by({sgt:'You go', _:'{who} goes'})} under once, to the chest, and comes up with the breath gone. The company's recruits get as far as the knee and stand there shaking.

It is not many, in the end. A row on the bank, short, under the company's cloaks. The company digs. The squad comes out of the water blue to the lips, and the cold stays in it: everybody starts the next fight down, the river still in their bones.${b4In('haddat') ? `\n\nHaddat comes out last with something closed in her fist: a small bead of bone, drilled, worn smooth by the river. She gives it to you. "Carry it," she says, through her teeth. "I cannot feel my hands."` : ''}${b43Sp({mirrel:`Mirrel gets the recruits out first, one, two, three, by the collar, and then the squad, and then herself, last, blue to the elbows. She goes along the bank rubbing hands and feet until her own stop working. "Fires," she says to Radde. "Now. All of them." He does not write it down. He goes.`})}

It is not many. It is some. And downstream, in the dark, where the 9th's lanterns do not reach, something is moving in the shallows that is not the Second Company.`,
      ch:[{t:'Look downstream.', go:()=>startExplore()}]}),
    b4_c3_scav_start:()=>({sp:'The shallows', scene:'b4_c3_fordnight', txt:
`Downstream, past the end of the 9th's stretch, there are men in the river: a dozen, at least, waist-deep among the bone-banks with shuttered lanterns and sacks, working by feel. They are not lifting bones. They are lifting what is on the bones: a buckle, a blade, the iron boss off a shield, arrowheads by the handful. The sacks clink. Out beyond them a flat boat is pulled up against the farthest bank, and an old man stands in it with a long boat-hook, waiting for the sacks.

River people. Ford-pickers. They have been doing this since the Chain went over, by the look of the sacks, and the army's coming has only told them they have one more night.${b43Say({haddat:`\n\nHaddat sees what they are doing, and says one word in Hissari, and it is not a word for the dead.`, marrow:`\n\n"Child," Marrow says, quietly, to nobody, and stands up out of the mud.`, _:''})}${b43R({orvas:`\n\nOrvas has his lance level before you have said anything. "Iron," he says. "They are taking the iron off them." He will not need telling.`, redblade:`\n\nRamin draws, and the scale comes up out of the water with him. "Thieves," he says. "I have arrested thieves. I have not done it waist-deep."`, warlock:`\n\n"*Robbers,*" the grandmother says, cold as the river. "*Grave-robbers in a grave.*"`})}${b43Sp({yorin:`Yorin's fingers are crackling, blue, under the water, which he did not know they could do. "Say the word, Sergeant," he says, very quietly. "I'll light the whole ford for you. I'd like to."`, rasp:`Rasp is already back up the bank at the ferry post, getting the satchel down, as quietly as she has ever done anything.`})}`,
      ch:[{t:'"Out of the river." Shields up.', go:()=>startBattle('b4_c3_scavengers', {})},
          {t:`${b43Sap()} puts a burner into the reeds by them.`, tag:'uses 1 burner', req:()=>b43HasSap() && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b4_c3_scavengers', {pre:true})},
          {t:'Douse the lanterns and come at them along the bone-bank, low.', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['he is good in the dark, and patient in it', 2], id === 'haddat' && ['she knows this ford in the dark', 1], id === 'orvas' && ['he moves like the horse is still under him', 1], id === 'darrut' && ['he is broad and the water is loud round him', -1], id === 'yorin' && ['he can lay the wind down over the water and hide the sound', 1], id === 'tallow' && ['his teeth are chattering', -1]],
            near:{t:'Yes, but somebody\'s foot finds a bone that turns under it, and the splash goes down the ford like a shout.'},
            go:()=>startBattle('b4_c3_scavengers', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c3_scav_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c3_scav_seen:()=>({sp:'The shallows', scene:'b4_c3_fordnight', txt:
`The lanterns go out, and for a breath it works, and then the cold gets into somebody's chest and they cough, once, out over the water. The shuttered lanterns on the bone-banks go dark all at once. A low whistle. Knives come up out of the river.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c3_scavengers', {surprise:'e'})}]}),
    b4_c3_scav_after:()=>({sp:'The bone-bank', scene:'b4_c3_fordnight', fx:()=>{ S.f.b4_c3_scavDone = 1; }, txt:
`The old ferryman sits in his boat with his boat-hook across his knees and blood in his beard, and the sacks are in the bottom of the boat, clinking when the river moves it. The ones he paid are over on the far bank, or lying in the shallows groaning, and the Second Company's regulars are standing over them, deciding things.

"A year," the old man says, to nobody. "I ran the ferry forty years. Then the Chain came, and there was no ferry, and there was this." He looks at the river. "Iron's iron. The dead don't use it."${b43Say({haddat:`\n\n"It was theirs," Haddat says. She takes the sacks out of the boat one by one, and carries them to the bank, and empties them into the row of graves, buckles and blades and arrowheads, onto the cloaks. "It goes with them."`, _:`\n\nThe sacks go to the bank, and their iron goes into the graves with the bones it came off.`})}

Radde has come down to the water at the noise. He looks at the old man, and the boat, and the row of graves on the bank, and the company standing round it, wet to the chest. He opens the book, and writes something long. "The Second Company," he says, "carried its own." He shuts the book. "No sleep tonight, then. The sappers go at first light."${b43Sp({mirrel:`Mirrel stitches the regulars first, then the squad, then, without asking anybody, the old ferryman's scalp. He holds still for it. "It'll scar," she tells him. "Good. Something should."`})}${b43R({orvas:`\n\nOrvas is standing in the shallows with the river round his knees, grieving, out loud, the Khundryl way, for people who are not his. Up on the slope, the Khundryl answer him.`, redblade:`\n\nRamin pulls the old man's boat up onto the bank so it will not float away, which is more than the old man deserves, and says so.`, warlock:`\n\nKeth walks the row of graves. "*Quieter,*" the grandmother says. "*Not quiet. Quieter.*"`})}`,
      ch:[{t:'Wait for the light.', onward:true, go:'b4_c3_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c3_blow:()=>({sp:'The 9th\'s stretch', scene:'b4_c3_ford', txt:
`Radde opens the book on his knee and writes a short line. "Clean," he says. "It's a decent word." He goes back up the bank.

The Third stands at the water's edge a while longer in the last of the light, and then goes up the bank too, to the 9th's fires, and eats, and lies down, and some of it sleeps.${b43Say({rasp:` Rasp sits on the slope above the 8th's stretch with her chin on her knees and watches the marines' sapper lay his crates along the bank in the dark, by feel. "Look at him," she says, hoarse and soft. "Doesn't need a light. Knows where the bank goes by his feet." She watches until he has finished, and a while after.`, tangle:` Tangle sits on the slope above the 8th's stretch with his knees up and watches the marines' sapper lay his crates along the bank in the dark, by feel. "That's a man who knows how deep a bank goes," he says, very softly. "That's clean work." He watches until the sapper has finished.`, _:''})}${b43Say({haddat:`\n\nHaddat does not sleep. She sits at the water's edge until the sky goes grey, and says the names, all of them, and then says them again.`, _:''})}${b43Sp({mirrel:`Mirrel sleeps, because a healer sleeps when she can, and wakes twice in the night with her hands reaching for something.`, yorin:`Yorin lies awake watching the stars over the river. "Clear tomorrow," he says, to whoever is listening. "Clear for the blast. The sky doesn't care. I wish it would, once."`})}${b43R({orvas:`\n\nOrvas sits up on the slope with the Khundryl, his face to the river, and grieves, quietly for once.`, redblade:`\n\n"Clean," Ramin says, lying down in his scale. "Yes. My company would say so too."`, warlock:`\n\nKeth sleeps with his back to the river, and the grandmother mutters in his sleep, all night, in Wickan, to somebody.`})}`,
      ch:[{t:'Sleep. The sappers at first light.', onward:true, fx:()=>{ if (!S.f.b4_c3_slept) { S.f.b4_c3_slept = 1; b4Rest('The squad sleeps above the ford, inside the 9th\'s lines, with the river loud below. Wounds close, mostly.'); } }, go:'b4_c3_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c3_radde_ford:()=>({sp:'Sergeant Radde', scene:'b4_c3_ford', txt: b43Key() === 'carry' ?
`Radde is on the bank by the row of graves with his boots off and his feet in the mud and the book shut on his knee. "${S.f.b4_c3_scavDone ? 'No sleep,' : 'In the water, Sergeant,'}" he says. "${S.f.b4_c3_scavDone ? 'Not tonight. I knew it when I said it.' : 'or out of it. The light won\'t wait.'}"${S.f.b4_c3_noRest ? `\n\nThere is no rest tonight. The squad chose the river instead; the wounds will have to wait for the far bank.` : ''}` :
`Radde is sitting by the 9th's fire above the ford, writing in the book. "${S.f.b4_c3_blast ? 'Our turn,' : 'First light,'}" he says. "${S.f.b4_c3_blast ? 'After the marines and the 8th. In you go, Sergeant.' : 'Then the marines, then the 8th, then us. Sleep while you can, Sergeant.'}"`,
      ch:[{t:'Into the water. (wade the stretch, and carry)', req:()=>b43Key() === 'carry' && !S.f.b4_c3_waded, onward:true, go:'b4_c3_carry'},
          {t:'Wait for the light.', req:()=>b43Key() === 'carry' && !!S.f.b4_c3_scavDone && !S.f.b4_c3_blast, onward:true, go:'b4_c3_dawn'},
          {t:'Sleep. The sappers at first light.', req:()=>b43Key() === 'blow' && !S.f.b4_c3_blast, onward:true, fx:()=>{ if (!S.f.b4_c3_slept) { S.f.b4_c3_slept = 1; b4Rest('The squad sleeps above the ford, inside the 9th\'s lines, with the river loud below. Wounds close, mostly.'); } }, go:'b4_c3_dawn'},
          {t:'Cross, after the 8th.', req:()=>!!S.f.b4_c3_blast, onward:true, go:()=>{ if (b43Key() === 'carry') talk('b4_c3_butte'); else { startExplore('b4_c3_farbank'); talk('b4_c3_farbank_arrive'); } }},
          {t:'Leave him.', go:()=>startExplore()}]}),
    b4_c3_ford_back:()=>({sp:'The road up from the ford', txt:
`Back up the road, the army's camp on the slope, and the Khundryl's fires above it. Nothing up there for the Third tonight.`,
      ch:[{t:'Not that way.'}]}),

    /* ---- dawn: the blast, and the crossing (the marines who blew it first, then the 8th, then the 9th) ---- */
    b4_c3_dawn:()=>({sp:'Vathar Crossing · dawn', scene:'b4_c3_crossing', fx:()=>{ S.f.b4_c3_ph = 4; S.f.b4_c3_blast = 1; }, txt:
`At first light the marines of the 8th go down the bank and wade out along the ford, laying the last of it, and wade back. There is a long quiet. Then the sapper on the bank lifts his arm.

It comes as a line of white flashes along the whole width of the crossing, low on the water, one after another so fast they are one, and then the sound: a flat hard crack that goes through the bank and up into your knees, and then a roar, and the river stands up. A wall of brown water and mud and pale things goes up into the grey air the length of the ford, and hangs, and comes down, and the noise rolls away up the valley and comes back off the hills.

When the spray settles the ford is a ford again. The water runs fast and shallow and brown across it, clean, from bank to bank, and away downstream, a long way down, the current is carrying things toward the sea.${b43Key() === 'carry' ? ` On the south bank, above the water, the Third's row of graves is still there, under the cloaks.` : ''}

The marine squad that blew it crosses first: Captain Keneb's gift, the camp says, the honour of the first feet on the far side. Then the 8th, a long column wading to the waist. Then, in the afternoon, the 9th. The Third crosses with the Second Company, after the marines, after the 8th, in its place.${b43Say({tangle:` Tangle walks across with his satchel held over his head and his eyes on the water, and says, halfway, "Clean. That was clean," and nothing else.`, haddat:` Haddat walks across with the shield on her arm, and her lips move the whole way, and she stops on the far bank and looks back.`, _:''})}${b43Sp({mirrel:`Mirrel crosses with her bag held over her head, and on the far bank she turns round and counts the squad out of the water: one, two, three, and up. All of them. She counts again.`, yorin:`The blast's wind reaches the bank a breath after the sound, hot and wet and smelling of the river bottom. Yorin turns his face out of it. "That's not mine," he says, to nobody who asked. "I'd never make one like that."`, rasp:`Rasp watched the whole of it from the bank with her mouth a little open and her hand on her own satchel. "Lovely," she says, when it is over, and then, more quietly, looking at the water carrying things away: "Lovely work." She is quiet the rest of the way across.`})}${b43R({orvas:`\n\nOrvas walks the ford beside the squad, though the Khundryl are crossing on their horses a little upstream. They call to him. He does not answer.`, redblade:`\n\nRamin walks across in his red scale with the water at his chest, and does not complain, and shakes like a dog on the far bank.`, warlock:`\n\nKeth walks across with the grandmother silent in him, and on the far bank she says, at last: "*Gone. Out to the sea.*"`})}`,
      ch:[{t:b43Key() === 'carry' ? 'On, up the far bank.' : 'The far bank, and the night.', onward:true, go:()=>{ if (b43Key() === 'carry') talk('b4_c3_butte'); else { startExplore('b4_c3_farbank'); talk('b4_c3_farbank_arrive'); } }},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ---- 'blow': the far bank at night, and the river band at the poles ---- */
    b4_c3_farbank_arrive:()=>({sp:'Vathar Crossing · the far bank', scene:'b4_c3_fordnight', txt:
`The 9th camps on the far bank at dusk, wet to the waist and dry everywhere else, in among the trees that begin there. The fires go up. The ford runs loud and clean below.

There are poles on this side too, more of them, older: the tribes on this bank have been bringing offerings longer, or have more to say. In the firelight the carcasses on them look like people standing very still among the trees.

And among them, after dark, there are people standing very still among the trees.${b43Say({haddat:`\n\nHaddat sees them first. "River people," she says. "From the bank tribes." She listens to the dark. "They are not hiding. They want us to know they came."`, tebbet:`\n\nTebbet sees them first. "Men among the poles," he says, an arrow on the string. "Painted. Twenty, maybe. Waiting."`, _:''})}${b43Sp({yorin:`Yorin smells them before he sees them: woodsmoke and river mud on the wind, coming the wrong way through the trees. "Upwind of us," he says. "They want us to know they're there. That or they don't know what wind is."`, rasp:`Rasp looks at the poles, and at the dry carcasses on them, and at how close together the poles stand. "That'd go up lovely," she says, hoarse, and then, seeing faces: "I'm only saying."`})}${b43R({orvas:`\n\n"Gall sent word," Orvas says, very low. "He told them. He told them to keep away." He looks at the dark among the poles. "Some people never listen."`, redblade:`\n\n"Fist Baralta said they would come," Ramin says. "He was right. He will be impossible."`, warlock:`\n\n"*Angry,*" the grandmother says. "*And grieving. The two together. Careful.*"`})}`,
      ch:[{t:'Walk the bank.', go:()=>startExplore()}]}),
    b4_c3_farpoles:()=>({sp:'The poles on the far bank', scene:'b4_c3_fordnight', txt: S.f.b4_c3_bandDone ?
`The poles stand in the dark among the trees, and the carcasses on them turn a little when the wind comes up off the river. A fresh one has gone up since the fight: a goat, still dripping. The 9th leaves it be.` :
`The poles stand in the dark among the trees with the carcasses on them turning a little in the wind off the river. At the foot of the nearest, in the mud, a fresh braid has been laid, and a handful of river stones, and a scatter of the ford's blasted mud with pale fragments in it, picked out by somebody's fingers and put back. A mourning offering, for the dead that went out to the sea this morning.`,
      ch:[{t:'Leave it.', go:()=>startExplore()}]}),
    b4_c3_farfire:()=>({sp:'The 9th\'s fire', scene:'b4_c3_fordnight', txt: S.f.b4_c3_bandDone ?
`The 9th's fire on the far bank, burning low, with the ford running loud and clean below and the poles standing in the dark among the trees. The squad is tired enough to sleep through anything now.` :
`The 9th's fire on the far bank. The whole 9th is awake, looking at the poles.`,
      ch:[{t:'Sleep. The butte in the morning.', req:()=>!!S.f.b4_c3_bandDone, onward:true, fx:()=>{ if (S.f.b4_c3_slept2) return; S.f.b4_c3_slept2 = 1; b4Rest('The squad sleeps on the far bank of the Vathar, dry, inside the 9th\'s lines, with the river loud below. Wounds close, mostly.'); }, go:'b4_c3_butte'},
          {t:'The men among the poles.', req:()=>!S.f.b4_c3_bandDone, go:'b4_c3_band'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c3_radde_far:()=>({sp:'Sergeant Radde', scene:'b4_c3_fordnight', fx:()=>{ S.f.b4_c3_raddeFar = 1; }, txt:
`Radde is crouched by the 9th's fire with the book shut, watching the poles. "The Khundryl's war chief sent word to the bank tribes," he says, "the camp says. That the army would cross and blow the ford, and they should keep away." He looks at the dark among the trees. "That lot didn't keep away."

"They're not here for the 9th," he says. "They're here for what was done to the river. They'll have a go at the nearest Malazans and go home and say they did." He looks at you. "The nearest Malazans are us, Sergeant. I'd sooner it was us than the recruits."`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c3_band:()=>({sp:'Among the poles', scene:'b4_c3_fordnight', txt:
`They are waiting among the poles, painted in white clay and river mud: twenty men of a bank tribe, with hooked swords and fishing spears and short bows, and an old man behind them with a staff hung with braids and a dog's skull. They do not come on. They stand where the firelight reaches them, and look at the 9th's fires, and wait for somebody to come out to them.

The old man calls something across the dark in a river tongue. ${b4In('haddat') ? `"He says the river was full of the dead," Haddat says, low, "and the dead were the river's. He says the Malazans took them with fire this morning, and he has come to say so." She listens. "He says he does not care who the dead were."` : `Nobody in the squad has the tongue. Everybody understands it.`}${b43R({orvas:`\n\nOrvas calls back in a tribal tongue, the trade-speech of the Odhan, and the old man answers him, short. "He says Gall is a horse-thief," Orvas says. "He is not wrong. It does not help."`, redblade:`\n\n"They will fight," Ramin says. "It is a matter of honour. I understand them very well. I would still like to hit them."`, warlock:`\n\n"*Grief,*" the grandmother says. "*Grief with a spear. Let them say their piece, child, and then they will have their fight.*"`})}${b43Sp({mirrel:`Mirrel opens her bag and lays out the linen on a stone by the fire, three rolls in a row, before anybody has moved. "Whichever way it goes," she says, "somebody's going to need these, and I don't much mind whose side they're on."`})}`,
      ch:[{t:'Go out to them. Shields up.', go:()=>startBattle('b4_c3_poles', {})},
          {t:`${b43Sap()} puts a burner up among the poles.`, tag:'uses 1 burner', req:()=>b43HasSap() && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b4_c3_poles', {pre:true})},
          {t:'Answer him: grieve back. ("They were our dead. We grieve them too.")', check:['guile', 15],
            edges:id=>[id === 'haddat' && ['she has the tongue, and the names', 2], id === 'orvas' && ['the trade-speech of the Odhan', 1], S.tricks && S.tricks.b4_c3_tears && ['the Khundryl cry, learned at the feast', 1], id === 'tangle' && ['he blew nothing, but he would have', -1], id === 'rasp' && ['she smells of the clay that did it', -1], id === 'mirrel' && ['she grieves for a living, near enough', 1], id === 'redblade' && ['red scale, to a river tribe', -2]],
            near:{t:'Yes, but the old man listens, and half his young men listen, and the other half have already started forward with their spears. The talk only takes the front off them.'},
            go:'b4_c3_band_talked', fail:'b4_c3_band_fail'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c3_band_fail:()=>({sp:'Among the poles', scene:'b4_c3_fordnight', txt:
`${by({sgt:'You call', _:'{who} calls'})} it across the dark, and the old man hears it, and laughs, short and hard, and lifts the skull-hung staff. The young men come on.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c3_poles', {surprise:'e'})}]}),
    b4_c3_band_talked:()=>({sp:'Among the poles', scene:'b4_c3_fordnight', txt:
`${by({haddat:`Haddat walks out of the firelight to the edge of the poles and says the names. Not all of them; the first twenty, the Seventh's, in Hissari, loud, so the old man can hear every one. Then she says, in the river tongue, "Ours." The old man looks at her a long breath.`, orvas:`Orvas walks out to the edge of the poles and grieves, out loud, the Khundryl way, for the dead who went out to the sea this morning. The old man listens. Some of his young men lower their spears.`, mirrel:`Mirrel walks out to the edge of the poles with her bag on her shoulder and the red hand on it showing in the firelight, and says it plainly, the way she would tell a family at the hospice door. The old man looks at the red hand, and then at her, and some of his young men lower their spears.`, _:`{who} walks out to the edge of the poles and says it across the dark, and the old man listens, and some of his young men lower their spears.`})}

Not all of them. The youngest have come too far to go home and say they talked, and they come on anyway, with the old man shouting at them, and the old man, after a moment, comes with them, because they are his.`,
      ch:[{t:'Shields. Fewer of them now.', go:()=>startBattle('b4_c3_poles', {surprise:'p'})}]}),
    b4_c3_poles_after:()=>({sp:'The headman\'s poles', scene:'b4_c3_fordnight', fx:()=>{ S.f.b4_c3_bandDone = 1; if (!S.f.b4_c3_bead) { S.f.b4_c3_bead = 'poles'; gain('b4_c3_bonebead'); } }, txt:
`The old man is sitting at the foot of his newest pole with his staff across his knees and his young men round him, the ones who can sit, and the ones who cannot are being carried off into the trees by the ones who can. The 9th lets them go. The 9th's regulars stand with their shields where the firelight stops, and watch them go.

At the foot of the pole, where the offering was laid, there is the scatter of the ford's mud, with the pale fragments picked out of it. And among them, a small bead of bone, drilled, worn smooth by the river. A woman of the Chain wore it in her hair.${b43Say({haddat:` Haddat picks it up, and holds it a long breath, and gives it to you. "Carry it," she says. "The river has the rest."`, _:` It goes into the kit, carefully.`})}

Radde writes something by the fire. "They came for the river," he says. "Not us." He shuts the book. "We'll be the ones they remember, though."${b43Sp({mirrel:`Mirrel goes out to the edge of the trees with her bag and offers, by holding up a roll of linen, to the river men carrying their own. One of them stops. Then he shakes his head, and goes on into the dark with his friend over his shoulder. Mirrel stands there with the linen a while before she comes back.`})}${b43R({orvas:`\n\nOrvas stands at the edge of the poles a long while after, looking at the dark where the river people went. "Gall will hear of this," he says. "He will be sorry. He will not be surprised."`, redblade:`\n\n"Fist Baralta will be very pleased," Ramin says, wiping his sword. "He was right. It will be unbearable."`, warlock:`\n\n"*They said their piece,*" the grandmother says. "*Good. Now they can grieve.*"`})}`,
      ch:[{t:'The fire, and sleep.', go:'b4_c3_farfire'}]}),

    /* ---- the butte: Ubaryd, and the Whirlwind ---- */
    b4_c3_butte:()=>({sp:'The butte', scene:'b4_c3_butte', fx:()=>{ S.f.b4_c3_ph = 5; S.f.b4_whirlwindSeen = 1; }, txt:
`North of the river the land climbs again, and the army climbs it, and in the ${b43Key() === 'carry' ? 'evening' : 'morning'} the head of the column comes out on top of a butte, a long flat-topped hill with the land falling away on the far side of it, and stops. The word comes back down the column, and the column comes up to see.

Below, a long way below, there is a city on the coast: white walls, roofs, a harbour, and in the harbour ships, more than the harbour was built for, crowded in against the quays and out on the water, with the Empire's colours on them. *Ubaryd.* It fell in the rising. The word goes along the butte: *Nok's taken it back. The Admiral. The fleet's in.* Food, and water, and arrows, the 9th says. A recruit laughs out loud.

And away north, past the city, past everything, on the horizon, there is something else. A wall of dust standing up off the desert into the sky, the colour of old brass, so far away it does not seem to move, and so big that it does not need to. The 9th does not say its name. The 9th goes quiet along the whole length of the butte.

${b43Say({haddat:`Haddat looks at it a long time. "Raraku," she says. "The Holy Desert." That is all of it, and enough.`, marrow:`Marrow looks at it, and then at her string. "That, child," she says, "is what the warren has been leaning away from since Aren."`, _:`The squad looks at it, and then at the ships, and then at it again.`})}${b4In('tallow') ? `\n\nTallow looks at the ships. Only at the ships. "Boats," he says. "Look. Boats."` : ''}${b4In('tebbet') ? `\n\n"Far enough," Tebbet says, of the dust. "For now." He keeps looking at it.` : ''}${b43Sp({mirrel:`Mirrel looks at the harbour. "Ships mean a surgeon's chest," she says, "and clean water, and somebody's thread that isn't mine." She does not look north. She has decided not to, and is sticking to it.`, yorin:`Yorin has gone white to the lips. The copper vane in his palm is not pointing at the wall of dust. It is pointing at everything else, round and round, as if the wind on the butte had given up deciding. "That's not a storm," he says. "A storm has the decency to move." He puts the vane away, carefully, and his hand shakes doing it. "That's the biggest thing in the sky I have ever seen, Sergeant. And it isn't anybody's I know."`, rasp:`Rasp looks at the wall of dust a long breath. "Every cusser in the Empire," she says at last, hoarse, "end to end, all at once." She thinks about it. "Wouldn't scratch it." It is the most respectful thing anybody has heard her say about anything that does not go bang.`})}${b43R({orvas:`\n\nOrvas looks at the wall of dust with his chin up. "We will ride into that," he says. "The clan. With the boy." He grins, with the black wet on his face. "From a horse, I hope."`, redblade:`\n\n"Ubaryd," Ramin says. "Ours again." He looks at the ships. "For now."`, warlock:`\n\n"*The Whirlwind,*" the grandmother says. "*She is very angry. She has been angry a long time.*"`})}`,
      ch:[{t:'North.', onward:true, go:()=>chapterEnd(3, b43Key() || 'blow')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
