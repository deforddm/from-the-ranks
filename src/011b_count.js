/* v13.69.0: counting players (David, Tue Nov 24, 2026, 11:23 PM PST: "is our counter working to show installs etc"; 11:26 PM: "yes let's do both").
   Two counters. Neither sets a cookie or keeps anything about the player; both run only at the game's real addresses, never in a
   test browser (navigator.webdriver), and send nothing offline.
   - Cloudflare Web Analytics (playfromtheranks.com only): the beacon is loaded by the page itself. The zone's automatic setup never
     reached the game, because a launch is answered from the service worker's cache and Cloudflare's edge never sees the page.
   - GoatCounter (fromtheranks.goatcounter.com): a hit for each launch, split by how the game was opened (/launch/app for the
     installed app, /launch/browser for a tab); an event when it is installed (/installed: Chrome's appinstalled, or the first launch
     as an app on a device, which is how an iPhone's Add to Home Screen shows); an event for each chapter started
     (/book/<key>/ch<n>) and each finale reached (/book/<key>/finale). The old github.io address counts under /old/....
   One device stops counting when the game is opened once with ?nocount=1 (David's own plays); ?nocount=0 turns it back on. */
const COUNT = { gc:'https://fromtheranks.goatcounter.com/count', cf:'f8ac4028f56848d8b7bb6f47d2d3099a', off:'from-the-ranks-nocount', app:'from-the-ranks-counted-app' };
const countHost = (() => { try { return location.hostname.replace(/^www\./, ''); } catch(e) { return ''; } })();
const countOn = (() => { try {
  const q = /[?&]nocount=([01])\b/.exec(location.search);
  if (q) { if (q[1] === '1') localStorage.setItem(COUNT.off, '1'); else localStorage.removeItem(COUNT.off); }
  if (localStorage.getItem(COUNT.off) === '1' || navigator.webdriver) return false;
  return countHost === 'playfromtheranks.com' || countHost === 'deforddm.github.io';
} catch(e) { return false; } })();
function ftrCount(path, title, ev){
  if (!countOn) return;
  try {
    const p = (countHost === 'deforddm.github.io' ? '/old' : '') + path;
    const u = COUNT.gc + '?p=' + encodeURIComponent(p) + '&t=' + encodeURIComponent(title || path) + (ev ? '&e=true' : '')
      + '&s=' + encodeURIComponent((screen.width || 0) + ',' + (screen.height || 0) + ',' + (window.devicePixelRatio || 1)) + '&rnd=' + Date.now().toString(36);
    if (navigator.sendBeacon && navigator.sendBeacon(u)) return;
    fetch(u, {mode:'no-cors', keepalive:true, credentials:'omit'}).catch(() => {});
  } catch(e) {}
}
const countAsApp = () => { try { return window.matchMedia('(display-mode: standalone), (display-mode: window-controls-overlay), (display-mode: minimal-ui)').matches || navigator.standalone === true; } catch(e) { return false; } };
const countInstalled = how => { try { if (localStorage.getItem(COUNT.app)) return; localStorage.setItem(COUNT.app, how); } catch(e) {} ftrCount('/installed', 'Installed (' + how + ')', true); };
if (countOn) {
  window.addEventListener('load', () => {
    if (countHost === 'playfromtheranks.com') { try { const s = document.createElement('script'); s.defer = true; s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      s.setAttribute('data-cf-beacon', JSON.stringify({token: COUNT.cf})); document.head.appendChild(s); } catch(e) {} }
    const app = countAsApp();
    ftrCount(app ? '/launch/app' : '/launch/browser', app ? 'Launch: installed app' : 'Launch: browser');
    if (app) countInstalled('first launch as an app');
  });
  window.addEventListener('appinstalled', () => countInstalled('install prompt'));
}
const countBook = () => { try { return (S && S.book) || 'gotm'; } catch(e) { return 'gotm'; } };
