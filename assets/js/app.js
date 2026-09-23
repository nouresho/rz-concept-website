const $ = (s) => document.querySelector(s);
const content = window.RZ_CONTENT;
const dialog = $('#viewer');
let opener;
function showModal(node, trigger) { opener = trigger; $('#viewer-content').replaceChildren(node); dialog.showModal(); document.body.classList.add('modal-open'); }
function closeModal() { dialog.close(); }
dialog.addEventListener('close', () => { $('#viewer-content').replaceChildren(); document.body.classList.remove('modal-open'); opener?.focus(); });
$('.close').addEventListener('click', closeModal);
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeModal(); } });
function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
function art(p) { const a = el('div', `project-art ${p.theme}`); a.append(el('span', 'art-label', 'RZ STUDIO / CONCEPT'), el('strong', 'project-word', p.word), el('span', 'project-sub', p.sub)); return a; }
function renderProjects(filter = 'all') {
  const projects = content.projects.filter(p => filter === 'all' || p.category === filter);
  $('#projects').replaceChildren(...projects.map(p => {
    if (p.instagram && /^https:\/\/www\.instagram\.com\/p\/[A-Za-z0-9_-]+\/$/.test(p.instagram)) {
      const card = el('article', 'instagram-inline portfolio-instagram');
      const title = el('h3', 'instagram-inline-title', p.title);
      const frame = el('iframe', 'instagram-inline-frame');
      frame.title = p.title + ' — publication Instagram';
      frame.src = p.instagram + 'embed/'; frame.loading = 'eager';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
      const link = el('a', 'reel-direct', 'Ouvrir la publication sur Instagram ↗');
      link.href = p.instagram; link.target = '_blank'; link.rel = 'noopener noreferrer';
      card.append(title, frame, link); return card;
    }
    const b = el('button', 'project-card'); b.setAttribute('aria-label', `Découvrir ${p.title}`); const meta = el('div', 'project-meta'); const title = el('div'); title.append(el('h3', '', p.title), el('p', '', p.label)); meta.append(title, el('span', 'project-arrow', '↗')); b.append(art(p), meta); b.addEventListener('click', () => { const node = el('article', 'project-detail'); const heading = el('h2', '', p.title); heading.id = 'viewer-title'; node.append(art(p), heading, el('p', '', p.description), el('p', 'demo-note', 'Concept visuel de démonstration · RZCONCEPT')); showModal(node, b); }); return b; }));
  $('#filter-status').textContent = `${projects.length} projets affichés`;
}
document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', String(x === b)); }); renderProjects(b.dataset.filter); }));
function instagramURL(value) {
  try {
    const url = new URL(value);
    const match = url.pathname.match(/^\/reel\/([A-Za-z0-9_-]+)\/?$/);
    if (url.protocol !== 'https:' || url.hostname !== 'www.instagram.com' || !match) return null;
    return 'https://www.instagram.com/reel/' + match[1] + '/';
  } catch { return null; }
}
content.reels.forEach((r, i) => {
  const instagram = instagramURL(r.instagram);
  if (instagram) {
    const card = el('article', 'instagram-inline');
    const title = el('h3', 'instagram-inline-title', r.title);
    const frame = el('iframe', 'instagram-inline-frame');
    frame.title = r.title + ' — lecteur Instagram';
    frame.src = instagram + 'embed/';
    frame.loading = 'eager';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.setAttribute('allowfullscreen', '');
    const link = el('a', 'reel-direct', 'Ouvrir sur Instagram ↗');
    link.href = instagram; link.target = '_blank'; link.rel = 'noopener noreferrer';
    card.append(title, frame, link);
    $('#reel-grid').append(card);
    return;
  }
  const card = el('article', 'reel ' + r.theme);
  card.append(el('span', 'reel-number', '0' + (i + 1) + ' / ' + r.category));
  if (r.poster) { const img = el('img', 'reel-poster'); img.src = r.poster; img.alt = ''; img.loading = 'lazy'; card.append(img); }
  card.append(el('strong', 'reel-word', r.word));
  if (instagram || r.src) {
    const play = el('button', 'play', '▶');
    play.setAttribute('aria-label', 'Voir ' + r.title + (instagram ? ' via Instagram' : ''));
    play.addEventListener('click', () => {
      const node = el('div', instagram ? 'video-detail instagram-detail' : 'video-detail');
      const title = el('h2', '', r.title); title.id = 'viewer-title'; node.append(title);
      if (instagram) {
        const fallback = el('a', 'instagram-fallback', 'Ouvrir sur Instagram ↗');
        fallback.href = instagram; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer';
        node.append(fallback, el('p', 'embed-note', 'Si le lecteur ne s’affiche pas, ouvrez le reel directement sur Instagram.'));
        const frame = el('iframe', 'instagram-frame');
        frame.title = r.title + ' — lecteur Instagram';
        frame.src = instagram + 'embed/';
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.setAttribute('allowfullscreen', '');
        node.append(frame);
        showModal(node, play);
      } else {
        const video = el('video'); video.controls = true; video.playsInline = true; video.preload = 'none'; video.src = r.src;
        if (r.poster) video.poster = r.poster;
        video.addEventListener('error', () => { if (!node.querySelector('.video-error')) node.append(el('p', 'video-error', 'La vidéo est indisponible. Réessayez plus tard.')); });
        node.append(video); showModal(node, play); video.play().catch(() => {});
      }
    });
    card.append(play);
  } else card.append(el('span', 'coming', 'REEL À AJOUTER'));
  card.append(el('h3', 'reel-title', r.title));
  if (instagram) { const link = el('a', 'reel-direct', 'Voir sur Instagram ↗'); link.href = instagram; link.target = '_blank'; link.rel = 'noopener noreferrer'; card.append(link); }
  $('#reel-grid').append(card);
});
const menu = $('.menu');
function setMenu(open) { menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); $('#navigation').classList.toggle('is-open', open); }
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.querySelectorAll('#navigation a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
$('#year').textContent = new Date().getFullYear();
renderProjects();
