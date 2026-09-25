(() => {
  const spaces = window.RZ_CONTENT.spaces || [];
  const view = document.querySelector('#space-view');
  const tabs = document.querySelector('#space-tabs');
  let current = 0;
  function element(tag, cls, text) { const n = document.createElement(tag); n.className = cls; if (text) n.textContent = text; return n; }
  function render(index) {
    if (!spaces.length) return;
    current = (index + spaces.length) % spaces.length;
    const space = spaces[current];
    const art = element('div', 'space-art ' + space.theme);
    if (space.image) {
      const img = element('img', 'space-photo'); img.src = space.image; img.alt = space.name;
      img.addEventListener('error', () => { img.remove(); art.append(element('span', 'space-placeholder', 'Photo à venir')); });
      art.append(img);
    } else {
      art.append(element('span', 'space-placeholder', 'VISUEL D’AMBIANCE · PHOTO À VENIR'), element('strong', 'space-art-name', space.name));
    }
    const info = element('div', 'space-info');
    const link = element('a', 'glass-button', 'Voir plus '); link.href = 'espace ' + space.slug + '.html';
    info.append(element('p', 'eyebrow', space.label), element('h3', '', space.name), element('p', 'space-description', space.description), link);
    view.replaceChildren(art, info);
    tabs.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    document.querySelector('#space-count').textContent = `${current + 1} / ${spaces.length}`;
  }
  spaces.forEach((space, index) => {
    const button = element('button', '', space.name); button.type = 'button'; button.setAttribute('aria-controls', 'space-view');
    button.addEventListener('click', () => render(index)); tabs.append(button);
  });
  document.querySelector('#space-prev').addEventListener('click', () => render(current - 1));
  document.querySelector('#space-next').addEventListener('click', () => render(current + 1));
  render(0);
  const configured = window.RZ_CONTENT.tour?.embedUrl;
  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol !== 'https:') return;
      const frame = element('iframe', 'tour-frame'); frame.src = url.href; frame.title = 'Visite virtuelle à 360° du studio RZCONCEPT'; frame.loading = 'lazy'; frame.allow = 'fullscreen; accelerometer; gyroscope'; frame.setAttribute('allowfullscreen', ''); frame.referrerPolicy = 'strict-origin-when-cross-origin';
      const link = element('a', 'glass-button', 'Ouvrir la visite dans un nouvel onglet ↗'); link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      document.querySelector('#tour-stage').replaceChildren(frame, link);
      document.querySelector('#tour .section-head > p').textContent = 'Explorez le studio à votre rythme, sous tous les angles.';
    } catch { /* Keep the forthcoming state for invalid URLs. */ }
  }
})();
