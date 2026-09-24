(() => {
  const video = document.querySelector('#hero-video');
  const button = document.querySelector('#video-toggle');
  const media = window.RZ_CONTENT.hero || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!video || !media.video) return;
  video.muted = true;
  if (media.poster) video.poster = media.poster;
  video.src = media.video;
  button.hidden = false;
  const update = () => { button.textContent = video.paused ? 'Lire la vidéo' : 'Mettre en pause'; };
  video.addEventListener('play', update); video.addEventListener('pause', update);
  video.addEventListener('error', () => { video.hidden = true; button.hidden = true; });
  button.addEventListener('click', () => { if (video.paused) video.play().catch(update); else video.pause(); });
  reduced.addEventListener('change', () => { if (reduced.matches) video.pause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
  if (!reduced.matches) video.play().catch(update);
  update();
})();
