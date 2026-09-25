(() => {
  const STORAGE_KEY = 'rdfz-theme';
  const root = document.documentElement;
  const mq = window.matchMedia('(prefers-color-scheme: light)');

  function resolveTheme(choice) {
    return choice === 'system' ? (mq.matches ? 'light' : 'dark') : choice;
  }

  function updatePhoto(theme) {
    document.querySelectorAll('.sidebar-photo[data-dark-src]').forEach((img) => {
      const darkSrc = img.dataset.darkSrc;
      const lightSrc = img.dataset.lightSrc || darkSrc;
      if (theme !== 'light' || lightSrc === darkSrc) {
        img.src = darkSrc;
        return;
      }
      const probe = new Image();
      probe.onload = () => { img.src = lightSrc; };
      probe.onerror = () => { img.src = darkSrc; };
      probe.src = lightSrc;
    });
  }

  function applyChoice(choice) {
    const theme = resolveTheme(choice);
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f8fa' : '#1a1a1a');
    updatePhoto(theme);
    document.querySelectorAll('[data-theme-select]').forEach((select) => { select.value = choice; });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
    applyChoice(saved);
    document.querySelectorAll('[data-theme-select]').forEach((select) => {
      select.addEventListener('change', (event) => {
        const choice = event.target.value;
        localStorage.setItem(STORAGE_KEY, choice);
        applyChoice(choice);
      });
    });
  });

  mq.addEventListener?.('change', () => {
    if ((localStorage.getItem(STORAGE_KEY) || 'dark') === 'system') applyChoice('system');
  });
})();
