/* ============ Book Two: Keth, a Wickan warlock, the second recruit; and the two recruits, one at a time and swappable (v5.2) ============ */
/* Keth (id 'warlock'), of the Foolish Dog clan: fifteen, one of Sormo E'nath's young warlocks, the eldest of them and the least. When
   the old witches and warlocks of the clans died, what they knew went into children; into Keth went his great-grandmother, who talks,
   out of his mouth, in her own voice. Spirit-craft, not a warren: nothing he does ever sputters.
   THE RULES (asked for by the owner: "same rules, one ally at a time, maybe make them interchangeable"):
   - Keth is met on the west bank of the Sekala (Chapter 2), the same day as Ramin. Either can be taken. S.f.b2_kethDone mirrors
     S.f.b2_raminDone: 1 has walked with the squad, 2 met and asked to walk near, 0 sent away (gone for good).
   - One recruit walks with the squad at a time (b2Ally). Whoever is not with the squad walks near its stretch with their own people, and
     waits at a fire on each chapter's map (B2_POSTS) to be asked back: b2SwapIn(id). The other goes back to their people; their kit is
     unequipped and remembered (S.f.b2_allyGear), and comes back on them when they do. Loyalty and talents stay where they were.
   - The swap is open from the Sekala until the silver is paid on the Geleen (Chapter 6), and again at Balahn (Chapter 7) until the squad
     comes in sight of Aren (b2SwapOpen). Whoever is with the squad at the Geleen chooses at the split, as Ramin always has.
   - Keth leans 'go' at the split: Coltaine sends the young warlocks on with the children. The grandmother would rather stay. If he stays
     he dies at the Barrow. If he goes, he goes to the Wickan children in Aren on the night after the Barrow (b2_keth_go), the same night
     the Red Blades go to the cells; a Keth who was walking near, not with, goes to them too (S.f.b2_kethGone). */

/* ---------------- Keth ---------------- */
Object.assign(TPL, {
  warlock:{name:'Keth', role:'Warlock · Foolish Dog Clan', sig:'K', col:'#a9b8cc', hp:14, ac:12, atk:3, dmg:[1,6,1], rng:1, mv:5, init:2, st:{might:0, wits:2, guile:2}, ab:['b2_teeth', 'b2_bargain', 'salve'],
    epithet:'"I am not the old one. I only carry her."', origin:'The Wickan plains, Foolish Dog Clan', age:15, service:'Two summers with Coltaine, one of them as a warlock, badly',
    height:'Thin as a tent-pole, and growing out of every sleeve he owns.',
    weapon:'A bone-handled knife he is not much good with, and a rattle of dog\'s teeth he is', armour:'Hide, fringed and much too big, a Foolish Dog coat gone from red to the colour of the Odhan, and ochre across the eyes',
    bio:`One of Sormo E'nath's young warlocks: the eldest of them, and the least. When the old witches and warlocks of the clans died, what they knew went into children, the way water goes into the ground. Most of it went into Sormo. Some went into Nil and Nether. A little went into a Foolish Dog boy of thirteen who had been minding the dogs at the time, and it was his great-grandmother, and she has not stopped talking since.`,
    bio2:`The spirits of the Odhan are not his. They are older than the clans and a great deal hungrier, and he asks them for things the way you would ask a strange dog: slowly, with the hand held low. Sormo sends the young ones who can still stand to walk with the column's stretches at night and listen to the ground along them. Keth says he chose the squad because of the dog. His great-grandmother, in a much older voice out of the same mouth, says she would have chosen the healer.`,
    traits:['Two voices, one mouth: a boy\'s, and an old woman\'s that is ruder', 'Sleeps with his palms flat on the ground', 'Laughs at funerals a breath after the other Wickans, as if somebody had to remind him', 'Is followed everywhere by dogs, Hackle first'],
    gear:['A rattle of dog\'s teeth on a thong', 'Ochre in a twist of hide, and ash for the eyes', 'The tooth of his first dog, which he will not wear'],
    get quest(){ const f = (S && S.f) || {}; return f.b2_sormoDead ? `Sormo E'nath went into the Vathar and did not come out, and something went out of every young warlock on the Chain when he did. Keth still hears the ground. He hears it less. The grandmother says that is grief, and will pass, and she has been dead long enough to know.` : `Sormo sent him to listen to the ground along the squad's stretch at night. The land here is old and very hungry, he says, and somebody has to listen to it, or it will eat the wrong people.`; },
    banter:[`"The grandmother says you walk like a cow, Sergeant." A pause. "No. That is what Sathi's dog says. The grandmother says worse."`, `"Stand still. The ground here does not know you yet. It is deciding."`, `In an old woman's voice, out of a boy's mouth: "Eat something, Malazan. You are no use to the dead hungry."`],
    rel:{haddat:'She asks him every morning whether the column\'s dead are resting. He tells her the truth. She thanks him either way.', sathi:'Weasel and Foolish Dog: they insult each other\'s clans all day, in Wickan, with enormous satisfaction. Hackle sleeps between them.', tangle:'Tangle will not stand downwind of him when he works. "Nothing personal. I like things to stay buried when I bury them."', marrow:'The only one in the squad the grandmother respects. They talk shop over the fire, healer and witch, and Keth falls asleep in the middle of it.'}},
});
Object.assign(TPL.sathi.rel, {warlock:'Calls him "the dog-boy" and means it kindly, for a Weasel. He calls her worse, in Foolish Dog.'});
Object.assign(TPL.haddat.rel, {warlock:'Asks him about the column\'s dead every morning, and listens to the answer.'});
Object.assign(TPL.tangle.rel, {warlock:'Keeps upwind of him. "He talks to the ground. I put things in it. We don\'t need to be friends."'});
Object.assign(TPL.marrow.rel, {warlock:'Talks shop with his great-grandmother over the fire, healer to witch. Calls the boy "child" and the old woman "mother".'});
VERB.warlock = 'cuts at';
STATUP.warlock = ['wits', 'guile'];
PICKS[3].warlock = [['crowcall', 'The Old Woman\'s Crows', 'Once a fight: a crow-spirit settles over the eyes of an enemy within 5. For its next two turns (three from level 6) half the blows that would land go into the dark. Spirit-craft: it never sputters.'],
  ['deepground', 'Deep Ground', 'The Land\'s Teeth reaches 5, and holds every enemy next to the one it bites as well. The grandmother knows where the old bones are.']];
PATRONS.warlock = {god:'the grandmother', title:'The dead of the Foolish Dog', txt:id => `Keth goes down, and the thing that gets up again is not Keth.\n\nIt is an old woman, for a breath: you can see her in the way he stands, bent, one hand on a hip that has not hurt him in his life. She looks round at the squad with great contempt, and says something in Foolish Dog that makes Sathi laugh out loud, and puts two fingers to the ground. The ground gives her the squad back. Then she is a boy again, and he is very surprised, and he is not hurt at all.`};

/* the Land's Teeth: the spirits of the ground come up for an enemy and bite; what they bite is held by the feet (the Earth's Hand's hold, 50) */
const b2TeethR = u => has(u.id, 'deepground') ? 5 : 4;
Object.assign(AB, {
  b2_teeth:{name:'The Land\'s Teeth', spirit:true, desc:()=>`An enemy within ${S && has('warlock', 'deepground') ? 5 : 4}: the spirits of the ground come up for it. 1d8+${2 + lvDmg()} on a hit, and what they bite is held by the feet: slowed, and −2 to hit until Keth's next turn${S && has('warlock', 'deepground') ? '. Every enemy next to it is held too' : ''}. Recharges after ${2 - lvAt(6)} round${lvAt(6) ? '' : 's'}. Grows with level. Spirit-craft: it never sputters.`,
    ok:u=>!(u.cdTeeth >= B.round), tiles:u=>foes().filter(f => cheb(u, f) <= b2TeethR(u) && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; u.cdTeeth = B.round + 2 - lvAt(6); AUDIO.play('step'); shakeMap();
      const hold = f => { if (!f || f.hp <= 0) return; f.earthUntil = B.round + 1; f.earthPen = 2; f.slowTurn = true; float(f, 'held', '#9fbf7a'); sparks(f.x, f.y, 8, '#8aa86a', .4); };
      blog(`${u.name} shakes the rattle of dog's teeth at the ground under ${t.name} and asks it, in Foolish Dog, the way you would ask a strange dog.`);
      const r = attack(u, t, {dmg:[1, 8, 2 + lvDmg()], verb:'calls the ground up under'});
      later(() => { if (!B) return; if (r.hit) hold(t); if (has(u.id, 'deepground')) foes().filter(f => f !== t && cheb(f, t) <= 1).forEach(hold); updBattleUI(); }, pace(260)); }},
  /* the Old Woman's Bargain: she takes a wound out of a squadmate and gives it to the ground, and the ground gives it to whoever is
     standing on it nearest. A heal that is also a blow: the same number, out of one and into the other, no roll */
  b2_bargain:{name:'The Old Woman\'s Bargain', spirit:true, desc:()=>`Keth or a hurt squadmate within 4: the old woman takes a wound out of them and gives it to the ground. They heal 2d6+${2 + lvB()}, and the nearest enemy within 3 of them takes the same, no roll, as the ground gives it on. It stops bleeding, too. ${lvAt(6) ? 'Twice a fight.' : 'Once a fight (twice from level 6).'} Grows with the squad's level. Spirit-craft: it never sputters.`,
    ok:()=>(B.used.b2_bargain || 0) < 1 + lvAt(6), tiles:u=>party().filter(p => p.hp > 0 && p.hp < p.maxhp && cheb(u, p) <= 4 && sees(u, p)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; B.used.b2_bargain = (B.used.b2_bargain || 0) + 1;
      const n = Math.min(roll(2, 6, 2 + lvB()), t.maxhp - t.hp), e = foes().filter(f => f.hp > 0 && cheb(f, t) <= 3).sort((a, b) => cheb(a, t) - cheb(b, t) || a.hp - b.hp)[0];
      AUDIO.play('heal'); heal(t, n); t.bleed = 0; sparks(t.x, t.y, 12, '#c8d8b8', .4);
      blog(`${u.name} puts two fingers on ${t === u ? 'his own breastbone' : t.name + '\'s back'}, and an old woman's voice says, out of a boy's mouth: <em>Give it here. I know someone who wants it.</em>`);
      if (e && n > 0) { later(() => { if (!B || e.hp <= 0) return; B.fx.push({kind:'bolt', from:{x:t.x, y:t.y}, to:{x:e.x, y:e.y}, col:'#8aa86a', t:performance.now(), dur:320, wob:true}); AUDIO.play('step');
          blog(`The ground under ${e.name} opens its mouth and gives it the wound: ${n} damage.`); hurt(e, n); sparks(e.x, e.y, 10, '#6a7a4a', .5); updBattleUI(); }, pace(320)); }
      else blog(`There is nobody near enough to give it to. The ground keeps it.`); }},
  b2_crow:{name:'The Old Woman\'s Crows', spirit:true, desc:()=>`Once a fight: a crow-spirit settles over the eyes of an enemy within 5. For its next ${2 + lvAt(6)} turns half the blows that would land go into the dark. Spirit-craft: it never sputters.`,
    ok:()=>!B.used.b2_crow, tiles:u=>foes().filter(f => cheb(u, f) <= 5 && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; B.used.b2_crow = 1; AUDIO.play('shadow'); t.blindTurns = 2 + lvAt(6); float(t, 'crow-blind', '#8a96b0'); sparks(t.x, t.y, 14, '#4a5068', .5);
      blog(`Something with wings comes down out of nowhere onto ${t.name}'s head, and is not there, and is. ${u.name}'s grandmother laughs, out of his mouth.`); }},
});
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ const u = _mkParty(id, x, y); if (id === 'warlock' && has('warlock', 'crowcall') && !u.ab.includes('b2_crow')) u.ab.splice(u.ab.length - 1, 0, 'b2_crow'); return u; }; }

GLOSSX.dg.push([2, 'Wickan warlocks', 'When the old witches and warlocks of the clans died, what they knew went into children. Sormo E\'nath carries the most of it; Nil and Nether, some. Keth of the Foolish Dog carries his great-grandmother, who talks.', ()=>S.f.b2_kethDone != null]);

/* ---------------- the two recruits: one at a time, and either one asked back ---------------- */
const B2_ALLIES = ['redblade', 'warlock'];
const B2_DONE = {redblade:'b2_raminDone', warlock:'b2_kethDone'};
const b2Ally = () => (S && Array.isArray(S.squad) && B2_ALLIES.find(k => S.squad.includes(k))) || null;
const b2AllyLeft = id => !!((S.f.b2_stay && S.f.b2_stay[id]) || (S.dead && S.dead[id]) || (id === 'redblade' ? S.f.b2_raminGone : S.f.b2_kethGone));
/* walking near the squad's stretch with their own people, and could be asked back */
const b2AllyOff = id => !!(S && S.book === 'dg' && S.f && TPL[id] && !b2In(id) && [1, 2].includes(S.f[B2_DONE[id]]) && !b2AllyLeft(id));
const b2SwapOpen = () => !!(S && S.book === 'dg' && ((S.chapter >= 2 && S.chapter <= 5) || (S.chapter === 6 && !S.f.b2_silverDone) || (S.chapter === 7 && !b2Ph7())));
const B2_HOME = {redblade:'what is left of the Red Blades\' file', warlock:'the Foolish Dog\'s fires'};
function b2SwapIn(id){ if (!TPL[id] || b2In(id)) return;
  const out = b2Ally();
  if (out) { S.f.b2_allyGear ??= {}; S.f.b2_allyGear[out] = Object.assign({}, S.gear[out] || {}); S.squad = S.squad.filter(x => x !== out); S.gear[out] = {};
    note(`${NAME(out)} goes back to ${B2_HOME[out]}, near the squad's stretch. Ask at any fire.`); }
  S.f[B2_DONE[id]] = 1; recruit(id);
  Object.entries(((S.f.b2_allyGear || {})[id]) || {}).forEach(([slot, it]) => { if (ITEMS[it] && S.kit.includes(it) && !SQUAD().some(w => Object.values(S.gear[w] || {}).includes(it))) S.gear[id][slot] = it; });
  save(); }

/* where each chapter keeps them: [area, the tile for whichever recruit is with the squad (Ramin's own talk tile), Ramin's fire, Keth's fire] */
const B2_POSTS = [[3, 'b2_east', [6, 6], [4, 6], [8, 6]], [4, 'b2_carriages', [9, 9], [7, 7], [11, 8]], [5, 'b2_vforest', [13, 8], [11, 7], [13, 6]],
  [6, 'b2_hills', [13, 8], [11, 7], [13, 6]], [7, 'b2_balahn', [13, 7], [11, 8], [13, 5]]];
const B2_KETHTALK = {b2_east:'b2_keth3', b2_carriages:'b2_keth4', b2_vforest:'b2_keth5', b2_hills:'b2_keth6', b2_balahn:'b2_keth7'};
const b2ChOf = n => ({2:B2CH2, 3:B2CH3, 4:B2CH4, 5:B2CH5, 6:B2CH6, 7:B2CH7})[n];
const b2Area = (n, id) => (b2ChOf(n).areas || []).find(a => a.id === id);
B2_POSTS.forEach(([n, aid, talkAt, rAt, kAt]) => { const A = b2Area(n, aid); if (!A) return; const node = B2_KETHTALK[aid], flag = node + 'Done';
  A.npcs.push({id:'keth_' + aid, name:'Keth', kind:'warlock', x:talkAt[0], y:talkAt[1], node:()=>node, show:()=>b2In('warlock'), fresh:()=>b2In('warlock') && !S.f[flag]},
    {id:'off_ramin_' + aid, name:'Ramin', kind:'redblade', x:rAt[0], y:rAt[1], node:()=>'b2_swap_redblade', show:()=>b2SwapOpen() && b2AllyOff('redblade')},
    {id:'off_keth_' + aid, name:'Keth', kind:'warlock', x:kAt[0], y:kAt[1], node:()=>'b2_swap_warlock', show:()=>b2SwapOpen() && b2AllyOff('warlock')}); });
/* Chapter 4's far bank, after the Vathar; Chapter 7's wall stair, before the Barrow; the Geleen's partings: on Ramin's own tiles */
b2Area(4, 'b2_farbank').npcs.push({id:'keth_farbank', name:'Keth', kind:'warlock', x:13, y:6, node:()=>'b2_keth4b', show:()=>b2In('warlock'), fresh:()=>b2In('warlock') && !S.f.b2_keth4bDone});
b2Area(7, 'b2_aren').npcs.push({id:'keth_aren', name:'Keth', kind:'warlock', x:13, y:6, node:()=>'b2_keth7b', show:()=>b2In('warlock') && b2Ph7() <= 1, fresh:()=>b2In('warlock') && b2Ph7() <= 1 && !S.f.b2_keth7bDone});
b2Area(6, 'b2_geleen').npcs.push({id:'p_keth', name:'Keth', kind:'warlock', x:10, y:8, node:()=>b2Said('warlock') ? 'b2_part_said' : 'b2_part_keth', show:()=>!!S.f.b2_silverDone && b2In('warlock'), fresh:()=>!!S.f.b2_silverDone && b2In('warlock') && !b2Said('warlock')});
/* Chapter 2, the west bank of the Sekala: Keth comes up from the river; Ramin, once asked, waits at his file's fire like Keth at his */
{ const A = b2Area(2, 'b2_westbank'), r = A.npcs.find(n => n.id === 'ramin2');
  r.node = () => S.f.b2_raminDone == null ? 'b2_ramin' : b2AllyOff('redblade') ? 'b2_swap_redblade' : 'b2_ramin_again';
  A.npcs.push({id:'keth2', get name(){ return S && S.f && S.f.b2_kethDone != null ? 'Keth' : 'A young Wickan'; }, kind:'warlock', x:12, y:5,
    node:()=>S.f.b2_kethDone == null ? 'b2_keth' : b2AllyOff('warlock') ? 'b2_swap_warlock' : 'b2_keth_again',
    show:()=>!!S.f.b2_blown && !b2In('warlock') && S.f.b2_kethDone !== 0, fresh:()=>!!S.f.b2_blown && S.f.b2_kethDone == null}); }

/* what each of them is doing at their own people's fire, chapter by chapter */
const B2_OFF = {
  redblade:{2:`Ramin is with what is left of the Red Blades' file on the bank, polishing the red of his scale.`,
    3:`Ramin is at the Red Blades' fire below the ridge camp with the other horseless men, polishing the red of his scale by a cattle-fire. He is the only one of them still doing it.`,
    4:`Ramin is standing with the Red Blades' file at the edge of the ring of carts, very straight, looking at the nobles' carriages the way a man looks at a tavern he once lost a fight in.`,
    5:`Ramin is walking the edge of the trees with the Red Blades' horseless file, in his scale, in the heat, because a Red Blade does not take it off for the weather.`,
    6:`Ramin is with the Red Blades' file in the hills, counting the company's dead out loud at dusk. It takes longer every night.`,
    7:`Ramin is at the Red Blades' fire in Balahn, polishing the red of his scale a scale at a time. He puts the cloth down when he sees you.`},
  warlock:{2:`Keth is sitting among the Foolish Dog's horses at the top of the bank with his palms flat on the ground and ochre across his eyes.`,
    3:`Keth is at the Foolish Dog's fire at the edge of the camp with three dogs asleep on him and his palms on the ground. He looks up at you with eyes a good deal older than the rest of him.`,
    4:`Keth is sitting on the tongue of a Wickan wagon, rattling his string of dog's teeth at nothing and arguing with himself in two voices, in Wickan.`,
    5:`Keth is lying on his back under the trees with his palms flat on the roots, listening to something a long way down. The Foolish Dog's dogs lie round him in a ring, all facing out.`,
    6:`Keth is at the Foolish Dog's fire in the hills, painting ochre across a remount boy's eyes with two fingers, the Khundryl way, while the old woman in him tells him he is doing it wrong.`,
    7:`Keth is at Balahn's horse lines with the Wickan children, not far from Nil and Nether. He gets up when he sees you.`}};
const b2OffSay = id => B2_OFF[id][S.chapter] || B2_OFF[id][3];

/* ---------------- Chapter 2: Ramin's offer learns a third answer, and is a swap if Keth is already walking with the squad ---------------- */
{ const yes = c => c.go === 'b2_ramin_yes';
  ['b2_ramin', 'b2_ramin_ask'].forEach(k => { const f = B2CH2.dlg[k];
    B2CH2.dlg[k] = () => { const n = f(); n.ch = n.ch.flatMap(c => yes(c) ? [b2In('warlock') ? Object.assign({}, c, {t:'"Walk with us, Ramin. Keth goes back to the Foolish Dog."'}) : c, {t:'"Not now. Walk near us. We may need you."', go:'b2_ramin_later'}] : [c]); return n; }; });
  const f = B2CH2.dlg.b2_ramin_yes;
  B2CH2.dlg.b2_ramin_yes = () => { const was = b2In('warlock'), n = f(), fx = n.fx;
    n.fx = () => { if (b2In('warlock')) b2SwapIn('redblade'); fx(); };
    if (was) n.txt += `\n\nKeth gets up from the end of the line before anyone says anything. "The grandmother says one stranger is enough for a squad," he says. "Two and you are a caravan." He shakes the rattle of teeth at Ramin, politely. "I will be at the Foolish Dog's fires. Near. Ask." Hackle follows him a few steps down the bank, and comes back.`;
    return n; }; }

Object.assign(B2CH2.dlg, {
  b2_ramin_later:()=>({sp:'Ramin', fx:()=>{ S.f.b2_raminDone = 2; }, txt:
`He thinks about it, correctly, and nods. "Near, then." He looks back down the bank at the Red Blades. "The commander is lending out his horseless men to the Seventh's squads, and the Seventh's squads are not queueing for us. I am in no hurry to be lent to a stranger." He puts his helm under his other arm. "I will be with what is left of my file, near your stretch. A lent sword can wait to be lent, Sergeant. Ask at any fire."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),

  /* ---- Keth ---- */
  b2_keth:()=>({sp:'A young Wickan', fx:()=>{ S.f.b2_kethMet = 1; }, txt:
`A Wickan boy is sitting on a dead horse at the top of the bank, which is the only dry thing on it to sit on. Fifteen, perhaps. Thin as a tent-pole, in a coat of the Foolish Dog's red gone the colour of the Odhan, with ochre smeared across his eyes and a rattle of dog's teeth in his lap. He came back over the river with the rearguard: one of the young ones Sormo sent into the fighting. There is somebody else's blood on his sleeve, and none of his own, and he looks as if he would like to sleep for a year.

"Malazan." He stands up. "Keth. Of the Foolish Dog." And then, in another voice altogether, out of the same mouth, an old woman's, dry as a riverbed: "And his great-grandmother, who has no name any more, and does not need one."

He winces, as if somebody had kicked him under a table. "Sorry. She does that."

"Sormo sends the young ones who can still stand to walk with the column at night," he says. "One to a stretch. To listen to the ground." He looks south-west, past the stony rise, where the Semk were. "The land here is old. Since the Semk god came, it is awake, and it is very hungry. Somebody has to listen to it every night, or it will eat the wrong people."${b2In('sathi') ? ` He nods at Hackle, who has come up the bank and is sniffing his boots with enormous interest. "Your Weasel's dog likes me. That is how I choose." Sathi says something in Wickan that is plainly an insult to the Foolish Dog. He answers it with a worse one about the Weasels. She laughs out loud.` : ''}${b2In('marrow') ? `\n\nThe old woman's voice, out of the boy: "I would have chosen the healer." Marrow looks at him over her hat. "Sensible woman," she says.` : ''}${b2In('redblade') ? `\n\nHe looks along the line at Ramin, very straight at the end of it, and at the red. "You have a lent one already," he says. "One stranger to a squad is plenty, the grandmother says. If you want me instead, I walk near your stretch anyway. The ground does not care which fire I sit at."` : ''}`,
    ch:[{t:'"Why us?"', req:()=>!S.f.b2_kethAsked, fx:()=>{ S.f.b2_kethAsked = 1; }, go:'b2_keth_ask'},
        {t:b2In('redblade') ? '"Walk with us, Keth. Ramin goes back to his file."' : '"Third Squad. If you want it."', go:'b2_keth_yes'},
        {t:'"Not now. Walk near us. We may need you."', go:'b2_keth_later'},
        {t:'"No. Go back to Sormo."', go:'b2_keth_no'}]}),
  b2_keth_ask:()=>({sp:'Keth', txt:
`"Because of the dog," he says at once, and then, slower, because you are still looking at him: "When the old ones died, Sergeant, the witches and the warlocks of the clans, what they knew did not die. It went into children. Like water into the ground. Most of it went into Sormo. Some into Nil and Nether." He turns the rattle over in his hands. "I was minding the dogs. A little of it went into me. It was her."

The old woman, out of his mouth: "A little. He says a little."

"She was a witch of the Foolish Dog for sixty years," he says, "and she has been in me for two, and she would like everyone to know which of those was worse." He looks at the squad, one at a time, the way a dog-boy looks at a new herd. "I can ask the ground for things. Small things. It does not always answer. She can take a wound out of one of you and give it to somebody who deserves it more. She likes that one. She calls it a bargain." A pause. "Nobody has ever got the better of her in one."`,
    ch:[{t:b2In('redblade') ? '"Walk with us, Keth. Ramin goes back to his file."' : '"Third Squad. If you want it."', go:'b2_keth_yes'},
        {t:'"Not now. Walk near us. We may need you."', go:'b2_keth_later'},
        {t:'"No. Go back to Sormo."', go:'b2_keth_no'}]}),
  b2_keth_yes:()=>({sp:'Keth', fx:()=>{ b2SwapIn('warlock'); loy('warlock', 1); if (b2In('sathi')) loy('sathi', 1); if (b2In('tangle')) loy('tangle', -1); }, txt:
`"Third Squad," he says, trying it, and the old woman says it after him, as if correcting his accent. He goes and sits down at the end of the line with his palms flat on the ground, and that seems to be how a Foolish Dog joins anything.

${b2In('sathi') ? `Hackle barks, once, and goes and lies down across his feet. Sathi looks at the dog for a long moment. "Traitor," she tells it, in Wickan. Hackle thumps his tail.` : 'A dog from somewhere in the column comes and lies down across his feet. Then another one.'}${b2In('redblade') ? `\n\nRamin, at the end of the line, sees how it is before you say anything. He salutes, Malazan style, very correctly. "A lent sword goes where it is carried," he says, "and today it is carried back to its file." He goes down the bank to what is left of the Red Blades. "Near, Sergeant. Ask at any fire."` : ''}${b2In('tangle') ? `\n\nTangle moves round, quietly, to stand upwind of him. "Nothing personal," he says. "I like things to stay buried when I bury them."` : ''}${b2In('marrow') ? `\n\nMarrow looks at the blood on his sleeve. "Not yours?" He shakes his head. "Then sit," she says, "and give me your hands," and checks them anyway.` : ''}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth_later:()=>({sp:'Keth', fx:()=>{ S.f.b2_kethDone = 2; }, txt:
`He shrugs, the Wickan way, with one shoulder. "Near, then. I walk by your stretch anyway. The ground does not care which fire I sit at." The old woman adds, out of his mouth: "It cares a little."

He goes back down the bank to the Foolish Dog's horses and sits among them with his palms on the ground, and the dogs come.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth_no:()=>({sp:'Keth', fx:()=>{ S.f.b2_kethDone = 0; }, txt:
`He nods. He does not seem surprised, or hurt; he seems tired. "Sormo will find me another stretch," he says. "Somebody whose dog is less particular."

The old woman says something in Foolish Dog as he goes. ${b2In('sathi') ? 'Sathi will not translate it. She is trying not to laugh.' : 'It is plainly about you. It does not sound like a compliment.'}`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth_again:()=>({sp:'Keth', txt:`Keth is down among the Foolish Dog's horses with his palms flat on the bank. He does not look up.`, ch:[{t:'Leave him.', go:()=>startExplore()}]}),
});

/* ---------------- the swap, at any fire: Ramin or Keth, asked back ---------------- */
const b2SwapCh = id => { const on = b2Ally(), nm = NAME(id), again = S.f[B2_DONE[id]] === 1;
  return [{t:on ? `"Walk with the squad${again ? ' again' : ''}, ${nm}. ${NAME(on)} goes back to ${on === 'redblade' ? 'the Red Blades\' file' : 'the Foolish Dog'}."` : `"Walk with the squad${again ? ' again' : ''}, ${nm}."`, fx:()=>{ b2SwapIn(id); }, go:'b2_swap_in'},
    {t:id === 'redblade' ? 'Leave him to his polishing.' : 'Leave him to the ground.', go:()=>startExplore()}]; };
const B2CHX = B2CH3; // the swap nodes are Book Two's, not a chapter's: they live with Chapter 3's dialogue, which every later chapter can reach
Object.assign(B2CHX.dlg, {
  b2_swap_redblade:()=>({sp:'Ramin', txt:
`${b2OffSay('redblade')}

"Sergeant." He stands up, very straight. "I am still lent. A lent sword is lent whoever is carrying it today." ${b2Ally() === 'warlock' ? 'He looks past you at Keth, at the end of the squad\'s line, and nods to him, correctly. Keth shakes the rattle of teeth back.' : ''}`,
    ch:b2SwapCh('redblade')}),
  b2_swap_warlock:()=>({sp:'Keth', txt:
`${b2OffSay('warlock')}

"Malazan." The old woman's voice, out of the boy: "Has the Red Blade worn out already? They do not make them as they did." ${b2Ally() === 'redblade' ? 'Ramin, at the end of the squad\'s line, pretends not to hear. He hears.' : 'Keth sighs. "She means hello."'}`,
    ch:b2SwapCh('warlock')}),
  b2_swap_in:()=>{ const id = b2Ally() || 'warlock', dog = b2In('sathi');
    return {sp:NAME(id), txt: id === 'redblade' ?
`He comes and stands at the end of the line, where a new man stands, although he is not new. "Lent again," he says. "Good. The company was beginning to look at me as if I were a horse nobody wanted." He sets his helm down and takes out the tin of enamel.${dog ? ' Hackle sniffs his spurs, and sneezes, and goes back to Sathi.' : ''}` :
`He comes and sits down at the end of the line with his palms flat on the ground${dog ? ', and Hackle comes and lies down across his feet as if he had never been anywhere else' : ''}. "The grandmother says, about time," he says. Then, in her voice: "I said nothing of the kind. I said, *finally*."`,
      ch:[{t:'On.', go:()=>startExplore()}]}; },
});

/* ---------------- Chapter 2: the night of the spirits; and the chapter's page ---------------- */
{ const f = B2CH2.dlg.b2_night; B2CH2.dlg.b2_night = () => { const n = f(); if (b2In('warlock')) n.txt = n.txt.replace('By dawn there is nothing out there but the plain.',
`Keth is sitting up on the far side of the cart, very straight, with his palms flat on the ground and his eyes shut. "Do not watch," the old woman says, out of him, quite calm. "It is rude. They have not eaten in a very long time." Then, in his own voice, much smaller: "Nil is out there. And Sormo. Holding it still for them."

By dawn there is nothing out there but the plain.`); return n; }; }
{ const e = B2CH2.extras; B2CH2.extras = () => { const x = e();
    if (b2In('warlock')) x.push('Keth, a young warlock of the Foolish Dog, walks with the squad, and his great-grandmother walks inside him. He listens to the ground at night. She tells him what it says, rudely.');
    else if (S.f.b2_kethDone === 2) x.push('A young Wickan warlock of the Foolish Dog walks near the squad\'s stretch, and listens to the ground along it at night.');
    if (S.f.b2_kethDone === 0) x.push('A young Wickan warlock offered to walk with the squad on the west bank, and the squad sent him back to Sormo.');
    return x; };
  const j = B2CH2.journal; B2CH2.journal = () => { const x = j(); if (b2In('warlock')) x.splice(Math.max(0, x.length - 1), 0, 'Keth of the Foolish Dog walks with the squad: one of Sormo\'s young warlocks, with his great-grandmother in him, to listen to the ground along the stretch at night.'); return x; }; }

/* ---------------- Chapter 3: before the warlocks' tunnel, and after it ---------------- */
Object.assign(B2CH3.dlg, {
  b2_keth3:()=>({sp:'Keth', fx:()=>{ S.f.b2_keth3Done = 1; }, txt:
`Keth is sitting cross-legged on the bare ground at the edge of the squad's fire with both palms flat on the earth, scowling at it.

"Sormo did not ask me," he says, before you can ask. "For the tunnel. He asked Nil. And him." He tips his head toward the far side of the camp, where the other young warlock sits beside Nil with his hands on the ground. "I do not say his name. We do not say names before work. The ground listens for names, and tonight it will be asked for a great deal."

The old woman, out of his mouth, very dry: "He is jealous. He should be grateful. Tunnels are for the young and the stupid."

"I am young," Keth says.

"Yes," says the old woman.`,
    ch:[{t:'"Then listen for us tonight."', fx:()=>{ S.f.b2_keth3 = 'listen'; loy('warlock', 1); }, go:'b2_keth3b'},
        {t:'"You\'ll get your turn."', fx:()=>{ S.f.b2_keth3 = 'turn'; }, go:'b2_keth3c'}]}),
  b2_keth3b:()=>({sp:'Keth', txt:`He looks at you for a long moment, and then down at his hands. "Yes," he says. "I will listen. If it lets go of anyone, I will know." He presses his palms flatter into the ground, as if he could hold it up from here. Perhaps he can. He does not sleep all night.`, ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth3c:()=>({sp:'Keth', txt:`"Not if I can help it," says the old woman, before he can answer. He opens his mouth to argue with her and shuts it again. It is plainly an old argument, and she has plainly never lost it.`, ch:[{t:'On.', go:()=>startExplore()}]}),
});
{ const f = B2CH3.dlg.b2_raid_back; B2CH3.dlg.b2_raid_back = () => { const n = f(); if (!b2In('warlock')) return n;
  n.txt = n.txt.replace('and you understand that nobody is going to.', `and you understand that nobody is going to.

Except Keth. He is sitting on the bare patch where the other boy sat before the raid, with his palms on the ground. ${S.f.b2_keth3 === 'listen' ? 'He has been there all night. ' : ''}He says a name, once, quietly, into the earth, now that the work is done. The old woman in him does not say anything at all, which is the first time you have known her not to.`); return n; }; }

/* ---------------- Chapter 4: the carriages, and Sormo at the Vathar ---------------- */
Object.assign(B2CH4.dlg, {
  b2_keth4:()=>({sp:'Keth', fx:()=>{ S.f.b2_keth4Done = 1; }, txt:
`Keth is sitting on a Wickan wagon-tongue at the edge of the ring of carts with his rattle of dog's teeth in his lap, not shaking it.

"Sormo is spending himself," he says. "Every night, less of him comes back from the ground. The old ones in him are using him up, the way you burn a wagon to cook one meal." He looks toward the river, which you cannot see from here but can smell. "Tomorrow there is a river. The grandmother says rivers are where the spirits go when they are tired."

The old woman, out of his mouth, about the nobles' carriages behind you: "And those. In my day we left that kind out for the wolves, and the wolves sent them back."`,
    ch:[{t:'"Is there anything you can do for him?"', go:'b2_keth4c'}, {t:'Leave him.', go:()=>startExplore()}]}),
  b2_keth4c:()=>({sp:'Keth', txt:`"No," he says. "That is what being young is, the grandmother says. Watching the old do something stupid, and not being allowed to help." For once she does not correct him.`, ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth4b:()=>({sp:'Keth', fx:()=>{ S.f.b2_keth4bDone = 1; }, txt:
`Keth is sitting in the shallows below the first trees, wet to the chest, with his palms flat on the bottom of the river. He has been there since the butterflies. The dogs of the Foolish Dog are sitting on the bank above him in a row, and not one of them is making a sound.

"She has stopped talking," he says, without turning round. "Since the river. I did not know she could."

He is trying to laugh. You can see him trying: the Wickans laugh at a death, it is good manners, it is what the dead are owed. His shoulders go, once, and it is not a laugh.${b2In('sathi') ? `\n\nSathi, up on the bank with Hackle, is not laughing either. She is watching the boy in the water.` : ''}`,
    ch:[{t:'"Laugh for him, then. He\'d want it loud."', fx:()=>{ S.f.b2_kethSormo = 'laughed'; loy('warlock', 1); }, go:'b2_keth4d'},
        {t:'Sit down in the river beside him, and say nothing.', fx:()=>{ S.f.b2_kethSormo = 'sat'; loy('warlock', 1); }, go:'b2_keth4e'},
        {t:'"Up. The column\'s moving. He\'d want you on your feet."', fx:()=>{ S.f.b2_kethSormo = 'up'; }, go:'b2_keth4f'}]}),
  b2_keth4d:()=>({sp:'Keth', txt:
`He tries again. It comes out wrong, a cough, a choke, and then it comes out right: a laugh, thin and cracked, the funeral laugh. And then there is another voice in it, under it, old and dry and enormous, laughing with him out of the same mouth, the two of them together, until the dogs on the bank start to howl and ${b2In('sathi') ? 'Sathi is laughing too, up there, with her arms round Hackle, and Hackle howls with the rest' : 'half the Foolish Dog on the bank is laughing with them'}.

"She says," he manages, wiping his eyes with a wet sleeve, "that he was always too serious. For a man with so many grandmothers in him."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth4e:()=>({sp:'Keth', txt:
`The river is cold, and it pulls at you, and you sit down in it anyway, beside him, and put your palms flat on the stones the way his are. You cannot hear anything. He can.

After a long time the old woman says, out of him, very quietly, not unkindly: "There. You see. They sit with us, the Malazans, when they have the sense." And Keth laughs then, once, a small cracked laugh, the right one.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth4f:()=>({sp:'Keth', txt:
`He gets up, because you are a sergeant, dripping, and climbs the bank. The dogs go with him.

The old woman says, out of his mouth, as he passes you: "He would want nothing, Malazan. He is dead. That is the whole of the point of it." And then, after a step: "But yes. On his feet. Walk, child."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
});
{ const f = B2CH4.dlg.b2_butterflies; B2CH4.dlg.b2_butterflies = () => { const n = f(); if (b2In('warlock')) n.txt += `\n\nKeth, behind you, has sat down in the river. In the river, up to his chest, with his palms on the bottom. He does not make a sound. Neither does the old woman in him.`; return n; }; }
{ const e = B2CH4.extras; B2CH4.extras = () => { const x = e(); const k = S.f.b2_kethSormo;
  if (k === 'laughed') x.push('Keth laughed for Sormo in the shallows of the Vathar, and the old woman in him laughed with him, and every dog of the Foolish Dog howled.');
  if (k === 'sat') x.push('The sergeant sat in the Vathar beside a Wickan boy with his palms on the bottom, and heard nothing, and stayed.');
  if (k === 'up') x.push('Keth got up out of the Vathar because he was told to. The old woman in him said that was right, eventually.');
  return x; }; }

/* ---------------- Chapter 5: the forest, the tower, the ground's water ---------------- */
Object.assign(B2CH5.dlg, {
  b2_keth5:()=>({sp:'Keth', fx:()=>{ S.f.b2_keth5Done = 1; }, txt:
`Keth is lying on his back under the trees with his palms flat on the roots, listening to something a long way down.

"There is something cold asleep in this forest," he says. "Older than her. Much older. She will not go near the tower. She says it is rude to wake the old." A pause. "She is a hundred and four."

He sits up. "But there is water. Under the roots, there. The ground knows where. It is not sure it wants to tell a Foolish Dog, in a forest that is not ours." He holds the rattle of teeth loosely, the way you hold out a hand to a dog you do not know. "I could ask it."`,
    ch:[{t:'"Ask it."', check:['wits', 13, 'warlock'], go:'b2_keth5_ok', fail:'b2_keth5_no'}, {t:'"Leave it sleeping. We\'ll manage."', go:()=>startExplore()}]}),
  b2_keth5_ok:()=>({sp:'Keth', fx:()=>{ if (!S.f.b2_keth5) { S.f.b2_keth5 = 'water'; chain(2, 0, 'A seep under the roots, where the ground showed Keth'); } }, txt:
`He puts the rattle down and his palms flat, and asks, in Foolish Dog, slowly, for a long time. Then he gets up and walks twenty paces into the trees and kicks at the leaf-litter between two roots, and it is dark, and then it is wet, and then it is a seep, cold, clean, filling a hollow the size of a helm.

"It says you may have it," he says, "because you asked. It says nobody has asked it anything for a very long time." The old woman: "Fill the skins before it changes its mind."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth5_no:()=>({sp:'Keth', fx:()=>{ if (!S.f.b2_keth5) S.f.b2_keth5 = 'dry'; }, txt:
`He asks for a long time, and nothing answers, and then something does, from a long way down and a long way back, cold, and he takes his hands off the ground very fast and sits on them.

"No," he says. "Not this ground. Not for us." The old woman, quite gently for her: "It was not angry, child. It was asleep. That is worse." He does not ask again.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
});
{ const e = B2CH5.extras; B2CH5.extras = () => { const x = e(); if (S.f.b2_keth5 === 'water') x.push('In the Vathar forest Keth asked the ground for water, and it showed him a seep under the roots: two skins, cold and clean, in the middle of the Dry March.'); return x; }; }

/* ---------------- Chapter 6: Sanimon's hills; the partings on the Geleen ---------------- */
Object.assign(B2CH6.dlg, {
  b2_keth6:()=>({sp:'Keth', fx:()=>{ S.f.b2_keth6Done = 1; }, txt:
`Keth is watching the Khundryl. A Khundryl warrior is putting the paint on a boy at the next fire, ochre and ash, three strokes, the way they mourn themselves before a battle, and Keth is watching every stroke.

"She approves," he says. "She says the Khundryl are the only people on this whole continent with manners." He rubs the ochre across his own eyes with his thumb, thoughtfully. "They say there is going to be an order. When we come down off these hills. That the Fist will send the children on, with the people, and keep the soldiers." He shrugs. "If he sends the children, he sends the warlocks. I am a child, the grandmother says. She is very pleased about it."`,
    ch:[{t:'"Would you go?"', go:'b2_keth6b'}, {t:'Leave him to the Khundryl.', go:()=>startExplore()}]}),
  b2_keth6b:()=>({sp:'Keth', txt:`"I would do what the Fist says," he says. And then, in her voice, before he can stop her: "And I would not. And we would have a great deal to say to each other about it, all the way to wherever we ended up." He winces. "She is a hundred and four. She has never once done what a Fist says."`, ch:[{t:'On.', go:()=>startExplore()}]}),

  b2_part_keth:()=>{ const lean = b2Lean('warlock');
    return {sp:'Keth', txt:
`Keth is standing at the end of the horse lines, not quite with the youngest of the Wickans and not quite away from them, with his arms folded like theirs.

"The Fist has said," he says. "The children go on with the people. The warlocks go with the children: Nil, and Nether, and me." He does not sound furious, like the others. He sounds as if he has been arguing with someone for an hour. He has. "So I go."

And then the old woman, out of his mouth, as dry as the Odhan: "I have died once, Malazan. It is not so bad. I would like to do it again on my feet, next to that man." She means Coltaine. "The boy says I do not get a vote, because I am dead. I say I am the only one of us who has voted before."${lean === 'stay' ? `\n\n"She is winning," Keth says, miserably.` : `\n\n"She is not winning," Keth says. He does not sound sure.`}`,
      ch:b2PartCh('warlock', {stayNode:'b2_p_keth_stay', goNode:'b2_p_keth_go',
        letStay:'"Stay, then. Both of you."', askGo:'"Go with the children, Keth. They need a warlock who can still hear."', argGo:'"The Fist gave you an order. Both of you."',
        letGo:'"Go with the children, Keth. That\'s the order."', askStay:'"The Fist\'s line will need someone who can hear the ground. I\'m asking you to stay."', argStay:'"Your grandmother\'s right. Let her see it through."',
        edgesGo:[['the Fist\'s order', 2]],
        edgesStay:[['the grandmother wants it', 2]]})}; },
  b2_p_keth_stay:()=>({sp:'Keth', fx:()=>b2Settle('warlock', true), txt:
`${b2HowSaid('warlock') === 'asked' ? `He looks at you for a long time. "Yes," he says at last, and it is his own voice, and then the old woman says it too, a breath behind him, like the funeral laugh. "Yes."` : `"Ha," says the old woman, out of him, enormously satisfied. Keth shuts his eyes. "Yes," he says. "All right. Yes."`}

He takes something off the thong at his neck and puts it in your hand: a dog's tooth, yellow, worn smooth. "My first dog's," he says. "I do not wear it. Give it to the Weasel's dog, when he is old. He will know what it is for."

He walks east toward the Seventh's fires with his rattle going at his hip, two voices arguing in one mouth, and halfway up the rise both of them laugh.`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_p_keth_go:()=>({sp:'Keth', fx:()=>b2Settle('warlock', false), txt:
`${b2HowSaid('warlock') === 'asked' ? `He nods, slowly. "A warlock who can still hear," he says. "Yes. Nil cannot, now. Nether hears too much." The old woman says nothing for a while. Then: "Fine. Fine. Herd your cattle, then."` : b2HowSaid('warlock') === 'talked' ? `"An order," he says. "Yes." The old woman, out of him, sour: "I have never once in my life done what a Fist said." "You are not in your life," Keth tells her. "You are in mine."` : `"Then I go," he says, and the old woman says nothing at all, which from her is an argument lost.`}

"Then I walk on with the people," he says, "and listen to the ground for them all the way to Aren." He looks east, where the Seventh's fires are, for a long time. "She says to tell the Fist she would have stayed. I will not tell him that. He knows."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
});
B2_SPLIT.push('warlock');
B2_KEEP6.warlock = 'b2_dogtooth';
B2_GOODBYE6.warlock = () => `Keth walks east with his rattle of dog's teeth going at his hip and two voices arguing in one mouth, and halfway up the rise both of them laugh.`;
Object.assign(B2CH6.gear, {b2_dogtooth:{name:'A dog\'s tooth', slot:'trinket', who:null, stat:{wits:1}, line:'The tooth of Keth\'s first dog, yellow and worn smooth, off the thong at his neck. He never wore it. He gave it to the sergeant on the Geleen Plain, for Hackle, when Hackle is old.'}});
/* Keth leans to go: the Fist sends the warlocks on with the children. Only the Vathar wound would keep him back. */
{ const _lean = b2Lean; b2Lean = function(id){ if (id === 'warlock') return b2Hurt() === id ? 'stay' : 'go'; return _lean(id); }; }
{ const f = B2CH6.dlg.b2_youngest; B2CH6.dlg.b2_youngest = () => { const n = f(); if (b2In('warlock')) n.txt += `\n\nKeth is not among them. He is standing at the end of the lines with his arms folded like theirs, not quite with them. "Nil says, the last warlocks," he says to you, without turning his head. "He does not count me. He is right. I am a dog-boy with a grandmother in him." And then, in her voice, dry as the Odhan: "The last witch, then. Somebody count me."`; return n; }; }

/* ---------------- Chapter 7: Balahn, the wall, the Barrow, and the night after ---------------- */
Object.assign(B2CH7.dlg, {
  b2_keth7:()=>({sp:'Keth', fx:()=>{ S.f.b2_keth7Done = 1; }, txt:
`Keth is sitting at the squad's fire with his palms on the ground, looking across at the horse lines, where Nil and Nether are, and Temul, and the children.

"Nil has not spoken since the Geleen," he says. "Nether feels the Seventh. All of it. Every one that dies, back there, behind us. She says it is like being stung." He turns the rattle over. "I feel the ground. Only the ground. It is setting a table, Sergeant, out on that road to Aren. A long one."

The old woman, out of him, quietly, which is how you know it is bad: "Walk fast tomorrow, Malazan. Do not stop to look at anything."`,
    ch:[{t:'On.', go:()=>startExplore()}]}),
  b2_keth7b:()=>({sp:'Keth', fx:()=>{ S.f.b2_keth7bDone = 1; }, txt:
`Keth is sitting at the bottom of the wall stair with his back to the stone. Everybody else is going up. He is not.

"There is too much dead on the other side of this wall," he says. "Already. Before anyone has died." He puts his palm flat on the bottom step. "The ground out there is very full, and very old, and it knows what is coming up the road. She is counting." He listens. "She has stopped counting."

He gets up. "I will come up," he says. "She says I must see it, so that afterward somebody who was not a soldier saw it." His face is very young. "I would rather not."`,
    ch:[{t:'"Come up, then. Stand by me."', fx:()=>{ loy('warlock', 1); }, go:()=>startExplore()}]}),
  b2_keth_go:()=>({sp:'Keth', txt:
`Keth is already at the bottom of the stair, with his rattle in his fist, looking down the street toward the horse lines, where the Wickan children are, and Nil and Nether in the middle of them.

"Nil and Nether felt him go," he says. "On the mound. The crows. They are broken, the grandmother says. Not for good. For long enough." He looks at you. "The children have no warlock who can still hear the ground. They have me. I am going to them." It is not a question. It is a Foolish Dog telling you where the herd is.

The old woman, out of his mouth, and for the first time since the Sekala it sounds like a woman and not like a voice: "You count well, Malazan. Count them for me, too. I have lost the habit."

He puts two fingers on your back, briefly, the way he does in a fight, and goes down the street to the children ${b2In('sathi') ? 'without looking back, and Hackle goes with him as far as the corner, and stops there, and watches him, and comes back' : 'without looking back'}.`,
    ch:[{t:'On.', fx:()=>{ if (b2In('warlock')) { S.f.b2_kethGone = 1; letGo('warlock', 'Keth goes to the Wickan children, to be their warlock.'); } },
        go:()=>talk(b2Fell('redblade') ? 'b2_keth_go2' : 'b2_evening2')}]}),
  b2_keth_go2:()=>({sp:'Aren · dusk', txt:`Down in the square, the Red Blades are still standing in the lantern-light, waiting for the provosts. Ramin is not among them. Ramin is on the Barrow.`,
    ch:[{t:'Go down to the Red Blades\' commander.', go:'b2_ramin_msg'}, {t:'Leave them be.', go:'b2_evening2'}]}),
});
/* the evening after the Barrow: Keth goes to the children if he is with the squad; whoever is near, not with, goes their own way too */
{ const f = B2CH7.dlg.b2_evening; B2CH7.dlg.b2_evening = () => { const n = f(), rOff = b2AllyOff('redblade') && S.f.b2_raminDone === 1, kOff = b2AllyOff('warlock') && S.f.b2_kethDone === 1;
  if (rOff) n.txt += `\n\nAt the end of the rank, on foot, the only one of them with no horse, is Ramin. He sees you on the stair. He does not leave the rank; a Red Blade in rank does not. But his hand comes off the buckle, once, flat, the way you would show a sergeant that the sword is clean. Then the provosts close round them, and the red goes out of the square.`;
  if (kOff) n.txt += `\n\nDown at the horse lines the Wickan children are sitting by their horses with their faces shut, and among them, with his palms flat on the paving, is Keth. He does not look up. You think the old woman in him is saying the names.`;
  if (rOff || kOff) { const fx = n.fx; n.fx = () => { if (fx) fx(); if (rOff) S.f.b2_raminGone = 1; if (kOff) S.f.b2_kethGone = 1; }; }
  if (b2In('warlock')) n.ch = [{t:'Keth.', go:'b2_keth_go'}];
  return n; }; }
{ const f = B2CH7.dlg.b2_wall_crows; B2CH7.dlg.b2_wall_crows = () => { const n = f(); if (b2In('warlock')) n.txt += `\n\nKeth is beside you with both palms flat on the parapet, the stone, as if it were ground. His eyes are shut. "He is still alive," the old woman says, out of him, quite steady, to nobody. "He is still alive. He is still—" And then she does not say anything, and the boy is crying, and you do not ask.`; return n; }; }
Object.assign(B2_BAR7, {warlock:()=>`Keth is behind the shields with his palms flat on the mound, which is the oldest ground he has ever touched, and the most crowded. The old woman is talking to it, out of him, steadily, the way you would talk to a dog that is about to be asked for everything. "Not yet," she is telling it. "Not yet. Not these."`});
Object.assign(B2_BAREND7, {warlock:()=>`When the crows come down Keth looks up at them, and laughs, the funeral laugh, a breath late, the way he always did; and this time the old woman laughs with him, at the same moment, in the same breath, and then there is only one voice, and you could not say whose it is.`});
/* the end of the book: Keth with the children, if he went to them (from the squad, or from near it) */
{ const g = B2FIN.gone; B2FIN.gone = (id, key) => {
  if (id !== 'warlock' || b2Fell('warlock') || !S.f.b2_kethGone) return g(id, key);
  key = B2FIN.key(key); const s = S.f.b2_kethSormo;
  return {label:'With the children', title:'The Foolish Dog\'s warlock', txt:B2FIN.join([
    key === 'wickans' ? `Keth rides out of Aren's landward gate with the children a month after the crows, near the front, with Temul, and when the squad rides beside the herd he drops back to ride beside you, some days, and the old woman tells you how to sit a horse, at length, until you do.` :
    `Keth rides out of Aren's landward gate with the Wickan children a month after the crows, near the front, with Temul, the only one of them who can still hear the ground. ${key === 'guard' ? 'The Fourteenth does not see him go. You do. You are on the wall.' : 'You hear, on the road, that a Foolish Dog warlock with two voices finds water for a clan of children wherever they ride.'}`,
    `Nil talks again, in the end. Nether learns to bear it. ${s === 'laughed' ? 'At night, by the fire, the children laugh at the funerals a breath late, because the warlock does, and nobody remembers why.' : 'At night, by the fire, he listens to the ground for all of them, and tells them what it says, and the old woman tells them what it means.'}`,
    S.kit.includes('b2_dogtooth') ? '' : B2FIN.loy('warlock', `"Count them for me," the old woman said, in Aren. You do. You count her last.`, `He never quite forgave you something. The old woman did, at once. She says forgiving is for people with time to waste, and she has all the time there is.`, `You count the squad, some nights, out loud. You count him in it. He would say you were wrong to. She would say you were right.`)])}; }; }

/* ---------------- Hackle's voice: a bark when he bites, a yelp when he is hit, a whine when he goes down; a growl when he smells
   an ambush; and the noises the story says he makes, when it says he makes them ---------------- */
{ const _attack = attack; attack = function(a, t, o = {}){ const r = _attack(a, t, o); if (a && a.kind === 'hackle') later(() => AUDIO.play('bark', r.hit ? 2 : 1), pace(60)); return r; }; }
{ const _hurt = hurt; hurt = function(u, n, crit){ const live = u && u.hp > 0; _hurt(u, n, crit); if (live && u.kind === 'hackle') AUDIO.play(u.hp > 0 ? 'yelp' : 'whine'); }; }
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt);
    if (S && S.book === 'dg' && B && B.def && B.def.dogIn) later(() => AUDIO.play(opt.surprise === 'e' ? 'snarl' : 'bark', 2), pace(500));
    return r; }; }
/* the story's own words: "Hackle barks", "Hackle growls", "Hackle whines", "Hackle howls", "the dogs start to howl"; never a "does not growl" */
const B2_DOGSAY = [[/\b(?:barks?|barking|barked)\b/, 'bark'], [/\b(?:growls?|growling|snarls?|snarling|hackles up|lips back)\b/, 'snarl'], [/\b(?:whines?|whining|whimpers?)\b/, 'whine'], [/\b(?:howls?|howling|howled)\b/, 'howl']];
const b2DogSound = txt => { for (const s of String(txt || '').split(/(?<=[.!?"])\s+/)) { if (!/\b(?:Hackle|the dogs?)\b/.test(s)) continue;
    for (const [re, k] of B2_DOGSAY) { const m = re.exec(s); if (m && !/\b(?:not|never|no|n't|nor)\s+(?:\w+\s+)?$/.test(s.slice(0, m.index))) return k; } }
  return null; };
{ const _talk = talk; let last = null;
  talk = function(id){ const r = _talk(id);
    try { if (S && S.book === 'dg' && id !== last) { const el = document.querySelector('#sheet .txt'), k = el && b2DogSound(el.textContent); if (k) setTimeout(() => AUDIO.play(k, 2), 350); } } catch(e) {}
    last = id; return r; }; }
