/* Draw the Parkbeat trail and reveal it at the viewport midpoint. */
(() => {
  const journey = document.querySelector('.parkbeat-page .pb-included-rows');
  if (!journey) return;
  const trail = journey.querySelector('.pb-journey-trail');
  const rows = [...journey.querySelectorAll('.pb-included-row')];
  if (!trail || !rows.length) return;
  const ns = 'http://www.w3.org/2000/svg';
  const make = (name, attributes = {}) => {
    const element = document.createElementNS(ns, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };
  const defs = make('defs');
  const gradient = make('linearGradient', {id: 'pb-journey-soft-edge', gradientUnits: 'userSpaceOnUse', x1: '0', x2: '0'});
  gradient.append(make('stop', {offset: '0', 'stop-color': 'white'}), make('stop', {offset: '1', 'stop-color': 'black'}));
  const mask = make('mask', {id: 'pb-journey-reveal', maskUnits: 'userSpaceOnUse', 'mask-type': 'luminance', x: '0', y: '0'});
  const reveal = make('rect', {x: '0', y: '0', height: '0', fill: 'url(#pb-journey-soft-edge)'});
  mask.append(reveal);
  defs.append(gradient, mask);
  const base = make('path', {class: 'pb-journey-base'});
  const progress = make('path', {class: 'pb-journey-progress', mask: 'url(#pb-journey-reveal)'});
  const circles = rows.map(() => make('circle', {r: '5'}));
  trail.replaceChildren(defs, base, progress, ...circles);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let points = [];
  let height = 0;
  let drawFrame = 0;
  let progressFrame = 0;

  function updateProgress() {
    progressFrame = 0;
    if (!points.length) return;
    // Position the reveal edge at the viewport midpoint.
    const middle = window.innerHeight / 2 - journey.getBoundingClientRect().top;
    const first = points[0].y;
    const still = reducedMotion.matches;
    const front = still ? height : Math.max(0, Math.min(height, middle));
    // Fade the last 32px of the visible trail.
    gradient.setAttribute('y1', still ? height : front - 32);
    gradient.setAttribute('y2', still ? height + 1 : front);
    reveal.setAttribute('height', !still && middle < first ? '0' : front);
    circles.forEach((circle, i) => circle.classList.toggle('is-reached', still || middle >= points[i].y));
  }

  function draw() {
    drawFrame = 0;
    // Avoid intrinsic SVG sizing affecting layout if the stylesheet is unavailable.
    if (getComputedStyle(trail).position !== 'absolute') return;
    const bounds = journey.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    height = bounds.height;
    points = rows.map(row => {
      const rect = row.getBoundingClientRect();
      const stacked = getComputedStyle(row).getPropertyValue('--pb-stacked').trim() === '1';
      const copyElement = row.querySelector('.pb-topic-copy, .pb-survey-copy');
      const copy = copyElement.getBoundingClientRect();
      const lead = copyElement.firstElementChild;
      const leadCenter = lead.getBoundingClientRect().top - bounds.top + Number.parseFloat(getComputedStyle(lead).lineHeight) / 2;
      const visual = row.querySelector('.pb-topic-visual').getBoundingClientRect();
      const left = copy.left < visual.left ? copy : visual;
      const right = copy.left < visual.left ? visual : copy;
      return {x: stacked ? 6 : (left.right + right.left) / 2 - bounds.left,
              y: stacked ? leadCenter : rect.top - bounds.top + rect.height / 2};
    });
    trail.setAttribute('viewBox', `0 0 ${bounds.width} ${height}`);
    mask.setAttribute('width', bounds.width);
    mask.setAttribute('height', height);
    reveal.setAttribute('width', bounds.width);
    let d = `M ${points[0].x} ${points[0].y}`;
    points.slice(1).forEach((point, index) => {
      const previous = points[index];
      const mid = (previous.y + point.y) / 2;
      d += ` C ${previous.x} ${mid} ${point.x} ${mid} ${point.x} ${point.y}`;
    });
    base.setAttribute('d', d);
    progress.setAttribute('d', d);
    circles.forEach((circle, i) => {
      circle.setAttribute('cx', points[i].x);
      circle.setAttribute('cy', points[i].y);
    });
    updateProgress();
  }
  function scheduleDraw() {
    if (!drawFrame) drawFrame = requestAnimationFrame(draw);
  }
  function scheduleProgress() {
    if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(journey);
    rows.forEach(row => observer.observe(row));
  }
  window.addEventListener('resize', scheduleDraw);
  window.addEventListener('scroll', scheduleProgress, {passive: true});
  reducedMotion.addEventListener('change', scheduleProgress);
  window.addEventListener('load', scheduleDraw, {once: true});
  document.fonts?.ready.then(scheduleDraw);
  scheduleDraw();
})();
