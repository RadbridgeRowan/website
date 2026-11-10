/* Enhance the shared project-list template. All projects remain visible without JS. */
document.querySelectorAll('.project-toggle').forEach((button) => {
  const list = document.getElementById(button.getAttribute('aria-controls'));
  if (!list || list.children.length <= 4) return;
  const rows = Array.from(list.children);

  function setExpanded(expanded) {
    rows.forEach((row, index) => { row.hidden = !expanded && index >= 4; });
    list.dataset.collapsed = String(!expanded);
    button.setAttribute('aria-expanded', String(expanded));
    const label = document.createElement('span');
    label.className = 'project-toggle-label';
    label.textContent = expanded
      ? button.dataset.showFewer
      : button.dataset.showAll;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = expanded ? '↑' : '↓';
    button.replaceChildren(label, arrow);
  }

  setExpanded(false);
  button.hidden = false;
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    setExpanded(expanded);
    if (!expanded) button.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  });
});
