const TIMEOUT = 5000;

let toasts = [];
let nextId = 1;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeToasts(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getToasts() {
  return toasts;
}

export function dismissToast(id) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
}

export function showToast(type, message) {
  const id = nextId++;
  toasts = [{ id, type, message }, ...toasts];
  emit();
  setTimeout(() => dismissToast(id), TIMEOUT);
}
