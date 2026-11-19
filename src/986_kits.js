/* v13.51.0: the later books' recruits stop being a second shield beside the squad's own (David, Nov 18, 2026).
   Every thread already walks with one shield-and-bash heavy (Brisk, Haddat, Thegg). The recruits who doubled it get kits of their own:
   pulls, drives, a swap, a sweep, a broken guard, a bleeding cut, a howl, and two soldiers and a rope boy who strike twice.
   Forced movement uses the same rules as the sergeant's Shield Drive and Vell's hook (forcedMove, 031): every squadmate the enemy is
   moved out of reach of gets a free swing, the very heavy do not move, a leader braces about half the time. */
const kitCd = () => 2 - lvAt(6);
const kitHe = u => (u && u.id === 'tirren') ? 'she' : 'he', kitHis = u => (u && u.id === 'tirren') ? 'her' : 'his', kitHim = u => (u && u.id === 'tirren') ? 'her' : 'him';
/* drive t straight back from u, up to dist tiles: the Shield Drive's own road (a pit takes it, a wall or a body is +1d6) */
async function kitDrive(u, t, dist, from){
  const hold = pushHolds(t); if (hold) { blog(hold === 'heavy' ? `${t.name} takes it and doesn't give a step.` : `${t.name} braces behind the blow and holds.`); float(t, hold === 'heavy' ? 'too heavy' : 'braces', '#a99a88'); return; }
  const dx = Math.sign(t.x - u.x), dy = Math.sign(t.y - u.y); let to = {x:t.x, y:t.y}, slam = false;
  for (let i = 0; i < dist; i++) { const n = {x:to.x + dx, y:to.y + dy}; if (pitAt(n.x, n.y)) { to = n; break; } if (!free(n.x, n.y, t)) { slam = true; break; } to = n; }
  if (to.x === t.x && to.y === t.y) { const d = roll(1,6,0); blog(`${t.name} goes back into what's behind it, hard.`); hurt(t, d); updBattleUI(); return; }
  blog(`${u.name} drives ${t.name} back${slam ? ' into what is behind it' : ''}.`); float(t, 'driven back', '#e8c073'); AUDIO.play('sword');
  if (await forcedMove(t, to, 'driven')) return;
  if (slam && t.hp > 0) { const d = roll(1,6,0); blog(`${t.name} fetches up against it with a sound like a dropped sack.`); hurt(t, d); updBattleUI(); }
}
Object.assign(AB, {
  /* Brannoc, Falari marine: the boarding line is Vell's hook thrown from a ship's rail, and the leap is how a marine crosses to the other deck */
  boardline:{name:'Boarding line', desc:()=>`Throw the grapnel at an enemy 2 to ${grapR()} tiles off: 1d6+${1 + lvDmg()} on a hit, and it is hauled to the open tile beside Brannoc nearest it. Every squadmate it is hauled out of reach of gets a free swing. Hauled across a pit or a drop, it saves to catch the lip and go down prone, or goes in. The very heavy take the grapnel but don't come; a leader braces against it about half the time. Recharges after 3 rounds. Grows with level.`,
    ok:u=>!(u.cdHook >= B.round), tiles:u=>foes().filter(f => cheb(u,f) >= 2 && cheb(u,f) <= grapR() && canShoot(u,f)),
    async run(u,x,y){ const t = unitAt(x,y); if (!t) return; u.cdHook = B.round + 3; AUDIO.play('bow');
      const r = attack(u, t, {dmg:[1,6,1 + lvDmg()], verb:'throws the grapnel at'}); if (!r.hit) return;
      await wait(pace(300)); if (!B || t.hp <= 0) return;
      { const hold = pushHolds(t); if (hold) { blog(hold === 'heavy' ? `The grapnel bites into ${t.name}. ${t.name} doesn't come. ${u.name} pays out the line before it takes him over the side instead.` : `The grapnel bites into ${t.name}, who sets both feet and leans back against it. ${u.name} lets the line run.`); float(t, hold === 'heavy' ? 'too heavy' : 'braces', '#a99a88'); return; } }
      const at = DIRS.map(([dx, dy]) => ({x:u.x + dx, y:u.y + dy})).filter(p => free(p.x, p.y, t)).sort((a, b) => cheb(a, t) - cheb(b, t))[0];
      if (!at) { blog(`There's nowhere beside ${u.name} to haul ${t.name} to. The grapnel comes back with a piece of it.`); return; }
      blog(`${u.name} takes a turn of the line round his forearm and heaves, the way you bring another ship's rail to yours, and ${t.name} comes across the ground to him.`);
      sparks(t.x, t.y, 8, '#c26a3a', .4); AUDIO.play('step'); float(t, 'hauled in', '#c26a3a');
      if (await forcedMove(t, at, 'dragged')) return;
      t.facing = u.x >= t.x ? 1 : -1;
      if (has(u.id, 'snare')) { t.snareUntil = B.round + 1; float(t, 'fouled', '#c26a3a'); } }},
  boardleap:{name:'Boarding leap', free:true, desc:()=>`Once a turn, and it does not use his action: cross to any open tile within ${3 + lvT()} in sight. No free swings against him. Grows with level.`, ok:u=>u.swungTurn !== B.turn,
    tiles:u=>AB.ropeswing.tiles(u),
    run(u,x,y){ u.swungTurn = B.turn; AUDIO.play('step'); sparks(u.x, u.y, 8, '#c26a3a', .4); u.x = x; u.y = y; sparks(x, y, 8, '#c26a3a', .4); blog(`${u.name} goes across the gap the way he would go across to another deck: all at once, and already swinging.`); enterFire(u); updBattleUI(); }},
  /* Darrut, late of the Aren Guard: the sergeant's Shield Drive, learned on a gate */
  gatedrive:{name:'Gate drive', desc:()=>`An adjacent enemy: 1d6+${2 + lvDmg()} on a hit, and it is driven straight back ${shoveDist() > 1 ? `up to ${shoveDist()} tiles` : '1 tile'}. Every squadmate it is driven out of reach of gets a free swing. Into a wall or a body: +1d6 instead of the ground. Toward a pit, a roof's edge or the water: it saves to catch the lip and go down prone, or goes over. Then he may follow through into the tile it left: one step, no free swings. The very heavy don't move; a leader braces and holds about half the time. Recharges after ${kitCd()} round${kitCd() > 1 ? 's' : ''}. Grows with level.`,
    ok:u=>AB.shove.ok(u), tiles:u=>AB.shove.tiles(u), run(u,x,y){ return AB.shove.run(u,x,y); }},
  /* Ottar, Grey Helm of the Perish: the Wolves' howl, as the Grey Swords' acolyte has it (060) */
  wolfhowl:{name:'The Wolves\' Howl', self:true, desc:()=>`Enemies within 2 take −2 to hit until Ottar's next turn. Recharges after 3 rounds.`,
    ok:u=>!(u.cdHowl >= B.round),
    run(u){ u.cdHowl = B.round + 3; AUDIO.play('shadow'); const near = foes().filter(f => cheb(u, f) <= 2);
      near.forEach(f => { f.kitHowlUntil = B.round + 1; float(f, 'cowed', '#c8d4e0'); });
      blog(near.length ? `${u.name} puts his head back inside the wolf-browed helm and howls. The Perish do it in the line, a thousand at a time. One is enough: ${near.length > 1 ? 'the enemy near him flinch' : `${near[0].name} flinches`} from it.` : `${u.name} howls at nothing. Somewhere, a long way off, something howls back.`); }},
  /* Doss, farmhand: a threshing flail does not know how to hit one thing */
  sweep:{name:'Threshing sweep', desc:()=>`The flail goes round: 1d10+${3 + lvDmg()} at an adjacent enemy, and the same again at one other enemy beside Doss. No push. Recharges after ${kitCd()} round${kitCd() > 1 ? 's' : ''}.`,
    ok:u=>!(u.cdKit >= B.round), tiles:u=>foes().filter(f => cheb(u,f) === 1),
    run(u,x,y){ const t = unitAt(x,y); if (!t) return; u.cdKit = B.round + kitCd(); const d = [1,10,3 + lvDmg()];
      const os = foes().filter(f => f !== t && f.hp > 0 && cheb(u,f) === 1).sort((a, b) => a.hp - b.hp).slice(0, has(u.id, 'fullcircle') ? 8 : 1);
      attack(u, t, {dmg:d, verb:'brings the flail round into'});
      os.forEach((o, i) => later(() => { if (B && !B.over && u.hp > 0 && o.hp > 0) { attack(u, o, {dmg:d, verb:'lets the flail carry on into'}); updBattleUI(); } }, pace(300) * (i + 1))); }},
  /* Edrem, pilgrim guard: a long mace opens armour for everybody after him */
  breaker:{name:'Breaker', desc:()=>`The mace in both hands at an adjacent enemy: 1d10+${2 + lvDmg()} on a hit, and its armour is 2 worse against every blow through the next round. Recharges after ${kitCd()} round${kitCd() > 1 ? 's' : ''}.`,
    ok:u=>!(u.cdKit >= B.round), tiles:u=>foes().filter(f => cheb(u,f) === 1),
    run(u,x,y){ const t = unitAt(x,y); if (!t) return; u.cdKit = B.round + kitCd(); const r = attack(u, t, {dmg:[1,10,2 + lvDmg()], verb:'brings the mace down two-handed on'});
      if (r.hit && (t.hp - r.dmg > 0 || t.immortal)) { const sh = has(u.id, 'shatter'); t.kitBrokenUntil = B.round + (sh ? 2 : 1); t.kitBrokenBy = sh ? 3 : 2; later(() => { if (B && t.hp > 0) float(t, 'guard broken', '#e8c073'); }, pace(260)); blog(`Something in ${t.name}'s guard gives. It will not sit right again this side of the fight.`); } }},
  /* Brennet, carter: you do not stop a load, you turn it */
  turnload:{name:'Turn the load', desc:()=>`An adjacent enemy: 1d6+${2 + lvDmg()} on a hit, and Brennet swaps places with it. Every other squadmate it is turned out of reach of gets a free swing. The very heavy don't turn; a leader braces and holds about half the time. Recharges after ${kitCd()} round${kitCd() > 1 ? 's' : ''}.`,
    ok:u=>!(u.cdKit >= B.round), tiles:u=>foes().filter(f => cheb(u,f) === 1),
    async run(u,x,y){ const t = unitAt(x,y); if (!t) return; u.cdKit = B.round + kitCd(); if (!has(u.id, 'followthrough')) u.aooTurn = B.turn; // his own swing is spent on the turn (Follow Through keeps it)
      const r = attack(u, t, {dmg:[1,6,2 + lvDmg()], verb:'gets the wagon-pin behind'}); if (!r.hit) return;
      await wait(pace(250)); if (!B || t.hp <= 0 || u.hp <= 0) return;
      { const hold = pushHolds(t); if (hold) { blog(hold === 'heavy' ? `${t.name} is not a thing that turns.` : `${t.name} sets its feet and will not be turned.`); float(t, hold === 'heavy' ? 'too heavy' : 'braces', '#a99a88'); return; } }
      const mine = {x:u.x, y:u.y}, theirs = {x:t.x, y:t.y};
      blog(`${u.name} levers ${t.name} round the way he would turn a wagon in a narrow yard, and is standing where it stood.`); float(t, 'turned', '#e8c073'); AUDIO.play('step');
      if (await opportunity(t, mine, 'turned')) return; if (!B || t.hp <= 0) return;
      u.x = theirs.x; u.y = theirs.y; t.x = mine.x; t.y = mine.y; t.facing = u.x >= t.x ? 1 : -1; u.facing = t.x >= u.x ? 1 : -1; enterFire(t); if (B && u.hp > 0) enterFire(u); updBattleUI(); }},
  /* Pruss, heavy: the carter's maul, for when the weight has to go somewhere else */
  maul:{name:'The maul', desc:()=>`The carter's maul in both hands at an adjacent enemy: 1d10+${3 + lvDmg()} on a hit, and it is driven straight back up to 2 tiles. Every squadmate it is driven out of reach of gets a free swing. Into a wall or a body: +1d6. Toward a pit or a drop: it saves to catch the lip, or goes over. The very heavy don't move; a leader braces and holds about half the time. Recharges after 3 rounds.`,
    ok:u=>!(u.cdKit >= B.round), tiles:u=>foes().filter(f => cheb(u,f) === 1),
    async run(u,x,y){ const t = unitAt(x,y); if (!t) return; u.cdKit = B.round + 3; if (!has(u.id, 'followthrough')) u.aooTurn = B.turn;
      const r = attack(u, t, {dmg:[1,10,3 + lvDmg()], verb:'swings the maul into'}); if (!r.hit) return;
      await wait(pace(250)); if (!B || t.hp <= 0) return;
      await kitDrive(u, t, 2); }},
  /* Tirren, farrier: the hammer to make it lift the foot, the hoof-knife for what the foot was covering */
  hoofknife:{name:'Hoof-knife', desc:()=>`The hammer, then the knife into what it opened: 1d6+${2 + lvDmg()} at an adjacent enemy on a hit, and it bleeds for three rounds (1d4 a round). Recharges after ${kitCd()} round${kitCd() > 1 ? 's' : ''}.`,
    ok:u=>!(u.cdKit >= B.round), tiles:u=>foes().filter(f => cheb(u,f) === 1),
    run(u,x,y){ const t = unitAt(x,y); if (!t) return; u.cdKit = B.round + kitCd(); const r = attack(u, t, {dmg:[1,6,2 + lvDmg()], verb:'puts the hammer and then the hoof-knife into'});
      if (r.hit && (t.hp - r.dmg > 0 || t.immortal)) { t.bleed = has(u.id, 'deepcut') ? 5 : 3; later(() => { if (B && t.hp > 0) float(t, 'bleeding', '#e0574a'); }, pace(260));
        if (has(u.id, 'snare')) { t.snareUntil = B.round + 1; later(() => { if (B && t.hp > 0) float(t, 'held', '#b0a0c8'); }, pace(520)); } } }}
});
/* the howl's fear and the mace's broken guard, in the to-hit sum */
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (!B || !a || !t) return c;
    if (a.side !== 'p' && a.kitHowlUntil >= B.round) c.bonus -= 2;
    if (t.side !== 'p' && t.kitBrokenUntil >= B.round) c.ac -= t.kitBrokenBy || 2;
    return c; }; }
{ const _squadTurnStart = squadTurnStart;
  squadTurnStart = function(u){ const r = _squadTurnStart(u); if (B && u && u.id === 'ottar') B.units.forEach(e => { if (e.kitHowlUntil != null) e.kitHowlUntil = -1; }); return r; }; }
/* the level-12 talent reads its role from the kit (015 t2Role). The reworked heavies keep the Anvil they were offered when they carried the bash, so no save loses a pick. */
const KIT_ANVIL = ['darrut', 'ottar'];
/* v13.52.0 (David, Nov 19, 2026): the level-12 talent written for each new kit, and for the three whose gift is their kit. A soldier who already took Anvil keeps it and is not asked again (015 t2Owed). */
const KIT_T2 = {brannoc:'flurry', brask:'flurry', doss:'fullcircle', edrem:'shatter', brennet:'followthrough', pruss:'followthrough', tirren:'deepcut', warlock:'twiceblessed', tallow:'twiceblessed', hessa:'twiceblessed'};
/* Twice Blessed: the gift's own count, then one more */
[['b4_twins', 'tallow'], ['b2_bargain', 'warlock'], ['b4_wormgift', 'hessa']].forEach(([k, who]) => { const a = AB[k]; if (!a) return; const ok0 = a.ok, run0 = a.run;
  a.ok = function(u){ return ok0.call(this, u) || !!(B && S && has(who, 'twiceblessed') && !B.used['tb_' + k]); };
  a.run = function(u, x, y){ if (!ok0.call(this, u)) B.used['tb_' + k] = 1; return run0.call(this, u, x, y); }; });
