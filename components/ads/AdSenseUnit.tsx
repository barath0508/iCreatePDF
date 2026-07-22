'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
  /** AdSense Slot ID (optional if using auto-ads) */
  slot?: string;
  /** Layout style: 'auto' | 'fluid' | 'rectangle' */
  format?: 'auto' | 'fluid' | 'rectangle';
  /** Extra container styles or classes */
  className?: string;
  /** Display label for ad compliance */
  label?: string;
}

export function AdSenseUnit({
  slot = '1234567890',
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense initialization error:', err);
    }
  }, []);

  return (
    <div className={`my-8 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      {label && (
        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground/40 mb-1.5 select-none">
          {label}
        </span>
      )}
      <div className="w-full max-w-full min-h-[100px] flex justify-center items-center bg-foreground/[0.01] border border-foreground/5 rounded-2xl p-2">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-8825674134696584"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
