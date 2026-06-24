
// ===== SiteForge generated site script =====
// Smooth-scroll navigation, FAQ accordion, testimonial carousel,
// gallery lightbox and scroll-reveal — vanilla JS, no dependencies.
document.addEventListener('DOMContentLoaded', function () {

  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () { nav.classList.toggle('is-open'); });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  document.querySelectorAll('.faq-item__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  var track = document.getElementById('tTrack');
  if (track) {
    var cards = Array.prototype.slice.call(track.children);
    var dotsWrap = document.getElementById('tDots');
    var index = 0;
    var visible = 3;
    function layout() {
      visible = window.innerWidth < 760 ? 1 : (window.innerWidth < 1080 ? 2 : 3);
      cards.forEach(function (c) { c.style.flex = '0 0 ' + (100 / visible) + '%'; });
      goTo(index);
      buildDots();
    }
    function maxIndex() { return Math.max(0, cards.length - visible); }
    function goTo(i) {
      index = Math.max(0, Math.min(i, maxIndex()));
      track.style.transform = 'translateX(-' + (index * (100 / visible)) + '%)';
      if (dotsWrap) {
        Array.prototype.slice.call(dotsWrap.children).forEach(function (dot, di) {
          dot.classList.toggle('is-active', di === index);
        });
      }
    }
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      var count = maxIndex() + 1;
      for (var i = 0; i < count; i++) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'testimonial-dot' + (i === index ? ' is-active' : '');
        d.addEventListener('click', (function (idx) { return function () { goTo(idx); }; })(i));
        dotsWrap.appendChild(d);
      }
    }
    var prevBtn = document.getElementById('tPrev');
    var nextBtn = document.getElementById('tNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1 < 0 ? maxIndex() : index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1 > maxIndex() ? 0 : index + 1); });
    window.addEventListener('resize', layout);
    layout();
    if (cards.length > 1) {
      setInterval(function () { goTo(index + 1 > maxIndex() ? 0 : index + 1); }, 6000);
    }
  }

  var galleryImgs = Array.prototype.slice.call(document.querySelectorAll('.gallery__item img'));
  if (galleryImgs.length) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__prev" aria-label="Previous">&#8249;</button>' +
      '<img class="lightbox__img" src="" alt="">' +
      '<button class="lightbox__next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(overlay);
    var lbImg = overlay.querySelector('.lightbox__img');
    var lbIndex = 0;
    function openLightbox(i) { lbIndex = i; lbImg.src = galleryImgs[i].src; overlay.classList.add('is-open'); }
    function closeLightbox() { overlay.classList.remove('is-open'); }
    galleryImgs.forEach(function (img, i) {
      img.parentElement.addEventListener('click', function () { openLightbox(i); });
    });
    overlay.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeLightbox(); });
    overlay.querySelector('.lightbox__prev').addEventListener('click', function () {
      openLightbox((lbIndex - 1 + galleryImgs.length) % galleryImgs.length);
    });
    overlay.querySelector('.lightbox__next').addEventListener('click', function () {
      openLightbox((lbIndex + 1) % galleryImgs.length);
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value;
      var email = form.email.value;
      var message = form.message.value;
      var subject = encodeURIComponent('New enquiry from website - ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      var note = document.getElementById('formNote');
      var mailTarget = form.dataset.mailto || '';
      if (mailTarget) { window.location.href = 'mailto:' + mailTarget + '?subject=' + subject + '&body=' + body; }
      if (note) note.textContent = 'Thanks, ' + (name || 'there') + '! Your message is ready to send from your email app.';
      form.reset();
    });
  }

});
