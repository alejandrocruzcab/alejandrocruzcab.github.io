/* ═══════════════════════════════════════════════════════════════
   GUAU COUTURE — JavaScript
   Interacciones discretas. El lujo no hace ruido.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Header scroll behaviour ──────────────────────────────────────
(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


// ── Intersection Observer: fade-in elements on scroll ────────────
(function initReveal() {
  const targets = document.querySelectorAll(
    '.timeline-item, .runway-card, .info-card, .statement-grid, .invitacion-layout'
  );

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
  );

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(1.5rem)';
    el.style.transition = `opacity 0.7s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1)`;
    observer.observe(el);
  });

  // Inject the "is-visible" state
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);
})();


// ── Form: refined submission handler ─────────────────────────────
(function initForm() {
  const form = document.getElementById('invitacion-form');
  const btn  = document.getElementById('form-submit-btn');
  if (!form || !btn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Visual feedback — restrained, not garish
    const originalText = btn.textContent;
    btn.textContent = 'Solicitud recibida con distinción';
    btn.style.background = 'var(--mint)';
    btn.style.borderColor = 'var(--mint)';
    btn.style.color = 'var(--charcoal)';
    btn.disabled = true;

    // Reset quietly after a suitable pause
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
})();


// ── Smooth anchor scrolling with offset for fixed header ─────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const offset     = 80;
      const targetTop  = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();
