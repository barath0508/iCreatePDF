'use client';

// A simple client-side IndexedDB wrapper to track recent operations locally.
// The database is called 'icreatepdf_db' and the store is 'recent_files'.

const DB_NAME = 'icreatepdf_db';
const STORE_NAME = 'recent_files';
const DB_VERSION = 1;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('IndexedDB is only available in the browser'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export interface RecentFile {
  id: string;
  name: string;
  size: number;
  toolName: string;
  href: string;
  timestamp: number;
  downloadUrl?: string; 
}

export async function addRecentFile(file: { name: string; size: number; toolName: string; href: string; downloadUrl?: string }) {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // Get existing files to limit to top 5
    const existing = await new Promise<RecentFile[]>((resolve) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });

    // Sort by timestamp descending
    existing.sort((a, b) => b.timestamp - a.timestamp);

    // Limit database size: if we have 5 or more, delete the oldest
    if (existing.length >= 5) {
      for (let i = 4; i < existing.length; i++) {
        store.delete(existing[i].id);
      }
    }

    const newRecord: RecentFile = {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      toolName: file.toolName,
      href: file.href,
      timestamp: Date.now(),
      downloadUrl: file.downloadUrl,
    };

    store.put(newRecord);
  } catch (err) {
    console.error('Error adding recent file to db:', err);
  }
}

export async function getRecentFiles(): Promise<RecentFile[]> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve) => {
      const req = store.getAll();
      req.onsuccess = () => {
        const sorted = (req.result || []).sort((a: RecentFile, b: RecentFile) => b.timestamp - a.timestamp);
        resolve(sorted);
      };
      req.onerror = () => resolve([]);
    });
  } catch (err) {
    console.error('Error getting recent files:', err);
    return [];
  }
}

export async function clearRecentFiles() {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
  } catch (err) {
    console.error('Error clearing recent files:', err);
  }
}
