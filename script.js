// script.js
/* -------------- Theme toggle (persisted) -------------- */
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const toggle2 = document.getElementById('theme-toggle-2');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = theme === 'dark' ? '🌙' : '☀️';
  if (toggle) toggle.textContent = icon;
  if (toggle2) toggle2.textContent = icon;
}

// load saved or default
const saved = localStorage.getItem('theme') || 'dark';
applyTheme(saved);

// attach toggles
if (toggle) toggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
if (toggle2) toggle2.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* -------------- AOS init -------------- */
if (window.AOS) {
  AOS.init({ duration: 700, once: true, offset: 60 });
}

/* -------------- Typed.js for hero roles -------------- */
if (window.Typed) {
  new Typed('#typed', {
    strings: [
      
      'Telecom Compliance (DLT, NDNC)',
      'RCA and Delivery Troubleshooting',
      'Campaign Execution • CRM (Salesforce)'
    ],
    typeSpeed: 40,
    backSpeed: 25,
    backDelay: 1800,
    loop: true
  });
}

/* -------------- Mobile nav toggle -------------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    // toggle display for small screens
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
      hamburger.classList.remove('open');
    } else {
      navLinks.style.display = 'flex';
      hamburger.classList.add('open');
    }
  });
}

/* Close mobile nav when link clicked (good UX) */
document.querySelectorAll('#nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 900 && navLinks) {
      navLinks.style.display = 'none';
      hamburger && hamburger.classList.remove('open');
    }
  });
});

/* -------------- Smooth scroll for anchor links -------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

/* -------------- Active nav on scroll (highlight current section) -------------- */
const sections = Array.from(document.querySelectorAll('main section, header'));
const navItems = Array.from(document.querySelectorAll('.nav-links a'));

function onScroll() {
  const scrollPos = window.scrollY + 90; // offset to highlight sooner
  // highlight logic
  sections.forEach(sec => {
    const id = '#' + (sec.id || '');
    if (!sec.id) return;
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const link = document.querySelector(`.nav-links a[href="${id}"]`);
    if (!link) return;
    if (scrollPos >= top && scrollPos < bottom) {
      navItems.forEach(i => i.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // back-to-top button show/hide
  const topBtn = document.querySelector('.top-btn');
  if (topBtn) {
    if (window.scrollY > 400) topBtn.style.opacity = '1';
    else topBtn.style.opacity = '0';
  }
}
window.addEventListener('scroll', onScroll);
window.addEventListener('resize', () => {
  // ensure nav shown on big screens
  if (window.innerWidth > 900 && navLinks) navLinks.style.display = 'flex';
});

/* -------------- Back to top smooth behavior -------------- */
document.querySelectorAll('.top-btn').forEach(btn => {
  btn.style.transition = 'opacity 0.25s';
  btn.style.opacity = '0';
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* -------------- Small helper: open external links in new tab (optional) -------------- */
document.querySelectorAll('a[target="_blank"]').forEach(a => {
  a.setAttribute('rel', 'noopener noreferrer');
});

/* -------------- Page loaded adjustments (AOS refresh) -------------- */
window.addEventListener('load', () => {
  if (window.AOS) AOS.refresh(); 
});




