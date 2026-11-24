'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, ShieldCheck, Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showRestoredNotice, setShowRestoredNotice] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowRestoredNotice(true);
      const timer = setTimeout(() => setShowRestoredNotice(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsDismissed(false);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (isOnline && !showRestoredNotice) return null;
  if (isDismissed && !showRestoredNotice) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 max-w-sm pointer-events-auto animate-in slide-in-from-bottom-3 duration-200"
    >
      {!isOnline ? (
        <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-card border border-amber-500/30 shadow-xl backdrop-blur-md text-foreground">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <WifiOff className="w-4 h-4" />
          </div>

          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-500">
                Offline Mode Active
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground leading-snug mt-0.5 font-sans">
              100% WebAssembly: Tools continue working with zero internet.
            </p>
          </div>

          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="p-1.5 rounded-lg text-brand hover:bg-brand/10 transition-colors shrink-0"
              title="Install iCreatePDF as standalone app"
              aria-label="Install app for offline use"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg transition-colors shrink-0"
            aria-label="Dismiss offline notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : showRestoredNotice ? (
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-emerald-500/30 shadow-xl backdrop-blur-md text-foreground animate-in fade-in-0 duration-150">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <Wifi className="w-4 h-4" />
          </div>
          <p className="text-xs font-medium text-foreground">
            Internet connection restored
          </p>
        </div>
      ) : null}
    </aside>
  );
}
