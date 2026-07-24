'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Shield, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  title?: string;
  description?: string;
  badgeText?: string;
  className?: string;
  files?: File[];
  onRemoveFile?: (index: number) => void;
}

export function Dropzone({
  onFilesSelected,
  accept = '.pdf,application/pdf',
  multiple = true,
  maxFiles,
  title = 'Drop files here or click to upload',
  description = '100% Private Client-Side Memory Execution — Files Never Leave Your Browser',
  badgeText = 'CLIENT-SIDE PRIVACY ENGINE',
  className,
  files = [],
  onRemoveFile,
}: DropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const droppedFiles = Array.from(e.dataTransfer.files);
        onFilesSelected(droppedFiles);
      }
    },
    [onFilesSelected]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files);
        onFilesSelected(selectedFiles);
      }
    },
    [onFilesSelected]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full space-y-4 min-w-0', className)}>
      <motion.div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.002 }}
        whileTap={{ scale: 0.998 }}
        animate={{
          borderColor: isDragActive ? 'var(--foreground)' : 'var(--border)',
          backgroundColor: isDragActive
            ? 'rgba(127, 127, 127, 0.08)'
            : 'var(--card)',
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-6 sm:p-8 lg:p-10 text-center transition-shadow duration-200 hover:border-foreground/50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/50'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{
              y: isDragActive ? -6 : 0,
              scale: isDragActive ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background shadow-xs"
          >
            <Upload className="h-6 w-6 text-foreground stroke-[1.5]" />
          </motion.div>

          <div className="space-y-2 max-w-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-0.5 text-xs font-mono font-bold tracking-wider text-foreground uppercase">
              <Shield className="h-3 w-3 stroke-[2]" />
              {badgeText}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground pt-1 font-display leading-snug">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-normal">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold text-foreground shadow-xs hover:border-foreground/40 transition-colors">
              Select files from device
            </span>
          </div>
        </div>
      </motion.div>

      {/* Selected File Queue */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 pt-1"
          >
            <div className="flex items-center justify-between text-xs font-mono uppercase text-muted-foreground font-bold px-1">
              <span>Selected Documents ({files.length})</span>
              <span>Ready</span>
            </div>

            <div className="grid gap-2 max-h-60 overflow-y-auto pr-1">
              {files.map((file, idx) => (
                <motion.div
                  key={`${file.name}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                      <FileCheck className="h-4 w-4 text-foreground stroke-[1.5]" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-[10px] font-mono text-muted-foreground font-medium">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  {onRemoveFile && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFile(idx);
                      }}
                      className="ml-2 flex h-7 w-7 items-center justify-center rounded-lg border border-transparent text-muted-foreground hover:border-border hover:bg-background hover:text-foreground transition-colors"
                      title="Remove file"
                    >
                      <X className="h-3.5 w-3.5 stroke-[2]" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
