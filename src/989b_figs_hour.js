/* v13.50.0 (David, Nov 18, 2026).
   (1) Two figures of their own. Book Seven's mill-woman was drawn as Book Eight's Old Benna and Book Ten's Malazan clerk as the
       Letherii company clerk (both borrowed in the terrain pass, v13.24 and v13.27; overnight-review.md §3).
   (2) The hour on the map. A walk-around area whose sub line says dusk, evening, dawn, first light or before dawn was drawn in the
       same flat light as noon (series-picture-pass.md: "the same engine fault" in every book). hourOf(a) reads the hour from
       a.hour if an area sets one, else from its sub line; hourTint lays the light over the ground before the fires and the
       figures, so fires and lanterns still glow through it (tkFrame, 25b, burns them brighter at these hours). Areas already
       dark (a.dark) or on a decor that carries its own hour (…_night, …_dusk) are left as they were. Looks only. */
Object.assign(FIGX, {
  b7_c5_miller(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, .96); // broad, not tall
    B2F.robe(ctx, h, '#5c5348', '#2c2620', 6.6, 8); // a grey-brown wool skirt and bodice
    poly(ctx, [[-4.6,-3],[4.6,-3],[5.6,11.4],[-5.6,11.4]], '#d8d2c2'); ctx.fillStyle = 'rgba(120,110,90,.35)'; ctx.fillRect(-4.6, -3, 9.2, .9); // the apron, its band
    ctx.fillStyle = 'rgba(255,255,250,.5)'; ctx.fillRect(-3.4, 2, 2.2, 3); ctx.fillRect(1.2, 5.4, 2.6, 2.2); // flour on the apron
    ctx.fillStyle = '#6a5c4c'; ctx.fillRect(-8, -5.4, 2.4, 3); ctx.fillRect(5.6, -5.4, 2.4, 3); // sleeves rolled above the elbow
    ctx.fillStyle = '#e4ddd0'; ctx.fillRect(-8, -2.4, 2.2, 5.4); ctx.fillRect(5.8, -2.4, 2.2, 5.4); // forearms floury to the elbow
    ctx.fillStyle = '#9a7258'; ctx.fillRect(-1.8, -8.4, 3.6, 3.4); poly(ctx, [[-4.8,-6.6],[4.8,-6.6],[3.4,-4.6],[-3.4,-4.6]], '#4a4238'); // her neck, and the bodice's neckline up to it (v13.50.1: the head sat clear of the body)
    h.head('#b88e72', 4.2, -10.4); h.look('rgba(26,16,10,.85)', -10.6);
    B2F.cap(ctx, '#8a3a2c', 4.7, -11.8, .98, 2.02); // a madder-red kerchief over the hair
    ctx.fillStyle = '#3a2a1e'; ctx.fillRect(-4.1, -11, 1, 2.2); // dark hair escaping at the temple
    ctx.restore(); },
  b10_c1_clerk(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1);
    h.legs('#3a3228'); h.torso('#6e6a62', '#2c2a26', 6); ctx.fillStyle = '#4a3a28'; ctx.fillRect(-6, 3.4, 12, 1.2); // the Fourteenth's faded grey, a belt
    B2F.line(ctx, '#4a3a28', 1, [[-5.4, -6], [4.6, 3]]); ctx.fillStyle = '#5a4a36'; ctx.fillRect(3.4, 1.8, 3.6, 4.4); // a satchel on its strap
    poly(ctx, [[-6.4,-3.4],[1.6,-4],[2,3.4],[-6,4]], '#22262a'); B2F.line(ctx, '#8a7a5a', .7, [[-6.4,-3.4],[1.6,-4],[2,3.4],[-6,4],[-6.4,-3.4]]); // the slate in its wooden frame
    B2F.line(ctx, 'rgba(235,235,225,.75)', .5, [[-5.2, -1.8], [.6, -2.2]]); B2F.line(ctx, 'rgba(235,235,225,.6)', .5, [[-5, .2], [-.6, -.1]]); B2F.line(ctx, 'rgba(235,235,225,.5)', .5, [[-4.9, 2.1], [.4, 1.8]]); // chalked tallies
    ctx.fillStyle = '#a88468'; ctx.fillRect(-7.6, -1, 2, 3); ctx.fillRect(1.6, -2.4, 2.2, 2.4); ctx.fillStyle = '#eeeade'; ctx.fillRect(2.4, -3.6, .8, 1.6); // hands; the chalk
    ctx.fillStyle = '#8c6c54'; ctx.fillRect(-1.8, -8.4, 3.6, 3.4); poly(ctx, [[-4.4,-6.8],[4.4,-6.8],[3.2,-5],[-3.2,-5]], '#55524c'); // his neck, and the tabard's collar up to it
    h.head('#a88468', 3.9, -10.6); h.look('rgba(24,14,10,.8)', -10.8); B2F.cap(ctx, '#2a2420', 4.2, -11.6, 1.02, 1.98); // cropped dark hair, no helm
    ctx.restore(); },
});
const HOUR_NOT = /at dusk|by dusk|until dusk|before dusk|till dusk|by dawn|until dawn|at dawn/i;
function hourOf(a){ if (!a) return ''; if (a.hour != null) return a.hour;
  if (a.dark || /night|dusk/.test(a.decor || '')) return '';
  let s = ''; try { s = String(typeof a.sub === 'function' ? a.sub() : a.sub || ''); } catch (e) {}
  if (!s || HOUR_NOT.test(s)) return '';
  if (/before dawn|before first light/i.test(s)) return 'predawn';
  if (/dusk (into|going to) night|last light/i.test(s)) return 'duskdeep';
  if (/\b(dusk|sundown|sunset|evening)\b/i.test(s)) return 'dusk';
  if (/\b(dawn|first light|grey light)\b/i.test(s)) return 'dawn';
  return ''; }
function hourTint(ctx, w, hgt, a){ const hr = hourOf(a); if (!hr) return;
  const fill = c => { ctx.fillStyle = c; ctx.fillRect(0, 0, w, hgt); };
  if (hr === 'dusk') { fill('rgba(12,10,30,.16)'); fill('rgba(210,110,50,.10)'); }
  else if (hr === 'duskdeep') { fill('rgba(10,10,32,.30)'); fill('rgba(190,90,50,.07)'); }
  else if (hr === 'predawn') { fill('rgba(8,12,36,.36)'); }
  else if (hr === 'dawn') { fill('rgba(30,40,70,.12)'); fill('rgba(170,180,200,.07)'); } }
