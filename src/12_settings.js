/* ============ settings ============ */
/* From the Ranks keeps its own saved data ('from-the-ranks-*'). The two games share this site, so on the first run on a device every
   sergeant, setting and deed that Ashes of the Pale left here is copied across once, and nobody starts over. Ashes keeps its own copy. */
(function importAshes(){ try {
  const ls = localStorage, OLD = 'ashes-of-the-pale-', NEW = 'from-the-ranks-';
  if (ls.getItem(NEW + 'imported') != null || ls.getItem(NEW + 'roster')) return; // once per device, and never over a From the Ranks roster
  const keys = []; for (let i = 0; i < ls.length; i++) { const k = ls.key(i); if (k && k.startsWith(OLD) && k !== OLD + 'install') keys.push(k); }
  keys.forEach(k => { const v = ls.getItem(k); if (v != null) ls.setItem(NEW + k.slice(OLD.length), v); });
  ls.setItem(NEW + 'imported', String(keys.length));
} catch(e) {} })();
const SKEY = 'from-the-ranks-settings';
const SET = Object.assign({master:.8, music:.6, sfx:.8, amb:.6, shake:true, motion:'auto', fs:1, speed:1, dice:true, blood:true, map:'close', full:false, art:true},
  (() => { try { return JSON.parse(localStorage.getItem(SKEY)) || {}; } catch(e) { return {}; } })());
function saveSet(){ try { localStorage.setItem(SKEY, JSON.stringify(SET)); } catch(e) {} applySet(); }
function applySet(){
  document.documentElement.style.setProperty('--fs', SET.fs);
  document.body.classList.toggle('reduce', SET.motion === 'off');
  document.body.classList.toggle('auto-motion', SET.motion === 'auto');
  AUDIO.applyVolumes();
}
const REDUCE = () => SET.motion === 'off' || (SET.motion === 'auto' && matchMedia('(prefers-reduced-motion: reduce)').matches);

