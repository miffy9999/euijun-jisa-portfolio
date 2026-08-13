const body = document.body;
const languageButtons = document.querySelectorAll('[data-set-lang]');
const pageParameters = new URLSearchParams(location.search);

if (pageParameters.get('capture') === '1') {
  document.documentElement.classList.add('capture-mode');
}

function setLanguage(lang) {
  body.dataset.lang = lang;
  document.documentElement.lang = lang;
  document.title = lang === 'ko'
    ? '정의준 · 2026 일본 인턴십'
    : 'チョン・ウィジュン · 2026 日本インターンシップ';

  languageButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.setLang === lang));
  });

  try { localStorage.setItem('euijun-portfolio-lang', lang); } catch (_) {}
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.setLang));
});

const requestedLanguage = pageParameters.get('lang');

if (requestedLanguage === 'ko' || requestedLanguage === 'ja') {
  setLanguage(requestedLanguage);
} else {
  try {
    const saved = localStorage.getItem('euijun-portfolio-lang');
    if (saved === 'ko' || saved === 'ja') setLanguage(saved);
  } catch (_) {}
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!link.hash) return;

    const destination = document.querySelector(link.hash);
    if (!destination) return;

    event.preventDefault();
    destination.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
    history.replaceState(null, '', link.hash);
  });
});

if (location.hash) {
  requestAnimationFrame(() => {
    document.querySelector(location.hash)?.scrollIntoView({ block: 'start' });
  });
}
