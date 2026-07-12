'use client';

// In-memory registry to pass File handles between pages during client-side navigation.
// Since Next.js uses client-side routing, the JS execution context is preserved.

let preloadedFilesList: File[] = [];

export function setPreloadedFiles(files: File[]) {
  if (typeof window !== 'undefined') {
    preloadedFilesList = files;
  }
}

export function getPreloadedFiles(): File[] {
  if (typeof window !== 'undefined') {
    const files = [...preloadedFilesList];
    preloadedFilesList = []; // Clear state after read to prevent reuse
    return files;
  }
  return [];
}

export function hasPreloadedFiles(): boolean {
  return preloadedFilesList.length > 0;
}
