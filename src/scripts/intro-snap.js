/*
  intro-snap.js: never leaves you stuck halfway through the opening fade.
  When you stop scrolling partway through it, the page glides on in the
  direction you were scrolling: down to "A bit about me", or back up to the
  top. Anywhere else on the page it does nothing.
*/

const main = document.querySelector('.main');
const nav = document.querySelector('.nav');
const about = document.querySelector('.main .section'); // "A bit about me"

if (main && nav && about) {
  const GLIDE_MS = 1200; // how long a glide takes: bigger = slower

  let gliding = false; // is a glide running right now?
  // Each glide gets its own ticket number, and only the newest ticket may
  // move the page. Without this, an interrupted glide could keep running
  // next to a new one, and the two would pull the page in opposite ways.
  let ticket = 0;

  // Which way YOU last scrolled: 1 = down, -1 = up, 0 = not yet known.
  // Only movement right after your own input counts (not the glide's).
  let direction = 0;
  let lastInput = 0; // when you last used the wheel, trackpad, touch or keys
  let lastY = window.scrollY;

  function stopGlide() {
    gliding = false;
    ticket++; // any glide still running sees its ticket is old and stops
  }

  // Your input: remember when it happened, and if a glide is running,
  // stop it and hand control straight back to you.
  ['wheel', 'touchstart', 'touchmove', 'keydown', 'pointerdown'].forEach((type) => {
    window.addEventListener(
      type,
      () => {
        lastInput = performance.now();
        if (gliding) stopGlide();
      },
      { passive: true }
    );
  });

  // Every scroll: if it follows your input (within 0.4s, which also covers
  // a phone's momentum after you lift your finger), note its direction.
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (performance.now() - lastInput < 400 && Math.abs(y - lastY) > 0.5) {
        direction = Math.sign(y - lastY);
      }
      lastY = y;
    },
    { passive: true }
  );

  // An S-shaped speed curve: starts gently, speeds up, then slows to a soft stop.
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Scrolls the page to `target` over GLIDE_MS, one small step per frame.
  // We do this ourselves because the browser's built-in smooth scroll is
  // fast and its speed can't be changed.
  function glide(target) {
    stopGlide(); // never two glides at once
    const myTicket = ticket;
    const start = window.scrollY;
    const startTime = performance.now();
    gliding = true;

    function step(now) {
      if (myTicket !== ticket) return; // a newer glide or your input took over
      const t = Math.min(1, (now - startTime) / GLIDE_MS);
      // "instant": move exactly here this frame. (The page's smooth-scroll
      // setting would otherwise animate every little step.)
      window.scrollTo({ top: start + (target - start) * easeInOut(t), behavior: 'instant' });
      if (t < 1) requestAnimationFrame(step);
      else stopGlide();
    }
    requestAnimationFrame(step);
  }

  // Where an element's top is on the page, ignoring any slide-in animation
  // that's shifting it right now (scroll-reveal moves sections by 32px).
  function pageTop(el) {
    const shift = new DOMMatrix(getComputedStyle(el).transform).m42; // its current vertical shift
    return el.getBoundingClientRect().top - shift + window.scrollY;
  }

  // Runs whenever scrolling comes to a stop.
  function settle() {
    if (gliding) return; // our own glide also fires scroll events: ignore them
    // Only while the opening scene is on. Its CSS makes the nav "fixed";
    // with reduce motion on, or in older browsers, it isn't, and we stop here.
    if (getComputedStyle(nav).position !== 'fixed') return;

    // Where the fade ends: 30% of a screen before the page content starts.
    const end = main.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3;
    const y = window.scrollY;
    if (y <= 1 || y >= end - 1) return; // not partway through: leave it be

    // Going down, stop with the "A bit about me" heading 22% of the way
    // down the screen: room to breathe below the nav, card in view.
    const down = Math.max(end, pageTop(about) - window.innerHeight * 0.22);
    // Carry on the way you were scrolling. If that's unknown (e.g. you
    // tapped during a glide), go to whichever end is nearer.
    const target = direction > 0 ? down : direction < 0 ? 0 : y < end / 2 ? 0 : down;
    direction = 0;
    glide(target);
  }

  // "scrollend" fires once scrolling has fully stopped (after a phone's
  // momentum too). Older browsers don't have it, so there we wait until no
  // scroll event has come for 150ms instead.
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', settle);
  } else {
    let timer;
    window.addEventListener(
      'scroll',
      () => {
        clearTimeout(timer);
        timer = setTimeout(settle, 150);
      },
      { passive: true }
    );
  }
}
