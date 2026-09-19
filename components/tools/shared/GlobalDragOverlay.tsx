'use client';

import React, { useState, useEffect } from 'react';
import { Upload, FileText, ShieldCheck } from 'lucide-react';

interface GlobalDragOverlayProps {
  onFileDrop: (files: FileList | File[]) => void;
  acceptedTypes?: string[];
  message?: string;
}

export function GlobalDragOverlay({
  onFileDrop,
  message = 'Drop PDF here to open',
}: GlobalDragOverlayProps) {
  const [isWindowDragging, setIsWindowDragging] = useState(false);
  const dragCounter = React.useRef(0);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current++;
      if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
        setIsWindowDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current--;
      if (dragCounter.current <= 0) {
        dragCounter.current = 0;
        setIsWindowDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsWindowDragging(false);

      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFileDrop(e.dataTransfer.files);
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [onFileDrop]);

  if (!isWindowDragging) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl p-12 rounded-3xl border-2 border-dashed border-brand bg-card shadow-2xl flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-200">
        <div className="p-5 rounded-2xl bg-brand/15 text-brand border border-brand/20 shadow-sm animate-bounce">
          <Upload className="w-10 h-10 stroke-[2]" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-display text-foreground">
            {message}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Release anywhere to load directly into the workspace
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono font-medium text-brand bg-brand/10 px-3.5 py-1.5 rounded-full border border-brand/20">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% In-Browser Privacy
        </div>
      </div>
    </div>
  );
}

export default GlobalDragOverlay;
