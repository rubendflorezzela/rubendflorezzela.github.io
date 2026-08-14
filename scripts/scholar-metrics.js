(() => {
  const DATA_URL = 'data/scholar_stats.json';

  const normalizeTitle = (value = '') => value
    .normalize('NFKD')
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();

  const citationLabel = (count) => `${count} ${count === 1 ? 'citation' : 'citations'}`;

  const formatDate = (iso) => {
    if (!iso) return null;
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  async function loadScholarMetrics() {
    try {
      const response = await fetch(`${DATA_URL}?v=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Scholar data HTTP ${response.status}`);
      const data = await response.json();
      const metadata = data.metadata || {};

      document.querySelectorAll('[data-scholar-stat]').forEach((el) => {
        const key = el.dataset.scholarStat;
        const value = metadata[key];
        if (Number.isFinite(Number(value))) el.textContent = Number(value).toLocaleString('en-US');
      });

      const paperMap = new Map();
      Object.values(data.papers || {}).forEach((paper) => {
        if (paper && paper.title) paperMap.set(normalizeTitle(paper.title), paper);
      });

      document.querySelectorAll('[data-scholar-title]').forEach((el) => {
        const paper = paperMap.get(normalizeTitle(el.dataset.scholarTitle));
        if (!paper || !Number.isFinite(Number(paper.citations))) return;
        el.textContent = citationLabel(Number(paper.citations));
      });

      const synced = metadata.source && String(metadata.source).startsWith('google_scholar');
      const formatted = synced ? formatDate(metadata.last_updated) : null;
      document.querySelectorAll('[data-scholar-status]').forEach((el) => {
        el.textContent = formatted
          ? `Google Scholar · last automatic sync ${formatted}`
          : 'Google Scholar · automatic weekly sync';
      });
    } catch (error) {
      console.warn('Scholar metrics unavailable; keeping embedded fallback values.', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadScholarMetrics, { once: true });
  } else {
    loadScholarMetrics();
  }
})();
