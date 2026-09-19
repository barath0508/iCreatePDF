'use client';

import { useEffect } from 'react';

interface UseClipboardFileOptions {
  onFilePasted: (files: File[]) => void;
  acceptedExtensions?: string[]; // e.g. ['pdf', 'png', 'jpg', 'jpeg']
  enabled?: boolean;
}

export function useClipboardFile({
  onFilePasted,
  acceptedExtensions = ['pdf'],
  enabled = true,
}: UseClipboardFileOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handlePaste = (e: ClipboardEvent) => {
      // Don't intercept paste if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (!e.clipboardData) return;

      const items = e.clipboardData.items;
      const matchedFiles: File[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (!file) continue;

          const ext = file.name.split('.').pop()?.toLowerCase();
          const mime = file.type.toLowerCase();

          const matchesExt = ext && acceptedExtensions.includes(ext);
          const matchesMime = acceptedExtensions.some((accepted) =>
            mime.includes(accepted)
          );

          if (matchesExt || matchesMime) {
            matchedFiles.push(file);
          }
        }
      }

      if (matchedFiles.length > 0) {
        e.preventDefault();
        onFilePasted(matchedFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilePasted, acceptedExtensions, enabled]);
}

export default useClipboardFile;
