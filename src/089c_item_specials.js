/* ============ the items pass (v8.1): trinket effects ============
   Small real effects for the trinkets that had none (the pitch-pot, the Tyrant's map, the green ash, the paybook page, the durhang
   pipe and the ferry rope worn) and for ten of the plain "+1 to a stat" trinkets whose lore asks for more. Each is a wrapper keyed
   on the item id, the way Books Two to Four do theirs, and each asks wears(unit or soldier id, item id) whether it is worn.
   The display half (33/19d/38c) owns wears(); until it lands this file carries a shim of the same name. The words for each effect
   go in that half's special-text table; the numbers are listed in docs/items-pass.md.
   Once a fight = B.used (it carries into a fight's second ground); once a chapter = S.f keyed by book and chapter.
   spawnshard stays what it is: Brack's joke. It does nothing, on purpose. */
const ixMine = u => !!(u && u.side === 'p' && !u.ally && TPL[u.id]);
const ixChKey = k => 'ix_' + k + '_' + BOOK + (S.chapter || 0);
const ixOnce = k => !!(B && B.used && B.used[k]);
const ixSpend = k => { if (B) (B.used ??= {})[k] = 1; };
/* the specials this file adds, by item id: what the special-text table should say (the display half may use or replace these) */
const IX_SPECIAL = {
  houndtooth:'+1 initiative.',
  lampchip:'Once a fight, the first blow it lands dazzles the target: −3 to hit through the round.',
  fetemask:'In the first round of a fight, enemies take −2 to hit whoever wears it.',
  tyrantmap:'+1 to Wits checks in the Gadrobi Hills (Book One, Chapter Five). Roughly right.',
  b2_dogtooth:'Once a fight, the first blow aimed at whoever wears it meets +2 armour.',
  b2_crowfeather:'Once a fight, the first attack it misses is rolled again.',
  b3_c3_stripe:'+2 damage while whoever wears it is below half health.',
  b4_c1_durhangpipe:'Worn: whoever wears it goes into a fight without the soreness of a "yes, but". Also, once a chapter at a fire, it can be passed round.',
  b4_c3_ferryrope:'Worn: +1 to hit with the first attack of each fight. Carried: once a chapter, +1 to a check.',
  b4_c5_conch:'+1 initiative.',
  b5_c2_shells:'Whoever wears it is never rattled on a check.',
  b5_c3_ash:'Once a chapter, the first time fire would burn whoever wears it, it does not.',
  b5_c4_pitchpot:'Once a fight: throw it, range 4. 1d6 to a 3×3, and the pitch burns there for 2 rounds.',
  b5_c4_wolftooth:'+1 damage against an enemy already wounded.',
  b5_c7_dock:'Once a chapter, a check whoever wears it fails is rolled again.',
  b5_c7_ledgerpage:'+1 to a check about debts, pay or the paybooks.'};

/* ---- in the hand: initiative (the Hound's tooth, the conch), the pitch-pot as an action ---- */
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ const u = _mkParty(id, x, y);
    if (wears(id, 'houndtooth')) u.init += 1; // the Hounds are faster than anything they hunt
    if (wears(id, 'b4_c5_conch')) u.init += 1; // listening harder: they hear it coming
    if (wears(id, 'b5_c4_pitchpot') && !u.ab.includes('ix_pitchpot')) u.ab.splice(Math.max(0, u.ab.length - 1), 0, 'ix_pitchpot');
    return u; }; }
Object.assign(AB, {
  ix_pitchpot:{name:'The brand-pot', boom:true, aoe:1, range:4, ok:u => !!(u && B && !ixOnce('ix_pot_' + u.id)),
    desc:()=>`Once a fight: throw the brand-pot from the west rampart, range 4. It bursts on the mark (1d6), and the pitch burns round it, a 3×3, for 2 rounds, the squad included.`,
    run(u, x, y){ ixSpend('ix_pot_' + u.id); const pt = scatter(u, x, y, 1, 1);
      throwArc(u, pt, () => { for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (!wall(pt.x + dx, pt.y + dy)) B.fires.push({x:pt.x + dx, y:pt.y + dy, until:B.round + 2, txt:'the burning pitch'});
        blast(pt, [[1,6,0]], '#ff7a2a'); AUDIO.play('burner'); sparks(pt.x, pt.y, 26, '#ff9a3a', .7); });
      blog(`${u.name} lights the rag in the brand-pot's neck off the nearest flame and throws it the way the old hand on the rampart said: high, so it comes down on them and not short.`); }},
});

/* ---- to hit: the Fete mask in the first round, the dog's tooth on the first blow, the ferry rope's first attack ---- */
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o);
    if (B && t && ixMine(t) && a && a.side === 'e') {
      if (B.round <= 1 && wears(t, 'fetemask')) c.ac += 2; // a face nobody can read, for as long as nobody has had time to
      if (t.ixGuard) c.ac += 2; }
    if (B && a && ixMine(a) && a.ixRope) c.bonus += 1;
    return c; }; }
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (!B || !a || !t) return _attack(a, t, o);
    /* the dog's tooth: the first blow aimed at its wearer each fight */
    const dog = a.side === 'e' && ixMine(t) && wears(t, 'b2_dogtooth') && !ixOnce('ix_dog_' + t.id);
    if (dog) { ixSpend('ix_dog_' + t.id); t.ixGuard = true; }
    const mine = ixMine(a);
    /* the ferry rope, worn: the first attack of each fight, steadied */
    const rope = mine && wears(a, 'b4_c3_ferryrope') && !ixOnce('ix_rope_' + a.id); if (rope) { ixSpend('ix_rope_' + a.id); a.ixRope = true; }
    /* damage riders: the stripe below half health, the wolf's tooth on the wounded */
    let o2 = o; const dd = o.dmg || a.dmg;
    if (mine && dd) { let add = 0;
      if (wears(a, 'b3_c3_stripe') && a.hp * 2 < a.maxhp) add += 2;
      if (wears(a, 'b5_c4_wolftooth') && t.side === 'e' && t.hp > 0 && t.hp < t.maxhp) add += 1;
      if (add) o2 = Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + add]}); }
    let r;
    try { r = _attack(a, t, o2); } finally { if (dog) t.ixGuard = false; if (rope) a.ixRope = false; }
    if (dog) { float(t, 'the dog\'s tooth', '#e8c073'); }
    /* the crow's feather: the first miss each fight, a second look */
    if (mine && r && !r.hit && t.hp > 0 && wears(a, 'b2_crowfeather') && !ixOnce('ix_crow_' + a.id)) { ixSpend('ix_crow_' + a.id);
      blog(`<em>A crow's feather.</em> ${a.name} looks again, the way the crows look, and strikes again.`); r = _attack(a, t, o2); }
    /* the lamp-chip: the first blow it lands each fight throws Darujhistan's blue light in their eyes */
    if (mine && r && r.hit && wears(a, 'lampchip') && !ixOnce('ix_lamp_' + a.id)) { ixSpend('ix_lamp_' + a.id);
      t.dazzleUntil = Math.max(t.dazzleUntil || 0, B.round); later(() => { if (t.hp > 0) float(t, 'dazzled', '#9fd0ff'); }, pace(220));
      blog(`The blue glass at ${a.name}'s throat catches the light, and ${t.name} gets it in the eyes.`); }
    return r; }; }

/* ---- fire: the green ash, once a chapter, the first time fire would burn its wearer ---- */
const ixLog = blog; // the ash's own line goes straight to the log, past the watcher below
const ixAshOk = u => ixMine(u) && wears(u, 'b5_c3_ash') && !S.f[ixChKey('ash')];
{ const _blog = blog;
  blog = function(m){ if (B && typeof m === 'string') { const f = /^(.+?) (?:is burning|is caught in |goes through )/.exec(m);
      if (f) { const u = B.units.find(v => v.name === f[1] && v.hp > 0); if (u && ixAshOk(u)) B.ixAshNext = u; } }
    return _blog(m); }; }
{ const _hurt = hurt;
  hurt = function(u, n, crit){ if (B && B.ixAshNext) { const w = B.ixAshNext; B.ixAshNext = null;
      if (w === u && ixAshOk(u)) { S.f[ixChKey('ash')] = 1; u.burnTurns = 0; float(u, 'the green ash', '#9ae0b8'); ixLog(`<em>The green ash.</em> The fire comes up round ${u.name} and does not take. Not this time.`); return; } }
    return _hurt(u, n, crit); }; }

/* ---- going in: the durhang pipe worn, and the soreness of a "yes, but" not felt ---- */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const dulled = [];
    if (!opt.carry && S && S.bruised) Object.keys(S.bruised).forEach(k => { if (S.bruised[k] > 0 && wears(k, 'b4_c1_durhangpipe')) { delete S.bruised[k]; dulled.push(k); } });
    const r = _startBattle(id, opt);
    if (B && dulled.length) dulled.forEach(k => { const u = B.units.find(v => v.id === k && ixMine(v)); if (u) blog(`${u.name} is still sore from the last close thing, and does not feel it. The pipe.`); });
    return r; }; }

/* ---- checks: the map in the hills, the paybook page on a debt, the shells against the rattle ---- */
const IX_DEBT = /debt|paybook|pay desk|the pay\b|ledger|owe|owed|fine\b|tab\b|docks|sums|clerk|interest/i;
{ const _ef = edgesFor;
  edgesFor = function(c, id){ let out = _ef(c, id);
    if (wears(id, 'b5_c2_shells') && S.rattled && S.rattled[id]) out = out.filter(e => e[0] !== 'rattled'); // slower to do the stupid thing, even shaken
    if (c && c.check && wears(id, 'tyrantmap') && BOOK === 'gotm' && (S.chapter || 0) === 5 && c.check[0] === 'wits') out.push(['the Tyrant\'s map, roughly right', 1]);
    if (c && c.check && wears(id, 'b5_c7_ledgerpage') && IX_DEBT.test(`${typeof c.t === 'string' ? c.t : ''} ${typeof c.tag === 'string' ? c.tag : ''}`)) out.push(['the Sixth\'s page from the paybook', 1]);
    return out; }; }
/* the holed dock: once a chapter, a failed check is rolled again (the Errant remembers who keeps one) */
{ const _ck = check;
  check = function(stat, dc, who, c){ const r = _ck(stat, dc, who, c);
    if (r && !r.pass && r.who && wears(r.who, 'b5_c7_dock') && !S.f[ixChKey('dock')]) { S.f[ixChKey('dock')] = 1;
      const r2 = rollAgain(r); note(`The holed dock turns over in ${NAME(r.who)}'s fingers. The Errant looks this way, once.`); return Object.assign(r2, {ixDock:true}); }
    return r; }; }
