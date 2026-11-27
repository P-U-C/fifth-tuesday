// Your colour: a ring of dots, one per hue. Picking one tints the page's accent and turns the app's screens to that
// shade (they're lilac, so it's a hue turn from lilac). Until someone picks, it drifts slowly round the ring.
// Used on the products page and the Phase page; the choice is kept, so it follows you from one to the other.
(() => {
  const wheel = document.getElementById('wheel'), root = document.documentElement, LILAC = 254;
  if (!wheel) return;
  const N = 36, dots = [];
  let picked = false, timer;
  const set = (h, user) => {
    const c = `hsl(${h} 100% 84%)`;   // one colour: the dot, the page accent and the app's tint
    root.style.setProperty('--pick', c);
    root.style.setProperty('--tint', c); root.style.setProperty('--on', h === LILAC ? 0 : 1);
    dots.forEach(d => d.setAttribute('aria-checked', String(+d.dataset.h === h)));
    if (user) { picked = true; clearInterval(timer); try { localStorage.setItem('phase-hue', h); } catch {} }
  };
  for (let i = 0; i < N; i++) {
    const h = (LILAC + i * 360 / N) % 360, a = i / N * Math.PI * 2 - Math.PI / 2;
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.h = h; b.setAttribute('role', 'radio'); b.setAttribute('aria-label', h === LILAC ? 'Lilac' : `Hue ${Math.round(h)}`);
    b.style.cssText = `--h:${h};left:${50 + 44 * Math.cos(a)}%;top:${50 + 44 * Math.sin(a)}%`;
    b.addEventListener('click', () => set(h, true));
    wheel.appendChild(b); dots.push(b);
  }
  const reset = document.getElementById('reset');
  if (reset) reset.addEventListener('click', () => { set(LILAC, true); try { localStorage.removeItem('phase-hue'); } catch {} });
  let saved = null; try { saved = localStorage.getItem('phase-hue'); } catch {}
  if (saved !== null) { set(+saved, false); picked = true; } else set(LILAC, false);
  if (!picked && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let i = 0;
    new IntersectionObserver((es, ob) => {
      if (!es.some(e => e.isIntersecting)) return; ob.disconnect();
      timer = setInterval(() => { if (picked) return; i = (i + 1) % N; set(+dots[i].dataset.h, false); if (i === 0) clearInterval(timer); }, 160);
    }, { threshold: 0.5 }).observe(wheel);
  }
})();
