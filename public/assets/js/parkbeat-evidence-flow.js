/* Draw connections between data sources and the dashboard. */
(() => {
  const ns = 'http://www.w3.org/2000/svg';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const make = (name, attributes = {}) => {
    const element = document.createElementNS(ns, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };
  document.querySelectorAll('.pb-evidence-flow').forEach((flow, index) => {
    const svg = flow.querySelector('.pb-source-connections');
    const list = flow.querySelector('.pb-source-pills');
    const target = flow.querySelector('.pb-evidence-dashboard .pb-image-link');
    const pills = [...flow.querySelectorAll('.pb-source-pill')];
    if (!svg || !list || !target || !pills.length) return;
    const prefix = `pb-source-flow-${index}`;
    const defs = make('defs');
    const gradient = make('linearGradient', {id: `${prefix}-edge`, gradientUnits: 'userSpaceOnUse', x1: '0', x2: '0'});
    gradient.append(make('stop', {offset: '0', 'stop-color': 'white'}), make('stop', {offset: '1', 'stop-color': 'black'}));
    const mask = make('mask', {id: `${prefix}-mask`, maskUnits: 'userSpaceOnUse', 'mask-type': 'luminance', x: '0', y: '0'});
    const reveal = make('rect', {x: '0', y: '0', height: '0', fill: `url(#${prefix}-edge)`});
    mask.append(reveal);
    defs.append(gradient, mask);
    let drawFrame = 0;
    let progressFrame = 0;
    let height = 0;
    let first = 0;
    let end = 0;
    let dots = [];

    const updateProgress = () => {
      progressFrame = 0;
      if (!height) return;
      const dashboardTop = target.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      const still = reducedMotion.matches;
      // Begin on entry; finish once the dashboard top reaches 78% of the viewport.
      const progress = Math.max(0, Math.min(1, (viewportHeight - dashboardTop) / (viewportHeight * .22)));
      const front = still ? height : Math.min(height, first + (end - first + 24) * progress);
      gradient.setAttribute('y1', still ? height : front - 24);
      gradient.setAttribute('y2', still ? height + 1 : front);
      reveal.setAttribute('height', !still && progress === 0 ? '0' : front);
      // Include the 24px fade when calculating dot opacity.
      const connected = still ? 1 : Math.max(0, Math.min(1, (front - end) / 24));
      dots.forEach(dot => dot.setAttribute('opacity', connected));
    };

    const draw = () => {
      drawFrame = 0;
      if (getComputedStyle(svg).position !== 'absolute') return;
      const bounds = flow.getBoundingClientRect();
      const dashboard = target.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      height = bounds.height;
      end = dashboard.top - bounds.top;
      svg.setAttribute('viewBox', `0 0 ${bounds.width} ${height}`);
      mask.setAttribute('width', bounds.width);
      mask.setAttribute('height', height);
      reveal.setAttribute('width', bounds.width);
      const paths = make('g', {class: 'pb-source-paths', mask: `url(#${prefix}-mask)`});
      dots = [];
      const path = d => paths.append(make('path', {d}));
      const dot = x => dots.push(make('circle', {cx: x, cy: end, r: '3', opacity: '0'}));
      if (getComputedStyle(flow).getPropertyValue('--pb-source-stacked').trim() === '1') {
        const bottom = list.getBoundingClientRect().bottom - bounds.top;
        const center = dashboard.left - bounds.left + dashboard.width / 2;
        const left = bounds.width * .22, right = bounds.width * .78, join = bottom + 42;
        first = bottom + 8;
        path(`M ${left} ${first} C ${left} ${join}, ${center} ${bottom + 12}, ${center} ${join} M ${right} ${first} C ${right} ${join}, ${center} ${bottom + 12}, ${center} ${join} M ${center} ${join} L ${center} ${end}`);
        dot(center);
      } else {
        first = Infinity;
        // Preserve left-to-right endpoint order to minimize crossings through the source field.
        [...pills].sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left).forEach((pill, i) => {
          const rect = pill.getBoundingClientRect();
          const x1 = rect.left - bounds.left + rect.width / 2;
          const y1 = rect.bottom - bounds.top;
          const x2 = dashboard.left - bounds.left + dashboard.width * (.10 + .80 * i / Math.max(1, pills.length - 1));
          const dy = end - y1;
          first = Math.min(first, y1);
          path(`M ${x1} ${y1} C ${x1} ${y1 + dy * .56}, ${x2} ${end - dy * .14}, ${x2} ${end}`);
          dot(x2);
        });
      }
      svg.replaceChildren(defs, paths, ...dots);
      updateProgress();
    };
    const scheduleDraw = () => { if (!drawFrame) drawFrame = requestAnimationFrame(draw); };
    const scheduleProgress = () => { if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress); };
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(scheduleDraw);
      [flow, list, target, ...pills].forEach(el => observer.observe(el));
    }
    window.addEventListener('resize', scheduleDraw);
    window.addEventListener('scroll', scheduleProgress, {passive: true});
    reducedMotion.addEventListener('change', scheduleProgress);
    document.fonts?.ready.then(scheduleDraw);
    window.addEventListener('load', scheduleDraw, {once: true});
    scheduleDraw();
  });
})();
