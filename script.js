/* ============================================================
   AIDAN DOLD PORTFOLIO - SCRIPTS
   ============================================================ */

(function() {
  'use strict';

  // ============================================================
  // NAV SCROLL BEHAVIOR
  // Adds 'scrolled' class to nav when page is scrolled
  // ============================================================
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ============================================================
  // SCROLL-TRIGGERED REVEALS
  // Fade in and slide up elements as they enter viewport
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal, .tier');

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once revealed
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function(el) {
    revealObserver.observe(el);
  });

  // ============================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // Smoothly scroll to sections when nav links are clicked
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // RESPECT REDUCED MOTION
  // If user has prefers-reduced-motion, immediately show all reveals
  // ============================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

})();
