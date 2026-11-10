/* Anchor offsets and heading focus for the work directory. */
(() => {
  const header = document.querySelector('.site-header');

  function updateOffset() {
    const style = header && getComputedStyle(header);
    const pinned = style && ['sticky', 'fixed'].includes(style.position);
    const offset = 24 + (pinned ? header.getBoundingClientRect().height + (parseFloat(style.top) || 0) : 0);
    document.documentElement.style.setProperty('--work-scroll-offset', `${offset}px`);
  }

  function focusFragment() {
    if (!['#parks', '#resilience'].includes(location.hash)) return;
    document.querySelector(`${location.hash} h2`)?.focus({ preventScroll: true });
  }

  updateOffset();
  if (header) new ResizeObserver(updateOffset).observe(header);
  addEventListener('resize', updateOffset);
  addEventListener('hashchange', focusFragment);
  focusFragment();
})();
