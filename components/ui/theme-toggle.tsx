'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-10 w-10 rounded-2xl border border-border bg-card/60 ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? 'light' : 'dark';

    // Use modern View Transitions API if supported for a ultra-smooth circular reveal transition
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 450,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      setTheme(nextTheme);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card/80 text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-card hover:scale-105 active:scale-95 shadow-2xs ${className}`}
    >
      <div className="relative h-4 w-4 overflow-hidden">
        <Sun
          className={`absolute inset-0 h-4 w-4 stroke-[2] transition-all duration-500 ease-out ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 text-amber-400'
              : '-rotate-90 scale-0 opacity-0 text-foreground'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 stroke-[2] transition-all duration-500 ease-out ${
            isDark
              ? 'rotate-90 scale-0 opacity-0 text-foreground'
              : 'rotate-0 scale-100 opacity-100 text-indigo-500'
          }`}
        />
      </div>
    </button>
  );
}

export default ThemeToggle;
