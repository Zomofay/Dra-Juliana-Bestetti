/* ============================================================
   DRA. JULIANA BESTETTI — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── INTRO: desaparece após 2.2s ── */
  const intro = document.getElementById('intro');
  if (intro) {
    setTimeout(() => intro.classList.add('hide'), 2200);
  }

  /* ── SCROLL REVEAL (IntersectionObserver) ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    /* fallback para browsers sem suporte */
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ── STAGGER: cards das grids ── */
  document.querySelectorAll('.esp-grid .esp-card, .dep-grid .dep-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });

  /* ── MOBILE MENU ── */
  const ham      = document.querySelector('.nav-ham');
  const navLinks = document.querySelector('.nav-links');

  if (ham && navLinks) {
    ham.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      ham.setAttribute('aria-expanded', String(isOpen));
    });

    /* fecha ao clicar em um link */
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── SMOOTH SCROLL: fallback para Safari antigo ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── NAVBAR: sombra ao rolar ── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,.08)'
        : 'none';
    }, { passive: true });
  }

});