// Passcode gate for an encrypted walkthrough video.
// The card shows a public screenshot; a lock button reveals a passcode field.
// The walkthrough is AES-256-GCM ciphertext (assets/web/sw.enc) — public but
// useless without the passcode, which is the only key. Decryption happens
// entirely in the browser; a wrong passcode fails the GCM auth tag.
(function () {
  const ITER = 250000; // must match tools/encrypt-asset.mjs

  document.querySelectorAll('[data-gate]').forEach((card) => {
    const media = card.querySelector('.card-media');
    const trigger = card.querySelector('.gate-trigger');
    const form = card.querySelector('.gate-form');
    const input = card.querySelector('.gate-input');
    const errEl = card.querySelector('.gate-error');
    const encUrl = card.dataset.enc;
    const idxLabel = card.dataset.index || '';
    let cipher = null;

    if (trigger) {
      trigger.addEventListener('click', () => {
        media.classList.add('gate-open');
        form.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        trigger.hidden = true;
        if (!crypto?.subtle) {
          errEl.textContent = 'Needs a secure (https) connection.';
          form.querySelector('.gate-btn').disabled = true;
          return;
        }
        input.focus();
      });
    }

    async function loadCipher() {
      if (cipher) return cipher;
      const res = await fetch(encUrl);
      if (!res.ok) throw new Error('missing');
      cipher = new Uint8Array(await res.arrayBuffer());
      return cipher;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errEl.textContent = '';
      const pass = input.value;
      if (!pass) return;
      form.classList.add('is-busy');

      try {
        const data = await loadCipher();
        const salt = data.slice(0, 16);
        const iv = data.slice(16, 28);
        const ct = data.slice(28);

        const baseKey = await crypto.subtle.importKey(
          'raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']
        );
        const key = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
          baseKey, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
        );
        const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);

        const url = URL.createObjectURL(new Blob([plain], { type: 'video/mp4' }));
        const video = document.createElement('video');
        video.className = 'card-video';
        video.autoplay = true; video.loop = true; video.muted = true;
        video.playsInline = true; video.src = url;

        media.innerHTML = '';
        media.classList.remove('gate-open');
        media.appendChild(video);
        if (idxLabel) {
          const idx = document.createElement('span');
          idx.className = 'card-index';
          idx.textContent = idxLabel;
          media.appendChild(idx);
        }
        card.classList.add('is-unlocked');
        video.play().catch(() => {});
      } catch (ex) {
        errEl.textContent = ex.message === 'missing'
          ? 'Walkthrough not available yet.'
          : 'That passcode didn’t work.';
        form.classList.remove('is-busy');
        input.select();
      }
    });
  });
})();
