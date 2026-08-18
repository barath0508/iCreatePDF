'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = '', size = 36, showText = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ width: size, height: size }}>
        {/* Dark theme logo (shown in dark mode) */}
        <Image
          src="/logo-dark-mode.png"
          alt="iCreatePDF Logo"
          width={size * 2}
          height={size * 2}
          sizes={`${size * 2}px`}
          className="w-full h-full object-contain dark:block hidden"
          priority
        />
        {/* Light theme logo (shown in light mode) */}
        <Image
          src="/logo-light-mode.png"
          alt="iCreatePDF Logo"
          width={size * 2}
          height={size * 2}
          sizes={`${size * 2}px`}
          className="w-full h-full object-contain dark:hidden block"
          priority
        />
      </div>
      {showText && (
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-foreground select-none">
            iCreate<span className="text-muted-foreground font-mono text-xs ml-1 uppercase">PDF</span>
          </span>
        </div>
      )}
    </div>
  );
}
