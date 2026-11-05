/* ============ Book Four, v7.1: the Fourteenth's spares (David, Oct 26, 2026) ============ */
/* Three more soldiers of the Fourteenth (Mirrel, a Denul healer; Yorin, a mage of Serc; Rasp, a marine-trained sapper), Tallow's Twins and
   Hessa's prayers to D'rek (their templates are in 70), the muster at Chapter 1's start (the sergeant picks who fills the squad's empty
   places from the company's spares, each marked with the role the squad lacks), and the fire offer for a save that began before the muster
   existed ("Radde has spares from the company": swap a new soldier for a spare). Names and voices: docs/v7.1-squad-brief.md; numbers and
   rulings: docs/v7.1-notes.md. Everything here is guarded by S.book === 'hoc'. */

/* ---- the three, at base (level 1) numbers: Mirrel is built like Marrow, Rasp like Tangle, Yorin like Tuft with a knife for a lash ---- */
Object.assign(TPL, {
  mirrel:{name:'Mirrel', role:'Healer · Denul · Li Heng', sig:'I', col:'#8fbfa0', hp:15, ac:12, atk:2, dmg:[1,6,0], rng:1, mv:4, init:0, st:{might:0, wits:3, guile:1}, ab:['mend','wash','stanch','salve'], magic:true,
    epithet:'"Sit. Hand. Other hand. Good."', origin:'Li Heng, Quon Tali', age:34, service:'Eleven years in the Li Heng poorhouse hospice, and a few months in the 9th', height:'Small, quick, and always slightly ahead of whoever she is walking with.',
    weapon:'A knife for cutting linen, and the threat of being sat down', armour:'A padded jack with the sleeves cut off at the elbow, and a hospice bag with a red hand stitched on the flap',
    bio:`A midwife's daughter from Li Heng who learned Denul in the city's poorhouse hospice, where nobody paid and everybody bled. She signed on when the Fourteenth was raised because the army pays its healers on the first of the month, and the hospice did not pay them at all. This is her first campaign.`,
    bio2:`She has healed a great many people. Until the Aren Way she had never healed one who was trying to kill somebody else at the time. She has found that it makes no difference to the work, and has decided not to think about what that says about the work.\n\nShe counts in threes, out loud, to everything: a patient up off a cot, a stitch, a sergeant who will not hold still. The squad has started counting with her, and on three, nobody moves.`,
    traits:['Counts in threes, out loud', 'Talks to wounds, not to the people they are in', 'Will not lend her clean linen to anyone, for anything', 'Dry about the gods, and about officers'],
    gear:['A hospice bag with a red hand on the flap', 'A roll of clean linen, guarded', 'A brass thimble from her mother'],
    get quest(){ return b4In('marrow') ? `There is another healer in the squad, older, from Nap, whose warren has moods. Mirrel's does not, she says. She has started to wonder, near the desert, whether that is because she has not been listening.` : `She is the squad's healer, and the Third has walked a long way already without one. She intends to walk them the rest of it, to Raraku and out, and to count them on the way. In threes.`; },
    banter:[`"Sit. Hand. Other hand. Good."`, `"The warren does not have moods, Sergeant. People do."`, `"In Li Heng we'd have called this a quiet night."`],
    rel:{haddat:'Haddat held a man down for her once, without being asked. They have liked each other since.', sathi:'Sathi will not let her near Hackle. She has stitched Hackle twice, at night, and neither of them is telling.', tangle:'Asked him to keep the satchel on the far side of the fire from her linen. He moved it. She counts that as a courtship.', marrow:'Two Denul healers in one squad. They argue about the warren in whispers, like two cooks in one kitchen.', redblade:'She mended his sword hand and told him to rest it. He has not. She has written his name down.', warlock:'The old woman in him asked to see her hands, and looked at them a long while. Mirrel does not know what she saw.', tallow:'He comes to her with every scrape. She suspects he likes being told to sit still.', hessa:'Denul and D\'rek: she mends, and Hessa says the Worm will have it back eventually. They get on better than that sounds.', tebbet:'She rebinds his bow hand after drill. He thanks her in Dal Honese. She has started answering in Li Heng street cant.', darrut:'He calls her "the surgeon", which she is not. She lets him.', orvas:'He offered to show her how the tears are cut. She said no, and gave him a lesson in clean cuts instead.', yorin:'She makes him drink water after every spell. He forgets. She does not.', rasp:'Rasp\'s hands are a map of small burns. Mirrel keeps a separate salve for them.'}},
  yorin:{name:'Yorin', role:'Squad mage · Serc · Cawn', sig:'Y', col:'#9fc4e8', hp:14, ac:12, atk:4, dmg:[1,6,1], rng:1, mv:4, init:1, st:{might:0, wits:3, guile:2}, ab:['b4_bolt','b4_gust','salve'], magic:true,
    epithet:'"Sky\'s clear, Sergeant. That\'s the trouble with it."', origin:'Cawn, Quon Tali', age:27, service:'A season at a cadre school, sent back "unfinished", and a few months in the 9th', height:'Thin, windburnt, and always looking a little above whoever he is talking to.',
    weapon:'A knife, and the sky, when it is in the mood', armour:'A padded jack, a sky-blue sash the quartermaster has twice told him to take off, and a copper wind-vane on a cord',
    bio:`A barge-master's son from Cawn who could tell what the sky over the river would do three days out, and then found out why. Serc, the Path of the Sky. A cadre school took him for a season and sent him home with a chit that says "unfinished". The Fourteenth was not particular, and the 9th had no mage at all.`,
    bio2:`He calls lightning, and he moves air, and he is honest about how well: well enough, mostly, on a clear day. He talks about the sky the way other men talk about a difficult relative.\n\nThe Whirlwind frightens him in a professional way. It is the biggest thing in the sky he has ever seen, and it is not his, and the sand in it gets into the warren like grit into a lock.`,
    traits:['Looks up before he answers anything', 'Talks fastest when frightened, which is often', 'Taps the copper vane for luck, and then checks which way it points', 'Will not stand under a tree in a storm, or near Tangle\'s satchel in any season'],
    gear:['A copper wind-vane the size of his palm', 'The cadre school\'s chit: "unfinished"', 'A barge-pole splinter from home, for luck'],
    get quest(){ return `The Fourteenth marches toward a wall of wind that somebody else is holding up. Yorin would like very much to know who, and how, and to be a long way off when he finds out. He has decided the first two are worth the third.`; },
    banter:[`"Sky's clear, Sergeant. That's the trouble with it. It never stays clear."`, `"That's not a storm out there. A storm has the decency to move."`, `"I can put lightning on him. I can't promise it'll be the same him afterwards."`],
    rel:{haddat:'She asks him every morning what the sky will do. He tells her. She believes him, which frightens him.', sathi:'Sathi says Wickans can smell rain. He tested her. She can.', tangle:'Tangle keeps the satchel downwind of him, "in case of lightning". That is not how lightning works. He is not sure.', marrow:'She calls him "child" and makes him sit down after every spell. He has stopped arguing.', redblade:'Ramin asked him to keep the lightning away from the horses. He has promised, and means it.', warlock:'The grandmother says his warren is "very loud". He casts more quietly round the boy now.', tallow:'Two Quon boys off the transports. They talk about the sea, and not about missing it.', hessa:'She says the sky is only the ground\'s roof. He has not found an answer to that in three weeks.', tebbet:'Tebbet asks which way the wind will be at the next halt, every halt. Tebbet is right more often than he is.', darrut:'Darrut says the Aren Guard used to hang mages for lightning in the harbour. Yorin has decided it is a joke.', orvas:'Orvas wants to know if the wind can make a horse run faster. It can. They have not told the sergeant.', mirrel:'She makes him drink water after every spell. He forgets. She does not.', rasp:'Rasp asked him, with interest, how close lightning has to be to light a fuse. He walks on the other side of the column now.'}},
  rasp:{name:'Rasp', role:'Sapper · marine-trained · Malaz City', sig:'P', col:'#d0864a', hp:16, ac:13, atk:3, dmg:[1,8,0], rng:5, mv:4, init:2, st:{might:1, wits:2, guile:2}, ab:['sharper','burner','cusser','smoker','salve'],
    epithet:'"Don\'t touch that. Don\'t look at it like that either."', origin:'Malaz City', age:29, service:'A year at the marine sappers\' school on Malaz Island, and a few months in the 9th', height:'Compact, burn-freckled, and moves round the satchel as a cook moves round a hot stove.',
    weapon:'A marine crossbow with the cradle filed to her own pattern, and a satchel of Moranth munitions', armour:'A leather apron over a jerkin, the file on her belt, and burns on both hands she does not discuss',
    bio:`Trained a year at the marine sappers' school on Malaz Island, and passed. The Fourteenth had more trained sappers than marine squads to put them in, so she was posted to the 9th's medium infantry with a satchel and a crossbow, and has decided not to take it personally. Mostly.`,
    bio2:`She is named for the file on her belt and for her voice, which a cusser went off too near when she was nineteen. She does not count the satchel. She weighs it in her hand and knows.\n\nShe is kind to recruits in a way that sounds like threats, and fond of munitions in a way the squad finds worrying. She says the marines get the good fuse. She says it burns the same.`,
    traits:['Weighs the satchel in one hand instead of counting it', 'Files her crossbow cradle smooth at every halt', 'Stands upwind of her own munitions', 'Calls every munition "lovely", and means it'],
    gear:['The file on her belt', 'A coil of marine fuse, waxed', 'A Malaz City harbour token, worn smooth'],
    get quest(){ return `There are Moranth munitions in the Fourteenth's wagons, and a great many sappers in the 8th who are better at this than anyone has a right to be. Rasp would like to be counted among them, one day. Until then she has a satchel, a crossbow and a squad, and she has decided that is enough to be going on with.`; },
    banter:[`"Don't touch that. Don't look at it like that either."`, `"Moranth clay. Lovely stuff. Smells like the end of an argument."`, `"Marines get the good fuse. I get the fuse the marines dropped. It burns the same."`],
    rel:{haddat:'Haddat walks between her and the recruits on the march. Rasp has decided that is respect, and is right.', sathi:'"Will a sharper scare a horse?" "Yours, or the other side\'s?" They are friends.', tangle:'Has heard of Mincer\'s sappers. Would like to see his fuse-work, from a different squad.', marrow:'Marrow looked at her hands and said nothing, and gave her a tin of salve. She keeps the tin, full.', redblade:'Ramin treats her like a lady. It confuses her. She has started to enjoy it.', warlock:'The grandmother calls her "the loud one". She takes it as a professional compliment.', tallow:'She let him hold a smoker once. He held it like a baby bird. She liked him after that.', hessa:'Hessa asked what is in the clay. Rasp told her, in detail. Hessa stood further off, and Rasp respects her for it.', tebbet:'Two who would rather do it from a distance. They compare ranges at night, as other soldiers compare boots.', darrut:'Darrut wants to know if a cusser could take down Aren\'s north gate. She has worked it out. She will not tell him.', orvas:'Orvas keeps the horse on the far side of her. She thinks that is wise, and says so.', mirrel:'Mirrel keeps a separate salve for her hands, and does not lecture. Rasp counts that a kindness.', yorin:'She asked him how close lightning has to be to light a fuse. He walks on the other side of the column now.'}},
});
Object.assign(VERB, {mirrel:'jabs a linen knife at', yorin:'slashes a knife at', rasp:'looses a quarrel at'});
Object.assign(STATUP, {mirrel:['wits', 'guile'], yorin:['wits', 'guile'], rasp:['wits', 'might']});
Object.assign(PICKS[3], {
  mirrel:[['triage', 'The Hospice Way', 'Mend heals +3 and reaches 4 tiles. Li Heng\'s poorhouse had one healer to forty beds, and she learned to reach.'], ['argument', 'Not on My Table', 'Once a fight: a downed squadmate within 2 stands up at 6 health. Strain 3. She has never lost one on her table and does not intend to start in a desert.']],
  yorin:[['b4_stormeye', 'Storm Eye', 'Sky-Fire reaches 6 tiles and strikes at +3. He can see a storm coming three days off, and a soldier three tiles further.'], ['b4_squall', 'Squall', 'The Sky\'s Shove throws one tile further, and does 1d6 instead of 1d4. The river taught him what a squall does to a barge.']],
  rasp:[['longfuse', 'The Marine Cradle', 'A cradle under the crossbow, filed to the marine pattern: sharpers, burners, smokers and cussers never scatter, and reach one tile further.'], ['sappers_eye', 'Short Fuse', 'The squad rolls +2 initiative, and Rasp\'s free swings hit +2. The school on Malaz Island taught one thing first: the sapper who moves first is the one still there.']],
});
Object.assign(PATRONS, {
  mirrel:{sig:'ohl', god:'Soliel', title:'Soliel, Mistress of Healing', txt:id => `Mirrel, face down, counts to three under her breath, the way she counts a patient up off a cot, and on three the air smells of the hospice in Li Heng: lye, linen and lamp-oil.\n\nSoliel does not often answer soldiers. She answers the women who sit up all night with the poor, sometimes, and Mirrel has sat up a great many nights.`},
  yorin:{sig:'tuft', god:'Shadowthrone', title:'Shadowthrone, King of High House Shadow', txt:id => `Yorin goes down with one hand still open to a sky that has stopped answering, and the shadows at the edge of the field lean in over him like men round a dice game.\n\nHigh House Shadow likes mages. It likes them in its debt. Yorin, when he can talk again, says that is a problem for later, and later has always been his favourite time.`},
  rasp:{sig:'ellis', god:'Cotillion', title:'Cotillion, the Rope', txt:id => `Rasp, on her back, says the sappers' word to the Rope out of habit, the one you say before a fuse is lit, and something very high up takes in the slack.\n\nThe Patron of Assassins has a soft spot for sappers. They are the only soldiers who plan their way out as carefully as he does.`},
});
/* how everyone else sits with the three (the sheets show only those in the squad) */
{ const R3 = {
    haddat:{mirrel:'Held a man down for the new healer once, without being asked. They have liked each other since.', yorin:'Asks the mage every morning what the sky will do, and believes him, which frightens him.', rasp:'Walks between the sapper and the recruits on the march, and does not explain.'},
    sathi:{mirrel:'Will not let the new healer near Hackle. Hackle has been stitched twice, at night, and is not telling.', yorin:'Says Wickans can smell rain. The mage tested it. She can.', rasp:'"Will a sharper scare a horse?" "Yours, or theirs?" Friends since.'},
    tangle:{mirrel:'Moved the satchel to the far side of the fire from her linen when she asked. She counts that a courtship.', yorin:'Keeps the satchel downwind of the mage, "in case of lightning".', rasp:'Another sapper. They have agreed, politely, to be in different squads.'},
    marrow:{mirrel:'Two Denul healers in one squad. They argue about the warren in whispers, like two cooks in one kitchen.', yorin:'Calls him "child", and makes him sit after every spell.', rasp:'Gave her a tin of salve for her hands and said nothing about them.'},
    redblade:{mirrel:'She mended his sword hand and told him to rest it. He has not.', yorin:'Has asked the mage to keep the lightning away from the horses.', rasp:'Treats her like a lady. It confuses her. She has started to enjoy it.'},
    warlock:{mirrel:'The grandmother asked to see the healer\'s hands, and looked at them a long while.', yorin:'The grandmother says the mage\'s warren is "very loud".', rasp:'The grandmother calls her "the loud one".'},
    tallow:{mirrel:'Goes to her with every scrape. She suspects he likes being told to sit still.', yorin:'Two Quon boys off the transports. They talk about the sea, and not about missing it.', rasp:'She let him hold a smoker once. He held it like a baby bird.'},
    hessa:{mirrel:'Denul and D\'rek: one mends, the other says the Worm will have it all back. They get on.', yorin:'Told him the sky is only the ground\'s roof. He has not found an answer.', rasp:'Asked what was in the clay, and then stood further off.'},
    tebbet:{mirrel:'She rebinds his bow hand after drill, and answers his Dal Honese in Li Heng cant.', yorin:'Asks the mage which way the wind will be, every halt, and is right more often than the mage.', rasp:'Two who would rather do it from a distance. They compare ranges at night.'},
    darrut:{mirrel:'Calls her "the surgeon". She is not. She lets him.', yorin:'Tells the mage the Aren Guard used to hang mages for lightning in the harbour. Yorin has decided it is a joke.', rasp:'Wants to know if a cusser could take down Aren\'s north gate. She has worked it out, and will not tell him.'},
    orvas:{mirrel:'Offered to show her how the tears are cut. She gave him a lesson in clean cuts instead.', yorin:'Wants to know if the wind can make a horse run faster. It can. They have not told the sergeant.', rasp:'Keeps the horse on the far side of her. She approves.'}};
  Object.entries(R3).forEach(([id, r]) => { const d = BOOKSNAP.hoc.tpl[id] && BOOKSNAP.hoc.tpl[id].rel; const tgt = d && d.value ? d.value : TPL[id] && TPL[id].rel; if (tgt) Object.assign(tgt, r); }); }

/* ---- v7.2: the gear the Book Four soldiers can wear goes by role (38c TPL_ROLES, ITEM_ROLE); B4_WEARS_LIKE and b4WhoPatch are gone ---- */

/* ---- an old save's Tallow had "Hold, Recruit" (holdline); a slinger takes "Keep Moving" (ghost) instead ---- */
{ const _migrate = migrate; migrate = function(s){ const r = _migrate(s);
    if (s && s.book === 'hoc' && s.picks && Array.isArray(s.picks.tallow) && s.picks.tallow.includes('holdline')) s.picks.tallow = s.picks.tallow.map(k => k === 'holdline' ? 'ghost' : k);
    return r; }; }

/* ---------------- the new abilities ---------------- */
/* Serc in the Dust: 70's sputter halves B.warren.serc for the one cast; Yorin's spells read it */
const b4Serc = () => (B && B.warren && B.warren.serc != null ? B.warren.serc : 1);
const b4BoltR = u => has(u && u.id ? u.id : 'yorin', 'b4_stormeye') ? 6 : 5;
const b4GustD = (u, half) => half ? 1 : 2 + (has(u && u.id ? u.id : 'yorin', 'b4_squall') ? 1 : 0);
const b4TwinsOn = u => !!(b4On() && B && u && u.side === 'p' && !u.ally && u.twinsUntil >= B.round);
Object.assign(AB, {
  /* Tallow: the Twins. Once a fight, a free act: a squadmate within 4 (or himself) carries the Lady's luck until the end of the next round */
  b4_twins:{name:'The Twins', free:true, desc:()=>`Once a fight, and it does not use his action: Tallow or a squadmate within 4 carries the Twins until the end of the next round. The first blow they miss is rolled again, and the first save they fail against fire or a daze is rolled again. Oponn's luck, not sorcery: it never sputters.`,
    ok:()=>!B.used.b4_twins, tiles:u=>party().filter(p => !p.ally && cheb(u, p) <= 4 && sees(u, p)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; B.used.b4_twins = 1; t.twinsUntil = B.round + 1; AUDIO.play('coin'); float(t, 'the Twins', '#e8c073'); sparks(t.x, t.y, 12, '#e8c073', .4);
      blog(`${u.name} touches the card in the oilcloth inside his shirt and says, "${t === u ? 'Me, this once' : t.name}," to nobody in particular, and is heard by somebody in particular.`); }},
  /* Hessa: two prayers to D'rek. A god's answer, not a warren: no strain, the Dust never touches them; otataral does (sorcery) */
  b4_rot:{name:'Autumn\'s Touch', prayer:true, sorcery:true, desc:()=>`A prayer to D'rek on an enemy within 2: no roll, the Worm takes it. 1d4+${lvDmg()} rot, and its armour rots −3 through its next two rounds. Recharges after ${2 - lvAt(6)} round${lvAt(6) ? '' : 's'}. A god's answer, not a warren: the Dust never touches it. Otataral does.`,
    ok:u=>!(u.cdRot >= B.round), tiles:u=>foes().filter(f => cheb(u, f) <= 2 && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; u.cdRot = B.round + 2 - lvAt(6); u.fired = true; t.rotUntil = B.round + 2; t.rotPen = 3;
      AUDIO.play('rumble'); sparks(t.x, t.y, 14, '#8a7a3a', .45); float(t, 'rots −3', '#b0a060'); u.facing = t.x >= u.x ? 1 : -1;
      blog(`${u.name} says one word in the temple tongue, low, and ${t.name}'s ${t.ac >= 15 ? 'armour' : 'hide and harness'} goes soft and brown at the edges, the way leaves go in autumn.`);
      const n = roll(1, 4, lvDmg()); later(() => { if (B && t.hp > 0) { hurt(t, n); updBattleUI(); } }, pace(200)); }},
  b4_wormgift:{name:'The Worm Gives Back', prayer:true, sorcery:true, desc:()=>`A prayer to D'rek: Hessa or a squadmate next to her heals 1d6+${2 + lvB()} and stops bleeding. Twice a fight. Grows with the squad's level. A god's answer, not a warren: the Dust never touches it. Otataral does.`,
    ok:()=>(B.used.b4_wormgift || 0) < 2, tiles:u=>party().filter(p => !p.ally && cheb(u, p) <= 1 && p.hp < p.maxhp),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; B.used.b4_wormgift = (B.used.b4_wormgift || 0) + 1; AUDIO.play('heal'); heal(t, roll(1, 6, 2 + lvB())); t.bleed = 0; sparks(t.x, t.y, 10, '#b8a870', .35);
      blog(`${u.name} puts ${t === u ? 'her own palm' : `her palm on ${t.name}'s back`} and asks the Worm for a little of what it has taken. It gives it back, warm, smelling of turned earth.`); }},
  /* Yorin: Serc, the Path of the Sky. Warren sorcery: strain, and in the Dust it sputters (half) */
  b4_bolt:{name:'Sky-Fire', strain:2, desc:()=>`Serc: lightning on an enemy within ${b4BoltR(B && B.cur)} in sight. It strikes at +${S && has('yorin', 'b4_stormeye') ? 3 : 2}: 2d6+${2 + lvDmg()} on a hit. Strain 2. A warren: in the Dust it can sputter (half damage).`,
    tiles:u=>foes().filter(f => cheb(u, f) <= b4BoltR(u) && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const half = b4Serc() < 1, k = 2 + lvDmg(); u.facing = t.x >= u.x ? 1 : -1;
      B.fx.push({kind:'bolt', from:{x:u.x, y:u.y - .6}, to:{x:t.x, y:t.y}, col:'#d8ecff', t:performance.now(), dur:pace(260), wob:true}); AUDIO.play('magic'); sparks(t.x, t.y, 18, '#d8ecff', 1.1);
      blog(`${u.name} opens a hand to the sky and pulls. ${half ? 'Something comes down, thinner than he asked for.' : 'It comes down.'}`);
      return attack(u, t, {dmg:half ? [1, 6, Math.floor(k / 2)] : [2, 6, k], bonus:has(u.id, 'b4_stormeye') ? 3 : 2, verb:'brings the lightning down on', ground:true, land:pace(240)}); }},
  b4_gust:{name:'The Sky\'s Shove', strain:3, desc:()=>`Serc: a fist of wind at an enemy within 4. It and every enemy next to it are thrown straight back from Yorin ${b4GustD(B && B.cur)} tiles, ${S && has('yorin', 'b4_squall') ? '1d6' : '1d4'} each, and +1d6 into a wall or a body. Every squadmate a thrown enemy leaves gets a free swing. Toward a pit or a drop: a save to catch the lip. Bosses and the very heavy stagger and stay put. Strain 3. A warren: in the Dust it can sputter (thrown 1 tile).`,
    tiles:u=>foes().filter(f => cheb(u, f) <= 4 && sees(u, f)),
    async run(u, x, y){ const t = unitAt(x, y); if (!t) return; const half = b4Serc() < 1, d = b4GustD(u, half), die = has(u.id, 'b4_squall') ? 6 : 4; u.facing = t.x >= u.x ? 1 : -1;
      const group = [t, ...foes().filter(f => f !== t && cheb(f, t) === 1)].sort((a, b) => cheb(b, u) - cheb(a, u)); // the far ones first, so the near ones have room
      AUDIO.play('slam'); shakeMap(); B.fx.push({kind:'ring', x:t.x, y:t.y, col:'#d8ecff', t:performance.now(), dur:pace(500)});
      blog(`${u.name} throws both hands out, and the air in front of him goes with them${half ? ', what there is of it' : ''}.`);
      for (const f of group) { if (!B || f.hp <= 0) continue; sparks(f.x, f.y, 10, '#e4f0ff', .9); hurt(f, roll(1, die, 0)); if (!B || f.hp <= 0) continue;
        if (f.boss || f.immortal || f.maxhp >= 45) { float(f, 'staggers', '#d8ecff'); blog(`${f.name} leans into the wind and stays.`); continue; }
        const dx = Math.sign(f.x - u.x), dy = Math.sign(f.y - u.y); if (!dx && !dy) continue;
        let to = {x:f.x, y:f.y}, slam = false;
        for (let i = 0; i < d; i++) { const n = {x:to.x + dx, y:to.y + dy}; if (pitAt(n.x, n.y)) { to = n; break; } if (!free(n.x, n.y, f)) { slam = true; break; } to = n; }
        if (to.x === f.x && to.y === f.y) { blog(`${f.name} is thrown into what is behind it.`); hurt(f, roll(1, 6, 0)); updBattleUI(); continue; }
        float(f, 'thrown back', '#d8ecff'); f.b4thrown = B.round;
        if (await forcedMove(f, to, 'thrown')) continue;
        if (slam && f.hp > 0) { blog(`${f.name} fetches up hard against what is behind it.`); hurt(f, roll(1, 6, 0)); }
        updBattleUI(); await wait(pace(100)); } }},
});
/* Autumn's Touch: the rot strips armour (−3) while it lasts */
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (t && t.rotUntil >= (B ? B.round : 0)) c.ac -= (t.rotPen || 3); return c; }; }
/* the Twins on a blow: a miss is thrown again, once */
{ const _attack = attack;
  attack = function(a, t, o = {}){ const r = _attack(a, t, o);
    if (r && !r.hit && !o.b4twins && b4TwinsOn(a) && t && t.hp > 0) { a.twinsUntil = -1; tally('b4Twins');
      blog(`<em>The Twins.</em> The Lady pulls: ${a.name} gets a second try at it.`); float(a, 'the Lady pulls', '#e8c073');
      return _attack(a, t, Object.assign({}, o, {b4twins:true})); }
    return r; }; }
/* the Twins on a save: fire (a burner's flames) and a daze */
const B4ROLL = {d20:() => d20()}; // the Twins' second roll (a test may fix it)
const b4TwinsSave = (u, mod, dc) => { const nat = B4ROLL.d20(); return {ok:nat !== 1 && (nat === 20 || nat + mod >= dc), math:SET.dice ? ` <span class="stat">(${nat}+${mod} vs ${dc})</span>` : ''}; };
{ const _enterFire = enterFire;
  enterFire = function(u){ const armed = b4TwinsOn(u), b0 = (u && u.burnTurns) || 0; const r = _enterFire(u);
    if (armed && u.hp > 0 && (u.burnTurns || 0) > b0) { u.twinsUntil = -1; tally('b4Twins');
      const s = b4TwinsSave(u, Math.max(statOf(u.id, 'might'), statOf(u.id, 'guile')) + (u.steady ? 2 : 0), 12 + DIFF().dc);
      if (s.ok) { u.burnTurns = b0; float(u, 'the Lady pulls', '#e8c073'); blog(`<em>The Twins.</em> ${u.name} rolls in the dust and the flames go out${s.math}.`); }
      else blog(`<em>The Twins</em> look the other way. ${u.name} is still burning${s.math}.`); }
    return r; }; }
{ const _foeSpecial = foeSpecial;
  foeSpecial = async function(u, gone){ if (!b4On() || !B) return _foeSpecial(u, gone);
    const armed = party().filter(p => b4TwinsOn(p) && !p.stun); const r = await _foeSpecial(u, gone);
    armed.filter(p => B && p.stun && p.hp > 0).forEach(p => { p.twinsUntil = -1; tally('b4Twins');
      const s = b4TwinsSave(p, statOf(p.id, 'wits') + (p.steady ? 2 : 0), 14);
      if (s.ok) { p.stun = false; float(p, 'the Lady pulls', '#e8c073'); blog(`<em>The Twins.</em> ${p.name} shakes it off${s.math}.`); }
      else blog(`<em>The Twins</em> look the other way. ${p.name} stays dazed${s.math}.`); });
    return r; }; }

/* ---------------- the muster: the sergeant picks who fills the squad's empty places ---------------- */
/* HOC_NEW is the pool (70). The sapper is offered only when Tangle is not in the squad. */
const B4_ROLEW = {tallow:'skirmisher, sling', hessa:'battle-priest of D\'rek, spear and shield', tebbet:'bowman', darrut:'shield, late of the Aren Guard', mirrel:'Denul healer', yorin:'mage of Serc', rasp:'sapper'};
const B4_FILLS = {tallow:'bow', tebbet:'bow', mirrel:'healer', yorin:'sorcery', rasp:'munitions'}; // the role each one fills, if the squad lacks it
const B4_LACKW = {healer:'no healer in the squad', bow:'no bow in the squad', munitions:'no sapper in the squad', sorcery:'no sorcery in the squad'};
const B4_SEEN = {
  tallow:'Tallow, a tall Quon boy off the transports, with a sling through his belt and something in oilcloth inside his shirt.',
  hessa:'Hessa, out of Kartool, square as a door, with a temple spear and a worm carved round the rim of her shield. She stood D\'rek\'s doors for six years, and she prays as if she expects an answer.',
  tebbet:'Tebbet, a Dal Honese bowman, long in the arm and very still.',
  darrut:'Darrut, one of the Aren Guard who followed Blistig into the 9th, with a big round shield and the badge scraped off it.',
  mirrel:'Mirrel, a healer from Li Heng with a hospice bag over her shoulder, who looks at the squad\'s hands before its faces.',
  yorin:'Yorin, a mage of Serc from Cawn, young and windburnt, telling the soldier beside him about the sky. The soldier is not listening.',
  rasp:'Rasp, a sapper out of Malaz City, marine-trained, with a satchel, a crossbow and a file on her belt, and a voice like the file.'};
const B4_COMES = {
  tallow:'Tallow comes over and salutes you, and then salutes the squad, to be safe.',
  hessa:'Hessa comes over, sets the butt of her spear in the dust beside you, and is still.',
  tebbet:'Tebbet comes over, sights along the squad as if along an arrow, and nods.',
  darrut:'Darrut comes over and stands where the shield wall will want him, without being told.',
  mirrel:'Mirrel comes over and looks at everybody\'s hands, and then at yours. "Fine," she says. "For now."',
  yorin:'Yorin comes over, looks up, and says it will be hot. It will be. Everybody knew that.',
  rasp:'Rasp comes over, sets the satchel down very gently, and stands upwind of it.'};
const b4She = id => ['hessa', 'mirrel', 'rasp', 'haddat', 'sathi', 'marrow'].includes(id);
/* what the squad lacks now: {healer, bow, munitions, sorcery} (true = lacks) */
function b4Lacks(){ const sq = ((S && S.squad) || []).filter(k => TPL[k] && !(S.dead && S.dead[k])), ab = k => TPL[k].ab || [];
  const muni = k => ab(k).includes('sharper');
  return {healer:!sq.some(k => ab(k).includes('mend')), bow:!sq.some(k => k !== 'sgt' && TPL[k].rng >= 4 && !muni(k)), munitions:!sq.some(muni),
    sorcery:!sq.some(k => (TPL[k].magic && !ab(k).includes('mend')) || ab(k).some(a => AB[a] && AB[a].spirit))}; }
/* the mark on a spare: the role the squad lacks that this one fills, in words ('' if none) */
const b4SpareMark = id => { const r = B4_FILLS[id]; return r && b4Lacks()[r] ? B4_LACKW[r] : ''; };
const b4SpareOk = id => !!(S && TPL[id] && !(S.dead && S.dead[id]) && !(S.squad || []).includes(id) && !(id === 'rasp' && b4In('tangle')));
const b4SpareList = () => HOC_NEW.filter(b4SpareOk);
/* the empty places in a squad of five (the sergeant counts) */
const b4Places = () => Math.max(0, 5 - ((S && S.squad) || []).filter(k => !(S.dead && S.dead[k]) && !B4_RECRUITS.includes(k)).length); // v7.1 (David, Oct 26): a recruit walks on top of the five, never in a fill-in's place
const b4MusterDue = () => !!(b4On() && S.f && S.f.b4_musterDue > 0 && !S.f.b4_mustered);
/* the muster opens: the provisional fill (70's newStateHOC) goes back to the company, so the places are empty for the sergeant's pick */
function b4MusterOpen(){ if (!b4MusterDue() || S.f.b4_musterOpen) return; S.f.b4_musterOpen = 1;
  (Array.isArray(S.f.b4_fill) ? S.f.b4_fill : []).forEach(k => { if (!S.squad.includes(k)) return; S.squad = S.squad.filter(x => x !== k); if (S.gear) S.gear[k] = {}; if (S.loy) delete S.loy[k]; if (S.picks) delete S.picks[k]; });
  S.trail = (S.trail || []).slice(0, Math.max(1, S.squad.length - 1)); S.f.b4_took = []; save(); }
/* take a spare on: joins the squad (70's recruit brings the veteran picks); the talent pick waits for the end of the muster */
function b4Take(id){ if (!b4SpareOk(id) || b4Places() <= 0) return false; const pd = (S.picksDue || []).slice();
  recruit(id); S.picksDue = pd; if (!Array.isArray(S.f.b4_took)) S.f.b4_took = []; S.f.b4_took.push(id);
  while ((S.trail || []).length < S.squad.length - 1) S.trail.push(Object.assign({}, S.trail[S.trail.length - 1] || S.pos));
  save(); return true; }
function b4MusterDone(){ if (!b4On()) return; S.f.b4_mustered = 1; S.picksDue = b3PicksDue(S); save(); }
/* one for one at a fire: the spare comes in where the soldier who goes back stood in the order */
function b4SwapNew(out, inn){ if (!b4In(out) || !b4SpareOk(inn)) return false; // v7.2: through the roster (38c): the gear is parked, and comes back
  if (!rosterSwap(out, inn)) return false;
  if (!Array.isArray(S.f.b4_spareSwaps)) S.f.b4_spareSwaps = []; S.f.b4_spareSwaps.push([out, inn]); save(); return true; }
/* the fire offer is for a save that came into the book before the muster existed (no b4_musterDue), until the sergeant has had it */
const b4FillsIn = () => HOC_NEW.filter(b4In);
const b4SparesOpen = () => !!(b4On() && S.f && S.f.b4_musterDue == null && !S.f.b4_mustered && (b4FillsIn().length || b4Places() > 0) && b4SpareList().length);
/* the choice a chapter's fire offers (back: the fire node's id) */
function b4SpareChoice(back){ return {t:'Radde has spares from the company.', tag:'swap a new soldier', req:()=>b4SparesOpen(), fx:()=>{ S.f.b4_spareBack = back; }, go:'b4_spares'}; }
const b4SpareBack = () => { const b = S.f.b4_spareBack; return b && DLG[b] ? talk(b) : startExplore(); };
const b4SpareRows = ids => ids.map(id => B4_SEEN[id]).join('\n\n');
const b4SpareChoices = (go, fx) => b4SpareList().map(id => { const m = b4SpareMark(id); return Object.assign({t:`Take ${NAME(id)} (${B4_ROLEW[id]}).`, fx:()=>fx(id), go}, m ? {tag:m} : {}); });

Object.assign(DLG, {
  /* Chapter 1's start (B4CH1.intro's node, 71, while the muster is due): Radde and the company roll */
  b4_muster:()=>{ b4MusterOpen(); const n = b4Places(), took = Array.isArray(S.f && S.f.b4_took) ? S.f.b4_took : [], last = took[took.length - 1], spares = b4SpareList();
    const head = !took.length ? `Before the line forms, Radde finds you. He is the Second Company's sergeant, a narrow man with a ledger under one arm and a stick for straightening lines under the other, and he does not waste mornings.

"Third squad," he says. "The Fourteenth says five to a squad, and it says it in writing. You're ${numw(n)} short." He opens the ledger on his forearm. "I've got spares. Soldiers the other squads were dealt and didn't keep, or that asked out. None of them asked for you. Take your pick before the Adjunct looks this way."

The spares stand in a loose row in the dust behind him, trying not to look chosen.` : `${B4_COMES[last] || `${NAME(last)} comes over.`}

Radde writes ${NAME(last)} down against the Third's number. ${n ? `"${numw(n, true)} more," he says, and waits.` : `He shuts the ledger. "Third squad, five," he says. "Into the line, Sergeant. And keep them in it."`}`;
    return {sp:'Sergeant Radde', scene:'b4_c1_review', txt:`${head}${n && spares.length ? `\n\n${b4SpareRows(spares)}` : ''}`,
      ch:n > 0 && spares.length ? b4SpareChoices('b4_muster', id => { b4Take(id); }) : [{t:'Into the line.', fx:()=>{ b4MusterDone(); }, go:'b4_c1_start'}]}; },
  /* the fire offer, for a save from before the muster: one for one, as many times as the sergeant likes, then done for the book */
  b4_spares:()=>{ const spares = b4SpareList();
    return {sp:'Sergeant Radde', again:()=>`Radde is still at the fire with the ledger open. The spares are still by the company's fire, waiting to see what you do.`, txt:
`Radde comes round the fires with the ledger under his arm, the way he does when he wants a thing written down before he forgets it.

"Third," he says. "The company's got spares. Soldiers who were dealt to other squads and didn't take, or that asked out.${b4Places() > 0 ? ` And you're ${numw(b4Places())} short. ${b4Recruit_() ? `${NAME(b4Recruit_())} doesn't count; ${b4She(b4Recruit_()) ? 'she' : 'he'}'s lent, not ours.` : 'The book says five.'} Take ${b4Places() > 1 ? 'them' : 'one'} on.` : ''} If there's anybody in your five you'd rather swap, now's the time, before the road makes it complicated." He nods at the row of them by the company's fire. "One for one. Same as a muster."

${b4SpareRows(spares)}`,
      ch:[...(b4Places() > 0 ? b4SpareChoices('b4_spares_done', id => { S.f.b4_spareIn = id; S.f.b4_spareOut = null; b4Take(id); }) : b4SpareChoices('b4_spares_out', id => { S.f.b4_spareIn = id; })),
        {t:'Keep the squad as it is.', fx:()=>{ S.f.b4_mustered = 'kept'; save(); }, go:()=>b4SpareBack()}]}; },
  b4_spares_out:()=>{ const inn = S.f.b4_spareIn;
    return {sp:'Sergeant Radde', txt:`"${TPL[inn] ? NAME(inn) : 'That one'}," Radde says, and writes it. "And who goes back to the company?"`,
      ch:[...b4FillsIn().map(o => ({t:`${NAME(o)} goes back to the company.`, fx:()=>{ S.f.b4_spareOut = o; b4SwapNew(o, inn); }, go:'b4_spares_done'})),
        {t:'Not that one after all.', go:'b4_spares'}]}; },
  b4_spares_done:()=>{ const o = S.f.b4_spareOut, inn = S.f.b4_spareIn;
    return {sp:'The Third\'s fire', txt:`${o && TPL[o] ? `${NAME(o)} picks up ${b4She(o) ? 'her' : 'his'} kit and goes back to the company's fire. The Third makes nothing of it; it is the army.` : (o === null ? '' : 'The swap is made.')}${TPL[inn] ? `\n\n${B4_COMES[inn] || ''}` : ''}`,
      ch:[{t:'Another.', req:()=>b4SpareList().length > 0 && (b4FillsIn().length > 0 || b4Places() > 0), go:'b4_spares'},
        {t:'That will do. Back to the fire.', fx:()=>{ S.f.b4_mustered = 'fire'; save(); }, go:()=>b4SpareBack()}]}; },
});

/* ---- the words the three bring to Book Four's glossary ---- */
GLOSSX.hoc.push(
  [0, 'Denul', 'The warren of healing. A Denul healer reaches into it and puts what comes out into a wound. The Fourteenth has fewer healers than it has squads.', ()=>b4In('mirrel') || b4In('marrow')],
  [0, 'Serc', 'The Path of the Sky: the warren of the sky: wind, storm and lightning. Ordinary sorcery, and in the Whirlwind\'s sand it sputters like the rest.', ()=>b4In('yorin')],
  [0, 'Oponn', 'The Twins, the Jesters of Chance: the Lady pulls, the Lord pushes, and both keep count. Tallow\'s grandmother read their card for the boats.', ()=>b4In('tallow') || godMet('tallow')]);
