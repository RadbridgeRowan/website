/* Scroll the partner list with previous and next controls. */
(() => {
  const section = document.querySelector('.pb-partners');
  if (!section) return;
  const rail = section.querySelector('.pb-partner-list');
  const items = [...rail.children];
  const controls = section.querySelector('.pb-partner-controls');
  const previous = controls.querySelector('[data-direction="previous"]');
  const next = controls.querySelector('[data-direction="next"]');
  const position = controls.querySelector('.pb-partner-position');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let frame;

  function update() {
    const overflow = rail.scrollWidth > rail.clientWidth + 2;
    controls.hidden = !overflow;
    if (overflow) rail.setAttribute('tabindex', '0');
    else rail.removeAttribute('tabindex');
    const left = rail.getBoundingClientRect().left;
    let nearest = Infinity;
    items.forEach((item, index) => {
      const distance = Math.abs(item.getBoundingClientRect().left - left);
      if (distance < nearest) { nearest = distance; current = index; }
    });
    const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
    if (overflow && atEnd) current = items.length - 1;
    previous.disabled = !overflow || rail.scrollLeft <= 2;
    next.disabled = !overflow || atEnd;
    position.textContent = `${current + 1} / ${items.length}`;
    position.setAttribute('aria-label', `Organization ${current + 1} of ${items.length}`);
  }

  function moveTo(index) {
    current = Math.max(0, Math.min(items.length - 1, index));
    const target = items[current].getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;
    rail.scrollTo({ left: target, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }

  previous.addEventListener('click', () => moveTo(current - 1));
  next.addEventListener('click', () => moveTo(current + 1));
  rail.addEventListener('keydown', event => {
    if (event.target !== rail || controls.hidden) return;
    const targets = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: items.length - 1 };
    if (Object.hasOwn(targets, event.key)) {
      event.preventDefault();
      moveTo(targets[event.key]);
    }
  });
  rail.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }, { passive: true });
  new ResizeObserver(update).observe(rail);
  update();
})();
