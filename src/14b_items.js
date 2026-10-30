/* ============ v8.1 items: one stat line for every piece, everywhere; two trinket slots ============
   Every place that shows a piece of gear (the squad sheet's Kit and Arms, the item view, the Pack, the traders and shops, the
   "Found" toast) builds its numbers with itemStatLine(g, who), in one order and one set of words:
     Weapon · 1d10+2 damage · +1 hit · reach 2 · armour −1        Armour · armour +2 · health +3 · heavy (hot at noon)
     Trinket · Wits +1 · +1 move · Once a fight: …
   "range" is a bow's or a sling's reach in tiles (it.rng on a ranged piece); "reach" is a spear's or a halberd's (it.reach: it strikes
   from that many tiles). A weapon with its own damage (it.dmg) shows it; one without says the wearer's own damage, or, for a soldier,
   their dice. Shown for a soldier, a weapon's damage says what they hit for now if it differs: "1d10+2 damage (now 1d8+2)".
   A piece's special (what code does for it, by id) is it.special if the item has one, else ITEM_SPECIAL below.
   Slots: GEAR_SLOTS. A trinket can go in either of two (the trinket and trinket2 keys of S.gear[id]); the same piece is never worn twice.
   Code that asks "does X wear Y" goes through wears(id, g); "who wears Y" wornBy(g); "take Y off whoever" unwear(g). Never read
   a trinket key of a soldier's gear directly (the lint fails on it). */
const GEAR_SLOTS = {weapon:['weapon'], armour:['armour'], trinket:['trinket', 'trinket2']};
const SLOT_WORD = {weapon:'Weapon', armour:'Armour', trinket:'Trinket'};
const slotKeys = g => (ITEMS[g] && GEAR_SLOTS[ITEMS[g].slot]) || [];
const wears = (u, g) => { const id = typeof u === 'string' ? u : u && !u.ally && u.side !== 'e' ? u.id : null; // a soldier id, or a unit in a fight
  return !!(id && typeof S !== 'undefined' && S && S.gear && S.gear[id] && Object.values(S.gear[id]).includes(g)); };
const wornBy = g => ((S && S.squad) || []).find(w => wears(w, g)) || null;
const wornSlot = (id, g) => { const gg = (S && S.gear && S.gear[id]) || {}; return Object.keys(gg).find(k => gg[k] === g) || null; };
const freeSlot = (id, g) => { const gg = (S && S.gear && S.gear[id]) || {}; return slotKeys(g).find(k => !gg[k]) || null; };
/* take a piece off everyone, the parked included */
function unwear(g){ if (!S) return; [S.gear, S.parked].forEach(G => Object.values(G || {}).forEach(gg => Object.keys(gg || {}).forEach(k => { if (gg[k] === g) delete gg[k]; }))); }
/* the dice, as the game writes them */
const diceW = d => d ? `${d[0]}d${d[1]}${d[2] > 0 ? '+' + d[2] : d[2] < 0 ? '−' + (-d[2]) : ''}` : '';
const sgnW = n => (n < 0 ? '−' : '+') + Math.abs(n);
/* what a soldier's weapon hits for, before levels and Edge: the worn weapon's own damage, or their own */
function baseDmg(id){ const t = TPL[id]; if (!t) return null; const w = S && S.gear && S.gear[id] && S.gear[id].weapon, it = w && ITEMS[w]; return (it && it.dmg) || t.dmg; }
/* the specials: what the game does for a piece, by id, in one short true line. Kept here, not on the chapters' item blocks; an item's own
   it.special wins. "Carried" pieces work from the pack; the rest work worn. (Book Two's traders used to keep their own words, B2_SPECIAL.) */
const ITEM_SPECIAL = {
  /* Book One */
  hoodrep:'Once a chapter: a blow that would drop its wearer leaves them standing at 1 health',
  heater:'+1 to lock shields on the Line, in Chapter One',
  houndtooth:'+1 reading where the Hounds went, in Chapter Two',
  clawknife:'In the sergeant\'s hand: +1 on one hard check in Chapter Two',
  roadleather:'+1 talking past the pikemen in the Chapter Three streets',
  otatglove:'On the sergeant: +1 holding on against the pull, in Chapter Five',
  clawpen:'Carried: +2 on one check with the clerk, in Chapter Seven',
  /* Book Two */
  b2_fetish:'Once a chapter: a spell the fouled warren would spoil comes out clean',
  b2_robe:'No heat in a noon fight, mail or no mail',
  b2_plank:'Once a fight, when its wearer is hit: 3 damage back to whoever struck',
  b2_coldknife:'A blow it lands up close slows the enemy on its next turn',
  b2_tskin:'Once a chapter: a rest costs no water',
  /* Book Three */
  b3_c1_charm:'Worn by anyone: a rest lowers the dread by 1 more',
  b3_c2_bundle:'+1 hit while the squad is haunted (shaken: the first two rounds)',
  b3_c4_ropehooks:'The Wolves\' Rope reaches 1 further for its wearer',
  b3_c4_flint:'+3 damage against K\'ell Hunters',
  b3_c5_knife:'+2 damage against Seerdomin and K\'ell Hunters',
  b3_c5_skin:'Carried: a rest lowers the dread by 1 more',
  b3_c6_feather:'Worn by anyone: the squad is never taken by surprise',
  b3_c7_greymail:'The first blow on its wearer in a fight lands 2 lighter',
  /* Book Four */
  b4_c1_finger:'Its wearer starts a fight steady (+2 to the first blow) while the company\'s nerve is 5 or more',
  b4_c1_redsash:() => `On ${TPL.redblade ? TPL.redblade.name : 'Ramin'}: +1 hit`,
  b4_c2_milestone:'The first blow its wearer lands in a fight does +1 damage',
  b4_c4_lampball:'Once a book: thrown, range 4, it bursts and the ground burns for 3 rounds. Then it is gone',
  b4_c4_salve:'The first healing its wearer takes in a fight heals 2 more',
  b4_c5_seaglass:'In the dust: its wearer\'s first shot reaches 1 further',
  b4_c5_veil:'In the dust: its wearer loses half as much range, and sorcery sputters half as much',
  b4_c6_dogslayer:'+1 hit against the Dogslayers',
  b4_c6_pickethorn:'Once a book: blow it, and two regulars of the 9th join the fight',
  b4_c7_tear:'The first hit its wearer lands in a fight does 2 more',
};
/* who a special is for, when it only works on one soldier (Allocate weighs it for them alone) */
const ITEM_SPECIAL_WHO = {b4_c1_redsash:'redblade', otatglove:'sgt', clawknife:'sgt'};
function itemSpecial(g){ const it = ITEMS[g]; if (!it) return ''; const s = it.special != null ? it.special : [ITEM_SPECIAL[g], typeof IX_SPECIAL !== 'undefined' ? IX_SPECIAL[g] : null].map(t => typeof t === 'function' ? t() : t).filter(Boolean).map(t => String(t).replace(/\.$/, '')).join('; '); return (typeof s === 'function' ? s() : s) || ''; }
/* a special that works from the pack, not on the wearer */
const specialCarried = g => /^Carried:/.test(itemSpecial(g));
/* the line. who: a soldier's id, to show their damage and what they hit for now */
function itemStatLine(g, who){ const it = ITEMS[g]; if (!it) return ''; const p = [SLOT_WORD[it.slot] || 'Gear'], t = who && TPL[who] ? TPL[who] : null;
  if (it.slot === 'weapon') {
    const mine = it.dmg || (t && t.dmg), now = t ? (wears(who, g) ? mine : baseDmg(who)) : null;
    p.push(mine ? `${diceW(mine)} damage${now && diceW(now) !== diceW(mine) ? ` (now ${diceW(now)})` : ''}` : 'the wearer\'s own damage'); }
  else if (it.dmg) p.push(`${diceW(it.dmg)} damage`);
  if (it.atk) p.push(`${sgnW(it.atk)} hit`);
  if (it.reach) p.push(`reach ${1 + (it.rng || 0)}`); else if (it.rng) p.push(`range ${sgnW(it.rng)}`);
  if (it.ac) p.push(`armour ${sgnW(it.ac)}`);
  if (it.hp) p.push(`health ${sgnW(it.hp)}`);
  if (it.mv) p.push(`${sgnW(it.mv)} move`);
  if (it.stat) ['might', 'wits', 'guile'].forEach(k => { if (it.stat[k]) p.push(`${STATN[k]} ${sgnW(it.stat[k])}`); });
  if (it.heavy) p.push('heavy (hot at noon)');
  const sp = itemSpecial(g); if (sp) p.push(sp);
  if (p.length === 1) p.push('a keepsake, nothing more');
  return p.join(' · '); }
/* the short form for a toast: the slot and the main number */
function itemStatShort(g){ const it = ITEMS[g]; if (!it) return ''; const sp = itemSpecial(g), l = itemStatLine(g).split(' · ').slice(1).filter(x => x !== sp && !/^a keepsake/.test(x));
  return [SLOT_WORD[it.slot], ...l.slice(0, 2), ...(!l.length && sp ? ['something more: look at it in the Pack'] : [])].join(' · '); }
/* who wears it, in words, for the Pack and the item view */
function wornWords(g){ const w = wornBy(g); return w ? `worn by ${w === 'sgt' ? 'you' : NAME(w)}` : 'in the pack'; }
/* the Pack's kit: every piece carried, by slot, with its line and who wears it; a tap opens the item view */
function packKitHTML(){ const kit = [...new Set((S && S.kit) || [])].filter(g => ITEMS[g]); if (!kit.length) return '';
  return `<h4 class="jh">Kit</h4><div class="packkit">${['weapon', 'armour', 'trinket'].map(sl => { const these = kit.filter(g => ITEMS[g].slot === sl); if (!these.length) return '';
    return `<h5>${SLOT_WORD[sl]}s</h5>${these.map(g => { const it = ITEMS[g], tap = ARTON() && ART['item/' + g];
      return `<${tap ? `button type="button" data-iz="item/${g}" aria-label="Look at ${esc(it.name)}"` : 'div'} class="pkit">${art('item/' + g, 'ico item')}<span class="pkt"><b>${esc(it.name)}</b><span class="stat">${esc(itemStatLine(g))}</span><small class="${wornBy(g) ? 'worn' : ''}">${esc(wornWords(g)[0].toUpperCase() + wornWords(g).slice(1))}</small></span></${tap ? 'button' : 'div'}>`; }).join('')}`; }).join('')}</div>`; }
