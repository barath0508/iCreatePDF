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

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle dark/light theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card/80 text-foreground transition-all hover:border-foreground/40 hover:bg-card shadow-2xs ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 stroke-[2] text-foreground transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 stroke-[2] text-foreground transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}

export default ThemeToggle;
