/*
  atgc-glitches.js: the background glitches (PRD section 6).
  Unlike the grid, this runs in the visitor's browser. Every 110ms ("a tick")
  it may start a new glitch: a short run of letters that flickers on top of
  the ATGC grid for a few ticks, then disappears.
  It never runs for visitors with "reduce motion" turned on.
*/

const layer = document.querySelector('.atgc-glitches');
const patches = JSON.parse(layer.dataset.patches); // the list from index.astro

const TICK_MS = 110; // how often the script wakes up
const LINE_PX = 20; // one grid row is 20px tall (line-height in global.css)

// The glitches currently on screen: { el, len, life }.
// "life" is how many more ticks it stays.
let glitches = [];
let timer = null; // the id of the running timer, or null when stopped

// A random whole number from min to max (both included).
const randInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

// A string of n random DNA letters.
const scramble = (n) => Array.from({ length: n }, () => 'ACGT'[randInt(0, 3)]).join('');

// How wide one grid cell is in px (a letter plus its letter spacing).
// We measure it with a single test letter, so glitches line up with the grid.
function cellWidth() {
  const probe = document.createElement('span');
  probe.textContent = 'A';
  layer.append(probe);
  const width = probe.getBoundingClientRect().width;
  probe.remove();
  return width;
}

// Start one new glitch at a random spot inside a random patch.
function spawn() {
  const streak = Math.random() < 0.3; // 30% are long grey streaks
  const len = streak ? randInt(24, 53) : randInt(3, 9);
  const life = streak ? 2 : randInt(2, 4);
  const shift = (Math.random() < 0.5 ? -1 : 1) * randInt(4, 13); // sideways nudge

  // Pick a patch and a point in its inner half, where it's most visible.
  // Patch values are percentages, so convert them to px of this window.
  const p = patches[randInt(0, patches.length - 1)];
  const x = ((p.x + (Math.random() - 0.5) * p.w) / 100) * window.innerWidth;
  const y = ((p.y + (Math.random() - 0.5) * p.h) / 100) * window.innerHeight;

  // Snap the point to the nearest grid cell above-left of it.
  const cell = cellWidth();
  const col = Math.max(0, Math.floor(x / cell));
  const row = Math.max(0, Math.floor(y / LINE_PX));

  const el = document.createElement('span');
  el.className = streak ? 'glitch streak' : 'glitch';
  el.textContent = scramble(len);
  el.style.left = `${col * cell}px`;
  el.style.top = `${row * LINE_PX}px`;
  el.style.transform = `translateX(${shift}px)`;
  layer.append(el);
  glitches.push({ el, len, life });
}

// One tick: age every glitch, remove finished ones, re-scramble the rest,
// then maybe start a new one (18% chance, at most 3 on screen).
function tick() {
  glitches = glitches.filter((g) => {
    g.life -= 1;
    if (g.life <= 0) {
      g.el.remove();
      return false; // drop it from the list
    }
    g.el.textContent = scramble(g.len);
    return true; // keep it
  });
  if (glitches.length < 3 && Math.random() < 0.18) spawn();
}

function start() {
  if (timer === null) timer = setInterval(tick, TICK_MS);
}

function stop() {
  clearInterval(timer);
  timer = null;
  glitches.forEach((g) => g.el.remove());
  glitches = [];
}

// matchMedia asks the browser about the visitor's settings, here whether
// "reduce motion" is on. With it on, the script never starts.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches) start();

// If the visitor changes the setting while the page is open, follow it.
reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : start()));
