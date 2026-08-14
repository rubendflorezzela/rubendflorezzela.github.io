(() => {
  function applyFilter(filter) {
    const items = document.querySelectorAll('.pub-item');
    items.forEach((item) => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
    });

    document.querySelectorAll('.pub-year').forEach((year) => {
      let node = year.nextElementSibling;
      let hasVisibleItem = false;
      while (node && !node.classList.contains('pub-year')) {
        if (node.classList.contains('pub-item') && !node.classList.contains('hidden')) {
          hasVisibleItem = true;
          break;
        }
        node = node.nextElementSibling;
      }
      year.hidden = !hasVisibleItem;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.pf');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        applyFilter(button.dataset.filter || 'all');
      });
    });
    applyFilter('all');
  });
})();
