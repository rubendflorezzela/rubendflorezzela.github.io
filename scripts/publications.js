(() => {
  const categoryList = (item) =>
    (item.dataset.cat || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  function applyFilter(filter) {
    const items = Array.from(document.querySelectorAll('.pub-item'));

    items.forEach((item) => {
      const visible = filter === 'all' || categoryList(item).includes(filter);

      // Use both the native hidden state and the existing CSS class. This
      // keeps filtering reliable even if an older stylesheet is cached.
      item.hidden = !visible;
      item.classList.toggle('hidden', !visible);
    });

    document.querySelectorAll('.pub-year').forEach((year) => {
      let node = year.nextElementSibling;
      let hasVisibleItem = false;

      while (node && !node.classList.contains('pub-year')) {
        if (node.classList.contains('pub-item') && !node.hidden) {
          hasVisibleItem = true;
          break;
        }
        node = node.nextElementSibling;
      }

      year.hidden = !hasVisibleItem;
    });
  }

  function initPublicationFilters() {
    const filterBar = document.querySelector('.pub-filters');
    if (!filterBar) return;

    const buttons = Array.from(filterBar.querySelectorAll('[data-filter]'));

    filterBar.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button || !filterBar.contains(button)) return;

      event.preventDefault();
      const filter = button.dataset.filter || 'all';

      buttons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle('active', active);
        candidate.setAttribute('aria-pressed', String(active));
      });

      applyFilter(filter);
    });

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    });

    applyFilter('all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPublicationFilters, { once: true });
  } else {
    initPublicationFilters();
  }
})();
