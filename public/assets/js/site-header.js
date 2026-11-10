/* Show the header when scrolling up. */
(() => {
  const header = document.querySelector('.site-header');
  if (!header || header.dataset.scrollHeaderReady) return;
  header.dataset.scrollHeaderReady = 'true';

  const root = document.documentElement;
  const TOP_ZONE = 32;
  const HIDE_DISTANCE = 32;
  const REVEAL_DISTANCE = 8;
  let height = 0;
  let maxScroll = 0;
  let enabled = false;
  let hidden = false;
  let origin = 0;
  let timer = null;
  let pointerDown = false;

  // Clamp elastic overscroll at both ends so bounce does not reverse direction.
  const scrollPosition = () => Math.max(0, Math.min(window.scrollY, maxScroll));
  const engaged = () => pointerDown || header.contains(document.activeElement) ||
    Boolean(header.querySelector('[aria-expanded="true"], details[open]'));

  function contentFocusOverlaps() {
    const active = document.activeElement;
    if (!active || active === document.body || header.contains(active) ||
        active.matches('.skip') || !active.matches(':focus-visible')) return false;
    const bounds = active.getBoundingClientRect();
    return bounds.top < height + 8 && bounds.bottom > 0;
  }

  function setHidden(value) {
    const next = enabled && value && !engaged() && scrollPosition() > TOP_ZONE;
    if (next === hidden) return;
    hidden = next;
    header.classList.toggle('is-header-hidden', hidden);
  }

  function reset() {
    clearTimeout(timer);
    timer = null;
    origin = scrollPosition();
    setHidden(contentFocusOverlaps());
  }

  function measure() {
    const nextHeight = header.offsetHeight;
    // On very short/zoomed viewports, let the complete navigation scroll naturally.
    const nextEnabled = nextHeight + 80 <= window.innerHeight;
    const changed = nextHeight !== height || nextEnabled !== enabled;
    height = nextHeight;
    enabled = nextEnabled;
    root.classList.add('has-scroll-header');
    header.classList.toggle('is-header-static', !enabled);
    const offset = `${24 + (enabled ? height : 0)}px`;
    if (root.style.getPropertyValue('--site-header-offset') !== offset) {
      root.style.setProperty('--site-header-offset', offset);
    }
    maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
    if (changed) reset();
  }

  function update() {
    timer = null;
    const y = scrollPosition();
    if (!enabled || y <= TOP_ZONE || engaged()) {
      setHidden(false);
      origin = y;
      return;
    }
    // Separate thresholds provide hysteresis: tiny reversals cannot flicker it.
    if (hidden) {
      origin = Math.max(origin, y);
      if (origin - y >= REVEAL_DISTANCE && !contentFocusOverlaps()) {
        setHidden(false);
        origin = y;
      }
    } else {
      origin = Math.min(origin, y);
      if (y > Math.max(height, 96) && y - origin >= HIDE_DISTANCE) {
        setHidden(true);
        origin = y;
      }
    }
  }

  // A bounded, passive scroll handler; transform writes happen only on state changes.
  window.addEventListener('scroll', () => {
    if (timer === null) timer = setTimeout(update, 20);
  }, { passive: true });

  document.addEventListener('focusin', () => {
    origin = scrollPosition();
    if (engaged()) setHidden(false);
    else if (contentFocusOverlaps()) setHidden(true);
  });
  header.addEventListener('focusout', () => queueMicrotask(reset));
  header.addEventListener('pointerdown', () => { pointerDown = true; reset(); });
  const releasePointer = () => {
    if (!pointerDown) return;
    pointerDown = false;
    reset();
  };
  document.addEventListener('pointerup', releasePointer);
  document.addEventListener('pointercancel', releasePointer);
  header.addEventListener('toggle', reset, true);

  window.addEventListener('resize', () => { measure(); reset(); });
  window.addEventListener('pageshow', () => { measure(); reset(); });
  window.addEventListener('pagehide', () => { clearTimeout(timer); timer = null; });
  window.addEventListener('hashchange', reset);
  window.addEventListener('popstate', reset);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { measure(); reset(); }
  });
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    observer.observe(document.body);
  }
  measure();
  reset();
})();
