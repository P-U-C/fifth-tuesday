// The Today moon's dither (Phase/Design/PhaseShaders.metal, tools/brand-moon.py): Bayer 8×8 over a grid of round dots.
// <canvas data-moon data-lit="0.72" data-cells="30" data-wax> waxes from new to `lit` on load (still with reduced motion).
(() => {
  const BAYER = [0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,
    3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21];
  function density(px, py, lit) {
    const r2 = px * px + py * py;
    if (r2 > 1) return [0, false];
    const limb = Math.sqrt(Math.max(0, 1 - py * py)), term = (1 - 2 * lit) * limb, depth = Math.sqrt(Math.max(0, 1 - r2));
    if (lit > 0.002 && px >= term) {
      const u = Math.min(Math.max((px - term) / Math.max(limb - term, 0.001), 0), 1);
      return [Math.min((0.16 + 0.36 * Math.pow(u, 0.55)) * (0.82 + 0.18 * depth) + 0.12, 0.8), true];
    }
    return [0.07 + 0.03 * depth, false];
  }
  const css = (el, name) => getComputedStyle(el).getPropertyValue(name).trim();

  function draw(canvas, lit) {
    const cells = +canvas.dataset.cells || 30, size = cells + 2, radius = cells / 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 3), w = canvas.clientWidth;
    if (!w) return;
    canvas.width = canvas.height = Math.round(w * dpr);
    const g = canvas.getContext('2d'), s = canvas.width / size, r = s * 0.38;
    g.clearRect(0, 0, canvas.width, canvas.height);
    const on = css(canvas, '--moon-lit') || '#C9B8FF', off = css(canvas, '--moon-dark') || '#4A4560';
    g.strokeStyle = on; g.globalAlpha = 0.35; g.lineWidth = s * 0.12;
    g.beginPath(); g.arc(canvas.width / 2, canvas.height / 2, canvas.width * cells / size / 2 + r * 1.9, 0, Math.PI * 2); g.stroke();
    g.globalAlpha = 1;
    for (let iy = 0; iy < size; iy++) for (let ix = 0; ix < size; ix++) {
      const cx = ix + 0.5, cy = iy + 0.5;
      const [d, inlit] = density((cx - size / 2) / radius, (cy - size / 2) / radius, lit);
      if (d > (BAYER[(iy & 7) * 8 + (ix & 7)] + 0.5) / 64) {
        g.fillStyle = inlit ? on : off;
        g.beginPath(); g.arc(cx * s, cy * s, r, 0, Math.PI * 2); g.fill();
      }
    }
  }

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const moons = [...document.querySelectorAll('canvas[data-moon]')];
  const state = new Map(moons.map(c => [c, still || !('wax' in c.dataset) ? +c.dataset.lit : 0]));
  const redraw = () => moons.forEach(c => draw(c, state.get(c)));
  redraw();
  addEventListener('resize', redraw);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', redraw);
  if (still) return;
  moons.filter(c => 'wax' in c.dataset).forEach(c => {
    const target = +c.dataset.lit, t0 = performance.now() + 250, dur = 2600;
    const step = now => {
      const t = Math.min(Math.max((now - t0) / dur, 0), 1), e = 1 - Math.pow(1 - t, 3);
      const lit = Math.round(target * e * 40) / 40;   // steps of a phase, so the dots settle, not shimmer
      if (lit !== state.get(c)) { state.set(c, lit); draw(c, lit); }
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
})();
