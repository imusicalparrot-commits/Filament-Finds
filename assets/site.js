/* Filament Finds — burger menu + 3D ad card tilt (vanilla, no deps) */
(function () {
  'use strict';

  /* ---------- Mobile fullscreen burger menu ---------- */
  var btn = document.getElementById('burgerBtn');
  var nav = document.getElementById('mobileNav');
  if (btn && nav) {
    var label = btn.querySelector('.burger-label');
    var set = function (open) {
      nav.classList.toggle('open', open);
      btn.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (label) label.textContent = open ? 'Close' : 'Menu';
    };
    btn.addEventListener('click', function () { set(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('[data-mnav-close]') || e.target.closest('a')) set(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') set(false);
    });
  }

  /* ---------- 3D tilt for the sponsored ad card ---------- */
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.card3d').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = e.clientX - r.left;
        var y = e.clientY - r.top;
        var rx = (y - r.height / 2) / (r.height / 2) * -8;
        var ry = (x - r.width / 2) / (r.width / 2) * 8;
        card.style.transition = 'transform 0.1s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) scale3d(1.05, 1.05, 1.05)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.4s ease-in-out';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }
})();
