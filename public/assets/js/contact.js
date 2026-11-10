/* Contact form validation and Formspree submission. */
(() => {
  const form = document.querySelector('#contact-form');
  if (!form || form.dataset.enhanced) return;
  form.dataset.enhanced = 'true';
  const fields = [...form.querySelectorAll('input:not([name="_gotcha"]), textarea')];
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('#contact-status');
  let pending = false;

  const endpoint = () => {
    const action = form.getAttribute('action') || '';
    return /^https:\/\/formspree\.io\/f\/[a-z0-9_-]+$/i.test(action) &&
      !/your.?form|placeholder/i.test(action) ? action : null;
  };
  const showStatus = message => { status.textContent = message; };
  const showError = (field, message) => {
    const error = document.getElementById(field.id + '-error');
    error.textContent = message ? 'Error: ' + message : '';
    error.hidden = !message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  };
  const validate = field => {
    field.setCustomValidity('');
    if (field.required && !field.value.trim()) field.setCustomValidity(field.name === 'email' ? 'Enter your email address.' : 'Enter a message.');
    const message = field.validity.typeMismatch ? 'Enter an email address in the format name@example.com.' : field.validationMessage;
    showError(field, message);
    return !message;
  };
  fields.forEach(field => field.addEventListener('input', () => {
    if (field.hasAttribute('aria-invalid')) validate(field);
    if (!pending) showStatus('');
  }));

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending) return;
    showStatus('');
    const invalid = fields.filter(field => !validate(field));
    if (invalid.length) {
      showStatus('Please check the highlighted fields.');
      invalid[0].focus();
      return;
    }
    const action = endpoint();
    if (!action) {
      showStatus('This is a preview. Your message has not been sent.');
      return;
    }
    if (!navigator.onLine) {
      showStatus('You are offline. Reconnect and try again. Your message is still here.');
      return;
    }
    const data = new FormData(form);
    pending = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    fields.forEach(field => { field.readOnly = true; });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(action, {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
        credentials: 'omit', signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result && typeof result === 'object' && !result.errors && result.ok !== false) {
        form.reset();
        showStatus('Thank you. Your message has been submitted.');
        status.focus({ preventScroll: true });
      } else if (response.status === 429) {
        showStatus('Too many attempts. Please wait a moment before trying again. Your message is still here.');
      } else if (!response.ok) {
        let firstInvalid;
        for (const error of Array.isArray(result?.errors) ? result.errors : []) {
          const field = fields.find(item => item.name === error.field);
          if (field && typeof error.message === 'string') {
            showError(field, error.message);
            firstInvalid ||= field;
          }
        }
        showStatus(firstInvalid ? 'Please check the highlighted field. Your message has not been submitted.' : 'The form could not accept your message. Please try again. Your message is still here.');
        // Focus after controls become editable again in finally.
        if (firstInvalid) form.dataset.focusError = firstInvalid.id;
      } else {
        showStatus('We could not confirm your submission. Please wait before trying again. Your message is still here.');
      }
    } catch {
      showStatus('We could not confirm your submission. Check your connection before trying again. Your message is still here.');
    } finally {
      clearTimeout(timeout);
      pending = false;
      button.disabled = false;
      button.textContent = 'Send message';
      form.removeAttribute('aria-busy');
      fields.forEach(field => { field.readOnly = false; });
      if (form.dataset.focusError) {
        document.getElementById(form.dataset.focusError)?.focus();
        delete form.dataset.focusError;
      }
    }
  });
  // Display native validation errors beside the fields.
  form.noValidate = true;
  button.disabled = false;
})();
