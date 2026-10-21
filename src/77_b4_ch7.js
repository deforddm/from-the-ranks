/* ============ Book Four, Chapter 7: The Convergence, and the end of Book Four ============ */
/* Raraku (House of Chains, ch 25–26). The night before the battle the Third holds the flank pickets of the blocking force before the
   Dogslayers' trenches on their three ramps. Everything that happens that night happens inside or beyond the rebel lines, out of sight;
   from the picket there is only what canon lets the line see: sounds of battle almost heard, the dark above the oasis changing, a Wickan
   standard by the trenches, butterflies, a sound a league off. And then light and dust and riders: Raraku's ghosts and the army's own
   dead, riding down the Dogslayers (never the deaths: headline only). The squad sees ONE face among them (David's ruling on the plan's
   question 9): on a transfer one of the Barrow dead (b4Fallen()[0]); on a fresh start Sathi. With S.f.b4_saw 'close' (Ch6's forward
   road) the face is clear; otherwise a shape they are sure of. On S.f.b4_bone 'chain' (Ch1) the rider wears the token. They never speak,
   and the narrator never names them: the squad names them. Before dawn, the mortal fight (b4_c7_breakout, mortal:true, signposted): a
   band of nameless desert warriors scattering out of Raraku past the end of the picket line. "Let them go by" is offered (Nerve −2) and
   skips it. The morning: the trenches silent; Fist Gamet dead in his bed (a clot in the brain, Keneb says), and Keneb Fist; the duel,
   watched from the line in silence, one thrust (the Adjunct never knows who Sha'ik was, and nobody in the squad wonders); a giant on a
   horse riding past far off, saying nothing to them; a bound man brought in; Ranal dead in a sandstorm (camp talk); the Wickan children's
   warning passed down the line, the run to the coral, Raraku becoming water; sixteen strangers from the flood, a girl among them. Then the
   coral island: the last reading, the trick, and the road out (S.f.b4_c7_key): 'line' (on after Leoman in the 9th), 'horse' (with
   Temul's Wickans or Gall's Khundryl), 'ledger' (out of the ledger: listed dead in the flood, and walked away). Then the finale
   (B4CH7.finale, read by 37's showFinale). Dust 3 through the night (B4DUST); after the duel it settles to 1. Notes: docs/hoc-ch7-notes.md. */
/* FOR THE ARTIST (77b): names this file uses.
   Items: ART['item/b4_c7_coral'], ['item/b4_c7_dogslayerblade'], ['item/b4_c7_tear'].
   Figures: b4_c7_fleer (a desert warrior fleeing, a blade), b4_c7_fleerbow (the same with a horn bow), b4_c7_fleechief (their leader),
   b4_c7_ghost (a ghost rider: light and dust, no face), b4_c7_karsa (a giant on a horse, far off: silhouette only). Reused: b4_c1_radde,
   b4_c1_hollet, b4_c1_recruit, b4_c4_setiarcher, b4_c5_rider, b4_c5_riderbow, b2soldier, wickan, khundryl.
   Backdrops (SCENEX): b4_c7_night (the oasis dark changing, light on the ramps, butterflies), b4_c7_ride (light and dust and riders going
   by the picket toward the ramps), b4_c7_predawn (the end of the line before dawn), b4_c7_morning (the line in the morning, the ramps
   silent, dust coming down), b4_c7_duel (two small figures on the plain before the army, very far), b4_c7_giant (a giant on a horse far
   off along the plain), b4_c7_flood (water coming over the old sea bed toward the coral islands), b4_coral (70's, redrawn: the island after
   the flood), b4_c7_finale (the Third on a coral island at dawn, the new sea, the column forming).
   Ground (TILEX): b4_c7_picket ('.' hard sand, ',' scrub, '#' rock, '=' the picket screen, 'F' a shielded fire, 't' a scrape trench,
   'L' a lookout rock), b4_c7_breach ('.' sand, '#' rock, ',' scrub, '=' the last of the screen), b4_c7_isle ('.' coral, '~' new water,
   ',' wet sand, 'F' fire, 'c' a coral head). In fights 't' is low cover and 'o' a drop (in the flood, water). */

/* ---- small helpers (b47: Book Four, Chapter Seven) ---- */
const b47L = (id, n) => { if (b4In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b47Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b4In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* the recruit who walks with the squad (one at a time), and a line for them */
const b47Rec = () => b4In('orvas') ? 'orvas' : b4In('redblade') ? 'redblade' : b4In('warlock') ? 'warlock' : null;
const b47R = m => { const r = b47Rec(), v = r && m[r]; return v ? (typeof v === 'function' ? v() : v) : ''; };
const b47Dog = () => b4In('sathi') || (!!b4Was('b2_hackleBack') && !(S.dead && S.dead.hackle));
const b47New = () => HOC_NEW.filter(id => b4In(id));
/* the phase: 1 dusk at the picket, 2 the night, 3 the dead have ridden, 4 before dawn at the end of the line, 5 the morning, 6 the island */
const b47Ph = () => S.f.b4_c7_ph || 1;
const b47Key = () => S.f.b4_c7_key || '';
/* what the squad saw from Ch6's picket: 'close' (went forward to the trenches in the dark) or 'far' (held as posted, and the default) */
const b47Close = () => S.f.b4_saw === 'close';
/* the dust in the scenes (3 through the night; 1 once it settles after the duel). Read S, not a fight left over in B */
const b47Dust = () => (S && S.dust != null ? S.dust : 3);
const b47Mates = () => SQUAD().filter(id => id !== 'sgt' && b4In(id));
const b47And = a => a.length > 1 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a[0] || '';
/* who among the squad fell in this chapter's mortal fight (Book Two's dead carry from:'dg' and are not these) */
const b47Fell = () => Object.keys((S && S.dead) || {}).filter(id => S.dead[id] && S.dead[id].ch === 7 && S.dead[id].from !== 'dg' && TPL[id]);

/* ---- the one face among the riders ----
   b47Face(): the Barrow dead the squad sees (a transfer's first, or Sathi on a fresh start); null on a transfer that lost nobody, and then
   the face is a cook of the Chain's Seventh the squad called the Ladle (an invention: the squad names him by what it called him).
   b47Namer(): the one who knew them best and says the name (the narrator never does). b47Sure(): how clearly: 'clear' (b4_saw close),
   'near' (far, but the Fall climbed at night, Ch2's promise), 'sure' (a shape they are sure of). */
const b47Face = () => { const f = b4Fallen(); return f.length ? f[0] : null; };
const b47FaceName = () => { const f = b47Face(); return f ? TPL[f].name : 'the Ladle'; };
const b47Namer = () => { const f = b47Face(), o = {sathi:['haddat', 'tangle', 'marrow'], haddat:['marrow', 'tangle', 'sathi'], tangle:['haddat', 'marrow', 'sathi'], marrow:['haddat', 'tangle', 'sathi']}[f] || ['haddat', 'tangle', 'marrow', 'sathi'];
  return o.find(id => b4In(id)) || 'sgt'; };
const b47Sure = () => b47Close() ? 'clear' : S.f.b4_fallClimbed === 1 ? 'near' : 'sure';
/* who leads the horse road: Orvas walking, else Keth walking, else Orvas waiting near with the Khundryl, else Keth waiting near with the
   Wickan youths, else Sathi (a Weasel; Temul has Weasels with him), else a Wickan youth of Temul's ('boy') */
const b47HorseLead = () => b4In('orvas') ? 'orvas' : b4In('warlock') ? 'warlock' : b4Waiting('orvas') ? 'orvas' : b4Waiting('warlock') ? 'warlock' : b4In('sathi') ? 'sathi' : 'boy';
/* the token on the rider (Ch1's chain road), in words */
const b47Token = () => ({thread:'a twist of blue Hissari thread', string:'a knot of string', feather:'a crow feather', keepsake:'a keepsake of the Chain\'s'})[S.f.b4_c1_token] || 'a token of the Chain\'s';
/* the face, as the squad sees it: what it is doing, never what it says (it says nothing; it rides) */
const b47FaceLook = () => { const f = b47Face(), s = b47Sure(), tok = S.f.b4_bone === 'chain' ? ` At the throat, on a thong beside the finger bone, there is ${b47Token()}, the Chain's way, the way the Third ties its own.` : '';
  const how = s === 'clear' ? 'close enough, for a breath, to see the face plainly in its own light' : s === 'near' ? 'near enough to be nearly sure, and then sure' : 'too far for a face, and it does not matter: the shape of the shoulders, the seat on a horse, the head turned just so';
  const who = ({sathi:`a small rider bent low over a horse's neck, braids flying, riding the way she always rode, as if the horse were late for something`,
    haddat:`a tall rider with a shield on the arm, sitting very straight, the way she sat at the Barrow`,
    tangle:`a long bent rider with a satchel slung behind, hunched over the saddle like a man reading a fuse`,
    marrow:`a rider with a coat of too many pockets, sitting a horse badly and not minding, one hand up to settle something at the collar`})[f]
    || (f ? `a rider the squad knows at once by the seat and the shoulders` : `a broad rider with a ladle stuck through his belt, who fed the Seventh's file on the Chain when there was anything to feed it`);
  return `One of them, at the near edge, is ${who}. ${how.charAt(0).toUpperCase() + how.slice(1)}.${tok}`; };

/* ---- the mortal fight, on Ch6's forward road: it begins a round sooner, and harder (the band is closer, and there are more of them) ---- */
{ const _battleDef = battleDef;
  battleDef = function(id, stage){ const d = _battleDef(id, stage); if (!d || !b4On() || id !== 'b4_c7_breakout' || !b47Close()) return d;
    const near = f => [f[0], f[1], Math.min(7, f[2] + 2)], out = Object.assign({}, d, {foes:d.foes.map(near).concat([['b4_c7_fleer', 1, 3]]), b47Close:true});
    if (d.waves) out.waves = d.waves.map(w => Object.assign({}, w, {round:Math.max(2, w.round - 1)}));
    return out; }; }
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt); if (b4On() && B && B.def && B.def.b47Close) blog(`<em>The squad went forward on the night before Pan'arak and knows this ground in the dark: so do they. They are on the line a round sooner, and there are more of them.</em>`); return r; }; }

/* ---- the black bead (Orvas's gift on the horse road): the wearer's first hit in a fight carries +2, for the dead ---- */
{ const _attack = attack;
  attack = function(a, t, o = {}){ const r = _attack(a, t, o);
    if (b4On() && B && a && a.side === 'p' && !a.ally && !a.b47tear && r && r.hit && t && t.hp > 0 && S.gear && S.gear[a.id] && Object.values(S.gear[a.id]).includes('b4_c7_tear')) {
      a.b47tear = true; hurt(t, 2); blog(`The black bead at ${a.name}'s throat: two more, for the Khundryl dead.`); }
    return r; }; }

/* ---- The Dead Ride: what the riders taught whoever saw the face. Spirit-craft: it never sputters in the dust. ---- */
Object.assign(TRICKS, {
  b4_c7_deadride:{name:'The Dead Ride', ch:7, use:'fight', ab:'t_b4_c7_deadride', spirit:true, where:'a coral island in the new sea, the morning after Raraku',
    lore:'The dead rode down out of the dust on the night before the battle, and one of them turned a face to the Third. Hold the face in your head, the way you saw it, and call; the dust remembers how to be a rider. It is not a warren. It is a debt the dead are paying back.',
    get fx(){ return `Once a fight: a rider of dust comes out of the air and rides down an enemy within 4 of the bearer: ${'2d6'} + ${2 + lvT()} damage. Spirit-craft: the dust never fouls it.`; }},
});
Object.assign(AB, {
  t_b4_c7_deadride:{name:TRICKS.b4_c7_deadride.name, trick:'b4_c7_deadride', spirit:true, desc:()=>TRICKS.b4_c7_deadride.fx,
    tiles:u=>foes().filter(f => f.hp > 0 && cheb(u, f) <= 4),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const n = roll(2, 6, 2 + lvT());
      AUDIO.play('pick'); sparks(t.x, t.y, 22, '#e8dcc0', .6); sparks(u.x, u.y, 10, '#c8b894', .4); float(u, 'the dead ride', '#f0e6cc');
      blog(`${u.name} holds a face in mind and calls, and the dust gets up off the ground in the shape of a rider and comes down on ${t.name} at the gallop, and is dust again.`);
      hurt(t, n); }},
});

/* ---- the words this chapter adds to Book Four's glossary ---- */
GLOSSX.hoc.push(
  [7, 'The night at Raraku', 'The night before the battle at the oasis, the dead rode: Raraku\'s own, and the army\'s, the Chain\'s among them. From the flank pickets the Fourteenth saw light and dust and riders. In the morning the Dogslayers\' trenches were silent.', ()=>!!(S.f && S.f.b4_c7_ride)],
  [7, 'The new sea', 'The morning after the battle, Raraku flooded. The army ran for the coral islands ahead of the water, and the Holy Desert became an inland sea. What feeds it, the Fourteenth does not know.', ()=>!!(S.f && S.f.b4_c7_flood)]);

/* ---- the reading on the coral island (READTABLE['hoc:7']): the cards settle, and nobody says why ---- */
B4DECK[7] = {scene:'b4_coral', where:'a flat of pale coral, wet with the mist, smoothed with a sleeve', set:'Dawn on a coral island in a sea that was a desert yesterday, the mist on the water, and the Fourteenth on every island round it.',
  back:'b4_c7_isle', backT:'Back to the fire.',
  say:{marrow:`"Last one, child," Marrow says, and smooths a place on the coral with her sleeve. "Of this road, anyway." She shuffles, and stops, and frowns at the deck in her hands, and shuffles again. "They've gone quiet," she says. "The cards. Since the night. Like a room after somebody's sat down in the chair at the head of it." She does not know what she means by that. She lays them anyway.`,
    tallow:`"She always did one at the end of the season," Tallow says. "When the boats were up." He shuffles on his knee. Halfway through he stops. "They feel different," he says. "Since the night. Heavier. Like they've been put in order and I'm only dealing them." He looks at the deck as if it had told him a secret and he had missed it. "One, Sergeant."`,
    oldninth:`The old soldier finds the Third's fire with his cup already out, and his cards. "Wet," he says of the coral, and sits on it anyway. He shuffles one-handed, and frowns. "Odd," he says. "Forty years, they've fought me. Since the night they don't." He lays them down with care. "Somebody's put the Deck in its box, and shut the lid. Don't ask me who. One."`}};
/* the Herald's words for the island (70c's suit the eve before Pan'arak, where Chapter 6 lays it; on the island they look back) */
{ const H = B4SAY.herald; if (H) { const m = H.marrow, t = H.tallow, o = H.oldninth;
  B4SAY.herald = Object.assign({}, H, {
    marrow:()=> S && S.book === 'hoc' && S.chapter === 7 ? `"The Herald," Marrow says. "High House Death, holding the door." She looks out over the water, where the oasis was. "It was open last night, child. They came through it. The other way, for once." She does not put the card away.` : (typeof m === 'function' ? m() : m),
    tallow:()=> S && S.book === 'hoc' && S.chapter === 7 ? `"The door man," Tallow says. "She said that one means the dead come home." He looks at the water for a while. "I think they did," he says. "I think that's what it was."` : (typeof t === 'function' ? t() : t),
    oldninth:()=> S && S.book === 'hoc' && S.chapter === 7 ? `"Herald," says the old soldier, and puts his cup down on the coral. "Door's open. One of you goes down and gets up again, I used to say." He looks round the Third. "After last night I'll not say it so easy."` : (typeof o === 'function' ? o() : o)}); } }

/* ---- the Barrow dead's page in the finale says what it is: among the riders (37 heads every dead squadmate's page "The fallen") ---- */
{ const _sf = showFinale;
  showFinale = function(i = 0){ const r = _sf(i); try { if (!b4On()) return r; const P = finPages(), pg = P[clamp(i|0, 0, P.length - 1)];
      if (pg && pg.k === 'gone' && pg.g && pg.g.riders) { const k = document.querySelector('.fin-k'); if (k) k.textContent = 'Among the riders'; const m = document.querySelector('.fin-mark'); if (m) m.textContent = '†'; const w = document.querySelector('.fin-who .pips'); if (w) w.textContent = 'The Barrow · Raraku, the night before the battle'; } } catch(e) {}
    return r; }; }

const B4CH7 = {
  title:'The Convergence', number:'Seven',
  intro:{loc:'Before Pan\'arak', sub:'Raraku · the night before the battle', scene:'b4_c7_night', cap:'The basin at dusk, the Dogslayers\' trenches on their three ramps across it, and the oasis behind them going dark.',
    paras:[
`The Fourteenth has come to the oasis, and the Whirlwind is waiting for it. Across a basin of hard sand, close enough to count the fires, Korbolo Dom's Dogslayers hold three ramps up to the dead city with trenches dug behind them, and behind the trenches is Pan'arak, and the camp of the Whirlwind, and somewhere in it the woman the army has walked from Aren to kill.`,
()=>`You are Sergeant {sgt}, Third squad, 9th Legion. A third of the army is to block the rebels' way out when the battle comes, and the Third holds a picket on that block's far flank, ${S.f.b4_blistigNoticed ? 'asked for by name, Radde says, by the Fist himself, which Radde does not think is a compliment' : 'because Radde volunteered it, which Radde says was a compliment'}. The horse is held back: there is no room for it. ${b47Close() ? 'Last night the Third went forward in the dark and looked at the trenches from closer than anybody should. It has not said much about it since.' : 'Last night the Third held its picket as posted, and watched the rebel fires till they burned down.'}`,
()=>`The dust has not stopped for three days. It is in the air like smoke, brown at noon and red at sunset, and it takes the eye to a stone's throw and the bow to less. ${b4In('marrow') ? 'Marrow says the warren has sand in it to the elbow.' : 'The healers say the warren has sand in it to the elbow.'} The battle is tomorrow. Everybody says so. The 9th has not been told.`],
    go:'To the picket', node:'b4_c7_start'},

  areas:[
    /* 16 x 12 (b4_c7_picket, night).  = the picket screen (blocks; tap it to look across the basin)  t the scrape behind it  . hard sand
       , scrub  # rock  L a lookout rock  F the Third's shielded fire  > east, the end of the line  < back toward the blocking force */
    { id:'b4_c7_picket', title:'Before Pan\'arak · the flank picket', sub:'Night · the trenches across the basin', hint:'Tap ground to move · tap a figure to talk · the screen looks out across the basin', decor:'b4_c7_picket', dark:true,
      map:[ ",,..,,....,,..,,",
            "..,....,,....,..",
            "================",
            "#tttt...L..tttt#",
            "#.......,......#",
            "#..,...........>",
            "#......F.......#",
            "#.,..........,.#",
            "#....#.....,...#",
            "<.......,......#",
            "#..,......#....#",
            "################" ],
      walk:'.,', triggers:{'=':'b4_c7_screen', F:'b4_c7_shield', L:'b4_c7_lookout', '>':'b4_c7_to_breach', '<':'b4_c7_picket_back'}, start:{x:7, y:8},
      quest:()=> !S.f.b4_c7_raddeSaid ? 'Sergeant Radde, by the scrape.' : !S.f.b4_c7_outDone ? 'Riders in the scrub to the east, at dusk.' : b47Ph() < 3 ? 'The screen. Watch the basin.' : 'The end of the line, east. Before dawn.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:4, y:5, node:()=>!S.f.b4_c7_raddeSaid ? 'b4_c7_radde' : b47Ph() >= 3 ? 'b4_c7_predawn' : 'b4_c7_radde_again', fresh:()=>!S.f.b4_c7_raddeSaid || b47Ph() === 3},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:11, y:8, node:()=>'b4_c7_hollet', fresh:()=>!S.f.b4_c7_hollet},
        {id:'recruits', name:'The freckled recruit', kind:'b4_c1_recruit', x:3, y:7, node:()=>S.f.b4_c7_recTold ? 'b4_c7_recruits_again' : 'b4_c7_recruits', fresh:()=>!S.f.b4_c7_recTold},
        {id:'seti', name:'A Seti archer', kind:'b4_c4_setiarcher', x:12, y:4, node:()=>'b4_c7_seti', show:()=>!!S.f.b4_setiSaved, fresh:()=>!!S.f.b4_setiSaved && !S.f.b4_c7_seti},
        {id:'outriders', name:'Riders in the scrub', kind:'b4_c5_rider', x:14, y:5, node:()=>'b4_c7_out_start', show:()=>!!S.f.b4_c7_raddeSaid && !S.f.b4_c7_outDone, fresh:()=>!!S.f.b4_c7_raddeSaid && !S.f.b4_c7_outDone},
        {id:'rider', name:'A rider at the near edge', kind:'b4_c7_ghost', x:9, y:4, node:()=>'b4_c7_face', show:()=>!!S.f.b4_c7_ride && !S.f.b4_c7_faceSeen, fresh:()=>!!S.f.b4_c7_ride && !S.f.b4_c7_faceSeen} ] },

    /* 16 x 12 (b4_c7_breach, before dawn).  = the last of the screen  . sand  , scrub  # rock  < back along the line. East and north is open
       ground: the way out of the basin, past the end of the pickets */
    { id:'b4_c7_breach', title:'Before Pan\'arak · the end of the line', sub:'Before dawn · the last picket', hint:'Tap ground to move · tap a figure to talk · past here there is nothing but the desert', decor:'b4_c7_breach', dark:true,
      map:[ "................",
            ".,....,...,..,..",
            "..,.....#.......",
            "====......,.....",
            "#..=....,.......",
            "#..........#....",
            "#.,.............",
            "#.....,.........",
            "<..........,....",
            "#....#..........",
            "#.,.......,.....",
            "##############.." ],
      walk:'.,', triggers:{'=':'b4_c7_lastscreen', '<':'b4_c7_breach_back'}, start:{x:3, y:7},
      quest:()=> !S.f.b4_c7_breakDone && !S.f.b4_c7_letGo ? 'The shapes coming out of the dark, north-east.' : 'Dawn. Back along the line.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:5, y:6, node:()=>S.f.b4_c7_breakDone || S.f.b4_c7_letGo ? 'b4_c7_dawn' : 'b4_c7_radde_breach', fresh:()=>!!(S.f.b4_c7_breakDone || S.f.b4_c7_letGo)},
        {id:'shapes', name:'Shapes coming out of the dark', kind:'b4_c7_fleer', x:12, y:2, node:()=>'b4_c7_hold', show:()=>!S.f.b4_c7_breakDone && !S.f.b4_c7_letGo, fresh:()=>!S.f.b4_c7_breakDone && !S.f.b4_c7_letGo} ] },

    /* 16 x 12 (b4_c7_picket, morning): the same ground as the night's, in the light.  = the screen (watch the plain)  F the fire, cold
       L the lookout rock  > east, down to the ramps' foot with Radde  < back */
    { id:'b4_c7_line', title:'Before Pan\'arak · the morning', sub:'Morning · the trenches silent', hint:'Tap ground to move · tap a figure to talk · the screen looks out across the basin', decor:'b4_c7_picket',
      map:[ ",,..,,....,,..,,",
            "..,....,,....,..",
            "================",
            "#tttt...L..tttt#",
            "#.......,......#",
            "#..,...........>",
            "#......F.......#",
            "#.,..........,.#",
            "#....#.....,...#",
            "<.......,......#",
            "#..,......#....#",
            "################" ],
      walk:'.,', triggers:{'=':'b4_c7_watch', F:'b4_c7_coldfire', L:'b4_c7_lookout_day', '>':'b4_c7_to_ramps', '<':'b4_c7_line_back'}, start:{x:7, y:8},
      quest:()=> !S.f.b4_c7_raddeMorn ? 'Sergeant Radde, and the news.' : !S.f.b4_c7_duel ? 'The screen. The whole army is watching the plain.' : !S.f.b4_c7_warned ? 'The line. Something is coming down it.' : 'The coral. Run.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:4, y:5, node:()=>!S.f.b4_c7_raddeMorn ? 'b4_c7_radde_morning' : S.f.b4_c7_duel && !S.f.b4_c7_ramps ? 'b4_c7_radde_ramps' : 'b4_c7_radde_morning_again', fresh:()=>!S.f.b4_c7_raddeMorn || (!!S.f.b4_c7_duel && !S.f.b4_c7_ramps)},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:11, y:8, node:()=>'b4_c7_hollet_morning', fresh:()=>!S.f.b4_c7_holletMorn},
        {id:'recruits', name:'The freckled recruit', kind:'b4_c1_recruit', x:3, y:7, node:()=>'b4_c7_recruit_morning', fresh:()=>!S.f.b4_c7_recMorn},
        {id:'runner', name:'A Wickan boy, running', kind:'wickan', x:13, y:4, node:()=>'b4_c7_warning', show:()=>!!S.f.b4_c7_duel, fresh:()=>!!S.f.b4_c7_duel && !S.f.b4_c7_warned} ] },

    /* 16 x 12 (b4_c7_isle, after the flood).  ~ the new water (tap it: the shore)  . coral  , wet sand  c a coral head  F the Third's fire */
    { id:'b4_c7_isle', title:'Raraku · a coral island', sub:'After the flood · the new sea', hint:'Tap ground to move · tap a figure to talk · the water is all round', decor:'b4_c7_isle',
      map:[ "~~~~~~~~~~~~~~~~",
            "~~~,,,~~~~~,,~~~",
            "~~,..c..,,....,~",
            "~,...........c,~",
            "~,..c....F.....~",
            "~,.............~",
            "~~,....c.....,~~",
            "~~,..........,~~",
            "~~~,.......,,~~~",
            "~~~~,,....,~~~~~",
            "~~~~~~,,,~~~~~~~",
            "~~~~~~~~~~~~~~~~" ],
      walk:'.,', triggers:{'~':'b4_c7_shore', c:'b4_c7_coralhead', F:'b4_c7_isle'}, start:{x:8, y:6},
      quest:()=> !S.f.b4_c7_raddeIsle ? 'Sergeant Radde. The orders.' : !b47Key() ? 'The fire, and the road out.' : 'The fire. The last night of it.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:6, y:5, node:()=>!S.f.b4_c7_raddeIsle ? 'b4_c7_radde_isle' : b47Key() ? 'b4_c7_radde_isle_again' : 'b4_c7_key', fresh:()=>!S.f.b4_c7_raddeIsle || !b47Key()},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:11, y:7, node:()=>'b4_c7_hollet_isle', fresh:()=>!S.f.b4_c7_holletIsle},
        {id:'recruits', name:'The freckled recruit', kind:'b4_c1_recruit', x:8, y:8, node:()=>'b4_c7_recruit_isle', fresh:()=>!S.f.b4_c7_recIsle},
        {id:'strangers', name:'Strangers off the water', kind:'rebel', x:12, y:2, node:()=>'b4_c7_strangers', fresh:()=>!S.f.b4_c7_strangers},
        {id:'riders', name:'Riders on the next island', kind:'khundryl', x:3, y:7, node:()=>'b4_c7_riders_isle', fresh:()=>!S.f.b4_c7_ridersIsle} ] } ],

  battles:{
    /* dusk at the flank picket: outriders of the Whirlwind come round the end of the blocking force in the scrub to look at it, with the
       company. The second ground: the gully where they left their horses. */
    b4_c7_outriders:{title:'The scrub at dusk', style:'b4_c7_picket', dark:true, open:true, warrenText:'Before Pan\'arak · the warren is full of sand, and something else, waiting', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:["..,,..,.",".,..t...","...,..,.","..t....,","........",".,..t...","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c7_outchief',3,1],['b4_c7_outrider',1,2],['b4_c7_outrider',6,2],['b4_c7_outbow',4,0],['b4_c7_outrider',5,3]], xp:170, after:'b4_c7_out_after',
      waves:[{round:3, foes:[['b4_c7_outrider',7,4]], text:'Another comes out of the dust on the flank at a walk, as if he had been sitting his horse there all along and nobody had seen.'}],
      preText:()=>`Tangle's sharpers go off in the scrub at dusk, two flat cracks the dust swallows at once, and the riders picking their way along the end of the line are suddenly picking their way through each other.`,
      stage2:{title:'The gully', xp:85,
        text:()=>`They go back along the scrub the way they came, and the squad goes after them, down into a dry gully off the end of the line where they left their horses with a boy to hold them.\n\nThe boy has run. The horses have not. The riders who are left have turned at the bottom with their backs to the horse lines and their veils up, and their leader is shouting at them in a tongue of the deep desert, and pointing at the Malazan lines, and at the trenches, and at the sky over the oasis, which nobody has looked at for an hour.${b47Say({tebbet:`\n\nTebbet has an arrow on the string and the dust between him and everything. "I'd rather be a long way off," he says. "In this, a long way off is ten paces."`, darrut:`\n\nDarrut sets his big shield in the gully's mouth. "They wanted to see the block," he says. "Let's show it to them."`, _:''})}`,
        map:["##....##","#..t...#","........","..t..t..","........",".,......","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c7_outchief',3,1],['b4_c7_outrider',1,3],['b4_c7_outrider',6,3],['b4_c7_outbow',4,0]]} },
    /* before dawn, the end of the line: a band of desert warriors scattering out of Raraku, running east past the last of the pickets.
       Mortal: whoever falls here stays down. On Ch6's forward road (b4_saw 'close') it begins a round sooner and harder (the battleDef wrap
       above). The second ground: the end of the line itself, where the last of them make a stand rather than be caught in the open. */
    b4_c7_breakout:{title:'The end of the line', style:'b4_c7_breach', dark:true, mortal:true, hurtMost:true, open:true, warrenText:'The end of the line · before dawn · whoever falls here stays down', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8]], n:1},
      map:["........",".,....,.","...t....","........","..,...t.","........","t.......","tt......","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c7_fleechief',4,0],['b4_c7_fleer',2,1],['b4_c7_fleer',6,1],['b4_c7_fleebow',5,0],['b4_c7_fleer',3,2]], xp:180, after:'b4_c7_break_after',
      waves:[{round:3, foes:[['b4_c7_fleer',7,2]], text:'More come out of the dark behind them at a run, two and three together, not stopping for anything, and the ones who see the Third go at it rather than round it.'}],
      preText:()=>`Tangle's sharpers go off in the dark across their path, and the band running for the open desert is two bands, one of them on the ground.`,
      stage2:{title:'Past the last picket', xp:90,
        text:()=>`The ones who are left break round the end of the line, the way they meant to go, and the squad goes after them past the last stake of the screen, into the open, where there is nothing between the 9th and the desert but the dark going grey.\n\nThey stop there. They have nowhere to stop and they stop anyway, a knot of them round the one with the good sword, with their backs to the desert they were running for, because the Third is between them and nothing and they would rather this than be ridden down in the open by whatever is behind them. Their eyes keep going back over their shoulders, toward the oasis. Not at the squad.${b47Say({haddat:`\n\n"They are not fighting us," Haddat says, very low, with the blue shield up. "They are running from something. We are in the way." She does not lower the shield.`, marrow:`\n\n"Child," Marrow says, to nobody in the squad in particular, "they've seen what we saw." She ties a knot in her string, hard.`, _:''})}`,
        map:["........",".,..t...","........","..t..t..","........","........","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c7_fleechief',3,1],['b4_c7_fleer',1,3],['b4_c7_fleer',6,3],['b4_c7_fleebow',4,0]]} },
    /* the run to the coral, the water coming: men of the Whirlwind cut off by the flood are on the spur ahead, and the water is behind
       everybody. The second ground: the island's foot, where the spur meets the coral and the water is already at the ankles. */
    b4_c7_spur:{title:'The coral spur', style:'b4_c7_isle', dust:1, open:true, pitTxt:'the water', warrenText:'Raraku · the warren is waking, and wet', warren:{meanas:1, denul:1}, music:'battle',
      map:["oo....oo","o..t...o","........","..t..t..","o......o","oo....oo","o......o","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c7_stragchief',3,1],['b4_c7_straggler',2,2],['b4_c7_straggler',5,2],['b4_c7_stragbow',4,0],['b4_c7_straggler',3,4]], xp:170, after:'b4_c7_spur_after',
      waves:[{round:2, foes:[['b4_c7_straggler',6,3]], text:'Another comes up out of the water at the spur\'s side, soaked to the chest, with a knife in his teeth, because there was nowhere else to come up.'}],
      preText:()=>`Tangle's burner goes up on the spur in front of them, on wet coral, which burns for no time at all and long enough, and the men on the spur come through it in ones.`,
      stage2:{title:'The island\'s foot', xp:85,
        text:()=>`They fall back along the spur to where it joins the island, and the squad goes after them with the water at its heels, over coral that was dry a hundred breaths ago and is not now.\n\nAt the island's foot the last of them have turned. The water is round their ankles and climbing. Behind them is the coral and the high ground and the rest of the 9th, already up it. Behind the Third is the sea. Every man on that spur means to live through the next hour, and there is not room on it for all of them to.${b47Say({hessa:`\n\nHessa plants her spear in the coral. "D'rek does not mind water," she says. "Neither do I. Today."`, tangle:`\n\nTangle has the satchel over his head with both hands. "Not wet," he says. "Not now. Not after all this."`, _:''})}`,
        map:["##....##","#..t...#","........","..t..t..","........","o......o","oo....oo","o......o","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c7_stragchief',3,1],['b4_c7_straggler',1,3],['b4_c7_straggler',6,3],['b4_c7_stragbow',4,0]]} } },

  foes:{
    /* the Whirlwind's outriders: desert warriors who ride for Sha'ik, out round the end of the block at dusk to look at it */
    b4_c7_outrider:{name:'Whirlwind outrider', sig:'r', kind:'b4_c5_rider', hp:24, ac:13, atk:8, dmg:[1,8,2], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
    b4_c7_outbow:{name:'Outrider with a horn bow', sig:'b', kind:'b4_c5_riderbow', hp:18, ac:12, atk:8, dmg:[1,8,2], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'},
    b4_c7_outchief:{name:'The outriders\' leader', sig:'C', kind:'b4_c5_rider', hp:44, ac:14, atk:9, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a tulwar down on'},
    /* the band scattering out of Raraku before dawn: nameless, running from what rode down the trenches; desperate, not an army */
    b4_c7_fleer:{name:'Desert warrior, running', sig:'f', kind:'b4_c7_fleer', hp:22, ac:13, atk:8, dmg:[1,8,2], rng:1, mv:5, init:3, sk:['hitrun'], verb:'slashes at'},
    b4_c7_fleebow:{name:'Desert bowman, running', sig:'g', kind:'b4_c7_fleerbow', hp:18, ac:12, atk:8, dmg:[1,8,2], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'},
    b4_c7_fleechief:{name:'The one with the good sword', sig:'S', kind:'b4_c7_fleechief', hp:40, ac:14, atk:9, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'cuts at'},
    /* men of the Whirlwind cut off by the flood on the coral spur */
    b4_c7_straggler:{name:'Whirlwind straggler', sig:'s', kind:'b4_c7_fleer', hp:22, ac:13, atk:8, dmg:[1,8,2], rng:1, mv:4, init:2, sk:[], verb:'hacks at'},
    b4_c7_stragbow:{name:'Straggler with a bow', sig:'w', kind:'b4_c7_fleerbow', hp:16, ac:12, atk:8, dmg:[1,8,2], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'},
    b4_c7_stragchief:{name:'The big one on the spur', sig:'B', kind:'b4_c7_fleechief', hp:38, ac:14, atk:9, dmg:[1,10,3], rng:1, mv:4, init:1, boss:true, sk:['rally', 'shove'], verb:'swings a heavy blade at'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b4_c7_coral:{name:'A piece of coral stone', slot:'trinket', who:null, stat:{wits:1},
      line:'A knuckle of pale coral the size of a fist, pitted and light, broken off the island the Fourteenth ran to when the desert became a sea. It was a reef once, and then a stone in the sand for longer than anybody has had a name, and now it is a reef again. Whoever carries it keeps their head: +1 wits.'},
    b4_c7_dogslayerblade:{name:'A Dogslayer\'s sword', slot:'weapon', who:['sgt', 'haddat', 'tangle', 'tallow', 'hessa', 'darrut', 'redblade'], atk:1, dmg:[1,10,2],
      line:'A Malazan short sword, longer in the blade than issue and heavier, the regimental marks on the hilt filed off and the leather rewound by somebody who meant to keep it. Picked up off the sand at the foot of the ramps the morning after. The 9th does not ask whose it was. It knows.'},
    b4_c7_tear:{name:'A black bead', slot:'trinket', who:null,
      line:'A bead of black glass on a thong, the size of a fingertip, smooth with handling, given by a Khundryl rider to a soldier he decided to ride beside. It is the shape of a tear. He will not say what it means, and the Khundryl never do. The wearer\'s first hit in each fight carries two more, for the dead.'} },

  scenes:{
    b4_c7_night:{loc:'Before Pan\'arak', sub:'The flank picket · night', cap:'The basin in the dark, the trenches on their ramps, and above the oasis a dark that is not the same dark as the rest of the sky.', amb:'explore'},
    b4_c7_ride:{loc:'Before Pan\'arak', sub:'The night · the dead ride', cap:'Light and dust going by in the dark toward the ramps, riders in it, and no sound of hooves.', amb:'wind'},
    b4_c7_predawn:{loc:'Before Pan\'arak', sub:'The end of the line · before dawn', cap:'The last stakes of the screen, the open desert beyond them going grey, and shapes coming out of the dark, running.', amb:'wind'},
    b4_c7_morning:{loc:'Before Pan\'arak', sub:'The morning after', cap:'The trenches on their ramps in the grey light, nothing moving in them, and the dust coming down out of the air.', amb:'wind'},
    b4_c7_duel:{loc:'Before Pan\'arak', sub:'The morning · the plain', cap:'Two small figures on the plain between the armies, a long way off, and the whole Fourteenth watching without a sound.', amb:'wind'},
    b4_c7_giant:{loc:'Before Pan\'arak', sub:'The morning · the plain', cap:'A giant on a horse going west along the plain, very far off, and not looking back.', amb:'wind'},
    b4_c7_flood:{loc:'Raraku', sub:'The sea comes back', cap:'Water coming over the old sea floor, grey and fast and no higher than a man, and the coral islands standing up ahead of it.', amb:'lake'},
    b4_c7_finale:{loc:'Raraku', sub:'A coral island · dawn', cap:'A coral island at dawn in a sea that was a desert yesterday, and the Fourteenth on every island round it.', amb:'lake'} },

  end:{
    line:['On after Leoman', 'The dead rode down the Dogslayers in the night, out of the dust, and in the morning the trenches were silent. The Adjunct killed Sha\'ik on the plain with one thrust while the army watched. Raraku became a sea, and the Fourteenth ran for the coral ahead of it. On the island the Adjunct ordered the pursuit of Leoman, and the Third went on with the 9th, in its place in the file.'],
    horse:['With the riders', 'The dead rode down the Dogslayers in the night, out of the dust, and in the morning the trenches were silent. The Adjunct killed Sha\'ik on the plain with one thrust while the army watched. Raraku became a sea, and the Fourteenth ran for the coral ahead of it. On the island the Adjunct ordered the pursuit of Leoman, and the Third went with it on horseback, among the Fourteenth\'s riders.'],
    ledger:['Out of the ledger', 'The dead rode down the Dogslayers in the night, out of the dust, and in the morning the trenches were silent. The Adjunct killed Sha\'ik on the plain with one thrust while the army watched. Raraku became a sea, and the Fourteenth ran for the coral ahead of it. The Third is written down as lost in the flood. It walked away from the new sea into Seven Cities.'] },
  endScene:'b4_c7_finale',
  endCap:()=> b47Key() === 'ledger' ? 'A road going south away from a sea that should not be there, and the Third on it, small, not looking back.' : b47Key() === 'horse' ? 'The Fourteenth forming up on the shore of the new sea, and the riders going out ahead of it, and the Third among them.' : 'The Fourteenth forming up on the shore of the new sea, the 9th in its place, and the Third in its file.',
  tease:'Next, far across the sea: another people\'s war, and their unblooded. The Fourteenth\'s road goes on, and waits for the Third.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b4_c7_faceSeen) x.push(`Among the riders in the night the Third saw one face it knew. ${({haddat:'Haddat', tangle:'Tangle', marrow:'Marrow', sathi:'Sathi', sgt:'You'})[f.b4_c7_namer] || 'Someone'} said the name.`);
    if (f.b4_c7_breakDone) x.push(b47Fell().length ? `Before dawn the Third held the end of the line against a band running out of Raraku. ${b47And(b47Fell().map(NAME))} did not get up.` : 'Before dawn the Third held the end of the line against a band running out of Raraku, and everyone got up.');
    if (f.b4_c7_letGo) x.push('Before dawn a band ran out of Raraku past the end of the line, and the Third let them go by. The company saw.');
    if (f.b4_c7_sword) x.push('The Third picked up a Dogslayer\'s sword at the foot of the ramps the morning after. Nobody asked whose.');
    if (f.b4_c7_strangers) x.push('Sixteen strangers came up out of the water onto the islands after the flood. The Third does not know who they were.');
    if (f.b4_orvasDone === 1) x.push(b47Key() === 'horse' ? 'Orvas rides beside the Third, and gave a black bead to the one he chose to ride beside.' : 'Orvas walks with the Third out of Raraku.');
    if (f.b4_raminDone === 1) x.push('Ramin walks with the squad, his red scale brown with the dust of a desert that is a sea now.');
    if (f.b4_kethDone === 1) x.push('Keth walks with the squad. The grandmother says the sea is very old and has come home, and that she approves.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b4_c7_key && ({line:'On the coral island the Third chose the line: on after Leoman with the 9th.', horse:'On the coral island the Third chose the horse: on after Leoman with the Fourteenth\'s riders.', ledger:'On the coral island the Third chose to walk out of the ledger, written down as lost in the flood.'})[f.b4_c7_key],
    f.b4_c7_strangers && 'Sixteen strangers came up out of the water onto the islands after the flood, a girl among them.',
    f.b4_c7_flood && 'Raraku flooded the morning after the battle. The army ran for the coral islands ahead of the water. The Holy Desert is a sea.',
    f.b4_c7_warned && 'The Wickan children\'s warning came down the line: the coral, the high ground, now.',
    f.b4_c7_ranal && 'Captain Ranal of the 8th died in a sandstorm the morning after, chasing desert warriors. The camp says so.',
    f.b4_c7_bound && 'A bound man was brought across the plain to the Adjunct. The camp says it was Korbolo Dom.',
    f.b4_c7_giant && 'A giant on a horse rode west along the plain past the army, and did not stop.',
    f.b4_c7_duel && 'The Adjunct rode out and met Sha\'ik on the plain alone, and killed her with one thrust. The army watched in silence.',
    f.b4_c7_raddeMorn && 'Fist Gamet died in the night, in his bed. A clot in the brain, Keneb says. Keneb is Fist.',
    f.b4_c7_morning && 'In the morning the Dogslayers\' trenches were silent.',
    f.b4_c7_letGo && 'Before dawn the Third let a band of desert warriors go by the end of the line.',
    f.b4_c7_breakDone && 'Before dawn the Third held the end of the line against a band running out of Raraku.',
    f.b4_c7_ride && 'In the night the dead rode out of the dust and down the ramps at the Dogslayers: light and dust and riders, from the picket.',
    f.b4_c7_outDone && 'At dusk outriders of the Whirlwind came round the end of the block in the scrub to look at it. The Third and the company drove them off.',
    'The Fourteenth came before the Dogslayers\' trenches at Pan\'arak, and the Third held a flank picket of the blocking force.'].filter(Boolean); },

  dlg:{
    /* ---- the flank picket at dusk: the first halt ---- */
    b4_c7_start:()=>({sp:'The flank picket', scene:'b4_c7_night', fx:()=>{ S.f.b4_c7_ph = S.f.b4_c7_ph || 1; S.f.b4_c7_started = 1; }, txt:
`The picket is a line of shallow scrapes behind a screen of brush and hide, staked out along a low rise at the far end of the blocking force, with the rest of the block strung away west of it in the dust like beads on a broken thread. In front of the screen the basin goes out flat and hard to the ramps. On the ramps are the trenches. Behind the trenches the dead city stands up against the last of the light, and behind the city is the oasis, and the Whirlwind.

The dust is thick tonight. It turns the sunset the colour of a wound and takes the far side of the basin to a smudge, and the Dogslayers' fires come through it one by one as the light goes, low and orange, a great many of them. Close enough to count, if anybody wanted to. The Third does not want to.

${b47Say({haddat:`Haddat stands at the screen with the blue shield grounded and looks across at the fires for a long breath. "Dom's men," she says, in Hissari. "The ones who were Malazans." She does not say what else they are.`, tangle:`Tangle sits down in the scrape with the satchel between his knees and counts it by feel, twice, without taking his eyes off the fires.`, marrow:`Marrow sits down in the scrape with her back to the screen. "I'll look at them in the morning, child," she says. "If they're still there."`, _:`The squad takes its scrape behind the screen and looks across at the fires.`})}${b4In('tallow') ? `\n\nTallow has his grandmother's deck in its oilcloth inside his shirt, and his hand flat on it.` : ''}${b47R({orvas:`\n\nOrvas stands on the rise with his lance grounded, looking west along the block to where the Khundryl horse lines are, held back, useless. "There is no room for horses," he says. "So the horses wait. And I am here." He does not sound as if he minds as much as he did.`, redblade:`\n\nRamin has his helm under his arm and his face to the trenches. "My father fought beside men like those," he says. "Before they were Dom's." He puts the helm on.`, warlock:`\n\nKeth has his palms flat on the sand. "*Listen,*" the grandmother says, out of his mouth. "*All of you. Listen to the ground. Something is coming up through it.*"`})}`,
      ch:[{t:'Find Radde.', go:()=>startExplore()},
          {t:'Look across the basin from the screen.', go:'b4_c7_screen'}]}),

    /* ---- the picket: Radde, Hollet, the recruits, the Seti archer, the lookout ---- */
    b4_c7_radde:()=>({sp:'Sergeant Radde · Second Company', html:nerveHTML('The Second Company'), txt:
`Radde is crouched in the scrape with the book open on his knee and the stylus behind his ear, and a cloth over his mouth against the dust. He has written nothing for a while. He is looking at the trenches.

"All night," he says, without looking round. "As posted. Nobody moves, nobody lights a fire you can see from the ramps, nobody goes forward for anything. The Adjunct wants the block where it is when they come out, and they'll come out at the ends, if they come." He looks along the screen. "We're an end."

He shuts the book on his finger. "There's riders in the scrub to the east, Sergeant. Came round the end of the block at dusk, slow, looking. Whirlwind's own, not Dom's. If they go back and say there's nothing out here but a screen and some Chain dogs, somebody over there might think that's a door." He tucks the stylus away. "I'd sooner they didn't go back saying anything."`,
      ch:[{t:'"We\'ll see to the riders."', fx:()=>{ S.f.b4_c7_raddeSaid = 1; }, go:'b4_c7_radde_2'},
          {t:'"How is the company?"', req:()=>!S.f.b4_c7_raddeHow, fx:()=>{ S.f.b4_c7_raddeHow = 1; }, go:'b4_c7_radde_how'}]}),
    b4_c7_radde_how:()=>({sp:'Sergeant Radde', txt:
`Radde thinks about it, honestly, which is the worst thing about him.

"${b4Mood() === 'steady' ? 'Better than they\'ve a right to be. They\'ve walked from Aren to here behind the Chain lot, and the Chain lot\'s still standing, so they reckon they will be.' : b4Mood() === 'shaky' ? 'Bad. They\'ve been looking at those fires since noon, and the fires are looking back. I\'ve eleven written down as won\'t stand. I\'ve stopped writing.' : 'Like any company the night before. Quiet, and lying about it.'}" He looks at the scrape, where the Second Company's recruits are sitting in a row with their spears upright, because a spear should be upright. "Talk to them, if you've a moment. They listen to the Chain. They don't listen to me. I'm only right."`,
      ch:[{t:'"We\'ll see to the riders."', fx:()=>{ S.f.b4_c7_raddeSaid = 1; }, go:'b4_c7_radde_2'}]}),
    b4_c7_radde_2:()=>({sp:'Sergeant Radde', txt:
`"Good." He writes the Third against something, small, and blows the grit off it. "Take a regular. Take two. Don't chase them into the basin; the basin's Dom's." ${b47Say({tebbet:`He glances at Tebbet. "Your bow won't carry in this. Go anyway."\n\n"I'd rather be a long way off," Tebbet says. "I'll settle for the scrub."`, darrut:`He glances at Darrut. "Aren Guard. You'll have done this on the walls."\n\n"From the walls," Darrut says. "It's different from the walls."`, _:''})}${b47R({orvas:`\n\nHe looks at Orvas. "And you. If they've horses, they'll have left them somewhere. Find where." Orvas smiles for the first time in three days.`, redblade:`\n\nHe looks at Ramin. "Red Blade. If they're Seven Cities and you know their tribe, say so before you kill them." Ramin's mouth goes thin. "I will say so after."`, warlock:`\n\nHe looks at Keth. "And the Wickan stays where I can see him."`})}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c7_radde_again:()=>({sp:'Sergeant Radde', txt: S.f.b4_c7_outDone ?
`Radde is in the scrape with the book shut and his eyes on the oasis. "As posted," he says. "All night." He does not open the book again.` :
`Radde is in the scrape with the book shut. "The scrub, Sergeant," he says. "East. Before it's full dark and they've gone home to tell somebody."`,
      ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c7_hollet:()=>({sp:'Captain Hollet · Second Company', fx:()=>{ S.f.b4_c7_hollet = 1; }, txt:
`Captain Hollet is sitting on a water barrel at the back of the scrape with his tablet on his knee and a cloth over his mouth, not counting anything. He coughs into the cloth when he sees the sergeant, and folds it, and puts it away.

"Sergeant." He looks at the tablet as if he had forgotten what it was for. "I had the water done to the last skin. I had the arrows. I had the recruits, and how many of them can tell a spear from a tent pole." He sets the tablet face down on his knee. "Tomorrow none of it matters. Tomorrow it's either enough or it isn't, and the books can't tell me which." He tries a smile. "I've never been to a battle. I kept the books for a garrison, in Genabackis. The garrison went to the battles. I kept the books."

He looks at the trenches across the basin, small and orange in the dust. "Is it always like this? The night before?"`,
      ch:[{t:'"Always, sir. And then it\'s morning."', go:()=>startExplore()},
          {t:'"Keep the books, sir. Somebody has to write it down."', fx:()=>{ b47L('haddat', 1); }, go:()=>startExplore()}]}),
    b4_c7_recruits:()=>({sp:'The freckled recruit', txt:
`The Second Company's recruits are sitting in a row in the scrape with their spears upright and their cloaks over their mouths, and the freckled girl from Aren is at the end of the row nearest the Third, because she has decided, somewhere between the Wall and here, that the end nearest the Third is the safe end.

"Sergeant." She keeps her voice down; everybody on the picket is keeping their voice down. "Is it true they've dug in so deep you could drown a horse? Is it true Dom's got the Chain's dead's names in a book and he's crossing them off?" Behind her a boy says *the goddess comes out at night* and somebody else says *they eat their prisoners* and a third voice, very small, only breathes, which is worse.

${b47New().includes('tallow') ? `Tallow is in the row with them, as he always is, with his spear upright like theirs, and he is not talking. For Tallow that is the worst sign there is.` : b47New().includes('hessa') ? `Hessa is standing at the end of the row like a temple door they have decided to shelter in.` : `They look at the squad the way the drowning look at a rope.`}`,
      ch:[{t:'"Tomorrow we hold this. That\'s all. You can hold a rise. Sleep in turns."', fx:()=>{ S.f.b4_c7_recTold = 'steady'; b4Nerve(1, 'The Chain squad said hold the rise'); }, go:'b4_c7_recruits_steady'},
          {t:'"I don\'t know what\'s over there. Neither do they, about us. Keep your spear close."', fx:()=>{ S.f.b4_c7_recTold = 'true'; b47L('haddat', 1); b47L('marrow', 1); }, go:'b4_c7_recruits_true'}]}),
    b4_c7_recruits_steady:()=>({sp:'The freckled recruit', txt:
`You sit down at the end of the row with your back to the screen, the Chain's way, and set your own blade across your knees, and look at nothing in particular. After a while the freckled girl copies you. Then the boy beside her. It goes along the row slowly, a spear at a time coming down out of the upright and across a pair of knees.

${b47Say({marrow:`Marrow sits down among them and begins to hum, low, an old Napan thing with no end to it. Under the dust and the dark it is barely there. They lean toward it.`, tangle:`Tangle sits down among them and goes to sleep at once, loudly, with his mouth open and the satchel on his chest. It is the most reassuring thing any of them has seen all week.`, _:`The squad sits down among them, and stays a while.`})}`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c7_recruits_true:()=>({sp:'The freckled recruit', txt:
`The freckled girl nods, slowly, and lowers her spear, and lays it along her side where her hand will find it in the dark. The others do the same. They do not look happier. They look like people who have been told the truth by somebody who walked here from Hissar, and have decided they would rather have that than a story.

${b47Say({haddat:`"Good," Haddat says to the girl, and then, in Hissari, so only the squad can follow it: "My mother said: never believe a story about the people across the water. They are telling one about you."`, marrow:`"There," Marrow says. "Now you know as much as the Adjunct, child. Sleep on it, if you can."`, _:`"Right," the girl says. "Right." She keeps her hand on the spear.`})}`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c7_recruits_again:()=>({sp:'The freckled recruit', txt:
`The row of recruits is asleep, or pretending, in a heap in the scrape with the dust settling on them. ${S.f.b4_c7_recTold === 'steady' ? 'One is snoring. The girl beside him has a hand on his shoulder, to know where he is.' : 'Every one of them has a hand on a spear.'}`,
      ch:[{t:'Let them sleep.', go:()=>startExplore()}]}),
    b4_c7_seti:()=>({sp:'A Seti archer', fx:()=>{ S.f.b4_c7_seti = 1; }, txt:
`The Seti archer who stood the picket with the Third the night before Pan'arak is still with it, sitting cross-legged at the screen's end with her horn bow across her knees and the bound left hand in her lap. Her officers sent for her twice. She did not go.

"My society remembers," she says, when the sergeant sits. "I stay where the Chain squad is. The officers can come and fetch me." She looks at the basin. "Tonight the ground is wrong," she says. "My grandmother would have said the dead are getting up. She said it about every bad night." She strings the bow. "Tonight I think she would mean it."`,
      ch:[{t:'"Stay, then. We\'ll be glad of the bow."', go:()=>startExplore()}]}),
    b4_c7_lookout:()=>({sp:'The lookout rock', txt: S.f.b4_c7_look ?
`The lookout rock behind the screen, and from it the basin and the ramps, and the dust over everything. ${b47Ph() >= 3 ? 'The trenches across the basin are quiet now. Quieter than they should be.' : 'Nothing out there has changed that the eye can swear to.'}` :
`A shoulder of rock behind the screen, high enough to see over it, with a regular of the 9th lying on it under his cloak with a crossbow beside him. From up here the basin opens out: the hard flat sand, the three ramps going up to the dead city, the trenches dug along them like scars, and the fires behind the trenches. Further back, over the oasis, the sky is a dark the dust does not reach.

"They're moving about," the regular says, low. "Behind the trenches. Lot of moving about, for men who've dug in."`,
      ch:[{t:'Get a proper look at the trenches. (in the dust, at the far side of a basin)', check:['wits', 15], req:()=>!S.f.b4_c7_look,
            edges:id=>[id === 'tebbet' && ['the far view is his, even in this', 2], id === 'sathi' && ['she has watched camps in the dark all her life', 1], id === 'darrut' && ['he watched the Whirlwind from the Aren walls', 1], b47Close() && ['the Third went forward last night and knows the ramps', 2], id === 'tallow' && ['he keeps looking at the oasis instead', -1]],
            near:{t:()=>`Yes, but the dust comes up the rock in a gust and ${NAME(ROLL().who || 'sgt')} takes it in the eyes, and sees the rest of the night through grit. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c7_lookout_ok', fail:'b4_c7_lookout_no'},
          {t:'Leave the sentry to it.', go:()=>startExplore()}]}),
    b4_c7_lookout_ok:()=>({sp:'The lookout rock', fx:()=>{ S.f.b4_c7_look = 'ok'; }, txt:
`${by({tebbet:`Tebbet lies on his belly on the cold rock and watches without blinking for a long count. "They're not moving about," he says at last. "They're moving along. All of them. Into the trenches, down the ramps, from the city. Filling the line." He keeps watching. "Like men who've been told something's coming tonight. They don't know what. They're looking every way at once."`, _:`{who} lies on the cold rock and watches for a long count. "They're filling the trenches," at last. "From the city, down the ramps. All of them. Like men who've been told something's coming tonight and don't know what. They're looking every way at once."`})}

The regular with the crossbow lets his breath out. "Not at us, then."

"Not at us," the Third agrees, and not one of them on the rock believes it.`,
      ch:[{t:'Back down to the scrape.', go:()=>startExplore()}]}),
    b4_c7_lookout_no:()=>({sp:'The lookout rock', fx:()=>{ S.f.b4_c7_look = 'no'; }, txt:
`The dust and the dark and the fires make one brown smear, and the ramps come and go in it. ${by({sgt:'You watch', _:'{who} watches'})} until the eyes run, and see fires, and the shapes of men passing in front of them, and nothing that means anything. The regular says they're moving about. He says it twice, as if that were a report.`,
      ch:[{t:'Back down to the scrape.', go:()=>startExplore()}]}),
    b4_c7_picket_back:()=>({sp:'The way back', txt:
`West along the rise, the rest of the block strung out in its scrapes in the dust, and behind it, a long way back, the Adjunct's lines and the horse held back with nowhere to go. The Third's place is here.`,
      ch:[{t:'Not that way.'}]}),

    /* ---- the shielded fire in the scrape (not the chapter's hub, which is on the island): the squad's talk on the night ---- */
    b4_c7_shield:()=>({sp:'The shielded fire', scene:'b4_c7_night', again:()=> b47Ph() >= 3 ? 'The shielded fire in the scrape, down to coals. The night is nearly over.' : 'The shielded fire in the scrape, a handful of coals under a hide, giving more smoke than light.', txt:
`A fire in a hole in the scrape with a hide stretched over it on stakes, so the ramps cannot see it: a handful of coals, enough to warm water and hands, not enough to see a face by. The Third sits round it close, knee to knee, in the smoke.${b47Dog() ? `\n\nHackle lies across the hole's lip with his nose toward the basin, and every so often lifts his head and listens to something nobody else can hear.` : ''}`,
      ch:[{t:'Talk with the squad.', go:'b4_c7_shield_talk'},
          {t:'Sit an hour and rest. It will be a long night.', req:()=>!S.f.b4_c7_rest1, fx:()=>{ S.f.b4_c7_rest1 = 1; b4Rest('The squad sits an hour knee to knee round the coals, and rests in turns. Wounds close, mostly.'); }, go:'b4_c7_shield'},
          {t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c7_shield_talk:()=>{ const ln = [], ph = b47Ph();
      if (b4In('haddat')) ln.push(ph >= 3 ? `Haddat has the names out, the way she says them at night, and tonight she does not say them under her breath. She says them to the basin. When she gets to the end she starts again from the beginning.` : `Haddat is sitting with the blue shield across her knees and her hand flat on it. "Dom is over there," she says, in Hissari. "The man who killed the Chain, in the end, at the city wall." ${['parted', 'lost', 'came'].includes(b4Was('b2_ilhar')) && b4Was('b2_ilhar') !== 'came' ? 'She stops. "And others," she says. She does not say who.' : 'She stops. "Tomorrow I would like to see his face. Once."'}`);
      if (b4In('sathi')) ln.push(`Sathi has Hackle's head in her lap and her own head down by his ear. "He won't sleep," she says. "He keeps looking at the oasis. Dogs know." She scratches his ear. "Wickan dogs know more than most."`);
      if (b4In('tangle')) ln.push(`Tangle has the satchel open on his knees and is counting by feel in the dark: "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}, ${numw(S.inv.burner || 0)} burner${(S.inv.burner || 0) === 1 ? '' : 's'}." He shuts it. "Mincer would have had a cusser in each of those trenches by now," he says. "From underneath. You'd never have seen him go." He opens it and counts again.`);
      if (b4In('marrow')) ln.push(`Marrow is turning her knotted string in her fingers, not tying. "There is something under this ground, child," she says. "Under the warren. Like a crowd in the next room, all holding its breath." She puts the string away. "It has been holding it a long time."`);
      if (b4In('tallow')) ln.push(`Tallow has the deck out under the hide, not reading it, only holding it. "She never read the night before a big catch," he says. "She said it was bad luck to know." He puts it away. "I'd like to know."`);
      if (b4In('hessa')) ln.push(`Hessa sits very straight with the spear upright beside her. "At the temple door," she says, "the night before a feast, the old guards would say: tomorrow the god eats. Stand where she can see you." She looks at the oasis. "I do not know whose god eats tomorrow."`);
      if (b4In('tebbet')) ln.push(`Tebbet is waxing his bowstring by feel. "Range in this is nothing," he says. "Ten paces and the dust has it." He keeps waxing. "I'd rather be a long way off. I'd rather be in the hills above the Dal Hon river with a goat." He thinks about it. "Two goats."`);
      if (b4In('darrut')) ln.push(`Darrut has his feet to the coals and his helm on his knee. "On the wall at Aren," he says, "the night before the Whirlwind came up to it, it was like this. Everybody quiet. Everybody listening." He turns the helm. "That is all I will say about the wall."`);
      if (b4In('orvas')) ln.push(`Orvas is mending a strap on his lance by feel. "Gall says the Khundryl are not Wickans," he says, "but we shall strive to be." He pulls the strap tight. "Tonight I would like to be a Wickan. They are with the horse lines too. They are not happy either. It is something."`);
      if (b4In('redblade')) ln.push(`Ramin is scraping grit out of the links of his scale with a thumbnail, one at a time. "Some of the Dogslayers were Malazan soldiers," he says. "Seven Cities men, in the Empire's coin. Like me." He keeps scraping. "I would like them to have chosen differently. I would like it a great deal."`);
      if (b4In('warlock')) ln.push(`Keth has his palms flat on the sand at the fire's edge. "*They are coming up,*" the grandmother says, very quietly. "*Out of the sand. Old ones, and new ones. I can feel them standing.*" Keth, his own voice, small: "I wish she'd stop."`);
      if (b47Dog() && !b4In('sathi')) ln.push(`Hackle lies across your boots with his ears flat and his nose toward the oasis, and will not be moved.`);
      return {sp:'The shielded fire', scene:'b4_c7_night', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight, round the coals. You sit with it.`,
        ch:[{t:'Back to the fire.', go:'b4_c7_shield'}]}; },

    /* ---- the screen: across the basin at dusk, and the night as it comes ---- */
    b4_c7_screen:()=> !S.f.b4_c7_outDone ? ({sp:'The screen', scene:'b4_c7_night', txt:
`Through a gap in the brush the basin goes out flat to the ramps, and the dust lies on it in sheets that move without wind. The trenches are dark lines along the ramps' faces. The fires behind them are coming up one by one. A long way off a horn goes, once, on the Whirlwind's side, and stops in the middle of its note.

Over the oasis the sky is darker than the rest of the sky.${b47Close() ? ' The Third knows that dark. It saw it from much closer last night.' : ''}`,
      ch:[{t:'Back from the screen.', go:()=>startExplore()}]}) : b47Ph() >= 3 ? ({sp:'The screen', scene:'b4_c7_night', txt:
`The basin is dark and still. On the ramps nothing moves. Where the trenches are there is no sound at all, and no fire, and the dust is settling on them as it settles on anything that stays still long enough.`,
      ch:[{t:'Back from the screen.', go:()=>startExplore()}]}) : ({sp:'The screen', scene:'b4_c7_night', txt:
`Full dark now. The Dogslayers' fires are low behind the trenches. The dust has thickened until the basin is a dark sea with the ramps standing up out of it, and the screen is the edge of the world.

Then, a long way off, past the ramps, past the dead city, somewhere inside the oasis, there is a sound. It is almost nothing: a sound like a battle being fought on the far side of a hill, or under the ground, the shouts too small to be shouts and the iron too thin to be iron. It comes, and goes, and comes.`,
      ch:[{t:'Listen.', onward:true, go:'b4_c7_sounds'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_sounds:()=>({sp:'The screen', scene:'b4_c7_night', fx:()=>{ if (!S.f.b4_c7_heard) { S.f.b4_c7_heard = 1; b4Nerve(-1, 'Sounds in the oasis, and nobody knows what'); } }, txt:
`The whole picket is listening now. Along the screen in the dark there are faces turned toward the oasis, pale smudges, every one of them still.

It is not the Fourteenth. The Fourteenth is here, in its lines, and the Adjunct's orders were nobody moves. Whatever is fighting in the oasis is fighting there by itself: the Whirlwind and somebody, or the Whirlwind and itself.${b47Say({haddat:`\n\n"Inside the camp," Haddat says, very low. "They are killing each other in there." She does not sound glad.`, tebbet:`\n\nTebbet has his head on one side. "That's a long way off," he says. "Further than the oasis. Or deeper." He does not like either.`, _:''})}${b47R({warlock:`\n\n"*No,*" the grandmother says, out of Keth's mouth, "*not them. Listen under it. Under the sand.*"`, orvas:`\n\nOrvas has gone very still. "That is not a battle," he says. "That is somebody hunting."`, redblade:`\n\nRamin has his hand on his sword hilt and does not know he has. "Knives," he says. "Not swords. Listen. Knives in tents."`})}

And then, over the oasis, the dark begins to change.`,
      ch:[{t:'Watch it.', onward:true, go:'b4_c7_dark'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_dark:()=>({sp:'The screen', scene:'b4_c7_night', txt:
`It is not light. It is the dark above the oasis thinning, the way the dark thins an hour before dawn, except that dawn is half a night away and it is thinning in the wrong place. Through it, along the tops of the ramps, small pale things are moving, drifting and turning over the trenches in their hundreds, catching what light there is.

Butterflies. At night, in the dust, over Dom's trenches. A recruit somewhere down the screen laughs, once, high, and stops.

By the nearest trench, on the shoulder of the ramp, there is a standard. It was not there at dusk. It is not the Dogslayers'. Even at this distance, even in this, the shape of it is plain to anybody who marched with the Chain: a Wickan standard, a crow's wings and a horse's tail on a lance, standing by itself on the ramp with nobody holding it.${b47Say({sathi:`\n\nSathi makes a sound in her throat, and that is all she makes.`, haddat:`\n\nHaddat's hand closes on the edge of the blue shield until the knuckles show.`, _:''})}${b47Close() ? `\n\nOn the night before Pan'arak the Third went forward and saw something wrong in the dark above the oasis. This is what it was. It is still wrong. It is coming closer.` : ''}`,
      ch:[{t:'Hold the screen.', onward:true, go:'b4_c7_ride'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_ride:()=>({sp:'The night', scene:'b4_c7_ride', fx:()=>{ S.f.b4_c7_ride = 1; }, txt:
`Then there is a sound a league off, which is where nothing is: a long low sound like a great many horses on hard ground, coming, and the ground under the scrape begins to tremble with it, very slightly, the way a table trembles when a cart goes by in the street.

And out of the dust behind the block, out of the desert where the army came from, there is light. Not fire. A grey light, low on the ground, moving, and dust going up off it in a long wall, and in the light, riders.

They come past the end of the picket line at the gallop, ${b47Close() ? 'a stone\'s throw off' : 'a long bowshot off'}, a river of them, and there is no sound of hooves. Wickan braids. Crow feathers. Khundryl tears on faces that are not faces. Malazan helms, the old Seventh's, and the Chain's patched cloaks, and men in the colours of the army that hung in the trees along the Aren Way. Older riders than any of those, in harness no one has made for a thousand years, out of the sand itself. They do not look at the picket. They ride for the ramps.${S.f.b4_carried === 1 ? `\n\nSome of them ride wet to the knee, as if they had come up out of a river. The Third carried some of the river's dead out of the ford at the Vathar. It knows, without anybody saying so, which ones these are.` : ''}${b47Say({marrow:`\n\nMarrow is on her feet with her hands open in front of her, the way she stands at a wound. "Oh, child," she says, to all of them, to the riders. "Oh, you came."`, tangle:`\n\nTangle is on his feet with the satchel forgotten in the scrape behind him. He is counting them under his breath, out of habit, and losing count, and starting again.`, _:''})}${b47R({orvas:`\n\nOrvas is standing on the screen's edge with the tears wet on his face under the black ones. "Ours," he says. "The Burned Tears' dead. There, at the front. A woman leads them." His voice goes. "They ride where the Wickans ride."`, warlock:`\n\nKeth has his palms raised to them. "*All of them,*" the grandmother says, and for once there is nothing dry in it at all. "*Every one. Oh, look at them.*"`, redblade:`\n\nRamin has his helm off and does not know it. He is looking for faces. Every soldier on the picket is looking for faces.`})}`,
      ch:[{t:'Look at the near edge of them.', onward:true, go:'b4_c7_face'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_face:()=>{ const f = b47Face(), nm = b47Namer();
      return {sp:'The near edge', scene:'b4_c7_ride', fx:()=>{ S.f.b4_c7_faceSeen = 1; S.f.b4_c7_namer = nm; S.f.b4_c7_face = f || 'ladle'; }, txt:
`${b47FaceLook()}

The rider does not look at the picket. Nothing among them looks at anything but the ramps. And then, going by, it does: the head turns, once, toward the scrape where the Third is, the way you look over your shoulder at a door you used to come in by, and turns back, and is gone into the light and the dust with the rest.

${nm === 'sgt' ? `You hear yourself say the name. "${b47FaceName()}." You do not decide to. It is just said, into the dark, and the dust takes it.` : `${NAME(nm)} says the name. "${b47FaceName()}." Just that. Not loud. ${nm === 'haddat' ? 'The way she says the names at night.' : nm === 'marrow' ? 'The way she says *child*.' : nm === 'tangle' ? 'As if counting it.' : 'Into the dark.'}`}${f === 'sathi' && b47Dog() && !b4In('sathi') ? `\n\nHackle is on his feet, stiff, his whole body pointed after the light. He does not bark. He whines, once, very high, the way he used to at the end of a day when she came back, and then he lies down where he is with his nose on his paws and does not move.` : ''}`,
        ch:[{t:'Say it back, so the recruits hear it: "Our dead ride with us."', fx:()=>{ S.f.b4_c7_faceSeen = 1; S.f.b4_c7_namer = nm; S.f.b4_c7_face = f || 'ladle'; S.f.b4_c7_faceSaid = 'aloud'; b4Nerve(1, 'The Chain\'s dead ride with the Fourteenth: the company heard it'); }, go:'b4_c7_after_ride'},
            {t:'Say nothing. Let it be the Third\'s.', fx:()=>{ S.f.b4_c7_faceSeen = 1; S.f.b4_c7_namer = nm; S.f.b4_c7_face = f || 'ladle'; S.f.b4_c7_faceSaid = 'kept'; b47L(nm, 2); b47L('haddat', 1); b47L('marrow', 1); }, go:'b4_c7_after_ride'}]}; },
    b4_c7_after_ride:()=>({sp:'The night', scene:'b4_c7_night', fx:()=>{ S.f.b4_c7_ph = Math.max(b47Ph(), 3); }, txt:
`${S.f.b4_c7_faceSaid === 'aloud' ? `"Our dead," you say, not loud, but the screen is very quiet and it goes along it. "The Chain's. They ride with us." The freckled girl repeats it to the boy next to her, and he to the next. By the time it reaches the far end of the block it is a different sentence. It does not matter. Along the screen the spears come up.` : `The Third keeps it from the picket. The picket does not ask. Every one of them saw somebody, or thought they did, and every one of them is keeping it.`}

The light goes up the ramps. From the screen it is a grey glow going up into the trenches like water going up into sand, and the dust thick over it, and then nothing: the glow is in the trenches, and the trenches are dark.

There is no sound of it. That is the worst of it, after: there is no sound at all. Nothing comes back down the ramps. Before midnight the butterflies are gone, and the standard on the ramp's shoulder is gone, and the fires behind the trenches go out one by one and are not lit again, and the basin is as quiet as a basin with nobody in it.`,
      ch:[{t:'Keep the picket. Wait for the morning.', go:()=>startExplore()}]}),

    /* ---- dusk: the outriders in the scrub (the first fight, with the company) ---- */
    b4_c7_out_start:()=>({sp:'The scrub, east', scene:'b4_c7_night', txt:
`East of the picket the rise breaks up into scrub and broken ground, thorn and rock and dry gullies running down into the basin. In the last of the light, between the thorn, there are riders: veiled to the eyes in robes the colour of the dust, a dozen of them, picking their way along the end of the block at a walk, looking at it. One of them has stopped his horse on a hump of rock and is counting the screen's stakes with his lips moving.

They have not seen the Third. They have seen a screen, and a scrape, and a handful of regulars, and they are deciding what to make of it.${b47Say({tebbet:`\n\nTebbet has an arrow on the string. "Twelve," he says. "I'd rather be a long way off. I'd rather they were."`, darrut:`\n\nDarrut sets his big shield on his arm. "Counting us," he says. "Let's give them a better number."`, _:''})}`,
      ch:[{t:'"Shields. Drive them off the end."', go:()=>startBattle('b4_c7_outriders', {})},
          {t:'Tangle puts two sharpers in the scrub along their path.', tag:'uses 2 sharpers', req:()=>b4In('tangle') && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c7_outriders', {pre:true})},
          {t:'Get round the gully and come at them from below, out of the dust.', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['he would rather be a long way off, and up high, and is', 2], id === 'sathi' && ['she knows where riders look and where they don\'t', 1], id === 'orvas' && ['he knows where a horse will look', 1], id === 'haddat' && ['she has hunted riders in worse dust than this', 1], id === 'hessa' && ['a temple guard does not creep', -1]],
            near:{t:'Yes, but a horse on the rock throws up its head at the smell of strangers and screams, and the riders turn all at once, already drawing.'},
            go:()=>startBattle('b4_c7_outriders', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c7_out_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_out_seen:()=>({sp:'The scrub, east', scene:'b4_c7_night', txt:
`The gully is full of loose stone and somebody's boot sends a slab of it rattling down into the basin. The rider on the hump of rock turns at the sound, and shouts, and the riders come off the rock and out of the thorn at the squad with their blades out, low on their horses, out of the dust.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c7_outriders', {surprise:'e'})}]}),
    b4_c7_out_after:()=>({sp:'The scrub, east', scene:'b4_c7_night', fx:()=>{ if (!S.f.b4_c7_outDone) { S.f.b4_c7_outDone = 1; S.f.b4_c7_ph = Math.max(b47Ph(), 2); } }, txt:
`The riders who can still ride go back into the dust toward the basin, low on their horses, and the dust takes them in a hundred paces. They will say there is more on the end of the block than a screen. That will have to do.

In the gully the regular who came with the squad is sitting on a stone with his arm round a cut in his side, swearing into his cloak. The horses the riders left are standing in a line with their heads down, as if nothing had happened.${b47Say({haddat:`\n\nHaddat stands over one of the riders who did not go back. She does not lift the veil. She looks at the hands, and the boots, and the stitching on the robe. "Desert," she says. "Not the city." She breathes out.`, marrow:`\n\nMarrow kneels by the regular. "Sand in it already," she says. "Of course there is. Hold still, child."`, _:''})}${b47R({orvas:`\n\nOrvas walks along the line of horses, talking to them in Khundryl, and they let him. "Good horses," he says. "Better than ours. Tonight nobody needs a horse." He sounds as if he knows something.`, redblade:`\n\nRamin wipes his blade on the sand. "Desert tribes," he says. "Not Dom's. Sha'ik's own." He looks at the oasis. "They wanted to know where the door was."`, warlock:`\n\n"*Gone back,*" the grandmother says, of the riders who rode off. "*They will not be going back for long.*"`})}

Full dark comes down while the Third walks back up to the screen.`,
      ch:[{t:'Back to the screen.', go:()=>startExplore()}]}),

    /* ---- before dawn: the signpost, the end of the line, and the choice the player sees coming ---- */
    b4_c7_to_breach:()=> b47Ph() < 3 ? ({sp:'The east end of the picket', txt:
`East, past the last scrape, the rise runs out into scrub and the end of the line, and past the end of the line there is only the desert. ${S.f.b4_c7_outDone ? 'The Third\'s place tonight is at the screen.' : 'Riders in the scrub, at dusk. Radde will want them seen to first.'}`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The east end of the picket', txt:
`East, past the last scrape, the rise runs out into scrub and the end of the line. Radde is down there already, with the book.`,
      ch:[{t:'Down to the end of the line.', onward:true, go:'b4_c7_predawn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_predawn:()=>({sp:'Sergeant Radde · the end of the line', html:nerveHTML('Before dawn'), scene:'b4_c7_predawn', fx:()=>{ S.f.b4_c7_ph = Math.max(b47Ph(), 3); }, txt:
`An hour before dawn Radde comes along the scrape at a crouch with the book in his shirt and touches the sergeant's shoulder, and points.

East, past the end of the screen, where the line stops and the desert starts, there are shapes coming out of the dark. Not riders. Men on foot, running, in ones and twos and then more, out of the basin, out of the oasis, the way the riders of the dead went in: a band of them, desert warriors by the robes, forty, fifty, no order to it, going hard for the gap past the last picket and the open desert beyond. Some of them have no weapons. Some of them are carrying others.

"They're not coming at us," Radde says, very low. "They're going round us. Out the end, the way the Adjunct said they would." He looks at the sergeant. "The orders are hold the block. The block's for holding. That's the end of the block, there, and nothing on it but us." He waits. "Or we let them by. Some picket further out will see them, or none will. I'll write it either way."${b47Close() ? `\n\nThey are nearer than they should be already. On the night before, the Third went forward in the dark and walked this ground; so, it seems, did they.` : ''}${b47R({orvas:`\n\nOrvas watches them come, and his face is hard to read under the tears. "They are running from what we saw," he says. "I would run."`, redblade:`\n\nRamin's hand is on his hilt. "Those are not soldiers," he says. "Those are men leaving." He does not say which he would rather fight.`, warlock:`\n\n"*Frightened,*" the grandmother says. "*Frightened men with knives, children. Choose.*"`})}`,
      ch:[{t:'"Hold the end of the line." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, fx:()=>{ S.f.b4_c7_ph = 4; S.f.b4_c7_hold = 1; }, go:()=>{ startExplore('b4_c7_breach'); talk('b4_c7_breach_arrive'); }},
          {t:'"Let them go by."', fx:()=>{ S.f.b4_c7_letGo = 1; S.f.b4_c7_ph = 4; b4Nerve(-2, 'The Chain squad let them go by the end of the line, and the company saw'); }, go:'b4_c7_letgo'},
          {t:'"A moment, Radde."', go:()=>startExplore()}]}),
    b4_c7_letgo:()=>({sp:'The end of the line', scene:'b4_c7_predawn', txt:
`The Third stays in its scrape and lets them go by.

They come past the end of the line close enough to hear: the breath going in and out of them, the slap of sandals on the hard sand, somebody weeping in a tongue of the deep desert as he runs. Some of them see the screen and the faces behind it and veer off, and keep running. One stops, a boy with a spear, and looks straight at the Third through the brush, and then he runs too. In a quarter of an hour the last of them have gone past into the grey and the desert has them.

Along the screen the Second Company watched it, and held its fire, and was not told to do anything else. The freckled girl at the end of the row looks at the sergeant, and away, and does not ask.${b47Say({haddat:`\n\n"They were going home," Haddat says. "Some of them." She sounds as if she is not sure she believes it.`, tangle:`\n\nTangle lets out a breath he has been holding a long while. "Nobody to bury," he says. "That's something." He does not sound sure either.`, _:''})}`,
      ch:[{t:'Wait for the light.', go:()=>{ S.f.b4_c7_ph = 4; startExplore('b4_c7_breach'); talk('b4_c7_dawn'); }}]}),

    /* ---- the end of the line, before dawn: the mortal fight ---- */
    b4_c7_breach_arrive:()=>({sp:'The end of the line', scene:'b4_c7_predawn', txt:
`The last of the screen is a few stakes and a hide, and then nothing: the rise goes down into the open, and the desert goes away east under a sky just beginning to lose its black. Two regulars of the 9th are crouched behind the last stake with their spears, and look round at the Third coming down the line the way men look at a door opening in a cellar.

The running men are close now. ${b47Close() ? 'Closer than they should be.' : 'A long throw off, and coming.'} In the grey you can see the robes, and the bare feet, and the blades, and that the ones in front have seen the Third.`,
      ch:[{t:'Set the line.', go:()=>startExplore()}]}),
    b4_c7_radde_breach:()=>({sp:'Sergeant Radde', scene:'b4_c7_predawn', txt:
`Radde is behind the last stake with the book inside his shirt and a regular's spear in his hands, which the Third has never once seen him hold. "They'll come at the gap," he says. "Where the screen stops. They've nowhere else." He looks at the sergeant. "Whoever goes down here, I write down. Properly. I'd rather not have to."`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()},
          {t:'"Let them go by after all."', fx:()=>{ S.f.b4_c7_letGo = 1; b4Nerve(-2, 'The Chain squad let them go by the end of the line, and the company saw'); }, go:'b4_c7_letgo'}]}),
    b4_c7_lastscreen:()=>({sp:'The last of the screen', scene:'b4_c7_predawn', txt:
`The last few stakes of the screen, and the hide sagging between them, and a regular's water skin hung on one of them by its strap. Past it, nothing. ${S.f.b4_c7_breakDone || S.f.b4_c7_letGo ? 'The ground past it is churned with running feet, all going one way.' : 'The ground past it is open, and the dark is going grey over it.'}`,
      ch:[{t:'Back from it.', go:()=>startExplore()}]}),
    b4_c7_breach_back:()=>({sp:'The way back', txt:
`Back along the line, the screen and the scrapes and the rest of the picket. ${S.f.b4_c7_breakDone || S.f.b4_c7_letGo ? 'Dawn first. Radde.' : 'Not now. They are coming here.'}`,
      ch:[{t:'Not that way.'}]}),
    b4_c7_hold:()=>({sp:'The end of the line', scene:'b4_c7_predawn', txt:
`They come at the gap. A knot of them in front, running hard, and behind them the rest in a ragged spill, and at the front of the knot a man with a good sword, a real one, an officer's or a chief's, who has seen the Third behind the last stake and has not slowed down. He shouts something over his shoulder. The ones behind him draw.

This is the end of the line. Whatever happens here happens to the Third, and stays happened. <em>Whoever falls here stays down.</em>${b47Say({haddat:`\n\nHaddat sets the blue shield. "They will not stop," she says. "They cannot. Look at their eyes." She does not lower the shield.`, hessa:`\n\nHessa plants her spear. "A door," she says. "We are the door. They will have to come through it."`, darrut:`\n\nDarrut sets his big shield at the gap. "A gate," he says. "I know about gates." The wall he leaves out.`, _:''})}${b47R({orvas:`\n\nOrvas sets his lance. "I would rather this on a horse," he says. "I would rather not this at all."`, redblade:`\n\nRamin draws, and sets himself. "Whoever they are," he says, "they chose tonight to be somebody else's." He does not sound as if he believes himself.`, warlock:`\n\n"*Hold,*" the grandmother says. "*Hold, child. The dead held for you.*"`})}`,
      ch:[{t:'"Shields. Hold the gap."', go:()=>startBattle('b4_c7_breakout', {})},
          {t:'Tangle puts two sharpers in their path.', tag:'uses 2 sharpers', req:()=>b4In('tangle') && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c7_breakout', {pre:true})},
          {t:'Pull the last stakes across the gap, and make them come at you one at a time.', check:['might', 15],
            edges:id=>[id === 'darrut' && ['he has held a gate', 2], id === 'hessa' && ['a temple door is held exactly so', 2], id === 'haddat' && ['she is the strongest of them', 1], id === 'tangle' && ['he knows how a thing falls', 1], id === 'tebbet' && ['he would rather be a long way off', -1]],
            near:{t:()=>`Yes, but a stake comes down wrong and opens ${NAME(ROLL().who || 'sgt')}'s forearm to the bone on the way, and the gap is narrower and the blood is everywhere. A little health down.`, fx:()=>{ bruise(ROLL().who || 'sgt', 3 + lvT()); }},
            go:()=>startBattle('b4_c7_breakout', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c7_hold_seen'},
          {t:'"Let them go by after all."', fx:()=>{ S.f.b4_c7_letGo = 1; b4Nerve(-2, 'The Chain squad let them go by the end of the line, and the company saw'); }, go:'b4_c7_letgo'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_hold_seen:()=>({sp:'The end of the line', scene:'b4_c7_predawn', txt:
`The stakes are driven deep and the hide is lashed to them, and ${by({sgt:'you are', _:'{who} is'})} still dragging at the first when the man with the good sword comes through the gap at a dead run and the rest come after him.`,
      ch:[{t:'Shields.', go:()=>startBattle('b4_c7_breakout', {surprise:'e'})}]}),
    b4_c7_break_after:()=>{ const fell = (S.f.lastFallen || []).filter(id => TPL[id]);
      return {sp:'The end of the line', scene:'b4_c7_predawn', fx:()=>{ if (!S.f.b4_c7_breakDone) { S.f.b4_c7_breakDone = 1; if (fell.length) b4Nerve(-1, `${b47And(fell.map(NAME))} fell at the end of the line`); } }, txt:
`The ones who could still run have run, round the end of the line and away east into the grey, and the desert has them. The ones who could not are lying on the sand past the last stake. The man with the good sword is among them, on his face, with his hand still on it.

${fell.length ? `${b47And(fell.map(NAME))} did not get up.\n\n${fell.length > 1 ? 'They are' : (TPL[fell[0]] && ['haddat', 'sathi', 'marrow', 'hessa'].includes(fell[0]) ? 'She is' : 'He is')} lying where the line was held, ${fell.length > 1 ? 'a little apart, as they stood' : 'at the gap'}. The squad does what there is to do. Radde takes the book out of his shirt, and writes, properly, with his hand steady, and then sits down on the sand beside the last stake for a while and does not write anything.${b47Say({haddat:`\n\nHaddat says the ${fell.length > 1 ? 'names' : 'name'}. Then she says them all again, every name she has, from the beginning, with these at the end.`, marrow:`\n\nMarrow kneels a long while. Then she ties a knot in her string, and another, and puts it away.`, _:''})}` : `Everyone in the Third got up. Radde looks along the squad twice, counting, and gets the same number both times, and lets his breath go, and writes one line in the book and shuts it.`}${b47R({orvas:`\n\nOrvas stands over the man with the good sword. "He was a chief of something," he says. "Once. Tonight he was running." He does not take the sword.`, redblade:`\n\nRamin cleans his blade on the sand, slowly, and does not look at the dead.`, warlock:`\n\n"*Gone,*" the grandmother says, quietly. "*All of them, one way or the other. The night's over, children.*"`})}`,
        ch:[{t:'Wait for the light.', go:'b4_c7_dawn'}]}; },
    b4_c7_dawn:()=>({sp:'Dawn', scene:'b4_c7_morning', fx:()=>{ S.f.b4_c7_ph = Math.max(b47Ph(), 4); }, txt:
`Dawn comes up grey and slow behind the dust, and finds the Fourteenth where the Adjunct left it: in its lines, in its scrapes, on its rise, facing three ramps and a dead city and an oasis.

Nothing has moved on the ramps all night. Nothing moves on them now. The light comes up the faces of the trenches, and there are no fires behind them, and no smoke, and no heads along the lip. There is no sound from the dead city. There is no sound from anywhere. The dust is coming down out of the air in the stillness, slowly, the way snow comes down.`,
      ch:[{t:'Back along the line.', onward:true, go:()=>{ S.f.b4_c7_ph = 5; startExplore('b4_c7_line'); talk('b4_c7_morning'); }},
          {t:'"A moment."', go:()=>startExplore()}]}),

    /* ---- the morning on the line ---- */
    b4_c7_morning:()=>({sp:'The morning', scene:'b4_c7_morning', fx:()=>{ if (!S.f.b4_c7_morning) { S.f.b4_c7_morning = 1; b4Nerve(1, 'The trenches are silent, and the army is still here'); } }, txt:
`The trenches are silent.

All along the block, all along the army's lines, the Fourteenth is standing up in its scrapes and looking at them, and nobody is saying anything, and the dust is coming down. A Seti patrol rides out across the basin at a walk to the foot of the nearest ramp and stops there, and sits its horses, and after a while rides back, and the officer at its head shakes his head at somebody, once, and that is the whole report.

${b47Say({haddat:`Haddat stands at the screen a long time with her hand on the blue shield. ${['parted', 'lost'].includes(b4Was('b2_ilhar')) ? 'She is looking at the trenches the way you look at a house that has burned, trying to remember which window was whose. She does not ask anybody anything.' : 'She is looking at the trenches. "Dom\'s men," she says, at last, in Hissari. "The ones who were Malazans." That is all.'}`, marrow:`Marrow is sitting with her back to the screen and her hands in her lap. "In the morning, I said," she says. "I'll look at them in the morning." She does not turn round.`, _:`The squad stands at the screen and looks at the trenches.`})}${b4In('tallow') ? `\n\nTallow has his grandmother's deck out and is holding it in both hands like a cup. He has not opened it.` : ''}`,
      ch:[{t:'Find Radde.', go:()=>startExplore()}]}),
    b4_c7_radde_morning:()=>({sp:'Sergeant Radde', scene:'b4_c7_morning', fx:()=>{ if (!S.f.b4_c7_raddeMorn) { S.f.b4_c7_raddeMorn = 1; b4Nerve(-1, 'Fist Gamet is dead'); } }, txt:
`Radde has the book open and is writing, small and steady, with the dust settling on the page. He finishes the line before he looks up.

"Word from the Adjunct's tents," he says. "Fist Gamet died in the night. In his bed. Fist Keneb says a clot in the brain. From that fall in the fog in the hills, the camp says." He looks at the page. "Keneb's Fist. Made it this morning, before the sun was up." He writes that too. "The old man was decent to the 9th, the once. I'll put that down."

He blows the grit off the page, and shuts the book, and looks at the trenches. "And nobody's going in there till they're told. The Red Blades have it. Baralta wants it." He does not name what is in there. All along the line, the 9th is not naming it. "The Adjunct's riding out. Watch the plain. The whole army's watching the plain."`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()},
          {t:'To the screen.', go:'b4_c7_watch'}]}),
    b4_c7_radde_morning_again:()=>({sp:'Sergeant Radde', scene:'b4_c7_morning', txt: S.f.b4_c7_ramps ?
`Radde is writing. "Sword's yours, if you want it," he says, without looking up. "The Red Blades aren't asking for it back."` : !S.f.b4_c7_duel ?
`Radde is at the screen with the book shut, looking at the plain. "Watch," he says. "Everybody's watching."` :
`Radde is at the screen with the book shut. "Later," he says. "Later, Sergeant."`,
      ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c7_hollet_morning:()=>({sp:'Captain Hollet', scene:'b4_c7_morning', fx:()=>{ S.f.b4_c7_holletMorn = 1; if (S.f.b4_c7_duel) { S.f.b4_c7_ranal = 1; S.f.b4_c7_bound = S.f.b4_c7_bound || 1; } }, txt: !S.f.b4_c7_duel ?
`Captain Hollet is standing on his water barrel to see over the screen, with the tablet against his chest and the cloth over his mouth, and he is not coughing. He is looking at the trenches.

"I counted the fires last night," he says, without looking down. "Before I could sleep. There were four hundred and some. Then I counted them going out." He lowers the tablet. "I didn't count those."` :
`Captain Hollet is sitting on his water barrel with his tablet on his knee, and has written something on it at last.

"Captain Ranal's dead," he says. "Of the 8th. The young one, from the good family. He took some of the marines after a band of desert warriors this morning, into a sandstorm, out on the edge of things, and he didn't come back out of it. The marines came back." He looks at what he has written. "The camp says there were riders in the storm. Pale ones. The camp says a great many things this morning."

He wipes the tablet with his thumb. "And a bound man came in across the plain a while ago, on foot, to the Adjunct's standard, between two people the line couldn't make out. Big man. A Malazan officer's cloak, filthy." He coughs, at last, into the cloth. "The camp says it was Korbolo Dom."${b47Say({haddat:`\n\nHaddat, behind you, goes very still. "Dom," she says. Just the name. Then she walks away along the screen and stands there by herself with her back to everybody.`, tangle:`\n\nTangle has stopped breathing. "Him," he says. "Bound." He looks at his hands as if they belonged to somebody who wanted to do something with them. "Good," he says. "Good." It does not sound like good.`, _:''})}`,
      ch:[{t:'"Thank you, sir."', go:()=>startExplore()}]}),
    b4_c7_recruit_morning:()=>({sp:'The freckled recruit', scene:'b4_c7_morning', fx:()=>{ S.f.b4_c7_recMorn = 1; }, txt:
`The freckled girl is sitting in the scrape with her spear across her knees, the Chain's way, and she does not get up when the sergeant comes along the line. Her face is grey under the freckles.

"Sergeant." She looks across at the ramps. "Last night. The riders." She swallows. "My brother went with the Seventh. Out of Aren, before the rising. We never heard." She looks down at her spear. "I looked at every one of them. I looked so hard." She does not say whether she saw him. She does not say whether she didn't.${b47Say({marrow:`\n\nMarrow sits down beside her without a word, and after a while puts a hand on the back of the girl's neck, the way you hold a child that has stopped crying and might start again.`, haddat:`\n\nHaddat crouches in front of her. "Tell me his name," she says. "I say the names at night. I will say his with the others." The girl tells her.`, _:''})}`,
      ch:[{t:'Sit with her a while.', go:()=>startExplore()}]}),
    b4_c7_coldfire:()=>({sp:'The fire', scene:'b4_c7_morning', txt:
`The shielded fire in the scrape is cold ash under its hide. A regular has put a pot on it anyway, out of habit, and the pot has not boiled and is not going to, and nobody has taken it off.`,
      ch:[{t:'Leave it.', go:()=>startExplore()}]}),
    b4_c7_line_back:()=>({sp:'The way back', txt:
`West along the rise, the rest of the block standing up in its scrapes in the morning light, and every face on it turned to the plain. The Third's place is here.`,
      ch:[{t:'Not that way.'}]}),

    /* ---- the duel, watched from the line in silence; then the dust settles ---- */
    b4_c7_watch:()=> S.f.b4_c7_duel ? ({sp:'The screen', scene:'b4_c7_morning', txt:
`The plain between the armies is empty again. The Adjunct's standard has gone back to her lines. The dust is down out of the air, mostly, for the first time in days, and the far side of the basin is sharp in the light: the ramps, the silent trenches, the dead city, the oasis. It all looks smaller than it did.`,
      ch:[{t:'Back from the screen.', go:()=>startExplore()}]}) : !S.f.b4_c7_raddeMorn ? ({sp:'The screen', scene:'b4_c7_morning', txt:
`The basin in the morning light, and the silent ramps, and the army standing up along its lines looking at them. Something is going to happen. Radde will know what.`,
      ch:[{t:'Back from the screen.', go:()=>startExplore()}]}) : ({sp:'The screen', scene:'b4_c7_duel', txt:
`Out of the Adjunct's lines, a long way west along the plain, a rider comes out alone on a grey horse, at a walk, and stops in the open between the armies, and waits.

From the other side, down out of the dead city, down the middle ramp past the silent trenches, a figure comes on foot. Alone. In armour, with a helm that covers the face. It walks down onto the plain and out across it toward the rider as if there were nobody else in the world, and the whole Fourteenth, every legion, every picket, every soldier in every scrape from one end of the line to the other, stands and watches it come.

There is not a sound. It is the quietest an army has ever been.`,
      ch:[{t:'Watch.', onward:true, go:'b4_c7_duel'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_duel:()=>({sp:'The plain', scene:'b4_c7_duel', fx:()=>{ if (!S.f.b4_c7_duel) { S.f.b4_c7_duel = 1; S.dust = 1; updChain(); } }, txt:
`The rider gets down off the grey horse. The two of them stand in the open a little way apart, very small at this distance, two specks of iron on a plain of sand with an army watching each.

There is no talking that carries. There is no circling. The one in armour moves, or begins to. The Adjunct's sword goes out, once, in the sun.

One thrust.

The figure in armour goes down onto the sand and does not move again. The Adjunct stands over it. The line is too far to see anything else, and the line does not try to. Along the whole of the Fourteenth, from end to end, there is no cheering, and no word.

Over the oasis something goes out of the sky that nobody had known was in it. The wind drops. The dust that has been in the air since the Wall comes down out of it, slowly, all at once, over an hour, until the far side of the basin is as sharp as a drawing.${b47Say({haddat:`\n\nHaddat lets out a breath. "Sha'ik," she says, quietly, as the whole line is saying it, all along the screen, quietly. "That was Sha'ik." She says it the once and then she says the names.`, tangle:`\n\nTangle sits down in the scrape where he stands. "That's it, then," he says. "That's the rising." He does not sound as if he believes it either.`, _:''})}${b4In('tallow') ? `\n\nTallow has the deck in his hands still. "That's it," he says. "Isn't it? That's the end of it." The Third does not answer him. It does not know.` : ''}`,
      ch:[{t:'Back along the screen.', go:'b4_c7_giant'}]}),
    b4_c7_giant:()=>({sp:'The plain', scene:'b4_c7_giant', fx:()=>{ S.f.b4_c7_giant = 1; }, txt:
`An hour after, while the army is still standing in its lines not knowing what to do with itself, a rider comes down out of the dead city by the western ramp and out onto the plain, going west.

He is too big. At this distance everything should be small and he is not small: a giant on a horse, the horse itself bigger than any horse the Third has seen, the rider sitting it as tall again as a man would. He has something long across his back. He rides past the end of the Fourteenth's lines at a walk, close enough to the Adjunct's people for them to see each other plainly, and further from the 9th's picket than a shout would carry, and he does not stop, and he does not look at the 9th.

He says something to the Adjunct's people as he goes. It does not carry to the picket. The camp, by noon, will say that he said the Malazans were not his enemies any more. Then he is a shape going west across the sand, and then a speck, and then the plain is empty.${b47Say({tebbet:`\n\nTebbet watches him the whole way, with the bow in his hands and no arrow on it. "I'd rather be a long way off from that," he says. "I am. Good."`, darrut:`\n\nDarrut watches him go. "In Aren," he says, "they said the Whirlwind had a giant. Sha'ik's bodyguard." He thinks about it. "They said a lot of things in Aren."`, _:''})}${b47R({orvas:`\n\nOrvas watches the horse, not the rider. "That horse is a Jhag horse," he says, very quietly, as if in church. "From the Odhan. They are not ridden."`, redblade:`\n\nRamin watches him go with his jaw set. "Whoever he was," he says, "I am glad he was going that way."`, warlock:`\n\n"*Oh,*" the grandmother says, out of Keth's mouth. "*That one is going a long way, children. Further than us.*"`})}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b4_c7_lookout_day:()=>({sp:'The lookout rock', scene:'b4_c7_morning', txt: !S.f.b4_c7_duel ?
`From the lookout rock in the morning light the basin is sharp and empty: the ramps, the trenches along them, the dead city. Down at the ramps' foot the Red Blades are drawn up in a line, not going in. Not yet.` :
`From the lookout rock the plain is empty, east and west, and the Adjunct's standard is back in her lines. Down at the foot of the ramps the Red Blades have gone in at last, and come out again, and some of the 9th's regulars are going along the foot of the ramps picking things up off the sand, the way soldiers do after.`,
      ch:[{t:'Back down.', go:()=>startExplore()}]}),

    /* ---- the ramps' foot, with Radde: the sword (headline only: the trenches are silent) ---- */
    b4_c7_radde_ramps:()=>({sp:'Sergeant Radde', scene:'b4_c7_morning', txt:
`Radde has the book under his arm and a sack in his other hand. "The Fist wants the 9th's arms off the sand at the ramps' foot," he says. "Before the Red Blades have it all. Not in the trenches. The trenches are Baralta's lot's; that's an order, and I'm glad of it." He holds out the sack. "The foot of the ramps. Swords, shields, anything good. You've an hour."`,
      ch:[{t:'Down to the ramps\' foot.', onward:true, fx:()=>{ S.f.b4_c7_rampsAsk = 1; }, go:'b4_c7_to_ramps'},
          {t:'"Not now, Radde."', go:()=>startExplore()}]}),
    b4_c7_to_ramps:()=> !S.f.b4_c7_duel ? ({sp:'East along the line', txt:
`East, the rise goes down toward the basin and the ramps' foot. The 9th is not going down there yet. The whole army is watching the plain.`,
      ch:[{t:'Not yet.'}]}) : S.f.b4_c7_ramps ? ({sp:'East along the line', txt:
`The ramps' foot, and the regulars of the 9th still going along it with sacks, and the silent trenches above. The Third has been. Once is enough.`,
      ch:[{t:'Not that way.'}]}) : ({sp:'The ramps\' foot', scene:'b4_c7_morning', txt:
`The foot of the middle ramp, under the trenches, in the morning light, with the dust settled on everything like flour.

There are weapons on the sand. A great many, lying where they fell or were dropped or were thrown, at the foot of the ramp and along it: swords and spears and shields, Malazan-made, the regimental marks filed off the hilts. There are no men lying with them. Whatever happened, it happened up in the trenches, and the Red Blades are up there now, and they are not talking either. Above, along the trench lip, nothing moves but the flies.${b47Say({tangle:`\n\nTangle picks up a sword and turns it over. "Dogslayer," he says. "Look. Badges cut off. Marks filed." He puts it down very carefully, the blade away from him.`, haddat:`\n\nHaddat does not go near the trenches. She stands at the ramp's foot with her back to them and picks up what Radde wants and does not look up the slope.`, _:''})}`,
      ch:[{t:'Take a good sword off the sand. (one that has been looked after)', check:['wits', 14], req:()=>!S.f.b4_c7_sword,
            edges:id=>[id === 'darrut' && ['he knows a Guard blade looked after', 2], id === 'tangle' && ['he knows good iron from bad', 1], id === 'hessa' && ['a temple guard keeps her own', 1], id === 'redblade' && ['the Red Blades know Dom\'s men\'s kit', 1], id === 'tallow' && ['he has never chosen a sword', -1]],
            near:{t:()=>`Yes, but the one worth having is half under a dead man's shield further up the ramp than anybody meant to go, and ${NAME(ROLL().who || 'sgt')} goes up for it and comes back down very white and very quiet. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c7_sword_ok', fail:'b4_c7_sword_no'},
          {t:'Fill Radde\'s sack and go back up.', fx:()=>{ S.f.b4_c7_ramps = 1; }, go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_sword_ok:()=>({sp:'The ramps\' foot', scene:'b4_c7_morning', fx:()=>{ if (!S.f.b4_c7_sword) { S.f.b4_c7_sword = 1; S.f.b4_c7_ramps = 1; gain('b4_c7_dogslayerblade'); } }, txt:
`It is a Malazan short sword, longer in the blade than issue and heavier, with the marks filed off the hilt and the leather rewound by somebody who meant to keep it. It has been oiled. A man in those trenches took care of it, the night before the night.

The Third puts it in the kit, and fills Radde's sack, and goes back up the rise without looking at the trenches again. Radde takes the sack, and looks in it, and looks at the sword, and writes something down, and does not ask.`,
      ch:[{t:'Back up the rise.', go:()=>startExplore()}]}),
    b4_c7_sword_no:()=>({sp:'The ramps\' foot', scene:'b4_c7_morning', fx:()=>{ S.f.b4_c7_ramps = 1; }, txt:
`They are all good swords, or all bad ones; ${by({sgt:'you cannot', _:'{who} cannot'})} tell, in the end, standing on that sand under those trenches. The Third fills Radde's sack with what is nearest and goes back up the rise, and nobody minds having nothing of the Dogslayers' to carry.`,
      ch:[{t:'Back up the rise.', go:()=>startExplore()}]}),

    /* ---- the warning down the line, the run, the spur, and the flood ---- */
    b4_c7_warning:()=>({sp:'A Wickan boy, running', scene:'b4_c7_morning', fx:()=>{ S.f.b4_c7_warned = 1; }, txt:
`A Wickan boy comes along the line at a dead run on foot, braids flying, one of Temul's youths, shouting the same thing at every picket he passes in Malazan with a Wickan accent, and not stopping for any of them.

"*The coral!*" He goes by the Third's scrape without slowing. "*High ground! The coral, now! The water's coming! The Wickan children say the water's coming!*" And he is past, and shouting it at the next picket, and the next.

Along the block, nobody moves. Then everybody moves. Radde is on his feet with the book in his shirt and his stick in his hand. "You heard the boy," he says. "The coral. The islands, north, the high bits. Run."${b47Say({marrow:`\n\nMarrow is already up. "Water," she says. "In Raraku." She is laughing, a little, which nobody in the Third has heard her do since the Vathar. "Oh, child. Of course. It was a sea."`, haddat:`\n\nHaddat stares north across the old sea floor. "My mother's people said the sea would come back," she says. "One day. They said it as you say the gods will come back. I did not believe them." She picks up the blue shield.`, _:''})}`,
      ch:[{t:'Run for the coral.', onward:true, go:'b4_c7_run'},
          {t:'"A moment. The kit."', go:()=>startExplore()}]}),
    b4_c7_run:()=>({sp:'The old sea floor', scene:'b4_c7_flood', txt:
`The whole Fourteenth is running north across the old sea floor at once, legion by legion, toward the coral islands standing up out of the white plain a mile off, and nobody is in step and nobody cares. Behind the army, out of the south and the east, there is a sound like wind, though there is no wind.

The Third runs with the 9th. ${b4In('tangle') ? 'Tangle runs with the satchel held over his head in both arms. ' : ''}${b4In('darrut') ? 'Darrut runs as if he were seasick already. ' : ''}${b4In('hessa') ? 'Hessa runs steadily, with the spear at the trail, as temple guards are taught to run up the steps. ' : ''}The freckled recruit is beside the squad and stays there.

Then the water comes. Not a wave: a grey sheet of it sliding over the white floor, fast, no higher than a man's shin, then his knee, filling every hollow and running on, with a froth of shell and dust on its front. It comes up behind the army at a run and does not stop.

Ahead, the nearest island is a long hump of coral with a spur running out from it toward the army, and on the spur, between the Third and the high ground, there are men. Whirlwind men, by the robes: a band cut off from somewhere by the water, coming the other way along the spur to get onto the same island, and seeing the 9th, and seeing the water, and drawing.`,
      ch:[{t:'"Through them. There\'s no other way up."', go:()=>startBattle('b4_c7_spur', {})},
          {t:'Tangle puts a burner on the spur in front of them.', tag:'uses 1 burner', req:()=>b4In('tangle') && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b4_c7_spur', {pre:true})},
          {t:'Shout to them in the desert tongue: the island is big enough for everybody.', check:['guile', 15],
            edges:id=>[id === 'haddat' && ['the tongues of the Holy Desert are hers', 3], id === 'redblade' && ['a Seven Cities voice they might hear', 1], id === 'orvas' && ['the Khundryl trade with desert tribes', 1], id === 'darrut' && ['he shouted at the Whirlwind from the Aren walls, and they never listened', -1]],
            near:{t:'Yes, but they only half believe it, and the half that does not comes at the squad anyway; the rest hang back on the spur to see who wins.'},
            go:()=>startBattle('b4_c7_spur', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c7_spur_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_spur_no:()=>({sp:'The coral spur', scene:'b4_c7_flood', txt:
`The words go out over the water and the men on the spur hear the tongue they are in and not what they say, or do not believe it, and the biggest of them shouts back, and they come along the spur at the squad with the water at everybody's knees.`,
      ch:[{t:'Shields.', go:()=>startBattle('b4_c7_spur', {surprise:'e'})}]}),
    b4_c7_spur_after:()=>({sp:'The coral spur', scene:'b4_c7_flood', fx:()=>{ S.f.b4_c7_spurDone = 1; S.f.b4_c7_flood = 1; }, txt:
`The ones who can are scrambling up the coral at the island's far end, away from the 9th, and nobody goes after them. The water is at the waist on the spur now, and the Third goes up onto the island with the 9th behind it, wading the last of it, hauling each other up the coral by the arms.

From the top of the island you can see it all. The water has come over the whole of the old sea floor, south and east as far as the eye goes: the plain where the army stood, the basin, the ramps, the trenches, the dead city's lower streets. All grey water, flat, with the morning on it, and the coral islands standing up out of it in a long ragged chain, and on every island, soldiers. The Fourteenth got there ahead of it. Nearly all of it.

Raraku is a sea.`,
      ch:[{t:'Up onto the island.', onward:true, go:()=>{ S.f.b4_c7_ph = 6; startExplore('b4_c7_isle'); talk('b4_c7_isle_arrive'); }},
          {t:'"A moment. Count heads first."', go:()=>{ S.f.b4_c7_ph = 6; startExplore('b4_c7_isle'); }}]}),

    /* ---- the coral island: the first halt (the last reading) ---- */
    b4_c7_isle_arrive:()=>({sp:'A coral island', scene:'b4_coral', fx:()=>{ S.f.b4_c7_ph = 6; S.f.b4_c7_flood = 1; S.f.b4_c7_isle = 1; }, txt:
`The 9th has an island to itself, more or less: a long hump of pale coral a few hundred paces end to end, pitted and sharp and light underfoot, with the water lapping at its edges as if it had always lapped there. The Second Company has the northern end. The Third has a hollow in the coral out of the wind, and a fire in it by dusk, of driftwood that was desert scrub that morning.

The night comes down over a sea. The fires of the Fourteenth go up on every island along the chain, and their reflections come up out of the water under them, and there are twice as many as there should be. The 9th sleeps a little, all of it, and not much.

Dawn comes up out of the water. There is mist on it, white and low, and the islands stand up out of the mist like the backs of something asleep, and the sun comes through and turns it gold. For the first time since the Wall there is no dust at all.${b47Say({marrow:`\n\nMarrow stands at the edge of the coral with her boots in the water. "A sea, child," she says. "It went away and it came back." She stoops and puts her hand in it, and holds it there. "The warren is clean," she says, surprised. "Wet. But clean."`, haddat:`\n\nHaddat stands at the coral's edge looking south, where Hissar is, a long way off past the water. She does not say the names this morning. She stands and looks.`, _:''})}`,
      ch:[b4DeckChoice(7),
          {t:'The Third\'s fire, in the hollow.', go:'b4_c7_isle'},
          {t:'Walk the island.', go:()=>startExplore()}]}),
    b4_c7_deck:()=>b4DeckOffer(7),
    b4_c7_card:()=>{ const n = b4DeckCard(7); n.fx = () => { if (['b4c_knightchains', 'b4c_leper'].includes(S.card)) S.f.b4_chains = 1; }; return n; },

    /* the fire: the swap, a rest, the squad, and the road out ("no game; the roads": the hub the games pass leaves alone) */
    b4_c7_isle:()=>({sp:'The Third\'s fire', scene:'b4_coral', again:()=> b47Key() ? 'The fire in the hollow of the coral, low now, and the sea round it. The road is chosen.' : 'The fire in the hollow of the coral, and the sea all round, and the morning coming up gold.', txt:
`The Third's fire is driftwood in a ring of coral in a hollow out of the wind, and it smokes, because the wood was scrub in a desert yesterday and has never been wet before. The squad sits round it with its boots off and its feet in the warm coral, and its kit spread out to dry, and nothing to do. The Third has not had nothing to do since Aren.${b47Dog() ? `\n\nHackle lies at the hollow's edge with his nose over the water, watching the fish. There are fish. Where from, the Third has no idea.` : ''}${b47Key() ? `\n\nThe road is chosen. ${({line:'The 9th marches when the order comes.', horse:'The riders go out ahead when the order comes.', ledger:'The Third is written down as lost in the water. It goes tonight.'})[b47Key()]}` : ''}`,
      ch:[b4DeckChoice(7),
          {t:'Sit in the sun and rest. There is nowhere to be.', req:()=>!S.f.b4_c7_rest, fx:()=>{ S.f.b4_c7_rest = 1; b4Rest('The squad sits in the sun on the coral with its boots off, and rests, properly, for the first time since Aren. Wounds close.'); }, go:'b4_c7_isle_rest'},
          {t:'Talk with the squad.', go:'b4_c7_isle_talk'},
          ...b4Offers().map(id => ({t:`Send across the water for ${NAME(id)}.`, fx:()=>{ b4SwapIn(id); }, go:'b4_c7_isle_swap'})),
          {t:'Find Radde first.', req:()=>!S.f.b4_c7_raddeIsle, go:()=>startExplore()},
          {t:'The road out.', req:()=>!!S.f.b4_c7_raddeIsle && !b47Key(), onward:true, go:'b4_c7_key'},
          {t:'The last of it. Let it end here.', req:()=>!!b47Key(), onward:true, go:'b4_c7_last'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c7_isle_rest:()=>({sp:'The Third\'s fire', scene:'b4_coral', txt:
`An hour in the sun, then, on warm coral, with the water lapping at the edge of the island and the mist burning off it.

${b47Say({marrow:`Marrow goes round the squad with her hands, the way she always has. At the end she sits back on her heels and looks at her palms. "No sand in it," she says. "Child, there's no sand in the warren. I'd forgotten what it was like."`, haddat:`Haddat sleeps sitting up against the blue shield, in the sun, with her face turned up to it.`, _:`Some of them sleep. The rest watch the water.`})}${b4In('tallow') ? `\n\nTallow sleeps flat on his back on the coral with his mouth open and his grandmother's deck on his chest, and nobody wakes him.` : ''}${b4In('hessa') ? `\n\nHessa washes her spear-blade in the sea, carefully, and then her face. "D'rek is a worm of the earth," she says. "But she does not mind the sea. Everything goes into the sea in the end."` : ''}${b4In('darrut') ? `\n\nDarrut lies down as far from the water as the island allows. "I was seasick on the transports," he says. "I'm seasick looking at it."` : ''}${b47R({orvas:`\n\nOrvas sleeps with his face toward the next island, where the Khundryl horse lines are, and smiles in his sleep.`, redblade:`\n\nRamin polishes his scale until it is red again, for the first time since the Wall.`, warlock:`\n\nKeth sleeps with one hand trailing in the water, and the grandmother, in his sleep, hums.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c7_isle'}]}),
    b4_c7_isle_swap:()=>({sp:'The Third\'s fire', scene:'b4_coral', txt:
`${b4In('orvas') ? `Orvas comes across from the Khundryl's island in a borrowed fishing boat that nobody knew the Khundryl had, standing up in it, steering with his lance. He drops his kit by the fire. "The herd sent for me," he says. "By boat. My grandfather would die again."` : b4In('redblade') ? `Ramin comes across from the Red Blades' island wading to the chest, with his scale held over his head. He puts his kit down by the fire. "Lent again," he says. "My captain did not even look up. He is counting who drowned."` : b4In('warlock') ? `Keth comes across from the Wickan youths' island on a raft of driftwood with three of the forty paddling it, and the grandmother complaining every stroke. "*Temul says go,*" she says. "*By sea. A Wickan. By sea.*"` : `The swap is made. The sea takes no notice.`}`,
      ch:[{t:'Back to the fire.', go:'b4_c7_isle'}]}),
    b4_c7_isle_talk:()=>{ const ln = [], fell = b47Fell();
      if (b4In('haddat')) ln.push(`Haddat is turning the blue shield in her hands, looking at the dents in it, one by one. "Hissar is ash," she says. "Aren is a market that sells the Chain's bones. Raraku is a sea." She sets the shield down. "I would like, once, to go somewhere and find it where I left it."${fell.length ? ` She says the names, quietly. ${b47And(fell.map(NAME))} at the end.` : ''}`);
      if (b4In('sathi')) ln.push(`Sathi has her feet in the water and Hackle's head in her lap. "I saw them," she says. "Last night. The Weasels' dead. Riding." She laughs, short, the way she laughs at funerals. "They ride better dead than they did alive. I'll tell them so, one day."`);
      if (b4In('tangle')) ln.push(`Tangle has the satchel open on the coral and everything in it laid out in a row to dry: "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}, ${numw(S.inv.burner || 0)} burner${(S.inv.burner || 0) === 1 ? '' : 's'}${S.inv.cusser ? `, ${numw(S.inv.cusser)} cusser${S.inv.cusser === 1 ? '' : 's'}` : ''}." He counts them twice. "Dry," he says, amazed. "All of it. After all that." He counts again.`);
      if (b4In('marrow')) ln.push(`Marrow is tying knots in her string, one after another, slowly. "One for every one we saw last night," she says. "That I knew." She has tied a great many. "The ones I didn't know I'll tie later, child. There's time now. There's a sea's worth of time."`);
      if (b4In('tallow')) ln.push(`Tallow has the deck out on his knee and is not reading it, only looking at the back of the top card. "She'd have liked this," he says. "My grandmother. A sea where there wasn't one." He puts the deck away. "She'd have said the boats will come. In a hundred years. She'd have been right."`);
      if (b4In('hessa')) ln.push(`Hessa is sitting very straight in the sun with the spear across her knees, the Chain's way, which she has never done before. "At the temple they taught us the world is a worm turning over in its sleep," she says. "I did not believe it." She looks at the water where the desert was. "I am considering it."`);
      if (b4In('tebbet')) ln.push(`Tebbet is restringing his bow, with the old string coiled beside him on the coral, salt-white. "I'd rather be a long way off," he says, and looks round at the sea, and the islands, and the army on them. "I think I am," he says. "I think this is it."`);
      if (b4In('darrut')) ln.push(`Darrut has his back to the water. "I was on the wall at Aren," he says, "when the Chain came in." He turns his helm over in his hands. "I've not said that. I was on the wall, and I watched them come up the Aren Way, and the gate shut." He puts the helm down. "Last night I saw some of them again. That's all I'll say about the wall. Now."`);
      if (b4In('orvas')) ln.push(`Orvas is sitting at the coral's edge with the black tears on his face and the sun on the black tears. "Our dead rode," he says. "A woman led them. Gall will say it was his grandmother's sister. Every Khundryl will say it was somebody's." He smiles. "It was somebody's."`);
      if (b4In('redblade')) ln.push(`Ramin has his helm off and his face to the sun. "My father would have called last night a sign," he says. "He called everything a sign." He thinks about it. "He was right about some of them."`);
      if (b4In('warlock')) ln.push(`Keth has his palms flat on the warm coral. "*Old,*" the grandmother says. "*This is very old, children. It remembers the sea. It is glad.*" Keth, in his own voice, sounding his age for once: "So am I."`);
      if (b47Dog() && !b4In('sathi')) ln.push(`Hackle lies across your boots with his nose over the water, watching the fish, and every so often looks back toward the old shore, the way he looked after the riders.`);
      return {sp:'The Third\'s fire', scene:'b4_coral', txt:ln.length ? ln.join('\n\n') : `The squad is quiet this morning, round the driftwood. You sit with it, and the sea talks for everybody.`,
        ch:[{t:'Back to the fire.', go:'b4_c7_isle'}]}; },

    /* ---- the island: the shore (the trick), the coral, the strangers, the riders across the water, Radde, Hollet, the recruit ---- */
    b4_c7_shore:()=>{ const n0 = S.f.b4_c7_namer, nm = n0 === 'sgt' || (TPL[n0] && b4In(n0)) ? n0 : b47Namer();
      return {sp:'The shore of the new sea', scene:'b4_coral', txt: !S.f.b4_c7_faceSeen || S.f.b4_c7_rideTried ?
`The edge of the coral, and the water lapping at it, clear enough at the shallows to see the white floor under it that was a desert yesterday. Further out it goes grey, and then the mist, and then the next island.` :
`The edge of the coral, with the water lapping clear over the white floor that was a desert yesterday. In the shallows, where the mist lies on the water, the light moves in it, now and then, grey and low, the way it moved on the ramps in the night.

${nm === 'sgt' ? 'You' : NAME(nm)} ${nm === 'sgt' ? 'stand' : 'stands'} at the edge a while looking at it. The face is still there, behind the eyes: the turn of the head, going by. The dust that was the riders is in the water now, and the water remembers it.`,
        ch:[{t:'Hold the face in mind, and call the dust. (the Dead Ride)', check:['wits', 16], trick:'b4_c7_deadride', req:()=>!!S.f.b4_c7_faceSeen && !S.f.b4_c7_rideTried, fx:()=>{ S.f.b4_c7_rideTried = 1; },
              edges:id=>[id === nm && ['the face turned toward them', 3], id === 'orvas' && ['the Khundryl dead rode with them', 1], id === 'warlock' && ['the grandmother saw every one', 2], id === 'sathi' && ['she saw the Weasels\' dead ride', 1], id === 'marrow' && ['the warren is clean this morning', 1], id === 'tebbet' && ['he would rather not', -1]],
              near:{t:()=>`Yes, but the dust comes, and it comes with the night in it, and ${NAME(ROLL().who || 'sgt')} sees the ramps again and the light going up into the trenches, and sits down on the coral, shaking. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
              go:'b4_c7_shore_ok', fail:'b4_c7_shore_no'},
            {t:'Back from the water.', go:()=>startExplore()}]}; },
    b4_c7_shore_ok:()=>({sp:'The shore of the new sea', scene:'b4_coral', txt:
`${by({sgt:'You hold the face in mind, and the turn of the head, and call: not aloud. And out of the water at the island\'s edge the grey light comes up, and the sand in it, and for a breath there is a rider of dust standing in the shallows on a horse of dust, facing you.', _:'{who} holds the face in mind, and the turn of the head, and calls: not aloud. And out of the water at the island\'s edge the grey light comes up, and the sand in it, and for a breath there is a rider of dust standing in the shallows on a horse of dust.'})}

It has no face. It does not need one. Then it is dust on the water, going out on the tide, and the squad knows, without anybody saying so, that it will come again if it is called, once, when it is needed. The dead are paying something back.`,
      ch:[{t:'Back from the water.', go:()=>startExplore()}]}),
    b4_c7_shore_no:()=>({sp:'The shore of the new sea', scene:'b4_coral', txt:
`The face is there, behind the eyes, and the call goes out, and the water laps at the coral, and nothing comes up out of it but the mist. ${by({sgt:'You stand', _:'{who} stands'})} at the edge a long while. The dead rode once. Perhaps once was what there was.`,
      ch:[{t:'Back from the water.', go:()=>startExplore()}]}),
    b4_c7_coralhead:()=>({sp:'A coral head', scene:'b4_coral', fx:()=>{ if (!S.f.b4_c7_coral) { S.f.b4_c7_coral = 1; gain('b4_c7_coral'); } }, txt:
`A head of pale coral standing up out of the island's back like a fist, pitted and light, older than anything with a name. A knuckle of it has broken off in the night, where the water came up against it for the first time in longer than there has been a Holy Desert, and lies at its foot.

${S.f.b4_c7_coral ? 'The Third has its piece of it already. The rest can stay where it is.' : 'It goes into the kit. It weighs nothing at all.'}${b4In('tallow') ? `\n\nTallow turns another piece over in his hand. "Coral," he says. "On the Quon coast you don't take coral off a reef. Bad luck." He puts it down, and then picks it up again. "This was a desert. It doesn't count."` : ''}`,
      ch:[{t:'Back to the island.', go:()=>startExplore()}]}),
    b4_c7_strangers:()=>({sp:'Strangers off the water', scene:'b4_coral', fx:()=>{ S.f.b4_c7_strangers = 1; }, txt:
`On the next island north, across a channel of water a long bowshot wide, a little line of people is coming up out of the shallows onto the coral, wading, hauling each other up. Not soldiers of the Fourteenth: they wear nothing of the army's. Sixteen of them, the sentry counts. They come out of the mist from the west, from where the water came, and stand on the coral dripping, and look about them as if they had walked a long way to get here and are not sure this is where they meant. A girl among them, young, standing a little apart.

Officers from the island go down to meet them. The Third, across the water, cannot hear what is said. By noon the strangers are in the Fourteenth's lines like everybody else, and the camp has stopped talking about them, because the camp has a great deal else to talk about this morning.${b47Say({haddat:`\n\n"Desert people," Haddat says, watching. "Out of the west. Out of the water."`, _:''})}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b4_c7_riders_isle:()=>({sp:'Riders on the next island', scene:'b4_coral', fx:()=>{ S.f.b4_c7_ridersIsle = 1; }, txt:
`On the island to the west, across a channel no wider than a road, there are horses: the Khundryl's lines, and beyond them the Wickan youths', some forty of them, with Temul's standard. The horses stand in the shallows to the knee and look at the water as if it had insulted them. The riders are doing what riders do after anything: seeing to the horses first.

Gall's Burned Tears are singing. It is a grieving song, very loud, the way they sing every song, and this morning, across the water, it sounds like something else.${b4Waiting('orvas') ? `\n\nOrvas is at the water's edge on the Khundryl side with his lance, and when he sees the Third he lifts it, high, and holds it there.` : ''}${b47R({orvas:`\n\nOrvas, beside you, lifts a hand to them. "They are singing for the dead who rode," he says. "We sing for our dead every night. Last night they sang back."`, warlock:`\n\nKeth is looking at the Wickan youths across the water. "*Temul,*" the grandmother says. "*A boy. He rode last night too, in his head. They all did.*"`, redblade:`\n\nRamin watches the horses. "When the army goes after Leoman," he says, "the horse will go first. It always does."`})}`,
      ch:[{t:'Lift a hand to them.', go:()=>startExplore()}]}),
    b4_c7_radde_isle:()=>({sp:'Sergeant Radde', scene:'b4_coral', fx:()=>{ S.f.b4_c7_raddeIsle = 1; }, txt:
`Radde is sitting on a coral head with the book open on his knee, and the pages are wet, and he is writing on them anyway, slowly, with the ink running.

"Orders," he says, when the sergeant comes. "From the Adjunct, by way of Fist Keneb, by way of the 9th's Fist, by way of me." He reads it off the wet page. "Leoman of the Flails got out of Raraku in the night, and the Fourteenth is to go after him. Wherever he's gone. Across this entire continent, if that's where." He looks up. "Those are the words. *Across this entire continent.*"

He shuts the book on the wet pages. "So that's the road. The 9th's in it. The horse is in it ahead. And a sergeant with a squad that came off the Chain could, I'd say, choose where in it they stand." He looks at the water. "Or whether. I'll write it, whatever it is. I always do."${S.f.b4_blistigNoticed ? `\n\nAcross the island Fist Blistig is standing at the water's edge with his nose still swollen, grumbling at an aide about Keneb, Fist since yesterday. He sees the Third and looks a while, and then goes back to grumbling.` : ''}`,
      ch:[{t:'"Give me until the fire burns down, Radde."', go:()=>startExplore()},
          {t:'"Let\'s talk about the road."', onward:true, go:'b4_c7_key'}]}),
    b4_c7_radde_isle_again:()=>({sp:'Sergeant Radde', scene:'b4_coral', txt:
`Radde is writing in the wet book. "${({line:'The 9th, then. Good. I\'d have missed you.', horse:'The horse, then. I\'ll tell the Khundryl to expect you. I\'ll tell them to expect trouble.', ledger:'The water, then.'})[b47Key()] || 'Well?'}" He does not look up. "${b47Key() === 'ledger' ? 'I\'ve written it. Lost in the flood. I wrote it properly.' : 'I\'ve written it.'}"`,
      ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c7_hollet_isle:()=>({sp:'Captain Hollet', scene:'b4_coral', fx:()=>{ S.f.b4_c7_holletIsle = 1; }, txt:
`Captain Hollet is sitting on the coral with his tablet in his lap, dry, wrapped in oilcloth that he must have had in his shirt the whole way. He is counting. He gets to the end and starts again.

"Second Company," he says, when he sees the sergeant. "All present. All but four, who were in the water when it came, and two who came up on the 10th's island and are coming back by boat. All present." He looks at the number. "I've never written that. Not after a battle." He coughs, and does not seem to notice. "It wasn't a battle, was it. Not for us. Something else had the battle."

He folds the oilcloth over the tablet. "Thank you, Sergeant. For the end of the line. For all of it."${S.f.b4_c7_letGo ? ` He hesitates. "And for not, at the end. I don't know which I'd have wanted. I'm glad it wasn't me."` : ''}`,
      ch:[{t:'"Keep the books, sir."', go:()=>startExplore()}]}),
    b4_c7_recruit_isle:()=>({sp:'The freckled recruit', scene:'b4_coral', fx:()=>{ S.f.b4_c7_recIsle = 1; }, txt:
`The freckled girl is sitting on the coral with her spear across her knees and her boots off and her feet in the sea, which she has never been in, and she is looking at her feet in it as if they belonged to somebody else.

"Sergeant." She does not get up. "Where do we go now? Is it true we're going after Leoman? Across all of it?" She looks at the water. "I'd just got used to the desert."${b47Say({haddat:`\n\nHaddat sits down beside her. "My mother's people said a soldier is somebody who gets used to a place," she says, "and is then sent somewhere else." The girl laughs, and then stops, and then laughs again.`, tallow:`\n\nTallow, on her other side, shows her how to skim a flat piece of coral across the water. It goes three times. She tries. It goes once.`, _:''})}`,
      ch:[{t:'"Across all of it. Get your boots on, soon."', go:()=>startExplore()}]}),

    /* ---- the key: the road out (line | horse | ledger) ---- */
    b4_c7_key:()=>{ const lead = b47HorseLead();
      return {sp:'The road out', scene:'b4_coral', html:nerveHTML('The road out'), txt:
`The fire in the coral, and the sea round it, and the Fourteenth on every island in the chain, getting ready to go after a man who has gone.

Three roads, Radde said, without saying it.

On with the 9th, in its place in the file, after Leoman, wherever that is. The Chain squad in the Second Company's line, where the recruits can see it.

Or the horse. ${lead === 'orvas' ? 'Orvas would take the Third to the Khundryl, who will ride ahead of the army in the pursuit; Gall takes in anybody who grieves loudly enough, and the Third has grieved.' : lead === 'warlock' ? 'Keth would take the Third to Temul\'s Wickan youths, who will ride ahead of the army in the pursuit; the grandmother says the Wickans owe the Chain squad, and Temul pays what the Wickans owe.' : lead === 'sathi' ? 'Sathi would take the Third to the Wickans, who will ride ahead of the army in the pursuit; Temul has the Crow clan\'s remnant, and some Weasels among them who remember her.' : 'A Wickan youth of Temul\'s came across in the night to say the riders would take the Chain squad, if the Chain squad would come; the horse will ride ahead of the army in the pursuit.'} ${b4In('tangle') ? 'Tangle has already said he will walk.' : ''}

Or the water. The Fourteenth lost soldiers in the flood. The Third's island was counted last. Radde has a wet book, and a stylus, and a line he could write, *lost in the water*, and the Holy Desert is wide, and Seven Cities is wide past it, and nobody in it is looking for a squad that drowned.${b47R({orvas:`\n\nOrvas waits with his lance grounded, watching you the way he watched you at the river.`, redblade:`\n\nRamin waits very straight, to see what the squad he is lent to will do with a road.`, warlock:`\n\nKeth's palms are on the coral. "*Choose,*" the grandmother says. "*Any of them. You have earned a choice. Most don't.*"`})}`,
        ch:[{t:'"The 9th. In the file, after Leoman."', fx:()=>{ S.f.b4_c7_key = 'line'; b4Nerve(1, 'The Chain squad stays in the Second Company\'s line'); b47L('darrut', 1); b47L('hessa', 1); b47L('tallow', 1); b47L('tebbet', -1); }, go:'b4_c7_line'},
            {t:lead === 'orvas' ? '"The horse. Take us to the Khundryl, Orvas."' : lead === 'warlock' ? '"The horse. Take us to the Wickans, Keth."' : lead === 'sathi' ? '"The horse. Take us to the Wickans, Sathi."' : '"The horse. Tell Temul\'s boy yes."', fx:()=>{ S.f.b4_c7_key = 'horse'; S.f.b4_c7_lead = lead; b4Nerve(-1, 'The Second Company loses its Chain squad to the horse'); b47L('sathi', 2); b47L('orvas', 2); b47L('warlock', 1); b47L('tangle', -1); b47L('darrut', -1); }, go:'b4_c7_horse'},
            {t:'"The water. Write us down, Radde."', fx:()=>{ S.f.b4_c7_key = 'ledger'; b4Nerve(-1, 'The Chain squad is written down as lost in the flood'); b47L('darrut', 2); b47L('haddat', 1); b47L('tebbet', 1); b47L('hessa', -1); b47L('tallow', -1); }, go:'b4_c7_ledger'},
            {t:'"Not yet. Let the fire burn down."', go:()=>startExplore()}]}; },
    b4_c7_line:()=>({sp:'The 9th', scene:'b4_coral', txt:
`Radde writes it, on the wet page, and the ink runs, and he blots it with his sleeve. "The 9th," he says. "Good. The Second Company would have had a hard time explaining you'd gone." He shuts the book. "We march when the boats come, or the water goes down, or the Adjunct decides which."

${b47Say({darrut:`Darrut nods, once. "In the file," he says. "Where you can see what's coming." He sounds almost content.`, hessa:`Hessa nods. "A door stays where it is put," she says. "That is what makes it a door."`, tallow:`Tallow lets out a breath. "With the company," he says. "Good. They'd have been scared without us." He means himself as well, and knows it.`, _:'The squad hears it and nods, and goes back to drying its kit.'})}${b47Say({tebbet:`\n\nTebbet strings his bow, slowly. "I'd rather be a long way off," he says. "I'll be a long way off in the 9th. It's a long road."`, _:''})}${b47R({orvas:`\n\nOrvas looks across at the Khundryl's island a long time. "Then I walk," he says. "With you. The herd will understand." He does not sound sure the herd will.`, redblade:`\n\nRamin nods. "The Red Blades will be in the pursuit too," he says. "I will see them on the road. I will tell them I was lent to the 9th, and the 9th kept me."`, warlock:`\n\n"*Walking,*" the grandmother says. "*Wickans, walking. Well. The Malazans will need showing how.*"`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c7_isle'}]}),
    b4_c7_horse:()=>{ const lead = S.f.b4_c7_lead || b47HorseLead(), tear = lead === 'orvas';
      return {sp:'The horse', scene:'b4_coral', fx:()=>{ if (tear && !S.f.b4_c7_tear) { S.f.b4_c7_tear = 1; gain('b4_c7_tear'); } if (lead === 'orvas' && b4Waiting('orvas') && !b47Rec() && b4Room()) b4Join('orvas'); }, txt:
`Radde writes it, slowly. "The horse," he says. "Gods help the horse." He shuts the book. "The Second Company will say you were too good for it. Let them. You'll be ahead of us, where the trouble is. Better you than the 10th."

${lead === 'orvas' ? `Orvas ${b4In('orvas') ? 'is on his feet before Radde has finished' : 'comes across from the Khundryl\'s island in a borrowed boat, standing up in it, before the morning is out'}. "Gall will take you," he says. "Gall takes everybody who has lost something. He will make you weep at the fires. You will hate it. Then you will not." He takes something from round his own neck, a bead of black glass on a thong, the shape of a tear, and holds it out to the sergeant, and then, when the sergeant does not take it at once, puts it in the sergeant's hand and closes the fingers on it. "Ride beside me," he says. He does not explain the bead. The Khundryl never do.` : lead === 'warlock' ? `${b4In('warlock') ? 'Keth is on his feet.' : 'Keth comes across from the Wickan youths\' island on a raft of driftwood before the morning is out.'} "*Temul will take you,*" the grandmother says, out of his mouth. "*He is a boy, and he is the Wickans now, and the Wickans owe the Chain.*" Keth, his own voice: "I'll find you horses. Good ones."` : lead === 'sathi' ? `Sathi is on her feet and laughing, the way she laughs at funerals. "Horses," she says. "Finally. Real ones. Temul's got Weasels with him, some. They'll remember me." She stops. "They'll remember Hackle, anyway."` : `Temul's boy grins, and runs to the water's edge, and shouts across the channel, and on the Wickan island somebody shouts back.`}${b4In('sathi') && lead !== 'sathi' ? `\n\nSathi has her face turned up to the sun. "Horses," she says. "At last."` : ''}${b4In('tangle') ? `\n\nTangle picks up the satchel. "I'll walk," he says. "Beside you. A horse and a cusser don't mix. Ask anybody who's tried." He means it.` : ''}${b47Say({darrut:`\n\nDarrut looks at the horses across the water, and at his own feet. "Aren Guard don't ride," he says. "Aren Guard stand on walls." He sighs. "I'll learn."`, _:''})}`,
        ch:[{t:'Back to the fire.', go:'b4_c7_isle'}]}; },
    b4_c7_ledger:()=>({sp:'The water', scene:'b4_coral', txt:
`Radde looks at the sergeant a long breath. Then he opens the wet book to the page where the Third is, and wets the stylus, and writes, very small and very neat, and turns the book round so the sergeant can read it. *Lost in the water.* The squad's number, and each name, one under another, and against each one the same three words.

"There," he says. "Properly." He shuts the book. "I've written a lot of those. I've never written one I was glad of." He gets up off the coral head. "Go tonight, when the fires are low. South, off the end of the island; it's shallow there. Don't come back for anything." He does not offer his hand. Then he does.

${b47Say({darrut:`Darrut is looking south, toward where Aren is, a long way past the water. "Home," he says, a word he has not let himself say since Aren. "I've a sister in the Old Quarter. If she's there." He picks up his helm. "I'll walk you as far as Aren. Then I'm stopping."`, haddat:`Haddat is looking south. "Seven Cities is wide," she says. "My mother's people walked all of it, selling water. I know the roads." She sounds, for the first time since Hissar, as if she has somewhere to go.`, _:'The squad looks south, toward the edge of the water, and the desert past it.'})}${b47R({orvas:`\n\nOrvas is quiet a long while. "The Khundryl will think I drowned," he says. "Gall will weep for me at the fires, very loudly." He smiles, a little. "I would like to hear it. I will not." He picks up his lance.`, redblade:`\n\nRamin takes off the red scale, piece by piece, and lays it on the coral. "Dead men don't wear the Red Blades' colours," he says. "I will be somebody else. I have been before."`, warlock:`\n\n"*Out of the ledger,*" the grandmother says, and laughs, an old woman's laugh. "*I was never in it. Come, children. I know the way.*"`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c7_isle'}]}),

    /* ---- the end of the chapter, and of Book Four ---- */
    b4_c7_last:()=> !b47Key() ? ({sp:'The island', txt:
`The road is not chosen yet. The fire, and Radde.`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The last of it', scene:'b4_c7_finale', txt:
`${b47Key() === 'ledger' ? `The fires along the islands burn down. At the south end of the 9th's island the water is shallow, as Radde said, and the Third goes down into it in the dark, quietly, one at a time, with its kit on its back, and wades south off the end of the coral toward the far shore and the desert past it. On the island the sentries look the other way. Behind them, on a wet page, the Third is drowned.` : b47Key() === 'horse' ? `In the morning the boats come, and the water goes down on the far shore enough to stand on, and the Fourteenth comes off its islands legion by legion and forms up on a beach that was the edge of a desert two days ago. The horse goes out first, ahead of the army, and the Third goes with it, among the riders.` : `In the morning the boats come, and the water goes down on the far shore enough to stand on, and the Fourteenth comes off its islands legion by legion and forms up on a beach that was the edge of a desert two days ago. The 9th forms in its place. The Second Company forms in its place in the 9th. The Third stands in its file, where the recruits can see it.`}

Every soldier in the Fourteenth has a finger bone at the throat, on a thong, by the Adjunct's order, from Aren. There is no name for it yet. At the head of the column, before it moves, somebody raises the standard: a thin figure holding up a bone before a sandstorm.${b47Fell().length ? `\n\n${b47And(b47Fell().map(NAME))} ${b47Fell().length > 1 ? 'are' : 'is'} not in it. The Third counts, out of habit, and gets the number, and checks it, and gets it again.` : `\n\nThe Third counts itself, out of habit, and gets the number, and checks it.`}${b47R({orvas:`\n\nOrvas is with it, ${b47Key() === 'horse' ? 'on a good horse at last, low on its neck, laughing' : b47Key() === 'ledger' ? 'his lance over his shoulder, walking south' : 'on foot, his lance at the trail, in the file'}.`, redblade:`\n\nRamin is with it, ${b47Key() === 'ledger' ? 'without the red scale, a stranger in a plain coat' : 'his red scale red again in the sun'}.`, warlock:`\n\nKeth is with it, and the grandmother is humming.`})}`,
      ch:[{t:'Go.', onward:true, go:()=>chapterEnd(7, b47Key() || 'line')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* ============ the end of Book Four: the road out of Raraku, a page per squadmate, the riders, the sergeant, the coda (37: showFinale) ============ */
const B4FIN7 = {};
B4FIN7.KEYS = ['line', 'horse', 'ledger'];
B4FIN7.key = k => B4FIN7.KEYS.includes(k) ? k : B4FIN7.KEYS.includes(S.f.b4_c7_key) ? S.f.b4_c7_key : 'line';
B4FIN7.join = ps => ps.filter(p => p && String(p).trim()).join('\n\n');
B4FIN7.loy = (id, warm, cold, mid) => { const l = (S.loy && S.loy[id]) || 0; return l >= 2 ? warm : l <= -2 ? cold : mid; };
B4FIN7.P = id => ['haddat', 'sathi', 'marrow', 'hessa'].includes(id) ? {she:'she', her:'her', hers:'her'} : {she:'he', her:'him', hers:'his'};
B4FIN7.trickLine = id => trickBy('b4_c7_deadride') === id ? (id === 'sgt' ? 'When it is bad now, you can call the dust, once, and a rider comes out of it. You do not call it often. You know whose face you hold when you do.' : `When it is bad now, ${B4FIN7.P(id).she} can call the dust, once, and a rider comes out of it. ${B4FIN7.P(id).she.charAt(0).toUpperCase() + B4FIN7.P(id).she.slice(1)} knows whose face to hold.`) : '';
B4FIN7.nerve = () => { const n = b4NerveNow();
  return `The company, at the end of it: Nerve ${n} of ${NERVE_MAX}. ${n >= 8 ? 'The Second Company would follow the Chain squad into anything, and has said so, loudly, to the 10th.' : n >= 6 ? 'The Second Company stands when the Third stands, and that is what it was for.' : n >= 4 ? 'The Second Company is a company now, more or less, which it was not at Aren.' : 'The Second Company came through Raraku frightened, and came through it. That is not nothing.'}${S.f.b4_broke ? ` ${numw(S.f.b4_broke, true)} of its regulars ran, on the road, at one fight or another. Radde wrote them down and took them back.` : ''}`; };

B4FIN7.ending = key => {
  const T = {line:['On after Leoman', 'b4_c7_finale'], horse:['With the riders', 'b4_c7_finale'], ledger:['Out of the ledger', 'b4_c7_finale']}[key] || ['On after Leoman', 'b4_c7_finale'];
  if (typeof S === 'undefined' || !S || !S.f) return {title:T[0], scene:T[1], paras:[]};
  try {
    const mates = b47Mates().map(NAME), n = b47Mates().length + 1;
    let P;
    if (key === 'line') P = [
`The Fourteenth comes off its islands two days after the flood, by boat and by wading, and forms up on the shore of a sea that was not there a week ago, and turns its back on it, and marches. The Adjunct has said where: after Leoman of the Flails, who got out of Raraku in the night, across this entire continent if that is where he goes. The 9th marches in its place in the column, and the Second Company in its place in the 9th, and the Third in its file in the Second Company, where the recruits can see it.`,
`${mates.length ? `${b47And(mates)} ${mates.length === 1 ? 'is' : 'are'} in the file with you.` : 'You are in the file alone, which is not how a file is meant to work, and Radde has put two recruits beside you so that it looks like one.'} The road goes north and west. How long it is, the 9th does not know. It has never known that about any road, and it has walked a great many.`,
`At every halt the Third counts itself, and gets ${numw(n)}, and checks it, and goes on.`];
    else if (key === 'horse') P = [
`The Fourteenth comes off its islands two days after the flood and forms up on the shore of the new sea, and turns its back on it, and marches after Leoman of the Flails. The horse goes out ahead of it, the way the horse does: Temul's Wickans, Gall's Khundryl, the Seti, the scouts. The Third goes with them, on horses that the ${S.f.b4_c7_lead === 'orvas' ? 'Khundryl' : 'Wickans'} found from somewhere and did not explain.`,
`${mates.length ? `${b47And(mates)} ${mates.length === 1 ? 'rides' : 'ride'} with you${b4In('tangle') ? ', except Tangle, who walks at your stirrup with the satchel and says he prefers it, and does' : ''}.` : 'You ride alone among strangers who have decided you are not one.'} ${S.f.b4_c7_lead === 'orvas' ? 'At night the Khundryl weep at their fires, very loudly, for their dead and for yours, and after a week the Third finds it is weeping with them, and does not mind.' : 'At night the Wickan youths sing at their fires, the forty of them, badly, and after a week the Third knows the words.'}`,
`The infantry is a day behind, then two. The riders count themselves at dusk. So does the Third: ${numw(n)}, and a horse each, and it checks.`];
    else P = [
`The Fourteenth comes off its islands two days after the flood and marches after Leoman of the Flails, and on a wet page in Sergeant Radde's book, against a squad's number and each of its names, it says *lost in the water*. The Third is not there to see it go. It went south off the end of the 9th's island in the dark, wading, two nights before.`,
`${b4In('darrut') ? 'Darrut walks you as far as Aren, as he said he would, and stops at the Old Quarter gate, and turns, and goes in, and does not come out again before you leave. ' : ''}${mates.filter(m => m !== 'Darrut').length ? `${b47And(mates.filter(m => m !== 'Darrut'))} ${mates.filter(m => m !== 'Darrut').length === 1 ? 'walks' : 'walk'} on with you, south and then west, into Seven Cities, which is wide.` : 'You walk on alone, south and then west, into Seven Cities, which is wide.'} There is no road onward from here. That was the point.`,
`No one is looking for a squad that drowned. At night, by habit, the Third counts itself anyway, and gets the number, and checks it.`];
    P.push(B4FIN7.nerve());
    return {title:T[0], scene:T[1], paras:P};
  } catch(e) { return {title:T[0], scene:T[1], paras:[]}; }
};

B4FIN7.fate = (id, key) => {
  key = B4FIN7.key(key); const tr = B4FIN7.trickLine(id), R = key;
  const add = (title, ps) => { if (tr) ps.splice(Math.max(1, ps.length - 1), 0, tr); return {title, txt:B4FIN7.join(ps)}; };
  if (id === 'sgt') return B4FIN7.sgt(key);
  if (id === 'haddat') return add('The names', [
    R === 'line' ? `Haddat marches in the file with the blue shield on her arm, and at every halt she says the names, under her breath, the way she has since Hissar. The list is longer than it was. She says every one.` :
    R === 'horse' ? `Haddat rides badly and does not care, the blue shield slung behind her, and at every fire she says the names, and the riders round the fire have started to say them with her, not knowing who any of them were.` :
    `Haddat walks Seven Cities by the water-sellers' roads her mother walked, and finds that she knows them, every well and every mark on every stone. She does not go back to Hissar. She sells water.`,
    ['parted', 'lost'].includes(b4Was('b2_ilhar')) ? `She never learns what became of her brother. She has stopped asking the dust. Some nights she says his name with the others, and some nights she does not, and she has decided both are allowed.` : `Hissar is ash. She has decided she will not be.`,
    B4FIN7.loy('haddat', `"Sergeant," she says, at the end of the names, every night. She means you are on the list of the ones she says while they are alive.`, `She says your name with the others, at night, the way she says the names of people she has lost track of.`, `"You are not on the list," she tells you once. "Good. Stay off it."`)]);
  if (id === 'sathi') return add('Laughing', [
    R === 'horse' ? `Sathi rides at last, on a good horse, low on its neck, laughing, with Hackle running flat out behind. The Wickan youths think she is mad. The Weasels among them know she is.` :
    R === 'line' ? `Sathi marches with the 9th and complains about it at every step, and steals a horse at the first halt in the hills, and is made to give it back, and steals another.` :
    `Sathi walks out of the ledger with Hackle at her knee, and two days south of the sea she finds a horse, somehow, and nobody asks where, and she rides the rest of the way.`,
    `She saw the Weasels' dead ride, the night before the battle. She laughs about it, at fires, the way she laughs at funerals. The ones who know her take it for exactly that.`,
    B4FIN7.loy('sathi', `"You're all right, for infantry," she tells you. It is the best thing a Wickan has ever said to a Malazan.`, `She rides a little apart from you, now, and Hackle with her.`, `She calls you *Sergeant* the Wickan way, which means nothing and everything.`)]);
  if (id === 'tangle') return add('The count', [
    R === 'horse' ? `Tangle walks at the stirrup with the satchel, as he said he would, and keeps up, which the riders did not expect, and counts the munitions every morning, twice, out loud, which they did not expect either.` :
    R === 'line' ? `Tangle marches in the file with the satchel over his shoulder and fuse-cord round both wrists, and counts it every morning, twice. The 9th's sappers have started to come to him with questions. He answers them as Mincer would have, and then tells them so.` :
    `Tangle walks out of the ledger with the satchel, which is the Empire's, and has decided the Empire will not miss it, and counts it every morning, twice, on the road south.`,
    `The prayer bead is still on his wrist. He touches it at every count. He has started to say Mincer's name at the end, the way Haddat says the names.`,
    B4FIN7.loy('tangle', `"You point," he says, "and I make it stop being there." From a sapper there is nothing warmer.`, `He tells you the count now, and nothing else.`, `"${numw((S.inv && S.inv.sharper) || 0, true)} sharpers," he tells you, every morning. "Dry."`)]);
  if (id === 'marrow') return add('The string', [
    R === 'line' ? `Marrow marches with the 9th, too old for it and saying so at every step, with her coat of too many pockets and her knotted string, and the Second Company's recruits come to her with their feet and their fevers and their dreams, and she calls every one of them *child*.` :
    R === 'horse' ? `Marrow rides a mule, which she chose, and says a mule has more sense than a horse and less than a Wickan, and the Wickan youths bring her their wounds, and their fevers, and their dreams.` :
    `Marrow walks out of the ledger beside you, and in the first town south of the sea she opens a door with a red hand painted on it, and stays. A town needs one.`,
    `The string has a knot in it now for everyone she saw among the riders, that she knew. It is a long string. She is still tying.`,
    B4FIN7.loy('marrow', `"Child," she says to you, still, and once, at the end of a long day, "Sergeant, child," which is both.`, `She heals you as she heals everybody, and says no more to you than she must.`, `"You'll do, child," she says. "You'll do."`)]);
  if (id === 'tallow') return add('Mostly they came back', [
    R === 'line' ? `Tallow marches with the Second Company's recruits, as he always has, and they look at him the way he used to look at the Third. He reads the Deck for them at night on his oilcloth, badly, from his grandmother's cards.` :
    R === 'horse' ? `Tallow rides like a sack of grain and laughs at himself, and the Wickan youths teach him, and he teaches them to read the Deck, badly, from his grandmother's cards.` :
    `Tallow walks out of the ledger with his grandmother's deck in his shirt, and south of the sea he finds the coast, and a fishing village, and stands on the shore looking at the boats a long time.`,
    `The cards have stayed quiet since Raraku, settled, as if somebody had put them in order. He does not know why. He reads them anyway. She read for fishermen. They mostly came back.`,
    B4FIN7.loy('tallow', `"You're the one she'd have read for," he tells you. "My grandmother. You'd have come back."`, `He talks less to you than he did. He talks less to everybody.`, `He still talks too much. You have stopped minding.`)]);
  if (id === 'hessa') return add('The door', [
    R === 'line' ? `Hessa stands in the file like a temple door, and the Second Company's recruits shelter behind her the way they did at the Wall, and she lets them.` :
    R === 'horse' ? `Hessa rides as she does everything, square and patient on the outside, and holds the riders' camp at night like a temple door, and the Khundryl have started calling her by a word that means *the wall*.` :
    `Hessa walks out of the ledger, and somewhere in Seven Cities she finds a temple of D'rek, small and old and nearly empty, and stands at its door a while, and goes in.`,
    `She says D'rek is patient. She says everything ends up sand, and that she has seen a sea come back over the sand, and is considering what that means for a worm.`,
    B4FIN7.loy('hessa', `"You are a door too, Sergeant," she tells you once. "The squad stands behind you." She says it as if it settled something.`, `She guards you as she guards everybody. Only that.`, `"Stand where she can see you," she says, before every fight. You have stopped asking who.`)]);
  if (id === 'tebbet') return add('A long way off', [
    R === 'horse' ? `Tebbet rides out ahead of the riders, on the flanks, a long way off, which is where he always wanted to be, and comes back at dusk with a hare and nothing to say.` :
    R === 'line' ? `Tebbet marches in the file and goes out on the flanks at every halt with his bow, a long way off, and comes back before anybody notices he went.` :
    `Tebbet walks out of the ledger and, a month south, says he is going home to Dal Hon, to the hills above the river, and goats. Two goats. He goes.`,
    `He would rather be a long way off when it happens. He was a long way off at Raraku, on a flank picket, and he saw the dead ride, and he says it was not far enough. He says it very seldom.`,
    B4FIN7.loy('tebbet', `"I'd rather be a long way off," he says. "With you. That's the thing."`, `He goes out on the flanks more often now, and stays out longer.`, `He brings you a hare, sometimes, and goes again.`)]);
  if (id === 'darrut') return add('The wall', [
    R === 'ledger' ? `Darrut walks you as far as Aren, as he said, and stops at the Old Quarter gate. His sister is there. She thought he was dead. He lets her go on thinking it for nearly a breath, and then he goes in.` :
    R === 'horse' ? `Darrut learns to ride, badly and grimly, swearing at the horse in the Aren dialect, and the horse, after a week, learns to ignore him, and they get on.` :
    `Darrut marches in the file with his big shield and his Guard drill, and the Second Company's recruits have started to stand the way he stands, without knowing they do.`,
    `He was on the wall at Aren when the gate shut on the Chain. He has said so now, once, to the Third. That is all he will ever say about the wall. It is enough.`,
    B4FIN7.loy('darrut', `"You'd have done in the Guard," he tells you. From an Aren man it is everything.`, `He stands where you put him, and no nearer.`, `"Sergeant," he says, Guard-fashion, with the heel of the hand to the chest.`)]);
  if (id === 'orvas') return add('The tears', [
    R === 'horse' ? `Orvas rides with the Khundryl again, on a good horse, low on its neck, laughing, with the Third beside him. ${S.f.b4_c7_tear ? 'The bead he gave the sergeant has not been asked for back. It will not be.' : ''}` :
    R === 'line' ? `Orvas walks in the 9th's file with his lance at the trail, a rider on foot, and the Khundryl ride past the column every morning going out, and every morning he lifts the lance to them, and they lift theirs.` :
    `Orvas walks out of the ledger with his lance over his shoulder. The Khundryl weep for him at their fires, very loudly, as Gall weeps for everybody. He never hears it. He says he can imagine.`,
    `The tears on his face are tattooed and black. He has never said why, and the Third has never asked. He saw the Burned Tears' dead ride, a woman at their head. Every Khundryl says it was somebody's. It was somebody's.`,
    B4FIN7.loy('orvas', `"We are not Wickans," he tells you once, at a fire. "But you are not Khundryl. And here we are." He seems pleased by it.`, `He rides with you because the herd sent him, and says so.`, `He lifts his lance to you, mornings, the way he lifts it to the Khundryl.`)]);
  if (id === 'redblade') return add('The red scale', [
    R === 'ledger' ? `Ramin takes off the red scale on the coral and leaves it there, and walks out of the ledger in a plain coat, a stranger. He says he has been somebody else before. He is good at it.` :
    `Ramin goes on with the Fourteenth in his red scale, red again, lent to the Third and not returned, and the Red Blades have stopped asking for him.`,
    `His father called everything a sign. Raraku, he says, was the one sign his father would have been right about.`,
    B4FIN7.loy('redblade', `"Lent," he says, of himself. "And kept." He says it like a man who has found out what he is.`, `He is courteous to you. Only that.`, `He polishes the scale every night, and leaves whose it is now unspoken.`)]);
  if (id === 'warlock') return add('The grandmother', [
    R === 'horse' ? `Keth rides with the Wickan youths again, and the grandmother rides with him, complaining, and Temul lets him bring the Chain squad to the fires.` :
    R === 'ledger' ? `Keth walks out of the ledger with the grandmother, who says she was never in it, and knows a way, and does.` :
    `Keth walks with the 9th, a Wickan on foot, and the grandmother says somebody has to show the Malazans how it is done, and does, at length.`,
    `The grandmother saw every one of the riders, she says. She will not say who. "*They know,*" she says. "*That is enough.*"`,
    B4FIN7.loy('warlock', `"*This one,*" the grandmother says of you, to anybody. "*This one I would have married.*" Keth goes red.`, `The grandmother has opinions about you. Keth does not repeat them.`, `"*Well,*" the grandmother says of you. "*You'll do.*"`)]);
  return {title:TPL[id] ? TPL[id].role : '', txt:TPL[id] ? TPL[id].quest : ''};
};

B4FIN7.gone = (id, key) => {
  key = B4FIN7.key(key); const P = B4FIN7.P(id);
  if (S.dead && S.dead[id] && S.dead[id].from === 'dg') {
    if (id !== b47Face()) return null; // one page for the Barrow dead, under the face the squad saw
    const all = b4Fallen().filter(k => TPL[k]), nm = S.f.b4_c7_namer, seen = !!S.f.b4_c7_faceSeen;
    return {riders:true, title:'Among the riders', txt:B4FIN7.join([
      `${all.length > 1 ? `${b4FallenNames()} stayed on the Barrow, at the end of the Chain.` : `${NAME(id)} stayed on the Barrow, at the end of the Chain.`} ${b4Fresh() ? 'Hackle was not seen again.' : ''}`,
      seen ? `On the night before the battle at Raraku the dead rode down out of the dust, and the Third saw one face among them, at the near edge, going by: ${NAME(id)}'s. ${b47Sure() === 'clear' ? 'Plainly, for a breath, in its own light.' : 'A shape the Third was sure of.'} ${S.f.b4_bone === 'chain' ? `With ${b47Token()} at the throat, the Chain's way.` : ''} The head turned, once. Then the light went up the ramps.` : `On the night before the battle at Raraku the dead rode down out of the dust. The Third looked for faces. Every soldier on the picket did.`,
      seen ? `${nm && nm !== 'sgt' && TPL[nm] ? NAME(nm) : 'You'} said the name, and no one else. The dead do not speak.` : '',
      all.length > 1 ? `The Third says the others' names too, at night. It is sure they were there.` : ''])};
  }
  if (S.dead && S.dead[id]) return {title:'Fallen', txt:B4FIN7.join([
    `${NAME(id)} fell at the end of the line, before dawn, the morning after the dead rode, holding the gap past the last picket against men running out of Raraku. Whoever fell there stayed down.`,
    {haddat:'The blue shield came back without her. The Third will not carry it, and will not leave it. It rides on a wagon, face down.',
     sathi:`${b47Dog() ? 'Hackle lay by her all morning and would not be moved, and then got up and came on with the Third, and walks at the sergeant\'s knee.' : 'Her knife came back without her, the one with the filed-tooth grip.'}`,
     tangle:'The satchel came back without him. The Third counts it every morning, twice, out loud, so it knows.',
     marrow:'The knotted string came back without her. The Third cannot read it, and will not untie it.',
     tallow:'His grandmother\'s deck came back without him, in its oilcloth. The Third does not read it, and will not throw it away.',
     hessa:'Her spear came back without her. It stands upright in the wagon, because a spear should be upright.',
     tebbet:'His bow came back without him. It hangs unstrung. He would rather have been a long way off.',
     darrut:'His big shield came back without him. A recruit of the Second Company carries it now, and stands the way he stood.',
     orvas:'The Khundryl came for him across the water and took him, and wept at their fires all night, very loudly, and the Third wept with them.',
     redblade:'The Red Blades came for him, and took his scale, and left the Third his sword.',
     warlock:'The Wickan youths came for him, the forty of them, and the grandmother was very quiet, at last.'}[id] || '',
    `Radde wrote it down, properly. The Third carried the name the rest of the way.`])};
  /* the recruits, when they are not walking with the Third at the end: with their own people */
  if (B4_RECRUITS.includes(id) && b4CanRecruit(id) && !b4In(id) && (S.f[B4_DONE[id]] === 2 || S.f[B4_DONE[id]] === 0)) return {label:'With his people', title:{orvas:'With the Khundryl', redblade:'With the Red Blades', warlock:'With the Wickan youths'}[id], txt:({
    orvas:`Orvas rode with the Khundryl through Raraku, and saw the Burned Tears' dead ride, a woman at their head, and wept at the fires after, very loudly, with Gall. ${key === 'horse' && S.f.b4_c7_lead === 'orvas' ? 'When the Third came to the horse he came across the water for it, and gave the sergeant a black bead, and rode beside it.' : 'He lifts his lance to the Third when the riders go past the column, mornings, and it lifts its hands.'}`,
    redblade:`Ramin went back to the Red Blades, and rode with them into the silent trenches the morning after, and has not said what was in them. He says the Third was the best of the Chain he met. He says it to Red Blades, who do not care.`,
    warlock:`Keth went back to Temul's Wickan youths, the forty of them, and the grandmother with him. ${key === 'horse' && S.f.b4_c7_lead === 'warlock' ? 'When the Third came to the horse he brought it, and found it horses.' : 'She says the Third will be back. She is usually right.'}`})[id]};
  return null;
};

B4FIN7.sgt = key => {
  const f = S.f, face = b47FaceName();
  return {title:'Third squad', txt:B4FIN7.join([
    key === 'line' ? `You march with the 9th, Third squad, Second Company, in the file, with the ledger honest and the munitions counted twice, and the recruits watching to see what you do so they can do it too. When they ask what Raraku was like you tell them about a picket, and a light, and they do not understand, which is right.` :
    key === 'horse' ? `You ride with the riders, badly at first and then not, ahead of an army chasing a man across a continent. When the Khundryl ask what Raraku was like you tell them about a picket, and a light, and they nod, because they were there too, in their way.` :
    `You walked out of the ledger. Somewhere in Radde's wet book you are drowned, properly, in a neat hand. You walk Seven Cities with what is left of the Third and nobody is looking for you, and at night you count, out of habit, and get the number, and check it.`,
    f.b4_c7_faceSeen ? `On the night before the battle you saw ${b47Face() ? 'one of yours' : 'one of the Chain\'s'} among the dead, going by at the near edge: ${face}. ${f.b4_c7_namer === 'sgt' ? 'You said the name. You did not decide to.' : 'Somebody in the Third said the name, and you did not.'} You have not seen them since. You do not expect to. You look, at dusk, anyway.` : '',
    f.b4_c7_breakDone ? `Before dawn you held the end of the line against men running for their lives, because the block was for holding. ${b47Fell().length ? `It cost ${b47And(b47Fell().map(NAME))}.` : 'Everyone got up.'} You would do it again. You would like never to be asked.` : f.b4_c7_letGo ? `Before dawn you let a band of frightened men go by the end of the line. Radde wrote it down. You have not decided whether it was the right thing. You have decided you would do it again.` : '',
    B4FIN7.trickLine('sgt'),
    f.sgtScar ? 'There is a new scar, from the end of the line. You do not look at it.' : '',
    `There is a finger bone at your throat on a thong, from Aren, by the Adjunct's order, like every soldier in the Fourteenth. ${f.b4_bone === 'chain' ? `${b47Token().charAt(0).toUpperCase() + b47Token().slice(1)} is tied beside it, the Chain's way.` : 'It came out of an old graveyard in Aren, like the rest of the army\'s.'} Nobody has a name for it yet.`])};
};

B4FIN7.coda = key => {
  const fell = b47Fell(), mates = b47Mates();
  return [
`The Whirlwind is over. On the night before the battle the dead of Raraku and the dead of the army rode down out of the dust on the Dogslayers' trenches, and in the morning the trenches were silent; the Adjunct met Sha'ik on the plain alone and killed her with one thrust while the army watched; and the next day the Holy Desert became a sea, and the Fourteenth ran for the coral ahead of it. Fist Gamet died in his bed. Keneb is Fist. Korbolo Dom was brought in bound. Leoman of the Flails got away in the night, and the Adjunct has ordered the pursuit, across the whole continent if that is where he goes.`,
`The Third was there. It held a picket at the far end of the block, and saw a light, and ${S.f.b4_c7_breakDone ? 'held the end of the line before dawn' : S.f.b4_c7_letGo ? 'let frightened men go by the end of the line before dawn' : 'kept the line'}, and ran for the coral with the 9th. ${fell.length ? `${b47And(fell.map(NAME))} did not come off it.` : 'Every one of the Third who came to Raraku came away from it.'} That is the Third's part. It is small. It is the only part anybody will tell right.`,
`Every soldier in the Fourteenth wears a finger bone at the throat, on a thong, from Aren. At the head of the column there is a standard: a thin figure holding up a bone before a sandstorm. There is no name for any of it yet. Behind the army, where Raraku was, there is a sea. ${mates.length ? 'The Third counts itself, and gets the number, and checks it.' : 'The sergeant counts, and gets one, and checks it.'}`];
};

B4CH7.finale = {
  ids:()=>{ const core = ['haddat', 'sathi', 'tangle', 'marrow', 'tallow', 'hessa', 'tebbet', 'darrut', 'orvas', 'redblade', 'warlock'], f = b47Face();
    return f ? core.filter(k => k !== f).concat([f]) : core; },
  labels:{epi:'Epilogue', squad:'The Third', fallen:'The fallen', away:'Gone back to their people', sgtRole:'Sergeant · Third squad, 9th Legion, the Fourteenth Army', road:'The Third\'s road', prologue:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length} names`], noDead:'None of the Third. Every one of them came away from Raraku.', paper:false,
    endline:'The End of <em>Unblooded</em>',
    credit:'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for House of Chains, the Fourteenth, the bones and the long road to Raraku, and to Ian C. Esslemont for the world they built together; the Third only walked beside it.'},
  endings:{ get line(){ return B4FIN7.ending('line'); }, get horse(){ return B4FIN7.ending('horse'); }, get ledger(){ return B4FIN7.ending('ledger'); } },
  fate:(id, key)=>B4FIN7.fate(id, key),
  gone:(id, key)=>B4FIN7.gone(id, key),
  coda:(key)=>B4FIN7.coda(key) };
