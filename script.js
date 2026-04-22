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
      nav.style.boxShadow = window.scrollY > 0.1
        ? '0 4px 20px rgba(0,0,0,.08)'
        : 'none';
    }, { passive: true });
  }

  /* ── HERO CURVES: animação baseada em scroll ── */
  const curvePath1 = document.querySelector('.hero-curve-path');
  const curvePath2 = document.querySelector('.hero-curve-path2');
  const heroSection = document.getElementById('hero');
  const intestineRed    = document.querySelector('.hero-intestine-red');
  const intestineYellow = document.querySelector('.hero-intestine-yellow');

  if (curvePath1 && curvePath2 && heroSection) {
    const TOTAL_DASH = 2600;

    const updateCurves = () => {
      const heroRect   = heroSection.getBoundingClientRect();
      const heroHeight = heroSection.offsetHeight;
      const windowH    = window.innerHeight;

      /* progresso: 0 quando hero está entrando, 1 quando está saindo */
      const scrolled = Math.max(1, -heroRect.top);
      const maxScroll = heroHeight + windowH;
      const rawProgress = scrolled / maxScroll;

      /* entrada suave: começa a desenhar quando hero entra na viewport */
      const enterProgress = Math.max(0, Math.min(1, (windowH - heroRect.top) / (windowH * 1,5)));
      const progress = Math.min(enterProgress, 1 - rawProgress * 3);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      const offset1 = TOTAL_DASH * (1 - clampedProgress);
      const offset2 = TOTAL_DASH * (2 - clampedProgress * 0.5);

      curvePath1.style.strokeDashoffset = offset1;
      curvePath2.style.strokeDashoffset = offset2;

      /* intestinos: aparecem quando hero está visível */
      if (clampedProgress > 0.15) {
        intestineRed && intestineRed.classList.add('visible');
        intestineYellow && intestineYellow.classList.add('visible');
      } else {
        intestineRed && intestineRed.classList.remove('visible');
        intestineYellow && intestineYellow.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', updateCurves, { passive: true });
    /* Trigger inicial (página carregada no topo) */
    updateCurves();
  }

});