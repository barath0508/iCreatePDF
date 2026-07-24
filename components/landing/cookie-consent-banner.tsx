'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Settings, Lock, Check } from 'lucide-react';
import Link from 'next/link';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateConsent = (preferences: {
    ad_storage: 'granted' | 'denied';
    ad_user_data: 'granted' | 'denied';
    ad_personalization: 'granted' | 'denied';
    analytics_storage: 'granted' | 'denied';
  }) => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', preferences);
    }

    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    updateConsent({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  };

  const handleRejectAll = () => {
    updateConsent({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  };

  const handleSavePreferences = () => {
    const adsConsent = marketing ? 'granted' : 'denied';
    updateConsent({
      ad_storage: adsConsent,
      ad_user_data: adsConsent,
      ad_personalization: adsConsent,
      analytics_storage: analytics ? 'granted' : 'denied',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 sm:left-auto z-[999] w-[calc(100%-3rem)] sm:w-[420px] transition-all duration-500 ease-out transform animate-fade-in-up">
      <div className="p-6 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl flex flex-col gap-4 relative overflow-hidden select-none">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-background border border-border text-foreground">
            <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground font-display">Cookie Preferences</h4>
            <p className="text-[10px] text-muted-foreground font-mono">Google Consent Mode v2 Compliant</p>
          </div>
        </div>

        {/* Content */}
        {!showPreferences ? (
          <>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We process your files 100% locally in your browser. However, we use third-party cookies to compile aggregate usage statistics and display non-intrusive advertisements. Read our{' '}
              <Link href="/privacy" className="text-foreground font-medium hover:underline underline-offset-2">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98]"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-background border border-border hover:bg-muted text-foreground transition-all active:scale-[0.98]"
                >
                  Reject All
                </button>
              </div>
              <button
                onClick={() => setShowPreferences(true)}
                className="w-full py-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:underline transition-colors flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                Customize Preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3 my-1">
              {/* Essential */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background">
                <div className="flex flex-col gap-0.5 max-w-[80%]">
                  <span className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                    <Lock className="w-3 h-3 text-foreground" /> Essential
                  </span>
                  <span className="text-[9px] text-muted-foreground leading-snug">
                    Required for site security, settings preferences, and local processing.
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-foreground bg-muted px-2 py-0.5 rounded-md border border-border">
                  Active
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background">
                <div className="flex flex-col gap-0.5 max-w-[80%]">
                  <span className="text-[11px] font-semibold text-foreground">Analytics</span>
                  <span className="text-[9px] text-muted-foreground leading-snug">
                    Helps us understand how visitors interact with our local conversion tools.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-7 h-4 bg-muted border border-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-foreground/20" />
                </label>
              </div>

              {/* Advertising */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background">
                <div className="flex flex-col gap-0.5 max-w-[80%]">
                  <span className="text-[11px] font-semibold text-foreground">Personalized Ads</span>
                  <span className="text-[9px] text-muted-foreground leading-snug">
                    Allows Google to serve contextual and interest-based advertising to support the site.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-7 h-4 bg-muted border border-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-foreground/20" />
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowPreferences(false)}
                className="py-2 px-3 text-xs font-semibold rounded-xl bg-background border border-border hover:bg-muted text-foreground transition-all active:scale-[0.98]"
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Save Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
