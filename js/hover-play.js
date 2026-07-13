// Card previews stay as a still frame while reading; they play on hover
// (or keyboard focus) and pause on leave. Click-to-enlarge still plays with
// controls in the lightbox.
(function () {
  document.querySelectorAll('.card-media').forEach((media) => {
    const video = media.querySelector('video.card-video');
    if (!video) return;

    video.removeAttribute('autoplay');
    video.pause();

    // Paint the first frame so the card shows a still, not a blank box.
    const showStill = () => { try { video.currentTime = 0; } catch (e) {} };
    if (video.readyState >= 2) showStill();
    else video.addEventListener('loadeddata', showStill, { once: true });

    const card = media.closest('.card') || media;
    const play = () => { video.play().catch(() => {}); };
    const stop = () => { video.pause(); };

    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    media.addEventListener('focus', play);
    media.addEventListener('blur', stop);
  });
})();
