/*
  cursor-reveal.js: tells the CSS where the mouse is, so the ATGC letters
  show in a soft circle around it (see "Cursor reveal" in global.css).
  This script only moves two numbers; the CSS mask does the drawing.
*/

// Only for a real mouse ("hover" and a "fine" pointer). Phones and tablets
// have no cursor to follow. And never with reduce motion turned on.
const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hasMouse && !reduceMotion) {
  // --mx and --my live on the background layer itself, not on <html>.
  // Changing a value on <html> makes the browser re-check the styles of
  // every element on the page; on .atgc it only re-checks the background.
  const root = document.querySelector('.atgc');
  let x = 0;
  let y = 0;
  let queued = false; // is an update already waiting for the next frame?

  // The mouse can fire many move events between two screen refreshes.
  // requestAnimationFrame runs our update once, just before the next refresh,
  // so we never do more work than the screen can show.
  function update() {
    root.style.setProperty('--mx', `${x}px`);
    root.style.setProperty('--my', `${y}px`);
    queued = false;
  }

  window.addEventListener('pointermove', (event) => {
    // clientX/clientY are the mouse position inside the window, which matches
    // the letter layers, since they're fixed to the window too.
    x = event.clientX;
    y = event.clientY;
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  });

  // When the mouse leaves the window, move the circle off screen again.
  document.addEventListener('mouseleave', () => {
    x = -1000;
    y = -1000;
    requestAnimationFrame(update);
  });
}
