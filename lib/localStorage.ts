export const STORAGE_KEYS = {
  CHECKLIST: 'taiwan-tour-checklist',
  NOTES: 'taiwan-tour-notes',
  EXPENSES: 'taiwan-tour-expenses',
  TRIP_START_DATE: 'taiwan-tour-start-date',
  EXCHANGE_RATE: 'taiwan-tour-exchange-rate',
  FAVORITE_PHRASES: 'taiwan-tour-favorite-phrases',
} as const;

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage:`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage:`, error);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage:`, error);
  }
}
