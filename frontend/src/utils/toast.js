export function showToast(message, type = 'info', duration = 3500) {
  const id = `toast-${Date.now()}`;
  const el = document.createElement('div');
    try {
      // Debug to help trace calls
      // eslint-disable-next-line no-console
      console.debug('showToast:', { message, type, duration });

      // Ensure document.body exists (in rare timing cases)
      if (typeof document === 'undefined' || !document.body) {
        // Try again shortly after
        setTimeout(() => showToast(message, type, duration), 100);
        return;
      }

      // Create a container for stacking toasts if it doesn't exist
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.position = 'fixed';
        container.style.right = '1rem';
        container.style.bottom = '1rem';
        container.style.zIndex = '9999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column-reverse';
        container.style.gap = '0.5rem';
        document.body.appendChild(container);
      }

      const id = `toast-${Date.now()}`;
      const el = document.createElement('div');
      el.id = id;
      const bg = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-blue-600';
      el.className = `max-w-sm w-full px-4 py-3 rounded shadow-lg text-white ${bg}`;
      el.style.opacity = '0';
      el.style.transition = 'opacity 200ms ease-in-out, transform 200ms ease-in-out';
      el.style.transform = 'translateY(8px)';
      el.style.marginTop = '0.5rem';
      el.innerText = message;

      container.appendChild(el);
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';

      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        setTimeout(() => {
          el.remove();
          // remove container if empty
          if (container && container.children.length === 0) container.remove();
        }, 220);
      }, duration);
    } catch (err) {
      // Fallback: use alert so user sees message if toast fails
      // eslint-disable-next-line no-alert
      alert(message);
    }
}
