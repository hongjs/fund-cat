import type { FavoriteFund, RecentViewFund, LocalStorageData } from '@/types/storage';

const STORAGE_KEYS = {
  FAVORITES: 'fund-cat-favorites',
  RECENT: 'fund-cat-recent',
  THEME: 'fund-cat-theme',
  LOCALE: 'fund-cat-locale',
} as const;

// Initialize default data
const DEFAULT_DATA: LocalStorageData = {
  favorites: [],
  recent: [],
  theme: 'light',
  locale: 'th',
};

// Helper to safely access localStorage
const getStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return null;
};

// Favorites Management
export const getFavorites = (): FavoriteFund[] => {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const data = storage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const addFavorite = (fund: Omit<FavoriteFund, 'added_at'>): void => {
  const storage = getStorage();
  if (!storage) return;

  try {
    const favorites = getFavorites();
    const exists = favorites.some((f) => f.proj_id === fund.proj_id);

    if (!exists) {
      const newFavorite: FavoriteFund = {
        ...fund,
        added_at: new Date().toISOString(),
      };
      favorites.unshift(newFavorite);
      storage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

export const removeFavorite = (projId: string): void => {
  const storage = getStorage();
  if (!storage) return;

  try {
    const favorites = getFavorites();
    const filtered = favorites.filter((f) => f.proj_id !== projId);
    storage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const isFavorite = (projId: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((f) => f.proj_id === projId);
};

// Recent Views Management
export const getRecentViews = (): RecentViewFund[] => {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const data = storage.getItem(STORAGE_KEYS.RECENT);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading recent views:', error);
    return [];
  }
};

export const addRecentView = (fund: Omit<RecentViewFund, 'viewed_at'>): void => {
  const storage = getStorage();
  if (!storage) return;

  try {
    let recent = getRecentViews();

    // Remove if already exists
    recent = recent.filter((r) => r.proj_id !== fund.proj_id);

    // Add to beginning
    const newView: RecentViewFund = {
      ...fund,
      viewed_at: new Date().toISOString(),
    };
    recent.unshift(newView);

    // Keep only last 20 items
    recent = recent.slice(0, 20);

    storage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recent));
  } catch (error) {
    console.error('Error adding recent view:', error);
  }
};

export const clearRecentViews = (): void => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEYS.RECENT, JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing recent views:', error);
  }
};

// Clear all data
export const clearAllData = (): void => {
  const storage = getStorage();
  if (!storage) return;

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      storage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};

// Export all data (for backup or migration)
export const exportData = (): LocalStorageData => {
  return {
    favorites: getFavorites(),
    recent: getRecentViews(),
    theme: (getStorage()?.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light',
    locale: (getStorage()?.getItem(STORAGE_KEYS.LOCALE) as 'th' | 'en') || 'th',
  };
};

// Import data (for restore or migration)
export const importData = (data: Partial<LocalStorageData>): void => {
  const storage = getStorage();
  if (!storage) return;

  try {
    if (data.favorites) {
      storage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(data.favorites));
    }
    if (data.recent) {
      storage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(data.recent));
    }
    if (data.theme) {
      storage.setItem(STORAGE_KEYS.THEME, data.theme);
    }
    if (data.locale) {
      storage.setItem(STORAGE_KEYS.LOCALE, data.locale);
    }
  } catch (error) {
    console.error('Error importing data:', error);
  }
};
