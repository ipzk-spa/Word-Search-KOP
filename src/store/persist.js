/**
 * @module store/persist
 * @description Локальне сховище (localStorage): читання та запис JSON для Zustand store.
 */

/**
 * Читає JSON з localStorage.
 * @param {string} key Ключ сховища.
 * @param {*} fallback Значення за замовчуванням.
 * @returns {*}
 */
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Записує JSON у localStorage.
 * @param {string} key Ключ сховища.
 * @param {*} value Дані для серіалізації.
 */
export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}
