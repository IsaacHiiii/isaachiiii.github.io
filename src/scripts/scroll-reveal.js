/*
  scroll-reveal.js: each section fades in and glides into place every time
  it scrolls onto the screen, and hides again once it has fully left
  (see "Scroll reveal" in global.css).
*/

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// With reduce motion on (or in a very old browser), do nothing:
// the sections are simply visible, as they are without this script.
if (!reduceMotion && 'IntersectionObserver' in window) {
  // This class switches on the hidden starting state in the CSS. Adding it
  // here, from the script, means nobody gets stuck with hidden sections if
  // the script never runs.
  document.documentElement.classList.add('reveal-ready');

  // An IntersectionObserver is a browser feature that tells us when an
  // element enters or leaves the screen, so we don't have to check on every
  // scroll. threshold [0, 0.15] means "tell us when the section is just
  // touching the screen, and when 15% of it is visible".
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const section = entry.target;
        if (entry.intersectionRatio >= 0.15) {
          // 15% or more on screen: glide in (starts the CSS transition).
          section.classList.add('is-visible');
        } else if (!entry.isIntersecting) {
          // Fully off screen: hide it again, ready to replay.
          section.classList.remove('is-visible');
          // Remember which side it left from. If it's above the screen, it
          // will come back from above when you scroll up, so it should slide
          // down into place instead of rising up.
          section.classList.toggle('from-above', entry.boundingClientRect.top < 0);
        }
      }
    },
    { threshold: [0, 0.15] }
  );

  // Watch every section below the hero, plus the contact card.
  document.querySelectorAll('.section, .contact').forEach((el) => observer.observe(el));
}
