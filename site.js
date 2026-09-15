(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width:600px), (max-height:799px)');
  const root = document.documentElement;
  const clamp = value => Math.min(1, Math.max(0, value));
  let ticking = false;

  const video = $('#hero-video');
  const videoToggle = $('#video-toggle');
  let userPaused = false;
  function syncVideoButton() {
    videoToggle.textContent = video.paused ? '영상 재생' : '영상 일시정지';
    videoToggle.setAttribute('aria-pressed', String(!video.paused));
  }
  function syncVideo() {
    if (reduced.matches) { video.pause(); videoToggle.hidden = true; return; }
    if (document.hidden || userPaused) { video.pause(); return; }
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    video.play().catch(() => { if (!video.error && !reduced.matches) videoToggle.hidden = false; syncVideoButton(); });
  }
  video.addEventListener('playing', () => { video.classList.add('ready'); videoToggle.hidden = reduced.matches; syncVideoButton(); });
  video.addEventListener('pause', syncVideoButton);
  video.addEventListener('error', () => { video.classList.remove('ready'); videoToggle.hidden = true; });
  videoToggle.addEventListener('click', () => {
    if (reduced.matches) return;
    userPaused = !video.paused;
    if (userPaused) video.pause();
    else { if (!video.getAttribute('src')) video.src = video.dataset.src; video.play().catch(syncVideoButton); }
  });
  document.addEventListener('visibilitychange', syncVideo);
  reduced.addEventListener('change', syncVideo);
  syncVideo();

  function renderScroll() {
    const animated = !compact.matches && !reduced.matches;
    root.classList.toggle('scenes-animated', animated);
    const hero = $('.hero-track');
    const progress = clamp(-hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight - innerHeight));
    const heroCopy = $('.hero-copy');
    if (animated) {
      $('.hero-sticky').style.padding = 16 * (1 - clamp(progress * 3)) + 'px';
      $('#hero-frame').style.borderRadius = 28 * (1 - clamp(progress * 3)) + 'px';
      const opacity = 1 - clamp((progress - .12) * 3);
      heroCopy.style.opacity = opacity;
      heroCopy.style.transform = `translateY(${-progress * 45}px)`;
      heroCopy.inert = opacity < .1;
      $('.hero-after').style.opacity = clamp((progress - .40) * 4) * (1 - clamp((progress - .90) * 8));
    } else {
      $$('.hero-copy,.hero-after,.hero-sticky,#hero-frame').forEach(el => el.removeAttribute('style'));
      heroCopy.inert = false;
    }
    const approach = $('.approach');
    const progressScene = clamp(-approach.getBoundingClientRect().top / Math.max(1, approach.offsetHeight - innerHeight));
    const stage = Math.min(2, Math.floor(progressScene * 3));
    $$('.scene').forEach((el, i) => el.classList.toggle('active', i === stage));
    $$('.scene-copy').forEach((el, i) => {
      el.classList.toggle('active', i === stage);
      if (animated) el.setAttribute('aria-hidden', String(i !== stage));
      else el.removeAttribute('aria-hidden');
    });
    $$('[data-scene]').forEach((el, i) => {
      el.classList.toggle('active', i === stage);
      el.setAttribute('aria-pressed', String(i === stage));
    });
    $('#scene-counter').textContent = `0${stage + 1} / 03`;
    ticking = false;
  }
  function schedule() {
    if (!ticking) { ticking = true; requestAnimationFrame(renderScroll); }
  }
  $$('[data-scene]').forEach(button => button.addEventListener('click', () => {
    const section = $('.approach');
    const range = section.offsetHeight - innerHeight;
    scrollTo({ top: scrollY + section.getBoundingClientRect().top + range * (Number(button.dataset.scene) / 3 + .1), behavior: reduced.matches ? 'instant' : 'smooth' });
  }));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }), { threshold: .45 });
  $$('.statement span,.product-stage').forEach(el => observer.observe(el));
  $$('[data-contact]').forEach(button => button.addEventListener('click', () => $('#contact-dialog').showModal()));
  $('#credits-open').addEventListener('click', () => $('#credits-dialog').showModal());
  $$('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }));
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  compact.addEventListener('change', schedule);
  root.classList.add('enhanced');
  renderScroll();
})();
