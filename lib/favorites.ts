'use client';

const FAVORITES_KEY = 'icreatepdf_favorites';

export function getFavorites(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function saveFavorites(favs: Set<string>) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favs)));
  } catch {}
}

export function toggleFavorite(href: string): Set<string> {
  const favs = getFavorites();
  if (favs.has(href)) {
    favs.delete(href);
  } else {
    favs.add(href);
  }
  saveFavorites(favs);
  return favs;
}

export function isFavorite(href: string): boolean {
  return getFavorites().has(href);
}
