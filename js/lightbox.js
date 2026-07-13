// Click any card preview (video or image) to enlarge it in an overlay.
// Videos open with playback controls; images open at full size.
(function () {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const stage = box.querySelector('.lightbox-stage');
  const closeBtn = box.querySelector('.lightbox-close');
  let lastFocus = null;

  function open(kind, src, poster) {
    if (!src) return;
    stage.innerHTML = '';
    if (kind === 'video') {
      const v = document.createElement('video');
      v.src = src;
      v.controls = true; v.autoplay = true; v.loop = true;
      v.muted = true; v.playsInline = true;
      if (poster) v.poster = poster;
      stage.appendChild(v);
      v.play().catch(() => {});
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Enlarged preview';
      stage.appendChild(img);
    }
    lastFocus = document.activeElement;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    box.hidden = true;
    stage.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function mediaSource(media) {
    const v = media.querySelector('video');
    if (v) return ['video', v.currentSrc || (v.querySelector('source') || {}).src];
    const img = media.querySelector('img');
    if (img) return ['image', img.currentSrc || img.src];
    return [null, null];
  }

  // Delegate clicks. Ignore the passcode controls on the gated card.
  document.addEventListener('click', (e) => {
    if (e.target.closest('.gate-trigger, .gate-form')) return;
    const media = e.target.closest('.card-media');
    if (!media) return;
    const [kind, src] = mediaSource(media);
    open(kind, src);
  });

  // Keyboard: Enter/Space on a focusable media opens it.
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement) {
      const media = document.activeElement.closest?.('.card-media[role="button"]');
      if (media) { e.preventDefault(); const [k, s] = mediaSource(media); open(k, s); }
    }
    if (e.key === 'Escape' && !box.hidden) close();
  });

  closeBtn.addEventListener('click', close);
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
})();
