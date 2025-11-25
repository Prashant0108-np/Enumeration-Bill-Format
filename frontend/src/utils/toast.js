export function showToast(message, type = 'info', duration = 3500) {
  const id = `toast-${Date.now()}`;
  const el = document.createElement('div');
  el.id = id;
  el.className = `fixed right-4 bottom-4 z-50 max-w-sm w-full px-4 py-3 rounded shadow-lg text-white ${
    type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-blue-600'
  }`;
  el.style.opacity = '0';
  el.style.transition = 'opacity 200ms ease-in-out, transform 200ms ease-in-out';
  el.style.transform = 'translateY(8px)';
  el.innerText = message;
  document.body.appendChild(el);
  // force reflow
  void el.offsetWidth;
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';

  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => el.remove(), 220);
  }, duration);
}
