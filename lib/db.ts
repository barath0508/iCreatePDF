'use client';

// Client-side IndexedDB wrapper to track recent operations and output files locally.
// Database: 'icreatepdf_db', Store: 'recent_files'.
// Files remain strictly local inside the browser sandbox — never uploaded to any server.

const DB_NAME = 'icreatepdf_db';
const STORE_NAME = 'recent_files';
const DB_VERSION = 2; // Bumped version to support native Blob storage
const MAX_RECENT_FILES = 8;
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours retention

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
  blob?: Blob;
}

export async function addRecentFile(file: {
  name: string;
  size: number;
  toolName: string;
  href: string;
  downloadUrl?: string;
  blob?: Blob;
}) {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // Fetch existing files
    const existing = await new Promise<RecentFile[]>((resolve) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });

    const now = Date.now();

    // Prune files older than 24h
    for (const item of existing) {
      if (now - item.timestamp > MAX_AGE_MS) {
        store.delete(item.id);
      }
    }

    // Sort descending by timestamp
    existing.sort((a, b) => b.timestamp - a.timestamp);

    // Limit database size
    if (existing.length >= MAX_RECENT_FILES) {
      for (let i = MAX_RECENT_FILES - 1; i < existing.length; i++) {
        store.delete(existing[i].id);
      }
    }

    const newRecord: RecentFile = {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      toolName: file.toolName,
      href: file.href,
      timestamp: now,
      downloadUrl: file.downloadUrl,
      blob: file.blob,
    };

    store.put(newRecord);
  } catch (err) {
    console.error('Error adding recent file to db:', err);
  }
}

export async function deleteRecentFile(id: string) {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
  } catch (err) {
    console.error('Error deleting recent file:', err);
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
        const sorted = (req.result || []).sort(
          (a: RecentFile, b: RecentFile) => b.timestamp - a.timestamp
        );
        resolve(sorted);
      };
      req.onerror = () => resolve([]);
    });
  } catch (err) {
    console.error('Error getting recent files:', err);
    return [];
  }
}

export async function downloadRecentFile(id: string): Promise<boolean> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const record = await new Promise<RecentFile | undefined>((resolve) => {
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(undefined);
    });

    if (record?.blob) {
      const url = URL.createObjectURL(record.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = record.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      return true;
    } else if (record?.downloadUrl) {
      const link = document.createElement('a');
      link.href = record.downloadUrl;
      link.download = record.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error downloading recent file:', err);
    return false;
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
