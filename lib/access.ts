const KEY = "hasAccess";
const WINDOW_MS = 12 * 60 * 60 * 1000; // 12 hours

export function grantAccess() {
  localStorage.setItem(KEY, new Date().toISOString());
}

export function hasValidAccess(): boolean {
  const stored = localStorage.getItem(KEY);
  if (!stored) return false;
  const grantedAt = new Date(stored).getTime();
  if (isNaN(grantedAt)) return false;
  return Date.now() - grantedAt < WINDOW_MS;
}
