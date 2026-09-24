(() => {
  const space = window.RZ_CONTENT.spaces.find(s => s.slug === document.body.dataset.space);
  if (!space) return;
  document.querySelector('#space-name').textContent = space.name;
  document.querySelector('#space-description').textContent = space.description;
  document.title = space.name + ' — RZCONCEPT';
  const gallery = document.querySelector('#space-gallery');
  const viewer = document.querySelector('#photo-viewer');
  const image = viewer.querySelector('img');
  let active = 0, opener;
  const photos = (space.gallery || []).filter(p => p.src);
  function show(index) {
    active = (index + photos.length) % photos.length;
    image.src = photos[active].src; image.alt = photos[active].alt || space.name;
    document.querySelector('#photo-caption').textContent = `${space.name} · ${active + 1} / ${photos.length}`;
  }
  photos.forEach((photo, index) => {
    const button = document.createElement('button'); button.className = 'gallery-photo';
    const img = document.createElement('img'); img.src = photo.src; img.alt = photo.alt || `${space.name} — ${index + 1}`; img.loading = 'lazy';
    img.addEventListener('error', () => { button.disabled = true; img.hidden = true; button.textContent = 'Photo à venir'; });
    button.append(img); button.addEventListener('click', () => { opener = button; show(index); viewer.showModal(); document.body.classList.add('modal-open'); }); gallery.append(button);
  });
  if (!photos.length) {
    for (let i=0;i<6;i++) { const tile=document.createElement('div');tile.className='gallery-placeholder '+space.theme;const label=document.createElement('span');label.textContent='Photo à venir';const number=document.createElement('strong');number.textContent=String(i+1).padStart(2,'0');tile.append(number,label);gallery.append(tile); }
  }
  document.querySelector('#photo-close').addEventListener('click', () => viewer.close());
  document.querySelector('#photo-prev').addEventListener('click', () => show(active-1));
  document.querySelector('#photo-next').addEventListener('click', () => show(active+1));
  viewer.addEventListener('keydown', e => { if(e.key==='ArrowRight'){e.preventDefault();show(active+1);}if(e.key==='ArrowLeft'){e.preventDefault();show(active-1);} });
  viewer.addEventListener('close', () => { image.removeAttribute('src'); document.body.classList.remove('modal-open'); opener?.focus(); });
  image.addEventListener('error', () => { document.querySelector('#photo-caption').textContent='Photo indisponible'; });
})();
