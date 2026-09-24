// Short, non-blocking brand intro and progressive animation.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const intro = document.querySelector('.brand-intro');
  let introTimer;
  function dismissIntro() {
    clearTimeout(introTimer);
    intro.hidden = true;
    document.body.classList.remove('intro-playing');
  }
  let seen = false;
  try { seen = sessionStorage.getItem('rz-intro-seen') === 'yes'; } catch {}
  if (!seen && !reduced.matches && !location.hash) {
    intro.hidden = false;
    document.body.classList.add('intro-playing');
    introTimer = setTimeout(dismissIntro, 1800);
    try { sessionStorage.setItem('rz-intro-seen', 'yes'); } catch {}
  }
  // Immediately yield to any navigation or interaction.
  ['keydown', 'pointerdown', 'wheel', 'touchstart'].forEach(type => {
    window.addEventListener(type, dismissIntro, { once: true, passive: true });
  });

  const targets = '.section-head, .instagram-inline, .studio > div, .contact .wrap, .reels-foot, footer, .showcase-heading, .showcase-more, .location-panel, .location-help, .space-view, .tour-stage';
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('motion-wait');
      entry.target.classList.add('motion-enter');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06 }) : null;
  function prepare(root = document) {
    if (reduced.matches || !observer) return;
    root.querySelectorAll(targets).forEach((node, i) => {
      if (node.dataset.motionReady) return;
      node.dataset.motionReady = 'true';
      node.style.setProperty('--reveal-delay', `${(i % 3) * 65}ms`);
      if (node.getBoundingClientRect().top >= window.innerHeight) node.classList.add('motion-wait');
      observer.observe(node);
    });
  }
  prepare();
  const projects = document.querySelector('#projects');
  const mutation = new MutationObserver(() => prepare(projects));
  if (projects) mutation.observe(projects, { childList: true });
  document.addEventListener('focusin', event => {
    dismissIntro();
    const node = event.target.closest('.motion-wait');
    if (node) { node.classList.remove('motion-wait'); observer?.unobserve(node); }
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      dismissIntro();
      observer?.disconnect();
      document.querySelectorAll('.motion-wait').forEach(node => node.classList.remove('motion-wait'));
    } else prepare();
  });
})();
