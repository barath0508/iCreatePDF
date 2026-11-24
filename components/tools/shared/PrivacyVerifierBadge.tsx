'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wifi, WifiOff, Info, CheckCircle2, Lock } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface PrivacyVerifierBadgeProps {
  className?: string;
  toolName?: string;
}

export function PrivacyVerifierBadge({
  className = '',
  toolName = 'This tool',
}: PrivacyVerifierBadgeProps) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Verify privacy and security: 100% Client-Side Engine, 0 KB uploaded"
          className={`inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 hover:bg-card px-3 py-1 text-[11px] sm:text-xs font-mono font-medium text-foreground/80 hover:text-foreground transition-all shadow-2xs hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring select-none ${className}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 stroke-[2.2]" />
          <span className="font-semibold text-foreground">0 KB Uploaded</span>
          <span className="text-muted-foreground hidden sm:inline">&bull; 100% Client-Side</span>
          <Info className="h-3 w-3 text-muted-foreground/70 ml-0.5" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        side="bottom"
        className="w-80 sm:w-96 p-5 bg-card/98 border border-border backdrop-blur-2xl shadow-xl rounded-2xl space-y-4"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0">
            <Lock className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground font-display">
              Zero-Upload Privacy Architecture
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {toolName} processes all documents entirely in your web browser using WebAssembly.
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-muted-foreground pt-1 border-t border-border/50">
          <div className="flex items-center gap-2 text-foreground/90 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Files never leave your device memory</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/90 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Zero cloud databases, logs, or external uploads</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/90 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Data is cleared instantly when you close the tab</span>
          </div>
        </div>

        {/* Live Network & Offline Verification Status */}
        <div className="p-3 rounded-xl bg-background border border-border/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span className="text-muted-foreground">
              {isOnline ? 'Network: Online' : 'Network: Offline'}
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Offline Capable
          </span>
        </div>

        <p className="text-[10px] text-muted-foreground/80 leading-normal">
          <strong>Verify yourself:</strong> Open your browser Developer Tools (F12) &rarr; Network Tab, and perform any action. You will see 0 bytes of document data transmitted.
        </p>
      </PopoverContent>
    </Popover>
  );
}
