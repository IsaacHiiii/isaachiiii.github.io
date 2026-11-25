/*
  helix.js: draws a 3D DNA double helix of A/C/G/T letters on the hero's
  <canvas>, and runs the scroll "journey":
    - the helix turns slowly and tilts towards the mouse
    - a click sends a pulse of light along the strands
    - scrolling through the pinned hero fades the title, untwists the helix
      into a flat ladder, then scatters its letters into the background
  With reduce motion on, it draws one still helix and does nothing else.
*/

const journey = document.querySelector('.journey');
const pin = document.querySelector('.journey-pin');
const canvas = document.querySelector('.helix');

if (journey && pin && canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d'); // the canvas's 2D drawing tools
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PARTNER = { A: 'T', T: 'A', C: 'G', G: 'C' }; // base pairing rules

  // ----- Small helpers -----
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  // 0 before `from`, 1 after `to`, and a smooth S-curve in between.
  const phase = (from, to, v) => {
    const t = clamp((v - from) / (to - from), 0, 1);
    return t * t * (3 - 2 * t);
  };
  // How much of the way to move towards a target this frame, so movement
  // eases in smoothly instead of jumping. Bigger `ms` = slower, softer.
  const ease = (dt, ms) => 1 - Math.exp(-dt / ms);

  // ----- State -----
  let W = 0; // canvas size in CSS pixels
  let H = 0;
  let spacing = 34; // distance between base pairs
  let pairs = []; // the base pairs: their letters and scatter directions
  let progress = 0; // smoothed scroll journey, 0 to 1
  let mouseX = 0; // mouse position, -1 (left/top) to 1 (right/bottom)
  let mouseY = 0;
  let tiltX = 0; // smoothed tilt angles that follow the mouse
  let tiltY = 0;
  let time = 0; // seconds of turning so far
  let last = performance.now();
  let pulse = null; // { x, start } of the last click
  let visible = true; // is the hero on screen?
  let queued = false; // is a frame already requested?

  // Builds the list of base pairs to fill the screen width (plus extra,
  // so the helix runs off both edges). Each letter also gets a random
  // direction to fly off in when the helix dissolves.
  function build() {
    spacing = clamp(W / 28, 26, 40);
    const count = Math.ceil((W * 1.7) / spacing);
    const randomDir = () => {
      const a = Math.random() * Math.PI * 2;
      const d = 0.5 + Math.random() * 0.8;
      return [Math.cos(a) * d, Math.sin(a) * d];
    };
    pairs = Array.from({ length: count }, (_, i) => {
      const a = 'ACGT'[Math.floor(Math.random() * 4)];
      return { i, x: (i - (count - 1) / 2) * spacing, letters: [a, PARTNER[a]], dirs: [randomDir(), randomDir()] };
    });
  }

  // Matches the canvas to its size on screen. devicePixelRatio is how many
  // real pixels make one CSS pixel (2 on Retina screens), so drawing at that
  // resolution keeps the letters sharp. Capped at 2 to save work.
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    draw();
  }

  // Draws one picture of the helix.
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const untwist = phase(0.15, 0.6, progress); // 0 = twisted, 1 = flat ladder
    const scatter = phase(0.55, 1, progress); // 0 = together, 1 = fully scattered
    // The lines between letters vanish quickly once the scatter begins, so
    // only loose letters drift away (not a web of stretched lines).
    const lines = 1 - phase(0.5, 0.68, progress);
    const radius = Math.min(H * 0.17, W * 0.3); // how far each strand is from the middle
    const twist = 0.3 * (1 - untwist); // turn between neighbouring pairs
    const stretch = 1 + 0.5 * untwist; // pairs spread out as it untwists
    const focal = 900; // perspective strength: smaller = more dramatic
    const cx = W / 2;
    const cy = H / 2;
    const now = performance.now();
    const ends = []; // screen positions of every letter, drawn after the rungs
    const strands = [[], []]; // each backbone's points, in order, for its curve
    // The helix runs diagonally, rising to the right. These turn a flat
    // left-right position into that slanted direction.
    const slant = -0.32; // radians (about 18 degrees)
    const cosS = Math.cos(slant);
    const sinS = Math.sin(slant);

    for (const p of pairs) {
      const x = p.x * stretch;
      const angle = p.i * twist + time * 0.35 * (1 - untwist * 0.7);
      const pts = [0, 1].map((k) => {
        // A point on a circle around the helix's axis: y is up/down,
        // z is towards/away from you. The partner letter is opposite (+π).
        const a = angle + k * Math.PI;
        const y = radius * Math.cos(a);
        const z = radius * Math.sin(a);
        // Tilt the whole helix towards the mouse: rotate around the
        // vertical axis (tiltY), then around the horizontal axis (tiltX).
        const x1 = x * Math.cos(tiltY) + z * Math.sin(tiltY);
        const z1 = -x * Math.sin(tiltY) + z * Math.cos(tiltY);
        const y1 = y * Math.cos(tiltX) - z1 * Math.sin(tiltX);
        const z2 = y * Math.sin(tiltX) + z1 * Math.cos(tiltX);
        // Perspective: things further away (bigger z) look smaller and
        // closer to the middle.
        const scale = focal / (focal + z2);
        const px = x1 * scale;
        const py = y1 * scale;
        let sx = cx + px * cosS - py * sinS;
        let sy = cy + px * sinS + py * cosS;
        // Dissolve: fly off in this letter's own direction.
        sx += p.dirs[k][0] * scatter * W * 0.6;
        sy += p.dirs[k][1] * scatter * H * 0.6;
        const depth = clamp((radius - z2) / (2 * radius), 0, 1); // 1 = front, 0 = back
        return { sx, sy, scale, depth, letter: p.letters[k] };
      });

      // Click pulse: a bright band travelling out from the click both ways,
      // fading over about a second.
      let glow = 0;
      if (pulse) {
        const age = now - pulse.start;
        const front = age * 0.9; // pixels travelled
        const dist = Math.min(Math.abs(pts[0].sx - (pulse.x - front)), Math.abs(pts[0].sx - (pulse.x + front)));
        glow = Math.exp(-(dist * dist) / 7200) * Math.exp(-age / 900);
      }

      // Fade near the left and right edges so the helix melts into the page.
      const edge = clamp(Math.min(pts[0].sx, W - pts[0].sx) / (W * 0.12), 0, 1);
      const fade = (1 - scatter) * edge;

      // The rung joining the two letters, faint.
      ctx.strokeStyle = `rgba(237, 237, 237, ${(0.07 + glow * 0.4) * fade * lines})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pts[0].sx, pts[0].sy);
      ctx.lineTo(pts[1].sx, pts[1].sy);
      ctx.stroke();

      pts.forEach((pt, k) => {
        const alpha = Math.min(1, 0.08 + 0.5 * pt.depth + glow) * fade;
        ends.push({ ...pt, alpha });
        strands[k].push({ ...pt, alpha });
      });
    }

    // The two backbones: a line through each strand's letters in order,
    // brighter where the strand is at the front. This is what makes the
    // double-helix shape easy to see.
    ctx.lineWidth = 1.25;
    for (const strand of strands) {
      for (let j = 1; j < strand.length; j++) {
        const a = strand[j - 1];
        const b = strand[j];
        ctx.strokeStyle = `rgba(237, 237, 237, ${((a.alpha + b.alpha) / 2) * 0.45 * lines})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }
    }

    // Letters: back ones first, so front letters are drawn on top.
    ends.sort((a, b) => a.depth - b.depth);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const e of ends) {
      if (e.alpha <= 0.01) continue;
      ctx.font = `500 ${Math.round(15 * e.scale)}px "Geist Mono", ui-monospace, monospace`;
      ctx.fillStyle = `rgba(237, 237, 237, ${e.alpha})`;
      ctx.fillText(e.letter, e.sx, e.sy);
    }
    if (pulse && now - pulse.start > 3000) pulse = null; // pulse is over
  }

  // One animation frame: work out the scroll journey, ease everything
  // towards its target, draw, and ask for the next frame.
  function frame(now) {
    queued = false;
    const dt = Math.min(now - last, 100); // milliseconds since last frame
    last = now;
    time += dt / 1000;

    // Scroll journey: how far through the tall .journey box we are.
    const scrollable = journey.offsetHeight - window.innerHeight;
    const target = scrollable > 0 ? clamp(-journey.getBoundingClientRect().top / scrollable, 0, 1) : 0;
    progress += (target - progress) * ease(dt, 210);
    tiltY += (mouseX * 0.35 - tiltY) * ease(dt, 300);
    tiltX += (mouseY * 0.25 - tiltX) * ease(dt, 300);
    // The CSS uses --journey to drift and fade the hero text.
    pin.style.setProperty('--journey', progress.toFixed(4));

    draw();
    if (visible) request();
  }

  function request() {
    if (!queued) {
      queued = true;
      requestAnimationFrame(frame);
    }
  }

  if (reduceMotion) {
    // Just one still helix, redrawn if the window changes size.
    resize();
    window.addEventListener('resize', resize);
  } else {
    // Switch on the pinned journey layout (see "DNA helix journey" in
    // global.css), then size the canvas for it.
    document.documentElement.classList.add('journey-ready');
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('pointermove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    // A click on the hero (not on a link or button) sends a pulse.
    pin.addEventListener('pointerdown', (e) => {
      if (!e.target.closest('a, button')) pulse = { x: e.clientX - canvas.getBoundingClientRect().left, start: performance.now() };
    });

    // Only animate while the hero is on screen, to save battery.
    // (Browsers already pause requestAnimationFrame in hidden tabs.)
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = performance.now();
        request();
      }
    }).observe(journey);

    // The canvas font must be loaded before letters look right.
    document.fonts?.load('500 16px "Geist Mono"').then(draw);
    request();
  }
}
