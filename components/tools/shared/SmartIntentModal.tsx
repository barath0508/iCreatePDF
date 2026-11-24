'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, X, FileQuestion, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmartIntentSuggestion } from '@/lib/file-intent';
import { setPreloadedFiles } from '@/lib/preloader';

interface SmartIntentModalProps {
  suggestion: SmartIntentSuggestion | null;
  onDismiss: () => void;
}

export function SmartIntentModal({ suggestion, onDismiss }: SmartIntentModalProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };
    if (suggestion) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [suggestion, onDismiss]);

  if (!suggestion) return null;

  const handleSwitch = () => {
    // Preload the dropped file into memory
    setPreloadedFiles([suggestion.file]);
    onDismiss();
    router.push(suggestion.targetHref);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0 duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="smart-intent-title"
    >
      <div
        className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDismiss}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
          aria-label="Close suggestion"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-brand/10 text-brand border border-brand/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand">
              Smart File Routing
            </span>
            <h3 id="smart-intent-title" className="text-base sm:text-lg font-bold text-foreground">
              Different Format Detected
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-background/60 border border-border/80 space-y-1.5 font-mono text-xs">
          <div className="flex justify-between items-center text-foreground font-medium truncate">
            <span className="truncate max-w-[240px]">{suggestion.file.name}</span>
            <span className="text-[11px] text-muted-foreground">{formatFileSize(suggestion.file.size)}</span>
          </div>
          <p className="font-sans text-xs text-muted-foreground leading-relaxed pt-1">
            {suggestion.reason}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <Button
            onClick={handleSwitch}
            className="flex-1 bg-brand hover:bg-brand/90 text-brand-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm"
          >
            <span>Switch to {suggestion.targetToolName}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            onClick={onDismiss}
            className="text-xs font-medium py-3 rounded-xl"
          >
            Stay Here
          </Button>
        </div>
      </div>
    </div>
  );
}
