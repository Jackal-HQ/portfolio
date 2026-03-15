document.addEventListener('DOMContentLoaded', function () {

  // ── Mobile nav toggle ──────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      this.setAttribute('aria-expanded', String(open));
    });
    // Close nav when a link is clicked
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Smooth scroll for anchor links ────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ── Footer year ────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Hero floating sparks ───────────────────────────
  const sparksContainer = document.getElementById('hero-sparks');
  if (sparksContainer) {
    const count = 22;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.left     = Math.random() * 100 + '%';
      spark.style.bottom   = (10 + Math.random() * 30) + '%';
      spark.style.animationDuration  = (4 + Math.random() * 8) + 's';
      spark.style.animationDelay     = (Math.random() * 8) + 's';
      spark.style.opacity  = '0';
      // Vary size slightly
      const size = 2 + Math.random() * 2.5;
      spark.style.width  = size + 'px';
      spark.style.height = size + 'px';
      sparksContainer.appendChild(spark);
    }
  }

  // ── Quest card expand / collapse ──────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    // Click anywhere on card (except links) to expand
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      if (e.target.closest('.card-toggle')) return;
      if (!card.classList.contains('expanded')) {
        card.classList.add('expanded');
      }
    });

    // Collapse button
    const toggle = card.querySelector('.card-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        card.classList.remove('expanded');
        // If card scrolled out of view during reading, bring it back
        setTimeout(() => {
          const rect = card.getBoundingClientRect();
          if (rect.top < 70) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 560);
      });
    }
  });

  // ── d20 Easter egg on logo click ──────────────────
  const logo = document.querySelector('.logo');
  let dicePopup = null;

  if (logo) {
    logo.addEventListener('click', function () {
      // Only fire if the click is on the logo itself (not a child anchor nav)
      const roll = Math.floor(Math.random() * 20) + 1;

      // Remove existing popup
      if (dicePopup) dicePopup.remove();

      const messages = {
        crit: '⚡ Natural 20!',
        fail: '💀 Critical Fail',
      };

      const isCrit = roll === 20;
      const isFail = roll === 1;
      const label  = isCrit ? messages.crit : isFail ? messages.fail : 'd20 Roll';

      dicePopup = document.createElement('div');
      dicePopup.className = 'dice-popup' + (isCrit ? ' crit' : isFail ? ' fail' : '');
      dicePopup.innerHTML = `
        <span class="dice-num">${roll}</span>
        <span class="dice-label">${label}</span>
      `;
      document.body.appendChild(dicePopup);

      // Auto-remove after 2.2 s
      const timer = setTimeout(() => {
        if (dicePopup) { dicePopup.remove(); dicePopup = null; }
      }, 2200);

      // Click to dismiss early
      dicePopup.addEventListener('click', () => {
        clearTimeout(timer);
        dicePopup.remove();
        dicePopup = null;
      });
    });
  }

});
