document.addEventListener('DOMContentLoaded', () => {
  const buyBtn = document.querySelector('.btn.primary');
  const heroLogo = document.querySelector('.hero-logo');
  const badgeFallback = document.querySelector('.badge-fallback');
  const backToTop = document.getElementById('backToTop');
  const copyBtn = document.getElementById('copy-contract');
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  // Coming soon behavior for Buy button
  if (buyBtn) {
    buyBtn.addEventListener('click', (e) => {
      const soon = buyBtn.dataset.comingSoon === 'true';
      if (soon) {
        e.preventDefault();
        toast('Dex link coming soon. Stay cozy 🧸');
      }
    });
  }

  // Fallback if logo.png isn’t present; swap to SVG or show gradient badge
  if (heroLogo) {
    const showFallback = () => {
      if (badgeFallback) badgeFallback.style.display = 'grid';
      heroLogo.style.display = 'none';
    };
    heroLogo.addEventListener('error', () => {
      // Try SVG first, then badge
      const triedSvg = heroLogo.dataset.triedSvg === 'true';
      if (!triedSvg) {
        heroLogo.dataset.triedSvg = 'true';
        heroLogo.src = '/assets/logo.svg';
      } else {
        showFallback();
      }
    });
  }

  // Copy placeholder contract address
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('COMING_SOON');
        toast('Contract address copied: COMING_SOON');
      } catch (err) {
        toast('Copy failed — will add once live.');
      }
    });
  }

  // Mobile navigation toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
    siteNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => siteNav.classList.remove('open')));
  }

  // Back to top visibility and smooth scroll
  const toggleTop = () => {
    if (window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };
  toggleTop();
  window.addEventListener('scroll', toggleTop);
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Simple reveal on scroll for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section').forEach((el) => observer.observe(el));
});

// Tiny toast utility
function toast(text) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.bottom = '28px';
    el.style.transform = 'translateX(-50%)';
    el.style.background = '#0d1224';
    el.style.color = '#e9f0ff';
    el.style.padding = '10px 14px';
    el.style.border = '1px solid rgba(255,255,255,0.12)';
    el.style.borderRadius = '12px';
    el.style.boxShadow = '0 20px 60px rgba(72, 120, 255, 0.25)';
    el.style.zIndex = '9999';
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.style.opacity = '1';
  setTimeout(() => (el.style.opacity = '0'), 2000);
}