/*
  intro-snap.js: never leaves you stuck halfway through the opening fade.
  When you stop scrolling partway through it, the page glides on to "A bit
  about me" (if you were scrolling down) or back to the top (if you were
  scrolling up). Anywhere else on the page it does nothing.
*/

const main = document.querySelector('.main');
const nav = document.querySelector('.nav');
const about = document.querySelector('.main .section'); // "A bit about me"

if (main && nav && about) {
  const GLIDE_MS = 1200; // how long a glide takes: bigger = slower
  let rest = window.scrollY; // where the page last came to rest
  let gliding = false; // is a glide running right now?
  let stopGlide = () => {};

  // An S-shaped speed curve: starts gently, speeds up, then slows to a soft stop.
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Scrolls the page to `target` over GLIDE_MS, one small step per frame.
  // We do this ourselves because the browser's built-in smooth scroll is
  // fast and its speed can't be changed.
  function glide(target) {
    const start = window.scrollY;
    const startTime = performance.now();
    gliding = true;

    // If you scroll, touch or press a key during the glide, stop and hand
    // control straight back to you.
    const cancel = () => stopGlide();
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
    stopGlide = () => {
      gliding = false;
      events.forEach((e) => window.removeEventListener(e, cancel));
    };
    events.forEach((e) => window.addEventListener(e, cancel, { passive: true }));

    function step(now) {
      if (!gliding) return;
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

  function settle() {
    if (gliding) return; // our own glide also fires scroll events: ignore them
    // Only while the opening scene is on. Its CSS makes the nav "fixed";
    // with reduce motion on, or in older browsers, it isn't, and we stop here.
    if (getComputedStyle(nav).position !== 'fixed') return;

    // Where the fade ends: 30% of a screen before the page content starts.
    const end = main.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3;
    const y = window.scrollY;

    if (y > 1 && y < end - 1) {
      // Partway through: finish the move you started. Scrolling down
      // carries on to "A bit about me", scrolling up goes back to the top.
      // (A "go back if you only moved a little" rule fought slow trackpad
      // scrolling, which pauses often, so it always follows your direction.)
      // Going down, it stops with the "A bit about me" heading 22% of the
      // way down the screen: room to breathe below the nav, card in view.
      const aboutSpot = pageTop(about) - window.innerHeight * 0.22;
      const target = y > rest ? Math.max(end, aboutSpot) : 0;
      rest = target;
      glide(target);
    } else {
      rest = y;
    }
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
